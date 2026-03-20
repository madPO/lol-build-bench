import { component$ } from '@builder.io/qwik';

export const EmptyRuneState = component$(() => {
  return (
    <div class="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50 text-gray-400 max-w-sm text-center">
      <div class="text-4xl mb-4 grayscale opacity-50">✨</div>
      <p class="text-sm font-medium">No branches selected</p>
      <p class="text-xs mt-2 text-gray-600">Choose a primary and secondary branch on the left to see available runes for your build.</p>
    </div>
  );
});
