# Classical Lessons 12-16 NNC Surface Execution Plan

## Objective

Surface every currently encoded Lesson 12-16 NNC rule so a user can see the governing Canvas fact, provide every decision that actually belongs to the user, and inspect every automatic consequence in Result.

This is not a request for one control per lesson. The implementation remains one reusable Source -> Authority -> Result pipeline organized by grammar role:

`typed source analysis -> user-owned selections -> Canvas gates and transformations -> typed NNC slots -> sentence/discourse finalizer -> visible result and proof`

The plan may evolve during execution when a rendered PDF witness, an existing typed contract, or an interaction between slices proves that a field belongs at a different layer. Any evolution must be recorded in the Evolution Ledger below before the implementation scope expands.

## Non-Negotiable Authority Order

1. `ANDREWS_TRANSCRIPTION_CANVAS.md` is the machine-readable deed.
2. The rendered Andrews PDF page is the truth for vowels, macrons, letters, glottal marking, and square-zero.
3. If Canvas and the rendered page differ, correct Canvas and its rule tag first.
4. Only then update typed source/operation/output frames.
5. Only then expose Source facts, Authority controls, Result consequences, and diagnostics.
6. Formula, surface, translation, lesson number, DOM state, and witness spelling remain non-authoritative.

Every implementation slice therefore begins with a Canvas/PDF witness check and ends with a hostile test proving that display text cannot authorize the rule.

## Rendered PDF Witness Ledger

Authoritative PDF:

`/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf`

The Lesson 12-16 span is PDF pages 115-151. The following pages were visually inspected from rendered PNGs before this plan was written.

| Rule | Canvas lines | PDF image | Letter/vowel facts that must survive |
| --- | ---: | ---: | --- |
| 13.4 nonspecific possessors | 4627-4647 | 122, printed 107 | `tē` has long `ē`; `tla` has short `a`; `tla` is primarily relational with the 15.1.6 exception |
| 13.5-13.6 specific possessors | 4648-4696 | 122-123, printed 107-108 | third possessive `ī`; plural `st2` is `m ~ n`; first/second possessive case is short `o`, replaced by square-zero before a vowel |
| 14.8 constituent ambiguity | 5109-5153 | 134-135, printed 119-120 | spelling cannot decide whether boundary material belongs to the stem or connector; vowel length cannot be erased by reparsing |
| 15.1.1 boundary behavior | 5158-5170 | 135, printed 120 | possessive plural is `hu-ān` with long `ā`; final voiceless `w` and `n` assimilate only in this environment |
| 15.1.2 suppletion | 5171-5211 | 135-136, printed 120-121 | examples include `(tlācoh)-tli- -> (tlāca)-uh-`, `(pīl)-li- -> (pīl-lō)-tl-`, and `(tēuc)-tli- -> (tēuc-yō)-Ø-`; their macrons are lexical facts, not renderer decoration |
| 15.1.4-15.1.7 higher operations | 5219-5285 | 136-137, printed 121-123 | possessor reduplication repeats typed State; secondary `tē` may blur to `ti` or `t`; analogical `tla-mā`; reclassification loses ephemeral `i` in `(māi)-tl- -> (mā)-tl-` |
| 15.2 State restrictions | 5289-5335 | 137-139, printed 123-125 | naturally possessed examples retain lexical macrons such as `chān`, `āxcā`, `nān`, `yāō`, and `mā`; metaphorical use can override a never-possessive restriction |
| 16.3 doubled first plural | 5385-5492 | 143, printed 128 | doubled subject person is `ti-t`; compound stem is `eh-huā`; plural stem contains internal `-n`; sounded `t-in` and square-zero variants remain distinct |
| 16.4 adjunct and interrogative context | 5493-5563 | 144-145, printed 129-130 | principal NNC and adjunct `in` are separate when the dependent clause is present; preserve `tl-eh`, `tl-e-i`, long `cā`, and long `āc` |
| 16.6 indefinite compounds | 5585-5607 | 146, printed 131 | `(-ah)-Ø-` removes length from the embedded vowel: `ā-c` becomes `a-c-ah`; `itl-ah` has a special human-subject use, not an automatic human meaning |
| 16.7 matrix inventory | 5608-5633 | 146-147, printed 131-132 | matrix families include `-chī ~ -ch` and `-quī ~ -c`, while combined `-qui-ch` is short; visually confirmed series are `chī/chih/chi/ch` and `quī/quih/qui/c` |
| 16.8-16.9 quantitive plurality | 5634-5761 | 147-150, printed 132-135 | `-qui-ch` does not take internal plural `n`; `quī` and `chī` normally do before `n`; plain `c/ch` variants and sounded versus square-zero subject dyads remain separate typed choices |

