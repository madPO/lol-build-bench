# Business Actor Specification Guide

## Contents

- Purpose and terminology
- Required content
- Optional content
- Document template
- Quality checks
- Universal example

## Purpose and Terminology

Define who or what interacts with the application, toward which goals, with which responsibilities, and under which business permissions and constraints. Produce a semantic and normative participant contract that remains independent of technical implementation.

Use **actor** as the only business term for a participant. An actor may be a human, external system, device, or automated process; may be anonymous or identified; and may overlap with another actor definition.

Do not turn the specification into credential design, identity-provider configuration, middleware policy, database grants, page navigation, or detailed interaction flows.

## Required Content

Collect and document every item:

1. **Scope and system boundary**
   - Define the application or capability covered and explicitly excluded interactions.

2. **Actor catalog**
   - Give each actor a canonical name, type, definition, purpose, goals, responsibilities, and participating scenarios.

3. **Identification and eligibility**
   - State whether each actor may be anonymous or must be identified.
   - State conditions and evidence required for recognition.

4. **Capabilities and permissions**
   - For each governed action, state the affected resource, scope, conditions, and explicit prohibitions.

5. **Responsibilities and obligations**
   - State duties, reasons, approvals, disclosures, or follow-up actions attached to authority.

6. **Actor relationships and overlaps**
   - Define delegation, supervision, service, or authority relationships.
   - Define compatible overlaps and incompatible combinations.

7. **Actor lifecycle and states**
   - Define recognition, valid states, suspension, expiration, revocation, restoration, and termination.
   - State who or what may change recognition or state.

8. **Access matrix**
   - Map actors to governed capabilities with scope and conditions, not only yes-or-no values.

9. **Audit and accountability**
   - Identify actions attributable to an actor and information retained about significant actions.

10. **Examples and edge cases**
    - Cover representative, anonymous, overlapping, suspended, ownership-transfer, and external-system cases when relevant.

## Optional Content

Include only when material:

- personas and participant characteristics;
- organization or tenant membership;
- temporary authority and delegation;
- consent, privacy, age, jurisdiction, or regulatory restrictions;
- service identities for machine-to-machine interaction;
- confirmed assumptions and optional open questions.

Never leave a required section unresolved in a completed specification.

## Document Template

```markdown
# Actors: <Application or Capability>

## Scope and System Boundary

## Definitions

## Actor Catalog

### <Actor>

## Identification and Eligibility

## Capabilities and Permissions

## Responsibilities and Obligations

## Actor Relationships and Overlaps

## Actor Lifecycle and States

## Access Matrix

| Capability | <Actor> | <Actor> |
| ---------- | ------- | ------- |

## Audit and Accountability

## Examples and Edge Cases

## Confirmed Assumptions
```

Omit `Confirmed Assumptions` when there are none. Add optional business sections only when supported and material.

## Quality Checks

Confirm all statements before saving:

- Actors are named by a goal, responsibility, or business capacity rather than a screen or component.
- Human participants, external systems, devices, and automated processes use the same actor model.
- Every actor has a business purpose and responsibilities, not merely interface privileges.
- Every permission identifies action, resource, scope, and conditions.
- Ownership is distinct from application-wide authority.
- Prohibitions and incompatible actor combinations are explicit when material.
- Recognition, state changes, and loss of authority have defined rules.
- Anonymous, inactive, external, and overlapping-actor cases have predictable outcomes.
- Access rules are traceable to scenarios and testable independently of presentation.
- Required information contains no placeholders, guesses, or unresolved questions.

## Universal Example

For a **Public Library**:

- Visitor: anonymous actor that may search the public catalog but cannot borrow.
- Member: identified actor that may borrow books and manage personal Library Loans.
- Librarian: identified actor that may record loans and returns for a valid service reason.
- Reminder Service: external actor that may deliver requested due-date notices but cannot change a loan.
- Overlap: one human may act as Member and Librarian; Librarian authority does not change personal ownership.
- Lifecycle: an inactive Member retains loan records but cannot borrow or renew.
- Accountability: correcting a loan records the Librarian, changed facts, reason, and time.
