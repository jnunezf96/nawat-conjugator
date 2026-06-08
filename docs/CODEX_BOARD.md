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
- Andrews is lesson-per-lesson; the UI/engine is not. Use lessons as curriculum/status and evidence indexes, then implement reusable grammar categories, slot metadata, diagnostics, and controls.
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

- Lesson 15 (`posesion natural y casos de estado`) remains pending and evidence-sensitive as a data-complete curriculum row, but it now has one real Andrews-driven engine contract.
- Current engine behavior supports ordinary possessive state, possessor prefixes, fixture-backed possessive forms, unsupported possessive diagnostics, and `categoryProfile.possessiveState` availability metadata.
- Andrews 39.3.4 organic/integral possession is implemented as opt-in ordinary NNC generation: `possessionKind: "organic"` requires possessive state and a possessor, adds Nawat `-yu` to the predicate stem, and can generate open-stem outputs such as `naka` + `nu` -> `nunakayu`.
- Current confirmed possessive examples (`kal`, `shuchi`/`shuchit`, `mistun`) prove ordinary possessive forms only. They do not prove natural, inalienable, or obligatory possession.
- Current absolutive-only fixtures (`tukayit`, `a`/`at`, `machiyut`, `majmachiyut`) prove unsupported possessive diagnostics only. They do not prove Lesson 15 possessive-unavailable classes.
- No fixture schema field yet distinguishes ordinary optional possession, natural possession, required/obligatory possession, possessive-only nouns, absolutive-unavailable nouns, or special state alternation cases.
- Do not add fixture-backed natural-possession rows, `requiresPossessor`, or broader state-case metadata until confirmed examples and a schema proposal exist.
- Open-stem examples and Andrews-only analogies are not Lesson 15 evidence.

Future path:

1. Confirm Nawat/Pipil examples.
2. Propose a possession/state-case schema.
3. Add validation and tests.
4. Add engine metadata/diagnostics.
5. Add UI labels/gating only after metadata exists.

## Boundary: Lesson 16 Pronominal NNC Evidence

Date: 2026-06-06

Decision:

- Lesson 16 (`inventario NNC pronominal`) remains pending and evidence-sensitive.
- The repo has a future placeholder for `pronominal-nnc`, but no working pronominal NNC engine or fixture file.
- `data/static_nnc.json` remains ordinary NNC fixture data only.
- Pronoun/agreement labels such as `naja`, `taja`, `yaja`, `tejemet`, `anmejemet`, and `yejemet` are not confirmed pronominal NNC fixture outputs.
- `ajaka`, `tajtatka`, `muchi`, and `isel` are not confirmed pronominal NNC fixtures.
- Andrews supplies only the structural categories: pronominal NNC family, absolutive-state-only behavior, entitive and quantitive families, and personal/interrogative/indefinite/demonstrative entitive subtypes.
- Interrogative pronominal NNCs must not be treated as English-style relative pronouns.
- Ordinary nounstem classes and ordinary NNC `formulaSlots` must not be automatically applied to pronominal NNCs without a design decision and confirmed Nawat/Pipil examples.
- Future implementation likely needs either a parallel slot model or an explicit `nncKind: "pronominal"` extension of `formulaSlots`.

Future path:

1. Confirm Nawat/Pipil pronominal NNC examples.
2. Propose a pronominal NNC schema.
3. Add validation rules.
4. Add engine metadata/diagnostics.
5. Add UI labels/gating only after metadata exists.
6. Reduce pending counts only after implementation and tests.

## Boundary: Lessons 17-19 Supplementation And Topic Evidence

Date: 2026-06-06

Decision:

- Lessons 17-19 (`suplementacion y topico`) remain pending and evidence-sensitive.
- No confirmed Nawat/Pipil clause examples showing supplementation or topic relations were found in the repo.
- Current parser, search, rendering, NNC, and VNC support ordinary word outputs and metadata, not sentence-level supplementation.
- Roadmap/future syntax markers such as `futureSyntaxLayer: ["pronominal-nnc", "supplementation", "included-referent-clause"]` are placeholders only.
- Supplementation is treated as clause/sentence-level architecture: a multiple-nucleus or appositional relation between a pronominal head and an adjoined supplement.
- Possible future roles include supplementary subject, object, and possessor.
- Possible future relation types include shared-referent and included-referent supplementation.
- Marked or topic-like supplementation, discontinuity, and agreement mismatch require clause/sentence metadata, not ordinary word generation.
- VNCs may function structurally as supplements, but current VNC rows and generated outputs are not supplementation evidence by themselves.
- Do not force supplementation into ordinary NNC `formulaSlots`.
- Do not make topic a `nounClass`, `sourceKind`, or ordinary NNC reference/plural type.
- Do not infer supplementation from pronoun/agreement labels, parser compound examples, UI topic/focus wording, translation labels, VNC paradigm rows, or Andrews/Classical forms.
- Pronominal NNCs are not implemented yet, so future supplementation work must not depend on unimplemented pronominal-NNC behavior.

Future path:

1. Confirm Nawat/Pipil clause examples.
2. Propose a supplementation/topic example schema.
3. Design parser/search metadata.
4. Add diagnostics and tests.
5. Add UI representation only after metadata exists.
6. Reduce pending counts only after implementation and tests.

Candidate schema questions to revisit later:

- `principalClause`
- `supplement`
- `headRole`: subject, object, possessor, or unknown.
- `supplementType`: NNC, VNC, sentence, or unknown.
- `referentRelation`: shared, included, or unknown.
- `marking`: unmarked, marked, topic-like, or unknown.
- Discontinuity/spans.
- Agreement mismatch diagnostics.

## Boundary: Lessons 1-4 Foundations

Date: 2026-06-06

Decision:

