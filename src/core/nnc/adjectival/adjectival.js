// core/nnc/adjectival/adjectival.js
// Lessons 40-41 adjectival NNC function boundary metadata. This keeps current
// adjetivo generated surfaces and predicate-function labels separate from
// confirmed adjectival NNC paradigms or clause-level modification ASTs.

"use strict";

const ADJECTIVAL_NNC_BOUNDARY_VERSION = 1;
const ADJECTIVAL_NNC_GENERATION_VERSION = 1;

const ADJECTIVAL_NNC_FUNCTION = Object.freeze({
    predicateFunction: "predicate-function",
    patientiveAdjectival: "patientive-adjectival",
    vncAdjectival: "vnc-adjectival",
    compoundSourceAdjectival: "compound-source-adjectival",
    denominalCompoundAdjectival: "denominal-compound-adjectival",
    adjectivalSurface: "adjectival-surface",
    potentialPatient: "potential-patient",
    modifierCandidate: "modifier-candidate",
    unknown: "unknown",
});

const ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    adjetivoRoute: "adjetivo-route",
    nominalizationProfile: "nominalization-profile",
    adjectivalModificationBoundary: "adjectival-modification-boundary",
    ordinaryNncFormulaSlots: "ordinary-nnc-formula-slots",
    translationAdjective: "translation-adjective",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const ADJECTIVAL_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "adjectival NNC function generation is opt-in and does not create a modification AST",
    "adjetivo route output is a generated surface, not complete Lessons 40-41 coverage",
    "nominalizationProfile adjectivalFunction is explanatory metadata, not modifier/head syntax",
    "Lessons 40-41 adjectival function is separate from Lessons 42-43 modification AST",
    "single generated words do not prove adjectival modification, supplementation, or topic relations",
    "Andrews adjectival categories govern grammar behavior, while Nawat/Pipil orthography governs output spelling",
]);

const ADJECTIVAL_NNC_DIAGNOSTIC_IDS = Object.freeze({
    unavailable: "adjectival-nnc-unavailable",
    requiresAbsolutiveState: "adjectival-nnc-requires-absolutive-state",
    requiresPatientiveSurface: "adjectival-nnc-requires-patientive-surface",
    requiresVncSurface: "adjectival-nnc-requires-vnc-surface",
    requiresCompoundSourceSurface: "adjectival-nnc-requires-compound-source-surface",
    requiresCompoundSourceFrame: "adjectival-nnc-requires-compound-source-frame",
    requiresDenominalCompoundSurface: "adjectival-nnc-requires-denominal-compound-surface",
    requiresDenominalCompoundFrame: "adjectival-nnc-requires-denominal-compound-frame",
    requiresFormulaSlots: "adjectival-nnc-requires-formula-slots",
    requiresNominalizedVncSurface: "adjectival-nnc-requires-nominalized-vnc-surface",
    unsupportedNominalizedVncKind: "adjectival-nnc-unsupported-nominalized-vnc-kind",
    requiresRootPlusYa: "adjectival-nnc-requires-root-plus-ya",
    rootPlusYaException: "adjectival-nnc-root-plus-ya-exception",
    segmentedRootPlusYaUnsupported: "adjectival-nnc-segmented-root-plus-ya-unsupported",
});

const ADJECTIVAL_NNC_FORMATION = Object.freeze({
    ordinaryAbsolutive: "ordinary-absolutive",
    patientiveAdjectival: "patientive-adjectival",
    vncAdjectival: "vnc-adjectival",
    compoundSourceAdjectival: "compound-source-adjectival",
    denominalCompoundAdjectival: "denominal-compound-adjectival",
    nominalizedVncAdjectival: "nominalized-vnc-adjectival",
    rootPlusYaObsoletePreterit: "root-plus-ya-obsolete-preterit",
    intensifiedAdjectival: "intensified-adjectival",
});

const ADJECTIVAL_NNC_NOMINALIZED_VNC_KIND_LESSONS = Object.freeze({
    "customary-present-agentive": Object.freeze({
        lessonRef: "Andrews 40.6",
        functionKind: "agentive-adjectival",
        rule: "customary-present agentive NNC predicates may function adjectivally",
    }),
    "preterit-agentive": Object.freeze({
        lessonRef: "Andrews 40.8",
        functionKind: "preterit-agentive-adjectival",
        rule: "preterit-agentive NNC predicates may function adjectivally",
    }),
    "potential-patient": Object.freeze({
        lessonRef: "Andrews 40.4.2",
        functionKind: "potential-patient-adjectival",
        rule: "potential-patient NNC predicates may function adjectivally",
    }),
    "customary-present-patientive": Object.freeze({
        lessonRef: "Andrews 40.7",
        functionKind: "customary-present-patientive-adjectival",
        rule: "customary-present patientive NNC predicates may function adjectivally",
    }),
});

const ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE = Object.freeze({
    rootPlusYa: "root-plus-ya",
    denominalTiya: "denominal-tiya",
    segmentedDenominalTiya: "segmented-denominal-tiya",
});

const ADJECTIVAL_NNC_SOURCE_PATTERN = Object.freeze({
    rootPlusYa: "root-plus-ya",
    tiYa: "ti-ya",
    kTiYa: "k-ti-ya",
    zTiYa: "z-ti-ya",
});

const ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "functionKind",
        asks: "Does the generated surface function as predicate, modifier candidate, patientive adjective, VNC surface, or unknown?",
    }),
    Object.freeze({
        field: "sourceCategory",
        asks: "Is the source NNC, VNC, patientive, ordinary nounstem, or unknown?",
    }),
    Object.freeze({
        field: "predicateSurface",
        asks: "What role does the visible Nawat/Pipil surface have before any clause-level modification analysis?",
    }),
    Object.freeze({
        field: "adjectivalRole",
        asks: "Is there confirmed clause evidence for modifier/head behavior, or only an adjective-like word output?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports adjectival function beyond route output?",
    }),
]);

const LESSON40_ADJECTIVAL_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_adjectival.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON40_ADJECTIVAL_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 40.1",
    "Andrews Lesson 40.2",
    "Andrews Lesson 40.2.1",
    "Andrews Lesson 40.2.2",
    "Andrews Lesson 40.2.3",
    "Andrews Lesson 40.3",
    "Andrews Lesson 40.3.1",
    "Andrews Lesson 40.3.2",
    "Andrews Lesson 40.4",
    "Andrews Lesson 40.4.1",
    "Andrews Lesson 40.4.2",
    "Andrews Lesson 40.5",
    "Andrews Lesson 40.6",
    "Andrews Lesson 40.7",
    "Andrews Lesson 40.8",
    "Andrews Lesson 40.8.1",
    "Andrews Lesson 40.8.2",
    "Andrews Lesson 40.8.3",
    "Andrews Lesson 40.8.4",
    "Andrews Lesson 40.8.5",
    "Andrews Lesson 40.8.6",
    "Andrews Lesson 40.9",
    "Andrews Lesson 40.9.1",
    "Andrews Lesson 40.9.2",
    "Andrews Lesson 40.10",
    "Andrews Lesson 40.10.1",
    "Andrews Lesson 40.10.2",
    "Andrews Lesson 40.10.3",
    "Andrews Lesson 40.11",
    "Andrews Lesson 40.12",
]);

const LESSON40_ADJECTIVAL_NUCLEAR_CLAUSE_FRAME = Object.freeze({
    kind: "lesson-40-adjectival-nuclear-clause-frame",
    sourceSection: "Andrews 40.1",
    adjectiveLabelsSyntacticNotFormalClass: true,
    adjectivalNncIsNncInAdjectivalFunction: true,
    modifiesAnotherNnc: true,
    relativeClauseAnalogy: true,
    normallyAbsolutiveState: true,
    modificationAstDeferredToLessons42_43: true,
});

const LESSON40_EXCEPTIONAL_ADJECTIVAL_NNC_FRAME = Object.freeze({
    kind: "lesson-40-exceptional-adjectival-nnc-frame",
    sourceSection: "Andrews 40.2",
    hasPeculiarSubtypes: true,
    hueiFrame: Object.freeze({
        sourceSection: "Andrews 40.2.1",
        classicalSource: "(hue-i)-0-",
        nawatDisplaySeed: "wey",
        pronominalLikeParadigm: true,
        pluralNumberPositionOptions: Object.freeze(["t-in", "0-0"]),
        stemFinalNPlural: true,
        distributiveVarietalShape: true,
        sameRootAsOldManStem: true,
    }),
    nepapanFrame: Object.freeze({
        sourceSection: "Andrews 40.2.2",
        affinityStemmedRelationalNnc: true,
        reciprocalPossessiveNe: true,
        relationalPanSource: true,
    }),
    possessorIncludedFrame: Object.freeze({
        sourceSection: "Andrews 40.2.3",
        possessorIncludedStems: true,
        downgradedPossessivePredicateInsideStem: true,
        notPossessiveStateDespitePossessor: true,
        subjectPersonThirdPersonDyad: true,
        pluralUsesTinOrZeroNotHuan: true,
        celFrame: Object.freeze({
            source: "ce-l",
            exclusivePronounConstruction: true,
            relatedToNumeralCe: true,
            honorificTzin: true,
            diminutiveTon: true,
            usuallyWithZan: true,
        }),
        elFrame: Object.freeze({
            source: "(el)-0-",
            diligentEagerActive: true,
            negativeLazy: true,
            pluralTinOrZero: true,
        }),
    }),
});

const LESSON40_NNC_VNC_AS_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-nnc-vnc-as-adjective-frame",
    sourceSection: "Andrews 40.3",
    almostAnyAbsolutiveNncCanFunctionAdjectivally: true,
    anyVncCanFunctionAdjectivally: true,
    onlyPredicateTranslatedAsEnglishAdjective: true,
    modificationStructuresDeferred: true,
    nncPredicateFrame: Object.freeze({
        sourceSection: "Andrews 40.3.1",
        predicatesOfNncsCanTranslateAsAdjectives: true,
    }),
    vncPredicateFrame: Object.freeze({
        sourceSection: "Andrews 40.3.2",
        predicatesOfVncsCanTranslateAsAdjectives: true,
    }),
});

const LESSON40_DERIVED_NOUNSTEM_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-derived-nounstem-adjective-frame",
    sourceSection: "Andrews 40.4",
    patientiveAndPotentialPatientOftenTranslatedAdjectively: true,
    patientiveFrame: Object.freeze({
        sourceSection: "Andrews 40.4.1",
        patientiveNamesEntityByProcessImpact: true,
        strictRenderingSubstantive: true,
        types: Object.freeze(["passive-stem", "impersonal-stem", "perfective-stem", "root-or-stock"]),
    }),
    potentialPatientFrame: Object.freeze({
        sourceSection: "Andrews 40.4.2",
        suffixes: Object.freeze(["z", "liz"]),
        adjectiveTranslationAllowed: true,
        negativeParticleInsideOutsideAmbiguity: true,
    }),
});

const LESSON40_NOMINALIZED_VNC_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-nominalized-vnc-adjective-frame",
    sourceSection: "Andrews 40.5",
    predicatesOfNominalizedVncsOftenAdjectival: true,
    agentiveFrequent: true,
    conditionCustomaryDoesOrHasDone: true,
    nominalizedAnalysisJustifiedByAffectiveEmbedding: true,
});

const LESSON40_CUSTOMARY_AGENTIVE_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-customary-agentive-adjective-frame",
    sourceSection: "Andrews 40.6",
    customaryPresentAgentivePredicateAdjectival: true,
    activeVoice: true,
    negativeParticleAmbiguity: true,
    connectiveTCompoundCanReanalyze: true,
    syncopePossible: true,
});

const LESSON40_CUSTOMARY_PATIENTIVE_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-customary-patientive-adjective-frame",
    sourceSection: "Andrews 40.7",
    customaryPresentPatientivePredicateAdjectival: true,
    passiveVoice: true,
    potentialPatientCanShareTranslation: true,
    translationCanDiffer: true,
});

const LESSON40_PRETERIT_AGENTIVE_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-preterit-agentive-adjective-frame",
    sourceSection: "Andrews 40.8",
    preteritAgentivePredicateAdjectival: true,
    mostlyIntransitiveSource: true,
    classAFrame: Object.freeze({
        sourceSection: "Andrews 40.8.1",
        includesPassive: true,
        denominalTiCommon: true,
        likenessNotionsCommon: true,
        worldviewTranslationMayLocateQualityDifferently: true,
        occasionalTransitiveSources: true,
    }),
    classBFrame: Object.freeze({
        sourceSection: "Andrews 40.8.2",
        singularCommonNumberNormallyQuiZero: true,
        zeroZeroPreferredBySome: true,
        transitiveSourcesCanServe: true,
    }),
    classCFrame: Object.freeze({
        sourceSection: "Andrews 40.8.3",
        singularCommonNumberZeroZero: true,
        usuallyTransitive: true,
    }),
    classDFrame: Object.freeze({
        sourceSection: "Andrews 40.8.4",
        singularCommonNumberZeroZero: true,
    }),
    compoundFrame: Object.freeze({
        sourceSection: "Andrews 40.8.5",
        compoundStemmedNncPredicateCanTranslateAsAdjective: true,
    }),
    unusedSourceOwnerhoodFrame: Object.freeze({
        sourceSection: "Andrews 40.8.6",
        sourceVncMayNoLongerBeUsed: true,
        iyoAAlonePath: true,
        ownerhoodPredicatesOftenAdjectival: Object.freeze(["e", "yo-a", "hua"]),
    }),
});

const LESSON40_OBSOLETE_PRETERIT_ADJECTIVE_FRAME = Object.freeze({
    kind: "lesson-40-obsolete-preterit-adjective-frame",
    sourceSection: "Andrews 40.9",
    rootPlusYaSpecialFormation: true,
    obsoletePreteritOnRootAlone: true,
    rootsTreatedAsClassA: true,
    denominalTiyaUsesFormation: true,
    fullClassBAlternativePossible: true,
    hueiyaExceptionFrame: Object.freeze({
        sourceSection: "Andrews 40.9.1",
        classicalSource: "(hue-i-ya)",
        nawatDisplaySeed: "weya",
        usesPronounLikeBase: true,
        classBStemForMetaphoricalHonor: true,
        classAStemExpressesLength: true,
        noObsoleteHueiCStem: true,
        generalUseHueiCaUsedAdverbiallyOrEmbedded: true,
    }),
    tlaocoyaExceptionFrame: Object.freeze({
        sourceSection: "Andrews 40.9.2",
        onlyClassBStemForTlaocoxqui: true,
    }),
});

