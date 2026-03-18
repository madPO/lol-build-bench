# UI Contracts: Champion Build Planner

**Feature**: `001-champion-build-ui` | **Date**: 2026-03-18

## Overview

This application is frontend-only with no external API. Contracts define the interfaces between UI components, shared state, and static data files. These contracts ensure components remain loosely coupled and independently testable.

---

## 1. Shared State Contract (BuildContext)

All components access build state through Qwik's context API. The context provides a single reactive store.

### Context ID

```
Context name: "app.build-state"
Type: BuildState
Provider: Page-level route component (routes/index.tsx)
Consumers: All child components
```

### BuildState Shape

```
{
  selectedChampion: Champion | null
  inventory: (Item | null)[6]         // always exactly 6 elements
  runeConfig: {
    primaryTree: string | null
    keystone: number | null
    primarySlots: (number | null)[3]   // always exactly 3 elements
    secondaryTree: string | null
    secondarySlots: (number | null)[2] // always exactly 2 elements
  }
}
```

### Mutation Rules

- Components mutate the store via direct property assignment
- No component may replace the root store reference — only mutate nested properties
- Inventory mutations: assign to `inventory[index]`, never replace the array
- Rune mutations: assign to individual fields, never replace the `runeConfig` object
- Champion mutations: assign `selectedChampion` to a new Champion object or null

---

## 2. Component Contracts

### 2.1 ChampionSelect

**Responsibility**: Browse champions, select one.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Full champion list | `Champion[]` (static import) |
| Reads | Current selection | `buildState.selectedChampion` |
| Writes | Selected champion | `buildState.selectedChampion = champion` |

**User Interactions**:
- Search/filter input: filters champion list by name
- Click champion: sets `selectedChampion`

### 2.2 ChampionStats

**Responsibility**: Display selected champion's base stats.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Current selection | `buildState.selectedChampion` |

**Display**: Shows stat name-value pairs when champion is selected. Shows placeholder when null.

### 2.3 ItemSidebar

**Responsibility**: Browse items, allow adding to inventory.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Full item list | `Item[]` (static import) |
| Reads | Current inventory | `buildState.inventory` |
| Writes | Add item to inventory | `buildState.inventory[firstEmptySlot] = item` |

**User Interactions**:
- Search/filter input: filters item list by name or tag
- Click item: adds to first empty inventory slot (if available)

**Constraints**:
- Must not add if all 6 slots are occupied
- Must indicate visually when inventory is full

### 2.4 ItemInventory

**Responsibility**: Display 6 inventory slots, allow item removal.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Current inventory | `buildState.inventory` |
| Writes | Remove item | `buildState.inventory[index] = null` |

**User Interactions**:
- Click occupied slot: removes item (sets slot to null)

**Display**: Always shows 6 slots. Empty slots visually distinct from occupied.

### 2.5 RunePage

**Responsibility**: Display rune trees, allow rune selection.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Full rune tree data | `RuneTree[]` (static import) |
| Reads | Current rune config | `buildState.runeConfig` |
| Writes | Select primary tree | `buildState.runeConfig.primaryTree = treeKey` |
| Writes | Select keystone | `buildState.runeConfig.keystone = runeId` |
| Writes | Select primary minor | `buildState.runeConfig.primarySlots[slotIndex] = runeId` |
| Writes | Select secondary tree | `buildState.runeConfig.secondaryTree = treeKey` |
| Writes | Select secondary minor | `buildState.runeConfig.secondarySlots[slotIndex] = runeId` |

**Constraints**:
- Primary and secondary trees must be different
- Changing primary tree resets keystone and primary minor selections
- Changing secondary tree resets secondary minor selections
- Only 1 rune per slot

### 2.6 BuildChart

**Responsibility**: Render stat-over-gold chart.

| Direction | Data | Type |
|-----------|------|------|
| Reads | Current selection | `buildState.selectedChampion` |
| Reads | Current inventory | `buildState.inventory` |
| Reads | Current rune config | `buildState.runeConfig` |
| Reads | Rune tree data | `RuneTree[]` (for rune stat lookups) |

**Derived computation (pure transformation)**:
1. Start with champion base stats at point `gold = 0`
2. For each non-null item in inventory (in order), add its `gold.total` to cumulative gold and add its stat modifiers
3. Apply rune stat modifiers
4. Produce `ChartSeries` data for uPlot

**Display**: Line chart with gold on x-axis, stat values on y-axis. Multiple series for different stats. Empty/placeholder state when no champion selected.

---

## 3. Static Data File Contracts

### 3.1 champions.json

```
Format: Array of Champion objects (pruned from DDragon)
Source: Riot Data Dragon champion.json, transformed at build time
Fields kept: id, key, name, title, image (full only), tags, partype, stats
Fields removed: lore, blurb, allytips, enemytips, info, skins, spells, passive, recommended
```

### 3.2 items.json

```
Format: Array of Item objects (pruned from DDragon)
Source: Riot Data Dragon item.json, transformed at build time
Filter: Only purchasable items available on Summoner's Rift (maps["11"] === true)
Fields kept: id, name, plaintext, image (full only), gold, stats, tags, from, into
Fields removed: description (HTML), colloq, effect, depth, stacks, consumed, specialRecipe, requiredChampion, requiredAlly
```

### 3.3 runes.json

```
Format: Array of RuneTree objects (direct from DDragon, minimal pruning)
Source: Riot Data Dragon runesReforged.json
Fields kept: id, key, name, icon, slots (with full rune details)
Fields removed: none significant (data is already compact)
```

---

## 4. Transformation Contracts

### 4.1 computeStats(champion, inventory, runeConfig, runeTrees) → ComputedStats

**Input**: Current champion, inventory items, rune configuration, rune tree data
**Output**: Aggregated stats (base + all item flat mods summed, percent mods multiplied)
**Purity**: Pure function, no side effects
**Category**: Transformation

### 4.2 computeChartData(champion, inventory) → ChartSeries

**Input**: Current champion, ordered inventory items
**Output**: `ChartSeries` with gold x-axis and per-stat y-axis series
**Purity**: Pure function, no side effects
**Category**: Transformation

Each data point represents adding one item:
- Point 0: base champion stats at gold = 0
- Point N: stats after items 1..N at gold = sum(item[1..N].gold.total)

### 4.3 filterByName(list, query) → filtered list

**Input**: Array of champions or items, search string
**Output**: Filtered array matching name substring (case-insensitive)
**Purity**: Pure function, no side effects
**Category**: Transformation
