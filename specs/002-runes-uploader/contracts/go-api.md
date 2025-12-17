# Go API Contracts: Runes Uploader

**Feature**: Runes Uploader  
**Date**: 2025-12-14  
**Package**: features/rune

## Overview

This document defines the internal Go API contracts for the runes uploader feature. These functions follow the established pattern from the item uploader and adhere to the constitutional principle of clear separation between conversion functions (pure) and actions (side effects).

---

## Public API Functions

### ImportFromFile

**Package**: `features/rune`  
**File**: `importFromFile.go`

**Signature**:
```go
func ImportFromFile(rootPath string, Patch patch.Patch, scope applicationScope.Scope) error
```

**Purpose**:
Load runes from Data Dragon manifest file, and push rune creation events to the queue.

**Parameters**:
- `rootPath` (string): Absolute path to Data Dragon version directory containing manifest and data files
  - Expected structure: `{rootPath}/manifest.json` and `{rootPath}/data/{language}/runesReforged.json`
- `patch` (patch.Patch): a patch info include language
- `scope` (applicationScope.Scope): Application scope containing database connection and configuration

**Return Value**:
- `error`: nil on success, error with context on failure

**Behavior**:
1. Read manifest from `{rootPath}/manifest.json` using `dragontail.ReadManifest()`
2. Construct rune data file path: `{rootPath}/data/{manifest.Language}/runesReforged.json`
3. Parse JSON file into a slice of RunePathData structures
4. For each RunePathData in the slice:
   - For each slot in RunePathData:
     - For each rune in the slot:
       - Create Rune entity and CreateRuneEvent
       - Push event to queue via `PushRuneEvent()`
5. Return error if any step fails (manifest read, file parse, queue push)

**Error Cases**:
- Manifest file not found or invalid JSON → return error with file path
- Rune data file not found → return error with constructed path
- Invalid JSON in rune data file → return error with parse details
- Queue push failure → return error from `PushRuneEvent()`
- Database connection failure → return error from queue operations

**Side Effects**:
- Reads files from filesystem
- Writes rune creation events to ClickHouse via queue
- Logs errors using structured logging

**Example Usage**:
```go
scope := applicationScope.NewScope(dbConnection, config)
patch := patch.Patch{ /* ... */ }
err := rune.ImportFromFile("/path/to/dragontail/13.24.1", patch, scope)
if err != nil {
    log.Printf("Failed to import runes: %v", err)
    return err
}
```

**Contract Test** (SKIPPED for MVP):
```go
// Test: Valid Data Dragon directory
// Given: Valid manifest and runesReforged.json files
// When: ImportFromFile called with directory path
// Then: Returns nil error and runes inserted to database

// Test: Missing manifest file
// Given: Directory without manifest.json
// When: ImportFromFile called
// Then: Returns error containing "manifest"

// Test: Invalid rune JSON
// Given: Malformed runesReforged.json file
// When: ImportFromFile called
// Then: Returns error containing "parse" or "JSON"
```

---

### PushRuneEvent

**Package**: `features/rune`  
**File**: `importFromFile.go`

**Signature**:
```go
func PushRuneEvent(event CreateRuneEvent, scope applicationScope.Scope) error
```

**Purpose**:
Send rune creation event to ClickHouse queue for persistence.

**Parameters**:
- `event` (CreateRuneEvent): Fully constructed rune creation event with CloudEvent metadata
- `scope` (applicationScope.Scope): Application scope containing database connection

**Return Value**:
- `error`: nil on success, error with context on failure

**Behavior**:
1. Call `OpenRuneQueue(scope)` to get push and commit functions
2. If queue opening fails, return error immediately
3. Call push function with event
4. If push fails, return error immediately
5. Call commit function to finalize transaction
6. Return commit result (nil or error)

**Error Cases**:
- Queue connection failure → return error from `OpenRuneQueue()`
- Push failure (serialization error, constraint violation) → return error from push function
- Commit failure (network issue, transaction error) → return error from commit function

**Side Effects**:
- Writes event to ClickHouse runes table
- Commits database transaction

**Example Usage**:
```go
event := rune.CreateEventFromRune(runeEntity)
err := rune.PushRuneEvent(event, scope)
if err != nil {
    log.Printf("Failed to push rune event: %v", err)
    return err
}
```

