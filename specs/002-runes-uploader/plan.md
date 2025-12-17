# Implementation Plan: Runes Uploader


**Branch**: `002-runes-uploader` | **Date**: 2025-12-14 | **Spec**: F:\pet-projects\lol-builds\specs\002-runes-uploader\spec.md
**Input**: Feature specification from `F:\pet-projects\lol-builds\specs\002-runes-uploader\spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI or `AGENTS.md` for opencode).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)
- Phase 5: Validation (run tests, execute quickstart.md, performance validation)

## Summary
This feature implements a runes uploader, similar to the existing item uploader. It will read rune data from a JSON file, validate it, and load it into a ClickHouse database. Duplicate data handling will be managed by ClickHouse.

## Technical Context
**Language/Version**: Go 1.25.3
**Primary Dependencies**: ClickHouse client library, gRPC
**Storage**: ClickHouse
**Testing**: No tests during MVP phase (per constitution)
**Target Platform**: Linux server
**Project Type**: backend
**Performance Goals**: Not critical, low volume data.
**Constraints**: Data read from JSON file, similar to item uploader.
**Scale/Scope**: Low volume (once a month) of rune data, not too many entries.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 2 (api-service, loader-service)
- Using framework directly? (yes)
- Single data model? (yes)
- Avoiding patterns? (yes)

**Architecture**:
- EVERY feature as library? (yes)
- Libraries listed: `entities/dragontail`, `entities/item`, `entities/patch`, `features/dragontail`, `features/item`, `features/patch`
- CLI per library: No CLIs for existing libraries.
- Library docs: llms.txt format planned? (No, code as documentation)

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? (No, MVP phase)
- Git commits show tests before implementation? (No, MVP phase)
- Order: Contract→Integration→E2E→Unit strictly followed? (No, MVP phase)
- Real dependencies used? (yes)
- Integration tests for: new libraries, contract changes, shared schemas? (No, MVP phase)
- FORBIDDEN: Implementation before test, skipping RED phase (Allowed during MVP phase)

**Observability**:
- Structured logging included? (yes)
- Frontend logs → backend? (N/A, backend only)
- Error context sufficient? (yes)

**Versioning**:
- Version number assigned? (yes, Go modules)
- BUILD increments on every change? Handled by existing CI/CD pipeline or manual incrementation.
- Breaking changes handled? Standard Go module versioning practices and communication.

## Project Structure

### Documentation (this feature)
```
specs/002-runes-uploader/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: Option 2 (backend only, as per existing project structure)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - CLI per library: Are there CLIs for existing libraries?
   - BUILD increments on every change?
   - Breaking changes handled?
   - What happens if the connection to ClickHouse fails during the upload process?

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/powershell/update-agent-context.ps1 -AgentType opencode` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [X] Phase 0: Research complete (/plan command)
- [X] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [X] Initial Constitution Check: PASS
- [X] Post-Design Constitution Check: PASS
- [X] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