const LESSON40_SYNONYMOUS_PAIRS_FRAME = Object.freeze({
    kind: "lesson-40-synonymous-pairs-frame",
    sourceSection: "Andrews 40.10",
    sourceVerbstemsSynonymousFromSingleRoot: true,
    outputContractGenerateCurrentSourceOnly: true,
    noSiblingGenerationWithoutEvidence: true,
    niHuiFrame: Object.freeze({
        sourceSection: "Andrews 40.10.1",
        niDestockalAndRareHuiHaveCTiyaSynonyms: true,
        usesPreteritAgentiveAndObsoletePreteritRules: true,
    }),
    huaFrame: Object.freeze({
        sourceSection: "Andrews 40.10.2",
        huaDestockalsHaveCTiyaSynonyms: true,
        fromLesson39_4_2DeverbalNounstems: true,
        usesPreteritAgentiveAndObsoletePreteritRules: true,
    }),
    ihuiAhuiFrame: Object.freeze({
        sourceSection: "Andrews 40.10.3",
        ihuiAhuiDestockalsHaveTiyaSynonyms: true,
        fromLesson39_4_3DeverbalNounstems: true,
        usesPreteritAgentiveAndObsoletePreteritRules: true,
    }),
    translationDifferencePossible: true,
});

const LESSON40_SYNONYMOUS_TRIPLETS_FRAME = Object.freeze({
    kind: "lesson-40-synonymous-triplets-frame",
    sourceSection: "Andrews 40.11",
    sourceSingleRoot: true,
    zTiyaThirdMember: true,
    translationDifferencePossible: true,
    deverbalNounstemMayShareTranslation: true,
    noSiblingGenerationWithoutEvidence: true,
});

const LESSON40_PREDICATE_ADJECTIVE_SENTENCE_FRAME = Object.freeze({
    kind: "lesson-40-predicate-adjective-sentence-frame",
    sourceSection: "Andrews 40.12",
    adjectiveTranslatableNncCreatesPredicateAdjectiveSentence: true,
    inMultipleNucleusAdjectivalNncIsPrincipalClause: true,
    supplementsCanBeSubjectPossessorOrClause: true,
    sentenceLayerNotWordGeneration: true,
});

const LESSON40_ADJECTIVAL_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson40-adjectival-nuclear-clause", andrewsSection: "40.1", category: "adjectival-nnc-function", directiveEs: "Adjetivo es funcion sintactica; la CNN adjetiva modifica otra CNN y normalmente exige estado absolutivo.", engineSurface: "partial opt-in adjectival NNC output plus boundary metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-exceptional-adjectival-nncs", andrewsSection: "40.2", category: "exceptional-adjectival-nnc", directiveEs: "Las CNN adjetivas excepcionales tienen paradigmas peculiares; no se generan como reglas ordinarias sin evidencia.", engineSurface: "diagnostic exceptional adjectival frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-huei", andrewsSection: "40.2.1", category: "huei-pronominal-like", directiveEs: "El tipo wey tiene comportamiento parecido a pronombre y alternancias de numero que no deben aplanarse.", engineSurface: "diagnostic exceptional adjectival frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-nepapan", andrewsSection: "40.2.2", category: "nepapan-relational-source", directiveEs: "Nepapan viene de fuente relacional y posesiva reciproca; no es solo una etiqueta de adjetivo.", engineSurface: "diagnostic exceptional adjectival frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-possessor-included", andrewsSection: "40.2.3", category: "possessor-included-adjectival", directiveEs: "Ce-l y el incluyen poseedor dentro del tronco pero siguen con sujeto 3a y no son estado posesivo normal.", engineSurface: "diagnostic exceptional adjectival frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-nnc-vnc-adjective", andrewsSection: "40.3", category: "nnc-vnc-adjective-function", directiveEs: "Casi cualquier CNN absolutiva y cualquier CNV pueden funcionar adjetivamente; la estructura de modificacion queda diferida.", engineSurface: "partial ordinary NNC/VNC adjectival routes", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-nnc-predicate-adjective", andrewsSection: "40.3.1", category: "nnc-predicate-adjective", directiveEs: "Solo el predicado de la CNN se traduce como adjetivo; la CNN completa mantiene su arquitectura.", engineSurface: "partial ordinary NNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-vnc-predicate-adjective", andrewsSection: "40.3.2", category: "vnc-predicate-adjective", directiveEs: "Solo el predicado de la CNV se traduce como adjetivo; no se convierte automaticamente en tronco nominal.", engineSurface: "partial VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-derived-nounstems", andrewsSection: "40.4", category: "derived-nounstem-adjective", directiveEs: "Patientivos y potenciales-paciente pueden traducirse adjetivamente, pero la forma estricta sigue siendo sustantiva.", engineSurface: "partial patientive/nominalized VNC adjectival routes", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-patientive-adjective", andrewsSection: "40.4.1", category: "patientive-adjective", directiveEs: "El patientivo nombra una entidad por proceso, impacto o estado resultante; la glosa adjetiva es libre.", engineSurface: "partial patientive adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-potential-patient-adjective", andrewsSection: "40.4.2", category: "potential-patient-adjective", directiveEs: "El potencial-paciente con z/liz puede glosarse como adjetivo; la negacion puede estar dentro o fuera del tronco.", engineSurface: "partial nominalized VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-nominalized-vnc-adjective", andrewsSection: "40.5", category: "nominalized-vnc-adjective", directiveEs: "Los predicados de CNV nominalizadas pueden glosarse como adjetivos; el analisis nominalizado se conserva por incrustacion afectiva.", engineSurface: "partial nominalized VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-customary-agentive", andrewsSection: "40.6", category: "customary-present-agentive-adjective", directiveEs: "El agentivo presente habitual activo puede funcionar adjetivamente; compuestos con t pueden reanalizarse.", engineSurface: "partial nominalized VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-customary-patientive", andrewsSection: "40.7", category: "customary-present-patientive-adjective", directiveEs: "El patientivo presente habitual pasivo puede funcionar adjetivamente y puede coincidir o diferir del potencial-paciente.", engineSurface: "partial nominalized VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-preterit-agentive-adjective", andrewsSection: "40.8", category: "preterit-agentive-adjective", directiveEs: "El agentivo preterito puede funcionar adjetivamente, sobre todo desde fuentes intransitivas.", engineSurface: "partial nominalized VNC adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-class-a", andrewsSection: "40.8.1", category: "class-a-preterit-agentive-adjective", directiveEs: "La clase A incluye pasivos y denominales ti frecuentes; las glosas de cualidad pueden ocultar estructura.", engineSurface: "diagnostic class frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-class-b", andrewsSection: "40.8.2", category: "class-b-preterit-agentive-adjective", directiveEs: "La clase B suele usar qui-0 o 0-0 en numero singular/comun y tambien acepta fuentes transitivas.", engineSurface: "diagnostic class frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-class-c", andrewsSection: "40.8.3", category: "class-c-preterit-agentive-adjective", directiveEs: "La clase C usa 0-0 en singular/comun y normalmente tiene fuente transitiva.", engineSurface: "diagnostic class frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-class-d", andrewsSection: "40.8.4", category: "class-d-preterit-agentive-adjective", directiveEs: "La clase D usa 0-0 en singular/comun y no debe mezclarse con otras clases.", engineSurface: "diagnostic class frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-compound-preterit-agentive", andrewsSection: "40.8.5", category: "compound-preterit-agentive-adjective", directiveEs: "Un predicado de CNN compuesta tambien puede traducirse adjetivamente.", engineSurface: "partial compound source metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-unused-source-ownerhood", andrewsSection: "40.8.6", category: "unused-source-ownerhood-adjective", directiveEs: "Algunas fuentes ya no se usan; formas de posesion e/yo-a/wa pueden glosarse como adjetivos.", engineSurface: "diagnostic ownerhood adjective frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-obsolete-preterit-root-ya", andrewsSection: "40.9", category: "obsolete-preterit-root-ya-adjective", directiveEs: "Los intransitivos raiz+ya pueden formar adjetivos desde un preterito obsoleto sobre la raiz sola.", engineSurface: "partial root-plus-ya adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-hueiya-exception", andrewsSection: "40.9.1", category: "hueiya-exception", directiveEs: "Weya usa la base parecida a pronombre y distingue honor metaforico de longitud; no se inventa un preterito obsoleto.", engineSurface: "diagnostic root-plus-ya exception", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-tlaocoya-exception", andrewsSection: "40.9.2", category: "tlaocoya-exception", directiveEs: "Tlaocoya solo usa el tronco de clase B documentado para esta funcion.", engineSurface: "diagnostic root-plus-ya exception", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson40-synonymous-pairs", andrewsSection: "40.10", category: "synonymous-pairs", directiveEs: "Los pares sinonimos vienen de una raiz comun; no se generan hermanos sin evidencia Nawat.", engineSurface: "diagnostic synonym-set frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-ni-hui-pairs", andrewsSection: "40.10.1", category: "ni-hui-ctiya-pairs", directiveEs: "Destockales ni y raramente hui tienen sinonimos c-tiya segun reglas 40.8.2 y 40.9.", engineSurface: "diagnostic synonym-set frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-hua-pairs", andrewsSection: "40.10.2", category: "hua-ctiya-pairs", directiveEs: "Destockales wa tienen sinonimos c-tiya desde nounstems 39.4.2.", engineSurface: "diagnostic synonym-set frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-ihui-ahui-pairs", andrewsSection: "40.10.3", category: "ihui-ahui-tiya-pairs", directiveEs: "Destockales iwi/awi tienen sinonimos tiya desde nounstems 39.4.3.", engineSurface: "diagnostic synonym-set frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-synonymous-triplets", andrewsSection: "40.11", category: "synonymous-triplets", directiveEs: "Los tripletes agregan un miembro z-tiya; diferencias de traduccion no autorizan generacion automatica.", engineSurface: "diagnostic synonym-set frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson40-predicate-adjective-sentence", andrewsSection: "40.12", category: "predicate-adjective-sentence", directiveEs: "La CNN traducible como adjetivo puede ser clausula principal en construccion multinuclear; esto es sintaxis, no palabra nueva.", engineSurface: "diagnostic sentence-layer frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function cloneAdjectivalNncLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneAdjectivalNncLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneAdjectivalNncLessonRecord(value)])
    );
}

function buildLesson41CompoundSourceObjectSlotOwnershipFrame({
    embedRole = "",
    matrixValence = "",
    consumedObjectSlot = "",
    sourceExternalObjectSlots = [],
    remainingExternalObjectSlots = [],
} = {}) {
    const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
    const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
    const resolvedMatrixValence = String(matrixValence || "").trim();
    return {
        kind: "lesson-41-compound-source-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed: Boolean(resolvedMatrixValence),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        consumedObjectSlotOwnedBy: consumedObjectSlot ? "route-frame" : "none",
        sourceExternalObjectSlots: sourceSlots.map((slot) => ({ ...slot })),
        remainingExternalObjectSlots: remainingSlots.map((slot) => ({ ...slot })),
        sourceExternalObjectSlotIds: sourceSlots.map((slot) => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotIds: remainingSlots.map((slot) => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        embeddedRoleLicensedBy: embedRole ? "lesson-41-compound-source-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: Boolean(resolvedMatrixValence),
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        objectSlotLicensingOrder: [
            "source-compound-vnc",
            "source-adjunct-nnc",
            "matrix-valence-frame",
            "route-frame",
            "function-use-annotation",
        ],
    };
}

function buildLesson41CompoundSourceRouteFrame({
    sourceSection = "Andrews 41.2",
    embedRole = "",
    matrixValence = "",
    matrixFamilies = [],
    consumedObjectSlot = "",
    sourceExternalObjectSlots = [],
    remainingExternalObjectSlots = [],
    valenceDelta = {},
    generationStatus = "diagnostic-only-nawat-evidence-required",
} = {}) {
    const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
    const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
    const objectSlotOwnership = buildLesson41CompoundSourceObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        consumedObjectSlot,
        sourceExternalObjectSlots: sourceSlots,
        remainingExternalObjectSlots: remainingSlots,
    });
    return {
        kind: "lesson-41-compound-source-route-frame",
        version: 1,
        sourcePrincipalVnc: {
            formulaType: "CNV",
            sourceKind: "compound-verbstem",
            sourceSection: String(sourceSection || ""),
            surface: "",
            generationStatus,
        },
        sourceAdjunctNnc: {
            formulaType: "CNN",
            stemKind: "nominal-embed",
            role: String(embedRole || "").trim(),
            sourceSection: String(sourceSection || ""),
        },
        matrix: {
            valence: String(matrixValence || "").trim(),
            families: Array.from(matrixFamilies || []),
            convertedToMatrixNounstem: true,
        },
        matrixValence,
        embedRole: String(embedRole || "").trim(),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        sourceExternalObjectSlots: sourceSlots.map((slot) => ({ ...slot })),
        remainingExternalObjectSlots: remainingSlots.map((slot) => ({ ...slot })),
        remainingExternalObjectSlotIds: remainingSlots.map((slot) => String(slot?.slotId || "")).filter(Boolean),
        objectSlotOwnership,
        valenceDelta: { ...valenceDelta },
        andrewsSection: String(sourceSection || ""),
        generationStatus,
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true,
        finalFormulaShape: "compound-verbstem-nominal-embed-adjectival-nnc",
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
    };
}

function getLesson40AdjectivalNncSubsectionInventory() {
    return LESSON40_ADJECTIVAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON40_ADJECTIVAL_NNC_VALIDATION_REFS),
    }));
}

function attachAdjectivalNncPursuitGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adjectival-nnc",
        routeFamily: "adjectival-nnc",
        ...options,
    });
}

