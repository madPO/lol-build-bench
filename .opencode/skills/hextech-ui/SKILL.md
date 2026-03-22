---
name: hextech-ui
description: Use when building, styling, or reviewing UI components for this project. Provides the complete Hextech Medieval design system — dark fantasy aesthetic inspired by League of Legends client. Covers color tokens, typography, glow effects, borders, buttons, decorative patterns, and component styling recipes. Load when creating any visual component, applying theme colors, or reviewing style consistency. Works with Tailwind CSS v4 custom tokens.
metadata:
  author: social@madpo.me
  version: "1.0"
---

# Hextech UI Design Skill

## When to Use This Skill

Load this skill when:

- Building any new UI component in this project
- Styling or restyling an existing component
- Reviewing component styles for consistency with the design system
- Choosing colors, typography, borders, or effects for any element
- Creating buttons, cards, modals, tooltips, panels, or any surface
- Adding glow effects, decorative dividers, or ornamental elements

This skill defines the **Hextech Medieval** visual language. Every component in this project must follow these rules. No exceptions.

---

## Design Philosophy

The aesthetic is **dark fantasy meets arcane technology** — a medieval world infused with magical energy.

Core feelings to evoke:

- **Boundless world**: Cold dark-blue backgrounds like a night sky
- **Ancient prestige**: Gold that glows from within, heraldic borders
- **Magic and technology**: Glow effects, particles, ethereal light
- **Authority**: Sharp rectangular shapes, all-caps labels, wide tracking

---

## Color System

### Token Architecture

All colors are defined as CSS custom properties in `:root` and mapped to Tailwind via `@theme` in `global.css`. NEVER use raw hex values in components. ALWAYS use the Tailwind utility class that maps to the token.

### Complete Token Reference

```
BACKGROUNDS
--background     #010A13     Page bg, root container           → bg-background
--surface        #0A1428     Cards, panels, sidebars           → bg-surface
--surface-hover  #1E2328     Hovered/elevated surfaces         → bg-surface-hover
--overlay        rgba(1,10,19,0.65)  Hero image dark overlay   → bg-overlay

TEXT
--text           #F0E6D2     Primary text (parchment)          → text-text
--text-muted     #A09B8C     Secondary, helper, caption text   → text-text-muted
--text-dim       #5B5A56     Disabled, placeholder text        → text-text-dim

ACCENT & INTERACTIVE
--accent         #C8AA6E     Gold — borders, icons, ornaments  → text-accent, border-accent, bg-accent
--active         #C89B3C     Bright gold — selected, active    → text-active, border-active, bg-active
--accent-dark    #785A28     Dark gold — gradient end, pressed  → text-accent-dark
--cta            #0BC4E3     Turquoise — CTA buttons ONLY      → bg-cta, text-cta, border-cta
--cta-hover      #0AADC8     CTA hover state                   → bg-cta-hover

BORDERS
--border         #1E2328     Structural, subtle borders         → border-border
--border-accent  #C8AA6E     Decorative gold borders            → border-border-accent
  (Note: border-accent and border-border-accent are equivalent — prefer border-accent)

FEEDBACK
--success        #28A745     Positive / success                → text-success, bg-success
--warning        #C89B3C     Warning (same as active gold)     → text-warning
--error          #E84057     Error / destructive               → text-error, bg-error

GLOWS & SHADOWS
--glow-gold         0 0 10px rgba(200,170,110,0.5)     Subtle ambient glow    → shadow-glow-gold
--glow-gold-strong  0 0 20px rgba(200,170,110,0.4)     Text/emphasis glow     → shadow-glow-gold-strong
--glow-active       0 0 15px rgba(200,155,60,0.6)      Active element glow    → shadow-glow-active
--glow-cta          0 0 15px rgba(11,196,227,0.4)      CTA button glow        → shadow-glow-cta
```

### Color Usage Rules

1. **NEVER use hardcoded Tailwind grays** (`gray-100`, `gray-200`, `gray-400`, `gray-500`, `gray-600`, `gray-800`, `gray-900`). Always use the semantic token.
2. **NEVER use `bg-white`**. Use `bg-surface` or `bg-surface-hover`.
3. **NEVER use `text-black`** for text. Use `text-text`.
4. **NEVER use `border-gray-*`**. Use `border-accent` (decorative) or `border-border` (structural).
5. **NEVER use `hover:border-blue-500`** or any blue for interactive hover. Use `hover:border-active`.
6. **CTA color (`bg-cta`) is ONLY for primary call-to-action buttons**. Never use turquoise for decorative elements, borders, or text emphasis.
7. **Opacity modifiers for text** — use semantic tokens instead of `text-text/50`:
   - Muted text → `text-text-muted`
   - Disabled text → `text-text-dim`
   - If a specific intermediate opacity is truly needed, `text-text/70` is acceptable but prefer the named tokens.
