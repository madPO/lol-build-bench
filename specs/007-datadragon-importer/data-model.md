# Data Model: DataDragon Importer

The data model follows the Constitution's mandate for Event-Driven Persistence (CloudEvents) and clear separation of Domain Data.

## Domain Entities (Go Structs)

These represent the internal business objects after raw DataDragon JSON has been parsed and transformed.

### Champion
- `ID` (string): The internal champion ID (e.g., "Aatrox").
- `Key` (int): The numeric key for the champion.
- `Name` (string): The display name.
- `Title` (string): The champion's title.
- `Tags` ([]string): Roles (e.g., "Fighter", "Tank").
- `Stats` (ChampionStats): Base combat stats.
- `Version` (string): The game patch version this data belongs to.

### ChampionStats
- `HP` (float64)
- `HPPerLevel` (float64)
- `MP` (float64)
- `MPPerLevel` (float64)
- `MoveSpeed` (float64)
- `Armor` (float64)
- `ArmorPerLevel` (float64)
- `SpellBlock` (float64)
- `SpellBlockPerLevel` (float64)
- `AttackRange` (float64)
- `HPRegen` (float64)
- `HPRegenPerLevel` (float64)
- `MPRegen` (float64)
- `MPRegenPerLevel` (float64)
- `Crit` (float64)
- `CritPerLevel` (float64)
- `AttackDamage` (float64)
- `AttackDamagePerLevel` (float64)
- `AttackSpeedPerLevel` (float64)
- `AttackSpeed` (float64)

### Item
- `ID` (string): The numeric string ID of the item.
- `Name` (string): Display name.
- `Description` (string): Item description.
- `Plaintext` (string): Short description.
- `Gold` (ItemGold): Cost and purchasing rules.
- `Stats` (map[string]float64): Stat modifiers provided by the item.
- `Version` (string): Game patch version.

### ItemGold
- `Base` (int)
- `Purchasable` (bool)
- `Total` (int)
- `Sell` (int)

### Rune (Reforged)
- `ID` (int): Rune numeric ID.
- `Key` (string): String key.
- `Icon` (string): Path to icon.
- `Name` (string): Display name.
- `ShortDesc` (string): Short description.
- `LongDesc` (string): Detailed description.
- `TreeID` (int): ID of the parent tree (e.g., Precision, Domination).
- `Version` (string): Game patch version.

## State Changes (CloudEvents)

All imports generate events that are sent to the database.

### `lolbench.datadragon.champion.imported`
- **Data Payload**: `Champion` entity.
- **Trigger**: Emitted when a champion is successfully parsed from the DataDragon JSON.

### `lolbench.datadragon.item.imported`
- **Data Payload**: `Item` entity.
- **Trigger**: Emitted when an item is successfully parsed.

### `lolbench.datadragon.rune.imported`
- **Data Payload**: `Rune` entity.
- **Trigger**: Emitted when a rune is successfully parsed.

## Database Strategy (ClickHouse)

Tables will likely utilize `ReplacingMergeTree` ordered by `(ID, Version)` to handle the upsert requirements outlined in User Story 3. This allows seamless updates of data for the same version, and keeps older versions intact if needed, or allows collapsing them down.
