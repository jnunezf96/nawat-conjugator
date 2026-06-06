# Grammar Spec

This file is reserved for stable grammar summaries extracted by the architecture side channel.

## Scope

- Andrews is used for structural architecture: order, roles, slots, boundaries, and dependencies.
- Nawat/Pipil repo evidence and user-provided forms decide actual surfaces.

## Current Focus

Ordinary nominal nuclear clauses (`S`) are the active grammar area.

Current milestone: Ordinary NNC Foundation v1 - Lessons 12-14.

Stable working constraints:

- Formula: `#pers1-pers2(STEM)num1-num2#`.
- Predicate stem inside parentheses.
- Subject connector outside parentheses.
- State belongs to the predicate.
- No tense slot.
- Dynamic behavior from input and UI state is preferred over static fixture shortcuts.

Milestone scope:

- Lesson 12 is mostly solved as an engine/UI foundation: `formulaSlots` represents `#pers1-pers2(STEM)num1-num2#`, and connector placement is explicit.
- Lesson 13 is partially solved: possessive state is represented and unsupported possessive requests remain diagnostic.
- Lesson 14 is structurally corrected: only `t`, `ti`, `in`, and `zero` are nounstem classes, and class/stem compatibility is enforced.
- The foundation is structurally stable, but not data-complete.

## Ordinary NNC Class/Source Contract

`nounClass` is a grammar class only:

- `t`: vowel-final stem, displayed as `(...V)t`.
- `ti`: consonant-final stem, displayed as `(...C)ti`.
- `in`: consonant-final stem, displayed as `(...C)in`.
- `zero`: consonant-final or vowel-final stem, displayed as `(...C/V)Ø`.

Data status is separate:

- Fixture-backed forms use source metadata such as `fixtureId`, `sourceRefs`, and `sourceKind: "fixture"`.
- Dynamic unconfigured stems use `openStem: true` and `sourceKind: "open-stem"`.
- `lexical` and `open` are not valid nounstem classes.

UI wording should keep these roles apart:

- Predicate class belongs with the predicate stem/composer.
- Subject affixes are shown as `ni...Ø`, `ti...Ø`, `Ø...Ø`, etc.
- Possessor belongs to predicate state.
- Nonanimate plural is reference/distributive behavior, not plural subject agreement.

## Ordinary NNC Formula Slots

The display formula is a diagnostic/teaching layer, not a generator.

Structured slot metadata comes first:

- `subjectPerson.slot = "pers1-pers2"`: subject person prefix/suffix.
- `predicate.slot = "STEM"`: predicate stem, with predicate state kept in predicate metadata.
- `subjectNumberConnector.slot = "num1-num2"`: subject-number connector, conditioned by nounstem class.

The visible echo is derived from those slots:

- `#ni...Ø(tapiyal)Ø#`
- `#Ø...Ø(siwa)t#`

The final marker in the echo is the `num1-num2` subject-number connector slot. It is not a separate lexical suffix and not predicate state.

## Ordinary NNC Category Profile

`categoryProfile` is a derived explanation layer. It does not generate forms and does not replace `formulaSlots`.

Source-of-truth order:

1. Existing generation result fields.
2. `formulaSlots`.
3. Derived `categoryProfile`.
4. Rendered UI labels.

Derived categories:

- Predicate state: `absolutive` -> `absolutivo`, `possessive` -> `posesivo`.
- Possessive state: tracks whether possession was requested, which possessor prefix was requested, and whether possessive marking is available.
- Animacy: `animate` -> `animado`, `inanimate` -> `inanimado`; animacy constrains subject agreement and affects plural/reference behavior.
- Reference: `singular` or `plural`, with plural type retained as `count` or `distributive`.

UI labels should be short and explicit:

- `Estado del predicado: absolutivo`
- `Animacidad: inanimado`
- `Referencia: plural`
- `Conector num1-num2: Ø`

## Ordinary NNC Control Gating

UI controls are not grammar sources. They may inspect the current candidate result to avoid presenting unsupported slots as ordinary choices.

Control rules:

- Possessor selection is `Estado/poseedor`, not a promise that possessive marking is available.
- `Ø` means absolutive/no possessor and must remain available.
- Possessor-prefix choices are unavailable when the probed result says `categoryProfile.possessiveState.markingAvailable === false`.
- A requested unsupported possessor remains visibly selected so the diagnostic remains explainable.
- Class controls refer to the `Conector num1-num2` slot and only expose `t`, `ti`, `in`, and `Ø`.
- Fixture-fixed class or animacy locks conflicting UI choices.
- Animate plural controls are reference controls; inanimate plural-like behavior is distributive reference.

## Ordinary NNC Fixture Coverage Boundary

Current fixture-backed coverage is intentionally small:

- `t` class: confirmed fixture-backed, through examples such as `shuchi`/`shuchit` and `a`/`at`.
- `zero` class: confirmed fixture-backed, through examples such as `kal`, `mistun`, `tukayit`, `machiyut`, and `majmachiyut`.
- `ti` class: no confirmed fixture-backed ordinary noun yet.
- `in` class: no confirmed fixture-backed ordinary noun yet.
- Animate and inanimate behavior are both represented by fixtures.
- Possessive marking and unsupported possessive diagnostics are both represented by fixtures.

Compatibility rule:

- `(...V)t`
- `(...C)ti`
- `(...C)in`
- `(...C/V)Ø`

Current `ti` and `in` coverage is open-stem structural only. `ti` and `in` require consonant-final stems. Examples such as `(xilun)ti` and `(tekpan)in` prove the slot model and connector placement, but they are not fixture-backed evidence. Do not add static `ti` or `in` ordinary NNC fixtures until Nawat/Pipil forms are confirmed by repo data or user-provided evidence.

Rejected false positives from the local evidence hunt:

- `xilunti`: structural/open-stem only, not fixture evidence.
- `tekpanin`: structural/open-stem only, not fixture evidence.
- `naka`/`nakati`: invalid as `ti` because `naka` is vowel-final.
- `kwalti`, `malti`, `pati`, `ati`, `takamati`: verb/parser data, not ordinary noun fixture evidence.

Current confirmed possessive examples:

- `kal`
- `shuchi`/`shuchit`
- `mistun`

The pending row `12-15 · generador NNC data-completo: posesivo y ti/in` remains pending.

## Open Sections

- Lessons 12-19: NNC basico.
- Animacy-conditioned common and distributive plural behavior.
- Possessive behavior and allomorphy from Nawat/Pipil evidence.
