// core/nnc/place_gentilic/place_gentilic.js
// Lesson 48 place-name/gentilic NNC boundary metadata. This keeps ordinary
// NNC generation, locative-temporal nominal outputs, relational boundaries,
// and translation labels separate from confirmed place-name or gentilic NNC
// generation until Nawat/Pipil evidence supports it.

"use strict";

const PLACE_GENTILIC_NNC_BOUNDARY_VERSION = 1;

const PLACE_GENTILIC_NNC_KIND = Object.freeze({
    placeName: "place-name",
    gentilic: "gentilic",
    gentilicCollective: "gentilic-collective",
    professionPlaceAssociation: "profession-place-association",
    calendarName: "calendar-name",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    relationalNncBoundary: "relational-nnc-boundary",
    locativeTemporalNominal: "locative-temporal-nominal",
    placeTranslation: "place-translation",
    gentilicTranslation: "gentilic-translation",
    professionTranslation: "profession-translation",
    routeLabel: "route-label",
    csvVerbSurface: "csv-verb-surface",
    calendarRoadmapText: "calendar-roadmap-text",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "place-name/gentilic NNC boundary metadata is not generation",
    "ordinary NNC fixtures are not place-name or gentilic fixture evidence",
    "open-stem ordinary NNC previews are not place-name or gentilic data",
    "locative-temporal nominal outputs are not place-name NNC evidence",
    "relational NNC boundary metadata is not place-name or gentilic evidence",
    "place, profession, or gentilic translations are not Nawat/Pipil form evidence",
    "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil form authority",
]);

const PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "placeNameSource",
        asks: "Which Nawat/Pipil place-name NNC form is evidenced?",
    }),
    Object.freeze({
        field: "gentilicSource",
        asks: "Which Nawat/Pipil gentilic NNC form is evidenced?",
    }),
    Object.freeze({
        field: "placeGentilicKind",
        asks: "Is the candidate a place-name, gentilic, gentilic collective, profession/place association, calendar-name, or unknown?",
    }),
    Object.freeze({
        field: "associatedPlace",
        asks: "What place is associated with the gentilic, collective, profession, or name?",
    }),
    Object.freeze({
        field: "collectivity",
        asks: "Is collectivity evidenced by Nawat/Pipil data or only by a translation/category label?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided example supports place/gentilic status?",
    }),
]);

function normalizePlaceGentilicNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePlaceGentilicNncKind(value = "") {
    return normalizePlaceGentilicNncEnum(
        value,
        Object.values(PLACE_GENTILIC_NNC_KIND),
        PLACE_GENTILIC_NNC_KIND.unknown
    );
}

function normalizePlaceGentilicNncFalsePositiveSource(value = "") {
    return normalizePlaceGentilicNncEnum(
        value,
        Object.values(PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE),
        PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getPlaceGentilicNncAntiConflationRules() {
    return Array.from(PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES);
}

function getPlaceGentilicNncStructuralQuestions() {
    return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildPlaceGentilicNncBoundaryMetadata() {
    return {
        kind: "place-gentilic-nnc-boundary",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        status: "partial",
        structuralSource: "Andrews Lesson 48",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPlaceGentilicNncStructuralQuestions(),
        boundaries: {
            hasOrdinaryNncGeneration: true,
            hasRelationalNncBoundary: true,
            hasPlaceNameNncGeneration: false,
            hasGentilicNncGeneration: false,
            hasStaticPlaceData: false,
            hasStaticGentilicData: false,
            hasConfirmedFixtureData: false,
            changesOrdinaryNncGeneration: false,
            changesRelationalNncGeneration: false,
            changesNominalizationGeneration: false,
            changesRouteBehavior: false,
            treatsPlaceTranslationsAsEvidence: false,
            treatsProfessionLabelsAsEvidence: false,
        },
        antiConflationRules: getPlaceGentilicNncAntiConflationRules(),
    };
}

function classifyPlaceGentilicNncCandidate({
    candidate = "",
    placeNameSource = "",
    gentilicSource = "",
    placeGentilicKind = "",
    associatedPlace = "",
    collectivity = "",
    evidenceSource = "",
    falsePositiveSource = "",
    sourceKind = "",
} = {}) {
    const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
    const normalizedFalsePositive = normalizePlaceGentilicNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "place-gentilic-nnc-candidate-classification",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "place-gentilic-nnc-needs-validation" : "place-gentilic-nnc-needs-nawat-evidence",
            normalizedKind !== PLACE_GENTILIC_NNC_KIND.unknown
                ? "place-gentilic-nnc-kind-recognized"
                : "place-gentilic-nnc-kind-unconfirmed",
            normalizedFalsePositive !== PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "place-gentilic-nnc-false-positive-source"
                : "place-gentilic-nnc-unconfirmed",
        ],
        boundary: buildPlaceGentilicNncBoundaryMetadata(),
    };
}

function classifyPlaceGentilicNncFalsePositive(source = "") {
    const normalizedSource = normalizePlaceGentilicNncFalsePositiveSource(source);
    return {
        kind: "place-gentilic-nnc-false-positive",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPlaceNameNncEvidence: false,
        isGentilicNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["place-gentilic-nnc-false-positive-source"],
        antiConflationRules: getPlaceGentilicNncAntiConflationRules(),
    };
}
