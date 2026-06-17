// core/nnc/relational/relational.js
// Lessons 45-47 relational-NNC boundary metadata. This keeps ordinary NNC
// generation, locative/temporal nominal outputs, and translation labels
// separate from confirmed relational NNC generation until Nawat/Pipil evidence
// supports it.

"use strict";

const RELATIONAL_NNC_BOUNDARY_VERSION = 1;

const RELATIONAL_NNC_KIND = Object.freeze({
    relationalStem: "relational-stem",
    locative: "locative",
    directional: "directional",
    frequency: "frequency",
    associatedEntity: "associated-entity",
    pertinency: "pertinency",
    unknown: "unknown",
});

const RELATIONAL_NNC_OPTION = Object.freeze({
    optionOne: "option-one",
    optionTwo: "option-two",
    optionThree: "option-three",
    optionFour: "option-four",
    unknown: "unknown",
});

const RELATIONAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    locativeTemporalNominal: "locative-temporal-nominal",
    placeTranslation: "place-translation",
    prepositionTranslation: "preposition-translation",
    routeLabel: "route-label",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const RELATIONAL_NNC_OPTION_GROUP = Object.freeze({
    optionOneOnly: "option-one-only",
    optionTwoOnly: "option-two-only",
    optionsOneTwo: "options-one-two",
    optionsOneThree: "options-one-three",
    optionsOneTwoThree: "options-one-two-three",
    unknown: "unknown",
});

const RELATIONAL_NNC_STEM_POSITION = Object.freeze({
    simplePredicateStem: "simple-stem-predicate",
    integratedMatrix: "integrated-matrix",
    linkedMatrix: "linked-matrix",
    compoundEmbed: "compound-embed",
    unknown: "unknown",
});

const RELATIONAL_NNC_SOURCE_STATE = Object.freeze({
    absolutive: "absolutive",
    possessive: "possessive",
    unknown: "unknown",
});

const RELATIONAL_NNC_SOURCE_VOICE = Object.freeze({
    active: "active",
    passive: "passive",
    impersonal: "impersonal",
    unknown: "unknown",
});

const RELATIONAL_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "relational NNC boundary metadata is not generation",
    "ordinary NNC fixtures are not relational NNC fixture evidence",
    "open-stem ordinary NNC previews are not relational nounstem data",
    "locative-temporal nominal outputs are not full relational NNC options",
    "preposition or place translations are not Nawat/Pipil relational form evidence",
    "Andrews relational categories are architecture, not Nawat/Pipil form authority",
]);

const RELATIONAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "relationalStem",
        asks: "Which Nawat/Pipil relational nounstem is evidenced?",
    }),
    Object.freeze({
        field: "relationalKind",
        asks: "Is the candidate locative, directional, frequency, associated-entity, pertinency, relational-stem, or unknown?",
    }),
    Object.freeze({
        field: "relationalOption",
        asks: "Which relational usage option is evidenced: one, two, three, four, or unknown?",
    }),
    Object.freeze({
        field: "governedArgument",
        asks: "What noun, pronoun, possessor, or clause is governed by the relational NNC?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided example supports relational status?",
    }),
]);

function normalizeRelationalNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeRelationalNncKind(value = "") {
    return normalizeRelationalNncEnum(
        value,
        Object.values(RELATIONAL_NNC_KIND),
        RELATIONAL_NNC_KIND.unknown
    );
}

function normalizeRelationalNncOption(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        "1": RELATIONAL_NNC_OPTION.optionOne,
        one: RELATIONAL_NNC_OPTION.optionOne,
        "2": RELATIONAL_NNC_OPTION.optionTwo,
        two: RELATIONAL_NNC_OPTION.optionTwo,
        "3": RELATIONAL_NNC_OPTION.optionThree,
        three: RELATIONAL_NNC_OPTION.optionThree,
        "4": RELATIONAL_NNC_OPTION.optionFour,
        four: RELATIONAL_NNC_OPTION.optionFour,
    };
    return aliases[normalized] || normalizeRelationalNncEnum(
        normalized,
        Object.values(RELATIONAL_NNC_OPTION),
        RELATIONAL_NNC_OPTION.unknown
    );
}

function normalizeRelationalNncFalsePositiveSource(value = "") {
    return normalizeRelationalNncEnum(
        value,
        Object.values(RELATIONAL_NNC_FALSE_POSITIVE_SOURCE),
        RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function normalizeRelationalNncOptionGroup(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        "1": RELATIONAL_NNC_OPTION_GROUP.optionOneOnly,
        "one-only": RELATIONAL_NNC_OPTION_GROUP.optionOneOnly,
        "option-1-only": RELATIONAL_NNC_OPTION_GROUP.optionOneOnly,
        "2": RELATIONAL_NNC_OPTION_GROUP.optionTwoOnly,
        "two-only": RELATIONAL_NNC_OPTION_GROUP.optionTwoOnly,
        "option-2-only": RELATIONAL_NNC_OPTION_GROUP.optionTwoOnly,
        "1-2": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwo,
        "one-two": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwo,
        "options-1-2": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwo,
        "1-3": RELATIONAL_NNC_OPTION_GROUP.optionsOneThree,
        "one-three": RELATIONAL_NNC_OPTION_GROUP.optionsOneThree,
        "options-1-3": RELATIONAL_NNC_OPTION_GROUP.optionsOneThree,
        "1-2-3": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwoThree,
        "one-two-three": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwoThree,
        "options-1-2-3": RELATIONAL_NNC_OPTION_GROUP.optionsOneTwoThree,
    };
    return aliases[normalized] || normalizeRelationalNncEnum(
        normalized,
        Object.values(RELATIONAL_NNC_OPTION_GROUP),
        RELATIONAL_NNC_OPTION_GROUP.unknown
    );
}

function normalizeRelationalNncStemPosition(value = "") {
    return normalizeRelationalNncEnum(
        value,
        Object.values(RELATIONAL_NNC_STEM_POSITION),
        RELATIONAL_NNC_STEM_POSITION.unknown
    );
}

function normalizeRelationalNncSourceState(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        absolute: RELATIONAL_NNC_SOURCE_STATE.absolutive,
        absolutive: RELATIONAL_NNC_SOURCE_STATE.absolutive,
        absolutivo: RELATIONAL_NNC_SOURCE_STATE.absolutive,
        possessive: RELATIONAL_NNC_SOURCE_STATE.possessive,
        possessed: RELATIONAL_NNC_SOURCE_STATE.possessive,
        posesivo: RELATIONAL_NNC_SOURCE_STATE.possessive,
    };
    return aliases[normalized] || normalizeRelationalNncEnum(
        normalized,
        Object.values(RELATIONAL_NNC_SOURCE_STATE),
        RELATIONAL_NNC_SOURCE_STATE.unknown
    );
}

function normalizeRelationalNncSourceVoice(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        active: RELATIONAL_NNC_SOURCE_VOICE.active,
        activa: RELATIONAL_NNC_SOURCE_VOICE.active,
        activo: RELATIONAL_NNC_SOURCE_VOICE.active,
        passive: RELATIONAL_NNC_SOURCE_VOICE.passive,
        pasiva: RELATIONAL_NNC_SOURCE_VOICE.passive,
        pasivo: RELATIONAL_NNC_SOURCE_VOICE.passive,
        impersonal: RELATIONAL_NNC_SOURCE_VOICE.impersonal,
    };
    return aliases[normalized] || normalizeRelationalNncEnum(
        normalized,
        Object.values(RELATIONAL_NNC_SOURCE_VOICE),
        RELATIONAL_NNC_SOURCE_VOICE.unknown
    );
}

function getRelationalNncAllowedStatesForOption(relationalOption = "") {
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    if (normalizedOption === RELATIONAL_NNC_OPTION.optionOne) {
        return [RELATIONAL_NNC_SOURCE_STATE.possessive];
    }
    if (
        normalizedOption === RELATIONAL_NNC_OPTION.optionTwo
        || normalizedOption === RELATIONAL_NNC_OPTION.optionThree
    ) {
        return [RELATIONAL_NNC_SOURCE_STATE.absolutive, RELATIONAL_NNC_SOURCE_STATE.possessive];
    }
    return [RELATIONAL_NNC_SOURCE_STATE.unknown];
}

