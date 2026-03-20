---

description: "Task list for feature implementation"
---

# Tasks: Inventory Section Redesign

**Input**: Design documents from `/specs/004-inventory-redesign/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Vitest tests are included for the core deletion logic to ensure reliability as indicated in the plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `web/src/` (Qwik with FSD: `app/`, `pages/`, `widgets/`, `features/`, `entities/`)
- **IMPORTANT**: The `shared/` directory MUST NOT be used.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Install dependencies with `bun install` in `web/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and code pruning that MUST be complete before user stories

- [X] T002 [P] Remove deprecated `computeTotalGold` and `countFilledSlots` from `web/src/features/item-build/model/inventory.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Simplified Inventory Display (Priority: P1) 🎯 MVP

**Goal**: Deliver a clean, minimalist 6-slot grid by removing all extraneous text and UI elements.

**Independent Test**: View the inventory section; confirm exactly 6 slots are visible and the title, counter, and total cost are gone.

### Implementation for User Story 1

- [X] T003 [US1] Remove section title and gold cost/counter elements from `web/src/features/item-build/ui/item-inventory.tsx`
- [X] T004 [US1] Implement 6-slot fixed grid layout with Tailwind `grid-cols-6` in `web/src/features/item-build/ui/item-inventory.tsx`
- [X] T005 [US1] Style empty slot placeholders with subtle borders in `web/src/features/item-build/ui/item-inventory.tsx`

**Checkpoint**: User Story 1 is functional - the UI is simplified to a 6-slot grid.

---

## Phase 4: User Story 2 - Removing an Item from Inventory (Priority: P1)

**Goal**: Provide a clear, discoverable way to remove items via a trash can icon on hover or direct tap.

**Independent Test**: Hover over an item to see the trash icon, click it, and verify the item is removed from the slot.

### Tests for User Story 2

- [X] T006 [P] [US2] Create unit test for item removal in `web/src/features/item-build/ui/item-inventory.spec.tsx`

### Implementation for User Story 2

- [X] T007 [US2] Implement SVG trash icon overlay component in `web/src/features/item-build/ui/item-inventory.tsx`
- [X] T008 [US2] Add `onClick$` deletion logic to item slots in `web/src/features/item-build/ui/item-inventory.tsx`
- [X] T009 [US2] Apply Tailwind `group-hover` styles for trash icon visibility in `web/src/features/item-build/ui/item-inventory.tsx`

**Checkpoint**: User Story 2 is functional - items can be deleted via hover icon or tap.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and adherence to project standards.

- [X] T010 [P] Run `bun run lint` and `bun run build.types` in `web/` to ensure code quality
- [X] T011 [P] Verify touch device tap-to-delete behavior in `web/src/features/item-build/ui/item-inventory.tsx`
- [ ] T012 [P] Run all tests with `bun test` from the `web/` directory

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Story 1 (Phase 3)**: Depends on Phase 2. This is the MVP.
- **User Story 2 (Phase 4)**: Depends on Phase 2. Can run in parallel with US1 if UI slots exist.
- **Polish (Phase 5)**: Depends on completion of all user stories.

### Parallel Opportunities

- T001 and T002 can technically run in parallel if environment is ready.
- US1 and US2 can be developed in parallel if they don't conflict on the same lines in `item-inventory.tsx`.
- All Phase 5 tasks are parallelizable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational pruning.
2. Implement the simplified 6-slot UI (US1).
3. **STOP and VALIDATE**: Ensure the visual clutter is removed and exactly 6 slots are rendered.

### Incremental Delivery

1. Add deletion functionality (US2) after the 6-slot grid is stable.
2. Verify with unit tests.
3. Final polish and linting.
