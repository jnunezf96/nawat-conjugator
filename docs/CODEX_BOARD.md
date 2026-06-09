# Codex Coordination Board

## Source Of Truth

- Grammar book: `/Users/jaimenunez/Documents/Nahuat World/Classical/Linguistics/[Andrews] Introduction to Classical Nahuatl.pdf`
- Grammar digest: `docs/ANDREWS_PDF_DIGEST.md`
- Grammar section digest: `docs/ANDREWS_SECTION_DIGEST.md`
- Grammar layer LCM: `docs/ANDREWS_LAYER_LCM.md`
- Repo: `/Users/jaimenunez/Desktop/Nawat_Conjugator`
- Architecture side channel: `019e997b-3f2b-7e30-bbf7-0c773c6ca188`
- Main implementation thread: `019e9442-c3e2-7490-bf93-04d7995f1dc5`

## Standing Interpretation

- Andrews supplies the grammar-rule authority for engine structure: order, roles, slots, boundaries, categories, and dependencies. Nawat/Pipil evidence and user-provided forms still decide Nawat orthography and surfaces.
- Nawat/Pipil repo evidence and user-provided forms decide forms.
- Classical spellings from Andrews grammar rules should pass through `convertClassicalLettersToNawat()` / `getClassicalLettersAsNawat()` before they become Nawat/Pipil engine surfaces. This converts letters only; it is not lexical fixture evidence.
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

## Completed Phase: LCM Grammar Frame Contract v1

Date: 2026-06-08

Decision:

- `src/core/grammar/frame.js` is the canonical least-common-multiple contract layer for generated/routed results.
- Engine outputs now preserve legacy fields while also exposing the normalized envelope `ok`, `surface`, `frames`, and `diagnostics`.
- `frames` points to the canonical `grammarFrame`, whose slots are `authorityFrame`, `unitFrame`, `orthographyFrame`, `morphBoundaryFrame`, `stemFrame`, `nuclearClauseFrame`, `participantFrame`, `inflectionFrame`, `routeContract`, `astFrame`, `resultFrame`, and `diagnosticFrame`.
- VNC, ordinary NNC, and adjectival NNC execution routes now attach `grammarFrame`; direct adjectival NNC function builders attach the same contract for their supported and unsupported paths.
- UI/evaluation diagnostics now read route/result diagnostics, including `grammarFrame.diagnosticFrame`, before falling back to generic no-output labels.
- This is a bridge contract, not a module rename. Existing feature modules keep their local metadata while the shared frame provides the cross-route shape.

Verification:

- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1499/1499.
- `node scripts/run_tests.js --runtime=module`: passed, 1499/1499.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Composition AST Frame Contract v1

Date: 2026-06-08

Decision:

- Non-generative clause/composition builders now preserve their existing AST payloads while also exposing the LCM envelope `ok`, `surface`, `frames`, and normalized `contractDiagnostics`.
- `buildAdjectivalModificationAst()`, `buildAdverbialAdjunctionAst()`, `buildComplementClauseAst()`, and `buildConjunctionClauseAst()` now attach a canonical `grammarFrame`.
- For these composition builders, `grammarFrame.astFrame` contains the original AST, `routeContract.routeStage` is `compose-ast`, and `routeContract.generationAllowed` remains `false` because these builders compose supplied clause/unit surfaces rather than generating new word forms.
- Existing string `diagnostics` arrays remain intact for compatibility; normalized diagnostic objects live in `contractDiagnostics` and `grammarFrame.diagnosticFrame`.

Verification:

- `node scripts/run_tests.js`: passed, 1499/1499.
- `node scripts/run_tests.js --runtime=module`: passed, 1499/1499.

## Completed Phase: LCM Diagnostic Metadata Frame Contract v1

Date: 2026-06-08

Decision:

- Diagnostic-only boundary/classifier APIs now retain their legacy metadata shape while exposing the LCM grammar frame contract through non-enumerable `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics` properties.
- The shared helper is `attachGrammarMetadataContract()` in `src/core/grammar/frame.js`; it builds authority/evidence, unit, orthography, morph-boundary, stem, nuclear-clause, route, result, and diagnostic frames for metadata routes that are not word generators.
- Wrapped routes include adverbial nuclear clauses, comparison, calendar-name metadata, compound/affective NNC metadata, nominalization metadata, numeral NNC metadata, relational NNC metadata, place/gentilic NNC metadata, and personal-name NNC metadata.
- Usage-frame builders for adverbial, relational, and place/gentilic structures now expose stem/nuclear frames while keeping `generationAllowed: false`.
- This phase does not add new Nawat surfaces or promote Andrews Classical examples into Nawat output; it only makes the existing diagnostic/source-gated metadata pass through the same LCM frame contract.

PDF verification:

- Verified local Andrews PDF headings and opening wording for Lessons 34, 44, 45, 46, 47, 48, 53, and 56 before wrapping these metadata routes.

Verification:

- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1512/1512.
- `node scripts/run_tests.js --runtime=module`: passed, 1512/1512.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Frame Inversion v1

Date: 2026-06-08

Decision:

- UI rendering now has a shared `buildGrammarFrameSubLabels()` / `appendGrammarFrameSubLabels()` reader that consumes the canonical `grammarFrame` contract and emits user-facing labels in inverted UI order: result/status, route state, Andrews evidence, Nawat realization, and diagnostics.
- Major conjugation row sublabels now append compact LCM frame labels from `evaluation.result` / `result`, including VNC rows, nonactive rows, nominal/adjectival/adverbial rows, ordinary NNC rows, locative/relational rows, and direct adjectival NNC function rows.
- `applyConjugationEvaluationPresentation()` now writes row-level LCM data attributes for route family, route stage, generation permission, evidence status, and diagnostic status, so HTML/CSS/automation can read frame status without reverse-engineering display text.
- `buildConjugationEvaluationRecord()` now reads diagnostics from `result.frames.diagnosticFrame` and `result.contractDiagnostics` in addition to legacy result diagnostics.
- This phase is UI/contract plumbing only. It does not add generated surfaces or grammar licenses.

Verification:

- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1514/1514.
- `node scripts/run_tests.js --runtime=module`: passed, 1514/1514.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Denominal Route Preview Frame Contract v1

Date: 2026-06-08

Decision:

- Denominal Andrews contract route previews, stem routes, finite-generation requests, activations, next-source previews, and linked grammar path stage requests now expose non-enumerable LCM frames.
- The route frames record Andrews Lessons 54-55 authority, source evidence, suffix orthography bridge, target stem class, source-final diagnostics, and finite-generation gates.
- Linked path stage generation requests now return their request object and expose the same route-stage frame contract before execution.
- This phase does not add Nawat surfaces or promote Andrews Classical examples into Nawat output; it keeps preview routing separate from finite generation.

Verification:

- `node scripts/run_tests.js state module_wrapper_parity`: passed, 1515/1515.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1515/1515.
- `node scripts/run_tests.js --runtime=module`: passed, 1515/1515.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Early/Boundary Metadata Frame Contract v1

Date: 2026-06-08

Decision:

- Early and boundary-only metadata routes now expose non-enumerable LCM frames without changing their legacy JSON-visible payloads.
- Wrapped routes include Lesson 1 concepts, Lesson 3 particles, Lessons 8-10 sentence-layer metadata, Lesson 27 frequentative boundary metadata, Lesson 29 purposive/directional metadata, Lesson 33 honorific/pejorative metadata, and Lessons 57-58 analysis/miscellany metadata.
- The frames keep generation blocked at the contract layer (`generationAllowed: false`) and identify the failed or diagnostic layer before any UI can collapse the result into a generic empty-generation message.
- This phase adds no Nawat/Pipil surfaces, fixtures, or Classical example imports.

PDF verification:

- Verified local Andrews PDF headings/opening wording for Lesson 1, Lesson 3, Lesson 8, Lesson 9, Lesson 10, Lesson 27, Lesson 29, Lesson 33, Lesson 57, and Lesson 58 before wrapping these metadata routes.

Verification:

- `node scripts/run_tests.js concepts particles sentence frequentative purposive honorific_pejorative analysis module_wrapper_parity`: passed, 1522/1522.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1522/1522.
- `node scripts/run_tests.js --runtime=module`: passed, 1522/1522.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Orthography and Nuclear Shell Frame Contract v1

Date: 2026-06-08

Decision:

- Orthography conversion/classification routes now expose LCM frames with `orthographyFrame` populated from the Classical-to-Nawat/Pipil spelling bridge.
- Classical grammar-rule spellings can be converted to Nawat/Pipil letters through the bridge while remaining explicitly non-lexical and non-generative.
- Nuclear-clause shell metadata now exposes LCM frames with `nuclearClauseFrame`, participant slots, and VNC/NNC tense-position boundaries.
- This phase adds no new generated forms; it records Lesson 2 orthography and Lesson 4 nuclear-clause architecture as contract layers that later generators and UI diagnostics can read.

PDF verification:

- Verified local Andrews PDF headings/opening wording for Lesson 2 (`Pronunciation. Orthography`) and Lesson 4 (`Nuclear Clauses`) before wrapping these routes.

Verification:

- `node scripts/run_tests.js orthography clause module_wrapper_parity`: passed, 1524/1524.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1524/1524.
- `node scripts/run_tests.js --runtime=module`: passed, 1524/1524.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC Allomorphy Source Contract Frames v1

Date: 2026-06-08

Decision:

- VNC allomorphy source contracts now expose non-enumerable LCM frames while preserving their existing JSON-visible payloads.
- Wrapped contracts include the active-action nominalizer, patientive nonactive source suffixes, patientive source-stage frames, perfective active-core ending gates, imperfective active-core source-stem contracts, root/stock patientive contracts, and multiple-patientive-derivation procedure contracts.
- These frames route the Andrews Lessons 37-39 source contracts through `orthographyFrame`, `stemFrame`, `morphBoundaryFrame`, and `routeContract` without changing generated surfaces.
- `rg` now finds no `generationAllowed: false` core/UI route file that lacks grammar-frame contract plumbing.

PDF verification:

- Verified local Andrews PDF headings/opening wording for Lessons 37, 38, and 39 before recording this allomorphy-source contract phase.

Verification:

- `node scripts/run_tests.js morphology_engine module_wrapper_parity`: passed, 1525/1525.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1525/1525.
- `node scripts/run_tests.js --runtime=module`: passed, 1525/1525.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Route Control Contract Frames v1

Date: 2026-06-08

Decision:

- Adjectival NNC continuation chips now carry compact LCM route data attributes from the generated contract before click handling: Andrews authority ref, evidence status, unit kind, route family/stage, generation permission, diagnostic status, and result status.
- `applyAdjectivalNncFunctionToVerbEntry()` now preserves a compact `adjectivalNncFunctionContract` on the visible verb input, and `resolveAdjectivalNncFunctionOverrideFromInput()` carries that contract into the `adjectivalNnc` override before generation.
- The explicit adjectival-function renderer no longer falls back to the default adjective/noun combo block when the input itself still carries a valid adjectival NNC entry contract; it renders the `adjetivo-nnc-funcion` block with route-frame data instead.
- Linked grammar path next-source previews, chain previews, chain executions, selection summaries, selection states, append/backtrack states, and promoted-source states now expose non-enumerable LCM frames. The visible route controls remain user-action-first, while the JS contracts preserve Andrews Lessons 54-55 authority and route-stage status.
- This phase adds no new Nawat surfaces or Andrews/Classical example imports. It only keeps UI controls and JS route execution attached to the same canonical contract layer.

PDF verification:

- Verified the local Andrews PDF with pypdf for Lesson 40 pages 410-414: Lesson 40 is `Adjectival NNCs (Part One)`, §40.1 states adjective is syntactical rather than formal and that adjectival NNCs are normally absolutive, §40.3 allows absolutive-state NNCs and VNCs to function adjectivally, §40.4 covers derivationally generated patientive/potential-patient nounstems as adjectives, and §§40.5-40.8 cover predicates of nominalized VNCs as adjectives.

Verification:

- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1527/1527.
- `node scripts/run_tests.js --runtime=module`: passed, 1527/1527.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generate Runtime No-Output/Error Contract Frames v1

Date: 2026-06-08

Decision:

- The shared grammar-frame result contract now normalizes the legacy no-output marker `—` to a blank contract `surface`, so blocked generation is not treated as an actual surface form.
- Forward-derivation no-stem masks now preserve their legacy `{ result: "—", surfaceForms: [] }` payload while exposing non-enumerable `grammarFrame`, `ok`, `surface`, and `frames` contract fields plus blocked-route diagnostics.
- `executeGenerateWordRequest()` validation errors and skip-validation no-output gates now return the same LCM contract layer: route family/stage, unit kind, generation permission, result status, and diagnostics are available before UI rendering collapses the row into a generic empty-generation message.
- The raw-input final-vowel gate, raw stem-syllable gate, active-adjective transitive gate, and forward-derivation no-stem gate now fail with route-layer diagnostics rather than bare `—` payloads.
- Public generation returns from blocked morphology application and patientivo possessive-suffix failure are now wrapped at the `executeGenerateWordRequest()` boundary; lower-level morphology helpers keep their internal `{ error: true }` signals.
- This phase adds no new Nawat surfaces, no new Andrews/Classical examples, and no new grammar license. It only wraps existing generator failure paths with the canonical LCM contract.

PDF verification:

- Verified the local Andrews PDF with pypdf before recording this phase: Lesson 2 heading/opening wording for pronunciation/orthography, Lesson 4 heading/opening wording plus formula/hierarchic nuclear-clause wording, and Lesson 24 heading/opening wording for stem-final vowel framing. No Classical surfaces from these sections were imported.

Verification:

- `node scripts/run_tests.js morphology_engine vnc grammar_frame module_wrapper_parity`: passed, 1532/1532.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1532/1532.
- `node scripts/run_tests.js --runtime=module`: passed, 1532/1532.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Verb-Derived Nominal Direct Route Contract Frames v1

Date: 2026-06-08

Decision:

- Direct verb-derived nominal generators now expose non-enumerable LCM frames while preserving their legacy visible payloads.
- Wrapped direct routes include `getInstrumentivoResult()`, `getCalificativoInstrumentivoResult()`, and `getLocativoTemporalResult()` for both generated and blocked outputs.
- The frames identify the nominal nuclear-clause unit, verb-derived nominal route family, route stage, Andrews references, Nawat/Pipil spelling authority, source model, stem entries, subject-number connector, possessor metadata, result status, and blockers.
- Public `generateWord()` already wraps these routes through morphology execution; this phase covers the direct route APIs used by tests, panels, rendering probes, and browser checks.
- This phase adds no new Nawat surfaces and imports no Classical examples. It only attaches contract frames to existing direct nominal routes and blocked direct-route results.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these routes: Lesson 36 heading/opening wording for nominalization of VNCs, §36.6 instrumentive wording context, §§36.10-36.11 passive-action and active-action NNC wording, and §46.4 locative/temporal nominalized imperfect-predicate wording.

Verification:

- `node scripts/run_tests.js nnc morphology_engine module_wrapper_parity`: passed, 1534/1534.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1534/1534.
- `node scripts/run_tests.js --runtime=module`: passed, 1534/1534.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Morphology Application Contract Frames v1

Date: 2026-06-08

Decision:

- `applyMorphologyRules()` now exposes non-enumerable LCM frames on successful and blocked morphology-application results while preserving its legacy visible payload.
- Successful morphology applications identify the morphology route, unit kind, inflection tense, participant prefixes/suffixes, stem, source raw verb, route stage, result stem surface, and Nawat/Pipil spelling authority.
- Blocked morphology applications now return the same contract layer instead of bare `{ error: true }`; each blocked branch records a route stage and diagnostic id before public generation collapses the result to a broader no-output error.
- Wrapped blocked branches include verbal-nominal stem candidates, patientive adjective gates, patientive source/marker gates, preterit-agentive source forms, potential active source forms, direct verb-derived nominal route handoff, and active-adjective wrapper forms.
- This phase adds no new Nawat surfaces and imports no Classical examples. It only attaches contract frames to existing morphology application decisions.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these routes: Lesson 5 intransitive VNC formula and tense-morph wording, Lesson 7 verbstem class/valence wording, Lesson 24 stem-final vowel/valence wording, and Lesson 37 deverbal nounstem/patientive-source wording. No Classical surfaces from these sections were imported.

Verification:

- `node scripts/run_tests.js morphology_engine module_wrapper_parity`: passed, 1536/1536.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1536/1536.
- `node scripts/run_tests.js --runtime=module`: passed, 1536/1536.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Agreement Builder Context Contract Frames v1

Date: 2026-06-08

Decision:

- `buildVerbDerivedNominalBuilderContext()` now exposes non-enumerable LCM frames on successful and blocked builder-context results while preserving its legacy visible payload.
- Blocked context gates now carry route-stage diagnostics for invalid input, invalid stem shape, nonanimate-subject requirements, object-slot mismatch, forward-derivation failure, and missing forward stem contexts.
- Successful context frames identify the agreement-builder unit, source VNC to nominal-NNC route, participant/object slots, nominal kind, no-tense nominal boundary, source/forward stems, Andrews references, and context-ready status.
- This phase adds no generated Nawat surfaces and imports no Classical examples. It only prevents direct builder-context calls from collapsing into bare `{ error: true }` before the UI/engine can see the failed LCM layer.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping this route: Lesson 6 transitive VNC formula/object-pronoun wording; prior verified context for Lessons 5, 7, 35-37, and §46.4 remains the route authority for verb-derived nominal structure.

Verification:

- `node scripts/run_tests.js agreement nnc module_wrapper_parity`: passed, 1538/1538.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1540/1540.
- `node scripts/run_tests.js --runtime=module`: passed, 1540/1540.
- `npm run test:regression`: passed, 12/12.

## Completed Phase: LCM Preterit Class Output Contract Frames v1

Date: 2026-06-08

Decision:

