# Actor Specification

## Description

An actor specification defines **who or what interacts with the application, toward which goals, with which responsibilities, and under which business permissions and constraints**.

**Actor** is the only participant term used by this specification. An actor can be:

- a human participant, such as a Visitor, Member, or Librarian;
- an external system, such as a Reminder Service;
- a device or automated process that participates across the application boundary;
- anonymous or identified, depending on the business interaction.

An actor name may describe a broad category of participants or a specific capacity in which a participant acts. The same participant may satisfy several actor definitions at the same time. For example, one person may act as both Member and Librarian. Each action is governed by the responsibilities and permissions of the actor definition under which it is performed.

The specification provides a shared model for product behavior, access control, interaction scenarios, accountability, and personalized experiences.

## Kind of Specification

This is a **business participant and authorization specification**. It is both:

- semantic, because it defines actors and their relationships; and
- normative, because it states responsibilities, eligibility, permissions, conflicts, and lifecycle rules.

It is solution-independent. It can guide identity and access-control design, but it does not prescribe an authentication provider, credential format, database schema, middleware library, or navigation model.

## What the Specification Includes

### Required Sections

1. **System boundary and scope**
   - Application or business capability to which the actor model applies.
   - Interactions explicitly outside the scope.

2. **Actor catalog**
   - Canonical actor name and definition.
   - Human, external system, device, automated process, or other actor type.
   - Business purpose, goals, and responsibilities.
   - Scenarios in which the actor participates.

3. **Identification and eligibility**
   - Whether the actor may be anonymous or must be identified.
   - Conditions a participant must satisfy to act as this actor.
   - Evidence, approval, or business state required for recognition.

4. **Capabilities and permissions**
   - Business actions the actor may perform.
   - Resources affected by each action.
   - Scope, such as owned resources, assigned resources, public resources, or all resources.
   - Conditional permissions and explicit prohibitions.

5. **Responsibilities and obligations**
   - Duties the actor accepts when exercising a capability.
   - Required reasons, approvals, disclosures, or follow-up actions.

6. **Actor relationships and overlaps**
   - Relationships among actors, including delegation, supervision, service, or authority.
   - Actor definitions that one participant may satisfy simultaneously.
   - Incompatible actor combinations and separation-of-duty constraints.

7. **Actor lifecycle and states**
   - How a participant becomes recognized as an actor.
   - Valid states and their business meanings.
   - Suspension, expiration, revocation, restoration, and termination rules.
   - Authority required to change an actor's state or recognition.

8. **Access matrix**
   - Traceable summary of actors against governed capabilities.
   - Conditions and resource scope, not only yes-or-no values.

9. **Audit and accountability rules**
   - Actions that must be attributable to an identified actor.
   - Required business reason, approval, or review.
   - Information that must be retained about significant actions.

10. **Examples and edge cases**
    - Representative actors and permitted actions.
    - Anonymous, overlapping-actor, suspended-actor, ownership-transfer, and external-system cases where relevant.

### Optional Sections

- personas and participant characteristics that affect product decisions;
- organization or tenant membership;
- temporary authority and delegation;
- consent, privacy, age, jurisdiction, or regulatory restrictions;
- service identities for machine-to-machine interactions;
- assumptions, dependencies, and open questions.

## What the Specification Excludes

- passwords, cryptographic mechanisms, session storage, and credential claims;
- identity-provider configuration and authentication protocols;
- route guards, middleware, policy code, or database grants;
- page-level navigation unless it represents a business access rule;
- detailed interaction flows belonging in scenario specifications;
- business entity internals unrelated to ownership, access, or accountability.

“The button is hidden” is not a sufficient permission rule. The specification must state whether the underlying action is forbidden, conditionally permitted, or merely unavailable in a particular interface.

## Recommended Document Outline

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

## Audit and Accountability

## Examples and Edge Cases

