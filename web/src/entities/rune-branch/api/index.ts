import runesData from "~/data/runes.json";
import type { RuneBranch } from "../model/types";

// Base URL for runes icons from DDRAGON
const RUNE_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/img/`;

export function getAllRuneBranches(): RuneBranch[] {
  return (runesData as any[]).map((tree) => ({
    id: String(tree.id),
    name: tree.name,
    iconUrl: `${RUNE_BASE_URL}${tree.icon}`,
  }));
}
