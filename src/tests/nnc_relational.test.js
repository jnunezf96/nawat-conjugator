"use strict";

/**
 * Tests for src/core/nnc/relational/relational.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_relational");

    s.eq(
        "Lessons 45-47 relational NNC API is exported",
        [
            typeof ctx.buildRelationalNncBoundaryMetadata,
            typeof ctx.classifyRelationalNncCandidate,
            typeof ctx.classifyRelationalNncFalsePositive,
            typeof ctx.getRelationalNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildRelationalNncBoundaryMetadata();
    s.eq(
        "relational NNC boundary is explicit and non-generative",
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
            kind: "relational-nnc-boundary",
            lessons: [45, 46, 47],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasRelationalNncGeneration: false,
                hasStaticRelationalData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesNominalizationGeneration: false,
                changesRouteBehavior: false,
                treatsTranslationAsRelationalEvidence: false,
            },
            questionFields: [
                "relationalStem",
                "relationalKind",
                "relationalOption",
                "governedArgument",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized relational category remains unconfirmed without Nawat evidence",
        ctx.classifyRelationalNncCandidate({
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "2",
            governedArgument: "unknown",
            falsePositiveSource: "preposition-translation",
        }),
        {
            kind: "relational-nnc-candidate-classification",
            version: 1,
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "option-two",
            governedArgument: "unknown",
            evidenceSource: "",
            falsePositiveSource: "preposition-translation",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "relational-nnc-needs-nawat-evidence",
                "relational-nnc-kind-recognized",
                "relational-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "locative-temporal nominal output is classified as false positive relational evidence",
        ctx.classifyRelationalNncFalsePositive("locative-temporal-nominal"),
        {
            kind: "relational-nnc-false-positive",
            version: 1,
            source: "locative-temporal-nominal",
            isRelationalNncEvidence: false,
            isPlaceNameEvidence: false,
            isGentilicEvidence: false,
            generationAllowed: false,
            diagnostics: ["relational-nnc-false-positive-source"],
            antiConflationRules: ctx.getRelationalNncAntiConflationRules(),
        }
    );

    s.eq(
        "relational NNC metadata carries anti-conflation rules",
        ctx.getRelationalNncAntiConflationRules(),
        [
            "relational NNC boundary metadata is not generation",
            "ordinary NNC fixtures are not relational NNC fixture evidence",
            "open-stem ordinary NNC previews are not relational nounstem data",
            "locative-temporal nominal outputs are not full relational NNC options",
            "preposition or place translations are not Nawat/Pipil relational form evidence",
            "Andrews relational categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("relational NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("relational NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