- `buildClassBasedResultWithProvenance()` now exposes non-enumerable LCM frames on generated and blocked preterit/perfective class-output results while preserving the legacy `{ result, forms, provenance }` payload.
- `buildPretUniversalResultDetailedFromVariants()` now exposes the same contract layer on variant-assembly results while preserving the legacy `{ result, forms }` payload.
- Generated frames identify the VNC unit, preterit class route, Andrews Lesson 7 verbstem-class authority, Nawat/Pipil spelling authority, class/profile provenance, participant slots, tense, and surface forms.
- Blocked class selections now normalize the legacy dash marker to blank contract `surface` while retaining the visible `result: "—"` payload and exposing a route-stage diagnostic before UI fallback text runs.
- Bare public/internal preterit `{ result, forms }` returns are now removed; direct variant assembly can identify its failed LCM source layer before callers destructure the result.
- This phase adds no Nawat surfaces and imports no Classical examples. It only wraps existing class-output assembly in the same LCM contract layer used by other generator routes.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping this route: Lesson 7 heading/opening wording for verbstem classes and §7.5 wording on variable class membership/perfective-stem alternatives.

Verification:

- `node scripts/run_tests.js preterit module_wrapper_parity`: passed, 1542/1542.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1542/1542.
- `node scripts/run_tests.js --runtime=module`: passed, 1542/1542.
- `npm run test:regression`: passed, 12/12.

## Completed Phase: LCM Derivation Continuation Route Control Contract Frames v1

Date: 2026-06-08

Decision:

- Derivation continuation contract builders now expose non-enumerable LCM frames while preserving their existing JSON-visible payloads.
- Wrapped continuation previews include patientivo prelocative, patientivo compound/embed, patientivo nominal compound, patientivo characteristic-property embed, active-action compound/embed, active-action nominal compound, customary-agentive compound/embed, customary-agentive nominal compound, preterit-agentive compound/embed, preterit-agentive nominal compound, preterit-agentive ownerhood, preterit-agentive complement, preterit-agentive adverbial, and ordinary NNC ownerhood continuation contracts.
- Supported continuation contracts report `routeFamily: "derivation-continuation"`, `routeStage: "preview-continuation"`, generation allowed, source/target inputs, Andrews references, and empty contract surfaces because the chip is a route preview rather than a generated surface.
- Blocked continuation contracts report the same failed LCM route layer with blocked diagnostics, so UI/engine code can identify the failed source layer before any generic empty-generation fallback.
- Contract-backed linked continuation chips now copy compact `data-grammar-*` route attributes from their contract frames before click handling. This keeps JS route controls aligned to the canonical LCM layer without mirroring lessons or renaming modules.
- This phase adds no Nawat surfaces and imports no Andrews/Classical examples. It only keeps continuation routing and UI controls attached to the shared contract frame.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these routes: Lesson 35 heading plus §§35.7, 35.9, 35.10, and 35.12 for preterit-agentive general use/continuations; Lesson 36 heading plus §36.3 for agentive nounstem continuation context; Lesson 37 heading plus §37.5 for active-action nounstem continuation context; and Lesson 39 heading plus §§39.6-39.9 for patientive-source compound, prelocative, and characteristic-property continuation context.

Verification:

- `node scripts/run_tests.js derivation ui module_wrapper_parity`: passed, 1545/1545.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1545/1545.
- `node scripts/run_tests.js --runtime=module`: passed, 1545/1545.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Row Promotion Route Control Frames v1

Date: 2026-06-08

Decision:

- Row-level linked promotion chips now project LCM route data before click handling.
- Generated-result row controls copy the generated result frame: verb-to-nominal continuations, action-noun source-subject possessor promotions, and instrumentive source-subject possessor promotions now expose compact `data-grammar-*` attributes from their target result.
- Denominal Andrews route controls copy their existing route frames: generated ordinary-NNC included-possessor `ti`, possession `ti`, and generic denominal Andrews continuation chips now expose authority, evidence, route stage, generation permission, and result status datasets.
- UI-only patientivo and patientivo-tronco conversion tracks now receive non-enumerable route-control frames before rendering. Patientivo V→S controls record Lessons 38-39 authority; patientivo-tronco denominal controls record Andrews Lessons 54-55 when the static route has an Andrews suffix analogue, and explicitly expose Nawat-only route status when the static route has no Andrews suffix contract.
- All linked-promotion button blocks in `src/ui/rendering/rendering.js` now call `applyGrammarFrameRouteDataset()` before appending the button, so HTML/CSS/automation can read the same LCM route layer that JS uses to route.
- This phase adds no new generated forms and imports no Andrews/Classical examples. It only exposes existing row-promotion routes through the shared frame contract.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these controls: Lesson 38 for passive/impersonal patientive nounstem structure; Lesson 39 for active patientive nounstem structure; Lessons 35-37 for verb-derived nominal row continuations; §46.4 for locative/temporal nominalized predicate context; and §§54.3-54.4 for included-possessor and possession `ti` denominal route controls.

Verification:

- `node scripts/run_tests.js ui module_wrapper_parity`: passed, 1546/1546.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1546/1546.
- `node scripts/run_tests.js --runtime=module`: passed, 1546/1546.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Static Nawat Route Target Frames v1

Date: 2026-06-08

Decision:

- Static Nawat route target objects now expose non-enumerable LCM frames while preserving their existing visible shape.
- `resolveNawatRouteTarget()` now returns route targets with `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics`; the frame records source mode/tense/stem, target mode/tense/stem, route placement, verbalizer/suffix boundary, participant object transfer, static-mode evidence, and route-stage status.
- `getActiveNawatRouteProfile()` and `setActiveNawatRouteProfile()` now return active route profiles with the same route-control frame, so route state reads no longer depend on rendering to infer the LCM layer.
- `activateNawatRouteStation()` wraps the selected station target before storing it, keeping chip-triggered route activation aligned with the static route target contract.
- Patientivo V→S route targets record Andrews Lesson 38 for passive/impersonal patientive sources and Andrews Lesson 39 for active patientive sources. Patientivo-tronco denominal route targets record Andrews Lessons 54-55 only when the configured static route has an Andrews suffix analogue; Nawat-only static routes such as `-na` keep empty Andrews refs and explicit `nawat-route-no-andrews-suffix` evidence status.
- This phase adds no generated forms and imports no Andrews/Classical examples. It makes existing static route helpers expose the same LCM contract layer that UI controls now project.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these static route helpers: Lesson 38 for passive/impersonal patientive nounstem source structure; Lesson 39 for active patientive nounstem source structure; and Lessons 54-55, including §§54.3-54.4, for denominal route authority and the boundary between Andrews-backed suffix analogues and Nawat-only static route data.

Verification:

- `node scripts/run_tests.js state module_wrapper_parity`: passed, 1548/1548.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1548/1548.
- `node scripts/run_tests.js --runtime=module`: passed, 1548/1548.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Static Nawat Route Surface Result Frames v1

Date: 2026-06-08

Decision:

- Static Nawat route surface helpers now have framed result APIs while preserving the existing string-return helpers for compatibility.
- `getNawatRouteSourceSurfaceResult()`, `getNawatVerbNounConversionNominalSurfaceResult()`, and `getNawatRouteFiniteSurfaceResult()` return route-surface result contracts with non-enumerable `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics`.
- Legacy helpers `getNawatRouteSourceSurfaceForm()`, `getNawatVerbNounConversionNominalSurfaceForm()`, and `getNawatRouteFiniteSurfaceForm()` now read `.surface` from those framed result contracts, so older callers keep their string behavior while the JS route layer can use the LCM shape.
- Generated route-surface frames record source/target mode and tense, route placement, suffix/verbalizer boundary, participant object transfer, static-mode evidence, route stage (`source-surface`, `nominal-surface`, `finite-surface`, blocked, or fallback), result surface, and diagnostics.
- Patientivo source and nominal surfaces keep Andrews Lesson 38/39 authority through the static route frame. Denominal finite surfaces keep Andrews Lessons 54-55 only for configured suffix analogues and keep Nawat-only status where the route has no Andrews suffix contract.
- This phase adds no generated forms and imports no Andrews/Classical examples. It only changes route-surface helper contracts so callers can inspect the failed/generated LCM layer before reducing the result to a string.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these route-surface helpers: Lesson 38, including §§38.1-38.2, for passive/impersonal patientive nounstem source structure; Lesson 39, including §39.1 and §39.8, for active patientive nounstem route structure; Lesson 54, including §§54.3-54.4, for denominal `ti` route authority; and Lesson 55 for the broader denominal suffix-family boundary.

Verification:

- `node scripts/run_tests.js state module_wrapper_parity`: passed, 1550/1550.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1550/1550.
- `node scripts/run_tests.js --runtime=module`: passed, 1550/1550.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Output Provenance Result Frame Contract v1

Date: 2026-06-08

Decision:

- Output provenance helpers now expose non-enumerable LCM frames while preserving their legacy visible provenance payloads.
- `buildProvenanceVariantEntry()` returns variant records with `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics` contract fields; `getProvenancePrimaryStemSurface()` remains the legacy string reader.
- `buildForwardDerivationProvenance()` now records the generated/blocked provenance result in `grammarFrame.resultFrame.provenance`, with route family `output-provenance`, stem provenance, tense/derivation metadata, and missing-stem diagnostics before any caller collapses the output to a bare provenance object.
- Generic stem-variant provenance cites Andrews Lesson 7 only. Causative forward provenance adds Andrews Lesson 24 only when the derivation route is actually causative. The checked Lesson 37 deverbal-nounstem wording is not claimed by this generic output-provenance wrapper.
- This phase adds no generated Nawat surfaces, no Classical examples, and no new grammar license. It only wraps existing provenance/source-stem records in the canonical result-frame contract.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these helpers: Lesson 7 heading/opening wording for verbstem morphemic structure and verbstem-class provenance, §7.5 wording on variable class membership and alternative perfective stems, and Lesson 24 §24.1 wording on stem-final vowel/valence framing and the causative route. Lesson 37 §37.1 was checked and deliberately not used as generic provenance authority.

Verification:

- `node --check src/core/output/provenance.js`: passed.
- `node --check src/core/output/provenance.mjs`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node scripts/run_tests.js surface module_wrapper_parity`: passed, 1562/1562.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1562/1562.
- `node scripts/run_tests.js --runtime=module`: passed, 1562/1562.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Output Surface Result Frame Contract v1

Date: 2026-06-08

Decision:

- Output surface assembly now has framed result APIs while preserving the existing string-return helpers for compatibility.
- `buildOutputWordResult()` and `buildNominalOutputResult()` return visible `{ surface, segments }` payloads with non-enumerable `grammarFrame`, `frames`, `ok`, and `contractDiagnostics`.
- Legacy helpers `buildOutputWordText()` and `buildNominalOutputText()` now read `.surface` from those framed results, so string callers keep their behavior while the JS route layer can inspect output-surface status before reducing the result to text.
- Output-surface frames record Andrews Lesson 2 orthography/syllable authority, Lesson 4 nuclear-clause slot/layer authority, Nawat/Pipil spelling authority, segment roles, participant prefixes/suffixes, nominal suffixes, and the realized result surface.
- This phase adds no generated Nawat surfaces, no Classical examples, and no new grammar license. It only wraps existing output-surface assembly in the canonical result-frame contract.

PDF verification:

- Verified the local Andrews PDF with pypdf before wrapping these helpers: Lesson 2 heading/opening wording for pronunciation/orthography, §2.6 wording on syllable/vocable constraints, and Lesson 4 wording that NNCs and VNCs have hierarchical organization with the stem as foundation plus §4.5 slot/subposition framing.

Verification:

- `node --check src/core/output/surface.js`: passed.
- `node --check src/core/output/surface.mjs`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node scripts/run_tests.js surface module_wrapper_parity`: passed, 1570/1570.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1570/1570.
- `node scripts/run_tests.js --runtime=module`: passed, 1570/1570.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Evaluation Diagnostic Contract Reader v1

Date: 2026-06-08

Decision:

- Conjugation evaluation now treats contract surfaces as renderable output, not only legacy `result.result` strings.
- `buildConjugationEvaluationRecord()` and `getConjugationMaskState()` now read `result.surface`, `grammarFrame.resultFrame.surface`, route blocking diagnostics, frame diagnostics, and `contractDiagnostics` before falling back to legacy no-output state.
- Result-error mask states now prefer Andrews/LCM route diagnostics over the generic `La generacion no produjo una forma.` label when a frame already identifies the blocked route layer.
- When a blocked frame has no explicit diagnostic, evaluation synthesizes a route-layer diagnostic with route family/stage and Andrews authority refs when present.
- This phase does not add generated forms or grammar licenses. It changes UI/evaluation routing so unsupported framed routes can surface an Andrews/LCM reason before generic empty-generation text.

PDF verification:

- Verified the local Andrews PDF with pypdf for Lesson 40 before recording this route-facing evaluation change: §40.1 says adjective is a syntactic class and an adjectival nuclear clause is an NNC in adjectival function; §40.3 allows absolutive-state NNCs and VNCs to function as adjectives; §40.4 covers derivationally generated patientive/potential-patient nounstems as adjectives.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node scripts/run_tests.js agreement module_wrapper_parity`: passed, 1572/1572.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1572/1572.
- `node scripts/run_tests.js --runtime=module`: passed, 1572/1572.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Result Surface Reader v1

Date: 2026-06-08

Decision:

- UI rendering now reads framed result surfaces before legacy output strings when collecting forms for rows and continuation controls.
- `getConjugationSurfaceForms()` now prefers `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, and `result.surface` before falling back to legacy `surfaceForms` and `result.result`.
- `applyConjugationEvaluationPresentation()` now falls back to the framed contract surface when callers pass a blank legacy `formattedValue`, so contract-shaped routes do not collapse into generic no-output text merely because they lack `result.result`.
- The nested patientivo/tronco continuation surface collector now uses the same framed surface reader, keeping linked adjective/sustantivo/verbo promotion controls aligned with the LCM result frame.
- This phase adds no generated forms or grammar licenses. It only makes UI display/continuation routing consume the same contract surface that the engine already produced.

PDF verification:

