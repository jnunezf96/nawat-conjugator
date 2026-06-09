# Andrews Layer LCM

Source digests:

- `docs/ANDREWS_PDF_DIGEST.md`
- `docs/ANDREWS_SECTION_DIGEST.md`

Purpose: extract the smallest complete layer stack that can cover every Andrews lesson/section without turning the app into one engine or one control per lesson.

`LCM` here means least common multiple, not least common denominator: the minimal shared architecture that is still large enough to contain all Andrews categories, dependencies, source gates, and UI states.

## LCM Layer Stack

### 1. Authority And Evidence

Role: decide what may govern a rule, spelling, fixture, or diagnostic.

- Andrews PDF: grammar architecture authority for categories, slot order, dependencies, and boundaries.
- Nawat/Pipil evidence: spelling, lexical examples, confirmed surfaces, and exceptions.
- Repo/user data: current implementation evidence, explicit user-provided Nawat forms, and known pending gaps.
- Digest files: navigation and memory indexes only; they never replace direct PDF verification.

Engine contract:

- Every generated or routed output needs `authority`, `sourceEvidence`, and `evidenceStatus`.
- Unsupported paths are retained as diagnostics, not silently generated.

UI contract:

- Show whether a row is Andrews-backed, Nawat-backed, diagnostic-only, pending evidence, or unsupported.

### 2. Orthography And Sound Realization

Role: convert grammar-rule spellings into Nawat/Pipil spelling surfaces only after the rule layer is known.

- Classical rule spellings such as `z/liz`, `hui`, `hua`, `lo-hua`, `o-a`, `i-hui`, `c`, and `x` are structural inputs.
- Nawat/Pipil surfaces come through `convertClassicalLettersToNawat()` / `getClassicalLettersAsNawat()` and Nawat evidence.
- Phonology, assimilation, elision, vowel length, glottal stop, and old spelling conventions are diagnostic unless the app has confirmed output data.

Engine contract:

- Keep `classicalRuleSpelling`, `nawatRuleSpelling`, and `surface` distinct.
- Do not store Classical examples as Nawat fixture output.

UI contract:

- When useful, show rule spelling and output spelling as separate chips/labels.

### 3. Linguistic Unit Inventory

Role: identify what kind of unit the app is handling before choosing a formula or route.

Core unit families:

- Particle.
- VNC.
- Ordinary NNC.
- Pronominal NNC.
- Numeral NNC.
- Relational NNC.
- Place-name/gentilic NNC.
- Personal-name NNC.
- Calendar/name diagnostics.
- Clause unit / multi-nucleus unit.
- Textual/miscellaneous diagnostic unit.

Engine contract:

- `unitKind` must be separate from UI mode names.
- Do not route pronominal, numeral, relational, place/gentilic, or personal-name material through ordinary NNC generation unless a specific contract exists.

UI contract:

- Input controls should first clarify the unit family, then expose only the controls that family can actually use.

### 4. Morph And Boundary Atoms

Role: represent the smallest structural pieces Andrews uses to explain grammar.

Atoms:

- Morph/morpheme.
- Regular zero and irregular square-zero.
- Prefix, suffix, infix-like position, and dyad.
- `#...#` nuclear-clause boundary.
- Stem boundary and parenthesized predicate.
- `+` slot boundary.
- Matrix/embed boundary.
- Source/target boundary.

Engine contract:

- Store formulas as structured slots and boundaries, not as display strings.
- Keep predicate material inside its boundary; keep connectors and subject/object material outside unless Andrews says otherwise.

UI contract:

- Formula displays are derived from structured slots.
- Boundary labels should explain roles without pretending to be generation logic.

### 5. Stem Core

Role: represent the internal object that derivation, compounding, and nominalization operate on.

Stem dimensions:

- Root, stock, base stem, use stem.
- Verbstem, nounstem, pronominal stem, numeral stem, relational stem.
- Matrix and embed.
- Source stem and target stem.
- Class and subclass.
- Final segment/source-final condition.
- Restricted-use vs general-use stem.
- Possessive vs absolutive stem state where stem shape changes.

Engine contract:

- `stemFrame` should carry `stemKind`, `sourceKind`, `class`, `subclass`, `finalProfile`, `matrix`, `embed`, and `useStatus`.
- Source stem and output surface are different fields.

UI contract:

- The user should be able to see whether an output is using a predicate stem, generated stem, source stem, matrix, or embed.

### 6. Nuclear Clause Shell

Role: put stems into VNC or NNC formulas.

