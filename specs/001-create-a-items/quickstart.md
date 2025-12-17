# Quickstart Guide: Items Uploaders

**Feature**: Items Uploaders  
**Date**: 2025-12-14  
**Purpose**: Manual testing and validation procedures for item import functionality

## Prerequisites

### 1. Database Setup
```bash
# Start ClickHouse via Docker Compose
cd F:\pet-projects\lol-builds
docker-compose -f deployments/docker/docker-compose.yml up -d

# Verify ClickHouse is running
docker ps | grep clickhouse
```

### 2. Schema Installation
```bash
# Connect to ClickHouse
docker exec -it <clickhouse-container-id> clickhouse-client

# Create items table (if not already created)
# Copy and paste contents from specs/001-create-a-items/contracts/database-schema.sql
```

### 3. Test Data Preparation
```bash
# Download or locate Data Dragon files
# Expected structure:
# {rootPath}/
#   ├── manifest.json (contains version and language)
#   └── data/
#       └── {language}/
#           └── item.json (contains item data)

# Example manifest.json:
{
  "v": "13.24.1",
  "l": "en_US"
}

# Example item.json (subset):
{
  "1001": {
    "name": "Boots of Speed",
    "description": "<mainText><stats>...",
    "gold": {"base": 300, "total": 300, "sell": 210, "purchasable": true},
    "tags": ["Boots"],
    "maps": {"11": true, "12": true, ...},
    "stats": {"FlatMovementSpeedMod": 25}
  },
  "3340": {
    "name": "Farsight Alteration",
    ...
  }
}
```

---

## Test Scenarios

### Scenario 1: Import Items from Valid Data Dragon Directory

**Given**: Valid Data Dragon directory with manifest and item.json

**Steps**:
1. Build loader-service:
   ```bash
   cd F:\pet-projects\lol-builds\src\backend
   go build ./app/loader-service
   ```

2. Run import:
   ```bash
   # Update the rootPath variable in main.go to point to your Data Dragon directory
   # Default path: C:\Users\Simon\Downloads\dragontail-15.24.1\15.24.1
   cd F:\pet-projects\lol-builds\src\backend
   go run ./app/loader-service/main.go
   ```
   
   Note: The loader-service currently imports both patches and items automatically from the configured rootPath.

3. Verify import in ClickHouse:
   ```sql
   -- Check total items imported
   SELECT COUNT(*) FROM items WHERE map_id = 11 FINAL;
   
   -- Expected: Number of items with "maps.11" = true in source JSON
   
   -- View sample items
   SELECT name, oid, patch_oid, created_time 
   FROM items 
   WHERE map_id = 11 
   FINAL 
   ORDER BY name 
   LIMIT 10;
   
   -- Expected: Items like "Boots of Speed", etc. with correct patch_oid
   ```

**Expected Result**: All items where `Maps["11"] == true` are imported successfully

**Success Criteria**:
- ✓ Exit code 0 (no errors)
- ✓ Log shows "Import complete: items={count}"
- ✓ ClickHouse contains expected number of items
- ✓ All items have map_id = 11
- ✓ All items have correct patch_oid matching manifest version

---

### Scenario 2: Verify Map ID Filtering

**Given**: Item data with mixed map availability

**Steps**:
1. Count items in source JSON:
   ```bash
   # Count all items in JSON
   jq 'length' /path/to/item.json
   
   # Count items available on map 11
   jq '[.[] | select(.maps."11" == true)] | length' /path/to/item.json
   ```

2. Import items (same as Scenario 1)

3. Compare counts:
   ```sql
   SELECT COUNT(*) FROM items WHERE map_id = 11 FINAL;
   ```

**Expected Result**: Item count in database matches count of items with `maps.11 = true` in JSON

**Success Criteria**:
- ✓ Only map 11 items are imported
- ✓ Items available on other maps only (e.g., only on ARAM) are excluded
- ✓ Count matches filtered JSON count exactly

---

### Scenario 3: Re-import Same Patch (Deduplication Test)

**Given**: Items already imported for patch 13.24.1

**Steps**:
1. Check initial count:
   ```sql
   SELECT COUNT(*) FROM items WHERE patch_oid = '13.24.1' FINAL;
   -- Note this count
   ```

2. Re-import same patch:
   ```bash
   ./loader-service import-items --path /path/to/dragontail/13.24.1
   ```

3. Check count again:
   ```sql
   SELECT COUNT(*) FROM items WHERE patch_oid = '13.24.1' FINAL;
   ```

4. Verify latest created_time:
   ```sql
   SELECT name, COUNT(*) as cnt, MAX(created_time) as latest
   FROM items
   WHERE patch_oid = '13.24.1'
   GROUP BY name
   HAVING cnt > 1;
   -- Should return 0 rows (no duplicates after FINAL)
   ```

**Expected Result**: Item count remains the same, created_time is updated to latest import

