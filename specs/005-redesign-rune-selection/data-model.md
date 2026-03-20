# Data Model: Rune Selection

This document outlines the data structures and state definitions required for the Rune Selection feature. These models follow the principle of separating Data from Transformations and Actions.

## State Models

### `RuneSelectionState`
Tracks the user's current selection of rune branches. This is transient UI state.

```typescript
// web/src/features/select-rune-branch/model/types.ts
export interface RuneSelectionState {
  primaryBranchId: string | null;
  secondaryBranchId: string | null;
}
```

## Entity Models

### `RuneBranch`
Represents a category or path of runes (e.g., Precision, Domination, Sorcery).

```typescript
// web/src/entities/rune-branch/model/types.ts
export interface RuneBranch {
  id: string;
  name: string;      // For tooltips
  iconUrl: string;   // Image asset path
  color?: string;    // Theme color for highlights (optional, MVP might just use CSS variables)
}
```

### `Rune`
Represents an individual selectable perk within a branch.

```typescript
// web/src/entities/rune/model/types.ts
export interface Rune {
  id: string;
  branchId: string;  // Reference to the parent RuneBranch
  name: string;
  iconUrl: string;
  tier: number;      // e.g., Keystone (0), Tier 1, Tier 2, etc.
}
```

## Transformations (Pure Functions)

To adhere to the constitution's "Data, Transformation, Actions" principle, state transitions will be handled by pure functions.

```typescript
// web/src/features/select-rune-branch/model/transformations.ts

/**
 * Handles a click on a rune branch, applying selection/deselection rules.
 */
export function calculateNewSelectionState(
  currentState: RuneSelectionState, 
  clickedBranchId: string
): RuneSelectionState {
  // Deselection: Clicked an already selected branch
  if (currentState.primaryBranchId === clickedBranchId) {
    return { ...currentState, primaryBranchId: null };
  }
  if (currentState.secondaryBranchId === clickedBranchId) {
    return { ...currentState, secondaryBranchId: null };
  }

  // Selection: No primary selected
  if (currentState.primaryBranchId === null) {
    return { ...currentState, primaryBranchId: clickedBranchId };
  }

  // Selection: Primary selected, no secondary
  if (currentState.secondaryBranchId === null) {
    return { ...currentState, secondaryBranchId: clickedBranchId };
  }

  // Replacement: Primary and secondary already selected -> replace secondary
  return { ...currentState, secondaryBranchId: clickedBranchId };
}
```

## Validation Rules
- `primaryBranchId` and `secondaryBranchId` must not be identical (enforced by the `calculateNewSelectionState` logic).
- A secondary branch can only be considered "active" if a primary branch is also selected (though transiently they can exist independently if a user deselects the primary branch).
