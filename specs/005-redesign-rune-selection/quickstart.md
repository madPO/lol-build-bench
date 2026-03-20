# Quickstart: Rune Selection Redesign

This guide explains how to get started with developing and testing the Rune Selection Redesign feature.

## Prerequisites

Ensure you have the following installed:
- [Bun](https://bun.sh/) (v1.x) - The project uses Bun as the package manager and runtime.

## Running the Application

1. **Navigate to the frontend directory**:
   The primary workspace for this feature is the `web/` directory.
   ```bash
   cd web
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Start the development server**:
   This will start the Qwik SSR dev server with Vite.
   ```bash
   bun run dev
   ```

4. **View the application**:
   Open your browser to `http://localhost:5173` (or the port specified in your terminal). Navigate to the page containing the champion/build configuration to see the rune selection section.

## Development Workflow

- **FSD Architecture**: Ensure all new files are placed correctly within `web/src/` (`widgets`, `features`, `entities`). Do not use a `shared` directory.
- **State Changes**: The `calculateNewSelectionState` pure function handles selection logic. Update this function in `features/select-rune-branch/model/transformations.ts` if interaction rules change.
- **Styling**: Use standard Tailwind CSS utility classes. Basecoat CSS (`basecoatui.com`) classes may be utilized for tooltips and structure where applicable.

## Validation

Before submitting a PR, verify the build and linting rules from within the `web/` directory:

```bash
bun run lint
bun run build.types
```

*(Note: Automated testing is currently deferred per the project constitution, but ensuring no TypeScript or linting errors is mandatory).*