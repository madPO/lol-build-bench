# AGENTS.md - Development Guidelines

## Project Overview
LoL Build Bench is a web application for generating and testing League of Legends champion builds. The project uses:
- **Backend**: Go 1.25.3 with event-driven architecture (CloudEvent pattern)
- **Frontend**: Qwik JS with TypeScript, PostCSS, and Vite
- **Database**: ClickHouse
- **Architecture**: Event-driven with CloudEvent pattern for all data changes

## Build/Test/Lint Commands

### Backend Services
```bash
# Build services
cd src/backend && go build ./app/api-service
cd src/backend && go build ./app/loader-service

# Run services  
cd src/backend && go run ./app/api-service/main.go
cd src/backend && go run ./app/loader-service/main.go

# Generate protobuf from API contracts
./scripts/generate-proto.sh
```

### Frontend (Qwik JS)
```bash
# Navigate to frontend directory
cd src/frontend

# Install dependencies
pnpm install

# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Database
```bash
# Start ClickHouse database
docker-compose -f deployments/docker/docker-compose.yml up

# Create database tables from scratch
# Connect to ClickHouse and run: scripts/database.sql
# This script creates the complete database structure:
# - patches: CloudEvent metadata for patches
# - items: League of Legends item data for Summoner's Rift (map ID 11)
# - runes: League of Legends rune data
# - champions: League of Legends champion data with CloudEvent structure
```

### Testing Policy
```bash
# No tests during MVP phase (per project constitution)
# Focus on rapid development and feature delivery
# Code serves as documentation during MVP phase
```

## Project Structure
```
src/
├── backend/
│   ├── app/
│   │   ├── api-service/        # API server entry point
│   │   └── loader-service/     # Data loading service entry point
│   ├── entities/               # Data structures and pure functions (no side effects)
│   ├── features/               # Business logic with side effects (use case implementations)
│   └── services/               # gRPC service implementations
├── frontend/                   # Qwik JS frontend
│   ├── components/             # Reusable components
│   ├── pages/                  # Page-level components
│   └── styles/                 # PostCSS styles
specs/                          # Feature specifications
deployments/                    # Docker and deployment configs
scripts/                        # Utility scripts
api/                           # gRPC API contract definitions (.proto files)
```

## Code Style Guidelines
- **Language**: Go 1.25.3, follow standard Go conventions
- **Frontend**: Qwik JS with TypeScript, follow Qwik conventions
- **Architecture**: Event-driven with CloudEvent pattern for all data changes
- **Structure**: 
  - Backend: entities/ (data only), features/ (business logic), services/ (external interfaces)
  - Frontend: components/, pages/, styles/
- **Imports**: Standard library first, then third-party, then local packages
- **Naming**: Use Go conventions (PascalCase for exported, camelCase for unexported)
- **Error Handling**: Return errors explicitly, use structured logging
- **Dependencies**: ClickHouse for database, gRPC for services, always use latest versions
- **No Tests**: MVP development phase excludes tests per project constitution. Focus on rapid feature delivery with code as documentation.

## Development Workflow
1. Create feature branch: `feature/[task-number]`
2. Develop in `next` branch
3. Merge to `stable` for releases
4. Follow event-driven architecture for data changes
5. Use CloudEvent pattern for all data modifications
