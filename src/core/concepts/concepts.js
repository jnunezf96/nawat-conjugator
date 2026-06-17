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

const NUCLEAR_CLAUSE_TERMINOLOGY = Object.freeze({
    nc: Object.freeze({
        english: "nuclear clause",
        spanish: "cláusula nuclear",
        abbreviation: "CN",
        conceptId: "nuclear-clause",
    }),
    vnc: Object.freeze({
        english: "verbal nuclear clause",
        spanish: "cláusula nuclear verbal",
        abbreviation: "CNV",
        conceptId: "vnc",
    }),
    nnc: Object.freeze({
        english: "nominal nuclear clause",
        spanish: "cláusula nuclear nominal",
        abbreviation: "CNN",
        conceptId: "nnc",
    }),
});

const LESSON_1_CONCEPTS = Object.freeze([
    Object.freeze({
        id: "word-output",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "superficie generada",
        englishLabel: "generated surface",
        spanishLabel: "superficie generada",
        notationRole: "engine-output-unit",
        definition: "The visible surface produced by current motors; it is not a Lesson 1 word analysis and is smaller than a complete sentence model.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 10,
    }),
    Object.freeze({
        id: "nuclear-clause",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "CN",
        englishLabel: "nuclear clause",
        spanishLabel: "cláusula nuclear",
        abbreviation: "CN",
        notationRole: "formula-container",
        definition: "The structural container for a predicate and its nuclear participants.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 20,
    }),
    Object.freeze({
        id: "vnc",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "CNV",
        englishLabel: "verbal nuclear clause",
        spanishLabel: "cláusula nuclear verbal",
        abbreviation: "CNV",
        notationRole: "verbal-nuclear-clause-category",
        definition: "A verbal nuclear clause category with subject, object, predicate, and tense positions.",
        appliesTo: ["VNC"],
        displayOrder: 30,
    }),
    Object.freeze({
        id: "nnc",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "CNN",
        englishLabel: "nominal nuclear clause",
        spanishLabel: "cláusula nuclear nominal",
        abbreviation: "CNN",
        notationRole: "nominal-nuclear-clause-category",
        definition: "A nominal nuclear clause category with subject-person, predicate-state, and subject-number connector positions.",
        appliesTo: ["NNC"],
        displayOrder: 40,
    }),
    Object.freeze({
        id: "type-level",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "nivel tipo",
        englishLabel: "type level",
        spanishLabel: "nivel tipo",
        notationRole: "analysis-level",
        definition: "The contrastive system level: phoneme, grapheme, sigeme, sememe, and morpheme.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 45,
    }),
    Object.freeze({
        id: "token-level",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "nivel token",
        englishLabel: "token level",
        spanishLabel: "nivel token",
        notationRole: "analysis-level",
        definition: "The recurrent realization level: phone, graph, sig, seme, and morph.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 46,
    }),
    Object.freeze({
        id: "instance-level",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "nivel instancia",
        englishLabel: "instance level",
        spanishLabel: "nivel instancia",
        notationRole: "analysis-level",
        definition: "The individual occurrence level, where a morph is realized as a form.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 47,
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
        id: "morpheme",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "morfema",
        englishLabel: "morpheme",
        spanishLabel: "morfema",
        notationRole: "type-level-meaningful-unit",
        definition: "A type-level meaningful carrier/content unit; it is not the same thing as its written or spoken carrier alone.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 62,
    }),
    Object.freeze({
        id: "morph",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "morfo",
        englishLabel: "morph",
        spanishLabel: "morfo",
        notationRole: "token-level-morpheme-representation",
        definition: "A token-level representation of a morpheme.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 63,
    }),
    Object.freeze({
        id: "form",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "forma",
        englishLabel: "form",
        spanishLabel: "forma",
        notationRole: "instance-level-morph-realization",
        definition: "An instance-level realization of a morph; this is the app's final visible output layer.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 64,
    }),
    Object.freeze({
        id: "root",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "raíz",
        englishLabel: "root",
        spanishLabel: "raíz",
        notationRole: "stem-rank-source",
        definition: "A single major morpheme that may serve as or help build a stem.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 65,
    }),
    Object.freeze({
        id: "stem",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "tronco",
        englishLabel: "stem",
        spanishLabel: "tronco",
        notationRole: "predicate-stem-source",
        definition: "The stem-rank unit that can be root alone or root/stem plus derivational material.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 66,
    }),
    Object.freeze({
        id: "stock",
        lesson: 1,
        kind: CONCEPT_KIND.hierarchy,
        label: "stock",
        englishLabel: "stock",
        spanishLabel: "stock",
        notationRole: "stem-forming-source",
        definition: "A special stem-forming source created below the stem rank; later lessons use it for derivation.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 67,
    }),
    Object.freeze({
        id: "major-morpheme",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "morfema mayor",
        englishLabel: "major morpheme",
        spanishLabel: "morfema mayor",
        notationRole: "representational-morpheme",
        definition: "A meaningful unit that carries representational information and can participate in roots and stems.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 68,
    }),
    Object.freeze({
        id: "minor-morpheme",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "morfema menor",
        englishLabel: "minor morpheme",
        spanishLabel: "morfema menor",
        notationRole: "affixal-morpheme",
        definition: "An affixal meaningful unit.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 69,
    }),
    Object.freeze({
        id: "affix",
        lesson: 1,
        kind: CONCEPT_KIND.category,
        label: "afijo",
        englishLabel: "affix",
        spanishLabel: "afijo",
        notationRole: "minor-morpheme-position",
        definition: "A minor morpheme that may be prefixal, infixal, or suffixal.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 69.1,
    }),
    Object.freeze({
        id: "derivational-affix",
        lesson: 1,
        kind: CONCEPT_KIND.boundary,
        label: "afijo derivacional",
        englishLabel: "derivational affix",
        spanishLabel: "afijo derivacional",
        notationRole: "stem-internal-affix",
        definition: "Stem-internal material that builds or changes stems.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 69.2,
    }),
    Object.freeze({
        id: "inflectional-affix",
        lesson: 1,
        kind: CONCEPT_KIND.boundary,
        label: "afijo flexional",
        englishLabel: "inflectional affix",
        spanishLabel: "afijo flexional",
        notationRole: "stem-external-affix",
        definition: "Stem-external material that carries syntactical information in a paradigm.",
        appliesTo: ["VNC", "NNC"],
        displayOrder: 69.3,
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
    "cn": "nuclear-clause",
    "clausula-nuclear": "nuclear-clause",
    "cláusula-nuclear": "nuclear-clause",
    "vnc": "vnc",
    "cnv": "vnc",
    "nnc": "nnc",
    "cnn": "nnc",
    "morpheme": "morpheme",
    "morfema": "morpheme",
    "morph": "morph",
    "morfo": "morph",
    "form": "form",
    "forma": "form",
    "root": "root",
    "raiz": "root",
    "raíz": "root",
    "tronco": "stem",
    "pers1-pers2": "subject-person-slot",
    "num1-num2": "subject-number-connector-slot",
    "stem": "predicate-stem-slot",
    "predicate": "predicate-stem-slot",
    "predicado": "predicate-stem-slot",
    "tense": "tense-position",
    "tiempo": "tense-position",
});

function attachConceptGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "concept-metadata",
        routeFamily: "concept-registry",
        structuralSource: "Andrews Lesson 1",
        andrewsRefs: ["Andrews Lesson 1"],
        ...options,
    });
}

