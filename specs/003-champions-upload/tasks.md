# Tasks: Champions Upload

**Feature**: 003-champions-upload  
**Input**: Design documents from `/specs/003-champions-upload/`  
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

---

## Execution Flow (main)
```
1. Load plan.md → Tech stack: Go 1.25.3, ClickHouse, CloudEvent pattern ✓
2. Load data-model.md → Entity: Champion (with embedded abilities & passive) ✓
3. Load contracts/ → 2 contracts: api-contracts.md, database-schema.sql ✓
4. Load research.md → Key decisions: directory-based files, all-or-nothing, no validation phase ✓
5. Load quickstart.md → 3 user stories: success import, failure scenarios, update on re-import ✓
6. Generate 18 tasks by category (MVP phase - NO TESTS):
   → Phase 3.1 Setup (3 tasks)
   → Phase 3.2 Core Implementation (10 tasks: models, features, database)
   → Phase 3.3 Integration (4 tasks: database, loader service, logging)
   → Phase 3.4 Polish (1 task: docs)
7. Apply rules:
   → Different files = [P] for parallel
   → Same file = sequential (no [P])
   → MVP exemption: No test tasks (per constitution)
8. Validate completeness:
   → All entities have models? ✓ (1 entity, 3 model tasks)
   → All contracts implemented? ✓ (2 contracts, 7 implementation tasks)
   → All integration points covered? ✓ (4 integration tasks)
9. Return: SUCCESS (ready for execution)
```

---

## Phase 3.1: Setup (3 tasks)

- [ ] **T001** Create Go module structure for champion feature
  - Directory: `src/backend/entities/champion/` (create)
  - Directory: `src/backend/features/champion/` (create)
  - Files: Create empty `champion.go`, `importFromFile.go`, `championQueue.go` placeholders
  - Verify: `go mod tidy` succeeds

- [ ] **T002** [P] Initialize ClickHouse schema for champions table
  - File: `scripts/database.sql`
  - Task: Add CREATE TABLE champions statement from `contracts/database-schema.sql`
  - Verify: Schema includes CloudEvent columns (cid, oid, pid, created_time, source, type, subject, data)
  - Test: `docker-compose exec clickhouse-server clickhouse-client -e "SHOW TABLES;" | grep champions`

- [ ] **T003** [P] Set up Go logging and dependencies
  - File: `src/backend/go.mod`
  - Task: Ensure ClickHouse driver imported (`github.com/ClickHouse/clickhouse-go`)
  - Task: Add CloudEvent SDK if needed (`github.com/cloudevents/sdk-go`)
  - Verify: `go mod tidy && go mod verify` succeeds

---

## Phase 3.2: Core Implementation (10 tasks)

- [ ] **T004** [P] Create Patch entity data model
  - File: `src/backend/entities/patch/patch.go`
  - Struct: Define Patch with fields: ID (string), PatchID (string), Language (string)
  - Documentation: Add godoc comments describing each field's purpose
  - Verify: Type-safe, follows Go conventions
  - Note: Reuses existing patch entity if available

- [ ] **T005** [P] Create Champion data model (struct definition)
  - File: `src/backend/entities/champion/champion.go`
  - Struct: Champion with all fields from data-model.md:
    - Identity: id, key, name, title, partype
    - Image: full, sprite, group, x, y, w, h
    - Base stats: hp, mp, movespeed, armor, spellblock, attackrange, hpregen, mpregen, crit, attackdamage, attackspeed
    - Level stats: hpperlevel, mpperlevel, armorperlevel, spellblockperlevel, hpregenperlevel, mpregenperlevel, critperlevel, attackdamageperlevel, attackspeedperlevel
    - Spells: [4]Spell with id, name, description, tooltip, maxrank, cooldown, cost, range, image
    - Passive: name, description, image
  - Dependencies: None (data-only, no methods)
  - Verify: Struct compiles and matches Annie.json format

- [ ] **T006** [P] Create CloudEvent wrapper (champion event entity)
  - File: `src/backend/entities/champion/createChampionEvent.go`
  - Struct: ChampionEvent with CloudEvent fields:
    - cid (UUID), oid (string), pid (string), created_time (time.Time)
    - source, specversion, type, datacontenttype, subject (all strings)
    - data (json.RawMessage or Champion JSON)
  - Function: `NewChampionEvent(champion *Champion, patch *Patch) *ChampionEvent`
  - Logic: Generate UUID for cid, set source="dragontail", type="champion.created", etc.
  - Verify: Compiles and creates valid CloudEvent structure

- [ ] **T007** Implement directory scanning in importFromFile
  - File: `src/backend/features/champion/importFromFile.go`
  - Function: `scanChampionFiles(basePath string, patch *Patch) ([]string, error)`
  - Logic: Construct path `basePath/patchId/data/language/champions/`, list .json files
  - Error handling: Return error if directory not found with descriptive message
  - Logging: Structured log each directory scan with count of files found
  - Verify: Can list champion files from correct path structure

- [ ] **T008** Implement JSON parsing from champion files
  - File: `src/backend/features/champion/importFromFile.go`
  - Function: `parseChampionFile(filePath string) (*Champion, error)`
  - Logic: Read JSON file, unmarshal to Champion struct
  - Error handling: Return error with file name on invalid JSON or missing fields
  - Logging: Structured log each parse attempt (file name, success/failure)
  - Verify: Can extract champion data from individual JSON files

- [ ] **T009** Implement ClickHouse connection and insertion
  - File: `src/backend/features/champion/championQueue.go`
  - Function: `insertChampionEvent(ctx context.Context, event *ChampionEvent) error`
  - Logic: Connect to ClickHouse, insert CloudEvent record into champions table
  - Error handling: Return error on connection/insert failure with context
  - Logging: Structured log insert attempts (champion id, success/failure)
  - Verify: Can create database records in champions table

- [ ] **T010** Implement main ImportFromFile function (all-or-nothing orchestration)
  - File: `src/backend/features/champion/importFromFile.go`
  - Function: `ImportFromFile(basePath string, patch *Patch) error` (signature from api-contracts.md)
  - Logic:
    1. Scan directory for champion files
    2. For each file, parse JSON into Champion
    3. Create CloudEvent for each champion
    4. Batch insert all CloudEvents to ClickHouse
    5. If any step fails, return error (all-or-nothing guarantee)
  - Error handling: Comprehensive error messages with context (file name, field, reason)
  - Logging: Structured logs for start, progress (every N champions), completion, and errors
  - Verify: Implements all-or-nothing behavior as specified in api-contracts.md

- [ ] **T011** Add ClickHouse champions table DDL to database.sql
  - File: `scripts/database.sql`
  - Task: Add complete CREATE TABLE statement from `contracts/database-schema.sql`
  - Verify: Schema has CloudEvent columns: cid (UUID), oid (String), pid (String), created_time, source, specversion, type, datacontenttype, subject, data (JSON)
  - Engine: ReplacingMergeTree(created_time) with ORDER BY (subject, type, created_time, pid)
  - Verify: Can execute in ClickHouse without errors

- [ ] **T012** Update AGENTS.md with champions feature build commands
  - File: `AGENTS.md` (at repository root)
  - Add section: Build/Run commands for champions feature
  - Commands:
    - `cd src/backend && go build ./features/champion`
    - `cd src/backend && go run ./app/loader-service/main.go` (once loader integrates)
    - `docker-compose -f deployments/docker/docker-compose.yml up` (ClickHouse)
  - Update recent changes section with:
    - **2025-12-15**: Added champions uploader feature (003-champions-upload)
    - Import pattern: directory-based champion JSON files
    - Database: champions table with CloudEvent structure

- [ ] **T013** Create example usage documentation in code comments
  - File: `src/backend/features/champion/importFromFile.go`
  - Task: Add godoc comments with:
    - Function purpose and behavior
    - Parameter descriptions
    - Return value description
    - Example usage code from quickstart.md
    - Error handling information
  - Verify: `go doc ./features/champion` shows complete documentation

---

## Phase 3.3: Integration (4 tasks)

- [ ] **T014** Integrate ImportFromFile with loader service
  - File: `src/backend/app/loader-service/main.go`
  - Task: Add champion import to loader service:
    1. Load patch metadata from configuration or database
    2. Construct Patch object (ID, PatchID, Language)
    3. Call `champion.ImportFromFile(basePath, patch)`
    4. Handle error and log result
  - Integration: Works with existing loader service patterns
  - Error handling: Log errors, return non-zero exit code on failure
  - Verify: Loader service can import champions via CLI

- [ ] **T015** Ensure structured logging in all champion functions
  - Files: `src/backend/features/champion/importFromFile.go`, `championQueue.go`
  - Task: Add structured logging (JSON format) at:
    - Import started (with basePath, patchId, language, timestamp)
    - Directory scan (file count found)
    - Per-file parsing (file name, success/failure)
    - Database insert (batch size, success/failure)
    - Import completed (total count, success count, duration, status)
    - Errors with full context (file name, field, reason)
  - Format: Use project's standard logging (structured JSON)
  - Verify: Logs are parseable with jq or standard JSON parser

- [ ] **T016** Verify database schema in ClickHouse
  - File: `scripts/database.sql`
  - Task: Execute schema creation in ClickHouse:
    ```bash
    docker-compose exec clickhouse-server clickhouse-client < scripts/database.sql
    ```
  - Verify: Table `champions` exists with correct columns
  - Verify: Schema matches database-schema.sql from contracts/
  - Query test: `SELECT * FROM champions LIMIT 1` runs without error

- [ ] **T017** Implement error handling for edge cases
  - File: `src/backend/features/champion/importFromFile.go`
  - Handle edge cases:
    1. Directory not found → return descriptive error
    2. No champion files in directory → return error
    3. Invalid JSON in file → return error with file name
    4. Missing required field → return error with field name
    5. Database connection failed → return error with context
    6. Database insert failed → rollback and return error
  - Logging: Log each error scenario with full context
  - Verify: All edge cases handled gracefully with clear error messages

