import { component$, $, type Signal } from "@builder.io/qwik";
import { ChampionAvatar, ChampionStatsDisplay, type Champion } from "~/entities/champion";

interface ChampionSelectBoardProps {
  isOpen: Signal<boolean>;
  selectedChampion: Champion | null;
}

export const ChampionSelectBoard = component$<ChampionSelectBoardProps>(
  (props) => {
    const handleOpenModal = $(() => {
      props.isOpen.value = true;
    });

    return (
      <div class="bg-surface/80 text-text backdrop-blur border border-accent rounded-xl p-4 shadow-xl flex flex-col sm:flex-row gap-4 items-center sm:items-stretch min-h-[144px] w-full h-full">
        <div class="flex flex-col gap-2 shrink-0">
          <ChampionAvatar
            avatarUrl={props.selectedChampion?.avatarUrl}
            name={props.selectedChampion?.name}
            onClick$={handleOpenModal}
          />
          {props.selectedChampion && (
            <div class="text-center font-bold text-text text-[11px] uppercase tracking-wider truncate max-w-[128px]">
              {props.selectedChampion.name}
            </div>
          )}
        </div>

        <div class="flex-1 w-full flex flex-col justify-center min-h-[128px]">
          {props.selectedChampion ? (
            <ChampionStatsDisplay stats={props.selectedChampion.stats} />
          ) : (
            <div class="h-full flex items-center justify-center text-text/50 italic text-[11px] border border-dashed border-accent rounded-md p-4 text-center">
              Click avatar to select champion
            </div>
          )}
        </div>
      </div>
    );
  },
);