**Contract Test** (SKIPPED for MVP):
```go
// Test: Valid event push
// Given: Valid CreateRuneEvent and database connection
// When: PushRuneEvent called
// Then: Returns nil and event stored in database

// Test: Database connection failure
// Given: Invalid scope or unavailable database
// When: PushRuneEvent called
// Then: Returns error from OpenRuneQueue

// Test: Serialization failure
// Given: Event with unserializable data
// When: PushRuneEvent called
// Then: Returns error from push function
```

---

### OpenRuneQueue

**Package**: `features/rune`  
**File**: `runeQueue.go`

**Signature**:
```go
func OpenRuneQueue(scope applicationScope.Scope) (
    func(CreateRuneEvent) error,  // push function
    func() error,                  // commit function
    error,                         // connection error
)
```

**Purpose**:
Open ClickHouse connection and return functions for pushing events and committing the transaction.

**Parameters**:
- `scope` (applicationScope.Scope): Application scope containing database connection configuration

**Return Values**:
1. `func(CreateRuneEvent) error`: Push function to queue a rune event (returns error on failure)
2. `func() error`: Commit function to finalize transaction (returns error on failure)
3. `error`: Connection error (nil on success, non-nil on connection failure)

**Behavior**:
1. Extract database connection from scope
2. Prepare ClickHouse batch insert using `conn.PrepareBatch()`
   - SQL: `INSERT INTO runes (rid, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)`
   - Creates batch context for efficient bulk inserts
3. Create push function (closure) that:
   - Serializes CreateRuneEvent fields to batch.Append() call
   - Maps event fields to runes table columns in correct order
   - Adds row to batch (NOT executed yet, queued in memory)
   - Returns error if serialization or append fails
4. Create commit function (closure) that:
   - Executes batch.Send() to insert all queued rows in single operation
   - ClickHouse processes entire batch atomically
   - Returns error if network failure or constraint violation occurs
5. Return (push, commit, nil) on success or (nil, nil, error) on connection failure

**Error Cases**:
- Database connection unavailable → return (nil, nil, connection error)
- Batch preparation failure → return (nil, nil, preparation error)
- Push function errors: serialization failure, type mismatch, batch.Append() failure
- Commit function errors: network failure, constraint violation, batch.Send() failure

**Side Effects**:
- Opens database connection
- Creates batch insert context using ClickHouse driver's PrepareBatch()
- Push function: Appends rows to in-memory batch (no network I/O)
- Commit function: Sends entire batch to ClickHouse in single network round-trip

**Example Usage**:
```go
push, commit, err := rune.OpenRuneQueue(scope)
if err != nil {
    log.Printf("Failed to open queue: %v", err)
    return err
}

err = push(event1)
if err != nil {
    return err
}

err = push(event2)
if err != nil {
    return err
}

err = commit()
if err != nil {
    log.Printf("Failed to commit events: %v", err)
    return err
}
```

**Implementation Pattern**:
```go
func OpenRuneQueue(scope applicationScope.Scope) (
    func(CreateRuneEvent) error,
    func() error,
    error,
) {
    // Get ClickHouse connection from scope
    conn := scope.GetClickHouseConnection()
    
    // Prepare batch insert (efficient for multiple rows)
    batch, err := conn.PrepareBatch(context.Background(), `
        INSERT INTO runes (
            rid, oid, pid, created_time,
            source, specversion, type, datacontenttype, subject, data
        )
    `)
    if err != nil {
        return nil, nil, fmt.Errorf("prepare batch: %w", err)
    }
    
    // Push function: Append row to batch (in-memory, no I/O)
    push := func(event CreateRuneEvent) error {
        err := batch.Append(
            event.Data.RID,
            event.Data.OID,
            event.Data.PID,
            event.Data.CreatedTime,
            event.Source,
            event.SpecVersion,
            event.Type,
            event.DataContentType,
            event.Subject,
            event.Data, // JSON serialization handled by driver
        )
        if err != nil {
            return fmt.Errorf("append to batch: %w", err)
        }
        return nil
    }
    
    // Commit function: Send entire batch (single network round-trip)
    commit := func() error {
        err := batch.Send()
        if err != nil {
            return fmt.Errorf("send batch: %w", err)
        }
        return nil
    }
    
    return push, commit, nil
}
```

