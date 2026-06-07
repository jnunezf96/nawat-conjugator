"use strict";

/**
 * Tests for src/core/nnc/nominalization/nominalization.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_nominalization");

    s.eq(
        "Lessons 35-39 nominalization boundary API is exported",
        [
            typeof ctx.buildNominalizationBoundaryMetadata,
            typeof ctx.classifyNominalizationBoundaryCandidate,
            typeof ctx.classifyNominalizationFalsePositive,
            typeof ctx.getNominalizationBoundaryAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildNominalizationBoundaryMetadata();
    s.eq(
        "nominalization boundary is explicit, partial, and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            grammarAuthority: boundary.grammarAuthority,
            orthographyAuthority: boundary.orthographyAuthority,
            targetAuthority: boundary.targetAuthority,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "nominalization-boundary",
            lessons: [35, 36, 37, 38, 39],
            status: "partial",
            grammarAuthority: "Andrews PDF Lessons 35-39",
            orthographyAuthority: "Modern Nawat/Pipil orthography and confirmed Nawat forms",
            targetAuthority: "Andrews grammar rules with Nawat/Pipil orthographic realization",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasGeneratedNominalSurfaces: true,
                hasGeneratedSLisActionNominalSurfaces: true,
                hasNominalizationProfile: true,
                hasPatientiveFamilyProfile: true,
                hasOwnerhoodGeneration: false,
                hasDeverbalLizZGeneration: false,
                hasFullPatientiveFamilyGeneration: false,
                hasStaticNominalizedVncData: false,
                changesGeneratedSurfaces: false,
                changesOrdinaryNncGeneration: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "nominalizationKind",
                "sourceVnc",
                "stemUse",
                "semanticRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "generated patientivo surface remains unconfirmed full patientive evidence",
        ctx.classifyNominalizationBoundaryCandidate({
            candidate: "tamachti",
            nominalizationKind: "patientive-family",
            sourceVnc: "-(mati)",
            semanticRole: "patient/result",
            hasNominalizationProfile: true,
            hasPatientiveFamilyProfile: true,
            falsePositiveSource: "patientive-family-profile",
        }),
        {
            kind: "nominalization-boundary-candidate-classification",
            version: 1,
            candidate: "tamachti",
            nominalizationKind: "patientive-family",
            sourceVnc: "-(mati)",
            stemUse: "",
            semanticRole: "patient/result",
            evidenceSource: "",
            falsePositiveSource: "patientive-family-profile",
            hasNominalizationProfile: true,
            hasPatientiveFamilyProfile: true,
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "nominalization-needs-nawat-evidence",
                "nominalization-category-recognized",
                "nominalization-profile-is-metadata-only",
                "patientive-family-profile-is-partial",
                "nominalization-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "ownerhood category is recognized but requires Nawat/Pipil evidence",
        ctx.classifyNominalizationBoundaryCandidate({
            candidate: "ownerhood candidate",
            nominalizationKind: "ownerhood",
            stemUse: "general-use",
            semanticRole: "owner",
        }).diagnostics,
        [
            "nominalization-needs-nawat-evidence",
            "nominalization-category-recognized",
            "nominalization-profile-absent",
            "patientive-family-profile-absent",
            "nominalization-unconfirmed",
        ]
    );

    s.eq(
        "Andrews examples remain structural false positives for Nawat forms",
        ctx.classifyNominalizationFalsePositive("andrews-example"),
        {
            kind: "nominalization-false-positive",
            version: 1,
            source: "andrews-example",
            isNominalizationEvidence: false,
            isOwnerhoodEvidence: false,
            isDeverbalLizZEvidence: false,
            isFullPatientiveFamilyEvidence: false,
            generationAllowed: false,
            diagnostics: ["nominalization-false-positive-source"],
            antiConflationRules: ctx.getNominalizationBoundaryAntiConflationRules(),
        }
    );

    s.ok(
        "nominalization anti-conflation rules reject generated-surface completion claims",
        ctx.getNominalizationBoundaryAntiConflationRules()
            .some((rule) => rule.includes("not complete Lessons 35-39 coverage"))
    );

    return s;
}

module.exports = { run };
