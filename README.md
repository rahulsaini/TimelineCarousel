# TimelineCarousel

A full-stack Angular 17 + Spring Boot 3 starter for a timeline-based image carousel backed by Neo4j GraphQL.

## Structure
- `backend/` — Spring Boot 3 API with `/event` and `/event/upload` endpoints.
- `frontend/` — Angular 17 UI with a timeline carousel component.

## Backend
```bash
cd backend
./mvnw spring-boot:run
```

Configuration is in `backend/src/main/resources/application.yml` and points to Neo4j and the Neo4j GraphQL endpoint.

## Frontend
```bash
cd frontend
npm install
npm start
```

The UI calls the backend at `http://localhost:8080/event?id=...` and displays a timeline carousel of linked photos.
