import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BuildPlannerPage } from "~/pages/build-planner";

export default component$(() => {
  return <BuildPlannerPage />;
});

export const head: DocumentHead = {
  title: "Champion Build Planner",
  meta: [
    {
      name: "description",
      content:
        "Plan your League of Legends build with stats and gold progression",
    },
  ],
};
