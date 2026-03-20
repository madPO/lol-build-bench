import { createContextId } from "@builder.io/qwik";
import type { Champion } from "~/entities/champion";
import type { Item } from "~/entities/item";
import type { RuneConfig } from "~/entities/rune";

export interface BuildState {
  selectedChampion: Champion | null;
  inventory: (Item | null)[];
  runeConfig: RuneConfig;
}

export const BuildContext = createContextId<BuildState>("app.build-state");

export function createInitialBuildState(): BuildState {
  return {
    selectedChampion: null,
    inventory: [null, null, null, null, null, null],
    runeConfig: {
      primaryTree: null,
      keystone: null,
      primarySlots: [null, null, null],
      secondaryTree: null,
      secondarySlots: [null, null],
    },
  };
}