- Verified the local Andrews PDF with pypdf before the UI reader patch: Lesson 2 heading/opening wording for pronunciation/orthography, Lesson 4 wording that NNCs/VNCs have hierarchical structure with the stem as foundation, Lesson 40 §40.1 wording that adjective is a syntactic class and an adjectival nuclear clause is an NNC in adjectival function, and §40.3 wording that absolutive-state NNCs and VNCs can function as adjectives.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js agreement ui module_wrapper_parity`: passed, 1574/1574.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1574/1574.
- `node scripts/run_tests.js --runtime=module`: passed, 1574/1574.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Source Evidence Dataset Projection v1

Date: 2026-06-08

Decision:

- Reusable UI route dataset projection now exposes compact source-evidence details from the canonical `grammarFrame`.
- `applyGrammarFrameRouteDataset()` now writes all Andrews refs, Nawat evidence refs, source-evidence kind/status, source-evidence target authority, evidence source label, and true boundary flags in addition to the existing route/status/result fields.
- Linked route chips, promoted result controls, and tense blocks that already call `applyGrammarFrameRouteDataset()` can now be inspected by HTML/CSS/automation for the same authority/source-evidence layer the JS route used.
- This phase adds no generated forms, no Classical examples, and no grammar license. It only makes existing UI controls expose the authority/source-evidence contract layer instead of requiring callers to reverse-engineer it from labels or route ids.

PDF verification:

- Verified the local Andrews PDF with pypdf before the UI projection patch: Lesson 4 wording that NNCs/VNCs have hierarchical structure with the stem as foundation; Lesson 40 §40.1 wording that adjective is a syntactic class and an adjectival nuclear clause is an NNC in adjectival function; and §40.3 wording that absolutive-state NNCs and VNCs can function as adjectives.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui module_wrapper_parity`: passed, 1575/1575.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1575/1575.
- `node scripts/run_tests.js --runtime=module`: passed, 1575/1575.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

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
- Current generated patientivo outputs now carry derived `patientiveFamilyProfile` metadata for the existing branches: `nonactive`, `perfectivo`, `imperfectivo`, and `tronco-verbal`. The nonactive patientive stem builder now derives deletion/retention from the same source-suffix contract exposed in metadata, so `lu/luwa/u/uwa/wa/walu` do not maintain a separate hardcoded deletion table. The selected generated row also carries `patientiveSourceStageFrame`, which records the actual `#3 salida` source suffix contract, Andrews deletion operation, and Nawat output prefix/stem/connector used by that row.
- The profile follows Andrews Lessons 37.9-39 as engine grammar: passive core, impersonal core, perfective active core, imperfective active core, and root/stock. Explicit `passive` and `impersonal` patientivo source requests now preserve those source-core categories; the legacy/shared `nonactive` branch remains marked as passive + impersonal.
- Perfective patientivo source gating now uses `patientive-perfective-source-ending-contract` for Andrews 39.1 instead of a plain suffix set. The contract accepts only the Andrews source-core endings after Nawat orthography realization (`w`, `k`, `kw`, `s`, `sh`, `n`, `h/j`, `l`, `tz`) and keeps disallowed endings such as `t` and `ch` blocked; generated rows carry the contract in `patientiveSourceStageFrame`.
- Imperfective patientivo generation now uses `patientive-imperfective-source-stem-contract` for Andrews 39.2. The contract records the imperfective active source, Andrews ti-class target, and Nawat `t/ti` connector family; the current output connector is derived from that contract and surfaced in `patientiveSourceStageFrame`.
- Root/stock patientivo generation now uses `patientive-root-stock-source-contract` for Andrews 39.4. The contract records the root-or-stock source core, tli-class target, Nawat `t/ti` connector family, and Classical `c/x/z/ch` variants through the Nawat orthography bridge as `k/sh/s/ch`; generated rows carry the selected output surface in `patientiveSourceStageFrame` without adding new forms.
- Multiple patientive derivation now uses `patientive-multiple-derivation-contract` for Andrews 39.5. Generated patientivo output probes the current input against implemented patientive procedures, records which procedures are available, and keeps synonymy or idiomatic translation value diagnostic instead of merging outputs.
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
- Lesson 37 `z/liz` active-action nounstems now have a current Nawat `s/lis` generation contract through `getActiveActionNominalizerContract()` and `sustantivo-verbal`; root-plus-`ya` alternates keep the nominalizer instead of falling through to bare source stems, while complete fixture-backed `z/liz` coverage remains pending.
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
- Lesson 48 place-name and gentilic NNCs have non-generative usage-frame metadata plus diagnostic boundary metadata; they do not have fixture data or generation.
- Appendix E calendar names have diagnostic boundary metadata only; they do not have fixture data or generation.
- Lessons 49-50 adverbial modification and clause adjunction have non-generative AST metadata plus diagnostic boundary metadata; they do not have confirmed clause examples, static data, or generation.
- Current Lessons 45-47 metadata records the boundary between ordinary NNC fixtures/open stems, locative-temporal nominal outputs, route labels, place/preposition translations, roadmap markers, and confirmed relational NNC evidence. It also provides `buildRelationalNncUsageFrame()` for Andrews 45.2-46 structure: option one is possessive-state/simple-stem and supplementary-possessor bounded, option two is integrated-matrix, option three is linked-matrix, and option four is embedded-stem position. It does not generate forms or change ordinary NNC, nominalization, route, or VNC output.
- Lesson 46 impersonal option-two sources are metadata-validated as absolutive-state only; active/passive source-subject-to-possessor questions remain structural provenance, not generated Nawat/Pipil possessive forms.
- Generated `locativo-temporal` nominal rows may expose diagnostic `relationalNncBoundaryFrame` metadata derived from current output context. Rendering may show `Relacional NNC`, `Candidato`, and `Evidencia relacional: no confirmada`; this is a false-positive/evidence-boundary label and does not add relational forms.
- Current Lesson 48 metadata records the boundary between ordinary NNC fixtures/open stems, relational metadata, locative-temporal nominal outputs, place/profession/gentilic translations, route labels, CSV verb rows, calendar roadmap text, and confirmed place-name or gentilic NNC evidence. It also provides `buildPlaceGentilicNncUsageFrame()` for Andrews 48 structure: place-name NNCs require a unique socially designated place reference and may function as ordinary/adverbial/adjectival NNCs; topographical-feature names are not automatically place names; gentilic frames distinguish two-clause place-name supplements, `-ca` matrix derivations, pan-e-ca vs pan-ca, gentilic collectivity with `yo`, profession extensions, and incorporation. It does not generate forms or change ordinary NNC, relational, nominalization, route, or VNC output.
- Lesson 48 gentilic collectivity/profession behavior remains metadata-only: collectivity records `yo` and possessive `num1` variants, while profession extensions can record absolutive/possessive state availability without generating forms.
- Generated `locativo-temporal` nominal rows may also expose diagnostic `placeGentilicNncBoundaryFrame` metadata. Rendering may show `Lugar/gentilicio`, `Candidato L/G`, and `Evidencia L/G: no confirmada`; this remains display-only and does not add place-name or gentilic forms.
- Current Appendix E metadata records the boundary between calendar roadmap text, date labels, personal-name metadata, place/gentilic metadata, and confirmed day, month, year, or cycle-name evidence. It does not generate forms or change ordinary NNC, personal-name, or place/gentilic output.
- Current Lessons 49-50 metadata records the boundary between legacy adverbio output, adverbial/relational/place boundary metadata, particle labels, route labels, translations, CSV verb rows, single generated words, and confirmed adjoined-unit or clause-adjunction evidence. It also provides `buildAdverbialAdjunctionAst()` for supplied clause/unit surfaces: Lesson 49 adverbialized modifier/head order, recursion, and place/time apposition; Lesson 50 nonadverbialized clause-unit relations for time/place/manner/consideration/purpose/condition/concession/consequence/proviso/reason; and the `ca` reason construction as principal-clause introducer rather than conjunction. It does not generate forms or change adverbio, NNC, VNC, route, relational, or place/gentilic output.
- Generated legacy adverbio and `locativo-temporal` rows may expose diagnostic `adverbialAdjunctionBoundaryFrame` metadata. Rendering may show `Adjuncion`, `Unidad adjunta`, and `Evidencia adjuncion: no confirmada`; this remains display-only and does not add adjoined-unit generation.
- No relational NNC fixture data/generation, place/gentilic fixture data/generation, calendar-name fixture data/generation, or adverbial-adjunction static data/generation exists yet.
- Do not infer relational/adverbial clause behavior from ordinary NNC/VNC outputs, UI labels, or translations alone.
- Do not import Andrews/Classical relational, place-name, gentilic, or adverbial-modification examples as Nawat/Pipil forms.

Future path:

1. Keep `core/clause/adverbial` non-generative beyond the current frame until confirmed Nawat/Pipil adverbial NNC/VNC or clause examples justify data, schema, generation, or UI.
2. Keep the current Lesson 44 adverbio surface separate from full adverbial NNC/VNC modeling; the current first-degree VNC frame must not be reused to generate particle-looking, possessive-state, or second-degree NNC forms without evidence.
3. Keep `core/nnc/relational` non-generative until confirmed Nawat/Pipil relational examples justify fixture data, generation, parser/search detection, or UI actions.
4. Keep `core/nnc/place_gentilic` non-generative until confirmed Nawat/Pipil place/gentilic examples justify fixture data, generation, parser/search detection, or UI actions.
5. Keep `core/calendar` non-generative until confirmed Nawat/Pipil calendar-name examples justify data, schema, generation, or UI.
6. Keep `core/clause/adjunction` non-generative until confirmed Nawat/Pipil adjoined-unit or clause examples justify static data, generation, parser/search detection, or UI actions.
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
- `placeNameSubjectReference`
- `placeNameUsage`
- `placeFormationGroup`
- `gentilicFormation`
- `adverbialAdjunctionAst`

## Boundary: Lessons 51-58 Clause, Denominal, Names, And Miscellany

Date: 2026-06-06

Decision:

- Lessons 54-55 have partial Nawat/Pipil support through current denominal route profiles, route stations, source-state metadata, and tests.
- Current denominal support is route-based and does not complete the full Lessons 54-55 suffix-family inventory.
- The verified Andrews §54.2-§55.7 denominal contract inventory now exists as structural metadata: §54.2.1 `ti`, §54.2.2 `hui` plus `hui-lia`, §54.2.3 root-plus-`ya`, deverbal `ti-ya`/`hui-ya`, and `ya`-deleting `lia`, §54.2.4 limited `a`, §54.2.5 deverbal `hua`, §54.3 included-possessor `ti`, §54.4 possession `ti`, §54.2/§54.4 `ti` + `lia` causatives, §54.5 `ti-a`, §54.6 `t-ia`, §55.1 `tia`, §55.2 causative `tla`, §55.2 `tla -> ti-lia` applicative, §55.2 less-productive intransitive `tla`, the §55.2 note's intransitive `tla -> ti-a/ti-lia` continuations, §55.3 `o-a`/`huia`, the §55.3 note 2 `o-a` source to hypothetical `i-l-huia`/`a-l-huia` applicative path, §55.4 `huia`, §55.5 relational `o-a`/`huia`, §55.6 `i-hui`/`a-hui > o-a`, and §55.7 `i-a`. Classical rule spellings are converted to Nawat/Pipil letters in the metadata, and unmodeled contracts remain pending rather than generation.
- `generateNawatDenominalAndrewsContractRoutePreview()` now builds stem-only VNC route targets from that verified Andrews inventory for a supplied Nawat/Pipil source stem. Generated denominal output rows carry this preview in `denominalFamilyProfile.andrewsContractRoutePreview`, and rendering can show the target count, explicit-request count, object-prefix-required count, class-contract count, source-evidence-required count, warning count, note count, sample VNC inputs, and limited Andrews denominal VNC continuation chips. It converts Classical suffix sequences such as `hui`, `hui-lia`, `ti-ya`, `hui-ya`, `ya`, `lia`, `a`, `hua`, causative/intransitive `tla`, §55.2 replacement `ti-a`/`ti-lia`, `o-a`, `huia`, §55.3 note 2 `i-l-huia`/`a-l-huia`, `i-hui`, `a-hui`, and `i-a` into Nawat/Pipil route suffixes, records segmented target inputs, records verified Andrews stem classes for the supported Class A/B/C targets including §54.4 possession `ti` as Class A/B with no deverbal `ya`, §54.2/§54.4 `ti-lia` as Class C after generated `ti` source evidence, §54.2 `ti-ya` as Class A/B, and §54.2 `hui-ya` as Class B, records source requirements for §54.3 possessive-state predicates, §54.2.2 generated intransitive `hui` sources, §54.2.3 generated `ti`/`hui` sources before `ti-ya`/`hui-ya`, §54.2.3 generated intransitive `ya` sources with `ya` deletion before `lia`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` targets from generated intransitive `ti` sources, §55.1 temporal compounds, §55.2 `tla` causative sources, §55.2 note intransitive `tla` sources, §55.3 note 2 generated intransitive `o-a` sources that bypass the transitive `o-a` step through a hypothetical `i-hui`/`a-hui` source, §55.4 adverbial nounstems, §55.5 relational compounds/relational possessive predicates, and §55.6 `i-hui`/`a-hui` sources, records §55.7 `i-a` no-intransitive-counterpart, source-final pattern, w-final `huia` ambiguity, source-nounstem-`i`, and possible `i-hui` source-path diagnostics through finite request/execution provenance, and explicitly does not run finite VNC generation or create fixture evidence by itself. The finite §54.5 `ti-a` route is single-object only; Andrews' possessive-state double-object §54.5 path remains unmodeled rather than forced into the current VNC request. Generated ordinary possessive NNC outputs can now provide bounded §54.3 source evidence: the Nawat possessive predicate surface feeds the included-possessor `ti` target, and metadata records that the possessor remains inside the verbstem rather than becoming a VNC object. Generated ordinary NNC outputs can also provide the predicate nounstem for §54.4 possession `ti`, keeping nounstem-focused possession `ti` separate from the included-possessor path. Generated §54.2 inceptive/stative `ti` targets, generated §54.4 possession `ti` targets, and selected current `vi-ti` verbalizer stages can now satisfy the following `ti-ya`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` continuation contracts without creating lexical evidence; generated §54.2.2 `hui` targets satisfy `hui-ya` and `hui-lia`, and generated `ti-ya`/`hui-ya`/root-plus-`ya` targets satisfy the `ya`-deleting `lia` continuation after final `ya` is removed. Traditional `tia`/`huia` spellings are exposed only as ambiguity labels because Andrews warns they can be confused with causative/applicative suffixes. Generated §55.2 intransitive `tla` targets satisfy the note's `ti-a` and `ti-lia` continuations; generated §55.3 intransitive `o-a` targets satisfy the note 2 `i-l-huia` and `a-l-huia` applicative continuations. Explicit source-classification helpers now satisfy §55.4 adverbial-nounstem and §55.5 relational compound/possessive relational predicate source requirements only when a caller supplies that confirmed source classification; they do not treat legacy adverbio rows or relational boundary frames as automatic evidence. `buildNawatDenominalAndrewsContractRouteGenerateWordRequest()`, `executeNawatDenominalAndrewsContractRoute()`, `activateNawatDenominalAndrewsContractRouteTarget()`, `previewNawatDenominalAndrewsContractRouteNextSource()`, `previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput()`, `previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput()`, `previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource()`, and `previewNawatDenominalAndrewsRelationalCompoundRouteFromSource()` can route a selected Andrews target into the VNC engine only with an explicit target tense and with source evidence satisfied for source-limited targets; transitive, causative, applicative, and usually-transitive targets also require a Nawat object prefix before finite request construction.
- §55.1 temporal `tia` now has the same explicit source-classification boundary as §55.4 and §55.5: `previewNawatDenominalAndrewsTemporalTiaRouteFromSource()` accepts a confirmed compound-temporal NNC source with a time-segment matrix and numeral embed, satisfies the `temporal-compound-nounstem` route requirement, and does not treat generated `locativo-temporal` rows as automatic evidence.
- §54.2 inceptive/stative target class metadata follows Andrews' source-final wording after Nawat orthography: `ti` records Class A after consonant-final sources and A/B after vowel-final sources, `hui` records Class A after consonant-final sources and Class B after vowel-final sources, root-plus-`ya` and deverbal `ti-ya` record A/B, deverbal `hui-ya` records Class B, limited `a` records Class C, and `hua -> wa` records Class A without collapsing into §55.3 `o-a`.
- §55.7 source-final status is diagnostic metadata only: majority Classical `[c]`/`/l/` sources surface as Nawat `k/l`, attested minority `/k/`/`/n/` examples surface as Nawat `k/n` with Classical `/k/` collapsed into the same Nawat `k`, and w-final ambiguity remains a lexical-confirmation warning. It does not reject route targets or create fixture evidence.
- Current `data/static_modes.json` route profiles explicitly configure the supported denominal families (`vi-ti`, `vi-iwi`, `vi-awi`, and `vt-na`) and route contracts. Andrews-backed suffix contracts are limited to §54.2/§54.4 `ti` and §55.6 `i-hui`/`a-hui`, with Classical spellings converted to Nawat letters as `ti`, `i-wi`, and `a-wi` before `-ti`, `-iwi`, and `-awi` route metadata is surfaced. The existing `vt-na` route is kept as current Nawat route data only because the verified Andrews wording supports transitive denominal `i-a`, `o-a`, and `huia`, not `-na`; metadata marks it `nawat-transitive-route-no-andrews-suffix` and `noAndrewsSuffixContract`. Source-state, generated-output, route-family inventory, and linked route-preview metadata derive from that route data and mark `routeProfileSource: "static-modes"` when configured data is available. Preview stages carry `nextSource` candidates for later composition; selected `vi-ti` verbalizer stages carry bounded generated `ti` source evidence into the next route preview so `ti-ya`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` continuations can become finite-routable only after that generated stage is selected, and selected `vi-iwi`/`vi-awi` verbalizer stages carry bounded §55.6 `i-hui`/`a-hui` source evidence so the matching `o-a` counterpart can become finite-routable only after that generated stage is selected. Andrews contract route targets can now do the same when the PDF states a target is the source for a later route: generated §54.2/§54.4 `ti` satisfies the following `ti-ya`, `ti-lia`, `ti-a`, and `t-ia` source requirements, generated §54.2.2 `hui` satisfies `hui-ya` and `hui-lia`, generated §54.2.3 `ya` satisfies `ya-lia`, generated `ti-ya`/`hui-ya` satisfy `ya-lia` after final `ya` deletion, generated §55.2 causative `tla` satisfies the following `tla -> ti-lia` source requirement, generated §55.2 intransitive `tla` satisfies the note's `ti-a`/`ti-lia` source requirements, generated §55.3 intransitive `o-a` satisfies the note 2 `i-l-huia`/`a-l-huia` applicative source requirements, and generated §55.6 `i-hui`/`a-hui` satisfies the `o-a` counterpart source requirement. Linked stages can be converted into direct generation requests, linked-stage execution returns provenance, next-source preview can show supported route-family candidates for a selected stage without executing it or mutating state, chain preview can compose an explicit user-selected sequence of stages, `buildNawatLinkedGrammarPathSelectionSummary()` can expose the current source plus appendable next route/stage choices without executing stages, selection-state helpers can store/clear/backtrack an explicit selected stage chain without executing it, and chain execution can run that sequence while preserving linked-path provenance. The visible linked-path controls live dynamically in `#3 SALIDA` as output composition, not as a separate `ruta nawat` rail; reusable stages show `Siguiente fuente`, `Salida de etapa`, `Continuaciones`, and bounded Andrews source-evidence labels, and selected-path helpers show `Fuente actual`, `Opciones siguientes`, and `Siguiente salida`. Andrews continuation chips can distinguish pending source evidence from source evidence satisfied by a generated stage and can mark traditional `tia`/`huia` spelling ambiguity without treating those spellings as separate Nawat evidence. The output surface can show appendable next choices plus `seguir` actions that store the chosen next route without executing it, selected chains can render back as `Trayecto`, `atrás` can backtrack the last selected stage, `borrar` can clear the chain, `generar trayecto` can execute the stored chain on request, `usar etapa N` can promote any executed stage's generated surface as the new linked-path source while retaining wrapped source-input provenance, `usar salida` can promote the final generated surface as the new linked-path source and sync it into the visible input only for that explicit promotion action, and the selected-path summary can offer multiple `seguir` choices from that promoted/current source. This adds no route families and does not complete Lessons 54-55.
- Lesson 51 complementation has non-generative AST metadata plus diagnostic boundary metadata; it does not have confirmed clause examples, static data, or generation.
- Lesson 52 conjunction has non-generative AST metadata plus diagnostic boundary metadata; it does not have confirmed clause examples, static data, parser/search behavior, or generation. Lesson 53 comparison has diagnostic boundary metadata only.
- Lesson 56 personal-name NNCs have diagnostic boundary metadata only; they do not have confirmed name examples, data, or generation.
- Appendix E calendar names have diagnostic boundary metadata only; they do not have confirmed calendar-name examples, data, or generation.
- Lessons 57-58 textual diagnostics, nonsystemic tense, irregular valence, absolute topic, agreement mismatch, `mah` constructions, and miscellany have diagnostic boundary metadata only; they do not have confirmed text examples, data, or an analysis engine.
- Current Lesson 51 metadata records the boundary between VNC/NNC outputs, object controls, subject labels, nominalization profiles, translations, CSV verb rows, single generated words, and confirmed complement-clause evidence. It also provides `buildComplementClauseAst()` for supplied clause/NNC/VNC surfaces: object complements link the principal object pronoun to the complement subject, subject complements link the principal subject pronoun to the complement subject, adverbial complements record principal-subject or relational-stem compatibility, passive transforms of object-complement naming are represented as subject complements, and relational adverbial complements can record later active-action incorporation risk. It does not generate forms or change valency.
- Current Lesson 52 metadata records the boundary between parser separators, slash/CSV variants, particle labels, translations, route labels, single generated words, and confirmed conjunction evidence. It also provides `buildConjunctionClauseAst()` for supplied Nawat/Pipil surfaces: balanced no-head conjunction, additive/alternative/adversative coordination, principal/adjoined/lexical levels, marked `auh`, unmarked juxtaposition, adverbial modifiers such as `ihuan` that are not conjunctors, paired correlative particles, lexical innovation by conjoined NNCs, and rephrasive/progressive/appositive parallelism. It does not change parser behavior or generation.
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
3. Keep `core/clause/complement` and `core/clause/conjunction` non-generative until confirmed Nawat/Pipil examples justify static data, parser/search detection, generation, or UI. Keep `core/comparison` non-generative until confirmed examples justify data, schema, generation, or UI.
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

