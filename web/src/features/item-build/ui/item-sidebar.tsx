/**
 * ItemSidebar Component (US2)
 * Displays items and allows adding them to inventory
 * Positioned on left spanning rows 1-2
 */

import {
  component$,
  useContext,
  useComputed$,
  useSignal,
} from "@builder.io/qwik";
import { BuildContext } from "~/app/config/build-context";
import { getItemImageUrl } from "~/entities/item/api/ddragon";
import type { Item } from "~/entities/item/model/types";
import { items } from "../model/data";
import { stripHtmlTags } from "../model/description";
import { isInventoryFull, findFirstEmptySlot } from "../model/inventory";

export const ItemSidebar = component$(() => {
  const buildState = useContext(BuildContext);
  const hoveredItemData = useSignal<{ item: Item; x: number; y: number } | null>(null);

  // Check if inventory is full
  const inventoryFull = useComputed$(() => {
    return isInventoryFull(buildState.inventory);
  });

  return (
    <div class="card bg-white rounded-lg shadow p-4 h-full flex flex-col relative">
      {/* Inventory full warning */}
      {inventoryFull.value && (
        <div class="mb-4 flex-shrink-0 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p class="text-sm text-yellow-800">
            Inventory full! Remove an item to add more.
          </p>
        </div>
      )}

      {/* Item grid */}
      <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1 flex-1 min-h-0 overflow-y-auto pr-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick$={() => {
              if (!inventoryFull.value) {
                const slot = findFirstEmptySlot(buildState.inventory);
                if (slot !== -1) {
                  buildState.inventory[slot] = item;
                }
              }
            }}
            onPointerEnter$={(event) => {
              if (event.pointerType === "touch") return;
              const element = event.target as HTMLElement;
              const button = element.closest("button");
              if (!button) return;

              const rect = button.getBoundingClientRect();
              
              // Calculate positioning with overflow handling
              const x = rect.right + 8 + 320 > window.innerWidth 
                ? rect.left - 320 - 8 
                : rect.right + 8;
              
              // Vertical overflow: if tooltip (max 60vh) would exceed viewport bottom, shift up
              const tooltipMaxHeight = window.innerHeight * 0.6;
              const y = rect.top + tooltipMaxHeight > window.innerHeight
                ? Math.max(8, window.innerHeight - tooltipMaxHeight - 8)
                : rect.top;

              hoveredItemData.value = { item, x, y };
            }}
            onPointerLeave$={() => {
              hoveredItemData.value = null;
            }}
            disabled={inventoryFull.value}
            aria-label={item.name}
            aria-disabled={inventoryFull.value}
            class={`w-12 h-12 p-0 rounded-md transition-colors overflow-hidden ${
              inventoryFull.value
                ? "bg-gray-100 cursor-not-allowed opacity-50"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            <img
              src={getItemImageUrl(item.image)}
              alt={item.name}
              width={48}
              height={48}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Custom Tooltip */}
      {hoveredItemData.value && (
        <div
          class="fixed z-50 bg-popover text-popover-foreground border shadow-md rounded-md p-3 max-w-[320px] pointer-events-none"
          style={{
            top: `${hoveredItemData.value.y}px`,
            left: `${hoveredItemData.value.x}px`,
          }}
        >
          <div class="max-h-[60vh] overflow-y-auto">
            <div class="font-bold text-sm mb-1">{hoveredItemData.value.item.name}</div>
            <div class="text-xs opacity-90 leading-relaxed">
              {stripHtmlTags(hoveredItemData.value.item.description)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
