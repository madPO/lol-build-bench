# Data Model: Item List Redesign

**Feature**: 002-redesign-item-list
**Date**: 2026-03-20

## Entities

### Item (existing, unchanged)

**Source**: `web/src/entities/item/model/types.ts`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Riot item ID (e.g., `"3031"`) |
| `name` | `string` | Display name (e.g., `"Infinity Edge"`) |
| `description` | `string` | Item description (plain text or HTML-rich markup) |
| `image` | `string` | Image filename for DDragon CDN (e.g., `"3031.png"`) |
| `gold` | `ItemGold` | Gold cost object |
| `stats` | `ItemStats` | Stat modifiers (`Record<string, number>`) |
| `tags` | `string[]` | Category tags (e.g., `["Damage", "CriticalStrike"]`) |
| `from` | `string[]` | Build-from item IDs |
| `into` | `string[]` | Build-into item IDs |
| `purchasable` | `boolean` | Whether item is purchasable |
| `maps` | `Record<string, boolean>` | Map availability |

**No changes to this entity.** The existing `Item` interface provides all fields needed: `image` for icon rendering, `name` and `description` for tooltip content.

### ItemGold (existing, unchanged)

| Field | Type | Description |
|-------|------|-------------|
| `base` | `number` | Base gold cost |
| `total` | `number` | Total gold cost |
| `sell` | `number` | Sell-back value |
| `purchasable` | `boolean` | Whether purchasable |

### BuildState (existing, unchanged)

**Source**: `web/src/app/config/build-context.ts`

| Field | Type | Description |
|-------|------|-------------|
| `selectedChampion` | `Champion \| null` | Currently selected champion |
| `inventory` | `(Item \| null)[]` | 6-slot inventory array |
| `runeConfig` | `RuneConfig` | Rune configuration |

**No changes to BuildState.** The item grid interacts with `inventory` through the same `BuildContext` mechanism.

## UI State (new, component-local)

### HoveredItemState

**Scope**: Local to `item-sidebar.tsx` component (not shared via context)

| Field | Type | Description |
|-------|------|-------------|
| `item` | `Item` | Currently hovered item |
| `x` | `number` | X coordinate of the tooltip |
| `y` | `number` | Y coordinate of the tooltip |

**Implementation**: `useSignal<{ item: Item; x: number; y: number } | null>(null)` — Composite signal co-locating the item data with pre-calculated screen position. This ensures precise tooltip placement, handles viewport boundary detection (both horizontal and vertical), and follows SSR-safe patterns by avoiding direct window access in JSX templates.

## Transformations (new)

### stripHtmlTags

**Category**: Transformation (pure function)
**Location**: `web/src/features/item-build/model/description.ts` (new file)

```typescript
/**
 * Strips HTML/XML tags from an item description string.
 * Replaces <br> with space. Removes all other tags.
 * Returns plain text suitable for tooltip display.
 */
export function stripHtmlTags(html: string): string
```

**Input**: Raw item description (may contain `<mainText>`, `<stats>`, `<br>`, etc.)
**Output**: Plain text with tags removed and `<br>` replaced by spaces.

**Rules**:
- Pure function: no side effects, deterministic
- Handles empty strings (returns empty string)
- Handles plain-text descriptions (returns unchanged)
- Handles HTML-rich descriptions (strips all tags)

## Validation Rules

No new validation rules. Existing constraints:
- Inventory is limited to 6 slots (enforced by `isInventoryFull()` in `model/inventory.ts`)
- Items can only be added when a slot is empty (enforced by `findFirstEmptySlot()`)

## State Transitions

No new state transitions introduced. The existing add/remove item flow remains unchanged:

```
User clicks item icon → 
  Guard: inventory not full AND empty slot exists →
    Action: buildState.inventory[firstEmptySlot] = item
```

## Relationships

```
Item (entity, unchanged)
  ├── displayed as icon in grid (item-sidebar.tsx)
  ├── displayed in tooltip on hover (item-sidebar.tsx)
  └── stored in BuildState.inventory on click (unchanged)

BuildState (app context, unchanged)
  └── inventory: (Item | null)[6]
        ├── read by item-sidebar.tsx (full/empty checks)
        └── written by item-sidebar.tsx (add item on click)
```
