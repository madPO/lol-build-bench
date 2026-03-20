/** Data Dragon CDN configuration */
export const DDRAGON_VERSION = "16.6.1";
const DDRAGON_BASE = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img`;

export function getItemImageUrl(image: string): string {
  return `${DDRAGON_BASE}/item/${image}`;
}
