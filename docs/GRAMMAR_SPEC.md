# Grammar Spec

This file is reserved for stable grammar summaries extracted by the architecture side channel.

## Scope

- Andrews PDF is the grammar-rule authority for engine architecture: order, roles, slots, boundaries, categories, and dependencies.
- Modern Nawat/Pipil orthography is the spelling/surface authority. Classical Nahuatl examples from Andrews must not be copied verbatim into Nawat output; they must be realized through Nawat/Pipil orthography and confirmed Nawat-specific exceptions.
- Nawat/Pipil repo evidence and user-provided forms decide lexical examples, spelling realization, and Nawat-specific exceptions; they do not demote Andrews to analogy for engine rules.
- Andrews is lesson-per-lesson, but the UI/engine is category-based. Lesson rows are curriculum/status and evidence indexes; implementation should extract reusable grammar categories, metadata, controls, and diagnostics rather than creating one engine or UI surface per lesson.

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

Lesson 15 (`posesion natural y casos de estado`) is still pending as a data-complete fixture/status row, but Andrews 39.3.4 now provides one implemented engine contract for organic/integral possession. The contract is opt-in and uses Nawat/Pipil orthography: `possessionKind: "organic"` transforms a source nounstem into a possessive-state `-yu` matrix stem, e.g. `naka` + `nu` -> `nunakayu`. This is a generated open-stem structure, not fixture-backed lexical evidence.

What the Lessons 12-14 foundation already supports:

- Predicate state values: `absolutive` and `possessive`.
- Possessor prefixes from the current inventory: `nu`, `mu`, `i`, `tu`, `anmu`, and `in`.
- Fixture-backed ordinary possessive forms for `kal`, `shuchi`/`shuchit`, and `mistun`.
- Unsupported possessive diagnostics for fixtures without configured possessive forms, such as `tukayit`, `a`/`at`, `machiyut`, and `majmachiyut`.
- `categoryProfile.possessiveState` explaining whether possessive marking was requested and whether the requested marking is available.
- Opt-in Andrews 39.3.4 organic possession generation for open stems: the engine adds the Nawat `-yu` matrix in possessive state and rejects absolutive or missing-possessor requests as diagnostics.

What Lesson 15 still needs before pending status can be reduced:

- Lexical/state-case metadata for each confirmed noun.
- A data/schema distinction between ordinary optional possession, natural possession, required possession, possessive-only nouns, absolutive-unavailable nouns, and special state alternation cases.
- A clear record of whether absolutive state is allowed, blocked, or special for each candidate noun.
- A clear record of whether possessive state is required, optional, unavailable, or irregular for each candidate noun.
- Confirmed Nawat/Pipil examples before adding fixture-backed natural-possession rows or broader state-case generation.

Evidence boundary:

- `kal`, `shuchi`/`shuchit`, and `mistun` confirm ordinary possessive forms only. They do not currently prove natural, inalienable, or obligatory possession.
- `tukayit`, `a`/`at`, `machiyut`, and `majmachiyut` confirm only that unsupported possessive requests remain diagnostic under the current fixture data. They do not prove possessive-unavailable noun classes in the Lesson 15 sense.
- Open-stem examples must not be used as Lesson 15 evidence.
- Andrews 39.3.4 authorizes the organic-possession engine rule. Nawat/Pipil repo evidence or user-provided forms must still decide fixture cells, lexical exceptions, and spelling-specific alternations beyond the current `-yu` matrix.

Future implementation order:

1. Gather confirmed Nawat/Pipil examples.
2. Propose schema fields for possession/state-case metadata.
3. Add validation and focused tests.
4. Add engine metadata and diagnostics without guessing forms.
5. Add UI labels/gating only after metadata exists.

## Lesson 16 Pronominal NNC Evidence Boundary

Lesson 16 (`inventario NNC pronominal`) is pending and evidence-sensitive. It is not mapped into engine behavior yet.

Engine frame from Andrews PDF; Nawat orthography remains separate:

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

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

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

## Lessons 1-4 Foundation Boundary

Lessons 1-4 (`fundamentos`) are mostly architecture, notation, and clause-scope material. They are not ordinary generation targets by themselves.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 1 organizes linguistic terminology, notation, and hierarchy.
- Lesson 2 organizes pronunciation and orthography.
- Lesson 3 organizes particles and their placement behavior.
- Lesson 4 introduces nuclear clause formulas and layered clause structure.

Current project boundary:

- Lesson 1 is partially represented by `core/concepts` concept and notation registry metadata. A visible glossary UI and external `data/concepts` file do not exist yet.
- Lesson 2 is partially represented by modern Nawat phonology, syllabification, phonotactics, and parser support.
- The current repo now has an orthography bridge metadata layer and a letter-level Classical-to-Nawat conversion helper. The bridge classifies arbitrary Classical-looking inputs as evidence-sensitive; the conversion helper realizes Andrews grammar-rule spellings in Nawat/Pipil letters for engine contracts.
- Appendix F is partially represented by the same orthography layer. It is not a lexical old-spelling normalizer and does not create fixture-backed aliases.
- Lesson 3 is partially represented by `core/particles` particle-placement metadata. No confirmed particle inventory, visible particle mode, or particle-generation engine exists yet.
- Lesson 4 is partially represented by `core/clause` nuclear-clause shell metadata. VNC and NNC formula pieces exist in specific engines, but there is still no complete sentence syntax or formula data registry.
- Do not treat current VNC/NNC word-generation contracts as a complete clause engine.
- Do not import Andrews/Classical spelling or particle behavior as Nawat/Pipil forms without repo evidence or user-provided data.

Evidence boundary:

- `src/lessons/registry.js` marks Lessons 1-4 partially implemented.
- `src/ui/curriculum/curriculum.js` marks Lessons 1-4 partial in the curriculum map.
- `src/core/concepts/concepts.js` and `.mjs` expose diagnostic-only concept, notation, hierarchy, and boundary metadata for Lesson 1.
- `src/core/particles/particles.js` and `.mjs` expose diagnostic-only particle-placement frames and particle inventory boundary metadata for Lesson 3.
- `src/core/phonology/phonology.js` and `data/static_phonology.json` provide modern Nawat phonology and syllable support.
- `src/tests/phonology.test.js` proves digraph recognition, vowel/consonant classification, syllable parsing, and open-syllable helpers.
- `src/core/orthography/orthography.js` and `.mjs` expose orthography-profile metadata, diagnostic bridge metadata, and `convertClassicalLettersToNawat()` / `getClassicalLettersAsNawat()` for grammar-rule spelling conversion such as `z/liz -> s/lis`, `lo-hua -> lu-wa`, `hua-lo -> wa-lu`, `c-ti-ya -> k-ti-ya`, and `(xochi)-tl -> (shuchi)-t`.
- `src/appendices/registry.js` marks Appendix F partially implemented because that bridge exists, while `data/static_old_spellings` and a real old-spelling normalizer remain absent.
- `src/ui/state.js` can surface orthography bridge status in the calculator status area when an input looks Classical/older or lossy, without changing generation.
- `src/tests/orthography.test.js` proves that bridge correspondences remain non-generative, that lossy/morphology-sensitive arbitrary inputs stay blocked as evidence, and that grammar-rule spelling conversion can produce Nawat/Pipil-letter surfaces without becoming lexical fixture evidence.
- `src/core/clause/clause.js` and `.mjs` expose diagnostic-only VNC/NNC nuclear-clause shell metadata.
- `src/core/generation/engine.js` attaches `nuclearClauseShell` to generated VNC and nominal outputs as diagnostic metadata.
- `src/ui/state.js` includes the current clause shell label in the calculator summary, and `src/ui/rendering/rendering.js` appends the diagnostic clause-shell formula label to generated output row metadata. These are display metadata only and do not drive generation.
- No visible `ui/glossary`, `data/concepts`, confirmed `data/static_particles`, visible particle mode, or `data/static_formulae` implementation was found.

Future implementation order:

1. Add a visible glossary UI only after deciding how concept registry entries should appear beside formula/output metadata.
2. Keep modern Nawat phonology separate from Classical/older orthography.
3. Keep arbitrary orthography-bridge input diagnostic-only until confirmed Nawat/Pipil aliases or fixture data authorize a narrower behavior; Appendix F status must remain partial until old-spelling lexical data and normalization behavior exist.
4. Gather confirmed particle examples before adding particle inventory data, generation, or enabling the particle mode UI.
5. Extend the current clause shell only after deciding how VNC, NNC, sentence mood, negation, question, emphasis, and supplementation metadata should meet.

Candidate future schema questions, not implemented fields:

- `conceptId`
- `notationRole`
- `orthographyLayer`: modern Nawat, Classical, older text, or unknown.
- `particleInventory`
- `particlePlacement`
- `clauseFormula`
- `clauseLayer`

## Lessons 5-11 VNC Basic Boundary

Lessons 5-7 (`VNC basico`) have strong Nawat/Pipil motors. Lessons 8-11 have partial engine coverage, but Andrews' sentence-level and broader irregular categories are not fully mapped.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 5 organizes the intransitive VNC formula, subject pronouns, and tense morphs.
- Lesson 6 organizes the transitive VNC formula and object pronouns.
- Lesson 7 organizes verbstem classes and preterit behavior.
- Lesson 8 moves from VNC mechanics into basic sentence context.
- Lessons 9-10 organize optative/admonitive forms and sentence-level wish, command, exhortation, and admonition behavior.
- Lesson 11 organizes irregular VNC categories, suppletive paths, defective behavior, and tense-meaning caveats.

Current project boundary:

- Lessons 5-7 are implemented through agreement, VNC generation, preterit classes, and object-prefix handling.
- Diagnostic VNC `nuclearClauseShell.formulaSlots` now records subject, object, predicate, and tense slots; the rendered `Formula VNC: #...#` echo is derived display only and does not drive generation.
- Diagnostic VNC `vncValencyFrame` metadata now records whether the generated VNC is being explained as intransitive or transitive, the selected subject slot, the selected object slot, and the underlying object prefix before surface allomorphy. This is explanatory metadata only; it preserves generated surfaces such as `nikmaka` while showing the base object prefix `ki`.
- Diagnostic `verbstemClassProfile` metadata now travels with preterit class provenance and rendering can show `Clase de tronco: A/B/C/D`; this explains Lesson 7 class selection without changing generated surfaces.
- Lesson 8 is partial: VNC mechanics and opt-in diagnostic sentence-layer metadata exist, but negation, questions, emphasis, and sentence context are not a generation engine yet.
- Lessons 9-10 are partial: finite optative/admonitive forms and opt-in diagnostic sentence-mood slots exist, but sentence-level optative/admonitive constructions are not modeled.
- Lesson 11 is partial: the current Nawat suppletive subset is implemented, including `kati`, `yawi`, `witzi`, and `weya`; the full Andrews irregular taxonomy is broader than the current Nawat/Pipil evidence.
- Appendix A VNC paradigms and Appendix C object-pronoun combinations are implemented as engine/reference surfaces, but explanatory lesson UI remains separate.
- Do not import Classical irregular behavior directly into Nawat/Pipil.
- Do not treat finite mood forms as a sentence-level mood engine.

Evidence boundary:

- `src/lessons/registry.js` marks Lessons 5-7 implemented and Lessons 8-11 partially implemented.
- `reports/lesson_motor_inventory.md` identifies VNC generation, agreement/object, preterit class, and irregular/suppletive motors as active motor families.
- `src/tests/agreement.test.js`, `src/tests/combo_validation.test.js`, `src/tests/preterit.test.js`, `src/tests/vnc.test.js`, and `src/tests/irregulars.test.js` cover current VNC/agreement/preterit/irregular behavior.
- `src/tests/clause.test.js`, `src/tests/vnc.test.js`, and `src/tests/ui.test.js` cover diagnostic VNC formula-slot metadata and derived `Formula VNC` rendering without changing generated forms.
- `src/tests/vnc.test.js` and `src/tests/ui.test.js` cover diagnostic VNC valency-frame metadata and `Valencia VNC` / `Objeto VNC` rendering labels without changing generated forms.
- `src/tests/preterit.test.js` and `src/tests/ui.test.js` cover diagnostic verbstem-class metadata and rendering labels without changing preterit generation.
- `data/static_suppletives.json` and `data/static_suppletive_paths.json` configure current Nawat suppletive behavior.
- `src/ui/curriculum/curriculum.js` still marks explanatory/status rows for formula explanation, sentence context, mood-as-sentence behavior, and irregular taxonomy as partial.
- `src/core/sentence/sentence.js` and `.mjs` expose diagnostic-only sentence-layer slots for polarity, question, emphasis, and sentence mood; `executeGenerateWordRequest()` can attach them only by explicit override and rendering labels them as `Capa oracional`.
- `src/tests/sentence.test.js`, `src/tests/vnc.test.js`, and `src/tests/ui.test.js` cover opt-in sentence-layer metadata without changing VNC surfaces.
- No sentence generation, confirmed negation/question/emphasis particle inventory, or `core/clause/mood` implementation was found.

Future implementation order:

1. Keep Lessons 5-7 as implemented motors while improving explanation/UI only through explicit targets.
2. Keep `core/sentence` diagnostic-only until confirmed Nawat/Pipil sentence examples and particle evidence support narrower behavior.
3. Keep finite optative/admonitive output separate from sentence-level mood semantics.
4. Add irregular behavior only from Nawat/Pipil evidence and focused tests.
5. If adding richer explanatory paradigm UI for Appendices A/C, derive it from existing engine metadata rather than duplicating generation.

Candidate future schema questions, not implemented fields:

