---
description: "Task list for Champion Build Planner UI implementation"
---

# Tasks: Champion Build Planner UI

**Input**: Design documents from `/specs/001-champion-build-ui/`  
**Branch**: `001-champion-build-ui` | **Status**: Implementation  
**Based on**: plan.md, spec.md, data-model.md, research.md, contracts/ui-contracts.md

**Organization**: Tasks grouped by user story (US1-US4) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3, US4)
- All file paths are relative to `web/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation for Qwik + Basecoat + Tailwind CSS + uPlot

- [ ] T001 Install project dependencies: Tailwind CSS, Basecoat CSS, and uPlot in web/package.json
- [ ] T002 Configure Tailwind CSS v4 with @tailwindcss/vite plugin in web/vite.config.ts
- [ ] T003 Update global.css with Tailwind and Basecoat imports in web/src/global.css
- [ ] T004 [P] Create project directory structure (data/, transformations/, components/, context/) in web/src/
- [ ] T005 Create TypeScript interfaces and types file in web/src/data/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that blocks all user stories — static data loading, context setup, transformation functions

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Fetch and bundle static champion data from Riot Data Dragon into web/src/data/champions.json
- [ ] T007 Fetch and bundle static item data from Riot Data Dragon (Summoner's Rift only) into web/src/data/items.json
- [ ] T008 Fetch and bundle static rune tree data from Riot Data Dragon into web/src/data/runes.json
- [ ] T009 Create BuildContext with createContextId in web/src/context/build-context.ts
- [ ] T010 [P] Implement pure stat calculation function computeStats() in web/src/transformations/stats.ts
- [ ] T011 [P] Implement pure chart data generation function computeChartData() in web/src/transformations/chart.ts
- [ ] T012 [P] Implement pure filter/search function filterByName() in web/src/transformations/filters.ts
- [ ] T013 Create page layout shell component with 3-row grid in web/src/components/layout/page-layout.tsx
- [ ] T014 Create main page route that provides BuildContext and composes layout in web/src/routes/index.tsx

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Select Champion and View Stats (Priority: P1) 🎯 MVP

**Goal**: Users can browse and select a champion, seeing its base stats displayed immediately.

**Independent Test**: Open the page, browse/search champions, click one, verify base stats appear.

**Acceptance Scenarios**:
1. Page loads with champion selection area visible in row 1
2. Selecting a champion displays its base stats in row 1 stats area
3. Changing champion selection updates stats display
4. Searching/filtering narrows champion list

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create ChampionSelect component for browsing and selecting champions in web/src/components/champion-select/champion-select.tsx
- [ ] T016 [P] [US1] Create ChampionStats component to display selected champion base stats in web/src/components/champion-stats/champion-stats.tsx
- [ ] T017 [US1] Integrate ChampionSelect and ChampionStats into page layout in web/src/routes/index.tsx (update from T014)
- [ ] T018 [US1] Add champion search/filter input with filterByName() in web/src/components/champion-select/champion-select.tsx

**Checkpoint**: User Story 1 complete — champion selection and stats display working independently

---

## Phase 4: User Story 2 - Select Items into Inventory (Priority: P2)

**Goal**: Users can browse items, add them to a 6-slot inventory, and remove them.

**Independent Test**: Browse items, add items to slots, verify they appear in 6-slot display, remove items, verify they clear.

**Acceptance Scenarios**:
1. Item sidebar visible spanning rows 1-2 on left
2. Adding items fills inventory slots left-to-right
3. Full inventory (6 items) prevents additional additions
4. Removing items clears slots
5. Searching/filtering narrows item list

### Implementation for User Story 2

- [ ] T019 [P] [US2] Create ItemSidebar component for browsing and adding items in web/src/components/item-sidebar/item-sidebar.tsx
- [ ] T020 [P] [US2] Create ItemInventory component displaying 6 slots for items in web/src/components/item-inventory/item-inventory.tsx
- [ ] T021 [US2] Integrate ItemSidebar and ItemInventory into page layout in web/src/routes/index.tsx
- [ ] T022 [US2] Implement "inventory full" validation in ItemSidebar preventing adds when all 6 slots occupied in web/src/components/item-sidebar/item-sidebar.tsx
- [ ] T023 [US2] Add item search/filter input with filterByName() in web/src/components/item-sidebar/item-sidebar.tsx
- [ ] T024 [US2] Implement item removal handler in ItemInventory component in web/src/components/item-inventory/item-inventory.tsx

**Checkpoint**: User Stories 1 and 2 both working independently — champion selection + item inventory complete

---

## Phase 5: User Story 3 - Configure Rune Page (Priority: P3)

**Goal**: Users can select primary and secondary rune trees and runes from each, completing build configuration.

**Independent Test**: Select primary/secondary trees, pick runes from each, verify selections are reflected in rune page display.

**Acceptance Scenarios**:
1. Rune page visible in row 2 right section
2. Users can select primary rune tree (shows available runes)
3. Users can select keystone rune from primary tree
4. Users can select minor runes from primary tree slots (3 selections)
5. Users can select secondary rune tree (must differ from primary)
6. Users can select minor runes from secondary tree slots (2 selections)
7. Changing primary tree resets all primary rune selections

### Implementation for User Story 3

- [ ] T025 [P] [US3] Create RunePage component for rune tree and rune selection in web/src/components/rune-page/rune-page.tsx
- [ ] T026 [US3] Implement primary rune tree selection logic in RunePage in web/src/components/rune-page/rune-page.tsx
- [ ] T027 [US3] Implement primary rune slot selection (keystone + 3 minor) in RunePage in web/src/components/rune-page/rune-page.tsx
- [ ] T028 [US3] Implement secondary rune tree selection and validation (must differ from primary) in RunePage in web/src/components/rune-page/rune-page.tsx
- [ ] T029 [US3] Implement secondary rune slot selection (2 minor from secondary tree) in RunePage in web/src/components/rune-page/rune-page.tsx
- [ ] T030 [US3] Integrate RunePage into page layout in web/src/routes/index.tsx
- [ ] T031 [US3] Add validation: reset primary slots when primary tree changes in web/src/components/rune-page/rune-page.tsx

**Checkpoint**: User Stories 1, 2, and 3 all working — full build configuration (champion + items + runes) complete

---

## Phase 6: User Story 4 - View Build Chart (Priority: P4)

**Goal**: Users see a chart visualizing how champion stats grow as items are added, plotted against cumulative gold spent.

**Independent Test**: Select champion, add items and runes, verify chart displays stat progression over gold; change items and verify chart updates.

**Acceptance Scenarios**:
1. Chart visible in row 3 when champion selected
2. Chart shows stat values on y-axis, cumulative gold on x-axis
3. Chart updates within 1 second when champion/items/runes change
4. Empty state displayed when no champion selected
5. Chart series include relevant stats (damage, armor, health, etc.)

### Implementation for User Story 4

- [ ] T032 [US4] Create BuildChart component wrapping uPlot chart library in web/src/components/build-chart/build-chart.tsx
- [ ] T033 [US4] Implement useVisibleTask$ to instantiate uPlot on component mount in web/src/components/build-chart/build-chart.tsx
- [ ] T034 [US4] Implement chart data reactivity: track build state changes and call chart.setData() in web/src/components/build-chart/build-chart.tsx
- [ ] T035 [US4] Implement chart cleanup: destroy chart instance on unmount in web/src/components/build-chart/build-chart.tsx
- [ ] T036 [US4] Use computeChartData() transformation to generate uPlot-compatible data series in web/src/components/build-chart/build-chart.tsx
- [ ] T037 [US4] Configure uPlot scales: numeric gold x-axis, stat values y-axis in web/src/components/build-chart/build-chart.tsx
- [ ] T038 [US4] Integrate BuildChart into page layout in web/src/routes/index.tsx
- [ ] T039 [US4] Add empty/placeholder state when no champion selected in web/src/components/build-chart/build-chart.tsx

**Checkpoint**: All user stories complete — full feature delivered (champion select + items + runes + chart)

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: UI refinement, accessibility, performance, and final validation

- [ ] T040 [P] Apply Basecoat CSS styling to all components for consistent design in web/src/components/
- [ ] T041 [P] Ensure responsive layout works on 1024px+ screens in web/src/components/layout/page-layout.tsx
- [ ] T042 [P] Add keyboard navigation support to champion/item/rune selection components in web/src/components/
- [ ] T043 [P] Verify page loads and becomes interactive within 3 seconds on standard connection
- [ ] T044 [P] Add loading/placeholder states for better UX in all major components in web/src/components/
- [ ] T045 Test complete flow: select champion → add items → select runes → view chart in web/
- [ ] T046 Run quickstart.md validation checklist in web/
- [ ] T047 Verify all accessibility requirements (readable text, sufficient contrast, alt text for images)
- [ ] T048 Performance: verify chart updates within 1 second of state changes in web/src/components/build-chart/
- [ ] T049 [P] Documentation: add inline TSDoc comments to all exported functions in web/src/data/, web/src/transformations/, web/src/context/
- [ ] T050 Run build: `bun run build` and verify output in web/dist/ or web/server/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phase 3-6)**: All depend on Foundational completion
  - US1 (P1): Can start after Foundational - **MVP, test independently**
  - US2 (P2): Can start after Foundational - can run in parallel with US1
  - US3 (P3): Can start after Foundational - can run in parallel with US1/US2
  - US4 (P4): Can start after Foundational - depends on UI foundation but can run in parallel
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### Within-Phase Parallelization

**Phase 2 (Foundational)**:
- T006, T007, T008 (data fetching): all parallelizable
- T010, T011, T012 (transformation functions): all parallelizable
- T009, T013, T014 (context/layout setup): sequential (T009 before T014, T013 before T014)

**Phase 3 (US1)**:
- T015, T016 (components): parallelizable
- T017, T018: sequential after T015/T016

**Phase 4 (US2)**:
- T019, T020 (components): parallelizable
- T021-T024: sequential after T019/T020

**Phase 5 (US3)**:
- T025-T031: mostly sequential (rune page logic depends on understanding full tree structure)

**Phase 6 (US4)**:
- T032-T039: sequential (uPlot setup → reactivity → cleanup → integration)

**Phase 7 (Polish)**:
- T040, T041, T042, T043, T044: parallelizable (styling, responsive, a11y)
- T045, T046, T047, T048, T049, T050: mostly sequential (testing/validation/build)

---

## Parallel Example: Foundational Phase

```bash
# Launch parallel data fetching (T006, T007, T008):
Task: "Fetch champion data from DDragon → web/src/data/champions.json"
Task: "Fetch item data from DDragon → web/src/data/items.json"
Task: "Fetch rune data from DDragon → web/src/data/runes.json"

