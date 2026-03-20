import type { Item } from "~/entities/item";

/**
 * Finds index of first empty slot in inventory (-1 if full)
 */
export function findFirstEmptySlot(inventory: (Item | null)[]): number {
  return inventory.findIndex((item) => item === null);
}

/**
 * Checks if inventory is completely full
 */
export function isInventoryFull(inventory: (Item | null)[]): boolean {
  return inventory.every((item) => item !== null);
}
