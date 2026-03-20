# Implementation Plan: Inventory Section Redesign

**Branch**: `004-inventory-redesign` | **Date**: March 20, 2026 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-inventory-redesign/spec.md`

## Summary

The inventory section in the champion build planner will be visually simplified to present a clean, minimalist 6-slot grid. Extraneous UI elements—the section title, item counter, and total gold cost—will be completely removed. A trash can icon will appear to trigger the deletion of an item when the user hovers over an occupied slot (or taps on a touch device).

## Technical Context

**Language/Version**: TypeScript (v5.4.5)
**Primary Dependencies**: @builder.io/qwik (v1.19.2), Tailwind CSS (v4.2.2), Basecoat CSS (v0.3.11)
**Storage**: N/A (Client-side transient state via Qwik context)
**Testing**: Vitest / bun test
**Target Platform**: Web browser
**Project Type**: Web Application (Qwik SSR)
**Performance Goals**: Instant UI updates upon item deletion using Qwik signals/stores
**Constraints**: Must adhere to Feature-Sliced Design (FSD), CSS must be Tailwind utility classes, no `shared/` directory.
**Scale/Scope**: Exactly 6 fixed item slots in the UI.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Dual-stack boundary respected (Only touching Qwik frontend)
- [x] Code categorized as Data, Transformation, or Action
- [x] State changes expressed as CloudEvents; persistence is event-driven (Not applicable for this pure UI update, but respects existing local state logic)
- [x] No circular dependencies; modules have single responsibility
- [x] Feature delivers smallest viable slice (MVP-first)
- [x] Frontend strictly follows Feature-Sliced Design (FSD) architecture (NO shared directory)

## Project Structure

### Documentation (this feature)

```text
specs/004-inventory-redesign/
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
│   ├── pages/
│   ├── widgets/
│   ├── features/
│   │   └── item-build/
│   │       ├── model/      # Data/Transformations
│   │       └── ui/         # Actions/Presentation
│   │           └── item-inventory.tsx  # Target for UI redesign
│   └── entities/
└── tests/
```

**Structure Decision**: Web application (Frontend only). The changes are confined exclusively to the frontend layer within the FSD `features/item-build` slice. Specifically, `web/src/features/item-build/ui/item-inventory.tsx` will be modified, and `web/src/features/item-build/model/inventory.ts` might be pruned of unused transformations (e.g., `computeTotalGold`).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