function getDefaultRelationalNncStemPosition(relationalOption = "") {
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    if (normalizedOption === RELATIONAL_NNC_OPTION.optionOne) {
        return RELATIONAL_NNC_STEM_POSITION.simplePredicateStem;
    }
    if (normalizedOption === RELATIONAL_NNC_OPTION.optionTwo) {
        return RELATIONAL_NNC_STEM_POSITION.integratedMatrix;
    }
    if (normalizedOption === RELATIONAL_NNC_OPTION.optionThree) {
        return RELATIONAL_NNC_STEM_POSITION.linkedMatrix;
    }
    if (normalizedOption === RELATIONAL_NNC_OPTION.optionFour) {
        return RELATIONAL_NNC_STEM_POSITION.compoundEmbed;
    }
    return RELATIONAL_NNC_STEM_POSITION.unknown;
}

function getRelationalNncAntiConflationRules() {
    return Array.from(RELATIONAL_NNC_ANTI_CONFLATION_RULES);
}

function getRelationalNncStructuralQuestions() {
    return RELATIONAL_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function attachRelationalNncGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "relational-nnc",
        routeFamily: "relational-nnc",
        ...options,
    });
}

const LESSON45_RELATIONAL_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_relational.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON45_RELATIONAL_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 45.1",
    "Andrews Lesson 45.2",
    "Andrews Lesson 45.3",
    "Andrews Lesson 45.4",
    "Andrews Lesson 45.4.1",
    "Andrews Lesson 45.4.2",
    "Andrews Lesson 45.4.3",
    "Andrews Lesson 45.4.4",
]);

const LESSON45_NO_PREPOSITIONS_FRAME = Object.freeze({
    kind: "lesson-45-no-prepositions-frame",
    sourceSection: "Andrews 45.1",
    nahuatlHasNoPrepositions: true,
    nahuatlHasNoPostpositions: true,
    relationalNotionsAreInherentInAdverbializedNuclearClauses: true,
    supplementationCanCooperateWithPossessiveStateRelationalNnc: true,
    prepositionTranslationHasNoMorphologicalCounterpart: true,
    relationalNounstemsAreNounstemsNotFunctionWords: true,
    highGeneralityNaming: true,
    locativeStemContextRoles: Object.freeze(["locale", "source", "goal", "path"]),
    directionalStemContextRoles: Object.freeze(["source", "goal"]),
    affectiveRelationalStemsUseTzinOrTonThenCo: true,
});

const LESSON45_USAGE_OPTIONS_FRAME = Object.freeze({
    kind: "lesson-45-relational-usage-options-frame",
    sourceSection: "Andrews 45.2",
    optionOneFrame: Object.freeze({
        option: "option-one",
        sourceSection: "Andrews 45.2 option 1",
        stemPosition: "simple-stem-predicate",
        state: "possessive",
        distinctive: false,
    }),
    optionTwoFrame: Object.freeze({
        option: "option-two",
        sourceSection: "Andrews 45.2 option 2",
        stemPosition: "integrated-matrix",
        states: Object.freeze(["absolutive", "possessive"]),
        oftenEmbedOriented: true,
    }),
    optionThreeFrame: Object.freeze({
        option: "option-three",
        sourceSection: "Andrews 45.2 option 3",
        stemPosition: "linked-matrix",
        states: Object.freeze(["absolutive", "possessive"]),
        connectiveHasLinkingAndSeparatingFunction: true,
        explicitlyEmbedOriented: true,
    }),
    optionFourFrame: Object.freeze({
        option: "option-four",
        sourceSection: "Andrews 45.2 option 4",
        stemPosition: "compound-embed",
        simpleOrCompoundRelationalNounstemCanFillEmbed: true,
    }),
    relationalNounstemsRemainNounstems: true,
    optionTwoAndThreeCanOccurWithNormalSubjectIfMeaningAllows: true,
});

const LESSON45_GROUPINGS_FRAME = Object.freeze({
    kind: "lesson-45-relational-groupings-frame",
    sourceSection: "Andrews 45.3",
    groupingBasis: "which of options one, two, and three a relational nounstem accepts",
    groups: Object.freeze([
        Object.freeze({ group: "group-one", optionGroup: "option-one-only", sourceRef: "Andrews 45.4" }),
        Object.freeze({ group: "group-two", optionGroup: "option-two-only", sourceRef: "Andrews Lesson 46" }),
        Object.freeze({ group: "group-three", optionGroup: "options-one-two", sourceRef: "Andrews 47.1" }),
        Object.freeze({ group: "group-four", optionGroup: "options-one-three", sourceRef: "Andrews 47.2" }),
        Object.freeze({ group: "group-five", optionGroup: "options-one-two-three", sourceRef: "Andrews 47.3" }),
    ]),
    translationPrepositionWarningRepeated: true,
});

const LESSON45_OPTION_ONE_STEMS_FRAME = Object.freeze({
    kind: "lesson-45-option-one-stems-frame",
    sourceSection: "Andrews 45.4",
    onlySingleStemmedPossessiveStateNncs: true,
    secondNncMayCombineOnlyAsSupplementaryPossessor: true,
    stems: Object.freeze([
        Object.freeze({
            stem: "huan",
            sourceSection: "Andrews 45.4.1",
            meaning: "company",
            reciprocalPredicateMayDowngradeToNounstem: true,
            ihuanInNumeralGroupsIsNotConjunctor: true,
            huanYolquiKinshipCollocationCanLexicalize: true,
            honorificStem: "huan-tzin-co",
        }),
        Object.freeze({
            stem: "tloc",
            sourceSection: "Andrews 45.4.2",
            meaning: "side or proximity",
            mayEmbedInPreteritAgentiveOwnerhood: true,
            honorificStem: "tloc-tzin-co",
        }),
        Object.freeze({
            stem: "pal",
            sourceSection: "Andrews 45.4.3",
            meaning: "grace, favor, sake, help",
            honorificStem: "pal-tzin-co",
        }),
        Object.freeze({
            stem: "c",
            sourceSection: "Andrews 45.4.4",
            meaning: "means, purpose, reason, cause, time",
            onlyThirdPersonCommonNumberPossessor: true,
            surfaceFrame: "ic",
            veryFrequent: true,
        }),
    ]),
});

const LESSON45_IC_FRAME = Object.freeze({
    kind: "lesson-45-ic-relational-nnc-frame",
    sourceSection: "Andrews 45.4.4",
    stem: "c",
    onlyThirdPersonCommonNumberPossessor: true,
    basicInstrumentalMeaning: true,
    inIcTraditionallyWrittenInic: true,
    functions: Object.freeze(["means", "purpose", "reason", "time", "special-uses"]),
    timeFrame: Object.freeze({
        sourceSection: "Andrews 45.4.4.d",
        sentenceInitialMayAskWhen: true,
        icInQuestionSequenceTraditionallyIquin: true,
        fusedIquinOnlyWhenFollowingAdjunctIsAbsent: true,
        nonInitialPositionLosesInterrogativeForce: true,
        nimanIcMeansImmediatelyThereupon: true,
        icCenMeansOnceAndForAllOrForever: true,
        negativeAyicMeansNever: true,
        icCanDowngradeToEmbedInIcah: true,
    }),
    specialUsesFrame: Object.freeze({
        sourceSection: "Andrews 45.4.4.e",
        beforeNumeralOrQuantitiveCreatesOrdinalEquivalent: true,
        afterAdjectivalSupplementaryPossessorCreatesAdverbEquivalent: true,
        withAdjectivalOrDescriptiveNncCanExpressDegree: true,
        beforeSizeLengthShapeAdjectivalNncCreatesMeasurementExpression: true,
    }),
});

