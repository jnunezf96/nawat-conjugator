# Operation Stem Pool Audit

**Date:** 2026-04-02
**Scope:** `stemCollectionPool` producer chain in `script.js`
**Out of scope:** `generateWord` output assembly, `resolveStemCandidateMorphologyResult` internals, `applyMorphologyRules` internals

---

## Pool Families

| ID | Pool Family | Element Type | Has Spec Parallel | Prefixing |
| --- | --- | --- | --- | --- |
| pf-01 | `causativeAllStems / causativeAllStemSpecs` | string[] (causativeAllStems) + MorphStemSpec[] (causativeAllStemSpecs) | yes | none — raw derivation output stems (verb-only, no source-cha… |
| pf-02 | `applicativeAllStems / applicativeAllStemSpecs` | string[] (applicativeAllStems) + MorphStemSpec[] (applicativeAllStemSpecs) | yes | none — raw derivation output stems |
| pf-03 | `nonactiveAllStems` | string[] | yes | conditional — source chain prefix applied via realizeNonacti… |
| pf-04 | `nonactiveAllStemSpecs` | MorphStemSpec[] (kind field present) | yes | conditional — applyPrefixSpec applies applyNonactiveSourceCh… |

---

## Producer Stages

| ID | Function | Produces | Action |
| --- | --- | --- | --- |
| ps-01 | applySelectedForwardDerivation | causativeAllStems, causativeAllStemSpecs, applicat | `no_change_needed` |
| ps-02 | applyNonactiveDerivationFromOptions → applyNonacti | nonactiveAllStems, nonactiveAllStemSpecs, verb (se | `no_change_needed` |
| ps-03 | resolveNonactiveAllStems | nonactiveAllStems (string[]) | `keep_pool_as_stems` |
| ps-04 | resolveNonactiveAllStemSpecs | nonactiveAllStemSpecs (MorphStemSpec[]) | `no_change_needed` |
| ps-05 | resolveDerivedNonactiveSelectionEntry | per-stem nonactive selection entry (used in one-to | `no_change_needed` |
| ps-06 | resolveStemCollectionPool | final pool: MorphStemSpec[] | string[] | null | `no_change_needed` |

---

## Pool Family Detail

### pf-01 — `causativeAllStems / causativeAllStemSpecs`

**Source:** applySelectedForwardDerivation → runForwardDerivation → applyCausativeDerivation
**Location:** `script.js:20409 / script.js:20427`
**Element type:** string[] (causativeAllStems) + MorphStemSpec[] (causativeAllStemSpecs)
**Spec parallel:** yes — `causativeAllStemSpecs`
**Prefixing applied:** none — raw derivation output stems (verb-only, no source-chain prefix)

causativeAllStems contains base-level causative surface stems produced by applyCausativeDerivation. causativeAllStemSpecs is the parallel MorphStemSpec[] array, now threaded through applyForwardStageForGenerate → applyGenerateForwardDerivations → generateWord → resolveStemCollectionPool. resolveStemCollectionPool prefers the spec array when non-empty. When consumed by resolveStemCandidateMorphologyResult, MorphStemSpec entries are realized via realizeMorphStemSpec; string entries are used directly.


### pf-02 — `applicativeAllStems / applicativeAllStemSpecs`

**Source:** applySelectedForwardDerivation → runForwardDerivation → applyApplicativeDerivation
**Location:** `script.js:20409 / script.js:20427`
**Element type:** string[] (applicativeAllStems) + MorphStemSpec[] (applicativeAllStemSpecs)
**Spec parallel:** yes — `applicativeAllStemSpecs`
**Prefixing applied:** none — raw derivation output stems

Same pattern as pf-01. applicativeAllStemSpecs now threads through the generate pipeline alongside applicativeAllStems. resolveStemCollectionPool prefers specs when available.


### pf-03 — `nonactiveAllStems`

**Source:** applyNonactiveDerivation → resolveNonactiveAllStems
**Location:** `script.js:37400 / script.js:37320`
**Element type:** string[]
**Spec parallel:** yes — `nonactiveAllStemSpecs`
**Prefixing applied:** conditional — source chain prefix applied via realizeNonactiveSourceChainStem when selectionHasPrefixedStems=false; pre-prefixed stems used as-is when selectionHasPrefixedStems=true

nonactiveAllStems is a string[] fallback. It carries stems with source-chain prefix already applied (in the non-prefixed-selection path) or pre-prefixed realized stems (in the prefixed-selection path). No tense, subject, or object context is encoded. resolveStemCollectionPool prefers nonactiveAllStemSpecs when available; nonactiveAllStems is only used when specs are absent.


### pf-04 — `nonactiveAllStemSpecs`

**Source:** applyNonactiveDerivation → resolveNonactiveAllStemSpecs
**Location:** `script.js:37400 / script.js:37357`
**Element type:** MorphStemSpec[] (kind field present)
**Spec parallel:** yes — `nonactiveAllStems`
**Prefixing applied:** conditional — applyPrefixSpec applies applyNonactiveSourceChainStemSpec when selectionHasPrefixedStems=false; specs passed through as-is when selectionHasPrefixedStems=true; getUniqueMorphStemSpecs deduplicates

nonactiveAllStemSpecs is the preferred pool when present (resolveStemCollectionPool returns specs before strings). MorphStemSpec objects carry a sourceBase and kind field, enabling traceability. They do NOT encode tense, subject, object, directional, or supportive marker context — that context lives in baseMorphologyInput and is applied per-stem by resolveStemCandidateMorphologyResult → applyMorphologyRules.


---

## Producer Stage Detail

### ps-01 — `applySelectedForwardDerivation`

**Location:** `script.js:20409`
**Produces:** causativeAllStems, causativeAllStemSpecs, applicativeAllStems, applicativeAllStemSpecs
**Element type:** string[] for *AllStems; MorphStemSpec[] for *AllStemSpecs (when derivation engine populates them)
**Information loss:** none — both stemsKey and stemSpecsKey results are now forwarded through the full generate pipeline
**Recommended action:** `no_change_needed`

RESOLVED: The derivation engine (applyCausativeDerivation, applyApplicativeDerivation) produces both stemsKey and stemSpecsKey results. applySelectedForwardDerivation captures both; applyForwardStageForGenerate now returns derivedStemSpecs via config.resultSpecField; applyGenerateForwardDerivations threads causativeAllStemSpecs / applicativeAllStemSpecs through; resolveStemCollectionPool prefers them when non-empty. String arrays are retained as fallback.


### ps-02 — `applyNonactiveDerivationFromOptions → applyNonactiveDerivation`

**Location:** `script.js:20460 / script.js:37400`
**Produces:** nonactiveAllStems, nonactiveAllStemSpecs, verb (selected primary), analysisVerb
**Element type:** string[] for nonactiveAllStems; MorphStemSpec[] for nonactiveAllStemSpecs
**Information loss:** minimal — the selection object carries allStems, selectedStems, allStemSpecs, selectedStemSpecs; the all* variants populate the pool while selected* variants determine the primary verb. Source chain prefix and nonactive rule base are computed here and encoded into the stems/specs before pool population.
**Recommended action:** `no_change_needed`

applyNonactiveDerivation is the most complex producer. It resolves the nonactive source chain, runs resolveNonactiveStemSelection (which may include a supportive surface retry), applies a one-to-one sync with derived (causative/applicative) stems when isDerivedSyncType, and calls resolveNonactiveAllStems / resolveNonactiveAllStemSpecs. The resulting stems and specs are already source-chain-prefixed when selectionHasPrefixedStems=true. The pool correctly represents all alternant candidates for the nonactive paradigm of the input verb.


### ps-03 — `resolveNonactiveAllStems`

**Location:** `script.js:37320`
**Produces:** nonactiveAllStems (string[])
**Element type:** string[]
**Information loss:** stems lose their MorphStemSpec wrapper if only raw strings are available; prefix application (applyPrefix via realizeNonactiveSourceChainStem) is the final transform before pool entry
**Recommended action:** `keep_pool_as_stems`

Selects either selectedStemVariants (when a suffix is selected or prefixed-stems path) or allStems (when no suffix and multiple allStems exist). When selectionHasPrefixedStems=false, maps each stem through applyPrefix → realizeNonactiveSourceChainStem. The string format is the final surface stem string ready for consumption by applyMorphologyRules.


### ps-04 — `resolveNonactiveAllStemSpecs`

**Location:** `script.js:37357`
**Produces:** nonactiveAllStemSpecs (MorphStemSpec[])
**Element type:** MorphStemSpec[]
**Information loss:** none — specs carry sourceBase; getUniqueMorphStemSpecs deduplicates without data loss; applyPrefixSpec applies the source chain transform to specs when selectionHasPrefixedStems=false
**Recommended action:** `no_change_needed`

Parallel to resolveNonactiveAllStems but operates on specs. Preferred by resolveStemCollectionPool when non-null. MorphStemSpec objects are the richest pool entries — they carry sourceBase and kind, enabling realizeMorphStemSpec to reconstruct the stem string in resolveStemCandidateMorphologyResult.


### ps-05 — `resolveDerivedNonactiveSelectionEntry`

**Location:** `script.js:37262`
**Produces:** per-stem nonactive selection entry (used in one-to-one sync path)
**Element type:** { key, entry: buildPrefixedNonactiveSelectionEntry result }
**Information loss:** none — re-derives full nonactive selection for each derived stem; one-to-one sync preserves stem ordering from causative/applicative pool
**Recommended action:** `no_change_needed`

Only active when isDerivedSyncType=true (causative/applicative nonactive). For each causative/applicative stem, looks up the nonactive selection from BASIC_DATA_CANONICAL_MAP, derives the prefixed nonactive stem and spec, and synchronizes orderedOneToOneStems and orderedOneToOneStemSpecs. This is the correct design: the causative/applicative stems determine pool cardinality and ordering; the nonactive selection for each provides the morphology candidate.


### ps-06 — `resolveStemCollectionPool`

**Location:** `script.js:38026`
**Produces:** final pool: MorphStemSpec[] | string[] | null
**Element type:** MorphStemSpec[] (preferred) | string[] (fallback) | null (single-stem path)
**Information loss:** none — causativeAllStemSpecs / applicativeAllStemSpecs are now consumed and preferred when non-empty; string arrays remain as fallback
**Recommended action:** `no_change_needed`

RESOLVED: The dispatch logic is now uniformly spec-first for both nonactive and forward (causative/applicative) pools. applyGenerateForwardDerivations now threads causativeAllStemSpecs / applicativeAllStemSpecs through; applyForwardStageForGenerate returns derivedStemSpecs via config.resultSpecField; resolveStemCollectionPool prefers specs over strings for forward derivation types. getDerivedStemPoolSpecValue is called with config.resultSpecField and the spec pool object. String fallback retained for cases where derivation does not produce specs.


---

## Per-Stem `applyMorphologyRules` Necessity

**Question:** Is the per-stem `applyMorphologyRules` call in `resolveStemCandidateMorphologyResult` structurally necessary, or a consequence of late-resolved stems?

**Answer: yes — load-bearing.**

- tense morpheme selection (e.g. preterit class, nonactive perfective suffix) depends on the stem string itself — different stems in the same pool may take different suffixes
- object allomorphy (applyObjectAllomorphy) is called inside resolveStemCandidateMorphologyResult before applyMorphologyRules; the allomorph chosen depends on stem phonology
- patientivo possessive suffix adjustment depends on the realized stem and suffix, which are outputs of applyMorphologyRules — they cannot be pre-computed without running applyMorphologyRules first
- baseMorphologyInput carries subject/object/directional/supportive context that is constant across all stems in the pool; it cannot be encoded in the stem objects without coupling the derivation layer to the rendering context
- the pool carries N-way alternants for one verb; the rendering context (tense, subject person/number, object) is determined by the UI/caller, not by the derivation engine — late binding is by design

**Consequence:** Each stem in the pool genuinely requires its own `applyMorphologyRules` call. This is not a consequence of late resolution — it is correct architecture given that derivation and rendering are decoupled. The pool carries N-way alternants; the rendering context (tense, subject, object) is determined by the caller, not the derivation engine. Late binding is by design.

---

## Recommendation

**Chosen direction:** keep_current_pool_contract_with_spec_promotion_for_forward_stems

**Summary:** RESOLVED: per-stem applyMorphologyRules accepted as load-bearing. Forward stem spec promotion landed: causativeAllStemSpecs / applicativeAllStemSpecs now thread through applyForwardStageForGenerate → applyGenerateForwardDerivations → generateWord → resolveStemCollectionPool. The pool is uniformly spec-first for both nonactive and forward derivation types when specs are available.

### Rationale

- Per-stem applyMorphologyRules is structurally necessary — tense, allomorphy, and possessive suffix decisions depend on the specific realized stem and cannot be pre-computed in the derivation layer.
- The pool contract (MorphStemSpec[] preferred, string[] fallback) is now uniform across nonactive and forward (causative/applicative) families.
- applySelectedForwardDerivation already captured causativeAllStemSpecs / applicativeAllStemSpecs in its result; the gap was that the generate pipeline dropped them. That is now fixed.
- getDerivedStemPoolSpecValue is called with config.resultSpecField and a spec-keyed pool object, correctly distinguishing spec lookup from stem lookup.
- String fallback retained for cases where the derivation engine does not populate spec fields.
- resolveStemCandidateMorphologyResult handles both MorphStemSpec (via realizeMorphStemSpec) and raw strings — no change needed there.

### Next Tranche Scope

1. no further pool architecture work required
1. future: upstream derivation redesign if stemCollectionPool construction itself needs to move earlier in the pipeline

---

## Live Verification

| Question | Finding |
|---|---|
| What types does the pool carry? | `MorphStemSpec[]` (preferred for nonactive), `string[]` (causative/applicative and nonactive fallback) |
| Do pool entries encode morphology context? | No — tense, subject, object, directional context lives in `baseMorphologyInput`, not in pool entries |
| Are stems pre-prefixed or base-level? | Nonactive: source-chain prefix applied before pool entry. Causative/applicative: raw derivation output stems |
| Is per-stem `applyMorphologyRules` necessary? | Yes — allomorphy, tense suffix, and possessive adjustment all depend on the specific realized stem |
| Is there an asymmetry between pool families? | **Resolved** — both nonactive and forward pools are now spec-first. `causativeAllStemSpecs` / `applicativeAllStemSpecs` thread through the full generate pipeline. |
| What is the recommended fix? | **Resolved** — spec promotion landed. String fallback retained for derivations without spec output. |
