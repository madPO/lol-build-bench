import { component$ } from "@builder.io/qwik";
import type { ChampionStats as IChampionStats } from "../model/types";

interface ChampionStatsProps {
  stats?: IChampionStats;
}

export const ChampionStatsDisplay = component$<ChampionStatsProps>((props) => {
  if (!props.stats) return null;

  const statItems = [
    { label: "HP", value: props.stats.hp },
    { label: "MP", value: props.stats.mp },
    { label: "Armor", value: props.stats.armor },
    { label: "MR", value: props.stats.spellblock },
    { label: "AD", value: props.stats.attackdamage },
    { label: "AS", value: props.stats.attackspeed },
    { label: "HP Reg", value: props.stats.hpregen },
    { label: "MP Reg", value: props.stats.mpregen },
    { label: "Crit", value: props.stats.crit },
    { label: "MS", value: props.stats.movespeed },
    { label: "Range", value: props.stats.attackrange },
  ];

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-0.5 text-xs sm:text-[13px] flex-1 min-h-0 py-0.5">
      {statItems.map((stat) => (
        <div key={stat.label} class="flex border-b border-accent/30 py-0">
          <span class="text-text/70 font-medium w-16 shrink-0">
            {stat.label}:
          </span>
          <span class="text-text tabular-nums font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
});
