# Implementation Plan: Item List Redesign

**Branch**: `002-redesign-item-list` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-redesign-item-list/spec.md`

## Summary

Redesign the item sidebar from a vertical text-based list to a dense, icon-only N×M grid. Remove the search input and section title. Add a CSS hover tooltip (via basecoat-css `data-tooltip`) showing item name and description. Preserve click-to-add-to-inventory functionality. Touch devices skip tooltip and trigger the action directly on tap.

## Technical Context

**Language/Version**: TypeScript 5.4.5 (Qwik JS v1.19.2)
**Primary Dependencies**: Qwik, Qwik City, Tailwind CSS v4.2.2, Basecoat CSS v0.3.11, Vite 7.3.1
**Storage**: N/A (static JSON data from `src/data/items.json`, 253 items)
**Testing**: Skipped per constitution (no test gates)
**Target Platform**: Web (desktop + mobile/tablet), SSR via Bun
**Project Type**: Web application (Qwik frontend with BFF)
**Performance Goals**: Tooltip appears within 100ms of hover (SC-003); 50%+ increase in visible items without scrolling (SC-002)
**Constraints**: Tooltip must stay within viewport (FR-007); touch devices must bypass tooltip via `@media (hover: hover)` (FR-008); custom Qwik tooltip component required — basecoat `data-tooltip` is single-line/plain-text only (see research.md R1)
**Scale/Scope**: 253 items displayed in a single grid; single feature modification within existing FSD structure

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Dual-Stack Separation**: This feature is frontend-only (Qwik). No Go backend changes. No cross-stack coupling introduced. ✅
- [x] **II. Data, Transformation, Actions**: Item entity is pure Data (types.ts). `filterItemsByName` is a pure Transformation. Click handlers are Actions. The redesign removes the filter usage but does not mix categories. ✅
- [x] **III. Cloud Events**: No state changes are persisted; this is a UI-only layout change. No events needed. ✅
- [x] **IV. Low Coupling, High Cohesion**: Changes are scoped to `features/item-build/ui/item-sidebar.tsx`. The entity layer (`entities/item/`) remains unchanged. No new cross-module dependencies. ✅
- [x] **V. MVP-First Development**: Smallest viable slice: replace sidebar layout + add tooltip. No speculative abstractions. ✅
- [x] **VI. Feature-Sliced Design (FSD)**: All changes stay within `features/item-build/`. No `shared/` directory used. ✅

**Pre-Phase 0 Gate Result**: PASS — No violations detected.

### Post-Phase 1 Re-evaluation

- [x] **I. Dual-Stack Separation**: No changes — still frontend-only. ✅
- [x] **II. Data, Transformation, Actions**: New `stripHtmlTags()` in `description.ts` is a pure Transformation (no I/O, deterministic). `HoveredItemState` signal is component-local Action state. No mixed-category files. ✅
- [x] **III. Cloud Events**: N/A — no persistent state changes. ✅
- [x] **IV. Low Coupling, High Cohesion**: New `description.ts` has single responsibility (tag stripping). No new cross-module deps. Entity layer untouched. ✅
- [x] **V. MVP-First**: Plain-text tooltip is smallest viable slice. Rich rendering deferred. Dead code cleanup deferred. ✅
- [x] **VI. FSD**: All new code in `features/item-build/` (model + ui). No `shared/` directory. Deps flow inward: `features/item-build` → `entities/item`. ✅

**Post-Design Gate Result**: PASS — No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/002-redesign-item-list/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
web/src/
├── app/
│   └── config/build-context.ts       # BuildState context (unchanged)
├── routes/
│   └── index.tsx                     # Route entry (unchanged)
├── pages/
│   └── build-planner/                # Page composition (unchanged)
├── widgets/
│   └── build-workspace/
│       └── ui/page-layout.tsx        # Grid layout (unchanged)
├── features/
│   └── item-build/
│       ├── index.ts                  # Barrel export (unchanged)
│       ├── model/
│       │   ├── data.ts               # Item data loader (unchanged)
│       │   ├── filters.ts            # filterItemsByName (may become unused)
│       │   └── inventory.ts          # Inventory helpers (unchanged)
│       └── ui/
│           ├── item-sidebar.tsx      # *** PRIMARY CHANGE TARGET ***
│           └── item-inventory.tsx    # 6-slot inventory (unchanged)
├── entities/
│   └── item/
│       ├── index.ts                  # Barrel (unchanged)
│       ├── model/types.ts            # Item interface (unchanged)
│       └── api/ddragon.ts            # Image URL builder (unchanged)
└── data/
    └── items.json                    # 253 items (unchanged)
```

**Structure Decision**: Frontend-only changes within the existing FSD `features/item-build/` slice. The primary modification is `item-sidebar.tsx`. No new directories or modules needed. The `filters.ts` module may become dead code since search is removed, but cleanup is deferred to avoid scope creep (MVP-first).

## Complexity Tracking

> No constitution violations detected. Table left empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *(none)*  | —          | —                                   |
