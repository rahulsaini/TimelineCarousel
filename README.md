# TimelineCarousel

A full-stack Angular 17 + Spring Boot 3 starter for a timeline-based image carousel backed by Neo4j GraphQL.

## Maven multi-module structure
- `pom.xml` — parent aggregator project.
- `backend/` — Spring Boot 3 API module.
- `frontend/` — Angular 17 module built via Maven (`frontend-maven-plugin`).

## Build all modules with Maven
```bash
mvn clean install
```

## Run backend
```bash
mvn -pl backend spring-boot:run
```

Configuration is in `backend/src/main/resources/application.yml` and points to Neo4j and the Neo4j GraphQL endpoint.

## Frontend development
For active UI development, you can still use Angular CLI directly:

```bash
cd frontend
npm install
npm start
```

The UI calls the backend at `http://localhost:8080/event?id=...` and displays a timeline carousel of linked photos.
