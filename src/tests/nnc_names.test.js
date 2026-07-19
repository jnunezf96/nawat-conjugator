"use strict";

/**
 * Tests for src/core/nnc/names/names.mjs
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
            typeof ctx.buildPersonalNameNncSourceFrame,
            typeof ctx.buildPersonalNameNncOperationFrame,
            typeof ctx.getPersonalNameNncOperationFrameMismatch,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function"]
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
        "recognized personal-name source remains blocked without Andrews source gate",
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
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "capitalization-label",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "personal-name-nnc-source-gate-required",
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
            diagnosticId: "personal-name-nnc-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews personal-name candidate generates through orthography bridge",
        (() => {
            const formulaSlots = Object.freeze({
                predicateStem: Object.freeze({ slot: "STEM", structural: "ti-chihua-c", surface: "tichiwak" }),
            });
            const sourceFrame = ctx.buildPersonalNameNncSourceFrame({
                candidate: "ti-chihua-c",
                nameSource: "CNV(ti-chihua-c-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                clauseSource: "downgraded-statement",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "STEM", role: "downgraded-statement-predicate", formulaValue: "ti-chihua-c", surface: "tichiwak" },
                ],
            });
            const operationFrame = ctx.buildPersonalNameNncOperationFrame(sourceFrame);
            const classification = ctx.classifyPersonalNameNncCandidate({
                candidate: "lying-candidate",
                nameSource: "lying-source",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                clauseSource: "downgraded-statement",
                sourceGate: "lying gate",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                operationId: classification.operationFrame.operationId,
                formulaStem: classification.formulaSlots.predicateStem.surface,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                targetStem: classification.frames.stemFrame.targetStem,
            };
        })(),
        {
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "tichiwak",
            operationId: "andrews-56-personal-name-nnc-realization",
            formulaStem: "tichiwak",
            diagnostics: [
                "personal-name-nnc-andrews-source-generated",
                "personal-name-nnc-kind-recognized",
                "personal-name-nnc-structured-source",
            ],
            routeStage: "generate-structured-personal-name-nnc",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            targetStem: "tichiwak",
        }
    );
    s.eq(
        "personal-name NNC candidate blocks legacy string gates and contradictory frames",
        (() => {
            const formulaSlots = Object.freeze({
                predicateStem: Object.freeze({ slot: "STEM", structural: "ti-chihua-c", surface: "tichiwak" }),
            });
            const sourceFrame = ctx.buildPersonalNameNncSourceFrame({
                candidate: "ti-chihua-c",
                nameSource: "CNV(ti-chihua-c-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                clauseSource: "downgraded-statement",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "STEM", role: "downgraded-statement-predicate", formulaValue: "ti-chihua-c", surface: "tichiwak" },
                ],
            });
            const operationFrame = ctx.buildPersonalNameNncOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildPersonalNameNncSourceFrame({
                candidate: "nehnemi",
                nameSource: "CNV(nehnemi-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                clauseSource: "downgraded-statement",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                targetFormulaSlots: Object.freeze({
                    predicateStem: Object.freeze({ slot: "STEM", structural: "nehnemi", surface: "nejnemi" }),
                }),
                targetSegmentFrames: [
                    { slot: "STEM", role: "downgraded-statement-predicate", formulaValue: "nehnemi", surface: "nejnemi" },
                ],
            });
            const otherOperationFrame = ctx.buildPersonalNameNncOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizePersonalNameNncCandidateSurface;
            if (typeof ctx.normalizePersonalNameNncCandidateSurface === "function") {
                ctx.normalizePersonalNameNncCandidateSurface = () => "poison";
            }
            const poisoned = ctx.classifyPersonalNameNncCandidate({
                candidate: "poison",
                nameSource: "poison",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                sourceGate: "poison",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizePersonalNameNncCandidateSurface = originalNormalizer;
            }
            const stringOnly = ctx.classifyPersonalNameNncCandidate({
                candidate: "ti-chihua-c",
                nameSource: "CNV(ti-chihua-c-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                structuredSource: true,
            });
            const missingOperation = ctx.classifyPersonalNameNncCandidate({
                candidate: "ti-chihua-c",
                nameSource: "CNV(ti-chihua-c-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                structuredSource: true,
                sourceFrame,
            });
            const contradictory = ctx.classifyPersonalNameNncCandidate({
                candidate: "ti-chihua-c",
                nameSource: "CNV(ti-chihua-c-0)",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                sourceGate: "Andrews 56.2 single-clause personal-name source",
                structuredSource: true,
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyPersonalNameNncCandidate({
                candidate: "changed",
                nameSource: "changed",
                personalNameKind: "single-clause-name",
                sourceClauseType: "single-clause-name",
                sourceGate: "changed",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            return {
                poisoned: {
                    surface: poisoned.surface,
                    targetStem: poisoned.frames.stemFrame.targetStem,
                },
                stringOnly: {
                    generationAllowed: stringOnly.generationAllowed,
                    surface: stringOnly.surface,
                    diagnostics: stringOnly.diagnostics,
                },
                missingOperation: missingOperation.diagnostics,
                contradictory: contradictory.diagnostics,
                changedStrings: {
                    surface: changedStrings.surface,
                    targetStem: changedStrings.frames.stemFrame.targetStem,
                },
            };
        })(),
        {
            poisoned: {
                surface: "tichiwak",
                targetStem: "tichiwak",
            },
            stringOnly: {
                generationAllowed: false,
                surface: "",
                diagnostics: [
                    "personal-name-nnc-source-frame-required",
                    "personal-name-nnc-kind-recognized",
                    "personal-name-nnc-unconfirmed",
                ],
            },
            missingOperation: [
                "personal-name-nnc-operation-frame-required",
                "personal-name-nnc-kind-recognized",
                "personal-name-nnc-unconfirmed",
            ],
            contradictory: [
                "personal-name-nnc-contradictory-source-frame",
                "personal-name-nnc-kind-recognized",
                "personal-name-nnc-unconfirmed",
            ],
            changedStrings: {
                surface: "tichiwak",
                targetStem: "tichiwak",
            },
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
            "capitalization labels and proper-name translations are not orthography-bridge name evidence",
            "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence",
            "calendar roadmap text is not personal-name NNC data",
            "Andrews personal-name categories are architecture, not Nawat/Pipil orthography authority",
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
