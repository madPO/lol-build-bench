# Quickstart: gRPC Query Service

**Feature**: Create a gRPC API  
**Date**: 2025-12-19  
**Status**: Complete

## Overview

This quickstart demonstrates how to interact with the gRPC Query Service to retrieve League of Legends game data. All scenarios use the `grpcurl` command-line tool for easy testing.

## Prerequisites

1. **Service Running**: Ensure the gRPC Query Service is running on `localhost:50051`
2. **grpcurl Installed**: Download from [github.com/fullstorydev/grpcurl](https://github.com/fullstorydev/grpcurl)
3. **Proto Files**: Query service proto files available at `api/proto/query.proto`

## Quick Service Health Check

Before running scenarios, verify the service is available:

```bash
grpcurl -plaintext localhost:50051 list query.QueryService
```

Expected output:
```
query.QueryService.GetChampion
query.QueryService.ListChampions
query.QueryService.ListItems
query.QueryService.ListRunes
```

---

## Scenario 1: Get Champion Details

**User Story**: As a developer, I want to retrieve detailed information about a specific champion.

**Request**:
```bash
grpcurl -plaintext \
  -d '{"champion_id": "Ahri"}' \
  localhost:50051 query.QueryService/GetChampion
```

**Expected Response**:
```json
{
  "champion": {
    "id": "Ahri",
    "name": "Ahri",
    "title": "the Nine-Tailed Fox",
    "icon": "ahri.png",
    "role": "Mage",
    "difficulty": 2,
    "stats": {
      "health": 490,
      "mana": 418,
      "armor": 20.88,
      "attackdamage": 52.72
    }
  },
  "found": true
}
```

**Success Criteria**:
- ✅ Response received without error
- ✅ Champion fields populated correctly
- ✅ found = true
- ✅ Response time < 100ms

**Failure Case - Non-existent Champion**:
```bash
grpcurl -plaintext \
  -d '{"champion_id": "InvalidChampion"}' \
  localhost:50051 query.QueryService/GetChampion
```

**Expected Error**:
```
Code: NOT_FOUND
Message: Champion InvalidChampion not found
```

---

## Scenario 2: Query Champions for Specific Patch

**User Story**: As a developer, I want to query champions for a specific League of Legends patch version.

**Request - Query champions for patch 14.1**:
```bash
grpcurl -plaintext \
  -d '{
    "patch_version": "14.1",
    "page": {"page_size": 5, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Response**:
```json
{
  "champions": [
    {
      "id": "Aatrox",
      "name": "Aatrox",
      "title": "the Darkin Blade",
      "role": "Fighter",
      "difficulty": 1
    },
    // ... 4 more champions
  ],
  "pagination": {
    "total_count": 170,
    "page_size": 5,
    "current_page": 1,
    "has_next": true
  },
  "patch_version": "14.1"
}
```

**Success Criteria**:
- ✅ Response includes `patch_version` field matching request
- ✅ Data returned is for patch 14.1
- ✅ All other query features (pagination, filters) work with patch versions

**Query Different Patches**:
```bash
# Patch 14.2
grpcurl -plaintext \
  -d '{"patch_version": "14.2"}' \
  localhost:50051 query.QueryService/QueryChampions

# Patch 14.3
grpcurl -plaintext \
  -d '{"patch_version": "14.3"}' \
  localhost:50051 query.QueryService/QueryChampions

# Latest patch (omit patch_version)
grpcurl -plaintext \
  -d '{}' \
  localhost:50051 query.QueryService/QueryChampions
```

---

## Scenario 3: Query All Champions with Pagination

**User Story**: As a developer, I want to query all champions with pagination (for current/latest patch).

**Request**:
```bash
grpcurl -plaintext \
  -d '{"page": {"page_size": 5, "page_number": 1}}' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Response** (first 5 champions):
```json
{
  "champions": [
    {
      "id": "Aatrox",
      "name": "Aatrox",
      "title": "the Darkin Blade",
      "role": "Fighter",
      "difficulty": 1
    },
    {
      "id": "Ahri",
      "name": "Ahri",
      "title": "the Nine-Tailed Fox",
      "role": "Mage",
      "difficulty": 2
    },
    // ... 3 more champions
  ],
  "pagination": {
    "total_count": 170,
    "page_size": 5,
    "current_page": 1,
    "has_next": true,
    "next_token": "page_2_token"
  },
  "total_count": 170
}
```

**Success Criteria**:
- ✅ Response includes paginated results
- ✅ Page size matches request (5 items)
- ✅ total_count = total champions
- ✅ has_next = true (more pages available)
- ✅ next_token provided for fetching page 2

**Get Next Page**:
```bash
grpcurl -plaintext \
  -d '{"page": {"page_size": 5, "page_token": "page_2_token"}}' \
  localhost:50051 query.QueryService/QueryChampions
```

---

## Scenario 4: Filter Champions by Role

**User Story**: As a developer, I want to filter champions by role to find all Mages.

**Request - Query all Mages**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "role", "operator": "eq", "value": "Mage"}
    ],
    "page": {"page_size": 10, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Response**:
```json
{
  "champions": [
    {
      "id": "Ahri",
      "name": "Ahri",
      "role": "Mage"
    },
    {
      "id": "Annie",
      "name": "Annie",
      "role": "Mage"
    },
    // ... more Mages
  ],
  "pagination": {
    "total_count": 24,
    "page_size": 10,
    "current_page": 1,
    "has_next": true
  },
  "total_count": 24
}
```

**Success Criteria**:
- ✅ All returned champions have role = "Mage"
- ✅ total_count = number of Mages (24)
- ✅ Result is subset of all champions

**Multiple Filters - Mages with Difficulty >= 2**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "role", "operator": "eq", "value": "Mage"},
      {"field": "difficulty", "operator": "gte", "value": "2"}
    ],
    "page": {"page_size": 20, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

---

## Scenario 5: Sort Champions by Name

**User Story**: As a developer, I want to retrieve champions sorted alphabetically by name.

**Request - Champions sorted A-Z**:
```bash
grpcurl -plaintext \
  -d '{
    "sort": {"field": "name", "order": "asc"},
    "page": {"page_size": 5, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Response** (alphabetically first):
```json
{
  "champions": [
    {"id": "Aatrox", "name": "Aatrox"},
    {"id": "Ahri", "name": "Ahri"},
    {"id": "Akali", "name": "Akali"},
    {"id": "Akshan", "name": "Akshan"},
    {"id": "Alistar", "name": "Alistar"}
  ],
  "total_count": 170
}
```

**Success Criteria**:
- ✅ Champions returned in alphabetical order (A before B before C)
- ✅ Reverse sort works: `order: "desc"` gives Z-A

---

## Scenario 6: Field Selection (GraphQL-like)

**User Story**: As a developer, I want to request only specific fields to reduce payload size.

**Request - Only name and role fields**:
```bash
grpcurl -plaintext \
  -d '{
    "page": {"page_size": 3, "page_number": 1},
    "fields": {
      "paths": ["name", "role"]
    }
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Response** (only selected fields):
```json
{
  "champions": [
    {
      "name": "Aatrox",
      "role": "Fighter"
    },
    {
      "name": "Ahri",
      "role": "Mage"
    },
    {
      "name": "Akali",
      "role": "Assassin"
    }
  ],
  "pagination": {
    "total_count": 170,
    "page_size": 3,
    "current_page": 1,
    "has_next": true
  }
}
```

**Success Criteria**:
- ✅ Response contains ONLY requested fields (name, role)
- ✅ Other fields (id, title, stats, etc.) are absent
- ✅ Response payload significantly smaller

---

## Scenario 7: Query Items with Price Filter

**User Story**: As a developer, I want to find affordable items (under 1000 gold).

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "price", "operator": "lt", "value": "1000"}
    ],
    "sort": {"field": "price", "order": "asc"},
    "page": {"page_size": 10, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryItems
```

**Expected Response** (items under 1000 gold, sorted by price):
```json
{
  "items": [
    {
      "id": "1001",
      "name": "Health Potion",
      "price": 50
    },
    {
      "id": "1002",
      "name": "Mana Potion",
      "price": 40
    },
    {
      "id": "1003",
      "name": "Boots",
      "price": 300
    }
    // ... more items under 1000 gold
  ],
  "pagination": {
    "total_count": 45,
    "page_size": 10,
    "current_page": 1
  }
}
```

**Success Criteria**:
- ✅ All items have price < 1000
- ✅ Items sorted by price ascending
- ✅ total_count = number of items under 1000

---

## Scenario 8: Query Runes by Tree

**User Story**: As a developer, I want to find all runes from the Precision tree.

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "primary_tree", "operator": "eq", "value": "Precision"}
    ],
    "page": {"page_size": 20, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryRunes
```

**Expected Response**:
```json
{
  "runes": [
    {
      "id": "r1",
      "name": "Fleet Footwork",
      "primary_tree": "Precision",
      "keystone": true
    },
    {
      "id": "r2",
      "name": "Lethal Tempo",
      "primary_tree": "Precision",
      "keystone": true
    }
    // ... more Precision runes
  ],
  "pagination": {
    "total_count": 12,
    "page_size": 20,
    "current_page": 1,
    "has_next": false
  }
}
```

**Success Criteria**:
- ✅ All returned runes have primary_tree = "Precision"
- ✅ total_count reflects Precision runes only

---

## Scenario 9: Combined Query - Complex Filter + Sort + Pagination + Field Selection

**User Story**: As a developer, I want a complex query that filters items by category, sorts them, paginates, and selects only specific fields.

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "categories", "operator": "in", "value": "Attack,Damage"}
    ],
    "sort": {"field": "name", "order": "asc"},
    "page": {"page_size": 15, "page_number": 1},
    "fields": {
      "paths": ["name", "price", "categories"]
    }
  }' \
  localhost:50051 query.QueryService/QueryItems
