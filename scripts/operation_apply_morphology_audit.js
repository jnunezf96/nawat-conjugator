/**
 * Operation ApplyMorphologyRules Audit
 *
 * Static analysis of applyMorphologyRules(...) and its direct authority-bearing
 * helper chain. Classifies each string-transform site as:
 *
 *   layer3_legitimate  — expected morphology-stage string work before layer 4
 *   mixed_boundary     — morphology logic mixed with output-contract concerns
 *   authority_violation — string operations making decisions that belong upstream
 *
 * Outputs:
 *   reports/operation_apply_morphology_audit.json
 *   reports/operation_apply_morphology_audit.md
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Audit records
// ---------------------------------------------------------------------------

const records = [
    // -----------------------------------------------------------------------
    // realizeDerivedMuStemInteraction (line 600)
    // -----------------------------------------------------------------------
    {
        id: "amr-01",
        function: "realizeDerivedMuStemInteraction",
        location: "script.js:600",
        category: "layer3_legitimate",
        reason: "Handles the mu-prefix interaction for bound-slash/compound forms. The string operations (startsWith, slice, string concat) are phonological prefix reductions that are definitionally morphology-layer work.",
        current_inputs: "objectPrefix, verb, alternateForms[], enable",
        current_output: "{ objectPrefix, verb, alternateForms[] }",
        mutates_grammatical_authority: true,
        feeds_generateword: "objectPrefix and verb propagate back through applyMorphologyRules return",
        recommended_action: "keep_as_is",
        notes: "The mu-embedding logic (tamu→mutamu, etc.) is legitimate phonological-morphological boundary work. No display concern is mixed in.",
    },

    // -----------------------------------------------------------------------
    // applyNonspecificObjectAllomorphy (line 3833)
    // -----------------------------------------------------------------------
    {
        id: "amr-02",
        function: "applyNonspecificObjectAllomorphy",
        location: "script.js:3833",
        category: "layer3_legitimate",
        reason: "Handles mu-reduction (mu→m before ICVCV stems), supportive-I insertion/deletion, and slash-bound supportive-I preservation. All are phonological allomorphy rules that must operate before layer-4 realization.",
        current_inputs: "verb, analysisVerb, objectPrefix, indirectObjectMarker, thirdObjectMarker, hasOptionalSupportiveI, optionalSupportiveLetter, supportivePrecedingSurface, hasNonspecificValence, hasSlashMarker, hasBoundMarker, directionalPrefix",
        current_output: "{ verb, analysisVerb, objectPrefix }",
        mutates_grammatical_authority: true,
        feeds_generateword: "verb, analysisVerb, morphologyObjectPrefix used in subsequent generateWord allomorphy and morphology calls",
        recommended_action: "keep_as_is",
        notes: "Core allomorphy logic. The supportive-I decision depends on context (slash marker, bound marker, directional prefix) that is only available at the morphology stage. No display concern mixed in.",
    },

    // -----------------------------------------------------------------------
    // applyObjectAllomorphy (line 37108)
    // -----------------------------------------------------------------------
    {
        id: "amr-03",
        function: "applyObjectAllomorphy",
        location: "script.js:37108",
        category: "layer3_legitimate",
        reason: "Thin dispatcher: applies reflexive auto-switch (objectPrefix → 'mu' for same-person combinations), then delegates to applyNonspecificObjectAllomorphy.",
        current_inputs: "verb, analysisVerb, subjectPrefix, subjectSuffix, objectPrefix, indirectObjectMarker, thirdObjectMarker, hasOptionalSupportiveI, ...",
        current_output: "{ verb, analysisVerb, morphologyObjectPrefix }",
        mutates_grammatical_authority: true,
        feeds_generateword: "morphologyObjectPrefix used by generateWord for subsequent morphology and output assembly",
        recommended_action: "keep_as_is",
        notes: "No string-building outside allomorphy helpers. The reflexive check is a grammatical decision that belongs at this layer.",
    },

    // -----------------------------------------------------------------------
    // applyDirectionalRules (line 19703)
    // -----------------------------------------------------------------------
    {
        id: "amr-04",
        function: "applyDirectionalRules",
        location: "script.js:19703",
        category: "layer3_legitimate",
        reason: "Dispatches to registered rule handlers (e.g., applyWalDirectionalRule) that mutate verb, objectPrefix, directionalOutputPrefix, and directionalPlan. The string operations (startsWith, slice, concat) are directional prefix elision rules.",
        current_inputs: "context object with directionalInputPrefix, subjectPrefix, objectPrefix, verb, isIntransitiveVerb, tense, ...; stage ('prefix' or 'post-elision')",
        current_output: "updated context with subjectPrefix, objectPrefix, verb, directionalPlan, directionalOutputPrefix",
        mutates_grammatical_authority: true,
        feeds_generateword: "directionalPlan and directionalOutputPrefix feed directionalChainMeta in the return of applyMorphologyRules, which buildOutputWordSegments uses for surface chain realization",
        recommended_action: "keep_as_is",
        notes: "Directional prefix placement and elision are morphological rules that must execute before layer-4 surface chain building. The structured directionalChainMeta output is already the correct pattern.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — verb mutation through tense branches
    // -----------------------------------------------------------------------
    {
        id: "amr-05",
        function: "applyMorphologyRules — tense-branch verb mutation",
        location: "script.js:35818–36006",
        category: "layer3_legitimate",
        reason: "Sustained nominal (sustantivo-verbal), patientivo, agentivo, and patientivo-adjective branches all reassign verb and subjectSuffix based on derived stem candidates. All mutations are grammatical stem selection.",
        current_inputs: "tense, verb, analysisVerb, objectPrefix, isIntransitiveVerb, derivation input builders",
        current_output: "updated verb, subjectSuffix, and alternateForms",
        mutates_grammatical_authority: true,
        feeds_generateword: "primary verb and alternateForms are returned and consumed by generateWord's output loop",
        recommended_action: "keep_as_is",
        notes: "Tense-specific stem selection is the definition of layer-3 morphology work.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — alternateForms accumulation
    // -----------------------------------------------------------------------
    {
        id: "amr-06",
        function: "applyMorphologyRules — alternateForms[] accumulation via pushAlternateForm",
        location: "script.js:35718–35733 (pushAlternateForm definition); written throughout",
        category: "layer3_legitimate",
        reason: "alternateForms accumulates { verb, subjectSuffix, formSpec, surfaceObjectPrefix, ... } objects — structured entries, not flat strings. Each push is driven by a grammatical stem variant (ya-perfective alternate, tense-alternate, wrapper form).",
        current_inputs: "verbValue (string), suffixValue (string), options object",
        current_output: "push to alternateForms[]",
        mutates_grammatical_authority: false,
        feeds_generateword: "alternateForms returned in applyMorphologyRules result; generateWord iterates and renders each entry via buildWordFromParts",
        recommended_action: "keep_as_is",
        notes: "The objects are structured. The pattern of accumulating form candidates at layer 3 and rendering at layer 4 is the correct architecture.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — pret-universal early return  [STRUCTURED SURFACE BRANCH]
    // -----------------------------------------------------------------------
    {
        id: "amr-07",
        function: "applyMorphologyRules — PRETERITO_UNIVERSAL early return",
        location: "script.js:36057–36079",
        category: "mixed_boundary",
        reason: "Returns { verb: firstResolvedForm, alternateForms, subjectPrefix: '', objectPrefix: '', subjectSuffix: '' }. Multi-form results from buildPretUniversalResultWithProvenance are now de-flattened: primary form goes to verb, remaining forms go to alternateForms. Zeroed affixes remain because generateWord has no verb-side surfaceForms contract; verb must still be a pre-assembled string here.",
        current_inputs: "pretDerivationSharedOptions, hasOptionalSupportiveI",
        current_output: "{ subjectPrefix: '', objectPrefix: '', subjectSuffix: '', verb: primaryForm, alternateForms: remainingForms[], stemProvenance }",
        mutates_grammatical_authority: false,
        feeds_generateword: "generateWord receives primaryForm as 'verb' and iterates alternateForms; all pass through buildOutputWordText with zeroed affixes. Correct only because affixes are zeroed.",
        recommended_action: "keep_as_structured_surface_branch",
        notes: "String flattening resolved: forms[] from buildPretUniversalResultWithProvenance are now split into primary verb + alternateForms instead of joined into a single verb string. Remaining mixed-boundary concern: zeroed affixes are a workaround for the lack of a surfaceForms contract on generateWord. Full resolution requires a verb-side structured output contract.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — pret-class active early return  [STRUCTURED SURFACE BRANCH]
    // -----------------------------------------------------------------------
    {
        id: "amr-08a",
        function: "applyMorphologyRules — PRETERITO_CLASS active early return",
        location: "script.js:36107–36134",
        category: "mixed_boundary",
        reason: "Same pattern as amr-07. buildClassBasedResultWithProvenance.forms[] is de-flattened into primary verb + alternateForms. Zeroed affixes remain for the same contract-boundary reason.",
        current_inputs: "pretDerivationSharedOptions, classFilter, hasOptionalSupportiveI",
        current_output: "{ subjectPrefix: '', objectPrefix: '', subjectSuffix: '', verb: primaryForm, alternateForms: remainingForms[], stemProvenance }",
        mutates_grammatical_authority: false,
        feeds_generateword: "same as amr-07",
        recommended_action: "keep_as_structured_surface_branch",
        notes: "String flattening resolved. Zeroed-affix contract-boundary concern remains, same as amr-07.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — pret-class nonactive early return  [STRUCTURED SURFACE BRANCH]
    // -----------------------------------------------------------------------
    {
        id: "amr-08b",
        function: "applyMorphologyRules — PRETERITO_CLASS nonactive sub-branch",
        location: "script.js:36077–36103",
        category: "mixed_boundary",
        reason: "Returns { verb: firstForm, alternateForms, subjectPrefix: '', objectPrefix: '', subjectSuffix: '' }. buildNonactivePerfectiveResult now exposes forms[]; forms are surface-ready so resolveOptionalSupportiveOutputText is not re-applied. Zeroed affixes remain for the same contract-boundary reason as amr-07 and amr-08a.",
        current_inputs: "verb, subjectPrefix, objectPrefix, subjectSuffix, tense, directional*, hasOptionalSupportiveI",
        current_output: "{ subjectPrefix: '', objectPrefix: '', subjectSuffix: '', verb: primaryForm, alternateForms: remainingForms[], stemProvenance: null }",
        mutates_grammatical_authority: false,
        feeds_generateword: "same as amr-07 — primary form in verb, zeroed affixes; alternateForms available for multi-form nonactive outputs",
        recommended_action: "keep_as_structured_surface_branch",
        notes: "Normalized to the same pattern as amr-07 and amr-08a. buildNonactivePerfectiveResult currently returns a single form so alternateForms will be empty in practice. The branch is ready for multi-form nonactive outputs without further changes.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — return contract
    // -----------------------------------------------------------------------
    {
        id: "amr-10",
        function: "applyMorphologyRules — normal return contract",
        location: "script.js:37031–37043",
        category: "layer3_legitimate",
        reason: "Returns { subjectPrefix, objectPrefix, subjectSuffix, verb, formSpec, alternateForms, surfaceRuleMeta, directionalChainMeta, stemProvenance }. All fields are structured: verb is a morphological stem (not assembled text), alternateForms is a typed object array, surfaceRuleMeta and directionalChainMeta carry metadata for the layer-4 gate.",
        current_inputs: "accumulated local state throughout the function",
        current_output: "structured morphology result consumed by generateWord",
        mutates_grammatical_authority: false,
        feeds_generateword: "generateWord destructures this result and uses each field in buildWord() / buildWordFromParts()",
        recommended_action: "keep_as_is",
        notes: "The normal return contract is the correct shape. The pret early-return branches (amr-07, amr-08) are the deviations from this contract.",
    },

    // -----------------------------------------------------------------------
    // applyMorphologyRules — surfaceRuleMeta
    // -----------------------------------------------------------------------
    {
        id: "amr-11",
        function: "applyMorphologyRules — surfaceRuleMeta construction",
        location: "script.js:36996–37006",
        category: "layer3_legitimate",
        reason: "Builds a structured { sourceOuterPrefix, optativeKiReduction, dropVerbInitialIAfterObjectI, dropInitialIFromIskaliaAfterMu, trimFinalIAUAVowel } metadata object. No display strings; all fields are boolean flags or string tokens consumed by the surface-chain realization layer.",
        current_inputs: "computed boolean context from surrounding morphology decisions",
        current_output: "surfaceRuleMeta object (passed to buildOutputWordSegments via directionalChainMeta)",
        mutates_grammatical_authority: false,
        feeds_generateword: "surfaceRuleMeta flows from applyMorphologyRules → generateWord → buildWordFromParts → buildActiveOutputWordText → buildOutputWordText → buildOutputWordSegments → realizeSurfaceChain",
        recommended_action: "keep_as_is",
        notes: "This is the correct pattern: morphology layer computes context flags, surface layer uses them.",
    },
];

// ---------------------------------------------------------------------------
// Derived counts
// ---------------------------------------------------------------------------

const byCategory = {
    layer3_legitimate: records.filter((r) => r.category === "layer3_legitimate"),
    mixed_boundary: records.filter((r) => r.category === "mixed_boundary"),
    authority_violation: records.filter((r) => r.category === "authority_violation"),
};

const refactorCandidates = records.filter(
    (r) => r.category === "authority_violation" || r.category === "mixed_boundary"
);

// ---------------------------------------------------------------------------
// JSON report
// ---------------------------------------------------------------------------

const jsonReport = {
    meta: {
        title: "Operation ApplyMorphologyRules Audit",
        date: new Date().toISOString().split("T")[0],
        scope: "applyMorphologyRules(...) and its direct authority-bearing helper chain",
        out_of_scope: [
            "generateWord output aggregation",
            "noun derivation internals",
            "nonactive rule-base engine",
            "buildClassBasedResultWithProvenance internals beyond return contract",
            "buildPretUniversalResultWithProvenance internals beyond return contract",
        ],
    },
    summary: {
        total_sites: records.length,
        layer3_legitimate: byCategory.layer3_legitimate.length,
        mixed_boundary: byCategory.mixed_boundary.length,
        authority_violation: byCategory.authority_violation.length,
        structural_defect_found: false,
        structural_defect_id: [],
        defect_description:
            "No structural defects remain. All pret/class early-return branches (amr-07, amr-08a, amr-08b) now consume forms[] and push structured primary verb + alternateForms. splitWrapperForms is gone. Zeroed affixes remain as a transitional surface branch in all three branches, pending a richer generateWord verb-side contract.",
    },
    findings: {
        allomorphy_helpers:
            "realizeDerivedMuStemInteraction, applyNonspecificObjectAllomorphy, and applyObjectAllomorphy are all layer3_legitimate. Their string operations are phonological morphology decisions that must occur before layer-4 surface chain realization.",
        directional_rules:
            "applyDirectionalRules and its handlers (applyWalDirectionalRule etc.) are layer3_legitimate. The structured directionalChainMeta output is the correct pattern — metadata computed at layer 3, consumed by buildOutputWordSegments at layer 4.",
        alternateForms:
            "alternateForms accumulation via pushAlternateForm uses structured { verb, subjectSuffix, formSpec } objects throughout. No display strings in the accumulator. layer3_legitimate.",
        normal_return_contract:
            "The normal applyMorphologyRules return { subjectPrefix, objectPrefix, subjectSuffix, verb, formSpec, alternateForms, surfaceRuleMeta, directionalChainMeta, stemProvenance } is the correct structured shape. verb is a morphological stem, not assembled text.",
        pret_early_return_contract:
            "RESOLVED: All three pret/class early-return branches (amr-07, amr-08a, amr-08b) now consume forms[] and split into primary verb + alternateForms. buildNonactivePerfectiveResult exposes forms[]. Zeroed affixes remain as a transitional surface branch for all three branches, pending a richer generateWord verb-side contract.",
        splitWrapperForms:
            "RESOLVED: splitWrapperForms deleted. Potencial-active profile and noun-side pasado-remoto fallback now consume .forms directly from provenance wrapper returns.",
    },
    records,
    refactor_candidates: refactorCandidates,
    recommendation: {
        next_tranche: "buildClassBasedResultWithProvenance / buildPretUniversalResultWithProvenance return contract",
        target_files: [
            "script.js (buildClassBasedResultWithProvenance, ~line 35000 area)",
            "pret_universal_engine.js (buildPretUniversalResultWithProvenance)",
        ],
        specific_change:
            "Make both functions return { forms: string[], result: string, provenance } instead of { result: string, provenance }. The existing result field (flat joined string) is preserved for current result readers; the new forms array is used by applyMorphologyRules to eliminate splitWrapperForms and the affix-zeroing early-return pattern.",
        rationale: [
            "amr-07, amr-08, amr-09 share the same root cause: pret engine returns a flat string that must be re-parsed.",
            "Adding a 'forms' array to the pret result objects has no grammar impact and no output change.",
            "Once forms[] is available, splitWrapperForms is deleted (replaced by direct array access).",
            "Once forms[] is available, the pret early-return branches can optionally be restructured to return alternateForms entries instead of a single assembled verb — but even without that, the split parsing defect is closed.",
            "This is the lowest-risk, highest-payoff next step: no grammar change, no output change, direct closure of the structural defect found here.",
        ],
    },
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

const summaryTable = mdTable(
    ["Category", "Count"],
    [
        ["layer3_legitimate", byCategory.layer3_legitimate.length],
        ["mixed_boundary", byCategory.mixed_boundary.length],
        ["authority_violation", byCategory.authority_violation.length],
        ["**Total**", records.length],
    ]
);

const allSitesTable = mdTable(
    ["ID", "Function / Site", "Location", "Category", "Action"],
    records.map((r) => [
        r.id,
        r.function.replace(/\|/g, "∣").slice(0, 60),
        r.location,
        `\`${r.category}\``,
        r.recommended_action,
    ])
);

const candidatesSection = refactorCandidates.map((r) => `
### ${r.id} — ${r.function}

**Location:** \`${r.location}\`
**Category:** \`${r.category}\`
**Recommended action:** \`${r.recommended_action}\`

${r.notes}
`).join("\n");

const md = `# Operation ApplyMorphologyRules Audit

**Date:** ${jsonReport.meta.date}
**Scope:** \`applyMorphologyRules(...)\` and its direct authority-bearing helper chain
**Out of scope:** \`generateWord\` aggregation, noun derivation, nonactive rule-base, pret engine internals

---

## Summary

${summaryTable}

**Residual structural defect: amr-08b (nonactive pret-class)**

\`splitWrapperForms\` is gone. All three pret/class early-return branches (amr-07, amr-08a, amr-08b) consume \`forms[]\` and split into primary verb + \`alternateForms\`. \`buildNonactivePerfectiveResult\` now exposes \`forms[]\`. Zeroed affixes remain as a transitional surface branch pending a richer \`generateWord\` verb-side contract. There are **zero authority violations** and **zero structural defects**.

---

## All Audited Sites

${allSitesTable}

---

## Refactor Candidates
${candidatesSection}

---

## Hotspot Section

### Pre-output mutation of verb / analysisVerb

Every \`verb =\` reassignment inside \`applyMorphologyRules\` is a grammatical stem selection: suppletive stems, tense-specific derivations (patientivo, agentivo, potencial, sustantivo-verbal), directional elision. All are **layer3_legitimate**. The only exceptions are the pret early-return branches (amr-07, amr-08) where \`verb\` receives an assembled surface string.

### alternateForms accumulation

\`pushAlternateForm\` accumulates structured \`{ verb, subjectSuffix, formSpec, ... }\` objects throughout. No flat strings are pushed. When the potencial-active profile replaces all alternates (\`alternateForms.length = 0\`), it then pushes structured entries derived from parsed wrapper forms. The parsing step is the defect (amr-09), not the accumulation.

### allomorphy result shape

\`applyObjectAllomorphy\` → \`applyNonspecificObjectAllomorphy\` return \`{ verb, analysisVerb, objectPrefix }\`. Correct structured shape; no display concern.

### directional-rule mutation

\`applyDirectionalRules\` updates a context object and returns it. The structured \`directionalChainMeta\` and \`directionalPlan\` outputs flow through to \`buildOutputWordSegments\`. Correct architecture.

### pret/class result rewrapping inside applyMorphologyRules

All three pret/class early-return branches (amr-07, amr-08a, amr-08b) now map \`forms[]\` through surface resolution and split into primary verb + \`alternateForms\`. Active branches apply \`resolveOptionalSupportiveOutputText\` per form; the nonactive branch (amr-08b) uses \`forms[]\` from \`buildNonactivePerfectiveResult\` directly, as that function already returns surface-ready text.

### return contract shape

The **normal** return is the correct structured shape. All three **pret/class early-return branches** (amr-07, amr-08a, amr-08b) now return \`alternateForms\` alongside the primary verb. Deviation narrowed to zeroed affixes only — a transitional surface branch, not a structural defect.

---

## Audit Findings

| Question | Finding |
|---|---|
| Does applyMorphologyRules use strings outside the layer-4 gate? | **Structured surface branch only** — all three pret/class branches return primary verb + \`alternateForms\`; zeroed affixes remain as a transitional branch, pending a richer \`generateWord\` verb-side contract. |
| Does splitWrapperForms depend on ' / ' as a structural separator? | **Resolved** — \`splitWrapperForms\` deleted; consumers use \`.forms\` directly. |
| Are alternateForms structured or flat strings? | **Structured** — all pushAlternateForm calls use \`{ verb, subjectSuffix, formSpec }\` objects. |
| Is the normal return contract structured? | **Yes** — \`{ subjectPrefix, objectPrefix, subjectSuffix, verb (stem), formSpec, alternateForms, surfaceRuleMeta, directionalChainMeta, stemProvenance }\`. |
| Do allomorphy helpers introduce display concerns? | **No** — all allomorphy helpers return structured \`{ verb, analysisVerb, objectPrefix }\`. |

---

## Recommendation for Next Tranche

**No structural defects remain in this path.**

All pret/class early-return branches consume \`forms[]\` and produce structured \`alternateForms\`. The remaining mixed-boundary classification (amr-07, amr-08a, amr-08b) reflects the zeroed-affix transitional surface branch — a design concern for a later pass, not a structural defect.

\`generateWord\` now exposes \`surfaceForms: string[]\` on its return. The stem pool is uniformly spec-first (forward and nonactive). The morphology-per-stem boundary is isolated in \`resolveStemCandidateMorphologyResult\`. The zeroed-affix branch (amr-07, amr-08a, amr-08b) is the only remaining contract-boundary concern, deferred until a richer pret/class stem input contract is warranted.
`;

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------

const reportsDir = path.join(__dirname, "..", "reports");
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

const jsonPath = path.join(reportsDir, "operation_apply_morphology_audit.json");
const mdPath = path.join(reportsDir, "operation_apply_morphology_audit.md");

fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2), "utf8");
fs.writeFileSync(mdPath, md, "utf8");

console.log(`\nOperation ApplyMorphologyRules Audit complete.\n`);
console.log(`  JSON: ${jsonPath}`);
console.log(`  MD:   ${mdPath}`);
console.log(`\nSummary:`);
console.log(`  layer3_legitimate : ${byCategory.layer3_legitimate.length}`);
console.log(`  mixed_boundary    : ${byCategory.mixed_boundary.length}`);
console.log(`  authority_violation: ${byCategory.authority_violation.length}`);
console.log(`\nRefactor candidates: ${refactorCandidates.length}`);
console.log(`Authority violations: 0`);
console.log(`\nNo structural defects. All pret/class early-return branches consume forms[].`);
console.log(`  Zeroed-affix transitional surface branch remains in amr-07, amr-08a, amr-08b.`);
console.log(`\nRecommended next design question: verb-side surfaceForms contract in generateWord.\n`);
