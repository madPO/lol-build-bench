# Phase 1: Data Model

**Feature**: Create a gRPC API  
**Date**: 2025-12-19  
**Status**: Complete

## Entity Models

### Champion

**Purpose**: Represents a League of Legends champion playable character.

**Fields**:
- `id` (string, required): Unique identifier for champion
- `name` (string, required): Display name of champion
- `title` (string): Champion title/tagline
- `icon` (string): URL or path to champion icon image
- `role` (string): Primary role (e.g., "Mage", "Assassin", "Tank", "Support")
- `difficulty` (int32): Difficulty rating (1-3, where 3 is most difficult)
- `stats` (ChampionStats): Base statistics
- `abilities` (Abilities): Champion abilities (Q, W, E, R, Passive)

**Validation Rules**:
- `id` and `name` are mandatory
- `role` must be from valid set: ["Mage", "Assassin", "Tank", "Support", "Fighter", "Marksman"]
- `difficulty` must be 1-3
- `icon` should be non-empty URL

**State Transitions**: None (read-only data)

**Relationships**: None (standalone resource)

---

### ChampionStats

**Purpose**: Contains base statistics for a champion.

**Fields**:
- `health` (float): Base health points
- `health_per_level` (float): Health gained per level
- `mana` (float): Base mana/energy
- `mana_per_level` (float): Mana gained per level
- `armor` (float): Base armor
- `armor_per_level` (float): Armor gained per level
- `spellblock` (float): Base magic resist
- `spellblock_per_level` (float): Magic resist gained per level
- `attackdamage` (float): Base attack damage
- `attackdamage_per_level` (float): Attack damage gained per level
- `attackspeed` (float): Base attack speed
- `attackspeed_per_level` (float): Attack speed gained per level

**Validation Rules**: All numeric fields >= 0

---

### Item

**Purpose**: Represents a League of Legends item that can be purchased and equipped.

**Fields**:
- `id` (string, required): Unique identifier for item
- `name` (string, required): Display name of item
- `description` (string): Item description and effects
- `price` (int32): Gold cost to purchase
- `build_path` (repeated string): Components that build into this item
- `from` (repeated string): Item IDs this item builds from
- `into` (repeated string): Item IDs this item builds into
- `stats` (ItemStats): Granted statistics
- `categories` (repeated string): Item categories/types

**Validation Rules**:
- `id` and `name` are mandatory
- `price` >= 0
- `categories` must be from valid set: ["Armor", "Attack", "Damage", "Defense", "Healing", "Magic", "Movement", "ManaRestore", "SpellVamp", "HealthRestore", "CooldownReduction"]

**State Transitions**: None (read-only data)

**Relationships**:
- `from`: Self-reference to component items
- `into`: Self-reference to upgraded items

---

### ItemStats

**Purpose**: Contains statistics granted by an item.

**Fields**:
- `armor` (float): Armor granted
- `spellblock` (float): Magic resist granted
- `health` (float): Health granted
- `mana` (float): Mana granted
- `attackdamage` (float): Attack damage granted
- `attackspeed` (float): Attack speed granted (as decimal, e.g., 0.25 = 25%)
- `movementspeed` (float): Movement speed granted
- `cooldownreduction` (float): Cooldown reduction (as decimal, e.g., 0.1 = 10%)
- `spellvamp` (float): Spell vamp percentage
- `lifesteal` (float): Lifesteal percentage

**Validation Rules**: All numeric fields >= 0

---

### Rune

**Purpose**: Represents a League of Legends rune (passive stat modifier).

**Fields**:
- `id` (string, required): Unique identifier for rune
- `name` (string, required): Display name of rune
- `description` (string): Rune effect description
- `keystone` (bool): Whether this is a keystone rune
- `primary_tree` (string): Primary rune tree this belongs to
- `secondary_tree` (string, optional): Secondary tree if applicable
- `icon` (string): URL or path to rune icon
- `tooltip` (string): Detailed tooltip text

**Validation Rules**:
- `id` and `name` are mandatory
- `primary_tree` must be from set: ["Precision", "Domination", "Sorcery", "Resolve", "Inspiration"]
- If `secondary_tree` specified, must be valid tree and != `primary_tree`
- `icon` should be non-empty URL

**State Transitions**: None (read-only data)

**Relationships**: None (standalone resource)

---

## Request/Response Models

### QueryRequest (Base)

**Purpose**: Common structure for all query requests.

**Fields**:
- `fields` (FieldMask): Protobuf FieldMask for field selection (GraphQL-like)
- `filters` (repeated FilterCondition): Filter criteria for narrowing results
- `sort` (SortSpec): Sorting specification
- `page` (PaginationRequest): Pagination parameters

**Validation**:
- Each filter must have valid field name and operator
- Sort field must exist on entity
- Pagination size must be 1-100 (default 20)

---

### FilterCondition

**Purpose**: Single filter condition for list queries.

