# Research & Technical Decisions: Rework Champion Select

## 1. UI Components & Layout (FSD)

**Decision**: 
Implement the combined champion selection and stats UI as a Widget (`src/widgets/champion-select-board`). 
The modal interaction will be a Feature (`src/features/select-champion`), and the core display units (Avatar, Stat rows) will be part of the Champion Entity (`src/entities/champion`).

**Rationale**: 
Following Feature-Sliced Design (FSD), combining multiple entities and features into a unified block is the exact purpose of a Widget. The modal and selection logic is a distinct user interaction (Feature), and the display rules for a Champion's data are business rules (Entity). 

**Alternatives considered**: 
Placing everything inside `src/features/` (violates FSD separation of UI composition vs interaction). Placing everything in `src/pages/` (makes the page component too bloated).

## 2. Modal Implementation in Qwik

**Decision**: 
Use the native HTML `<dialog>` element, controlled via a Qwik `useSignal` (or a `useVisibleTask$` to handle `.showModal()`/`.close()`).

**Rationale**: 
Native `<dialog>` provides built-in accessibility, focus trapping, and rendering above other content without needing complex z-index management or external libraries. It perfectly aligns with Qwik's lightweight philosophy.

**Alternatives considered**: 
Building a custom absolute/fixed positioned div with a backdrop (requires manual focus management, aria-hidden toggling, and complex click-outside logic).

## 3. Multi-Column Stats Layout

**Decision**: 
Use CSS Grid (`grid-cols-2` or `grid-cols-3` depending on the number of stats) with Tailwind CSS classes to ensure all stats fit without scrolling.

**Rationale**: 
CSS Grid is specifically designed for 2D layouts and provides rigid structure, preventing columns from breaking unevenly. Tailwind makes it trivial to apply responsive grid column counts if needed for smaller viewports, while maintaining the "no scroll" requirement.

**Alternatives considered**: 
CSS Flexbox with `flex-wrap` (could lead to uneven last rows or orphaned stats). HTML `<table>` (semantically incorrect for key-value pair lists, better suited for the champion list modal).

## 4. Champion List Tooltips

**Decision**: 
Use simple CSS-based tooltips via Tailwind `group` and `group-hover` classes on the champion buttons in the modal.

**Rationale**: 
The tooltip only requires displaying the champion's name. A CSS-only approach avoids JavaScript overhead and hydrates instantly, staying true to Qwik's performance goals.

**Alternatives considered**: 
A JS-based tooltip library like Floating UI (overkill for just a name string). Qwik-specific state-based tooltips (adds unnecessary reactivity for a static hover effect).