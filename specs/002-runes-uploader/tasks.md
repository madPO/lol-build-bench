# Tasks: Runes Uploader

**Input**: Design documents from `/specs/002-runes-uploader/`  
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓  
**Estimated Duration**: 15-20 hours (low-priority feature, MVP phase)

## Execution Flow (main)

```
1. Load plan.md from feature directory                     ✓
   → Extract: tech stack (Go 1.25.3), CloudEvent pattern   ✓
   → Extract: structure (entities/, features/)             ✓

2. Load design documents                                   ✓
   → data-model.md: RunePath, Rune entities               ✓
   → contracts/database-schema.sql: runes table schema    ✓
   → contracts/go-api.md: API contracts (3 functions)     ✓
   → research.md: decisions completed                      ✓
   → quickstart.md: acceptance scenario                    ✓

3. Generate tasks by category:
   → Setup (1 task): Database setup for MVP
   → Core (7 tasks): Entities + features following CloudEvent pattern
   → Integration (1 task): Connect loader-service
   → Validation (1 task): Quickstart acceptance test
   → Total: 10 numbered tasks

4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → No tests (MVP phase per constitution)

5. Order by dependencies: Setup → Core → Integration → Validation
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Paths shown assume `src/backend/` per existing project structure
- Go modules path prefix: `lol-build-bench/` (per go.mod)

## Phase 3.1: Setup

- [x] T001 Create database schema: `scripts/database.sql` - Add runes table using contracts/database-schema.sql

## Phase 3.2: Core Implementation (TDD skipped per MVP constitution)

Entity layer (pure data structures):

- [x] T002 [P] Rune entity in `src/backend/entities/rune/rune.go` with fields: RID (UUID), OID (string), Name (string), Key (string), Icon (string), ShortDesc (string), LongDesc (string), PID (string), CreatedTime (time)
- [x] T003 [P] CreateRuneEvent entity in `src/backend/entities/rune/createRuneEvent.go` with CloudEvent fields: Source, SpecVersion, Type, DataContentType, Subject, Data (Rune)

Feature layer (business logic with side effects):

- [x] T004 [P] ReadRuneData function in `src/backend/entities/dragontail/rune.go` - Parses runesReforged.json into []RunePathData structures (mirrors ReadItemData pattern)
- [x] T005 [P] CreateRuneFromRuneData conversion function in `src/backend/entities/rune/rune.go` - Pure function: converts dragontail.RuneData + patchID → Rune with generated UUID and timestamp
- [x] T006 [P] CreateEventFromRune conversion function in `src/backend/entities/rune/createRuneEvent.go` - Pure function: wraps Rune in CloudEvent with source="dragontail", type="rune.created", subject=RuneName
- [x] T007 OpenRuneQueue function in `src/backend/features/rune/runeQueue.go` - Opens ClickHouse batch insert and returns (push, commit, error) closure pair with PrepareBatch() API (mirrors OpenItemQueue)
- [x] T008 ImportFromFile function in `src/backend/features/rune/importFromFile.go` - Main entry point: reads JSON, creates events, queues them (mirrors existing item uploader pattern)
- [x] T009 PushRuneEvent helper in `src/backend/features/rune/importFromFile.go` - Wrapper around OpenRuneQueue for single event push (optional, for API contract completeness)

## Phase 3.3: Integration

- [x] T010 Integrate with loader-service in `src/backend/app/loader-service/main.go` - Add rune.ImportFromFile call to patch loading workflow (after item import, before completion)

## Phase 3.4: Validation

- [x] T011 Execute quickstart acceptance scenario - Prepare runesReforged.json test file, call ImportFromFile, verify data in ClickHouse with SELECT * FROM runes FINAL

---

## Dependencies

```
Setup (T001)
    ↓
Core Models (T002-T003)
    ↓
Core Conversions (T004-T006)
    ↓
Core Queue (T007)
    ↓
Core Import (T008-T009)
    ↓
Integration (T010)
    ↓
Validation (T011)
```

**Blocking relationships**:
- T001 blocks all (database must exist)
- T002-T003 block T005-T006 (entities required for conversions)
- T004-T006 block T007 (conversions used in queue)
- T007 blocks T008 (queue needed for import)
- T008 blocks T010 (import must exist before integration)
- T010 blocks T011 (integration must be complete for acceptance test)

## Parallel Execution Guide

**No parallel opportunities in this feature** due to sequential dependencies:
- All tasks depend on previous setup/models
- Import function cannot be tested until all entities exist
- Integration point requires import function
- Quickstart validation requires integration

This is intentional for MVP: simple sequential implementation mirrors the item uploader pattern.

## Task Descriptions

### T001: Create Database Schema

**File**: `scripts/database.sql`

**Action**: Copy runes table schema from `specs/002-runes-uploader/contracts/database-schema.sql` to main database script or execute separately.

**Acceptance**: 
```bash
# After running this, connect to ClickHouse and verify:
SELECT name FROM system.tables WHERE name = 'runes'
# Should return: runes
```

**Notes**:
- Uses ReplacingMergeTree engine with ORDER BY (subject, type, created_time, pid)
- Requires ClickHouse to be running (docker-compose up)
- See contracts/database-schema.sql for complete schema

---

### T002 [P]: Rune Entity

**File**: `src/backend/entities/rune/rune.go`

**Action**: Create Rune struct with these fields:
```go
type Rune struct {
    RID         uuid.UUID
    OID         string // Original ID from Data Dragon (e.g., "8112")
    Name        string
    Key         string
    Icon        string
    ShortDesc   string
    LongDesc    string
    PID         string // Patch ID reference
    CreatedTime time.Time
}
```

**Acceptance**: 
- File compiles without errors
- Struct exported (PascalCase)
- All fields properly typed

**Dependencies**: None

---

### T003 [P]: CreateRuneEvent Entity

**File**: `src/backend/entities/rune/createRuneEvent.go`

**Action**: Create CloudEvent wrapper struct:
```go
type CreateRuneEvent struct {
    Source          string // "dragontail"
    SpecVersion     string // "1.0"
    Type            string // "rune.created"
    DataContentType string // "application/json"
    Subject         string // Rune name
    Data            Rune
}
```

**Acceptance**: 
- File compiles without errors
- Struct exported (PascalCase)
- Matches CloudEvent specification format

**Dependencies**: T002 (needs Rune struct)

---

### T004 [P]: ReadRuneData Function

**File**: `src/backend/entities/dragontail/rune.go`

**Action**: Implement JSON parser for runesReforged.json (mirrors ReadItemData):
```go
// ReadRuneData reads and parses runesReforged.json
func ReadRuneData(filePath string) ([]RunePathData, error)
```

**Structure to parse**:
```go
type RunePathData struct {
    ID    int    `json:"id"`
    Key   string `json:"key"`
    Icon  string `json:"icon"`
    Name  string `json:"name"`
    Slots []struct {
        Runes []RuneData `json:"runes"`
    } `json:"slots"`
}