function buildLesson40AdjectivalNncPursuitFrame() {
    const subsectionInventory = getLesson40AdjectivalNncSubsectionInventory();
    const adjectivalNuclearClauseFrame = cloneAdjectivalNncLessonRecord(LESSON40_ADJECTIVAL_NUCLEAR_CLAUSE_FRAME);
    const exceptionalAdjectivalNncFrame = cloneAdjectivalNncLessonRecord(LESSON40_EXCEPTIONAL_ADJECTIVAL_NNC_FRAME);
    const nncVncAsAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_NNC_VNC_AS_ADJECTIVE_FRAME);
    const derivedNounstemAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_DERIVED_NOUNSTEM_ADJECTIVE_FRAME);
    const nominalizedVncAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_NOMINALIZED_VNC_ADJECTIVE_FRAME);
    const customaryAgentiveAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_CUSTOMARY_AGENTIVE_ADJECTIVE_FRAME);
    const customaryPatientiveAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_CUSTOMARY_PATIENTIVE_ADJECTIVE_FRAME);
    const preteritAgentiveAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_PRETERIT_AGENTIVE_ADJECTIVE_FRAME);
    const obsoletePreteritAdjectiveFrame = cloneAdjectivalNncLessonRecord(LESSON40_OBSOLETE_PRETERIT_ADJECTIVE_FRAME);
    const synonymousPairsFrame = cloneAdjectivalNncLessonRecord(LESSON40_SYNONYMOUS_PAIRS_FRAME);
    const synonymousTripletsFrame = cloneAdjectivalNncLessonRecord(LESSON40_SYNONYMOUS_TRIPLETS_FRAME);
    const predicateAdjectiveSentenceFrame = cloneAdjectivalNncLessonRecord(LESSON40_PREDICATE_ADJECTIVE_SENTENCE_FRAME);
    const remainingGaps = [
        "Current Lesson 40 adjectival NNC support is partial and does not exhaust exceptional adjectival NNCs, all NNC/VNC adjectival functions, all derived nounstem adjective paths, all nominalized VNC adjective paths, synonym sets, or predicate-adjective sentences.",
        "Exceptional adjectival NNCs, possessor-included stems, class-specific preterit-agentive adjective behavior, root-plus-ya exceptions, and source-synonym sets remain diagnostic or evidence-needed.",
        "Predicate-adjective sentence syntax and Lessons 42-43 modifier/head AST behavior remain outside word generation.",
        "Finite output expansion must stay tied to Andrews section evidence and confirmed Nawat/Pipil spelling evidence.",
    ];
    const frame = {
        kind: "lesson-40-adjectival-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 40,
        aimStatus: "shooting",
        routeStage: "audit-lesson-40",
        pdfRefs: Array.from(LESSON40_ADJECTIVAL_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 40.1-40.12 against current adjectival NNC function metadata, exceptional adjectival NNCs, NNC/VNC predicate translation, derived nounstem adjectives, nominalized VNC adjective paths, preterit-agentive classes, obsolete preterit root-plus-ya, synonym sets, and predicate-adjective sentence boundaries.",
                andrewsRefs: Array.from(LESSON40_ADJECTIVAL_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON40_ADJECTIVAL_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                result: "hit",
                correction: "Lesson 40 now records Andrews adjectival NNC function architecture across ordinary, exceptional, NNC/VNC, derived nounstem, nominalized VNC, preterit-agentive, obsolete-preterit, synonym-set, and predicate-adjective sentence boundaries while preserving evidence gates.",
                andrewsRefs: Array.from(LESSON40_ADJECTIVAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON40_ADJECTIVAL_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        adjectivalNuclearClauseFrame,
        exceptionalAdjectivalNncFrame,
        nncVncAsAdjectiveFrame,
        derivedNounstemAdjectiveFrame,
        nominalizedVncAdjectiveFrame,
        customaryAgentiveAdjectiveFrame,
        customaryPatientiveAdjectiveFrame,
        preteritAgentiveAdjectiveFrame,
        obsoletePreteritAdjectiveFrame,
        synonymousPairsFrame,
        synonymousTripletsFrame,
        predicateAdjectiveSentenceFrame,
        currentEngineBoundary: {
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
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachAdjectivalNncPursuitGrammarContract(frame, {
        metadataKind: "lesson-40-adjectival-nnc-pursuit-frame",
        unitKind: "adjectival-nnc-boundary",
        routeStage: "audit-lesson-40",
        structuralSource: "Andrews Lesson 40",
        andrewsRefs: Array.from(LESSON40_ADJECTIVAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 40.1-40.12",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
            displaySeedsAdaptedToNawat: Object.freeze(["wey", "weya"]),
        },
        morphBoundaryFrame: {
            adjectivalNuclearClauseFrame,
            exceptionalAdjectivalNncFrame,
            nncVncAsAdjectiveFrame,
            derivedNounstemAdjectiveFrame,
            nominalizedVncAdjectiveFrame,
            customaryAgentiveAdjectiveFrame,
            customaryPatientiveAdjectiveFrame,
            preteritAgentiveAdjectiveFrame,
            obsoletePreteritAdjectiveFrame,
            synonymousPairsFrame,
            synonymousTripletsFrame,
            predicateAdjectiveSentenceFrame,
        },
        stemFrame: {
            stemKind: "adjectival-nnc-function",
            normalPredicateState: "absolutive",
            patientiveTypes: derivedNounstemAdjectiveFrame.patientiveFrame.types,
            potentialPatientSuffixes: derivedNounstemAdjectiveFrame.potentialPatientFrame.suffixes,
            preteritAgentiveClassesTracked: Object.freeze(["A", "B", "C", "D"]),
        },
        nuclearClauseFrame: {
            sourceClauseKind: "CNN or CNV",
            targetFunctionKind: "adjectival",
            adjectiveIsSyntacticFunction: true,
            modificationAstDeferredToLessons42_43: true,
            predicateAdjectiveSentenceIsSentenceLayer: true,
        },
        participantFrame: {
            semanticRole: "modifier/predicate-quality candidate",
            possessorIncludedExceptionalStemsAreNotPossessiveState: true,
            nominalizedAnalysisPreservedWhereAffectiveEmbeddingLicensesIt: true,
        },
        targetContract: {
            metadataKind: "lesson-40-adjectival-nnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["adjectival-nnc-diagnostic-partial", "adjectival-nnc-needs-nawat-evidence"],
    });
}

const LESSON41_ADJECTIVAL_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_adjectival.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON41_ADJECTIVAL_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 41.1",
    "Andrews Lesson 41.1.1",
    "Andrews Lesson 41.1.2",
    "Andrews Lesson 41.1.2.a",
    "Andrews Lesson 41.1.2.b",
    "Andrews Lesson 41.1.2.c",
    "Andrews Lesson 41.1.2.d",
    "Andrews Lesson 41.1.2.e",
    "Andrews Lesson 41.1.3",
    "Andrews Lesson 41.1.4",
    "Andrews Lesson 41.1.4.a",
    "Andrews Lesson 41.1.4.b",
    "Andrews Lesson 41.1.5",
    "Andrews Lesson 41.2",
    "Andrews Lesson 41.2.1",
    "Andrews Lesson 41.2.1.a",
    "Andrews Lesson 41.2.1.b",
    "Andrews Lesson 41.2.1.b.i",
    "Andrews Lesson 41.2.1.b.ii",
    "Andrews Lesson 41.2.2",
    "Andrews Lesson 41.2.3",
    "Andrews Lesson 41.3",
    "Andrews Lesson 41.4",
]);

const LESSON41_INTENSIFIED_ADJECTIVAL_NNC_FRAME = Object.freeze({
    kind: "lesson-41-intensified-adjectival-nnc-frame",
    sourceSection: "Andrews 41.1",
    multipleFormationFamilies: true,
    reduplicationFrame: Object.freeze({
        sourceSection: "Andrews 41.1.1",
        sourceAdjectivalStemHasVerbalOrDeverbalSource: true,
        longVowelReduplicationFromLesson27_2_2: true,
        notNominalReduplicationFromLesson14_3: true,
        glottalStopReduplicationSameAsNominalForDistributionVariety: true,
        requiresSubjectReferToAtLeastTwoDifferentiatedEntitiesForDistribution: true,
    }),
    pahMatrixFrame: Object.freeze({
        sourceSection: "Andrews 41.1.2",
        matrixPreteritAgentiveStem: "(pah-ti-0)-c",
        matrixMeaning: "potent",
        embedImplication: "in the form of or with regard to",
        embedAdjectiveStemFrame: Object.freeze({
            sourceSection: "Andrews 41.1.2.a",
            embedMayBeNounstemThatCanFormTiCAdjective: true,
            includesDestockalPatientiveNounstemsFromLesson39_4: true,
            crossRefLesson40_11: true,
        }),
        embedRootPlusYaFrame: Object.freeze({
            sourceSection: "Andrews 41.1.2.b",
            embedMayBeRootOfRootPlusYaPreteritAgentive: true,
        }),
        embedGeneralUseFrame: Object.freeze({
            sourceSection: "Andrews 41.1.2.c",
            embedMayBeGeneralUseAdjectivalPreteritAgentive: true,
            crossRefLesson35_5: true,
        }),
        embedReduplicatedFrame: Object.freeze({
            sourceSection: "Andrews 41.1.2.d",
            embedMayBeIntensifiedByReduplication: true,
        }),
        matrixInternalExpansionFrame: Object.freeze({
            sourceSection: "Andrews 41.1.2.e",
            internalExpansionExpressesSoundSymbolicIncreasedWeight: true,
            pahTiCBecomesPalalahTiC: true,
        }),
    }),
    otherPreteritAgentiveMatrixFrame: Object.freeze({
        sourceSection: "Andrews 41.1.3",
        lessFrequentCompoundMatricesExist: true,
        calTiCMatrix: true,
        calalahTiCExpandedMatrix: true,
        tzonTiCMatrix: true,
    }),
    affectiveMatrixFrame: Object.freeze({
        sourceSection: "Andrews 41.1.4",
        matrices: Object.freeze(["pol", "pil", "ton", "tzin"]),
        citesLesson32: true,
        preteritAgentiveEmbedRequiresGeneralUseShape: true,
        polFrame: Object.freeze({
            sourceSection: "Andrews 41.1.4.a",
            increasesIntensity: true,
            canTakeReduplicativePrefixFrom41_1_1: true,
        }),
        pilTonTzinFrame: Object.freeze({
            sourceSection: "Andrews 41.1.4.b",
            decreasesIntensity: true,
            tonMayShowUnexpectedTli: true,
        }),
    }),
    metaphorSimileFrame: Object.freeze({
        sourceSection: "Andrews 41.1.5",
        intensityCanBeExpressedByMetaphorOrSimile: true,
        syntacticIntensifiersDeferredToLesson49_6: true,
    }),
});

const LESSON41_COMPOUND_VERBSTEM_NOMINAL_EMBED_FRAME = Object.freeze({
    kind: "lesson-41-compound-verbstem-nominal-embed-frame",
    sourceSection: "Andrews 41.2",
    compoundVerbstemWithNominalEmbedSource: true,
    matrixVerbstemConvertedToMatrixNounstemByReanalysisOrDerivation: true,
    resultantCompoundNounstemNncCanFunctionAsAdjective: true,
    incorporatedAdverbFrame: Object.freeze({
        sourceSection: "Andrews 41.2.1",
        mostFrequentCompoundVerbstemSource: true,
        lesson30_7_12Frame: Object.freeze({
            sourceSection: "Andrews 41.2.1.a",
            modificationKinds: Object.freeze(["means", "instrument", "place", "time", "duration", "cause", "purpose", "manner", "compared manner"]),
        }),
        lesson30_14SupplementationFrame: Object.freeze({
            sourceSection: "Andrews 41.2.1.b",
            sourceSupplementarySubjectIsPossessiveStateNnc: true,
            differentEntitySubtypeFrame: Object.freeze({
                sourceSection: "Andrews 41.2.1.b.i",
                embedDifferentKindFromSubjectReferent: true,
                englishFormulaAdjectiveNounEd: true,
                subjectMayBeAnimateOrNonanimate: true,
                matrixMayReduplicateForDistributionOrVariety: true,
            }),
            sameEntitySubtypeFrame: Object.freeze({
                sourceSection: "Andrews 41.2.1.b.ii",
                embedSameKindAsSubjectReferent: true,
                englishFormulaAdjectiveNoun: true,
                subjectMustBeNonanimate: true,
                englishReversesGovernorAndGoverned: true,
                embeddedNounstemCannotFunctionAsSubject: true,
            }),
        }),
    }),
    incorporatedComplementFrame: Object.freeze({
        sourceSection: "Andrews 41.2.2",
        fewNncsManifestFormation: true,
    }),
    incorporatedObjectFrame: Object.freeze({
        sourceSection: "Andrews 41.2.3",
        compoundVerbstemCanOccurInPreteritAgentiveNnc: true,
        patientiveSourceDistinctionRequiresUnderlyingCompoundSource: true,
        morphologyAloneCannotDistinguishImpersonalPatientiveFromPassivePatientive: true,
        anyPatientiveNncCanFunctionAdjectivally: true,
        lessObviousOrLessFrequentThanIncorporatedAdverbSubtypes: true,
    }),
});

const LESSON41_DENOMINAL_COMPOUND_NOUNSTEM_FRAME = Object.freeze({
    kind: "lesson-41-denominal-compound-nounstem-frame",
    sourceSection: "Andrews 41.3",
    compoundNounstemCanSourceDerivedVerbstemWithTi: true,
    citesLesson54_2: true,
    mostFrequentUseIsAdjectivalPreteritAgentiveNnc: true,
    citesLesson40_8_1: true,
    currentEngineRequiresSegmentedCompoundNounstemSourceFrame: true,
});

const LESSON41_ADJECTIVAL_EMBED_COMPOUND_NNC_FRAME = Object.freeze({
    kind: "lesson-41-adjectival-embed-compound-nnc-frame",
    sourceSection: "Andrews 41.4",
    adjectivalNounstemCanEmbedAsModifierOfMatrixNounstem: true,
    singleNucleusCompoundConstructionDistinctFromLessons42_43Modification: true,
    citesLesson31_4: true,
    preteritAgentiveEmbedRequiresGeneralUseShape: true,
    preteritAgentiveGeneralUseEmbedIsLesson35_7CompoundNounstemConstruction: true,
    numeralStemCanEmbedAdjectivally: true,
    citesLesson34: true,
    generationCurrentlyDiagnosticOnly: true,
});

const LESSON41_ADJECTIVAL_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson41-intensified-adjectival-nncs", andrewsSection: "41.1", category: "intensified-adjectival-nnc", directiveEs: "La intensificacion adjetiva tiene varias fuentes; no se reduce a una sola ruta de reduplicacion.", engineSurface: "partial intensified adjectival route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-reduplicative-intensification", andrewsSection: "41.1.1", category: "reduplicative-intensification", directiveEs: "Si el tronco adjetivo viene de fuente verbal o deverbal, puede intensificarse con reduplicacion de 27.2.2, no con la nominal de 14.3.", engineSurface: "partial intensified route from generated formula slots", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-pah-matrix", andrewsSection: "41.1.2", category: "pah-matrix-intensification", directiveEs: "La matriz pah-ti-c expresa potencia y el incrustado aporta forma o respecto; las subclases quedan separadas.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pah-adjective-stem-embed", andrewsSection: "41.1.2.a", category: "pah-adjective-stem-embed", directiveEs: "El incrustado puede ser un nounstem que forma adjetivo ti-c, incluidos patientivos destockales.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pah-root-plus-ya-embed", andrewsSection: "41.1.2.b", category: "pah-root-plus-ya-embed", directiveEs: "El incrustado puede ser la raiz de un agentivo preterito de fuente raiz+ya.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pah-general-use-embed", andrewsSection: "41.1.2.c", category: "pah-general-use-embed", directiveEs: "El incrustado puede ser la forma de uso general del agentivo preterito adjetival.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pah-reduplicated-embed", andrewsSection: "41.1.2.d", category: "pah-reduplicated-embed", directiveEs: "El incrustado tambien puede intensificarse por la reduplicacion de 41.1.1.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pah-internal-expansion", andrewsSection: "41.1.2.e", category: "pah-internal-expansion", directiveEs: "La matriz puede expandirse internamente por simbolismo sonoro; mas peso fonologico sugiere mas peso semantico.", engineSurface: "diagnostic sound-symbolic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-other-preterit-agentive-matrices", andrewsSection: "41.1.3", category: "other-intensifying-matrices", directiveEs: "Otras matrices agentivas preteritas como cal, calalah y tzon tambien intensifican, pero no son regla general.", engineSurface: "diagnostic matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-affective-matrices", andrewsSection: "41.1.4", category: "affective-intensification", directiveEs: "Las matrices afectivas pol, pil, ton y tzin modulan intensidad; los agentivos preteritos incrustados usan forma general.", engineSurface: "diagnostic affective matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pol-increase", andrewsSection: "41.1.4.a", category: "pol-increase", directiveEs: "Pol aumenta la intensidad y puede llevar prefijo reduplicativo.", engineSurface: "diagnostic affective matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-pil-ton-tzin-decrease", andrewsSection: "41.1.4.b", category: "pil-ton-tzin-decrease", directiveEs: "Pil, ton y tzin disminuyen la intensidad; ton puede mostrar tli inesperado.", engineSurface: "diagnostic affective matrix frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-metaphor-simile", andrewsSection: "41.1.5", category: "metaphor-simile-intensification", directiveEs: "La intensidad tambien puede venir de metafora o simil; intensificadores sintacticos quedan para 49.6.", engineSurface: "diagnostic intensification frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-compound-verbstem-nominal-embed", andrewsSection: "41.2", category: "compound-verbstem-nominal-embed", directiveEs: "Un compuesto verbal con incrustado nominal puede reanalizar o derivar su matriz como nounstem y funcionar adjetivamente.", engineSurface: "partial compound-source adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-incorporated-adverb-source", andrewsSection: "41.2.1", category: "incorporated-adverb-source", directiveEs: "Los compuestos con adverbio incorporado son la fuente mas frecuente y tienen dos construcciones.", engineSurface: "partial compound-source adjectival route plus diagnostic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-incorporated-adverb-30-7-12", andrewsSection: "41.2.1.a", category: "lesson30-7-12-adverb-source", directiveEs: "El adverbio incorporado puede expresar medio, instrumento, lugar, tiempo, duracion, causa, proposito, modo o modo comparado.", engineSurface: "diagnostic source frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-incorporated-adverb-30-14", andrewsSection: "41.2.1.b", category: "lesson30-14-supplementation-source", directiveEs: "La fuente tambien puede venir de suplementacion con sujeto suplementario en CNN posesiva.", engineSurface: "diagnostic source frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-different-entity-subtype", andrewsSection: "41.2.1.b.i", category: "different-entity-subtype", directiveEs: "Un subtipo tiene incrustado de entidad distinta; el sujeto puede ser animado o no animado.", engineSurface: "diagnostic source frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-same-entity-subtype", andrewsSection: "41.2.1.b.ii", category: "same-entity-subtype", directiveEs: "Otro subtipo tiene incrustado de la misma entidad; el sujeto es no animado y el ingles invierte gobernador y gobernado.", engineSurface: "diagnostic source frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson41-incorporated-complement-source", andrewsSection: "41.2.2", category: "incorporated-complement-source", directiveEs: "Solo pocas CNN muestran la fuente de compuesto con complemento incorporado.", engineSurface: "diagnostic source frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-incorporated-object-source", andrewsSection: "41.2.3", category: "incorporated-object-source", directiveEs: "La fuente de objeto incorporado exige conocer el compuesto subyacente; la morfologia sola no distingue patientivo impersonal y pasivo.", engineSurface: "partial compound-source/patientive metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-denominal-compound-nounstem", andrewsSection: "41.3", category: "denominal-compound-nounstem", directiveEs: "Un nounstem compuesto puede formar un verbstem con ti y luego un agentivo preterito adjetival.", engineSurface: "partial denominal-compound adjectival route", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson41-adjectival-embed-compound-nnc", andrewsSection: "41.4", category: "adjectival-embed-compound-nnc", directiveEs: "Un nounstem adjetival puede incrustarse como modificador de la matriz; los agentivos preteritos usan forma general y los numerales tambien pueden incrustarse.", engineSurface: "diagnostic compound NNC embed frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson41AdjectivalNncSubsectionInventory() {
    return LESSON41_ADJECTIVAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON41_ADJECTIVAL_NNC_VALIDATION_REFS),
    }));
}

