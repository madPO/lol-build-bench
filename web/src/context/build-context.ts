/**
 * BuildContext - Shared state for the Champion Build Planner
 * Uses Qwik's createContextId for cross-component state management
 */

import { createContextId } from "@builder.io/qwik";
import type { BuildState } from "../data/types";

/**
 * Context ID for accessing the build state
 * Used with useContextProvider to provide and useContext to consume
 */
export const BuildContext = createContextId<BuildState>("app.build-state");

/**
 * Creates an initial empty build state
 */
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
