/**
 * Operation Stem Pool Audit
 *
 * Static analysis of the stemCollectionPool producer chain in script.js.
 * Determines whether per-stem applyMorphologyRules(...) is load-bearing or
 * a consequence of late-resolved stems, and recommends a future pool contract.
 *
 * Audited producer chain:
 *   applySelectedForwardDerivation(...)
 *   applyNonactiveDerivationFromOptions(...)  →  applyNonactiveDerivation(...)
 *   resolveNonactiveAllStems(...)
 *   resolveNonactiveAllStemSpecs(...)
 *   resolveDerivedNonactiveSelectionEntry(...)
 *   resolveStemCollectionPool(...)
 *   resolveStemCandidateMorphologyResult(...)  [boundary adapter — not refactor target]
 *
 * Outputs:
 *   reports/operation_stem_pool_audit.json
 *   reports/operation_stem_pool_audit.md
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Pool family definitions
// ---------------------------------------------------------------------------

const POOL_FAMILIES = [
    {
        id: "pf-01",
        name: "causativeAllStems",
        source: "applySelectedForwardDerivation → runForwardDerivation → applyCausativeDerivation",
        location: "script.js:20409 / script.js:20427",
        element_type: "string[]",
        has_spec_parallel: false,
        spec_field: null,
        prefixing_applied: "none — raw derivation output stems (verb-only, no source-chain prefix)",
        morphology_context_encoded: false,
        notes: "causativeAllStems contains base-level causative surface stems produced by applyCausativeDerivation. Each string is a derived verb stem (e.g. 'taltia', 'taltis') without subject/object/directional prefix. When consumed by resolveStemCandidateMorphologyResult, the stem is stripped of directional and embedded prefix before applyMorphologyRules is called with baseMorphologyInput.",
    },
    {
        id: "pf-02",
        name: "applicativeAllStems",
        source: "applySelectedForwardDerivation → runForwardDerivation → applyApplicativeDerivation",
        location: "script.js:20409 / script.js:20427",
        element_type: "string[]",
        has_spec_parallel: false,
        spec_field: null,
        prefixing_applied: "none — raw derivation output stems",
        morphology_context_encoded: false,
        notes: "Same pattern as causativeAllStems. Raw applicative output stems without prefix or tense context.",
    },
    {
        id: "pf-03",
        name: "nonactiveAllStems",
        source: "applyNonactiveDerivation → resolveNonactiveAllStems",
        location: "script.js:37400 / script.js:37320",
        element_type: "string[]",
        has_spec_parallel: true,
        spec_field: "nonactiveAllStemSpecs",
        prefixing_applied: "conditional — source chain prefix applied via realizeNonactiveSourceChainStem when selectionHasPrefixedStems=false; pre-prefixed stems used as-is when selectionHasPrefixedStems=true",
        morphology_context_encoded: false,
        notes: "nonactiveAllStems is a string[] fallback. It carries stems with source-chain prefix already applied (in the non-prefixed-selection path) or pre-prefixed realized stems (in the prefixed-selection path). No tense, subject, or object context is encoded. resolveStemCollectionPool prefers nonactiveAllStemSpecs when available; nonactiveAllStems is only used when specs are absent.",
    },
    {
        id: "pf-04",
        name: "nonactiveAllStemSpecs",
        source: "applyNonactiveDerivation → resolveNonactiveAllStemSpecs",
        location: "script.js:37400 / script.js:37357",
        element_type: "MorphStemSpec[] (kind field present)",
        has_spec_parallel: true,
        spec_field: "nonactiveAllStems",
        prefixing_applied: "conditional — applyPrefixSpec applies applyNonactiveSourceChainStemSpec when selectionHasPrefixedStems=false; specs passed through as-is when selectionHasPrefixedStems=true; getUniqueMorphStemSpecs deduplicates",
        morphology_context_encoded: false,
        notes: "nonactiveAllStemSpecs is the preferred pool when present (resolveStemCollectionPool returns specs before strings). MorphStemSpec objects carry a sourceBase and kind field, enabling traceability. They do NOT encode tense, subject, object, directional, or supportive marker context — that context lives in baseMorphologyInput and is applied per-stem by resolveStemCandidateMorphologyResult → applyMorphologyRules.",
    },
];

// ---------------------------------------------------------------------------
// Producer stage analysis
// ---------------------------------------------------------------------------

const PRODUCER_STAGES = [
    {
        id: "ps-01",
        function: "applySelectedForwardDerivation",
        location: "script.js:20409",
        produces: ["causativeAllStems", "causativeAllStemSpecs", "applicativeAllStems", "applicativeAllStemSpecs"],
        element_type: "string[] for *AllStems; MorphStemSpec[] for *AllStemSpecs (when derivation engine populates them)",
        information_loss: "none at this stage — stems are derivation outputs; the derivation engine may populate spec fields but causativeAllStemSpecs / applicativeAllStemSpecs are not forwarded into resolveStemCollectionPool",
        recommended_action: "keep_pool_as_stems",
        notes: "The derivation engine (applyCausativeDerivation, applyApplicativeDerivation) produces both stemsKey and stemSpecsKey results. applySelectedForwardDerivation captures both (causativeAllStemSpecs, applicativeAllStemSpecs) but resolveStemCollectionPool does not yet consume the spec fields for forward-derived stems — it reads only the stems array via getDerivedStemPoolValue. This is a latent improvement opportunity: forwarding specs for causative/applicative would make the pool fully spec-first. However it has zero behavior impact today since resolveStemCandidateMorphologyResult handles MorphStemSpec and string identically via realizeMorphStemSpec.",
    },
    {
        id: "ps-02",
        function: "applyNonactiveDerivationFromOptions → applyNonactiveDerivation",
        location: "script.js:20460 / script.js:37400",
        produces: ["nonactiveAllStems", "nonactiveAllStemSpecs", "verb (selected primary)", "analysisVerb"],
        element_type: "string[] for nonactiveAllStems; MorphStemSpec[] for nonactiveAllStemSpecs",
        information_loss: "minimal — the selection object carries allStems, selectedStems, allStemSpecs, selectedStemSpecs; the all* variants populate the pool while selected* variants determine the primary verb. Source chain prefix and nonactive rule base are computed here and encoded into the stems/specs before pool population.",
        recommended_action: "no_change_needed",
        notes: "applyNonactiveDerivation is the most complex producer. It resolves the nonactive source chain, runs resolveNonactiveStemSelection (which may include a supportive surface retry), applies a one-to-one sync with derived (causative/applicative) stems when isDerivedSyncType, and calls resolveNonactiveAllStems / resolveNonactiveAllStemSpecs. The resulting stems and specs are already source-chain-prefixed when selectionHasPrefixedStems=true. The pool correctly represents all alternant candidates for the nonactive paradigm of the input verb.",
    },
    {
        id: "ps-03",
        function: "resolveNonactiveAllStems",
        location: "script.js:37320",
        produces: ["nonactiveAllStems (string[])"],
        element_type: "string[]",
        information_loss: "stems lose their MorphStemSpec wrapper if only raw strings are available; prefix application (applyPrefix via realizeNonactiveSourceChainStem) is the final transform before pool entry",
        recommended_action: "keep_pool_as_stems",
        notes: "Selects either selectedStemVariants (when a suffix is selected or prefixed-stems path) or allStems (when no suffix and multiple allStems exist). When selectionHasPrefixedStems=false, maps each stem through applyPrefix → realizeNonactiveSourceChainStem. The string format is the final surface stem string ready for consumption by applyMorphologyRules.",
    },
    {
        id: "ps-04",
        function: "resolveNonactiveAllStemSpecs",
        location: "script.js:37357",
        produces: ["nonactiveAllStemSpecs (MorphStemSpec[])"],
        element_type: "MorphStemSpec[]",
        information_loss: "none — specs carry sourceBase; getUniqueMorphStemSpecs deduplicates without data loss; applyPrefixSpec applies the source chain transform to specs when selectionHasPrefixedStems=false",
        recommended_action: "no_change_needed",
        notes: "Parallel to resolveNonactiveAllStems but operates on specs. Preferred by resolveStemCollectionPool when non-null. MorphStemSpec objects are the richest pool entries — they carry sourceBase and kind, enabling realizeMorphStemSpec to reconstruct the stem string in resolveStemCandidateMorphologyResult.",
    },
    {
        id: "ps-05",
        function: "resolveDerivedNonactiveSelectionEntry",
        location: "script.js:37262",
        produces: ["per-stem nonactive selection entry (used in one-to-one sync path)"],
        element_type: "{ key, entry: buildPrefixedNonactiveSelectionEntry result }",
        information_loss: "none — re-derives full nonactive selection for each derived stem; one-to-one sync preserves stem ordering from causative/applicative pool",
        recommended_action: "no_change_needed",
        notes: "Only active when isDerivedSyncType=true (causative/applicative nonactive). For each causative/applicative stem, looks up the nonactive selection from BASIC_DATA_CANONICAL_MAP, derives the prefixed nonactive stem and spec, and synchronizes orderedOneToOneStems and orderedOneToOneStemSpecs. This is the correct design: the causative/applicative stems determine pool cardinality and ordering; the nonactive selection for each provides the morphology candidate.",
    },
    {
        id: "ps-06",
        function: "resolveStemCollectionPool",
        location: "script.js:38026",
        produces: ["final pool: MorphStemSpec[] | string[] | null"],
        element_type: "MorphStemSpec[] (preferred) | string[] (fallback) | null (single-stem path)",
        information_loss: "causativeAllStemSpecs and applicativeAllStemSpecs are not consumed — only the string arrays are forwarded for forward-derivation tenses. This is the one site where spec information is discarded for causative/applicative pools.",
        recommended_action: "promote_to_spec_only",
        notes: "The dispatch logic is: nonactive → prefer specs, fallback strings; forward (causative/applicative) → always strings via getDerivedStemPoolValue. The asymmetry is benign today (resolveStemCandidateMorphologyResult handles both) but forwarding causativeAllStemSpecs / applicativeAllStemSpecs here would make the pool uniformly spec-first and remove the realizeMorphStemSpec branch that handles the string case.",
    },
];

// ---------------------------------------------------------------------------
// Per-stem applyMorphologyRules necessity analysis
// ---------------------------------------------------------------------------

const NECESSITY_ANALYSIS = {
    question: "Is the per-stem applyMorphologyRules call in resolveStemCandidateMorphologyResult structurally necessary?",
    answer: "yes_load_bearing",
    rationale: [
        "tense morpheme selection (e.g. preterit class, nonactive perfective suffix) depends on the stem string itself — different stems in the same pool may take different suffixes",
        "object allomorphy (applyObjectAllomorphy) is called inside resolveStemCandidateMorphologyResult before applyMorphologyRules; the allomorph chosen depends on stem phonology",
        "patientivo possessive suffix adjustment depends on the realized stem and suffix, which are outputs of applyMorphologyRules — they cannot be pre-computed without running applyMorphologyRules first",
        "baseMorphologyInput carries subject/object/directional/supportive context that is constant across all stems in the pool; it cannot be encoded in the stem objects without coupling the derivation layer to the rendering context",
        "the pool carries N-way alternants for one verb; the rendering context (tense, subject person/number, object) is determined by the UI/caller, not by the derivation engine — late binding is by design",
    ],
    consequence: "Each stem in the pool genuinely requires its own applyMorphologyRules call. This is not a consequence of late resolution; it is correct architecture given that derivation and rendering are decoupled.",
};

// ---------------------------------------------------------------------------
// Recommendation
// ---------------------------------------------------------------------------

const RECOMMENDATION = {
    chosen_direction: "keep_current_pool_contract_with_spec_promotion_for_forward_stems",
    summary: "Accept per-stem applyMorphologyRules as load-bearing. Make one additive improvement: forward causativeAllStemSpecs / applicativeAllStemSpecs through resolveStemCollectionPool so the pool is uniformly MorphStemSpec[] when specs are available, eliminating the string-only fallback for forward-derived stems.",
    rationale: [
        "Per-stem applyMorphologyRules is structurally necessary — tense, allomorphy, and possessive suffix decisions depend on the specific realized stem and cannot be pre-computed in the derivation layer.",
        "The pool contract (MorphStemSpec[] preferred, string[] fallback) is sound. The asymmetry between nonactive (spec-first) and causative/applicative (string-only) is the only remaining inconsistency.",
        "Upgrading causative/applicative to spec-first requires only: (1) applySelectedForwardDerivation already captures causativeAllStemSpecs / applicativeAllStemSpecs; (2) getDerivedStemPoolValue needs a spec-aware variant; (3) resolveStemCollectionPool reads specs for forward-derived tenses the same way it does for nonactive.",
        "This improvement is additive and behavior-neutral: resolveStemCandidateMorphologyResult already handles MorphStemSpec via realizeMorphStemSpec.",
        "A richer morphology-candidate contract (option: add_morphology_candidate_shape) is not warranted — it would require passing baseMorphologyInput into the derivation layer, creating upward coupling.",
        "Splitting into selection-stems vs render-candidates (option: split_selection_vs_render_pool) adds complexity without benefit, since the pool is already correctly sized and ordered.",
    ],
    next_tranche_scope: [
        "add getDerivedStemPoolSpecValue or extend getDerivedStemPoolValue to return specs when available",
        "update resolveStemCollectionPool to prefer causativeAllStemSpecs / applicativeAllStemSpecs (parallel to nonactive path)",
        "static check + confirm resolveStemCandidateMorphologyResult produces identical output for MorphStemSpec vs string equivalents",
        "update this audit: mark ps-06 resolveStemCollectionPool as no_change_needed once spec promotion lands",
    ],
};

// ---------------------------------------------------------------------------
// Report assembly
// ---------------------------------------------------------------------------

const jsonReport = {
    meta: {
        title: "Operation Stem Pool Audit",
        date: new Date().toISOString().split("T")[0],
        scope: "stemCollectionPool producer chain in script.js",
        out_of_scope: [
            "generateWord output assembly (already clean)",
            "resolveStemCandidateMorphologyResult internals (boundary adapter)",
            "applyMorphologyRules internals",
            "tense/suffix selection logic inside applyMorphologyRules",
        ],
    },
    pool_families: POOL_FAMILIES,
    producer_stages: PRODUCER_STAGES,
    necessity_analysis: NECESSITY_ANALYSIS,
    recommendation: RECOMMENDATION,
};

// ---------------------------------------------------------------------------
// Markdown report
// ---------------------------------------------------------------------------

function mdTable(headers, rows) {
    const sep = headers.map(() => "---");
    return [
        `| ${headers.join(" | ")} |`,
        `| ${sep.join(" | ")} |`,
        ...rows.map((row) => `| ${row.join(" | ")} |`),
    ].join("\n");
}

const poolFamilyTable = mdTable(
    ["ID", "Pool Family", "Element Type", "Has Spec Parallel", "Prefixing"],
    POOL_FAMILIES.map((f) => [
        f.id,
        `\`${f.name}\``,
        f.element_type,
        f.has_spec_parallel ? "yes" : "no",
        f.prefixing_applied.slice(0, 60) + (f.prefixing_applied.length > 60 ? "…" : ""),
    ])
);

const producerStageTable = mdTable(
    ["ID", "Function", "Produces", "Action"],
    PRODUCER_STAGES.map((s) => [
        s.id,
        s.function.replace(/\|/g, "∣").slice(0, 50),
        s.produces.join(", ").slice(0, 50),
        `\`${s.recommended_action}\``,
    ])
);

const familySections = POOL_FAMILIES.map((f) => `
### ${f.id} — \`${f.name}\`

**Source:** ${f.source}
**Location:** \`${f.location}\`
**Element type:** ${f.element_type}
**Spec parallel:** ${f.has_spec_parallel ? `yes — \`${f.spec_field}\`` : "no"}
**Prefixing applied:** ${f.prefixing_applied}

${f.notes}
`).join("\n");

const stageSections = PRODUCER_STAGES.map((s) => `
### ${s.id} — \`${s.function}\`

**Location:** \`${s.location}\`
**Produces:** ${s.produces.join(", ")}
**Element type:** ${s.element_type}
**Information loss:** ${s.information_loss}
**Recommended action:** \`${s.recommended_action}\`

${s.notes}
`).join("\n");

const md = `# Operation Stem Pool Audit

**Date:** ${jsonReport.meta.date}
**Scope:** \`stemCollectionPool\` producer chain in \`script.js\`
**Out of scope:** \`generateWord\` output assembly, \`resolveStemCandidateMorphologyResult\` internals, \`applyMorphologyRules\` internals

---

## Pool Families

${poolFamilyTable}

---

## Producer Stages

${producerStageTable}

---

## Pool Family Detail
${familySections}

---

## Producer Stage Detail
${stageSections}

---

## Per-Stem \`applyMorphologyRules\` Necessity

**Question:** Is the per-stem \`applyMorphologyRules\` call in \`resolveStemCandidateMorphologyResult\` structurally necessary, or a consequence of late-resolved stems?

**Answer: yes — load-bearing.**

${NECESSITY_ANALYSIS.rationale.map((r) => `- ${r}`).join("\n")}

**Consequence:** Each stem in the pool genuinely requires its own \`applyMorphologyRules\` call. This is not a consequence of late resolution — it is correct architecture given that derivation and rendering are decoupled. The pool carries N-way alternants; the rendering context (tense, subject, object) is determined by the caller, not the derivation engine. Late binding is by design.

---

## Recommendation

**Chosen direction:** ${RECOMMENDATION.chosen_direction}

**Summary:** ${RECOMMENDATION.summary}

### Rationale

${RECOMMENDATION.rationale.map((r) => `- ${r}`).join("\n")}

### Next Tranche Scope

${RECOMMENDATION.next_tranche_scope.map((s) => `1. ${s}`).join("\n")}

---

## Live Verification

| Question | Finding |
|---|---|
| What types does the pool carry? | \`MorphStemSpec[]\` (preferred for nonactive), \`string[]\` (causative/applicative and nonactive fallback) |
| Do pool entries encode morphology context? | No — tense, subject, object, directional context lives in \`baseMorphologyInput\`, not in pool entries |
| Are stems pre-prefixed or base-level? | Nonactive: source-chain prefix applied before pool entry. Causative/applicative: raw derivation output stems |
| Is per-stem \`applyMorphologyRules\` necessary? | Yes — allomorphy, tense suffix, and possessive adjustment all depend on the specific realized stem |
| Is there an asymmetry between pool families? | Yes — nonactive is spec-first; causative/applicative is string-only. \`causativeAllStemSpecs\` / \`applicativeAllStemSpecs\` exist but are not forwarded through \`resolveStemCollectionPool\` |
| What is the recommended fix? | Promote \`causativeAllStemSpecs\` / \`applicativeAllStemSpecs\` through \`resolveStemCollectionPool\` (additive, behavior-neutral) |
`;

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------

const reportsDir = path.join(__dirname, "..", "reports");
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

const jsonPath = path.join(reportsDir, "operation_stem_pool_audit.json");
const mdPath = path.join(reportsDir, "operation_stem_pool_audit.md");

fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2), "utf8");
fs.writeFileSync(mdPath, md, "utf8");

console.log(`\nOperation Stem Pool Audit complete.\n`);
console.log(`  JSON: ${jsonPath}`);
console.log(`  MD:   ${mdPath}`);
console.log(`\nPool families audited: ${POOL_FAMILIES.length}`);
console.log(`Producer stages audited: ${PRODUCER_STAGES.length}`);
console.log(`\nPer-stem applyMorphologyRules: LOAD-BEARING (not late-resolution artifact)`);
console.log(`\nRecommendation: ${RECOMMENDATION.chosen_direction}`);
console.log(`  ${RECOMMENDATION.summary}`);
console.log(`\nNext tranche: promote causativeAllStemSpecs / applicativeAllStemSpecs`);
console.log(`  through resolveStemCollectionPool (additive, behavior-neutral).\n`);
