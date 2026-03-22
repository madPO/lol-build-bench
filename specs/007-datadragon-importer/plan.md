# Implementation Plan: DataDragon Importer CLI

**Branch**: `007-datadragon-importer` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-datadragon-importer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

A Go CLI tool that parses League of Legends game data (champions, items, runes, stats) directly from local DataDragon `.zip` files and batch inserts them into a ClickHouse database. The tool is offline, uses memory-efficient stream parsing for JSON inside the zip archive, enforces versioning derived from the file path, and follows the Data/Transformation/Action constitutional pattern along with CloudEvents data models.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Go 1.21+
**Primary Dependencies**: `clickhouse-go/v2`, `cloudevents/sdk-go`
**Storage**: ClickHouse
**Testing**: standard `testing` package
**Target Platform**: Cross-platform CLI binary (Linux/macOS)
**Project Type**: CLI Tool
**Performance Goals**: Process ~50MB data archive in under 30 seconds
**Constraints**: Offline processing, minimal memory footprint (streaming JSON)
**Scale/Scope**: ~170 champions, ~200 items, ~70 runes per version

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]
- [x] Dual-stack boundary respected (no frontend/BFF code mixed in)
- [x] Code categorized as Data, Transformation, or Action
- [x] State changes expressed as CloudEvents; persistence is event-driven
- [x] No circular dependencies; modules have single responsibility
- [x] Feature delivers smallest viable slice (MVP-first)
- [x] Frontend architecture strictly follows Feature-Sliced Design (N/A - backend only)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Single project (DEFAULT)
cmd/
└── import-cli/
    └── main.go                 # Entrypoint: sets up DI, CLI flags, kicks off Actions
internal/
├── actions/                    # USE CASES (Orchestration)
│   ├── import_champions.go     # Coordinates reading zip -> transforming -> sending CloudEvent
│   ├── import_items.go
│   └── import_runes.go
├── data/                       # REPOSITORIES (I/O, DB, Filesystem)
│   ├── clickhouse/             # ClickHouse specific implementations (inserts)
│   │   ├── client.go           # clickhouse-go setup
│   │   └── repository.go       # Batch insertion logic
│   └── datadragon/             # Zip/JSON streaming logic (the example above lives here)
│       ├── zip_reader.go
│       └── models.go           # Raw DataDragon JSON structs
├── transformation/             # DOMAIN LOGIC (Pure functions, mapping)
│   ├── mapper.go               # Maps DataDragon JSON structs to Domain Entities
│   └── cloudevent_factory.go   # Wraps Domain Entities into CloudEvent envelopes
└── domain/                     # CORE MODELS
    └── models.go               # The pristine structs (Champion, Item, Stats) used by the API
```

**Structure Decision**: Selected the Single Project layout following standard Go project layout (`cmd/` and `internal/`). The `internal/` package is strictly separated into `domain` (Data), `transformation` (Transformations), and `actions` (Actions) and `data` (I/O and Repositories) to comply with Constitution Principle II: Data, Transformation, Actions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
