<!--
=== Sync Impact Report ===
Version change: 3.2.0 -> 4.0.0
Modified principles:
  - I. Dual-Stack Separation (removed BFF references)
  - IV. Low Coupling, High Cohesion -> III. Low Coupling, High Cohesion (renumbered)
  - V. MVP-First Development -> IV. MVP-First Development (renumbered)
  - VI. Feature-Sliced Design (FSD) -> V. Feature-Sliced Design (FSD) (renumbered)
Added sections: none
Removed sections:
  - III. Cloud Events & Event-Driven Persistence
Templates requiring updates:
  - .specify/templates/plan-template.md ............ ✅ compatible
  - .specify/templates/spec-template.md ............ ✅ compatible
  - .specify/templates/tasks-template.md ........... ✅ compatible
Follow-up TODOs: none
=== End Sync Impact Report ===
-->

# LoL Build Bench Constitution

## Core Principles

### I. Dual-Stack Separation

The system is composed of two independently runnable stacks:

- **Go API backend** — owns persistence, domain logic, and
  exposes a JSON REST (or JSON-RPC) API. It MUST NOT serve
  HTML or frontend assets.
- **Qwik JS frontend** — owns all UI rendering. It runs on
  Bun, handles SSR, and consumes Go API responses for the UI.

Each stack MUST be buildable, startable, and deployable without
the other being co-located. Shared contracts (API schemas) are
the only coupling point.

**Rationale**: Dual-stack separation allows each technology to
evolve at its own pace, enables independent scaling, and keeps
the Go domain layer free of presentation concerns.

### II. Data, Transformation, Actions

All code MUST be organized into three explicit categories:

- **Data** — plain, immutable value objects that carry state.
  Data structures MUST NOT contain business logic, side effects,
  or framework dependencies. In Go these are plain structs; in
  Qwik these are typed interfaces or readonly objects.
- **Transformations** — pure functions that accept Data and
  return new Data. Transformations MUST be deterministic: same
  input always produces the same output. They MUST NOT perform
  I/O, mutate arguments, or access global state.
- **Actions** — impure operations that interact with the outside
  world (HTTP calls, database writes, file I/O, user events).
  Actions orchestrate Transformations and Data but MUST keep
  their own logic minimal — complex decisions belong in
  Transformations.

Every module, file, or package MUST clearly indicate which
category it belongs to. Mixing categories within a single unit
is forbidden (e.g., a Transformation function MUST NOT perform
an HTTP call).

**Rationale**: Separating pure logic from side effects makes
the codebase predictable, easier to reason about, and naturally
composable.

### III. Low Coupling, High Cohesion

- **Low Coupling**: Modules MUST communicate through narrow,
  well-defined interfaces (function signatures, or API endpoints).
  A module MUST NOT reach into the internals of another module.
  Shared mutable state between modules is forbidden.
- **High Cohesion**: Each module MUST have a single, clearly
  stated responsibility. All code within a module MUST relate
  directly to that responsibility. If a module serves two
  unrelated purposes, it MUST be split.
- Dependency direction MUST flow inward: outer layers (Actions,
  transport, UI) depend on inner layers (Transformations, Data),
  never the reverse.
- Circular dependencies between packages or modules are
  forbidden.

**Rationale**: Low coupling enables independent change and
deployment; high cohesion makes each unit understandable in
isolation. Together they reduce the blast radius of changes.

### IV. MVP-First Development

All features MUST be delivered in Minimum Viable Product
increments:

- Each feature MUST ship the smallest useful slice first.
  Gold-plating, speculative generalization, and "just in case"
  abstractions are forbidden.
- A feature is considered viable when a user can complete the
  core workflow end-to-end, even if edge cases or polish are
  deferred.
- Subsequent iterations MUST be driven by observed usage or
  explicit user feedback, not assumptions.
- Premature optimization is forbidden. Performance work MUST
  be justified by measured bottlenecks, not speculation.
- Each MVP increment MUST be independently deployable and
  MUST NOT break previously shipped functionality.

**Rationale**: MVP-first delivery maximizes learning speed,
reduces wasted effort, and ensures every increment delivers
real user value.

### V. Feature-Sliced Design (FSD)

All frontend codebase structure MUST strictly adhere to the Feature-Sliced Design (FSD) architecture. The structure MUST be organized by `app`, `pages` (or `routes`), `widgets`, `features`, and `entities`.

- **Forbidden Directory**: The `shared` directory MUST NOT be used under any circumstances.
- **Strict Hierarchy**: Dependencies MUST only point inwards (e.g., `app` can import `pages`, `pages` can import `widgets`, `widgets` can import `features` or `entities`).
- **Separation of Concerns**: Each slice MUST contain its own UI, model, and API logic where applicable.

**Rationale**: FSD maintains separation of concerns, high cohesion, and a predictable structure. Banning the `shared` directory prevents it from becoming an unmaintainable dumping ground for loosely related code, forcing better domain modeling within specific entities or features.

## Technology Stack

| Layer | Technology | Runtime / Tooling |
|-------|-----------|-------------------|
| Backend API | Go (latest stable) | `go build` / `go run` |
| Frontend UI | Qwik JS | Bun |
| Package manager (frontend) | Bun | `bun install` |
| Testing | Skipped | Per project owner decision |

Additional constraints:

- The Go backend MUST NOT embed or import Node/Bun packages.
- The Qwik frontend MUST use Bun as its sole JS runtime and
  package manager; npm/yarn/pnpm are not permitted.
- Database technology is not yet specified. When selected, this
  section MUST be amended.

## Development Workflow

- **Branching**: Feature branches off `next`. One feature per
  branch. Merge via pull request.
- **Commit discipline**: Commits MUST be atomic and descriptive.
  Use conventional-commit prefixes (`feat:`, `fix:`, `refactor:`,
  `docs:`, `chore:`).
- **Code review**: Every PR MUST be reviewed against constitution
  principles before merge. The review checklist includes:
  1. Dual-stack boundary respected (no direct DB access from
     the Qwik frontend, no HTML serving from Go backend).
  2. Code categorized as Data, Transformation, or Action — no
     mixed-category files.
  3. No circular dependencies; modules have single
     responsibility.
  4. Feature delivers smallest viable slice (MVP-first).
  5. Frontend architecture strictly follows Feature-Sliced Design (FSD) and does NOT use a `shared` directory.
- **Build verification**: Both stacks MUST build without errors
  before a PR is approved (`go build ./...` and `bun run build`).
- **No test gates**: Since testing is deferred, CI pipelines
  MUST NOT fail on missing tests. If testing is later adopted,
  amend this constitution first.

## Governance

This constitution is the highest-authority document for the
LoL Build Bench project. All development decisions, code reviews,
and architectural choices MUST comply with its principles.

- **Amendments** require:
  1. A written proposal describing the change and its rationale.
  2. An update to this document with version increment per
     semantic versioning (see below).
  3. A migration plan if the amendment invalidates existing code.
- **Versioning policy**:
  - MAJOR: Principle removed or fundamentally redefined.
  - MINOR: New principle or section added, or material expansion
    of existing guidance.
  - PATCH: Clarifications, wording fixes, non-semantic
    refinements.
- **Compliance review**: Every pull request MUST include a
  brief constitution-compliance note (even if just
  "No constitution impact").

**Version**: 4.0.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-22
