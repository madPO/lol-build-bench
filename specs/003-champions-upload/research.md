# Research: Champions Upload Implementation

**Feature**: 003-champions-upload  
**Date**: 2025-12-15  
**Status**: Complete

## Executive Summary

Champions upload is a backend service feature that imports League of Legends champion definitions from JSON into ClickHouse. The implementation reuses proven patterns from the existing items (001) and runes (002) uploaders, applying the same architecture to champion data.

Key findings:
- **Data Source**: Annie.json demonstrates standard format with ~410 fields per champion
- **Required Fields**: 40+ attributes across identity, stats, abilities, and passive
- **Database**: ClickHouse ReplacingMergeTree (upsert-friendly, existing pattern)
- **Architecture**: Event-driven with CloudEvent wrappers, aligns with constitution
- **Scale**: ~160 champions × 10+ abilities = manageable data volume

---

## 1. Champion Data Structure Analysis

### Decision: Adopt Annie.json Format as Standard

**Rationale**:
- Official League of Legends API format
- Provided example (specs/003-champions-upload/Annie.json)
- Used by other LOL tools and applications
- Consistent structure across all champions

### Fields to Import (40+ attributes)

#### Identity & Metadata (5 fields)
- `id`: Champion identifier string (e.g., "Annie")
- `key`: Numeric champion key (e.g., "1")
- `name`: Display name (e.g., "Annie")
- `title`: Champion tagline/title (e.g., "the Dark Child")
- `partype`: Resource type (e.g., "Mana", "Energy")
- `version`: Patch version (added by system, e.g., "15.24.1")

#### Visual Assets (8 fields)
- `image.full`: Filename (e.g., "Annie.png")
- `image.sprite`: Sprite sheet name (e.g., "champion0.png")
- `image.group`: Asset group (e.g., "champion")
- `image.x`, `image.y`, `image.w`, `image.h`: Sprite coordinates and dimensions

#### Base Statistics (11 fields)
- `hp`: Base health points (e.g., 560)
- `mp`: Base mana/energy (e.g., 418)
- `movespeed`: Base movement speed (e.g., 335)
- `armor`: Base armor (e.g., 23)
- `spellblock`: Base magic resist (e.g., 30)
- `attackrange`: Attack range (e.g., 625)
- `hpregen`: Health regeneration per 5s
- `mpregen`: Mana regeneration per 5s
- `crit`: Base critical strike chance
- `attackdamage`: Base attack damage (e.g., 50)
- `attackspeed`: Base attack speed (e.g., 0.61)

#### Per-Level Scaling (9 fields)
- `hpperlevel`: HP scaling coefficient
- `mpperlevel`: Mana scaling coefficient
- `armorperlevel`: Armor scaling
- `spellblockperlevel`: Magic resist scaling
- `hpregenperlevel`: HP regen scaling
- `mpregenperlevel`: Mana regen scaling
- `critperlevel`: Critical strike scaling
- `attackdamageperlevel`: Attack damage scaling (e.g., 2.65 per level)
- `attackspeedperlevel`: Attack speed scaling (e.g., 1.36%)

#### Abilities (spells) - 4 per champion, ~8 fields each (32 fields total)
For each of Q, W, E, R spells:
- `id`: Ability identifier (e.g., "AnnieQ")
- `name`: Ability name (e.g., "Disintegrate")
- `description`: Plain text description
- `tooltip`: Formatted tooltip with scaling info
- `maxrank`: Ability rank cap (typically 5, ultimate is 3)
- `cooldown`: Cooldown array per rank [4,4,4,4,4]
- `cost`: Mana/energy cost array [60,65,70,75,80]
- `range`: Range array [625,625,625,625,625]
- `image`: Sprite data {full, sprite, group, x, y, w, h}

#### Passive Ability (8 fields)
- `passive.name`: Passive name (e.g., "Pyromania")
- `passive.description`: Passive description
- `passive.image`: Sprite data {full, sprite, group, x, y, w, h}

### Fields to Exclude (per FR-008)

Explicitly excluded from storage:
- `skins`: Array of 15+ skin variants (not needed for builds)
- `lore`: 1-2 paragraph champion lore text (not needed for builds)
- `blurb`: Shortened lore teaser (not needed for builds)
- `allytips`: 3 ally-focused tips (gameplay, not build-relevant)
- `enemytips`: 3 enemy-focused tips (gameplay, not build-relevant)
- `tags`: Champion class tags (e.g., ["Mage", "Support"] - available from item context)
- `info`: Difficulty ratings {attack, defense, magic, difficulty} (not needed)
- `recommended`: Empty array in current data, excluded for future flexibility

**Total fields to store**: ~65 attributes per champion

---

## 2. Database Design

### Decision: CloudEvent-Based Schema with JSON Data Column

