# Data Model: Game Entities

The following models represent the core game entities returned by the webserver, fetching exactly the fields required by the Qwik frontend from the ClickHouse database.

## 1. Champion

Represents a playable character in the game. Matches `Champion` interface in the frontend.

**Fields**:
- `id` (String): The unique identifier for the champion (e.g., "Aatrox").
- `key` (String): The numeric key as a string (e.g., "266").
- `name` (String): The localized name of the champion.
- `title` (String): The champion's title.
- `image` (String): The primary image name/path.
- `avatarUrl` (String): The URL to the champion's avatar image.
- `tags` (Array of Strings): Roles associated with the champion (e.g., `["Fighter", "Tank"]`).
- `stats` (Object): Base statistics matching `ChampionStats` (hp, hpperlevel, mp, mpperlevel, armor, armorperlevel, spellblock, spellblockperlevel, attackdamage, attackdamageperlevel, attackspeed, attackspeedperlevel, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, movespeed, attackrange).

## 2. Item

Represents an in-game purchasable object. Matches `Item` interface in the frontend.

**Fields**:
- `id` (String): The unique identifier (item code) (e.g., "1001").
- `name` (String): The localized name of the item.
- `description` (String): HTML or plain text description of the item's effects.
- `image` (String): The primary image name/path.
- `gold` (Object): Matches `ItemGold` interface.
  - `base` (Int): Base cost.
  - `total` (Int): Total cost.
  - `sell` (Int): Sell value.
  - `purchasable` (Boolean): Whether it can be bought.
- `tags` (Array of Strings): Categories.
- `stats` (Object): Modifiers the item provides (`ItemStats`).

## 3. Rune Branch

Represents a rune path or tree (e.g., Precision, Domination).

**Fields**:
- `id` (String): The unique identifier for the branch.
- `name` (String): The localized name of the branch.
- `iconUrl` (String): The URL to the branch's icon.
- `color` (String, Optional): The hex color associated with the branch.

## 4. Rune

Represents a specific customizable gameplay modifier within a branch. Matches `Rune` interface in the frontend.

**Fields**:
- `id` (String): The unique identifier for the rune.
- `branchId` (String): The ID of the parent Rune Branch.
- `name` (String): The localized name of the rune.
- `description` (String): HTML or plain text description of the rune's effects.
- `iconUrl` (String): The URL to the rune's icon.
- `tier` (Int): The tier or row the rune occupies within the branch (0 for keystone, 1-3 for secondary).
