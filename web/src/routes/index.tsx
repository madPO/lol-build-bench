/**
 * Champion Build Planner - Main Page Route
 * Provides BuildContext and composes all UI components
 */

import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BuildContext, createInitialBuildState } from "../context/build-context";
import { PageLayout } from "../components/layout/page-layout";
import { ChampionSelect } from "../components/champion-select/champion-select";
import { ChampionStats } from "../components/champion-stats/champion-stats";
import { ItemSidebar } from "../components/item-sidebar/item-sidebar";
import { ItemInventory } from "../components/item-inventory/item-inventory";
import { RunePage } from "../components/rune-page/rune-page";
import { BuildChart } from "../components/build-chart/build-chart";

export default component$(() => {
  // Create and provide the build state context
  const buildState = useStore(createInitialBuildState());
  useContextProvider(BuildContext, buildState);

  return (
    <PageLayout>
      <ChampionSelect q:slot="champion-select" />
      <ChampionStats q:slot="champion-stats" />
      <ItemSidebar q:slot="item-sidebar" />
      <ItemInventory q:slot="inventory" />
      <RunePage q:slot="rune-page" />
      <BuildChart q:slot="chart" />
    </PageLayout>
  );
});

export const head: DocumentHead = {
  title: "Champion Build Planner",
  meta: [
    {
      name: "description",
      content: "Plan your League of Legends build with stats and gold progression",
    },
  ],
};