function normalizeConceptId(value = "") {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
}

function cloneConcept(concept = {}) {
    const cloned = {
        ...concept,
        appliesTo: Array.isArray(concept.appliesTo) ? [...concept.appliesTo] : [],
        displayLabel: concept.spanishLabel || concept.label,
        canonicalLabel: concept.abbreviation || concept.label,
        source: {
            structuralSource: "Andrews Lesson 1",
            targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        },
        generationAllowed: false,
    };
    return attachConceptGrammarContract(cloned, {
        metadataKind: "concept-entry",
        routeStage: "classify-concept-entry",
        sourceInput: cloned.id,
        supported: true,
        targetContract: {
            metadataKind: "concept-entry",
            conceptKind: cloned.kind,
            notationRole: cloned.notationRole || "",
            generationAllowed: false,
        },
    });
}

function getConceptAntiConflationRules() {
    return Array.from(CONCEPT_ANTI_CONFLATION_RULES);
}

function getNuclearClauseTerminology() {
    return Object.fromEntries(
        Object.entries(NUCLEAR_CLAUSE_TERMINOLOGY).map(([key, value]) => [key, { ...value }])
    );
}

function getConceptRegistry({ lesson = null, kind = "" } = {}) {
    const normalizedKind = String(kind || "").trim();
    const concepts = LESSON_1_CONCEPTS
        .filter((concept) => lesson == null || Number(concept.lesson) === Number(lesson))
        .filter((concept) => !normalizedKind || concept.kind === normalizedKind)
        .sort((left, right) => (left.displayOrder || 0) - (right.displayOrder || 0))
        .map(cloneConcept);
    const registry = {
        kind: "concept-registry",
        version: CONCEPT_REGISTRY_VERSION,
        structuralSource: "Andrews Lesson 1",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        concepts,
        generationAllowed: false,
        antiConflationRules: getConceptAntiConflationRules(),
    };
    return attachConceptGrammarContract(registry, {
        metadataKind: "concept-registry",
        routeStage: "classify-registry",
        supported: concepts.length > 0,
        diagnosticStatus: "diagnostic-only",
        targetContract: {
            metadataKind: "concept-registry",
            conceptCount: concepts.length,
            generationAllowed: false,
        },
    });
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
    const classification = {
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
    return attachConceptGrammarContract(classification, {
        metadataKind: "concept-token-classification",
        routeStage: "classify-token",
        sourceInput: raw,
        supported: Boolean(concept),
        targetContract: {
            metadataKind: "concept-token-classification",
            conceptId: classification.conceptId,
            notationRole: classification.notationRole,
            generationAllowed: false,
        },
    });
}

function buildConceptGlossaryMetadata({ lesson = 1 } = {}) {
    const glossary = {
        kind: "concept-glossary-metadata",
        version: CONCEPT_REGISTRY_VERSION,
        lesson: Number(lesson) || 1,
        status: "visible-diagnostic",
        terminology: getNuclearClauseTerminology(),
        concepts: listConceptsByLesson(lesson),
        generationAllowed: false,
        boundaries: {
            isEngine: false,
            isUiGlossaryComplete: true,
            isNawatFormAuthority: false,
            requiresVisibleGlossaryUi: false,
            isExternalConceptDataRequired: false,
        },
        antiConflationRules: getConceptAntiConflationRules(),
    };
    return attachConceptGrammarContract(glossary, {
        metadataKind: "concept-glossary-metadata",
        routeStage: "classify-glossary",
        supported: true,
        sourceInput: String(glossary.lesson),
        morphBoundaryFrame: glossary,
    });
}

function buildConceptGlossaryDisplayModel({ lesson = 1 } = {}) {
    const glossary = buildConceptGlossaryMetadata({ lesson });
    const terminology = Object.entries(glossary.terminology || {}).map(([id, entry]) => ({
        id,
        ...entry,
        display: `${entry.abbreviation} = ${entry.spanish}`,
    }));
    const concepts = glossary.concepts.map((concept) => ({
        id: concept.id,
        kind: concept.kind,
        label: concept.displayLabel || concept.spanishLabel || concept.label,
        canonicalLabel: concept.canonicalLabel || concept.abbreviation || concept.label,
        englishLabel: concept.englishLabel || "",
        spanishLabel: concept.spanishLabel || concept.label,
        notationRole: concept.notationRole || "",
        definition: concept.definition || "",
        appliesTo: Array.isArray(concept.appliesTo) ? [...concept.appliesTo] : [],
        generationAllowed: false,
    }));
    const model = {
        kind: "concept-glossary-display-model",
        version: CONCEPT_REGISTRY_VERSION,
        lesson: glossary.lesson,
        title: "Andrews OS: notación y términos",
        subtitle: "Lección 1 define el vocabulario que organiza CN, CNV y CNN.",
        terminology,
        concepts,
        generationAllowed: false,
        boundaries: glossary.boundaries,
        antiConflationRules: glossary.antiConflationRules,
    };
    return attachConceptGrammarContract(model, {
        metadataKind: "concept-glossary-display-model",
        routeStage: "render-glossary",
        supported: true,
        sourceInput: String(model.lesson),
        targetContract: {
            metadataKind: "concept-glossary-display-model",
            conceptCount: concepts.length,
            generationAllowed: false,
        },
    });
}
