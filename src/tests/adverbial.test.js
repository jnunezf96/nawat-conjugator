"use strict";

/**
 * Tests for src/core/clause/adverbial/adverbial.mjs
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("adverbial");

    s.eq(
        "Lesson 44 adverbial nuclear API is exported",
        [
            typeof ctx.buildAdverbialNuclearBoundaryMetadata,
            typeof ctx.classifyAdverbialNuclearCandidate,
            typeof ctx.classifyAdverbialNuclearFalsePositive,
            typeof ctx.getAdverbialNuclearAntiConflationRules,
            typeof ctx.buildAdverbialNuclearClauseFrame,
            typeof ctx.buildLesson44AdverbialNuclearPursuitFrame,
            typeof ctx.getLesson44AdverbialNuclearSubsectionInventory,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdverbialNuclearBoundaryMetadata();
    s.eq(
        "adverbial nuclear boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            knownConfiguredAdverbioTenses: boundary.knownConfiguredAdverbioTenses,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "adverbial-nuclear-boundary",
            lesson: 44,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            knownConfiguredAdverbioTenses: ["pasado-remoto-adverbio-activo"],
            boundaries: {
                hasConfiguredAdverbioSurface: true,
                hasAdverbialNuclearClauseFrame: true,
                hasFullAdverbialNuclearClauseEngine: false,
                hasAdverbialNncGeneration: false,
                hasAdverbialVncGeneration: false,
                hasStaticAdverbialData: false,
                changesAdverbioGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsConfiguredAdverbioSurfaceAsFullLesson44Evidence: false,
            },
            questionFields: [
                "source",
                "adverbialKind",
                "adverbialDegree",
                "evidenceSource",
            ],
        }
    );
    s.eq(
        "Lesson 44 pursuit frame covers every Andrews adverbial nuclear-clause subsection",
        (() => {
            const inventory = ctx.getLesson44AdverbialNuclearSubsectionInventory();
            const frame = ctx.buildLesson44AdverbialNuclearPursuitFrame();
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
                remainingGapsMentionSourceGate: frame.remainingGaps.some((gap) => /Andrews source models plus orthography-bridge fixtures/.test(gap)),
            };
        })(),
        {
            kind: "lesson-44-adverbial-nuclear-pursuit-frame",
            stepNumber: 44,
            routeStage: "audit-lesson-44",
            pdfRefCount: 9,
            firstPdfRef: "Andrews Lesson 44.1",
            lastPdfRef: "Andrews Lesson 44.9",
            subsectionCount: 18,
            subsectionRefs: [
                "44.1",
                "44.1 transformation",
                "44.2",
                "44.2 VNC/possessive",
                "44.3",
                "44.3 iuh/iz note",
                "44.4.1",
                "44.4.2",
                "44.4 note",
                "44.5",
                "44.5.4",
                "44.5.7",
                "44.6",
                "44.6 eh collocations",
                "44.7",
                "44.7 variants",
                "44.8",
                "44.9",
            ],
            plannedArrowIds: ["lesson-44-adverbial-nuclear-audit"],
            firedArrowIds: [["lesson-44-adverbial-nuclear-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionSourceGate: true,
        }
    );
    s.eq(
        "Lesson 44 frame records degree constraints and diagnostic-only adverbial inventories",
        (() => {
            const frame = ctx.buildLesson44AdverbialNuclearPursuitFrame();
            return {
                particlesSeparate: frame.overviewFrame.adverbialParticlesBelongToLesson3,
                adjoinedDeferred: frame.overviewFrame.adjoinedConcatenateUnitsDeferredToLessons49_50,
                semanticDomains: frame.overviewFrame.semanticDomains,
                firstDegreeSemanticOnly: frame.degreesFrame.firstDegreeSemanticOnly,
                secondDegreeNum1Silent: frame.degreesFrame.secondDegreeReplacesSoundedNum1WithSilent,
                vncFirstOnly: frame.degreesFrame.vncAllowsOnlyFirstDegree,
                possessiveFirstOnly: frame.degreesFrame.possessiveStateNncAllowsOnlyFirstDegree,
                vncExampleCount: frame.adverbializedVncFrame.examples.length,
                nncFirstDegreeAmbiguous: frame.adverbializedNncFrame.firstDegreeFrame.sameShapeCanBeEquativeOrAdverbial,
                nncSecondDegreeDistinctive: frame.adverbializedNncFrame.secondDegreeFrame.distinctiveSubjectPronounShapeRemovesAmbiguity,
                particleLookingCount: frame.particleLookingNncFrame.examples.length,
                moNotInterrogative: frame.particleLookingNncFrame.moFrame.notInherentlyInterrogative,
                quenFusedIn: frame.particleLookingNncFrame.quenFrame.fusedAdjunctorInAnalysis,
                otherNncSubcategories: frame.otherAbsolutiveNncFrame.semanticSubcategories,
                preteritAgentiveSource: frame.preteritAgentiveAdverbialNncFrame.generalUsePreteritAgentiveStemIsRichAdverbialSource,
                possessiveDeferred: frame.possessiveStateAdverbialNncFrame.majorityDeferredToLessons45_47,
                incorporatedDegreesDisappear: frame.incorporatedAdverbialModifierFrame.subjectPronounDiscardedSoDegreesDisappear,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            particlesSeparate: true,
            adjoinedDeferred: true,
            semanticDomains: ["location", "direction", "time", "duration", "manner", "degree"],
            firstDegreeSemanticOnly: true,
            secondDegreeNum1Silent: true,
            vncFirstOnly: true,
            possessiveFirstOnly: true,
            vncExampleCount: 13,
            nncFirstDegreeAmbiguous: true,
            nncSecondDegreeDistinctive: true,
            particleLookingCount: 7,
            moNotInterrogative: true,
            quenFusedIn: true,
            otherNncSubcategories: ["time", "place", "manner"],
            preteritAgentiveSource: true,
            possessiveDeferred: true,
            incorporatedDegreesDisappear: true,
            generationBoundary: {
                adverbialNuclearBoundaryMetadataImplemented: true,
                configuredAdverbioSurfaceImplemented: true,
                adverbialNuclearClauseFrameImplemented: true,
                firstDegreeVncFrameImplemented: true,
                secondDegreeNncDiagnosticOnly: true,
                adverbializedVncInventoryDiagnosticOnly: true,
                adverbializedNncInventoryDiagnosticOnly: true,
                particleLookingNncDiagnosticOnly: true,
                preteritAgentiveAdverbialNncDiagnosticOnly: true,
                possessiveStateAdverbialNncDiagnosticOnly: true,
                incorporatedAdverbialModifierDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticAdverbialDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson44GenerationImplemented: false,
            },
            grammarRouteStage: "audit-lesson-44",
            diagnosticIds: ["adverbial-nuclear-lesson-44-diagnostic-partial", "adverbial-nuclear-source-gated"],
        }
    );

    s.eq(
        "Andrews 44.1-44.2 adverbial nuclear clause frame preserves generated VNC adverbio output",
        ctx.buildAdverbialNuclearClauseFrame({
            source: "mati",
            sourceStem: "mati",
            finalStem: "mati",
            analysisStem: "mati",
            sourceClauseKind: "vnc",
            sourceValency: "intransitive",
            adverbialKind: "vnc-adverbial",
            adverbialDegree: "first-degree",
            semanticDomain: "manner",
            tense: "pasado-remoto-adverbio-activo",
            configuredTense: "pasado-remoto-adverbio-activo",
            surfaceForms: ["matka", "matika"],
            evidenceSource: "test-generated-output-contract",
        }),
        {
            kind: "adverbial-nuclear-clause-frame",
            version: 1,
            lesson: 44,
            structuralSource: "Andrews 44.1-44.4",
            targetAuthority: "Nawat/Pipil generated output supplied to this frame",
            supported: true,
            confirmed: false,
            source: {
                raw: "mati",
                clauseKind: "vnc",
                adverbialKind: "vnc-adverbial",
                stem: "mati",
                finalStem: "mati",
                analysisStem: "mati",
                valency: "intransitive",
                objectPrefix: "",
                baseObjectPrefix: "",
                tense: "pasado-remoto-adverbio-activo",
            },
            adverbialization: {
                degree: "first-degree",
                semanticDomain: "manner",
                subjectPronoun: {
                    kind: "adverbialized-subject-pronoun",
                    lessonRef: "Andrews 44.2",
                    degree: "first-degree",
                    sourceClauseKind: "vnc",
                    locus: "subject-pronoun",
                    num1: {
                        changesSoundedFillerToSilent: false,
                        description: "first-degree adverbialization has no required subject-pronoun shape change",
                    },
                    constraints: {
                        vncAllowsOnlyFirstDegree: true,
                        possessiveNncAllowsOnlyFirstDegree: true,
                        absolutiveNncIsIdiosyncratic: true,
                    },
                },
                lexicalized: false,
                configuredRoute: true,
            },
            output: {
                surfaceForms: ["matka", "matika"],
                preservesGeneratedSurface: true,
            },
            generationContract: {
                routeGeneratesSurface: true,
                frameGeneratesSurface: false,
                changesSurfaceForms: false,
                newWordGenerationAllowed: false,
            },
            evidenceSource: "test-generated-output-contract",
            diagnostics: [],
            boundary: ctx.buildAdverbialNuclearBoundaryMetadata(),
        }
    );

	    s.eq(
	        "Andrews 44.2 blocks second-degree adverbialization on VNC source frames",
	        (() => {
	            const frame = ctx.buildAdverbialNuclearClauseFrame({
	                source: "mati",
                surfaceForms: ["matka"],
                sourceClauseKind: "vnc",
                adverbialDegree: "second-degree",
                semanticDomain: "manner",
            });
            return {
                supported: frame.supported,
                degree: frame.adverbialization.degree,
                num1Changes: frame.adverbialization.subjectPronoun.num1.changesSoundedFillerToSilent,
                diagnostics: frame.diagnostics,
            };
        })(),
        {
            supported: false,
            degree: "second-degree",
            num1Changes: true,
	            diagnostics: ["adverbial-nuclear-source-permits-first-degree-only"],
	        }
	    );
    s.eq(
        "adverbial nuclear clause frame reads LCM result-frame surfaces before stale stale surfaces",
        (() => {
            const sourceFrame = ctx.buildGrammarFrame({
	                resultFrame: ctx.buildGrammarResultFrame({
	                    ok: true,
	                    surface: "frame-matika",
                    surfaceForms: ["frame-matka", "frame-matika"],
	                    sourceInput: "frame-source",
	                    outputKind: "vnc",
	                    generationRoute: "adverbio",
	                }),
	            });
	            const frame = ctx.buildAdverbialNuclearClauseFrame({
	                result: {
	                    result: "stale-result",
	                    surface: "stale-surface",
	                    surfaceForms: ["stale-a / stale-b"],
	                    frames: sourceFrame,
	                },
                surfaceForms: ["direct-stale-a / direct-stale-b"],
                surface: "direct-stale-surface",
                sourceClauseKind: "vnc",
                adverbialKind: "vnc-adverbial",
                adverbialDegree: "first-degree",
	                semanticDomain: "manner",
	            });
	            return {
	                source: frame.source.raw,
	                outputSurfaceForms: frame.output.surfaceForms,
	                contractSurfaceForms: frame.frames.resultFrame.surfaceForms,
	                contractSourceInput: frame.frames.resultFrame.sourceInput,
	            };
	        })(),
        {
            source: "frame-source",
            outputSurfaceForms: ["frame-matka", "frame-matika"],
            contractSurfaceForms: ["frame-matka", "frame-matika"],
            contractSourceInput: "frame-source",
        }
    );
    s.eq(
        "adverbial nuclear clause frame suppresses stale source aliases for an empty LCM result frame",
        (() => {
            const sourceFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    sourceInput: "",
                    outputKind: "vnc",
                    generationRoute: "adverbio",
                }),
            });
            const frame = ctx.buildAdverbialNuclearClauseFrame({
                source: "stale-source",
                sourceStem: "stale-stem",
                finalStem: "stale-final",
                analysisStem: "stale-analysis",
                result: {
                    result: "stale-result",
                    surface: "stale-surface",
                    surfaceForms: ["stale-a / stale-b"],
                    frames: sourceFrame,
                },
                surfaceForms: ["direct-stale-a / direct-stale-b"],
                surface: "direct-stale-surface",
                sourceClauseKind: "vnc",
                adverbialKind: "vnc-adverbial",
                adverbialDegree: "first-degree",
                semanticDomain: "manner",
            });
            return {
                sourceRaw: frame.source.raw,
                sourceStem: frame.source.stem,
                finalStem: frame.source.finalStem,
                analysisStem: frame.source.analysisStem,
                outputSurfaceForms: frame.output.surfaceForms,
                contractSurfaceForms: frame.frames.resultFrame.surfaceForms,
                contractSourceInput: frame.frames.resultFrame.sourceInput,
                supported: frame.supported,
                diagnostics: frame.diagnostics,
            };
        })(),
        {
            sourceRaw: "",
            sourceStem: "",
            finalStem: "",
            analysisStem: "",
            outputSurfaceForms: [],
            contractSurfaceForms: [],
            contractSourceInput: "",
            supported: false,
            diagnostics: [
                "adverbial-nuclear-requires-source",
                "adverbial-nuclear-requires-generated-surface",
            ],
        }
    );

	    s.eq(
	        "configured adverbio tense remains unconfirmed full Lesson 44 evidence",
	        ctx.classifyAdverbialNuclearCandidate({
            source: "(mati)",
            candidate: "matka",
            tense: "pasado-remoto-adverbio-activo",
            adverbialKind: "manner-surface",
            falsePositiveSource: "configured-adverbio-surface",
        }),
        {
            kind: "adverbial-nuclear-candidate-classification",
            version: 1,
            source: "(mati)",
            candidate: "matka",
            tense: "pasado-remoto-adverbio-activo",
            hasKnownConfiguredAdverbioTense: true,
            adverbialKind: "manner-surface",
            adverbialDegree: "",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "configured-adverbio-surface",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "adverbial-nuclear-source-gate-required",
                "configured-adverbio-surface-recognized",
                "adverbial-nuclear-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "adverbial nuclear classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyAdverbialNuclearCandidate({
                source: "(mati)",
                candidate: "matka",
                tense: "pasado-remoto-adverbio-activo",
                adverbialKind: "manner-surface",
                falsePositiveSource: "configured-adverbio-surface",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                framesIsGrammarFrame: classification.frames === classification.grammarFrame,
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            framesIsGrammarFrame: true,
            unitKind: "adverbial-nuclear-clause",
            routeStage: "classify-boundary",
            generationAllowed: false,
            diagnosticId: "adverbial-nuclear-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews adverbial nuclear candidate generates through orthography bridge",
        (() => {
            const classification = ctx.classifyAdverbialNuclearCandidate({
                source: "Andrews lexicalized iuh note",
                candidate: "iuh",
                adverbialKind: "nnc-adverbial",
                adverbialDegree: "lexicalized",
                sourceGate: "Andrews 44.3 iuh/iz adverbial note",
                structuredSource: true,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                sourceGate: classification.frames.nuclearClauseFrame.sourceGate,
            };
        })(),
        {
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "iw",
            diagnostics: [
                "adverbial-nuclear-andrews-source-generated",
                "configured-adverbio-surface-unconfirmed",
                "adverbial-nuclear-structured-source",
            ],
            routeStage: "generate-structured-adverbial-nuclear",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            sourceGate: "Andrews 44.3 iuh/iz adverbial note",
        }
    );

    s.eq(
        "adverb translation is classified as false positive evidence",
        ctx.classifyAdverbialNuclearFalsePositive("adverb-translation"),
        {
            kind: "adverbial-nuclear-false-positive",
            version: 1,
            source: "adverb-translation",
            isAdverbialNuclearEvidence: false,
            isAdverbialNncEvidence: false,
            isAdverbialVncEvidence: false,
            generationAllowed: false,
            diagnostics: ["adverbial-nuclear-false-positive-source"],
            antiConflationRules: ctx.getAdverbialNuclearAntiConflationRules(),
        }
    );

    s.eq(
        "adverbial nuclear metadata carries anti-conflation rules",
        ctx.getAdverbialNuclearAntiConflationRules(),
        [
            "adverbial nuclear-clause boundary metadata is not generation",
            "adverbialNuclearClauseFrame describes existing generated output; it does not create new Nawat word forms",
            "configured adverbio word output is not a full Lesson 44 engine",
            "adverb translations are not orthography-bridge adverbial-clause evidence",
            "particle-looking labels are not particle or adverbial NNC fixture evidence",
            "ordinary NNC/VNC outputs are not clause-level adverbialization evidence",
            "Andrews adverbial categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    s.no("adverbial nuclear boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adverbial nuclear boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    s.eq(
        "adverbial nuclear handoff reads canonical realization before split display surfaces",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "adverbial-handoff-formula",
                unit: "NNC",
                formula: "#0-0(canonical-adverbial)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "canonical-adverbial", slot: "STEM" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "adverbial-handoff-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "canonical-adverbial", surface: "canonical-adverbial" },
                ],
                surfaceForms: ["canonical-adverbial"],
            });
            return ctx.getAdverbialNuclearContractSurfaceForms({
                surface: "top-lie / top-alt-lie",
                result: {
                    result: "result-lie / result-alt-lie",
                    grammarFrame: ctx.buildGrammarFrame({
                        resultFrame: {
                            ...ctx.buildGrammarResultFrame({
                                ok: true,
                                formulaRecord,
                                formulaRealizationRecord,
                            }),
                            surface: "frame-lie",
                            surfaceForms: ["frame-lie / frame-alt-lie"],
                            formulaRecord,
                            formulaRecords: [formulaRecord],
                            formulaRealizationRecord,
                            formulaRealizationRecords: [formulaRealizationRecord],
                        },
                    }),
                },
            });
        })(),
        ["canonical-adverbial"]
    );
    s.eq(
        "adverbial nuclear clause frame carries canonical selected variant ids instead of display surfaces",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "adverbial-selected-formula",
                unit: "NNC",
                formula: "#0-0(adverbial-selected)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "adverbial-selected", slot: "STEM" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "adverbial-selected-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "adverbial-selected", surface: "adverbial-selected-canonical" },
                ],
                surfaceForms: ["adverbial-selected-canonical"],
            });
            const frame = ctx.buildAdverbialNuclearClauseFrame({
                result: {
                    result: "result-lie / result-alt-lie",
                    surface: "surface-lie",
                    grammarFrame: ctx.buildGrammarFrame({
                        resultFrame: {
                            ...ctx.buildGrammarResultFrame({
                                ok: true,
                                sourceInput: "adverbial-selected-source",
                                formulaRecord,
                                formulaRealizationRecord,
                            }),
                            surface: "frame-lie",
                            surfaceForms: ["frame-lie / frame-alt-lie"],
                            formulaRecord,
                            formulaRealizationRecord,
                            formulaRealizationRecords: [formulaRealizationRecord],
                        },
                    }),
                },
                sourceClauseKind: "vnc",
                adverbialKind: "vnc-adverbial",
                adverbialDegree: "first-degree",
                semanticDomain: "manner",
            });
            return {
                outputSurfaceForms: frame.output.surfaceForms,
                selectedVariantId: frame.output.selectedVariantId,
                formulaRealizationRecordId: frame.output.formulaRealizationRecordId,
                formulaRecordId: frame.output.formulaRecordId,
            };
        })(),
        {
            outputSurfaceForms: ["adverbial-selected-canonical"],
            selectedVariantId: "adverbial-selected-realization::surface-0",
            formulaRealizationRecordId: "adverbial-selected-realization",
            formulaRecordId: "adverbial-selected-formula",
        }
    );
    s.eq(
        "adverbial nuclear handoff blocks slash-joined result-frame display strings",
        ctx.getAdverbialNuclearContractSurfaceForms({
            surface: "top-adverbial-lie",
            result: {
                result: "result-adverbial-lie",
                grammarFrame: {
                    resultFrame: {
                        kind: "grammar-result-frame",
                        ok: true,
                        surface: "frame-adverbial-a / frame-adverbial-b",
                        surfaceForms: ["frame-adverbial-a / frame-adverbial-b"],
                    },
                },
            },
        }),
        []
    );

    return s;
}

module.exports = { run };
