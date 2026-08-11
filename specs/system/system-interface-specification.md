# System Interface Specification

## Description

A system interface specification defines the contract at a boundary between two system components or between the system and an external actor. It describes which capabilities are exposed, how information crosses the boundary, which outcomes and errors are observable, and how the contract evolves without breaking its consumers.

This Markdown document describes the specification type; it is not a wrapper template for generated interface contracts. An actual interface specification follows the native-output rules below.

The authoritative format depends on the transport:

| Interface type                  | Required result format | Required file extension |
| ------------------------------- | ---------------------- | ----------------------- |
| HTTP API                        | OpenAPI YAML           | `.openapi.yaml`         |
| gRPC API                        | Protocol Buffers       | `.proto`                |
| Confirmed unknown/custom format | Structured Markdown    | `.md`                   |

Produce one authoritative, format-specific file for one transport binding. The result itself MUST be the native contract: OpenAPI YAML for HTTP or Proto for gRPC. Do not wrap a known-format contract in Markdown and do not create a companion Markdown specification. An unspecified format is missing information and MUST be clarified before writing. Use Markdown only when the format is confirmed to be unknown or custom and no suitable machine-readable contract format exists.

When the system intentionally supports several transport bindings, create a separate native contract for each binding.

## Kind of Specification

This is a **system boundary contract**. It is normative for externally observable operations, data, errors, security expectations, compatibility, and interaction semantics.

It is implementation-independent behind the boundary. Consumers should be able to integrate using the specification without knowing internal source code, database layout, or deployment topology.

## Common Content for Every Interface

Every interface specification includes:

1. **Identity and purpose**
   - Interface name, version, provider, consumers, and business capability.

2. **Boundary and transport**
   - Direction, transport, interaction style, encoding, and network or delivery assumptions.

3. **Operations or messages**
   - Stable names and purpose.
   - Inputs, outputs, and observable side effects.
   - Preconditions that are visible at the boundary.

4. **Data definitions**
   - Field names, meaning, type, required status, constraints, and examples.
   - Canonical identifiers, date/time semantics, units, and enumeration meanings.

5. **Outcome and error model**
   - Success outcomes and machine-readable failures.
   - Retryable and non-retryable distinction where relevant.
   - Partial success rules when supported.

6. **Security and privacy**
   - Authentication and authorization expectations.
   - Sensitive data classification and exposure limits.

7. **Reliability semantics**
   - Idempotency, ordering, deadlines, cancellation, retries, and delivery guarantees when applicable.

8. **Compatibility and lifecycle**
   - Versioning, backward-compatibility rules, deprecation, and removal process.

9. **Limits and quality expectations**
   - Size, rate, latency, timeout, streaming, or batch constraints when material.

10. **Examples**
    - At least one valid exchange and one representative error.

## Format-Specific Requirements

### HTTP API: OpenAPI

Write the result directly to `<interface-name>.openapi.yaml`. Its root content MUST be a valid OpenAPI document; it MUST NOT be a Markdown file containing a YAML code block.

Use OpenAPI 3.1 unless the project explicitly requires another supported version. The OpenAPI YAML document is the complete authoritative contract and should include:

- `openapi`, `info`, and version information;
- paths and HTTP methods;
- stable `operationId` values;
- path, query, header, and cookie parameters;
- request bodies and media types;
- success and error responses for every operation;
- reusable schemas under `components`;
- security schemes and per-operation security requirements;
- examples for important payloads and errors;
- explicit nullability, formats, and required fields;
- idempotency and pagination conventions when applicable.

Use HTTP semantics consistently. Do not return a success response for a business rejection, and do not encode every result as `200 OK` with an untyped message.

### gRPC API: Protocol Buffers

Write the result directly to `<interface-name>.proto`. Its root content MUST be valid Protocol Buffers syntax; it MUST NOT be a Markdown file containing a Proto code block.

Use Proto3 syntax. The `.proto` file is the complete authoritative contract and should include:

- `syntax`, package, and versioned namespace;
- services and clearly named RPC methods;
- request, response, shared message, and enumeration definitions;
- stable field numbers and `reserved` declarations for removed fields;
- comments describing business meaning and constraints not expressible in Proto;
- unary, client-streaming, server-streaming, or bidirectional-streaming semantics;
- canonical gRPC status codes and structured error details;
- deadline, cancellation, idempotency, and retry expectations when material;
- compatibility rules for adding and removing fields and methods.

Do not reuse a field number for different meaning. Do not rely on field names alone for compatibility.

### Unknown or Custom Interface: Markdown

