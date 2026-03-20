import { component$, $, useContext, type Signal } from '@builder.io/qwik';
import { ChampionAvatar, ChampionStatsDisplay } from '~/entities/champion';
import { BuildContext } from '~/app/config/build-context';

interface ChampionSelectBoardProps {
  isOpen: Signal<boolean>;
}

export const ChampionSelectBoard = component$<ChampionSelectBoardProps>((props) => {
  const buildState = useContext(BuildContext);

  const handleOpenModal = $(() => {
    props.isOpen.value = true;
  });

  return (
    <div class="flex flex-col sm:flex-row gap-4 p-4 bg-white/80 backdrop-blur border border-gray-200 rounded-xl items-center sm:items-stretch min-h-[144px] w-full">
      <div class="flex flex-col gap-2 shrink-0">
        <ChampionAvatar
          avatarUrl={buildState.selectedChampion?.avatarUrl}
          name={buildState.selectedChampion?.name}
          onClick$={handleOpenModal}
        />
        {buildState.selectedChampion && (
          <div class="text-center font-bold text-gray-800 text-[11px] uppercase tracking-wider truncate max-w-[128px]">
            {buildState.selectedChampion.name}
          </div>
        )}
      </div>

      <div class="flex-1 w-full flex flex-col justify-center min-h-[128px]">
        {buildState.selectedChampion ? (
          <ChampionStatsDisplay stats={buildState.selectedChampion.stats} />
        ) : (
          <div class="h-full flex items-center justify-center text-gray-400 italic text-[11px] border border-dashed border-gray-100 rounded-md p-4 text-center">
            Click avatar to select champion
          </div>
        )}
      </div>
    </div>
  );
});
