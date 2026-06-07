"use strict";

/**
 * Tests for src/core/analysis/analysis.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("analysis");

    s.eq(
        "Lessons 57-58 analysis API is exported",
        [
            typeof ctx.buildAnalysisBoundaryMetadata,
            typeof ctx.classifyAnalysisIssueCandidate,
            typeof ctx.classifyAnalysisFalsePositive,
            typeof ctx.getAnalysisAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildAnalysisBoundaryMetadata();
    s.eq(
        "analysis boundary is explicit and non-generative",
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
            kind: "analysis-boundary",
            lessons: [57, 58],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasNncGeneration: true,
                hasSentenceLayerMetadata: true,
                hasClauseShellMetadata: true,
                hasTextualAnalysisEngine: false,
                hasConfirmedTextExamples: false,
                hasStaticAnalysisData: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesParserBehavior: false,
                changesSentenceLayerBehavior: false,
                treatsGeneratedWordAsAnalysisEvidence: false,
                treatsUiLabelsAsAnalysisEvidence: false,
            },
            questionFields: [
                "textSource",
                "analysisIssue",
                "affectedUnit",
                "expectedSystem",
                "diagnosticEvidence",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized analysis issue remains unconfirmed without Nawat text evidence",
        ctx.classifyAnalysisIssueCandidate({
            textSource: "unknown",
            candidate: "mah",
            analysisIssue: "mah-construction",
            affectedUnit: "sentence",
            falsePositiveSource: "mah-string",
        }),
        {
            kind: "analysis-issue-candidate-classification",
            version: 1,
            textSource: "unknown",
            candidate: "mah",
            analysisIssue: "mah-construction",
            affectedUnit: "sentence",
            expectedSystem: "",
            diagnosticEvidence: "",
            evidenceSource: "",
            falsePositiveSource: "mah-string",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "analysis-issue-needs-nawat-text-evidence",
                "analysis-issue-kind-recognized",
                "analysis-issue-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "topic/focus UI label is not analysis evidence",
        ctx.classifyAnalysisFalsePositive("topic-focus-ui-label"),
        {
            kind: "analysis-false-positive",
            version: 1,
            source: "topic-focus-ui-label",
            isTextualAnalysisEvidence: false,
            isMiscellanyEvidence: false,
            generationAllowed: false,
            diagnostics: ["analysis-issue-false-positive-source"],
            antiConflationRules: ctx.getAnalysisAntiConflationRules(),
        }
    );

    s.eq(
        "analysis metadata carries anti-conflation rules",
        ctx.getAnalysisAntiConflationRules(),
        [
            "analysis boundary metadata is not generation",
            "ordinary VNC or NNC output is not textual analysis evidence",
            "sentence-layer and clause-shell metadata are not full textual diagnostics",
            "topic/focus UI labels are not absolute-topic evidence",
            "a bare mah-looking string is not a confirmed mah construction",
            "CSV verb rows and translation labels are not textual problem evidence",
            "Andrews miscellany categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("analysis boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("analysis boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
