// core/calendar/calendar.js
// Appendix E calendar-name boundary metadata. This keeps roadmap text,
// personal-name metadata, and place/gentilic metadata separate from confirmed
// Nawat/Pipil day, month, year, or cycle-name generation.

"use strict";

const CALENDAR_NAME_BOUNDARY_VERSION = 1;

const CALENDAR_NAME_KIND = Object.freeze({
    dayName: "day-name",
    monthName: "month-name",
    yearName: "year-name",
    cycleName: "cycle-name",
    personalNameSource: "personal-name-source",
    unknown: "unknown",
});

const CALENDAR_NAME_FALSE_POSITIVE_SOURCE = Object.freeze({
    roadmapText: "roadmap-text",
    calendarRoadmapText: "calendar-roadmap-text",
    personalNameBoundary: "personal-name-boundary",
    placeGentilicBoundary: "place-gentilic-boundary",
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    staticLabel: "static-label",
    translationLabel: "translation-label",
    properNameTranslation: "proper-name-translation",
    dateUiLabel: "date-ui-label",
    andrewsExample: "andrews-example",
    unknown: "unknown",
});

const CALENDAR_NAME_ANTI_CONFLATION_RULES = Object.freeze([
    "calendar-name boundary metadata is not generation",
    "day, month, year, or cycle labels are not Nawat/Pipil calendar-name fixture data",
    "personal-name NNC boundary metadata is not calendar-name data",
    "place/gentilic boundary metadata and calendar roadmap text are not confirmed calendar names",
    "ordinary NNC fixtures or open-stem previews are not calendar-name evidence",
    "Andrews calendar categories are architecture, not Nawat/Pipil form authority",
]);

const CALENDAR_NAME_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "calendarKind",
        asks: "Is the candidate a day, month, year, cycle, personal-name source, or unknown?",
    }),
    Object.freeze({
        field: "calendarCycle",
        asks: "Which calendar cycle or naming system is evidenced?",
    }),
    Object.freeze({
        field: "sourceName",
        asks: "Which Nawat/Pipil calendar-name form is evidenced?",
    }),
    Object.freeze({
        field: "nameFunction",
        asks: "Does the candidate function as date label, cycle label, personal-name source, or unknown?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports calendar-name status?",
    }),
]);

function normalizeCalendarNameEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeCalendarNameKind(value = "") {
    return normalizeCalendarNameEnum(
        value,
        Object.values(CALENDAR_NAME_KIND),
        CALENDAR_NAME_KIND.unknown
    );
}

function normalizeCalendarNameFalsePositiveSource(value = "") {
    return normalizeCalendarNameEnum(
        value,
        Object.values(CALENDAR_NAME_FALSE_POSITIVE_SOURCE),
        CALENDAR_NAME_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getCalendarNameAntiConflationRules() {
    return Array.from(CALENDAR_NAME_ANTI_CONFLATION_RULES);
}

function getCalendarNameStructuralQuestions() {
    return CALENDAR_NAME_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildCalendarNameBoundaryMetadata() {
    return {
        kind: "calendar-name-boundary",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        appendix: "E",
        status: "partial",
        structuralSource: "Andrews Appendix E",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCalendarNameStructuralQuestions(),
        boundaries: {
            hasPersonalNameBoundary: true,
            hasPlaceGentilicBoundary: true,
            hasCalendarNameGeneration: false,
            hasStaticCalendarData: false,
            hasConfirmedFixtureData: false,
            changesNncGeneration: false,
            changesPersonalNameGeneration: false,
            changesPlaceGentilicGeneration: false,
            treatsRoadmapTextAsEvidence: false,
            treatsTranslationLabelsAsEvidence: false,
        },
        antiConflationRules: getCalendarNameAntiConflationRules(),
    };
}

function classifyCalendarNameCandidate({
    candidate = "",
    calendarKind = "",
    calendarCycle = "",
    sourceName = "",
    nameFunction = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedKind = normalizeCalendarNameKind(calendarKind);
    const normalizedFalsePositive = normalizeCalendarNameFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "calendar-name-candidate-classification",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        calendarKind: normalizedKind,
        calendarCycle: String(calendarCycle || ""),
        sourceName: String(sourceName || ""),
        nameFunction: String(nameFunction || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "calendar-name-needs-validation" : "calendar-name-needs-nawat-evidence",
            normalizedKind !== CALENDAR_NAME_KIND.unknown
                ? "calendar-name-kind-recognized"
                : "calendar-name-kind-unconfirmed",
            normalizedFalsePositive !== CALENDAR_NAME_FALSE_POSITIVE_SOURCE.unknown
                ? "calendar-name-false-positive-source"
                : "calendar-name-unconfirmed",
        ],
        boundary: buildCalendarNameBoundaryMetadata(),
    };
}

function classifyCalendarNameFalsePositive(source = "") {
    const normalizedSource = normalizeCalendarNameFalsePositiveSource(source);
    return {
        kind: "calendar-name-false-positive",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        source: normalizedSource,
        isCalendarNameEvidence: false,
        isPersonalNameNncEvidence: false,
        isPlaceNameNncEvidence: false,
        generationAllowed: false,
        diagnostics: ["calendar-name-false-positive-source"],
        antiConflationRules: getCalendarNameAntiConflationRules(),
    };
}
