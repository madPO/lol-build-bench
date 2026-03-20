/**
 * PageLayout Component
 * 3-row grid layout for the Champion Build Planner
 * Row 1: Item sidebar (spans 2 rows) + Champion select/stats
 * Row 2: Item sidebar (continued) + Inventory + Rune page
 * Row 3: Build chart (full width)
 */

import { component$, Slot } from "@builder.io/qwik";

export interface PageLayoutProps {
  "data-testid"?: string;
}

export const PageLayout = component$<PageLayoutProps>(({ ...props }) => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-50 p-4" {...props}>
      {/* Main compact grid container with dynamic row heights */}
      <div class="grid grid-cols-[auto_auto_1fr] grid-rows-[min-content_1fr_1fr] gap-2 h-full w-full">
        {/* Column 1, Row 1-2: Item Sidebar */}
        <div class="col-start-1 col-span-1 row-start-1 row-span-2 overflow-hidden h-full min-w-[320px] max-w-[400px]">
          <Slot name="item-sidebar" />
        </div>

        {/* Column 2-3, Row 1: Champion Selection Board */}
        <div class="col-start-2 col-span-2 row-start-1 row-span-1 overflow-hidden h-full">
          <Slot name="champion-board" />
        </div>

        {/* Column 2, Row 2: Inventory */}
        <div class="col-start-2 col-span-1 row-start-2 row-span-1 overflow-hidden h-full">
          <Slot name="inventory" />
        </div>

        {/* Column 3, Row 2: Runes */}
        <div class="col-start-3 col-span-1 row-start-2 row-span-1 overflow-hidden h-full">
          <Slot name="rune-page" />
        </div>

        {/* Column 1-3, Row 3: Chart */}
        <div class="col-start-1 col-span-3 row-start-3 row-span-1 overflow-hidden h-full">
          <Slot name="chart" />
        </div>
      </div>
    </div>
  );
});
