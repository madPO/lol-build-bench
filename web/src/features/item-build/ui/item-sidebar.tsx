/**
 * ItemSidebar Component (US2)
 * Displays items and allows adding them to inventory
 * Positioned on left spanning rows 1-2
 */

import {
  component$,
  useComputed$,
  useSignal,
  $,
  type QRL,
} from "@builder.io/qwik";
import { getItemImageUrl } from "~/entities/item/api/ddragon";
import type { Item } from "~/entities/item/model/types";
import { items } from "../model/data";
import { stripHtmlTags } from "../model/description";
import { isInventoryFull } from "../model/inventory";

export interface ItemSidebarProps {
  inventory: (Item | null)[];
  onItemAdd$: QRL<(item: Item) => void>;
}

export const ItemSidebar = component$<ItemSidebarProps>((props) => {
  const hoveredItemData = useSignal<{
    item: Item;
    x: number;
    y: number;
  } | null>(null);

  // Check if inventory is full
  const inventoryFull = useComputed$(() => {
    return isInventoryFull(props.inventory);
  });

  const handleItemClick = $((item: Item) => {
    if (!inventoryFull.value) {
      props.onItemAdd$(item);
    }
  });

  const handlePointerEnter = $((event: PointerEvent, item: Item) => {
    if (event.pointerType === "touch") return;
    const element = event.target as HTMLElement;
    const button = element.closest("button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.right + 8 + 320 > window.innerWidth ? rect.left - 320 - 8 : rect.right + 8;
    const tooltipMaxHeight = window.innerHeight * 0.6;
    const y = rect.top + tooltipMaxHeight > window.innerHeight ? Math.max(8, window.innerHeight - tooltipMaxHeight - 8) : rect.top;

    hoveredItemData.value = { item, x, y };
  });

  const handlePointerLeave = $(() => {
    hoveredItemData.value = null;
  });

  return (
    <div class="h-full relative flex flex-col">
      <div class="bg-surface text-text rounded-lg shadow-2xl flex flex-col relative border border-accent overflow-hidden flex-1 min-h-0 h-full p-3">
        <div class="p-4 grid gap-2 overflow-y-auto justify-items-center grid-cols-4 sm:grid-cols-5 md:grid-cols-7">
          {items.map((item) => (
            <div key={item.id} class="group relative flex flex-col items-center p-0.5">
              <button
                type="button"
                disabled={inventoryFull.value}
                aria-label={item.name}
                onClick$={() => handleItemClick(item)}
                onPointerEnter$={(e) => handlePointerEnter(e, item)}
                onPointerLeave$={handlePointerLeave}
                class={`
                  overflow-hidden transition-all shadow-sm flex items-center justify-center p-0 w-12 h-12 rounded-md cursor-pointer
                  ${inventoryFull.value ? "bg-surface-hover cursor-not-allowed opacity-50 border border-transparent" : "bg-surface-hover border border-accent hover:border-active hover:scale-110 active:scale-95"}
                `}
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
            </div>
          ))}
        </div>
      </div>

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