- richer VNC formula-slot UI controls
- `sentenceMood`
- `negationScope`
- `questionType`
- `emphasisMarker`
- `irregularCategory`
- `defectiveTenseContract`

## Lessons 20-27 Derived-Verb Boundary

Lessons 20-26 (`troncos derivados`) have implemented Nawat/Pipil motors in the current repo. Lesson 27 (`frecuentativo y reduplicacion`) now has diagnostic boundary metadata, but remains a separate non-generative derivation gap.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 20 organizes nonactive stem derivation and nonactive suffix families.
- Lesson 21 uses the nonactive stem in passive-voice VNCs.
- Lesson 22 uses the nonactive stem and impersonal-specific logic in impersonal VNCs.
- Lesson 23 organizes object slots, multiple valence positions, object order, and object compatibility.
- Lessons 24-25 organize first-type and second-type causative derivation, including destockal sources and source-subject-to-object transformations.
- Lesson 26 organizes applicative derivation, additional object roles, multiple-object transforms, and ambiguity diagnostics.
- Lesson 27 organizes frequentative derivation, including ordinary frequentatives, object-pronoun reduplication, destockal frequentatives, uncertain frequentative classes, and frequentative nonactive stems.

Current project boundary:

- Current nonactive/passive/impersonal behavior is engine behavior, not just documentation.
- Current causative/applicative behavior is engine behavior backed by derivational rules, source models, forward derivation runtime, and tests.
- Current object-slot and passive/impersonal behavior is handled through agreement, valency, object allomorphy, and generation support.
- Generated nonactive/passive/impersonal VNC rows can now carry diagnostic `derivedVoiceFrame` metadata. It records the derivation mode, passive/impersonal voice label, source-to-target valency, cleared object slot, and base object prefix before voice adjustment. This is display/explanation only and does not change generated surfaces.
- Generated causative/applicative VNC rows can now carry diagnostic `forwardDerivationFrame` metadata. It records the forward derivation type, lesson range, source-to-derived valency, selected derived stem, and candidate stem pool for current causative/applicative output. This is display/explanation only and does not add new derivation behavior.
- `core/derivation/frequentative` records frequentative boundary metadata and false-positive classifications only; it does not generate frequentative forms.
- Current reduplication utilities and data do not by themselves constitute a Lesson 27 frequentative derivation engine.
- Do not fold Lesson 27 into ordinary distributive reduplication, patientive/adjectival reduplication, preterit reduplication diagnostics, or generic surface reduplication helpers.
- Do not import Andrews/Classical frequentative forms into Nawat/Pipil data without repo evidence or user-provided forms.

Evidence boundary:

- `src/lessons/registry.js` marks Lessons 20-26 implemented and Lesson 27 partially implemented.
- `src/ui/curriculum/curriculum.js` no longer counts Lessons 20-26 as pending faltantes; the derived-verb group keeps only Lesson 27 as the pending curriculum row.
- `reports/lesson_motor_inventory.md` independently identifies Lessons 20-26 as implemented motors and Lesson 27 as a missing frequentative derivation motor.
- `data/static_derivational_rules.json` contains causative/applicative configuration and valence-position documentation, not frequentative configuration.
- `data/static_redup.json` contains generic reduplication prefix patterns only.
- No frequentative route profile or confirmed frequentative generation exists yet.
- Local `frequentative` mentions are roadmap/curriculum text only; they are not Nawat/Pipil fixture evidence.
- `data/exact_rules.json` preterit reduplication, ordinary NNC distributive reduplication, patientive/adjectival reduplication, and generic reduplication helpers are false positives for Lesson 27.
- Existing tests cover nonactive/source chains, passive/impersonal valency, forward causative/applicative stem pools, route smoke, and generic reduplication helpers.
- `src/tests/vnc.test.js` and `src/tests/ui.test.js` cover diagnostic `derivedVoiceFrame` metadata and `Voz derivada` / `Valencia derivada` rendering labels without changing generated forms.
- `src/tests/vnc.test.js` and `src/tests/ui.test.js` cover diagnostic `forwardDerivationFrame` metadata and `Derivacion VNC` / `Tronco derivado` rendering labels without changing generated causative/applicative forms.

Future implementation order:

1. Keep Lessons 20-26 implemented-motor status separate from Lesson 27.
2. If future 20-26 work appears, treat it as explanatory/status/UI refinement unless a test proves a concrete engine gap.
3. For Lesson 27, gather confirmed Nawat/Pipil frequentative examples before adding data, generation, or visible UI.
4. Keep the current frequentative boundary metadata non-generative until a fixture-backed contract and validation rules exist.
5. Add focused tests before any Lesson 27 engine behavior.
6. Add UI controls or labels only after engine metadata exists.

Candidate future Lesson 27 schema questions, not implemented fields:

- `sourceStem`
- `frequentativeType`: ordinary, object-pronoun-reduplicating, destockal, uncertain, nonactive, or unknown.
- `reduplicationTarget`: stem, object pronoun, source prefix, or unknown.
- `sourceVoice`: active, nonactive, passive, impersonal, or unknown.
- `sourceDerivation`: direct, causative, applicative, destockal, or unknown.
- `resultStem`
- `classMembership`
- `evidenceRefs`

## Lessons 28-34 Compound-Stem Boundary

Lessons 28 and 30 (`compuestos`) have partial Nawat/Pipil support through parser/composer metadata and unchanged VNC generation for accepted compound inputs. Lesson 29 has diagnostic purposive/directional boundary metadata only. Lessons 31-32 have diagnostic compound/affective NNC boundary metadata only. Lesson 33 has diagnostic honorific/pejorative VNC boundary metadata only. Lesson 34 and Appendix D have diagnostic numeral-NNC boundary metadata only.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 28 organizes compound verbstems with verbal embeds, including matrix stem versus embedded stem roles.
- Lesson 29 organizes purposive VNC structures and directional/purpose relationships.
- Lesson 30 organizes compound verbstems with nominal embeds.
- Lesson 31 organizes compound nounstems and NNC-level compounds.
- Lesson 32 organizes affective NNCs.
- Lesson 33 organizes honorific and pejorative VNCs.
- Lesson 34 and Appendix D organize cardinal-numeral NNCs and number systems.

Current project boundary:

- Current `compoundAst` metadata is parser metadata. It is not a complete compound generator and not a full semantic compound grammar.
- Generated VNC rows for accepted compound inputs can now carry diagnostic `compoundFrame` metadata derived from `compoundAst`. It records matrix stem, embedded pieces, source input, flags, and parser valency while preserving the existing generated surface.
- Current compound generation tests prove existing accepted inputs still produce the same VNC surfaces; they do not prove all Lessons 28/30 compound VNC behavior.
- Current ordinary NNC fixture classifications can attach to outer lexical embeds, but that does not implement compound NNCs, affective NNCs, or numeral NNCs.
- Current Lesson 29 purposive/directional metadata distinguishes directional-prefix mechanics from confirmed purposive VNC generation. It does not add forms and does not change existing directional output.
- Current Lessons 31-32 compound/affective NNC metadata distinguishes VNC `compoundAst`, outer lexical embeds, ordinary NNC fixtures, and parser punctuation from confirmed compound nounstem or affective NNC evidence. It does not add forms and does not change ordinary NNC or VNC generation.
- Current Lesson 33 honorific/pejorative metadata distinguishes ordinary VNC derivation, person labels, and translation tone from confirmed honorific or pejorative VNC evidence. It does not add forms and does not change VNC generation.
- Current Lesson 34/Appendix D numeral metadata distinguishes ordinary NNC open-stem output, ordinary NNC fixtures, UI number labels, and Appendix D headings from confirmed numeral-NNC or number-lexeme evidence. It does not add forms and does not change ordinary NNC generation.
- Do not force Lessons 31-34 into ordinary NNC `formulaSlots`.
- Do not treat parser punctuation, slash/dash compound syntax, UI composer embeds, or Appendix D labels as Nawat/Pipil fixture evidence.
- Do not import Andrews/Classical compound, purposive, affective, honorific, pejorative, or numeral examples as Nawat/Pipil forms.

Evidence boundary:

- `src/lessons/registry.js` marks Lessons 28-34 partially implemented.
- `src/appendices/registry.js` marks Appendix D partially implemented.
- `src/ui/curriculum/curriculum.js` marks `28,30 · constructor compuesto general`, `29 · VNC purposivo direccional`, `31-32 · NNC compuesto y afectivo`, `33 · honorifico/peyorativo`, and `34,D · numerales vigesimales y NNC` partial.
- `src/core/parsing/parsing.js` builds `compoundAst` metadata with matrix, embeds, valency, source, and flag fields.
- `src/core/vnc/purposive/purposive.js` exposes non-generative purposive/directional boundary metadata, known directional prefixes, structural questions, and false-positive classifications.
- `src/core/nnc/compound/compound.js` exposes non-generative compound/affective NNC boundary metadata, structural questions, and false-positive classifications.
- `src/core/vnc/honorific_pejorative/honorific_pejorative.js` exposes non-generative honorific/pejorative VNC boundary metadata, structural questions, and false-positive classifications.
- `src/core/nnc/numerals/numerals.js` exposes non-generative numeral-NNC boundary metadata, structural questions, and false-positive classifications.
- `src/tests/parsing.test.js` proves `compoundAst` for examples such as `ta+(nemi)`, `(shuchi)-(kwi)`, `(a)+ta-(ish-kwi)`, and malformed compound-like input.
- `src/tests/vnc.test.js` and `src/tests/ui.test.js` prove generated compound rows expose diagnostic `compoundFrame` metadata and `Compuesto VNC` / `Incrustado` rendering labels without changing generated forms.
- `src/tests/purposive.test.js` proves directional prefix recognition remains unconfirmed purposive evidence and that bracketed parser syntax is not purposive fixture evidence.
- `src/tests/nnc_compound.test.js` proves outer lexical VNC compounds and ordinary NNC fixtures remain unconfirmed compound/affective NNC evidence.
- `src/tests/honorific_pejorative.test.js` proves translation tone and ordinary causative/applicative derivation remain unconfirmed honorific/pejorative evidence.
- `src/tests/nnc_numerals.test.js` proves UI number labels, Appendix D headings, and ordinary NNC open stems remain unconfirmed numeral-NNC evidence.
- Existing parser tests prove generated surfaces remain unchanged for selected compound inputs, including `nitanemi`, `niatakwi`, `nishuchikwi`, `nishkwi`, and `niataishkwi`.
- No purposive generation, compound-NNC generation, affective-NNC generation, honorific/pejorative generation, numeral-NNC generation, `data/static_affective_nnc`, or `data/static_numbers` implementation was found.

Future implementation order:

1. Keep current `compoundAst` as additive parser metadata unless a future target explicitly broadens compound generation.
2. Add category-first metadata/status tests with curriculum references for current Lesson 28/30 compound parser support before adding new compound behavior.
3. Keep `core/vnc/purposive` as non-generative boundary metadata until confirmed Nawat/Pipil purposive examples justify data, schema, generation, or UI.
4. Keep `core/nnc/compound` as non-generative boundary metadata until confirmed Nawat/Pipil compound-NNC or affective examples justify data, schema, generation, or UI.
5. Keep `core/vnc/honorific_pejorative` as non-generative boundary metadata until confirmed Nawat/Pipil honorific/pejorative examples justify data, schema, generation, or UI.
6. Keep `core/nnc/numerals` as non-generative boundary metadata until confirmed Nawat/Pipil numeral-NNC or number-lexeme examples justify data, schema, generation, or UI.
7. Reduce pending counts only after evidence-backed implementation and tests.

Candidate future schema questions, not implemented fields:

- `compoundKind`: verbal-embed, nominal-embed, NNC-compound, affective, honorific, pejorative, numeral, or unknown.
- `matrixStem`
- `embeddedStem`
- `embedRole`: verbal, nominal, lexical, valence, adjacent-core, purposive, numeral, or unknown.
- `purposeRelation`
- `affectiveValue`
- `honorificPolarity`
- `numeralBase`
- `compoundSourceRefs`

## Lessons 35-43 Nominal Formation Boundary

