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

## Lessons 1-4 Foundation Boundary

Lessons 1-4 (`fundamentos`) are mostly architecture, notation, and clause-scope material. They are not ordinary generation targets by themselves.

Structural frame, using Andrews as analogy only:

- Lesson 1 organizes linguistic terminology, notation, and hierarchy.
- Lesson 2 organizes pronunciation and orthography.
- Lesson 3 organizes particles and their placement behavior.
- Lesson 4 introduces nuclear clause formulas and layered clause structure.

Current project boundary:

- Lesson 1 is partially represented by `core/concepts` concept and notation registry metadata. A visible glossary UI and external `data/concepts` file do not exist yet.
- Lesson 2 is partially represented by modern Nawat phonology, syllabification, phonotactics, and parser support.
- The current repo now has an orthography bridge metadata layer. It classifies Classical-looking spelling correspondences against the modern Nawat inventory, but it never authorizes Nawat/Pipil generation.
- Appendix F is partially represented by the same diagnostic orthography bridge. It is not an old-spelling normalizer and does not create fixture-backed aliases.
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
- `src/core/orthography/orthography.js` and `.mjs` expose diagnostic-only orthography-profile and bridge metadata.
- `src/appendices/registry.js` marks Appendix F partially implemented because that bridge exists, while `data/static_old_spellings` and a real old-spelling normalizer remain absent.
- `src/ui/state.js` can surface orthography bridge status in the calculator status area when an input looks Classical/older or lossy, without changing generation.
- `src/tests/orthography.test.js` proves that bridge correspondences remain non-generative and that lossy/morphology-sensitive cases stay blocked.
- `src/core/clause/clause.js` and `.mjs` expose diagnostic-only VNC/NNC nuclear-clause shell metadata.
- `src/core/generation/engine.js` attaches `nuclearClauseShell` to generated VNC and nominal outputs as diagnostic metadata.
- `src/ui/state.js` includes the current clause shell label in the calculator summary, and `src/ui/rendering/rendering.js` appends the diagnostic clause-shell formula label to generated output row metadata. These are display metadata only and do not drive generation.
- No visible `ui/glossary`, `data/concepts`, confirmed `data/static_particles`, visible particle mode, or `data/static_formulae` implementation was found.

Future implementation order:

1. Add a visible glossary UI only after deciding how concept registry entries should appear beside formula/output metadata.
2. Keep modern Nawat phonology separate from Classical/older orthography.
3. Keep the orthography bridge diagnostic-only until confirmed Nawat/Pipil aliases or fixture data authorize a narrower behavior; Appendix F status must remain partial until old-spelling data and normalization behavior exist.
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

Structural frame, using Andrews as analogy only:

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

Structural frame, using Andrews as analogy only:

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

Structural frame, using Andrews as analogy only:

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

Lessons 35-41 (`formacion nominal`) are partially represented by current Nawat/Pipil motors. Lessons 42-43 (`modificacion adjetival`) have diagnostic clause/modification boundary metadata only.

Structural frame, using Andrews as analogy only:

- Lesson 35 organizes VNC-to-NNC nominalization, preterit-agentive structures, restricted versus general-use nominal stems, ownerhood, and nominalized stems as compound embeds.
- Lesson 36 organizes additional nominalized VNC outputs: agentive, patientive, instrumentive, present/future agentive, and action/result nominalizations.
- Lesson 37 distinguishes deverbal nounstems from simple VNC reanalysis and introduces active-action, potential-patient, and passive-patientive categories. Lesson 37.9 specifically frames the passive patientive source as a passive VNC core.
- Lessons 38-39 continue the patientive nounstem taxonomy: impersonal VNC core, perfective active core, imperfective active core, root/stock, and later compound/embed/complement/object uses. The five source families are passive core, impersonal core, perfective active core, imperfective active core, and root/stock.
- Lessons 40-41 treat adjective as syntactic function. NNCs and VNCs may function adjectivally, but that does not make `adjetivo` a single formal nounstem class.
- Lessons 42-43 organize adjectival modification as a relationship between clauses or nuclei, including modifier/head order, preposing, marking, recursion, ambiguity with supplementation, and discontinuity.

Current project boundary:

