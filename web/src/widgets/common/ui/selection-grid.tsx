import { component$, Slot } from "@builder.io/qwik";

interface SelectionGridProps {
  title?: string;
  gridCols?: string;
  class?: string;
}

export const SelectionGrid = component$<SelectionGridProps>((props) => {
  return (
    <div
      class={`bg-surface text-text rounded-lg shadow-2xl flex flex-col relative border border-accent overflow-hidden ${props.class || ""}`}
    >
      {props.title && (
        <div class="flex justify-between items-center p-4 border-b border-accent bg-surface-hover shrink-0">
          <h2 class="text-xl font-bold">{props.title}</h2>
          <Slot name="header-actions" />
        </div>
      )}
      <div
        class={`p-4 grid gap-2 overflow-y-auto justify-items-center ${props.gridCols || "grid-cols-4 sm:grid-cols-5 md:grid-cols-7"}`}
      >
        <Slot />
      </div>
    </div>
  );
});
