# Data Model: Items Uploaders

**Feature**: Items Uploaders  
**Date**: 2025-12-14  
**Status**: Complete

## Overview

This document defines the data structures for the Items Uploaders feature, following the constitutional principle of data-only models (no methods, no business logic). All entities follow the existing architectural pattern used in the patch uploader system.

---

## Entity Definitions

### 1. Item (entities/item/item.go)

**Purpose**: Represents a League of Legends in-game item with core attributes extracted from Data Dragon.

**Structure**:
```go
package item

import (
    "time"
    "github.com/google/uuid"
)

type Item struct {
    IID         uuid.UUID  // Item identifier (generated, primary key)
    OID         string     // Original item ID from Data Dragon (e.g., "1001")
    Name        string     // Item name (e.g., "Boots of Speed")
    MapId       int32      // Map identifier - always 11 for Summoner's Rift
    PatchOID    string     // Reference to patch OID (foreign key to patches.oid)
    CreatedTime time.Time  // Timestamp when item record was created
    Data        []byte     // Full item data payload as JSON
}
```

**Field Descriptions**:
- `IID`: Generated UUID for internal identification and deduplication tracking
- `OID`: Original item ID from Riot Data Dragon (e.g., "3340" for Farsight Alteration)
- `Name`: Human-readable item name used as CloudEvent subject and display identifier
- `MapId`: Map identifier - always 11 for Summoner's Rift (filtering applied in business logic)
- `PatchOID`: Links item to specific patch version (references `patches.oid` field)
- `CreatedTime`: UTC timestamp for version ordering in ReplacingMergeTree
- `Plaintext`: Description to item
- `PartOf`: list of items, where is part of
- `Image`: item picture in different way
- `Currency`: item purchase value
- `Stats`: item stat

**Relationships**:
- Many-to-One with Patch: Each item belongs to one patch version via `PatchID`
- ClickHouse handles relationship via `pid` field (no foreign key constraints)

**Validation Rules** (enforced in features layer):
- `Name` must not be empty string
- `OID` must be unique within a patch version
- `PatchOID` must reference valid patch (business logic check)

**Storage Behavior**:
- ReplacingMergeTree automatically retains only latest `CreatedTime` for each (subject, type, created_time, pid) tuple
- Updates to same item (same subject/type/created_time/pid) replace previous version
- No manual deduplication required

---

### 2. CreateItemEvent (entities/item/createItemEvent.go)

**Purpose**: CloudEvent wrapper for item creation events, following the established event-driven architecture pattern.

**Structure**:
```go
package item

type CreateItemEvent struct {
    Source          string  // Event source identifier (always "dragontail")
    SpecVersion     string  // CloudEvents specification version (always "1.0")
    Type            string  // Event type (always "item.created")
    DataContentType string  // Content type of data field (always "application/json")
    Subject         string  // Item name (for event routing/filtering)
    Data            Item    // Actual item data payload
}
```

**Field Descriptions**:
- `Source`: Identifies event origin - always "dragontail" for Data Dragon imports
- `SpecVersion`: CloudEvents specification version - currently "1.0"
- `Type`: Event type discriminator - always "item.created" for item upload events
- `DataContentType`: MIME type of Data field - always "application/json"
- `Subject`: Business identifier (item name) for event filtering and routing
- `Data`: Embedded Item entity containing full item details

**CloudEvent Mapping**:
```
CloudEvent Field    → CreateItemEvent Field
-----------------     ----------------------
source              → Source
specversion         → SpecVersion
type                → Type
datacontenttype     → DataContentType
subject             → Subject
data                → Data (serialized as JSON)
```

**Usage Pattern**:
1. Business logic creates Item entity
2. Wrap Item in CreateItemEvent with metadata
3. Send event to queue (features/item/itemQueue.go)
4. Queue writes event to ClickHouse items table
5. ClickHouse merges duplicate events based on ReplacingMergeTree logic

---


## Database Schema

### Items Table (ClickHouse)

**File**: `scripts/database.sql` (to be updated)

```sql
CREATE TABLE IF NOT EXISTS items (
    -- Item identifiers
    iid UUID,                           -- Generated item identifier (primary)
    oid String,                         -- Original item ID from Data Dragon (e.g., "1001", "3340")
    pid String,                   -- Reference to patch PID (foreign key to patches.pid)
    created_time DateTime64(3, 'UTC'), -- Event creation timestamp (used for version ordering)

    -- CloudEvent metadata (standardized event structure)
    source String,                      -- Event source identifier (always "dragontail")
    specversion String,                 -- CloudEvents specification version (always "1.0")
    type String,                        -- Event type discriminator (always "item.created")
    datacontenttype String,             -- Data content MIME type (always "application/json")
    subject String,                     -- CloudEvent subject (item name for routing/filtering)

    -- Full item data payload
    data JSON                           -- Complete item details from Data Dragon (stats, gold, description, etc.)

) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, created_time, pid);
```

**Engine Configuration**:
- `ReplacingMergeTree(created_time)`: Automatically keeps row with latest `created_time` for each unique (subject, type, created_time, pid)
- `ORDER BY (subject, type, created_time, pid)`: Defines uniqueness constraint and sort order for efficient queries

**Indexes**:
- Primary index: (subject, type, created_time, pid) via ORDER BY clause
- Enables fast queries by item subject, type, created_time, and patch ID

**Query Patterns**:
```sql
-- Get all items for a map
SELECT * FROM items WHERE JSONExtractInt(data, 'MapId') = 11 FINAL;

-- Get specific item by name
SELECT * FROM items WHERE subject = 'Boots of Speed' FINAL;

-- Get items for specific patch
SELECT * FROM items WHERE pid = '13.24.1' FINAL;

-- Get latest item versions (FINAL ensures deduplication)
SELECT * FROM items FINAL ORDER BY created_time DESC;
```

