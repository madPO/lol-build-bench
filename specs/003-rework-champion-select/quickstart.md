# Quickstart: Champion Select UI Rework

This document details how to start building the new combined Champion Selection and Stats UI within the Qwik frontend project.

## 1. Directory Setup

Create the required Feature-Sliced Design (FSD) directories under `web/src/`:

```bash
cd web
mkdir -p src/widgets/champion-select-board
mkdir -p src/features/select-champion/ui
mkdir -p src/entities/champion/ui
mkdir -p src/entities/champion/model
```

## 2. Implement the Entity (Champion)

1. Define the types in `src/entities/champion/model/types.ts` according to the data-model contract.
2. Build the stateless `<ChampionAvatar />` in `src/entities/champion/ui/avatar.tsx`. This component should handle both the "empty" state and the "populated" state, reacting to click events via an `onClick$` prop.
3. Build the stateless `<ChampionStats />` in `src/entities/champion/ui/stats.tsx`. Use a Tailwind grid (`grid`, `grid-cols-2` or `grid-cols-3`, `text-sm`, `gap-2`) to ensure no scrolling is required.

## 3. Implement the Feature (Modal)

1. Build the `<SelectChampionModal />` in `src/features/select-champion/ui/modal.tsx`.
2. Use a native HTML `<dialog>` element. Bind a Qwik `useVisibleTask$` or ref to trigger `.showModal()` when its `isOpen` signal is `true`.
3. Render the grid of champion buttons inside. Add Tailwind `group` and `group-hover:opacity-100` classes to a nested span for the tooltip functionality.

## 4. Assemble the Widget

1. Build `<ChampionSelectBoard />` in `src/widgets/champion-select-board/ui.tsx`.
2. Introduce a local `useSignal<string | null>(null)` to track the selected champion ID, and another `useSignal<boolean>(false)` to track modal visibility.
3. Render the `<ChampionAvatar />` and `<ChampionStats />` side-by-side (using flexbox or grid).
4. Include the `<SelectChampionModal />` in the DOM tree, passing the toggle signal and selection callback.

## 5. Verify & Test

- Make sure to run the project from the `web` directory:
  ```bash
  cd web
  bun run dev
  ```
- Click the empty avatar. Ensure the modal opens instantly (<200ms).
- Hover over a champion to verify the CSS-only tooltip shows the correct name.
- Select a champion. Ensure the modal closes, the avatar updates, and stats populate without horizontal or vertical scrollbars.