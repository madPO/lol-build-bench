# Quickstart: Item List Redesign

**Feature**: 002-redesign-item-list
**Date**: 2026-03-20

## Prerequisites

- Bun installed (runtime + package manager)
- Dependencies installed: `bun install` from `web/` directory

## Dev Server

```bash
cd web
bun run dev
```

Opens at `http://localhost:5173/` — the build planner page with the item sidebar on the left column.

## Files to Modify

| File | Change |
|------|--------|
| `web/src/features/item-build/ui/item-sidebar.tsx` | **Primary change**: Replace text list with icon grid + tooltip |
| `web/src/features/item-build/model/description.ts` | **New file**: `stripHtmlTags()` pure function |

## Files That Must NOT Change

| File | Reason |
|------|--------|
| `web/src/entities/item/model/types.ts` | Entity layer — no UI concerns |
| `web/src/entities/item/api/ddragon.ts` | Reuse as-is for image URLs |
| `web/src/app/config/build-context.ts` | BuildState/BuildContext unchanged |
| `web/src/features/item-build/ui/item-inventory.tsx` | Inventory grid unchanged |
| `web/src/features/item-build/model/inventory.ts` | Inventory helpers unchanged |
| `web/src/widgets/build-workspace/ui/page-layout.tsx` | Layout slots unchanged |

## Verification

After making changes, run from the `web/` directory:

```bash
# Type checking
bun run build.types

# Linting
bun run lint

# Production build
bun run build
```

All three must pass without errors.

## Manual Testing Checklist

1. **Grid renders**: Open the page — left sidebar shows a grid of item icons (no text, no search, no title)
2. **Hover tooltip**: Hover over any icon — tooltip shows item name (bold) + description (plain text)
3. **Tooltip hides**: Move cursor away — tooltip disappears
4. **Click to add**: Click an icon — item appears in inventory (right side, 3x2 grid)
5. **Inventory full**: Fill all 6 slots — icons show disabled state, yellow warning banner appears
6. **Scroll**: Scroll through ~37 rows of icons in the sidebar
7. **Responsive**: Resize browser — grid remains usable at different widths

## Key Design Decisions

| Decision | Details | Reference |
|----------|---------|-----------|
| Custom Qwik tooltip (not basecoat) | Basecoat `data-tooltip` is single-line, plain-text only | research.md R1 |
| 7-column grid, 48px icons | Fits sidebar width, matches inventory icon size | research.md R2 |
| CSS `@media (hover: hover)` for touch | Tailwind v4 handles this automatically | research.md R3 |
| Strip HTML tags for MVP | Full rich rendering deferred | research.md R4 |