```

**Expected Response**:
```json
{
  "items": [
    {
      "name": "Bloodthirster",
      "price": 3600,
      "categories": ["Attack", "Damage"]
    },
    {
      "name": "Infinity Edge",
      "price": 3400,
      "categories": ["Attack", "Damage"]
    }
    // ... more Attack/Damage items, sorted by name
  ],
  "pagination": {
    "total_count": 32,
    "page_size": 15,
    "current_page": 1,
    "has_next": true,
    "next_token": "page_2"
  }
}
```

**Success Criteria**:
- ✅ All filters applied (only Attack OR Damage categories)
- ✅ Results sorted alphabetically by name
- ✅ Pagination applied (15 items per page)
- ✅ Only requested fields returned (name, price, categories)

---

## Error Scenarios

### Invalid Filter Field

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "filters": [
      {"field": "invalid_field", "operator": "eq", "value": "test"}
    ]
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Error**:
```
Code: INVALID_ARGUMENT
Message: Unknown filter field: invalid_field
```

---

### Invalid Page Size

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "page": {"page_size": 500, "page_number": 1}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Error**:
```
Code: INVALID_ARGUMENT
Message: page_size must be 1-100
```

---

### Invalid Sort Field

**Request**:
```bash
grpcurl -plaintext \
  -d '{
    "sort": {"field": "invalid_sort", "order": "asc"}
  }' \
  localhost:50051 query.QueryService/QueryChampions
