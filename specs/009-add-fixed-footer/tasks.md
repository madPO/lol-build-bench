---
description: "Task list template for feature implementation"
---

# Tasks: 009-add-fixed-footer

**Input**: Design documents from `/specs/009-add-fixed-footer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/` (Go), `frontend/src/` (Qwik with FSD: `app/`, `pages/`, `widgets/`, `features/`, `entities/`)
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure
- **IMPORTANT**: For frontend, the `shared/` directory MUST NOT be used.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create `web/src/app/config/constants.ts` and define `GITHUB_REPO_URL` and `LOL_GAME_PATCH` constants

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Create global layout wrapper in `web/src/routes/layout.tsx` handling `h-screen overflow-hidden flex flex-col` logic
- [X] T003 Modify layout in `web/src/widgets/build-workspace/ui/page-layout.tsx` to use `h-full` instead of `h-screen` to allow nesting without scroll issues

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Application Information (Priority: P1) 🎯 MVP

**Goal**: Display a constantly visible footer at the bottom of the screen containing copyright information, a link to the project's GitHub repository, and the current patch version, so that I can easily identify the app version, verify ownership, and access the source code.

**Independent Test**: Can be fully tested by loading any page in the application, verifying the footer's presence and contents, and confirming that no vertical scrollbar is introduced to the page.

### Implementation for User Story 1

- [X] T004 [P] [US1] Create `AppFooter` widget at `web/src/widgets/app-footer/ui/app-footer.tsx` using values from `constants.ts` and dynamic copyright year
- [X] T005 [US1] Integrate `AppFooter` into `web/src/routes/layout.tsx` below the main `<Slot />`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T006 Verify responsive design and text wrapping for the footer on mobile devices
- [X] T007 Run type checks (`bun run build.types`) and linter (`bun run lint`) to ensure no errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T001 and T002/T003 can technically run in parallel if the team splits frontend layout from configuration
- T004 can be implemented concurrently with foundational layout adjustments before integration in T005

---

## Parallel Example: User Story 1

```bash
# Launch independent component creation
Task: "Create AppFooter widget at web/src/widgets/app-footer/ui/app-footer.tsx"
Task: "Create global layout wrapper in web/src/routes/layout.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready
