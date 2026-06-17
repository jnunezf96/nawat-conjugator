// core/nnc/nominalization/nominalization.js
// Lessons 35-39 nominalization/deverbal/patientive boundary metadata. This
// keeps current generated sustantivo/adjetivo surfaces separate from confirmed
// ownerhood, complete z/liz fixture coverage, and full patientive-family generation.

"use strict";

const NOMINALIZATION_BOUNDARY_VERSION = 1;

const NOMINALIZATION_BOUNDARY_KIND = Object.freeze({
    structuralNominalization: "structural-nominalization",
    preteritAgentive: "preterit-agentive",
    ownerhood: "ownerhood",
    customaryAgentive: "customary-agentive",
    deverbalZ: "deverbal-z",
    deverbalLiz: "deverbal-liz",
    patientiveFamily: "patientive-family",
    unknown: "unknown",
});

const NOMINALIZATION_FALSE_POSITIVE_SOURCE = Object.freeze({
    generatedNominalSurface: "generated-nominal-surface",
    nominalizationProfile: "nominalization-profile",
    patientiveFamilyProfile: "patientive-family-profile",
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    adjetivoRoute: "adjetivo-route",
    compoundAst: "compound-ast",
    translationLabel: "translation-label",
    andrewsExample: "andrews-example",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const NOMINALIZATION_ANTI_CONFLATION_RULES = Object.freeze([
    "generated sustantivo/adjetivo surfaces are partial motors, not complete Lessons 35-39 coverage",
    "sustantivo-verbal s/lis output is the current Nawat active-action motor, not complete z/liz fixture coverage",
    "nominalizationProfile is explanatory metadata, not ownerhood or complete z/liz generation",
    "patientiveFamilyProfile is a current-output taxonomy, not full Lessons 37.9-39 patientive data",
    "ordinary NNC fixtures and open-stem previews are not deverbal or ownerhood fixture evidence",
    "adjetivo route output is not adjectival modification syntax",
    "Andrews nominalization categories are engine authority, not Nawat/Pipil orthography authority",
]);

const NOMINALIZATION_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "nominalizationKind",
        asks: "Is the candidate agentive, ownerhood, deverbal z/liz, patientive, action/result, or unknown?",
    }),
    Object.freeze({
        field: "sourceVnc",
        asks: "Which Nawat/Pipil VNC source, tense/aspect, voice, and valency are evidenced?",
    }),
    Object.freeze({
        field: "stemUse",
        asks: "Is the stem restricted, general-use, compound-embed, generated surface only, or unknown?",
    }),
    Object.freeze({
        field: "semanticRole",
        asks: "Does the nounstem name agent, patient, instrument, action, result, owner, property, or unknown?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What repo data or user-provided Nawat/Pipil source confirms the form?",
    }),
]);

const LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_nominalization.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON35_PRETERIT_AGENTIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 35.1",
    "Andrews Lesson 35.2",
    "Andrews Lesson 35.3",
    "Andrews Lesson 35.4",
    "Andrews Lesson 35.5",
    "Andrews Lesson 35.6",
    "Andrews Lesson 35.7",
    "Andrews Lesson 35.8",
    "Andrews Lesson 35.9",
    "Andrews Lesson 35.10",
    "Andrews Lesson 35.11",
    "Andrews Lesson 35.12",
]);

const LESSON35_NOMINALIZATION_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-35-nominalization-overview-frame",
    sourceSections: Object.freeze(["Andrews 35.1", "Andrews 35.2"]),
    process: "VNC takes on NNC characteristics",
    functionalNominalizationIsSupplementation: true,
    structuralNominalizationFocus: true,
    eightNominalizedVncKinds: true,
    lesson35Kind: "preterit-agentive-nnc",
    preteritAgentiveNamesAgentOfAction: true,
    restrictedUseStem: "preterit-tense VNC predicate reanalyzed as nounstem",
    generalUseStem: "compound nounstem with restricted preterit predicate as embed",
});

const LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME = Object.freeze({
    kind: "lesson-35-absolutive-preterit-agentive-frame",
    sourceSection: "Andrews 35.3",
    conversion: "preterit-tense VNC predicate reanalyzed into absolutive-state NNC formula",
    vncPredicateBecomesNounstem: true,
    projectiveObjectInsideNounstem: Object.freeze(["te", "tla"]),
    mainlineReflexiveObjectInsideNounstem: Object.freeze(["n-o", "t-o", "m-o"]),
    preteritTenseMorphAlwaysFinalInRestrictedStem: true,
    sourceSubjectNumberMorphsContinue: true,
    oftenKeepsQuiInsteadOfSilentZero: true,
    antecessiveOrderParticleDoesNotAppearOnNnc: true,
    monomorphemicClassATendsToUseCustomaryPresentAgentiveInstead: true,
    classFamiliesCovered: Object.freeze(["Class A dimorphemic", "Class B", "Class C", "Class D"]),
    singleObjectSourcesSupportedStructurally: true,
    pluralAffinityStemCanBeObligatoryOrOptional: true,
    preteritAsPresentAgentivePossible: true,
    passiveSourceCanYieldRarePreteritPatientiveNnc: true,
    compoundStemSourcesPossible: true,
});

const LESSON35_NUMBER_POSITION_FRAME = Object.freeze({
    kind: "lesson-35-number-position-frame",
    sourceSection: "Andrews 35.4",
    classBCDNormallySingularCommonQui: true,
    silentZeroCanBeExpectedOrCommonInSomeLexemes: true,
    quiAndZeroCanAlternate: true,
    silentZeroTendsTowardNonanimateAgencyMeansMeaning: true,
    tendencyIsNotRule: true,
    quiZeroAlternationCanSeparateAnimateFromNonanimateMeaning: true,
    nonspecificProjectiveCanActivateAndEscapeNounstem: true,
    activatedProjectiveCreatesVerbalNominalHybrid: true,
});

const LESSON35_GENERAL_USE_FRAME = Object.freeze({
    kind: "lesson-35-general-use-preterit-agentive-frame",
    sourceSection: "Andrews 35.5",
    stemKind: "general-use-preterit-agentive-nounstem",
    formation: "restricted preterit predicate embed plus (ca)-tl matrix",
    strictlyNounstem: true,
    occursInPossessiveState: true,
    occursInAdverbializedNncs: true,
    occursAsEmbedInNominalAndVerbalCompoundStems: true,
    reflexiveSourceUsesShuntlineNeWhenDemotedToEmbed: true,
    preteritTenseMorphImmediatelyLeftOfCa: true,
    rareAbsolutiveQueMatrixVariant: true,
});

const LESSON35_POSSESSIVE_STATE_FRAME = Object.freeze({
    kind: "lesson-35-possessive-state-preterit-agentive-frame",
    sourceSection: "Andrews 35.6",
    generalUseStemClass: "Subclass 1-A ti nounstem",
    singularSubjectNumberDyad: "uh-0",
    pluralSubjectNumberDyad: "hu-an",
    possessorIsExternalToSourceVncSubject: true,
    sourceReflexiveMapsToShuntlineNeInGeneralUseStem: true,
    irregularYoMatrixPossessivesPossible: true,
    preteritPatientivePossessiveCounterpartPossible: true,
    yaUhGeneralUseWithTePossessorBlursToTi: true,
});

const LESSON35_COMPOUND_EMBED_FRAME = Object.freeze({
    kind: "lesson-35-compound-embed-frame",
    sourceSection: "Andrews 35.7",
    generalUsePreteritAgentiveEmbedsInCompoundStems: true,
    ordinaryCompoundNncsSupportedStructurally: true,
    compoundVncsSupportedStructurally: true,
    compoundAffectiveNncsSupportedStructurally: true,
    activatedProjectiveHybridCanOccurInAffectiveNncs: true,
    finiteExpansionRequiresNawatMatrixEvidence: true,
});

const LESSON35_OLD_PERSON_FRAME = Object.freeze({
    kind: "lesson-35-old-woman-old-man-frame",
    sourceSection: "Andrews 35.8",
    usesPreteritAgentiveNncsForOldWomanAndOldMan: true,
    oldWomanSource: "(ilama-ti)",
    oldManSource: "(hue-hue-ti)",
    singularSubjectNumberNormallySilentZero: true,
    generalUseEmbedsInAffectiveStems: true,
    generalUseEmbedsWithYoMatrixForOldPersonhood: true,
    distinguishesSimpleNounstemFromPreteritAgentiveStem: true,
    huehuehEmbedStemIsNotSameAsPreteritAgentiveStem: true,
    flawedSubjectAffectiveVariantExists: true,
});

const LESSON35_OWNERHOOD_FRAME = Object.freeze({
    kind: "lesson-35-ownerhood-frame",
    sourceSection: "Andrews 35.9",
    role: "preterit-agentive NNC of ownerhood",
    languageLacksSingleStemHavePossessVnc: true,
    sourceFormation: "incorporated-object compound plus ownerhood matrix, then nominalized preterit",
    ownerhoodMatrices: Object.freeze(["*tla-(-e)", "*tla-(-hua)"]),
    matricesOnlyOccurInThisIncorporatedObjectFormation: true,
    vncUseLimitedToConnectiveTCompoundEmbeds: true,
    preteritTenseMorphOnlyAssociatingTense: true,
    singularCommonNumberNormallySilentZero: true,
    quiPossible: true,
    incorporatedNounstemUsesGeneralUseShape: true,
    matrixChoiceDeterminedPrimarilyByForelyingSoundAndNounstemClass: true,
    tlaEIncorporates: Object.freeze(["most tli class except final w or glottal", "ti subclass 2-B", "ti subclass 2-C without supportive i", "ti subclass 2-A glottalized embeds"]),
    tlaHuaIncorporates: Object.freeze(["ti subclass 1", "tli stems ending in w or glottal", "in stems", "zero stems"]),
    preteritAgentiveNounstemCanBeIncorporatedByTlaHua: true,
    recursiveOwnerhoodPossible: true,
});

const LESSON35_ABUNDANT_OWNERHOOD_FRAME = Object.freeze({
    kind: "lesson-35-abundant-ownerhood-frame",
    sourceSection: "Andrews 35.10",
    matrix: "*tla-(-yo-a)",
    meaning: "own abundantly, characteristically, or in every part",
    compoundVerbstemLimitedToPreteritAndConnectiveTEmbed: true,
    nominalizingTransformationCreatesNounstem: true,
    stemInitialYAssimilationApplies: true,
    canIncorporatePreteritAgentiveNounstemAsObject: true,
});

const LESSON35_OWNERHOOD_ANALYSIS_FRAME = Object.freeze({
    kind: "lesson-35-ownerhood-analysis-frame",
    sourceSection: "Andrews 35.11",
    ownerhoodNncsCanBeRestrictedOrGeneralUse: true,
    ownerhoodTranslationRequiresAnimacyAndContext: true,
    abundantOwnerhoodCanDifferFromPlainOwnerhoodByAnimacyMeaning: true,
    ownerhoodNounstemsCanEmbedInCompoundAffectiveNncs: true,
    literalHaveTranslationsAreDiagnosticsNotSurfaceAuthority: true,
});

const LESSON35_VNC_EMBED_ADVERBIAL_FRAME = Object.freeze({
    kind: "lesson-35-vnc-embed-adverbial-frame",
    sourceSection: "Andrews 35.12",
    preteritAgentiveNounstemCanBeIncorporatedObjectInVnc: true,
    moreFrequentUse: "incorporated adverb of manner",
    adverbialModificationCanFocusSubjectOrObject: true,
    reflexiveShapeDependsOnMatrixValence: true,
    intransitiveMatrixKeepsMainlineReflexiveRespondingToSubject: true,
    transitiveMatrixUsesShuntlineReflexive: true,
    tlaFusionCanMakeMatrixIntransitive: true,
    lexicalizedEmbedMayKeepNonFirstPersonMainlineReflexive: true,
});

const LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson35-nominalization", andrewsSection: "35.1", category: "structural-nominalization", directiveEs: "La nominalizacion estructural convierte una CNV en una CNN; la suplementacion funcional queda fuera del motor de palabra.", engineSurface: "diagnostic nominalization overview frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson35-preterit-agentive", andrewsSection: "35.2", category: "preterit-agentive-nnc", directiveEs: "El agentivo preterito nombra al agente y separa tronco de uso restringido y tronco de uso general.", engineSurface: "diagnostic preterit-agentive overview frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson35-absolutive-preterit-agentive", andrewsSection: "35.3", category: "absolutive-preterit-agentive", directiveEs: "La CNN absolutiva reanaliza el predicado preterito como tronco nominal; el morfo preterito queda al final del tronco restringido.", engineSurface: "partial generated preterit-agentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-number-position", andrewsSection: "35.4", category: "preterit-agentive-number-position", directiveEs: "La posicion de numero alterna qui y cero segun clase, uso y tendencia animada/no animada; no debe ocultarse como regla unica.", engineSurface: "diagnostic number-position frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson35-general-use", andrewsSection: "35.5", category: "general-use-preterit-agentive", directiveEs: "El uso general es compuesto: predicado preterito incrustado mas matriz ca; el reflexivo de fuente pasa a ne.", engineSurface: "partial general-use stem continuations plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-possessive-state", andrewsSection: "35.6", category: "possessive-preterit-agentive", directiveEs: "La CNN posesiva usa el tronco general con conectores w/wan; el poseedor es externo al sujeto de la CNV fuente.", engineSurface: "partial possessive preterit-agentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-compound-embeds", andrewsSection: "35.7", category: "preterit-agentive-compound-embed", directiveEs: "El tronco general puede incrustarse en CNN/CNV compuestas y afectivas; matrices nuevas requieren evidencia Nawat.", engineSurface: "partial compound continuation contracts plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-old-person", andrewsSection: "35.8", category: "old-woman-old-man", directiveEs: "Anciana y anciano suelen expresarse como agentivos preteritos; no se confunden con troncos simples ni con incrustados homofonos.", engineSurface: "diagnostic old-person boundary frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson35-ownerhood", andrewsSection: "35.9", category: "ownerhood-preterit-agentive", directiveEs: "La posesion se forma con compuestos de objeto incorporado y matrices e/wa; la seleccion depende de clase y sonido anterior.", engineSurface: "partial ownerhood continuation contracts plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-abundant-ownerhood", andrewsSection: "35.10", category: "abundant-ownerhood", directiveEs: "La posesion abundante usa matriz yua/yuwa estructural, restringida al entorno preterito/conectivo documentado.", engineSurface: "partial abundant-ownerhood continuation contracts plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson35-ownerhood-analysis", andrewsSection: "35.11", category: "ownerhood-analysis-translation", directiveEs: "La glosa de tener depende de analisis, animacidad y contexto; la traduccion no autoriza formas.", engineSurface: "diagnostic ownerhood analysis frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson35-vnc-embed-adverbial", andrewsSection: "35.12", category: "preterit-agentive-vnc-embed-adverbial", directiveEs: "El agentivo preterito puede ser objeto incorporado o adverbio de modo; el reflexivo depende de la valencia de la matriz.", engineSurface: "partial incorporated-complement/adverbial continuations plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function cloneNominalizationLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneNominalizationLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneNominalizationLessonRecord(value)])
    );
}

function getLesson35PreteritAgentiveSubsectionInventory() {
    return LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS),
    }));
}

function buildLesson35PreteritAgentivePursuitFrame() {
    const subsectionInventory = getLesson35PreteritAgentiveSubsectionInventory();
    const overviewFrame = cloneNominalizationLessonRecord(LESSON35_NOMINALIZATION_OVERVIEW_FRAME);
    const absolutiveFrame = cloneNominalizationLessonRecord(LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME);
    const numberPositionFrame = cloneNominalizationLessonRecord(LESSON35_NUMBER_POSITION_FRAME);
    const generalUseFrame = cloneNominalizationLessonRecord(LESSON35_GENERAL_USE_FRAME);
    const possessiveStateFrame = cloneNominalizationLessonRecord(LESSON35_POSSESSIVE_STATE_FRAME);
    const compoundEmbedFrame = cloneNominalizationLessonRecord(LESSON35_COMPOUND_EMBED_FRAME);
    const oldPersonFrame = cloneNominalizationLessonRecord(LESSON35_OLD_PERSON_FRAME);
    const ownerhoodFrame = cloneNominalizationLessonRecord(LESSON35_OWNERHOOD_FRAME);
    const abundantOwnerhoodFrame = cloneNominalizationLessonRecord(LESSON35_ABUNDANT_OWNERHOOD_FRAME);
    const ownerhoodAnalysisFrame = cloneNominalizationLessonRecord(LESSON35_OWNERHOOD_ANALYSIS_FRAME);
    const vncEmbedAdverbialFrame = cloneNominalizationLessonRecord(LESSON35_VNC_EMBED_ADVERBIAL_FRAME);
    const remainingGaps = [
        "Current preterit-agentive generation and continuations are partial, not complete Lesson 35 coverage.",
        "Number-position alternations, affinity-stem selection, activated projective-object hybrids, old-person lexical boundaries, and all matrix subclass selections remain diagnostic.",
        "Ownerhood e/wa/yua continuations are limited to current Nawat data-backed matrices and class-compatible defaults.",
        "Object-focused adverbial matrices, lexicalized reflexive exceptions, rare que-matrix absolutives, and complete Nawat/Pipil examples remain evidence-needed.",
    ];
    const frame = {
        kind: "lesson-35-preterit-agentive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 35,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 35.1-35.12 against current nominalization boundary metadata, preterit-agentive restricted/general-use stems, possessive state, compound embeds, old-person formations, ownerhood, abundant ownerhood, and VNC embed/adverbial continuations.",
                andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                result: "hit",
                correction: "Lesson 35 now records Andrews preterit-agentive nominalization architecture, restricted and general-use stems, number-position alternations, possessive-state behavior, compound embeds, old-person formations, ownerhood and abundant-ownerhood matrices, translation boundaries, and VNC embed/adverbial roles while preserving evidence gates.",
                andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        overviewFrame,
        absolutiveFrame,
        numberPositionFrame,
        generalUseFrame,
        possessiveStateFrame,
        compoundEmbedFrame,
        oldPersonFrame,
        ownerhoodFrame,
        abundantOwnerhoodFrame,
        ownerhoodAnalysisFrame,
        vncEmbedAdverbialFrame,
        currentEngineBoundary: {
            nominalizationBoundaryMetadataImplemented: true,
            preteritAgentiveRestrictedUseOutputPartial: true,
            preteritAgentiveGeneralUseContinuationPartial: true,
            possessivePreteritAgentiveOutputPartial: true,
            ownerhoodContinuationPartial: true,
            abundantOwnerhoodContinuationPartial: true,
            incorporatedComplementContinuationPartial: true,
            adverbialMannerContinuationPartial: true,
            fullLesson35GenerationImplemented: false,
            finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-35-preterit-agentive-pursuit-frame",
        unitKind: "preterit-agentive-nnc-boundary",
        routeStage: "audit-lesson-35",
        structuralSource: "Andrews Lesson 35",
        andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 35.1-35.12",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            overviewFrame,
            absolutiveFrame,
            numberPositionFrame,
            generalUseFrame,
            possessiveStateFrame,
            compoundEmbedFrame,
            oldPersonFrame,
            ownerhoodFrame,
            abundantOwnerhoodFrame,
            ownerhoodAnalysisFrame,
            vncEmbedAdverbialFrame,
        },
        stemFrame: {
            stemKind: "preterit-agentive-nnc",
            restrictedUseStem: overviewFrame.restrictedUseStem,
            generalUseStem: overviewFrame.generalUseStem,
            generalUseMatrix: "(ca)-tl",
            ownerhoodMatrices: ownerhoodFrame.ownerhoodMatrices,
            abundantOwnerhoodMatrix: abundantOwnerhoodFrame.matrix,
        },
        nuclearClauseFrame: {
            categoryTransition: "VNC -> NNC",
            sourceClauseKind: "CNV",
            targetClauseKind: "CNN",
            structuralNominalization: true,
            functionalSupplementationOutOfScope: true,
            preteritTenseMorphInsideNominalStem: true,
        },
        participantFrame: {
            semanticRole: "agent or owner",
            projectiveObjectInsideRestrictedStem: absolutiveFrame.projectiveObjectInsideNounstem,
            possessorSource: "external possessor in possessive preterit-agentive NNC",
            adverbialFocusCanTargetSubjectOrObject: vncEmbedAdverbialFrame.adverbialModificationCanFocusSubjectOrObject,
        },
        targetContract: {
            metadataKind: "lesson-35-preterit-agentive-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["preterit-agentive-diagnostic-partial", "preterit-agentive-needs-nawat-evidence"],
    });
}

const LESSON36_NOMINALIZED_VNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_nominalization.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON36_NOMINALIZED_VNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 36.1",
    "Andrews Lesson 36.2",
    "Andrews Lesson 36.3",
    "Andrews Lesson 36.4",
    "Andrews Lesson 36.5",
    "Andrews Lesson 36.6",
    "Andrews Lesson 36.7",
    "Andrews Lesson 36.8",
    "Andrews Lesson 36.9",
    "Andrews Lesson 36.10",
    "Andrews Lesson 36.11",
    "Andrews Lesson 36.12",
]);

const LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME = Object.freeze({
    kind: "lesson-36-customary-present-agentive-frame",
    sourceSections: Object.freeze(["Andrews 36.1", "Andrews 36.2", "Andrews 36.3", "Andrews 36.4"]),
    sourceVoice: "active",
    sourceTense: "customary-present",
    twoDegreesOfNominalization: Object.freeze(["reanalysis", "fully nominalized"]),
    reanalysisFrame: Object.freeze({
        sourcePredicateBecomesNounstem: true,
        valencePositionMovesInsideNounstem: true,
        projectiveObjectInsideNounstem: Object.freeze(["te", "tla"]),
        reflexiveObjectInsideNounstem: Object.freeze(["n-o", "t-o", "m-o"]),
        customaryPresentNiAlwaysFinalConstituent: true,
        vncNumberDyadsRemain: Object.freeze(["0-0", "0-h"]),
        mostlyAbsolutiveState: true,
        possessiveParadigmNormallyFilledByPreteritAgentive: true,
        rarePossessiveReanalysisKeepsVncNumberDyads: true,
        finalIOfNiMayDropInSingularPossessive: true,
    }),
    fullyNominalizedFrame: Object.freeze({
        numberFillersBecomeTiSubclass1A: true,
        absolutiveSingularTlIsUncommon: true,
        normalSingularUsesZeroVariant: true,
        canFillEmbedSubpositionOfCompoundStem: true,
        affectiveCompoundsNormallyPreferPreteritAgentiveStem: true,
        affectiveExceptionsExist: true,
        niFinalIMayDropInEmbedOrVocative: true,
        projectiveObjectCanActivateIntoHybrid: true,
        incorporatedComplementHybridUsesLesson35Procedure: true,
    }),
    contrastWithPreteritAgentive: Object.freeze({
        customaryPresentMayNotAlwaysMeanHabitualInTranslation: true,
        synonymyMayBeTranslationMirage: true,
        preteritAndCustomaryPresentMayDistinguishPunctualFromHabitualOrStateMeaning: true,
    }),
});

const LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-36-customary-present-patientive-frame",
    sourceSection: "Andrews 36.5",
    sourceVoice: "passive",
    sourceTense: "customary-present",
    sourcePredicateBecomesNounstem: true,
    semanticRole: "patient-or-undergoer",
    meaningExtension: "customarily treated, worthy or fit to be treated",
    equivalentToPotentialPatientInSomeMeanings: true,
    notInstrumentive: true,
    singleObjectProjectiveSourceDropsProjectiveObject: true,
    reflexiveObjectUsesShuntlineNe: true,
    possessiveStateAllowed: false,
    passiveStemVariantsCanCreateNounstemVariants: true,
    doubleProjectivePassiveTeNamesNonanimateEntity: true,
    doubleProjectivePassiveTlaNamesAnimateEntity: true,
    pluralSubjectUsesMeh: true,
    pluralMehPresupposesFullNominalization: true,
});

const LESSON36_INSTRUMENTIVE_FRAME = Object.freeze({
    kind: "lesson-36-instrumentive-frame",
    sourceSection: "Andrews 36.6",
    semanticRole: "instrument-faculty-means",
    paradigmRequiresTwoDifferentNominalizedStems: true,
    absolutiveStateSource: Object.freeze({
        sourceVoice: "impersonal",
        sourceTense: "customary-present",
        sourcePredicateBecomesNounstem: true,
        noSpecificParticipantForPossessorTransform: true,
        possessiveNormallyImpossible: true,
    }),
    possessiveStateSource: Object.freeze({
        sourceVoice: "active",
        sourceTense: "imperfect-indicative",
        sourcePredicateBecomesNounstem: true,
        sourceSubjectTransformsToPossessor: true,
        mainlineReflexiveBecomesShuntline: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B",
    }),
    nonactiveHuaCanHaveHualoVariant: true,
    supportiveInitialIDropsAfterTlaAndOftenAfterNe: true,
    absolutiveAndPossessiveCanDifferPragmatically: true,
    exceptionsToStateDistributionExist: true,
    instrumentiveNounstemsNameSetDefinedEntities: true,
});

const LESSON36_PRESENT_AGENTIVE_FRAME = Object.freeze({
    kind: "lesson-36-present-agentive-frame",
    sourceSection: "Andrews 36.7",
    sourceTense: "present-indicative",
    sourcePredicateBecomesNounstem: true,
    stateRestriction: "absolutive-only",
    canLexicalizeAsProperOrMetaphoricalNounstem: true,
    lexicalizedStemCanOccurInPossessiveStateByMeaningExtension: true,
    canServeAsMatrixInCompoundNounstemWhenLexicalized: true,
});

const LESSON36_FUTURE_AGENTIVE_FRAME = Object.freeze({
    kind: "lesson-36-future-agentive-frame",
    sourceSection: "Andrews 36.8",
    rarity: "rare",
    restrictedUseStem: "future-tense VNC predicate",
    futureTenseMorphZFinalInRestrictedStem: true,
    singularSubjectNumberDyad: "qui-0",
    pluralSubjectNumberDyad: "qu-eh",
    singularDoesNotUseSilentFutureVncDyad: true,
    generalUseStem: "future restricted stem embedded before (ca)-tl matrix",
    generalUseClass: "ti Subclass 1-A",
    possessorImportedFromOutsideSourceVnc: true,
    generalUseCanEmbedInCompoundStems: true,
    restrictedUseCanLexicalizeAsEmbedStem: true,
});

const LESSON36_ACTION_NNC_FRAME = Object.freeze({
    kind: "lesson-36-action-nnc-frame",
    sourceSections: Object.freeze(["Andrews 36.9", "Andrews 36.10", "Andrews 36.11", "Andrews 36.12"]),
    semanticRange: Object.freeze(["action", "process", "event", "resultant state", "instance or result of action"]),
    types: Object.freeze(["passive-action", "active-action"]),
    restrictedUseStemIsCompoundedForActionNncs: true,
    passiveActionFrame: Object.freeze({
        sourceSection: "Andrews 36.10",
        sourceVoice: "passive",
        sourceTense: "distant-past",
        generalUseInPossessiveState: true,
        distantPastCaFinalInGeneralUseStem: true,
        objectPronounsDeterminedByPassiveSource: true,
        sourceSubjectTransformsToPossessor: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B",
        restrictedAbsolutiveStem: "general-use stem embedded before *(-yo)-tl matrix",
        absolutiveCommonNumberOnly: true,
        yoCompoundCanAlsoFormSynonymousPossessiveState: true,
    }),
    activeActionFrame: Object.freeze({
        sourceSection: "Andrews 36.11",
        sourceVoice: "active",
        sourceTense: "distant-past",
        sourceScope: "intransitive sources and a few reflexive-object transitive sources",
        generalUseInPossessiveState: true,
        distantPastCaFinalInGeneralUseStem: true,
        mainlineReflexiveBecomesShuntline: true,
        sourceSubjectTransformsToPossessor: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B",
        idiomaticMeansOrSourceMeaningsCommon: true,
        resultOrResultantStateMeaningsCommon: true,
        rootPlusYaUsesObsoleteDistantPastRootPredicate: true,
        restrictedAbsolutiveStem: "general-use stem embedded before *(-yo)-tl matrix",
        yoCompoundCanAlsoFormSynonymousPossessiveState: true,
    }),
    contrastFrame: Object.freeze({
        sourceSection: "Andrews 36.12",
        activeActionStemHasDistantPastCa: true,
        preteritAgentiveStemHasPreteritZeroPlusCaMatrix: true,
        activeActionSourceSubjectBecomesPossessor: true,
        preteritAgentiveSourceSubjectRemainsNncSubject: true,
        activeActionMeansActionResultOrCondition: true,
        preteritAgentiveNamesDoerOrStateEntrant: true,
        passiveActionDiffersFromPreteritPatientiveByActionVersusUndergoneEntity: true,
    }),
});

const LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson36-customary-present-agentive", andrewsSection: "36.1", category: "customary-present-agentive-overview", directiveEs: "El agentivo presente habitual tiene dos grados: reanalisis y nominalizacion plena.", engineSurface: "partial customary-agentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-customary-present-reanalysis", andrewsSection: "36.2", category: "customary-present-agentive-reanalysis", directiveEs: "El reanalisis conserva dyadas de CNV y deja ni como ultimo constituyente del tronco.", engineSurface: "diagnostic reanalysis frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson36-fully-nominalized-customary-present", andrewsSection: "36.3", category: "fully-nominalized-customary-present-agentive", directiveEs: "La nominalizacion plena cambia a conectores de CNN de clase ti 1-A y puede incrustarse en compuestos.", engineSurface: "partial generated customary-agentive continuations plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-agentive-contrast", andrewsSection: "36.4", category: "preterit-vs-customary-present-agentive", directiveEs: "La sinonimia puede ser espejismo de traduccion; el contraste temporal-semantic debe mantenerse visible en metadatos.", engineSurface: "diagnostic contrast frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson36-customary-present-patientive", andrewsSection: "36.5", category: "customary-present-patientive", directiveEs: "El patientivo presente habitual viene de pasiva, no toma posesivo, y expresa entidad apta o digna de ser tratada asi.", engineSurface: "partial patientive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-instrumentive", andrewsSection: "36.6", category: "instrumentive-nnc", directiveEs: "El instrumentivo usa dos fuentes: impersonal presente habitual para absolutivo y activa imperfecta para posesivo.", engineSurface: "partial instrumentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-present-agentive", andrewsSection: "36.7", category: "present-agentive", directiveEs: "El agentivo presente convierte el predicado indicativo presente y se restringe normalmente al absolutivo.", engineSurface: "partial present-agentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-future-agentive", andrewsSection: "36.8", category: "future-agentive", directiveEs: "El agentivo futuro es raro; el tronco restringido termina en z y el general usa matriz ca.", engineSurface: "partial future-agentive output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-action-nncs", andrewsSection: "36.9", category: "action-nnc-overview", directiveEs: "Las CNN de accion nombran accion, proceso, evento, estado resultante o resultado; no son una sola etiqueta superficial.", engineSurface: "diagnostic action overview frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson36-passive-action", andrewsSection: "36.10", category: "passive-action-nnc", directiveEs: "La accion pasiva posesiva viene de pasiva remota con ca; el absolutivo restringido usa matriz yo.", engineSurface: "partial passive-action output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-active-action", andrewsSection: "36.11", category: "active-action-first-type", directiveEs: "La accion activa nominalizada usa fuentes intransitivas o reflexivas remotas; el sujeto fuente se vuelve poseedor.", engineSurface: "partial active-action output plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson36-active-action-vs-preterit-agentive", andrewsSection: "36.12", category: "active-action-preterit-agentive-contrast", directiveEs: "Accion activa y agentivo preterito pueden sonar parecidos, pero difieren en estructura, clase, poseedor y significado.", engineSurface: "diagnostic contrast frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson36NominalizedVncSubsectionInventory() {
    return LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS),
    }));
}

function buildLesson36NominalizedVncPursuitFrame() {
    const subsectionInventory = getLesson36NominalizedVncSubsectionInventory();
    const customaryPresentAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME);
    const customaryPresentPatientiveFrame = cloneNominalizationLessonRecord(LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME);
    const instrumentiveFrame = cloneNominalizationLessonRecord(LESSON36_INSTRUMENTIVE_FRAME);
    const presentAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_PRESENT_AGENTIVE_FRAME);
    const futureAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_FUTURE_AGENTIVE_FRAME);
    const actionNncFrame = cloneNominalizationLessonRecord(LESSON36_ACTION_NNC_FRAME);
    const remainingGaps = [
        "Current Lesson 36 nominalized VNC routes are partial and do not complete all customary-present, present, future, patientive, instrumentive, passive-action, or active-action paradigms.",
        "Customary-present reanalysis versus full nominalization, rare possessive reanalysis, object-activation hybrids, and translation contrasts remain diagnostic.",
        "Instrumentive state-source exceptions, patientive passive variants, future-agentive rarity, and action-NNC restricted/general-use alternations need more Nawat/Pipil evidence.",
        "Complete nounstem class routing, lexicalized exceptions, and confirmed Nawat/Pipil examples remain evidence-needed.",
    ];
    const frame = {
        kind: "lesson-36-nominalized-vnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 36,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 36.1-36.12 against current nominalization boundary metadata, customary-present agentive reanalysis/full nominalization, customary-present patientives, instrumentives, present/future agentives, action NNCs, passive-action, active-action, and active-action versus preterit-agentive contrasts.",
                andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                result: "hit",
                correction: "Lesson 36 now records Andrews nominalized VNC architecture for customary-present agentive reanalysis and full nominalization, customary-present patientives, instrumentives, present and future agentives, action NNCs, passive-action and active-action sources, and contrastive boundaries while preserving current evidence gates.",
                andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        customaryPresentAgentiveFrame,
        customaryPresentPatientiveFrame,
        instrumentiveFrame,
        presentAgentiveFrame,
        futureAgentiveFrame,
        actionNncFrame,
        currentEngineBoundary: {
            nominalizationBoundaryMetadataImplemented: true,
            customaryAgentiveGenerationPartial: true,
            customaryPresentPatientiveGenerationPartial: true,
            instrumentiveGenerationPartial: true,
            presentAgentiveGenerationPartial: true,
            futureAgentiveGenerationPartial: true,
            passiveActionGenerationPartial: true,
            activeActionGenerationPartial: true,
            fullLesson36GenerationImplemented: false,
            finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-36-nominalized-vnc-pursuit-frame",
        unitKind: "nominalized-vnc-boundary",
        routeStage: "audit-lesson-36",
        structuralSource: "Andrews Lesson 36",
        andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 36.1-36.12",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            customaryPresentAgentiveFrame,
            customaryPresentPatientiveFrame,
            instrumentiveFrame,
            presentAgentiveFrame,
            futureAgentiveFrame,
            actionNncFrame,
        },
        stemFrame: {
            stemKind: "nominalized-vnc",
            customaryPresentAgentiveDegrees: customaryPresentAgentiveFrame.twoDegreesOfNominalization,
            patientiveSourceVoice: customaryPresentPatientiveFrame.sourceVoice,
            instrumentiveParadigmRequiresTwoStems: instrumentiveFrame.paradigmRequiresTwoDifferentNominalizedStems,
            futureAgentiveGeneralUseStem: futureAgentiveFrame.generalUseStem,
            actionTypes: actionNncFrame.types,
        },
        nuclearClauseFrame: {
            categoryTransition: "VNC -> NNC",
            sourceClauseKind: "CNV",
            targetClauseKind: "CNN",
            structuralNominalization: true,
            actionNncRestrictedUseStemIsCompounded: true,
        },
        participantFrame: {
            customaryPresentAgentiveRole: "agent",
            patientiveRole: customaryPresentPatientiveFrame.semanticRole,
            instrumentiveRole: instrumentiveFrame.semanticRole,
            actionNncRange: actionNncFrame.semanticRange,
            activeActionSourceSubjectBecomesPossessor: actionNncFrame.activeActionFrame.sourceSubjectTransformsToPossessor,
            preteritAgentiveSourceSubjectRemainsNncSubject: actionNncFrame.contrastFrame.preteritAgentiveSourceSubjectRemainsNncSubject,
        },
        targetContract: {
            metadataKind: "lesson-36-nominalized-vnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["nominalized-vnc-diagnostic-partial", "nominalized-vnc-needs-nawat-evidence"],
    });
}

const LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_nominalization.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS = Object.freeze([
    "Andrews Lesson 37.1",
    "Andrews Lesson 37.2",
    "Andrews Lesson 37.3",
    "Andrews Lesson 37.4",
    "Andrews Lesson 37.5",
    "Andrews Lesson 37.6",
    "Andrews Lesson 37.7",
    "Andrews Lesson 37.8",
    "Andrews Lesson 37.9",
]);

const LESSON37_DEVERBAL_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-37-deverbal-overview-frame",
    sourceSection: "Andrews 37.1",
    derivedFromVncCoreNotPredicate: true,
    sourceUnit: "VNC core",
    targetUnit: "deverbal nounstem",
    notMereVncReanalysis: true,
    notRelabeledConstituents: true,
    finiteOutputExpansionRequiresNawatEvidence: true,
});

const LESSON37_ACTIVE_ACTION_Z_FRAME = Object.freeze({
    kind: "lesson-37-active-action-z-frame",
    sourceSection: "Andrews 37.2",
    suffix: "z",
    nawatSuffix: "s",
    nounstemClass: "tli",
    activeActionSecondType: true,
    sourceCore: "future-tense verbcore",
    distinctFromFutureTenseMorph: true,
    possessorRepresentsResponsibleSourceSubject: true,
    subjectRestriction: "common nonanimate or nonspecific subject",
    normallyFollowsIFinalStem: true,
    aFinalUsesReplaciveImperfectiveI: true,
    fewTransitiveSources: true,
    nonIVowelExceptionsExist: true,
});

const LESSON37_ACTIVE_ACTION_LIZ_FRAME = Object.freeze({
    kind: "lesson-37-active-action-liz-frame",
    sourceSection: "Andrews 37.3",
    suffixalUnit: "liz",
    nawatSuffixalUnit: "lis",
    compoundSuffixParts: Object.freeze(["l", "i", "z"]),
    notHamperedByZRestrictions: true,
    addedToFutureTenseVerbcore: true,
    classCDeletesFinalAAndLengthensIO: true,
    classDKeepsFinalALength: true,
    classAEndingOKeepsLongVowel: true,
    transitiveSourcesUseProjectives: Object.freeze(["te", "tla"]),
    reflexiveSourceUsesShuntlineNe: true,
    supportiveInitialIDropsAfterTla: true,
    supportiveInitialIDropsSometimesAfterNe: true,
    replaciveImperfectivePatterns: Object.freeze([
        "ka -> ki",
        "wa variants",
        "si/ci -> xi",
        "ti -> chi optional",
        "root+ya deletes ya",
        "denominal ti/hui+ya may delete or keep ya by subtype",
    ]),
});

const LESSON37_LIZ_TRANSLATION_FRAME = Object.freeze({
    kind: "lesson-37-liz-translation-frame",
    sourceSection: "Andrews 37.4",
    wayOfDoingTranslationValue: true,
    natureOrAppearanceTranslationValue: true,
    translationValueIsDiagnosticNotSurfaceAuthority: true,
});

const LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME = Object.freeze({
    kind: "lesson-37-active-action-particulars-frame",
    sourceSection: "Andrews 37.5",
    compoundVerbstemSourcesAllowed: true,
    potentialPatientFrame: Object.freeze({
        sourceSection: "Andrews 37.5.2",
        potentialPatientValueAllowed: true,
        zLizCanNamePotentialPatient: true,
        intransitiveSourceCanBeHomophonousWithActiveAction: true,
        thirdSingularCanBeAmbiguous: true,
        transitivePotentialPatientLacksObjectPronoun: true,
        activeActionTransitiveKeepsObjectPronoun: true,
        doubleObjectReflexiveExceptionStaysActiveAction: true,
        doubleObjectReflexiveCanDropProjectiveObject: true,
    }),
    impersonalActionFrame: Object.freeze({
        sourceSection: "Andrews 37.5.3",
        lizCanDeriveActionFromImpersonalCore: true,
        sourceCanUseNonactiveSuffixOrImpersonalTla: true,
        shortZSubtypeNotLicensed: true,
    }),
    compoundEmbedFrame: Object.freeze({
        sourceSection: "Andrews 37.5.4",
        activeActionNounstemCanEmbedInVnc: true,
        activeActionNounstemCanEmbedInNnc: true,
        finiteMatrixRequiresNawatEvidence: true,
    }),
    affectiveAssimilationFrame: Object.freeze({
        sourceSection: "Andrews 37.5.5",
        zLizPlusTzinAssimilationExists: true,
        outputRequiresConfirmedNawatRealization: true,
    }),
});

const LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME = Object.freeze({
    kind: "lesson-37-active-passive-action-contrast-frame",
    sourceSection: "Andrews 37.6",
    activeActionPossessorRepresentsAgent: true,
    passiveActionPossessorRepresentsPatient: true,
    possessorRoleDistinguishesNearSurfacePairs: true,
});

const LESSON37_MULTIPLE_NUCLEUS_FRAME = Object.freeze({
    kind: "lesson-37-multiple-nucleus-frame",
    sourceSection: "Andrews 37.7",
    vncCanServeAsSupplement: true,
    activeActionNncCanServeAsSupplement: true,
    supplementaryObjectConstruction: true,
    sentenceLevelDiagnosticNotWordGeneration: true,
});

const LESSON37_PATIENTIVE_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-37-patientive-overview-frame",
    sourceSection: "Andrews 37.8",
    deverbalPatientiveBroaderThanNominalizedPreteritPatientive: true,
    mayDeriveFromIntransitiveOrTransitiveSources: true,
    semanticRange: Object.freeze(["capable", "been", "become", "product", "result"]),
    highGenerality: true,
    sourceFamilies: Object.freeze([
        "passive-core",
        "impersonal-core",
        "perfective-active-core",
        "imperfective-active-core",
        "verb-root-or-stock",
    ]),
    passiveAndImpersonalDistinguishedByNonspecificObjectPronouns: true,
    nonactiveSourceSuffixFamilies: Object.freeze(["lo", "lo-hua", "o", "o-hua", "hua", "hua-lo"]),
    nonactiveTruncationAndClassEffectsMatter: true,
    exactRulesCanBeIdiosyncratic: true,
});

const LESSON37_PASSIVE_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-37-passive-patientive-frame",
    sourceSection: "Andrews 37.9",
    passiveSourceCannotHaveIntransitiveUltimateSource: true,
    sourceUnit: "passive VNC core",
    includesNonspecificProjectiveOrShuntlineReflexiveFromPassiveSource: true,
    noObjectPassiveSourcesCanDeleteLoOOrHua: true,
    sourceSuffixDeletionFamilies: Object.freeze(["lo", "o", "hua"]),
    irregularNonactiveSourceWarning: true,
    culturalSemanticPerspectiveWarning: true,
    reflexivePassiveSourceUsesNe: true,
    doubleProjectivePassiveKeepsOnlyOneObjectPronoun: true,
    teMayDeleteInDoubleProjectivePassive: true,
});

const LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson37-deverbal-nounstem-overview", andrewsSection: "37.1", category: "deverbal-nounstem-overview", directiveEs: "El tronco nominal deverbal deriva del nucleo de la CNV, no de un simple predicado CNV reetiquetado.", engineSurface: "diagnostic deverbal overview frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson37-active-action-z", andrewsSection: "37.2", category: "active-action-z", directiveEs: "La accion activa de segundo tipo usa z estructural, clase tli, fuente futura y restricciones de fuente; Nawat realiza la letra como s.", engineSurface: "partial sustantivo-verbal s subtype plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson37-active-action-liz", andrewsSection: "37.3", category: "active-action-liz", directiveEs: "Liz se agrega al nucleo futuro y conserva reglas de clase, proyectivos, reflexivo ne y alternancias de imperfectivo reemplazante.", engineSurface: "partial sustantivo-verbal lis subtype plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson37-liz-translation-value", andrewsSection: "37.4", category: "liz-translation-value", directiveEs: "Liz puede glosarse como modo, naturaleza o apariencia; la traduccion no autoriza superficie.", engineSurface: "diagnostic translation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson37-active-action-particulars", andrewsSection: "37.5", category: "active-action-particulars", directiveEs: "Los particulares incluyen fuentes compuestas, valor de paciente potencial, accion impersonal, incrustacion en compuestos y asimilacion con tzin.", engineSurface: "partial potential/impersonal action routes plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson37-active-vs-passive-action", andrewsSection: "37.6", category: "active-passive-action-contrast", directiveEs: "En accion activa el poseedor representa agente; en accion pasiva representa paciente.", engineSurface: "diagnostic possessor-role contrast frame", implementationState: "partial", redirectAction: "reframe-metadata" }),
    Object.freeze({ id: "lesson37-multiple-nucleus-action-nnc", andrewsSection: "37.7", category: "multiple-nucleus-action-nnc", directiveEs: "La CNN de accion activa puede funcionar como suplemento de nucleo multiple; eso es sintaxis, no generacion de palabra.", engineSurface: "diagnostic sentence-layer frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson37-patientive-nounstem-overview", andrewsSection: "37.8", category: "patientive-nounstem-overview", directiveEs: "El patientivo deverbal tiene cinco familias de fuente y significados amplios de capacidad, resultado o estado.", engineSurface: "partial patientiveFamilyProfile plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson37-passive-patientive", andrewsSection: "37.9", category: "passive-patientive", directiveEs: "El patientivo pasivo viene de nucleo pasivo, bloquea fuentes ultimas intransitivas y conserva solo los objetos licenciados por la fuente.", engineSurface: "partial passive patientivo generation gates plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function getLesson37DeverbalNounstemSubsectionInventory() {
    return LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS),
    }));
}

