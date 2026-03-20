# Tasks: Item List Redesign

**Input**: Design documents from `/workspace/specs/002-redesign-item-list/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Skipped per constitution (no test gates requested in spec.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `web/src/` (Qwik with FSD: `app/`, `pages/`, `widgets/`, `features/`, `entities/`)
- **IMPORTANT**: For frontend, the `shared/` directory MUST NOT be used.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `web/src/features/item-build/model/description.ts` for string utilities

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement `stripHtmlTags` logic in `web/src/features/item-build/model/description.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Viewing Items in a Clean Grid (Priority: P1) 🎯 MVP

**Goal**: Redesign the item list into an icon-only grid without text or search.

**Independent Test**: Load the page and verify the sidebar displays as a grid of icons with no visible text, search bar, or section title.

### Implementation for User Story 1

- [x] T003 [P] [US1] Remove section title and search input from `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T004 [US1] Replace vertical list with 7-column CSS grid in `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T005 [US1] Render only item icons in the grid cells with `aria-label` for accessibility in `web/src/features/item-build/ui/item-sidebar.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Viewing Item Details on Hover (Priority: P1)

**Goal**: Show item name and description in a tooltip when hovering over an icon.

**Independent Test**: Hover over any item icon in the grid and verify a tooltip appears with the correct name (bold) and plain-text description.

### Implementation for User Story 2

- [x] T006 [US2] Implement `HoveredItemState` signal for tracking hovered item in `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T007 [US2] Add `onMouseEnter$` and `onMouseLeave$` handlers to item icons in `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T008 [US2] Implement custom Qwik tooltip component using `stripHtmlTags` in `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T009 [US2] Apply tooltip positioning and max-width (320px) constraints in `web/src/features/item-build/ui/item-sidebar.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Preserving Existing Functionality (Priority: P2)

**Goal**: Ensure clicking items still adds them to the build inventory.

**Independent Test**: Click any item icon and verify it appears in the inventory slots; check that full inventory disabling still works.

### Implementation for User Story 3

- [x] T010 [US3] Ensure item click/tap triggers existing inventory addition logic in `web/src/features/item-build/ui/item-sidebar.tsx`
- [x] T011 [US3] Verify disabled state logic for full inventory is applied to grid icons in `web/src/features/item-build/ui/item-sidebar.tsx`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T012 [P] Run `bun run lint` in `web/` to ensure code quality
- [x] T013 [P] Run `bun run build.types` in `web/` to verify type safety
- [ ] T014 [P] Run `bun run build` in `web/` to confirm production build success

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories proceed in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Depends on US1 for the grid layout but can be developed in parallel if layout is placeholder
- **User Story 3 (P2)**: Depends on US1 for the interaction target (icons)

### Parallel Opportunities

- T003 can be done in parallel with T001/T002 as it's just deletion
- Polish tasks (T012-T014) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Removing elements while preparing the new utility
Task: "Remove section title and search input from web/src/features/item-build/ui/item-sidebar.tsx"
Task: "Create web/src/features/item-build/model/description.ts for string utilities"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (grid renders correctly)

### Incremental Delivery

1. Foundation ready (T001-T002)
2. Add User Story 1 → Test (MVP!)
3. Add User Story 2 → Test (Tooltips)
4. Add User Story 3 → Test (Interaction)
