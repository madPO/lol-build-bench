/**
 * ChampionStats Component (US1)
 * Displays the selected champion's base stats
 * Part of User Story 1: Select Champion and View Stats
 */

import { component$, useContext } from "@builder.io/qwik";
import { BuildContext } from "~/app/config/build-context";

export const ChampionStats = component$(() => {
  const buildState = useContext(BuildContext);

  if (!buildState.selectedChampion) {
    return (
      <div class="card bg-white rounded-lg shadow p-4 h-full flex flex-col">
        <h2 class="text-lg font-semibold mb-4 flex-shrink-0">Base Stats</h2>
        <div class="text-center text-gray-500 flex-1 flex items-center justify-center">
          <p>Select a champion to view stats</p>
        </div>
      </div>
    );
  }

  const stats = buildState.selectedChampion.stats;

  const statRows = [
    { label: "Health", value: stats.hp.toFixed(1) },
    { label: "Health Regen", value: stats.hpregen.toFixed(2) },
    { label: "Mana", value: stats.mp.toFixed(1) },
    { label: "Mana Regen", value: stats.mpregen.toFixed(2) },
    { label: "Attack Damage", value: stats.attackdamage.toFixed(1) },
    { label: "Attack Speed", value: stats.attackspeed.toFixed(3) },
    { label: "Attack Range", value: stats.attackrange.toFixed(0) },
    { label: "Armor", value: stats.armor.toFixed(1) },
    { label: "Magic Resist", value: stats.spellblock.toFixed(1) },
    { label: "Movement Speed", value: stats.movespeed.toFixed(0) },
    { label: "Crit Chance", value: (stats.crit * 100).toFixed(1) + "%" },
  ];

  return (
    <div class="card bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <h2 class="text-lg font-semibold flex-shrink-0 mb-4">
        {buildState.selectedChampion.name} - Base Stats
      </h2>

      <div class="space-y-2 flex-1 min-h-0 overflow-y-auto pr-2">
        {statRows.map((row) => (
          <div
            key={row.label}
            class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-700">{row.label}</span>
            <span class="font-semibold text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      <div class="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <p class="text-xs text-gray-500">
          {buildState.selectedChampion.partype} based champion
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Stats shown at level 1. Growth per level not displayed.
        </p>
      </div>
    </div>
  );
});
