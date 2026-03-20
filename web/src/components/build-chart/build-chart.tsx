/**
 * BuildChart Component (US4)
 * Renders stat progression chart as items are added
 * Uses uPlot for efficient canvas-based rendering
 */

import { component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { BuildContext } from "../../context/build-context";
import { computeChartData, getRelevantStats } from "../../transformations/chart";
import uPlot from "uplot";

export const BuildChart = component$(() => {
  const buildState = useContext(BuildContext);
  const containerRef = useSignal<HTMLDivElement>();
  const chartInstance = useSignal<uPlot | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    // Track changes to selected champion and inventory
    track(() => buildState.selectedChampion?.id);
    track(() => buildState.inventory.map((item) => item?.id).join(","));

    if (!containerRef.value) return;

    // Generate chart data
    const chartData = computeChartData(buildState.selectedChampion, buildState.inventory);

    if (chartData.goldValues.length === 0) {
      // No data to display
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }
      return;
    }

    // Prepare data for uPlot
    const relevantStats = getRelevantStats(chartData.statSeries);
    const plotData: uPlot.AlignedData = [chartData.goldValues];

    // Add stat series
    for (const stat of relevantStats) {
      plotData.push(chartData.statSeries[stat] || []);
    }

    // Create or update chart
    const opts: uPlot.Options = {
      width: containerRef.value.clientWidth,
      height: 300,
      title: "Build Stats Progression",
      axes: [
        {
          label: "Gold Spent",
          labelSize: 30,
          side: 2,
          space: 60,
        },
        {
          label: "Stat Value",
          labelSize: 30,
          side: 3,
          space: 50,
        },
      ],
      scales: {
        x: {
          time: false,
        },
      },
      series: [
        {},
        ...relevantStats.map((stat, idx) => ({
          label: stat.charAt(0).toUpperCase() + stat.slice(1),
          stroke: getColorForStat(idx),
          fill: getColorForStat(idx) + "20", // Add transparency
        })),
      ],
      legend: {
        show: true,
      },
    };

    if (chartInstance.value) {
      chartInstance.value.setData(plotData);
      // Update size if container changed
      const newWidth = containerRef.value.clientWidth;
      if (newWidth !== opts.width) {
        chartInstance.value.setSize({ width: newWidth, height: 300 });
      }
    } else {
      chartInstance.value = new uPlot(opts, plotData, containerRef.value);
    }

    cleanup(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }
    });
  });

  if (!buildState.selectedChampion) {
    return (
      <div class="card bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Build Chart</h2>
        <div class="flex items-center justify-center py-16 text-gray-500">
          <p>Select a champion to view stat progression chart</p>
        </div>
      </div>
    );
  }

  return (
    <div class="card bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold mb-4">
        {buildState.selectedChampion.name} - Stat Progression
      </h2>
      <div ref={containerRef} class="overflow-x-auto" />
    </div>
  );
});

/**
 * Get a color for a stat based on index
 */
function getColorForStat(index: number): string {
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // purple
  ];
  return colors[index % colors.length];
}