8. **Backdrop overlays** use `bg-black/70` for modals, `bg-overlay` for hero image overlays.

---

## Typography

### Fonts

| Role | Font | Weight | Tailwind Class |
|------|------|--------|----------------|
| Headings | Cinzel | 900 (Black) | `font-heading` |
| Body | Inter | 400 (Regular) | `font-body` |
| Body emphasis | Inter | 700 (Bold) | `font-body font-bold` |

Both fonts are loaded via Google Fonts in `global.css`. The `@layer base` rule applies `font-heading` to all `h1-h6` automatically.

### Heading Rules

- **ALL CAPS**: All headings use `uppercase` (applied automatically via base layer)
- **Letter-spacing**: `0.05em` for headings (set via `--heading-letter-spacing`)
- **Font style**: Normal weight is 900 (Black). Consider italic for hero/splash headings: `italic`
- **Glow on important headings**: Add `shadow-glow-gold-strong` for emphasis on hero titles
- Tailwind: `font-heading uppercase tracking-[0.05em]` (or rely on the base layer)

### Label & Button Rules

- **ALL CAPS**: `uppercase`
- **Letter-spacing**: `0.15em` to `0.2em` — use `tracking-[0.15em]` or `tracking-[0.2em]`
- **Font**: Use `font-body` (Inter) for button labels, NOT Cinzel
- **Font size**: Typically `text-xs` or `text-sm`

### Body Text Rules

- **Font**: Inter 400 (`font-body`)
- **Case**: Normal sentence case (no uppercase)
- **Letter-spacing**: Default (no extra tracking)
- **Line height**: `leading-relaxed` (1.625) for readability on dark backgrounds
- **Color**: `text-text` for primary, `text-text-muted` for secondary

---

## Borders & Shapes

### Border Radius

- **Buttons**: `rounded-none` (0px) — sharp rectangular, heraldic/medieval character
- **Cards/Panels**: `rounded-lg` — slight rounding for containment
- **Avatars/Icons**: `rounded-md` — moderate rounding
- **Tooltips**: `rounded-lg`
- **Pills/Tags**: `rounded-full` — only for small tags/badges

The base layer sets `--button-radius: 0px` which applies to all `button` and `.btn` elements automatically.

### Border Widths & Styles

| Context | Border | Class |
|---------|--------|-------|
| Card/panel edge | 1px solid accent | `border border-accent` |
| Interactive element | 1px solid accent | `border border-accent` |
| Dashed placeholder | 2px dashed accent | `border-2 border-dashed border-accent` |
| Hover on interactive | 1px solid active | `hover:border-active` |
| Decorative divider | 1px solid accent/30 | `border-accent/30` |

### Decorative Dividers

Thin gold lines with an ornamental center insert. Implementation pattern:

```html
<!-- Simple gold divider -->
<div class="w-full h-px bg-accent/30"></div>

<!-- Ornamental divider with center diamond -->
<div class="flex items-center gap-4 my-6">
  <div class="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-accent/30"></div>
  <div class="w-2 h-2 rotate-45 border border-accent bg-accent/20"></div>
  <div class="flex-1 h-px bg-gradient-to-l from-transparent via-accent/50 to-accent/30"></div>
</div>

<!-- Double-line divider with center ornament -->
<div class="flex items-center gap-3 my-6">
  <div class="flex-1 h-px bg-accent/40"></div>
  <svg class="w-4 h-4 text-accent" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13l-5 3 1-5.5-4-4 5.5-1z"/>
  </svg>
  <div class="flex-1 h-px bg-accent/40"></div>
</div>
```

---

## Glow Effects

Glow is central to the Hextech aesthetic. Use it deliberately — not on every element.

### When to Apply Glow

| Element | Glow Token | Tailwind Class |
|---------|-----------|----------------|
| Hero headings | `--glow-gold-strong` | `shadow-glow-gold-strong` |
| Active/selected items | `--glow-active` | `shadow-glow-active` |
| Hovered gold elements | `--glow-gold` | `hover:shadow-glow-gold` |
| CTA buttons | `--glow-cta` | `shadow-glow-cta` |
| Cards on hover | `--glow-gold` | `hover:shadow-glow-gold` |

### Gold Text Glow Pattern

For headings or labels that should "glow from within":

```html
<h1 class="font-heading text-accent uppercase tracking-[0.05em] drop-shadow-[0_0_20px_rgba(200,170,110,0.4)]">
  Ancient Title
</h1>
```

Or use the shadow utility if the `@theme` mapping is set up:

```html
<h1 class="font-heading text-accent uppercase tracking-[0.05em] shadow-glow-gold-strong">
  Ancient Title
</h1>
```

