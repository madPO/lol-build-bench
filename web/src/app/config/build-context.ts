import { createContextId } from "@builder.io/qwik";
import type { Champion } from "~/entities/champion";
import type { Item } from "~/entities/item";
import type { RuneSelectionState } from "~/features/select-rune-branch/model/types";

export interface BuildState {
  selectedChampion: Champion | null;
  inventory: (Item | null)[];
  runeConfig: RuneSelectionState;
}

export const BuildContext = createContextId<BuildState>("app.build-state");

export function createInitialBuildState(): BuildState {
  return {
    selectedChampion: null,
    inventory: [null, null, null, null, null, null],
    runeConfig: {
      primaryBranchId: null,
      secondaryBranchId: null,
      primaryRuneIds: [null, null, null, null],
      secondaryRuneIds: [null, null, null],
    },
  };
}
