# Implementation Plan: Game Data Webserver

**Branch**: `008-game-data-api` | **Date**: March 22 2026 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-game-data-api/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Create a Golang webservice that provides game data (Champions, Items, Runes) to the Qwik frontend. The service will fetch data from the existing ClickHouse database and expose a hybrid REST-GraphQL API. Endpoints will use standard REST paths featuring the DataDragon patch version (e.g., `/api/16.1.2/items`, `/api/16.1.2/items/<id>`) while supporting a `query` parameter that accepts a GraphQL selection set to filter and shape the returned fields (e.g., `GET /api/16.1.2/items?query={id name}`).

## Technical Context

**Language/Version**: Go 1.21+
**Primary Dependencies**: `clickhouse-go/v2`, `graphql-go/graphql`, `go-chi/chi/v5`
**Storage**: ClickHouse (read-only operations)
**Testing**: Go standard testing `testing`
**Target Platform**: Linux server
**Project Type**: Web Service API
**Performance Goals**: < 200ms p95 response time, low allocation overhead per request
**Constraints**: Must strictly separate Data, Transformations, and Actions per constitution. No database writes required.
**Scale/Scope**: ~170 Champions, ~200 Items, ~60 Runes. Data easily fits in memory, but read dynamically to support future updates.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-Stack boundary respected (backend only serves JSON/GraphQL, no UI)
- [x] Strict Separation of Categories: Handlers (Actions), Resolvers/GraphQL (Transformations), DB Structs (Data)
- [x] No Node/Bun/NPM dependencies in the Go backend
- [x] Does not break previously shipped functionality (adds new read-only API)

## Project Structure

### Documentation (this feature)

```text
specs/008-game-data-api/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
api/
├── cmd/
│   └── server/
│       └── main.go       # Entry point for the web service
├── internal/
│   ├── handlers/         # HTTP Routing and REST endpoints (Actions)
│   ├── graphql/          # GraphQL Schema definition and resolvers (Transformations)
│   ├── repository/       # ClickHouse data fetching (Actions)
│   └── models/           # Go struct definitions (Data)
└── tests/
    └── e2e/              # API Integration tests
```

**Structure Decision**: The "Mobile + API" or "Web application" dual-stack structure from the Constitution is chosen, aligning Go backend files into `api/internal` and `api/cmd` following standard Go project layouts.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
