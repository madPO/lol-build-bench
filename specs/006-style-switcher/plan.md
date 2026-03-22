# Implementation Plan: Style Switcher

**Branch**: `006-style-switcher` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/workspace/specs/006-style-switcher/spec.md`

## Summary

Implement a global style switcher to toggle the application's visual identity between an "Original LoL" (Hextech Medieval) theme and a "LoL in Chiaroscuro" (Old Master MOBA) theme. The toggle will purely mutate CSS variables bound to a global `data-theme` attribute, ensuring zero structural markup or application data modifications. The active theme will be persisted securely on the client via `localStorage`.

## Technical Context

**Language/Version**: TypeScript 5.4.5, Qwik JS 1.19.2
**Primary Dependencies**: Tailwind CSS v4.2.2, Basecoat CSS v0.3.11
**Storage**: Client-side `window.localStorage`
**Testing**: Skipped (per project constitution)
**Target Platform**: Web Browsers
**Project Type**: Web Application Frontend
**Performance Goals**: Instantaneous style toggle (<100ms) without page reload, prevent FOUC (Flash of Unstyled Content).
**Constraints**: Pure CSS styling change; ZERO changes to existing HTML markup, structural layout, or application data. No `shared` directory allowed (FSD compliance).
**Scale/Scope**: Global CSS layer and a single isolated FSD feature toggle widget.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-Stack Separation (BFF/UI handles its own theme state, Go API untouched)
- [x] Data, Transformation, Actions (Event handlers and pure state toggles separated)
- [x] Low Coupling, High Cohesion (Theme logic is isolated; components just consume CSS vars)
- [x] Frontend follows Feature-Sliced Design (FSD) architecture (NO shared directory)
- [x] No Test Gates (Testing skipped per constitution)

## Project Structure

### Documentation (this feature)

```text
specs/006-style-switcher/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
web/
├── src/
│   ├── app/
│   │   └── router-head/
│   │       └── router-head.tsx        # Inject inline theme hydration script (No-FOUC)
│   ├── features/
│   │   └── theme-switcher/            # Isolated FSD feature
│   │       ├── ui/
│   │       │   └── theme-toggle.tsx   # Generic UI toggle element
│   │       └── index.ts               # Public API for the feature slice
│   ├── root.tsx                       # Ensure layout accommodates floating toggle if needed
│   └── global.css                     # Define [data-theme] CSS variables and @import Google Fonts
```

**Structure Decision**: A new feature slice `web/src/features/theme-switcher` will be created to house the toggle UI. The theme logic will operate globally by mutating the `data-theme` attribute on the `<html>` or `<body>` element. Native Tailwind v4 CSS variables will be managed centrally within `web/src/global.css`. FSD principles are respected, and no `shared` directory is used.

## Complexity Tracking

No constitution violations detected. The structure perfectly adheres to the mandated FSD approach and side-steps the `shared` directory entirely by housing the global CSS variables at the `app` / root level and encapsulating the toggle logic as a `feature`.
