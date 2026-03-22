import { component$, type Signal, type PropFunction, $ } from '@builder.io/qwik';
import champions from '~/data/champions.json';
import { getChampionImageUrl, ChampionListItem, type Champion } from '~/entities/champion';

interface SelectChampionModalProps {
  isOpen: Signal<boolean>;
  onSelect$: PropFunction<(champion: Omit<Champion, "avatarUrl">) => void>;
}

export const SelectChampionModal = component$<SelectChampionModalProps>((props) => {
  const handleClose = $(() => {
    props.isOpen.value = false;
  });

  if (!props.isOpen.value) return null;

  return (
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick$={(e) => {
        // Close if click is on the backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      window:onKeyDown$={(e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      }}
    >
      <div class="relative bg-surface rounded-lg shadow-2xl max-w-[90vw] max-h-[85vh] w-full border border-accent overflow-hidden flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-accent bg-surface-hover shrink-0">
          <h2 class="text-xl font-bold text-text">Select Champion</h2>
          <button
            type="button"
            onClick$={handleClose}
            class="text-text/60 hover:text-text p-1 hover:bg-surface-hover rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 justify-items-center">
          {champions.map((champ) => (
            <ChampionListItem
              key={champ.id}
              id={champ.id}
              name={champ.name}
              avatarUrl={getChampionImageUrl(champ.image)}
              onClick$={$(() => {
                props.onSelect$(champ);
                props.isOpen.value = false;
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
