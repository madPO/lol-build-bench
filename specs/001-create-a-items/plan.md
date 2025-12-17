# Implementation Plan: Items Uploaders

**Branch**: `001-create-a-items` | **Date**: 2025-12-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `F:\pet-projects\lol-builds\specs\001-create-a-items\spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI or `AGENTS.md` for opencode).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Create an items uploader system that mirrors the existing patch uploader pattern to load League of Legends item data from external sources into ClickHouse. The system will filter items to only include those for map ID 11 (Summoner's Rift), store item names as identifiers, and maintain relationships to patch versions. The implementation follows the established event-driven architecture using CloudEvents pattern.

## Technical Context
**Language/Version**: Go 1.25.3  
**Primary Dependencies**: ClickHouse v2.41.0, google/uuid v1.6.0  
**Storage**: ClickHouse (existing database with MergeTree engine)  
**Testing**: No tests during MVP phase (per constitution)  
**Target Platform**: Linux server (backend services)  
**Project Type**: Backend API service (existing multi-service architecture)  
**Performance Goals**: Fast bulk data loading, low-latency queries  
**Constraints**: ClickHouse automatically retains only latest version (ReplacingMergeTree behavior), filter to map ID 11 only, CloudEvent pattern mandatory  
**Scale/Scope**: Item data per patch version, Summoner's Rift items only

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 2 (api-service, loader-service) - within max 3
- Using framework directly? YES (ClickHouse driver, gRPC, no wrappers)
- Single data model? YES (Item entity, CloudEvent wrapper, no separate DTOs)
- Avoiding patterns? YES (direct database access, no Repository/UoW patterns)

**Architecture**:
- EVERY feature as library? YES (features/item/ will contain business logic)
- Libraries listed:
  - entities/item: Data models only (Item, CreateItemEvent)
  - features/item: Business logic (ImportFromFile, PushItemEvent, ItemQueue)
  - services/health: gRPC health checks (existing)
- CLI per library: N/A (loader-service acts as CLI entry point)
- Library docs: Code as documentation per MVP requirements

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? NO - MVP phase excludes tests per constitution
- Git commits show tests before implementation? NO - MVP phase excludes tests
- Order: Contract→Integration→E2E→Unit strictly followed? NO - MVP phase excludes tests
- Real dependencies used? N/A - no tests during MVP
- Integration tests for: N/A - no tests during MVP
- CONSTITUTIONAL EXCEPTION: MVP Development Requirements allow skipping tests

**Observability**:
- Structured logging included? YES (Go standard log package with structured output)
- Frontend logs → backend? N/A (backend-only system)
- Error context sufficient? YES (error wrapping and context propagation)

**Versioning**:
- Version number assigned? YES (following existing service versioning)
- BUILD increments on every change? YES (will follow existing pattern)
- Breaking changes handled? N/A (new feature, no breaking changes)

## Project Structure

### Documentation (this feature)
```
specs/001-create-a-items/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/backend/
├── entities/
│   └── item/           # NEW: Item data models
│       ├── item.go
│       └── createItemEvent.go
├── features/
│   └── item/           # NEW: Item business logic
│       ├── importFromFile.go
│       └── itemQueue.go
├── services/
│   └── health/         # EXISTING: Health service
└── app/
    ├── api-service/    # EXISTING: API service
    └── loader-service/ # EXISTING: Loader service (will use item features)

scripts/
└── database.sql        # UPDATE: Add items table schema

