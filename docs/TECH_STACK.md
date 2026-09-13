# Tech Stack

## Language & build
- **Java 17**
- **Maven** multi-module reactor (root `pom.xml` aggregates all 8 service modules)
- **Spring Cloud** `2025.1.0` (BOM pins compatible Spring Boot / Spring Cloud component versions)
- Docker/Podman image builds via the `buildDocker` Maven profile (`-P buildDocker`, optional
  `-Dcontainer.executable=podman`, `-Dcontainer.platform=linux/arm64`)

## Core frameworks
- **Spring Boot** — application runtime for all 8 services
- **Spring Cloud Netflix Eureka** — service discovery (`discovery-server` as the registry;
  all other services as clients)
- **Spring Cloud Config** — centralized configuration server, Git- or filesystem-backed
- **Spring Cloud Gateway** (WebFlux/reactive) — API gateway, routing, `lb://` load balancing
- **Resilience4j** — circuit breakers and time limiters on gateway routes
- **Spring Data JPA** — persistence in `customers-service`, `visits-service`, `vets-service`
- **Spring AI** — chat client, tool calling, vector store in `genai-service`
- **Spring Boot Admin** (codecentric) — `admin-server` monitoring console

## Data
- **MySQL** — production/Docker persistence for customers, visits, vets services
  (`mysql-connector-j`)

## Observability
- **Micrometer Tracing** + **OpenTelemetry** — trace export
- **Zipkin** — trace storage/UI
- **Prometheus** — metrics scraping (`/actuator/prometheus`)
- **Grafana** — dashboards over Prometheus

## Reliability / testing tooling
- **Chaos Monkey for Spring Boot** — fault injection profile (`chaos-monkey`), driven via
  `scripts/chaos/call_chaos.sh`

## Frontend
- **React 18 + TypeScript**, built with **Vite**, served as static assets by `api-gateway`
  (`src/main/frontend/`; built via `frontend-maven-plugin` during `mvn package`, originally
  ported from an AngularJS frontend derived from the `spring-petclinic-angular1` sample)
- **React Router** — browser-history client-side routing
- **Bootstrap 5** + **Sass** — styling, ported from the original AngularJS app's SCSS
- **Vitest** + **React Testing Library** — frontend unit/component tests

## Infrastructure / local orchestration
- **Docker Compose** (`docker-compose.yml`) — full-stack local orchestration with
  health-check-gated startup ordering
- Shell scripts under `scripts/` (e.g. `run_all.sh`) — run infra via Docker Compose and Java
  services via plain `java -jar`, logging to `target/*.log`

## CI
- GitHub Actions — Maven build workflow (`maven-build.yml`), plus PR triage automation under
  `.github/workflows/`
