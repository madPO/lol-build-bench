---
name: specify-distributed-architecture
description: Create or complete a distributed system architecture specification from an introductory description, interviewing the user when components, deployment units, connections, data ownership, runtime flows, reliability, security, or operations are missing. Use for Markdown architecture specifications and diagrams saved under specs/system in a project.
---

# Specify Distributed Architecture

Turn the user's introductory description into one complete distributed architecture specification covering component, deployment, and connection views. Treat collected facts separately from architectural decisions and the final filesystem write.

## Read the References

Read both references completely before assessing completeness:

1. Read [references/specification-guide.md](references/specification-guide.md) for required views, diagram rules, exclusions, template, and quality checks.
2. Read [references/socratic-interview.md](references/socratic-interview.md) before asking any interview question.

## Follow the Workflow

1. **Establish the project and target.**
   - Locate the project root from the repository context and applicable `AGENTS.md` files.
   - Extract the system domain, architecture name, and introductory description.
   - Normalize domain and file names to lowercase kebab-case without changing system meaning.
   - Resolve the target as `<project-root>/specs/system/<system-domain>/architecture/<name>.md`.
   - Interpret leading `/specs` notation as project-root-relative, never operating-system-root-relative.

2. **Collect evidence.**
   - Inspect related business and system specifications for actors, capabilities, data ownership, interfaces, and events.
   - Maintain an internal ledger of explicit user facts, repository facts, confirmed assumptions, contradictions, and missing required information.
   - Separate logical components from deployable units and from runtime nodes.
   - Do not infer a vendor, cloud, protocol, or service boundary merely because it is conventional.

3. **Assess completeness and interview.**
   - Map evidence to every required section and quality check in the guide.
   - If required information is missing or contradictory, apply the Socratic protocol exactly.
   - Ask one main open-ended question per turn, targeting the highest-impact gap.
   - Continue until scope, drivers, components, deployments, connections, ownership, flows, failures, trust boundaries, and operations are supported.
   - When a design decision is delegated, propose one explicit option with its consequence and ask what should be corrected.
   - Before writing, summarize the architecture and ask what should be corrected or added.

4. **Render and validate.**
   - Follow the guide's Markdown template.
   - Include at least one Mermaid or fenced ASCII diagram showing components, deployment grouping, and connections.
   - Include a textual description and connection matrix so the model remains accessible without rendering.
   - Verify that each diagram element is described, each connection has direction and purpose, and each stateful resource has one ownership rule.
   - Keep source packages, full interface schemas, database columns, and infrastructure-as-code out.

5. **Save the result.**
   - Create target directories when necessary.
   - Read an existing target before updating it; confirm intent before replacing an incompatible specification.
   - Save exactly one complete Markdown file.
   - Report the project-relative path and a concise topology summary.

## Enforce the Output Contract

- Project path: `/specs/system/<system-domain>/architecture/<name>.md`
- Example: `/specs/system/library/architecture/library-platform.md`
- Format: Markdown with a Markdown-native diagram and textual description
- Required views: components, deployment, and connections

If the user ends the interview before completion, explain which required facts remain missing. Save a clearly labeled draft only when explicitly requested; never call it complete.
