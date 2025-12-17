# Research for Runes Uploader Feature

## Decision: Performance Goals
- **Decision**: No specific performance targets for upload speed or data volume are required.
- **Rationale**: The user has indicated that data count is not too much and the load occurs only once a month. This implies that high-performance, low-latency processing is not a critical requirement for this feature.
- **Alternatives considered**: Implementing complex queuing or batch processing mechanisms for high-volume data, which was deemed unnecessary given the low frequency and volume of uploads.

## Decision: Scale/Scope
- **Decision**: The expected volume of rune data is low, and uploads will occur approximately once a month.
- **Rationale**: User input directly states "Data count is not too much. And load is one of month". This simplifies the design considerations for scalability and resource allocation.
- **Alternatives considered**: Designing for high-frequency, high-volume data ingestion, which would introduce unnecessary complexity and overhead.

## Decision: CLI per library
- **Decision**: No specific CLIs are currently identified or required for existing libraries in the context of this feature.
- **Rationale**: The existing project structure (backend services) does not indicate a strong need for separate CLIs for each library. The interaction will likely be through the loader service.
- **Alternatives considered**: Developing dedicated CLIs for each library, which would add development overhead without clear immediate benefit.

## Decision: BUILD increments on every change?
- **Decision**: BUILD increments on every change should be handled by the existing CI/CD pipeline, if one exists. If not, a manual incrementation will be followed for now.
- **Rationale**: This is a general project-level concern rather than feature-specific. Adhering to existing project practices or establishing a simple manual process for MVP is appropriate.
- **Alternatives considered**: Implementing a custom build versioning system within the feature, which is outside the scope of a single feature.

## Decision: Breaking changes handled?
- **Decision**: Breaking changes will be handled by following standard Go module versioning practices (semantic versioning) and communicating changes to dependent services. For the MVP, direct coordination with dependent services will be sufficient.
- **Rationale**: This aligns with standard Go development practices and the project's current MVP phase, where formal breaking change management might be overkill.
- **Alternatives considered**: Implementing a more robust breaking change management system (e.g., API versioning, backward compatibility layers), which is not necessary for the current project stage.

## Decision: ClickHouse connection failure handling
- **Decision**: The system should implement retry mechanisms for transient ClickHouse connection errors. For persistent errors, the upload process should fail gracefully, log the error, and alert administrators.
- **Rationale**: Transient errors are common in distributed systems and should be handled automatically to ensure resilience. Persistent errors require human intervention, so clear logging and alerting are crucial.
- **Alternatives considered**: Immediately failing on any ClickHouse error (poor user experience for transient issues) or endlessly retrying (resource exhaustion for persistent issues).

## Decision: Rune Data File Format
- **Decision**: The rune data will be read from a JSON file with the structure exemplified by `runesReforged.json`.
- **Rationale**: The user provided `runesReforged.json` as an example, indicating this is the expected input format. This provides a concrete structure for parsing and validation.
- **Alternatives considered**: Supporting multiple data formats (e.g., XML, CSV), which would add unnecessary complexity for the current requirements.
