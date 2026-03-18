# Data Model: Champion Build Planner UI

**Feature**: `001-champion-build-ui` | **Date**: 2026-03-18

## Overview

All data in this feature is client-side only. Static game data (champions, items, runes) is bundled as JSON at build time from Riot Data Dragon. Application state (selected build) lives in reactive stores during the session and is not persisted.

This document defines two categories per the constitution's Data/Transformation/Action principle:
1. **Static Data** — immutable game data loaded at startup (Data layer)
2. **Application State** — mutable session state managed by Qwik stores (Data layer, mutated by Actions)

---

## Static Data Entities

### Champion

Represents a playable character with base stats.

| Field | Type | Description | Source (DDragon) |
|-------|------|-------------|------------------|
| `id` | `string` | Unique string key (e.g., `"Aatrox"`) | `champion.data[key].id` |
| `key` | `string` | Numeric ID as string (e.g., `"266"`) | `champion.data[key].key` |
| `name` | `string` | Display name | `champion.data[key].name` |
| `title` | `string` | Champion title | `champion.data[key].title` |
| `image` | `string` | Icon filename (e.g., `"Aatrox.png"`) | `champion.data[key].image.full` |
| `tags` | `string[]` | Role tags (e.g., `["Fighter", "Tank"]`) | `champion.data[key].tags` |
| `partype` | `string` | Resource type (`"Mana"`, `"Energy"`, etc.) | `champion.data[key].partype` |
| `stats` | `ChampionStats` | Base stats + per-level growth | `champion.data[key].stats` |

### ChampionStats

Base stats and per-level growth values for a champion.

| Field | Type | Description |
|-------|------|-------------|
| `hp` | `number` | Base health |
| `hpperlevel` | `number` | Health growth per level |
| `mp` | `number` | Base mana/energy |
| `mpperlevel` | `number` | Mana growth per level |
| `armor` | `number` | Base armor |
| `armorperlevel` | `number` | Armor growth per level |
| `spellblock` | `number` | Base magic resistance |
| `spellblockperlevel` | `number` | MR growth per level |
| `attackdamage` | `number` | Base attack damage |
| `attackdamageperlevel` | `number` | AD growth per level |
| `attackspeed` | `number` | Base attack speed |
| `attackspeedperlevel` | `number` | AS growth per level (percentage) |
| `hpregen` | `number` | Base HP regen per 5s |
| `hpregenperlevel` | `number` | HP regen growth per level |
| `mpregen` | `number` | Base mana regen per 5s |
| `mpregenperlevel` | `number` | Mana regen growth per level |
| `crit` | `number` | Base crit chance |
| `critperlevel` | `number` | Crit growth per level |
| `movespeed` | `number` | Base movement speed |
| `attackrange` | `number` | Base attack range |

**Stat-at-level formula**: `base + growth * (level - 1) * (0.7025 + 0.0175 * (level - 1))`

### Item

Represents an equipment piece that can be added to inventory.

| Field | Type | Description | Source (DDragon) |
|-------|------|-------------|------------------|
| `id` | `string` | Numeric ID as string (e.g., `"3153"`) | Object key in `item.data` |
| `name` | `string` | Display name | `item.data[id].name` |
| `description` | `string` | Plain text description | `item.data[id].plaintext` |
| `image` | `string` | Icon filename (e.g., `"3153.png"`) | `item.data[id].image.full` |
| `gold` | `ItemGold` | Gold cost breakdown | `item.data[id].gold` |
| `stats` | `ItemStats` | Stat modifiers | `item.data[id].stats` |
| `tags` | `string[]` | Category tags (e.g., `["Damage", "CriticalStrike"]`) | `item.data[id].tags` |
| `from` | `string[]` | Component item IDs | `item.data[id].from` |
| `into` | `string[]` | Items this builds into | `item.data[id].into` |
| `purchasable` | `boolean` | Whether item can be purchased | `item.data[id].gold.purchasable` |
| `maps` | `Record<string, boolean>` | Map availability | `item.data[id].maps` |

### ItemGold

| Field | Type | Description |
|-------|------|-------------|
| `base` | `number` | Recipe cost |
| `total` | `number` | Total cost including components |
| `sell` | `number` | Sell-back value |
| `purchasable` | `boolean` | Whether directly purchasable |

### ItemStats

Flat key-value pairs representing stat modifiers. Keys use DDragon naming convention.

| Key Pattern | Type | Example | Maps To |
|-------------|------|---------|---------|
| `FlatHPPoolMod` | `number` | `300` | +300 HP |
| `FlatMPPoolMod` | `number` | `250` | +250 Mana |
| `FlatPhysicalDamageMod` | `number` | `55` | +55 AD |
| `FlatMagicDamageMod` | `number` | `80` | +80 AP |
| `FlatArmorMod` | `number` | `45` | +45 Armor |
| `FlatSpellBlockMod` | `number` | `40` | +40 MR |
| `PercentAttackSpeedMod` | `number` | `0.25` | +25% AS |
| `FlatMovementSpeedMod` | `number` | `25` | +25 MS |
| `PercentMovementSpeedMod` | `number` | `0.05` | +5% MS |
| `FlatCritChanceMod` | `number` | `0.2` | +20% Crit |
| `PercentLifeStealMod` | `number` | `0.10` | +10% Life Steal |