function buildLesson37DeverbalNounstemPursuitFrame() {
    const subsectionInventory = getLesson37DeverbalNounstemSubsectionInventory();
    const deverbalOverviewFrame = cloneNominalizationLessonRecord(LESSON37_DEVERBAL_OVERVIEW_FRAME);
    const activeActionZFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_Z_FRAME);
    const activeActionLizFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_LIZ_FRAME);
    const lizTranslationFrame = cloneNominalizationLessonRecord(LESSON37_LIZ_TRANSLATION_FRAME);
    const activeActionParticularsFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME);
    const activePassiveActionContrastFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME);
    const multipleNucleusFrame = cloneNominalizationLessonRecord(LESSON37_MULTIPLE_NUCLEUS_FRAME);
    const patientiveOverviewFrame = cloneNominalizationLessonRecord(LESSON37_PATIENTIVE_OVERVIEW_FRAME);
    const passivePatientiveFrame = cloneNominalizationLessonRecord(LESSON37_PASSIVE_PATIENTIVE_FRAME);
    const remainingGaps = [
        "Current Lesson 37 deverbal nounstem routes are partial and do not complete active-action z/liz, potential-patient, impersonal-action, compound-embed, multiple-nucleus, or passive-patientive coverage.",
        "Active-action z/liz generation has Nawat s/lis support, but full fixture-backed source restrictions, a-final replacement, non-i vowel exceptions, tzin assimilation, and confirmed Nawat/Pipil examples remain evidence-needed.",
        "Potential-patient and impersonal-action routes are implemented only for current data-backed paths and must not be treated as complete action-noun coverage.",
        "Passive-patientive gates are partial; nonactive suffix deletion, irregular passive source warnings, cultural semantic perspective, and double-projective alternatives need continued evidence and tests.",
    ];
    const frame = {
        kind: "lesson-37-deverbal-nounstem-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 37,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 37.1-37.9 against current nominalization boundary metadata, active-action z/liz generation, translation boundaries, potential-patient and impersonal-action values, active/passive action contrasts, multiple-nucleus supplements, patientive source families, and passive-patientive source gates.",
                andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                result: "hit",
                correction: "Lesson 37 now records Andrews deverbal nounstem architecture, active-action z/liz, liz translation values, potential-patient and impersonal-action particulars, active/passive action possessor-role contrast, multiple-nucleus supplement use, patientive source families, and passive-patientive source gates while preserving current evidence boundaries.",
                andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
                feedbackRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        deverbalOverviewFrame,
        activeActionZFrame,
        activeActionLizFrame,
        lizTranslationFrame,
        activeActionParticularsFrame,
        activePassiveActionContrastFrame,
        multipleNucleusFrame,
        patientiveOverviewFrame,
        passivePatientiveFrame,
        currentEngineBoundary: {
            nominalizationBoundaryMetadataImplemented: true,
            activeActionSLisGenerationPartial: true,
            potentialPatientGenerationPartial: true,
            impersonalActionGenerationPartial: true,
            passivePatientiveGenerationPartial: true,
            multipleNucleusSupplementGenerationImplemented: false,
            fullLesson37GenerationImplemented: false,
            finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-37-deverbal-nounstem-pursuit-frame",
        unitKind: "deverbal-nounstem-boundary",
        routeStage: "audit-lesson-37",
        structuralSource: "Andrews Lesson 37",
        andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 37.1-37.9",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
            activeActionRuleLetters: Object.freeze({ classical: Object.freeze(["z", "liz"]), nawat: Object.freeze(["s", "lis"]) }),
        },
        morphBoundaryFrame: {
            deverbalOverviewFrame,
            activeActionZFrame,
            activeActionLizFrame,
            lizTranslationFrame,
            activeActionParticularsFrame,
            activePassiveActionContrastFrame,
            multipleNucleusFrame,
            patientiveOverviewFrame,
            passivePatientiveFrame,
        },
        stemFrame: {
            stemKind: "deverbal-nounstem",
            activeActionSources: Object.freeze(["future-tense verbcore", "impersonal core"]),
            activeActionRuleSuffixes: Object.freeze(["z", "liz"]),
            activeActionNawatSuffixes: Object.freeze(["s", "lis"]),
            patientiveSourceFamilies: patientiveOverviewFrame.sourceFamilies,
            passivePatientiveSourceUnit: passivePatientiveFrame.sourceUnit,
        },
        nuclearClauseFrame: {
            categoryTransition: "VNC core -> NNC nounstem",
            sourceClauseKind: "CNV",
            targetClauseKind: "CNN",
            deverbalDerivation: true,
            simplePredicateReanalysis: false,
            multipleNucleusUseIsSentenceLevel: true,
        },
        participantFrame: {
            activeActionPossessorRole: "agent",
            passiveActionPossessorRole: "patient",
            potentialPatientDropsObjectPronoun: activeActionParticularsFrame.potentialPatientFrame.transitivePotentialPatientLacksObjectPronoun,
            passivePatientiveKeepsOnlyLicensedObjects: passivePatientiveFrame.doubleProjectivePassiveKeepsOnlyOneObjectPronoun,
        },
        targetContract: {
            metadataKind: "lesson-37-deverbal-nounstem-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["deverbal-nounstem-diagnostic-partial", "deverbal-nounstem-needs-nawat-evidence"],
    });
}

const LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_nominalization.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 38.1",
    "Andrews Lesson 38.1.1",
    "Andrews Lesson 38.1.1.a",
    "Andrews Lesson 38.1.1.b",
    "Andrews Lesson 38.1.1.c",
    "Andrews Lesson 38.1.1.d",
    "Andrews Lesson 38.1.2",
    "Andrews Lesson 38.1.3",
    "Andrews Lesson 38.1.3.a",
    "Andrews Lesson 38.1.3.b",
    "Andrews Lesson 38.1.3.c",
    "Andrews Lesson 38.1.4",
    "Andrews Lesson 38.1.4.a",
    "Andrews Lesson 38.1.4.b",
    "Andrews Lesson 38.1.4.c",
    "Andrews Lesson 38.1.5",
    "Andrews Lesson 38.1.6",
    "Andrews Lesson 38.2",
    "Andrews Lesson 38.2.1",
    "Andrews Lesson 38.2.2",
]);

const LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-38-impersonal-patientive-overview-frame",
    sourceSection: "Andrews 38.1",
    sourceCore: "impersonal VNC core",
    sameFormationAsPassivePatientiveExceptSourceVoice: true,
    sourceVoiceDistinctionControlsObjectMaterial: true,
    nonspecificProjectiveOrShuntlineReflexiveDependsOnSource: true,
    passiveAndImpersonalMustNotBeCollapsed: true,
});

const LESSON38_INTRANSITIVE_SOURCE_FRAME = Object.freeze({
    kind: "lesson-38-intransitive-source-frame",
    sourceSection: "Andrews 38.1.1",
    sourceKind: "intransitive active source",
    agentiveNamesDoerPatientiveNamesResult: true,
    participleAnalogyIsTranslationOnly: true,
    patientiveNounstemsAreEntitiesInNncs: true,
    loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.a",
        nonactiveSuffix: "lo",
        doublyImpersonalSourcesPossible: true,
        triplyImpersonalSourcesPossible: true,
        rootPlusYaMayUseRootNotStem: true,
        irregularReductionWarningsPossible: true,
    }),
    oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.b",
        nonactiveSuffixes: Object.freeze(["o", "o-hua"]),
        resultEntityReadingsCommon: true,
        doublyImpersonalSourcesPossible: true,
        soundShiftWarningsPossible: true,
    }),
    huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.c",
        nonactiveSuffix: "hua",
        deletesHua: true,
        longIBecomesShortIWhenHuaDeleted: true,
        soundShiftWarningsPossible: true,
    }),
    huaLoSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.d",
        nonactiveSuffix: "hua-lo",
        sourceBuiltOnHuaLo: true,
    }),
});

const LESSON38_REFLEXIVE_SOURCE_FRAME = Object.freeze({
    kind: "lesson-38-reflexive-source-frame",
    sourceSection: "Andrews 38.1.2",
    sourceKind: "transitive active source with reflexive object",
    reflexiveObjectUsesShuntlineNe: true,
    hardToDistinguishFromPassiveWithoutProjectiveObject: true,
    projectiveObjectClarifiesImpersonalVsPassive: true,
});

const LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME = Object.freeze({
    kind: "lesson-38-projective-nonhuman-source-frame",
    sourceSection: "Andrews 38.1.3",
    sourceKind: "transitive active source with projective tla or te+tla",
    directObjectMustBeNonhuman: true,
    representedByMainlineTlaOrShuntlineTla: true,
    tePlusTlaKeepsShuntlineTlaForNonhumanPatient: true,
    loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.a",
        nonactiveSuffix: "lo",
        rareYaDeletionBeforeLo: true,
        fullYaStemAlternativeCanExist: true,
        contrastsWithPassivePatientive: true,
    }),
    oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.b",
        nonactiveSuffix: "o",
        contrastsWithPassivePatientive: true,
    }),
    huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.c",
        nonactiveSuffix: "hua",
        vowelBeforeHuaShortensUnlessLongInActiveStem: true,
        finalAReplacedByI: true,
        humanObjectHomonymsPossible: true,
    }),
});

const LESSON38_PROJECTIVE_TE_SOURCE_FRAME = Object.freeze({
    kind: "lesson-38-projective-te-source-frame",
    sourceSection: "Andrews 38.1.4",
    sourceKind: "single-object active source with human te",
    impersonalPatientiveDoesNotContainTe: true,
    usesImpersonalTlaPrefix: true,
    sourceIsImpersonalizedPassiveNotImpersonalizedActive: true,
    homonymsWithNonhumanTlaSourcesPossible: true,
    exceptionalHumanTePatientivesPossible: true,
    loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.a",
        nonactiveSuffix: "lo",
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"]),
    }),
    oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.b",
        nonactiveSuffix: "o",
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"]),
    }),
    huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.c",
        nonactiveSuffix: "hua",
        longIBecomesShortIWhenHuaDeleted: true,
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"]),
    }),
});

const LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME = Object.freeze({
    kind: "lesson-38-human-nonhuman-contrast-frame",
    sourceSection: "Andrews 38.1.5",
    applicativeHumanNonhumanObjectContrastPossible: true,
    tlaCanNameHumanEntityInImpersonalizedPassivePattern: true,
    teCanNameNonhumanEntityAsAnomalousPattern: true,
    sameVerbcoreCanYieldContrastivePatientives: true,
    contrastCanAlsoReflectImpersonalSingleObjectVsPassiveDoubleObject: true,
    translationMayMislead: true,
});

const LESSON38_TRANSLATION_OVERLAP_FRAME = Object.freeze({
    kind: "lesson-38-translation-overlap-frame",
    sourceSection: "Andrews 38.1.6",
    impersonalPatientiveAndActiveActionCanShareTranslationValue: true,
    sharedTranslationDoesNotMeanSameStructure: true,
    translationValueIsDiagnosticNotSurfaceAuthority: true,
});

const LESSON38_COMPOUND_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-38-compound-patientive-frame",
    sourceSection: "Andrews 38.2",
    passiveAndImpersonalPatientivesCanBeCompoundInTwoWays: true,
    compoundSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.2.1",
        sourceMayBeCompoundVerbstem: true,
        adverbialEmbedUsuallyTranslatesStraightforwardly: true,
        embeddedObjectTranslationCanReverseGovernedToGoverningRelation: true,
        objectEmbedRequiresTranslationCaution: true,
        matrixAndEmbedMustRemainDistinct: true,
    }),
    compoundMatrixFrame: Object.freeze({
        sourceSection: "Andrews 38.2.2",
        deverbalNounstemCanBeMatrixOfCompoundNounstem: true,
        patientiveAsEmbedDeferredToLesson39Point6: true,
        compoundNounstemGenerationRequiresNawatEvidence: true,
    }),
});

const LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson38-impersonal-patientive-overview", andrewsSection: "38.1", category: "impersonal-patientive-overview", directiveEs: "El patientivo impersonal toma como fuente el nucleo de una CNV impersonal y no debe colapsarse con el pasivo.", engineSurface: "partial impersonal patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-intransitive-active-source", andrewsSection: "38.1.1", category: "intransitive-active-source", directiveEs: "Con fuente intransitiva, el agentivo nombra hacedor y el patientivo nombra resultado; ambos son entidades en CNN.", engineSurface: "partial impersonal patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-intransitive-lo-source", andrewsSection: "38.1.1.a", category: "intransitive-lo-source", directiveEs: "La fuente con lo puede ser doble o triplemente impersonal; algunos troncos raiz+ya usan la raiz, no todo el tronco.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-intransitive-o-source", andrewsSection: "38.1.1.b", category: "intransitive-o-source", directiveEs: "La fuente con o u o-hua produce lecturas de resultado y puede llevar cambios fonicos o doble impersonalidad.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-intransitive-hua-source", andrewsSection: "38.1.1.c", category: "intransitive-hua-source", directiveEs: "La fuente con hua borra hua; i larga puede realizarse como i corta y los cambios fonicos quedan como diagnostico.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-intransitive-hua-lo-source", andrewsSection: "38.1.1.d", category: "intransitive-hua-lo-source", directiveEs: "La fuente con hua-lo se conserva como subfamilia impersonal separada.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-reflexive-source", andrewsSection: "38.1.2", category: "reflexive-source", directiveEs: "La fuente transitiva reflexiva usa ne de linea desviada; sin proyectivo puede parecerse al patientivo pasivo.", engineSurface: "partial reflexive patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-projective-nonhuman-source", andrewsSection: "38.1.3", category: "projective-nonhuman-source", directiveEs: "La fuente con ta o te+ta debe tener objeto no humano; el patientivo conserva ta principal o ta desviada.", engineSurface: "partial impersonal patientivo projective route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-projective-nonhuman-lo-source", andrewsSection: "38.1.3.a", category: "projective-nonhuman-lo-source", directiveEs: "La subfamilia con lo permite borrado raro de ya y debe contrastarse con patientivos pasivos homofonos.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-projective-nonhuman-o-source", andrewsSection: "38.1.3.b", category: "projective-nonhuman-o-source", directiveEs: "La subfamilia con o mantiene el contraste con patientivos pasivos de fuente correspondiente.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-projective-nonhuman-hua-source", andrewsSection: "38.1.3.c", category: "projective-nonhuman-hua-source", directiveEs: "La subfamilia con hua acorta la vocal anterior salvo vocal larga fuente y reemplaza a final por i.", engineSurface: "diagnostic nonactive suffix-source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-projective-te-source", andrewsSection: "38.1.4", category: "projective-human-te-source", directiveEs: "Con te humano de un solo objeto, el patientivo impersonal no lleva te; usa ta impersonal desde un pasivo impersonalizado.", engineSurface: "partial te-to-ta patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-projective-te-lo-source", andrewsSection: "38.1.4.a", category: "projective-te-lo-source", directiveEs: "La subfamilia con lo debe registrar la secuencia nucleo activo, pasivo, pasivo impersonalizado, patientivo impersonal.", engineSurface: "diagnostic source-sequence frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-projective-te-o-source", andrewsSection: "38.1.4.b", category: "projective-te-o-source", directiveEs: "La subfamilia con o conserva la misma secuencia y no autoriza retener te como salida normal.", engineSurface: "diagnostic source-sequence frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-projective-te-hua-source", andrewsSection: "38.1.4.c", category: "projective-te-hua-source", directiveEs: "La subfamilia con hua borra hua y registra i larga como i corta al borrar.", engineSurface: "diagnostic source-sequence frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson38-human-nonhuman-contrast", andrewsSection: "38.1.5", category: "human-nonhuman-contrast", directiveEs: "Algunas fuentes aplicativas contrastan humano/no humano; las formas con te son anomalas y no deben normalizarse.", engineSurface: "diagnostic contrast frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson38-translation-overlap", andrewsSection: "38.1.6", category: "translation-overlap", directiveEs: "Un patientivo impersonal y una accion activa pueden compartir traduccion sin compartir estructura.", engineSurface: "diagnostic translation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson38-compound-patientive", andrewsSection: "38.2", category: "compound-patientive", directiveEs: "Los patientivos pasivos e impersonales pueden ser compuestos de fuente compuesta o matrices de compuestos nominales.", engineSurface: "partial patientive compound continuations plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-compound-source", andrewsSection: "38.2.1", category: "compound-source-patientive", directiveEs: "La fuente puede ser un tronco verbal compuesto; los objetos incrustados exigen cautela de traduccion y no invierten el analisis.", engineSurface: "partial compound-source patientive metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson38-compound-matrix", andrewsSection: "38.2.2", category: "compound-matrix-patientive", directiveEs: "El tronco deverbal puede servir como matriz de un compuesto nominal; el patientivo como incrustado queda para 39.6.", engineSurface: "partial compound-nounstem continuation metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function getLesson38ImpersonalPatientiveSubsectionInventory() {
    return LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS),
    }));
}

function buildLesson38ImpersonalPatientivePursuitFrame() {
    const subsectionInventory = getLesson38ImpersonalPatientiveSubsectionInventory();
    const impersonalPatientiveOverviewFrame = cloneNominalizationLessonRecord(LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME);
    const intransitiveSourceFrame = cloneNominalizationLessonRecord(LESSON38_INTRANSITIVE_SOURCE_FRAME);
    const reflexiveSourceFrame = cloneNominalizationLessonRecord(LESSON38_REFLEXIVE_SOURCE_FRAME);
    const projectiveNonhumanSourceFrame = cloneNominalizationLessonRecord(LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME);
    const projectiveTeSourceFrame = cloneNominalizationLessonRecord(LESSON38_PROJECTIVE_TE_SOURCE_FRAME);
    const humanNonhumanContrastFrame = cloneNominalizationLessonRecord(LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME);
    const translationOverlapFrame = cloneNominalizationLessonRecord(LESSON38_TRANSLATION_OVERLAP_FRAME);
    const compoundPatientiveFrame = cloneNominalizationLessonRecord(LESSON38_COMPOUND_PATIENTIVE_FRAME);
    const remainingGaps = [
        "Current Lesson 38 impersonal-patientive routes are partial and do not complete every nonactive suffix source family, human/nonhuman contrast, exceptional te patientive, or compound patientive pattern.",
        "Intransitive root-plus-ya source selection, lo/o/o-hua/hua/hua-lo source details, vowel shortening, final-a replacement, and sound-shift warnings remain diagnostic or evidence-needed.",
        "Projective te-to-ta routing is implemented for current paths, but anomalous te contrasts and homonym disambiguation require Nawat/Pipil evidence.",
        "Compound patientive source and matrix behavior is limited to current data-backed continuations and must not be treated as full compound-patientive generation.",
    ];
    const frame = {
        kind: "lesson-38-impersonal-patientive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 38,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 38.1-38.2 against current patientive family metadata, impersonal patientive source-core routing, intransitive source families, reflexive shuntline ne, projective nonhuman tla, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap, and compound patientive nounstem boundaries.",
                andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                result: "hit",
                correction: "Lesson 38 now records Andrews impersonal patientive architecture, intransitive source families, reflexive shuntline behavior, nonhuman projective routing, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap with active-action nouns, and compound patientive boundaries while preserving evidence gates.",
                andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        impersonalPatientiveOverviewFrame,
        intransitiveSourceFrame,
        reflexiveSourceFrame,
        projectiveNonhumanSourceFrame,
        projectiveTeSourceFrame,
        humanNonhumanContrastFrame,
        translationOverlapFrame,
        compoundPatientiveFrame,
        currentEngineBoundary: {
            nominalizationBoundaryMetadataImplemented: true,
            patientiveFamilyProfileImplemented: true,
            impersonalPatientiveGenerationPartial: true,
            reflexiveNeGenerationPartial: true,
            projectiveTaGenerationPartial: true,
            projectiveTeToTaGenerationPartial: true,
            compoundPatientiveContinuationPartial: true,
            fullLesson38GenerationImplemented: false,
            finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-38-impersonal-patientive-pursuit-frame",
        unitKind: "impersonal-patientive-boundary",
        routeStage: "audit-lesson-38",
        structuralSource: "Andrews Lesson 38",
        andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 38.1-38.2",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
            projectiveBridge: Object.freeze({ classical: "tla", nawat: "ta" }),
        },
        morphBoundaryFrame: {
            impersonalPatientiveOverviewFrame,
            intransitiveSourceFrame,
            reflexiveSourceFrame,
            projectiveNonhumanSourceFrame,
            projectiveTeSourceFrame,
            humanNonhumanContrastFrame,
            translationOverlapFrame,
            compoundPatientiveFrame,
        },
        stemFrame: {
            stemKind: "impersonal-patientive-nounstem",
            sourceCore: impersonalPatientiveOverviewFrame.sourceCore,
            nonactiveSourceFamilies: Object.freeze(["lo", "o", "o-hua", "hua", "hua-lo"]),
            projectiveNonhumanObject: "tla",
            projectiveTeHumanRoute: "impersonalized passive with tla",
            compoundPatientiveModes: Object.freeze(["compound-verbstem-source", "deverbal-nounstem-as-compound-matrix"]),
        },
        nuclearClauseFrame: {
            categoryTransition: "impersonal VNC core -> patientive NNC nounstem",
            sourceClauseKind: "CNV",
            targetClauseKind: "CNN",
            patientiveNounstemsOccurInNncs: true,
            compoundTranslationDoesNotInvertAnalysis: true,
        },
        participantFrame: {
            semanticRole: "patient/result entity",
            reflexiveWitness: "ne",
            nonhumanProjectiveWitness: "tla",
            humanTeSourceDoesNotSurfaceAsTeNormally: true,
            humanNonhumanContrastIsDiagnostic: true,
        },
        targetContract: {
            metadataKind: "lesson-38-impersonal-patientive-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["impersonal-patientive-diagnostic-partial", "impersonal-patientive-needs-nawat-evidence"],
    });
}

const LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_nominalization.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS = Object.freeze([
    "Andrews Lesson 39.1",
    "Andrews Lesson 39.1.1",
    "Andrews Lesson 39.1.2",
    "Andrews Lesson 39.1.3",
    "Andrews Lesson 39.2",
    "Andrews Lesson 39.2.1",
    "Andrews Lesson 39.2.2",
    "Andrews Lesson 39.3",
    "Andrews Lesson 39.3.1",
    "Andrews Lesson 39.3.2",
    "Andrews Lesson 39.3.3",
    "Andrews Lesson 39.3.4",
    "Andrews Lesson 39.3.5",
    "Andrews Lesson 39.3.6",
    "Andrews Lesson 39.4",
    "Andrews Lesson 39.4.1",
    "Andrews Lesson 39.4.2",
    "Andrews Lesson 39.4.3",
    "Andrews Lesson 39.4.4",
    "Andrews Lesson 39.5",
    "Andrews Lesson 39.6",
    "Andrews Lesson 39.7",
    "Andrews Lesson 39.8",
    "Andrews Lesson 39.9",
]);

const LESSON39_PERFECTIVE_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-39-perfective-patientive-frame",
    sourceSection: "Andrews 39.1",
    sourceCore: "perfective active verbstem",
    modeledAfterPassiveOrImpersonalPatientive: true,
    belongsToTliClass: true,
    allowedPerfectiveCoreEndingsNawat: Object.freeze(["w", "k", "kw", "s", "sh", "n", "glottal", "l", "tz"]),
    passiveAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.1.1",
        transitiveSourceCanUsePassiveAnalogy: true,
        objectPronounsAppropriateToPassiveSource: true,
    }),
    impersonalAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.1.2",
        transitiveOrIntransitiveSourceCanUseImpersonalAnalogy: true,
        teMayRouteToTlaByNonactiveAnalogy: true,
    }),
    compoundSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.1.3",
        sourceVerbstemMayBeCompound: true,
        ownerhoodMatrixHuaRestrictedToAcquiredRelations: true,
        ownerhoodMatrixYoaHasLimitedExamples: true,
        honorificAndDenominalEnvironmentsCommon: true,
    }),
});

const LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-39-imperfective-patientive-frame",
    sourceSection: "Andrews 39.2",
    sourceCore: "imperfective active stem",
    modeledAfterPassiveOrImpersonalPatientive: true,
    belongsToTiClass: true,
    classCUsesTruncatedLongOOrI: true,
    classDUsesFinalLongA: true,
    passiveAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.2.1",
        transitiveSourceCanUsePassiveAnalogy: true,
        projectiveObjectAbsentUnlessPassiveCoreContainsIt: true,
        patientiveGlossCanBeStrainedOrAgentiveByWorldview: true,
    }),
    impersonalAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.2.2",
        transitiveOrIntransitiveSourceCanUseImpersonalAnalogy: true,
        deverbalAnalysisCanBlockCompoundMatrixMisread: true,
    }),
});

