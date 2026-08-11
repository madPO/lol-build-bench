---
name: specify-system-interface
description: Create or complete a native-format system interface contract from an introductory description, interviewing the user when transport, provider, consumers, operations, data, errors, security, reliability, or compatibility are missing. Use for OpenAPI YAML HTTP contracts, Proto3 gRPC contracts, or Markdown only when the interface format is unknown, saved under specs/system in a project.
---

# Specify a System Interface

Turn the user's introductory description into one complete interface contract in its native format. Determine the transport before choosing the path, and never wrap a known-format contract in Markdown.

## Read the References

Read both references completely before assessing completeness:

1. Read [references/specification-guide.md](references/specification-guide.md) for transport selection, native formats, required content, exclusions, and validation rules.
2. Read [references/socratic-interview.md](references/socratic-interview.md) before asking any interview question.

## Follow the Workflow

1. **Establish the project and interface identity.**
   - Locate the project root from the repository context and applicable `AGENTS.md` files.
   - Extract the system domain, interface name, and introductory description.
   - Normalize domain and file names to lowercase kebab-case without changing system meaning.
   - Inspect related architecture, event, data, and business specifications for boundary facts.

2. **Determine the transport before resolving the target.**
   - For HTTP, resolve `<project-root>/specs/system/<system-domain>/interface/<name>.openapi.yaml`.
   - For gRPC, resolve `<project-root>/specs/system/<system-domain>/interface/<name>.proto`.
   - Use `<project-root>/specs/system/<system-domain>/interface/<name>.md` only when the format is confirmed to be unknown or custom and no suitable native contract format exists.
   - Treat “API” alone as ambiguous and ask an open-ended transport question.
   - Treat an unspecified format as an interview gap; do not create Markdown merely because format discovery is incomplete.
   - When several transport bindings are required, create and validate a separate native contract for each binding.

3. **Collect evidence.**
   - Maintain an internal ledger of explicit user facts, repository facts, confirmed assumptions, contradictions, and missing required information.
   - Capture provider, consumers, purpose, operations, data meaning, outcomes, errors, security, reliability, compatibility, limits, and examples.
   - Never invent fields, status codes, RPC semantics, authentication, or retry behavior.

4. **Assess completeness and interview.**
   - Map evidence to common and format-specific requirements in the guide.
   - If required information is missing or contradictory, apply the Socratic protocol exactly.
   - Ask one main open-ended question per turn, targeting the highest-impact gap.
   - Continue until the native contract can be complete without undocumented assumptions.
   - If format discovery changes the transport choice, recalculate the extension before writing.
   - Before writing, summarize the boundary and ask what should be corrected or added.

5. **Render and validate natively.**
   - HTTP: write raw OpenAPI YAML whose root starts with an OpenAPI document; do not use Markdown fences or a wrapper.
   - gRPC: write raw Proto3 syntax; do not use Markdown fences or a wrapper.
   - Unknown format: write the structured Markdown contract defined by the guide.
   - Use a project-provided OpenAPI linter/parser or Proto compiler/linter when available.
   - At minimum, parse YAML and verify OpenAPI root fields for HTTP; verify Proto3 syntax, package, services, messages, field numbers, and absence of Markdown fences for gRPC.

6. **Save the result.**
   - Create target directories when necessary.
   - Read an existing target before updating it; confirm intent before replacing an incompatible contract.
   - Save exactly one native artifact per transport binding.
   - Report each project-relative path and validation performed.

## Enforce the Output Contract

- HTTP: `/specs/system/<system-domain>/interface/<name>.openapi.yaml`
- gRPC: `/specs/system/<system-domain>/interface/<name>.proto`
- Confirmed unknown/custom format only: `/specs/system/<system-domain>/interface/<name>.md`
- Forbidden: Markdown wrappers or companion Markdown contracts for HTTP and gRPC

If the user ends the interview before completion, explain which required facts remain missing. Save a clearly labeled draft only when explicitly requested and only in the correct native format.
