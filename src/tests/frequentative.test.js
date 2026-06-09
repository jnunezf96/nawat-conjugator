"use strict";

/**
 * Tests for src/core/derivation/frequentative/frequentative.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("frequentative");

    s.eq(
        "Lesson 27 frequentative API is exported",
        [
            typeof ctx.buildFrequentativeBoundaryMetadata,
            typeof ctx.classifyFrequentativeCandidate,
            typeof ctx.classifyFrequentativeFalsePositive,
            typeof ctx.getFrequentativeAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildFrequentativeBoundaryMetadata();
    s.eq(
        "frequentative boundary is explicit and non-generative",
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
            kind: "frequentative-boundary",
            lesson: 27,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasFrequentativeGeneration: false,
                hasConfirmedFixtureData: false,
                reusesGenericReduplicationAsEvidence: false,
                changesExistingReduplicationHelpers: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "sourceStem",
                "frequentativeType",
                "reduplicationTarget",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "frequentative candidate classifier records categories without confirming forms",
        ctx.classifyFrequentativeCandidate({
            sourceStem: "nemi",
            candidate: "nenemi",
            frequentativeType: "ordinary",
            reduplicationTarget: "stem",
        }),
        {
            kind: "frequentative-candidate-classification",
            version: 1,
            sourceStem: "nemi",
            candidate: "nenemi",
            frequentativeType: "ordinary",
            reduplicationTarget: "stem",
            evidenceSource: "",
            falsePositiveSource: "unknown",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "frequentative-needs-nawat-evidence",
                "frequentative-unconfirmed",
            ],
            boundary,
        }
    );

    s.eq(
        "generic reduplication is classified as a false positive, not evidence",
        ctx.classifyFrequentativeFalsePositive("generic-reduplication"),
        {
            kind: "frequentative-false-positive",
            version: 1,
            source: "generic-reduplication",
            isFrequentativeEvidence: false,
            generationAllowed: false,
            diagnostics: ["frequentative-false-positive-source"],
            antiConflationRules: ctx.getFrequentativeAntiConflationRules(),
        }
    );

    s.eq(
        "frequentative metadata carries anti-conflation rules",
        ctx.getFrequentativeAntiConflationRules(),
        [
            "frequentative boundary metadata is not generation",
            "generic reduplication is not a frequentative derivation engine",
            "preterit reduplication diagnostics are not frequentative evidence",
            "ordinary NNC distributive reduplication is not VNC frequentative derivation",
            "patientive/adjectival reduplication is not VNC frequentative derivation",
            "Andrews frequentative categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("frequentative boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("frequentative boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const frequentativeCandidate = ctx.classifyFrequentativeCandidate({
        sourceStem: "nemi",
        candidate: "nenemi",
        frequentativeType: "ordinary",
        reduplicationTarget: "stem",
    });
    const frequentativeFrame = frequentativeCandidate.grammarFrame;
    s.eq(
        "frequentative metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(frequentativeFrame),
            routeFamily: frequentativeFrame?.routeContract?.routeFamily || "",
            routeStage: frequentativeFrame?.routeContract?.routeStage || "",
            generationAllowed: frequentativeFrame?.routeContract?.generationAllowed,
            sourceStem: frequentativeFrame?.stemFrame?.sourceStem || "",
            andrewsRef: frequentativeFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(frequentativeCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "frequentative",
            routeStage: "classify-candidate",
            generationAllowed: false,
            sourceStem: "nemi",
            andrewsRef: "Andrews Lesson 27",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
