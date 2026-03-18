# Research: Champion Build Planner UI

**Feature**: `001-champion-build-ui` | **Date**: 2026-03-18

## R1: UI Component Library — Basecoat CSS

**Decision**: Use Basecoat CSS (`basecoat-css` npm package) as the UI component library.

**Rationale**: User explicitly requested Basecoat. It is framework-agnostic (CSS classes + Tailwind CSS), fully compatible with Qwik. Provides 37 components including cards, buttons, inputs, selects, tabs, badges, and dialogs — covering all UI needs for champion select, item inventory, and rune page. Minimal JS footprint (~3 KB gzipped for 6 interactive components). Supports dark mode and theming via CSS variables. Follows shadcn/ui design language.

**Alternatives considered**:
- shadcn/ui: React-only, incompatible with Qwik without significant adaptation
- DaisyUI: Tailwind-based, but heavier and less aligned with shadcn/ui aesthetics
- Custom CSS: More work, no pre-built component patterns

**Integration approach**:
- Install: `bun add -d basecoat-css tailwindcss`
- Import in `global.css`: `@import "tailwindcss"; @import "basecoat-css";`
- Use Basecoat CSS classes directly in Qwik component markup (e.g., `class="btn"`, `class="card"`, `class="input"`)

## R2: Charting Library — uPlot

**Decision**: Use uPlot for the stat-over-gold chart.

**Rationale**: Smallest bundle size (~8 KB gzipped) among viable options. Canvas-based, high performance. Designed for numeric/time-series data — ideal for gold (x-axis) vs stat values (y-axis). Supports multi-series line/area charts. Purely imperative API integrates cleanly with Qwik via `useVisibleTask$`. No framework wrapper needed.

**Alternatives considered**:
- Chart.js (~70 KB gzip): Richer out-of-box experience but 9x larger bundle. Overkill for a single line chart.
- Apache ECharts (~300 KB gzip): Feature-rich but extremely heavy. Inappropriate for lightweight frontend.
- Frappe Charts (~17 KB gzip): Unmaintained since 2022. Maintenance risk.
- Plotly.js (~1 MB gzip): Scientific-grade, massive bundle. Completely overkill.

**Integration approach**:
- Install: `bun add uplot`
- Create chart component using `useVisibleTask$` to instantiate uPlot on a `<div>` container
- Use `track()` to react to build state changes, call `chart.setData()` for updates
- Use `cleanup()` callback to call `chart.destroy()` on unmount
- Configure with `scales: { x: { time: false } }` for numeric gold x-axis

## R3: Game Data Source — Riot Data Dragon

**Decision**: Use Riot's Data Dragon (DDragon) as the static data source for champions, items, and runes. Download and bundle at build time.

**Rationale**: Official Riot-maintained CDN. No API key required. No rate limits (static files). Provides all needed data: champion base stats with per-level growth, item stats with gold costs, rune trees with slots. Covers ~160+ champions, ~200+ items, ~60 runes. Core JSON data compresses to ~200-300 KB gzipped.

**Alternatives considered**:
- Community Dragon (CDragon): Richer cosmetic data, PBE access, but community-maintained with potential availability concerns. Not needed since DDragon covers all required data.
- Hardcoded data: Too fragile, impossible to maintain across game patches.
- Runtime API calls: Spec requires frontend-only with static bundled data. No backend.

**Data files and URLs**:
- Version discovery: `https://ddragon.leagueoflegends.com/api/versions.json`
- Champions: `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json`
- Items: `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/item.json`
- Runes: `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/runesReforged.json`
- Champion icons: `https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{name}.png`
- Item icons: `https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{id}.png`
- Rune icons: `https://ddragon.leagueoflegends.com/cdn/img/{icon_path}`

**Bundling strategy**: Build-time script fetches latest DDragon JSON, prunes unused fields (lore, tips, recommended), and saves to `web/src/data/`. Images referenced via DDragon CDN URLs at runtime (no local image hosting needed).

**Champion stat formula**: `stat_at_level = base + growth * (level - 1) * (0.7025 + 0.0175 * (level - 1))`

## R4: State Management — Qwik Context + Store

**Decision**: Use Qwik's built-in `createContextId` + `useStore` + `useContextProvider` / `useContext` for shared build state across all components.

**Rationale**: Qwik's built-in context API is the canonical solution for cross-component shared state. No external library needed. `useStore` provides deep reactive proxies — granular per-property tracking means only components reading a changed property re-render. Context avoids prop drilling across champion select, item inventory, rune page, and chart components.

**Alternatives considered**:
- Prop drilling: Workable but verbose for 4+ sibling components all needing the same state.
- External state libraries (e.g., zustand-like): No Qwik-compatible state management libraries exist. Built-in primitives are sufficient.
- `useSignal` only: Only holds single values, not suitable for structured build state object.

**Architecture**:
1. Define `BuildContext = createContextId<BuildState>('app.build-state')` at module scope
2. Page component (`routes/index.tsx`) calls `useContextProvider(BuildContext, useStore<BuildState>({...}))` to provide state
3. All child components call `useContext(BuildContext)` to read/mutate shared state
4. Mutations are direct property assignments (e.g., `build.champion.id = 'aatrox'`)
5. Derived data (chart computations) uses `useComputed$()` for auto-tracked synchronous derivations
6. Chart rendering uses `useVisibleTask$()` for imperative canvas library calls

**Key rules**:
- Never destructure the store (loses reactivity): always access via `build.champion.id`, not `const { champion } = build`
- Use `useComputed$` over `useTask$` for derived values
- Use `useVisibleTask$` only for browser-only DOM APIs (chart canvas)

## R5: Basecoat + Tailwind CSS Setup with Qwik

**Decision**: Add Tailwind CSS v4 and Basecoat CSS to the existing Qwik Vite project.

**Rationale**: Basecoat requires Tailwind CSS. The existing Qwik project has no CSS framework installed. Tailwind v4 uses the new CSS-first configuration (`@import "tailwindcss"`) and works with Vite out of the box via the `@tailwindcss/vite` plugin.

**Integration steps**:
1. Install: `bun add -d tailwindcss @tailwindcss/vite basecoat-css`
2. Add Tailwind Vite plugin to `vite.config.ts`
3. Update `global.css` with: `@import "tailwindcss"; @import "basecoat-css";`
4. Basecoat classes available immediately in all Qwik components
