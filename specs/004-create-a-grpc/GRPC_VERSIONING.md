# gRPC API Patch Versioning Guide

**Date**: 2025-12-19

## Overview

This guide explains how to use patch versions with the gRPC Query Service and addresses the question: **"Can I send patch versions in the URL for querying gRPC?"**

## Short Answer

**For pure gRPC (binary protocol)**: No, patch versions are sent in the request body as a `patch_version` field, not in the URL.

**For gRPC-JSON transcoding**: Yes, patch versions can be in the URL path using a REST-like convention.

This document explains both approaches and their trade-offs.

---

## Method 1: Standard gRPC (Request Body)

### How It Works

The standard gRPC approach sends all parameters in the Protocol Buffer request message, including `patch_version`.

**Proto Definition**:
```protobuf
message QueryChampionsRequest {
  repeated FilterCondition filters = 1;
  SortSpec sort = 2;
  PaginationRequest page = 3;
  google.protobuf.FieldMask fields = 4;
  string patch_version = 5;  // Patch version in request body
}
```

**Example Request** (gRPC client):
```go
response, err := client.QueryChampions(ctx, &QueryChampionsRequest{
  PatchVersion: "14.1",
  Filters: [...],
})
```

**Example Request** (using grpcurl):
```bash
grpcurl -plaintext \
  -d '{"patch_version": "14.1", "filters": [...]}' \
  localhost:50051 query.QueryService/QueryChampions
```

### Pros
- ✅ Standard gRPC approach
- ✅ Works with all gRPC clients (Go, Python, JavaScript, etc.)
- ✅ Consistent with other query parameters (filters, sort, pagination)
- ✅ No special URL parsing needed
- ✅ Binary protocol benefits (smaller payloads, faster parsing)

### Cons
- ❌ No URL path component
- ❌ Requires deserialization to read patch version
- ❌ Less visible in HTTP request logs

---

## Method 2: gRPC-JSON Transcoding (URL Path)

### How It Works

gRPC-JSON transcoding allows exposing gRPC services as HTTP/JSON REST APIs with URL path parameters.

**Extended Proto Definition** (with HTTP transcoding rules):
```protobuf
import "google/api/annotations.proto";

service QueryService {
  rpc QueryChampions(QueryChampionsRequest) returns (QueryChampionsResponse) {
    option (google.api.http) = {
      get: "/v1/patches/{patch_version}/champions"
    };
  }
  
  rpc QueryItems(QueryItemsRequest) returns (QueryItemsResponse) {
    option (google.api.http) = {
      get: "/v1/patches/{patch_version}/items"
    };
  }
  
  rpc QueryRunes(QueryRunesRequest) returns (QueryRunesResponse) {
    option (google.api.http) = {
      get: "/v1/patches/{patch_version}/runes"
    };
  }
}
```

**Example URL Requests**:
```
GET /v1/patches/14.1/champions?roleFilter=Mage&pageSize=10
GET /v1/patches/14.1/items?priceFilter=<1000&pageSize=20
GET /v1/patches/14.1/runes?treeFilter=Precision
```

**HTTP Response** (same Proto message, JSON encoded):
```json
{
  "champions": [...],
  "pagination": {...},
  "totalCount": 24,
  "patchVersion": "14.1"
}
```

### Pros
- ✅ URL path parameters visible in HTTP requests
- ✅ RESTful convention (familiar to HTTP developers)
- ✅ Works with standard HTTP tools (curl, browsers)
- ✅ Better for HTTP request logging/monitoring
- ✅ Query parameters map naturally: `filters` → `?roleFilter=Mage`

### Cons
- ❌ Requires gRPC gateway/transcoding middleware
- ❌ JSON serialization (larger payloads than binary gRPC)
- ❌ Slower parsing than binary Protocol Buffers
- ❌ Adds operational complexity
- ❌ Not available to native gRPC clients by default

---

## Recommended Approach

### For LoL Build Bench Project

**Use Method 1 (Standard gRPC with body field)** because:

1. **Already implemented**: Proto definition includes `patch_version` in request body
2. **Simplicity**: No middleware needed, works with standard gRPC tooling
3. **Performance**: Binary Protocol Buffers faster than JSON
4. **Consistency**: Other parameters (filters, sort) use same body approach
5. **Go native**: Project uses Go; gRPC is first-class citizen

