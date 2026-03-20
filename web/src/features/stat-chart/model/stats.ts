import type { Champion, ComputedStats } from "~/entities/champion";
import type { Item, ItemStats } from "~/entities/item";

/**
 * Computes final stats by aggregating champion base stats, item modifiers, and rune bonuses
 * @param champion - Selected champion with base stats
 * @param items - Array of 6 items (can contain nulls for empty slots)
 * @returns Final computed stats object
 */
export function computeStats(champion: Champion | null, items: (Item | null)[]): ComputedStats {
  if (!champion) {
    return {};
  }

  // Start with champion base stats
  const stats: ComputedStats = {
    hp: champion.stats.hp,
    mp: champion.stats.mp,
    armor: champion.stats.armor,
    spellblock: champion.stats.spellblock,
    attackdamage: champion.stats.attackdamage,
    attackspeed: champion.stats.attackspeed,
    movespeed: champion.stats.movespeed,
    hpregen: champion.stats.hpregen,
    mpregen: champion.stats.mpregen,
    crit: champion.stats.crit,
    attackrange: champion.stats.attackrange,
  };

  // Apply item modifiers
  for (const item of items) {
    if (!item) continue;
    applyItemStats(stats, item.stats);
  }

  // TODO: Apply rune bonuses when rune system is integrated
  // For now, runes are configured but don't affect stats display

  return stats;
}

/**
 * Applies item stat modifiers to the stats object
 * Handles both flat bonuses (sum) and percentage modifiers (multiply)
 * @param stats - Target stats object to modify
 * @param itemStats - Item stat modifiers from DDragon
 */
function applyItemStats(stats: ComputedStats, itemStats: ItemStats): void {
  // Track percentage modifiers to apply at the end
  const percentMods: Record<string, number> = {};

  for (const [key, value] of Object.entries(itemStats)) {
    // Flat modifiers - add directly
    if (key === "FlatHPPoolMod" && stats.hp !== undefined) {
      stats.hp += value;
    } else if (key === "FlatMPPoolMod" && stats.mp !== undefined) {
      stats.mp += value;
    } else if (key === "FlatPhysicalDamageMod" && stats.attackdamage !== undefined) {
      stats.attackdamage += value;
    } else if (key === "FlatMagicDamageMod" && stats.attackdamage !== undefined) {
      stats.attackdamage += value;
    } else if (key === "FlatArmorMod" && stats.armor !== undefined) {
      stats.armor += value;
    } else if (key === "FlatSpellBlockMod" && stats.spellblock !== undefined) {
      stats.spellblock += value;
    } else if (key === "FlatMovementSpeedMod" && stats.movespeed !== undefined) {
      stats.movespeed += value;
    } else if (key === "FlatCritChanceMod" && stats.crit !== undefined) {
      stats.crit += value;
    } else if (key === "FlatHPRegenMod" && stats.hpregen !== undefined) {
      stats.hpregen += value;
    }
    // Percentage modifiers - track for later multiplication
    else if (key === "PercentAttackSpeedMod" && stats.attackspeed !== undefined) {
      percentMods["attackspeed"] = (percentMods["attackspeed"] || 1) * (1 + value);
    } else if (key === "PercentMovementSpeedMod" && stats.movespeed !== undefined) {
      percentMods["movespeed"] = (percentMods["movespeed"] || 1) * (1 + value);
    }
  }

  // Apply percentage modifiers
  if (percentMods["attackspeed"] && stats.attackspeed !== undefined) {
    stats.attackspeed *= percentMods["attackspeed"];
  }
  if (percentMods["movespeed"] && stats.movespeed !== undefined) {
    stats.movespeed *= percentMods["movespeed"];
  }
}
