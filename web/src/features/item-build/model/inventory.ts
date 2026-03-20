import type { Item } from "~/entities/item";

/**
 * Computes total gold value of items in inventory
 */
export function computeTotalGold(inventory: (Item | null)[]): number {
  return inventory.reduce((sum, item) => sum + (item?.gold.total || 0), 0);
}

/**
 * Counts number of filled slots in inventory
 */
export function countFilledSlots(inventory: (Item | null)[]): number {
  return inventory.filter((item) => item !== null).length;
}

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