## Completed Phase: LCM UI Panels Result Surface Reader v1

Date: 2026-06-08

Decision:

- Panel visibility now reads the LCM result surface contract before legacy `result.result`.
- `src/ui/panels/panels.js` exposes `getPanelConjugationRenderableSurface()`, delegating to the agreement-layer `getConjugationRenderableSurface()` when present and otherwise reading `grammarFrame.resultFrame.surface`, `frames.resultFrame.surface`, `result.surface`, then legacy `result.result`.
- `isConjugationResultVisible()` no longer rejects rows solely because legacy `result.result` is blank or `—` when a framed surface exists.
- The existing diagnostic and invalid-combination masking remains unchanged through `getConjugationMaskState()`.
- This is UI reader plumbing only. It adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 heading/opening wording for `Pronunciation. Orthography`.
- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as rigidly sequenced stem-plus-affix constructs with NNC/VNC layers.
- Verified local Andrews PDF Lesson 40 wording that adjectival NNC function is syntactic and that NNC/VNC predicates may be translated as adjectives.

Verification:

- `node --check src/ui/panels/panels.js`: passed.
- `node --check src/ui/panels/panels.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1577/1577.
- `node scripts/run_tests.js --runtime=module`: passed, 1577/1577.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Continuation Target Surface Reader v1

Date: 2026-06-08

Decision:

- Continuation chips that promote generated nominal outputs now read target surfaces from the LCM surface reader before legacy `result.result`.
- `src/ui/rendering/rendering.js` exposes `getPrimaryConjugationSurface()`, which reads `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and then legacy `result.result`.
- The calificativo/action-noun source-subject possessor continuation and instrumentivo source-subject possessor continuation now use framed target surfaces for visibility checks, duplicate prevention, `data-target-surface`, chip labels, and titles.
- The existing Andrews route/evidence datasets are still projected through `applyGrammarFrameRouteDataset()`.
- This is UI reader plumbing only. It adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 36 wording for nominalized VNCs, including §36.6 instrumentive NNC source-subject-to-possessor behavior and §§36.10-36.11 passive/active action NNC source structure.
- Verified local Andrews PDF Lesson 40 wording that adjectival NNC function is syntactic and that patientive/potential-patient nounstems can function adjectivally by translation/function.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1578/1578.
- `node scripts/run_tests.js --runtime=module`: passed, 1578/1578.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generate Word Framed Surface Normalization v1

Date: 2026-06-08

Decision:

- Generate-word contract wrapping now reads existing `grammarFrame.resultFrame.surface` / `frames.resultFrame.surface` before legacy `result.result`.
- `src/core/generation/engine.js` adds generation-local frame readers and uses them when rebuilding `grammarFrame.resultFrame`, `surfaceForms`, and fallback result contracts.
- `src/core/generation/runtime_support.js` uses the same framed-surface precedence for runtime blocked/no-output wrappers.
- This prevents a pre-framed route result from being collapsed to blank or `—` by generation-layer wrapping before the UI can read the contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording for orthography/spelling as a distinct representation layer.
- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as ordered stem-plus-affix structures with formula slots.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1580/1580.
- `node scripts/run_tests.js --runtime=module`: passed, 1580/1580.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI State Route Surface Reader v1

Date: 2026-06-08

Decision:

- UI state route helpers now read `grammarFrame.resultFrame.surfaceForms` / `grammarFrame.resultFrame.surface` before legacy `result.result`.
- `src/ui/state.js` adds state-local frame surface readers and uses them in `getPrimaryNawatRouteSurfaceForm()`, `buildReduplicatedConjugationResult()`, and denominal Andrews finite route support detection.
- Nawat linked/denominal route controls can now keep a pre-framed route output as supported even if legacy `result.result` is `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 54 wording for denominal verbstem source/target derivations, including §54.1-§54.5.
- Verified local Andrews PDF Lesson 55 wording for temporal `tia`, `tla`, `o-a`/`huia`, `i-hui`/`a-hui`, and transitive denominal `i-a` route families.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js`: passed, 1582/1582.
- `node scripts/run_tests.js --runtime=module`: passed, 1582/1582.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Adjectival Continuation Target Surface Reader v1

Date: 2026-06-08

Decision:

- Patientive and nominalized-VNC adjectival-function continuation chips now read target surfaces from the shared LCM surface reader before legacy `contract.result`.
- `src/ui/rendering/rendering.js` uses `getPrimaryConjugationSurface(contract)` for continuation `data-target-surface`, labels, titles, duplicate checks, and `applyAdjectivalNncFunctionToVerbEntry()` payloads.
- This keeps Andrews 40.4 and 40.5-40.8 adjectival-function continuations renderable when a route returns a framed result surface but legacy `contract.result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF §40.4 wording: derivationally generated potential-patient and patientive nounstems create NNCs that often translate as adjectives.
- Verified local Andrews PDF §40.5-§40.8 wording: nominalized VNC predicates, including customary-present agentive, customary-present patientive, and preterit-agentive NNC predicates, may function/translate adjectivally.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js ui`: passed, 1582/1582.
- `node scripts/run_tests.js ui --runtime=module`: passed, 1582/1582.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Rendering Display Surface Reader v1

Date: 2026-06-08

Decision:

- Rendering display paths now consume joined LCM surface forms through `getConjugationDisplaySurface()` instead of formatting legacy `result.result` directly.
- `src/ui/rendering/rendering.js` uses frame-first display surfaces for ordinary NNC rows, nonactive rows, verbal rows, nominal/adjectival rows, direct adjectival-function rows, row dedupe keys, and source surfaces passed into ownerhood continuations.
- Silent finite preview readers for prelocative, compound embed, preterit-agentive ownerhood, and nominal compound previews now use `getPrimaryConjugationSurface()` so framed result surfaces are visible before legacy text.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF §4.1-§4.4 wording: nuclear clauses are stem-plus-affix structures, with VNC/NNC as distinct nuclear-clause kinds and formula slots governing displayable surfaces.
- Reused the same Andrews §40.4-§40.8 verification for adjectival-function display rows without adding new grammar licenses.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js ui`: passed, 1584/1584.
- `node scripts/run_tests.js ui --runtime=module`: passed, 1584/1584.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generate Word Frame Source Input Normalization v1

Date: 2026-06-08

Decision:

- Generate-word grammar frames now normalize the rendered/source input before storing it in `grammarFrame.resultFrame.sourceInput`.
- `src/core/generation/engine.js` adds `resolveGenerateWordFrameSourceInput()`, which rejects legacy no-output markers, then reads the framed result surface, then stem/input fallbacks.
- `stemFrame.stem` now also avoids preserving legacy `—` when a framed surface is the only renderable output.
- This keeps pre-framed route outputs from leaking no-output markers into the output/provenance layer even when legacy `result.result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF §4.3-§4.4 wording: nuclear-clause formulas require ordered slots around the predicate stem, and VNC/NNC predicate structures differ by their licensed positions.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `npm run check:data`: passed.
- `node scripts/run_tests.js vnc`: passed, 1584/1584.
- `node scripts/run_tests.js vnc --runtime=module`: passed, 1584/1584.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Verb-Derived NNC Surface Gate Reader v1

Date: 2026-06-08

Decision:

- Verb-derived nominal NNC routes now read the LCM result-frame surface contract before legacy `result.result`.
- `src/core/nnc/nnc.js` adds frame-aware verb-derived nominal surface readers for `grammarFrame.resultFrame` / `frames.resultFrame`, `surface`, `surfaceForms`, and legacy result text.
- Instrumentivo, direct instrumentivo, calificativo-instrumentivo, and locativo-temporal no-output gates now use the shared surface reader instead of rejecting a result solely because legacy `result.result` is blank or `—`.
- `attachVerbDerivedNominalGrammarContract()` uses the same reader when projecting `surface`, `surfaceForms`, `ok`, and `resultFrame`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF §36.6 wording for instrumentive NNC nominalization from customary-present/imperfect verbal sources.
- Verified local Andrews PDF §36.10-§36.11 wording for passive-action and active-action NNCs, including source-subject-to-possessor structure.
- Verified local Andrews PDF §46.4 wording for locative/temporal `(-n)-tli-` matrix NNCs from nominalized imperfect-tense verbal predicates.

Verification:

- `node --check src/core/nnc/nnc.js`: passed.
- `node --check src/core/nnc/nnc.mjs`: passed.
- `node --check src/tests/nnc.test.js`: passed.
- `node scripts/run_tests.js nnc`: passed, 1585/1585.
- `node scripts/run_tests.js nnc --runtime=module`: passed, 1585/1585.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Preterit Result Surface Reader v1

Date: 2026-06-08

Decision:

- Preterit/perfective class-output and variant-assembly wrappers now read the LCM result-frame surface contract before legacy `result.result`.
- `src/core/preterit/api.js` adds frame-aware preterit class-output surface readers for `grammarFrame.resultFrame` / `frames.resultFrame`, `surface`, `forms`, and legacy result text.
- `src/core/preterit/engine.js` adds the same frame-first reader for direct variant assembly.
- `attachPreteritClassBasedGrammarContract()` and `attachPretUniversalVariantAssemblyGrammarContract()` now project `surface`, `surfaceForms`, `ok`, and `resultFrame` from those readers, so a framed route is not collapsed to `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 7 heading/opening wording for verbstem classes and citation/valence structure.
- Verified local Andrews PDF §7.4 wording for class-B perfective-stem spelling/phonological changes.
- Verified local Andrews PDF §7.5 wording for variable Class A/B perfective-stem alternatives.

Verification:

- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js preterit`: passed, 1587/1587.
- `node scripts/run_tests.js preterit --runtime=module`: passed, 1587/1587.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Rendering Continuation Surface Reader v1

Date: 2026-06-08

Decision:

- Remaining rendering continuations now consume the shared LCM surface readers instead of splitting legacy `result.result` directly.
- `src/ui/rendering/rendering.js` uses `getPrimaryConjugationSurface()` for linked path final labels, ordinary NNC ownerhood finite previews, and patientivo source finite previews.
- Patientivo row display, patientivo conversion surfaces, action-nominal surfaces, calificativo general-use source displays, and grouped noun-combo evaluations now use `getConjugationDisplaySurface()` / `getConjugationSurfaceForms()`.
- The only remaining direct legacy `result?.result` fallback in rendering is inside the shared `getConjugationSurfaceForms()` reader, after the frame-first path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are stem-plus-affix structures with subject/predicate functions arranged in rigid structure.
- Verified local Andrews PDF §35.9 wording for preterit-agentive ownerhood NNC continuations.
- Verified local Andrews PDF §39.8 wording for patientive nounstem incorporated-object continuations and possessor-to-object transformation.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui`: passed, 1587/1587.
- `node scripts/run_tests.js ui --runtime=module`: passed, 1587/1587.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI State Linked Path Generated Frame Preservation v1

Date: 2026-06-08

Decision:

- Linked grammar path execution summaries now preserve the generated stage's LCM contract instead of reducing the stage to legacy `result` and `surfaceForms` text.
- `src/ui/state.js` adds `getStateResultDisplaySurface()` and uses the existing frame-first state surface reader for generated chain result text.
- Each executed linked-path `generated` record now carries `surface`, frame-first `surfaceForms`, `primarySurface`, `ok`, `grammarFrame`, `frames`, `diagnostics`, and `contractDiagnostics`.
- Denominal Andrews source extraction from ordinary NNC output now uses `getPrimaryNawatRouteSurfaceForm()` instead of separately reading legacy `surfaceForms` / `result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 54 wording for denominal verbstems derived from nounstems by stem-forming suffixes, including inceptive/stative `ti`, `hui`, `ya`, `a`, and `hua`.
- Verified local Andrews PDF Lesson 55 wording for additional denominal verbstem suffixes, including temporal intransitive `tia` and causative `tla`.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state`: passed, 1587/1587.
- `node scripts/run_tests.js state --runtime=module`: passed, 1587/1587.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Shared Result Contract Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical shared result contract now accepts `grammarFrame.resultFrame.surfaceForms` as renderable output even when `resultFrame.surface` and legacy `result.result` are blank or `—`.
- `src/core/grammar/frame.js` adds `getGrammarResultContractSurfaceForms()` and `splitGrammarResultContractSurfaceText()` for frame-first surface collection.
- `buildGrammarResultContract()` now exposes `surfaceForms` on the common contract and derives `ok` from either a primary surface or frame-first surface forms.
- This prevents shared wrappers that rely on `buildGrammarResultContract()` from treating a surface-forms-only LCM result as generic no-output.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording for pronunciation/orthography as a distinct spelling/representation layer.
- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as subject/predicate structures formed by stems plus inflectional affixes in rigid order.

Verification:

- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node scripts/run_tests.js grammar_frame`: passed, 1588/1588.
- `node scripts/run_tests.js grammar_frame --runtime=module`: passed, 1588/1588.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Agreement Renderable Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Agreement visibility now treats `grammarFrame.resultFrame.surfaceForms` as renderable output before falling back to legacy surface/result text.
- `src/core/agreement/agreement.js` adds `getConjugationRenderableSurfaceForms()` so evaluation, mask state, and UI presentation can share the same frame-first surface reader.
- `buildConjugationEvaluationRecord()` now inherits frame-surface-form visibility through `getConjugationRenderableSurface()`, preventing a valid LCM result from collapsing into generic no-output status.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 heading for nuclear clauses through the bundled PDF reader before routing this visibility change.
- Verified local Andrews PDF VNC formula pages containing `#pers1-pers2(STEM)` as the agreement-layer subject/predicate/affix boundary evidence.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node scripts/run_tests.js agreement`: passed, 1589/1589.
- `node scripts/run_tests.js agreement --runtime=module`: passed, 1589/1589.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Clause/Panel Surface-Forms Readers v1

Date: 2026-06-08

Decision:

- Clause composition readers now consume `grammarFrame.resultFrame.surfaceForms` before legacy text when building AST nodes for adjectival modification, adverbial adjunction, complementation, and conjunction.
- The readers split slash variants, ignore the legacy empty marker `—`, and keep composition non-generative: they preserve supplied/generated surfaces rather than creating new word forms.
- Panel visibility fallback now also reads frame-first surface forms when the agreement helper is unavailable, so HTML controls do not hide framed outputs behind the generic no-output path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 42 wording for multiple-nucleus adjectival modification as clause composition and Lesson 43 wording for nonpreposed adjectival modifiers.
- Verified local Andrews PDF Lessons 49-50 wording for adverbial modification with adjoined/adverbialized clause units.
- Verified local Andrews PDF Lesson 51 wording for complementation as double-nucleus/adjoined NNC structures.
- Verified local Andrews PDF Lesson 52 wording for conjunction as balanced concatenate structure with no head.

Verification:

- `node --check` on changed clause, panel, and focused test files: passed.
- `node scripts/run_tests.js modification complement conjunction adjunction ui`: passed, 1594/1594.
- `node scripts/run_tests.js modification complement conjunction adjunction ui --runtime=module`: passed, 1594/1594.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generate Runtime Surface-Forms Readers v1

Date: 2026-06-08

Decision:

- Generation contract surface readers now consume `grammarFrame.resultFrame.surfaceForms` before falling back to legacy `result` text.
- `normalizeGrammarFrameSurfaceForms()` now splits slash variants and filters the legacy empty marker `—`, matching the shared LCM result contract reader.
- Generation runtime support now exposes `getGenerateRuntimeSurfaceForms()` and preserves frame-first surface forms when wrapping a blocked runtime contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as syntactically complete stem-plus-inflection structures.
- Verified local Andrews PDF Lesson 24 wording for stem-final vowel and valence framing before touching generate-runtime routing.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine grammar_frame`: passed, 1595/1595.
- `node scripts/run_tests.js morphology_engine grammar_frame --runtime=module`: passed, 1595/1595.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Rendering Realization Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- `buildGrammarFrameSubLabels()` now reads `orthographyFrame.surfaceForms` and `resultFrame.surfaceForms` before showing `Realizacion Nawat: pendiente`.
- Rendering labels split slash variants and ignore the legacy empty marker `—`, so frame-surface-forms-only results still expose a user-facing Nawat realization label.
- The UI remains inverted: it renders status/route/evidence/realization/diagnostics from the frame rather than visually mirroring the Andrews LCM document.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording for pronunciation/orthography and graphical representation before touching the UI realization label.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui`: passed, 1596/1596.
- `node scripts/run_tests.js ui --runtime=module`: passed, 1596/1596.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival NNC Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The adjectival NNC grammar contract now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before legacy `result` text when rebuilding route frames.
- `attachAdjectivalNncGrammarContract()` now carries split, deduped frame-first surface forms through `surface`, `surfaceForms`, `resultFrame`, and `orthographyFrame`.
- This prevents VNC/NNC adjectival-function routes from losing a framed surface and falling into a generic no-output path when legacy `result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40 wording before patching: §40.1 defines adjective as syntactical rather than formal, §40.3 allows absolutive-state NNCs and VNCs to function adjectivally, and §40.4 covers patientive/potential-patient nounstems.

Verification:

- `node --check src/core/nnc/adjectival/adjectival.js`: passed.
- `node --check src/core/nnc/adjectival/adjectival.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js nnc_adjectival ui`: passed, 1597/1597.
- `node scripts/run_tests.js nnc_adjectival ui --runtime=module`: passed, 1597/1597.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Morphology Application Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The morphology application contract now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to morphology output fields.
- `attachMorphologyApplicationGrammarContract()` now splits slash variants, filters the legacy empty marker `—`, and projects frame-first surface forms into `orthographyFrame` and `resultFrame`.
- Blocked morphology paths remain blank-surface failures, but pre-framed successful morphology outputs no longer collapse to `output.verb` before the UI can read the LCM result layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 5 wording for the intransitive VNC formula and tense morph positions.
- Verified local Andrews PDF Lesson 7 wording for verbstem morphemic structure and stem-class framing.

Verification:

- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine grammar_frame`: passed, 1598/1598.
- `node scripts/run_tests.js morphology_engine grammar_frame --runtime=module`: passed, 1598/1598.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Output Surface Wrapper Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The output-surface contract wrapper now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to top-level `surfaceForms`, `surface`, legacy `result`, or locally joined output segments.
- `attachOutputSurfaceGrammarContract()` now splits slash variants, filters the legacy empty marker `—`, and projects frame-first forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`.
- Output word/nominal builders still preserve their local segment-join fallback when no pre-framed result exists, but a valid LCM result layer no longer collapses into a generic no-output surface path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording for phonemes and graphical orthography before patching output-surface spelling realization.
- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as stem-plus-inflection syntactic constructs before patching output-surface clause/segment contracts.

Verification:

- `node --check src/core/output/surface.js`: passed.
- `node --check src/core/output/surface.mjs`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node scripts/run_tests.js surface grammar_frame`: passed, 1601/1601.
- `node scripts/run_tests.js surface grammar_frame --runtime=module`: passed, 1601/1601.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Output Provenance Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Output provenance contracts now read `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to top-level `surfaceForms`, `surface`, provenance `surfaceStem`, legacy `result`, or local derivation-stem fallback.
- `attachOutputProvenanceGrammarContract()` now splits slash variants, filters the legacy empty marker `—`, and projects frame-first forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`.
- `getProvenancePrimaryStemSurface()` now reads a framed primary variant surface before deriving a local stem from `surfaceStem` or `stemSpec`, so provenance composition does not hide a valid LCM result layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 7 wording for verbstem morphemic structure before patching stem-provenance surface reading.
- Verified local Andrews PDF Lesson 24 wording for valence and stem-final vowel before patching causative/output-provenance contracts.

Verification:

- `node --check src/core/output/provenance.js`: passed.
- `node --check src/core/output/provenance.mjs`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node scripts/run_tests.js surface grammar_frame`: passed, 1604/1604.
- `node scripts/run_tests.js surface grammar_frame --runtime=module`: passed, 1604/1604.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI State Route-Control Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Static Nawat route-control targets now read existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to local target surfaces.
- `attachNawatStaticRouteGrammarFrame()` now projects frame-first route-target forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`, while preserving legacy record surfaces after framed forms.
- Route station chip surface text now reads only actual frame-result surface forms before falling back to station labels, so label text such as `pasivo/impersonal` is not split as if it were generated-form variants.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lessons 38 and 39 wording for patientive nounstem route authority before patching patientivo route controls.
- Verified local Andrews PDF Lessons 54 and 55 wording for denominal verbstem route authority before patching static Nawat route-control targets.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state grammar_frame`: passed, 1606/1606.
- `node scripts/run_tests.js state grammar_frame --runtime=module`: passed, 1606/1606.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Rendering Display Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The shared UI rendering surface reader now keeps `getConjugationFrameSurfaceForms()` frame-only and applies fallback order in `getConjugationSurfaceForms()`.
- Rendering display/continuation surfaces now prefer `grammarFrame.resultFrame.surfaceForms`, then `grammarFrame.resultFrame.surface`, then top-level `surfaceForms`, then top-level `surface`, and only use legacy `result` when no canonical/display surface exists.
- This prevents a top-level `surface` from hiding top-level `surfaceForms`, and keeps legacy `result` from being appended when framed or canonical surfaces already produced a display value.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording for phonemes and graphical orthography before patching display-surface realization.
- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as stem-plus-inflection syntactic constructs before patching rendered route display output.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui grammar_frame`: passed, 1607/1607.
- `node scripts/run_tests.js ui grammar_frame --runtime=module`: passed, 1607/1607.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC Allomorphy Contract Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The shared VNC allomorphy metadata wrapper now projects surface forms into the canonical LCM result layer instead of requiring each source-contract caller to set `resultFrame.surfaceForms` manually.
- `attachVncAllomorphyGrammarContract()` now reads existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` first, then orthography-frame forms, top-level forms, local `outputSurface` / `selectedOutputSurface` / `nawatSurfaceSuffix`, target-contract output, and finally legacy `result`.
- Patientive source suffix, perfective-ending, imperfective-stem, root/stock, source-stage, and multiple-derivation contracts now carry frame-first surface forms through `resultFrame` and `orthographyFrame`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 37 wording for deverbal nounstem derivation before patching allomorphy source contracts.
- Verified local Andrews PDF Lesson 38 wording for impersonal patientive nounstems before patching nonactive/patientive source-contract frames.
- Verified local Andrews PDF Lesson 39 wording for perfective patientive nounstems before patching perfective/imperfective/root-stock source-contract frames.

Verification:

- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine grammar_frame`: passed, 1608/1608.
- `node scripts/run_tests.js morphology_engine grammar_frame --runtime=module`: passed, 1608/1608.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Grammar Metadata Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical grammar metadata frame builder now reads an existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before local metadata surfaces.
- `buildGrammarMetadataContractFrame()` now normalizes slash variants and the legacy empty marker `—` through the shared result-contract splitter, then falls back through explicit options, top-level `surfaceForms`, output surface forms, top-level `surface`, output primary surface, and only then legacy `result`.
- Direct calls to `attachGrammarMetadataContract()` can no longer rebuild a metadata frame that drops a valid pre-existing LCM result surface into generic legacy output.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as syntactically complete stem-plus-inflection constructs before patching the generic metadata/result contract bridge.

Verification:

- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node scripts/run_tests.js grammar_frame`: passed, 1609/1609.
- `node scripts/run_tests.js grammar_frame --runtime=module`: passed, 1609/1609.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Verb-Derived NNC Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Verb-derived nominal NNC result readers now use the same frame-first surface priority as the shared LCM contract layer.
- `getVerbDerivedNominalSurfaceForms()` now reads `grammarFrame.resultFrame.surfaceForms`, then `grammarFrame.resultFrame.surface`, then top-level `surfaceForms`, then top-level `surface`, and finally legacy `result`.
- `getVerbDerivedNominalSurface()` now selects the first normalized surface form, so top-level `surface` cannot hide available variants and legacy `result` cannot outrank framed/canonical surfaces.
- Existing display text remains in legacy `result`; the contract `surface` now carries the primary form while `surfaceForms` carries the variants.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lessons 35 and 36 wording for VNC nominalization before patching verb-derived nominal NNC result readers.
- Verified local Andrews PDF Lesson 37 wording for deverbal nounstems before patching active-action/deverbal result readers.
- Verified local Andrews PDF Lesson 46 wording for locative/temporal nounstem framing before patching locative-temporal derived nominal result readers.

Verification:

- `node --check src/core/nnc/nnc.js`: passed.
- `node --check src/core/nnc/nnc.mjs`: passed.
- `node --check src/tests/nnc.test.js`: passed.
- `node scripts/run_tests.js nnc grammar_frame`: passed, 1610/1610.
- `node scripts/run_tests.js nnc grammar_frame --runtime=module`: passed, 1610/1610.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generation Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Generation engine and runtime surface resolvers now select the primary surface from normalized LCM surface forms before falling back to `resultFrame.surface`, top-level `surface`, or legacy `result`.
- `resolveGenerateWordContractSurface()` and `resolveGenerateRuntimeContractSurface()` now honor the requested priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and only then legacy `result`.
- Rebuilt generation frames now carry the primary surface-form value through `resultFrame.surface`, `resultFrame.sourceInput`, and `stemFrame.stem` when a pre-framed result supplies multiple surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as syntactically complete stem-plus-inflection constructs before patching generation output routing.
- Verified local Andrews PDF Lesson 5 wording for the intransitive VNC formula before patching generated VNC primary surfaces.
- Verified local Andrews PDF Lesson 7 wording for verbstem morphemic structure before patching generated stem/source-input projection.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame`: passed, 1610/1610.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame --runtime=module`: passed, 1610/1610.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Preterit Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Preterit/perfective class-based and universal-variant result readers now select primary output from normalized surface forms before falling back to `resultFrame.surface`, top-level `surface`, or legacy `result`.
- `getPreteritClassBasedSurfaceForms()` and `getPretVariantAssemblySurfaceForms()` now treat route-local `forms` as the surface-form list before top-level `surface`.
- `getPreteritClassBasedSurface()` and `getPretVariantAssemblySurface()` now honor the LCM priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and only then legacy `result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 7 wording for verbstem classes and morphemic structure before patching preterit/perfective surface projection.
- Verified local Andrews PDF Lesson 11 wording for irregular VNCs and perfective-stem formation before patching preterit/perfective route contracts.

Verification:

- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js preterit grammar_frame`: passed, 1610/1610.
- `node scripts/run_tests.js preterit grammar_frame --runtime=module`: passed, 1610/1610.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival Function Composer Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Adjectival NNC function UI promotion now resolves the applied verb-entry surface from `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before the clicked/local surface argument.
- `buildAdjectivalNncFunctionEntryContract()` and `applyAdjectivalNncFunctionToVerbEntry()` now share a frame-first surface reader, so promoted chips cannot carry stale display text into the verb input when the LCM result layer supplies a canonical surface.
- The visible input value, dataset surface, serialized route contract, and later override all preserve the same frame-first surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40 wording for adjectival NNCs as syntactical NNC function before patching adjectival-function UI promotion.

Verification:

- `node --check src/ui/composer/composer.js`: passed.
- `node --check src/ui/composer/composer.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js nnc_adjectival ui grammar_frame`: passed, 1611/1611.
- `node scripts/run_tests.js nnc_adjectival ui grammar_frame --runtime=module`: passed, 1611/1611.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Shared/Adjectival Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical `buildGrammarResultContract()` primary `surface` now selects the first normalized LCM surface-form entry before falling back to singular `resultFrame.surface`, top-level `surface`, or legacy `result`.
- Adjectival NNC result readers now use the same priority for top-level data: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surfaceForms`, top-level `surface`, then legacy `result`.
- This closes the mirror-inversion gap where the JS layer collected LCM variants but could still display a singular mirrored surface first.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formulas as ordered slots/categories before patching the shared result contract.
- Verified local Andrews PDF Lesson 40 wording for adjectival NNC function before patching adjectival NNC surface readers.

Verification:

- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/core/nnc/adjectival/adjectival.js`: passed.
- `node --check src/core/nnc/adjectival/adjectival.mjs`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js grammar_frame nnc_adjectival`: passed, 1613/1613.
- `node scripts/run_tests.js grammar_frame nnc_adjectival --runtime=module`: passed, 1613/1613.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.

## Completed Phase: LCM Evaluation Generic No-Output Failed-Layer Reader v1

Date: 2026-06-08

Decision:

- Conjugation evaluation now synthesizes a framed Andrews/LCM failed-layer diagnostic when a blocked `grammarFrame` would otherwise display only a generic no-output diagnostic.
- The synthesized diagnostic records `failedLayer` and `contractLayer`, choosing authority, route, or result from the blocked frame before falling back to diagnostic status.
- Specific route diagnostics remain primary; the framed failed-layer diagnostic is promoted only when diagnostics are empty or generic no-output placeholders.
- This keeps unsupported paths from collapsing to `La generacion no produjo una forma.` when the LCM contract already identifies the blocked layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formulas as ordered slots/categories before patching evaluation failed-layer diagnostics.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node scripts/run_tests.js agreement grammar_frame`: passed, 1614/1614.
- `node scripts/run_tests.js agreement grammar_frame --runtime=module`: passed, 1614/1614.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generate Word Generic Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Generic `generateWord()` blocked diagnostics now carry LCM failed-layer metadata instead of only an id/message pair.
- `buildGenerateWordDiagnosticEntry()` records `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- `buildGenerateWordBlockedResult()` derives the failed layer from the blocked route stage: morphology/stem stages map to `stemFrame`, orthography/spelling stages to `orthographyFrame`, agreement/participant stages to `participantFrame`, output/no-output stages to `resultFrame`, and other stages to `routeContract`.
- The morphology-application blocked path now proves the generator-level diagnostic names the stem layer before UI fallback display.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that the nuclear-clause hierarchy has the stem as the foundation layer before patching generator failed-layer metadata.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine grammar_frame`: passed, 1614/1614.
- `node scripts/run_tests.js morphology_engine grammar_frame --runtime=module`: passed, 1614/1614.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Core Blocked Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Remaining core blocked-diagnostic builders now carry LCM failed-layer metadata instead of relying on UI fallback synthesis.
- Runtime no-output and morphology-application fallbacks mark `failedLayer: "stem"` / `contractLayer: "stemFrame"` because these paths block before usable stem output.
- Verb-derived nominal fallback and specific diagnostics mark `failedLayer: "route"` / `contractLayer: "routeContract"` so unsupported nominal routes identify the route layer directly.
- Preterit class-output fallbacks mark `failedLayer: "output"` / `contractLayer: "resultFrame"`; preterit variant-source fallbacks mark `failedLayer: "route"` / `contractLayer: "routeContract"`.
- Existing route-specific diagnostic messages remain primary; this phase adds contract-layer metadata to them.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that the nuclear-clause hierarchy has the stem as the foundation layer before patching core blocked-diagnostic metadata.

Verification:

- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/core/nnc/nnc.js`: passed.
- `node --check src/core/nnc/nnc.mjs`: passed.
- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node --check src/tests/nnc.test.js`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js morphology_engine nnc preterit grammar_frame`: passed, 1614/1614.
- `node scripts/run_tests.js morphology_engine nnc preterit grammar_frame --runtime=module`: passed, 1614/1614.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Composition AST Surface-Forms Priority Reader v1

Date: 2026-06-08

Decision:

- Composition AST input readers now preserve the same LCM/canonical surface priority used by generators and UI renderers.
- Adverbial adjunction, adjectival modification, complement clause, and conjunction AST builders read `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surfaceForms`, top-level `surface` / display surfaces, and only then legacy `result`.
- This prevents supplied framed/canonical clause units from being collapsed to stale legacy display text before AST composition.
- Existing composition behavior remains non-generative; these builders still compose supplied Nawat/Pipil clause/unit surfaces rather than creating new word forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 49 wording for structures of adverbial modification, Lesson 50 wording for adjoined clause relations, Lesson 51 wording for complement clauses, and Lesson 52 wording for conjunction and parallel/conjoined structures before patching composition surface readers.

Verification:

- `node --check src/core/clause/adjunction/adjunction.js`: passed.
- `node --check src/core/clause/adjunction/adjunction.mjs`: passed.
- `node --check src/core/clause/modification/modification.js`: passed.
- `node --check src/core/clause/modification/modification.mjs`: passed.
- `node --check src/core/clause/complement/complement.js`: passed.
- `node --check src/core/clause/complement/complement.mjs`: passed.
- `node --check src/core/clause/conjunction/conjunction.js`: passed.
- `node --check src/core/clause/conjunction/conjunction.mjs`: passed.
- `node --check src/tests/adjunction.test.js`: passed.
- `node --check src/tests/modification.test.js`: passed.
- `node --check src/tests/complement.test.js`: passed.
- `node --check src/tests/conjunction.test.js`: passed.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame`: passed, 1618/1618.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame --runtime=module`: passed, 1618/1618.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Agreement Builder Context Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Verb-derived nominal agreement builder-context blockers now carry LCM failed-layer metadata directly instead of depending on generic no-output text or UI fallback synthesis.
- Builder-context diagnostics now include `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- Route-stage mapping keeps mirrored UI sameness from inverting the layer contract: parse-input blockers map to `orthographyFrame`, parse/stem-context blockers map to `stemFrame`, subject/object gates map to `participantFrame`, output blockers map to `resultFrame`, and other route blockers map to `routeContract`.
- Existing blocked messages remain intact; the metadata now names which LCM layer actually failed.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear clauses as rigidly sequenced stem-plus-inflection constructs with explicit slot positions/categories before patching the builder-context route diagnostics.
- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are hierarchical, with stem foundation and NNC/VNC layers, before mapping blockers to LCM contract layers.
- Verified local Andrews PDF Lesson 36 wording that VNC nominalization reanalyzes source VNC predicates into NNC structures before patching verb-derived nominal builder-context diagnostics.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node scripts/run_tests.js agreement grammar_frame`: passed, 1618/1618.
- `node scripts/run_tests.js agreement grammar_frame --runtime=module`: passed, 1618/1618.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Derivation Continuation Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Derivation continuation contracts now keep legacy `diagnostics` strings for compatibility while projecting structured diagnostics into `grammarFrame.routeContract.blockingDiagnostics`, `grammarFrame.diagnosticFrame`, and `contractDiagnostics`.
- Structured continuation diagnostics now carry `id`, `code`, `severity`, `failedLayer`, `contractLayer`, `routeFamily: "derivation-continuation"`, and `routeStage`.
- Matrix/license blockers map to `routeContract`; missing source stems/surfaces/root material map to `stemFrame`; missing participant/object/possessor transfer maps to `participantFrame`; missing target verb/NNC input maps to `resultFrame`.
- This prevents continuation previews from collapsing unsupported Andrews/Nawat paths into a generic empty-generation message after the fact.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 35 wording for structural nominalization, preterit-agentive NNC conversion, and preterit-agentive embed/continuation sources before patching continuation diagnostics.
- Verified local Andrews PDF Lesson 36 wording for customary-present agentive nominalization and action NNCs before patching agentive/action continuation diagnostics.
- Verified local Andrews PDF Lesson 37 wording for active-action/deverbal continuation families before patching active-action continuation diagnostics.
- Verified local Andrews PDF Lessons 38 and 39 wording for patientive nounstem derivation and perfective/compound patientive sources before patching patientivo continuation diagnostics.