# Launch parallel transformation functions (T010, T011, T012):
Task: "Implement computeStats() in web/src/transformations/stats.ts"
Task: "Implement computeChartData() in web/src/transformations/chart.ts"
Task: "Implement filterByName() in web/src/transformations/filters.ts"
```

---

## Parallel Example: User Story 1

```bash
# Launch components in parallel (T015, T016):
Task: "Create ChampionSelect in web/src/components/champion-select/champion-select.tsx"
Task: "Create ChampionStats in web/src/components/champion-stats/champion-stats.tsx"

# Then integrate (T017, T018) sequentially after both components exist
```

---

## Parallel Example: Polish Phase

```bash
# Launch styling/responsive/a11y in parallel (T040, T041, T042, T043, T044):
Task: "Apply Basecoat CSS styling in web/src/components/"
Task: "Ensure responsive layout for 1024px+ in web/src/components/layout/page-layout.tsx"
Task: "Add keyboard navigation to web/src/components/"
Task: "Verify page loads in 3 seconds in web/"
Task: "Add loading/placeholder states in web/src/components/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. **Complete Phase 1 (Setup)** — ~30 minutes
2. **Complete Phase 2 (Foundational)** — ~2-3 hours (includes data fetching)
3. **Complete Phase 3 (User Story 1)** — ~2 hours
4. **Stop and validate**: Champion selection + stats display works independently
5. **Deploy/demo if ready**