Lessons 35-41 (`formacion nominal`) are partially represented by current Nawat/Pipil motors. Lessons 42-43 (`modificacion adjetival`) now have a non-generative structural AST builder for composing existing generated head/modifier clause outputs without creating new Nawat word forms.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 35 organizes VNC-to-NNC nominalization, preterit-agentive structures, restricted versus general-use nominal stems, ownerhood, and nominalized stems as compound embeds.
- Lesson 36 organizes additional nominalized VNC outputs: agentive, patientive, instrumentive, present/future agentive, and action/result nominalizations.
- Lesson 37 distinguishes deverbal nounstems from simple VNC reanalysis and introduces active-action, potential-patient, and passive-patientive categories. Lesson 37.9 specifically frames the passive patientive source as a passive VNC core.
- Lessons 38-39 continue the patientive nounstem taxonomy: impersonal VNC core, perfective active core, imperfective active core, root/stock, and later compound/embed/complement/object uses. The five source families are passive core, impersonal core, perfective active core, imperfective active core, and root/stock.
- Lessons 40-41 treat adjective as syntactic function. NNCs and VNCs may function adjectivally, but that does not make `adjetivo` a single formal nounstem class. Andrews 40.1 now reaches engine behavior through an explicit adjectival-NNC function route: it generates from an absolutive ordinary NNC source and does not build a modifier/head AST. Andrews 40.3 now has an opt-in VNC adjectival-function route: it preserves a generated VNC surface from `#3 salida`, keeps the verbal nuclear-clause shell, and does not create an ordinary NNC nounstem or modifier/head AST. Andrews 40.4 now reaches engine behavior from generated patientive noun outputs and potential-patient outputs: a patientive or potential-patient NNC surface produced in `#3 salida` can be re-routed as an absolutive adjectival-function NNC without changing the Nawat surface or inventing a modifier/head AST. Andrews 40.5-40.8 now reach generated-output behavior for the implemented subset: generated customary-present agentive NNCs can re-route as Andrews 40.6 adjectival-function NNCs, generated customary-present patientive NNCs can re-route as Andrews 40.7 adjectival-function NNCs, and generated preterit-agentive NNCs can re-route as Andrews 40.8 adjectival-function NNCs. These routes preserve the generated Nawat surface and remain diagnostic for unmapped nominalized-VNC kinds such as future-agentive output. Andrews 40.9 also reaches engine behavior through root-plus-`ya` adjectival NNC generation: recognized Nawat root-plus-`ya` inputs generate the obsolete-preterit/root surface with Nawat `k` spelling (`(istaya)` -> `istak`, `kukuya` -> `kukuk`, `seseya` -> `sesek`, `kwaistaya` -> `kwaistak`) and keep the `k` in the NNC `num1-num2` connector slot (`#Ø...Ø(ista)k#`). Andrews 40.9 denominal `ti-ya` is engine-active for unsegmented and segmented Nawat inputs (`itztiya` -> `itztik`, `yektiya` -> `yektik`, `chichiktiya` -> `chichiktik`, `(e/tiya)` -> `etik`, `(kwal/tiya)` -> `kwaltik`) using Nawat orthography. Andrews 40.10-40.11 now reaches the same generator as source-pattern metadata: `k-ti-ya/c-ti-ya` sources are marked as synonymous-pair sources and `z-ti-ya` sources as synonymous-triplet sources, while the engine still generates only the requested Nawat source output and does not invent sibling synonyms. Andrews 41.1 now has an opt-in intensified-adjectival route: it requires a generated adjectival NNC formula from `#3 salida`, reduplicates the predicate stem in Nawat orthography, keeps `num1-num2` outside the stem, and records that this is adjectival intensification rather than Lesson 27 frequentative derivation. Andrews 41.2 now reaches executable generated-row behavior for compound-source adjectival outputs: parsed compound roles are exposed in `compoundFrame` and `adjectivalCompoundSourceFrame`, and a generated compound-source `adjetivo-preterito` row can be re-routed as an explicit `compound-source-adjectival` function contract while preserving the generated Nawat surface and creating no modifier/head AST. Andrews 41.3 now reaches executable generated-row behavior for segmented denominal `tiya` sources that expose a compound nounstem source: the generated preterit-agentive Nawat surface (for example a user-entered `(xilo/tzon/tiya)` route yielding `xilotzontik`) can be re-routed as an explicit `denominal-compound-adjectival` function contract only when the compound nounstem source frame is present. The ordinary `adjetivo-preterito` route now uses this Andrews 40.9 surface for recognized root-plus-`ya` and denominal `tiya` inputs instead of exposing the full finite preterit alternation set as the adjectival output.
- Lessons 42-43 organize adjectival modification as a relationship between clauses or nuclei, including modifier/head order, preposing, marking, recursion, ambiguity with supplementation, and discontinuity. The current `modificationAst` builder records those relationships from existing generated surfaces: unmarked head+modifier, preposed modifier+head, marked preposed adjoined-unit structure, shared-referent link role, and supplementation-ambiguity diagnostics.

Current project boundary:

