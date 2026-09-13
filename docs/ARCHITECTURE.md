# Architecture

Spring PetClinic Microservices splits the classic PetClinic sample into independently
deployable Spring Boot services, wired together with the Spring Cloud stack. It exists to
demonstrate microservices patterns — service discovery, centralized config, API gateway
routing, circuit breaking, and observability — on top of a familiar domain (customers, pets,
vets, visits).

![Architecture diagram](microservices-architecture-diagram.jpg)

## Services at a glance

| Service | Role | Port |
|---|---|---|
| `discovery-server` | Eureka service registry | 8761 |
| `config-server` | Centralized configuration (Spring Cloud Config, backed by Git or a local filesystem) | 8888 |
| `api-gateway` | Spring Cloud Gateway; single entry point, routes to backend services, serves the React UI | 8080 |
| `customers-service` | Owners and pets | 8081 |
| `visits-service` | Pet visit records | 8082 |
| `vets-service` | Veterinarian directory | 8083 |
| `genai-service` | Reactive chatbot backed by Spring AI | 8084 |
| `admin-server` | Spring Boot Admin console for monitoring all instances | 9090 |

Supporting infra (started via `docker-compose.yml`, all optional for local dev): Zipkin
(tracing, 9411), Prometheus (metrics, 9091), Grafana (dashboards, 3030).

See [SERVICES.md](SERVICES.md) for a deeper per-service breakdown.

## Startup order and bootstrapping

1. **`config-server`** must be up first — every other service imports its configuration from
   it at boot (`spring.config.import: optional:configserver:...`), falling back to local
   `application.yml` defaults if the config server is unreachable (the import is `optional`).
2. **`discovery-server`** (Eureka) comes next. All business services and the gateway are
   annotated `@EnableDiscoveryClient` and register themselves here.
3. Everything else — `customers-service`, `visits-service`, `vets-service`, `genai-service`,
   `api-gateway`, `admin-server` — can start in any order once the two servers above are
   healthy. They discover each other through Eureka rather than hardcoded hostnames.
4. In Docker, services activate the `docker` Spring profile, which points `spring.config.import`
   at `http://config-server:8888` (service name) instead of `localhost`. Startup is sequenced
   with `depends_on: condition: service_healthy` in `docker-compose.yml`.

## Request flow

A browser talks only to the **API Gateway** (`:8080`), which serves the built React
frontend and reverse-proxies API calls:

```
Browser
  └─> api-gateway (:8080)
        ├─ /api/customer/**  --StripPrefix=2--> lb://customers-service
        ├─ /api/visit/**     --StripPrefix=2--> lb://visits-service
        ├─ /api/vet/**       --StripPrefix=2--> lb://vets-service
        └─ /api/genai/**     --StripPrefix=2--> lb://genai-service (+ circuit breaker)
```

The `lb://` scheme means routing targets are resolved dynamically via Eureka
(client-side load balancing), not static URLs. Every gateway route also carries a default
**Resilience4j circuit breaker** and a one-shot **retry** filter (for `SERVICE_UNAVAILABLE`
responses to `POST` requests); failures fall through to `forward:/fallback`. The GenAI route
additionally has its own named circuit breaker, since LLM calls are slower and less reliable
than the CRUD services.

## Cross-cutting concerns

- **Service discovery**: Netflix Eureka via `spring-cloud-starter-netflix-eureka-client` /
  `-server`.
- **Configuration**: Spring Cloud Config Server, git-backed by default
  (`spring-petclinic-microservices-config` repo) with a `native` filesystem profile as an
  alternative (`GIT_REPO` env var).
- **Resilience**: Resilience4j circuit breakers + time limiters on the gateway's reactive
  routes.
- **Observability**: Micrometer Tracing + OpenTelemetry export to Zipkin; Prometheus scrapes
  `/actuator/prometheus` on each service; Grafana ships a prebuilt custom metrics dashboard;
  Spring Boot Admin (`admin-server`) gives a live health/metrics UI over all registered
  instances.
- **Chaos testing**: every Java service can run with the `chaos-monkey` Spring profile
  (Chaos Monkey for Spring Boot) to inject latency/exceptions; see
  `scripts/chaos/README.md`.
- **AI features**: `genai-service` is a reactive (WebFlux) service using Spring AI, configurable
  against either Azure OpenAI or OpenAI-compatible endpoints via profile-specific properties.

## Build and packaging

- Multi-module Maven reactor (root `pom.xml`), Java 17, Spring Boot managed via
  `spring-cloud-version` 2025.1.0.
- `./mvnw clean install -P buildDocker` builds a container image per module (Docker or Podman,
  selectable target platform) using Cloud Native Buildpacks / the module's `Dockerfile`.
- `docker-compose.yml` composes the full stack, including the optional observability services,
  for local end-to-end runs.