- Current `sustantivo` outputs are real generated Nawat surfaces, but they do not prove complete coverage of Lessons 35-39.
- Current `adjetivo` outputs are real generated Nawat surfaces, but they do not prove a full adjectival-function or modification model for Lessons 40-43.
- Current generated nominal and adjectival outputs now expose derived `nominalizationProfile` metadata for output kind, source VNC tense, semantic role, patientive family, adjectival function, predicate state, subject connector, and future-boundary flags.
- `src/core/nnc/nominalization/nominalization.js` exposes Lessons 35-39 boundary metadata, structural questions, anti-conflation rules, and false-positive classifications for generated nominal surfaces, ownerhood, complete `z/liz` fixture coverage, and patientive-family claims.
- `src/core/nnc/adjectival/adjectival.js` exposes non-generative Lessons 40-41 adjectival NNC function boundary metadata. Current `adjetivo` route surfaces and `nominalizationProfile.adjectivalFunction` labels are generated output/metadata only, not a complete adjective-function engine.
- The profile records `categoryTransition: VNC -> NNC` with `process: "structural-nominalization"` so the category shift is explicit without creating a lesson-specific engine.
- The generated-output profile marks `boundaries.nominalizationScope = "structural-word-output"` and `isFunctionalSupplementation = false`: current motors model structural word output, not sentence-level functional nominalization or supplementation.
- Rendering may show this as `Ambito: estructural`; that label is derived display, not a generation rule.
- Patientive outputs now derive `patientiveFamilyProfile` from the existing `patientivoSource` branch. This records the current source-family boundary for `nonactive`, `perfectivo`, `imperfectivo`, and `tronco-verbal` under the Andrews Lessons 37.9-39 engine taxonomy.
- The current `nonactive` branch remains available as legacy/shared route metadata, but explicit `passive` and `impersonal` patientivo source requests now preserve Andrews' separate source-core categories in `patientiveFamilyProfile`.
- Explicit `passive` and `impersonal` patientivo requests currently realize through the same Nawat nonactive derivation builder. That is a shared builder boundary, not a collapse of the Andrews grammar categories.
- Andrews 37.9, 37.9.2, and 37.9.3 are now enforced as generation behavior: an explicit `passive` patientivo request is rejected when the ultimate source is intransitive. For single-object transitive sources, explicit passive patientivo clears nonspecific `ta`/`te` from the generated nounstem while retaining Nawat reflexive `mu` when the passive source is reflexive. For double-projective sources, the generated nounstem keeps exactly one selected Nawat projective (`ta` or `te`) and drops the other projective marker; when selected `te` is present, it also offers the Andrews 37.9.3 deleted-`te` nounstem variant. This matches Andrews' "only one object pronoun" passive-patientive rule without forcing every double-projective source to `ta`.
- Andrews 38.1, 38.1.2, 38.1.3, and 38.1.4 are also enforced: an explicit `impersonal` patientivo request may use an intransitive source; a reflexive source keeps Nawat `mu`; a transitive `ta` source keeps the `ta` pattern; a single-object mainline `te` source maps to the impersonal `ta` pattern instead of generating a human-object `te` patientive nounstem, while a double-projective `te+ta` source preserves `te+ta` because shuntline `ta` already marks the nonhuman patient.
- Andrews 39.1-39.2 are enforced for the currently implemented perfective/imperfective patientive branches: perfective patientive generation now requires an Andrews-allowed perfective active core ending in Nawat orthography (`w`, `k`, `kw`, `s`, `sh`, `n`, `j/h`, `l`, `tz/ts`, with legacy `c/qu/x/z` tolerated as equivalent analysis spellings). Invalid perfective-core endings such as `t` or `ch` are rejected instead of silently generating patientive nouns. When a single-object `te` source is generated through the impersonal-like patientive path, the output uses the Nawat `ta` pattern (`taketzti`, `tamatiyat`) instead of retaining `te` (`teketzti`, `tematiyat`). Possessive-state patientive output treats consonant-final `(...C)ti` as a tli-class connector and drops that connector in the possessed nounstem (`taketzti` -> `nutaketz`) rather than requiring a route label or a manual zero-ownership override.
- Andrews 39.3 characteristic-property output is enforced in the current `calificativo-instrumentivo` motor as Nawat `-yu-t` in absolutive state and `-yu` in possessive state. The possessed output keeps the characteristic-property matrix and drops only the absolutive `t` connector (`mikkayut` -> `numikkayu`), instead of collapsing the nounstem to the bare predicate core (`numikka`).
- Andrews 39.4 is enforced for root/stock patientive output: the branch may still expose multiple stock consonant variants where Andrews says the choice is no longer recoverable from surface grammar, but generated noun output is restricted to the Nawat tli-class connector (`(...V)t`, `(...C)ti`). Bare stock stems remain available only when explicitly requested as route-composition stems, and `#3 salida` rejects zero/`in` class spillover for root/stock patientives instead of advertising it.
- Andrews' nonactive-source suffix contract is enforced in generation with Nawat orthography: Classical `lo`, `lo-hua`, `o`, `o-hua`, and `hua-lo` source families map to Nawat nonactive `lu`, `luwa`, `u`, `uwa`, and `walu` patientive outputs that are locked to the generated tli-class connector (`(...V)t` or `(...C)ti`). They no longer spill into unrequested zero or `in` nominal outputs. Classical `hua` maps to Nawat `wa` and remains locked to the generated `t` connector on the resulting vowel-final stem.
- Andrews 37.2-37.4 active-action `z/liz` now reaches the current Nawat `sustantivo-verbal` motor as Nawat `s/lis`: generated action nouns derive from the future core, root-plus-`ya` alternates keep a visible active-action nominalizer instead of leaking bare VNC stems, the short `-s` subtype is restricted to `i`-final stems, and active-action output is common-number only. The generated `-s/-lis` material is predicate nominalizer material, not the NNC subject-number connector; the generated NNC shell keeps `num1-num2` as `Ø`.
- Route specs keep `passive` and `impersonal` on the nonactive-core route instead of resolving them as active imperfective sources. Dynamic patientive V->S surface routes ask `#3 salida` for the generated patientive noun instead of reconstructing the noun from route text plus a static suffix; this preserves generated behavior such as active imperfective `te` sources mapping to the `ta` patientive pattern. When the generated patientive branch rejects the source, the route no longer reconstructs a static suffix output.
- Andrews 39.6 now has engine contracts for patientive nounstems as compound embeds. `buildPatientivoCompoundEmbedContinuationContract()` strips the generated patientive connector from the `#3 salida` noun surface, uses only Nawat data-backed verbal matrix roots, and builds a real compound VNC input. The first supported verbal matrix is Nawat `miki` for Classical `(miqui)`, producing inputs such as `(tamatiya/miki)` and generated finite output `tamatiyamiki`; unsupported verbal matrices remain diagnostic. `buildPatientivoNominalCompoundContinuationContract()` does the same for nominal-matrix compounds through the current ordinary NNC generator. The first supported nominal matrix is Nawat `kal` for Classical `(cal)-li`, producing an ordinary NNC input such as `(tamatiyakal)` and output `tamatiyakal` as an open-stem compound, not as new fixture evidence.
- Andrews 39.7-39.8 are enforced as an engine contract for the current pre-locative/incorporated-root destination: `buildPatientivoPrelocativeContinuationContract()` derives the incorporated nounstem from the patientive noun generated by `#3 salida`, maps an absolutive-source NNC subject directly into the prelocative verb's object slot through the subject/object inventory, and maps a possessive-source NNC possessor through `POSSESSIVE_TO_OBJECT_PREFIX` into the same outside object slot. The absolutive path does not route through possessive-prefix metadata. The same contract now exposes a source-compatible matrix inventory instead of accepting arbitrary matrix roots as Andrews-backed: `ita`, `mati`, `neki`, and `tuka` are Nawat data-backed absolutive-source incorporated-complement matrices for Andrews 39.7/30.15; `tajtani` for Classical `tla-(tlani)` is the default supported matrix and is allowed for absolutive and possessive sources; `tuka` also remains allowed for the 39.7 possessive-source object-complement path; Nawat data-backed 39.8 matrices `tatajtania` for Classical `tla-(ih-tlani)` and `temua` for `tla-(tem-o-a)` are possessive-source only. The old `ni` route is no longer accepted as an Andrews 39.7-39.8 patientive continuation matrix. Unsupported matrix roots and matrix/source-state mismatches remain diagnostic. The UI consumes that contract inside the generated patientive row in `#3 salida`, where supported matrix continuations render as explicit output actions; mixed or unmapped possessor choices remain unavailable instead of guessed.
- Andrews 39.9 now has an output-stage generation contract for characteristic-property patientive nounstems: `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` reads a generated characteristic-property surface from `#3 salida`, removes the Nawat `-yut` absolutive matrix or the Nawat possessive `-yu` matrix as the local counterpart of Andrews' `(-yo)-tl-` omission, and builds a real incorporated-object VNC input with a Nawat data-backed matrix. The first supported matrix is `chikawa`, grounded in repo evidence such as `-yulchikawa`; for example `mikkayut` becomes `-(mikka/chikawa)` and generates `kimikkachikawa`, while possessed `numikkayu` omits `-yu`, promotes `nu-` through the object inventory, and generates `nechmikkachikawa`. Non-`-yut` surfaces without an explicit supported possessor remain diagnostic, not guessed.
- Rendering may show `Fuente patientiva: ...`, `Familias Andrews: ...`, `Etapa salida: #3 salida`, and `Taxonomia patientiva: parcial`; those labels are derived from `patientiveFamilyProfile` and do not create new patientive forms.
- `nominalizationProfile` is explanatory metadata only. It does not add forms, does not complete Lessons 35-41, and does not implement Lessons 42-43 modification.
- Current Lessons 42-43 adjectival-modification metadata distinguishes `adjetivo` route outputs, `nominalizationProfile`, ordinary NNC `formulaSlots`, and translation adjectives from confirmed modifier/head clause evidence. It does not add forms and does not change NNC, VNC, or adjective-like word generation.
- Lesson 35 ownerhood and preterit-agentive restricted/general-use stem logic are boundary-classified only; they are not implemented as generation.
- Lesson 37 `z/liz` active-action nounstems have a current Nawat `s/lis` generation contract through `sustantivo-verbal`; complete fixture-backed `z/liz` coverage remains pending.
- Patientivo branches are substantially implemented as Nawat generated surfaces, and the Andrews-aligned source-core taxonomy is now explicit in output metadata. The taxonomy remains partial because passive and impersonal currently share the same Nawat nonactive realization builder and compound/embed/complement/object uses are not generated.
- Adjectival modification must not be forced into ordinary NNC `formulaSlots`.
- Topic, modification, and supplementation must remain clause/sentence-level relations unless a confirmed Nawat/Pipil example proves a narrower word-level behavior.