- Current `sustantivo` outputs are real generated Nawat surfaces, but they do not prove complete coverage of Lessons 35-39.
- Current `adjetivo` outputs are real generated Nawat surfaces, but they do not prove a full adjectival-function or modification model for Lessons 40-43.
- Current generated nominal and adjectival outputs now expose derived `nominalizationProfile` metadata for output kind, source VNC tense, semantic role, patientive family, adjectival function, predicate state, subject connector, and future-boundary flags. Generated NNC formula echoes use the generated output predicate stem in `#3 salida`, not the raw source route text; the current `agentivo` profile is specifically `customary-present-agentive`, not a generic agentive bucket, while the opt-in `agentivo-presente`, `agentivo-preterito`, and `agentivo-futuro` routes are separately marked as `present-agentive`, `preterit-agentive`, and `future-agentive`.
- `src/core/nnc/nominalization/nominalization.js` exposes Lessons 35-39 boundary metadata, structural questions, anti-conflation rules, and false-positive classifications for generated nominal surfaces, ownerhood, complete `z/liz` fixture coverage, and patientive-family claims.
- `src/core/nnc/adjectival/adjectival.js` exposes narrow opt-in Lessons 40-41 adjectival function generators. The Andrews 40.1 route reuses ordinary NNC generation and enforces the absolutive-state constraint. The Andrews 40.3 route reuses a generated VNC surface from `#3 salida`, preserves the surface, records `vnc-adjectival` function metadata, and keeps the VNC shell instead of forcing the output into ordinary NNC `formulaSlots`. The Andrews 40.4 route reuses a generated patientive noun surface from `#3 salida`, preserves that surface, records `patientive-adjectival` function metadata, and rejects missing or possessive-state surfaces. The Andrews 40.5-40.8 route reuses generated nominalized-VNC NNC surfaces for the currently mapped subset: `potential-patient` maps to Andrews 40.4.2, `customary-present-agentive` maps to Andrews 40.6, `customary-present-patientive` maps to Andrews 40.7, and `preterit-agentive` maps to Andrews 40.8; unsupported nominalized-VNC kinds stay diagnostic instead of being relabeled as adjectives. The Andrews 40.9 route generates root-plus-`ya` obsolete-preterit adjectival surfaces from parsed root-plus-`ya` source metadata, accepts denominal `tiya` sources including segmented `(.../tiya)` inputs by deriving the NNC base from the full Nawat source, and rejects the `weya`/`hue-i-ya` exception path instead of falling through to a regular route. Its `sourceFormationFrame` records Andrews 40.10 `c-ti-ya` synonymous-pair and Andrews 40.11 `z-ti-ya` synonymous-triplet patterns in Nawat/Pipil orthography (`k-ti-ya`/`z-ti-ya`) but keeps `outputContract: "generate-current-source-only"` until confirmed Nawat synonym data is available. The Andrews 41.1 route derives intensified adjectival NNC output only from generated NNC `formulaSlots`; for example generated `#Ø...Ø(yekti)k#` can continue to `#Ø...Ø(yejyekti)k#`, while requests without formula slots remain diagnostic. Andrews 41.2 compound-source `adjetivo` outputs carry `adjectivalCompoundSourceFrame` metadata from the parsed compound source and generated NNC formula echo, and the explicit `compound-source-adjectival` route requires both a generated surface and that parsed compound source frame before it preserves the surface as an adjectival-function NNC. Andrews 41.3 denominal-compound outputs carry `denominalCompoundSourceFrame` metadata from segmented compound nounstem `(.../.../tiya)` input, and the explicit `denominal-compound-adjectival` route requires both a generated preterit-agentive NNC surface and that compound nounstem source frame before it preserves the surface as an adjectival-function NNC. Current `adjetivo` route surfaces and `nominalizationProfile.adjectivalFunction` labels remain generated output/metadata only, not a complete modifier/head engine.
- The profile records `categoryTransition: VNC -> NNC` with `process: "structural-nominalization"` so the category shift is explicit without creating a lesson-specific engine.
- The generated-output profile marks `boundaries.nominalizationScope = "structural-word-output"` and `isFunctionalSupplementation = false`: current motors model structural word output, not sentence-level functional nominalization or supplementation.
- Rendering may show this as `Ambito: estructural`; that label is derived display, not a generation rule.
- Patientive outputs now derive `patientiveFamilyProfile` from the existing `patientivoSource` branch. This records the current source-family boundary for `nonactive`, `perfectivo`, `imperfectivo`, and `tronco-verbal` under the Andrews Lessons 37.9-39 engine taxonomy.
- The current `nonactive` branch remains available as legacy/shared route metadata, but explicit `passive` and `impersonal` patientivo source requests now preserve Andrews' separate source-core categories in `patientiveFamilyProfile`.
- Explicit `passive` and `impersonal` patientivo requests currently realize through the same Nawat nonactive derivation builder. That is a shared builder boundary, not a collapse of the Andrews grammar categories.
- Andrews 37.9, 37.9.2, and 37.9.3 are now enforced as generation behavior: an explicit `passive` patientivo request is rejected when the ultimate source is intransitive. For single-object transitive sources, explicit passive patientivo clears nonspecific `ta`/`te` from the generated nounstem while mapping source reflexive `mu` to shuntline `ne` when the passive source is reflexive. For double-projective sources, the generated nounstem keeps exactly one selected Nawat projective (`ta` or `te`) and drops the other projective marker; when selected `te` is present, it also offers the Andrews 37.9.3 deleted-`te` nounstem variant. This matches Andrews' "only one object pronoun" passive-patientive rule without forcing every double-projective source to `ta`.
- Andrews 38.1, 38.1.2, 38.1.3, and 38.1.4 are also enforced: an explicit `impersonal` patientivo request may use an intransitive source; a reflexive source maps source `mu` to shuntline `ne`; a transitive `ta` source keeps the `ta` pattern; a single-object mainline `te` source maps to the impersonal `ta` pattern instead of generating a human-object `te` patientive nounstem, while a double-projective `te+ta` source preserves `te+ta` because shuntline `ta` already marks the nonhuman patient.
- Andrews 39.4 root/stock patientivo generation now uses `patientive-root-stock-source-contract` in `#3 salida`. The contract records the root-or-stock source core, Andrews tli-class target, Nawat `t/ti` connector family, and Classical variant consonants `c/x/z/ch` realized through the Nawat orthography bridge as `k/sh/s/ch`. It also records that exact variant selection is not fully recoverable from surface grammar; no new fixture evidence or extra surfaces are created.
- Andrews 39.5 multiple patientive derivation now reaches generated `#3 salida` metadata through `patientive-multiple-derivation-contract`. The contract probes the current input across the implemented patientive procedures (`passive`, `impersonal`, `perfectivo`, `imperfectivo`, and `tronco-verbal`), records which procedures are available, and keeps synonymy/translation value diagnostic. It does not merge outputs, add forms, or treat Classical examples as Nawat fixtures.
- Andrews 39.1-39.2 are enforced for the currently implemented perfective/imperfective patientive branches: perfective patientive generation now requires an Andrews-allowed perfective active core ending in Nawat orthography (`w`, `k`, `kw`, `s`, `sh`, `n`, `j/h`, `l`, `tz/ts`, with legacy `c/qu/x/z` tolerated as equivalent analysis spellings). Invalid perfective-core endings such as `t` or `ch` are rejected instead of silently generating patientive nouns. When a single-object `te` source is generated through the impersonal-like patientive path, the output uses the Nawat `ta` pattern (`taketzti`, `tamatiyat`) instead of retaining `te` (`teketzti`, `tematiyat`). Possessive-state patientive output treats consonant-final `(...C)ti` as a tli-class connector and drops that connector in the possessed nounstem (`taketzti` -> `nutaketz`) rather than requiring a route label or a manual zero-ownership override.
- Andrews 39.3 characteristic-property output is enforced in the current `calificativo-instrumentivo` motor as Nawat `-yu-t` in absolutive state and `-yu` in possessive state. The possessed output keeps the characteristic-property matrix and drops only the absolutive `t` connector (`mikkayut` -> `numikkayu`), instead of collapsing the nounstem to the bare predicate core (`numikka`).
- Andrews 39.3.4 organic/integral possession now reaches ordinary NNC generation as an explicit opt-in open-stem contract: `possessionKind: "organic"` requires possessive predicate state and a possessor, adds the Nawat `-yu` matrix to the source nounstem, and generates a real possessive NNC surface (`naka` + `nu` -> `nunakayu`). Absolutive organic-possession requests and missing-possessor requests remain diagnostic because the organic-part relation is expressed through possessive state.
- Andrews 39.1 perfective patientive generation is now gated by a `patientive-perfective-source-ending-contract` rather than an unstructured suffix set. The contract reads the Andrews-allowed perfective active core endings (`w`, `k`, `kw`, `s/z`, `x`, `n`, glottal, `l`, `tz`) and realizes rule spelling through the orthography bridge for Nawat output (`x -> sh`, `c/qu -> k`, `cu/uc -> kw`, `z -> s`) without treating the conversion as lexical evidence. Generated perfective patientivo rows carry that source-ending contract in `patientiveSourceStageFrame` from `#3 salida`; disallowed endings such as `t` or `ch` remain blocked.
- Andrews 39.2 imperfective patientive generation now has a `patientive-imperfective-source-stem-contract` for the current engine route. The contract records the imperfective active core source, the Andrews ti-class target, the Nawat `t/ti` connector family, and the generated output stem/connector used by `#3 salida`. The connector is not a free UI label: generation asks this contract for the current output connector, so vowel-final Nawat output stems surface with `t` while consonant-final diagnostic stems surface with `ti`; current generated surfaces such as `tamatiyat` are preserved.
- Andrews 39.4 is enforced for root/stock patientive output: the branch may still expose multiple stock consonant variants where Andrews says the choice is no longer recoverable from surface grammar, but generated noun output is restricted to the Nawat tli-class connector (`(...V)t`, `(...C)ti`). Bare stock stems remain available only when explicitly requested as route-composition stems, and `#3 salida` rejects explicit zero/`in` class spillover for root/stock patientives instead of advertising it.
- Andrews 41.2.3 now governs compound-source patientive output metadata: when a generated patientivo row comes from a parsed compound verbstem, the row exposes `patientiveCompoundSourceFrame` with the underlying compound matrix/embed and the selected patientive family. This preserves source evidence for cases where passive and impersonal patientive outputs can share the same Nawat surface, and it does not add new surfaces or infer full compound semantics from the output alone.
- Andrews' nonactive-source suffix contract is enforced in generation with Nawat orthography: Classical `lo`, `lo-hua`, `o`, `o-hua`, and `hua-lo` source families map to Nawat nonactive `lu`, `luwa`, `u`, `uwa`, and `walu` patientive outputs that are locked to the generated tli-class connector (`(...V)t` or `(...C)ti`). They no longer spill into unrequested zero or `in` nominal outputs. Classical `hua` maps to Nawat `wa` and remains locked to the generated `t` connector on the resulting vowel-final stem. The nonactive patientive stem builder now reads the Andrews-backed `deletedSegment`/`retainedSegment` contract when deriving the output stem, so `lu`, `luwa`, `u`, `uwa`, `wa`, and `walu` do not have a separate hardcoded deletion table. The selected generated patientivo row carries a `patientiveSourceStageFrame` from `#3 salida`, so the engine records the actual source suffix, Andrews deletion operation, Nawat output prefix/stem/connector, and Classical-to-Nawat rule-letter conversion that produced the row without treating that conversion as fixture evidence.
- Andrews 36.10-36.11 now governs the current `calificativo-instrumentivo` path when it is explicitly generated from a nonactive source: the branch uses the Nawat nonactive distant-past core before adding the characteristic-property matrix (`ta-(mati)` nonactive -> `machukayut/matukayut/matilukayut`) instead of silently reusing the active distant-past source (`tamatkayut/tamatikayut`). The possessive-state general-use branch is engine-routed with `actionNounStemUse: "general-use"` and keeps the distant-past `-ka` stem without the restricted `-yu` matrix: active-action examples such as `(miki)` generate `numikka`, and passive-action examples such as `ta-(mati)` nonactive generate `numachuka/numatuka/numatiluka`. When no possessor is supplied on that explicit general-use path, the source VNC subject now transforms into the Nawat possessor (`ni` -> `nu`, `ti` -> `mu`, `Ø` -> `i`, `ti...t` -> `tu`, `an...t` -> `anmu`, `Ø...t` -> `in`), so source-subject requests can generate outputs such as `tumikka` and `tumachuka/tumatuka/tumatiluka` instead of being blocked as if the source subject were the NNC subject connector; the same general-use continuation is exposed dynamically in `#3 salida` rows rather than as a separate route rail. Andrews 36.12 is encoded as `nominalizationProfile.possessorSourceFrame`: active/passive action nouns mark the possessor as transformed from the source VNC subject, while preterit-agentive possessive nouns mark the possessor as an external import and keep the source/NNC subject in the subject slot. Active-action general-use output is limited to intransitive or reflexive sources; non-reflexive transitive active sources are rejected, while reflexive active sources map mainline `mu` to shuntline `ne` inside the nounstem (`-(cuepa)` + `mu` -> `nunecuepka`). Root-plus-`ya` active-action sources use the obsolete/root distant-past base for both restricted and general-use stems (`(istaya)` -> `istakayut`, `nuistakayu`, `nuistaka`) instead of leaking regular `ya` variants such as `istayaka`. Without the explicit general-use option, non-root-plus-`ya` defaults remain the characteristic/restricted `-kayut/-kayu` output.
- Andrews 37.2-37.4 active-action `z/liz` now reaches the current Nawat `sustantivo-verbal` motor through `getActiveActionNominalizerContract()`, which converts Classical rule suffixes `z/liz` to Nawat `s/lis` before generation. Generated action nouns derive from the future core, configured replacive imperfective stems now route through Nawat `s/lis` output (`chuka` -> `chukilis`, `nesi` -> `neshilis`, `ta-(ajsi)` -> `taajshilis`, `ta-(teomati)` -> `tateomatilis/tateomachilis/tateomatis`), configured root-plus-`ya` stems such as Nawat `istaya` delete `ya` before `-lis` (`istalis`, not `istayalis`), root-plus-`wiya` stems may still keep the documented stem alternate, root-plus-`ya` alternates otherwise keep a visible active-action nominalizer instead of leaking bare VNC stems, the short `-s` subtype is restricted to `i`-final stems unless the configured replacive-stem rule is `-lis`-only, and active-action output is common-number only. Transitive active-action nounstems keep a projective object (`ta`/`te`); reflexive active-action sources map mainline `mu` to shuntline `ne`; source-supportive initial `i` drops after `ta` (`ta-(ilnamiqui)` -> `talnamiquilis/talnamiquis`); and after `ne` a source in `ih...` keeps both Andrews-allowed Nawat variants (`neihmatilis/neihmatis` and `nehmatilis/nehmatis`). The generated `-s/-lis` material is predicate nominalizer material, not the NNC subject-number connector; the generated NNC shell keeps `num1-num2` as `Ø`.
- Andrews 36.2-36.3 now governs the current `agentivo` connector contract: the customary-present `ni` is part of the agentive predicate stem (`nemi` -> `nemini`), not the NNC subject-number connector. Plural and possessive-plural agentive output keeps the same Nawat surface but exposes the connector as `met` or `wan` rather than `nimet`/`niwan`. The fully nominalized §36.3 stem can now continue from `#3 salida` into the first Nawat data-backed nominal compound matrix (`nemini` + `kal` -> `(neminikal)` -> `neminikal`) as an open-stem ordinary NNC continuation, and into the first Nawat data-backed verbal matrix (`nemini` + `tuka` -> `-(nemini/tuka)` -> `kineminituka`) with a real outside object slot. These continuations are generated actions, not new fixture evidence.
- Andrews 36.7 now has an opt-in `agentivo-presente` generation contract: the generated present-indicative predicate becomes the NNC predicate stem (`nemi` -> `nemi`, `ta-(mati)` -> `tamati`), the output remains absolutive-state only, and plural probes expose the present source number connector (`t`) as `num1-num2` instead of reusing the customary-present `met/wan` agentive connector.
- Andrews 35.3/35.5-35.12 now has an opt-in `agentivo-preterito` generation contract: restricted-use absolutive output reanalyzes the generated Nawat preterit predicate as the NNC stem and exposes the preterit subject-number material as `ki/k/ket`, while possessive-state probes use the general-use Nawat `-ka` matrix with `w/wan` connectors. Andrews 36.12 keeps this possessive preterit-agentive path separate from possessive active/passive action nouns: the preterit-agentive possessor is external, not transformed from the source subject, so examples such as `ni` + `nu` + `(miki)` produce `ninumikikaw` with `#ni...Ø(mikika)w#`. Source reflexive `mu` maps to shuntline `ne` only in the general-use possessive path. The generated `#3 salida` row can now continue the preterit-agentive general-use stem into actual compound inputs with Nawat data-backed matrices: verbal compound embeds such as `(tamatka/tzajtzi)`, ordinary NNC nominal compounds such as `(tamatkakal)`, Andrews 35.9-35.10 ownerhood VNC matrices using Nawat orthography (`(tamatka)-(wa)` -> `tamatkawajka`; `(tamatka)-(yua)` -> `tamatkayujka`), Andrews 35.12 incorporated-complement VNC matrices with a real outside object slot (`(tamatka/mati)` -> `kitamatkamati`; `(tamatka/talia)` -> `kitamatkatalia`), and the first Andrews 35.12 adverbial-manner VNC matrix (`(tamatka/nemi)` -> `tamatkanemi`). Ordinary NNC output rows can also continue generated nounstems into the first Andrews 35.9-35.10 ownerhood VNC matrices: `t` class defaults to Nawat `e/ej` (`shuchit` -> `(shuchi)-(e)` -> `shuchiejka`), `zero/in` default to `wa/waj` (`kal` -> `(kal)-(wa)` -> `kalwajka`), abundant ownerhood uses `yua/yuj` (`shuchit` -> `(shuchi)-(yua)` -> `shuchiyujka`), and `ti` ownerhood remains diagnostic without confirmed subclass evidence. These continuations use the generated output stem, not static route text.
- Andrews 36.8 now has an opt-in `agentivo-futuro` generation contract: restricted-use output keeps the Nawat future `s` inside the predicate stem and converts the future subject-number material into NNC connectors (`nemis` + `ki` -> `nemiski`, plural `nemis` + `ket` -> `tinemisket`). Possessive-state probes use the general-use `-ka` matrix with Nawat possessive connectors (`ta-(mati)` + `nu` -> `nutamatiskaw`) instead of falling through to the finite future form.
- Andrews 37.5.2 now reaches the current Nawat `potencial` motor as a potential-patient noun contract: `z/liz` maps to Nawat `s/lis`, transitive projective object pronouns are stripped from generated potential-patient nounstems even during generation probes (`ta-(mati)` -> `matilis/matis`, not `tamatilis/tamatis`), possessive state remains available on the potential-patient noun (`nu` + `ta-(mati)` -> `numatilis/numatis`), and unlike active-action NNCs the generated form may combine with ordinary subject-person prefixes such as `ni-`. Active-action `sustantivo-verbal` still keeps its object pronoun when the requested action source is transitive.
- Andrews 37.5.2's double-object reflexive exception is also enforced as active-action generation rather than potential-patient generation: when the source is reflexive plus a projective object (`mu` + `ta/te` in current Nawat controls), `sustantivo-verbal` maps mainline `mu` to shuntline `ne` and drops the projective object (`mu+ta-(mati)` -> `nematilis/nematis`), while keeping the nominalization kind as active action.
- Andrews 37.5.3 now reaches the current Nawat `sustantivo-verbal` motor as an impersonal-action noun contract: when the request explicitly asks for the nonactive/passive-impersonal source, `sustantivo-verbal` derives from the generated Nawat nonactive core and uses the `-lis` action nominalizer only (`ta-(mati)` nonactive -> `machulis/matulis/matilulis`). It does not fall back to the active-action future-core path (`tamatilis/tamatis`) and does not add the active-action short `-s` subtype.
- Andrews 36.5 now governs the current `potencial-habitual` patientive NNC route: the generated surface is a NNC reanalysis of the nonactive customary-present core, single projective `ta/te` sources do not keep a projective object in the nounstem, double-projective sources keep exactly the selected projective as predicate-stem material (`ta+te` -> `tamachuni/tamatuni/tamatiluni`; `te+ta` -> `temachuni/tematuni/tematiluni`), source reflexive `mu` maps to shuntline `ne` (`ti` + `mu` + `-(mati)` -> `tinemachuni/tinematuni/tinematiluni`), and possessive-state probes remain absolutive instead of generating `nu-` forms.
- Andrews 36.6 now governs the current `instrumentivo` route: absolutive instrumentives use the generated customary-present impersonal/nonactive source and possessive instrumentives use the imperfect active source; the source tense material `ni`/`ya` is part of the instrumentive predicate stem, not the NNC subject-number connector, so the generated connector remains `Ø`. In the possessive-state route, the source VNC subject can transform into the Nawat possessor when an explicit instrumentive possessive mode is requested (`ni` -> `nu`, `ti` -> `mu`, `Ø` -> `i`, `ti...t` -> `tu`, `an...t` -> `anmu`, `Ø...t` -> `in`). The Sustantivo output rows expose that transformation dynamically in `#3 salida` as row-level generated possessive continuations, not as a separate route rail or label-only note. Source reflexive `mu` maps to shuntline `ne` in both states (`mu` + `-(mati)` -> `nemachuni/nematuni/nematiluni`; `nu` + `mu` + `-(mati)` -> `nunematiya`), while non-reflexive projective `ta` remains in the source nounstem (`nutamatiya`).
- Route specs keep `passive` and `impersonal` on the nonactive-core route instead of resolving them as active imperfective sources. Dynamic patientive V->S surface routes ask `#3 salida` for the generated patientive noun instead of reconstructing the noun from route text plus a static suffix; this preserves generated behavior such as active imperfective `te` sources mapping to the `ta` patientive pattern. Row rendering no longer has route-surface or direct suffix-replacement patientive fallbacks, so rejected or unsupported patientive suffix requests remain engine diagnostics instead of being repaired by UI route text.
- Andrews 39.6 now has engine contracts for patientive nounstems as compound embeds. `buildPatientivoCompoundEmbedContinuationContract()` strips the generated patientive connector from the `#3 salida` noun surface, uses only Nawat data-backed verbal matrix roots, and builds a real compound VNC input. The first supported verbal matrix is Nawat `miki` for Classical `(miqui)`, producing inputs such as `(tamatiya/miki)` and generated finite output `tamatiyamiki`; unsupported verbal matrices remain diagnostic. `buildPatientivoNominalCompoundContinuationContract()` does the same for nominal-matrix compounds through the current ordinary NNC generator. The first supported nominal matrix is Nawat `kal` for Classical `(cal)-li`, producing an ordinary NNC input such as `(tamatiyakal)` and output `tamatiyakal` as an open-stem compound, not as new fixture evidence. Both 39.6 continuations expose `formationFrame` metadata that separates generated patientive embed, data-backed matrix, output input, and evidence policy; this is engine provenance, not a label-only row and not new Nawat lexical data.
- Andrews 39.7-39.8 are enforced as an engine contract for the current pre-locative/incorporated-root destination: `buildPatientivoPrelocativeContinuationContract()` derives the incorporated nounstem from the patientive noun generated by `#3 salida`, maps an absolutive-source NNC subject directly into the prelocative verb's object slot through the subject/object inventory, and maps a possessive-source NNC possessor through `POSSESSIVE_TO_OBJECT_PREFIX` into the same outside object slot. The absolutive path does not route through possessive-prefix metadata. The contract now exposes `formationFrame`: Andrews 39.7 rows mark the patientive nounstem as object-complement and the source NNC subject as the outside object; Andrews 39.8 rows mark the patientive nounstem as incorporated object and the source NNC possessor as the outside object without adding an applicative suffix. The same contract now exposes a source-compatible matrix inventory instead of accepting arbitrary matrix roots as Andrews-backed: `ita`, `mati`, `neki`, and `tuka` are Nawat data-backed absolutive-source incorporated-complement matrices for Andrews 39.7/30.15; `tajtani` for Classical `tla-(tlani)` is the default supported matrix and is allowed for absolutive and possessive sources; `tuka` also remains allowed for the 39.7 possessive-source object-complement path; Nawat data-backed 39.8 matrices `tatajtania` for Classical `tla-(ih-tlani)` and `temua` for `tla-(tem-o-a)` are possessive-source only. The old `ni` route is no longer accepted as an Andrews 39.7-39.8 patientive continuation matrix. Unsupported matrix roots and matrix/source-state mismatches remain diagnostic. The UI consumes that contract inside the generated patientive row in `#3 salida`, where supported matrix continuations render as explicit output actions; the prelocative continuation now uses the actual rendered patientive row surface instead of rebuilding a suffix route surface; mixed or unmapped possessor choices remain unavailable instead of guessed.
- Andrews 39.9 now has an output-stage generation contract for characteristic-property patientive nounstems: `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` reads a generated characteristic-property surface from `#3 salida`, removes the Nawat `-yut` absolutive matrix or the Nawat possessive `-yu` matrix as the local counterpart of Andrews' `(-yo)-tl-` omission, and builds a real incorporated-object VNC input with a Nawat data-backed matrix. The contract exposes `formationFrame` so the omitted `(-yo)-tl-`/`-yu(t)` matrix is distinct from the incorporated embed root, and so possessive-state continuations show the possessor-to-outside-object transfer separately from the incorporated nounstem. The first supported matrix is `chikawa`, grounded in repo evidence such as `-yulchikawa`; for example `mikkayut` becomes `-(mikka/chikawa)` and generates `kimikkachikawa`, while possessed `numikkayu` omits `-yu`, promotes `nu-` through the object inventory, and generates `nechmikkachikawa`. Non-`-yut` surfaces without an explicit supported possessor remain diagnostic, not guessed.
- Rendering may show `Fuente patientiva: ...`, `Familias Andrews: ...`, `Etapa salida: #3 salida`, and `Taxonomia patientiva: parcial`; those labels are derived from `patientiveFamilyProfile` and do not create new patientive forms.
- `nominalizationProfile` is explanatory metadata only. It does not add forms, does not complete Lessons 35-41, and does not implement Lessons 42-43 modification.
- Current Lessons 42-43 adjectival-modification metadata distinguishes `adjetivo` route outputs, `nominalizationProfile`, ordinary NNC `formulaSlots`, the opt-in adjectival-NNC function route, and translation adjectives from confirmed modifier/head clause evidence. The `modificationAst` composes only supplied generated head/modifier outputs, keeps their Nawat surfaces unchanged, and remains separate from ordinary NNC `formulaSlots`, VNC generation, and adjective-like word generation.
- Lesson 35 preterit-agentive restricted/general-use stem logic, the first compound-embed continuation, the first preterit-agentive ownerhood/abundant-ownerhood VNC matrix continuations, first preterit-agentive incorporated-complement continuations, first preterit-agentive adverbial-manner continuation, and first class-compatible ordinary-noun ownerhood continuations are implemented through generated `#3 salida` actions; object-focused adverbial matrices, affinity-stem selection, activated projective-object hybrids, `ti` ownerhood subclass selection, and complete ownerhood subtype coverage remain boundary-classified.
- Lesson 37 `z/liz` active-action nounstems have a current Nawat `s/lis` generation contract through `sustantivo-verbal`; complete fixture-backed `z/liz` coverage remains pending.
- Patientivo branches are substantially implemented as Nawat generated surfaces, and the Andrews-aligned source-core taxonomy is now explicit in output metadata. The taxonomy remains partial because passive and impersonal currently share the same Nawat nonactive realization builder and only data-backed generated-output continuations are available for compound/embed/complement/object uses.
- Adjectival modification must not be forced into ordinary NNC `formulaSlots`.
- Topic, modification, and supplementation must remain clause/sentence-level relations unless a confirmed Nawat/Pipil example proves a narrower word-level behavior.

