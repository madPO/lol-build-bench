# Quickstart: Champions Upload Feature

**Feature**: 003-champions-upload  
**Date**: 2025-12-15  
**Purpose**: Validate champion import functionality end-to-end

---

## Prerequisites

Before running this quickstart, ensure you have:

1. **ClickHouse Service Running**
   ```bash
   cd deployments/docker
   docker-compose up -d
   ```
   Verify: `docker-compose ps` should show clickhouse-server running

2. **Database Initialized**
   ```bash
   # Connect to ClickHouse
   docker-compose exec clickhouse-server clickhouse-client
   
   # Run schema creation
   source scripts/database.sql
   ```
   Verify: `SHOW TABLES;` should include `champions` table

3. **Go Environment**
   ```bash
   go version  # Should be 1.25.3 or later
   ```

4. **Champion Data Directory Structure**
   ```
   /data/champions/
   └── patch_15_24_1/
       └── data/
           └── en_US/
               └── champions/
                   ├── Annie.json
                   ├── Ahri.json
                   ├── Akali.json
                   └── ... (other champion files)
   ```
   
   Each file contains individual champion data in Annie.json format

---

## User Story Validation

### Story 1: Import Champion Data Successfully

**Scenario**: System administrator imports champion data from directory

**Steps**:

#### Step 1: Prepare Champions Data Directory
```bash
# Create directory structure
mkdir -p /data/champions/patch_15_24_1/data/en_US/champions

# Copy champion files to directory
cp specs/003-champions-upload/Annie.json /data/champions/patch_15_24_1/data/en_US/champions/
# Copy other champion files...
```

#### Step 2: Call Import Function

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
    
    // Call import function
    // Path resolves to: /data/champions/patch_15_24_1/data/en_US/champions/
    err := champion.ImportFromFile("/data/champions", p)
    if err != nil {
        log.Fatal(err)
    }
    
    log.Println("Champions imported successfully")
}
```

#### Step 3: Verify Import Succeeded

**Function returns**:
- ✓ `nil` error if all champions imported
- ✓ `non-nil` error if any file fails (all-or-nothing)

#### Step 4: Verify Data Persisted

**Query ClickHouse**:
```sql
SELECT subject, data.name, data.partype, 
       JSONExtractFloat(data, 'baseStats.hp') as baseHp
FROM champions
WHERE pid = 'patch_15_24_1'
ORDER BY created_time DESC FINAL
LIMIT 5;
```

**Expected Output**:
```
┌─subject─┬─data.name─┬─data.partype─┬─baseHp─┐
│ Annie   │ Annie     │ Mana         │    560 │
│ Ahri    │ Ahri      │ Mana         │    525 │
│ Akali   │ Akali     │ Energy       │    585 │
└─────────┴───────────┴──────────────┴────────┘
```

---

## Story 2: Import Fails on Invalid Data

**Scenario**: If any champion file is invalid or missing, entire import fails

**Steps**:

#### Step 1: Create Invalid Champion File
```bash
# Create malformed JSON file
echo '{invalid json}' > /data/champions/patch_15_24_1/data/en_US/champions/BadChampion.json
```

#### Step 2: Attempt Import
```go
p := &patch.Patch{
    ID:       "15.24.1",
    PatchID:  "patch_15_24_1",
    Language: "en_US",
}

