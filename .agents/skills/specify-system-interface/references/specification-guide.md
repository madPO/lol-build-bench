# System Interface Guide

## Contents

- [Purpose](#purpose)
- [Artifact Selection](#artifact-selection)
- [Common Required Evidence](#common-required-evidence)
- [HTTP Contract](#http-contract)
- [gRPC Contract](#grpc-contract)
- [Unknown-Format Text Contract](#unknown-format-text-contract)
- [Native Validation](#native-validation)

## Purpose

A system interface specification is the authoritative contract at a system boundary. The selected transport determines both the file extension and root syntax. A known machine-readable contract must be written directly in its native format, never inside a Markdown wrapper.

## Artifact Selection

| Interface choice                | Required result       | Root content             |
| ------------------------------- | --------------------- | ------------------------ |
| HTTP API                        | `<name>.openapi.yaml` | OpenAPI YAML             |
| gRPC API                        | `<name>.proto`        | Proto3                   |
| Confirmed unknown/custom format | `<name>.md`           | Structured text contract |

“API” does not identify a transport. Ask how consumers exchange requests, messages, files, or calls before selecting the artifact.

If multiple transport bindings are required, produce one separate native artifact for each. If JSON Schema, Avro, AsyncAPI, or another suitable native format is identified, use that format instead of Markdown. An unspecified format is missing information: continue the interview until it is known. Markdown is only for a confirmed unknown or custom format without a suitable native contract language.

## Common Required Evidence

Do not call the contract complete until the following are known:

- interface name, purpose, boundary, provider, consumers, direction, transport, and version;
- operations or messages and their stable identities;
- input and output fields, meaning, types, requirements, constraints, and examples;
- success, business rejection, malformed input, authorization failure, and dependency failure behavior;
- authentication, authorization, confidentiality, integrity, and sensitive-data rules;
- timeouts or deadlines, retries, idempotency, ordering, delivery, pagination, and rate limits when material;
- compatibility and deprecation rules;
- complete valid examples and important invalid examples.

Do not invent fields, status codes, RPC semantics, authentication, retry behavior, or compatibility policy. Exclude internal handlers, repositories, database schemas, deployment topology, and business rules with no observable interface effect.

## HTTP Contract

Write raw OpenAPI YAML to `<name>.openapi.yaml`. Include:

- `openapi`, `info`, and `paths` root fields;
- operation IDs, HTTP methods, paths, parameters, request bodies, and responses;
- reusable schemas and security schemes under `components`;
- content types, validation constraints, examples, and problem details;
- applicable authentication, pagination, idempotency, and rate-limit semantics.

Use HTTP semantics consistently. Business rejection must be machine-distinguishable from success. The file must not contain Markdown fences, commentary outside the OpenAPI document, or a companion Markdown contract.

Minimal root shape:

```yaml
openapi: 3.1.0
info:
  title: Catalog API
  version: 1.0.0
paths:
  /items/{itemId}:
    get:
      operationId: getItem
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Item found
        "404":
          description: Item not found
```

## gRPC Contract

Write raw Proto3 to `<name>.proto`. Include:

- `syntax = "proto3"`, package, and versioned namespace;
- services and clearly named RPC methods;
- request, response, shared message, and enumeration definitions;
- stable field numbers and `reserved` declarations for removals;
- comments for meaning and constraints Proto cannot express;
- streaming semantics, canonical status codes, structured errors, deadlines, cancellation, idempotency, and retry expectations when material.

Never reuse a field number for another meaning. The file must not contain Markdown fences or a companion Markdown contract.

Minimal root shape:

```proto
syntax = "proto3";

package catalog.v1;

service CatalogService {
  rpc GetItem(GetItemRequest) returns (GetItemResponse);
}

message GetItemRequest {
  string item_id = 1;
}

message GetItemResponse {
  Item item = 1;
}

message Item {
  string id = 1;
  string name = 2;
}
```

## Unknown-Format Text Contract

Write Markdown only when the format is confirmed to be unknown or custom and no suitable native contract language exists. Include provider, consumer, direction, transport, encoding, framing, naming, sequencing, field dictionary or grammar, acknowledgements, timeouts, success and failure behavior, security, compatibility, and valid and invalid examples.

## Native Validation

- HTTP: run the project's OpenAPI linter or parser when available; at minimum parse YAML, verify required OpenAPI root fields, reject Markdown fences, and validate examples against schemas where tooling permits.
- gRPC: run the project's Proto compiler or linter when available; at minimum check Proto3 syntax, package, services, messages, unique positive field numbers, type references, and absence of Markdown fences.
- Unknown format: verify that the grammar or field dictionary and examples agree.

Return exactly one artifact for each selected binding. Report validation separately; never place validation prose inside a native contract.