Write the result to `<interface-name>.md` only when the interface format is confirmed to be unknown or custom and no suitable machine-readable contract format exists. Do not create a Markdown result merely because format discovery is incomplete.

The Markdown specification should include:

- provider, consumer, direction, and transport;
- encoding, framing, message or file naming, and sequencing;
- grammar or field dictionary;
- interaction lifecycle, acknowledgements, and timeouts;
- success, rejection, and malformed-input behavior;
- security and integrity protection;
- compatibility and version identification;
- complete valid and invalid examples.

When a suitable native contract format such as JSON Schema, Avro, AsyncAPI, or a formal grammar is identified, use that format as the result instead of Markdown.

## What the Specification Excludes

- internal handler, service, and repository implementation;
- database tables or persistence models;
- deployment topology and network provisioning;
- business rules that have no observable interface effect;
- copied schemas that can drift from the authoritative contract;
- undocumented fields, status codes, or messages used only by convention.

## Recommended Artifact Structure

### HTTP

```text
<interface-name>.openapi.yaml
```

### gRPC

```text
<interface-name>.proto
```

### Unknown or Custom

```text
<interface-name>.md
```

Return exactly one native artifact for the selected interface format. Do not add a Markdown wrapper, companion, or duplicate contract for HTTP or gRPC.

## Quality Criteria

A complete system interface specification should satisfy the following checks:

- The provider, consumers, boundary, transport, and version are explicit.
- Every operation or message has one clear purpose and stable identity.
- Every input and output field has meaning, type, requirement, and constraints.
- Success and error outcomes are complete and machine-distinguishable.
- Security requirements are attached to actual operations and data.
- Idempotency, ordering, retries, and deadlines are defined when they affect consumers.
- Compatibility rules match the selected format.
- The file extension and root document syntax match the selected interface format.
- Examples validate against the authoritative schema.
- No consumer needs undocumented knowledge to integrate.
- The contract contains no internal database or code structure.

## Universal Examples

These fragments illustrate the native file contents. When producing an actual interface specification, write the fragment directly in the indicated file format rather than embedding it in Markdown.

### HTTP Example: OpenAPI Book Lookup

```yaml
openapi: 3.1.0
info:
  title: Library Catalog API
  version: 1.0.0
paths:
  /books/{bookId}:
    get:
      operationId: getBook
      summary: Get one book by its identifier
      parameters:
        - name: bookId
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Book found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Book"
        "404":
          description: No book has the supplied identifier
          content:
            application/problem+json:
              schema:
                $ref: "#/components/schemas/Problem"
components:
  schemas:
    Book:
      type: object
      required: [id, title, available]
      properties:
        id:
          type: string
        title:
          type: string
        available:
          type: boolean
    Problem:
      type: object
      required: [code, message]
      properties:
        code:
          type: string
        message:
          type: string
```

The full contract would also define authentication when required, representative values, and compatibility rules.

### gRPC Example: Proto Book Lookup

```proto
syntax = "proto3";

package library.catalog.v1;

service CatalogService {
  // Returns one book or NOT_FOUND when the identifier is unknown.
  rpc GetBook(GetBookRequest) returns (GetBookResponse);
}

message GetBookRequest {
  string book_id = 1;
}

message GetBookResponse {
  Book book = 1;
}

message Book {
  string id = 1;
  string title = 2;
  bool available = 3;
}
```

The full contract would define field constraints, canonical status details, deadlines, compatibility rules, and reserved field numbers when fields are removed.

### Unknown-Format Example: Legacy Reminder Exchange

```markdown
# Interface: Legacy Reminder Exchange

Provider: Library System
Consumer: Reminder Service
Direction: Library System to Reminder Service
Format status: Custom legacy text exchange with no machine-readable contract
Transport: UTF-8 file delivered to an agreed secure location
Version: 1

## File Naming

`due-reminders-v1-YYYY-MM-DD.txt`

## Record Format and Fields

`REMINDER|<loan_id>|<contact_address>|<due_on>`

- `loan_id`: required stable Library Loan identifier
- `contact_address`: required delivery address
- `due_on`: required calendar date in `YYYY-MM-DD` format

## Delivery

One file is delivered each day. Delivery is complete only after the temporary
file is atomically renamed to its final name. The consumer records the file name
before processing so repeated delivery does not send duplicate reminders.

## Valid Example

REMINDER|L-1042|member@example.test|2026-07-15
```

This text contract makes transport, encoding, framing, fields, completion, and duplicate handling explicit without pretending the interface is HTTP or gRPC.
