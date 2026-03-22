# Feature Specification: Style Switcher

**Feature Branch**: `006-style-switcher`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "I want to experiment with styles. Below I will give a description of the two styles. Implement them and switch between these styles. Change only the styles, you cannot change the markup, structure, data. For fonts use Google Fonts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Default Theme ("Original LoL Style") (Priority: P1)

When a user visits the application for the first time, they should experience the default "Dark Cinematic Esports / Hextech Medieval" visual style, complete with its specific deep navy colors, antique gold accents, and heraldic typography.

**Why this priority**: The baseline visual experience must be established and fully functional before any switching logic is applied.

**Independent Test**: Can be fully tested by loading the application in a fresh browser session and verifying the colors, fonts (Cinzel Black/Inter), and visual effects match the "Option 1" design specifications.

**Acceptance Scenarios**:

1. **Given** a new user visiting the application, **When** the page loads, **Then** the background is deep navy black (#010A13), accents are antique gold (#C8AA6E), and text uses Cinzel Black and Inter fonts.
2. **Given** the default theme is active, **When** viewing buttons and dividers, **Then** they display cold gold glows, heraldic unrounded borders, and uppercase tracking.

---

### User Story 2 - Toggle to Alternate Theme ("LoL in Chiaroscuro Style") (Priority: P1)

Users should be able to toggle the application's visual style to the "Runeterra Tenebrae / Old Master × MOBA" theme, which changes the mood to a warm, canvas-textured, chiaroscuro painting style.

**Why this priority**: The core requirement is the ability to switch between the two distinct visual styles.

**Independent Test**: Can be fully tested by interacting with the theme toggle control and visually confirming the instantaneous transition of colors, fonts, and textures without any page reload or layout/markup shifts.

**Acceptance Scenarios**:

1. **Given** the application is loaded, **When** the user activates the theme toggle, **Then** the interface instantly updates to the warm black background, ochre-amber light accents, and Cormorant Garamond/DM Sans fonts.
2. **Given** the Chiaroscuro theme is active, **When** viewing the background and buttons, **Then** the background exhibits a warm radial gradient, and the interface displays multi-layered warm shadows and a canvas grain texture.

---

### User Story 3 - Theme Persistence (Priority: P2)

When a user selects a specific theme, their choice should be remembered so that subsequent visits or page reloads retain their preferred visual style.

**Why this priority**: While the switch itself is P1, persisting it ensures a good user experience and prevents frustration from the theme resetting on every navigation or reload.

**Independent Test**: Can be fully tested by selecting the non-default theme, refreshing the browser, and verifying the selected theme remains active.

**Acceptance Scenarios**:

1. **Given** the user has switched to the Chiaroscuro theme, **When** they refresh the page, **Then** the application loads directly in the Chiaroscuro theme.
2. **Given** the user has switched to the Chiaroscuro theme, **When** they close the browser and return later, **Then** the Chiaroscuro theme is still applied.

---

### Edge Cases

- What happens if the browser restricts local storage? (The app should gracefully fall back to the default Original LoL theme without throwing errors).
- How does the system handle a slow network connection when loading the heavy Google Fonts for the newly switched theme? (Browser should use fallback system fonts temporarily until the web fonts load, preventing invisible text).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement the "Original LoL" style using exclusively stylesheets (Background: #010A13, Surfaces: #0A1428 / #1E2328, Accent: #C8AA6E, Active: #C89B3C, Text: #F0E6D2).
- **FR-002**: System MUST implement the "LoL in Chiaroscuro" style using exclusively stylesheets (Background: #0D0906, Surfaces: #1A1209 / #231810, Warm Shadow: #2E1F0F, Light: #E8C97A, Accent: #C9862A, Text: #F5EDDA).
- **FR-003**: System MUST provide a UI mechanism to switch between the two themes without altering the existing markup, structure, or application data.
- **FR-004**: System MUST dynamically load and apply the correct Google Fonts for the active theme (Cinzel Black + Inter for Original; Cormorant Garamond + DM Sans for Chiaroscuro).
- **FR-005**: System MUST persist the user's selected theme preference across page reloads and sessions securely on the client.
- **FR-006**: System MUST apply "magic and technology" glow effects (shadows, gradients) and heraldic button styles (no rounding, gold borders) for the Original style.
- **FR-007**: System MUST apply painting-like visual techniques (warm radial gradient background, soft glow shadows, noise overlay for canvas grain texture, multi-layered warm shadows) for the Chiaroscuro style.

### Key Entities

- **ThemePreference**: A local client state representing the currently active visual theme, used to apply the correct styling.

### Assumptions & Dependencies

- **Assumption**: The application already possesses a generic UI element that can serve as the theme toggle, or the injection of a minimal, self-contained toggle script (e.g., toggling a class on the document root) is permitted as an exception to the strict "no markup changes" rule, strictly for the purpose of enabling the switch.
- **Dependency**: Google Fonts API is accessible from the client's network.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can toggle between the "Original" and "Chiaroscuro" themes instantaneously (<100ms) without triggering a full page reload.
- **SC-002**: 100% of the visual changes are accomplished strictly via stylesheets and font definitions; zero modifications are made to the core structural markup or underlying application data.
- **SC-003**: The selected theme persists successfully 100% of the time upon browser refresh or returning to the application in a new session (assuming standard browser storage is available).
- **SC-004**: Visual verification confirms both themes strictly adhere to their respective color palettes, typography pairs, and specific visual techniques (e.g., grain texture vs. hextech glow effects) defined in the design specification.