```

**Expected Error**:
```
Code: INVALID_ARGUMENT
Message: Cannot sort by: invalid_sort
```

---

## Testing Checklist

Use this checklist when validating the gRPC service implementation:

- [ ] **Scenario 1**: GetChampion returns champion data
- [ ] **Scenario 1**: GetChampion returns NOT_FOUND for invalid ID
- [ ] **Scenario 2**: ListChampions returns paginated results
- [ ] **Scenario 2**: Pagination tokens work for next pages
- [ ] **Scenario 3**: Filter by role returns only matching champions
- [ ] **Scenario 3**: Multiple filters are AND'ed together
- [ ] **Scenario 4**: Sort ascending works alphabetically
- [ ] **Scenario 4**: Sort descending works in reverse
- [ ] **Scenario 5**: Field selection returns only requested fields
- [ ] **Scenario 5**: Unselected fields are absent from response
- [ ] **Scenario 6**: Items filtered by price correctly
- [ ] **Scenario 6**: Items sorted by numeric price field
- [ ] **Scenario 7**: Runes filtered by tree correctly
- [ ] **Scenario 8**: Complex query with all features works
- [ ] **Error 1**: Invalid filter field returns INVALID_ARGUMENT
- [ ] **Error 2**: Invalid page size returns INVALID_ARGUMENT
- [ ] **Error 3**: Invalid sort field returns INVALID_ARGUMENT
- [ ] **Performance**: GetChampion response < 100ms
- [ ] **Performance**: ListChampions response < 500ms

---

## Next Steps

After validating all scenarios:
1. Run the full test suite (via `/tasks command when available)
2. Deploy to staging environment
3. Run performance benchmarks
4. Document any observed limitations or edge cases

