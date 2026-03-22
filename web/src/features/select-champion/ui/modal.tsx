import {
  component$,
  type Signal,
  type PropFunction,
  $,
} from "@builder.io/qwik";
import champions from "~/data/champions.json";
import { getChampionImageUrl, type Champion } from "~/entities/champion";
import { SelectionGrid, SelectionItem, IconButton } from "~/widgets/common/ui";

interface SelectChampionModalProps {
  isOpen: Signal<boolean>;
  onSelect$: PropFunction<(champion: Omit<Champion, "avatarUrl">) => void>;
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
          // Close if click is on the backdrop
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
        <SelectionGrid
          title="Select Champion"
          class="max-w-[90vw] max-h-[85vh] w-full"
          gridCols="grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
        >
          <IconButton
            q:slot="header-actions"
            ariaLabel="Close modal"
            onClick$={handleClose}
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>

          {champions.map((champ) => (
            <SelectionItem
              key={champ.id}
              size="lg"
              ariaLabel={champ.name}
              tooltipText={champ.name}
              onClick$={$(() => {
                props.onSelect$(champ);
                props.isOpen.value = false;
              })}
            >
              <img
                src={getChampionImageUrl(champ.image)}
                alt={champ.name}
                class="w-full h-full object-cover"
                width={64}
                height={64}
                loading="lazy"
              />
            </SelectionItem>
          ))}
        </SelectionGrid>
      </div>
    );
  },
);