Verification:

- `node --check src/core/derivation/source_model.js`: passed.
- `node --check src/core/derivation/source_model.mjs`: passed.
- `node --check src/tests/derivation.test.js`: passed.
- `node scripts/run_tests.js derivation grammar_frame`: passed, 1618/1618.
- `node scripts/run_tests.js derivation grammar_frame --runtime=module`: passed, 1618/1618.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generation Existing Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Generation runtime and morphology-application support paths now normalize existing blocked diagnostics into structured contract diagnostics before building the `grammarFrame`.
- Existing string/object diagnostics keep their primary diagnostic identity while gaining `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- Direct support wrappers now expose `contractDiagnostics`, and those diagnostics are projected into `grammarFrame.routeContract.blockingDiagnostics` and `grammarFrame.diagnosticFrame`.
- Unlabeled runtime/morphology blockers default to `failedLayer: "stem"` / `contractLayer: "stemFrame"`, with stage overrides for orthography, agreement, and output routes.
- This prevents existing support diagnostics from reaching the UI as generic no-output messages without an LCM failed-layer contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause hierarchy, rigid slot sequencing, and stem foundation before patching generation support diagnostics.
- Verified local Andrews PDF Lesson 5 wording for VNC subject positions and predicate/stem organization before patching generation support diagnostics.
- Verified local Andrews PDF Lesson 7 wording for verbstem morphemic structure, verb classes, and verbcore valence before patching generation support diagnostics.

Verification:

- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame`: passed, 1620/1620.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame --runtime=module`: passed, 1620/1620.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Reduplicated Combination Surface Gate v1

Date: 2026-06-08

Decision:

- Noun/adjectival combination reduplication gates now read the same LCM primary surface used by display and output contracts before consulting legacy result text.
- `renderNounConjugations()` checks `getPrimaryConjugationSurface(result)` and panel availability checks `getPanelConjugationRenderableSurface(result)` instead of gating on `result.result`.
- The reduplication builder already reads `grammarFrame.resultFrame.surfaceForms` / `grammarFrame.resultFrame.surface` before legacy payloads; this phase closes the caller-side bypass that could skip that builder when only framed output was present.
- The UI source test now asserts both rendering and panel combination gates avoid `useReduplicatedSingularSurface && result?.result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formula slots and the hierarchic structure with stem foundation before patching the frame-first gate.
- Verified local Andrews PDF Lesson 14 wording for affinity/distributive-varietal nounstems and reduplicative prefixes before patching the reduplicated combination gate.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/ui/panels/panels.js`: passed.
- `node --check src/ui/panels/panels.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui state grammar_frame`: passed, 1621/1621.
- `node scripts/run_tests.js ui state grammar_frame --runtime=module`: passed, 1621/1621.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Linked Promotion Generated Source Surface v1

Date: 2026-06-08

Decision:

- Linked grammar path execution source options now derive the generated source through `getPrimaryNawatRouteSurfaceForm(step.generated)` instead of reading `generated.primarySurface` or legacy `generated.result` directly.
- Promotable linked-path sources now preserve the same priority used by the LCM contract: framed result surface forms, framed result surface, top-level surface/forms, then legacy result text.
- A framed-only generated linked-path step with legacy `result: "—"` now remains promotable as a next source and exposes the framed surface as `sourceVerb`, `displaySurface`, and `generatedSurface`.
- This closes a linked-promotion bypass near the original chip failure mode, where UI source promotion could ignore framed output and fall back to legacy generated text.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formula slots and the stem foundation before patching the generated-source reader.
- Verified local Andrews PDF Lesson 28 wording that compound/source analysis distinguishes source nuclear clauses, abstracted stems, and matrix/embed source relationships before patching linked source promotion.
- Verified local Andrews PDF Lesson 54 wording for explicit derivational source stems before patching linked denominal source promotion.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state ui grammar_frame`: passed, 1622/1622.
- `node scripts/run_tests.js state ui grammar_frame --runtime=module`: passed, 1622/1622.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC Allomorphy Perfective Fallback Surface v1

Date: 2026-06-08

Decision:

- VNC allomorphy now exposes `getVncAllomorphyContractSurface()` as the primary frame-first surface reader for allomorphy contracts.
- The patientive-perfective fallback source stem now reads the preterit output through that LCM surface reader instead of reading `preteriteOutput.result` directly.
- The fallback priority is now `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, option/orthography/top-level surfaces, and only then legacy result text.
- A framed-only allomorphy/preterit output with legacy `result: "—"` now resolves its primary source surface from the framed result before patientive perfective fallback logic runs.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formula slots and stem foundation before patching the allomorphy source reader.
- Verified local Andrews PDF Lesson 39.1 wording that the perfective patientive nounstem has a perfective active verbstem as its source before patching patientive-perfective fallback source selection.

Verification:

- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame`: passed, 1623/1623.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame --runtime=module`: passed, 1623/1623.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Linked Execution Summary Frame-Only Surface v1

Date: 2026-06-08

Decision:

- Linked grammar path execution summaries now display the final generated surface only through `getPrimaryConjugationSurface(lastGenerated)`.
- The renderer no longer falls back to `lastGenerated.primarySurface` when summarizing executed linked paths.
- The focused UI test now supplies framed generated step outputs with legacy `result: "—"` and proves the summary reads the framed result surface.
- This keeps linked execution summaries on the same LCM surface contract used by generation and promotion rather than letting an ad hoc generated-field display path bypass the frame.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for nuclear-clause formula slots and stem foundation before patching the linked execution summary display.
- Verified local Andrews PDF Lesson 28 wording that compound/source analysis distinguishes source nuclear clauses, abstracted stems, and matrix/embed relationships before patching the linked execution summary display.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui state grammar_frame`: passed, 1623/1623.
- `node scripts/run_tests.js ui state grammar_frame --runtime=module`: passed, 1623/1623.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Linked Stage Request Frame-First Source v1

Date: 2026-06-08

Decision:

- Linked grammar stage labels now read promotable source/output text through frame-first helpers before legacy `nextSource.sourceVerb`, `nextSource.displaySurface`, or `stage.surface` fields.
- The source label only lets a `nextSource` frame override explicit source input; a stage frame can still supply output display, but it no longer turns finite stage output into the next source verb by accident.
- Linked stage generation requests now derive `prefixInputs.verb`, `linkedGrammarPathStage.sourceVerb`, and `linkedGrammarPathStage.displaySurface` from the LCM result-frame surface before legacy stage fields when a framed next source is present.
- The request metadata attachment now passes the resolved stage surface into `attachGrammarMetadataContract`, so the request itself carries `grammarFrame.resultFrame.surface` and `surfaceForms` instead of only orthography/stem metadata.
- This closes another linked-promotion path near the original chip failure mode without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for rigid nuclear-clause slot order and stem foundation before patching linked stage/request routing.
- Verified local Andrews PDF Lesson 28 wording that compound/source analysis is justified by source nuclear clauses and preserves embed/matrix relationships before patching linked stage display.
- Verified local Andrews PDF Lesson 54 wording that denominal verbstems derive from nounstem sources by verbstem-forming suffixes before patching linked denominal stage requests.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js ui state grammar_frame`: passed, 1625/1625.
- `node scripts/run_tests.js ui state grammar_frame --runtime=module`: passed, 1625/1625.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival Function Override Frame Route v1

Date: 2026-06-09

Decision:

- Adjectival NNC function entry contracts now serialize their `grammarFrame` / `frames` payload alongside the existing route summary so promoted UI entries do not lose the LCM contract before generation.
- `resolveAdjectivalNncFunctionOverrideFromInput()` now restores the serialized frame into `override.adjectivalNnc.grammarFrame` and reads the result-frame surface before dataset surface text.
- `executeAdjectivalNncGenerationRoute()` now uses `resolveAdjectivalNncGenerationSurface()` for intensified, VNC, nominalized-VNC, patientive, root-plus-ya, and default adjectival NNC routes, preferring framed output before legacy `surface` / `stem` fields.
- Adjectival function rendering and silent-generation cache keys now use frame-first readers instead of direct `override.adjectivalNnc.surface`.
- This closes an adjectival-chip route bypass without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40.1 wording that an adjectival nuclear clause is an NNC in adjectival function and usually absolutive-state before patching the override route.
- Verified local Andrews PDF Lesson 40.3 wording that absolutive-state NNCs and VNCs can function as adjectives before patching the frame-restored route.
- Verified local Andrews PDF Lesson 40.8 wording for nominalized preterit predicates as adjectives and denominal `ti` adjectival NNCs before patching patientive/adjectival function routing.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/vnc/vnc.js`: passed.
- `node --check src/core/vnc/vnc.mjs`: passed.
- `node --check src/ui/composer/composer.js`: passed.
- `node --check src/ui/composer/composer.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js nnc_adjectival ui grammar_frame`: passed, 1626/1626.
- `node scripts/run_tests.js nnc_adjectival ui grammar_frame --runtime=module`: passed, 1626/1626.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Metadata Adjunction Output Primary Surface Removal v1

Date: 2026-06-09

Decision:

- Adverbial adjunction AST input readers no longer accept stale `input.output.primarySurface` as an output display source.
- Adjunction input nodes now read nested `output.surfaceForms` and `output.surface` through the same frame-first surface contract before legacy `result`.
- Grammar metadata contract readers no longer accept stale `node.output.primarySurface`; nested output contracts use `output.surfaceForms` / `output.surface` instead.
- Focused tests now prove stale `primarySurface` is ignored when contract output surfaces exist.
- This removes another legacy display bypass without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording for rigid nuclear-clause structure and stem foundation before patching the metadata surface reader.
- Verified local Andrews PDF Lesson 49.1 wording that adverbial modification has modifier/adjoined clause and head/principal clause roles before patching adjunction AST surface readers.
- Verified local Andrews PDF Lesson 50.1 wording for nonadverbialized clauses or clause units adjoined as adverbial modifiers before patching adjunction AST surface readers.

Verification:

- `node --check src/core/clause/adjunction/adjunction.js`: passed.
- `node --check src/core/clause/adjunction/adjunction.mjs`: passed.
- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/tests/adjunction.test.js`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node scripts/run_tests.js adjunction grammar_frame`: passed, 1628/1628.
- `node scripts/run_tests.js adjunction grammar_frame --runtime=module`: passed, 1628/1628.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Morphology Preterit Source Forms Frame-First v1

Date: 2026-06-09

Decision:

- Morphology preterit/perfective source-form routing now reads generated source forms through `getMorphologyApplicationSourceSurfaceForms()` before consulting route-local `forms` arrays.
- The source reader prefers `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`, then top-level surface contract fields, and only falls back to legacy `forms` when no grammar frame exists.
- Active/adjectival wrapper source forms, preterit-agentive source splitting, universal preterit forms, nonactive perfective forms, and class-based perfective forms now share that frame-first reader.
- A framed preterit source output with legacy `result: "—"` and stale `forms` now routes through the framed result surface instead of mirroring the stale local array.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 5 wording that the VNC stem is the organizing center of the predicate and that tense/mood cooperate with verbstem classes before patching preterit source-form routing.
- Verified local Andrews PDF Lesson 7 wording that verbstem classes depend on perfective-stem behavior and that VNC predicates combine stem-class variants with tense morphs before patching the morphology source reader.

Verification:

- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js morphology_engine grammar_frame`: passed, 1629/1629.
- `node scripts/run_tests.js morphology_engine grammar_frame --runtime=module`: passed, 1629/1629.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adverbial Output Primary Surface Removal v1

Date: 2026-06-09

Decision:

- Adverbial nuclear clause frames no longer emit `output.primarySurface`.
- Adverbial output now exposes generated surface material through `output.surfaceForms` and the attached LCM `grammarFrame.resultFrame`.
- The focused adverbial test expectation was updated so the remaining primary-surface references are only stale-reader guards or linked execution compatibility payloads.
- This avoids mirroring the same output as a separate legacy alias while preserving the Andrews Lesson 44 adverbial function/domain contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 44.1 wording that adverbial modifiers are nuclear clauses or adjoined clause units with adverbial function before removing the legacy output alias.
- Verified local Andrews PDF Lesson 44.2 wording for first-degree and second-degree adverbialization before keeping adverbial output as frame/domain metadata rather than a separate primary-surface field.

Verification:

- `node --check src/core/clause/adverbial/adverbial.js`: passed.
- `node --check src/core/clause/adverbial/adverbial.mjs`: passed.
- `node --check src/tests/adverbial.test.js`: passed.
- `node scripts/run_tests.js adverbial grammar_frame`: passed, 1629/1629.
- `node scripts/run_tests.js adverbial grammar_frame --runtime=module`: passed, 1629/1629.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Linked Execution Primary Surface Alias Removal v1

Date: 2026-06-09

Decision:

- Linked grammar path execution state no longer emits `generated.primarySurface`.
- Generated step summaries keep `generated.surface`, `generated.surfaceForms`, and `generated.grammarFrame` / `generated.frames` as the output contract.
- State tests now summarize linked generated surfaces from `generated.surface`, and expected linked execution payloads no longer include the legacy alias.
- Remaining `primarySurface` mentions are limited to stale-input guard tests that prove old payloads are ignored.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 28 wording that compound stems are justified by underlying source nuclear clauses and embed/matrix relations before removing the linked execution output alias.
- Verified local Andrews PDF Lesson 54 wording that denominal verbstems derive from nounstem sources by verbstem-forming suffixes before keeping linked denominal execution output on the canonical generated surface/frame contract.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state ui grammar_frame`: passed, 1629/1629.
- `node scripts/run_tests.js state ui grammar_frame --runtime=module`: passed, 1629/1629.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Allomorphy Pasado-Remoto Source Forms Frame-First v1

Date: 2026-06-09

Decision:

- VNC allomorphy now exposes `getVncAllomorphySourceSurfaceForms()` for source-form consumption paths that may receive generated preterit/perfective outputs.
- The calificativo/instrumentivo pasado-remoto fallback now reads `pasadoRemotoOutput` through the LCM result-frame surface contract before legacy local `forms`.
- The source reader prefers `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, and other existing contract surface fields; legacy `forms` are only used when no grammar frame or contract surface exists.
- A framed allomorphy source output with legacy `result: "—"` and stale `forms` now resolves from the framed result surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 36.6 wording that instrumentive NNCs derive from VNC nominalization before patching instrumentive source-form consumption.
- Verified local Andrews PDF Lesson 36.11 wording that active-action NNCs derive from distant-past active-voice VNC predicates before patching the pasado-remoto source fallback.

Verification:

- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js vnc grammar_frame morphology_engine`: passed, 1630/1630.
- `node scripts/run_tests.js vnc grammar_frame morphology_engine --runtime=module`: passed, 1630/1630.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Preterit Contract Forms Stale-Alias Removal v1

Date: 2026-06-09

Decision:

- Preterit class-based and universal variant-assembly contract readers no longer merge route-local `forms` into `surfaceForms` when an LCM `grammarFrame` / `frames` object is already present.
- The readers still allow legacy `forms` for unframed outputs, preserving existing preterit variant behavior where no contract has been attached yet.
- Framed outputs now preserve the canonical surface priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surface`, then legacy `result`.
- Focused preterit tests now seed stale legacy `forms` beside framed outputs and prove stale forms do not enter the rebuilt `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 5.5 wording that the stem is the organizing center of the predicate and that perfective aspect is stem-dependent before patching preterit output readers.
- Verified local Andrews PDF Lesson 7 wording that VNC predicate formations combine verbstem classes, stem shapes, and tense morphs before patching class-based and variant-assembly contract surface forms.

Verification:

- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine`: passed, 1630/1630.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine --runtime=module`: passed, 1630/1630.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Shared Surface Readers Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Shared renderability/output readers now treat an existing LCM `resultFrame` as the canonical surface source.
- Agreement renderability, UI rendering display, UI state route surfaces, panel fallback renderability, output-surface contracts, and output-provenance contracts read `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` first.
- When a result frame exists, these readers no longer merge stale top-level `surfaceForms` arrays or legacy `result` text into displayed/generated surface variants.
- Top-level `surface` remains a lower-priority contract surface, and unframed legacy outputs can still fall back to top-level `surfaceForms` / `result`.
- Focused tests now seed stale `surfaceForms` and stale `result` beside framed outputs to prove the stale aliases do not pollute the LCM display/output surface list.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigidly sequenced formula constructs and that their hierarchy has the stem as foundation before patching shared surface readers.
- Verified local Andrews PDF Lesson 5 wording for VNC formula positions and subject categories before patching agreement/renderability readers.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/core/output/surface.js`: passed.
- `node --check src/core/output/surface.mjs`: passed.
- `node --check src/core/output/provenance.js`: passed.
- `node --check src/core/output/provenance.mjs`: passed.
- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/ui/panels/panels.js`: passed.
- `node --check src/ui/panels/panels.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js agreement surface state ui grammar_frame`: passed, 1630/1630.
- `node scripts/run_tests.js agreement surface state ui grammar_frame --runtime=module`: passed, 1630/1630.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generator and Grammar Result-Frame Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Generation and runtime-support surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- `normalizeGrammarFrameSurfaceForms()` and `getGenerateRuntimeSurfaceForms()` suppress stale top-level `surfaceForms` arrays and legacy `result` text when a result frame is already present.
- `resolveGenerateWordContractSurface()` and `resolveGenerateRuntimeContractSurface()` no longer let legacy `result` override an existing empty/framed contract; top-level `surface` remains the lower-priority contract surface.
- Canonical `buildGrammarResultContract()` / `attachGrammarMetadataContract()` now apply the same rule: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, then top-level `surface`; stale top-level `surfaceForms` and legacy `result` remain available only for unframed outputs.
- Focused grammar, VNC, runtime, and morphology tests now seed stale aliases beside valid result frames and prove those aliases do not enter rebuilt `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigidly sequenced formula constructs around a stem and that the stem is the hierarchical foundation before patching generator/result-frame readers.
- Verified local Andrews PDF Lesson 5 wording for the intransitive VNC formula and subject positions before patching generation/runtime surface routing.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js grammar_frame vnc morphology_engine`: passed, 1631/1631.
- `node scripts/run_tests.js grammar_frame vnc morphology_engine --runtime=module`: passed, 1631/1631.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC/Preterit Contract Alias Suppression v1