**MVP Scope**: Champion select + base stats display = fully functional, independently testable feature

### Incremental Delivery (Full Feature)

1. Complete Setup + Foundational → Foundation ready
2. Add US1 (Champion Select) → Test independently → Deploy/Demo (MVP!)
3. Add US2 (Item Inventory) → Test independently → Deploy/Demo
4. Add US3 (Rune Page) → Test independently → Deploy/Demo
5. Add US4 (Build Chart) → Test independently → Deploy/Demo
6. Polish + validation → Production ready

**Each story is independently deployable** and adds value without breaking previous work.

### Parallel Team Strategy (4 Developers)

1. **Developer 1**: Phase 1 + Phase 2 (Setup & Foundational)
2. **Once Foundational complete, disperse team**:
   - Developer 1: User Story 1 (Champion Select) — should take ~2 hours
   - Developer 2: User Story 2 (Item Inventory) — should take ~3 hours
   - Developer 3: User Story 3 (Rune Page) — should take ~3-4 hours
   - Developer 4: User Story 4 (Build Chart) — should take ~3 hours
3. All complete in parallel, **stories integrate independently**
4. **Developer 1 (fastest story)** helps with Polish phase or other stories

**Estimated timeline**: ~6-7 hours for full feature with proper parallelization

---

## Testing & Validation Checkpoints

