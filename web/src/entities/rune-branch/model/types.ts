// web/src/entities/rune-branch/model/types.ts
export interface RuneBranch {
  id: string;
  name: string;      // For tooltips
  iconUrl: string;   // Image asset path
  color?: string;    // Theme color for highlights (optional, MVP might just use CSS variables)
}
