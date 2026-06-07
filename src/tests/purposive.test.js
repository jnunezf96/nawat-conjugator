"use strict";

/**
 * Tests for src/core/vnc/purposive/purposive.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("purposive");

    s.eq(
        "Lesson 29 purposive/directional API is exported",
        [
            typeof ctx.buildPurposiveDirectionalBoundaryMetadata,
            typeof ctx.classifyPurposiveDirectionalCandidate,
            typeof ctx.classifyPurposiveDirectionalFalsePositive,
            typeof ctx.getPurposiveDirectionalAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildPurposiveDirectionalBoundaryMetadata();
    s.eq(
        "purposive/directional boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            knownDirectionalPrefixes: boundary.knownDirectionalPrefixes,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "purposive-directional-boundary",
            lesson: 29,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            knownDirectionalPrefixes: ["wal", "un"],
            boundaries: {
                hasDirectionalPrefixMechanics: true,
                hasPurposiveGeneration: false,
                hasConfirmedPurposiveFixtureData: false,
                changesDirectionalGeneration: false,
                changesVncGeneration: false,
                treatsDirectionalPrefixAsPurposiveEvidence: false,
            },
            questionFields: [
                "sourceStem",
                "directionalPrefix",
                "relation",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized directional prefix remains unconfirmed purposive evidence",
        ctx.classifyPurposiveDirectionalCandidate({
            sourceStem: "ya",
            candidate: "[wal]/ya",
            directionalPrefix: "wal",
            relation: "directional",
        }),
        {
            kind: "purposive-directional-candidate-classification",
            version: 1,
            sourceStem: "ya",
            candidate: "[wal]/ya",
            directionalPrefix: "wal",
            hasKnownDirectionalPrefix: true,
            relation: "directional",
            evidenceSource: "",
            falsePositiveSource: "unknown",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "purposive-directional-needs-nawat-evidence",
                "directional-prefix-recognized",
                "purposive-directional-unconfirmed",
            ],
            boundary,
        }
    );

    s.eq(
        "parser bracket syntax is classified as false positive evidence",
        ctx.classifyPurposiveDirectionalFalsePositive("parser-bracket-syntax"),
        {
            kind: "purposive-directional-false-positive",
            version: 1,
            source: "parser-bracket-syntax",
            isPurposiveEvidence: false,
            generationAllowed: false,
            diagnostics: ["purposive-directional-false-positive-source"],
            antiConflationRules: ctx.getPurposiveDirectionalAntiConflationRules(),
        }
    );

    s.eq(
        "purposive/directional metadata carries anti-conflation rules",
        ctx.getPurposiveDirectionalAntiConflationRules(),
        [
            "directional prefix mechanics are not purposive VNC generation",
            "bracketed directional parser syntax is not purposive evidence",
            "composer directional controls are not confirmed purposive forms",
            "purpose translations are not Nawat/Pipil fixture evidence",
            "compound parsing is not purposive VNC generation",
            "Andrews purposive categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("purposive/directional boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("purposive/directional boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