const LESSON45_RELATIONAL_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson45-no-prepositions", andrewsSection: "45.1", category: "no-prepositions-or-postpositions", directiveEs: "El nahuatl no tiene preposiciones ni posposiciones; las preposiciones de traduccion no tienen contraparte morfologica.", engineSurface: "diagnostic relational boundary frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-relational-nounstems-as-nounstems", andrewsSection: "45.1 relational nounstems", category: "relational-nounstem-not-function-word", directiveEs: "Los troncos relacionales son troncos nominales usados para CNN adverbializadas, no palabras funcionales importadas de la traduccion.", engineSurface: "diagnostic relational boundary frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-high-generality", andrewsSection: "45.1 high-generality", category: "high-generality-relational-meaning", directiveEs: "Un mismo tronco relacional puede cubrir lugar, fuente, meta o ruta segun contexto.", engineSurface: "diagnostic relational boundary frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-affective-relational", andrewsSection: "45.1 note", category: "affective-relational-stem", directiveEs: "El afectivo relacional requiere matriz tzin/ton y validacion adverbial con co.", engineSurface: "diagnostic affective relational frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-option-one", andrewsSection: "45.2 option 1", category: "option-one-simple-possessive", directiveEs: "Opcion 1: tronco relacional como predicado simple en CNN posesiva.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-two", andrewsSection: "45.2 option 2", category: "option-two-integrated-matrix", directiveEs: "Opcion 2: tronco relacional como matriz integrada; la CNN puede ser absolutiva o posesiva y suele orientarse al embed.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-three", andrewsSection: "45.2 option 3", category: "option-three-linked-matrix", directiveEs: "Opcion 3: matriz relacional ligada; el conectivo separa y enlaza, aclarando orientacion al embed.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-four", andrewsSection: "45.2 option 4", category: "option-four-compound-embed", directiveEs: "Opcion 4: el tronco relacional simple o compuesto llena el embed de un tronco compuesto.", engineSurface: "diagnostic compound-embed frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-groupings", andrewsSection: "45.3", category: "relational-option-groupings", directiveEs: "Los grupos relacionales se definen por las opciones 1, 2 y 3 que acepta cada tronco.", engineSurface: "diagnostic grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-one-only-overview", andrewsSection: "45.4", category: "option-one-only-overview", directiveEs: "Cuatro troncos permiten solo opcion 1; otra CNN solo coopera como poseedor suplementario.", engineSurface: "diagnostic option-one inventory frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-huan", andrewsSection: "45.4.1", category: "huan-company", directiveEs: "Huan expresa compania; ihuan en numerales no es conjuncion, y huan+yolqui puede lexicalizar parentesco.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-tloc", andrewsSection: "45.4.2", category: "tloc-proximity", directiveEs: "Tloc expresa lado/proximidad y puede aparecer como embed en agentivo preterito de posesion.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-pal", andrewsSection: "45.4.3", category: "pal-favor", directiveEs: "Pal expresa gracia/favor/cuenta/ayuda y su honorifico usa paltzinco.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-ic-means-purpose-reason", andrewsSection: "45.4.4 a-c", category: "ic-means-purpose-reason", directiveEs: "Ic usa solo poseedor i-0 y expresa medio, proposito o razon segun estructura.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson45-ic-time", andrewsSection: "45.4.4.d", category: "ic-time", directiveEs: "Ic temporal puede preguntar cuando en posicion inicial, pierde fuerza interrogativa fuera de inicio y forma collocaciones como niman ic, ic cen y ayic.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-ic-special-uses", andrewsSection: "45.4.4.e", category: "ic-special-uses", directiveEs: "Ic crea ordinales, equivalentes adverbiales, grados y mediciones con CNN numerales o adjetivales.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function cloneRelationalNncLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneRelationalNncLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneRelationalNncLessonRecord(value)])
    );
}

function getLesson45RelationalNncSubsectionInventory() {
    return LESSON45_RELATIONAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON45_RELATIONAL_NNC_VALIDATION_REFS),
    }));
}

