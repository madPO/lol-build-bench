---
name: basecoat-ui
description: Use when building UI with Basecoat UI (basecoatui.com) — a Tailwind CSS component library. Load when the user asks to add, use, or implement a Basecoat UI component, or when building frontend with Tailwind and the project uses basecoatui.com. Teaches how to look up components in the docs, fetch code examples, and structure each component into exactly 3 files for reusability.
---

# Basecoat UI Skill

## When to Use This Skill

Load this skill when:
- The user wants to use or integrate a component from Basecoat UI
- The project is built with Tailwind CSS and references basecoatui.com
- You need to look up, verify, or implement any Basecoat UI component

## About Basecoat UI

[Basecoat UI](https://basecoatui.com/introduction/) is a Tailwind CSS component library. Components are styled via simple CSS class names (e.g., `btn`, `card`, `input`). Some interactive components (modals, dropdowns, etc.) require a small amount of vanilla JavaScript. The library is framework-agnostic and has no runtime JS dependency beyond that.

## Step 1 — Verify the Component Exists

The full list of available components is at:

```
https://basecoatui.com/sitemap.xml
```

Every component follows the URL pattern:

```
https://basecoatui.com/components/{component-name}/
```

To check if a component exists, construct its expected URL and fetch it. If the page returns a valid title and description, the component is available. If it returns a 404 or empty content, the component does not exist in Basecoat UI — inform the user and suggest the closest available alternative.

**Example check:**
- Needed: `dialog` → fetch `https://basecoatui.com/components/dialog/` → valid page → component exists
- Needed: `navbar` → fetch `https://basecoatui.com/components/navbar/` → 404 → does not exist → suggest `sidebar` or `tabs`

## Step 2 — Fetch the Component Documentation

Once the component URL is confirmed, fetch the page at:

```
https://basecoatui.com/components/{component-name}/
```

From the page extract:
1. **Description** — the short one-line description at the top of the page
2. **CSS classes** — the class names used to construct the component (e.g., `btn`, `btn-primary`, `btn-outline`)
3. **Variants and sizes** — listed under the Usage section
4. **Code examples** — HTML code blocks in the Examples section, one per variant

Use the extracted HTML examples as the reference implementation when building the component file.

## Step 3 — Component File Structure

Every Basecoat UI component **must be split into exactly 3 files**. Never implement a component as a single inline file.

### File 1 — `{ComponentName}.{ext}` (Markup + Styles + Internal Logic)

This file contains:
- The component's HTML template or JSX/TSX markup
- Tailwind and Basecoat CSS classes applied directly in markup
- Private/internal functions and event handlers used only within this component
- No exported types or public interfaces

This is the only file that renders the actual DOM structure.

### File 2 — `{ComponentName}.types.{ext}` (Public Types + Public Functions)

This file contains:
- All TypeScript interfaces, types, and enums that describe the component's props or data shape
- Public functions that callers may need to invoke or pass into the component (e.g., callbacks, formatters, validators)
- No markup, no DOM rendering, no hooks

This file is the public contract of the component — what outside code can depend on.

### File 3 — `{ComponentName}.hooks.{ext}` (Hooks + External Interaction Logic)

This file contains:
- Custom hooks or composable functions for using the component (e.g., `useDialog`, `useToast`)
- State management logic exposed to the parent (open/close state, selected value, etc.)
- Any imperative API that controls the component from outside

This file is what consumers import to drive the component programmatically.

### Naming Convention

Use consistent casing and directory grouping:

```
components/
  Dialog/
    Dialog.tsx           ← File 1: markup + internal logic
    Dialog.types.ts      ← File 2: public types and functions
    Dialog.hooks.ts      ← File 3: hooks and external control
```

Plain HTML/vanilla JS projects may use:

```
components/
  dialog/
    dialog.html          ← File 1: markup and inline styles
    dialog.types.js      ← File 2: exported constants, helpers
    dialog.hooks.js      ← File 3: init functions, event API
```

## Step 4 — Implementation Rules

- **Always base markup on the official code example** fetched from the docs. Do not invent class names.
- **Never hardcode content** that is meant to be dynamic — accept it as a prop or parameter.
- **Interactive components** (dialog, dropdown, toast, popover, etc.) require the vanilla JS initialization described on their docs page. Place that logic in File 3.
- **Do not mix files** — markup never goes into File 2 or File 3. Logic never bleeds into File 1 beyond private event handlers.
- **Import direction**: File 1 imports from File 2 (types) and File 3 (hooks). File 3 may import from File 2. File 2 has no internal imports.

## Step 5 — Quality Checklist

Before finishing, verify:

- [ ] Component URL was fetched and confirmed to exist
- [ ] Markup uses the exact Basecoat CSS classes from the docs
- [ ] Component is split into exactly 3 files with correct responsibilities
- [ ] File 2 exports all types and public functions needed by callers
- [ ] File 3 exports all hooks/control functions needed to drive the component
- [ ] No Basecoat class names were invented — all classes come from the documentation
