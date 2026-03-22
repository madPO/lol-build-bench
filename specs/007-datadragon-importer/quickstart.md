# Quickstart: DataDragon Importer CLI

## Prerequisites

1. Go 1.21 or higher installed.
2. A running ClickHouse instance (accessible locally or via network).
3. A DataDragon `.zip` file (e.g., `dragontail-14.5.1.zip`). Test data is available in the repository root at `.example/dragontail-14.5.1.zip`.

## Build

From the repository root, run:

```bash
go build -o bin/import-cli ./cmd/import-cli
```

## Run

Execute the tool by passing the path to the DataDragon zip file. The tool will automatically extract the version (e.g., `14.5.1`) from the filename.

```bash
# Basic run with default local ClickHouse settings
./bin/import-cli .example/dragontail-14.5.1.zip

# Run with custom database parameters
./bin/import-cli --db-host=192.168.1.100:9000 --db-user=admin --db-password=secret .example/dragontail-14.5.1.zip
```

## Output

The tool will stream logs indicating progress and completion summaries.

```text
INFO: Extracted version 14.5.1 from path
INFO: Connecting to ClickHouse at localhost:9000...
INFO: Connected successfully.
INFO: Parsing champions...
INFO: Inserted 167 champions.
INFO: Parsing items...
INFO: Inserted 215 items.
INFO: Parsing runes...
INFO: Inserted 65 runes.
SUCCESS: Import complete.
```
