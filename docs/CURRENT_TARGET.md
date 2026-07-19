# Current Target

## Refresh-stable URL screen and derivative type

Date: 2026-07-18

Status: Implementation and focused proof complete. Alignment closure remains pending on unrelated shared-worktree scope.

### Explicit implementation target

1. Preserve the active Source, Authority, or Result screen in the existing `entrada/v1` URL state.
2. Restore that screen with the entered URL stem/name after refresh and hash navigation.
3. Keep the existing DOM panel state as the live UI carrier and avoid a second runtime lane.
4. Preserve Direct, Causative, or Applicative derivative type in that same URL and restore it through the canonical derivation state.
5. Write derivative-type changes synchronously so an immediate refresh cannot race the deferred general URL update and fall back to Direct.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-refresh-stable-url-screen.json`.

### Completion boundary

The slice closes when screen changes update the existing URL, derivative-type changes update it before the click returns, refresh restores the named entry on the same screen and derivative type, old URLs without either segment retain their defaults, focused UI tests pass, and alignment reports no regression attributable to this action.

### Completed outcome

- The existing `entrada/v1` snapshot now serializes the active panel as `screen/formula` or `screen/output`; Source remains the omitted default.
- The same snapshot serializes non-default derivative type as `derivation/causative` or `derivation/applicative`; Direct remains the omitted default.
- Panel changes update that same URL carrier, and refresh/hash restoration uses the canonical panel-state setter rather than a parallel navigation state.
- Derivative restoration uses `setActiveDerivationType(...)` and the existing control synchronizer before generation.
- Derivative clicks now flush the existing URL synchronizer synchronously; an immediate refresh cannot occur before the derivative segment is written.
- Focused module UI verification passed `398/398` assertions across the two matched suites; syntax checks and `git diff --check` passed.
- Live browser proof loaded `(chōca)` on Result, refreshed, and retained both `(chōca)` and Result with zero warning/error logs.
- A second live proof loaded `(chōca)` on Authority with Causative, refreshed, and retained the name, screen, URL derivative segment, and active Causative control with zero warning/error logs.
- Exact interaction proof started from a name-only URL, clicked Causative and Applicative separately, confirmed each derivative segment before the click workflow yielded, refreshed immediately, and retained the named source plus active derivative with clean logs.
- Alignment architecture metrics remained at baseline. The gate still reports the pre-existing live-board expansion and unrelated dirty paths/PDF artifacts outside this assignment.

## Result-owned output scope

Date: 2026-07-18

Status: Implementation and focused proof complete. Alignment closure remains pending because unrelated dirty paths are outside this active assignment.

### Explicit implementation target

1. Move the canonical NNC and VNC single-form/full-paradigm selector from #2 Authority into #3 Result.
2. Preserve the existing typed output-scope request and generation paths without introducing a second state carrier.
3. Prove that #2 no longer contains the selector and both clause kinds remain selectable from #3.
4. Reduce the default visual density of the Canvas / Andrews derivation route to one scannable summary while preserving the full typed proof behind progressive disclosure.
5. Keep the complete Result `Built from` receipt canonical while presenting it as a collapsed input-count disclosure by default.
6. Link each typed participant carrier in the Identified source and Derived active VNC formulas to its Participant history row with one consistent visual color.
7. Keep #3 source-faithful: show only Canvas witnesses and Andrews rules/structure; do not expose Karttunen attestations, internal rule IDs, license policy, control boundaries, receipt boundaries, or application-analysis bookkeeping.
8. Name the selected Andrews derivational procedure in #3 (addition, replacement, combined replacement plus addition, suppletion, nonactive-base formation, or unchanged-stem valence addition) from the canonical typed operation rather than from the rendered stem.
9. In the expanded #3 formation route, show the boundary-free source decomposition, each segment's Andrews role, the route enabled by that analysis, and why entered hyphens are observational rather than authoritative.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-result-owned-output-scope.json`.

### Completion boundary

The slice closes when both scope selectors are physically owned by #3 Result, the existing typed state remains canonical, the derivation route and complete `Built from` receipt are compact by default without losing their evidence, focused UI verification passes, and alignment is green.

### Current proof