function buildLesson45RelationalNncPursuitFrame() {
    const subsectionInventory = getLesson45RelationalNncSubsectionInventory();
    const noPrepositionsFrame = cloneRelationalNncLessonRecord(LESSON45_NO_PREPOSITIONS_FRAME);
    const usageOptionsFrame = cloneRelationalNncLessonRecord(LESSON45_USAGE_OPTIONS_FRAME);
    const groupingsFrame = cloneRelationalNncLessonRecord(LESSON45_GROUPINGS_FRAME);
    const optionOneStemsFrame = cloneRelationalNncLessonRecord(LESSON45_OPTION_ONE_STEMS_FRAME);
    const icFrame = cloneRelationalNncLessonRecord(LESSON45_IC_FRAME);
    const remainingGaps = [
        "Current Lesson 45 support records Andrews' relational NNC architecture as diagnostics and usage frames; it does not implement relational NNC generation or static relational fixture data.",
        "Translation prepositions, place labels, locative-temporal nominal rows, and ordinary NNC outputs remain false-positive evidence until confirmed Nawat/Pipil relational examples are available.",
        "Option-four compound embeds, option-one-only stem inventories, ic special uses, affective relational stems, parser/search detection, acciones de interfaz, and concrete surface routing remain partial or evidence-needed.",
    ];
    const frame = {
        kind: "lesson-45-relational-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 45,
        aimStatus: "shooting",
        routeStage: "audit-lesson-45",
        pdfRefs: Array.from(LESSON45_RELATIONAL_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 45.1-45.4 against current relational NNC boundary metadata, no-preposition framing, relational nounstem usage options, option groupings, option-one-only stems, supplementary-possessor limits, ic functions, and translation-mirage blockers.",
                andrewsRefs: Array.from(LESSON45_RELATIONAL_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON45_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 45 now records Andrews relational NNC architecture across no-preposition warnings, four usage options, five option groupings, option-one-only stems, supplementary possessor limits, and ic means/purpose/reason/time/special-use behavior while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON45_RELATIONAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON45_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        noPrepositionsFrame,
        usageOptionsFrame,
        groupingsFrame,
        optionOneStemsFrame,
        icFrame,
        currentEngineBoundary: {
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
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachRelationalNncGrammarContract(frame, {
        metadataKind: "lesson-45-relational-nnc-pursuit-frame",
        unitKind: "relational-nnc-boundary",
        routeStage: "audit-lesson-45",
        structuralSource: "Andrews Lesson 45",
        andrewsRefs: Array.from(LESSON45_RELATIONAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 45.1-45.4",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil relational evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            noPrepositionsFrame,
            usageOptionsFrame,
            groupingsFrame,
            optionOneStemsFrame,
            icFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "adverbialized possessive-state NNC",
            noPrepositionsOrPostpositions: true,
            optionOnePossessiveOnly: true,
            optionTwoAndThreeAllowAbsolutiveOrPossessive: true,
            optionFourIsCompoundEmbed: true,
            supplementaryPossessorCanCooperateWithRelationalNnc: true,
        },
        participantFrame: {
            semanticRole: "governed possessor or supplementary possessor",
            translationPrepositionIsNotMorphology: true,
            icUsesOnlyThirdPersonCommonNumberPossessor: true,
        },
        targetContract: {
            metadataKind: "lesson-45-relational-nnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["relational-nnc-lesson-45-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
    });
}

const LESSON46_RELATIONAL_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_relational.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON46_RELATIONAL_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 46.1",
    "Andrews Lesson 46.2",
    "Andrews Lesson 46.3",
    "Andrews Lesson 46.4",
    "Andrews Lesson 46.5",
    "Andrews Lesson 46.6",
    "Andrews Lesson 46.7",
    "Andrews Lesson 46.8",
    "Andrews Lesson 46.9",
    "Andrews Lesson 46.10",
    "Andrews Lesson 46.11",
    "Andrews Lesson 46.12",
    "Andrews Lesson 46.13",
    "Andrews Lesson 46.14",
    "Andrews Lesson 46.15",
]);

const LESSON46_OPTION_TWO_ONLY_FRAME = Object.freeze({
    kind: "lesson-46-option-two-only-frame",
    sourceSection: "Andrews 46.1",
    optionGroup: "option-two-only",
    matrixOnlyRelationalNounstems: true,
    notSuffixes: true,
    functionAsIntegratedCompoundMatrices: true,
    matrixOnlyStemCount: 11,
    stemKeys: Object.freeze([
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
    ]),
});

const LESSON46_LOCATIVE_N_FRAME = Object.freeze({
    kind: "lesson-46-locative-n-frame",
    sourceSection: "Andrews 46.2-46.4",
    classicalStem: "(-n)-tli-",
    meaning: "place, sometimes time",
    optionGroup: "option-two-only",
    stemPosition: "integrated-matrix",
    nounClass: "tli",
    normallySecondDegreeAdverbialized: true,
    listedWithSilentNum1: true,
    supportiveVowelAfterConsonant: "i",
    canServeAsIncorporatedAdverb: true,
    formations: Object.freeze([
        Object.freeze({
            id: "ca-embed",
            sourceSection: "Andrews 46.3",
            formulaShapes: Object.freeze(["(X-ca)+(-n)-tli", "(X)+(ca+-n)-tli"]),
            embedFamilies: Object.freeze([
                "preterit-agentive-general-use-stem",
                "active-action-nounstem",
                "ca-n-interrogative-place",
                "incorporated-modifier-plus-ca-n",
            ]),
        }),
        Object.freeze({
            id: "imperfect-ya-embed",
            sourceSection: "Andrews 46.4",
            formulaShape: "imperfect-tense-predicate + (-n)-tli",
            meaning: "place of customary activity",
            protectedImperfectYaLength: true,
        }),
    ]),
});

const LESSON46_CA_N_EMBED_FRAME = Object.freeze({
    kind: "lesson-46-ca-n-embed-frame",
    sourceSection: "Andrews 46.3",
    patterns: Object.freeze([
        Object.freeze({
            id: "preterit-agentive-embed",
            sourceSection: "Andrews 46.3.1.a",
            formulaShape: "(X-ca)+(-n)-tli",
            sourceStem: "general-use preterit-agentive nounstem",
            sourceState: "absolutive",
            meaning: "place of a person or thing that has done the source action",
            normalNonadverbialNncPossible: true,
            moreOftenAdverbialized: true,
        }),
        Object.freeze({
            id: "active-action-embed",
            sourceSection: "Andrews 46.3.1.b",
            formulaShape: "(X-ca)+(-n)-tli",
            sourceStem: "active-action nounstem",
            sourceState: "possessive",
            meaning: "place of an action",
            possessorRepresentsAgent: true,
            subjectAmbiguousNormalOrAdverbialized: true,
            distantPastMorphProtectedAsCa: true,
        }),
        Object.freeze({
            id: "can-interrogative-place",
            sourceSection: "Andrews 46.3.2.a",
            formulaShape: "(ca-n)-0",
            xComponentAbsent: true,
            interrogativeAdverbAtSentenceInitial: true,
            canInCollocationUsesAdjunctorIn: true,
            caninMayFuseOnlyAfterFrequentUse: true,
            nonInitialLosesInterrogativeForce: true,
            negativeFormsLoseInterrogativeForce: true,
            canDowngradeToEmbedInCanah: true,
        }),
        Object.freeze({
            id: "x-plus-can-incorporated-modifier",
            sourceSection: "Andrews 46.3.2.b",
            formulaShape: "(X)+(ca-n)-0",
            xComponentPresent: true,
            incorporatedModifierFamilies: Object.freeze([
                "pronominal",
                "quantitive-pronominal",
                "numeral",
                "patientive",
                "imperfective-patientive-on-yo",
            ]),
            absolutiveOrPossessiveFromSourceState: true,
            canServeAsSupplementaryObjectWithNonspecificObjectPronoun: true,
        }),
    ]),
});

const LESSON46_IMPERFECT_EMBED_FRAME = Object.freeze({
    kind: "lesson-46-imperfect-embed-frame",
    sourceSection: "Andrews 46.4",
    matrixStem: "(-n)-tli-",
    embed: "nominalized imperfect-tense VNC predicate",
    meaning: "place of customary activity",
    activeVoiceFrame: Object.freeze({
        sourceSection: "Andrews 46.4.1",
        normalState: "possessive",
        possessorFromSourceSubject: true,
        nonanimateReflexiveUsesMo: true,
        temporalAndMannerMeaningsPossible: true,
        incorporatedParticleOrNounstemYieldsAbsolutiveState: true,
    }),
    passiveVoiceFrame: Object.freeze({
        sourceSection: "Andrews 46.4.2",
        possessiveStateOnly: true,
        possessorFromSourceSubject: true,
    }),
    impersonalVoiceFrame: Object.freeze({
        sourceSection: "Andrews 46.4.3",
        absolutiveStateOnly: true,
        specificIndividualPossessorBlocked: true,
        tlaImpersonalEmbedsItsImperfectPredicate: true,
        inherentlyImpersonalEmbedsActiveImperfectPredicate: true,
    }),
    notesFrame: Object.freeze({
        yohuaCanEmbedPresentTensePredicate: true,
        varietalFormationPossible: true,
        honorificStem: "(-n-tzin-co)-0",
    }),
});

const LESSON46_MATRIX_STEMS_FRAME = Object.freeze({
    kind: "lesson-46-matrix-stems-frame",
    sourceSection: "Andrews 46.5-46.14",
    stems: Object.freeze([
        Object.freeze({
            stemKey: "yan-locative",
            sourceSection: "Andrews 46.5",
            classicalStem: "(-ya-n)-tli-",
            meaning: "locative",
            embed: "nominalized active-voice perfective core",
            normalState: "possessive",
            possessorFromSourceSubject: true,
            absolutiveWithIncorporatedAdverbialParticleOrNounstem: true,
            exceptionalAbsolutiveNenyan: true,
            impersonalTlaVerbstemAbsolutive: true,
        }),
        Object.freeze({
            stemKey: "tlah-abundance-place",
            sourceSection: "Andrews 46.6",
            classicalStem: "(-tlah)-tli-",
            meaning: "place where there is abundance or characterization",
            states: Object.freeze(["absolutive", "possessive"]),
            subjectMayBeNormalOrAdverbialized: true,
            varietalStemPossible: true,
            affectiveStems: Object.freeze(["(-tlah-tzin-co)-0", "(-tlah-ton-co)-0"]),
        }),
        Object.freeze({
            stemKey: "co-c-specific-location",
            sourceSection: "Andrews 46.7-46.8",
            classicalStem: "(-co)-0 ~ (-c)-tli-",
            meaning: "specific location",
            states: Object.freeze(["absolutive", "possessive"]),
            coAfterConsonantCStemAfterVowel: true,
            exceptionAfterVowel: "(tle)-tl embeds in (-co)-0",
            temporalYoEmbedPossible: true,
            canEmbedInLargerCompoundStem: true,
            bodyPartCombinationsAreEmbedPlusMatrixNotCompoundPrepositions: true,
            lexicalizedCombinationsListedForConvenience: Object.freeze([
                "nahua-c",
                "ihti-c/ihte-c",
                "ix-co",
                "tepotz-co",
                "tzon-co",
                "yol-lo-h-co",
            ]),
            affectiveAfterCoRequiresCoReplacementBeforeFinalCo: true,
        }),
        Object.freeze({
            stemKey: "ca-interval-distance",
            sourceSection: "Andrews 46.9",
            classicalStem: "(-ca)-0",
            meaning: "interval, intervening space or time, distance",
            embeds: Object.freeze(["quantitive-pronominal", "hueh", "unique stems"]),
            achicVariantIsCaStemNotLocativeC: true,
            achiIcContrastIsPrincipalClauseUse: true,
        }),
        Object.freeze({
            stemKey: "pa-directional",
            sourceSection: "Andrews 46.10",
            classicalStem: "(-pa)-0",
            meaning: "place or direction",
            embeds: Object.freeze(["particles", "nounstems", "relational compounds", "numeral stems in ca-m-pa"]),
            icanSpecialOnlyAsEmbedForPaOrIncorporatedAdverb: true,
            coPaSequenceCanMeanMeansReasonOrWith: true,
            variablePositionInSomeCollocations: true,
            honorificStem: "(-pa-tzin-co)-0",
        }),
        Object.freeze({
            stemKey: "pa-frequency",
            sourceSection: "Andrews 46.11",
            classicalStem: "(-pa)-0",
            meaning: "occasion, occasions, times",
            homonymOfDirectionalPa: true,
            embedsOnlyQuantitiveOrNumeralNounstems: true,
            appearsInAdverbializedFrequencyNncs: true,
        }),
        Object.freeze({
            stemKey: "nal-far-bank",
            sourceSection: "Andrews 46.12.1",
            classicalStem: "(nal)-li-",
            meaning: "far bank, other side",
            favoriteEmbed: "(a)-tl-",
            nonadverbialNncPossible: true,
            canEmbedInCoAndPa: true,
            canServeAsIncorporatedAdverb: true,
        }),
        Object.freeze({
            stemKey: "chi-direction-toward",
            sourceSection: "Andrews 46.12.2",
            classicalStem: "(chi)-0",
            meaning: "direction toward",
            favoriteEmbed: "(tlal)-li-",
            rareOtherEmbedsPossible: true,
        }),
        Object.freeze({
            stemKey: "ic-downward-direction",
            sourceSection: "Andrews 46.13",
            classicalStem: "(-ic)-0",
            meaning: "downward direction of",
            bodyPartEmbeds: true,
            absolutiveStateNncPossible: true,
            compoundStemCanEmbedInCompoundVerbstems: true,
        }),
        Object.freeze({
            stemKey: "teuh-similarity-manner",
            sourceSection: "Andrews 46.14",
            classicalStem: "(teuh)-0",
            meaning: "similarity, resemblance, manner",
            createsAdverbializedMannerNncs: true,
            compoundStemCanBeIncorporatedAdverb: true,
        }),
    ]),
});

const LESSON46_EXAMPLE_SENTENCE_FRAME = Object.freeze({
    kind: "lesson-46-example-sentence-frame",
    sourceSection: "Andrews 46.15",
    translationPrepositionMustBeInferredFromContext: true,
    relationalNncsCanServeSupplementaryObjectsOrPossessorsByContext: true,
    numeralModifierOfCoCAdverbializedNncMustItselfBeAdverbialized: true,
});

const LESSON46_RELATIONAL_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson46-option-two-only", andrewsSection: "46.1", category: "option-two-only-matrix-stems", directiveEs: "Once troncos relacionales solo ocurren como matrices integradas; no se deben tratar como sufijos.", engineSurface: "diagnostic option-two-only inventory", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-n-locative", andrewsSection: "46.2", category: "n-locative-matrix", directiveEs: "El tronco n de lugar forma compuestos locativos o temporales, casi siempre en CNN adverbializadas de segundo grado.", engineSurface: "diagnostic locative-n frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-n-ca-embed-overview", andrewsSection: "46.3", category: "ca-plus-n-locative", directiveEs: "La combinacion ca+n tiene dos formas: X-ca+n y X+ca-n; ambas deben mantenerse como arquitectura de matriz integrada.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-preterit-agentive-embed", andrewsSection: "46.3.1.a", category: "preterit-agentive-place", directiveEs: "El embed agentivo preterito produce lugar de quien hizo la accion; puede ser CNN normal, pero es mas frecuente como adverbializada.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-active-action-embed", andrewsSection: "46.3.1.b", category: "active-action-place", directiveEs: "El embed de accion activa produce lugar de la accion en CNN posesiva; el poseedor representa el agente.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-can-question", andrewsSection: "46.3.2.a", category: "can-interrogative-place", directiveEs: "Can pregunta por lugar solo en posicion interrogativa; can in contiene el adjunctor in y canin puede fusionarse por uso frecuente.", engineSurface: "diagnostic can frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-x-can-modifiers", andrewsSection: "46.3.2.b", category: "x-plus-can-modifier", directiveEs: "Con X presente, el embed puede ser pronominal, cuantitivo, numeral o patientivo; los estados siguen la fuente.", engineSurface: "diagnostic x-can frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-imperfect-embed-overview", andrewsSection: "46.4", category: "imperfect-predicate-place", directiveEs: "Un predicado imperfecto nominalizado llena el embed de n y significa lugar de actividad acostumbrada.", engineSurface: "diagnostic imperfect embed frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-active-imperfect-embed", andrewsSection: "46.4.1", category: "active-imperfect-place", directiveEs: "La fuente activa suele dar CNN posesiva; el poseedor viene del sujeto fuente y puede extenderse a tiempo o manera.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-passive-imperfect-embed", andrewsSection: "46.4.2", category: "passive-imperfect-place", directiveEs: "La fuente pasiva produce solo CNN posesiva, con poseedor derivado del sujeto fuente.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-impersonal-imperfect-embed", andrewsSection: "46.4.3", category: "impersonal-imperfect-place", directiveEs: "La fuente impersonal produce solo CNN absolutiva; no se asocia con individuo especifico.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-yan-locative", andrewsSection: "46.5", category: "yan-locative-perfective-core", directiveEs: "Yan toma nucleo perfectivo activo nominalizado; normalmente es posesivo, con casos absolutivos cuando hay particula o tronco adverbial incorporado.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-tlah-abundance", andrewsSection: "46.6", category: "tlah-abundance-place", directiveEs: "Tlah expresa lugar de abundancia o caracterizacion; admite absolutivo o posesivo y sujeto normal o adverbializado.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-co-c-location", andrewsSection: "46.7", category: "co-c-specific-location", directiveEs: "Co/c expresa ubicacion especifica; co sigue consonante, c sigue vocal, con excepcion de tleco.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-seeming-compound-matrix", andrewsSection: "46.8", category: "bodypart-co-c-warning", directiveEs: "Las secuencias tipo ixco o ijtic son embed+matriz, no preposiciones compuestas ni posposiciones.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-ca-interval", andrewsSection: "46.9", category: "ca-interval-distance", directiveEs: "Ca expresa intervalo o distancia; se distingue de achi ic aunque pueda escribirse achic.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-pa-directional", andrewsSection: "46.10", category: "pa-directional", directiveEs: "Pa direccional embebe particulas, troncos y compuestos relacionales; copa puede traducirse como medio, razon o con.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-pa-frequency", andrewsSection: "46.11", category: "pa-frequency", directiveEs: "Pa de frecuencia es homonimo de pa direccional y solo embebe cuantitivos o numerales.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-nal-far-bank", andrewsSection: "46.12.1", category: "nal-far-bank", directiveEs: "Nal embebe normalmente a-tl, puede formar CNN no adverbial y tambien incorporarse como adverbio.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-chi-direction", andrewsSection: "46.12.2", category: "chi-direction-toward", directiveEs: "Chi expresa direccion hacia; su embed favorito es tlal-li, con otros embeds raros.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-ic-downward", andrewsSection: "46.13", category: "ic-downward-direction", directiveEs: "Ic expresa direccion hacia abajo con troncos de partes del cuerpo y puede entrar como embed verbal compuesto.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-teuh-manner", andrewsSection: "46.14", category: "teuh-similarity-manner", directiveEs: "Teuh expresa semejanza o manera y crea CNN adverbializadas de modo.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson46-example-sentences", andrewsSection: "46.15", category: "sentence-use-inference", directiveEs: "Las preposiciones de traduccion se infieren por contexto; un numeral que modifica una CNN adverbializada co/c tambien debe adverbializarse.", engineSurface: "diagnostic example-sentence frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson46RelationalNncSubsectionInventory() {
    return LESSON46_RELATIONAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON46_RELATIONAL_NNC_VALIDATION_REFS),
    }));
}

