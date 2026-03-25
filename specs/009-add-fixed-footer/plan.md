# Implementation Plan: 009-add-fixed-footer

**Branch**: `009-add-fixed-footer` | **Date**: 2026-03-25 | **Spec**: /specs/009-add-fixed-footer/spec.md
**Input**: Feature specification from `/specs/009-add-fixed-footer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a footer anchored to the bottom of the viewport on all application pages containing a copyright notice, a link to the project's GitHub repository, and the current patch number. Global page scrolling is strictly disabled (`h-screen overflow-hidden flex flex-col` pattern), allowing inner pages to handle their own scrolling.

## Technical Context

**Language/Version**: TypeScript 5.4.5, Qwik JS 1.19.2
**Primary Dependencies**: Vite, Tailwind CSS, Qwik City
**Storage**: N/A
**Testing**: Vitest (or N/A per Constitution)
**Target Platform**: Web Browsers (Mobile & Desktop)
**Project Type**: Web Application (Frontend)
**Performance Goals**: Minimal runtime overhead, fast loading (Qwik optimized)
**Constraints**: Zero global scrolling. No use of the `shared` directory per the Constitution.
**Scale/Scope**: Footer appears globally across all routes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-Stack Separation respected (no backend logic mixed into UI).
- [x] Code categorized as Data, Transformation, or Action (N/A for pure UI components, but UI remains pure view logic).
- [x] High Cohesion, Low Coupling (Footer is isolated inside an FSD `widget`).
- [x] MVP-First Development (Displays static values + env vars initially).
- [x] Frontend follows Feature-Sliced Design (FSD) architecture (NO `shared` directory).

## Project Structure

### Documentation (this feature)

```text
specs/009-add-fixed-footer/
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
├── src/
│   ├── app/
│   │   └── config/
│   │       └── constants.ts      # For constant variables like Github URL and LoL game patch
│   ├── routes/
│   │   ├── layout.tsx            # Global layout enforcing h-screen / no-scroll
│   │   └── index.tsx             # Main page
│   ├── widgets/
│   │   ├── app-footer/
│   │   │   └── ui/
│   │   │       └── app-footer.tsx
│   │   └── build-workspace/      # Needs minor layout update to fit new global wrapper
```

**Structure Decision**: Utilizing `web/src/widgets/app-footer/ui/` for the component to abide strictly by the Feature-Sliced Design constraints, rejecting the `shared/` directory.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
