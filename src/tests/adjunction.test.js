"use strict";

/**
 * Tests for src/core/clause/adjunction/adjunction.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("adjunction");

    s.eq(
        "Lessons 49-50 adverbial adjunction API is exported",
        [
            typeof ctx.buildAdverbialAdjunctionBoundaryMetadata,
            typeof ctx.classifyAdverbialAdjunctionCandidate,
            typeof ctx.classifyAdverbialAdjunctionFalsePositive,
            typeof ctx.getAdverbialAdjunctionAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdverbialAdjunctionBoundaryMetadata();
    s.eq(
        "adverbial adjunction boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "adverbial-adjunction-boundary",
            lessons: [49, 50],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasLegacyAdverbioSurface: true,
                hasAdverbialNuclearBoundary: true,
                hasRelationalNncBoundary: true,
                hasPlaceGentilicBoundary: true,
                hasClauseAdjunctionAst: false,
                hasConfirmedClauseExamples: false,
                hasStaticAdjunctionData: false,
                changesAdverbioGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                changesRouteBehavior: false,
                treatsSingleGeneratedWordAsAdjunctionEvidence: false,
                treatsTranslationAsAdjunctionEvidence: false,
            },
            questionFields: [
                "principalClause",
                "adjoinedUnit",
                "semanticRelation",
                "adjoinedUnitType",
                "marking",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized adverbial relation remains unconfirmed without Nawat clause evidence",
        ctx.classifyAdverbialAdjunctionCandidate({
            principalClause: "unknown",
            adjoinedUnit: "translation label",
            semanticRelation: "purpose",
            adjoinedUnitType: "clause",
            falsePositiveSource: "translation-label",
        }),
        {
            kind: "adverbial-adjunction-candidate-classification",
            version: 1,
            principalClause: "unknown",
            adjoinedUnit: "translation label",
            candidate: "",
            semanticRelation: "purpose",
            adjoinedUnitType: "clause",
            marking: "",
            evidenceSource: "",
            falsePositiveSource: "translation-label",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adverbial-adjunction-needs-nawat-clause-evidence",
                "adverbial-adjunction-relation-recognized",
                "adverbial-adjunction-unit-recognized",
                "adverbial-adjunction-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "single generated word is not adverbial adjunction evidence",
        ctx.classifyAdverbialAdjunctionFalsePositive("single-generated-word"),
        {
            kind: "adverbial-adjunction-false-positive",
            version: 1,
            source: "single-generated-word",
            isAdverbialAdjunctionEvidence: false,
            isClauseAdjunctionAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["adverbial-adjunction-false-positive-source"],
            antiConflationRules: ctx.getAdverbialAdjunctionAntiConflationRules(),
        }
    );

    s.eq(
        "adverbial adjunction metadata carries anti-conflation rules",
        ctx.getAdverbialAdjunctionAntiConflationRules(),
        [
            "adverbial-adjunction boundary metadata is not generation",
            "legacy adverbio word output is not a clause-adjunction AST",
            "adverbial nuclear-clause metadata is not recursive adverbial adjunction",
            "relational and place/gentilic boundary metadata are not adjoined-clause evidence",
            "single generated NNC or VNC words do not prove adjoined-unit relations",
            "translations for time, place, manner, purpose, reason, or condition are not Nawat/Pipil clause evidence",
            "Andrews adverbial-adjunction categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("adverbial adjunction boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adverbial adjunction boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
