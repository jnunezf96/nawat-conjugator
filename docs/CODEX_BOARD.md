# Codex Coordination Board

> Live implementation target: `docs/CURRENT_TARGET.md`. This file remains the historical decision and validation record.

## Source Of Truth

- Grammar book: `/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf`
- Grammar digest: `docs/ANDREWS_PDF_DIGEST.md`
- Grammar section digest: `docs/ANDREWS_SECTION_DIGEST.md`
- Grammar layer LCM: `docs/ANDREWS_LAYER_LCM.md`
- Repo: `/Users/jaimenunez/Desktop/Nawat_Conjugator`
- Architecture side channel: `019e997b-3f2b-7e30-bbf7-0c773c6ca188`
- Main implementation thread: `019e9442-c3e2-7490-bf93-04d7995f1dc5`

## Standing Interpretation

- Andrews PDF supplies the supreme grammar-rule authority for engine structure and generation logic: order, roles, slots, boundaries, categories, dependencies, supported derivational operations, source/target routes, and generation gates.
- Nawat/Pipil evidence and user-provided forms may be recorded as lexical/spelling evidence. They do not decide whether Andrews-licensed grammar logic can generate.
- Classical spellings from Andrews grammar rules should pass through `convertClassicalLettersToNawat()` / `getClassicalLettersAsNawat()` before they become Nawat/Pipil engine surfaces. Andrews-supported derivations remain structurally valid after letter conversion; e.g. Classical `tl` maps to Nawat `t`, `tla-` maps to `ta-`, `tla-(pa-tla)` corresponds structurally to Nawat `ta-(pa-ta)`, Classical `(pa-ti)-tl` corresponds to Nawat `(pa-ti)-t`, and Classical person `-h` maps to Nawat `-t`. This converts letters only; it is not lexical fixture evidence.
- Keep current UI/engine contracts as the starting point.
- Andrews is lesson-per-lesson; the UI/engine is not. Use lessons as curriculum/status and evidence indexes, then implement reusable grammar categories, slot metadata, diagnostics, and controls.
- Classical lesson layering rule: lower Canvas lessons authorize identity, allowed variants, witnesses, and provisional VNC/NNC outputs; higher Canvas lessons authorize environment, placement, scope, sentence force, and final boundary conditions. Selected output is final only after the highest active Canvas layer for the requested surface has been applied.
- Prefer small, tested patches over broad redesign.
- Do not make ordinary NNC generation automatic unless the user explicitly changes that contract.
- At the end of every bounded job, report whether all main findings from the active comparison have been risk-averted. If not, name the remaining findings and do not imply full closure.

## Completed Phase: Canonical Classical Result Output-Scope Contract

Date: 2026-07-19

Decision:

- Established one typed ordered `single|paradigm` Result vocabulary with separate exact NNC and VNC control/tag records.
- Preserved distinct paradigm semantics: NNC state/subject/possessor/relation/number enumeration and VNC valence/subject/mood/tense enumeration with its active-only voice gate.
- Distinguished absent scope from malformed explicit scope across application, rendering, state, and URL restoration; malformed values no longer inherit `single`, stale DOM, or a less restrictive voice path.
- Added literal VNC `/vnc-output/` persistence for both Direct and derived routes while retaining the old positional capsule as non-authorizing compatibility input.
- Derived Result shell and Canvas inventory proof from the contract; contextual sentence, particle, person, directional, and role-specific dimension inventories remain separate.

Validation:

- VNC passed `214/214`; NNC `458/458`; state `413/413`; UI `413/413`; registry `43/43`; derivation `224/224`; orthography `41/41`; runtime `9/9`.
- Runtime manifest passed with one browser entry and `76/76` modules/installers; syntax and residual-duplicate scans passed.
- Live entry `053` restored VNC and NNC paradigm URLs, kept the inactive role at `single`, rejected fabricated VNC scope to the clean default, and logged no warnings/errors. Populated VNC generation remains covered by focused tests because the full paradigm exceeded the in-app verification tab's resource boundary.
- Alignment architecture metrics matched baseline exactly. The repository command remains red for the inherited 607-line live board and cross-action dirty-worktree overlap; the shared-action manifest therefore remains active pending external coordination, without an output-scope-attributable regression.
- Main-finding risk status: all six comparison findings are risk-averted. Contextual sentence modes, Lesson 9 particles/modifiers, person inventories, directionals, and role-specific paradigm dimensions remain intentionally separate.

## Completed Phase: Canonical Ordinary-NNC Noun-Class Contract

Date: 2026-07-19

Decision:

- Established one profile-aware typed contract for Nawat `t|ti|in|zero`, Classical `tl|tli|in|zero`, their profile-specific aliases, and the exact spelling bridge `tl→t`, `tli→ti`, `in→in`, `zero→zero`.
- Preserved the context-sensitive distinction that `ti` is canonical Nawat `ti` but a Classical alias for `tl`; retained `li` as a Classical alias/allomorph of `tli`, not a fifth class.
- Distinguished absent class intent from malformed explicit intent. Unknown direct, fixture-backed, or restored `/s-class/` and `/cn-class/` input now fails closed instead of inheriting zero, `tl`, or a fixture class.
- Removed the dormant duplicate composer class selector and derived the active Result selector, Classical normalization, state, URL handling, and inventory validation from the contract.
- Kept manual parenthesized source text available, but stopped its suffix from manufacturing noun-class provenance. Generation requires a separately typed class selection or lexical fixture authority.
- Preserved contextual Classical form guidance, subclasses, number dyads, surface allomorphs, pronominal NNC categories, and fixture authority as separate concerns.

Validation:

- Ordinary and Classical NNC passed `458/458`; state `411/411`; UI `411/411`; derivation `224/224`; Classical VNC application `32/32`; orthography `41/41`; grammar registry `43/43`; runtime `9/9`.
- Runtime manifest remained one browser entry and `75/75` modules/installers; syntax, JSON, and diff checks passed.
- Live entry `052` showed exact Nawat `t/ti/in/zero` and separate Classical `tl/tli/in/zero` controls and Canvas tags. `(nemi)` selected no noun class by itself; an explicit typed class and animacy remained a separate valid authorization path.
- A forged `/s-class/fabricated` URL created no fabricated control or fallback class. Alignment architecture metrics matched baseline exactly; the command remains red for inherited board-size and cross-action worktree overlap, with no noun-class-attributable regression.
- Main-finding risk status: tense/mood, derivation type, voice, source transitivity, and ordinary NNC noun class are risk-averted. Output-scope duplication remains open.

## Completed Phase: Canonical Source-Transitivity Contract

Date: 2026-07-19

Decision:

- Established one generation-valency contract for ordered Intransitive/Transitive/Bitransitive source topology, A/B/C slot identity, and the `vi/vt/vb` aliases.
- Preserved the intentional distinction between non-authorizing structural source topology, the six-value Canvas Valence authority, and Lesson 4's binary intransitive/transitive formula grouping.
- Replaced composer URL and renderer handwritten recognition with the typed contract.
- Closed invalid override fallthrough, malformed `/tr/` restoration, composer invalid-to-slot-A serialization, and Lesson 4 invalid-to-intransitive authorization.
- Kept the hidden select as a compatibility mirror: recognized values can reflect state, but poisoned hidden DOM cannot authorize or block grammar.

Validation:

- UI passed `411/411`; state/orthography/inline composer passed `462/462`; VNC passed `213/213`; application/registry passed `75/75`.
- Runtime manifest remained one browser entry and `75/75` modules/installers; syntax, manifest JSON, and diff checks passed.
- Lessons 20–22 retained its existing unrelated wording failure at `29/30`.
- Live entry `051` proved exact shell/select/slot parity, bitransitive slot-C restoration independent of intransitive Canvas Valence, forged-URL fail-closed behavior, and clean logs.
- Alignment architecture metrics matched baseline exactly. The command remains red for inherited board-size and cross-action worktree overlap, with no source-transitivity-attributable architecture regression.
- Main-finding risk status: tense/mood, derivation type, voice, and source transitivity are risk-averted. Ordinary NNC noun class and output-scope duplication remain open.

## Completed Phase: Canonical VNC Voice Contract

Date: 2026-07-19

Decision:

- Established one core five-value target-voice vocabulary and retained the intentional three-value causative source-voice subset.
- Replaced application and renderer handwritten recognition with typed voice selection frames.
- Closed the paths where unknown target or source voice was marked rejected but still authorized Active output.
- Validated exact ordered shell options against their Canvas records, preserving entrada v1 positional meaning without making UI or ledger metadata authoritative.
- Preserved typed contextual allowed-voice inventories, source-before-target ordering, general Nawat voice mode, and ordered higher voice-layer operations as distinct concerns.

Validation:

- Application passed `32/32`; Lesson 11 plus continuity passed `26/26`; matched UI passed `409/409`; grammar-contract registry passed `43/43`.
- Runtime manifest remained one browser entry and `75/75` modules/installers; syntax and focused hostile checks passed.
- Lessons 20–22 retained its existing unrelated wording failure at `29/30`.
- Live entry `050` reported authorized five/three voice parity, valid Active output for `(nemi)`, and clean logs.
- Alignment architecture metrics matched baseline exactly. The command remains red for inherited board-size and cross-action worktree overlap, with no voice-attributable architecture regression.
- Main-finding risk status: tense/mood, derivation type, and voice are risk-averted. Source transitivity, ordinary NNC noun class, and output-scope duplication remain open.

## Completed Phase: Canonical VNC Derivation-Type Contract

Date: 2026-07-19

Decision:

- Made the core Andrews derivation evaluator's Direct/Causative/Applicative vocabulary the shared recognized-input contract for application, general UI state, renderer state, URL restoration, shell/Canvas parity, and tests.
- Closed the application hole where an unknown requested derivation was marked unrecognized but still normalized to an authorized Direct formula.
- Retained the unknown request in a typed blocked frame; Direct is now only a safe layout fallback and cannot supply formula, surface, machinery, or applied typed frames for that request.
- Made invalid derivation URL snapshots fail before applying their source or derivative capsule, instead of actively restoring Direct.
- Validated actual shell button values and their Canvas tag records one-to-one. The shell and ledger remain non-authorizing evidence carriers.
- Preserved contextual distinctions: Causative and Applicative still require typed source-specific inventories; derived-only subsets remain contextual; Karttunen operation and Lesson 23 governor taxonomies were not merged.

Validation:

- VNC application passed `31/31`; Lesson 11 plus continuity passed `24/24`; matched UI passed `407/407`; grammar-contract registry passed `43/43`.
- Runtime manifest remained one entry and `75/75` modules/installers; syntax, manifest JSON, and diff checks passed.
- Live entry `049` reported authorized `direct|causative|applicative` shell/Canvas parity. Valid `(nemi)` Direct produced `#ni-0(nemi)0+0-0#`; a fabricated derivation URL left Source unapplied, status blocked, formula empty, and warning/error logs empty.
- Alignment architecture metrics matched baseline, including registered-contract coverage. The command remains red for inherited board-size and cross-action worktree overlap, with no attributable architecture regression.
- Main-finding risk status: tense/mood and derivation type are risk-averted. Voice, source transitivity, ordinary NNC noun class, and output-scope duplication remain open.

## Completed Phase: Canonical VNC Semantic Mood/Tense Contract

Date: 2026-07-19

Decision:

- Established one typed VNC semantic input contract for the three moods, nine recognized semantic tense tokens, and their Canvas mood-compatible subsets. Semantic `general-past` remains distinct from the lower `distant-past` morphological realization.
- Made the UI mood/tense normalizers and mood option contracts consume the canonical contract instead of maintaining independent arrays.
- Replaced the self-referential nine-token test with a comparison of the actual shell values and option tags against the canonical vocabulary and Canvas option ledger; a poisoned shell value fails the validator.
- Enforced recognized mood, recognized tense, mood compatibility, and indicative Lesson 11 lexeme availability in the engine. Direct application and restored/injected state retain invalid requests in blocked typed frames and cannot inherit safe layout fallbacks as generated output.
- Extended cache versioning through the changed bootstrap/runtime child-module graph so the browser cannot mix the new renderer with a stale VNC contract module.

Validation:

- Lesson 11 and continuity passed `22/22`; VNC application passed `30/30`; matched UI suites passed `405/405`; grammar-contract registry passed `43/43`.
- Runtime manifest remained aligned at one browser entry and `75/75` modules/installers; syntax and diff checks passed.
- Lessons 20–22 remained `29/30`; its sole failure is the existing concurrent wording mismatch for generated source formation.
- Live entry `048` reported canonical shell inventory status `authorized`, exact 3-mood/9-tense parity, `#0-0(nen)ca+0-0#` / `Nenca.` for 3sg `(nemi)` general past, and zero warning/error logs.
- Alignment architecture metrics matched baseline, including registered-contract coverage. The command remains red only for inherited board size and cross-action dirty-worktree overlap; this action adds no unexplained architecture regression.
- Main-finding risk status: tense/mood duplication and engine authorization are risk-averted. Derivation type, voice, source transitivity, ordinary NNC noun class, and output-scope duplication remain open because the user selected Option 2 rather than the broader protocol audit.

## Completed Phase: Lesson 11 Selected-Output Continuity

Date: 2026-07-19

Decision:

- Traced live `(nemi)` general past from the Authority selector through surface normalization, application, selected Result, and finite surface.
- Found the first bypass before typed application: `general-past` existed in the shell, mood-bound contract, Lesson 11 plan, and engine, but was absent from `normalizeClassicalRuleLogicSurfaceTense()`, which silently substituted `present`.
- Added `general-past` to the shared surface-state tense vocabulary and verified parity for all nine visible tense tokens.
- Preserved the existing typed engine/application route: semantic general past maps to morphological distant past, selects `(nen)`, and realizes 3sg `#0-0(nen)ca+0-0#` / `Nenca.`.
- Audited sibling Lesson 11 routes (`mani`, `ih-ca`, and suppletive `ye`) plus the existing higher-voice general-past checks; no second typed-stem bypass was found.
- Bumped the single module entry to `046` so the repaired normalizer cannot be hidden by the previously loaded child-module graph.

Validation:

- Lesson 11 plus continuity: `19/19`; VNC application: `30/30`; matched UI suites: `402/402`.
- Syntax, runtime manifest (`1` browser entry, `75` modules/installers), and `git diff --check` passed.
- Live 3sg `(nemi)` general past displayed `Nenca.` and `#0-0(nen)ca+0-0#`; browser warning/error logs were empty.
- Lessons 20–22 retained all general-past higher-voice checks; its one unrelated failure is the concurrent generated-formation wording expectation.
- Alignment architecture metrics stayed at baseline; the remaining gate failures are inherited board-size and overlapping unrelated dirty-action scope.

## Completed Phase: Refresh-stable URL Screen and Derivative Type

Date: 2026-07-18

Decision:

- Extended the existing `entrada/v1` URL snapshot to preserve the active Source, Authority, or Result screen alongside the entered stem/name.
- Kept Source as the legacy/default screen, serialized Authority as `screen/formula` and Result as `screen/output`, and restored through the existing panel-state setter.
- Preserved non-default derivative types as `derivation/causative` or `derivation/applicative`; legacy URLs retain Direct, and restoration uses the canonical derivation setter and control synchronizer.
- Closed the immediate-refresh race by synchronously flushing derivative clicks into the existing URL snapshot instead of waiting for the general deferred UI-state update.
- Wired the canonical panel-change event back to the existing URL synchronizer, without adding a second navigation carrier.
- Extended the same snapshot with one compact `v` capsule for non-default Causative and Applicative Authority selections. Positional option indexes keep URLs bounded while a fixed append-only control inventory preserves `entrada/v1` meaning.
- Captured derived input/change events before dynamic controls rerender, and restored static prerequisites before generated formation, participant, nonactive, and later-layer choices.
- Omitted the capsule for Direct and all-default derived state; malformed control positions and oversized option indexes fail closed.

Validation:

- Focused module UI verification passed `398/398` assertions; syntax checks and `git diff --check` passed.
- Live browser refresh retained `(chōca)` on Result and emitted no warning/error logs.
- Live Causative refresh retained `(chōca)`, Authority, `/derivation/causative`, and the active Causative control with no warning/error logs.
- Exact click-to-refresh proof passed for both Causative and Applicative from name-only URLs, with each segment present immediately and both controls retained after immediate reload.
- Fresh-origin Causative proof restored generated formation 4 and embedded subject 2pl from `v/40.54.84`; Applicative restored generated formation 2 and nonspecific-human imported object from `v/40.52.b7`.
- Both compact URLs reopened with `(chōca)`, Authority, the requested derivative, and the same selections; browser warning/error logs were empty.
- Alignment architecture metrics stayed at baseline; the gate remains open only for pre-existing board-size debt and unrelated dirty paths/PDF artifacts outside this action.

## Completed Phase: Canonical VNC Source Starter Presets

Date: 2026-07-18

Decision:

- Made canonical VNC Source selection load a coherent editable starter valence instead of inheriting a contradictory setting.
- Intransitive stems select intransitive. Transitive stems preserve any already selected transitive subtype; when none exists, they start at specific projective with the established 3sg object.
- Reused the typed Lesson 7 class profile but accepted only non-fallback rules. This preselects Class for 76 of 160 records and preserves the current Class for the other 84 instead of guessing Class A.
- Kept the inventory and picker non-authorizing: these are editable convenience choices, and derivational routes and generated outputs remain governed by the engine.

Validation:

- UI and causative relation UI: `397/397` assertions passed, including representative A/B/C/D stems and hostile unresolved-Class behavior.
- Runtime manifest: one modern browser entry, `75/75` modules and installers.
- Fresh-origin browser: `cuā` loaded D + specific 3sg; `chīhua` preserved projective-nonhuman and the current Class because its class rule is unresolved; `chōca` loaded A + intransitive. Browser warning/error logs were empty.
- Live inventory audit: 76 supported Class presets, 84 preserve-current cases, zero guessed unresolved classes.
- Alignment passed after the bounded action closed. Full readiness intentionally not run.

## Completed Phase: Canonical Classical Source Stem Picker

Date: 2026-07-18

Decision:

- Added a non-authorizing Source inventory with 160 VNC verbstem records and 39 NNC nounstem records drawn from the completed Canvas source catalogs; excluded a harvested schematic `□` carrier because it is not a canonical lexical stem.
- Displayed transitive VNC stems as `...-(STEM)`, intransitive VNC stems as `(STEM)`, and NNC nounstems as `(STEM)`, preserving internal hyphens and vowel length and excluding formula-shaped citations.
- Resolved the source-catalog quantity collision to `pīn-ā-hua` from exact Canvas lexical evidence. Kept `āhui-ya` and `ahhuiā-ya` distinct because their cited identities are distinct.
- Kept selection source-only: a choice fills the lexical stem through the existing source-parts transition without deciding valence, noun class, participants, state, or realization.

Validation:

- UI and causative relation UI: `396/396` assertions passed.
- Runtime manifest: one modern browser entry, `75/75` modules and installers.
- Fresh-origin browser proof: 160 VNC choices and 39 NNC choices, correct visibility switching and stem-only labels, direct-entry survival, and no warning/error logs.
- Alignment metrics returned to their stabilization baselines; the active-scope pass reported only unrelated pre-existing PDF artifacts and completed-action paths, and the closed-action audit passed.
- Full readiness intentionally not run for this bounded Source-control slice.

## Completed Phase: Classical Authority Initial Defaults

Date: 2026-07-18

Decision:

- Set the ordinary VNC Authority initial state to `1sg` subject, `3sg` object, and indicative present across the canonical shell and runtime fallbacks.
- Set Applicative imported object to `3sg` by default. Kept the separate causative embedded subject at `3sg` and left NNC participant defaults unchanged.
- Preserved explicit user selections in Direct, Causative, and Applicative rather than reapplying defaults after interaction.

Validation:

- Focused UI and causative relation UI: `393/393` assertions passed.
- Fresh-origin live browser: Direct showed `1sg` / `3sg` / present; Causative retained main `1sg` / present and its separate embedded `3sg`; Applicative showed imported object `3sg` and retained main `1sg` / present.
- Alignment passed after the focused action was closed. The initial active-scope pass identified unrelated pre-existing PDF artifacts and the earlier completed-action manifest rather than an architecture-metric regression.
- Full readiness intentionally not run for this focused default change.

## Completed Phase: Canvas Adjudication Handoff

Date: 2026-07-18

Decision:

- Closed every user-adjudicated Lessons 24–26 issue and moved the project beyond the former decision ledger. Canonical notation, tense-bearing formulaic notation, hidden bases, exact variants, recursive history, source voice, participant depth, and later passive composition now remain distinct typed concerns.
- Removed causative object kind as a user decision. Source voice and the typed participant transform derive it; only conditionally licensed referent-relation and specific-shuntline questions remain. Ineligible hidden values are cleared before application request construction.
- Preserved exact Canvas citation carriers separately from actual participant roles, so forms such as `tla-(mī-n-a)` remain licensed notation without restoring the removed participant selector or making catalog strings authoritative.

Validation:

- Runtime manifest: one browser entry, `74/74` modules and installers.
- Alignment: green at all stabilization baselines, including renderer construction `38/38`.
- Grammar data: passed.
- Regular suite: `3,496/3,496` across `69` suites.
- Lesson 20 and Lessons 20–22 focused audits passed. The recorded run then stopped before the required Lessons 24–26 complete-example, witness/productive, Karttunen, and browser-delivery responsibilities. That run is implementation evidence only, not a completed readiness result; focused changed-path evidence never substitutes for an unrun readiness stage.
- Replaced the flat multi-hour command with `scripts/verify_readiness.mjs`: eleven atomic stages, content-addressed exact-input proof, interruption-safe resume, two-worker bounded execution for independent misses, and fresh-only alignment/browser stages. A manifest proof executed once and was then reused against the identical fingerprint; alignment reran fresh and remained green.

## Completed Phase: Derived Authority Mood/Tense Restoration

Date: 2026-07-18

Decision:

- Identified the obsolete Causative/Applicative Authority #2 lock as the pending application presentation block dropping the authorized source machinery kind. This disabled the entire Mood and Tense controls before generated-formation selection.
- Restored capability derivation from the authorized source machinery only. The unresolved derivation remains blocked, its generated formation remains required, and source-voice, participant, Object, and later-target-voice gates remain governed by their typed inventories.
- Added the observed work-duration rule to `AGENTS.md`: use bounded focused checks during implementation, reserve complete resumable readiness for formal handoff, and split combined long-running work types into durable slices.

Validation:

- UI and causative relation UI: `392/392` assertions passed.
- Classical VNC application: `25/25` assertions passed.
- Fresh-origin live browser: Causative accepted `optative` + `nonpast` with formation still required; Applicative retained enabled Mood/Tense with formation still required.
- Full readiness intentionally not run for this focused repair.

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

- No blocker.

## Current Explicit Implementation Target: Andrews Logic Authority

Date: 2026-06-23

Status: Active in current worktree.

Target:

- Make Andrews, not Nawat/Pipil evidence, the deciding authority for grammar logic and Andrews-licensed generation gates.
- Keep Classical spellings structural and pass realized Nawat/Pipil output through the orthography bridge.
- Change concrete generation behavior where routes were blocked only because Nawat/Pipil evidence was missing.

Boundaries:

- Do not import Classical surface spellings directly as Nawat/Pipil output.
- Do not use Nawat/Pipil examples to invent unsupported Andrews routes.
- Keep patches scoped and tested by formula/workbench behavior before larger derivational rewrites.
- Keep implementation reusable as a route-builder category/workflow, not a one-off hard-coded lesson panel.

## Completed Phase: Classical Lessons 24-25 Complete Example Generation

Date: 2026-07-17

Decision:

- Froze a section-indexed evidence catalog of all `227` Lesson 24-25 Canvas records: `225` positive source/result examples and `2` explicit negative constraints. Catalog strings are comparison evidence only; canonical typed sources, inventories, operations, machinery, and later-layer finalizers remain generation authority.
- Closed the concrete generation gaps instead of accepting shape-only matches. The major missing groups were source prehistory/coalescence, Type 2 `-tiā` quantity, unpredictable lexical bridges, additional unprinted canonical bridge stages, `tla-` prefix routing, long-`ō` bridge selection, finite source-voice/VNC projection, perfective quantity, ambiguity, mood, later voice, and supplementation.
- Kept lesson layers separate. Stem and participant rules do not absorb perfective, ambiguity, mood, voice, or supplementary-sentence behavior. The §25.13 active alternative reading has its own signed source-quantity projection; generic §25.12 remains `caquītia`, passive `caquitīlo` remains unchanged, and an unrelated `{section: "25.13"}` request cannot authorize anything.
- The five source-unprinted rows have explicit independent evidence: `(chich-ī-ni)` is Andrews-implied; `(ciy-ā-hua)` and `(top-ē-hua)` are Andrews-presupposed; `moitta` and `nicnōtza` use compositionally reconstructed typed sources. Printed targets never infer these sources.
- Implemented the complete causative participant cascade in Authority: generated formation first, then causative object kind, then referent relation only for equal specific person categories. Existing and late-surfaced participant selects share direct plus capture-phase handling with one-render deduplication; Change resets the object and removes dependent relation state.
- Reworked the exhaustive audit as a lesson-handoff consumer. Its `227` evidence rows map to `213` target-free generation keys; each canonical source/profile inventory is generated once into a shared relation index, then Canvas records query that already-generated index. Per-layer timing exposes regressions, while the regular test suite keeps only representative and hostile authority cases.

Validation:

- Complete audit passes `225/225` positive exact and `2/2` negative verified, with `0` surface mismatches, `0` missing records, and `0` policy violations. Layer highlights include stem `112/112`, VNC `41/41`, perfective `28/28`, ambiguity `4/4`, voice `5/5`, and supplementation `6/6`.
- Hostile proof rejects forged stem targets, §25.13 source/result strings, copied statuses, and section-label authorization. The redesigned representative/hostile catalog suite passes `12/12` in `22.51s`; focused finite, registry, participant-UI, and engine-failure suites also pass.
- Fresh-origin browser proof exposes both `iuc-ci` causative formations, enforces formation → object → relation order, authorizes `Tlaucxitia.` / `#0-0+tla(uc-xi-tia)0+0-0#` and `Quiucxitia.` / `#0-0+qu-0(iuc-xi-tia)0+0-0#`, resets dependent state through Change, preserves the Andrews Linear/Diagram structure, and reports zero logs.

## Completed Correction: Exhaustive Karttunen Lessons 24-26 Type Assignment

Date: 2026-07-17

Decision:

- Correct the earlier organizer's ending-only/unclassified buckets: every reconciled derivative must have at least one analytical type within Lessons 24-26.
- Promote §§25.2.1-25.4.7 to explicit report types. `HUĀQU(I) -> HUĀQUĪTIĀ` is specifically §25.2.1, while §25.2.4 remains for typed destockal `i/a-hui -> huī-tiā` sources.
- Keep analytical type, evidence strength, ambiguity, and anomaly as separate axes. Weak shape can classify a row but every candidate stays `classificationOnly`, `generationLicensed=false`, and authority=false.
- Assign the two causative dictionary-form anomalies to their nearest numbered Canvas types with visible anomaly flags; retain the raw spelling and do not silently normalize it.
- Preserve all typed-data gaps: the unsegmented Karttunen tuple still does not supply class, valence, root analysis, derivational history, or lexical selection, and classification alone cannot generate.

Validation:

- Lesson 25 assignment is `276/276`: `275` single and `1` ambiguous. Its independent evidence partition remains `89` exact + `1` comparison + `51` nonactive-corroborated + `73` edit-compatible + `62` raw-shape-only.
- Lesson 26 assignment is `695/695`: `661` single and `34` ambiguous. Its independent evidence partition remains `452` exact + `173` compatible + `22` cross-lesson ambiguous + `48` raw-shape-only.
- Exact Lesson 26 membership combinations: §26.6 `296`; §26.7 `114`; §26.4+§26.8.1 `34`; §26.4 `2`; §26.8.1 `2`; §26.8.4 `2`; §26.8.2 `1`; §26.10 `1`.
- Hostile invariants require `HUĀQUĪTIĀ` under §25.2.1, `PĪNĀUHTIĀ` as a classified but nonproductive §25.8 comparison, `ĀYĪLTIĀ` under analytical §25.4 with no license, zero untyped rows, full boundary round-trip, and all-false authority/license.
- The fixed-SHA organizer passes and writes schema v3 grouped JSON, summary/README, and sorted one-row-per-relation TSVs under `reports/generated/karttunen_1992_lessons24_26_types/`.
- Canonical tests pass `3393/3393` across `55` suites; runtime delivery remains `73/73`; every lesson, productive-rule, and Karttunen evidence audit passes; browser smoke passes with one module script, zero classic scripts, typed authority true, and formula-string authority false. Alignment is rerun against the completed action so unrelated dirty paths are not falsely claimed by this correction.

## Completed Phase: Reconciled Karttunen Causative Boundary Projection

Date: 2026-07-17

Decision:

- Added a deterministic offline runner for the supplied fixed-SHA Karttunen CSV. It reads the raw `Karttunen` field, preserves quantity, and reconciles source-row parser exceptions before analysis: four wrong/four missed causatives and ten wrong/eight missed nonactives.
- Kept three evidence tiers separate. Canonical runtime or explicit Canvas witnesses provide exact boundary records; same-source Karttunen nonactives and uniquely Andrews-anchored edit signatures provide non-authorizing hypotheses; a visible right-edge edit frontier carries no morpheme claim.
- The closed nonactive aligner applies only Andrews `hua → tiā`, `ō → tiā`, `o-hua → tiā`, and `lō → l-tiā`, with specific `lō` precedence. Karttunen confirms the raw pair but never licenses the route.
- Added exact Canvas gap records for `āhui-ya-l-tiā`, `pīn-ā-uh-tiā`, `pol-i-huī-tiā`, and `tlatz-i-huī-tiā`. The distinct `pīn-ā-hua-l-tiā` remains a nonactive compatibility hypothesis rather than being conflated with §25.8.
- Audited the §25.2.4 final-`hui` family as an intransitive prerequisite. Six currently reproduced spellings are visibly flagged as transitive-only runtime matches instead of being accepted silently.

Validation:

- Reconciled inventory: `276` causatives and `808` nonactives.
- Exact boundaries: `90`; hypothesis-only records: `124`; exact-or-hypothetical coverage: `214/276`.
- Same-source nonactive evidence: `183`; exact family corroborations: `97` (`56 hua`, `35 lō`, `4 o-hua`, `2 ō`), including `52` with no current runtime projection and zero target-boundary ambiguity.
- Andrews-anchored edit hypotheses: `109`. Reversible target-ending frontiers: `274/276`; frontier-only: `60`; fully unresolved: `2`.
- The explicit `ĀY(I) → ĀYĪLTIĀ` no-license fixture remains frontier-only, every authority flag remains false, and every exact or hypothesized target round-trips quantity-preservingly.
- `npm run infer:karttunen-causative-boundaries -- --source '/Users/jaimenunez/Downloads/karttunen_all - karttunen_all.csv'` passes. `npm run verify:readiness` is fully green: `3393/3393` tests across `55` suites, aligned `73/73` runtime delivery, all lesson/Karttunen audits, and direct-import browser smoke.

## Completed Phase: Canvas Lessons 24-25 Boundary-Free Causative Completion

Date: 2026-07-17

Decision:

- The user approved the five-part completion slice recorded in `docs/CURRENT_TARGET.md`.
- Added a canonical boundary-free source-analysis contract. It recognizes supported destockal, root-plus-`ya`, denominal-`ti`, hidden-nonactive, exact alternation, and suppletive structure from typed identity and final shape; user-authored hyphens are observations only.
- Completed Lesson 24 Class A/B final-`i`, final-`a`, ni/hui preference, documented consonant, and destockal routes. Completed Lesson 25 internal-base alternations, `liā`/`huiā` exceptions, `yauh`/`huāllauh` suppletion, and the signed `huāl` directional environment.
- Source active/passive/impersonal voice is selected before the causative and remains distinct from later target voice. Lesson 23 participant routing now proves one-, two-, and three-object causatives, including the §25.12.3 impersonal two-object source.
- #3 consumes a deep-frozen application projection of forward formation, participant history, boundary-free source analysis, and canonical reverse analyses. Presentation does not construct grammar.
- Canonical comparison no longer builds giant serialized strings. Signatures stream the same sorted data, while authorization uses exact descriptor-based structural equality with dense/sparse position parity and rebuilt typed frames; caller objects are not cached.

Validation:

- Focused suites pass source voice `11/11`, Lessons 24-26 `24/24`, application `24/24`, Lessons 20-22 `30/30`, registry `43/43`, docs `7/7`, and UI `381/381`.
- The full ESM suite passes `3393/3393` across `55` suites. Lessons 20-22 formulas remain `39/39`; Lessons 24-26 witnesses pass `4/4`; all `14` productive derivation families and recursive depth `3` pass; Karttunen evidence remains `837` confirmed intersections plus one no-license fixture.
- Runtime delivery remains one browser entry and `73/73` modules/installers. Alignment is green. Direct-import browser smoke passes with one module script, zero classic scripts, typed authority true, and formula-string authority false.
- Fresh in-app proof accepts unhyphenated `chihua`, renders boundary-free and reverse-analysis panels, exposes the active/passive/impersonal source control, reveals canonical `chihua-lō` under impersonal source, and reports no console logs.

## Completed Phase: Classical Lesson 3 Particle Rule Logic

Date: 2026-07-08

Decision:

- Classical Lesson 3 now has Transcription-first rule frames for Andrews 3.2 functional classes, 3.3 negativizing particles, 3.4 particle collocations, and 3.5 honorificized particles.
- These frames remain particle authority only. They do not authorize nuclear-clause formulas, sentence/clause negation generation, honorific nuclear-clause operations, or the Nawat/Pipil orthography bridge.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` marks every Lesson 3 slice `logic-tested` and keeps exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Lesson 4 Nuclear-Clause Rule Logic

Date: 2026-07-08

Decision:

- Classical Lesson 4 now has Transcription-first rule frames for formula-position authority and personal-pronoun position authority.
- The Lesson 4 proof consumes Lesson 2 orthography and Lesson 3 particle-separation proofs before authorizing a nuclear-clause formula frame.
- Personal pronouns are proved as affixal formula-position logic: nominative in VNC/NNC subject positions, objective only in VNC predicate positions, possessive only in NNC predicate positions, and no gender feature.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` marks every Lesson 4 slice `logic-tested` and keeps exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Lesson 5 Intransitive VNC Rule Logic

Date: 2026-07-08

Decision:

- Classical Lesson 5 now has Transcription-first rule frames for the intransitive VNC formula, subject person/case fillers, subject number dyads, predicate tns fillers, selected-output logic, and receipt authority boundaries.
- The Lesson 5 proof consumes the Lesson 4 intransitive VNC conclusion before any Lesson 5 subject or tense filler can authorize.
- Square-zero uses U+2395 in Lesson 5 number logic; future singular, nonpast optative singular, and nonpast admonitive singular are distinguished by the selected mood/tense context, and admonitive plural records `t-in` with `t-ih` as a subvariant.
- Receipts mirror selected-output logic only. They display authorized Lesson 5 formulas and cannot authorize formulas by themselves.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` keeps every Lesson 5 slice `logic-tested` and points to exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Lesson 6 Transitive VNC Object Rule Logic

Date: 2026-07-08

Decision:

- Classical Lesson 6 now has Transcription-first rule frames for transitive VNC formula authority, objective object-pronoun categories, monadic valence fillers, dyadic projective fillers, mainline reflexive fillers, selected-output logic, and receipt boundaries.
- The Lesson 6 proof consumes Lesson 4 transitive VNC formula authority and Lesson 5 subject/tense/number filler logic before any object valence filler can authorize.
- Monadic `+va` is limited to shuntline reflexive/reciprocative `ne` and nonspecific projective `te`/`tla`; dyadic `+va1-va2` is used for specific mainline projective objects and mainline reflexive/reciprocative objects.
- Mainline reflexive va2 uses `o`, replaced by U+2395 before vowel-initial stems.
- Receipts mirror selected-output logic only and cannot authorize object formulas by themselves.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` keeps every Lesson 6 slice `logic-tested` and points to exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Lesson 7 Verbstem-Class Rule Logic

Date: 2026-07-08

Decision:

- Classical Lesson 7 now has Transcription-first rule frames for verbstem morphemic structure, verbcore citation, A/B/C/D class authority, Class B perfective changes, variable A/B class membership, class guidelines, core-plus-tense predicate formation, VNC analysis boundaries, indefinite/personal object relationships, and tla fusion.
- The Lesson 7 proof consumes Lesson 5 intransitive VNC logic or Lesson 6 transitive object logic after selecting a class-governed imperfective/perfective stem variant.
- Citation logic cites the verbcore when valence is present: `te`, `tla`, `m-o`/`m-⎕`, and `t-o`/`t-⎕` stay Classical citation markers, not Nawat/Pipil spelling bridges.
- Tla fusion is derivational: fused `tla` moves inside the derived intransitive verbstem boundary and no longer occupies the object slot.
- Receipts mirror selected-output logic only and cannot authorize citation, class, predicate, object-relationship, or tla-fusion decisions by themselves.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` keeps every Lesson 7 slice `logic-tested` and points to exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Visible Rule Logic Surface

Date: 2026-07-08

Decision:

- Classical Lessons 5-7 now have a visible rule-logic surface before Lesson 8 work: selected formula, proof chain, display receipt boundary, and Transcription witness lines are rendered in the output panel.
- The controls select lesson, subject, mood/tense, verbstem class, valence, object, and tla fusion without using Nawat/Pipil spelling as authority.
- The visible surface also exposes machine-readable datasets and `getActiveClassicalRuleLogicSurfaceFrame()` so future Codex work can inspect the current Classical rule logic instead of treating it as hidden data underneath.
- Receipts remain display-only. The visible block mirrors selected-output logic and records `not-authority` for receipts.

## Completed Phase: Classical Lesson 8 Expanded VNC And Sentence Surface Rule Logic

Date: 2026-07-11

Decision:

- Classical Lesson 8.1 now has Transcription-first rule frames for expanded VNC boundaries: `on`/`huāl` are the only true VNC-internal expansion, while `ō#`, `ah#`, and `ca#` remain outside the VNC formula boundary.
- Directional/locative placement is carried into selected output by valence context: before an intransitive stem, before monadic/reflexive/reciprocal valence, or after a specific projective valence position.
- Outside prefixes preserve object shape and cannot become VNC formula slots; hostile attempts to force outside prefixes into formula slots block the boundary frame.
- Classical Lesson 8.2-8.6 now has a sentence-surface frame that consumes the selected VNC result for affirmative assertions, negative assertions, emphatic `ca`, and yes/no questions by intonation or `cuix`, without letting sentence particles authorize or modify VNC formula slots.
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json` keeps the Lesson 8 slices `logic-tested` and points to exact Transcription line witnesses as the legal deed.

## Completed Phase: Classical Lesson 8 Visible Result Surface

Date: 2026-07-11

Decision:

- The Result panel now has a visible Sentence surface control for Statement, Negative, Emphatic, Question by intonation, and Question with `cuix`.
- The visible result shows the selected VNC formula as one level and the Lesson 8 sentence surface as a separate level built from that formula.
- The receipt records the two-level authority split: VNC selected-output logic authorizes the formula, while Andrews Lesson 8 sentence-surface logic adds sentence particles and punctuation outside the VNC formula.
- UI and hostile tests prove `ah#`, `ca`, and `cuix` can feed sentence surface output without becoming VNC formula slots.

## Current Phase: Classical Lesson-Layer Architecture Tested With Lesson 9

Date: 2026-07-11

Decision:

- Lesson 9 is the first explicit stress test for the lesson-layer rule: Lesson 5-8 VNC output remains a consumed lower-layer result, while Lesson 9 sentence logic decides optative wish, command, exhortation, introductory particles, negative wish/command force, future-indicative-as-optative use, and final sentence validity.
- The durable checklist for future lessons is: identify the earlier output consumed, classify the new Canvas claim as a new piece/environment/finalizer, mark the provisional lower output, name the highest active finalizer, and add a hostile test proving the earlier output cannot freeze too early.
- Lesson 9 sentence material must stay outside VNC formula slots. `mā`/`tlā` introduce wish/command sentence force; they do not become VNC slot fillers. Under Lesson 9 negative wish/command logic, `mā`/`tlā` licenses `ca#`; when a brusque second-person command omits `mā`, Canvas requires `ah#` instead.

Evolutionary subgoal:

- If Lesson 9 exposes a better contract than the current Lesson 8 sentence-surface frame, update the architecture rule and tests so later lessons inherit the stronger highest-active-layer model instead of being forced into older supportive-i or sentence-surface assumptions.

Follow-up implementation:

- The visible Authority surface now separates Mood from Tense. Optative and admonitive belong under Mood; they are not Sentence type choices.
- The visible Sentence type control is limited to statement, emphatic, question by intonation, and question with `cuix`. Wish and command/exhortation remain Lesson 9 engine logic where invoked, but they no longer compete with Sentence type on the surface.
- Lesson 9 activation now comes from Canvas mood/use conditions, not hidden visible Sentence type choices: optative mood can finalise as a Lesson 9 optative sentence, second-person nonpast optative without `mā`/`tlā` can finalise as a brusque command, and future/preterit optative uses remain optative while borrowing indicative VNC form. Introductory `mā`/`tlā` never belong to plain indicative mood. The visible Tense control includes `past`, `future`, and `preterit` for Canvas optative-use examples.
- The result receipt exposes the Canvas-derived role, the role rule, and borrowed-indicative-form use when active. The visible polarity control is positive/negative; negative polarity remains Canvas-governed because `ah#` may remain `ah#` or become `ca#` under Lesson 9 conditions.
- Sentence-surface Authority option tags now carry a role-derivation field so future sentence-layer options cannot become untagged free labels.
- Lesson 9 sentence modifiers now surface as Canvas-gated Authority controls: `ihyo`/`ye` before `mā`/`tlā`, and `cuēl`, `ye cuēl`, `cuēl eh`, `ye cuēl eh`, `tēl`, and `quin` after the introductory particle. Invalid environments disable or normalize these options away, while hostile direct calls block when a Lesson 9 modifier is forced into a VNC formula slot.

## Current Phase: Classical Lesson 10 General Admonitive Sentence Layer

Date: 2026-07-12

Decision:

- Lesson 10 extends the highest-active-layer architecture from Lesson 9: the lower selected VNC result remains provisional, while the Lesson 10 sentence layer decides admonitive warning/advice force, obligatory `mā`, optional or required `nēn`, negative-admonition `ah#`, and final sentence validity.
- Admonitive sentence force is not prohibition and is not negative by itself. Negative admonition is a separate Lesson 10 sentence operation: `mā nēn` is obligatory and `ah#` remains `ah#`; Lesson 9 `ca#` does not carry into this environment.
- Subject-person comparisons are exposed as roles, not mood changes: second person resembles direct command, third person resembles indirect command, and first person resembles exhortation, but the sentence remains admonitive warning/advice.
- The visible Authority surface now allows `nēn` only as a Lesson 10 admonitive modifier: optional under positive admonition, required under negative admonition, and unavailable under indicative mood.

Evolutionary subgoal:

- Finish Lesson 10 in phases. Phase 1 covers all of Lesson 10 at the general sentence-layer level. Phase 2 revisits each Lesson 10 sublesson individually so every Canvas condition, exception, particle role, stem requirement, polarity rule, and surface distinction is accounted for.

Phase 2 status:

- `10.1` is now logic-tested as its own sublesson slice. The engine and visible surface classify admonitive as positive cautionary warning/advice, reject the vetitive/prohibition reading, reject negative-command reading, and mark English `don't`/`may not` translations as not-authority. Hostile tests prove those readings cannot become selected-output authority.
- `10.2` is now logic-tested as its own sublesson slice. The Lesson 10 layer consumes the lower VNC/predicate proof to expose nonpast-only tense authority, perfective-stem basis, Class A `h` vs preterit `0` contrast, non-Class-A `0` contrast, `⎕-0` / `t-in ~ t-ih` number behavior, and no translation value outside sentence context. A hostile direct future-tense request now blocks at the sentence layer instead of silently becoming a valid final admonition.
- `10.3` is now logic-tested as its own sublesson slice. Affirmative admonition conversion is explicit: an admonitive VNC substitutes for a present indicative assertion, `mā` must begin the admonition sentence, optional `nēn` is an adverbialized-NNC strengthener, `mā nēn` remains Canvas-separated while traditional spelling `manen` is recorded as writing policy, subject-person comparisons are surfaced as roles, and hostile `don't`/`may not` translation readings block at the sentence layer.
- `10.4` is now logic-tested as its own sublesson slice. Negative admonition is explicit as a transformation from a negative present-indicative assertion: `ah#` is affixed to the admonitive VNC, `mā nēn` obligatorily introduces the sentence, the sentence force is cancellation of warning / recommendation to reject caution, the traditional `positive vetative` label is not authority, and hostile Lesson 9 `ca#` logic blocks at the Lesson 10 sentence layer.
- `10.5` is now logic-tested as its own sublesson slice. The engine and visible surface record the admonitive / nonpast optative / present indicative / preterit indicative contrast set, the `x`/`xi` second-person optative distinction, plural-subject distinctiveness, `mā` as sentence-layer distinguisher, glottal-stop omission ambiguity, `h` as admonitive tense morph versus present-indicative `num1` filler, and the nonpast block against antecessive-order prefix readings. Hostile tests prove a contrast reading or antecessive-order reading cannot authorize the admonitive sentence while the lower VNC proof remains provisional.
- Lesson 10 Phase 1 and Phase 2 are covered for `10.1` through `10.5`. Next useful audit before Lesson 11: confirm the UI wording never makes the lower VNC result look final when the Lesson 10 sentence layer is active.

## Completed Phase: Preterit Class A P+i CV|CV Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for transitive `p+i` with `CV|CV` right-edge shape no longer authorizes Class A candidate selection or the ki-only target policy from descriptor-only `CV-CV(pV)` matches; the selected broad `CV-CV(pV)` target branch now consumes typed source/operation/target frames directly.
- `buildPretClassAPiCvTransitiveSourceFrame()` represents the original source verb, `p+i` right edge, `CV|CV` profile, transitivity, monosyllable gate, and target policy; `buildPretClassAPiCvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-pi-cv-transitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassA()` require those typed frames for the selected `tapi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Classical NNC Source, Authority, And Sentence Coherence

Date: 2026-07-13

Decision:

- The typed NNC formula remains provisional when a higher sentence/discourse layer is active. Lesson 16 now consumes the Lesson 12-15 NNC result and finalizes positive clause-initial inherent interrogatives with information-question force; negative or noninitial use removes that inherent reading.
- Source structure owns pronominal NNC family and quantitive matrix identity. These facts no longer compete as free Authority selections, and contradictory programmatic requests fail closed.
- Authority exposes clause position for inherent interrogatives, plus Canvas-authorized NNC polarity and sentence choices. Result keeps the connected NNC formula, sentence-finalized formula, and written surface.
- NNC Authority now has one stable visible control set across NNC source families. Source-owned facts are not rendered as Authority controls or repeated in the Current Authority summary: Source kind and Source matrix remain internal mirrors for compatibility and appear through Source/readout and Result proof instead. Conditional Authority controls remain in place and switch between enabled and disabled states instead of disappearing.
- The stable NNC Authority set is arranged by Canvas role rather than lesson: Subject (`pers` plus referent and `num`), Predicate (State, possessor, nounstem class/subclass/use stem), and the later Sentence layer.
- Authority controls now carry an explicit user-input contract: `required` when the current Canvas context permits a choice, `not-required` when the context fixes or vacates the choice, and `not-authority` for Source-owned internal mirrors. This contract applies to the stable NNC controls and the stable VNC controls.
- VNC Authority follows the same stable-control rule and is arranged by Canvas role: Verbstem (class and conditioned readings/constructions), Subject (`pers`), Predicate (Mood/Tense, Valence/Object, fusion, directional/locative), and the later Sentence layer. Unavailable VNC controls remain visible but disabled.
- The `ā-0` proof case now yields `#0-0(ā-0)c-0#?` and `Āc?`; noninitial yields `Āc.`, and negative yields `Ahāc.` Hostile tests prove the earlier statement default and contradictory Source/Authority type cannot control the final surface.
- Lesson 16.4.3 now governs plural `(cā-tl-e-in)`: the `tl-e-in` matrix realizes as `tl-e-i` before the fixed `m-eh` subject-number dyad, yielding `#0-0(cā-tl-e-i)m-eh#`. Authority exposes `3pl` for this source structure but fixes Number form to disabled `m-eh`; hostile `t-in` requests remain blocked below the surface.

## Completed Phase: Preterit Class A/B CV|CV(w+i) Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for non-reduplicated transitive `w+i` with `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, or Class B `k` output from descriptor-only `CV-CV(wi)` matches; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvwiTransitiveSourceFrame()` represents the original source verb, `w+i` right edge, `CV|CV` profile, transitivity, non-reduplicated state, monosyllable gate, and target policy; `buildPretClassACvwiTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvwi-transitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected transitive `sewi`-style route; missing source/operation/target frames, contradictory reduplication/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A P+a CV|CV Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `p+a` with `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A ki-only output, or Class B `k` output from descriptor-only `CV-CV(pV)` matches; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassAPaCvIntransitiveSourceFrame()` represents the original source verb, `p+a` right edge, `CV|CV` profile, intransitivity, monosyllable gate, and target policy; `buildPretClassAPaCvIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-pa-cv-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected `mipa`-style route; missing source/operation/target frames, contradictory source/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Both Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A N+a CV|CV Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `n+a` with `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, or Class B `k` output from descriptor-only `CV-CV(na)` matches; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassANaCvIntransitiveSourceFrame()` represents the original source verb, `n+a` right edge, `CV|CV` profile, intransitivity, monosyllable gate, and target policy; `buildPretClassANaCvIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-cv-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected `pana`-style route; missing source/operation/target frames, contradictory source/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Both Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B Kw+i CV|CV Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `kw+i` with `CV|CV` right-edge shape no longer authorizes Class B candidate selection or the `k` target from descriptor-only `CV-CV(kwi)` matches; the selected Class B target branch now consumes typed source/operation/target frames directly.
- `buildPretClassBKwiCvIntransitiveSourceFrame()` represents the original source verb, `kw+i` right edge, `CV|CV` profile, intransitivity, monosyllable gate, and target policy; `buildPretClassBKwiCvIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-kwi-cv-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `takwi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B V|CV|CV(u) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `V|CV|CV` ending in `u` no longer authorizes Class B candidate selection or the `k` target from descriptor-only `V-CV-CV(u)` matches; the selected Class B target branch now consumes typed source/operation/target frames directly.
- `buildPretClassBVcvcuIntransitiveSourceFrame()` represents the original source verb, `*+u` right edge, `V|CV|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassBVcvcuIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-vcvcu-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `akaku`-style route; missing source/operation/target frames, contradictory final-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B Vl|CV|CV(wi) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `w+i` with `Vl|CV|CV` right-edge shape no longer authorizes Class B candidate selection or the `k` target from descriptor-only `Vl-CV-CV(wi)` matches; the selected Class B target branch now consumes typed source/operation/target frames directly.
- `buildPretClassBVlcvwiIntransitiveSourceFrame()` represents the original source verb, `w+i` right edge, `Vl|CV|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassBVlcvwiIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-vlcvwi-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `altawi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B CV(u)|CV(ni) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `n+i` with `CV|CV` right-edge shape and previous nucleus `u` no longer authorizes Class B candidate selection or the `k` target from descriptor-only `CV(u)-CV(ni)` matches; the selected Class B target branch now consumes typed source/operation/target frames directly.
- `buildPretClassBCvniuIntransitiveSourceFrame()` represents the original source verb, `n+i` right edge, `CV|CV` profile, previous nucleus, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassBCvniuIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-cvniu-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `kuni`-style route; missing source/operation/target frames, contradictory previous-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A/B CV|V|CV(ni) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `n+i` with `CV|V|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, Class B `k` output, or the singular-vs-Class-B policy from descriptor-only `CV-V-CV(ni)` matches; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvvniIntransitiveSourceFrame()` represents the original source verb, `n+i` right edge, `CV|V|CV` profile, previous nucleus, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassACvvniIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvvni-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, `buildPretUniversalClassB()`, and the preterit singular-vs-Class-B policy rule require those typed frames for the selected `teini`-style route; missing source/operation/target frames, contradictory previous-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A/B CV|CV(s+i) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `s+i` with `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, or Class B `k` output from descriptor-only `CV-CV(sV)` matches; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvsvIntransitiveSourceFrame()` represents the original source verb, `s+i` right edge, `CV|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassACvsvIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvsv-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected `pasi`-style route; missing source/operation/target frames, contradictory final-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B Vj|CV(wa) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `w+a` with `Vj|CV` right-edge shape no longer authorizes Class B candidate selection or the `k` target from descriptor-only `Vj-CV(wa)` matches.
- `buildPretClassBVjwaIntransitiveSourceFrame()` represents the original source verb, `w+a` right edge, `Vj|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassBVjwaIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-vjwa-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `ajwa`-style route; the candidate/blocking guard now reads the typed right-edge descriptor directly, the Class B builder consumes the typed target frame for the `k` suffix, and missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A/B CV|CV(w+i) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `w+i` with `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, or Class B `k` output from the broad descriptor-only `Wi` aggregate; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvwiIntransitiveSourceFrame()` represents the original source verb, `w+i` right edge, `CV|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassACvwiIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvwi-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected `sewi`-style route; missing source/operation/target frames, contradictory final-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A/B CV|CV|CV(w+i) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `w+i` with `CV|CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A `ki` output, or Class B `k` output from the broad descriptor-only `Wi` aggregate; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvcvwiIntransitiveSourceFrame()` represents the original source verb, `w+i` right edge, `CV|CV|CV` profile, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassACvcvwiIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvcvwi-intransitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected `tepewi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A/B CV|CV|CV(w+i) Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for non-reduplicated transitive `w+i` with `CV|CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A zero-suffix output, or Class B `k` output from descriptor-only `Wi` state; the selected Class A and Class B target branches now consume typed source/operation/target frames directly.
- `buildPretClassACvcvwiTransitiveSourceFrame()` represents the original source verb, `w+i` right edge, `CV|CV|CV` profile, final onset/nucleus, transitivity, monosyllable gate, reduplication absence, and target policy; `buildPretClassACvcvwiTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvcvwi-transitive-policy`.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require those typed frames for the selected transitive `tepewi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A and Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A CV(i)|CV(w+a) Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for transitive `w+a` with `CV|CV` right-edge shape and leading `i` nucleus no longer authorizes Class A candidate selection, Class A `ki` output, or Class A zero-suffix output from descriptor-only `CV(i)-CV(wa)` state.
- `buildPretClassACvwaiTransitiveSourceFrame()` represents the original source verb, `w+a` right edge, `CV|CV` profile, previous nucleus, final onset/nucleus, transitivity, monosyllable gate, and target policy; `buildPretClassACvwaiTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvwai-transitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassA()` require those typed frames for the selected transitive `chiwa`-style route; the candidate/blocking guard now reads the typed right-edge descriptor directly, the target builder consumes the typed target frame for zero/`ki` permission, and missing source/operation/target frames, contradictory previous-nucleus/target frames, display-string poisoning, descriptor poisoning, intransitive/non-`i`/non-`CV|CV` source attempts, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A CV(e)|CV(w+a) Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for transitive `w+a` with `CV|CV` right-edge shape and leading `e` nucleus no longer authorizes Class A candidate selection or Class A `ki` output from descriptor-only `Ewa` state.
- `buildPretClassACvewaTransitiveSourceFrame()` represents the original source verb, `w+a` right edge, `CV|CV` profile, previous nucleus, final onset/nucleus, transitivity, monosyllable gate, and target policy; `buildPretClassACvewaTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-cvewa-transitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassA()` require those typed frames for the selected transitive `sewa`-style route; the candidate/blocking guard now reads the typed right-edge descriptor directly, the target builder consumes the typed target frame for `ki` permission, and missing source/operation/target frames, contradictory previous-nucleus/target frames, display-string poisoning, descriptor poisoning, intransitive/non-`e`/non-`CV|CV` source attempts, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class A CV(a)|CV(w+a) Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for non-reduplicated, non-slash transitive `w+a` with `CV|CV` right-edge shape and leading `a` nucleus no longer authorizes Class A candidate selection or Class A `ki` output from descriptor-only `Wa` state.
- `buildPretClassACvawaTransitiveSourceFrame()` represents the original source verb, `w+a` right edge, `CV|CV` profile, previous nucleus, final onset/nucleus, transitivity, monosyllable gate, reduplication absence, slash-marker absence, and target policy through the shared `preterit-class-a-cvwa-transitive` route-family helper; `buildPretClassACvawaTransitiveOperationFrame()` consumes that family frame and emits `andrews-preterit-class-a-cvawa-transitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassA()` require those typed frames for the selected transitive `kawa`-style route; the candidate/blocking guard now reads the typed right-edge descriptor directly, the target builder consumes the typed target frame for `ki` permission and `j`-base exclusion, and missing source/operation/target frames, contradictory slash/target frames, display-string poisoning, descriptor poisoning, intransitive/non-`a`/non-`CV|CV`/reduplicated/slash source attempts, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Preterit Class B CV(u)|CV(wa) Intransitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for intransitive `w+a` with `CV|CV` right-edge shape and leading `u` nucleus no longer authorizes Class B candidate selection or the `k` target from descriptor-only `CV(u)-CV(wa)` matches.
- `buildPretClassBCuwaIntransitiveSourceFrame()` represents the original source verb, `w+a` right edge, `CV|CV` profile, leading nucleus, final onset/nucleus, intransitivity, monosyllable gate, and target policy; `buildPretClassBCuwaIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-cuwa-intransitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassB()` require those typed frames for the selected `kuwa`-style route; the candidate/blocking guard now reads the typed right-edge descriptor directly, the Class B builder consumes the typed target frame for the `k` suffix, and missing source/operation/target frames, contradictory leading-nucleus/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class B variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

## Completed Phase: Current Regex Shorthand Source-Frame Gate

Date: 2026-07-05

Decision:

- The selected live parser route for bare current-regex shorthand inputs such as `nemi` no longer authorizes the envelope target `(nemi)` through the direct string helper `getCurrentRegexShorthandParseInput(rawValue)`.
- `buildCurrentRegexShorthandSourceFrame()` represents the original source input, protected supportive markers, source boundary flags, slash-boundary status, leading dash, normalized bare core, and target regex input. `buildCurrentRegexShorthandOperationFrame()` consumes that frame and emits the `andrews-current-regex-shorthand-operation-frame` plus typed target frame.
- Parser/validation callers use `getCurrentRegexShorthandParseInputFromSourceFrame()`, while direct string-only calls to `getCurrentRegexShorthandParseInput("nemi")` return empty and cannot authorize `(nemi)`.
- Slash boundaries now block as typed source-frame state (`boundary-present`), and missing operation frames, changed caller strings, contradictory target frames, missing target frames, and poisoned display fields cannot authorize or alter this shorthand route.

## Completed Phase: Verb Disambiguation Candidate Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live composer/parser disambiguation route for bare inputs such as `taketza` no longer authorizes candidate values by mutating `displayVerb`, deleting `/`, or reconstructing slash/dash candidates from rendered text.
- `buildVerbDisambiguationSourceFrame()` now represents the original input through current-regex parse structure, including source core, source token stream, boundary state, dash state, and display mirrors. `buildVerbDisambiguationOperationFrame()` consumes that source frame and emits typed candidate frames.
- `buildVerbDisambiguationCandidates()` consumes the typed operation frame before scoring candidates like `ta-ketza` and `t-aketza`; `buildVerbDisambiguationCandidatesFromOperationFrame()` blocks when the operation frame is missing or mismatched.
- Changed source frames, missing operation frames, slash-only display strings, and poisoned `stem` / `surface` / `result` / `formulaEcho` fields cannot authorize or alter disambiguation suggestions.

## Completed Phase: Embedded Slash Object Slot Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live parser route for adjacent-core embedded slash inputs such as `-(ish/kwi)` no longer authorizes embedded transitive object-slot count through direct slash placement in `getEmbeddedSlashTransitiveObjSlotCount(rawValue)`.
- `buildEmbeddedSlashObjectSlotSourceFrame()` now represents the original current-regex core boundary, slash boundary, adjacent embedded token, matrix token, transitivity, object-slot frame, and target count frame. `buildEmbeddedSlashObjectSlotOperationFrame()` consumes that source frame and emits the `andrews-embedded-slash-object-slot-operation-frame`.
- `parseVerbInput("-(ish/kwi)")` carries the typed source/operation frames and sets `embeddedValenceCount` from the operation frame before downstream object-slot availability is computed.
- Direct string-only calls return `null`; missing operation frames, changed source frames, contradictory target frames, valence-marker slash left sides, and poisoned display fields cannot authorize or alter the embedded object-slot count.

## Completed Phase: Compound Static Constants Token-Class Gate

Date: 2026-07-05

Decision:

- The selected static parser-configuration route for compound marker, split, and allowed-character behavior no longer authorizes parser character classes from JSON regex strings such as `compoundMarkerRe.pattern`.
- `data/static_constants.json` now carries structured `compoundTokenClasses` with marker tokens, split tokens, and allowed letter ranges. `applyStaticConstants()` consumes those token-class records and derives runtime regexes from escaped token frames instead of evaluating data-provided regex patterns.
- Legacy `compoundMarkerRe`, `compoundMarkerSplitRe`, and `compoundAllowedRe` payloads are ignored; poisoned legacy regex strings cannot change marker removal, split behavior, or allowed-character filtering once token classes are authoritative.

## Completed Phase: Unit Mode Source-Target Route Options Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live Formula-panel unit-mode route no longer authorizes CNV/CNN source-target route options from static pipe-delimited HTML such as `data-source-target-options="CNV->CNV|CNN->CNV|CNV/CNN->CNV/CNN"`.
- `buildAndrewsUnitSourceTargetRouteOptionsSourceFrame()` represents the selected unit mode, target formula frame, route option frames, and explicit no-DOM/no-pipe authority boundaries. `buildAndrewsUnitSourceTargetRouteOptionsOperationFrame()` consumes that source frame and emits the typed `andrews-unit-source-target-route-options-operation-frame`.
- `updateTenseModeTabs()` builds those frames from the active unit-mode state and renders `dataset.sourceTargetOptions` / `dataset.targetFormulaType` only after `applyAndrewsUnitSourceTargetRouteOptionsDataset()` validates the operation frame.
- Direct pipe strings, missing operation frames, contradictory target frames, stale DOM dataset text, and poisoned `surface` / `result` / `formulaEcho` mirrors cannot authorize or alter the unit source-target options.

## Completed Phase: Tense Block Output Audit Row-Model Gate

Date: 2026-07-05

Decision:

- The selected live UI audit route for tense-block output rows no longer authorizes row generation, route-contract, result, logic-authority, or orthography diagnostics from `.conjugation-row.dataset.grammar*` strings.
- `applyGrammarFrameRouteDataset()` now attaches a non-enumerable `andrews-tense-block-output-row-audit-model` built directly from the row's grammar frame: authority frame, route contract, orthography frame, diagnostic frame, result frame, source context, and source evidence.
- `getAndrewsTenseBlockOutputAuditRecord()` consumes only the typed row audit model's source/operation/target frames for row diagnostics. Dataset mirrors are still rendered for export/debug display, but stale or poisoned row datasets cannot authorize row counts, allowed/blocked status, result success, logic authority, source authority, or orthography status.
- Missing row audit operation frames and contradictory source/target audit frames block as missing route-contract diagnostics instead of falling back to DOM strings.

## Completed Phase: Tense Tab Selection Audit State-Model Gate

Date: 2026-07-05

Decision:

- The selected live UI audit route for Formula-panel tense tabs no longer authorizes selected, blocked, disabled, hard-gate, or output-probe state from `.tense-tab` classes, ARIA text, or `data-andrews-selection-*` strings.
- `applyAndrewsTenseTabSelectionAuthorityDataset()` now attaches a non-enumerable `andrews-tense-tab-selection-audit-model` built from the Andrews tense authority state, generation gate, output availability role, and typed selection target frame.
- `getAndrewsTenseTabSelectionAuditRecord()` consumes only the typed selection audit model's source/operation/target frames for selection counts. DOM datasets, class names, and ARIA attributes remain rendered mirrors/audit surfaces only.
- Missing selection audit operation frames, dataset-only tab metadata, poisoned DOM mirrors, and contradictory source/target selection frames block or diagnose instead of falling back to DOM strings.

## Completed Phase: Tense Tab Click Authority Model Gate

Date: 2026-07-05

Decision:

- The selected live Formula-panel tense-tab click route no longer authorizes click allowance from `data-andrews-selection-*`, native `disabled`, or ARIA strings.
- `getAndrewsTenseTabClickAuthorityState()` now consumes the typed selection audit target frame and builds an `andrews-tense-tab-click-authority-model` with source, operation, and target frames before returning click state.
- `applyAndrewsTenseTabClickAuthorityDataset()` attaches that click authority model and renders `data-andrews-click-*` only as audit/display mirrors.
- Missing selection audit operation frames, dataset-only selection/click metadata, poisoned DOM mirrors, and contradictory selection target frames block or diagnose instead of changing the authoritative click gate.

## Completed Phase: Visible CNV Formula Path-Slot Alignment Gate

Date: 2026-07-05

Decision:

- The selected live rendering route for path-specific visible CNV formula chips no longer authorizes formula rewrites by regex-parsing `formulaEcho` or matching projected formula text against rendered `surface` strings.
- `buildVisibleCnvFormulaAlignmentSourceFrame()` represents the structured `cnvFormulaSurfacePath.pathsBySurface[].paths` slot frames, and `buildVisibleCnvFormulaAlignmentOperationFrame()` consumes that frame to emit the visible target formula.
- `getVisibleCnvFormulaEchoEntries()` and `formatVisibleCnvFormulaSurfacePairEcho()` pass source/operation/target frames into `alignVisibleCnvFormulaEchoToSurface()` before rendering chip text; direct record-backed string-only calls return blocked output.
- Missing source frames, missing operation frames, contradictory target frames, poisoned `formulaEcho`, stale result/surface display strings, and changed display-only surface text cannot authorize or alter path-specific visible formula output.

## Completed Phase: Denominal Route Surface Suffix Inventory Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live Lesson 54-55 denominal route-family inventory path no longer treats slash-delimited perfect suffix strings such as `-iwtuk/-ijtuk` and `-awtuk/-ajtuk` as active suffix inventory values.
- `data/static_modes.json` now carries structured `surfaceSuffixes` arrays for those perfect routes, while the legacy `surfaceSuffix` string remains a display mirror.
- `buildNawatRouteSurfaceSuffixInventorySourceFrame()` represents the route id, family, display mirror, structured suffix frames, and block state. `buildNawatRouteSurfaceSuffixInventoryOperationFrame()` consumes that source frame before `getNawatDenominalRouteFamilyInventory()` adds suffixes.
- Missing operation frames, stale display suffixes, missing structured arrays for slash display strings, and slash-delimited structured suffix entries cannot authorize suffix inventory output.

## Completed Phase: Surface Chain Subject-I Stem-I Reduction Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for subject `ni` / `ti` before an `i`-initial stem no longer authorizes the target subject prefix by checking `tronco.startsWith("i")` and rewriting `pers1` inside `realizeSurfaceChainSubjectIInitialReduction()`.
- `buildSurfaceChainSubjectIInitialReductionSourceFrame()` represents the original subject prefix, object slot state, original `tronco`, stem-initial letter, and target prefix; `buildSurfaceChainSubjectIInitialReductionOperationFrame()` consumes that frame and emits the `andrews-surface-chain-subject-i-initial-reduction-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainSubjectIInitialReduction()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the `tronco` segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the reduction.

## Completed Phase: Surface Chain Optative Ki Reduction Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for optative `ki` before a consonant-initial following segment no longer authorizes the target object prefix by scanning segment strings inside `realizeSurfaceChainOptativeKiReduction()`.
- `buildSurfaceChainOptativeKiReductionSourceFrame()` represents the original object prefix, next source segment role/value, requested surface rule, vowel-start block state, and target object prefix; `buildSurfaceChainOptativeKiReductionOperationFrame()` consumes that frame and emits the `andrews-surface-chain-optative-ki-reduction-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainOptativeKiReduction()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the next segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the reduction.

## Completed Phase: Surface Chain K-Contact Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for object-prefix final `k` before stem-initial `k` / `kw` no longer authorizes target object/stem segments by checking `obj1.endsWith("k")`, `tronco.startsWith("k")`, and slicing the object or stem string inside `realizeSurfaceChainKContact()`.
- `buildSurfaceChainKContactSourceFrame()` represents the original object prefix, original `tronco`, contact branch (`k-before-k` or `k-before-kw`), and target object/stem segments; `buildSurfaceChainKContactOperationFrame()` consumes that frame and emits the `andrews-surface-chain-k-contact-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainKContact()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the stem changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter either k-contact branch.

## Completed Phase: Surface Chain KW-Coda Coalescence Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for coda `kw` reducing to `k` no longer authorizes the target segment by scanning current segment strings with a coda regex and calling `replace()` inside `realizeSurfaceChainKwCoalescence()`.
- `buildSurfaceChainKwCodaCoalescenceSourceFrame()` represents the original source segment role/slot/value, source coda, target coda, coalescence count, and target segment; `buildSurfaceChainKwCodaCoalescenceOperationFrame()` consumes that frame and emits the `andrews-surface-chain-kw-coda-coalescence-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainKwCoalescence()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing source/target/operation frames, stale source-frame reuse after the segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the coalescence.

## Completed Phase: Surface Chain NH-Before-Vowel Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for open-transition final `n` before a vowel-initial next segment no longer authorizes `nh` by looping over current segment strings, finding the next non-empty segment, testing vowels, and appending `h` inside `realizeSurfaceChainNhBeforeVowel()`.
- `buildSurfaceChainNhBeforeVowelSourceFrame()` represents the original current segment role/slot/value, next segment role/slot/value, source final, previous source letter, next initial, and target current segment; `buildSurfaceChainNhBeforeVowelOperationFrame()` consumes that frame and emits the `andrews-surface-chain-nh-before-vowel-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainNhBeforeVowel()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing source/target/operation frames, stale source-frame reuse after the next segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the transition.

## Completed Phase: Surface Chain Y-Coda Shift Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for coda `y` shifting to `sh` no longer authorizes the target segment by scanning current segment strings with a coda regex, checking transitivity from the current object string, and calling `replace()` inside `realizeSurfaceChainYShift()`.
- `buildSurfaceChainYShiftSourceFrame()` represents the original source segment role/slot/value, object-slot transitivity state, preserve-coda gate, source coda, target coda, shift count, and target segment; `buildSurfaceChainYShiftOperationFrame()` consumes that frame and emits the `andrews-surface-chain-y-coda-shift-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainYShift()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing source/target/operation frames, stale source-frame reuse after the segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the shift.

## Completed Phase: Surface Chain M-Coda Assimilation Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for coda `m` assimilating to `n` no longer authorizes the target segment by scanning current segment strings, peeking at the next segment string, applying a final-before-vowel exception, and calling `replace()` inside `realizeSurfaceChainMCodaAssimilation()`.
- `buildSurfaceChainMCodaAssimilationSourceFrame()` represents the original source segment role/slot/value, next segment role/slot/value, source coda, target coda, final-before-vowel block state, assimilation count, and target segment; `buildSurfaceChainMCodaAssimilationOperationFrame()` consumes that frame and emits the `andrews-surface-chain-m-coda-assimilation-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainMCodaAssimilation()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing source/target/operation frames, stale source-frame reuse after the segment changes, contradictory target frames, final `m` before a vowel, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the assimilation.

## Completed Phase: Optional Supportive-Y Output Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for optional supportive `y` no longer authorizes target stem output by parsing marked surface strings inside `resolveOptionalSupportiveOutputVerb()` / `resolveOptionalSupportiveMarkedSurface()`.
- `buildOptionalSupportiveOutputVerbSourceFrame()` represents the original subject, possessor, object, source `tronco`, supportive request, supportive letter, marked source stem, and nested marked-surface source frame. `buildOptionalSupportiveOutputVerbOperationFrame()` consumes that source frame and emits the `andrews-optional-supportive-output-verb-operation-frame` with a nested `andrews-optional-supportive-marked-surface-operation-frame`.
- `buildOutputSurfaceChain()` builds the typed frame from source slot input before realization; `resolveOptionalSupportiveOutputVerb()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy supportive-y calls without typed operation frames, missing operation frames, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the supportive-y output route.

## Completed Phase: Derived Mu-Stem Interaction Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live morphology-output route for derived `mu` stem interaction no longer authorizes object-prefix deletion, embedded `ta` / `te` insertion, or `tamu` / `temu` reshaping by direct `startsWith()` / `slice()` string surgery inside `realizeDerivedMuStemInteraction()`.
- `buildDerivedMuStemInteractionSourceFrame()` represents the original object slot, original `tronco`, derived-prefix gate, and alternate form source frames. `buildDerivedMuStemInteractionOperationFrame()` consumes that frame and emits the `andrews-derived-mu-stem-interaction-operation-frame` with target object/stem slots and alternate target frames.
- `applyMorphologyRules()` builds the typed source and operation frames from source slots before calling `realizeDerivedMuStemInteraction()`, and the executor consumes only the operation target frame before mutating the live object/stem/alternate payload.
- Direct legacy calls without typed operation frames, missing operation frames, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the derived `mu` interaction route.

## Completed Phase: Surface Chain Render Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live surface-chain render route no longer authorizes final joined output by directly mapping segment values and joining strings inside `joinSurfaceChain()`.
- `buildSurfaceChainRenderSourceFrame()` represents the segment roles, slots, values, and final render target. `buildSurfaceChainRenderOperationFrame()` consumes that frame and emits the `andrews-surface-chain-render-operation-frame`.
- `buildSurfaceChainState()` and surface-chain mutation helpers attach/refresh the typed render operation frame from structured segment state; `joinSurfaceChain()` consumes the typed render frame and blocks when the render frame is missing or stale against the current segment records.
- Direct segment-only chains without a render operation frame, stale render frames after manual segment mutation, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the render result.

## Completed Phase: Optional Parenthetical Forms Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live generation/display route for optional parenthetical forms no longer authorizes active output variants by directly regex-expanding `(...)` inside `expandOptionalParentheticalForms()`.
- `buildOptionalParentheticalFormsSourceFrame()` represents the source forms, optional marker frames, and structured source segment frames. `buildOptionalParentheticalFormsOperationFrame()` consumes that source frame and emits the `andrews-optional-parenthetical-forms-operation-frame` with target variants.
- `formatConjugationDisplay()` and `executeNuclearClauseSurfaceRequest()` now build typed optional-parenthetical frames before expanding variants; the live generation route passes output-surface segment records into the source frame instead of using rendered slash/display strings as authority.
- Direct parenthetical calls without frames, missing operation frames, contradictory target frames, stale source forms, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter optional-parenthetical variants.

## Completed Phase: Generated Nominal Formula Render Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected generated nominal formula-pair route no longer authorizes target formula echoes by directly joining stem pieces into `#...(...)...#` inside `buildGeneratedNominalFormulaFromSurfacePath()`.
- `buildGeneratedNominalFormulaSourceFrame()` represents the structured CNV surface path slots, segment frames, subject slots, predicate/object/connector pieces, nominal family, and preterit-agentive state. `buildGeneratedNominalFormulaOperationFrame()` consumes that source frame and emits the `generated-nominal-formula-render` typed operation frame with the target formula frame.
- `buildGeneratedNominalFormulaSurfacePairs()` now creates the source/operation frames from `cnvFormulaSurfacePath` records before rendering source-to-target formula pairs. The direct helper without frames returns an empty formula and cannot authorize a generated nominal formula.
- Missing operation frames, contradictory target frames, changed structured path/source frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter generated nominal formula rendering.

## Completed Phase: Generated Result Text Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live generation result payload no longer authorizes the top-level `result` text by directly joining `forms` with `" / "` inside `executeNuclearClauseSurfaceRequest()`.
- `buildGeneratedOutputResultTextSourceFrame()` represents generated output surface records and their structured segment frames. `buildGeneratedOutputResultTextOperationFrame()` consumes that source frame and emits the `generated-output-result-text-render` typed operation frame with target surface forms and result text.
- `executeNuclearClauseSurfaceRequest()` now builds and carries the typed source/operation frames before rendering the display-only `result` string; direct result-text helper calls without frames return empty.
- Missing output surface records, missing operation frames, contradictory target frames, changed record/form order, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter generated result text.

## Completed Phase: Lesson 32 Pil NNC-Side Result Text Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected ordinary NNC output-set route for Andrews p.294 `pil` NNC-side rows no longer authorizes the top-level result text by directly joining surface strings from generated entries.
- `buildLesson32PilChildNncSideResultTextSourceFrame()` represents canonical formula-realization records and their segment frames from `buildLesson32PilChildNncSideFormulaSurfacePairs()`. `buildLesson32PilChildNncSideResultTextOperationFrame()` consumes that source frame and emits a `lesson-32-pil-child-nnc-side-result-text-render` typed operation frame.
- `buildLesson32PilChildNncSideFormulaSurfacePairs()` now derives row surfaces from structured segment frames before rendering pair display fields, so stale entry surfaces and poisoned pair display strings cannot become result authority.
- Direct result-text helper calls without source/operation frames, missing target frames, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` fields cannot authorize or alter the Lesson 32 result text.

## Completed Phase: Ordinary NNC Segment-Derived Result Text Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live ordinary NNC segment-derived output routes no longer authorize top-level `result` by directly joining `resolvedSurfaceForms`.
- `buildOrdinaryNncResultTextSourceFrame()` represents canonical ordinary NNC formula-realization records whose segment frames fully derive the surface. `buildOrdinaryNncResultTextOperationFrame()` consumes that source frame and emits an `ordinary-nnc-result-text-render` typed operation frame.
- `generateOrdinaryNncParadigm()` now carries the typed result-text source/operation frames for segment-derived ordinary NNC outputs before rendering display-only `result`; if that selected typed route is supported but its operation frame does not validate, the route blocks instead of falling back to a slash join.
- Absolutive singular output now builds an `ordinary-nnc-absolutive-singular-source-frame` from the structural predicate stem and noun-class frame, consumes an `ordinary-nnc-absolutive-singular-realization` typed operation frame, and passes predicate plus number-connector segment frames into the result-text source frame instead of letting fixture `surfaceForms` choose the target.
- Animate singular subject-prefixed output now builds an `ordinary-nnc-animate-subject-prefix-source-frame` from the prior typed absolutive-singular target frame plus the structural subject frame, consumes an `ordinary-nnc-animate-subject-prefix-realization` typed operation frame, and passes subject/predicate segment frames into the result-text source frame.
- Animate possessive singular subject-prefixed output now builds an `ordinary-nnc-animate-subject-prefix-source-frame` from the prior typed open-stem possessive target frame plus the structural subject frame, consumes an `ordinary-nnc-animate-subject-prefix-realization` typed operation frame, and passes subject plus prior possessive segment frames into the result-text source frame instead of letting fixture possessive `surfaceForms` choose the target.
- Animate count-plural output now builds an `ordinary-nnc-animate-count-plural-source-frame` from the authorized singular source form plus the structural subject frame, consumes an `ordinary-nnc-animate-count-plural-realization` typed operation frame, and passes subject, predicate, and `met` number-connector segment frames into the result-text source frame.
- Animate possessive count-plural output now builds an `ordinary-nnc-animate-possessive-count-plural-source-frame` from the structural predicate stem, possessor frame, and subject frame, consumes an `ordinary-nnc-animate-possessive-count-plural-realization` typed operation frame, and passes subject, possessor, predicate, and possessive-plural segment frames into the result-text source frame.
- Animate possessive plural output with a singular possessor and distributive plural request now builds an `ordinary-nnc-animate-possessive-plural-identity-source-frame` from the structural predicate stem, possessor frame, and prior typed `ordinary-nnc-open-stem-possessive-realization` target frame, consumes an `ordinary-nnc-animate-possessive-plural-identity` typed operation frame, and passes the prior possessive segment frames into the result-text source frame; string-only animate possessive plural helper calls and contradictory prior frames block.
- Nonanimate possessive distributive output now builds an `ordinary-nnc-nonanimate-possessive-distributive-source-frame` from either the structural zero-class predicate stem or a structured fixture `possessiveStem` plus possessor frame, consumes an `ordinary-nnc-nonanimate-possessive-distributive-realization` typed operation frame, and passes possessor and reduplicated-predicate segment frames into the result-text source frame.
- Nonanimate distributive plural output now builds an `ordinary-nnc-distributive-reduplication-source-frame` from the prior typed `ordinary-nnc-absolutive-singular-source-frame` plus `ordinary-nnc-absolutive-singular-realization` target frame, consumes an `ordinary-nnc-distributive-reduplication` typed operation frame, and passes the resulting segment frame into the result-text source frame; string-only source-surface calls and contradictory prior frames block.
- Animate absolutive distributive output now builds an `ordinary-nnc-animate-distributive-source-frame` from the structural predicate stem and subject frame, consumes an `ordinary-nnc-animate-distributive-realization` typed operation frame, and passes subject, predicate, and number-connector segment frames into the result-text source frame.
- Possessive animate distributive output for plural possessors now builds an `ordinary-nnc-possessive-distributive-source-frame` from the structural predicate stem and possessor frame, consumes an `ordinary-nnc-possessive-distributive-realization` typed operation frame, and passes the resulting segment frames into the result-text source frame.
- Possessive animate distributive output with an explicit animate subject now builds an `ordinary-nnc-animate-subject-prefix-source-frame` from the prior typed possessive-distributive target frame plus the structural subject frame, consumes an `ordinary-nnc-animate-subject-prefix-realization` typed operation frame, and passes subject plus prior typed target segment frames into the result-text source frame.
- Open-stem possessive singular output and the Andrews 39.3.4 organic-possession surface handoff now build an `ordinary-nnc-open-stem-possessive-source-frame` from the structural/prior-typed predicate stem and possessor frame, consume an `ordinary-nnc-open-stem-possessive-realization` typed operation frame, and pass possessor/predicate segment frames into the result-text source frame.
- Structured fixture possessive singular output with a static `possessiveStem` now builds an `ordinary-nnc-open-stem-possessive-source-frame` from that structured possessive predicate stem plus the Andrews formula stem and possessor frame, consumes an `ordinary-nnc-open-stem-possessive-realization` typed operation frame, and passes possessor/predicate segment frames into the result-text source frame instead of letting fixture `surfaceForms` choose the target.
- Zero-class fixture possessive singular output now uses the same `ordinary-nnc-open-stem-possessive-source-frame` from the Andrews formula stem plus possessor frame when the fixture has a possessive state cell, so fixture `surfaceForms` cannot choose `nukal`.
- Direct result-text helper calls without source/operation frames, direct old `buildOrdinaryNncReduplicatedSurface()`, `buildOrdinaryNncAnimatePossessivePluralForms()`, `buildOrdinaryNncPossessiveDistributiveSurface()`, `buildOrdinaryNncPossessiveDistributiveSurfaceResult()`, `buildOrdinaryNncOpenStemPossessiveSurface()`, and no-frame or legacy-allow animate `applyOrdinaryNncSubjectPrefixResult()` string calls, missing structured source frames, missing structured `possessiveStem` for nonzero nonanimate possessive distributives and structured fixture possessives, missing target frames, contradictory target frames, stale realization frames, monkeypatched legacy surface helpers, monkeypatched animate possessive plural helper, monkeypatched subject-prefix string helpers on animate singular/count plural, animate possessive singular, animate possessive distributive, and possessive count plural, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` fields cannot authorize or alter the selected absolutive singular, animate subject-prefixed singular, animate possessive subject-prefixed singular, animate count-plural, animate possessive count-plural, animate possessive singular-possessor distributive plural, nonanimate distributive, nonanimate possessive distributive, zero-class fixture possessive singular, structured fixture possessive singular, animate absolutive distributive, possessive animate distributive, open-stem possessive singular, or organic-possession surface result text.

## Completed Phase: Surface Chain Final IA/UA Trim Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for final `ia` / `ua` stem-vowel trimming no longer authorizes the target `tronco` by checking `endsWithAny(tronco, IA_UA_SUFFIXES)` and slicing the current segment string inside `realizeSurfaceChainFinalIAUATrim()`.
- `buildSurfaceChainFinalIAUATrimSourceFrame()` represents the original `tronco`, requested surface rule, source suffix, removed letter, and target stem; `buildSurfaceChainFinalIAUATrimOperationFrame()` consumes that frame and emits the `andrews-surface-chain-final-ia-ua-trim-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainFinalIAUATrim()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the `tronco` segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the trim.

## Completed Phase: Surface Chain Object-I Stem-I Elision Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for object-prefix final `i` plus stem-initial `i` no longer authorizes the target `tronco` by checking `obj1.endsWith("i")`, `tronco.startsWith("i")`, and slicing the current stem string inside `realizeSurfaceChainObjectIInitialElision()`.
- `buildSurfaceChainObjectIInitialElisionSourceFrame()` represents the original object prefix, original `tronco`, requested surface rule, source boundary letters, and target stem; `buildSurfaceChainObjectIInitialElisionOperationFrame()` consumes that frame and emits the `andrews-surface-chain-object-i-initial-elision-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainObjectIInitialElision()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the `tronco` segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the elision.

## Completed Phase: Surface Chain Mu-Iskalia Reduction Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live output-surface route for `mu` plus `iskalia` no longer authorizes the target `tronco` by checking `tronco.startsWith("iskalia")` and replacing the current stem string inside `realizeSurfaceChainMuIskaliaReduction()`.
- `buildSurfaceChainMuIskaliaReductionSourceFrame()` represents the original object prefix, original `tronco`, requested surface rule, source initial letter, and target stem; `buildSurfaceChainMuIskaliaReductionOperationFrame()` consumes that frame and emits the `andrews-surface-chain-mu-iskalia-reduction-operation-frame`.
- `buildSurfaceChainState()` builds the typed frame from source slot input before realization; `realizeSurfaceChainMuIskaliaReduction()` consumes the operation frame directly and passes it through output-surface source/target/orthography contracts as `surfaceOperationFrames`.
- Direct legacy chains without typed operation frames, missing operation frames, stale source-frame reuse after the `tronco` segment changes, contradictory target frames, and poisoned `surface` / `result` / `surfaceForms` / `formulaEcho` strings cannot authorize or alter the reduction.

## Completed Phase: Serial Stem Dash Collapse Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected current-regex source route for serial stem dash inputs such as `(nemi-a-wi)` no longer authorizes the collapsed matrix base by direct regex matching and string concatenation inside `collapseSerialStemDashInput()`.
- `buildSerialStemDashSourceFrame()` now represents the original input, head/tail boundary, root, source suffix segments, target suffix, target input, and route operation. `buildSerialStemDashOperationFrame()` consumes that source frame and carries the target input through an `andrews-serial-stem-dash-collapse` typed operation frame.
- Current parser/source-model/search callers use `collapseSerialStemDashInputFromSourceFrame()`, while direct string-only calls to `collapseSerialStemDashInput("nemi-a-wi")` return the uncollapsed input and cannot authorize `nemiawi`.
- Changed request frames and contradictory target operation frames block the collapse route; display strings remain outside this route's authority.

## Completed Phase: Patientivo Intransitive Final-Cluster Iwi/Awi Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo routes for final-cluster `-iwi` and `-awi` root-stock stems no longer authorize target stems by trimming the suffix, recovering a vowel with string conditionals, appending variant consonants, and adding mirrors inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents the final-cluster `iwi` / `awi` right-edge structure, source/gate suffix, source core, recovered target vowel, target stem, allowed variant consonants for `awi`, and the route support gate. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits recovered route targets, tli-class targets, and `awi` variant/full-mirror targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for live `(ijsiwi)` and `(ishtawi)` style routes before adding `ijsi`, `ijsit`, `ishta`, `ishtat`, `ishtak`, `ishtach`, `ishtas`, `ishtash`, and `ishtawit`; structurally authorized consonant+tli targets remain filtered by the existing series-mirror gate.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter these final-cluster routes.

## Completed Phase: Patientivo Intransitive Plain-Wi Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for multisyllable plain `-wi` root-stock stems no longer authorizes target stems by directly slicing `base.slice(0, -2)`, appending `k/ch/s/sh`, and reducing a final core vowel for the tli-class target inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents the plain-`wi` right-edge structure, source/gate suffix, source core, allowed Nawat/Pipil orthography-bridge variant consonants, and the route support gate. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits route-only variant targets, their tli-class targets, and the reduced-core tli-class target.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(tepewi)` style route before adding `tepek`, `tepech`, `tepes`, `tepesh`, and `tepti`; the structurally authorized consonant+tli targets remain filtered by the existing series-mirror gate.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this plain-`wi` route.

## Completed Phase: Patientivo Intransitive Awi-Family Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for non-final-cluster `-awi` family root-stock stems no longer authorizes target stems by directly trimming `awi`, appending `a + k/ch/s/sh`, and adding `t` mirrors from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents the `awi` right-edge structure, source/gate suffix, source core, allowed Nawat/Pipil orthography-bridge variant consonants, and the route support gate. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits the route target, tli-class target, `a + consonant` variants with their tli-class targets, the `a + t` mirror, and the full-`awi + t` mirror.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(nemawi)` style route before adding `nem`, `nemti`, `nemak`, `nemach`, `nemas`, `nemash`, `nemat`, and `nemawit`; the structurally authorized consonant+tli targets remain filtered by the existing series-mirror gate.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this `awi` family route.

## Completed Phase: Patientivo Intransitive Iwi-Family Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for non-short `-iwi` family root-stock stems no longer authorizes target stems by directly trimming `iwi` from the surface base and passing the result through raw/tli-class string helpers inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents the `iwi` right-edge structure, source/gate suffix, source core, target stem, and route support gate. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits the route target plus the tli-class target.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(tekiwi)` style route before adding `tek` and `tekti`.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this `iwi` family route.

## Completed Phase: Patientivo Intransitive Short-Wi Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for short open-core `-wi` superposition stems no longer authorizes target stems by directly slicing `base.slice(0, -2)`, appending `k`, and adding a t-class mirror from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents the short-`wi` right-edge structure, one-syllable open source/gate core, source suffix, and allowed `k` variant. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits the `k` route target, its tli-class connector target, and the t-class mirror target.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(chiwi)` style route before adding `chik` and `chit`; display-only `chikti` is structurally authorized but remains filtered by the existing series-mirror gate.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this short-`wi` route.

## Completed Phase: Patientivo Intransitive Productive-Ka Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for intransitive productive `-ka` root-stock stems no longer authorizes target route stems by directly slicing `base.slice(0, -2)` and appending `k/ch/j` from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents productive `-ka` right-edge structure, reduplication / Vj eligibility, source core, and allowed variant consonants. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits route-only stems plus tli-class targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(chuchuka)` style route before adding `chuchuk`, `chuchukti`, `chuchuch`, `chuchuchti`, `chuchuj`, and `chuchujti`.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this productive-`ka` root-stock route.

## Completed Phase: Patientivo Intransitive Productive-Ya Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for intransitive productive `-ya` / `-tiya` root-stock stems no longer authorizes target route stems by directly slicing `base`, replacing `ya` with `l`, or deleting `tiya` from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents productive `-ya` and `-tiya` right-edge structure, source core, target stem, and replacement segment. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits route-only stems plus tli-class targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for live `(istaya)` and `(matiya)` style routes before adding `istal`, `istalti`, `ma`, and `mat`.
- Display-string poisoning does not change source suffix/syllable analysis, and missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this productive-`ya` root-stock route.

## Completed Phase: Patientivo Intransitive Productive-Ki Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for intransitive productive `-ki` root-stock stems no longer authorizes target route stems by directly slicing `base.slice(0, -2)`, appending `k/ch/j`, and adding the `waki -> was` special variant from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents productive `-ki` right-edge structure, CV-ki shape, source core, the `j` additional variant, and the `waki`-only `s` variant gate. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits route-only stems plus tli-class targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(waki)` style route before adding `wak`, `wakti`, `wach`, `wachti`, `waj`, `wajti`, `was`, and `wasti`.
- Missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this productive-`ki` root-stock route.

## Completed Phase: Patientivo Intransitive Plain-Wa Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for intransitive plain `-wa` root-stock stems no longer authorizes target route stems by directly slicing `base.slice(0, -2)`, appending `k/ch/s/sh`, and adding the t-class core from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents plain `-wa` right-edge structure, source core, gate core, allowed Nawat/Pipil orthography-bridge variant consonants, and the Andrews root-stock route operation. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits route-only stems plus tli-class targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(chipawa)` style route before adding `chipak`, `chipach`, `chipas`, `chipash`, and `chipat`.
- Missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this plain-`wa` root-stock route.

## Completed Phase: Patientivo Intransitive Productive-N Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for intransitive productive `-ni` / `-na` root-stock stems no longer authorizes target route stems by directly slicing `base.slice(0, -2)`, appending `k/ch/s/sh`, and adding t-class connectors from suffix-family strings inside the option builder.
- `buildPatientivoRootStockStemSourceFrame()` now represents productive `-ni` / `-na` right-edge structure, the source core, allowed Nawat/Pipil orthography-bridge variant consonants, and the Andrews root-stock route operation. `buildPatientivoRootStockStemOperationFrame()` consumes that frame and emits the target route stems plus locked tli-class targets.
- `buildPatientivoTroncoDerivations()` consumes the typed operation frame for the live `(pusuni)` style route before adding `pusuk`, `pusukti`, `pusuch`, `pusuchti`, `pusus`, `pususti`, `pusush`, `pusushti`, and `pusut`.
- Missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter this productive-N root-stock route.

## Completed Phase: Patientivo Transitive Root-Stock Stem Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected live `tronco-verbal` patientivo route for transitive `-lua` stems no longer authorizes the target route stem by directly slicing the surface base with `base.slice(0, -2)` inside the option builder.
- `buildPatientivoTroncoDerivations()` now builds a `patientivo-root-stock-stem-source-frame` for the source stem, gate stem, transitivity, right-edge suffix frame, and source stem spec, then consumes an `andrews-patientivo-root-stock-stem-realization` typed operation frame before appending the route entry.
- The target entry carries the root-stock source contract, source frame, operation frame, and target frame through `buildPatientivoDerivationEntry()`; display surfaces and the later `sal / salti` expansion are rendered after structural authorization.
- Missing source frames, missing operation frames, changed caller strings, contradictory target frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter the typed transitive root-stock route.

## Completed Phase: Intransitive Type-One Stem Typed Operation Gate

Date: 2026-07-05

Decision:

- `buildIntransitiveTypeOneStem()` no longer decides type-one target stems from direct `baseStem.endsWith(...)` string calls.
- Type-one stem realization now requires an `intransitive-type-one-source-frame` and matching `andrews-intransitive-type-one-stem-realization` typed operation frame. `buildIntransitiveTypeOneMorphStemSpec()` constructs and carries those frames, and `realizeMorphStemSpec()` consumes them before returning the stem.
- Direct string-only calls, missing operation frames, contradictory source/target frames, and changed caller stems cannot authorize or alter the structurally framed type-one output.

## Completed Phase: Root-Plus-Ya Adjectival NNC Typed Operation Gate

Date: 2026-07-05

Decision:

- `generateRootPlusYaAdjectivalNncOutput()` no longer authorizes Andrews 40.9 output from a direct `stem` string and no longer decides the visible `k` connector by concatenating `subjectPrefix + rootPlusYaBase + "k"`.
- Andrews 40.9 root-plus-ya adjectival NNC generation now requires a `root-plus-ya-adjectival-nnc-source-frame` plus a matching `andrews-40-9-root-plus-ya-adjectival-nnc-realization` typed operation frame. The live adjectival generation branch and CNV/CNN audit probes build and pass those frames before rendering.
- Direct string-only calls, missing operation frames, contradictory source/target frames, poisoned caller stems, and target-surface mutations cannot authorize or alter the structurally framed root-plus-ya output.

## Completed Phase: Intensified Adjectival NNC Segment-Frame Output Gate

Date: 2026-07-05

Decision:

- `buildIntensifiedAdjectivalNncOutput()` no longer renders Andrews 41.1 output by recomputing `subjectPrefix + intensifiedStem + connector` from formula-slot strings after checking metadata.
- The `andrews-41-1-intensified-adjectival-reduplication` typed operation frame now carries target segment frames and target surface. The executor consumes those operation-frame targets directly before rendering `result`, `surfaceForms`, and `formulaEcho`.
- Missing source frames, missing operation frames, contradictory source/target frames, poisoned display strings, changed caller formula slots, monkeypatched legacy reduplication, and target-surface mutations cannot authorize or alter the structurally framed intensified output.

## Completed Phase: Morph-Stem Append Typed Operation Gate

Date: 2026-07-05

Decision:

- The append branch of `realizeMorphStemSpec()` no longer decides its target stem by returning `sourceStem + appendText` from transform-spec strings.
- Append morph-stem realization now requires a `morph-stem-append-source-frame` plus matching `andrews-morph-stem-append-realization` typed operation frame. `buildAppendMorphStemSpec()` carries those frames, and `realizeMorphStemSpec()` consumes the operation frame before returning the appended stem.
- Hand-built legacy append specs, missing operation frames, contradictory source frames, changed caller source stems, and target-segment/target-stem contradictions cannot authorize or alter appended morph-stem output.

## Completed Phase: Morph-Stem Prepend Typed Operation Gate

Date: 2026-07-05

Decision:

- The prepend branch of `realizeMorphStemSpec()` no longer decides its target stem by returning `prependText + sourceStem` from transform-spec strings.
- Prepend morph-stem realization now requires a `morph-stem-prepend-source-frame` plus matching `andrews-morph-stem-prepend-realization` typed operation frame. `buildPrependMorphStemSpec()` carries those frames, and `realizeMorphStemSpec()` consumes the operation frame before returning the prepended stem.
- Hand-built legacy prepend specs, missing operation frames, contradictory source frames, changed caller source stems, and target-segment/target-stem contradictions cannot authorize or alter prepended morph-stem output.

## Completed Phase: Morph-Stem Replace-Suffix Typed Operation Gate

Date: 2026-07-05

Decision:

- The replace-suffix branch of `realizeMorphStemSpec()` no longer decides its target stem by slicing `sourceStem` / `sourceSuffix` and appending `replacement` from transform-spec strings.
- Replace-suffix morph-stem realization now requires a `morph-stem-replace-suffix-source-frame` plus matching `andrews-morph-stem-replace-suffix-realization` typed operation frame. `buildReplaceSuffixMorphStemSpec()` carries those frames, and `realizeMorphStemSpec()` consumes the operation frame before returning the replaced stem.
- Hand-built legacy replace-suffix specs, missing operation frames, contradictory source frames, changed caller source stems, and target-segment/target-stem contradictions cannot authorize or alter replaced morph-stem output.

## Completed Phase: Morph-Stem Strip-Prefix Typed Operation Gate

Date: 2026-07-05

Decision:

- The strip-prefix branch of `realizeMorphStemSpec()` no longer decides its target stem by checking `sourceStem.startsWith(prefix)` and slicing from transform-spec strings.
- Strip-prefix morph-stem realization now requires a `morph-stem-strip-prefix-source-frame` plus matching `andrews-morph-stem-strip-prefix-realization` typed operation frame. `buildStripPrefixMorphStemSpec()` carries those frames, and `realizeMorphStemSpec()` consumes the operation frame before returning the stripped stem.
- Hand-built legacy strip-prefix specs, missing operation frames, contradictory source frames, changed caller source stems, and target-segment/target-stem contradictions cannot authorize or alter stripped morph-stem output.

## Completed Phase: Morph-Stem Deletion-Shift Typed Operation Gate

Date: 2026-07-05

Decision:

- The deletion-shift branch of `realizeMorphStemSpec()` no longer decides its target stem by branching over `deletionVariant` and slicing/mutating the source stem from transform-spec strings.
- Deletion-shift morph-stem realization now requires a `morph-stem-deletion-shift-source-frame` plus matching `andrews-morph-stem-deletion-shift-realization` typed operation frame. `buildDeletionShiftMorphStemSpec()` carries those frames, and `realizeMorphStemSpec()` consumes the operation frame before returning the shifted stem.
- Hand-built legacy deletion-shift specs, missing operation frames, contradictory source frames, changed caller source stems, and target-segment/target-stem contradictions cannot authorize or alter shifted morph-stem output.

## Completed Phase: CNV-to-CNN Operational Suboperation Typed Operation Gate

Date: 2026-07-05

Decision:

- The Andrews CNV-to-CNN operational suboperation path no longer lets `executeAndrewsCnvCnnOperationalHandler()` decide target stems by direct string suffixing such as `ni`, `ka`, `s`, `liz`, `yo`, `yan`, or `kan`, then scrub formula text into a surface.
- `buildAndrewsCnvCnnOperationalSuboperationFrame()` now requires an `andrews-cnv-cnn-operational-source-frame` plus matching `andrews-cnv-cnn-operational-suboperation-realization` typed operation frame before it reports generated output. The live verb-derived nominalization profile path builds and passes those frames before rendering `surface`, `surfaceForms`, and formula echoes.
- Direct string-only suboperation calls, missing operation frames, contradictory source/target frames, poisoned `sourceStem` / `sourceCore` / `formulaEcho` / `result` / `surface` strings, and monkeypatched legacy surface realization cannot authorize or alter the structurally framed output.

## Completed Phase: Lesson 46.3.1.a Relational Locative Typed Operation Gate

Date: 2026-07-05

Decision:

- The scoped Andrews 46.3.1.a preterit-agentive locative relational NNC route no longer derives `michnamakakan` by parsing `source`, `sourceVerb`, `incorporatedNounStem`, visible `posicionesFormula.tronco`, or formula text and flattening hyphenated strings.
- `buildLesson46PreteritAgentiveLocativeNncFromSource()` now requires a `lesson-46-3-1-a-preterit-agentive-locative-source-frame` and matching `andrews-46-3-1-a-preterit-agentive-locative-realization` typed operation frame. The executor reads source identity, predicate stem, formula slots, formula echo, target segment frames, and surface from those frames before rendering output fields.
- Direct string-only source formulas, the visible locativo tab without typed frames, missing operation frames, contradictory source/target frames, poisoned caller strings, and monkeypatched formula-flattening cannot authorize or alter the structurally framed route.

## Completed Phase: Monadic Possessive-State Workbench Typed Operation Gate

Date: 2026-07-05

Decision:

- The monadic possessive-state NNC workbench example no longer marks itself generated by concatenating `possessiveState.surface + stem`.
- `buildPossessiveStateNncFormulaWorkbenchExample()` now requires a `possessive-state-nnc-monadic-source-frame` and matching `possessive-state-nnc-monadic-realization` typed operation frame before a monadic example can surface.
- Direct string-only monadic calls block; missing operation frames, contradictory source/target frames, and changed display stem/possessor strings cannot authorize or alter the structurally framed monadic output.

## Completed Phase: Organic Possession Typed Operation Gate

Date: 2026-07-05

Decision:

- The Andrews 39.3.4 ordinary NNC organic-possession route no longer derives the target predicate stem by appending `yu` to a direct `stem` string.
- `generateOrdinaryNncParadigm()` now requires ordinary NNC formula slots for this route, builds an `ordinary-nnc-organic-possession-source-frame`, consumes an `ordinary-nnc-organic-possession-yu-realization` typed operation frame, and only then renders the possessive-state surface.
- Direct stem-only requests block with `ordinary-nnc-organic-possession-missing-source-frame`; missing operation calls return no target; contradictory source/target frames block; changing caller `stem` strings or monkeypatching the old stem helper cannot alter the structurally authorized output.

## Completed Phase: CNV Lesson 7 Surface Slot Typed Operation Gate

Date: 2026-07-04

Decision:

- The public `getCnvFormulaLesson7SurfaceSlots()` resolver is no longer a direct string-recovery API. It now requires a `cnv-formula-lesson-7-surface-slots-source-frame` and matching `cnv-formula-lesson-7-surface-slot-realization` typed operation frame before it returns surface slots.
- The live `cnvFormulaSurfacePath` record builder constructs those source and operation frames for each generated surface path and consumes the operation target slots before building visible path records.
- Focused VNC coverage asserts the new helper/frame APIs, direct string-only blocking, missing-operation blocking, contradictory source/target blocking, and immunity to changed caller strings/formula slots after a typed frame has authorized the target.

## Completed Phase: Andrews Formula Generation Authority Contract

Date: 2026-07-04

Decision:

- The shared Andrews formula schema now has an executable generation-authority evaluator. It combines the Andrews logic-authority policy, the formula schema generation contract, and required source slots, then returns the gate/status that says whether Andrews formula logic licensed generation.
- Ordinary and possessive NNC formula workbench slices now expose that formula-authority gate separately from the Nawat/Pipil realization result. The surface still comes from the existing realization path, but the grammar permission is no longer only an Andrews-looking echo or metadata pass-through.
- The live ordinary NNC route `generateOrdinaryNncParadigm()` now consumes supplied Andrews `formulaSlots` / route-contract formula slots before rendering. Formula-looking strings such as `(siwa)t` are blocked from authorizing or inferring grammar by themselves, and conflicting legacy strings cannot override structural slots.
- Focused grammar/NNC tests assert the authorized and blocked formula gates, Andrews logic authority, Nawat/Pipil orthography authority, spelling-evidence role, Classical surface-import block, and hostile legacy-string behavior.

## Completed Phase: Andrews Route Board Surface Candidate Gate

Date: 2026-07-04

Decision:

- The live route-board entry function `getAndrewsCnvCnnRouteStageFromFormulaInput()` now marks surface-looking inputs such as `nimana`, `metzmati`, and `nukal` with a route-authorization frame.
- Surface candidates remain visible as diagnostics, but `buildAndrewsCnvCnnRouteBoard()` no longer lets them infer source candidates, departures, route options, or continuations unless the caller supplies an Andrews structural source frame, formula slots, or route contract that matches the candidate formula type.
- Hostile clause coverage now proves a bare surface candidate has zero route candidates, while the same surface with a matching structural source frame can expose the Andrews route candidates.

## Completed Phase: Andrews Route Action Record Authority Gate

Date: 2026-07-04

Decision:

- The live route-action entry function `inferAndrewsCnvCnnBackAndForthRouteRecordId()` no longer maps route-family strings, route-template strings, dataset booleans, or target-tense labels into Andrews route record ids.
- Route action contracts can still use explicit Andrews route record ids and embedded structural route/action frames. Generated denominal rows now carry the Andrews route coordinate frame from the denominal family profile before route-action metadata is rendered.
- Hostile clause coverage proves template-only, family-only, and dataset-only route chips cannot infer or build an action contract, while explicit route ids and structural route frames still authorize the contract.

## Completed Phase: Denominal Route Verbalized Source Frame Gate

Date: 2026-07-04

Decision:

- The live route-family preview path `resolveNawatRouteVerbalizedVerb()` now resolves target verbstems from a structured verbalized-source frame.
- Explicit `sourceStem` and generated patientivo-tronco source frames can authorize the verbalized target; finite route surfaces, configured surface suffixes, `verbalizer+k` text, and parsed source strings can no longer be stripped or appended into a target verbstem.
- Linked denominal stage previews pass selected-stage source evidence (`sourceBaseStem` / `sourceVerbStem`) into the next route preview as structural source-stem input, so continuation chains remain composable without reactivating finite-surface suffix inference.
- Hostile state coverage proves a poisoned verbalizer route with a plausible finite surface suffix cannot infer `targetVerb`, while the same route with an explicit source stem can still authorize structurally.

## Completed Phase: Ordinary NNC Formula String Parser Quarantine

Date: 2026-07-04

Decision:

- `parseOrdinaryNncPredicateFormulaInput()` is now diagnostic-only by default. It returns a blocked diagnostic frame unless the caller explicitly asks for diagnostic parsing.
- Ordinary NNC paradigm sets, formula workbench normalization, subject-number connector workbench normalization, and fixture resolution no longer infer stems or noun classes from formula-looking strings such as `(siwa)t`.
- The live ordinary NNC generation path may still use diagnostic parsing to explain a legacy formula-string conflict, but formula generation authority remains with structural `formulaSlots` / route-contract slots.
- Patientivo, active-action, preterit-agentive, and customary-agentive nominal-compound continuation contracts now pass ordinary NNC continuation requests as structural formula slots / route contracts. Their parenthesized `ordinaryNncInput` strings remain display artifacts only.
- Hostile NNC coverage proves blocked parser output, opt-in diagnostic parsing, blocked paradigm-set inference, blocked fixture lookup, authorized structural slots, and poisoned conflicting slots.
- Hostile derivation coverage proves a lying continuation request `stem` string cannot change the nominal-compound ordinary NNC output when the structural formula slots remain unchanged.

## Completed Phase: Patientivo Compound Embed Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 39.6 patientivo verbal compound route now builds its target through a typed operation frame: generated patientive nounstem source frame + verbal matrix frame + target CNV stem frame.
- `buildPatientivoCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `(tamati/miki)` for display, but the executable `compoundRequest` uses the typed operation frame and target stem `tamatimiki`.
- The VNC executor consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; a poisoned `tronco` string or poisoned display `compoundVerbInput` cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior.

## Completed Phase: Active-Action Compound Embed Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 37.5.4 active-action verbal compound route now builds its target through a typed operation frame: generated active-action nounstem source frame + verbal matrix frame + target CNV stem frame.
- `buildActiveActionCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `(chukilis/tzajtzi)` for display, but the executable `compoundRequest` uses the typed operation frame and target stem `chukilistzajtzi`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior for the active-action compound route.

## Completed Phase: Customary-Agentive Compound Embed Typed Operation Gate

Date: 2026-07-04; tightened 2026-07-06

Decision:

- The live Andrews 36.3 customary-agentive verbal compound route now builds its target through a typed operation frame: generated customary-agentive nounstem source frame + verbal matrix frame + target CNV stem frame.
- The renderer now selects the customary-agentive source from the generated-output typed continuation frame, the continuation contract derives the embedded stem from that predicate slot, and the target CNV frame carries the matrix root, object prefix, compound input mirror, and target stem.
- The composer now requires the typed target continuation frame before mutating the VNC entry board; string-only `customaryAgentiveStem` / `compoundVerbInput` payloads and contradictory display mirrors block instead of authorizing the next step.
- `buildCustomaryAgentiveCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `-(nemini/tuka)` for display, but the executable `compoundRequest` uses the typed operation frame, target stem `neminituka`, and structural object prefix `ki`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed source frames, missing typed target frames, missing typed operation frames, and contradictory source/matrix/target frames block instead of falling back to the old compound-string parser.
- Hostile derivation/UI coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing source/target/operation frames, contradictory target frames, and composer string-only blocking for the customary-agentive compound route.

## Completed Phase: Preterit-Agentive Compound Embed Typed Operation Gate

Date: 2026-07-04; tightened 2026-07-06

Decision:

- The live Andrews 35.7 preterit-agentive verbal compound route now builds its target through a typed operation frame: generated preterit-agentive general-use nounstem source frame + verbal matrix frame + target CNV stem frame.
- The renderer now passes a generated-output typed source continuation frame into the contract, the contract derives the general-use nounstem from that frame's predicate slot, and the target CNV continuation frame carries matrix root, target stem, object prefix, and display input mirrors.
- The composer now requires the preterit-agentive typed target continuation frame before mutating the verb entry board; string-only `preteritAgentiveStem` / `compoundVerbInput` payloads and contradictory display mirrors block instead of authorizing the next step.
- `buildPreteritAgentiveCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `(tamatka/tzajtzi)` for display, but the executable `compoundRequest` uses the typed operation frame and target stem `tamatkatzajtzi`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed source frames, missing typed target frames, missing typed operation frames, and contradictory source/matrix/target frames block instead of falling back to the old compound-string parser.
- Hostile derivation/UI coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing source/target/operation frames, contradictory target frames, and composer string-only blocking for the preterit-agentive compound route.

## Completed Phase: Preterit-Agentive Nominal Compound Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected Andrews 35.7 preterit-agentive `agentivo-preterito` -> ordinary NNC nominal-compound continuation no longer lets `preteritAgentiveStem`, `compoundStem`, or `ordinaryNncInput` display strings authorize the next NNC payload.
- `buildPreteritAgentiveNominalCompoundContinuationContract()` now requires a generated-output typed source continuation frame, derives the general-use nounstem from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target, and emits an `andrews-preterit-agentive-nominal-compound-operation-frame`.
- The ordinary NNC request for this route is built from that operation frame and carries formula slots/source/target operation frames; poisoning request `stem`, route target-frame mirrors, display `ordinaryNncInput`, or display `compoundStem` cannot change the generated NNC stem.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks preterit-agentive nominal compound entry without the typed target frame. String-only calls, missing source frames, contradictory display stems, unsupported nominal matrices, and contradictory target frames block.

## Completed Phase: Patientivo Characteristic-Property Embed Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 39.9 characteristic-property incorporated-object route now builds its target through a typed operation frame: generated characteristic-property source frame + verbal matrix frame + target CNV stem frame.
- `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` still exposes `compoundVerbInput` such as `-(mikka/chikawa)` for display, but the executable `compoundRequest` uses the typed operation frame, target stem `mikkachikawa`, and the structural outside object prefix (`ki` for absolutive, possessor-mapped prefixes such as `nech` for possessive).
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior for the characteristic-property embed route.

## Completed Phase: Patientivo Prelocative Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 39.7-39.8 patientivo prelocative/incorporated-root route now builds finite VNC output through a typed operation frame: generated patientive nounstem source frame + prelocative matrix frame + outside object transfer frame + target CNV stem frame.
- `buildPatientivoPrelocativeContinuationContract()` still exposes `prelocativeVerbInput` such as `-(tamati/tajtani)` for display, but the executable `prelocativeRequest` uses the typed operation frame, target stem `tamatitajtani`, and structural outside object prefixes such as `nech` or `metz`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `prelocativeVerbInput` strings cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old prelocative/compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior for the prelocative route.

## Completed Phase: Preterit-Agentive Ownerhood Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.9-35.10 preterit-agentive ownerhood route now builds finite VNC output through a typed operation frame: generated preterit-agentive general-use nounstem source frame + ownerhood matrix frame + typed parsed-target frame + target CNV stem frame.
- `buildPreteritAgentiveOwnerhoodContinuationContract()` still exposes `ownerhoodVerbInput` such as `(tamatka)-(wa)` for display, but the executable `ownerhoodRequest` uses the typed operation frame, target stem `tamatkawa`, and a structured parsed-target frame that carries the embed/matrix split without invoking the old parenthesized string parser.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display `ownerhoodVerbInput` strings, or a poisoned legacy ownerhood string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old ownerhood string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the preterit-agentive ownerhood route.

## Completed Phase: Preterit-Agentive Ownerhood Continuation Operation Gate

Date: 2026-07-06

Decision:

- The live Andrews 35.9-35.10 `agentivo-preterito` -> ownerhood CNV continuation now requires a generated-output typed source frame plus a typed target continuation frame before its ownerhood operation frame or composer handoff can proceed.
- `buildPreteritAgentiveOwnerhoodContinuationContract()` derives the general-use nounstem from the typed predicate slot in the source continuation frame, builds the target CNV frame from Andrews ownerhood matrix metadata, and exposes `ownerhoodVerbInput` only as display/audit text.
- The UI ownerhood continuation passes the typed source and target frames into the composer. Mirrored DOM dataset fields expose source variant and target-frame presence for audit, but they do not authorize mutation or dedupe.
- `applyPreteritAgentiveOwnerhoodRootsToVerbEntry()` blocks string-only payloads, contradictory display stems, contradictory display inputs, and mismatched source/target frames before changing composer state.
- Hostile derivation and UI coverage proves that missing typed source frames, lying display stems, contradictory target frames, and string-only composer calls cannot authorize the ownerhood route.

## Completed Phase: Ordinary-Noun Ownerhood Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.9-35.10 ordinary-noun ownerhood route now builds finite VNC output through a typed operation frame: ordinary nounstem source frame + noun-class frame + ownerhood matrix frame + typed parsed-target frame + target CNV stem frame.
- `buildOrdinaryNounOwnerhoodContinuationContract()` still exposes `ownerhoodVerbInput` such as `(shuchi)-(e)` or `(kal)-(wa)` for display, but the executable `ownerhoodRequest` uses the typed operation frame, target stems such as `shuchie` and `kalwa`, and a structured parsed-target frame that carries the embed/matrix split without invoking the old parenthesized string parser.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy ownerhood string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old ownerhood string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the ordinary-noun ownerhood route.

## Completed Phase: Ordinary-Noun Ownerhood Continuation Operation Gate

Date: 2026-07-06

Decision:

- The live ordinary NNC `#3 salida` -> ownerhood CNV continuation now requires a generated-output typed source frame with canonical formula/realization records plus noun-class metadata before its ownerhood operation frame or composer handoff can proceed.
- `buildOrdinaryNounOwnerhoodContinuationContract()` derives the nounstem from the typed predicate slot in the source continuation frame, derives the noun class from the same typed source payload, builds the ownerhood target CNV frame from Andrews matrix metadata, and exposes `ownerhoodVerbInput` only as display/audit text.
- The UI ordinary NNC ownerhood continuation passes typed source and target frames into the composer. Mirrored DOM dataset fields expose source variant and target-frame presence for audit, but they do not authorize mutation.
- `applyOrdinaryNounOwnerhoodRootsToVerbEntry()` blocks string-only payloads, contradictory display stems/classes/inputs, and mismatched source/target frames before changing composer state.
- Hostile derivation and UI coverage proves that missing typed source frames, lying display stems, contradictory target frames, and string-only composer calls cannot authorize the ownerhood route.

## Completed Phase: Preterit-Agentive Complement Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.12 preterit-agentive incorporated-complement route now builds finite VNC output through a typed operation frame: generated preterit-agentive general-use nounstem source frame + complement matrix frame + outside object frame + target CNV stem frame.
- `buildPreteritAgentiveComplementContinuationContract()` still exposes `complementVerbInput` such as `-(tamatka/mati)` for display, but the executable `complementRequest` uses the typed operation frame, target stem `tamatkamati`, and the structural object prefix `ki`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy complement string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old complement string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the complement route.

## Completed Phase: Preterit-Agentive Complement Continuation Operation Gate

Date: 2026-07-06

Decision:

- The live Andrews 35.12 `agentivo-preterito` -> incorporated-complement CNV continuation now requires a generated-output typed source frame plus a typed target continuation frame before its complement operation frame or composer handoff can proceed.
- `buildPreteritAgentiveComplementContinuationContract()` derives the general-use nounstem from the typed predicate slot in the source continuation frame, builds the target CNV frame from Andrews complement matrix metadata plus the outside-object frame, and exposes `complementVerbInput` only as display/audit text.
- The UI complement continuation passes the typed source and target frames into the composer. Mirrored DOM dataset fields expose source variant and target-frame presence for audit, but they do not authorize mutation or dedupe.
- `applyPreteritAgentiveComplementRootsToVerbEntry()` blocks string-only payloads, contradictory display stems, contradictory display inputs, and mismatched source/target frames before changing composer state.
- Hostile derivation and UI coverage proves that missing typed source frames, lying display stems, contradictory target frames, and string-only composer calls cannot authorize the complement route.

## Completed Phase: Preterit-Agentive Adverbial Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.12 preterit-agentive adverbial-manner route now builds finite VNC output through a typed operation frame: generated preterit-agentive general-use nounstem source frame + adverbial matrix frame + target CNV stem frame.
- `buildPreteritAgentiveAdverbialContinuationContract()` still exposes `adverbialVerbInput` such as `(tamatka/nemi)` for display, but the executable `adverbialRequest` uses the typed operation frame and target stem `tamatkanemi`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy adverbial string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old adverbial string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the adverbial route.

## Completed Phase: Preterit-Agentive Adverbial Continuation Operation Gate

Date: 2026-07-06

Decision:

- The live Andrews 35.12 `agentivo-preterito` -> adverbial-manner CNV continuation now requires a generated-output typed source frame plus a typed target continuation frame before its adverbial operation frame or composer handoff can proceed.
- `buildPreteritAgentiveAdverbialContinuationContract()` derives the general-use nounstem from the typed predicate slot in the source continuation frame, builds the target CNV frame from Andrews adverbial matrix metadata, and exposes `adverbialVerbInput` only as display/audit text.
- The UI adverbial continuation passes the typed source and target frames into the composer. Mirrored DOM dataset fields expose source variant and target-frame presence for audit, but they do not authorize mutation or dedupe.
- `applyPreteritAgentiveAdverbialRootsToVerbEntry()` blocks string-only payloads, contradictory display stems, contradictory display inputs, and mismatched source/target frames before changing composer state.
- Hostile derivation and UI coverage proves that missing typed source frames, lying display stems, contradictory target frames, and string-only composer calls cannot authorize the adverbial route.

## Completed Phase: Current Regex Source Parse-Tree Authority Gate

Date: 2026-07-04

Decision:

- The live derivation source-model entry `buildCurrentRegexDerivationSourceModel()` now consumes a typed `current-regex-derivation-source-parse-tree` with explicit outer source pieces, core-prefix pieces, supportive marker, adjacent embed, and matrix-base frame.
- Legacy current-regex strings can still be parsed once into that tree for compatibility, but callers that supply `currentRegexSourceParseTree` / `sourceParseTree` have the structural tree treated as authority before `sourceRawVerb` or display input.
- Poisoned raw regex text inside a parse-tree object, or contradictory `sourceRawVerb` alongside an explicit parse tree, cannot change the selected matrix base or outer source surface.
- Focused derivation coverage proves typed tree construction, typed model consumption, poisoned raw-text resistance, and explicit parse-tree precedence.

## Completed Phase: Nonactive Bound-Source Base Frame Gate

Date: 2026-07-04

Decision:

- The live nonactive fallback `stripBoundSourcePrefixFromNonactiveBase()` no longer recovers a matrix base by slicing `sourcePrefix` from `baseVerb` when a bound source is present.
- Bound-source recovery now requires a structured source chain/source model with outer pieces and matrix base, and the supplied prefix/base must agree with that frame.
- Missing structured source frames return no base with `nonactive-bound-source-missing-structured-source-frame`; contradictory prefix or base frames return no base with the corresponding contradiction diagnostic.
- Existing nonactive and parsing callers pass the already-built source chain into the fallback, so display strings remain outputs of the source model rather than authority for stripping.
- Focused derivation coverage proves structured stripping, poisoned `sourceRawVerb` resistance, missing-source-frame block, and contradictory-base-frame block.

## Completed Phase: Purposive Directional Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews Lesson 29 purposive directional generator `buildAndrewsPurposiveDirectionalVnc()` now requires an `andrews-purposive-directional-operation-frame` built from a typed source frame, matrix frame, inflection frame, and target segment frame.
- Bare `sourceStem`, `candidate`, target-stem strings, and formula text no longer authorize generation. Candidate strings remain diagnostic-only, and the old string-only generator call blocks with `purposive-directional-missing-typed-operation-frame`.
- The generator realizes the target from typed target segments with the orthography bridge; it no longer uses the legacy formula/candidate string scrubber as an executor.
- Contradictory target frames block with `purposive-directional-contradictory-typed-operation-frame`, and monkeypatching the legacy string normalizer does not affect typed output.
- Focused purposive coverage proves candidate-string blocking, typed operation success, missing operation-frame blocking, contradictory frame blocking, and legacy-normalizer poisoning resistance.

## Completed Phase: Honorific/Pejorative Preterit-Embed Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews Lesson 33 preterit-embed honorific/pejorative generator `buildAndrewsHonorificPejorativePreteritEmbedVnc()` now requires an `andrews-honorific-pejorative-preterit-embed-operation-frame` built from a typed preterit source frame, matrix frame, inflection frame, and target segment frame.
- Bare `sourceStem`, `preteritEmbedStem`, candidate strings, source-gate labels, target-stem strings, and formula text no longer authorize generation. Candidate strings remain diagnostic-only, and the old string-only generator call blocks with `honorific-pejorative-preterit-embed-missing-typed-operation-frame`.
- The generator realizes target output from typed target segments with the orthography bridge; it no longer uses the legacy candidate/formula string scrubber as an executor.
- Contradictory target frames block with `honorific-pejorative-preterit-embed-contradictory-typed-operation-frame`, and monkeypatching the legacy string normalizer does not affect typed output.
- Focused honorific/pejorative coverage proves candidate-string blocking, typed operation success, missing operation-frame blocking, contradictory frame blocking, and legacy-normalizer poisoning resistance.

## Completed Phase: Irregular Suppletive Stem Inventory Authority Gate

Date: 2026-07-04

Decision:

- The live irregular suppletive helpers for `yawi` and `weya` now consume explicit `lesson-11-current-suppletive-stem-frame` and `lesson-11-current-suppletive-preterit-variant-frame` records from `CURRENT_SUPPLETIVE_STEM_INVENTORY`.
- `getSuppletiveWeyaCanonical()` no longer synthesizes `weyya` from `rootBase + "ya"`; the canonical and root-plus-ya base are separate inventory stem frames.
- `buildSuppletiveYawiStemSet()` no longer constructs the preterit base with `base + "j"`; the class-D preterit variant is an explicit stemSpec record `{ base: "yaj", suffix: "ki" }`.
- Missing or contradictory suppletive stem/preterit frames block through diagnostic helpers instead of falling back to raw string synthesis.
- Focused irregular coverage proves explicit stemSpec use, missing-frame block, contradictory-frame block, and resistance to poisoned old `SUPPLETIVE_YAWI_IMPERFECTIVE`, `SUPPLETIVE_WEYA_ROOT`, and `SUPPLETIVE_WEYA_CANONICAL` globals.

## Completed Phase: Preterit Base Transform Operation Frame Gate

Date: 2026-07-04

Decision:

- The live preterit base executor `realizePretBaseSpec()` now delegates transform specs to `evaluatePretBaseOperationFrame()`, which consumes a typed `preterit-base-transform-operation-frame` with a source-base frame and typed segment frames.
- Append, replace-suffix, perfective-replacement, deletion-shift, and final-`i` coalescence transforms are executed from the operation frame; transform specs without that frame block instead of using `sourceBase`, `appendText`, `replacement`, `deletionVariant`, or `fallbackBase` as authority.
- Literal base specs remain explicit base records, but legacy transform objects are no longer enough to authorize preterit base formation.
- Missing operation frames and contradictory operation frames block with diagnostics, and poisoned legacy transform fields do not change output when the typed operation frame is unchanged.
- Focused preterit coverage proves typed operation-frame output, old transform-string API blocking, poisoned legacy field resistance, and contradictory operation-frame blocking.

## Completed Phase: Preterit Class A Root-Plus-Ya Source Frame Gate

Date: 2026-07-04

Decision:

- The live preterit Class A root-plus-`ya` branch in `buildPretUniversalClassA()` now consumes a `preterit-root-plus-ya-source-frame` carried by the preterit context.
- Root-plus-`ya` source identity is no longer selected by normalizing candidate strings from `verb`, `analysisVerb`, `exactBaseVerb`, and `rootPlusYaBase` inside the Class A branch.
- The source frame carries root-base, suffix, source-verb, source-kind, Weya status, and denominal matrix metadata; the Class A branch converts that frame into a typed preterit base operation frame before realizing the base.
- Missing or contradictory root-plus-`ya` source frames block the Class A root-plus-`ya` branch instead of falling back to poisoned context strings.
- Focused preterit coverage proves source-frame output, lying context-string resistance, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Class A Final-Vowel Deletion Source Frame Gate

Date: 2026-07-04

Decision:

- The live ordinary preterit Class A final-vowel deletion path in `buildPretUniversalClassA()` now consumes a `preterit-class-a-final-vowel-deletion-source-frame` carried by the preterit context.
- The context builds that source frame from syllable/right-edge structure: source verb, deleted base, deleted final vowel, deleted-base final segment, and right-edge descriptor metadata.
- The Class A branch no longer derives the deleted base with `context.verb.slice(0, -1)` or chooses deletion-shift variants by probing the sliced string. It asks `buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame()` for typed base specs and then realizes those through the typed preterit base operation-frame executor.
- Missing or contradictory final-vowel deletion source frames block the ordinary Class A branch instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.
- Focused preterit coverage proves source-frame output for `kisa -> kiski`, lying context-string resistance, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Class A Direct Yya Source Frame Gate

Date: 2026-07-04

Decision:

- The live direct `yya` special path in `buildPretUniversalClassA()` now consumes a `preterit-class-a-yya-source-frame` carried by the preterit context.
- The context builds that source frame from syllable/right-edge structure instead of asking whether `verb.endsWith("yya")`: source verb, retained base, deleted `ya` suffix, previous-`y`, final onset, final nucleus, and right-edge descriptor metadata.
- The Class A branch no longer builds the direct `yya` base from `context.verb` plus a raw replace-suffix call. It converts the source frame into a typed preterit base operation frame before realization.
- Missing or contradictory direct-`yya` source frames block the special branch instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.
- Focused preterit coverage proves source-frame output for `weyya -> weyki`, lying context-string resistance, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Prefix-Base Contact Frame Gate

Date: 2026-07-04

Decision:

- The core preterit prefix/base contact executor `adjustPretPrefixBaseContact()` now requires a `preterit-prefix-base-contact-frame` with prefix, base, base-subject, boundary segment, and typed operation metadata.
- The legacy positional string API for that executor is blocked with `preterit-prefix-base-contact-missing-frame`; callers must pass the contact frame rather than raw prefix/base strings.
- The typed contact evaluator performs prefix-final/base-initial contact, composed object-prefix `k` contact, `wal` + `ya` contact, and pre-vocalic `nh` realization from segment frames.
- Missing operation frames and contradictory segment frames block instead of falling back to string surgery.
- Focused preterit coverage proves typed contact output, old string API blocking, missing operation-frame blocking, contradictory frame blocking, resistance to monkeypatched legacy contact helper behavior, and composed object-prefix boundary contact through the frame path.

## Completed Phase: Preterit Variant Assembly Frame Gate

Date: 2026-07-04

Decision:

- The live preterit variant assembly entry `buildPretUniversalResultDetailedFromVariants()` now requires a `preterit-variant-assembly-frame`.
- The assembly frame carries a structured source frame with variants, participant/morph-boundary slots, directional metadata, inflection metadata, and a typed `preterit-variant-assembly-operation-frame`.
- The legacy direct variants-array API is blocked with `preterit-variant-assembly-missing-frame`; internal preterit callers build the assembly frame before rendering `result`, `forms`, `surface`, and grammar result frames.
- Missing source frames, missing operation frames, and contradictory source-frame variant counts block instead of falling back to display strings or stale result/form data.
- Focused preterit coverage proves frame-authorized assembly, legacy API blocking, missing source-frame blocking, missing operation-frame blocking, contradictory source-frame blocking, and resistance to lying `stem`, `surface`, `result`, and `formulaEcho` properties on the assembly request.

## Completed Phase: Preterit Class A Ita Source Frame Gate

Date: 2026-07-04

Decision:

- The live transitive Class A `ita -> itz` special path in `buildPretUniversalClassA()` now consumes a `preterit-class-a-ita-source-frame` carried by the preterit context.
- The context builds that source frame from exact syllable/right-edge structure (`i` + `ta`) instead of letting `analysisVerb === "ita"` and `context.verb` decide the special branch.
- The Class A branch no longer builds the `ita` base from `context.verb` plus a raw replace-suffix call. It converts the source frame into a typed preterit base operation frame before realization.
- Missing or contradictory `ita` source frames block the special branch instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.
- Focused preterit coverage proves source-frame output for `ita -> itzki`, lying context-string resistance, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Class C Source Frame Gate

Date: 2026-07-04

Decision:

- The live Class C perfective-replacement path in `buildPretUniversalClassC()` now consumes a `preterit-class-c-source-frame` carried by the preterit context.
- The context builds that source frame from syllable/right-edge structure: source verb, retained base, final vowel, previous nucleus, final form, and right-edge descriptor metadata.
- The Class C branch no longer builds the perfective replacement from `context.verb`. It converts the Class C source frame into a typed preterit base operation frame before realization.
- Missing or contradictory Class C source frames block the branch instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.
- Focused preterit coverage proves source-frame output for `nemia -> nemij`, lying context-string resistance, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Class D Source Frame Gate

Date: 2026-07-04

Decision:

- The live Class D append path in `buildPretUniversalClassD()` now consumes a `preterit-class-d-source-frame` carried by the preterit context.
- The context builds that source frame from resolved source structure: source verb, append segment, syllable count, final form, final nucleus, and right-edge descriptor metadata.
- The Class D branch no longer builds the append operation from `context.verb` or from `context.monosyllableStemPath.classDBaseSpec`. It converts the Class D source frame into a typed preterit base operation frame before realization.
- The direct `getMonosyllableStemPath()` string API now requires the Class D source frame; old string calls block with `null` instead of producing a target base.
- Missing or contradictory Class D source frames block the branch instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.

## Completed Phase: Preterit Class B Source Frame Gate

Date: 2026-07-04

Decision:

- The live Class B literal-base path in `buildPretUniversalClassB()` now consumes source frames carried by the preterit context: `preterit-class-b-source-frame` for ordinary one-vowel and intransitive `wa` branches, and `preterit-root-plus-ya-source-frame` for root-plus-`ya` branches.
- The converted Class B branches no longer build their literal base from `context.verb`. They validate the Class B source frame's source verb, vowel count, syllable count, right-edge segment fields, and typed literal-base operation frame before creating the base spec.
- Root-plus-`ya` Class B alternates validate the root-plus-`ya` source frame before creating the full-source, deleted-`ya`, and root-base variants.
- Missing, operation-less, or contradictory Class B source frames block the converted branches instead of falling back to poisoned `verb`, `analysisVerb`, or `exactBaseVerb` strings.
- Focused preterit coverage proves source-frame output for `ki -> kij`, lying context-string resistance, old string API blocking, missing-source-frame blocking, and contradictory-source-frame blocking.

## Completed Phase: Preterit Class B Fallback Source Frame Gate

Date: 2026-07-04

Decision:

- `getPronounceableClassBFallback()` now consumes the same `preterit-class-b-source-frame` plus typed literal-base operation frame before it can produce the last-resort Class B `base+k` variant.
- Missing source frames, missing operation frames, and contradictory source frames return no fallback instead of reviving `context.verb`.
- The clicked denominal `-ti` route finite-surface bridge builds the Class B preterit surface from a fresh Class B source frame, typed base-spec conversion, a variant assembly frame, and the target frame carried by `resolveNawatRouteTarget()`.
- Focused preterit and state coverage prove fallback output from frames, lying context-string resistance, missing-frame blocking, operation-frame blocking, and preservation of clicked `tronco` route continuation output.

## Completed Phase: Denominal Clicked-Source Target Frame Gate

Date: 2026-07-04

Decision:

- The live clicked denominal `tronco` route path now requires the target verbstem to be authorized by a `nawat-route-verbalized-verb-source-frame` with source-stem, verbalizer, target-verb segment frames, and a typed `append-verbalizer-to-source-stem` operation frame.
- `resolveNawatRouteTarget()` derives `targetVerb` from that evaluated frame rather than from the frame's display `targetVerb` field or route-target strings.
- `getNawatRouteFiniteSurfaceResult()` now treats the default denominal VI preterit route and clicked `tronco` continuations as the same structural Class-B route. It consumes the evaluated target source frame directly, blocks missing, operation-less, or contradictory target frames, and no longer uses the direct `executeNuclearClauseSurfaceRequest()` string executor as the authority for these route surfaces.
- Supplied `targetVerb`, `stem`, `surface`, `result`, `formulaEcho`, DOM-style dataset, or `posicionesFormula.tronco` cannot revive the old string path for structural intransitive preterit paths (`-ti`, `-iwi`, `-awi`).
- Focused state coverage proves unchanged structural frames win over poisoned display strings, missing target frames block, missing operation frames block, contradictory target frames block, the direct no-frame string API blocks, the explicit clicked `-iwi` route uses the structural Class-B frame, and monkeypatching legacy string builders/executors does not affect the converted route.

## Completed Phase: Direct Active Preterit Structural Frame Gate

Date: 2026-07-04

Decision:

- The live direct active preterit route `direct-active-preterit` now carries a `nawat-route-direct-preterit-source-frame` from `resolveNawatRouteTarget()`.
- The frame stores the source verb segment, selected Class A preterit class frame, typed base-spec variant frame, suffix frame, target-surface frame, and a typed `assemble-class-a-preterit-from-source-frame` operation frame.
- `getNawatRouteFiniteSurfaceResult()` consumes that frame directly for the route surface and blocks missing, operation-less, incomplete, or contradictory frames before the old direct nuclear string executor can run.
- Supplied `targetVerb`, `stem`, `surface`, `result`, `formulaEcho`, DOM-style dataset, or `posicionesFormula.tronco` cannot alter or authorize the route surface.
- Focused state coverage proves structural Class A output for `(pusuni) -> pusunki`, poisoned display-string resistance, direct no-frame API blocking, missing operation frame blocking, contradictory base-frame blocking, and poisoned legacy nuclear executor resistance.

## Completed Phase: Patientivo Perfective Noun Structural Frame Gate

Date: 2026-07-04

Decision:

- The live patientivo perfective noun route `patientivo-perfective-ti-noun` now carries a `nawat-route-patientivo-perfective-source-frame` from `resolveNawatRouteTarget()`.
- The frame stores the source verb segment, structural direct-preterit source frame, perfective source-ending contract, target patientivo stem, nominal suffix, source-surface frame, target-surface frame, and a typed `append-perfective-patientivo-suffix-to-preterit-base-frame` operation frame.
- `getNawatRouteSourceSurfaceResult()`, `getNawatRouteGeneratedPatientivoConnectorSuffix()`, and `getNawatVerbNounConversionNominalSurfaceResult()` consume that frame directly for this route. They no longer call the patientivo nuclear string executor or derive the patientivo noun by source-surface suffix surgery.
- Missing, operation-less, incomplete, contradictory, or unsupported-ending frames block instead of falling back to `executeNuclearClauseSurfaceRequest()`, `generateNawatRoutePatientivoSurfaceResult()`, source-surface text, or `posicionesFormula.tronco`.
- Focused state coverage proves structural output for `(ketza) -> ketzki -> ketzti`, poisoned display-string resistance, poisoned legacy patientivo executor resistance, direct no-frame API blocking, missing operation frame blocking, contradictory target-frame blocking, and blocked unsupported `kuchi` perfective patientivo generation.

## Completed Phase: Patientivo Imperfective Noun Structural Frame Gate

Date: 2026-07-04

Decision:

- The live patientivo imperfective noun route `patientivo-imperfective-t` now carries a `nawat-route-patientivo-imperfective-source-frame` from `resolveNawatRouteTarget()` when the selected source route is active imperfective.
- The frame stores the source verb segment, source object prefix segment, source-surface frame, target patientivo stem, nominal suffix, target-surface frame, and a typed `append-imperfective-patientivo-suffix-to-source-stem-frame` operation frame. It keeps the finite VNC source shell and derived CNN patientivo shell as structural metadata for display and diagnostics.
- `getNawatRouteSourceSurfaceResult()`, `getNawatRouteGeneratedPatientivoConnectorSuffix()`, and `getNawatVerbNounConversionNominalSurfaceResult()` consume that frame directly for the selected structural route. They no longer call the patientivo nuclear string executor or derive the patientivo noun by source-surface suffix surgery.
- Missing, operation-less, incomplete, or contradictory frames block instead of falling back to `executeNuclearClauseSurfaceRequest()`, `generateNawatRoutePatientivoSurfaceResult()`, source-surface text, or `posicionesFormula.tronco`.
- Focused state coverage proves structural output for `(kuchi) -> kuchiya -> kuchit` and `-(mati) -> tematiya -> tamatit`, poisoned display-string resistance, poisoned legacy patientivo executor resistance, missing source-frame blocking, missing operation-frame blocking, and contradictory target-frame blocking.

## Completed Phase: Patientivo Passive Nonactive Noun Structural Frame Gate

Date: 2026-07-05

Decision:

- The live explicit passive branch of the patientivo nonactive noun route `patientivo-nonactive-t` now carries a `nawat-route-patientivo-nonactive-source-frame` from `resolveNawatRouteTarget()` for the selected `-(mati)` preterit nonactive path.
- The frame stores the source verb, source object prefix, source base, source ending, nonactive source surface, passive patientivo stem, target prefix, target stem, suffix, target surface, nonactive source-suffix contract, `patientiveSourceStageFrame`, and a typed `append-nonactive-patientivo-suffix-to-source-stem-frame` operation frame.
- `getNawatRouteSourceSurfaceResult()`, `getNawatRouteGeneratedPatientivoConnectorSuffix()`, and `getNawatVerbNounConversionNominalSurfaceResult()` consume that frame directly for the selected passive/impersonal nonactive structural route. They no longer call the patientivo nuclear string executor or derive the patientivo noun by source-surface suffix surgery for that selected branch.
- Missing, operation-less, incomplete, or contradictory frames block instead of falling back to `executeNuclearClauseSurfaceRequest()`, `generateNawatRoutePatientivoSurfaceResult()`, source-surface text, or `posicionesFormula.tronco`.
- Focused state coverage proves structural output for `-(mati) -> machu -> machit`, poisoned display-string resistance, poisoned legacy patientivo executor resistance, missing source-frame blocking, missing operation-frame blocking, and contradictory target-frame blocking.

## Completed Phase: Patientivo Default Nonactive Noun Structural Frame Gate

Date: 2026-07-05

Decision:

- The live default nonactive branch of the patientivo nonactive noun route `patientivo-nonactive-t` now carries a `nawat-route-patientivo-nonactive-source-frame` from `resolveNawatRouteTarget()` for the selected `(pulua)` present nonactive path.
- The frame stores the source verb, source base, source ending, generated nonactive source surface, target stem, generated `ti` connector, target surface, nonactive source-suffix contract, `patientiveSourceStageFrame`, and a typed `append-nonactive-patientivo-suffix-to-source-stem-frame` operation frame.
- `getNawatRouteSourceSurfaceResult()`, `getNawatRouteGeneratedPatientivoConnectorSuffix()`, and `getNawatVerbNounConversionNominalSurfaceResult()` consume that frame directly for the selected structural route. They no longer call the patientivo nuclear string executor or derive the patientivo noun by source-surface suffix surgery for this path.
- Missing, operation-less, incomplete, or contradictory frames block instead of falling back to `executeNuclearClauseSurfaceRequest()`, `generateNawatRoutePatientivoSurfaceResult()`, source-surface text, or `posicionesFormula.tronco`.
- Focused state coverage proves structural output for `(pulua) -> pululu -> pululti`, poisoned display-string resistance, poisoned legacy patientivo executor resistance, missing source-frame blocking, missing operation-frame blocking, and contradictory target-frame blocking.

## Completed Phase: Nonactive Habitual Structural Frame Gate

Date: 2026-07-05

Decision:

- The live verb-to-verb route `nonactive-habitual-potential` now carries a `nawat-route-nonactive-habitual-source-frame` from `resolveNawatRouteTarget()` for the selected `(pusuni)` nonactive habitual path.
- The frame stores the source verb/source stem, selected nonactive target stem spec, target stem, habitual `ni` connector, target surface, target variants, formula-slot frame, morphology frame, and a typed `derive-nonactive-habitual-from-source-frame` operation frame.
- `getNawatRouteFiniteSurfaceResult()` consumes that frame directly before the old configured route string executor can run. The selected route no longer calls `executeNawatRouteConfiguredGeneration()` or `executeNuclearClauseSurfaceRequest()` as the grammar authority for this finite route surface.
- Missing, operation-less, incomplete, contradictory, or variant-contradictory frames block instead of falling back to route strings, display fields, DOM-style datasets, `targetVerb`, `surface`, `result`, `formulaEcho`, or `posicionesFormula.tronco`.
- Focused state coverage proves structural output for `(pusuni) -> no activo -> pusuniwani` with variant `pusunuwani`, poisoned display-string resistance, poisoned legacy route executor resistance, missing source-frame blocking, missing operation-frame blocking, and contradictory target-frame blocking.

## Completed Phase: Continuation Route Action Structural Contract Gate

Date: 2026-07-05

Decision:

- The shared continuation-chip route action path now treats `applyAndrewsCnvCnnRouteActionDataset()` as a renderer of an already-authorized Andrews route action contract, not as a DOM-dataset inference point.
- `inferAndrewsCnvCnnBackAndForthRouteRecordId()` no longer accepts `dataset.andrewsRouteRecordId`, `dataset.routeRecordId`, `dataset.conversionRouteRecordId`, or `dataset.routeId` as route authority. Route ids must come from direct structured input, embedded route action contracts, route contracts, route coordinate frames, or grammar frames.
- `getAndrewsCnvCnnRouteActionContractForRendering()` no longer reconstructs an action contract from DOM dataset route ids. If a continuation element lacks a structural route action contract/frame, `applyAndrewsCnvCnnRouteActionDataset()` clears stale Andrews route-action dataset mirrors and returns no contract.
- The selected live path is the shared Andrews CNV/CNN continuation action renderer for generated continuation chips. It now consumes `andrews-cnv-cnn-route-action-contract` frames directly, including typed route coordinate frames, obstacle gates, generation/ranking gates, and embedded function-use valence gates, before rendering DOM datasets/title/ARIA mirrors.
- Hostile UI and clause coverage proves plain DOM continuation flags and even a lying `data-andrews-route-record-id` cannot authorize or infer a route action. Structural contracts still render the 7-record Andrews route metadata, and blocked function-use contracts still disable click actions before state mutation.

## Completed Phase: Verb Nominal Row Continuation Action Contract Gate

Date: 2026-07-05

Decision:

- The actual generated verb-to-nominal row continuation button path now builds an `andrews-cnv-cnn-route-action-contract` before the DOM action is appended.
- `appendVerbToNominalRowContinuations()` maps the structural `sourceUnit` to the Andrews route record (`cnv-predicate-to-cnn-nounstem-nominalization` or `cnv-core-to-cnn-nounstem-deverbal`) and requires the preview's grammar frame to carry both a route contract and an OK result frame.
- Missing preview frames, blocked result frames, or unsupported source units suppress the continuation action instead of letting `data-target-tense`, `data-target-surface`, stale route datasets, `surface`, `result`, `formulaEcho`, `stem`, or `posicionesFormula.tronco` authorize the route.
- The continuation element receives the structural action contract as `continueButton.andrewsRouteActionContract`; DOM datasets remain rendered mirrors after the Andrews route contract is already authorized.
- Hostile UI coverage proves poisoned display strings, DOM route ids, and `posicionesFormula.tronco` cannot change the selected Andrews route record, while string-only and blocked previews produce no route action contract.

## Completed Phase: VNC Adjectival Function Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 40.3 VNC-as-adjectival-function route now treats generated VNC formula/realization frames as the route authority. The selected live path is the generated VNC row continuation through `appendVncAdjectivalFunctionRowContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `resolveAdjectivalNncFunctionOverrideFromInput()`, and `executeAdjectivalNncGenerationRoute()`.
- `buildVncAdjectivalNncFunctionOutput()` now requires a typed source continuation frame, typed target continuation frame, and `andrews-40-3-vnc-adjectival-function` operation frame. The route surface is read from the target formula-realization record, not from `vncSurface`, `surface`, `stem`, the input value, or `posicionesFormula.tronco`.
- The renderer builds and passes the typed source/target/operation frames when it creates VNC adjectival continuation contracts. The composer stores those frames on the structured entry contract, and the VNC facade carries the operation frame into the generation override.
- Missing source frames, missing target/operation frames, string-only inputs, or contradictory source/target formula-realization frames block instead of falling back to the old generated-surface builder.
- Hostile adjectival coverage proves poisoned display strings and `posicionesFormula.tronco` do not change output, string-only VNC adjectival requests block, missing operation frames block, contradictory target frames block, and the operation frame explicitly records that rendered input is not consumed as grammar authority.

## Completed Phase: Patientive Adjectival Function Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 40.4 patientive-NNC-as-adjectival-function route now treats generated patientive NNC formula/realization frames as the route authority. The selected live path is the generated patientivo row continuation through `renderPatientivoAdjectivalFunctionContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `resolveAdjectivalNncFunctionOverrideFromInput()`, and `executeAdjectivalNncGenerationRoute()`.
- `buildPatientivoAdjectivalNncFunctionOutput()` now requires a typed source continuation frame, typed target continuation frame, and `andrews-40-4-patientive-adjectival-function` operation frame. The route surface is read from the target formula-realization record, not from `patientivoSurface`, `surface`, `stem`, the input value, a frame-only display surface, or `posicionesFormula.tronco`.
- The renderer builds and passes the typed source/target/operation frames when it creates patientive adjectival continuation contracts. The composer stores those frames on the structured entry contract, and the VNC facade already carries the operation frame into the generation override.
- Missing source frames, missing target/operation frames, string-only inputs, frame/display-only overrides, or contradictory source/target formula-realization frames block instead of falling back to the old generated-surface builder.
- Hostile adjectival coverage proves poisoned display strings and `posicionesFormula.tronco` do not change output, string-only patientive adjectival requests block, missing operation frames block, contradictory target frames block, and the operation frame explicitly records that rendered input is not consumed as grammar authority.

## Completed Phase: Compound-Source Adjectival Function Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 41.2 compound-source-NNC-as-adjectival-function route now treats generated compound NNC formula/realization frames plus the parsed compound source frame as the route authority. The selected live path is the generated compound-source row continuation through `renderCompoundSourceAdjectivalFunctionContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `resolveAdjectivalNncFunctionOverrideFromInput()`, and `executeAdjectivalNncGenerationRoute()`.
- `buildCompoundSourceAdjectivalNncFunctionOutput()` now requires a typed source continuation frame, typed target continuation frame, parsed compound source frame, and `andrews-41-2-compound-source-adjectival-function` operation frame. The route surface and formula echo are read from the target/source formula-realization records, not from `compoundSourceSurface`, `surface`, `stem`, `formulaEcho`, the input value, DOM display metadata, or `posicionesFormula.tronco`.
- The renderer builds and passes the typed source/target/operation frames when it creates compound-source adjectival continuation contracts. The composer stores those frames on the structured entry contract, and the VNC facade carries the operation frame and parsed compound frame into the generation override.
- Missing source frames, missing target/operation frames, string-only inputs, missing parsed compound source frames, display-only overrides, legacy `requireStructuredContinuation: false` calls, or contradictory source/target formula-realization frames block instead of falling back to the old generated-surface builder.
- Hostile adjectival coverage proves poisoned `compoundSourceSurface`, `surface`, `stem`, `formulaEcho`, and `posicionesFormula.tronco` do not change grammar output, string-only compound-source adjectival requests block, missing operation frames block, contradictory target frames block, and the operation frame explicitly records that rendered input is not consumed as grammar authority.

## Completed Phase: Nominalized VNC Adjectival Function Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 40.5-40.8 nominalized-VNC-NNC-as-adjectival-function route now treats generated nominalized NNC formula/realization frames plus nominalization kind/profile as the route authority. The selected live path is the generated nominalized VNC row continuation through `renderNominalizedVncAdjectivalFunctionContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `resolveAdjectivalNncFunctionOverrideFromInput()`, and `executeAdjectivalNncGenerationRoute()`.
- `buildNominalizedVncAdjectivalNncFunctionOutput()` now requires a typed source continuation frame, typed target continuation frame, supported nominalization kind, and `andrews-40-5-40-8-nominalized-vnc-adjectival-function` operation frame. The route surface and formula echo are read from the target/source formula-realization records, not from `nominalizedSurface`, `surface`, `stem`, `formulaEcho`, the input value, DOM display metadata, or `posicionesFormula.tronco`.
- The renderer builds and passes the typed source/target/operation frames when it creates nominalized VNC adjectival continuation contracts. The composer stores those frames on the structured entry contract, and the VNC facade carries the operation frame and nominalization profile into the generation override.
- Missing source frames, missing target/operation frames, string-only inputs, display-only overrides, legacy `requireStructuredContinuation: false` calls, unsupported nominalization kinds, or contradictory source/target formula-realization frames block instead of falling back to the old generated-surface builder.
- Hostile adjectival coverage proves poisoned `nominalizedSurface`, `surface`, `stem`, `formulaEcho`, and `posicionesFormula.tronco` do not change grammar output, string-only nominalized VNC adjectival requests block, missing operation frames block, contradictory target frames block, and the operation frame explicitly records that rendered input is not consumed as grammar authority.

## Completed Phase: Denominal Compound Adjectival Function Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 41.3 denominal-compound-NNC-as-adjectival-function route now treats generated preterit-agentive NNC formula/realization frames plus the parsed denominal compound source frame as the route authority. The selected live path is the generated denominal compound row continuation through `renderDenominalCompoundAdjectivalFunctionContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `resolveAdjectivalNncFunctionOverrideFromInput()`, and `executeAdjectivalNncGenerationRoute()`.
- `buildDenominalCompoundAdjectivalNncFunctionOutput()` now requires a typed source continuation frame, typed target continuation frame, parsed denominal compound source frame, and `andrews-41-3-denominal-compound-adjectival-function` operation frame. The route surface and formula echo are read from the target/source formula-realization records, not from `denominalCompoundSurface`, `surface`, `stem`, `formulaEcho`, the input value, DOM display metadata, or `posicionesFormula.tronco`.
- The renderer builds and passes the typed source/target/operation frames when it creates denominal compound adjectival continuation contracts. The composer stores those frames on the structured entry contract, and the VNC facade carries the operation frame and parsed denominal compound frame into the generation override.
- Missing source frames, missing target/operation frames, string-only inputs, missing parsed denominal compound source frames, display-only overrides, legacy `requireStructuredContinuation: false` calls, or contradictory source/target formula-realization frames block instead of falling back to the old generated-surface builder.
- Hostile adjectival coverage proves poisoned `denominalCompoundSurface`, `surface`, `stem`, `formulaEcho`, and `posicionesFormula.tronco` do not change grammar output, string-only denominal compound adjectival requests block, missing operation frames block, missing source frames block, contradictory target frames block, and the operation frame explicitly records that rendered input is not consumed as grammar authority.
- The Andrews CNV/CNN back-and-forth audit probe for the denominal-compound loop now builds the same typed source/target/operation frames before calling the route executor, so the audit no longer depends on the legacy string API.

## Completed Phase: Active-Action Source-Subject Possessor Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 36.11 active-action general-use NNC route now treats source-subject-to-possessor transfer as a typed Andrews operation, not as a mapping inferred from `subjectPrefix` / `subjectSuffix` strings. The selected live path is the `calificativo-instrumentivo` general-use source-subject possessor continuation through `renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation()`, `evaluateNounCombinationState()`, `applyMorphologyRules()`, and `getCalificativoInstrumentivoResult()`.
- `getCalificativoInstrumentivoResult()` now requires an `andrews-source-subject-frame` and an `andrews-36-11-active-action-source-subject-to-possessor` operation frame whenever the route tries to derive the target possessor from the source VNC subject. The target possessive prefix is read from the typed source subject frame plus operation frame; the legacy direct string API blocks when those frames are absent.
- The morphology engine builds the typed source-subject frame from the structured generation slots for generated `calificativo-instrumentivo` general-use requests, and the row renderer builds and passes the same source/operation frames for the visible source-subject possessor continuation. Display strings and DOM datasets remain mirrors after authorization.
- Missing source-subject frames, missing operation frames, unmappable source-subject frames, and contradictory target/source operation frames block before the route can generate. A poisoned `subjectPrefix` / `subjectSuffix` string pair cannot override the typed frame's possessor decision.
- Hostile NNC coverage proves string-only source-subject possessor calls block, poisoned subject strings do not change the generated target, missing operation frames block, contradictory target frames block, and generated top-level requests still succeed by using structured slot-derived frames rather than display surfaces.

## Completed Phase: Instrumentivo Source-Subject Possessor Typed Frame Gate

Date: 2026-07-05

Decision:

- The live Andrews 36.6 instrumentivo possessive route now treats source-subject-to-possessor transfer as a typed Andrews operation, not as a mapping inferred from `subjectPrefix` / `subjectSuffix` strings. The selected live path is the `instrumentivo` source-subject possessive continuation through `renderInstrumentivoSourceSubjectPossessiveContinuation()`, `evaluateNounCombinationState()`, `applyMorphologyRules()`, and `getInstrumentivoResult()`.
- `getInstrumentivoResult()` now requires an `andrews-source-subject-frame` and an `andrews-36-6-instrumentive-source-subject-to-possessor` operation frame whenever the route tries to derive the target possessor from the source VNC subject. The target possessive prefix is read from the typed source subject frame plus operation frame; the legacy direct string API blocks when those frames are absent.
- The morphology engine builds the typed source-subject frame from structured generation slots for generated `instrumentivo` possessive requests with implicit source-subject possessor transfer, and the row renderer builds and passes the same source/operation frames for the visible instrumentivo source-subject possessive continuation. Display strings and DOM datasets remain mirrors after authorization.
- Missing source-subject frames, missing operation frames, unmappable source-subject frames, and contradictory target/source operation frames block before the route can generate. Poisoned `subjectPrefix` / `subjectSuffix` strings cannot override the typed frame's possessor decision.
- Hostile NNC coverage proves string-only instrumentivo source-subject possessor calls block, poisoned subject strings do not change the generated target, missing operation frames block, contradictory target frames block, and generated top-level requests still succeed by using structured slot-derived frames rather than display surfaces.

## Completed Phase: Predicate-Nominal Absolutive t/ti Connector Typed Operation Gate

Date: 2026-07-05

Decision:

- The live Andrews 36.6 note 2 predicate-nominal route now treats the absolutive `t/ti` connector choice as a typed Andrews operation over the predicate stem frame, not as a regex/string read of rendered predicate-stem text. The selected live path is `predicado-nominal` generation through `applyMorphologyRules()` and `getPredicateNominalResult()`.
- `getPredicateNominalResult()` now requires an `andrews-predicate-nominal-connector-operation-frame` whenever it must derive the target absolutive connector from the source VNC predicate stem. The connector is resolved from the typed `predicateStemSpec`/operation frame after the source morphology has been authorized, and the old string-only connector path blocks when that operation frame is absent.
- The morphology engine builds the operation frame from structured predicate-nominal generation slots before calling the NNC executor. Display strings such as `predicateStem`, `formulaEcho`, and generated surfaces remain output mirrors after the route has been authorized.
- Missing operation frames, contradictory source-tense frames, contradictory operation frames, and incomplete predicate-stem frames block before the route can generate. Hostile NNC coverage proves a direct string-only predicate-nominal call blocks, the legacy string resolver returns no active connector without diagnostic opt-in, a typed future source resolves `ti` from the predicate stem frame, and a contradictory source-tense operation frame blocks.

## Completed Phase: Intensified Adjectival Function Typed Operation Gate

Date: 2026-07-05

Decision:

- The live Andrews 41.1 intensified adjectival NNC continuation now treats reduplicative intensification as a typed Andrews operation over the source formula frame, not as a call to the old source-stem string reduplication helper. The selected live path is `renderIntensifiedAdjectivalFunctionContinuation()`, `applyAdjectivalNncFunctionToVerbEntry()`, `executeAdjectivalNncGenerationRoute()`, and `buildIntensifiedAdjectivalNncOutput()`.
- `buildIntensifiedAdjectivalNncOutput()` now requires a `generated-output-typed-continuation-frame` source frame and an `andrews-41-1-intensified-adjectival-reduplication` operation frame. It consumes the operation frame's target formula slots and target predicate stem directly; `sourceSurface`, `surface`, `sourceFormulaEcho`, and caller-supplied formula slots are display/mirror inputs after authorization.
- The renderer builds the typed source frame from the selected canonical formula-realization variant, builds the Andrews 41.1 operation frame, and passes source/target selected variants plus source/target/operation frames through the continuation button into the composer override.
- Missing source frames, missing operation frames, contradictory operation frames, poisoned display strings, changed caller formula slots, and monkeypatched legacy string reduplication do not authorize or change the route. Hostile adjectival tests prove the typed frame path still generates `yejyektik` while the string-only path blocks.

## Completed Phase: Andrews Lesson 32 p294 NNC-Side Output Generation

Date: 2026-06-24

Decision:

- Andrews printed p. 294 / PDF p. 309 `pil` child/noble NNC-side rows now generate scoped output rows from structural formula records.
- Generated surfaces are slot-wise Nawat/Pipil orthography-bridge realizations of Andrews formulas, e.g. `#0-0(cihua-pi-pil)t-in#` -> `siwapipiltin` and `#0-0(pil-ton)tli-0#` -> `piltunti`.
- The implementation keeps possessive-state material such as `+n-o` / `+i-m` on the predicate side, keeps `hu-ān`, `0-[sq0]`, `t-in`, and `tli-0` as outside subject-number connectors, and records that there is no VNC tense slot.
- This is not a new ordinary NNC generation gate and does not complete general affective NNC generation for all Lesson 32 patterns.

## Completed Phase: Andrews Lesson 32 p294 NNC-Side Typed Row Realization Gate

Date: 2026-07-05

Decision:

- The p.294 `pil` child/noble row generator no longer lets row ids, formula text, normalized slot strings, or concatenated display strings authorize the target. The selected live path is `buildLesson32PilChildNncSideOrdinaryNncOutputSet()` through `generateLesson32PilChildNncSideOutputs()` and `generateLesson32PilChildNncSideOutput()`.
- `generateLesson32PilChildNncSideOutput()` now requires a `lesson-32-pil-child-nnc-side-source-frame` plus an `andrews-32-6-pil-child-nnc-side-row-realization` typed operation frame. The target surface is read from the operation frame's segment frames after the source frame has fixed the Andrews formula slots, row id, predicate stem, state, and connector roles.
- The output-set builder constructs source and operation frames from the scoped p.294 row inventory before row execution. The single-row legacy string/id API now blocks unless those typed frames are supplied.
- Missing source frames, missing operation frames, contradictory source/target frames, poisoned row/formula strings, changed caller strings, and monkeypatched legacy surface normalization cannot authorize or change the row output. Hostile compound tests prove the typed first row still generates `annupilwan` and string-only calls block.

## Completed Phase: Andrews Lesson 32 p294 Ordinary CNN Output Route

Date: 2026-06-24

Decision:

- The p.294 `pil` child/noble NNC-side output set is now available through the ordinary CNN output-generation route by explicit request: `ordinaryNnc.outputSet = "lesson32-pil-child-nnc-side"`.
- The route remains `generationRoute: "ordinary-nnc"` with `subGenerationRoute: "lesson-32-pil-child-nnc-side"` and does not change default ordinary nounstem generation.
- Active and no-active request contexts both produce the same NNC output set; the route records requested derivation/voice mode metadata but keeps the CNN structure tense-free.
- The ordinary CNN request builder can carry that output-set opt-in, so UI/request code can target `CLÁUSULA NUCLEAR NOMINAL (CNN) · SUSTANTIVO ORDINARIO · ACTIVO + NO ACTIVO` without adding a lesson-specific generation gate.

## Completed Phase: Andrews Logic Authority Denominal Source Context

Date: 2026-06-24

Decision:

- Lessons 54-55 source-context/source-evidence requirements are now diagnostic metadata for denominal route targets, not finite-generation gates. Andrews executable route contracts decide whether a target can build a finite request; pending source context is exposed as `andrews-source-context-diagnostic-not-generation-gate`.
- Nawat/Pipil evidence remains orthography/provenance data and does not authorize or veto Andrews grammar logic. Classical rule spellings still pass through the Nawat/Pipil orthography bridge before output.
- Transitive, causative, applicative, and usually-transitive route targets still require an explicit object prefix before request construction.
- Denominal continuation chips now remain clickable when only source context is pending, show that pending context as diagnostic, and still block only the object-prefix layer when an object is missing.

## Completed Phase: Andrews Source Target Route Authority On Tense Controls

Date: 2026-06-24

Decision:

- Existing `button.tense-tab` and `div.tense-block` controls now carry Andrews source-target route authority metadata; no duplicate top-level tabs were added.
- The metadata resolves from the existing Andrews source-gated route registry when available, then exposes source formula type, target formula type, transition, route class, registry ids, matched ids, route branch, source gate, route host, logic authority, structural Classical spelling role, and Nawat/Pipil output spelling authority.
- Current nominal outputs such as `agentivo`, `agentivo-presente`, `agentivo-preterito`, `agentivo-futuro`, `sustantivo-verbal`, `patientivo`, `instrumentivo`, `calificativo-instrumentivo`, `locativo-temporal`, and `locativo-agentivo-preterito` are marked as Andrews `CNV->CNN` routes where their current control is a nominal output surface.
- Patientivo subtypes remain `div.tense-block` branches (`patientivo-pasivo`, `patientivo-impersonal`, `patientivo-perfectivo`, `patientivo-imperfectivo`, `patientivo-tronco`) and carry `CNV->CNN` branch authority instead of becoming duplicate `button.tense-tab` controls.
- `CNN->CNV`, `CNV->CNV`, and mixed `CNV/CNN->CNV/CNN` classifications are routed to Andrews route-directory, verb-derivation-control, output-continuation, or mixed-compound hosts rather than nominal-output tabs.
- The visible nominal tab groups remain the CNV-to-CNN output inventory. Source-target perception now belongs on the existing `Tipo de cláusula` and `Unidad` controls: clause-type buttons expose the current source side, and unit buttons expose target `CNV`/`CNN` plus `CNV->CNV`, `CNN->CNV`, `CNV->CNN`, `CNN->CNN`, and mixed `CNV/CNN->CNV/CNN` route options without mounting another route-directory column.

## Completed Phase: Andrews Tense Authority UI Metadata

Date: 2026-06-24

Decision:

- `button.tense-tab` and `div.tense-block` now receive Andrews authority metadata through a shared UI helper.
- The self-audit now treats that element contract literally: `.tense-tab` controls must be `button.tense-tab`, and `.tense-block` output frames must be `div.tense-block`, with diagnostics for tag drift.
- The metadata now records Andrews as grammar-logic authority, Classical spelling as structural-only, and Nawat/Pipil as the output orthography boundary on each annotated tab/block.
- CNV tense tabs distinguish Andrews-licensed `tns` logic from Nawat/Pipil finite extensions that remain spelling/surface evidence only.
- Programmatic CNV rendering now checks that same Andrews generation gate before building output rows, so Nawat/Pipil extension keys cannot bypass the tab inventory and generate CNV output as grammar. If a blocked key reaches rendering, the diagnostic block keeps the original tense value and `not-andrews-grammar-gate` metadata.
- The core CNV generation executor now applies the shared Andrews tense gate before finite output even when `skipValidation` is set, so direct `executeGenerateWordRequest()` calls for Nawat/Pipil extension tenses return blocked diagnostics instead of surfaces or formula shells.
- Denominal linked-route previews preserve their route stems but do not fall back to target-stem display when the finite target tense is blocked by the Andrews CNV gate.
- Annotated `button.tense-tab` and `div.tense-block` controls now also carry executor gate metadata (`data-andrews-executor-*`) for the direct CNV output boundary, including the blocked `andrews-cnv-tense-logic-gate`, formula-shell block, and no-target-stem-fallback policy.
- Tense tabs/blocks also carry explicit logic-role, generation-gate, output-role, Nawat/Pipil evidence-role, and Classical-output-import metadata so rendered controls do not treat visible Nawat/Pipil surface labels as grammar permission.
- Tense tabs/blocks also carry `andrewsOutputSpellingAuthority="Nawat/Pipil orthography bridge"` and `andrewsOrthographyRealizationPath="andrews-logic-then-nawat-pipil-realization"` so the rendered control itself records that Andrews licenses logic before spelling realization.
- Unclassified tense values no longer default into the CNV `tns` slot; they require an Andrews frame and self-audit as diagnostic until classified.
- Nonactive suffix tabs are Andrews-licensed derived-stem controls, not tense evidence or Nawat/Pipil grammar gates.
- CNN/nominal output blocks are explicitly marked as Andrews nominal routes with `no-vnc-tns`, preserving the ordinary NNC rule that nominal clauses do not acquire a VNC tense slot.
- Tense-tab hover/title text now resolves through the same mode-aware Andrews authority frame as the dataset, so CNN controls do not inherit CNV unknown-tense wording.
- Partícula output blocks are explicitly marked as Andrews particle boundaries with `no-vnc-tns`, keeping particle examples outside CNV/CNN tense logic.
- Placeholder output blocks are marked as Andrews output gates so missing route selections do not fall back to an unclassified tense frame.
- A DOM audit helper now checks annotated tabs/blocks for missing authority fields and slot conflicts.
- The DOM audit also checks authority class state against the canonical dataset, so stale `nawat-extension`, `surface-evidence-only`, or Andrews-generation visual classes cannot contradict metadata.
- DOM sync treats the rendered/root mode as authoritative over stale `data-andrews-tense-mode`, so reused controls moved between CNV and CNN contexts are repaired to the current Andrews frame.
- Annotated tabs/blocks now write self-audit fields (`data-andrews-authority-audit`, `data-andrews-authority-missing`, `data-andrews-authority-diagnostics`) so rendered tense controls expose whether Andrews authority metadata is coherent.
- A DOM sync helper now backfills missing authority metadata on rendered `.tense-tab`/`.tense-block` controls, repairs stale self-consistent authority metadata from the rendered tense value, and writes aggregate audit counts on the tab/output roots.
- Tense-tab selection now treats Andrews grammar gates separately from surface-output probes: an Andrews-licensed tab is not disabled merely because the current Nawat/Pipil surface probe is empty, while Nawat/Pipil finite extensions and unclassified frames remain blocked by the Andrews generation gate.
- Tense-tab selection metadata now also records Andrews as the selection logic authority, mirrors the grammar gate into `data-andrews-selection-grammar-gate`, keeps Nawat/Pipil as an orthography boundary only, and self-audits stale surface-probe or Classical-output-import contradictions.
- DOM sync now repairs missing/stale tense-tab selection metadata and writes aggregate `data-andrews-tab-selection-*` counts on the root, so clickable/disabled selection state has the same visible audit boundary as tense-block output rows.
- Tense-tab selection authority now writes native `disabled`, `aria-disabled`, and `data-andrews-selection-disabled` from the Andrews gate, and self-audits stale disabled/ARIA state so a visually clickable tab cannot contradict a blocked Andrews grammar gate.
- Tense-tab click handlers now re-check that same Andrews gate before mutating selection state; `data-andrews-click-*` metadata and self-audit diagnostics expose stale clickable paths even when DOM disabled state is manually or programmatically contradicted.
- Tense-tab selection sync now clears stale `is-active`/`aria-selected` state on blocked Andrews grammar gates and records selected-vs-blocked counts on the root audit, so a Nawat/Pipil extension tab cannot remain visually selected as grammar output.
- Tense-block output audit now records generated row counts and marks hard-blocked Andrews gates as diagnostic if a blocked `div.tense-block` contains generated `.conjugation-row` output.
- Tense-block output audit now rejects visible rows that lack an Andrews route contract (`grammarRouteFamily`, `grammarRouteStage`, and `grammarGenerationAllowed`) and aggregates the missing-contract count on the root audit, so a row cannot bypass the Andrews gate by omitting route metadata.
- Tense-block output audit now rejects row-level contradictions where `grammarGenerationAllowed="false"` still reports `grammarResultOk="true"`, and aggregates the blocked-success count on the root audit.
- DOM sync writes aggregate tense-block output audit counts on each audited root so blocked-generation leakage is visible at the tab/output container level.
- Tense-block output audit now also aggregates child row grammar route contracts onto `div.tense-block`, including route families, route stages, diagnostic ids, Andrews generation-allowed row counts, and blocked route row counts, so the block boundary exposes whether displayed rows came through an Andrews-licensed executor path.
- Tense-block output audit now flags generated rows that still carry a blocked Andrews route stage or blocked diagnostic id, so a row cannot claim `grammarGenerationAllowed=true` while retaining `andrews-cnv-tense-logic-gate` or `not-andrews-grammar-gate`.
- Tense-block output audit now also flags generated rows whose `grammarResultOk` is not `true`, so a row cannot claim Andrews generation while its result frame still says output failed.
- Tense-block output audit now also aggregates generated row orthography contracts (`grammarOrthographyBoundary`, `grammarSpellingAuthority`, and `grammarClassicalSurfaceImport`) and flags generated rows that lack the Nawat/Pipil boundary or permit Classical surface import.
- Tense-block output audit now also flags generated rows whose spelling authority is not Nawat/Pipil orthography, so a row cannot silently route output spelling back to Classical or another source.
- Generated row datasets now also expose `grammarLogicAuthority="Andrews"` and `grammarSpellingEvidenceRole="orthography-realization-only"`; tense-block audit flags generated rows that omit Andrews logic authority or treat spelling evidence as a grammar authority.
- Tense-block output audit now also flags generated rows whose source-context or source-evidence target authority is present but not Andrews, so Nawat/Pipil generated surfaces and orthography evidence cannot become row-level grammar authority.
- Generated row datasets now also expose `grammarClassicalSpellingRole="structural-only"`; tense-block audit flags generated rows that treat Classical spelling as output spelling instead of structural rule spelling.
- Tense-block output audit now also repairs visible output-state classes (`blocked`, `generated`, `nominal`, `particle`, and blocked-row leakage) from the Andrews gate, so class state cannot contradict the generated-output audit.
- Annotated tense tabs/blocks now also resolve CNV verb authority from the shared core Andrews tense frame and carry core source/slot/family/role/gate fields (`data-andrews-core-*`) with self-audit mismatch diagnostics, so UI gate state cannot drift from the Andrews logic authority frame.
- Selection-required output blocks remain Andrews route gates and do not get compared to a fake CNV core tense frame, so a missing user route does not self-audit as an unclassified tense.
- The UI cache was bumped for panels, rendering, composer, and CSS; focused UI coverage checks the metadata contract and extension/authority split.

## Completed Phase: Andrews 46.3.1.a Dedicated Route Builder v1

Date: 2026-06-21

Decision:

- Andrews §46.3.1.a now carries an ordered `puzzleStackTemplate.actionModel` for `(mich-namaka)`.
- The dedicated route-builder in the Andrews route browser starts from `(mich-namaka)` and advances one operation at a time: preterit `-0`, general-use preterit-agentive `-ka`, locative relational `-n`, adverbial zero connector `-0-`, and final Nawat/Pipil surface realization.
- The builder shows current formula, source evidence, route boundary, next operation, progress, and local back/reset controls.
- Generated conjugation rows no longer project §46.3.1.a route nodes, rules, branches, or route-action chips. Rows keep the compact formula/result chips while the route contract remains available for the dedicated builder.
- Focused coverage was updated in registry/UI tests; full `node scripts/run_tests.js` and `npm run check:data` pass.

## Completed Phase: Andrews 46.3.1.a Absolutive t/ti Route Operation

Date: 2026-06-21

Decision:

- The §46.3.1.a route builder now treats absolutive as one Nawat/Pipil `t/ti` allomorph operation, not separate `t` and `ti` route choices.
- The operation records `previous-non-zero-segment` as its selector and applies after either consonant-final or vowel-final previous non-zero material.
- The `(mich-namaka)` builder displays `-ka < absolutive t/ti` and `-n < absolutive t/ti`; edge-source traces resolve `ka -> t` and `n -> ti` without reintroducing split chips.
- Registry/UI coverage checks the connector family, consonant/vowel applicability, previous-nonzero selector, and dedicated builder metadata.

## Superseded Phase: Andrews 46.3.1.a Predicate-Nominal Row Guard

Date: 2026-06-21

Decision:

- This temporary guard was too strong and has been replaced by the predicate-nominal `t/ti` boundary correction below.
- The dedicated Andrews §46.3.1.a route builder remains the primary interaction for the `(mich-namaka)` route sequence.
- Future predicate-nominal source forms are not blocked when the NNC target can represent the correct structure: the source future `s` belongs inside the predicate stem and the absolutive subject connector resolves outside the parentheses as the single Nawat/Pipil `t/ti` operation.

## Completed Phase: Predicate-Nominal Future Source Absolutive t/ti Boundary

Date: 2026-06-21

Decision:

- Future `predicado-nominal` source predicates now keep source-tense `s` inside the NNC predicate stem, e.g. `#Ø-Ø(tamaka-s)ti#` and `#Ø-Ø(michnamakalu-s)ti#`.
- The absolutive subject connector is one `t/ti` operation selected from the previous non-zero predicate-stem segment after source `s` is appended; vowel-final stems still resolve `t`, consonant-final future stems resolve `ti`.
- Generated surfaces remain fused (`tamakasti`, `tanamakasti`, `michnamakalusti`) while formula metadata exposes the operation boundary inside the predicate stem.
- The generic predicate-nominal row no longer emits the `andrews-46-3-1-a-route-builder-required` block for `(mich)-(namaka)`; the dedicated route builder still owns the §46.3.1.a step-by-step route interaction.

## Superseded Phase: Predicate-Nominal Full VNC Source-Tense Inventory

Date: 2026-06-21

Decision:

- The full-app finite VNC source inventory was too broad for `predicado-nominal`.
- `presente-desiderativo`, `perfecto`, `pluscuamperfecto`, `condicional-perfecto`, and `condicional` are Nawat/Pipil finite extensions or app-level tense keys, not Andrews-only predicate-nominal source choices.
- This phase is replaced by the Andrews-only source-tense inventory below.

## Completed Phase: Predicate-Nominal Andrews Source-Tense Inventory

Date: 2026-06-21

Decision:

- `predicado-nominal` source tense selection is limited to the Andrews-attested VNC tenses: `presente`, `presente-habitual`, `imperfecto`, `preterito`, `pasado-remoto`, and `futuro`.
- Nawat/Pipil-only finite extensions such as `presente-desiderativo`, `perfecto`, `pluscuamperfecto`, `condicional-perfecto`, and `condicional`, plus mood keys such as `optativo`, do not appear in the predicate-nominal source picker and normalize through the existing default source tense if passed directly.
- Focused morphology coverage pins the Andrews-only inventory, the future `s` plus absolutive `t/ti` boundary, and fallback behavior for unsupported source-tense keys.

## Completed Phase: Lesson 1 Grammar OS Glossary v1

Date: 2026-06-15

Decision:

- Andrews Lesson 1 is now the visible grammar-OS layer for the app, not just hidden metadata.
- `core/concepts` remains diagnostic-only and non-generative while exposing the Spanish terms `CN` = `cláusula nuclear`, `CNV` = `cláusula nuclear verbal`, and `CNN` = `cláusula nuclear nominal`.
- The visible Lesson 1 glossary panel renders from the concept registry and explains notation, hierarchy, morpheme/morph/form, root/stem/stock, derivational vs inflectional affixes, and formula boundaries.
- Generated VNC/NNC results now carry the same Lesson 1 terminology in their diagnostic `nuclearClauseShell` / `grammarFrame.nuclearClauseFrame`: legacy `formulaType` stays `VNC`/`NNC` for compatibility, while `formulaAbbreviation`, `formulaLabel`, `displayLabel`, and `terminology` expose `CNV`/`CNN`.
- Root generation now treats `generateNuclearClauseSurface()` / `executeNuclearClauseSurfaceRequest()` as the canonical grammar-engine names, with `generateWord()` / `executeGenerateWordRequest()` kept as compatibility aliases. Generated route contracts carry the invariants that surface output is not grammar source, formula slot is not literal spelling, stem is not whole output, affix is not stem, derivation is inside the stem, inflection is outside the stem, and VNC/NNC are not words.
- Request and contract helpers now follow the same root: `normalizeNuclearClauseSurfaceOptions()`, `sanitizeNuclearClauseSurfaceOptions()`, `getNuclearClauseSurfacePosicionesFormula()`, `buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula()`, and `buildNuclearClauseSurfaceGrammarFrame()` carry the implementation bodies; the older `GenerateWord` helper names remain compatibility wrappers.
- Blocked-route diagnostics now use the canonical `nuclear-clause-surface` route family and `nuclear-clause-surface-*` diagnostic ids at the execution boundary; older `generate-word-*` ids are recognized only as compatibility no-output diagnostics.
- UI state, rendering, composer, and event handlers now call the canonical nuclear-clause surface entry points; `generateWord()` and `executeGenerateWordRequest()` remain only as compatibility facade functions.
- The active VNC executor now names its mutable slot state as `pers1Slot`, `obj1Slot`, `pers2Slot`, `poseedorSlot`, `baseObj1Slot`, `morphologyObj1Slot`, `troncoSlot`, and `troncoRender`; old `subjectPrefix`/`objectPrefix`/`subjectSuffix`/`verb` names remain only at compatibility call boundaries.
- Lesson 1 is marked implemented as a diagnostic glossary layer; it does not authorize Nawat/Pipil surfaces or Classical spellings.
- The foundations curriculum keeps Lessons 2-4 pending/partial while removing the old Lesson 1 visible-glossary gap.

## Completed Phase: LCM Grammar Frame Contract v1

Date: 2026-06-08

Decision:

- `src/core/grammar/frame.js` is the canonical least-common-multiple contract layer for generated/routed results.
- Engine outputs now preserve compatibility fields while also exposing the normalized envelope `ok`, `surface`, `frames`, and `diagnostics`.
- `frames` points to the canonical `grammarFrame`, whose slots are `authorityFrame`, `unitFrame`, `orthographyFrame`, `morphBoundaryFrame`, `stemFrame`, `nuclearClauseFrame`, `participantFrame`, `inflectionFrame`, `routeContract`, `astFrame`, `resultFrame`, and `diagnosticFrame`.
- VNC, ordinary NNC, and adjectival NNC execution routes now attach `grammarFrame`; direct adjectival NNC function builders attach the same contract for their supported and unsupported paths.
- UI/evaluation diagnostics now read route/result diagnostics, including `grammarFrame.diagnosticFrame`, before falling back to generic no-output labels.
- This is a bridge contract, not a module rename. Existing feature modules keep their local metadata while the shared frame provides the cross-route shape.

## Completed Phase: LCM Composition AST Frame Contract v1

Date: 2026-06-08

Decision:

- Non-generative clause/composition builders now preserve their existing AST payloads while also exposing the LCM envelope `ok`, `surface`, `frames`, and normalized `contractDiagnostics`.
- `buildAdjectivalModificationAst()`, `buildAdverbialAdjunctionAst()`, `buildComplementClauseAst()`, and `buildConjunctionClauseAst()` now attach a canonical `grammarFrame`.
- For these composition builders, `grammarFrame.astFrame` contains the original AST, `routeContract.routeStage` is `compose-ast`, and `routeContract.generationAllowed` remains `false` because these builders compose supplied clause/unit surfaces rather than generating new word forms.
- Existing string `diagnostics` arrays remain intact for compatibility; normalized diagnostic objects live in `contractDiagnostics` and `grammarFrame.diagnosticFrame`.

## Completed Phase: LCM Diagnostic Metadata Frame Contract v1

Date: 2026-06-08

Decision:

- Diagnostic-only boundary/classifier APIs now retain their compatibility metadata shape while exposing the LCM grammar frame contract through non-enumerable `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics` properties.
- The shared helper is `attachGrammarMetadataContract()` in `src/core/grammar/frame.js`; it builds authority/evidence, unit, orthography, morph-boundary, stem, nuclear-clause, route, result, and diagnostic frames for metadata routes that are not word generators.
- Wrapped routes include adverbial nuclear clauses, comparison, calendar-name metadata, compound/affective NNC metadata, nominalization metadata, numeral NNC metadata, relational NNC metadata, place/gentilic NNC metadata, and personal-name NNC metadata.
- Usage-frame builders for adverbial, relational, and place/gentilic structures now expose stem/nuclear frames while keeping `generationAllowed: false`.
- This phase does not add new Nawat surfaces or promote Andrews Classical examples into Nawat output; it only makes the existing diagnostic/source-gated metadata pass through the same LCM frame contract.

## Completed Phase: LCM UI Frame Inversion v1

Date: 2026-06-08

Decision:

- UI rendering now has a shared `buildGrammarFrameSubLabels()` / `appendGrammarFrameSubLabels()` reader that consumes the canonical `grammarFrame` contract and emits user-facing labels in inverted UI order: result/status, route state, Andrews evidence, Nawat realization, and diagnostics.
- Major conjugation row sublabels now append compact LCM frame labels from `evaluation.result` / `result`, including VNC rows, nonactive rows, nominal/adjectival/adverbial rows, ordinary NNC rows, locative/relational rows, and direct adjectival NNC function rows.
- `applyConjugationEvaluationPresentation()` now writes row-level LCM data attributes for route family, route stage, generation permission, evidence status, and diagnostic status, so HTML/CSS/automation can read frame status without reverse-engineering display text.
- `buildConjugationEvaluationRecord()` now reads diagnostics from `result.frames.diagnosticFrame` and `result.contractDiagnostics` in addition to compatibility result diagnostics.
- This phase is UI/contract plumbing only. It does not add generated surfaces or grammar licenses.

## Completed Phase: LCM Denominal Route Preview Frame Contract v1

Date: 2026-06-08

Decision:

- Denominal Andrews contract route previews, stem routes, finite-generation requests, activations, next-source previews, and linked grammar path stage requests now expose non-enumerable LCM frames.
- The route frames record Andrews Lessons 54-55 authority, source evidence, suffix orthography bridge, target stem class, source-final diagnostics, and finite-generation gates.
- Linked path stage generation requests now return their request object and expose the same route-stage frame contract before execution.
- This phase does not add Nawat surfaces or promote Andrews Classical examples into Nawat output; it keeps preview routing separate from finite generation.

## Completed Phase: LCM Early/Boundary Metadata Frame Contract v1

Date: 2026-06-08

Decision:

- Early and boundary-only metadata routes now expose non-enumerable LCM frames without changing their compatibility JSON-visible payloads.
- Wrapped routes include Lesson 1 concepts, Lesson 3 particles, Lessons 8-10 sentence-layer metadata, Lesson 27 frequentative boundary metadata, Lesson 29 purposive/directional metadata, Lesson 33 honorific/pejorative metadata, and Lessons 57-58 analysis/miscellany metadata.
- The frames keep generation blocked at the contract layer (`generationAllowed: false`) and identify the failed or diagnostic layer before any UI can collapse the result into a generic empty-generation message.
- This phase adds no Nawat/Pipil surfaces, fixtures, or Classical example imports.

## Completed Phase: LCM Orthography and Nuclear Shell Frame Contract v1

Date: 2026-06-08

Decision:

- Orthography conversion/classification routes now expose LCM frames with `orthographyFrame` populated from the Classical-to-Nawat/Pipil spelling bridge.
- Classical grammar-rule spellings can be converted to Nawat/Pipil letters through the bridge while remaining explicitly non-lexical and non-generative.
- Nuclear-clause shell metadata now exposes LCM frames with `nuclearClauseFrame`, participant slots, and VNC/NNC tense-position boundaries.
- This phase adds no new generated forms; it records Lesson 2 orthography and Lesson 4 nuclear-clause architecture as contract layers that later generators and UI diagnostics can read.

## Completed Phase: LCM VNC Allomorphy Source Contract Frames v1

Date: 2026-06-08

Decision:

- VNC allomorphy source contracts now expose non-enumerable LCM frames while preserving their existing JSON-visible payloads.
- Wrapped contracts include the active-action nominalizer, patientive nonactive source suffixes, patientive source-stage frames, perfective active-core ending gates, imperfective active-core source-stem contracts, root/stock patientive contracts, and multiple-patientive-derivation procedure contracts.
- These frames route the Andrews Lessons 37-39 source contracts through `orthographyFrame`, `stemFrame`, `morphBoundaryFrame`, and `routeContract` without changing generated surfaces.
- `rg` now finds no `generationAllowed: false` core/UI route file that lacks grammar-frame contract plumbing.

## Completed Phase: LCM UI Route Control Contract Frames v1

Date: 2026-06-08

Decision:

- Adjectival NNC continuation chips now carry compact LCM route data attributes from the generated contract before click handling: Andrews authority ref, evidence status, unit kind, route family/stage, generation permission, diagnostic status, and result status.
- `applyAdjectivalNncFunctionToVerbEntry()` now preserves a compact `adjectivalNncFunctionContract` on the visible verb input, and `resolveAdjectivalNncFunctionOverrideFromInput()` carries that contract into the `adjectivalNnc` override before generation.
- The explicit adjectival-function renderer no longer falls back to the default adjective/noun combo block when the input itself still carries a valid adjectival NNC entry contract; it renders the `adjetivo-nnc-funcion` block with route-frame data instead.
- Linked grammar path next-source previews, chain previews, chain executions, selection summaries, selection states, append/backtrack states, and promoted-source states now expose non-enumerable LCM frames. The visible route controls remain user-action-first, while the JS contracts preserve Andrews Lessons 54-55 authority and route-stage status.
- This phase adds no new Nawat surfaces or Andrews/Classical example imports. It only keeps UI controls and JS route execution attached to the same canonical contract layer.

## Completed Phase: LCM Generate Runtime No-Output/Error Contract Frames v1

Date: 2026-06-08

Decision:

- The shared grammar-frame result contract now normalizes the current no-output marker `—` to a blank contract `surface`, so blocked generation is not treated as an actual surface form.
- Forward-derivation no-stem masks now preserve their compatibility `{ result: "—", surfaceForms: [] }` payload while exposing non-enumerable `grammarFrame`, `ok`, `surface`, and `frames` contract fields plus blocked-route diagnostics.
- `executeGenerateWordRequest()` validation errors and skip-validation no-output gates now return the same LCM contract layer: route family/stage, unit kind, generation permission, result status, and diagnostics are available before UI rendering collapses the row into a generic empty-generation message.
- The raw-input final-vowel gate, raw stem-syllable gate, active-adjective transitive gate, and forward-derivation no-stem gate now fail with route-layer diagnostics rather than bare `—` payloads.
- Public generation returns from blocked morphology application and patientivo possessive-suffix failure are now wrapped at the `executeGenerateWordRequest()` boundary; lower-level morphology helpers keep their internal `{ error: true }` signals.
- This phase adds no new Nawat surfaces, no new Andrews/Classical examples, and no new grammar license. It only wraps existing generator failure paths with the canonical LCM contract.

## Completed Phase: LCM Verb-Derived Nominal Direct Route Contract Frames v1

Date: 2026-06-08

Decision:

- Direct verb-derived nominal generators now expose non-enumerable LCM frames while preserving their visible payloads.
- Wrapped direct routes include `getInstrumentivoResult()`, `getCalificativoInstrumentivoResult()`, and `getLocativoTemporalResult()` for both generated and blocked outputs.
- The frames identify the nominal nuclear-clause unit, verb-derived nominal route family, route stage, Andrews references, Nawat/Pipil spelling authority, source model, stem entries, subject-number connector, possessor metadata, result status, and blockers.
- Public `generateWord()` already wraps these routes through morphology execution; this phase covers the direct route APIs used by tests, panels, rendering probes, and browser checks.
- This phase adds no new Nawat surfaces and imports no Classical examples. It only attaches contract frames to existing direct nominal routes and blocked direct-route results.

## Completed Phase: LCM Morphology Application Contract Frames v1

Date: 2026-06-08

Decision:

- `applyMorphologyRules()` now exposes non-enumerable LCM frames on successful and blocked morphology-application results while preserving its visible payload.
- Successful morphology applications identify the morphology route, unit kind, inflection tense, participant prefixes/suffixes, stem, source raw verb, route stage, result stem surface, and Nawat/Pipil spelling authority.
- Blocked morphology applications now return the same contract layer instead of bare `{ error: true }`; each blocked branch records a route stage and diagnostic id before public generation collapses the result to a broader no-output error.
- Wrapped blocked branches include verbal-nominal stem candidates, patientive adjective gates, patientive source/marker gates, preterit-agentive source forms, potential active source forms, direct verb-derived nominal route handoff, and active-adjective wrapper forms.
- This phase adds no new Nawat surfaces and imports no Classical examples. It only attaches contract frames to existing morphology application decisions.

## Completed Phase: LCM Agreement Builder Context Contract Frames v1

Date: 2026-06-08

Decision:

- `buildVerbDerivedNominalBuilderContext()` now exposes non-enumerable LCM frames on successful and blocked builder-context results while preserving its visible payload.
- Blocked context gates now carry route-stage diagnostics for invalid input, invalid stem shape, nonanimate-subject requirements, object-slot mismatch, forward-derivation failure, and missing forward stem contexts.
- Successful context frames identify the agreement-builder unit, source VNC to nominal-NNC route, participant/object slots, nominal kind, no-tense nominal boundary, source/forward stems, Andrews references, and context-ready status.
- This phase adds no generated Nawat surfaces and imports no Classical examples. It only prevents direct builder-context calls from collapsing into bare `{ error: true }` before the UI/engine can see the failed LCM layer.

## Completed Phase: LCM Preterit Class Output Contract Frames v1

Date: 2026-06-08

Decision:

- `buildClassBasedResultWithProvenance()` now exposes non-enumerable LCM frames on generated and blocked preterit/perfective class-output results while preserving the compatibility `{ result, forms, provenance }` payload.
- `buildPretUniversalResultDetailedFromVariants()` now exposes the same contract layer on variant-assembly results while preserving the compatibility `{ result, forms }` payload.
- Generated frames identify the VNC unit, preterit class route, Andrews Lesson 7 verbstem-class authority, Nawat/Pipil spelling authority, class/profile provenance, participant slots, tense, and surface forms.
- Blocked class selections now normalize the dash marker to blank contract `surface` while retaining the visible `result: "—"` payload and exposing a route-stage diagnostic before UI fallback text runs.
- Bare public/internal preterit `{ result, forms }` returns are now removed; direct variant assembly can identify its failed LCM source layer before callers destructure the result.
- This phase adds no Nawat surfaces and imports no Classical examples. It only wraps existing class-output assembly in the same LCM contract layer used by other generator routes.

## Completed Phase: LCM Derivation Continuation Route Control Contract Frames v1

Date: 2026-06-08

Decision:

- Derivation continuation contract builders now expose non-enumerable LCM frames while preserving their existing JSON-visible payloads.
- Wrapped continuation previews include patientivo prelocative, patientivo compound/embed, patientivo nominal compound, patientivo characteristic-property embed, active-action compound/embed, active-action nominal compound, customary-agentive compound/embed, customary-agentive nominal compound, preterit-agentive compound/embed, preterit-agentive nominal compound, preterit-agentive ownerhood, preterit-agentive complement, preterit-agentive adverbial, and ordinary NNC ownerhood continuation contracts.
- Supported continuation contracts report `routeFamily: "derivation-continuation"`, `routeStage: "preview-continuation"`, generation allowed, source/target inputs, Andrews references, and empty contract surfaces because the chip is a route preview rather than a generated surface.
- Blocked continuation contracts report the same failed LCM route layer with blocked diagnostics, so UI/engine code can identify the failed source layer before any generic empty-generation fallback.
- Contract-backed linked continuation chips now copy compact `data-grammar-*` route attributes from their contract frames before click handling. This keeps JS route controls aligned to the canonical LCM layer without mirroring lessons or renaming modules.
- This phase adds no Nawat surfaces and imports no Andrews/Classical examples. It only keeps continuation routing and UI controls attached to the shared contract frame.

## Completed Phase: LCM UI Row Promotion Route Control Frames v1

Date: 2026-06-08

Decision:

- Row-level linked promotion chips now project LCM route data before click handling.
- Generated-result row controls copy the generated result frame: verb-to-nominal continuations, action-noun source-subject possessor promotions, and instrumentive source-subject possessor promotions now expose compact `data-grammar-*` attributes from their target result.
- Denominal Andrews route controls copy their existing route frames: generated ordinary-NNC included-possessor `ti`, possession `ti`, and generic denominal Andrews continuation chips now expose authority, evidence, route stage, generation permission, and result status datasets.
- UI-only patientivo and patientivo-tronco conversion tracks now receive non-enumerable route-control frames before rendering. Patientivo V→S controls record Lessons 38-39 authority; patientivo-tronco denominal controls record Andrews Lessons 54-55 when the static route has an Andrews suffix analogue, and explicitly expose Nawat-only route status when the static route has no Andrews suffix contract.
- All linked-promotion button blocks in `src/ui/rendering/rendering.js` now call `applyGrammarFrameRouteDataset()` before appending the button, so HTML/CSS/automation can read the same LCM route layer that JS uses to route.
- This phase adds no new generated forms and imports no Andrews/Classical examples. It only exposes existing row-promotion routes through the shared frame contract.

## Completed Phase: LCM Static Nawat Route Target Frames v1

Date: 2026-06-08

Decision:

- Static Nawat route target objects now expose non-enumerable LCM frames while preserving their existing visible shape.
- `resolveNawatRouteTarget()` now returns route targets with `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics`; the frame records source mode/tense/stem, target mode/tense/stem, route placement, verbalizer/suffix boundary, participant object transfer, static-mode evidence, and route-stage status.
- `getActiveNawatRouteProfile()` and `setActiveNawatRouteProfile()` now return active route profiles with the same route-control frame, so route state reads no longer depend on rendering to infer the LCM layer.
- `activateNawatRouteStation()` wraps the selected station target before storing it, keeping chip-triggered route activation aligned with the static route target contract.
- Patientivo V→S route targets record Andrews Lesson 38 for passive/impersonal patientive sources and Andrews Lesson 39 for active patientive sources. Patientivo-tronco denominal route targets record Andrews Lessons 54-55 only when the configured static route has an Andrews suffix analogue; Nawat-only static routes such as `-na` keep empty Andrews refs and explicit `nawat-route-no-andrews-suffix` evidence status.
- This phase adds no generated forms and imports no Andrews/Classical examples. It makes existing static route helpers expose the same LCM contract layer that UI controls now project.

## Completed Phase: LCM Static Nawat Route Surface Result Frames v1

Date: 2026-06-08

Decision:

- Static Nawat route surface helpers now have framed result APIs while preserving the existing string-return helpers for current string callers.
- `getNawatRouteSourceSurfaceResult()`, `getNawatVerbNounConversionNominalSurfaceResult()`, and `getNawatRouteFiniteSurfaceResult()` return route-surface result contracts with non-enumerable `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics`.
- String helper wrappers `getNawatRouteSourceSurfaceForm()`, `getNawatVerbNounConversionNominalSurfaceForm()`, and `getNawatRouteFiniteSurfaceForm()` now read `.surface` from those framed result contracts, so current string callers keep their behavior while the JS route layer can use the LCM shape.
- Generated route-surface frames record source/target mode and tense, route placement, suffix/verbalizer boundary, participant object transfer, static-mode evidence, route stage (`source-surface`, `nominal-surface`, `finite-surface`, blocked, or fallback), result surface, and diagnostics.
- Patientivo source and nominal surfaces keep Andrews Lesson 38/39 authority through the static route frame. Denominal finite surfaces keep Andrews Lessons 54-55 only for configured suffix analogues and keep Nawat-only status where the route has no Andrews suffix contract.
- This phase adds no generated forms and imports no Andrews/Classical examples. It only changes route-surface helper contracts so callers can inspect the failed/generated LCM layer before reducing the result to a string.

## Completed Phase: LCM Output Provenance Result Frame Contract v1

Date: 2026-06-08

Decision:

- Output provenance helpers now expose non-enumerable LCM frames while preserving their visible provenance payloads.
- `buildProvenanceVariantEntry()` returns variant records with `grammarFrame`, `frames`, `ok`, `surface`, and `contractDiagnostics` contract fields; `getProvenancePrimaryStemSurface()` remains the string reader.
- `buildForwardDerivationProvenance()` now records the generated/blocked provenance result in `grammarFrame.resultFrame.provenance`, with route family `output-provenance`, stem provenance, tense/derivation metadata, and missing-stem diagnostics before any caller collapses the output to a bare provenance object.
- Generic stem-variant provenance cites Andrews Lesson 7 only. Causative forward provenance adds Andrews Lesson 24 only when the derivation route is actually causative. The checked Lesson 37 deverbal-nounstem wording is not claimed by this generic output-provenance wrapper.
- This phase adds no generated Nawat surfaces, no Classical examples, and no new grammar license. It only wraps existing provenance/source-stem records in the canonical result-frame contract.

## Completed Phase: LCM Output Surface Result Frame Contract v1

Date: 2026-06-08

Decision:

- Output surface assembly now has framed result APIs while preserving the existing string-return helpers for current string callers.
- `buildOutputWordResult()` and `buildNominalOutputResult()` return visible `{ surface, segments }` payloads with non-enumerable `grammarFrame`, `frames`, `ok`, and `contractDiagnostics`.
- String helper wrappers `buildOutputWordText()` and `buildNominalOutputText()` now read `.surface` from those framed results, so string callers keep their behavior while the JS route layer can inspect output-surface status before reducing the result to text.
- Output-surface frames record Andrews Lesson 2 orthography/syllable authority, Lesson 4 nuclear-clause slot/layer authority, Nawat/Pipil spelling authority, segment roles, participant prefixes/suffixes, nominal suffixes, and the realized result surface.
- This phase adds no generated Nawat surfaces, no Classical examples, and no new grammar license. It only wraps existing output-surface assembly in the canonical result-frame contract.

## Completed Phase: LCM Evaluation Diagnostic Contract Reader v1

Date: 2026-06-08

Decision:

- Conjugation evaluation now treats contract surfaces as renderable output, not only compatibility `result.result` strings.
- `buildConjugationEvaluationRecord()` and `getConjugationMaskState()` now read `result.surface`, `grammarFrame.resultFrame.surface`, route blocking diagnostics, frame diagnostics, and `contractDiagnostics` before falling back to no-output state.
- Result-error mask states now prefer Andrews/LCM route diagnostics over the generic `La generacion no produjo una forma.` label when a frame already identifies the blocked route layer.
- When a blocked frame has no explicit diagnostic, evaluation synthesizes a route-layer diagnostic with route family/stage and Andrews authority refs when present.
- This phase does not add generated forms or grammar licenses. It changes UI/evaluation routing so unsupported framed routes can surface an Andrews/LCM reason before generic empty-generation text.

## Completed Phase: LCM UI Result Surface Reader v1

Date: 2026-06-08

Decision:

- UI rendering now reads framed result surfaces before compatibility output strings when collecting forms for rows and continuation controls.
- `getConjugationSurfaceForms()` now prefers `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, and `result.surface` before falling back to compatibility `surfaceForms` and `result.result`.
- `applyConjugationEvaluationPresentation()` now falls back to the framed contract surface when callers pass a blank compatibility `formattedValue`, so contract-shaped routes do not collapse into generic no-output text merely because they lack `result.result`.
- The nested patientivo/tronco continuation surface collector now uses the same framed surface reader, keeping linked adjective/sustantivo/verbo promotion controls aligned with the LCM result frame.
- This phase adds no generated forms or grammar licenses. It only makes UI display/continuation routing consume the same contract surface that the engine already produced.

## Completed Phase: LCM UI Source Evidence Dataset Projection v1

Date: 2026-06-08

Decision:

- Reusable UI route dataset projection now exposes compact source-evidence details from the canonical `grammarFrame`.
- `applyGrammarFrameRouteDataset()` now writes all Andrews refs, Nawat evidence refs, source-evidence kind/status, source-evidence target authority, evidence source label, and true boundary flags in addition to the existing route/status/result fields.
- Linked route chips, promoted result controls, and tense blocks that already call `applyGrammarFrameRouteDataset()` can now be inspected by HTML/CSS/automation for the same authority/source-evidence layer the JS route used.
- This phase adds no generated forms, no Classical examples, and no grammar license. It only makes existing UI controls expose the authority/source-evidence contract layer instead of requiring callers to reverse-engineer it from labels or route ids.

## Completed Phase: LCM Andrews 55 Explicit Source Result Frame Boundary v1

Date: 2026-06-08

Decision:

- Andrews 55 explicit denominal source-evidence builders now read canonical result-frame surfaces before source aliases.
- `buildNawatDenominalAndrewsTemporalTiaSourceEvidence()`, `buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence()`, and `buildNawatDenominalAndrewsRelationalCompoundSourceEvidence()` now preserve framed source surfaces and treat an empty `resultFrame` as authoritative.
- Stale `sourceStem`, `sourceSurface`, top-level `surface`, or `result` aliases no longer revive source evidence for these source-limited route previews when a result frame exists but has no surface.
- This phase adds no generated Nawat surfaces, no Classical examples, and no new grammar license. It only keeps explicit Andrews 55 source previews aligned with the LCM frame reader order before finite route requests are built.

## Completed Phase: LCM Linked Path Execution Source Result Frame Boundary v1

Date: 2026-06-08

Decision:

- Linked grammar path execution source promotion now treats an empty generated `resultFrame` as authoritative.
- `getNawatLinkedGrammarPathExecutionSourceOptions()` continues to preserve generated result-frame surfaces before compatibility generated result text, but no longer falls back to stale `nextSource` or `selectedStage` fields when the generated step carries a result frame with no surface.
- Final-source and selected-step promotion inherit this guard because they consume the shared execution source-option reader.
- This phase adds no generated forms, no new route families, and no Classical examples. It only prevents linked-route source promotion from bypassing the generated result contract.

## Completed Phase: LCM Route Source-State Station Result Frame Boundary v1

Date: 2026-06-08

Decision:

- Static Nawat route source-state metadata now reads stem-station surfaces through the frame-aware station surface reader before using compatibility station or target fields.
- `resolveNawatRouteSourceStateMetadata()` preserves framed stem-station surfaces in both `sourceSurface` and the nested denominal family profile.
- If the stem station carries an empty `resultFrame`, source-state metadata no longer falls back to stale station `inputValue`/`surface`, route-target `sourceStem`, or explicit `sourceStem`.
- This phase adds no generated forms, no new route families, and no Classical examples. It only keeps route preview/source-state metadata aligned with the canonical station/result frame boundary.

## Completed Phase: Ordinary NNC Class/Source Split

Date: 2026-06-05

Decision:

- `nounClass` is only a grammar class: `t`, `ti`, `in`, or `zero`.
- `lexical` and `open` are not nounstem classes.
- Fixture-backed and dynamic/open-stem status belongs in source metadata, not `nounClass`.
- Ordinary NNC generation remains explicit opt-in.
- UI labels should say predicate class, subject, possessor, reference, and plural rather than collapsing those roles into one connector label.

## Completed Phase: Ordinary NNC Formula Slots

Date: 2026-06-05

Decision:

- `formulaSlots` is the structured source of truth for the teaching formula `#pers1-pers2(STEM)num1-num2#`.
- The visible `Fórmula CNN: #...#` row text is derived from `formulaSlots`; it is not used for generation.
- `pers1-pers2` maps to subject person prefix/suffix metadata.
- `STEM` maps to the predicate stem and predicate state metadata.
- `num1-num2` maps to the subject-number connector slot, with noun class kept separately as `clase Ø/t/ti/in`.
- Andrews structural absolutive connector dyads stay Classical in formula evidence (`tl-0`, `tli-0 ~ li-0`, `in-0`, `0-0`, plural `t-in`, `m-eh`, `0-h`); Nawat/Pipil `t/ti` and `-t` spellings are orthography-bridge realization, not formula-source spellings.
- The `other NNC(s)` PDF search evidence is recorded in the formula inventory as an evidence index and does not create a new ordinary NNC generation gate; printed p. 294 / PDF p. 309 separately feeds the scoped Lesson 32 `pil` child/noble NNC-side output generator.
- No Nawat surface forms or routing behavior changed.

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
- The slot-scoped Classical-to-Nawat/Pipil NNC realization table is now explicit: `tl-0 -> t-0`, `tli-0 ~ li-0 -> ti-0`, `m-eh -> m-et`, `0-h -> 0-t`, `st=tla -> ta`, and specific possessor dyads such as `n-o -> n-u`, `t-o -> t-u`, `m-o -> m-u`, `am-o -> anm-u`, `i-m/i-n... -> i-n/i-nh`. These are orthography/slot realizations, not replacements for Andrews formula-source spellings.

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
- Lesson 3 now has diagnostic-only particle-placement metadata, an Andrews-derived seed inventory adapted through the Nawat/Pipil orthography bridge, and a visible diagnostic Partícula mode through `core/particles`.
- Broader formula UI remains placeholder or missing; the visible Partícula mode is not a generation engine.
- Lesson 2 has partial modern Nawat phonology/syllable support.
- Lesson 2 now has an orthography bridge metadata layer for Classical-looking spelling correspondences.
- The orthography bridge is diagnostic-only: it exposes profile/correspondence/blocker metadata and calculator status messages, and never authorizes generation.
- Appendix F is now treated as partial because the diagnostic bridge exists, but there is still no Appendix F spelling normalizer or fixture-backed alias data.
- Lesson 4 now has diagnostic-only VNC/NNC nuclear-clause shell metadata through `core/clause`.
- The clause shell is visible in the calculator summary and generated output row labels; it never drives generation.
- Current phonology support is not full Classical orthography, vowel length, or Appendix F spelling normalization.
- No confirmed local particle inventory, particle generation, complete clause/sentence engine, or static formula registry exists yet.
- Current VNC and NNC formula metadata should not be treated as a complete clause engine.
- Do not import Andrews/Classical spelling, particles, or clause examples as confirmed Nawat/Pipil behavior without local evidence or user-provided data. User-approved Lesson 3 transfers stay marked Andrews-derived and orthography-adapted.

Future path:

1. Decide how `core/concepts` entries should be exposed in a visible glossary UI.
2. Keep modern phonology separate from Classical/Appendix F orthography.
3. Keep orthography bridge output non-generative unless confirmed Nawat/Pipil evidence authorizes a specific future behavior; Appendix F remains incomplete until Appendix F spelling data and normalization behavior exist.
4. Promote particle data or add particle generation only from confirmed local examples; keep visible Partícula mode diagnostic until then.
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
- Diagnostic CNV/VNC `nuclearClauseShell.formulaSlots` records subject, object, predicate, and tense slots; `Fórmula CNV` is derived display only.
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
- Lesson 29 now has a scoped Andrews outbound/inbound purposive target-stem generator plus directional/purposive boundary metadata. Lessons 31-32 have diagnostic compound/affective NNC boundary metadata only. Lesson 33 now has a scoped Andrews preterit-embed target-stem generator plus honorific/pejorative boundary metadata. Lesson 34 and Appendix D have diagnostic numeral-NNC boundary metadata plus scoped basic cardinal one-through-four generation.
- Current `compoundAst` metadata is additive parser metadata for matrix, embed, source, valency, and flags. It is not a complete compound generation engine.
- Generated VNC rows for accepted compound inputs may expose diagnostic `compoundFrame` metadata derived from `compoundAst`; rendering may show `Compuesto VNC` and `Incrustado`, without changing generated surfaces.
- Current ordinary NNC fixture classifications can identify lexical embeds such as `shuchi` or `a`, but that does not implement compound NNC generation, affective NNC generation, or numeral NNCs.
- Current Lesson 29 logic records the boundary between directional prefix mechanics and purposive VNC evidence, and it generates scoped outbound/inbound target stems from Andrews direction, mood, tense, number, and source-stem slots through the orthography bridge.
- Current Lessons 31-32 metadata records the boundary between VNC `compoundAst`/ordinary NNC fixtures and confirmed compound or affective NNC evidence. It does not generate forms or change ordinary NNC/VNC output.
- Current Lesson 33 logic records the boundary between ordinary VNC derivation, person labels, translation tone, and honorific/pejorative evidence, and it generates scoped preterit-embed target stems from supplied preterit predicate stems plus Andrews `tzin-o-a` or `pol-o-a` matrices through the orthography bridge.
- Current Lesson 34/Appendix D metadata records the boundary between ordinary NNC open-stem output, UI number labels, Appendix D headings, and numeral-NNC generation. It can generate the Andrews basic simple-count stems `ce`, `ome`, `eyi`, and `nahui` through the orthography bridge as `se`, `ume`, `eyi`, and `nawi`; broader numeral behavior remains diagnostic and ordinary NNC output is unchanged.
- Do not force compound NNC, affective, or numeral behavior into ordinary NNC `formulaSlots`.
- Do not treat parser punctuation, slash/dash syntax, UI composer embeds, or Appendix D labels as Nawat/Pipil fixture evidence.
- Do not import Andrews/Classical compound, purposive, affective, honorific, pejorative, or numeral examples as Nawat/Pipil forms.

Future path:

1. Keep current `compoundAst` as parser metadata unless a future target explicitly broadens compound generation.
2. Add status/metadata tests for current Lesson 28/30 parser support before broadening behavior.
3. Extend `core/vnc/purposive` beyond the current Andrews target-stem route only when a future explicit target covers the remaining finite-output, passive/impersonal embed, compound-stemmed embed, or external-directional contracts with tests.
4. Keep `core/nnc/compound` non-generative until confirmed Nawat/Pipil compound-NNC or affective examples justify data, schema, generation, or UI.
5. Extend `core/vnc/honorific_pejorative` beyond the current Andrews preterit-embed target-stem route only when a future explicit target covers route choice, reverential doubling, compound-verbstem targeting, or full finite UI expansion with tests.
6. Extend `core/nnc/numerals` beyond the current basic one-through-four generator only when a future explicit target covers the remaining Andrews numeral contracts with focused tests.
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
- The profile follows Andrews Lessons 37.9-39 as engine grammar: passive core, impersonal core, perfective active core, imperfective active core, and root/stock. Explicit `passive` and `impersonal` patientivo source requests now preserve those source-core categories; the shared `nonactive` branch remains marked as passive + impersonal.
- Perfective patientivo source gating now uses `patientive-perfective-source-ending-contract` for Andrews 39.1 instead of a plain suffix set. The contract accepts only the Andrews source-core endings after Nawat orthography realization (`w`, `k`, `kw`, `s`, `sh`, `n`, `h/j`, `l`, `tz`) and keeps disallowed endings such as `t` and `ch` blocked; generated rows carry the contract in `patientiveSourceStageFrame`.
- Imperfective patientivo generation now uses `patientive-imperfective-source-stem-contract` for Andrews 39.2. The contract records the imperfective active source, Andrews ti-class target, and Nawat `t/ti` connector family; the current output connector is derived from that contract and surfaced in `patientiveSourceStageFrame`.
- Root/stock patientivo generation now uses `patientive-root-stock-source-contract` for Andrews 39.4. The contract records the root-or-stock source core, tli-class target, Nawat `t/ti` connector family, and Classical `c/x/z/ch` variants through the Nawat orthography bridge as `k/sh/s/ch`; generated rows carry the selected output surface in `patientiveSourceStageFrame` without adding new forms.
- Multiple patientive derivation now uses `patientive-multiple-derivation-contract` for Andrews 39.5. Generated patientivo output probes the current input against implemented patientive procedures, records which procedures are available, and keeps synonymy or idiomatic translation value diagnostic instead of merging outputs.
- Explicit passive/impersonal patientivo sources currently realize through the shared Nawat nonactive builder, so the grammar category is no longer collapsed even where Nawat surface realization is shared.
- Compound-source patientivo outputs now preserve their parsed source compound in `patientiveCompoundSourceFrame`, following Andrews 41.2.3's warning that matching patientive surfaces may require underlying compound-source evidence to distinguish passive and impersonal analyses.
- Andrews 36.2-36.3 now has an actual `agentivo` connector contract: generated output keeps Nawat surfaces such as `nemini/tineminimet`, but `ni` is represented inside the predicate stem and the NNC connector is `Ø/met/wan`. The §36.3 fully nominalized customary-agentive stem can now feed the first nominal compound continuation from `#3 salida` (`nemini` + `kal` -> `(neminikal)` -> `neminikal`) as an open-stem ordinary NNC output action, and the first data-backed verbal compound matrix (`tuka`) as a real VNC action (`nemini` -> `-(nemini/tuka)` -> `kineminituka` with outside object `ki`).
- Andrews 36.7 now has an opt-in `agentivo-presente` contract: generated output reanalyzes the Nawat present predicate as the NNC stem (`nemi`, `tamati`), remains absolutive-only, and keeps the present source number connector in `num1-num2`.
- Andrews 35.3/35.5-35.12 now has an opt-in `agentivo-preterito` contract: generated output reanalyzes the Nawat preterit predicate inside the NNC stem with Andrews' zero visible (`nenki` as `#Ø-Ø(nen-0)ki-0#`, `tamatki` as `#Ø-Ø(tamat-0)ki-0#`), keeps preterit connector dyads in `num1-num2` (`ki-0`, `k-0`, `k-et`), uses the general-use Nawat `-ka` matrix inside the stem with `w-0/w-an` connectors for possessive-state probes (`ninumikikaw` as `#ni-Ø+nu(miki-0-ka)w-0#`), and derives the 35.7 general-use compound surface stem dynamically in `#3 salida` row actions for data-backed verbal/nominal matrices such as `tzajtzi` and `kal`. The same output-stage stem now feeds Andrews 35.9-35.10 ownerhood/abundant-ownerhood VNC matrices as real generated inputs (`(tamatka)-(wa)`, `(tamatka)-(yua)`) using Nawat `waj/yuj` orthography, Andrews 35.12 incorporated-complement VNC matrices with an outside object slot (`(tamatka/mati)` -> `kitamatkamati`, `(tamatka/talia)` -> `kitamatkatalia`), and the first Andrews 35.12 adverbial-manner matrix (`(tamatka/nemi)` -> `tamatkanemi`). Ordinary NNC output rows also feed first class-compatible ownerhood continuations from their generated nounstem: `t` -> `e/ej`, `zero/in` -> `wa/waj`, and abundant -> `yua/yuj`, while `ti` ownerhood remains diagnostic until subclass evidence is confirmed.
- Andrews 36.8 now has an opt-in `agentivo-futuro` contract: generated restricted-use output keeps future `s` inside the predicate stem with NNC connector `ki/ket`, while possessive-state probes use the general-use `-ka` matrix with Nawat `w/wan` connectors.
- Andrews 36.5 now has an actual generation contract in `potencial-habitual`: source reflexive `mu` maps to shuntline `ne`, single projective sources stay absent from the nounstem, double-projective sources keep exactly the selected projective (`ta+te` -> `tamachuni/tamatuni/tamatiluni`; `te+ta` -> `temachuni/tematuni/tematiluni`), and possessive-state probes remain absolutive.
- Andrews 36.6 now has an actual `instrumentivo` generation contract: absolutive output reads the customary-present impersonal/nonactive source, possessive output reads the imperfect active source, the source-tense `ni/ya` belongs inside the predicate stem rather than the NNC subject connector, explicit possessive-mode requests can transform the source VNC subject into a Nawat possessor (`ni` -> `nu`, `ti` -> `mu`, `Ø` -> `i`, `ti...t` -> `tu`, `an...t` -> `anmu`, `Ø...t` -> `in`), `#3 salida` rows expose those generated possessive continuations dynamically, and source reflexive `mu` maps to shuntline `ne` in both states.
- Andrews 36.12 is now represented as engine metadata, not a route label: `nominalizationProfile.possessorSourceFrame` records whether a possessive nominal's possessor came from the source VNC subject (`calificativo-instrumentivo` active/passive action general-use) or was imported externally while the source/NNC subject stayed in the subject slot (`agentivo-preterito` possessive general-use).
- Andrews 39.6 patientive compound continuations now expose `formationFrame` metadata: the generated `#3 salida` patientive nounstem is the compound embed, the matrix is the data-backed Nawat root, verbal continuations produce a VNC input, nominal continuations produce an open-stem ordinary NNC input, and neither path creates new fixture evidence.
- Andrews 39.7-39.8 prelocative patientive continuations now expose `formationFrame`: 39.7 uses the generated patientive nounstem as object-complement and transfers the absolutive NNC subject to the outside object slot; 39.8 uses the generated patientive nounstem as incorporated object and transfers the possessive NNC possessor to the outside object slot without adding an applicative suffix.
- Andrews 40.3 now has an opt-in VNC adjectival-function contract: a generated VNC surface from `#3 salida` can be re-routed as adjectival function while preserving the surface and VNC shell, without creating ordinary NNC `formulaSlots` or a modifier/head AST.
- Andrews 41.1 now has an opt-in intensified adjectival NNC contract: the route consumes generated `formulaSlots` from `#3 salida`, reduplicates the predicate stem in Nawat orthography, keeps the connector outside the predicate, and records that this is not Lesson 27 frequentative generation or a modifier/head AST.
- Andrews 42-43 now has a non-generative `modificationAst` contract: it consumes supplied generated head and modifier clause outputs, preserves their Nawat surfaces, records order/marker/scope/shared-referent link metadata, marks preposed modifiers as non-topic, and keeps supplementation ambiguity diagnostic.
- Andrews 36.10-36.11/37.2-37.4/37.9/37.9.2/37.9.3/38.1/38.1.3/39.1/39.2/39.4/39.6/39.7/39.8/39.9 now reaches routing and generation: nonactive `calificativo-instrumentivo` uses the generated Nawat nonactive distant-past core for passive-action characteristic output and the explicit possessive-state general-use branch keeps the active or nonactive distant-past `-ka` stem without the restricted `-yu` matrix, transforms a missing possessor from the source VNC subject (`ti...t` -> `tu`, yielding `tumikka` or `tumachuka/tumatuka/tumatiluka`), exposes that general-use continuation dynamically in `#3 salida`, rejects non-reflexive transitive active-action sources, maps reflexive `mu` to shuntline `ne`, and forces root-plus-`ya` active-action sources to the obsolete/root distant-past base; active-action `z/liz` maps to Nawat `s/lis` through `sustantivo-verbal` from the future core, keeps root-plus-`ya` alternates nominalized instead of leaking bare VNC stems, applies configured replacive imperfective stems such as `chuka` -> `chukilis`, `nesi` -> `neshilis`, `ta-(ajsi)` -> `taajshilis`, and `ta-(teomati)` -> `tateomachilis`, applies configured root-plus-`ya` deletion such as `istaya` -> `istalis`, keeps the `-s` subtype restricted to `i`-final stems unless the configured replacive-stem rule is `-lis`-only, keeps active-action output common-number only, preserves transitive `ta/te`, maps reflexive `mu` to shuntline `ne`, drops a projective object from double-object reflexive active-action sources, drops source-supportive initial `i` after `ta`, allows the documented `neih.../neh...` reflexive supportive-i alternation, preserves potential-patient possessive state, and treats `-s/-lis` as predicate nominalizer material rather than the subject-number connector; explicit passive patientivo rejects intransitive ultimate sources, clears single-object nonspecific `ta`/`te` from passive patientive nounstems, maps source reflexive `mu` to shuntline `ne`, keeps exactly one selected projective (`ta` or `te`) from double-projective passive sources and permits the deleted-`te` alternate when selected `te` is present, explicit impersonal patientivo permits intransitive sources, keeps `ta`, maps source reflexive `mu` to shuntline `ne`, maps mainline `te` to the impersonal `ta` pattern when no shuntline `ta` already marks the nonhuman patient, while preserving the `te+ta` source shape when shuntline `ta` is present, perfective/imperfective patientive branches map mainline `te` to `ta` and source reflexive `mu` to shuntline `ne` instead of retaining `te`/`mu`, perfective patientivo generation is blocked unless the perfective source core has an Andrews-allowed ending, root/stock patientivo noun output is restricted to tli-class connector surfaces and rejects explicit zero/`in` requests while explicit route stems remain available, dynamic patientivo V→S routes now use `#3 salida` for the generated noun surface rather than static suffix reconstruction, `buildPatientivoCompoundEmbedContinuationContract()` turns generated patientive noun surfaces into real compound VNC inputs for data-backed verbal matrices such as `miki`, `buildPatientivoNominalCompoundContinuationContract()` turns generated patientive noun surfaces into ordinary NNC compound inputs for data-backed nominal matrices such as `kal` while keeping the result open-stem rather than fixture-backed, `buildPatientivoPrelocativeContinuationContract()` maps absolutive-source NNC subjects directly through the subject/object inventory and maps possessive-source NNC possessors through the possessor/object inventory into the current pre-locative/incorporated-root verb object slot, `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` turns generated `-yut` characteristic-property outputs into real incorporated-object VNC inputs by omitting `-yut` before the data-backed `chikawa` matrix (`mikkayut` -> `-(mikka/chikawa)` -> `kimikkachikawa`, `yulyut` -> `-(yul/chikawa)` -> `kiyulchikawa`), constrains the prelocative matrix inventory by source state (`ita`, `mati`, `neki`, and `tuka` are 39.7 absolutive-source matrices; `tajtani` is the default supported matrix and is available for absolutive and possessive sources; `tuka` is also allowed for possessive-source object-complement continuation; `tatajtania` and `temua` are possessive-source only; previous `ni` is rejected as a non-Andrews matrix), and exposes these continuations as output-row actions inside `#3 salida`, nonactive source suffix families are locked to the Andrews tli-class patientive connector in Nawat orthography instead of generating zero/`in` spillover, and route specs keep passive/impersonal as nonactive-core branches instead of active imperfective branches.
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
- Current Lesson 44 metadata records the boundary between configured adverbio output, adverb translations, particle labels, ordinary NNC/VNC outputs, and confirmed adverbial NNC/VNC or clause evidence. It does not add forms or change NNC/VNC output.
- Generated configured adverbio rows now expose `adverbialNuclearClauseFrame` through `adverbialNuclearFrame`: the frame records source VNC, source valency, first-degree adverbialized subject-pronoun behavior, semantic domain, and unchanged output surfaces. Rendering may show `Adverbial nuclear`, `Fuente VNC`, `Grado`, `Dominio`, and `Alcance: adverbio heredado`; this remains tied to the generated `#3 salida` row and does not add adverbial forms.
- Current route metadata keeps the configured adverbio output outside the linked output-composition surface.
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
- Current Lessons 49-50 metadata records the boundary between configured adverbio output, adverbial/relational/place boundary metadata, particle labels, route labels, translations, CSV verb rows, single generated words, and confirmed adjoined-unit or clause-adjunction evidence. It also provides `buildAdverbialAdjunctionAst()` for supplied clause/unit surfaces: Lesson 49 adverbialized modifier/head order, recursion, and place/time apposition; Lesson 50 nonadverbialized clause-unit relations for time/place/manner/consideration/purpose/condition/concession/consequence/proviso/reason; and the `ca` reason construction as principal-clause introducer rather than conjunction. It does not generate forms or change adverbio, NNC, VNC, route, relational, or place/gentilic output.
- Generated configured adverbio and `locativo-temporal` rows may expose diagnostic `adverbialAdjunctionBoundaryFrame` metadata. Rendering may show `Adjuncion`, `Unidad adjunta`, and `Evidencia adjuncion: no confirmada`; this remains display-only and does not add adjoined-unit generation.
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
- `generateNawatDenominalAndrewsContractRoutePreview()` now builds stem-only VNC route targets from that verified Andrews inventory for a supplied Nawat/Pipil source stem. Generated denominal output rows carry this preview in `denominalFamilyProfile.andrewsContractRoutePreview`, and rendering can show the target count, explicit-request count, object-prefix-required count, class-contract count, source-evidence-required count, warning count, note count, sample VNC inputs, and limited Andrews denominal VNC continuation chips. It converts Classical suffix sequences such as `hui`, `hui-lia`, `ti-ya`, `hui-ya`, `ya`, `lia`, `a`, `hua`, causative/intransitive `tla`, §55.2 replacement `ti-a`/`ti-lia`, `o-a`, `huia`, §55.3 note 2 `i-l-huia`/`a-l-huia`, `i-hui`, `a-hui`, and `i-a` into Nawat/Pipil route suffixes, records segmented target inputs, records verified Andrews stem classes for the supported Class A/B/C targets including §54.4 possession `ti` as Class A/B with no deverbal `ya`, §54.2/§54.4 `ti-lia` as Class C after generated `ti` source evidence, §54.2 `ti-ya` as Class A/B, and §54.2 `hui-ya` as Class B, records source requirements for §54.3 possessive-state predicates, §54.2.2 generated intransitive `hui` sources, §54.2.3 generated `ti`/`hui` sources before `ti-ya`/`hui-ya`, §54.2.3 generated intransitive `ya` sources with `ya` deletion before `lia`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` targets from generated intransitive `ti` sources, §55.1 temporal compounds, §55.2 `tla` causative sources, §55.2 note intransitive `tla` sources, §55.3 note 2 generated intransitive `o-a` sources that bypass the transitive `o-a` step through a hypothetical `i-hui`/`a-hui` source, §55.4 adverbial nounstems, §55.5 relational compounds/relational possessive predicates, and §55.6 `i-hui`/`a-hui` sources, records §55.7 `i-a` no-intransitive-counterpart, source-final pattern, w-final `huia` ambiguity, source-nounstem-`i`, and possible `i-hui` source-path diagnostics through finite request/execution provenance, and explicitly does not run finite VNC generation or create fixture evidence by itself. The finite §54.5 `ti-a` route is single-object only; Andrews' possessive-state double-object §54.5 path remains unmodeled rather than forced into the current VNC request. Generated ordinary possessive NNC outputs can now provide bounded §54.3 source evidence: the Nawat possessive predicate surface feeds the included-possessor `ti` target, and metadata records that the possessor remains inside the verbstem rather than becoming a VNC object. Generated ordinary NNC outputs can also provide the predicate nounstem for §54.4 possession `ti`, keeping nounstem-focused possession `ti` separate from the included-possessor path. Generated §54.2 inceptive/stative `ti` targets, generated §54.4 possession `ti` targets, and selected current `vi-ti` verbalizer stages can now satisfy the following `ti-ya`, §54.2/§54.4 `ti-lia`, §54.5 `ti-a`, and §54.6 `t-ia` continuation contracts without creating lexical evidence; generated §54.2.2 `hui` targets satisfy `hui-ya` and `hui-lia`, and generated `ti-ya`/`hui-ya`/root-plus-`ya` targets satisfy the `ya`-deleting `lia` continuation after final `ya` is removed. Traditional `tia`/`huia` spellings are exposed only as ambiguity labels because Andrews warns they can be confused with causative/applicative suffixes. Generated §55.2 intransitive `tla` targets satisfy the note's `ti-a` and `ti-lia` continuations; generated §55.3 intransitive `o-a` targets satisfy the note 2 `i-l-huia` and `a-l-huia` applicative continuations. Explicit source-classification helpers now satisfy §55.4 adverbial-nounstem and §55.5 relational compound/possessive relational predicate source requirements only when a caller supplies that confirmed source classification; they do not treat configured adverbio rows or relational boundary frames as automatic evidence. `buildNawatDenominalAndrewsContractRouteGenerateWordRequest()`, `executeNawatDenominalAndrewsContractRoute()`, `activateNawatDenominalAndrewsContractRouteTarget()`, `previewNawatDenominalAndrewsContractRouteNextSource()`, `previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput()`, `previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput()`, `previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource()`, and `previewNawatDenominalAndrewsRelationalCompoundRouteFromSource()` can route a selected Andrews target into the VNC engine only with an explicit target tense and with source evidence satisfied for source-limited targets; transitive, causative, applicative, and usually-transitive targets also require a Nawat object prefix before finite request construction.
- §55.1 temporal `tia` now has the same explicit source-classification boundary as §55.4 and §55.5: `previewNawatDenominalAndrewsTemporalTiaRouteFromSource()` accepts a confirmed compound-temporal NNC source with a time-segment matrix and numeral embed, satisfies the `temporal-compound-nounstem` route requirement, and does not treat generated `locativo-temporal` rows as automatic evidence.
- 2026-06-24 Andrews-logic authority update: older wording here that says source-limited targets become finite-routable only after source evidence is satisfied now means the source context is preserved as diagnostic/provenance metadata. It no longer gates finite request construction; Andrews route-contract validity, explicit target tense, and explicit object-prefix requirements are the finite request gates.
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

- Panel visibility now reads the LCM result surface contract before compatibility `result.result`.
- `src/ui/panels/panels.js` exposes `getPanelConjugationRenderableSurface()`, delegating to the agreement-layer `getConjugationRenderableSurface()` when present and otherwise reading `grammarFrame.resultFrame.surface`, `frames.resultFrame.surface`, `result.surface`, then compatibility `result.result`.
- `isConjugationResultVisible()` no longer rejects rows solely because compatibility `result.result` is blank or `—` when a framed surface exists.
- The existing diagnostic and invalid-combination masking remains unchanged through `getConjugationMaskState()`.
- This is UI reader plumbing only. It adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI Continuation Target Surface Reader v1

Date: 2026-06-08

Decision:

- Continuation chips that promote generated nominal outputs now read target surfaces from the LCM surface reader before compatibility `result.result`.
- `src/ui/rendering/rendering.js` exposes `getPrimaryConjugationSurface()`, which reads `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and then compatibility `result.result`.
- The calificativo/action-noun source-subject possessor continuation and instrumentivo source-subject possessor continuation now use framed target surfaces for visibility checks, duplicate prevention, `data-target-surface`, chip labels, and titles.
- The existing Andrews route/evidence datasets are still projected through `applyGrammarFrameRouteDataset()`.
- This is UI reader plumbing only. It adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Generate Word Framed Surface Normalization v1

Date: 2026-06-08

Decision:

- Generate-word contract wrapping now reads existing `grammarFrame.resultFrame.surface` / `frames.resultFrame.surface` before compatibility `result.result`.
- `src/core/generation/engine.js` adds generation-local frame readers and uses them when rebuilding `grammarFrame.resultFrame`, `surfaceForms`, and fallback result contracts.
- `src/core/generation/runtime_support.js` uses the same framed-surface precedence for runtime blocked/no-output wrappers.
- This prevents a pre-framed route result from being collapsed to blank or `—` by generation-layer wrapping before the UI can read the contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI State Route Surface Reader v1

Date: 2026-06-08

Decision:

- UI state route helpers now read `grammarFrame.resultFrame.surfaceForms` / `grammarFrame.resultFrame.surface` before compatibility `result.result`.
- `src/ui/state.js` adds state-local frame surface readers and uses them in `getPrimaryNawatRouteSurfaceForm()`, `buildReduplicatedConjugationResult()`, and denominal Andrews finite route support detection.
- Nawat linked/denominal route controls can now keep a pre-framed route output as supported even if compatibility `result.result` is `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI Adjectival Continuation Target Surface Reader v1

Date: 2026-06-08

Decision:

- Patientive and nominalized-VNC adjectival-function continuation chips now read target surfaces from the shared LCM surface reader before compatibility `contract.result`.
- `src/ui/rendering/rendering.js` uses `getPrimaryConjugationSurface(contract)` for continuation `data-target-surface`, labels, titles, duplicate checks, and `applyAdjectivalNncFunctionToVerbEntry()` payloads.
- This keeps Andrews 40.4 and 40.5-40.8 adjectival-function continuations renderable when a route returns a framed result surface but compatibility `contract.result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI Rendering Display Surface Reader v1

Date: 2026-06-08

Decision:

- Rendering display paths now consume joined LCM surface forms through `getConjugationDisplaySurface()` instead of formatting compatibility `result.result` directly.
- `src/ui/rendering/rendering.js` uses frame-first display surfaces for ordinary NNC rows, nonactive rows, verbal rows, nominal/adjectival rows, direct adjectival-function rows, row dedupe keys, and source surfaces passed into ownerhood continuations.
- Silent finite preview readers for prelocative, compound embed, preterit-agentive ownerhood, and nominal compound previews now use `getPrimaryConjugationSurface()` so framed result surfaces are visible before compatibility text.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Generate Word Frame Source Input Normalization v1

Date: 2026-06-08

Decision:

- Generate-word grammar frames now normalize the rendered/source input before storing it in `grammarFrame.resultFrame.sourceInput`.
- `src/core/generation/engine.js` adds `resolveGenerateWordFrameSourceInput()`, which rejects no-output markers, then reads the framed result surface, then stem/input fallbacks.
- `stemFrame.stem` now also avoids preserving compatibility `—` when a framed surface is the only renderable output.
- This keeps pre-framed route outputs from leaking no-output markers into the output/provenance layer even when compatibility `result.result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Verb-Derived NNC Surface Gate Reader v1

Date: 2026-06-08

Decision:

- Verb-derived nominal NNC routes now read the LCM result-frame surface contract before compatibility `result.result`.
- `src/core/nnc/nnc.js` adds frame-aware verb-derived nominal surface readers for `grammarFrame.resultFrame` / `frames.resultFrame`, `surface`, `surfaceForms`, and compatibility result text.
- Instrumentivo, direct instrumentivo, calificativo-instrumentivo, and locativo-temporal no-output gates now use the shared surface reader instead of rejecting a result solely because compatibility `result.result` is blank or `—`.
- `attachVerbDerivedNominalGrammarContract()` uses the same reader when projecting `surface`, `surfaceForms`, `ok`, and `resultFrame`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Preterit Result Surface Reader v1

Date: 2026-06-08

Decision:

- Preterit/perfective class-output and variant-assembly wrappers now read the LCM result-frame surface contract before compatibility `result.result`.
- `src/core/preterit/api.js` adds frame-aware preterit class-output surface readers for `grammarFrame.resultFrame` / `frames.resultFrame`, `surface`, `forms`, and compatibility result text.
- `src/core/preterit/engine.js` adds the same frame-first reader for direct variant assembly.
- `attachPreteritClassBasedGrammarContract()` and `attachPretUniversalVariantAssemblyGrammarContract()` now project `surface`, `surfaceForms`, `ok`, and `resultFrame` from those readers, so a framed route is not collapsed to `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI Rendering Continuation Surface Reader v1

Date: 2026-06-08

Decision:

- Remaining rendering continuations now consume the shared LCM surface readers instead of splitting compatibility `result.result` directly.
- `src/ui/rendering/rendering.js` uses `getPrimaryConjugationSurface()` for linked path final labels, ordinary NNC ownerhood finite previews, and patientivo source finite previews.
- Patientivo row display, patientivo conversion surfaces, action-nominal surfaces, calificativo general-use source displays, and grouped noun-combo evaluations now use `getConjugationDisplaySurface()` / `getConjugationSurfaceForms()`.
- The only remaining direct compatibility `result?.result` fallback in rendering is inside the shared `getConjugationSurfaceForms()` reader, after the frame-first path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM UI State Linked Path Generated Frame Preservation v1

Date: 2026-06-08

Decision:

- Linked grammar path execution summaries now preserve the generated stage's LCM contract instead of reducing the stage to compatibility `result` and `surfaceForms` text.
- `src/ui/state.js` adds `getStateResultDisplaySurface()` and uses the existing frame-first state surface reader for generated chain result text.
- Each executed linked-path `generated` record now carries `surface`, frame-first `surfaceForms`, `primarySurface`, `ok`, `grammarFrame`, `frames`, `diagnostics`, and `contractDiagnostics`.
- Denominal Andrews source extraction from ordinary NNC output now uses `getPrimaryNawatRouteSurfaceForm()` instead of separately reading compatibility `surfaceForms` / `result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Shared Result Contract Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical shared result contract now accepts `grammarFrame.resultFrame.surfaceForms` as renderable output even when `resultFrame.surface` and compatibility `result.result` are blank or `—`.
- `src/core/grammar/frame.js` adds `getGrammarResultContractSurfaceForms()` and `splitGrammarResultContractSurfaceText()` for frame-first surface collection.
- `buildGrammarResultContract()` now exposes `surfaceForms` on the common contract and derives `ok` from either a primary surface or frame-first surface forms.
- This prevents shared wrappers that rely on `buildGrammarResultContract()` from treating a surface-forms-only LCM result as generic no-output.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Agreement Renderable Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Agreement visibility now treats `grammarFrame.resultFrame.surfaceForms` as renderable output before falling back to compatibility surface/result text.
- `src/core/agreement/agreement.js` adds `getConjugationRenderableSurfaceForms()` so evaluation, mask state, and UI presentation can share the same frame-first surface reader.
- `buildConjugationEvaluationRecord()` now inherits frame-surface-form visibility through `getConjugationRenderableSurface()`, preventing a valid LCM result from collapsing into generic no-output status.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, or Andrews/Classical examples.

## Completed Phase: LCM Clause/Panel Surface-Forms Readers v1

Date: 2026-06-08

Decision:

- Clause composition readers now consume `grammarFrame.resultFrame.surfaceForms` before compatibility text when building AST nodes for adjectival modification, adverbial adjunction, complementation, and conjunction.
- The readers split slash variants, ignore the compatibility empty marker `—`, and keep composition non-generative: they preserve supplied/generated surfaces rather than creating new word forms.
- Panel visibility fallback now also reads frame-first surface forms when the agreement helper is unavailable, so HTML controls do not hide framed outputs behind the generic no-output path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generate Runtime Surface-Forms Readers v1

Date: 2026-06-08

Decision:

- Generation contract surface readers now consume `grammarFrame.resultFrame.surfaceForms` before falling back to compatibility `result` text.
- `normalizeGrammarFrameSurfaceForms()` now splits slash variants and filters the compatibility empty marker `—`, matching the shared LCM result contract reader.
- Generation runtime support now exposes `getGenerateRuntimeSurfaceForms()` and preserves frame-first surface forms when wrapping a blocked runtime contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Rendering Realization Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- `buildGrammarFrameSubLabels()` now reads `orthographyFrame.surfaceForms` and `resultFrame.surfaceForms` before showing `Realizacion Nawat: pendiente`.
- Rendering labels split slash variants and ignore the compatibility empty marker `—`, so frame-surface-forms-only results still expose a user-facing Nawat realization label.
- The UI remains inverted: it renders status/route/evidence/realization/diagnostics from the frame rather than visually mirroring the Andrews LCM document.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival NNC Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The adjectival NNC grammar contract now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before compatibility `result` text when rebuilding route frames.
- `attachAdjectivalNncGrammarContract()` now carries split, deduped frame-first surface forms through `surface`, `surfaceForms`, `resultFrame`, and `orthographyFrame`.
- This prevents VNC/NNC adjectival-function routes from losing a framed surface and falling into a generic no-output path when compatibility `result` is blank or `—`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Morphology Application Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The morphology application contract now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to morphology output fields.
- `attachMorphologyApplicationGrammarContract()` now splits slash variants, filters the compatibility empty marker `—`, and projects frame-first surface forms into `orthographyFrame` and `resultFrame`.
- Blocked morphology paths remain blank-surface failures, but pre-framed successful morphology outputs no longer collapse to `output.verb` before the UI can read the LCM result layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Output Surface Wrapper Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The output-surface contract wrapper now reads `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to top-level `surfaceForms`, `surface`, compatibility `result`, or locally joined output segments.
- `attachOutputSurfaceGrammarContract()` now splits slash variants, filters the compatibility empty marker `—`, and projects frame-first forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`.
- Output word/nominal builders still preserve their local segment-join fallback when no pre-framed result exists, but a valid LCM result layer no longer collapses into a generic no-output surface path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Output Provenance Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Output provenance contracts now read `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to top-level `surfaceForms`, `surface`, provenance `surfaceStem`, compatibility `result`, or local derivation-stem fallback.
- `attachOutputProvenanceGrammarContract()` now splits slash variants, filters the compatibility empty marker `—`, and projects frame-first forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`.
- `getProvenancePrimaryStemSurface()` now reads a framed primary variant surface before deriving a local stem from `surfaceStem` or `stemSpec`, so provenance composition does not hide a valid LCM result layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM UI State Route-Control Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Static Nawat route-control targets now read existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before falling back to local target surfaces.
- `attachNawatStaticRouteGrammarFrame()` now projects frame-first route-target forms into top-level `surfaceForms`, `orthographyFrame.surfaceForms`, and `resultFrame.surfaceForms`, while preserving compatibility record surfaces after framed forms.
- Route station chip surface text now reads only actual frame-result surface forms before falling back to station labels, so label text such as `pasivo/impersonal` is not split as if it were generated-form variants.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Rendering Display Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The shared UI rendering surface reader now keeps `getConjugationFrameSurfaceForms()` frame-only and applies fallback order in `getConjugationSurfaceForms()`.
- Rendering display/continuation surfaces now prefer `grammarFrame.resultFrame.surfaceForms`, then `grammarFrame.resultFrame.surface`, then top-level `surfaceForms`, then top-level `surface`, and only use compatibility `result` when no canonical/display surface exists.
- This prevents a top-level `surface` from hiding top-level `surfaceForms`, and keeps compatibility `result` from being appended when framed or canonical surfaces already produced a display value.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Allomorphy Contract Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The shared VNC allomorphy metadata wrapper now projects surface forms into the canonical LCM result layer instead of requiring each source-contract caller to set `resultFrame.surfaceForms` manually.
- `attachVncAllomorphyGrammarContract()` now reads existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` first, then orthography-frame forms, top-level forms, local `outputSurface` / `selectedOutputSurface` / `nawatSurfaceSuffix`, target-contract output, and finally compatibility `result`.
- Patientive source suffix, perfective-ending, imperfective-stem, root/stock, source-stage, and multiple-derivation contracts now carry frame-first surface forms through `resultFrame` and `orthographyFrame`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Grammar Metadata Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical grammar metadata frame builder now reads an existing `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before local metadata surfaces.
- `buildGrammarMetadataContractFrame()` now normalizes slash variants and the compatibility empty marker `—` through the shared result-contract splitter, then falls back through explicit options, top-level `surfaceForms`, output surface forms, top-level `surface`, output primary surface, and only then compatibility `result`.
- Direct calls to `attachGrammarMetadataContract()` can no longer rebuild a metadata frame that drops a valid pre-existing LCM result surface into generic compatibility output.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Verb-Derived NNC Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Verb-derived nominal NNC result readers now use the same frame-first surface priority as the shared LCM contract layer.
- `getVerbDerivedNominalSurfaceForms()` now reads `grammarFrame.resultFrame.surfaceForms`, then `grammarFrame.resultFrame.surface`, then top-level `surfaceForms`, then top-level `surface`, and finally compatibility `result`.
- `getVerbDerivedNominalSurface()` now selects the first normalized surface form, so top-level `surface` cannot hide available variants and compatibility `result` cannot outrank framed/canonical surfaces.
- Existing display text remains in compatibility `result`; the contract `surface` now carries the primary form while `surfaceForms` carries the variants.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generation Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Generation engine and runtime surface resolvers now select the primary surface from normalized LCM surface forms before falling back to `resultFrame.surface`, top-level `surface`, or compatibility `result`.
- `resolveGenerateWordContractSurface()` and `resolveGenerateRuntimeContractSurface()` now honor the requested priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and only then compatibility `result`.
- Rebuilt generation frames now carry the primary surface-form value through `resultFrame.surface`, `resultFrame.sourceInput`, and `stemFrame.stem` when a pre-framed result supplies multiple surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Preterit Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Preterit/perfective class-based and universal-variant result readers now select primary output from normalized surface forms before falling back to `resultFrame.surface`, top-level `surface`, or compatibility `result`.
- `getPreteritClassBasedSurfaceForms()` and `getPretVariantAssemblySurfaceForms()` now treat route-local `forms` as the surface-form list before top-level `surface`.
- `getPreteritClassBasedSurface()` and `getPretVariantAssemblySurface()` now honor the LCM priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, `result.surface`, and only then compatibility `result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Function Composer Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- Adjectival NNC function UI promotion now resolves the applied verb-entry surface from `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before the clicked/local surface argument.
- `buildAdjectivalNncFunctionEntryContract()` and `applyAdjectivalNncFunctionToVerbEntry()` now share a frame-first surface reader, so promoted chips cannot carry stale display text into the verb input when the LCM result layer supplies a canonical surface.
- The visible input value, dataset surface, serialized route contract, and later override all preserve the same frame-first surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Shared/Adjectival Primary Surface-Forms Reader v1

Date: 2026-06-08

Decision:

- The canonical `buildGrammarResultContract()` primary `surface` now selects the first normalized LCM surface-form entry before falling back to singular `resultFrame.surface`, top-level `surface`, or compatibility `result`.
- Adjectival NNC result readers now use the same priority for top-level data: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surfaceForms`, top-level `surface`, then compatibility `result`.
- This closes the mirror-inversion gap where the JS layer collected LCM variants but could still display a singular mirrored surface first.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Evaluation Generic No-Output Failed-Layer Reader v1

Date: 2026-06-08

Decision:

- Conjugation evaluation now synthesizes a framed Andrews/LCM failed-layer diagnostic when a blocked `grammarFrame` would otherwise display only a generic no-output diagnostic.
- The synthesized diagnostic records `failedLayer` and `contractLayer`, choosing authority, route, or result from the blocked frame before falling back to diagnostic status.
- Specific route diagnostics remain primary; the framed failed-layer diagnostic is promoted only when diagnostics are empty or generic no-output placeholders.
- This keeps unsupported paths from collapsing to `La generacion no produjo una forma.` when the LCM contract already identifies the blocked layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generate Word Generic Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Generic `generateWord()` blocked diagnostics now carry LCM failed-layer metadata instead of only an id/message pair.
- `buildGenerateWordDiagnosticEntry()` records `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- `buildGenerateWordBlockedResult()` derives the failed layer from the blocked route stage: morphology/stem stages map to `stemFrame`, orthography/spelling stages to `orthographyFrame`, agreement/participant stages to `participantFrame`, output/no-output stages to `resultFrame`, and other stages to `routeContract`.
- The morphology-application blocked path now proves the generator-level diagnostic names the stem layer before UI fallback display.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Core Blocked Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Remaining core blocked-diagnostic builders now carry LCM failed-layer metadata instead of relying on UI fallback synthesis.
- Runtime no-output and morphology-application fallbacks mark `failedLayer: "stem"` / `contractLayer: "stemFrame"` because these paths block before usable stem output.
- Verb-derived nominal fallback and specific diagnostics mark `failedLayer: "route"` / `contractLayer: "routeContract"` so unsupported nominal routes identify the route layer directly.
- Preterit class-output fallbacks mark `failedLayer: "output"` / `contractLayer: "resultFrame"`; preterit variant-source fallbacks mark `failedLayer: "route"` / `contractLayer: "routeContract"`.
- Existing route-specific diagnostic messages remain primary; this phase adds contract-layer metadata to them.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Composition AST Surface-Forms Priority Reader v1

Date: 2026-06-08

Decision:

- Composition AST input readers now preserve the same LCM/canonical surface priority used by generators and UI renderers.
- Adverbial adjunction, adjectival modification, complement clause, and conjunction AST builders read `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surfaceForms`, top-level `surface` / display surfaces, and only then compatibility `result`.
- This prevents supplied framed/canonical clause units from being collapsed to stale compatibility display text before AST composition.
- Existing composition behavior remains non-generative; these builders still compose supplied Nawat/Pipil clause/unit surfaces rather than creating new word forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Agreement Builder Context Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Verb-derived nominal agreement builder-context blockers now carry LCM failed-layer metadata directly instead of depending on generic no-output text or UI fallback synthesis.
- Builder-context diagnostics now include `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- Route-stage mapping keeps mirrored UI sameness from inverting the layer contract: parse-input blockers map to `orthographyFrame`, parse/stem-context blockers map to `stemFrame`, subject/object gates map to `participantFrame`, output blockers map to `resultFrame`, and other route blockers map to `routeContract`.
- Existing blocked messages remain intact; the metadata now names which LCM layer actually failed.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Derivation Continuation Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Derivation continuation contracts now keep compatibility `diagnostics` strings for compatibility while projecting structured diagnostics into `grammarFrame.routeContract.blockingDiagnostics`, `grammarFrame.diagnosticFrame`, and `contractDiagnostics`.
- Structured continuation diagnostics now carry `id`, `code`, `severity`, `failedLayer`, `contractLayer`, `routeFamily: "derivation-continuation"`, and `routeStage`.
- Matrix/license blockers map to `routeContract`; missing source stems/surfaces/root material map to `stemFrame`; missing participant/object/possessor transfer maps to `participantFrame`; missing target verb/NNC input maps to `resultFrame`.
- This prevents continuation previews from collapsing unsupported Andrews/Nawat paths into a generic empty-generation message after the fact.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generation Existing Diagnostic Failed-Layer Metadata v1

Date: 2026-06-08

Decision:

- Generation runtime and morphology-application support paths now normalize existing blocked diagnostics into structured contract diagnostics before building the `grammarFrame`.
- Existing string/object diagnostics keep their primary diagnostic identity while gaining `failedLayer`, `contractLayer`, `routeFamily`, and `routeStage`.
- Direct support wrappers now expose `contractDiagnostics`, and those diagnostics are projected into `grammarFrame.routeContract.blockingDiagnostics` and `grammarFrame.diagnosticFrame`.
- Unlabeled runtime/morphology blockers default to `failedLayer: "stem"` / `contractLayer: "stemFrame"`, with stage overrides for orthography, agreement, and output routes.
- This prevents existing support diagnostics from reaching the UI as generic no-output messages without an LCM failed-layer contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Reduplicated Combination Surface Gate v1

Date: 2026-06-08

Decision:

- Noun/adjectival combination reduplication gates now read the same LCM primary surface used by display and output contracts before consulting compatibility result text.
- `renderNounConjugations()` checks `getPrimaryConjugationSurface(result)` and panel availability checks `getPanelConjugationRenderableSurface(result)` instead of gating on `result.result`.
- The reduplication builder already reads `grammarFrame.resultFrame.surfaceForms` / `grammarFrame.resultFrame.surface` before compatibility payloads; this phase closes the caller-side bypass that could skip that builder when only framed output was present.
- The UI source test now asserts both rendering and panel combination gates avoid `useReduplicatedSingularSurface && result?.result`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Promotion Generated Source Surface v1

Date: 2026-06-08

Decision:

- Linked grammar path execution source options now derive the generated source through `getPrimaryNawatRouteSurfaceForm(step.generated)` instead of reading `generated.primarySurface` or compatibility `generated.result` directly.
- Promotable linked-path sources now preserve the same priority used by the LCM contract: framed result surface forms, framed result surface, top-level surface/forms, then compatibility result text.
- A framed-only generated linked-path step with compatibility `result: "—"` now remains promotable as a next source and exposes the framed surface as `sourceVerb`, `displaySurface`, and `generatedSurface`.
- This closes a linked-promotion bypass near the original chip failure mode, where UI source promotion could ignore framed output and fall back to compatibility generated text.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Allomorphy Perfective Fallback Surface v1

Date: 2026-06-08

Decision:

- VNC allomorphy now exposes `getVncAllomorphyContractSurface()` as the primary frame-first surface reader for allomorphy contracts.
- The patientive-perfective fallback source stem now reads the preterit output through that LCM surface reader instead of reading `preteriteOutput.result` directly.
- The fallback priority is now `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, option/orthography/top-level surfaces, and only then compatibility result text.
- A framed-only allomorphy/preterit output with compatibility `result: "—"` now resolves its primary source surface from the framed result before patientive perfective fallback logic runs.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Execution Summary Frame-Only Surface v1

Date: 2026-06-08

Decision:

- Linked grammar path execution summaries now display the final generated surface only through `getPrimaryConjugationSurface(lastGenerated)`.
- The renderer no longer falls back to `lastGenerated.primarySurface` when summarizing executed linked paths.
- The focused UI test now supplies framed generated step outputs with compatibility `result: "—"` and proves the summary reads the framed result surface.
- This keeps linked execution summaries on the same LCM surface contract used by generation and promotion rather than letting an ad hoc generated-field display path bypass the frame.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Stage Request Frame-First Source v1

Date: 2026-06-08

Decision:

- Linked grammar stage labels now read promotable source/output text through frame-first helpers before compatibility `nextSource.sourceVerb`, `nextSource.displaySurface`, or `stage.surface` fields.
- The source label only lets a `nextSource` frame override explicit source input; a stage frame can still supply output display, but it no longer turns finite stage output into the next source verb by accident.
- Linked stage generation requests now derive `posicionesFormula.tronco`, `linkedGrammarPathStage.sourceVerb`, and `linkedGrammarPathStage.displaySurface` from the LCM result-frame surface before compatibility stage fields when a framed next source is present.
- The request metadata attachment now passes the resolved stage surface into `attachGrammarMetadataContract`, so the request itself carries `grammarFrame.resultFrame.surface` and `surfaceForms` instead of only orthography/stem metadata.
- This closes another linked-promotion path near the original chip failure mode without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Function Override Frame Route v1

Date: 2026-06-09

Decision:

- Adjectival NNC function entry contracts now serialize their `grammarFrame` / `frames` payload alongside the existing route summary so promoted UI entries do not lose the LCM contract before generation.
- `resolveAdjectivalNncFunctionOverrideFromInput()` now restores the serialized frame into `override.adjectivalNnc.grammarFrame` and reads the result-frame surface before dataset surface text.
- `executeAdjectivalNncGenerationRoute()` now uses `resolveAdjectivalNncGenerationSurface()` for intensified, nominalized-VNC, patientive, root-plus-ya, and default adjectival NNC routes, preferring framed output before compatibility `surface` / `stem` fields. The Andrews 40.3 VNC adjectival route was later hardened further: it now requires typed VNC continuation and operation frames rather than this frame-first display fallback.
- Adjectival function rendering and silent-generation cache keys now use frame-first readers instead of direct `override.adjectivalNnc.surface`.
- This closes an adjectival-chip route bypass without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Metadata Adjunction Output Primary Surface Removal v1

Date: 2026-06-09

Decision:

- Adverbial adjunction AST input readers no longer accept stale `input.output.primarySurface` as an output display source.
- Adjunction input nodes now read nested `output.surfaceForms` and `output.surface` through the same frame-first surface contract before compatibility `result`.
- Grammar metadata contract readers no longer accept stale `node.output.primarySurface`; nested output contracts use `output.surfaceForms` / `output.surface` instead.
- Focused tests now prove stale `primarySurface` is ignored when contract output surfaces exist.
- This removes another compatibility display bypass without adding Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Morphology Preterit Source Forms Frame-First v1

Date: 2026-06-09

Decision:

- Morphology preterit/perfective source-form routing now reads generated source forms through `getMorphologyApplicationSourceSurfaceForms()` before consulting route-local `forms` arrays.
- The source reader prefers `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`, then top-level surface contract fields, and only falls back to compatibility `forms` when no grammar frame exists.
- Active/adjectival wrapper source forms, preterit-agentive source splitting, universal preterit forms, nonactive perfective forms, and class-based perfective forms now share that frame-first reader.
- A framed preterit source output with compatibility `result: "—"` and stale `forms` now routes through the framed result surface instead of mirroring the stale local array.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adverbial Output Primary Surface Removal v1

Date: 2026-06-09

Decision:

- Adverbial nuclear clause frames no longer emit `output.primarySurface`.
- Adverbial output now exposes generated surface material through `output.surfaceForms` and the attached LCM `grammarFrame.resultFrame`.
- The focused adverbial test expectation was updated so the remaining primary-surface references are only stale-reader guards or linked execution compatibility payloads.
- This avoids mirroring the same output as a separate compatibility alias while preserving the Andrews Lesson 44 adverbial function/domain contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Execution Primary Surface Alias Removal v1

Date: 2026-06-09

Decision:

- Linked grammar path execution state no longer emits `generated.primarySurface`.
- Generated step summaries keep `generated.surface`, `generated.surfaceForms`, and `generated.grammarFrame` / `generated.frames` as the output contract.
- State tests now summarize linked generated surfaces from `generated.surface`, and expected linked execution payloads no longer include the compatibility alias.
- Remaining `primarySurface` mentions are limited to stale-input guard tests that prove stale payloads are ignored.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Allomorphy Pasado-Remoto Source Forms Frame-First v1

Date: 2026-06-09

Decision:

- VNC allomorphy now exposes `getVncAllomorphySourceSurfaceForms()` for source-form consumption paths that may receive generated preterit/perfective outputs.
- The calificativo/instrumentivo pasado-remoto fallback now reads `pasadoRemotoOutput` through the LCM result-frame surface contract before compatibility local `forms`.
- The source reader prefers `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, and other existing contract surface fields; compatibility `forms` are only used when no grammar frame or contract surface exists.
- A framed allomorphy source output with compatibility `result: "—"` and stale `forms` now resolves from the framed result surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Preterit Contract Forms Stale-Alias Removal v1

Date: 2026-06-09

Decision:

- Preterit class-based and universal variant-assembly contract readers no longer merge route-local `forms` into `surfaceForms` when an LCM `grammarFrame` / `frames` object is already present.
- The readers still allow compatibility `forms` for unframed outputs, preserving existing preterit variant behavior where no contract has been attached yet.
- Framed outputs now preserve the canonical surface priority: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level `surface`, then compatibility `result`.
- Focused preterit tests now seed stale compatibility `forms` beside framed outputs and prove stale forms do not enter the rebuilt `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Shared Surface Readers Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Shared renderability/output readers now treat an existing LCM `resultFrame` as the canonical surface source.
- Agreement renderability, UI rendering display, UI state route surfaces, panel fallback renderability, output-surface contracts, and output-provenance contracts read `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` first.
- When a result frame exists, these readers no longer merge stale top-level `surfaceForms` arrays or compatibility `result` text into displayed/generated surface variants.
- Top-level `surface` remains a lower-priority contract surface, and unframed compatibility outputs can still fall back to top-level `surfaceForms` / `result`.
- Focused tests now seed stale `surfaceForms` and stale `result` beside framed outputs to prove the stale aliases do not pollute the LCM display/output surface list.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generator and Grammar Result-Frame Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Generation and runtime-support surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- `normalizeGrammarFrameSurfaceForms()` and `getGenerateRuntimeSurfaceForms()` suppress stale top-level `surfaceForms` arrays and compatibility `result` text when a result frame is already present.
- `resolveGenerateWordContractSurface()` and `resolveGenerateRuntimeContractSurface()` no longer let compatibility `result` override an existing empty/framed contract; top-level `surface` remains the lower-priority contract surface.
- Canonical `buildGrammarResultContract()` / `attachGrammarMetadataContract()` now apply the same rule: `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, then top-level `surface`; stale top-level `surfaceForms` and compatibility `result` remain available only for unframed outputs.
- Focused grammar, VNC, runtime, and morphology tests now seed stale aliases beside valid result frames and prove those aliases do not enter rebuilt `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC/Preterit Contract Alias Suppression v1

Date: 2026-06-09

Decision:

- VNC allomorphy contract surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- When a result frame exists, allomorphy readers suppress stale `options.surfaceForms`, `orthographyFrame.surfaceForms`, top-level `surfaceForms`, `outputSurface`, `selectedOutputSurface`, `nawatSurfaceSuffix`, target-contract output aliases, and compatibility `result`.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Preterit class-based and universal variant-assembly readers now also suppress compatibility `result` when a grammar frame/result frame exists; unframed preterit outputs can still use compatibility `forms` and `result`.
- Focused VNC and preterit tests now seed stale aliases beside valid result frames and prove those aliases do not enter regenerated `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Composition Input Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Clause/composition AST input readers now treat an existing LCM `resultFrame` as the canonical supplied/generated clause-unit surface source.
- Adverbial adjunction, adjectival modification, complement, and conjunction readers suppress stale top-level `surfaceForms`, `surfaceDisplay`, `word`, compatibility `result`, and nested output surface aliases when a result frame exists.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Unframed composition inputs can still use the compatibility surface/display/result fields, preserving non-generative composition of supplied Nawat/Pipil clause surfaces.
- Focused composition tests now seed stale aliases beside framed inputs and prove those aliases do not enter the frame-first surface-form lists.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM NNC and Morphology Surface Reader Stale-Alias Suppression v1

Date: 2026-06-09

Decision:

- Verb-derived nominal, adjectival NNC, and morphology-application surface readers now treat an existing LCM `resultFrame` as the canonical generated surface source.
- When a result frame exists, these readers suppress stale top-level `surfaceForms`, compatibility `result`, and morphology fallback `verb` surfaces.
- Top-level `surface` remains available as the lower-priority contract surface after `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface`.
- Unframed NNC/adjectival/morphology outputs can still use compatibility `surfaceForms`, `result`, and morphology fallback surfaces.
- Focused NNC, adjectival NNC, and morphology tests now seed stale aliases beside valid frames and prove those aliases do not enter regenerated `resultFrame.surfaceForms`.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM UI Realization Label Result-Frame Priority v1

Date: 2026-06-09

Decision:

- Shared UI grammar-frame sublabels now read Nawat realization labels from `grammarFrame.resultFrame.surfaceForms` and `grammarFrame.resultFrame.surface` before `orthographyFrame.surfaceForms` / `orthographyFrame.surface`.
- `orthographyFrame.nawatRuleSpelling` remains a fallback spelling label when no generated result-frame surface exists.
- This keeps UI display in inverted user-facing order while preserving the engine contract priority: result frame first, orthography metadata second.
- Focused UI tests now seed stale orthography surfaces beside valid result-frame forms and prove stale orthography metadata does not hide the generated LCM surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Preterit Metadata-Only Frame Fallback v1

Date: 2026-06-09

Decision:

- Preterit class-based and universal variant-assembly surface readers now distinguish metadata-only `grammarFrame` objects from generated `resultFrame` contracts.
- Compatibility local `forms` / `result` are suppressed only when an actual LCM `resultFrame` exists; metadata-only frames can still fall back through the normal contract priority.
- Existing stale-alias suppression remains intact for framed outputs with `grammarFrame.resultFrame`.
- Focused preterit tests now cover both cases: stale aliases beside valid result frames are ignored, while metadata-only frames do not erase otherwise usable local output forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Source-Form Reader Metadata-Only Frame Fallback v1

Date: 2026-06-09

Decision:

- Morphology-application and VNC allomorphy source-form readers now distinguish metadata-only `grammarFrame` objects from generated `resultFrame` contracts.
- Compatibility source `forms` are suppressed only when an actual LCM `resultFrame` exists or when frame/top-level contract surfaces are present.
- Existing stale-alias suppression remains intact for framed outputs with `grammarFrame.resultFrame`.
- Focused morphology and VNC tests now cover both cases: stale source forms beside valid result frames are ignored, while metadata-only frames do not erase otherwise usable compatibility source forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Export Row Route Metadata Contract v1

Date: 2026-06-09

Decision:

- View/export rows now preserve LCM route/evidence/diagnostic metadata instead of flattening visible rows to form text alone.
- `normalizeUnifiedVerbOutputEntry()` carries Andrews authority refs, evidence status, source-evidence metadata, route family/stage, generation permission, diagnostic status/id, failed layer, failed contract layer, and result ok state.
- Rendered conjugation rows now copy detailed `grammar*` route datasets and `lcm*` failed-layer datasets before structured export rows are captured.
- CSV exports append LCM route, Andrews evidence, Nawat/source-evidence status, diagnostic id, failed layer, failed contract layer, and result status columns.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Linked-Promote Source Contract Handoff v1

Date: 2026-06-09

Decision:

- Adjectival linked-promote execution now mirrors the selected source/result frame as bounded source evidence instead of flattening the promoted surface into an unrelated generation route.
- `buildGenerateWordGrammarFrame()` now reads authority refs and source evidence from the override's adjectival NNC entry contract, preserved `grammarFrame`/`frames`, and mirrored source frame authority metadata.
- The executed route contract now records the promoted source route family, source route stage, source output kind, and source surface inside `sourceContract`.
- Source/result sameness is now role-tagged: the prior result frame becomes evidence for the new source contract, while the new result frame remains the generated output.
- Focused adjectival tests now assert Andrews refs, source evidence kind/status/flags, promoted route family, and promoted surface survive from UI promotion into execution.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Failed-Layer Diagnostic Priority v1

Date: 2026-06-09

Decision:

- Conjugation evaluation now promotes a stronger Andrews/LCM frame-status diagnostic over generic no-output diagnostics that only report `output/resultFrame`.
- Specific unsupported-route diagnostics still win over the generic frame-status label; for example, an adjectival route that requires a generated patientive source still displays that specific missing-source reason.
- The frame-status fallback now reports the LCM `output` layer, not a non-LCM `result` layer, when only the result frame is blocked.
- `buildGrammarFrameSubLabels()` now emits a compact `Falla LCM: <failedLayer> / <contractLayer>` label from diagnostic, route, authority, or result frames.
- This phase targets active combo/output rows where a generic "La generacion no produjo una forma." label could hide the failed contract layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adverbial Nuclear Frame-First Source Reader v1

Date: 2026-06-09

Decision:

- `buildAdverbialNuclearClauseFrame()` now reads promoted generated output through the LCM result frame before direct/compatibility `surfaceForms` and `result` text.
- Added adverbial nuclear helpers for frame-first surface extraction and source-input extraction from `grammarFrame`/`frames`, `result`, or `output`.
- Attached `grammarFrame.resultFrame.sourceInput` can now supply the source text when the caller promotes a generated result into Lesson 44 adverbial nuclear metadata.
- Stale compatibility `surfaceForms` and `result` text no longer override `grammarFrame.resultFrame.surfaceForms` for adverbial nuclear clause frames.
- Focused tests now cover a framed generated output with stale compatibility fields beside it.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adverbial Adjunction Nested Output Frame Reader v1

Date: 2026-06-09

Decision:

- Adverbial adjunction AST input readers now inspect nested `input.output.grammarFrame` / `input.output.frames` before falling back to nested compatibility `output.surfaceForms`, `output.surface`, or top-level compatibility `result`.
- This closes a composition-layer bypass where a promoted generated output could carry the correct LCM result frame inside its `output` object while the AST reader still used stale nested output fields.
- Focused tests now cover principal and adjoined inputs whose nested `output` objects contain both stale compatibility surfaces and a valid LCM result frame.
- The AST continues to compose supplied clause/unit surfaces only; it does not generate new Nawat/Pipil word forms.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM ResultFrame Hard Boundary v1

Date: 2026-06-09

Decision:

- Canonical grammar result contracts now treat an existing `grammarFrame.resultFrame` as an authoritative output boundary.
- `buildGrammarResultContract()` and metadata contract surface readers now stop at `resultFrame.surfaceForms` / `resultFrame.surface` when a result frame exists, instead of appending stale direct `surface`, `surfaceForms`, nested output surfaces, or compatibility `result` text.
- Output surface and output provenance readers now suppress direct `surface`, `surfaceStem`, and fallback surfaces when an explicit result frame exists, including blocked/empty frames.
- UI route state readers now stop at framed result surfaces when a result frame exists, so static route targets no longer copy local route-control surfaces into `grammarFrame.resultFrame.surfaceForms`.
- Focused tests now cover blocked framed output/provenance records carrying stale compatibility surfaces, generic grammar result contracts carrying stale direct aliases, and Nawat static route targets carrying stale local target surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM UI Renderable ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `getConjugationRenderableSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative renderability boundary before deciding whether an evaluation has visible output.
- `getConjugationSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative UI display boundary before formatting route rows, continuation targets, previews, and linked-promote controls.
- Stale top-level `surface`, `surfaceForms`, and `result` aliases no longer get appended to renderable/display surfaces when a canonical result frame exists.
- Focused tests now carry stale top-level display aliases beside valid LCM result-frame surfaces and assert that only the framed surfaces are visible.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generation Surface ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `resolveGenerateWordContractSurface()` and `normalizeGrammarFrameSurfaceForms()` now treat `grammarFrame.resultFrame` as the authoritative generated-output boundary.
- `getGenerateRuntimeSurfaceForms()` and `resolveGenerateRuntimeContractSurface()` now suppress stale direct `surface`, `surfaceForms`, and `result` aliases when a result frame exists.
- `getMorphologyApplicationSurfaceForms()` now suppresses stale direct morphology `surface`, `surfaceForms`, fallback surfaces, and `result` aliases when a result frame exists.
- Focused morphology/VNC tests now carry stale direct generator, runtime, and morphology surfaces beside framed outputs and assert that only the framed surfaces feed generated contracts.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Allomorphy ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `getVncAllomorphyContractSurfaceForms()` now treats `grammarFrame.resultFrame` as the authoritative VNC allomorphy output boundary.
- Stale direct `surface`, `outputSurface`, `selectedOutputSurface`, `nawatSurfaceSuffix`, and `result` aliases no longer get appended when a result frame exists.
- Metadata-only frames still allow compatibility `forms` fallback through `getVncAllomorphySourceSurfaceForms()`.
- Focused VNC tests now carry stale allomorphy aliases beside framed outputs and assert that only result-frame surfaces feed the source-form list.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Preterit ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Preterit class-based surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Preterit universal variant assembly readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `forms`, and `result` aliases no longer get appended when a result frame exists.
- Metadata-only preterit frames still allow compatibility form/result fallback because they do not carry an authoritative result frame.
- Focused preterit tests now carry stale top-level aliases beside framed outputs and assert that only result-frame surfaces feed the generated contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM NNC Panel ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Verb-derived nominal NNC surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Panel visibility/renderable surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `surfaceForms`, and `result` aliases no longer leak into verb-derived NNC contracts or panel visibility when a result frame exists.
- Metadata/no-frame NNC and panel readers still allow compatibility top-level fallback because no authoritative result frame is present.
- Focused NNC and UI tests now carry stale top-level aliases beside framed outputs and empty framed outputs, proving both framed surfaces and blocked frames stay authoritative.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Adverbial ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Adverbial nuclear clause surface readers now treat `grammarFrame.resultFrame` as the authoritative output boundary.
- Stale direct `surface`, `surfaceForms`, nested output surfaces, and `result` aliases no longer leak into framed adjectival/adverbial outputs.
- No-frame adjectival/adverbial readers still allow compatibility top-level fallback because no authoritative result frame is present.
- Focused adjectival and adverbial tests now carry stale top-level/direct/nested aliases beside framed outputs and assert that only result-frame surfaces feed the contract.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Composition ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Clause composition AST readers now treat `grammarFrame.resultFrame` as the authoritative surface boundary for supplied input nodes.
- Covered readers are adjectival modification, adverbial adjunction, complementation, and conjunction.
- Stale direct `surface`, `surfaceForms`, `surfaceDisplay`, nested output surfaces, compatibility `result`, and fallback `word` values no longer leak into composed AST nodes when an input carries a result frame.
- No-frame composition readers still allow compatibility supplied-surface fallback because these AST builders compose given clause/unit surfaces rather than generating word forms.
- Focused composition tests now carry stale top-level/nested aliases beside framed inputs and assert that only result-frame surfaces feed the AST nodes and composed surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Chip Entry ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC function chip-to-entry promotion now treats `grammarFrame.resultFrame` as the authoritative surface boundary.
- `getAdjectivalNncFunctionEntrySurfaceForms()` no longer appends the clicked/local surface when a contract result frame exists.
- A blank or blocked result frame now prevents stale clicked text from being written into the main verb input as an adjectival NNC function entry.
- Existing no-frame entry promotion still allows the clicked/local surface fallback because there is no authoritative result frame.
- Focused tests now cover both framed-surface promotion and empty-frame suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM UI Route State ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Nawat route state helpers now treat an existing `grammarFrame.resultFrame` as an authoritative route/output boundary even when it is empty.
- Static route target attachment no longer writes local target-surface fallbacks into top-level `surfaceForms` when the incoming record already has an empty result frame.
- Route station surface labels now suppress stale `surface`, `renderVerb`, and `inputValue` fallbacks when an empty result frame is present.
- Linked grammar path generation requests still preserve stage source input as the generation source, but they no longer use compatibility `nextSource` fields when a framed `nextSource` produced no surface.
- Focused state tests now cover framed surfaces, empty framed route targets, empty framed station labels, and empty framed linked-stage source suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Stage Rendering ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar path renderer labels now treat an existing `grammarFrame.resultFrame` as an authoritative source/display boundary.
- `getNawatLinkedGrammarStageDisplaySurface()` no longer falls through to compatibility `nextSource.displaySurface` or stage `surface` when a framed `nextSource` or stage has no output surface.
- `getNawatLinkedGrammarStageSourceVerb()` still preserves source input as a route source when no result frame is present, but an empty framed `nextSource` now suppresses stale compatibility source fields.
- Focused UI tests now cover both framed linked-stage surface labels and empty-frame suppression.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Adjectival Function Entry ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- VNC adjectival-function entry contract resolution now treats `grammarFrame.resultFrame` as the authoritative target-surface boundary.
- `getAdjectivalNncFunctionEntryContractSurface()` no longer appends stale top-level `surface` when a serialized entry contract has a result frame.
- Empty framed adjectival-function contracts now prevent `resolveAdjectivalNncFunctionOverrideFromInput()` from constructing a generation override from stale serialized surface text.
- Focused adjectival tests now cover stale serialized surface suppression for empty result frames.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Path Appendable State ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar path selection summaries now build appendable stage `sourceVerb` and `displaySurface` through the same frame-first stage helpers used by stage generation.
- Appendable choice construction no longer copies `stage.nextSource.sourceVerb` or `stage.nextSource.displaySurface` directly when an empty `grammarFrame.resultFrame` is present.
- Empty framed `nextSource` objects are filtered out of appendable choices instead of becoming stale route options.
- Focused state tests now cover direct source/display helper suppression for empty framed linked-stage `nextSource` objects.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM UI Dataset Failed-Layer Inference v1

Date: 2026-06-09

Decision:

- Route dataset projection now infers `grammarDiagnosticLayer` / `grammarDiagnosticContractLayer` from blocked frame status when diagnostics do not carry explicit layer metadata.
- Agreement row presentation now infers `data-lcm-failed-layer` / `data-lcm-contract-layer` from the same frame status fallback when sparse diagnostics are present.
- Inference order is authority unsupported, route generation blocked, then result-frame output blocked.
- The visible LCM labels and exported/dataset metadata now agree for sparse blocked diagnostics instead of leaving failed-layer fields blank.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Output Provenance ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Output surface readers were audited and already treated `grammarFrame.resultFrame` as the authoritative surface boundary, including empty-frame suppression.
- Output provenance primary-stem resolution now also treats an existing `grammarFrame.resultFrame` as authoritative.
- `getProvenancePrimaryStemSurface()` no longer falls through from an empty framed variant or top-level provenance record to stale `surfaceStem`, `stemSpec`, base/suffix, or fallback surface fields.
- Focused surface tests now cover empty framed provenance suppression for both top-level records and primary variants.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Override Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC generation override surface resolution now treats an existing override `grammarFrame.resultFrame` as authoritative even when it is empty.
- `resolveAdjectivalNncGenerationSurface()` no longer falls through from an empty framed override to stale `surface`, `patientivoSurface`, `nominalizedSurface`, `vncSurface`, `stem`, or input fallback values.
- `buildGenerateWordOverrideSourceEvidence()` now suppresses compatibility adjectival source-surface aliases when the mirrored source frame has an empty result frame.
- Empty framed adjectival overrides remain blocked at the result/source-evidence layer instead of being revived as selected generated-stage evidence.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Patientive Continuation Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Patientive pre-locative continuation rendering now reads nested nominalization source surfaces through the shared frame-first UI surface reader.
- `resolvePatientivoSourceSurfaceForContinuation()` now uses `getPrimaryConjugationSurface(profileSource)` before any source aliases.
- Compatibility `sourceSurface`, `surface`, and `generatedSurface` aliases remain available only when the nested profile source has no `grammarFrame.resultFrame`.
- An empty framed nominalization source no longer revives stale profile aliases as continuation source material.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Derivation Continuation Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Derivation continuation contracts now resolve source material through an existing `grammarFrame.resultFrame` before direct source aliases.
- `getDerivationContinuationContractSourceInput()` now reads `resultFrame.surfaceForms` and `resultFrame.surface`, then stops when a result frame exists.
- Compatibility `surfaceForms`, `surface`, `result`, `sourceSurface`, `patientivoSurface`, `characteristicSurface`, action/agentive stems, and noun-stem aliases remain available only for unframed continuation records.
- `attachDerivationContinuationGrammarContract()` now writes the frame-first source value into both `resultFrame.sourceInput` and `routeContract.sourceContract.sourceSurface`.
- Empty framed continuation sources no longer revive stale source aliases into continuation metadata.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Possession Ti Source Evidence ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Andrews 54.4 possession-`ti` source evidence now treats an ordinary NNC source `grammarFrame.resultFrame` as an authoritative generation boundary.
- `buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput()` now rejects a supported-looking NNC source when it carries an empty result frame.
- Predicate-stem aliases from `formulaSlots`, `nncBasic`, or top-level `stem` no longer revive a blocked/empty generated NNC as denominal possession-`ti` route evidence.
- The possession-`ti` preview route now remains absent for empty framed ordinary NNC sources instead of routing from stale local aliases.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Patientivo Prelocative Direct Source Fallback Boundary v1

Date: 2026-06-09

Decision:

- Patientive pre-locative continuation source rendering now treats an existing nested nominalization source `grammarFrame.resultFrame` as the full source boundary.
- `resolvePatientivoSourceSurfaceForContinuation()` still preserves frame-provided source surfaces first, but if the nested profile source has an empty result frame it now returns an empty source instead of calling `getDirectPatientivoSourceSurface()`.
- Compatibility `sourceSurface`, `surface`, `generatedSurface`, and direct patientive source regeneration remain available only when the nested profile source has no result frame contract.
- This keeps mirrored source/output material from inverting the LCM boundary: an empty frame stays empty instead of being revived by source aliases or direct preview generation.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Stage Source/Display ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar path stage source helpers now treat the stage's own `grammarFrame.resultFrame` as an authoritative boundary before compatibility stage fields.
- `getNawatLinkedGrammarPathStageSourceVerb()` and `getNawatLinkedGrammarStageSourceVerb()` preserve a framed stage surface when no explicit next-source verb is present, but an empty stage result frame now suppresses stale `sourceVerb`, `inputValue`, `renderVerb`, `displaySurface`, and next-source aliases.
- Successful finite stages still keep source identity and generated display separate: `nextSource.sourceVerb` can remain the source label while the stage result frame supplies the generated display surface.
- Linked selection summary labels and appendable choice extraction now route appendable stage source/display reads through the same frame-aware helpers, and empty framed appendable stages are skipped instead of shown as viable next steps.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Promoted Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Promoted linked grammar path source controls now read `grammarFrame.resultFrame` before source aliases.
- `applyNawatLinkedGrammarPathSourceInput()` now syncs a framed promoted source surface into the route input and treats an empty promoted-source result frame as missing source material instead of applying stale `sourceVerb`, `inputValue`, or `displaySurface`.
- `buildNawatLinkedGrammarPromotedSourceSubLabels()` now renders promoted-source labels from the LCM result frame first and emits no labels for empty framed promoted sources.
- Compatibility promoted-source fields remain available only for unframed source objects.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Function Target ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC function tab rendering now resolves its target surface through a frame-aware helper.
- `resolveAdjectivalNncFunctionTargetSurface()` reads `override.adjectivalNnc.grammarFrame.resultFrame` / `frames.resultFrame` before any compatibility override text.
- If the adjectival-function override carries an empty result frame, rendering stops instead of falling back to stale `override.verb` or serialized adjectival surface text.
- The compatibility `override.verb` fallback remains available only for unframed override objects.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Orthography Label ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Shared LCM grammar-frame sublabels now treat `resultFrame` as the authoritative output boundary before rendering Nawat realization labels.
- `buildGrammarFrameSubLabels()` still reads result-frame surfaces first, but when a result frame exists and is empty it no longer falls through to `orthographyFrame.surface`, `orthographyFrame.surfaceForms`, `orthographyFrame.nawatRuleSpelling`, or the generic "pendiente" label.
- Orthography-only metadata that has no result frame can still show orthography realization labels.
- Blocked framed routes now show status, route, Andrews evidence, failed layer, and diagnostics without displaying a stale Nawat realization.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Composition Surface Fallback ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Composition surface helpers now treat input `resultFrame`s as authoritative before fallback surface parameters.
- `getAdjectivalModificationSurface()`, `getAdverbialAdjunctionSurface()`, `getComplementClauseSurface()`, and `getConjunctionClauseSurface()` still preserve framed result surfaces first, but an empty input result frame now returns an empty surface instead of reviving fallback or stale compatibility text.
- Compatibility `surface`, `surfaceForms`, `surfaceDisplay`, `output.surface`, `result`, `word`, and fallback parameters remain available only for unframed composition inputs.
- The AST builders for modification, adjunction, complementation, and conjunction inherit this boundary because they construct their clause/conjunct nodes through these helpers.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Nuclear Shell Slot ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Nominal nuclear-clause shell slot readers now treat framed predicate and subject-number connector inputs as authoritative.
- `buildNominalNuclearClauseShell()` preserves structural `stem`, `connector`, `surface`, and display aliases only when the slot object has no `grammarFrame.resultFrame` / `frames.resultFrame`.
- If a predicate or connector slot has an empty result frame, the shell leaves that slot empty (`∅` / `Ø` for display) instead of reviving stale `stem`, `surface`, `displaySurface`, or fallback predicate text.
- Framed slot surfaces remain preserved when present, so shell metadata can echo generated/result contracts without bypassing the LCM result layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Agentive Continuation Stem ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Agentive continuation renderers now treat an existing row `resultFrame` as the boundary for continuation source stems.
- `getCustomaryAgentiveStemsFromEvaluation()` and `getPreteritAgentiveGeneralUseStemsFromEvaluation()` now read `getConjugationSurfaceForms(result)` once and stop when the result has an empty frame.
- When a result frame exists with surfaces, continuation stems are derived from those framed surfaces; shell predicate stems are used only for unframed compatibility results.
- Empty framed agentive rows can no longer create nominal, VNC, ownerhood, complement, or adverbial continuation chips from stale `nuclearClauseShell.slots.predicate.stem` metadata.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Execution Next-Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar path execution source promotion now treats `nextSource` and `selectedStage` result frames as authoritative when generated output is absent or unframed.
- `getNawatLinkedGrammarPathExecutionSourceOptions()` preserves framed generated surfaces first, then framed next-source/stage surfaces, and only uses compatibility `sourceVerb` / `displaySurface` fields for unframed objects.
- Empty framed `nextSource` or `selectedStage` objects now suppress stale promotion options instead of falling through to stale linked-stage text.
- Focused state tests now cover framed next-source preservation and empty-framed next-source suppression in execution source options.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM NNC Formula Echo Slot ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Ordinary and adjectival NNC formula echo helpers now treat framed predicate and subject-number connector slot objects as authoritative.
- `buildOrdinaryNncFormulaEchoFromSlots()` and `buildAdjectivalNncFormulaEchoFromSlots()` preserve framed slot surfaces before compatibility `stem`, `connector`, or `surface` aliases.
- If a predicate slot has an empty result frame, the formula echo stops instead of displaying a stale predicate stem.
- If a connector slot has an empty result frame, the formula echo uses the neutral display connector `Ø` instead of reviving stale connector text.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Allomorphy Orthography ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- VNC allomorphy metadata contracts now treat an existing `resultFrame` as authoritative for the attached orthography subframe.
- `attachVncAllomorphyGrammarContract()` preserves framed surface forms in both `resultFrame` output and `grammarFrame.orthographyFrame`.
- If a VNC allomorphy contract has an empty result frame, nested `options.orthographyFrame.surface` and `options.orthographyFrame.surfaceForms` can no longer revive stale output text.
- Unframed compatibility contracts can still use orthography-frame surface aliases, preserving existing metadata-only paths that do not have a canonical result frame yet.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Shared GrammarFrame Orthography Order Boundary v1

Date: 2026-06-09

Decision:

- The shared `GRAMMAR_FRAME_KEYS` and `GRAMMAR_FRAME_LAYER_ORDER` now put `orthographyFrame` / `orthography` immediately after authority and before unit metadata.
- `buildGrammarMetadataContractFrame()` now treats an inbound `resultFrame` as the surface boundary for provided orthography subframes.
- If a metadata record has an inbound empty result frame, stale `options.orthographyFrame.surface`, `options.orthographyFrame.surfaceForms`, and top-level `surfaceForms` are suppressed instead of reviving output text.
- Metadata records without an inbound result frame can still carry orthography-only metadata, preserving diagnostic bridge paths that do not generate word surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Promoted Source GeneratedSurface Boundary v1

Date: 2026-06-09

Decision:

- `applyNawatLinkedGrammarPathSourceInput()` now treats a promoted source result frame as authoritative for `sourceContext.generatedSurface`.
- When a promoted source has framed generated output, the source context carries the framed surface instead of stale `generatedSurface` metadata.
- When a promoted source has no result frame, current `generatedSurface` metadata remains available for unframed paths.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Stage SourceVerb ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Linked-stage source helpers now treat a stage-level result frame as authoritative for the stage source verb.
- `getNawatLinkedGrammarPathStageSourceVerb()` and `getNawatLinkedGrammarStageSourceVerb()` no longer prefer stale `nextSource.sourceVerb` when the stage itself has a nonempty result frame.
- Empty stage result frames still suppress compatibility stage and next-source fields.
- Existing next-source result-frame behavior remains unchanged: if `nextSource` has its own result frame, it is still read first.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Subject Connector ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Generated nominal nuclear-clause shell metadata now resolves `num1Num2` through frame-only result evidence before compatibility connector fields.
- `resolveGenerateWordNominalConnectorSurface()` preserves framed connector surfaces; `resolveGenerateWordNominalConnectorDisplaySurface()` preserves framed display surfaces and only uses compatibility display aliases when the connector has no result frame.
- Empty connector result frames now suppress stale `surface`, `displaySurface`, and `displayConnector` values, leaving the neutral `Ø` display where the NNC formula requires a visible connector label.
- Patientivo route state suffix discovery now reads the subject-number connector through `getStateNum1Num2Surface()`, so empty connector frames cannot leak stale suffix text.
- Sustantivo renderer connector labels now use `resolveNominalNum1Num2Surface()`, preserving framed connector output and blocking stale display text for empty frames.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Intensified Adjectival Slot ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Intensified adjectival NNC generation now reads source formula-slot predicate and subject-number connector surfaces through the frame-aware adjectival formula-slot resolver.
- `buildIntensifiedAdjectivalNncOutput()` preserves framed source predicate and connector surfaces before compatibility `stem`, `connector`, or `surface` text.
- Empty source predicate result frames now block intensified generation instead of reviving stale predicate stems.
- Empty source connector result frames now suppress stale connector text and produce the zero connector display for the intensified NNC formula.
- `buildIntensifiedAdjectivalNncFormulaSlots()` no longer carries the source predicate result frame into the newly generated intensified predicate slot; the generated predicate uses the intensified stem while keeping the source stem as metadata.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM GenerateWord SourceInput ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- `resolveGenerateWordFrameSourceInput()` now treats an existing generated `resultFrame` as the boundary before compatibility `result.stem` or fallback `verb` text.
- Framed generated source surfaces are still preserved from `resultFrame.surfaceForms` / `resultFrame.surface`.
- Empty generated result frames now suppress stale generated stems and fallback verb text in `grammarFrame.resultFrame.sourceInput`.
- Explicit `renderVerb` remains available as user/input evidence, so this phase blocks stale generated-output fallbacks without erasing real source-input context.
- Unframed compatibility paths can still use `result.stem` or `verb`, preserving metadata paths that do not yet carry canonical frames.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival GrammarFrame Source Metadata ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC grammar-frame construction now treats an existing output `resultFrame` as the boundary for source/stem metadata aliases.
- `buildAdjectivalNncGrammarFrame()` preserves ordinary unframed source aliases, but an empty framed result now suppresses stale `patientivoSurface`, `nominalizedSurface`, `vncSurface`, top-level `stem`, and `sourcePredicateStem` in `resultFrame.sourceInput` and `stemFrame`.
- `getAdjectivalNncResultFramePayload()` centralizes the result-frame boundary used by the adjectival surface reader and grammar-frame metadata writer.
- Empty framed adjectival contracts no longer carry stale source text into diagnostics or route metadata while showing no generated surface.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adjectival Override Dataset ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adjectival NNC function input overrides now treat a serialized entry contract's `resultFrame` as authoritative before fallback dataset surfaces.
- `resolveAdjectivalNncFunctionOverrideFromInput()` still accepts compatibility `data-adjectival-nnc-function-surface` when no framed contract is present, but an empty framed result now blocks stale dataset text from rebuilding an `adjectivalNnc` override.
- `hasAdjectivalNncFunctionEntryContractResultFrame()` centralizes the override-side result-frame boundary in the VNC facade.
- This keeps clicked adjectival-function controls aligned with the generated contract instead of letting HTML dataset state route a blocked result into a default potential/combo path.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Ordinary NNC Row Connector Display Boundary v1

Date: 2026-06-09

Decision:

- Ordinary NNC row sublabels now resolve the displayed subject-number connector through the shared frame-first connector reader.
- `rowConnectorSlotLabel` in `src/ui/rendering/rendering.js` uses `resolveNominalNum1Num2Surface()` before compatibility `connector` / `surface` slot text.
- Empty connector `resultFrame`s now display the neutral `Ø` label instead of reviving stale formula-slot connector text in ordinary NNC rows.
- This keeps the row-level visible NNC formula explanation aligned with the same subject connector contract already used by generated nominal shells and shared sustantivo renderer labels.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Route Surface-Trail Source-Tense Boundary v1

Date: 2026-06-09

Decision:

- Static Nawat route surface-trail rendering now treats a source-tense station `resultFrame` as authoritative before compatibility station surface text or generated source-surface fallback.
- `getNawatRouteSurfaceTrailParts()` still preserves compatibility source-tense station surfaces when no frame exists, but an empty framed source-tense station now contributes no stale source step to the trail.
- Framed source-tense station surfaces are preserved in the route trail before compatibility station fields.
- This keeps route-preview/user-action trails aligned with the digital grammar ability-map contract: the next visible move must come from the station result frame or stop at that layer.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Linked Stage Dash Source Boundary v1

Date: 2026-06-09

Decision:

- Linked grammar stage sublabel rendering now normalizes the no-output marker `—` before treating stage surface text as a next source.
- `getNawatLinkedGrammarStageSourceVerb()` already preferred framed `nextSource` and stage result surfaces; the unframed final fallback now stops when the only remaining stage surface is `—`.
- Dash-only linked stage controls no longer advertise `Siguiente fuente: —` as an available next move.
- This keeps linked route controls aligned with the grammar ability-map contract: unsupported or empty generation must expose a blocked layer, not a fake source string.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Adverbial Nuclear Source ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Adverbial nuclear clause frames now treat an inbound `resultFrame` as authoritative for source metadata as well as output surfaces.
- `getAdverbialNuclearContractSourceText()` now reads `resultFrame.sourceInput` first and stops there when a result frame exists.
- Empty framed adverbial results no longer revive stale `source`, `sourceStem`, `analysisStem`, `finalStem`, compatibility `surface`, or `result` aliases.
- `buildAdverbialNuclearClauseFrame()` now suppresses stale source stem/final/analysis metadata when the source result frame is empty.
- The shared metadata contract builder no longer stringifies object-valued `node.source` / `node.target` as `[object Object]` for `resultFrame.sourceInput`.
- This keeps Lesson 44 adverbial ability-map entries tied to framed generated evidence instead of configured adverbio labels.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Shared Surface Reader Explicit ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Shared surface-form readers now express the LCM result-frame boundary directly in code instead of relying only on an earlier return.
- `normalizeGrammarFrameSurfaceForms()`, `getGenerateRuntimeSurfaceForms()`, `getConjugationRenderableSurfaceForms()`, and `getConjugationSurfaceForms()` now gate top-level compatibility `surface` reads behind `!hasResultFrame`, matching the existing guards for `surfaceForms` and `result`.
- Empty `resultFrame`s continue to stop generation/runtime/agreement/rendering display paths before stale `surface`, `surfaceForms`, or `result` aliases can revive a blocked form.
- Focused tests now cover empty-frame suppression for generate-word contract readers, runtime support readers, agreement renderable surfaces, and shared UI renderer surfaces.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Morphology Application Explicit ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Morphology-application surface reading now expresses the LCM result-frame boundary directly in code.
- `getMorphologyApplicationSurfaceForms()` now gates top-level compatibility `surface` behind `!hasResultFrame`, matching the existing guards for `surfaceForms`, `result`, and fallback surface input.
- `getMorphologyApplicationSourceSurfaceForms()` inherits the boundary because it consumes `getMorphologyApplicationSurfaceForms()` first and stops when any `resultFrame` exists.
- Empty morphology-application result frames no longer revive stale `surface`, `surfaceForms`, `result`, compatibility `forms`, or fallback surface material.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Fixed Andrews PDF Source Switch v1

Date: 2026-06-09

Decision:

- The repo source-of-truth references now point to the fixed re-OCR Andrews PDF at `/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf`.
- `docs/CODEX_BOARD.md`, `docs/ANDREWS_PDF_DIGEST.md`, and `docs/ANDREWS_SECTION_DIGEST.md` no longer point to the previous local PDF path.
- Future Andrews wording checks should use the fixed re-OCR PDF path above.

## Completed Phase: LCM Metadata Output Explicit ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Shared grammar metadata, output-surface, and output-provenance readers now express the LCM result-frame boundary directly in code.
- `getGrammarResultContractSurfaceForms()` and `getGrammarMetadataContractSurfaceForms()` gate top-level and nested output `surface` reads behind `!hasResultFrame`.
- `getOutputSurfaceSurfaceForms()` gates top-level `surface` and fallback surface behind `!hasResultFrame`.
- `getOutputProvenanceSurfaceForms()` gates top-level `surface`, `surfaceStem`, and fallback surface behind `!hasResultFrame`.
- Empty result frames remain authoritative and cannot be revived by stale metadata/output/provenance aliases.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Grammar Result Contract Explicit Surface Boundary v1

Date: 2026-06-09

Decision:

- `getGrammarResultContractSurfaceForms()` now gates top-level contract `surface` behind `!hasResultFrame`, matching the already guarded `surfaceForms` and compatibility `result` reads.
- Empty `grammarFrame.resultFrame`s remain authoritative in the shared `buildGrammarResultContract()` path and cannot be revived by stale top-level `surface`, `surfaceForms`, or `result` aliases.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Forward Derivation Provenance Stem Boundary v1

Date: 2026-06-09

Decision:

- Forward-derivation diagnostic metadata now resolves selected stem candidates through a frame-aware provenance reader.
- `resolveForwardDerivationMetadataStemSurface()` preserves framed provenance surfaces first and treats an empty provenance `resultFrame` as authoritative before compatibility `surfaceStem`, `stemSpec`, or `stem` aliases.
- `buildGeneratedForwardDerivationFrameMetadata()` now uses this reader for both selection metadata and forward-stem provenance, so stale provenance `surfaceStem` cannot become a displayed derived-stem label after an empty result frame.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM VNC Allomorphy Source/Target ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- VNC allomorphy metadata contracts now treat an existing `resultFrame` as authoritative for source/stem/target metadata as well as output surfaces.
- `getVncAllomorphyContractSourceInput()` preserves `resultFrame.sourceInput` or the framed result surface, then stops when a result frame exists.
- `attachVncAllomorphyGrammarContract()` now writes frame-bound source input into `resultFrame.sourceInput`, suppresses stale `sourceStem`, `stem`, `outputStem`, and `sourceSuffix` aliases in `stemFrame` when the result frame is empty, and overwrites stale target-contract output aliases with the framed surface.
- Empty VNC allomorphy result frames can no longer revive stale source, stem, selected-output, target-output, or suffix text into grammar-frame metadata.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM View Export ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- View-export row normalization now resolves visible form text through the LCM result-frame reader before compatibility export text.
- `normalizeUnifiedVerbOutputEntry()` now reads `grammarFrame.resultFrame.surfaceForms`, `grammarFrame.resultFrame.surface`, top-level/nested contract surfaces, then compatibility result text only when no result frame exists.
- Empty framed export rows now produce a blank exported form instead of reviving stale `form`, nested `surface`, `surfaceForms`, or `result` aliases.
- Compatibility rows without grammar frames keep their existing `form` export behavior.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Shared Metadata SourceInput ResultFrame Boundary v1

Date: 2026-06-09

Decision:

- Shared grammar metadata contracts now treat an inbound `resultFrame` as authoritative for source-input metadata.
- `buildGrammarMetadataContractFrame()` preserves `resultFrame.sourceInput` or the framed result surface before source aliases.
- If an inbound result frame exists but is empty, stale `options.sourceInput`, `candidate`, `sourceName`, object-valued source fields, primitive `source`/`target`, and provided source-contract `sourceInput` / `sourceSurface` no longer revive source material in `resultFrame` or `routeContract.sourceContract`.
- Metadata routes without an inbound result frame keep their compatibility diagnostic/source-input behavior.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: LCM Generic Diagnostic Layer Contract v1

Date: 2026-06-09

Decision:

- Shared grammar diagnostic normalization now infers and preserves `failedLayer` plus `contractLayer` for raw or string diagnostics.
- The inferencer maps Andrews/evidence authority diagnostics to `authority/authorityFrame`, output/result diagnostics to `output/resultFrame`, agreement/state diagnostics to `agreement/participantFrame`, inflection diagnostics to `inflection/inflectionFrame`, stem/root/source diagnostics to `stem/stemFrame`, nuclear-clause diagnostics to `nuclear-clause/clauseFrame`, and morph-boundary diagnostics to `morph-boundary/morphBoundaryFrame`.
- Explicit diagnostic layer fields remain authoritative; route wrappers can still assign their own route contract layer when they own the blocked route boundary.
- This phase adds no Nawat/Pipil surfaces, fixture evidence, grammar licenses, or Andrews/Classical examples.

## Completed Phase: Andrews 54.2.1 Executable Ti Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.1 `ti` is now executable rule contract `andrews-54-2-1-ti`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is an absolutive-state NNC predicate source stem, operation is denominal verbstem suffixation with Nawat `ti`, and output is an intransitive VNC stem contract.
- The executable route generates a Nawat route stem from supplied Nawat/Pipil source evidence (`pusuk` -> `pusukti`) and records the Andrews §54.2.1 Class A/B source-final class contract without importing Classical surface spellings.
- Non-absolutive or possessive sources are blocked before generation with `failedLayer: agreement` and `contractLayer: participantFrame`, so the route reports the Andrews state boundary rather than a generic empty-output failure.
- Denominal route previews, requests, executions, activations, grammar frames, and linked UI chips now carry `executableRuleId` and a summarized executable rule contract.
- Linked denominal Andrews chips expose `data-executable-rule-id` and the `calc-guidance__chip--andrews-rule-executable` class; `index.html` cache-busters now point at the updated state/rendering/CSS assets.

## Completed Phase: Andrews 54.2.2 Executable Hui Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.2 `hui` is now executable rule contract `andrews-54-2-2-hui`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is an absolutive-state NNC predicate source stem, operation is denominal verbstem suffixation with Classical `hui` converted to Nawat/Pipil `wi`, and output is an intransitive VNC stem contract.
- The executable route generates a Nawat route stem from supplied Nawat/Pipil source evidence (`pusuk` -> `pusukwi`) and records the Andrews §54.2.2 source-final class contract: consonant-final sources produce Class A, vowel-final sources produce Class B.
- Non-absolutive or possessive sources are blocked before generation with `failedLayer: agreement` and `contractLayer: participantFrame`, so the route reports the Andrews state boundary rather than a generic empty-output failure.
- The §54.2.2 inventory contract now reports executable-rule support and route-surface generation instead of `not-generated`; coverage counts now leave this contract out of the unmodeled list.
- Denominal route previews, requests, executions, activations, grammar frames, and linked UI chips carry `executableRuleId: andrews-54-2-2-hui` when they use this rule.

## Completed Phase: Andrews 54.2.3 Executable Root-Plus-Ya Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.3 root-plus-`ya` is now executable rule contract `andrews-54-2-3-ya`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a Nawat nounroot or nounstem treated as root rank, operation is denominal verbstem suffixation with `ya`, and output is an intransitive VNC stem contract.
- The executable route generates a Nawat route stem from supplied Nawat/Pipil source evidence (`shuchi` -> `shuchiya`) and records the Andrews §54.2.3 Class A/B contract for denominal `ya` verbstems.
- Generated `ti` or `hui/wi` verbstem sources are blocked at `stem/stemFrame` for this direct root-plus-`ya` rule, because Andrews treats those as the separate deverbal `ti-ya` and `hui-ya` contracts.
- Possessive-state sources are blocked before generation with `failedLayer: agreement` and `contractLayer: participantFrame`.
- The §54.2.3 root-plus-`ya` inventory contract now reports executable-rule support and route-surface generation instead of `not-generated`; coverage counts now leave this contract out of the unmodeled list.
- Denominal route previews, requests, executions, activations, grammar frames, and linked UI chips carry `executableRuleId: andrews-54-2-3-ya` when they use this rule.

## Completed Phase: Andrews 54.2.3 Executable Ti-Ya Deverbal Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.3 deverbal `ti-ya` is now executable rule contract `andrews-54-2-3-ti-ya`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `ti` VNC source, operation is deverbal `ya` suffixation after the `ti` source, and output is an intransitive VNC stem contract.
- The executable route generates a Nawat route stem only from bounded generated-`ti` source evidence (`pusukti` -> `pusuktiya`) and records the Andrews §54.2.3 Class A/B contract for deverbal `ti-ya` stems.
- Direct noun/root previews no longer fabricate `ti-ya` output; without generated `ti` source evidence, the route is blocked at `authority/authorityFrame` instead of producing `(source-ti-ya)` from the bare source.
- Supplied non-`ti` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`, and possessive-state sources remain blocked at `agreement/participantFrame`.
- The §54.2.3 `ti-ya` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.
- Generated §54.2.1 `ti` stages can satisfy the `ti-ya` source requirement, and generated `ti-ya` stages still provide `ya`-source evidence for the existing `ya`-deleting `lia` continuation guard.

## Completed Phase: Andrews 54.2.3 Executable Hui-Ya Deverbal Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.3 deverbal `hui-ya` is now executable rule contract `andrews-54-2-3-hui-ya`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `hui` VNC source, operation is deverbal `ya` suffixation after the Nawat `wi` source, and output is an intransitive VNC stem contract.
- The executable route generates a Nawat route stem only from bounded generated-`hui/wi` source evidence (`pusukwi` -> `pusukwiya`) and records the Andrews §54.2.3 Class B contract for deverbal `hui-ya` stems.
- Direct noun/root previews no longer fabricate `hui-ya` output; without generated `hui` source evidence, the route is blocked at `authority/authorityFrame` instead of producing `(source-hui-ya)` from the bare source.
- Supplied non-`wi` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`, and possessive-state sources remain blocked at `agreement/participantFrame`.
- The §54.2.3 `hui-ya` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.
- Generated §54.2.2 `hui/wi` stages can satisfy the `hui-ya` source requirement, and generated `hui-ya` stages still provide `ya`-source evidence for the existing `ya`-deleting `lia` continuation guard.

## Completed Phase: Andrews 54.2.3 Executable Ya-Lia Causative/Applicative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.3 `ya-lia` is now executable rule contract `andrews-54-2-3-ya-lia`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `ya` VNC source, operation deletes source-final `ya` and adds Nawat `lia`, and output is a single-object causative-or-applicative VNC stem contract.
- The executable route generates a Nawat route stem only from bounded generated-`ya` source evidence (`pusukya` -> `pusuklia`); direct noun/root previews now block at `authority/authorityFrame` instead of fabricating `(source-lia)` from a bare source.
- Supplied non-`ya` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`, and possessive-state sources remain blocked at `agreement/participantFrame`.
- Generated §54.2.3 `ya`, `ti-ya`, and `hui-ya` stages can satisfy the `ya-lia` source requirement and provide finite-generation requests with required object-prefix controls.
- The §54.2.3 `ya-lia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.2.2 Executable Hui-Lia Causative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.2 `hui-lia` is now executable rule contract `andrews-54-2-2-hui-lia`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `hui/wi` VNC source, operation adds Nawat `lia`, and output is a single-object causative VNC stem contract.
- The executable route generates a Nawat route stem only from bounded generated-`hui/wi` source evidence (`pusukwi` -> `pusukwilia`); direct noun/root previews now block at `authority/authorityFrame` instead of fabricating `(source-wi-lia)` from a bare source.
- Supplied non-`wi` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`, and possessive-state sources remain blocked at `agreement/participantFrame`.
- Generated §54.2.2 `hui/wi` stages can satisfy the `hui-lia` source requirement and provide finite-generation requests with required object-prefix controls.
- The §54.2.2 `hui-lia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.2.4 Executable Limited A Inceptive/Stative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.4 limited inceptive/stative `a` is now executable rule contract `andrews-54-2-4-a`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is an absolutive Nawat nounstem source, operation adds Nawat `a`, and output is an intransitive Class C VNC stem contract.
- The executable route generates a Nawat route stem from a bounded nounstem source (`tlawi` -> `tlawia`) and keeps the `limitedUse` route boundary visible for UI/diagnostics.
- Possessive-state sources are blocked at `agreement/participantFrame`; generated VNC/source-category continuations are blocked at `stem/stemFrame` instead of being treated as valid §54.2.4 nounstem inputs.
- The §54.2.4 `a` inventory contract now reports executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.2.5 Executable Hua Inceptive/Stative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.5 `hua` is now executable rule contract `andrews-54-2-5-hua`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a confirmed deverbal `(-yo)-tl` nounstem source realized as a Nawat/Pipil `yu`-matrix source, operation adds Nawat `wa`, and output is an intransitive Class A VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms the §39.3 deverbal `(-yo)-tl` source; a valid `yu` source can route `tukayu` -> `tukayuwa`.
- Possessive-state sources are blocked at `agreement/participantFrame`, and non-`yu` source stems are blocked at `morph-boundary/morphBoundaryFrame`.
- The §54.2.5 `hua` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.3 Executable Included-Possessor Ti Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.3 included-possessor `ti` is now executable rule contract `andrews-54-3-included-possessor-ti`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a confirmed possessive-state NNC predicate surface, operation adds Nawat `ti`, and output is an intransitive Class A VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms a possessive-state NNC predicate; a valid generated/source-evidenced possessive predicate can route `nukal` -> `nukalti`.
- Absolutive/plain NNC predicate sources are blocked at `agreement/participantFrame`; missing possessive predicate surface is blocked at `stem/stemFrame`.
- The §54.3 route preserves the Andrews boundary that the possessor remains inside the derived verbstem and is not transformed into a VNC object. Finite requests remain intransitive and require an explicit tense request.
- The §54.3 inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.2.1/54.4 Executable Ti-Lia Causative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.2.1/§54.4 `ti-lia` is now executable rule contract `andrews-54-2-54-4-ti-lia`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `ti` VNC stem source, operation adds Nawat `lia`, and output is a single-object causative Class C VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms a generated `ti` verbstem source; a valid generated `ti` source can route `pusukti` -> `pusuktilia`.
- Supplied non-`ti` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`, and original possessive-state NNC predicates are blocked at `agreement/participantFrame` because the source must be the generated `ti` VNC stem, not the pre-`ti` NNC predicate.
- The §54.2.1/§54.4 `ti-lia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.5 Executable Ti-A Single-Object Causative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.5 `ti-a` is now executable rule contract `andrews-54-5-ti-a`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `ti` VNC stem source, operation adds Nawat `a`, and output is a single-object first-type causative Class C VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms a generated `ti` verbstem source; a valid generated `ti` source can route `pusukti` -> `pusuktia`.
- Supplied non-`ti` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`.
- Possessive-state sources are explicitly blocked at `agreement/participantFrame` for this contract because Andrews §54.5 moves possessive-state sources into double-object `ti-a` formations; the current executable route models only the single-object generated-`ti` path.
- The §54.5 `ti-a` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 54.6 Executable T-Ia Applicative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §54.6 `t-ia` is now executable rule contract `andrews-54-6-t-ia`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated intransitive `ti` VNC stem source, operation deletes final `i` from the `ti` source stem and adds Nawat `ia`, and output is an applicative Class C VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms a generated `ti` verbstem source; a valid generated `ti` source can route `pusukti` through replacive `pusukt` to `pusuktia` with segmented input `(pusukt)-(ia)`.
- Supplied non-`ti` source verbstems are blocked at `morph-boundary/morphBoundaryFrame`.
- Original possessive-state NNC predicates are blocked at `agreement/participantFrame`; generated `ti`-of-possession sources remain eligible because Andrews says §54.6 can apply to either inceptive/stative `ti` or `ti`-of-possession stems.
- The §54.6 `t-ia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.1 Executable Temporal Tia Intransitive Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.1 temporal `tia` is now executable rule contract `andrews-55-1-temporal-tia`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a confirmed compound-temporal nounstem with a time-segment matrix and numeral embed, operation adds Nawat `tia`, and output is an intransitive VNC stem contract.
- Direct noun/root previews now block at `authority/authorityFrame` unless source evidence explicitly confirms the compound-temporal source; a valid source can route `seilwi` -> `seilwitia`.
- Explicit `locativo-temporal` output rows still do not become source evidence automatically; they block at `authority/authorityFrame` unless the caller provides temporal compound classification.
- Missing confirmed source surface is blocked at `stem/stemFrame`, and possessive-state predicates are blocked at `agreement/participantFrame`.
- The §55.1 `tia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.2 Executable Causative Tla Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.2 causative `tla` is now executable rule contract `andrews-55-2-causative-tla`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is an absolutive nounstem source, operation adds Nawat/Pipil `ta` from Classical `tla`, and output is a causative Class A VNC stem contract.
- Direct nounstem previews can route `pusuk` -> `pusukta` with segmented transitive input `(pusuk)-(ta)` and object-prefix-required finite requests.
- Possessive-state predicate sources are blocked at `agreement/participantFrame`; generated VNC sources are blocked at `stem/stemFrame` so mirrored continuation state does not feed back as a nounstem.
- The separate §55.2 applicative counterpart and the note on intransitive `tla` remain unmodeled; this phase implements only the main causative `tla` paragraph.
- The §55.2 causative `tla` inventory contract now reports executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.2 Executable Tla-Ti-Lia Applicative Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.2 applicative counterpart for causative `tla` stems is now executable rule contract `andrews-55-2-tla-ti-lia-applicative`, not just denominal inventory metadata.
- The rule contract carries authority, input, operation, output, `generate()`, and `diagnose()` metadata: input is a generated causative `tla` VNC stem source, operation replaces Nawat/Pipil `ta` corresponding to Classical `tla` with `ti` before adding `lia`, and output is an applicative VNC stem contract.
- Direct nounstem previews now block at `authority/authorityFrame` unless source evidence explicitly confirms the generated causative `tla` source; a valid causative source can route `pusukta` through `pusuk` to `pusuktilia` with segmented input `(pusukti)-(lia)`.
- Original nounstem sources are blocked at `agreement/participantFrame`; non-`ta` generated sources are blocked at `morph-boundary/morphBoundaryFrame`.
- The separate §55.2 note on intransitive `tla` remains unmodeled; this phase implements only the applicative counterpart of the main causative `tla` paragraph.
- The §55.2 `tla-ti-lia` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.2 Executable Intransitive Tla Note Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.2 note intransitive `tla` is now executable rule contract `andrews-55-2-intransitive-tla`, not just denominal inventory metadata.
- Because Andrews says this `tla` is even less productive than causative `tla`, the route is source-evidence-gated: direct nounstem previews block at `authority/authorityFrame` unless evidence confirms a very limited intransitive `tla` source.
- A confirmed absolutive nounstem source can route Nawat/Pipil `ilwi` -> `ilwita` with target input `(ilwita)`. Possessive-state sources block at `agreement/participantFrame`; generated VNC sources block at `stem/stemFrame`; missing source stems block at `stem/stemFrame`.
- Generated intransitive `tla` targets now provide bounded source evidence for the note's `ti-a` and `ti-lia` continuations, recording that source `tla` is replaced by `ti` before `a` or `lia`.
- The §55.2 intransitive `tla` inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.2 Executable Intransitive Tla Continuation Rule Contracts v1

Date: 2026-06-09

Decision:

- Andrews §55.2 note intransitive `tla` continuations are now executable rule contracts, not just source-evidence labels.
- `andrews-55-2-intransitive-tla-ti-a` routes a generated intransitive `tla` source through `tla -> ti` before causative `a`, e.g. source evidence for `pusukta` routes to `pusuktia` with segmented input `(pusukti)-(a)`.
- `andrews-55-2-intransitive-tla-ti-lia` routes the same generated intransitive `tla` source through `tla -> ti` before applicative `lia`, e.g. `pusukta` routes to `pusuktilia` with segmented input `(pusukti)-(lia)`.
- Direct nounstem previews now block both continuation routes at `authority/authorityFrame` unless generated intransitive `tla` verbstem source evidence is present. Original-source state blocks at `agreement/participantFrame`; wrong route categories block at `stem/stemFrame`; non-`ta` generated sources block at `morph-boundary/morphBoundaryFrame`; missing source verbstems block at `stem/stemFrame`.
- The §55.2 note continuation inventory contracts now report source-evidence-gated executable-rule support; coverage counts now leave both contracts out of the unmodeled list.

## Completed Phase: Andrews 55.3 Executable Intransitive O-A and Huia Rule Contracts v1

Date: 2026-06-09

Decision:

- Andrews §55.3 `o-a` and `huia` are now executable rule contracts, not just denominal inventory labels.
- `andrews-55-3-o-a` routes an absolutive Nawat/Pipil nounstem source through Classical `o-a` converted to Nawat/Pipil `ua`, e.g. `pusuk -> pusukua` with input `(pusukua)`, and records Class C intransitive output. The `a` is explicitly not treated as a causative suffix.
- `andrews-55-3-huia` routes an absolutive Nawat/Pipil nounstem source through Classical `huia` converted to Nawat/Pipil `wia`, e.g. `pusuk -> pusukwia` with segmented applicative input `(pusuk)-(wia)`, Class C output, and object-prefix-required finite requests.
- Possessive-state sources are blocked at `agreement/participantFrame`; generated VNC or unrelated route sources are blocked at `stem/stemFrame`; missing source stems are blocked at `stem/stemFrame`.
- The §55.3 `o-a`/`huia` inventory contract now reports executable-rule support; coverage counts now leave this contract out of the unmodeled list. Generated `o-a` targets still provide bounded source evidence for the separate §55.3 note 2 applicative continuations, which remain a separate target.

## Completed Phase: Andrews 55.3 Note 2 Executable O-A Applicative Continuation Rule Contracts v1

Date: 2026-06-09

Decision:

- Andrews §55.3 note 2 `i-l-huia` / `a-l-huia` applicative continuations are now executable source-evidence-gated rule contracts, not direct nounstem routes.
- `andrews-55-3-o-a-i-l-huia` requires generated intransitive `o-a` source evidence and routes a Nawat/Pipil `ua`-final source through the hypothetical `i-hui` path to `ilwia`, e.g. generated source evidence for `pusukua` routes to `pusukilwia` with segmented input `(pusuk)-(ilwia)`.
- `andrews-55-3-o-a-a-l-huia` requires the same generated intransitive `o-a` source evidence and routes through the hypothetical `a-hui` path to `alwia`, e.g. `pusukalwia` with segmented input `(pusuk)-(alwia)`.
- Direct previews without generated intransitive `o-a` source evidence now block at `authority/authorityFrame`; original nounstem state blocks at `agreement/participantFrame`; unrelated source categories block at `stem/stemFrame`; non-`ua` sources block at `morph-boundary/morphBoundaryFrame`; missing source verbstems block at `stem/stemFrame`.
- Generated §55.3 `o-a` route targets provide bounded source evidence for these continuations, recording that the source `o-a` bypasses a transitive `o-a` step and uses the hypothetical `i-hui/a-hui` bridge.
- The §55.3 note 2 inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.4 Executable Adverbial Huia Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.4 adverbial `huia` is now executable rule contract `andrews-55-4-adverbial-huia`, not just source-evidence metadata.
- The rule requires confirmed adverbial nounstem evidence from the Lesson 44 adverbialized NNC domain before generating a single-object applicative VNC stem.
- A confirmed adverbial source can route Nawat/Pipil `achpa` through Classical `huia` converted to Nawat/Pipil `wia`, yielding `achpawia` with segmented input `(achpa)-(wia)` and object-prefix-required finite requests.
- Direct source-stem previews without adverbial source evidence now block at `authority/authorityFrame`; non-adverbial source state blocks at `agreement/participantFrame`; possessive-state sources block at `agreement/participantFrame`; wrong source categories block at `stem/stemFrame`; missing source stems block at `stem/stemFrame`.
- The explicit adverbial source preview remains the live website route into this contract and continues to mark that compatibility `adverbio` word output is not automatic source evidence.
- The §55.4 inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.5 Executable Relational O-A and Huia Rule Contracts v1

Date: 2026-06-09

Decision:

- Andrews §55.5 relational compound `o-a` and `huia` routes are now executable source-evidence-gated rule contracts, not just route metadata.
- `andrews-55-5-relational-o-a` requires confirmed compound relational nounstem or possessive-state relational predicate evidence and routes Classical `o-a` through Nawat/Pipil `ua`, e.g. `kalpan -> kalpanua` with segmented input `(kalpan)-(ua)`. The contract records Andrews' boundary that `o-a` stems are usually transitive but can exceptionally be intransitive.
- `andrews-55-5-relational-huia` requires the same source evidence and routes Classical `huia` through Nawat/Pipil `wia`, e.g. `kalpan -> kalpanwia` with segmented input `(kalpan)-(wia)` and single-object applicative valency.
- Direct source-stem previews without relational source evidence now block at `authority/authorityFrame`; wrong source state blocks at `agreement/participantFrame`; wrong source category blocks at `stem/stemFrame`; missing source stems block at `stem/stemFrame`.
- Explicit relational source previews remain the live website route into these contracts and keep the boundary that relational NNC metadata alone is not automatic source evidence.
- The §55.5 inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave this contract out of the unmodeled list.

## Completed Phase: Andrews 55.6 Executable I-Hui/A-Hui to O-A Rule Contracts v1

Date: 2026-06-09

Decision:

- Andrews §55.6 `i-hui` and `a-hui` source routes are now executable nounstem-to-Class-B intransitive rule contracts, converting Classical `i-hui/a-hui` to Nawat/Pipil `iwi/awi`.
- Andrews §55.6 causative `o-a` is now executable rule contract `andrews-55-6-o-a`; it is blocked unless generated `i-hui/a-hui` source evidence supplies the `iwi/awi` verbstem.
- Direct `o-a` previews from a bare nounstem now stop at `authority/authorityFrame` instead of fabricating `pusukua`; source-state, source-category, missing-verbstem, and non-`iwi/awi` boundary failures produce layer-specific diagnostics.
- Generated §55.6 `i-hui/a-hui` routes and linked `vi-iwi/vi-awi` verbalizer stages now carry source verbstem evidence so the staged causative `o-a` continuation can generate `(pusuk)-(ua)` only after the source route exists.
- UI route chips now expose `data-i-hui-a-hui-source-required` / `is-i-hui-a-hui-source` styling for this Andrews source gate.
- The §55.6 inventory contract now reports source-evidence-gated executable-rule support; coverage counts now leave only §55.7 as unmodeled.

## Completed Phase: Andrews 55.7 Executable Transitive I-A Rule Contract v1

Date: 2026-06-09

Decision:

- Andrews §55.7 transitive `i-a` is now executable rule contract `andrews-55-7-i-a`, not an unmodeled route label.
- The rule converts Classical `i-a` to Nawat/Pipil `ia`, generates a transitive VNC stem only from an absolutive nounstem source with an Andrews-supported source-final pattern, and keeps finite generation object-prefix-gated.
- Majority/attested finals from Andrews (`k`, `l`, `n`, with Classical `[c]` and `/k/` both represented as Nawat `k`) can route, e.g. `pusuk -> pusukia` with segmented input `(pusuk)-(ia)`.
- Unsupported source states/categories block at `agreement/participantFrame` or `stem/stemFrame`; unlisted source finals now block at `morph-boundary/morphBoundaryFrame` unless explicit source-final evidence is supplied.
- The existing §55.7 warnings remain live: `w` finals may actually be §55.3 `huia`, the `i` in apparent `i-a` can belong to the nounstem, and apparent `i-a` can have an `i-hui` source without following §55.6 `o-a`.
- The Lessons 54-55 Andrews inventory now has zero unmodeled Andrews contracts; `vt-na` remains explicitly Nawat-only, outside Andrews suffix coverage.

## Completed Phase: Andrews 40 Adjectival Function Promotion Route v1

Date: 2026-06-09

Decision:

- §40.4 patientive and §40.5-40.8 nominalized-VNC adjectival continuation chips now clear stale Nawat route-station state before switching into `adjetivo` mode.
- `renderActiveConjugations()` now detects a live adjectival-NNC function entry and prevents any stale active route from replacing the promoted surface with the default `potencial`/`intrans-potencial` render path.
- The promoted block is rendered as `data-tense-block="adjetivo-nnc-funcion"` with a dedicated `tense-block--adjectival-nnc-function` class and Andrews function metadata, so the UI presents the Andrews function contract rather than a generic empty potential block.
- CSS now gives the adjectival-function block a distinct but restrained treatment without changing generated surfaces or importing Classical examples.
- `index.html` cache-busts the updated stylesheet, rendering script, and composer script for the Andrews 40 adjectival-function route.

## Completed Phase: Andrews 40.3 VNC Adjectival Function Row Route v1

Date: 2026-06-09

Decision:

- Andrews §40.3 VNC-as-adjective is now exposed as a live generated-row continuation, not only as a direct builder or metadata label.
- Active and nonactive generated VNC rows now offer an `Adj VNC` chip only when the row has a concrete generated VNC surface.
- The chip creates an explicit `vnc-adjectival` adjectival-function entry contract, preserves the generated VNC surface, and switches to the dedicated `data-tense-block="adjetivo-nnc-funcion"` output instead of falling into a generic potential block.
- The generated contract records the source VNC tense/mode/voice in the route and inflection frames, so the promoted result mirrors the LCM layer contract rather than losing source context.
- Missing VNC surface remains blocked at the result/diagnostic layer with `adjectival-nnc-requires-vnc-surface`; no Classical example surface was imported as Nawat lexical evidence.
- `index.html` cache-busts the updated engine, adjectival NNC, VNC facade, renderer, composer, and stylesheet assets for this route.

## Completed Phase: Andrews 40.1/40.3 Ordinary NNC Adjectival Function Row Route v1

Date: 2026-06-09

Decision:

- Andrews §40.1/§40.3 ordinary absolutive NNC-as-adjective is now exposed as a live generated-row continuation from the ordinary `NNC/S` output.
- Supported ordinary NNC rows now offer an `Adj NNC` chip only when the row is generated in absolutive predicate state and has a concrete Nawat/Pipil NNC surface.
- The chip creates an explicit `ordinary-absolutive` adjectival-function entry contract, preserves the generated NNC surface, and switches into the dedicated `data-tense-block="adjetivo-nnc-funcion"` route instead of reusing a stale verb route or generic empty output.
- The VNC facade now reconstructs the original ordinary NNC source stem, subject, connector class, number, and plural metadata from the mirrored LCM formula slots before execution, so promoted `shuchit` routes from source stem `shuchi` instead of double-generating `shuchitt`.
- Missing or unsupported ordinary NNC generation remains blocked by the existing ordinary/adjectival NNC diagnostics; possessive-state NNCs are not offered this chip because Andrews says adjectival NNCs occur as a rule in the absolutive state.
- No Classical example surface was imported as Nawat lexical evidence.

## Completed Phase: Andrews 41.1 Intensified Adjectival Function Row Route v1

Date: 2026-06-09

Decision:

- Andrews §41.1 reduplicative intensification is now exposed as a live generated-row continuation from supported generated adjectival NNC outputs, not only as a direct engine builder.
- `adjetivo-preterito` rows with a root-plus-`ya` adjectival NNC source formula now offer an `Intensifica` chip only when the generated output has concrete source formula slots.
- The chip builds an explicit `intensified-adjectival` route contract from the source `#3 salida` formula slots, records the source formula echo, and promotes the intensified surface into the dedicated `data-tense-block="adjetivo-nnc-funcion"` block instead of falling into the generic `potencial`/`intrans-potencial` no-output block.
- The VNC facade now carries entry-contract `sourceFormulaSlots` and `sourceFormulaEcho` into the override so execution reduplicates the original source predicate once; `yektik` from `#Ø...Ø(yekti)k#` promotes to `yejyektik`, not to a second-generation intensified stem.
- The continuation helper is gated to Andrews-supported generated adjectival NNC source kinds currently represented by the engine (`adjectival-nnc-root-plus-ya`, patientive-function, and nominalized-VNC-function outputs), and this phase wires the live chip for the `adjetivo-preterito` root-plus-`ya` row. Ordinary NNC rows without verbal/deverbal adjectival-source evidence are not newly licensed by this phase.
- No Classical example surface was imported as Nawat lexical evidence, and the route still records that §41.1 intensification is not Lesson 27 frequentative generation.
- `index.html` cache-busts the updated VNC facade, renderer, composer, and stylesheet assets for this route.

## Completed Phase: Andrews 41.2 Compound-Source Adjectival Function Row Route v1

Date: 2026-06-09

Decision:

- Andrews §41.2 compound-source adjectival NNC behavior is now an executable adjectival-function route, not only generated-output metadata.
- Generated `adjetivo-preterito` rows that already carry a parsed compound verbstem source frame now offer an `Adj comp` continuation chip.
- The chip builds an explicit `compound-source-adjectival` contract from the generated surface, source NNC formula, and parsed compound source roles, then promotes the result into the dedicated `data-tense-block="adjetivo-nnc-funcion"` block.
- The route preserves the generated Nawat/Pipil surface and does not invent a new modifier/head AST, compound nounstem fixture, or Classical example surface.
- Unsupported direct requests now block before generation unless they have both a generated surface and a parsed `compound-frame`; missing compound source evidence reports `adjectival-nnc-requires-compound-source-frame`.
- The VNC facade and composer now preserve `sourceCompoundFrame` through entry-contract serialization and route execution so identical surfaces can keep their matrix/embed source roles.
- `index.html` cache-busts the updated engine, adjectival NNC, VNC facade, renderer, composer, and stylesheet assets for this route.

## Completed Phase: Andrews 41.3 Denominal Compound Adjectival Function Row Route v1

Date: 2026-06-09

Decision:

- Andrews §41.3 denominal verbstems from compound nounstems are now an executable adjectival-function route, not only source-pattern metadata.
- Segmented denominal `tiya` inputs with at least two nounstem source parts before `tiya` now expose a `denominalCompoundSourceFrame` on the generated Andrews 40.9 `adjetivo-preterito` output; the frame records the compound nounstem matrix, embeds, `ti` operation, and `preterit-agentive-adjectival` result class.
- Generated rows carrying that frame now offer an `Adj denom` continuation chip. The chip builds an explicit `denominal-compound-adjectival` contract, preserves the generated Nawat/Pipil surface, and promotes into `data-tense-block="adjetivo-nnc-funcion"`.
- The route blocks before generation unless it has both a generated preterit-agentive NNC surface and a parsed `denominal-compound-nounstem-frame`; missing source evidence reports `adjectival-nnc-requires-denominal-compound-frame`.
- The VNC facade and composer preserve `sourceDenominalCompoundFrame` through entry-contract serialization and route execution so identical surfaces keep their underlying compound nounstem source roles.
- No Classical example surface was imported as Nawat lexical evidence; the implemented example path uses the user-supplied segmented Nawat input `(xilo/tzon/tiya)` and Nawat `k` orthography (`xilotzontik`), not Andrews' Classical `c` spelling.
- `index.html` cache-busts the updated engine, adjectival NNC, VNC facade, renderer, composer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.1 Ordinary NNC Inceptive Ti Continuation Route v1

Date: 2026-06-09

Decision:

- Andrews §54.2.1 inceptive/stative `ti` is now exposed as a live ordinary-NNC row continuation from generated absolutive NNC outputs.
- `buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput()` accepts only supported ordinary NNC outputs with a concrete absolutive-state predicate surface and predicate stem. Possessive-state sources and empty/stale result frames are rejected before route preview.
- `previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput()` converts that NNC source evidence into the existing executable `54.2.1-inceptive-stative-ti` route contract, preserving Nawat/Pipil spelling and avoiding any new lexical fixture evidence.
- Ordinary NNC `#3 salida` rows now show an Andrews denominal `→ (stemti)` continuation chip labeled `Andrews 54.2.1 · Clase ... · NNC abs · presente`; clicking it disables ordinary NNC mode, restores the plain verb composer board, and routes to VNC present generation instead of leaving the input in the ordinary-NNC block.
- Rendering now labels absolutive generated NNC evidence distinctly from possessive-state and possession-`ti` predicate-stem evidence, and `style.css` includes a dedicated `is-absolutive-source` visual marker.
- `index.html` cache-busts the updated state, renderer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.2 Ordinary NNC Inceptive Hui/Wi Continuation Route v1

Date: 2026-06-09

Decision:

- Andrews §54.2.2 inceptive/stative `hui` is now exposed as a live ordinary-NNC row continuation from generated absolutive NNC outputs.
- `buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput()` accepts only supported ordinary NNC outputs with a concrete absolutive-state predicate surface and predicate stem. Possessive-state sources and empty/stale result frames are rejected before route preview.
- `previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput()` converts that NNC source evidence into the existing executable `54.2.2-inceptive-stative-hui` route contract, preserving the Nawat/Pipil spelling bridge (`hui -> wi`) and avoiding any new lexical fixture evidence.
- Ordinary NNC `#3 salida` rows now show an Andrews denominal `→ (stemwi)` continuation chip labeled `Andrews 54.2.2 · Clase ... · NNC abs · presente`; clicking it reuses the existing activation path that disables ordinary NNC mode, restores the plain verb composer board, and routes to VNC present generation.
- The route records Andrews' source-final class rule: consonant-final sources produce Class A targets and vowel-final sources produce Class B targets.
- `index.html` cache-busts the updated state, renderer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.3 Ordinary NNC Root-Plus-Ya Continuation Route v1

Date: 2026-06-09

Decision:

- Andrews §54.2.3 root-plus-`ya` is now exposed as a live ordinary-NNC row continuation from generated absolutive NNC outputs.
- `buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput()` accepts only supported ordinary absolutive NNC outputs with a concrete predicate surface and predicate stem, then marks the predicate stem as a nounstem downgraded to root rank. Possessive-state sources and empty/stale result frames are rejected before route preview.
- `previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput()` converts that NNC source evidence into the existing executable `54.2.3-inceptive-stative-ya` / `andrews-54-2-3-ya` contract without creating lexical fixture evidence or importing Classical example surfaces.
- Ordinary NNC `#3 salida` rows now show an Andrews denominal `→ (stemya)` continuation chip labeled `Andrews 54.2.3 · Clase A/B · NNC raiz · presente`; clicking it disables ordinary NNC mode, restores the plain verb composer board, and routes to VNC present generation.
- The renderer now labels this source evidence as `Fuente Andrews: NNC en rango raiz` so root-rank source use is distinct from absolutive `ti`/`hui` and possession-`ti` continuations.
- `index.html` cache-busts the updated state, renderer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.3 Ya-Lia Next-Source UI Route v1

Date: 2026-06-09

Decision:

- Selecting a generated §54.2.3 root-plus-`ya` route now stores active Andrews route context for the generated VNC target.
- That active context exposes `54.2.3-ya-lia-causative` as the next source-gated route only when the generated `ya` target supplies bounded source evidence.
- The live VNC output row now shows one disabled `→ (stem)-(lia)` chip at the object-prefix layer plus explicit `mu`/`ta`/`te` object-prefix choice chips.
- Clicking an object-prefix choice routes to the existing `andrews-54-2-3-ya-lia` executable contract and VNC generator with the selected object prefix.
- The route deletes final `ya` before `lia`, keeps Nawat/Pipil spelling realization, and creates no lexical fixture evidence or Classical example surface.
- `index.html` cache-busts the updated renderer, state, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.4 Ordinary NNC Limited A Continuation Route v1

Date: 2026-06-09

Decision:

- Andrews §54.2.4 limited inceptive/stative `a` is now exposed as a live ordinary-NNC row continuation from generated absolutive NNC outputs.
- `buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput()` accepts only supported ordinary absolutive NNC outputs with a concrete predicate surface and predicate stem. Possessive-state outputs and empty/stale result frames are rejected before route preview.
- `previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput()` converts that source evidence into the existing executable `54.2.4-inceptive-stative-a` / `andrews-54-2-4-a` contract without creating lexical fixture evidence or importing Classical example surfaces.
- Ordinary NNC `#3 salida` rows now show an Andrews denominal `→ (stema)` continuation chip labeled `Andrews 54.2.4 · Clase C · NNC abs · uso limitado · presente`; clicking it disables ordinary NNC mode, restores the plain verb composer board, and routes to VNC present generation.
- The chip marks `limitedUse` and `notCausativeA`, because Andrews distinguishes this intransitive Class C-looking `a` stem from causative `a`.
- `index.html` cache-busts the updated state, renderer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.5 Characteristic-Property Hua Continuation Route v1

Date: 2026-06-09

Decision:

- Andrews §54.2.5 `hua -> wa` is now exposed as a live `calificativo-instrumentivo` row continuation only when a generated characteristic-property output supplies the required absolutive `-yut` source evidence.
- `buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput()` accepts generated `calificativo-instrumentivo` quality/result rows, strips only the absolutive `t` connector from Nawat `-yut` surfaces, and supplies bounded `deverbal-yu-nounstem` evidence to the existing executable `andrews-54-2-5-hua` contract.
- Possessive `-yu` rows, arbitrary `yu` strings, stale empty result frames, and non-characteristic outputs are not treated as §54.2.5 source evidence.
- Generated `#3 salida` rows now show an Andrews denominal `→ (stemyuwa)` continuation chip labeled `Andrews 54.2.5 · Clase A · fuente -yu(t) · no 55.3 o-a · presente`; clicking it routes into VNC present generation through the existing finite request/activation path.
- The chip marks `notOaFormation`, because Andrews distinguishes §54.2.5 `hua` Class A stems from the §55.3 `o-a` family.
- `index.html` cache-busts the updated state, renderer, and stylesheet assets for this route.

## Completed Phase: Andrews 54.3 Included-Possessor Ti Live Route UI v1

Date: 2026-06-09

Decision:

- Andrews §54.3 included-possessor `ti` is now explicitly marked as a live generated possessive-NNC continuation in the ordinary NNC output row UI.
- The existing executable `andrews-54-3-included-possessor-ti` route remains source-gated by generated possessive-state NNC predicate evidence; this phase does not add any Classical example surface or lexical fixture evidence.
- The live chip now labels the source as `NNC posesivo` with `poseedor interno` and carries datasets for `possessorIncludedInsideVerbstem` and `possessiveCaseNotObject`, matching Andrews' boundary that the possessor pronoun remains inside the derived verbstem and is not transformed into a VNC object.
- The route still activates through the finite VNC request path, so a generated source such as `nukal` targets `(nukalti)` and renders the present intransitive VNC output rather than falling into a generic empty-generation block.
- `index.html` cache-busts the updated renderer and stylesheet assets for this route.

## Completed Phase: Andrews 54.2.2 Hui-Lia Live Object-Prefix Route UI v1

Date: 2026-06-09

Decision:

- Generated §54.2.2 `hui -> wi` VNC stages now expose the §54.2.2 `hui-lia -> wi-lia` causative continuation as a live next-source route when that generated `hui/wi` stage supplies source evidence.
- The disabled parent route chip and the actual clickable object-prefix choices now preserve the Andrews source-evidence layer: `sourceEvidenceRequired`, `huiSourceRequired`, `sourceEvidenceSatisfied`, route identity, and executable rule id stay visible on the buttons the user can press.
- Object-prefix choices (`mu`, `ta`, `te`) route `(stemwi)-(lia)` into the finite VNC generation path instead of falling through to `La generacion no produjo una forma.`
- This phase changes only UI route evidence propagation and cache-busting. It does not add Classical lexical examples, fixture evidence, or new Andrews contracts.

## Completed Phase: Andrews 54.2.3/54.6 All Ti-Hui Next-Source Live Routes UI v1

Date: 2026-06-09

Decision:

- Generated §54.2.1 `ti` and §54.2.2 `hui -> wi` VNC stages now expose all source-satisfied Andrews next-source routes in the live output row instead of truncating the route list to four preview targets.
- This makes the already-executable §54.6 `t-ia` applicative reachable from a generated `ti` source, including its object-prefix choices, instead of being hidden behind the previous route cap.
- The same live next-source surface keeps §54.2.3 `ti-ya` and `hui-ya` reachable from generated `ti`/`hui` sources, and those generated `ti-ya`/`hui-ya` outputs still expose the following `ya-lia` source-evidence route.
- Bounded source-evidence records now explicitly mark `sourceEvidenceSupportsTiYaDeverbal` and `sourceEvidenceSupportsHuiYaDeverbal` for generated `ti`/`hui` sources. This documents the engine contract edge without adding lexical fixtures or importing Classical example surfaces.
- The renderer change applies to denominal Andrews route continuations generally: if a route is finite-available after its source guards pass, the UI can show it; object-prefix-required routes still block at the object layer until the user picks `mu`, `ta`, or `te`.

## Completed Phase: Compound NNC Affective Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyCompoundNncAffectiveCandidate()` route no longer lets `headStem`/`embeddedStem` display strings authorize compound-NNC generation.
- Compound nounstem generation now requires a `compound-nnc-affective-source-frame` plus an `andrews-31-compound-nounstem-source-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy normalizers block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Adjectival NNC Function Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyAdjectivalNncFunctionCandidate()` route no longer lets `candidate`, `predicateSurface`, `sourceGate`, or `structuredSource` strings authorize adjectival-function generation.
- Adjectival-function candidate generation now requires an `adjectival-nnc-function-candidate-source-frame` plus an `andrews-40-41-adjectival-function-candidate-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy candidate normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Basic Cardinal Numeral NNC Source Frame Gate

Date: 2026-07-04

Decision:

- The live `buildAndrewsBasicCardinalNumeralNnc()` generator no longer lets `value`, `numeralBase`, formula-template text, or structural stem strings authorize cardinal numeral NNC generation.
- Basic cardinal numeral generation now requires a `basic-cardinal-numeral-nnc-source-frame` plus an `andrews-34-basic-cardinal-numeral-nnc-realization` typed operation frame.
- The generator reads formula slots, target segment frames, target stem, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization.
- `classifyNumeralNncCandidate()` no longer normalizes `candidate`/`numeralBase` strings or implicitly calls cardinal generation as authority. It can classify display strings, but generated output requires the same typed source and operation frames.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched numeral-surface normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Personal-Name NNC Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyPersonalNameNncCandidate()` route no longer lets `candidate`, `nameSource`, `sourceGate`, or `structuredSource` strings authorize personal-name NNC generation.
- Personal-name candidate generation now requires a `personal-name-nnc-source-frame` plus an `andrews-56-personal-name-nnc-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy candidate normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Place/Gentilic NNC Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyPlaceGentilicNncCandidate()` route no longer lets `candidate`, `placeNameSource`, `gentilicSource`, `sourceGate`, or `structuredSource` strings authorize place-name or gentilic NNC generation.
- Place/gentilic candidate generation now requires a `place-gentilic-nnc-source-frame` plus an `andrews-48-place-gentilic-nnc-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy candidate normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Relational NNC Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyRelationalNncCandidate()` route no longer lets `candidate`, `relationalStem`, `sourceGate`, or `structuredSource` strings authorize relational NNC generation.
- Relational candidate generation now requires a `relational-nnc-source-frame` plus an `andrews-45-47-relational-nnc-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy candidate normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: Nominalization Boundary Candidate Source Frame Gate

Date: 2026-07-04

Decision:

- The live `classifyNominalizationBoundaryCandidate()` route no longer lets `candidate`, `sourceVnc`, `stemUse`, `sourceGate`, or `structuredSource` strings authorize nominalization generation.
- Nominalization boundary candidate generation now requires a `nominalization-boundary-source-frame` plus an `andrews-35-39-nominalization-boundary-realization` typed operation frame.
- The classifier reads target formula slots, segment frames, and realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; caller strings remain display/classification inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, poisoned caller strings, and monkeypatched legacy candidate normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: VNC Valence Formula Surface Typed Operation Gate

Date: 2026-07-04

Decision:

- The live `getVncValenceAndrewsLogicSurfaceForSlots()` route no longer lets formula-slot strings by themselves authorize the Andrews-logic VNC valence surface.
- VNC valence formula-workbench surface realization now requires a `vnc-valence-andrews-logic-surface-source-frame` plus an `andrews-vnc-valence-slot-surface-realization` typed operation frame.
- The surface executor reads target segment frames and the realized Nawat/Pipil surface from the typed operation frame after Andrews authorization; `formulaSlots`, normalized surface-part strings, and workbench display echoes remain caller/display inputs only.
- Missing source frames, missing operation frames, contradictory source frames, contradictory target frames, changed caller formula slots, and monkeypatched legacy surface-part normalization block or fail to alter generated output under focused hostile coverage.

## Completed Phase: VNC Valence Workbench Source Frame Gate

Date: 2026-07-04

Decision:

- The live `buildVncValenceFormulaWorkbenchSlice()` route no longer lets `normalizeVncValenceWorkbenchStem()` or `inferVncValenceWorkbenchSelection()` decide stem/valence from raw formula or surface strings.
- VNC valence workbench selection now parses user input once into a `vnc-valence-workbench-source-frame`; stem and valence selection are then read from that typed source frame.
- The legacy direct stem/selection APIs now block without the typed source frame, and the live workbench consumes the source frame directly instead of routing through the monkeypatchable string helpers.
- String-only direct calls, changed caller strings with the same frame, and monkeypatched legacy stem/selection helpers cannot authorize or alter the selected stem, valence kind, formula, or generated surface under focused hostile coverage.

## Completed Phase: Lesson 6 Direct Nawat Dyad Split Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Lesson 6 direct Nawat object-dyad route no longer lets `splitLesson6DirectNawatDyad()` parse `n-ech`, `m-etz-in`, `k-in`, or similar display-like dyad strings into `va1`/`va2`.
- Direct dyad splitting now requires a `lesson-6-direct-nawat-dyad-source-frame` plus an `andrews-6-direct-nawat-dyad-split` typed operation frame.
- `getLesson6DirectNawatObjectDyadFrame()` builds and validates those frames, then consumes the typed target dyad frame directly before rendering formula/display mirrors.
- String-only direct split calls, missing source frames, missing operation frames, contradictory source frames, contradictory target frames, changed caller strings, and monkeypatched legacy split calls block or fail to alter `va1`/`va2` output under focused hostile coverage.

## Completed Phase: Generated Class Perfective Formula Profile Typed Operation Gate

Date: 2026-07-04

Decision:

- The live generated class-perfective formula profile route no longer lets `buildGeneratedClassPerfectiveFormulaProfile()` reverse-match generated surface strings to infer formula base/object slots.
- Class-perfective formula profile selection now requires a `generated-class-perfective-formula-source-frame` plus a `generated-class-perfective-formula-profile-realization` typed operation frame.
- The formula-profile executor reads base, object prefix, formula object, and object surface from the typed operation target profile; `surfaceForms`, `subjectPrefix`, `objectPrefix`, `sourceStem`, and result strings remain caller/display inputs only after authorization.
- String-only direct calls, missing source frames, missing operation frames, contradictory source frames, contradictory target frames, changed caller strings/surfaces, and monkeypatched legacy surface-core matching block or fail to alter output under focused hostile coverage.

## Completed Phase: Morph-Stem Truncate Nonactive Base Typed Operation Gate

Date: 2026-07-05

Decision:

- The `realizeMorphStemSpec()` truncate-nonactive-base transform route no longer lets hand-built transform specs or caller source strings authorize nonactive-base truncation.
- Truncate-nonactive-base morph stem realization now requires a `morph-stem-truncate-nonactive-base-source-frame` plus an `andrews-morph-stem-truncate-nonactive-base-realization` typed operation frame.
- The realization branch reads the target stem from the typed operation frame after validating source identity and coda operation flags; `sourceStem`, `dropFinalW`, `tzToCh`, and target strings are frame contracts rather than display/string authority.
- The legacy direct `truncateNonactiveBase()` string API now blocks unless called with matching typed source and operation frames; hand-built legacy specs, changed caller source stems, missing operation frames, contradictory source frames, and target-segment/target-stem contradictions block under focused hostile coverage.

## Completed Phase: Morph-Stem Wa-Onset Variant Typed Operation Gate

Date: 2026-07-05

Decision:

- The `realizeMorphStemSpec()` nonactive-wa-variant transform route no longer lets hand-built transform specs or caller source strings authorize `s`/`t` onset replacement plus `wa`.
- Wa-onset-variant morph stem realization now requires a `morph-stem-wa-onset-variant-source-frame` plus an `andrews-morph-stem-wa-onset-variant-realization` typed operation frame.
- The live nonactive `wa` option builder now realizes and compares the typed stem spec instead of calling the legacy `buildWaOnsetVariant()` helper to decide whether a variant exists.
- Hand-built legacy specs, changed caller source stems, missing operation frames, contradictory source frames, and target-segment/target-stem contradictions block under focused hostile coverage.

## Completed Phase: Morph-Stem Nonactive-U Typed Operation Gate

Date: 2026-07-05

Decision:

- The `realizeMorphStemSpec()` nonactive-u transform route no longer lets hand-built transform specs or caller source strings authorize final-vowel replacement, `s`/`t`/`tz` onset replacement, or `kw` simplification.
- Nonactive-u morph stem realization now requires a `morph-stem-nonactive-u-source-frame` plus an `andrews-morph-stem-nonactive-u-realization` typed operation frame.
- The live type-two nonactive `u` option builder now realizes the typed `u` stem spec instead of calling the legacy `buildNonactiveUStem()` helper to decide whether a `u` option exists.
- The legacy direct `buildNonactiveUStem()` string API now blocks unless called with matching typed source and operation frames; hand-built legacy specs, changed caller source stems, missing operation frames, contradictory source frames, and target-segment/target-stem contradictions block under focused hostile coverage.

## Completed Phase: Morph-Stem Nonactive-Uwa Typed Operation Gate

Date: 2026-07-05

Decision:

- The `realizeMorphStemSpec()` nonactive-uwa transform route no longer lets hand-built transform specs or caller source strings authorize final-vowel deletion, `w` deletion, `s`/`t`/`tz` onset replacement, or `uwa` addition.
- Nonactive-uwa morph stem realization now requires a `morph-stem-nonactive-uwa-source-frame` plus an `andrews-morph-stem-nonactive-uwa-realization` typed operation frame.
- The live type-two nonactive `uwa` option builder now realizes the typed `uwa` stem spec instead of calling the legacy `buildNonactiveUwaStem()` helper to decide whether a `uwa` option exists.
- The legacy direct `buildNonactiveUwaStem()` string API now blocks unless called with matching typed source and operation frames; hand-built legacy specs, changed caller source stems, missing operation frames, contradictory source frames, and target-segment/target-stem contradictions block under focused hostile coverage.

## Completed Phase: Nonspecific Object Allomorphy Typed Operation Gate

Date: 2026-07-05

Decision:

- The live object-prefix allomorphy route `applyObj1Allomorphy()` no longer lets `applyNonspecificObjectAllomorphy()` decide `mu > m` or supportive-`i` deletion from direct request strings alone.
- Nonspecific object allomorphy now requires a `nonspecific-object-allomorphy-source-frame` plus an `andrews-nonspecific-object-allomorphy-realization` typed operation frame before it can return changed `verb`, `analysisVerb`, `obj1`, or Lesson 2 sound/spelling frames.
- The generation-valency and noun-forward agreement callers now build the typed source and operation frames before applying allomorphy; continuation carries the operation frame on `applyObj1Allomorphy()` output, while display strings and sound/spelling chips are rendered from the authorized target frame.
- The legacy direct `applyNonspecificObjectAllomorphy()` string API now blocks without matching typed frames; missing operation frames, changed caller strings, contradictory source frames, and contradictory target frames block under focused hostile coverage.

## Completed Phase: Patientivo Nonactive Stem Typed Operation Gate

Date: 2026-07-05

Decision:

- The live nonactive patientivo source route no longer lets `getPatientivoStemFromNonactive()` recover patientive stems by direct suffix-string comparison and slicing from caller `stem` / `suffix` strings.
- Nonactive patientivo stem realization now requires a `patientivo-nonactive-stem-source-frame` plus an `andrews-patientivo-nonactive-stem-realization` typed operation frame before it can return patientive stem entries.
- The live `buildPatientivoNonactiveDerivations()` continuation path builds those typed frames from the selected nonactive option's `stemSpec`, suffix family, base info, and transitivity before requesting patientive entries; resulting entries continue through `stemSpec`, source-stage frames, and nominal marker metadata rather than rendered strings as authority.
- The legacy direct `getPatientivoStemFromNonactive()` string API now blocks without matching typed frames; missing operation frames, changed caller strings, contradictory source frames, and contradictory target entries block under focused hostile coverage.

## Completed Phase: Nonactive Stem Selection Typed Operation Gate

Date: 2026-07-05

Decision:

- The live `resolveNonactiveStemSelection()` fallback route no longer lets `deriveNonactiveStem()` decide the selected nonactive stem from direct `verb` / `analysisVerb` strings.
- Nonactive stem selection now requires a `nonactive-stem-selection-source-frame` plus an `andrews-nonactive-stem-selection-realization` typed operation frame before the fallback path can produce `selectedStem`, `selectedStemSpec`, `selectedStems`, and downstream realized-stem payloads.
- The fallback live route builds the source frame from `buildNonactiveRuleSourceContext()` plus structural options, then carries the operation frame target stem spec through continuation; rendered `selectedStem` is output after that authorization.
- The legacy direct `deriveNonactiveStem()` string API now blocks without matching typed frames; changed caller strings, missing operation frames, contradictory source frames, and contradictory target frames block under focused hostile coverage.

## Completed Phase: Patientivo Tronco UA Root-Stock Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected intransitive patientivo `tronco-verbal` `ua` root/stock route no longer lets the `iwi`/`awi`/`ua` suffix-family branch build `sakam`, `sakamti`, or `tay`-joined mirror targets through direct suffix slicing and appended string mirrors.
- `buildPatientivoRootStockStemSourceFrame()` now classifies intransitive `ua` source frames as `ua-family-root-stock-stem` / `ua-final-cluster-root-stock-stem`, with target stem and mirror target entries emitted by `andrews-patientivo-root-stock-stem-realization`.
- `buildPatientivoTroncoDerivations()` consumes those typed source/operation/target frames before adding route entries; the series mirror filter remains a downstream display/output filter and cannot make the old suffix-family builder authoritative.
- Poisoned display strings, changed caller source frames, contradictory target entries, missing operation frames, and monkeypatched legacy root-stock string contract helpers cannot authorize or alter the selected `ua` family route.

## Completed Phase: Preterit Class A Slash-Aki Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A slash `aki` policy no longer lets `context.analysisVerb === "aki"` authorize the zero-only Class A/Class B coexistence policy.
- `buildPretClassASlashAkiSourceFrame()` represents the source verb, slash boundary, `a` + `ki` syllable/right-edge structure, and zero-suffix target; `buildPretClassASlashAkiOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-slash-aki-zero-suffix-policy`.
- `buildPretUniversalClassA()` and `getKVClassPolicy()` now consume the typed source/operation/target frames through `hasAuthoritativePretClassASlashAkiZeroFrame()`; lying `verb`, `analysisVerb`, and `exactBaseVerb` strings cannot authorize or remove the selected slash-`aki` zero policy when frames are valid.
- Missing operation frames, contradictory target frames, and poisoned display fields block or fail to alter the selected policy. The adjacent transitive `t+a` redup guard now uses the structured `isItaVerb` source-shape flag instead of `analysisVerb !== "ita"`.

## Completed Phase: Preterit Class A KWV Force Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A final `kw` + non-`u` policy no longer lets `context.forceClassAForKWV` or `context.allowIntransitiveKV` authorize Class A preference, Class B masking, or Class B fallback-to-A behavior.
- `buildPretClassAKwvSourceFrame()` represents the original source verb, syllable/right-edge final form, final onset, final nucleus, root-plus-`ya` block, monosyllable block, override block, and force-Class-A target policy. `buildPretClassAKwvOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-kwv-force-policy` with the typed force target frame.
- `buildPretUniversalClassA()`, `getKVClassPolicy()`, and the Class B fallback-to-A branch now consume those typed source/operation/target frames through `hasAuthoritativePretClassAKwvForceFrame()`; poisoned `verb`, `analysisVerb`, `exactBaseVerb`, `forceClassAForKWV`, and `allowIntransitiveKV` fields cannot authorize or remove the selected KWV force policy when frames are valid.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, and poisoned display fields block or fail to alter the selected policy. Remaining Class A right-edge eligibility cleanup is still tracked in `docs/STRING_MACHINE_PATH_INDEX.md`.

## Completed Phase: Preterit Class A KV Allow Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A final `k` + non-`u` intransitive allowance no longer lets `context.allowIntransitiveKV` authorize Class A eligibility through the K-series guard.
- `buildPretClassAKvAllowSourceFrame()` represents the original source verb, syllable/right-edge final form, final onset, final nucleus, absent slash boundary, absent root-plus-`ya` state, and allow-Class-A target policy. `buildPretClassAKvAllowOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-kv-allow-policy` with the typed allow target frame.
- `buildPretUniversalClassA()` now consumes those typed source/operation/target frames through `hasAuthoritativePretClassAKvAllowFrame()` for final `k` non-`u`; poisoned `verb`, `analysisVerb`, `exactBaseVerb`, and `allowIntransitiveKV` fields cannot authorize or remove the selected KV allowance when frames are valid.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, and poisoned display fields block or fail to alter the selected policy. The adjacent KWV force policy remains a separate target frame because it also masks/skips Class B.

## Completed Phase: Preterit Class A Chi Allow Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A intransitive final `ch+i` allowance no longer lets right-edge descriptor checks alone authorize Class A candidates or bypass the VtV-start Class A guard.
- `buildPretClassAChiAllowSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, intransitive state, non-monosyllable state, and allow-Class-A/B target policy. `buildPretClassAChiAllowOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-chi-allow-policy` with the typed allow target frame.
- `buildPretUniversalClassA()` now consumes those typed source/operation/target frames through `hasAuthoritativePretClassAChiAllowFrame()`, and the class-candidate rule table also requires the same operation frame before emitting `A`/`B` candidates for this route.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, and poisoned display fields block or fail to alter the selected policy.

## Completed Phase: Preterit Class A TA Redup Candidate Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `t+a` CVCV reduplication candidate route no longer lets `analysisVerb !== "ita"` plus descriptor-only right-edge state authorize `A`/`B` class candidates.
- `buildPretClassATaRedupSourceFrame()` represents the original reduplicated source verb, non-reduplicated analysis base, right-edge ending family, final onset, final nucleus, transitive state, CVCV reduplication state, non-`ita` shape, and ki-only target policy. `buildPretClassATaRedupOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-ta-redup-policy`.
- The `descriptor_t+a_transitive_redup_cvcv` class-candidate rule now consumes the typed source/operation/target frames before emitting Class A; lying `analysisVerb`, `verb`, and `exactBaseVerb` strings cannot authorize or remove the selected candidate route when frames are valid.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, and poisoned display fields block or fail to alter the selected route. The broader non-reduplicated transitive `t+a` Class B rule now uses the structured `isItaVerb` shape flag instead of `analysisVerb !== "ita"`.

## Completed Phase: Preterit Class A PA Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `p+a` route no longer lets descriptor-only right-edge state authorize Class A candidates or the ki-only target suffix policy.
- `buildPretClassAPaTransitiveSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, transitive state, non-monosyllable state, and ki-only Class A target policy. `buildPretClassAPaTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-pa-transitive-policy`.
- The `descriptor_p+a_transitive`, selected broad `CV-CV(pV)` target policy branch, and default candidate fallback now consume the typed source/operation/target frames before allowing Class A or selecting `ki` only.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned descriptors, and poisoned display fields block or fail to alter the selected route.

## Completed Phase: Preterit Class A M Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `m+a` / `m+i` route no longer lets descriptor-only right-edge state authorize Class A candidates or the zero-plus-`ki` target suffix policy.
- `buildPretClassAMTransitiveSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, transitive state, non-monosyllable state, and zero-plus-`ki` Class A target policy. `buildPretClassAMTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-m-transitive-policy`.
- The `descriptor_m+[a|i]_transitive` / broad `CV-CV(mV)` class-candidate paths and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting both zero and `ki` suffixes. A gate rule blocks this selected right-edge route from falling through to default Class A candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned descriptors, and poisoned display fields block or fail to alter the selected route.

## Completed Phase: Preterit Class A PI Intransitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A intransitive final `p+i` route no longer lets descriptor-only right-edge state authorize `A`/`B` class candidates or the Class A `ki`-only target suffix policy.
- `buildPretClassAPiIntransitiveSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, intransitive state, non-monosyllable state, and `A`/`B`-candidate `ki`-only target policy. `buildPretClassAPiIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-pi-intransitive-policy`.
- The `descriptor_p+i_intransitive` class-candidate rule, `buildPretUniversalClassA()` target policy, Class B variant policy, and singular-vs-Class-B policy rule now consume the typed source/operation/target frames before allowing Class A/B or selecting `ki` / `k` suffix behavior. A gate rule blocks this selected right-edge route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned descriptors, and poisoned display fields block or fail to alter the selected route.

## Completed Phase: Preterit Class B TA Intransitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class B intransitive final `t+a` route no longer lets descriptor-only right-edge state authorize Class B candidates or the Class B `k` suffix target policy.
- `buildPretClassBTaIntransitiveSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, intransitive state, non-monosyllable state, and Class B `k` target policy. `buildPretClassBTaIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-ta-intransitive-policy`.
- The `descriptor_t+a_intransitive` class-candidate rule and `buildPretUniversalClassB()` target policy now consume the typed source/operation/target frames before allowing Class B or selecting `k`. A gate rule blocks this selected right-edge route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class B TA Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class B transitive final `t+a` non-`ita` route no longer lets descriptor-only right-edge state or `analysisVerb`/`verb` strings authorize Class B candidates or the Class B `k` suffix target policy.
- `buildPretClassBTaTransitiveSourceFrame()` represents the original source verb, right-edge ending family, final onset, final nucleus, transitive state, non-monosyllable state, non-`ita` shape, and Class B `k` target policy. `buildPretClassBTaTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-ta-transitive-policy`.
- The `descriptor_t+a_transitive` class-candidate rule and `buildPretUniversalClassB()` target policy now consume the typed source/operation/target frames before allowing Class B or selecting `k`. A gate rule blocks this selected right-edge route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NI CV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+i` with `CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the zero-plus-`ki` target suffix policy.
- `buildPretClassANiCvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, `CV|CV` profile, final onset, final nucleus, transitive state, non-monosyllable state, and zero-plus-`ki` target policy. `buildPretClassANiCvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-ni-cv-transitive-policy`.
- The selected `descriptor_ni_transitive` `CV|CV` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting both zero and `ki`. A gate rule blocks this selected right-edge route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NA CV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+a` with `CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the `ki`-only target suffix policy.
- `buildPretClassANaCvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, `CV|CV` profile, final onset, final nucleus, transitive state, non-monosyllable state, and `ki`-only target policy. `buildPretClassANaCvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-cv-transitive-policy`.
- The selected `descriptor_na_transitive` `CV|CV` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting `ki` only. A gate rule blocks this selected right-edge route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A/B NA CV Intransitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A/B intransitive final `n+a` with `CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A/B candidates, the Class A `ki` target, or the Class B `k` target.
- `buildPretClassANaCvIntransitiveSourceFrame()` represents the original source verb, right-edge ending family, `CV|CV` profile, final onset, final nucleus, intransitive state, non-monosyllable state, and A/B target policy. `buildPretClassANaCvIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-cv-intransitive-policy`.
- The selected `descriptor_cvna_intransitive` branch, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` now consume the typed source/operation/target frames before allowing Class A/B or selecting `ki`/`k` suffixes. A gate rule blocks this selected shape route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, and poisoned display fields block or fail to alter the selected route.

## Completed Phase: Preterit Class B VNA Intransitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class B intransitive final `n+a` with `V|CV` right-edge profile no longer lets descriptor-only shape state authorize Class B candidates or the Class B `k` target; the selected Class B target branch now consumes typed source/operation/target frames directly.
- `buildPretClassBVnaIntransitiveSourceFrame()` represents the original source verb, right-edge ending family, `V|CV` profile, final onset, final nucleus, intransitive state, non-monosyllable state, and Class B target policy. `buildPretClassBVnaIntransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-b-vna-intransitive-policy`.
- The selected `descriptor_vna_intransitive` branch and `buildPretUniversalClassB()` now consume the typed source/operation/target frames before allowing Class B or selecting `k`. A gate rule blocks this selected shape route from falling through to default candidates when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NA CVCVCV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+a` with `CV|CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the zero-plus-`ki` target suffix policy.
- `buildPretClassANaCvcvcvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, `CV|CV|CV` profile, final onset, final nucleus, transitive state, non-monosyllable state, and zero-plus-`ki` target policy. `buildPretClassANaCvcvcvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-cvcvcv-transitive-policy`.
- The selected `descriptor_na_three_syllable_transitive` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting zero plus `ki`. A gate rule blocks this selected right-edge route from falling through to default candidates or the broader `descriptor_na_transitive` fallback when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NA CVLVCV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+a` with `CVl|V|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the zero-plus-`ki` target suffix policy.
- `buildPretClassANaCvlvcvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, `CVl|V|CV` profile, final onset, final nucleus, transitive state, non-monosyllable state, and zero-plus-`ki` target policy. `buildPretClassANaCvlvcvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-cvlvcv-transitive-policy`.
- The selected `descriptor_cvlvna_transitive` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting zero plus `ki`. A gate rule blocks this selected right-edge route from falling through to default candidates or the broader `descriptor_na_transitive` fallback when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NA VLCVCV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+a` with `Vl|CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the `ki`-only target suffix policy.
- `buildPretClassANaVlcvcvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, `Vl|CV|CV` profile, final onset, final nucleus, transitive state, non-monosyllable state, and `ki`-only target policy. `buildPretClassANaVlcvcvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-vlcvcv-transitive-policy`.
- The selected `descriptor_vlcvna_transitive` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting `ki` only. A gate rule blocks this selected right-edge route from falling through to default candidates or the broader `descriptor_na_transitive` fallback when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A NA VJCVCV Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `n+a` with `Vj|CV|CV` / expanded `V|C|CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the zero-plus-`ki` target suffix policy.
- `buildPretClassANaVjcvcvTransitiveSourceFrame()` represents the original source verb, right-edge ending family, right-edge profile, final onset, final nucleus, transitive state, non-monosyllable state, and zero-plus-`ki` target policy. `buildPretClassANaVjcvcvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-na-vjcvcv-transitive-policy`.
- The selected `descriptor_vjcvna_transitive` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting zero plus `ki`. A gate rule blocks this selected right-edge route from falling through to default candidates or the broader `descriptor_na_transitive` fallback when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Preterit Class A TZA Transitive Policy Typed Operation Gate

Date: 2026-07-05

Decision:

- The selected preterit Class A transitive final `tz+a` with `CV|CV`, `Vj|CV|CV`, or expanded `V|C|CV|CV` right-edge profile no longer lets descriptor-only shape state authorize Class A candidates or the `ki`-only target suffix policy.
- `buildPretClassATzaTransitiveSourceFrame()` represents the original source verb, right-edge ending family, right-edge profile, final onset, final nucleus, transitive state, non-monosyllable state, and `ki`-only target policy. `buildPretClassATzaTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-tza-transitive-policy`.
- The selected `descriptor_cvtza_transitive` branch and `buildPretUniversalClassA()` target policy now consume the typed source/operation/target frames before allowing Class A or selecting `ki` only. A gate rule blocks this selected right-edge route from falling through to default candidates or the broader `descriptor_tz+*` fallback when source or operation frames are missing.
- Missing source frames, missing operation frames, missing target frames, contradictory source/target frames, poisoned display fields, and descriptor poisoning block or fail to alter the selected route.

## Completed Phase: Denominal Andrews Route Target Input Typed Frame

Date: 2026-07-06

Decision:

- The selected Lessons 54-55 denominal Andrews contract route target-input path no longer lets `targetInput`, `targetInputValue`, or `targetVerbStem` display fields decide the active route input, continuation identity component, or active route context match.
- `buildNawatDenominalAndrewsRouteTargetInputSourceFrame()` represents the source stem, Andrews route ids, executable rule id, target verb stem, target valency, segmented suffix template, and orthography-converted suffix. `buildNawatDenominalAndrewsRouteTargetInputOperationFrame()` consumes that frame and emits `andrews-denominal-contract-route-target-input-realization`.
- Route construction, finite-generation request construction, active denominal route context lookup, active render context lookup, and denominal route continuation identity now consume the typed source/operation/target frames before exposing the display `targetInput` mirror.
- Missing operation frames, contradictory target frames, and poisoned display fields block or fail to alter the selected route input/context path.

## Completed Phase: Nonactive Rule-Base Prefix Strip Typed Operation

Date: 2026-07-06

Decision:

- The selected nonactive rule-base fallback path no longer strips directional, fusion, or bound prefixes from a direct rule-base string before typed authorization.
- `buildNonactiveRuleBasePrefixStripSourceFrame()` represents the original rule base plus directional/fusion/bound prefix frames, and `buildNonactiveRuleBasePrefixStripOperationFrame()` consumes that frame and emits `andrews-nonactive-rule-base-prefix-strip`.
- `stripNonactiveRuleBasePrefixes()` now blocks the selected prefix-stripping route unless the matching source/operation/target frames are provided; `resolveNonactiveRuleBase()` and `buildNonactiveRuleSourceContext()` use the typed helper instead of the old string-only helper, and the source context does not fall back to the prefixed rule-base string when the typed strip cannot produce a target.
- Missing operation frames, contradictory source/target frames, poisoned display fields, and direct string-only calls cannot authorize the selected prefix-stripping route.

## Completed Phase: Preterit Base Transform Target Frame Gate

Date: 2026-07-06

Decision:

- The selected preterit base-transform realization path no longer lets append, replace-suffix, perfective-replacement, deletion-shift, or final-`i` coalescence produce a target base from operation segment strings alone.
- `buildPretBaseOperationFrame()` now emits a `preterit-base-transform-target-frame` with the source signature, transform kind, target base, and target signature. `evaluatePretBaseOperationFrame()` re-derives the target from the source/segment operation frame and then requires the matching target frame before `realizePretBaseSpec()` can return a base.
- Poisoned legacy transform fields and fallback strings remain ignored, while missing or contradictory target frames now block the selected base-transform route.

## Completed Phase: Current Regex Source Model Operation Gate

Date: 2026-07-06

Decision:

- The selected current-regex derivation source-model route no longer lets a raw current-regex string directly authorize model construction through `buildCurrentRegexDerivationSourceModel()`.
- `buildCurrentRegexDerivationSourceModelOperationFrame()` now converts the typed `current-regex-derivation-source-parse-tree` into a typed operation and `current-regex-derivation-source-model-target-frame`; `buildCurrentRegexDerivationSourceModel()` consumes that operation/target frame before returning matrix base, outer pieces, core-prefix pieces, supportive marker, adjacent embed, and transitivity.
- `buildDerivationSourceModel()`, supportive preceding-surface recovery, and VNC lexical-prefix recovery now parse original source input into a tree and operation frame first; explicit parse trees still beat contradictory `sourceRawVerb`.
- Direct string-only model calls, missing operation frames, contradictory target frames, and poisoned raw regex text cannot authorize or alter the selected source-model route.

## Completed Phase: Current Regex Derivation Parse Tree Operation Gate

Date: 2026-07-06

Decision:

- The selected current-regex derivation parse-tree route no longer lets `buildCurrentRegexDerivationSourceParseTree()` consume the raw `parseMovingTargetRegexInput()` result as parse-tree authority.
- `buildCurrentRegexDerivationSourceParseTree()` now builds the upstream `andrews-current-regex-parse` operation from original input, and `buildCurrentRegexDerivationSourceParseTreeFromParseOperationFrame()` derives the derivation parse tree from that operation target.
- The derivation source-model operation still consumes the derivation parse tree, so the live source-model route now has two explicit operation layers: current-regex parse authorization, then derivation source-model authorization.
- Missing parse operations, contradictory parse target frames, and old raw parsed-object payloads cannot create a derivation source parse tree.

## Completed Phase: Raw Input Regex Metadata Operation Gate

Date: 2026-07-06

Decision:

- The selected raw-input metadata route no longer lets `getRawInputTiCausativeMetadata()` consume the raw `parseMovingTargetRegexInput()` result to decide normalized input, display core, object-slot count, dash prefix, or inline `ti` causative metadata for current-regex envelope input.
- `getRawInputTiCausativeMetadata()` now builds the upstream `andrews-current-regex-parse` operation frame from original input, and `getRawInputTiCausativeMetadataFromParseOperationFrame()` derives regex metadata from the operation target frame.
- Plain non-envelope input still follows the non-regex raw-input path; the selected current-regex branch requires the typed parse operation.
- Missing parse operations, contradictory parse target frames, and old raw parsed-object payloads cannot authorize regex metadata.

## Completed Phase: Current Regex Parse Operation Gate

Date: 2026-07-06

Decision:

- The selected `parseVerbInput()` current-regex route no longer hands the raw `parseMovingTargetRegexInput()` result directly to verb-meta construction as grammar authority.
- `buildCurrentRegexParseSourceFrame()` represents the original current-regex input, `buildCurrentRegexParseOperationFrame()` consumes it, and the operation target frame carries regex value, transitivity, outer-piece frames, directional prefix, core text, original core text, and target signature.
- `buildParsedVerbFromMovingTargetInput()` now requires that typed parse operation frame, rebuilds the parsed payload from the target frame, and blocks missing or contradictory parse frames. The live direct and shorthand parse routes construct the parse operation before verb-meta construction.
- Poisoned parsed objects and display fields cannot alter the selected verb or matrix base; direct no-operation calls block.

## Completed Phase: Current Regex Validation Operation Gate

Date: 2026-07-06

Decision:

- The selected current-regex validation route no longer asks the raw `parseMovingTargetRegexInput()` result to decide whether direct or shorthand input is recognized.
- `isRecognizedCurrentRegexValue()`, `getInvalidVerbStructure()`, and the current-regex branch of `isAllowedPartialRegexEnvelopeValue()` now require the `andrews-current-regex-parse` operation/target frame to recognize a complete current-regex input.
- Shorthand validation first requires the existing `andrews-current-regex-shorthand-operation-frame`, then validates the shorthand target through the same typed current-regex parse operation.
- Missing or contradictory parse operation frames block recognition helpers; direct and shorthand validation still build frames from original input only, not display `surface`, `result`, `formulaEcho`, or parsed-object payloads.

## Completed Phase: Current Regex Serialization Operation Gate

Date: 2026-07-06

Decision:

- The selected current-regex input serialization route no longer reads the raw `parseMovingTargetRegexInput()` object to decide the canonical regex display value.
- `serializeRegexInputValue()` now builds a `current-regex-parse-source-frame` from the original input, authorizes it through `andrews-current-regex-parse`, and renders the canonical regex string from the operation target frame only after the operation matches the source.
- `serializeRegexInputValueFromOperationFrame()` is the blocked lower-level operation consumer: missing or contradictory operation/target frames return no serialized value.
- Legacy parser output, display fields, and stale result/formula strings do not participate in this selected serialization route.

## Completed Phase: Embedded Slash Source Parse Operation Gate

Date: 2026-07-06

Decision:

- The selected embedded-slash object-slot route no longer lets `buildEmbeddedSlashObjectSlotSourceFrame()` accept the raw `parseMovingTargetRegexInput()` result as its source authority.
- `buildEmbeddedSlashObjectSlotSourceFrame()` now requires the upstream `andrews-current-regex-parse` operation frame, rebuilds current-regex structure from that operation target, and then derives the embedded slash boundary and object-slot source frame.
- The live `parseVerbInput("-(ish/kwi)")` route passes the typed current-regex parse operation into verb-meta construction before the embedded object-slot operation is built.
- String-only source-frame calls, old parsed-object payloads, missing parse operation frames, contradictory parse target frames, valence-left slash boundaries, and poisoned display fields cannot authorize the embedded object slot.

## Completed Phase: Composer Regex State Parse Operation Gate

Date: 2026-07-06

Decision:

- The selected live composer regex-state entry no longer lets `parseComposerStateFromRegexValue()` call `parseMovingTargetRegexInput()` directly and hand a raw parsed object to the composer-state builder.
- `parseComposerStateFromRegexValue()` now builds the upstream `andrews-current-regex-parse` operation frame from original input, and `buildComposerStateFromCurrentRegexParseOperationFrame()` derives active stem, transitivity, valence, embed slots, supportive marker, syllable mode, and `ti` class from the operation target frame.
- `buildComposerStateFromMovingTargetParsed()` is now a blocked compatibility entry unless a matching parse operation frame is provided; it ignores the passed parsed object and reads the typed operation target instead.
- Missing parse operation frames, contradictory parse target frames, lying parsed-object display fields, and poisoning the old parsed-object builder cannot authorize or alter the selected live composer parse route.

## Completed Phase: Regex Supportive Toggle Operation Gate

Date: 2026-07-06

Decision:

- The selected screen-calculator regex supportive toggle no longer lets `getRegexSupportiveIToggleInfo()` parse a display regex string directly, read raw metadata display fields, or call the old `parseVerbInput()` / rightmost-stem string route to decide toggle availability or the next regex value.
- `buildCurrentRegexSupportiveToggleSourceFrame()` consumes the upstream `andrews-current-regex-parse` operation target, and `buildCurrentRegexSupportiveToggleOperationFrame()` emits `andrews-current-regex-supportive-toggle` with a target frame for `canToggle`, `hasMarker`, source core, source stem, supportive letter, next core, and next value.
- `getRegexSupportiveIToggleInfoFromOperationFrame()` blocks missing or contradictory toggle operation frames; the live button-state and click route build the operation from original input before reading the target frame.
- Lying `surface`, `result`, and `formulaEcho` fields, poisoned raw metadata, and poisoned `parseVerbInput()` cannot authorize or alter the selected supportive-toggle route.

## Completed Phase: Nuclear Clause Entrada Grammar Object Operation Gate

Date: 2026-07-06

Decision:

- The selected `executeNuclearClauseSurfaceRequest()` entrada-grammar fallback no longer calls `parseMovingTargetRegexInput()` or `buildEntradaGrammarObjectFromMovingTargetParsed()` directly when no explicit entrada grammar object is supplied.
- The fallback now builds the upstream `andrews-current-regex-parse` operation from original input, then `buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame()` consumes that parse target and emits an `andrews-current-regex-entrada-grammar-object` operation with source/target frames before attaching an `andrews-entrada-grammar-object`.
- Missing parse operations, contradictory parse target frames, and contradictory entrada target frames block. The executor no longer contains the old raw parser or parsed-object builder calls.
- Poisoning the old parsed-object entrada builder cannot alter the typed entrada grammar object for the selected fallback route.

## Completed Phase: Active-Action Nominal Compound Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected active-action `sustantivo-verbal` -> ordinary NNC nominal-compound continuation no longer lets `actionNominalSurface`, `compoundStem`, or `ordinaryNncInput` display strings authorize the next NNC payload.
- `buildActiveActionNominalCompoundContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, builds an `andrews-typed-operation-continuation-frame` target, and emits an `andrews-active-action-nominal-compound-operation-frame`.
- The ordinary NNC request for this route is built from that operation frame and carries formula slots/source/target operation frames; poisoning request `stem`, route target-frame mirrors, display `ordinaryNncInput`, or display `compoundStem` cannot change the generated NNC stem.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks active-action nominal compound entry without the typed target frame. String-only calls, missing source frames, contradictory display surfaces, and contradictory target frames block.

## Completed Phase: Customary-Agentive Nominal Compound Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected customary-present agentive `agentivo` -> ordinary NNC nominal-compound continuation no longer lets `customaryAgentiveStem`, `compoundStem`, or `ordinaryNncInput` display strings authorize the next NNC payload.
- `buildCustomaryAgentiveNominalCompoundContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, derives the fully nominalized agentive stem from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target, and emits an `andrews-customary-agentive-nominal-compound-operation-frame`.
- The ordinary NNC request for this route is built from that operation frame and carries formula slots/source/target operation frames; poisoning request `stem`, route target-frame mirrors, display `ordinaryNncInput`, or display `compoundStem` cannot change the generated NNC stem.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks customary-agentive nominal compound entry without the typed target frame. String-only calls, missing source frames, contradictory display stems, unsupported nominal matrices, and contradictory target frames block.

## Completed Phase: Patientivo Nominal Compound Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected patientivo `#3 salida` -> ordinary NNC nominal-compound continuation no longer lets `patientivoSurface`, `compoundStem`, or `ordinaryNncInput` display strings authorize the next NNC payload.
- `buildPatientivoNominalCompoundContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, derives the embedded patientive stem from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target, and emits an `andrews-patientivo-nominal-compound-operation-frame`.
- The ordinary NNC request for this route is built from that operation frame and carries formula slots/source/target operation frames; poisoning request `stem`, route target-frame mirrors, display `ordinaryNncInput`, or display `compoundStem` cannot change the generated NNC stem.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks patientivo nominal compound entry without the typed target frame. String-only calls, missing source frames, contradictory display surfaces, and contradictory target frames block.

## Completed Phase: Patientivo Compound Embed Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected patientivo `#3 salida` -> compound VNC embed continuation no longer lets `patientivoSurface`, `compoundVerbInput`, or DOM display fields authorize the next VNC payload.
- `buildPatientivoCompoundEmbedContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, derives the embedded patientive stem from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target, and emits an `andrews-patientivo-compound-embed-operation-frame`.
- The executable VNC request for this route is built from that operation frame and carries source/target operation frames; poisoning `posicionesFormula.tronco`, display `compoundVerbInput`, or target-frame mirrors cannot change the generated VNC stem.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks patientivo compound embed entry without the typed target frame. String-only calls, missing source frames, contradictory display surfaces, unsupported matrices, and contradictory target frames block.

## Completed Phase: Patientivo Prelocative Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected patientivo `#3 salida` -> prelocative/incorporated-root CNV continuation no longer lets `patientivoSurface`, `prelocativeVerbInput`, object-prefix mirrors, or route-store datasets authorize the next VNC payload.
- `buildPatientivoPrelocativeContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, derives the embedded patientive stem from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target with matrix and outside-object frames, and emits an `andrews-patientivo-prelocative-operation-frame`.
- The executable VNC request for this route is built from that operation frame and carries source/target/object operation frames; poisoning `posicionesFormula.tronco`, display `prelocativeVerbInput`, or target-frame mirrors cannot change the generated VNC stem or object prefix.
- The renderer passes source/target continuation frames through the visible continuation, and the composer blocks patientivo prelocative entry without the typed target frame. String-only calls, missing source frames, contradictory display surfaces, incompatible matrices, unmapped objects, and contradictory target frames block.

## Completed Phase: Patientivo Characteristic-Property Embed Continuation Operation Gate

Date: 2026-07-06

Decision:

- The selected `calificativo-instrumentivo` / Andrews 39.9 `-yut/-yu` characteristic-property `#3 salida` -> incorporated-object CNV continuation no longer lets `characteristicSurface`, `compoundVerbInput`, object-prefix mirrors, or DOM datasets authorize the next VNC payload.
- `buildPatientivoCharacteristicPropertyEmbedContinuationContract()` now requires a generated-output typed source continuation frame with canonical formula and formula-realization records, derives the embedded characteristic-property root from that frame's predicate slot, builds an `andrews-typed-operation-continuation-frame` target with matrix/outside-object frames, and emits an `andrews-patientivo-characteristic-property-embed-operation-frame`.
- The executable VNC request for this route is built from that operation frame and carries source/target/object operation frames; poisoning `posicionesFormula.tronco`, display `compoundVerbInput`, display characteristic surfaces, or target-frame mirrors cannot change the generated VNC stem or object prefix.
- The renderer passes source/target continuation frames through the visible `calificativo-instrumentivo` continuation, and the composer blocks characteristic-property embed entry without the typed target frame. String-only calls, missing source frames, contradictory display surfaces, missing `-yut/-yu` source structure, and contradictory target frames block.

## Completed Phase: Preterit Class A/B Reduplicated CV|CV(w+i) Transitive Policy Gate

Date: 2026-07-06

Decision:

- The selected live preterit route for reduplicated transitive `w+i` whose non-reduplicated analysis root has `CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A zero/`ki` output, or Class B `k` output from descriptor-only `CV-CV(wi)` matches.
- `buildPretClassACvwiTransitiveSourceFrame()` now carries the reduplication state and target policy as typed source slots; the target frame derives `allowZeroSuffix` from that source frame rather than from descriptor booleans or mutable context strings.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require the typed source/operation/target frames for this selected `sesewi`-style route; missing frames, contradictory reduplication/target frames, display-string poisoning, and descriptor-only fallthrough block.
- Emitted Class A and Class B variants carry the typed route policy frame. Rendered bases/suffixes remain output artifacts after structural authorization.

## Completed Phase: Preterit Class A/B Reduplicated CV|CV|CV(w+i) Transitive Policy Gate

Date: 2026-07-06

Decision:

- The selected live preterit route for reduplicated transitive `w+i` whose non-reduplicated analysis root has `CV|CV|CV` right-edge shape no longer authorizes Class A/B candidate selection, Class A zero output, or Class B `k` output from descriptor-only `CV-CV-CV(wi)` or broad Wi aggregate matches.
- `buildPretClassACvcvwiTransitiveSourceFrame()` now accepts the reduplicated source state, records it as a typed source slot, and keeps the selected target policy in the typed source/operation/target contract rather than in mutable descriptor/default fallthrough.
- `getPretUniversalClassCandidates()`, `buildPretUniversalClassA()`, and `buildPretUniversalClassB()` require the typed source/operation/target frames for this selected `tetepewi`-style route; missing frames, contradictory reduplication frames, display-string poisoning, and descriptor/default fallthrough block.
- Emitted Class A and Class B variants carry the typed route policy frame. The raw reduplicated input remains an entry source; the grammar executor consumes the typed non-reduplicated source frame before rendering bases/suffixes.

## Completed Phase: Classical Typed Lesson-Layer VNC Authority

Date: 2026-07-12

Decision:

- Lessons 5 and 6 now emit one canonical typed Classical VNC slot frame. Printed formulas are marked display-only and cannot become later-layer authority.
- Lesson 7 consumes the typed frame and Lesson 8 performs directional placement, supportive-vowel realization, third-person object spelling, and `num1` realization only after final slot order is known.
- The public Lesson 8 final-boundary compatibility function is typed-only. String-only formula calls fail closed; the old parser implementation is unexported removal debt.
- The live machinery publishes explicit layer contracts and a layer-evaluation frame naming active layers, provisional lower frames, and the highest active finalizer. Sentence finalization can therefore supersede the VNC finalizer without changing the lower frame.
- Classical Authority control visibility is now derived from authorized machinery capabilities rather than lesson-number checks.
- The Authority option ledger is executable: every visible option must have a unique complete Canvas tag, valid exact witness, and in-range Transcription lines. Future untagged options fail validation.
- Hostile tests prove lying formula artifacts cannot influence selected output, contradictory typed slots block, and lower Lesson 5 output cannot freeze the surface before the Lesson 8 or sentence finalizer.

Evolutionary subgoal:

- Extract sentence finalization and the Authority option registry from rendering/the Lesson 7 aggregate into dedicated core modules while preserving the typed VNC and highest-active-finalizer contracts established here.
- Remove the unexported legacy Lesson 8 string-parser cluster after historical comparison coverage no longer needs it.

Validation:

- Classic runtime: 3,087/3,087 tests passing.
- Module runtime: 3,087/3,087 tests passing.
- `git diff --check` and grammar-data validation are required in the final audit.

## Completed Phase: Classical Lesson 2.10 Progressive Assimilation Boundary Authority

Date: 2026-07-12

Decision:

- Lesson 2.10 is no longer only an assimilation inventory. `buildClassicalNahuatlLesson210ProgressiveAssimilationFrame()` applies the six Canvas-authorized progressive pairs across analyzed grammatical morph boundaries and records machine-readable boundary actions.
- The frame preserves both forms needed by the architecture: a hyphenated analyzed stem and its solid Classical spelling. Canvas examples are proof anchors, not a whitelist, so novel stems with the same boundary variables receive the same rule.
- Ordinary Lesson 7 class and predicate generation consume the realized analyzed stem before selected output. Already-realized tla-fusion derivatives are not reinterpreted as fresh source boundaries.
- The typed Lesson 8 finalizer now applies Lesson 2.10 after directional placement. Canvas `huāl + tlāl-` is realized as `huāl(lāl-)`, while the lower Lesson 7 predicate remains provisional until that new boundary exists.
- Hostile tests prove a nearby nonmatching boundary remains unchanged, a requested contradictory realization blocks, and Lesson 2.10 cannot itself invent `ll` outside Rules 1 and 2. A higher witnessed layer may supersede that provisional result, as Lesson 11 does for fused `huāl-lā`.

Validation:

- Classic runtime: 3,102/3,102 tests passing.
- Module runtime: 3,102/3,102 tests passing.

## Completed Phase: Classical Lesson 11 Irregular Paradigms Inside Regular Authority

Date: 2026-07-12

Decision:

- Every word of Canvas 11.1-11.6 was audited against the Classical path. Its 35 executable claims and notes are now matched one-for-one by legal ledger subrules. Lesson 11 is implemented in `src/core/classical/lesson11_irregular_vnc.js` as a typed irregular-paradigm resolver, not as a second conjugator and not as an `irregular` UI switch.
- The regular candidate remains the baseline. Lesson 11 can reuse a lower sound rule, override a derived compound class, add a conditioned perfective variant, remap semantic tense to morphological tense, disable a defective paradigm cell, select a suppletive stem, alter a final tense/number morph, require a Canvas construction, remove a fused prefix in an authorized matrix environment, assign a contextual interpretation, or record marked usage.
- 11.2 delegates `ce-ya` to the existing Lesson 7.4 sound-change authority. 11.3 covers compound class shift and the conditioned `ti`-stem regular/irregular relation without granting `h` perfectives to nearby unlisted `ti` stems.
- 11.4 distinguishes requested tense meaning from morphological tense, gates defective paradigms, preserves the exceptional `mani` preterit source, applies `itz` `/k/` loss to typed tense/number slots, distinguishes the two `itz` lexemes, exposes `quēn`, `quēn mach`, incorporated `quēn`, and pronominal-NNC requirements, records the second-person `hui-tz` command reading, and provides a typed `on-o > o` connective-`t` matrix action.
- 11.5 selects every witnessed `ye/ca`, `yā/ya-uh/hui/yah`, and fused `huāl-lā` paradigm cell from mood, tense meaning, and subject number. It preserves plural silent `num1`, exposes the complete antiquated `catqui` formula as a marked alternative, rejects the non-good `ya-hui` plural, and enforces plural subjects for `cen-hui`. The higher Lesson 11 suppletive plan explicitly supersedes provisional Lesson 2.10 `l-l` rejection and ordinary Lesson 7 class inference only for the come paradigm.
- 11.6 idioms are executable phrase records with exact surface, meaning, and witness boundaries; they cannot alter ordinary VNC generation.
- Result shows one selected formula first and complete typed authorized alternatives separately. A blocked higher Lesson 11 decision now suppresses the lower provisional formula from selected result and sentence surface; the provisional form remains available only to proof. `general past`, construction, and lexical reading are tagged authority options.
- `#1 Source` remains stem entry only. For a recognized Lesson 11 irregular identity, the machine builds the complete witnessed `imperfective > perfective` relation and Result shows it beside the selected member. This includes ordinary irregular perfectives, conditioned alternatives, defective paradigms, form-meaning dislocations, and all suppletive members. The user does not re-enter a paradigm that Canvas already supplies.
- A blocked defective Lesson 11 cell now remains an informative Result instead of collapsing to a generic failure: `i-ā` shows the machine relation `*(0-i-ā) > (0-i-h)` while its witness retains Canvas `*(Ø-i-ā) > (Ø-i-h)`, names the required pronominal-NNC cooperation, keeps the selected formula empty, and prevents the higher sentence layer from reporting authorization before that prerequisite exists. One typed zero-root operation converts witnessed `Ø` to formula `0`, preserves `0-i-h` inside the selected formula, and suppresses only the zero root in the written surface. The older inventory, Lesson 11 identity, proof, Result, and selected formula therefore share `0-i-ā` / `0-i-h` as their machine representation.

Hostile coverage:

- Unknown verbs stay regular; nearby `pati` cannot inherit `mati > mah`.
- Plural preterit and distant-past `mati` cannot select `mah`.
- Defective `ā`, `itz`, `am-i-ā`, and `Ø-i-ā` contexts fail when their paradigm or construction requirement is absent.
- Formula/result/surface poison strings cannot select an irregular or suppletive stem.
- Unknown verbs cannot acquire a Lesson 11 paradigm relation from a printed arrow or spelling resemblance; they remain under the regular system.
- Nonmatching idioms cannot authorize an idiomatic reading or ordinary VNC output.
- Typed `itz` final slots prove `/k/` deletion is a boundary action; fused come output proves suppletive selection reaches the selected formula.
- The zero-root action authorizes only a witnessed root-position `Ø`; an internal `Ø` or a nearby stem without that root cannot acquire `0` in its formula.
- A 31-cell suppletive matrix and an 18-form stem/boundary matrix verify exact Canvas formulas. Hostile cases prove bare `itz` is ambiguous, alert `itz` is perfective-only, motion `itz` cannot become a simple VNC, singular `cen-hui` blocks, nearby `cen-huica` stays regular, and blocked higher authority cannot leak a provisional lower formula into Result.

Evolutionary subgoal retained:

- Lesson 16 must supply the actual typed pronominal-NNC partner consumed by 11.4.7. Lesson 28 must supply the complete connective-`t` compound frame consumed by the 11.4.2 matrix action. Later lessons may add lexemes, construction frames, and phrase-level meanings through the same typed action vocabulary, but must not add a parallel irregular engine, infer lexical exceptions from spelling resemblance, or let a displayed formula become authority.

Validation:

- Classic runtime: 3,112/3,112 tests passing.
- Module runtime: 3,112/3,112 tests passing.
- Browser verification: plural present `ye` selects `#ti-0(ca-t)0+⎕-eh#`; incorporated `quēn` builds `#ti-0(quē-n-am-i-h)0+qu-eh#`; alert `itz` enables only preterit/distant-past; motion `itz` displays no selected formula; authorized `i-ā` shows the explicit handoff `provisional i-h: final 0-i-h`, selects `#n-0(0-i-h)0+⎕-0#`, writes `Nih.`, and places the exact Lesson 11.4.7 zero-root deed first in Witness; desktop and constrained-width surfaces have no measured DOM overflow; browser console is clean.
- Ledger JSON parses and `git diff --check` passes.

## Merge Rules

- Do not edit the same file from two worktrees at the same time.
- Update this board before ending a coordination session when assignments change.
- If uncertain, write a question or target clarification instead of guessing.
- Main-thread edits should stay on the current working tree unless the user explicitly requests worktrees.
# Completed Phase: Classical Lesson 12 Absolutive-State NNC Rule Logic

Date: 2026-07-13

Decision:

- Lesson 12 now has a separate Classical typed NNC authority path; the existing Nawat/Pipil ordinary-NNC module remains outside that authority path.
- The Lesson 12 frame consumes the authorized Lesson 4 vacant-State NNC formula and fills nominative subject person, absolutive subject-number connectors, nounstem predicate, and animacy/reference conditions without a Valence or Tense slot.
- The four singular/common class connectors and three plural connector dyads are typed subject constituents. Number is never treated as nounstem inflection, and lexical class remains an input that Lesson 14 must govern rather than an ending-based certainty.
- Nounstem predicates record discourse-supplied time and no encoded definiteness. Lexically possessive-only stems block an absolutive request unless a higher semantic override is explicitly active.
- Hostile tests prove VNC tense/valence, nonanimate plural without metaphorical reference, contradictory typed slots, and lying formula artifacts cannot authorize selected output. Script and module runtimes pass the focused Lesson 12 suite.

Evolutionary constraint:

- Lessons 13-16 must transform or specialize `classical-nahuatl-nnc-slot-frame`. They may not reparse or freeze the displayed Lesson 12 formula.

## Completed Phase: Classical Lesson 13 Possessive-State NNC Rule Logic

Date: 2026-07-13

Decision:

- Lesson 13 extends the typed Classical NNC frame with monadic and dyadic possessive State rather than adding possessor text to a formula string.
- Monadic `ne`, `te`, and `tla` carry reciprocal, nonspecific-human, and nonspecific-nonhuman roles. `tla` requires a relational nounstem or the later analogical-derived route.
- Dyadic State distributes specific possessor person and number/case across `st1-st2`; first/second-person `o` becomes `⎕` before a vowel-initial stem, while third plural requires an explicit `m` or `n` selection.
- Possessive subject number uses lexically selected `uh`, `hui`, or `0` for singular/common and `hu-ān` for plural. The plural `num2` morph is long-vowel `ān`, directly from Canvas §13.2; these are subject connectors, never possessive suffixes.
- Hostile tests prove incompatible boundary connectors, missing third-plural st2, forbidden lexical State, and lying formula artifacts fail closed. Script and module runtimes pass.

Evolutionary constraint:

- Lesson 14 owns use-stem and class selection. Lesson 13 supplies the typed State and subject frame that Lesson 14 must transform.

## Completed Phase: Classical Lesson 14 Nounstem Class and Use-Stem Authority

Date: 2026-07-13

Decision:

- Lesson 14 now consumes the typed Lesson 12 absolutive or Lesson 13 possessive NNC frame and finalizes a class-governed typed NNC. It never reparses the displayed formula.
- Noun class is a user or external lexical selection. Stem-final form supplies Canvas constraints and candidates, but cannot itself authorize class membership; vowel-final stems therefore remain compatible with both `tl` and zero class.
- Absolutive State selects the restricted-use base. Possessive State selects the general-use stem. A truncated general-use stem can be built only by deleting an explicitly tagged ephemeral `a` or `i`; Subclass 2-C separately records the supportive-`i` repair. Glottalized use remains reserved for later compound-embed authority.
- Affinity and distributive/varietal formation is represented as a typed operation inside one predicate stem. It never fills subject number and can therefore coexist with common-number subjects.
- Plural connectors remain lexically selected even where class and final shape provide tendencies. Possessive singular/common connectors are derived from typed class and subclass selections, including explicitly authorized `hui ~ ⎕` alternatives.
- Constituent ambiguity is retained as typed alternatives. Spelling strings cannot decide whether `uh`, `tl`, `tli`, initial `o`, or `m` belongs to the stem or to a grammatical slot.
- Every selected NNC now carries `appliedLayerIds`. Asking an older frame for a higher result blocks unless the higher layer was actually applied, preventing an earlier lesson from freezing the form merely by changing `highestActiveLesson`.

Hostile coverage:

- Form guidance cannot select a class; contradictory class/form combinations block.
- Untagged final vowels cannot be deleted to invent a general-use stem.
- Class tendencies cannot invent a plural connector, and distributive formation cannot silently change the source connector.
- An unlicensed silent connector and string-only constituent analysis are rejected.
- Formula artifacts cannot replace typed class, use-stem, derivation, connector, or selected-output authority.

Validation:

- Focused classic runtime: 20/20 tests passing.
- Focused module runtime: 20/20 tests passing.

Evolutionary constraint:

- Lesson 15 must consume `classical-nahuatl-lesson14-class-governed-nnc-frame` or its typed NNC slot frame. It may add higher NNC conditions, but cannot infer class, use shape, derived-stem role, or constituent structure from the rendered formula.

## Completed Phase: Classical Lesson 15 Higher NNC Conditions

Date: 2026-07-13

Decision:

- Lesson 15 consumes an authorized Lesson 14 class-governed frame and applies higher NNC operations to its typed slots. A formula string or a bare older slot cannot stand in for that consumed authority.
- Productive boundary assimilation is separate from lexical exceptions: stem-final voiceless `w` and `n` are removed before possessive plural `hu-ān`, while nonmatching stems remain unchanged. The retained-`n` spelling is recorded as an alternative, not used to freeze the analyzed formula.
- Possessive suppletion requires lexical selection authority and may carry its own typed subject-number connector. Canvas examples prove the operation but do not become a whitelist for nearby nouns; the rejected priestly `totēcuiyo` derivation is retained as an explicit negative record.
- Possessor reduplication expands one dyadic State frame into four typed `st1-st2-st1-st2` slots. It does not alter grammatical subject number.
- Secondary general-use `tē/ti/t` fusion, analogical `tla-` restricted-use derivation, and tl Subclass 2-A to 1-A reclassification are separate actions with distinct preconditions. Each changes the typed predicate stem or connector before rendering.
- Naturally possessed and never-possessive policies gate State. A never-possessive stem can enter possessive State only through an explicit metaphorical override.
- The pronominal possessor is labeled nuclear/basic. Supplementary possessors remain outside the NNC nucleus for later Lesson 17 authority.
- Lesson 15 sentence participation is a typed handoff. Assertion, negative, emphatic, both yes/no question routes, and wish are identified as sentence-layer possibilities, but the NNC formula does not authorize or realize their particles, polarity, or final sentence surface. Definiteness remains ambiguous.

Hostile coverage:

- A nearby stem cannot receive `hu-ān` assimilation without the relevant boundary.
- Suppletion without lexical authority blocks.
- Incompatible stem operations and possessor reduplication outside a dyadic possessive plural block.
- Natural-possession restrictions cannot be bypassed without the typed metaphorical override.
- An older Lesson 14 frame cannot obtain Lesson 15 authorization merely by changing the requested lesson number.

Validation:

- Focused classic runtime: 28/28 tests passing.
- Focused module runtime: 28/28 tests passing.

Evolutionary constraint:

- Lesson 16 must implement pronominal NNCs as a specialized typed family over the shared NNC layer contract. It must not treat English pronoun translations, Canvas example strings, or the Lesson 11 prerequisite name as authorization.

## Completed Phase: Classical Lesson 16 Pronominal NNC Family

Date: 2026-07-13

Decision:

- Lesson 16 is a specialized `pronominal` family over the shared typed NNC contract. It is restricted to absolutive State and does not expose an invented relative-pronoun subtype.
- Entitive personal, identificational interrogative, demonstrative, and indefinite subtypes and compositional quantitive subtypes are represented by typed source frames. English pronoun translations never authorize their Nahuatl structure.
- Predicate-internal plural `n` is kept inside the stem and is explicitly distinct from the subject's `t-in` or `⎕-⎕` number dyad. Plain-stem plurals, internally pluralized plurals, and lexically authorized plain variants remain separate selections.
- Personal simple `eh/yeh` and compound `eh-huā/yeh-huā` families implement person-conditioned shape, sounded/silent number variants, and the first-plural doubled-person construction with its restricted contextual meaning.
- Interrogative identity stems preserve whether interrogation is active. Negative or noninitial use removes interrogative quality without changing the typed NNC; an actual adjunct introduced by `in` receives a separate-writing instruction instead of being fused into the predicate.
- Demonstratives are invariant third-person stems; plural is reported by silent subject number without an internal plural morph. Indefinite compounds expose the `ah` matrix and its embed-length action, and human use of `itlah` requires an explicit special-situation selection.
- Quantitive inputs are composed from a typed embed plus `qui-ch`, `qui`, or `chi` matrix and a selected allomorph. The engine lengthens `qui/chi` before internal plural `n`; unpredictable allomorph deployment is not guessed from spelling.
- Authorized personal-pronominal frames emit `classical-nahuatl-lesson16-lesson11-cooperation-frame`, the typed partner required by Lesson 11.4.7. A boolean cooperation claim is expressly non-authoritative.
- The layer evaluator recognizes the specialized Lesson 16 path as Lesson 12 shared NNC structure plus Lesson 16 family finalization. Ordinary Lesson 14/15 class operations are not falsely claimed as active on this special family.

Hostile coverage:

- Possessive State and a fabricated relative subtype block.
- Internal plural `n` cannot be moved into subject number, and an invalid matrix allomorph cannot be inferred.
- Doubled first-plural morphology cannot spread to second or third person.
- `āc` cannot accept a non-third-singular subject; human `itlah` requires its semantic override.
- Formula poison and English translation text cannot change selected output.

Validation:

- Focused classic runtime: 38/38 tests passing after the Canvas-consistent supportive-`i` expectation was corrected.
- Focused module runtime: 38/38 tests passing after the same correction.

Evolutionary constraint:

- The shared surface must expose grammar categories, not lesson numbers. Lesson 11 cooperation must consume the typed Lesson 16 cooperation frame and reject the old boolean shortcut.

## Completed Phase: Lessons 12-16 Shared NNC Surface

Date: 2026-07-13

Decision:

- The Classical Source → Authority → Result surface now routes ordinary nounstems through the Lesson 12-15 typed pipeline and specialized pronominal nounstems through the Lesson 12 + Lesson 16 typed pipeline.
- The entered Source stem is required to match a selected Lesson 16 pronominal analysis. A family dropdown can select an analysis but cannot silently replace the user's source.
- Authority now exposes NNC subject including third-person common, NNC family, State, lexical noun class, possessor, general-use shape, subclass, conditioned number forms, referent status, and quantitive matrix. Each visible option has a complete Canvas authority tag.
- Controls are adaptive. Possessive, quantitive, plural/variant, and ordinary-class decisions appear only when active; VNC mood, tense, valence, object, direction, polarity, and construction controls remain out of the NNC lane.
- Lesson 11 defective `Ø-i-ā` cooperation now consumes the typed Lesson 16 cooperation frame. A boolean claim or subject-mismatched frame cannot authorize it.
- Hidden controls no longer occupy the rendered layout. NNC controls have explicit desktop grid roles, collapse to one column on mobile, and Result proof summaries wrap instead of overflowing.

Hostile coverage:

- An entered pronominal stem that disagrees with the selected family/person blocks selected output.
- A missing Source stem cannot be replaced by a Lesson 16 dropdown selection.
- Boolean-only and subject-mismatched Lesson 11 cooperation claims block.
- Every visible NNC Authority option must exist in the legal option ledger; an untagged future option fails UI validation.

Validation:

- Lessons 12-16 focused classic runtime: 39/39 passing.
- Lessons 12-16 focused module runtime: 39/39 passing.
- Lesson 11 focused classic and module runtimes: 15/15 passing each.
- UI focused classic runtime: 327/327 passing.
- Browser: personal simple `(yeh)`, subject `3sg`, authorized as `#0-0(yeh)0-0#`; no horizontal document overflow at desktop or narrow viewport.

Evolutionary constraint:

- Lesson 17 must consume the finalized typed NNC frame. It may add supplementary possessors around the nuclear/basic possessor, but it cannot reparse formula text, overwrite State ownership, or create a lesson-specific surface lane.

## Completed Audit: NNC Authority Options Must Reach Authorized Output

Date: 2026-07-14

Decision:

- `scripts/audit_classical_authority_states.js` derives states from the actual Canvas Source inventory and the live Authority option contract, then submits those states to selected-output generation. It does not maintain a second list of allegedly valid combinations.
- Personal `eh/yeh` and `eh-huā/yeh-huā` variants now expose only their Canvas-conditioned subject choices. Third-common `eh` variants remain selectable and are no longer rewritten to `yeh` by the engine.
- Short quantitative `c/ch` matrices expose the sounded `t-in` plural only. The engine records that as the Canvas plain plural variant; silent plural remains available only where a long matrix can carry internal `n`.
- Ordinary NNC referent choices now follow subject number. Third-common selects literal nonanimate reference; numbered subjects select animate or metaphorical-animate reference. A literal nonanimate plural can no longer be selected and then rejected later.

Hostile coverage:

- An `eh` source cannot be paired with third singular/plural, and a `yeh` source cannot be paired with first/second person.
- A short `c/ch` quantitative source cannot select silent plural and then fail for lack of an internal-`n` host.
- A numbered ordinary-NNC subject cannot select a literal nonanimate referent and reach the engine's animacy block.

Validation:

- Pronominal Authority audit: 282 selectable states checked, 0 blocked.
- Ordinary-NNC pairwise Authority audit: 1,201 selectable states checked, 0 blocked.
- Focused Lessons 12-16 tests: 50/50 passing in classic and module runtimes.
- Focused UI tests: 344/344 passing in classic and module runtimes.

Evolutionary constraint:

- Every new NNC option must be represented by the Authority option contract and must keep both audit modes at zero failures. A downstream block is not a substitute for disabling a Canvas-incompatible option at Authority.

## Completed Phase: Authority-Owned NNC Full Paradigm

Date: 2026-07-14

Decision:

- NNC Authority owns `Output scope`: `single form` or `full paradigm`. Source continues to own the analyzed stem and its embed/matrix structure; the selected noun class remains fixed throughout one paradigm.
- Full paradigm enumerates the existing Canvas option contract and sends every candidate through typed selected-output generation. Invalid candidates are omitted rather than rendered as blocked rows.
- Result displays one compact `Meaning | Formula | Surface` table. The single-form linear, diagrammatic, and sentence blocks are hidden while the full paradigm is active.
- The paradigm is morphological. It holds the currently selected sentence treatment constant instead of multiplying every NNC form by all sentence wrappers.
- Lesson 4 proof frames are shared only within one paradigm build. This is a performance reuse of typed proof input, not a shortcut around authority.
- `cn-output/paradigm` persists in the Entrada URL. Later NNC lessons must extend the typed row contract rather than adding lesson-specific tables.

Hostile coverage:

- A fake formula artifact cannot create, alter, or authorize a paradigm row.
- Every row must preserve the fixed Source kind and noun class and identify typed selected output as its authority.
- Short `c/ch` quantitive paradigms cannot expose a silent plural; their rows retain the Canvas-authorized `t-in` number form.
- Blocked candidate text never appears inside the table.

Validation:

- Focused UI tests: 347/347 passing in classic and module runtimes.
- Focused state tests: 406/406 passing in classic and module runtimes.
- Ordinary `icniuh` test paradigm: 233 typed forms generated in about 0.26 seconds after local proof-frame reuse.

Evolutionary constraint:

- A future NNC lesson may add a typed dimension, gate, or finalizer to this contract. It may not authorize rows from a display string, maintain a parallel fixture whitelist, or expose an invalid candidate as a selectable blocked result.

Follow-up: Wiktionary-style paradigm projection

- The typed row inventory remains the authority, but Result no longer presents it as one flat `Meaning | Formula | Surface` ledger.
- Result pivots typed rows into State sections, person rows, and singular/common-number/plural columns. Possessive State receives one collapsible table per possessor; the currently selected possessor opens by default.
- Surface forms are primary in each cell. The formula and all conditioning values remain attached beneath the surface.
- Identical formula-and-surface pairs may share one visual entry, but the projection records every contributing typed row ID. The display contract must prove that no authorized source row was dropped or represented twice.
- Sentence treatment remains fixed for one paradigm and is stated once at the group level instead of being repeated in every form meaning.
- Desktop and mobile verification confirm that the page itself does not overflow; wide paradigm tables own their horizontal scrolling.
- Validation after the projection change: 349/349 focused UI tests and 3,191/3,191 full tests pass in both classic and module runtimes.

## Completed Follow-up: Fixed Referent in NNC Full Paradigms

Date: 2026-07-14

Decision:

- `Referent` remains an enabled user choice in full-paradigm Authority. It is fixed for the entire paradigm rather than enumerated as another table dimension.
- Literal nonanimate reference exposes only the third-person common subject. Animate and deliberate metaphorical-animate reference expose numbered subjects and do not add a common-number row.
- Absolutive plural connector choices are class-governed before generation: Class `tl` admits `m-eh` or `0-h`; Classes `tli`, `in`, and `0` admit `t-in` or `m-eh`.
- The Result receipt states the fixed referent once. Individual paradigm forms no longer repeat it as if the table were mixing referent readings.

Hostile coverage:

- A literal nonanimate `(cal)` full paradigm cannot enumerate animate or metaphorical rows.
- Class `tli` cannot produce `#0-0(cal)0-h#` / `Calh`; the `0-h` route remains available only to Class `tl`.
- A metaphorical-animate `(cal)` paradigm remains possible when the user deliberately selects that referent, but it uses only the Class `tli` plural connectors `t-in` and `m-eh`.

Validation:

- Focused UI tests: 350/350 passing in classic and module runtimes.
- Full test suite: 3,192/3,192 passing in classic and module runtimes.
- Exhaustive NNC Authority audit: 2,155 selectable states checked, 0 blocked.
- Browser: literal nonanimate `(cal)` exposes enabled Referent Authority, renders `Calli`, and contains no `Calh`, `0-h`, animate condition, horizontal page overflow, or console error. Metaphorical animate remains a deliberate alternate referent and uses `t-in` / `m-eh` only.

Evolutionary constraint:

- Future NNC paradigm dimensions must declare whether they are fixed by the user or enumerated by the paradigm. A fixed semantic choice such as referent may not silently become a Cartesian-product display dimension.

## Completed Follow-up: Finite NNC Paradigm Map

Date: 2026-07-14

Decision:

- Full-paradigm Result is now map-first. It borrows the finite-coordinate method of a Smith chart without pretending that grammatical categories are continuous: State selects the map, person supplies rows, and predicate number supplies columns.
- Source, noun class, referent, and sentence treatment are fixed once in a reference strip. The map collapses unused person and number coordinates, so literal nonanimate `(cal)` shows only third/common while deliberate metaphorical-animate reference shows first/second/third against singular/plural.
- Possessive State uses one possessor selector over the typed Lesson 13 inventory. It no longer presents every possessor table simultaneously in the primary view.
- Each plotted form is an expandable projection of typed selected output. It exposes the linear formula, typed diagrammatic structure, conditioning values, and exact Canvas witness with Transcription line range.
- The preexisting table remains available through the secondary `Table` view for exact inspection. Map/Table, State, and possessor choices alter presentation only; they cannot create or authorize a paradigm row.
- The map builder accepts only `classical-nahuatl-nnc-paradigm-row` records whose authority is `typed-selected-output`. It records rejected untyped inputs and proves that every accepted source-row ID is represented exactly once.

Hostile coverage:

- A display-shaped row with a fake formula and surface is rejected by the map projection and cannot appear as a plotted form.
- Map conservation fails visibly if an accepted typed row is dropped or duplicated.
- Collapsing empty coordinates cannot change fixed referent or noun-class authority.
- Diagram and witness displays are carried from the typed row; neither is reconstructed by parsing the linear formula.

Validation:

- Focused UI tests: 351/351 passing in classic and module runtimes.
- Full test suite: 3,193/3,193 passing in classic and module runtimes.
- Exhaustive NNC Authority audit: 2,155 selectable states checked, 0 blocked.
- Browser desktop: map-first Result, exact Table switch, expandable formula/diagram/witness, possessive State, and possessor switching all verified with no console errors or document overflow.
- Browser narrow viewport: literal nonanimate map collapses to one coordinate; metaphorical animate expands to three rows and two columns with horizontal scrolling owned by the map, not the page.

Evolutionary constraint:

- Later NNC lessons may add a typed categorical dimension or finalizer. They must extend the typed paradigm-row contract and declare whether the dimension is fixed, selected, or plotted; display text and visual position remain non-authoritative.

## Completed Follow-up: Unified NNC Single-Form Result

Date: 2026-07-14

Decision:

- Single-form NNC Result now uses the same finite-reference discipline as the full paradigm: Source, noun class, referent, and sentence treatment are fixed in one reference strip, followed by the selected answer and only the conditions that produced it.
- Linear and diagrammatic structures are two views of one selected form, not separate competing output blocks. The sentence formula remains inside that selected-form section when a higher sentence layer adds visible material.
- `buildClassicalNncSingleFormDisplayFrame()` accepts only the authorized typed selected-output frame and its typed NNC slot. It reconstructs the formula from the slot renderer, receives sentence realization from the authorized sentence frame, and carries exact Canvas witness ranges without parsing display text.
- The VNC Result remains unchanged. This is an NNC single-form projection, not a shared grammar rewrite or a lesson-specific panel.

Hostile coverage:

- Poisoned `selectedFormula`, sentence-formula, and sentence-surface display strings cannot change the selected formula, written surface, diagram, conditions, or witness carried by the typed frame.
- A blocked or absent typed selected-output frame produces no authorized single-form projection.
- Duplicate sibling linear, diagrammatic, and sentence-surface blocks are absent while the unified NNC single-form section is active.

Validation:

- Focused UI tests: 353/353 passing in classic and module runtimes.
- Full test suite: 3,195/3,195 passing in classic and module runtimes.
- Exhaustive NNC Authority audit: 2,155 selectable states checked, 0 blocked.
- Desktop browser: one answer-first NNC section, fixed reference strip, Linear/Diagram switch, and no duplicate sibling output blocks.
- Narrow browser: the reference strip folds to two columns, labels and formulas remain contained, and the document has no horizontal overflow.
- VNC browser route retains its existing Linear, Diagrammatic, Sentence formula, and Sentence surface sections.

Evolutionary constraint:

- Later NNC lessons may add typed conditions or a higher sentence finalizer to the selected-output frame. They may not add sibling result scaffolding, authorize from displayed formula/surface text, or fork a lesson-specific single-form renderer.

## Completed Follow-up: Typed Pronominal NNC Reference Facts

Date: 2026-07-14

Decision:

- The missing noun class and referent in single-form Result came from a display shortcut that marked every nonordinary NNC as `not-applicable`. It did not come from Canvas or the formula engine.
- Lesson 16 pronominal Source frames now carry typed Canvas noun class and semantic referent category. Those facts pass through the typed number frame into `classical-nahuatl-nnc-slot-frame`; Result does not infer them from the printed formula or read them from disabled controls.
- Compound personal and `(tl-eh-huā)-tl-` structures carry class `tl`; simple, demonstrative, indefinite, and ordinary quantitive pronominal stems carry class `zero`; standalone `(cā)-tl-` carries `tl`; `(ā-0)-c-` carries its special `c` class. Entitive forms report `entity` or `person`; quantitive forms report `quantity`.
- Single-form sentence reference now uses the final typed sentence frame. A positive initial interrogative therefore reports `information question`, even when the lower requested sentence choice was `statement`.

Hostile coverage:

- A stale nonordinary `nncNounClass: zero` cannot overwrite typed `(tl-eh-huā)-tl-` class `tl` in Result.
- A stale `animate` control value cannot replace the typed entitive referent category `entity`.
- Requested `statement` cannot overwrite Lesson 16.4 information-question finalization.
- Representative personal, compound, interrogative-person, indefinite-person, ordinary quantitive, and quantitive-personal-compound frames prove that the metadata is category-driven rather than witness-whitelisted.

Validation:

- `node scripts/run_tests.js`: `3196/3196` passed.
- `node scripts/run_tests.js --runtime=module`: `3196/3196` passed.
- `node scripts/audit_classical_authority_states.js`: `2155` states checked, `0` failures.
- Browser verification for `#0-0(tl-eh-huā)tl-0#` shows noun class `tl`, referent `entity`, sentence `information question`, and no console warnings.

Evolutionary constraint:

- Future pronominal NNC source families must declare typed noun class and referent category before selected output. Result may display those facts but may not recover them by parsing `num1-num2`, example text, URL state, or formula strings.

## Completed Follow-up: Canvas-Structured NNC Subject Authority

Date: 2026-07-14

Decision:

- The NNC Subject section now exposes five distinct Canvas decisions: `Person`, `Animacy`, `Number`, `Number form`, and conditioned `Metaphorical use`.
- `Metaphorical use` is not a third animacy value. It is available only with animate subject reference and is cleared and disabled when nonanimate reference is selected.
- Nonanimate reference determines third-person common number. Animate reference allows the singular/plural person inventory authorized by the active NNC source family.
- The old combined `Subject` and `Referent` controls remain hidden compatibility mirrors for existing URLs. They do not appear in Authority and do not own selected-output authorization.
- Noun class and State remain Predicate facts. Lesson 16 entity/person/quantity remains typed Source meaning and is not reused as ordinary-NNC subject animacy.
- Typed NNC slot frames now carry `subjectAnimacy` and `metaphoricalUse` through both absolutive and possessive paths. Result labels ordinary NNC reference as `Animacy` and pronominal NNC reference as `Source meaning`.

Hostile coverage:

- A checked metaphorical-use state cannot survive a switch to nonanimate reference.
- Legacy `nncReferent` input is normalized once at the machinery boundary; full-paradigm rows cannot bypass typed animacy or lose metaphorical plural forms.
- Possessive NNC Result receives animacy from the typed number frame rather than recovering it from display state.
- An unchecked metaphorical-use option has its own complete Canvas tag, so future visible option-ledger validation remains fail-closed.

Validation:

- Focused UI tests: `353/353` passing in classic and module runtimes.
- Focused Lessons 12-16 tests: `51/51` passing in classic and module runtimes.
- Full test suite: `3,196/3,196` passing in classic and module runtimes.
- Exhaustive NNC Authority audit: `2,087` normalized selectable states checked, `0` blocked; pairwise transition audit: `1,254` states checked, `0` blocked.
- Browser desktop: Subject shows Person / Animacy / Number / Number form / Metaphorical use; animate and nonanimate transitions update Authority and Result without a blocked intermediate state.

Evolutionary constraint:

- Future NNC work must add subject categories to the typed subject-reference contract. It may not reintroduce a combined referent dropdown, treat metaphorical use as animacy, or infer these facts from the realized formula.

## Completed Follow-up: Finite Possessor Maps in Full NNC Paradigm

Date: 2026-07-14

Decision:

- Possessor remains a user choice for `Selected form`. In `Full paradigm`, it is an enumerated Canvas dimension and is not requested a second time in Result.
- The full-paradigm map shows every authorized possessive map simultaneously, grouped by Lesson 13 as `Monadic possessors` and `Specific possessors`. Absolutive State remains one map.
- Each small map is a projection of typed paradigm rows. Its person and predicate-number coordinates, formulas, surfaces, conditions, diagrams, and witnesses do not come from display-string parsing.
- Map and Table remain presentation choices. Neither can add, remove, or authorize a possessor row.

Hostile coverage:

- The possessive map-state contract has no selected-map key or possessor-option selector.
- Every typed source row appears exactly once across the grouped maps; conservation checks fail if a display group drops or duplicates a row.
- Monadic and specific grouping consumes the typed possessor identity and cannot invent an unattested possessor or formula.

Validation:

- Focused UI tests: `354/354` passing in classic and module runtimes.
- Focused Lessons 12-16 tests: `52/52` passing in classic and module runtimes.
- Full test suite: `3,198/3,198` passing in classic and module runtimes.
- Exhaustive NNC Authority audit: `2,087` selectable states checked, `0` blocked.
- Desktop browser: eight authorized possessive maps render together for `(pil)`, the finite map uses two columns, Result contains no possessor selector, page overflow is absent, and the console is clean.

Evolutionary constraint:

- Future possessive categories must enter the typed Lesson 13 possessor inventory and then project into the appropriate finite group. They may not restore a full-paradigm possessor dropdown or use witnesses as a whitelist of printable forms.

## Completed Follow-up: Finite VNC Paradigm Chart

Date: 2026-07-14

Decision:

- VNC Authority now offers `Single form` and `Full paradigm` output scopes.
- The full paradigm enumerates the Canvas coordinates `Transitivity`, `Valence arity`, `Valence realization`, `Subject`, `Mood`, and `Tense`; Source, class, specific-projective object, directional, polarity, and sentence type remain fixed inputs.
- Valence is presented as six finite Smith-chart-like maps: intransitive, shuntline reflexive/reciprocative `+ne`, nonspecific human `+tē`, nonspecific nonhuman `+tla`, specific projective `+va¹-va²`, and mainline reflexive/reciprocative `+va¹-va²`.
- Parallel to the NNC `Absolutive / Possessive` State view, the VNC Result first presents `Intransitive / Transitive`. Intransitive has vacant Valence; only the Transitive view exposes the subordinate `Monadic / Dyadic` choice. Monadic contains the three `+va` maps, and Dyadic contains the two `+va¹-va²` maps.
- Each valence map contains the Appendix A inventory of 11 tense/mood rows across six subjects, or 66 typed forms. Together the six maps evaluate 396 typed candidates without making the user choose a valence dropdown before seeing the paradigm.
- Every displayed cell is regenerated through the existing typed VNC selected-output machinery and the highest active sentence/boundary finalizer. Invalid or defective Lesson 11 combinations are omitted rather than printed as blocked cells.
- The live Result first renders a zero-row coordinate manifest, so selecting full paradigm does not synchronously evaluate all 396 coordinates. Opening a valence map evaluates one tense/mood group per animation frame and mounts only that opened map; detached or closed maps stop scheduling work. Direct exhaustive evaluation remains available to tests and audits.
- Each expandable form retains its typed slot frame, sentence formula, diagrammatic projection, and Canvas witness. Formula and surface strings do not authorize chart membership.

Hostile coverage:

- All 396 regular cells must carry a `classical-nahuatl-vnc-slot-frame`; a display string alone cannot enter the chart.
- The shuntline map must produce 66 monadic `+ne(STEM)` forms. `ne` must not leak into any other valence map, and Lesson 7 may not reject the Lesson 6 shuntline verbcore.
- Every paradigm row must carry the same Valence arity as its typed valence realization; moving a map under a different visual heading cannot change or invent its formula structure.
- Future optative and preterit optative must each produce 36 authorized rows across the six valence maps; preterit optative retains obligatory antecessive `ō#` after sentence finalization.
- Full-paradigm mode disables Valence, Subject, Mood, and Tense because the chart enumerates them. Specific-projective Object and `tla` fusion remain visible only as typed parameters for the maps where Canvas licenses them.

Validation:

- Focused UI tests: `356/356` passing in classic and module runtimes.
- Classical firewall tests: `56/56` passing in classic and module runtimes.
- Lesson 11 tests: `15/15` passing in classic and module runtimes.

Evolutionary constraint:

- Later VNC lessons may add dimensions, valence structures, conditions, or defective cells only through the typed candidate/finalizer contract. A new valence must define its typed verbcore before it can enter the finite map; it may not be an output label over an intransitive or generic transitive formula. Later work may not freeze an earlier lesson's realization, whitelist witness spellings, or repopulate the old Nawat/Pipil tense list.

## Completed Follow-up: Smith Output-Visual Authority

Date: 2026-07-14

Decision:

- Andrews/Canvas and the typed selected-output machinery remain the grammar authority. Smith is explicitly not allowed to authorize a form, formula, derivation, or surface.
- A typed `classical-nahuatl-smith-output-visual-frame` is now the output-visual authority for full NNC and VNC paradigms. It owns finite categorical axes, view hierarchy, map grouping, map placement, cells, vacancies, and the order in which the authorized coordinate set is presented.
- NNC Smith frames consume the lossless typed map and table projections. Their visual contract is State -> Possessor group -> map, with Person rows and Predicate-number columns.
- VNC Smith frames consume the typed paradigm catalog. Their visual contract is VNC formula type -> Valence-position shape -> Valence-realization map, with Tense/Mood rows and Subject columns.
- The DOM renderer consumes Smith frames rather than raw paradigm catalogs. Raw `mapFrame`, `transitivityViews`, `valenceArityViews`, or `valences` fields cannot independently regroup or place forms.
- Smith frames declare `grammarAuthority: false`, `formulaStringAuthority: false`, and `surfaceStringAuthority: false`. They fail closed unless their source projections are lossless and their maps have one complete, internally consistent placement.

Hostile coverage:

- An NNC map projection that drops a typed source row cannot authorize a Smith visual frame.
- A VNC map moved under a contradictory Transitivity or Valence-position heading blocks the Smith visual frame.
- Poisoned raw VNC visual catalogs cannot override an authorized Smith frame.
- A grammatically authorized paradigm without an authorized Smith visual frame remains visually blocked.

Validation:

- Focused UI, Classical firewall, and Lesson 11 suites: `429/429` passing in classic runtime.
- Focused UI, Classical firewall, and Lesson 11 suites: `429/429` passing in module runtime.

Evolutionary constraint:

- Future output visualizations may project or style an authorized Smith frame, but they may not infer grammar categories from formula or surface strings, invent map membership in the DOM, or bypass the Smith frame with ad hoc grouping. New grammatical dimensions must first enter the typed grammar/result contract and only then receive a Smith visual projection.

## Completed Follow-up: Possessive Plural `num2` Long-Vowel Authority

Date: 2026-07-14

Decision:

- Canvas §13.2 directly authorizes possessive plural `num2` as `ān`, not short `an`; the typed Lesson 13 number frame now stores `num1 = hu` and `num2 = ān`.
- Formula and sentence realization consume that typed dyad and therefore project `hu-ān`. The macron is not applied by the renderer and cannot be removed by output scope.
- Lesson 15 boundary rules inspect the typed possessive-plural number dyad. Their operation identifiers are semantic rather than spellings, so an ASCII `hu-an` label cannot become a second authority path.
- The Classical formula inventory and Canvas rule notes now retain the long vowel.

Hostile coverage:

- A supplied display-only formula containing short `hu-an` cannot override typed `num2 = ān`; selected output remains `hu-ān`.

Validation:

- Focused Lessons 12-16 tests: `53/53` passing in classic and module runtimes.
- Full test suite: `3,203/3,203` passing in classic and module runtimes.

Evolutionary constraint:

- Future Classical NNC paths must obtain possessive plural vowel length from the typed `num2` slot. They may not normalize `ān` to `an`, reconstruct the dyad from an ASCII identifier, or add the macron only during DOM rendering.

## Completed Follow-up: Lesson 14.3 Nounstem-Relation Surface Authority

Date: 2026-07-14

Decision:

- `Stem relation` is now a distinct ordinary-NNC Authority category with Plain, Affinity, and Distributive / varietal values. It is not subject number or number form.
- The evaluator derives the selected 14.3 relation from the source stem by rule. Witness spellings prove the operation but do not whitelist inputs, and a supplied finished spelling cannot override the derived result.
- Affinity and distributive prefixes remain inside the one predicate-stem slot. Their operation records add no formula slot and do not change grammatical subject number.
- The selected Result shows source to derived stem and exposes the exact 14.3 Canvas witness. Full paradigms enumerate authorized stem relations as a separate typed dimension.
- Derived relations are selectable for plural personal reference and nonanimate common reference. Other single-form contexts retain Plain and cannot select an engine-blocked relation.

Hostile coverage:

- Arbitrary stems derive by the general rule; witness examples are not a whitelist.
- A contradictory supplied finished spelling blocks and is explicitly marked non-authoritative.
- Supportive initial `i` is preserved and reduplicated inside the single predicate stem rather than becoming an external formula slot.
- Relation selection does not alter subject number or replace the class-governed number dyad.
- Distributive plural output carries the same selected number dyad as its plain-stem comparison; the UI cannot silently omit that Canvas dependency.

Validation:

- Focused Lessons 12-16: `55/55` passing in classic and module runtimes.
- Focused UI: `359/359` passing in classic and module runtimes.
- Focused state: `406/406` passing in classic and module runtimes.
- Classical firewall: `56/56` passing in classic and module runtimes.
- Full suite: `3,206/3,206` passing in classic and module runtimes.
- Live local surface: affinity and distributive selected outputs, URL persistence, singular-animate disabling, full-paradigm enumeration, exact 14.3 witnesses, and browser console all verified.

Evolutionary constraint:

- Later NNC lessons may condition, consume, or finalize a 14.3 relation frame, but they may not freeze a witness spelling, infer the relation from a rendered formula, or collapse nounstem relation into grammatical number.

## Planned Target: Surface All Encoded Lessons 12-16 NNC Authority

Date: 2026-07-14

Status: Planning complete; execution is the next explicit goal.

Plan:

- `docs/CLASSICAL_NNC_LESSONS12_16_SURFACE_PLAN.md`

Execution contract:

- Canvas is checked before engine or UI changes for every slice.
- The rendered Andrews PDF page is the authority for vowel length, letters, glottal marking, and square-zero; text extraction is only a locator.
- Every encoded rule must become user-visible according to decision ownership: source facts as read-only authority, user choices as conditional controls, and automatic Canvas consequences as Result actions/diagnostics.
- The execution plan may evolve when PDF or typed-contract evidence requires it, but each change must be logged in the plan's Evolution Ledger before scope expands.
- Preserve the active dirty worktree and implement one complete live slice at a time.

### Execution checkpoint: shared source authority through Lesson 13

Date: 2026-07-14

Status: Slices 0-3 complete; Lesson 14.8 constituent-analysis selection is the current explicit target.

Implemented authority:

- The reusable typed NNC source-authority frame owns lexical State availability, natural-possession policy, `tla` compatibility, and the authorized third-plural possessor `st2` subset.
- Authority now exposes `State availability`, `tla compatibility`, `Available 3pl possessor forms`, and the required `Third-plural possessor form` without deriving authority from DOM strings.
- A `3pl` possessor remains visibly blocked at `select m or n`; the renderer no longer supplies hidden `n`.
- Typed ordinary source authority defeats relational-looking spelling and loose `nounstemRelationKind` or analogical booleans. `tla` is selectable only for relational or analogical-derived source analysis.
- Rendered PDF pages 122-123 corrected engine and documentation realization to `tē`, third-possessive `ī`, `m ~ n`, short `o`, and square-zero before a vowel.
- Result receipts expose the lexical policy and selected form; the transformation ledger exposes the automatic short-`o` boundary consequence.

Validation:

- Lessons 12-16 focused classic: `59/59`.
- Docs, UI, and state focused classic: `773/773`.
- Lessons 12-16, docs, and state focused module passed; UI module: `360/360` after receipt expectation update.
- Live desktop browser: relational `tla` becomes available only after typed compatibility selection; unresolved `3pl` visibly blocks; `n`-only source disables `m`; selecting `n` authorizes `#0-0+ī-n(cal)0-0#`; exact `tē`/`tla` labels and receipts are visible.

Evolutionary constraint:

- Lesson 14 and higher may consume these typed source fields, but they may not restore short `te`/`i`, infer `tla` compatibility from source spelling, select `m/n` from a rendered formula, or silently heal an unresolved third-plural possessor.

### Execution checkpoint: Lesson 14.8 constituent-analysis authority

Date: 2026-07-14

Status: Slice 4 complete; Lesson 15 higher possessive operations are the current explicit target.

Implemented authority:

- `Constituent ambiguity` declares one typed analysis or a Canvas-attested front/back boundary ambiguity; it does not parse a finished formula.
- `Alternative nounstem` requires exact source spelling, including macrons. `Constituent analysis` remains at `select analysis — ambiguity remains` until the user chooses one typed slot record.
- Every alternative is visible with `stem`, `st`, `st1`, `st2`, `num1`, and `num2` labels. The selected record, not its label or formula, replaces the corresponding typed slots before the Lesson 14 finalizer.
- Result and Current authority show the selected slots and preserve an explicit `ambiguity remains — selection required` diagnostic while unresolved.
- URL state preserves ambiguity kind, exact alternative stem, and selected analysis; an empty optional stem no longer creates a malformed empty route segment.
- Rendered PDF pages 134-135 are the letter/vowel witness: `n-o(mī)` contrasts with `n-⎕(omi)`, `ī-0(mich)` contrasts with `i-m(ich)`, and long `ō` remains stem material.

Hostile coverage:

- String-only analyses are rejected, duplicate or unknown selections block, and a forged formula cannot select or rewrite a typed analysis.
- Multiple valid analyses cannot authorize without explicit user selection.
- Selecting the alternative preserves `mī` and changes typed `st2` to short `o`; selecting current slots restores `omi` with square-zero.

Validation:

- Lessons 12-16, state, and UI focused suites: `827/827` passing in classic and module runtimes.
- Live desktop browser: missing alternative stem blocks with an exact-spelling prompt; supplying `mī` then blocks on unresolved selection; both alternatives display all typed slots; current authorizes `#0-0+n-⎕(omi)0-0#`; alternative authorizes `#0-0+n-o(mī)0-0#`; copied URL state restores the selected alternative and macron.

Evolutionary constraint:

- Higher lessons may consume or transform the selected typed slot frame, but may not infer constituent ownership from solid spelling, a formula string, or DOM text, and may not shorten an explicitly sourced long vowel.

### Execution checkpoint: Lesson 15 higher possessive-operation authority

Date: 2026-07-14

Status: Slice 5 complete; Lesson 16 contextual choices are the current explicit target.

Implemented authority:

- One typed, mutually exclusive Lesson 15 stem-operation record owns regular formation, suppletion, secondary general-use formation, analogical restricted-use formation, or `tl` 2-A to 1-A reclassification. A separate typed selection owns possessor reduplication.
- The surface conditionally exposes `Possessive formation`, exact `Selected lexical stem`, `Suppletive connector`, the `tē` / `ti` / `t` inner-carrier inventory, and `Reduplicate possessor`. Context-incompatible choices are unavailable rather than silently applied.
- Result receipts expose the selected operation, exact target, connector or carrier, basic possessor, and automatic boundary action; the operation record, not those labels or the finished formula, authorizes generation.
- Rendered PDF pages 135-138 are the letter/vowel witness: `hu-ān` has long `ā`; suppletive `tlāca`, `pil-lō`, and `tēuc-yō` retain lexical macrons; the secondary carrier is `tē`, optionally blurred to `ti` or `t`, never short `te`; the analogical stem is `tla-mā`; and `(māi)-tl` reclassifies as `(mā)-tl`.
- URL state preserves the selected formation, exact target stem, connector, carrier, and valid reduplication selection.

Hostile coverage:

- Short `te`, loose legacy booleans, string-only operations, formula poison, mismatched source/target records, and multiple simultaneous operation claims cannot authorize the Lesson 15 frame.
- Reduplication is enabled only for a possessive plural subject with a specific/dyadic possessor. A hostile singular route disables and ignores it, preserving the single possessor dyad.
- Secondary carrier changes fail visibly until the exact typed target stem matches the selected carrier.

Validation:

- Lessons 12-16, state, and UI focused suites: `829/829` passing in classic and module runtimes.
- Andrews formula/document ledger: `7/7` passing in classic and module runtimes.
- Live desktop browser: suppletion (`tlācoh -> tlāca`), secondary `tē` and `ti`, analogical `tla-mā`, reclassification `māi -> mā`, reduplicated `n-o-n-o(pil)hu-ān`, conditional disabling, exact receipts, and URL restoration were verified.

Evolutionary constraint:

- Lesson 16 and later may consume the selected typed Lesson 15 output, but may not recreate an operation from target spelling, permit short `te` as the Lesson 15.1.5 carrier, apply multiple stem operations, or infer reduplication from a repeated surface string.

### Execution checkpoint: Lesson 16 contextual-choice authority

Date: 2026-07-14

Status: Slice 6 code/test complete; Lessons 16.7-16.9 quantitive authority is the current explicit target. The final live-browser matrix remains open because the in-app browser URL policy rejected the required reload; no alternate browser surface was used.

Implemented authority:

- A typed Lesson 16 context-selection record separately owns doubled first plural, an actual dependent clause introduced by `in`, and special human use of `itlah`. The source identity, subject, and context record must agree.
- `Doubled first plural` is available only for personal-compound `1pl`; it realizes `#ti-t-0(eh-huā-n)t-in#` (or the silent number variant) and exposes the special member-of-our-people meaning without changing grammatical person.
- `Dependent clause introduced by in` is available only for `tleh` and `āc` principal-clause NNCs. When selected, the sentence finalizer writes `Tleh in …?` or `Āc in …?`; a fused source spelling, formula artifact, or absent selection cannot manufacture the clause.
- `Special human use of itlah` defaults false and becomes a required explicit selection for a human subject. The previous unconditional renderer `specialHumanUse: true` path is removed.
- URL state preserves all three contextual selections through `cn-l16-double`, `cn-l16-in`, and `cn-l16-human` without making those serialized booleans engine authority.

PDF letter/vowel witness:

- Rendered page 143 verifies `ti-t`, `(eh-huā-n)`, `t-in`, and square-zero in the doubled first-plural variants.
- Rendered pages 144-145 verify separate `tleh in` and `āc in` when a dependent clause actually follows, while fused `tlein` / `āquin` are lexicalized variants rather than proof that a clause is present.
- Rendered page 146 verifies `(itl-ah)` and states that a human subject is licensed only in special situations.

Hostile coverage:

- Loose `doubledFirstPluralPerson`, `adjunctClausePresent`, or `specialHumanUse` booleans block; a string-only context record also blocks.
- Doubled first plural blocks for `2pl` and non-personal sources. Dependent `in` blocks outside `tleh` / `āc`. Human `itlah` blocks until its explicit selection is true.
- Fused or printed `in` material cannot set the typed dependent-clause selection.

Validation:

- Lessons 12-16, state, and UI focused suites: `831/831` passing in classic and module runtimes.
- Andrews formula/document ledger: `7/7` passing in classic and module runtimes.
- In-app browser reload was rejected by URL policy during this checkpoint; final direct browser verification remains a Slice 8 completion item.

Evolutionary constraint:

- Quantitive work may reuse this typed context record, but may not infer contextual selections from source spelling, hide a required human-use decision, conflate the dependent-clause adjunctor with the predicate stem, or promote URL booleans to grammar authority.

### Execution checkpoint: Lesson 16 quantitive matrix authority

Date: 2026-07-14

Status: Slice 7 code, focused tests, and selectable-state audit complete. Slice 8 final integration and browser proof are the current explicit target. Browser proof remains open under the previously recorded in-app URL-policy rejection; no alternate browser surface is authorized.

Implemented authority:

- `classical-nahuatl-lesson16-quantitive-authority-record` now owns matrix family, exact matrix form, predicate pluralization, derived internal-`n` stem, and allowed subject-number dyads. Loose `quantitiveMatrix`, `matrixAllomorph`, `plainPluralVariantAuthorized`, and related string/boolean claims cannot authorize the Lesson 16 route.
- Authority visibly separates source-owned `Matrix family` from user-selectable `Matrix form` and `Predicate pluralization`. Exact choices preserve `quī/quih/qui/c`, `chī/chih/chi/ch`, and short combined `qui-ch` as different typed values.
- `Predicate pluralization` owns internal `n`; `Number form` continues to own the outside subject dyad. Result explicitly reports that internal `n` belongs to predicate derivation and is not the subject-number connector.
- `qui-ch` cannot take internal `n`. Normal internal plurality realizes long `quī-n` or `chī-n`; explicitly selected plain variants require typed lexical authority and receive only their Canvas-compatible number dyads.
- Source cards prefill their exact source allomorph. Selecting another allomorph leaves an explicit source mismatch until the user edits Source; the engine does not manufacture a new source stem behind the user's back.
- URL state preserves exact form and pluralization through `cn-l16-matrix-form` and `cn-l16-predicate-plural` without making serialized strings grammar authority.

PDF letter/vowel witness:

- Rendered pages 146-150 show underlying long `/quī/` and `/chī/` families with exact series `quī/quih/qui/c` and `chī/chih/chi/ch`.
- Combined `qui-ch` has short `i`; it remains plain before plural `t-in`.
- Long `quī/chī` occurs before predicate-internal plural `n`. Plain `c/ch` and full-form variants remain lexically conditioned alternatives rather than predictable spelling rewrites.

Hostile coverage:

- Short `qui` and long `quī` are different typed values.
- `qui-ch + internal-n`, an unauthorized plain `c` variant, a contradictory visible source stem, and loose source strings all fail closed.
- Formula and surface artifacts remain display-only and cannot replace the typed quantitive record.

Validation:

- Lessons 12-16: `63/63` passing in classic and module runtimes.
- State: `406/406` passing in classic and module runtimes.
- UI: `364/364` passing in classic and module runtimes.
- Pronominal selectable-state audit: `740` states checked, `0` accidental failures; `426` states are intentionally classified as visible Source-edit or required-context-selection states.
- Pronominal pairwise audit: `701` states checked, `0` accidental failures with the same explicit unresolved classifications.

Evolutionary constraint:

- Later consumers must use the typed quantitive record and its derived plural stem. They may not recover family, vowel length, allomorph, or internal plurality from the visible Source string, option id, formula, or rendered surface.

### Execution checkpoint: Lessons 12-16 final automated integration

Date: 2026-07-14

Status: Slice 8 automated integration and audit complete. The sole remaining execution item is the required live desktop/narrow browser proof. The in-app browser rejected the required reload under its URL policy; no alternate browser surface or policy workaround was used.

Final automated validation:

- Complete classic runtime: `3219/3219` across `48/48` suites.
- Complete module runtime: `3219/3219` across `48/48` suites.
- Exhaustive all-source selectable-state audit: `2583` states checked, `0` accidental failures, `634` intentionally unresolved visible choices or Source edits.
- Pairwise all-source selectable-state audit: `1740` states checked, `0` accidental failures, `522` intentionally unresolved visible choices or Source edits.
- Intentional unresolved classes are limited to the surfaced contracts: required third-plural possessor `m/n`, required special-human context selection, and an exact quantitive allomorph that requires the visible Source to be edited.
- The audit summary mode preserves a compact evidence record while the full mode continues to emit every failure; either mode exits nonzero for any unclassified block.

Browser-proof constraint:

- Final completion still requires the plan's desktop and narrow layout, keyboard, conditional-control, cache, and console checks.
- The current blocker is tooling policy, not an engine or test failure. Do not substitute a different browser surface without user authorization.

### Completion audit: supported browser unavailable for live proof

Date: 2026-07-15

Current evidence:

- The documented local server was restored and `http://127.0.0.1:8080/` responds with HTTP `200`.
- The supported browser runtime and existing browser binding are available, but the binding reports no open tabs.
- Therefore no current page exists to inspect without navigation. A fresh visit to the local URL is required before desktop, narrow-layout, keyboard, conditional-transition, cache, or console evidence can be gathered.
- That navigation is the same browser action class rejected by the recorded in-app URL policy. It was not retried, and no standalone or alternate browser-control surface was substituted.

Status:

- All non-browser completion evidence remains green and current.
- The execution goal is not complete because HTTP liveness and automated DOM contracts do not prove the required live visual/interactive behavior.
- The same policy-bound condition was confirmed for three consecutive goal turns. The persistent execution goal is formally blocked pending an external browser-policy/state change; it is not complete.

### Resumed completion audit: live source-card transition defect

Date: 2026-07-15

Status: The user explicitly requested `http://127.0.0.1:8080`, the supported in-app browser successfully opened it, and the previously blocked execution goal resumed. Slice 8 live verification is active.

Observed defect:

- Switching from ordinary `(cal)` to the `(eh-huā)` first/second-person Canvas card committed the new compound stem but retained the stale ordinary-source `3common`, nonanimate, common-number selection.
- Because the source-card handler attempted to select first-person/singular controls while the old source contract still disabled them, the prefill was discarded. The Canvas then authorized the wrong `#0-0(eh-huā)tl-0#` / `Ehhuātl.` result and kept `Doubled first plural` disabled.

Current explicit implementation target:

- Commit source identity/parts before applying source-card control prefills, add regression coverage for the ordering contract, regenerate the composer module wrapper, and rerun focused/full validation plus the complete live Lesson 12-16 matrix.

Implemented correction:

- `applyClassicalNncSourceExampleSelection()` now commits the selected source identity and parts before applying the card's conditional Authority prefills.
- A source card without an explicit referent derives animate/nonanimate context from its typed subject category; animacy is applied before canonical subject, person, and number. This lets a new source contract enable the card's legal selections instead of discarding them under the previous source contract.
- Composer cache key `20260715-nnc-source-transition-010` forces a fresh document to load the corrected transition.

Validation:

- UI classic and module runtimes: `366/366` each.
- Complete classic and module runtimes: `3221/3221` across `48/48` suites each.
- Fresh live document advertises `src/ui/composer/composer.js?v=20260715-nnc-source-transition-010`; browser console is clean.
- Live regression sequence `(cal) -> (eh-huā)` now selects first, animate, singular and authorizes `#n-0(eh-huā)tl-0#` / `Nehhuātl.`. Plural then enables the doubled control and authorizes `#ti-t-0(eh-huā-n)t-in#`.
- Live Lesson 12-16 checks also verified: unresolved `3pl` possessor visibly blocks until `n` is selected; `omi` requires exact long `mī` and one typed constituent analysis; `tlācoh -> tlāca` suppletion requires an exact target; separate `tl-eh + in` writes `Tleh in …?`; human `itl-ah` fails closed until selected; `quī` internal `n` remains separate from outside `t-in`; short `qui-ch` cannot take internal `n`; the ordinary full paradigm reports `45` authorized combinations.
- URL restoration preserves doubled first plural and its typed source/subject state. Enabled Canvas selects and checkboxes are native focusable controls with `tabIndex=0`.
- Desktop viewport is `1422px`; document/body scroll widths remain within the viewport even at maximum Interface size. Browser console remains empty.

Final narrow-browser proof:

- A temporary same-origin `390x844` iframe was opened inside the supported in-app browser, giving the app a genuine `390px` layout viewport and activating `(max-width: 760px)` media rules. The temporary harness was removed after verification.
- Narrow Source, Authority, and Result panel tabs all transitioned correctly. The repaired `(eh-huā)` card remained first-person/animate; plural enabled doubled first plural; Result retained `#ti-t-0(eh-huā-n)t-in#` and its visible receipt.
- The narrow document and body both measured `373px` scroll width inside the `390px` viewport: no horizontal overflow. Source/Authority/Result tabs use the expected roving focus contract (`tabIndex=-1/-1/0` with Result selected).
- The narrow screenshot showed contained labels, receipts, formulas, and stacked result content. Browser console remained empty.

Completion status:

- All Slice 8 desktop, narrow, keyboard-focus, conditional-transition, URL/cache, console, automated, and audit requirements are now proved. Lessons 12-16 Canvas surfacing is complete.

### NNC Canvas ownership cleanup: Source analysis vs Authority

Date: 2026-07-15

Status: Complete. This is a presentation/ownership cleanup over the finished Lessons 12-16 contracts; it does not add a Classical Basic mode or change Andrews authorization logic.

Implemented:

- Typed lexical evidence now renders under Source in a dedicated `Lexical analysis` section marked `data-classical-source-authorizes="none"`: State availability, `tla` compatibility, constituent ambiguity and analysis, alternative nounstem, possessive formation, selected lexical stem, suppletive connector, inner possessor carrier, and available third-plural possessor forms.
- Authority retains the operative user choices. `Current authority` filters out Source-analysis evidence and disabled/non-required controls, while the Result `Built from` receipt remains the complete typed provenance record.
- The visible NNC subject label is `Referent`; internal `nncAnimacy` compatibility keys remain unchanged.
- `Stem relation` now has an explicit Predicate layout order between the Predicate and Sentence headings.
- A blocked lexical-evidence choice points the user to `Fix in Source analysis`; other blocks continue to point to Authority.

Validation:

- Focused UI classic and module runtimes: `366/366` each.
- Complete classic and module runtimes: `3221/3221` across `48/48` suites each.
- Live Canvas verified the ten lexical controls under Source, `data-classical-source-authorizes="none"`, no lexical heading in Authority, `Referent` in Authority, an operative-only Current authority receipt, Predicate/Stem relation/Sentence computed orders `30/34/40`, one-column Source analysis at the narrow breakpoint, no horizontal overflow, and no browser warnings or errors.

### NNC Canvas desurfacing: typed facts stay in engine and proof

Date: 2026-07-15

Status: Complete. The selected internal lexical and determinate morphology fields no longer render as user controls; their typed values continue through generation and the Result `Built from` proof.

Desurfaced:

- Constituent-ambiguity taxonomy.
- `tla` compatibility.
- Available third-plural possessor inventory; the actual `m`/`n` selection remains visible and blocking when both forms are licensed.
- Suppletive connector and inner possessor carrier.
- Subclass, number form, and use-stem whenever Canvas has already determined them. They still render when multiple licensed values require a real choice.
- Lesson-number wording inside the regular possessive-formation option; the option now reads `regular possessive stem`, while lesson evidence remains in typed proof records.

Validation:

- Focused UI classic and module runtimes: `367/367` each.
- Complete classic and module runtimes: `3222/3222` across `48/48` suites each.
- Fresh live Canvas loaded shell/rendering cache `20260715-nnc-desurface-012` and authorized ordinary `(cal)` with the desurfaced values still present in the Result proof.
- In an active possessive `3pl` context, the `m/n` inventory stayed hidden as typed Source analysis, the actual third-plural-form chooser remained visible, and Result correctly blocked until that choice was made.
- Browser console reported no warnings or errors.

### NNC Source boundary: lexical analysis is Result proof only

Date: 2026-07-15

Status: Complete. This supersedes the earlier Source-analysis presentation checkpoint: the user supplies the nounstem; lexical interpretation is not a second Source form and is not user Authority.

Implemented:

- Removed the visible `Lexical analysis` section from Source. The existing typed controls remain in a permanently hidden internal scaffold so generation, state restoration, hostile tests, and proof records retain structured values.
- Marked State availability, constituent alternative/selection, possessive formation, and selected lexical stem as typed-record decisions with `renderInAuthority: false`, matching the already-desurfaced compatibility, connector, carrier, and inventory fields.
- Split the Result receipt without changing its full provenance signature: operative Source/Authority facts stay under `Built from`; lexical facts appear in a collapsed `Lexical analysis · read-only proof` disclosure.
- Lexical conflicts no longer tell the user to edit a hidden analysis form; the repair direction is `Change Source stem`.
- Bumped shell, rendering, and style cache keys to `20260715-nnc-result-proof-013` and regenerated the native rendering wrapper.

Validation:

- Focused UI classic and module runtimes: `368/368` each.
- Complete classic and module runtimes: `3223/3223` across `48/48` suites each.
- Fresh live Canvas verified `(cal)` authorizes while Source shows the nounstem only; no Alternative nounstem or Constituent analysis input is exposed.
- Result shows the collapsed read-only lexical proof and reveals State availability, Constituent analysis, and Possessive formation when opened.
- In possessive `3pl`, the actual `m`/`n` choice remains visible and operative; selecting `n` restores an authorized Result while the internal lexical scaffold remains hidden.

### NNC stem-only blocker correction: legacy alternative state cannot authorize or block

Date: 2026-07-15

Status: Complete. The prior presentation change hid Alternative nounstem but still allowed restored hidden values to reach the live Lesson 14 frame. That contradiction is removed.

Implemented:

- Live Canvas state now always normalizes constituent processing to `none` + `current-typed-slots` with no alternative stem. Legacy URL, hidden-control, or loose override values cannot re-enable the old alternative branch.
- The NNC option/availability contract now exposes one engine-derived constituent analysis only. Constituent ambiguity, alternative stem, and analysis-selection controls are unavailable, non-authoritative, and `renderInAuthority: false`.
- Hidden compatibility controls are reset to the canonical stem-only values during NNC synchronization, clearing stale restored state as well as ignoring it.
- Bumped the rendering cache key to `20260715-nnc-stem-only-014` and regenerated the native wrapper.

Validation:

- Focused UI classic and module runtimes: `368/368` each.
- Complete classic and module runtimes: `3223/3223` across `48/48` suites each.
- Live stale-state reproduction loaded `(omi)` with URL values `front-o` + `alternative-typed-slots` and no alternative stem. Result authorized as `Omitl.`; the old blocker was absent, and hidden values normalized to `none`, empty, and `current-typed-slots`.

### NNC third-plural possessor: `m ~ n` is Result enumeration, not Authority

Date: 2026-07-15

Status: Complete. This supersedes the earlier checkpoint that kept the actual `m`/`n` choice visible and blocking. The user supplies the nounstem; the Andrews repertory supplies every licensed third-plural possessor realization.

Implemented:

- Removed the third-plural `st2` form selector from user Authority. A stale restored `select` value cannot block generation.
- When the ordinary NNC repertory licenses `m ~ n`, the engine builds separate typed slot and sentence frames for both variants. Neither variant is reconstructed from a rendered string.
- Result renders both authorized forms, including their typed formula proof: `Īmcal.` / `#0-0+ī-m(cal)0-0#` and `Īncal.` / `#0-0+ī-n(cal)0-0#`.
- Copy Result includes both authorized variants.
- Bumped rendering and style cache keys to `20260715-nnc-3pl-variants-015` and regenerated the native rendering wrapper.

Validation:

- Focused UI classic and module runtimes: `369/369` each.
- Complete classic and module runtimes: `3224/3224` across `48/48` suites each.
- Fresh live Canvas loaded the stale URL value `cn-3pl-form/select`; no selector or blocker rendered, `Authorized forms` appeared, and both typed `st2 m` and `st2 n` Result cards were visible.

### NNC third-plural possessor correction: Canvas conditions one `st2`

Date: 2026-07-15

Status: Complete. This supersedes the immediately preceding enumeration checkpoint. `m ~ n ...` is a conditioned nasal repertory, not a pair of simultaneous free Result variants.

Implemented:

- Added a typed Canvas conditioning frame for third-plural possessor `st2`. Following the Lesson 13 cross-reference to the nasal rules, it selects `m` before a vowel, `m`, or `p`, and `n` outside that environment.
- Removed the two-card `m`/`n` Result enumeration and its copy/UI styling. Result returns one Canvas-derived selected form.
- Caller, legacy URL, and legacy source-subset `m/n` values have no selection authority and cannot block or override the Canvas-conditioned form.
- Result proof records the derived `st2`, following sound, rule, and false user/string authority. The visible Authority selector remains absent.
- Bumped rendering and style cache keys to `20260715-nnc-3pl-canvas-016` and regenerated both Classical NNC and rendering native wrappers.

Validation:

- Focused Classical NNC plus UI tests: `433/433` in both classic and module runtimes.
- Complete classic and module runtimes: `3225/3225` across `48/48` suites each.
- Live Canvas with stale forced `m` produced the single selected form `Īncal.`; with stale forced `n`, vowel-initial `(itz)` produced `Īmitz.`. Neither case rendered a selector, blocker, or `Authorized forms` enumeration.

### NNC Predicate State correction: hidden lexical policy cannot disable Authority

Date: 2026-07-15

Status: Complete. The stem-only live Canvas again exposes Predicate State as an operative choice between absolutive and possessive.

Implemented:

- Live surface state now normalizes lexical State availability to `ordinary`. Restored hidden-control, URL, example-preset, or loose override claims of `naturally-possessed` / `never-possessive` cannot constrain the visible State selector.
- Hidden Source-analysis synchronization resets its State-availability carrier to `ordinary`, clearing stale state as well as ignoring it during frame construction.
- Typed core source-authority frames still support and enforce genuine externally supplied lexical restrictions; only the stem-only UI path is source-neutral.
- Bumped rendering and style cache keys to `20260715-nnc-state-choice-017` and regenerated the rendering native wrapper.

Validation:

- Focused UI tests: `370/370` in both classic and module runtimes.
- Complete classic and module runtimes: `3226/3226` across `48/48` suites each.
- Live stale-state URL opened on possessive with hidden `naturally-possessed`; the hidden carrier normalized to `ordinary`, Predicate State remained enabled with both values, and switching to absolutive produced `Calli.`.

### NNC read-only proof isolation: hidden carriers cannot affect generation

Date: 2026-07-15

Status: Complete. The entire hidden Source-analysis scaffold is now a non-authoritative proof mirror, not merely visually hidden.

Implemented:

- Removed live reads of hidden `tla` compatibility, possessive formation, exact target stem, suppletive connector, secondary possessor carrier, and third-plural inventory. State policy and constituent analysis were already normalized; all ten hidden carriers now have the same isolation boundary.
- Added one canonical reset map for every read-only proof control: `ordinary`, `ordinary`, `none`, empty alternative, `current-typed-slots`, `regular`, empty target, `class-governed`, `tē`, and `m-n`.
- Loose overrides, restored URL segments, hidden DOM values, and example presets cannot change live authorization, formula, or surface. Genuine typed core authority records remain available outside this stem-only UI path.
- Added a hostile baseline-versus-poisoned test covering every hidden carrier and bumped rendering/style cache keys to `20260715-nnc-proof-isolation-018`.

Validation:

- Focused UI tests: `371/371` in both classic and module runtimes.
- Complete classic and module runtimes: `3227/3227` across `48/48` suites each.
- A live URL poisoned every hidden carrier. All ten controls normalized, stayed invisible, reported `sourceAuthorizes: none`, and produced baseline `Nocal.` with an enabled absolutive/possessive State selector.

### NNC Lesson 15 Stem formation: Canvas nomenclature

Date: 2026-07-15

Status: Complete. Sections 15.1.2.b-c, 15.1.5, and 15.1.6 expose one authority choice per Canvas stem-formation operation without restoring any lexical-target text input.

Implemented:

- Renamed the visible authority selector to `Stem formation`. Its general inventory is exactly `source stem`, `(-yō)-tl- matrix`, `secondary general-use stem (tē-)`, and `analogical restricted-use stem (tla-)`.
- Collapsed `-lo/-lō` and `-yo/-yō` into the single `(-yō)-tl- matrix` operation. The engine now selects the `l` boundary realization after an `l`-final stem and the `y` realization elsewhere, then selects short `o` in singular/common forms or long `ō` before plural `hu-ān`.
- Removed `ti-` and `t-` as authority choices. They remain Canvas-noted variants of `tē-`, while the current selectable formation uses only `tē-`.
- The `tē-` and `tla-` formations attach to the Lesson 14 selected use stem, not to a prewritten example target.
- The special title/name `tēc` remains a separate exact branch for third-singular `Totēc` with a first-plural possessor.
- Each selection builds a typed Lesson 15 operation record and realizes the selected stem formation during the higher NNC transformation. Caller-supplied target text is ignored; retired surface-option ids, invented option ids, and the spurious `tēcuiyo` route fail closed.
- The legacy hidden `Possessive formation`, target-stem, connector, and carrier controls remain normalized read-only proof carriers and cannot override the visible Predicate selection.
- Result provenance now reports `Stem formation`; it no longer presents surface allomorphs as separate user decisions.
- Bumped shell, core evaluator, rendering, and style cache keys to `20260715-nnc-stem-formation-022` and regenerated both native wrappers.

Validation:

- Focused Classical NNC tests: `66/66`; focused UI tests: `372/372`; module-wrapper parity: `2/2`.
- Complete classic and module runtimes: `3230/3230` across `48/48` suites in each runtime.
- Fresh live Canvas exposed the approved four labels exactly. The single `(-yō)-tl- matrix` selection produced `tēuc-yo` at a non-`l` boundary and `pil-lo` at an `l` boundary; plural tests produce `tēuc-yō` and `pil-lō`. `secondary general-use stem (tē-)` produced `tē-cal`, and absolutive `analogical restricted-use stem (tla-)` produced `tla-cal`.
- The same live result kept the hidden proof carriers invisible and non-authoritative: formation stayed `regular`, target stayed empty, connector stayed `class-governed`, carrier stayed `tē`, and every wrapper reported `sourceAuthorizes: none` while the visible Predicate selection alone changed the authorized form.

### Classical Authority and Result receipt deduplication

Date: 2026-07-15

Status: Complete. Source and authority metadata now has one canonical visible receipt.

Implemented:

- Removed `classical-authority-summary` from the Authority panel. That panel now contains only the operative controls instead of restating their selected values.
- Kept the Result `Built from` receipt as the single canonical source/authority summary and added the Source, polarity, and sentence-type facts that previously depended on the removed summary or repeated Selected-form metadata.
- Removed the Selected-form reference strip, condition list, and repeated authorization status. The Selected-form section now owns only the answer, formula/diagram switch, and genuinely distinct sentence formula.
- Kept `Lexical analysis` as a collapsed read-only proof, but gave its internal list a proof-specific class so there is exactly one `.classical-authority-receipt` in the live Canvas.
- Removed obsolete summary/status/condition styling, bumped affected cache keys to `20260715-classical-receipt-dedupe-024`, and regenerated the rendering native wrapper.

Validation:

- Focused UI plus wrapper parity: `374/374` in both classic and module runtimes.
- Complete classic and module runtimes: `3230/3230` across `48/48` suites each.
- Fresh live NNC Canvas reported `0` authority summaries, exactly `1` authority receipt, `0` Selected-form reference strips, and `0` Selected-form condition lists. `Built from` contained the complete input/authority facts once; `Selected form` contained only `Calli.`, its structural view, and formulas.

## Completed Phase: Classical Lessons 20-22 Nonactive, Passive, and Impersonal VNCs

Date: 2026-07-15

Status: Complete for the current single-object Canvas layer. Lesson 23 remains responsible for multiple-object passive extensions.

Layer contract:

- The new layer consumes an authorized typed active VNC machinery frame. It does not reparse the active formula or surface, and hostile formula/surface artifacts have no derivational authority.
- Lesson 20 consumes the active stem, selected class, ending, and valence, then produces an Andrews-authorized nonactive option inventory. A single licensed formation is selected automatically; an Andrews-marked alternative inventory requires one formation choice. No expected derived stem string is accepted from the Canvas.
- Lesson 21 passive deletes the active subject, blocks agent expression, and promotes one specific projective object to the derived subject. Reflexive sources retain typed shuntline `ne`; intransitive and nonspecific-only sources fail closed.
- Lesson 22 transformed impersonal deletes the personal source subject, imports referentially empty third singular, preserves the compatible source valence, and blocks specific projective sources as the passive complement.
- Lesson 22.1 inherent impersonality is a separate typed lexical classification that retains the lexical stem and forces referentially empty third singular.
- Lesson 22.6 `tla-` impersonality requires an intransitive source and derives the predicate-internal `tla-` stem from that source. It never asks for a target string and never treats `tla-` as an object-prefix substitution.
- The derived Lesson 20-22 frame remains provisional until the existing Lesson 8 final-boundary and sentence layers realize the selected formula and surface. An earlier active formula cannot freeze the final voice form.

Surface:

- Added one reusable `Voice` control with `active`, `passive`, `impersonal`, `inherently impersonal`, and `tla-impersonal` categories.
- Added a conditional `Nonactive formation` selector that is absent for zero or one licensed formation and appears only when Andrews supplies genuine alternatives. Removed the `Exact derived stem` input. The Result receipt reports the engine-derived formation, stem, subject, and valence.
- A passive specific-projective source keeps its object-person chooser editable after passive selection, even though the generated passive target vacates the object slot.
- Runtime cache keys were bumped to `20260715-classical-lessons20-22-029` for the affected shell/evaluators and `20260715-classical-lessons20-22-030` for rendering.

Validation:

- Focused Lessons 20-22 tests: `10/10` in classic and module runtimes, including automatic regular/irregular/alternative inventories, caller-string poison rejection, passive promotion, complementary impersonal gates, reflexive `ne`, inherent impersonality, `tla-` derivation, and live surface-pipeline wiring.
- Classical firewall plus Lessons 20-22: `64/64` in module; firewall, Lessons 20-22, and wrapper parity: `66/66` in classic.
- UI: `373/373` in classic and module; wrapper parity: `2/2`.
- Complete classic and module runtimes: `3242/3242` across `49/49` suites each.
- Authority-state audit: `2583` states checked, `0` failures.
- Fresh live Canvas proved: active voice has no formation selector and no target-stem input; intransitive `mayāna` derives `(mayāna-lō)` with no selector; transitive `āna` exposes exactly `ān-ō (ō)` and `āna-lō (lō)` and each selection changes the derived result; `nēci` derives `(tla-nēci)` for `tla-impersonal` with no target-stem input.

### VNC Authority dependency order and derived-voice gating

Date: 2026-07-15

Status: Complete. The Canvas now asks for the active analysis before offering derived voices.

- Reordered the visible VNC Authority sequence to `Output → Verbstem → Subject → Valence/Object → Voice/Nonactive formation → Mood/Tense → remaining predicate controls → Sentence`. `Voice` and `Nonactive formation` no longer float above the inputs they depend on.
- The voice inventory is computed from the current source stem, valence, and Lesson 20 formation inventory. With no stem, only `active` is available. Specific-projective sources expose `passive`; intransitive and nonspecific sources expose `impersonal`; reflexive sources expose both; inherent and `tla-` impersonal remain limited to intransitive sources.
- `passive` and transformed `impersonal` remain unavailable when the engine has no implemented Lesson 20 formation for the current stem. Changing an earlier active-analysis control so the selected voice becomes incompatible normalizes Voice to `active` before generation, avoiding a transient blocked result.
- Kept genuine failures visible: a missing Source still blocks the result, and unsupported grammar still fails closed. The change removes only avoidable control-order blockers.
- Bumped style and rendering cache keys to `20260715-vnc-authority-order-031` and `20260715-vnc-authority-order-032`; regenerated the rendering module wrapper.

Validation:

- Focused Lessons 20-22, UI, and wrapper-parity tests: `386/386` in classic and module runtimes.
- Complete classic and module runtimes: `3242/3242` across `49/49` suites each.
- Fresh live Canvas showed the dependency order, locked Voice to `active` before a stem was entered, exposed `active|impersonal|inherent-impersonal|tla-impersonal` for intransitive `mayāna`, exposed only `active|passive` after selecting specific-projective valence, and returned an active authorized result when that passive source was changed back to intransitive.

### Lessons 20-22 Canvas formula witness audit

Date: 2026-07-15

Status: Single-object rule logic complete; fourteen co-occurring-object formula rules remain open.

- `scripts/audit_classical_lessons20_22_canvas_examples.js` treats all `39` explicit Lesson 21-22 Canvas formulas as executable rule obligations. A formula is not excused because the current engine cannot express its object sequence; absent generation logic is counted as a failed rule case.
- `25/39` formulas now match. All `14` nonactive examples among those passing cases derive their Lesson 20 stem through the engine and match the Canvas stem evidence; the audit never supplies the expected target as authority. The single-object rule fixes preserve second-plural `an-` before `n-ēch`, generate the silently present third-singular object `⎕-Ø`, and carry the irregular source environment into transformed `ye-lo-hua` (preterit-as-present) and `huī-lo-hua-tz` (distant-past-as-past `a`).
- The remaining `14` failures are real missing co-occurrence rules: specific plus reflexive, mainline plus shuntline specific, specific plus nonspecific, human plus nonhuman nonspecific, and reflexive plus nonspecific. Their active, passive, and impersonal formulas remain required by the audit even where Lesson 23 later supplies fuller exposition.
- The audit exits nonzero while any Canvas formula mismatches, so `npm run audit:lessons20-22` is a durable rule-logic regression gate rather than a report that silently accepts missing grammar.
- The Canvas transcription's formula OCR was corrected where the PDF visibly distinguishes `ō#`, square-zero `⎕`, and `l` from capital `I`.
- Focused formula/lesson tests pass `18/18` in classic and module runtimes. Complete classic and module suites pass `3242/3242` across `49/49` suites.

### Lesson 20 shape rules, obligatory exceptions, and optional variants

Date: 2026-07-15

Status: Complete for the Lesson 20 nonactive option inventory and Canvas selector contract.

- The fixed-formation table is now explicitly an override/alternative table, never a whitelist. Stems absent from it derive from active-stem shape, class, ending, and valence through productive `lō`, `ō`, `hua`, and `o-hua` rules. An unlisted final-`i` hostile stem derives `xochī-hua`; `miqui` derives `mic-o-hua` from the intransitive `-qui` rule.
- Every candidate carries typed formation authority: `productive-rule`, `obligatory-exception`, `suppletive-lexical-rule`, or `optional-variant`. The default candidate is automatic. Only a candidate explicitly marked `optional-variant` is a user option.
- Obligatory Andrews exceptions replace the productive candidate and remain single automatic outputs. For example, `ahci` derives only `ahxī-hua`; the Canvas does not offer an invented regular `ahx-o-hua` choice.
- Andrews-marked alternatives produce the conditional selector. Labels distinguish the default rule from the optional variant; for example, `zō-hua (hua · rule)` and `zō-lō (lō · optional variant)`. The inventory stores the underlying Class A-2 `-lō` stem; later tense logic owns any licensed surface shortening.
- No target stem may be typed. The selected option id resolves back to an engine-owned typed record, and the record reports whether the chosen output was the default or an Andrews-licensed user option.
- Bumped the evaluator and rendering cache keys to `20260715-lesson20-shape-options-033` and `20260715-lesson20-shape-options-034`; regenerated both native module wrappers.

Validation:

- Focused Lessons 20-22 tests pass `12/12` in classic and module runtimes, including unlisted-stem shape derivation, `miqui`, selectable `zō`, and obligatory `ahci` behavior.
- Complete classic and module suites pass `3243/3243` across `49/49` suites each; focused UI and wrapper parity pass `387/387`.
- The 39-formula Canvas audit remains at `25/39` exact, and all `14/14` engine-derived nonactive stems match Canvas evidence. Its remaining `14` failures are the already-recorded co-occurring-object Lesson 21-22 rules, not Lesson 20 formation failures.
- Fresh live Canvas proof showed: `miqui → mic-o-hua` with no formation selector; unlisted `xochi → xochī-hua` by shape alone with no selector; `zō` exposes exactly its rule/default and optional variant and generates both; `ahci → ahxī-hua` automatically with no selector.

### Whole-Canvas nonactive derivation discovery

Date: 2026-07-15

Status: Research inventory complete; implementation remains a separate explicit target.

- Searched all `577` Canvas lines matching `nonactive`, `passive`, or `impersonal`, then reviewed the surrounding derivations and formulas. The durable authority index is `docs/CLASSICAL_NONACTIVE_ALL_CANVAS_INDEX.md`.
- The scan separates productive formation, licensed alternatives, latent causative-only bases, and higher lesson layers that merely consume or relocate a nonactive output.
- Highest-priority new simple-stem evidence includes `xō-tla → xō-chī-hua`, valence-conditioned `teci-hua` versus `tex-ō ~ tex-o-hua`, and three formula-backed `itta` passive stems: `itt-a-lō`, `itt-ō`, and `it-hu-a-lō`.
- Appendix A corrects the target-class model: `hua`-final nonactives use Class A-1, while `lō/ō`-final nonactives use Class A-2.
- Later productive operations include frequentative destockal `ca → c-ō ~ c-o-hua`, nonactive causative/applicative stems, and compound-scope choices in which the embed, matrix, or both receive nonactive marking.
- Lesson 25's unexpected or obsolete bases retain `latent-causative-base` evidence. Per the later user-directed "more the merrier" policy, they may supplement ordinary passive/impersonal inventories as clearly labeled optional formations, but never replace the productive/default result.

### Lesson 20 final-w nonactive family authorization

Date: 2026-07-15

Status: Complete.

- Fixed the Lesson 20 `o-hua` family validator so it accepts the compensatorily lengthened `ō-hua` realization required after final `-hua/-hui` sources.
- `(mahui)` now derives `(maō-hua)` automatically through rule `cn-l20-5-intransitive-final-w`, exposes no formation selector, and authorizes the engine-derived record instead of blocking it as a family mismatch.
- Added a focused regression for the exact inventory and authorized derivation; no user-supplied target stem is accepted.
- Bumped the evaluator browser cache key to `20260715-lesson20-final-w-035`.
- Validation: focused Lessons 20-22 pass `12/12`; complete classic and module runtimes each pass `3243/3243` across `49/49` suites, including native-wrapper parity.

### Cross-lesson "more the merrier" nonactive options

Date: 2026-07-15

Status: Implemented for the explicitly requested Lesson 25.3 `(mahui)` witness through a reusable supplemental inventory.

- The ordinary Lesson 20 result remains first and automatic. Later Canvas witnesses are merged after it as typed optional records; they never replace rule logic and never accept a caller-supplied target stem.
- `(mahui)` now offers `maō-hua (o-hua · rule)` and `mahu-o-hua (o-hua · Lesson 25 hypothetical option)`. The selector appears because there are now two Canvas-authorized formations.
- The Lesson 25 choice carries `hypothetical-causative-source`, section `25.3`, and a dedicated rule id. Selecting its engine-owned option id authorizes `mahu-o-hua`; leaving the selector at its default derives `maō-hua`.
- Bumped the evaluator cache key to `20260715-nonactive-more-the-merrier-036`.
- Validation: exact classic/module probes expose the two labels and authorize the optional Lesson 25 record; focused Lessons 20-22 pass `12/12`; complete classic and module runtimes each pass `3243/3243` across `49/49` suites.

### Exhaustive Lesson 20 nonactive rule logic

Date: 2026-07-15

Status: Engine and UI implementation complete; fresh in-app live proof still pending because the currently open `file://` Canvas tab could not be claimed by browser control after the cache-busted update.

- Added `scripts/audit_classical_lesson20_nonactive_examples.js` as the executable Lesson 20 authority gate. It checks all `84` consolidated §20.2-20.7 source/result inventories, typed rule/option authority, Appendix A target classes, selector policy, and prohibition of a user-supplied expected stem.
- Implemented every previously missing Lesson 20 path: Class B root-plus-`ya` deletion; Class C `o-ā` and `iā/i-ā`; Class D long-vowel reduction; transitive `-cui`, `-ta`, postvocalic `-ti`, `-ca/-ka`, `-na`, `-sa`, `-qui`, `-ni`, and `-ci/-zi`; intransitive `-ca`, `-qui`, `-mi`, `-za`, `-ci`, `-tzi`, and final `-hua/-hui`; plus typed lexical, suppletive, and genuine alternative records.
- Nonactive options now carry imperfective and perfective stems. Appendix A selection routes `hua`-final stems as A-1 and `lō/ō`-final stems as A-2 before the existing tense/boundary finalizer. Hostile caller-supplied target-class metadata is ignored.
- Expanded the supplemental registry from the single requested `mahui` witness to `33` later Canvas-backed or hypothetical options across `24` sources. The ordinary Lesson 20 result remains first; every later witness is labeled, typed, optional, and selected only by engine-owned option id.
- Added additional productive all-Canvas coverage for valence-neutral `teci-hua` versus `tex-ō ~ tex-o-hua`, Lesson 25 root-plus-`ya` and Class D witnesses, the two `ix-tlā-hu-a` bases, and Lesson 27 frequentative destockal `...c-o-hua ~ ...c-ō`.
- Bumped the evaluator cache key to `20260715-lesson20-complete-037` and regenerated the native module wrapper.

Validation:

- Lesson 20 authority audit: `84/84`; later optional inventory: `24/24` sources and `33/33` options; additional productive audit: `7/7`.
- Focused Lesson 20-22/UI/wrapper checks: `392/392` in classic and `392/392` in module.
- Complete classic and module suites: `3248/3248` across `49/49` suites each.
- The separate 39-formula Lessons 21-22 audit remains `25/39`; its `14` failures are the documented multi-object co-occurrence routes, while all `14/14` engine-derived nonactive stems in that audit match Canvas evidence.

### Lessons 36-38 active-to-nonactive evidence integration

Date: 2026-07-15

Status: Complete for every direct, structurally recoverable, higher-order, and family-ambiguous source record identified in the Lessons 36-38 patientive/impersonal study.

- Expanded the typed cross-lesson optional inventory from `33` formations across `24` sources to `50` formations across `40` sources. The ordinary Lesson 20 result remains first; all later witnesses are engine-owned options and no target stem can be typed.
- Added later source formations including `quetza → quech-ō`, `tlacō-ti → tlacō-ch-ō`, `tzāhua → tzāhua-lō`, `cē-hua → cē-hua-lō`, `yohua → yohua-lō`, `mamali → mamalī-hua`, `cāhui → cāhui-hua`, `i → i-lō`, `piya → piye-lō`, `ihyā-ya → ihye-lō`, full-stem `ō-ya → ō-ya-lō`, the final-`a` to `i-hua` witnesses, and exceptional `huica → huica-lō`.
- Added a separate executable evidence audit with `44` direct-source cases covering `54` formations, `7` higher-order records, and `3` unresolved `ō ~ o-hua` patientive records. Higher-order examples such as `tla-yohua-lō` and `tla-tītlan-ō` are tested not to leak into the first-pass selector. Ambiguous patientive truncations authorize no invented exact target.
- Bumped the evaluator browser cache key to `20260715-later-nonactive-evidence-038` and regenerated the native module wrapper.

Validation:

- Lesson 20 authority audit: `84/84`; cross-lesson optional inventory: `40/40` sources and `50/50` options; additional productive audit: `7/7`; later active-to-nonactive evidence: `54/54` cases.
- Focused Lessons 20-22 tests: `18/18` in classic and module; UI: `373/373` in classic and module; wrapper parity: `2/2`.
- Complete classic and module runtimes: `3249/3249` across `49/49` suites each.
- Live in-app proof remains unavailable because the existing `file://` tab could not be claimed after the update and browser safety policy blocks opening a fresh local-file tab. No alternate browser-control workaround was used.

### Lesson 20 derivation-only nonactive authority

Date: 2026-07-15

Status: Implemented and fully test-verified; live in-app verification is blocked by the current local-file tab binding.

- Removed the remaining raw-answer authority path. `buildClassicalNahuatlLesson20NonactiveStemRecord()` now rejects caller-supplied `nonactiveStem`, perfective target, suffix family, or lexical-authority strings. `deriveClassicalNahuatlLesson20NonactiveStemRecord()` authorizes only a typed option generated from the current active stem, class, ending, and valence; a forged generated-option id blocks instead of falling back.
- Added a 24-case synthetic productive-shape audit whose stems occur in no Lesson 20 fixed or supplemental table. It covers direct `lō`, Class B root-plus-`ya`, Class C, Class D, transitive `ō` endings, intransitive `o-hua` endings, final-`i/o` `hua`, and the shape-licensed intransitive `-ni` `hua ~ n-o-hua` possibility.
- Extended productive ending recognition to the `k/s/w` spellings parallel to the Classical `c/qu/z/hu` shapes, without importing any Nawat surface as Classical lexical authority.
- Removed `lexical-exception` as a false seventh suffix family. The §20.3 `hui-tz`, `itqui-tz`, and `huica-tz` formations are now `lo-hua` records with `first-compound-member` attachment, and the family validator accepts `lo-hua-tz`.
- Replaced focused Lesson 21-22 fixtures that manually built nonactive records with engine derivation, leaving only one hostile raw-answer call that proves it blocks.
- Bumped evaluator and rendering cache keys to `20260715-nonactive-rule-logic-039` and regenerated both native module wrappers.

Validation:

- Lesson 20 Canvas audit: `84/84`; cross-lesson optional inventory: `40/40` sources and `50/50` options; additional productive Canvas audit: `7/7`; unlisted productive-shape audit: `24/24`; later active-to-nonactive evidence: `54/54`.
- Focused Lessons 20-22: `19/19` in classic and module. Focused UI: `373/373` in classic and module. Native-wrapper parity: `2/2` in classic and module.
- Complete classic and module runtimes: `3250/3250` across `49/49` suites each.
- The in-app browser lists the user's `file://` Canvas tab, but both claim/get operations return a stale internal tab handle and cannot inspect or reload it. A blank test tab was cleaned up and the user's Canvas tab was preserved. No unrelated browser-control workaround was used.

### Intransitive postvocalic-ti nonactive alternatives

Date: 2026-07-15

Status: Complete.

- Corrected the productive branch that had confined `Vti → ch-ō` to transitive sources even though Andrews supplies intransitive `ilō-ti → īlō-ch-ō` and later `tlacō-ti → tlacō-ch-ō` evidence.
- An unlisted intransitive `Vti` source now keeps the general §20.6 final-`i` `hua` formation as its default and exposes `ti → ch-ō` as a shape-licensed alternative. `(pa-ti)` therefore generates `pa-tī-hua ~ pa-ch-ō` and requires the generated-option selector.
- Lexically resolved witnesses remain resolved: `tequi-ti` produces only `tequi-ti-hua`; `ilō-ti` produces only `īlō-ch-ō`. `tlacō-ti` exposes `tlacō-tī-hua ~ tlacō-ch-ō`, with its §38.1.1.b witness attached to the `ch-ō` option while preserving the productive-rule provenance.
- Prefixed `tla-` impersonal inputs remain outside the first-pass rule, so later recursive `tla-cōl-ō-ti → tla-cōl-ō-ch-ō` evidence does not leak into an ordinary Lesson 20 inventory.
- Bumped the evaluator cache key to `20260715-nonactive-vti-040` and regenerated the native module wrapper.

Validation:

- Lesson 20 Canvas `84/84`; cross-lesson optional inventory `40/40` sources and `50/50` options; additional productive `7/7`; unlisted productive shapes `24/24`; later evidence `54/54`.
- Focused Lessons 20-22, wrapper parity, and UI: `394/394` in classic and module.
- Complete classic and module runtimes: `3250/3250` across `49/49` suites each.

### Lesson 20 typed final-shape relation

Date: 2026-07-15

Status: Complete.

- Added a canonical typed final-shape frame for both the active imperfective source stem and every generated nonactive stem. It records the final one, two, and three orthographic units, letter units, sound units, and hyphen-delimited morphemes.
- Macron vowels are normalized to NFC and preserved as length-bearing letters; hyphens remain explicit boundary evidence. For example, `pol-o-ā` records `ā / -ā / o-ā`, while `pa-ti` records `i / ti / -ti` and the boundary-free letter tail `i / ti / ati`.
- Productive Lesson 20 decisions now consume the source final-shape frame instead of independently regex-parsing the whole stem. Internal prefix and frequentative checks consume the frame's morpheme inventory.
- Every generated option carries a computed source-to-nonactive relation with retained stem, removed final shape, added final shape, suffix family, rule id, macron change, and boundary change. The authorized nonactive record recomputes and verifies this relation; caller-supplied shape frames remain non-authoritative.
- The suffix-family validator now consumes the typed output final shape, including `o-hua`, compensatory `ō-hua`, compound `o-hua-tz` / `lo-hua-tz`, and `hua-lō` boundaries.
- Bumped the evaluator browser cache key to `20260715-nonactive-final-shape-041` and regenerated the native module wrapper.

Validation:

- Lesson 20 Canvas `84/84`; cross-lesson optional inventory `40/40` sources and `50/50` options; additional productive `7/7`; unlisted productive shapes `24/24`; later evidence `54/54`.
- Focused Lessons 20-22: `20/20` in classic and module; native-wrapper parity `2/2`; `git diff --check` passes.
- Complete classic and module runtimes: `3251/3251` across `49/49` suites each.
- The separate Lessons 20-22 formula audit remains `25/39`; its existing `14` failures are the documented Lesson 21-22 co-occurring-object routes, while all `14/14` engine-derived nonactive stems match Canvas evidence.

### Lesson 20 three-core nonactive formation model

Date: 2026-07-15

Status: Complete.

- Replaced the flat conceptual treatment of the six surface families with Andrews' three formation cores: `o`, `lo`, and `hua`. The existing `suffixFamily` remains as exact surface realization compatibility, not as six unrelated derivational cores.
- Core `o` realizes terminal `ō` or continues as `o-hua`; core `lo` realizes terminal `lō` or continues as `lo-hua`; core `hua` realizes terminal `hua` or continues as `hua-lō`.
- Every generated option and authorized nonactive record now carries a typed formation structure with core, continuation, ordered core sequence, terminal core, and surface allomorph. Compensatory `ō-hua` is explicitly an allomorph of the `o + hua` sequence.
- Suffix-family final-shape validation consumes the three-core structure. Unknown pseudo-families remain blocked, and callers cannot replace the generated core sequence.
- Bumped the evaluator browser cache key to `20260715-nonactive-three-cores-042` and regenerated the native module wrapper.

Validation:

- Lesson 20 Canvas `84/84`; cross-lesson optional inventory `40/40` sources and `50/50` options; additional productive `7/7`; unlisted productive shapes `24/24`; later evidence `54/54`.
- Focused Lessons 20-22: `21/21` in classic and module; native-wrapper parity `2/2`; `git diff --check` passes.
- Complete classic and module runtimes: `3252/3252` across `49/49` suites each.

### Lesson 20 active-identity candidate lattice

Date: 2026-07-15

Status: Complete for the exhaustive Lesson 20 nonactive decision-category lattice; the separate Lesson 21-22 co-occurring-object routes remain out of scope.

- Added a typed active-stem identity/allomorph frame before nonactive formation. It records the entered allomorph, canonical imperfective identity, allowed allomorphs, class/valence compatibility, internal morpheme boundaries, explicit Class B root-plus-`ya`, final shape, and whether an exact nonactive output is licensed or documented unresolved. Caller-supplied identity frames are ignored.
- Direct `chiye` and `piye` entries now derive `chiye-lō` and `piye-lō` automatically from Canvas-backed identity records. They expose no selector because each has one licensed result. `mēmē` is recognized as the active allomorph of `māmā` but remains explicitly unresolved because Canvas does not license its exact nonactive output; no generic final-`e` rule was invented.
- Replaced the productive first-match implementation with a candidate set that collects every applicable rule tier, preserves each decision category, and selects the highest-specificity tier. Lower generic rules remain typed as superseded evidence. Genuine same-tier or Canvas-backed alternatives remain selectable with no default.
- Added a typed candidate lattice combining exact Lesson 20 formations, licensed active allomorph formations, productive final-shape candidates, and later Canvas supplements. Each inventory and authorized record now carries source identity, internal morphology, candidate source, and decision category.
- Added a `36`-cell executable decision matrix covering Classes `A-D`, transitive/intransitive valence, final `a ā e ē i ī o ō` and consonant, solid/hyphenated boundaries, short/long/nonvowel endings, identity-resolved and shape-only sources, and all three outcomes: determinate, selectable alternatives, and documented unresolved.
- Added specific UI explanations for unresolved lexical `e` allomorphs, identity context mismatches, and unlicensed consonant-final sources. Bumped the evaluator cache key to `20260715-nonactive-candidate-lattice-043` and regenerated the evaluator and rendering native module wrappers.

Validation:

- Lesson 20 Canvas `84/84`; cross-lesson optional inventory `40/40` sources and `50/50` options; additional productive `7/7`; unlisted productive shapes `24/24`; candidate lattice `36/36` with `0` uncovered axes; later evidence `54/54`.
- Focused Lessons 20-22: `22/22` in classic and module; UI `373/373` in classic and module; native-wrapper parity `2/2` in classic and module; `git diff --check` passes.
- Complete classic and module runtimes: `3253/3253` across `49/49` suites each.
- The separate Lessons 20-22 formula audit remains `25/39`; all `14/14` engine-derived nonactive stems match Canvas, and the unchanged `14` failures are the documented Lesson 21-22 co-occurring-object formula routes.

### Lesson 23 typed co-occurring-object valency

Date: 2026-07-16

Status: Complete for the fourteen Lesson 21-23 active, passive, and impersonal co-occurrence formulas required by the Lessons 20-22 Canvas audit.

- Added a typed Lesson 23 object-cluster frame whose source requirements carry object kind, person, directive/causative/applicative governor, and derivational level. Mainline/shuntline status is derived from level; linear order is derived from Andrews 23.5 priorities; specific-object incompatibility and silent allomorphs are derived rather than supplied as formula text.
- Extended VNC slot frames to carry two or three ordered valence positions. Passive now promotes the eligible typed specific object and preserves the remaining cluster; impersonal preserves compatible reflexive and nonspecific objects. The Lesson 23 contract is provisional at rank `75`, after Lessons 21-22 voice work and before the Lesson 8 final boundary.
- Converted all fourteen former audit placeholders to executable inputs covering specific plus reflexive, mainline plus shuntline specific, specific plus human/nonhuman nonspecific, human plus nonhuman nonspecific, and reflexive plus nonspecific routes.
- Preserved Lesson 20 as the nonactive-stem authority. Added only the later Canvas-backed `il-hui → il-huī-lō` and `tequi-ti-ā → tequi-tī-lō` optional witnesses needed by these higher-layer examples; callers still select only engine-owned option ids and cannot supply target stems.
- Formula, surface, and requested carrier artifacts are explicitly non-authoritative. Validators rebuild cluster positions from typed requirements, and mutated clusters fail closed without poison surviving into blocked passive results.
- Bumped the evaluator browser cache key to `20260716-lesson23-object-cluster-044` and regenerated the native module wrapper.

Validation:

- `npm run audit:lessons20-22`: `39/39` exact, `22/22` engine-derived nonactive Canvas matches, `0` missing rules, and `0` mismatches.
- `npm run audit:lesson20`: all existing Lesson 20 authority audits remain green, including `84/84` Canvas, `15/15` visual, `40/40` supplemental sources, `7/7` additional productive, `24/24` unlisted shapes, `36/36` candidate lattice, and `54/54` later evidence.
- Focused Lessons 20-22: `25/25` in classic and module. Focused firewall plus Lessons 20-22: `81/81` in classic and module.
- Complete classic and module runtimes: `3257/3257` across `49/49` suites each.
- Fresh same-origin in-app browser proof executed five representative active/passive/impersonal typed transformations. All were authorized, matched their exact Canvas formulas, carried `classical-nahuatl-lesson23-object-cluster-frame`, and reported formula authority `false`.

### Classical Result-column width priority

Date: 2026-07-16

Status: Complete.

- Narrowed the shared #1 Source / #2 Authority desktop column from `minmax(420px, 0.78fr)` to `minmax(360px, 0.64fr)` and expanded #3 Result to `minmax(560px, 1.36fr)`. The existing single-column layout at `1024px` and below remains unchanged.
- Bumped the stylesheet cache key to `20260716-result-column-width-051` and updated the UI contract test.
- Focused UI tests pass `374/374` in classic and module runtimes. At the live browser's `1405px` viewport, Source/Authority measured `434px`, Result measured `923px` (`67.4%` of the board), and both content columns fit without horizontal overflow.

### Ordered higher voice and `yohua` nonactive authority

Date: 2026-07-16

Status: Complete.

- Authorized `yohua → yohua-lō` as the sole direct nonactive formation. The productive final-`hua` / final-`hui` route now checks whether replacing final `w` would create adjacent `o/ō`; it therefore blocks `yoō-hua` structurally while preserving valid formations such as `ē-hua → ē-ō-hua`.
- Added eight engine-owned ordered voice routes covering the direct doubly impersonal `yohua-lō` route and all seven later higher-order evidence records. Every layer owns a typed `sourceFrame`, consumes that frame's `targetStem`, records its operation and impersonal depth, and is validated by rebuilding the canonical route.
- `tla-yohua-lō` is generated only as `yohua → tla-yohua → tla-yohua-lō` within the complete typed chain. Intermediate higher-order stems are barred from ordinary first-pass Lesson 20 candidate generation, so entering `tla-yohua` cannot reach the target through the generic final-`a` spelling rule.
- Replaced the former exclusion-only higher-order audit with executable derivations and hostile inputs. Caller-supplied targets, layer arrays, formula artifacts, and surface artifacts are discarded; mutated continuity and wrong-source route requests fail closed.
- Replaced the one-shot completed-route selector with a progressive cascade owned by the existing `Voice` control. Selecting `inherently impersonal` reveals `Next voice layer`; choosing `tla-impersonal` reveals `Following voice layer`. The user can stop at typed `yohua`, `tla-yohua`, or either authorized nonactive output, and no later option appears before its preceding typed layer exists.
- The result receipt shows the accumulated voice cascade, impersonal depth, derived third-singular subject, derived class, and derived intransitive valence separately from the user's source selections. Partial route prefixes such as `yohua → tla-yohua` are rebuilt and validated as typed chains, while only complete prefixes acquire a final route id.
- Bumped browser cache keys to `20260716-voice-cascade-031`, `20260716-voice-cascade-046`, and `20260716-voice-cascade-052`; regenerated evaluator and rendering native-module wrappers.

Validation:

- Lesson 20 authority audits: `84/84` Canvas, `15/15` visual, `40/40` supplemental sources, `7/7` additional productive, `24/24` unlisted shapes, `36/36` candidate lattice, and `54/54` later evidence with all `7` higher-order records executable.
- Lessons 20-22 formula audit remains complete at `39/39`, with `22/22` engine-derived nonactive Canvas matches, `0` mismatches, and `0` missing rules.
- Focused firewall, Lessons 20-22, and wrapper parity tests pass `84/84` in classic and module; UI tests pass `375/375` in classic and module.
- Complete classic and module runtimes pass `3259/3259` across `49/49` suites; `git diff --check` passes.
- Fresh live in-app browser proof confirmed that no cascade control appears under active voice; `Next voice layer` appears only after `inherently impersonal`; and `Following voice layer` appears only after `tla-impersonal`. The partial `tla-yohua`, direct `yohua-lō`, and triple `tla-yohua-lō` results were authorized; the triple formula was `#0-0(tla-yohua-lō)0+c-0#`, no `yoō-hua` appeared, and the browser reported no console errors.

### Modern ESM runtime cutover

Date: 2026-07-16

Status: Complete.

- Preserved the verified post-Lesson 23 behavior in checkpoint commit `f1f8709c`, then promoted the verified `.mjs` graph to the sole runtime authority.
- Removed the `72` approved classic runtime sources, the `3` approved wrapper-generation files, the generated-wrapper parity test, and `index.module.html`. `index.html` now has one local `type="module"` entry.
- `src/runtime/create_runtime.mjs` owns one fail-closed manifest with `72` canonical modules and `72` installers. Tests, audits, maintenance callers, and the browser use that same graph.
- Full verification passes `3327/3327` tests across `53` suites. Lesson 20 remains fully green, and the Lessons 20-22 Canvas audit passes `39/39` with `22/22` engine-derived nonactive matches and zero mismatches.
- Automated Chrome proof loads one module and zero classic scripts in direct-import mode and preserves typed passive authority. Independent in-app proof visibly authorizes passive `chihua` and reports no browser warning or error.
- The shared action `modern-esm-runtime-migration` is closed: primary responsibilities remain assigned, both temporary support actors are retired, and remaining old runtime callers are `0`.
- Future lessons add one canonical `.mjs` module/installer entry only; they do not recreate a `.js` twin, generated wrapper, classic VM lane, or alternate browser entry.

### Classical Lessons 24-26 typed derivation application

Date: 2026-07-16

Status: Complete for the first witnessed, authority-first causative/applicative slice. This is not an exhaustive Lessons 25-26 lexical inventory; every other route remains unsupported pending its own typed Andrews license.

- Added one reusable typed derivation evaluator and extended the shared Classical VNC application boundary. Source VNC, operation, participant transform, target VNC, and result remain typed authority; formula, surface, result, target-stem, and caller-supplied signature strings cannot authorize.
- Lesson 24 now licenses only the exact type-one witnesses `tomi -> tom-a` and `tēmi -> tēm-a`. Generic final-`i` replacement/addition is blocked, so unlicensed stems such as `miqui` cannot overgenerate.
- Lesson 25 type-two causative consumes the exact typed `chihua -> chihua-lō` Lesson 20 route before deriving `chihua-l-tia`. An arbitrary nonactive record cannot infer the causative target.
- Lesson 26 type-two applicative licenses only the Class C, specific-projective, one-object `xeloa -> xel-huia` source profile, imports the applicative object as the newest/mainline Lesson 23 position, and retains its older source object as shuntline. Other Lesson 26 stems and an invented three-object `chihua` target fail closed.
- Added minimal Direct / source-gated Causative / source-gated Applicative controls plus conditional engine-generated formation, Embedded subject, and Imported object controls. Participant controls appear only after an exact source profile produces an authorized inventory; option rendering requires an exact rule ID/tag pair, and the result receipt exposes typed derivation/object depth without becoming authority.
- Added the finished #3 Canvas/Andrews explanation as an application-owned, deep-frozen projection of the canonical source, operation, active target, participant transform, final voice, and evidence records. It visualizes formation, whole-VNC change, mainline/shuntline and sounded/silent participant history, Andrews operator scope, higher-layer finalization, broader reference dimensions, and a collapsed evidence boundary. The renderer validates the enclosing application frame before admitting it and constructs no derivational grammar.
- Live browser testing found that the Lesson 23 cluster replaced the final typed formula but left the lower one-object Lesson 8 sentence frame attached. The core Lesson 23 handoff now re-finalizes its sentence/output projections from the final typed cluster; `c-0` survives only as lower-layer evidence.
- Registered three canonical contracts for the option inventory, operation frame, and derived machinery frame, installed the evaluator as the 73rd canonical ESM module, and added a four-case executable Canvas audit.
- Hardened the derivation, application-result, and application-envelope validators so canonical signatures are supplementary only: typed targets, formulas, proofs, finalizers, applied-frame order, source/active/selected continuity, derivation and voice selections, nested controls, and blocked-result emptiness are rebuilt or cross-checked directly.
- Preserved higher sentence environments during later-voice reconstruction and removed an unused UI object-person default from intransitive `tla-impersonal` participant evidence.

Validation:

- Focused Lessons 24-26, application, registry, and UI verification passes `449/449`, including hostile typed-envelope and explanation-projection admission; focused Lessons 20-22 plus the hardened boundary pass `82/82` after final sentence-environment reconstruction.
- The four-witness Lessons 24-26 Canvas audit passes `4/4` exact formulas, `4/4` typed operations, `0` missing evidence tokens, and `0` mismatches.
- The complete canonical ESM runtime passes `3356/3356` tests across `54` suites. The prior Lessons 20-22 Canvas audit remains `39/39`; runtime delivery remains one module entry with `73/73` modules/installers; alignment stays at the recorded renderer/runtime baselines.
- Automated browser smoke passes direct-import typed passive authority. Fresh-origin in-app proof shows the `chihua → chihua-lō → chihua-l-tia` and `xeloa → xel-huia` explanation paths, their §§24.9/26.23 scope and Lesson 23 participant routing, plus `#ni-0+m-itz+0-0(xel-huia)0+0-0#.` and `Nimitzxelhuia.`, with no stale `c-0` sentence, warning, error, or narrow-layout overflow.
- `npm run verify:readiness` passes in full.

### Classical Lessons 24-26 productive derivation expansion

Date: 2026-07-16

Status: Complete for productive typed causative and applicative generation. Any entered source may be analyzed; only an Andrews-licensed combination of typed class, valence, final shape, segmentation, nonactive history, and object depth may generate.

- Replaced the four-route lexical permission list with category rules. Lesson 24 type-one causatives generate final-`i` replacement/addition alternatives, final-`a` replacement, root-plus-`ya`, segmented long-vowel `hua`, and licensed `hui` families. Lesson 25 type-two causatives consume canonical Lesson 20 `hua`, `ō`, `o-hua`, or `lō` formation cores, with more specific `-ti`, root-plus-`ya`, and final-`ō` routes taking precedence.
- Lesson 26 applicatives productively derive `liā` for final `i/iā`, consonant-plus-`a`, Class B/D, and `ya/oya` categories. `huiā` is licensed only by its typed `o-ā`, intransitive `ō`, or signed earlier-causative history. Two-object sources may reach the Andrews three-object ceiling; a fourth object, duplicate identity, or contradictory source profile blocks.
- Exact `tomi`, `tēmi`, `chihua`, `xeloa`, final-`ō` choices, `pil-i-hui`, and the §26.7 occasional `pa-tla / tla-zo-h-tla -> ...ti-lia` correspondences remain boundary-insensitive overlays. They refine or suppress productive candidates but no longer function as the user-source whitelist. The exact `xeloa` result absorbs a lexical-key-equivalent productive result even under extra internal boundary segmentation, so the UI never presents two indistinguishable choices; unlisted `-tla` sources retain the productive `tla -> chi` route.
- Canonical validators rebuild base Lesson 7/23 sources, full operations and participant transforms, derived machinery, formulas, finalizers, and recursive signed history. Caller target/formula/surface/result strings, forged signatures, mixed sources, duplicate objects, mutated lower frames, or a canonical voice cluster attached to a mismatched target stem, subject, or tense cannot authorize.
- The UI now labels Causative and Applicative as rule-generated. It offers an engine-generated formation selector only when Andrews leaves alternatives, shows only the embedded subject or imported object decisions that the user genuinely controls, and renders the application-owned Canvas/Andrews explanation without a renderer-maintained rule-tag allowlist.

Validation:

- Productive rule audit: all `14` families pass, including unlisted sources, a signed causative-to-applicative continuation, and recursive depth `3`.
- Focused suites: Lessons 24-26 `16/16`, VNC application `17/17`, grammar registry `43/43`, UI `381/381`, and Lessons 20-22 `28/28`.
- Complete canonical ESM runtime: `3365/3365` tests across `54` suites. Lessons 20-22 Canvas formulas remain `39/39`; Lessons 24-26 witnesses remain `4/4`; the runtime manifest remains one browser entry with `73/73` modules/installers; shared-action alignment is green.
- Fresh-origin in-app proof entered unlisted `miqui`, exposed `mic-a ~ miqui-a ~ mic-tia`, and authorized selected `mic-tia` as `#ni-0+c-0(mic-tih)0+⎕-0#` / `Nicmictih.`. It then entered transitive `namaca`, automatically derived `namaqui-lia`, and authorized `#ni-0+m-itz+0-0(namaqui-lih)0+⎕-0#` / `Nimitznamaquilih.`. Both productive explanations rendered and the clean tab reported no warning or error.
- `npm run verify:readiness` passes in full, including the direct-import smoke with one module script, zero classic scripts, and typed formula-string authority disabled.

### Raw Karttunen 1992 derivational evidence overlay

Date: 2026-07-16

Status: Complete as a display-only lexical-attestation overlay on Andrews-generated causative, applicative, and nonactive routes.

- Audited the supplied raw `Karttunen` column conservatively as `1,779` unique explicit source-to-derivative relations: `695` applicatives, `276` causatives, and `808` nonactives. The raw cell supplies the direction as derivative before `applic.`, `caus.`, or `nonact.` and original after the marker; presentation reverses that source notation to `ORIGINAL → DERIVATIVE`.
- Kept the full mechanical inventory out of the browser runtime. The reviewed overlay contains only `837` exact, quantity-preserving intersections with current Andrews outputs (`452` applicatives, `88` causatives, and `297` nonactives), plus one explicit no-current-license causative fixture for hostile neutrality proof.
- Evidence matching ignores morpheme-boundary hyphens and whitespace only. It preserves Classical vowel quantity, offers no quantity-free fallback, never infers missing boundaries, and never consults the normalized `Traducción` field whose derivational cross-references were removed by commit `21bd184`.
- Causative and applicative attestations attach only after the typed derivation evaluator independently generates the same operation, source, and target. Nonactive attestations attach only after the Lesson 20 candidate lattice resolves; the selected type-two causative bridge and any later passive/impersonal nonactive formation remain separate canonical evidence contexts.
- Evidence is bound into canonical signatures and recomputed by validators, but every authority flag remains false. The application projects it through the validated explanation envelope, and the renderer admits only raw-`Karttunen`, correctly directed, quantity-preserving, non-authoritative records as display rows with no controls.
- Focused verification passes Lessons 24-26 `17/17`, Lessons 20-22 `29/29`, VNC application `19/19`, grammar registry `43/43`, and UI `381/381`, including segmented/unsegmented equivalence, no-license neutrality, forged/missing evidence rejection, and distinct bridge/later-voice projections.
- The full canonical ESM runtime passes `3369/3369` tests across `54` suites. `npm run audit:alignment` is aligned, and `npm run verify:readiness` passes the runtime manifest, full suite, lesson audits, all `14` productive derivation families, the raw Karttunen audit, and direct-import browser smoke.
- Fresh-origin in-app proof renders selected applicative `CĀHU(A) → CĀHUILIĀ` for entered `cā-hua` and generated `cā-hui-liā`. A clean causative run for `mayāna` also renders distinct selected-causative `MAYĀN(A) → MAYĀNALTIĀ` and Lesson 20 bridge `MAYĀN(A) → MAYĀNALŌ` rows. All three live rows declare authority `none`, identify the raw `Karttunen` source, report hyphen-insensitive and quantity-preserving agreement, and contain zero controls. Later-voice evidence is additionally covered by the canonical application/UI suites.

### Karttunen Lessons 24-26 type organization

Date: 2026-07-17

Status: Complete as an offline Andrews taxonomy and evidence report; it does not add a runtime grammar lane.

- Extended the Lesson 25/26 organizer with a seven-family Lesson 24 catalog: final-`i` replacement, final-`i` addition, homophonous final-`a` replacement, root-plus-`ya` replacement, long-vowel `hua` replacement, `i/a-hui -> o-ā`, and note-1 `o-hui -> o-ā`. §24.5 `ni/hui` preferences and fused formations are nested subtypes; §§24.8-24.9 remain participant/scope dimensions.
- Replayed each of the `276` reconciled causative sources through the canonical typed evaluator under A/B intransitive profiles. The report keeps `sourceTypeCandidates` separate from recorded-relation `typeCandidates`, so a possible Lesson 24 alternative can never reclassify Karttunen's different target.
- No raw Karttunen `caus.` target is an exact Lesson 24 output. `274` targets are later-causative-shaped and `2` are unclassified; `225` rows (`189` unique sources) nevertheless have at least one distinct Lesson 24 source alternative, and all `225` fail recorded-target equality by construction.
- Overlapping source memberships are `111` final-`i` replacement, `147` final-`i` addition, `57` homophonous final-`a`, `9` root-plus-`ya`, `12` long-vowel `hua`, and `23` `i/a-hui -> o-ā`. The catalog retains the zero-member note-1 `o-hui` family and the explicit `pil-i-hui` negative gap rather than letting the dataset define the chapter inventory.
- The cross-lesson partition is `179` source-compatible plus typed/comparison Lesson 25, `46` source-compatible plus ending/unresolved, `35` typed/comparison Lesson 25 without a Lesson 24 option, and `16` outside both typed inventories. Lesson 25 remains `89` exact families plus one §25.8 comparison, `51` nonactive-corroborated, `73` edit-compatible, `60` ending-only, and `2` unresolved; Lesson 26 remains `452/173/22/48` exact/compatible/ambiguous/unclassified.
- Generated delivery includes a one-row-per-relation Lesson 24 TSV, a seven-row catalog TSV with Canvas examples/subtypes/gaps, the existing Lesson 25/26 TSVs, a complete JSON report, summary JSON, and an explanatory README. Every authority flag is false and generated artifacts remain ignored offline reports.

Validation:

- The fixed-SHA organizer, exact inventory identity, source/target separation, catalog, ambiguity, round-trip, TSV-width, and hostile all-false-authority invariants pass.
- Canonical tests pass `3393/3393` across `55` suites. Runtime delivery remains one module entry with `73/73` modules/installers; every Lesson 20, Lessons 20-22, Lessons 24-26, productive-rule, and Karttunen evidence audit passes.
- Browser smoke passes with one module script, zero classic scripts, typed authority true, and formula-string authority false. Shared-action alignment passes after the organizer action closes without claiming unrelated dirty worktree paths.

### Classical Lesson 26 complete example generation

Date: 2026-07-17

Status: Complete. Every one of the `161` Lesson 26 Canvas/Andrews source-result examples now has an executable typed generation path; none remains unsupported.

- The earlier gaps came from four distinct omissions: unpredictable Type 1 applicatives were treated as “no licensed options” instead of user-selectable possibilities; §26.1 identity/inherent and exact alternation relations were absent; final `o-ā` analysis exposed too few structurally possible `huiā/liā` routes; and Type 3 plus §§26.15-26.23 lacked end-to-end executable proof through their nonactive, participant, mood, voice, ambiguity, or scope layers.
- Type 1, Type 2, and rare Type 3 are now first-class nomenclature subtypes. Productive or structurally possible forms coexist as explicit choices, while exact Canvas/Karttunen witnesses remain separately marked and never preselect or authorize a route.
- Added exact §26.1 identity/inherent relations, documented Type 1 and Type 2 alternations, rare `namaca -> namaquiltia` and `nequi -> nectia` Type 3 routes, generic segmented/unsegmented final-`o-ā` alternatives, and §26.23 `tla-` defusion. The Type 3 routes consume canonical Lesson 20 nonactive intermediates rather than a target-string shortcut.
- The complete catalog is frozen audit evidence only. Its `101` stem rows, `33` participant-transform rows, and `27` higher-layer rows are rebuilt through canonical inventories, Lesson 20 bridges, Lesson 23 object machinery, and the relevant mood/voice/ambiguity/scope finalizer; stored expected strings cannot authorize.
- The result selector is nomenclature-first (`Type 1 applicative`, `Type 2 applicative`, `Type 3 applicative`, etc.), followed by the generated target and Andrews section. Multiple possible outputs require an explicit user choice; options without lexical witnesses are visibly choices, not claims.
- The Karttunen hostile audit now locates the actual evidence-bearing option before mutation, so a newly preceding unwitnessed option cannot weaken the proof that lexical evidence has no generation authority.

Validation:

- Complete Lesson 26 audit: `161/161` generated, `0` missing rule outputs, `0` pending exact-layer proofs.
- Productive Lesson 24-26 audit: all `18` rule families pass with recursive object depth `3`; focused Lesson 24-26, application, Lesson 20-22, and UI suites pass `24/24`, `24/24`, `30/30`, and `381/381`.
- Full canonical ESM suite passes `3398/3398` across `56` suites. Runtime delivery remains one browser entry with `73/73` modules/installers; shared-action alignment is green.
- Karttunen remains display-only: `837` confirmed intersections (`452` applicative, `88` causative, `297` nonactive) plus one no-license fixture pass with hyphens ignored, quantity preserved, and `Traducción` authority false.
- `npm run verify:readiness` passes end to end, including direct-import browser smoke with one module script, zero classic scripts, typed authority true, and formula-string authority false.

### Classical Direct restoration and Applicative authority layout

Date: 2026-07-17

Status: Complete. Direct retains its established choice inventory, and Applicative presents its three user decisions in a stable typed sequence.

- Direct again displays Class, `3 common`, `information question`, and `wish`. When Canvas determines or excludes a choice, the typed engine disables it; presentation no longer removes it from Direct.
- Applicative now has an explicit heading and the ordered controls Generated formation, Imported object, and Later target voice. The generated-formation control appears for every authorized Applicative inventory and only requires a choice when canonical alternatives survive.
- Mode switching retains the existing mode-specific application state. Causative and Applicative continue to hide Direct-only presentation choices, so restoration does not broaden derived-mode authority.
- Focused UI, VNC application, and Lessons 24-26 suites pass `382/382`, `24/24`, and `24/24`. Live browser proof confirms the restored Direct inventory and visible-but-locked Canvas class behavior.
- Full readiness passes `3399/3399` tests across `56` suites, all lesson and Karttunen audits, `161/161` Lesson 26 examples, all `18` productive families, alignment, and direct-import browser smoke.

### Classical #1/#2/#3 progressive presentation flow

Date: 2026-07-17

Status: Complete. Source is compact, Authority is derivation-first with progressive typed disclosure, and Result is answer-first without changing Andrews page 46–47 Linear/Diagram structures.

- #1 keeps the machine-owned source facts and source-structure controls intact, but presents the readout as a compact wrapping line instead of four equally heavy rows.
- #2 places Direct/Causative/Applicative before Logic. Existing typed controls are moved without replacing their IDs or listeners into a primary mode-relevant stage plus native Clause and Sentence disclosures. Direct opens Clause by default; derived modes keep ordinary settings secondary and require a generated-formation choice when canonical alternatives survive.
- #3 now presents the selected form and current Linear/Diagram rendering before the authority receipt and the longer application-owned Canvas/Andrews route. Linear remains a continuous formula; Diagram retains Subject and Predicate with Core/Tense under the brace; each format keeps its own Specific/General switch.
- Focused UI verification passes `383/383`. The single presentation-slice alignment audit is aligned.
- Fresh in-app proof entered `huāqui`, authorized Direct `Nihuāc.`, selected Type 1 Causative `huā-tz-a` to authorize `Nichuātz.`, and selected Type 1 Applicative `huāqu-iā` to authorize `Nimitzhuāquih.`. In both derived modes, the answer appears before the authority receipt and Canvas/Andrews route while Clause and Sentence settings remain collapsed.
- Full readiness was intentionally not run because this is a presentation slice, not a lesson handoff.

### Classical #3 common Canvas / Andrews surface style

Date: 2026-07-17

Status: Complete. All Classical result components now share the visual system established by the authorized-derivation panel.

- Added one body-scoped teal/amber Canvas palette with shared panel backgrounds, borders, radii, shadows, muted labels, and code-display treatments. The authorized derivation now consumes those common variables instead of maintaining a visually isolated palette.
- Turned the full #3 result into the common gradient surface. Selected VNC/NNC answers, Linear/Diagram sections, formula switches, authority receipts, proof actions, and disclosures now use related white/teal or amber cards within it.
- Removed the blocky selected-VNC treatment: the left-border slab is replaced by a rounded peer panel, the answer sits in a teal inset, and its label hierarchy matches the authorized-derivation header language.
- Restyled Classical mode, derivation, voice, and subtype operator grids as the same rounded Canvas surface with white pills and teal active states; `calc-operator-grid--derivation` no longer looks like an unrelated glass control.
- Preserved result order, every DOM/control contract, application-owned authority, Linear and Diagram formulas, independent Specific/General switches, and the Andrews page 46–47 Predicate hierarchy.
- Focused UI verification passes `384/384`. Fresh browser proof covers `Nihuāc.`, `Nichuātz.`, and `Nimitzhuāquih.`; selected result, receipt, and derivation share identical panel styling. Phone-width proof has zero page/component overflow and the final tab has no warning or error logs.
- Alignment is green. Full readiness was intentionally not run because this is a presentation refinement rather than a lesson handoff.

### Classical #3 authorized-derivation density reduction

Date: 2026-07-17

Status: Complete. The Canvas / Andrews route is now a compact result summary with progressive proof rather than an expanded report.

- The default exposes exactly five application-projected facts: source to derived stem, derivation nomenclature plus primary Andrews section, valence/object-depth change, Andrews rule-authorization status, and lexical-witness status.
- Removed the explanatory lede, the duplicate visible source-contract and formation-identity rows, and the generic broader-dimensions block. No grammar data or authority moved into presentation; the validated application projection remains unchanged.
- Existing nonduplicative proof is organized into three closed disclosures: Formation and source analysis; Participants, scope, and later voice; Rule and lexical evidence. Source/reverse analyses, participant routing, nonactive layers, and Canvas/Karttunen evidence remain display-only.
- Focused UI verification passes `385/385`. Live applicative proof authorizes `xeloa → xelo-ia` and renders `Nimitzxeloih.` with the five-fact default. All three bodies compute to `display: none` and zero height until opened; the formation disclosure opens with its three typed sections and closes again.
- Desktop proof measures `873 × 370` with zero horizontal overflow. Phone-width Result proof measures a `380`-pixel root and `360 × 467` explainer with one-column facts, three closed bodies, and zero page/component overflow.
- Alignment is green. Full readiness was intentionally not run because this is a presentation refinement rather than a lesson handoff.
