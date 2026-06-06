# Implementation Plan

This file is reserved for stable implementation plans after architecture review.

## Current Rule

Do not edit app code from this file alone. Each patch still needs an explicit implementation target in the main thread or a clear board assignment.

## Active Target

Ordinary NNC class/source split and minimal UI terminology pass.

Status: implemented and locally tested.

## Safe Order Template

1. Define the grammar/UI contract for one small target.
2. Add focused failing tests.
3. Patch engine/data/state/UI only where needed.
4. Verify default behavior did not change outside the target.
5. Run validation and test suites.

## Standard Verification

- `npm run check:data`
- `npm test`
- `npm run test:module`
- `npm run test:regression`

## Completed Decisions

- `nounClass` is restricted to `t`, `ti`, `in`, and `zero`.
- Former pseudo-classes `lexical` and `open` are represented through source metadata instead.
- Open-stem ordinary NNC generation remains dynamic and opt-in, defaulting to class `zero` unless the user selects `t`, `ti`, or `in`.
- UI now labels the S board as `NNC/S`, class as predicate class, and animate plural as `Plural` rather than generic `Tipo`.
- `formulaSlots` now backs the visible ordinary NNC formula echo.
- `Formula NNC: #...#` is rendering/metadata clarity only; it does not drive generation.
- `categoryProfile` now derives predicate state, possessive state, animacy, and reference labels from existing result fields and `formulaSlots`.
- Output row category labels are explicit, but unsupported possessive generation still displays diagnostics instead of inferred forms.
- Ordinary NNC UI gating uses side-effect-free render probes only for control availability; probes are not generation truth.
- `Estado/poseedor` disables unavailable possessor prefixes, keeps `Ø` enabled, and preserves diagnostics for selected unsupported possessive requests.
- Composer class control is now `Conector num1-num2`; fixture-fixed class/animacy lock conflicting options.
- Animate plural is labeled as `Referencia plural`, and inanimate reference remains common/distributive.

## Remaining Small Targets

- Add browser smoke coverage for the S board once a dev server target is established.
- Expand evidence-backed possessive/allomorphy examples only when the user supplies Nawat/Pipil forms or repo data clearly supports them.
- Consider a later UI distinction between fixture-backed evidence and dynamic preview output, without changing generation semantics.
- Consider adding a visual slot breakdown if the single formula echo is not enough for teaching, but keep it derived from `formulaSlots`.
- Consider richer visual treatment for locked fixture metadata if disabled controls are not clear enough in browser review.
