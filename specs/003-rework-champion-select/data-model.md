# Data Model: Champion

## Entities

### `Champion`
Represents a playable character in the game, used across the selection modal and the stats display UI.

**Fields**:
- `id` (string, required): Unique identifier for the champion (e.g., "Aatrox", "Ahri").
- `name` (string, required): Display name used in the tooltips inside the modal.
- `avatarUrl` (string, required): A relative or absolute path to the champion's avatar image.
- `stats` (object, required): A key-value mapping of base statistics to display on the UI.
  - `health` (number, optional)
  - `healthRegen` (number, optional)
  - `mana` (number, optional)
  - `manaRegen` (number, optional)
  - `armor` (number, optional)
  - `magicResistance` (number, optional)
  - `attackDamage` (number, optional)
  - `movementSpeed` (number, optional)
  - *Other standard game stats as keys.*

## Validation Rules
- `id` must be unique across the entire champion collection.
- `name` cannot be empty.
- `avatarUrl` should point to a valid image format.
- If a specific stat is missing from `stats`, the UI should fallback to a default (e.g., `0`, `N/A`, or `-`).

## State Transitions (UI Only)
- `Unselected` -> `Selected`: Happens when a user clicks a champion in the modal list. The active build state records the selected champion's `id`.
- `Selected (A)` -> `Selected (B)`: Overwrites the current active champion state with the new champion's `id`.