# Codex Coordination Board

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

## Completed Phase: Preterit Class A P+i CV|CV Transitive Policy Gate

Date: 2026-07-05

Decision:

- The selected live preterit route for transitive `p+i` with `CV|CV` right-edge shape no longer authorizes Class A candidate selection or the ki-only target policy from descriptor-only `CV-CV(pV)` matches; the selected broad `CV-CV(pV)` target branch now consumes typed source/operation/target frames directly.
- `buildPretClassAPiCvTransitiveSourceFrame()` represents the original source verb, `p+i` right edge, `CV|CV` profile, transitivity, monosyllable gate, and target policy; `buildPretClassAPiCvTransitiveOperationFrame()` consumes that frame and emits `andrews-preterit-class-a-pi-cv-transitive-policy`.
- `getPretUniversalClassCandidates()` and `buildPretUniversalClassA()` require those typed frames for the selected `tapi`-style route; missing source/operation/target frames, contradictory profile/target frames, display-string poisoning, descriptor poisoning, and descriptor-only fallthrough now block instead of preserving the old string-authority path.
- Class A variants now carry the typed operation frame as route policy payload after structural authorization; rendered base/suffix strings remain output artifacts.

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

Date: 2026-07-04

Decision:

- The live Andrews 36.3 customary-agentive verbal compound route now builds its target through a typed operation frame: generated customary-agentive nounstem source frame + verbal matrix frame + target CNV stem frame.
- `buildCustomaryAgentiveCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `-(nemini/tuka)` for display, but the executable `compoundRequest` uses the typed operation frame, target stem `neminituka`, and structural object prefix `ki`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior for the customary-agentive compound route.

## Completed Phase: Preterit-Agentive Compound Embed Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.7 preterit-agentive verbal compound route now builds its target through a typed operation frame: generated preterit-agentive general-use nounstem source frame + verbal matrix frame + target CNV stem frame.
- `buildPreteritAgentiveCompoundEmbedContinuationContract()` still exposes `compoundVerbInput` such as `(tamatka/tzajtzi)` for display, but the executable `compoundRequest` uses the typed operation frame and target stem `tamatkatzajtzi`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings or poisoned display `compoundVerbInput` strings cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old compound-string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display input, missing operation frame, and contradictory operation frame behavior for the preterit-agentive compound route.

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

## Completed Phase: Ordinary-Noun Ownerhood Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.9-35.10 ordinary-noun ownerhood route now builds finite VNC output through a typed operation frame: ordinary nounstem source frame + noun-class frame + ownerhood matrix frame + typed parsed-target frame + target CNV stem frame.
- `buildOrdinaryNounOwnerhoodContinuationContract()` still exposes `ownerhoodVerbInput` such as `(shuchi)-(e)` or `(kal)-(wa)` for display, but the executable `ownerhoodRequest` uses the typed operation frame, target stems such as `shuchie` and `kalwa`, and a structured parsed-target frame that carries the embed/matrix split without invoking the old parenthesized string parser.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy ownerhood string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old ownerhood string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the ordinary-noun ownerhood route.

## Completed Phase: Preterit-Agentive Complement Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.12 preterit-agentive incorporated-complement route now builds finite VNC output through a typed operation frame: generated preterit-agentive general-use nounstem source frame + complement matrix frame + outside object frame + target CNV stem frame.
- `buildPreteritAgentiveComplementContinuationContract()` still exposes `complementVerbInput` such as `-(tamatka/mati)` for display, but the executable `complementRequest` uses the typed operation frame, target stem `tamatkamati`, and the structural object prefix `ki`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy complement string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old complement string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the complement route.

## Completed Phase: Preterit-Agentive Adverbial Typed Operation Gate

Date: 2026-07-04

Decision:

- The live Andrews 35.12 preterit-agentive adverbial-manner route now builds finite VNC output through a typed operation frame: generated preterit-agentive general-use nounstem source frame + adverbial matrix frame + target CNV stem frame.
- `buildPreteritAgentiveAdverbialContinuationContract()` still exposes `adverbialVerbInput` such as `(tamatka/nemi)` for display, but the executable `adverbialRequest` uses the typed operation frame and target stem `tamatkanemi`.
- The shared VNC typed-operation executor gate consumes `override.typedCompoundOperationFrame` before reading `posicionesFormula.tronco`; poisoned `tronco` strings, poisoned display/formula strings, or a poisoned legacy adverbial string builder cannot change the generated form.
- Missing typed operation frames and contradictory source/matrix/target frames block at the executor gate instead of falling back to the old adverbial string parser.
- Hostile derivation coverage proves structural target generation, poisoned `posicionesFormula.tronco`, poisoned display/formula echo input, poisoned legacy builder behavior, missing operation frame, and contradictory operation frame behavior for the adverbial route.

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
- The implementation keeps possessive-state material such as `+n-o` / `+i-m` on the predicate side, keeps `hu-an`, `0-[sq0]`, `t-in`, and `tli-0` as outside subject-number connectors, and records that there is no VNC tense slot.
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

## Merge Rules

- Do not edit the same file from two worktrees at the same time.
- Update this board before ending a coordination session when assignments change.
- If uncertain, write a question or target clarification instead of guessing.
- Main-thread edits should stay on the current working tree unless the user explicitly requests worktrees.
