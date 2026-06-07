// core/vnc/purposive/purposive.js
// Lesson 29 purposive/directional boundary metadata. This layer keeps the
// repo's existing directional-prefix mechanics separate from confirmed
// purposive VNC generation until Nawat/Pipil evidence supports it.

"use strict";

const PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION = 1;

const PURPOSIVE_DIRECTIONAL_RELATION = Object.freeze({
    directional: "directional",
    purpose: "purpose",
    purposiveDirectional: "purposive-directional",
    unknown: "unknown",
});

const PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE = Object.freeze({
    directionalPrefixOnly: "directional-prefix-only",
    parserBracketSyntax: "parser-bracket-syntax",
    composerDirectionalControl: "composer-directional-control",
    translationLabel: "translation-label",
    compoundMarker: "compound-marker",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES = Object.freeze([
    "directional prefix mechanics are not purposive VNC generation",
    "bracketed directional parser syntax is not purposive evidence",
    "composer directional controls are not confirmed purposive forms",
    "purpose translations are not Nawat/Pipil fixture evidence",
    "compound parsing is not purposive VNC generation",
    "Andrews purposive categories are architecture, not Nawat/Pipil form authority",
]);

const PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "sourceStem",
        asks: "Which VNC stem is the source of the purposive or directional candidate?",
    }),
    Object.freeze({
        field: "directionalPrefix",
        asks: "Is a directional prefix such as wal or un present, and is it evidence-backed?",
    }),
    Object.freeze({
        field: "relation",
        asks: "Is the relation directional, purposive, both, or unknown?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided clause/form evidence supports purposive status?",
    }),
]);

function normalizePurposiveDirectionalEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePurposiveDirectionalRelation(value = "") {
    return normalizePurposiveDirectionalEnum(
        value,
        Object.values(PURPOSIVE_DIRECTIONAL_RELATION),
        PURPOSIVE_DIRECTIONAL_RELATION.unknown
    );
}

function normalizePurposiveDirectionalFalsePositiveSource(value = "") {
    return normalizePurposiveDirectionalEnum(
        value,
        Object.values(PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE),
        PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getPurposiveDirectionalAntiConflationRules() {
    return Array.from(PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES);
}

function getPurposiveDirectionalStructuralQuestions() {
    return PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function getKnownDirectionalPrefixesForPurposiveBoundary() {
    if (typeof DIRECTIONAL_PREFIXES !== "undefined" && Array.isArray(DIRECTIONAL_PREFIXES)) {
        return Array.from(new Set(DIRECTIONAL_PREFIXES.filter(Boolean)));
    }
    return ["wal", "un"];
}

function buildPurposiveDirectionalBoundaryMetadata() {
    return {
        kind: "purposive-directional-boundary",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        lesson: 29,
        status: "partial",
        structuralSource: "Andrews Lesson 29",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        knownDirectionalPrefixes: getKnownDirectionalPrefixesForPurposiveBoundary(),
        structuralQuestions: getPurposiveDirectionalStructuralQuestions(),
        boundaries: {
            hasDirectionalPrefixMechanics: true,
            hasPurposiveGeneration: false,
            hasConfirmedPurposiveFixtureData: false,
            changesDirectionalGeneration: false,
            changesVncGeneration: false,
            treatsDirectionalPrefixAsPurposiveEvidence: false,
        },
        antiConflationRules: getPurposiveDirectionalAntiConflationRules(),
    };
}

function classifyPurposiveDirectionalCandidate({
    sourceStem = "",
    candidate = "",
    directionalPrefix = "",
    relation = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRelation = normalizePurposiveDirectionalRelation(relation);
    const normalizedFalsePositive = normalizePurposiveDirectionalFalsePositiveSource(falsePositiveSource);
    const knownPrefixes = getKnownDirectionalPrefixesForPurposiveBoundary();
    const normalizedDirectionalPrefix = String(directionalPrefix || "").trim().toLowerCase();
    const hasKnownDirectionalPrefix = knownPrefixes.includes(normalizedDirectionalPrefix);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "purposive-directional-candidate-classification",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        directionalPrefix: normalizedDirectionalPrefix,
        hasKnownDirectionalPrefix,
        relation: normalizedRelation,
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "purposive-directional-needs-validation" : "purposive-directional-needs-nawat-evidence",
            hasKnownDirectionalPrefix ? "directional-prefix-recognized" : "directional-prefix-unconfirmed",
            normalizedFalsePositive !== PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown
                ? "purposive-directional-false-positive-source"
                : "purposive-directional-unconfirmed",
        ],
        boundary: buildPurposiveDirectionalBoundaryMetadata(),
    };
}

function classifyPurposiveDirectionalFalsePositive(source = "") {
    const normalizedSource = normalizePurposiveDirectionalFalsePositiveSource(source);
    return {
        kind: "purposive-directional-false-positive",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        source: normalizedSource,
        isPurposiveEvidence: false,
        generationAllowed: false,
        diagnostics: ["purposive-directional-false-positive-source"],
        antiConflationRules: getPurposiveDirectionalAntiConflationRules(),
    };
}
