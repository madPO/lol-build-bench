export interface ChampionStats {
  hp?: number;
  hpperlevel?: number;
  mp?: number;
  mpperlevel?: number;
  armor?: number;
  armorperlevel?: number;
  spellblock?: number;
  spellblockperlevel?: number;
  attackdamage?: number;
  attackdamageperlevel?: number;
  attackspeed?: number;
  attackspeedperlevel?: number;
  hpregen?: number;
  hpregenperlevel?: number;
  mpregen?: number;
  mpregenperlevel?: number;
  crit?: number;
  critperlevel?: number;
  movespeed?: number;
  attackrange?: number;
}

export type ComputedStats = ChampionStats;

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: string;
  avatarUrl: string;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}
