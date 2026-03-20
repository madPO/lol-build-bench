/**
 * PageLayout Component
 * 3-row grid layout for the Champion Build Planner
 * Row 1: Champion selection (left) + Champion stats (right)
 * Row 2: Item sidebar (left, spans rows 1-2) + Inventory (left area) + Rune page (right)
 * Row 3: Build chart (full width)
 */

import { component$, Slot } from "@builder.io/qwik";

export interface PageLayoutProps {
  "data-testid"?: string;
}

export const PageLayout = component$<PageLayoutProps>(({ ...props }) => {
  return (
    <div
      class="min-h-screen bg-gray-50 p-4"
      {...props}
    >
      {/* Main grid container */}
      <div class="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Row 1 */}
        <div class="col-span-12 lg:col-span-3">
          <Slot name="champion-select" />
        </div>
        <div class="col-span-12 lg:col-span-9">
          <Slot name="champion-stats" />
        </div>

        {/* Row 2 */}
        <div class="col-span-12 lg:col-span-3">
          <Slot name="inventory" />
        </div>
        <div class="col-span-12 lg:col-span-9">
          <Slot name="rune-page" />
        </div>

        {/* Row 3 - Full width */}
        <div class="col-span-12">
          <Slot name="chart" />
        </div>

        {/* Item sidebar - positioned on left spanning rows 1-2 */}
        <div class="col-span-12 lg:col-span-3 lg:row-span-2 lg:order-first">
          <Slot name="item-sidebar" />
        </div>
      </div>
    </div>
  );
});