## Assumptions and Open Questions
```

## Quality Criteria

A complete actor specification should satisfy the following checks:

- Actors are named by their relationship to a goal, responsibility, or business capacity rather than by a screen or implementation component.
- Human participants, external systems, devices, and automated processes can all be represented consistently as actors.
- Every actor has a business purpose and responsibilities, not merely a list of interface privileges.
- Permission rules identify the action, affected resource, scope, and conditions.
- Ownership checks are distinguished from application-wide authority.
- Prohibitions and conflicts are explicit where safety or accountability matters.
- Actor recognition, state changes, and loss of authority have defined rules.
- Anonymous, suspended, inactive, external, and overlapping-actor cases have predictable outcomes.
- Access rules can be traced to scenarios and tested independently of presentation.
- Open policy decisions are stated as questions rather than inferred from conventional access-control patterns.

## Example: Public Library Actors

### Scope and System Boundary

This example covers searching the library catalog, borrowing and returning books, maintaining loan records, and sending due-date reminders. Purchasing books and managing library employees are outside this actor model.

### Actor Catalog

#### Visitor

- **Type**: Anonymous human actor.
- **Purpose**: Explore books available from the library.
- **Participates in**: Search the public catalog; view book information.
- **Permission scope**: Public catalog information only.
- **Constraint**: Cannot borrow a book.

#### Member

- **Type**: Identified human actor.
- **Purpose**: Borrow books and manage personal loans.
- **Participates in**: Borrow an available book; view personal loans; return or renew a borrowed book.
- **Permission scope**: The Member's own Library Loans.
- **Eligibility**: The participant must have an active library membership.
- **Constraint**: Cannot view or change another Member's private loan information.

#### Librarian

- **Type**: Identified human actor with library-service authority.
- **Purpose**: Help Members borrow and return books and keep loan records accurate.
- **Participates in**: Register a loan; record a return; correct an inaccurate loan record.
- **Permission scope**: Library Loans handled as part of library service.
- **Eligibility**: The library must grant service authority to the participant.
- **Constraint**: Must not change a loan without a valid service reason.

#### Reminder Service

- **Type**: Identified external-system actor.
- **Purpose**: Notify Members that borrowed books are approaching or past their due dates.
- **Participates in**: Receive reminder requests; deliver due-date notices.
- **Permission scope**: Contact and due-date information required for a specific reminder.
- **Constraint**: Cannot create, change, or close a Library Loan.

### Actor Relationships and Overlaps

- The same human participant may act as both Member and Librarian.
- Librarian authority does not expand ownership of personal Library Loans.
- The Reminder Service receives only the information required to send a specific notice.
- The Reminder Service has no Member or Librarian authority.

### Actor Lifecycle and States

- A participant becomes a Member when library membership is activated.
- A Member becomes inactive when membership expires or is suspended.
- An inactive Member retains existing loan records but cannot borrow or renew a book.
- A participant may act as Librarian only while library-service authority is active.
- The Reminder Service may act only while its connection to the library is approved and active.

### Access Matrix

| Capability                | Visitor | Member                      | Librarian                                | Reminder Service               |
| ------------------------- | ------- | --------------------------- | ---------------------------------------- | ------------------------------ |
| Search public catalog     | Allow   | Allow                       | Allow                                    | Deny                           |
| Borrow available book     | Deny    | Allow                       | Only when also acting as Member          | Deny                           |
| View personal loans       | Deny    | Allow for own loans         | Only with a valid library-service reason | Deny                           |
| Renew borrowed book       | Deny    | Allow for own eligible loan | Allow with the Member's request          | Deny                           |
| Record returned book      | Deny    | Deny                        | Allow                                    | Deny                           |
| Correct loan record       | Deny    | Deny                        | Allow with a recorded reason             | Deny                           |
| Deliver due-date reminder | Deny    | Deny                        | Deny                                     | Allow for a requested reminder |

“Only when also acting as” means one participant satisfies both actor definitions, and the additional actor supplies the required authority.

### Responsibilities and Obligations

- A Member must return borrowed books by their due dates.
- A Librarian must record a valid reason when correcting a loan.
- A Librarian must protect private Member information.
- The Reminder Service must use received information only to deliver the requested notice.

### Audit and Accountability

- Borrowing a book is attributable to the identified Member.
- Recording a return identifies the Librarian, Library Loan, book copy, and time.
- Correcting a loan identifies the Librarian, changed information, reason, and time.
- Sending a reminder is attributable to the Reminder Service.

### Examples and Edge Cases

#### Overlapping Actors

Participant `P-42` is recognized as both Member and Librarian. The participant may borrow a book for personal use as Member and record another Member's returned book as Librarian. Librarian authority does not make other Members' loans personal loans of `P-42`.

#### Suspended Actor

Member `M-17` has two active loans and is suspended. The loans remain recorded and the books must still be returned, but the actor cannot borrow or renew a book while suspended.

#### Anonymous Actor

A Visitor can search the public catalog and view a book's title and author. To borrow an available copy, the participant must become an active Member.

#### External-System Actor

The Reminder Service may receive a Member's contact address and a loan due date for a requested notice. It cannot view unrelated loans or change the due date.
