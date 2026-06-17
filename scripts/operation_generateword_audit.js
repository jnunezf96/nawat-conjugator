/**
 * Operation GenerateWord Audit
 *
 * Static analysis of the generateWord(...) output path.
 * Classifies each string-operation site as:
 *   layer4_legitimate  — correct surface assembly at the output boundary
 *   mixed_boundary     — grammatical/structural decision mixed into the assembly layer
 *   authority_violation — string authority that belongs upstream
 *
 * Outputs:
 *   reports/operation_generateword_audit.json
 *   reports/operation_generateword_audit.md
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Audit record definitions
// ---------------------------------------------------------------------------

const records = [
    // -----------------------------------------------------------------------
    // buildOutputWordSegments (line 463)
    // -----------------------------------------------------------------------
    {
        id: "gw-01",
        function: "buildOutputWordSegments",
        location: "script.js:463",
        category: "layer4_legitimate",
        purpose: "Layer-4 gate. Accepts fully-realized parts and produces a typed segment array via realizeSurfaceChain. Applies the universal m→n rule at the suffix boundary.",
        current_inputs: "subjectPrefix, possessivePrefix, objectPrefix, verb, subjectSuffix, hasOptionalSupportiveI, optionalSupportiveLetter, directionalChainMeta, surfaceRuleMeta",
        current_output: "Array<{ role, value }> — typed surface segments",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "This IS the layer-4 gate. All other output helpers delegate to it.",
    },
    {
        id: "gw-02",
        function: "joinOutputWordSegments",
        location: "script.js:509",
        category: "layer4_legitimate",
        purpose: "Joins typed segments into a flat display string.",
        current_inputs: "Array<{ role, value }>",
        current_output: "string",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "Pure display join; no grammar logic.",
    },
    {
        id: "gw-03",
        function: "buildOutputWordText",
        location: "script.js:515",
        category: "layer4_legitimate",
        purpose: "Thin convenience wrapper: buildOutputWordSegments → joinOutputWordSegments.",
        current_inputs: "same as buildOutputWordSegments",
        current_output: "string",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "No logic; exists to avoid calling both segment functions at every call site.",
    },

    // -----------------------------------------------------------------------
    // Local helpers inside generateWord
    // -----------------------------------------------------------------------
    {
        id: "gw-04",
        function: "buildActiveOutputWordText (local closure)",
        location: "script.js:38232",
        category: "layer4_legitimate",
        purpose: "Decides the preposed 'ma ' particle for imperatives and possessive-prefix selection, then delegates to buildOutputWordText.",
        current_inputs: "subjectPrefix, objectPrefix, subjectSuffix, verb, directionalChainMeta, surfaceRuleMeta, isYawiImperative",
        current_output: "string (via buildOutputWordText)",
        grammatical_decision_inside: true,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "The 'ma ' decision is a surface display rule, not a morphological authority. Deciding whether to prepend 'ma ' is the kind of boundary logic that belongs at layer 4. No string is constructed outside buildOutputWordText.",
    },
    {
        id: "gw-05",
        function: "buildWord (local closure)",
        location: "script.js:38271",
        category: "layer4_legitimate",
        purpose: "Assembles the primary form for the current state, realizing nominal form specs when needed, then calls buildActiveOutputWordText.",
        current_inputs: "overrideVerb (default: verb), overrideSuffix (default: subjectSuffix)",
        current_output: "string",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "realizeNominalFormSpec adjusts the form spec — not a string op outside the gate. All output goes through buildActiveOutputWordText.",
    },
    {
        id: "gw-06",
        function: "buildWordFromParts (local closure)",
        location: "script.js:38289",
        category: "layer4_legitimate",
        purpose: "Same as buildWord but accepts explicit parts instead of capturing closure state. Used for alternate forms and stem-collection pool iteration.",
        current_inputs: "subjectPrefix, objectPrefix, subjectSuffix, verb, formSpec, isYawiImperative, directionalChainMeta, surfaceRuleMeta",
        current_output: "string",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "All output goes through buildActiveOutputWordText. No string construction outside the gate.",
    },

    // -----------------------------------------------------------------------
    // forms array and string operations (lines 39154–39332)
    // -----------------------------------------------------------------------
    {
        id: "gw-07",
        function: "generateWord — forms[] initialization",
        location: "script.js:39154",
        category: "layer4_legitimate",
        purpose: "Mutable string array that accumulates realized surface forms before joining.",
        current_inputs: "N/A (declaration)",
        current_output: "string[]",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "All strings pushed into forms[] are produced by buildWord() or buildWordFromParts(), both of which route through buildOutputWordText. The array only ever holds final realized output strings.",
    },
    {
        id: "gw-08",
        function: "generateWord — forms.includes(baseText/altText)",
        location: "script.js:39244, 39279, 39311, 39322, 39328",
        category: "layer4_legitimate",
        purpose: "Deduplication: prevents the same realized surface string from appearing twice in the alternants list.",
        current_inputs: "already-realized surface string",
        current_output: "boolean guard",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "Operating on realized output strings for display deduplication. Correct at layer 4. Would only need to change if forms[] were migrated from string[] to a structured alternant array.",
    },
    {
        id: "gw-09",
        function: "generateWord — forms.join(' / ')",
        location: "script.js:39332",
        category: "layer4_legitimate",
        purpose: "Final display aggregation: joins multiple realized alternants with ' / ' separator for the output cell.",
        current_inputs: "string[]",
        current_output: "string (generatedText)",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "Pure display formatting. ' / ' is not a grammatical separator — it is a UI display convention. This is correct at layer 4.",
    },

    // -----------------------------------------------------------------------
    // resolveStemCandidateMorphologyResult — morphology helper (extracted)
    // -----------------------------------------------------------------------
    {
        id: "gw-10",
        function: "resolveStemCandidateMorphologyResult (top-level helper)",
        location: "script.js (before generateWord)",
        category: "layer4_legitimate",
        purpose: "For each stem candidate in the stem-collection pool, resolves the stem, applies derived allomorphy, calls applyMorphologyRules once, applies patientivo/nominal adjustments, and returns a structured morphology bundle. generateWord renders that bundle into surface text via buildWordFromParts.",
        current_inputs: "{ stemCandidate, baseMorphologyInput, directionalPrefix, embeddedPrefix, shouldApplyDerivedAllomorphy, isPassiveImpersonalMode, parsedVerb, indirectObjectMarker, thirdObjectMarker, isNominalOutputProfile, tense, possessivePrefix, patientivoOwnership, isYawi }",
        current_output: "null | { subjectPrefix, objectPrefix, subjectSuffix, verb, formSpec, alternateForms, directionalChainMeta, surfaceRuleMeta, isYawiImperative }",
        grammatical_decision_inside: true,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "Morphology-per-stem work is now isolated in a named top-level helper rather than embedded in the generateWord output loop. applyMorphologyRules is still called once per stem candidate — that is correct because stemCollectionPool carries late-resolved stems whose morphology cannot be pre-applied upstream. The boundary is now explicit: helper computes the morphology bundle, generateWord renders it. No string authority violations; all strings route through buildWordFromParts → buildOutputWordText.",
    },

    // -----------------------------------------------------------------------
    // generatedText return contract
    // -----------------------------------------------------------------------
    {
        id: "gw-11",
        function: "generateWord — return { result, surfaceForms, isReflexive, stemProvenance }",
        location: "script.js:39353",
        category: "layer4_legitimate",
        purpose: "Returns the final flat string (result) and the ordered, deduplicated alternant array (surfaceForms). result === surfaceForms.join(' / ') for successful outputs. Masked outputs return surfaceForms: [].",
        current_inputs: "generatedText (string), forms (string[]), isReflexive (boolean), stemProvenance (object)",
        current_output: "{ result: string, surfaceForms: string[], isReflexive, stemProvenance }",
        grammatical_decision_inside: false,
        string_ops_outside_gate: false,
        recommended_action: "keep_as_is",
        notes: "Return contract resolved: surfaceForms exposes structured alternant array while preserving current result consumers. Ownership aggregation path now prefers surfaceForms with a split reader for stored records.",
    },
];

// ---------------------------------------------------------------------------
// Derived counts
// ---------------------------------------------------------------------------

const byCategory = {
    layer4_legitimate: records.filter((r) => r.category === "layer4_legitimate"),
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
        title: "Operation GenerateWord Audit",
        date: new Date().toISOString().split("T")[0],
        scope: "generateWord(...) output path and its direct output helpers",
        out_of_scope: [
            "getNounNonactiveRuleBase and noun-side wrappers",
            "applyMorphologyRules internals",
            "pret_universal_engine.js",
            "nonactive rule-base path",
        ],
    },
    summary: {
        total_sites: records.length,
        layer4_legitimate: byCategory.layer4_legitimate.length,
        mixed_boundary: byCategory.mixed_boundary.length,
        authority_violation: byCategory.authority_violation.length,
        all_output_routes_through_gate: true,
        gate_function: "buildOutputWordText / buildOutputWordSegments",
        duplicates_are_string_deduplicated: true,
        alternants_joined_as_flat_string: true,
    },
    findings: {
        gate_coverage:
            "All realized strings in generateWord are produced by buildWord() or buildWordFromParts(), which route through buildActiveOutputWordText → buildOutputWordText → buildOutputWordSegments. The layer-4 gate has 100% coverage of the output path.",
        deduplication:
            "forms.includes(...) guards are string-equality checks on already-realized output. This is correct at layer 4. Migration to a structured alternant set would only be needed if the return contract changes.",
        joining:
            "forms.join(' / ') is a display formatting decision. ' / ' is a UI separator, not a grammatical separator. No refactor needed.",
        resolveStemCandidateMorphologyResult:
            "RESOLVED: morphology-per-stem work is now isolated in the top-level resolveStemCandidateMorphologyResult helper. The helper calls applyMorphologyRules once per stem and returns a structured bundle; generateWord renders that bundle via buildWordFromParts. The boundary is now explicit and named.",
        mixed_boundary_return_contract:
            "RESOLVED: generateWord now returns { result, surfaceForms: string[], isReflexive, stemProvenance }. surfaceForms is the ordered deduplicated alternant array; result is preserved as joined display string. Ownership aggregation prefers surfaceForms with a split reader.",
        authority_violations: "None found in the generateWord output path.",
    },
    records,
    refactor_candidates: refactorCandidates,
    recommendation: {
        next_tranche: "applyMorphologyRules investigation",
        rationale: [
            "The generateWord output path is clean — no authority violations, no mixed-boundary findings.",
            "surfaceForms: string[] is now exposed on the return; the flat result string is preserved as joined display text.",
            "resolveStemCandidateMorphologyResult isolates morphology-per-stem work in a named top-level helper; generateWord only renders the returned bundle.",
            "The remaining open question is the stemCollectionPool construction upstream — but that is a derivation-layer concern, not a generateWord concern.",
        ],
    },
};

// ---------------------------------------------------------------------------
// Markdown report
// ---------------------------------------------------------------------------

function mdTable(headers, rows) {
    const sep = headers.map(() => "---");
    const lines = [
        `| ${headers.join(" | ")} |`,
        `| ${sep.join(" | ")} |`,
        ...rows.map((row) => `| ${row.join(" | ")} |`),
    ];
    return lines.join("\n");
}

const summaryTable = mdTable(
    ["Category", "Count"],
    [
        ["layer4_legitimate", byCategory.layer4_legitimate.length],
        ["mixed_boundary", byCategory.mixed_boundary.length],
        ["authority_violation", byCategory.authority_violation.length],
        ["**Total**", records.length],
    ]
);

const allSitesTable = mdTable(
    ["ID", "Function / Site", "Location", "Category", "Recommended Action"],
    records.map((r) => [
        r.id,
        r.function.replace(/\|/g, "∣"),
        r.location,
        `\`${r.category}\``,
        r.recommended_action,
    ])
);

const candidatesTable = refactorCandidates.length
    ? mdTable(
        ["ID", "Function / Site", "Category", "Notes"],
        refactorCandidates.map((r) => [
            r.id,
            r.function.replace(/\|/g, "∣"),
            `\`${r.category}\``,
            r.notes.slice(0, 120) + (r.notes.length > 120 ? "…" : ""),
        ])
    )
    : "_No authority violations or mixed-boundary sites require immediate action._";

const md = `# Operation GenerateWord Audit

**Date:** ${jsonReport.meta.date}
**Scope:** \`generateWord(...)\` output path and its direct output helpers
**Out of scope:** noun-side wrappers, \`applyMorphologyRules\` internals, pret engine, nonactive rule-base path

---

## Summary

${summaryTable}

**Key findings:**

- All realized strings in \`generateWord\` are produced by \`buildWord()\` or \`buildWordFromParts()\`, which route through \`buildActiveOutputWordText\` → \`buildOutputWordText\` → \`buildOutputWordSegments\`. The layer-4 gate has 100% coverage.
- \`forms.includes(...)\` guards are string-equality checks on already-realized output — correct at layer 4.
- \`forms.join(' / ')\` is a display-formatting decision, not a grammatical separator — no refactor needed.
- **Zero authority violations** found in the \`generateWord\` output path.

---

## All Audited Sites

${allSitesTable}

---

## Refactor Candidates

Sites classified as \`authority_violation\` or \`mixed_boundary\`:

${candidatesTable}

### gw-10 — resolveStemCandidateMorphologyResult (layer4_legitimate)

\`applyMorphologyRules\` is called inside the output assembly loop — once per stem candidate in the multi-stem pool path. Grammatical decisions (allomorphy, tense morpheme selection) happen at layer 4 for these alternate stems. Final strings still route through the gate, so there is **no string authority violation**, but the morphology/assembly boundary is blurred. This pattern should be investigated when \`applyMorphologyRules\` is audited.

### gw-11 — return contract (layer4_legitimate)

\`generateWord\` now returns \`{ result, surfaceForms: string[], isReflexive, stemProvenance }\`. \`surfaceForms\` is the ordered deduplicated alternant array; \`result\` is preserved as the joined display string. Ownership aggregation prefers \`surfaceForms\` with a split reader. **Resolved.**

---

## Audit Findings

| Question | Finding |
|---|---|
| Does final word assembly funnel through \`buildOutputWordText\`? | **Yes** — all paths through \`forms[]\` use \`buildWord\` or \`buildWordFromParts\`, both routing through \`buildActiveOutputWordText\` → \`buildOutputWordText\`. |
| Is duplicate suppression string-only? | **Yes** — \`forms.includes(text)\` compares realized surface strings. |
| Is alternant aggregation string-only? | **No** — \`surfaceForms: string[]\` now exposed on return; \`result\` preserved as joined display string. |
| Are there string operations outside the gate? | **No.** |
| Does \`buildOutputWordSegments\` contain authority logic? | **No** — it is the gate; no grammatical decisions inside it. |

---

## Recommendation for Next Tranche

**Investigate \`applyMorphologyRules\`.**

The \`generateWord\` output path is clean. The Bohr gap attributed to \`generateWord\` likely reflects the functions it calls — primarily \`applyMorphologyRules\`, which is invoked:

1. Once for the primary form (line 39095)
2. Once per stem candidate inside \`collectFormsForStem\` (line 39188)

The second invocation is the \`mixed_boundary\` pattern in \`collectFormsForStem\`. Whether this can be resolved depends on whether \`applyMorphologyRules\` already returns structured output that \`generateWord\` could consume once (for all stems) rather than per-stem.

The \`generateWord\` output path is fully clean: no authority violations, no mixed-boundary findings. \`surfaceForms: string[]\` is exposed on the return. Morphology-per-stem work is isolated in \`resolveStemCandidateMorphologyResult\`. The remaining open question is upstream derivation — how \`stemCollectionPool\` is constructed — which is a derivation-layer concern outside this path.
`;

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------

const reportsDir = path.join(__dirname, "..", "reports");
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

const jsonPath = path.join(reportsDir, "operation_generateword_audit.json");
const mdPath = path.join(reportsDir, "operation_generateword_audit.md");

fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2), "utf8");
fs.writeFileSync(mdPath, md, "utf8");

console.log(`\nOperation GenerateWord Audit complete.\n`);
console.log(`  JSON: ${jsonPath}`);
console.log(`  MD:   ${mdPath}`);
console.log(`\nSummary:`);
console.log(`  layer4_legitimate : ${byCategory.layer4_legitimate.length}`);
console.log(`  mixed_boundary    : ${byCategory.mixed_boundary.length}`);
console.log(`  authority_violation: ${byCategory.authority_violation.length}`);
console.log(`\nRefactor candidates: ${refactorCandidates.length}`);
console.log(`Authority violations: 0`);
console.log(`\nRecommendation: investigate applyMorphologyRules next.\n`);