- The Canvas / Andrews derivation explainer is now a single closed summary by default: label, source-to-target route, and derivation type / Andrews section. Its Andrews formation, participant history, scope, later voice, and Canvas evidence remain available inside the disclosure.
- The compact summary now also names the Andrews procedure, while the expanded formation route explains what that procedure changes. The presentation is projected from the selected typed construction and never inferred from the visible source or result string.
- The boundary-free source-analysis step now exposes its actual decomposition (for example root + stock formative + stem formative), labels every segment's role, states which Andrews formation the analysis enables, and explains the status of entered hyphens. These are application-projected display facts, not renderer inference.
- Equivalent readings of one decomposition now share a single compact equation instead of appearing as duplicate nested cards; the selected route and target sit directly below it, with the hyphen note reduced to a quiet footer.
- The source analysis is embedded as a semantic `aside` inside the Identified source VNC card rather than interrupting the formation rail as a separate sibling; the surrounding source-to-result sequence therefore keeps one consistent card rhythm.
- The completed causative card now carries its own application-projected Andrews morphology. For the §25.4 `lō` route it exposes source root/stem material, retained nonactive `l`, empty connective `ti`, and causative `ā`, together with the Canvas replacement explanation; the renderer does not infer these roles from the displayed target string.
- Identified source and Derived active VNC formulas now receive application-projected participant segments; matching Participant history rows and formula carriers share a stable four-color visual key without changing formula or grammar authority. The subject link is explicitly discontinuous: the complete `pers1-pers2` person dyad and complete `num1-num2` number dyad receive the same color on opposite sides of the predicate.
- Derived active VNC participant linking is exhaustive: every typed object carrier, including mainline and silent shuntline objects, receives its own Participant history color; typed object identity is primary and carrier matching is only a bounded display fallback.
- Focused application verification passed `25/25`, including explicit `pers1-pers2` / `num1-num2` subject-link assertions; focused UI verification passed `398/398`. Live localhost delivery loaded the new cache-busted stylesheet and all six participant-link rules with zero warning/error logs.
- Expanded route details now contain only Andrews formation, valence, participants, scope, higher layers, and Canvas / Andrews evidence. Non-Canvas lexical attestations and internal application-policy metadata remain typed internally but are not rendered.
- Focused module UI verification passed for `classical_causative_relation_ui.test.js` and `ui.test.js`; `git diff --check` passed.
- Fresh browser delivery confirmed the compact-route CSS, an authorized `Nichōca.` result, #3 ownership of Output scope, #2 absence of that control, and zero warning/error logs.
- Alignment architecture metrics remained at baseline, including renderer construction `38/38`, optional-domain dependency `0`, and one browser script. The gate remains open because the shared worktree also contains unrelated board expansion, source-picker/runtime changes, and PDF audit artifacts that this assignment cannot claim or alter.

## Canonical VNC source-stem starter presets

Date: 2026-07-18

Status: Complete focused Source-to-Authority preselection slice.

### Explicit implementation target

1. Make a canonical VNC Source choice load a coherent editable starter clause rather than leaving incompatible Authority defaults in place.
2. Preselect intransitive versus transitive valence; preserve an already selected transitive subtype and otherwise use the existing specific-3sg starter object.
3. Preselect Class only when the typed Andrews Lesson 7 engine supplies a non-fallback class rule; preserve the current Class for unresolved stems.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-source-stem-starter-presets.json`.

### Completion boundary

The slice closes when canonical VNC selection applies only safe, editable starter settings; known A/B/C/D cases follow typed Lesson 7 rules, unresolved class cases fail open to the current user choice, transitivity is coherent, focused tests and browser proof pass, and alignment is green.

### Completed outcome

- The picker remains non-authorizing; its transition now applies editable starter settings. Intransitive choices select intransitive, while transitive choices preserve a selected subtype or start at specific 3sg.
- Typed non-fallback Lesson 7 rules preselect Class for 76 records; the other 84 preserve the current Class, with no fallback-A guess.
- Focused UI passed `397/397`, runtime manifest remained `75/75`, fresh browser proof covered D, unresolved, and A transitions with clean logs, and alignment passed. Full readiness was not started.

## Classical Authority initial defaults

Date: 2026-07-18

Status: Complete focused UI-default repair.

### Explicit implementation target

1. Make the ordinary VNC Authority initial state `1sg` subject, `3sg` object, and indicative present.
2. Apply the same `3sg` imported-object default to Applicative without changing the separate causative embedded-subject decision.
3. Align shell selections, runtime fallbacks, reset/availability behavior, and result-only paradigm fallbacks so no stale `2sg` or preterit path can reinstate the former defaults.
4. Preserve explicit user selections across Direct, Causative, and Applicative.
5. Prove the focused default contract in tests, a fresh browser origin, and the alignment audit.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-authority-initial-defaults.json`.

