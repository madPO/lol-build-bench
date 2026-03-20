# Quickstart

## Local Development

To run the web application locally to test the inventory redesign:

```bash
# Navigate to the frontend workspace
cd web

# Install dependencies
bun install

# Start the Vite dev server
bun run dev
```

Visit `http://localhost:5173` to view the UI. Navigate to the champion build planner to interact with the new inventory component.

## Verification

After making changes, ensure you verify against the project standards:

```bash
cd web

# Check code formatting
bun run fmt.check

# Run linter
bun run lint

# Check TypeScript types
bun run build.types
```