VNC shell:

- Subject.
- Object/valence.
- Predicate stem.
- Tense/mood.
- Number connector.

Ordinary NNC shell:

- `#pers1-pers2(STEM)num1-num2#`.
- Predicate stem inside parentheses.
- Subject connectors outside parentheses.
- State belongs to predicate, not connector.
- No tense slot.

Other NNC shells:

- Possessive-state NNC.
- Pronominal NNC.
- Numeral NNC.
- Relational/place/name NNC.

Engine contract:

- VNC and NNC shell objects should be parallel but not identical.
- A route cannot borrow VNC tense or object slots for an NNC unless Andrews states a transformation into VNC.

UI contract:

- The three-stage UI should remain source shell -> route/category controls -> generated output.

### 7. Participant, Agreement, State, And Valence

Role: model the people/things and agreement behaviors attached to the shell.

Dimensions:

- Subject person and number.
- Object person/number/specificity.
- Mainline vs shuntline object.
- Projective vs reflexive.
- Possessor person and number.
- Animate, nonanimate, human, nonhuman.
- Singular, plural, common/distributive/reference categories.
- Absolutive/possessive state.
- Valence count and ordered valence positions.

Engine contract:

- `participantFrame` and `valenceFrame` must exist independently of generated spelling.
- Multi-object routes require ordered object-role metadata, not independent toggles.

UI contract:

- Controls should disable or mark impossible participant/state combinations before generation.

### 8. Inflection, Mood, Voice, And Paradigms

Role: generate or display inflectional variation once a source shell and stem contract are valid.

Families:

- Indicative tenses.
- Optative.
- Admonitive.
- Passive.
- Impersonal.
- Nonactive.
- NNC state/number paradigms.
- Appendix A/B/C paradigm references.

Engine contract:

- `inflectionFrame` should carry tense/mood/voice/state plus class-conditioned allomorphy.
- Sentence force such as wish, command, warning, question, and negation is separate from raw finite word generation.

UI contract:

- Paradigm views can be generated, but sentence-level meaning should be diagnostic unless a clause model is active.

### 9. Derivational Route Contracts

Role: transform one valid source into a derived target only when Andrews' source requirements are satisfied.

Route families:

- Nonactive.
- Passive and impersonal.
- Causative.
- Applicative.
- Frequentative.
- Compound VNC/NNC.
- Nominalization.
- Deverbal nounstem.
- Patientive families.
- Adjectival NNC/function.
- Denominal verbstem.
- Honorific/pejorative.
- Purposive.
- Instrumentive/action/agentive routes.

Engine contract:

- Every route needs `sourceContract`, `targetContract`, `routeFamily`, `routeStage`, `generationAllowed`, and `blockingDiagnostics`.
- Source-limited routes may preview targets but cannot execute until evidence and required slots are supplied.
- Generated output can become later source evidence only if Andrews permits that chain and metadata records the bounded evidence.

UI contract:

- Route chips are not just buttons. They must show whether the source is satisfied, missing, ambiguous, or Nawat-only.

### 10. Composition And Clause AST

Role: represent structures larger than a single nuclear clause or a single stem.

AST families:

- Compound stem: matrix/embed.
- Supplementation.
- Topicalization.
- Vocative.
- Adjectival modification.
- Adverbial nuclear clause.
- Relational usage options.
- Place-name/gentilic source units.
- Adverbial adjunction.
- Complementation.
- Conjunction.
- Comparison.
- Personal-name source units.
- Textual/miscellaneous constructions.

Engine contract:

- `astFrame` should compose supplied surfaces/frames and record roles, order, scope, recursion, and source links.
- AST frames do not create new word forms unless a separate route/generation contract exists.

UI contract:

- Clause/composition panels should display structure and diagnostics without pretending to be a word generator.

### 11. Output, Provenance, And Continuation

Role: store what the app produced, why it produced it, and what it may become next.

Output dimensions:

- Surface.
- Segmented surface.
- Formula slots.
- Source input.
- Source evidence.
- Route provenance.
- Andrews section references.
- Nawat evidence references.
- Next-source eligibility.
- Continuation candidates.
- Executed chain vs preview-only chain.

Engine contract:

- `resultFrame` should never be just `{ surface }`.
- `preview` and `execute` must remain separate.
- A selected output can be promoted into a new source only through explicit provenance-preserving actions.

UI contract:

- `#3 SALIDA` should be the living surface for output composition, continuation, provenance, and diagnostics.

### 12. Diagnostics, Curriculum, And Review State

