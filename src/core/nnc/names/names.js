// core/nnc/names/names.js
// Lesson 56 personal-name NNC boundary metadata. This keeps ordinary NNC,
// place/gentilic, adjunction, and conjunction metadata separate from confirmed
// personal-name NNC generation until Nawat/Pipil evidence supports it.

"use strict";

const PERSONAL_NAME_NNC_BOUNDARY_VERSION = 1;

const PERSONAL_NAME_NNC_KIND = Object.freeze({
    personalNameNnc: "personal-name-nnc",
    singleClauseName: "single-clause-name",
    adjunctionDerivedName: "adjunction-derived-name",
    conjunctionDerivedName: "conjunction-derived-name",
    calendarName: "calendar-name",
    unknown: "unknown",
});

const PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    pronounLabel: "pronoun-label",
    capitalizationLabel: "capitalization-label",
    placeGentilicBoundary: "place-gentilic-boundary",
    adverbialAdjunctionBoundary: "adverbial-adjunction-boundary",
    conjunctionBoundary: "conjunction-boundary",
    calendarRoadmapText: "calendar-roadmap-text",
    properNameTranslation: "proper-name-translation",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "personal-name NNC boundary metadata is not generation",
    "ordinary NNC fixtures or open-stem previews are not personal-name fixture evidence",
    "capitalization labels and proper-name translations are not Nawat/Pipil name evidence",
    "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence",
    "calendar roadmap text is not personal-name NNC data",
    "Andrews personal-name categories are architecture, not Nawat/Pipil form authority",
]);

const PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "nameSource",
        asks: "Which Nawat/Pipil personal-name NNC form is evidenced?",
    }),
    Object.freeze({
        field: "sourceClauseType",
        asks: "Is the name sourced from a single clause, adjunction, conjunction, calendar naming, or unknown?",
    }),
    Object.freeze({
        field: "clauseSource",
        asks: "Which Nawat/Pipil clause source supports the name?",
    }),
    Object.freeze({
        field: "adjunctionSource",
        asks: "Which adjoined-unit source supports the name, if any?",
    }),
    Object.freeze({
        field: "conjunctionSource",
        asks: "Which conjunction source supports the name, if any?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports personal-name status?",
    }),
]);

function normalizePersonalNameNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePersonalNameNncKind(value = "") {
    return normalizePersonalNameNncEnum(
        value,
        Object.values(PERSONAL_NAME_NNC_KIND),
        PERSONAL_NAME_NNC_KIND.unknown
    );
}

function normalizePersonalNameNncFalsePositiveSource(value = "") {
    return normalizePersonalNameNncEnum(
        value,
        Object.values(PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE),
        PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getPersonalNameNncAntiConflationRules() {
    return Array.from(PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES);
}

function getPersonalNameNncStructuralQuestions() {
    return PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildPersonalNameNncBoundaryMetadata() {
    return {
        kind: "personal-name-nnc-boundary",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        lesson: 56,
        appendices: ["E"],
        status: "partial",
        structuralSource: "Andrews Lesson 56 and Appendix E",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPersonalNameNncStructuralQuestions(),
        boundaries: {
            hasOrdinaryNncGeneration: true,
            hasPlaceGentilicBoundary: true,
            hasAdverbialAdjunctionBoundary: true,
            hasConjunctionBoundary: true,
            hasPersonalNameNncGeneration: false,
            hasCalendarNameGeneration: false,
            hasStaticNameData: false,
            hasConfirmedFixtureData: false,
            changesOrdinaryNncGeneration: false,
            changesPlaceGentilicGeneration: false,
            changesAdjunctionBehavior: false,
            changesConjunctionBehavior: false,
            treatsCapitalizationAsNameEvidence: false,
            treatsTranslationsAsNameEvidence: false,
        },
        antiConflationRules: getPersonalNameNncAntiConflationRules(),
    };
}

function classifyPersonalNameNncCandidate({
    candidate = "",
    nameSource = "",
    personalNameKind = "",
    sourceClauseType = "",
    clauseSource = "",
    adjunctionSource = "",
    conjunctionSource = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedKind = normalizePersonalNameNncKind(personalNameKind || sourceClauseType);
    const normalizedFalsePositive = normalizePersonalNameNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "personal-name-nnc-candidate-classification",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        nameSource: String(nameSource || ""),
        personalNameKind: normalizedKind,
        sourceClauseType: String(sourceClauseType || ""),
        clauseSource: String(clauseSource || ""),
        adjunctionSource: String(adjunctionSource || ""),
        conjunctionSource: String(conjunctionSource || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "personal-name-nnc-needs-validation" : "personal-name-nnc-needs-nawat-evidence",
            normalizedKind !== PERSONAL_NAME_NNC_KIND.unknown
                ? "personal-name-nnc-kind-recognized"
                : "personal-name-nnc-kind-unconfirmed",
            normalizedFalsePositive !== PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "personal-name-nnc-false-positive-source"
                : "personal-name-nnc-unconfirmed",
        ],
        boundary: buildPersonalNameNncBoundaryMetadata(),
    };
}

function classifyPersonalNameNncFalsePositive(source = "") {
    const normalizedSource = normalizePersonalNameNncFalsePositiveSource(source);
    return {
        kind: "personal-name-nnc-false-positive",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPersonalNameNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["personal-name-nnc-false-positive-source"],
        antiConflationRules: getPersonalNameNncAntiConflationRules(),
    };
}