Evidence boundary:

- Local Andrews source check: the PDF headings for Lessons 35-41 were found at PDF pages 334, 354, 371, 382, 391, 410, and 421. This supports treating the span as one nominal-formation checkpoint while keeping implementation category-first.
- `data/static_groups.json` exposes `sustantivo` tenses: `sustantivo-verbal`, `agentivo`, `patientivo`, `instrumentivo`, `calificativo-instrumentivo`, and `locativo-temporal`.
- `data/static_groups.json` exposes `adjetivo` tenses and route surfaces, including active adjective-like outputs and patientivo adjective outputs.
- `data/static_modes.json` contains patientivo surface routes and denominal/adjectival conversion routes, but not a full Lessons 35-43 grammar schema.
- Existing tests prove selected generated outputs such as agentivo suffix behavior, patientivo surfaces, instrumentivo direct/generated parity, locativo-temporal output, and adjective-route surfaces.
- Existing tests now prove selected direct/generated `nominalizationProfile` metadata without treating the metadata as a generator.
- Existing tests now prove the current patientivo branches enforce the passive/impersonal source distinction, the perfective/imperfective `te`→`ta` patientive analogy, the Andrews perfective-core ending gate, root/stock tli-class output, dynamic V->S patientive route output, the absolutive-only gate for current incorporated-root patientive continuation, and the Andrews nonactive suffix contract: passive core rejects intransitive sources, clears single-object `ta`/`te`, keeps reflexive `mu`, and keeps exactly one selected projective (`ta` or `te`) from double-projective sources and permits the deleted-`te` alternate when the selected projective is `te`; impersonal core permits intransitive sources, keeps `ta`, maps mainline `te` to the `ta` pattern when no shuntline `ta` already marks the nonhuman patient, while preserving `te+ta` when shuntline `ta` is present; perfective patientive accepts allowed endings such as `tz` but rejects invalid `t`/`ch` cores; root/stock patientive keeps explicit route stems available while noun output excludes and rejects `in` spillover; perfective/imperfective patientive branches map mainline `te` to `ta`; dynamic patientive V->S routes use `#3 salida` for the final noun surface instead of static route-suffix reconstruction; current incorporated-root continuation requires a generated absolutive patientive output; legacy nonactive remains shared passive+impersonal; nonactive source suffix families no longer generate zero/`in` spillover when Andrews assigns tli-class patientive output; and route specs preserve passive/impersonal as nonactive-core sources.
- `src/tests/nnc_nominalization.test.js` proves current generated nominal surfaces and patientive-family metadata are not treated as complete ownerhood, complete `z/liz` fixture coverage, or full patientive-family evidence.
- `src/tests/nnc_adjectival.test.js` proves current `adjetivo` route output and `nominalizationProfile.adjectivalFunction` remain unconfirmed full adjectival NNC function evidence.
- `src/tests/module_wrapper_parity.test.js` verifies the checkpoint-touched generated module wrappers stay in sync with their JS sources, so nominalization metadata does not drift between browser and module runtimes.
- `src/core/clause/modification/modification.js` exposes non-generative adjectival-modification boundary metadata, structural questions, and false-positive classifications.
- `src/tests/modification.test.js` proves `adjetivo` route output and `nominalizationProfile` remain unconfirmed modification-AST evidence.
- Existing generated examples must not be treated as complete evidence for Andrews-derived Classical categories, complete `z/liz` fixture coverage, ownerhood forms, or modification syntax.
- Andrews/Classical examples are structural prompts only, not Nawat/Pipil fixture data.

