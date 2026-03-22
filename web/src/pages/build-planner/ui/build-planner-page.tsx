import {
  component$,
  useStore,
  useSignal,
  $,
} from "@builder.io/qwik";
import {
  createInitialBuildState,
} from "~/app/config/build-context";
import { PageLayout } from "~/widgets/build-workspace";
import { ChampionSelectBoard } from "~/widgets/champion-select-board";
import { SelectChampionModal } from "~/features/select-champion";
import { getChampionImageUrl, type Champion } from "~/entities/champion";
import { ItemSidebar, ItemInventory } from "~/features/item-build";
import { RuneSelectionBoard } from "~/widgets/rune-selection/ui/rune-selection-board";
import { getAllRuneBranches } from "~/entities/rune-branch/api";
import { BuildChart } from "~/features/stat-chart";
import type { Item } from "~/entities/item/model/types";
import type { RuneSelectionState } from "~/features/select-rune-branch/model/types";
import { findFirstEmptySlot } from "~/features/item-build/model/inventory";

export const BuildPlannerPage = component$(() => {
  const buildState = useStore(createInitialBuildState(), { deep: true });
  const isModalOpen = useSignal(false);

  const branches = getAllRuneBranches();

  const handleSelectChampion = $((champ: Omit<Champion, "avatarUrl">) => {
    buildState.selectedChampion = {
      ...champ,
      avatarUrl: getChampionImageUrl(champ.image),
    };
  });

  const handleItemAdd = $((item: Item) => {
    const slot = findFirstEmptySlot(buildState.inventory);
    if (slot !== -1) {
      buildState.inventory[slot] = item;
    }
  });

  const handleItemRemove = $((index: number) => {
    buildState.inventory[index] = null;
  });

  const handleRuneConfigUpdate = $((newState: RuneSelectionState) => {
    buildState.runeConfig.primaryBranchId = newState.primaryBranchId;
    buildState.runeConfig.secondaryBranchId = newState.secondaryBranchId;
    buildState.runeConfig.primaryRuneIds = newState.primaryRuneIds;
    buildState.runeConfig.secondaryRuneIds = newState.secondaryRuneIds;
  });

  return (
    <>
      <PageLayout>
        <ChampionSelectBoard 
          q:slot="champion-board" 
          isOpen={isModalOpen} 
          selectedChampion={buildState.selectedChampion} 
        />
        <ItemSidebar 
          q:slot="item-sidebar" 
          inventory={buildState.inventory} 
          onItemAdd$={handleItemAdd} 
        />
        <ItemInventory 
          q:slot="inventory" 
          inventory={buildState.inventory} 
          onItemRemove$={handleItemRemove} 
        />
        <RuneSelectionBoard 
          q:slot="rune-page" 
          branches={branches} 
          runeConfig={buildState.runeConfig}
          onRuneConfigUpdate$={handleRuneConfigUpdate}
        />
        <BuildChart 
          q:slot="chart" 
          selectedChampion={buildState.selectedChampion}
          inventory={buildState.inventory}
        />
      </PageLayout>

      <SelectChampionModal
        isOpen={isModalOpen}
        onSelect$={handleSelectChampion}
      />
    </>
  );
});
