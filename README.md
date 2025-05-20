# Gigglemap

A lightweight REST API built with Node.js and Express for managing geo locations.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)(v28.x)
- [Docker compose](https://docs.docker.com/compose/)(v2.x)

### Installation

```bash
docker-compose up
npm run migration:run
```

## Service Explanation

- **Docker**: The application runs in isolated containers using Docker, ensuring consistent environments across development and production.
- **ORM**: Database interactions are managed via an Object-Relational Mapping (ORM) tool, allowing you to work with database entities using TypeScript objects.
- **Migrations**: Database schema changes are handled through migrations, enabling version-controlled and repeatable updates to the database structure.
- **DI Container**: A Dependency Injection (DI) container is used to manage and inject dependencies, promoting modularity and testability.
- **Versioning**: The API supports versioning (e.g., `/v1`), making it easy to introduce breaking changes without affecting existing clients.
- **Global Error Handler**: Centralized error handling ensures consistent error responses and easier debugging.
- **Request Params Validations**: Incoming request parameters are validated to ensure data integrity and prevent invalid data from reaching the business logic.
- **Helm**: Helm chart in `/operations` is used to deploy the api service to a Kubernetes cluster.

## DB migrations
Create migration from entities
```bash
npm run migration:generate --name=[NameOfMigration]
```
Run migration to DB
```bash
npm run migration:run
```