/** A single rune within a slot */
export interface Rune {
  id: number;
  key: string;
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
}

/** A slot within a rune tree (contains 3-4 rune choices) */
export interface RuneSlot {
  runes: Rune[];
}

/** A rune tree/path (e.g., Precision, Domination) */
export interface RuneTree {
  id: number;
  key: string;
  name: string;
  icon: string;
  slots: RuneSlot[];
}

/** Current rune page configuration */
export interface RuneConfig {
  primaryTree: string | null;
  keystone: number | null;
  primarySlots: (number | null)[];
  secondaryTree: string | null;
  secondarySlots: (number | null)[];
}
