# Business User Case Specification Guide

## Contents

- Purpose and boundaries
- One-scenario rule
- Required content
- Optional content
- Document template
- Quality checks
- Universal example

## Purpose and Boundaries

Describe one use case: one concrete interaction in which one primary actor pursues one business goal and reaches one defined outcome through the application or business process. Produce a normative, solution-independent behavioral contract.

Do not turn the specification into a collection of related paths, UI design, API sequence, service topology, database procedure, or internal algorithm.

## One-Scenario Rule

Include exactly:

- one primary actor;
- one business goal;
- one trigger;
- one set of preconditions;
- one ordered interaction flow;
- one result;
- one set of postconditions for that result.

Do not include alternative, exception, extension, cancellation, retry, recovery, or fallback flows. Do not include `if`, `else`, `either`, `or`, “when applicable,” optional steps, or multiple outcomes. A different trigger, precondition, sequence, or outcome belongs in another specification.

## Required Content

Collect and document every item:

1. **Scenario name and identifier**
   - Use a stable identifier and an outcome-oriented title.

2. **Primary actor**
   - Name the actor that initiates the use case and receives its main value.

3. **Goal and business value**
   - State one desired result and why it matters.

4. **Trigger**
   - State the single observable event or decision that starts the scenario.

5. **Preconditions**
   - State facts that are true before the trigger.
   - Make them specific enough to select this exact path.

6. **Scenario flow**
   - Use numbered actor-application steps from trigger to outcome.
   - Make every step unconditional under the preconditions.

7. **Result**
   - State the single outcome reached by the final step.

8. **Postconditions**
   - State facts guaranteed after completion.
   - Identify business information created, changed, or preserved.

9. **Verification criteria**
   - State observable facts that prove this exact scenario completed correctly.
   - Do not introduce another path or outcome.

## Optional Content

Include only when material:

- supporting actors in the same unconditional flow;
- frequency or priority;
- observable performance, accessibility, privacy, localization, or audit expectations;
- related entities, rules, events, and policies;
- confirmed assumptions and optional open questions.

Never leave a required section unresolved in a completed specification.

## Document Template

```markdown
# User Scenario: <Outcome-Oriented Name>

**ID**: <SCN-001>
**Primary actor**: <Actor>
**Supporting actors**: <Actors or None>
**Priority**: <Priority, if material>

## Goal and Business Value

## Trigger

## Preconditions

## Scenario Flow

1. <First unconditional step>

## Result

## Postconditions

## Verification Criteria

## Related Business Rules and Entities

## Confirmed Assumptions
```

Omit optional metadata and `Confirmed Assumptions` when they do not apply.

## Quality Checks

Confirm all statements before saving:

- The title identifies one observable outcome, not a page, component, broad capability, or implementation task.
- One primary actor and one goal anchor the document.
- Trigger and preconditions are distinct.
- Preconditions make the chosen path unambiguous.
- Every step belongs to one unconditional actor-application sequence.
- No step introduces a choice, branch, optional action, or second outcome.
- The final step produces the stated result.
- Postconditions describe only that result.
- Verification criteria confirm the same path without adding another scenario.
- Every actor capability agrees with relevant actor specifications.
- Required information contains no placeholders, guesses, or unresolved questions.

## Universal Example

For **Borrow an Available Book**:

- Primary actor: Member.
- Goal: take an available book home to read.
- Trigger: the Member asks to borrow one specific available copy.
- Preconditions: membership is active, the copy is available, and the borrowing limit is not reached.
- Flow: request the copy, review its due date, confirm, create one Library Loan, mark the copy unavailable, and confirm the loan.
- Result: the Member has borrowed that copy until the due date.
- Postconditions: one Active loan exists and references that Member and copy.
- Verification: the loan appears among the Member's current loans and the copy is unavailable for another loan.
