"use strict";

/**
 * Tests for src/core/nnc/compound/compound.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_compound");

    s.eq(
        "Lessons 31-32 compound/affective NNC API is exported",
        [
            typeof ctx.buildCompoundNncAffectiveBoundaryMetadata,
            typeof ctx.classifyCompoundNncAffectiveCandidate,
            typeof ctx.classifyCompoundNncAffectiveFalsePositive,
            typeof ctx.getCompoundNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildCompoundNncAffectiveBoundaryMetadata();
    s.eq(
        "compound/affective NNC boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "compound-nnc-affective-boundary",
            lessons: [31, 32],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncCompoundParserMetadata: true,
                hasCompoundNncGeneration: false,
                hasAffectiveNncGeneration: false,
                hasStaticAffectiveData: false,
                treatsVncCompoundAstAsNncEvidence: false,
                changesOrdinaryNncGeneration: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "headStem",
                "embeddedStem",
                "compoundKind",
                "affectiveValue",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "outer lexical VNC compound stays unconfirmed compound-NNC evidence",
        ctx.classifyCompoundNncAffectiveCandidate({
            candidate: "(shuchi)-(kwi)",
            headStem: "kwi",
            embeddedStem: "shuchi",
            compoundKind: "lexical-embed",
            hasCompoundAst: true,
            sourceKind: "fixture",
            falsePositiveSource: "outer-lexical-embed",
        }),
        {
            kind: "compound-nnc-affective-candidate-classification",
            version: 1,
            candidate: "(shuchi)-(kwi)",
            headStem: "kwi",
            embeddedStem: "shuchi",
            compoundKind: "lexical-embed",
            affectiveValue: "",
            evidenceSource: "",
            falsePositiveSource: "outer-lexical-embed",
            hasCompoundAst: true,
            sourceKind: "fixture",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "compound-nnc-needs-nawat-evidence",
                "vnc-compound-ast-not-nnc-evidence",
                "compound-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "ordinary NNC fixture is classified as false positive affective evidence",
        ctx.classifyCompoundNncAffectiveFalsePositive("ordinary-nnc-fixture"),
        {
            kind: "compound-nnc-affective-false-positive",
            version: 1,
            source: "ordinary-nnc-fixture",
            isCompoundNncEvidence: false,
            isAffectiveNncEvidence: false,
            generationAllowed: false,
            diagnostics: ["compound-nnc-false-positive-source"],
            antiConflationRules: ctx.getCompoundNncAntiConflationRules(),
        }
    );

    s.eq(
        "compound/affective NNC metadata carries anti-conflation rules",
        ctx.getCompoundNncAntiConflationRules(),
        [
            "VNC compoundAst metadata is not compound NNC generation",
            "outer lexical embeds are not compound nounstem fixture evidence",
            "ordinary NNC fixtures are not affective NNC fixtures",
            "open-stem ordinary NNC previews are not compound NNC evidence",
            "parser punctuation is not a compound NNC schema",
            "Andrews compound/affective categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("compound/affective boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("compound/affective boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
