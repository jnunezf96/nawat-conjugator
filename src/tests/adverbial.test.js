"use strict";

/**
 * Tests for src/core/clause/adverbial/adverbial.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("adverbial");

    s.eq(
        "Lesson 44 adverbial nuclear API is exported",
        [
            typeof ctx.buildAdverbialNuclearBoundaryMetadata,
            typeof ctx.classifyAdverbialNuclearCandidate,
            typeof ctx.classifyAdverbialNuclearFalsePositive,
            typeof ctx.getAdverbialNuclearAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdverbialNuclearBoundaryMetadata();
    s.eq(
        "adverbial nuclear boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            knownLegacyAdverbioTenses: boundary.knownLegacyAdverbioTenses,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "adverbial-nuclear-boundary",
            lesson: 44,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            knownLegacyAdverbioTenses: ["pasado-remoto-adverbio-activo"],
            boundaries: {
                hasLegacyAdverbioSurface: true,
                hasAdverbialNuclearClauseEngine: false,
                hasAdverbialNncGeneration: false,
                hasAdverbialVncGeneration: false,
                hasStaticAdverbialData: false,
                changesAdverbioGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsLegacyAdverbioSurfaceAsFullLesson44Evidence: false,
            },
            questionFields: [
                "source",
                "adverbialKind",
                "adverbialDegree",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "legacy adverbio tense remains unconfirmed full Lesson 44 evidence",
        ctx.classifyAdverbialNuclearCandidate({
            source: "(mati)",
            candidate: "matka",
            tense: "pasado-remoto-adverbio-activo",
            adverbialKind: "manner-surface",
            falsePositiveSource: "legacy-adverbio-surface",
        }),
        {
            kind: "adverbial-nuclear-candidate-classification",
            version: 1,
            source: "(mati)",
            candidate: "matka",
            tense: "pasado-remoto-adverbio-activo",
            hasKnownLegacyAdverbioTense: true,
            adverbialKind: "manner-surface",
            adverbialDegree: "",
            evidenceSource: "",
            falsePositiveSource: "legacy-adverbio-surface",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adverbial-nuclear-needs-nawat-evidence",
                "legacy-adverbio-surface-recognized",
                "adverbial-nuclear-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "adverb translation is classified as false positive evidence",
        ctx.classifyAdverbialNuclearFalsePositive("adverb-translation"),
        {
            kind: "adverbial-nuclear-false-positive",
            version: 1,
            source: "adverb-translation",
            isAdverbialNuclearEvidence: false,
            isAdverbialNncEvidence: false,
            isAdverbialVncEvidence: false,
            generationAllowed: false,
            diagnostics: ["adverbial-nuclear-false-positive-source"],
            antiConflationRules: ctx.getAdverbialNuclearAntiConflationRules(),
        }
    );

    s.eq(
        "adverbial nuclear metadata carries anti-conflation rules",
        ctx.getAdverbialNuclearAntiConflationRules(),
        [
            "adverbial nuclear-clause boundary metadata is not generation",
            "legacy adverbio word output is not a full Lesson 44 engine",
            "adverb translations are not Nawat/Pipil adverbial-clause evidence",
            "particle-looking labels are not particle or adverbial NNC fixture evidence",
            "ordinary NNC/VNC outputs are not clause-level adverbialization evidence",
            "Andrews adverbial categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("adverbial nuclear boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adverbial nuclear boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