function buildLesson46RelationalNncPursuitFrame() {
    const subsectionInventory = getLesson46RelationalNncSubsectionInventory();
    const optionTwoOnlyFrame = cloneRelationalNncLessonRecord(LESSON46_OPTION_TWO_ONLY_FRAME);
    const locativeNFrame = cloneRelationalNncLessonRecord(LESSON46_LOCATIVE_N_FRAME);
    const caNEmbedFrame = cloneRelationalNncLessonRecord(LESSON46_CA_N_EMBED_FRAME);
    const imperfectEmbedFrame = cloneRelationalNncLessonRecord(LESSON46_IMPERFECT_EMBED_FRAME);
    const matrixStemsFrame = cloneRelationalNncLessonRecord(LESSON46_MATRIX_STEMS_FRAME);
    const exampleSentenceFrame = cloneRelationalNncLessonRecord(LESSON46_EXAMPLE_SENTENCE_FRAME);
    const remainingGaps = [
        "Current Lesson 46 support records Andrews' option-two-only relational NNC architecture as diagnostics; it does not implement matrix-only relational fixture data or relational NNC generation.",
        "All Classical examples and stem spellings remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require confirmed Nawat/Pipil evidence before output.",
        "Parser/search detection, supplementary possessor/object resolution, can/canin interrogative behavior, co/c body-part lexicalization, pa homonym disambiguation, incorporated adverb routing, acciones de interfaz, and sentence-level context inference remain partial or evidence-needed.",
    ];
    const frame = {
        kind: "lesson-46-relational-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 46,
        aimStatus: "shooting",
        routeStage: "audit-lesson-46",
        pdfRefs: Array.from(LESSON46_RELATIONAL_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 46.1-46.15 against current relational NNC boundary metadata, option-two-only matrix stems, n locatives, ca+n embeds, imperfect and perfective source mappings, locative/directional/frequency stems, body-part matrix warnings, and contextual sentence-use constraints.",
                andrewsRefs: Array.from(LESSON46_RELATIONAL_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON46_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 46 now records Andrews relational NNC part-two architecture across the eleven option-two-only matrix stems, locative n formations, ca+n embeds, imperfect/perfective source-state rules, co/c body-part warnings, directional/frequency pa split, and sentence-context inference while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON46_RELATIONAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON46_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        optionTwoOnlyFrame,
        locativeNFrame,
        caNEmbedFrame,
        imperfectEmbedFrame,
        matrixStemsFrame,
        exampleSentenceFrame,
        currentEngineBoundary: {
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
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachRelationalNncGrammarContract(frame, {
        metadataKind: "lesson-46-relational-nnc-pursuit-frame",
        unitKind: "relational-nnc-boundary",
        routeStage: "audit-lesson-46",
        structuralSource: "Andrews Lesson 46",
        andrewsRefs: Array.from(LESSON46_RELATIONAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 46.1-46.15",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil relational evidence",
            noClassicalSurfaceImport: true,
            slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            optionTwoOnlyFrame,
            locativeNFrame,
            caNEmbedFrame,
            imperfectEmbedFrame,
            matrixStemsFrame,
            exampleSentenceFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "option-two integrated-structure relational NNC",
            optionTwoOnlyMatrixStems: true,
            matrixOnlyStemsAreNotSuffixes: true,
            activeAndPassiveSourcesCanMapSubjectToPossessor: true,
            impersonalSourcesRequireAbsolutiveState: true,
            translationPrepositionMustBeInferredFromContext: true,
        },
        participantFrame: {
            semanticRole: "governed possessor, embed, supplementary object, or contextual relational argument",
            translationPrepositionIsNotMorphology: true,
            sourceSubjectToPossessorOnlyWhenLicensedBySourceVoice: true,
        },
        targetContract: {
            metadataKind: "lesson-46-relational-nnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["relational-nnc-lesson-46-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
    });
}

const LESSON47_RELATIONAL_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_relational.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON47_RELATIONAL_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 47.1",
    "Andrews Lesson 47.2",
    "Andrews Lesson 47.3",
    "Andrews Lesson 47.4",
    "Andrews Lesson 47.5",
]);

const LESSON47_OPTIONS_ONE_TWO_FRAME = Object.freeze({
    kind: "lesson-47-options-one-two-frame",
    sourceSection: "Andrews 47.1",
    optionGroup: "options-one-two",
    stems: Object.freeze([
        Object.freeze({
            stemKey: "tzalan",
            sourceSection: "Andrews 47.1.1",
            classicalStem: "(tzalan)-tli-",
            meaning: "area between, place among or amidst",
            optionOne: "possessive-state simple-stem NNC",
            optionTwo: "integrated-structure compound matrix",
            nonadverbialNncPossible: true,
            honorificStem: "(tzalan-tzin-co)-0",
        }),
        Object.freeze({
            stemKey: "huic",
            sourceSection: "Andrews 47.1.2",
            classicalStem: "(huic)-0",
            meaning: "direction",
            optionOne: "possessive-state simple-stem NNC",
            optionTwo: "integrated-structure compound matrix",
            negativizedAhhuicContrastsWithAhco: true,
            canServeAsMatrixForOtherLocativeDirectionalStems: true,
            canBeEmbeddedInPaOrCopa: true,
            honorificStem: "(huic-tzin-co)-0",
        }),
    ]),
});

const LESSON47_OPTIONS_ONE_THREE_FRAME = Object.freeze({
    kind: "lesson-47-options-one-three-frame",
    sourceSection: "Andrews 47.2",
    optionGroup: "options-one-three",
    stems: Object.freeze([
        Object.freeze({
            stemKey: "ca-means",
            sourceSection: "Andrews 47.2.1",
            classicalStem: "(ca)-0",
            meaning: "means",
            optionOne: "possessive-state simple-stem NNC",
            optionThree: "connective-t compound-stemmed NNC",
            temporalConnectiveTCompoundsPossible: true,
            monetaryUnitModifierCanCollapseToNumeralStem: true,
            honorificStem: "(ca-tzin-co)-0",
            translationWarning: "English/Spanish with, by, because, or about is contextual, not a preposition slot.",
        }),
        Object.freeze({
            stemKey: "icpa-c-top",
            sourceSection: "Andrews 47.2.2",
            classicalStem: "(icpa-c)-tli-",
            meaning: "top location, top, head",
            actuallyCompoundMatrix: true,
            cannotEmbedAnotherNounstemInIntegratedStructure: true,
            optionOne: "possessive-state simple-stem NNC",
            optionThree: "connective-t compound-stemmed NNC",
            canEmbedInDirectionalPa: true,
            affectiveStems: Object.freeze(["(icpa-c-tzin-co)-0", "(icpa-c-ton-co)-0"]),
        }),
    ]),
});

const LESSON47_OPTIONS_ONE_TWO_THREE_FRAME = Object.freeze({
    kind: "lesson-47-options-one-two-three-frame",
    sourceSection: "Andrews 47.3",
    optionGroup: "options-one-two-three",
    stems: Object.freeze([
        Object.freeze({
            stemKey: "tech-contact",
            sourceSection: "Andrews 47.3.1",
            classicalStem: "(tech)-tli-",
            meaning: "side surface, contact",
            optionOne: "possessive-state simple-stem NNC",
            optionTwo: "integrated-structure compound matrix",
            optionThree: "connective-t compound-stemmed NNC",
            reciprocalPossessorCanBeIntensified: true,
            canEmbedInPaOrCopaForAboutRelations: true,
            honorificStem: "(tech-tzin-co)-0",
        }),
        Object.freeze({
            stemKey: "tlan-bottom",
            sourceSection: "Andrews 47.3.2",
            classicalStem: "(tlan)-0",
            meaning: "bottom surface, low-down location, adjacent or sheltered location",
            optionOne: "possessive-state simple-stem NNC",
            optionTwo: "integrated-structure compound matrix",
            optionThree: "connective-t compound-stemmed NNC",
            bodyPartPrecisionCompounds: Object.freeze(["ix-tlan", "tzin-tlan"]),
            canEmbedInDirectionalPa: true,
            xillanBellyFormationUsesUnattestedEmbed: true,
            honorificStem: "(tlan-tzin-co)-0",
        }),
        Object.freeze({
            stemKey: "pan-surface-time",
            sourceSection: "Andrews 47.3.3",
            classicalStem: "(pan)-0",
            meaning: "upper surface, surface appearance, superior location, place or time",
            optionOne: "possessive-state simple-stem NNC",
            optionTwo: "integrated-structure compound matrix",
            optionThree: "connective-t compound-stemmed NNC",
            possessiveStateCanExpressTime: true,
            tlaPanAndNePanCanDowngradeToStems: true,
            nePanTlahExpressesMiddle: true,
            pampaExtendsFromDirectionToSupportReason: true,
            ipanCanConnectNumeralGroups: true,
            bodyPartCompoundsDoNotInviteFurtherEmbedding: true,
        }),
    ]),
});

const LESSON47_ASSOCIATED_ENTITY_FRAME = Object.freeze({
    kind: "lesson-47-associated-entity-frame",
    sourceSection: "Andrews 47.4",
    matrixStem: "(-ca)-tl-",
    embedsCompoundNounstemWithRelationalMatrix: true,
    meaning: "entity associated with the relational compound",
    humanOrNonhumanEntity: true,
    canEmbedPossessorSupplementationStructures: true,
    coOrCMatrixReplacedBySilentVariantBeforeCa: true,
    contrastWithGentilicFormationRequired: true,
});

const LESSON47_PERTINENCY_FRAME = Object.freeze({
    kind: "lesson-47-pertinency-frame",
    sourceSection: "Andrews 47.5",
    matrixStem: "(-yo)-tl-",
    meaning: "thing, state, condition, or quality pertaining to or characteristic of the relational compound",
    formations: Object.freeze([
        Object.freeze({
            id: "direct-adverbialized-nnc-stem",
            sourceSection: "Andrews 47.5.1",
            embed: "stem of an adverbialized NNC",
            possessorInsideStemDoesNotAffectAbsolutiveState: true,
            canEmbedPossessorSupplementationOrAdverbialModificationStructure: true,
        }),
        Object.freeze({
            id: "associated-entity-stem",
            sourceSection: "Andrews 47.5.2",
            embed: "associated-entity compound stem in (-ca)-tl",
            translationOftenHidesMorphologicalComplexity: true,
        }),
    ]),
});

const LESSON47_RELATIONAL_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson47-options-one-two", andrewsSection: "47.1", category: "options-one-two-group", directiveEs: "Dos troncos aceptan opcion 1 y opcion 2; la interfaz no debe colapsarlos con el grupo solo opcion 2.", engineSurface: "diagnostic relational grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-tzalan", andrewsSection: "47.1.1", category: "tzalan-between-amid", directiveEs: "Tzalan expresa area entre o en medio; admite CNN posesiva simple y matriz integrada, incluso CNN no adverbial cuando el significado lo permite.", engineSurface: "diagnostic options-one-two frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-huic", andrewsSection: "47.1.2", category: "huic-direction", directiveEs: "Huic expresa direccion; puede combinarse con otros troncos locativos/direccionales y tambien con pa o copa.", engineSurface: "diagnostic options-one-two frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-options-one-three", andrewsSection: "47.2", category: "options-one-three-group", directiveEs: "Dos troncos aceptan opcion 1 y opcion 3; el conectivo t debe quedar como arquitectura relacional, no como superficie generada sin evidencia.", engineSurface: "diagnostic relational grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-ca-means", andrewsSection: "47.2.1", category: "ca-means", directiveEs: "Ca expresa medio; tambien forma compuestos temporales y usos contextuales que la traduccion puede rendir como con, por o acerca de.", engineSurface: "diagnostic options-one-three frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-icpac", andrewsSection: "47.2.2", category: "icpac-top-location", directiveEs: "Icpac es una matriz compuesta de ubicacion superior; actua como ca en opcion 1/3 y no embebe otro tronco por estructura integrada.", engineSurface: "diagnostic options-one-three frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-options-one-two-three", andrewsSection: "47.3", category: "options-one-two-three-group", directiveEs: "Tres troncos aceptan opciones 1, 2 y 3; las diferencias de posicion simple, integrada y con conectivo t deben permanecer visibles en metadata.", engineSurface: "diagnostic relational grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-tech", andrewsSection: "47.3.1", category: "tech-contact", directiveEs: "Tech expresa contacto o superficie lateral; puede aparecer como simple posesivo, matriz integrada, matriz con conectivo t, o embed de pa/copa.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-tlan", andrewsSection: "47.3.2", category: "tlan-bottom-adjacent", directiveEs: "Tlan expresa superficie inferior, ubicacion baja o adyacencia; ixtlan y tzintlan precisan partes del cuerpo y tlan puede embebarse en pa.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-pan", andrewsSection: "47.3.3", category: "pan-surface-time", directiveEs: "Pan expresa superficie superior, lugar o tiempo; pampa extiende direccion a apoyo/razon e ipan puede conectar grupos numerales.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-associated-entity", andrewsSection: "47.4", category: "associated-entity-nnc", directiveEs: "Un compuesto relacional puede embebarse en ca-tl para nombrar una entidad asociada; no se debe confundir automaticamente con gentilicio.", engineSurface: "diagnostic associated-entity frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-associated-entity-co-c", andrewsSection: "47.4 co/c replacement", category: "associated-entity-co-c-silent", directiveEs: "Cuando co/c entra en ca-tl, la matriz co/c se reemplaza por variante silenciosa.", engineSurface: "diagnostic associated-entity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-pertinency-overview", andrewsSection: "47.5", category: "pertinency-nnc", directiveEs: "Yo-tl crea pertinencia sobre compuestos relacionales; la traduccion puede ocultar la complejidad morfologica.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-pertinency-direct", andrewsSection: "47.5.1", category: "direct-pertinency", directiveEs: "Yo-tl puede embeder directamente el tronco de una CNN adverbializada; el poseedor interno no cambia el estado absolutivo.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson47-pertinency-associated-entity", andrewsSection: "47.5.2", category: "associated-entity-pertinency", directiveEs: "Yo-tl tambien puede embeder un tronco de entidad asociada en ca-tl para expresar pertinencia.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function getLesson47RelationalNncSubsectionInventory() {
    return LESSON47_RELATIONAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON47_RELATIONAL_NNC_VALIDATION_REFS),
    }));
}

