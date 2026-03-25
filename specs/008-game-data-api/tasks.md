---

description: "Task list template for feature implementation"
---

# Tasks: Game Data Webserver

**Input**: Design documents from `/specs/008-game-data-api/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Test tasks have been included per the plan requirement.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan (`api/internal/handlers`, `api/internal/graphql`, `api/internal/models`, `api/internal/repository`)
- [X] T002 Add required dependencies (`go get -u github.com/ClickHouse/clickhouse-go/v2 github.com/graphql-go/graphql github.com/go-chi/chi/v5`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T003 Set up ClickHouse repository interface and basic connection singleton in `api/internal/repository/db.go`
- [X] T004 Create HTTP router (chi) setup in `api/internal/handlers/router.go`
- [X] T005 Create HTTP server main entrypoint in `api/cmd/server/main.go`
- [X] T006 Implement dynamic GraphQL query wrapper function in `api/internal/graphql/wrapper.go` (converts `query={id name}` to valid GraphQL operations)
- [X] T007 [P] Implement base HTTP error response formatters in `api/internal/handlers/errors.go`
- [X] T008 [P] Add global CORS middleware in `api/internal/handlers/middleware.go`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Retrieve Champion Data (Priority: P1) 🎯 MVP

**Goal**: Fetch complete list of champions and single champion data using GraphQL filtering over REST.

**Independent Test**: Requesting `/api/16.1.2/champions?query={id name}` returns correct struct data.

### Tests for User Story 1

- [X] T009 [P] [US1] Integration test for Champion endpoint in `api/tests/e2e/champion_test.go`
- [X] T010 [P] [US1] Create `Champion` and `ChampionStats` data models in `api/internal/models/champion.go`
- [X] T011 [US1] Implement ClickHouse fetching for Champions (`GetAll`, `GetByID`) in `api/internal/repository/champion.go`
- [X] T012 [US1] Define GraphQL type `championType` and root query fields in `api/internal/graphql/champion_schema.go`
- [X] T013 [US1] Implement HTTP Handlers for `GET /api/{version}/champions` and `GET /api/{version}/champions/{id}` in `api/internal/handlers/champion.go`

---

## Phase 4: User Story 2 - Retrieve Item Data (Priority: P2)

**Goal**: Fetch complete list of items and single item data using GraphQL filtering over REST.

**Independent Test**: Requesting `/api/16.1.2/items?query={id name gold{total}}` returns correct struct data.

### Tests for User Story 2

- [X] T014 [P] [US2] Integration test for Item endpoint in `api/tests/e2e/item_test.go`
- [X] T015 [P] [US2] Create `Item`, `ItemGold`, and `ItemStats` data models in `api/internal/models/item.go`
- [X] T016 [US2] Implement ClickHouse fetching for Items in `api/internal/repository/item.go`
- [X] T017 [US2] Define GraphQL type `itemType` and root query fields in `api/internal/graphql/item_schema.go`
- [X] T018 [US2] Implement HTTP Handlers for `GET /api/{version}/items` and `GET /api/{version}/items/{id}` in `api/internal/handlers/item.go`

---

## Phase 5: User Story 3 - Retrieve Rune Data (Priority: P3)

**Goal**: Fetch complete list of runes and rune branches.

**Independent Test**: Requesting `/api/16.1.2/runes?query={id name}` returns correct struct data.

### Tests for User Story 3

- [X] T019 [P] [US3] Integration test for Runes endpoint in `api/tests/e2e/rune_test.go`
- [X] T020 [P] [US3] Create `RuneBranch` and `Rune` data models in `api/internal/models/rune.go`
- [X] T021 [US3] Implement ClickHouse fetching for Runes in `api/internal/repository/rune.go`
- [X] T022 [US3] Define GraphQL types (`runeType`, `runeBranchType`) and root query fields in `api/internal/graphql/rune_schema.go`
- [X] T023 [US3] Implement HTTP Handlers for `GET /api/{version}/runes` and `GET /api/{version}/rune-branches` in `api/internal/handlers/rune.go`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T024 Wire up all individual schema fields to a unified main GraphQL schema in `api/internal/graphql/schema.go`
- [X] T025 [P] Add API documentation comments across handlers

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Within Each User Story

- Models before Repository
- Repository before GraphQL Schema
- GraphQL Schema before HTTP Handlers
- Handlers wire everything together and serve the HTTP request.

### Parallel Opportunities

- Tests can be written independently before their implementation tasks
- Data Models (`T010`, `T015`, `T020`) can be written in parallel.
- Once the foundational phase is done, all three User Stories can be worked on in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Champions)
4. **STOP and VALIDATE**: Ensure `/api/16.1.2/champions` successfully queries the DB and formats GraphQL.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (Champions) → Test independently.
3. Add US2 (Items) → Test independently.
4. Add US3 (Runes) → Test independently.
5. Final polish: unify the overall API structure and finish the wiring.