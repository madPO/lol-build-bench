# Business Entity Specification

## Description

A business entity specification defines a concept that the business recognizes and reasons about, such as a customer, order, library loan, subscription, or invoice. It establishes the entity's business meaning, identity, lifecycle, information, rules, and relationships without prescribing how software stores or implements it.

The specification creates a shared vocabulary for product owners, domain experts, designers, developers, and testers. Its main purpose is to prevent the same business concept from acquiring different meanings in requirements, interfaces, and code.

## Kind of Specification

This is a **business-domain specification** and a **semantic contract**. It is primarily normative: statements marked with **MUST**, **MUST NOT**, **SHOULD**, and **MAY** express business rules and constraints that implementations are expected to preserve.

It is:

- solution-independent rather than tied to a database, API, UI, or programming language;
- centered on one business concept and its behavior;
- suitable as an input to feature specifications, domain models, data models, API contracts, and acceptance tests;
- valid even if the technical implementation changes.

It is not a database schema, class definition, API payload, or screen design. Technical artifacts may derive from it, but they should not replace it.

## What the Specification Includes

### Required Sections

1. **Name and definition**
   - Canonical singular name.
   - Concise definition in business language.
   - Alternative names and terms that must not be used, when ambiguity is likely.

2. **Business purpose**
   - Why the entity exists.
   - Which business capability, decision, or outcome it supports.

3. **Identity**
   - What makes one instance distinct from another.
   - Whether identity persists when attributes change.
   - Business-visible identifiers, if any.

4. **Information owned by the entity**
   - Business-relevant attributes with definitions.
   - Required, optional, derived, or conditionally required status.
   - Units, allowed values, or meaningful ranges where relevant.

5. **Lifecycle and states**
   - Creation and termination conditions.
   - Valid states and their business meanings.
   - Allowed and prohibited transitions.

6. **Business rules and invariants**
   - Conditions that must always hold.
   - Validation rules and cross-field constraints.
   - Rules governing changes to the entity.

7. **Relationships**
   - Connections to other business entities or value objects.
   - Business meaning and cardinality of each relationship.
   - Ownership or dependency where it matters to the business.

8. **Business events**
   - Significant facts created during the lifecycle.
   - Conditions under which each fact occurs.

9. **Examples and counterexamples**
   - At least one representative valid instance.
   - At least one invalid or easily confused instance.

### Optional Sections

- source of truth or authoritative owner;
- confidentiality, retention, audit, or regulatory rules;
- localization and time-zone semantics;
- volume, frequency, or other business-scale assumptions;
- unresolved questions and explicit assumptions.

## What the Specification Excludes

- table names, columns, indexes, and persistence technology;
- programming-language types or class hierarchies;
- endpoint paths, transport formats, and status codes;
- page layouts and component behavior;
- workflow details belonging to a user scenario;
- permissions that are better defined in an actor specification.

Technical constraints should be included only when they represent an unavoidable business constraint, and they should be stated in business terms.

## Recommended Document Outline

```markdown
# Business Entity: <Canonical Name>

## Definition

## Business Purpose

## Identity

## Business Information

## Lifecycle and States

## Business Rules and Invariants

## Relationships

## Business Events

## Examples

## Counterexamples

## Assumptions and Open Questions
```

## Quality Criteria

A complete business entity specification should satisfy the following checks:

- A domain expert can distinguish the entity from related concepts using the definition alone.
- Identity is explicit and is not confused with a mutable display name.
- Each attribute has business meaning and is not present merely because a current database contains it.
- Every state has entry and exit conditions, or the specification explicitly states that the entity has no meaningful lifecycle states.
- Rules are observable, testable, and free from implementation details.
- Relationships describe why entities are connected, not only their cardinality.
- Examples exercise important rules rather than showing arbitrary sample data.
- Unknowns are recorded as open questions instead of being silently invented.

## Example: Library Loan

### Definition

A **Library Loan** records that one library member has borrowed one physical copy of a book for a defined period.

### Business Purpose

The Library Loan allows the library to know who is responsible for a borrowed book copy, when it is due, and whether it has been returned.

### Identity

- Each Library Loan has a stable loan identifier.
- Returning the book does not change the loan's identity.
- The same member may borrow the same book copy more than once; each borrowing is a different Library Loan.

### Business Information

| Information     | Meaning                                   | Requirement                 |
| --------------- | ----------------------------------------- | --------------------------- |
| Loan identifier | Stable identity of the borrowing          | Required                    |
| Member          | Person responsible for the borrowed copy  | Required                    |
| Book copy       | Specific physical copy that was borrowed  | Required                    |
| Borrowed date   | Date on which the borrowing began         | Required                    |
| Due date        | Date by which the copy should be returned | Required                    |
| Returned date   | Date on which the copy was returned       | Required after return       |
| Status          | Current business state of the borrowing   | Derived from the loan facts |

### Lifecycle and States

- A loan is **Active** from the moment the book copy is borrowed until it is returned or becomes overdue.
- An Active loan becomes **Overdue** when its due date passes without a return.
- An Active or Overdue loan becomes **Returned** when the library receives the book copy.
- Returned is a final state.

### Business Rules and Invariants

- A Library Loan MUST reference exactly one member and one book copy.
- A book copy MUST NOT have more than one Active or Overdue loan at the same time.
- The due date MUST be later than the borrowed date.
- The returned date MUST NOT be earlier than the borrowed date.
- A Returned loan MUST have a returned date.
- An Active or Overdue loan MUST NOT have a returned date.

### Relationships

- A Library Loan belongs to exactly one **Member**.
- A Library Loan concerns exactly one **Book Copy**.
- A Member may have zero or more Library Loans.
- A Book Copy may have many Library Loans over time, but only one may be Active or Overdue.

### Business Events

- **Book Borrowed** when a new Library Loan begins.
- **Loan Became Overdue** when the due date passes without a return.
- **Book Returned** when the borrowed copy is received by the library.

### Valid Example

Loan `L-1042` records that member `M-18` borrowed book copy `B-204` on July 1 and must return it by July 15. The copy has not been returned and the due date has not passed, so the loan is Active.

### Counterexample

A list of books that a member would like to read is not a Library Loan. No specific copy has been borrowed, no borrowing period has begun, and the member is not yet responsible for returning anything.
