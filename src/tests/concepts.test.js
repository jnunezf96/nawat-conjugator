"use strict";

/**
 * Tests for src/core/concepts/concepts.js
 */

const { createSuite } = require("./runner");

function compactConcept(concept) {
    return concept && {
        id: concept.id,
        lesson: concept.lesson,
        kind: concept.kind,
        label: concept.label,
        notationRole: concept.notationRole,
        appliesTo: concept.appliesTo,
        generationAllowed: concept.generationAllowed,
    };
}

function run(ctx) {
    const s = createSuite("concepts");

    s.eq(
        "Lesson 1 concept API is exported",
        [
            typeof ctx.getConceptRegistry,
            typeof ctx.getConceptById,
            typeof ctx.classifyConceptToken,
            typeof ctx.buildConceptGlossaryMetadata,
        ],
        ["function", "function", "function", "function"]
    );

    s.eq(
        "concept registry records Lesson 1 notation and hierarchy without generation",
        {
            kind: ctx.getConceptRegistry({ lesson: 1 }).kind,
            version: ctx.getConceptRegistry({ lesson: 1 }).version,
            generationAllowed: ctx.getConceptRegistry({ lesson: 1 }).generationAllowed,
            conceptIds: ctx.getConceptRegistry({ lesson: 1 }).concepts.map((concept) => concept.id),
        },
        {
            kind: "concept-registry",
            version: 1,
            generationAllowed: false,
            conceptIds: [
                "word-output",
                "nuclear-clause",
                "vnc",
                "nnc",
                "formula-boundary",
                "predicate-boundary",
                "subject-person-slot",
                "subject-number-connector-slot",
                "predicate-stem-slot",
                "tense-position",
            ],
        }
    );

    s.eq(
        "concept lookup distinguishes NNC subject number connector as notation",
        compactConcept(ctx.getConceptById("subject-number-connector-slot")),
        {
            id: "subject-number-connector-slot",
            lesson: 1,
            kind: "notation",
            label: "num1-num2",
            notationRole: "subject-number-connector-slot",
            appliesTo: ["NNC"],
            generationAllowed: false,
        }
    );

    s.eq(
        "concept token classifier maps formula tokens without treating them as surfaces",
        {
            stem: ctx.classifyConceptToken("STEM"),
            nnc: ctx.classifyConceptToken("NNC"),
            unknown: ctx.classifyConceptToken("tekit"),
        },
        {
            stem: {
                kind: "concept-token-classification",
                version: 1,
                token: "STEM",
                normalized: "stem",
                matched: true,
                conceptId: "predicate-stem-slot",
                notationRole: "predicate-stem-slot",
                concept: ctx.getConceptById("predicate-stem-slot"),
                generationAllowed: false,
                diagnostics: ["concept-token-diagnostic-only"],
            },
            nnc: {
                kind: "concept-token-classification",
                version: 1,
                token: "NNC",
                normalized: "nnc",
                matched: true,
                conceptId: "nnc",
                notationRole: "nominal-nuclear-clause-category",
                concept: ctx.getConceptById("nnc"),
                generationAllowed: false,
                diagnostics: ["concept-token-diagnostic-only"],
            },
            unknown: {
                kind: "concept-token-classification",
                version: 1,
                token: "tekit",
                normalized: "tekit",
                matched: false,
                conceptId: "",
                notationRole: "",
                concept: null,
                generationAllowed: false,
                diagnostics: ["concept-token-unmapped"],
            },
        }
    );

    const glossary = ctx.buildConceptGlossaryMetadata({ lesson: 1 });
    s.eq(
        "concept glossary metadata keeps Lesson 1 partial and non-generative",
        {
            kind: glossary.kind,
            lesson: glossary.lesson,
            status: glossary.status,
            generationAllowed: glossary.generationAllowed,
            boundaries: glossary.boundaries,
        },
        {
            kind: "concept-glossary-metadata",
            lesson: 1,
            status: "partial",
            generationAllowed: false,
            boundaries: {
                isEngine: false,
                isUiGlossaryComplete: false,
                isNawatFormAuthority: false,
                requiresVisibleGlossaryUi: true,
            },
        }
    );

    s.eq(
        "concept registry carries anti-conflation rules",
        ctx.getConceptAntiConflationRules(),
        [
            "concept glossary is not generation",
            "notation token is not Nawat/Pipil surface evidence",
            "lesson heading is not an engine boundary",
            "VNC/NNC category label is not a complete sentence model",
            "Andrews terminology is architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("concept glossary does not expose surface forms", Object.prototype.hasOwnProperty.call(glossary, "surfaceForms"));
    s.no("concept glossary does not expose generated forms", Object.prototype.hasOwnProperty.call(glossary, "generatedForms"));

    return s;
}

module.exports = { run };
