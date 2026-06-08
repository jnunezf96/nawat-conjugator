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
            typeof ctx.buildAdverbialNuclearClauseFrame,
        ],
        ["function", "function", "function", "function", "function"]
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
                hasAdverbialNuclearClauseFrame: true,
                hasFullAdverbialNuclearClauseEngine: false,
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
        "Andrews 44.1-44.2 adverbial nuclear clause frame preserves generated VNC adverbio output",
        ctx.buildAdverbialNuclearClauseFrame({
            source: "mati",
            sourceStem: "mati",
            finalStem: "mati",
            analysisStem: "mati",
            sourceClauseKind: "vnc",
            sourceValency: "intransitive",
            adverbialKind: "vnc-adverbial",
            adverbialDegree: "first-degree",
            semanticDomain: "manner",
            tense: "pasado-remoto-adverbio-activo",
            legacyTense: "pasado-remoto-adverbio-activo",
            surfaceForms: ["matka", "matika"],
            evidenceSource: "test-generated-output-contract",
        }),
        {
            kind: "adverbial-nuclear-clause-frame",
            version: 1,
            lesson: 44,
            structuralSource: "Andrews 44.1-44.4",
            targetAuthority: "Nawat/Pipil generated output supplied to this frame",
            supported: true,
            confirmed: false,
            source: {
                raw: "mati",
                clauseKind: "vnc",
                adverbialKind: "vnc-adverbial",
                stem: "mati",
                finalStem: "mati",
                analysisStem: "mati",
                valency: "intransitive",
                objectPrefix: "",
                baseObjectPrefix: "",
                tense: "pasado-remoto-adverbio-activo",
            },
            adverbialization: {
                degree: "first-degree",
                semanticDomain: "manner",
                subjectPronoun: {
                    kind: "adverbialized-subject-pronoun",
                    lessonRef: "Andrews 44.2",
                    degree: "first-degree",
                    sourceClauseKind: "vnc",
                    locus: "subject-pronoun",
                    num1: {
                        changesSoundedFillerToSilent: false,
                        description: "first-degree adverbialization has no required subject-pronoun shape change",
                    },
                    constraints: {
                        vncAllowsOnlyFirstDegree: true,
                        possessiveNncAllowsOnlyFirstDegree: true,
                        absolutiveNncIsIdiosyncratic: true,
                    },
                },
                lexicalized: false,
                legacyRoute: true,
            },
            output: {
                surfaceForms: ["matka", "matika"],
                primarySurface: "matka",
                preservesGeneratedSurface: true,
            },
            generationContract: {
                routeGeneratesSurface: true,
                frameGeneratesSurface: false,
                changesSurfaceForms: false,
                newWordGenerationAllowed: false,
            },
            evidenceSource: "test-generated-output-contract",
            diagnostics: [],
            boundary: ctx.buildAdverbialNuclearBoundaryMetadata(),
        }
    );

    s.eq(
        "Andrews 44.2 blocks second-degree adverbialization on VNC source frames",
        (() => {
            const frame = ctx.buildAdverbialNuclearClauseFrame({
                source: "mati",
                surfaceForms: ["matka"],
                sourceClauseKind: "vnc",
                adverbialDegree: "second-degree",
                semanticDomain: "manner",
            });
            return {
                supported: frame.supported,
                degree: frame.adverbialization.degree,
                num1Changes: frame.adverbialization.subjectPronoun.num1.changesSoundedFillerToSilent,
                diagnostics: frame.diagnostics,
            };
        })(),
        {
            supported: false,
            degree: "second-degree",
            num1Changes: true,
            diagnostics: ["adverbial-nuclear-source-permits-first-degree-only"],
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
            "adverbialNuclearClauseFrame describes existing generated output; it does not create new Nawat word forms",
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