function buildLesson47RelationalNncPursuitFrame() {
    const subsectionInventory = getLesson47RelationalNncSubsectionInventory();
    const optionsOneTwoFrame = cloneRelationalNncLessonRecord(LESSON47_OPTIONS_ONE_TWO_FRAME);
    const optionsOneThreeFrame = cloneRelationalNncLessonRecord(LESSON47_OPTIONS_ONE_THREE_FRAME);
    const optionsOneTwoThreeFrame = cloneRelationalNncLessonRecord(LESSON47_OPTIONS_ONE_TWO_THREE_FRAME);
    const associatedEntityFrame = cloneRelationalNncLessonRecord(LESSON47_ASSOCIATED_ENTITY_FRAME);
    const pertinencyFrame = cloneRelationalNncLessonRecord(LESSON47_PERTINENCY_FRAME);
    const remainingGaps = [
        "Current Lesson 47 support records Andrews' option-one/two/three relational NNC architecture as diagnostics; it does not implement relational fixture data, associated-entity generation, or pertinency generation.",
        "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require confirmed Nawat/Pipil evidence before visible output.",
        "Parser/search detection, supplementary possessor resolution, pa/copa embedding, connective-t relational compounds, body-part compound distinctions, associated-entity versus gentilic contrast, pertinency routing, acciones de interfaz, and sentence-level context inference remain partial or evidence-needed.",
    ];
    const frame = {
        kind: "lesson-47-relational-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 47,
        aimStatus: "shooting",
        routeStage: "audit-lesson-47",
        pdfRefs: Array.from(LESSON47_RELATIONAL_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 47.1-47.5 against current relational NNC boundary metadata, option-one/two and option-one/three and option-one/two/three stem groups, associated-entity NNCs, pertinency NNCs, and translation-complexity blockers.",
                andrewsRefs: Array.from(LESSON47_RELATIONAL_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON47_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 47 now records Andrews relational NNC part-three architecture across options-one-two stems, options-one-three stems, options-one-two-three stems, associated-entity NNC formation, co/c silent replacement, and pertinency NNC formation while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON47_RELATIONAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON47_RELATIONAL_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        optionsOneTwoFrame,
        optionsOneThreeFrame,
        optionsOneTwoThreeFrame,
        associatedEntityFrame,
        pertinencyFrame,
        currentEngineBoundary: {
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
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachRelationalNncGrammarContract(frame, {
        metadataKind: "lesson-47-relational-nnc-pursuit-frame",
        unitKind: "relational-nnc-boundary",
        routeStage: "audit-lesson-47",
        structuralSource: "Andrews Lesson 47",
        andrewsRefs: Array.from(LESSON47_RELATIONAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 47.1-47.5",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil relational evidence",
            noClassicalSurfaceImport: true,
            slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            optionsOneTwoFrame,
            optionsOneThreeFrame,
            optionsOneTwoThreeFrame,
            associatedEntityFrame,
            pertinencyFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "relational NNC option group",
            optionOneSimplePossessiveAllowedWhereStemLicensesIt: true,
            optionTwoIntegratedMatrixAllowedWhereStemLicensesIt: true,
            optionThreeConnectiveTMatrixAllowedWhereStemLicensesIt: true,
            associatedEntityAndPertinencyAreDerivedNncFormations: true,
            translationPrepositionMustBeInferredFromContext: true,
        },
        participantFrame: {
            semanticRole: "governed possessor, embed, associated entity, or pertinency relation",
            translationPrepositionIsNotMorphology: true,
            associatedEntityMustNotBeCollapsedIntoGentilicWithoutEvidence: true,
        },
        targetContract: {
            metadataKind: "lesson-47-relational-nnc-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["relational-nnc-lesson-47-diagnostic-partial", "relational-nnc-needs-nawat-evidence"],
    });
}

function buildRelationalNncBoundaryMetadata() {
    const boundary = {
        kind: "relational-nnc-boundary",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        lessons: [45, 46, 47],
        status: "partial",
        structuralSource: "Andrews Lessons 45-47",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getRelationalNncStructuralQuestions(),
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
        antiConflationRules: getRelationalNncAntiConflationRules(),
    };
    return attachRelationalNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary,
    });
}

function classifyRelationalNncCandidate({
    candidate = "",
    relationalStem = "",
    relationalKind = "",
    relationalOption = "",
    governedArgument = "",
    evidenceSource = "",
    falsePositiveSource = "",
    sourceKind = "",
} = {}) {
    const normalizedKind = normalizeRelationalNncKind(relationalKind);
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    const normalizedFalsePositive = normalizeRelationalNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "relational-nnc-candidate-classification",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        relationalStem: String(relationalStem || ""),
        relationalKind: normalizedKind,
        relationalOption: normalizedOption,
        governedArgument: String(governedArgument || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "relational-nnc-needs-validation" : "relational-nnc-needs-nawat-evidence",
            normalizedKind !== RELATIONAL_NNC_KIND.unknown
                ? "relational-nnc-kind-recognized"
                : "relational-nnc-kind-unconfirmed",
            normalizedFalsePositive !== RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "relational-nnc-false-positive-source"
                : "relational-nnc-unconfirmed",
        ],
        boundary: buildRelationalNncBoundaryMetadata(),
    };
    return attachRelationalNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.relationalStem,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "relational-nounstem-candidate",
            sourceStem: classification.relationalStem,
            useStatus: classification.relationalOption,
        },
    });
}

