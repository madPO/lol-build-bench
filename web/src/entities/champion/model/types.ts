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
