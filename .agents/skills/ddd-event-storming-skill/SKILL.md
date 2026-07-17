---
name: ddd-event-storming-skill
description: Guide for designing backend applications as policy-driven modular monoliths using Domain-Driven Design (DDD). Use when the user asks an AI agent to generate or refactor code so that transport requests become initial domain events, policies orchestrate features, features load aggregates, domain/entity functions transform aggregate state, new domain events are produced, persisted via outbox, and read-only models are updated in the database. Covers HTTP/gRPC boundaries, policies, features, aggregates, domain events, outbox, read models, orchestration rules, FSD-like project structure, and anti-patterns.
metadata:
  author: perplexity-computer
  version: '1.2'
  language_focus: 'Go, but applicable to .NET and other backend stacks'
---

# DDD Policy-Driven Monolith Skill

## When to Use This Skill

Load when the user asks to:
- design or generate a backend architecture based on DDD
- build a modular monolith where policies orchestrate domain workflows
- structure a Go or .NET backend around policies, features, entities, aggregates, and domain events
- map gRPC or HTTP endpoints into initial domain events
- separate transport, policy, feature, entity, and persistence concerns
- implement event-driven internal orchestration without Kafka, NATS, RabbitMQ, or another external bus
- persist newly produced domain events using the outbox pattern
- build and persist read-only models derived from aggregate state and domain events
- support both simple policies and more complex orchestration policies
- avoid anemic entities and direct controller-to-repository mutation flows

***

## Core Intent

This skill tells the AI agent how to design code using **DDD as the implementation model** and **policies/features as the orchestration model**.

The relationship is:
- **DDD** provides the implementation structure: aggregates, entities, value objects, repositories, domain services, and domain events.
- **Policy-driven modular monolith architecture** executes the model in one process, where policies react to domain events and invoke features.
- **Features** apply business capabilities by loading aggregates, invoking domain/entity behavior, producing new domain events, saving them through outbox, and updating read-only models.

This skill is optimized for applications where:
- the system is deployed as one service
- a separate broker is unnecessary for internal flow
- the business flow benefits from explicit orchestration
- aggregates and entity behavior hold meaningful domain rules
- read models are updated as a consequence of domain changes

***

## Default Mental Model

Always think in this order:

```text
Actor action
  -> transport request (HTTP/gRPC)
  -> initial domain event
  -> policy
  -> feature
  -> load aggregate from database
  -> invoke entity / aggregate functions
  -> transform aggregate into new state
  -> produce new domain event(s)
  -> persist events through outbox
  -> build read-only models from new state + new events
  -> persist read-only models
  -> return control to policy
  -> policy may invoke additional feature(s) based on new domain events
```

### Important Rules

A transport request is translated into an **initial domain event** that becomes the input for a policy.

- gRPC or HTTP request = transport input
- initial domain event = a domain-relevant fact or request accepted by the system
- policy = orchestration layer
- feature = application capability that performs the core state transition
- aggregate/entity methods = the only place where domain state transitions and invariants should live
- emitted domain events = facts about completed business state changes
- read-only models = query-optimized projections derived from the new aggregate state and produced domain events

Policies may be:
- **simple**, where the policy only invokes one feature
- **complex**, where the policy orchestrates multiple features or longer workflows

Do not collapse all orchestration into transport handlers.
Do not implement domain logic directly inside policies.
Do not let features mutate persistence models without going through aggregate/entity behavior first.

***

## Architectural Principles

### 1. Domain Language Drives the Model

Use the business language as the source for:
- domain event names
- aggregate boundaries
- policy names
- feature names
- invariants
- read-model naming

The AI agent should preserve business language in code. Event names should sound like business facts, not technical operations.

### 2. Transport Produces Initial Domain Events

Every gRPC or HTTP operation should be translated into an initial domain event.

Transport layer responsibilities:
- decode request
- validate transport-level shape
- map request DTO to the initial domain event
- invoke the appropriate policy
- map result to response

Transport layer must **not**:
- mutate repositories directly
- contain business rules
- orchestrate long chains of domain behavior itself
- bypass policies and call unrelated features ad hoc

### 3. Policies Orchestrate Features

Policies are the orchestration unit of the application.

Policy responsibilities:
- receive an initial or newly produced domain event
- decide which feature or sequence of features should run
- coordinate multi-step workflows
- pass only the required context to features
- remain deterministic and explicit

Policies must **not**:
- implement low-level domain rules
- mutate aggregate state directly
- perform direct SQL or repository writes for business state changes
- become a hidden global workflow engine with unclear branching

### 4. Features Execute Business Capabilities

Features implement a concrete business capability.

Feature responsibilities:
- load the relevant aggregate(s)
- invoke aggregate/entity behavior
- persist aggregate state changes
- collect newly produced domain events
- persist those events through outbox
- build read-only models from the new aggregate state and events
- persist read-only models
- return produced events back to the policy

