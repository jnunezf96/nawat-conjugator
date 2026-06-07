"use strict";

/**
 * Tests for src/core/clause/conjunction/conjunction.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("conjunction");

    s.eq(
        "Lesson 52 conjunction API is exported",
        [
            typeof ctx.buildConjunctionClauseBoundaryMetadata,
            typeof ctx.classifyConjunctionClauseCandidate,
            typeof ctx.classifyConjunctionClauseFalsePositive,
            typeof ctx.getConjunctionClauseAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildConjunctionClauseBoundaryMetadata();
    s.eq(
        "conjunction boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "conjunction-clause-boundary",
            lesson: 52,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasParserSeparators: true,
                hasConjunctionAst: false,
                hasConfirmedClauseExamples: false,
                hasStaticConjunctionData: false,
                changesParserBehavior: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesRouteBehavior: false,
                treatsParserSeparatorsAsConjunctionEvidence: false,
                treatsTranslationsAsConjunctionEvidence: false,
            },
            questionFields: [
                "conjuncts",
                "marker",
                "conjunctionRelation",
                "unitType",
                "parallelism",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized conjunction relation remains unconfirmed without Nawat clause evidence",
        ctx.classifyConjunctionClauseCandidate({
            conjuncts: ["left", "right"],
            marker: "translation",
            conjunctionRelation: "correlative",
            unitType: "clause",
            falsePositiveSource: "conjunction-translation",
        }),
        {
            kind: "conjunction-clause-candidate-classification",
            version: 1,
            conjuncts: ["left", "right"],
            marker: "translation",
            candidate: "",
            conjunctionRelation: "correlative",
            unitType: "clause",
            parallelism: "",
            evidenceSource: "",
            falsePositiveSource: "conjunction-translation",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "conjunction-clause-needs-nawat-clause-evidence",
                "conjunction-clause-relation-recognized",
                "conjunction-clause-unit-recognized",
                "conjunction-clause-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "parser separators are not conjunction evidence",
        ctx.classifyConjunctionClauseFalsePositive("parser-separator"),
        {
            kind: "conjunction-clause-false-positive",
            version: 1,
            source: "parser-separator",
            isConjunctionEvidence: false,
            isConjunctionAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["conjunction-clause-false-positive-source"],
            antiConflationRules: ctx.getConjunctionClauseAntiConflationRules(),
        }
    );

    s.eq(
        "conjunction metadata carries anti-conflation rules",
        ctx.getConjunctionClauseAntiConflationRules(),
        [
            "conjunction boundary metadata is not generation",
            "parser separators and slash variants are not conjunction AST evidence",
            "CSV alternants are not clause-level conjunction evidence",
            "particle or translation labels are not Nawat/Pipil conjunction evidence",
            "single generated words do not prove marked, unmarked, correlative, or parallel conjunction",
            "Andrews conjunction categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("conjunction boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("conjunction boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