function buildLesson41AdjectivalNncPursuitFrame() {
    const subsectionInventory = getLesson41AdjectivalNncSubsectionInventory();
    const intensifiedAdjectivalNncFrame = cloneAdjectivalNncLessonRecord(LESSON41_INTENSIFIED_ADJECTIVAL_NNC_FRAME);
    const compoundVerbstemNominalEmbedFrame = cloneAdjectivalNncLessonRecord(LESSON41_COMPOUND_VERBSTEM_NOMINAL_EMBED_FRAME);
    const denominalCompoundNounstemFrame = cloneAdjectivalNncLessonRecord(LESSON41_DENOMINAL_COMPOUND_NOUNSTEM_FRAME);
    const adjectivalEmbedCompoundNncFrame = cloneAdjectivalNncLessonRecord(LESSON41_ADJECTIVAL_EMBED_COMPOUND_NNC_FRAME);
    const incorporatedAdverbRouteFrame = buildLesson41CompoundSourceRouteFrame({
        sourceSection: "Andrews 41.2.1",
        embedRole: "incorporated-adverb",
        matrixValence: "compound-verbstem-adverbial-source-matrix-valence",
        matrixFamilies: ["lesson30-7-12-adverb-source", "lesson30-14-supplementation-source"],
        consumedObjectSlot: "",
        valenceDelta: {
            incorporatedObjectSlots: 0,
            complementSlots: 0,
            adverbialFunctionSlots: 1,
            remainingExternalObjectSlots: 0,
        },
    });
    const incorporatedComplementRouteFrame = buildLesson41CompoundSourceRouteFrame({
        sourceSection: "Andrews 41.2.2",
        embedRole: "incorporated-complement",
        matrixValence: "compound-verbstem-complement-source-matrix-valence",
        matrixFamilies: ["rare-incorporated-complement-source"],
        consumedObjectSlot: "complement-slot",
        valenceDelta: {
            incorporatedObjectSlots: 0,
            complementSlots: 1,
            adverbialFunctionSlots: 0,
            remainingExternalObjectSlots: 0,
        },
    });
    const incorporatedObjectRouteFrame = buildLesson41CompoundSourceRouteFrame({
        sourceSection: "Andrews 41.2.3",
        embedRole: "incorporated-object",
        matrixValence: "compound-verbstem-object-source-matrix-valence",
        matrixFamilies: ["patientive-impersonal-source", "patientive-passive-source"],
        consumedObjectSlot: "obj1",
        valenceDelta: {
            incorporatedObjectSlots: 1,
            complementSlots: 0,
            adverbialFunctionSlots: 0,
            remainingExternalObjectSlots: 0,
        },
    });
    compoundVerbstemNominalEmbedFrame.incorporatedAdverbFrame.routeFrame = incorporatedAdverbRouteFrame;
    compoundVerbstemNominalEmbedFrame.incorporatedAdverbFrame.objectSlotOwnership = incorporatedAdverbRouteFrame.objectSlotOwnership;
    compoundVerbstemNominalEmbedFrame.incorporatedComplementFrame.routeFrame = incorporatedComplementRouteFrame;
    compoundVerbstemNominalEmbedFrame.incorporatedComplementFrame.objectSlotOwnership = incorporatedComplementRouteFrame.objectSlotOwnership;
    compoundVerbstemNominalEmbedFrame.incorporatedObjectFrame.routeFrame = incorporatedObjectRouteFrame;
    compoundVerbstemNominalEmbedFrame.incorporatedObjectFrame.objectSlotOwnership = incorporatedObjectRouteFrame.objectSlotOwnership;
    compoundVerbstemNominalEmbedFrame.routeFrames = [
        incorporatedAdverbRouteFrame,
        incorporatedComplementRouteFrame,
        incorporatedObjectRouteFrame,
    ];
    const remainingGaps = [
        "Current Lesson 41 adjectival NNC support is partial and does not exhaust intensified-stem families, pah/cal/tzon/affective matrix intensification, metaphor or simile intensification, all compound-verbstem source subtypes, or adjectival nounstems embedded in compound-stemmed NNCs.",
        "The current intensified route only works from generated formula slots and does not implement every Andrews matrix, internal expansion, sound-symbolic, affective, metaphorical, or syntactic-intensifier path.",
        "Compound-source and denominal-compound routes preserve generated Nawat surfaces only when source frames are present; full source disambiguation and Nawat/Pipil examples remain evidence-needed.",
        "Adjectival embeds in compound-stemmed NNCs and Lessons 42-43 modifier/head syntax remain outside current word generation.",
    ];
    const frame = {
        kind: "lesson-41-adjectival-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 41,
        aimStatus: "shooting",
        routeStage: "audit-lesson-41",
        pdfRefs: Array.from(LESSON41_ADJECTIVAL_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 41.1-41.4 against current intensified adjectival output, compound-verbstem nominal-embed adjectival routes, denominal compound nounstem routes, and adjectival nounstem embed boundaries.",
                andrewsRefs: Array.from(LESSON41_ADJECTIVAL_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON41_ADJECTIVAL_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                result: "hit",
                correction: "Lesson 41 now records Andrews intensified adjectival NNC families, compound-verbstem nominal-embed source subtypes, denominal compound nounstem sources, and adjectival nounstems as compound embeds while preserving current generation and evidence gates.",
                andrewsRefs: Array.from(LESSON41_ADJECTIVAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON41_ADJECTIVAL_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        intensifiedAdjectivalNncFrame,
        compoundVerbstemNominalEmbedFrame,
        denominalCompoundNounstemFrame,
        adjectivalEmbedCompoundNncFrame,
        currentEngineBoundary: {
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
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachAdjectivalNncPursuitGrammarContract(frame, {
        metadataKind: "lesson-41-adjectival-nnc-pursuit-frame",
        unitKind: "adjectival-nnc-boundary",
        routeStage: "audit-lesson-41",
        structuralSource: "Andrews Lesson 41",
        andrewsRefs: Array.from(LESSON41_ADJECTIVAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 41.1-41.4",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
            matrixSpellingsNeedNawatEvidence: Object.freeze(["pah", "cal", "tzon", "pol", "pil", "ton", "tzin"]),
        },
        morphBoundaryFrame: {
            intensifiedAdjectivalNncFrame,
            compoundVerbstemNominalEmbedFrame,
            denominalCompoundNounstemFrame,
            adjectivalEmbedCompoundNncFrame,
        },
        stemFrame: {
            stemKind: "adjectival-nnc-intensification-and-compound-source",
            currentSupportedFamilies: Object.freeze(["generated-formula-slot intensification", "compound-source adjectival", "denominal-compound adjectival"]),
            unsupportedMatrices: Object.freeze(["pah", "palalah", "cal", "calalah", "tzon", "pol", "pil", "ton", "tzin"]),
        },
        nuclearClauseFrame: {
            sourceClauseKind: "CNN/CNV source compounds",
            targetFunctionKind: "adjectival",
            singleNucleusCompoundEmbedsDistinctFromModificationAst: true,
            modificationAstDeferredToLessons42_43: true,
        },
        participantFrame: {
            semanticRole: "intensified modifier/predicate-quality candidate",
            embeddedNounstemCannotBeSubjectOfCompound: true,
            underlyingSourceCompoundRequiredForPatientiveDisambiguation: true,
            compoundSourceRouteFrames: [
                incorporatedAdverbRouteFrame,
                incorporatedComplementRouteFrame,
                incorporatedObjectRouteFrame,
            ],
        },
        targetContract: {
            metadataKind: "lesson-41-adjectival-nnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["adjectival-nnc-lesson-41-diagnostic-partial", "adjectival-nnc-needs-nawat-evidence"],
    });
}

function normalizeAdjectivalNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeAdjectivalNncFunction(value = "") {
    return normalizeAdjectivalNncEnum(
        value,
        Object.values(ADJECTIVAL_NNC_FUNCTION),
        ADJECTIVAL_NNC_FUNCTION.unknown
    );
}

function normalizeAdjectivalNncFalsePositiveSource(value = "") {
    return normalizeAdjectivalNncEnum(
        value,
        Object.values(ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE),
        ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getAdjectivalNncAntiConflationRules() {
    return Array.from(ADJECTIVAL_NNC_ANTI_CONFLATION_RULES);
}

function getAdjectivalNncStructuralQuestions() {
    return ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildAdjectivalNncFunctionBoundaryMetadata() {
    return {
        kind: "adjectival-nnc-function-boundary",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        lessons: [40, 41],
        status: "partial",
        structuralSource: "Andrews Lessons 40-41",
        targetAuthority: "Andrews grammar rule with Nawat/Pipil orthography",
        generationAllowed: "opt-in",
        confirmedExamples: [],
        structuralQuestions: getAdjectivalNncStructuralQuestions(),
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
        antiConflationRules: getAdjectivalNncAntiConflationRules(),
    };
}

function buildAdjectivalNncBoundaryMetadata() {
    return buildAdjectivalNncFunctionBoundaryMetadata();
}

function classifyAdjectivalNncFunctionCandidate({
    candidate = "",
    functionKind = "",
    sourceCategory = "",
    predicateSurface = "",
    adjectivalRole = "",
    evidenceSource = "",
    falsePositiveSource = "",
    hasNominalizationProfile = false,
} = {}) {
    const normalizedFunction = normalizeAdjectivalNncFunction(functionKind);
    const normalizedFalsePositive = normalizeAdjectivalNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "adjectival-nnc-function-candidate-classification",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        functionKind: normalizedFunction,
        sourceCategory: String(sourceCategory || ""),
        predicateSurface: String(predicateSurface || ""),
        adjectivalRole: String(adjectivalRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasNominalizationProfile: hasNominalizationProfile === true,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "adjectival-nnc-needs-validation" : "adjectival-nnc-needs-nawat-evidence",
            normalizedFunction !== ADJECTIVAL_NNC_FUNCTION.unknown
                ? "adjectival-nnc-function-recognized"
                : "adjectival-nnc-function-unconfirmed",
            hasNominalizationProfile ? "nominalization-profile-adjectival-function-is-metadata" : "nominalization-profile-absent",
            normalizedFalsePositive !== ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "adjectival-nnc-false-positive-source"
                : "adjectival-nnc-unconfirmed",
        ],
        boundary: buildAdjectivalNncFunctionBoundaryMetadata(),
    };
}

function classifyAdjectivalNncCandidate(options = {}) {
    return classifyAdjectivalNncFunctionCandidate({
        ...options,
        functionKind: options.functionKind || options.adjectivalFunction || "",
        predicateSurface: options.predicateSurface || options.surfaceRole || "",
        adjectivalRole: options.adjectivalRole || "",
    });
}

function classifyAdjectivalNncFalsePositive(source = "") {
    const normalizedSource = normalizeAdjectivalNncFalsePositiveSource(source);
    return {
        kind: "adjectival-nnc-false-positive",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdjectivalNncEvidence: false,
        isAdjectivalFunctionEvidence: false,
        isModifierHeadEvidence: false,
        isAdjectivalParadigmEvidence: false,
        isModificationEvidence: false,
        isSupplementationEvidence: false,
        isTopicEvidence: false,
        generationAllowed: false,
        diagnostics: ["adjectival-nnc-false-positive-source"],
        antiConflationRules: getAdjectivalNncAntiConflationRules(),
    };
}

function normalizeAdjectivalNncText(value = "") {
    return String(value || "").trim().toLowerCase();
}

function normalizeAdjectivalNncState(value = "") {
    const normalized = normalizeAdjectivalNncText(value || "absolutive");
    if (normalized === "absolutivo") {
        return "absolutive";
    }
    if (normalized === "posesivo" || normalized === "possessed") {
        return "possessive";
    }
    return normalized || "absolutive";
}

function buildAdjectivalNncDiagnostic(id = "", message = "", severity = "unsupported") {
    return { id, severity, message };
}

function normalizeAdjectivalNncSurfaceValue(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitAdjectivalNncSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdjectivalNncSurfaceValue(entry))
        .filter(Boolean);
}

function getAdjectivalNncResultFrame(result = null) {
    return (
        (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null)
        || (result?.frames && typeof result.frames === "object" ? result.frames : null)
    );
}

function getAdjectivalNncResultFramePayload(result = null) {
    const grammarFrame = getAdjectivalNncResultFrame(result);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getAdjectivalNncSurfaceForms(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const frameResult = getAdjectivalNncResultFramePayload(output);
    const hasResultFrame = Boolean(frameResult);
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitAdjectivalNncSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(output.surfaceForms)) {
        forms.push(...output.surfaceForms);
    }
    if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
    }
    if (!hasResultFrame && output.result) {
        forms.push(output.result);
    }
    return forms
        .flatMap((entry) => splitAdjectivalNncSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getAdjectivalNncSurface(result = null) {
    return getAdjectivalNncSurfaceForms(result)[0] || "";
}

function resolveAdjectivalNncGrammarFrameSourceInput(output = null, functionFrame = null, surface = "") {
    const resultFrame = getAdjectivalNncResultFramePayload(output);
    if (resultFrame && !surface) {
        return "";
    }
    const frame = functionFrame && typeof functionFrame === "object" ? functionFrame : {};
    const result = output && typeof output === "object" ? output : {};
    return normalizeAdjectivalNncSurfaceValue(
        frame.patientivoSurface
        || frame.nominalizedSurface
        || frame.denominalCompoundSurface
        || frame.vncSurface
        || result.stem
        || ""
    );
}

function cloneAdjectivalNncSourceRouteFrame(frame = null) {
    if (!frame || typeof frame !== "object" || Array.isArray(frame)) {
        return null;
    }
    return { ...frame };
}

function resolveAdjectivalNncSourceRouteFrame(output = null, functionFrame = null) {
    const result = output && typeof output === "object" ? output : {};
    const frame = functionFrame && typeof functionFrame === "object" ? functionFrame : {};
    const inheritedGrammarFrame = result.grammarFrame && typeof result.grammarFrame === "object"
        ? result.grammarFrame
        : (result.frames && typeof result.frames === "object" ? result.frames : null);
    const functionGrammarFrame = frame.grammarFrame && typeof frame.grammarFrame === "object"
        ? frame.grammarFrame
        : (frame.frames && typeof frame.frames === "object" ? frame.frames : null);
    const candidates = [
        result.incorporationRouteFrame,
        result.compoundRouteFrame,
        result.routeFrame,
        result.denominalCompoundSourceFrame?.incorporationRouteFrame,
        result.denominalCompoundSourceFrame?.compoundRouteFrame,
        result.denominalCompoundSourceFrame?.routeFrame,
        result.rootPlusYaAdjectivalNncFrame?.denominalCompoundSourceFrame?.incorporationRouteFrame,
        result.rootPlusYaAdjectivalNncFrame?.denominalCompoundSourceFrame?.compoundRouteFrame,
        result.rootPlusYaAdjectivalNncFrame?.denominalCompoundSourceFrame?.routeFrame,
        frame.incorporationRouteFrame,
        frame.compoundRouteFrame,
        frame.routeFrame,
        frame.denominalCompoundSourceFrame?.incorporationRouteFrame,
        frame.denominalCompoundSourceFrame?.compoundRouteFrame,
        frame.denominalCompoundSourceFrame?.routeFrame,
        frame.sourceCompoundFrame?.incorporationRouteFrame,
        frame.sourceCompoundFrame?.compoundRouteFrame,
        frame.sourceCompoundFrame?.routeFrame,
        frame.sourceDenominalCompoundFrame?.incorporationRouteFrame,
        frame.sourceDenominalCompoundFrame?.compoundRouteFrame,
        frame.sourceDenominalCompoundFrame?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.participantFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.participantFrame?.routeFrame,
        inheritedGrammarFrame?.participantFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.stemFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.stemFrame?.routeFrame,
        inheritedGrammarFrame?.stemFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.routeFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.incorporationRouteFrame,
        functionGrammarFrame?.routeContract?.sourceContract?.sourceRouteFrame,
        functionGrammarFrame?.routeContract?.sourceContract?.routeFrame,
        functionGrammarFrame?.routeContract?.sourceContract?.incorporationRouteFrame,
        functionGrammarFrame?.participantFrame?.sourceRouteFrame,
        functionGrammarFrame?.participantFrame?.routeFrame,
        functionGrammarFrame?.participantFrame?.incorporationRouteFrame,
    ];
    return cloneAdjectivalNncSourceRouteFrame(
        candidates.find((candidate) => candidate && typeof candidate === "object") || null
    );
}

function buildAdjectivalNncGrammarFrame(result = null) {
    if (typeof buildGrammarFrame !== "function") {
        return null;
    }
    const output = result && typeof result === "object" ? result : {};
    const functionFrame = output.adjectivalNncFunctionFrame || {};
    const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
    const surfaceForms = getAdjectivalNncSurfaceForms(output);
    const surface = getAdjectivalNncSurface(output);
    const ok = Boolean(surface || surfaceForms.length) && output.supported !== false && output.error !== true;
    const sourceFormulaSlots = output.formulaSlots || functionFrame.sourceFormulaSlots || null;
    const sourceFormulaEcho = output.formulaEcho || functionFrame.sourceFormulaEcho || "";
    const sourceInput = resolveAdjectivalNncGrammarFrameSourceInput(output, functionFrame, surface);
    const hasEmptyResultFrame = Boolean(getAdjectivalNncResultFramePayload(output) && !surface);
    const sourceRouteFrame = resolveAdjectivalNncSourceRouteFrame(output, functionFrame);
    const sourceRouteObjectSlotOwnership = sourceRouteFrame?.objectSlotOwnership
        && typeof sourceRouteFrame.objectSlotOwnership === "object"
        ? sourceRouteFrame.objectSlotOwnership
        : null;
    const routeContract = typeof buildGrammarRouteContractFrame === "function"
        ? buildGrammarRouteContractFrame({
            routeFamily: "adjectival-nnc",
            routeStage: "execute",
            sourceContract: {
                sourceCategory: functionFrame.sourceCategory || "",
                sourceClauseKind: functionFrame.sourceClauseKind || output.clauseKind || "",
                requiredPredicateState: functionFrame.requiredPredicateState || "",
                requestedPredicateState: functionFrame.requestedPredicateState || output.state || "",
                sourceVerb: functionFrame.sourceVerb || "",
                sourceTenseValue: functionFrame.sourceTenseValue || "",
                sourceCombinedMode: functionFrame.sourceCombinedMode || "",
                sourceVoiceMode: functionFrame.sourceVoiceMode || "",
                sourceDenominalCompoundFrame: functionFrame.sourceDenominalCompoundFrame || null,
                sourceCompoundFrame: functionFrame.sourceCompoundFrame || null,
                sourceRouteFrame,
                routeFrame: sourceRouteFrame,
            },
            targetContract: {
                outputKind: output.outputKind || "",
                functionKind: functionFrame.functionKind || "",
                generationRoute: output.generationRoute || "adjectival-nnc",
                sourceRouteFrame,
                routeFrame: sourceRouteFrame,
            },
            generationAllowed: ok,
            blockingDiagnostics: ok ? [] : diagnostics,
        })
        : null;
    const resultFrame = typeof buildGrammarResultFrame === "function"
        ? buildGrammarResultFrame({
            ok,
            surface,
            surfaceForms,
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || "adjectival-nnc",
            sourceInput,
        })
        : null;
    const diagnosticFrame = typeof buildGrammarDiagnosticFrame === "function"
        ? buildGrammarDiagnosticFrame({
            status: ok ? "generated" : (diagnostics.length ? "blocked" : "pending"),
            diagnostics,
            blockers: ok ? [] : diagnostics,
        })
        : null;
    const authorityFrame = typeof buildGrammarAuthorityFrame === "function"
        ? buildGrammarAuthorityFrame({
            evidenceStatus: ok ? "generated" : (diagnostics.length ? "blocked" : "pending"),
            andrewsRefs: [functionFrame.lessonRef || "Andrews 40"].filter(Boolean),
            supported: ok,
        })
        : null;
    return buildGrammarFrame({
        authorityFrame,
        unitFrame: {
            unitKind: functionFrame.sourceClauseKind === "verbal-nuclear-clause"
                ? "verbal-nuclear-clause"
                : "ordinary-nnc",
            outputKind: output.outputKind || "",
            generationRoute: output.generationRoute || "adjectival-nnc",
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            formulaSlots: sourceFormulaSlots,
            formulaEcho: String(sourceFormulaEcho || ""),
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
        },
        stemFrame: {
            stem: hasEmptyResultFrame ? "" : String(output.stem || surface || ""),
            sourceStem: hasEmptyResultFrame
                ? ""
                : (sourceInput || normalizeAdjectivalNncSurfaceValue(functionFrame.sourcePredicateStem || "")),
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
        },
        nuclearClauseFrame: null,
        participantFrame: {
            sourceCategory: functionFrame.sourceCategory || "",
            sourceClauseKind: functionFrame.sourceClauseKind || output.clauseKind || "",
            functionKind: functionFrame.functionKind || "",
            sourceRouteFrame,
            routeFrame: sourceRouteFrame,
            objectSlotOwnership: sourceRouteObjectSlotOwnership,
            routeFrameLicensesObjectSlotOwnership: sourceRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
            finalFormulaShapeDoesNotLicenseObjectSlots: sourceRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
            functionUseDoesNotLicenseObjectSlots: sourceRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
        },
        inflectionFrame: {
            tenseMode: "adjetivo",
            state: output.state || functionFrame.actualPredicateState || "",
            sourceTenseValue: functionFrame.sourceTenseValue || "",
            sourceCombinedMode: functionFrame.sourceCombinedMode || "",
            sourceVoiceMode: functionFrame.sourceVoiceMode || "",
        },
        routeContract,
        astFrame: null,
        resultFrame,
        diagnosticFrame,
    });
}

function attachAdjectivalNncGrammarContract(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const grammarFrame = buildAdjectivalNncGrammarFrame(output);
    const resultContract = typeof buildGrammarResultContract === "function"
        ? buildGrammarResultContract({ result: output, grammarFrame })
        : {
            ok: Boolean(getAdjectivalNncSurface(output)) && output.supported !== false && output.error !== true,
            surface: getAdjectivalNncSurface(output),
            surfaceForms: getAdjectivalNncSurfaceForms(output),
            frames: grammarFrame,
            diagnostics: Array.isArray(output.diagnostics) ? output.diagnostics : [],
        };
    return {
        ...output,
        grammarFrame,
        ...resultContract,
    };
}

function isRootPlusYaAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit;
}

function shouldGenerateRootPlusYaAdjectivalNnc(options = {}) {
    return options?.rootPlusYaObsoletePreterit === true
        || isRootPlusYaAdjectivalNncFormation(options?.formation)
        || isRootPlusYaAdjectivalNncFormation(options?.subtype)
        || isRootPlusYaAdjectivalNncFormation(options?.sourceFormation);
}

function isIntensifiedAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival;
}

function shouldGenerateIntensifiedAdjectivalNnc(options = {}) {
    return options?.intensifiedAdjectival === true
        || isIntensifiedAdjectivalNncFormation(options?.formation)
        || isIntensifiedAdjectivalNncFormation(options?.subtype)
        || isIntensifiedAdjectivalNncFormation(options?.sourceFormation);
}

function isPatientiveAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.patientiveAdjectival;
}

function shouldGeneratePatientiveAdjectivalNnc(options = {}) {
    return options?.patientiveAdjectival === true
        || isPatientiveAdjectivalNncFormation(options?.formation)
        || isPatientiveAdjectivalNncFormation(options?.subtype)
        || isPatientiveAdjectivalNncFormation(options?.sourceFormation);
}

function isVncAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.vncAdjectival;
}

function shouldGenerateVncAdjectivalNnc(options = {}) {
    return options?.vncAdjectival === true
        || isVncAdjectivalNncFormation(options?.formation)
        || isVncAdjectivalNncFormation(options?.subtype)
        || isVncAdjectivalNncFormation(options?.sourceFormation);
}

function isCompoundSourceAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.compoundSourceAdjectival;
}

function shouldGenerateCompoundSourceAdjectivalNnc(options = {}) {
    return options?.compoundSourceAdjectival === true
        || isCompoundSourceAdjectivalNncFormation(options?.formation)
        || isCompoundSourceAdjectivalNncFormation(options?.subtype)
        || isCompoundSourceAdjectivalNncFormation(options?.sourceFormation);
}

function isDenominalCompoundAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.denominalCompoundAdjectival;
}

function shouldGenerateDenominalCompoundAdjectivalNnc(options = {}) {
    return options?.denominalCompoundAdjectival === true
        || isDenominalCompoundAdjectivalNncFormation(options?.formation)
        || isDenominalCompoundAdjectivalNncFormation(options?.subtype)
        || isDenominalCompoundAdjectivalNncFormation(options?.sourceFormation);
}

function isNominalizedVncAdjectivalNncFormation(value = "") {
    return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.nominalizedVncAdjectival;
}

function shouldGenerateNominalizedVncAdjectivalNnc(options = {}) {
    return options?.nominalizedVncAdjectival === true
        || isNominalizedVncAdjectivalNncFormation(options?.formation)
        || isNominalizedVncAdjectivalNncFormation(options?.subtype)
        || isNominalizedVncAdjectivalNncFormation(options?.sourceFormation);
}

function getAdjectivalNncFormulaSlotResultFrame(slot = null) {
    if (!slot || typeof slot !== "object") {
        return null;
    }
    const grammarFrame = slot.grammarFrame && typeof slot.grammarFrame === "object"
        ? slot.grammarFrame
        : (slot.frames && typeof slot.frames === "object" ? slot.frames : null);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getAdjectivalNncFormulaSlotFramedSurface(slot = null) {
    const resultFrame = getAdjectivalNncFormulaSlotResultFrame(slot);
    if (!resultFrame) {
        return null;
    }
    const forms = [];
    if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame.surface) {
        forms.push(resultFrame.surface);
    }
    return forms.flatMap((entry) => splitAdjectivalNncSurfaceText(entry))[0] || "";
}

function resolveAdjectivalNncFormulaSlotText(slot = null, fields = []) {
    const framedSurface = getAdjectivalNncFormulaSlotFramedSurface(slot);
    if (framedSurface !== null) {
        return framedSurface;
    }
    const source = slot && typeof slot === "object" ? slot : {};
    for (const field of fields) {
        const value = normalizeAdjectivalNncSurfaceValue(source[field]);
        if (value) {
            return value;
        }
    }
    return "";
}

function buildAdjectivalNncFormulaEchoFromSlots(formulaSlots = null) {
    if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
    }
    const subject = formulaSlots.pers1Pers2 || {};
    const predicate = formulaSlots.predicateStem || {};
    const connector = formulaSlots.num1Num2 || {};
    const stem = resolveAdjectivalNncFormulaSlotText(predicate, ["stem", "surface"]);
    if (!stem) {
        return "";
    }
    const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
    const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
    const connectorSurface = resolveAdjectivalNncFormulaSlotText(connector, ["connector", "surface"]) || "Ø";
    return `#${prefix}-${suffix}(${stem})${connectorSurface}#`;
}

function buildRootPlusYaAdjectivalNncFormulaSlots({
    rootPlusYaBase = "",
    subject = null,
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    return {
        pers1Pers2: {
            role: "subject-person",
            slot: "pers1-pers2",
            prefix: String(subject?.subjectPrefix || ""),
            suffix: String(subject?.subjectSuffix || ""),
            displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
            displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
            label: String(subject?.personSubKey || "3sg"),
        },
        predicateStem: {
            role: "predicate",
            slot: "STEM",
            stem: rootPlusYaBase,
            state: "absolutive",
            sourceFormation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
            sourceFormationSubtype,
        },
        num1Num2: {
            role: "subject-number-connector",
            slot: "num1-num2",
            connector: "k",
            surface: "k",
            label: "obsolete preterit Class A subject-number connector",
            belongsTo: "subject",
            referenceNumber: "singular",
            pluralType: "",
            nounClass: "",
            connectorClass: "preterit-agentive-a",
            notNounSuffix: true,
            notStatePosition: true,
        },
    };
}

function buildIntensifiedAdjectivalNncFormulaSlots({
    sourceFormulaSlots = null,
    intensifiedStem = "",
} = {}) {
    const sourceSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object"
        ? sourceFormulaSlots
        : {};
    const predicate = sourceSlots.predicateStem || {};
    const sourceStem = resolveAdjectivalNncFormulaSlotText(predicate, ["stem", "surface"]);
    const {
        grammarFrame: _sourcePredicateGrammarFrame,
        frames: _sourcePredicateFrames,
        ...predicateMetadata
    } = predicate;
    return {
        pers1Pers2: {
            ...(sourceSlots.pers1Pers2 || {}),
        },
        predicateStem: {
            ...predicateMetadata,
            stem: String(intensifiedStem || "").trim(),
            sourceStem,
            sourceFormation: ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival,
            sourceFormationSubtype: "reduplicative-intensification",
        },
        num1Num2: {
            ...(sourceSlots.num1Num2 || {}),
        },
    };
}

function resolveAdjectivalNncParsedVerb(rawStem = "") {
    const raw = String(rawStem || "").trim();
    if (!raw) {
        return null;
    }
    return typeof parseVerbInput === "function"
        ? parseVerbInput(raw)
        : {
            sourceRawVerb: raw,
            verb: raw.replace(/[()]/g, ""),
            analysisVerb: raw.replace(/[()]/g, ""),
            isRootPlusYa: false,
            rootPlusYaBase: "",
            rootPlusYaBasePronounceable: "",
            isWeya: false,
        };
}

function resolveRootPlusYaAdjectivalNncSource(parsedVerb = null) {
    if (!parsedVerb || typeof parsedVerb !== "object") {
        return {
            supported: false,
            rootPlusYaBase: "",
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa,
        };
    }
    const sourceVerb = String(parsedVerb.verb || parsedVerb.analysisVerb || "").trim();
    const rawSource = String(parsedVerb.sourceRawVerb || parsedVerb.displayVerb || "").trim();
    const displayCore = String(parsedVerb.displayCore || "").trim();
    const hasSlashTiyaSource = /\/\s*tiya\s*\)?$/i.test(rawSource)
        || /\/\s*tiya\s*$/i.test(displayCore);
    const sourceEndsInTiya = /tiya$/i.test(sourceVerb);
    const parsedBase = String(
        parsedVerb.rootPlusYaBasePronounceable
        || parsedVerb.rootPlusYaBase
        || parsedVerb.bareRootPlusYaBasePronounceable
        || parsedVerb.bareRootPlusYaBase
        || ""
    ).trim();
    if (parsedVerb.isWeya === true) {
        return {
            supported: false,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException,
        };
    }
    if (hasSlashTiyaSource && sourceEndsInTiya) {
        return {
            supported: true,
            rootPlusYaBase: sourceVerb.slice(0, -2),
            sourceFormationSubtype: ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya,
            diagnosticId: "",
        };
    }
    if (parsedVerb.hasSlashMarker === true) {
        return {
            supported: false,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: "",
            diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported,
        };
    }
    if (parsedVerb.isRootPlusYa === true && parsedBase) {
        return {
            supported: true,
            rootPlusYaBase: parsedBase,
            sourceFormationSubtype: sourceEndsInTiya
                ? ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.denominalTiya
                : ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
            diagnosticId: "",
        };
    }
    return {
        supported: false,
        rootPlusYaBase: parsedBase,
        sourceFormationSubtype: "",
        diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa,
    };
}

function resolveAdjectivalNncSourceFormationFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    const sourceVerb = normalizeAdjectivalNncText(parsedVerb?.verb || parsedVerb?.analysisVerb || "");
    const sourceBase = normalizeAdjectivalNncText(rootPlusYaBase || "");
    const subtype = normalizeAdjectivalNncText(sourceFormationSubtype || ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa);
    const usesKTiYa = /(?:c|k)tiya$/.test(sourceVerb) || /(?:c|k)ti$/.test(sourceBase);
    const usesZTiYa = /ztiya$/.test(sourceVerb) || /zti$/.test(sourceBase);
    const isDenominalTiya = subtype === ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.denominalTiya
        || subtype === ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya;
    const sourcePattern = usesZTiYa
        ? ADJECTIVAL_NNC_SOURCE_PATTERN.zTiYa
        : (usesKTiYa
            ? ADJECTIVAL_NNC_SOURCE_PATTERN.kTiYa
            : (isDenominalTiya
                ? ADJECTIVAL_NNC_SOURCE_PATTERN.tiYa
                : ADJECTIVAL_NNC_SOURCE_PATTERN.rootPlusYa));
    const lessonRef = usesZTiYa
        ? "Andrews 40.11"
        : (usesKTiYa ? "Andrews 40.10" : "Andrews 40.9");
    const synonymSetKind = usesZTiYa
        ? "triplet"
        : (usesKTiYa ? "pair" : "none");
    const andrewsSourcePattern = usesZTiYa
        ? "z-ti-ya"
        : (usesKTiYa ? "c-ti-ya" : sourcePattern);
    const nawatOrthographyPattern = usesZTiYa
        ? "z-ti-ya -> z-tik"
        : (usesKTiYa
            ? "k-ti-ya/c-ti-ya -> k-tik/c-tik"
            : (sourcePattern === ADJECTIVAL_NNC_SOURCE_PATTERN.tiYa ? "ti-ya -> tik" : "root-plus-ya -> k"));
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        kind: "adjectival-nnc-source-formation-frame",
        lessonRef,
        formation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
        sourceFormationSubtype: subtype,
        sourcePattern,
        andrewsSourcePattern,
        nawatOrthographyPattern,
        synonymSetKind,
        outputContract: "generate-current-source-only",
        generatesSiblingSynonymForms: false,
        doesNotGenerateSiblingForms: true,
        sourceVerb,
        sourceRootPlusYaBase: sourceBase,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function getAdjectivalNncDenominalCompoundSourceParts(parsedVerb = null) {
    const rawCandidates = [
        parsedVerb?.sourceRawVerb,
        parsedVerb?.displayVerb,
        parsedVerb?.displayCore,
    ].map((entry) => String(entry || "").trim()).filter(Boolean);
    for (const raw of rawCandidates) {
        const inner = raw.replace(/^\(+/, "").replace(/\)+$/, "");
        const parts = inner
            .split("/")
            .map((part) => normalizeAdjectivalNncText(part.replace(/[()]/g, "")))
            .filter(Boolean);
        if (parts.length >= 3 && parts[parts.length - 1] === "tiya") {
            return parts.slice(0, -1);
        }
    }
    return [];
}

function getDenominalCompoundAdjectivalNncSourceSurface(parsedVerb = null, compoundParts = []) {
    const rawInput = String(
        parsedVerb?.sourceRawVerb
        || parsedVerb?.displayVerb
        || parsedVerb?.displayCore
        || ""
    ).trim();
    if (rawInput) {
        return rawInput;
    }
    const parts = Array.isArray(compoundParts)
        ? compoundParts.map((part) => normalizeAdjectivalNncText(part)).filter(Boolean)
        : [];
    return parts.length ? `(${parts.join("/")}/tiya)` : "";
}

function buildDenominalCompoundAdjectivalNncObjectSlotOwnershipFrame({
    embedRole = "",
    matrixValence = "",
} = {}) {
    const resolvedMatrixValence = String(matrixValence || "").trim();
    const matrixValenceFrameFixed = Boolean(resolvedMatrixValence);
    return {
        kind: "denominal-compound-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed,
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        sourceExternalObjectSlots: [],
        remainingExternalObjectSlots: [],
        sourceExternalObjectSlotsOwnedBy: "none",
        remainingExternalObjectSlotsOwnedBy: "none",
        embeddedRoleLicensedBy: embedRole ? "denominal-compound-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
        objectSlotLicensingOrder: [
            "source-principal-nnc",
            "denominal-verbstem-route",
            "matrix-valence-frame",
            "route-frame",
            "function-use-annotation",
        ],
    };
}

function buildDenominalCompoundAdjectivalNncRouteFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    compoundParts = [],
    matrixStem = "",
    embeds = [],
} = {}) {
    const sourceSurface = getDenominalCompoundAdjectivalNncSourceSurface(parsedVerb, compoundParts);
    const normalizedEmbeds = Array.isArray(embeds) ? embeds : [];
    const sourceAdjunctNncs = normalizedEmbeds.map((entry) => ({
        surface: String(entry?.value || ""),
        stem: String(entry?.value || ""),
        kind: String(entry?.kind || "nounstem"),
        role: String(entry?.role || ""),
        sourceLayer: String(entry?.source || "segmented-denominal-tiya"),
    }));
    const embedRole = sourceAdjunctNncs.length === 1
        ? sourceAdjunctNncs[0].role
        : (sourceAdjunctNncs.length ? "multiple-compound-noun-embeds" : "");
    const embeddedRoot = sourceAdjunctNncs.length === 1 ? sourceAdjunctNncs[0].stem : "";
    const matrixValence = "compound-nounstem-no-verbal-object-slots";
    const objectSlotOwnership = buildDenominalCompoundAdjectivalNncObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
    });
    const matrixValenceFrameFixed = objectSlotOwnership.matrixValenceFrameFixed === true;
    return {
        kind: "denominal-compound-route-frame",
        version: 1,
        sourcePrincipalVnc: {
            surface: sourceSurface,
            generatedVerbstem: String(parsedVerb?.verb || parsedVerb?.analysisVerb || ""),
            formulaSlots: null,
            formulaEcho: "",
            sourceKind: "denominal-cnv-from-compound-nounstem",
        },
        sourcePrincipalNnc: {
            surface: Array.isArray(compoundParts) ? compoundParts.join("/") : "",
            sourceKind: "compound-nounstem",
        },
        sourceAdjunctNnc: sourceAdjunctNncs[0] || null,
        sourceAdjunctNncs,
        matrix: {
            role: "matrix",
            root: String(matrixStem || ""),
            stem: String(matrixStem || ""),
            sourceKind: "nounstem",
        },
        matrixValence,
        embedRole,
        embeddedRoot,
        embeddedRoots: sourceAdjunctNncs.map((entry) => entry.stem).filter(Boolean),
        consumedObjectSlot: "",
        sourceExternalObjectSlots: [],
        remainingExternalObjectSlots: [],
        remainingExternalObjectSlotIds: [],
        objectSlotOwnership,
        valenceDelta: 0,
        valenceEffects: {
            sourceExternalObjectSlotCount: 0,
            remainingExternalObjectSlotCount: 0,
            externalObjectSlotDelta: 0,
            stemInternalObjectSlotDelta: 0,
            compoundNounstemEmbedCount: sourceAdjunctNncs.length,
            denominalOperationDoesNotConsumeObjectSlot: true,
        },
        andrewsSection: "Andrews 41.3",
        andrewsRefs: ["Andrews 41.3", "Andrews 54.2", "Andrews 40.8.1"],
        generationStatus: "generated-source-carried-route-frame",
        generationAllowed: false,
        routeStage: "denominal-compound-source-frame",
        sourceLayer: "route-frame",
        sourceRootPlusYaBase: String(rootPlusYaBase || ""),
        finalFormulaShape: "compound-nounstem-denominal-ti-adjectival-nnc",
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseRole: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        boundaries: {
            matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
            routeFrameOwnsEmbedRoleLicensing: true,
            finalFormulaShapeDoesNotLicenseRole: true,
            functionUseDoesNotLicenseRole: true,
        },
    };
}

