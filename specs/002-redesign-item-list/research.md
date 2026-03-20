# Research: Item List Redesign

**Feature**: 002-redesign-item-list
**Date**: 2026-03-20

## R1: Tooltip Approach for Multi-line Item Name + Description

### Decision
Build a **custom Qwik `component$()`-based tooltip** rendered as a positioned `<div>` (not a CSS pseudo-element). Do NOT use basecoat-css's built-in `data-tooltip` or `popover.js`.

### Rationale
Basecoat's `data-tooltip` has three hard blockers:
1. **Single-line only** — `truncate` applies `white-space: nowrap; text-overflow: ellipsis`. Cannot wrap multi-line content.
2. **Plain text only** — `content: attr(data-tooltip)` renders the attribute value as a CSS string. HTML tags are shown literally, not rendered.
3. **No structured layout** — Cannot show the item name as a bold header with the description below it. Pseudo-elements cannot contain child elements.

Basecoat's `popover.js` is incompatible with Qwik — it uses imperative DOM manipulation (`querySelector`, `addEventListener`, `setAttribute`) and a global `window.basecoat` registry, conflicting with Qwik's resumability model.

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| Basecoat `data-tooltip` | Single-line, plain-text only, 320px max width. Unsuitable for multi-line name+description. |
| Basecoat `popover.js` | Imperative DOM manipulation conflicts with Qwik's resumability. Requires global `window.basecoat` registry. Click-based, not hover-based. |
| Third-party tooltip library | Constitution Principle V (MVP-First) forbids speculative abstractions. A custom div with absolute positioning is simpler than adding a dependency. |

### Implementation Approach
- Use a `useSignal<{item: Item, rect: DOMRect} | null>(null)` to track hovered item and its position
- Render tooltip as an absolutely-positioned `<div>` with basecoat design tokens (`bg-popover text-popover-foreground border shadow-md rounded-md`)
- Toggle visibility via `onMouseEnter$` / `onMouseLeave$` on grid cells
- Use `max-w-xs` (320px) with `whitespace-normal` for wrapping
- Position with `data-side="right"` logic (prefer right of sidebar, fall back to left if near viewport edge)

---

## R2: Grid Layout — Column Count and Cell Size

### Decision
Use **CSS Grid** with `grid-cols-7 gap-1` and **48px icons** (`w-12 h-12`).

### Rationale
- Every grid in the codebase uses Tailwind's `grid grid-cols-N` pattern (page layout: `grid-cols-3`, inventory: `grid-cols-3`, champion select: `grid-cols-2`, runes: `grid-cols-3`). CSS Grid is the established pattern.
- The sidebar occupies ~33% of viewport width (~350-450px on 1080-1440p). With 48px icons and 4px gaps: 7×48 + 6×4 = 360px — fits comfortably.
- 48px matches `w-12 h-12` already used in `item-inventory.tsx` (line 40). Visual consistency.
- 253 items / 7 cols = ~37 rows — scrollable but not excessive.
- DDragon icons are 64×64 native — 48px is slightly downscaled, looks crisp.

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| Flexbox wrapping | Causes uneven last-row alignment. Not used anywhere in the codebase. |
| `grid-cols-6` | Fewer items visible, 43 rows. Less dense than 7 cols. |
| `grid-cols-8` | 40px icons needed to fit — too small for visual identification. |
| `auto-fill, minmax()` | More responsive but the codebase strongly favors explicit `grid-cols-N`. MVP-first. |

---

## R3: Touch vs. Hover Detection

### Decision
Use **CSS `@media (hover: hover)`** via Tailwind's `hover:` variant. No JavaScript-based touch detection.

