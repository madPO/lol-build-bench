---
name: fsd-architecture
description: >-
  Organize project code following an adapted Feature-Sliced Design (FSD) architecture.
  Use when the user asks to structure, scaffold, reorganize, or review project layout
  using FSD, feature-sliced, or layered architecture principles. Applies to both
  JavaScript/TypeScript web projects and Go (Golang) projects. Key adaptations:
  no "shared" layer (its logic is absorbed into entities/features/widgets),
  no "app" layer (entry point is language/framework-specific), the FSD root
  is "src/" for web or "internal/"/"pkg/" for Go, no barrel/index re-export files,
  no "lib" segment, and file names must be descriptive (never "model.go" or "index.ts").
metadata:
  author: social@madpo.me
  version: '2.0'
---

# Feature-Sliced Design — Adapted for Web and Go

An adapted Feature-Sliced Design (FSD) methodology for organizing code in both
JavaScript/TypeScript web projects and Go projects. This variant removes the
`shared` and `app` layers, forbids barrel/re-export files, removes the `lib`
segment, and enforces descriptive file naming — making the architecture
language-agnostic while preserving the core FSD principles of layered
decomposition, unidirectional imports, and high cohesion / low coupling.

## When to Use This Skill

Use this skill when:

- Structuring a new project (web or Go) from scratch.
- Reorganizing or refactoring an existing codebase to follow FSD.
- Reviewing a pull request or project layout for FSD compliance.
- Generating new files or modules and deciding where they belong.
- The user mentions "FSD", "feature-sliced", or "layered architecture".

## Core Concepts

FSD organizes code into three hierarchical levels:

1. **Layers** — top-level directories that separate code by responsibility level.
2. **Slices** — subdirectories within a layer that group code by business domain.
3. **Segments** — subdirectories within a slice that group code by technical purpose.

## Layers

This adaptation uses **four layers**, ordered from most responsibility (top) to
least responsibility (bottom):

| Priority | Layer        | Purpose                                                        |
|----------|--------------|----------------------------------------------------------------|
| 1 (top)  | `pages`      | Full screens, routes, or entry-level compositions              |
| 2        | `widgets`    | Large, self-contained UI or logic blocks                       |
| 3        | `features`   | Reusable product-level functionality that brings business value |
| 4 (bottom)| `entities`  | Core business concepts and domain models                       |

### Removed Layers

- **`app`** — REMOVED. The application entry point, routing setup, global
  providers, and framework bootstrapping live **outside** the FSD root.
  The location is language/framework-specific:
  - **Go**: `cmd/` directory (e.g., `cmd/server/main.go`).
  - **Web (Next.js)**: `app/` or `pages/` at the project root (framework convention).
  - **Web (Vite/CRA)**: `src/main.tsx` or `src/entry.ts`.
  - **Web (Nuxt)**: `app.vue`, `nuxt.config.ts` at the project root.
  - In all cases, this code is **not part of the FSD layer hierarchy** and should
    be kept minimal — it wires layers together but contains no business logic.

- **`shared`** — STRICTLY FORBIDDEN. Do **not** create a `shared` folder under
  any circumstances. All code that would traditionally go into `shared` must be
  placed in the appropriate layer instead:
  - **UI kit components** (buttons, inputs, modals) → `entities/ui-kit/ui/`.
  - **API client / HTTP utilities** → `entities/api-client/api/`.
  - **Utility code** (date formatting, string helpers) → place directly in the
    segment of the slice that uses it. If truly cross-cutting, create a dedicated
    entity slice (e.g., `entities/dates/`, `entities/formatting/`).
  - **Configuration and environment variables** → `config` segment of the
    relevant slice, or a dedicated `entities/config/` slice.
  - **i18n / localization** → `entities/i18n/`.
  - **Route constants** → kept in the framework-specific entry point area, outside FSD root.

### Removed Layer: `processes`

The `processes` layer is deprecated in canonical FSD and is **not used** in this
adaptation. Multi-step or cross-page workflows belong in `features`.

