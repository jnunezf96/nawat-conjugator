"use strict";

/**
 * Tests for src/core/vnc/honorific_pejorative/honorific_pejorative.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("honorific_pejorative");

    s.eq(
        "Lesson 33 honorific/pejorative API is exported",
        [
            typeof ctx.buildHonorificPejorativeBoundaryMetadata,
            typeof ctx.classifyHonorificPejorativeCandidate,
            typeof ctx.classifyHonorificPejorativeFalsePositive,
            typeof ctx.getHonorificPejorativeAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildHonorificPejorativeBoundaryMetadata();
    s.eq(
        "honorific/pejorative VNC boundary is explicit and non-generative",
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
            kind: "honorific-pejorative-boundary",
            lesson: 33,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasHonorificGeneration: false,
                hasPejorativeGeneration: false,
                hasConfirmedFixtureData: false,
                changesCausativeGeneration: false,
                changesApplicativeGeneration: false,
                changesNonactiveGeneration: false,
                changesVncGeneration: false,
                treatsTranslationToneAsEvidence: false,
            },
            questionFields: [
                "sourceStem",
                "polarity",
                "morphologicalStrategy",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized honorific category remains unconfirmed without Nawat evidence",
        ctx.classifyHonorificPejorativeCandidate({
            sourceStem: "palehuia",
            candidate: "polite translation label",
            polarity: "honorific",
            falsePositiveSource: "polite-translation",
        }),
        {
            kind: "honorific-pejorative-candidate-classification",
            version: 1,
            sourceStem: "palehuia",
            candidate: "polite translation label",
            polarity: "honorific",
            morphologicalStrategy: "",
            evidenceSource: "",
            falsePositiveSource: "polite-translation",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "honorific-pejorative-needs-nawat-evidence",
                "honorific-pejorative-category-recognized",
                "honorific-pejorative-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "ordinary causative derivation is classified as false positive evidence",
        ctx.classifyHonorificPejorativeFalsePositive("ordinary-causative"),
        {
            kind: "honorific-pejorative-false-positive",
            version: 1,
            source: "ordinary-causative",
            isHonorificEvidence: false,
            isPejorativeEvidence: false,
            generationAllowed: false,
            diagnostics: ["honorific-pejorative-false-positive-source"],
            antiConflationRules: ctx.getHonorificPejorativeAntiConflationRules(),
        }
    );

    s.eq(
        "honorific/pejorative metadata carries anti-conflation rules",
        ctx.getHonorificPejorativeAntiConflationRules(),
        [
            "honorific/pejorative boundary metadata is not generation",
            "polite or insulting translation labels are not Nawat/Pipil fixture evidence",
            "ordinary causative/applicative derivation is not honorific or pejorative VNC generation",
            "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation",
            "person or agreement labels are not honorific or pejorative VNC evidence",
            "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("honorific/pejorative boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("honorific/pejorative boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
