# Tasks: Create a gRPC API

**Input**: Design documents from `/specs/004-create-a-grpc/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/backend/` at repository root
- **Web app**: `src/backend/` (Go backend), `src/frontend/` (Qwik frontend)
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 [P] Add gRPC and protobuf dependencies to go.mod in src/backend/go.mod
- [ ] T002 [P] Create proto directory structure at api/proto/query.proto
- [ ] T003 [P] Configure protobuf generation script in scripts/generate-proto.sh
- [ ] T004 [P] Update AGENTS.md with gRPC API details

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test GetChampion in specs/004-create-a-grpc/quickstart.md Scenario 1
- [ ] T006 [P] Contract test QueryChampions in specs/004-create-a-grpc/quickstart.md Scenario 2-3
- [ ] T007 [P] Contract test QueryItems in specs/004-create-a-grpc/quickstart.md Scenario 7
- [ ] T008 [P] Contract test QueryRunes in specs/004-create-a-grpc/quickstart.md Scenario 8
- [ ] T009 [P] Integration test field selection in specs/004-create-a-grpc/quickstart.md Scenario 6
- [ ] T010 [P] Integration test filtering in specs/004-create-a-grpc/quickstart.md Scenario 4
- [ ] T011 [P] Integration test sorting in specs/004-create-a-grpc/quickstart.md Scenario 5
- [ ] T012 [P] Integration test pagination in specs/004-create-a-grpc/quickstart.md Scenario 3
- [ ] T013 [P] Integration test complex queries in specs/004-create-a-grpc/quickstart.md Scenario 9
- [ ] T014 [P] Integration test error scenarios in specs/004-create-a-grpc/quickstart.md Error Scenarios

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T015 [P] Generate protobuf Go code from api/proto/query.proto
- [ ] T016 [P] Create Champion entity validation in src/backend/entities/champion/validate.go
- [ ] T017 [P] Create Item entity validation in src/backend/entities/item/validate.go
- [ ] T018 [P] Create Rune entity validation in src/backend/entities/rune/validate.go
- [ ] T019 [P] Create FilterCondition parsing logic in src/backend/features/grpc-query/filter.go
- [ ] T020 [P] Create SortSpec parsing logic in src/backend/features/grpc-query/sort.go
- [ ] T021 [P] Create PaginationRequest handling in src/backend/features/grpc-query/pagination.go
- [ ] T022 [P] Create FieldMask application logic in src/backend/features/grpc-query/fieldmask.go
- [ ] T023 [P] Create QueryService implementation in src/backend/services/grpc-api/query_service.go
- [ ] T024 Implement GetChampion endpoint in src/backend/services/grpc-api/query_service.go
- [ ] T025 Implement QueryChampions endpoint in src/backend/services/grpc-api/query_service.go
- [ ] T026 Implement QueryItems endpoint in src/backend/services/grpc-api/query_service.go
- [ ] T027 Implement QueryRunes endpoint in src/backend/services/grpc-api/query_service.go
- [ ] T028 Create ClickHouse query builder for champions in src/backend/features/grpc-query/champion_query.go
- [ ] T029 Create ClickHouse query builder for items in src/backend/features/grpc-query/item_query.go
- [ ] T030 Create ClickHouse query builder for runes in src/backend/features/grpc-query/rune_query.go
- [ ] T031 Add error handling and status codes in src/backend/services/grpc-api/error_handler.go

## Phase 3.4: Integration
- [ ] T032 Connect QueryService to ClickHouse database in src/backend/services/grpc-api/query_service.go
- [ ] T033 Add structured logging for gRPC calls in src/backend/services/grpc-api/middleware.go
- [ ] T034 Register QueryService with gRPC server in src/backend/app/api-service/main.go
- [ ] T035 Configure gRPC server on port 50051 in src/backend/app/api-service/main.go
- [ ] T036 Add health check endpoint for gRPC service in src/backend/services/grpc-api/health.go
- [ ] T037 Update Docker configuration for gRPC port in deployments/docker/docker-compose.yml
- [ ] T038 Add gRPC client examples in docs/grpc-client-examples.md

