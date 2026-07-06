// core/nnc/relational/relational.js
// Lessons 45-47 relational-NNC boundary metadata. This keeps ordinary NNC
// generation, locative/temporal nominal outputs, and translation labels
// separate from Andrews source-gated relational NNC generation.

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
    "preposition or place translations are not orthography-bridge relational form evidence",
    "Andrews relational categories are architecture, not Nawat/Pipil orthography authority",
]);

const RELATIONAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "relationalStem",
        asks: "Which Andrews relational nounstem is licensed, before Nawat/Pipil orthography realizes it?",
    }),
    Object.freeze({
        field: "relationalKind",
        asks: "Is the candidate locative, directional, frequency, associated-entity, pertinency, relational-stem, or unknown?",
    }),
    Object.freeze({
        field: "relationalOption",
        asks: "Which Andrews relational usage option is licensed: one, two, three, four, or unknown?",
    }),
    Object.freeze({
        field: "governedArgument",
        asks: "What noun, pronoun, possessor, or clause is governed by the relational NNC?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "Which Andrews source gate or structured route licenses relational status?",
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

function normalizeRelationalNncCandidateSurface(value = "") {
    const raw = String(value || "").trim();
    if (!raw || /[A-Z_]/.test(raw)) {
        return "";
    }
    const source = raw
        .replace(/\[[^\]]+\]/g, "")
        .replace(/[Øø]/g, "")
        .replace(/\b0\b/g, "")
        .replace(/[#+(){}\s.-]/g, "")
        .trim();
    if (!source || /[A-Z_]/.test(source)) {
        return "";
    }
    const conversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat(source, {
            source: "Andrews relational NNC candidate formula",
            slot: "relational-nounstem",
        })
        : { output: source, diagnostics: [] };
    return String(conversion?.output || source || "").trim();
}

function hasRelationalNncAndrewsSourceGate({
    sourceGate = "",
    structuredSource = false,
} = {}) {
    return structuredSource === true || Boolean(String(sourceGate || "").trim());
}

function buildRelationalNncSourceFrame({
    candidate = "",
    relationalStem = "",
    relationalKind = "",
    relationalOption = "",
    governedArgument = "",
    evidenceSource = "",
    sourceGate = "",
    sourceKind = "",
    targetFormulaSlots = null,
    targetSegmentFrames = [],
} = {}) {
    const normalizedKind = normalizeRelationalNncKind(relationalKind);
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    if (
        normalizedKind === RELATIONAL_NNC_KIND.unknown
        || normalizedOption === RELATIONAL_NNC_OPTION.unknown
    ) {
        return null;
    }
    const segments = Array.isArray(targetSegmentFrames)
        ? targetSegmentFrames
            .map((segment) => {
                const surface = String(segment?.surface || "").trim();
                if (!surface || /[A-Z_]/.test(surface)) {
                    return null;
                }
                return Object.freeze({
                    slot: String(segment?.slot || ""),
                    role: String(segment?.role || ""),
                    formulaValue: String(segment?.formulaValue || ""),
                    sourceStem: String(segment?.sourceStem || ""),
                    surface,
                    orthographyBridge: "Nawat/Pipil orthography bridge",
                });
            })
            .filter(Boolean)
        : [];
    if (!segments.length) {
        return null;
    }
    const targetSurface = segments.map((segment) => segment.surface).join("");
    if (!targetSurface) {
        return null;
    }
    return Object.freeze({
        kind: "relational-nnc-source-frame",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        routeFamily: "relational-nnc",
        relationalKind: normalizedKind,
        relationalOption: normalizedOption,
        candidate: String(candidate || ""),
        relationalStem: String(relationalStem || ""),
        governedArgument: String(governedArgument || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        sourceKind: String(sourceKind || ""),
        targetFormulaSlots,
        targetSegmentFrames: Object.freeze(segments),
        targetSurface,
        authority: "Andrews Lessons 45-47 relational NNC source frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function buildRelationalNncOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== "relational-nnc-source-frame") {
        return null;
    }
    return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-45-47-relational-nnc-realization",
        routeFamily: "relational-nnc",
        routeStage: "execute-typed-operation-frame",
        operationApplied: "realize-relational-nnc-from-source-frame",
        sourceFrameKind: sourceFrame.kind,
        sourceRelationalKind: sourceFrame.relationalKind,
        sourceRelationalOption: sourceFrame.relationalOption,
        sourceRelationalStem: sourceFrame.relationalStem,
        sourceGovernedArgument: sourceFrame.governedArgument,
        targetFormulaSlots: sourceFrame.targetFormulaSlots,
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetSurface: sourceFrame.targetSurface,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getRelationalNncOperationFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== "relational-nnc-source-frame") {
        return "source-frame-required";
    }
    if (
        !operationFrame
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== "andrews-45-47-relational-nnc-realization"
        || operationFrame.routeFamily !== "relational-nnc"
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        String(operationFrame.sourceFrameKind || "") !== sourceFrame.kind
        || String(operationFrame.sourceRelationalKind || "") !== String(sourceFrame.relationalKind || "")
        || String(operationFrame.sourceRelationalOption || "") !== String(sourceFrame.relationalOption || "")
        || String(operationFrame.sourceRelationalStem || "") !== String(sourceFrame.relationalStem || "")
        || String(operationFrame.sourceGovernedArgument || "") !== String(sourceFrame.governedArgument || "")
    ) {
        return "contradictory-source-frame";
    }
    const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    if (!targetSegmentFrames.length) {
        return "operation-frame-required";
    }
    const targetSurface = targetSegmentFrames
        .map((segment) => String(segment?.surface || ""))
        .join("");
    if (
        targetSurface !== String(sourceFrame.targetSurface || "")
        || String(operationFrame.targetSurface || "") !== String(sourceFrame.targetSurface || "")
    ) {
        return "contradictory-target-frame";
    }
    if (
        sourceFrame.targetFormulaSlots
        && operationFrame.targetFormulaSlots !== sourceFrame.targetFormulaSlots
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function getRelationalNncBlockedDiagnostic({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const mismatch = getRelationalNncOperationFrameMismatch({ sourceFrame, operationFrame });
    return mismatch ? `relational-nnc-${mismatch}` : "";
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
    Object.freeze({ id: "lesson45-high-generality", andrewsSection: "45.1 high-generality", category: "high-generality-relational-meaning", directiveEs: "Un mismo tronco relacional puede cubrir lugar, fuente, meta o ruta segun contexto.", engineSurface: "diagnostic relational boundary frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-affective-relational", andrewsSection: "45.1 note", category: "affective-relational-stem", directiveEs: "El afectivo relacional requiere matriz tzin/ton y validacion adverbial con co.", engineSurface: "diagnostic affective relational frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-option-one", andrewsSection: "45.2 option 1", category: "option-one-simple-possessive", directiveEs: "Opcion 1: tronco relacional como predicado simple en CNN posesiva.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-two", andrewsSection: "45.2 option 2", category: "option-two-integrated-matrix", directiveEs: "Opcion 2: tronco relacional como matriz integrada; la CNN puede ser absolutiva o posesiva y suele orientarse al embed.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-three", andrewsSection: "45.2 option 3", category: "option-three-linked-matrix", directiveEs: "Opcion 3: matriz relacional ligada; el conectivo separa y enlaza, aclarando orientacion al embed.", engineSurface: "relational usage frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-four", andrewsSection: "45.2 option 4", category: "option-four-compound-embed", directiveEs: "Opcion 4: el tronco relacional simple o compuesto llena el embed de un tronco compuesto.", engineSurface: "diagnostic compound-embed frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-groupings", andrewsSection: "45.3", category: "relational-option-groupings", directiveEs: "Los grupos relacionales se definen por las opciones 1, 2 y 3 que acepta cada tronco.", engineSurface: "diagnostic grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-option-one-only-overview", andrewsSection: "45.4", category: "option-one-only-overview", directiveEs: "Cuatro troncos permiten solo opcion 1; otra CNN solo coopera como poseedor suplementario.", engineSurface: "diagnostic option-one inventory frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-huan", andrewsSection: "45.4.1", category: "huan-company", directiveEs: "Huan expresa compania; ihuan en numerales no es conjuncion, y huan+yolqui puede lexicalizar parentesco.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-tloc", andrewsSection: "45.4.2", category: "tloc-proximity", directiveEs: "Tloc expresa lado/proximidad y puede aparecer como embed en agentivo preterito de posesion.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-pal", andrewsSection: "45.4.3", category: "pal-favor", directiveEs: "Pal expresa gracia/favor/cuenta/ayuda y su honorifico usa paltzinco.", engineSurface: "diagnostic option-one stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-ic-means-purpose-reason", andrewsSection: "45.4.4 a-c", category: "ic-means-purpose-reason", directiveEs: "Ic usa solo poseedor i-0 y expresa medio, proposito o razon segun estructura.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson45-ic-time", andrewsSection: "45.4.4.d", category: "ic-time", directiveEs: "Ic temporal puede preguntar cuando en posicion inicial, pierde fuerza interrogativa fuera de inicio y forma collocaciones como niman ic, ic cen y ayic.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson45-ic-special-uses", andrewsSection: "45.4.4.e", category: "ic-special-uses", directiveEs: "Ic crea ordinales, equivalentes adverbiales, grados y mediciones con CNN numerales o adjetivales.", engineSurface: "diagnostic ic frame", implementationState: "partial", redirectAction: "source-gated" }),
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
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
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
        "Translation prepositions, place labels, locative-temporal nominal rows, and ordinary NNC outputs remain false-positive evidence until Andrews relational source models plus the orthography bridge are available.",
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
            spellingAuthority: "Nawat/Pipil relational orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "orthography-bridge-plus-source-gate-required",
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
        diagnostics: ["relational-nnc-lesson-45-diagnostic-partial", "relational-nnc-source-gated"],
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
    Object.freeze({ id: "lesson46-option-two-only", andrewsSection: "46.1", category: "option-two-only-matrix-stems", directiveEs: "Once troncos relacionales solo ocurren como matrices integradas; no se deben tratar como sufijos.", engineSurface: "diagnostic option-two-only inventory", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-n-locative", andrewsSection: "46.2", category: "n-locative-matrix", directiveEs: "El tronco n de lugar forma compuestos locativos o temporales, casi siempre en CNN adverbializadas de segundo grado.", engineSurface: "diagnostic locative-n frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-n-ca-embed-overview", andrewsSection: "46.3", category: "ca-plus-n-locative", directiveEs: "La combinacion ca+n tiene dos formas: X-ca+n y X+ca-n; ambas deben mantenerse como arquitectura de matriz integrada.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-preterit-agentive-embed", andrewsSection: "46.3.1.a", category: "preterit-agentive-place", directiveEs: "El embed agentivo preterito produce lugar de quien hizo la accion; puede ser CNN normal, pero es mas frecuente como adverbializada.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-active-action-embed", andrewsSection: "46.3.1.b", category: "active-action-place", directiveEs: "El embed de accion activa produce lugar de la accion en CNN posesiva; el poseedor representa el agente.", engineSurface: "diagnostic ca-n embed frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-can-question", andrewsSection: "46.3.2.a", category: "can-interrogative-place", directiveEs: "Can pregunta por lugar solo en posicion interrogativa; can in contiene el adjunctor in y canin puede fusionarse por uso frecuente.", engineSurface: "diagnostic can frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-x-can-modifiers", andrewsSection: "46.3.2.b", category: "x-plus-can-modifier", directiveEs: "Con X presente, el embed puede ser pronominal, cuantitivo, numeral o patientivo; los estados siguen la fuente.", engineSurface: "diagnostic x-can frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-imperfect-embed-overview", andrewsSection: "46.4", category: "imperfect-predicate-place", directiveEs: "Un predicado imperfecto nominalizado llena el embed de n y significa lugar de actividad acostumbrada.", engineSurface: "diagnostic imperfect embed frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-active-imperfect-embed", andrewsSection: "46.4.1", category: "active-imperfect-place", directiveEs: "La fuente activa suele dar CNN posesiva; el poseedor viene del sujeto fuente y puede extenderse a tiempo o manera.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-passive-imperfect-embed", andrewsSection: "46.4.2", category: "passive-imperfect-place", directiveEs: "La fuente pasiva produce solo CNN posesiva, con poseedor derivado del sujeto fuente.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-impersonal-imperfect-embed", andrewsSection: "46.4.3", category: "impersonal-imperfect-place", directiveEs: "La fuente impersonal produce solo CNN absolutiva; no se asocia con individuo especifico.", engineSurface: "diagnostic source-voice frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-yan-locative", andrewsSection: "46.5", category: "yan-locative-perfective-core", directiveEs: "Yan toma nucleo perfectivo activo nominalizado; normalmente es posesivo, con casos absolutivos cuando hay particula o tronco adverbial incorporado.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-tlah-abundance", andrewsSection: "46.6", category: "tlah-abundance-place", directiveEs: "Tlah expresa lugar de abundancia o caracterizacion; admite absolutivo o posesivo y sujeto normal o adverbializado.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-co-c-location", andrewsSection: "46.7", category: "co-c-specific-location", directiveEs: "Co/c expresa ubicacion especifica; co sigue consonante, c sigue vocal, con excepcion de tleco.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-seeming-compound-matrix", andrewsSection: "46.8", category: "bodypart-co-c-warning", directiveEs: "Las secuencias tipo ixco o ijtic son embed+matriz, no preposiciones compuestas ni posposiciones.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson46-ca-interval", andrewsSection: "46.9", category: "ca-interval-distance", directiveEs: "Ca expresa intervalo o distancia; se distingue de achi ic aunque pueda escribirse achic.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-pa-directional", andrewsSection: "46.10", category: "pa-directional", directiveEs: "Pa direccional embebe particulas, troncos y compuestos relacionales; copa puede traducirse como medio, razon o con.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-pa-frequency", andrewsSection: "46.11", category: "pa-frequency", directiveEs: "Pa de frecuencia es homonimo de pa direccional y solo embebe cuantitivos o numerales.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-nal-far-bank", andrewsSection: "46.12.1", category: "nal-far-bank", directiveEs: "Nal embebe normalmente a-tl, puede formar CNN no adverbial y tambien incorporarse como adverbio.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-chi-direction", andrewsSection: "46.12.2", category: "chi-direction-toward", directiveEs: "Chi expresa direccion hacia; su embed favorito es tlal-li, con otros embeds raros.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-ic-downward", andrewsSection: "46.13", category: "ic-downward-direction", directiveEs: "Ic expresa direccion hacia abajo con troncos de partes del cuerpo y puede entrar como embed verbal compuesto.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-teuh-manner", andrewsSection: "46.14", category: "teuh-similarity-manner", directiveEs: "Teuh expresa semejanza o manera y crea CNN adverbializadas de modo.", engineSurface: "diagnostic matrix-stem frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson46-example-sentences", andrewsSection: "46.15", category: "sentence-use-inference", directiveEs: "Las preposiciones de traduccion se infieren por contexto; un numeral que modifica una CNN adverbializada co/c tambien debe adverbializarse.", engineSurface: "diagnostic example-sentence frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson46RelationalNncSubsectionInventory() {
    return LESSON46_RELATIONAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON46_RELATIONAL_NNC_VALIDATION_REFS),
    }));
}

function normalizeLesson46RouteStemToken(value = "") {
    return String(value == null ? "" : value)
        .trim()
        .replace(/^#+|#+$/g, "")
        .replace(/[()]/g, "")
        .replace(/\+/g, "-")
        .replace(/\s+/g, "")
        .replace(/^-+|-+$/g, "")
        .split("-")
        .filter((part) => part && part !== "0" && part !== "Ø" && part !== "□")
        .join("-");
}

function tokenizeLesson46RouteStemFormula(value = "") {
    return String(value == null ? "" : value)
        .trim()
        .replace(/^#+|#+$/g, "")
        .replace(/[()]/g, "")
        .replace(/\+/g, "-")
        .replace(/\s+/g, "")
        .replace(/^-+|-+$/g, "")
        .split("-")
        .filter((part) => part && part !== "Ø" && part !== "□");
}

function splitLesson46EmbeddedSourceStem(value = "") {
    const normalized = normalizeLesson46RouteStemToken(value);
    if (!normalized) {
        return {
            incorporatedNounStem: "",
            sourceVerb: "",
        };
    }
    const parts = normalized.split("-").filter(Boolean);
    if (parts.length < 2) {
        return {
            incorporatedNounStem: "",
            sourceVerb: normalized,
        };
    }
    return {
        incorporatedNounStem: parts.slice(0, -1).join("-"),
        sourceVerb: parts[parts.length - 1],
    };
}

function analyzeLesson46PreteritAgentiveLocativeSource({
    embeddedSource = "",
    sourceVerb = "",
    incorporatedNounStem = "",
} = {}) {
    const embeddedParts = tokenizeLesson46RouteStemFormula(embeddedSource);
    const embeddedIsPreteritAgentiveStem = embeddedParts.length >= 4
        && embeddedParts[embeddedParts.length - 2] === "0"
        && embeddedParts[embeddedParts.length - 1] === "ka";
    if (embeddedIsPreteritAgentiveStem) {
        const sourceVerbStem = embeddedParts[embeddedParts.length - 3];
        const incorporatedStemValue = embeddedParts.slice(0, -3).join("-");
        const sourceVncFormula = `(${incorporatedStemValue}-${sourceVerbStem})`;
        const preteritPredicateFormula = `(${incorporatedStemValue}-${sourceVerbStem}-0)`;
        const preteritAgentiveStemFormula = `(${incorporatedStemValue}-${sourceVerbStem}-0-ka)`;
        return {
            sourceVerbStem,
            incorporatedStemValue,
            visibleSourceFormula: preteritAgentiveStemFormula,
            sourceVncFormula,
            preteritPredicateFormula,
            preteritAgentiveStemFormula,
            finalRouteImmediateSourceFormula: preteritAgentiveStemFormula,
            sourceKind: "preterit-agentive-general-use-stem",
            visibleSourceKind: "preterit-agentive-general-use-stem",
            sourcePreparationRequired: false,
        };
    }
    const splitEmbeddedSource = splitLesson46EmbeddedSourceStem(embeddedSource);
    const sourceVerbStem = normalizeLesson46RouteStemToken(
        sourceVerb || (embeddedSource ? splitEmbeddedSource.sourceVerb : "")
    );
    const incorporatedStemValue = normalizeLesson46RouteStemToken(
        incorporatedNounStem || (embeddedSource ? splitEmbeddedSource.incorporatedNounStem : "")
    );
    const sourceVncFormula = incorporatedStemValue && sourceVerbStem
        ? `(${incorporatedStemValue}-${sourceVerbStem})`
        : "";
    const preteritPredicateFormula = incorporatedStemValue && sourceVerbStem
        ? `(${incorporatedStemValue}-${sourceVerbStem}-0)`
        : "";
    const preteritAgentiveStemFormula = incorporatedStemValue && sourceVerbStem
        ? `(${incorporatedStemValue}-${sourceVerbStem}-0-ka)`
        : "";
    return {
        sourceVerbStem,
        incorporatedStemValue,
        visibleSourceFormula: sourceVncFormula,
        sourceVncFormula,
        preteritPredicateFormula,
        preteritAgentiveStemFormula,
        finalRouteImmediateSourceFormula: preteritAgentiveStemFormula,
        sourceKind: "preterit-agentive-general-use-stem",
        visibleSourceKind: "source-vnc-core",
        sourcePreparationRequired: true,
    };
}

function normalizeLesson4631aSourceSlot(value = "") {
    return String(value == null ? "" : value)
        .trim()
        .replace(/^#+|#+$/g, "")
        .replace(/[()]/g, "")
        .replace(/\s+/g, "")
        .replace(/^-+|-+$/g, "");
}

function buildLesson4631aTargetSegmentFrames({
    incorporatedNounStem = "",
    sourceVerbStem = "",
} = {}) {
    return Object.freeze([
        Object.freeze({
            slot: "incorporated-nounstem",
            role: "embedded-source-nounstem",
            formulaValue: incorporatedNounStem,
            surface: incorporatedNounStem,
        }),
        Object.freeze({
            slot: "source-verbstem",
            role: "source-cnv-verbstem",
            formulaValue: sourceVerbStem,
            surface: sourceVerbStem,
        }),
        Object.freeze({
            slot: "preterit-zero",
            role: "preterit-predicate-zero",
            formulaValue: "0",
            surface: "",
        }),
        Object.freeze({
            slot: "preterit-agentive",
            role: "general-use-agentive-ka",
            formulaValue: "ka",
            surface: "ka",
        }),
        Object.freeze({
            slot: "locative-relational-n",
            role: "relational-matrix-n",
            formulaValue: "n",
            surface: "n",
        }),
        Object.freeze({
            slot: "adverbial-zero",
            role: "adverbialized-zero-connector",
            formulaValue: "0",
            surface: "",
        }),
    ]);
}

function buildLesson4631aFormulaSlots({
    predicateStem = "",
    formulaStem = "",
    surface = "",
} = {}) {
    return Object.freeze({
        pers1Pers2: Object.freeze({
            slot: "pers1-pers2",
            connector: "Ø",
            surface: "",
        }),
        predicateStem: Object.freeze({
            slot: "STEM",
            formula: `(${predicateStem})`,
            displayStem: `(${predicateStem})`,
            stem: `(${predicateStem})`,
            sourceFormula: formulaStem,
            state: "adverbialized-zero",
            stateLabel: "adverbializado -0-",
            surface,
        }),
        num1Num2: Object.freeze({
            slot: "num1-num2",
            connector: "Ø",
            displayConnector: "Ø",
            sourceFormula: "-0-",
            surface: "",
        }),
    });
}

function buildLesson4631aPreteritAgentiveLocativeSourceFrame({
    sourceFormulaSlots = null,
    sourceVerbStem = "",
    incorporatedNounStem = "",
    immediateSourceKind = "",
    sourcePreparationRequired = true,
    evidenceSource = "",
} = {}) {
    const slotSourceVerbStem = sourceFormulaSlots?.sourceVerbStem?.stem
        || sourceFormulaSlots?.sourceVerbStem?.surface
        || sourceFormulaSlots?.sourceVerbStem
        || sourceVerbStem;
    const slotIncorporatedNounStem = sourceFormulaSlots?.incorporatedNounStem?.stem
        || sourceFormulaSlots?.incorporatedNounStem?.surface
        || sourceFormulaSlots?.incorporatedNounStem
        || incorporatedNounStem;
    const normalizedSourceVerbStem = normalizeLesson4631aSourceSlot(slotSourceVerbStem);
    const normalizedIncorporatedNounStem = normalizeLesson4631aSourceSlot(slotIncorporatedNounStem);
    if (!normalizedSourceVerbStem || !normalizedIncorporatedNounStem) {
        return null;
    }
    const sourcePreparation = sourcePreparationRequired !== false;
    const visibleSourceKind = sourcePreparation
        ? "source-vnc-core"
        : "preterit-agentive-general-use-stem";
    const sourceKind = "preterit-agentive-general-use-stem";
    const sourceVncFormula = `(${normalizedIncorporatedNounStem}-${normalizedSourceVerbStem})`;
    const preteritPredicateFormula = `(${normalizedIncorporatedNounStem}-${normalizedSourceVerbStem}-0)`;
    const preteritAgentiveStemFormula = `(${normalizedIncorporatedNounStem}-${normalizedSourceVerbStem}-0-ka)`;
    const finalRouteImmediateSourceFormula = preteritAgentiveStemFormula;
    const visibleSourceFormula = sourcePreparation ? sourceVncFormula : preteritAgentiveStemFormula;
    const predicateStem = `${normalizedIncorporatedNounStem}-${normalizedSourceVerbStem}-0-ka-n`;
    const formulaStem = `(${predicateStem})-0-`;
    const formulaEcho = `#Ø-Ø(${predicateStem})Ø#`;
    const targetSegmentFrames = buildLesson4631aTargetSegmentFrames({
        incorporatedNounStem: normalizedIncorporatedNounStem,
        sourceVerbStem: normalizedSourceVerbStem,
    });
    const targetSurface = targetSegmentFrames.map((segment) => segment.surface).join("");
    const formulaSlots = buildLesson4631aFormulaSlots({
        predicateStem,
        formulaStem,
        surface: targetSurface,
    });
    const sourceSignature = [
        normalizedIncorporatedNounStem,
        normalizedSourceVerbStem,
        visibleSourceKind,
        finalRouteImmediateSourceFormula,
    ].join("|");
    const targetSignature = [
        predicateStem,
        formulaStem,
        formulaEcho,
        targetSurface,
    ].join("|");
    return Object.freeze({
        kind: "lesson-46-3-1-a-preterit-agentive-locative-source-frame",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        routeFamily: "relational-nnc",
        routeStage: "lesson-46-3-1-a-preterit-agentive-locative",
        sourceKind,
        visibleSourceKind,
        sourcePreparationRequired: sourcePreparation,
        sourceVerbStem: normalizedSourceVerbStem,
        incorporatedNounStem: normalizedIncorporatedNounStem,
        visibleSourceFormula,
        sourceVncFormula,
        preteritPredicateFormula,
        preteritAgentiveStemFormula,
        finalRouteImmediateSourceFormula,
        predicateStem,
        formulaStem,
        formulaEcho,
        formulaSlots,
        targetSegmentFrames,
        targetSurface,
        immediateSourceKind: immediateSourceKind || sourceKind,
        evidenceSource: String(evidenceSource || ""),
        sourceSignature,
        targetSignature,
        authority: "Andrews Lesson 46.3.1.a",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function buildLesson4631aPreteritAgentiveLocativeOperationFrame(sourceFrame = null) {
    if (
        !sourceFrame
        || sourceFrame.kind !== "lesson-46-3-1-a-preterit-agentive-locative-source-frame"
    ) {
        return null;
    }
    return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-46-3-1-a-preterit-agentive-locative-realization",
        routeFamily: "relational-nnc",
        routeStage: "execute-lesson-46-3-1-a-typed-operation-frame",
        operationApplied: "preterit-agentive-locative-n-plus-adverbial-zero",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature,
        targetSignature: sourceFrame.targetSignature,
        sourceKind: sourceFrame.sourceKind,
        visibleSourceKind: sourceFrame.visibleSourceKind,
        sourcePreparationRequired: sourceFrame.sourcePreparationRequired,
        sourceVerbStem: sourceFrame.sourceVerbStem,
        incorporatedNounStem: sourceFrame.incorporatedNounStem,
        finalRouteImmediateSourceFormula: sourceFrame.finalRouteImmediateSourceFormula,
        predicateStem: sourceFrame.predicateStem,
        formulaStem: sourceFrame.formulaStem,
        formulaEcho: sourceFrame.formulaEcho,
        formulaSlots: sourceFrame.formulaSlots,
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetSurface: sourceFrame.targetSurface,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getLesson4631aPreteritAgentiveLocativeFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (
        !sourceFrame
        || sourceFrame.kind !== "lesson-46-3-1-a-preterit-agentive-locative-source-frame"
    ) {
        return "source-frame-required";
    }
    if (
        !operationFrame
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== "andrews-46-3-1-a-preterit-agentive-locative-realization"
        || operationFrame.routeFamily !== "relational-nnc"
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceFrame.sourceSignature
        || operationFrame.sourceKind !== sourceFrame.sourceKind
        || operationFrame.visibleSourceKind !== sourceFrame.visibleSourceKind
        || operationFrame.sourcePreparationRequired !== sourceFrame.sourcePreparationRequired
        || operationFrame.sourceVerbStem !== sourceFrame.sourceVerbStem
        || operationFrame.incorporatedNounStem !== sourceFrame.incorporatedNounStem
        || operationFrame.finalRouteImmediateSourceFormula !== sourceFrame.finalRouteImmediateSourceFormula
    ) {
        return "contradictory-source-frame";
    }
    const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    const targetSurface = targetSegmentFrames.map((segment) => String(segment?.surface || "")).join("");
    if (
        operationFrame.targetSignature !== sourceFrame.targetSignature
        || operationFrame.predicateStem !== sourceFrame.predicateStem
        || operationFrame.formulaStem !== sourceFrame.formulaStem
        || operationFrame.formulaEcho !== sourceFrame.formulaEcho
        || operationFrame.formulaSlots !== sourceFrame.formulaSlots
        || targetSurface !== sourceFrame.targetSurface
        || operationFrame.targetSurface !== sourceFrame.targetSurface
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function flattenLesson46FormulaStemToSurface(formulaStem = "", options = {}) {
    const operationFrame = options && typeof options === "object"
        ? options.operationFrame
        : null;
    if (
        !operationFrame
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== "andrews-46-3-1-a-preterit-agentive-locative-realization"
    ) {
        return "";
    }
    const formulaText = String(formulaStem || "").trim();
    if (formulaText && formulaText !== String(operationFrame.formulaStem || "")) {
        return "";
    }
    return String(operationFrame.targetSurface || "");
}

function buildLesson463RouteFamilyGraph({
    sourceAnalysis = null,
    incorporatedNounStem = "",
    sourceVerbStem = "",
    predicateStem = "",
    formulaStem = "",
    formulaEcho = "",
    surface = "",
    operationFrame = null,
} = {}) {
    const normalizedSourceAnalysis = sourceAnalysis && typeof sourceAnalysis === "object"
        ? sourceAnalysis
        : {};
    const normalizedIncorporatedStem = normalizeLesson46RouteStemToken(
        incorporatedNounStem || normalizedSourceAnalysis.incorporatedStemValue || ""
    );
    const normalizedSourceVerbStem = normalizeLesson46RouteStemToken(
        sourceVerbStem || normalizedSourceAnalysis.sourceVerbStem || ""
    );
    const visibleSourceFormula = normalizedSourceAnalysis.visibleSourceFormula || (
        normalizedIncorporatedStem && normalizedSourceVerbStem
            ? `(${normalizedIncorporatedStem}-${normalizedSourceVerbStem})`
            : ""
    );
    const preteritPredicateFormula = normalizedSourceAnalysis.preteritPredicateFormula || (
        normalizedIncorporatedStem && normalizedSourceVerbStem
            ? `(${normalizedIncorporatedStem}-${normalizedSourceVerbStem}-0)`
            : ""
    );
    const preteritAgentiveStemFormula = normalizedSourceAnalysis.preteritAgentiveStemFormula
        || normalizedSourceAnalysis.finalRouteImmediateSourceFormula
        || (
            normalizedIncorporatedStem && normalizedSourceVerbStem
                ? `(${normalizedIncorporatedStem}-${normalizedSourceVerbStem}-0-ka)`
                : ""
        );
    const explicitPredicateStem = tokenizeLesson46RouteStemFormula(predicateStem).join("-");
    const normalizedPredicateStem = explicitPredicateStem || (
        normalizedIncorporatedStem && normalizedSourceVerbStem
            ? `${normalizedIncorporatedStem}-${normalizedSourceVerbStem}-0-ka-n`
            : ""
    );
    const locativeCompoundFormula = normalizedPredicateStem ? `(${normalizedPredicateStem})` : "";
    const adverbialFormulaStem = formulaStem
        || operationFrame?.formulaStem
        || (locativeCompoundFormula ? `${locativeCompoundFormula}-0-` : "");
    const adverbialFormulaEcho = formulaEcho || (normalizedPredicateStem ? `#Ø-Ø(${normalizedPredicateStem})Ø#` : "");
    const normalCnnFormula = normalizedPredicateStem
        ? `#pers1-pers2(${normalizedPredicateStem})num1-num2#`
        : "#pers1-pers2(STEM)num1-num2#";
    const normalizedSurface = surface || flattenLesson46FormulaStemToSurface(adverbialFormulaStem, { operationFrame });
    const nodes = [
        {
            id: "46.3",
            label: "46.3 ca+n locativo",
            unitKind: "route-family",
            andrewsSection: "46.3",
            formulaShapes: ["(X-ca)+(-n)-tli-", "(X)+(ca-n)-tli-"],
        },
        {
            id: "46.3.1",
            label: "(X-ca)+(-n)-tli-",
            unitKind: "route-pattern",
            andrewsSection: "46.3.1",
            childRouteIds: ["46.3.1.a", "46.3.1.b"],
        },
        {
            id: "46.3.1.a",
            label: "preterit-agentive embed",
            unitKind: "route-pattern",
            andrewsSection: "46.3.1.a",
            sourceRequirement: "general-use preterit-agentive nounstem",
            normalNonadverbialNncPossible: true,
            moreOftenAdverbialized: true,
        },
        {
            id: "source-cnv-core",
            label: "CNV origen",
            unitKind: normalizedSourceAnalysis.visibleSourceKind || "source-vnc-core",
            formula: visibleSourceFormula,
            reusableAsSource: true,
        },
        {
            id: "preterit-predicate",
            label: "predicado pretérito",
            unitKind: "vnc-predicate",
            formula: preteritPredicateFormula,
            reusableAsSource: true,
        },
        {
            id: "preterit-agentive-general-use-stem",
            label: "agentivo pretérito",
            unitKind: "vnc-derived-nnc-stem",
            formula: preteritAgentiveStemFormula,
            andrewsSection: "35.5",
            reusableAsSource: true,
        },
        {
            id: "locative-compound-nounstem",
            label: "relacional locativo nounstem",
            unitKind: "compound-nounstem",
            formula: locativeCompoundFormula,
            andrewsSection: "46.3.1.a",
            reusableAsSource: true,
            branchIds: ["normal-cnn", "adverbialized-cnn"],
        },
        {
            id: "normal-cnn-output",
            label: "CNN normal posible",
            unitKind: "nominal-nuclear-clause",
            formula: normalCnnFormula,
            selected: false,
            generationAllowed: false,
            blocker: "requires explicit subject and number connector selection",
        },
        {
            id: "adverbialized-cnn-output",
            label: "CNN adverbializada",
            unitKind: "adverbialized-nominal-nuclear-clause",
            formula: adverbialFormulaStem,
            formulaEcho: adverbialFormulaEcho,
            selected: true,
            generationAllowed: Boolean(normalizedSurface),
        },
        {
            id: "surface-output",
            label: "salida",
            unitKind: "surface",
            surface: normalizedSurface,
            selected: true,
        },
        {
            id: "46.3.1.b",
            label: "active-action embed",
            unitKind: "route-pattern",
            andrewsSection: "46.3.1.b",
            sourceRequirement: "active-action nounstem in possessive-state route",
            possessorRepresentsAgent: true,
            subjectAmbiguousNormalOrAdverbialized: true,
            generationAllowed: false,
            blocker: "not the selected 46.3.1.a route",
        },
        {
            id: "46.3.2.a",
            label: "X absent: can",
            unitKind: "route-pattern",
            andrewsSection: "46.3.2.a",
            sourceRequirement: "no X component",
            generationAllowed: false,
            blocker: "interrogative/place-adverb route not selected",
        },
        {
            id: "46.3.2.b",
            label: "X present + ca-n",
            unitKind: "route-pattern",
            andrewsSection: "46.3.2.b",
            sourceRequirement: "incorporated modifier X",
            generationAllowed: false,
            blocker: "modifier-plus-ca-n route not selected",
        },
    ];
    const edges = [
        {
            id: "select-46.3.1",
            label: "familia",
            sourceNodeId: "46.3",
            targetNodeId: "46.3.1",
            andrewsSection: "46.3.1",
        },
        {
            id: "select-46.3.1.a",
            label: "subruta",
            sourceNodeId: "46.3.1",
            targetNodeId: "46.3.1.a",
            andrewsSection: "46.3.1.a",
        },
        {
            id: "source-visible",
            label: "origen",
            sourceNodeId: "46.3.1.a",
            targetNodeId: "source-cnv-core",
            andrewsSection: "46.3.1.a",
        },
        {
            id: "build-preterit-predicate",
            label: "predicado pretérito",
            sourceNodeId: "source-cnv-core",
            targetNodeId: "preterit-predicate",
            formulaTransition: [visibleSourceFormula, preteritPredicateFormula].filter(Boolean).join(" -> "),
        },
        {
            id: "build-preterit-agentive-general-use-stem",
            label: "agentivo pretérito",
            sourceNodeId: "preterit-predicate",
            targetNodeId: "preterit-agentive-general-use-stem",
            andrewsSection: "35.5",
            formulaTransition: [preteritPredicateFormula, preteritAgentiveStemFormula].filter(Boolean).join(" -> "),
        },
        {
            id: "gate-46-3-1-a-immediate-source",
            label: "fuente inmediata",
            sourceNodeId: "46.3.1.a",
            targetNodeId: "preterit-agentive-general-use-stem",
            andrewsSection: "46.3.1.a",
        },
        {
            id: "add-locative-relational-n",
            label: "relacional locativo",
            sourceNodeId: "preterit-agentive-general-use-stem",
            targetNodeId: "locative-compound-nounstem",
            andrewsSection: "46.3.1.a",
            formulaTransition: [preteritAgentiveStemFormula, locativeCompoundFormula].filter(Boolean).join(" -> "),
        },
        {
            id: "adverbialize-zero-connector",
            label: "adverbial",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "adverbialized-cnn-output",
            andrewsSection: "46.3.1.a",
        },
        {
            id: "branch-normal-cnn",
            label: "CNN normal posible",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "normal-cnn-output",
            andrewsSection: "46.3.1.a",
            selected: false,
        },
        {
            id: "branch-adverbialized-cnn",
            label: "CNN adverbializada frecuente",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "adverbialized-cnn-output",
            andrewsSection: "46.3.1.a",
            selected: true,
        },
        {
            id: "realize-surface",
            label: "salida",
            sourceNodeId: "adverbialized-cnn-output",
            targetNodeId: "surface-output",
            selected: true,
        },
    ];
    const branches = [
        {
            id: "normal-cnn",
            label: "CNN normal posible",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "normal-cnn-output",
            formula: normalCnnFormula,
            selected: false,
            allowedByAndrews: true,
            generationAllowed: false,
            blocker: "requires explicit subject and number connector selection",
            branchAction: {
                actionKind: "select-route-branch-source",
                branchId: "normal-cnn",
                sourceNodeId: "locative-compound-nounstem",
                targetNodeId: "normal-cnn-output",
                sourceVerb: locativeCompoundFormula,
                sourceInput: locativeCompoundFormula,
                sourceInputDisplay: ["CNN normal posible", normalCnnFormula].filter(Boolean).join(": "),
                displaySurface: locativeCompoundFormula,
                generatedSurface: "",
                targetUnitKind: "nominal-nuclear-clause",
                targetFormula: normalCnnFormula,
                requiresExplicitSubjectNumber: true,
                generationAllowed: false,
                allowedByAndrews: true,
            },
        },
        {
            id: "adverbialized-cnn",
            label: "CNN adverbializada frecuente",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "adverbialized-cnn-output",
            formula: adverbialFormulaStem,
            formulaEcho: adverbialFormulaEcho,
            outputSurface: normalizedSurface,
            selected: true,
            allowedByAndrews: true,
            generationAllowed: Boolean(normalizedSurface),
            branchAction: {
                actionKind: "select-route-branch-source",
                branchId: "adverbialized-cnn",
                sourceNodeId: "locative-compound-nounstem",
                targetNodeId: "adverbialized-cnn-output",
                sourceVerb: locativeCompoundFormula,
                sourceInput: locativeCompoundFormula,
                sourceInputDisplay: ["CNN adverbializada frecuente", adverbialFormulaStem].filter(Boolean).join(": "),
                displaySurface: normalizedSurface || adverbialFormulaStem,
                generatedSurface: normalizedSurface,
                targetUnitKind: "adverbialized-nominal-nuclear-clause",
                targetFormula: adverbialFormulaStem,
                targetFormulaEcho: adverbialFormulaEcho,
                requiresExplicitSubjectNumber: false,
                generationAllowed: Boolean(normalizedSurface),
                allowedByAndrews: true,
            },
        },
    ];
    const ruleTrace = [
        {
            id: "if-source-cnv-then-preterit-predicate",
            label: "si fuente CNV",
            ifCondition: "source unit is CNV core with incorporated nounstem plus verbstem",
            thenOperation: "build preterit predicate layer",
            sourceGate: "source-vnc-core",
            sourceNodeId: "source-cnv-core",
            targetNodeId: "preterit-predicate",
            inputFormula: visibleSourceFormula,
            outputFormula: preteritPredicateFormula,
            selected: normalizedSourceAnalysis.sourcePreparationRequired !== false,
        },
        {
            id: "if-preterit-predicate-then-agentive-ka",
            label: "si predicado preterito",
            ifCondition: "source has preterit predicate layer",
            thenOperation: "derive general-use preterit-agentive stem with -ka",
            sourceGate: "vnc-predicate",
            sourceNodeId: "preterit-predicate",
            targetNodeId: "preterit-agentive-general-use-stem",
            inputFormula: preteritPredicateFormula,
            outputFormula: preteritAgentiveStemFormula,
            andrewsSection: "35.5",
            selected: normalizedSourceAnalysis.sourcePreparationRequired !== false,
        },
        {
            id: "if-preterit-agentive-then-locative-n",
            label: "si agentivo preterito",
            ifCondition: "immediate source is a general-use preterit-agentive stem",
            thenOperation: "add locative relational -n",
            sourceGate: "preterit-agentive-general-use-stem",
            sourceNodeId: "preterit-agentive-general-use-stem",
            targetNodeId: "locative-compound-nounstem",
            inputFormula: preteritAgentiveStemFormula,
            outputFormula: locativeCompoundFormula,
            andrewsSection: "46.3.1.a",
            selected: true,
        },
        {
            id: "if-locative-nounstem-then-normal-cnn-branch",
            label: "si rama CNN normal",
            ifCondition: "locative compound nounstem is used as a normal CNN predicate stem",
            thenOperation: "require explicit subject and number connectors",
            sourceGate: "compound-nounstem",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "normal-cnn-output",
            inputFormula: locativeCompoundFormula,
            outputFormula: normalCnnFormula,
            andrewsSection: "46.3.1.a",
            selected: false,
            generationAllowed: false,
            blocker: "requires explicit subject and number connector selection",
        },
        {
            id: "if-locative-nounstem-then-adverbial-zero",
            label: "si rama adverbial",
            ifCondition: "locative compound nounstem is used adverbially",
            thenOperation: "add zero connector/adverbializer -0-",
            sourceGate: "compound-nounstem",
            sourceNodeId: "locative-compound-nounstem",
            targetNodeId: "adverbialized-cnn-output",
            inputFormula: locativeCompoundFormula,
            outputFormula: adverbialFormulaStem,
            andrewsSection: "46.3.1.a",
            selected: true,
            generationAllowed: Boolean(normalizedSurface),
        },
        {
            id: "if-adverbial-formula-then-surface",
            label: "si formula adverbial",
            ifCondition: "adverbialized CNN formula is complete",
            thenOperation: "realize the Nawat-letter surface",
            sourceGate: "adverbialized-nominal-nuclear-clause",
            sourceNodeId: "adverbialized-cnn-output",
            targetNodeId: "surface-output",
            inputFormula: adverbialFormulaStem,
            outputSurface: normalizedSurface,
            selected: true,
            generationAllowed: Boolean(normalizedSurface),
        },
    ];

    return {
        kind: "andrews-route-family-graph",
        familyId: "andrews-46.3-ca-n-locative",
        andrewsSection: "46.3",
        structuralSource: "Andrews Lesson 46.3",
        graphSourceOfTruth: true,
        lessonAsEvidenceIndex: true,
        selectedRouteId: "46.3.1.a",
        selectedBranchId: "adverbialized-cnn",
        nodes,
        edges,
        branches,
        ruleTrace,
        invariants: {
            finalSurfaceIsNotSource: true,
            selectedOutputIsNotWholeRouteFamily: true,
            intermediateNodesReusableAsSources: true,
            unselectedAndrewsBranchesRemainRepresented: true,
            currentConjugatorRowsAreRenderersOnly: true,
        },
    };
}

function buildLesson46PreteritAgentiveLocativeNncFromSource({
    source = "",
    sourceFormula = "",
    embeddedSource = "",
    embeddedSourceStem = "",
    sourceVerb = "",
    sourceVerbstem = "",
    sourceStem = "",
    verbStem = "",
    incorporatedNounStem = "",
    incorporatedStem = "",
    embeddedNounStem = "",
    evidenceSource = "",
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const sourceInput = String(
        source
        || sourceFormula
        || embeddedSource
        || embeddedSourceStem
        || sourceVerb
        || sourceVerbstem
        || sourceStem
        || verbStem
        || incorporatedNounStem
        || incorporatedStem
        || embeddedNounStem
        || ""
    );
    const mismatch = getLesson4631aPreteritAgentiveLocativeFrameMismatch({
        sourceFrame,
        operationFrame,
    });
    const sourceVerbStem = String(sourceFrame?.sourceVerbStem || "");
    const incorporatedStemValue = String(sourceFrame?.incorporatedNounStem || "");
    const baseRecord = {
        kind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        andrewsSection: "46.3.1.a",
        structuralSource: "Andrews Lesson 46.3.1.a",
        targetAuthority: "Andrews route source frame plus typed operation frame",
        sourceInput,
        sourceVerb: sourceVerbStem,
        sourceKind: sourceFrame?.sourceKind || "",
        visibleSourceKind: sourceFrame?.visibleSourceKind || "",
        sourcePreparationRequired: sourceFrame?.sourcePreparationRequired === true,
        incorporatedNounStem: incorporatedStemValue,
        relationalStem: "n",
        relationalKind: RELATIONAL_NNC_KIND.locative,
        relationalOption: RELATIONAL_NNC_OPTION.optionTwo,
        optionGroup: RELATIONAL_NNC_OPTION_GROUP.optionTwoOnly,
        sourceState: RELATIONAL_NNC_SOURCE_STATE.absolutive,
        predicateState: "adverbialized-zero",
        predicateStateLabel: "adverbializado -0-",
        sourceVoice: RELATIONAL_NNC_SOURCE_VOICE.active,
        sourceFormation: "general-use preterit-agentive nounstem",
        formulaShape: "(X-ka)+(-n)-0",
        evidenceSource: String(evidenceSource || "user-provided Nawat-letter target").trim(),
    };

    if (mismatch) {
        const diagnosticByMismatch = {
            "source-frame-required": "lesson-46-3-1-a-source-frame-required",
            "operation-frame-required": "lesson-46-3-1-a-operation-frame-required",
            "contradictory-source-frame": "lesson-46-3-1-a-contradictory-source-frame",
            "contradictory-target-frame": "lesson-46-3-1-a-contradictory-target-frame",
        };
        const diagnostics = [diagnosticByMismatch[mismatch] || "lesson-46-3-1-a-typed-frame-required"];
        return attachRelationalNncGrammarContract({
            ...baseRecord,
            supported: false,
            generationAllowed: false,
            result: "—",
            surfaceForms: [],
            diagnostics,
        }, {
            metadataKind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
            unitKind: "relational-nnc",
            routeStage: "generate-lesson-46-3-1-a-blocked",
            structuralSource: "Andrews Lesson 46.3.1.a",
            andrewsRefs: ["Andrews Lesson 46.3.1.a"],
            generationAllowed: false,
            supported: false,
            sourceInput,
            orthographyFrame: {
                spellingAuthority: "user-provided Nawat/Pipil letters",
                noClassicalSurfaceImport: true,
                orthographyStatus: "blocked-missing-source-slot",
            },
            morphBoundaryFrame: {
                caNEmbedFrame: cloneRelationalNncLessonRecord(LESSON46_CA_N_EMBED_FRAME),
                sourcePattern: "preterit-agentive-embed",
            },
            stemFrame: {
                stemKind: "relational-nnc-derived-stem",
                sourceStem: sourceVerbStem,
                embeddedStem: incorporatedStemValue,
                immediateSourceStem: sourceFrame?.finalRouteImmediateSourceFormula || "",
                matrixStem: "n",
                sourceFormation: "general-use preterit-agentive nounstem",
            },
            nuclearClauseFrame: {
                clauseKind: "nominal-nuclear-clause",
                sourceClauseKind: "preterit-agentive general-use stem feeding relational NNC",
                state: "absolutive",
                tenseSlotPresent: false,
            },
            targetContract: {
                metadataKind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
                generationAllowed: false,
                missingSourceSlots: mismatch === "source-frame-required" ? diagnostics : [],
                missingOperationFrame: mismatch === "operation-frame-required",
                contradictoryFrame: mismatch === "contradictory-source-frame" || mismatch === "contradictory-target-frame",
            },
            diagnostics,
        });
    }

    const sourceAnalysis = {
        sourceVerbStem,
        incorporatedStemValue,
        visibleSourceFormula: sourceFrame.visibleSourceFormula,
        sourceVncFormula: sourceFrame.sourceVncFormula,
        preteritPredicateFormula: sourceFrame.preteritPredicateFormula,
        preteritAgentiveStemFormula: sourceFrame.preteritAgentiveStemFormula,
        finalRouteImmediateSourceFormula: sourceFrame.finalRouteImmediateSourceFormula,
        sourceKind: sourceFrame.sourceKind,
        visibleSourceKind: sourceFrame.visibleSourceKind,
        sourcePreparationRequired: sourceFrame.sourcePreparationRequired,
    };
    const embeddedStem = `${incorporatedStemValue}-${sourceVerbStem}`;
    const predicateStem = operationFrame.predicateStem;
    const formulaStem = operationFrame.formulaStem;
    const surface = operationFrame.targetSurface;
    const formulaEcho = operationFrame.formulaEcho;
    const routeFamilyGraph = buildLesson463RouteFamilyGraph({
        sourceAnalysis,
        incorporatedNounStem: incorporatedStemValue,
        sourceVerbStem,
        predicateStem,
        formulaStem,
        formulaEcho,
        surface,
        operationFrame,
    });
    const routeRuleTrace = Array.isArray(routeFamilyGraph.ruleTrace)
        ? routeFamilyGraph.ruleTrace
        : [];
    const routeSteps = [
        {
            id: "source-visible",
            layerLabel: "origen",
            requirement: sourceAnalysis.sourcePreparationRequired
                ? "CNV fuente licenciada para incrustación agentiva pretérita"
                : "tronco agentivo pretérito de uso general",
            sourceUnit: sourceAnalysis.visibleSourceKind,
            formula: sourceAnalysis.visibleSourceFormula,
        },
        ...(sourceAnalysis.sourcePreparationRequired ? [
            {
                id: "build-preterit-predicate",
                layerLabel: "predicado pretérito",
                operation: "formar capa predicativa pretérita/cero",
                sourceUnit: "vnc-predicate",
                inputFormula: sourceAnalysis.sourceVncFormula,
                outputFormula: sourceAnalysis.preteritPredicateFormula,
            },
            {
                id: "build-preterit-agentive-general-use-stem",
                layerLabel: "agentivo pretérito",
                operation: "reanálisis con agentivo pretérito de uso general -ka",
                sourceUnit: "vnc-derived-nnc-stem",
                inputFormula: sourceAnalysis.preteritPredicateFormula,
                outputFormula: sourceAnalysis.preteritAgentiveStemFormula,
                andrewsSection: "35.5",
            },
        ] : []),
        {
            id: "gate-46-3-1-a-immediate-source",
            layerLabel: "fuente inmediata",
            requirement: "tronco agentivo pretérito de uso general",
            sourceUnit: "preterit-agentive-general-use-stem",
            formula: sourceAnalysis.finalRouteImmediateSourceFormula,
            andrewsSection: "46.3.1.a",
        },
        {
            id: "add-locative-relational-n",
            layerLabel: "relacional locativo",
            operation: "añadir relacional locativo -n",
            sourceUnit: "relational-nnc-stem",
            inputFormula: sourceAnalysis.finalRouteImmediateSourceFormula,
            outputFormula: `(${predicateStem})`,
            andrewsSection: "46.3.1.a",
        },
        {
            id: "adverbialize-zero-connector",
            layerLabel: "adverbial",
            operation: "adverbializar con conector cero -0-",
            sourceUnit: "adverbialized-relational-nnc",
            inputFormula: `(${predicateStem})`,
            outputFormula: formulaStem,
            andrewsSection: "46.3.1.a",
        },
        {
            id: "realize-surface",
            layerLabel: "salida",
            operation: "realizar superficie con letras Nawat",
            inputFormula: formulaStem,
            outputSurface: surface,
        },
    ];
    const formulaSlots = operationFrame.formulaSlots;
    const record = {
        ...baseRecord,
        embeddedStem,
        predicateStem,
        formulaStem,
        formulaSlots,
        sourceFrame,
        operationFrame,
        formulaEcho,
        surface,
        result: surface,
        surfaceForms: [surface],
        supported: true,
        generationAllowed: true,
        routeStage: "generate-lesson-46-3-1-a",
        routeContract: {
            sourceUnitKind: "preterit-agentive-general-use-stem",
            visibleSourceUnitKind: sourceAnalysis.visibleSourceKind,
            targetUnitKind: "relational-nnc",
            sourceWasFinishedSurface: false,
            sourcePreparationRequired: sourceAnalysis.sourcePreparationRequired,
            immediateSourceFormula: sourceAnalysis.finalRouteImmediateSourceFormula,
            routeSteps,
            ruleTrace: routeRuleTrace,
            routeFamilyGraph,
            derivesFromSourceVerb: true,
            newWordGenerationAllowed: true,
        },
        routeFamilyGraph,
        ruleTrace: routeRuleTrace,
        diagnostics: [
            "lesson-46-3-1-a-source-route-generated",
            "lesson-46-3-1-a-typed-operation-realization",
        ],
    };

    return attachRelationalNncGrammarContract(record, {
        metadataKind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
        unitKind: "relational-nnc",
        routeStage: "generate-lesson-46-3-1-a",
        structuralSource: "Andrews Lesson 46.3.1.a",
        andrewsRefs: ["Andrews Lesson 46.3.1.a"],
        generationAllowed: true,
        supported: true,
        sourceInput,
        surface,
        surfaceForms: [surface],
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            surface,
            surfaceForms: [surface],
            orthographyStatus: "typed-segment-frame-realization",
        },
        morphBoundaryFrame: {
            caNEmbedFrame: cloneRelationalNncLessonRecord(LESSON46_CA_N_EMBED_FRAME),
            sourcePattern: "preterit-agentive-embed",
            formulaStem,
            formulaSlots,
            formulaEcho,
            formulaShape: "(X-ka)+(-n)-0",
        },
        stemFrame: {
            stemKind: "relational-nnc-derived-stem",
            sourceStem: sourceVerbStem,
            embeddedStem,
            immediateSourceStem: sourceAnalysis.finalRouteImmediateSourceFormula,
            predicateStem,
            matrixStem: "n",
            sourceFormation: "general-use preterit-agentive nounstem",
        },
        nuclearClauseFrame: {
            clauseKind: "nominal-nuclear-clause",
            sourceClauseKind: "preterit-agentive general-use stem feeding relational NNC",
            state: "absolutive",
            tenseSlotPresent: false,
            formula: "#pers1-pers2(STEM)num1-num2#",
            formulaEcho,
            formulaSlots,
        },
        participantFrame: {
            incorporatedObjectStem: incorporatedStemValue,
            sourceVerb: sourceVerbStem,
            relationalMeaning: "place of a person or thing that has done the source action",
        },
        sourceContract: {
            sourceInput,
            sourceVerb: sourceVerbStem,
            incorporatedNounStem: incorporatedStemValue,
            visibleSourceKind: sourceAnalysis.visibleSourceKind,
            immediateSourceKind: "preterit-agentive-general-use-stem",
            immediateSourceFormula: sourceAnalysis.finalRouteImmediateSourceFormula,
            sourcePreparationRequired: sourceAnalysis.sourcePreparationRequired,
            sourceWasFinishedSurface: false,
            sourceFrameKind: sourceFrame.kind,
        },
        targetContract: {
            metadataKind: "lesson-46-3-1-a-preterit-agentive-locative-nnc",
            generationAllowed: true,
            formulaStem,
            surface,
            operationId: operationFrame.operationId,
            routeSteps,
            ruleTrace: routeRuleTrace,
            routeFamilyGraph,
        },
        diagnostics: record.diagnostics,
    });
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
        "Current Lesson 46 support records Andrews' option-two-only relational NNC architecture as diagnostics; only the scoped 46.3.1.a preterit-agentive locative source route is currently generative.",
        "All Classical examples and stem spellings remain structural references only; this scoped route uses user-provided Nawat/Pipil letter realization and does not license the full relational inventory.",
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
                correction: "Lesson 46 now records Andrews relational NNC part-two architecture across the eleven option-two-only matrix stems, locative n formations, ca+n embeds, imperfect/perfective source-state rules, co/c body-part warnings, directional/frequency pa split, and sentence-context inference while keeping general relational generation blocked.",
                andrewsRefs: Array.from(LESSON46_RELATIONAL_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON46_RELATIONAL_NNC_VALIDATION_REFS),
            },
            {
                id: "lesson-46-3-1-a-preterit-agentive-locative-source-route",
                result: "hit",
                correction: "A scoped Andrews 46.3.1.a route can now derive the user-provided Nawat-letter target from source -(namaka) plus incorporated mich as (mich-namaka-0-ka-n)-0- -> michnamakakan.",
                andrewsRefs: ["Andrews Lesson 46.3.1.a"],
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
            scopedLesson4631aPreteritAgentiveLocativeSourceRouteImplemented: true,
            scopedLesson4631aPreteritAgentiveLocativeGenerationAllowed: true,
            fullLesson46GenerationImplemented: false,
        },
        hitCount: 2,
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
            spellingAuthority: "Nawat/Pipil relational orthography bridge",
            noClassicalSurfaceImport: true,
            slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
            orthographyStatus: "orthography-bridge-plus-source-gate-required",
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
        diagnostics: ["relational-nnc-lesson-46-diagnostic-partial", "relational-nnc-source-gated"],
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
    Object.freeze({ id: "lesson47-tzalan", andrewsSection: "47.1.1", category: "tzalan-between-amid", directiveEs: "Tzalan expresa area entre o en medio; admite CNN posesiva simple y matriz integrada, incluso CNN no adverbial cuando el significado lo permite.", engineSurface: "diagnostic options-one-two frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-huic", andrewsSection: "47.1.2", category: "huic-direction", directiveEs: "Huic expresa direccion; puede combinarse con otros troncos locativos/direccionales y tambien con pa o copa.", engineSurface: "diagnostic options-one-two frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-options-one-three", andrewsSection: "47.2", category: "options-one-three-group", directiveEs: "Dos troncos aceptan opcion 1 y opcion 3; el conectivo t debe quedar como arquitectura relacional, no como superficie generada sin evidencia.", engineSurface: "diagnostic relational grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-ca-means", andrewsSection: "47.2.1", category: "ca-means", directiveEs: "Ca expresa medio; tambien forma compuestos temporales y usos contextuales que la traduccion puede rendir como con, por o acerca de.", engineSurface: "diagnostic options-one-three frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-icpac", andrewsSection: "47.2.2", category: "icpac-top-location", directiveEs: "Icpac es una matriz compuesta de ubicacion superior; actua como ca en opcion 1/3 y no embebe otro tronco por estructura integrada.", engineSurface: "diagnostic options-one-three frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-options-one-two-three", andrewsSection: "47.3", category: "options-one-two-three-group", directiveEs: "Tres troncos aceptan opciones 1, 2 y 3; las diferencias de posicion simple, integrada y con conectivo t deben permanecer visibles en metadata.", engineSurface: "diagnostic relational grouping frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-tech", andrewsSection: "47.3.1", category: "tech-contact", directiveEs: "Tech expresa contacto o superficie lateral; puede aparecer como simple posesivo, matriz integrada, matriz con conectivo t, o embed de pa/copa.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-tlan", andrewsSection: "47.3.2", category: "tlan-bottom-adjacent", directiveEs: "Tlan expresa superficie inferior, ubicacion baja o adyacencia; ixtlan y tzintlan precisan partes del cuerpo y tlan puede embebarse en pa.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-pan", andrewsSection: "47.3.3", category: "pan-surface-time", directiveEs: "Pan expresa superficie superior, lugar o tiempo; pampa extiende direccion a apoyo/razon e ipan puede conectar grupos numerales.", engineSurface: "diagnostic options-one-two-three frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-associated-entity", andrewsSection: "47.4", category: "associated-entity-nnc", directiveEs: "Un compuesto relacional puede embebarse en ca-tl para nombrar una entidad asociada; no se debe confundir automaticamente con gentilicio.", engineSurface: "diagnostic associated-entity frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-associated-entity-co-c", andrewsSection: "47.4 co/c replacement", category: "associated-entity-co-c-silent", directiveEs: "Cuando co/c entra en ca-tl, la matriz co/c se reemplaza por variante silenciosa.", engineSurface: "diagnostic associated-entity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson47-pertinency-overview", andrewsSection: "47.5", category: "pertinency-nnc", directiveEs: "Yo-tl crea pertinencia sobre compuestos relacionales; la traduccion puede ocultar la complejidad morfologica.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-pertinency-direct", andrewsSection: "47.5.1", category: "direct-pertinency", directiveEs: "Yo-tl puede embeder directamente el tronco de una CNN adverbializada; el poseedor interno no cambia el estado absolutivo.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson47-pertinency-associated-entity", andrewsSection: "47.5.2", category: "associated-entity-pertinency", directiveEs: "Yo-tl tambien puede embeder un tronco de entidad asociada en ca-tl para expresar pertinencia.", engineSurface: "diagnostic pertinency frame", implementationState: "partial", redirectAction: "source-gated" }),
]);

function getLesson47RelationalNncSubsectionInventory() {
    return LESSON47_RELATIONAL_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
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
        "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require Andrews source models plus the orthography bridge before generating visible output.",
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
            spellingAuthority: "Nawat/Pipil relational orthography bridge",
            noClassicalSurfaceImport: true,
            slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
            orthographyStatus: "orthography-bridge-plus-source-gate-required",
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
        diagnostics: ["relational-nnc-lesson-47-diagnostic-partial", "relational-nnc-source-gated"],
    });
}

function buildRelationalNncBoundaryMetadata() {
    const boundary = {
        kind: "relational-nnc-boundary",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        lessons: [45, 46, 47],
        status: "partial",
        structuralSource: "Andrews Lessons 45-47",
        targetAuthority: "Andrews relational NNC rules with Nawat/Pipil orthographic realization",
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
    sourceGate = "",
    structuredSource = false,
    falsePositiveSource = "",
    sourceKind = "",
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const normalizedKind = normalizeRelationalNncKind(relationalKind);
    const normalizedOption = normalizeRelationalNncOption(relationalOption);
    const normalizedFalsePositive = normalizeRelationalNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
    const requiresTypedOperation = (
        normalizedKind !== RELATIONAL_NNC_KIND.unknown
        && normalizedOption !== RELATIONAL_NNC_OPTION.unknown
        && normalizedFalsePositive === RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
    const blockedDiagnostic = requiresTypedOperation
        ? getRelationalNncBlockedDiagnostic({ sourceFrame: resolvedSourceFrame, operationFrame })
        : "";
    const sourceSurface = blockedDiagnostic ? "" : String(operationFrame?.targetSurface || "");
    const canGenerate = Boolean(
        sourceSurface
        && !blockedDiagnostic
        && normalizedKind !== RELATIONAL_NNC_KIND.unknown
        && normalizedOption !== RELATIONAL_NNC_OPTION.unknown
        && normalizedFalsePositive === RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
    const targetFormulaSlots = canGenerate ? operationFrame.targetFormulaSlots : null;
    const targetSegmentFrames = canGenerate && Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    const classification = {
        kind: "relational-nnc-candidate-classification",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        relationalStem: String(relationalStem || ""),
        relationalKind: normalizedKind,
        relationalOption: normalizedOption,
        governedArgument: String(governedArgument || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        ...(resolvedSourceFrame ? { sourceFrame: resolvedSourceFrame } : {}),
        ...(operationFrame ? { operationFrame } : {}),
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        ...(canGenerate ? {
            formulaSlots: targetFormulaSlots,
            targetSegmentFrames,
        } : {}),
        diagnostics: [
            canGenerate ? "relational-nnc-andrews-source-generated" : (
                blockedDiagnostic || (hasEvidence ? "relational-nnc-needs-validation" : "relational-nnc-source-gate-required")
            ),
            normalizedKind !== RELATIONAL_NNC_KIND.unknown
                ? "relational-nnc-kind-recognized"
                : "relational-nnc-kind-unconfirmed",
            normalizedFalsePositive !== RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "relational-nnc-false-positive-source"
                : (canGenerate ? "relational-nnc-structured-source" : "relational-nnc-unconfirmed"),
        ],
        boundary: buildRelationalNncBoundaryMetadata(),
    };
    return attachRelationalNncGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-relational-nnc" : "classify-boundary",
        sourceInput: classification.candidate || classification.relationalStem,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: canGenerate ? "orthography-bridge-realized" : "orthography-bridge-required",
            surface: classification.surface,
            surfaceForms: classification.surfaceForms,
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "relational-nounstem-candidate",
            sourceStem: classification.relationalStem,
            useStatus: classification.relationalOption,
            sourceGate: resolvedSourceFrame?.sourceGate || classification.sourceGate,
            targetStem: classification.surface,
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        },
        nuclearClauseFrame: canGenerate ? {
            formulaFamily: "relational NNC",
            relationalKind: normalizedKind,
            relationalOption: normalizedOption,
            governedArgument: classification.governedArgument,
            formulaSlots: targetFormulaSlots,
            targetSegmentFrames,
        } : null,
        targetContract: {
            metadataKind: "relational-nnc-candidate-classification",
            generationAllowed: canGenerate,
            consumesRenderedInput: false,
            displayStringsAuthorizeGrammar: false,
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
        targetAuthority: "Andrews source model plus orthography-bridge user-provided forms",
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
            warning: "preposition and conjunction labels are translation-only unless orthography-bridge morphology is sourced",
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
