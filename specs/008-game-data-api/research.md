# Phase 0: Research

## Unknowns Addressed

1. **Storage Mechanism**
   - **Context**: The webserver needs to fetch Champions, Items, and Runes data.
   - **Decision**: ClickHouse.
   - **Rationale**: The previous feature `007-datadragon-importer` introduced `clickhouse-go/v2` and ClickHouse as the storage layer for imported data. The webserver should read from this existing database.
   - **Alternatives considered**: Local JSON files (rejected because it defeats the purpose of the importer).

2. **REST + GraphQL Hybrid Implementation**
   - **Context**: The user requested a combination of REST and GraphQL, with examples like `GET /items?query={...}` and `GET /items/<item-id>?query={...}`.
   - **Decision**: Use a custom lightweight GraphQL-like selection parser OR wrap `graphql-go/graphql` by dynamically wrapping the provided query parameter into a valid GraphQL query (e.g., if endpoint is `/items`, we treat the `query` param `{ id name }` as `query { items { id name } }`). For this implementation, wrapping standard GraphQL execution is chosen to properly support GraphQL syntax without writing a custom parser.
   - **Rationale**: Building a custom parser for `{...}` is error-prone. By defining a standard GraphQL schema internally, and intercepting the REST requests, we can transform `GET /items?query={id name}` into a standard GraphQL query: `query { items { id name } }` and execute it against the GraphQL engine. For single items: `GET /items/123?query={id name}` -> `query { item(id: "123") { id name } }`.
   - **Alternatives considered**: True GraphQL on a single `/graphql` endpoint (rejected as user explicitly requested RESTful paths like `/items` and `/items/<id>`).

3. **HTTP Routing**
   - **Context**: Need to route `/items`, `/champions`, `/runes` and their specific ID counterparts.
   - **Decision**: Standard library `net/http` (leveraging Go 1.22+ routing features if available, otherwise a simple fallback) or `chi`. Since Go 1.21 is mentioned, we'll use `go-chi/chi/v5` for clean parameterized routing (e.g. `/items/{id}`).
   - **Rationale**: `chi` is lightweight, adheres to standard `http.Handler`, and handles URL parameters efficiently.
   - **Alternatives considered**: `gorilla/mux` (chi is more modern), pure `net/http` (Go 1.21 `ServeMux` lacks clean path variables without manual parsing).

## Best Practices

- **Separation of Concerns**: Per the Constitution (Data, Transformation, Actions), the HTTP routing (Action) will extract the query, the GraphQL engine or transformation layer (Transformation) will process it against Data structs, and the DB layer (Action) will execute the ClickHouse query.
- **Data Fetching**: To avoid N+1 queries in GraphQL, we should ideally fetch all requested data at once. Since these are flat lists (Champions, Items, Runes), a simple `SELECT` mapping to the struct will suffice.