Future implementation order:

1. Record current Lessons 35-41 motors as partial coverage without marking the group complete.
2. Keep `nominalizationProfile` as the current category-first metadata foundation for generated nominal/adjectival outputs, with lesson ranges kept only as curriculum references.
3. Gather confirmed Nawat/Pipil examples before adding generation for Lesson 35 ownerhood, complete Lesson 37 deverbal `z/liz` fixture coverage beyond the current `s/lis` active-action motor, or new patientive family fixtures.
4. Treat the current `patientiveFamilyProfile` as a partial output-stage taxonomy over current branches. Passive and impersonal source cores are now distinct generation/routing categories; gather evidence before giving them distinct Nawat surface realization or adding new patientive families or fixtures.
5. Keep `core/nnc/adjectival` as non-generative boundary metadata until confirmed Nawat/Pipil examples justify an adjectival NNC function data model or generation.
6. Keep `core/clause/modification` as non-generative boundary metadata until confirmed Nawat/Pipil modifier/head clause examples justify AST schema, diagnostics, generation, or UI.
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

Lesson 44 (`clausulas adverbiales nucleares`) has one current Nawat/Pipil-adjacent adverbial output surface and diagnostic adverbial nuclear-clause boundary metadata. Lessons 45-47 have diagnostic relational-NNC boundary metadata only. Lesson 48 has diagnostic place-name/gentilic NNC boundary metadata only. Lessons 49-50 have diagnostic adverbial-adjunction boundary metadata only.

