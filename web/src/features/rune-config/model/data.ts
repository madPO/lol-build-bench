import type { RuneTree } from "~/entities/rune";
import runesData from "~/data/runes.json";

export const runes = runesData as unknown as RuneTree[];
