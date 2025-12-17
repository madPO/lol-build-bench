# Data Structure Guidelines

**Version**: 1.0.0  
**Last Updated**: 2025-12-17  
**Applies To**: All entity models in LoL Build Bench backend

## Overview

This document defines the standardized approach for creating entity models in the LoL Build Bench project. Entity models are pure data structures with no business logic, following the constitutional principle of clear separation between data (entities) and behavior (features).

## 1. Entity Model Principles

### 1.1 Separation of Concerns

- **Entities**: Pure data structures (structs) with no methods
- **Features**: Business logic with side effects
- **Services**: External interfaces (gRPC, HTTP, etc.)

### 1.2 Pure Functions Only

Entity packages may contain:
- Data structure definitions (structs)
- Pure conversion functions (no side effects)
- Validation functions (pure, return bool/error)
- Serialization/deserialization helpers

**Never** include:
- Database operations
- Network calls
- File I/O
- Business logic

## 2. Directory Structure

```
src/backend/
├── entities/
│   ├── {domain}/           # Domain-specific entities
│   │   ├── {entity}.go     # Main entity definition
│   │   └── {event}.go      # Event wrapper (if needed)
│   ├── cloudEvent/         # Shared CloudEvent structures
│   └── dragontail/         # External data format mappings
└── features/
    └── {domain}/           # Business logic using entities
```

## 3. Entity Definition Template

### 3.1 Basic Entity Template

```go
// Package: entities/{domain}
// File: {entity}.go

package {domain}

import (
    "time"
    "github.com/google/uuid"
)

// {EntityName} represents a {description}
type {EntityName} struct {
    // Primary identifier (generated)
    ID uuid.UUID `json:"id"`
    
    // Business identifier (from external source)
    OID string `json:"oid"`
    
    // Display name (used as CloudEvent subject)
    Name string `json:"name"`
    
    // Reference to related entity
    RelatedID string `json:"related_id"`
    
    // Timestamps
    CreatedTime time.Time `json:"created_time"`
    UpdatedTime time.Time `json:"updated_time"` // Optional
    
    // Domain-specific fields
    MapID int32 `json:"map_id"`
    Version string `json:"version"`
    
    // Full data payload (JSON serialized)
    Data []byte `json:"data,omitempty"`
}
```

### 3.2 CloudEvent Wrapper Template

```go
// Package: entities/{domain}
// File: {event}.go

package {domain}

// {Action}{EntityName}Event wraps {EntityName} in CloudEvent structure
type {Action}{EntityName}Event struct {
    // CloudEvent metadata
    Source          string `json:"source"`
    SpecVersion     string `json:"specversion"`
    Type            string `json:"type"`
    DataContentType string `json:"datacontenttype"`
    Subject         string `json:"subject"`
    
    // Entity data
    Data {EntityName} `json:"data"`
}
```

## 4. Field Naming Conventions

### 4.1 Identifier Fields

| Field Name | Purpose | Example |
|------------|---------|---------|
| `ID` | Internal UUID (primary key) | `Item.ID` |
| `OID` | Original ID from external source | `Item.OID = "1001"` |
| `Name` | Human-readable display name | `Item.Name = "Boots of Speed"` |
| `{Entity}ID` | Foreign key reference | `Item.PatchID` |

### 4.2 Timestamp Fields

| Field Name | Purpose | Data Type |
|------------|---------|-----------|
| `CreatedTime` | When entity was created | `time.Time` |
| `UpdatedTime` | When entity was last updated | `time.Time` (optional) |
| `EffectiveTime` | When entity becomes active | `time.Time` (optional) |
| `ExpiryTime` | When entity expires | `time.Time` (optional) |

### 4.3 Domain Fields

| Field Name | Purpose | Data Type |
|------------|---------|-----------|
| `MapID` | Game map identifier | `int32` |
| `Version` | Data version | `string` |
| `IsActive` | Active status flag | `bool` |
| `Tags` | Categorization labels | `[]string` |

## 5. Pure Function Patterns

### 5.1 Event Creation Functions

```go
// Create{Action}EventFrom{EntityName} wraps entity in CloudEvent
// Pure function - no side effects
func Create{Action}EventFrom{EntityName}(entity {EntityName}) {Action}{EntityName}Event {
		  defaultEvent := cloudEvent.CreateDefaultCloudEvent({SourceEventUrl}, {SourceEventType}, "application/json", entity.Name)	    
	    
			return {Action}{EntityName}Event {
		  	CloudEvent: defaultEvent,
				OID:        {EntityOID},
				Data:       entity,
	    }
}
```

## 6. Examples by Feature Type

### 6.1 Item Entity (001-create-a-items)

```go
// Package: entities/item
// File: createItemEvent.go

package item

import (
    "time"
    "encoding/json"
    "github.com/google/uuid"
    "github.com/your-org/lol-builds/src/backend/entities/dragontail"
)

// CreateEventFromItem converts dragontail data to ItemEvent
func CreateEventFromItem(item Item, patchId string) Item {
	  defaultEvent := cloudEvent.CreateDefaultCloudEvent("https://ddragon.leagueoflegends.com", "com.leagueoflegends.ddragon.create", "application/json", item.Name)
    
    return Item{
	   	CloudEvent: defaultEvent,
			OID:        item.Name,
			PID:        patchId,
			Data:       item,
    }
}
```

---

*Based on Project Constitution v1.5.0 - Last validated: 2025-12-17*