---

## Phase 3.4: Polish (1 task)

- [ ] **T018** [P] Create feature documentation and README
  - File: `src/backend/features/champion/README.md`
  - Content:
    - Feature overview and purpose
    - Function signature: `ImportFromFile(basePath string, patch *Patch) error`
    - File path structure and example: `.../patchId/data/language/champions/`
    - How to call the function with example code
    - Error handling behavior and all-or-nothing guarantee
    - Database queries to verify import success
    - Integration with loader service
    - Champion data model fields and structure
  - Verify: Documentation is complete and accurate

---

## Dependencies

```
Setup Phase (T001-T003)
    ↓
Core Implementation (T004-T013)
    │
    ├─ T004 (Patch model)
    ├─ T005 (Champion model)
    ├─ T006 (CloudEvent wrapper)
    ├─ T007-T010 (ImportFromFile implementation chain)
    │   └─ Blocked by: T004, T005, T006
    ├─ T011 (Database schema)
    ├─ T012 (AGENTS.md update)
    └─ T013 (Documentation)
    ↓
Integration Phase (T014-T017)
    │
    ├─ T014 (Loader service integration) - depends on T010
    ├─ T015 (Logging) - depends on T010
    ├─ T016 (Database verification) - depends on T011
    └─ T017 (Error handling) - depends on T010
    ↓
Polish Phase (T018) ← Final documentation
```

---

## Parallel Execution Groups

### Group 1: Initial Setup (Run in parallel, T001-T003)
```
Task "Create Go module structure for champion feature" (T001)
Task "Initialize ClickHouse schema for champions table" (T002)
Task "Set up Go logging and dependencies" (T003)
```

### Group 2: Model Creation (Run in parallel, T004-T006)
```
Task "Create Patch entity data model" (T004)
Task "Create Champion data model (struct definition)" (T005)
Task "Create CloudEvent wrapper (champion event entity)" (T006)
```

### Group 3: Core Feature Implementation (Sequential, T007-T010)
```
Task "Implement directory scanning in importFromFile" (T007)
    ↓ (depends on models ready)
Task "Implement JSON parsing from champion files" (T008)
    ↓
Task "Implement ClickHouse connection and insertion" (T009)
    ↓
Task "Implement main ImportFromFile function" (T010)
```

### Group 4: Documentation & Setup (Run in parallel, T011-T013)
```
Task "Add ClickHouse champions table DDL to database.sql" (T011)
Task "Update AGENTS.md with champions feature build commands" (T012)
Task "Create example usage documentation in code comments" (T013)
```

### Group 5: Integration (Sequential, T014-T017)
```
Task "Integrate ImportFromFile with loader service" (T014)
    ↓
Task "Ensure structured logging in all champion functions" (T015)
    ↓
Task "Verify database schema in ClickHouse" (T016)
    ↓
Task "Implement error handling for edge cases" (T017)
```

### Group 6: Final Polish (T018)
```
Task "Create feature documentation and README" (T018)
```

---

## Task Format Reference

- **[P]**: Can run in parallel (different files, no dependencies)
- **No [P]**: Must run sequentially (same file or dependency chain)
- **File paths**: Relative to repository root
- **Phase ordering**: Setup → Core Implementation → Integration → Polish

---

## Execution Notes

1. **MVP Phase**: No tests required (per project constitution)
2. **Git Commits**: Commit after each major task (T010, T017, T018)
3. **Error Messages**: Include champion file name and specific field in all errors
4. **Logging**: Use structured JSON logging throughout (following project conventions)
5. **Database**: Use ReplacingMergeTree with created_time for deduplication
6. **All-or-Nothing**: If any champion file fails, entire import fails (no partial success)
7. **No Validation Phase**: Skip explicit validation - parsing failure = import failure

---

## Validation Checklist (GATE before executing)

- [x] All entities have models: 1 entity (Champion) → 3 model tasks (T004-T006)
- [x] All contracts implemented: 2 contracts → 7 implementation tasks (T007-T013)
- [x] All integration points covered: 4 integration tasks (T014-T017)
- [x] Parallel tasks independent: [P] tasks use different files
- [x] Each task specifies exact file path: Verified in task descriptions
- [x] No task modifies same file as another [P] task: Verified in groups
- [x] MVP exemption: No test tasks (per constitution)

**Status**: READY FOR EXECUTION ✅

---

## Quick Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| Setup | T001-T003 | Create directories, schema, dependencies |
| Core | T004-T013 | Implement models, features, database, docs |
| Integration | T014-T017 | Loader service, logging, DB verification, error handling |
| Polish | T018 | Final documentation |

**Total**: 18 tasks (T001-T018)

---

*Tasks Generated: 2025-12-15*  
*Feature**: 003-champions-upload  
*MVP Phase (No Tests)*
