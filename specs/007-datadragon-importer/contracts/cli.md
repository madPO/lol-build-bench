# Contracts: DataDragon Importer CLI

As a CLI tool, the primary contract is the command-line interface and the expected exit codes.

## CLI Usage

```bash
import-cli [OPTIONS] <path/to/datadragon.zip>
```

### Arguments

- `<path/to/datadragon.zip>`: (Required) Absolute or relative path to the DataDragon archive. The tool MUST extract the game version from the path or filename.

### Options

- `-h`, `--help`: Display usage information and exit.
- `--db-host`: (Optional) ClickHouse host (default: `localhost:9000`).
- `--db-user`: (Optional) ClickHouse user (default: `default`).
- `--db-password`: (Optional) ClickHouse password (default: empty).
- `--db-name`: (Optional) ClickHouse database name (default: `lol_build_bench`).

### Exit Codes

- `0`: Success. All available entities extracted and imported.
- `1`: Invalid arguments or missing required file path.
- `2`: File not found or not a valid ZIP archive.
- `3`: Database connection or insertion failure.
- `4`: Critical parsing error (e.g., malformed JSON making progress impossible, though missing files should only log a warning and continue, returning `0` if partial success).
