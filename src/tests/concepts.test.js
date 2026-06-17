"use strict";

/**
 * Tests for src/core/concepts/concepts.js
 */

const { createSuite } = require("./runner");

function compactConcept(concept) {
    return concept && {
        id: concept.id,
        lesson: concept.lesson,
        kind: concept.kind,
        label: concept.label,
        notationRole: concept.notationRole,
        appliesTo: concept.appliesTo,
        generationAllowed: concept.generationAllowed,
    };
}

function run(ctx) {
    const s = createSuite("concepts");

    s.eq(
        "Lesson 1 concept API is exported",
        [
            typeof ctx.getConceptRegistry,
            typeof ctx.getConceptById,
            typeof ctx.classifyConceptToken,
            typeof ctx.buildConceptGlossaryMetadata,
            typeof ctx.getNuclearClauseTerminology,
            typeof ctx.buildConceptGlossaryDisplayModel,
        ],
        ["function", "function", "function", "function", "function", "function"]
    );

    s.eq(
        "concept registry records Lesson 1 notation and hierarchy without generation",
        {
            kind: ctx.getConceptRegistry({ lesson: 1 }).kind,
            version: ctx.getConceptRegistry({ lesson: 1 }).version,
            generationAllowed: ctx.getConceptRegistry({ lesson: 1 }).generationAllowed,
            conceptIds: ctx.getConceptRegistry({ lesson: 1 }).concepts.map((concept) => concept.id),
        },
        {
            kind: "concept-registry",
            version: 1,
            generationAllowed: false,
            conceptIds: [
                "word-output",
                "nuclear-clause",
                "vnc",
                "nnc",
                "type-level",
                "token-level",
                "instance-level",
                "formula-boundary",
                "predicate-boundary",
                "morpheme",
                "morph",
                "form",
                "root",
                "stem",
                "stock",
                "major-morpheme",
                "minor-morpheme",
                "affix",
                "derivational-affix",
                "inflectional-affix",
                "subject-person-slot",
                "subject-number-connector-slot",
                "predicate-stem-slot",
                "tense-position",
            ],
        }
    );

    s.eq(
        "Lesson 1 glossary uses Spanish CN/CNV/CNN terminology",
        ctx.getNuclearClauseTerminology(),
        {
            nc: {
                english: "nuclear clause",
                spanish: "cláusula nuclear",
                abbreviation: "CN",
                conceptId: "nuclear-clause",
            },
            vnc: {
                english: "verbal nuclear clause",
                spanish: "cláusula nuclear verbal",
                abbreviation: "CNV",
                conceptId: "vnc",
            },
            nnc: {
                english: "nominal nuclear clause",
                spanish: "cláusula nuclear nominal",
                abbreviation: "CNN",
                conceptId: "nnc",
            },
        }
    );

    s.eq(
        "concept lookup distinguishes NNC subject number connector as notation",
        compactConcept(ctx.getConceptById("subject-number-connector-slot")),
        {
            id: "subject-number-connector-slot",
            lesson: 1,
            kind: "notation",
            label: "num1-num2",
            notationRole: "subject-number-connector-slot",
            appliesTo: ["NNC"],
            generationAllowed: false,
        }
    );

    s.eq(
        "concept token classifier maps formula tokens without treating them as surfaces",
        {
            stem: ctx.classifyConceptToken("STEM"),
            nnc: ctx.classifyConceptToken("NNC"),
            unknown: ctx.classifyConceptToken("tekit"),
        },
        {
            stem: {
                kind: "concept-token-classification",
                version: 1,
                token: "STEM",
                normalized: "stem",
                matched: true,
                conceptId: "predicate-stem-slot",
                notationRole: "predicate-stem-slot",
                concept: ctx.getConceptById("predicate-stem-slot"),
                generationAllowed: false,
                diagnostics: ["concept-token-diagnostic-only"],
            },
            nnc: {
                kind: "concept-token-classification",
                version: 1,
                token: "NNC",
                normalized: "nnc",
                matched: true,
                conceptId: "nnc",
                notationRole: "nominal-nuclear-clause-category",
                concept: ctx.getConceptById("nnc"),
                generationAllowed: false,
                diagnostics: ["concept-token-diagnostic-only"],
            },
            unknown: {
                kind: "concept-token-classification",
                version: 1,
                token: "tekit",
                normalized: "tekit",
                matched: false,
                conceptId: "",
                notationRole: "",
                concept: null,
                generationAllowed: false,
                diagnostics: ["concept-token-unmapped"],
            },
        }
    );

    const glossary = ctx.buildConceptGlossaryMetadata({ lesson: 1 });
    s.eq(
        "concept glossary metadata marks Lesson 1 visible and non-generative",
        {
            kind: glossary.kind,
            lesson: glossary.lesson,
            status: glossary.status,
            generationAllowed: glossary.generationAllowed,
            boundaries: glossary.boundaries,
        },
        {
            kind: "concept-glossary-metadata",
            lesson: 1,
            status: "visible-diagnostic",
            generationAllowed: false,
            boundaries: {
                isEngine: false,
                isUiGlossaryComplete: true,
                isNawatFormAuthority: false,
                requiresVisibleGlossaryUi: false,
                isExternalConceptDataRequired: false,
            },
        }
    );

    const displayModel = ctx.buildConceptGlossaryDisplayModel({ lesson: 1 });
    s.eq(
        "concept glossary display model exposes Lesson 1 OS terms for UI without generation",
        {
            kind: displayModel.kind,
            title: displayModel.title,
            generationAllowed: displayModel.generationAllowed,
            terminology: displayModel.terminology.map((entry) => entry.display),
            sampleConcepts: displayModel.concepts
                .filter((entry) => ["vnc", "nnc", "morpheme", "derivational-affix", "inflectional-affix"].includes(entry.id))
                .map((entry) => [entry.id, entry.label, entry.notationRole, entry.generationAllowed]),
        },
        {
            kind: "concept-glossary-display-model",
            title: "Andrews OS: notación y términos",
            generationAllowed: false,
            terminology: [
                "CN = cláusula nuclear",
                "CNV = cláusula nuclear verbal",
                "CNN = cláusula nuclear nominal",
            ],
            sampleConcepts: [
                ["vnc", "cláusula nuclear verbal", "verbal-nuclear-clause-category", false],
                ["nnc", "cláusula nuclear nominal", "nominal-nuclear-clause-category", false],
                ["morpheme", "morfema", "type-level-meaningful-unit", false],
                ["derivational-affix", "afijo derivacional", "stem-internal-affix", false],
                ["inflectional-affix", "afijo flexional", "stem-external-affix", false],
            ],
        }
    );

    s.eq(
        "concept registry carries anti-conflation rules",
        ctx.getConceptAntiConflationRules(),
        [
            "concept glossary is not generation",
            "notation token is not Nawat/Pipil surface evidence",
            "lesson heading is not an engine boundary",
            "VNC/NNC category label is not a complete sentence model",
            "Andrews terminology is architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("concept glossary does not expose surface forms", Object.prototype.hasOwnProperty.call(glossary, "surfaceForms"));
    s.no("concept glossary does not expose generated forms", Object.prototype.hasOwnProperty.call(glossary, "generatedForms"));
    const tokenFrame = ctx.classifyConceptToken("NNC").grammarFrame;
    s.eq(
        "concept metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(tokenFrame),
            routeFamily: tokenFrame?.routeContract?.routeFamily || "",
            routeStage: tokenFrame?.routeContract?.routeStage || "",
            generationAllowed: tokenFrame?.routeContract?.generationAllowed,
            andrewsRef: tokenFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(ctx.classifyConceptToken("NNC"), "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "concept-registry",
            routeStage: "classify-token",
            generationAllowed: false,
            andrewsRef: "Andrews Lesson 1",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
