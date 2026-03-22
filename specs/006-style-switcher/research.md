# Research & Technical Decisions: Style Switcher

## 1. CSS Variable Theming with Tailwind v4
**Decision**: Use native CSS variables configured in `global.css` scoped to `[data-theme="original"]` and `[data-theme="chiaroscuro"]` attributes on the document `<html>` or `<body>` element.
**Rationale**: Tailwind CSS v4 removes `tailwind.config.js` in favor of configuring the design system directly in CSS. We can map standard Basecoat and Tailwind classes (e.g., `bg-background`, `text-primary`) to custom CSS variables (e.g., `--color-background`) that change based on the active `data-theme` attribute. This requires absolutely zero changes to the markup of existing components.
**Alternatives considered**: Using Tailwind's built-in `dark:` variant, but we have two entirely bespoke themes with very specific stylistic traits (Old Master vs Hextech) that go beyond simple light/dark modes.

## 2. Theme Toggle and Persistence in Qwik
**Decision**: Implement a self-contained FSD feature slice `theme-switcher` that renders a floating toggle button. To prevent SSR flickering (Flash of Unstyled Content - FOUC), use Qwik's `useVisibleTask$` to read from `localStorage` immediately upon client load, or better, an inline `<script>` in the document head via QwikCity's `RouterHead` to synchronously set the theme attribute before the body renders.
**Rationale**: Adheres to the FSD architecture by encapsulating the toggle logic. Prevents invisible text or wrong colors during initial load.
**Alternatives considered**: Setting a cookie and reading it on the server via a `routeLoader$`. While cleaner for SSR, it requires changing the server-side logic and adds complexity. LocalStorage + an inline sync script in the `<head>` is a robust, well-established pattern for theme toggling in Qwik.

## 3. Dynamic Font Loading
**Decision**: Add `@import` rules in `global.css` for the Google Fonts required for both themes (Cinzel Black, Inter, Cormorant Garamond, DM Sans). Use CSS variable swaps (`--font-heading`, `--font-body`) to apply them conditionally based on the `data-theme` selector.
**Rationale**: Safe, CSS-only approach that avoids touching HTML. It leverages standard browser font-loading behavior.
**Alternatives considered**: Dynamically injecting `<link>` tags into the DOM via JavaScript. Rejected because it introduces unnecessary JS overhead and risks flickering. Loading both via CSS is simpler and they can be cached effectively.
