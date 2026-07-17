---
name: tailwind-blocks
description: "Use ready-made Tailwind CSS HTML components from the tailwind-blocks library when building UI. Load this skill when the user asks to build, layout, or style any web UI element and a matching component exists in the library. Available components: Alerts, Avatars, Badges, Breadcrumbs, Button Groups, Buttons, Calendars, Checkboxes, Comboboxes, Command Palettes, Description Lists, Dropdowns, Feeds, Grid Lists, Input Groups, Modal Dialogs, Multi-Column Layouts, Notifications, Progress Bars, Radio Groups, Select Menus, Sidebar Layouts, Stacked Lists, Stacked Layouts, Tables, Tabs, Textareas, Toggles, Vertical Navigation. Do NOT use this skill if none of the available components match what is needed."
metadata:
  version: '1.0'
---

# Tailwind Blocks

A library of ready-made HTML components styled with Tailwind CSS (dark-themed, utility-first).

## When to Use This Skill

Load this skill when the user asks to build or style a UI element and a matching component exists in the library. If the needed component is **not** in the list below, do not apply this skill.

**Available components:**

| Component | Variants | Reference file |
|---|---|---|
| Alerts | With description, With actions, With accent border, With dismiss button | `references/Alerts.md` |
| Avatars | Circular image, multiple sizes | `references/Avatars.md` |
| Badges | With border and remove button | `references/Badges.md` |
| Breadcrumbs | With home icon and chevron separators | `references/Breadcrumbs.md` |
| Button Groups | Grouped action buttons | `references/Button Groups.md` |
| Buttons | Primary, Secondary, With leading icon | `references/Buttons.md` |
| Calendars | Month view, Week view, Day view | `references/Calendars.md` |
| Checkboxes | List with description | `references/Checkboxes.md` |
| Comboboxes | Autocomplete dropdown | `references/Comboboxes.md` |
| Command Palettes | With images and descriptions, With footer | `references/Command Palettes.md` |
| Description Lists | Key-value data display | `references/Description Lists.md` |
| Dropdowns | With icons | `references/Dropdowns.md` |
| Feeds | With multiple item types | `references/Feeds.md` |
| Grid Lists | Card grid layout | `references/Grid Lists.md` |
| Input Groups | 10 variants: label, validation error, disabled, leading/trailing icon, add-ons, inline add-ons, inline dropdown, trailing button | `references/Input Groups.md` |
| Modal Dialogs | Simple alert | `references/Modal Dialogs.md` |
| Multi-Column Layouts | Page layout with columns | `references/Multi-Column-Layouts.md` |
| Notifications | With actions below | `references/Notifications.md` |
| Progress Bars | Step progress indicator | `references/Progress Bars.md` |
| Radio Groups | Simple list, List with description, Simple table, Color picker, Cards | `references/Radio Groups.md` |
| Select Menus | Branded with supported text | `references/Select Menus.md` |
| Sidebar Layouts | Page layout with sidebar | `references/Sidebar-Layouts.md` |
| Stacked Lists | Vertical item list | `references/Stacked Lists.md` |
| Stacked Layouts | Page layout stacked | `references/Stacked-Layouts.md` |
| Tables | With hidden headings | `references/Tables.md` |
| Tabs | Tabs with underline, Tabs in pills | `references/Tabs.md` |
| Textareas | Labeled textarea with styling | `references/Textareas.md` |
| Toggles | Simple toggle, Toggle with label and description | `references/Toggles.md` |
| Vertical Navigation | With icons and badges | `references/Vertical Navigation.md` |

## Instructions

### Step 1 — Match the request to a component

Look at what the user is building and check whether a matching component exists in the table above. If no component matches, **do not use this skill** — build the element from scratch with plain Tailwind classes.

### Step 2 — Read the reference file

Before writing any code, read the relevant reference file from `references/`. Each file contains one or more named variants as HTML code blocks. Choose the variant that best fits the user's context.

```
read references/<ComponentName>.md
```

### Step 3 — Adapt the example

Take the HTML from the reference file and adapt it to the user's content:
- Replace placeholder text (`Button text`, `Lorem ipsum`, etc.) with real content
- Replace placeholder images (`images.unsplash.com`) with actual image sources or meaningful `alt` text
- Replace `href="#"` with real routes or actions
- Remove variants the user doesn't need (keep only relevant ones)
- Adjust Tailwind classes if the design system requires it (colors, sizing, spacing)

### Step 4 — Preserve Tailwind patterns

Do **not** rewrite the class structure from scratch. The library follows consistent Tailwind patterns:
- Dark theme: `bg-white/5`, `text-white`, `text-gray-400`, `outline-white/10`
- Focus rings: `focus-visible:outline-2 focus-visible:outline-offset-2`
- Interactive states: `hover:bg-white/20`, `aria-selected:bg-indigo-500`
- Indigo as primary accent: `bg-indigo-500`, `text-indigo-400`, `outline-indigo-500`

Only override these when the user has an explicit design system that differs.

### Step 5 — Compose multiple components

When a page or section needs several components together (e.g., a form with Input Groups, Buttons, Checkboxes, and a Textarea), read all relevant reference files and compose them into a unified layout. Preserve consistent spacing and hierarchy.

## Usage Example

**User asks:** "Add an alert that shows a success message after saving"

1. Match → `Alerts.md`, variant "With actions" (green, has dismiss)
2. Read `references/Alerts.md`
3. Adapt: change text to "Changes saved successfully", adjust button labels to "View" / "Dismiss"
4. Output the adapted HTML

**User asks:** "Build a login form"

1. Match → `Input Groups.md` (email + password inputs), `Buttons.md` (submit button), `Checkboxes.md` (remember me)
2. Read all three reference files
3. Compose into a `<form>` with proper spacing
4. Adapt placeholder text and labels

## Notes

- All components are dark-themed by default. If the user's project uses a light theme, you will need to swap utility classes manually (e.g. `bg-gray-900` → `bg-white`, `text-white` → `text-gray-900`).
- Comboboxes use `<el-autocomplete>` and `<el-options>` custom elements — these require a compatible headless UI library (e.g. Headless UI for Alpine.js or React).
- Calendars are purely visual HTML templates — interactive date selection requires additional JavaScript logic.