- Lesson 1 now has diagnostic-only concept and notation registry metadata through `core/concepts`.
- Lesson 3 now has diagnostic-only particle-placement metadata through `core/particles`.
- Broader formula/glossary/particle UI remains placeholder or missing, not generation engines.
- Lesson 2 has partial modern Nawat phonology/syllable support.
- Lesson 2 now has an orthography bridge metadata layer for Classical-looking spelling correspondences.
- The orthography bridge is diagnostic-only: it exposes profile/correspondence/blocker metadata and calculator status messages, and never authorizes generation.
- Appendix F is now treated as partial because the diagnostic bridge exists, but there is still no old-spelling normalizer or fixture-backed alias data.
- Lesson 4 now has diagnostic-only VNC/NNC nuclear-clause shell metadata through `core/clause`.
- The clause shell is visible in the calculator summary and generated output row labels; it never drives generation.
- Current phonology support is not full Classical orthography, vowel length, or older spelling normalization.
- No visible glossary UI, confirmed particle inventory, particle generation, complete clause/sentence engine, or static formula registry exists yet.
- Current VNC and NNC formula metadata should not be treated as a complete clause engine.
- Do not import Andrews/Classical spelling, particles, or clause examples as Nawat/Pipil behavior without local evidence or user-provided data.

Future path:

1. Decide how `core/concepts` entries should be exposed in a visible glossary UI.
2. Keep modern phonology separate from Classical/older orthography.
3. Keep orthography bridge output non-generative unless confirmed Nawat/Pipil evidence authorizes a specific future behavior; Appendix F remains incomplete until old-spelling data and normalization behavior exist.
4. Add particle data or enable particle mode only from confirmed examples.
5. Extend clause/formula metadata after VNC, NNC, sentence mood, negation, question, emphasis, and supplementation boundaries are settled.

Candidate schema questions to revisit later:

- `conceptId`
- `notationRole`
- `orthographyLayer`
- `particleInventory`
- `particlePlacement`
- `clauseFormula`
- `clauseLayer`

## Boundary: Lessons 5-11 VNC Basic

Date: 2026-06-06

Decision:

- Lessons 5-7 have implemented Nawat/Pipil motors through agreement, VNC generation, object handling, and preterit classes.
- Lesson 8 is partial because VNC mechanics and opt-in diagnostic sentence-layer slots exist, but sentence-level negation, question, and emphasis are not generated.
- Lessons 9-10 are partial because finite optative/admonitive forms and opt-in diagnostic sentence-mood slots exist, but sentence-level wish, command, exhortation, and admonition constructions are not modeled.
- Lesson 11 is partial because the current Nawat suppletive subset is implemented, but Andrews' broader irregular taxonomy is not fully mapped.
- Current Nawat suppletive subset includes `kati`, `yawi`, `witzi`, and `weya`.
- Appendix A VNC paradigms and Appendix C object-pronoun combinations are implemented as engine/reference surfaces.
- Diagnostic VNC `nuclearClauseShell.formulaSlots` records subject, object, predicate, and tense slots; `Formula VNC` is derived display only.
- Diagnostic VNC `vncValencyFrame` records intransitive/transitive frame metadata, subject slot, object slot, and base object prefix before surface allomorphy. Rendering may show `Valencia VNC` and `Objeto VNC`; this metadata does not change generated surfaces.
- Diagnostic `verbstemClassProfile` records preterit class provenance for Lesson 7 and lets rendering show `Clase de tronco` without changing generated surfaces.
- Sentence-layer metadata can now attach to generated results only through an explicit override; rendering shows `Capa oracional` labels when that metadata is present.
- Do not treat finite mood output as a clause-level mood engine.
- Do not import Classical irregular behavior directly into Nawat/Pipil.

Future path:

1. Keep Lessons 5-7 as implemented motors while improving explanation/UI only through explicit targets.
2. Keep `core/sentence` metadata diagnostic-only until confirmed Nawat/Pipil sentence evidence exists.
3. Keep optative/admonitive finite forms separate from sentence-level mood semantics.
4. Add irregular behavior only from Nawat/Pipil evidence and focused tests.
5. Derive any richer explanatory Appendix A/C UI from existing engine metadata rather than duplicating generation.

Candidate schema questions to revisit later:

- richer VNC formula-slot UI controls
- `sentenceMood`
- `negationScope`
- `questionType`
- `emphasisMarker`
- `irregularCategory`
- `defectiveTenseContract`

## Boundary: Lessons 20-27 Derived Verbs

Date: 2026-06-06

Decision:

- Lessons 20-26 have implemented Nawat/Pipil motors in the current repo.
- Lesson 27 (`frecuentativo y reduplicacion`) has diagnostic boundary metadata and remains a separate non-generative derivation gap.
- Current nonactive/passive/impersonal behavior is implemented through source-chain derivation, nonactive selection, passive/impersonal valency, and generation support.
- Generated nonactive/passive/impersonal VNC rows may expose diagnostic `derivedVoiceFrame` metadata for derivation mode, voice label, source-to-target valency, cleared object slot, and base object prefix. Rendering may show `Voz derivada`, `Valencia derivada`, and `Objeto base`; this metadata does not change generated surfaces.
- Current causative/applicative behavior is implemented through derivational rules, forward derivation runtime, stem-pool metadata, allomorphy, and tests.
- Generated causative/applicative VNC rows may expose diagnostic `forwardDerivationFrame` metadata for derivation type, source-to-derived valency, selected derived stem, and candidate stem pool. Rendering may show `Derivacion VNC`, `Valencia derivada`, and `Tronco derivado`; this metadata does not change generated surfaces.
- Current object-slot behavior is implemented through agreement, combo validation, valency, object allomorphy, and generation support.
- Lessons 20-26 are no longer counted as pending faltantes in the curriculum map; Lesson 27 remains the only pending derived-verb row.
- Current reduplication utilities, preterit reduplication diagnostics, distributive rendering, and `data/static_redup.json` are not a Lesson 27 frequentative derivation engine.
- `core/derivation/frequentative` is boundary metadata only; there is no frequentative route profile or confirmed generation.
- Local `frequentative` mentions are roadmap/curriculum text only, not Nawat/Pipil fixture evidence.
- `data/exact_rules.json` preterit reduplication, ordinary NNC distributive reduplication, patientive/adjectival reduplication, and generic reduplication helpers are false positives for Lesson 27.
- Do not import Andrews/Classical frequentative forms into Nawat/Pipil data without repo evidence or user-provided forms.

