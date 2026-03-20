import { component$, useContextProvider, useStore, useSignal, $ } from "@builder.io/qwik";
import {
  BuildContext,
  createInitialBuildState,
} from "~/app/config/build-context";
import { PageLayout } from "~/widgets/build-workspace";
import { ChampionSelectBoard } from "~/widgets/champion-select-board";
import { SelectChampionModal } from "~/features/select-champion";
import { getChampionImageUrl, type Champion } from "~/entities/champion";
import { ItemSidebar, ItemInventory } from "~/features/item-build";
import { RunePage } from "~/features/rune-config";
import { BuildChart } from "~/features/stat-chart";

export const BuildPlannerPage = component$(() => {
  const buildState = useStore(createInitialBuildState());
  const isModalOpen = useSignal(false);
  
  useContextProvider(BuildContext, buildState);

  const handleSelectChampion = $((champ: Omit<Champion, "avatarUrl">) => {
    buildState.selectedChampion = {
      ...champ,
      avatarUrl: getChampionImageUrl(champ.image),
    };
  });

  return (
    <>
      <PageLayout>
        <ChampionSelectBoard q:slot="champion-board" isOpen={isModalOpen} />
        <ItemSidebar q:slot="item-sidebar" />
        <ItemInventory q:slot="inventory" />
        <RunePage q:slot="rune-page" />
        <BuildChart q:slot="chart" />
      </PageLayout>
      
      <SelectChampionModal
        isOpen={isModalOpen}
        onSelect$={handleSelectChampion}
      />
    </>
  );
});
