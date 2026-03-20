/**
 * ItemInventory Component (US2)
 * Displays 6-slot inventory with items
 * Allows removing items from slots
 */

import { component$, useContext } from "@builder.io/qwik";
import { BuildContext } from "~/app/config/build-context";
import { getItemImageUrl } from "~/entities/item";
import { computeTotalGold, countFilledSlots } from "../model/inventory";

export const ItemInventory = component$(() => {
  const buildState = useContext(BuildContext);

  return (
    <div class="card bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <h2 class="text-lg font-semibold flex-shrink-0 mb-4">
        Inventory (6 Slots)
      </h2>

      {/* Inventory grid - 3x2 layout */}
      <div class="grid grid-cols-3 gap-2 flex-1 min-h-0 overflow-y-auto pr-2">
        {buildState.inventory.map((item, index) => (
          <div
            key={index}
            class="aspect-square bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors"
          >
            {item ? (
              <button
                onClick$={() => {
                  buildState.inventory[index] = null;
                }}
                class="w-full h-full p-2 flex flex-col items-center justify-center text-xs hover:bg-red-50 transition-colors group"
              >
                <img
                  src={getItemImageUrl(item.image)}
                  alt={item.name}
                  width={48}
                  height={48}
                  class="w-12 h-12 rounded object-cover mb-1"
                  loading="lazy"
                />
                <div class="text-center line-clamp-2 group-hover:hidden">
                  {item.name}
                </div>
                <div class="hidden group-hover:block text-red-600 font-semibold">
                  Remove
                </div>
                <div class="text-gray-600">{item.gold.total}g</div>
              </button>
            ) : (
              <div class="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                +
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inventory summary */}
      <div class="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <div class="text-sm">
          <p>
            <span class="text-gray-600">Total Gold Spent:</span>
            <span class="font-semibold ml-2">
              {computeTotalGold(buildState.inventory)}
            </span>
          </p>
          <p class="text-xs text-gray-500 mt-2">
            {countFilledSlots(buildState.inventory)}/6 Slots Filled
          </p>
        </div>
      </div>
    </div>
  );
});
