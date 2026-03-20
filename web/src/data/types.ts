/**
 * Core type definitions for the Champion Build Planner UI
 * Matches Riot Data Dragon structure with application state types
 */

// ============================================================================
// Static Data Types (from Riot Data Dragon)
// ============================================================================

/** Base stats and per-level growth values for a champion */
export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeed: number;
  attackspeedperlevel: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  movespeed: number;
  attackrange: number;
}

/** Represents a playable champion */
export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: string;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

/** Gold cost breakdown for an item */
export interface ItemGold {
  base: number;
  total: number;
  sell: number;
  purchasable: boolean;
}

/** Stat modifiers on an item (DDragon format) */
export type ItemStats = Record<string, number>;

/** Represents an equipment piece */
export interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  gold: ItemGold;
  stats: ItemStats;
  tags: string[];
  from: string[];
  into: string[];
  purchasable: boolean;
  maps: Record<string, boolean>;
}

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

// ============================================================================
// Application State Types
// ============================================================================

/** Current rune page configuration */
export interface RuneConfig {
  primaryTree: string | null;
  keystone: number | null;
  primarySlots: (number | null)[];
  secondaryTree: string | null;
  secondarySlots: (number | null)[];
}

/** Root application state managed by Qwik context */
export interface BuildState {
  selectedChampion: Champion | null;
  inventory: (Item | null)[];
  runeConfig: RuneConfig;
}

// ============================================================================
// Derived Data Types (Transformations)
// ============================================================================

/** Computed stats after applying items and runes */
export type ComputedStats = Partial<
  Record<
    | "hp"
    | "mp"
    | "armor"
    | "spellblock"
    | "attackdamage"
    | "attackspeed"
    | "movespeed"
    | "hpregen"
    | "mpregen"
    | "crit"
    | "attackrange",
    number
  >
>;

/** A single data point on the stat-over-gold chart */
export interface ChartDataPoint {
  cumulativeGold: number;
  stats: Record<string, number>;
}

/** Data structure for uPlot consumption */
export interface ChartSeries {
  goldValues: number[];
  statSeries: Record<string, number[]>;
}
