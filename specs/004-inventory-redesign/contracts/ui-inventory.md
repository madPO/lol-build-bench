# Component Contract: ItemInventory

**Component Name**: `ItemInventory`
**Location**: `web/src/features/item-build/ui/item-inventory.tsx`

## Responsibilities

1. Read `inventory` array from `BuildContext`.
2. Render exactly 6 fixed item slots in a CSS Grid (e.g., `grid-cols-3` or `grid-cols-6` depending on available space).
3. Do NOT render a section header/title.
4. Do NOT render a footer with item counts or total gold cost.
5. For each occupied slot, render the item image.
6. Provide an interactive overlay (`<button>`) for occupied slots that:
   - Displays a trash can icon centered over the item image on `:hover`.
   - Modifies the `BuildContext.inventory` state by setting the target index to `null` on `onClick$`.

## Props

The component requires no props. It consumes state via Qwik's `useContext(BuildContext)`.

## DOM Structure / Tailwind Specs

- **Container**: `grid gap-2` (grid behavior).
- **Slot (Empty)**: Grey background, subtle border, placeholder visual (e.g., `+`).
- **Slot (Occupied)**: `relative group overflow-hidden`.
  - Image: `w-full h-full object-cover`.
  - Overlay: `absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center`.
  - Trash Icon: Inline SVG with white/red stroke `w-6 h-6`.

## Touch Target Behavior
Because the delete action is on a `<button>`, tap events on mobile will trigger `onClick$` and delete the item, gracefully falling back from the `hover` behavior.