### Completion boundary

The slice closes when a fresh VNC Authority surface opens at `1sg` / `3sg` / present, Applicative imports `3sg` by default, explicit selections are not overwritten, focused UI evidence and live browser proof pass, and alignment remains green. Full readiness remains a separate handoff gate.

### Completed outcome

- The canonical VNC Authority shell and every no-input runtime fallback now agree on `1sg` subject, `3sg` object, indicative present.
- Applicative imported object also defaults to `3sg`. The distinct causative embedded subject remains `3sg` and NNC participant defaults remain outside this change.
- Direct, Causative, and Applicative preserve explicit later subject, object, imported-object, mood, and tense selections.
- Focused UI tests passed `393/393` across the main UI and causative relation suites.
- Fresh-origin browser proof confirmed Direct `1sg` / `3sg` / present, Causative `1sg` / present with its separate embedded `3sg`, and Applicative imported object `3sg` with main `1sg` / present.
- Alignment has no architecture-metric regression. Its first active-scope pass correctly reported pre-existing unrelated PDF artifacts and the earlier completed-action manifest as outside this focused assignment; after this assignment closed, the audit passed without attributing those paths to this work.
- Full readiness was not started for this focused initial-value change.

## Restore derived VNC Authority choices

Date: 2026-07-18

Status: Complete focused UI-capability repair.

### Explicit implementation target

1. Identify Authority #2 choices disabled only because the pending causative/applicative presentation block drops the canonical source machinery identity.
2. Preserve the blocked derivation result and required generated-formation choice; do not let UI availability authorize a derivation.
3. Keep genuine typed grammar gates conditional, including source-voice, participant, and later-target-voice restrictions.
4. Restore source-authorized Mood and Tense selection while causative or applicative formation remains pending.
5. Prove Direct/Causative/Applicative parity for these two controls with focused tests and live browser evidence.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-derived-authority-choice-restoration.json`.

### Completion boundary

The slice closes when pending Causative and Applicative still require a canonical generated formation, but their Mood and Tense controls remain selectable from the canonical source machinery; focused UI/application tests, live browser proof, and alignment are green. Full readiness remains a separate handoff gate.

### Completed outcome

- The obsolete lock affected the whole `Mood` and `Tense` controls while a Causative or Applicative generated formation was still pending.
- The capability frame now reads only an authorized canonical source machinery frame during that presentation block. The derivation result remains blocked and the formation selector remains required.
- Genuine typed gates remain unchanged, including source-voice eligibility, intransitive Object absence, and later-target-voice availability.
- Focused tests passed: UI `386/386`, causative relation UI `6/6`, and VNC application `25/25`.
- Live browser proof selected Causative `optative` + `nonpast` before formation choice, confirmed Applicative retained those enabled choices, and confirmed both modes still required a generated formation.
- Full readiness was intentionally not started; this was a bounded changed-path repair.

## Canvas adjudication handoff — remaining Lessons 24–26 failures

Date: 2026-07-18

Status: Implementation complete. All adjudicated decisions are implemented and no issue remains in the decision queue. The recorded closure run did not complete the repository readiness gate.

### Completed outcome

- Canonical/tenseless notation and tense-bearing formulaic notation now use their distinct Canvas-authorized vowel quantity and final-morph realization.
- Hidden bases, exact variants, recursive history, source voice, participant depth, and later passive layers remain typed engine authority; exact citation carriers remain projection evidence rather than participant choices.
- The independent causative object-kind selector is removed. Only conditionally eligible referent-relation and specific-shuntline questions remain, and stale hidden values are blanked before request construction.
- Runtime manifest check passed with one browser entry and `74/74` modules/installers; alignment is green at the stabilization baseline; grammar data validation passed.
- The exact regular inventory passed `3,496/3,496` assertions across `69` suites.
- Focused Lesson 20 and Lessons 20–22 audits also passed. The recorded run stopped before the mandatory Lessons 24–26 complete-example, witness/productive, Karttunen, and browser-delivery responsibilities. Focused evidence did not substitute for those unrun stages, so that run is not a completed `verify:readiness` result.
- Readiness is now an atomic, content-addressed, resumable gate. Exact-input proofs survive interruption, changed owning inputs invalidate only their stages, independent misses use bounded parallelism, and alignment plus browser delivery always run fresh.

### Explicit implementation target

1. Implement the remaining user-adjudicated Canvas decisions as one shared action across grammar, application, UI, and verification rather than preserving the former failure ledger as unresolved policy.
2. Make canonical/tenseless notation and tense-bearing formulaic notation distinct wherever Canvas requires distinct vowel quantity or final-morph realization.
3. Preserve typed hidden bases, exact Canvas variants, recursive applicative history, source voice, participant depth, and later passive layers as engine authority; remove surface-only spelling overlays that compete with those structures.
4. Remove causative object kind as an independent UI choice. Derive specificity from the active/passive/impersonal source voice, while retaining only the conditionally eligible referent-relation and shuntline-realization questions.
5. Clear ineligible stale UI values before request construction and keep the capture-phase hard gate that prevents hidden choices from reaching generation.
6. Update focused hostile tests to the adjudicated canonical forms, then run alignment, the regular suite, and readiness before closure.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-canvas-adjudicated-failure-handoff.json`.

