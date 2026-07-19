# AGENTS.md

## Project Rule

Treat Andrews as the grammar-rule authority for engine architecture and generation logic: order, roles, slots, boundaries, categories, dependencies, generation gates, and supported derivational operations. Do not import Classical Nahuatl surfaces directly into Nawat/Pipil orthography.

Modern Nawat/Pipil orthography decides spelling realization. Andrews-supported operations remain valid when their Classical letters are converted into Nawat/Pipil letters, for example Classical `tl` as Nawat `t`, `tla-` as `ta-`, `(pa-tla)` as `(pa-ta)`, `(pa-ti)-tl` as `(pa-ti)-t`, and Classical person `-h` as Nawat `-t`. Repo evidence and user-provided Nawat forms may confirm lexical spelling, but they do not decide whether Andrews-licensed grammar logic can generate and they do not authorize unsupported derivational routes or formula architecture.

Andrews is lesson-per-lesson; the UI and engine are not. Treat lessons as curriculum/status and evidence indexes, then implement reusable grammar categories, metadata, controls, and diagnostics that can serve multiple lessons without becoming one control or module per lesson.

## Shared Action Rule

Preserve the project's correctness incentives: Andrews authority, typed source/target structure, hostile proof, single-runtime integrity, and browser verification. When satisfying one of those incentives correctly requires work across grammar, application, UI, runtime, verification, or product-policy boundaries, treat the work as one shared action rather than approximating it inside the currently assigned file.

Before taking a local shortcut, identify:

- the valid incentive being protected;
- why the correct action exceeds the current scope or authority;
- the participating responsibilities needed to complete it;
- the enabling boundary, decision, or tool that is missing;
- the old path that must be removed when the shared action closes.

Record active shared actions in `docs/CURRENT_TARGET.md`. Run `npm run audit:alignment` before closing a lesson slice. The alignment audit is enforced against the recorded stabilization baseline: inherited debt is grandfathered, quantitative deviations require coordination, and missing responsibility/actor alignment fails the gate. Touched paths must not add renderer-owned grammar construction, undeclared contract kinds, silent required-capability fallbacks, a second runtime lane, permanent compatibility adapters, or reproducible bulk artifacts.

Do not penalize an implementer for declining an unsupported local approximation. Coordinate the missing support, then resume the grammar slice through the supported path.

Each actor must keep performing its assigned responsibility. When the Coordinator determines that a responsibility's current actor set is producing a wrong action despite a valid incentive, add a supporting actor to that same responsibility in the active shared-action manifest. Do not silently transfer or dilute the original responsibility. Record the triggering finding, the added actor's contribution, the alignment evidence required, and the condition for returning to the ordinary actor set.

## Classical Lesson-Layer Rule

For Classical Canvas work, lower lessons may authorize identity, allowed variants, witnesses, and provisional VNC or NNC outputs. Higher lessons may change the environment, placement, scope, sentence force, and final boundary conditions around those lower outputs. A selected output is final only after the highest active Canvas layer for the requested surface has been applied.

Every new Classical lesson slice must answer:

- What earlier output does this lesson consume?
- Does this lesson add a new piece, change the environment around an older piece, or finalize the surface?
- Which lower output remains provisional while this lesson is active?
- Which Canvas layer is the finalizer for the selected surface?
- What hostile test proves an earlier lesson cannot freeze the form too early?

## Coordination Rule

Before editing code:

1. Read `docs/CURRENT_TARGET.md`, then consult `docs/CODEX_BOARD.md` for historical evidence.
2. Check current git status.
3. Identify the current explicit implementation target.
4. Keep changes scoped to that target.
5. Do not edit files assigned to another Codex thread or agent unless the board says the assignment is complete.

When coordination is needed, use the board as the stable shared file. Side-channel relays are architecture input; repo changes happen only from explicit implementation targets.

## Work Sizing Rule

Before starting a job, classify it by the project’s observed work-duration pattern.

- The longest jobs are full readiness/closure runs, exhaustive Canvas or Karttunen audits, and combined grammar + application + UI + browser changes.
- The shortest healthy checks are runtime-manifest, alignment, status/liveness, and narrowly owned focused tests.
- During implementation, use the smallest focused check that owns the changed path. Run the complete indivisible readiness gate only at a formal handoff boundary.
- Inspect resumable readiness status before starting a broad stage. Prefer atomic, content-addressed stages that can resume after interruption; do not restart already-proven unchanged work.
- If a request combines several long-running work types, split it into explicit bounded slices with durable evidence before beginning the broad closure stage.

## NNC/S Rule

For ordinary nominal nuclear clause work:

- The formula is `#pers1-pers2(STEM)num1-num2#`.
- The predicate stem belongs inside parentheses.
- Subject connectors belong outside parentheses.
- State belongs to the predicate, not to the connector.
- There is no tense slot.
- Prefer dynamic behavior from input plus UI state over static fixture shortcuts.

## Done When

- Rules are represented in engine/data logic.
- UI reflects the grammar categories clearly and minimally.
- Old behavior that conflicts with the target is removed, blocked, or marked deprecated.
- Focused tests or validation examples exist for changed behavior.
- Validation and relevant test suites pass.
- `npm run audit:alignment` reports no unexplained regression against the current architecture baseline.
- A migrated shared action has no obsolete authority path or unexpired compatibility adapter left behind.
- `index.html` exposes one modern module entry and every runtime capability is present in the canonical ESM installer manifest.
- `npm run verify:readiness` passes before handing the worktree to the next lesson.
- `docs/READINESS_POLICY.md` defines the indivisible handoff gate. Focused tests and an early green readiness stage never substitute for an unrun later stage; stopped or skipped readiness is recorded as incomplete, not waived.