A feature must stay focused on one coherent business capability.

### 5. Aggregates and Entities Protect Invariants

Use aggregates and domain/entity functions to enforce consistency boundaries.

Aggregate and entity responsibilities:
- own state transitions
- enforce invariants
- expose intentful methods, not public mutation
- produce domain events when state changes in a meaningful business way

Do not spread invariants across transport, policies, repositories, and utility services.

### 6. Domain Events Represent Business Facts

Domain events must be produced as a result of valid business transitions.

Examples:
- `ProjectArchived`
- `DocumentArchived`
- `PaymentCaptured`
- `UserEmailConfirmed`

Bad examples:
- `GrpcCalled`
- `RepositoryUpdated`
- `HandlerExecuted`
- `FeatureCompleted`

### 7. Outbox Protects Durability

If a produced domain event must be durable, retriable, or used for post-commit processing, persist it through outbox in the same transaction as the aggregate state change.

Do not perform unreliable external side effects in the middle of the core state transition.

### 8. Read Models Are Derived Projections

Read-only models are derived from:
- the final aggregate state
- the set of newly produced domain events

They are not aggregates and must not become the source of business decision-making.

***

## Policies and Features

### Policies

A **policy** reacts to domain events and decides which feature or sequence of features should be executed.

A policy should:
- receive a domain event
- decide which feature(s) must run
- coordinate multi-step workflows when needed
- pass only the required context into the next feature
- remain explicit, deterministic, and easy to test

A simple policy looks like:
- receive event
- call one feature
- finish

A complex policy looks like:
- receive event
- call one feature
- inspect the newly produced domain events
- decide whether additional features should run
- coordinate the sequence of further actions

Example:
- `ProjectArchiveRequested` enters the policy
- policy calls `ArchiveProjectFeature`
- feature emits `ProjectArchived`
- policy then decides to call `ArchiveProjectDocumentsFeature`
- document archiving may emit `DocumentArchived` events

Policies are orchestration components, not places for low-level business rules, SQL, or direct repository mutation.

### Features

A **feature** implements one concrete business capability.

A feature should:
1. Accept the triggering domain event and required contextual models.
2. Load the relevant aggregate from the database.
3. Invoke one or more entity/aggregate functions from the entity layer.
4. Transform the aggregate into a new valid state.
5. Collect the newly produced domain event or events.
6. Persist those new events through the outbox pattern.
7. Build read-only models from the new aggregate state and new events.
8. Persist the read-only models.
9. Return the produced events back to the policy.

A feature is the main execution unit of business application logic, but it must not:
- contain transport-level DTOs
- bypass aggregates/entities and mutate raw persistence state directly
- publish external effects directly in the middle of the transaction
- become a generic orchestration dump for unrelated workflows

***

## Project Structure

Use an FSD-like, domain-oriented internal structure.

```text
internal/
  transport/
    http/
    grpc/

  policies/
    project/
      archive_project_policy.go
      model/
        archive_project_policy_input.go
        archive_project_policy_result.go
    document/
      archive_document_policy.go
      model/
        archive_document_policy_input.go

  features/
    project/
      archive_project_feature.go
      build_project_read_models_feature.go
      model/
        archive_project_feature_input.go
        archive_project_feature_result.go
      entities/
        project_list_view.go
        project_details_view.go
      repository/
        project_repository.go
        project_read_model_repository.go
    document/
      archive_document_feature.go
      model/
        archive_document_feature_input.go
      entities/
        document_list_view.go
      repository/
        document_repository.go
        document_read_model_repository.go

  entities/
    project/
      archive.go
      restore.go
      model/
        project.go
        project_status.go
      aggregates/
        project_aggregate.go
      events/
        project_archive_requested.go
        project_archived.go
        project_restored.go
    document/
      archive.go
      model/
        document.go
      aggregates/
        document_aggregate.go
      events/
        document_archived.go

  infrastructure/
    db/
    tx/
    outbox/
    bus/
    logging/
```

***

## Layer Responsibilities

### Transport Layer

Location:
- `internal/transport/http`
- `internal/transport/grpc`

Responsibilities:
- decode transport input
- validate transport shape
- map transport input into the initial domain event
- invoke the appropriate policy
- map result into transport response

Transport must not:
- execute domain logic
- load aggregates directly
- call repositories directly for business state mutation
- orchestrate multi-step workflows

### Policy Layer

Location:
- `internal/policies/<domain>`
- `internal/policies/<domain>/model`

Responsibilities:
- receive domain events
- orchestrate one or more features
- coordinate multi-step flows
- pass intermediate policy-level models when necessary

Policy models should contain only the context needed for orchestration.

