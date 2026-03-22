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
import { SelectionGrid, SelectionItem } from "~/widgets/common/ui";

export const ItemSidebar = component$(() => {
  const buildState = useContext(BuildContext);
  const hoveredItemData = useSignal<{
    item: Item;
    x: number;
    y: number;
  } | null>(null);

  // Check if inventory is full
  const inventoryFull = useComputed$(() => {
    return isInventoryFull(buildState.inventory);
  });

  return (
    <div class="h-full relative flex flex-col">
      <SelectionGrid class="flex-1 min-h-0 h-full !p-3">
        {items.map((item) => (
          <SelectionItem
            key={item.id}
            size="md"
            disabled={inventoryFull.value}
            ariaLabel={item.name}
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
              const x =
                rect.right + 8 + 320 > window.innerWidth
                  ? rect.left - 320 - 8
                  : rect.right + 8;

              // Vertical overflow: if tooltip (max 60vh) would exceed viewport bottom, shift up
              const tooltipMaxHeight = window.innerHeight * 0.6;
              const y =
                rect.top + tooltipMaxHeight > window.innerHeight
                  ? Math.max(8, window.innerHeight - tooltipMaxHeight - 8)
                  : rect.top;

              hoveredItemData.value = { item, x, y };
            }}
            onPointerLeave$={() => {
              hoveredItemData.value = null;
            }}
          >
            <img
              src={getItemImageUrl(item.image)}
              alt={item.name}
              width={48}
              height={48}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </SelectionItem>
        ))}
      </SelectionGrid>

      {/* Custom Tooltip */}
      {hoveredItemData.value && (
        <div
          class="fixed z-[70] bg-surface text-text border border-accent shadow-2xl rounded-lg p-3 max-w-[320px] pointer-events-none"
          style={{
            top: `${hoveredItemData.value.y}px`,
            left: `${hoveredItemData.value.x}px`,
          }}
        >
          <div class="max-h-[60vh] overflow-y-auto">
            <div class="font-bold text-sm mb-1">
              {hoveredItemData.value.item.name}
            </div>
            <div class="text-xs opacity-90 leading-relaxed">
              {stripHtmlTags(hoveredItemData.value.item.description)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
