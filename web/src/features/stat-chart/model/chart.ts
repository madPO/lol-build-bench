import type { Champion } from "~/entities/champion";
import type { Item } from "~/entities/item";
import { computeStats } from "./stats";

/** A single data point on the stat-over-gold chart */
export interface ChartDataPoint {
  cumulativeGold: number;
  stats: Record<string, number>;
}

/** Data structure for uPlot consumption */
export interface ChartSeries {
  goldValues: number[];
  statSeries: Record<string, number[]>;
}

/**
 * Generates chart data showing stat progression as items are added
 * X-axis: cumulative gold spent
 * Y-axis: stat values
 * @param champion - Selected champion
 * @param items - Array of 6 items (in addition order)
 * @returns Chart series data for uPlot
 */
export function computeChartData(
  champion: Champion | null,
  items: (Item | null)[],
): ChartSeries {
  if (!champion) {
    return {
      goldValues: [],
      statSeries: {},
    };
  }

  const dataPoints: ChartDataPoint[] = [];

  // Starting point: base stats at 0 gold
  const emptyItems: (Item | null)[] = [null, null, null, null, null, null];
  const baseStats = computeStats(champion, emptyItems);
  dataPoints.push({
    cumulativeGold: 0,
    stats: { ...baseStats },
  });

  // Add data points for each item
  let cumulativeGold = 0;
  const itemsWithStats: (Item | null)[] = [...emptyItems];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item) continue;

    cumulativeGold += item.gold.total;
    itemsWithStats[i] = item;

    const statsAtGold = computeStats(champion, itemsWithStats);
    dataPoints.push({
      cumulativeGold,
      stats: { ...statsAtGold },
    });
  }

  // Convert to uPlot format
  return convertToChartSeries(dataPoints);
}

/**
 * Converts data points to uPlot-compatible series format
 * @param dataPoints - Array of chart data points
 * @returns Chart series with separate arrays per stat
 */
function convertToChartSeries(dataPoints: ChartDataPoint[]): ChartSeries {
  if (dataPoints.length === 0) {
    return {
      goldValues: [],
      statSeries: {},
    };
  }

  // Extract gold values (x-axis)
  const goldValues = dataPoints.map((p) => p.cumulativeGold);

  // Determine which stats to show (those that change)
  const statKeys = new Set<string>();
  for (const point of dataPoints) {
    for (const key of Object.keys(point.stats)) {
      statKeys.add(key);
    }
  }

  // Build series for each stat
  const statSeries: Record<string, number[]> = {};
  for (const statKey of statKeys) {
    statSeries[statKey] = dataPoints.map((p) => p.stats[statKey] || 0);
  }

  return {
    goldValues,
    statSeries,
  };
}

/**
 * Determines which stats are most important to display on the chart
 * Prioritizes stats that vary significantly across items
 * @param statSeries - All stat series data
 * @returns Array of stat keys to highlight
 */
export function getRelevantStats(
  statSeries: Record<string, number[]>,
): string[] {
  // For now, return common stats in priority order
  const priority = [
    "attackdamage",
    "armor",
    "spellblock",
    "hp",
    "movespeed",
    "attackspeed",
  ];
  return priority.filter((stat) => stat in statSeries);
}
