# Data Model: Runes Uploader

**Feature**: Runes Uploader  
**Date**: 2025-12-17  
**Status**: Complete

## Overview

This document defines the data structures for the Runes Uploader feature, following the constitutional principle of data-only models (no methods, no business logic). All entities follow the existing architectural pattern used in the patch uploader system.

---

## Entity Definitions

### 1. Rune (entities/rune/rune.go)

**Purpose**: Represents a League of Legends rune with core attributes extracted from Data Dragon.

**Structure**:
```go
package rune

import (
    "time"
    "github.com/google/uuid"
)

type Rune struct {
    EventID     uuid.UUID  // Event identifier (generated, primary key)
    OID         string     // Original rune ID from Data Dragon (e.g., "8100")
    Name        string     // Rune name (e.g., "Electrocute")
    PatchOID    string     // Reference to patch OID (foreign key to patches.oid)
    CreatedTime time.Time  // Timestamp when rune record was created
    Data        []byte     // Full rune data payload as JSON
}
```

**Field Descriptions**:
- `EventID`: Generated UUID for internal identification and deduplication tracking
- `OID`: Original rune ID from Riot Data Dragon (e.g., "8100" for Electrocute)
- `Name`: Human-readable rune name used as CloudEvent subject and display identifier
- `PatchOID`: Links rune to specific patch version (references `patches.oid` field)
- `CreatedTime`: UTC timestamp for version ordering in ReplacingMergeTree
- `Data`: Complete rune data including description, icon, path information

**Relationships**:
- Many-to-One with Patch: Each rune belongs to one patch version via `PatchOID`
- ClickHouse handles relationship via `pid` field (no foreign key constraints)

**Validation Rules** (enforced in features layer):
- `Name` must not be empty string
- `OID` must be unique within a patch version
- `PatchOID` must reference valid patch (business logic check)

**Storage Behavior**:
- ReplacingMergeTree automatically retains only latest `CreatedTime` for each (subject, type, pid) tuple
- Updates to same rune (same subject/type/pid) replace previous version
- No manual deduplication required

---

### 2. CreateRuneEvent (entities/rune/createRuneEvent.go)

**Purpose**: CloudEvent wrapper for rune creation events, following the established event-driven architecture pattern.

**Structure**:
```go
package rune

type CreateRuneEvent struct {
    Source          string  // Event source identifier (always "dragontail")
    SpecVersion     string  // CloudEvents specification version (always "1.0")
    Type            string  // Event type (always "rune.created")
    DataContentType string  // Content type of data field (always "application/json")
    Subject         string  // Rune name (for event routing/filtering)
    Data            Rune    // Actual rune data payload
}
```

**Field Descriptions**:
- `Source`: Identifies event origin - always "dragontail" for Data Dragon imports
- `SpecVersion`: CloudEvents specification version - currently "1.0"
- `Type`: Event type discriminator - always "rune.created" for rune upload events
- `DataContentType`: MIME type of Data field - always "application/json"
- `Subject`: Business identifier (rune name) for event filtering and routing
- `Data`: Embedded Rune entity containing full rune details

**CloudEvent Mapping**:
```
CloudEvent Field    → CreateRuneEvent Field
-----------------     ----------------------
source              → Source
specversion         → SpecVersion
type                → Type
datacontenttype     → DataContentType
subject             → Subject
data                → Data (serialized as JSON)
```

**Usage Pattern**:
1. Business logic creates Rune entity
2. Wrap Rune in CreateRuneEvent with metadata
3. Send event to queue (features/rune/runeQueue.go)
4. Queue writes event to ClickHouse runes table
5. ClickHouse merges duplicate events based on ReplacingMergeTree logic

---

## Database Schema

### Runes Table (ClickHouse)

**File**: `scripts/database.sql` (to be updated)

```sql
CREATE TABLE IF NOT EXISTS runes (
    -- Rune identifiers
    event_id UUID,                           -- Generated event identifier (primary key)
    oid String,                         -- Original rune ID from source system
    pid String,                        -- Reference to patch
    
    -- CloudEvent metadata (standardized event structure)
    created_time DateTime64(3, 'UTC'),     -- Event creation timestamp
    source String,                          -- Event source identifier
    specversion String,                     -- CloudEvents specification version
    type String,                            -- Event type discriminator
    datacontenttype String,                 -- Data content MIME type
    subject String,                         -- CloudEvent subject (business identifier)
    
    -- Full data payload
    data JSON                               -- Complete entity data
    
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, pid);
```

**Engine Configuration**:
- `ReplacingMergeTree(created_time)`: Automatically keeps row with latest `created_time` for each unique (subject, type, pid)
- `ORDER BY (subject, type, pid)`: Defines uniqueness constraint and sort order for efficient queries

**Indexes**:
- Primary index: (subject, type, pid) via ORDER BY clause
- Enables fast queries by rune subject, type, and patch ID

**Query Patterns**:
```sql
-- Get all runes
SELECT * FROM runes FINAL;

-- Get specific rune by name
SELECT * FROM runes WHERE subject = 'Electrocute' FINAL;

-- Get runes for specific patch
SELECT * FROM runes WHERE pid = '13.24.1' FINAL;

-- Get latest rune versions (FINAL ensures deduplication)
SELECT * FROM runes FINAL ORDER BY created_time DESC;
```

