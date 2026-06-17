# Operation ApplyMorphologyRules Audit

**Date:** 2026-06-15
**Scope:** `applyMorphologyRules(...)` and its direct authority-bearing helper chain
**Out of scope:** `generateWord` aggregation, noun derivation, nonactive rule-base, pret engine internals

---

## Summary

| Category | Count |
| --- | --- |
| layer3_legitimate | 8 |
| mixed_boundary | 3 |
| authority_violation | 0 |
| **Total** | 11 |

**Residual structural defect: amr-08b (nonactive pret-class)**

`splitWrapperForms` is gone. All three pret/class early-return branches (amr-07, amr-08a, amr-08b) consume `forms[]` and split into primary verb + `alternateForms`. `buildNonactivePerfectiveResult` now exposes `forms[]`. Zeroed affixes remain as a transitional surface branch pending a richer `generateWord` verb-side contract. There are **zero authority violations** and **zero structural defects**.

---

## All Audited Sites

| ID | Function / Site | Location | Category | Action |
| --- | --- | --- | --- | --- |
| amr-01 | realizeDerivedMuStemInteraction | script.js:600 | `layer3_legitimate` | keep_as_is |
| amr-02 | applyNonspecificObjectAllomorphy | script.js:3833 | `layer3_legitimate` | keep_as_is |
| amr-03 | applyObjectAllomorphy | script.js:37108 | `layer3_legitimate` | keep_as_is |
| amr-04 | applyDirectionalRules | script.js:19703 | `layer3_legitimate` | keep_as_is |
| amr-05 | applyMorphologyRules — tense-branch verb mutation | script.js:35818–36006 | `layer3_legitimate` | keep_as_is |
| amr-06 | applyMorphologyRules — alternateForms[] accumulation via pus | script.js:35718–35733 (pushAlternateForm definition); written throughout | `layer3_legitimate` | keep_as_is |
| amr-07 | applyMorphologyRules — PRETERITO_UNIVERSAL early return | script.js:36057–36079 | `mixed_boundary` | keep_as_structured_surface_branch |
| amr-08a | applyMorphologyRules — PRETERITO_CLASS active early return | script.js:36107–36134 | `mixed_boundary` | keep_as_structured_surface_branch |
| amr-08b | applyMorphologyRules — PRETERITO_CLASS nonactive sub-branch | script.js:36077–36103 | `mixed_boundary` | keep_as_structured_surface_branch |
| amr-10 | applyMorphologyRules — normal return contract | script.js:37031–37043 | `layer3_legitimate` | keep_as_is |
| amr-11 | applyMorphologyRules — surfaceRuleMeta construction | script.js:36996–37006 | `layer3_legitimate` | keep_as_is |

---

## Refactor Candidates

### amr-07 — applyMorphologyRules — PRETERITO_UNIVERSAL early return

**Location:** `script.js:36057–36079`
**Category:** `mixed_boundary`
**Recommended action:** `keep_as_structured_surface_branch`

String flattening resolved: forms[] from buildPretUniversalResultWithProvenance are now split into primary verb + alternateForms instead of joined into a single verb string. Remaining mixed-boundary concern: zeroed affixes are a workaround for the lack of a surfaceForms contract on generateWord. Full resolution requires a verb-side structured output contract.


### amr-08a — applyMorphologyRules — PRETERITO_CLASS active early return

**Location:** `script.js:36107–36134`
**Category:** `mixed_boundary`
**Recommended action:** `keep_as_structured_surface_branch`

String flattening resolved. Zeroed-affix contract-boundary concern remains, same as amr-07.


### amr-08b — applyMorphologyRules — PRETERITO_CLASS nonactive sub-branch

**Location:** `script.js:36077–36103`
**Category:** `mixed_boundary`
**Recommended action:** `keep_as_structured_surface_branch`

Normalized to the same pattern as amr-07 and amr-08a. buildNonactivePerfectiveResult currently returns a single form so alternateForms will be empty in practice. The branch is ready for multi-form nonactive outputs without further changes.


---

## Hotspot Section

### Pre-output mutation of verb / analysisVerb

Every `verb =` reassignment inside `applyMorphologyRules` is a grammatical stem selection: suppletive stems, tense-specific derivations (patientivo, agentivo, potencial, sustantivo-verbal), directional elision. All are **layer3_legitimate**. The only exceptions are the pret early-return branches (amr-07, amr-08) where `verb` receives an assembled surface string.

### alternateForms accumulation

`pushAlternateForm` accumulates structured `{ verb, subjectSuffix, formSpec, ... }` objects throughout. No flat strings are pushed. When the potencial-active profile replaces all alternates (`alternateForms.length = 0`), it then pushes structured entries derived from parsed wrapper forms. The parsing step is the defect (amr-09), not the accumulation.

### allomorphy result shape

`applyObjectAllomorphy` → `applyNonspecificObjectAllomorphy` return `{ verb, analysisVerb, objectPrefix }`. Correct structured shape; no display concern.

### directional-rule mutation

`applyDirectionalRules` updates a context object and returns it. The structured `directionalChainMeta` and `directionalPlan` outputs flow through to `buildOutputWordSegments`. Correct architecture.

### pret/class result rewrapping inside applyMorphologyRules

All three pret/class early-return branches (amr-07, amr-08a, amr-08b) now map `forms[]` through surface resolution and split into primary verb + `alternateForms`. Active branches apply `resolveOptionalSupportiveOutputText` per form; the nonactive branch (amr-08b) uses `forms[]` from `buildNonactivePerfectiveResult` directly, as that function already returns surface-ready text.

### return contract shape

The **normal** return is the correct structured shape. All three **pret/class early-return branches** (amr-07, amr-08a, amr-08b) now return `alternateForms` alongside the primary verb. Deviation narrowed to zeroed affixes only — a transitional surface branch, not a structural defect.

---

## Audit Findings

| Question | Finding |
|---|---|
| Does applyMorphologyRules use strings outside the layer-4 gate? | **Structured surface branch only** — all three pret/class branches return primary verb + `alternateForms`; zeroed affixes remain as a transitional branch, pending a richer `generateWord` verb-side contract. |
| Does splitWrapperForms depend on ' / ' as a structural separator? | **Resolved** — `splitWrapperForms` deleted; consumers use `.forms` directly. |
| Are alternateForms structured or flat strings? | **Structured** — all pushAlternateForm calls use `{ verb, subjectSuffix, formSpec }` objects. |
| Is the normal return contract structured? | **Yes** — `{ subjectPrefix, objectPrefix, subjectSuffix, verb (stem), formSpec, alternateForms, surfaceRuleMeta, directionalChainMeta, stemProvenance }`. |
| Do allomorphy helpers introduce display concerns? | **No** — all allomorphy helpers return structured `{ verb, analysisVerb, objectPrefix }`. |

---

## Recommendation for Next Tranche

**No structural defects remain in this path.**

All pret/class early-return branches consume `forms[]` and produce structured `alternateForms`. The remaining mixed-boundary classification (amr-07, amr-08a, amr-08b) reflects the zeroed-affix transitional surface branch — a design concern for a later pass, not a structural defect.

`generateWord` now exposes `surfaceForms: string[]` on its return. The stem pool is uniformly spec-first (forward and nonactive). The morphology-per-stem boundary is isolated in `resolveStemCandidateMorphologyResult`. The zeroed-affix branch (amr-07, amr-08a, amr-08b) is the only remaining contract-boundary concern, deferred until a richer pret/class stem input contract is warranted.
