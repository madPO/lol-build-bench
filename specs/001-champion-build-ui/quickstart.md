# Quickstart: Champion Build Planner UI

**Feature**: `001-champion-build-ui` | **Date**: 2026-03-18

## Prerequisites

- Bun installed (sole JS runtime and package manager per constitution)
- Repository cloned with `web/` directory present (existing Qwik project)

## Setup

```bash
# Navigate to frontend project
cd web

# Install existing dependencies
bun install

# Install new dependencies for this feature
bun add -d tailwindcss @tailwindcss/vite basecoat-css
bun add uplot
```

## Development Server

```bash
cd web
bun run dev
```

Opens at `http://localhost:5173` (default Vite port).

## Build

```bash
cd web
bun run build
```

Output goes to `web/dist/` or `web/server/` depending on Qwik adapter.

## Project Structure After Implementation

```
web/src/
├── global.css                      # @import "tailwindcss"; @import "basecoat-css";
├── data/
│   ├── types.ts                    # TypeScript interfaces for all entities
│   ├── champions.json              # Static champion data (from DDragon)
│   ├── items.json                  # Static item data (from DDragon)
│   └── runes.json                  # Static rune tree data (from DDragon)
├── context/
│   └── build-context.ts            # BuildContext + BuildState type definition
├── transformations/
│   ├── stats.ts                    # computeStats() — aggregate base + items + runes
│   ├── chart.ts                    # computeChartData() — gold vs stat series
│   └── filters.ts                  # filterByName() — search/filter logic
├── components/
│   ├── champion-select/            # Champion browsing + selection
│   ├── champion-stats/             # Selected champion stat display
│   ├── item-sidebar/               # Item browsing sidebar (left column, spans rows 1-2)
│   ├── item-inventory/             # 6-slot inventory display
│   ├── rune-page/                  # Rune tree selection
│   ├── build-chart/                # uPlot stat-over-gold chart
│   └── layout/                     # Page grid layout shell
└── routes/
    └── index.tsx                   # Page route: provides BuildContext, composes layout
```

## Data Preparation

Static game data must be fetched from Riot Data Dragon and bundled before the app can function:

```bash
# Discover latest DDragon version
curl -s https://ddragon.leagueoflegends.com/api/versions.json | head -c 20
# e.g., ["16.6.1", ...]

# Download raw data (replace VERSION)
curl -o web/src/data/champions-raw.json \
  "https://ddragon.leagueoflegends.com/cdn/VERSION/data/en_US/champion.json"

curl -o web/src/data/items-raw.json \
  "https://ddragon.leagueoflegends.com/cdn/VERSION/data/en_US/item.json"

curl -o web/src/data/runes.json \
  "https://ddragon.leagueoflegends.com/cdn/VERSION/data/en_US/runesReforged.json"
```

Then run a build-time script to prune and transform the raw data into the bundled format (see data-model.md for field specifications).

## Image Assets

Champion and item icons are loaded from DDragon CDN at runtime (no local hosting):

```
Champion icon: https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{name}.png
Item icon: https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{id}.png
Rune icon: https://ddragon.leagueoflegends.com/cdn/img/{icon_path}
```

## Key Architecture Decisions

1. **State**: Single `BuildState` store via `useContextProvider` at page level. All components use `useContext(BuildContext)`.
2. **Data/Transformation/Action separation**: Static JSON + types = Data. Pure computation functions = Transformations. Components with event handlers = Actions.
3. **Chart**: uPlot instantiated via `useVisibleTask$`. Data computed via `useComputed$` from build state.
4. **UI components**: Basecoat CSS classes (e.g., `class="btn"`, `class="card"`, `class="input"`) — no JS component library imports.
5. **No backend**: All data static, no fetch calls, no server routes.

## Verification

After implementation, verify:
- Page loads with champion selection visible
- Selecting a champion shows its base stats
- Items sidebar allows search and adding to 6-slot inventory
- Rune page allows selecting primary/secondary trees and runes
- Chart displays stat progression over gold when champion + items are configured
- All Basecoat-styled components render correctly with Tailwind