**Performance Characteristics**:
- **Batch Size**: Typically 100-1000 runes per patch (Data Dragon average)
- **Memory Usage**: ~1KB per queued rune (in-memory batch buffer)
- **Network I/O**: Single round-trip on commit (vs. N round-trips for individual inserts)
- **Throughput**: ~10,000-50,000 rows/sec with batch inserts vs. ~100-500 rows/sec individual
- **Efficiency**: 100-500x faster than individual INSERT statements

**Contract Test** (SKIPPED for MVP):
```go
// Test: Successful batch operations
// Given: Valid scope and database connection
// When: OpenRuneQueue called, 100 events pushed, commit called
// Then: All functions return nil and 100 rows inserted in single batch

// Test: Connection failure
// Given: Invalid database configuration
// When: OpenRuneQueue called
// Then: Returns (nil, nil, connection error)

// Test: Batch commit without push
// Given: Opened queue with no events pushed
// When: Commit called
// Then: Returns nil (empty batch commits successfully)

// Test: Large batch (1000+ runes)
// Given: 1000+ events pushed to batch
// When: Commit called
// Then: All rows inserted successfully in single operation
```

---

## Conversion Functions (Pure)

These functions have no side effects and perform only data transformations.

### CreateRuneFromRuneData

**Package**: `entities/rune`  
**File**: `rune.go`

**Signature**:
```go
func CreateRuneFromRuneData(runeData dragontail.RuneData, patchID string) Rune
```

**Purpose**:
Convert raw Data Dragon rune data to Rune entity.

**Parameters**:
- `runeData` (dragontail.RuneData): Parsed rune data structure
- `patchID` (string): Patch version identifier (e.g., "13.24.1")

**Return Value**:
- `Rune`: Fully constructed Rune entity with generated RID and timestamp

**Behavior**:
- Generate new UUID for RID
- Copy runeData.ID to OID
- Copy runeData.Name to Name
- Set PID to patchID parameter
- Set CreatedTime to current UTC time
- Copy other relevant fields from runeData to Rune entity

**Side Effects**: None (pure function)

**Example**:
```go
rune := rune.CreateRuneFromRuneData(electrocuteData, "13.24.1")
// Rune{RID: uuid, OID: "8112", Name: "Electrocute", PID: "13.24.1", ...}
```

---

### CreateEventFromRune

**Package**: `entities/rune`  
**File**: `createRuneEvent.go`

**Signature**:
```go
func CreateEventFromRune(rune Rune) CreateRuneEvent
```

**Purpose**:
Wrap Rune entity in CloudEvent structure.

**Parameters**:
- `rune` (Rune): Rune entity to wrap

**Return Value**:
- `CreateRuneEvent`: CloudEvent with rune as data payload

**Behavior**:
- Set Source to "dragontail"
- Set SpecVersion to "1.0"
- Set Type to "rune.created"
- Set DataContentType to "application/json"
- Set Subject to rune.Name
- Set Data to rune

**Side Effects**: None (pure function)

**Example**:
```go
event := rune.CreateEventFromRune(runeEntity)
// CreateRuneEvent{Source: "dragontail", Type: "rune.created", Subject: "Electrocute", Data: runeEntity}
```

---

## Data Structures

### Rune

