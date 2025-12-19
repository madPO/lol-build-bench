# Implementation Plan: Create a gRPC API

**Branch**: `004-create-a-grpc` | **Date**: 2025-12-19 | **Spec**: [Feature Specification](./spec.md)
**Input**: Feature specification from `specs/004-create-a-grpc/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path ✓
   → Spec loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION) ✓
   → Project Type: Backend service (Go 1.25.3)
   → No NEEDS CLARIFICATION markers remaining
   → Set Structure Decision: Existing backend structure (src/backend/)
3. Evaluate Constitution Check section ✓
   → Event-driven architecture confirmed
   → Observability requirements identified
   → No violations detected
4. Execute Phase 0 → research.md ✓
   → Unknown clarifications resolved
5. Execute Phase 1 → contracts, data-model.md, quickstart.md ✓
   → Generate protocol buffer definitions
   → Create API contracts
   → Design data models
6. Re-evaluate Constitution Check section ✓
   → Post-design check: No violations
7. Plan Phase 2 → Describe task generation approach ✓
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Create a read-only gRPC API service that provides access to League of Legends game data (champions, items, runes). The API supports GraphQL-like query syntax with field selection, pagination, filtering, and sorting capabilities. Clients can retrieve full lists with pagination controls or individual resource details by identifier. The service will be implemented as a gRPC service following the project's event-driven architecture pattern.

**Technical Approach**: Extend the existing backend service with new gRPC methods defined via .proto files. Implement service methods to handle queries, filtering, and pagination. Reuse existing data models from the CloudEvent entities already present in the codebase.

## Technical Context

**Language/Version**: Go 1.25.3 with gRPC and Protocol Buffers  
**Primary Dependencies**: gRPC, Protocol Buffers (protoc), ClickHouse driver (existing)  
**Storage**: ClickHouse (existing database)  
**Testing**: Test-driven during MVP is deferred per constitution; focus on rapid delivery  
**Target Platform**: Linux server (Docker deployment existing)  
**Project Type**: Backend service (single project - extends existing src/backend/)  
**Performance Goals**: Handle concurrent client connections efficiently; sub-100ms response times for typical queries  
**Constraints**: Maintain backward compatibility with existing loader service; follow event-driven architecture  
**Scale/Scope**: Support champions (160+), items (180+), runes (60+) with pagination and filtering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (single backend service extension)
- Using framework directly? Yes (gRPC framework directly, no wrapper classes)
- Single data model? Yes (reuse existing Champion, Item, Rune entities)
- Avoiding patterns? Yes (direct service implementation, no Repository pattern needed)

**Architecture**:
- EVERY feature as library? Feature is part of existing api-service application
- Libraries used: gRPC service definition, protocol buffer compilation
- Observability: Structured logging for all API calls following existing patterns

**Testing (NON-NEGOTIABLE)**:
- Per project constitution: No tests during MVP phase
- Focus on rapid delivery with code as documentation
- Manual integration testing via quickstart scenarios

**Observability**:
- Structured logging included? Yes, integrate with existing logging
- Error responses include clear status codes and messages
- Request context tracking for debugging

**Versioning**:
- Version number follows existing patch release strategy
- Breaking changes: None anticipated - additive API only

## Project Structure

### Documentation (this feature)
```
specs/004-create-a-grpc/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/
│   ├── grpc-api.proto   # Phase 1 output (/plan command)
│   └── api-contracts.md # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/backend/
├── app/
│   └── api-service/          # Extend existing service
│       └── main.go           # Entry point
├── entities/                 # Reuse existing
│   ├── champion/
│   ├── item/
│   ├── rune/
│   └── cloudEvent/
├── features/                 # Add new query logic
│   ├── champion/
│   ├── item/
│   ├── rune/
│   └── grpc-query/           # NEW: Query handling for gRPC
└── services/                 # Extend existing
    └── grpc-api/             # NEW: gRPC service implementation

