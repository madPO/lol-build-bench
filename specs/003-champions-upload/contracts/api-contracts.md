# API Contracts: Champions Upload

**Feature**: 003-champions-upload  
**Date**: 2025-12-15  
**Status**: Contract Specification  
**Technology**: Go Function Calls (Direct Integration)

---

## Overview

Champions upload is a backend-internal feature that loads League of Legends champion data from JSON files into ClickHouse. The implementation provides Go functions that can be called directly by the loader service or CLI tools. The feature follows the event-driven CloudEvent pattern established in the project constitution.

**Communication Style**: Direct Go function calls  
**Data Format**: JSON (from file) → CloudEvent objects (in database)  
**Async Pattern**: CloudEvent wrapper for each champion stored in database

---

## Function Definition: ImportFromFile

**Purpose**: Import champion data from JSON files into ClickHouse database

**Package**: `src/backend/features/champion`  
**Function**: `ImportFromFile(basePath string, patch *Patch) error`

---

## Function Parameters

```go
// ImportFromFile loads champion data from JSON files and persists to ClickHouse
func ImportFromFile(basePath string, patch *Patch) error {
    // basePath: Base directory path (e.g., "/data/champions" or "champions")
    // patch: Patch object containing metadata for this import
    // Returns: error if import fails, nil on success
    // 
    // Actual file path pattern: basePath/patchId/data/language/champions/
    // Example: /data/champions/patch_15_24_1/data/en_US/champions/
}

// Patch object contains all patch metadata
type Patch struct {
    ID       string // Patch identifier (e.g., "15.24.1", semantic version)
    PatchID  string // Database reference (e.g., "patch_15_24_1", foreign key)
    Language string // Language code (e.g., "en_US")
}
```

### Parameters

| Parameter | Type | Required | Purpose |
|-----------|------|----------|---------|
| `basePath` | string | Yes | Base directory containing patch data |
| `patch` | *Patch | Yes | Patch metadata object with ID, PatchID, and Language |

### Patch Structure

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `ID` | string | Version identifier (semantic version) | "15.24.1" |
| `PatchID` | string | Database reference/foreign key | "patch_15_24_1" |
| `Language` | string | Language code for localization | "en_US" |

### File Path Construction

Given inputs:
```
basePath = "/data/champions"
patch.PatchID = "patch_15_24_1"
patch.Language = "en_US"
```

Function constructs path:
```
/data/champions/patch_15_24_1/data/en_US/champions/
```

This directory contains individual JSON files, one per champion (e.g., `Annie.json`, `Ahri.json`, etc.)

### Example Function Call

```go
patch := &Patch{
    ID:       "15.24.1",
    PatchID:  "patch_15_24_1",
    Language: "en_US",
}

err := champion.ImportFromFile("/data/champions", patch)
if err != nil {
    log.Fatal(err)
}
log.Println("Champions imported successfully")
```

### Parameters

| Parameter | Type | Required | Constraints | Purpose |
|-----------|------|----------|-------------|---------|
| `filePath` | string | Yes | Valid file path, JSON format | Local path to champions data file |
| `patchId` | string | Yes | Format: "patch_X_Y_Z" | Patch identifier (foreign key to patches table) |

### Example Function Call

```go
result, err := champion.ImportFromFile(
    "champions.json",
    "patch_15_24_1",
)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Imported %d champions\n", result.SuccessCount)
```

---

## Return Type: Error Only

The function returns:
- `nil` on successful import
- `error` if import fails

No result structure or intermediate statistics returned. All champions must be successfully imported or the entire operation fails.

```go
// Success case
err := champion.ImportFromFile("/data/champions", patch)
if err == nil {
    // All champions imported successfully
}

// Failure case
err := champion.ImportFromFile("/data/champions", patch)
if err != nil {
    log.Printf("Import failed: %v", err)
    // Could be: file not found, database error, invalid JSON, etc.
}
```

### Error Types