err := champion.ImportFromFile("/data/champions", p)
```

#### Step 3: Verify Import Failed

**Expected**: 
- `err != nil` with error message about invalid JSON
- No champions imported (all-or-nothing guarantee)

**Query database**:
```sql
SELECT COUNT(*) FROM champions WHERE pid = 'patch_15_24_1' FINAL;
```

**Expected**: 0 (no records inserted)

---

## Story 3: Update Champions on Re-import

**Scenario**: Re-import same patch with updated champion stats

**Steps**:

#### Step 1: Initial Import (Patch 15.24.1)
```go
p := &patch.Patch{
    ID:       "15.24.1",
    PatchID:  "patch_15_24_1",
    Language: "en_US",
}
err := champion.ImportFromFile("/data/champions", p)
```

**Result**: Annie with baseHp = 560

#### Step 2: Verify Initial State
```sql
SELECT subject, JSONExtractFloat(data, 'baseStats.hp') as baseHp
FROM champions
WHERE subject = 'Annie' AND pid = 'patch_15_24_1' FINAL;
```

**Result**: Annie, 560

#### Step 3: Update Champion File
```bash
# Edit Annie.json to increase health
# Change baseStats.hp from 560 to 580
vim /data/champions/patch_15_24_1/data/en_US/champions/Annie.json
```

#### Step 4: Re-import Same Patch
```go
p := &patch.Patch{
    ID:       "15.24.1",
    PatchID:  "patch_15_24_1",
    Language: "en_US",
}
err := champion.ImportFromFile("/data/champions", p)
```

#### Step 5: Verify Updated Data

```sql
SELECT subject, JSONExtractFloat(data, 'baseStats.hp') as baseHp
FROM champions
WHERE subject = 'Annie' AND pid = 'patch_15_24_1' FINAL;
```

**Expected**: Annie, 580 (updated value)

---

## Edge Cases & Error Scenarios

### Edge Case 1: Missing Directory

**Input**: Directory `/data/champions/patch_15_24_1/data/en_US/champions/` does not exist

**Expected Behavior**:
- Function returns error: `os.ErrNotExist` or similar
- Error message indicates directory not found
- No database operations performed

### Edge Case 2: Empty Directory

**Input**: Directory exists but contains no champion files

**Expected Behavior**:
- Function returns error: "no champion files found"
- No database operations performed

### Edge Case 3: Invalid JSON

**Input**: Champion file contains malformed JSON

**Expected Behavior**:
- Function returns error with file name and JSON error details
- No champions imported (all-or-nothing)
- Database rolled back to previous state

### Edge Case 4: Missing Required Field

**Input**: Champion file missing required field (e.g., `key`)

**Expected Behavior**:
- Function returns error: "champion file {name}: missing required field 'key'"
- No champions imported
- Import fails immediately

### Edge Case 5: Database Connection Lost

**Input**: ClickHouse unavailable during import

**Expected Behavior**:
- Function returns database connection error
- No data persisted
- Partial imports are rolled back

---

## Performance Benchmarks

### Expected Metrics

| Scenario | Champions | Duration | Per-Champion |
|----------|-----------|----------|--------------|
| Single champion | 1 | 50-100ms | 50-100ms |
| Full patch | 160 | 2-3 seconds | 12-18ms |
| With file I/O | 160 | 3-5 seconds | 18-30ms |

### How to Measure

```bash
# Time a single import with Go
time go run cmd/import.go

# Profile with pprof
go test -cpuprofile=cpu.prof -benchmem ./...
go tool pprof cpu.prof
```

---

## Logging Verification

### Expected Log Sequence

```
[INFO] Champion import started
  base_path: "/data/champions"
  patch_id: "patch_15_24_1"
  language: "en_US"

[INFO] Scanning champion files
  directory: "/data/champions/patch_15_24_1/data/en_US/champions"
  file_count: 162

[INFO] Processing champion file
  file: "Annie.json"
  sequence: 1/162

[INFO] Processing champion file
  file: "Ahri.json"
  sequence: 2/162

[INFO] Champion import completed successfully
  patch_id: "patch_15_24_1"
  champions_imported: 162
  duration_ms: 2345
```

### Error Logging

```
[ERROR] Champion import failed
  error: "invalid JSON in BadChampion.json: unexpected EOF"
  file: "BadChampion.json"
  patch_id: "patch_15_24_1"
```

---

## Testing the Import Function

### Test in Unit Tests

```go
import (
    "testing"
    "lol-builds/src/backend/features/champion"
    "lol-builds/src/backend/entities/patch"
)

func TestImportChampionsSuccess(t *testing.T) {
    p := &patch.Patch{
        ID:       "15.24.1",
        PatchID:  "patch_15_24_1",
        Language: "en_US",
    }
    
    err := champion.ImportFromFile("test-data/valid-champions", p)
    if err != nil {
        t.Fatalf("expected no error, got: %v", err)
    }
}

func TestImportChampionsInvalidJSON(t *testing.T) {
    p := &patch.Patch{
        ID:       "15.24.1",
        PatchID:  "patch_15_24_1",
        Language: "en_US",
    }
    
    err := champion.ImportFromFile("test-data/invalid-json", p)
    if err == nil {
        t.Fatal("expected error for invalid JSON, got nil")
    }
}

