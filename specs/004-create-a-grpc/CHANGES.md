# Changes Summary

**Date**: 2025-12-19  
**Branch**: `004-create-a-grpc`

## Method Name Changes

Updated all list query methods to use `Query` prefix instead of `List`:

- `ListChampions` → `QueryChampions`
- `ListItems` → `QueryItems`
- `ListRunes` → `QueryRunes`
- `GetChampion` remains unchanged (single resource retrieval)

**Rationale**: Query prefix better reflects the ability to filter, sort, and paginate results beyond simple listing.

## Patch Version Support Added

All query methods now support optional `patch_version` field:

```protobuf
message QueryChampionsRequest {
  string patch_version = 5;  // Optional patch version
  // ... other fields
}

message QueryChampionsResponse {
  string patch_version = 4;  // Returned patch version
  // ... other fields
}
```

**Usage**: Clients can specify which League of Legends patch version data to retrieve:
```json
{"patch_version": "14.1"}  // Query data for patch 14.1
{}  // Query latest patch (default behavior)
```

## Files Updated

1. **contracts/query.proto**
   - Renamed RPC methods
   - Added `patch_version` field to all request/response messages

2. **contracts/api-contracts.md**
   - Updated method documentation
   - Added patch version section with examples
   - Updated request/response examples

3. **quickstart.md**
   - Renamed test scenarios
   - Added new scenario for patch-specific queries
   - Updated all grpcurl command examples

4. **GRPC_VERSIONING.md** (New)
   - Comprehensive guide on patch versioning
   - Explains gRPC vs gRPC-JSON transcoding approaches
   - Database schema considerations
   - Migration path for future REST support

## Technical Details

### Patch Version in gRPC

**Standard gRPC Approach** (Recommended):
- Patch version sent in Protocol Buffer request body
- Works with all gRPC clients (Go, Python, JavaScript, etc.)
- Consistent with other query parameters

**gRPC-JSON Transcoding** (Future Enhancement):
- Could expose URL path like `/v1/patches/{patch_version}/champions`
- Requires gRPC gateway middleware
- Better for HTTP/REST clients

**Current Implementation**: Using standard gRPC with body field (simpler, no middleware needed)

## Database Implications

ClickHouse tables should include `patch_version` column:
```sql
CREATE TABLE champions (
  id String,
  name String,
  patch_version String,  -- NEW
  role String,
  difficulty Int32,
  stats JSON,
  PRIMARY KEY (patch_version, id, event_id, timestamp)
)
```

Queries filtered by patch version:
```sql
SELECT * FROM champions 
WHERE patch_version = '14.1' AND role = 'Mage'
```

## Backward Compatibility

- Existing code referencing `ListChampions` needs to update to `QueryChampions`
- Patch version field is optional; omitting it returns current patch data
- No breaking changes to core query functionality

## Next Steps

1. Update proto file in `api/proto/query.proto`
2. Regenerate gRPC code in Go
3. Implement query handlers with patch version filtering
4. Update ClickHouse schema to store patch versions
5. Test with quickstart scenarios
6. Deploy to staging environment