| Error Scenario | Example Error | Action |
|---|---|---|
| Directory not found | `os.ErrNotExist` | Verify path and patch metadata |
| Database connection failed | `"database connection refused"` | Check ClickHouse availability |
| Invalid JSON in champion file | `"invalid JSON in Annie.json: unexpected EOF"` | Verify file format |
| Missing required field | `"champion file Annie.json: missing required field 'key'"` | Fix champion data |
| Database insert failed | `"ClickHouse insert error: ..."` | Investigate database issues |

---

## Import Pipeline

### File Discovery
1. Construct path: `basePath/patchId/data/language/champions/`
2. Scan directory for JSON files (one per champion)
3. Read each champion file (e.g., `Annie.json`, `Ahri.json`)

### Processing (No Validation Phase)
1. Parse JSON from each champion file
2. Extract champion data from JSON
3. Create CloudEvent record
4. Persist to ClickHouse database
5. Continue to next champion file

**Note**: No validation phase. Invalid data in files causes import to fail with error.

### Champion Record Requirements

Each champion JSON file must contain:

#### Identity Fields
| Field | Type | Required | Validation | Error Reason |
|-------|------|----------|-----------|--------------|
| `id` | string | Yes | Non-empty, 1-100 chars | `missing_field_id` / `invalid_id_format` |
| `key` | integer | Yes | Non-negative integer | `missing_field_key` / `invalid_key_type` |
| `name` | string | Yes | Non-empty, 1-100 chars | `missing_field_name` |
| `title` | string | Yes | Non-empty, 1-200 chars | `missing_field_title` |
| `partype` | string | Yes | One of: Mana, Energy, Fury, etc. | `missing_field_partype` / `invalid_partype` |

#### Data Structure
Each champion JSON file must match the Annie.json format:
```json
{
  "id": "Annie",
  "key": 1,
  "name": "Annie",
  "title": "the Dark Child",
  "partype": "Mana",
  "image": {...},
  "baseStats": {...},
  "levelStats": {...},
  "spells": [...],
  "passive": {...}
}
```

**Required fields** (or import fails):
- `id`: Champion identifier
- `key`: Numeric key
- `name`: Display name
- `title`: Champion title
- `partype`: Resource type
- `image`: Portrait sprites
- Stats: All base and level scaling stats
- `spells`: Array of 4 ability objects
- `passive`: Passive ability object

---

## Error Scenarios & Recovery

### File Not Found
**Cause**: Champion file missing from expected directory  
**Behavior**: Return error, no data imported  
**Recovery**: Verify file path and directory structure

### Invalid JSON
**Cause**: Malformed JSON in champion file  
**Behavior**: Return error with file name, stop import  
**Recovery**: Fix JSON syntax, retry import

### Missing Required Field
**Cause**: Champion file missing required field (e.g., `key`)  
**Behavior**: Return error with field name and file, stop import  
**Recovery**: Add missing field, retry import

### Database Connection Failure
**Cause**: ClickHouse unavailable or connection refused  
**Behavior**: Return error, no data imported  
**Recovery**: Check database health, ensure connectivity, retry import

### All-or-Nothing Guarantee
If any champion file fails to import, the entire import operation fails. No partial imports are persisted.

---

## CloudEvent Wrapper (Database Storage)

Champions are stored directly as CloudEvent objects in the database:

```json
{
  "cid": "550e8400-e29b-41d4-a716-446655440000",
  "oid": "Annie",
  "pid": "patch_15_24_1",
  "created_time": "2025-12-15T10:30:00Z",
  "source": "dragontail",
  "specversion": "1.0",
  "type": "champion.created",
  "datacontenttype": "application/json",
  "subject": "Annie",
  "data": {
    "id": "Annie",
    "key": 1,
    "name": "Annie",
    "title": "the Dark Child",
    "partype": "Mana",
    "image": {...},
    "baseStats": {...},
    "levelStats": {...},
    "spells": [...],
    "passive": {...}
  }
}
```

### CloudEvent Attributes

