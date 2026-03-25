# Data Model

## Entities

### `AppFooterConfig` (Client-side Data)
A readonly configuration object that stores the dynamic values needed by the application footer.

**Fields:**
- `copyrightYear` (`number`): The current year, generated dynamically at runtime (e.g., `new Date().getFullYear()`).
- `githubUrl` (`string`): The URL pointing to the project's GitHub repository. Hardcoded as a constant variable.
- `gamePatch` (`string`): The current League of Legends game patch string (e.g., `"14.7"`). Hardcoded as a constant variable.

**Validation Rules:**
- `githubUrl` MUST be a valid URL string.
- `gamePatch` MUST NOT be empty.

**Relationships:**
- None. This is a standalone configuration data object.

## Configuration Schemas

### Constants File (`src/app/config/constants.ts`)
- `GITHUB_REPO_URL`: URL to the github repo.
- `LOL_GAME_PATCH`: Target League of Legends game patch.