const LESSON39_CHARACTERISTIC_PROPERTY_FRAME = Object.freeze({
    kind: "lesson-39-characteristic-property-frame",
    sourceSection: "Andrews 39.3",
    sourceMatrix: "*tla-(-yo-a)",
    nounstemMatrix: "(-yo)-tl",
    meansPertainingOrCharacterizedBy: true,
    yAssimilationApplies: true,
    possessiveStateLosesOLengthBeforeZeroDyad: true,
    stateQualityFrame: Object.freeze({
        sourceSection: "Andrews 39.3.1",
        mayNameInherentStateOrQuality: true,
        embedsMayBePassivePatientivePreteritAgentiveOwnerhoodOrOtherNounstems: true,
    }),
    pertainingFrame: Object.freeze({
        sourceSection: "Andrews 39.3.2",
        mayNameThingPertainingToEmbed: true,
        traditionalMisspellingCanMisleadSourceAnalysis: true,
    }),
    intrinsicFrame: Object.freeze({
        sourceSection: "Andrews 39.3.3",
        mayNameIntrinsicOrEssentialAspect: true,
        derivedStemCanTakeOverLostEmbedMeaning: true,
        possessiveStateCanOccasionallyUseEmbedInsteadOfCompound: true,
        generalUsePossessiveStemCanBeIncorporated: true,
    }),
    organicPossessionFrame: Object.freeze({
        sourceSection: "Andrews 39.3.4",
        organicPossessionOnlyPossessiveState: true,
        adventitiousPossessionUsesNormalNounstem: true,
        organicPossessionUsesYoMatrix: true,
        contrastAppliesToPartWholeRelationsButNotEveryBodyPart: true,
        nonLivingIntegralPartsCanParticipate: true,
    }),
    preteritAgentiveEmbedFrame: Object.freeze({
        sourceSection: "Andrews 39.3.5",
        preteritAgentiveCanFillEmbed: true,
        absolutiveStateMustNotBeMisreadAsPossessiveState: true,
    }),
    actionNounEmbedFrame: Object.freeze({
        sourceSection: "Andrews 39.3.6",
        passiveActionCanFillEmbed: true,
        activeActionFirstTypeCanFillEmbed: true,
        homophonousAbsolutiveStateNncsCanBeAmbiguous: true,
        derivationalSequenceCanBeMultiStep: true,
    }),
});

const LESSON39_ROOT_STOCK_PATIENTIVE_FRAME = Object.freeze({
    kind: "lesson-39-root-stock-patientive-frame",
    sourceSection: "Andrews 39.4",
    sourceCore: "destockal root or stock",
    exactVariantChoiceNotRecoverableFromSurfaceGrammar: true,
    tliClassOutputRequired: true,
    niDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.1",
        suffixChoices: Object.freeze(["c", "x", "z", "ch"]),
        stockFormativeLongVowelShortens: true,
        irregularFusedVowelKeepsLength: true,
        frequentativeDestockalCanDerivePatientive: true,
        frequentativeCaMatrixCanDerivePatientive: true,
        compoundCaSourceCanDerivePatientive: true,
    }),
    huaDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.2",
        normallyAddsCToStock: true,
        eFormativeOftenMeansSomewhatCharacteristic: true,
        downgradedNounstemCanServeAsRoot: true,
        chOrBareStockAlternativesPossible: true,
    }),
    ihuiAhuiDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.3",
        canAddXOrCToStock: true,
        rootBasedPatientivePossible: true,
        causativeOaDerivativeRequiresTlaObjectPronoun: true,
        sourceDirectionCanBeUncertainWithoutObjectPronounEvidence: true,
    }),
    agentiveMeaningFrame: Object.freeze({
        sourceSection: "Andrews 39.4.4",
        stockCanBeUsedWithAgentiveMeaning: true,
        unknownSourceCanStillShowVerbObjectPronouns: true,
    }),
});

const LESSON39_MULTIPLE_DERIVATION_FRAME = Object.freeze({
    kind: "lesson-39-multiple-derivation-frame",
    sourceSection: "Andrews 39.5",
    verbsMayAllowMoreThanOnePatientiveProcedure: true,
    procedures: Object.freeze(["passive-core", "impersonal-core", "perfective-active-core", "imperfective-active-core", "root-or-stock"]),
    translationsOftenSynonymousButMeaningsNeedNotBe: true,
    idiomaticRestrictionsCanChangeTranslationValue: true,
    doNotMergeOutputsByTranslation: true,
});

const LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME = Object.freeze({
    kind: "lesson-39-patientive-compound-embed-frame",
    sourceSection: "Andrews 39.6",
    patientiveNounstemCanEmbedInNominalCompound: true,
    patientiveNounstemCanEmbedInVerbalCompound: true,
    derivationalHistoryControlsShapeAndMeaning: true,
    cannotInferCompoundFromFinalSurfaceAlone: true,
});

const LESSON39_INCORPORATED_COMPLEMENT_FRAME = Object.freeze({
    kind: "lesson-39-incorporated-complement-frame",
    sourceSection: "Andrews 39.7",
    patientiveNounstemCanBeObjectComplement: true,
    absolutiveSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.7.1",
        discardedSubjectSameReferentAsMatrixObject: true,
        matrixFamilies: Object.freeze(["perception", "section-30-15-matrices", "tlani"]),
        yeMatrixCompoundEmbedPossible: true,
        tlaniMatrixOnlyInMatrixSubposition: true,
    }),
    possessiveSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.7.2",
        possessorPronounTransformsToMainlineObjectPronoun: true,
        singleObjectMatrixCanInflateToDoubleObjectWithoutSuffix: true,
        violatesValencePrinciple: true,
        typeThreeCausativeUsesMatrixVerbNotSuffix: true,
        sourceReciprocalBecomesShuntlineWhenCausativeObjectIsMainline: true,
    }),
});

const LESSON39_INCORPORATED_OBJECT_FRAME = Object.freeze({
    kind: "lesson-39-incorporated-object-frame",
    sourceSection: "Andrews 39.8",
    patientiveNounstemCanBeIncorporatedObject: true,
    matrices: Object.freeze(["tla-(tlani)", "tla-(ih-tlani)", "tla-(tem-o-a)"]),
    possessorPronounTransformsToApplicativeObject: true,
    matrixTransitiveForceDischargedOnInsideAndOutsideObjects: true,
    violatesValencePrinciple: true,
    tlaniUseIsRare: true,
});

const LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME = Object.freeze({
    kind: "lesson-39-characteristic-property-embed-frame",
    sourceSection: "Andrews 39.9",
    characteristicPropertyPatientiveCanEmbedInCompound: true,
    oftenOnlyEmbedOfDerivedNounstemIsUsed: true,
    yoTlMatrixCanBeOmittedWithFullDerivedMeaning: true,
    preteritAgentiveYoTlOmissionAlsoOccurs: true,
    mistranslationWarningForTonacatepetl: true,
});

const LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson39-perfective-patientive", andrewsSection: "39.1", category: "perfective-patientive", directiveEs: "El patientivo perfectivo viene del tronco activo perfectivo, clase tli, y se modela por analogia pasiva o impersonal.", engineSurface: "partial perfective patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-perfective-passive-analogy", andrewsSection: "39.1.1", category: "perfective-passive-analogy", directiveEs: "Una fuente transitiva puede seguir analogia pasiva y usar los objetos que corresponderian a una CNV pasiva.", engineSurface: "partial perfective patientivo passive-analogy gate", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-perfective-impersonal-analogy", andrewsSection: "39.1.2", category: "perfective-impersonal-analogy", directiveEs: "Una fuente transitiva o intransitiva puede seguir analogia impersonal, incluso con reemplazo te por ta segun la ruta.", engineSurface: "partial perfective patientivo impersonal-analogy gate", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-perfective-compound-source", andrewsSection: "39.1.3", category: "perfective-compound-source", directiveEs: "La fuente perfectiva puede ser compuesta; las matrices de posesion adquirida quedan restringidas por parentesco y entorno.", engineSurface: "diagnostic compound-source frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-imperfective-patientive", andrewsSection: "39.2", category: "imperfective-patientive", directiveEs: "El patientivo imperfectivo viene del tronco activo imperfectivo, clase ti, con clases C/D y analogia pasiva o impersonal.", engineSurface: "partial imperfective patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-imperfective-passive-analogy", andrewsSection: "39.2.1", category: "imperfective-passive-analogy", directiveEs: "La analogia pasiva no conserva te/ta salvo que el nucleo pasivo fuente lo contenga.", engineSurface: "partial imperfective passive-analogy gate", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-imperfective-impersonal-analogy", andrewsSection: "39.2.2", category: "imperfective-impersonal-analogy", directiveEs: "La analogia impersonal puede venir de fuente transitiva o intransitiva y debe evitar lecturas de compuesto equivocadas.", engineSurface: "partial imperfective impersonal-analogy gate", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-characteristic-property", andrewsSection: "39.3", category: "characteristic-property", directiveEs: "La propiedad caracteristica deriva de posesion abundante con matriz yo y expresa pertenencia o caracterizacion.", engineSurface: "partial characteristic-property route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-characteristic-state-quality", andrewsSection: "39.3.1", category: "characteristic-state-quality", directiveEs: "Puede nombrar estado o cualidad inherente de la entidad incrustada.", engineSurface: "diagnostic characteristic-property frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-characteristic-pertaining", andrewsSection: "39.3.2", category: "characteristic-pertaining", directiveEs: "Puede nombrar cosa que pertenece al incrustado; la ortografia tradicional puede ocultar la fuente.", engineSurface: "diagnostic characteristic-property frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-characteristic-intrinsic", andrewsSection: "39.3.3", category: "characteristic-intrinsic", directiveEs: "Puede nombrar aspecto esencial o intrinseco; a veces el derivado reemplaza el significado del incrustado.", engineSurface: "diagnostic characteristic-property frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-organic-possession", andrewsSection: "39.3.4", category: "organic-possession", directiveEs: "La posesion organica usa matriz yo solo en estado posesivo; la posesion adventicia usa el tronco normal.", engineSurface: "partial organic possession route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-preterit-agentive-embed", andrewsSection: "39.3.5", category: "preterit-agentive-characteristic-embed", directiveEs: "Un agentivo preterito puede llenar el incrustado de la matriz yo y no debe leerse como posesivo si es absolutivo.", engineSurface: "diagnostic characteristic-property frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-action-noun-embed", andrewsSection: "39.3.6", category: "action-noun-characteristic-embed", directiveEs: "Accion pasiva o activa puede llenar el incrustado; homofonos absolutivos pueden ser ambiguos.", engineSurface: "diagnostic characteristic-property frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-root-stock-patientive", andrewsSection: "39.4", category: "root-stock-patientive", directiveEs: "Los patientivos de raiz o stock derivan de destockales; la seleccion exacta de variante no siempre se recupera en superficie.", engineSurface: "partial root-stock patientivo route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-ni-destockal-stock", andrewsSection: "39.4.1", category: "ni-destockal-stock", directiveEs: "Los destockales ni pueden agregar k/sh/s/ch al stock y acortar la vocal formativa salvo irregularidades.", engineSurface: "partial root-stock suffix contract", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-hua-destockal-stock", andrewsSection: "39.4.2", category: "hua-destockal-stock", directiveEs: "Los destockales hua suelen agregar k, a veces ch o stock desnudo, con lecturas de color o textura parcial.", engineSurface: "partial root-stock suffix contract", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-ihui-ahui-destockal-stock", andrewsSection: "39.4.3", category: "ihui-ahui-destockal-stock", directiveEs: "Los destockales ihui/ahui pueden agregar sh/k al stock; derivados causativos o-a requieren ta dentro del tronco.", engineSurface: "partial root-stock suffix contract", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-agentive-stock-meaning", andrewsSection: "39.4.4", category: "agentive-stock-meaning", directiveEs: "Algunos stocks destockales funcionan como troncos nominales con sentido agentivo o fuente desconocida con objetos visibles.", engineSurface: "diagnostic root-stock frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson39-multiple-derivation", andrewsSection: "39.5", category: "multiple-patientive-derivation", directiveEs: "Una fuente puede permitir varias derivaciones patientivas; traducciones sinonimas no significan misma estructura.", engineSurface: "partial multiple-derivation metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson39-patientive-compound-embed", andrewsSection: "39.6", category: "patientive-compound-embed", directiveEs: "El patientivo puede incrustarse en compuestos nominales o verbales; la historia derivacional controla forma y significado.", engineSurface: "partial patientive compound continuations", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-incorporated-complement", andrewsSection: "39.7", category: "patientive-incorporated-complement", directiveEs: "Como complemento incorporado, el patientivo puede venir de CNN absolutiva o posesiva; el poseedor puede volverse objeto.", engineSurface: "partial incorporated-complement continuations", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-incorporated-object", andrewsSection: "39.8", category: "patientive-incorporated-object", directiveEs: "Como objeto incorporado, el patientivo usa matrices tlani/ihtlani/temoa y transfiere el poseedor a objeto aplicativo.", engineSurface: "partial incorporated-object continuations", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson39-characteristic-property-embed", andrewsSection: "39.9", category: "characteristic-property-embed", directiveEs: "El patientivo de propiedad caracteristica puede incrustarse completo o con omision de yo-t, sin cambiar el analisis.", engineSurface: "partial characteristic-property embed continuations", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function getLesson39PatientiveOperationsSubsectionInventory() {
    return LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS),
    }));
}

