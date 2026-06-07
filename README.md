# Nawat Conjugator

A browser-based conjugation engine for Nawat (Pipil), a Uto-Aztecan language of El Salvador. Given a verb stem and grammatical parameters, the engine generates inflected surface forms for the implemented tense, person, voice, and valence motors.

---

## Running the app

Open `index.html` in a browser. No build step, no server required. All data files are loaded via `fetch` from the `data/` directory, so a local file server is needed if the browser blocks local XHR (e.g. `python3 -m http.server 8080`).

---

## Phonology

Nawat has four vowels: **a e i u**. Consonants: **p t k m n s l w y j c z d**, plus five digraphs: **tz sh ch kw nh**.

Valid syllable forms are: **C CV CVj CVl V Vj Vl** (where C = any consonant onset, V = any vowel nucleus, j/l = coda glides).

### Coda assimilation

Three phonotactic rules apply to coda consonants before any onset C or at word boundary:

| Coda | Environment | Result | Example |
|---|---|---|---|
| m | before C or word-finally | → n | `tem+ki` → `tenki` |
| kw | before C or word-finally | → k | `kw` reduces |
| y | before C or word-finally | → sh (or s near sibilant) | coda shift |

These are implemented as a single regex pattern built from `VALID_CONSONANTS`, not as case-by-case rules.

---

## Grammar

### VNC formula

The basic verb form is a **Verb-Noun Complex (VNC)**:

```
[subject prefix] [object prefix] [stem] [tense suffix]
```

Examples: `ni-ki-chiwa` (I make it), `ti-ki-chiwat` (we make it), `ni-ki-chiwa-k` (I made it).

The engine also exposes diagnostic VNC formula slots for subject, object, predicate, and tense. These slots power the `Formula VNC` teaching echo; they do not generate forms. Generated VNC rows may also carry a diagnostic `vncValencyFrame` that explains intransitive/transitive frame, subject slot, object slot, and base object prefix before surface allomorphy.
Nonactive/passive/impersonal rows may also carry diagnostic `derivedVoiceFrame` metadata for derived voice and source-to-target valency; it is explanatory only.
Causative/applicative rows may carry diagnostic `forwardDerivationFrame` metadata for derived stem and source-to-derived valency; it is also explanatory only.
Accepted compound VNC inputs may carry diagnostic `compoundFrame` metadata for matrix and embedded pieces; it is derived from parser metadata and does not change output.
Legacy adverbio rows may carry diagnostic `adverbialNuclearFrame` metadata for Lesson 44 source VNC and manner-surface scope; it does not change output or complete the adverbial clause engine.
Generated locativo-temporal nominal rows may carry diagnostic `relationalNncBoundaryFrame` metadata to mark the Lessons 45-47 relational boundary; it explicitly says the current row is not confirmed relational-NNC fixture evidence.
Those same rows may carry diagnostic `placeGentilicNncBoundaryFrame` metadata for Lesson 48; it explicitly separates locative-temporal output from confirmed place-name or gentilic fixture evidence.
Legacy adverbio and locativo-temporal rows may also carry diagnostic `adverbialAdjunctionBoundaryFrame` metadata for Lessons 49-50; it marks single generated words as not confirmed clause-adjunction evidence.

### NNC formula

NNC means **Nominal Nuclear Clause**. It is a nominal predicate clause, not just a noun wordform table.

```
absolutive state: [subject prefix] [noun stem + absolutive state]
possessive state:  [subject prefix] [possessor prefix + noun stem/possessive state]
```

### Preterit classes

Preterit formation varies by stem class:

| Class | Stem shape | Rule | Example |
|---|---|---|---|
| A | General | Standard preterit suffix | — |
| B | General | Standard preterit suffix | — |
| C | Ends in two vowels/nuclei | j **replaces** final vowel | `nemia` → `nemij`, `nemua` → `nemuj` |
| D | Monosyllabic, vowel-final | j **appended** after nucleus | `ki` → `kij`, `mu` → `muj` |

The rule is: **j never appears after a consonant onset**. It only appears after a vowel/nucleus — replacing it (Class C) or following it (Class D).

Preterit class provenance also exposes diagnostic `verbstemClassProfile` metadata, which rendering can show as `Clase de tronco`. This is explanatory metadata; the preterit generator remains the source of forms.

Sentence-layer diagnostics for polarity, question, emphasis, and mood can be attached only by explicit override. Rendering may show them as `Capa oracional`; they do not generate sentence particles or change finite VNC output.

### Derivation

The engine supports:

- **Causative** (Type 1 and Type 2 — TIA/WIA/LIA patterns)
- **Applicative**
- **Passive** and **Impersonal** (via nonactive derivation)
- Limited **denominal route** surfaces

### Suppletive stems

The current Nawat suppletive subset covers **kati** (to be), **yawi** (to go), **witzi** (to come), and **weya** (to pass). Andrews lesson 11 is broader than this subset and remains partially mapped.

---

## Data

All linguistic data lives in `data/`. The engine loads it at startup; all `data/` values are stable constants after that point (`SCREAMING_SNAKE` in code).

| File | Contents |
|---|---|
| `basic-data.csv` | 2,540-row verb stem lexicon with preterit and perfect forms |
| `static_phonology.json` | Vowels, consonants, digraphs, syllable forms, directional prefixes |
| `static_constants.json` | Tense order, conjugation groups, preterit class detail |
| `static_labels.json` | Spanish and Nawat UI labels for persons, tenses, voices |
| `static_modes.json` | Tense/mode definitions and combinations |
| `static_options.json` | Toggle options: object, subject, possessor, patientivo |
| `static_orders.json` | Display ordering for tenses, tabs, preterit classes |
| `static_rules.json` | Tense suffix rules |
| `static_derivational_rules.json` | Causative, applicative, and other derivational morphology |
| `static_allomorphy_rules.json` | Nonspecific object allomorphy rules |
| `static_directional_rules.json` | Directional prefix behavior |
| `static_suppletives.json` | Suppletive stem paradigms (kati, yawi, witzi, weya) |
| `static_suppletive_paths.json` | Suppletive stem path configuration |
| `static_parse_rules.json` | Input parsing regex and token rules |
| `static_phonology.json` | Phonotactic and surface assimilation rules |
| `static_misc.json` | Miscellaneous configuration |
| `static_groups.json` | Verb and noun grouping metadata |
| `static_redup.json` | Reduplication patterns |
| `static_valence_neutral.json` | Valence-neutral affix configuration |

---

## Implementation status

Based on the 58-lesson curriculum in `src/lessons/registry.js`:

| Status | Count |
|---|---|
| Implemented | 10 |
| Partially implemented | 43 |
| Not mapped | 5 |
| Placeholder (no conjugation content) | 0 |

Strong implemented motor areas include intransitive and transitive VNC form generation, preterit class mechanics, object-prefix/allomorphy handling, causative/applicative stem generation, passive/impersonal/nonactive form generation, and the current Nawat suppletive subset.

Partial Andrews mappings include Classical orthography, sentence-level optative/admonitive constructions, the full irregular VNC taxonomy, full NNC paradigms, compound-source roles, frequentative, purposive/directional boundary metadata, compound/affective NNC boundary metadata, honorific/pejorative VNC boundary metadata, numeral-NNC boundary metadata, nominalization/deverbal/patientive boundary metadata, adjectival NNC function boundary metadata, adjectival-modification boundary metadata, adverbial nuclear-clause boundary metadata, relational-NNC boundary metadata, place/gentilic NNC boundary metadata, calendar-name boundary metadata, adverbial-adjunction boundary metadata, complement/conjunction/comparison boundary metadata, personal-name NNC boundary metadata, textual-analysis boundary metadata, and lesson 54-55 denominal route classes.

Not yet mapped: natural/required possession, pronominal NNCs, supplementation/topic, frequentative generation, purposive generation, compound/affective NNC generation, ownerhood and complete z/liz fixture coverage, complete patientive-family generation, honorific/pejorative VNC generation, numeral-NNC generation, complete adjectival NNC function generation, adjectival-modification AST generation, full adverbial clause generation, relational NNC data/generation, place/gentilic NNC data/generation, calendar-name data/generation, adverbial-adjunction data/AST, complement/conjunction/comparison data/AST, personal-name NNC data/generation, and textual-analysis data/AST.

---

## Architecture

The engine is organized as global-scope modules loaded in dependency order. No `type="module"` — each file declares functions and variables directly on the global object. This preserves compatibility with the existing `pret_universal_*.js` files and with the Node.js `vm_harness.js` test runner.