type RuneData struct {
    ID        int    `json:"id"`
    Key       string `json:"key"`
    Icon      string `json:"icon"`
    Name      string `json:"name"`
    ShortDesc string `json:"shortDesc"`
    LongDesc  string `json:"longDesc"`
}
```

**Acceptance**: 
- Parses example runesReforged.json correctly
- Returns error for invalid JSON files
- Error message includes file path context

**Dependencies**: None

**Reference**: `src/backend/features/item/importFromFile.go` lines 55-69 for pattern

---

### T005 [P]: CreateRuneFromRuneData Conversion

**File**: `src/backend/entities/rune/rune.go`

**Action**: Add pure conversion function:
```go
// CreateRuneFromRuneData converts Data Dragon rune data to Rune entity
func CreateRuneFromRuneData(runeData dragontail.RuneData, patchID string) Rune
```

**Implementation notes**:
- Generate new UUID for RID: `uuid.New()`
- Set OID to string(runeData.ID)
- Set CreatedTime to current UTC: `time.Now().UTC()`
- Copy remaining fields from runeData
- Pure function: no side effects, no database access

**Acceptance**: 
- Function creates valid Rune with unique UUID each call
- Timestamp is reasonable (within current minute)
- All runeData fields copied correctly

**Dependencies**: T002 (needs Rune struct)

---

### T006 [P]: CreateEventFromRune Conversion

**File**: `src/backend/entities/rune/createRuneEvent.go`

**Action**: Add pure conversion function:
```go
// CreateEventFromRune wraps Rune in CloudEvent
func CreateEventFromRune(rune Rune) CreateRuneEvent
```

**Implementation notes**:
- Source = "dragontail"
- SpecVersion = "1.0"
- Type = "rune.created"
- DataContentType = "application/json"
- Subject = rune.Name (for filtering/routing)
- Data = rune
- Pure function: no side effects

**Acceptance**: 
- Function returns valid CreateRuneEvent
- Subject set to rune.Name
- All CloudEvent fields populated

**Dependencies**: T003 (needs CreateRuneEvent struct)

---

### T007: OpenRuneQueue Function

**File**: `src/backend/features/rune/runeQueue.go`

**Action**: Implement batch insert queue (mirrors OpenItemQueue):
```go
func OpenRuneQueue(scope applicationScope.Scope) (
    func(CreateRuneEvent) error,  // push function
    func() error,                  // commit function
    error,                         // connection error
)
```

**Implementation notes**:
- Use `conn.PrepareBatch()` for efficient bulk insert
- SQL: `INSERT INTO runes (rid, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)`
- Push function: `batch.Append()` (in-memory, no I/O)
- Commit function: `batch.Send()` (single network round-trip)
- Return (nil, nil, error) if connection fails
- Error messages should wrap with `fmt.Errorf("operation: %w", err)`

**Acceptance**: 
- Opens ClickHouse connection without error
- Push function appends events to batch
- Commit function sends batch in single operation
- Works with 100-1000 events (typical batch size)

**Dependencies**: T002-T003 (uses Rune, CreateRuneEvent types)

**Reference**: `src/backend/features/item/itemQueue.go` for pattern

---

### T008: ImportFromFile Function

**File**: `src/backend/features/rune/importFromFile.go`

**Action**: Main import orchestration (mirrors item uploader):
```go
func ImportFromFile(rootPath string, patch patch.Patch, scope applicationScope.Scope) error
```

**Implementation flow**:
1. Construct file path: `{rootPath}/data/{patch.Language}/runesReforged.json`
2. Call `dragontail.ReadRuneData(filePath)` → []RunePathData
3. Open queue: `OpenRuneQueue(scope)` → (push, commit, error)
4. For each RunePathData:
   - For each Slot in RunePathData.Slots:
     - For each RuneData in Slot.Runes:
       - Call `CreateRuneFromRuneData(runeData, patch.OID)` → Rune
       - Call `CreateEventFromRune(rune)` → CreateRuneEvent
       - Call `push(event)` and check error
5. Call `commit()` and return result

**Error handling**:
- Return error immediately on file read failure
- Return error immediately on queue open failure
- Return error immediately on push failure
- Return commit result

**Logging** (structured):
- INFO: Start: "Import starting: path=%s"
- INFO: Complete: "Import successful: events=%d"
- ERROR: Any failure with context

**Acceptance**: 
- Imports runesReforged.json without error
- Creates one event per rune in JSON
- All events committed to database
- Data persists in `runes` table

**Dependencies**: T004-T007 (needs conversions and queue)

**Reference**: `src/backend/features/item/importFromFile.go` for exact pattern

---

### T009: PushRuneEvent Helper

**File**: `src/backend/features/rune/importFromFile.go` (same file as T008)

**Action**: Add convenience wrapper:
```go
func PushRuneEvent(event CreateRuneEvent, scope applicationScope.Scope) error
```

**Implementation**:
```go
push, commit, err := OpenRuneQueue(scope)
if err != nil {
    return err
}

err = push(event)
if err != nil {
    return err
}