### Rationale
- Basecoat-css already uses `@media (hover: hover)` guards 28 times in its compiled CSS. This is the established pattern.
- Tailwind CSS v4 (v4.2.2 in this project) respects `@media (hover: hover)` by default when using the `hover:` variant. Touch devices will not trigger hover effects.
- FR-008 requires touch devices to skip tooltip and trigger action directly on tap. With `@media (hover: hover)`, the tooltip only shows on devices with hover capability; tap on touch devices fires `onClick$` immediately.
- Zero additional JS runtime cost.

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| JS-based `onPointerEnter$` with `pointerType` check | Adds runtime complexity. CSS media query is simpler and already established in the design system. |
| `ontouchstart` detection | Unreliable; many devices support both touch and hover. |
| User-agent sniffing | Fragile, deprecated approach. |

---

## R4: Item Description Rendering in Tooltip

### Decision
**Strip all custom XML/HTML tags and render as plain text** for the MVP tooltip. Defer rich description rendering (colored damage types, stat highlighting) to a future iteration.

### Rationale
Item descriptions use two formats:
- **56% plain text** (avg 47 chars): e.g., "Massively enhances critical strikes"
- **44% HTML-rich markup** (avg 374 chars): Custom tags like `<mainText>`, `<stats>`, `<attention>`, `<passive>`, `<magicDamage>`, `<scaleAP>`, etc. plus `<br>` tags and legacy `<font>` tags.

The custom tags are not standard HTML — browsers render them as unstyled inline elements. Properly rendering them requires either:
1. A tag-to-component parser (mapping 33 unique tags to styled elements)
2. Custom CSS targeting the non-standard element names
3. A sanitizer to prevent XSS on `<font>` tags and future data changes

Building a full parser violates Constitution Principle V (MVP-First: "Gold-plating and speculative generalization are forbidden"). The core user value is seeing the item **name** on hover — the description is supplementary context.

### MVP Implementation
- Strip HTML tags using a simple regex: `description.replace(/<[^>]*>/g, '')` (Transformation — pure function)
- Render `<br>` as spaces during stripping
- Show: **item name** (bold) + **stripped description** (normal weight) in tooltip
- Result: "80 Attack Damage 25% Critical Strike Chance Perfection Critical strikes deal 40% bonus damage..."

### Future Enhancement (deferred)
- Parse custom tags into styled `<span>` elements with color classes
- Map: `<attention>` → gold text, `<magicDamage>` → blue, `<physicalDamage>` → red, `<passive>` → bold label

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| `dangerouslySetInnerHTML` with raw descriptions | XSS risk from `<font>` tags. Custom tags render unstyled. Bad UX. |
| Full tag-to-component parser | Gold-plating for MVP. 33 unique tags to handle. Defer to future iteration. |
| Show only item name (no description) | Spec FR-006 explicitly requires "name and text description." |

---

## R5: Existing Functionality Preservation

### Decision
The click-to-add handler is preserved exactly as-is. The search/filter functionality is removed from the UI but the `filters.ts` module is left in place (dead code cleanup deferred).

### Rationale
- FR-009: "retain all other existing interaction functionalities unchanged"
- The only interaction in the sidebar is click-to-add (lines 67-70 of `item-sidebar.tsx`)
- No drag/drop exists anywhere in the codebase (confirmed by grep)
- No selection/highlighting exists in the sidebar
- Removing `filters.ts` is a separate cleanup concern — MVP-first says defer

### What Changes
| Aspect | Before | After |
|---|---|---|
| Layout | Vertical text list (`space-y-2`) | Grid (`grid grid-cols-7 gap-1`) |
| Cell content | Name + gold cost text | Item icon only (`<img>`) |
| Search | Text input at top | Removed |
| Title | "Item Shop" heading | Removed |
| Click handler | `buildState.inventory[firstEmptySlot] = item` | Same, unchanged |
| Hover | None | Tooltip with name + description |
| Disabled state | `cursor-not-allowed opacity-50` on text | Same visual cues on icon |

### What Does Not Change
- `item-inventory.tsx` (6-slot inventory grid)
- `entities/item/` (types, ddragon API)
- `model/data.ts` (item data loader)
- `model/inventory.ts` (gold calc, slot helpers)
- `app/config/build-context.ts` (BuildState, BuildContext)
- `widgets/build-workspace/ui/page-layout.tsx` (slot layout)