Future path:

1. Keep Lessons 20-26 implemented-motor status separate from Lesson 27.
2. If future 20-26 work appears, treat it as explanatory/status/UI refinement unless a test proves a concrete engine gap.
3. Gather confirmed Nawat/Pipil frequentative examples before adding Lesson 27 data, generation, or visible UI.
4. Keep the current frequentative boundary metadata non-generative until a fixture-backed contract and validation rules exist.
5. Add focused tests before changing Lesson 27 behavior.
6. Add UI controls or labels only after engine metadata exists.

Candidate Lesson 27 schema questions to revisit later:

- `sourceStem`
- `frequentativeType`: ordinary, object-pronoun-reduplicating, destockal, uncertain, nonactive, or unknown.
- `reduplicationTarget`: stem, object pronoun, source prefix, or unknown.
- `sourceVoice`: active, nonactive, passive, impersonal, or unknown.
- `sourceDerivation`: direct, causative, applicative, destockal, or unknown.
- `resultStem`
- `classMembership`
- `evidenceRefs`

## Boundary: Lessons 28-34 Compound Stems

Date: 2026-06-06

Decision:

- Lessons 28 and 30 have partial Nawat/Pipil support through current compound parser/composer metadata and selected unchanged VNC output paths.
- Lesson 29 has diagnostic purposive/directional boundary metadata only. Lessons 31-32 have diagnostic compound/affective NNC boundary metadata only. Lesson 33 has diagnostic honorific/pejorative VNC boundary metadata only. Lesson 34 and Appendix D have diagnostic numeral-NNC boundary metadata only.
- Current `compoundAst` metadata is additive parser metadata for matrix, embed, source, valency, and flags. It is not a complete compound generation engine.
- Generated VNC rows for accepted compound inputs may expose diagnostic `compoundFrame` metadata derived from `compoundAst`; rendering may show `Compuesto VNC` and `Incrustado`, without changing generated surfaces.
- Current ordinary NNC fixture classifications can identify lexical embeds such as `shuchi` or `a`, but that does not implement compound NNC generation, affective NNC generation, or numeral NNCs.
- Current Lesson 29 metadata records the boundary between directional prefix mechanics and purposive VNC evidence. It does not generate forms or change existing directional output.
- Current Lessons 31-32 metadata records the boundary between VNC `compoundAst`/ordinary NNC fixtures and confirmed compound or affective NNC evidence. It does not generate forms or change ordinary NNC/VNC output.
- Current Lesson 33 metadata records the boundary between ordinary VNC derivation, person labels, translation tone, and confirmed honorific or pejorative evidence. It does not generate forms or change VNC output.
- Current Lesson 34/Appendix D metadata records the boundary between ordinary NNC open-stem output, UI number labels, Appendix D headings, and confirmed numeral-NNC evidence. It does not generate forms or change ordinary NNC output.
- Do not force compound NNC, affective, or numeral behavior into ordinary NNC `formulaSlots`.
- Do not treat parser punctuation, slash/dash syntax, UI composer embeds, or Appendix D labels as Nawat/Pipil fixture evidence.
- Do not import Andrews/Classical compound, purposive, affective, honorific, pejorative, or numeral examples as Nawat/Pipil forms.

Future path:

1. Keep current `compoundAst` as parser metadata unless a future target explicitly broadens compound generation.
2. Add status/metadata tests for current Lesson 28/30 parser support before broadening behavior.
3. Keep `core/vnc/purposive` non-generative until confirmed Nawat/Pipil purposive examples justify data, schema, generation, or UI.
4. Keep `core/nnc/compound` non-generative until confirmed Nawat/Pipil compound-NNC or affective examples justify data, schema, generation, or UI.
5. Keep `core/vnc/honorific_pejorative` non-generative until confirmed Nawat/Pipil honorific/pejorative examples justify data, schema, generation, or UI.
6. Keep `core/nnc/numerals` non-generative until confirmed Nawat/Pipil numeral-NNC or number-lexeme examples justify data, schema, generation, or UI.
7. Reduce pending counts only after evidence-backed implementation and tests.

Candidate schema questions to revisit later:

- `compoundKind`: verbal-embed, nominal-embed, NNC-compound, affective, honorific, pejorative, numeral, or unknown.
- `matrixStem`
- `embeddedStem`
- `embedRole`: verbal, nominal, lexical, valence, adjacent-core, purposive, numeral, or unknown.
- `purposeRelation`
- `affectiveValue`
- `honorificPolarity`
- `numeralBase`
- `compoundSourceRefs`

## Boundary: Lessons 35-43 Nominal Formation

Date: 2026-06-06

Decision:

- Lessons 35-41 have partial Nawat/Pipil support through existing `sustantivo` and `adjetivo` motors.
- Lessons 42-43 have non-generative clause/modification AST support for composing existing generated head/modifier outputs without creating new Nawat word forms.
- Current `sustantivo-verbal`, `agentivo`, `patientivo`, `instrumentivo`, `calificativo-instrumentivo`, and `locativo-temporal` outputs are real generated surfaces, but they do not complete Lessons 35-39.
- Current `adjetivo` route outputs are real generated surfaces, but they do not complete Lessons 40-43.
- Andrews 40.1 now has a narrow opt-in adjectival NNC function generator: it reuses ordinary NNC generation, requires absolutive predicate state, and returns an adjectival-function output without creating a modifier/head AST.
- Current generated nominal/adjectival outputs now carry derived `nominalizationProfile` metadata and display-only labels for nominalization kind, nominal role, source VNC, patientive family, and adjectival function.
- `src/core/nnc/nominalization` now records Lessons 35-39 boundary metadata and false-positive classifications for generated surfaces, ownerhood, complete `z/liz` fixture coverage, and patientive-family claims.
- `src/core/nnc/adjectival` now records Lessons 40-41 adjectival NNC function boundaries and provides opt-in Andrews 40.1 and 40.9 generators. Andrews 40.1 generates from an absolutive ordinary NNC source. Andrews 40.9 generates root-plus-`ya` obsolete-preterit adjectival surfaces with Nawat `k` spelling (`(istaya)` -> `istak`, `kukuya` -> `kukuk`, `seseya` -> `sesek`, `kwaistaya` -> `kwaistak`) and keeps `k` in the NNC `num1-num2` connector slot; the `weya`/`hue-i-ya` exception remains rejected. Denominal `tiya` sources now follow Andrews 40.9 in the engine for both unsegmented and segmented Nawat inputs (`itztiya` -> `itztik`, `yektiya` -> `yektik`, `chichiktiya` -> `chichiktik`, `(e/tiya)` -> `etik`, `(kwal/tiya)` -> `kwaltik`). Andrews 40.10-40.11 are represented in `sourceFormationFrame`: `k-ti-ya/c-ti-ya` sources are synonymous-pair sources, `z-ti-ya` sources are synonymous-triplet sources, and the engine records that it generates only the current Nawat source output rather than sibling synonym forms. Andrews 41.1 intensified adjectival output consumes generated NNC `formulaSlots` from `#3 salida`, reduplicates the predicate stem in Nawat orthography, and keeps the subject-number connector outside the predicate. Andrews 41.2 compound-source `adjetivo` outputs now expose `adjectivalCompoundSourceFrame` metadata from the parsed compound roles in generated `#3 salida` while preserving the generated Nawat surface. The current `adjetivo-preterito` route now uses that 40.9 surface directly for recognized root-plus-`ya` and denominal `tiya` inputs instead of returning the full finite preterit alternation set as the adjectival output. Other current `adjetivo` route surfaces and `nominalizationProfile.adjectivalFunction` remain false positives for full modification evidence.
- Current generated patientivo outputs now carry derived `patientiveFamilyProfile` metadata for the existing branches: `nonactive`, `perfectivo`, `imperfectivo`, and `tronco-verbal`.
- The profile follows Andrews Lessons 37.9-39 as engine grammar: passive core, impersonal core, perfective active core, imperfective active core, and root/stock. Explicit `passive` and `impersonal` patientivo source requests now preserve those source-core categories; the legacy/shared `nonactive` branch remains marked as passive + impersonal.
- Explicit passive/impersonal patientivo sources currently realize through the shared Nawat nonactive builder, so the grammar category is no longer collapsed even where Nawat surface realization is shared.
- Compound-source patientivo outputs now preserve their parsed source compound in `patientiveCompoundSourceFrame`, following Andrews 41.2.3's warning that matching patientive surfaces may require underlying compound-source evidence to distinguish passive and impersonal analyses.
- Andrews 36.2-36.3 now has an actual `agentivo` connector contract: generated output keeps Nawat surfaces such as `nemini/tineminimet`, but `ni` is represented inside the predicate stem and the NNC connector is `Ø/met/wan`. The §36.3 fully nominalized customary-agentive stem can now feed the first nominal compound continuation from `#3 salida` (`nemini` + `kal` -> `(neminikal)` -> `neminikal`) as an open-stem ordinary NNC output action, and the first data-backed verbal compound matrix (`tuka`) as a real VNC action (`nemini` -> `-(nemini/tuka)` -> `kineminituka` with outside object `ki`).
- Andrews 36.7 now has an opt-in `agentivo-presente` contract: generated output reanalyzes the Nawat present predicate as the NNC stem (`nemi`, `tamati`), remains absolutive-only, and keeps the present source number connector in `num1-num2`.
- Andrews 35.3/35.5-35.12 now has an opt-in `agentivo-preterito` contract: generated output reanalyzes the Nawat preterit predicate as the NNC stem (`nenki` as `(nen)ki`, `tamatki` as `(tamat)ki`), keeps preterit connectors in `num1-num2`, uses the general-use Nawat `-ka` matrix with `w/wan` connectors for possessive-state probes, and derives the 35.7 general-use compound stem dynamically in `#3 salida` row actions for data-backed verbal/nominal matrices such as `tzajtzi` and `kal`. The same output-stage stem now feeds Andrews 35.9-35.10 ownerhood/abundant-ownerhood VNC matrices as real generated inputs (`(tamatka)-(wa)`, `(tamatka)-(yua)`) using Nawat `waj/yuj` orthography, Andrews 35.12 incorporated-complement VNC matrices with an outside object slot (`(tamatka/mati)` -> `kitamatkamati`, `(tamatka/talia)` -> `kitamatkatalia`), and the first Andrews 35.12 adverbial-manner matrix (`(tamatka/nemi)` -> `tamatkanemi`). Ordinary NNC output rows also feed first class-compatible ownerhood continuations from their generated nounstem: `t` -> `e/ej`, `zero/in` -> `wa/waj`, and abundant -> `yua/yuj`, while `ti` ownerhood remains diagnostic until subclass evidence is confirmed.
- Andrews 36.8 now has an opt-in `agentivo-futuro` contract: generated restricted-use output keeps future `s` inside the predicate stem with NNC connector `ki/ket`, while possessive-state probes use the general-use `-ka` matrix with Nawat `w/wan` connectors.
- Andrews 36.5 now has an actual generation contract in `potencial-habitual`: source reflexive `mu` maps to shuntline `ne`, single projective sources stay absent from the nounstem, double-projective sources keep exactly the selected projective (`ta+te` -> `tamachuni/tamatuni/tamatiluni`; `te+ta` -> `temachuni/tematuni/tematiluni`), and possessive-state probes remain absolutive.
- Andrews 36.6 now has an actual `instrumentivo` generation contract: absolutive output reads the customary-present impersonal/nonactive source, possessive output reads the imperfect active source, the source-tense `ni/ya` belongs inside the predicate stem rather than the NNC subject connector, explicit possessive-mode requests can transform the source VNC subject into a Nawat possessor (`ni` -> `nu`, `ti` -> `mu`, `Ø` -> `i`, `ti...t` -> `tu`, `an...t` -> `anmu`, `Ø...t` -> `in`), `#3 salida` rows expose those generated possessive continuations dynamically, and source reflexive `mu` maps to shuntline `ne` in both states.
- Andrews 36.12 is now represented as engine metadata, not a route label: `nominalizationProfile.possessorSourceFrame` records whether a possessive nominal's possessor came from the source VNC subject (`calificativo-instrumentivo` active/passive action general-use) or was imported externally while the source/NNC subject stayed in the subject slot (`agentivo-preterito` possessive general-use).
- Andrews 39.6 patientive compound continuations now expose `formationFrame` metadata: the generated `#3 salida` patientive nounstem is the compound embed, the matrix is the data-backed Nawat root, verbal continuations produce a VNC input, nominal continuations produce an open-stem ordinary NNC input, and neither path creates new fixture evidence.
- Andrews 39.7-39.8 prelocative patientive continuations now expose `formationFrame`: 39.7 uses the generated patientive nounstem as object-complement and transfers the absolutive NNC subject to the outside object slot; 39.8 uses the generated patientive nounstem as incorporated object and transfers the possessive NNC possessor to the outside object slot without adding an applicative suffix.
- Andrews 40.3 now has an opt-in VNC adjectival-function contract: a generated VNC surface from `#3 salida` can be re-routed as adjectival function while preserving the surface and VNC shell, without creating ordinary NNC `formulaSlots` or a modifier/head AST.
- Andrews 41.1 now has an opt-in intensified adjectival NNC contract: the route consumes generated `formulaSlots` from `#3 salida`, reduplicates the predicate stem in Nawat orthography, keeps the connector outside the predicate, and records that this is not Lesson 27 frequentative generation or a modifier/head AST.
- Andrews 42-43 now has a non-generative `modificationAst` contract: it consumes supplied generated head and modifier clause outputs, preserves their Nawat surfaces, records order/marker/scope/shared-referent link metadata, marks preposed modifiers as non-topic, and keeps supplementation ambiguity diagnostic.
- Andrews 36.10-36.11/37.2-37.4/37.9/37.9.2/37.9.3/38.1/38.1.3/39.1/39.2/39.4/39.6/39.7/39.8/39.9 now reaches routing and generation: nonactive `calificativo-instrumentivo` uses the generated Nawat nonactive distant-past core for passive-action characteristic output and the explicit possessive-state general-use branch keeps the active or nonactive distant-past `-ka` stem without the restricted `-yu` matrix, transforms a missing possessor from the source VNC subject (`ti...t` -> `tu`, yielding `tumikka` or `tumachuka/tumatuka/tumatiluka`), exposes that general-use continuation dynamically in `#3 salida`, rejects non-reflexive transitive active-action sources, maps reflexive `mu` to shuntline `ne`, and forces root-plus-`ya` active-action sources to the obsolete/root distant-past base; active-action `z/liz` maps to Nawat `s/lis` through `sustantivo-verbal` from the future core, keeps root-plus-`ya` alternates nominalized instead of leaking bare VNC stems, applies configured replacive imperfective stems such as `chuka` -> `chukilis`, `nesi` -> `neshilis`, `ta-(ajsi)` -> `taajshilis`, and `ta-(teomati)` -> `tateomachilis`, applies configured root-plus-`ya` deletion such as `istaya` -> `istalis`, keeps the `-s` subtype restricted to `i`-final stems unless the configured replacive-stem rule is `-lis`-only, keeps active-action output common-number only, preserves transitive `ta/te`, maps reflexive `mu` to shuntline `ne`, drops a projective object from double-object reflexive active-action sources, drops source-supportive initial `i` after `ta`, allows the documented `neih.../neh...` reflexive supportive-i alternation, preserves potential-patient possessive state, and treats `-s/-lis` as predicate nominalizer material rather than the subject-number connector; explicit passive patientivo rejects intransitive ultimate sources, clears single-object nonspecific `ta`/`te` from passive patientive nounstems, maps source reflexive `mu` to shuntline `ne`, keeps exactly one selected projective (`ta` or `te`) from double-projective passive sources and permits the deleted-`te` alternate when selected `te` is present, explicit impersonal patientivo permits intransitive sources, keeps `ta`, maps source reflexive `mu` to shuntline `ne`, maps mainline `te` to the impersonal `ta` pattern when no shuntline `ta` already marks the nonhuman patient, while preserving the `te+ta` source shape when shuntline `ta` is present, perfective/imperfective patientive branches map mainline `te` to `ta` and source reflexive `mu` to shuntline `ne` instead of retaining `te`/`mu`, perfective patientivo generation is blocked unless the perfective source core has an Andrews-allowed ending, root/stock patientivo noun output is restricted to tli-class connector surfaces and rejects explicit zero/`in` requests while explicit route stems remain available, dynamic patientivo V→S routes now use `#3 salida` for the generated noun surface rather than static suffix reconstruction, `buildPatientivoCompoundEmbedContinuationContract()` turns generated patientive noun surfaces into real compound VNC inputs for data-backed verbal matrices such as `miki`, `buildPatientivoNominalCompoundContinuationContract()` turns generated patientive noun surfaces into ordinary NNC compound inputs for data-backed nominal matrices such as `kal` while keeping the result open-stem rather than fixture-backed, `buildPatientivoPrelocativeContinuationContract()` maps absolutive-source NNC subjects directly through the subject/object inventory and maps possessive-source NNC possessors through the possessor/object inventory into the current pre-locative/incorporated-root verb object slot, `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` turns generated `-yut` characteristic-property outputs into real incorporated-object VNC inputs by omitting `-yut` before the data-backed `chikawa` matrix (`mikkayut` -> `-(mikka/chikawa)` -> `kimikkachikawa`, `yulyut` -> `-(yul/chikawa)` -> `kiyulchikawa`), constrains the prelocative matrix inventory by source state (`ita`, `mati`, `neki`, and `tuka` are 39.7 absolutive-source matrices; `tajtani` is the default supported matrix and is available for absolutive and possessive sources; `tuka` is also allowed for possessive-source object-complement continuation; `tatajtania` and `temua` are possessive-source only; old `ni` is rejected as a non-Andrews matrix), and exposes these continuations as output-row actions inside `#3 salida`, nonactive source suffix families are locked to the Andrews tli-class patientive connector in Nawat orthography instead of generating zero/`in` spillover, and route specs keep passive/impersonal as nonactive-core branches instead of active imperfective branches.
- Andrews 39.3 characteristic-property output now keeps the Nawat `-yu` matrix in possessive state: `mikkayut` generates possessive `numikkayu`, not the collapsed bare-core `numikka`.
- Andrews 39.9 characteristic-property embed continuation now consumes possessive `#3 salida` forms too: `numikkayu` omits the Nawat `-yu` matrix, promotes `nu-` to the outside object prefix, and reaches `nechmikkachikawa`; its `formationFrame` records the local Nawat `-yu(t)` counterpart of the omitted Classical `(-yo)-tl-` matrix separately from the incorporated root.
- Rendering may show patientive source, Andrews-family, output-stage, and partial-taxonomy labels from that profile in `#3 SALIDA`, but this remains display-only and does not add patientive forms.
- `nominalizationProfile.boundaries.nominalizationScope = "structural-word-output"` and `isFunctionalSupplementation = false` keep Andrews' structural nominalization distinction separate from sentence-level supplementation.
- `nominalizationProfile` is explanatory metadata only; it does not add forms or implement Lessons 42-43 modification.
- Current Lessons 42-43 metadata records the boundary between `adjetivo` route outputs, `nominalizationProfile`, ordinary NNC `formulaSlots`, the opt-in adjectival-NNC function route, translation adjectives, and confirmed modifier/head clause evidence. The current `modificationAst` composes only supplied generated outputs and does not create Nawat word forms or automatic parser/search detection.
- `src/tests/module_wrapper_parity.test.js` now guards the checkpoint-touched generated JS/MJS wrappers so `core/nnc`, `core/generation/engine`, `core/vnc/allomorphy`, and `ui/rendering` stay synchronized.
- Lesson 35 preterit-agentive restricted/general-use stem logic, the first compound-embed continuation, first preterit-agentive ownerhood/abundant-ownerhood VNC matrix continuations, first preterit-agentive incorporated-complement continuations, first preterit-agentive adverbial-manner continuation, and first class-compatible ordinary-noun ownerhood continuations are generated through `#3 salida`; object-focused adverbial matrices, affinity-stem selection, activated projective-object hybrids, `ti` ownerhood subclass selection, and complete ownerhood subtype coverage remain boundary-classified.
- Lesson 37 `z/liz` active-action nounstems now have a current Nawat `s/lis` generation contract through `sustantivo-verbal`; root-plus-`ya` alternates keep the nominalizer instead of falling through to bare source stems, while complete fixture-backed `z/liz` coverage remains pending.
- Patientivo branches are substantially implemented, but the current taxonomy is still partial output metadata: passive and impersonal are separate grammar-source categories, while their distinct Nawat surface realization remains future work.
- Adjectival function is syntactic. Do not treat the `adjetivo` UI mode as proof of a full adjectival NNC or modification engine.
- Do not force Lessons 42-43 modification into ordinary NNC `formulaSlots`.
- Do not infer modification, supplementation, or topic relations from a single generated NNC/VNC output.
- Do not import Andrews/Classical nominalized, deverbal, patientive, adjectival, or modification examples as Nawat/Pipil forms.