### Gold Gradient Text

For a gradient effect from bright gold to dark gold:

```html
<span class="bg-gradient-to-b from-accent to-accent-dark bg-clip-text text-transparent">
  Gilded Text
</span>
```

### Do NOT Apply Glow To

- Body text
- Structural borders
- Muted/secondary elements
- Disabled elements
- More than 2-3 elements visible at once (glow loses impact when overused)

---

## Component Recipes

### Buttons

#### Primary CTA Button (Turquoise)

Use ONLY for the single most important action on the page.

```html
<button class="bg-cta text-background font-body text-sm uppercase tracking-[0.15em] px-6 py-2.5 border-none rounded-none hover:bg-cta-hover shadow-glow-cta transition-all">
  Play Now
</button>
```

#### Standard Gold Button (Heraldic)

The default button style. Sharp corners, gold border, no fill.

```html
<button class="bg-transparent text-accent font-body text-sm uppercase tracking-[0.15em] px-6 py-2.5 border border-accent rounded-none hover:bg-accent/10 hover:shadow-glow-gold transition-all">
  Select Champion
</button>
```

#### Active/Selected Gold Button

```html
<button class="bg-active/20 text-active font-body text-sm uppercase tracking-[0.15em] px-6 py-2.5 border border-active rounded-none shadow-glow-active transition-all">
  Selected
</button>
```

#### Disabled Button

```html
<button disabled class="bg-transparent text-text-dim font-body text-sm uppercase tracking-[0.15em] px-6 py-2.5 border border-border rounded-none cursor-not-allowed opacity-50">
  Locked
</button>
```

### Cards / Panels

```html
<div class="bg-surface border border-accent rounded-lg p-4 text-text">
  <h3 class="font-heading text-accent text-sm mb-2">Panel Title</h3>
  <p class="font-body text-text-muted text-xs leading-relaxed">Content goes here.</p>
</div>
```

With hover glow:

```html
<div class="bg-surface border border-accent rounded-lg p-4 text-text hover:shadow-glow-gold transition-shadow">
  ...
</div>
```

### Glass/Frosted Panel

For panels overlaying content:

```html
<div class="bg-surface/80 backdrop-blur border border-accent rounded-xl p-4 text-text">
  ...
</div>
```

### Modals

```html
<!-- Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
  <!-- Modal -->
  <div class="bg-surface border border-accent rounded-lg shadow-2xl max-w-[90vw] max-h-[85vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b border-accent bg-surface-hover">
      <h2 class="font-heading text-text text-xl">Modal Title</h2>
      <button class="text-text-muted hover:text-text p-1 rounded-full transition-colors" aria-label="Close">
        <!-- X icon -->
      </button>
    </div>
    <!-- Body -->
    <div class="p-6 overflow-y-auto">
      ...
    </div>
  </div>
</div>
```

### Tooltips

```html
<div class="bg-surface text-text border border-accent shadow-2xl rounded-lg p-3 max-w-[320px] pointer-events-none">
  <div class="font-bold text-sm text-accent mb-1">Tooltip Title</div>
  <div class="text-xs text-text-muted leading-relaxed">Description text here.</div>
</div>
```

### Empty / Placeholder States

```html
<div class="flex flex-col items-center justify-center h-full border border-dashed border-accent rounded-md p-4">
  <span class="text-text-muted text-4xl font-light">+</span>
  <span class="text-text-muted text-xs uppercase tracking-[0.15em] mt-1">Select</span>
</div>
```

### Stat Lines / Data Rows

```html
<div class="flex border-b border-accent/30 py-0.5">
  <span class="text-text-muted font-medium w-16 shrink-0 text-xs">Label:</span>
  <span class="text-text tabular-nums font-semibold text-xs">Value</span>
</div>
```

### Cinematic Hero Overlay

For full-screen background art with dark overlay:

```html
<div class="relative w-full h-screen">
  <img src="hero.jpg" class="absolute inset-0 w-full h-full object-cover" alt="" />
  <div class="absolute inset-0 bg-overlay"></div>
  <div class="relative z-10 flex flex-col items-center justify-center h-full">
    <h1 class="font-heading text-accent text-4xl uppercase tracking-[0.05em] italic drop-shadow-[0_0_20px_rgba(200,170,110,0.4)]">
      Hero Title
    </h1>
  </div>
</div>
```

---

## Interactive States

Every interactive element must handle these states using the design tokens:

