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
