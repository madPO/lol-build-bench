import type { Champion } from "~/entities/champion";

function filterByName<T extends { name: string }>(items: T[], query: string): T[] {
  const lower = query.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lower));
}

export function filterChampionsByName(champions: Champion[], query: string): Champion[] {
  return filterByName(champions, query);
}
