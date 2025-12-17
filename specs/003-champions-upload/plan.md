# Implementation Plan: Champions Upload

**Branch**: `003-champions-upload` | **Date**: 2025-12-15 | **Spec**: `/specs/003-champions-upload/spec.md`
**Input**: Feature specification from `/specs/003-champions-upload/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path ✓
   → Spec found: Champions bulk import with validation
2. Fill Technical Context (scan for NEEDS CLARIFICATION) ✓
   → Detect Project Type: Backend service (Go) + existing patterns
   → Set Structure Decision: Single backend service extension
3. Evaluate Constitution Check section ✓
   → Event-driven: CloudEvent pattern (existing)
   → Observability: Structured logging required
   → No tests during MVP: Confirmed by constitution
4. Execute Phase 0 → research.md
   → Generate research findings
5. Execute Phase 1 → contracts, data-model.md, quickstart.md
   → Define database schema, API patterns, data structures
6. Re-evaluate Constitution Check section
   → Verify compliance with event-driven and observability
7. Plan Phase 2 → Describe task generation approach
8. STOP - Ready for /tasks command
```

## Summary
Champions upload feature enables bulk import of League of Legends champion data from JSON sources into ClickHouse. System must extract and store champion attributes (excluding skins, lore, blurb, tips, tags), validate records, and support partial success error handling. Implementation follows existing item/runes uploader patterns using event-driven architecture with CloudEvents.

## Technical Context
**Language/Version**: Go 1.25.3  
**Primary Dependencies**: ClickHouse driver, CloudEvent pattern  
**Storage**: ClickHouse (ReplacingMergeTree engine for champions table)  
**Testing**: N/A (MVP phase per constitution)  
**Target Platform**: Linux server (backend service)  
**Project Type**: Backend service extension (library function)  
**Performance Goals**: Bulk import of 150+ champions per upload operation  
**Constraints**: Partial success on validation errors, eventual consistency acceptable, direct function calls only  
**Scale/Scope**: ~160 champions per patch, ~10 abilities + passive per champion, quarterly updates

## Constitution Check
*GATE: Must pass before Phase 0 research*

**Simplicity**:
- Projects: 1 (api-service extension) ✓
- Using framework directly: gRPC services directly, no wrapper classes ✓
- Single data model: Champion entity only ✓
- Avoiding patterns: Direct ClickHouse access via features/champion/importFromFile.go ✓

**Architecture**:
- Event-driven: CloudEvent for each champion stored in database ✓
- Library approach: features/champion/ contains business logic, entities/champion/ contains data ✓
- Direct function calls: No gRPC service, called directly from loader or other services ✓
- Observable: Structured logging required in all operations ✓

**Testing (MVP EXEMPTION)**:
- Constitution states: "No tests during MVP" ✓
- Focus on rapid development and iteration ✓

**Observability**:
- Structured logging: Required in champion import service ✓
- Error context: Validation errors logged with champion ID ✓

**Versioning**:
- Version: 0.0.3 (features/003) ✓

**Status**: PASS - Aligns with constitution and existing project patterns

## Project Structure

### Documentation (this feature)
```
specs/003-champions-upload/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── database-schema.sql
│   └── api-contracts.md
└── spec.md              # Original specification
```

### Source Code (repository root)
```
src/backend/
├── entities/champion/
│   ├── champion.go           # Champion data model
│   └── createChampionEvent.go # CloudEvent wrapper
├── features/champion/
│   ├── importFromFile.go     # JSON file processing
│   └── championQueue.go      # Queue management for bulk import
└── services/
    └── [existing health service, etc.]

deployments/docker/
└── docker-compose.yml        # ClickHouse service (existing)

scripts/
└── database.sql              # UPDATE: Add champions table schema
```

**Structure Decision**: Single backend service extension (existing api-service)

---

## Phase 0: Outline & Research

### Research Findings

