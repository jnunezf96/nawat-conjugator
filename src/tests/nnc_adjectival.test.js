"use strict";

/**
 * Tests for src/core/nnc/adjectival/adjectival.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_adjectival");

    s.eq(
        "Lessons 40-41 adjectival NNC function boundary API is exported",
        [
            typeof ctx.buildAdjectivalNncFunctionBoundaryMetadata,
            typeof ctx.classifyAdjectivalNncFunctionCandidate,
            typeof ctx.classifyAdjectivalNncFalsePositive,
            typeof ctx.getAdjectivalNncAntiConflationRules,
            typeof ctx.buildPatientivoAdjectivalNncFunctionOutput,
            typeof ctx.buildIntensifiedAdjectivalNncOutput,
            typeof ctx.shouldGenerateIntensifiedAdjectivalNnc,
            typeof ctx.shouldGeneratePatientiveAdjectivalNnc,
            typeof ctx.buildVncAdjectivalNncFunctionOutput,
            typeof ctx.shouldGenerateVncAdjectivalNnc,
            typeof ctx.buildCompoundSourceAdjectivalNncFunctionOutput,
            typeof ctx.shouldGenerateCompoundSourceAdjectivalNnc,
            typeof ctx.buildDenominalCompoundAdjectivalNncFunctionOutput,
            typeof ctx.shouldGenerateDenominalCompoundAdjectivalNnc,
            typeof ctx.buildNominalizedVncAdjectivalNncFunctionOutput,
            typeof ctx.shouldGenerateNominalizedVncAdjectivalNnc,
            typeof ctx.resolveAdjectivalNncSourceFormationFrame,
            typeof ctx.buildLesson40AdjectivalNncPursuitFrame,
            typeof ctx.getLesson40AdjectivalNncSubsectionInventory,
            typeof ctx.buildLesson41AdjectivalNncPursuitFrame,
            typeof ctx.getLesson41AdjectivalNncSubsectionInventory,
        ],
        [
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
            "function",
        ]
    );

    const boundary = ctx.buildAdjectivalNncFunctionBoundaryMetadata();
    s.eq(
        "adjectival NNC function boundary is explicit and non-generative",
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
            kind: "adjectival-nnc-function-boundary",
            lessons: [40, 41],
            status: "partial",
            generationAllowed: "opt-in",
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveModeOutputs: true,
                hasNominalizationProfileAdjectivalFunction: true,
                hasAdjectivalNncGeneration: true,
                hasOptInAdjectivalNncGeneration: true,
                hasModificationAst: false,
                hasConfirmedModifierHeadExamples: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsAdjetivoOutputAsFullLessonEvidence: false,
            },
            questionFields: [
                "functionKind",
                "sourceCategory",
                "predicateSurface",
                "adjectivalRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "adjetivo route output remains unconfirmed full adjectival NNC evidence",
        ctx.classifyAdjectivalNncFunctionCandidate({
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            hasNominalizationProfile: true,
            falsePositiveSource: "adjetivo-route",
        }),
        {
            kind: "adjectival-nnc-function-candidate-classification",
            version: 1,
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            evidenceSource: "",
            falsePositiveSource: "adjetivo-route",
            hasNominalizationProfile: true,
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adjectival-nnc-needs-nawat-evidence",
                "adjectival-nnc-function-recognized",
                "nominalization-profile-adjectival-function-is-metadata",
                "adjectival-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "nominalization profile remains explanatory metadata only",
        ctx.classifyAdjectivalNncFalsePositive("nominalization-profile"),
        {
            kind: "adjectival-nnc-false-positive",
            version: 1,
            source: "nominalization-profile",
            isAdjectivalNncEvidence: false,
            isAdjectivalFunctionEvidence: false,
            isModifierHeadEvidence: false,
            isAdjectivalParadigmEvidence: false,
            isModificationEvidence: false,
            isSupplementationEvidence: false,
            isTopicEvidence: false,
            generationAllowed: false,
            diagnostics: ["adjectival-nnc-false-positive-source"],
            antiConflationRules: ctx.getAdjectivalNncAntiConflationRules(),
        }
    );

    s.ok(
        "adjectival NNC rules separate function generation from modification AST",
        ctx.getAdjectivalNncAntiConflationRules()
            .some((rule) => rule.includes("separate from Lessons 42-43 modification AST"))
    );
    s.eq(
        "Lesson 40 pursuit frame covers every Andrews adjectival-NNC subsection",
        (() => {
            const inventory = ctx.getLesson40AdjectivalNncSubsectionInventory();
            const frame = ctx.buildLesson40AdjectivalNncPursuitFrame();
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
                remainingGapsMentionSyntax: frame.remainingGaps.some((gap) => /Predicate-adjective sentence syntax/.test(gap)),
            };
        })(),
        {
            kind: "lesson-40-adjectival-nnc-pursuit-frame",
            stepNumber: 40,
            routeStage: "audit-lesson-40",
            pdfRefCount: 30,
            firstPdfRef: "Andrews Lesson 40.1",
            lastPdfRef: "Andrews Lesson 40.12",
            subsectionCount: 30,
            subsectionRefs: [
                "40.1",
                "40.2",
                "40.2.1",
                "40.2.2",
                "40.2.3",
                "40.3",
                "40.3.1",
                "40.3.2",
                "40.4",
                "40.4.1",
                "40.4.2",
                "40.5",
                "40.6",
                "40.7",
                "40.8",
                "40.8.1",
                "40.8.2",
                "40.8.3",
                "40.8.4",
                "40.8.5",
                "40.8.6",
                "40.9",
                "40.9.1",
                "40.9.2",
                "40.10",
                "40.10.1",
                "40.10.2",
                "40.10.3",
                "40.11",
                "40.12",
            ],
            plannedArrowIds: ["lesson-40-adjectival-nnc-audit"],
            firedArrowIds: [["lesson-40-adjectival-nnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionSyntax: true,
        }
    );
    s.eq(
        "Lesson 40 frame records adjectival function architecture and current generation boundaries",
        (() => {
            const frame = ctx.buildLesson40AdjectivalNncPursuitFrame();
            return {
                adjectiveLabelsSyntacticNotFormalClass: frame.adjectivalNuclearClauseFrame.adjectiveLabelsSyntacticNotFormalClass,
                hueiPronominalLikeParadigm: frame.exceptionalAdjectivalNncFrame.hueiFrame.pronominalLikeParadigm,
                possessorIncludedNotPossessiveState: frame.exceptionalAdjectivalNncFrame.possessorIncludedFrame.notPossessiveStateDespitePossessor,
                anyVncCanFunctionAdjectivally: frame.nncVncAsAdjectiveFrame.anyVncCanFunctionAdjectivally,
                patientiveStrictRenderingSubstantive: frame.derivedNounstemAdjectiveFrame.patientiveFrame.strictRenderingSubstantive,
                nominalizedAnalysisJustified: frame.nominalizedVncAdjectiveFrame.nominalizedAnalysisJustifiedByAffectiveEmbedding,
                customaryAgentiveNegativeAmbiguity: frame.customaryAgentiveAdjectiveFrame.negativeParticleAmbiguity,
                customaryPatientiveSharesPotentialTranslation: frame.customaryPatientiveAdjectiveFrame.potentialPatientCanShareTranslation,
                classADenominalTiCommon: frame.preteritAgentiveAdjectiveFrame.classAFrame.denominalTiCommon,
                hueiyaUsesPronounLikeBase: frame.obsoletePreteritAdjectiveFrame.hueiyaExceptionFrame.usesPronounLikeBase,
                synonymPairsGenerateCurrentSourceOnly: frame.synonymousPairsFrame.outputContractGenerateCurrentSourceOnly,
                synonymTripletsZTiyaThirdMember: frame.synonymousTripletsFrame.zTiyaThirdMember,
                predicateAdjectivePrincipalClause: frame.predicateAdjectiveSentenceFrame.inMultipleNucleusAdjectivalNncIsPrincipalClause,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            adjectiveLabelsSyntacticNotFormalClass: true,
            hueiPronominalLikeParadigm: true,
            possessorIncludedNotPossessiveState: true,
            anyVncCanFunctionAdjectivally: true,
            patientiveStrictRenderingSubstantive: true,
            nominalizedAnalysisJustified: true,
            customaryAgentiveNegativeAmbiguity: true,
            customaryPatientiveSharesPotentialTranslation: true,
            classADenominalTiCommon: true,
            hueiyaUsesPronounLikeBase: true,
            synonymPairsGenerateCurrentSourceOnly: true,
            synonymTripletsZTiyaThirdMember: true,
            predicateAdjectivePrincipalClause: true,
            generationBoundary: {
                adjectivalNncBoundaryMetadataImplemented: true,
                ordinaryAbsolutiveAdjectivalNncGenerationPartial: true,
                vncAdjectivalFunctionGenerationPartial: true,
                patientiveAdjectivalGenerationPartial: true,
                nominalizedVncAdjectivalGenerationPartial: true,
                rootPlusYaObsoletePreteritGenerationPartial: true,
                synonymSetGenerationDiagnosticOnly: true,
                predicateAdjectiveSentenceGenerationImplemented: false,
                modificationAstDeferredToLessons42_43: true,
                fullLesson40GenerationImplemented: false,
                finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
            },
            grammarRouteStage: "audit-lesson-40",
            diagnosticIds: ["adjectival-nnc-diagnostic-partial", "adjectival-nnc-needs-nawat-evidence"],
        }
    );
    s.eq(
        "Lesson 41 pursuit frame covers every Andrews adjectival-NNC subsection",
        (() => {
            const inventory = ctx.getLesson41AdjectivalNncSubsectionInventory();
            const frame = ctx.buildLesson41AdjectivalNncPursuitFrame();
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
                remainingGapsMentionCompoundEmbeds: frame.remainingGaps.some((gap) => /compound-stemmed NNCs/.test(gap)),
            };
        })(),
        {
            kind: "lesson-41-adjectival-nnc-pursuit-frame",
            stepNumber: 41,
            routeStage: "audit-lesson-41",
            pdfRefCount: 23,
            firstPdfRef: "Andrews Lesson 41.1",
            lastPdfRef: "Andrews Lesson 41.4",
            subsectionCount: 23,
            subsectionRefs: [
                "41.1",
                "41.1.1",
                "41.1.2",
                "41.1.2.a",
                "41.1.2.b",
                "41.1.2.c",
                "41.1.2.d",
                "41.1.2.e",
                "41.1.3",
                "41.1.4",
                "41.1.4.a",
                "41.1.4.b",
                "41.1.5",
                "41.2",
                "41.2.1",
                "41.2.1.a",
                "41.2.1.b",
                "41.2.1.b.i",
                "41.2.1.b.ii",
                "41.2.2",
                "41.2.3",
                "41.3",
                "41.4",
            ],
            plannedArrowIds: ["lesson-41-adjectival-nnc-audit"],
            firedArrowIds: [["lesson-41-adjectival-nnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionCompoundEmbeds: true,
        }
    );
    s.eq(
        "Lesson 41 frame records intensification and compound-source boundaries",
        (() => {
            const frame = ctx.buildLesson41AdjectivalNncPursuitFrame();
            return {
                redupUsesLesson27: frame.intensifiedAdjectivalNncFrame.reduplicationFrame.longVowelReduplicationFromLesson27_2_2,
                redupNotLesson14: frame.intensifiedAdjectivalNncFrame.reduplicationFrame.notNominalReduplicationFromLesson14_3,
                pahMatrix: frame.intensifiedAdjectivalNncFrame.pahMatrixFrame.matrixPreteritAgentiveStem,
                pahInternalExpansion: frame.intensifiedAdjectivalNncFrame.pahMatrixFrame.matrixInternalExpansionFrame.pahTiCBecomesPalalahTiC,
                polIncreases: frame.intensifiedAdjectivalNncFrame.affectiveMatrixFrame.polFrame.increasesIntensity,
                pilTonTzinDecrease: frame.intensifiedAdjectivalNncFrame.affectiveMatrixFrame.pilTonTzinFrame.decreasesIntensity,
                syntacticIntensifiersDeferred: frame.intensifiedAdjectivalNncFrame.metaphorSimileFrame.syntacticIntensifiersDeferredToLesson49_6,
                matrixConversion: frame.compoundVerbstemNominalEmbedFrame.matrixVerbstemConvertedToMatrixNounstemByReanalysisOrDerivation,
                adverbModificationKinds: frame.compoundVerbstemNominalEmbedFrame.incorporatedAdverbFrame.lesson30_7_12Frame.modificationKinds,
                sameEntityNoSubject: frame.compoundVerbstemNominalEmbedFrame.incorporatedAdverbFrame.lesson30_14SupplementationFrame.sameEntitySubtypeFrame.embeddedNounstemCannotFunctionAsSubject,
                patientiveNeedsUnderlyingSource: frame.compoundVerbstemNominalEmbedFrame.incorporatedObjectFrame.patientiveSourceDistinctionRequiresUnderlyingCompoundSource,
                denominalTi: frame.denominalCompoundNounstemFrame.compoundNounstemCanSourceDerivedVerbstemWithTi,
                embedGeneralUse: frame.adjectivalEmbedCompoundNncFrame.preteritAgentiveEmbedRequiresGeneralUseShape,
                numeralEmbed: frame.adjectivalEmbedCompoundNncFrame.numeralStemCanEmbedAdjectivally,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            redupUsesLesson27: true,
            redupNotLesson14: true,
            pahMatrix: "(pah-ti-0)-c",
            pahInternalExpansion: true,
            polIncreases: true,
            pilTonTzinDecrease: true,
            syntacticIntensifiersDeferred: true,
            matrixConversion: true,
            adverbModificationKinds: ["means", "instrument", "place", "time", "duration", "cause", "purpose", "manner", "compared manner"],
            sameEntityNoSubject: true,
            patientiveNeedsUnderlyingSource: true,
            denominalTi: true,
            embedGeneralUse: true,
            numeralEmbed: true,
            generationBoundary: {
                adjectivalNncBoundaryMetadataImplemented: true,
                intensifiedAdjectivalGenerationPartial: true,
                compoundSourceAdjectivalGenerationPartial: true,
                denominalCompoundAdjectivalGenerationPartial: true,
                compoundVerbstemSourceDisambiguationPartial: true,
                adjectivalEmbedCompoundNncGenerationImplemented: false,
                affectiveMatrixIntensityGenerationImplemented: false,
                syntacticIntensifierGenerationImplemented: false,
                fullLesson41GenerationImplemented: false,
                modifierHeadAstDeferredToLessons42_43: true,
                finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
            },
            grammarRouteStage: "audit-lesson-41",
            diagnosticIds: ["adjectival-nnc-lesson-41-diagnostic-partial", "adjectival-nnc-needs-nawat-evidence"],
        }
    );
    s.eq(
        "Andrews 40.1 adjectival NNC function generates through an absolutive ordinary NNC source",
        (() => {
            const direct = ctx.generateAdjectivalNncFunctionOutput({
                stem: "shuchi",
                nounClass: "t",
            });
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "shuchi",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            nounClass: "t",
                        },
                    },
                },
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    ok: direct.ok,
                    surface: direct.surface,
                    hasFrames: Boolean(direct.frames?.routeContract && direct.frames?.diagnosticFrame),
                    outputKind: direct.outputKind,
                    generationRoute: direct.generationRoute,
                    frame: direct.adjectivalNncFunctionFrame,
                    sourceFormula: direct.sourceNnc?.nncBasic?.formulaEcho,
                },
                generated: {
                    result: generated.result,
                    ok: generated.ok,
                    surface: generated.surface,
                    topFramesIsGrammarFrame: generated.frames === generated.grammarFrame,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    frame: generated.adjectivalNncFunctionFrame,
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "shuchit",
                ok: true,
                surface: "shuchit",
                hasFrames: true,
                outputKind: "adjectival-nnc-function",
                generationRoute: "adjectival-nnc",
                frame: {
                    version: 1,
                    outputKind: "adjectival-nnc-function",
                    lessonRef: "Andrews 40.1",
                    nncKind: "adjectival",
                    functionKind: "modifier-candidate",
                    role: "modifier-candidate",
                    rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
                    requiredPredicateState: "absolutive",
                    requestedPredicateState: "absolutive",
                    actualPredicateState: "absolutive",
                    sourceClauseKind: "nominal-nuclear-clause",
                    sourceFormulaSlots: directFormulaSlots("shuchi", "t"),
                    sourceFormulaEcho: "#Ø-Ø(shuchi)t#",
                    hasModificationAst: false,
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
                sourceFormula: "#Ø-Ø(shuchi)t#",
            },
            generated: {
                result: "shuchit",
                ok: true,
                surface: "shuchit",
                topFramesIsGrammarFrame: true,
                surfaceForms: ["shuchit"],
                generationRoute: "adjectival-nnc",
                frame: {
                    version: 1,
                    outputKind: "adjectival-nnc-function",
                    lessonRef: "Andrews 40.1",
                    nncKind: "adjectival",
                    functionKind: "modifier-candidate",
                    role: "modifier-candidate",
                    rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
                    requiredPredicateState: "absolutive",
                    requestedPredicateState: "absolutive",
                    actualPredicateState: "absolutive",
                    sourceClauseKind: "nominal-nuclear-clause",
                    sourceFormulaSlots: directFormulaSlots("shuchi", "t"),
                    sourceFormulaEcho: "#Ø-Ø(shuchi)t#",
                    hasModificationAst: false,
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
            },
        }
    );
    s.eq(
        "Andrews 40.1 adjectival NNC function rejects possessive-state generation",
        ctx.generateAdjectivalNncFunctionOutput({
            stem: "kal",
            state: "possessive",
            nounClass: "zero",
        }).diagnostics.map((diagnostic) => diagnostic.id),
        ["adjectival-nnc-requires-absolutive-state"]
    );
    s.eq(
        "Andrews 40.4 patientive NNC adjectival function reuses the generated #3 salida surface",
        (() => {
            const patientivo = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    derivationMode: ctx.DERIVATION_MODE.active,
                    patientivoSource: "nonactive",
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ta",
                    tronco: "-(mati)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "patientivo",
                },
            });
            const direct = ctx.buildPatientivoAdjectivalNncFunctionOutput({
                patientivoSurface: patientivo.surfaceForms[0],
                patientivoSource: patientivo.nominalizationProfile?.patientiveFamilyProfile?.family || "",
                nominalizationProfile: patientivo.nominalizationProfile,
                formulaSlots: patientivo.nuclearClauseShell?.formulaSlots || null,
                formulaEcho: patientivo.nuclearClauseShell?.formulaEcho || "",
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: patientivo.surfaceForms[0],
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "patientive-adjectival",
                            patientivoSurface: patientivo.surfaceForms[0],
                            patientivoSource: patientivo.nominalizationProfile?.patientiveFamilyProfile?.family || "",
                            nominalizationProfile: patientivo.nominalizationProfile,
                            formulaSlots: patientivo.nuclearClauseShell?.formulaSlots || null,
                            formulaEcho: patientivo.nuclearClauseShell?.formulaEcho || "",
                        },
                    },
                },
            });
            return {
                sourceSurface: patientivo.surfaceForms[0],
                sourceFormula: patientivo.nuclearClauseShell?.formulaEcho || "",
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    ok: direct.ok,
                    surface: direct.surface,
                    hasFrames: Boolean(direct.frames?.routeContract && direct.frames?.diagnosticFrame),
                    outputKind: direct.outputKind,
                    generationRoute: direct.generationRoute,
                    frame: {
                        lessonRef: direct.adjectivalNncFunctionFrame.lessonRef,
                        functionKind: direct.adjectivalNncFunctionFrame.functionKind,
                        sourceCategory: direct.adjectivalNncFunctionFrame.sourceCategory,
                        generatedSurfacePreserved: direct.adjectivalNncFunctionFrame.generatedSurfacePreserved,
                        hasModificationAst: direct.adjectivalNncFunctionFrame.hasModificationAst,
                        patientivoSource: direct.adjectivalNncFunctionFrame.patientivoSource,
                        sourceFormulaEcho: direct.adjectivalNncFunctionFrame.sourceFormulaEcho,
                    },
                },
                routed: {
                    supported: routed.supported,
                    result: routed.result,
                    ok: routed.ok,
                    surface: routed.surface,
                    topFramesIsGrammarFrame: routed.frames === routed.grammarFrame,
                    surfaceForms: routed.surfaceForms,
                    generationRoute: routed.generationRoute,
                    formulaEcho: routed.nuclearClauseShell?.formulaEcho || "",
                    functionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                },
            };
        })(),
        {
            sourceSurface: "tamachti",
            sourceFormula: "#Ø-Ø(tamach)ti#",
            direct: {
                supported: true,
                result: "tamachti",
                ok: true,
                surface: "tamachti",
                hasFrames: true,
                outputKind: "adjectival-nnc-patientive-function",
                generationRoute: "adjectival-nnc",
                frame: {
                    lessonRef: "Andrews 40.4",
                    functionKind: "patientive-adjectival",
                    sourceCategory: "patientive-nounstem",
                    generatedSurfacePreserved: true,
                    hasModificationAst: false,
                    patientivoSource: "nonactive",
                    sourceFormulaEcho: "#Ø-Ø(tamach)ti#",
                },
            },
            routed: {
                supported: true,
                result: "tamachti",
                ok: true,
                surface: "tamachti",
                topFramesIsGrammarFrame: true,
                surfaceForms: ["tamachti"],
                generationRoute: "adjectival-nnc",
                formulaEcho: "#Ø-Ø(tamach)ti#",
                functionKind: "patientive-adjectival",
            },
        }
    );
    s.eq(
        "Andrews 40.4 patientive adjectival function rejects missing or possessive-state surfaces",
        [
            ctx.buildPatientivoAdjectivalNncFunctionOutput({}).diagnostics.map((item) => item.id),
            ctx.buildPatientivoAdjectivalNncFunctionOutput({
                patientivoSurface: "tamachti",
                state: "possessive",
            }).diagnostics.map((item) => item.id),
        ],
        [
            ["adjectival-nnc-requires-patientive-surface"],
            ["adjectival-nnc-requires-absolutive-state"],
        ]
    );
    s.eq(
        "adjectival NNC function UI promotion preserves the LCM route contract into execution",
        (() => {
            const direct = ctx.buildPatientivoAdjectivalNncFunctionOutput({
                patientivoSurface: "tamachti",
                patientivoSource: "nonactive",
                formulaEcho: "#Ø-Ø(tamach)ti#",
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "patientive-adjectival",
                formulaEcho: direct.formulaEcho || "",
                patientivoSource: direct.adjectivalNncFunctionFrame?.patientivoSource || "",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                datasetRouteFamily: verbEl.dataset.grammarRouteFamily,
                datasetRouteStage: verbEl.dataset.grammarRouteStage,
                datasetAuthorityRef: verbEl.dataset.grammarAuthorityRef,
                datasetGenerationAllowed: verbEl.dataset.grammarGenerationAllowed,
                entryRouteFamily: entryContract.routeFamily,
                entryRouteStage: entryContract.routeStage,
                entryAuthorityRef: entryContract.authorityRefs[0] || "",
                overrideRouteFamily: override?.adjectivalNnc?.entryRouteContract?.routeFamily || "",
                overrideFrameSurface: override?.adjectivalNnc?.grammarFrame?.resultFrame?.surface || "",
                overrideFrameForms: override?.adjectivalNnc?.grammarFrame?.resultFrame?.surfaceForms || [],
                overrideFramesAlias: override?.adjectivalNnc?.frames === override?.adjectivalNnc?.grammarFrame,
                overrideFormation: override?.adjectivalNnc?.formation || "",
                routedSurface: routed.surface,
                routedRouteFamily: routed.frames?.routeContract?.routeFamily || "",
                routedAuthorityRefs: routed.grammarFrame?.authorityFrame?.andrewsRefs || [],
                routedSourceEvidenceKind: routed.grammarFrame?.authorityFrame?.sourceEvidence?.kind || "",
                routedSourceEvidenceStatus: routed.grammarFrame?.authorityFrame?.sourceEvidence?.status || "",
                routedSourceEvidenceFlags: Object.keys(routed.grammarFrame?.authorityFrame?.sourceEvidence?.boundaries || {})
                    .filter((key) => routed.grammarFrame.authorityFrame.sourceEvidence.boundaries[key] === true)
                    .sort(),
                routedSourceRouteFamily: routed.grammarFrame?.routeContract?.sourceContract?.sourceRouteFamily || "",
                routedSourceSurface: routed.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            datasetRouteFamily: "adjectival-nnc",
            datasetRouteStage: "execute",
            datasetAuthorityRef: "Andrews 40.4",
            datasetGenerationAllowed: "true",
            entryRouteFamily: "adjectival-nnc",
            entryRouteStage: "execute",
            entryAuthorityRef: "Andrews 40.4",
            overrideRouteFamily: "adjectival-nnc",
            overrideFrameSurface: "tamachti",
            overrideFrameForms: ["tamachti"],
            overrideFramesAlias: true,
            overrideFormation: "patientive-adjectival",
            routedSurface: "tamachti",
            routedRouteFamily: "adjectival-nnc",
            routedAuthorityRefs: ["Andrews 40.4"],
            routedSourceEvidenceKind: "adjectival-nnc-function",
            routedSourceEvidenceStatus: "source-evidence-satisfied",
            routedSourceEvidenceFlags: [
                "sourceEvidenceFromAdjectivalNncEntryContract",
                "sourceEvidenceFromAndrewsContractRoute",
                "sourceEvidenceFromMirroredGrammarFrame",
                "sourceEvidenceFromSelectedGeneratedStage",
            ],
            routedSourceRouteFamily: "adjectival-nnc",
            routedSourceSurface: "tamachti",
        }
    );
    s.eq(
        "VNC adjectival function UI promotion preserves generated VNC source contract",
        (() => {
            const direct = ctx.buildVncAdjectivalNncFunctionOutput({
                vncSurface: "nemi",
                sourceVerb: "(nemi)",
                sourceTenseValue: "presente",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                sourceVoiceMode: ctx.VOICE_MODE.active,
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "vnc-adjectival",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                datasetAuthorityRef: verbEl.dataset.grammarAuthorityRef,
                entryRouteFamily: entryContract?.routeFamily || "",
                overrideFormation: override?.adjectivalNnc?.formation || "",
                overrideVncSurface: override?.adjectivalNnc?.vncSurface || "",
                overrideSourceVerb: override?.adjectivalNnc?.sourceVerb || "",
                overrideSourceTenseValue: override?.adjectivalNnc?.sourceTenseValue || "",
                overrideSourceCombinedMode: override?.adjectivalNnc?.sourceCombinedMode || "",
                routedSurface: routed.surface,
                routedFunctionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                routedSourceTenseValue: routed.adjectivalNncFunctionFrame?.sourceTenseValue || "",
                routedSourceCombinedMode: routed.adjectivalNncFunctionFrame?.sourceCombinedMode || "",
                routedInflectionSourceTenseValue: routed.grammarFrame?.inflectionFrame?.sourceTenseValue || "",
                routedSourceCategory: routed.grammarFrame?.routeContract?.sourceContract?.sourceCategory || "",
                routedDoesNotCreateNncStem: routed.adjectivalNncFunctionFrame?.doesNotCreateNncStem === true,
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            datasetAuthorityRef: "Andrews 40.3",
            entryRouteFamily: "adjectival-nnc",
            overrideFormation: "vnc-adjectival",
            overrideVncSurface: "nemi",
            overrideSourceVerb: "(nemi)",
            overrideSourceTenseValue: "presente",
            overrideSourceCombinedMode: ctx.COMBINED_MODE.active,
            routedSurface: "nemi",
            routedFunctionKind: "vnc-adjectival",
            routedSourceTenseValue: "presente",
            routedSourceCombinedMode: ctx.COMBINED_MODE.active,
            routedInflectionSourceTenseValue: "presente",
            routedSourceCategory: "verbal-nuclear-clause",
            routedDoesNotCreateNncStem: true,
        }
    );
    s.eq(
        "ordinary absolutive NNC adjectival function UI promotion preserves source stem instead of double-generating",
        (() => {
            const direct = ctx.generateAdjectivalNncFunctionOutput({
                stem: "shuchi",
                nounClass: "t",
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "ordinary-absolutive",
                formulaEcho: direct.formulaEcho || "",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                datasetAuthorityRef: verbEl.dataset.grammarAuthorityRef,
                entryRouteFamily: entryContract?.routeFamily || "",
                overrideFormation: override?.adjectivalNnc?.formation || "",
                overrideStem: override?.adjectivalNnc?.stem || "",
                overrideSourceStem: override?.adjectivalNnc?.sourceStem || "",
                overrideNounClass: override?.adjectivalNnc?.nounClass || "",
                overrideNumber: override?.adjectivalNnc?.number || "",
                routedSurface: routed.surface,
                routedResult: routed.result,
                routedFunctionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                routedSourceFormulaEcho: routed.adjectivalNncFunctionFrame?.sourceFormulaEcho || "",
                routedSourceStem: routed.grammarFrame?.stemFrame?.sourceStem || "",
                doubledSurfaceBlocked: routed.surface !== "shuchitt",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            datasetAuthorityRef: "Andrews 40.1",
            entryRouteFamily: "adjectival-nnc",
            overrideFormation: "ordinary-absolutive",
            overrideStem: "shuchi",
            overrideSourceStem: "shuchi",
            overrideNounClass: "t",
            overrideNumber: "singular",
            routedSurface: "shuchit",
            routedResult: "shuchit",
            routedFunctionKind: "modifier-candidate",
            routedSourceFormulaEcho: "#Ø-Ø(shuchi)t#",
            routedSourceStem: "shuchi",
            doubledSurfaceBlocked: true,
        }
    );
    s.eq(
        "adjectival NNC function UI promotion clears stale nawat route stations",
        (() => {
            const direct = ctx.buildPatientivoAdjectivalNncFunctionOutput({
                patientivoSurface: "tamachti",
                patientivoSource: "nonactive",
                formulaEcho: "#Ø-Ø(tamach)ti#",
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (typeof ctx.setActiveNawatRouteProfile === "function") {
                ctx.setActiveNawatRouteProfile("denominal-vi-ti-preterit", {
                    activeRouteTravelSource: "chip",
                    targetMode: ctx.TENSE_MODE?.adjetivo || "adjetivo",
                    targetTenseValue: "potencial",
                    targetVerb: "stale-route-target",
                    activeStationKey: "finite-tense",
                    activeStationInput: "stale-route-target",
                    activeStationVerb: "stale-route-target",
                });
            }
            ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "patientive-adjectival",
                formulaEcho: direct.formulaEcho || "",
                patientivoSource: direct.adjectivalNncFunctionFrame?.patientivoSource || "",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const summary = {
                activeMode: typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "",
                activeRouteId: typeof ctx.getActiveNawatRouteProfile === "function"
                    ? (ctx.getActiveNawatRouteProfile()?.id || "")
                    : "",
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
                datasetRouteFamily: verbEl.dataset.grammarRouteFamily || "",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (typeof ctx.clearActiveNawatRouteProfile === "function") {
                ctx.clearActiveNawatRouteProfile();
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            activeMode: ctx.TENSE_MODE.adjetivo,
            activeRouteId: "",
            datasetSurface: "tamachti",
            datasetRouteFamily: "adjectival-nnc",
        }
    );
    s.eq(
        "adjectival NNC function UI promotion reads LCM result-frame surface before clicked surface",
        (() => {
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "generated",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: true,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "execute",
                    generationAllowed: true,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "frame-chip-surface",
                    surfaceForms: ["frame-chip-a / frame-chip-b"],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: "stale-clicked-surface",
                formation: "patientive-adjectival",
                formulaEcho: "#Ø-Ø(frame)#",
                patientivoSource: "nonactive",
                grammarFrame: frame,
                refresh: false,
            });
            const serialized = JSON.parse(verbEl.dataset.adjectivalNncFunctionContract || "{}");
            const summary = {
                inputValue: verbEl.value,
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface,
                contractSurface: entryContract?.surface || "",
                serializedSurface: serialized.surface || "",
                routeFamily: entryContract?.routeFamily || "",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            inputValue: "frame-chip-a",
            datasetSurface: "frame-chip-a",
            contractSurface: "frame-chip-a",
            serializedSurface: "frame-chip-a",
            routeFamily: "adjectival-nnc",
        }
    );
    s.eq(
        "adjectival NNC function UI promotion blocks stale clicked surface for empty result frame",
        (() => {
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            verbEl.value = "unchanged-input";
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "generated",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: true,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "result-frame-gate",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: "stale-clicked-surface",
                formation: "patientive-adjectival",
                formulaEcho: "#Ø-Ø(frame)#",
                patientivoSource: "nonactive",
                grammarFrame: frame,
                refresh: false,
            });
            const summary = {
                inputValue: verbEl.value,
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
                hasSerializedContract: Boolean(verbEl.dataset.adjectivalNncFunctionContract),
                returnedContract: entryContract === null,
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false });
            }
            return summary;
        })(),
        {
            inputValue: "unchanged-input",
            datasetSurface: "",
            hasSerializedContract: false,
            returnedContract: true,
        }
    );
    s.eq(
        "adjectival NNC function override rejects stale serialized surface for empty result frame",
        (() => {
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            verbEl.value = "stale-contract-surface";
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "result-frame-gate",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            verbEl.dataset.adjectivalNncFunctionContract = JSON.stringify({
                surface: "stale-contract-surface",
                grammarFrame: frame,
            });
            verbEl.dataset.adjectivalNncFunctionSurface = "";
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const summary = {
                overrideBuilt: Boolean(override),
                contractSurface: JSON.parse(verbEl.dataset.adjectivalNncFunctionContract || "{}").surface || "",
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            return summary;
        })(),
        {
            overrideBuilt: false,
            contractSurface: "stale-contract-surface",
            datasetSurface: "",
        }
    );
    s.eq(
        "adjectival NNC function override rejects stale dataset surface after empty result frame",
        (() => {
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            verbEl.value = "stale-dataset-surface";
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "result-frame-gate",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            verbEl.dataset.adjectivalNncFunctionContract = JSON.stringify({
                surface: "",
                grammarFrame: frame,
            });
            verbEl.dataset.adjectivalNncFunctionSurface = "stale-dataset-surface";
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const summary = {
                overrideBuilt: Boolean(override),
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
                resultFrameSurface: frame.resultFrame.surface || "",
                resultFrameForms: frame.resultFrame.surfaceForms || [],
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            return summary;
        })(),
        {
            overrideBuilt: false,
            datasetSurface: "stale-dataset-surface",
            resultFrameSurface: "",
            resultFrameForms: [],
        }
    );
    s.eq(
        "adjectival NNC generation routes read override LCM result-frame surface before stale surface fields",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "generated",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: true,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "execute",
                    generationAllowed: true,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "frame-patientive-surface",
                    surfaceForms: ["frame-patientive-a / frame-patientive-b"],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "stale-input-surface",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "patientive-adjectival",
                            stem: "stale-stem",
                            surface: "stale-surface",
                            patientivoSurface: "stale-patientive-surface",
                            patientivoSource: "nonactive",
                            grammarFrame,
                            frames: grammarFrame,
                            state: "absolutive",
                            role: "predicate-surface",
                        },
                    },
                },
            });
            return {
                surface: routed.surface,
                surfaceForms: routed.surfaceForms,
                frameSurface: routed.grammarFrame?.resultFrame?.surface || "",
                frameSurfaceForms: routed.grammarFrame?.resultFrame?.surfaceForms || [],
                routeFamily: routed.grammarFrame?.routeContract?.routeFamily || "",
            };
        })(),
        {
            surface: "frame-patientive-a",
            surfaceForms: ["frame-patientive-a"],
            frameSurface: "frame-patientive-a",
            frameSurfaceForms: ["frame-patientive-a"],
            routeFamily: "adjectival-nnc",
        }
    );
    s.eq(
        "adjectival NNC generation routes suppress stale override surfaces for empty result frame",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "blocked",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "execute",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "stale-input-surface",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "patientive-adjectival",
                            stem: "stale-stem",
                            surface: "stale-surface",
                            patientivoSurface: "stale-patientive-surface",
                            patientivoSource: "nonactive",
                            grammarFrame,
                            frames: grammarFrame,
                            state: "absolutive",
                            role: "predicate-surface",
                        },
                    },
                },
            });
            return {
                ok: routed.ok,
                surface: routed.surface,
                surfaceForms: routed.surfaceForms,
                frameOk: routed.grammarFrame?.resultFrame?.ok,
                frameSurface: routed.grammarFrame?.resultFrame?.surface || "",
                frameSurfaceForms: routed.grammarFrame?.resultFrame?.surfaceForms || [],
                sourceSurface: routed.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                sourceEvidenceStatus: routed.grammarFrame?.authorityFrame?.sourceEvidence?.status || "",
                selectedStageEvidence: routed.grammarFrame?.authorityFrame?.sourceEvidence
                    ?.boundaries?.sourceEvidenceFromSelectedGeneratedStage === true,
            };
        })(),
        {
            ok: false,
            surface: "",
            surfaceForms: [],
            frameOk: false,
            frameSurface: "",
            frameSurfaceForms: [],
            sourceSurface: "",
            sourceEvidenceStatus: "blocked",
            selectedStageEvidence: false,
        }
    );
    s.eq(
        "adjectival NNC grammar contract reads LCM result-frame surface forms",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-adjective-a / frame-adjective-b"],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const routed = ctx.attachAdjectivalNncGrammarContract({
                result: "stale-adjective-result",
                surface: "top-adjective-surface",
                surfaceForms: ["stale-adjective-a / stale-adjective-b"],
                frames: grammarFrame,
                supported: true,
                outputKind: "adjectival-nnc-function",
                clauseKind: "verbal-nuclear-clause",
                generationRoute: "adjectival-nnc",
                adjectivalNncFunctionFrame: {
                    lessonRef: "Andrews 40.3",
                    sourceClauseKind: "verbal-nuclear-clause",
                },
            });
            return {
                ok: routed.ok,
                surface: routed.surface,
                surfaceForms: routed.surfaceForms,
                frameSurface: routed.grammarFrame.resultFrame.surface,
                frameSurfaceForms: routed.grammarFrame.resultFrame.surfaceForms,
                generationAllowed: routed.grammarFrame.routeContract.generationAllowed,
            };
        })(),
        {
            ok: true,
            surface: "frame-adjective-a",
            surfaceForms: ["frame-adjective-a", "frame-adjective-b"],
            frameSurface: "frame-adjective-a",
            frameSurfaceForms: ["frame-adjective-a", "frame-adjective-b"],
            generationAllowed: true,
        }
    );
    s.eq(
        "adjectival NNC grammar contract reads surfaceForms before top-level surface",
        (() => {
            const routed = ctx.attachAdjectivalNncGrammarContract({
                result: "—",
                surface: "top-adjective-surface",
                surfaceForms: ["top-adjective-a / top-adjective-b"],
                supported: true,
                outputKind: "adjectival-nnc-function",
                clauseKind: "verbal-nuclear-clause",
                generationRoute: "adjectival-nnc",
                adjectivalNncFunctionFrame: {
                    lessonRef: "Andrews 40.3",
                    sourceClauseKind: "verbal-nuclear-clause",
                },
            });
            return {
                ok: routed.ok,
                surface: routed.surface,
                surfaceForms: routed.surfaceForms,
                frameSurface: routed.grammarFrame.resultFrame.surface,
                frameSurfaceForms: routed.grammarFrame.resultFrame.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "top-adjective-a",
            surfaceForms: ["top-adjective-a", "top-adjective-b", "top-adjective-surface"],
            frameSurface: "top-adjective-a",
            frameSurfaceForms: ["top-adjective-a", "top-adjective-b", "top-adjective-surface"],
        }
    );
    s.eq(
        "adjectival NNC grammar contract suppresses stale source metadata for empty LCM result frames",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "adjectival-nnc-function",
                    generationRoute: "adjectival-nnc",
                }),
            });
            const emptyRouted = ctx.attachAdjectivalNncGrammarContract({
                result: "stale-result",
                surface: "stale-surface",
                surfaceForms: ["stale-a / stale-b"],
                stem: "stale-output-stem",
                frames: emptyFrame,
                supported: false,
                outputKind: "adjectival-nnc-function",
                clauseKind: "verbal-nuclear-clause",
                generationRoute: "adjectival-nnc",
                adjectivalNncFunctionFrame: {
                    lessonRef: "Andrews 40.3",
                    sourceClauseKind: "verbal-nuclear-clause",
                    patientivoSurface: "stale-patientivo-source",
                    nominalizedSurface: "stale-nominalized-source",
                    vncSurface: "stale-vnc-source",
                    sourcePredicateStem: "stale-source-predicate",
                },
            });
            const staleRouted = ctx.attachAdjectivalNncGrammarContract({
                result: "stale-result",
                stem: "stale-output-stem",
                supported: true,
                outputKind: "adjectival-nnc-function",
                generationRoute: "adjectival-nnc",
                adjectivalNncFunctionFrame: {
                    patientivoSurface: "stale-patientivo-source",
                    nominalizedSurface: "stale-nominalized-source",
                    sourcePredicateStem: "stale-source-predicate",
                },
            });
            return {
                emptySourceInput: emptyRouted.grammarFrame.resultFrame.sourceInput || "",
                emptyStem: emptyRouted.grammarFrame.stemFrame.stem || "",
                emptySourceStem: emptyRouted.grammarFrame.stemFrame.sourceStem || "",
                emptySurfaceForms: emptyRouted.grammarFrame.resultFrame.surfaceForms || [],
                staleSourceInput: staleRouted.grammarFrame.resultFrame.sourceInput || "",
                staleStem: staleRouted.grammarFrame.stemFrame.stem || "",
                staleSourceStem: staleRouted.grammarFrame.stemFrame.sourceStem || "",
            };
        })(),
        {
            emptySourceInput: "",
            emptyStem: "",
            emptySourceStem: "",
            emptySurfaceForms: [],
            staleSourceInput: "stale-patientivo-source",
            staleStem: "stale-output-stem",
            staleSourceStem: "stale-patientivo-source",
        }
    );
    s.eq(
        "adjectival NNC routing returns an LCM grammar frame before no-output display",
        (() => {
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "patientive-adjectival",
                            patientivoSurface: "",
                        },
                    },
                },
            });
            const evaluation = ctx.buildConjugationEvaluationRecord({ result: routed });
            return {
                result: routed.result,
                topOk: routed.ok,
                topSurface: routed.surface,
                topFramesIsGrammarFrame: routed.frames === routed.grammarFrame,
                frameKeys: ctx.GRAMMAR_FRAME_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(routed.grammarFrame, key)),
                authorityRefs: routed.grammarFrame.authorityFrame.andrewsRefs,
                evidenceStatus: routed.grammarFrame.authorityFrame.evidenceStatus,
                unitKind: routed.grammarFrame.unitFrame.unitKind,
                routeFamily: routed.grammarFrame.routeContract.routeFamily,
                generationAllowed: routed.grammarFrame.routeContract.generationAllowed,
                resultOk: routed.grammarFrame.resultFrame.ok,
                diagnosticStatus: routed.grammarFrame.diagnosticFrame.status,
                diagnosticIds: evaluation.diagnosticIds,
                noOutputLabel: ctx.getConjugationNoOutputDisplay(evaluation),
            };
        })(),
        {
            result: "",
            topOk: false,
            topSurface: "",
            topFramesIsGrammarFrame: true,
            frameKeys: ctx.GRAMMAR_FRAME_KEYS,
            authorityRefs: ["Andrews 40.4"],
            evidenceStatus: "blocked",
            unitKind: "ordinary-nnc",
            routeFamily: "adjectival-nnc",
            generationAllowed: false,
            resultOk: false,
            diagnosticStatus: "blocked",
            diagnosticIds: ["adjectival-nnc-requires-patientive-surface"],
            noOutputLabel: "Patientive adjectival NNC generation requires a generated patientive noun surface from #3 salida.",
        }
    );
    s.eq(
        "Andrews 40.3 VNC adjectival function preserves generated VNC surface without NNC formula",
        (() => {
            const direct = ctx.buildVncAdjectivalNncFunctionOutput({
                vncSurface: "nemi",
                sourceVerb: "(nemi)",
                sourceTenseValue: "presente",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "nemi",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-vnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "vnc-adjectival",
                            vncSurface: "nemi",
                            sourceVerb: "(nemi)",
                            sourceTenseValue: "presente",
                            sourceCombinedMode: ctx.COMBINED_MODE.active,
                        },
                    },
                },
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    outputKind: direct.outputKind,
                    clauseKind: direct.clauseKind,
                    lessonRef: direct.adjectivalNncFunctionFrame.lessonRef,
                    functionKind: direct.adjectivalNncFunctionFrame.functionKind,
                    sourceCategory: direct.adjectivalNncFunctionFrame.sourceCategory,
                    sourceClauseKind: direct.adjectivalNncFunctionFrame.sourceClauseKind,
                    hasModificationAst: direct.adjectivalNncFunctionFrame.hasModificationAst,
                    doesNotCreateNncStem: direct.adjectivalNncFunctionFrame.doesNotCreateNncStem,
                    formulaSlots: direct.formulaSlots,
                    formulaEcho: direct.formulaEcho,
                },
                routed: {
                    supported: routed.supported,
                    result: routed.result,
                    outputKind: routed.outputKind,
                    clauseKind: routed.clauseKind,
                    generationRoute: routed.generationRoute,
                    shellKind: routed.nuclearClauseShell?.clauseKind || "",
                    shellFormulaType: routed.nuclearClauseShell?.formulaType || "",
                    shellFormulaEcho: routed.nuclearClauseShell?.formulaEcho || "",
                    functionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "nemi",
                outputKind: "adjectival-vnc-function",
                clauseKind: "verbal-nuclear-clause",
                lessonRef: "Andrews 40.3",
                functionKind: "vnc-adjectival",
                sourceCategory: "verbal-nuclear-clause",
                sourceClauseKind: "verbal-nuclear-clause",
                hasModificationAst: false,
                doesNotCreateNncStem: true,
                formulaSlots: null,
                formulaEcho: "",
            },
            routed: {
                supported: true,
                result: "nemi",
                outputKind: "adjectival-vnc-function",
                clauseKind: "verbal-nuclear-clause",
                generationRoute: "adjectival-nnc",
                shellKind: "verbal-nuclear-clause",
                shellFormulaType: "VNC",
                shellFormulaEcho: "#Ø-Ø(nemi)Ø+Ø-Ø#",
                functionKind: "vnc-adjectival",
            },
        }
    );
    s.eq(
        "Andrews 40.3 VNC adjectival route requires a generated VNC surface",
        ctx.buildVncAdjectivalNncFunctionOutput({}).diagnostics.map((item) => item.id),
        ["adjectival-nnc-requires-vnc-surface"]
    );
    s.eq(
        "Andrews 40.3 VNC adjectival route blocks at result/diagnostic layer without generated VNC output",
        (() => {
            const blocked = ctx.buildVncAdjectivalNncFunctionOutput({});
            return {
                supported: blocked.supported,
                result: blocked.result,
                generationAllowed: blocked.grammarFrame?.routeContract?.generationAllowed,
                unitKind: blocked.grammarFrame?.unitFrame?.unitKind || "",
                resultOk: blocked.grammarFrame?.resultFrame?.ok,
                sourceInput: blocked.grammarFrame?.resultFrame?.sourceInput || "",
                diagnosticStatus: blocked.grammarFrame?.diagnosticFrame?.status || "",
                diagnosticIds: (blocked.grammarFrame?.diagnosticFrame?.diagnostics || [])
                    .map((entry) => entry.id)
                    .filter(Boolean),
            };
        })(),
        {
            supported: false,
            result: "",
            generationAllowed: false,
            unitKind: "verbal-nuclear-clause",
            resultOk: false,
            sourceInput: "",
            diagnosticStatus: "blocked",
            diagnosticIds: ["adjectival-nnc-requires-vnc-surface"],
        }
    );
    s.eq(
        "Andrews 40.5-40.8 nominalized VNC predicates can re-route as adjectival NNC functions",
        (() => {
            const customaryAgentive = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(nemi)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "agentivo",
                },
            });
            const preteritAgentive = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "agentivo-preterito",
                },
            });
            const potentialPatient = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ta",
                    tronco: "-(mati)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "potencial",
                },
            });
            const customaryPatientive = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: ctx.TENSE_MODE.adjetivo,
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                    voiceMode: ctx.VOICE_MODE.passive,
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ta",
                    tronco: "-(mati)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "potencial-habitual",
                },
            });
            const directCustomary = ctx.buildNominalizedVncAdjectivalNncFunctionOutput({
                nominalizedSurface: customaryAgentive.surfaceForms[0],
                nominalizationProfile: customaryAgentive.nominalizationProfile,
                formulaSlots: customaryAgentive.nuclearClauseShell?.formulaSlots || null,
                formulaEcho: customaryAgentive.nuclearClauseShell?.formulaEcho || "",
            });
            const directPotential = ctx.buildNominalizedVncAdjectivalNncFunctionOutput({
                nominalizedSurface: potentialPatient.surfaceForms[0],
                nominalizationProfile: potentialPatient.nominalizationProfile,
                formulaSlots: potentialPatient.nuclearClauseShell?.formulaSlots || null,
                formulaEcho: potentialPatient.nuclearClauseShell?.formulaEcho || "",
            });
            const directCustomaryPatientive = ctx.buildNominalizedVncAdjectivalNncFunctionOutput({
                nominalizedSurface: customaryPatientive.surfaceForms[0],
                nominalizationProfile: customaryPatientive.nominalizationProfile,
                formulaSlots: customaryPatientive.nuclearClauseShell?.formulaSlots || null,
                formulaEcho: customaryPatientive.nuclearClauseShell?.formulaEcho || "",
            });
            const routedPreterit = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: preteritAgentive.surfaceForms[0],
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "nominalized-vnc-adjectival",
                            nominalizedSurface: preteritAgentive.surfaceForms[0],
                            nominalizationProfile: preteritAgentive.nominalizationProfile,
                            formulaSlots: preteritAgentive.nuclearClauseShell?.formulaSlots || null,
                            formulaEcho: preteritAgentive.nuclearClauseShell?.formulaEcho || "",
                        },
                    },
                },
            });
            return {
                customary: {
                    source: customaryAgentive.surfaceForms[0],
                    formula: customaryAgentive.nuclearClauseShell?.formulaEcho || "",
                    supported: directCustomary.supported,
                    result: directCustomary.result,
                    outputKind: directCustomary.outputKind,
                    lessonRef: directCustomary.adjectivalNncFunctionFrame.lessonRef,
                    functionKind: directCustomary.adjectivalNncFunctionFrame.functionKind,
                    nominalizationKind: directCustomary.adjectivalNncFunctionFrame.nominalizationKind,
                    surfacePreserved: directCustomary.adjectivalNncFunctionFrame.generatedSurfacePreserved,
                    hasModificationAst: directCustomary.adjectivalNncFunctionFrame.hasModificationAst,
                },
                preterit: {
                    source: preteritAgentive.surfaceForms[0],
                    formula: preteritAgentive.nuclearClauseShell?.formulaEcho || "",
                    supported: routedPreterit.supported,
                    result: routedPreterit.result,
                    surfaceForms: routedPreterit.surfaceForms,
                    lessonRef: routedPreterit.adjectivalNncFunctionFrame?.lessonRef || "",
                    functionKind: routedPreterit.adjectivalNncFunctionFrame?.functionKind || "",
                    nominalizationKind: routedPreterit.adjectivalNncFunctionFrame?.nominalizationKind || "",
                },
                potentialPatient: {
                    source: potentialPatient.surfaceForms[0],
                    formula: potentialPatient.nuclearClauseShell?.formulaEcho || "",
                    supported: directPotential.supported,
                    result: directPotential.result,
                    lessonRef: directPotential.adjectivalNncFunctionFrame.lessonRef,
                    functionKind: directPotential.adjectivalNncFunctionFrame.functionKind,
                    nominalizationKind: directPotential.adjectivalNncFunctionFrame.nominalizationKind,
                },
                customaryPatientive: {
                    source: customaryPatientive.surfaceForms[0],
                    formula: customaryPatientive.nuclearClauseShell?.formulaEcho || "",
                    supported: directCustomaryPatientive.supported,
                    result: directCustomaryPatientive.result,
                    lessonRef: directCustomaryPatientive.adjectivalNncFunctionFrame.lessonRef,
                    functionKind: directCustomaryPatientive.adjectivalNncFunctionFrame.functionKind,
                    nominalizationKind: directCustomaryPatientive.adjectivalNncFunctionFrame.nominalizationKind,
                },
            };
        })(),
        {
            customary: {
                source: "nemini",
                formula: "#Ø-Ø(nemini)Ø#",
                supported: true,
                result: "nemini",
                outputKind: "adjectival-nnc-nominalized-vnc-function",
                lessonRef: "Andrews 40.6",
                functionKind: "agentive-adjectival",
                nominalizationKind: "customary-present-agentive",
                surfacePreserved: true,
                hasModificationAst: false,
            },
            preterit: {
                source: "mikik",
                formula: "#Ø-Ø(miki)k#",
                supported: true,
                result: "mikik",
                surfaceForms: ["mikik"],
                lessonRef: "Andrews 40.8",
                functionKind: "preterit-agentive-adjectival",
                nominalizationKind: "preterit-agentive",
            },
            potentialPatient: {
                source: "matilis",
                formula: "#Ø-Ø(mati)Ø#",
                supported: true,
                result: "matilis",
                lessonRef: "Andrews 40.4.2",
                functionKind: "potential-patient-adjectival",
                nominalizationKind: "potential-patient",
            },
            customaryPatientive: {
                source: "machuni",
                formula: "#Ø-Ø(matiluni)Ø#",
                supported: true,
                result: "machuni",
                lessonRef: "Andrews 40.7",
                functionKind: "customary-present-patientive-adjectival",
                nominalizationKind: "customary-present-patientive",
            },
        }
    );
    s.eq(
        "Andrews 40.5 nominalized VNC adjectival route keeps unsupported kinds diagnostic",
        [
            ctx.buildNominalizedVncAdjectivalNncFunctionOutput({}).diagnostics.map((item) => item.id),
            ctx.buildNominalizedVncAdjectivalNncFunctionOutput({
                nominalizedSurface: "nemiski",
                nominalizationProfile: {
                    role: { nominalizationKind: "future-agentive" },
                },
            }).diagnostics.map((item) => item.id),
            ctx.buildNominalizedVncAdjectivalNncFunctionOutput({
                nominalizedSurface: "nemini",
                state: "possessive",
                nominalizationProfile: {
                    role: { nominalizationKind: "customary-present-agentive" },
                },
            }).diagnostics.map((item) => item.id),
        ],
        [
            ["adjectival-nnc-requires-nominalized-vnc-surface"],
            ["adjectival-nnc-unsupported-nominalized-vnc-kind"],
            ["adjectival-nnc-requires-absolutive-state"],
        ]
    );
    s.eq(
        "Andrews 41.2 compound-source adjetivo output keeps the generated surface and exposes source roles",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(a/miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                result: generated.result,
                surfaceForms: generated.surfaceForms,
                compoundFrame: {
                    kind: generated.compoundFrame?.kind || "",
                    lessonRange: generated.compoundFrame?.lessonRange || "",
                    matrixStem: generated.compoundFrame?.matrix?.stem || "",
                    embedRoles: generated.compoundFrame?.embeds?.map((entry) => entry.role) || [],
                    embedValues: generated.compoundFrame?.embeds?.map((entry) => entry.value) || [],
                    rawInput: generated.compoundFrame?.sourceInput?.rawInput || "",
                    changesSurfaceForms: generated.compoundFrame?.boundaries?.changesSurfaceForms,
                },
                adjectivalCompoundSourceFrame: {
                    kind: generated.adjectivalCompoundSourceFrame?.kind || "",
                    lessonRef: generated.adjectivalCompoundSourceFrame?.lessonRef || "",
                    outputKind: generated.adjectivalCompoundSourceFrame?.outputKind || "",
                    sourceCategory: generated.adjectivalCompoundSourceFrame?.sourceCategory || "",
                    functionKind: generated.adjectivalCompoundSourceFrame?.functionKind || "",
                    nominalizationKind: generated.adjectivalCompoundSourceFrame?.nominalizationKind || "",
                    generatedSurfacePreserved: generated.adjectivalCompoundSourceFrame?.generatedSurfacePreserved,
                    hasModificationAst: generated.adjectivalCompoundSourceFrame?.hasModificationAst,
                    sourceFormulaEcho: generated.adjectivalCompoundSourceFrame?.sourceFormulaEcho || "",
                    sourceMatrixStem: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.matrix?.stem || "",
                    sourceEmbedRoles: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.role) || [],
                    sourceEmbedValues: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.value) || [],
                    sourceRawInput: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame?.sourceInput?.rawInput || "",
                    changesSurfaceForms: generated.adjectivalCompoundSourceFrame?.boundaries?.changesSurfaceForms,
                    noModificationAst: generated.adjectivalCompoundSourceFrame?.boundaries?.noModificationAst,
                },
            };
        })(),
        {
            result: "amikik",
            surfaceForms: ["amikik"],
            compoundFrame: {
                kind: "compound-frame",
                lessonRange: "28,30",
                matrixStem: "miki",
                embedRoles: ["adjacent-core-embed"],
                embedValues: ["a"],
                rawInput: "(a/miki)",
                changesSurfaceForms: false,
            },
            adjectivalCompoundSourceFrame: {
                kind: "adjectival-compound-source-frame",
                lessonRef: "Andrews 41.2",
                outputKind: "adjectival-nnc-compound-source",
                sourceCategory: "compound-verbstem",
                functionKind: "compound-source-adjectival",
                nominalizationKind: "adjectival-surface",
                generatedSurfacePreserved: true,
                hasModificationAst: false,
                sourceFormulaEcho: "#Ø-Ø(amikik)Ø#",
                sourceMatrixStem: "miki",
                sourceEmbedRoles: ["adjacent-core-embed"],
                sourceEmbedValues: ["a"],
                sourceRawInput: "(a/miki)",
                changesSurfaceForms: false,
                noModificationAst: true,
            },
        }
    );
    s.eq(
        "Andrews 41.2 compound-source adjectival route preserves generated surface as an executable contract",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(a/miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            const direct = ctx.buildCompoundSourceAdjectivalNncFunctionOutput({
                compoundSourceSurface: generated.result,
                sourceCompoundFrame: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame || null,
                nominalizationKind: generated.adjectivalCompoundSourceFrame?.nominalizationKind || "",
                formulaSlots: generated.adjectivalCompoundSourceFrame?.sourceFormulaSlots || null,
                formulaEcho: generated.adjectivalCompoundSourceFrame?.sourceFormulaEcho || "",
            });
            const blocked = ctx.buildCompoundSourceAdjectivalNncFunctionOutput({
                compoundSourceSurface: generated.result,
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    outputKind: direct.outputKind,
                    formulaEcho: direct.formulaEcho,
                    lessonRef: direct.adjectivalNncFunctionFrame?.lessonRef || "",
                    functionKind: direct.adjectivalNncFunctionFrame?.functionKind || "",
                    sourceCategory: direct.adjectivalNncFunctionFrame?.sourceCategory || "",
                    sourceMatrixStem: direct.adjectivalNncFunctionFrame?.sourceCompoundFrame?.matrix?.stem || "",
                    sourceEmbedRoles: direct.adjectivalNncFunctionFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.role) || [],
                    generatedSurfacePreserved: direct.adjectivalNncFunctionFrame?.generatedSurfacePreserved,
                    hasModificationAst: direct.adjectivalNncFunctionFrame?.hasModificationAst,
                    routeFamily: direct.grammarFrame?.routeContract?.routeFamily || "",
                    resultOk: direct.grammarFrame?.resultFrame?.ok,
                },
                blocked: blocked.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            direct: {
                supported: true,
                result: "amikik",
                outputKind: "adjectival-nnc-compound-source",
                formulaEcho: "#Ø-Ø(amikik)Ø#",
                lessonRef: "Andrews 41.2",
                functionKind: "compound-source-adjectival",
                sourceCategory: "compound-verbstem",
                sourceMatrixStem: "miki",
                sourceEmbedRoles: ["adjacent-core-embed"],
                generatedSurfacePreserved: true,
                hasModificationAst: false,
                routeFamily: "adjectival-nnc",
                resultOk: true,
            },
            blocked: ["adjectival-nnc-requires-compound-source-frame"],
        }
    );
    s.eq(
        "Andrews 41.2 compound-source UI promotion keeps compound source roles through execution",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(a/miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            const direct = ctx.buildCompoundSourceAdjectivalNncFunctionOutput({
                compoundSourceSurface: generated.result,
                sourceCompoundFrame: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame || null,
                nominalizationKind: generated.adjectivalCompoundSourceFrame?.nominalizationKind || "",
                formulaSlots: generated.adjectivalCompoundSourceFrame?.sourceFormulaSlots || null,
                formulaEcho: generated.adjectivalCompoundSourceFrame?.sourceFormulaEcho || "",
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "compound-source-adjectival",
                formulaEcho: direct.formulaEcho || "",
                sourceFormulaSlots: generated.adjectivalCompoundSourceFrame?.sourceFormulaSlots || null,
                sourceFormulaEcho: generated.adjectivalCompoundSourceFrame?.sourceFormulaEcho || "",
                sourceCompoundFrame: generated.adjectivalCompoundSourceFrame?.sourceCompoundFrame || null,
                nominalizedVncKind: generated.adjectivalCompoundSourceFrame?.nominalizationKind || "",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                entrySurface: entryContract?.surface || "",
                entrySourceMatrix: entryContract?.sourceCompoundFrame?.matrix?.stem || "",
                overrideFormation: override?.adjectivalNnc?.formation || "",
                overrideCompoundSurface: override?.adjectivalNnc?.compoundSourceSurface || "",
                overrideSourceMatrix: override?.adjectivalNnc?.sourceCompoundFrame?.matrix?.stem || "",
                overrideFormulaEcho: override?.adjectivalNnc?.sourceFormulaEcho || "",
                routedResult: routed.result,
                routedFormulaEcho: routed.formulaEcho,
                routedFunctionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                routedSourceMatrix: routed.adjectivalNncFunctionFrame?.sourceCompoundFrame?.matrix?.stem || "",
                routedEmbedRoles: routed.adjectivalNncFunctionFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.role) || [],
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode);
            }
            return summary;
        })(),
        {
            entrySurface: "amikik",
            entrySourceMatrix: "miki",
            overrideFormation: "compound-source-adjectival",
            overrideCompoundSurface: "amikik",
            overrideSourceMatrix: "miki",
            overrideFormulaEcho: "#Ø-Ø(amikik)Ø#",
            routedResult: "amikik",
            routedFormulaEcho: "#Ø-Ø(amikik)Ø#",
            routedFunctionKind: "compound-source-adjectival",
            routedSourceMatrix: "miki",
            routedEmbedRoles: ["adjacent-core-embed"],
        }
    );
    s.eq(
        "Andrews 41.3 denominal compound nounstem source preserves generated tiya surface as an executable contract",
        (() => {
            const generated = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "(xilo/tzon/tiya)" });
            const direct = ctx.buildDenominalCompoundAdjectivalNncFunctionOutput({
                denominalCompoundSurface: generated.result,
                sourceDenominalCompoundFrame: generated.denominalCompoundSourceFrame || null,
                formulaSlots: generated.formulaSlots || null,
                formulaEcho: generated.formulaEcho || "",
            });
            const blocked = ctx.buildDenominalCompoundAdjectivalNncFunctionOutput({
                denominalCompoundSurface: generated.result,
            });
            return {
                generated: {
                    supported: generated.supported,
                    result: generated.result,
                    formulaEcho: generated.formulaEcho,
                    sourceFormationSubtype: generated.rootPlusYaAdjectivalNncFrame?.sourceFormationSubtype || "",
                    sourceFrameKind: generated.denominalCompoundSourceFrame?.kind || "",
                    sourceFrameLesson: generated.denominalCompoundSourceFrame?.lessonRef || "",
                    operationSuffix: generated.denominalCompoundSourceFrame?.operation?.suffix || "",
                    operationNawatSuffix: generated.denominalCompoundSourceFrame?.operation?.nawatInputSuffix || "",
                    matrixStem: generated.denominalCompoundSourceFrame?.matrix?.stem || "",
                    embedRoles: generated.denominalCompoundSourceFrame?.embeds?.map((entry) => entry.role) || [],
                    embedValues: generated.denominalCompoundSourceFrame?.embeds?.map((entry) => entry.value) || [],
                    rawInput: generated.denominalCompoundSourceFrame?.sourceInput?.rawInput || "",
                },
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    outputKind: direct.outputKind,
                    formulaEcho: direct.formulaEcho,
                    lessonRef: direct.adjectivalNncFunctionFrame?.lessonRef || "",
                    functionKind: direct.adjectivalNncFunctionFrame?.functionKind || "",
                    sourceCategory: direct.adjectivalNncFunctionFrame?.sourceCategory || "",
                    nominalizationKind: direct.adjectivalNncFunctionFrame?.nominalizationKind || "",
                    operationSuffix: direct.adjectivalNncFunctionFrame?.operation?.suffix || "",
                    sourceMatrixStem: direct.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.matrix?.stem || "",
                    generatedSurfacePreserved: direct.adjectivalNncFunctionFrame?.generatedSurfacePreserved,
                    hasModificationAst: direct.adjectivalNncFunctionFrame?.hasModificationAst,
                    routeFamily: direct.grammarFrame?.routeContract?.routeFamily || "",
                    resultOk: direct.grammarFrame?.resultFrame?.ok,
                },
                blocked: blocked.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            generated: {
                supported: true,
                result: "xilotzontik",
                formulaEcho: "#Ø-Ø(xilotzonti)k#",
                sourceFormationSubtype: "segmented-denominal-tiya",
                sourceFrameKind: "denominal-compound-nounstem-frame",
                sourceFrameLesson: "Andrews 41.3",
                operationSuffix: "ti",
                operationNawatSuffix: "tiya",
                matrixStem: "tzon",
                embedRoles: ["adjacent-compound-noun-embed"],
                embedValues: ["xilo"],
                rawInput: "(xilo/tzon/tiya)",
            },
            direct: {
                supported: true,
                result: "xilotzontik",
                outputKind: "adjectival-nnc-denominal-compound-source",
                formulaEcho: "#Ø-Ø(xilotzonti)k#",
                lessonRef: "Andrews 41.3",
                functionKind: "denominal-compound-adjectival",
                sourceCategory: "compound-nounstem",
                nominalizationKind: "preterit-agentive",
                operationSuffix: "ti",
                sourceMatrixStem: "tzon",
                generatedSurfacePreserved: true,
                hasModificationAst: false,
                routeFamily: "adjectival-nnc",
                resultOk: true,
            },
            blocked: ["adjectival-nnc-requires-denominal-compound-frame"],
        }
    );
    s.eq(
        "Andrews 41.3 denominal compound UI promotion keeps compound nounstem roles through execution",
        (() => {
            const generated = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "(xilo/tzon/tiya)" });
            const direct = ctx.buildDenominalCompoundAdjectivalNncFunctionOutput({
                denominalCompoundSurface: generated.result,
                sourceDenominalCompoundFrame: generated.denominalCompoundSourceFrame || null,
                formulaSlots: generated.formulaSlots || null,
                formulaEcho: generated.formulaEcho || "",
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "denominal-compound-adjectival",
                formulaEcho: direct.formulaEcho || "",
                sourceFormulaSlots: generated.formulaSlots || null,
                sourceFormulaEcho: generated.formulaEcho || "",
                sourceDenominalCompoundFrame: generated.denominalCompoundSourceFrame || null,
                nominalizedVncKind: "preterit-agentive",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                entrySurface: entryContract?.surface || "",
                entrySourceMatrix: entryContract?.sourceDenominalCompoundFrame?.matrix?.stem || "",
                overrideFormation: override?.adjectivalNnc?.formation || "",
                overrideDenominalSurface: override?.adjectivalNnc?.denominalCompoundSurface || "",
                overrideSourceMatrix: override?.adjectivalNnc?.sourceDenominalCompoundFrame?.matrix?.stem || "",
                overrideFormulaEcho: override?.adjectivalNnc?.sourceFormulaEcho || "",
                routedResult: routed.result,
                routedFormulaEcho: routed.formulaEcho,
                routedFunctionKind: routed.adjectivalNncFunctionFrame?.functionKind || "",
                routedSourceMatrix: routed.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.matrix?.stem || "",
                routedEmbedRoles: routed.adjectivalNncFunctionFrame?.sourceDenominalCompoundFrame?.embeds?.map((entry) => entry.role) || [],
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode);
            }
            return summary;
        })(),
        {
            entrySurface: "xilotzontik",
            entrySourceMatrix: "tzon",
            overrideFormation: "denominal-compound-adjectival",
            overrideDenominalSurface: "xilotzontik",
            overrideSourceMatrix: "tzon",
            overrideFormulaEcho: "#Ø-Ø(xilotzonti)k#",
            routedResult: "xilotzontik",
            routedFormulaEcho: "#Ø-Ø(xilotzonti)k#",
            routedFunctionKind: "denominal-compound-adjectival",
            routedSourceMatrix: "tzon",
            routedEmbedRoles: ["adjacent-compound-noun-embed"],
        }
    );
    s.eq(
        "Andrews 40.9 root-plus-ya adjectival NNC generates obsolete-preterit surface, not a label",
        (() => {
            const direct = ctx.generateRootPlusYaAdjectivalNncOutput({
                stem: "(istaya)",
            });
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(istaya)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjectival-nnc",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "root-plus-ya-obsolete-preterit",
                        },
                    },
                },
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    surfaceForms: direct.surfaceForms,
                    formulaEcho: direct.formulaEcho,
                    outputKind: direct.outputKind,
                    formation: direct.rootPlusYaAdjectivalNncFrame?.formation,
                    sourceRootPlusYaBase: direct.rootPlusYaAdjectivalNncFrame?.sourceRootPlusYaBase,
                    connector: direct.formulaSlots?.num1Num2?.connector,
                    connectorSlot: direct.formulaSlots?.num1Num2?.slot,
                },
                generated: {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    outputKind: generated.outputKind,
                    formulaEcho: generated.formulaEcho,
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "istak",
                surfaceForms: ["istak"],
                formulaEcho: "#Ø-Ø(ista)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
                formation: "root-plus-ya-obsolete-preterit",
                sourceRootPlusYaBase: "ista",
                connector: "k",
                connectorSlot: "num1-num2",
            },
            generated: {
                result: "istak",
                surfaceForms: ["istak"],
                generationRoute: "adjectival-nnc",
                outputKind: "adjectival-nnc-root-plus-ya",
                formulaEcho: "#Ø-Ø(ista)k#",
            },
        }
    );
    s.eq(
        "adjectival NNC formula echo reads LCM result-frame slot surfaces before stale slot text",
        ctx.buildAdjectivalNncFormulaEchoFromSlots({
            pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
            predicateStem: {
                stem: "stale-predicate",
                surface: "stale-surface",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surfaceForms: ["frame-predicate"],
                    }),
                }),
            },
            num1Num2: {
                connector: "stale-connector",
                surface: "stale-surface",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surface: "frame-connector",
                    }),
                }),
            },
        }),
        "#Ø-Ø(frame-predicate)frame-connector#"
    );
    s.eq(
        "adjectival NNC formula echo stops before stale slot text after an empty result frame",
        {
            emptyPredicate: ctx.buildAdjectivalNncFormulaEchoFromSlots({
                pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                predicateStem: {
                    stem: "stale-predicate",
                    surface: "stale-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                },
                num1Num2: {
                    connector: "stale-connector",
                    surface: "stale-surface",
                },
            }),
            emptyConnector: ctx.buildAdjectivalNncFormulaEchoFromSlots({
                pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                predicateStem: { stem: "frame-safe-predicate" },
                num1Num2: {
                    connector: "stale-connector",
                    surface: "stale-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                },
            }),
        },
        {
            emptyPredicate: "",
            emptyConnector: "#Ø-Ø(frame-safe-predicate)Ø#",
        }
    );
    s.eq(
        "intensified adjectival NNC route reads source formula slots from LCM result frames",
        (() => {
            const framedSlots = directFormulaSlots("stale-predicate", "t");
            framedSlots.predicateStem.frames = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "yekti",
                }),
            });
            framedSlots.num1Num2.frames = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "k",
                }),
            });
            const emptyPredicateSlots = directFormulaSlots("stale-predicate", "t");
            emptyPredicateSlots.predicateStem.frames = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                }),
            });
            const emptyConnectorSlots = directFormulaSlots("stale-predicate", "t");
            emptyConnectorSlots.predicateStem.frames = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "yekti",
                }),
            });
            emptyConnectorSlots.num1Num2.frames = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                }),
            });
            const framed = ctx.buildIntensifiedAdjectivalNncOutput({
                sourceSurface: "stale-source-surface",
                sourceFormulaSlots: framedSlots,
                sourceFormulaEcho: "#Ø-Ø(stale-predicate)t#",
            });
            const emptyPredicate = ctx.buildIntensifiedAdjectivalNncOutput({
                sourceSurface: "stale-source-surface",
                sourceFormulaSlots: emptyPredicateSlots,
            });
            const emptyConnector = ctx.buildIntensifiedAdjectivalNncOutput({
                sourceSurface: "stale-source-surface",
                sourceFormulaSlots: emptyConnectorSlots,
            });
            return {
                framed: {
                    result: framed.result,
                    surfaceForms: framed.surfaceForms,
                    sourceStem: framed.adjectivalNncFunctionFrame?.sourcePredicateStem || "",
                    formulaEcho: framed.formulaEcho,
                },
                emptyPredicate: {
                    supported: emptyPredicate.supported,
                    diagnostics: emptyPredicate.diagnostics.map((diagnostic) => diagnostic.id),
                    sourceStem: emptyPredicate.adjectivalNncFunctionFrame?.sourcePredicateStem || "",
                },
                emptyConnector: {
                    result: emptyConnector.result,
                    surfaceForms: emptyConnector.surfaceForms,
                    formulaEcho: emptyConnector.formulaEcho,
                    sourceStem: emptyConnector.adjectivalNncFunctionFrame?.sourcePredicateStem || "",
                },
            };
        })(),
        {
            framed: {
                result: "yejyektik",
                surfaceForms: ["yejyektik"],
                sourceStem: "yekti",
                formulaEcho: "#Ø-Ø(yejyekti)k#",
            },
            emptyPredicate: {
                supported: false,
                diagnostics: ["adjectival-nnc-requires-formula-slots"],
                sourceStem: "",
            },
            emptyConnector: {
                result: "yejyekti",
                surfaceForms: ["yejyekti"],
                formulaEcho: "#Ø-Ø(yejyekti)Ø#",
                sourceStem: "yekti",
            },
        }
    );
    s.eq(
        "Andrews 40.9 root-plus-ya adjectival NNC keeps weya on its suppletive/pronoun-like path",
        ctx.generateRootPlusYaAdjectivalNncOutput({
            stem: "(weya)",
        }).diagnostics.map((diagnostic) => diagnostic.id),
        ["adjectival-nnc-root-plus-ya-exception"]
    );
    s.eq(
        "Adjetivo preterito keeps weya aliases out of finite preterit fallback",
        ["(weya)", "(weiya)", "(weyya)"].map((stem) => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: stem,
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                stem,
                supported: generated.supported,
                result: generated.result,
                surfaceForms: generated.surfaceForms,
                outputKind: generated.outputKind,
                generationRoute: generated.generationRoute,
                diagnostics: (generated.diagnostics || []).map((diagnostic) => diagnostic.id),
            };
        }),
        [
            {
                stem: "(weya)",
                supported: false,
                result: "",
                surfaceForms: [],
                outputKind: "adjectival-nnc-root-plus-ya",
                generationRoute: "adjectival-nnc",
                diagnostics: ["adjectival-nnc-root-plus-ya-exception"],
            },
            {
                stem: "(weiya)",
                supported: false,
                result: "",
                surfaceForms: [],
                outputKind: "adjectival-nnc-root-plus-ya",
                generationRoute: "adjectival-nnc",
                diagnostics: ["adjectival-nnc-root-plus-ya-exception"],
            },
            {
                stem: "(weyya)",
                supported: false,
                result: "",
                surfaceForms: [],
                outputKind: "adjectival-nnc-root-plus-ya",
                generationRoute: "adjectival-nnc",
                diagnostics: ["adjectival-nnc-root-plus-ya-exception"],
            },
        ]
    );
    s.eq(
        "Adjetivo preterito uses Andrews 40.9 root-plus-ya NNC surface directly",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(istaya)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                result: generated.result,
                surfaceForms: generated.surfaceForms,
                outputKind: generated.outputKind,
                formulaEcho: generated.formulaEcho,
                generationRoute: generated.generationRoute,
                diagnostics: generated.diagnostics,
            };
        })(),
        {
            result: "istak",
            surfaceForms: ["istak"],
            outputKind: "adjectival-nnc-root-plus-ya",
            formulaEcho: "#Ø-Ø(ista)k#",
            generationRoute: "adjectival-nnc",
            diagnostics: [],
        }
    );
    s.eq(
        "Andrews 40.9 route uses repo-backed Nawat root-plus-ya obsolete-preterit surfaces",
        ["kukuya", "seseya", "kwaistaya"].map((stem) => {
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: `(${stem})`,
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "adjetivo-preterito",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                stem,
                result: generated.result,
                formulaEcho: generated.formulaEcho,
                outputKind: generated.outputKind,
            };
        }),
        [
            {
                stem: "kukuya",
                result: "kukuk",
                formulaEcho: "#Ø-Ø(kuku)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
            {
                stem: "seseya",
                result: "sesek",
                formulaEcho: "#Ø-Ø(sese)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
            {
                stem: "kwaistaya",
                result: "kwaistak",
                formulaEcho: "#Ø-Ø(kwaista)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
        ]
    );
    s.eq(
        "Andrews 40.9 denominal tiya sources route through the adjectival NNC surface",
        [
            {
                stem: "itztiya",
                result: "itztik",
                base: "itzti",
                subtype: "denominal-tiya",
            },
            {
                stem: "yektiya",
                result: "yektik",
                base: "yekti",
                subtype: "denominal-tiya",
            },
            {
                stem: "chichiktiya",
                result: "chichiktik",
                base: "chichikti",
                subtype: "denominal-tiya",
            },
            {
                stem: "(e/tiya)",
                result: "etik",
                base: "eti",
                subtype: "segmented-denominal-tiya",
            },
            {
                stem: "(te/tiya)",
                result: "tetik",
                base: "teti",
                subtype: "segmented-denominal-tiya",
            },
            {
                stem: "(kwal/tiya)",
                result: "kwaltik",
                base: "kwalti",
                subtype: "segmented-denominal-tiya",
            },
        ].map(({ stem, result, base, subtype }) => {
            const direct = ctx.generateRootPlusYaAdjectivalNncOutput({ stem });
            const generated = (() => {
                const generated = ctx.executeGenerateWordRequest({
                    posicionesFormula: {
                        pers1: "",
                        obj1: "",
                        tronco: stem.startsWith("(") ? stem : `(${stem})`,
                        pers2: "",
                        num2: "",
                        poseedor: "",

                        tiempo: "adjetivo-preterito",

                        },
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.adjetivo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                        },
                    },
                });
                return {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    outputKind: generated.outputKind,
                    formulaEcho: generated.formulaEcho,
                };
            })();
            return {
                stem,
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    surfaceForms: direct.surfaceForms,
                    formulaEcho: direct.formulaEcho,
                    sourceRootPlusYaBase: direct.rootPlusYaAdjectivalNncFrame?.sourceRootPlusYaBase,
                    sourceFormationSubtype: direct.rootPlusYaAdjectivalNncFrame?.sourceFormationSubtype,
                    slotSubtype: direct.formulaSlots?.predicateStem?.sourceFormationSubtype,
                },
                generated,
            };
        }),
        [
            {
                stem: "itztiya",
                direct: {
                    supported: true,
                    result: "itztik",
                    surfaceForms: ["itztik"],
                    formulaEcho: "#Ø-Ø(itzti)k#",
                    sourceRootPlusYaBase: "itzti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "itztik",
                    surfaceForms: ["itztik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(itzti)k#",
                },
            },
            {
                stem: "yektiya",
                direct: {
                    supported: true,
                    result: "yektik",
                    surfaceForms: ["yektik"],
                    formulaEcho: "#Ø-Ø(yekti)k#",
                    sourceRootPlusYaBase: "yekti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "yektik",
                    surfaceForms: ["yektik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(yekti)k#",
                },
            },
            {
                stem: "chichiktiya",
                direct: {
                    supported: true,
                    result: "chichiktik",
                    surfaceForms: ["chichiktik"],
                    formulaEcho: "#Ø-Ø(chichikti)k#",
                    sourceRootPlusYaBase: "chichikti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "chichiktik",
                    surfaceForms: ["chichiktik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(chichikti)k#",
                },
            },
            {
                stem: "(e/tiya)",
                direct: {
                    supported: true,
                    result: "etik",
                    surfaceForms: ["etik"],
                    formulaEcho: "#Ø-Ø(eti)k#",
                    sourceRootPlusYaBase: "eti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "etik",
                    surfaceForms: ["etik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(eti)k#",
                },
            },
            {
                stem: "(te/tiya)",
                direct: {
                    supported: true,
                    result: "tetik",
                    surfaceForms: ["tetik"],
                    formulaEcho: "#Ø-Ø(teti)k#",
                    sourceRootPlusYaBase: "teti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "tetik",
                    surfaceForms: ["tetik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(teti)k#",
                },
            },
            {
                stem: "(kwal/tiya)",
                direct: {
                    supported: true,
                    result: "kwaltik",
                    surfaceForms: ["kwaltik"],
                    formulaEcho: "#Ø-Ø(kwalti)k#",
                    sourceRootPlusYaBase: "kwalti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "kwaltik",
                    surfaceForms: ["kwaltik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø-Ø(kwalti)k#",
                },
            },
        ]
    );
    s.eq(
        "Andrews 40.10-40.11 source patterns classify c/z-tiya synonym sets without generating sibling forms",
        [
            {
                stem: "chichiktiya",
                result: "chichiktik",
                lessonRef: "Andrews 40.10",
                sourcePattern: "k-ti-ya",
                andrewsSourcePattern: "c-ti-ya",
                synonymSetKind: "pair",
            },
            {
                stem: "xoxoctiya",
                result: "xoxoctik",
                lessonRef: "Andrews 40.10",
                sourcePattern: "k-ti-ya",
                andrewsSourcePattern: "c-ti-ya",
                synonymSetKind: "pair",
            },
            {
                stem: "melaztiya",
                result: "melaztik",
                lessonRef: "Andrews 40.11",
                sourcePattern: "z-ti-ya",
                andrewsSourcePattern: "z-ti-ya",
                synonymSetKind: "triplet",
            },
            {
                stem: "chichiya",
                result: "chichik",
                lessonRef: "Andrews 40.9",
                sourcePattern: "root-plus-ya",
                andrewsSourcePattern: "root-plus-ya",
                synonymSetKind: "none",
            },
        ].map((example) => {
            const direct = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: example.stem });
            return {
                stem: example.stem,
                supported: direct.supported,
                result: direct.result,
                sourceFormationSubtype: direct.rootPlusYaAdjectivalNncFrame?.sourceFormationSubtype,
                sourceFormationFrame: summarizeSourceFormationFrame(
                    direct.rootPlusYaAdjectivalNncFrame?.sourceFormationFrame
                ),
            };
        }),
        [
            {
                stem: "chichiktiya",
                supported: true,
                result: "chichiktik",
                sourceFormationSubtype: "denominal-tiya",
                sourceFormationFrame: {
                    lessonRef: "Andrews 40.10",
                    sourcePattern: "k-ti-ya",
                    andrewsSourcePattern: "c-ti-ya",
                    synonymSetKind: "pair",
                    outputContract: "generate-current-source-only",
                    generatesSiblingSynonymForms: false,
                    doesNotGenerateSiblingForms: true,
                },
            },
            {
                stem: "xoxoctiya",
                supported: true,
                result: "xoxoctik",
                sourceFormationSubtype: "denominal-tiya",
                sourceFormationFrame: {
                    lessonRef: "Andrews 40.10",
                    sourcePattern: "k-ti-ya",
                    andrewsSourcePattern: "c-ti-ya",
                    synonymSetKind: "pair",
                    outputContract: "generate-current-source-only",
                    generatesSiblingSynonymForms: false,
                    doesNotGenerateSiblingForms: true,
                },
            },
            {
                stem: "melaztiya",
                supported: true,
                result: "melaztik",
                sourceFormationSubtype: "denominal-tiya",
                sourceFormationFrame: {
                    lessonRef: "Andrews 40.11",
                    sourcePattern: "z-ti-ya",
                    andrewsSourcePattern: "z-ti-ya",
                    synonymSetKind: "triplet",
                    outputContract: "generate-current-source-only",
                    generatesSiblingSynonymForms: false,
                    doesNotGenerateSiblingForms: true,
                },
            },
            {
                stem: "chichiya",
                supported: true,
                result: "chichik",
                sourceFormationSubtype: "root-plus-ya",
                sourceFormationFrame: {
                    lessonRef: "Andrews 40.9",
                    sourcePattern: "root-plus-ya",
                    andrewsSourcePattern: "root-plus-ya",
                    synonymSetKind: "none",
                    outputContract: "generate-current-source-only",
                    generatesSiblingSynonymForms: false,
                    doesNotGenerateSiblingForms: true,
                },
            },
        ]
    );
    s.eq(
        "Andrews 41.1 intensified adjectival NNC derives from generated formula slots",
        (() => {
            const source = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "yektiya" });
            const direct = ctx.buildIntensifiedAdjectivalNncOutput({
                sourceSurface: source.result,
                sourceFormulaSlots: source.formulaSlots,
                sourceFormulaEcho: source.formulaEcho,
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: source.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "adjectival-nnc-intensified",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "intensified-adjectival",
                            sourceSurface: source.result,
                            sourceFormulaSlots: source.formulaSlots,
                            sourceFormulaEcho: source.formulaEcho,
                        },
                    },
                },
            });
            return {
                source: {
                    result: source.result,
                    formulaEcho: source.formulaEcho,
                },
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    outputKind: direct.outputKind,
                    formulaEcho: direct.formulaEcho,
                    sourceStem: direct.adjectivalNncFunctionFrame.sourcePredicateStem,
                    intensifiedStem: direct.adjectivalNncFunctionFrame.intensifiedStem,
                    lessonRef: direct.adjectivalNncFunctionFrame.lessonRef,
                    reduplicationKind: direct.adjectivalNncFunctionFrame.reduplicationKind,
                    reusesFrequentativeEngine: direct.adjectivalNncFunctionFrame.reusesFrequentativeEngine,
                    hasModificationAst: direct.adjectivalNncFunctionFrame.hasModificationAst,
                },
                routed: {
                    supported: routed.supported,
                    result: routed.result,
                    surfaceForms: routed.surfaceForms,
                    outputKind: routed.outputKind,
                    formulaEcho: routed.formulaEcho,
                    shellFormulaEcho: routed.nuclearClauseShell?.formulaEcho || "",
                    shellFormulaType: routed.nuclearClauseShell?.formulaType || "",
                },
            };
        })(),
        {
            source: {
                result: "yektik",
                formulaEcho: "#Ø-Ø(yekti)k#",
            },
            direct: {
                supported: true,
                result: "yejyektik",
                outputKind: "adjectival-nnc-intensified",
                formulaEcho: "#Ø-Ø(yejyekti)k#",
                sourceStem: "yekti",
                intensifiedStem: "yejyekti",
                lessonRef: "Andrews 41.1",
                reduplicationKind: "adjectival-intensification",
                reusesFrequentativeEngine: false,
                hasModificationAst: false,
            },
            routed: {
                supported: true,
                result: "yejyektik",
                surfaceForms: ["yejyektik"],
                outputKind: "adjectival-nnc-intensified",
                formulaEcho: "#Ø-Ø(yejyekti)k#",
                shellFormulaEcho: "#Ø-Ø(yejyekti)k#",
                shellFormulaType: "NNC",
            },
        }
    );
    s.eq(
        "Andrews 41.1 intensified adjectival UI promotion reuses source formula slots without double reduplication",
        (() => {
            const source = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "yektiya" });
            const direct = ctx.buildIntensifiedAdjectivalNncOutput({
                sourceSurface: source.result,
                sourceFormulaSlots: source.formulaSlots,
                sourceFormulaEcho: source.formulaEcho,
            });
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const verbEl = ctx.document.getElementById("verb");
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            const entryContract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: direct.result,
                formation: "intensified-adjectival",
                formulaEcho: source.formulaEcho || "",
                sourceFormulaSlots: source.formulaSlots,
                sourceFormulaEcho: source.formulaEcho || "",
                grammarFrame: direct.grammarFrame,
                refresh: false,
            });
            const override = ctx.resolveAdjectivalNncFunctionOverrideFromInput(verbEl);
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: direct.result,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "adjectival-nnc-intensified",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override,
                },
            });
            const summary = {
                entrySurface: entryContract?.surface || "",
                entrySourceFormulaEcho: entryContract?.sourceFormulaEcho || "",
                overrideFormation: override?.adjectivalNnc?.formation || "",
                overrideTargetSurface: override?.posicionesFormula?.tronco || "",
                overrideSourceFormulaEcho: override?.adjectivalNnc?.sourceFormulaEcho || "",
                overrideSourcePredicateStem: override?.adjectivalNnc?.sourceFormulaSlots?.predicateStem?.stem || "",
                routedResult: routed.result,
                routedFormulaEcho: routed.formulaEcho,
                routedSourceStem: routed.adjectivalNncFunctionFrame?.sourcePredicateStem || "",
                routedIntensifiedStem: routed.adjectivalNncFunctionFrame?.intensifiedStem || "",
            };
            if (typeof ctx.clearAdjectivalNncFunctionEntryState === "function") {
                ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode);
            }
            return summary;
        })(),
        {
            entrySurface: "yejyektik",
            entrySourceFormulaEcho: "#Ø-Ø(yekti)k#",
            overrideFormation: "intensified-adjectival",
            overrideTargetSurface: "yejyektik",
            overrideSourceFormulaEcho: "#Ø-Ø(yekti)k#",
            overrideSourcePredicateStem: "yekti",
            routedResult: "yejyektik",
            routedFormulaEcho: "#Ø-Ø(yejyekti)k#",
            routedSourceStem: "yekti",
            routedIntensifiedStem: "yejyekti",
        }
    );
    s.eq(
        "Andrews 41.1 intensified adjectival route rejects source surfaces without formula slots",
        ctx.buildIntensifiedAdjectivalNncOutput({
            sourceSurface: "yektik",
        }).diagnostics.map((item) => item.id),
        ["adjectival-nnc-requires-formula-slots"]
    );

    return s;
}

function summarizeSourceFormationFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        lessonRef: frame.lessonRef || "",
        sourcePattern: frame.sourcePattern || "",
        andrewsSourcePattern: frame.andrewsSourcePattern || "",
        synonymSetKind: frame.synonymSetKind || "",
        outputContract: frame.outputContract || "",
        generatesSiblingSynonymForms: frame.generatesSiblingSynonymForms === true,
        doesNotGenerateSiblingForms: frame.doesNotGenerateSiblingForms === true,
    };
}

function directFormulaSlots(stem, nounClass) {
    return {
        pers1Pers2: {
            role: "subject-person",
            slot: "pers1-pers2",
            prefix: "",
            suffix: "",
            displayPrefix: "Ø",
            displaySuffix: "Ø",
            label: "3sg",
        },
        predicateStem: {
            role: "predicate",
            slot: "STEM",
            stem,
            state: "absolutive",
        },
        num1Num2: {
            role: "subject-number-connector",
            slot: "num1-num2",
            nounClass,
            connector: nounClass === "zero" ? "Ø" : nounClass,
            surface: nounClass === "zero" ? "" : nounClass,
            label: "subject number connector",
            belongsTo: "subject",
            referenceNumber: "singular",
            pluralType: "",
        },
    };
}

module.exports = { run };