return commit()
```

**Acceptance**: 
- Function exists and compiles
- Handles single event with automatic commit
- Error propagates correctly

**Dependencies**: T007 (uses OpenRuneQueue)

**Note**: This function is optional for API completeness; T008 can call OpenRuneQueue directly

---

### T010: Integrate with loader-service

**File**: `src/backend/app/loader-service/main.go`

**Action**: Add rune import to patch loading workflow:
1. After item import completes (T008 from items feature)
2. Before patch loading completion
3. Call `rune.ImportFromFile(versionPath, patchInfo, scope)`

**Implementation pattern** (find where items are imported and add after):
```go
// After items are imported...
err = rune.ImportFromFile(versionPath, patchInfo, scope)
if err != nil {
    // log and handle error appropriately
}
```

**Acceptance**: 
- loader-service compiles without error
- Rune import call added in correct sequence
- Error handling consistent with item import

**Dependencies**: T008 (needs ImportFromFile function)

**Reference**: Look for item.ImportFromFile() call in main.go for placement pattern

---

### T011: Quickstart Acceptance Test

**File**: Manual test (no code)

**Action**: Execute quickstart.md scenario:
1. Prepare test data: Use example from quickstart.md or `specs/002-runes-uploader/runesReforged.json`
2. Call ImportFromFile with test directory
3. Query ClickHouse: `SELECT * FROM runes FINAL`
4. Verify runes appear with correct data

**Acceptance Criteria** (from quickstart.md):
- Valid runesReforged.json file uploads successfully
- System responds with completion (no error)
- Rune data appears in ClickHouse database
- Data persists on subsequent queries

**Manual Test Steps**:
```bash
# 1. Ensure database is up
docker-compose -f deployments/docker/docker-compose.yml up

# 2. Run database schema
# Connect to ClickHouse and execute scripts/database.sql

# 3. Build loader-service
cd src/backend && go build ./app/loader-service

# 4. Prepare test data directory with runesReforged.json

# 5. Run loader (adjust paths as needed)
./loader-service --data-path=path/to/test/data

# 6. Query ClickHouse
# SELECT COUNT(*) FROM runes FINAL
# Should return > 0
```

**Dependencies**: T001-T010 (entire feature must be implemented)

---

## Implementation Checklist

Before marking complete:

- [x] All contracts have test scenarios (in go-api.md comments, MVP skips implementation)
- [x] All entities created (Rune, CreateRuneEvent)
- [x] All conversion functions pure and side-effect-free
- [x] All action functions handle errors explicitly
- [x] All functions follow Go conventions (PascalCase exports)
- [x] All database access uses batch inserts
- [x] Imports use full module path (lol-build-bench/...)
- [x] Error messages include context (file paths, IDs)
- [x] Logging structured per constitution

---

## Validation Gates

**Before T001 (Setup)**:
- Database server ready (docker-compose running)
- Go 1.25.3 installed

**Before T002-T003 (Entities)**:
- uuid package available (`github.com/google/uuid` or similar)
- time/timestamp handling consistent with existing patches/items

**Before T004 (ReadRuneData)**:
- encoding/json available (standard library)
- dragontail.RunePathData structures defined (this task)

**Before T005-T006 (Conversions)**:
- Rune and CreateRuneEvent structs exist
- uuid.New() works correctly

**Before T007 (Queue)**:
- ClickHouse Go driver installed
- applicationScope package available
- PrepareBatch API exists in driver version

**Before T008 (ImportFromFile)**:
- All prior entities and conversions exist
- patch.Patch struct available
- io/file operations match existing patterns

**Before T010 (Integration)**:
- T008 compiles and exports ImportFromFile
- loader-service compiles with new import
- No naming conflicts with existing item imports

**Before T011 (Validation)**:
- All code compiles without errors
- Database schema applied
- Loader service integrated

---

## Success Criteria

Feature complete when:

1. ✓ All 11 tasks completed
2. ✓ src/backend builds without errors: `cd src/backend && go build ./app/loader-service`
3. ✓ Quickstart acceptance scenario passes
4. ✓ runesReforged.json data appears in `SELECT * FROM runes FINAL`
5. ✓ No panics or runtime errors
6. ✓ Code follows existing patterns (matches item uploader)
7. ✓ Structured logging in place
8. ✓ Error handling with context

---

## Notes

- **No unit/integration tests** per MVP constitution (see plan.md)
- **Pattern mirrors item uploader** (002-create-a-items) - reference for implementation details
- **CloudEvent pattern** consistent across all entities
- **Batch inserts required** for performance (see go-api.md performance section)
- **Low priority** - low volume, once-monthly updates
- **Estimated 15-20 hours** for full implementation including integration testing

---

*Based on Constitution v2.1.1 and Design Documents Phase 1*
*Last Updated: 2025-12-14*