Evidence boundary:

- Local Andrews source check: the PDF headings for Lessons 35-41 were found at PDF pages 334, 354, 371, 382, 391, 410, and 421. This supports treating the span as one nominal-formation checkpoint while keeping implementation category-first.
- `data/static_groups.json` exposes `sustantivo` tenses: `sustantivo-verbal`, `agentivo`, `patientivo`, `instrumentivo`, `calificativo-instrumentivo`, and `locativo-temporal`.
- `data/static_groups.json` exposes `adjetivo` tenses and route surfaces, including active adjective-like outputs and patientivo adjective outputs.
- `data/static_modes.json` contains patientivo surface routes and denominal/adjectival conversion routes, but not a full Lessons 35-43 grammar schema.
- Existing tests prove selected generated outputs such as agentivo suffix behavior, patientivo surfaces, instrumentivo direct/generated parity, locativo-temporal output, and adjective-route surfaces.
- Existing tests now prove selected direct/generated `nominalizationProfile` metadata without treating the metadata as a generator.
- Existing tests now prove the current patientivo branches enforce the passive/impersonal source distinction, the perfective/imperfective `te`→`ta` patientive analogy, the Andrews perfective-core ending gate, root/stock tli-class output, dynamic V->S patientive route output, compound-source patientive provenance, the absolutive-only gate for current incorporated-root patientive continuation, and the Andrews nonactive suffix contract: passive core rejects intransitive sources, clears single-object `ta`/`te`, maps source reflexive `mu` to shuntline `ne`, and keeps exactly one selected projective (`ta` or `te`) from double-projective sources and permits the deleted-`te` alternate when the selected projective is `te`; impersonal core permits intransitive sources, keeps `ta`, maps source reflexive `mu` to shuntline `ne`, maps mainline `te` to the `ta` pattern when no shuntline `ta` already marks the nonhuman patient, while preserving `te+ta` when shuntline `ta` is present; perfective patientive accepts allowed endings such as `tz` through the Andrews 39.1 source-ending contract but rejects invalid `t`/`ch` cores; root/stock patientive keeps explicit route stems available while noun output excludes and rejects zero/`in` spillover; perfective/imperfective patientive branches map mainline `te` to `ta` and source reflexive `mu` to shuntline `ne`; compound-source patientive rows preserve matrix/embed source metadata even when passive and impersonal requests share the same generated surface; dynamic patientive V->S routes use `#3 salida` for the final noun surface instead of static route-suffix reconstruction; current incorporated-root continuation requires a generated absolutive patientive output; legacy nonactive remains shared passive+impersonal; nonactive source suffix families no longer generate zero/`in` spillover when Andrews assigns tli-class patientive output; the nonactive patientive stem builder uses the source-suffix contract for `lu/luwa/u/uwa/wa/walu` deletion/retention; route specs preserve passive/impersonal as nonactive-core sources; the Lesson 37 potential-patient branch strips projective object pronouns in generated output while retaining subject-person and possessive-state compatibility; the Lesson 37.5.3 impersonal-action `sustantivo-verbal` branch derives from the generated nonactive core with `-lis` only; and the Lesson 36 passive-action `calificativo-instrumentivo` branch derives characteristic-property output from the generated nonactive distant-past core.
- `src/tests/nnc_nominalization.test.js` proves current generated nominal surfaces and patientive-family metadata are not treated as complete ownerhood, complete `z/liz` fixture coverage, or full patientive-family evidence.
- `src/tests/nnc_adjectival.test.js` proves Andrews 40.1 opt-in adjectival NNC function generation, including the absolutive-state requirement, Andrews 41.1 intensified adjectival output from generated formula slots, Andrews 41.2 compound-source executable re-routing for generated `adjetivo` output, and Andrews 41.3 denominal-compound executable re-routing for segmented `tiya` compound nounstem sources, while keeping current `adjetivo` route output and `nominalizationProfile.adjectivalFunction` as unconfirmed full modification evidence.
- `src/tests/module_wrapper_parity.test.js` verifies the checkpoint-touched generated module wrappers stay in sync with their JS sources, so nominalization metadata does not drift between browser and module runtimes.
- `src/core/clause/modification/modification.js` exposes non-generative adjectival-modification boundary metadata, structural questions, false-positive classifications, and a `modificationAst` builder that composes existing generated clause outputs without changing their surfaces.
- `src/tests/modification.test.js` proves `adjetivo` route output and `nominalizationProfile` remain unconfirmed modification-AST evidence, while generated ordinary NNC/adjectival NNC surfaces can feed a structural Lessons 42-43 modifier/head AST without new word generation.
- Existing generated examples must not be treated as complete evidence for Andrews-derived Classical categories, complete `z/liz` fixture coverage, ownerhood forms, or modification syntax.
- Andrews/Classical examples are structural prompts only, not Nawat/Pipil fixture data.

Future implementation order:

1. Record current Lessons 35-41 motors as partial coverage without marking the group complete.
2. Keep `nominalizationProfile` as the current category-first metadata foundation for generated nominal/adjectival outputs, with lesson ranges kept only as curriculum references.
3. Gather confirmed Nawat/Pipil examples before expanding ordinary nounstem ownerhood beyond the current class-compatible `e/wa/yua` continuation contract, completing Lesson 35 ownerhood coverage, completing Lesson 37 deverbal `z/liz` fixture coverage beyond the current `s/lis` active-action motor, or adding new patientive family fixtures.
4. Treat the current `patientiveFamilyProfile` as a partial output-stage taxonomy over current branches. Passive and impersonal source cores are now distinct generation/routing categories; gather evidence before giving them distinct Nawat surface realization or adding new patientive families or fixtures.
5. Keep `core/nnc/adjectival` limited to opt-in generated-output continuations until confirmed Nawat/Pipil examples justify broader adjectival NNC paradigms or modifier/head generation.
6. Keep `core/clause/modification` non-generative: its current AST composes supplied generated outputs, but confirmed Nawat/Pipil modifier/head clause examples are still required before fixture data, parser/search detection, generation routing, or UI actions are added.
7. Keep Lessons 42-43 separate from nominal/adjectival word generation.
8. Reduce pending counts only after evidence-backed implementation and tests.

Candidate future schema questions, not implemented fields:

- `nominalizationKind`: preterit-agentive, customary-agentive, patientive, instrumentive, action, result, ownerhood, or unknown.
- `sourceVnc`: raw source, source tense/aspect, source voice, source valency, and object profile.
- `stemUse`: restricted, general-use, compound-embed, or unknown.
- `semanticRole`: agent, patient, instrument, place/time, action, result, possessor/owner, or unknown.
- `patientiveFamily`: nonactive, passive, impersonal, perfective, imperfective, root/stock, compound, complement, object, or unknown.
- `adjectivalFunction`: predicate, modifier, embed, intensified, or unknown.
- `modificationAst`: head, modifier, order, marker, scope, recursion, discontinuity, and ambiguity diagnostics.

## Lessons 44-50 Relational And Adverbial Boundary

Lesson 44 (`clausulas adverbiales nucleares`) has one current Nawat/Pipil-adjacent adverbial output surface and a structural adverbial nuclear-clause frame for generated adverbio output. Lessons 45-47 now have a non-generative relational-NNC usage-frame contract plus diagnostic boundary metadata. Lesson 48 now has a non-generative place-name/gentilic usage-frame contract plus diagnostic boundary metadata. Lessons 49-50 now have a non-generative adverbial-adjunction AST contract plus diagnostic boundary metadata.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 44 organizes adverbial nuclear clauses, degrees of adverbialization, adverbialized VNCs, adverbialized NNCs, particle-looking NNCs, and possessive-state adverbialized NNCs. Andrews 44.2 now governs the current generated adverbio frame: VNC and possessive-state NNC sources allow first-degree adverbialization only, while second-degree adverbialization is reserved for absolutive-state NNCs where evidence supports silent `num1`.
- Lessons 45-47 organize relational NNCs, relational nounstem usage options, locative/directional/frequency relational stems, associated-entity NNCs, and pertinency NNCs.
- Lesson 48 organizes place-name NNCs, gentilic NNCs, gentilic collectivity, and profession/place associations.
- Lessons 49-50 organize adverbial modification and adjoined clause units by time, place, manner, consideration, purpose, condition, concession, consequence, proviso, and reason.

Current project boundary:

