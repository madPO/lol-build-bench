# API Contract: Game Data Webserver

This webserver exposes a hybrid REST-GraphQL API. It uses standard RESTful paths for resource identification but accepts a `query` parameter that allows clients to use GraphQL selection sets to filter exactly which fields they want in the response.

## Base URL
`/api/{version}`

*Note: `{version}` corresponds to the DataDragon patch version (e.g., `16.1.2`).*

## Endpoints

### 1. Champions

#### List Champions
`GET /api/{version}/champions`

**Query Parameters**:
- `query` (optional, string): A GraphQL selection set. Example: `{ id name title stats { hp mp } }`. If omitted, all default fields are returned.

**Response** (200 OK):
```json
{
  "data": {
    "champions": [
      {
        "id": "Aatrox",
        "key": "266",
        "name": "Aatrox",
        "title": "the Darkin Blade",
        "image": "Aatrox.png",
        "avatarUrl": "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Aatrox.png",
        "tags": ["Fighter", "Tank"],
        "stats": { "hp": 650, "mp": 0, "armor": 38 }
      }
    ]
  }
}
```

#### Get Single Champion
`GET /api/{version}/champions/{id}`

**Query Parameters**:
- `query` (optional, string): A GraphQL selection set. Example: `{ id name }`.

**Response** (200 OK):
```json
{
  "data": {
    "champion": {
      "id": "Aatrox",
      "key": "266",
      "name": "Aatrox",
      "avatarUrl": "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Aatrox.png"
    }
  }
}
```

---

### 2. Items

#### List Items
`GET /api/{version}/items`

**Query Parameters**:
- `query` (optional, string): GraphQL selection set. Example: `{ id name gold { total } }`.

**Response** (200 OK):
```json
{
  "data": {
    "items": [
      {
        "id": "1001",
        "name": "Boots",
        "description": "Increases Move Speed",
        "image": "1001.png",
        "tags": ["Boots"],
        "gold": { "base": 300, "total": 300, "sell": 210, "purchasable": true }
      }
    ]
  }
}
```

#### Get Single Item
`GET /api/{version}/items/{id}`

**Query Parameters**:
- `query` (optional, string): GraphQL selection set.

**Response** (200 OK):
```json
{
  "data": {
    "item": {
      "id": "1001",
      "name": "Boots",
      "gold": { "total": 300, "purchasable": true }
    }
  }
}
```

---

### 3. Runes & Rune Branches

#### List Rune Branches
`GET /api/{version}/rune-branches`

**Query Parameters**:
- `query` (optional, string): GraphQL selection set.

**Response** (200 OK):
```json
{
  "data": {
    "runeBranches": [
      {
        "id": "8100",
        "name": "Domination",
        "iconUrl": "perk-images/Styles/7200_Domination.png",
        "color": "#ff0000"
      }
    ]
  }
}
```

#### List Runes (by Branch)
`GET /api/{version}/runes`

**Query Parameters**:
- `query` (optional, string): GraphQL selection set. Example: `{ id branchId name tier }`.

**Response** (200 OK):
```json
{
  "data": {
    "runes": [
      {
        "id": "8112",
        "branchId": "8100",
        "name": "Electrocute",
        "description": "Hitting a champion with 3 separate attacks or abilities in 3s deals bonus adaptive damage.",
        "iconUrl": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
        "tier": 0
      }

## Error Handling

Errors return standard HTTP status codes along with a JSON body indicating the error:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"unknownField\" on type \"Champion\"."
    }
  ]
}
```
