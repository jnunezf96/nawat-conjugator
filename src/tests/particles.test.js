"use strict";

/**
 * Tests for src/core/particles/particles.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("particles");

    s.eq(
        "Lesson 3 particle API is exported",
        [
            typeof ctx.getParticlePlacementFrames,
            typeof ctx.buildParticlePlacementMetadata,
            typeof ctx.classifyParticleCandidate,
            typeof ctx.buildParticleInventoryBoundaryMetadata,
        ],
        ["function", "function", "function", "function"]
    );

    s.eq(
        "particle placement frames are structural metadata only",
        ctx.getParticlePlacementFrames().map((frame) => ({
            id: frame.id,
            scope: frame.scope,
            hostLayer: frame.hostLayer,
            beforePredicate: frame.beforePredicate,
            afterPredicate: frame.afterPredicate,
        })),
        [
            { id: "clause-initial", scope: "clause-initial", hostLayer: "sentence", beforePredicate: true, afterPredicate: false },
            { id: "second-position", scope: "second-position", hostLayer: "sentence", beforePredicate: null, afterPredicate: null },
            { id: "pre-predicate", scope: "pre-predicate", hostLayer: "nuclear-clause", beforePredicate: true, afterPredicate: false },
            { id: "post-predicate", scope: "post-predicate", hostLayer: "nuclear-clause", beforePredicate: false, afterPredicate: true },
            { id: "enclitic", scope: "enclitic", hostLayer: "word-output", beforePredicate: false, afterPredicate: true },
        ]
    );

    s.eq(
        "particle candidate classification does not turn labels into evidence",
        ctx.classifyParticleCandidate("amo", {
            placementScope: "pre-predicate",
            functionScope: "negation",
        }),
        {
            kind: "particle-candidate-classification",
            version: 1,
            candidate: "amo",
            matched: false,
            status: "unconfirmed",
            placement: {
                id: "pre-predicate",
                label: "pre-predicate",
                scope: "pre-predicate",
                hostLayer: "nuclear-clause",
                beforePredicate: true,
                afterPredicate: false,
            },
            functionScope: "negation",
            generationAllowed: false,
            diagnostics: ["particle-candidate-unconfirmed"],
            placementMetadata: ctx.buildParticlePlacementMetadata({
                candidate: "amo",
                placementScope: "pre-predicate",
                functionScope: "negation",
                source: "candidate",
            }),
        }
    );

    const boundary = ctx.buildParticleInventoryBoundaryMetadata();
    s.eq(
        "particle inventory boundary records current placeholder status",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            confirmedParticles: boundary.confirmedParticles,
            generationAllowed: boundary.generationAllowed,
            boundaries: boundary.boundaries,
        },
        {
            kind: "particle-inventory-boundary",
            lesson: 3,
            status: "partial",
            confirmedParticles: [],
            generationAllowed: false,
            boundaries: {
                hasStaticParticleInventory: false,
                hasParticleGeneration: false,
                hasPlacementEngine: false,
                hasVisibleParticleMode: false,
                existingParticleModeIsPlaceholder: true,
            },
        }
    );

    s.eq(
        "particle metadata carries anti-conflation rules",
        ctx.getParticleAntiConflationRules(),
        [
            "particle placement metadata is not particle generation",
            "particle-looking string is not confirmed Nawat/Pipil particle evidence",
            "particle mode label is not a particle inventory",
            "preposed output segment is not a Lesson 3 particle engine",
            "topic/focus label is not supplementation",
            "Andrews particle categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("particle boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("particle boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const particleCandidate = ctx.classifyParticleCandidate("amo", {
        placementScope: "pre-predicate",
        functionScope: "negation",
    });
    const particleFrame = particleCandidate.grammarFrame;
    s.eq(
        "particle metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(particleFrame),
            routeFamily: particleFrame?.routeContract?.routeFamily || "",
            routeStage: particleFrame?.routeContract?.routeStage || "",
            generationAllowed: particleFrame?.routeContract?.generationAllowed,
            hostLayer: particleFrame?.nuclearClauseFrame?.hostLayer || "",
            andrewsRef: particleFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(particleCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "particle-placement",
            routeStage: "classify-candidate",
            generationAllowed: false,
            hostLayer: "nuclear-clause",
            andrewsRef: "Andrews Lesson 3",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