### Checkpoint 1: After Phase 1 & 2
- ✅ Dependencies installed
- ✅ Tailwind + Basecoat CSS configured
- ✅ Static data files loaded correctly
- ✅ Build context and transformations ready to use
- ✅ Can proceed to user stories

### Checkpoint 2: After US1 (Phase 3)
- ✅ Champion selection works
- ✅ Base stats display for selected champion
- ✅ Searching/filtering champions works
- ✅ US1 is independently testable
- **If MVP scope**: Can stop here and deploy

### Checkpoint 3: After US2 (Phase 4)
- ✅ Item sidebar visible and searchable
- ✅ Adding items to inventory works (6-slot limit enforced)
- ✅ Removing items from inventory works
- ✅ Both US1 and US2 work together
- ✅ Each story is independently testable

### Checkpoint 4: After US3 (Phase 5)
- ✅ Rune page visible with tree selection
- ✅ Rune selection per slot works
- ✅ Primary/secondary tree validation works
- ✅ All three stories (US1, US2, US3) work together
- ✅ Each story is independently testable

### Checkpoint 5: After US4 (Phase 6)
- ✅ Chart renders with selected champion/items
- ✅ Chart updates within 1 second of state changes
- ✅ All four stories work together
- ✅ Complete feature is testable

### Final Checkpoint: After Polish (Phase 7)
- ✅ All Basecoat CSS applied, consistent design
- ✅ Responsive on 1024px+ screens
- ✅ Keyboard navigation works
- ✅ Page loads and interactive within 3 seconds
- ✅ Chart updates within 1 second
- ✅ Build completes successfully
- ✅ All quickstart.md scenarios validated
- ✅ **Feature ready for production**

---

## Notes

- **[P] tasks** = different files with no inter-task dependencies, can run in parallel
- **[Story] label** maps task to user story for traceability
- **Each user story** should be independently completable and testable
- **Phase 2 is critical**: Foundational tasks block all user story work
- **Data fetching (T006-T008)** requires DDragon access; use latest version from `/api/versions.json`
- **Commit strategy**: After each task or logical group (e.g., all T006-T008 together, all T015-T016 together)
- **Stop at any checkpoint** to validate that story independently before proceeding
- **Avoid**: vague tasks, same-file conflicts between parallel tasks, cross-story hard dependencies that break independence
- **File path reference**: All paths assume `web/src/` base directory per plan.md