function resolveDenominalCompoundAdjectivalNncSourceFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = "",
} = {}) {
    const subtype = normalizeAdjectivalNncText(sourceFormationSubtype || "");
    if (subtype !== ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya) {
        return null;
    }
    const compoundParts = getAdjectivalNncDenominalCompoundSourceParts(parsedVerb);
    if (compoundParts.length < 2) {
        return null;
    }
    const matrixStem = compoundParts[compoundParts.length - 1] || "";
    const embeds = compoundParts.slice(0, -1).map((value, index) => ({
        role: index === compoundParts.length - 2 ? "adjacent-compound-noun-embed" : "outer-compound-noun-embed",
        kind: "nounstem",
        value,
        source: "segmented-denominal-tiya",
        index,
        explicit: true,
    }));
    const routeFrame = buildDenominalCompoundAdjectivalNncRouteFrame({
        parsedVerb,
        rootPlusYaBase,
        compoundParts,
        matrixStem,
        embeds,
    });
    return {
        kind: "denominal-compound-nounstem-frame",
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        lessonRef: "Andrews 41.3",
        cites: ["Andrews 54.2", "Andrews 40.8.1"],
        outputKind: "adjectival-nnc-denominal-compound-source",
        sourceCategory: "compound-nounstem",
        sourceStemType: "compound-nounstem",
        operation: {
            type: "denominal-verbstem",
            suffix: "ti",
            nawatInputSuffix: "tiya",
        },
        resultantNncKind: "preterit-agentive-adjectival",
        matrix: {
            role: "matrix",
            stem: matrixStem,
        },
        embeds,
        sourceInput: {
            rawInput: String(parsedVerb?.sourceRawVerb || ""),
            displayVerb: String(parsedVerb?.displayVerb || ""),
            displayCore: String(parsedVerb?.displayCore || ""),
            verb: String(parsedVerb?.verb || ""),
            analysisVerb: String(parsedVerb?.analysisVerb || ""),
            parts: compoundParts,
        },
        generatedVerbstem: String(parsedVerb?.verb || parsedVerb?.analysisVerb || ""),
        sourceRootPlusYaBase: String(rootPlusYaBase || ""),
        compoundRouteFrame: routeFrame,
        routeFrame,
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
            changesSurfaceForms: false,
            noNewSurfaceForms: true,
            noModificationAst: true,
            noClassicalSurfaceImport: true,
        },
    };
}

