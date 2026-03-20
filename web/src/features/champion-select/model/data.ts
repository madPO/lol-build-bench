import type { Champion } from "~/entities/champion";
import championsData from "~/data/champions.json";

export const champions = championsData as unknown as Champion[];
