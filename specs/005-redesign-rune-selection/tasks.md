# Tasks: Redesign Rune Selection Section

**Input**: Design documents from `/workspace/specs/005-redesign-rune-selection/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are deferred per the project constitution, skipping test tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `web/src/` (Qwik with FSD: `app/`, `pages/`, `widgets/`, `features/`, `entities/`)
- **IMPORTANT**: For frontend, the `shared/` directory MUST NOT be used.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure types

- [X] T001 [P] Create `RuneBranch` type in `web/src/entities/rune-branch/model/types.ts`
- [X] T002 [P] Create `Rune` type in `web/src/entities/rune/model/types.ts`
- [X] T003 [P] Create `RuneSelectionState` type in `web/src/features/select-rune-branch/model/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic that MUST be complete before ANY user story can be fully implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Implement `calculateNewSelectionState` pure function handling primary/secondary selection logic in `web/src/features/select-rune-branch/model/transformations.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Select Rune Branches (Priority: P1) 🎯 MVP

**Goal**: Users need to choose up to two rune branches to define their primary and secondary paths.

**Independent Test**: Can be fully tested by clicking branch icons and observing that the system restricts selection to a maximum of two branches, assigning them as primary and secondary and highlighting them.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create `RuneBranchIcon` UI component (with selection styling props) in `web/src/entities/rune-branch/ui/rune-branch-icon.tsx`
- [X] T006 [P] [US1] Create `BranchSelector` feature component to render list of branches in `web/src/features/select-rune-branch/ui/branch-selector.tsx`
- [X] T007 [US1] Create `RuneSelectionBoard` widget state and layout in `web/src/widgets/rune-selection/ui/rune-selection-board.tsx`
- [X] T008 [US1] Integrate `RuneSelectionBoard` widget into the main page (e.g., `web/src/pages/index.tsx`)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Deselect Rune Branches (Priority: P1)

**Goal**: Users need the ability to undo a branch selection if they change their mind.

**Independent Test**: Can be tested by clicking a highlighted, selected branch icon and verifying it becomes unselected.

### Implementation for User Story 2

- [X] T009 [US2] Update `BranchSelector` to explicitly handle deselection via `calculateNewSelectionState` in `web/src/features/select-rune-branch/ui/branch-selector.tsx`
- [X] T010 [US2] Ensure `RuneBranchIcon` visually removes selection highlights when deselected in `web/src/entities/rune-branch/ui/rune-branch-icon.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Available Runes (Priority: P2)

**Goal**: Users need to see the specific runes available within their chosen branches to finalize their build.

**Independent Test**: Can be tested by verifying that the runes displayed in the second column dynamically update based on the currently selected branches in the first column.

### Implementation for User Story 3

- [X] T011 [P] [US3] Create `EmptyRuneState` UI component for unselected state in `web/src/entities/rune/ui/empty-rune-state.tsx`
- [X] T012 [P] [US3] Create `RuneColumn` UI component to display runes in `web/src/entities/rune/ui/rune-column.tsx`
- [X] T013 [US3] Update `RuneSelectionBoard` to dynamically render `RuneColumn` or `EmptyRuneState` based on selected branches in `web/src/widgets/rune-selection/ui/rune-selection-board.tsx`

**Checkpoint**: All core UI components for selection should now be independently functional

---

## Phase 6: User Story 4 - Branch Information Tooltips (Priority: P3)

**Goal**: Users need to easily identify branches by name before making a selection.

**Independent Test**: Can be tested by hovering the mouse cursor over a branch icon and confirming the tooltip appears with the correct name.

### Implementation for User Story 4

- [X] T014 [US4] Add CSS-based tooltip (e.g., Basecoat CSS or Tailwind group-hover) displaying branch name to `RuneBranchIcon` in `web/src/entities/rune-branch/ui/rune-branch-icon.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T015 Ensure layout strictly conforms to two-column structure and verify heading removal in `web/src/widgets/rune-selection/ui/rune-selection-board.tsx`
- [X] T016 Validate TypeScript types and FSD imports across the `web/` directory (e.g., `bun run build.types` and `bun run lint`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (US1 → US2 → US3 → US4)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- Types in Setup (T001, T002, T003) can be created in parallel.
- Foundational logic in T004 blocks UI construction.
- US1 UI Components (T005, T006) can be built in parallel.
- US3 UI Components (T011, T012) can be built in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch UI components for User Story 1 together:
Task: "Create RuneBranchIcon UI component in web/src/entities/rune-branch/ui/rune-branch-icon.tsx"
Task: "Create BranchSelector feature component in web/src/features/select-rune-branch/ui/branch-selector.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → MVP!
3. Add User Story 2 → Test deselection functionality
4. Add User Story 3 → Test reactive rune rendering
5. Add User Story 4 → Test tooltips
6. Polish layout and typing compliance