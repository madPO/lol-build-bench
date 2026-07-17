---
name: matte-clair-obscur-ui
description: Use when designing, reviewing, or implementing premium product interfaces in a matte clair-obscur aesthetic, especially dashboards, task trackers, admin panels, notes apps, project tools, and productivity UIs with quiet dark navigation chrome, a warm light workspace, tonal hierarchy, matte surfaces, subtle depth, and restrained accents rather than glow, glassmorphism, neon, or decorative lighting.
metadata:
  short-description: Premium dark-chrome, light-workspace UI direction
---

# Matte Clair-Obscur UI

## Use This Skill When

- Creating or refining a premium SaaS/product interface with dark navigation chrome and a light, warm focal workspace.
- Designing dashboards, task trackers, admin panels, notes apps, project tools, or productivity layouts.
- Reviewing whether a UI feels premium, focused, calm, and production-ready.
- Translating a visual direction into Tailwind/CSS tokens, component states, or AI image/interface prompts.

## Core Direction

Create premium product interfaces inspired by controlled light and shadow. The UI should feel cinematic but practical: quiet dark navigation, one generously illuminated warm workspace, restrained accent color, subtle layered shadows, matte surfaces, and strong readability.

The result should look like a realistic high-end SaaS interface, not a sci-fi HUD, fantasy illustration, glossy concept shot, or neon dashboard.

## Reference Direction: Light Workspace, Dark Chrome

Use this as the preferred default for task-tracker and project-management apps:

- Dark left navigation and optional secondary navigation: near-black, coal, or charcoal, visually quiet and lower contrast than content.
- Light main content area: warm stone, parchment, ivory, or sand gradient covering the entire right/content side, not just inner cards.
- Main workspace cards: warm translucent white/stone surfaces with low-contrast stone borders and soft shadows.
- Lists: prefer unboxed row groups on the light workspace. Do not wrap every list in a heavy bordered container unless the design needs table-like containment.
- Rows: matte, readable, separated by spacing or very soft dividers; no bright glow and no default “first item selected” effect.
- Timeline/schedule rails: can be light too. Use warm stone backgrounds, subtle amber timeline dots/lines, and quiet dividers.
- Primary actions: one dominant black/near-black button style on the light workspace.
- Accent: muted brass/amber only for active states, focus rings, timeline dots, or important affordances.

## Design Workflow

1. Establish a dark navigation foundation and a light warm workspace before choosing accent colors.
2. Make the full content side the clear focal workspace, not just a single nested card.
3. Keep navigation and secondary chrome visually quieter and darker than the main working surface.
4. Use typography, spacing, surface value, and alignment to create hierarchy.
5. Add depth through matte layers, low-contrast borders, and soft plausible shadows.
6. Apply one restrained accent only where it clarifies action, active state, or important status.
7. Check that the interface remains readable, accessible, and product-grade without glow.

## Visual Principles

### Tonal Hierarchy First

- Build hierarchy primarily through lightness and darkness, not saturated color.
- Reserve the brightest zone for the main work area. In apps with a dark sidebar, the entire right side should read as the illuminated workspace.
- Let metadata, inactive navigation, and supporting controls recede into quieter tonal bands.

### Matte Surfaces

- Surfaces should feel dense and tactile, like charcoal paper, brushed slate, smoked metal, dark card stock, matte ceramic, or graphite.
- For light workspaces, surfaces should feel like warm paper, matte stone, parchment, sand, or soft ceramic rather than plain white.
- Prefer low-contrast borders, faint dividers, and subtle shifts in surface value.
- Avoid glossy reflections, translucent glass, neon rims, bloom, and luminous card edges.

### One Dominant Focal Area

- Create one clearly illuminated area of attention.
- Do not make every card, row, and control equally prominent.
- Selected states should feel more resolved and slightly more lit, while staying calm. Do not invent selection states where the product has none.

### Plausible Depth

- Use layered surfaces and physically plausible shadows.
- Combine a wide, soft ambient shadow with a tighter contact shadow where useful.
- Keep hover elevation subtle. Avoid black fog shadows, blur halos, and theatrical lifts.

### Editorial Typography

- Use clean, modern, legible sans-serif typography with product-grade proportions.
- Let type scale and weight separate page titles, row titles, labels, metadata, and actions.
- Favor clarity, rhythm, and alignment over decorative display type.

## Palette Guidance

Use mostly neutral dark chrome plus warm light content tones:

- Background: near-black, coal, or deep charcoal.
- Sidebar: charcoal with a slightly cooler or quieter undertone.
- Main content side: warm ivory, parchment, stone, sand, or clay-tinted gray.
- Elevated surface: translucent warm white, matte stone, or very pale ceramic.
- Primary text on light surfaces: near-black stone.
- Secondary text on light surfaces: medium warm stone.
- Primary text on dark chrome: soft warm gray or stone.
- Secondary text on dark chrome: ash gray.
- Accent: dim amber, desaturated brass, smoky teal, dusty olive, or muted moss. For this variant, prefer muted brass/amber.
- Warning: restrained rust or amber.
- Success: muted moss or dark green.

