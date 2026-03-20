// web/src/features/select-rune-branch/model/types.ts
export interface RuneSelectionState {
  primaryBranchId: string | null;
  secondaryBranchId: string | null;
  primaryRuneIds: (string | null)[];   // Array of 4 rune IDs [keystone, tier1, tier2, tier3]
  secondaryRuneIds: (string | null)[]; // Array of 3 rune IDs (tiers 1-3, max 2 selected)
}