Future path:

1. Keep Lessons 35-41 partial status separate from Lessons 42-43 clause/modification work.
2. Keep `nominalizationProfile` as the category-first metadata foundation for existing generated nominal and adjectival outputs, with lesson ranges kept only as curriculum references.
3. Gather confirmed Nawat/Pipil evidence before expanding ordinary nounstem ownerhood beyond the current class-compatible `e/wa/yua` continuation contract, completing Lesson 35 ownerhood coverage, completing `z/liz` fixture coverage beyond the current `s/lis` action-nominal motor, or adding new patientive-family generation/fixtures.
4. Keep the current patientive-family profile as a partial output-stage taxonomy; gather confirmed Nawat/Pipil evidence before giving passive/impersonal separate surface behavior or adding new patientive families or fixture data.
5. Keep `core/nnc/adjectival` limited to opt-in generated-output continuations until confirmed Nawat/Pipil examples justify broader adjectival NNC paradigms, modifier/head syntax, or UI.
6. Keep `core/clause/modification` non-generative: current AST support is a structural composition contract over supplied generated outputs only.
7. Add parser/search/UI actions for Lessons 42-43 only after confirmed examples and schema questions are settled.

Candidate schema questions to revisit later:

- `nominalizationKind`
- `sourceVnc`
- `stemUse`: restricted, general-use, compound-embed, or unknown.
- `semanticRole`: agent, patient, instrument, place/time, action, result, owner, or unknown.
- `patientiveFamily`
- `adjectivalFunction`: predicate, modifier, embed, intensified, or unknown.
- `modificationAst`