func TestImportChampionsMissingDirectory(t *testing.T) {
    p := &patch.Patch{
        ID:       "15.24.1",
        PatchID:  "patch_15_24_1",
        Language: "en_US",
    }
    
    err := champion.ImportFromFile("/nonexistent/path", p)
    if err == nil {
        t.Fatal("expected error for missing directory, got nil")
    }
}
```

---

## Database Verification Queries

### Count Imported Champions
```sql
SELECT COUNT(DISTINCT subject) as champion_count
FROM champions
WHERE pid = 'patch_15_24_1' FINAL;
```

Expected: ~160

### Find Champions by Resource Type
```sql
SELECT subject, JSONExtractString(data, 'partype') as resource_type
FROM champions
WHERE pid = 'patch_15_24_1' AND JSONExtractString(data, 'partype') = 'Mana'
LIMIT 10 FINAL;
```

Expected: Multiple champions with "Mana" partype

### Compare Stats Across Patches
```sql
SELECT
  c1.subject,
  JSONExtractFloat(c1.data, 'baseStats.hp') as hp_old,
  JSONExtractFloat(c2.data, 'baseStats.hp') as hp_new,
  JSONExtractFloat(c2.data, 'baseStats.hp') - JSONExtractFloat(c1.data, 'baseStats.hp') as change
FROM champions c1
JOIN champions c2
  ON c1.subject = c2.subject
WHERE c1.pid = 'patch_15_24_1' AND c2.pid = 'patch_15_25_1'
ORDER BY change DESC
LIMIT 10 FINAL;
```

Expected: Champions with stat changes between patches

### Verify Data Integrity
```sql
SELECT subject, pid
FROM champions
WHERE JSONExtractFloat(data, 'baseStats.hp') <= 0 
   OR JSONExtractFloat(data, 'baseStats.hp') > 10000 FINAL;
```

Expected: Empty (no invalid stats)

---

## Troubleshooting

### Problem: "File not found" error

**Cause**: JSON file path is incorrect or file doesn't exist  
**Solution**:
```bash
ls -la /data/champions/patch_15_24_1/data/en_US/champions/
# Verify directory and files exist
```

### Problem: "ClickHouse not responding"

**Cause**: Database service down  
**Solution**:
```bash
cd deployments/docker
docker-compose up -d
docker-compose logs clickhouse-server
```

### Problem: "Table 'champions' doesn't exist"

**Cause**: Schema not initialized  
**Solution**:
```bash
docker-compose exec clickhouse-server clickhouse-client
source scripts/database.sql
```

### Problem: Import returns error but unclear why

**Cause**: Check logs for detailed error information  
**Solution**:
```bash
# Review application logs
cat logs/import.log | tail -50

# Enable verbose logging in code
logger.SetLevel(log.DebugLevel)
```

### Problem: Directory structure incorrect

**Cause**: Path does not match expected pattern  
**Solution**:

Verify structure matches:
```
basePath/patchId/data/language/champions/
  ↓
/data/champions/patch_15_24_1/data/en_US/champions/
```

---

## Next Steps

After successful quickstart validation:

1. **Proceed to Implementation Phase** (`/tasks` command)
   - Create Go data models
   - Implement import logic
   - Integrate with loader service

2. **Integration Testing**
   - Test with full champion dataset
   - Test error scenarios
   - Load testing with concurrent imports

3. **Production Deployment**
   - Deploy to staging environment
   - Configure monitoring and alerting
   - Document operational procedures

---

## Support & Resources

- **Feature Specification**: `specs/003-champions-upload/spec.md`
- **Data Model**: `specs/003-champions-upload/data-model.md`
- **API Contracts**: `specs/003-champions-upload/contracts/api-contracts.md`
- **Database Schema**: `specs/003-champions-upload/contracts/database-schema.sql`
- **Example Data**: `specs/003-champions-upload/Annie.json`
- **Implementation Plan**: `specs/003-champions-upload/plan.md`

---

*Quickstart: 2025-12-15*  
*Status: Ready for user validation*
