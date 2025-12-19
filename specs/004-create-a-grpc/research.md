# Phase 0: Research & Unknowns Resolution

**Feature**: Create a gRPC API  
**Date**: 2025-12-19  
**Status**: Complete

## Research Questions & Findings

### 1. gRPC Best Practices for Game Data APIs

**Question**: What is the recommended approach for implementing simple read-only APIs in gRPC?

**Research Summary**:
- gRPC excels at high-performance data retrieval with strong typing
- Unary RPC calls ideal for single resource lookups
- Server-side streaming suitable for paginated responses
- Bidirectional streaming unnecessary for read-only operations

**Decision**: Use unary RPC calls for individual resource queries and list operations with pagination via continuation tokens.

**Rationale**: 
- Unary calls are simpler to implement and understand
- Continuation tokens provide stateless pagination
- No complexity of streaming state management
- Clients can make independent requests for different pages

**Alternatives Considered**:
- Server streaming for all list operations (more complex state management)
- Client streaming (not applicable for read-only operations)
- REST HTTP/2 (less type-safe than protobuf)

---

### 2. Protocol Buffer Design for Game Entities

**Question**: How should Champion, Item, and Rune entities be modeled in Protocol Buffers?

**Research Summary**:
- Protocol Buffers support nested messages for complex types
- Field numbers are immutable (backward compatibility)
- Oneof fields used for conditional content
- Repeated fields for arrays/lists

**Decision**: Create separate message types for Champion, Item, and Rune with a unified QueryRequest structure and FilterRequest/SortRequest sub-messages.

**Rationale**:
- Clear separation of concerns improves maintainability
- Type safety at compile-time for each entity type
- Easy to extend each entity independently
- Mirrors existing entity structure in codebase (entities/champion/, entities/item/, etc.)

**Alternatives Considered**:
- Single generic message type with "object" field (type-unsafe, requires reflection)
- Nested all entities under one message (harder to maintain)

---

### 3. GraphQL-like Query Syntax in gRPC

**Question**: How can GraphQL-like field selection be implemented in gRPC?

**Research Summary**:
- Google Protocol Buffers includes `google.protobuf.FieldMask` for partial responses
- FieldMask is standard, language-agnostic solution
- Applied to response messages to select which fields to include
- Client specifies path to fields as strings (e.g., "name", "role", "icon")

**Decision**: Implement field selection using `google.protobuf.FieldMask` in all request messages.

**Rationale**:
- Standard pattern in Google Cloud APIs
- Widely understood by gRPC practitioners
- Reduces payload size by excluding unused fields
- Simple implementation in Go

**Alternatives Considered**:
- Custom query parser (too much complexity for MVP)
- GraphQL gateway in front of gRPC (over-engineered)
- All-or-nothing responses (wastes bandwidth)

---

### 4. Pagination Strategy

**Question**: What pagination approach works best with gRPC and ClickHouse?

**Research Summary**:
- Offset-limit pagination simpler but doesn't scale (performance degrades with large offsets)
- Cursor-based pagination more scalable but complex
- Page-number with continuation tokens balance simplicity and scalability
- ClickHouse supports efficient cursor-based lookups

**Decision**: Implement page-number based pagination with optional continuation tokens for cursor-based pagination.

**Rationale**:
- Page numbers intuitive for clients (request page 1, 2, 3...)
- Continuation tokens available for clients wanting cursor efficiency
- Can start simple with page numbers and add token support later
- ClickHouse can efficiently implement both approaches

**Alternatives Considered**:
- Pure offset-limit (acceptable for MVP but not scalable)
- Pure cursor-based (more complex initial implementation)

---

### 5. Filtering in gRPC Services

**Question**: How should filtering be implemented in gRPC list endpoints?

**Research Summary**:
- No standard query syntax in gRPC (unlike REST query parameters)
- Options: structured filter messages, filter DSL, key-value pairs
- Protobuf repeated fields enable flexible filter arrays
- JSON mapping for REST-over-gRPC compatibility

**Decision**: Use structured FilterCondition messages with field name, operator, and value. Repeated in ListRequest for multiple conditions.

**Rationale**:
- Type-safe and clear semantics
- Extensible to new operators without breaking changes
- Maps well to SQL WHERE clauses
- Easier to validate than free-form strings