Role: keep unimplemented Andrews material visible without corrupting generation.

Status dimensions:

- Implemented.
- Partial.
- Diagnostic-only.
- Source-evidence missing.
- Nawat/Pipil evidence missing.
- Andrews-backed but not executable yet.
- Nawat-only route.
- Unsupported/conflicting old behavior.
- Ambiguous spelling/source.
- Needs direct PDF recheck.

Engine contract:

- Diagnostics are first-class data, not throwaway strings.
- Unsupported behavior should be blocked or marked deprecated instead of hidden.

UI contract:

- The all-lesson map is a status/evidence index.
- It should navigate grammar categories and blockers, not create one control per Andrews section.

## Layer Dependencies

The engine should evaluate layers in this order:

1. Authority/evidence.
2. Unit kind.
3. Orthography bridge.
4. Morph/boundary frame.
5. Stem core.
6. Nuclear shell.
7. Participant/state/valence.
8. Inflection or route source contract.
9. Route execution or AST composition.
10. Output/provenance.
11. Diagnostics/curriculum status.

This dependency order prevents the common failures:

- Classical form copied into Nawat output.
- NNC state treated as VNC tense.
- Subject connector placed inside predicate parentheses.
- Pronominal/relational/numeral/name NNCs forced through ordinary NNC.
- Clause-level supplementation/modification/conjunction treated as one generated word.
- Route preview treated as finite generation.
- Generated surface reused as evidence without provenance.

## Lesson Group Coverage Matrix

| Lessons | Dominant layers | Implementation stance |
| --- | --- | --- |
| 1-4 | 1-6, 12 | Foundation: terms, orthography, particles, formulas. |
| 5-11 | 5-8, 11-12 | VNC generation plus sentence/mood diagnostics. |
| 12-16 | 3-7, 11-12 | NNC shells, state, noun classes, pronominal boundary. |
| 17-19 | 7, 10, 12 | Supplementation and topic AST before generation. |
| 20-27 | 5, 7-9, 11-12 | Derived VNC source/target routes. |
| 28-34 | 5, 9-10, 12 | Compound and numeral structure with guarded generation. |
| 35-41 | 5-11 | Nominalization, patientive, adjectival function, continuation. |
| 42-43 | 10, 12 | Adjectival modification AST, non-generative by default. |
| 44-50 | 3, 5, 10, 12 | Adverbial/relational/place/gentilic diagnostics and AST. |
| 51-53 | 10, 12 | Complement, conjunction, comparison AST/diagnostics. |
| 54-55 | 5, 7, 9, 11-12 | Denominal routes with source-evidence gates. |
| 56-58 | 3, 10, 12 | Names, miscellany, textual diagnostics. |
| Appendices A-C | 7-8, 11 | Paradigm and object-combination validation. |
| Appendices D-F | 2-3, 7, 12 | Numerals, calendar/name data, old-spelling diagnostics. |

## HTML/CSS/JS Projection

HTML should expose stable regions for the LCM layers:

- `book-map`: curriculum/status/evidence index.
- `source`: unit kind, source input, source evidence.
- `grammar controls`: shell, slots, participants, state, valence, route source contracts.
- `output`: generated rows, previews, continuations, provenance.
- `diagnostics`: blockers, ambiguity, pending sections, unsupported claims.

CSS should encode layer readability:

- Use compact, consistent chips for authority, evidence, route state, and diagnostics.
- Keep all-lesson navigation dense enough for Andrews 1-58.
- Avoid visual designs that hide source gates or make preview look like generation.
- Reserve strong emphasis for current source, selected route, generated output, and hard blockers.

JS should encode layer contracts:

```js
{
  authorityFrame,
  unitFrame,
  orthographyFrame,
  morphBoundaryFrame,
  stemFrame,
  nuclearClauseFrame,
  participantFrame,
  inflectionFrame,
  routeContract,
  astFrame,
  resultFrame,
  diagnosticFrame
}
```

Each frame should be independently testable. Rendering should consume these frames rather than reverse-engineering grammar from labels.

## Immediate Design Consequence

The best app shell is not:

- one mode per lesson,
- one button per Andrews section,
- one static fixture per example,
- one output string per route.

The best app shell is:

- one Andrews-indexed curriculum map,
- one source/evidence intake,
- one category/slot/route control surface,
- one output/provenance/continuation surface,
- one diagnostic/status layer,
- and reusable engine frames that can serve any lesson section after the PDF wording and Nawat evidence are verified.