## FSD Root Directory

The FSD layers live under a **root directory** that depends on the language:

| Language / Stack       | FSD Root           | Example full path                      |
|------------------------|--------------------|----------------------------------------|
| JavaScript / TypeScript| `src/`             | `src/entities/user/model/user.ts`      |
| Go (domain logic)      | `internal/`        | `internal/entities/user/model/user.go` |
| Go (public libraries)  | `pkg/`             | `pkg/entities/money/currency.go`       |

- **Web projects**: all four layers reside under `src/`.
- **Go projects**: use `internal/` for private domain code (most FSD layers go
  here) and `pkg/` only for packages explicitly intended for external import.
  Typically, `pages` and `widgets` go into `internal/`, while reusable
  `entities` or `features` may optionally go into `pkg/` if they need to be
  importable by other Go modules.

### Example: Web Project (TypeScript + React)

```
my-app/
├── src/                              # FSD root
│   ├── pages/                        # Layer: Pages
│   │   ├── home/
│   │   │   ├── ui/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   └── HomeLayout.tsx
│   │   │   └── api/
│   │   │       └── fetchHomeData.ts
│   │   └── settings/
│   │       ├── ui/
│   │       │   └── SettingsPage.tsx
│   │       └── model/
│   │           └── settingsStore.ts
│   ├── widgets/                      # Layer: Widgets
│   │   ├── header/
│   │   │   └── ui/
│   │   │       ├── Header.tsx
│   │   │       └── Navigation.tsx
│   │   └── sidebar/
│   │       └── ui/
│   │           └── Sidebar.tsx
│   ├── features/                     # Layer: Features
│   │   ├── auth/
│   │   │   ├── ui/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── api/
│   │   │   │   ├── loginRequest.ts
│   │   │   │   └── signupRequest.ts
│   │   │   └── model/
│   │   │       └── authStore.ts
│   │   └── comments/
│   │       ├── ui/
│   │       │   └── CommentList.tsx
│   │       ├── api/
│   │       │   └── commentsApi.ts
│   │       └── model/
│   │           └── commentsStore.ts
│   └── entities/                     # Layer: Entities
│       ├── user/
│       │   ├── ui/
│       │   │   └── UserAvatar.tsx
│       │   ├── api/
│       │   │   └── userApi.ts
│       │   └── model/
│       │       ├── user.ts
│       │       └── userSchema.ts
│       ├── post/
│       │   ├── ui/
│       │   │   └── PostCard.tsx
│       │   ├── api/
│       │   │   └── postApi.ts
│       │   └── model/
│       │       └── post.ts
│       └── ui-kit/                   # Replaces shared/ui
│           └── ui/
│               ├── Button.tsx
│               ├── Input.tsx
│               └── Modal.tsx
├── app/                              # Framework entry (Next.js) — outside FSD
│   ├── layout.tsx
│   └── page.tsx
├── package.json
└── tsconfig.json
```

### Example: Go Project

```
my-service/
├── cmd/                              # Entry point — outside FSD
│   └── server/
│       └── main.go
├── internal/                         # FSD root (private)
│   ├── pages/                        # Layer: Pages (HTTP handlers / routes)
│   │   ├── home/
│   │   │   ├── homeHandler.go
│   │   │   └── homeRoutes.go
│   │   └── settings/
│   │       ├── settingsHandler.go
│   │       └── settingsRoutes.go
│   ├── widgets/                      # Layer: Widgets (composed logic blocks)
│   │   └── dashboard/
│   │       ├── dashboardService.go
│   │       └── metricsAggregator.go
│   ├── features/                     # Layer: Features
│   │   ├── auth/
│   │   │   ├── authService.go
│   │   │   ├── authMiddleware.go
│   │   │   └── credentials.go
│   │   └── comments/
│   │       ├── commentService.go
│   │       ├── commentRepository.go
│   │       └── comment.go
│   └── entities/                     # Layer: Entities
│       ├── user/
│       │   ├── user.go
│       │   ├── userRepository.go
│       │   └── userValidation.go
│       └── post/
│           ├── post.go
│           ├── postRepository.go
│           └── postValidation.go
├── pkg/                              # FSD root (public, optional)
│   └── entities/
│       └── money/
│           ├── money.go
│           └── currency.go
├── go.mod
└── go.sum
```