### Completion boundary

Implementation boundary closed: the former failures are repaired by confirmed Canvas rules, the non-Canvas participant selector is absent, stale hidden intent cannot enter an application request, alignment is green, and the exact regular inventory passes. Repository handoff remains separate and requires every responsibility in `docs/READINESS_POLICY.md` to pass in one complete `npm run verify:readiness` run.

## Canvas authority cutover — §25.6 temō and §25.8 tēmi

Date: 2026-07-18

Status: Complete and absorbed into the adjudication handoff above.

Implementation status: both canonical quantity routes are cut over and pass a direct modern-runtime continuity probe. The broad Lessons 24–26 suite and readiness remain deferred to the scheduled handoff.

### Explicit implementation target

1. Start from the post-`miqui` projected baseline of `3,477/3,496`; do not touch participant routing, hidden bases, recursive applicatives, or UI-policy failures.
2. Compile the user-confirmed canonical Canvas relations `(temō) > tla-(temō-huiā)` (§25.6, located on PDF p. 215) and `(tēmi) > tla-(tēmī-tiā)` (§25.8, located on PDF p. 216) into canonical typed derivation choices; the scan-derived short-vowel reading is not spelling authority.
3. Preserve the distinction between the printed source/result and the engine-derived typed bridge used to license each operation.
4. Remove the two competing exact-surface overlays and their appended option identities.
5. Prove automatic selection, exact quantity, canonical rebuilding, application/UI continuity, and hostile target rejection through the same choice-frame contract.
6. Run focused suites only. No readiness or standalone alignment run belongs to this slice.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-canvas-authority-next-quantity-routes.json`.

### Completion boundary

This slice closes only when both Canvas choices survive every consumer with one identity, their old overlay IDs are absent, and the three associated baseline assertions pass. The §25.15 `cui` voice-layer case remains outside this stem-route slice.

### Current proof

- `temō` exposes the single canonical Canvas choice `causative:type-two:canvas:l25-256-temo-final-o-direct-huia` with target `temō-huiā`.
- `tēmi` exposes `tēm-a` and the canonical selectable Canvas choice `causative:type-two:canvas:l25-258-temi-parallel-tia` with target `tēmī-tiā`.
- Each Canvas choice remains canonical and object-identical through application control, operation, result, and explanation frames; shortening the user-confirmed long vowel invalidates the choice.
- The former route-specific surface overlays are absent. No full lesson suite, standalone alignment audit, or readiness command was run.

## Canvas authority cutover — first Lessons 24-26 vertical route

Date: 2026-07-18

Status: Complete for the first vertical route. Expansion to another Canvas rule remains a separate target.

### Explicit implementation target

1. Preserve the stated stabilization baseline of `3,474/3,496` assertions across `69` suites; do not broaden this slice to the other `21` known failures.
2. Make the Canvas §25.3 `miqui > mic-o-hua > mic-tiā` relation the first catalog-derived typed derivation choice.
3. Give that choice one spelling-independent identity and one exact Canvas realization.
4. Make inventory, operation, application, presentation, and focused tests consume the same canonical choice identity and signature.
5. Remove the old competing `miqui` exact-surface overlay and downstream `mic-tia` expectations when the vertical route closes.
6. Run only focused affected suites during this slice. Do not run full readiness or standalone alignment until lesson handoff.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-canvas-authority-first-vertical.json`.