Use status colors sparingly and never rely on color alone for meaning.

## Layout Guidance

### Global Layout

- Use a quiet dark sidebar, an optional dark secondary rail, and a clearly light illuminated main content area.
- Prefer one dominant workspace, optionally supported by a secondary detail pane.
- Keep utility actions minimal and visually disciplined.
- Avoid making the main content appear as a small light card floating inside a dark page. The whole content side should be light when this variant is used.

### Sidebar

- Keep the sidebar visually in shadow.
- Use lower contrast than the content pane.
- Highlight the active item with a lighter surface, stronger text, and a small controlled accent if needed.

### Lists And Rows

- Keep rows flat-to-matte rather than glowing.
- Emphasize selected rows with a lighter surface value, sharper text contrast, refined border, or subtle depth.
- Keep metadata visibly secondary.
- Avoid colorful row fills unless status truly requires it.
- For simple task and issue lists, prefer unwrapped lists: rows arranged directly on the light workspace with spacing or subtle separators.
- Avoid enclosing every list in a heavy border, rounded table shell, or shadowed wrapper. Use wrappers only when grouping is semantically useful.
- Do not automatically highlight the first row. Selection must reflect actual product state.

### Forms, Palettes, And Dialogs

- Use warm matte dialog surfaces over a dark translucent backdrop.
- Keep fields light with stone borders and visible amber/brass focus rings.
- Use black or near-black primary buttons on light surfaces.
- Use bordered warm secondary buttons for cancel/archive/edit actions.
- Preserve strong contrast; do not place low-contrast gray text on warm light backgrounds.

### Timeline And Schedule Views

- Timeline rails may be light, especially when embedded in a light workspace.
- Use warm stone backgrounds, quiet dividers, muted time labels, and restrained amber/brass markers.
- Avoid turning timeline dots or rules into glowing indicators.

### Action Hierarchy

- Guide the eye in this order: current view title, primary action, selected item, due/status state, secondary metadata.
- Use exactly one dominant CTA color on screen at a time.

## Interaction Guidance

- Hover states: slight surface lift, clearer border, or small contrast increase.
- Focus states: crisp and accessible, not glowing.
- Selected states: intentional, calm, and resolved.
- Motion: short, controlled, and purposeful. Avoid light sweeps, dramatic reveals, or energetic game-like effects.

## Avoid

- Glow effects, bloom, neon rims, luminous borders, and backlit cards.
- Blue-purple futuristic gradients as the main visual language.
- Glassmorphism, glossy transparency, chrome, jelly, holographic, acrylic, or liquid plastic aesthetics.
- Equal contrast across every panel.
- Color-only hierarchy or status.
- Over-elevated hover states and theatrical shadows.
- Turning productivity software into a sci-fi control panel.

## Prompt Template

Use this when asking an image model, design agent, or UI generator to produce this style:

```text
Design a premium web application interface in a matte clair-obscur style. Use quiet dark navigation chrome and a full light warm workspace on the content side. Build hierarchy with tonal contrast, spacing, typography, matte stone/parchment surfaces, low-contrast borders, and soft plausible shadows. Use one restrained accent such as muted brass or amber for active states, focus, and timeline markers. Use black or near-black primary buttons on light surfaces. Lists should feel matte and readable, often unboxed directly on the workspace rather than wrapped in heavy bordered containers. Avoid glow, bloom, neon edges, glassmorphism, glossy reflections, and futuristic sci-fi styling. The result should look like a realistic modern SaaS product, calm and production-ready.
```

## Task Tracker Variant

Use this for task dashboards and project tools:

```text
Design a task tracker dashboard in a matte clair-obscur style. Include a quiet dark sidebar, optional dark secondary rail, and a full light warm content side. Use warm stone/parchment workspace surfaces, editorial page titles, black primary actions, restrained amber/brass accents, and matte rows. Task and issue lists should usually be unboxed: rows sit directly on the light workspace with spacing or subtle separators, not inside a heavy bordered wrapper. The day timeline can also be light, with quiet dividers and muted amber markers. Never use glow, neon, glassmorphism, or glossy effects. Keep the interface cinematic but practical, premium but understated, dramatic but fully usable.
```

## Quality Check

Before finalizing the UI, verify:

- The focal area is obvious without using glow.
- Hierarchy comes from tone, spacing, typography, and surface treatment first.
- The accent color is restrained and purposeful.
- Rows and cards feel matte and realistic rather than luminous.
- The UI looks like a real product interface rather than concept art.
- The sidebar is quieter than the task area.
- The main content side is light and continuous when using the light-workspace variant.
- Lists are not unnecessarily boxed; wrappers are used deliberately.
- Selected, hover, and focus states are refined rather than flashy.
- Text and controls remain readable and accessible.

## One-Line Descriptor

Matte clair-obscur dashboard UI: premium product design with quiet dark navigation, a full warm light workspace, matte stone/parchment surfaces, unforced list presentation, soft shadows, restrained brass/amber accents, and absolutely no glow.
