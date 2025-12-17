# Data Model: Champions Upload

**Feature**: 003-champions-upload  
**Date**: 2025-12-15  
**Status**: Design Complete

## Executive Summary

The Champions data model represents League of Legends champion definitions. Champions contain multi-level information: core identity, visual assets, six types of statistics (base, per-level, and scaling), and ability definitions (4 active abilities + 1 passive). The model is designed for efficient storage in ClickHouse and retrieval for build recommendations and game analytics.

---

## Entity: Champion

### CloudEvent Wrapper Fields
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `cid` | UUID | Yes | Generated champion event identifier (unique per event) |
| `oid` | String | Yes | Original champion ID from Data Dragon (e.g., "Annie") |
| `pid` | String | Yes | Patch reference ID (foreign key to patches table) |
| `created_time` | DateTime64 | Yes | Event creation timestamp (used for version ordering) |
| `source` | String | Yes | CloudEvent source (always "dragontail") |
| `specversion` | String | Yes | CloudEvents specification version (always "1.0") |
| `type` | String | Yes | Event type (always "champion.created") |
| `datacontenttype` | String | Yes | Data MIME type (always "application/json") |
| `subject` | String | Yes | Champion name for routing/filtering (e.g., "Annie") |

### Identity Fields (in data column)
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | String | Yes | Unique champion identifier (e.g., "Annie") |
| `key` | Integer | Yes | Numeric champion reference (e.g., 1) |
| `name` | String | Yes | Display name (e.g., "Annie") |
| `title` | String | Yes | Champion title/tagline (e.g., "the Dark Child") |
| `partype` | String | Yes | Resource type (e.g., "Mana", "Energy", "Fury") |

### Visual Asset Fields
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `image.full` | String | Yes | Champion portrait filename |
| `image.sprite` | String | Yes | Sprite sheet identifier |
| `image.group` | String | Yes | Asset group type (e.g., "champion") |
| `image.x` | Integer | Yes | X coordinate in sprite sheet |
| `image.y` | Integer | Yes | Y coordinate in sprite sheet |
| `image.w` | Integer | Yes | Width in pixels |
| `image.h` | Integer | Yes | Height in pixels |

**Relationships**:
- Image is **embedded** within Champion (not separate entity)
- Image data referenced by UI/frontend systems for champion portraits

### Base Statistics (Initialization Stats at Level 1)
| Field | Type | Required | Purpose | Example |
|-------|------|----------|---------|---------|
| `hp` | Float | Yes | Base health points | 560 |
| `mp` | Float | Yes | Base mana/energy | 418 |
| `movespeed` | Float | Yes | Base movement speed | 335 |
| `armor` | Float | Yes | Base armor (physical resist) | 23 |
| `spellblock` | Float | Yes | Base magic resistance | 30 |
| `attackrange` | Float | Yes | Base attack range | 625 |
| `hpregen` | Float | Yes | Health regen per 5 seconds | 5.5 |
| `mpregen` | Float | Yes | Mana regen per 5 seconds | 8 |
| `crit` | Float | Yes | Base critical strike chance | 0 |
| `attackdamage` | Float | Yes | Base attack damage | 50 |
| `attackspeed` | Float | Yes | Base attack speed multiplier | 0.61 |

### Per-Level Scaling Coefficients
| Field | Type | Required | Purpose | Example |
|-------|------|----------|---------|---------|
| `hpperlevel` | Float | Yes | HP gain per level | 96 |
| `mpperlevel` | Float | Yes | Mana gain per level | 25 |
| `armorperlevel` | Float | Yes | Armor gain per level | 4 |
| `spellblockperlevel` | Float | Yes | Magic resist gain per level | 1.3 |
| `hpregenperlevel` | Float | Yes | HP regen scaling per level | 0.55 |
| `mpregenperlevel` | Float | Yes | Mana regen scaling per level | 0.8 |
| `critperlevel` | Float | Yes | Crit scaling per level | 0 |
| `attackdamageperlevel` | Float | Yes | Attack damage per level | 2.65 |
| `attackspeedperlevel` | Float | Yes | Attack speed scaling per level | 1.36 |

**Calculation Pattern**:
```
StatAtLevel(n) = BaseValue + (ScalingCoefficient × (n - 1))

Example (Annie HP at level 18):
HP at L18 = 560 + (96 × 17) = 560 + 1632 = 2192
```

### Abilities (Spells)