Policies must not:
- contain low-level domain rules
- implement aggregate transitions directly
- write read models directly
- bypass features

### Feature Layer

Location:
- `internal/features/<domain>`
- `internal/features/<domain>/model`
- `internal/features/<domain>/entities`
- `internal/features/<domain>/repository`

Responsibilities:
- implement a concrete business capability
- load aggregates from the database
- call domain/entity logic
- collect produced domain events
- persist domain events using outbox
- derive and persist read-only models

Feature models contain feature-specific inputs, outputs, and intermediate structures.

`internal/features/<domain>/entities` contains read-only database models and projection entities.

`internal/features/<domain>/repository` contains repository implementations used by features to load aggregates and persist projections.

### Entity Layer

Location:
- `internal/entities/<domain>`
- `internal/entities/<domain>/model`
- `internal/entities/<domain>/aggregates`
- `internal/entities/<domain>/events`

Responsibilities:
- define domain models
- define aggregate boundaries
- implement domain functions
- enforce invariants
- produce domain events as a result of valid business transitions

`internal/entities/<domain>/model` contains domain-level models.
`internal/entities/<domain>/aggregates` contains aggregates for the domain.
`internal/entities/<domain>/events` contains domain events for the domain.

This layer is the source of truth for business behavior.
It must not depend on transport concerns or read-model persistence concerns.

### Infrastructure Layer

Location:
- `internal/infrastructure/...`

Responsibilities:
- database access primitives
- transaction management
- outbox storage and relaying
- logging, tracing, observability
- technical adapters and integration wiring

Infrastructure must not become the place where business decisions are made.

***

## Domain Event Rules

Domain events are facts in past tense or accepted domain requests when used as policy input.

Examples:
- `ProjectArchiveRequested`
- `ProjectArchived`
- `DocumentArchived`
- `EmailConfirmed`

Domain event rules:
- must reflect business meaning
- should be immutable after creation
- should contain enough context for downstream policies and features
- should not expose transport DTOs or infrastructure types
- should not be named after technical callbacks or framework internals

***

## Transaction and Persistence Strategy

The AI agent must reason explicitly about transaction boundaries.

### Preferred Feature Flow

1. Receive input from a policy.
2. Begin transaction.
3. Load the relevant aggregate(s).
4. Execute entity/aggregate functions.
5. Persist aggregate state changes.
6. Collect newly produced domain event(s).
7. Persist those new events into the outbox in the same transaction.
8. Build read-only models from:
   - the updated aggregate state
   - the newly produced domain events
9. Persist read-only models in the same transaction when required by consistency needs.
10. Commit transaction.
11. Return produced domain events to the policy.
12. Let the policy decide whether further features should run.

### In-Transaction Work

Allow only when the work:
- belongs to the same consistency boundary
- updates data that must remain atomically consistent
- does not call unreliable external systems

### Post-Commit Work

Use post-commit processing when the work:
- talks to external systems
- should be retried independently
- may survive process restarts
- does not belong to the atomic core state transition

### Rule of Thumb

If an effect must not happen when the transaction rolls back, it cannot happen before commit unless it is transactionally bound to the same durable state.

***

## Outbox Rule

Every newly produced domain event that must survive failures, be retried, or participate in reliable post-commit processing should be saved via outbox.

Do not:
- publish external integrations before commit
- update read models from stale aggregate state
- emit events that are not backed by durable state changes

***

## Read Model Rule

Read-only models are not the aggregate.

They are derived representations used for queries, listings, dashboards, and optimized reads.

Build them only after aggregate state has been successfully transformed, using:
- the final aggregate state
- the set of newly produced domain events

Do not put domain decision-making logic into read-model builders.

***

## Orchestration Rule

If one feature produces a domain event that requires another business capability to run, the policy may invoke another feature.

Example:

```text
ProjectArchiveRequested
  -> ArchiveProjectPolicy
  -> ArchiveProjectFeature
  -> ProjectArchived
  -> ArchiveProjectDocumentsFeature
  -> DocumentArchived
```

The chain must remain understandable.

The AI agent should:
- keep orchestration explicit
- avoid hidden recursion
- avoid infinite loops
- log correlation IDs across the chain when appropriate
- prefer process managers/sagas when orchestration becomes long-running or stateful

***

## Process Managers and Policies

When the domain requires rules like:
- “When a project archive request is accepted, archive the project.”
- “When a project is archived, archive all documents in that project.”
- “When payment is captured, mark the order as paid.”
- “When shipment fails, trigger compensation.”

implement them as one of:
- policies
- feature-to-feature orchestration through policies
- process managers/sagas for longer-running workflows

Use a process manager when:
- multiple steps span time
- retries and compensation are needed
- state must be tracked between domain events
- orchestration is too complex for a simple policy

***

## Naming Conventions

