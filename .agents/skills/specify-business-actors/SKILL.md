---
name: specify-business-actors
description: Create or complete a solution-independent business actor specification from an introductory description, interviewing the requester when participant definitions, goals, identification, permissions, responsibilities, relationships, lifecycle, access, or accountability are missing. Use for human, external-system, device, or automated actors saved under specs/business in a project.
---

# Specify Business Actors

Turn the requester's introductory description into one complete actor specification. Use `actor` as the sole business term for every human or automated participant. Treat fact collection as a pure evidence-building process and perform the filesystem write only after the specification is complete.

## Read the References

Read both references completely before assessing completeness:

1. Read [references/specification-guide.md](references/specification-guide.md) for the required content, actor terminology, template, exclusions, and quality checks.
2. Read [references/socratic-interview.md](references/socratic-interview.md) for the mandatory interview behavior when information is missing or contradictory.

## Follow the Workflow

1. **Establish the project and target.**
   - Locate the project root from the active repository context and its `AGENTS.md` files.
   - Extract the business domain, actor-specification name, and introductory description from the request.
   - Normalize the business domain and file name to lowercase kebab-case without changing their business meaning.
   - Ask an open-ended question when the domain, scope, or name is semantically ambiguous.
   - Resolve the target as `<project-root>/specs/business/<business-domain>/actors/<name>.md`.
   - Interpret a leading `/specs` in examples as project-root-relative; never write to the operating-system root.

2. **Collect evidence.**
   - Inspect related business specifications and repository documentation for established participants, capabilities, entities, and terminology.
   - Maintain an internal ledger of explicit requester facts, relevant repository facts, confirmed assumptions, contradictions, and missing required information.
   - Prefer the requester's current statements when older project material conflicts, but surface the conflict for clarification before writing.
   - Never convert an inference into a business fact without confirmation.

3. **Assess completeness.**
   - Map the evidence to every required section and quality check in the specification guide.
   - Treat optional sections as optional unless the introductory description makes them material.
   - If every required section is supported and no material contradiction remains, proceed to writing.
   - Otherwise, begin or continue the interview. Do not produce a supposedly complete specification with placeholders or unresolved required questions.

4. **Conduct the interview.**
   - Apply the Socratic interview protocol exactly.
   - Ask one main open-ended question per turn, chosen from the highest-impact current gap.
   - Reflect the preceding answer briefly before asking a follow-up.
   - Continue across turns until actor definitions, goals, identification, eligibility, capabilities, permissions, responsibilities, relationships, lifecycle, access rules, and accountability are sufficiently defined.
   - Test ownership boundaries, overlapping actors, prohibited actions, inactive states, and external actors when they are relevant to the stated scope.
   - If the requester delegates a decision, propose one explicit assumption and ask what should be corrected before treating it as confirmed.
   - Before writing, summarize the completed understanding and ask: “What, if anything, should be corrected or added before I save the specification?”

5. **Render and validate the specification.**
   - Follow the guide's document template.
   - Attach responsibilities and permissions directly to actors.
   - State access rules with the action, affected resource, scope, conditions, and explicit prohibitions.
   - Keep credentials, identity-provider configuration, middleware, database grants, and UI navigation out of the document.
   - Include only supported claims. Record material confirmed assumptions explicitly.
   - Re-run every completeness, terminology, and quality check before writing.

6. **Save the result.**
   - Create the target directories when necessary.
   - If the target exists, read it first and update it consistently; do not replace an incompatible existing specification without confirming the requester's intent.
   - Save exactly one Markdown file at the resolved target.
   - Report the project-relative path and a concise completion summary.

## Enforce the Output Contract

- Required project path: `/specs/business/<business-domain>/actors/<name>.md`
- Example: `/specs/business/library/actors/library.md`
- Filesystem interpretation: `<project-root>/specs/business/<business-domain>/actors/<name>.md`
- Required format: Markdown
- Required state: complete, internally consistent, solution-independent, and free of unresolved required fields

If the requester ends the interview before completion, explain which required information remains missing. Save an explicitly labeled draft only when the requester directly requests a draft; never describe that draft as complete.
