# Feature Specification: DataDragon Importer CLI

**Feature Branch**: `007-datadragon-importer`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "lets create a first golang application. Its a cli tool to import data from datadragon to our database in clickhouse. Datadragon files also downloaded, dont download this zip file. Cli tool need a path to zip archive wirh data. Import all about champions, runes, items and then stats. All datadragon files in `.example` dirr. A small documentation in https://developer.riotgames.com/docs/lol. Use classicgolang project structure in root of repository."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Full Data Import (Priority: P1)

As a system operator, I need to provide a local archive of game data to the CLI tool so that it parses and stores champions, runes, items, and stats into the database without requiring internet downloads.

**Why this priority**: This is the core functionality. Without the ability to ingest the static game data from local files, downstream systems will lack the necessary reference data to function.

**Independent Test**: Can be fully tested by providing a valid `.zip` archive containing game data and verifying that the database is populated with the correct counts of champions, runes, items, and stats.

**Acceptance Scenarios**:

1. **Given** a valid game data ZIP archive is present on the local filesystem, **When** the operator runs the CLI tool with the path to the archive, **Then** the tool extracts, parses, and successfully saves all entities (champions, runes, items, stats) to the database, outputting a success message with record counts.

---

### User Story 2 - Missing or Invalid File Handling (Priority: P2)

As a system operator, I need the tool to fail safely and informatively if I provide a bad file path or an invalid file, so that I can quickly correct my command and avoid corrupting the database.

**Why this priority**: Operator error is common. Clear feedback prevents confusion and ensures data integrity by preventing partial or erroneous imports.

**Independent Test**: Can be tested by running the tool with a non-existent file path or a file that is not a valid ZIP archive, verifying that it exits safely with a descriptive error.

**Acceptance Scenarios**:

1. **Given** the CLI tool is executed, **When** no file path argument is provided, **Then** the tool immediately exits and displays usage instructions.
2. **Given** the CLI tool is executed, **When** the provided file path does not exist, **Then** the tool outputs a "file not found" error and exits without modifying the database.
3. **Given** the CLI tool is executed, **When** the provided file is not a valid ZIP archive, **Then** the tool outputs an "invalid format" error and exits without modifying the database.

---

### User Story 3 - Handling Existing Data (Priority: P3)

As a system operator, I need to know what happens if I run the importer when data already exists, so that I can update game data without duplicating records.

**Why this priority**: Game data is updated frequently (e.g., new patches). The tool must handle updates gracefully.

**Independent Test**: Can be tested by running the tool twice with the same (or slightly updated) archive and verifying no duplicate entries are created.

**Acceptance Scenarios**:

1. **Given** the database already contains champion data for a specific version, **When** the operator runs the tool with an archive of the same version, **Then** the system MUST update existing records without creating duplicates.
2. **Given** the operator runs the tool with an archive, **When** the tool processes the archive, **Then** it MUST extract the version from the file path/name to use for versioning the imported data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST operate as a Command Line Interface (CLI) application.
- **FR-002**: The system MUST accept a local file path to a ZIP archive as a required command-line argument.
- **FR-003**: The system MUST NOT attempt to download the data archive from external network sources.
- **FR-004**: The system MUST extract and parse Champion entity data from the provided archive.
- **FR-005**: The system MUST extract and parse Rune entity data from the provided archive.
- **FR-006**: The system MUST extract and parse Item entity data from the provided archive.
- **FR-007**: The system MUST extract and parse Stat entity data from the provided archive.
- **FR-008**: The system MUST extract the game version from the provided archive file path.
- **FR-009**: The system MUST version all imported data using the extracted version string.
- **FR-010**: The system MUST update existing database records if data for the extracted version already exists, ensuring no duplication.
- **FR-011**: The system MUST output progress and completion summaries (including row counts and imported version) to the standard output.
- **FR-012**: The system MUST safely handle database connection failures by aborting the process and logging the error.

### Assumptions & Constraints

- **AC-001**: The target destination is assumed to be the project's configured analytical database.
- **AC-002**: The tool will be implemented as a standalone, compiled command-line interface application.
- **AC-003**: The source code will follow the standard project layout conventions for the language at the repository root.
- **AC-004**: Default path for testing data is assumed to be the `.example` directory.

### Key Entities

- **Champion**: Represents a playable character in the game, including identifiers, stats, and metadata.
- **Rune**: Represents selectable gameplay modifiers and paths.
- **Item**: Represents purchasable in-game equipment, including cost and provided stats.
- **Stat**: Represents game statistics configurations related to entities.

## Edge Cases

- What happens if the database connection drops halfway through the import process?
- What happens if the ZIP file is extremely large (e.g., exceeds available RAM)?
- What happens if the target database tables do not exist before running the tool?
- What happens if the archive is missing one of the expected internal JSON files (e.g., items file is missing)?

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Champions, Runes, Items, and Stats present in a valid standard archive are successfully stored in the target database.
- **SC-002**: The tool processes and imports a standard-sized data archive (typically under 50MB) in less than 30 seconds.
- **SC-003**: The tool operates entirely offline, generating 0 external network requests during execution.
- **SC-004**: In the event of an invalid file path or format, the tool returns a non-zero exit code and an error message in under 1 second.
