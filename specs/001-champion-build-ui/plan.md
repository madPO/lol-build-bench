# Implementation Plan: Champion Build Planner UI

**Branch**: `001-champion-build-ui` | **Date**: 2026-03-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-champion-build-ui/spec.md`

## Summary

Build a single-page Champion Build Planner in the existing Qwik frontend (`./web`) using Basecoat (CSS component library on Tailwind CSS) for UI components. The page presents a 3-row layout with an items sidebar spanning rows 1-2. Users select a champion (row 1, right), browse/add items to a 6-slot inventory (row 2, left area + sidebar), configure runes (row 2, right), and view a stat-over-gold-spent chart (row 3). All data is static (bundled JSON). No backend interaction. Session-only state.

## Technical Context

**Language/Version**: TypeScript 5.4.5 (Qwik JS v1.19.2)
**Primary Dependencies**: Qwik, Qwik City, Basecoat CSS (basecoat-css), Tailwind CSS, charting library (TBD in research)
**Storage**: N/A (no persistence; in-memory session state only)
**Testing**: Skipped (per constitution — testing deferred)
**Target Platform**: Modern web browsers, desktop screens 1024px+ width
**Project Type**: Web application (frontend-only single-page feature)
**Performance Goals**: Page interactive within 3 seconds; chart updates within 1 second of build change
**Constraints**: No backend calls; all champion/item/rune data bundled as static JSON; Bun as sole JS runtime and package manager
**Scale/Scope**: Single page, ~160+ champions, ~200+ items, ~60+ runes (League of Legends dataset)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Verdict | Notes |
|-----------|---------|-------|
| I. Dual-Stack Separation | **PASS** | Feature is frontend-only, contained in `./web`. No backend code touched. Go API boundary respected. |
| II. Data, Transformation, Actions | **PASS** | Will organize code into: Data (static JSON, typed interfaces), Transformations (pure stat calculation functions), Actions (user event handlers, state updates). |
| III. CloudEvents & Event-Driven Persistence | **N/A** | No persistence in this feature. State is session-only in-memory. No events stored or replayed. If future persistence is added, events will be introduced then. |
| IV. Low Coupling, High Cohesion | **PASS** | Each module (champion select, item inventory, rune page, chart) has single responsibility. Data flows inward. No circular dependencies. |
| V. MVP-First Development | **PASS** | User stories are prioritized P1-P4. Will ship champion select first as smallest viable slice, then layer items, runes, chart. |
| Technology Stack | **PASS** | Uses Qwik JS + Bun (required). Adds Basecoat CSS (framework-agnostic CSS library, compatible with Qwik). Adds Tailwind CSS (required by Basecoat). |

**Gate Result**: All gates pass. No violations. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-champion-build-ui/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
web/
├── package.json
├── bun.lock
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── manifest.json, favicon.svg, robots.txt
└── src/
    ├── root.tsx
    ├── entry.ssr.tsx
    ├── global.css                    # Tailwind + Basecoat imports
    ├── data/                         # Data layer (static JSON + types)
    │   ├── champions.json            # Champion dataset
    │   ├── items.json                # Item dataset
    │   ├── runes.json                # Rune dataset
    │   └── types.ts                  # TypeScript interfaces for all entities
    ├── transformations/              # Pure functions (no side effects)
    │   ├── stats.ts                  # Stat calculation: base + items + runes
    │   ├── chart.ts                  # Chart data preparation (gold vs stat points)
    │   └── filters.ts               # Search/filter logic for champions and items
    ├── components/                   # UI components (Actions + presentation)
    │   ├── champion-select/          # Champion browsing and selection
    │   ├── champion-stats/           # Selected champion stat display
    │   ├── item-sidebar/             # Items browsing sidebar (spans rows 1-2)
    │   ├── item-inventory/           # 6-slot inventory display
    │   ├── rune-page/                # Rune category selection
    │   ├── build-chart/              # Stat-over-gold chart
    │   └── layout/                   # Page grid layout shell
    └── routes/
        └── index.tsx                 # Main page route (composes all components)
```

**Structure Decision**: Single frontend project in existing `web/` directory. Code organized by the Data/Transformation/Action principle from the constitution. Components are Actions (they handle user events and orchestrate state), `data/` holds Data (plain typed interfaces and static JSON), `transformations/` holds pure functions. No backend directory needed for this feature.

## Post-Design Constitution Re-Check

| Principle | Verdict | Post-Design Notes |
|-----------|---------|-------------------|
| I. Dual-Stack Separation | **PASS** | All code in `web/`. No backend touched. No Go code. No BFF server routes used. |
| II. Data, Transformation, Actions | **PASS** | Explicitly separated: `data/` (Data — types + JSON), `transformations/` (pure functions), `components/` (Actions — event handlers). No mixed-category files. |
| III. CloudEvents | **N/A** | No persistence. No state changes stored. Consistent with pre-design assessment. |
| IV. Low Coupling, High Cohesion | **PASS** | Components communicate only through `BuildContext` (narrow interface). Each component has single responsibility. Dependency: components → context → transformations → data. No circular deps. |
| V. MVP-First | **PASS** | P1-P4 priority ordering enables incremental delivery. P1 (champion select) is independently deployable MVP. |
| Technology Stack | **PASS** | Qwik + Bun confirmed. Basecoat CSS and uPlot are additive — neither replaces or conflicts with mandated tech. |

**Post-design gate: PASS. No violations. No complexity tracking needed.**
