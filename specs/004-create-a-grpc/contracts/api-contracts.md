# API Contracts: gRPC Query Service

**Feature**: Create a gRPC API  
**Date**: 2025-12-19  
**Status**: Complete

## Service Definition

**Service Name**: `QueryService`  
**Protocol**: gRPC (Protocol Buffers 3)  
**Port**: 50051 (default)

---

## Patch Version Support

**How to Specify Patch Version**:

All query methods (`QueryChampions`, `QueryItems`, `QueryRunes`) support optional `patch_version` field in their requests. This allows clients to retrieve data for specific League of Legends patches.

**Format**: Patch version as string (e.g., "14.1", "14.2", "13.24")

**Behavior**:
- If `patch_version` is omitted or empty: Returns current/latest patch data
- If `patch_version` is specified: Returns data for that specific patch
- Response includes the `patch_version` field indicating which patch data was returned

**Example**:
```json
{
  "filters": [...],
  "patch_version": "14.1"
}
```

**Error Scenarios**:
- Invalid patch version format → gRPC status: `INVALID_ARGUMENT` with message "Invalid patch version format"
- Patch version not found in database → gRPC status: `NOT_FOUND` with message "Patch {version} not found"

**Note on URL Query Parameters**:
While gRPC uses Protocol Buffers for serialization (not URL parameters), if using gRPC-JSON transcoding or HTTP/JSON APIs, the patch version can be passed as:
- URL path: `/v1/patches/{patch_version}/champions` (recommended)
- Query parameter: `?patchVersion=14.1`
- Request body field (default): `{"patch_version": "14.1"}`

The request body field approach (used in this proto definition) is the standard gRPC method and works across all gRPC clients and transports.

---

## RPC Methods

### 1. GetChampion

**Purpose**: Retrieve a single champion by ID with field selection.

**Request**:
```
message GetChampionRequest {
  string champion_id = 1;              // Required: Champion ID
  google.protobuf.FieldMask fields = 2;  // Optional: Fields to include
}
```

**Response**:
```
message GetChampionResponse {
  Champion champion = 1;  // Champion data with selected fields
  bool found = 2;         // Whether champion was found
}
```

**Success Criteria**:
- Response HTTP status: 200 OK (when champion exists)
- Response body contains champion with selected fields only
- All selected fields contain valid data
- Response time < 100ms

**Error Scenarios**:
- Champion ID not found → gRPC status: `NOT_FOUND` with message "Champion {id} not found"
- Invalid champion ID format → gRPC status: `INVALID_ARGUMENT` with message "Invalid champion ID format"
- Invalid field names in FieldMask → gRPC status: `INVALID_ARGUMENT` with message "Unknown fields: [list]"

**Example Request**:
```json
{
  "champion_id": "Ahri",
  "fields": {
    "paths": ["name", "role", "stats"]
  }
}
```

**Example Response**:
```json
{
  "champion": {
    "name": "Ahri",
    "role": "Mage",
    "stats": {
      "health": 490,
      "mana": 418,
      "armor": 20
    }
  },
  "found": true
}
```

---

### 2. QueryChampions

**Purpose**: Query champions with filtering, sorting, and pagination. Supports patch version specification.

**Request**:
```
message QueryChampionsRequest {
  repeated FilterCondition filters = 1;   // Optional: Filter conditions
  SortSpec sort = 2;                      // Optional: Sort specification
  PaginationRequest page = 3;             // Optional: Pagination parameters
  google.protobuf.FieldMask fields = 4;   // Optional: Field selection
  string patch_version = 5;               // Optional: Patch version (e.g., "14.1", "14.2")
}
```

**Response**:
```
message QueryChampionsResponse {
  repeated Champion champions = 1;        // List of champions
  PaginationResponse pagination = 2;      // Pagination metadata
  int64 total_count = 3;                  // Total champions matching filters
  string patch_version = 4;               // Patch version of returned data
}
```

**Success Criteria**:
- Response HTTP status: 200 OK
- Response contains array of champions (may be empty)
- Pagination metadata includes total_count, page_size, has_next
- Filtered results respect all filter conditions
- Results sorted according to sort specification
- Response limited to page_size (default 20, max 100)
- Response time < 500ms for typical queries

**Error Scenarios**:
- Invalid filter field → gRPC status: `INVALID_ARGUMENT` with message "Unknown filter field: {field}"
- Invalid filter operator → gRPC status: `INVALID_ARGUMENT` with message "Invalid operator: {op}"
- Invalid sort field → gRPC status: `INVALID_ARGUMENT` with message "Cannot sort by: {field}"
- Invalid page_size → gRPC status: `INVALID_ARGUMENT` with message "page_size must be 1-100"
- Invalid page token → gRPC status: `INVALID_ARGUMENT` with message "Invalid page token"

