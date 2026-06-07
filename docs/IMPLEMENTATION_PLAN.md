# Implementation Plan

This file is reserved for stable implementation plans after architecture review.

## Current Rule

Do not edit app code from this file alone. Each patch still needs an explicit implementation target in the main thread or a clear board assignment.

Treat Andrews lesson rows as curriculum/status indexes. The engine and UI should be organized around reusable grammar categories, slot metadata, diagnostics, and controls; do not create one engine, route, or control merely because a lesson exists.

## Active Target

Lessons 54-55 denominal route-family metadata checkpoint.

Status: current denominal route support remains route-based and partial. `data/static_modes.json` now explicitly configures supported denominal route families (`vi-ti`, `vi-iwi`, `vi-awi`, and `vt-na`) and structural analogues. Existing source-state/generated-output metadata derives `denominalFamilyProfile` from that data, `getNawatDenominalRouteFamilyInventory()` exposes the same configured families as partial route-based coverage, and `generateNawatDenominalRouteFamilyPreview()` links configured source/stem/verbalizer/target/surface trail stages for a source input. Preview stages carry `nextSource` candidates with input/mode/tense context for later composition; `buildNawatLinkedGrammarPathStageGenerateWordRequest()` turns a selected stage into a direct request, `executeNawatLinkedGrammarPathStage()` executes it with linked-path provenance, `previewNawatLinkedGrammarPathNextSource()` previews the supported route-family candidates for that next source without executing it or mutating state, `previewNawatLinkedGrammarPathChain()` composes an explicit user-selected sequence of stages into a chain preview, `buildNawatLinkedGrammarPathSelectionSummary()` exposes the current source plus appendable next route/stage choices without executing stages, selection-state helpers can store/clear/backtrack an explicit selected stage chain without executing it, and `executeNawatLinkedGrammarPathChain()` executes the selected sequence while preserving linked-path provenance. The visible linked-path controls now live dynamically in `#3 SALIDA` as output composition, not as a separate `ruta nawat` rail. Reusable stages are labeled as `Siguiente fuente`, `Salida de etapa`, and `Continuaciones`; selection summaries use `Fuente actual`, `Opciones siguientes`, and `Siguiente salida`. The output surface can show appendable next choices plus `seguir` actions that store the chosen next route without executing it. Selected chains render back as `Trayecto` with current-source and next-option labels; `atrás` backtracks the last selected stage, `borrar` clears the chain, `generar trayecto` executes the stored chain on request and renders the final surface metadata; `usar etapa N` promotes any executed stage's generated surface as the new linked-path source while retaining wrapped source-input provenance; `usar salida` promotes the final generated surface as the new linked-path source and syncs that source into the visible input only for the explicit promotion action; the selected-path summary can then offer multiple `seguir` choices from that promoted/current source. Configured profiles are marked with `routeProfileSource: "static-modes"`. Rendering can show family, verbalizer, and partial-coverage labels from that metadata.

Checkpoint guard: `src/tests/module_wrapper_parity.test.js` verifies the touched JS/MJS wrappers are regenerated from their JS sources for `core/nnc`, `core/generation/engine`, `core/vnc/allomorphy`, and `ui/rendering`.

The wrapper guard is intentionally scoped to this checkpoint. A repo-wide wrapper parity gate should be a later cleanup because older unrelated wrappers currently have pre-existing generated-output differences.

## Safe Order Template

1. Define the grammar/UI contract for one small target.
2. Add focused failing tests.
3. Patch engine/data/state/UI only where needed.
4. Verify default behavior did not change outside the target.
5. Run validation and test suites.

## Current Review Buckets

The current checkpoint should be reviewed as separate buckets, not as one broad diff:

1. Category-first curriculum/docs contract: `AGENTS.md`, `docs/CODEX_BOARD.md`, `docs/GRAMMAR_SPEC.md`, and this file.
2. Curriculum index UI: `index.html`, `style.css`, `src/ui/curriculum/curriculum.js`, and curriculum-focused tests.
3. Ordinary NNC curriculum references: `src/core/nnc/nnc.js`, `src/core/nnc/nnc.mjs`, and the related NNC tests.
4. Lessons 35-41 nominal/adjectival metadata: `src/core/vnc/allomorphy.*`, `src/core/generation/engine.*`, `src/core/nnc/nominalization/*`, `src/core/nnc/adjectival/*`, `src/ui/rendering/rendering.*`, `src/tests/morphology_engine.test.js`, nominalization/adjectival-focused NNC/UI tests, and `src/tests/module_wrapper_parity.test.js`.
5. Lessons 44-50 adverbio/relational/place/adjunction-boundary metadata: `src/core/generation/engine.*`, `src/ui/rendering/rendering.*`, `src/tests/morphology_engine.test.js`, `src/tests/nnc.test.js`, and `src/tests/ui.test.js`.
5. Hold or review separately: any patientivo/runtime-route wrapper sync that is only present because touched `.mjs` wrappers were regenerated.

