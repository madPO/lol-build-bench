/**
 * Filter and search transformations
 * Pure functions for filtering champions and items by name/tags
 */

import type { Champion, Item } from "../data/types";

/**
 * Filters a list of champions by name search
 * Case-insensitive partial match
 * @param champions - Array of champions to filter
 * @param searchTerm - Search query
 * @returns Filtered champions matching the search term
 */
export function filterChampionsByName(champions: Champion[], searchTerm: string): Champion[] {
  if (!searchTerm.trim()) {
    return champions;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return champions.filter((champ) => champ.name.toLowerCase().includes(lowerSearch));
}

/**
 * Filters a list of items by name or tags
 * Case-insensitive partial match
 * @param items - Array of items to filter
 * @param searchTerm - Search query
 * @returns Filtered items matching the search term
 */
export function filterItemsByName(items: Item[], searchTerm: string): Item[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(lowerSearch);
    const descMatch = item.description.toLowerCase().includes(lowerSearch);
    const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));

    return nameMatch || descMatch || tagMatch;
  });
}

/**
 * Generic filter by name function used across components
 * @param items - Items to filter (champion, item, or other)
 * @param searchTerm - Search query
 * @param nameField - Field to search (default: 'name')
 * @returns Filtered items
 */
export function filterByName<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  nameField: keyof T = "name" as keyof T,
): T[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item) => {
    const value = item[nameField];
    if (typeof value === "string") {
      return value.toLowerCase().includes(lowerSearch);
    }
    return false;
  });
}
