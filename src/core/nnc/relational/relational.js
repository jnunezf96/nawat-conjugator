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

function buildRelationalNncBoundaryMetadata() {
    return {
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
    return {
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
}

function classifyRelationalNncFalsePositive(source = "") {
    const normalizedSource = normalizeRelationalNncFalsePositiveSource(source);
    return {
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

    return {
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
}
