"use strict";

/**
 * Tests for src/core/nnc/numerals/numerals.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_numerals");

    s.eq(
        "Lesson 34 and Appendix D numeral NNC API is exported",
        [
            typeof ctx.buildNumeralNncBoundaryMetadata,
            typeof ctx.classifyNumeralNncCandidate,
            typeof ctx.classifyNumeralNncFalsePositive,
            typeof ctx.getNumeralNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildNumeralNncBoundaryMetadata();
    s.eq(
        "numeral NNC boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            appendices: boundary.appendices,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "numeral-nnc-boundary",
            lesson: 34,
            appendices: ["D"],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasNumeralNncGeneration: false,
                hasStaticNumberData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesNncFormulaSlots: false,
                treatsUiNumberLabelsAsEvidence: false,
            },
            questionFields: [
                "numeralBase",
                "numeralKind",
                "nncRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized cardinal category remains unconfirmed without Nawat evidence",
        ctx.classifyNumeralNncCandidate({
            candidate: "number label",
            numeralBase: "1",
            numeralKind: "cardinal",
            falsePositiveSource: "ui-number-label",
        }),
        {
            kind: "numeral-nnc-candidate-classification",
            version: 1,
            candidate: "number label",
            numeralBase: "1",
            numeralKind: "cardinal",
            nncRole: "",
            evidenceSource: "",
            falsePositiveSource: "ui-number-label",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "numeral-nnc-needs-nawat-evidence",
                "numeral-nnc-category-recognized",
                "numeral-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "ordinary NNC open stems are classified as false positive numeral evidence",
        ctx.classifyNumeralNncFalsePositive("ordinary-nnc-open-stem"),
        {
            kind: "numeral-nnc-false-positive",
            version: 1,
            source: "ordinary-nnc-open-stem",
            isNumeralNncEvidence: false,
            isNumberLexemeEvidence: false,
            generationAllowed: false,
            diagnostics: ["numeral-nnc-false-positive-source"],
            antiConflationRules: ctx.getNumeralNncAntiConflationRules(),
        }
    );

    s.eq(
        "numeral NNC metadata carries anti-conflation rules",
        ctx.getNumeralNncAntiConflationRules(),
        [
            "numeral NNC boundary metadata is not generation",
            "ordinary NNC open-stem output is not numeral NNC fixture evidence",
            "UI number labels are not Nawat/Pipil numeral data",
            "Appendix D headings are not fixture cells",
            "English or Spanish number translations are not Nawat/Pipil form evidence",
            "Andrews numeral categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("numeral NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("numeral NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