Prefer names that preserve ubiquitous language.

### Policies

- `ArchiveProjectPolicy`
- `ArchiveProjectOnRequestPolicy`
- `HandleProjectArchivedPolicy`

### Features

- `ArchiveProjectFeature`
- `ArchiveProjectDocumentsFeature`
- `BuildProjectReadModelsFeature`

### Entity Functions

- `Archive`
- `Restore`
- `Rename`
- `MarkAsCompleted`

### Events

- `ProjectArchiveRequested`
- `ProjectArchived`
- `DocumentArchived`

### Avoid

- `DoProjectStuff`
- `GenericPolicy`
- `ProcessLogic`
- `UpdateRepositoryAndEmitEvent`

***

## Testing Guidance

The AI agent should generate tests around behavior, not plumbing.

### Unit Tests

Test aggregates and entity functions by:
- given initial state
- when method is called
- then state changes correctly
- and expected domain events are produced

### Policy Tests

Test policies by:
- providing input events
- verifying which features are invoked
- validating orchestration branching and sequencing
- ensuring deterministic behavior

### Feature Tests

Test features by:
- mocking repositories, transaction manager, and outbox writer
- checking correct aggregate loading and persistence flow
- validating read-model updates
- validating error propagation and transaction handling

### Integration Tests

Test:
- repository persistence
- transaction boundaries
- outbox writing
- read-model persistence
- policy-to-feature wiring
- HTTP/gRPC -> initial domain event mapping

***

## Anti-Patterns

Do not let the AI agent generate these patterns.

### Bad Boundary Design

- transport handler directly writes to repository
- transport handler orchestrates multi-step business flow
- policy contains SQL or repository mutation logic
- feature accepts transport DTOs deep into domain execution

### Bad Policy Design

- policy implements aggregate state transitions directly
- policy becomes a god-orchestrator with hidden branching
- policy silently reacts to produced events without explicit flow

### Bad Feature Design

- feature mutates raw database records without aggregate/entity behavior
- feature writes outbox events that do not correspond to real domain transitions
- feature builds read models before aggregate state is finalized
- feature mixes unrelated business capabilities

### Bad Domain Modeling

- aggregates have no behavior
- entity functions do not enforce invariants
- domain events are named after technical steps instead of business facts
- repositories emit domain events instead of aggregates/entities

### Bad Persistence Design

- outbox is written outside the aggregate state transaction
- read models are updated from stale or partial state
- external side effects happen before durable commit

***

## Decision Matrix

| Situation | Recommended Approach |
|---|---|
| One deployable, one process, one DB | Modular monolith |
| Request enters system | Map to initial domain event |
| Domain workflow starts | Invoke policy |
| One business capability must run | Use a feature |
| Business state changes | Emit domain event |
| Durable async or retriable effect | Outbox + post-commit processing |
| Query-optimized representation needed | Build read-only model |
| Long multi-step workflow | Process manager / saga |
| Pure CRUD with no meaningful domain rules | Do not force full DDD ceremony |

***

## Output Expectations for the AI Agent

When using this skill, the agent should produce code that:
- has clear layer boundaries
- maps transport requests to initial domain events
- uses policies for orchestration
- keeps business logic in aggregates/entities
- emits meaningful domain events in past tense
- uses outbox for durable event persistence
- updates read-only models from aggregate state and produced events
- avoids unnecessary brokers for same-process communication
- preserves ubiquitous business language in type names, package names, and method names

When the user asks for code generation, prefer including:
- package structure
- interfaces
- aggregate skeletons
- policies
- features
- domain events
- read-model builders
- transaction orchestration notes
- anti-pattern warnings when trade-offs are relevant

***

## Recommended Prompt Snippet

Use this as an embedded instruction when generating code:

> Design the application as a policy-driven modular monolith using Domain-Driven Design. Treat incoming gRPC/HTTP requests as transport inputs that are translated into initial domain events. Policies must orchestrate features. Features must load aggregates, invoke domain/entity behavior, transform aggregate state, collect newly produced domain events, persist them via the outbox pattern, and update read-only models derived from the new state and events. Keep transport, policy, feature, entity, and infrastructure concerns separate. Domain events must be meaningful business facts, and aggregate/entity methods must remain the source of truth for state transitions and invariants.

***

## Quick Checklist

Before finalizing generated code, verify:

- Is the transport request mapped to an initial domain event?
- Does orchestration live in policies rather than transport handlers?
- Does each feature implement one coherent business capability?
- Does business logic live in aggregates/entities rather than repository glue?
- Are domain events facts, not technical callbacks?
- Are aggregate invariants enforced in one place?
- Are newly produced events persisted through outbox?
- Are read-only models built from final aggregate state and new events?
- Is the terminology aligned with the business domain?
- Is the code still simple enough for a modular monolith?
