/**
 * ItemSidebar Component (US2)
 * Displays items and allows adding them to inventory
 * Positioned on left spanning rows 1-2
 */

import { component$, useContext, useSignal, useComputed$ } from "@builder.io/qwik";
import { BuildContext } from "~/app/config/build-context";
import { filterItemsByName } from "../model/filters";
import { items } from "../model/data";
import { isInventoryFull, findFirstEmptySlot } from "../model/inventory";

export const ItemSidebar = component$(() => {
  const buildState = useContext(BuildContext);
  const searchTerm = useSignal("");

  // Filter items based on search term
  const filteredItems = useComputed$(() => {
    return filterItemsByName(items, searchTerm.value);
  });

  // Check if inventory is full
  const inventoryFull = useComputed$(() => {
    return isInventoryFull(buildState.inventory);
  });

  // Find first empty slot
  const firstEmptySlot = useComputed$(() => {
    return findFirstEmptySlot(buildState.inventory);
  });

  return (
    <div class="card bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Item Shop</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm.value}
        onInput$={(e) => {
          const input = e.target as HTMLInputElement;
          searchTerm.value = input.value;
        }}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Inventory full warning */}
      {inventoryFull.value && (
        <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p class="text-sm text-yellow-800">Inventory full! Remove an item to add more.</p>
        </div>
      )}

      {/* Item list */}
      <div class="space-y-2 max-h-96 overflow-y-auto">
        {filteredItems.value.map((item) => (
          <button
            key={item.id}
            onClick$={() => {
              if (!inventoryFull.value && firstEmptySlot.value !== -1) {
                buildState.inventory[firstEmptySlot.value] = item;
              }
            }}
            disabled={inventoryFull.value}
            class={`w-full p-2 rounded-md text-left text-sm transition-colors ${
              inventoryFull.value
                ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                : "bg-gray-100 hover:bg-blue-100 text-gray-900"
            }`}
          >
            <div class="flex justify-between items-start">
              <div>
                <div class="font-medium">{item.name}</div>
                <div class="text-xs text-gray-600">{item.gold.total}g</div>
              </div>
              <div class="text-xs bg-gray-200 px-2 py-1 rounded">+</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
