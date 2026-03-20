# Implementation Plan: Rework Champion Select

**Branch**: `003-rework-champion-select` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-rework-champion-select/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Combine the champion selection interface and stats display into a unified UI section without a title. It defaults to an empty avatar which opens a full-list modal on click. Selecting a champion replaces the avatar and immediately displays multi-column stats next to it, fully visible without scrolling.

## Technical Context

**Language/Version**: TypeScript 5.4.5, Qwik JS (v1.19.2)  
**Primary Dependencies**: Qwik City, Vite, Tailwind CSS (v4.2.2), Basecoat CSS (v0.3.11)
**Storage**: Static JSON data (`src/data/champions.json`)
**Testing**: Vitest (`bun test`)
**Target Platform**: Web Browser (Desktop and Mobile)
**Project Type**: Web Application Frontend
**Performance Goals**: Instant modal opening (<200ms), instant selection updates (<100ms)
**Constraints**: Feature-Sliced Design (FSD) architecture, CSS Grid for non-scrolling stats, `<dialog>` for native modal handling.
**Scale/Scope**: ~170 Champions in a single static modal list, up to 20 individual stat lines per champion.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-Stack Separation (Frontend only implementation for UI)
- [x] Data, Transformation, Actions separation (Data structures separated from UI logic)
- [x] MVP-First Development (Direct UI rework with CSS grid, no complex state libraries)
- [x] Frontend follows Feature-Sliced Design (FSD) architecture (NO shared directory)
- [x] Code categorized appropriately within FSD layers

## Project Structure

### Documentation (this feature)

```text
specs/003-rework-champion-select/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
web/
└── src/
    ├── pages/
    │   └── index.tsx (Main route containing the widget)
    ├── widgets/
    │   └── champion-select-board/
    │       ├── ui.tsx
    │       └── index.ts
    ├── features/
    │   └── select-champion/
    │       ├── ui/
    │       │   └── modal.tsx
    │       └── index.ts
    └── entities/
        └── champion/
            ├── ui/
            │   ├── avatar.tsx
            │   ├── stats.tsx
            │   └── list-item.tsx
            ├── model/
            │   └── types.ts
            └── index.ts
```

**Structure Decision**: The frontend application is nested within the `web/` directory. Within that, FSD dictates the separation into `pages` (route), `widgets` (combined layout), `features` (user interaction/modal), and `entities` (reusable atomic pieces related to business domains, e.g., champion stats, avatar, and data models). No `shared/` directory will be used.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |