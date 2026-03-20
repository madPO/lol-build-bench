import type { Item } from "~/entities/item";

export function filterItemsByName(items: Item[], query: string): Item[] {
  const lower = query.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lower));
}
