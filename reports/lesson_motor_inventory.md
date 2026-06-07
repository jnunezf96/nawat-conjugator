# Lesson Motor Inventory

Date: 2026-06-06

Scope: gather the lessons that already have a motor in the current website. Nine read-only agents inspected lesson ranges, UI/runtime wiring, and tests. This report consolidates those findings against `src/lessons/registry.js`, `src/appendices/registry.js`, loaded core modules, and executable tests.

## Summary

Registry counts:

| Status | Count | Lesson ids |
|---|---:|---|
| implemented | 10 | 5, 6, 7, 20, 21, 22, 23, 24, 25, 26 |
| partially implemented | 43 | 1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58 |
| not mapped | 5 | 15, 16, 17, 18, 19 |

Practical split:

| Tier | Lesson ids | Meaning |
|---|---|---|
| Strong website motors | 5, 6, 7, 20, 21, 22, 23, 24, 25, 26 | User-reachable motors, real modules, meaningful executable coverage. |
| Partial with useful callable motors or boundary metadata | 1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58 | Usable motor, adjacent motor, or diagnostic metadata exists, but Andrews lesson scope is incomplete or the UI/docs need caveats. |
| No lesson motor yet | 15, 16, 17, 18, 19 | Registry/curriculum may mention dependencies, but no mapped lesson motor was found. |

## Active Motor Families

| Motor family | Main modules | UI surface | Lesson coverage |
|---|---|---|---|
| Phonology and shape analysis | `src/core/phonology/phonology.js` | Parser/rendering support, stem diagnostics | 2, plus support for 5-7 and derivations |
| VNC generation | `src/core/vnc/vnc.js`, `src/core/generation/engine.js`, `src/core/generation/morphology_engine.js` | Main verb entry, tense tabs, output table | 5, 6, 7, 8 partial, 9, 10, 23 |
| Agreement and objects | `src/core/agreement/agreement.js`, `src/core/agreement/combo_validation.js`, `src/core/generation/valency.js` | Subject/object toggles, object controls, masks | 5, 6, 8 partial, 13 partial, 23 |
| Preterit classes | `src/core/preterit/context.js`, `src/core/preterit/engine.js`, `src/core/preterit/api.js` | Universal preterit tabs and VNC output | 5, 7, also finite support for 54-55 |
| Irregular/suppletive VNCs | `src/core/irregulars/irregulars.js`, `data/static_suppletives.json`, `data/static_suppletive_paths.json` | Main conjugator output | 11 |
| Nonactive/passive/impersonal | `src/core/derivation/nonactive.js`, `src/core/derivation/source_model.js`, `src/core/derivation/forward_runtime.js`, `src/core/generation/valency.js` | Active/nonactive mode, nonactive suffix tabs, diagnostic derived-voice labels | 20, 21, 22 |
| Causative and applicative | `src/core/vnc/allomorphy.js`, `src/core/derivation/forward_runtime.js`, `data/static_derivational_rules.json` | Direct/causative/applicative controls | 24, 25, 26 |
| Compound parsing | `src/core/parsing/parsing.js`, `src/core/derivation/source_model.js` | Verb composer, regex/parser input, normal output | 28 partial, 30 partial |
| Verb-derived nominal/NNC outputs | `src/core/nnc/nnc.js`, generation nominal profiles, agreement helpers | Sustantivo tab, patientivo/agentivo/instrumentivo outputs | 12-14 partial, 35-39 partial |
| Adjectival NNC outputs | `src/core/nnc/nnc.js`, `src/core/nnc/adjectival/adjectival.js`, generation nominal/adjective profiles | Adjetivo tab, diagnostic module/tests | 40-41 partial |
| Calendar-name boundary | `src/core/calendar/calendar.js` | Diagnostic module/tests | Appendix E partial |
| Denominal route surfaces | `src/ui/state.js`, `src/ui/rendering/rendering.js`, generation/preterit path | Sustantivo to verbo composer board, route rails | 54-55 partial |

## Implemented Lessons

| Lesson | Motor status | Actual motor | UI surface | Caveat |
|---:|---|---|---|---|
| 5 | implemented | VNC generation, agreement, preterit, diagnostic formula slots and valency frame metadata | Main conjugator | Richer explanatory formula UI is still separate. |
| 6 | implemented | VNC generation, object agreement, diagnostic subject/object valency frame metadata | Main conjugator object controls | No dedicated lesson screen. |
| 7 | implemented | Preterit class engine A/B/C/D and diagnostic class profile | Preterit tabs/output | Richer reference UI is still separate. |
| 20 | implemented | Nonactive derivation | Nonactive tabs | Loaded and reachable. |
| 21 | implemented | Passive via nonactive + valency plus diagnostic derived voice metadata | Nonactive/passive output | Not separate lesson UI. |
| 22 | implemented | Impersonal via nonactive + valency plus diagnostic derived voice metadata | Nonactive/passive output | Not separate lesson UI. |
| 23 | implemented | Object allomorphy and valency | Object controls/output | Not separate lesson UI. |
| 24 | implemented | Type 1 causative/destockal plus diagnostic forward derivation metadata | Causative controls | No longer counted as pending in the curriculum map. |
| 25 | implemented | Type 2 causative plus diagnostic forward derivation metadata | Causative controls | No longer counted as pending in the curriculum map. |
| 26 | implemented | Applicative derivation plus diagnostic forward derivation metadata | Applicative control | No longer counted as pending in the curriculum map. |

