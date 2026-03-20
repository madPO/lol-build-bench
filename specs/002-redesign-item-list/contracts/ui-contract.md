# UI Contract: Item List Redesign

**Feature**: 002-redesign-item-list
**Date**: 2026-03-20

## Overview

This feature modifies only the frontend UI layer. No external APIs, backend endpoints, or inter-system contracts are affected. The contract below documents the UI component interface changes for the `ItemSidebar` component.

## Component: ItemSidebar

**File**: `web/src/features/item-build/ui/item-sidebar.tsx`
**Export**: Named export via `web/src/features/item-build/index.ts`
**Consumer**: `web/src/widgets/build-workspace/ui/page-layout.tsx` (via `<Slot name="item-sidebar" />`)

### Props / Context

| Input | Type | Source | Change |
|-------|------|--------|--------|
| `BuildContext` | `BuildState` | `useContext(BuildContext)` | Unchanged — reads `inventory` for full/empty checks, writes to add items |

### Visual Contract

#### Before (current)

```
┌─────────────────────────┐
│ Item Shop          (h2) │  ← Section title
│ [Search input........]  │  ← Search field
│ ┌─────────────────────┐ │
│ │ Item Name    1000g +│ │  ← Text row per item
│ │ Item Name    2000g +│ │
│ │ Item Name    3000g +│ │
│ │ ...                 │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

#### After (redesigned)

```
┌─────────────────────────┐
│ ┌──┬──┬──┬──┬──┬──┬──┐  │
│ │🔲│🔲│🔲│🔲│🔲│🔲│🔲│  │  ← 7-column icon grid
│ ├──┼──┼──┼──┼──┼──┼──┤  │
│ │🔲│🔲│🔲│🔲│🔲│🔲│🔲│  │    Each cell: 48x48 item icon
│ ├──┼──┼──┼──┼──┼──┼──┤  │
│ │🔲│🔲│🔲│🔲│🔲│🔲│🔲│  │    No text, no gold cost
│ │...                  │  │
│ └──┴──┴──┴──┴──┴──┴──┘  │    ~37 rows for 253 items
│                          │
│  ┌──────────────────┐    │
│  │ Item Name (bold)  │   │  ← Tooltip (on hover only)
│  │ Description text  │   │    Positioned near hovered icon
│  │ wrapping to fit   │   │    Max width: 320px
│  └──────────────────┘    │
└─────────────────────────┘
```

### Interaction Contract

| Action | Trigger | Behavior | Change |
|--------|---------|----------|--------|
| Add item to inventory | `click` / `tap` on icon | Sets `buildState.inventory[firstEmptySlot] = item` | Unchanged logic, new target (icon button instead of text row) |
| Show tooltip | `mouseenter` on icon (hover-capable devices only) | Displays tooltip with item name + stripped description | New |
| Hide tooltip | `mouseleave` from icon | Hides tooltip | New |
| Disabled state | Inventory is full (6/6 slots) | Icons show reduced opacity, `cursor-not-allowed` | Unchanged visual cues, applied to icons |
| Inventory full warning | 6/6 slots filled | Yellow banner displayed | Unchanged |

### Accessibility Contract

| Attribute | Element | Value |
|-----------|---------|-------|
| `role` | Grid cell `<button>` | `"button"` (implicit) |
| `aria-label` | Grid cell `<button>` | `item.name` (for screen readers, since no visible text) |
| `aria-disabled` | Grid cell `<button>` | `"true"` when inventory is full |
| `alt` | `<img>` icon | `item.name` |

### Removed Elements

| Element | Reason |
|---------|--------|
| Section title ("Item Shop") | FR-004: system MUST hide/remove the section title |
| Search input | FR-005: system MUST hide/remove search functionality |
| Item name text in cells | FR-003: cells MUST NOT display item name |
| Gold cost text in cells | FR-003: cells MUST NOT display other indicators |
| "+" badge on items | FR-003: cells MUST NOT display other indicators |

## Transformation: stripHtmlTags

**File**: `web/src/features/item-build/model/description.ts` (new)
**Export**: Named export `stripHtmlTags`

### Contract

```typescript
function stripHtmlTags(html: string): string
```

| Input | Output |
|-------|--------|
| `""` | `""` |
| `"Slightly increases Move Speed"` | `"Slightly increases Move Speed"` |
| `"<mainText><stats><attention>80</attention> AP</stats><br><passive>Burn</passive></mainText>"` | `"80 AP Burn"` |

### Rules
- Pure function (no side effects)
- `<br>` and `<br/>` replaced with single space
- All other HTML/XML tags stripped
- Consecutive whitespace collapsed to single space
- Leading/trailing whitespace trimmed
