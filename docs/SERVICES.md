# Service Catalog

Each service is an independent Maven module and Spring Boot application under its own
`spring-petclinic-*` directory. All use `@EnableDiscoveryClient` to register with Eureka and
pull shared config from the Config Server at startup.

## discovery-server
- **Module**: `spring-petclinic-discovery-server`
- **Port**: 8761
- **Purpose**: Netflix Eureka service registry. Every other service registers here and
  discovers peers by logical name instead of hardcoded host:port.
- **Key annotation**: `@EnableEurekaServer`.

## config-server
- **Module**: `spring-petclinic-config-server`
- **Port**: 8888
- **Purpose**: Centralized externalized configuration via Spring Cloud Config.
- **Backends**:
  - Git (default) — `https://github.com/spring-petclinic/spring-petclinic-microservices-config`, `main` branch.
  - `native` profile — reads from a local filesystem path via the `GIT_REPO` env var, useful
    for offline/local config editing.
- **Key annotation**: `@EnableConfigServer`.

## api-gateway
- **Module**: `spring-petclinic-api-gateway`
- **Port**: 8080
- **Purpose**: Single public entry point. Serves the built React + TypeScript static assets
  (Vite build) and reverse proxies REST calls to backend services using Spring Cloud Gateway
  (reactive/WebFlux).
- **Routing**: `/api/customer/**`, `/api/visit/**`, `/api/vet/**`, `/api/genai/**` are routed
  to `lb://<service>` with a `StripPrefix=2` filter, load-balanced via Eureka.
- **Resilience**: default Resilience4j circuit breaker + single retry on `POST`
  `SERVICE_UNAVAILABLE` for every route; a dedicated named circuit breaker on the GenAI route.
- **Notable beans**: load-balanced `RestTemplate`/`WebClient.Builder`, a router function that
  forwards unmatched paths to `index.html` (SPA deep-link support).

## customers-service
- **Module**: `spring-petclinic-customers-service`
- **Port**: 8081
- **Domain**: Owners and Pets (`Owner`, `Pet`, `PetType` JPA entities).
- **API**: `OwnerResource`, `PetResource` REST controllers (owner CRUD, pet CRUD nested under
  an owner).
- **Persistence**: Spring Data JPA, MySQL in production/Docker profile (HSQLDB-style in-memory
  default for local/dev, per standard PetClinic convention).

## visits-service
- **Module**: `spring-petclinic-visits-service`
- **Port**: 8082
- **Domain**: Pet visit records, keyed by `petId`.
- **API**: `VisitResource` — create a visit, fetch visits for a pet, and a batch endpoint
  (`VisitResource.Visits`) to fetch visits for multiple pet IDs at once (used by the gateway
  to enrich owner/pet views without N+1 calls).
- **Persistence**: Spring Data JPA / MySQL.

## vets-service
- **Module**: `spring-petclinic-vets-service`
- **Port**: 8083
- **Domain**: Veterinarians and their specialties.
- **API**: `VetResource` — list vets.
- **Notable**: results are cached (`spring.cache.cache-names: vets`) since the vet list
  changes rarely; configuration exposed via a typed `VetsProperties`
  (`@EnableConfigurationProperties`).
- **Persistence**: Spring Data JPA / MySQL.

## genai-service
- **Module**: `spring-petclinic-genai-service`
- **Port**: 8084
- **Purpose**: Conversational chatbot over the PetClinic domain, built on Spring AI.
- **Architecture**: reactive (`spring.main.web-application-type: reactive`). `PetclinicChatClient`
  wraps the Spring AI `ChatClient`; `PetclinicTools` exposes domain operations (querying pets,
  owners, vets, visits) as tools the model can call; `AIDataProvider` / `VectorStoreController`
  support retrieval-augmented context.
- **Model backends**: configurable to Azure OpenAI (`AZURE_OPENAI_KEY`,
  `AZURE_OPENAI_ENDPOINT`, deployment `gpt-4o`) or OpenAI-compatible APIs
  (`OPENAI_API_KEY`, model `gpt-4o-mini`) — selected via Maven/Spring profile.
- **Gateway route**: `/api/genai/**`, with its own circuit breaker since LLM latency is
  higher and less predictable than the CRUD services.

## admin-server
- **Module**: `spring-petclinic-admin-server`
- **Port**: 9090
- **Purpose**: Spring Boot Admin UI — a live dashboard over every registered service instance's
  health, metrics, env, loggers, and threads (discovered via Eureka).
- **Key annotation**: `@EnableAdminServer`.

## Supporting infrastructure (docker-compose only)

| Component | Port | Purpose |
|---|---|---|
| Zipkin | 9411 | Distributed trace collection/UI (receives OpenTelemetry traces) |
| Prometheus | 9091 | Metrics scraping from each service's `/actuator/prometheus` |
| Grafana | 3030 | Dashboards over Prometheus metrics (prebuilt custom dashboard included) |

None of these are required to run the core application locally — see the root
[README.md](../README.md) for startup instructions.