## The Import Rule (Unidirectional Dependencies)

This is the most important architectural rule:

> **A module in a slice can only import from slices on layers strictly below its own layer.**

Dependency direction flows **downward only**:

```
pages  →  widgets  →  features  →  entities
  ↓          ↓           ↓
  └──────────┴───────────┘  (can import from any layer below)
```

### What This Means in Practice

| Importing Module | Can Import From                          | CANNOT Import From           |
|------------------|------------------------------------------|------------------------------|
| `pages/*`        | `widgets/*`, `features/*`, `entities/*`  | other `pages/*` slices       |
| `widgets/*`      | `features/*`, `entities/*`               | `pages/*`, other `widgets/*` |
| `features/*`     | `entities/*`                             | `pages/*`, `widgets/*`, other `features/*` |
| `entities/*`     | nothing (bottom layer)                   | `pages/*`, `widgets/*`, `features/*`, other `entities/*` |

### Same-Layer Imports

Slices on the **same layer** CANNOT import from each other. This is the key
mechanism that ensures low coupling.

**Exception — Entity Cross-References (`@x`):**
When one entity must reference another (e.g., `Artist` contains a list of
`Song`), use an explicit cross-reference directory:

```
entities/
├── artist/
│   ├── model/
│   │   └── artist.ts       # imports from entities/song/@x/artistTypes.ts
│   └── @x/
│       └── songTypes.ts     # re-exports what song needs from artist
├── song/
│   ├── model/
│   │   └── song.ts
│   └── @x/
│       └── artistTypes.ts   # re-exports { Song } for artist to use
```

For Go, the same principle applies via dedicated sub-packages:

```go
// internal/entities/song/xartist/songForArtist.go
package xartist

import "my-service/internal/entities/song"

type Song = song.Song  // explicit re-export for artist package
```

### Intra-Slice Imports

Within the **same slice**, files can import each other freely. A slice is a
cohesive unit — internal organization is up to the developer.

## Slices

### Rules

1. **Named by business domain** — slice names reflect business concepts, not
   technical concerns (e.g., `user`, `payment`, `article`, not `components`,
   `hooks`, `helpers`).
2. **Zero coupling** — a slice must not depend on sibling slices within the same
   layer. Dependencies go only to lower layers.
3. **High cohesion** — a slice should contain most of the code related to its
   primary goal.
4. **Direct imports only** — external code imports specific files from a slice
   by their descriptive path (e.g., `features/auth/api/loginRequest`). There is
   no barrel file or public API facade (see "Forbidden Patterns" below).

### Slice Groups

Closely related slices can be grouped in a folder for navigation convenience:

```
entities/
├── @users/              # group folder (prefixed with @)
│   ├── user/
│   ├── organization/
│   └── team/
└── post/
```

The group folder must **not** contain any code — only slice subdirectories.

## Segments

Segments are subdirectories within a slice that separate code by technical
purpose.

### Standard Segments

| Segment   | Purpose                                                             |
|-----------|---------------------------------------------------------------------|
| `ui`      | UI components, visual representation, templates, styles             |
| `api`     | Backend/external service interactions, request functions, mappers    |
| `model`   | Data model: types, schemas, interfaces, stores, business logic      |
| `config`  | Configuration, feature flags, constants for this slice              |

### Segment Adaptation by Language

**Web (JS/TS):**
All four standard segments apply directly. Each segment is a folder containing
descriptively named implementation files.

**Go:**
Segments translate to sub-packages or file grouping conventions:

| FSD Segment | Go Equivalent                                                   |
|-------------|-----------------------------------------------------------------|
| `ui`        | Not applicable for backend Go services. For CLI/TUI apps: `ui`  |
|             | sub-package with view/render logic.                              |
| `api`       | `api` sub-package with descriptively named files (e.g.,         |
|             | `userHandler.go`, `userRoutes.go`).                              |
| `model`     | `model` sub-package with descriptively named files (e.g.,       |
|             | `user.go`, `userSchema.go`), NOT a generic `model.go`.          |
| `config`    | `config` sub-package or descriptively named config files.        |

For Go, when a slice is small, segments may be individual files rather than
sub-packages (Go's package system provides natural encapsulation). Even then,
each file name must describe its content specifically.

### Custom Segments

You may create additional segments beyond the standard ones. Name them by
**purpose**, not by technical nature:

- GOOD: `validation`, `analytics`, `permissions`
- BAD: `types`, `hooks`, `components`, `utils`, `helpers`, `lib`

## Absorbing "Shared" Logic

Since the `shared` layer is forbidden, here is how to handle common scenarios:

### UI Kit / Design System Components

Create a dedicated entity slice:

```
entities/
└── ui-kit/
    └── ui/
        ├── Button.tsx
        ├── Input.tsx
        ├── Modal.tsx
        └── classnames.ts
```

Since `entities` is the bottom layer, all other layers can import from it.

### HTTP Client / API Utilities

```
entities/
└── api-client/
    ├── api/
    │   ├── httpClient.ts
    │   └── interceptors.ts
    └── model/
        └── apiError.ts
```

### Utility Code

Place utility logic directly in the segment of the slice that uses it. If truly
cross-cutting, create a dedicated entity slice with descriptively named files:

```
entities/
├── dates/
│   ├── formatting.ts
│   └── parsing.ts
└── i18n/
    ├── translator.ts
    └── config/
        └── locales.ts
```

### Environment Configuration

```
entities/
└── environment/
    ├── config/
    │   ├── env.ts
    │   └── featureFlags.ts
    └── model/
        └── envSchema.ts
```

## Forbidden Patterns

### NO Barrel / Re-export Files

**STRICTLY FORBIDDEN**: `index.ts`, `index.js`, `index.go`, `export.go`, or any
file whose sole purpose is to import and immediately re-export symbols from
other files (a "barrel file" or "public API facade").

Why: barrel files add indirection without adding value. They obscure the real
location of code, create circular dependency risks, slow down bundlers and IDE
navigation, and make it harder to trace where code actually lives.

```
# FORBIDDEN — do not create these:
features/auth/index.ts           # barrel re-exporting from sub-files
entities/user/index.ts           # barrel re-exporting from sub-files
entities/user/model/index.ts     # barrel re-exporting from sub-files

# CORRECT — import directly from the actual file:
import { LoginForm } from 'src/features/auth/ui/LoginForm'
import { User } from 'src/entities/user/model/user'
import { userApi } from 'src/entities/user/api/userApi'
```

**Exception**: framework-mandated entry files (e.g., Next.js `page.tsx`,
`layout.tsx`) are allowed because the framework requires them — they are not
barrel files but actual entry points.

**Go note**: Go packages inherently act as a namespace. All exported symbols in
a package are accessible via the package import path. This is not a barrel
pattern — it is Go's language design. Do not create artificial `doc.go` or
`exports.go` files that exist only to re-export.

### NO Abstract / Generic File Names

**STRICTLY FORBIDDEN**: file names that describe what kind of code the file
contains rather than what the code does. Every file name must clearly communicate
its specific content.

```
# FORBIDDEN file names:
model.go          →  use: user.go, payment.go, orderStatus.go
model.ts          →  use: user.ts, authStore.ts, commentSchema.ts
types.ts          →  use: userTypes.ts, apiErrorTypes.ts
handler.go        →  use: userHandler.go, paymentHandler.go
service.go        →  use: authService.go, commentService.go
repository.go     →  use: userRepository.go, postRepository.go
index.ts          →  FORBIDDEN entirely (see barrel rule above)
helpers.ts        →  use: dateFormatting.ts, priceCalculation.ts
utils.ts          →  use: stringNormalization.ts, urlBuilder.ts
constants.ts      →  use: httpStatusCodes.ts, rolePermissions.ts
```

The test: if you see only the file name (without the directory path), can you
understand what the file is about? `model.go` tells you nothing. `user.go`
tells you everything.

**Go convention note**: In Go, where the package name already provides context
(e.g., `internal/entities/user/`), the file name should still be specific but
can rely on the package context: `user.go` is acceptable inside `user/` package
because the full path `user/user.go` is unambiguous. But `model.go` inside
`user/` is not — it says nothing about which model aspect it covers.

### NO `lib` Segment

**STRICTLY FORBIDDEN**: a `lib` directory at any level. The name `lib` is
abstract and says nothing about the code's purpose. It becomes a dumping ground
for unrelated utilities.

Instead, place the code:
- **Inside the relevant segment** of the slice that uses it.
- **In a custom segment with a descriptive name** (e.g., `validation/`,
  `formatting/`, `permissions/`).
- **In a dedicated entity slice** if the logic is cross-cutting (e.g.,
  `entities/dates/`, `entities/formatting/`).

## Decision Checklist

When placing new code, follow this sequence:

1. **Is it an entry point, router config, or global provider?**
   → Place it outside the FSD root (framework/language-specific area).

2. **Is it a full page or screen?**
   → `pages/<page-name>/`

3. **Is it a large, self-contained block reused across multiple pages?**
   → `widgets/<widget-name>/`

4. **Is it a product feature that delivers distinct business value and is reused?**
   → `features/<feature-name>/`

5. **Is it a core business concept, domain model, or foundational utility?**
   → `entities/<entity-name>/`

6. **Does it feel like "shared" code?**
   → **Stop.** Find the right entity slice for it. Ask: "What business concept
   does this serve?" If it's truly universal (e.g., date formatting), create a
   dedicated entity slice for it.

7. **Naming the file?**
   → If someone sees this file name without path context, will they know what
   it does? If not, rename it.

## Strict Rules Summary

1. **NO `shared` folder** — ever, under any path, at any level.
2. **NO `app` folder inside the FSD root** — entry point logic lives outside
   the layer hierarchy.
3. **NO `processes` folder** — deprecated; use `features` instead.
4. **NO `lib` folder** — ever, at any level. Use descriptive segment names.
5. **NO barrel / re-export files** — no `index.ts`, `index.js`, or any file
   that only re-exports. Import directly from the source file.
6. **NO abstract file names** — no `model.go`, `handler.go`, `service.go`,
   `types.ts`, `index.ts`, `helpers.ts`, `utils.ts`. Every file name must
   describe its specific content.
7. **Unidirectional imports only** — higher layers import from lower layers,
   never the reverse, never across same-layer slices (except `@x`).
8. **Segment names describe purpose, not technical nature** — no `utils`,
   `helpers`, `hooks`, `components`, `types`, `lib` as segment names.
9. **FSD root is `src/` (web) or `internal/`/`pkg/` (Go)** — never the project root.
10. **Slice names come from business domain** — not from technical concerns.
11. **Group folders contain no code** — only slice subdirectories.
12. **Cross-entity references use `@x` pattern** — making dependencies explicit.

## Code Review Checklist

When reviewing code for FSD compliance, verify:

- [ ] No `shared` directory exists anywhere in the FSD root.
- [ ] No `app` directory inside the FSD root.
- [ ] No `lib` directory at any level.
- [ ] No barrel/re-export files (`index.ts`, `index.js`, etc.).
- [ ] No abstract file names (`model.go`, `handler.go`, `types.ts`, etc.).
- [ ] All imports follow the unidirectional rule (top → bottom only).
- [ ] No same-layer cross-slice imports (except `@x` for entities).
- [ ] Imports point to specific files, not barrel entry points.
- [ ] Segment names describe purpose, not essence.
- [ ] Slice names reflect business domain concepts.
- [ ] The FSD root matches the language convention (`src/` or `internal/`/`pkg/`).
- [ ] Utility/shared-like code is placed in appropriate entity slices.
