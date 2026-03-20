# UI Contracts: Rune Selection

Since this feature primarily involves frontend UI components and transient state rather than external network APIs, these contracts define the expected properties (Props) for the primary Qwik components to ensure Low Coupling and High Cohesion.

## 1. Widget: `RuneSelectionBoard`

The top-level orchestrator. It manages the `RuneSelectionState` internally or accepts it via props if controlled from higher up.

```typescript
// web/src/widgets/rune-selection/ui/rune-selection-board.tsx
export interface RuneSelectionBoardProps {
  // Can optionally be controlled, or internal if undefined
  initialPrimaryBranchId?: string;
  initialSecondaryBranchId?: string;
  
  // Callback when selection changes (CloudEvent dispatch could happen here)
  onSelectionChange$?: PropFunction<(state: RuneSelectionState) => void>;
}
```

## 2. Feature: `SelectRuneBranch`

A UI component rendering the list of branches and handling clicks.

```typescript
// web/src/features/select-rune-branch/ui/branch-selector.tsx
export interface BranchSelectorProps {
  branches: RuneBranch[];
  primaryBranchId: string | null;
  secondaryBranchId: string | null;
  
  // Action triggered when a branch is clicked
  onBranchClick$: PropFunction<(branchId: string) => void>;
}
```

## 3. Entities

### `RuneBranchIcon`
Dumb component rendering the icon, name tooltip, and selection state.

```typescript
// web/src/entities/rune-branch/ui/rune-branch-icon.tsx
export interface RuneBranchIconProps {
  branch: RuneBranch;
  isSelected: boolean;
  isPrimary: boolean;
  onClick$: PropFunction<() => void>;
}
```

### `RuneColumn`
Dumb component rendering the runes for selected branches.

```typescript
// web/src/entities/rune/ui/rune-column.tsx
export interface RuneColumnProps {
  runes: Rune[]; 
  // If empty, the component handles rendering the Empty State (FR-010)
}
```