import type { RuneSelectionState } from "./types";

/**
 * Handles a click on a rune branch, applying selection/deselection rules.
 */
export function calculateNewSelectionState(
  currentState: RuneSelectionState, 
  clickedBranchId: string
): RuneSelectionState {
  // Deselection: Clicked an already selected branch
  if (currentState.primaryBranchId === clickedBranchId) {
    return { 
      ...currentState, 
      primaryBranchId: null,
      primaryRuneIds: [null, null, null, null]
    };
  }
  if (currentState.secondaryBranchId === clickedBranchId) {
    return { 
      ...currentState, 
      secondaryBranchId: null,
      secondaryRuneIds: [null, null, null]
    };
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
  return { 
    ...currentState, 
    secondaryBranchId: clickedBranchId,
    secondaryRuneIds: [null, null, null]
  };
}

/**
 * Handles a click on a specific rune, applying League-style selection rules.
 */
export function selectRune(
  currentState: RuneSelectionState,
  runeId: string,
  tier: number,
  isSecondary: boolean
): RuneSelectionState {
  if (!isSecondary) {
    // Primary path: allow one per row (0-3)
    const nextRuneIds = [...currentState.primaryRuneIds];
    nextRuneIds[tier] = runeId;
    return { ...currentState, primaryRuneIds: nextRuneIds };
  } else {
    // Secondary path: only allow rows 1-3, max 2 total
    if (tier === 0) return currentState; // Cannot select from tier 0

    const nextRuneIds = [...currentState.secondaryRuneIds];
    const tierIndex = tier - 1; // slots 1,2,3 map to 0,1,2
    
    // Check if clicking currently selected rune in its row -> deselect
    if (nextRuneIds[tierIndex] === runeId) {
      nextRuneIds[tierIndex] = null;
    } else {
      const selectedCount = nextRuneIds.filter(id => id !== null).length;
      
      if (selectedCount < 2) {
        // Add or replace in its row
        nextRuneIds[tierIndex] = runeId;
      } else {
        // Already have 2. If we are replacing one in an ALREADY active row, just do it.
        if (nextRuneIds[tierIndex] !== null) {
          nextRuneIds[tierIndex] = runeId;
        } else {
          // Clicking a NEW row when 2 are already selected -> replace the "oldest" selected row.
          // LoL behavior: replaces the oldest selected slot. 
          // Implementation: find the first non-null that isn't the current tier and replace it.
          for (let i = 0; i < 3; i++) {
            if (nextRuneIds[i] !== null) {
              nextRuneIds[i] = null;
              break;
            }
          }
          nextRuneIds[tierIndex] = runeId;
        }
      }
    }
    return { ...currentState, secondaryRuneIds: nextRuneIds };
  }
}