**Success Criteria**:
- ✓ Item count unchanged
- ✓ ReplacingMergeTree keeps only latest version
- ✓ created_time reflects second import timestamp
- ✓ No duplicate rows visible in FINAL queries

---

### Scenario 4: Import Multiple Patches

**Given**: Two different Data Dragon patch directories (e.g., 13.24.1 and 14.1.1)

**Steps**:
1. Import first patch:
   ```bash
   ./loader-service import-items --path /path/to/dragontail/13.24.1
   ```

2. Import second patch:
   ```bash
   ./loader-service import-items --path /path/to/dragontail/14.1.1
   ```

3. Verify both patches in database:
   ```sql
   -- Check distinct patches
   SELECT DISTINCT patch_oid FROM items FINAL ORDER BY patch_oid;
   -- Expected: ['13.24.1', '14.1.1']
   
   -- Count items per patch
   SELECT patch_oid, COUNT(*) as item_count
   FROM items
   WHERE map_id = 11
   GROUP BY patch_oid
   ORDER BY patch_oid
   FINAL;
   
   -- Check for items in both patches
   SELECT name, patch_oid, created_time
   FROM items
   WHERE name = 'Boots of Speed'
   ORDER BY patch_oid
   FINAL;
   -- Expected: Rows for both patches if item exists in both
   ```

**Expected Result**: Items from both patches are stored, differentiated by patch_oid

**Success Criteria**:
- ✓ Both patches visible in distinct query
- ✓ Item counts are independent per patch
- ✓ Same item in different patches creates separate records
- ✓ No cross-patch contamination

---

### Scenario 5: Error Handling - Missing Manifest

**Given**: Data Dragon directory without manifest.json

**Steps**:
1. Create test directory without manifest:
   ```bash
   mkdir /tmp/test-no-manifest
   mkdir -p /tmp/test-no-manifest/data/en_US
   # Copy item.json but not manifest.json
   ```

2. Attempt import:
   ```bash
   ./loader-service import-items --path /tmp/test-no-manifest
   ```

**Expected Result**: Error message indicating missing manifest

**Success Criteria**:
- ✓ Exit code non-zero
- ✓ Error log contains "manifest" or "file not found"
- ✓ No items inserted into database
- ✓ Existing data not corrupted

---

### Scenario 6: Error Handling - Malformed JSON

**Given**: Data Dragon directory with invalid item.json

**Steps**:
1. Create test directory with invalid JSON:
   ```bash
   mkdir -p /tmp/test-bad-json/data/en_US
   echo '{"invalid": json}' > /tmp/test-bad-json/data/en_US/item.json
   echo '{"v": "test", "l": "en_US"}' > /tmp/test-bad-json/manifest.json
   ```

2. Attempt import:
   ```bash
   ./loader-service import-items --path /tmp/test-bad-json
   ```

**Expected Result**: Error message indicating JSON parse failure

**Success Criteria**:
- ✓ Exit code non-zero
- ✓ Error log contains "parse" or "JSON" or "invalid"
- ✓ No items inserted for this import
- ✓ Previous imports not affected

---

### Scenario 7: Verify CloudEvent Structure

**Given**: Items successfully imported

**Steps**:
```sql
-- Check CloudEvent metadata
SELECT 
    source,
    specversion,
    type,
    datacontenttype,
    subject,
    name
FROM items 
WHERE map_id = 11 
FINAL 
LIMIT 5;

-- Verify JSON data field
SELECT 
    name,
    JSONExtractString(data, 'Name') as extracted_name,
    JSONExtractInt(data, 'MapId') as extracted_map_id
FROM items 
WHERE name = 'Boots of Speed' 
FINAL;
```

**Expected Result**: 
- source = "dragontail"
- specversion = "1.0"
- type = "item.created"
- datacontenttype = "application/json"
- subject = item name
- JSON data contains full item details

**Success Criteria**:
- ✓ All CloudEvent fields populated correctly
- ✓ Subject matches item name
- ✓ JSON data is valid and queryable
- ✓ Extracted values match column values

---

### Scenario 8: Query Item by Name

**Given**: Items imported for patch

**Steps**:
```sql
-- Simple name lookup
SELECT * FROM items 
WHERE name = 'Infinity Edge' AND map_id = 11 
FINAL;

-- Name pattern search
SELECT name, oid, patch_oid 
FROM items 
WHERE name LIKE '%Boots%' AND map_id = 11 
FINAL 
ORDER BY name;

-- Get item with full details
SELECT 
    name,
    oid,
    patch_oid,
    JSONExtractString(data, 'description') as description,
    JSONExtractInt(data, 'gold', 'total') as total_cost
FROM items
WHERE name = 'Infinity Edge'
FINAL;
```

**Expected Result**: Correct items returned with full details

