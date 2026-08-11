# User Scenario Specification

## Description

A user scenario specification describes **one use case**: one concrete interaction in which an actor pursues a single business goal and reaches a single defined outcome through the application or business process.

The specification follows one path from its trigger to its result. Every step belongs to that path and occurs under the stated preconditions. It does not combine successful, failed, cancelled, optional, or conditional paths.

If another path has a different trigger, precondition, sequence, or outcome, describe it in a separate user scenario specification with its own identifier and title.

## Kind of Specification

This is a **behavioral business specification** expressed as a single use case. It is:

- goal-oriented, because it begins with one actor's business goal;
- scenario-specific, because it describes one concrete path;
- normative, because it defines externally observable behavior;
- solution-independent, unless a technology is itself a business requirement;
- suitable as an input to design, implementation, and acceptance testing.

The specification is not a collection of related paths. A broader business capability may require several user scenario specifications.

## One-Scenario Rule

Each specification MUST contain exactly:

- one primary actor;
- one business goal;
- one trigger;
- one set of preconditions;
- one ordered interaction flow without branches;
- one result;
- one set of postconditions describing that result.

The flow MUST NOT contain:

- alternative or exception flows;
- `if`, `else`, `either`, `or`, or “when applicable” branches;
- optional steps;
- multiple possible outcomes;
- recovery, retry, cancellation, or fallback behavior;
- references that redirect part of the flow to another path.

When any of these behaviors matters, create another independently named scenario rather than adding another path to the current specification.

## What the Specification Includes

### Required Sections

1. **Scenario name and identifier**
   - Stable identifier for traceability.
   - Short, outcome-oriented title that distinguishes this path from related scenarios.

2. **Primary actor**
   - Actor that initiates the use case and receives its main value.
   - Reference to the applicable actor specification when one exists.

3. **Goal and business value**
   - One result the actor wants.
   - Reason that result matters.

4. **Trigger**
   - One observable event or decision that starts the use case.

5. **Preconditions**
   - Facts that must already be true before the trigger.
   - Preconditions must select the exact path being described.

6. **Scenario flow**
   - Numbered interaction steps from trigger to outcome.
   - Actor intentions and externally observable application responsibilities.
   - A single unconditional sequence.

7. **Result**
   - Concise statement of the outcome reached by this scenario.

8. **Postconditions**
   - Facts guaranteed to be true after the final step.
   - Business information created, changed, or left unchanged by the outcome.

9. **Verification criteria**
   - Observable facts that demonstrate this exact scenario was completed correctly.
   - Criteria must not introduce another path or outcome.

### Optional Sections

- supporting actors that participate in the same unconditional flow;
- frequency or priority;
- observable performance, accessibility, privacy, localization, or audit expectations;
- linked business entities, rules, events, and policies;
- assumptions, dependencies, and open questions.

## What the Specification Excludes

- alternative, exception, extension, cancellation, retry, and recovery flows;
- branches or conditional outcomes;
- more than one primary actor or business goal;
- collections of related use cases;
- component trees, wireframes, and exact screen layout;
- endpoint sequences, database operations, and service topology;
- internal algorithms that do not affect observable behavior;
- entity definitions duplicated from business entity specifications;
- actor definitions or permission matrices duplicated from actor specifications;
- vague aspirations that cannot be demonstrated or tested.

A scenario may mention an interface control when that interaction is itself required, but it should describe actor intent rather than freeze an incidental design. Prefer “the Member asks to borrow the book” over “the Member clicks the green button in the top-right corner.”

## Recommended Document Outline

```markdown
# User Scenario: <Outcome-Oriented Name>

**ID**: <SCN-001>
**Primary actor**: <Actor>
**Priority**: <Priority, if used>

## Goal and Business Value

## Trigger

## Preconditions

## Scenario Flow

## Result

## Postconditions

## Verification Criteria

## Related Business Rules and Entities

## Assumptions and Open Questions
```

## Quality Criteria

A complete user scenario specification should satisfy the following checks:

- The title identifies one observable outcome rather than a page, component, broad capability, or implementation task.
- One primary actor and one business goal anchor the scenario.
- The trigger and preconditions are distinct.
- Preconditions make the described path unambiguous.
- Every step occurs in one unconditional actor-application sequence.
- No step introduces a decision, branch, optional action, or second outcome.
- The final step produces the stated result.
- Postconditions describe only the outcome of this scenario.
- Verification criteria confirm the same path without adding another scenario.
- Every capability exercised by an actor is consistent with the actor specification.
- Steps remain externally observable and avoid implementation design.
- Related paths are referenced only as separate scenario identifiers, not embedded as additional flows.

## Example: Borrow an Available Book

**ID**: SCN-LOAN-001  
**Primary actor**: Member  
**Supporting actor**: None  
**Priority**: High

### Goal and Business Value

The Member wants to borrow an available book so it can be taken home and read.

### Trigger

The Member asks to borrow a specific available book copy.

### Preconditions

- The Member is identified and has an active library membership.
- The selected book copy is available.
- The Member has not reached the borrowing limit.
- The Member has no restriction that prevents borrowing.
- The library can create a loan.

### Scenario Flow

1. The Member asks to borrow the selected book copy.
2. The application presents the book title and due date for confirmation.
3. The Member confirms the borrowing.
4. The application verifies that the preconditions still hold.
5. The application creates a Library Loan for the Member and the selected copy.
6. The application marks the book copy as unavailable for another loan.
7. The application confirms the borrowing and presents the due date.

### Result

The Member has borrowed the selected book copy until the stated due date.

### Postconditions

- Exactly one new Active Library Loan exists with a stable identity.
- The loan references the Member and the selected book copy.
- The loan records the borrowing date and stated due date.
- The selected copy is unavailable for another loan.
- The loan appears in the Member's current loans.

### Verification Criteria

- The Member's current loans contain one loan for the selected book copy.
- The loan is Active and presents the stated due date.
- The public catalog shows that the selected copy is unavailable.
- No duplicate loan is created by this scenario.

### Related Business Rules and Entities

- **Business entity**: Library Loan.
- **Actor**: Member.
- **Rules**: A book copy can have only one Active or Overdue loan, and the due date must be later than the borrowing date.
