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
