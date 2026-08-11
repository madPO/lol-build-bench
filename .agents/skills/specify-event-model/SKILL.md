---
name: specify-event-model
description: Create or complete an EventStorming system specification from an introductory description, interviewing the user when scope, commands, aggregates, domain events, policies, read models, actors, external systems, causal flows, hotspots, or traceability are missing. Use for event models and Markdown diagrams saved under specs/system in a project.
---

# Specify an Event Model

Turn the user's introductory description and related business specifications into one complete EventStorming model. Preserve business language, model causal facts explicitly, and keep transport infrastructure separate from domain meaning.

## Read the References

Read both references completely before assessing completeness:

1. Read [references/specification-guide.md](references/specification-guide.md) for EventStorming notation, required catalogs, exclusions, template, and quality checks.
2. Read [references/socratic-interview.md](references/socratic-interview.md) before asking any interview question.

## Follow the Workflow

1. **Establish the project and target.**
   - Locate the project root from the repository context and applicable `AGENTS.md` files.
   - Extract the system domain, capability name, and introductory description.
   - Normalize domain and file names to lowercase kebab-case without changing business meaning.
   - Resolve the target as `<project-root>/specs/system/<system-domain>/event-model/<name>.md`.
   - Interpret leading `/specs` notation as project-root-relative, never operating-system-root-relative.

2. **Collect source evidence.**
   - Inspect corresponding business entity, actor, and user-case specifications first.
   - Inspect related architecture, database-model, and interface specifications when they exist.
   - Maintain an internal ledger of explicit user facts, repository facts, confirmed assumptions, contradictions, and missing required information.
   - Preserve ubiquitous language and surface conflicts rather than renaming concepts silently.

3. **Build the causal model.**
   - Derive actor intent, imperative commands, deciding aggregates, past-tense domain events, event-triggered policies, read models, and external systems.
   - Model `Actor -> Command -> Aggregate -> Domain Event` and `Domain Event -> Policy -> Command` causality.
   - Keep separate aggregate transitions connected through events and policies rather than hidden atomic mutation.
   - Record unclear rules, ownership, timing, or terminology as hotspots.

4. **Assess completeness and interview.**
   - Map evidence to every required section and quality check in the guide.
   - If required information is missing or contradictory, apply the Socratic protocol exactly.
   - Ask one main open-ended question per turn, targeting the highest-impact causal gap.
   - Continue until scope, commands, aggregates, events, policies, read models, actors, external systems, walkthroughs, hotspots, and traceability are supported.
   - Before writing, summarize the causal model and ask what should be corrected or added.

5. **Render and validate.**
   - Follow the guide's Markdown template.
   - Include a left-to-right Mermaid or fenced text EventStorming diagram with explicit element-type labels and a legend.
   - Include catalogs and causal walkthroughs matching the diagram.
   - Keep brokers, topics, subscriptions, envelopes, serialization, handlers, and database mutation events out unless an unavoidable constraint requires a separate note.
   - Verify event names are business facts in past tense, commands express intent, and policies name both trigger and result.

6. **Save the result.**
   - Create target directories when necessary.
   - Read an existing target before updating it; confirm intent before replacing an incompatible specification.
   - Save exactly one complete Markdown file.
   - Report the project-relative path and source business specifications.

## Enforce the Output Contract

- Project path: `/specs/system/<system-domain>/event-model/<name>.md`
- Example: `/specs/system/library/event-model/borrow-book.md`
- Format: Markdown with EventStorming diagram, catalogs, and causal walkthrough
- Forbidden substitutions: broker topology or serialized event schemas in place of domain modeling

If the user ends the interview before completion, explain which required facts remain missing. Save a clearly labeled draft only when explicitly requested; never call it complete.
