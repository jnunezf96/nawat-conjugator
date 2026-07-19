"use strict";

/**
 * Tests for src/core/nnc/relational/relational.mjs
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_relational");

    s.eq(
        "Lessons 45-47 relational NNC API is exported",
        [
            typeof ctx.buildRelationalNncBoundaryMetadata,
            typeof ctx.classifyRelationalNncCandidate,
            typeof ctx.classifyRelationalNncFalsePositive,
            typeof ctx.buildRelationalNncUsageFrame,
            typeof ctx.getRelationalNncAntiConflationRules,
            typeof ctx.buildLesson45RelationalNncPursuitFrame,
            typeof ctx.getLesson45RelationalNncSubsectionInventory,
            typeof ctx.buildLesson46RelationalNncPursuitFrame,
            typeof ctx.getLesson46RelationalNncSubsectionInventory,
            typeof ctx.buildLesson46PreteritAgentiveLocativeNncFromSource,
            typeof ctx.buildLesson47RelationalNncPursuitFrame,
            typeof ctx.getLesson47RelationalNncSubsectionInventory,
            typeof ctx.buildRelationalNncSourceFrame,
            typeof ctx.buildRelationalNncOperationFrame,
            typeof ctx.getRelationalNncOperationFrameMismatch,
            typeof ctx.buildLesson4631aPreteritAgentiveLocativeSourceFrame,
            typeof ctx.buildLesson4631aPreteritAgentiveLocativeOperationFrame,
            typeof ctx.getLesson4631aPreteritAgentiveLocativeFrameMismatch,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildRelationalNncBoundaryMetadata();
    const buildLesson4631aTypedFrames = (options = {}) => {
        const sourceFrame = ctx.buildLesson4631aPreteritAgentiveLocativeSourceFrame({
            sourceVerbStem: "namaka",
            incorporatedNounStem: "mich",
            sourcePreparationRequired: true,
            ...options,
        });
        return {
            sourceFrame,
            operationFrame: ctx.buildLesson4631aPreteritAgentiveLocativeOperationFrame(sourceFrame),
        };
    };
    s.eq(
        "relational NNC boundary is explicit and non-generative",
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
            kind: "relational-nnc-boundary",
            lessons: [45, 46, 47],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasRelationalNncUsageFrame: true,
                hasRelationalNncGeneration: false,
                hasStaticRelationalData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesNominalizationGeneration: false,
                changesRouteBehavior: false,
                treatsTranslationAsRelationalEvidence: false,
            },
            questionFields: [
                "relationalStem",
                "relationalKind",
                "relationalOption",
                "governedArgument",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized relational category remains blocked without Andrews source gate",
        ctx.classifyRelationalNncCandidate({
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "2",
            governedArgument: "unknown",
            falsePositiveSource: "preposition-translation",
        }),
        {
            kind: "relational-nnc-candidate-classification",
            version: 1,
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "option-two",
            governedArgument: "unknown",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "preposition-translation",
            sourceKind: "",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "relational-nnc-source-gate-required",
                "relational-nnc-kind-recognized",
                "relational-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "relational classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyRelationalNncCandidate({
                candidate: "place translation",
                relationalStem: "unknown",
                relationalKind: "locative",
                relationalOption: "2",
                falsePositiveSource: "preposition-translation",
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
            unitKind: "relational-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "relational-nounstem-candidate",
            diagnosticId: "relational-nnc-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews relational NNC candidate generates through orthography bridge",
        (() => {
            const formulaSlots = Object.freeze({
                relationalStem: Object.freeze({ slot: "relational-stem", structural: "i-c", surface: "ik" }),
            });
            const sourceFrame = ctx.buildRelationalNncSourceFrame({
                candidate: "i-c",
                relationalStem: "ic",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "third-person possessor",
                sourceGate: "Andrews 45.4.4 ic option-one relational route",
                sourceKind: "option-one-simple-possessive",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "relational-stem", role: "relational-nounstem", formulaValue: "i-c", surface: "ik" },
                ],
            });
            const operationFrame = ctx.buildRelationalNncOperationFrame(sourceFrame);
            const classification = ctx.classifyRelationalNncCandidate({
                candidate: "lying-candidate",
                relationalStem: "lying-stem",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "lying argument",
                sourceGate: "lying gate",
                structuredSource: true,
                sourceKind: "option-one-simple-possessive",
                sourceFrame,
                operationFrame,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                operationId: classification.operationFrame.operationId,
                formulaStem: classification.formulaSlots.relationalStem.surface,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                sourceGate: classification.frames.stemFrame.sourceGate,
            };
        })(),
        {
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "ik",
            operationId: "andrews-45-47-relational-nnc-realization",
            formulaStem: "ik",
            diagnostics: [
                "relational-nnc-andrews-source-generated",
                "relational-nnc-kind-recognized",
                "relational-nnc-structured-source",
            ],
            routeStage: "generate-structured-relational-nnc",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            sourceGate: "Andrews 45.4.4 ic option-one relational route",
        }
    );
    s.eq(
        "relational NNC candidate blocks legacy string gates and contradictory frames",
        (() => {
            const formulaSlots = Object.freeze({
                relationalStem: Object.freeze({ slot: "relational-stem", structural: "i-c", surface: "ik" }),
            });
            const sourceFrame = ctx.buildRelationalNncSourceFrame({
                candidate: "i-c",
                relationalStem: "ic",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "third-person possessor",
                sourceGate: "Andrews 45.4.4 ic option-one relational route",
                sourceKind: "option-one-simple-possessive",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "relational-stem", role: "relational-nounstem", formulaValue: "i-c", surface: "ik" },
                ],
            });
            const operationFrame = ctx.buildRelationalNncOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildRelationalNncSourceFrame({
                candidate: "i-pan",
                relationalStem: "ipan",
                relationalKind: "locative",
                relationalOption: "2",
                governedArgument: "third-person place",
                sourceGate: "Andrews 46 locative relational route",
                sourceKind: "option-two-locative",
                targetFormulaSlots: Object.freeze({
                    relationalStem: Object.freeze({ slot: "relational-stem", structural: "i-pan", surface: "ipan" }),
                }),
                targetSegmentFrames: [
                    { slot: "relational-stem", role: "locative-relational-nounstem", formulaValue: "i-pan", surface: "ipan" },
                ],
            });
            const otherOperationFrame = ctx.buildRelationalNncOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizeRelationalNncCandidateSurface;
            if (typeof ctx.normalizeRelationalNncCandidateSurface === "function") {
                ctx.normalizeRelationalNncCandidateSurface = () => "poison";
            }
            const poisoned = ctx.classifyRelationalNncCandidate({
                candidate: "poison",
                relationalStem: "poison",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "poison",
                sourceGate: "poison",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizeRelationalNncCandidateSurface = originalNormalizer;
            }
            const stringOnly = ctx.classifyRelationalNncCandidate({
                candidate: "i-c",
                relationalStem: "ic",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "third-person possessor",
                sourceGate: "Andrews 45.4.4 ic option-one relational route",
                structuredSource: true,
            });
            const missingOperation = ctx.classifyRelationalNncCandidate({
                candidate: "i-c",
                relationalStem: "ic",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "third-person possessor",
                sourceGate: "Andrews 45.4.4 ic option-one relational route",
                structuredSource: true,
                sourceFrame,
            });
            const contradictory = ctx.classifyRelationalNncCandidate({
                candidate: "i-c",
                relationalStem: "ic",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "third-person possessor",
                sourceGate: "Andrews 45.4.4 ic option-one relational route",
                structuredSource: true,
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyRelationalNncCandidate({
                candidate: "changed",
                relationalStem: "changed",
                relationalKind: "relational-stem",
                relationalOption: "1",
                governedArgument: "changed",
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
                surface: "ik",
                targetStem: "ik",
            },
            stringOnly: {
                generationAllowed: false,
                surface: "",
                diagnostics: [
                    "relational-nnc-source-frame-required",
                    "relational-nnc-kind-recognized",
                    "relational-nnc-unconfirmed",
                ],
            },
            missingOperation: [
                "relational-nnc-operation-frame-required",
                "relational-nnc-kind-recognized",
                "relational-nnc-unconfirmed",
            ],
            contradictory: [
                "relational-nnc-contradictory-source-frame",
                "relational-nnc-kind-recognized",
                "relational-nnc-unconfirmed",
            ],
            changedStrings: {
                surface: "ik",
                targetStem: "ik",
            },
        }
    );

    s.eq(
        "locative-temporal nominal output is classified as false positive relational evidence",
        ctx.classifyRelationalNncFalsePositive("locative-temporal-nominal"),
        {
            kind: "relational-nnc-false-positive",
            version: 1,
            source: "locative-temporal-nominal",
            isRelationalNncEvidence: false,
            isPlaceNameEvidence: false,
            isGentilicEvidence: false,
            generationAllowed: false,
            diagnostics: ["relational-nnc-false-positive-source"],
            antiConflationRules: ctx.getRelationalNncAntiConflationRules(),
        }
    );

    s.eq(
        "relational NNC metadata carries anti-conflation rules",
        ctx.getRelationalNncAntiConflationRules(),
        [
            "relational NNC boundary metadata is not generation",
            "ordinary NNC fixtures are not relational NNC fixture evidence",
            "open-stem ordinary NNC previews are not relational nounstem data",
            "locative-temporal nominal outputs are not full relational NNC options",
            "preposition or place translations are not orthography-bridge relational form evidence",
            "Andrews relational categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    s.no("relational NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("relational NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    s.eq(
        "Lesson 45 pursuit frame covers every Andrews relational part-one subsection",
        (() => {
            const inventory = ctx.getLesson45RelationalNncSubsectionInventory();
            const frame = ctx.buildLesson45RelationalNncPursuitFrame();
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
                remainingGapsMentionSourceGate: frame.remainingGaps.some((gap) => /Andrews relational source models plus the orthography bridge/.test(gap)),
            };
        })(),
        {
            kind: "lesson-45-relational-nnc-pursuit-frame",
            stepNumber: 45,
            routeStage: "audit-lesson-45",
            pdfRefCount: 8,
            firstPdfRef: "Andrews Lesson 45.1",
            lastPdfRef: "Andrews Lesson 45.4.4",
            subsectionCount: 16,
            subsectionRefs: [
                "45.1",
                "45.1 relational nounstems",
                "45.1 high-generality",
                "45.1 note",
                "45.2 option 1",
                "45.2 option 2",
                "45.2 option 3",
                "45.2 option 4",
                "45.3",
                "45.4",
                "45.4.1",
                "45.4.2",
                "45.4.3",
                "45.4.4 a-c",
                "45.4.4.d",
                "45.4.4.e",
            ],
            plannedArrowIds: ["lesson-45-relational-nnc-audit"],
            firedArrowIds: [["lesson-45-relational-nnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionSourceGate: true,
        }
    );
    s.eq(
        "Lesson 45 frame records no-preposition warnings, option architecture, and ic boundaries",
        (() => {
            const frame = ctx.buildLesson45RelationalNncPursuitFrame();
            return {
                noPrepositions: frame.noPrepositionsFrame.nahuatlHasNoPrepositions,
                noPostpositions: frame.noPrepositionsFrame.nahuatlHasNoPostpositions,
                translationNoMorphology: frame.noPrepositionsFrame.prepositionTranslationHasNoMorphologicalCounterpart,
                locativeRoles: frame.noPrepositionsFrame.locativeStemContextRoles,
                optionOneState: frame.usageOptionsFrame.optionOneFrame.state,
                optionTwoStates: frame.usageOptionsFrame.optionTwoFrame.states,
                optionThreeLinked: frame.usageOptionsFrame.optionThreeFrame.connectiveHasLinkingAndSeparatingFunction,
                optionFourEmbed: frame.usageOptionsFrame.optionFourFrame.simpleOrCompoundRelationalNounstemCanFillEmbed,
                groupCount: frame.groupingsFrame.groups.length,
                optionOneOnly: frame.optionOneStemsFrame.onlySingleStemmedPossessiveStateNncs,
                secondNncSupplementaryOnly: frame.optionOneStemsFrame.secondNncMayCombineOnlyAsSupplementaryPossessor,
                stemCount: frame.optionOneStemsFrame.stems.length,
                ihuanNotConjunctor: frame.optionOneStemsFrame.stems[0].ihuanInNumeralGroupsIsNotConjunctor,
                icOnlyThirdCommon: frame.icFrame.onlyThirdPersonCommonNumberPossessor,
                icFunctions: frame.icFrame.functions,
                icTimeQuestion: frame.icFrame.timeFrame.sentenceInitialMayAskWhen,
                icSpecialOrdinal: frame.icFrame.specialUsesFrame.beforeNumeralOrQuantitiveCreatesOrdinalEquivalent,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            noPrepositions: true,
            noPostpositions: true,
            translationNoMorphology: true,
            locativeRoles: ["locale", "source", "goal", "path"],
            optionOneState: "possessive",
            optionTwoStates: ["absolutive", "possessive"],
            optionThreeLinked: true,
            optionFourEmbed: true,
            groupCount: 5,
            optionOneOnly: true,
            secondNncSupplementaryOnly: true,
            stemCount: 4,
            ihuanNotConjunctor: true,
            icOnlyThirdCommon: true,
            icFunctions: ["means", "purpose", "reason", "time", "special-uses"],
            icTimeQuestion: true,
            icSpecialOrdinal: true,
            generationBoundary: {
                relationalNncBoundaryMetadataImplemented: true,
                relationalNncUsageFrameImplemented: true,
                optionOneStateGateImplemented: true,
                optionTwoStateMetadataImplemented: true,
                optionThreeMetadataDiagnosticOnly: true,
                optionFourMetadataDiagnosticOnly: true,
                noPrepositionWarningDiagnosticOnly: true,
                optionGroupingsDiagnosticOnly: true,
                optionOneOnlyStemInventoryDiagnosticOnly: true,
                icFunctionInventoryDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticRelationalDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson45GenerationImplemented: false,
            },
            grammarRouteStage: "audit-lesson-45",
            diagnosticIds: ["relational-nnc-lesson-45-diagnostic-partial", "relational-nnc-source-gated"],
        }
    );

    s.eq(
        "Lesson 46 pursuit frame covers every Andrews relational part-two subsection",
        (() => {
            const inventory = ctx.getLesson46RelationalNncSubsectionInventory();
            const frame = ctx.buildLesson46RelationalNncPursuitFrame();
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
                remainingGapsMentionOrthography: frame.remainingGaps.some((gap) => /ortogr[aá]f|orthography|spelling/i.test(gap)),
            };
        })(),
        {
            kind: "lesson-46-relational-nnc-pursuit-frame",
            stepNumber: 46,
            routeStage: "audit-lesson-46",
            pdfRefCount: 15,
            firstPdfRef: "Andrews Lesson 46.1",
            lastPdfRef: "Andrews Lesson 46.15",
            subsectionCount: 23,
            subsectionRefs: [
                "46.1",
                "46.2",
                "46.3",
                "46.3.1.a",
                "46.3.1.b",
                "46.3.2.a",
                "46.3.2.b",
                "46.4",
                "46.4.1",
                "46.4.2",
                "46.4.3",
                "46.5",
                "46.6",
                "46.7",
                "46.8",
                "46.9",
                "46.10",
                "46.11",
                "46.12.1",
                "46.12.2",
                "46.13",
                "46.14",
                "46.15",
            ],
            plannedArrowIds: ["lesson-46-relational-nnc-audit"],
            firedArrowIds: [
                ["lesson-46-relational-nnc-audit", "hit"],
                ["lesson-46-3-1-a-preterit-agentive-locative-source-route", "hit"],
            ],
            hitCount: 2,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionOrthography: true,
        }
    );
    s.eq(
        "Lesson 46 frame records option-two-only stems, source-state rules, and context warnings",
        (() => {
            const frame = ctx.buildLesson46RelationalNncPursuitFrame();
            return {
                optionGroup: frame.optionTwoOnlyFrame.optionGroup,
                matrixOnlyCount: frame.optionTwoOnlyFrame.matrixOnlyStemCount,
                stemKeys: frame.optionTwoOnlyFrame.stemKeys,
                locativeFormations: frame.locativeNFrame.formations.map((formation) => formation.id),
                caNPatterns: frame.caNEmbedFrame.patterns.map((pattern) => pattern.id),
                canLosesInterrogative: frame.caNEmbedFrame.patterns[2].nonInitialLosesInterrogativeForce,
                activeNormalState: frame.imperfectEmbedFrame.activeVoiceFrame.normalState,
                passiveOnly: frame.imperfectEmbedFrame.passiveVoiceFrame.possessiveStateOnly,
                impersonalOnly: frame.imperfectEmbedFrame.impersonalVoiceFrame.absolutiveStateOnly,
                matrixFrameStemKeys: frame.matrixStemsFrame.stems.map((stem) => stem.stemKey),
                coCWarning: frame.matrixStemsFrame.stems[2].bodyPartCombinationsAreEmbedPlusMatrixNotCompoundPrepositions,
                paDirectionalEmbeds: frame.matrixStemsFrame.stems[4].embeds,
                paFrequencyQuantitiveOnly: frame.matrixStemsFrame.stems[5].embedsOnlyQuantitiveOrNumeralNounstems,
                sentenceInference: frame.exampleSentenceFrame.translationPrepositionMustBeInferredFromContext,
                generationBoundary: frame.currentEngineBoundary,
                orthographySlotScoped: frame.frames?.orthographyFrame?.slotScopedOrthographyRequiredBeforeVisibleNawatSurface,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            optionGroup: "option-two-only",
            matrixOnlyCount: 11,
            stemKeys: [
                "n-locative-place",
                "yan-locative",
                "tlah-abundance-place",
                "co-c-specific-location",
                "ca-interval-distance",
                "pa-directional",
                "pa-frequency",
                "nal-far-bank",
                "chi-direction-toward",
                "ic-downward-direction",
                "teuh-similarity-manner",
            ],
            locativeFormations: ["ca-embed", "imperfect-ya-embed"],
            caNPatterns: [
                "preterit-agentive-embed",
                "active-action-embed",
                "can-interrogative-place",
                "x-plus-can-incorporated-modifier",
            ],
            canLosesInterrogative: true,
            activeNormalState: "possessive",
            passiveOnly: true,
            impersonalOnly: true,
            matrixFrameStemKeys: [
                "yan-locative",
                "tlah-abundance-place",
                "co-c-specific-location",
                "ca-interval-distance",
                "pa-directional",
                "pa-frequency",
                "nal-far-bank",
                "chi-direction-toward",
                "ic-downward-direction",
                "teuh-similarity-manner",
            ],
            coCWarning: true,
            paDirectionalEmbeds: ["particles", "nounstems", "relational compounds", "numeral stems in ca-m-pa"],
            paFrequencyQuantitiveOnly: true,
            sentenceInference: true,
            generationBoundary: {
                relationalNncBoundaryMetadataImplemented: true,
                relationalNncUsageFrameImplemented: true,
                lesson45UsageOptionsImplemented: true,
                optionTwoOnlyGroupDiagnosticOnly: true,
                matrixOnlyStemInventoryDiagnosticOnly: true,
                locativeNFormationsDiagnosticOnly: true,
                sourceVoiceStateRulesDiagnosticOnly: true,
                bodyPartCoCWarningDiagnosticOnly: true,
                directionalFrequencyPaSplitDiagnosticOnly: true,
                sentenceContextInferenceDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticRelationalDataImplemented: false,
                newWordGenerationAllowed: false,
                scopedLesson4631aPreteritAgentiveLocativeSourceRouteImplemented: true,
                scopedLesson4631aPreteritAgentiveLocativeGenerationAllowed: true,
                fullLesson46GenerationImplemented: false,
            },
            orthographySlotScoped: true,
            grammarRouteStage: "audit-lesson-46",
            diagnosticIds: ["relational-nnc-lesson-46-diagnostic-partial", "relational-nnc-source-gated"],
        }
    );
    s.eq(
        "Lesson 46.3 route-family graph keeps reusable nodes and both CNN branches",
        (() => {
            const { sourceFrame, operationFrame } = buildLesson4631aTypedFrames();
            const sourceAnalysis = {
                sourceVerbStem: sourceFrame.sourceVerbStem,
                incorporatedStemValue: sourceFrame.incorporatedNounStem,
                visibleSourceFormula: sourceFrame.visibleSourceFormula,
                sourceVncFormula: sourceFrame.sourceVncFormula,
                preteritPredicateFormula: sourceFrame.preteritPredicateFormula,
                preteritAgentiveStemFormula: sourceFrame.preteritAgentiveStemFormula,
                finalRouteImmediateSourceFormula: sourceFrame.finalRouteImmediateSourceFormula,
                sourceKind: sourceFrame.sourceKind,
                visibleSourceKind: sourceFrame.visibleSourceKind,
                sourcePreparationRequired: sourceFrame.sourcePreparationRequired,
            };
            const graph = ctx.buildLesson463RouteFamilyGraph({
                sourceAnalysis,
                incorporatedNounStem: sourceFrame.incorporatedNounStem,
                sourceVerbStem: sourceFrame.sourceVerbStem,
                operationFrame,
            });
            return {
                familyId: graph.familyId,
                graphSourceOfTruth: graph.graphSourceOfTruth,
                selectedRouteId: graph.selectedRouteId,
                selectedBranchId: graph.selectedBranchId,
                routePatternIds: graph.nodes
                    .filter((node) => node.unitKind === "route-pattern")
                    .map((node) => node.id),
                reusableNodeIds: graph.nodes
                    .filter((node) => node.reusableAsSource)
                    .map((node) => node.id),
                branchSummaries: graph.branches.map((branch) => ({
                    id: branch.id,
                    formula: branch.formula,
                    selected: branch.selected,
                    allowedByAndrews: branch.allowedByAndrews,
                    generationAllowed: branch.generationAllowed,
                    actionKind: branch.branchAction?.actionKind || "",
                    actionSource: branch.branchAction?.sourceVerb || "",
                    targetUnitKind: branch.branchAction?.targetUnitKind || "",
                    targetFormula: branch.branchAction?.targetFormula || "",
                    requiresExplicitSubjectNumber: branch.branchAction?.requiresExplicitSubjectNumber === true,
                })),
                routeEdges: graph.edges
                    .filter((edge) => [
                        "source-visible",
                        "build-preterit-predicate",
                        "build-preterit-agentive-general-use-stem",
                        "gate-46-3-1-a-immediate-source",
                        "add-locative-relational-n",
                        "adverbialize-zero-connector",
                        "realize-surface",
                    ].includes(edge.id))
                    .map((edge) => `${edge.id}:${edge.sourceNodeId}>${edge.targetNodeId}`),
                ruleTrace: graph.ruleTrace.map((rule) => [
                    rule.id,
                    rule.sourceGate,
                    rule.sourceNodeId,
                    rule.targetNodeId,
                    rule.selected === true ? "selected" : "available",
                    rule.generationAllowed === false ? "blocked" : "",
                ].join(">")),
                invariants: graph.invariants,
            };
        })(),
        {
            familyId: "andrews-46.3-ca-n-locative",
            graphSourceOfTruth: true,
            selectedRouteId: "46.3.1.a",
            selectedBranchId: "adverbialized-cnn",
            routePatternIds: ["46.3.1", "46.3.1.a", "46.3.1.b", "46.3.2.a", "46.3.2.b"],
            reusableNodeIds: [
                "source-cnv-core",
                "preterit-predicate",
                "preterit-agentive-general-use-stem",
                "locative-compound-nounstem",
            ],
            branchSummaries: [
                {
                    id: "normal-cnn",
                    formula: "#pers1-pers2(mich-namaka-0-ka-n)num1-num2#",
                    selected: false,
                    allowedByAndrews: true,
                    generationAllowed: false,
                    actionKind: "select-route-branch-source",
                    actionSource: "(mich-namaka-0-ka-n)",
                    targetUnitKind: "nominal-nuclear-clause",
                    targetFormula: "#pers1-pers2(mich-namaka-0-ka-n)num1-num2#",
                    requiresExplicitSubjectNumber: true,
                },
                {
                    id: "adverbialized-cnn",
                    formula: "(mich-namaka-0-ka-n)-0-",
                    selected: true,
                    allowedByAndrews: true,
                    generationAllowed: true,
                    actionKind: "select-route-branch-source",
                    actionSource: "(mich-namaka-0-ka-n)",
                    targetUnitKind: "adverbialized-nominal-nuclear-clause",
                    targetFormula: "(mich-namaka-0-ka-n)-0-",
                    requiresExplicitSubjectNumber: false,
                },
            ],
            routeEdges: [
                "source-visible:46.3.1.a>source-cnv-core",
                "build-preterit-predicate:source-cnv-core>preterit-predicate",
                "build-preterit-agentive-general-use-stem:preterit-predicate>preterit-agentive-general-use-stem",
                "gate-46-3-1-a-immediate-source:46.3.1.a>preterit-agentive-general-use-stem",
                "add-locative-relational-n:preterit-agentive-general-use-stem>locative-compound-nounstem",
                "adverbialize-zero-connector:locative-compound-nounstem>adverbialized-cnn-output",
                "realize-surface:adverbialized-cnn-output>surface-output",
            ],
            ruleTrace: [
                "if-source-cnv-then-preterit-predicate>source-vnc-core>source-cnv-core>preterit-predicate>selected>",
                "if-preterit-predicate-then-agentive-ka>vnc-predicate>preterit-predicate>preterit-agentive-general-use-stem>selected>",
                "if-preterit-agentive-then-locative-n>preterit-agentive-general-use-stem>preterit-agentive-general-use-stem>locative-compound-nounstem>selected>",
                "if-locative-nounstem-then-normal-cnn-branch>compound-nounstem>locative-compound-nounstem>normal-cnn-output>available>blocked",
                "if-locative-nounstem-then-adverbial-zero>compound-nounstem>locative-compound-nounstem>adverbialized-cnn-output>selected>",
                "if-adverbial-formula-then-surface>adverbialized-nominal-nuclear-clause>adverbialized-cnn-output>surface-output>selected>",
            ],
            invariants: {
                finalSurfaceIsNotSource: true,
                selectedOutputIsNotWholeRouteFamily: true,
                intermediateNodesReusableAsSources: true,
                unselectedAndrewsBranchesRemainRepresented: true,
                currentConjugatorRowsAreRenderersOnly: true,
            },
        }
    );

    s.eq(
        "Lesson 46.3.1.a derives the Nawat-letter locative from source -(namaka) plus mich",
        (() => {
            const { sourceFrame, operationFrame } = buildLesson4631aTypedFrames();
            const generated = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                sourceVerb: "poison",
                incorporatedNounStem: "poison",
                sourceFrame,
                operationFrame,
            });
            return {
                kind: generated.kind,
                andrewsSection: generated.andrewsSection,
                sourceInput: generated.sourceInput,
                sourceVerb: generated.sourceVerb,
                sourceKind: generated.sourceKind,
                visibleSourceKind: generated.visibleSourceKind,
                sourcePreparationRequired: generated.sourcePreparationRequired,
                immediateSourceFormula: generated.routeContract.immediateSourceFormula,
                incorporatedNounStem: generated.incorporatedNounStem,
                sourceWasFinishedSurface: generated.routeContract.sourceWasFinishedSurface,
                routeSteps: generated.routeContract.routeSteps.map((step) => step.id),
                routeRuleTrace: generated.routeContract.ruleTrace.map((rule) => rule.id),
                topLevelRuleTrace: generated.ruleTrace.map((rule) => rule.id),
                routeFamilyId: generated.routeFamilyGraph.familyId,
                routeGraphBranches: generated.routeFamilyGraph.branches.map((branch) => branch.id),
                normalCnnFormula: generated.routeFamilyGraph.branches.find((branch) => branch.id === "normal-cnn")?.formula || "",
                formulaShape: generated.formulaShape,
                formulaStem: generated.formulaStem,
                formulaEcho: generated.formulaEcho,
                surface: generated.surface,
                result: generated.result,
                surfaceForms: generated.surfaceForms,
                generationAllowed: generated.generationAllowed,
                supported: generated.supported,
                ok: generated.ok,
                routeStage: generated.routeStage,
                frameRouteStage: generated.frames.routeContract.routeStage,
                frameGenerationAllowed: generated.frames.routeContract.generationAllowed,
                frameSourceVerb: generated.frames.routeContract.sourceContract.sourceVerb,
                frameIncorporatedStem: generated.frames.routeContract.sourceContract.incorporatedNounStem,
                frameRuleTrace: generated.frames.routeContract.targetContract.ruleTrace.map((rule) => rule.id),
                frameFormulaStem: generated.frames.routeContract.targetContract.formulaStem,
                operationId: generated.operationFrame.operationId,
                diagnosticIds: generated.contractDiagnostics.map((entry) => entry.id),
            };
        })(),
        {
            kind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
            andrewsSection: "46.3.1.a",
            sourceInput: "poison",
            sourceVerb: "namaka",
            sourceKind: "preterit-agentive-general-use-stem",
            visibleSourceKind: "source-vnc-core",
            sourcePreparationRequired: true,
            immediateSourceFormula: "(mich-namaka-0-ka)",
            incorporatedNounStem: "mich",
            sourceWasFinishedSurface: false,
            routeSteps: [
                "source-visible",
                "build-preterit-predicate",
                "build-preterit-agentive-general-use-stem",
                "gate-46-3-1-a-immediate-source",
                "add-locative-relational-n",
                "adverbialize-zero-connector",
                "realize-surface",
            ],
            routeRuleTrace: [
                "if-source-cnv-then-preterit-predicate",
                "if-preterit-predicate-then-agentive-ka",
                "if-preterit-agentive-then-locative-n",
                "if-locative-nounstem-then-normal-cnn-branch",
                "if-locative-nounstem-then-adverbial-zero",
                "if-adverbial-formula-then-surface",
            ],
            topLevelRuleTrace: [
                "if-source-cnv-then-preterit-predicate",
                "if-preterit-predicate-then-agentive-ka",
                "if-preterit-agentive-then-locative-n",
                "if-locative-nounstem-then-normal-cnn-branch",
                "if-locative-nounstem-then-adverbial-zero",
                "if-adverbial-formula-then-surface",
            ],
            routeFamilyId: "andrews-46.3-ca-n-locative",
            routeGraphBranches: ["normal-cnn", "adverbialized-cnn"],
            normalCnnFormula: "#pers1-pers2(mich-namaka-0-ka-n)num1-num2#",
            formulaShape: "(X-ka)+(-n)-0",
            formulaStem: "(mich-namaka-0-ka-n)-0-",
            formulaEcho: "#Ø-Ø(mich-namaka-0-ka-n)Ø#",
            surface: "michnamakakan",
            result: "michnamakakan",
            surfaceForms: ["michnamakakan"],
            generationAllowed: true,
            supported: true,
            ok: true,
            routeStage: "generate-lesson-46-3-1-a",
            frameRouteStage: "generate-lesson-46-3-1-a",
            frameGenerationAllowed: true,
            frameSourceVerb: "namaka",
            frameIncorporatedStem: "mich",
            frameRuleTrace: [
                "if-source-cnv-then-preterit-predicate",
                "if-preterit-predicate-then-agentive-ka",
                "if-preterit-agentive-then-locative-n",
                "if-locative-nounstem-then-normal-cnn-branch",
                "if-locative-nounstem-then-adverbial-zero",
                "if-adverbial-formula-then-surface",
            ],
            frameFormulaStem: "(mich-namaka-0-ka-n)-0-",
            operationId: "andrews-46-3-1-a-preterit-agentive-locative-realization",
            diagnosticIds: [
                "lesson-46-3-1-a-source-route-generated",
                "lesson-46-3-1-a-typed-operation-realization",
            ],
        }
    );
    s.eq(
        "Lesson 46.3.1.a blocks a single embedded source formula without typed frames",
        (() => {
            const generated = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                source: "(mich-namaka)",
            });
            return {
                sourceInput: generated.sourceInput,
                sourceVerb: generated.sourceVerb,
                incorporatedNounStem: generated.incorporatedNounStem,
                formulaStem: generated.formulaStem,
                surface: generated.surface,
                result: generated.result,
                generationAllowed: generated.generationAllowed,
                supported: generated.supported,
                diagnosticIds: generated.contractDiagnostics.map((entry) => entry.id),
            };
        })(),
        {
            sourceInput: "(mich-namaka)",
            sourceVerb: "",
            incorporatedNounStem: "",
            formulaStem: undefined,
            surface: "",
            result: "—",
            generationAllowed: false,
            supported: false,
            diagnosticIds: ["lesson-46-3-1-a-source-frame-required"],
        }
    );
    s.eq(
        "Lesson 46.3.1.a can take the prebuilt preterit-agentive general-use stem as its immediate source",
        (() => {
            const { sourceFrame, operationFrame } = buildLesson4631aTypedFrames({
                sourcePreparationRequired: false,
            });
            const generated = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                source: "poison",
                sourceFrame,
                operationFrame,
            });
            return {
                sourceInput: generated.sourceInput,
                sourceVerb: generated.sourceVerb,
                sourceKind: generated.sourceKind,
                visibleSourceKind: generated.visibleSourceKind,
                sourcePreparationRequired: generated.sourcePreparationRequired,
                immediateSourceFormula: generated.routeContract.immediateSourceFormula,
                routeSteps: generated.routeContract.routeSteps.map((step) => step.id),
                formulaStem: generated.formulaStem,
                surface: generated.surface,
            };
        })(),
        {
            sourceInput: "poison",
            sourceVerb: "namaka",
            sourceKind: "preterit-agentive-general-use-stem",
            visibleSourceKind: "preterit-agentive-general-use-stem",
            sourcePreparationRequired: false,
            immediateSourceFormula: "(mich-namaka-0-ka)",
            routeSteps: [
                "source-visible",
                "gate-46-3-1-a-immediate-source",
                "add-locative-relational-n",
                "adverbialize-zero-connector",
                "realize-surface",
            ],
            formulaStem: "(mich-namaka-0-ka-n)-0-",
            surface: "michnamakakan",
        }
    );
    s.eq(
        "Lesson 46.3.1.a source route blocks incomplete slot input instead of echoing a stem",
        (() => {
            const blocked = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                sourceVerb: "-(namaka)",
            });
            return {
                sourceVerb: blocked.sourceVerb,
                incorporatedNounStem: blocked.incorporatedNounStem,
                supported: blocked.supported,
                generationAllowed: blocked.generationAllowed,
                ok: blocked.ok,
                result: blocked.result,
                surfaceForms: blocked.surfaceForms,
                frameRouteStage: blocked.frames.routeContract.routeStage,
                diagnosticIds: blocked.contractDiagnostics.map((entry) => entry.id),
            };
        })(),
        {
            sourceVerb: "",
            incorporatedNounStem: "",
            supported: false,
            generationAllowed: false,
            ok: false,
            result: "—",
            surfaceForms: [],
            frameRouteStage: "generate-lesson-46-3-1-a-blocked",
            diagnosticIds: ["lesson-46-3-1-a-source-frame-required"],
        }
    );
    s.eq(
        "Lesson 46.3.1.a typed route rejects missing and contradictory operation frames",
        (() => {
            const { sourceFrame, operationFrame } = buildLesson4631aTypedFrames();
            const missingOperation = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                sourceFrame,
            });
            const contradictorySource = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                sourceFrame: {
                    ...sourceFrame,
                    sourceSignature: "poison",
                },
                operationFrame,
            });
            const contradictoryTarget = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                sourceFrame,
                operationFrame: {
                    ...operationFrame,
                    targetSurface: "poison",
                },
            });
            const oldFlatten = ctx.flattenLesson46FormulaStemToSurface;
            if (typeof ctx.flattenLesson46FormulaStemToSurface === "function") {
                ctx.flattenLesson46FormulaStemToSurface = () => "poison";
            }
            const monkeypatched = ctx.buildLesson46PreteritAgentiveLocativeNncFromSource({
                source: "(poison)",
                sourceVerb: "poison",
                incorporatedNounStem: "poison",
                sourceFrame,
                operationFrame,
            });
            if (oldFlatten) {
                ctx.flattenLesson46FormulaStemToSurface = oldFlatten;
            }
            return {
                directFlatten: ctx.flattenLesson46FormulaStemToSurface("(mich-namaka-0-ka-n)-0-"),
                typedFlatten: ctx.flattenLesson46FormulaStemToSurface("(mich-namaka-0-ka-n)-0-", { operationFrame }),
                missingOperation: {
                    supported: missingOperation.supported,
                    diagnosticIds: missingOperation.contractDiagnostics.map((entry) => entry.id),
                },
                contradictorySource: {
                    supported: contradictorySource.supported,
                    diagnosticIds: contradictorySource.contractDiagnostics.map((entry) => entry.id),
                },
                contradictoryTarget: {
                    supported: contradictoryTarget.supported,
                    diagnosticIds: contradictoryTarget.contractDiagnostics.map((entry) => entry.id),
                },
                monkeypatched: {
                    result: monkeypatched.result,
                    surface: monkeypatched.surface,
                    formulaStem: monkeypatched.formulaStem,
                    sourceVerb: monkeypatched.sourceVerb,
                    incorporatedNounStem: monkeypatched.incorporatedNounStem,
                },
            };
        })(),
        {
            directFlatten: "",
            typedFlatten: "michnamakakan",
            missingOperation: {
                supported: false,
                diagnosticIds: ["lesson-46-3-1-a-operation-frame-required"],
            },
            contradictorySource: {
                supported: false,
                diagnosticIds: ["lesson-46-3-1-a-contradictory-source-frame"],
            },
            contradictoryTarget: {
                supported: false,
                diagnosticIds: ["lesson-46-3-1-a-contradictory-target-frame"],
            },
            monkeypatched: {
                result: "michnamakakan",
                surface: "michnamakakan",
                formulaStem: "(mich-namaka-0-ka-n)-0-",
                sourceVerb: "namaka",
                incorporatedNounStem: "mich",
            },
        }
    );
    s.eq(
        "generateWord can execute the scoped Lesson 46.3.1.a source route",
        (() => {
            const { sourceFrame, operationFrame } = buildLesson4631aTypedFrames();
            const generated = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        relationalNnc: {
                            enabled: true,
                            sourceVerb: "poison",
                            incorporatedNounStem: "poison",
                            sourceFrame,
                            operationFrame,
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "-(namaka)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "relational-nnc",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: generated.result,
                surface: generated.surface,
                surfaceForms: generated.surfaceForms,
                outputKind: generated.outputKind,
                clauseKind: generated.clauseKind,
                generationRoute: generated.generationRoute,
                formulaStem: generated.formulaStem,
                sourceVerb: generated.sourceVerb,
                incorporatedNounStem: generated.incorporatedNounStem,
                shellFormulaEcho: generated.nuclearClauseShell?.formulaEcho,
                relationalFrameFormulaStem: generated.relationalNncGenerationFrame?.formulaStem,
                frameUnitKind: generated.frames.unitFrame.unitKind,
                frameRouteStage: generated.relationalNncGenerationFrame?.frames?.routeContract?.routeStage || "",
                frameGenerationAllowed: generated.frames.routeContract.generationAllowed,
            };
        })(),
        {
            result: "michnamakakan",
            surface: "michnamakakan",
            surfaceForms: ["michnamakakan"],
            outputKind: "relational-nnc",
            clauseKind: "nominal-nuclear-clause",
            generationRoute: "relational-nnc",
            formulaStem: "(mich-namaka-0-ka-n)-0-",
            sourceVerb: "namaka",
            incorporatedNounStem: "mich",
            shellFormulaEcho: "#Ø-Ø(mich-namaka-0-ka-n)Ø#",
            relationalFrameFormulaStem: "(mich-namaka-0-ka-n)-0-",
            frameUnitKind: "relational-nnc",
            frameRouteStage: "generate-lesson-46-3-1-a",
            frameGenerationAllowed: true,
        }
    );
    s.eq(
        "visible locativo agentivo preterito tab blocks without Andrews typed frames",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(mich-namaka)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "locativo-agentivo-preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: generated.result,
                surface: generated.surface,
                formulaStem: generated.formulaStem,
                sourceKind: generated.sourceKind,
                visibleSourceKind: generated.visibleSourceKind,
                sourcePreparationRequired: generated.sourcePreparationRequired,
                immediateSourceFormula: generated.routeContract?.immediateSourceFormula || "",
                routeSteps: generated.routeContract?.routeSteps?.map((step) => step.id) || [],
                frameRouteStage: generated.relationalNncGenerationFrame?.frames?.routeContract?.routeStage || "",
                diagnosticIds: generated.relationalNncGenerationFrame?.contractDiagnostics?.map((entry) => entry.id) || [],
            };
        })(),
        {
            result: "—",
            surface: "",
            formulaStem: undefined,
            sourceKind: "",
            visibleSourceKind: "",
            sourcePreparationRequired: false,
            immediateSourceFormula: "",
            routeSteps: [],
            frameRouteStage: "generate-lesson-46-3-1-a-blocked",
            diagnosticIds: ["lesson-46-3-1-a-source-frame-required"],
        }
    );
    s.eq(
        "generateWord blocks the scoped Lesson 46.3.1.a route from a single embedded source formula",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        relationalNnc: {
                            enabled: true,
                            source: "(mich-namaka)",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(mich-namaka)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "relational-nnc",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: generated.result,
                surface: generated.surface,
                formulaStem: generated.formulaStem,
                sourceVerb: generated.sourceVerb,
                incorporatedNounStem: generated.incorporatedNounStem,
                relationalFrameFormulaStem: generated.relationalNncGenerationFrame?.formulaStem,
                frameRouteStage: generated.relationalNncGenerationFrame?.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            result: "—",
            surface: "",
            formulaStem: undefined,
            sourceVerb: "",
            incorporatedNounStem: "",
            relationalFrameFormulaStem: undefined,
            frameRouteStage: "generate-lesson-46-3-1-a-blocked",
        }
    );
    s.eq(
        "generateWord blocks Lesson 46.3.1.a from the visible embedded stem when typed frames are absent",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        relationalNnc: {
                            enabled: true,
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(mich-namaka)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "relational-nnc",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: generated.result,
                sourceInput: generated.sourceInput,
                sourceVerb: generated.sourceVerb,
                incorporatedNounStem: generated.incorporatedNounStem,
                formulaStem: generated.formulaStem,
            };
        })(),
        {
            result: "—",
            sourceInput: "(mich-namaka)",
            sourceVerb: "",
            incorporatedNounStem: "",
            formulaStem: undefined,
        }
    );

    s.eq(
        "Lesson 47 pursuit frame covers every Andrews relational part-three subsection",
        (() => {
            const inventory = ctx.getLesson47RelationalNncSubsectionInventory();
            const frame = ctx.buildLesson47RelationalNncPursuitFrame();
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
                remainingGapsMentionGentilicContrast: frame.remainingGaps.some((gap) => /gentilic/.test(gap)),
            };
        })(),
        {
            kind: "lesson-47-relational-nnc-pursuit-frame",
            stepNumber: 47,
            routeStage: "audit-lesson-47",
            pdfRefCount: 5,
            firstPdfRef: "Andrews Lesson 47.1",
            lastPdfRef: "Andrews Lesson 47.5",
            subsectionCount: 15,
            subsectionRefs: [
                "47.1",
                "47.1.1",
                "47.1.2",
                "47.2",
                "47.2.1",
                "47.2.2",
                "47.3",
                "47.3.1",
                "47.3.2",
                "47.3.3",
                "47.4",
                "47.4 co/c replacement",
                "47.5",
                "47.5.1",
                "47.5.2",
            ],
            plannedArrowIds: ["lesson-47-relational-nnc-audit"],
            firedArrowIds: [["lesson-47-relational-nnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionGentilicContrast: true,
        }
    );
    s.eq(
        "Lesson 47 frame records option groups, associated entities, and pertinency boundaries",
        (() => {
            const frame = ctx.buildLesson47RelationalNncPursuitFrame();
            return {
                oneTwoGroup: frame.optionsOneTwoFrame.optionGroup,
                oneTwoStemKeys: frame.optionsOneTwoFrame.stems.map((stem) => stem.stemKey),
                huicPa: frame.optionsOneTwoFrame.stems[1].canBeEmbeddedInPaOrCopa,
                oneThreeGroup: frame.optionsOneThreeFrame.optionGroup,
                oneThreeStemKeys: frame.optionsOneThreeFrame.stems.map((stem) => stem.stemKey),
                caTemporal: frame.optionsOneThreeFrame.stems[0].temporalConnectiveTCompoundsPossible,
                icpacCompoundMatrix: frame.optionsOneThreeFrame.stems[1].actuallyCompoundMatrix,
                oneTwoThreeGroup: frame.optionsOneTwoThreeFrame.optionGroup,
                oneTwoThreeStemKeys: frame.optionsOneTwoThreeFrame.stems.map((stem) => stem.stemKey),
                techPaCopa: frame.optionsOneTwoThreeFrame.stems[0].canEmbedInPaOrCopaForAboutRelations,
                tlanBodyParts: frame.optionsOneTwoThreeFrame.stems[1].bodyPartPrecisionCompounds,
                panPampa: frame.optionsOneTwoThreeFrame.stems[2].pampaExtendsFromDirectionToSupportReason,
                panIpanNumeral: frame.optionsOneTwoThreeFrame.stems[2].ipanCanConnectNumeralGroups,
                associatedCoCReplacement: frame.associatedEntityFrame.coOrCMatrixReplacedBySilentVariantBeforeCa,
                associatedGentilicContrast: frame.associatedEntityFrame.contrastWithGentilicFormationRequired,
                pertinencyFormations: frame.pertinencyFrame.formations.map((formation) => formation.id),
                generationBoundary: frame.currentEngineBoundary,
                orthographySlotScoped: frame.frames?.orthographyFrame?.slotScopedOrthographyRequiredBeforeVisibleNawatSurface,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            oneTwoGroup: "options-one-two",
            oneTwoStemKeys: ["tzalan", "huic"],
            huicPa: true,
            oneThreeGroup: "options-one-three",
            oneThreeStemKeys: ["ca-means", "icpa-c-top"],
            caTemporal: true,
            icpacCompoundMatrix: true,
            oneTwoThreeGroup: "options-one-two-three",
            oneTwoThreeStemKeys: ["tech-contact", "tlan-bottom", "pan-surface-time"],
            techPaCopa: true,
            tlanBodyParts: ["ix-tlan", "tzin-tlan"],
            panPampa: true,
            panIpanNumeral: true,
            associatedCoCReplacement: true,
            associatedGentilicContrast: true,
            pertinencyFormations: ["direct-adverbialized-nnc-stem", "associated-entity-stem"],
            generationBoundary: {
                relationalNncBoundaryMetadataImplemented: true,
                relationalNncUsageFrameImplemented: true,
                lesson45UsageOptionsImplemented: true,
                lesson46OptionTwoOnlyFrameImplemented: true,
                optionOneTwoGroupDiagnosticOnly: true,
                optionOneThreeGroupDiagnosticOnly: true,
                optionOneTwoThreeGroupDiagnosticOnly: true,
                associatedEntityFrameDiagnosticOnly: true,
                pertinencyFrameDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticRelationalDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson47GenerationImplemented: false,
            },
            orthographySlotScoped: true,
            grammarRouteStage: "audit-lesson-47",
            diagnosticIds: ["relational-nnc-lesson-47-diagnostic-partial", "relational-nnc-source-gated"],
        }
    );

    const optionOneFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "nohuan",
        relationalStem: "huan",
        relationalKind: "associated-entity",
        relationalOption: "1",
        optionGroup: "one-only",
        sourceState: "possessive",
        governedArgument: "possessor",
        evidenceSource: "Andrews structural option one; Nawat surface not generated here",
        translationLabel: "with",
    });
    s.eq(
        "option-one relational usage frame is possessive, non-generative, and supplementary-possessor bounded",
        {
            kind: optionOneFrame.kind,
            lessonRange: optionOneFrame.lessonRange,
            relationalStem: optionOneFrame.relationalStem,
            relationalKind: optionOneFrame.relationalKind,
            relationalOption: optionOneFrame.relationalOption,
            optionGroup: optionOneFrame.optionGroup,
            stemPosition: optionOneFrame.stemPosition,
            sourceState: optionOneFrame.sourceState,
            allowedStates: optionOneFrame.allowedStates,
            supplementaryPossessorOnly: optionOneFrame.supplementaryPossessorOnly,
            supported: optionOneFrame.supported,
            generationContract: optionOneFrame.generationContract,
            translationLabelsAreMorphology: optionOneFrame.translationWarning.labelsAreMorphology,
            diagnostics: optionOneFrame.diagnostics,
        },
        {
            kind: "relational-nnc-usage-frame",
            lessonRange: "45-47",
            relationalStem: "huan",
            relationalKind: "associated-entity",
            relationalOption: "option-one",
            optionGroup: "option-one-only",
            stemPosition: "simple-stem-predicate",
            sourceState: "possessive",
            allowedStates: ["possessive"],
            supplementaryPossessorOnly: true,
            supported: true,
            generationContract: {
                frameGeneratesSurface: false,
                changesSurfaceForms: false,
                newWordGenerationAllowed: false,
            },
            translationLabelsAreMorphology: false,
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-option-one-supplementary-possessor-only",
                "relational-nnc-translation-label-is-not-morphology",
            ],
        }
    );
    s.no(
        "relational usage frame still does not expose generated forms",
        Object.prototype.hasOwnProperty.call(optionOneFrame, "surfaceForms")
            || Object.prototype.hasOwnProperty.call(optionOneFrame, "generatedForms")
    );
    s.eq(
        "relational usage frames carry stem and nuclear-clause LCM frames",
        {
            routeStage: optionOneFrame.frames.routeContract.routeStage,
            stemKind: optionOneFrame.frames.stemFrame.stemKind,
            nuclearKind: optionOneFrame.frames.nuclearClauseFrame.kind,
            generationAllowed: optionOneFrame.frames.routeContract.generationAllowed,
        },
        {
            routeStage: "describe-usage-frame",
            stemKind: "relational-nounstem",
            nuclearKind: "relational-nnc-usage-frame",
            generationAllowed: false,
        }
    );

    const invalidOptionOne = ctx.buildRelationalNncUsageFrame({
        candidate: "huan",
        relationalStem: "huan",
        relationalKind: "associated-entity",
        relationalOption: "option-one",
        sourceState: "absolutive",
    });
    s.eq(
        "option-one relational usage rejects absolutive state instead of generating",
        {
            supported: invalidOptionOne.supported,
            sourceState: invalidOptionOne.sourceState,
            diagnostics: invalidOptionOne.diagnostics,
        },
        {
            supported: false,
            sourceState: "absolutive",
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-option-one-requires-possessive-state",
                "relational-nnc-option-one-supplementary-possessor-only",
            ],
        }
    );

    const impersonalLocativeFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "impersonal locative matrix",
        relationalStem: "n",
        relationalKind: "locative",
        relationalOption: "2",
        optionGroup: "two-only",
        sourceState: "absolutive",
        sourceVoice: "impersonal",
        sourceTense: "imperfecto",
        matrixStem: "n",
        embeddedStem: "source VNC",
    });
    s.eq(
        "option-two impersonal source is modeled as absolutive-state structural metadata only",
        {
            relationalOption: impersonalLocativeFrame.relationalOption,
            optionGroup: impersonalLocativeFrame.optionGroup,
            stemPosition: impersonalLocativeFrame.stemPosition,
            sourceState: impersonalLocativeFrame.sourceState,
            sourceMapping: impersonalLocativeFrame.sourceMapping,
            supported: impersonalLocativeFrame.supported,
            generationAllowed: impersonalLocativeFrame.generationAllowed,
        },
        {
            relationalOption: "option-two",
            optionGroup: "option-two-only",
            stemPosition: "integrated-matrix",
            sourceState: "absolutive",
            sourceMapping: {
                sourceVoice: "impersonal",
                sourceTense: "imperfecto",
                sourceSubject: "",
                possessorPrefix: "",
                possessorFromSourceSubject: false,
                stateRule: "impersonal-source-absolutive-only",
            },
            supported: true,
            generationAllowed: false,
        }
    );

    const invalidImpersonalLocativeFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "impersonal locative matrix",
        relationalStem: "n",
        relationalKind: "locative",
        relationalOption: "2",
        sourceState: "possessive",
        sourceVoice: "impersonal",
    });
    s.eq(
        "option-two impersonal source rejects possessive-state frame",
        {
            supported: invalidImpersonalLocativeFrame.supported,
            sourceState: invalidImpersonalLocativeFrame.sourceState,
            diagnostics: invalidImpersonalLocativeFrame.diagnostics,
        },
        {
            supported: false,
            sourceState: "possessive",
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-impersonal-source-requires-absolutive-state",
            ],
        }
    );

    return s;
}

module.exports = { run };