## Boundary: Lessons 44-50 Relational And Adverbial

Date: 2026-06-06

Decision:

- Lesson 44 has one current generated adverbio surface: `pasado-remoto-adverbio-activo`.
- This adverbio surface is partial support only; it does not complete Lesson 44 adverbialized VNC/NNC modeling.
- Current Lesson 44 metadata records the boundary between legacy adverbio output, adverb translations, particle labels, ordinary NNC/VNC outputs, and confirmed adverbial NNC/VNC or clause evidence. It does not add forms or change NNC/VNC output.
- Generated legacy adverbio rows now expose `adverbialNuclearClauseFrame` through `adverbialNuclearFrame`: the frame records source VNC, source valency, first-degree adverbialized subject-pronoun behavior, semantic domain, and unchanged output surfaces. Rendering may show `Adverbial nuclear`, `Fuente VNC`, `Grado`, `Dominio`, and `Alcance: adverbio heredado`; this remains tied to the generated `#3 salida` row and does not add adverbial forms.
- Current route metadata keeps the legacy adverb output outside the linked output-composition surface.
- Lessons 45-47 relational NNCs have non-generative usage-frame metadata plus diagnostic boundary metadata; they do not have fixture data or generation.
- Lesson 48 place-name and gentilic NNCs have diagnostic boundary metadata only; they do not have fixture data or generation.
- Appendix E calendar names have diagnostic boundary metadata only; they do not have fixture data or generation.
- Lessons 49-50 adverbial modification and clause adjunction have diagnostic boundary metadata only; they do not have confirmed clause examples, an AST, data, or generation.
- Current Lessons 45-47 metadata records the boundary between ordinary NNC fixtures/open stems, locative-temporal nominal outputs, route labels, place/preposition translations, roadmap markers, and confirmed relational NNC evidence. It also provides `buildRelationalNncUsageFrame()` for Andrews 45.2-46 structure: option one is possessive-state/simple-stem and supplementary-possessor bounded, option two is integrated-matrix, option three is linked-matrix, and option four is embedded-stem position. It does not generate forms or change ordinary NNC, nominalization, route, or VNC output.
- Lesson 46 impersonal option-two sources are metadata-validated as absolutive-state only; active/passive source-subject-to-possessor questions remain structural provenance, not generated Nawat/Pipil possessive forms.
- Generated `locativo-temporal` nominal rows may expose diagnostic `relationalNncBoundaryFrame` metadata derived from current output context. Rendering may show `Relacional NNC`, `Candidato`, and `Evidencia relacional: no confirmada`; this is a false-positive/evidence-boundary label and does not add relational forms.
- Current Lesson 48 metadata records the boundary between ordinary NNC fixtures/open stems, relational metadata, locative-temporal nominal outputs, place/profession/gentilic translations, route labels, CSV verb rows, calendar roadmap text, and confirmed place-name or gentilic NNC evidence. It does not generate forms or change ordinary NNC, relational, nominalization, route, or VNC output.
- Generated `locativo-temporal` nominal rows may also expose diagnostic `placeGentilicNncBoundaryFrame` metadata. Rendering may show `Lugar/gentilicio`, `Candidato L/G`, and `Evidencia L/G: no confirmada`; this remains display-only and does not add place-name or gentilic forms.
- Current Appendix E metadata records the boundary between calendar roadmap text, date labels, personal-name metadata, place/gentilic metadata, and confirmed day, month, year, or cycle-name evidence. It does not generate forms or change ordinary NNC, personal-name, or place/gentilic output.
- Current Lessons 49-50 metadata records the boundary between legacy adverbio output, adverbial/relational/place boundary metadata, particle labels, route labels, translations, CSV verb rows, single generated words, and confirmed adjoined-unit or clause-adjunction evidence. It does not generate forms or change adverbio, NNC, VNC, route, relational, or place/gentilic output.
- Generated legacy adverbio and `locativo-temporal` rows may expose diagnostic `adverbialAdjunctionBoundaryFrame` metadata. Rendering may show `Adjuncion`, `Unidad adjunta`, and `Evidencia adjuncion: no confirmada`; this remains display-only and does not add clause-adjunction AST behavior.
- No relational NNC fixture data/generation, place/gentilic fixture data/generation, calendar-name fixture data/generation, or adverbial-adjunction data/AST exists yet.
- Do not infer relational/adverbial clause behavior from ordinary NNC/VNC outputs, UI labels, or translations alone.
- Do not import Andrews/Classical relational, place-name, gentilic, or adverbial-modification examples as Nawat/Pipil forms.

