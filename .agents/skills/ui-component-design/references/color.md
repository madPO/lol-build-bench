# Color Reference

Source: [Adobe Spectrum — Using Color](https://spectrum.adobe.com/page/using-color/) · [Color System](https://spectrum.adobe.com/page/color-system/)

---

## Color Token Roles

Adapt these semantic roles to any design system's token naming convention.

### Semantic Color Meanings

| Token role | Meaning | Usage |
|-----------|---------|-------|
| `accent` | Brand/primary action | CTAs, links, selected states, focus rings |
| `informative` | Neutral information | Info banners, tooltips |
| `positive` | Success, completion | Success toasts, valid field state |
| `notice` | Warning, caution | Warning banners, non-critical alerts |
| `negative` | Error, danger | Error states, destructive actions |

### Gray Scale Roles (Spectrum defaults — adapt to your token names)

| Gray level | Role |
|-----------|------|
| 50–200 | Background layers |
| 200–300 | Decorative borders, app framing |
| 400 | Field borders (text inputs) |
| 500 | Disabled text and disabled icons (does NOT need to meet contrast) |
| 600 | Control borders, icon default color |
| 700–900 | Text content (body, heading) |
| 600–900 | Icon content (meeting contrast minimums) |

### Color Scale Roles

| Color level | Role |
|------------|------|
| 100 | Light tinted backgrounds (informational chips, tags) |
| 300–600 | Decorative, low-contrast accents — never for conveying information |
| 600–800 | Borders with semantic color |
| 700–1100 | Icon and illustration fills |
| 900 | Colored text (accent and negative only) |
| 900+ (static) | Solid color backgrounds |

---

## Background Layers

Three background levels create visual hierarchy:

| Layer | Usage |
|-------|-------|
| Background Base | Empty space, pasteboard, outer canvas — not for components |
| Background Layer 1 | Primary app frame: headers, toolbars, panels (option A) |
| Background Layer 2 | Secondary panels, or primary app frame (option B) — content areas |

**Rules:**
- Do not use global gray tokens for background layers — use the dedicated layer tokens
- Background colors create dimension and hierarchy; they are NOT for individual component backgrounds

### App Frame Patterns

**Professional editing apps (Photoshop-style):**
- Option A: Layer 1 = frame/toolbars, Layer 2 = content, Base = pasteboard
- Option B: Layer 2 = everything (simpler, conforms to platform norms)

**Content-based apps (dashboards, CMS):**
- Layer 2 = header, sidebar, navigation
- Layer 1 = content regions (cards, galleries)
- No Base

---

## Interactive State Colors

- Theme colors shift in contrast for each state
- Light themes → each state gets **darker**
- Dark themes → each state gets **lighter**
- The magnitude of change is consistent per state type

---

## Transparency Rules

| Allowed | Not Allowed |
|---------|-------------|
| Background overlays (modal backdrop) | Replacing opaque colors with alpha equivalents |
| Drop shadows | Tinting backgrounds with transparent colors |
| Selection highlight styles | Using transparent colors on non-transparent backgrounds |

**On colored or image backgrounds:** use `transparent-white` tokens on dark, `transparent-black` tokens on light.

---

## Data Visualization Colors

- **Separate color palette** — never reuse UI semantic colors (accent, negative, etc.)
- Data viz colors are designed for categorical distinction, not semantic meaning
- Use sequentially (categorical series) or diverging (value polarity)
- Reference: [Adobe Spectrum — Color for Data Visualization](https://spectrum.adobe.com/page/color-for-data-visualization/)

---

## Key Rules Summary

| Rule | Detail |
|------|--------|
| Never create custom colors | Use only tokens from your design system |
| Never use transparency as color substitute | Opacity only for overlays and shadows |
| Never use color alone | Pair with text label or icon |
| Never use global grays for backgrounds | Use dedicated background layer tokens |
| Never use UI colors in charts | Use the data visualization palette |
| Never modify colors programmatically | No tint/shade functions on design tokens |
| Yellow/orange/cyan/chartreuse on backgrounds | Use with **black** text (not white) |
