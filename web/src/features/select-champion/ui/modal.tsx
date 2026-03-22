import {
  component$,
  type Signal,
  type QRL,
  $,
} from "@builder.io/qwik";
import champions from "~/data/champions.json";
import { getChampionImageUrl, type Champion } from "~/entities/champion";

interface SelectChampionModalProps {
  isOpen: Signal<boolean>;
  onSelect$: QRL<(champion: Omit<Champion, "avatarUrl">) => void>;
}

export const SelectChampionModal = component$<SelectChampionModalProps>(
  (props) => {
    const handleClose = $(() => {
      props.isOpen.value = false;
    });

    if (!props.isOpen.value) return null;

    return (
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick$={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
        window:onKeyDown$={(e) => {
          if (e.key === "Escape") {
            handleClose();
          }
        }}
      >
        <div class="bg-surface text-text rounded-lg shadow-2xl flex flex-col relative border border-accent overflow-hidden max-w-[90vw] max-h-[85vh] w-full">
          <div class="flex justify-between items-center p-4 border-b border-accent bg-surface-hover shrink-0">
            <h2 class="text-xl font-bold">Select Champion</h2>
            <button
              type="button"
              onClick$={handleClose}
              aria-label="Close modal"
              class="text-text/60 hover:text-text p-1 hover:bg-surface-hover rounded-full transition-colors"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4 grid gap-2 overflow-y-auto justify-items-center grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {champions.map((champ) => (
              <div key={champ.id} class="group relative flex flex-col items-center p-0.5">
                <button
                  type="button"
                  aria-label={champ.name}
                  onClick$={$(() => {
                    props.onSelect$(champ);
                    props.isOpen.value = false;
                  })}
                  class="overflow-hidden transition-all shadow-sm flex items-center justify-center p-0 w-16 h-16 rounded-md cursor-pointer bg-surface-hover border border-accent hover:border-active hover:scale-110 active:scale-95"
                >
                  <img
                    src={getChampionImageUrl(champ.image)}
                    alt={champ.name}
                    class="w-full h-full object-cover"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                </button>
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-surface text-text text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-md border border-accent">
                  {champ.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