## Phase 3.5: Polish
- [ ] T039 [P] Add request validation middleware in src/backend/services/grpc-api/validation.go
- [ ] T040 [P] Add response compression in src/backend/services/grpc-api/compression.go
- [ ] T041 [P] Add metrics and observability in src/backend/services/grpc-api/metrics.go
- [ ] T042 [P] Update API documentation in specs/004-create-a-grpc/api-contracts.md
- [ ] T043 [P] Create quickstart guide in docs/grpc-quickstart.md
- [ ] T044 Run all quickstart scenarios from specs/004-create-a-grpc/quickstart.md
- [ ] T045 Verify performance targets (<100ms for GetChampion, <500ms for list queries)
- [ ] T046 Remove code duplication and refactor common patterns

## Dependencies
- Tests (T005-T014) before implementation (T015-T031)
- T015 (protobuf generation) blocks T023-T027 (service implementation)
- T016-T018 (entity validation) blocks T028-T030 (query builders)
- T019-T022 (parsing logic) blocks T023-T027 (service implementation)
- T028-T030 (query builders) blocks T023-T027 (service implementation)
- T023-T027 (service implementation) blocks T032-T038 (integration)
- T032-T038 (integration) blocks T039-T046 (polish)

## Parallel Example
```
# Launch T005-T014 together (all test scenarios):
Task: "Contract test GetChampion in specs/004-create-a-grpc/quickstart.md Scenario 1"
Task: "Contract test QueryChampions in specs/004-create-a-grpc/quickstart.md Scenario 2-3"
Task: "Contract test QueryItems in specs/004-create-a-grpc/quickstart.md Scenario 7"
Task: "Contract test QueryRunes in specs/004-create-a-grpc/quickstart.md Scenario 8"
Task: "Integration test field selection in specs/004-create-a-grpc/quickstart.md Scenario 6"
Task: "Integration test filtering in specs/004-create-a-grpc/quickstart.md Scenario 4"
Task: "Integration test sorting in specs/004-create-a-grpc/quickstart.md Scenario 5"
Task: "Integration test pagination in specs/004-create-a-grpc/quickstart.md Scenario 3"
Task: "Integration test complex queries in specs/004-create-a-grpc/quickstart.md Scenario 9"
Task: "Integration test error scenarios in specs/004-create-a-grpc/quickstart.md Error Scenarios"

# Launch T016-T022 together (entity validation and parsing logic):
Task: "Create Champion entity validation in src/backend/entities/champion/validate.go"
Task: "Create Item entity validation in src/backend/entities/item/validate.go"
Task: "Create Rune entity validation in src/backend/entities/rune/validate.go"
Task: "Create FilterCondition parsing logic in src/backend/features/grpc-query/filter.go"
Task: "Create SortSpec parsing logic in src/backend/features/grpc-query/sort.go"
Task: "Create PaginationRequest handling in src/backend/features/grpc-query/pagination.go"
Task: "Create FieldMask application logic in src/backend/features/grpc-query/fieldmask.go"

# Launch T028-T030 together (query builders):
Task: "Create ClickHouse query builder for champions in src/backend/features/grpc-query/champion_query.go"
Task: "Create ClickHouse query builder for items in src/backend/features/grpc-query/item_query.go"
Task: "Create ClickHouse query builder for runes in src/backend/features/grpc-query/rune_query.go"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
  
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
  
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests (4 endpoints → 4 contract tests)
- [x] All entities have model tasks (Champion, Item, Rune → 3 entity tasks)
- [x] All tests come before implementation (T005-T014 before T015-T031)
- [x] Parallel tasks truly independent (different files for each [P] task)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task

## File Path Reference
- **Proto files**: `api/proto/query.proto`
- **Generated code**: `src/backend/api/proto/query.pb.go`
- **Service implementation**: `src/backend/services/grpc-api/query_service.go`
- **Query logic**: `src/backend/features/grpc-query/`
- **Entity validation**: `src/backend/entities/{champion,item,rune}/validate.go`
- **Main entry**: `src/backend/app/api-service/main.go`
- **Docker config**: `deployments/docker/docker-compose.yml`
- **Documentation**: `docs/grpc-quickstart.md`, `specs/004-create-a-grpc/api-contracts.md`

## Quickstart Validation
After completing all tasks, run the quickstart scenarios from `specs/004-create-a-grpc/quickstart.md`:
1. Start the gRPC service: `cd src/backend && go run ./app/api-service/main.go`
2. In another terminal, run each scenario using `grpcurl`
3. Verify all scenarios pass with expected responses
4. Check performance targets are met