No implementation may normalize these forms to ASCII or recover their spelling from an option id.

## Surface Ownership Contract

"Surface every rule" does not mean making every machine consequence editable.

| Owner | Surface treatment | Examples |
| --- | --- | --- |
| External typed lexical record | Result proof only when actually supplied outside the stem-only Canvas | State availability, available suppletive stem, allowed quantitive allomorphs, allowed constituent analyses |
| User | Conditional Authority control | State, possessor, selected constituent analysis, one Lesson 15 stem operation, reduplication, doubled 1pl, special human use, adjunct clause, quantitive variant |
| Canvas consequence | Visible disabled/read-only Authority row plus Result action | third-plural possessor `m` before a vowel/`m`/`p` and `n` elsewhere, `o -> square-zero`, `hu-ān` assimilation, internal plural `n`, loss of embedded vowel length before `-ah`, separate writing before an actual adjunct clause |
| Result finalizer | Visible formula, surface, operation trail, finalizer, and exact witness | selected typed slots, sentence force, interrogative loss, blocked reason |

Controls remain organized by Subject, Predicate, Source relation/lexical analysis, and Sentence/Discourse. Lesson numbers appear only in witnesses and proof receipts.

## Typed Source Authority Required Before New Controls

The surface must not pass loose booleans or finished strings directly into Lesson 15 or 16. Add one reusable typed NNC source-authority record, or evolve the existing source frame to carry the equivalent fields:

- `stateAvailability`: `both`, `absolutive-only`, or `possessive-only`.
- `naturalPossessionPolicy`: `ordinary`, `naturally-possessed`, or `never-possessive`.

The live Canvas accepts only the nounstem and therefore cannot manufacture either lexical field from a hidden control, URL state, or example preset. Without an actual external typed lexical record, the live policy is `ordinary` and both Predicate State values remain operative; the core contracts still enforce genuine supplied restrictions.

The same boundary applies to every carrier in the hidden read-only proof scaffold: `tla` compatibility, constituent analysis, possessive formation, selected lexical stem, suppletive connector, secondary carrier, and third-plural inventory are canonical proof mirrors only. Hidden DOM state, URL restoration, example presets, or loose surface-frame overrides cannot alter live authorization, formula, or surface. A nondefault lexical claim must enter through a genuine typed core authority record, not through the proof scaffold.
- `metaphoricalOverrideAvailable`: derived from the policy, not from spelling.
- `possessorCompatibility`: reciprocal, nonspecific human, relational `tla`, analogical-derived `tla`, and specific-person inventory.
- `thirdPluralPossessorSt2Options`: legacy proof metadata only; it cannot select or restrict the form. Canvas derives `st2` from the following typed stem sound.
- `constituentAnalyses`: typed slot alternatives; string-only analyses rejected.
- `lesson15StemOperations`: mutually exclusive regular, suppletive, secondary general-use, analogical restricted-use, and 2A-to-1A records, each with required target stem and lexical/user authority.
- `possessorReduplicationAvailable`: separate from the mutually exclusive stem operation.
- `doubledFirstPluralAvailable`: only for the Lesson 16 personal compound environment.
- `indefiniteHumanUseAvailable`: semantic special-situation capability; never an automatic authorization.
- `adjunctInCapability`: interrogative source may take a dependent clause introduced by separate `in`.
- `quantitiveMatrixOptions`: family, allowed allomorphs with exact vowel length, pluralization policy, and allowed subject-number dyads.

User-supplied lexical analysis is valid authority when it is represented by this typed record and explicitly selected. Andrews examples verify operations; they are not a whitelist of stems.

## Execution Slices

Execution status on 2026-07-15: Slices 0-8 are complete. Automated integration, full classic/module validation, exhaustive/pairwise selectable-state audits, live desktop verification, and a true 390x844 narrow-viewport pass all succeed. The browser pass found and corrected the `(cal) -> (eh-huā)` source-card transition defect before final closure.

### Slice 0 - Canvas and PDF Gate

Before each later slice:

1. Open the Canvas line range.
2. Inspect the corresponding rendered PDF image.
3. Record exact vowel/letter truth in the rule tag or test name.
4. Correct Canvas first if needed.
5. Add a hostile short-vowel, wrong-letter, or string-only case where the distinction can affect authorization.

Acceptance:

- Canvas, rule tags, formula inventory, and typed tests agree on each relevant macron, `h`, `hu`, `tl`, and square-zero.
- No renderer-only spelling repair exists.

### Slice 1 - Shared Source and Surface Ledger