**If REST/HTTP access is needed later**:
- Add gRPC gateway middleware (express-gateway or envoy)
- Transcoding rules define URL path patterns
- Backend remains pure gRPC
- Minimal configuration change

---

## Implementation Examples

### Example 1: Query Champions for Patch 14.1 (gRPC)

**Proto Message**:
```protobuf
message QueryChampionsRequest {
  string patch_version = 5;
  // ... other fields
}
```

**Client Code (Go)**:
```go
ctx := context.Background()
conn, _ := grpc.Dial("localhost:50051", grpc.WithInsecure())
defer conn.Close()

client := query.NewQueryServiceClient(conn)

response, err := client.QueryChampions(ctx, &query.QueryChampionsRequest{
  PatchVersion: "14.1",
  Page: &query.PaginationRequest{PageSize: 20},
})

if err != nil {
  log.Fatal(err)
}

fmt.Printf("Found %d champions in patch %s\n", 
  len(response.Champions), response.PatchVersion)
```

**Client Code (JavaScript/Node)**:
```javascript
const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');

const packageDef = loader.loadSync('./query.proto', {
  keepCase: true,
  longs: String,
  defaults: true,
});

const queryProto = grpc.loadPackageDefinition(packageDef);
const client = new queryProto.query.QueryService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

client.queryChampions({
  patch_version: '14.1',
  page: { page_size: 20 }
}, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Found ${response.champions.length} champions in patch ${response.patch_version}`);
});
```

### Example 2: Query Items for Multiple Patches (gRPC)

```go
patches := []string{"14.1", "14.2", "14.3"}

for _, patch := range patches {
  response, _ := client.QueryItems(ctx, &query.QueryItemsRequest{
    PatchVersion: patch,
    Filters: []*query.FilterCondition{
      {Field: "price", Operator: "lt", Value: "1000"},
    },
  })
  
  fmt.Printf("Patch %s: %d items under 1000g\n", 
    patch, len(response.Items))
}
```

### Example 3: If Future REST Support Needed (gRPC-JSON Gateway)

**With transcoding rules added to proto**:
```bash
# URL path approach becomes available:
curl "http://localhost:8080/v1/patches/14.1/champions?roleFilter=Mage"

# But backend remains pure gRPC:
# grpc://localhost:50051/query.QueryService/QueryChampions
```

---

## Database Schema Considerations

### Storing Patch Versions

To support patch-specific queries, the ClickHouse database needs to store patch versions:

**Schema Example**:
```sql
CREATE TABLE champions (
  id String,
  name String,
  patch_version String,
  role String,
  difficulty Int32,
  stats JSON,
  event_id String,
  timestamp DateTime,
  -- ... other fields
  
  PRIMARY KEY (patch_version, id, event_id, timestamp)
) ENGINE = ReplacingMergeTree()
```

**Query with Patch Filter**:
```sql
SELECT * FROM champions 
WHERE patch_version = '14.1' 
  AND role = 'Mage'
ORDER BY name ASC
LIMIT 10
```

---

## Versioning Strategy Summary

| Aspect | Standard gRPC | gRPC-JSON Gateway |
|--------|--------------|-------------------|
| **Transport** | HTTP/2 binary | HTTP/1.1 or HTTP/2 JSON |
| **Patch version location** | Request body | URL path or query param |
| **Example** | `{patch_version: "14.1"}` | `/v1/patches/14.1/champions` |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Complexity** | Low | Medium |
| **Recommended for MVP** | ✅ Yes | Later enhancement |

---

## Migration Path (If REST Support Needed)

1. **Current State**: gRPC service with `patch_version` in request body
2. **Phase 1 (MVP)**: Use standard gRPC clients
3. **Phase 2 (Future)**: Add gRPC gateway middleware
4. **Phase 3**: Expose HTTP/JSON endpoints with URL paths
5. **Phase 4**: Deprecate REST if needed; keep gRPC as primary

No changes to gRPC service code needed for steps 1-2.

---

## Conclusion

**Can you send patch versions in URLs for gRPC?**

- ✅ **Yes, if using gRPC-JSON transcoding** (requires gateway middleware)
- ✅ **Yes, if converting to REST** (via gRPC gateway)
- ✅ **Standard way: Send in request body** (works out-of-box with all gRPC clients)

**For this project**: Use the request body approach now. Add URL path support later if REST/HTTP clients are needed.