```
data/               JSON + CSV linguistic data (single source of truth)
src/
  core/             Pure grammar — no DOM, no UI state
    phonology/      Syllabification, phonotactics, syllable form validation
    agreement/      Person/number mapping, prefix selection, label helpers
    parsing/        Input parser, verb decomposition, disambiguation ranking
    irregulars/     Suppletive stems: kati, yawi, witzi, weya
    preterit/       Preterit class engine (A/B/C/D) and context resolver
    output/         Surface chain realization, coda assimilation rules
    vnc/            VNC generation, nonspecific object allomorphy (~10k lines)
    nnc/            NNC generation, nominalization
    derivation/     Causative, applicative, passive, impersonal
  ui/               DOM-dependent code
    state.js        Toggle state, mode accessors, preterit bridge
    composer/       Interactive verb builder
    panels/         Tab/panel navigation
    rendering/      Conjugation table DOM rendering
    export/         CSV export
    i18n/           Spanish/Nawat label switching
    events.js       All event listeners and init wiring
  lessons/          Curriculum metadata (58-lesson registry)
  appendices/       Appendix reference descriptors (A–G)
  tests/            Unit test suites
script.js           Configuration, data loading, remaining runtime state
```

### Dependency direction

```
data/
  ↓
core/phonology, core/output
  ↓
core/agreement, core/parsing, core/irregulars
  ↓
core/preterit, core/vnc, core/nnc, core/derivation
  ↓
ui/*
```

No core module may call into `ui/`. Cross-file calls resolve at runtime via global scope — safe inside function bodies, not safe at top-level initializer time.

### Load order

`index.html` loads files with `defer` in this order:

1. `src/core/phonology` → `agreement` → `irregulars` → `output` → `parsing`
2. `src/core/vnc/allomorphy` → `nnc` → `vnc`
3. `src/core/preterit/context` → `engine`
4. `src/ui/i18n` → `panels` → `export` → `state` → `rendering` → `composer`
5. `script.js`
6. `src/lessons/registry` → `src/appendices/registry`
7. `src/ui/events.js`

---

## Naming conventions

Capitalization encodes what kind of thing a name refers to. Each category has exactly one pattern.

| Pattern | Category | Rule |
|---|---|---|
| `C`, `V` | Phonological category marker | Single uppercase letter. Abstract linguistic unit in pattern notation (standard phonological convention). |
| `SCREAMING_SNAKE` | Stable constant | `Object.freeze` enums, data populated once at startup from JSON/CSV and never mutated after, regex literals, numeric/string config values. |
| `PascalCase` | Mutable global state | Objects, maps, sets, and scalars that change during app lifetime in response to user events, render cycles, or search operations. |
| `camelCase` | Functions and local variables | All function declarations and function-scoped variables. |
| `_camelCase` | Module-private lazy/cached values | Internal implementation details not part of the module's API; typically null-initialized and set once on first use. |

The key distinction between `SCREAMING_SNAKE` and `PascalCase`:

- `SCREAMING_SNAKE` — *stable*: frozen by `Object.freeze`, or set once at startup and never touched again. This value will not change.
- `PascalCase` — *live*: changes during the app's lifetime. This may have been mutated since the page loaded.

```js
// Phonological category marker — abstract unit, not a value
var C = "";           // consonant character class (built lazily from VALID_CONSONANTS)

// Stable constants
var VALID_CONSONANTS = new Set();           // populated at startup, never mutated after
var DERIVATION_TYPE  = Object.freeze({…}); // frozen enum
var VOWEL_RE         = /[aeiu]/;           // regex literal

// Mutable global state
var ToggleLockState       = { enabled: false };
var ObjectToggleState     = new Map();
var SilentGenerationCache = new Map();
var VerbInputRefreshTimer = null;

// Functions and local variables
function buildCodaRe(target) { … }

// Module-private lazy cache
var _codaReKw = null;
```

---

## Tests

```sh
npm run check:data       # grammar data consistency guard for data/*.json and lexicon CSVs
npm test                  # all unit suites (src/tests/)
npm run test:morphology   # morphology audit via vm_harness
npm run test:regression   # intransitive-i causative regression
```

`npm test` runs `check:data` first, then the headless unit suites. The data check keeps tense IDs, labels, display groups, rule references, phonology references, person/object options, and lexicon CSV shape synchronized as the grammar data grows.

Known grammar-data exceptions live in `scripts/grammar_data_allowlist.json`. Current duplicate lexicon keys, cross-file lexicon overlaps, separator rows, and missing lexicon references must stay listed there. Any new unlisted exception fails `check:data`; if an exception is cleaned up, remove it from the allowlist in the same change.

Tests run headlessly via `scripts/lib/vm_harness.js`, which loads the full module stack into a Node.js VM context with a fake DOM. UI modules that depend only on DOM stubs are included; modules that require live browser APIs are excluded.
