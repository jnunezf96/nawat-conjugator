"use strict";

/**
 * Tests for src/core/nnc/place_gentilic/place_gentilic.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_place_gentilic");

    s.eq(
        "Lesson 48 place/gentilic NNC API is exported",
        [
            typeof ctx.buildPlaceGentilicNncBoundaryMetadata,
            typeof ctx.classifyPlaceGentilicNncCandidate,
            typeof ctx.classifyPlaceGentilicNncFalsePositive,
            typeof ctx.getPlaceGentilicNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildPlaceGentilicNncBoundaryMetadata();
    s.eq(
        "place/gentilic NNC boundary is explicit and non-generative",
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
            kind: "place-gentilic-nnc-boundary",
            lesson: 48,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasRelationalNncBoundary: true,
                hasPlaceNameNncGeneration: false,
                hasGentilicNncGeneration: false,
                hasStaticPlaceData: false,
                hasStaticGentilicData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesRelationalNncGeneration: false,
                changesNominalizationGeneration: false,
                changesRouteBehavior: false,
                treatsPlaceTranslationsAsEvidence: false,
                treatsProfessionLabelsAsEvidence: false,
            },
            questionFields: [
                "placeNameSource",
                "gentilicSource",
                "placeGentilicKind",
                "associatedPlace",
                "collectivity",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized place/gentilic category remains unconfirmed without Nawat evidence",
        ctx.classifyPlaceGentilicNncCandidate({
            candidate: "place translation",
            placeNameSource: "unknown",
            placeGentilicKind: "place-name",
            associatedPlace: "unknown",
            falsePositiveSource: "place-translation",
        }),
        {
            kind: "place-gentilic-nnc-candidate-classification",
            version: 1,
            candidate: "place translation",
            placeNameSource: "unknown",
            gentilicSource: "",
            placeGentilicKind: "place-name",
            associatedPlace: "unknown",
            collectivity: "",
            evidenceSource: "",
            falsePositiveSource: "place-translation",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "place-gentilic-nnc-needs-nawat-evidence",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "locative-temporal nominal output is not place-name NNC evidence",
        ctx.classifyPlaceGentilicNncFalsePositive("locative-temporal-nominal"),
        {
            kind: "place-gentilic-nnc-false-positive",
            version: 1,
            source: "locative-temporal-nominal",
            isPlaceNameNncEvidence: false,
            isGentilicNncEvidence: false,
            isCalendarNameEvidence: false,
            generationAllowed: false,
            diagnostics: ["place-gentilic-nnc-false-positive-source"],
            antiConflationRules: ctx.getPlaceGentilicNncAntiConflationRules(),
        }
    );

    s.eq(
        "place/gentilic NNC metadata carries anti-conflation rules",
        ctx.getPlaceGentilicNncAntiConflationRules(),
        [
            "place-name/gentilic NNC boundary metadata is not generation",
            "ordinary NNC fixtures are not place-name or gentilic fixture evidence",
            "open-stem ordinary NNC previews are not place-name or gentilic data",
            "locative-temporal nominal outputs are not place-name NNC evidence",
            "relational NNC boundary metadata is not place-name or gentilic evidence",
            "place, profession, or gentilic translations are not Nawat/Pipil form evidence",
            "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("place/gentilic NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("place/gentilic NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
