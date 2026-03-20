import type { Item } from "~/entities/item";
import itemsData from "~/data/items.json";

export const items = itemsData as unknown as Item[];
