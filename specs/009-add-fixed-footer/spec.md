# Feature Specification: Add Fixed Footer with App Info

**Feature Branch**: `009-add-fixed-footer`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "add a footer with copyright, github link and with current patch number. But page scroll not allowed"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Application Information (Priority: P1)

As a user, I want to see a constantly visible footer at the bottom of the screen containing copyright information, a link to the project's GitHub repository, and the current patch version, so that I can easily identify the app version, verify ownership, and access the source code.

**Why this priority**: Essential for providing context, credibility, and open-source links to users without disrupting their primary workflow.

**Independent Test**: Can be fully tested by loading any page in the application, verifying the footer's presence and contents, and confirming that no vertical scrollbar is introduced to the page.

**Acceptance Scenarios**:

1. **Given** I load any page in the application, **When** I look at the bottom of the viewport, **Then** I see the footer securely anchored at the bottom.
2. **Given** I am viewing the footer, **When** I read its contents, **Then** I see a copyright notice (e.g., "© 2026"), a GitHub link, and the current patch number.
3. **Given** I am interacting with the application, **When** I resize the browser or interact with main content, **Then** the page itself does not scroll (the viewport remains fixed without a scrollbar).
4. **Given** I see the GitHub link in the footer, **When** I click it, **Then** the project's repository opens in a new browser tab.

---

### Edge Cases

- What happens if the main content is taller than the available viewport height? The main content area should handle its own internal scrolling, preventing the entire page/body from scrolling.
- What happens on very small mobile screens? The footer should remain visible and text should wrap or scale appropriately without breaking the layout or causing horizontal/vertical scrolling.
- What happens if the patch number cannot be dynamically fetched? The system should gracefully hide the patch number or display a fallback (e.g., "v0.0.0").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a footer anchored to the bottom of the viewport on all application pages.
- **FR-002**: System MUST display a copyright notice with the current year.
- **FR-003**: System MUST display a link to the project's GitHub repository that opens in a new tab.
- **FR-004**: System MUST display the current application patch number/version, sourced dynamically from the application's configuration.
- **FR-005**: System MUST prevent global page scrolling (e.g., the browser window itself must not have a vertical scrollbar). Main content areas that exceed viewport height must handle scrolling internally.
- **FR-006**: System MUST ensure the footer is responsive and readable on mobile devices.

### Assumptions

- The GitHub repository link is known or will be configured as an environment variable/constant.
- The "patch number" refers to the semantic version of the application (e.g., from `package.json` or build process).
- "Page scroll not allowed" means the global `body` or `html` element does not scroll, and the layout uses a viewport-filling approach (like `100vh` flex layout).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The footer is permanently visible on 100% of the application's top-level routes.
- **SC-002**: Global browser window scrolling is completely disabled (0 instances of window-level scrollbars across different standard device screen sizes).
- **SC-003**: All 3 required elements (copyright, GitHub link, patch number) are present and correct in the footer.
- **SC-004**: The GitHub link successfully opens in a new tab without interrupting the user's current session.
