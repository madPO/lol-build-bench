# Phase 0: Research & Clarifications

## Technical Context Unknowns Resolved

- **Language/Version**: Go (latest stable, expected >= 1.21)
- **Primary Dependencies**: 
  - `github.com/ClickHouse/clickhouse-go/v2` (for native high-performance DB interaction)
  - standard library `archive/zip` and `encoding/json` (for streaming data)
  - `github.com/cloudevents/sdk-go/v2` (for CloudEvents structuring, if needed beyond custom structs)
- **Storage**: ClickHouse
- **Testing**: standard `testing` package (though testing may be deferred per Constitution)
- **Target Platform**: CLI binary (cross-platform, primarily targeting Linux/macOS operator environments)
- **Project Type**: CLI Tool
- **Performance Goals**: Process ~50MB data archive in under 30 seconds
- **Constraints**: Offline processing (no external downloads during run), minimal memory footprint (streaming JSON parser)

## Architecture Decisions

### 1. ClickHouse Driver
- **Decision**: `clickhouse-go/v2` via Native API.
- **Rationale**: Provides native protocol support and highly optimized batching (`PrepareBatch`, `AppendStruct`), which is essential for ClickHouse performance.
- **Alternatives considered**: HTTP interface (rejected due to overhead and less idiomatic Go struct mapping).

### 2. JSON Parsing from Zip
- **Decision**: Stream parsing using `archive/zip` combined with `encoding/json.Decoder`.
- **Rationale**: Memory complexity remains O(1) regardless of file size. Extracts individual tokens without loading entire files into RAM.
- **Alternatives considered**: `os.ReadFile` / `ioutil.ReadAll` (rejected due to memory constraints, though LoL data is relatively small, this future-proofs the tool).

### 3. Data Flow and Code Organization
- **Decision**: Strictly follow `Data -> Transformation -> Action` categorization. 
- **Rationale**: Mandated by Constitution Principle II. 
  - **Data**: Raw DataDragon structs (`DataDragonChampion`), Domain entities (`Champion`), and CloudEvent representations.
  - **Transformations**: Pure functions mapping raw structs -> Domain entities -> CloudEvents.
  - **Actions**: The orchestration logic opening the zip, iterating tokens, calling transformations, and batch inserting via `clickhouse-go/v2`.

### 4. Database Strategy (Upsert/Versioning)
- **Decision**: Use `ReplacingMergeTree` or handle versions as partition keys in ClickHouse. Data version is extracted from the zip path.
- **Rationale**: Matches User Story 3 requirements to allow data updates without duplicating records, utilizing ClickHouse's merge mechanisms or explicit version filtering on queries.
