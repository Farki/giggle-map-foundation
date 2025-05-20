# Gigglemap

A lightweight REST API built with Node.js and Express for managing geo locations.

## Features

- <Feature 1, e.g., User authentication with JWT>
- <Feature 2, e.g., CRUD operations for tasks>
- <Feature 3, e.g., MongoDB integration>

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)(v28.x)
- [Docker compose](https://docs.docker.com/compose/)(v2.x)

### Installation

```bash
docker-compose up
npm run migration:run
```

# Explain service
docker
orm
migrations
DI container
versioning
global error handler
request params validations


## Tables

### places
- id (UUID, PK)
- name (TEXT)
- description (TEXT)
- latitude (FLOAT8)
- longitude (FLOAT8)
- tags (TEXT[])
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- location (GEOGRAPHY(Point, 4326)) -- For spatial indexing (PostGIS)

### routes
- id (UUID, PK)
- origin_place_id (UUID, FK to places.id)
- destination_place_id (UUID, FK to places.id)
- path (GEOGRAPHY(LINESTRING, 4326))
- distance_km (FLOAT8)
- duration_min (FLOAT8)
- created_at (TIMESTAMP)

### analytics (for observability)
- id (UUID, PK)
- endpoint (TEXT)
- response_time_ms (INT)
- timestamp (TIMESTAMP)
- region (TEXT)

### DB migrations
Create migration from entities
```bash
npm run migration:generate --name=[NameOfMigration]
```
Run migration to DB
```bash
npm run migration:run
```

### Place Endpoints

#### POST /places
Create a new place
- Body: { name, description, latitude, longitude, tags }

#### GET /places/:id
Retrieve a place by ID

#### GET /places?lat=..&lng=..&radius_km=..
Query places near a geolocation (within radius)

### Route Endpoints

#### POST /routes
Create a route between two places
- Body: { origin_place_id, destination_place_id }

#### GET /routes/:id
Retrieve route details

#### GET /routes/search?origin_id=..&destination_id=..
Search for route by origin and destination

### Health & Monitoring

#### GET /health
Returns 200 OK if service is running

#### GET /metrics
Exposes basic Prometheus-style metrics

### Testing & Dev Tools

#### GET /test-data
Returns sample data for testing frontend or dev use