**Success Criteria**:
- ✓ Exact name match returns single item (or one per patch)
- ✓ LIKE pattern returns all matching items
- ✓ JSON extraction works correctly
- ✓ Query performance is acceptable (<100ms for small datasets)

---

### Scenario 9: Verify Patch Reference Integrity

**Given**: Items and patches in database

**Steps**:
```sql
-- Check all items have valid patch references
SELECT 
    i.name,
    i.patch_oid,
    p.oid as patch_exists
FROM items i FINAL
LEFT JOIN patches p FINAL ON i.patch_oid = p.oid
WHERE p.oid IS NULL AND i.map_id = 11
LIMIT 10;
-- Expected: 0 rows (all items reference valid patches)

-- List items with their patch info
SELECT 
    i.name,
    i.oid,
    i.patch_oid,
    p.version
FROM items i FINAL
JOIN patches p FINAL ON i.patch_oid = p.oid
WHERE i.map_id = 11
ORDER BY p.version, i.name
LIMIT 20;
```

**Expected Result**: All items reference valid patches

**Success Criteria**:
- ✓ No orphaned items (items without valid patch reference)
- ✓ Join returns correct patch information
- ✓ patch_oid values match patches.oid values

---

## Validation Checklist

After implementing and running quickstart scenarios, verify:

- [ ] **Data Integrity**
  - [ ] All imported items have map_id = 11
  - [ ] Item names match source JSON
  - [ ] Patch references are valid
  - [ ] No duplicate items in FINAL queries

- [ ] **CloudEvent Compliance**
  - [ ] Source = "dragontail"
  - [ ] SpecVersion = "1.0"
  - [ ] Type = "item.created"
  - [ ] Subject = item name
  - [ ] DataContentType = "application/json"

- [ ] **Filtering Behavior**
  - [ ] Only map 11 items imported
  - [ ] Item count matches filtered JSON count
  - [ ] Items from other maps excluded

- [ ] **Deduplication**
  - [ ] Re-import updates created_time
  - [ ] No visible duplicates in FINAL queries
  - [ ] Latest version always returned

- [ ] **Error Handling**
  - [ ] Missing manifest: Clear error message, no corruption
  - [ ] Invalid JSON: Clear error message, no corruption
  - [ ] Missing file: Clear error message, no corruption

- [ ] **Performance**
  - [ ] Import completes in reasonable time
  - [ ] Queries return results quickly
  - [ ] Database size is reasonable

---

## Troubleshooting

### Issue: Import command not found

**Cause**: loader-service not built or command not implemented yet

**Solution**: 
```bash
cd F:\pet-projects\lol-builds\src\backend
go build ./app/loader-service
# Check available commands
./loader-service --help
```

---

### Issue: Database connection failed

**Cause**: ClickHouse not running or wrong connection config

**Solution**:
```bash
# Check ClickHouse status
docker ps | grep clickhouse

# Restart if needed
docker-compose -f deployments/docker/docker-compose.yml restart clickhouse

# Verify connection
docker exec -it <container-id> clickhouse-client
```

---

### Issue: Items table not found

**Cause**: Schema not created

**Solution**:
```bash
# Run schema from contracts/database-schema.sql
docker exec -it <container-id> clickhouse-client

# In ClickHouse client:
# Paste contents of specs/001-create-a-items/contracts/database-schema.sql
```

---

### Issue: Wrong number of items imported

**Cause**: Filtering logic incorrect or JSON format unexpected

**Solution**:
```bash
# Manually count items with map 11 in JSON
jq '[.[] | select(.maps."11" == true)] | length' /path/to/item.json

# Compare with database count
# Debug: Check logs for skipped items
# Verify filtering logic in features/item/importFromFile.go
```

---

### Issue: Duplicates visible in queries

**Cause**: Missing FINAL keyword or ReplacingMergeTree not merging yet

**Solution**:
```sql
-- Always use FINAL for ReplacingMergeTree tables
SELECT * FROM items FINAL WHERE ...

-- Force merge (if needed)
OPTIMIZE TABLE items FINAL;
```

---

## Manual Testing Log Template

```
Date: ___________
Tester: ___________
Patch Version: ___________

Scenario 1 (Valid Import):
  - Exit code: ____
  - Items imported: ____
  - Logs: ____
  - ✓/✗ Pass

Scenario 2 (Filtering):
  - JSON count (all): ____
  - JSON count (map 11): ____
  - DB count: ____
  - ✓/✗ Pass

Scenario 3 (Deduplication):
  - Count before: ____
  - Count after: ____
  - ✓/✗ Pass

[... continue for all scenarios ...]

Overall: ✓ PASS / ✗ FAIL
Notes: ____
```

---

## References

- Feature Specification: `specs/001-create-a-items/spec.md`
- Data Model: `specs/001-create-a-items/data-model.md`
- API Contracts: `specs/001-create-a-items/contracts/go-api.md`
- Database Schema: `specs/001-create-a-items/contracts/database-schema.sql`