api/proto/
├── health.proto              # Existing
└── query.proto               # NEW: gRPC API definition
```

**Structure Decision**: DEFAULT - extend existing backend structure (Option 1)

## Phase 0: Outline & Research

### Research Tasks Completed

1. **gRPC Best Practices for Game Data APIs**
   - Decision: Use unary RPC calls for queries, streaming for pagination
   - Rationale: Simple queries deserve simple RPC patterns; pagination via continuation tokens
   - Alternatives: Server streaming (more complex than needed); client streaming (not applicable)

2. **Protocol Buffer Design for Game Entities**
   - Decision: Define separate message types for Champion, Item, Rune with common QueryRequest structure
   - Rationale: Clear separation of concerns; reuses existing entity structure
   - Alternatives: Single generic message type (less type-safe)

3. **GraphQL-like Query Syntax in gRPC**
   - Decision: Implement field masking pattern using FieldMask (google.protobuf.FieldMask)
   - Rationale: Standard protobuf pattern for partial responses; language-agnostic
   - Alternatives: Custom query parser (complex); GraphQL gateway (over-engineered for needs)

4. **Pagination Strategy**
   - Decision: Use page number + size with continuation tokens
   - Rationale: Simple to understand; works well with database cursors
   - Alternatives: Offset-limit (less scalable); cursor-based (more complex)

5. **Filtering in gRPC Services**
   - Decision: Support filters as repeated filter objects in request
   - Rationale: Flexible; extensible for future filter types
   - Alternatives: URL query parameters (not standard for gRPC)

6. **Error Handling and Status Codes**
   - Decision: Use gRPC standard status codes (NOT_FOUND, INVALID_ARGUMENT, INTERNAL)
   - Rationale: Client-friendly; clear error semantics
   - Alternatives: Custom error codes (non-standard)

**Output**: All research questions resolved; ready for Phase 1 design.

## Phase 1: Design & Contracts

### 1.1 Data Model (`data-model.md` - Phase 1 Output)

**Champion Entity**:
- Fields: id, name, title, icon, role, difficulty, attack, defense, magic, complexity
- Validation: id and name required; role must be valid type
- Relationships: None directly (stateless data)

**Item Entity**:
- Fields: id, name, description, price, buildPath, from, into, stats
- Validation: id and name required; price >= 0
- Relationships: from and into reference other items (self-references)

**Rune Entity**:
- Fields: id, name, description, keystone, primaryTree, secondaryTree, icon
- Validation: id and name required; must belong to valid tree
- Relationships: None (stateless data)

**Query Request Structure**:
- fields: repeated field names to include (GraphQL-like selection)
- filters: repeated filter conditions (key-value pairs)
- page: pagination parameters (size, token)
- sort: sort configuration (field, order)

**Paginated Response**:
- data: repeated entity data
- total: total count of results
- page_size: size of current page
- next_token: continuation token for next page

### 1.2 API Contracts (`api-contracts.md` and `grpc-api.proto` - Phase 1 Output)

**Service: QueryService**

1. **GetChampion(GetChampionRequest) → GetChampionResponse**
   - Request: champion_id (string), fields (FieldMask)
   - Response: Champion data with selected fields
   - Errors: NOT_FOUND if champion doesn't exist

2. **ListChampions(ListChampionsRequest) → ListChampionsResponse**
   - Request: filters, sort, pagination, fields
   - Response: Paginated list of champions
   - Errors: INVALID_ARGUMENT for invalid filters/sort

3. **ListItems(ListItemsRequest) → ListItemsResponse**
   - Request: filters, sort, pagination, fields
   - Response: Paginated list of items
   - Errors: INVALID_ARGUMENT for invalid filters/sort

4. **ListRunes(ListRunesRequest) → ListRunesResponse**
   - Request: filters, sort, pagination, fields
   - Response: Paginated list of runes
   - Errors: INVALID_ARGUMENT for invalid filters/sort

### 1.3 Contract Tests (Implicit - Follow Quickstart)

Contract validation occurs through quickstart.md scenarios:
- Valid champion lookup returns correct data
- Invalid champion ID returns NOT_FOUND
- List requests respect pagination limits
- Filters reduce result sets correctly
- Field selection returns only requested fields

### 1.4 Test Scenarios (From User Stories)

1. **Champion Discovery** (Acceptance Scenario 1)
   - Client lists all champions with pagination
   - Verifies: Full list received in pages; pagination tokens work

2. **Champion Details** (Acceptance Scenario 2)
   - Client retrieves single champion by ID
   - Verifies: Comprehensive data returned; field selection works

3. **Item Listing** (Acceptance Scenario 3)
   - Client lists all items with pagination
   - Verifies: Items received; pagination functional

4. **Rune Listing** (Acceptance Scenario 4)
   - Client lists all runes with pagination
   - Verifies: Runes received; pagination functional

5. **Field Selection** (Acceptance Scenario 5)
   - Client requests specific fields only
   - Verifies: Response contains only selected fields

6. **Filtering** (Acceptance Scenario 6)
   - Client filters champions by role
   - Verifies: Only matching champions returned

7. **Sorting** (Acceptance Scenario 7)
   - Client sorts items by price
   - Verifies: Results in correct order

8. **Pagination** (Acceptance Scenario 8)
   - Client pages through large datasets
   - Verifies: Continuation tokens work; data consistency

### 1.5 Agent Context Update

The existing `AGENTS.md` file already documents backend architecture. Will add gRPC API details:
- New gRPC service endpoints
- Protocol buffer definitions location
- Query request/response patterns
- Filtering and pagination semantics

**Output**: 
- ✓ data-model.md (Phase 1)
- ✓ api-contracts.md with contract details
- ✓ grpc-api.proto (Protocol buffer definition)
- ✓ quickstart.md (Test scenarios)

## Phase 2: Task Planning Approach

*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
1. Load `/templates/tasks-template.md` as base
2. Generate tasks from Phase 1 outputs:
   - **Contract Tasks** [P]: Implement each gRPC endpoint (4 tasks: GetChampion, ListChampions, ListItems, ListRunes)
   - **Entity Tasks** [P]: Ensure Champion, Item, Rune entities support required fields (3 tasks)
   - **Feature Tasks**: Implement filtering logic (1 task); implement sorting logic (1 task); implement pagination (1 task)
   - **Integration Tasks**: Test with sample data; verify error handling
   - **Deployment Tasks**: Update proto compilation; Docker build verification

**Ordering Strategy**:
- Test-driven order: But per constitution, MVP skips tests - focus on rapid implementation
- Dependency order: Proto definitions first → Entity validation → Service implementation → Integration testing
- Mark [P] for parallel execution (4 list endpoint implementations can run in parallel)

**Estimated Output**: 15-20 numbered, ordered tasks in tasks.md

**IMPORTANT**: Phase 2 is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (manual testing with quickstart.md scenarios)

## Complexity Tracking

No violations of constitution detected. Implementation follows event-driven architecture by:
- Using existing CloudEvent-based entity structures
- Enabling observability through request/response logging
- Maintaining single backend service project structure
- Following Go conventions and gRPC best practices

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No deviations | All approach choices align with constitution |

## Progress Tracking

*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

*Based on Constitution v1.5.0 - See `/.specify/memory/constitution.md`*

