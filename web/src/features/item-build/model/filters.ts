import type { Item } from "~/entities/item";

function filterByName<T extends { name: string }>(items: T[], query: string): T[] {
  const lower = query.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lower));
}

export function filterItemsByName(items: Item[], query: string): Item[] {
  return filterByName(items, query);
}