**Example Request - Query Mages for Patch 14.1**:
```json
{
  "filters": [
    {
      "field": "role",
      "operator": "eq",
      "value": "Mage"
    }
  ],
  "sort": {
    "field": "name",
    "order": "asc"
  },
  "page": {
    "page_size": 10,
    "page_number": 1
  },
  "fields": {
    "paths": ["name", "role"]
  },
  "patch_version": "14.1"
}
```

**Example Response**:
```json
{
  "champions": [
    {"name": "Ahri", "role": "Mage"},
    {"name": "Annie", "role": "Mage"},
    {"name": "Brand", "role": "Mage"}
  ],
  "pagination": {
    "total_count": 24,
    "page_size": 10,
    "current_page": 1,
    "has_next": true,
    "next_token": "token_page_2"
  },
  "total_count": 24,
  "patch_version": "14.1"
}
```

---

### 3. QueryItems

**Purpose**: Query items with filtering, sorting, and pagination. Supports patch version specification.

**Request**:
```
message QueryItemsRequest {
  repeated FilterCondition filters = 1;   // Optional: Filter conditions
  SortSpec sort = 2;                      // Optional: Sort specification
  PaginationRequest page = 3;             // Optional: Pagination parameters
  google.protobuf.FieldMask fields = 4;   // Optional: Field selection
  string patch_version = 5;               // Optional: Patch version (e.g., "14.1", "14.2")
}
```

**Response**:
```
message QueryItemsResponse {
  repeated Item items = 1;                // List of items
  PaginationResponse pagination = 2;      // Pagination metadata
  int64 total_count = 3;                  // Total items matching filters
  string patch_version = 4;               // Patch version of returned data
}
```

**Success Criteria**:
- Response HTTP status: 200 OK
- Response contains array of items (may be empty)
- Pagination metadata includes total_count, page_size, has_next
- Filtered results respect all filter conditions
- Results sorted according to sort specification
- Response limited to page_size (default 20, max 100)
- Response time < 500ms for typical queries

**Error Scenarios**:
- Invalid filter field → gRPC status: `INVALID_ARGUMENT` with message "Unknown filter field: {field}"
- Invalid filter operator → gRPC status: `INVALID_ARGUMENT` with message "Invalid operator: {op}"
- Invalid sort field → gRPC status: `INVALID_ARGUMENT` with message "Cannot sort by: {field}"
- Invalid page_size → gRPC status: `INVALID_ARGUMENT` with message "page_size must be 1-100"
- Invalid page token → gRPC status: `INVALID_ARGUMENT` with message "Invalid page token"

**Example Request - Query Items Under 1000 Gold for Patch 14.1**:
```json
{
  "filters": [
    {
      "field": "price",
      "operator": "lt",
      "value": "1000"
    }
  ],
  "sort": {
    "field": "price",
    "order": "asc"
  },
  "page": {
    "page_size": 20,
    "page_number": 1
  },
  "fields": {
    "paths": ["name", "price"]
  },
  "patch_version": "14.1"
}
```

**Example Response**:
```json
{
  "items": [
    {"name": "Health Potion", "price": 50},
    {"name": "Mana Potion", "price": 40},
    {"name": "Boots", "price": 300}
  ],
  "pagination": {
    "total_count": 45,
    "page_size": 20,
    "current_page": 1,
    "has_next": true,
    "next_token": "token_page_2"
  },
  "total_count": 45,
  "patch_version": "14.1"
}
```

---

### 4. QueryRunes

**Purpose**: Query runes with filtering, sorting, and pagination. Supports patch version specification.

**Request**:
```
message QueryRunesRequest {
  repeated FilterCondition filters = 1;   // Optional: Filter conditions
  SortSpec sort = 2;                      // Optional: Sort specification
  PaginationRequest page = 3;             // Optional: Pagination parameters
  google.protobuf.FieldMask fields = 4;   // Optional: Field selection
  string patch_version = 5;               // Optional: Patch version (e.g., "14.1", "14.2")
}
```

**Response**:
```
message QueryRunesResponse {
  repeated Rune runes = 1;                // List of runes
  PaginationResponse pagination = 2;      // Pagination metadata
  int64 total_count = 3;                  // Total runes matching filters
  string patch_version = 4;               // Patch version of returned data
}
```