**Rationale**:
1. **Proven Pattern**: items (001) and runes (002) use identical CloudEvent structure
2. **Standardization**: Aligns with CloudEvent specification (version 1.0)
3. **Flexibility**: All champion data in single JSON column allows future evolution
4. **Consistency**: Same table pattern as existing features (cid, oid, pid, created_time, source, type, subject, data)
5. **Patch Tracking**: `pid` column enables historical analysis per patch version
6. **Upsert Semantics**: ReplacingMergeTree handles champion balance updates naturally

### Schema Design Pattern

```sql
CREATE TABLE champions (
  -- Champion identifiers
  cid UUID,                           -- Generated champion event identifier (primary)
  oid String,                         -- Original champion ID from Data Dragon (e.g., "Annie")
  pid String,                         -- Reference to patch PID (foreign key to patches.pid)
  created_time DateTime64(3, 'UTC'),  -- Event creation timestamp (used for version ordering)
  
  -- CloudEvent metadata (standardized event structure)
  source String,                      -- Event source identifier (always "dragontail")
  specversion String,                 -- CloudEvents specification version (always "1.0")
  type String,                        -- Event type discriminator (always "champion.created")
  datacontenttype String,             -- Data content MIME type (always "application/json")
  subject String,                     -- CloudEvent subject (champion name for routing/filtering)
  
  -- Full champion data payload
  data JSON                           -- Complete champion details: stats, abilities, passive, image, etc.

) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, created_time, pid)
```

### JSON Data Column Structure

Complete champion object containing:
- Identity: id, key, name, title, partype
- Image: full, sprite, group, x, y, w, h
- Base Stats: hp, mp, movespeed, armor, spellblock, attackrange, hpregen, mpregen, crit, attackdamage, attackspeed
- Level Stats: hpperlevel, mpperlevel, armorperlevel, spellblockperlevel, hpregenperlevel, mpregenperlevel, critperlevel, attackdamageperlevel, attackspeedperlevel
- Spells: 4-element array [Q, W, E, R] with id, name, description, tooltip, maxrank, cooldown, cost, range, image
- Passive: name, description, image

**Rationale for JSON Storage**:
1. **Consistency**: Matches items/runes implementation exactly
2. **Flexibility**: All 65+ attributes in one self-contained object
3. **Extensibility**: New champion fields require no schema migration
4. **Queryability**: ClickHouse JSON functions support filtering and extraction
5. **Compression**: JSON objects compress well (champion data is structured and repetitive)

### JSON Storage Justification

Spells and passive stored as JSON because:
1. **Variable structure**: Each spell has 8+ fields
2. **Array handling**: 4 spells per champion
3. **Future extensibility**: New fields can be added without schema migration
4. **Query patterns**: Rarely filtered at ability level (stored as text for now)
5. **ClickHouse support**: Native JSON type available in recent versions

Example:
```json
{
  "spells": [
    {
      "id": "AnnieQ",
      "name": "Disintegrate",
      "description": "Annie hurls a Mana infused fireball...",
      "tooltip": "Annie hurls a fireball, dealing...",
      "maxrank": 5,
      "cooldown": [4, 4, 4, 4, 4],
      "cost": [60, 65, 70, 75, 80],
      "range": [625, 625, 625, 625, 625],
      "image": {"full": "AnnieQ.png", "sprite": "spell1.png", ...}
    },
    ...
  ]
}
```

---

## 3. Import Pipeline Architecture

### Decision: JSON File → Validation → CloudEvent → ClickHouse

**Pipeline Stages**:

1. **File Reading** (features/champion/importFromFile.go)
   - Accept JSON file path
   - Parse JSON structure matching Annie.json format
   - Extract champions.data object array

2. **Validation** (per-champion)
   - Required fields check: id, key, name, title, partype
   - Type validation: numeric stats, array structure for spells
   - Spell validation: exactly 4 spells with required fields
   - Passive validation: name and description present
   - Collect errors for partial success reporting

3. **CloudEvent Wrapping**
   - Create CloudEvent for each successful champion
   - Type: "com.lolbuilds.champion.imported"
   - Source: "features/champion/importFromFile"
   - Subject: "{championId}"
   - Data: Champion entity as JSON

4. **ClickHouse Persistence**
   - Batch insert valid records
   - Report summary: {total, success, failed, errors}
   - Support eventual consistency (updates via ReplacingMergeTree)

### Reuse Existing Patterns

Pattern from items uploader (001):
```
src/backend/features/item/importFromFile.go
src/backend/features/item/itemQueue.go
```

Apply same pattern for champions:
```
src/backend/features/champion/importFromFile.go
src/backend/features/champion/championQueue.go
```

---

## 4. Error Handling & Partial Success

### Decision: Skip Invalid Records, Persist Valid Ones

**Strategy** (FR-011 implementation):
1. Iterate through each champion in JSON
2. Validate independently
3. If valid: Add to persistence batch
4. If invalid: Log error with champion ID and reason, continue
5. Persist entire batch
6. Return summary: {totalCount, successCount, failureCount, errors[]}

