# Gigglemap

A lightweight REST API built with Node.js and Express for managing geo locations.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)(v28.x)
- [Docker compose](https://docs.docker.com/compose/)(v2.x)

### Installation

```bash
docker compose up
npm run migration:run
```

### DB migrations
Create migration from entities
```bash
npm run migration:generate --name=[NameOfMigration]
```
Run migration to DB
```bash
npm run migration:run
```

### Debugging
To debug the application, create a Node.js debug configuration with the following settings:
```
Host: localhost
Port: 9229
```

## Service Features

- **Docker**: The application runs in isolated containers using Docker, ensuring consistent environments across development and production.
- **ORM**: Database interactions are managed via an Object-Relational Mapping (ORM) tool, allowing you to work with database entities using TypeScript objects.
- **Migrations**: Database schema changes are handled through migrations, enabling version-controlled and repeatable updates to the database structure.
- **DI Container**: A Dependency Injection (DI) container is used to manage and inject dependencies, promoting modularity and testability.
- **Versioning**: The API supports versioning (e.g., `/v1`), making it easy to introduce breaking changes without affecting existing clients.
- **Global Error Handler**: Centralized error handling ensures consistent error responses and easier debugging.
- **Request Params Validations**: Incoming request parameters are validated to ensure data integrity and prevent invalid data from reaching the business logic.
- **Helm**: Helm chart in `/operations` is used to deploy the api service to a Kubernetes cluster.
- **CI/CD**: Actions in `.github` are set up for continuous integration and deployment, automating the build, test, and deployment processes.

## Security

- **Input Validation:** All endpoints validate request parameters.
- **Rate Limiting:** Rate limiting can be implemented at the application level using middleware such as `express-rate-limit`, but for production environments, I prefer enforcing rate limits at the infrastructure level (e.g., API gateways, load balancers, or cloud provider services) for greater scalability and centralized control.
- **Authentication:** For authentication, I would recommend handling token validation at the API gateway (GW) level. This approach centralizes authentication, offloads processing from backend services, and enables consistent security policies across all endpoints
- **HTTPS:** Enforce HTTPS communication between all services inside and of course outside.
- **Env:** For enhanced security in production, use a secrets management solution such as HashiCorp Vault or a cloud provider's secret manager to securely inject credentials into the environment at runtime.

## Scalability & Global Availability

- **Performance:**
    - Use Redis for caching frequent queries.
    - Optimize DB queries with indexes (PostGIS spatial indexes).
    - Use connection pooling.
- **Scaling:**
    - Deploy with Kubernetes for auto-scaling.
    - Use read replicas and sharding to scale the database, or opt for a simpler approach by leveraging CockroachDB, which provides horizontal scaling and high availability out of the box.
- **Worldwide Availability:**
    - Multi-region deployment via cloud providers (e.g., AWS, GCP).
    - Use global load balancers and CDN for static assets.
- **Handling Usage Patterns:**
    - Monitor traffic and autoscale based on demand.
    - Use feature flags and canary releases for gradual rollouts.

## End-to-End Provisioning

- **CI/CD:**
    - Automated build, test, and deploy via GitHub Actions.
    - Helm chart in `/operations` for Kubernetes deployment.
- **Provisioning:**
    - Clone repo, set up `.env`, run `docker compose up`, and apply migrations for local development.
    - Deploy to cloud Kubernetes with Helm.
