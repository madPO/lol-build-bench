# Feature Specification: Inventory Section Redesign

**Feature Branch**: `004-inventory-redesign`  
**Created**: March 20, 2026  
**Status**: Draft  
**Input**: User description: "redesigning the inventory section. Remove the title, remove the item counter and their total cost. Leave only 6 item slots and the ability to remove an item from your inventory. Add a trash can icon when hovering over an item to indicate the delete action"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Simplified Inventory Display (Priority: P1)

As a user, I want to see a clean, minimalist inventory section with exactly 6 fixed item slots and no extraneous text so that the UI is less cluttered and focuses purely on my current build.

**Why this priority**: The core of the redesign is visual simplification. Establishing the 6-slot constraint and removing unnecessary UI elements is the foundational step for this feature.

**Independent Test**: Can be fully tested by viewing the inventory section on the screen; it delivers immediate visual clarity by confirming the absence of the title, item counter, and total cost, while displaying exactly 6 slots.

**Acceptance Scenarios**:

1. **Given** a user is viewing the champion build interface, **When** they look at the inventory section, **Then** the section title, item counter, and total cost are not visible.
2. **Given** the inventory is completely empty, **When** it is displayed on the screen, **Then** there are exactly 6 empty item slots visible.
3. **Given** a user has added items to their inventory, **When** the inventory is displayed, **Then** the items occupy the available slots up to a maximum of 6, and no more than 6 slots are shown.

---

### User Story 2 - Removing an Item from Inventory (Priority: P1)

As a user, I want to easily remove an item from my inventory by clicking a visible delete indicator (trash can icon) that appears when I hover over the item, so that I can quickly correct mistakes or change my build.

**Why this priority**: Managing the build by removing items is a critical interaction loop for the user. Providing a clear, discoverable way to do this ensures the application remains usable after the redesign.

**Independent Test**: Can be tested by adding an item, hovering over it to see the trash can icon, and clicking the icon to verify the item is removed.

**Acceptance Scenarios**:

1. **Given** an item occupies a slot in the inventory, **When** the user hovers their cursor over that specific slot, **Then** a trash can icon becomes visible on or near the item.
2. **Given** an empty item slot, **When** the user hovers their cursor over it, **Then** no trash can icon is displayed.
3. **Given** a visible trash can icon on a hovered item, **When** the user clicks the delete action, **Then** the item is removed from the inventory and the slot becomes empty.
4. **Given** a user is on a touch device, **When** the user taps an item in the inventory, **Then** the item is removed from the inventory without requiring a trash icon to appear.

### Edge Cases

- What happens if the user tries to add a 7th item when all 6 slots are full? (Assumed blocked, out of scope for deletion, but important context for exactly 6 slots).
- How does the system handle accidental deletions on touch devices where tapping immediately deletes the item? (Assumed acceptable for MVP, relies on the user simply re-adding the item if a mistake happens).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render exactly 6 item slots in the inventory section at all times, regardless of how many items the user currently has.
- **FR-002**: The system MUST NOT display a section title for the inventory.
- **FR-003**: The system MUST NOT display an item counter.
- **FR-004**: The system MUST NOT display the total cost of the items in the inventory section.
- **FR-005**: The system MUST display a delete indicator (a trash can icon) when the user hovers over a slot that contains an item.
- **FR-006**: The system MUST NOT display the delete indicator when hovering over an empty slot.
- **FR-007**: The system MUST remove the corresponding item from the user's inventory when the delete action is triggered.
- **FR-008**: The system MUST allow users to delete an item on touch devices by tapping the item directly, without requiring a visible trash icon.

### Key Entities

- **Inventory Slot**: Represents one of the 6 fixed positions in the inventory. It can either be empty or contain an Item.
- **Item**: Represents an equipment piece occupying an Inventory Slot. 

## Assumptions

- **A-001**: Adding items to the inventory is handled by an existing mechanism, and attempting to add a 7th item is already prevented by the system's core logic.
- **A-002**: When an item is removed, the specific slot it occupied becomes empty, rather than automatically shifting all subsequent items to the left.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the extraneous text elements (title, item counter, total cost) are removed from the inventory section.
- **SC-002**: Users can successfully remove an item from their inventory on their first attempt without external instruction.
- **SC-003**: The inventory section consistently occupies the expected visual footprint for exactly 6 slots across all standard screen sizes.
- **SC-004**: The time required for a user to identify how to remove an item is less than 2 seconds.