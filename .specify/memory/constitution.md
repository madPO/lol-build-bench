<!--
=== Sync Impact Report ===
Version change: 3.0.0 -> 3.1.0
Modified principles: none
Added sections:
  - Principle II. Data, Transformation, Actions
  - Principle III. Cloud Events & Event-Driven Persistence
  - Principle IV. Low Coupling, High Cohesion
  - Principle V. MVP-First Development
  - Development Workflow review checklist expanded (items 2-5)
Removed sections: none
Templates requiring updates:
  - .specify/templates/plan-template.md ............ compatible, no update needed
  - .specify/templates/spec-template.md ............ compatible, no update needed
  - .specify/templates/tasks-template.md ........... compatible, no update needed
  - .specify/templates/commands/ ................... no command files exist
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
- **Qwik JS frontend with BFF** — owns all UI rendering and
  acts as the Backend-For-Frontend. It runs on Bun, handles
  SSR, and proxies or reshapes Go API responses for the UI.

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

### III. Cloud Events & Event-Driven Persistence

All significant state changes MUST be expressed as events
conforming to the CloudEvents specification (v1.0+):

- Each event MUST include at minimum: `id`, `source`, `type`,
  `specversion`, and `data` fields per the CloudEvents spec.
- Persistence MUST be event-driven: the system records events
  as the primary source of truth. Current state is derived by
  replaying or projecting events.
- Events MUST be published to an internal event bus (in-process
  or message broker) before any read-model or projection is
  updated.
- Event types MUST use a namespaced, dot-separated naming
  convention (e.g., `lolbench.build.created`,
  `lolbench.champion.selected`).
- Consumers of events MUST be idempotent — processing the same
  event twice MUST NOT produce duplicate side effects.

**Rationale**: Event-driven persistence provides a complete
audit trail, decouples producers from consumers, and enables
temporal queries and replay-based debugging.

### IV. Low Coupling, High Cohesion

- **Low Coupling**: Modules MUST communicate through narrow,
  well-defined interfaces (function signatures, event contracts,
  or API endpoints). A module MUST NOT reach into the internals
  of another module. Shared mutable state between modules is
  forbidden.
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

### V. MVP-First Development

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

## Technology Stack

| Layer | Technology | Runtime / Tooling |
|-------|-----------|-------------------|
| Backend API | Go (latest stable) | `go build` / `go run` |
| Frontend UI | Qwik JS | Bun |
| Frontend BFF | Qwik server (SSR) | Bun |
| Package manager (frontend) | Bun | `bun install` |
| Event format | CloudEvents v1.0+ | Both stacks |
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
     the Qwik BFF, no HTML serving from Go backend).
  2. Code categorized as Data, Transformation, or Action — no
     mixed-category files.
  3. State changes expressed as CloudEvents; persistence is
     event-driven.
  4. No circular dependencies; modules have single
     responsibility.
  5. Feature delivers smallest viable slice (MVP-first).
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

**Version**: 3.1.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-18