Structural frame, using Andrews as analogy only:

- Lesson 44 organizes adverbial nuclear clauses, degrees of adverbialization, adverbialized VNCs, adverbialized NNCs, particle-looking NNCs, and possessive-state adverbialized NNCs.
- Lessons 45-47 organize relational NNCs, relational nounstem usage options, locative/directional/frequency relational stems, associated-entity NNCs, and pertinency NNCs.
- Lesson 48 organizes place-name NNCs, gentilic NNCs, gentilic collectivity, and profession/place associations.
- Lessons 49-50 organize adverbial modification and adjoined clause units by time, place, manner, consideration, purpose, concession, consequence, proviso, and reason.

Current project boundary:

- `pasado-remoto-adverbio-activo` is a real generated adverbio surface, but it does not implement the full Lesson 44 adverbial NNC/VNC system.
- Current Lesson 44 adverbial nuclear-clause metadata distinguishes the legacy adverbio surface, adverb translations, particle labels, and ordinary NNC/VNC outputs from confirmed adverbial NNC/VNC or clause evidence. It does not add forms and does not change adverbio, NNC, or VNC generation.
- Generated legacy adverbio rows can carry diagnostic `adverbialNuclearFrame` metadata derived from the current output context: source VNC stem, source valency, known legacy adverbio tense, and manner-surface scope. This is a teaching/display layer only and does not make Lesson 44 data-complete.
- Current route metadata intentionally keeps the legacy adverb output outside the linked output-composition surface.
- Current Lessons 45-47 relational-NNC metadata distinguishes ordinary NNC fixtures/open stems, locative-temporal nominal outputs, route labels, place/preposition translations, and static roadmap markers from confirmed relational NNC evidence. It does not add forms and does not change ordinary NNC, nominalization, route, or VNC generation.
- Generated `locativo-temporal` nominal rows can carry diagnostic `relationalNncBoundaryFrame` metadata derived from the current output context. This frame is explicitly negative evidence-boundary metadata: it records the row as a locative-temporal generated candidate, not as confirmed relational-NNC fixture data.
- Current Lesson 48 place/gentilic metadata distinguishes ordinary NNC fixtures/open stems, relational boundary metadata, locative-temporal nominal outputs, place/profession/gentilic translations, route labels, CSV verb rows, and calendar roadmap text from confirmed place-name or gentilic NNC evidence. It does not add forms and does not change ordinary NNC, relational, nominalization, route, or VNC generation.
- Generated `locativo-temporal` nominal rows can also carry diagnostic `placeGentilicNncBoundaryFrame` metadata derived from the current output context. This frame records the row as a locative-temporal generated candidate, not as confirmed place-name or gentilic fixture data.
- Current Appendix E calendar-name metadata distinguishes roadmap text, date labels, personal-name metadata, and place/gentilic metadata from confirmed day, month, year, or cycle-name evidence. It does not add forms and does not change ordinary NNC, personal-name, or place/gentilic generation.
- Current Lessons 49-50 adverbial-adjunction metadata distinguishes the legacy adverbio surface, Lesson 44 adverbial metadata, relational/place boundary metadata, particle labels, route labels, translations, CSV verb rows, and single generated words from confirmed adjoined-unit or clause-adjunction evidence. It does not add forms and does not change adverbio, NNC, VNC, relational, place/gentilic, or route generation.
- Generated legacy adverbio and `locativo-temporal` rows can carry diagnostic `adverbialAdjunctionBoundaryFrame` metadata derived from the current output context. This frame records the row as a single generated-word candidate, not as confirmed adjoined-unit or clause-adjunction data.
- No relational NNC fixture data or relational NNC generation engine exists yet.
- No place-name, gentilic, calendar-name, or profession/gentilic fixture data or generation engine exists yet.
- No clause-adjunction AST, static adverbial-adjunction data, or adjoined-unit generation exists yet.
- Do not infer relational or adverbial clause behavior from ordinary NNC/VNC outputs, labels, or translations alone.
- Do not treat adverbial particles, relational labels, place names, or English/Spanish preposition translations as confirmed Nawat/Pipil fixtures without source-backed data.

