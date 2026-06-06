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

## Lesson 15 Possession Evidence Boundary

Lesson 15 (`posesion natural y casos de estado`) is pending and evidence-sensitive. It is not mapped into engine behavior yet.

What the Lessons 12-14 foundation already supports:

- Predicate state values: `absolutive` and `possessive`.
- Possessor prefixes from the current inventory: `nu`, `mu`, `i`, `tu`, `anmu`, and `in`.
- Fixture-backed ordinary possessive forms for `kal`, `shuchi`/`shuchit`, and `mistun`.
- Unsupported possessive diagnostics for fixtures without configured possessive forms, such as `tukayit`, `a`/`at`, `machiyut`, and `majmachiyut`.
- `categoryProfile.possessiveState` explaining whether possessive marking was requested and whether the requested marking is available.

What Lesson 15 still needs before engine behavior can be changed:

- Lexical/state-case metadata for each confirmed noun.
- A distinction between ordinary optional possession, natural possession, required possession, possessive-only nouns, absolutive-unavailable nouns, and special state alternation cases.
- A clear record of whether absolutive state is allowed, blocked, or special for each candidate noun.
- A clear record of whether possessive state is required, optional, unavailable, or irregular for each candidate noun.
- Confirmed Nawat/Pipil examples before adding fixtures or generation behavior.

Evidence boundary:

- `kal`, `shuchi`/`shuchit`, and `mistun` confirm ordinary possessive forms only. They do not currently prove natural, inalienable, or obligatory possession.
- `tukayit`, `a`/`at`, `machiyut`, and `majmachiyut` confirm only that unsupported possessive requests remain diagnostic under the current fixture data. They do not prove possessive-unavailable noun classes in the Lesson 15 sense.
- Open-stem examples must not be used as Lesson 15 evidence.
- Andrews may guide the structural categories to ask about, but Nawat/Pipil repo evidence or user-provided forms must decide the actual fixture cells and surfaces.

Future implementation order:

1. Gather confirmed Nawat/Pipil examples.
2. Propose schema fields for possession/state-case metadata.
3. Add validation and focused tests.
4. Add engine metadata and diagnostics without guessing forms.
5. Add UI labels/gating only after metadata exists.

## Lesson 16 Pronominal NNC Evidence Boundary

Lesson 16 (`inventario NNC pronominal`) is pending and evidence-sensitive. It is not mapped into engine behavior yet.

Structural frame, using Andrews as analogy only:

- Pronominal NNCs are a special NNC family, not ordinary noun fixtures by default.
- Pronominal NNCs are absolutive-state only.
- Broad semantic families to distinguish later are entitive and quantitive.
- Entitive subtypes include personal, interrogative, indefinite, and demonstrative.
- Interrogative pronominal NNCs must not be modeled as English-style relative pronouns.

Current project boundary:

- The repo has a future roadmap marker for `pronominal-nnc`, but no working pronominal NNC engine.
- `data/static_nnc.json` contains ordinary NNC fixtures only.
- Ordinary NNC `formulaSlots` should not be automatically reused for pronominal NNCs without a design decision.
- Ordinary nounstem classes `t`, `ti`, `in`, and `zero` should not be assumed for pronominal NNCs without confirmed Nawat/Pipil examples.
- Pronominal NNCs likely need either a parallel slot model or an explicit `nncKind: "pronominal"` extension of `formulaSlots`.
- Do not add schema fields or fixture data until confirmed Nawat/Pipil pronominal NNC examples exist.

Evidence boundary:

- `naja`, `taja`, `yaja`, `tejemet`, `anmejemet`, and `yejemet` are pronoun/agreement labels only for now. They are not confirmed pronominal NNC fixture outputs.
- `ajaka`, `tajtatka`, `muchi`, and `isel` are not confirmed pronominal NNC fixtures.
- `futureSyntaxLayer: "pronominal-nnc"` is a roadmap marker only.
- Open-stem examples, generated output, ordinary pronoun labels, subject/object/person labels, and Andrews/Classical forms must not be treated as confirmed Nawat/Pipil pronominal NNC data.

Future implementation order:

1. Gather confirmed Nawat/Pipil pronominal NNC examples.
2. Propose a pronominal NNC data schema.
3. Add validation rules.
4. Add engine metadata and diagnostics without guessing forms.
5. Add UI labels/gating only after metadata exists.
6. Reduce pending counts only after implementation and tests.

## Lessons 17-19 Supplementation And Topic Evidence Boundary

Lessons 17-19 (`suplementacion y topico`) are pending and evidence-sensitive. They are not mapped into engine, parser, search, generation, or UI behavior yet.

Structural frame, using Andrews as analogy only:

- Supplementation is a multiple-nucleus or appositional structure.
- It relates a pronominal head to an adjoined supplement.
- Possible supplement roles include subject, object, and possessor.
- Supplementation may be shared-referent or included-referent.
- Marked or topic-like supplementation is a clause-level relation.
- Discontinuous supplementation and agreement mismatch require sentence-level metadata.
- VNCs can function as supplements structurally.
- None of these structures should be copied into Nawat/Pipil forms without local evidence.

Current project boundary:

- Supplementation must not be forced into ordinary NNC `formulaSlots`.
- Topic must not become a `nounClass`, `sourceKind`, or ordinary NNC reference/plural type.
- Supplementation must not be inferred from a single NNC output, a single VNC output, or an ordinary parser compound example.
- Supplementation must not be inferred from English/Spanish translation labels alone.
- Pronominal NNCs are not implemented yet, so supplementation work must not depend on imaginary pronominal-NNC behavior.
- The proper future home is likely clause/sentence-level metadata, not ordinary word generation.

Evidence boundary:

- No confirmed Nawat/Pipil supplementation or topic fixture data exists yet.
- `futureSyntaxLayer: ["pronominal-nnc", "supplementation", "included-referent-clause"]` is a roadmap marker only.
- `naja`, `taja`, `yaja`, `tejemet`, `anmejemet`, and `yejemet` are pronoun/agreement labels only for now.
- `ajaka`, `tajtatka`, `isel`, and `muchi` are not confirmed supplementation fixtures.
- Compound/parser examples such as `(shuchi-temua)` are not supplementation evidence.
- VNC rows in CSV data are verb paradigm evidence, not supplementation evidence unless a clause relation is explicitly shown.
- UI topic/focus wording and Andrews/Classical examples are structural prompts only, not Nawat/Pipil data.

Future implementation order:

1. Gather confirmed Nawat/Pipil clause examples.
2. Propose a schema for supplementation/topic examples.
3. Design parser/search metadata.
4. Add diagnostics and focused tests.
5. Add UI representation only after metadata exists.
6. Reduce pending counts only after implementation and tests.

Candidate future schema questions, not implemented fields:

- `principalClause`
- `supplement`
- `headRole`: subject, object, possessor, or unknown.
- `supplementType`: NNC, VNC, sentence, or unknown.
- `referentRelation`: shared, included, or unknown.
- `marking`: unmarked, marked, topic-like, or unknown.
- Discontinuity/spans.
- Agreement mismatch diagnostics.

## Open Sections

- Lessons 12-19: NNC basico.
- Animacy-conditioned common and distributive plural behavior.
- Possessive behavior and allomorphy from Nawat/Pipil evidence.
