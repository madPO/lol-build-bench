# Research: Inventory Section Redesign

## UI Decisions

### Delete Action Discovery & Touch Devices

- **Decision**: An inline SVG trash can icon will be overlaid on occupied slots on hover (using Tailwind's `group-hover`). For touch devices, the existing item `onClick$` will directly remove the item, satisfying the "tap to delete" requirement.
- **Rationale**: Keeps the codebase lightweight without adding new icon library dependencies. Tailwind's `group-hover:flex` (or `group-hover:opacity-100`) combined with an absolute positioned overlay works perfectly for mouse users. For mobile, tapping an item natively triggers the `button`'s `onClick$`, bypassing the need to visibly display the hover state.
- **Alternatives considered**: Installing `lucide-qwik` or `heroicons` was rejected to adhere to MVP-first and to prevent unnecessary dependency bloat, as only one icon is needed.

### Code Pruning

- **Decision**: The functions `computeTotalGold` and `countFilledSlots` in `web/src/features/item-build/model/inventory.ts` will be removed if they are no longer used anywhere else in the application.
- **Rationale**: Removes dead code and fulfills the requirement to remove the total cost and item counter from the UI.
- **Alternatives considered**: Keeping the functions "just in case" was rejected, violating the "MVP-first" and "no speculative generalization" constitution principles.
