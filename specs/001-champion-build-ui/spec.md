# Feature Specification: Champion Build Planner UI

**Feature Branch**: `001-champion-build-ui`  
**Created**: 2026-03-18  
**Status**: Draft  
**Input**: User description: "lets build a ui. Just webpage without a backend. Frontend init in ./web dirr. Site does have one page with 3 row. Fitst row include a champion select and champion stats show. Second row include 6 selected items section, and rune page. 3 row is a chart. In first colum on 1 and 2 row i have items select section. User have select champion, select item to inventar, select runes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select a Champion and View Stats (Priority: P1)

A user visits the page and selects a champion from the champion selection area in the first row. Once selected, the champion's base stats are displayed alongside the selection. This is the foundational interaction that all other features build upon.

**Why this priority**: Without a champion selected, items, runes, and charts have no context. This is the core entry point for the entire page.

**Independent Test**: Can be fully tested by opening the page, browsing champions, selecting one, and seeing its stats displayed. Delivers value as a standalone champion stat browser.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user views the first row, **Then** they see a champion selection area and a stats display area
2. **Given** no champion is selected, **When** the user selects a champion, **Then** the champion's base stats appear in the stats display area
3. **Given** a champion is already selected, **When** the user selects a different champion, **Then** the stats update to reflect the newly selected champion
4. **Given** the page is loaded, **When** the user searches or filters champions, **Then** the champion list narrows to matching results

---

### User Story 2 - Select Items into Inventory (Priority: P2)

A user browses the items selection column on the left side (spanning rows 1 and 2) and adds items to their 6-slot inventory displayed in the second row. The inventory visually shows all 6 slots, with empty slots clearly indicated. Users can fill, replace, and remove items from inventory slots.

**Why this priority**: Item selection is a core part of build planning, and the items column is a major layout element spanning two rows. It is the second most important interaction after champion selection.

**Independent Test**: Can be tested by browsing the item list, clicking items to add them to inventory slots, and verifying they appear in the 6-slot display. Delivers value as an item set builder.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user views the left column of rows 1 and 2, **Then** they see a browsable list of items with search/filter capability
2. **Given** the inventory has empty slots, **When** the user selects an item from the item list, **Then** the item is added to the first available inventory slot
3. **Given** the inventory is full (6 items), **When** the user tries to add another item, **Then** the system prevents the addition and indicates the inventory is full
4. **Given** an item is in an inventory slot, **When** the user removes the item, **Then** the slot becomes empty and available
5. **Given** items are in the inventory, **When** the user views the second row, **Then** they see all 6 slots with occupied slots showing item details and empty slots clearly marked

---

### User Story 3 - Configure Rune Page (Priority: P3)

A user configures their rune page in the second row, alongside the item inventory. The rune page allows selecting runes organized by their categories. Runes modify champion stats and contribute to the overall build.

**Why this priority**: Rune selection completes the build configuration alongside champion and items. It depends on the layout being established by the previous stories.

**Independent Test**: Can be tested by opening the rune page section, selecting runes from available categories, and verifying the selections are reflected in the rune page display. Delivers value as a rune configuration tool.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user views the second row right section, **Then** they see a rune page with available rune categories
2. **Given** the rune page is displayed, **When** the user selects a rune from a category, **Then** the rune is marked as selected in that category
3. **Given** a rune is selected in a category, **When** the user selects a different rune in the same category, **Then** the previous selection is replaced
4. **Given** runes are selected, **When** the user views the rune page summary, **Then** all selected runes are clearly visible

---

### User Story 4 - View Build Chart (Priority: P4)

A user views a chart in the third row that visualizes how champion stats grow as gold is spent on items. The chart shows stat progression over cumulative gold cost, allowing the user to see how each gold investment translates into stat gains. The chart updates dynamically as the user changes champion selection, items, or runes.

**Why this priority**: The chart is a summary visualization that requires all other selections to be in place. It adds analytical value but is not required for core build planning.

**Independent Test**: Can be tested by selecting a champion, adding items and runes, and verifying the chart displays and updates accordingly.

**Acceptance Scenarios**:

1. **Given** a champion is selected with items in the inventory, **When** the user views the third row, **Then** they see a chart showing stat values plotted against cumulative gold spent
2. **Given** the chart is displayed, **When** the user adds, removes, or reorders items, **Then** the chart updates to reflect the new stat progression over gold
3. **Given** no champion is selected, **When** the user views the third row, **Then** the chart area shows an empty/placeholder state indicating a champion must be selected
4. **Given** items are in the inventory, **When** the user views the chart, **Then** each item's gold cost contribution is visible on the x-axis and the resulting stat values on the y-axis

---

### Edge Cases

- What happens when the user tries to add the same item twice to the inventory? (Assumption: duplicates are allowed, as in the source game)
- What happens when the user deselects all runes? The rune page shows all categories as unselected with no stat modifications applied
- What happens when the browser window is resized? The layout adapts responsively while maintaining the 3-row structure
- How does the page handle a very long champion or item list? Scrollable lists within their respective panels with search/filter to narrow results
- What happens when the user refreshes the page? All selections are reset to default empty state (no persistence required for frontend-only)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a single-page layout with 3 rows: Row 1 (champion select + stats), Row 2 (item inventory + rune page), Row 3 (chart)
- **FR-002**: System MUST display an items selection column on the left side spanning rows 1 and 2
- **FR-003**: System MUST allow users to browse and select a champion from a list of available champions
- **FR-004**: System MUST display the selected champion's base stats (e.g., attack damage, ability power, health, armor, magic resist, attack speed)
- **FR-005**: System MUST provide search or filter functionality for the champion list
- **FR-006**: System MUST display a 6-slot item inventory in the second row
- **FR-007**: System MUST allow users to add items from the item selection column to inventory slots
- **FR-008**: System MUST prevent adding items when all 6 inventory slots are occupied and communicate this to the user
- **FR-009**: System MUST allow users to remove items from inventory slots
- **FR-010**: System MUST provide search or filter functionality for the item list
- **FR-011**: System MUST display a rune page in the second row with rune categories
- **FR-012**: System MUST allow users to select one rune per category
- **FR-013**: System MUST display a chart in the third row that shows stat progression over cumulative gold spent on items
- **FR-014**: System MUST update the chart dynamically when champion, items, or runes change
- **FR-018**: System MUST show how each stat (e.g., attack damage, health, armor) grows as items are added, plotted against total gold cost
- **FR-015**: System MUST show empty/placeholder states when no champion, items, or runes are selected
- **FR-016**: System MUST operate entirely in the browser without requiring a backend server
- **FR-017**: System MUST use static data for champions, items, and runes (bundled with the frontend)

### Key Entities

- **Champion**: A selectable character with a name, image/icon, and base stats (attack damage, ability power, health, mana, armor, magic resistance, attack speed, movement speed). Each champion has a unique identity.
- **Item**: A selectable equipment piece with a name, image/icon, stat modifiers, description, and gold cost. Items can be added to inventory slots. Multiple instances of the same item are allowed.
- **Rune**: A selectable modifier organized into categories. Each rune has a name, icon, description, and stat effect. Only one rune per category can be active.
- **Inventory**: A collection of exactly 6 slots that hold selected items. Slots can be empty or occupied by one item each.
- **Rune Page**: A configuration of selected runes, one per rune category. Represents the complete rune setup for a build.
- **Build**: The combination of a selected champion, inventory items, and rune page that together define the complete configuration being planned.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can select a champion and see its stats displayed within 2 seconds of page load
- **SC-002**: Users can complete a full build (champion + 6 items + runes) in under 3 minutes on first use
- **SC-003**: 90% of users can successfully add and remove items from inventory on first attempt without instructions
- **SC-004**: Chart updates within 1 second of any build change (champion, item, or rune modification)
- **SC-005**: Page loads and becomes fully interactive within 3 seconds on a standard broadband connection
- **SC-006**: All interactive elements (champion select, item select, rune select) are usable on screens 1024px wide and above

## Assumptions

- Champion, item, and rune data will be bundled as static data within the frontend (no external data fetching required)
- The game context is a MOBA-style game (e.g., League of Legends) based on terminology (champions, items, runes, inventory)
- Duplicate items in inventory are allowed (consistent with the source game's rules)
- No user authentication or account system is needed
- No data persistence across page reloads (session-only state)
- The items selection column on the left visually spans rows 1 and 2 as a sidebar
- Champion stats shown are base stats; stat modifications from items and runes are reflected in the chart
- Standard web accessibility expectations apply (keyboard navigation, readable text, sufficient contrast)