## Partial Lessons With Callable Support

| Lesson | What exists | Main surface | Missing from full lesson scope |
|---:|---|---|---|
| 2 | Modern phonology and syllabification support | Parser/rendering support | Andrews/Classical orthography, vowel length, and spelling conventions are not fully modeled. |
| 8 | VNC mechanics, agreement, opt-in sentence-layer metadata | Main conjugator, diagnostic module/tests | Sentence generation: negation, questions, emphasis. |
| 9 | Finite optative VNC tense/form support plus opt-in sentence-mood metadata | Tense tabs/output, diagnostic module/tests | Full optative wish/command/exhortation sentence engine. |
| 10 | Finite admonitive VNC tense/form support plus opt-in sentence-mood metadata | Tense tabs/output, diagnostic module/tests | Full admonition sentence engine. |
| 11 | Current Nawat suppletive subset | Main conjugator | Andrews irregular perfectives, defective verbs, and tense-meaning shifts. |
| 12 | Derived nominal/NNC outputs | Sustantivo tab | Full absolutive NNC paradigm engine. |
| 13 | Possessive prefix accepted in nominal outputs | Sustantivo tab, possessor controls | Full possessive-state NNC paradigm and possessor lesson surface. |
| 14 | Nounstem suffix heuristics and nominal routes | Composer, sustantivo route surfaces | Dedicated nounstem class engine. |
| 27 | Frequentative boundary metadata | Diagnostic module/tests | Confirmed Nawat/Pipil frequentative data and generation. |
| 28 | Compound/verbal embed parsing plus diagnostic compound frame metadata | Verb composer/parser, generated row labels | Full compound VNC generator and dedicated compound engine. |
| 29 | Purposive/directional boundary metadata | Diagnostic module/tests | Confirmed purposive VNC data and generation. |
| 30 | Compound/nominal embed parsing | Verb composer/parser | Full nominal embed generation. |
| 31 | Compound NNC boundary metadata | Diagnostic module/tests | Confirmed compound nounstem data and generation. |
| 32 | Affective NNC boundary metadata | Diagnostic module/tests | Confirmed affective NNC data and generation. |
| 33 | Honorific/pejorative VNC boundary metadata | Diagnostic module/tests | Confirmed honorific/pejorative VNC data and generation. |
| 34 | Numeral NNC boundary metadata | Diagnostic module/tests | Confirmed numeral NNC data and generation. |
| 35-39 | Verb-derived nominal surfaces plus nominalization/patientive boundary metadata; current s/lis active-action motor | Sustantivo tab, diagnostic module/tests | Confirmed ownerhood data, complete z/liz fixture coverage, and complete patientive-family generation. |
| 40-41 | Adjectival nominal outputs plus adjectival NNC function boundary metadata | Adjetivo tab, diagnostic module/tests | Dedicated adjectival NNC engine and complete adjective-function model. |
| 42-43 | Adjectival modification boundary metadata | Diagnostic module/tests | Confirmed modifier/head clause examples and modification AST. |
| 44 | Adverbial nuclear-clause boundary metadata plus diagnostic adverbio source frame | Diagnostic module/tests, legacy adverbio output labels | Full adverbial NNC/VNC data, schema, and generation. |
| 45-47 | Relational NNC boundary metadata plus locativo-temporal evidence-boundary frame | Diagnostic module/tests, locativo-temporal output labels | Confirmed relational NNC data, schema, and generation. |
| 48 | Place/gentilic NNC boundary metadata plus locativo-temporal evidence-boundary frame | Diagnostic module/tests, locativo-temporal output labels | Confirmed place-name/gentilic NNC data, schema, and generation. |
| 49-50 | Adverbial-adjunction boundary metadata plus generated-word evidence-boundary frame | Diagnostic module/tests, adverbio/locativo output labels | Confirmed adjoined-unit data and clause-adjunction AST. |
| 51 | Complement boundary metadata | Diagnostic module/tests | Confirmed complement-clause data and AST. |
| 52 | Conjunction boundary metadata | Diagnostic module/tests | Confirmed conjunction data and AST. |
| 53 | Comparison boundary metadata | Diagnostic module/tests | Confirmed comparison data and AST. |
| 54-55 | Denominal route profiles and conversion rails | Sustantivo to verbo composer board, route controls | Dedicated denominal module and full suffix-family coverage. |
| 56 | Personal-name NNC boundary metadata | Diagnostic module/tests | Confirmed personal-name NNC data, schema, and generation. |
| 57-58 | Textual-analysis/miscellany boundary metadata | Diagnostic module/tests | Confirmed textual examples and analysis AST. |