- `pasado-remoto-adverbio-activo` is a real generated adverbio surface, but it does not implement the full Lesson 44 adverbial NNC/VNC system.
- Current Lesson 44 adverbial nuclear-clause metadata distinguishes the legacy adverbio surface, adverb translations, particle labels, and ordinary NNC/VNC outputs from confirmed adverbial NNC/VNC or clause evidence. It does not add forms and does not change NNC or VNC generation.
- Generated legacy adverbio rows now carry `adverbialNuclearClauseFrame` through `adverbialNuclearFrame`: source VNC stem, source valency, first-degree adverbialized subject-pronoun contract, semantic domain (`manner` for the current route), and unchanged generated surface forms. This is an engine provenance/teaching contract for the current adverbio route, not a full Lesson 44 data-complete generator.
- Current route metadata intentionally keeps the legacy adverb output outside the linked output-composition surface.
- Current Lessons 45-47 relational-NNC metadata distinguishes ordinary NNC fixtures/open stems, locative-temporal nominal outputs, route labels, place/preposition translations, and static roadmap markers from confirmed relational NNC evidence. It also records Andrews 45.2 relational usage options as structural frames: option one is a simple-stem possessive-state predicate with supplementary-possessor limits, option two is an integrated matrix frame, option three is a linked matrix frame, and option four is an embedded relational stem position. These frames do not add forms and do not change ordinary NNC, nominalization, route, or VNC generation.
- Lesson 46 source-voice state behavior is represented only as metadata/diagnostics: impersonal option-two sources require absolutive-state framing, while active/passive imperfect sources can record the source-subject-to-possessor question without generating Nawat/Pipil forms.
- Generated `locativo-temporal` nominal rows can carry diagnostic `relationalNncBoundaryFrame` metadata derived from the current output context. This frame is explicitly negative evidence-boundary metadata: it records the row as a locative-temporal generated candidate, not as confirmed relational-NNC fixture data.
- Current Lesson 48 place/gentilic metadata distinguishes ordinary NNC fixtures/open stems, relational boundary metadata, locative-temporal nominal outputs, place/profession/gentilic translations, route labels, CSV verb rows, and calendar roadmap text from confirmed place-name or gentilic NNC evidence. It also records Andrews 48 structure as usage frames: place-name NNCs have adverbialized subject pronouns with unique socially designated place reference, not merely context-chosen locative reference; place-name NNCs can function as ordinary, adverbial, or adjectival NNCs; topographical-feature names are not automatically place-names; gentilic NNCs distinguish nonlocative absolutive tribal names, two-clause place-name-plus-head structures, preterit-agentive place derivations, `-ca` matrix derivations, gentilic collectivity in `-yo`, profession extensions, and incorporation. These frames do not add forms and do not change ordinary NNC, relational, nominalization, route, or VNC generation.
- Lesson 48 gentilic collectivity and profession behavior is represented only as metadata/diagnostics: collectivity records the `yo` matrix and possessive `num1` variants (`zero`/`uh`), profession extensions can be absolutive or possessive, and pan-e-ca gentilic formation is kept distinct from pan-ca associated-entity structure.
- Generated `locativo-temporal` nominal rows can also carry diagnostic `placeGentilicNncBoundaryFrame` metadata derived from the current output context. This frame records the row as a locative-temporal generated candidate, not as confirmed place-name or gentilic fixture data.
- Current Appendix E calendar-name metadata distinguishes roadmap text, date labels, personal-name metadata, and place/gentilic metadata from confirmed day, month, year, or cycle-name evidence. It does not add forms and does not change ordinary NNC, personal-name, or place/gentilic generation.
- Current Lessons 49-50 adverbial-adjunction metadata distinguishes the legacy adverbio surface, Lesson 44 adverbial metadata, relational/place boundary metadata, particle labels, route labels, translations, CSV verb rows, and single generated words from confirmed adjoined-unit or clause-adjunction evidence. It also provides `buildAdverbialAdjunctionAst()` for supplied clause/unit surfaces: Lesson 49 adverbialized modifiers normally precede the head but may follow, can recurse in the head, modifier, or both, and include place/time apposition; Lesson 50 nonadverbialized adjoined clause units record time/place/manner/consideration/purpose/condition/concession/consequence/proviso/reason relations, including `tla/in tla` condition and `ca` reason as a principal-clause introducer rather than a conjunction. This does not add forms and does not change adverbio, NNC, VNC, relational, place/gentilic, or route generation.
- Generated legacy adverbio and `locativo-temporal` rows can carry diagnostic `adverbialAdjunctionBoundaryFrame` metadata derived from the current output context. This frame records the row as a single generated-word candidate, not as confirmed adjoined-unit or clause-adjunction data.
- No relational NNC fixture data or relational NNC generation engine exists yet; current relational support is a usage-frame/diagnostic contract only.
- No place-name, gentilic, calendar-name, or profession/gentilic fixture data or generation engine exists yet; current place/gentilic support is a usage-frame/diagnostic contract only.
- No static adverbial-adjunction data or adjoined-unit generation exists yet; current clause-adjunction support is an AST/diagnostic contract only.
- Do not infer relational or adverbial clause behavior from ordinary NNC/VNC outputs, labels, or translations alone.
- Do not treat adverbial particles, relational labels, place names, or English/Spanish preposition translations as confirmed Nawat/Pipil fixtures without source-backed data.

Evidence boundary:

- `data/static_groups.json` exposes Adverbio with only `pasado-remoto-adverbio-activo`.
- `data/static_labels.json` labels `pasado-remoto-adverbio-activo` as an adverbio derived from a preterit-agentive/manner-like output.
- Existing tests prove `pasado-remoto-adverbio-activo` generates selected surfaces such as `matka`, `matika`, `tamatka`, and `tamatika`, and rejects zero-object transitive adverb generation.
- `src/tests/morphology_engine.test.js` and `src/tests/ui.test.js` prove generated adverbio rows expose `adverbialNuclearClauseFrame`/`adverbialNuclearFrame` metadata and labels while preserving those surfaces.
- Existing tests also prove the legacy adverb tense remains outside the Nawat route inventory.
- `src/lessons/registry.js` marks Lessons 44-50 partially implemented.
- `src/ui/curriculum/curriculum.js` records Lesson 44, Lessons 45-47, Lesson 48, and Lessons 49-50 boundary rows as partial, and the relational/place/gentilic/adverbial-adjunction data rows as missing.
- `src/core/clause/adverbial/adverbial.js` exposes non-generative adverbial nuclear-clause boundary metadata, known legacy adverbio tense, structural questions, false-positive classifications, and a structural `adverbialNuclearClauseFrame` builder for existing generated output.
- `src/tests/adverbial.test.js` proves `pasado-remoto-adverbio-activo` receives a Lesson 44 first-degree VNC adverbialization frame, rejects second-degree VNC adverbialization, remains an unconfirmed full Lesson 44 engine, and keeps adverb translations outside adverbial-clause evidence.
- `src/core/nnc/relational/relational.js` exposes non-generative relational-NNC boundary metadata, structural questions, anti-conflation rules, false-positive classifications, and `buildRelationalNncUsageFrame()` for Andrews 45.2-46 option/state structure.
- `src/tests/nnc_relational.test.js` proves locative-temporal nominal outputs, preposition/place translations, static labels, and roadmap markers are not confirmed relational NNC evidence; it also locks option-one possessive-only behavior and option-two impersonal absolutive-state behavior without generating surfaces.
- `src/tests/nnc.test.js` and `src/tests/ui.test.js` prove generated `locativo-temporal` rows expose diagnostic `relationalNncBoundaryFrame` metadata and labels while preserving the existing `nemiyan` surface.
- `src/core/nnc/place_gentilic/place_gentilic.js` exposes non-generative place-name/gentilic NNC boundary metadata, structural questions, anti-conflation rules, false-positive classifications, and `buildPlaceGentilicNncUsageFrame()` for Andrews 48 place-name/gentilic structure.
- `src/tests/nnc_place_gentilic.test.js` proves locative-temporal nominal outputs, place/profession/gentilic translations, CSV verb rows, calendar roadmap text, and relational metadata are not confirmed place-name or gentilic evidence; it also locks unique-reference place-name behavior, two-clause gentilic structure, pan-e-ca vs pan-ca distinction, and gentilic-collectivity `yo` metadata without generating surfaces.
- `src/tests/nnc.test.js` and `src/tests/ui.test.js` prove generated `locativo-temporal` rows expose diagnostic `placeGentilicNncBoundaryFrame` metadata and labels while preserving the existing `nemiyan` surface.
- `src/core/calendar/calendar.js` exposes non-generative Appendix E calendar-name boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/calendar.test.js` proves calendar roadmap text, personal-name boundaries, and place/gentilic boundaries remain unconfirmed calendar-name evidence.
- `src/core/clause/adjunction/adjunction.js` exposes non-generative adverbial-adjunction boundary metadata, structural questions, anti-conflation rules, false-positive classifications, and `buildAdverbialAdjunctionAst()` for Andrews 49-50 clause/unit structure.
- `src/tests/adjunction.test.js` proves single generated words, translations, adverbio output, and boundary metadata are not confirmed clause-adjunction evidence; it also locks Lesson 49 modifier/head order, head recursion, place/time apposition, Lesson 50 condition marking, and `ca` reason-as-non-conjunction behavior without generating surfaces.
- `src/tests/morphology_engine.test.js`, `src/tests/nnc.test.js`, and `src/tests/ui.test.js` prove generated adverbio and `locativo-temporal` rows expose diagnostic `adverbialAdjunctionBoundaryFrame` metadata and labels while preserving existing surfaces.
- No `data/static_relational_nnc`, `data/static_places`, `data/static_gentilics`, `data/static_calendar`, or `data/static_adverbial_adjunction` implementation was found.

Future implementation order:

1. Keep `core/clause/adverbial` non-generative beyond the current frame: confirmed Nawat/Pipil adverbial NNC/VNC or clause examples are required before adding fixture data, parser/search detection, new adverbial surfaces, or UI actions.
2. Keep Lesson 44 adverbio surface support separate from full adverbial NNC/VNC modeling; current frame output may describe the generated route but must not invent particle-looking, possessive-state, or second-degree NNC forms.
3. Keep `core/nnc/relational` as non-generative usage-frame/boundary metadata until confirmed Nawat/Pipil relational NNC examples justify fixture data, surface generation, parser/search detection, or UI actions.
4. Keep `core/nnc/place_gentilic` as non-generative usage-frame/boundary metadata until confirmed Nawat/Pipil place/gentilic examples justify fixture data, surface generation, parser/search detection, or UI actions.
5. Keep `core/calendar` as non-generative boundary metadata until confirmed Nawat/Pipil calendar-name examples justify data, schema, generation, or UI.
6. Keep `core/clause/adjunction` as non-generative AST/boundary metadata until confirmed Nawat/Pipil adjoined-unit or clause examples justify static data, surface generation, parser/search detection, or UI actions.
7. Reduce pending counts only after evidence-backed implementation and tests.

Candidate future schema questions, not implemented fields:

- `adverbializationKind`: VNC, NNC, particle-looking, possessive-state, or unknown.
- `adverbialDegree`: first-degree, second-degree, lexicalized, or unknown.
- `relationalStem`
- `relationalOption`: one, two, three, four, or unknown.
- `relationalOptionGroup`: option-one-only, option-two-only, options-one-two, options-one-three, options-one-two-three, or unknown.
- `relationalStemPosition`: simple-stem predicate, integrated matrix, linked matrix, compound embed, or unknown.
- `relationalSourceState`: absolutive, possessive, or unknown.
- `relationRole`: location, direction, frequency, association, pertinency, or unknown.
- `placeNameSource`
- `gentilicSource`
- `placeNameSubjectReference`: unique socially designated place, context-chosen locative relation, or unknown.
- `placeNameUsage`: ordinary NNC, adverbial NNC, adjectival NNC, or unknown.
- `placeFormationGroup`: `-n`, `pan`, `co/c`, `tlah`, `tzalan`, `ti-tlan`, `chan`, or unknown.
- `gentilicFormation`: nonlocative absolutive, two-clause concatenate, preterit-agentive place, `ca` matrix full-place, `pan-e-ca`, `ca-n-m-e-ca`, silent replacement, `ma-n/tla-n -> te-ca`, collectivity `yo`, profession extension, incorporation, or unknown.
- `adverbialAdjunctionAst`: principalClause, adjoinedUnit, semanticRelation, order, marker, scope, recursion, and diagnostics.

## Lessons 51-58 Clause, Denominal, Names, And Miscellany Boundary

Lesson 51 now has a non-generative complementation AST contract plus diagnostic boundary metadata. Lesson 52 now has a non-generative conjunction AST contract plus diagnostic boundary metadata. Lesson 53 has diagnostic comparison boundary metadata. Lessons 54-55 (`denominales`) have partial Nawat/Pipil support through current route profiles and source-state metadata. Lesson 56 has diagnostic personal-name NNC boundary metadata. Lessons 57-58 have diagnostic textual-analysis/miscellany boundary metadata.

Structural frame from Andrews; Nawat/Pipil orthography and surfaces remain separate:

- Lesson 51 organizes complementation: object complements, subject complements, adverbial complements, and double-nucleus structures.
- Lesson 52 organizes conjunction, marked and unmarked conjunction, correlative conjunction, lexical innovation by conjunction, and parallel structure.
- Lesson 53 organizes similarity and comparison, including equality, size, comparative degree, superlative degree, and comparison questions.
- Lessons 54-55 organize denominal verbstem families, including inceptive/stative suffixes, possession-related denominals, causative/applicative derivations from denominal stems, temporal suffixes, and transitive/intransitive denominal routes.
- Lesson 56 organizes personal-name NNCs from single-clause, adjunction, and conjunction sources.
- Lessons 57-58 collect nonsystemic tense use, irregular valence, absolute topic, agreement mismatch, adverbial NNCs as supplements, problematic constructions, exclamations, `mah` constructions, incorporated-noun subject warnings, and textual problems.

Current project boundary:

- Current denominal routes are real engine behavior, but they do not complete the full Lessons 54-55 suffix-family inventory.
- Current source-state metadata describes supported route provenance; it is not a full denominal grammar schema.
- `getNawatDenominalAndrewsContractInventory()` now exposes a structural Andrews contract inventory for verified Lessons 54-55 NNC-to-VNC denominal families without generating new surfaces. The inventory records §54.2.1 `ti`, §54.2.2 `hui` plus `hui-lia` causatives, §54.2.3 root-plus-`ya`, deverbal `ti-ya`/`hui-ya`, and `ya`-deleting `lia` causatives/applicatives, §54.2.4 limited inceptive/stative `a`, §54.2.5 deverbal `(-yo)-tl-` `hua`, §54.3 included-possessor `ti`, §54.4 possession `ti`, §54.2/§54.4 `ti` + `lia` causatives, §54.5 `ti-a` causatives, §54.6 `t-ia` applicatives, §55.1 temporal `tia`, §55.2 causative `tla`, §55.2 causative `tla -> ti-lia` applicative replacement, §55.2 less-productive intransitive `tla`, the §55.2 note's intransitive `tla -> ti-a/ti-lia` continuations, §55.3 intransitive `o-a` plus applicative `huia`, the §55.3 note 2 `o-a` source to hypothetical `i-l-huia`/`a-l-huia` applicative path, §55.4 adverbial `huia`, §55.5 relational-compound `o-a`/`huia`, §55.6 `i-hui`/`a-hui > o-a`, and §55.7 transitive `i-a`. Classical spellings in those contracts are passed through `convertClassicalLettersToNawat()` before they are exposed as Nawat/Pipil rule spellings, e.g. `hui -> wi`, `hui-lia -> wi-lia`, `hui-ya -> wi-ya`, `hua -> wa`, `tla -> ta`, `ti-lia -> ti-lia`, `o-a -> u-a`, `huia -> wia`, and `i-l-huia`/`a-l-huia -> i-l-wia`/`a-l-wia`. The coverage summary keeps `vt-na` as a Nawat-only route family and counts unmodeled Andrews contracts as pending rather than supported generation.
- Current `data/static_modes.json` route profiles explicitly configure the supported denominal families (`vi-ti`, `vi-iwi`, `vi-awi`, and `vt-na`) and their route contracts. Andrews-verified suffix contracts are narrower: `vi-ti` maps to Andrews §54.2/§54.4 `ti`, while `vi-iwi` and `vi-awi` map to Andrews §55.6 `i-hui` and `a-hui`, converted by `convertClassicalLettersToNawat()` as `i-wi` and `a-wi` before Nawat route surfaces use `-iwi` and `-awi`. The existing `vt-na` route remains current Nawat route data only because Andrews Lesson 55 verifies transitive denominal `i-a`, `o-a`, and `huia`, not a `-na` suffix family; metadata marks it `nawat-transitive-route-no-andrews-suffix` with `noAndrewsSuffixContract`. Source-state and generated-output `denominalFamilyProfile` metadata derive from that route data and mark `routeProfileSource: "static-modes"` when configured data is available. `getNawatDenominalRouteFamilyInventory()` exposes the configured family inventory as partial, route-based metadata. `generateNawatDenominalRouteFamilyPreview()` links the configured source, stem, verbalizer, target verb, finite surface, and trail stages for a source input so a generated stage can be inspected as a next source. Each preview stage carries a `nextSource` candidate with input/mode/tense context for later composition; selected `vi-ti` verbalizer stages carry bounded generated `ti` source evidence for the §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` continuations, and selected `vi-iwi`/`vi-awi` verbalizer stages carry bounded §55.6 `i-hui`/`a-hui` source evidence so a following route preview can satisfy the matching `o-a` counterpart only after that generated intransitive stage is selected. Andrews-generated §55.3 intransitive `o-a` targets likewise carry bounded source evidence for the note 2 `i-l-huia`/`a-l-huia` applicative continuations without inventing lexical evidence or a transitive `o-a` step. `buildNawatLinkedGrammarPathStageGenerateWordRequest()` converts a stage into a direct generation request, `executeNawatLinkedGrammarPathStage()` executes that request while returning linked-path provenance, `previewNawatLinkedGrammarPathNextSource()` previews the supported route-family candidates for that next source without executing it or mutating state, `previewNawatLinkedGrammarPathChain()` composes an explicit user-selected sequence of stages into a chain preview, `buildNawatLinkedGrammarPathSelectionSummary()` exposes the current source plus appendable next route/stage choices without executing stages, selection-state helpers can store/clear/backtrack an explicit selected stage chain without executing it, and `executeNawatLinkedGrammarPathChain()` executes the selected stage sequence while preserving linked-path provenance. The visible linked-path surface is now dynamic output composition inside `#3 SALIDA`, not a separate `ruta nawat` rail: reusable stages show `Siguiente fuente`, `Salida de etapa`, `Continuaciones`, and generated Andrews source evidence; selected-path helpers show `Fuente actual`, `Opciones siguientes`, and `Siguiente salida`; Andrews continuation chips distinguish source-evidence-required and source-evidence-satisfied targets. That output surface can display appendable next choices with explicit `seguir` actions that store the chosen next route without replacing the station-travel action or executing a generated stage; selected chains can then render as `Trayecto` plus current-source/next-option labels, `atrás` can remove the last selected stage, `borrar` can clear the chain, `generar trayecto` can execute the stored chain on request, `usar etapa N` can promote any executed stage's generated surface as the next linked-path source while retaining wrapped source-input provenance, `usar salida` can promote the final generated surface as the next linked-path source and synchronize it into the visible input only for that explicit action, and the selected-path summary can offer multiple `seguir` choices again from that promoted/current source. These are still route-based outputs, not a complete denominal-family engine. Rendering may show `Familia denominal`, `Verbalizador denominal`, `Contrato Andrews`, generated `ti`/`hui`/`ya`/`tla`/`o-a`/§55.6 source evidence, and `Cobertura denominal: parcial` from that metadata.
- `generateNawatDenominalAndrewsContractRoutePreview()` now turns the verified Andrews §54.2-§55.7 inventory into Nawat-letter VNC stem and route-input targets for a supplied source stem, and generated denominal output rows carry the same preview inside `denominalFamilyProfile.andrewsContractRoutePreview`. The preview covers `hui -> wi`, `hui-lia -> wi-lia`, `ya -> ya`, source-limited `ti-ya`/`hui-ya`, `ya` deleted before `lia`, `a -> a`, `hua -> wa`, causative and intransitive `tla -> ta`, intransitive `tla` replaced by `ti` before causative `a` and applicative `lia`, causative `tla` replaced by `ti` before applicative `lia`, `o-a -> u-a`, `huia -> wia`, §55.3 note 2 `i-l-huia -> i-l-wia` and `a-l-huia -> a-l-wia`, `i-hui -> i-wi`, `a-hui -> a-wi`, and `i-a -> i-a`, including segmented target inputs such as `(stemwi)-(lia)`, `(stemti)-(ya)`, `(stemwi)-(ya)`, `(stemya)`, `(stem)-(lia)`, `(stema)`, `(stemwa)`, `(stemti)-(lia)`, `(stemti)-(a)`, `(stemt)-(ia)`, `(stem)-(ta)`, `(stemta)`, `(stemua)`, `(stem)-(wia)`, `(stem)-(ilwia)`, `(stem)-(alwia)`, and `(stem)-(ia)`. It also records verified Andrews verbstem classes for route targets where the PDF states them: included-possessor and §55.2 causative `tla` targets are Class A, §54.4 possession `ti` targets are Class A/B and cannot form deverbal `ya`, §54.2/§54.4 `ti-lia` causatives are Class C once a generated `ti` source is supplied, §54.2 `ti-ya` is Class A/B, §54.2 `hui-ya` is Class B, §54.5/§54.6 causative/applicative targets and §55.3 `o-a`/`huia` targets are Class C, and §55.6 `i-hui`/`a-hui` targets are Class B while their `o-a` counterpart is Class C. Source-limited targets carry source-evidence contracts before finite request construction: §54.3 included-possessor `ti` requires a possessive-state NNC predicate, §54.2.2 `hui-lia` requires a generated intransitive `hui` verbstem source, §54.2.3 `ti-ya`/`hui-ya` require generated `ti`/`hui` intransitive sources, §54.2.3 `ya-lia` requires a generated intransitive `ya` verbstem source and deletes `ya` before `lia`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` require a generated intransitive `ti` verbstem source, §55.1 `tia` requires a temporal compound nounstem, §55.2 `tla -> ti-lia` requires a causative `tla` source, §55.2 note `tla -> ti-a/ti-lia` requires an intransitive `tla` source, §55.3 note 2 `i-l-huia`/`a-l-huia` requires a generated intransitive `o-a` source and records the hypothetical `i-hui`/`a-hui` source plus the bypassed transitive `o-a` step, §55.4 `huia` requires an adverbial nounstem, §55.5 `o-a`/`huia` requires a relational compound nounstem or possessive-state relational predicate, and §55.6 `o-a` requires an `i-hui`/`a-hui` intransitive source. The finite §54.5 `ti-a` route is currently the single-object path from a generated `ti` verbstem source; Andrews' possessive-state double-object §54.5 path remains unmodeled rather than forced through that route. Generated ordinary possessive NNC outputs can satisfy the §54.3 included-possessor source contract from their Nawat surface; the possessor stays inside the target verbstem (`nukal` -> `(nukalti)`) and is not mapped to an object slot. Generated ordinary absolutive NNC outputs can satisfy the §54.2.1 inceptive/stative `ti` source contract from their predicate stem, so a concrete NNC output such as `kal` routes as `(kalti)` while possessive or empty/stale result frames are rejected. Generated ordinary NNC outputs can satisfy the §54.4 possession-`ti` source contract from the predicate nounstem, so the source surface `kal` routes as `(kalti)` while a possessive surface such as `nukal` still contributes the predicate stem `kal` for this separate possession route. Selecting a generated `vi-ti` verbalizer stage, a generated §54.2 inceptive/stative `ti` target, or a generated §54.4 possession `ti` target supplies bounded `ti` source evidence for the following `ti-ya`, `ti-lia`, `ti-a`, and `t-ia` continuation previews. Generated §54.2.2 `hui` and §54.2.3 `ya` targets supply bounded source evidence for their own `hui-ya`/`hui-lia` and `ya`-deleting `lia` continuations. Generated `ti-ya` and `hui-ya` targets then supply bounded `ya` source evidence for the following `ya-lia` preview, deleting final `ya` before `lia` so the next source is the generated `ti` or `hui` stem. Traditional spellings `tia` and `huia` are stored only as ambiguity labels because Andrews warns that they can be confused with causative `tia` and applicative `huia`. Selecting a generated `vi-iwi`/`vi-awi` verbalizer stage supplies only §55.6 source evidence and the original base stem to the following route preview; the bare noun route preview remains source-limited and does not invent an `o-a` counterpart. Andrews-generated target routes that function as later sources now carry their own bounded source evidence too: §54.2/§54.4 generated `ti` can satisfy the following `ti-ya`, `ti-lia`, `ti-a`, and `t-ia` previews, §54.2.2 generated `hui` can satisfy `hui-ya` and `hui-lia`, §54.2.3 generated `ya` can satisfy `ya-lia`, §55.2 generated causative `tla` can satisfy the following `tla -> ti-lia` applicative preview, §55.2 generated intransitive `tla` can satisfy the note's `ti-a` and `ti-lia` previews, generated §55.3 intransitive `o-a` can satisfy the note 2 `i-l-huia` and `a-l-huia` applicative previews, and §55.6 generated `i-hui`/`a-hui` can satisfy the `o-a` counterpart preview. §55.7 `i-a` route targets carry Andrews' no-intransitive-counterpart boundary, the usual source-final pattern as Nawat `k/l` for Classical `[c]/[l]`, a w-final warning that a seeming `i-a` target may actually be §55.3 `huia` after /w/ + /w/ contraction, a note that the `i` may belong to the source nounstem, and a note that a seeming `i-a` causative may have an `i-hui` intransitive source without following the §55.6 `o-a` counterpart path. These diagnostics flow through request/execution provenance and do not reject the target. Each source-satisfied route target can now build an explicit VNC generation request through `buildNawatDenominalAndrewsContractRouteGenerateWordRequest()`, execute it through `executeNawatDenominalAndrewsContractRoute()`, activate the target in `#3 salida` through `activateNawatDenominalAndrewsContractRouteTarget()`, preview the next Andrews source-limited routes through `previewNawatDenominalAndrewsContractRouteNextSource()`, preview the included-possessor route from a generated possessive NNC through `previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput()`, preview the §54.2.1 inceptive/stative `ti` route from a generated absolutive NNC through `previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput()`, or preview the possession-`ti` route from a generated ordinary NNC predicate through `previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput()` only when the caller supplies the required target tense/object/source evidence. Transitive, causative, applicative, and usually-transitive route targets also require an explicit object prefix before request construction; continuation chips show this object requirement and stay unavailable until an object prefix is selected. Rendering may display the target count, explicit-request count, object-prefix-required count, class-contract count, source-evidence-required count, warning count, note count, sample VNC inputs, and limited Andrews denominal VNC continuation chips. The preview itself remains stem/contract output only: it does not run finite VNC generation, create fixtures, add lexical evidence, or add new route families.
- Generated ordinary absolutive NNC outputs now also expose the §54.2.2 inceptive/stative `hui -> wi` route through `previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput()`: a concrete generated NNC predicate such as `kal` can route to `(kalwi)`, while possessive-state outputs and empty/stale result frames are blocked at the source-evidence layer. The live ordinary-NNC row chip uses the existing executable `andrews-54-2-2-hui` contract, converts the Classical rule suffix through the Nawat/Pipil spelling bridge, records the Andrews source-final class rule, and switches into VNC present generation only when the user clicks the route.
- Selecting a generated §54.2.2 `hui -> wi` VNC target now exposes the §54.2.2 `hui-lia -> wi-lia` causative continuation as a live object-prefix-required next-source route. The route uses only generated `hui/wi` source evidence, so parent and object-prefix chips carry `huiSourceRequired`, `sourceEvidenceSatisfied`, and the `andrews-54-2-2-hui-lia` executable rule id; choosing an explicit object prefix (`mu`, `ta`, or `te`) routes `(stemwi)-(lia)` into finite VNC generation instead of the generic empty-generation block. This does not import Andrews' Classical example surfaces or create fixture evidence.
- Generated ordinary absolutive NNC outputs now also expose the §54.2.3 root-plus-`ya` route through `previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput()`: the generated predicate stem is treated only as a nounstem downgraded to root rank, so a concrete NNC predicate such as `kal` can route to `(kalya)`, while possessive-state outputs and empty/stale result frames are blocked at the source-evidence layer. The live ordinary-NNC row chip uses the executable `andrews-54-2-3-ya` contract, creates no lexical fixture evidence, and switches into VNC present generation only when the user clicks the route.
- Generated §54.2.1 `ti` and §54.2.2 `hui -> wi` VNC targets now expose all source-satisfied next-source Andrews routes rather than only the first four preview routes. A generated `ti` source can reach the executable §54.2.3 `ti-ya`, §54.2.1/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` contracts as live row actions; a generated `hui/wi` source can reach §54.2.3 `hui-ya` and §54.2.2 `hui-lia`. Source evidence records now explicitly mark `sourceEvidenceSupportsTiYaDeverbal` or `sourceEvidenceSupportsHuiYaDeverbal` where Andrews states those generated `ti`/`hui` stems are the source for deverbal `ya`. Object-prefix-required continuations still block at the object layer until the user picks `mu`, `ta`, or `te`; no route is hidden by an arbitrary UI preview limit.
- Selecting a generated §54.2.3 root-plus-`ya` route now preserves active Andrews route context so the following §54.2.3 `ya-lia` contract can appear as a live VNC continuation. The next-source route is shown only when the generated `ya` target supplies source evidence; it deletes the final `ya`, targets `(stem)-(lia)`, and remains blocked at the object-prefix layer until the user chooses an explicit VNC object prefix (`mu`, `ta`, or `te`). This replaces the generic empty-generation path with an Andrews-supported source/object diagnostic path and still creates no fixture or Classical lexical evidence.
- Generated ordinary absolutive NNC outputs now also expose the §54.2.4 limited inceptive/stative `a` route through `previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput()`: a generated predicate stem can route to `(stema)` as a Class C intransitive VNC target only from an absolutive nounstem source. The live chip is marked `uso limitado` and `notCausativeA`, blocks possessive or stale empty-frame sources at the source/agreement layer, creates no fixture evidence, and switches into VNC present generation only when the user clicks it.
- Generated `calificativo-instrumentivo` characteristic-property NNC outputs now expose the §54.2.5 `hua -> wa` route through `previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput()`: a generated absolutive `-yut` surface such as `mikkayut` is treated as source evidence for its Nawat `-yu` nounstem (`mikkayu`) and can route to the Class A intransitive VNC target `(mikkayuwa)`. Possessive `-yu` rows are rejected for this route because the executable contract requires an absolutive deverbal `(-yo)-tl` source; arbitrary `yu` strings and non-characteristic outputs do not become evidence. The live chip is marked `fuente -yu(t)` and `notOaFormation`, keeping Andrews §54.2.5 `hua` separate from the §55.3 `o-a` family while creating no fixture or Classical lexical evidence.
- Generated ordinary possessive NNC outputs now expose the §54.3 included-possessor `ti` route as a live VNC continuation: a generated source such as `nukal` can route to `(nukalti)` only from possessive-state NNC predicate evidence. The chip is marked `NNC posesivo` and `poseedor interno`; its datasets record that the possessor remains inside the derived verbstem and that possessive case is not transformed into a VNC object slot.
- §55.1, §55.4, and §55.5 now have explicit source-classification helpers: `previewNawatDenominalAndrewsTemporalTiaRouteFromSource()` accepts confirmed compound-temporal nounstem evidence with a time-segment matrix plus numeral embed for intransitive `tia`; `previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource()` accepts confirmed adverbial-nounstem evidence for `huia`; and `previewNawatDenominalAndrewsRelationalCompoundRouteFromSource()` accepts confirmed relational compound or possessive relational predicate evidence for `o-a`/`huia`. These helpers keep the same source-evidence gate before finite VNC request construction, convert Classical rule spellings to Nawat letters where needed, and explicitly avoid treating generated `locativo-temporal`, legacy adverbio output, or diagnostic relational boundary frames as automatic source evidence.
- §54.2 target stem-class metadata now follows Andrews' source-final rules without adding fixture evidence: `ti` is Class A after consonant-final sources and A/B after vowel-final sources; `hui` is Class A after consonant-final sources and Class B after vowel-final sources; root-plus-`ya` and deverbal `ti-ya` record A/B; deverbal `hui-ya` records Class B; limited `a` records Class C; and `hua -> wa` records Class A, separate from §55.3 `o-a`.
- §55.7 source-final metadata is diagnostic only. The route records majority Classical `[c]`/`/l/` sources as Nawat `k/l`, attested minority `/k/`/`/n/` examples as Nawat `k/n` with Classical `/k/` collapsed into the same Nawat `k`, and w-final ambiguity as a lexical-confirmation warning; none of these source-final labels rejects the route or creates fixture evidence.
- Current Lesson 51 complement metadata distinguishes VNC/NNC outputs, object controls, subject labels, nominalization profiles, translations, CSV verb rows, and single generated words from confirmed complement-clause evidence. It also provides `buildComplementClauseAst()` for supplied clause/NNC/VNC surfaces: object complements link the principal object pronoun to the complement NNC subject, subject complements link the principal subject pronoun to the complement NNC subject, adverbial complements record principal-subject or relational-stem compatibility, designation complements can record passive subject-complement transforms, and relational adverbial complements record later active-action incorporation risk. This does not add forms and does not change valency, VNC, NNC, or nominalization generation.
- Current Lesson 52 conjunction metadata distinguishes parser separators, slash/CSV variants, particle labels, translations, route labels, and single generated words from confirmed conjunction evidence. It also provides `buildConjunctionClauseAst()` for supplied Nawat/Pipil surfaces: balanced no-head conjunction, additive/alternative/adversative coordination, principal/adjoined/lexical levels, marked `auh`, unmarked juxtaposition, adverbial modifiers such as `ihuan` that are not conjunctors, paired correlative particles, lexical innovation by conjoined NNCs, and rephrasive/progressive/appositive parallelism. This does not add forms and does not change parser, VNC, NNC, or route behavior.
- Current Lesson 53 comparison metadata distinguishes adjective-like outputs, adjectival-modification metadata, degree/question labels, translations, CSV verb rows, and single generated words from confirmed comparison evidence. It does not add forms and does not change adjective, NNC, or VNC generation.
- Current Lesson 56 personal-name NNC metadata distinguishes ordinary NNC fixtures/open stems, capitalization labels, proper-name translations, place/gentilic metadata, adjunction/conjunction metadata, and calendar roadmap text from confirmed personal-name NNC evidence. It does not add forms and does not change ordinary NNC, place/gentilic, adjunction, conjunction, or calendar-name generation.
- Current Lessons 57-58 analysis metadata distinguishes VNC/NNC outputs, sentence-layer metadata, clause-shell metadata, parser labels, topic/focus UI labels, bare `mah` strings, translations, and CSV verb rows from confirmed textual-analysis or miscellany evidence. It does not add forms and does not change VNC, NNC, parser, sentence-layer, or clause-shell behavior.
- No comparison AST, personal-name NNC generation, calendar-name generation, textual-analysis engine, or miscellany engine exists yet. Current complement and conjunction support are AST/diagnostic contracts only.
- Do not force Lessons 51-53 or 57-58 into existing VNC/NNC word generation.
- Do not treat personal-name forms, comparison translations, `mah` constructions, or textual diagnostics as ordinary NNC fixtures without confirmed Nawat/Pipil examples and a schema.
- Do not import Andrews/Classical examples as Nawat/Pipil forms.

Evidence boundary:

- `data/static_modes.json` contains denominal route profiles for `-ti`, `-iwi`, `-awi`, and `-na` routes, with validated `denominalFamily` and `structuralAnalogue` fields. Only `-ti`, `-iwi`, and `-awi` currently carry Andrews suffix contracts; `-na` is retained as a Nawat route and blocked from being presented as Andrews-backed.
- Existing route/state and morphology tests prove denominal source-state metadata, generated-output `denominalFamilyProfile`, route-family inventory metadata, Andrews contract route-target previews, linked route previews, station models, finite outputs, and unchanged generated surfaces for selected examples.
- Existing morphology tests prove selected denominal route outputs such as `pusuktik`, `pusuktituk`, `pusuknaj`, and `pusuknajtuk`.
- `src/lessons/registry.js` marks Lessons 51-58 partially implemented.
- `src/ui/curriculum/curriculum.js` marks Lesson 51 complement boundary, Lesson 52 conjunction boundary, Lesson 53 comparison boundary, `54-55 · denominal pleno y familias de sufijos`, Lesson 56 personal-name boundary, and Lessons 57-58 analysis boundary partial while the data/AST rows remain missing.
- `src/core/clause/complement/complement.js` exposes non-generative complement-clause boundary metadata, structural questions, anti-conflation rules, false-positive classifications, and `buildComplementClauseAst()` for Andrews 51 double-nucleus complementation.
- `src/tests/complement.test.js` proves object/subject/adverbial complement ASTs preserve supplied surfaces, distinguish complement from supplementation, record `pehua`-type beginning complements, record relational lexicalized adverbial complements, and reject single generated words as complete complement structures.
- `src/core/clause/conjunction/conjunction.js` exposes non-generative conjunction-clause boundary metadata, structural questions, anti-conflation rules, false-positive classifications, and `buildConjunctionClauseAst()` for Andrews 52 conjunction and parallel-structure relations.
- `src/tests/conjunction.test.js` proves unmarked juxtaposition, marked `auh`, rightward `ihuan` as an adverbial modifier rather than a conjunctor, paired correlative particles, conjoined-NNC lexical innovation, and rephrasive parallelism while preserving supplied surfaces and keeping generation disabled.
- `src/core/comparison/comparison.js` and `src/tests/comparison.test.js` keep comparison as boundary metadata and prove adjective-like outputs, degree/question labels, translations, CSV rows, and single generated words are not confirmed comparison evidence.
- `src/core/nnc/names/names.js` and `src/core/analysis/analysis.js` expose non-generative personal-name and textual-analysis boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/nnc_names.test.js` and `src/tests/analysis.test.js` prove capitalization labels, proper-name translations, boundary metadata, topic/focus labels, bare `mah` strings, VNC/NNC outputs, and sentence/clause metadata are not confirmed personal-name or textual-analysis evidence.
- No `data/static_complements`, `data/static_conjunctions`, `data/static_comparisons`, `data/static_names`, `data/static_calendar`, `data/static_analysis`, or full denominal module was found.

