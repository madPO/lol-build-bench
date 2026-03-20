# Tasks: Rework Champion Select

**Input**: Design documents from `/specs/003-rework-champion-select/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included as they were not explicitly requested in the feature specification. Independent test criteria are provided for each story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `web/src/` (Qwik with FSD: `pages/`, `widgets/`, `features/`, `entities/`)
- **IMPORTANT**: The `shared/` directory MUST NOT be used.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create FSD directory structure (entities, features, widgets) in `web/src/`
- [X] T002 [P] Define Champion and Stat types in `web/src/entities/champion/model/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Implement base `ChampionAvatar` component (empty state) in `web/src/entities/champion/ui/avatar.tsx`
- [X] T004 [P] Implement `ChampionStats` multi-column grid component in `web/src/entities/champion/ui/stats.tsx`
- [X] T005 [P] Create `ChampionListItem` component for modal list in `web/src/entities/champion/ui/list-item.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Initial Champion Selection (Priority: P1) 🎯 MVP

**Goal**: Enable initial champion selection via a modal triggered by clicking an empty avatar.

**Independent Test**: Load the page with no champion selected, click the empty avatar, select a champion from the modal, and verify that the avatar is replaced and stats are displayed without scrolling.

### Implementation for User Story 1

- [X] T006 [P] [US1] Implement `SelectChampionModal` using native `<dialog>` in `web/src/features/select-champion/ui/modal.tsx`
- [X] T007 [US1] Implement champion selection interaction logic and exports in `web/src/features/select-champion/index.ts`
- [X] T008 [US1] Create `ChampionSelectBoard` widget composing avatar and stats in `web/src/widgets/champion-select-board/ui.tsx`
- [X] T009 [US1] Add widget public API and entry point in `web/src/widgets/champion-select-board/index.ts`
- [X] T010 [US1] Integrate `ChampionSelectBoard` widget into the main route in `web/src/pages/index.tsx`

**Checkpoint**: At this point, User Story 1 (MVP) should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Changing a Selected Champion (Priority: P2)

**Goal**: Allow users to change an already selected champion by clicking their current avatar.

**Independent Test**: Start with a champion already selected, click their avatar to open the selection modal, pick a different champion, and verify the UI instantly updates to the new champion's details.

### Implementation for User Story 2

- [X] T011 [US2] Update `ChampionAvatar` to handle click events in populated state in `web/src/entities/champion/ui/avatar.tsx`
- [X] T012 [US2] Refine `ChampionSelectBoard` state management for seamless champion switching in `web/src/widgets/champion-select-board/ui.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T013 [P] Implement CSS-only tooltips for champion names in `web/src/features/select-champion/ui/modal.tsx`
- [X] T014 [P] Finalize Tailwind grid responsive rules for "no-scroll" stats in `web/src/entities/champion/ui/stats.tsx`
- [X] T015 Run `bun run lint` and `bun run build.types` in `web/` to verify project standards

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001 and T002. BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on completion of Phase 3 and 4.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories.
- **User Story 2 (P2)**: Extends US1 components but can be developed once foundations are set.

### Parallel Opportunities

- T002 can run in parallel with T001.
- T004 and T005 can run in parallel with T003.
- T006 [US1] can be developed in parallel with foundational UI if types are stable.
- Polish tasks T013 and T014 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch independent UI components for US1:
Task: "Implement SelectChampionModal using native <dialog> in web/src/features/select-champion/ui/modal.tsx"
Task: "Implement champion selection interaction logic in web/src/features/select-champion/index.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete Phase 3 (User Story 1).
3. **STOP and VALIDATE**: Test User Story 1 independently using the provided test criteria.

### Incremental Delivery

1. Setup + Foundational -> Foundation ready.
2. Add User Story 1 -> Test independently -> MVP Demo.
3. Add User Story 2 -> Test switching logic.
4. Final Polish -> Ensure responsive behavior and code quality.