## Not Counted As Existing Motors

These may have adjacent modules or boundary metadata, but no full generation/data motor was found for the listed scope:

| Lessons | Missing motor |
|---|---|
| 15-16 | Full NNC possession/pronominal NNC engine and data. |
| 17-19 | Supplementation or syntax engine. |
| 27 | Frequentative derivation generation; boundary metadata exists. |
| 29 | Purposive VNC generation; directional/purposive boundary metadata exists. |
| 31-32 | Compound/affective NNC generation; boundary metadata exists. |
| 33 | Honorific/pejorative VNC generation; boundary metadata exists. |
| 34,D | Numeral NNC generation; boundary metadata exists. |
| 35-39 | Ownerhood, complete z/liz fixture coverage beyond current s/lis active-action generation, and complete patientive-family generation; boundary metadata exists. |
| 42-43 | Clause/modification AST generation; boundary metadata exists. |
| 44 | Full adverbial NNC/VNC generation; boundary metadata and one legacy adverbio surface exist. |
| 45-47 | Relational NNC fixture data/generation; boundary metadata exists. |
| 48 | Place/gentilic NNC fixture data/generation; boundary metadata exists. |
| E | Calendar-name fixture data/generation; boundary metadata exists. |
| 49-50 | Adverbial-adjunction data/AST; boundary metadata exists. |
| 51 | Complement data/AST; boundary metadata exists. |
| 52 | Conjunction data/AST; boundary metadata exists. |
| 53 | Comparison data/AST; boundary metadata exists. |
| 56 | Personal-name NNC data/generation; boundary metadata exists. |
| 57-58 | Textual-analysis data/AST; boundary metadata exists. |

Important absent module families:

- No full clause/sentence syntax engine beyond current diagnostic shell and sentence-layer metadata.
- No full adverbial NNC/VNC engine beyond current diagnostic boundary metadata and legacy adverbio surface.
- No modification AST generation beyond current diagnostic boundary metadata.
- No full comparison AST generation beyond current diagnostic boundary metadata.
- No relational-NNC, place/gentilic NNC, calendar-name, personal-name NNC, adverbial-adjunction, complement, conjunction, comparison, or textual-analysis fixture/data-generation engine, and no ownerhood, complete z/liz fixture coverage beyond the current s/lis active-action motor, affective-NNC, complete patientive-family, or numeral-NNC fixture data/generation engine.
- No purposive generation engine and no honorific/pejorative fixture data or generation engine.
- `src/core/derivation/derivation.js` is a placeholder; real derivation work lives in `source_model`, `forward_runtime`, `nonactive`, allomorphy, generation, and static rules.
- `src/core/orthography/orthography.js` now records diagnostic bridge metadata; real orthography-adjacent behavior remains mostly phonology/parser/allomorphy.

## Appendices

| Appendix | Status | Motor reality |
|---|---|---|
| A VNC Paradigms | implemented | Main VNC/agreement/preterit generator. |
| B NNC Paradigms | partial | NNC/nominal output exists, but full NNC paradigms are incomplete. |
| C Object Pronoun Combinations | implemented | Agreement/combo validation and VNC output. |
| D Numeral NNCs | partial | Numeral-NNC boundary metadata exists; no data or generation motor. |
| E Calendar names | partial | Calendar-name boundary metadata exists; no data or generation motor. |
| F Older spelling | partial | Diagnostic older/Classical spelling bridge metadata exists; no old-spelling normalizer or fixture-backed alias data. |
| G Suggested ... | placeholder | Title/content incomplete in registry. |

## Test Coverage Notes

The tests do not reference lesson ids directly. Mapping is inferred from registry dependencies and engine areas.

Strong executable coverage exists for phonology, agreement, combo validation, VNC generation, preterit, the current Nawat irregular subset, derivation/nonactive, parsing, state/routes, search, and surface output.

Weak or indirect coverage:

- `nnc.test.js` and `orthography.test.js` now carry direct ordinary-NNC and orthography-bridge coverage. `output.test.js` remains lighter surface-output coverage.
- Lessons 12-14 now have direct ordinary-NNC metadata/API coverage plus generated nominal/patientivo/possessive coverage.
- Lessons 9-10 are represented by VNC/static mode support, but focused optative/admonitive assertions were not found.

Last observed verification from this workstream:

- `npm test`: 1085/1085 assertions passed across 41 suites, including registry and boundary-metadata suites.
- `npm run test:module`: 1085/1085 assertions passed across 41 suites in module runtime.
- `npm run test:regression`: 12/12 intransitive-final-`i` causative regression cases passed.
- `node scripts/check_grammar_data.js`: 21 JSON files, `basic-data.csv` 2540 rows, `data.csv` 320 rows, 188 allowlisted exceptions.