function buildRootPlusYaAdjectivalNncFunctionFrame({
    parsedVerb = null,
    rootPlusYaBase = "",
    formulaSlots = null,
    requestedState = "absolutive",
    role = "predicate-surface",
    sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
} = {}) {
    const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
    const sourceFormationFrame = resolveAdjectivalNncSourceFormationFrame({
        parsedVerb,
        rootPlusYaBase,
        sourceFormationSubtype,
    });
    const denominalCompoundSourceFrame = resolveDenominalCompoundAdjectivalNncSourceFrame({
        parsedVerb,
        rootPlusYaBase,
        sourceFormationSubtype,
    });
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-root-plus-ya",
        lessonRef: "Andrews 40.9",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.adjectivalSurface,
        role,
        rule: "root-plus-ya adjectival NNC uses the obsolete preterit/root base plus the subject-number connector",
        formation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
        sourceFormationSubtype,
        sourceFormationFrame,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceVerb: parsedVerb?.sourceRawVerb || parsedVerb?.verb || "",
        sourceRootPlusYaBase: rootPlusYaBase,
        denominalCompoundSourceFrame,
        sourceFormulaSlots: formulaSlots,
        sourceFormulaEcho: formulaEcho,
        usesObsoletePreteritBase: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildRootPlusYaAdjectivalNncUnsupportedOutput({
    stem = "",
    requestedState = "absolutive",
    diagnostic = null,
    parsedVerb = null,
    rootPlusYaBase = "",
    sourceFormationSubtype = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase: rootPlusYaBase || parsedVerb?.rootPlusYaBasePronounceable || parsedVerb?.rootPlusYaBase || "",
        formulaSlots: null,
        requestedState,
        sourceFormationSubtype,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(parsedVerb?.verb || stem || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        denominalCompoundSourceFrame: frame.denominalCompoundSourceFrame || null,
        diagnostics,
    });
}

function buildAdjectivalNncFunctionFrame({
    sourceNnc = null,
    requestedState = "absolutive",
    role = "modifier-candidate",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-function",
        lessonRef: "Andrews 40.1",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.modifierCandidate,
        role,
        rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: sourceNnc?.state || "",
        sourceClauseKind: sourceNnc?.clauseKind || "",
        sourceFormulaSlots: sourceNnc?.nncBasic?.formulaSlots || sourceNnc?.clauseFrame?.formulaSlots || null,
        sourceFormulaEcho: sourceNnc?.nncBasic?.formulaEcho || sourceNnc?.clauseFrame?.formulaEcho || "",
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildAdjectivalNncUnsupportedOutput({
    stem = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceNnc = null,
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    if (sourceNnc && Array.isArray(sourceNnc.diagnostics)) {
        diagnostics.push(...sourceNnc.diagnostics);
    }
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(sourceNnc?.stem || stem || ""),
        state: sourceNnc?.state || requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildAdjectivalNncFunctionFrame({
            sourceNnc,
            requestedState,
        }),
        sourceNnc: sourceNnc || null,
        diagnostics,
    });
}

function buildPatientivoAdjectivalNncFunctionFrame({
    patientivoSurface = "",
    patientivoSource = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    const patientiveFamilyProfile = nominalizationProfile?.patientiveFamilyProfile || null;
    const source = nominalizationProfile?.source || {};
    const resolvedPatientivoSource = String(
        patientivoSource
        || patientiveFamilyProfile?.family
        || nominalizationProfile?.role?.patientiveFamily
        || ""
    ).trim();
    const resolvedSourceTense = String(
        sourceTenseValue
        || patientiveFamilyProfile?.sourceTense
        || source.sourceTense
        || ""
    ).trim();
    const resolvedSourceMode = String(
        sourceCombinedMode
        || source.sourceCombinedMode
        || ""
    ).trim();
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-patientive-function",
        lessonRef: "Andrews 40.4",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.patientiveAdjectival,
        role,
        rule: "patientive nounstem NNCs can function adjectivally as resultant-state predicates",
        formation: ADJECTIVAL_NNC_FORMATION.patientiveAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "patientive-nounstem",
        sourceClauseKind: "nominal-nuclear-clause",
        patientivoSurface: String(patientivoSurface || "").trim(),
        patientivoSource: resolvedPatientivoSource,
        sourceTenseValue: resolvedSourceTense,
        sourceCombinedMode: resolvedSourceMode,
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildPatientivoAdjectivalNncUnsupportedOutput({
    patientivoSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-patientive-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(patientivoSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildPatientivoAdjectivalNncFunctionFrame({
            patientivoSurface,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildPatientivoAdjectivalNncFunctionOutput({
    patientivoSurface = "",
    state = "absolutive",
    patientivoSource = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const surface = String(patientivoSurface || "").trim();
    if (requestedState !== "absolutive") {
        return buildPatientivoAdjectivalNncUnsupportedOutput({
            patientivoSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Patientive adjectival NNC generation follows Andrews 40.4 and requires absolutive predicate state."
            ),
        });
    }
    if (!surface) {
        return buildPatientivoAdjectivalNncUnsupportedOutput({
            patientivoSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresPatientiveSurface,
                "Patientive adjectival NNC generation requires a generated patientive noun surface from #3 salida."
            ),
        });
    }
    const frame = buildPatientivoAdjectivalNncFunctionFrame({
        patientivoSurface: surface,
        patientivoSource,
        sourceTenseValue,
        sourceCombinedMode,
        nominalizationProfile,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-patientive-function",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: surface,
        surfaceForms: [surface],
        stem: surface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        patientivoAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function buildVncAdjectivalNncFunctionFrame({
    vncSurface = "",
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-vnc-function",
        lessonRef: "Andrews 40.3",
        nncKind: "",
        clauseKind: "verbal-nuclear-clause",
        functionKind: ADJECTIVAL_NNC_FUNCTION.vncAdjectival,
        role,
        rule: "VNCs may function adjectivally without becoming ordinary NNC nounstems",
        formation: ADJECTIVAL_NNC_FORMATION.vncAdjectival,
        requiredPredicateState: "",
        requestedPredicateState: "",
        actualPredicateState: "",
        sourceCategory: "verbal-nuclear-clause",
        sourceClauseKind: "verbal-nuclear-clause",
        vncSurface: String(vncSurface || "").trim(),
        sourceVerb: String(sourceVerb || "").trim(),
        sourceTenseValue: String(sourceTenseValue || "").trim(),
        sourceCombinedMode: String(sourceCombinedMode || "").trim(),
        sourceVoiceMode: String(sourceVoiceMode || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        doesNotCreateNncStem: true,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildVncAdjectivalNncUnsupportedOutput({
    vncSurface = "",
    diagnostic = null,
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-vnc-function",
        clauseKind: "verbal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(vncSurface || ""),
        state: "",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildVncAdjectivalNncFunctionFrame({
            vncSurface,
            sourceVerb,
            sourceTenseValue,
            sourceCombinedMode,
            sourceVoiceMode,
            sourceFormulaSlots,
            sourceFormulaEcho,
        }),
        diagnostics,
    });
}

function buildVncAdjectivalNncFunctionOutput({
    vncSurface = "",
    surface = "",
    stem = "",
    sourceVerb = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    sourceVoiceMode = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const resolvedSurface = String(vncSurface || surface || stem || "").trim();
    if (!resolvedSurface) {
        return buildVncAdjectivalNncUnsupportedOutput({
            vncSurface: resolvedSurface,
            sourceVerb,
            sourceTenseValue,
            sourceCombinedMode,
            sourceVoiceMode,
            sourceFormulaSlots,
            sourceFormulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresVncSurface,
                "VNC adjectival function generation follows Andrews 40.3 and requires a generated VNC surface from #3 salida."
            ),
        });
    }
    const frame = buildVncAdjectivalNncFunctionFrame({
        vncSurface: resolvedSurface,
        sourceVerb,
        sourceTenseValue,
        sourceCombinedMode,
        sourceVoiceMode,
        sourceFormulaSlots,
        sourceFormulaEcho,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-vnc-function",
        clauseKind: "verbal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "",
        generationRoute: "adjectival-nnc",
        formulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        formulaEcho: String(sourceFormulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        vncAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function cloneAdjectivalNncCompoundSourceFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        kind: String(frame.kind || "").trim(),
        lessonRange: String(frame.lessonRange || "").trim(),
        matrix: frame.matrix && typeof frame.matrix === "object"
            ? { ...frame.matrix }
            : null,
        embeds: Array.isArray(frame.embeds)
            ? frame.embeds.map((entry) => ({ ...entry }))
            : [],
        sourceInput: frame.sourceInput && typeof frame.sourceInput === "object"
            ? { ...frame.sourceInput }
            : null,
        compoundRouteFrame: frame.compoundRouteFrame && typeof frame.compoundRouteFrame === "object"
            ? { ...frame.compoundRouteFrame }
            : null,
        incorporationRouteFrame: frame.incorporationRouteFrame && typeof frame.incorporationRouteFrame === "object"
            ? { ...frame.incorporationRouteFrame }
            : null,
        routeFrame: frame.routeFrame && typeof frame.routeFrame === "object"
            ? { ...frame.routeFrame }
            : null,
        boundaries: frame.boundaries && typeof frame.boundaries === "object"
            ? { ...frame.boundaries }
            : null,
    };
}

function buildCompoundSourceAdjectivalNncFunctionFrame({
    compoundSourceSurface = "",
    sourceCompoundFrame = null,
    nominalizationKind = "",
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-compound-source",
        lessonRef: "Andrews 41.2",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.compoundSourceAdjectival,
        role,
        rule: "compound verbstems with nominal embeds may yield compound nounstems whose NNCs function adjectivally",
        formation: ADJECTIVAL_NNC_FORMATION.compoundSourceAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "compound-verbstem",
        sourceClauseKind: "nominal-nuclear-clause",
        sourceVerbalClauseKind: "verbal-nuclear-clause",
        compoundSourceSurface: String(compoundSourceSurface || "").trim(),
        nominalizationKind: normalizeAdjectivalNncText(nominalizationKind) || "adjectival-surface",
        sourceCompoundFrame: cloneAdjectivalNncCompoundSourceFrame(sourceCompoundFrame),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildCompoundSourceAdjectivalNncUnsupportedOutput({
    compoundSourceSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceCompoundFrame = null,
    nominalizationKind = "",
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(compoundSourceSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildCompoundSourceAdjectivalNncFunctionFrame({
            compoundSourceSurface,
            sourceCompoundFrame,
            nominalizationKind,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildCompoundSourceAdjectivalNncFunctionOutput({
    compoundSourceSurface = "",
    surface = "",
    stem = "",
    state = "absolutive",
    sourceCompoundFrame = null,
    compoundFrame = null,
    nominalizationKind = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const resolvedSurface = String(compoundSourceSurface || surface || stem || "").trim();
    const resolvedCompoundFrame = sourceCompoundFrame || compoundFrame || null;
    const resolvedNominalizationKind = nominalizationKind
        || nominalizationProfile?.role?.nominalizationKind
        || "adjectival-surface";
    if (requestedState !== "absolutive") {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Compound-source adjectival NNC generation follows Andrews 41.2 and requires absolutive predicate state."
            ),
        });
    }
    if (!resolvedSurface) {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresCompoundSourceSurface,
                "Compound-source adjectival NNC generation requires a generated compound-source NNC surface from #3 salida."
            ),
        });
    }
    if (
        !resolvedCompoundFrame
        || typeof resolvedCompoundFrame !== "object"
        || String(resolvedCompoundFrame.kind || "").trim() !== "compound-frame"
    ) {
        return buildCompoundSourceAdjectivalNncUnsupportedOutput({
            compoundSourceSurface: resolvedSurface,
            requestedState,
            sourceCompoundFrame: resolvedCompoundFrame,
            nominalizationKind: resolvedNominalizationKind,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresCompoundSourceFrame,
                "Andrews 41.2 compound-source adjectival generation requires a parsed compound verbstem source frame."
            ),
        });
    }
    const frame = buildCompoundSourceAdjectivalNncFunctionFrame({
        compoundSourceSurface: resolvedSurface,
        sourceCompoundFrame: resolvedCompoundFrame,
        nominalizationKind: resolvedNominalizationKind,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        compoundSourceAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function cloneAdjectivalNncDenominalCompoundSourceFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        kind: String(frame.kind || "").trim(),
        version: frame.version || ADJECTIVAL_NNC_GENERATION_VERSION,
        lessonRef: String(frame.lessonRef || "").trim(),
        cites: Array.isArray(frame.cites) ? frame.cites.map((entry) => String(entry || "").trim()).filter(Boolean) : [],
        outputKind: String(frame.outputKind || "").trim(),
        sourceCategory: String(frame.sourceCategory || "").trim(),
        sourceStemType: String(frame.sourceStemType || "").trim(),
        operation: frame.operation && typeof frame.operation === "object" ? { ...frame.operation } : null,
        resultantNncKind: String(frame.resultantNncKind || "").trim(),
        matrix: frame.matrix && typeof frame.matrix === "object" ? { ...frame.matrix } : null,
        embeds: Array.isArray(frame.embeds) ? frame.embeds.map((entry) => ({ ...entry })) : [],
        sourceInput: frame.sourceInput && typeof frame.sourceInput === "object"
            ? {
                ...frame.sourceInput,
                parts: Array.isArray(frame.sourceInput.parts) ? [...frame.sourceInput.parts] : [],
            }
            : null,
        generatedVerbstem: String(frame.generatedVerbstem || "").trim(),
        sourceRootPlusYaBase: String(frame.sourceRootPlusYaBase || "").trim(),
        compoundRouteFrame: frame.compoundRouteFrame && typeof frame.compoundRouteFrame === "object"
            ? { ...frame.compoundRouteFrame }
            : null,
        incorporationRouteFrame: frame.incorporationRouteFrame && typeof frame.incorporationRouteFrame === "object"
            ? { ...frame.incorporationRouteFrame }
            : null,
        routeFrame: frame.routeFrame && typeof frame.routeFrame === "object"
            ? { ...frame.routeFrame }
            : null,
        generatedSurfacePreserved: frame.generatedSurfacePreserved === true,
        hasModificationAst: frame.hasModificationAst === true,
        spellingAuthority: String(frame.spellingAuthority || "").trim(),
        grammarAuthority: String(frame.grammarAuthority || "").trim(),
        boundaries: frame.boundaries && typeof frame.boundaries === "object" ? { ...frame.boundaries } : null,
    };
}

function buildDenominalCompoundAdjectivalNncFunctionFrame({
    denominalCompoundSurface = "",
    sourceDenominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-denominal-compound-source",
        lessonRef: "Andrews 41.3",
        cites: ["Andrews 54.2", "Andrews 40.8.1"],
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.denominalCompoundAdjectival,
        role,
        rule: "compound nounstems may source ti denominal verbstems whose preterit-agentive NNCs function adjectivally",
        formation: ADJECTIVAL_NNC_FORMATION.denominalCompoundAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "compound-nounstem",
        operation: {
            type: "denominal-verbstem",
            suffix: "ti",
            nawatInputSuffix: "tiya",
        },
        nominalizationKind: "preterit-agentive",
        resultantNncKind: "preterit-agentive-adjectival",
        denominalCompoundSurface: String(denominalCompoundSurface || "").trim(),
        sourceDenominalCompoundFrame: cloneAdjectivalNncDenominalCompoundSourceFrame(sourceDenominalCompoundFrame),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildDenominalCompoundAdjectivalNncUnsupportedOutput({
    denominalCompoundSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    sourceDenominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-denominal-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(denominalCompoundSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildDenominalCompoundAdjectivalNncFunctionFrame({
            denominalCompoundSurface,
            sourceDenominalCompoundFrame,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildDenominalCompoundAdjectivalNncFunctionOutput({
    denominalCompoundSurface = "",
    surface = "",
    stem = "",
    state = "absolutive",
    sourceDenominalCompoundFrame = null,
    denominalCompoundFrame = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const resolvedSurface = String(denominalCompoundSurface || surface || stem || "").trim();
    const resolvedFrame = sourceDenominalCompoundFrame || denominalCompoundFrame || null;
    if (requestedState !== "absolutive") {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Denominal-compound adjectival NNC generation follows Andrews 41.3 and requires absolutive predicate state."
            ),
        });
    }
    if (!resolvedSurface) {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresDenominalCompoundSurface,
                "Denominal-compound adjectival NNC generation requires a generated preterit-agentive NNC surface from #3 salida."
            ),
        });
    }
    if (
        !resolvedFrame
        || typeof resolvedFrame !== "object"
        || String(resolvedFrame.kind || "").trim() !== "denominal-compound-nounstem-frame"
    ) {
        return buildDenominalCompoundAdjectivalNncUnsupportedOutput({
            denominalCompoundSurface: resolvedSurface,
            requestedState,
            sourceDenominalCompoundFrame: resolvedFrame,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresDenominalCompoundFrame,
                "Andrews 41.3 denominal-compound adjectival generation requires a parsed compound nounstem source frame."
            ),
        });
    }
    const frame = buildDenominalCompoundAdjectivalNncFunctionFrame({
        denominalCompoundSurface: resolvedSurface,
        sourceDenominalCompoundFrame: resolvedFrame,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-denominal-compound-source",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: resolvedSurface,
        surfaceForms: [resolvedSurface],
        stem: resolvedSurface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        denominalCompoundAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function buildIntensifiedAdjectivalNncFunctionFrame({
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    formulaSlots = null,
    formulaEcho = "",
    intensifiedStem = "",
    role = "predicate-surface",
} = {}) {
    const sourcePredicateStem = resolveAdjectivalNncFormulaSlotText(
        sourceFormulaSlots?.predicateStem,
        ["stem", "surface"]
    );
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-intensified",
        lessonRef: "Andrews 41.1",
        nncKind: "adjectival",
        functionKind: "intensified-adjectival",
        role,
        rule: "adjectival stems with verbal or deverbal source may be intensified by reduplication",
        formation: ADJECTIVAL_NNC_FORMATION.intensifiedAdjectival,
        sourceCategory: "adjectival-nnc",
        sourceClauseKind: "nominal-nuclear-clause",
        sourceSurface: String(sourceSurface || "").trim(),
        sourcePredicateStem,
        intensifiedStem: String(intensifiedStem || "").trim(),
        baseFormulaSlots: sourceFormulaSlots || null,
        baseFormulaEcho: String(sourceFormulaEcho || ""),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        reduplicationKind: "adjectival-intensification",
        reusesFrequentativeEngine: false,
        generatedSurfacePreserved: false,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildIntensifiedAdjectivalNncUnsupportedOutput({
    sourceSurface = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    diagnostic = null,
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-intensified",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(sourceSurface || ""),
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildIntensifiedAdjectivalNncFunctionFrame({
            sourceSurface,
            sourceFormulaSlots,
            sourceFormulaEcho,
        }),
        diagnostics,
    });
}

function buildIntensifiedAdjectivalNncOutput({
    sourceSurface = "",
    surface = "",
    sourceFormulaSlots = null,
    formulaSlots = null,
    sourceFormulaEcho = "",
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const sourceSlots = sourceFormulaSlots || formulaSlots || null;
    const sourceEcho = sourceFormulaEcho || formulaEcho || "";
    const predicateStem = resolveAdjectivalNncFormulaSlotText(
        sourceSlots?.predicateStem,
        ["stem", "surface"]
    );
    const connector = resolveAdjectivalNncFormulaSlotText(
        sourceSlots?.num1Num2,
        ["connector", "surface"]
    );
    if (!predicateStem || !sourceSlots?.num1Num2) {
        return buildIntensifiedAdjectivalNncUnsupportedOutput({
            sourceSurface: String(sourceSurface || surface || "").trim(),
            sourceFormulaSlots: sourceSlots,
            sourceFormulaEcho: sourceEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresFormulaSlots,
                "Andrews 41.1 adjectival intensification requires generated NNC formula slots from #3 salida."
            ),
        });
    }
    const intensifiedStem = typeof buildOrdinaryNncReduplicatedSurface === "function"
        ? buildOrdinaryNncReduplicatedSurface(predicateStem)
        : `${predicateStem.slice(0, 1)}j${predicateStem}`;
    const intensifiedFormulaSlots = buildIntensifiedAdjectivalNncFormulaSlots({
        sourceFormulaSlots: sourceSlots,
        intensifiedStem,
    });
    const intensifiedFormulaEcho = buildAdjectivalNncFormulaEchoFromSlots(intensifiedFormulaSlots);
    const subjectPrefix = String(sourceSlots?.pers1Pers2?.prefix || sourceSlots?.pers1Pers2?.subjectPrefix || "");
    const result = `${subjectPrefix}${intensifiedStem}${connector === "Ø" ? "" : connector}`;
    const frame = buildIntensifiedAdjectivalNncFunctionFrame({
        sourceSurface: String(sourceSurface || surface || "").trim(),
        sourceFormulaSlots: sourceSlots,
        sourceFormulaEcho: sourceEcho,
        formulaSlots: intensifiedFormulaSlots,
        formulaEcho: intensifiedFormulaEcho,
        intensifiedStem,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-intensified",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result,
        surfaceForms: [result],
        stem: intensifiedStem,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: intensifiedFormulaSlots,
        formulaEcho: intensifiedFormulaEcho,
        adjectivalNncFunctionFrame: frame,
        intensifiedAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind = "") {
    const normalizedKind = normalizeAdjectivalNncText(nominalizationKind);
    return ADJECTIVAL_NNC_NOMINALIZED_VNC_KIND_LESSONS[normalizedKind] || null;
}

function buildNominalizedVncAdjectivalNncFunctionFrame({
    nominalizedSurface = "",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    requestedState = "absolutive",
    role = "predicate-surface",
} = {}) {
    const nominalizationKind = normalizeAdjectivalNncText(nominalizationProfile?.role?.nominalizationKind || "");
    const lessonSpec = resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind) || {};
    const source = nominalizationProfile?.source || {};
    return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        lessonRef: lessonSpec.lessonRef || "Andrews 40.5",
        nncKind: "adjectival",
        functionKind: lessonSpec.functionKind || "nominalized-vnc-adjectival",
        role,
        rule: lessonSpec.rule || "nominalized VNC predicates may function adjectivally when the current Nawat engine has a generated NNC surface",
        formation: ADJECTIVAL_NNC_FORMATION.nominalizedVncAdjectival,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceCategory: "nominalized-vnc",
        sourceClauseKind: "nominal-nuclear-clause",
        nominalizedSurface: String(nominalizedSurface || "").trim(),
        nominalizationKind,
        sourceTenseValue: String(source.sourceTense || "").trim(),
        sourceCombinedMode: String(source.sourceCombinedMode || "").trim(),
        sourceFormulaSlots: formulaSlots || null,
        sourceFormulaEcho: String(formulaEcho || ""),
        generatedSurfacePreserved: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
    };
}

function buildNominalizedVncAdjectivalNncUnsupportedOutput({
    nominalizedSurface = "",
    requestedState = "absolutive",
    diagnostic = null,
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
} = {}) {
    const diagnostics = diagnostic ? [diagnostic] : [];
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(nominalizedSurface || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildNominalizedVncAdjectivalNncFunctionFrame({
            nominalizedSurface,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            requestedState,
        }),
        diagnostics,
    });
}

function buildNominalizedVncAdjectivalNncFunctionOutput({
    nominalizedSurface = "",
    state = "absolutive",
    nominalizationProfile = null,
    formulaSlots = null,
    formulaEcho = "",
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const surface = String(nominalizedSurface || "").trim();
    const nominalizationKind = normalizeAdjectivalNncText(nominalizationProfile?.role?.nominalizationKind || "");
    const lessonSpec = resolveNominalizedVncAdjectivalLessonSpec(nominalizationKind);
    if (requestedState !== "absolutive") {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Nominalized VNC adjectival NNC generation follows Andrews 40.5-40.8 and requires absolutive predicate state."
            ),
        });
    }
    if (!surface) {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresNominalizedVncSurface,
                "Nominalized VNC adjectival NNC generation requires a generated NNC surface from #3 salida."
            ),
        });
    }
    if (!lessonSpec) {
        return buildNominalizedVncAdjectivalNncUnsupportedOutput({
            nominalizedSurface: surface,
            requestedState,
            nominalizationProfile,
            formulaSlots,
            formulaEcho,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.unsupportedNominalizedVncKind,
                "This generated nominalized VNC kind is not yet mapped to an Andrews 40.5-40.8 adjectival-function contract."
            ),
        });
    }
    const frame = buildNominalizedVncAdjectivalNncFunctionFrame({
        nominalizedSurface: surface,
        nominalizationProfile,
        formulaSlots,
        formulaEcho,
        requestedState,
        role,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-nominalized-vnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result: surface,
        surfaceForms: [surface],
        stem: surface,
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots: formulaSlots || null,
        formulaEcho: String(formulaEcho || ""),
        adjectivalNncFunctionFrame: frame,
        nominalizedVncAdjectivalNncFunctionFrame: frame,
        diagnostics: [],
    });
}

function generateAdjectivalNncFunctionOutput({
    stem = "",
    state = "absolutive",
    subject = null,
    number = "singular",
    pluralType = "auto",
    nounClass = "",
    animacy = "",
    role = "modifier-candidate",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    if (requestedState !== "absolutive") {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Adjectival NNC generation follows Andrews 40.1 and requires absolutive predicate state."
            ),
        });
    }
    if (typeof generateOrdinaryNncParadigm !== "function") {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.unavailable,
                "Ordinary NNC generation is unavailable, so adjectival NNC function generation cannot run."
            ),
        });
    }
    const sourceNnc = generateOrdinaryNncParadigm({
        stem,
        state: "absolutive",
        subject,
        number,
        pluralType,
        nounClass,
        animacy,
    });
    const frame = buildAdjectivalNncFunctionFrame({
        sourceNnc,
        requestedState,
        role,
    });
    if (!sourceNnc?.supported) {
        return buildAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            sourceNnc,
        });
    }
    return attachAdjectivalNncGrammarContract({
        ...sourceNnc,
        outputKind: "adjectival-nnc-function",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        sourceNnc,
        diagnostics: Array.isArray(sourceNnc.diagnostics) ? [...sourceNnc.diagnostics] : [],
    });
}

function generateRootPlusYaAdjectivalNncOutput({
    stem = "",
    state = "absolutive",
    subject = null,
    role = "predicate-surface",
} = {}) {
    const requestedState = normalizeAdjectivalNncState(state);
    const parsedVerb = resolveAdjectivalNncParsedVerb(stem);
    if (requestedState !== "absolutive") {
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            parsedVerb,
            diagnostic: buildAdjectivalNncDiagnostic(
                ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState,
                "Root-plus-ya adjectival NNC generation follows Andrews 40.9 and requires absolutive predicate state."
            ),
        });
    }
    const source = resolveRootPlusYaAdjectivalNncSource(parsedVerb);
    const rootPlusYaBase = source.rootPlusYaBase;
    if (!source.supported || !rootPlusYaBase) {
        const diagnosticId = source.diagnosticId || ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa;
        const messageById = {
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException]: "Andrews 40.9 excludes the hue-i-ya/weya path from the obsolete-preterit adjectival route.",
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported]: "Segmented slash sources require a denominal tiya source before using the Andrews 40.9 adjectival route.",
            [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa]: "Root-plus-ya adjectival NNC generation requires a recognized root-plus-ya source.",
        };
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
            stem,
            requestedState,
            parsedVerb,
            rootPlusYaBase,
            sourceFormationSubtype: source.sourceFormationSubtype,
            diagnostic: buildAdjectivalNncDiagnostic(
                diagnosticId,
                messageById[diagnosticId] || messageById[ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa]
            ),
        });
    }
    const subjectSlot = subject && typeof subject === "object" ? subject : {};
    const formulaSlots = buildRootPlusYaAdjectivalNncFormulaSlots({
        rootPlusYaBase,
        subject: subjectSlot,
        sourceFormationSubtype: source.sourceFormationSubtype,
    });
    const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
    const subjectPrefix = String(subjectSlot.subjectPrefix || "");
    const result = `${subjectPrefix}${rootPlusYaBase}k`;
    const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase,
        formulaSlots,
        requestedState,
        role,
        sourceFormationSubtype: source.sourceFormationSubtype,
    });
    return attachAdjectivalNncGrammarContract({
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result,
        surfaceForms: [result],
        stem: String(parsedVerb?.verb || stem || ""),
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots,
        formulaEcho,
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        denominalCompoundSourceFrame: frame.denominalCompoundSourceFrame || null,
        diagnostics: [],
    });
}
