# Feature Specification: Rework Champion Selection and Stats UI

**Feature Branch**: `003-rework-champion-select`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "Let's rework the champion selection and stats sections. Let's combine these sections. Let's remove the title. If a champion is not selected, will display an empty avatar. By clicking on this avatar you need to open a modal window with a list of champions. Make this list like a list of items - a table, with tooltips, but on the tooltip only the name of the champion. By clicking on a champion in the list, he is selected. An empty avatar is replaced with a champion avatar. The champion's stats are displayed next to it. Make the stats display in several columns, you can reduce the font size. But it is advisable to fit all the stats without scrolling."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Initial Champion Selection (Priority: P1)

As a user starting a new build, I want to click an empty avatar placeholder to open a list of champions, so that I can easily find and select my desired champion.

**Why this priority**: Selecting a champion is the fundamental first step in creating a build. The combined UI and modal interaction define the core experience of the feature.

**Independent Test**: Can be fully tested by loading the page with no champion selected, verifying the empty state, opening the modal, and completing a selection to see the UI update.

**Acceptance Scenarios**:

1. **Given** no champion is currently selected, **When** the user views the champion section, **Then** an empty avatar placeholder is displayed without a section title, and no stats are shown.
2. **Given** the user is viewing the empty avatar, **When** they click the avatar, **Then** a modal window opens displaying a table/grid of available champions.
3. **Given** the champion modal is open, **When** the user hovers over a champion's icon, **Then** a tooltip appears showing exactly and only the champion's name.
4. **Given** the champion modal is open, **When** the user clicks on a champion, **Then** the modal closes, the empty avatar is replaced by the chosen champion's avatar, and the champion's stats are displayed next to the avatar.

---

### User Story 2 - Changing a Selected Champion (Priority: P2)

As a user who has already selected a champion, I want to click the current champion's avatar to select a different one, so that I can switch my build's focus without reloading the page.

**Why this priority**: Users frequently change their minds or want to compare builds across different champions. The interaction model must support seamless switching.

**Independent Test**: Can be fully tested by starting with a pre-selected champion, clicking their avatar, selecting a new champion from the modal, and verifying that the avatar and stats update correctly.

**Acceptance Scenarios**:

1. **Given** a champion is already selected and their avatar/stats are displayed, **When** the user clicks the champion's avatar, **Then** the champion selection modal opens.
2. **Given** the modal is open to change a champion, **When** the user clicks a new champion, **Then** the modal closes and the UI instantly updates to reflect the newly selected champion's avatar and stats.
3. **Given** the modal is open, **When** the user clicks outside the modal or presses a close button/Escape key, **Then** the modal closes and the previously selected champion remains active.

---

### Edge Cases

- **Missing Data**: What happens if a champion's avatar image fails to load? (Assumption: A fallback image or initial is displayed).
- **Responsive Layout**: How do the multi-column stats behave on extremely narrow screens (e.g., mobile devices) where fitting them without scrolling might make the font illegible? (Assumption: The columns wrap or stack gracefully on mobile viewports while strictly adhering to the "no scrolling" rule on desktop).
- **Incomplete Stats**: What happens if a selected champion is missing certain stat values in the database? (Assumption: The stat is either hidden or displays a default value like `0` or `-`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST combine the champion selection interface and the champion stats display into a single, unified UI section.
- **FR-002**: The system MUST NOT display a title for this combined section.
- **FR-003**: The system MUST display an empty avatar placeholder when no champion is actively selected.
- **FR-004**: The system MUST open a modal window containing the full list of champions when the user clicks the avatar (whether empty or populated).
- **FR-005**: The champion list within the modal MUST be formatted as a table or grid layout.
- **FR-006**: The system MUST display a tooltip when the user hovers over a champion in the modal.
- **FR-007**: The tooltip MUST contain only the name of the hovered champion, with no additional information.
- **FR-008**: The system MUST set the active champion and close the modal immediately upon the user clicking a champion in the list.
- **FR-009**: The system MUST replace the empty avatar placeholder with the selected champion's avatar image upon selection.
- **FR-010**: The system MUST display the selected champion's stats adjacent to (next to) the champion avatar.
- **FR-011**: The system MUST arrange the champion stats in a multi-column layout.
- **FR-012**: The system MUST size the stats font and layout such that all stats are visible simultaneously without requiring user scrolling.

### Key Entities

- **Champion**: Represents a playable character. Key attributes needed for this feature include `id`, `name` (for tooltip), `avatarUrl` (for display), and `stats` (a collection of base statistics).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully select a champion from an empty state in exactly 2 clicks.
- **SC-002**: 100% of the selected champion's stats are simultaneously visible on standard desktop viewports (1024px width and above) without requiring vertical or horizontal scrolling.
- **SC-003**: The champion selection modal opens and renders the full list of champions in under 200 milliseconds.
- **SC-004**: The UI updates to reflect a newly selected champion's avatar and stats instantly (under 100 milliseconds) upon selection.
