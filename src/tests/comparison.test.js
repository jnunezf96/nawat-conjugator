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
            typeof ctx.getLesson53ComparisonSubsectionInventory,
            typeof ctx.buildLesson53ComparisonPursuitFrame,
        ],
        ["function", "function", "function", "function", "function", "function"]
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
        "comparison classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyComparisonCandidate({
                target: "unknown",
                standard: "translation",
                comparisonRelation: "comparative-degree",
                dimension: "size",
                falsePositiveSource: "comparison-translation",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            unitKind: "comparison-clause-unit",
            routeStage: "classify-boundary",
            generationAllowed: false,
            diagnosticId: "comparison-needs-nawat-clause-evidence",
            enumerableGrammarFrame: false,
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

    s.eq(
        "Lesson 53 pursuit frame covers every Andrews similarity and comparison subsection",
        (() => {
            const inventory = ctx.getLesson53ComparisonSubsectionInventory();
            const frame = ctx.buildLesson53ComparisonPursuitFrame();
            return {
                kind: frame.kind,
                stepNumber: frame.stepNumber,
                routeStage: frame.routeStage,
                pdfRefCount: frame.pdfRefs.length,
                firstPdfRef: frame.pdfRefs[0],
                lastPdfRef: frame.pdfRefs[frame.pdfRefs.length - 1],
                subsectionCount: inventory.length,
                subsectionRefs: inventory.map((entry) => entry.andrewsSection),
                plannedArrowIds: frame.plannedArrows.map((arrow) => arrow.id),
                firedArrowIds: frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
                hitCount: frame.hitCount,
                missCount: frame.missCount,
                generationAllowed: frame.generationAllowed,
                closestPass: frame.closestPass,
                remainingGapsMentionIuhqui: frame.remainingGaps.some((gap) => /iuhqui/.test(gap)),
            };
        })(),
        {
            kind: "lesson-53-comparison-pursuit-frame",
            stepNumber: 53,
            routeStage: "audit-lesson-53",
            pdfRefCount: 7,
            firstPdfRef: "Andrews Lesson 53.1",
            lastPdfRef: "Andrews Lesson 53.7",
            subsectionCount: 20,
            subsectionRefs: [
                "53.1",
                "53.1 item 1",
                "53.1 item 2",
                "53.1 item 3",
                "53.1 item 4",
                "53.1 item 5",
                "53.1 item 6",
                "53.1 item 7",
                "53.2",
                "53.3",
                "53.4",
                "53.5",
                "53.5 item 1",
                "53.5 item 2",
                "53.5 item 2a",
                "53.5 item 2b",
                "53.5 item 2c",
                "53.5 item 2d",
                "53.6",
                "53.7",
            ],
            plannedArrowIds: ["lesson-53-comparison-audit"],
            firedArrowIds: [["lesson-53-comparison-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionIuhqui: true,
        }
    );

    s.eq(
        "Lesson 53 frame records similarity, equality, size, comparative, question, and superlative boundaries",
        (() => {
            const frame = ctx.buildLesson53ComparisonPursuitFrame();
            return {
                similarityRouteCount: frame.similarityFrame.expressionRoutes.length,
                iuhquiRoute: frame.similarityFrame.expressionRoutes[6],
                comparisonKinds: frame.architectureFrame.comparisonKinds,
                equalityRoutes: frame.equalityFrame.routes.map((route) => route.route),
                sizeRoutes: frame.sizeFrame.routes.map((route) => route.route),
                comparativeTwoConjuncts: frame.comparativeDegreeFrame.oftenUsesConjunctionWithOnlyTwoConjuncts,
                negativeIntroducers: frame.comparativeDegreeFrame.routes[1].negativeIntroducers,
                questionValue: frame.comparisonQuestionFrame.questionValue,
                superlativeDeletesNegative: frame.superlativeFrame.generalSuperiorityByDeletingContrastingNegativeStatement,
                superlativeVncs: frame.superlativeFrame.vncOptionsWithIcAdjoinedClause,
                generationBoundary: frame.currentEngineBoundary,
                orthographyHtoJ: frame.frames?.orthographyFrame?.hToJAdaptationRequiredBeforeVisibleNawatSurface,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            similarityRouteCount: 7,
            iuhquiRoute: {
                sourceSection: "Andrews 53.1 item 7",
                route: "ihui-or-iuhqui-construction",
                iuhquiCanServeAsPrincipalClause: true,
                impersonalSubjectCommon: true,
                adjoinedClauseMayUseIn: true,
                supplementaryNncOftenSentenceTopic: true,
                concatenateCanAdjoinToLargerStructure: true,
                icCanEstablishRelation: true,
            },
            comparisonKinds: ["sameness", "difference"],
            equalityRoutes: ["iuhqui-construction", "ihuan-construction"],
            sizeRoutes: ["ixquich-quantitive-pronominal-nnc", "quezqui-no-izqui-correlative", "more-more-correlative"],
            comparativeTwoConjuncts: true,
            negativeIntroducers: [
                "inahmo",
                "in ahmo iuh",
                "in ahmo iuhqui",
                "in ahmo mach iuh",
                "in ahmo mach iuhqui",
            ],
            questionValue: "how-much-more",
            superlativeDeletesNegative: true,
            superlativeVncs: ["tlapanahuia", "tlacempanahuia"],
            generationBoundary: {
                comparisonBoundaryMetadataImplemented: true,
                comparisonAstImplemented: false,
                similarityFrameDiagnosticOnly: true,
                equalityFrameDiagnosticOnly: true,
                sizeFrameDiagnosticOnly: true,
                comparativeDegreeFrameDiagnosticOnly: true,
                comparisonQuestionFrameDiagnosticOnly: true,
                superlativeFrameDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticComparisonDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson53GenerationImplemented: false,
            },
            orthographyHtoJ: true,
            grammarRouteStage: "audit-lesson-53",
            diagnosticIds: [
                "comparison-lesson-53-diagnostic-partial",
                "comparison-needs-nawat-clause-evidence",
            ],
        }
    );

    return s;
}

module.exports = { run };