Evidence boundary:

- `data/static_groups.json` exposes Adverbio with only `pasado-remoto-adverbio-activo`.
- `data/static_labels.json` labels `pasado-remoto-adverbio-activo` as an adverbio derived from a preterit-agentive/manner-like output.
- Existing tests prove `pasado-remoto-adverbio-activo` generates selected surfaces such as `matka`, `matika`, `tamatka`, and `tamatika`, and rejects zero-object transitive adverb generation.
- `src/tests/morphology_engine.test.js` and `src/tests/ui.test.js` prove generated adverbio rows expose diagnostic `adverbialNuclearFrame` metadata and labels while preserving those surfaces.
- Existing tests also prove the legacy adverb tense remains outside the Nawat route inventory.
- `src/lessons/registry.js` marks Lessons 44-50 partially implemented.
- `src/ui/curriculum/curriculum.js` records Lesson 44, Lessons 45-47, Lesson 48, and Lessons 49-50 boundary rows as partial, and the relational/place/gentilic/adverbial-adjunction data rows as missing.
- `src/core/clause/adverbial/adverbial.js` exposes non-generative adverbial nuclear-clause boundary metadata, known legacy adverbio tense, structural questions, and false-positive classifications.
- `src/tests/adverbial.test.js` proves `pasado-remoto-adverbio-activo` remains an unconfirmed full Lesson 44 engine and that adverb translations are not adverbial-clause evidence.
- `src/core/nnc/relational/relational.js` exposes non-generative relational-NNC boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/nnc_relational.test.js` proves locative-temporal nominal outputs, preposition/place translations, static labels, and roadmap markers are not confirmed relational NNC evidence.
- `src/tests/nnc.test.js` and `src/tests/ui.test.js` prove generated `locativo-temporal` rows expose diagnostic `relationalNncBoundaryFrame` metadata and labels while preserving the existing `nemiyan` surface.
- `src/core/nnc/place_gentilic/place_gentilic.js` exposes non-generative place-name/gentilic NNC boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/nnc_place_gentilic.test.js` proves locative-temporal nominal outputs, place/profession/gentilic translations, CSV verb rows, calendar roadmap text, and relational metadata are not confirmed place-name or gentilic evidence.
- `src/tests/nnc.test.js` and `src/tests/ui.test.js` prove generated `locativo-temporal` rows expose diagnostic `placeGentilicNncBoundaryFrame` metadata and labels while preserving the existing `nemiyan` surface.
- `src/core/calendar/calendar.js` exposes non-generative Appendix E calendar-name boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/calendar.test.js` proves calendar roadmap text, personal-name boundaries, and place/gentilic boundaries remain unconfirmed calendar-name evidence.
- `src/core/clause/adjunction/adjunction.js` exposes non-generative adverbial-adjunction boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/adjunction.test.js` proves single generated words, translations, adverbio output, and boundary metadata are not confirmed clause-adjunction evidence.
- `src/tests/morphology_engine.test.js`, `src/tests/nnc.test.js`, and `src/tests/ui.test.js` prove generated adverbio and `locativo-temporal` rows expose diagnostic `adverbialAdjunctionBoundaryFrame` metadata and labels while preserving existing surfaces.
- No `data/static_relational_nnc`, `data/static_places`, `data/static_gentilics`, `data/static_calendar`, `data/static_adverbial_adjunction`, or clause-adjunction AST implementation was found.

Future implementation order:

1. Keep `core/clause/adverbial` as non-generative boundary metadata until confirmed Nawat/Pipil adverbial NNC/VNC or clause examples justify data, schema, generation, or UI.
2. Keep Lesson 44 adverbio surface support separate from full adverbial NNC/VNC modeling.
3. Keep `core/nnc/relational` as non-generative boundary metadata until confirmed Nawat/Pipil relational NNC examples justify data, schema, generation, or UI.
4. Keep `core/nnc/place_gentilic` as non-generative boundary metadata until confirmed Nawat/Pipil place/gentilic examples justify data, schema, generation, or UI.
5. Keep `core/calendar` as non-generative boundary metadata until confirmed Nawat/Pipil calendar-name examples justify data, schema, generation, or UI.
6. Keep `core/clause/adjunction` as non-generative boundary metadata until confirmed Nawat/Pipil adjoined-unit or clause examples justify data, schema, generation, or UI.
7. Reduce pending counts only after evidence-backed implementation and tests.