function buildLesson39PatientiveOperationsPursuitFrame() {
    const subsectionInventory = getLesson39PatientiveOperationsSubsectionInventory();
    const perfectivePatientiveFrame = cloneNominalizationLessonRecord(LESSON39_PERFECTIVE_PATIENTIVE_FRAME);
    const imperfectivePatientiveFrame = cloneNominalizationLessonRecord(LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME);
    const characteristicPropertyFrame = cloneNominalizationLessonRecord(LESSON39_CHARACTERISTIC_PROPERTY_FRAME);
    const rootStockPatientiveFrame = cloneNominalizationLessonRecord(LESSON39_ROOT_STOCK_PATIENTIVE_FRAME);
    const multipleDerivationFrame = cloneNominalizationLessonRecord(LESSON39_MULTIPLE_DERIVATION_FRAME);
    const patientiveCompoundEmbedFrame = cloneNominalizationLessonRecord(LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME);
    const incorporatedComplementFrame = cloneNominalizationLessonRecord(LESSON39_INCORPORATED_COMPLEMENT_FRAME);
    const incorporatedObjectFrame = cloneNominalizationLessonRecord(LESSON39_INCORPORATED_OBJECT_FRAME);
    const characteristicPropertyEmbedFrame = cloneNominalizationLessonRecord(LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME);
    const remainingGaps = [
        "Current Lesson 39 patientive operations are partial and do not complete every perfective, imperfective, characteristic-property, root/stock, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, or characteristic-property-embed pattern.",
        "Perfective and imperfective patientive generation has current source gates, but full lexical source coverage, passive/impersonal analogies, compound ownerhood restrictions, and Nawat/Pipil examples remain evidence-needed.",
        "Characteristic-property and organic-possession routes are partial; inherited/intrinsic/pertaining meanings, homophonous action embeds, and yo-t omission need focused evidence.",
        "Root/stock patientives, multiple derivation, and compound continuations preserve diagnostics because exact variant choice, matrix inventories, valence violations, and idiomatic restrictions remain incomplete.",
    ];
    const frame = {
        kind: "lesson-39-patientive-operations-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 39,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 39.1-39.9 against current patientive family metadata, perfective and imperfective patientive source gates, characteristic-property yo-matrix behavior, root/stock patientive contracts, multiple-derivation metadata, compound embeds, incorporated complements, incorporated objects, and characteristic-property embed continuations.",
                andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                result: "hit",
                correction: "Lesson 39 now records Andrews patientive operations for perfective, imperfective, characteristic-property, root/stock, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, and characteristic-property-embed behavior while preserving current evidence gates.",
                andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
                feedbackRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        perfectivePatientiveFrame,
        imperfectivePatientiveFrame,
        characteristicPropertyFrame,
        rootStockPatientiveFrame,
        multipleDerivationFrame,
        patientiveCompoundEmbedFrame,
        incorporatedComplementFrame,
        incorporatedObjectFrame,
        characteristicPropertyEmbedFrame,
        currentEngineBoundary: {
            nominalizationBoundaryMetadataImplemented: true,
            patientiveFamilyProfileImplemented: true,
            perfectivePatientiveGenerationPartial: true,
            imperfectivePatientiveGenerationPartial: true,
            characteristicPropertyGenerationPartial: true,
            rootStockPatientiveGenerationPartial: true,
            multiplePatientiveDerivationMetadataPartial: true,
            patientiveCompoundEmbedContinuationPartial: true,
            incorporatedComplementContinuationPartial: true,
            incorporatedObjectContinuationPartial: true,
            characteristicPropertyEmbedContinuationPartial: true,
            fullLesson39GenerationImplemented: false,
            finiteOutputExpansionAllowedOnlyWithNawatEvidence: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-39-patientive-operations-pursuit-frame",
        unitKind: "patientive-family-boundary",
        routeStage: "audit-lesson-39",
        structuralSource: "Andrews Lesson 39",
        andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 39.1-39.9",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
            rootStockRuleLettersNawat: Object.freeze(["k", "sh", "s", "ch"]),
        },
        morphBoundaryFrame: {
            perfectivePatientiveFrame,
            imperfectivePatientiveFrame,
            characteristicPropertyFrame,
            rootStockPatientiveFrame,
            multipleDerivationFrame,
            patientiveCompoundEmbedFrame,
            incorporatedComplementFrame,
            incorporatedObjectFrame,
            characteristicPropertyEmbedFrame,
        },
        stemFrame: {
            stemKind: "patientive-family",
            patientiveProcedures: multipleDerivationFrame.procedures,
            perfectiveAllowedEndings: perfectivePatientiveFrame.allowedPerfectiveCoreEndingsNawat,
            imperfectiveTargetClass: "ti",
            characteristicPropertyMatrix: characteristicPropertyFrame.nounstemMatrix,
            rootStockSuffixChoices: rootStockPatientiveFrame.niDestockalFrame.suffixChoices,
        },
        nuclearClauseFrame: {
            categoryTransition: "VNC core/root/stock -> patientive NNC nounstem",
            sourceClauseKind: "CNV",
            targetClauseKind: "CNN",
            organicPossessionIsPossessiveStateOnly: characteristicPropertyFrame.organicPossessionFrame.organicPossessionOnlyPossessiveState,
            compoundContinuationsAreDerivedFromGeneratedNounstems: true,
        },
        participantFrame: {
            semanticRole: "patient/result/property entity",
            possessorCanTransformToObjectInIncorporatedComplement: incorporatedComplementFrame.possessiveSourceFrame.possessorPronounTransformsToMainlineObjectPronoun,
            possessorCanTransformToApplicativeObjectInIncorporatedObject: incorporatedObjectFrame.possessorPronounTransformsToApplicativeObject,
            valencePrincipleViolationsAreDiagnostic: true,
        },
        targetContract: {
            metadataKind: "lesson-39-patientive-operations-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["patientive-operations-diagnostic-partial", "patientive-operations-needs-nawat-evidence"],
    });
}

function normalizeNominalizationBoundaryEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeNominalizationBoundaryKind(value = "") {
    return normalizeNominalizationBoundaryEnum(
        value,
        Object.values(NOMINALIZATION_BOUNDARY_KIND),
        NOMINALIZATION_BOUNDARY_KIND.unknown
    );
}

function normalizeNominalizationFalsePositiveSource(value = "") {
    return normalizeNominalizationBoundaryEnum(
        value,
        Object.values(NOMINALIZATION_FALSE_POSITIVE_SOURCE),
        NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getNominalizationBoundaryAntiConflationRules() {
    return Array.from(NOMINALIZATION_ANTI_CONFLATION_RULES);
}

function getNominalizationBoundaryStructuralQuestions() {
    return NOMINALIZATION_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function attachNominalizationGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nominalization",
        routeFamily: "nominalization",
        ...options,
    });
}

function buildNominalizationBoundaryMetadata() {
    const boundary = {
        kind: "nominalization-boundary",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        lessons: [35, 36, 37, 38, 39],
        status: "partial",
        grammarAuthority: "Andrews PDF Lessons 35-39",
        orthographyAuthority: "Modern Nawat/Pipil orthography and confirmed Nawat forms",
        targetAuthority: "Andrews grammar rules with Nawat/Pipil orthographic realization",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getNominalizationBoundaryStructuralQuestions(),
        boundaries: {
            hasGeneratedNominalSurfaces: true,
            hasGeneratedSLisActionNominalSurfaces: true,
            hasNominalizationProfile: true,
            hasPatientiveFamilyProfile: true,
            hasOwnerhoodGeneration: false,
            hasDeverbalLizZGeneration: false,
            hasFullPatientiveFamilyGeneration: false,
            hasStaticNominalizedVncData: false,
            changesGeneratedSurfaces: false,
            changesOrdinaryNncGeneration: false,
            changesVncGeneration: false,
        },
        antiConflationRules: getNominalizationBoundaryAntiConflationRules(),
    };
    return attachNominalizationGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary,
    });
}

function classifyNominalizationBoundaryCandidate({
    candidate = "",
    nominalizationKind = "",
    sourceVnc = "",
    stemUse = "",
    semanticRole = "",
    evidenceSource = "",
    falsePositiveSource = "",
    hasNominalizationProfile = false,
    hasPatientiveFamilyProfile = false,
} = {}) {
    const normalizedKind = normalizeNominalizationBoundaryKind(nominalizationKind);
    const normalizedFalsePositive = normalizeNominalizationFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "nominalization-boundary-candidate-classification",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        nominalizationKind: normalizedKind,
        sourceVnc: String(sourceVnc || ""),
        stemUse: String(stemUse || ""),
        semanticRole: String(semanticRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasNominalizationProfile: hasNominalizationProfile === true,
        hasPatientiveFamilyProfile: hasPatientiveFamilyProfile === true,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "nominalization-needs-validation" : "nominalization-needs-nawat-evidence",
            normalizedKind !== NOMINALIZATION_BOUNDARY_KIND.unknown
                ? "nominalization-category-recognized"
                : "nominalization-category-unconfirmed",
            hasNominalizationProfile ? "nominalization-profile-is-metadata-only" : "nominalization-profile-absent",
            hasPatientiveFamilyProfile ? "patientive-family-profile-is-partial" : "patientive-family-profile-absent",
            normalizedFalsePositive !== NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown
                ? "nominalization-false-positive-source"
                : "nominalization-unconfirmed",
        ],
        boundary: buildNominalizationBoundaryMetadata(),
    };
    return attachNominalizationGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.sourceVnc,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "nominalization-source-candidate",
            sourceKind: classification.stemUse,
            sourceStem: classification.sourceVnc,
        },
    });
}

function classifyNominalizationFalsePositive(source = "") {
    const normalizedSource = normalizeNominalizationFalsePositiveSource(source);
    const classification = {
        kind: "nominalization-false-positive",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        source: normalizedSource,
        isNominalizationEvidence: false,
        isOwnerhoodEvidence: false,
        isDeverbalLizZEvidence: false,
        isFullPatientiveFamilyEvidence: false,
        generationAllowed: false,
        diagnostics: ["nominalization-false-positive-source"],
        antiConflationRules: getNominalizationBoundaryAntiConflationRules(),
    };
    return attachNominalizationGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
    });
}