Future path:

1. Keep `core/clause/adverbial` non-generative beyond the current frame until confirmed Nawat/Pipil adverbial NNC/VNC or clause examples justify data, schema, generation, or UI.
2. Keep the current Lesson 44 adverbio surface separate from full adverbial NNC/VNC modeling; the current first-degree VNC frame must not be reused to generate particle-looking, possessive-state, or second-degree NNC forms without evidence.
3. Keep `core/nnc/relational` non-generative until confirmed Nawat/Pipil relational examples justify fixture data, generation, parser/search detection, or UI actions.
4. Keep `core/nnc/place_gentilic` non-generative until confirmed Nawat/Pipil place/gentilic examples justify data, schema, generation, or UI.
5. Keep `core/calendar` non-generative until confirmed Nawat/Pipil calendar-name examples justify data, schema, generation, or UI.
6. Keep `core/clause/adjunction` non-generative until confirmed Nawat/Pipil adjoined-unit or clause examples justify data, schema, generation, or UI.
7. Reduce pending counts only after evidence-backed implementation and tests.

Candidate schema questions to revisit later:

- `adverbializationKind`
- `adverbialDegree`
- `relationalStem`
- `relationalOption`
- `relationalOptionGroup`
- `relationalStemPosition`
- `relationalSourceState`
- `relationRole`: location, direction, frequency, association, pertinency, or unknown.
- `placeNameSource`
- `gentilicSource`
- `adverbialAdjunctionAst`

