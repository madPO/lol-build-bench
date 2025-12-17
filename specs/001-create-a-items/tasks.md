# Tasks: Items Uploaders

**Input**: Design documents from `/specs/001-create-a-items/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
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
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Update database schema in `scripts/database.sql` with the `items` table.
- [ ] T002 Update `AGENTS.md` with item-specific build commands and patterns.

## Phase 3.2: Core Implementation
- [ ] T003 Create `src/backend/entities/item/item.go` with the `Item` struct and `CreateItemFromItemData` function.
- [ ] T004 Create `src/backend/entities/item/createItemEvent.go` with the `CreateItemEvent` struct and `CreateEventFromItem` function.
- [ ] T005 Implement `src/backend/features/item/itemQueue.go` with the `OpenItemQueue` function.
- [ ] T006 Implement `src/backend/features/item/importFromFile.go` with the `ImportFromFile` and `PushItemEvent` functions.

## Phase 3.3: Integration
- [ ] T007 Integrate item import into `src/backend/app/loader-service/main.go`.

## Phase 3.4: Polish
- [ ] T008 Update `specs/001-create-a-items/quickstart.md` with the final CLI command for item import.

## Dependencies
- T001, T002 (Setup) must be completed before T003-T006 (Core Implementation).
- T003, T004 (Entity creation) must be completed before T005, T006 (Feature implementation).
- T005 (ItemQueue) must be completed before T006 (ImportFromFile).
- T006 (ImportFromFile) must be completed before T007 (Integration).
- T007 (Integration) must be completed before T008 (Polish).

## Parallel Example
```
# Launch T001 and T002 together:
Task: "Update database schema in scripts/database.sql with the items table."
Task: "Update AGENTS.md with item-specific build commands and patterns."

# Launch T003 and T004 together after T001 and T002 are done:
Task: "Create src/backend/entities/item/item.go with the Item struct and CreateItemFromItemData function."
Task: "Create src/backend/entities/item/createItemEvent.go with the CreateItemEvent struct and CreateEventFromItem function."
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

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