function classifyRelationalNncFalsePositive(source = "") {
    const normalizedSource = normalizeRelationalNncFalsePositiveSource(source);
    const classification = {
        kind: "relational-nnc-false-positive",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isRelationalNncEvidence: false,
        isPlaceNameEvidence: false,
        isGentilicEvidence: false,
        generationAllowed: false,
        diagnostics: ["relational-nnc-false-positive-source"],
        antiConflationRules: getRelationalNncAntiConflationRules(),
    };
    return attachRelationalNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
    });
}

function buildRelationalNncUsageFrame({
    candidate = "",
    relationalStem = "",
    relationalKind = "",
    relationalOption = "",
    optionGroup = "",
    stemPosition = "",
    sourceState = "",
    governedArgument = "",
    evidenceSource = "",
    sourceKind = "",
    sourceVoice = "",
    sourceTense = "",
    sourceSubject = "",
    possessorPrefix = "",
    matrixStem = "",
    embeddedStem = "",
    connective = "",
    translationLabel = "",
} = {}) {
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    const normalizedKind = normalizeRelationalNncKind(relationalKind);
    const normalizedOptionGroup = normalizeRelationalNncOptionGroup(optionGroup);
    const normalizedSourceState = normalizeRelationalNncSourceState(sourceState);
    const normalizedSourceVoice = normalizeRelationalNncSourceVoice(sourceVoice);
    const defaultStemPosition = getDefaultRelationalNncStemPosition(normalizedOption);
    const normalizedStemPosition = normalizeRelationalNncStemPosition(stemPosition) === RELATIONAL_NNC_STEM_POSITION.unknown
        ? defaultStemPosition
        : normalizeRelationalNncStemPosition(stemPosition);
    const allowedStates = getRelationalNncAllowedStatesForOption(normalizedOption);
    const diagnostics = ["relational-nnc-usage-frame-non-generative"];
    let supported = true;

    if (
        normalizedSourceState !== RELATIONAL_NNC_SOURCE_STATE.unknown
        && !allowedStates.includes(normalizedSourceState)
    ) {
        supported = false;
        if (normalizedOption === RELATIONAL_NNC_OPTION.optionOne) {
            diagnostics.push("relational-nnc-option-one-requires-possessive-state");
        } else {
            diagnostics.push("relational-nnc-source-state-not-allowed-for-option");
        }
    }

    if (normalizedOption === RELATIONAL_NNC_OPTION.optionOne) {
        diagnostics.push("relational-nnc-option-one-supplementary-possessor-only");
    }

    if (
        normalizedOption === RELATIONAL_NNC_OPTION.optionTwo
        && normalizedSourceVoice === RELATIONAL_NNC_SOURCE_VOICE.impersonal
        && normalizedSourceState === RELATIONAL_NNC_SOURCE_STATE.possessive
    ) {
        supported = false;
        diagnostics.push("relational-nnc-impersonal-source-requires-absolutive-state");
    }

    if (String(translationLabel || "").trim()) {
        diagnostics.push("relational-nnc-translation-label-is-not-morphology");
    }

    const sourceSubjectText = String(sourceSubject || "").trim();
    const sourceMapping = {
        sourceVoice: normalizedSourceVoice,
        sourceTense: String(sourceTense || ""),
        sourceSubject: sourceSubjectText,
        possessorPrefix: String(possessorPrefix || ""),
        possessorFromSourceSubject:
            normalizedOption === RELATIONAL_NNC_OPTION.optionTwo
            && normalizedSourceVoice !== RELATIONAL_NNC_SOURCE_VOICE.impersonal
            && Boolean(sourceSubjectText),
        stateRule:
            normalizedOption === RELATIONAL_NNC_OPTION.optionTwo
            && normalizedSourceVoice === RELATIONAL_NNC_SOURCE_VOICE.impersonal
                ? "impersonal-source-absolutive-only"
                : "",
    };

    const frame = {
        kind: "relational-nnc-usage-frame",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        lessonRange: "45-47",
        structuralSource: "Andrews Lessons 45.2-46",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        candidate: String(candidate || ""),
        relationalStem: String(relationalStem || ""),
        relationalKind: normalizedKind,
        relationalOption: normalizedOption,
        optionGroup: normalizedOptionGroup,
        stemPosition: normalizedStemPosition,
        sourceState: normalizedSourceState,
        allowedStates,
        governedArgument: String(governedArgument || ""),
        matrixStem: String(matrixStem || ""),
        embeddedStem: String(embeddedStem || ""),
        connective: String(connective || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceKind: String(sourceKind || ""),
        sourceMapping,
        supplementaryPossessorOnly: normalizedOption === RELATIONAL_NNC_OPTION.optionOne,
        supported,
        generationAllowed: false,
        generationContract: {
            frameGeneratesSurface: false,
            changesSurfaceForms: false,
            newWordGenerationAllowed: false,
        },
        translationWarning: {
            labelsAreMorphology: false,
            translationLabel: String(translationLabel || ""),
            warning: "preposition and conjunction labels are translation-only unless Nawat/Pipil morphology is evidenced",
        },
        diagnostics,
        boundary: buildRelationalNncBoundaryMetadata(),
    };
    return attachRelationalNncGrammarContract(frame, {
        routeStage: "describe-usage-frame",
        sourceInput: frame.candidate || frame.relationalStem,
        supported,
        morphBoundaryFrame: frame.boundary,
        stemFrame: {
            stemKind: "relational-nounstem",
            sourceStem: frame.relationalStem,
            matrix: frame.matrixStem,
            embed: frame.embeddedStem,
            useStatus: frame.stemPosition,
        },
        nuclearClauseFrame: frame,
    });
}
