# 🤖 Agentic Coding Guidelines (AGENTS.md)

Auto-generated context and guidelines for coding agents.
**DO NOT REMOVE THE MANUAL ADDITIONS SECTION.**

## 1. 🏗️ Project Architecture & Structure

- **Framework Context**: Qwik JS (v1.19.2), Qwik City, Vite, Tailwind CSS, TypeScript (v5.4.5)
- **Directory Context**: The main application code lives inside the `web/` folder.
  - **CRITICAL**: Always run node commands (bun/vite/tsc) from within the `web/` directory using `workdir="web"`.
- **Architecture**: **Feature-Sliced Design (FSD)** is strictly enforced.
  - `src/app/`: Application-wide settings, global styles, routing configuration.
  - `src/pages/` (or `src/routes/`): File-based routing for Qwik City. Contains `index.tsx`, `layout.tsx`, and `index.ts` (API endpoints).
  - `src/widgets/`: Complex UI blocks composing features and entities (e.g., `header`, `sidebar`, `champion-build-board`).
  - `src/features/`: User interactions, business logic (e.g., `champion-select`, `item-build`, `save-build`).
  - `src/entities/`: Business entities (e.g., `champion`, `item`, `rune`). Should contain `ui`, `model` (types/state), `api` logic for that specific entity.
  - `src/shared/`: dont use.

## 2. 💻 Code Style & Conventions

### TypeScript & Types
- Strict mode is enabled. Define explicit interfaces/types for all models and API responses.
- Export types from `model/types.ts` where applicable.
- Use `import type { ... }` for type-only imports to help Qwik's optimizer split code efficiently.

### Naming Conventions
- **Files/Directories**: `kebab-case` (e.g., `champion-select.tsx`, `item-inventory.tsx`).
- **Components/Types/Interfaces**: `PascalCase` (e.g., `ChampionSelect`, `ItemInventory`, `ChampionState`).
- **Variables/Functions/Hooks**: `camelCase` (e.g., `fetchChampions`, `useBuildState`).
- **CSS Classes**: Tailwind utility classes directly in JSX `class="..."`.

### Imports & Exports
- Use absolute path aliases `~/` which maps to `src/`. Avoid deeply nested relative paths (e.g. `../../`).
- Order imports:
  1. Built-in Node modules
  2. External packages (`@builder.io/qwik`, etc.)
  3. Absolute imports (`~/shared/...`, `~/entities/...`)
  4. Relative imports (`./model/filters`)

### Qwik Specifics
- Always wrap components in `component$(...)`.
- Use Qwik hooks for state management: `useSignal()`, `useStore()`, `useComputed$()`, `useTask$()`.
- Event handlers, closures, and side-effects must have the `$` suffix (e.g., `onClick$`, `onInput$`, `routeLoader$`).
- Leverage Qwik City's `routeLoader$` for data fetching on the server and `routeAction$` for form submissions/mutations.

### Styling & Error Handling
- Use Tailwind CSS utility classes directly. Do NOT use `className` (use `class` instead).
- Avoid custom CSS unless absolutely necessary (add to `global.css` if so).
- Use standard `try/catch` blocks for asynchronous tasks.
- Ensure API fallbacks or loading states are represented in the UI (e.g., missing images, empty states).
- Use Qwik Error Boundaries for catching rendering errors where appropriate.

## 3. 🛠️ Build, Lint, and Test Commands

*Important: Execute all bun/build commands from the `web/` directory!*

- **Install dependencies**: `bun install`
- **Development Server**: `bun run dev` (starts Vite SSR dev server)
- **Production Build**: `bun run build`
- **Linting**: `bun run lint` (runs ESLint)
- **Formatting**: `bun run fmt` (runs Prettier) or `bun run fmt.check` to verify.
- **Type Checking**: `bun run build.types` (runs `tsc --noEmit`)

### Testing Strategy
- **Full Suite**: `bun test` (Uses Vitest if configured, else standard test runner).
- **Single Test**: `bunx vitest run path/to/file.spec.tsx` (or `bun test -- path/to/file`).
- Tests should be written in `.spec.tsx` or `.test.ts` files alongside the component (e.g., `ui/champion-select.spec.tsx`).
- For Qwik components, use `@builder.io/qwik/testing` (e.g., `createDOM()`) for component mounting.
- Assert component rendering and user interactions using `@testing-library/dom` or similar if set up.

## 4. 📝 Development Workflow

1. **Understand FSD**: Before creating a new component, decide whether it is a `shared` UI, a business `entity`, a `feature`, or a `widget`. Follow the directory structure strictly.
2. **Context Check**: Check existing `data/*.json` files in `src/data/` for mock data structures (e.g., `champions.json`).
3. **Draft Plan**: For complex components, first build a simple prototype with placeholder data to get user approval.
4. **Verification**: After modifying code, ALWAYS verify your changes by running `bun run lint` and `bun run build.types`. Do not commit code with TypeScript errors.

## 5. 🔒 Security & Performance

- Never expose API keys or sensitive variables in the client-side code.
- Prefer `useComputed$` for derived state to avoid unnecessary re-renders.
- Use `loading="lazy"` on images and consider Qwik's built-in `<img>` component optimizations where applicable.
- Ensure proper ARIA attributes are used for accessibility on interactive elements (e.g., `aria-label`, `role="button"`).
- Minimize the amount of data serialized into the HTML; only pass necessary state to client-side components.

## Recent Changes
- 008-game-data-api: Added Go 1.21+ + `clickhouse-go/v2`, `graphql-go/graphql`, `go-chi/chi/v5`
- 007-datadragon-importer: Added Go 1.21+ + `clickhouse-go/v2`, `cloudevents/sdk-go`
- 007-datadragon-importer: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]


<!-- MANUAL ADDITIONS START -->

Dont commit any changes.

<!-- MANUAL ADDITIONS END -->

## Active Technologies
- Go 1.21+ + `clickhouse-go/v2`, `graphql-go/graphql`, `go-chi/chi/v5` (008-game-data-api)
- ClickHouse (read-only operations) (008-game-data-api)
