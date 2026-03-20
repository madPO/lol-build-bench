import type { Champion } from "~/entities/champion";

export function filterChampionsByName(
  champions: Champion[],
  query: string,
): Champion[] {
  const lower = query.toLowerCase();
  return champions.filter((champ) => champ.name.toLowerCase().includes(lower));
}
