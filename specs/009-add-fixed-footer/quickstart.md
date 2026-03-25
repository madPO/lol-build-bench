# Quickstart: Fixed Footer Feature

This document explains how to integrate and use the application footer in the project.

## Constants Configuration

The footer requires the following constant variables to be defined in `src/app/config/constants.ts`:

```typescript
export const GITHUB_REPO_URL = "https://github.com/my-org/my-repo";
export const LOL_GAME_PATCH = "14.7";
```

Update these values when the repository location or the supported game patch changes.

## Structure Integration

The footer is implemented as a Qwik City widget located at `src/widgets/app-footer/ui/app-footer.tsx`. It is globally integrated using `src/routes/layout.tsx`.

## How it works

The global layout `src/routes/layout.tsx` is structured as a full viewport, non-scrolling grid/flexbox:

```tsx
<div class="h-screen w-screen overflow-hidden flex flex-col">
  <div class="flex-1 overflow-hidden">
    <Slot />
  </div>
  <AppFooter />
</div>
```

Any main page content that is taller than the viewport must implement `overflow-y-auto` inside its own component wrapper to prevent the global body from scrolling, fulfilling FR-005.
