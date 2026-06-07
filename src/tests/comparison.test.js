"use strict";

/**
 * Tests for src/core/comparison/comparison.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("comparison");

    s.eq(
        "Lesson 53 comparison API is exported",
        [
            typeof ctx.buildComparisonBoundaryMetadata,
            typeof ctx.classifyComparisonCandidate,
            typeof ctx.classifyComparisonFalsePositive,
            typeof ctx.getComparisonAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildComparisonBoundaryMetadata();
    s.eq(
        "comparison boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "comparison-boundary",
            lesson: 53,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveLikeWordOutputs: true,
                hasAdjectivalModificationBoundary: true,
                hasComparisonAst: false,
                hasConfirmedClauseExamples: false,
                hasStaticComparisonData: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsAdjectiveOutputAsComparisonEvidence: false,
                treatsTranslationsAsComparisonEvidence: false,
            },
            questionFields: [
                "target",
                "standard",
                "comparisonRelation",
                "dimension",
                "marker",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized comparison relation remains unconfirmed without Nawat clause evidence",
        ctx.classifyComparisonCandidate({
            target: "unknown",
            standard: "translation",
            comparisonRelation: "comparative-degree",
            dimension: "size",
            falsePositiveSource: "comparison-translation",
        }),
        {
            kind: "comparison-candidate-classification",
            version: 1,
            target: "unknown",
            standard: "translation",
            candidate: "",
            comparisonRelation: "comparative-degree",
            dimension: "size",
            marker: "",
            evidenceSource: "",
            falsePositiveSource: "comparison-translation",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "comparison-needs-nawat-clause-evidence",
                "comparison-relation-recognized",
                "comparison-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "adjective-like output is not comparison evidence",
        ctx.classifyComparisonFalsePositive("adjective-mode-output"),
        {
            kind: "comparison-false-positive",
            version: 1,
            source: "adjective-mode-output",
            isComparisonEvidence: false,
            isComparisonAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["comparison-false-positive-source"],
            antiConflationRules: ctx.getComparisonAntiConflationRules(),
        }
    );

    s.eq(
        "comparison metadata carries anti-conflation rules",
        ctx.getComparisonAntiConflationRules(),
        [
            "comparison boundary metadata is not generation",
            "adjective-like word output is not comparison syntax",
            "adjectival modification metadata is not similarity or comparison evidence",
            "degree, question, or translation labels are not Nawat/Pipil comparison forms",
            "single generated words do not prove equality, similarity, comparative, or superlative relations",
            "Andrews comparison categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("comparison boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("comparison boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
