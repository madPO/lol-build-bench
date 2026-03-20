import type { RuneTree } from "~/entities/rune";

/**
 * Finds a rune tree by its key
 */
export function findTreeByKey(trees: RuneTree[], key: string | null): RuneTree | null {
  if (!key) return null;
  return trees.find((t) => t.key === key) || null;
}

/**
 * Returns available secondary trees (not equal to primary)
 */
export function getAvailableSecondaryTrees(trees: RuneTree[], primaryKey: string | null): RuneTree[] {
  if (!primaryKey) return trees;
  return trees.filter((t) => t.key !== primaryKey);
}