| State | Background | Border | Text | Effect |
|-------|-----------|--------|------|--------|
| Default | `bg-surface` | `border-accent` | `text-text` | none |
| Hover | `bg-surface-hover` or `bg-accent/10` | `border-active` | `text-text` | `shadow-glow-gold` (optional) |
| Active/Pressed | `bg-active/20` | `border-active` | `text-active` | `shadow-glow-active` |
| Focus | same as default | `ring-2 ring-active ring-offset-2 ring-offset-background` | `text-text` | focus ring |
| Disabled | `bg-surface` | `border-border` | `text-text-dim` | `opacity-50 cursor-not-allowed` |
| Selected | `bg-active/20` | `border-active` | `text-active` | `shadow-glow-active` |

### Transitions

All interactive state changes should use `transition-all` or specific transition utilities:

```
transition-colors     → color/background changes only
transition-all        → when scale/shadow also changes
duration-200          → default duration for hover states
```

For scale effects on interactive grid items: `hover:scale-110 active:scale-95`.

---

## Anti-Patterns (NEVER Do These)

1. **NEVER** use `bg-white`, `text-black`, `text-gray-*`, `bg-gray-*`, `border-gray-*` — always use theme tokens
2. **NEVER** use `hover:border-blue-500` or any blue utility — use `hover:border-active`
3. **NEVER** use `text-blue-600` for emphasis — use `text-accent` or `text-active`
4. **NEVER** apply rounded corners to primary action buttons — buttons are `rounded-none`
5. **NEVER** use the CTA turquoise color for anything except the primary call-to-action
6. **NEVER** set font-family inline — use `font-heading` or `font-body` tokens
7. **NEVER** use `bg-popover` / `text-popover-foreground` or other Basecoat semantic tokens in custom components — use the Hextech tokens (`bg-surface`, `text-text`, etc.). Basecoat tokens may be used ONLY inside Basecoat's own component classes (`.btn`, `.card`, etc. from the library).
8. **NEVER** add glow to more than 2-3 elements in a single view — it dilutes the magical feel
9. **NEVER** use `className` — use `class` (Qwik convention)

---

## Implementation Checklist

Before finishing any component, verify:

### Colors
- [ ] No hardcoded gray/white/blue/black Tailwind utilities
- [ ] All backgrounds use `bg-background`, `bg-surface`, or `bg-surface-hover`
- [ ] All text uses `text-text`, `text-text-muted`, `text-text-dim`, or `text-accent`
- [ ] All borders use `border-accent`, `border-border`, or `border-active`
- [ ] CTA color used only for primary call-to-action (if applicable)

### Typography
- [ ] Headings use `font-heading` with `uppercase` and `tracking-[0.05em]`
- [ ] Labels/buttons use `font-body` with `uppercase` and `tracking-[0.15em]`
- [ ] Body text uses `font-body` with normal case and `leading-relaxed`

### Borders & Shape
- [ ] Buttons have `rounded-none` (sharp rectangular)
- [ ] Cards/panels have `rounded-lg`
- [ ] No unexpected rounded corners on action elements

### Glow & Effects
- [ ] Glow applied only to high-emphasis elements (max 2-3 per view)
- [ ] Hero headings have gold text shadow
- [ ] Active/selected items have `shadow-glow-active`
- [ ] CTA buttons have `shadow-glow-cta`

### States
- [ ] Hover, active, focus, disabled states all defined
- [ ] Focus uses `ring-2 ring-active` pattern
- [ ] Disabled uses `opacity-50 cursor-not-allowed text-text-dim`
- [ ] Transitions applied to all state changes

### Consistency
- [ ] No Basecoat semantic tokens mixed with Hextech tokens (except inside `.btn`, `.card` etc.)
- [ ] No raw opacity modifiers where a named token exists (`text-text/50` → `text-text-muted`)
- [ ] `class` attribute used, never `className`

---

## Reference: global.css Structure

The complete `@theme` block must map every token to Tailwind. Any new token added to `:root` must also be added to `@theme`:

```css
@theme {
  /* Fonts */
  --font-heading: var(--font-primary);
  --font-body: var(--font-secondary);

  /* Colors - Backgrounds */
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-overlay: var(--overlay);

  /* Colors - Text */
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-text-dim: var(--text-dim);

  /* Colors - Accent & Interactive */
  --color-accent: var(--accent);
  --color-active: var(--active);
  --color-accent-dark: var(--accent-dark);
  --color-cta: var(--cta);
  --color-cta-hover: var(--cta-hover);

  /* Colors - Borders */
  --color-border: var(--border);
  --color-border-accent: var(--border-accent);

  /* Colors - Feedback */
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);

  /* Shadows */
  --shadow-glow-gold: var(--glow-gold);
  --shadow-glow-gold-strong: var(--glow-gold-strong);
  --shadow-glow-active: var(--glow-active);
  --shadow-glow-cta: var(--glow-cta);
}
```

When adding a new CSS variable to `:root`, ALWAYS add its corresponding `--color-*` or `--shadow-*` mapping in `@theme` — otherwise it won't be available as a Tailwind utility class.
