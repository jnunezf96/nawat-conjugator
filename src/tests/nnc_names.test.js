"use strict";

/**
 * Tests for src/core/nnc/names/names.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_names");

    s.eq(
        "Lesson 56 personal-name NNC API is exported",
        [
            typeof ctx.buildPersonalNameNncBoundaryMetadata,
            typeof ctx.classifyPersonalNameNncCandidate,
            typeof ctx.classifyPersonalNameNncFalsePositive,
            typeof ctx.getPersonalNameNncAntiConflationRules,
            typeof ctx.getLesson56PersonalNameNncSubsectionInventory,
            typeof ctx.buildLesson56PersonalNameNncPursuitFrame,
        ],
        ["function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildPersonalNameNncBoundaryMetadata();
    s.eq(
        "personal-name NNC boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            appendices: boundary.appendices,
            status: boundary.status,
            pdfRefs: boundary.pdfRefs,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "personal-name-nnc-boundary",
            lesson: 56,
            appendices: ["E"],
            status: "partial",
            pdfRefs: [
                "Andrews Lesson 56.1",
                "Andrews Lesson 56.2",
                "Andrews Lesson 56.3",
                "Andrews Lesson 56.4",
                "Andrews Lesson 56.5",
            ],
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasPlaceGentilicBoundary: true,
                hasAdverbialAdjunctionBoundary: true,
                hasConjunctionBoundary: true,
                hasPersonalNameNncGeneration: false,
                hasCalendarNameGeneration: false,
                hasStaticNameData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesPlaceGentilicGeneration: false,
                changesAdjunctionBehavior: false,
                changesConjunctionBehavior: false,
                treatsCapitalizationAsNameEvidence: false,
                treatsTranslationsAsNameEvidence: false,
            },
            questionFields: [
                "nameSource",
                "sourceClauseType",
                "outerSubject",
                "innerSubjectBarrier",
                "innerSourceStructure",
                "clauseSource",
                "adjunctionSource",
                "conjunctionSource",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized personal-name source remains unconfirmed without Nawat evidence",
        ctx.classifyPersonalNameNncCandidate({
            candidate: "capitalized label",
            nameSource: "unknown",
            personalNameKind: "single-clause-name",
            sourceClauseType: "single-clause-name",
            falsePositiveSource: "capitalization-label",
        }),
        {
            kind: "personal-name-nnc-candidate-classification",
            version: 1,
            candidate: "capitalized label",
            nameSource: "unknown",
            personalNameKind: "single-clause-name",
            sourceClauseType: "single-clause-name",
            clauseSource: "",
            adjunctionSource: "",
            conjunctionSource: "",
            evidenceSource: "",
            falsePositiveSource: "capitalization-label",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "personal-name-nnc-needs-nawat-evidence",
                "personal-name-nnc-kind-recognized",
                "personal-name-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "personal-name classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyPersonalNameNncCandidate({
                candidate: "capitalized label",
                nameSource: "unknown",
                personalNameKind: "single-clause-name",
                falsePositiveSource: "capitalization-label",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                stemKind: classification.frames.stemFrame.stemKind,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            unitKind: "personal-name-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "personal-name-source-candidate",
            diagnosticId: "personal-name-nnc-needs-nawat-evidence",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "capitalization label is not personal-name NNC evidence",
        ctx.classifyPersonalNameNncFalsePositive("capitalization-label"),
        {
            kind: "personal-name-nnc-false-positive",
            version: 1,
            source: "capitalization-label",
            isPersonalNameNncEvidence: false,
            isCalendarNameEvidence: false,
            generationAllowed: false,
            diagnostics: ["personal-name-nnc-false-positive-source"],
            antiConflationRules: ctx.getPersonalNameNncAntiConflationRules(),
        }
    );

    s.eq(
        "personal-name NNC metadata carries anti-conflation rules",
        ctx.getPersonalNameNncAntiConflationRules(),
        [
            "personal-name NNC boundary metadata is not generation",
            "ordinary NNC fixtures or open-stem previews are not personal-name fixture evidence",
            "capitalization labels and proper-name translations are not Nawat/Pipil name evidence",
            "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence",
            "calendar roadmap text is not personal-name NNC data",
            "Andrews personal-name categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    const lesson56PursuitFrame = ctx.buildLesson56PersonalNameNncPursuitFrame();
    s.eq(
        "Lesson 56 pursuit frame records Andrews personal-name NNC architecture without generation",
        {
            outputKind: lesson56PursuitFrame.outputKind,
            stepNumber: lesson56PursuitFrame.stepNumber,
            pdfRefs: lesson56PursuitFrame.pdfRefs,
            plannedArrowIds: lesson56PursuitFrame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson56PursuitFrame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            redirectAction: lesson56PursuitFrame.redirectAction,
            orthographyStatus: lesson56PursuitFrame.orthographyStatus,
            hitCount: lesson56PursuitFrame.hitCount,
            missCount: lesson56PursuitFrame.missCount,
            closestPass: lesson56PursuitFrame.closestPass,
            remainingGapMentionsNameData: /static names\/calendar data/.test(lesson56PursuitFrame.remainingGap),
            subsectionRanges: lesson56PursuitFrame.subsectionInventory.map((entry) => entry.range),
            subsectionRoles: lesson56PursuitFrame.subsectionInventory.map((entry) => entry.role),
            coverage: lesson56PursuitFrame.coverage,
            boundaries: lesson56PursuitFrame.boundaries,
        },
        {
            outputKind: "lesson-56-personal-name-nnc-pursuit-frame",
            stepNumber: 56,
            pdfRefs: [
                "Andrews Lesson 56.1",
                "Andrews Lesson 56.2",
                "Andrews Lesson 56.3",
                "Andrews Lesson 56.4",
                "Andrews Lesson 56.5",
            ],
            plannedArrowIds: ["lesson-56-personal-name-nnc-audit"],
            firedArrowIds: [["lesson-56-personal-name-nnc-audit", "hit"]],
            redirectAction: "diagnostic-only",
            orthographyStatus: "not-surface-bearing",
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            remainingGapMentionsNameData: true,
            subsectionRanges: ["56.1", "56.2", "56.3", "56.4", "56.5"],
            subsectionRoles: [
                "two-tier-personal-name-nnc",
                "single-clause-source",
                "adjunction-source",
                "conjunction-source",
                "sentence-use-and-downgrades",
            ],
            coverage: {
                subsectionCount: 5,
                sourceKindCount: 17,
                blockerCount: 15,
                generationAllowed: false,
            },
            boundaries: {
                noClassicalSurfaceImport: true,
                noNewFixtureEvidence: true,
                noSilentGeneration: true,
                personalNameGenerationAllowed: false,
                staticNameDataExists: false,
                visibleUiSpanishRequired: true,
            },
        }
    );
    s.no("personal-name NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("personal-name NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