| Field | Type | Value | Purpose |
|-------|------|-------|---------|
| `cid` | UUID | Auto-generated | Event identifier (unique per import) |
| `oid` | String | Champion ID | Original champion ID from Data Dragon |
| `pid` | String | Patch reference | Foreign key to patches table (e.g., "patch_15_24_1") |
| `created_time` | DateTime | Import timestamp | Used for version ordering and deduplication |
| `source` | String | "dragontail" | CloudEvent source identifier |
| `specversion` | String | "1.0" | CloudEvents specification version |
| `type` | String | "champion.created" | Event type identifier |
| `datacontenttype` | String | "application/json" | Data payload format |
| `subject` | String | Champion name | Routing/filtering identifier (e.g., "Annie") |
| `data` | JSON | Champion object | Complete champion definition with all attributes |

---

## Integration Example

### Direct Function Call (Go)

```go
package main

import (
    "log"
    "lol-builds/src/backend/features/champion"
    "lol-builds/src/backend/entities/patch"
)

func main() {
    // Create patch object with metadata
    p := &patch.Patch{
        ID:       "15.24.1",
        PatchID:  "patch_15_24_1",
        Language: "en_US",
    }
    
    // Call import function directly
    // Path resolves to: /data/champions/patch_15_24_1/data/en_US/champions/
    err := champion.ImportFromFile("/data/champions", p)
    if err != nil {
        log.Fatal(err)
    }
    
    log.Println("Champions imported successfully")
}
```

### From Loader Service

```go
// In src/backend/app/loader-service/main.go
import (
    "log"
    "lol-builds/src/backend/features/champion"
    "lol-builds/src/backend/entities/patch"
)

// Load patch metadata
p := &patch.Patch{
    ID:       "15.24.1",
    PatchID:  "patch_15_24_1",
    Language: "en_US",
}

// Import champions
basePath := "/data/league-of-legends"
err := champion.ImportFromFile(basePath, p)
if err != nil {
    logger.Error("champion import failed", err)
    return
}

logger.Info("champions imported successfully", "patch", p.PatchID, "language", p.Language)
```

---

## Structured Logging

### Import Started
```
[INFO] Champion import started
  file_path: "champions.json"
  patch_id: "patch_15_24_1"
  json_size: 245KB
```

### Progress Update
```
[INFO] Champion validation in progress
  processed: 50/162
  valid: 50
  errors: 0
```

### Import Completed
```
[INFO] Champion import completed
  status: "PARTIAL_SUCCESS"
  total: 162
  success: 160
  failure: 2
  duration_ms: 2345
```

### Validation Error (Per Record)
```
[WARN] Champion validation failed
  champion_id: "TestChampion"
  reason: "invalid_stat_value"
  field: "baseHp"
  value: "not_a_number"
```

### Critical Error
```
[ERROR] Champion import failed
  error: "database connection refused"
  patch_id: "patch_15_24_1"
```

---

## Performance Characteristics

| Metric | Target | Notes |
|--------|--------|-------|
| Max request size | 10MB | Typical is ~500KB for all 160 champions |
| Import latency | <5 seconds | For 160 champions |
| Per-champion latency | ~30ms | Includes validation + insert |
| Database insert latency | <2 seconds | Batch insert to ClickHouse |
| Error overhead | <5% | Per-champion validation |

---

## Backward Compatibility

### Version Changes

| Version | Change | Compatibility |
|---------|--------|----------------|
| 1.0 | Initial release | N/A |
| 1.1+ | Add optional fields to ImportChampionsRequest | Backward compatible (old clients work) |
| 2.0+ | Change response structure | Breaking change (old clients fail) |

### Schema Evolution

- Adding optional fields: ✓ Backward compatible
- Removing fields: ✗ Breaking change
- Renaming fields: ✗ Breaking change
- Changing field types: ✗ Breaking change

---

## Related Documents

- Data Model: `/specs/003-champions-upload/data-model.md`
- Database Schema: `/specs/003-champions-upload/contracts/database-schema.sql`
- Feature Specification: `/specs/003-champions-upload/spec.md`
- Implementation Plan: `/specs/003-champions-upload/plan.md`

---

*API Contracts: 2025-12-15*  
*Status: Ready for implementation*
