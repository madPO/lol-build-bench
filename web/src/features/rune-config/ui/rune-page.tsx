/**
 * RunePage Component (US3)
 * Displays rune trees and allows selecting primary/secondary runes
 * Validates that primary and secondary trees are different
 */

import { component$, useContext, useSignal, useComputed$ } from "@builder.io/qwik";
import { BuildContext } from "~/shared/config/build-context";
import runes from "~/data/runes.json";
import type { RuneTree } from "~/entities/rune";

export const RunePage = component$(() => {
  const buildState = useContext(BuildContext);
  const showPrimaryRunes = useSignal(false);
  const showSecondaryRunes = useSignal(false);

  const runeTreeList = runes as unknown as RuneTree[];

  // Get primary tree object if selected
  const primaryTreeObj = useComputed$(() => {
    if (!buildState.runeConfig.primaryTree) return null;
    return runeTreeList.find((t) => t.key === buildState.runeConfig.primaryTree) || null;
  });

  // Get secondary tree object if selected
  const secondaryTreeObj = useComputed$(() => {
    if (!buildState.runeConfig.secondaryTree) return null;
    return runeTreeList.find((t) => t.key === buildState.runeConfig.secondaryTree) || null;
  });

  // Filter available secondary trees (not equal to primary)
  const availableSecondaryTrees = useComputed$(() => {
    if (!buildState.runeConfig.primaryTree) return runeTreeList;
    return runeTreeList.filter((t) => t.key !== buildState.runeConfig.primaryTree);
  });

  return (
    <div class="card bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Rune Page</h2>

      <div class="space-y-4">
        {/* Primary Tree Selection */}
        <div>
          <h3 class="text-sm font-semibold mb-2">Primary Tree</h3>
          <div class="grid grid-cols-3 gap-2 mb-2">
            {runeTreeList.map((tree) => (
              <button
                key={tree.key}
                onClick$={() => {
                  buildState.runeConfig.primaryTree = tree.key;
                  buildState.runeConfig.keystone = null;
                  buildState.runeConfig.primarySlots = [null, null, null];
                }}
                class={`p-2 rounded-md text-xs font-medium transition-colors ${
                  buildState.runeConfig.primaryTree === tree.key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {tree.name}
              </button>
            ))}
          </div>

          {/* Primary Rune Slots */}
          {primaryTreeObj.value && (
            <div class="bg-gray-50 p-3 rounded-md">
              <button
                onClick$={() => {
                  showPrimaryRunes.value = !showPrimaryRunes.value;
                }}
                class="text-xs text-blue-600 hover:underline mb-2"
              >
                {showPrimaryRunes.value ? "Hide" : "Show"} Primary Runes
              </button>

              {showPrimaryRunes.value && (
                <div class="space-y-2">
                  {/* Keystone (Slot 0) */}
                  {primaryTreeObj.value.slots[0] && (
                    <div>
                      <p class="text-xs font-semibold mb-1">Keystone</p>
                      <div class="grid grid-cols-2 gap-1">
                        {primaryTreeObj.value.slots[0].runes.map((rune) => (
                          <button
                            key={rune.id}
                            onClick$={() => {
                              buildState.runeConfig.keystone = rune.id;
                            }}
                            class={`p-1 rounded text-xs ${
                              buildState.runeConfig.keystone === rune.id
                                ? "bg-blue-400 text-white"
                                : "bg-white border border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {rune.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Minor Rune Slots (1, 2, 3) */}
                  {primaryTreeObj.value.slots.slice(1, 4).map((slot, slotIdx) => (
                    <div key={slotIdx}>
                      <p class="text-xs font-semibold mb-1">Minor Slot {slotIdx + 1}</p>
                      <div class="grid grid-cols-2 gap-1">
                        {slot.runes.map((rune) => (
                          <button
                            key={rune.id}
                            onClick$={() => {
                              buildState.runeConfig.primarySlots[slotIdx] = rune.id;
                            }}
                            class={`p-1 rounded text-xs ${
                              buildState.runeConfig.primarySlots[slotIdx] === rune.id
                                ? "bg-blue-400 text-white"
                                : "bg-white border border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {rune.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Secondary Tree Selection */}
        <div>
          <h3 class="text-sm font-semibold mb-2">Secondary Tree</h3>
          <div class="grid grid-cols-3 gap-2 mb-2">
            {availableSecondaryTrees.value.map((tree) => (
              <button
                key={tree.key}
                onClick$={() => {
                  buildState.runeConfig.secondaryTree = tree.key;
                  buildState.runeConfig.secondarySlots = [null, null];
                }}
                class={`p-2 rounded-md text-xs font-medium transition-colors ${
                  buildState.runeConfig.secondaryTree === tree.key
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {tree.name}
              </button>
            ))}
          </div>

          {/* Secondary Rune Slots */}
          {secondaryTreeObj.value && (
            <div class="bg-gray-50 p-3 rounded-md">
              <button
                onClick$={() => {
                  showSecondaryRunes.value = !showSecondaryRunes.value;
                }}
                class="text-xs text-blue-600 hover:underline mb-2"
              >
                {showSecondaryRunes.value ? "Hide" : "Show"} Secondary Runes
              </button>

              {showSecondaryRunes.value && (
                <div class="space-y-2">
                  {secondaryTreeObj.value.slots.slice(1, 4).map((slot, slotIdx) => (
                    <div key={slotIdx}>
                      <p class="text-xs font-semibold mb-1">Slot {slotIdx + 1}</p>
                      <div class="grid grid-cols-2 gap-1">
                        {slot.runes.map((rune) => (
                          <button
                            key={rune.id}
                            onClick$={() => {
                              if (buildState.runeConfig.secondarySlots[slotIdx] === rune.id) {
                                buildState.runeConfig.secondarySlots[slotIdx] = null;
                              } else if (
                                buildState.runeConfig.secondarySlots.filter((r) => r !== null).length < 2
                              ) {
                                buildState.runeConfig.secondarySlots[slotIdx] = rune.id;
                              }
                            }}
                            class={`p-1 rounded text-xs ${
                              buildState.runeConfig.secondarySlots.includes(rune.id)
                                ? "bg-green-400 text-white"
                                : "bg-white border border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {rune.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
