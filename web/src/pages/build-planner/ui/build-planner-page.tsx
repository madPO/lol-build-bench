import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import {
  BuildContext,
  createInitialBuildState,
} from "~/app/config/build-context";
import { PageLayout } from "~/widgets/build-workspace";
import { ChampionSelect } from "~/features/champion-select";
import { ChampionStatsCard } from "~/entities/champion";
import { ItemSidebar, ItemInventory } from "~/features/item-build";
import { RunePage } from "~/features/rune-config";
import { BuildChart } from "~/features/stat-chart";

export const BuildPlannerPage = component$(() => {
  const buildState = useStore(createInitialBuildState());
  useContextProvider(BuildContext, buildState);

  return (
    <PageLayout>
      <ChampionSelect q:slot="champion-select" />
      <ChampionStatsCard q:slot="champion-stats" />
      <ItemSidebar q:slot="item-sidebar" />
      <ItemInventory q:slot="inventory" />
      <RunePage q:slot="rune-page" />
      <BuildChart q:slot="chart" />
    </PageLayout>
  );
});
