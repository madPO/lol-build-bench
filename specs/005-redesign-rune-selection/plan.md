# Implementation Plan: Redesign Rune Selection Section

**Branch**: `005-redesign-rune-selection` | **Date**: Fri Mar 20 2026 | **Spec**: [/workspace/specs/005-redesign-rune-selection/spec.md](/workspace/specs/005-redesign-rune-selection/spec.md)
**Input**: Feature specification from `/workspace/specs/005-redesign-rune-selection/spec.md`

## Summary

Redesign the rune selection UI to feature a two-column layout. The left column displays rune branch icons with tooltips on hover, allowing users to select one primary and one secondary branch. Clicking a third branch replaces the secondary branch, and clicking a selected branch deselects it. The right column displays the specific runes corresponding to the selected branches, or an empty state placeholder if no branches are selected.

## Technical Context

**Language/Version**: TypeScript 5.4.5, Node/Bun (Qwik JS 1.19.2)
**Primary Dependencies**: Qwik JS, Qwik City, Tailwind CSS (v4.2.2), Basecoat CSS (v0.3.11)
**Storage**: N/A (Client-side transient state via Qwik context)
**Testing**: Skipped (per constitution)
**Target Platform**: Web browser
**Project Type**: Web Application Frontend
**Performance Goals**: Instant UI updates upon selection without page reloads
**Constraints**: FSD architecture, MVP-first delivery
**Scale/Scope**: UI component update, transient state management

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-stack boundary respected (no direct DB access from Qwik BFF, no HTML serving from Go backend)
- [x] Code categorized as Data, Transformation, or Action
- [x] State changes expressed as CloudEvents; persistence is event-driven (If applicable to transient UI state, though UI-only interactions might not be fully persisted as domain events immediately until "saved")
- [x] No circular dependencies; modules have single responsibility
- [x] Feature delivers smallest viable slice (MVP-first)
- [x] Frontend follows Feature-Sliced Design (FSD) architecture (NO shared directory)

## Project Structure

### Documentation (this feature)

```text
specs/005-redesign-rune-selection/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
web/src/
├── app/
├── pages/     # or routes/
├── widgets/
│   └── rune-selection/      # Coordinates branches and runes UI
├── features/
│   └── select-rune-branch/  # Logic for primary/secondary selection
└── entities/
    ├── rune-branch/         # Rune branch model and UI components
    └── rune/                # Individual rune model and UI components
```

**Structure Decision**: Web application frontend following Feature-Sliced Design (FSD). The `rune-selection` widget will compose the `select-rune-branch` feature and entities (`rune-branch`, `rune`).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