#### 1. Champion Data Structure
**Decision**: Use Annie.json as reference implementation  
**Fields to Import**:
- Core: id, key, name, title, partype
- Image: full, sprite, group, x, y, w, h
- Stats (base): hp, mp, movespeed, armor, spellblock, attackrange, hpregen, mpregen, crit, attackdamage, attackspeed
- Stats (per-level): hpperlevel, mpperlevel, armorperlevel, spellblockperlevel, hpregenperlevel, mpregenperlevel, critperlevel, attackdamageperlevel, attackspeedperlevel
- Spells (4x): id, name, description, tooltip, maxrank, cooldown, cost, range, image
- Passive: name, description, image

**Fields to Exclude**: skins, lore, blurb, allytips, enemytips, tags, info, recommended

#### 2. Database Design
**Decision**: ClickHouse ReplacingMergeTree engine (matches items/runes pattern)  
**Rationale**: Handles duplicate imports gracefully, supports efficient upserts  
**Schema Pattern**:
```
CREATE TABLE champions (
  version String,
  championId String,
  championKey Int32,
  championName String,
  ... [all attributes as columns]
  uploadTimestamp DateTime
) ENGINE = ReplacingMergeTree(uploadTimestamp)
ORDER BY (championId, version)
```

#### 3. Import Pipeline
**Decision**: Read champion files → Parse JSON → CloudEvent → ClickHouse (no validation phase)
**File Structure**: Each champion in separate JSON file (Annie.json, Ahri.json, etc.)
**Path Pattern**: `basePath/patchId/data/language/champions/`
**All-or-Nothing**: If any file fails, entire import fails (no partial success)

#### 4. Event-Driven Pattern
**Decision**: Use CloudEvent wrapper for each champion batch import  
**Rationale**: Aligns with constitution event-driven principle  
**Event Type**: `com.lolbuilds.champion.imported`

#### 5. Error Handling
**Decision**: All-or-nothing guarantee
- Read all champion files from directory
- If any file is invalid/missing/corrupt, entire import fails
- No partial imports
- Error returned to caller
- Transaction rolled back if database error occurs

**Output**: research.md complete with all decisions documented

---

## Phase 1: Design & Contracts

### 1.1 Data Model
**File**: `data-model.md` (to be generated)

**Champion Entity Structure**:
```
Champion {
  id: String              # Champion identifier (e.g., "Annie")
  key: Int32              # Numeric key for internal reference
  name: String            # Display name
  title: String           # Champion title/tagline
  partype: String         # Resource type (Mana, Energy, etc.)
  
  image: {
    full: String
    sprite: String
    group: String
    x, y, w, h: Int32
  }
  
  baseStats: {
    hp, mp, movespeed, armor, spellblock, attackrange,
    hpregen, mpregen, crit, attackdamage, attackspeed: Float
  }
  
  levelStats: {
    hpperlevel, mpperlevel, armorperlevel, spellblockperlevel,
    hpregenperlevel, mpregenperlevel, critperlevel,
    attackdamageperlevel, attackspeedperlevel: Float
  }
  
  spells: [4]{
    id: String            # e.g., "AnnieQ"
    name: String
    description: String
    tooltip: String
    maxrank: Int32
    cooldown: [Int32]
    cost: [Int32]
    range: [Int32]
    image: { full, sprite, group, x, y, w, h }
  }
  
  passive: {
    name: String
    description: String
    image: { full, sprite, group, x, y, w, h }
  }
  
  version: String         # Patch version (e.g., "15.24.1")
  uploadTimestamp: DateTime
}
```

### 1.2 Database Schema
**File**: `contracts/database-schema.sql` (to be generated)

**Schema Pattern**: CloudEvent-based storage (matches items/runes pattern)

```sql
CREATE TABLE champions (
  -- Champion identifiers
  event_id UUID,                           -- Generated event identifier (primary key)
  oid String,                         -- Original champion ID from source system
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
ORDER BY (subject, type, pid)
```

**Key Design Differences from Initial Plan**:
- All champion data stored in single JSON `data` column (follows items/runes pattern)
- CloudEvent metadata columns (cid, oid, pid, source, specversion, type, etc.)
- No separate stat columns - all nested in JSON
- Patch reference via `pid` column (foreign key to patches table)
- ReplacingMergeTree deduplicates on (subject, type, pid)