**Note**: `FINAL` modifier forces ReplacingMergeTree to collapse duplicate rows in query results.

---

## Data Flow

### Import Flow (File → Database)

```
1. File System
   └─ {version}/data/{language}/runesReforged.json

2. Manifest Reading (dragontail.ReadManifest)
   └─ Manifest{Version, Language}

3. JSON Parsing (features/rune/importFromFile.go)
   └─ RuneReforgedData structure

4. Event Wrapping
   └─ CreateRuneEvent{Source, SpecVersion, Type, Subject, Data=Rune}

5. Queue Push (features/rune/runeQueue.go)
   └─ PushRuneEvent(event, scope)

6. ClickHouse Insert
   └─ INSERT INTO runes VALUES (...)

7. Automatic Deduplication (ReplacingMergeTree)
   └─ Keep latest created_time for each (subject, type, pid)
```

### Query Flow (Database → Application)

```
1. Application Query
   └─ SELECT * FROM runes WHERE subject = 'Electrocute' FINAL

2. ClickHouse Processing
   └─ Apply FINAL to collapse duplicates
   └─ Filter by subject
   └─ Return result set

3. Row Deserialization
   └─ Map columns to Rune struct

4. Application Processing
   └─ Use Rune data for builds, analysis, etc.
```

---

## Conversion Functions

**Note**: These are pure functions without side effects, per constitutional program structure.

### CreateRuneFromRuneData

**Location**: `entities/rune/rune.go` (conversion section)

```go
// CreateRuneFromRuneData converts raw Data Dragon rune data to Rune entity
// Pure function - no side effects
func CreateRuneFromRuneData(runeID int, runeData dragontail.RuneData, patchOID string) Rune {
    // Marshal runeData to JSON for the 'Data' field
    jsonData, err := json.Marshal(runeData)
    if err != nil {
        panic(fmt.Sprintf("failed to marshal runeData: %v", err))
    }

    return Rune{
        EventID:     uuid.New(),
        OID:         strconv.Itoa(runeID),
        Name:        runeData.Name,
        PatchOID:    patchOID,
        CreatedTime: time.Now().UTC(),
        Data:        jsonData,
    }
}
```

### CreateEventFromRune

**Location**: `entities/rune/createRuneEvent.go` (conversion section)

```go
// CreateEventFromRune wraps Rune entity in CloudEvent structure
// Pure function - no side effects
func CreateEventFromRune(rune Rune) CreateRuneEvent {
    return CreateRuneEvent{
        Source:          "dragontail",
        SpecVersion:     "1.0",
        Type:            "rune.created",
        DataContentType: "application/json",
        Subject:         rune.Name,
        Data:            rune,
    }
}
```

---

## Validation Rules Summary

**Pre-Entity Creation** (in features/rune/importFromFile.go):
- ✓ `runeData.Name` must not be empty string
- ✓ `runeID` (OID) must be present in JSON structure
- ✓ `patchOID` must reference valid patch (business logic check)

**Entity Constraints** (enforced by Rune struct):
- ✓ `EventID` is always valid UUID (generated by uuid.New())
- ✓ `CreatedTime` is always valid UTC timestamp (generated by time.Now().UTC())

**Database Constraints** (enforced by ClickHouse schema):
- ✓ Type constraints: UUID, String, DateTime64
- ✓ Uniqueness: ReplacingMergeTree enforces latest version per (subject, type, pid)
- ✓ Ordering: ORDER BY ensures efficient queries by subject, type, and pid

---

## Relationships

### Rune → Patch (Many-to-One)

**Foreign Key**: `Rune.PatchOID` references `Patch.OID`

**Referential Integrity**: 
- Not enforced at database level (ClickHouse limitation)
- Enforced in business logic (features/rune/importFromFile.go)
- Manifest reading ensures patch exists before rune import

**Query Pattern**:
```sql
-- Get all runes for a specific patch
SELECT r.* 
FROM runes r
WHERE r.pid = '13.24.1'
FINAL;

-- Join runes with patches (if needed)
SELECT p.version, r.name, r.data
FROM runes r FINAL
JOIN patches p FINAL ON r.pid = p.oid;
```

---

## State Transitions

Runes are **immutable** once created. No state transitions exist.

**Lifecycle**:
1. **Created**: Rune imported from Data Dragon file
2. **Stored**: Rune written to ClickHouse
3. **Replaced**: If same rune (name/oid) re-imported, ReplacingMergeTree keeps latest version
4. **Queried**: Rune retrieved for builds/analysis

**No Update/Delete Operations**: 
- Updates handled by re-importing with newer `created_time`
- Deletes not supported (latest version always retained)
- Historical data not preserved (per spec constraint)

---

## References

- Feature Specification: `specs/002-runes-uploader/spec.md`
- Research Findings: `specs/002-runes-uploader/research.md`
- Constitution: `.specify/memory/constitution.md`
- Existing Patch Model: `src/backend/entities/patch/patch.go`
- Existing CloudEvent: `src/backend/entities/cloudEvent/cloudEvent.go`