**Fields**:
- `field` (string): Entity field name to filter on
- `operator` (string): Comparison operator
- `value` (string): Value to compare against

**Valid Operators**:
- `eq`: Equals
- `ne`: Not equals
- `gt`: Greater than (numeric fields)
- `gte`: Greater than or equal
- `lt`: Less than (numeric fields)
- `lte`: Less than or equal
- `in`: In list (value is comma-separated)
- `contains`: Contains substring (string fields)

**Examples**:
- `{"field": "role", "operator": "eq", "value": "Mage"}`
- `{"field": "price", "operator": "lt", "value": "2500"}`
- `{"field": "name", "operator": "contains", "value": "Sword"}`

---

### SortSpec

**Purpose**: Specifies how to sort results.

**Fields**:
- `field` (string): Field name to sort by
- `order` (string): Sort order - "asc" or "desc"

**Valid Sort Fields**:
- Champion: `name`, `role`, `difficulty`
- Item: `name`, `price`
- Rune: `name`, `primary_tree`

**Examples**:
- `{"field": "name", "order": "asc"}`
- `{"field": "price", "order": "desc"}`

---

### PaginationRequest

**Purpose**: Pagination parameters for list queries.

**Fields**:
- `page_size` (int32): Number of results per page (1-100, default 20)
- `page_token` (string): Continuation token from previous response (optional)
- `page_number` (int32): Page number for simple pagination (alternative to token)

**Validation**:
- Either `page_token` OR `page_number` specified (not both)
- `page_size` between 1 and 100

---

### PaginationResponse

**Purpose**: Pagination metadata in list responses.

**Fields**:
- `total_count` (int64): Total number of results across all pages
- `page_size` (int32): Size of current page
- `current_page` (int32): Current page number
- `next_token` (string): Token for fetching next page
- `has_next` (bool): Whether more pages exist

---

### ListChampionsResponse

**Purpose**: Response from ListChampions RPC call.

**Fields**:
- `champions` (repeated Champion): List of champion data
- `pagination` (PaginationResponse): Pagination metadata
- `total_count` (int64): Total champions matching filters

---

### ListItemsResponse

**Purpose**: Response from ListItems RPC call.

**Fields**:
- `items` (repeated Item): List of item data
- `pagination` (PaginationResponse): Pagination metadata
- `total_count` (int64): Total items matching filters

---

### ListRunesResponse

**Purpose**: Response from ListRunes RPC call.

**Fields**:
- `runes` (repeated Rune): List of rune data
- `pagination` (PaginationResponse): Pagination metadata
- `total_count` (int64): Total runes matching filters

---

### GetChampionResponse

**Purpose**: Response from GetChampion RPC call.

**Fields**:
- `champion` (Champion): Requested champion data
- `found` (bool): Whether champion exists

---

## Data Flow Diagram

```
Client
  ↓
[gRPC Request: GetChampion / ListChampions / ListItems / ListRunes]
  ↓
[QueryService Handler]
  ├─→ Parse FieldMask (field selection)
  ├─→ Validate Filters (check field names, operators)
  ├─→ Validate Sort (check field names)
  ├─→ Build SQL Query
  └─→ Execute on ClickHouse
  ↓
[ClickHouse Database]
  ├─ champions table
  ├─ items table
  └─ runes table
  ↓
[Apply FieldMask to Results]
  ↓
[Build Response with Pagination Metadata]
  ↓
[Return gRPC Response]
  ↓
Client
```

## Storage Mapping

### Existing ClickHouse Tables

The gRPC API queries existing ClickHouse tables created by loader service:

- **champions**: Stores champion data with CloudEvent metadata
  - Columns: id, name, title, icon, role, difficulty, stats (JSON), etc.
  - Primary key: (id, event_id, timestamp)

- **items**: Stores item data with CloudEvent metadata
  - Columns: id, name, description, price, build_path (Array), from, into, stats (JSON), etc.
  - Primary key: (id, event_id, timestamp)

- **runes**: Stores rune data with CloudEvent metadata
  - Columns: id, name, description, keystone, primary_tree, secondary_tree, icon, etc.
  - Primary key: (id, event_id, timestamp)

### Query Strategy

1. For single resource: `SELECT * FROM champions WHERE id = ? LIMIT 1`
2. For list with filters: `SELECT * FROM champions WHERE {filters} ORDER BY {sort} LIMIT ? OFFSET ?`
3. Apply FieldMask after retrieval to select only requested fields
4. Count query: `SELECT COUNT(*) FROM champions WHERE {filters}`

## Validation Rules Summary

| Entity | Required Fields | Valid Values | Constraints |
|--------|-----------------|--------------|-------------|
| Champion | id, name | role ∈ valid set | difficulty 1-3 |
| Item | id, name | categories ∈ valid set | price ≥ 0 |
| Rune | id, name | tree ∈ valid set | no circular deps |