**Alternatives Considered**:
- Free-form filter strings (type-unsafe, requires parsing)
- Ad-hoc filter fields per endpoint (doesn't scale)
- No filtering (doesn't meet requirements)

---

### 6. Error Handling & Status Codes

**Question**: Which error codes and messages should the API use?

**Research Summary**:
- gRPC defines standard status codes: OK, CANCELLED, UNKNOWN, INVALID_ARGUMENT, DEADLINE_EXCEEDED, NOT_FOUND, ALREADY_EXISTS, PERMISSION_DENIED, RESOURCE_EXHAUSTED, FAILED_PRECONDITION, ABORTED, OUT_OF_RANGE, UNIMPLEMENTED, INTERNAL, UNAVAILABLE, DATA_LOSS, UNAUTHENTICATED
- Each code maps to HTTP status when exposed via HTTP/2
- Message field can include detailed error context
- Details field can include error metadata

**Decision**: Use standard gRPC status codes:
- `NOT_FOUND` for missing resources
- `INVALID_ARGUMENT` for malformed requests (invalid filters, sort fields, pagination)
- `INTERNAL` for unexpected server errors
- `OK` for successful responses

**Rationale**:
- Standardized error semantics across gRPC ecosystem
- Clients have established patterns for handling these codes
- Clear mapping to HTTP status codes for compatibility
- Aligns with gRPC best practices

**Alternatives Considered**:
- Custom error codes (non-standard, confuses clients)
- Only using INTERNAL (loses semantic information)

---

### 7. Integrating with Existing CloudEvent Architecture

**Question**: How should the gRPC API integrate with the existing CloudEvent-based entity models?

**Research Summary**:
- Existing entities (Champion, Item, Rune) already have CloudEvent wrapper structure
- Loader service publishes CloudEvents when data changes
- API service needs to query persisted data, not subscribe to events
- CloudEvent pattern is for data mutations, not queries

**Decision**: The gRPC API queries the ClickHouse database directly for data. No CloudEvent involvement in queries. CloudEvents remain for data ingestion only.

**Rationale**:
- Queries are read-only operations; no events needed
- Direct DB access simpler than event-based retrieval
- Maintains separation between data ingestion (events) and data querying (gRPC)
- Better performance for frequently accessed data

**Alternatives Considered**:
- Using events to populate cache (over-complex for MVP)
- Publishing query events (not idiomatic)

---

### 8. Backward Compatibility with Existing Services

**Question**: How can the new gRPC API coexist with the existing REST API and loader service?

**Research Summary**:
- Existing api-service may have other endpoints
- Loader service maintains data freshness in ClickHouse
- gRPC and REST can run on different ports in same service
- Protocol buffers provide versioning strategy for API changes

**Decision**: 
- gRPC service runs alongside existing services on separate port (default: 50051)
- Both query the same ClickHouse database
- No changes to loader service (it continues feeding data)
- Future: REST endpoints can be automatically generated from proto definitions

**Rationale**:
- Minimal disruption to existing code
- Clear separation of protocols
- Both can evolve independently
- Leverages existing data pipeline

**Alternatives Considered**:
- Replace REST entirely (risky, may break existing clients)
- Copy data between services (duplication, complexity)

---

## Summary of Decisions

| Decision | Approach | Rationale |
|----------|----------|-----------|
| RPC Style | Unary calls with pagination | Simple, stateless, performant |
| Field Selection | FieldMask pattern | Standard, type-safe |
| Pagination | Page numbers + tokens | Balance of simplicity and scalability |
| Filtering | Structured FilterCondition messages | Type-safe, extensible |
| Error Handling | Standard gRPC status codes | Clear semantics, widely understood |
| Data Access | Direct ClickHouse queries | Read-only; no event involvement needed |
| Deployment | Separate gRPC port in api-service | Non-disruptive, clean separation |

---

## Technical Dependencies Confirmed

- **Go 1.25.3**: Already in use; no version change needed
- **gRPC**: Stable; widely used
- **Protocol Buffers**: Mature; compiler available
- **ClickHouse**: Already project database
- **Existing entities**: Champion, Item, Rune can be reused

---

## Risk Assessment

**Low Risk**:
- Using standard gRPC patterns
- Protocol Buffers are mature
- ClickHouse queries are simple reads
- No changes to data ingestion pipeline

**Mitigation**:
- Follow gRPC best practices
- Comprehensive testing via quickstart scenarios
- Validate filter/sort inputs strictly

---

## Next Steps

Phase 0 research complete. All technical unknowns resolved. Ready to proceed to Phase 1 (Design & Contracts).

