// web/src/entities/rune/model/types.ts
export interface Rune {
  id: string;
  branchId: string;  // Reference to the parent RuneBranch
  name: string;
  description: string;
  iconUrl: string;
  tier: number;      // e.g., Keystone (0), Tier 1, Tier 2, etc.
}
