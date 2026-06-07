// core/concepts/concepts.js
// Lesson 1 concept and notation registry. This is diagnostic metadata only:
// it names the slots and hierarchy that other engines use, but it does not
// generate Nawat/Pipil surfaces.

"use strict";

const CONCEPT_REGISTRY_VERSION = 1;

const CONCEPT_KIND = Object.freeze({
    notation: "notation",
    category: "category",
    hierarchy: "hierarchy",
    boundary: "boundary",
});

const CONCEPT_ANTI_CONFLATION_RULES = Object.freeze([
    "concept glossary is not generation",
    "notation token is not Nawat/Pipil surface evidence",
    "lesson heading is not an engine boundary",
    "VNC/NNC category label is not a complete sentence model",
    "Andrews terminology is architecture, not Nawat/Pipil form authority",
]);

const LESSON_1_CONCEPTS = Object.freeze([
    Object.freeze({
        id: "word-output",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "word output",
        notationRole: "engine-output-unit",
        definition: "The generated word-like surface that current motors produce; it is smaller than a complete sentence model.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 10,
    }),
    Object.freeze({
        id: "nuclear-clause",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "nuclear clause",
        notationRole: "formula-container",
        definition: "The structural container for a predicate and its nuclear participants.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 20,
    }),
    Object.freeze({
        id: "vnc",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "VNC",
        notationRole: "verbal-nuclear-clause-category",
        definition: "A verbal nuclear clause category with subject, object, predicate, and tense positions.",
        appliesTo: ["VNC"],
        displayOrder: 30,
    }),
    Object.freeze({
        id: "nnc",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "NNC",
        notationRole: "nominal-nuclear-clause-category",
        definition: "A nominal nuclear clause category with subject-person, predicate-state, and subject-number connector positions.",
        appliesTo: ["NNC"],
        displayOrder: 40,
    }),
    Object.freeze({
        id: "formula-boundary",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "#...#",
        notationRole: "formula-boundary",
        definition: "Marks a structural formula, not a literal spelling instruction.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 50,
    }),
    Object.freeze({
        id: "predicate-boundary",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "(...)",
        notationRole: "predicate-boundary",
        definition: "Marks the predicate core inside a formula; connectors and tense positions may sit outside it.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 60,
    }),
    Object.freeze({
        id: "subject-person-slot",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "pers1-pers2",
        notationRole: "subject-person-slot",
        definition: "The subject person connector slot in the ordinary NNC formula.",
        appliesTo: ["NNC"],
        displayOrder: 70,
    }),
    Object.freeze({
        id: "subject-number-connector-slot",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "num1-num2",
        notationRole: "subject-number-connector-slot",
        definition: "The ordinary NNC subject-number connector slot; it is not a lexical noun suffix.",
        appliesTo: ["NNC"],
        displayOrder: 80,
    }),
    Object.freeze({
        id: "predicate-stem-slot",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "STEM",
        notationRole: "predicate-stem-slot",
        definition: "The predicate stem slot inside a formula.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 90,
    }),
    Object.freeze({
        id: "tense-position",
        lesson: 1,
        kind: CONCEPT_KIND.notation,
        label: "tense",
        notationRole: "vnc-tense-position",
        definition: "A VNC position; ordinary NNC formula metadata keeps this absent.",
        appliesTo: ["VNC"],
        displayOrder: 100,
    }),
]);

const CONCEPT_TOKEN_ALIASES = Object.freeze({
    "#": "formula-boundary",
    "#...#": "formula-boundary",
    "()": "predicate-boundary",
    "(...)": "predicate-boundary",
    "vnc": "vnc",
    "nnc": "nnc",
    "pers1-pers2": "subject-person-slot",
    "num1-num2": "subject-number-connector-slot",
    "stem": "predicate-stem-slot",
    "predicate": "predicate-stem-slot",
    "tense": "tense-position",
});

function normalizeConceptId(value = "") {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
}

function cloneConcept(concept = {}) {
    return {
        ...concept,
        appliesTo: Array.isArray(concept.appliesTo) ? [...concept.appliesTo] : [],
        source: {
            structuralSource: "Andrews Lesson 1",
            targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        },
        generationAllowed: false,
    };
}

function getConceptAntiConflationRules() {
    return Array.from(CONCEPT_ANTI_CONFLATION_RULES);
}

function getConceptRegistry({ lesson = null, kind = "" } = {}) {
    const normalizedKind = String(kind || "").trim();
    const concepts = LESSON_1_CONCEPTS
        .filter((concept) => lesson == null || Number(concept.lesson) === Number(lesson))
        .filter((concept) => !normalizedKind || concept.kind === normalizedKind)
        .sort((left, right) => (left.displayOrder || 0) - (right.displayOrder || 0))
        .map(cloneConcept);
    return {
        kind: "concept-registry",
        version: CONCEPT_REGISTRY_VERSION,
        structuralSource: "Andrews Lesson 1",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        concepts,
        generationAllowed: false,
        antiConflationRules: getConceptAntiConflationRules(),
    };
}

function listConceptsByLesson(lesson = 1) {
    return getConceptRegistry({ lesson }).concepts;
}

function listConceptsByKind(kind = "") {
    return getConceptRegistry({ kind }).concepts;
}

function getConceptById(id = "") {
    const normalizedId = normalizeConceptId(id);
    const concept = LESSON_1_CONCEPTS.find((entry) => entry.id === normalizedId);
    return concept ? cloneConcept(concept) : null;
}

function classifyConceptToken(value = "") {
    const raw = String(value == null ? "" : value);
    const normalized = normalizeConceptId(raw);
    const aliasId = CONCEPT_TOKEN_ALIASES[raw.trim()]
        || CONCEPT_TOKEN_ALIASES[normalized]
        || normalized;
    const concept = getConceptById(aliasId);
    return {
        kind: "concept-token-classification",
        version: CONCEPT_REGISTRY_VERSION,
        token: raw,
        normalized,
        matched: Boolean(concept),
        conceptId: concept?.id || "",
        notationRole: concept?.notationRole || "",
        concept,
        generationAllowed: false,
        diagnostics: concept
            ? ["concept-token-diagnostic-only"]
            : ["concept-token-unmapped"],
    };
}

function buildConceptGlossaryMetadata({ lesson = 1 } = {}) {
    return {
        kind: "concept-glossary-metadata",
        version: CONCEPT_REGISTRY_VERSION,
        lesson: Number(lesson) || 1,
        status: "partial",
        concepts: listConceptsByLesson(lesson),
        generationAllowed: false,
        boundaries: {
            isEngine: false,
            isUiGlossaryComplete: false,
            isNawatFormAuthority: false,
            requiresVisibleGlossaryUi: true,
        },
        antiConflationRules: getConceptAntiConflationRules(),
    };
}
