# Phase 0: Research - Items Uploaders

**Feature**: Items Uploaders  
**Date**: 2025-12-14  
**Status**: Complete

## Research Overview

This document consolidates research findings to resolve all NEEDS CLARIFICATION markers from the feature specification and establish technical decisions for implementation.

## Research Questions & Findings

### 1. Item Data Source Format

**Question**: What format should item data files use for loading?

**Research Approach**:
- Analyzed existing patch loader implementation (features/patch/importFromFile.go)
- Reviewed dragontail manifest structure (entities/dragontail/manifest.go)
- Examined League of Legends Data Dragon documentation patterns

**Findings**:
- Existing patch loader uses `dragontail.ReadManifest(rootPath)` returning `{Version, Language}` struct
- Data Dragon provides item data in JSON format per patch version
- File structure: `{version}/data/{language}/item.json`
- JSON contains map of item IDs to item objects with properties: name, description, gold, stats, maps (map availability)

**Decision**: Use dragontail manifest pattern with JSON item data files
- Item data files follow Data Dragon structure: `{version}/data/{language}/item.json`
- Read manifest for version/language metadata
- Parse item.json for item details
- Filter items where `maps["11"] === true` (Summoner's Rift availability)

**Rationale**: 
- Consistency with existing patch loading pattern
- Matches official Riot Data Dragon structure
- Minimal code duplication
- Established pattern for version/language handling

**Alternatives Considered**:
1. Custom JSON format - Rejected: Duplicates Data Dragon work, requires transformation layer
2. CSV format - Rejected: Less structured, harder to represent nested item data
3. Direct API calls - Rejected: Out of scope for file-based loader service

---

### 2. Item Validation Rules

**Question**: What specific validation rules apply to item data before storing?

**Research Approach**:
- Reviewed ClickHouse schema requirements for data types
- Analyzed patch validation patterns (implicit from existing code)
- Examined Data Dragon item data structure for required fields

**Findings**:
- ClickHouse enforces type constraints (String, Int32, UUID, DateTime64)
- Patch loader has minimal validation (relies on manifest structure)
- Data Dragon item objects always contain: name, description, gold, tags, maps
- Item IDs are numeric strings (e.g., "1001", "3340")

**Decision**: Minimal validation for MVP phase
- Required fields: item name (non-empty string), original ID, mapId presence
- Type validation: Implicit via Go struct marshaling
- Map availability: Filter to mapId=11 before storage
- Schema validation: Rely on ClickHouse schema constraints

**Validation Rules**:
```go
// Pseudo-validation logic
- item.Name != "" (name required)
- item.Maps["11"] == true (Summoner's Rift availability)
- item.Gold != nil (basic structural check)
```

**Rationale**:
- MVP phase prioritizes rapid development over comprehensive validation
- ClickHouse schema provides structural validation
- Data Dragon data is generally well-formed (trusted source)
- Additional validation can be added post-MVP based on observed issues

**Alternatives Considered**:
1. Comprehensive validation (all fields, ranges, relationships) - Rejected: Over-engineering for MVP
2. No validation - Rejected: Risk of data quality issues, debugging difficulties
3. JSON Schema validation - Rejected: Adds dependency, complexity for MVP

---

### 3. ClickHouse Table Design

**Question**: How should the items table be structured for optimal performance and deduplication?

**Research Approach**:
- Analyzed existing patches table schema (scripts/database.sql)
- Reviewed ClickHouse MergeTree engine family documentation
- Researched ReplacingMergeTree for automatic deduplication
- Examined CloudEvent pattern used in patches table

**Findings**:
- Patches table uses MergeTree with ORDER BY (subject, type, created_time)
- CloudEvent fields: source, specversion, type, datacontenttype, subject, data (JSON)
- ReplacingMergeTree(version_column) automatically keeps latest version based on version column
- Sorting key determines uniqueness for deduplication
- Best practice: Use created_time as version column for temporal ordering

**Decision**: Mirror patches table with ReplacingMergeTree engine
```sql
CREATE TABLE IF NOT EXISTS items (
    iid UUID,                    -- Item identifier (generated)
    oid String,                  -- Original item ID from Data Dragon
    name String,                 -- Item name
    map_id Int32,                -- Map ID (filtered to 11)
    patch_oid String,            -- Reference to patch OID
    created_time DateTime64(3, 'UTC'),  -- Event timestamp
    source String,               -- CloudEvent source
    specversion String,          -- CloudEvent spec version
    type String,                 -- CloudEvent type: "item.created"
    datacontenttype String,      -- CloudEvent data content type
    subject String,              -- CloudEvent subject: item name
    data JSON                    -- Full item data as JSON
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (name, map_id, oid);
```

**Rationale**:
- ReplacingMergeTree provides automatic deduplication (requirement from spec)
- ORDER BY (name, map_id, oid) creates natural uniqueness constraint
- CloudEvent pattern maintains architectural consistency
- created_time as version column ensures latest data retained
- JSON data field preserves full item details for future queries

**Alternatives Considered**:
1. Plain MergeTree - Rejected: Manual deduplication required, violates spec requirement
2. Separate versioning table - Rejected: Added complexity, contradicts "latest only" requirement
3. CollapsingMergeTree - Rejected: Requires explicit deletion rows, more complex than needed

---

### 4. Map ID Filtering Strategy

**Question**: Where should map ID filtering occur (business logic vs. database)?

**Research Approach**:
- Analyzed patch loader data flow: File → Manifest → Event → Queue → Database
- Reviewed separation of concerns in existing architecture
- Considered query performance implications

**Findings**:
- Patch loader filters in business logic (features/patch/importFromFile.go)
- Event creation happens after data validation/transformation
- Database stores only processed, validated data
- Filtering in business logic prevents unnecessary storage and event processing

**Decision**: Filter in business logic layer (features/item/importFromFile.go)
```go
// Read item data from file
items := parseItemJSON(dataFile)

// Filter to map ID 11
for itemID, itemData := range items {
    if itemData.Maps["11"] != true {
        continue  // Skip items not available on Summoner's Rift
    }
    
    // Create event for valid items
    event := CreateItemEvent(itemData, patchOID)
    PushItemEvent(event, scope)
}
```

**Rationale**:
- Prevents storing irrelevant data (efficiency)
- Reduces database size and query overhead
- Clear separation: business logic handles filtering, database handles storage
- Consistent with existing patch loader pattern
- Easier to modify filtering logic without schema changes

**Alternatives Considered**:
1. Database-level filtering (WHERE map_id = 11) - Rejected: Data already stored, wasted space
2. Client-side filtering (query time) - Rejected: Wrong architectural layer, repeated computation
3. Both layers (redundant filtering) - Rejected: Unnecessary duplication

---

## Technology Stack Confirmation

Based on existing codebase analysis:

**Language**: Go 1.25.3 (confirmed from go.mod)  
**Database**: ClickHouse v2.41.0 (confirmed from go.mod)  
**Key Libraries**:
- github.com/ClickHouse/clickhouse-go/v2 v2.41.0 (database driver)
- github.com/google/uuid v1.6.0 (UUID generation)
- Standard library: encoding/json, time, errors, log

**Architecture Patterns**:
- CloudEvents for all data changes (confirmed from patches table)
- Event-driven with queue pattern (PushEvent, OpenQueue functions)
- Three-layer structure: entities/ (data), features/ (logic), services/ (interfaces)

**Constraints**:
- No tests during MVP phase (constitutional requirement)
- Code as documentation (constitutional requirement)
- Always use latest dependencies (constitutional requirement)
- ReplacingMergeTree automatic deduplication (confirmed from analysis)

---

## Batch Insert Strategy

**Question**: How should items be inserted into ClickHouse for optimal performance?

**Research Approach**:
- Reviewed ClickHouse Go driver documentation (clickhouse-go/v2)
- Analyzed performance characteristics of batch vs. individual inserts
- Examined typical Data Dragon item counts per patch

**Findings**:
- ClickHouse driver provides `PrepareBatch()` API for efficient bulk inserts
- Batch inserts are 100-500x faster than individual INSERT statements
- Batch.Append() is in-memory operation (no network I/O)
- Batch.Send() transmits entire batch in single network round-trip
- Typical Data Dragon patch contains 100-1000 items

**Decision**: Use batch insert operations for all item imports
- Use `conn.PrepareBatch()` to create batch context
- Call `batch.Append()` for each item (in-memory queuing)
- Call `batch.Send()` once at end to transmit entire batch
- All items from one import operation processed in single batch

**Rationale**:
- 100-500x performance improvement over individual inserts
- Reduces network overhead from N round-trips to 1 round-trip
- Efficient for typical batch sizes (100-1000 items)
- Supported natively by ClickHouse driver (no additional dependencies)

**Alternatives Considered**:
1. Individual INSERT statements - Rejected: 100-500x slower, excessive network overhead
2. Manual batching with multi-row INSERT - Rejected: Driver's PrepareBatch() is more efficient and safer
3. External ETL tool - Rejected: Over-engineering for simple import task

---

## Implementation Patterns

### Pattern 1: File Loading (from patch loader)
```go
func ImportFromFile(rootPath string, scope applicationScope.Scope) error {
    manifest, err := dragontail.ReadManifest(rootPath)
    if err != nil {
        return err
    }
    
    // Load item data from {rootPath}/data/{manifest.Language}/item.json
    // Parse and filter items
    // Create events
    
    return nil
}
```

### Pattern 2: Event Creation (from patch)
```go
type CreateItemEvent struct {
    Source          string
    SpecVersion     string
    Type            string
    DataContentType string
    Subject         string
    Data            Item
}

func CreateEventFromManifest(manifest Manifest, itemData ItemData) CreateItemEvent {
    return CreateItemEvent{
        Source:          "dragontail",
        SpecVersion:     "1.0",
        Type:            "item.created",
        DataContentType: "application/json",
        Subject:         itemData.Name,
        Data:            transformToItem(itemData),
    }
}
```

### Pattern 3: Batch Insert Operations (ClickHouse driver)
```go
func OpenItemQueue(scope applicationScope.Scope) (
    func(CreateItemEvent) error,  // push function
    func() error,                  // commit function
    error,                         // connection error
) {
    conn := scope.GetClickHouseConnection()
    
    // Prepare batch insert (REQUIRED for performance)
    batch, err := conn.PrepareBatch(context.Background(), `
        INSERT INTO items (iid, oid, name, map_id, patch_oid, ...)
    `)
    if err != nil {
        return nil, nil, err
    }
    
    // Push: Append to in-memory batch (no I/O)
    push := func(event CreateItemEvent) error {
        return batch.Append(
            event.Data.IID,
            event.Data.OID,
            event.Data.Name,
            // ... all fields
        )
    }
    
    // Commit: Send entire batch (single network round-trip)
    commit := func() error {
        return batch.Send()
    }
    
    return push, commit, nil
}
```

---

## Outstanding Questions

**None** - All NEEDS CLARIFICATION markers from specification have been resolved.

---

## Next Steps

Proceed to Phase 1: Design & Contracts
- Create data-model.md with Item and CreateItemEvent structures
- Generate database schema in contracts/ directory
- Document API contracts for Go functions
- Create quickstart.md for manual testing procedures
- Update AGENTS.md with item-specific build/run commands

---

## References

- Existing implementation: `src/backend/features/patch/importFromFile.go`
- Existing schema: `scripts/database.sql`
- Existing entities: `src/backend/entities/patch/patch.go`
- Constitution: `.specify/memory/constitution.md`
- Feature spec: `specs/001-create-a-items/spec.md`
