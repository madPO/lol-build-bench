# Feature Specification: Redesign Rune Selection Section

**Feature Branch**: `005-redesign-rune-selection`  
**Created**: Fri Mar 20 2026  
**Status**: Draft  
**Input**: User description: "Let's redesign the rune selection section. Remove the heading from the section. Make two columns. In the first vertical position, place the icons of the rune branches. Add a tooltip with the name of the branch on hover. Allow you to select only 2 branches - one primary and the other secondary. Highlight the selected branches. Clicking on the icon again should remove it from the selections. In the second column you need to display rune icons from both branches - the main and secondary. Just like now."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select Rune Branches (Priority: P1)

Users need to choose up to two rune branches to define their primary and secondary paths.

**Why this priority**: Selecting branches is the foundational step before choosing individual runes. The entire feature relies on this core action.

**Independent Test**: Can be fully tested by clicking branch icons and observing that the system restricts selection to a maximum of two branches, assigning them as primary and secondary and highlighting them.

**Acceptance Scenarios**:

1. **Given** no branches are selected, **When** the user clicks a branch icon, **Then** the branch is selected as the primary path and visually highlighted.
2. **Given** one primary branch is selected, **When** the user clicks a different branch icon, **Then** the branch is selected as the secondary path and visually highlighted.
3. **Given** two branches are selected, **When** the user clicks a third unselected branch icon, **Then** the secondary branch is replaced by the newly selected branch and visually highlighted.

---

### User Story 2 - Deselect Rune Branches (Priority: P1)

Users need the ability to undo a branch selection if they change their mind.

**Why this priority**: Users frequently adjust their builds, making an intuitive deselection method critical for a good user experience.

**Independent Test**: Can be tested by clicking a highlighted, selected branch icon and verifying it becomes unselected.

**Acceptance Scenarios**:

1. **Given** a branch is currently selected (primary or secondary), **When** the user clicks its icon again, **Then** the branch is deselected and its visual highlight is removed.

---

### User Story 3 - View Available Runes (Priority: P2)

Users need to see the specific runes available within their chosen branches to finalize their build.

**Why this priority**: After selecting branches, viewing the corresponding runes is the immediate next step in the user flow.

**Independent Test**: Can be tested by verifying that the runes displayed in the second column dynamically update based on the currently selected branches in the first column.

**Acceptance Scenarios**:

1. **Given** one or more branches are selected, **Then** the second column displays the individual rune icons that belong to those selected branches.
2. **Given** no branches are selected, **Then** the second column displays an empty state placeholder.

---

### User Story 4 - Branch Information Tooltips (Priority: P3)

Users need to easily identify branches by name before making a selection.

**Why this priority**: While experienced users might recognize icons, newer users rely on names to understand their choices.

**Independent Test**: Can be tested by hovering the mouse cursor over a branch icon and confirming the tooltip appears with the correct name.

**Acceptance Scenarios**:

1. **Given** the user's cursor is hovering over a branch icon, **Then** a tooltip appears displaying the text name of that branch.

---

### Edge Cases

- What happens if the primary branch is deselected while a secondary branch is still active? (Assumption: The secondary branch remains active, possibly becoming the new primary branch).
- How does the system handle rapid, repeated clicking on a branch icon? (Assumption: UI reliably debounces or sequentially processes clicks to avoid invalid states).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The rune selection section MUST NOT display a heading.
- **FR-002**: The UI MUST be structured into exactly two columns.
- **FR-003**: The first column MUST display a vertical list of rune branch icons.
- **FR-004**: Hovering over a branch icon in the first column MUST display a tooltip containing the branch's name.
- **FR-005**: The system MUST allow users to select a maximum of two branches (one primary, one secondary).
- **FR-006**: Selected branch icons MUST be visually highlighted to indicate their active state.
- **FR-007**: Clicking an already selected branch icon MUST deselect it and remove its visual highlight.
- **FR-008**: When a user clicks a 3rd unselected branch while 2 are already selected, the system MUST replace the secondary branch with the newly selected branch.
- **FR-009**: The second column MUST display the individual rune icons associated with the currently selected branch(es).
- **FR-010**: When no branches are selected, the system MUST display an empty state or placeholder text (e.g., "Select a branch to see runes") in the second column.

### Key Entities

- **Rune Branch**: Represents a category or path of runes. Contains a name, an icon, and a collection of individual runes.
- **Rune**: An individual selectable perk within a branch. Contains an icon and associations to a specific branch.
- **Selection State**: Tracks the user's currently chosen Primary Branch and Secondary Branch.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully select a primary and secondary branch within exactly two clicks.
- **SC-002**: Users can successfully deselect an active branch with a single click.
- **SC-003**: The layout strictly conforms to a two-column structure without the previous heading across all supported devices.
- **SC-004**: Tooltips reliably appear and display the correct branch name upon hovering over any branch icon.
- **SC-005**: The second column accurately updates to reflect the individual runes of only the currently selected branches.