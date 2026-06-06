# Codex Coordination Board

## Source Of Truth

- Grammar book: `/Users/jaimenunez/Documents/Nahuat World/Classical/Linguistics/[Andrews] Introduction to Classical Nahuatl.pdf`
- Repo: `/Users/jaimenunez/Desktop/Nawat_Conjugator`
- Architecture side channel: `019e997b-3f2b-7e30-bbf7-0c773c6ca188`
- Main implementation thread: `019e9442-c3e2-7490-bf93-04d7995f1dc5`

## Standing Interpretation

- Andrews supplies structure, not Nawat/Pipil surfaces.
- Nawat/Pipil repo evidence and user-provided forms decide forms.
- Keep current UI/engine contracts as the starting point.
- Prefer small, tested patches over broad redesign.
- Do not make ordinary NNC generation automatic unless the user explicitly changes that contract.

## Chat A: Architect / Reviewer

Status: Active side channel.

Responsibilities:

- Read book sections and summarize structural implications.
- Clarify user grammar intent.
- Relay concise implementation targets to the main thread.
- Include expected behavior, evidence, likely files, tests, and risks.

Output files:

- `docs/GRAMMAR_SPEC.md` when a stable section summary is ready.
- `docs/IMPLEMENTATION_PLAN.md` when a stable patch sequence is ready.

## Chat B: Implementer

Status: Active main thread.

Responsibilities:

- Read the board before implementation work.
- Implement only explicit targets.
- Preserve existing behavior unless the target proves it wrong.
- Add or update focused tests for changed behavior.
- Run validation and relevant test suites.

Files changed:

- `data/static_nnc.json`: fixture `nounClass` values now use only grammar classes (`t`, `ti`, `in`, `zero`); formerly pseudo-class `lexical` entries are `zero`.
- `src/core/nnc/nnc.js` and `src/core/nnc/nnc.mjs`: open-stem ordinary NNC defaults to class `zero`; fixture-backed results expose `source.sourceKind = "fixture"`.
- `scripts/check_grammar_data.js`: static NNC validation rejects pseudo/unknown noun classes and unknown animacy.
- `index.html`, `src/ui/composer/composer.js`, `src/ui/composer/composer.mjs`, `src/ui/rendering/rendering.js`, `src/ui/rendering/rendering.mjs`: ordinary NNC labels now separate `NNC/S`, predicate class, subject, possessor, reference, and plural.
- `src/tests/nnc.test.js`, `src/tests/parsing.test.js`, `src/tests/search.test.js`, `src/tests/data_validation.test.js`, `src/tests/ui.test.js`: expectations updated for the class/source split and new validation/UI labels.

Blocked by:

- No blocker. Current phase passes local validation/tests in the main runtime.

## Completed Phase: Ordinary NNC Class/Source Split

Date: 2026-06-05

Decision:

- `nounClass` is only a grammar class: `t`, `ti`, `in`, or `zero`.
- `lexical` and `open` are not nounstem classes.
- Fixture-backed and dynamic/open-stem status belongs in source metadata, not `nounClass`.
- Ordinary NNC generation remains explicit opt-in.
- UI labels should say predicate class, subject, possessor, reference, and plural rather than collapsing those roles into one connector label.

Verification:

- `npm test`: passed, 817/817.

## Completed Phase: Ordinary NNC Formula Slots

Date: 2026-06-05

Decision:

- `formulaSlots` is the structured source of truth for the teaching formula `#pers1-pers2(STEM)num1-num2#`.
- The visible `Formula NNC: #...#` row text is derived from `formulaSlots`; it is not used for generation.
- `pers1-pers2` maps to subject person prefix/suffix metadata.
- `STEM` maps to the predicate stem and predicate state metadata.
- `num1-num2` maps to the subject-number connector slot, with noun class kept separately as `clase Ø/t/ti/in`.
- No Nawat surface forms or routing behavior changed.

Verification:

- `npm test`: passed, 819/819.

## Completed Phase: Ordinary NNC Category Profile

Date: 2026-06-05

Decision:

- `categoryProfile` is explanatory metadata only.
- Source-of-truth order is existing result fields, then `formulaSlots`, then derived `categoryProfile`, then rendered labels.
- Predicate state, possessive state, animacy, and reference/number are now exposed as a derived profile.
- Ordinary NNC output rows render short category labels:
  - `Estado del predicado: absolutivo/posesivo`
  - `Animacidad: animado/inanimado`
  - `Referencia: singular/plural`
  - `Conector num1-num2: Ø/t/ti/in`
- Unsupported possessive requests remain unsupported diagnostics; labels do not make unavailable marking appear valid.

Verification:

- `npm test`: passed, 820/820.

## Completed Phase: Ordinary NNC UI Gating

Date: 2026-06-05

Decision:

- Ordinary NNC controls now consult existing result metadata and derived `categoryProfile` before presenting a control as available.
- UI probes are deterministic, side-effect free, locally cached during render, and do not change generation, routing, or Nawat surfaces.
- The possessor control is labeled `Estado/poseedor`; `Ø` remains the absolutive/no-possessor escape hatch.
- Possessor-prefix choices are disabled/marked unavailable when `categoryProfile.possessiveState.markingAvailable` is false for the probed slot, while an already requested unsupported possessor remains visibly selected and the output diagnostic remains visible.
- Composer class controls are labeled by the `Conector num1-num2` role and keep only `t`, `ti`, `in`, and `Ø`.
- Fixture-fixed class and animacy metadata locks conflicting composer options instead of treating them as ordinary user choices.
- Animate plural controls are labeled `Referencia plural`; inanimate reference remains common/distributive.

Verification:

- `git diff --check`: passed.
- `npm run check:data`: passed.
- `npm test`: passed, 820/820.
- `npm run test:module`: passed, 820/820.
- `npm run test:regression`: passed, 12/12.

## Milestone: Ordinary NNC Foundation v1 - Lessons 12-14

Date: 2026-06-05

Summary:

- Phases 1-7B establish the working ordinary NNC engine/UI contract for Lessons 12-14.
- The foundation is structurally stable, but not data-complete.
- Do not add `ti` or `in` fixtures without evidence-backed Nawat/Pipil forms.
- Do not treat open-stem structural examples as fixture evidence.

Lesson 12: Absolutive-State NNC Formula

- Mostly solved as an engine/UI foundation.
- The formula `#pers1-pers2(STEM)num1-num2#` is represented through `formulaSlots`.
- Connector placement is explicit in metadata and UI rendering.

Lesson 13: Possessive-State NNC Formula

- Partially solved.
- Possessive state is represented through metadata and UI gating.
- Unsupported possessive requests remain diagnostic.
- Full possessive paradigms still require more evidence/data.

Lesson 14: Nounstem Classes

- Strongly improved and structurally corrected.
- Valid `nounClass` values are only `t`, `ti`, `in`, and `zero`.
- `lexical` and `open` are not nounstem classes.
- Class/stem compatibility is `(...V)t`, `(...C)ti`, `(...C)in`, and `(...C/V)Ø`.
- Fixture-backed `ti` and `in` examples remain missing.

Evidence boundary:

- Fixture-backed classes currently confirmed: `t` and `zero`.
- Fixture-backed classes not yet confirmed: `ti` and `in`.
- Confirmed possessive examples: `kal`, `shuchi`/`shuchit`, and `mistun`.
- Rejected false positives: `xilunti` and `tekpanin` are structural/open-stem only; `naka`/`nakati` is invalid as `ti`; `kwalti`, `malti`, `pati`, `ati`, and `takamati` are verb/parser data.
- The pending row `12-15 · generador NNC data-completo: posesivo y ti/in` remains pending.

Next safe options:

1. Continue evidence hunt for fixture-backed `ti` and `in`.
2. Expand possessive-state examples only from confirmed data.
3. Begin inventory for Lessons 15-19 without editing behavior yet.

## Boundary: Lesson 15 Possession Evidence

Date: 2026-06-06

Decision:

- Lesson 15 (`posesion natural y casos de estado`) remains pending and evidence-sensitive.
- Current engine behavior supports ordinary possessive state, possessor prefixes, fixture-backed possessive forms, unsupported possessive diagnostics, and `categoryProfile.possessiveState` availability metadata.
- Current confirmed possessive examples (`kal`, `shuchi`/`shuchit`, `mistun`) prove ordinary possessive forms only. They do not prove natural, inalienable, or obligatory possession.
- Current absolutive-only fixtures (`tukayit`, `a`/`at`, `machiyut`, `majmachiyut`) prove unsupported possessive diagnostics only. They do not prove Lesson 15 possessive-unavailable classes.
- No current schema field distinguishes ordinary optional possession, natural possession, required/obligatory possession, possessive-only nouns, absolutive-unavailable nouns, or special state alternation cases.
- Do not add `naturalPossession`, `requiresPossessor`, `possessionType`, or state-case metadata until confirmed examples and a schema proposal exist.
- Open-stem examples and Andrews-only analogies are not Lesson 15 evidence.

Future path:

1. Confirm Nawat/Pipil examples.
2. Propose a possession/state-case schema.
3. Add validation and tests.
4. Add engine metadata/diagnostics.
5. Add UI labels/gating only after metadata exists.

## Merge Rules

- Do not edit the same file from two worktrees at the same time.
- Update this board before ending a coordination session when assignments change.
- If uncertain, write a question or target clarification instead of guessing.
- Main-thread edits should stay on the current working tree unless the user explicitly requests worktrees.
