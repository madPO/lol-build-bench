# Phase 0: Research & Decisions

## Context
The feature requires a redesign of the rune selection section into a two-column layout with specific interaction rules (primary/secondary branch selection, replacement logic, tooltips, and deselection). There were no remaining "NEEDS CLARIFICATION" items from the specification phase.

## Technical Decisions

### 1. State Management for Rune Branches
- **Decision**: Use Qwik's `useStore` to track the state of selected rune branches (primary and secondary) within the `rune-selection` widget or a dedicated feature hook.
- **Rationale**: `useStore` is ideal for complex objects or reactive state that involves multiple related properties (like `primaryId` and `secondaryId`). It integrates seamlessly with Qwik's fine-grained reactivity.
- **Alternatives considered**: `useSignal` for each branch separately (rejected because they are closely related and `useStore` provides a cleaner mental model for a cohesive selection state).

### 2. Tooltip Implementation
- **Decision**: Use a CSS-based approach (e.g., Tailwind CSS group-hover or peer utilities) combined with simple state or native HTML `title` attributes for the MVP, or integrate a lightweight accessible tooltip from Basecoat CSS if available. Given Basecoat CSS is in use, we will prefer its tooltip component if one exists; otherwise, a simple custom Qwik component.
- **Rationale**: CSS-based or native tooltips are lightweight and performant. Custom Qwik components can be used if more complex rendering (like delays or animations) is needed, but an MVP-first approach favors simplicity.
- **Alternatives considered**: Heavy third-party tooltip libraries (rejected to keep dependencies minimal).

### 3. FSD Integration for Interactions
- **Decision**: The logic for replacing the secondary branch when a third is clicked, and the deselection logic, will be encapsulated in a pure Transformation function or a dedicated hook within `features/select-rune-branch`.
- **Rationale**: Keeps the UI components (`entities/rune-branch/ui`) dumb and pure, focusing only on presentation, while the `feature` layer handles the business logic of selection rules.
- **Alternatives considered**: Putting the logic directly in the widget's `onClick$` handlers (rejected as it violates the separation of concerns encouraged by FSD).

### 4. Empty State Handling
- **Decision**: Create a dedicated `EmptyRuneState` UI component within the `widgets/rune-selection` or `entities/rune` slice to display when `primaryId` and `secondaryId` are both null.
- **Rationale**: Provides clear user feedback as specified in FR-010.

## Resolution
All functional requirements and interaction edge cases (deselection, 3rd branch replacement) can be cleanly handled with Qwik's reactive state and standard TypeScript logic. No blocking technical unknowns remain.
