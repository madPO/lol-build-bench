/**
 * ChampionSelect Component (US1)
 * Allows browsing, searching, and selecting a champion
 * Part of User Story 1: Select Champion and View Stats
 */

import { component$, useContext, useSignal, useComputed$ } from "@builder.io/qwik";
import { BuildContext } from "../../context/build-context";
import { filterChampionsByName } from "../../transformations/filters";
import champions from "../../data/champions.json";
import type { Champion } from "../../data/types";

const DDRAGON_VERSION = "16.6.1" as const;

export const ChampionSelect = component$(() => {
  const buildState = useContext(BuildContext);
  const searchTerm = useSignal("");

  // Filter champions based on search term
  const filteredChampions = useComputed$(() => {
    return filterChampionsByName(champions as unknown as Champion[], searchTerm.value);
  });

  return (
    <div class="card bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Champion Select</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search champions..."
        value={searchTerm.value}
        onInput$={(e) => {
          const input = e.target as HTMLInputElement;
          searchTerm.value = input.value;
        }}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Champion grid */}
      <div class="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
        {filteredChampions.value.map((champ) => (
          <button
            key={champ.id}
            onClick$={() => {
              buildState.selectedChampion = champ;
            }}
            class={`p-2 rounded-md text-left transition-colors ${
              buildState.selectedChampion?.id === champ.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            <div class="font-medium text-sm">{champ.name}</div>
            <div class="text-xs opacity-75">{champ.title}</div>
          </button>
        ))}
      </div>

      {/* Selected champion display */}
      {buildState.selectedChampion && (
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex gap-3">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${buildState.selectedChampion.image}`}
              alt={buildState.selectedChampion.name}
              width={64}
              height={64}
              class="w-16 h-16 rounded-md object-cover"
              loading="lazy"
            />
            <div>
              <h3 class="font-bold">{buildState.selectedChampion.name}</h3>
              <p class="text-sm text-gray-600">{buildState.selectedChampion.title}</p>
              <div class="text-xs text-gray-500 mt-1">
                {buildState.selectedChampion.tags.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
