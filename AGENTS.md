# Skill Policy

Use repository skills as the primary source of task-specific guidance whenever a task falls into a covered domain.

`functional-thinking` is the default foundational skill for code-related work. For tasks involving code design, implementation, refactoring, architecture, code review, testability, or project structure, apply `functional-thinking` first and then combine it with the most specific domain skill.

General rules:

- First classify the task by domain, primary operation, and intended artifact.
- For code-related work, start with `functional-thinking`.
- Then select the most specific applicable skill for the domain and main deliverable.
- Prefer one primary domain skill at a time unless two skills are clearly complementary.
- Do not skip an obviously relevant skill just because the task looks simple.
- If no domain-specific skill applies, continue with `functional-thinking` alone for code work, or proceed normally for non-code operational work.
- Re-evaluate skill selection when the task shifts from analysis to implementation, from execution to diagnostics, or from project-wide scope to a narrow target.

Priority order:

1. User request
2. Repository rules in AGENTS.md
3. `functional-thinking` for code-related work
4. Applicable domain-specific repository skill
5. Existing repository conventions and code patterns
6. General programming knowledge

# Skill Routing

## Global baseline

- Use `functional-thinking` for code design, implementation, refactoring, architecture reasoning, code review, testability, and project structure decisions.
- Combine other code-related skills with `functional-thinking` when they influence code shape, effect boundaries, abstractions, or decomposition.

## UI and frontend work

- Use `ui-component-design` for UI component design, component review, accessibility, icon choice, and UI copy.
- Use `matte-clair-obscur-ui` when designing, reviewing, or implementing premium product interfaces with quiet dark navigation chrome, a warm light workspace, matte surfaces, tonal hierarchy, subtle depth, and restrained accents.
- Use `tailwind-blocks` when building or styling a UI element and an appropriate Tailwind Blocks component already exists.
- Use `qwik-dev-en` for Qwik or QwikCity application work, including components, routing, loaders, actions, and framework best practices.
- Prefer `ui-component-design` for design and UX decisions.
- Prefer `matte-clair-obscur-ui` for visual direction when the requested interface uses or should preserve that aesthetic.
- Prefer `tailwind-blocks` for implementation from an existing component pattern.
- Prefer `qwik-dev-en` when the task is framework-specific to Qwik/QwikCity.
- Combine `matte-clair-obscur-ui` with `ui-component-design` for aesthetic and UX decisions, and with `tailwind-blocks` or `qwik-dev-en` when implementation is also required.

## Architecture and code organization

- Use `fsd-architecture` for Feature-Sliced Design structure, project organization, module boundaries, scaffolding, or architecture review in FSD-based projects.
- Use `cloudevents` for CloudEvents modeling, event contracts, event production/consumption, or transport-specific CloudEvents handling.
- Use `ddd-event-storming-monolith` for modular monolith backend design that maps transport requests to commands, commands to aggregates or domain services, and business outcomes to domain events with in-process handlers.
- Combine these skills with `functional-thinking` when the task affects boundaries, composition, or domain flow.

## Go development

- Use `golang-concurrency` when writing or reviewing concurrent Go code involving goroutines, channels, `select`, synchronization primitives, `errgroup`, `singleflight`, worker pools, or fan-out/fan-in pipelines, and when diagnosing leaks, races, or channel ownership.
- Use `golang-context` when designing context propagation across API boundaries, cancellation, timeouts, deadlines, request-scoped values, or background work that outlives a request. Do not load it solely because Go code accepts `context.Context` as its first parameter.
- Use `golang-design-patterns` when choosing Go architecture or API patterns, including constructors, functional options, dependency injection, resource lifecycles, graceful shutdown, resilience, streaming, and data handling.
- Use `golang-error-handling` when creating, wrapping, inspecting, joining, logging, or recovering from errors in Go, including custom and sentinel errors, `errors.Is`/`errors.As`, `%w`, `slog`, and HTTP request logging.
- Use `golang-grpc` for Go gRPC servers or clients, protobuf organization, interceptors, status codes, TLS/mTLS, streaming RPCs, `bufconn` tests, or gRPC debugging.
- Combine the Go skills when their concerns overlap. For example, gRPC work commonly also needs `golang-context`, `golang-error-handling`, or `golang-concurrency`; use `golang-design-patterns` only when the task includes an explicit API, lifecycle, resilience, or architecture decision.

## Commit workflow

- Use `git-commit` when the primary artifact is a git commit message in Conventional Commits style.

# Repository Guidelines

## Project Structure & Module Organization

LoL Build Bench has a Go backend and a Qwik frontend. Go entry points live in `cmd/server` (HTTP/GraphQL server) and `cmd/import-cli` (Data Dragon importer). Backend packages are under `internal/`: keep HTTP handlers in `handlers`, persistence in `repository` and `data`, domain types in `domain` or `models`, and external-data transformations in `transformation`.

The frontend is in `web/`. Use the existing feature-sliced layout: reusable game data belongs in `src/entities`, user interactions in `src/features`, composed UI in `src/widgets`, and route-level screens in `src/pages` and `src/routes`. Static assets are in `web/public`; checked-in game-data fixtures are in `web/src/data`. Feature specifications and implementation plans live under `specs/<number>-<feature>/`.

## Build, Test, and Development Commands

- `go test ./...` runs all Go package tests; run it from the repository root.
- `go run ./cmd/server` starts the backend server. Configure required database settings before using data-backed endpoints.
- `go run ./cmd/import-cli` runs the Data Dragon importer.
- `cd web && bun install` installs frontend dependencies (the lockfile is `bun.lock`).
- `cd web && bun run dev` starts the Qwik/Vite development server.
- `cd web && bun run lint`, `bun run build.types`, and `bun run build` respectively lint, type-check, and produce a production build.
- `cd web && bun run fmt.check` verifies Prettier formatting; use `bun run fmt` to apply it.

## Coding Style & Naming Conventions

Format Go with `gofmt`; use idiomatic Go package names and descriptive files such as `champion_schema.go`. Keep request parsing and response writing in handlers, with data access behind repository boundaries.

Use TypeScript and Qwik components in the frontend. Follow the existing lowercase, hyphenated filenames (for example, `build-planner-page.tsx`); component exports use PascalCase and functions/variables use camelCase. Let ESLint and Prettier determine formatting—do not hand-format around their output.

## Testing Guidelines

Add Go tests beside the package under test as `*_test.go`, using table-driven cases for transformations and domain logic. Run `go test ./...` before opening a change. Frontend automated tests are not currently configured; at minimum run lint, type checks, and a production build, then manually verify affected flows in the development server.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style messages, such as `feat(api): implement game data server` and `refactor(ui): standardize components`. Use `feat`, `fix`, `refactor`, `style`, or `docs`, with an optional focused scope.

Pull requests should explain the user-visible change, list validation commands run, link the relevant issue or `specs/` feature when applicable, and include screenshots for UI changes. Preserve the AGPL-3.0 license and required attribution in `NOTICE` when distributing modified work.