**Aggregation rules**: `Flat*` stats sum together. `Percent*` stats multiply together.

### RuneTree

Represents a rune path (e.g., Precision, Domination).

| Field | Type | Description | Source (DDragon) |
|-------|------|-------------|------------------|
| `id` | `number` | Tree numeric ID | `runesReforged[i].id` |
| `key` | `string` | Tree key (e.g., `"Domination"`) | `runesReforged[i].key` |
| `name` | `string` | Display name | `runesReforged[i].name` |
| `icon` | `string` | Tree icon path | `runesReforged[i].icon` |
| `slots` | `RuneSlot[]` | 4 slots: keystone + 3 minor rows | `runesReforged[i].slots` |

### RuneSlot

| Field | Type | Description |
|-------|------|-------------|
| `runes` | `Rune[]` | 3-4 rune choices for this slot |

### Rune

| Field | Type | Description | Source (DDragon) |
|-------|------|-------------|------------------|
| `id` | `number` | Rune numeric ID | `slots[j].runes[k].id` |
| `key` | `string` | Rune key (e.g., `"Electrocute"`) | `slots[j].runes[k].key` |
| `name` | `string` | Display name | `slots[j].runes[k].name` |
| `icon` | `string` | Rune icon path | `slots[j].runes[k].icon` |
| `shortDesc` | `string` | Short description | `slots[j].runes[k].shortDesc` |
| `longDesc` | `string` | Full description | `slots[j].runes[k].longDesc` |

---

## Application State Entities

### BuildState

The root state object managed by Qwik context. Mutable during session, not persisted.

| Field | Type | Description |
|-------|------|-------------|
| `selectedChampion` | `Champion \| null` | Currently selected champion, or null if none |
| `inventory` | `(Item \| null)[]` | Array of exactly 6 slots. Each slot holds an Item or null (empty) |
| `runeConfig` | `RuneConfig` | Current rune page selections |

### RuneConfig

| Field | Type | Description |
|-------|------|-------------|
| `primaryTree` | `string \| null` | Key of primary rune tree (e.g., `"Domination"`) |
| `keystone` | `number \| null` | ID of selected keystone rune |
| `primarySlots` | `(number \| null)[]` | Array of 3 selected minor rune IDs from primary tree |
| `secondaryTree` | `string \| null` | Key of secondary rune tree |
| `secondarySlots` | `(number \| null)[]` | Array of 2 selected minor rune IDs from secondary tree |

**Validation rules**:
- `inventory` array length is always exactly 6
- `primaryTree` and `secondaryTree` must be different trees
- `keystone` must belong to `primaryTree` slot 0
- `primarySlots` entries must each belong to a different slot (1, 2, 3) of `primaryTree`
- `secondarySlots` entries must belong to different slots of `secondaryTree` (any 2 of slots 1, 2, 3)

---

## Derived Data (Transformations)

These are computed values produced by pure functions from the state above. They are not stored entities — they are recalculated on every state change.

### ComputedStats

Result of applying item and rune modifiers to champion base stats.

| Field | Type | Description |
|-------|------|-------------|
| `hp` | `number` | Total HP (base + items) |
| `armor` | `number` | Total armor |
| `spellblock` | `number` | Total MR |
| `attackdamage` | `number` | Total AD |
| `attackspeed` | `number` | Total AS |
| `movespeed` | `number` | Total MS |
| *(other stats)* | `number` | Same pattern for all stat types |

### ChartDataPoint

A single point on the stat-over-gold chart.

| Field | Type | Description |
|-------|------|-------------|
| `cumulativeGold` | `number` | Total gold spent up to and including this item |
| `stats` | `Record<string, number>` | Stat values at this gold point |

### ChartSeries

Data structure for the full chart, consumed by uPlot.

| Field | Type | Description |
|-------|------|-------------|
| `goldValues` | `number[]` | X-axis: cumulative gold at each item addition (starts at 0 for base stats) |
| `statSeries` | `Record<string, number[]>` | Y-axis series: each key is a stat name, value is array of stat values at each gold point |

---

## Entity Relationships

```
Champion (1) ──selected──> BuildState (1)
Item (0..6) ──inventory──> BuildState (1)
RuneTree (2) ──runeConfig──> BuildState (1)
Rune (1..5) ──runeConfig──> BuildState (1)

BuildState ──transforms──> ComputedStats
BuildState ──transforms──> ChartSeries
```

## Data Volume

| Entity | Approximate Count | Approx Size (pruned JSON) |
|--------|-------------------|---------------------------|
| Champions | ~170 | ~150 KB |
| Items | ~250 (purchasable on SR) | ~200 KB |
| Rune Trees | 5 | ~15 KB |
| Runes | ~63 | (included in trees) |
| **Total bundled** | | **~365 KB** (~120 KB gzipped) |
