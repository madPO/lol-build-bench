# Business Entity Specification Guide

## Contents

- Purpose and boundaries
- Required content
- Optional content
- Document template
- Quality checks
- Universal example

## Purpose and Boundaries

Define one business concept that has meaning, identity, information, rules, relationships, and usually a lifecycle. Produce a normative, solution-independent semantic contract that remains valid when technical implementation changes.

Do not turn the specification into a database schema, class definition, API payload, workflow, permission model, or screen design.

## Required Content

Collect and document every item:

1. **Canonical name and definition**
   - Define the entity in business language.
   - Record aliases or prohibited ambiguous terms when material.

2. **Business purpose**
   - Explain why the entity exists and which decision, capability, or outcome it supports.

3. **Identity**
   - State what distinguishes one instance from another.
   - State whether identity survives attribute and state changes.
   - Identify business-visible identifiers when they exist.

4. **Business information**
   - Define every relevant attribute.
   - Mark each as required, optional, derived, or conditionally required.
   - Define units, ranges, or allowed values when material.

5. **Lifecycle and states**
   - Define creation and termination conditions.
   - Define every state and its business meaning.
   - Define allowed transitions and their conditions.
   - State explicitly when no meaningful lifecycle exists.

6. **Business rules and invariants**
   - State conditions that must always hold.
   - Include validation and cross-field rules.
   - Make each rule observable and testable.

7. **Relationships**
   - Name related entities and explain why they are connected.
   - State cardinality, ownership, or dependency when meaningful.

8. **Business events**
   - Name significant facts that occur during the lifecycle.
   - State the condition that produces each event.

9. **Examples and counterexamples**
   - Include at least one representative valid instance.
   - Include at least one close case that is not this entity or violates a key rule.

## Optional Content

Include only when material:

- source of truth or accountable owner;
- confidentiality, retention, audit, or regulatory requirements;
- localization, time-zone, volume, or frequency semantics;
- confirmed assumptions and optional open questions.

Never leave a required section unresolved in a completed specification.

## Document Template

```markdown
# Business Entity: <Canonical Name>

## Definition

## Business Purpose

## Identity

## Business Information

| Information | Meaning | Requirement |
| ----------- | ------- | ----------- |

## Lifecycle and States

## Business Rules and Invariants

## Relationships

## Business Events

## Valid Example

## Counterexample

## Confirmed Assumptions
```

Omit `Confirmed Assumptions` when there are none. Add optional business sections only when supported and material.

## Quality Checks

Confirm all statements before saving:

- A domain expert can distinguish the entity from neighboring concepts using the definition alone.
- Identity is explicit and is not confused with a mutable label.
- Every attribute carries business meaning rather than mirroring a current database.
- Each state has clear entry and exit conditions.
- Rules are observable, testable, internally consistent, and free of implementation details.
- Relationships explain business meaning, not only cardinality.
- Events are facts that have occurred and use past-tense names.
- Examples exercise important rules instead of showing arbitrary data.
- Required information contains no placeholders, guesses, or unresolved questions.

## Universal Example

For a **Library Loan**:

- Definition: one member has borrowed one physical book copy for a defined period.
- Identity: a stable loan identifier; borrowing the same copy again creates another loan.
- Information: member, book copy, borrowed date, due date, returned date, and derived status.
- States: Active, Overdue, Returned.
- Invariant: one book copy cannot have more than one Active or Overdue loan.
- Relationships: exactly one Member and one Book Copy.
- Events: Book Borrowed, Loan Became Overdue, Book Returned.
- Counterexample: a reading wish list is not a loan because no copy has been borrowed.