#### Structure: Array of 4 Spell Objects (Q, W, E, R)

Each spell has the following fields:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | String | Yes | Ability identifier (e.g., "AnnieQ") |
| `name` | String | Yes | Ability name (e.g., "Disintegrate") |
| `description` | String | Yes | Plain text description of ability |
| `tooltip` | String | Yes | Formatted tooltip with scaling indicators |
| `maxrank` | Integer | Yes | Maximum rank level (5 for normal, 3 for ultimate) |
| `cooldown` | Float[maxrank] | Yes | Cooldown per rank (e.g., [4, 4, 4, 4, 4]) |
| `cost` | Integer[maxrank] | Yes | Resource cost per rank (e.g., [60, 65, 70, 75, 80]) |
| `range` | Integer[maxrank] | Yes | Ability range per rank (e.g., [625, 625, 625, 625, 625]) |
| `image` | Image | Yes | Ability icon sprites (same structure as champion image) |

**Array Order**:
1. Index 0: Q ability (1st ability)
2. Index 1: W ability (2nd ability)
3. Index 2: E ability (3rd ability)
4. Index 3: R ability (ultimate, maxrank=3)

**Example (Annie's Q - Disintegrate)**:
```json
{
  "id": "AnnieQ",
  "name": "Disintegrate",
  "description": "Annie hurls a Mana infused fireball, dealing damage and refunding the Mana cost if it destroys the target.",
  "maxrank": 5,
  "cooldown": [4, 4, 4, 4, 4],
  "cost": [60, 65, 70, 75, 80],
  "range": [625, 625, 625, 625, 625],
  "image": {"full": "AnnieQ.png", "sprite": "spell1.png", "group": "spell", "x": 0, "y": 48, "w": 48, "h": 48}
}
```

### Passive Ability

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `name` | String | Yes | Passive ability name (e.g., "Pyromania") |
| `description` | String | Yes | Description of passive effect |
| `image` | Image | Yes | Passive icon sprites (same structure as champion image) |

**Example (Annie's Passive - Pyromania)**:
```json
{
  "name": "Pyromania",
  "description": "After casting 4 spells, Annie's next offensive spell will stun the target.\n\nAnnie begins the game and respawns with Pyromania available.",
  "image": {"full": "Annie_Passive.png", "sprite": "passive0.png", "group": "passive", "x": 384, "y": 0, "w": 48, "h": 48}
}
```

### Metadata Fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `version` | String | Yes | Patch version (e.g., "15.24.1") - system-assigned |
| `uploadTimestamp` | DateTime | Yes | Import timestamp - system-assigned |

---

## Validation Rules

### Required Fields (Cannot be null/empty)
```
Identity: id, key, name, title, partype
Image: image.full, image.sprite, image.group, image.x, image.y, image.w, image.h
BaseStats: hp, mp, movespeed, armor, spellblock, attackrange, hpregen, mpregen, crit, attackdamage, attackspeed (11 fields)
Scaling: hpperlevel, mpperlevel, armorperlevel, spellblockperlevel, hpregenperlevel, mpregenperlevel, critperlevel, attackdamageperlevel, attackspeedperlevel (9 fields)
Abilities: spells (exactly 4), each with id, name, description, maxrank, cooldown, cost, range, image
Passive: passive.name, passive.description, passive.image
```

### Type Validation

| Field Group | Type Constraint | Validation Rule |
|-------------|-----------------|-----------------|
| Numeric IDs (key) | Integer ≥ 0 | Must be valid positive integer |
| Stat Values (hp, armor, etc.) | Float ≥ 0 | Must be non-negative, allows 0 |
| Scaling Coefficients | Float ≥ 0 | Must be non-negative, allows 0 |
| Cooldown Arrays | Float[] | All values ≥ 0, length = maxrank |
| Cost Arrays | Integer[] | All values ≥ 0, length = maxrank |
| Range Arrays | Integer[] | All values ≥ 0, length = maxrank |
| Image Coordinates | Integer ≥ 0 | X, Y, W, H must be non-negative |
| String Fields | String | Non-empty, 1-500 characters |
| Version | Semantic Version | Format: major.minor.patch (e.g., "15.24.1") |

### Spell Validation

- **Count**: Exactly 4 spells required (indexes 0-3)
- **Ultimate (Index 3)**: maxrank must equal 3
- **Normal Spells (Indexes 0-2)**: maxrank typically 5 (can be 4)
- **Array Lengths**: cooldown[], cost[], range[] must match maxrank
- **Unique IDs**: Spell IDs typically follow pattern: {championId}Q/W/E/R (e.g., AnnieQ, AnnieW, etc.)

### Passive Validation

- **Name**: Required, 1-100 characters
- **Description**: Required, can be multi-line, 10-1000 characters
- **Image**: Must have valid image structure with all coordinate fields

---

## Relationships & Dependencies

### Champion → Abilities
- **Cardinality**: 1 Champion → 4 Abilities
- **Type**: Composition (abilities are part of champion, not independent)
- **Storage**: Array field within Champion entity

### Champion → Passive
- **Cardinality**: 1 Champion → 1 Passive
- **Type**: Composition (embedded, not reference)
- **Storage**: Single object field within Champion entity

### Champion → Image
- **Cardinality**: 1 Champion → 1 Portrait Image (+ 1 per ability, 1 per passive)
- **Type**: Embedded objects
- **Storage**: Image objects as fields, not separate entities

### Champion → Version
- **Cardinality**: 1 Champion ID → Multiple Versions (historical)
- **Type**: Time-series (ReplacingMergeTree handles this)
- **Uniqueness**: Champion is unique per (id, version) pair
- **Storage**: ClickHouse deduplicates on uploadTimestamp

---

## State Transitions

### Import State Machine

```
NEW_CHAMPION
  ↓ (Upload with version V1)
→ STORED (version=V1, uploadTimestamp=T1)
  ↓ (Upload with version V2)
→ STORED (version=V2, uploadTimestamp=T2)
  ↓ (Query latest)
→ RETURNS version=V2 (ReplacingMergeTree deduplication)
```

### Error States

```
VALIDATION_FAILED
  → Missing required field
  → Invalid stat value (negative, non-numeric)
  → Spell count ≠ 4
  → Passive description missing
  → Skip champion, log error, continue with others (partial success)
```

---

## Storage Implementation Notes

### ClickHouse Column Types
- **UUID fields**: `UUID` (cid - event identifier)
- **String fields**: `String` (UTF-8) for oid, pid, source, type, subject
- **DateTime fields**: `DateTime64(3, 'UTC')` for created_time
- **JSON column**: `JSON` data (complete champion object)
  - Contains all champion attributes: identity, stats, abilities, passive, image
  - Stored as JSON for flexibility and future extensibility

### Primary Key & Ordering
- `ORDER BY (subject, type, created_time, pid)`
- Enables efficient queries: "Give me Annie from patch 15.24.1"
- ReplacingMergeTree deduplicates on (subject, type, created_time, pid)
- Latest created_time wins for each unique champion per patch

### Deduplication
- `ReplacingMergeTree(created_time)`: Automatically keeps row with latest created_time
- For same (subject, type, pid) combination, highest created_time retained
- Use FINAL modifier in queries for immediate consistency

### Compression
- JSON data is highly compressible (champion objects share structure)
- CloudEvent metadata columns are small (mostly constants)
- Expected compression: 15x+ for typical champion dataset

---

## Query Patterns

### Query 1: Get Champion by ID (Latest Version)
```sql
SELECT subject, data
FROM champions
WHERE subject = 'Annie' AND pid = 'patch_15_24_1'
ORDER BY created_time DESC
LIMIT 1 FINAL
```

### Query 2: Get All Champions for Patch
```sql
SELECT subject, data.name, data.title, data.partype
FROM champions
WHERE pid = 'patch_15_24_1'
FINAL
```

### Query 3: Compare Champion Between Patches
```sql
SELECT
  c1.subject,
  JSONExtractFloat(c1.data, 'baseStats.hp') as hp_v1,
  JSONExtractFloat(c2.data, 'baseStats.hp') as hp_v2,
  JSONExtractFloat(c2.data, 'baseStats.hp') - JSONExtractFloat(c1.data, 'baseStats.hp') as hp_change
FROM champions c1
JOIN champions c2
  ON c1.subject = c2.subject
WHERE c1.pid = 'patch_15_24_1' AND c2.pid = 'patch_15_25_1'
FINAL
```

### Query 4: Find Champions by Resource Type
```sql
SELECT subject, data.name, data.partype
FROM champions
WHERE pid = 'patch_15_24_1' AND data.partype = 'Mana'
FINAL
```

---

## Example: Complete Champion Record

### JSON Input (from Annie.json)
```json
{
  "id": "Annie",
  "key": "1",
  "name": "Annie",
  "title": "the Dark Child",
  "partype": "Mana",
  "image": {"full": "Annie.png", "sprite": "champion0.png", "group": "champion", "x": 384, "y": 0, "w": 48, "h": 48},
  "stats": {
    "hp": 560, "hpperlevel": 96,
    "mp": 418, "mpperlevel": 25,
    "movespeed": 335,
    "armor": 23, "armorperlevel": 4,
    "spellblock": 30, "spellblockperlevel": 1.3,
    "attackrange": 625,
    "hpregen": 5.5, "hpregenperlevel": 0.55,
    "mpregen": 8, "mpregenperlevel": 0.8,
    "crit": 0, "critperlevel": 0,
    "attackdamage": 50, "attackdamageperlevel": 2.65,
    "attackspeed": 0.61, "attackspeedperlevel": 1.36
  },
  "spells": [
    {
      "id": "AnnieQ",
      "name": "Disintegrate",
      "description": "Annie hurls a Mana infused fireball, dealing damage and refunding the Mana cost if it destroys the target.",
      "maxrank": 5,
      "cooldown": [4, 4, 4, 4, 4],
      "cost": [60, 65, 70, 75, 80],
      "range": [625, 625, 625, 625, 625],
      "image": {"full": "AnnieQ.png", "sprite": "spell1.png", "group": "spell", "x": 0, "y": 48, "w": 48, "h": 48}
    },
    {...},
    {...},
    {...}
  ],
  "passive": {
    "name": "Pyromania",
    "description": "After casting 4 spells, Annie's next offensive spell will stun the target.",
    "image": {"full": "Annie_Passive.png", "sprite": "passive0.png", "group": "passive", "x": 384, "y": 0, "w": 48, "h": 48}
  }
}
```

### Stored Record (ClickHouse)
```
cid: "550e8400-e29b-41d4-a716-446655440000"
oid: "Annie"
pid: "patch_15_24_1"
created_time: "2025-12-15 10:30:00.000"
source: "dragontail"
specversion: "1.0"
type: "champion.created"
datacontenttype: "application/json"
subject: "Annie"
data: {
  "id": "Annie",
  "key": 1,
  "name": "Annie",
  "title": "the Dark Child",
  "partype": "Mana",
  "image": {"full": "Annie.png", "sprite": "champion0.png", "group": "champion", "x": 384, "y": 0, "w": 48, "h": 48},
  "baseStats": {"hp": 560, "mp": 418, "movespeed": 335, "armor": 23, "spellblock": 30, "attackrange": 625, "hpregen": 5.5, "mpregen": 8, "crit": 0, "attackdamage": 50, "attackspeed": 0.61},
  "levelStats": {"hpperlevel": 96, "mpperlevel": 25, "armorperlevel": 4, "spellblockperlevel": 1.3, "hpregenperlevel": 0.55, "mpregenperlevel": 0.8, "critperlevel": 0, "attackdamageperlevel": 2.65, "attackspeedperlevel": 1.36},
  "spells": [{"id": "AnnieQ", "name": "Disintegrate", ...}, ...],
  "passive": {"name": "Pyromania", "description": "...", "image": {...}}
}
```

---

## Backward Compatibility

### Version Strategy
- **Schema evolution**: Add new columns without breaking reads
- **Field additions**: New patch versions may add champion abilities or items (future)
- **Historical access**: Query any champion by version string (e.g., "15.24.1")

### Future Extensions
- **Ability details**: Move from JSON to structured spell table
- **Item synergies**: Link champions to recommended item builds
- **Balance history**: Track ability changes per patch
- **Champion relationships**: Add lore connections, universe faction

---

## Implementation Checklist

- [ ] Create Go struct: `entities/champion/champion.go`
- [ ] Create CloudEvent wrapper: `entities/champion/createChampionEvent.go`
- [ ] Implement JSON parsing: `features/champion/importFromFile.go`
- [ ] Implement queue processing: `features/champion/championQueue.go`
- [ ] Create ClickHouse table: `scripts/database.sql` (DDL statement)
- [ ] Implement validation rules in import logic
- [ ] Add structured logging in import pipeline
- [ ] Test with Annie.json example file
- [ ] Verify partial success error handling
- [ ] Update AGENTS.md with champions feature

---

*Data Model: 2025-12-15*  
*Status: Ready for contract definition*