### 1.3 Function Contracts
**File**: `contracts/api-contracts.md` (to be generated)

Champions upload is a library function called directly by loader service or other code.

**Package**: `src/backend/features/champion`
**Function**: `ImportFromFile(basePath string, patch *Patch) error`

```go
// Patch contains metadata for import operation
type Patch struct {
    ID       string // Patch version (e.g., "15.24.1")
    PatchID  string // Database reference (e.g., "patch_15_24_1")
    Language string // Language code (e.g., "en_US")
}

// File path construction: basePath/patchId/data/language/champions/
// Example: /data/champions/patch_15_24_1/data/en_US/champions/

// Return: error only
// - nil: All champions imported successfully
// - non-nil: Import failed (all-or-nothing guarantee)
```

### 1.4 Validation Rules
- Required fields: id, key, name, title, partype
- Base stats must be numeric or 0
- Spells array must contain exactly 4 entries
- Passive must have name and description
- Version must follow semantic versioning format

### 1.5 Quickstart
**File**: `quickstart.md` (to be generated)

User story validation:
1. Prepare champions.json file with current patch data
2. Call ImportChampions with JSON payload
3. Verify response: successCount == expected champion count
4. Query ClickHouse: SELECT COUNT(*) FROM champions WHERE version='15.24.1'
5. Verify retrieved champions match source data

### 1.6 Agent-Specific Documentation
**File**: `AGENTS.md` (to be updated)

Update existing AGENTS.md with:
- Feature 003 new commands
- Champions table schema
- Import patterns and restrictions

---

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

### Task Generation Strategy

**Task Categories** (from TDD priority order):

1. **Contract Tests** [P]
   - Test champion JSON parsing from Annie.json format
   - Test validation rules for each required field
   - Test partial success scenario (valid + invalid mix)

2. **Data Model Tasks** [P]
   - Create entities/champion/champion.go with struct definition
   - Create entities/champion/createChampionEvent.go for CloudEvent wrapper

3. **Feature Implementation** (sequential after models)
   - features/champion/importFromFile.go - JSON file reading and parsing
   - features/champion/championQueue.go - Bulk processing queue
   - Database schema migration: scripts/database.sql

4. **Integration Tests** (validates full pipeline)
   - Test JSON → validation → database flow
   - Test partial success scenario
   - Test data retrieval after import

5. **Service Integration** (depends on feature completion)
   - Integrate with api-service health checks
   - Add champion import endpoint (if needed)
   - Update AGENTS.md with build/run commands

### Ordering Strategy
- Dependencies: Data models (P) → Features (sequential) → Integration tests → Service integration
- Parallel: Multiple contract tests can run in parallel
- Test-first: Each task includes failing test before implementation

### Estimated Output
20-25 numbered tasks:
- 3-4 contract validation tests
- 2 data model creation tasks
- 3-4 feature implementation tasks
- 2-3 integration test tasks
- 2 schema/build tasks
- 1-2 documentation updates

### Complexity Notes
- Reuse item/runes uploader patterns
- No new services needed (extend api-service)
- No external APIs required (local JSON files)
- Partial success handling common pattern

---

## Constitution Compliance Check (Post-Design)

**Event-Driven**: ✓ CloudEvent wrapper for champion imports  
**Observability**: ✓ Structured logging in import pipeline  
**Fast Performance**: ✓ ClickHouse batch processing  
**Always Fresh Dependencies**: ✓ Use latest Go + ClickHouse driver versions  
**Program Structure**: ✓ Data in entities/, business logic in features/  
**MVP Development**: ✓ No tests required per constitution  

**Status**: PASS - All constitutional requirements satisfied

---

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - approach described)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

**Artifacts Generated**:
- [x] plan.md (this file)
- [x] research.md (detailed findings)
- [x] data-model.md (entity definitions)
- [x] contracts/database-schema.sql (ClickHouse DDL)
- [x] contracts/api-contracts.md (gRPC definitions)
- [x] quickstart.md (validation walkthrough)

---

*Based on Constitution v1.5.0 - See `/memory/constitution.md`*
