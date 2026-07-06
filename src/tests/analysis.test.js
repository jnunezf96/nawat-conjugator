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
            typeof ctx.getLesson57AnalysisSubsectionInventory,
            typeof ctx.buildLesson57AnalysisPursuitFrame,
            typeof ctx.getLesson58AnalysisSubsectionInventory,
            typeof ctx.buildLesson58AnalysisPursuitFrame,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildAnalysisBoundaryMetadata();
    s.eq(
        "analysis boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            pdfRefs: boundary.pdfRefs,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "analysis-boundary",
            lessons: [57, 58],
            status: "partial",
            pdfRefs: ["Andrews Lessons 57-58"],
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
                "sourceContext",
                "referentRelation",
                "diagnosticEvidence",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized analysis issue remains unconfirmed without Andrews text-source context",
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
                "analysis-issue-source-gated",
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
            "Andrews miscellany categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    const lesson57PursuitFrame = ctx.buildLesson57AnalysisPursuitFrame();
    s.eq(
        "Lesson 57 pursuit frame records Andrews miscellany part-one diagnostics without generation",
        {
            outputKind: lesson57PursuitFrame.outputKind,
            stepNumber: lesson57PursuitFrame.stepNumber,
            pdfRefs: lesson57PursuitFrame.pdfRefs,
            plannedArrowIds: lesson57PursuitFrame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson57PursuitFrame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            redirectAction: lesson57PursuitFrame.redirectAction,
            orthographyStatus: lesson57PursuitFrame.orthographyStatus,
            hitCount: lesson57PursuitFrame.hitCount,
            missCount: lesson57PursuitFrame.missCount,
            closestPass: lesson57PursuitFrame.closestPass,
            remainingGapMentionsReferentTracking: /referent tracking/.test(lesson57PursuitFrame.remainingGap),
            subsectionRanges: lesson57PursuitFrame.subsectionInventory.map((entry) => entry.range),
            subsectionIssues: lesson57PursuitFrame.subsectionInventory.map((entry) => entry.issue),
            coverage: lesson57PursuitFrame.coverage,
            boundaries: lesson57PursuitFrame.boundaries,
        },
        {
            outputKind: "lesson-57-analysis-pursuit-frame",
            stepNumber: 57,
            pdfRefs: [
                "Andrews Lesson 57.1",
                "Andrews Lesson 57.2",
                "Andrews Lesson 57.3",
                "Andrews Lesson 57.4",
                "Andrews Lesson 57.5",
                "Andrews Lesson 57.6",
                "Andrews Lesson 57.7",
            ],
            plannedArrowIds: ["lesson-57-analysis-audit"],
            firedArrowIds: [["lesson-57-analysis-audit", "hit"]],
            redirectAction: "diagnostic-only",
            orthographyStatus: "not-surface-bearing",
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            remainingGapMentionsReferentTracking: true,
            subsectionRanges: ["57.1", "57.2", "57.3", "57.4", "57.5", "57.6", "57.7"],
            subsectionIssues: [
                "nonsystemic-tense",
                "irregular-valence",
                "absolute-topic",
                "agreement-mismatch",
                "adverbial-nnc-supplement",
                "problematic-construction",
                "miscellany",
            ],
            coverage: {
                subsectionCount: 7,
                diagnosticKindCount: 23,
                blockerCount: 21,
                generationAllowed: false,
            },
            boundaries: {
                noClassicalSurfaceImport: true,
                noNewFixtureEvidence: true,
                noSilentGeneration: true,
                textualAnalysisGenerationAllowed: false,
                staticAnalysisDataExists: false,
                visibleUiSpanishRequired: true,
            },
        }
    );
    const lesson58PursuitFrame = ctx.buildLesson58AnalysisPursuitFrame();
    s.eq(
        "Lesson 58 pursuit frame records Andrews miscellany part-two diagnostics without generation",
        {
            outputKind: lesson58PursuitFrame.outputKind,
            stepNumber: lesson58PursuitFrame.stepNumber,
            pdfRefs: lesson58PursuitFrame.pdfRefs,
            plannedArrowIds: lesson58PursuitFrame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson58PursuitFrame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            redirectAction: lesson58PursuitFrame.redirectAction,
            orthographyStatus: lesson58PursuitFrame.orthographyStatus,
            hitCount: lesson58PursuitFrame.hitCount,
            missCount: lesson58PursuitFrame.missCount,
            closestPass: lesson58PursuitFrame.closestPass,
            remainingGapMentionsMahAst: /mah-construction ASTs/.test(lesson58PursuitFrame.remainingGap),
            subsectionRanges: lesson58PursuitFrame.subsectionInventory.map((entry) => entry.range),
            subsectionIssues: lesson58PursuitFrame.subsectionInventory.map((entry) => entry.issue),
            coverage: lesson58PursuitFrame.coverage,
            boundaries: lesson58PursuitFrame.boundaries,
        },
        {
            outputKind: "lesson-58-analysis-pursuit-frame",
            stepNumber: 58,
            pdfRefs: [
                "Andrews Lesson 58.1",
                "Andrews Lesson 58.2",
                "Andrews Lesson 58.3",
                "Andrews Lesson 58.4",
                "Andrews Lesson 58.5",
                "Andrews Lesson 58.6",
                "Andrews Lesson 58.7",
                "Andrews Lesson 58.8",
            ],
            plannedArrowIds: ["lesson-58-analysis-audit"],
            firedArrowIds: [["lesson-58-analysis-audit", "hit"]],
            redirectAction: "diagnostic-only",
            orthographyStatus: "not-surface-bearing",
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            remainingGapMentionsMahAst: true,
            subsectionRanges: ["58.1", "58.2", "58.3", "58.4", "58.5", "58.6", "58.7", "58.8"],
            subsectionIssues: [
                "miscellany",
                "problematic-construction",
                "exclamation",
                "mah-construction",
                "mah-construction",
                "mah-construction",
                "incorporated-noun-subject-warning",
                "textual-problem",
            ],
            coverage: {
                subsectionCount: 8,
                diagnosticKindCount: 39,
                blockerCount: 24,
                generationAllowed: false,
            },
            boundaries: {
                noClassicalSurfaceImport: true,
                noNewFixtureEvidence: true,
                noSilentGeneration: true,
                textualAnalysisGenerationAllowed: false,
                staticAnalysisDataExists: false,
                visibleUiSpanishRequired: true,
            },
        }
    );
    s.no("analysis boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("analysis boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const analysisCandidate = ctx.classifyAnalysisIssueCandidate({
        textSource: "unknown",
        candidate: "mah",
        analysisIssue: "mah-construction",
        affectedUnit: "sentence",
        falsePositiveSource: "mah-string",
    });
    const analysisFrame = analysisCandidate.grammarFrame;
    s.eq(
        "analysis metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(analysisFrame),
            routeFamily: analysisFrame?.routeContract?.routeFamily || "",
            routeStage: analysisFrame?.routeContract?.routeStage || "",
            generationAllowed: analysisFrame?.routeContract?.generationAllowed,
            analysisIssue: analysisFrame?.routeContract?.targetContract?.analysisIssue || "",
            andrewsRef: analysisFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(analysisCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "textual-analysis",
            routeStage: "classify-candidate",
            generationAllowed: false,
            analysisIssue: "mah-construction",
            andrewsRef: "Andrews Lessons 57-58",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
