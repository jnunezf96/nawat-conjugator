"use strict";

/**
 * Tests for src/core/nnc/relational/relational.js
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
            typeof ctx.buildLesson47RelationalNncPursuitFrame,
            typeof ctx.getLesson47RelationalNncSubsectionInventory,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildRelationalNncBoundaryMetadata();
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
        "recognized relational category remains unconfirmed without Nawat evidence",
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
            falsePositiveSource: "preposition-translation",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "relational-nnc-needs-nawat-evidence",
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
            diagnosticId: "relational-nnc-needs-nawat-evidence",
            enumerableGrammarFrame: false,
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
            "preposition or place translations are not Nawat/Pipil relational form evidence",
            "Andrews relational categories are architecture, not Nawat/Pipil form authority",
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
                remainingGapsMentionEvidence: frame.remainingGaps.some((gap) => /confirmed Nawat\/Pipil/.test(gap)),
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
            remainingGapsMentionEvidence: true,
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
            diagnosticIds: ["relational-nnc-lesson-45-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
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
            firedArrowIds: [["lesson-46-relational-nnc-audit", "hit"]],
            hitCount: 1,
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
                fullLesson46GenerationImplemented: false,
            },
            orthographySlotScoped: true,
            grammarRouteStage: "audit-lesson-46",
            diagnosticIds: ["relational-nnc-lesson-46-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
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
            diagnosticIds: ["relational-nnc-lesson-47-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
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
