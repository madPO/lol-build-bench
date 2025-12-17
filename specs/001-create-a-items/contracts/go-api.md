# Go API Contracts: Items Uploaders

**Feature**: Items Uploaders  
**Date**: 2025-12-14  
**Package**: features/item

## Overview

This document defines the internal Go API contracts for the items uploader feature. These functions follow the established pattern from the patch uploader and adhere to the constitutional principle of clear separation between conversion functions (pure) and actions (side effects).

---

## Public API Functions

### ImportFromFile

**Package**: `features/item`  
**File**: `importFromFile.go`

**Signature**:
```go
func ImportFromFile(rootPath string, Patch patch, scope applicationScope.Scope) error
```

**Purpose**: 
Load items from Data Dragon manifest file, filter to Summoner's Rift (map ID 11), and push item creation events to the queue.

**Parameters**:
- `rootPath` (string): Absolute path to Data Dragon version directory containing manifest and data files
  - Expected structure: `{rootPath}/manifest.json` and `{rootPath}/data/{language}/item.json`
- `patch` (Patch): a patch info include language
- `scope` (applicationScope.Scope): Application scope containing database connection and configuration

**Return Value**:
- `error`: nil on success, error with context on failure

**Behavior**:
1. Read manifest from `{rootPath}/manifest.json` using `dragontail.ReadManifest()`
2. Construct item data file path: `{rootPath}/data/{manifest.Language}/item.json`
3. Parse JSON file into map of item IDs to ItemData structures
4. For each item in the map:
   - Check if `ItemData.Maps["11"]` is true (Summoner's Rift availability)
   - If false, skip item (filter out)
   - If true, create Item entity and CreateItemEvent
   - Push event to queue via `PushItemEvent()`
5. Return error if any step fails (manifest read, file parse, queue push)

**Error Cases**:
- Manifest file not found or invalid JSON → return error with file path
- Item data file not found → return error with constructed path
- Invalid JSON in item data file → return error with parse details
- Queue push failure → return error from `PushItemEvent()`
- Database connection failure → return error from queue operations

**Side Effects**:
- Reads files from filesystem
- Writes item creation events to ClickHouse via queue
- Logs errors using structured logging

**Example Usage**:
```go
scope := applicationScope.NewScope(dbConnection, config)
err := item.ImportFromFile("/path/to/dragontail/13.24.1", scope)
if err != nil {
    log.Printf("Failed to import items: %v", err)
    return err
}
```

**Contract Test** (SKIPPED for MVP):
```go
// Test: Valid Data Dragon directory
// Given: Valid manifest and item.json files
// When: ImportFromFile called with directory path
// Then: Returns nil error and items inserted to database

// Test: Missing manifest file
// Given: Directory without manifest.json
// When: ImportFromFile called
// Then: Returns error containing "manifest"

// Test: Invalid item JSON
// Given: Malformed item.json file
// When: ImportFromFile called
// Then: Returns error containing "parse" or "JSON"

// Test: Map ID filtering
// Given: Items with mixed map availability
// When: ImportFromFile called
// Then: Only items with Maps["11"]=true are inserted
```

---

### PushItemEvent

**Package**: `features/item`  
**File**: `importFromFile.go`

**Signature**:
```go
func PushItemEvent(event CreateItemEvent, scope applicationScope.Scope) error
```

**Purpose**: 
Send item creation event to ClickHouse queue for persistence.

**Parameters**:
- `event` (CreateItemEvent): Fully constructed item creation event with CloudEvent metadata
- `scope` (applicationScope.Scope): Application scope containing database connection

**Return Value**:
- `error`: nil on success, error with context on failure

**Behavior**:
1. Call `OpenItemQueue(scope)` to get push and commit functions
2. If queue opening fails, return error immediately
3. Call push function with event
4. If push fails, return error immediately
5. Call commit function to finalize transaction
6. Return commit result (nil or error)

**Error Cases**:
- Queue connection failure → return error from `OpenItemQueue()`
- Push failure (serialization error, constraint violation) → return error from push function
- Commit failure (network issue, transaction error) → return error from commit function

**Side Effects**:
- Writes event to ClickHouse items table
- Commits database transaction

**Example Usage**:
```go
event := item.CreateEventFromItem(itemEntity)
err := item.PushItemEvent(event, scope)
if err != nil {
    log.Printf("Failed to push item event: %v", err)
    return err
}
```

**Contract Test** (SKIPPED for MVP):
```go
// Test: Valid event push
// Given: Valid CreateItemEvent and database connection
// When: PushItemEvent called
// Then: Returns nil and event stored in database

// Test: Database connection failure
// Given: Invalid scope or unavailable database
// When: PushItemEvent called
// Then: Returns error from OpenItemQueue

// Test: Serialization failure
// Given: Event with unserializable data
// When: PushItemEvent called
// Then: Returns error from push function
```

---

### OpenItemQueue

**Package**: `features/item`  
**File**: `itemQueue.go`

**Signature**:
```go
func OpenItemQueue(scope applicationScope.Scope) (
    func(CreateItemEvent) error,  // push function
    func() error,                  // commit function
    error,                         // connection error
)
```

**Purpose**: 
Open ClickHouse connection and return functions for pushing events and committing the transaction.

**Parameters**:
- `scope` (applicationScope.Scope): Application scope containing database connection configuration

**Return Values**:
1. `func(CreateItemEvent) error`: Push function to queue an item event (returns error on failure)
2. `func() error`: Commit function to finalize transaction (returns error on failure)
3. `error`: Connection error (nil on success, non-nil on connection failure)

**Behavior**:
1. Extract database connection from scope
2. Prepare ClickHouse batch insert using `conn.PrepareBatch()`
   - SQL: `INSERT INTO items (iid, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)`
   - Creates batch context for efficient bulk inserts
3. Create push function (closure) that:
   - Serializes CreateItemEvent fields to batch.Append() call
   - Maps event fields to items table columns in correct order
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
push, commit, err := item.OpenItemQueue(scope)
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
func OpenItemQueue(scope applicationScope.Scope) (
    func(CreateItemEvent) error,
    func() error,
    error,
) {
    // Get ClickHouse connection from scope
    conn := scope.GetClickHouseConnection()
    
    // Prepare batch insert (efficient for multiple rows)
    batch, err := conn.PrepareBatch(context.Background(), `
        INSERT INTO items (
            iid, oid, name, map_id, patch_oid, created_time,
            source, specversion, type, datacontenttype, subject, data
        )
    `)
    if err != nil {
        return nil, nil, fmt.Errorf("prepare batch: %w", err)
    }
    
    // Push function: Append row to batch (in-memory, no I/O)
    push := func(event CreateItemEvent) error {
        err := batch.Append(
            event.Data.IID,
            event.Data.OID,
            event.Data.Name,
            event.Data.MapId,
            event.Data.PatchOID,
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
- **Batch Size**: Typically 100-1000 items per patch (Data Dragon average)
- **Memory Usage**: ~1KB per queued item (in-memory batch buffer)
- **Network I/O**: Single round-trip on commit (vs. N round-trips for individual inserts)
- **Throughput**: ~10,000-50,000 rows/sec with batch inserts vs. ~100-500 rows/sec individual
- **Efficiency**: 100-500x faster than individual INSERT statements

**Contract Test** (SKIPPED for MVP):
```go
// Test: Successful batch operations
// Given: Valid scope and database connection
// When: OpenItemQueue called, 100 events pushed, commit called
// Then: All functions return nil and 100 rows inserted in single batch

// Test: Connection failure
// Given: Invalid database configuration
// When: OpenItemQueue called
// Then: Returns (nil, nil, connection error)

// Test: Batch commit without push
// Given: Opened queue with no events pushed
// When: Commit called
// Then: Returns nil (empty batch commits successfully)

// Test: Large batch (1000+ items)
// Given: 1000+ events pushed to batch
// When: Commit called
// Then: All rows inserted successfully in single operation
```

---

## Conversion Functions (Pure)

These functions have no side effects and perform only data transformations.

### CreateItemFromItemData

**Package**: `entities/item`  
**File**: `item.go`

**Signature**:
```go
func CreateItemFromItemData(itemID string, itemData dragontail.ItemData, patchID string) Item
```

**Purpose**: 
Convert raw Data Dragon item data to Item entity.

**Parameters**:
- `itemID` (string): Original item ID from Data Dragon JSON key
- `itemData` (dragontail.ItemData): Parsed item data structure
- `patchID` (string): Patch version identifier (e.g., "13.24.1")

**Return Value**:
- `Item`: Fully constructed Item entity with generated IID and timestamp

**Behavior**:
- Generate new UUID for IID
- Copy itemID to OID
- Copy itemData.Name to Name
- Set MapId to 11 (hardcoded, already filtered)
- Set PatchOID to patchOID parameter
- Set CreatedTime to current UTC time

**Side Effects**: None (pure function)

**Example**:
```go
item := item.CreateItemFromItemData("1001", bootsData, "13.24.1")
// Item{IID: uuid, OID: "1001", Name: "Boots of Speed", MapId: 11, ...}
```

---

### CreateEventFromItem

**Package**: `entities/item`  
**File**: `createItemEvent.go`

**Signature**:
```go
func CreateEventFromItem(item Item) CreateItemEvent
```

**Purpose**: 
Wrap Item entity in CloudEvent structure.

**Parameters**:
- `item` (Item): Item entity to wrap

**Return Value**:
- `CreateItemEvent`: CloudEvent with item as data payload

**Behavior**:
- Set Source to "dragontail"
- Set SpecVersion to "1.0"
- Set Type to "item.created"
- Set DataContentType to "application/json"
- Set Subject to item.Name
- Set Data to item

**Side Effects**: None (pure function)

**Example**:
```go
event := item.CreateEventFromItem(itemEntity)
// CreateItemEvent{Source: "dragontail", Type: "item.created", Subject: "Boots", Data: itemEntity}
```

---

## Data Structures

### Item

See [data-model.md](../data-model.md#1-item-entitiesitemitemgo) for complete definition.

**Summary**:
```go
type Item struct {
    IID         uuid.UUID
    OID         string
    Name        string
    PatchID    string
    CreatedTime time.Time
}
```

---

### CreateItemEvent

See [data-model.md](../data-model.md#2-createitemevent-entitiesitemcreateitemeventgo) for complete definition.

**Summary**:
```go
type CreateItemEvent struct {
    Source          string
    SpecVersion     string
    Type            string
    DataContentType string
    Subject         string
    Data            dragontail.Item
}
```

---

### ItemData (dragontail package)

See [data-model.md](../data-model.md#3-itemdata-entitiesdragontailitemdatago) for complete definition.

**Summary**:
```go
type ItemData struct {
    Name        string
    Description string
    Gold        GoldData
    Tags        []string
    Maps        map[string]bool
    Stats       map[string]float64
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

**dragontail.ReadItemData** (NEW):
```go
func ReadItemData(filePath string) (map[string]ItemData, error)
```
- Reads and parses `item.json` file
- Returns map of item ID to ItemData
- Used by ImportFromFile

---

## Error Handling Patterns

All functions follow Go error handling conventions:

1. **Return errors explicitly**: Use `return err` or `return fmt.Errorf("context: %w", err)`
2. **Wrap errors with context**: Add relevant information (file path, item ID, etc.)
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
- `INFO`: Successful operations (e.g., "Imported 150 items from patch 13.24.1")
- `WARN`: Non-fatal issues (e.g., "Skipped 12 items not available on map 11")
- `ERROR`: Operation failures (e.g., "Failed to read item data file: file not found")

**Required Log Points**:
1. Start of ImportFromFile: `INFO: item.ImportFromFile - Starting import: path=%s`
2. Manifest read success: `INFO: item.ImportFromFile - Read manifest: version=%s language=%s`
3. Item filtering: `INFO: item.ImportFromFile - Filtered items: total=%d map11=%d`
4. Import completion: `INFO: item.ImportFromFile - Import complete: items=%d`
5. Any errors: `ERROR: item.ImportFromFile - Operation failed: error=%v`

---

## Performance Considerations

**Batch Insert Operations** (REQUIRED):
- `OpenItemQueue` MUST use ClickHouse driver's `PrepareBatch()` API
- All items from a patch imported in a single batch operation
- Batch.Append() calls are in-memory (no network I/O until commit)
- Batch.Send() transmits entire batch in single network round-trip
- Typical batch size: 100-1000 items per patch (Data Dragon average)
- Performance gain: 100-500x faster than individual INSERT statements

**Implementation Requirements**:
```go
// REQUIRED: Use PrepareBatch for all inserts
batch, err := conn.PrepareBatch(ctx, "INSERT INTO items (...)")

// REQUIRED: Append rows in loop (fast, in-memory)
for _, event := range events {
    batch.Append(event.Data.IID, event.Data.OID, ...)
}

// REQUIRED: Single Send() call for entire batch
err = batch.Send()
```

**Memory Usage**:
- Item.json file: Typically <5MB per patch (loaded fully into memory)
- Batch buffer: ~1KB per queued item (held until commit)
- Peak memory: ~6-10MB for typical patch import
- Process items sequentially to avoid duplicate allocations
- Release itemData map after event creation

**Database Performance**:
- Batch inserts: 10,000-50,000 rows/sec
- Individual inserts: 100-500 rows/sec (DO NOT USE)
- Network overhead: 1 round-trip per batch vs. N round-trips individual
- ClickHouse handles ReplacingMergeTree merges asynchronously
- No need to query for duplicates before inserting (automatic deduplication)

**Benchmarks** (reference only, MVP excludes performance testing):
- 200 items (typical patch): <100ms with batch, ~20-40s individual
- 1000 items (large update): <500ms with batch, ~100-200s individual
- Network latency impact: Minimal with batch, linear with individual

---

## References

- Feature Specification: `specs/001-create-a-items/spec.md`
- Data Model: `specs/001-create-a-items/data-model.md`
- Database Schema: `specs/001-create-a-items/contracts/database-schema.sql`
- Existing Patch Uploader: `src/backend/features/patch/importFromFile.go`
- Constitution: `.specify/memory/constitution.md`
