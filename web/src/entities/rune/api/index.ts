import runesData from "~/data/runes.json";
import type { Rune } from "../model/types";

// Base URL for runes icons from DDRAGON
const RUNE_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/img/`;

/**
 * Removes HTML tags from a string.
 */
function stripHtml(html: string): string {
  if (!html) return "";
  let text = html.replace(/<br\s*\/?>/gi, " ");
  text = text.replace(/<[^>]*>/g, "");
  return text.replace(/\s+/g, " ").trim();
}

export function getRunesByBranch(branchId: string | null): Rune[] {
  if (!branchId) return [];

  const tree = (runesData as any[]).find((t) => String(t.id) === branchId);
  if (!tree) return [];

  const runes: Rune[] = [];
  tree.slots.forEach((slot: any, tier: number) => {
    slot.runes.forEach((rune: any) => {
      runes.push({
        id: String(rune.id),
        branchId: String(tree.id),
        name: rune.name,
        description: stripHtml(rune.shortDesc),
        iconUrl: `${RUNE_BASE_URL}${rune.icon}`,
        tier: tier,
      });
    });
  });

  return runes;
}