Future implementation order:

1. Keep current denominal route support as partial Lessons 54-55 coverage.
2. Add category-first metadata/status tests with curriculum references for existing denominal route families before broadening behavior.
3. Keep `core/clause/complement` and `core/clause/conjunction` as non-generative AST/boundary metadata until confirmed Nawat/Pipil examples justify static data, parser/search detection, generation, or UI. Keep `core/comparison` as non-generative boundary metadata until confirmed examples justify data, schema, generation, or UI.
4. Propose a full denominal-family schema before adding suffix-family generation beyond current routes.
5. Keep `core/calendar`, `core/nnc/names`, and `core/analysis` as non-generative boundary metadata until confirmed Nawat/Pipil calendar/name/text examples justify data, schema, generation, or UI.
6. Reduce pending counts only after evidence-backed implementation and tests.

Candidate future schema questions, not implemented fields:

- `complementAst`: principalClause, complement, complementRole, object/subject/adverbial link, and diagnostics.
- `conjunctionAst`: conjuncts, marker, correlation, parallelism, lexicalizedResult, and diagnostics.
- `comparisonAst`: standard, target, relation, degree, dimension, marker, and diagnostics.
- `denominalFamily`: inceptive, stative, possession, temporal, causative, applicative, transitive, intransitive, or unknown.
- `denominalSource`: sourceState, sourceClass, sourcePossession, sourceRelation, sourceSurface, and evidenceRefs.
- `personalNameNnc`: sourceClauseType, nameSource, clauseSource, adjunctionSource, conjunctionSource, and evidenceRefs.
- `analysisIssue`: nonsystemicTense, irregularValence, absoluteTopic, agreementMismatch, incorporatedSubjectWarning, textualProblem, or unknown.

## Open Sections

- Lessons 1-4: foundations, orthography, particles, and clause formulas.
- Lessons 5-11: VNC basic status cleanup and sentence/irregular boundaries.
- Lessons 12-19: NNC basico.
- Lessons 20-27: derived-verb status cleanup and frequentative boundary.
- Lessons 28-34: compound-stem status cleanup and purposive/NNC/numeral boundary.
- Lessons 35-43: nominal formation status cleanup and modification AST boundary.
- Lessons 44-50: relational/adverbial status cleanup and clause-adjunction boundary.
- Lessons 51-58: clause/comparison/denominal/name/status cleanup and analysis boundary.
- Animacy-conditioned common and distributive plural behavior.
- Possessive behavior and allomorphy from Nawat/Pipil evidence.
