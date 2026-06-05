# Lesson Motor Inventory

Date: 2026-06-04

Scope: gather the lessons that already have a motor in the current website. Nine read-only agents inspected lesson ranges, UI/runtime wiring, and tests. This report consolidates those findings against `src/lessons/registry.js`, `src/appendices/registry.js`, loaded core modules, and executable tests.

## Summary

Registry counts:

| Status | Count | Lesson ids |
|---|---:|---|
| implemented | 10 | 5, 6, 7, 20, 21, 22, 23, 24, 25, 26 |
| partially implemented | 19 | 2, 8, 9, 10, 11, 12, 13, 14, 28, 30, 35, 36, 37, 38, 39, 40, 41, 54, 55 |
| not mapped | 26 | 15, 16, 17, 18, 19, 27, 29, 31, 32, 33, 34, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 56, 57, 58 |
| placeholder | 3 | 1, 3, 4 |

Practical split:

| Tier | Lesson ids | Meaning |
|---|---|---|
| Strong website motors | 5, 6, 7, 20, 21, 22, 23, 24, 25, 26 | User-reachable motors, real modules, meaningful executable coverage. |
| Partial with useful callable motors | 2, 8, 9, 10, 11, 12, 13, 14, 28, 30, 35, 36, 37, 38, 39, 40, 41, 54, 55 | Usable or adjacent motor exists, but Andrews lesson scope is incomplete or the UI/docs need caveats. |
| No lesson motor yet | 15, 16, 17, 18, 19, 27, 29, 31, 32, 33, 34, 42-53, 56-58 | Registry/curriculum may mention dependencies, but no mapped lesson motor was found. |

## Active Motor Families

| Motor family | Main modules | UI surface | Lesson coverage |
|---|---|---|---|
| Phonology and shape analysis | `src/core/phonology/phonology.js` | Parser/rendering support, stem diagnostics | 2, plus support for 5-7 and derivations |
| VNC generation | `src/core/vnc/vnc.js`, `src/core/generation/engine.js`, `src/core/generation/morphology_engine.js` | Main verb entry, tense tabs, output table | 5, 6, 7, 8 partial, 9, 10, 23 |
| Agreement and objects | `src/core/agreement/agreement.js`, `src/core/agreement/combo_validation.js`, `src/core/generation/valency.js` | Subject/object toggles, object controls, masks | 5, 6, 8 partial, 13 partial, 23 |
| Preterit classes | `src/core/preterit/context.js`, `src/core/preterit/engine.js`, `src/core/preterit/api.js` | Universal preterit tabs and VNC output | 5, 7, also finite support for 54-55 |
| Irregular/suppletive VNCs | `src/core/irregulars/irregulars.js`, `data/static_suppletives.json`, `data/static_suppletive_paths.json` | Main conjugator output | 11 |
| Nonactive/passive/impersonal | `src/core/derivation/nonactive.js`, `src/core/derivation/source_model.js`, `src/core/derivation/forward_runtime.js`, `src/core/generation/valency.js` | Active/nonactive mode, nonactive suffix tabs | 20, 21, 22 |
| Causative and applicative | `src/core/vnc/allomorphy.js`, `src/core/derivation/forward_runtime.js`, `data/static_derivational_rules.json` | Direct/causative/applicative controls | 24, 25, 26 |
| Compound parsing | `src/core/parsing/parsing.js`, `src/core/derivation/source_model.js` | Verb composer, regex/parser input, normal output | 28 partial, 30 partial |
| Verb-derived nominal/NNC outputs | `src/core/nnc/nnc.js`, generation nominal profiles, agreement helpers | Sustantivo tab, patientivo/agentivo/instrumentivo outputs | 12-14 partial, 35-39 partial |
| Adjectival NNC outputs | `src/core/nnc/nnc.js`, generation nominal/adjective profiles | Adjetivo tab | 40-41 partial |
| Denominal route surfaces | `src/ui/state.js`, `src/ui/rendering/rendering.js`, generation/preterit path | Sustantivo to verbo composer board, route rails | 54-55 partial |

## Implemented Lessons

| Lesson | Motor status | Actual motor | UI surface | Caveat |
|---:|---|---|---|---|
| 5 | implemented | VNC generation, agreement, preterit | Main conjugator | Explanatory formula UI is still separate/missing. |
| 6 | implemented | VNC generation, object agreement | Main conjugator object controls | No dedicated lesson screen. |
| 7 | implemented | Preterit class engine A/B/C/D | Preterit tabs/output | Diagnostic/reference UI is weaker than motor. |
| 20 | implemented | Nonactive derivation | Nonactive tabs | Loaded and reachable. |
| 21 | implemented | Passive via nonactive + valency | Nonactive/passive output | Not separate lesson UI. |
| 22 | implemented | Impersonal via nonactive + valency | Nonactive/passive output | Not separate lesson UI. |
| 23 | implemented | Object allomorphy and valency | Object controls/output | Not separate lesson UI. |
| 24 | implemented | Type 1 causative/destockal | Causative controls | Curriculum still flags derivational audit work. |
| 25 | implemented | Type 2 causative | Causative controls | Curriculum still flags derivational audit work. |
| 26 | implemented | Applicative derivation | Applicative control | Curriculum still flags derivational audit work. |