api/proto/
└── health.proto        # EXISTING: Health check proto
```

**Structure Decision**: Backend service structure (existing pattern) - no frontend/mobile components

## Phase 0: Outline & Research
*COMPLETED - All technical decisions resolved*

### Resolved Decisions

**Decision 1: Item Data Source Format**
- **Decision**: Use dragontail manifest pattern with JSON item data files
- **Rationale**: Existing patch loader uses dragontail.ReadManifest(), consistent pattern reduces complexity
- **Alternatives considered**: Custom JSON format (rejected - duplicates effort), CSV (rejected - less structured)

**Decision 2: Item Validation Rules**
- **Decision**: Minimal validation - require item name (non-empty string) and mapId field presence
- **Rationale**: MVP phase prioritizes rapid development, ClickHouse schema provides structural validation
- **Alternatives considered**: Comprehensive validation (rejected - premature for MVP), no validation (rejected - data quality issues)

**Decision 3: ClickHouse Table Design**
- **Decision**: Mirror patches table structure using CloudEvent pattern with ReplacingMergeTree engine
- **Rationale**: Automatic deduplication via ReplacingMergeTree, consistent with existing architecture
- **Alternatives considered**: Separate versioning table (rejected - complexity), plain MergeTree (rejected - manual deduplication)

**Decision 5: Batch Insert Operations**
- **Decision**: Use ClickHouse driver's PrepareBatch() API for all item inserts
- **Rationale**: 100-500x performance improvement over individual inserts, single network round-trip for entire batch
- **Alternatives considered**: Individual INSERTs (rejected - too slow), manual multi-row INSERT (rejected - driver's API is safer and more efficient)

**Decision 4: Map ID Filtering**
- **Decision**: Filter in business logic layer (features/item/importFromFile.go) before event creation
- **Rationale**: Prevents unnecessary data storage, clear separation of concerns
- **Alternatives considered**: Database-level filtering (rejected - data already stored), client-side filtering (rejected - wrong layer)

**Outstanding Items**: None - all NEEDS CLARIFICATION from spec resolved

## Phase 1: Design & Contracts
*IN PROGRESS*

### Data Model Design

#### Core Entities
1. **Item** (entities/item/item.go)
   - IID: UUID (item identifier)
   - OID: string (original ID from data source)
   - Name: string (item name, used as subject)
   - MapId: int (map identifier, filtered to 11)
   - PatchOID: string (reference to patch OID)
   - CreatedTime: time.Time

2. **CreateItemEvent** (entities/item/createItemEvent.go)
   - Wraps CloudEvent structure
   - Subject: item name
   - Type: "item.created"
   - Data: Item JSON

#### Database Schema
```sql
CREATE TABLE IF NOT EXISTS items (
    iid UUID,
    oid String,
    name String,
    map_id Int32,
    patch_oid String,
    created_time DateTime64(3, 'UTC'),
    source String,
    specversion String,
    type String,
    datacontenttype String,
    subject String,
    data JSON
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (name, map_id, oid);
```

### API Contracts

#### Internal Go API (features/item package)

**Function: ImportFromFile**
```go
// ImportFromFile loads items from dragontail manifest file
// Filters to map ID 11 only
// Returns error if file reading or event processing fails
func ImportFromFile(rootPath string, scope applicationScope.Scope) error
```

**Function: PushItemEvent**
```go
// PushItemEvent sends item creation event to queue
// Returns error if queue operations fail
func PushItemEvent(event item.CreateItemEvent, scope applicationScope.Scope) error
```

**Function: OpenItemQueue**
```go
// OpenItemQueue opens ClickHouse connection and returns push/commit functions
// Returns (pushFunc, commitFunc, error)
func OpenItemQueue(scope applicationScope.Scope) (func(item.CreateItemEvent) error, func() error, error)
```

### Contract Tests
*SKIPPED - MVP phase excludes tests per constitution*

### Integration Test Scenarios
*SKIPPED - MVP phase excludes tests per constitution*

### Agent Context Update
*Will update AGENTS.md with item-specific build commands and patterns*

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks following TDD order (skipped due to MVP)
- Tasks organized by architectural layer:
  1. Database schema updates
  2. Entity creation (data models)
  3. Event structure creation
  4. Feature implementation (business logic)
  5. Integration with loader-service

**Ordering Strategy**:
- Bottom-up: Database → Entities → Features → Integration
- Mark [P] for parallel execution where applicable
- Dependencies: Database schema before entities, entities before features

**Estimated Output**: 12-15 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (manual testing, execute quickstart.md, performance validation)

## Complexity Tracking
*No constitutional violations - all checks passed*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command) - 2025-12-14
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

**Artifacts Generated**:
- [x] research.md (Phase 0)
- [x] data-model.md (Phase 1)
- [x] contracts/database-schema.sql (Phase 1)
- [x] contracts/go-api.md (Phase 1)
- [x] quickstart.md (Phase 1)
- [x] AGENTS.md updated (Phase 1)
- [x] tasks.md (Phase 3) - 11 tasks across 5 phases
- [x] scripts/database.sql updated with items table schema

---
*Based on Constitution v1.5.0 - See `.specify/memory/constitution.md`*
