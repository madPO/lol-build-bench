---
description: "Task list template for feature implementation"
---

# Tasks: DataDragon Importer CLI

**Input**: Design documents from `/specs/007-datadragon-importer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are deferred per Constitution requirements (No test gates). Manual/independent testing will be used to verify stories.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Go module and install dependencies (`clickhouse-go/v2`, `cloudevents/sdk-go`) in `go.mod`
- [X] T002 [P] Set up CLI application entrypoint and flags in `cmd/import-cli/main.go`
- [X] T003 [P] Define core domain entities (`Champion`, `Item`, `Rune`, `ChampionStats`, `ItemGold`) in `internal/domain/models.go`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Implement ClickHouse connection client in `internal/data/clickhouse/client.go`
- [X] T005 Implement streaming JSON unmarshaler and zip file reader utility in `internal/data/datadragon/zip_reader.go`
- [X] T006 Implement CloudEvent factory for enveloping Domain entities in `internal/transformation/cloudevent_factory.go`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Successful Full Data Import (Priority: P1) 🎯 MVP

**Goal**: Parse and store champions, runes, items, and stats from the local zip archive into ClickHouse.

**Independent Test**: Provide a valid `.zip` archive to the CLI and verify the ClickHouse database populates with correct counts for all entities.

### Implementation for User Story 1

- [X] T007 [P] [US1] Define raw DataDragon JSON schemas in `internal/data/datadragon/models.go`
- [X] T008 [P] [US1] Implement transformations mapping raw structs to Domain objects in `internal/transformation/mapper.go`
- [X] T009 [P] [US1] Implement batch insertion logic for Champions in `internal/data/clickhouse/repository.go`
- [X] T010 [P] [US1] Implement batch insertion logic for Items in `internal/data/clickhouse/repository.go`
- [X] T011 [P] [US1] Implement batch insertion logic for Runes in `internal/data/clickhouse/repository.go`
- [X] T012 [US1] Implement Champion import orchestration action in `internal/actions/import_champions.go`
- [X] T013 [US1] Implement Item import orchestration action in `internal/actions/import_items.go`
- [X] T014 [US1] Implement Rune import orchestration action in `internal/actions/import_runes.go`
- [X] T015 [US1] Wire actions and coordinate import flow in `cmd/import-cli/main.go`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Missing or Invalid File Handling (Priority: P2)

**Goal**: Fail safely and informatively upon missing or bad file paths, or invalid/missing internal archive data.

**Independent Test**: Run the tool with a non-existent file, an invalid zip, and a zip missing internal JSON files. Verify correct descriptive errors and zero database writes for invalid runs, and warnings with partial imports for missing internal files.

### Implementation for User Story 2

- [X] T016 [P] [US2] Enhance file path validation and CLI argument handling in `cmd/import-cli/main.go`
- [X] T017 [P] [US2] Enhance zip reader to return structured file-not-found/invalid format errors in `internal/data/datadragon/zip_reader.go`
- [X] T018 [US2] Implement exit code mapping and missing internal file warnings in `cmd/import-cli/main.go`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Handling Existing Data (Priority: P3)

**Goal**: Extract the game version from the archive name/path and use it to upsert/version data cleanly in ClickHouse.

**Independent Test**: Run the tool twice on the same file and verify no duplicates. Verify that the version extracted from the zip path maps to the database records.

### Implementation for User Story 3

- [X] T019 [P] [US3] Implement game version extraction from file path string in `internal/data/datadragon/version.go`
- [X] T020 [US3] Update ClickHouse schema creation with `ReplacingMergeTree` ordered by ID and Version in `internal/data/clickhouse/repository.go`
- [X] T021 [US3] Inject extracted game version into domain mappers and CloudEvent metadata in `internal/transformation/mapper.go` and `internal/transformation/cloudevent_factory.go`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T022 Add execution progress/summary logging and row counts to `cmd/import-cli/main.go`
- [X] T023 Add inline documentation and usage instructions to the CLI help text in `cmd/import-cli/main.go`
- [X] T024 Perform code cleanup, ensure strict adherence to Data/Transformation/Action separation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Expands on CLI and zip functionality
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Modifies mapping and schema behavior

### Parallel Opportunities

- All Setup tasks marked `[P]` can run in parallel
- All Foundational tasks marked `[P]` can run in parallel (within Phase 2)
- Models and repository insertion methods within US1 marked `[P]` can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch repository implementations in parallel
Task: "Implement batch insertion logic for Champions in internal/data/clickhouse/repository.go"
Task: "Implement batch insertion logic for Items in internal/data/clickhouse/repository.go"
Task: "Implement batch insertion logic for Runes in internal/data/clickhouse/repository.go"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
