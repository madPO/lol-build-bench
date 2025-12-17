# AGENTS.md - Development Guidelines

## Build/Test/Lint Commands
```bash
# Build services
cd src/backend && go build ./app/api-service
cd src/backend && go build ./app/loader-service

# Run services  
cd src/backend && go run ./app/api-service/main.go
cd src/backend && go run ./app/loader-service/main.go

# Generate protobuf
./scripts/generate-proto.sh

# Database setup
docker-compose -f deployments/docker/docker-compose.yml up

# Create database tables
# Connect to ClickHouse and run: scripts/database.sql

# No tests during MVP phase (per constitution)
```

## Code Style Guidelines
- **Language**: Go 1.25.3, follow standard Go conventions
- **Architecture**: Event-driven with CloudEvent pattern for all data changes
- **Structure**: entities/ (data only), features/ (business logic), services/ (external interfaces)
- **Imports**: Standard library first, then third-party, then local packages
- **Naming**: Use Go conventions (PascalCase for exported, camelCase for unexported)
- **Error Handling**: Return errors explicitly, use structured logging
- **Dependencies**: ClickHouse for database, gRPC for services, always use latest versions
- **No Tests**: MVP development phase excludes tests per project constitution

## Recent Changes
- **2025-12-15**: Added champions uploader feature (003-champions-upload)
  - New entities: entities/champion/champion.go, entities/champion/createChampionEvent.go
  - New features: features/champion/importFromFile.go, features/champion/championQueue.go
  - Database: champions table with ReplacingMergeTree engine
  - Pattern: Reads individual JSON files (one per champion) from directory structure and loads to ClickHouse
  - File path: basePath/patchId/data/language/champions/ (one JSON file per champion)
- **2025-12-14**: Added runes uploader feature (002-runes-uploader)
  - New entities: entities/rune/rune.go, entities/rune/createRuneEvent.go (planned)
  - New features: features/rune/importFromFile.go, features/rune/runeQueue.go (planned)
  - Database: runes table with ReplacingMergeTree engine (planned)
  - Pattern: Mirrors item uploader, reads from JSON and loads to ClickHouse
- **2025-12-14**: Added items uploader feature (001-create-a-items)
  - New entities: entities/item/item.go, entities/item/createItemEvent.go
  - New features: features/item/importFromFile.go, features/item/itemQueue.go
  - Database: items table with ReplacingMergeTree engine
  - Pattern: Mirrors patch uploader, filters to map ID 11 (Summoner's Rift)