## Partial Lessons With Callable Support

| Lesson | What exists | Main surface | Missing from full lesson scope |
|---:|---|---|---|
| 2 | Modern phonology and syllabification support | Parser/rendering support | Andrews/Classical orthography, vowel length, and spelling conventions are not fully modeled. |
| 8 | VNC mechanics and agreement | Main conjugator | Sentence layer: negation, questions, emphasis. |
| 9 | Finite optative VNC tense/form support | Tense tabs/output | Full optative wish/command/exhortation sentence engine. |
| 10 | Finite admonitive VNC tense/form support | Tense tabs/output | Full admonition sentence engine. |
| 11 | Current Nawat suppletive subset | Main conjugator | Andrews irregular perfectives, defective verbs, and tense-meaning shifts. |
| 12 | Derived nominal/NNC outputs | Sustantivo tab | Full absolutive NNC paradigm engine. |
| 13 | Possessive prefix accepted in nominal outputs | Sustantivo tab, possessor controls | Full possessive-state NNC paradigm and possessor lesson surface. |
| 14 | Nounstem suffix heuristics and nominal routes | Composer, sustantivo route surfaces | Dedicated nounstem class engine. |
| 28 | Compound/verbal embed parsing | Verb composer/parser | Full compound VNC generator and dedicated compound engine. |
| 30 | Compound/nominal embed parsing | Verb composer/parser | Full nominal embed generation. |
| 35-39 | Verb-derived nominal, agentive/patientive/instrumentive pieces | Sustantivo tab | Dedicated nominalization/deverbal/patientive modules and complete rule coverage. |
| 40-41 | Adjectival nominal outputs | Adjetivo tab | Dedicated adjectival NNC engine and complete adjective-function model. |
| 54-55 | Denominal route profiles and conversion rails | Sustantivo to verbo composer board, route controls | Dedicated denominal module and full suffix-family coverage. |

## Not Counted As Existing Motors

These may have general adjacent modules, but no mapped lesson motor was found:

| Lessons | Missing motor |
|---|---|
| 15-16 | Full NNC possession/pronominal NNC engine and data. |
| 17-19 | Supplementation or syntax engine. |
| 27 | Frequentative derivation. |
| 29 | Purposive VNC. |
| 31-34 | Compound NNC, affective NNC, honorific/pejorative VNC, numeral NNC. |
| 42-43 | Clause/modification AST. |
| 44-53 | Clause, relational, adverbial, place/gentilic, complement, conjunction, comparison engines. |
| 56-58 | Personal names, textual diagnostics, miscellany engines. |

Important absent module families:

- No `src/core/clause` directory.
- No `src/core/comparison`.
- No `src/core/nnc/relational`, `core/nnc/compound`, or `core/nnc/numerals`.
- No `src/core/vnc/purposive` or `src/core/vnc/honorific_pejorative`.
- `src/core/derivation/derivation.js` is a placeholder; real derivation work lives in `source_model`, `forward_runtime`, `nonactive`, allomorphy, generation, and static rules.
- `src/core/orthography/orthography.js` is a placeholder; real orthography-adjacent behavior is mostly phonology/parser/allomorphy.

## Appendices

| Appendix | Status | Motor reality |
|---|---|---|
| A VNC Paradigms | implemented | Main VNC/agreement/preterit generator. |
| B NNC Paradigms | partial | NNC/nominal output exists, but full NNC paradigms are incomplete. |
| C Object Pronoun Combinations | implemented | Agreement/combo validation and VNC output. |
| D Numeral NNCs | not mapped | No numeral NNC motor found. |
| E Calendar names | not mapped | No calendar engine found. |
| F Older spelling | not mapped | Orthography placeholder only; no old-spelling normalizer. |
| G Suggested ... | placeholder | Title/content incomplete in registry. |

## Test Coverage Notes

The tests do not reference lesson ids directly. Mapping is inferred from registry dependencies and engine areas.

Strong executable coverage exists for phonology, agreement, combo validation, VNC generation, preterit, the current Nawat irregular subset, derivation/nonactive, parsing, state/routes, search, and surface output.

Weak or indirect coverage:

- `nnc.test.js`, `orthography.test.js`, and `output.test.js` are placeholders.
- Lessons 12-14 are mostly indirectly covered through nominal/patientivo/possessive behavior, not a dedicated NNC suite.
- Lessons 9-10 are represented by VNC/static mode support, but focused optative/admonitive assertions were not found.

Last observed verification from this workstream:

- `npm test`: 529/529 assertions passed across 14 suites, including the new registry suite.
- `npm run test:module`: 529/529 assertions passed across 14 suites in module runtime.
- `npm run test:regression`: 12/12 intransitive-final-`i` causative regression cases passed.
- `node scripts/check_grammar_data.js`: 20 JSON files, `basic-data.csv` 2540 rows, `data.csv` 320 rows, 188 allowlisted exceptions.