## Boundary: Lessons 51-58 Clause, Denominal, Names, And Miscellany

Date: 2026-06-06

Decision:

- Lessons 54-55 have partial Nawat/Pipil support through current denominal route profiles, route stations, source-state metadata, and tests.
- Current denominal support is route-based and does not complete the full Lessons 54-55 suffix-family inventory.
- Current `data/static_modes.json` route profiles explicitly configure the supported denominal families (`vi-ti`, `vi-iwi`, `vi-awi`, and `vt-na`) and structural analogues. Source-state, generated-output, route-family inventory, and linked route-preview metadata derive from that route data and mark `routeProfileSource: "static-modes"` when configured data is available. Preview stages carry `nextSource` candidates for later composition, linked stages can be converted into direct generation requests, linked-stage execution returns provenance, next-source preview can show supported route-family candidates for a selected stage without executing it or mutating state, chain preview can compose an explicit user-selected sequence of stages, `buildNawatLinkedGrammarPathSelectionSummary()` can expose the current source plus appendable next route/stage choices without executing stages, selection-state helpers can store/clear/backtrack an explicit selected stage chain without executing it, and chain execution can run that sequence while preserving linked-path provenance. The visible linked-path controls live dynamically in `#3 SALIDA` as output composition, not as a separate `ruta nawat` rail; reusable stages show `Siguiente fuente`, `Salida de etapa`, and `Continuaciones`, and selected-path helpers show `Fuente actual`, `Opciones siguientes`, and `Siguiente salida`. The output surface can show appendable next choices plus `seguir` actions that store the chosen next route without executing it, selected chains can render back as `Trayecto`, `atrás` can backtrack the last selected stage, `borrar` can clear the chain, `generar trayecto` can execute the stored chain on request, `usar etapa N` can promote any executed stage's generated surface as the new linked-path source while retaining wrapped source-input provenance, `usar salida` can promote the final generated surface as the new linked-path source and sync it into the visible input only for that explicit promotion action, and the selected-path summary can offer multiple `seguir` choices from that promoted/current source. This adds no route families and does not complete Lessons 54-55.
- Lessons 51-53 have diagnostic boundary metadata only for complementation, conjunction, and comparison; they do not have confirmed clause examples, ASTs, data, or generation.
- Lesson 56 personal-name NNCs have diagnostic boundary metadata only; they do not have confirmed name examples, data, or generation.
- Appendix E calendar names have diagnostic boundary metadata only; they do not have confirmed calendar-name examples, data, or generation.
- Lessons 57-58 textual diagnostics, nonsystemic tense, irregular valence, absolute topic, agreement mismatch, `mah` constructions, and miscellany have diagnostic boundary metadata only; they do not have confirmed text examples, data, or an analysis engine.
- Current Lesson 51 metadata records the boundary between VNC/NNC outputs, object controls, subject labels, nominalization profiles, translations, CSV verb rows, single generated words, and confirmed complement-clause evidence. It does not generate forms or change valency.
- Current Lesson 52 metadata records the boundary between parser separators, slash/CSV variants, particle labels, translations, route labels, single generated words, and confirmed conjunction evidence. It does not change parser behavior or generation.
- Current Lesson 53 metadata records the boundary between adjective-like outputs, adjectival-modification metadata, degree/question labels, translations, CSV verb rows, single generated words, and confirmed comparison evidence. It does not change adjective, NNC, or VNC generation.
- Current Lesson 56 metadata records the boundary between ordinary NNC fixtures/open stems, capitalization labels, proper-name translations, place/gentilic metadata, adjunction/conjunction metadata, calendar roadmap text, and confirmed personal-name NNC evidence. It does not generate forms or change ordinary NNC/name-adjacent behavior.
- Current Appendix E metadata records calendar-name false positives separately from personal-name and place/gentilic false positives; it does not generate forms or change name-adjacent behavior.
- Current Lessons 57-58 metadata records the boundary between VNC/NNC outputs, sentence-layer metadata, clause-shell metadata, parser labels, topic/focus UI labels, bare `mah` strings, translations, CSV verb rows, and confirmed textual-analysis or miscellany evidence. It does not generate forms or change parser/sentence behavior.
- Do not force Lessons 51-53 or 57-58 into ordinary NNC/VNC word generation.
- Do not treat personal names, comparison translations, `mah` constructions, or textual diagnostics as ordinary NNC fixtures without confirmed examples and schema.
- Do not import Andrews/Classical examples as Nawat/Pipil forms.

Future path:

1. Keep current denominal route support as partial Lessons 54-55 coverage.
2. Add category-first metadata/status tests with curriculum references for existing denominal route families before broadening behavior.
3. Keep `core/clause/complement`, `core/clause/conjunction`, and `core/comparison` non-generative until confirmed Nawat/Pipil examples justify data, schema, generation, or UI.
4. Propose a full denominal-family schema before adding suffix-family generation beyond current routes.
5. Keep `core/calendar`, `core/nnc/names`, and `core/analysis` non-generative until confirmed Nawat/Pipil calendar/name/text examples justify data, schema, generation, or UI.
6. Reduce pending counts only after evidence-backed implementation and tests.

Candidate schema questions to revisit later:

- `complementAst`
- `conjunctionAst`
- `comparisonAst`
- `denominalFamily`
- `denominalSource`
- `personalNameNnc`
- `analysisIssue`

## Merge Rules

- Do not edit the same file from two worktrees at the same time.
- Update this board before ending a coordination session when assignments change.
- If uncertain, write a question or target clarification instead of guessing.
- Main-thread edits should stay on the current working tree unless the user explicitly requests worktrees.
