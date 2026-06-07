"use strict";

/**
 * Tests for src/core/nnc/adjectival/adjectival.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_adjectival");

    s.eq(
        "Lessons 40-41 adjectival NNC function boundary API is exported",
        [
            typeof ctx.buildAdjectivalNncFunctionBoundaryMetadata,
            typeof ctx.classifyAdjectivalNncFunctionCandidate,
            typeof ctx.classifyAdjectivalNncFalsePositive,
            typeof ctx.getAdjectivalNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdjectivalNncFunctionBoundaryMetadata();
    s.eq(
        "adjectival NNC function boundary is explicit and non-generative",
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
            kind: "adjectival-nnc-function-boundary",
            lessons: [40, 41],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveModeOutputs: true,
                hasNominalizationProfileAdjectivalFunction: true,
                hasAdjectivalNncGeneration: false,
                hasModificationAst: false,
                hasConfirmedModifierHeadExamples: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsAdjetivoOutputAsFullLessonEvidence: false,
            },
            questionFields: [
                "functionKind",
                "sourceCategory",
                "predicateSurface",
                "adjectivalRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "adjetivo route output remains unconfirmed full adjectival NNC evidence",
        ctx.classifyAdjectivalNncFunctionCandidate({
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            hasNominalizationProfile: true,
            falsePositiveSource: "adjetivo-route",
        }),
        {
            kind: "adjectival-nnc-function-candidate-classification",
            version: 1,
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            evidenceSource: "",
            falsePositiveSource: "adjetivo-route",
            hasNominalizationProfile: true,
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adjectival-nnc-needs-nawat-evidence",
                "adjectival-nnc-function-recognized",
                "nominalization-profile-adjectival-function-is-metadata",
                "adjectival-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "nominalization profile remains explanatory metadata only",
        ctx.classifyAdjectivalNncFalsePositive("nominalization-profile"),
        {
            kind: "adjectival-nnc-false-positive",
            version: 1,
            source: "nominalization-profile",
            isAdjectivalNncEvidence: false,
            isAdjectivalFunctionEvidence: false,
            isModifierHeadEvidence: false,
            isAdjectivalParadigmEvidence: false,
            isModificationEvidence: false,
            isSupplementationEvidence: false,
            isTopicEvidence: false,
            generationAllowed: false,
            diagnostics: ["adjectival-nnc-false-positive-source"],
            antiConflationRules: ctx.getAdjectivalNncAntiConflationRules(),
        }
    );

    s.ok(
        "adjectival NNC rules separate function boundary from modification AST",
        ctx.getAdjectivalNncAntiConflationRules()
            .some((rule) => rule.includes("separate from Lessons 42-43 modification AST"))
    );
    s.no("adjectival NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adjectival NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