Do not start new lesson fixtures until these buckets are committed or deliberately held.

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
- Class/stem compatibility is now enforced: `(...V)t`, `(...C)ti`, `(...C)in`, and `(...C/V)Ø`.
- `ti` and `in` remain open-stem structural only until evidence-backed Nawat/Pipil fixture forms are confirmed.

## Current Milestone

Milestone: Ordinary NNC Foundation v1 - Lessons 12-14.

Phase 1-7B establishes the working ordinary NNC engine/UI contract for Lessons 12-14:

- Lesson 12 is mostly solved as an engine/UI foundation through `formulaSlots` and explicit connector placement.
- Lesson 13 is partially solved through possessive-state metadata, UI gating, and diagnostics for unsupported possessive requests.
- Lesson 14 is structurally corrected through the restricted `nounClass` set and class/stem compatibility.

The foundation is structurally stable, but not data-complete. Do not add `ti` or `in` fixtures without evidence-backed Nawat/Pipil forms, and do not treat open-stem structural examples as fixture evidence.

## Remaining Small Targets

- Add browser smoke coverage for the S board once a dev server target is established.
- For Lesson 1, keep `core/concepts` concept and notation metadata diagnostic-only until a visible glossary UI is designed.
- For Lesson 3, keep `core/particles` particle-placement metadata diagnostic-only until confirmed Nawat/Pipil particle inventory data exists.
- For Lessons 1-4, keep glossary, particles, and clause formulas separate from current word-generation engines until explicit metadata/data targets exist.
- For Lesson 2, keep modern Nawat phonology separate from the diagnostic-only orthography bridge; bridge metadata/status messages must not generate Nawat/Pipil forms.
- For Appendix F, treat the existing orthography bridge as partial diagnostic support only; do not add old-spelling normalization without confirmed alias data and tests.
- For Lesson 4, keep `core/clause` nuclear-clause shell metadata diagnostic-only; the calculator summary and generated output row labels may display `Clausula VNC/NNC`, but shell metadata must not drive generation or sentence syntax.
- For Lessons 5-7, treat the core VNC motors as implemented; diagnostic VNC formula-slot metadata, `Formula VNC` rendering, `vncValencyFrame` subject/object/valency labels, and preterit `verbstemClassProfile` labels may explain subject/object/predicate/tense order, Lesson 5-6 valency frames, and Lesson 7 class selection, but future work should stay explanation/UI unless tests reveal a concrete engine gap.
- For Lessons 8-10, keep `core/sentence` diagnostic-only and opt-in; sentence-level negation, question, emphasis, optative, and admonitive behavior must stay out of finite VNC generation until confirmed sentence examples and a clause/mood model exist.
- For Lesson 11, add irregular behavior only from Nawat/Pipil evidence and focused tests; Andrews remains structural taxonomy only.
- Expand evidence-backed possessive/allomorphy examples only when the user supplies Nawat/Pipil forms or repo data clearly supports them.
- Continue evidence hunt for fixture-backed `ti` and `in`.
- For Lesson 15, gather confirmed natural/required possession examples before proposing schema fields such as possession type or state-case availability.
- Do not add Lesson 15 possession metadata, diagnostics, generation, or UI labels until confirmed examples and validation tests are planned.
- For Lesson 16, gather confirmed Nawat/Pipil pronominal NNC examples before proposing schema, validation, engine metadata, diagnostics, or UI labels.
- Do not treat pronoun/agreement labels, ordinary person labels, generated/open-stem examples, or Andrews/Classical forms as pronominal NNC fixture evidence.
- For Lessons 17-19, gather confirmed Nawat/Pipil clause examples before proposing supplementation/topic schema, parser/search metadata, diagnostics, tests, or UI representation.
- Do not treat ordinary NNC word generation, VNC rows, pronoun/agreement labels, parser compound examples, UI topic/focus wording, translation labels, or Andrews/Classical examples as supplementation evidence.
- Lessons 20-26 are implemented motors and no longer count as pending faltantes; any future 20-26 work should be explanatory/status/UI refinement unless a test proves a concrete engine gap. Diagnostic `derivedVoiceFrame` metadata/rendering may explain nonactive/passive/impersonal voice and source-to-target valency, and diagnostic `forwardDerivationFrame` metadata/rendering may explain causative/applicative stem and valency paths, but both must remain display-only.
- Keep Lesson 27 frequentative boundary metadata isolated from generic reduplication helpers and distributive rendering.
- Do not add Lesson 27 frequentative data, generation, or UI until confirmed Nawat/Pipil examples and focused tests are planned.
- For Lessons 28 and 30, treat current `compoundAst` and parser/composer support as partial parser metadata, not a full compound generator.
- Diagnostic `compoundFrame` metadata/rendering may explain matrix/embed structure for accepted compound VNC inputs, but it must remain derived from `compoundAst` and display-only.
- Keep Lesson 29 `core/vnc/purposive` as non-generative directional/purposive boundary metadata.
- Keep Lessons 31-32 `core/nnc/compound` as non-generative compound/affective boundary metadata; do not turn VNC `compoundAst`, ordinary NNC fixtures, or parser punctuation into compound-NNC fixtures.
- Keep Lesson 33 `core/vnc/honorific_pejorative` as non-generative honorific/pejorative VNC boundary metadata.
- Keep Lesson 34/Appendix D `core/nnc/numerals` as non-generative numeral-NNC boundary metadata.
- Do not treat parser slash/dash syntax or ordinary NNC lexical-embed classifications as compound-NNC, affective, purposive, honorific, or numeral fixture evidence.
- For Lessons 35-41, treat current `sustantivo` and `adjetivo` motors as partial coverage with `nominalizationProfile` metadata; new generation still requires confirmed evidence and focused tests.
- `core/nnc/nominalization` is a boundary/status module. Current `sustantivo-verbal` generation covers the active-action `s/lis` motor from Andrews `z/liz`, including root-plus-`ya` alternates that keep `s/lis` instead of falling through to bare VNC stems; ownerhood, complete `z/liz` fixture coverage, and full patientive-family candidates remain unconfirmed.
- `core/nnc/adjectival` is a boundary module only. It can classify current `adjetivo` route outputs and `nominalizationProfile.adjectivalFunction` as partial/unconfirmed Lessons 40-41 evidence, but it must not generate forms.
- `patientiveFamilyProfile` is a partial Lessons 37.9-39 output-stage taxonomy for existing patientivo sources only; it is not fixture evidence. Explicit `passive` and `impersonal` source requests now remain separate grammar-source categories in routing and generation: passive rejects intransitive ultimate sources, clears single-object nonspecific `ta`/`te`, maps source reflexive `mu` to shuntline `ne`, and keeps exactly one selected projective (`ta` or `te`) from double-projective sources and permits the deleted-`te` alternate when the selected projective is `te`; impersonal allows intransitive sources, keeps `ta`, maps single-object mainline `te` to the impersonal `ta` pattern, maps source reflexive `mu` to shuntline `ne`, and preserves double-projective `te+ta` because shuntline `ta` already marks the nonhuman patient; perfective/imperfective patientive branches use the same single-object `te` -> `ta` rule, map source reflexive `mu` to shuntline `ne`, and preserve `te+ta`; perfective patientive generation is gated to Andrews-allowed perfective-core endings, characteristic-property `calificativo-instrumentivo` output keeps Nawat `-yu` in possessive state (`mikkayut` -> `numikkayu`) instead of dropping the matrix, characteristic-property embed continuation now omits possessive `-yu` and promotes mapped possessors to outside object prefixes (`numikkayu` -> `nechmikkachikawa`), root/stock patientive noun output is restricted to tli-class connector surfaces and rejects explicit `in` requests while explicit route-stem requests stay available, dynamic patientive V->S routes ask `#3 salida` for the generated noun surface instead of statically rebuilding suffix outputs, the current pre-locative/incorporated-root destination promotes a selected possessive patientive possessor into the existing object slot when `POSSESSIVE_TO_OBJECT_PREFIX` has a mapping, unmapped/mixed possessor choices remain blocked instead of guessed, and the shared nonactive builder now enforces Andrews' tli-class patientive connector contract for `lu/luwa/u/uwa/walu` source families instead of generating zero/`in` spillover.
- Andrews 36.5 `potencial-habitual` is treated as a customary-present patientive NNC route: single projective `ta/te` sources do not keep a projective object, source reflexive `mu` maps to shuntline `ne`, and possessive-state probes remain absolutive.
- Do not treat current generated nominal/adjectival surfaces as complete evidence for ownerhood, complete `z/liz` fixture coverage, full patientive-family taxonomy, or adjectival modification.
- Keep Lessons 42-43 `core/clause/modification` as non-generative adjectival-modification boundary metadata, separate from ordinary NNC `formulaSlots` and generated word outputs.
- Keep Lesson 44 `core/clause/adverbial` as non-generative adverbial nuclear-clause boundary metadata; `pasado-remoto-adverbio-activo` remains partial legacy adverbio surface support only.
- Diagnostic `adverbialNuclearFrame` metadata/rendering may explain the source VNC, source valency, and manner-surface scope for legacy adverbio rows, but it must remain display-only and must not generate new adverbial forms.
- Keep the legacy adverbio output outside the linked output-composition surface unless a future target explicitly redesigns route semantics.
- Keep Lessons 45-47 `core/nnc/relational` as non-generative relational-NNC boundary metadata; do not treat locative-temporal nominal outputs, route labels, static labels, or place/preposition translations as relational NNC fixture evidence.
- Diagnostic `relationalNncBoundaryFrame` metadata/rendering may mark generated `locativo-temporal` nominal rows as unconfirmed relational candidates, but it must remain a false-positive/evidence-boundary label and must not generate relational forms.
- Keep Lesson 48 `core/nnc/place_gentilic` as non-generative place-name/gentilic NNC boundary metadata; do not treat ordinary NNC fixtures, relational metadata, locative-temporal nominal outputs, route labels, CSV verb rows, calendar roadmap text, or place/profession/gentilic translations as place/gentilic fixture evidence.
- Diagnostic `placeGentilicNncBoundaryFrame` metadata/rendering may mark generated `locativo-temporal` nominal rows as unconfirmed place/gentilic candidates, but it must remain a false-positive/evidence-boundary label and must not generate place-name or gentilic forms.
- Keep relational NNC fixture data/generation pending until confirmed Nawat/Pipil examples justify `data/static_relational_nnc` or engine behavior.
- Keep place/gentilic fixture data/generation pending until confirmed Nawat/Pipil examples justify `data/static_places`, `data/static_gentilics`, or engine behavior.
- Keep Appendix E `core/calendar` as non-generative calendar-name boundary metadata; do not add calendar-name fixtures or generation until confirmed Nawat/Pipil examples justify `data/static_calendar` or engine behavior.
- Keep Lessons 49-50 `core/clause/adjunction` as non-generative adverbial-adjunction boundary metadata; do not treat single generated words, translations, route labels, particle labels, CSV verb rows, or existing adverbial/relational/place boundary metadata as clause-adjunction evidence.
- Diagnostic `adverbialAdjunctionBoundaryFrame` metadata/rendering may mark generated adverbio and `locativo-temporal` rows as unconfirmed adjoined-unit candidates, but it must remain a false-positive/evidence-boundary label and must not generate clause-adjunction AST behavior.
- Keep adverbial-adjunction data/AST work pending until confirmed Nawat/Pipil adjoined-unit or clause examples justify `data/static_adverbial_adjunction`, schema, generation, or UI.
- For Lessons 54-55, treat current denominal routes and source-state metadata as partial support, not a complete denominal-family engine.
- Keep Lessons 51-53 `core/clause/complement`, `core/clause/conjunction`, and `core/comparison` as non-generative boundary metadata; do not treat VNC/NNC outputs, object controls, subject labels, nominalization profiles, parser separators, slash/CSV variants, particle labels, adjective-like outputs, degree/question labels, translations, route labels, or single generated words as confirmed complement/conjunction/comparison evidence.
- Keep complement/conjunction/comparison data/AST work pending until confirmed Nawat/Pipil clause examples justify `data/static_complements`, `data/static_conjunctions`, `data/static_comparisons`, schema, generation, or UI.
- Keep Lesson 56 `core/nnc/names` as non-generative personal-name NNC boundary metadata; do not treat ordinary NNC fixtures/open stems, capitalization labels, proper-name translations, place/gentilic metadata, adjunction/conjunction metadata, or calendar roadmap text as confirmed personal-name evidence.
- Keep Lessons 57-58 `core/analysis` as non-generative textual-analysis/miscellany boundary metadata; do not treat VNC/NNC outputs, sentence-layer metadata, clause-shell metadata, parser labels, topic/focus UI labels, bare `mah` strings, translations, or CSV verb rows as confirmed analysis evidence.
- Keep personal-name and textual-diagnostic data/AST work pending until confirmed Nawat/Pipil examples justify `data/static_names`, `data/static_analysis`, schema, generation, or UI.
- Consider a later UI distinction between fixture-backed evidence and dynamic preview output, without changing generation semantics.
- Consider adding a visual slot breakdown if the single formula echo is not enough for teaching, but keep it derived from `formulaSlots`.
- Consider richer visual treatment for locked fixture metadata if disabled controls are not clear enough in browser review.
