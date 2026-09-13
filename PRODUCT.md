# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers and architects learning or evaluating Spring Cloud microservices patterns by running, reading, and extending the codebase. They are not end-users of a real pet clinic — the pet-clinic domain (owners, pets, vets, visits) is a familiar vehicle for demonstrating architecture, not the product's purpose.

## Product Purpose

Spring PetClinic Microservices exists as a reference implementation: it splits the classic single-app PetClinic sample into independently deployable Spring Boot services, wired together with the Spring Cloud stack. Success means a developer can stand up the full system, see the patterns in action (discovery, config, gateway routing, circuit breaking, observability), and use it as a template or teaching aid for their own microservices work.

## Positioning

Takes the well-known PetClinic domain and demonstrates a full microservices architecture around it — Eureka service discovery, centralized Spring Cloud Config, a reactive API Gateway, Resilience4j circuit breakers/retries, Micrometer/OpenTelemetry tracing to Zipkin, Prometheus/Grafana metrics, Spring Boot Admin, Chaos Monkey fault injection, and a Spring AI–powered chatbot service (`genai-service`). A plain single-module PetClinic fork cannot claim any of this; this project's distinct mechanism is the end-to-end Spring Cloud wiring, not the domain itself.

## Operating Context

Runs locally via Maven-built JARs (`scripts/run_all.sh`) or as a full Docker Compose stack, including optional observability infrastructure (Zipkin, Prometheus, Grafana). The browser-facing surface is a single entry point: the AngularJS frontend, built and served as static assets by `api-gateway`, which reverse-proxies API calls to the backend services.

## Capabilities and Constraints

- 8 independently deployable Spring Boot services (`discovery-server`, `config-server`, `api-gateway`, `customers-service`, `visits-service`, `vets-service`, `genai-service`, `admin-server`), Java 17, Maven multi-module reactor.
- Frontend: AngularJS (not a modern SPA framework), served as static assets by `api-gateway` — this is a preserved constraint, not an open decision.
- Persistence: MySQL in production/Docker profile via Spring Data JPA.
- `genai-service` is reactive (WebFlux) and configurable against Azure OpenAI or OpenAI-compatible backends.
- No production deployment target, paying customers, or SLAs — this is a sample/demo project.

## Evidence on Hand

- `README.md`, `docs/ARCHITECTURE.md`, `docs/SERVICES.md`, `docs/TECH_STACK.md` — existing written documentation of the system.
- `microservices-architecture-diagram.jpg` — existing architecture diagram.
- No testimonials, case studies, press, pricing, or licensing claims exist or should be fabricated.

## Product Principles

- Demonstrate real Spring Cloud patterns correctly, not superficially — the architecture is the product.
- Keep the pet-clinic domain simple and legible so it doesn't compete with the architectural lesson for attention.
- Preserve compatibility with the upstream Spring PetClinic sample family (recognizable domain, structure, and conventions).
- Favor clarity and inspectability (readable code, clear service boundaries, visible tracing/metrics) over polish that would obscure the patterns being taught.