**Success Criteria**:
- Response HTTP status: 200 OK
- Response contains array of runes (may be empty)
- Pagination metadata includes total_count, page_size, has_next
- Filtered results respect all filter conditions
- Results sorted according to sort specification
- Response limited to page_size (default 20, max 100)
- Response time < 500ms for typical queries

**Error Scenarios**:
- Invalid filter field → gRPC status: `INVALID_ARGUMENT` with message "Unknown filter field: {field}"
- Invalid filter operator → gRPC status: `INVALID_ARGUMENT` with message "Invalid operator: {op}"
- Invalid sort field → gRPC status: `INVALID_ARGUMENT` with message "Cannot sort by: {field}"
- Invalid page_size → gRPC status: `INVALID_ARGUMENT` with message "page_size must be 1-100"
- Invalid page token → gRPC status: `INVALID_ARGUMENT` with message "Invalid page token"

**Example Request - Query Precision Keystones for Patch 14.1**:
```json
{
  "filters": [
    {
      "field": "primary_tree",
      "operator": "eq",
      "value": "Precision"
    },
    {
      "field": "keystone",
      "operator": "eq",
      "value": "true"
    }
  ],
  "page": {
    "page_size": 50,
    "page_number": 1
  },
  "fields": {
    "paths": ["name", "description"]
  },
  "patch_version": "14.1"
}
```

**Example Response**:
```json
{
  "runes": [
    {
      "name": "Fleet Footwork",
      "description": "Gain movement speed when moving toward enemies..."
    },
    {
      "name": "Press the Attack",
      "description": "Hitting an enemy with 3 separate attacks..."
    }
  ],
  "pagination": {
    "total_count": 4,
    "page_size": 50,
    "current_page": 1,
    "has_next": false,
    "next_token": ""
  },
  "total_count": 4,
  "patch_version": "14.1"
}
```

---

## Common Message Types

### FilterCondition

```
message FilterCondition {
  string field = 1;       // Field name to filter on
  string operator = 2;    // Operator: eq, ne, gt, gte, lt, lte, in, contains
  string value = 3;       // Value to filter by
}
```

**Valid Operators by Field Type**:
- Numeric (price, difficulty): eq, ne, gt, gte, lt, lte
- String (name, role): eq, ne, contains, in
- Boolean (keystone): eq, ne

---

### SortSpec

```
message SortSpec {
  string field = 1;    // Field to sort by
  string order = 2;    // "asc" or "desc"
}
```

---

### PaginationRequest

```
message PaginationRequest {
  int32 page_size = 1;      // Results per page (1-100, default 20)
  string page_token = 2;    // Continuation token
  int32 page_number = 3;    // Alternative: page number
}
```

---

### PaginationResponse

```
message PaginationResponse {
  int64 total_count = 1;    // Total results
  int32 page_size = 2;      // Current page size
  int32 current_page = 3;   // Current page number
  string next_token = 4;    // Token for next page
  bool has_next = 5;        // Whether next page exists
}
```

---

## Error Response Format

All gRPC errors follow standard format:

```
{
  "code": "INVALID_ARGUMENT|NOT_FOUND|INTERNAL|...",
  "message": "Human-readable error message",
  "details": "Optional detailed error context"
}
```

**Example Error Response**:
```json
{
  "code": "NOT_FOUND",
  "message": "Champion Ahri not found",
  "details": "Champion with ID 'Ahri' does not exist in database"
}
```

---

## HTTP/2 Status Code Mapping

| gRPC Code | HTTP Status | Meaning |
|-----------|-------------|---------|
| OK | 200 | Request succeeded |
| INVALID_ARGUMENT | 400 | Invalid request parameters |
| NOT_FOUND | 404 | Resource not found |
| INTERNAL | 500 | Internal server error |
| UNAVAILABLE | 503 | Service temporarily unavailable |

---

## Contract Testing Checklist

**For Each Endpoint**:
- [ ] Valid request with required fields returns success
- [ ] Missing required fields returns INVALID_ARGUMENT
- [ ] Invalid filter field returns INVALID_ARGUMENT
- [ ] Invalid sort field returns INVALID_ARGUMENT
- [ ] Invalid page_size returns INVALID_ARGUMENT
- [ ] Non-existent resource returns NOT_FOUND (GetChampion)
- [ ] Empty filter list returns all records
- [ ] Multiple filters are ANDed together
- [ ] Pagination tokens work correctly
- [ ] Field selection returns only selected fields
- [ ] Response times are acceptable (<100ms for get, <500ms for list)

