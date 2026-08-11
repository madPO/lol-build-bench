---
name: specify-conceptual-database-model
description: Create or complete a solution-independent conceptual database model from an introductory description and a corresponding business entity specification, interviewing the user when data objects, identifiers, attributes, relationships, constraints, derivations, diagrams, or traceability are missing. Use for system data specifications saved under specs/system in a project.
---

# Specify a Conceptual Database Model

Turn the user's introductory description and the corresponding business entity specification into one complete conceptual database model. Treat fact collection and model derivation separately from the final filesystem write.

## Read the References

Read both references completely before assessing completeness:

1. Read [references/specification-guide.md](references/specification-guide.md) for required content, exclusions, the no-lifecycle rule, template, and quality checks.
2. Read [references/socratic-interview.md](references/socratic-interview.md) before asking any interview question.

## Follow the Workflow

1. **Establish the project and target.**
   - Locate the project root from the repository context and applicable `AGENTS.md` files.
   - Extract the system domain, model name, and introductory description.
   - Normalize domain and file names to lowercase kebab-case without changing business meaning.
   - Resolve the target as `<project-root>/specs/system/<system-domain>/database-model/<name>.md`.
   - Interpret leading `/specs` notation as project-root-relative, never operating-system-root-relative.

2. **Identify the source business entity.**
   - Require one primary specification matching `specs/business/<business-domain>/entity/<entity-name>.md`.
   - Use a user-supplied path when present; otherwise search business specifications for an unambiguous match.
   - Ask an open-ended question when the source entity, system domain, or model scope is ambiguous.
   - Read the primary entity specification completely before deriving the model.
   - Read related entity specifications only when their relationships are in scope.

3. **Collect and derive evidence.**
   - Maintain an internal ledger of explicit user facts, source-specification facts, confirmed assumptions, contradictions, and missing required information.
   - Map every proposed data object, attribute, relationship, and constraint to a business source.
   - Distinguish persisted facts from derived values.
   - Never invent an attribute or weaken an invariant to make the model convenient.

4. **Assess completeness and interview.**
   - Map evidence to every required section and quality check in the guide.
   - Do not add lifecycle representation or derived lifecycle status.
   - If required information is missing or contradictory, apply the Socratic protocol exactly.
   - Ask one main open-ended question per turn, targeting the highest-impact gap.
   - Continue until conceptual objects, identifiers, attributes, relationships, integrity constraints, derived information, diagram, traceability, and example are supported.
   - Before writing, summarize the completed model and ask what should be corrected or added.

5. **Render and validate.**
   - Follow the guide's Markdown template.
   - Include a Mermaid ER diagram or fenced text diagram plus a textual explanation.
   - Keep SQL, physical types, indexes, partitions, migrations, vendors, and ORM details out.
   - Verify that diagram, dictionaries, constraints, traceability, and example describe the same model.

6. **Save the result.**
   - Create target directories when necessary.
   - Read an existing target before updating it; confirm intent before replacing an incompatible specification.
   - Save exactly one complete Markdown file.
   - Report the project-relative path and the source business entity path.

## Enforce the Output Contract

- Project path: `/specs/system/<system-domain>/database-model/<name>.md`
- Example: `/specs/system/library/database-model/library-loan.md`
- Format: Markdown with a conceptual relationship diagram
- Required source: one corresponding business entity specification
- Forbidden content: lifecycle representation and physical database design

If the user ends the interview before completion, explain which required facts remain missing. Save a clearly labeled draft only when explicitly requested; never call it complete.
