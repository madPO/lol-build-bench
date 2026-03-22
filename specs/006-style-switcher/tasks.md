# Tasks: Style Switcher

**Input**: Design documents from `/specs/006-style-switcher/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.
**Tests**: Skipped per constitution.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and CSS foundation.

- [X] T001 Update `web/src/global.css` to import Google Fonts (Cinzel Black, Inter, Cormorant Garamond, DM Sans)
- [X] T002 Update `web/src/global.css` to define the default root CSS variables for the "original" theme (Background: #010A13, Surfaces: #0A1428 / #1E2328, Accent: #C8AA6E, Active: #C89B3C, Text: #F0E6D2). Map these to Tailwind colors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: FSD structure for the theme switcher feature.

- [X] T003 Create directory `web/src/features/theme-switcher/ui/`
- [X] T004 Create `web/src/features/theme-switcher/index.ts` to act as the public API for the feature slice

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - View Default Theme ("Original LoL Style") (Priority: P1) 🎯 MVP

**Goal**: Establish the baseline visual experience with Hextech Medieval styling.

**Independent Test**: Load the application in a fresh browser session and verify the colors, fonts (Cinzel Black/Inter), and visual effects match the "Option 1" design specifications.

### Implementation for User Story 1

- [X] T005 [US1] In `web/src/global.css`, define specific CSS classes or variables for "Original" theme buttons (no roundings, gold borders, uppercase tracking).
- [X] T006 [US1] In `web/src/global.css`, define specific CSS classes or variables for "Original" glow effects (text-shadow, gradients).

**Checkpoint**: At this point, the application should look like the "Original LoL" style by default.

---

## Phase 4: User Story 2 - Toggle to Alternate Theme ("LoL in Chiaroscuro Style") (Priority: P1)

**Goal**: Allow users to toggle to the warm, canvas-textured, chiaroscuro painting style.

**Independent Test**: Interact with the theme toggle control and visually confirm the instantaneous transition of colors, fonts, and textures without any page reload or layout/markup shifts.

### Implementation for User Story 2

- [X] T007 [P] [US2] In `web/src/global.css`, add the `[data-theme="chiaroscuro"]` selector and define its specific color variables (Background: #0D0906, Surfaces: #1A1209 / #231810, Warm Shadow: #2E1F0F, Light: #E8C97A, Accent: #C9862A, Text: #F5EDDA).
- [X] T008 [P] [US2] In `web/src/global.css`, define specific CSS properties for the "Chiaroscuro" style under the `[data-theme="chiaroscuro"]` selector (warm radial gradient background, soft glow box-shadows, SVG noise overlay for canvas grain texture, multi-layered warm text-shadows, font overrides).
- [X] T009 [US2] Create the toggle component in `web/src/features/theme-switcher/ui/theme-toggle.tsx` that switches the `data-theme` attribute on the `document.documentElement` between "original" and "chiaroscuro".
- [X] T010 [US2] Export the `ThemeToggle` component from `web/src/features/theme-switcher/index.ts`.
- [X] T011 [US2] Integrate the `ThemeToggle` component into `web/src/root.tsx` (e.g., as a floating button or within an existing header/layout if present).

**Checkpoint**: At this point, you can toggle between the two themes dynamically.

---

## Phase 5: User Story 3 - Theme Persistence (Priority: P2)

**Goal**: Remember the user's selected theme across page reloads and sessions.

**Independent Test**: Select the non-default theme, refresh the browser, and verify the selected theme remains active without a Flash of Unstyled Content.

### Implementation for User Story 3

- [X] T012 [US3] Update `web/src/features/theme-switcher/ui/theme-toggle.tsx` to read from and write to `localStorage` (key: `lolbench_theme_preference`) whenever the theme changes. Handle the initial client-side hydration (e.g., using `useVisibleTask$`).
- [X] T013 [US3] In `web/src/app/router-head/router-head.tsx`, inject an inline `<script>` tag that synchronously reads `lolbench_theme_preference` from `localStorage` and applies the `data-theme` attribute to the document element before the body renders, preventing FOUC.

**Checkpoint**: Theme toggling is now fully persistent.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and adjustments.

- [X] T014 Run build and lint checks (`bun run build.types`, `bun run lint` in `web/`) to ensure no TypeScript or FSD violations.
- [X] T015 Verify the Chiaroscuro noise texture SVG is properly encoded and applied in `global.css`.
- [X] T016 Verify transitions between themes feel instantaneous and don't cause layout shifts.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phases 3-5)**: Must follow the priority order (US1 -> US2 -> US3).
- **Polish (Phase 6)**: Runs last.

### Parallel Opportunities
- T007 and T008 can be done in parallel with T009/T010.
