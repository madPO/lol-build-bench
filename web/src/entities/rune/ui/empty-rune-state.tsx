import { component$ } from "@builder.io/qwik";

export const EmptyRuneState = component$(() => {
  return (
    <div class="flex flex-col items-center justify-center p-8 border border-dashed border-accent rounded-lg bg-surface-hover text-text/50 max-w-sm text-center">
      <div class="text-4xl mb-4 grayscale opacity-50">✨</div>
      <p class="text-sm font-medium text-text">No branches selected</p>
      <p class="text-xs mt-2 text-text/70">
        Choose a primary and secondary branch on the left to see available runes
        for your build.
      </p>
    </div>
  );
});