Date: 2026-06-09

Decision:

- VNC allomorphy contract surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- When a result frame exists, allomorphy readers suppress stale `options.surfaceForms`, `orthographyFrame.surfaceForms`, top-level `surfaceForms`, `outputSurface`, `selectedOutputSurface`, `nawatSurfaceSuffix`, target-contract output aliases, and legacy `result`.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Preterit class-based and universal variant-assembly readers now also suppress legacy `result` when a grammar frame/result frame exists; unframed preterit outputs can still use legacy `forms` and `result`.
- Focused VNC and preterit tests now seed stale aliases beside valid result frames and prove those aliases do not enter regenerated `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigidly sequenced formula constructs around a stem before patching VNC/preterit contract readers.
- Verified local Andrews PDF Lesson 5 wording for the intransitive VNC formula and subject positions before patching VNC/preterit contract readers.
- Verified local Andrews PDF Lesson 7 wording for verbstem classes, stem shapes, and perfective/preterit predicate formation before patching allomorphy and preterit surface readers.

Verification:

- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js vnc preterit morphology_engine grammar_frame`: passed, 1631/1631.
- `node scripts/run_tests.js vnc preterit morphology_engine grammar_frame --runtime=module`: passed, 1631/1631.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Composition Input Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Clause/composition AST input readers now treat an existing LCM `resultFrame` as the canonical supplied/generated clause-unit surface source.
- Adverbial adjunction, adjectival modification, complement, and conjunction readers suppress stale top-level `surfaceForms`, `surfaceDisplay`, `word`, legacy `result`, and nested output surface aliases when a result frame exists.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Unframed composition inputs can still use the legacy surface/display/result fields, preserving non-generative composition of supplied Nawat/Pipil clause surfaces.
- Focused composition tests now seed stale aliases beside framed inputs and prove those aliases do not enter the frame-first surface-form lists.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 42 wording that adjectival modification is a multiple-nucleus clause structure before patching modification input readers.
- Verified local Andrews PDF Lessons 49-50 wording for adverbial modification/adjoined clause units before patching adjunction input readers.
- Verified local Andrews PDF Lesson 51 wording for complementation as double-nucleus/adjoined NNC structures before patching complement input readers.
- Verified local Andrews PDF Lesson 52 wording that conjunction links nuclear clauses or clause units without a head/principal relationship before patching conjunction input readers.

Verification:

- `node --check src/core/clause/adjunction/adjunction.js`: passed.
- `node --check src/core/clause/adjunction/adjunction.mjs`: passed.
- `node --check src/core/clause/modification/modification.js`: passed.
- `node --check src/core/clause/modification/modification.mjs`: passed.
- `node --check src/core/clause/complement/complement.js`: passed.
- `node --check src/core/clause/complement/complement.mjs`: passed.
- `node --check src/core/clause/conjunction/conjunction.js`: passed.
- `node --check src/core/clause/conjunction/conjunction.mjs`: passed.
- `node --check src/tests/adjunction.test.js`: passed.
- `node --check src/tests/modification.test.js`: passed.
- `node --check src/tests/complement.test.js`: passed.
- `node --check src/tests/conjunction.test.js`: passed.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame`: passed, 1631/1631.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame --runtime=module`: passed, 1631/1631.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM NNC and Morphology Surface Reader Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Verb-derived nominal, adjectival NNC, and morphology-application surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- When a result frame exists, these readers suppress stale top-level `surfaceForms`, legacy `result`, and morphology fallback `verb` surfaces.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Unframed NNC/adjectival/morphology outputs can still use legacy `surfaceForms`, `result`, and morphology fallback surfaces.
- Focused NNC, adjectival NNC, and morphology tests now seed stale aliases beside valid frames and prove those aliases do not enter regenerated `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigid formula constructs and that their hierarchy is stem-founded before patching NNC/morphology surface readers.
- Verified local Andrews PDF Lesson 12 wording that the NNC formula has state inside the predicate and no tense position before patching nominal-surface readers.
- Verified local Andrews PDF Lessons 35-36 wording that VNC nominalization converts or reanalyzes source VNC predicates into NNC structure before patching verb-derived nominal readers.
- Verified local Andrews PDF Lesson 40 wording that adjectival NNCs are NNCs in adjectival function, and that NNC/VNC predicates may function as adjectives, before patching adjectival NNC readers.

Verification:

- `node --check src/core/nnc/nnc.js`: passed.
- `node --check src/core/nnc/nnc.mjs`: passed.
- `node --check src/core/nnc/adjectival/adjectival.js`: passed.
- `node --check src/core/nnc/adjectival/adjectival.mjs`: passed.
- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/tests/nnc.test.js`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node scripts/run_tests.js nnc nnc_adjectival morphology_engine grammar_frame`: passed, 1631/1631.
- `node scripts/run_tests.js nnc nnc_adjectival morphology_engine grammar_frame --runtime=module`: passed, 1631/1631.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Realization Label Result-Frame Priority v1

Date: 2026-06-09

Decision:

- Shared UI grammar-frame sublabels now read Nawat realization labels from `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before `orthographyFrame.surfaceForms` / `orthographyFrame.surface`.
- `orthographyFrame.nawatRuleSpelling` remains a fallback spelling label when no generated result-frame surface exists.
- This keeps UI display in inverted user-facing order while preserving the engine contract priority: result frame first, orthography metadata second.
- Focused UI tests now seed stale orthography surfaces beside valid result-frame forms and prove stale orthography metadata does not hide the generated LCM surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2 wording that orthography is graphological representation of phonemes before treating orthography-frame spellings as realization metadata.
- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are formula constructs with stem-founded hierarchy before keeping generated result-frame output ahead of orthography display metadata.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui grammar_frame surface`: passed, 1631/1631.
- `node scripts/run_tests.js ui grammar_frame surface --runtime=module`: passed, 1631/1631.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Preterit Metadata-Only Frame Fallback v1

Date: 2026-06-09

Decision:

- Preterit class-based and universal variant-assembly surface readers now distinguish metadata-only `grammarFrame` objects from generated `resultFrame` contracts.
- Legacy local `forms` / `result` are suppressed only when an actual LCM `resultFrame` exists; metadata-only frames can still fall back through the normal contract priority.
- Existing stale-alias suppression remains intact for framed outputs with `grammarFrame.resultFrame`.
- Focused preterit tests now cover both cases: stale aliases beside valid result frames are ignored, while metadata-only frames do not erase otherwise usable local output forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 5.5 wording that the stem is the predicate’s organizing center and that preterit tense depends on perfective stem behavior before patching preterit readers.
- Verified local Andrews PDF Lesson 7 wording for verbstem classes and perfective stem shapes before patching class-based and variant-assembly surface readers.

Verification:

- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine`: passed, 1633/1633.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine --runtime=module`: passed, 1633/1633.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Source-Form Reader Metadata-Only Frame Fallback v1

Date: 2026-06-09

Decision:

- Morphology-application and VNC allomorphy source-form readers now distinguish metadata-only `grammarFrame` objects from generated `resultFrame` contracts.
- Legacy source `forms` are suppressed only when an actual LCM `resultFrame` exists or when frame/top-level contract surfaces are present.
- Existing stale-alias suppression remains intact for framed outputs with `grammarFrame.resultFrame`.
- Focused morphology and VNC tests now cover both cases: stale source forms beside valid result frames are ignored, while metadata-only frames do not erase otherwise usable legacy source forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigid formula constructs with stem-founded hierarchy before patching source-form readers.
- Verified local Andrews PDF Lesson 5.5 wording that the stem is the predicate’s organizing center and that active/nonactive/perfective source stems participate in downstream formation before patching source-form readers.
- Verified local Andrews PDF Lesson 7 wording that verbstem class and perfective shape license source-stem behavior before patching source-form readers.
- Verified local Andrews PDF Lessons 35-36 wording that VNC predicates can be converted/reanalyzed into NNC structures before patching nominalizing source-form consumers.

Verification:

- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame`: passed, 1635/1635.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame --runtime=module`: passed, 1635/1635.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Export Row Route Metadata Contract v1

Date: 2026-06-09

Decision:

- View/export rows now preserve LCM route/evidence/diagnostic metadata instead of flattening visible rows to form text alone.
- `normalizeUnifiedVerbOutputEntry()` carries Andrews authority refs, evidence status, source-evidence metadata, route family/stage, generation permission, diagnostic status/id, failed layer, failed contract layer, and result ok state.
- Rendered conjugation rows now copy detailed `grammar*` route datasets and `lcm*` failed-layer datasets before structured export rows are captured.
- CSV exports append LCM route, Andrews evidence, Nawat/source-evidence status, diagnostic id, failed layer, failed contract layer, and result status columns.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4 wording that nuclear clauses are rigid formula constructs and that the stem is the foundation of the hierarchy before treating export/reporting as downstream of generated `resultFrame` output.
- Verified local Andrews PDF Lesson 5.5 wording that the stem is the organizing center of the predicate before preserving result-layer route metadata in rendered/exported rows.

Verification:

- `node --check src/ui/export/export.js`: passed.
- `node --check src/ui/export/export.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui agreement grammar_frame`: passed, 1638/1638.
- `node scripts/run_tests.js ui agreement grammar_frame --runtime=module`: passed, 1638/1638.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival Linked-Promote Source Contract Handoff v1

Date: 2026-06-09

Decision:

- Adjectival linked-promote execution now mirrors the selected source/result frame as bounded source evidence instead of flattening the promoted surface into an unrelated generation route.
- `buildGenerateWordGrammarFrame()` now reads authority refs and source evidence from the override's adjectival NNC entry contract, preserved `grammarFrame`/`frames`, and mirrored source frame authority metadata.
- The executed route contract now records the promoted source route family, source route stage, source output kind, and source surface inside `sourceContract`.
- Source/result sameness is now role-tagged: the old result frame becomes evidence for the new source contract, while the new result frame remains the generated output.
- Focused adjectival tests now assert Andrews refs, source evidence kind/status/flags, promoted route family, and promoted surface survive from UI promotion into execution.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40.1 wording that "adjective" labels a syntactical function rather than a separate formal class, and that adjectival nuclear clauses are NNCs used to modify another NNC.
- Verified local Andrews PDF Lesson 40.3 wording that absolutive-state NNCs and VNCs can function adjectivally, with the predicate being the translated adjective-like material.
- Verified local Andrews PDF Lesson 40.4 wording that patientive nounstem NNCs often function adjectivally before preserving patientive linked-promote source evidence.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js nnc_adjectival grammar_frame ui`: passed, 1638/1638.
- `node scripts/run_tests.js nnc_adjectival grammar_frame ui --runtime=module`: passed, 1638/1638.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Failed-Layer Diagnostic Priority v1

Date: 2026-06-09

Decision:

- Conjugation evaluation now promotes a stronger Andrews/LCM frame-status diagnostic over generic no-output diagnostics that only report `output/resultFrame`.
- Specific unsupported-route diagnostics still win over the generic frame-status label; for example, an adjectival route that requires a generated patientive source still displays that specific missing-source reason.
- The frame-status fallback now reports the LCM `output` layer, not a non-LCM `result` layer, when only the result frame is blocked.
- `buildGrammarFrameSubLabels()` now emits a compact `Falla LCM: <failedLayer> / <contractLayer>` label from diagnostic, route, authority, or result frames.
- This phase targets active combo/output rows where a generic "La generacion no produjo una forma." label could hide the failed contract layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 4.1 wording that nuclear clauses are complete morphosyntactic constructs with obligatory subject and predicate before prioritizing contract-layer diagnostics over generic word-output failure.
- Verified local Andrews PDF Lesson 4.2 wording that VNC and NNC are distinct nuclear-clause kinds before keeping failed layer reporting separate from generated surface display.
- Verified local Andrews PDF Lesson 5.5 wording that the stem is the organizing center of the predicate before preserving stem/route/output diagnostic layers.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js agreement ui grammar_frame nnc_adjectival`: passed, 1638/1638.
- `node scripts/run_tests.js agreement ui grammar_frame nnc_adjectival --runtime=module`: passed, 1638/1638.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adverbial Nuclear Frame-First Source Reader v1

Date: 2026-06-09

Decision:

- `buildAdverbialNuclearClauseFrame()` now reads promoted generated output through the LCM result frame before direct/legacy `surfaceForms` and `result` text.
- Added adverbial nuclear helpers for frame-first surface extraction and source-input extraction from `grammarFrame`/`frames`, `result`, or `output`.
- Attached `grammarFrame.resultFrame.sourceInput` can now supply the source text when the caller promotes a generated result into Lesson 44 adverbial nuclear metadata.
- Stale legacy `surfaceForms` and `result` text no longer override `grammarFrame.resultFrame.surfaceForms` for adverbial nuclear clause frames.
- Focused tests now cover a framed generated output with stale legacy fields beside it.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 44.1 wording that adverbial modifiers are nuclear clauses (VNCs/NNCs) or adjoined structures before treating adverbial nuclear frames as metadata over supplied generated output.
- Verified local Andrews PDF Lesson 44.2 wording that adverbialization has first and second degrees, with VNCs and possessive-state NNCs permitting only first-degree adverbialization, before preserving source-kind/degree diagnostics.

Verification:

- `node --check src/core/clause/adverbial/adverbial.js`: passed.
- `node --check src/core/clause/adverbial/adverbial.mjs`: passed.
- `node --check src/tests/adverbial.test.js`: passed.
- `node scripts/run_tests.js adverbial grammar_frame`: passed, 1639/1639.
- `node scripts/run_tests.js adverbial grammar_frame --runtime=module`: passed, 1639/1639.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adverbial Adjunction Nested Output Frame Reader v1

Date: 2026-06-09

Decision:

- Adverbial adjunction AST input readers now inspect nested `input.output.grammarFrame` / `input.output.frames` before falling back to nested legacy `output.surfaceForms`, `output.surface`, or top-level legacy `result`.
- This closes a composition-layer bypass where a promoted generated output could carry the correct LCM result frame inside its `output` object while the AST reader still used stale nested output fields.
- Focused tests now cover principal and adjoined inputs whose nested `output` objects contain both stale legacy surfaces and a valid LCM result frame.
- The AST continues to compose supplied clause/unit surfaces only; it does not generate new Nawat/Pipil word forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 49.1 wording that simple adverbial modification consists of a modifier/adjoined clause and a head/principal clause before patching adverbial adjunction AST input readers.
- Verified local Andrews PDF Lesson 50.1 wording that nonadverbialized adjoined clause units can function as adverbial modifiers before preserving nested output-frame surfaces for clause-unit composition.

Verification:

- `node --check src/core/clause/adjunction/adjunction.js`: passed.
- `node --check src/core/clause/adjunction/adjunction.mjs`: passed.
- `node --check src/tests/adjunction.test.js`: passed.
- `node scripts/run_tests.js adjunction grammar_frame`: passed, 1640/1640.
- `node scripts/run_tests.js adjunction grammar_frame --runtime=module`: passed, 1640/1640.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM ResultFrame Hard Boundary v1

Date: 2026-06-09

Decision:

- Canonical grammar result contracts now treat an existing `grammarFrame.resultFrame` as an authoritative output boundary.
- `buildGrammarResultContract()` and metadata contract surface readers now stop at `resultFrame.surfaceForms` / `resultFrame.surface` when a result frame exists, instead of appending stale direct `surface`, `surfaceForms`, nested output surfaces, or legacy `result` text.
- Output surface and output provenance readers now suppress direct `surface`, `surfaceStem`, and fallback surfaces when an explicit result frame exists, including blocked/empty frames.
- UI route state readers now stop at framed result surfaces when a result frame exists, so static route targets no longer copy local route-control surfaces into `grammarFrame.resultFrame.surfaceForms`.
- Focused tests now cover blocked framed output/provenance records carrying stale legacy surfaces, generic grammar result contracts carrying stale direct aliases, and Nawat static route targets carrying stale local target surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2.1 wording that spelling/graphic representation belongs to the output orthography layer before preventing direct legacy surface text from overriding a result frame.
- Verified local Andrews PDF Lesson 7.1 wording that a verbstem is the lexical center of the VNC and may be analyzed into morphs before treating stem provenance as layer evidence, not as a late surface fallback.
- Verified local Andrews PDF Lesson 7.5 wording that some verbs can have alternative perfective stem formations before preserving frame-carried surface variants as the canonical result-frame list.
- Verified local Andrews PDF Lesson 24.1 wording that final vowel and valence are not predictably related before preserving causative/provenance authority as metadata instead of manufacturing fallback surfaces.

Verification:

- `node --check src/core/grammar/frame.js`: passed.
- `node --check src/core/grammar/frame.mjs`: passed.
- `node --check src/core/output/surface.js`: passed.
- `node --check src/core/output/surface.mjs`: passed.
- `node --check src/core/output/provenance.js`: passed.
- `node --check src/core/output/provenance.mjs`: passed.
- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/grammar_frame.test.js`: passed.
- `node --check src/tests/surface.test.js`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state surface grammar_frame`: passed, 1642/1642.
- `node scripts/run_tests.js state surface grammar_frame --runtime=module`: passed, 1642/1642.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Renderable ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `getConjugationRenderableSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative renderability boundary before deciding whether an evaluation has visible output.
- `getConjugationSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative UI display boundary before formatting route rows, continuation targets, previews, and linked-promote controls.
- Stale top-level `surface`, `surfaceForms`, and legacy `result` aliases no longer get appended to renderable/display surfaces when a canonical result frame exists.
- Focused tests now carry stale top-level display aliases beside valid LCM result-frame surfaces and assert that only the framed surfaces are visible.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2.1 wording that spelling/graphic representation is an orthographic output matter before preventing UI display readers from mixing stale local surface aliases into framed result surfaces.
- Verified local Andrews PDF Lesson 4.2 wording that VNCs and NNCs are distinct nuclear-clause kinds before keeping renderable surface display tied to the result frame rather than legacy row text.

Verification:

- `node --check src/core/agreement/agreement.js`: passed.
- `node --check src/core/agreement/agreement.mjs`: passed.
- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/agreement.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js agreement ui grammar_frame`: passed, 1642/1642.
- `node scripts/run_tests.js agreement ui grammar_frame --runtime=module`: passed, 1642/1642.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Generation Surface ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `resolveGenerateWordContractSurface()` and `normalizeGrammarFrameSurfaceForms()` now treat `grammarFrame.resultFrame` as the authoritative generated-output boundary.
- `getGenerateRuntimeSurfaceForms()` and `resolveGenerateRuntimeContractSurface()` now suppress stale direct `surface`, `surfaceForms`, and legacy `result` aliases when a result frame exists.
- `getMorphologyApplicationSurfaceForms()` now suppresses stale direct morphology `surface`, `surfaceForms`, fallback surfaces, and legacy `result` aliases when a result frame exists.
- Focused morphology/VNC tests now carry stale direct generator, runtime, and morphology surfaces beside framed outputs and assert that only the framed surfaces feed generated contracts.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2.1 wording that spelling/graphic representation belongs to the orthographic output layer before preventing stale generated surface aliases from overriding a result frame.
- Verified local Andrews PDF Lesson 4.2 wording that verbal and nominal nuclear clauses are distinct categories before keeping generated VNC/NNC output tied to frame contracts.
- Verified local Andrews PDF Lesson 7.1 wording that a verbstem is the lexical center of a VNC and can be morphologically analyzed before keeping generator source/stem surfaces frame-first.

