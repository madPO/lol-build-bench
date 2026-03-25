# Phase 0: Research & Technical Context

## Knowns vs Unknowns

1. **Where exactly is the main layout configured in this Qwik app to apply the `100vh` flex layout and prevent global scrolling?**
   - **Decision:** Create a global route wrapper at `src/routes/layout.tsx` to handle the `h-screen overflow-hidden flex flex-col` logic. Adjust `src/widgets/build-workspace/ui/page-layout.tsx` to use `h-full` instead of `h-screen`.
   - **Rationale:** This ensures the footer is permanently visible on all pages (FR-001) while handling scrolling properly (FR-005) without breaking the existing app grid.
   - **Alternatives considered:** Modifying `PageLayout` directly (not ideal since it's a specific widget for the build planner, not a global layout widget).

2. **How is the League of Legends game patch sourced?**
   - **Decision:** Define a constant `LOL_GAME_PATCH` in a configuration file (e.g., `src/app/config/constants.ts`).
   - **Rationale:** The user specifically requested using a constant variable for the game patch rather than dynamically fetching application versions or using environment variables.
   - **Alternatives considered:** Reading `package.json` or using Vite env vars (rejected per user request).

3. **Where should the GitHub link be configured?**
   - **Decision:** Define it as a constant `GITHUB_REPO_URL` inside `src/app/config/constants.ts`.
   - **Rationale:** Fulfills the explicit user request to use a constant variable instead of an environment variable.

4. **FSD Structure for the footer:**
   - **Decision:** Create an `app-footer` widget at `src/widgets/app-footer`.
   - **Rationale:** The footer is a complex UI block that can compose other elements. FSD states widgets are used for such blocks.
   - **Alternatives considered:** Creating it in `app/` (wrong layer) or `shared/` (strictly forbidden by the Constitution).