**Note**: `FINAL` modifier forces ReplacingMergeTree to collapse duplicate rows in query results.

---

## Data Flow

### Import Flow (File → Database)

```
1. File System
   └─ {version}/data/{language}/item.json

2. Manifest Reading (dragontail.ReadManifest)
   └─ Manifest{Version, Language}

3. JSON Parsing (features/item/importFromFile.go)
   └─ map[itemID]ItemData

4. Filtering (business logic)
   └─ Filter where ItemData.Maps["11"] == true

5. Event Wrapping
   └─ CreateItemEvent{Source, SpecVersion, Type, Subject, Data=Item}

6. Queue Push (features/item/itemQueue.go)
   └─ PushItemEvent(event, scope)

7. ClickHouse Insert
   └─ INSERT INTO items VALUES (...)

8. Automatic Deduplication (ReplacingMergeTree)
   └─ Keep latest created_time for each (subject, type, created_time, pid)
```

### Query Flow (Database → Application)

```
1. Application Query
   └─ SELECT * FROM items WHERE JSONExtractInt(data, 'MapId') = 11 FINAL

2. ClickHouse Processing
   └─ Apply FINAL to collapse duplicates
   └─ Filter by map_id
   └─ Return result set

3. Row Deserialization
   └─ Map columns to Item struct

4. Application Processing
   └─ Use Item data for builds, analysis, etc.
```

---

## Conversion Functions

**Note**: These are pure functions without side effects, per constitutional program structure.

### CreateItemFromItemData

**Location**: `entities/item/item.go` (conversion section)

```go
// CreateItemFromItemData converts raw Data Dragon item data to Item entity
// Pure function - no side effects
func CreateItemFromItemData(itemID string, itemData dragontail.ItemData, patchOID string) Item {
    // Marshal itemData to JSON for the 'Data' field
    jsonData, err := json.Marshal(itemData)
    if err != nil {
        // Handle error appropriately, e.g., log and return a zero-value Item or error
        // For now, we'll panic for simplicity in this example
        panic(fmt.Sprintf("failed to marshal itemData: %v", err))
    }

    return Item{
        IID:         uuid.New(),
        OID:         itemID,
        Name:        itemData.Name,
        MapId:       11, // Hardcoded - already filtered
        PatchOID:    patchOID,
        CreatedTime: time.Now().UTC(),
        Data:        jsonData,
    }
}
```

### CreateEventFromItem

**Location**: `entities/item/createItemEvent.go` (conversion section)

```go
// CreateEventFromItem wraps Item entity in CloudEvent structure
// Pure function - no side effects
func CreateEventFromItem(item Item) CreateItemEvent {
    return CreateItemEvent{
        Source:          "dragontail",
        SpecVersion:     "1.0",
        Type:            "item.created",
        DataContentType: "application/json",
        Subject:         item.Name,
        Data:            item,
    }
}
```

---

## Validation Rules Summary

**Pre-Entity Creation** (in features/item/importFromFile.go):
- ✓ `ItemData.Maps["11"]` must be true (filter out non-Summoner's Rift items)
- ✓ `ItemData.Name` must not be empty string
- ✓ `itemID` (OID) must be present in JSON keys
- ✓ `patchOID` must reference valid patch (business logic check)

**Entity Constraints** (enforced by Item struct):
- ✓ `MapId` is always 11 (hardcoded after filter)
- ✓ `IID` is always valid UUID (generated by uuid.New())
- ✓ `CreatedTime` is always valid UTC timestamp (generated by time.Now().UTC())

**Database Constraints** (enforced by ClickHouse schema):
- ✓ Type constraints: UUID, String, Int32, DateTime64
- ✓ Uniqueness: ReplacingMergeTree enforces latest version per (subject, type, created_time, pid)
- ✓ Ordering: ORDER BY ensures efficient queries by subject, type, created_time, and pid

---

## Relationships

### Item → Patch (Many-to-One)

**Foreign Key**: `Item.PatchOID` references `Patch.OID`

**Referential Integrity**: 
- Not enforced at database level (ClickHouse limitation)
- Enforced in business logic (features/item/importFromFile.go)
- Manifest reading ensures patch exists before item import

**Query Pattern**:
```sql
-- Get all items for a specific patch
SELECT i.* 
FROM items i
WHERE i.patch_oid = '13.24.1'
  AND i.map_id = 11
FINAL;

-- Join items with patches (if needed)
SELECT p.version, i.name, i.data
FROM items i FINAL
JOIN patches p FINAL ON i.patch_oid = p.oid
WHERE i.map_id = 11;
```

---

## State Transitions

Items are **immutable** once created. No state transitions exist.

**Lifecycle**:
1. **Created**: Item imported from Data Dragon file
2. **Stored**: Item written to ClickHouse
3. **Replaced**: If same item (name/oid/mapId) re-imported, ReplacingMergeTree keeps latest version
4. **Queried**: Item retrieved for builds/analysis

**No Update/Delete Operations**: 
- Updates handled by re-importing with newer `created_time`
- Deletes not supported (latest version always retained)
- Historical data not preserved (per spec constraint)

---

## References

- Feature Specification: `specs/001-create-a-items/spec.md`
- Research Findings: `specs/001-create-a-items/research.md`
- Constitution: `.specify/memory/constitution.md`
- Existing Patch Model: `src/backend/entities/patch/patch.go`
- Existing CloudEvent: `src/backend/entities/cloudEvent/cloudEvent.go`
