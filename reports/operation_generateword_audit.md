# Operation GenerateWord Audit

**Date:** 2026-04-02
**Scope:** `generateWord(...)` output path and its direct output helpers
**Out of scope:** noun-side wrappers, `applyMorphologyRules` internals, pret engine, nonactive rule-base path

---

## Summary

| Category | Count |
| --- | --- |
| layer4_legitimate | 11 |
| mixed_boundary | 0 |
| authority_violation | 0 |
| **Total** | 11 |

**Key findings:**

- All realized strings in `generateWord` are produced by `buildWord()` or `buildWordFromParts()`, which route through `buildActiveOutputWordText` → `buildOutputWordText` → `buildOutputWordSegments`. The layer-4 gate has 100% coverage.
- `forms.includes(...)` guards are string-equality checks on already-realized output — correct at layer 4.
- `forms.join(' / ')` is a display-formatting decision, not a grammatical separator — no refactor needed.
- **Zero authority violations** found in the `generateWord` output path.

---

## All Audited Sites

| ID | Function / Site | Location | Category | Recommended Action |
| --- | --- | --- | --- | --- |
| gw-01 | buildOutputWordSegments | script.js:463 | `layer4_legitimate` | keep_as_is |
| gw-02 | joinOutputWordSegments | script.js:509 | `layer4_legitimate` | keep_as_is |
| gw-03 | buildOutputWordText | script.js:515 | `layer4_legitimate` | keep_as_is |
| gw-04 | buildActiveOutputWordText (local closure) | script.js:38232 | `layer4_legitimate` | keep_as_is |
| gw-05 | buildWord (local closure) | script.js:38271 | `layer4_legitimate` | keep_as_is |
| gw-06 | buildWordFromParts (local closure) | script.js:38289 | `layer4_legitimate` | keep_as_is |
| gw-07 | generateWord — forms[] initialization | script.js:39154 | `layer4_legitimate` | keep_as_is |
| gw-08 | generateWord — forms.includes(baseText/altText) | script.js:39244, 39279, 39311, 39322, 39328 | `layer4_legitimate` | keep_as_is |
| gw-09 | generateWord — forms.join(' / ') | script.js:39332 | `layer4_legitimate` | keep_as_is |
| gw-10 | resolveStemCandidateMorphologyResult (top-level helper) | script.js (before generateWord) | `layer4_legitimate` | keep_as_is |
| gw-11 | generateWord — return { result, surfaceForms, isReflexive, stemProvenance } | script.js:39353 | `layer4_legitimate` | keep_as_is |

---

## Refactor Candidates

Sites classified as `authority_violation` or `mixed_boundary`:

_No authority violations or mixed-boundary sites require immediate action._

### gw-10 — resolveStemCandidateMorphologyResult (layer4_legitimate)

`applyMorphologyRules` is called inside the output assembly loop — once per stem candidate in the multi-stem pool path. Grammatical decisions (allomorphy, tense morpheme selection) happen at layer 4 for these alternate stems. Final strings still route through the gate, so there is **no string authority violation**, but the morphology/assembly boundary is blurred. This pattern should be investigated when `applyMorphologyRules` is audited.

### gw-11 — return contract (layer4_legitimate)

`generateWord` now returns `{ result, surfaceForms: string[], isReflexive, stemProvenance }`. `surfaceForms` is the ordered deduplicated alternant array; `result` is preserved as the compatibility joined string. Ownership aggregation prefers `surfaceForms` with a split fallback. **Resolved.**

---

## Live Verification

| Question | Finding |
|---|---|
| Does final word assembly funnel through `buildOutputWordText`? | **Yes** — all paths through `forms[]` use `buildWord` or `buildWordFromParts`, both routing through `buildActiveOutputWordText` → `buildOutputWordText`. |
| Is duplicate suppression string-only? | **Yes** — `forms.includes(text)` compares realized surface strings. |
| Is alternant aggregation string-only? | **No** — `surfaceForms: string[]` now exposed on return; `result` preserved as compatibility string. |
| Are there string operations outside the gate? | **No.** |
| Does `buildOutputWordSegments` contain authority logic? | **No** — it is the gate; no grammatical decisions inside it. |

---

## Recommendation for Next Tranche

**Investigate `applyMorphologyRules`.**

The `generateWord` output path is clean. The Bohr gap attributed to `generateWord` likely reflects the functions it calls — primarily `applyMorphologyRules`, which is invoked:

1. Once for the primary form (line 39095)
2. Once per stem candidate inside `collectFormsForStem` (line 39188)

The second invocation is the `mixed_boundary` pattern in `collectFormsForStem`. Whether this can be resolved depends on whether `applyMorphologyRules` already returns structured output that `generateWord` could consume once (for all stems) rather than per-stem.

The `generateWord` output path is fully clean: no authority violations, no mixed-boundary findings. `surfaceForms: string[]` is exposed on the return. Morphology-per-stem work is isolated in `resolveStemCandidateMorphologyResult`. The remaining open question is upstream derivation — how `stemCollectionPool` is constructed — which is a derivation-layer concern outside this path.
