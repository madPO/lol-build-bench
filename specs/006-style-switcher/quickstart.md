# Quickstart: Style Switcher

This feature introduces a pure CSS-based theme toggler that swaps the entire visual identity of the LoL Build Bench application between "Hextech Medieval" and "Chiaroscuro" without modifying existing component markup.

## How It Works

1.  **CSS Variables**: All component styling must utilize generic semantic CSS classes (e.g., `bg-background`, `text-primary`, `font-heading`). These classes map to CSS variables (`--color-background`, etc.) defined in `web/src/global.css`.
2.  **Theme Attribute**: The active theme is controlled by a `data-theme` attribute on the `<html>` element.
    *   `data-theme="original"`: Activates the deep navy/gold "Hextech" theme.
    *   `data-theme="chiaroscuro"`: Activates the warm/amber "Old Master" theme.
3.  **The Toggle Widget**: A self-contained Qwik component located in `web/src/features/theme-switcher` handles user interaction, reading/writing to `localStorage`, and updating the `data-theme` attribute.
4.  **No-FOUC Script**: An inline script in `web/src/app/router-head/router-head.tsx` ensures the theme is read from `localStorage` synchronously during initial page load, preventing the Flash of Unstyled Content (FOUC).

## Testing the Styles

*   **Original Style**: Ensure the background is deep navy black (`#010A13`), buttons have hard rectangular edges with gold glows, and text is Cinzel Black / Inter.
*   **Chiaroscuro Style**: Ensure the background has a warm radial gradient (`#2E1F0F` to `#0D0906`), buttons have warm amber glows, text is Cormorant Garamond / DM Sans, and a canvas-like SVG noise texture is visible over the background.