### Completion boundary

This slice is complete only when the canonical Canvas choice survives engine, application, and UI projection unchanged; forged target spellings cannot select or validate it; and the old `miqui` authority path is absent. Broader causative and applicative coverage remains out of scope until this proof is green.

### Completed outcome

- One frozen Canvas authority record now owns §25.3 `miqui > mic-o-hua > mic-tiā`: rule identity, source profile, nonactive bridge, participant operation, exact quantity, and printed realization.
- Inventory, selected operation, application controls, result, #3 explanation, and the derivation dropdown consume the same typed choice object and canonical signature. The dropdown displays Canvas nomenclature first and Andrews §25.3 second.
- The former `miqui` exact-surface overlay is gone. `mic-tiā` no longer receives a second option identity, and selection is by the Canvas `choiceId`, not by target spelling.
- A hostile clone changing only the canonical target to `mic-tia` fails the typed choice validator and registered grammar contract.
- Focused verification moved `classical_lessons24_26` from `12/24` to `13/24`; the application vertical probe passes all continuity checks; `grammar_contract_registry` passes `43/43`; UI remains at its exact four pre-existing failures (`381/385`) while the live surface-frame assertion now includes Canvas-choice continuity.
- No readiness or standalone alignment command was run. The remaining known failures were not changed in this slice.

## Classical Lessons 24-25 complete example generation

Date: 2026-07-17

Status: Complete.

### Explicit implementation target

1. Preserve a section-indexed, evidence-only catalog of every printed Lesson 24 and Lesson 25 source/result example without letting expected strings authorize grammar.
2. Reproduce every source-bearing stem example through a canonical typed causative option: productive category rules where Andrews gives a reusable rule and bounded exact overlays where the printed relation is unpredictable.
3. Reproduce the Lesson 24 §24.8 and Lesson 25 §§25.10-12 VNC examples through typed source voice, Lesson 23 participant routing, and the selected causative operation.
4. Reproduce the Lesson 25 §§25.13-16 ambiguity, mood, passive/impersonal, and supplementation examples through their actual later Canvas layers rather than treating them as new stem rules.
5. Admit result-only Lesson 24/25 records only through explicit typed source reconstructions, label whether the source is printed, Andrews-implied, Andrews-presupposed, or compositionally reconstructed, and never authorize a derivation from a target string alone.
6. Prove complete coverage with an exhaustive audit, focused hostile tests, and live browser verification. Run one alignment audit and full readiness only once at lesson handoff.

### Shared action

The machine-readable assignment is `docs/shared_actions/active/classical-lessons24-25-complete-example-generation.json`.

### Completed outcome

- The frozen catalog contains `227` Canvas records: `225` positive source/result examples and `2` explicitly negative constraints.
- All `225/225` positive records compare their full printed source and result with canonical typed output. Both negative records independently prove the forbidden causative absent. There are `0` surface mismatches, `0` missing records, and `0` policy violations.
- Stem formation, perfective class, source voice, participant routing, VNC readings, ambiguity, mood, later voice, and supplementation remain separate owning layers. The signed §25.13 alternative-source projection changes quantity only for that reading; ordinary §25.12 sources remain unchanged.
- Five rows whose source is not printed carry explicit evidence status: one Andrews-implied source, two Andrews-presupposed sources, and two compositionally reconstructed typed sources. No printed result may supply or select its source.
- The exhaustive handoff audit maps the `227` evidence rows to `213` target-free generation keys, builds canonical source/profile inventories into a shared generated-relation index, then matches catalog evidence against that index. Ordinary tests retain representative and hostile cases instead of repeating the full catalog.
- Fresh-origin browser proof confirms formation → object type → relation gating, exact `Tlaucxitia.` and `Quiucxitia.` outputs, Change reset, unchanged Linear/Diagram content, and zero browser logs.

### Completion boundary

The earlier Lessons 24-25 completion established reusable boundary-free rule families and participant machinery, but its Canvas witness audit covered four selected examples. This slice closes that gap: all `227` catalog rows are classified and executed by their owning typed layers, reconstructed sources carry explicit evidence status, and hostile proof confirms that no catalog target can act as generation authority.