Verification:

- `node --check src/core/generation/engine.js`: passed.
- `node --check src/core/generation/engine.mjs`: passed.
- `node --check src/core/generation/runtime_support.js`: passed.
- `node --check src/core/generation/runtime_support.mjs`: passed.
- `node --check src/core/generation/morphology_engine.js`: passed.
- `node --check src/core/generation/morphology_engine.mjs`: passed.
- `node --check src/tests/morphology_engine.test.js`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame nnc_adjectival`: passed, 1642/1642.
- `node scripts/run_tests.js morphology_engine vnc grammar_frame nnc_adjectival --runtime=module`: passed, 1642/1642.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC Allomorphy ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `getVncAllomorphyContractSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative VNC allomorphy output boundary.
- Stale direct `surface`, `outputSurface`, `selectedOutputSurface`, `nawatSurfaceSuffix`, and legacy `result` aliases no longer get appended when a result frame exists.
- Metadata-only frames still allow legacy `forms` fallback through `getVncAllomorphySourceSurfaceForms()`.
- Focused VNC tests now carry stale allomorphy aliases beside framed outputs and assert that only result-frame surfaces feed the source-form list.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2.1 wording that graphic representation belongs to the spelling/output layer before preventing stale allomorphy display aliases from overriding a result frame.
- Verified local Andrews PDF Lesson 37.1 wording that deverbal nounstems derive from a VNC core before treating allomorphy output as a framed derivational contract.
- Verified local Andrews PDF Lesson 38.1 wording that the impersonal patientive nounstem has an impersonal VNC core as source before preserving source-form fallback only for metadata-only frames.
- Verified local Andrews PDF Lesson 39.1 wording that the perfective patientive nounstem has a perfective active verbstem as source before keeping patientive allomorphy output frame-first.

Verification:

- `node --check src/core/vnc/allomorphy.js`: passed.
- `node --check src/core/vnc/allomorphy.mjs`: passed.
- `node --check src/tests/vnc.test.js`: passed.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame`: passed, 1642/1642.
- `node scripts/run_tests.js vnc morphology_engine grammar_frame --runtime=module`: passed, 1642/1642.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Preterit ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Preterit class-based surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Preterit universal variant assembly readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `forms`, and legacy `result` aliases no longer get appended when a result frame exists.
- Metadata-only preterit frames still allow legacy form/result fallback because they do not carry an authoritative result frame.
- Focused preterit tests now carry stale top-level aliases beside framed outputs and assert that only result-frame surfaces feed the generated contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 2.1 wording that graphic representation belongs to the spelling/output layer before preventing stale preterit surface aliases from overriding a result frame.
- Verified local Andrews PDF Lesson 7.1 wording that a verbstem is the lexical center of a VNC before keeping preterit output tied to stem/result-frame contracts.
- Verified local Andrews PDF Lesson 7.4 wording that Class B perfective stems undergo spelling/phonological changes before preserving class-based preterit surfaces as framed output.
- Verified local Andrews PDF Lesson 7.5 wording that some verbs can have alternative perfective stem formations before preserving variant lists through `resultFrame.surfaceForms`.
- Verified local Andrews PDF Lesson 7.6 wording that verbstem-class membership is a grammatical classification issue before keeping class-based preterit routing distinct from late legacy aliases.

Verification:

- `node --check src/core/preterit/api.js`: passed.
- `node --check src/core/preterit/api.mjs`: passed.
- `node --check src/core/preterit/engine.js`: passed.
- `node --check src/core/preterit/engine.mjs`: passed.
- `node --check src/tests/preterit.test.js`: passed.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine`: passed, 1642/1642.
- `node scripts/run_tests.js preterit grammar_frame morphology_engine --runtime=module`: passed, 1642/1642.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM NNC Panel ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Verb-derived nominal NNC surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Panel visibility/renderable surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `surfaceForms`, and legacy `result` aliases no longer leak into verb-derived NNC contracts or panel visibility when a result frame exists.
- Metadata/no-frame NNC and panel readers still allow legacy top-level fallback because no authoritative result frame is present.
- Focused NNC and UI tests now carry stale top-level aliases beside framed outputs and empty framed outputs, proving both framed surfaces and blocked frames stay authoritative.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 36.6 wording that instrumentive NNCs are created by nominalization of VNCs and require different source/result stems before keeping verb-derived nominal output tied to the framed NNC result contract.
- Verified local Andrews PDF Lesson 36.10 wording that passive-action NNC stems are produced by downgrading a VNC predicate into a nounstem before suppressing late legacy surface aliases.
- Verified local Andrews PDF Lesson 36.11 wording that active-action NNCs are the active-voice counterpart to passive-action NNCs before preserving the nounstem/result boundary.
- Verified local Andrews PDF Lesson 46.4 wording that a nominalized imperfect-tense VNC predicate fills the embed position of a locative compound nounstem before keeping locative-temporal output frame-first.

Verification:

- `node --check src/core/nnc/nnc.js`: passed.
- `node --check src/core/nnc/nnc.mjs`: passed.
- `node --check src/ui/panels/panels.js`: passed.
- `node --check src/ui/panels/panels.mjs`: passed.
- `node --check src/tests/nnc.test.js`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js nnc ui grammar_frame module_wrapper_parity`: passed, 1644/1644.
- `node scripts/run_tests.js nnc ui grammar_frame module_wrapper_parity --runtime=module`: passed, 1644/1644.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival Adverbial ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Adverbial nuclear clause surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `surfaceForms`, nested output surfaces, and legacy `result` aliases no longer leak into framed adjectival/adverbial outputs.
- No-frame adjectival/adverbial readers still allow legacy top-level fallback because no authoritative result frame is present.
- Focused adjectival and adverbial tests now carry stale top-level/direct/nested aliases beside framed outputs and assert that only result-frame surfaces feed the contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40.1 wording that adjectival NNCs are nominal nuclear clauses functioning adjectivally before keeping adjectival output tied to framed NNC result contracts.
- Verified local Andrews PDF Lesson 40.3 wording that absolutive-state NNCs and VNCs can function as adjectives before suppressing late display aliases.
- Verified local Andrews PDF Lesson 44.1 wording that adverbial modifiers are VNCs/NNCs or adjoined clause units with adverbial function before keeping adverbial nuclear output frame-first.
- Verified local Andrews PDF Lesson 44.2 wording that adverbialization has first and second degrees, with VNCs and possessive-state NNCs permitting only first-degree adverbialization, before preserving route-layer diagnostics.

Verification:

- `node --check src/core/nnc/adjectival/adjectival.js`: passed.
- `node --check src/core/nnc/adjectival/adjectival.mjs`: passed.
- `node --check src/core/clause/adverbial/adverbial.js`: passed.
- `node --check src/core/clause/adverbial/adverbial.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node --check src/tests/adverbial.test.js`: passed.
- `node scripts/run_tests.js adverbial nnc_adjectival nnc ui grammar_frame module_wrapper_parity`: passed, 1644/1644.
- `node scripts/run_tests.js adverbial nnc_adjectival nnc ui grammar_frame module_wrapper_parity --runtime=module`: passed, 1644/1644.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Composition ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Clause composition AST readers now treat `grammarFrame.resultFrame` as the authoritative surface boundary for supplied input nodes.
- Covered readers are adjectival modification, adverbial adjunction, complementation, and conjunction.
- Stale direct `surface`, `surfaceForms`, `surfaceDisplay`, nested output surfaces, legacy `result`, and fallback `word` values no longer leak into composed AST nodes when an input carries a result frame.
- No-frame composition readers still allow legacy supplied-surface fallback because these AST builders compose given clause/unit surfaces rather than generating word forms.
- Focused composition tests now carry stale top-level/nested aliases beside framed inputs and assert that only result-frame surfaces feed the AST nodes and composed surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 42.1 wording that multiple-nucleus adjectival modification is a clause-level modification structure before keeping composed adjectival AST input surfaces frame-first.
- Verified local Andrews PDF Lesson 49.1 wording that simple adverbial modification consists of a modifier/adjoined clause and a head/principal clause before keeping adverbial adjunction AST input surfaces frame-first.
- Verified local Andrews PDF Lesson 51.1 wording that double-nucleus complementation uses an adjoined NNC complement before preserving complement AST input surfaces as supplied result-frame output.
- Verified local Andrews PDF Lesson 52.1 wording that conjunction joins two items in a balanced, non-subordinate relationship before preserving each conjunct's result-frame surface independently.

Verification:

- `node --check src/core/clause/adjunction/adjunction.js`: passed.
- `node --check src/core/clause/adjunction/adjunction.mjs`: passed.
- `node --check src/core/clause/modification/modification.js`: passed.
- `node --check src/core/clause/modification/modification.mjs`: passed.
- `node --check src/core/clause/complement/complement.js`: passed.
- `node --check src/core/clause/complement/complement.mjs`: passed.
- `node --check src/core/clause/conjunction/conjunction.js`: passed.
- `node --check src/core/clause/conjunction/conjunction.mjs`: passed.
- `node --check src/tests/adjunction.test.js`: passed.
- `node --check src/tests/modification.test.js`: passed.
- `node --check src/tests/complement.test.js`: passed.
- `node --check src/tests/conjunction.test.js`: passed.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame module_wrapper_parity`: passed, 1644/1644.
- `node scripts/run_tests.js adjunction modification complement conjunction grammar_frame module_wrapper_parity --runtime=module`: passed, 1644/1644.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Adjectival Chip Entry ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC function chip-to-entry promotion now treats `grammarFrame.resultFrame` as the authoritative surface boundary.
- `getAdjectivalNncFunctionEntrySurfaceForms()` no longer appends the clicked/local surface when a contract result frame exists.
- A blank or blocked result frame now prevents stale clicked text from being written into the main verb input as an adjectival NNC function entry.
- Existing no-frame entry promotion still allows the clicked/local surface fallback because there is no authoritative result frame.
- Focused tests now cover both framed-surface promotion and empty-frame suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40.1 wording that an adjectival NNC is an NNC in adjectival function before keeping chip promotion tied to the NNC result contract.
- Verified local Andrews PDF Lesson 40.3 wording that absolutive-state NNCs and VNCs can function as adjectives before preserving the frame-provided target surface.
- Verified local Andrews PDF Lesson 40.4 wording that patientive nounstems often create NNCs translated as adjectives before suppressing stale clicked surfaces for blocked patientive-adjectival entries.
- Verified local Andrews PDF Lessons 40.5-40.8 wording that nominalized VNC predicates can be translated as adjectives before preserving nominalized-VNC adjectival entry surfaces through `resultFrame`.

Verification:

- `node --check src/ui/composer/composer.js`: passed.
- `node --check src/ui/composer/composer.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js nnc_adjectival ui state grammar_frame module_wrapper_parity`: passed, 1645/1645.
- `node scripts/run_tests.js nnc_adjectival ui state grammar_frame module_wrapper_parity --runtime=module`: passed, 1645/1645.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM UI Route State ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Nawat route state helpers now treat an existing `grammarFrame.resultFrame` as an authoritative route/output boundary even when it is empty.
- Static route target attachment no longer writes local target-surface fallbacks into top-level `surfaceForms` when the incoming record already has an empty result frame.
- Route station surface labels now suppress stale `surface`, `renderVerb`, and `inputValue` fallbacks when an empty result frame is present.
- Linked grammar path generation requests still preserve stage source input as the generation source, but they no longer use legacy `nextSource` fields when a framed `nextSource` produced no surface.
- Focused state tests now cover framed surfaces, empty framed route targets, empty framed station labels, and empty framed linked-stage source suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 54.1 wording that denominal verbstems are derived from nounstems by verbstem-forming suffixes before preserving route-state source/result boundaries.
- Verified local Andrews PDF Lesson 54.2 wording that the inceptive/stative suffixes create intransitive verbstems before keeping suffix-route previews separate from stale display surfaces.
- Verified local Andrews PDF Lesson 55.1 wording that another denominal `tia` suffix is intransitive before keeping linked route stages frame-gated.
- Verified local Andrews PDF Lesson 55.2 wording that `tla` can attach to nounstems to create causative verbstems before preserving route contracts as structural controls rather than free output fallbacks.

Verification:

- `node --check src/ui/state.js`: passed.
- `node --check src/ui/state.mjs`: passed.
- `node --check src/tests/state.test.js`: passed.
- `node scripts/run_tests.js state grammar_frame module_wrapper_parity`: passed, 1648/1648.
- `node scripts/run_tests.js state grammar_frame module_wrapper_parity --runtime=module`: passed, 1648/1648.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM Linked Stage Rendering ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar path renderer labels now treat an existing `grammarFrame.resultFrame` as an authoritative source/display boundary.
- `getNawatLinkedGrammarStageDisplaySurface()` no longer falls through to legacy `nextSource.displaySurface` or stage `surface` when a framed `nextSource` or stage has no output surface.
- `getNawatLinkedGrammarStageSourceVerb()` still preserves source input as a route source when no result frame is present, but an empty framed `nextSource` now suppresses stale legacy source fields.
- Focused UI tests now cover both framed linked-stage surface labels and empty-frame suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 54.1 wording that denominal verbstems derive from nounstems by verbstem-forming suffixes before preserving linked-stage source/result boundaries.
- Verified local Andrews PDF Lesson 54.2 wording that inceptive/stative suffixes create intransitive verbstems before keeping renderer labels tied to framed route outputs.
- Verified local Andrews PDF Lesson 55.1 wording that another denominal `tia` suffix is intransitive before blocking stale linked-stage labels for empty frames.
- Verified local Andrews PDF Lesson 55.2 wording that `tla` can attach to nounstems to create causative verbstems before keeping renderer labels structural instead of free output fallbacks.

Verification:

- `node --check src/ui/rendering/rendering.js`: passed.
- `node --check src/ui/rendering/rendering.mjs`: passed.
- `node --check src/tests/ui.test.js`: passed.
- `node scripts/run_tests.js ui state grammar_frame module_wrapper_parity`: passed, 1649/1649.
- `node scripts/run_tests.js ui state grammar_frame module_wrapper_parity --runtime=module`: passed, 1649/1649.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Completed Phase: LCM VNC Adjectival Function Entry ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- VNC adjectival-function entry contract resolution now treats `grammarFrame.resultFrame` as the authoritative target-surface boundary.
- `getAdjectivalNncFunctionEntryContractSurface()` no longer appends stale top-level `surface` when a serialized entry contract has a result frame.
- Empty framed adjectival-function contracts now prevent `resolveAdjectivalNncFunctionOverrideFromInput()` from constructing a generation override from stale serialized surface text.
- Focused adjectival tests now cover stale serialized surface suppression for empty result frames.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

PDF verification:

- Verified local Andrews PDF Lesson 40.3 wording that NNCs and VNCs can function as adjectives before preserving frame-provided adjectival-function surfaces.
- Verified local Andrews PDF Lesson 40.4 wording that derivationally generated nounstems can produce NNCs translated as adjectives before blocking stale patientive-adjectival serialized surfaces.
- Verified local Andrews PDF Lesson 40.5 wording that predicates of nominalized VNCs can be translated as adjectives before keeping serialized function entries tied to their result frame.

Verification:

- `node --check src/core/vnc/vnc.js`: passed.
- `node --check src/core/vnc/vnc.mjs`: passed.
- `node --check src/tests/nnc_adjectival.test.js`: passed.
- `node scripts/run_tests.js vnc nnc_adjectival grammar_frame module_wrapper_parity`: passed, 1650/1650.
- `node scripts/run_tests.js vnc nnc_adjectival grammar_frame module_wrapper_parity --runtime=module`: passed, 1650/1650.
- `npm run check:data`: passed.
- `npm run test:regression`: passed, 12/12.
- `git diff --check`: passed.

## Merge Rules

- Do not edit the same file from two worktrees at the same time.
- Update this board before ending a coordination session when assignments change.
- If uncertain, write a question or target clarification instead of guessing.
- Main-thread edits should stay on the current working tree unless the user explicitly requests worktrees.