Candidate future schema questions, not implemented fields:

- `adverbializationKind`: VNC, NNC, particle-looking, possessive-state, or unknown.
- `adverbialDegree`: first-degree, second-degree, lexicalized, or unknown.
- `relationalStem`
- `relationalOption`: one, two, three, four, or unknown.
- `relationRole`: location, direction, frequency, association, pertinency, or unknown.
- `placeNameSource`
- `gentilicSource`
- `adverbialAdjunctionAst`: principalClause, adjoinedUnit, semanticRelation, order, marker, scope, recursion, and diagnostics.

## Lessons 51-58 Clause, Denominal, Names, And Miscellany Boundary

Lessons 51-53 have diagnostic boundary metadata for complementation, conjunction, and comparison. Lessons 54-55 (`denominales`) have partial Nawat/Pipil support through current route profiles and source-state metadata. Lesson 56 has diagnostic personal-name NNC boundary metadata. Lessons 57-58 have diagnostic textual-analysis/miscellany boundary metadata.

Structural frame, using Andrews as analogy only:

- Lesson 51 organizes complementation: object complements, subject complements, adverbial complements, and double-nucleus structures.
- Lesson 52 organizes conjunction, marked and unmarked conjunction, correlative conjunction, lexical innovation by conjunction, and parallel structure.
- Lesson 53 organizes similarity and comparison, including equality, size, comparative degree, superlative degree, and comparison questions.
- Lessons 54-55 organize denominal verbstem families, including inceptive/stative suffixes, possession-related denominals, causative/applicative derivations from denominal stems, temporal suffixes, and transitive/intransitive denominal routes.
- Lesson 56 organizes personal-name NNCs from single-clause, adjunction, and conjunction sources.
- Lessons 57-58 collect nonsystemic tense use, irregular valence, absolute topic, agreement mismatch, adverbial NNCs as supplements, problematic constructions, exclamations, `mah` constructions, incorporated-noun subject warnings, and textual problems.

Current project boundary:

- Current denominal routes are real engine behavior, but they do not complete the full Lessons 54-55 suffix-family inventory.
- Current source-state metadata describes supported route provenance; it is not a full denominal grammar schema.
- Current `data/static_modes.json` route profiles explicitly configure the supported denominal families (`vi-ti`, `vi-iwi`, `vi-awi`, and `vt-na`) and their structural analogues. Source-state and generated-output `denominalFamilyProfile` metadata derive from that route data and mark `routeProfileSource: "static-modes"` when configured data is available. `getNawatDenominalRouteFamilyInventory()` exposes the configured family inventory as partial, route-based metadata. `generateNawatDenominalRouteFamilyPreview()` links the configured source, stem, verbalizer, target verb, finite surface, and trail stages for a source input so a generated stage can be inspected as a next source. Each preview stage carries a `nextSource` candidate with input/mode/tense context for later composition, `buildNawatLinkedGrammarPathStageGenerateWordRequest()` converts a stage into a direct generation request, `executeNawatLinkedGrammarPathStage()` executes that request while returning linked-path provenance, `previewNawatLinkedGrammarPathNextSource()` previews the supported route-family candidates for that next source without executing it or mutating state, `previewNawatLinkedGrammarPathChain()` composes an explicit user-selected sequence of stages into a chain preview, `buildNawatLinkedGrammarPathSelectionSummary()` exposes the current source plus appendable next route/stage choices without executing stages, selection-state helpers can store/clear/backtrack an explicit selected stage chain without executing it, and `executeNawatLinkedGrammarPathChain()` executes the selected stage sequence while preserving linked-path provenance. The visible linked-path surface is now dynamic output composition inside `#3 SALIDA`, not a separate `ruta nawat` rail: reusable stages show `Siguiente fuente`, `Salida de etapa`, and `Continuaciones`; selected-path helpers show `Fuente actual`, `Opciones siguientes`, and `Siguiente salida`. That output surface can display appendable next choices with explicit `seguir` actions that store the chosen next route without replacing the station-travel action or executing a generated stage; selected chains can then render as `Trayecto` plus current-source/next-option labels, `atrás` can remove the last selected stage, `borrar` can clear the chain, `generar trayecto` can execute the stored chain on request, `usar etapa N` can promote any executed stage's generated surface as the next linked-path source while retaining wrapped source-input provenance, `usar salida` can promote the final generated surface as the next linked-path source and synchronize it into the visible input only for that explicit action, and the selected-path summary can offer multiple `seguir` choices again from that promoted/current source. These are still route-based outputs, not a complete denominal-family engine. Rendering may show `Familia denominal`, `Verbalizador denominal`, and `Cobertura denominal: parcial` from that metadata.
- Current Lesson 51 complement metadata distinguishes VNC/NNC outputs, object controls, subject labels, nominalization profiles, translations, CSV verb rows, and single generated words from confirmed complement-clause evidence. It does not add forms and does not change valency, VNC, NNC, or nominalization generation.
- Current Lesson 52 conjunction metadata distinguishes parser separators, slash/CSV variants, particle labels, translations, route labels, and single generated words from confirmed conjunction evidence. It does not add forms and does not change parser, VNC, NNC, or route behavior.
- Current Lesson 53 comparison metadata distinguishes adjective-like outputs, adjectival-modification metadata, degree/question labels, translations, CSV verb rows, and single generated words from confirmed comparison evidence. It does not add forms and does not change adjective, NNC, or VNC generation.
- Current Lesson 56 personal-name NNC metadata distinguishes ordinary NNC fixtures/open stems, capitalization labels, proper-name translations, place/gentilic metadata, adjunction/conjunction metadata, and calendar roadmap text from confirmed personal-name NNC evidence. It does not add forms and does not change ordinary NNC, place/gentilic, adjunction, conjunction, or calendar-name generation.
- Current Lessons 57-58 analysis metadata distinguishes VNC/NNC outputs, sentence-layer metadata, clause-shell metadata, parser labels, topic/focus UI labels, bare `mah` strings, translations, and CSV verb rows from confirmed textual-analysis or miscellany evidence. It does not add forms and does not change VNC, NNC, parser, sentence-layer, or clause-shell behavior.
- No complement AST, conjunction AST, comparison AST, personal-name NNC generation, calendar-name generation, textual-analysis engine, or miscellany engine exists yet.
- Do not force Lessons 51-53 or 57-58 into existing VNC/NNC word generation.
- Do not treat personal-name forms, comparison translations, `mah` constructions, or textual diagnostics as ordinary NNC fixtures without confirmed Nawat/Pipil examples and a schema.
- Do not import Andrews/Classical examples as Nawat/Pipil forms.