See [data-model.md](../data-model.md#entity-rune) for complete definition.

**Summary**:
```go
type Rune struct {
    RID         uuid.UUID
    OID         string
    Name        string
    Key         string
    Icon        string
    ShortDesc   string
    LongDesc    string
    PID         string
    CreatedTime time.Time
}
```

---

### CreateRuneEvent

See [data-model.md](../data-model.md#entity-rune) for complete definition.

**Summary**:
```go
type CreateRuneEvent struct {
    Source          string
    SpecVersion     string
    Type            string
    DataContentType string
    Subject         string
    Data            Rune
}
```

---

### RunePathData (dragontail package)

**Summary**:
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
```

### RuneData (dragontail package)

**Summary**:
```go
type RuneData struct {
    ID        int    `json:"id"`
    Key       string `json:"key"`
    Icon      string `json:"icon"`
    Name      string `json:"name"`
    ShortDesc string `json:"shortDesc"`
    LongDesc  string `json:"longDesc"`
}
```

---

## Integration Points

### Existing Dependencies

**dragontail.ReadManifest** (existing):
```go
func ReadManifest(rootPath string) (*Manifest, error)
```
- Used by ImportFromFile to read version/language metadata
- Returns `Manifest{Version, Language}`

**applicationScope.Scope** (existing):
- Contains database connection and configuration
- Passed to all action functions for resource access

### New Dependencies (to be implemented)

**dragontail.ReadRuneData** (NEW):
```go
func ReadRuneData(filePath string) ([]RunePathData, error)
```
- Reads and parses `runesReforged.json` file
- Returns slice of RunePathData
- Used by ImportFromFile

---

## Error Handling Patterns

All functions follow Go error handling conventions:

1. **Return errors explicitly**: Use `return err` or `return fmt.Errorf("context: %w", err)`
2. **Wrap errors with context**: Add relevant information (file path, rune ID, etc.)
3. **Log errors before returning**: Use structured logging with error details
4. **Fail fast**: Return immediately on error, don't continue processing
5. **No panics**: Never use panic for expected error conditions

**Example**:
```go
manifest, err := dragontail.ReadManifest(rootPath)
if err != nil {
    log.Printf("ERROR: Failed to read manifest from %s: %v", rootPath, err)
    return fmt.Errorf("read manifest from %s: %w", rootPath, err)
}
```

---

## Logging Requirements

Per constitutional observability requirements:

**Structured Logging Format**:
```go
log.Printf("LEVEL: Component - Message: key1=%v key2=%v", val1, val2)
```

**Log Levels**:
- `INFO`: Successful operations (e.g., "Imported 150 runes from patch 13.24.1")
- `WARN`: Non-fatal issues (e.g., "Skipped 12 runes not available on map 11")
- `ERROR`: Operation failures (e.g., "Failed to read rune data file: file not found")

**Required Log Points**:
1. Start of ImportFromFile: `INFO: rune.ImportFromFile - Starting import: path=%s`
2. Manifest read success: `INFO: rune.ImportFromFile - Read manifest: version=%s language=%s`
3. Import completion: `INFO: rune.ImportFromFile - Import complete: runes=%d`
4. Any errors: `ERROR: rune.ImportFromFile - Operation failed: error=%v`

---

## Performance Considerations

**Batch Insert Operations** (REQUIRED):
- `OpenRuneQueue` MUST use ClickHouse driver's `PrepareBatch()` API
- All runes from a patch imported in a single batch operation
- Batch.Append() calls are in-memory (no network I/O until commit)
- Batch.Send() transmits entire batch in single network round-trip
- Typical batch size: 100-1000 runes per patch (Data Dragon average)
- Performance gain: 100-500x faster than individual INSERT statements

**Implementation Requirements**:
```go
// REQUIRED: Use PrepareBatch for all inserts
batch, err := conn.PrepareBatch(ctx, "INSERT INTO runes (...)")

// REQUIRED: Append rows in loop (fast, in-memory)
for _, event := range events {
    batch.Append(event.Data.RID, event.Data.OID, ...)
}

// REQUIRED: Single Send() call for entire batch
err = batch.Send()
```

**Memory Usage**:
- runesReforged.json file: Typically <5MB per patch (loaded fully into memory)
- Batch buffer: ~1KB per queued rune (held until commit)
- Peak memory: ~6-10MB for typical patch import
- Process runes sequentially to avoid duplicate allocations
- Release runeData map after event creation

**Database Performance**:
- Batch inserts: 10,000-50,000 rows/sec
- Individual inserts: 100-500 rows/sec (DO NOT USE)
- Network overhead: 1 round-trip per batch vs. N round-trips individual
- ClickHouse handles ReplacingMergeTree merges asynchronously
- No need to query for duplicates before inserting (automatic deduplication)

**Benchmarks** (reference only, MVP excludes performance testing):
- 200 runes (typical patch): <100ms with batch, ~20-40s individual
- 1000 runes (large update): <500ms with batch, ~100-200s individual
- Network latency impact: Minimal with batch, linear with individual

---

## References

- Feature Specification: `specs/002-runes-uploader/spec.md`
- Data Model: `specs/002-runes-uploader/data-model.md`
- Database Schema: `specs/002-runes-uploader/contracts/database-schema.sql`
- Existing Item Uploader: `src/backend/features/item/importFromFile.go`
- Constitution: `.specify/memory/constitution.md`