Build the typed source-authority contract and extend the legal option ledger before adding controls.

Surface:

- A stable `Lexical / structural authority` group in Authority.
- Source-owned rows remain visible but disabled when fixed.
- Each row declares `decisionOwner`, Canvas rule id, availability reason, and whether the value is fixed, selectable, required, or inapplicable.

Hostile coverage:

- DOM datasets, formula text, source spelling, and disabled control values cannot create source authority.
- Unknown or contradictory typed options fail closed.

### Slice 2 - Lessons 12.7 and 15.2 State Availability

Implement State availability before the higher possessive operations because all later controls depend on it.

Surface:

- `State availability` readout: both, naturally possessive, absolutive only, or never possessive.
- State selector contains only Canvas-compatible choices.
- `Metaphorical possessive use` appears only for a never-possessive source when possessive use is being requested.
- The override is explicit and defaults false.

Result:

- Show the lexical policy, ordinary selection, override if used, and Lesson 15.2 finalizer.

Hostile coverage:

- A default `both` surface state cannot erase source restriction.
- Checking metaphorical use without a never-possessive conflict cannot authorize a different route.

### Slice 3 - Lesson 13 Possessor Completion

Surface the full typed possessor inventory.

Surface:

- Add reciprocal `ne`, nonspecific-human `tē`, and nonspecific-nonhuman `tla` to the possessor selector with exact spelling in the explanatory readout.
- Gate `tla` to relational or explicitly analogical-derived source analysis.
- When possessor is 3pl, show `Third-plural possessor form` with only the source-authorized `m` and/or `n` values.
- Show short `o -> square-zero before vowel` as an automatic boundary consequence, not another selector.

Hostile coverage:

- Hidden fallback `n` is removed.
- `tla` cannot authorize a nonrelational source merely because the visible string begins with `tla`.
- Third-plural `st2` is derived from the following typed stem sound; a caller-supplied `m/n` value cannot authorize, block, or override it.

### Slice 4 - Lesson 14.8 Constituent Analysis

Turn the existing ambiguity frame into an actual selected-analysis contract.

Surface:

- `Constituent analysis` lists every typed alternative using slot labels, not only a formula string.
- If there is one alternative, show it read-only.
- If there are multiple alternatives, require an explicit selection and display the neighboring alternatives.
- Preserve an `Ambiguity remains` diagnostic when Canvas does not license a unique answer.

Engine evolution likely required:

- The selected typed analysis must feed slot realization. The current ambiguity frame is proof-only and must not remain disconnected from the selected output.

Hostile coverage:

- Traditional solid spelling and a forged formula cannot select or erase an analysis.
- The selected analysis cannot change vowel length without a PDF-backed rule.

### Slice 5 - Lesson 15 Higher Possessive Operations

This is the largest slice and should land as several small patches over one shared contract.

Surface:

- `Possessive formation`: regular, suppletive, secondary general-use, analogical `tla` restricted-use, or 2A-to-1A reclassified. Show only source-authorized alternatives.
- `Selected lexical stem`: exact typed target, visible with macrons and provenance.
- `Suppletive connector`: visible/selectable only when the suppletive record supplies alternatives.
- `Reduplicate possessor`: separate conditional toggle for a dyadic possessive NNC with plural subject.
- `Basic possessor`: read-only role in Result; later supplementary possession remains outside this slice.

Engine:

- Replace the current renderer call that forwards only animacy/metaphor with the complete typed Lesson 15 selection record.
- Preserve mutual exclusion among the four stem-changing operations.
- Keep productive `hu-ān` boundary assimilation automatic and visible.

Patch order:

1. Suppletion plus connector.
2. Possessor reduplication.
3. Secondary general-use `tē/ti/t` fusion.
4. Analogical `tla` restricted-use formation.
5. `tl` 2A-to-1A reclassification.

Hostile coverage:

- One selected operation cannot trigger a neighboring operation.
- Example spellings do not whitelist stems.
- A target stem without typed lexical/user authority blocks.
- Formula and surface poisoning do not survive into Result.

### Slice 6 - Lesson 16 Contextual User Decisions

Surface three currently unreachable or auto-authorized choices.

Surface:

- `Doubled first plural`: available only for personal-compound 1pl. Show the special contextual meaning separately from grammatical person.
- `Dependent clause introduced by in`: available for the relevant interrogative NNCs. When an actual dependent clause is present, Result writes the NNC and `in` separately.
- `Special human use of itlah`: required, default false, only when a human subject is selected. Remove the current unconditional `specialHumanUse: true` routing.

Hostile coverage:

- Doubled first plural blocks for 2pl/3pl and for non-personal compounds.
- A bare/fused source spelling cannot pretend a dependent clause is present.
- Human `itlah` cannot authorize without the explicit semantic selection; nonhuman use does not acquire the special-human flag.

### Slice 7 - Lessons 16.7-16.9 Quantitive Matrix Authority

Replace source-string parsing as the decisive allomorph authority.

Surface:

- `Matrix family`: source-owned `qui-ch`, `quī`, or `chī` family.
- `Matrix form`: conditional exact choices `qui-ch`; `quī/quih/qui/c`; or `chī/chih/chi/ch`.
- `Predicate pluralization`: internal `n` or lexically authorized plain variant.
- Keep `Number form` separate for the subject dyad: `t-in`, square-zero, or other Canvas-authorized variant.
- Explain that internal `n` belongs to predicate derivation, not subject number.

Source cards may prefill a typed selection, but selecting or editing the exact typed matrix form must be possible without manufacturing a different source stem behind the user's back.

Hostile coverage:

- Short and long `i` are distinct typed values.
- `qui-ch` cannot acquire internal `n`.
- Plain `c/ch` plural variants require explicit lexical authorization.
- The visible source spelling cannot override a contradictory matrix record.

### Slice 8 - Integration, Audit, and Browser Proof

Integrate all controls into the stable NNC Authority layout and full-paradigm contract.

Required checks:

- Every enabled control state reaches an authorized output or an intentionally visible unresolved lexical requirement.
- Conditional controls remain in stable groups and become disabled/read-only rather than causing layout churn.
- Full paradigms enumerate only dimensions that belong to the paradigm; contextual one-off choices remain fixed source/Authority parameters.
- Result exposes source authority, selected action, automatic consequences, highest finalizer, exact Canvas witness, and display-only receipt boundary.
- URL/state persistence preserves typed choices without treating serialized strings as authority.
- Live browser checks cover desktop and narrow layouts, keyboard access, conditional transitions, cache version, and console warnings.

## Test Plan

For every slice:

1. Extend `src/tests/classical_nnc_lessons12_16.test.js` with positive, neighboring, and hostile cases.
2. Extend `src/tests/ui.test.js` for legal options, decision ownership, conditional availability, rendering, persistence, and no hidden fallbacks.
3. Extend `src/tests/surface.test.js` when sentence/discourse realization changes.
4. Extend `scripts/audit_classical_authority_states.js` so every newly selectable state is included.
5. Register any new canonical `.mjs` capability in `RUNTIME_INSTALLERS` and run the runtime manifest/integrity checks.
6. Run focused ESM tests after each patch.
7. Run the complete ESM suite at slice boundaries.
8. Perform live browser proof after each visible slice and a final combinatorial pass.

Minimum hostile matrix:

- missing typed source authority;
- contradictory source and Authority selection;
- formula/surface/display poisoning;
- wrong macron or wrong allomorph;
- invalid neighboring environment;
- stale serialized/DOM value;
- lower lesson attempting to freeze an output before the highest active finalizer.

## Expected Files

Canvas and documentation:

- `ANDREWS_TRANSCRIPTION_CANVAS.md`
- `docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json`
- `docs/ANDREWS_FORMULA_INVENTORY.md`
- `docs/CLASSICAL_NNC_LESSONS12_16_AUTHORITY_AUDIT.md`
- `docs/CODEX_BOARD.md`

Typed authority and generation:

- `src/core/classical/nnc_layer_evaluator.mjs`
- possibly one new canonical NNC source-authority module if the existing source frame cannot remain coherent

Surface:

- `src/ui/shell/classical_shell.mjs`
- `src/ui/rendering/rendering.mjs`
- `src/ui/events/events.mjs`
- `style.css`

Validation:

- `src/tests/classical_nnc_lessons12_16.test.js`
- `src/tests/ui.test.js`
- `src/tests/surface.test.js`
- `src/tests/module_runtime_integrity.test.js`
- `scripts/audit_classical_authority_states.js`

## Baseline and Worktree Safety

The planning baseline is a dirty worktree containing active user changes in the same NNC, rendering, shell, test, documentation, and runtime files. Execution must:

- preserve all existing changes;
- inspect the current diff before each overlapping patch;
- never reset or restore user work;
- update the board before broadening file scope;
- land the smallest complete live path at a time;
- edit canonical `.mjs` files directly and never recreate a classic mirror.

Planning baseline validation on 2026-07-14:

- `classical_nnc_lessons12_16`: 55/55 passed.
- Complete classic suite: 3206/3206 passed across 48 suites.

## Definition of Done

The execution goal is complete only when:

- every gap named in Slices 2-7 is visible to the user as a source fact, real conditional control, automatic consequence, or Result diagnostic according to decision ownership;
- no current hardcoded default (`3pl -> n`, `specialHumanUse: true`, parsed quantitive allomorph) remains an unmarked authority shortcut;
- Lesson 15 receives a complete typed operation selection rather than only animacy/metaphor;
- PDF-confirmed vowel and letter distinctions survive Canvas, typed slots, controls, formulas, surfaces, and tests;
- the exhaustive selectable-state audit passes with no accidental blocked states, while intentionally unresolved lexical requirements are explicitly classified;
- focused, UI, surface, firewall, parity, full classic, and full module tests pass;
- live desktop and narrow-browser verification passes without console errors;
- the board records the final architecture and any plan evolution.

## Evolution Ledger

Append changes here during execution. Each entry must state:

- evidence that forced the change;
- old plan assumption;
- replacement contract;
- affected slices/files/tests;
- why the change remains within the user-authorized goal.

Initial state: no execution changes yet.

### 2026-07-14 - Exact quantitive form remains separate from matrix family

- Evidence: rendered PDF pages 146-150 distinguish underlying long `/quī/` and `/chī/` from exact `quī/quih/qui/c` and `chī/chih/chi/ch` morphs, while combined `qui-ch` has short `i`.
- Old assumption: the existing `quich/qui/chi` source dropdown plus suffix parsing could continue to identify both family and allomorph.
- Replacement contract: a typed Lesson 16 quantitive authority record separately owns source family, exact matrix form, predicate pluralization, and allowed subject-number dyads. Source text only verifies the record; selecting a different exact form produces a visible Source-edit requirement instead of silently rewriting the stem.
- Affected scope: Slice 7 core evaluator, Canvas Authority controls, Result receipts, URL state, selectable-state audit, rule tags, formula inventory, and focused tests.
- Scope justification: this is the planned Canvas-first Slice 7 conversion, narrowed by the rendered-page vowel evidence and the user's explicit PDF-image truth requirement.

### 2026-07-14 - Required visible selections are explicit audit outcomes

- Evidence: the final all-source audits retain deliberate fail-closed states for special human `(itl-ah)` and exact quantitive source/form mismatches; third-plural possessor `st2` is no longer unresolved because Canvas phonology derives it from the typed stem.
- Old assumption: every selectable-state audit block could be counted as an accidental failure unless it was a lexical stem mismatch or the special-human context choice.
- Replacement contract: the audit separately counts every visible required selection or Source edit as intentionally unresolved and still exits nonzero for any unclassified block.
- Affected scope: Slice 8 audit reporting, final validation ledger, and handoff status.
- Scope justification: these are surfaced user decisions required by Slices 3, 6, and 7; classifying them explicitly preserves fail-closed behavior while making the automated completion criterion truthful.

### 2026-07-15 - Source identity must settle before card-owned control prefills

- Evidence: live Canvas verification switched from ordinary `(cal)` to the `(eh-huā)` first/second-person source card, but the old `3common`, nonanimate, common-number contract kept the first-person and singular/plural options disabled. The new card consequently rendered an incorrect third-common `Ehhuātl` and could not expose doubled first plural.
- Old assumption: source-card prefills could update subject and number controls before the new source parts were committed, because the controls would already accept the card's values.
- Replacement contract: commit the selected source identity and source parts first; derive the card's animate/nonanimate context from its typed subject category; then apply animacy before person and number prefills against the option contract for that source. The typed engine remains the authorization boundary.
- Affected scope: Slice 8 composer transition order, UI regression coverage, regenerated module wrapper, and the resumed live browser matrix.
- Scope justification: this repairs the planned Canvas source-to-Authority transition and is required for the already-scoped Lesson 16 controls to become genuinely available to the user.

### 2026-07-15 - Same-origin frame supplies the missing narrow viewport

- Evidence: the supported in-app browser had a fixed 1422px top-level viewport and exposed no viewport-emulation capability; browser zoom did not change CSS viewport width.
- Old assumption: the supported browser surface would directly provide a resize or emulation control for the required narrow pass.
- Replacement contract: use a temporary same-origin 390x844 iframe inside the same supported browser. The framed app receives a real 390px layout viewport, activates its actual `(max-width: 760px)` media queries, and remains fully inspectable without changing browser surfaces. Remove the harness after verification.
- Affected scope: Slice 8 live verification and completion evidence only; no production runtime or grammar authority path.
- Scope justification: this proves the exact planned narrow layout within the required browser surface and does not substitute static reasoning, a different browser, or a production change.
