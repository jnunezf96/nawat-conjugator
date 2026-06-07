// core/nnc/adjectival/adjectival.js
// Lessons 40-41 adjectival NNC function boundary metadata. This keeps current
// adjetivo generated surfaces and predicate-function labels separate from
// confirmed adjectival NNC paradigms or clause-level modification ASTs.

"use strict";

const ADJECTIVAL_NNC_BOUNDARY_VERSION = 1;

const ADJECTIVAL_NNC_FUNCTION = Object.freeze({
    predicateFunction: "predicate-function",
    patientiveAdjectival: "patientive-adjectival",
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
    "adjectival NNC function boundary metadata is not generation",
    "adjetivo route output is a generated surface, not complete Lessons 40-41 coverage",
    "nominalizationProfile adjectivalFunction is explanatory metadata, not modifier/head syntax",
    "Lessons 40-41 adjectival function is separate from Lessons 42-43 modification AST",
    "single generated words do not prove adjectival modification, supplementation, or topic relations",
    "Andrews adjectival categories are architecture, not Nawat/Pipil form authority",
]);

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
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdjectivalNncStructuralQuestions(),
        boundaries: {
            hasAdjectiveModeOutputs: true,
            hasNominalizationProfileAdjectivalFunction: true,
            hasAdjectivalNncGeneration: false,
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