**Error Scenarios**:
- Missing required field → skip, log error
- Invalid stat value (non-numeric) → skip, log error
- Missing spell → skip, log error
- Empty passive → skip, log error
- Version format invalid → log, use provided version

**Response Example**:
```json
{
  "totalCount": 160,
  "successCount": 158,
  "failureCount": 2,
  "errors": [
    {"championId": "Champion1", "reason": "Missing required field: key"},
    {"championId": "Champion2", "reason": "Invalid passive structure"}
  ]
}
```

---

## 5. Event-Driven Architecture Compliance

### CloudEvent Standard Integration

**Compliance with Constitution**:
- ✓ Event-driven: Each import generates CloudEvent
- ✓ Decoupled: Services consume events asynchronously
- ✓ Clear contracts: CloudEvent schema defines champion data

**Event Definition**:
```
Type: com.lolbuilds.champion.imported
Source: features/champion/importFromFile
Subject: {championId}
Data: {
  id, key, name, title, partype,
  stats: {...},
  spells: [...],
  passive: {...},
  version, uploadTimestamp
}
```

**Usage**:
- Other services can subscribe to champion imports
- Build recommendation service updates builds with new champion stats
- API service exposes champion catalog to clients

---

## 6. Observability Requirements

### Structured Logging Integration

**Log Levels**:
- **INFO**: Import started, completed summary
- **WARN**: Individual record validation failure
- **ERROR**: File not found, database connection failure, critical parsing errors

**Log Structure**:
```json
{
  "timestamp": "2025-12-15T10:30:00Z",
  "level": "INFO",
  "feature": "champion-upload",
  "event": "import_started",
  "version": "15.24.1",
  "filePath": "/data/champions.json"
}
```

```json
{
  "timestamp": "2025-12-15T10:30:05Z",
  "level": "WARN",
  "feature": "champion-upload",
  "event": "validation_failed",
  "championId": "TestChampion",
  "reason": "missing_required_field",
  "field": "key"
}
```

---

## 7. Scale & Performance Considerations

### Data Volume
- **Champions per patch**: ~160-170
- **Abilities per champion**: 4 (Q, W, E, R) + 1 passive = 5 total
- **Stats per champion**: ~65 fields
- **Total per import**: ~170 champions × 65 fields = ~11,050 field values

### Performance Targets
- **Import latency**: <5 seconds for full champion set
- **Query latency**: <100ms for champion lookup by ID
- **Storage**: <1MB per champion (compressed)

### ClickHouse Advantages
- Batch insert optimization
- Columnar compression (stats columns identical across many champions)
- Partition pruning by uploadTimestamp
- Fast aggregation for analytics

---

## 8. Comparison with Items (001) & Runes (002)

### Similarities
- JSON source format
- Bulk import operation
- ClickHouse storage with ReplacingMergeTree
- Partial success error handling
- CloudEvent wrapping

### Differences
| Aspect | Items | Runes | Champions |
|--------|-------|-------|-----------|
| Fields | ~20 | ~20 | ~65 |
| Complexity | Map-filtered | Simple bulk | Complex structures (spells, passive) |
| Update Strategy | Replace all | Replace all | Replace all + versioning |
| Related Data | Items per map | N/A | Abilities + passive |

### Code Reuse Opportunities
1. Copy importFromFile.go pattern
2. Copy queue processing pattern
3. Adapt validation logic for champion fields
4. Create champion-specific CloudEvent wrapper
5. Update AGENTS.md with champions feature

---

## 9. Future Extensibility

### Potential Enhancements (Post-MVP)
1. **Patch Comparison**: Detect balance changes between versions
2. **Ability Details**: Query specific spell information
3. **Champion Search**: Filter by role, resource type, etc.
4. **Stat Analysis**: Calculate power curves, item synergies
5. **Version Management**: Keep multiple patch versions, compare changes

### Schema Evolution
- JSON fields allow new ability properties without migration
- New stat fields can be added as columns without rewrite
- Backward compatibility maintained via version field

---

## 10. Dependencies & Constraints

### Go Dependencies (Existing)
- ClickHouse Go client: github.com/ClickHouse/clickhouse-go
- CloudEvent SDK: github.com/cloudevents/sdk-go
- Standard library: encoding/json, io/ioutil

### Constraints
- Partial success handling (don't reject entire batch)
- Version field required for historical tracking
- JSON must match Annie.json structure
- ClickHouse reachable during import
- No external API calls (local JSON only)

### Assumptions
- JSON file provided in working directory
- Champion data valid per League of Legends API
- Storage quota sufficient for all champions
- No real-time update requirements (batch processing OK)

---

## Conclusion

Champions upload follows proven patterns from existing uploaders while accommodating the complexity of champion data (abilities, passive, multiple stat arrays). The partial success error handling, event-driven integration, and ClickHouse storage align with project constitution and enable future build recommendation and analytics features.

**Next Steps**: Proceed to Phase 1 Design phase to create detailed contracts and data models.

---

*Research completed: 2025-12-15*  
*Status: Ready for Phase 1 (Design & Contracts)*
