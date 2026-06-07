"use strict";

/**
 * Tests for src/core/sentence/sentence.js
 */

const { createSuite } = require("./runner");

function compactLayer(layer) {
    return layer && {
        kind: layer.kind,
        version: layer.version,
        clauseKind: layer.clauseKind,
        generationAllowed: layer.generationAllowed,
        slots: {
            polarity: layer.slots?.polarity,
            question: layer.slots?.question,
            emphasis: layer.slots?.emphasis,
            mood: layer.slots?.mood,
        },
        boundaries: layer.boundaries,
        diagnostics: layer.diagnostics,
    };
}

function run(ctx) {
    const s = createSuite("sentence");

    s.eq(
        "Lesson 8-10 sentence API is exported",
        [
            typeof ctx.buildSentenceLayerMetadata,
            typeof ctx.buildBasicSentenceBoundaryMetadata,
            typeof ctx.classifySentenceCandidate,
            typeof ctx.getSentenceLayerAntiConflationRules,
            typeof ctx.buildGeneratedSentenceLayerMetadata,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const vncShell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "vnc",
        subject: { prefix: "ni", suffix: "" },
        predicate: { stem: "nemi" },
        tenseValue: "presente",
    });
    s.eq(
        "sentence layer records negation question emphasis and mood slots without generation",
        compactLayer(ctx.buildSentenceLayerMetadata({
            nuclearClauseShell: vncShell,
            polarity: "negative",
            questionType: "yes-no",
            emphasisType: "focus",
            moodScope: "wish",
            particleCandidates: {
                negation: "amo",
                question: "?",
                emphasis: "",
                mood: "",
            },
        })),
        {
            kind: "sentence-layer-metadata",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
            slots: {
                polarity: {
                    slot: "negation",
                    value: "negative",
                    scope: "sentence",
                    particleCandidate: "amo",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                question: {
                    slot: "question",
                    value: "yes-no",
                    scope: "sentence",
                    particleCandidate: "?",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                emphasis: {
                    slot: "emphasis",
                    value: "focus",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                mood: {
                    slot: "sentence-mood",
                    value: "wish",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
            },
            boundaries: {
                isSentenceEngine: false,
                isWordGeneration: false,
                changesFiniteVncOutput: false,
                hasConfirmedParticleInventory: false,
                finiteMoodIsSentenceSemantics: false,
            },
            diagnostics: [
                "sentence-layer-diagnostic-only",
                "sentence-layer-needs-confirmed-nawat-evidence",
            ],
        }
    );
    s.eq(
        "generated sentence layer is explicit opt-in and wraps the nuclear clause shell",
        compactLayer(ctx.buildGeneratedSentenceLayerMetadata({
            override: {
                sentenceLayer: {
                    enabled: true,
                    polarity: "negative",
                    questionType: "yes-no",
                    moodScope: "command",
                },
            },
            tense: "imperativo",
            nuclearClauseShell: vncShell,
        })),
        {
            kind: "sentence-layer-metadata",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
            slots: {
                polarity: {
                    slot: "negation",
                    value: "negative",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                question: {
                    slot: "question",
                    value: "yes-no",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                emphasis: {
                    slot: "emphasis",
                    value: "none",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                mood: {
                    slot: "sentence-mood",
                    value: "command",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
            },
            boundaries: {
                isSentenceEngine: false,
                isWordGeneration: false,
                changesFiniteVncOutput: false,
                hasConfirmedParticleInventory: false,
                finiteMoodIsSentenceSemantics: false,
            },
            diagnostics: [
                "sentence-layer-diagnostic-only",
                "sentence-layer-needs-confirmed-nawat-evidence",
            ],
        }
    );
    s.eq(
        "generated sentence layer stays absent without explicit opt-in",
        ctx.buildGeneratedSentenceLayerMetadata({
            override: {},
            tense: "imperativo",
            nuclearClauseShell: vncShell,
        }),
        null
    );

    const boundary = ctx.buildBasicSentenceBoundaryMetadata({
        moodScope: "admonition",
    });
    s.eq(
        "basic sentence boundary keeps finite VNC forms separate from sentence semantics",
        {
            kind: boundary.kind,
            lessonRange: boundary.lessonRange,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            supportedFiniteFormsRemainInVnc: boundary.supportedFiniteFormsRemainInVnc,
            unsupportedBehavior: boundary.unsupportedBehavior,
            moodValue: boundary.sentenceLayer.slots.mood.value,
        },
        {
            kind: "basic-sentence-boundary",
            lessonRange: "8-10",
            status: "partial",
            generationAllowed: false,
            supportedFiniteFormsRemainInVnc: true,
            unsupportedBehavior: [
                "negation particle generation",
                "question particle generation",
                "emphasis particle generation",
                "sentence-level optative semantics",
                "sentence-level admonitive semantics",
            ],
            moodValue: "admonition",
        }
    );

    s.eq(
        "sentence candidate classification is diagnostic-only",
        ctx.classifySentenceCandidate({
            text: "amo ni nemi?",
            polarity: "negative",
            questionType: "yes-no",
        }),
        {
            kind: "sentence-candidate-classification",
            version: 1,
            text: "amo ni nemi?",
            matched: false,
            status: "unconfirmed",
            sentenceLayer: ctx.buildSentenceLayerMetadata({
                polarity: "negative",
                questionType: "yes-no",
                emphasisType: "unknown",
                moodScope: "unknown",
                source: "candidate",
            }),
            generationAllowed: false,
            diagnostics: ["sentence-candidate-unconfirmed"],
        }
    );

    s.eq(
        "sentence layer carries anti-conflation rules",
        ctx.getSentenceLayerAntiConflationRules(),
        [
            "sentence layer metadata is not generation",
            "finite optative/admonitive form is not full sentence mood semantics",
            "negation/question/emphasis labels are not Nawat/Pipil particle evidence",
            "VNC output is not a complete sentence",
            "topic and supplementation require separate clause metadata",
            "Andrews sentence categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("sentence boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("sentence boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