Evidence boundary:

- `data/static_modes.json` contains denominal route profiles for `-ti`, `-iwi`, `-awi`, and `-na` routes, with validated `denominalFamily` and `structuralAnalogue` fields.
- Existing route/state and morphology tests prove denominal source-state metadata, generated-output `denominalFamilyProfile`, route-family inventory metadata, linked route previews, station models, finite outputs, and unchanged generated surfaces for selected examples.
- Existing morphology tests prove selected denominal route outputs such as `pusuktik`, `pusuktituk`, `pusuknaj`, and `pusuknajtuk`.
- `src/lessons/registry.js` marks Lessons 51-58 partially implemented.
- `src/ui/curriculum/curriculum.js` marks Lesson 51 complement boundary, Lesson 52 conjunction boundary, Lesson 53 comparison boundary, `54-55 · denominal pleno y familias de sufijos`, Lesson 56 personal-name boundary, and Lessons 57-58 analysis boundary partial while the data/AST rows remain missing.
- `src/core/clause/complement/complement.js`, `src/core/clause/conjunction/conjunction.js`, and `src/core/comparison/comparison.js` expose non-generative boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/complement.test.js`, `src/tests/conjunction.test.js`, and `src/tests/comparison.test.js` prove current VNC/NNC outputs, parser separators, labels, translations, CSV rows, adjective-like outputs, and single generated words are not confirmed complement, conjunction, or comparison evidence.
- `src/core/nnc/names/names.js` and `src/core/analysis/analysis.js` expose non-generative personal-name and textual-analysis boundary metadata, structural questions, anti-conflation rules, and false-positive classifications.
- `src/tests/nnc_names.test.js` and `src/tests/analysis.test.js` prove capitalization labels, proper-name translations, boundary metadata, topic/focus labels, bare `mah` strings, VNC/NNC outputs, and sentence/clause metadata are not confirmed personal-name or textual-analysis evidence.
- No `data/static_complements`, `data/static_conjunctions`, `data/static_comparisons`, `data/static_names`, `data/static_calendar`, `data/static_analysis`, or full denominal module was found.

Future implementation order:

1. Keep current denominal route support as partial Lessons 54-55 coverage.
2. Add category-first metadata/status tests with curriculum references for existing denominal route families before broadening behavior.
3. Keep `core/clause/complement`, `core/clause/conjunction`, and `core/comparison` as non-generative boundary metadata until confirmed Nawat/Pipil examples justify data, schema, generation, or UI.
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
