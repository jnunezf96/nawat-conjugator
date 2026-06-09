"use strict";

/**
 * Tests for src/core/clause/conjunction/conjunction.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("conjunction");

    s.eq(
        "Lesson 52 conjunction API is exported",
        [
            typeof ctx.buildConjunctionClauseBoundaryMetadata,
            typeof ctx.classifyConjunctionClauseCandidate,
            typeof ctx.classifyConjunctionClauseFalsePositive,
            typeof ctx.buildConjunctionClauseAst,
            typeof ctx.getConjunctionClauseAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildConjunctionClauseBoundaryMetadata();
    s.eq(
        "conjunction boundary is explicit and non-generative",
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
            kind: "conjunction-clause-boundary",
            lesson: 52,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasParserSeparators: true,
                hasConjunctionAst: true,
                hasConfirmedClauseExamples: false,
                hasStaticConjunctionData: false,
                changesParserBehavior: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesRouteBehavior: false,
                treatsParserSeparatorsAsConjunctionEvidence: false,
                treatsTranslationsAsConjunctionEvidence: false,
            },
            questionFields: [
                "conjuncts",
                "marker",
                "conjunctionRelation",
                "unitType",
                "parallelism",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized conjunction relation remains unconfirmed without Nawat clause evidence",
        ctx.classifyConjunctionClauseCandidate({
            conjuncts: ["left", "right"],
            marker: "translation",
            conjunctionRelation: "correlative",
            unitType: "clause",
            falsePositiveSource: "conjunction-translation",
        }),
        {
            kind: "conjunction-clause-candidate-classification",
            version: 1,
            conjuncts: ["left", "right"],
            marker: "translation",
            candidate: "",
            conjunctionRelation: "correlative",
            unitType: "clause",
            parallelism: "",
            evidenceSource: "",
            falsePositiveSource: "conjunction-translation",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "conjunction-clause-needs-nawat-clause-evidence",
                "conjunction-clause-relation-recognized",
                "conjunction-clause-unit-recognized",
                "conjunction-clause-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "parser separators are not conjunction evidence",
        ctx.classifyConjunctionClauseFalsePositive("parser-separator"),
        {
            kind: "conjunction-clause-false-positive",
            version: 1,
            source: "parser-separator",
            isConjunctionEvidence: false,
            isConjunctionAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["conjunction-clause-false-positive-source"],
            antiConflationRules: ctx.getConjunctionClauseAntiConflationRules(),
        }
    );

    s.eq(
        "conjunction metadata carries anti-conflation rules",
        ctx.getConjunctionClauseAntiConflationRules(),
        [
            "conjunction boundary metadata is not generation",
            "parser separators and slash variants are not conjunction AST evidence",
            "CSV alternants are not clause-level conjunction evidence",
            "particle or translation labels are not Nawat/Pipil conjunction evidence",
            "single generated words do not prove marked, unmarked, correlative, or parallel conjunction",
            "Andrews conjunction categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("conjunction boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("conjunction boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const unmarkedAdditiveAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["nitakwa", "niktalia"],
        conjunctionRelation: "unmarked",
        coordinationType: "additive",
        unitType: "clause",
        level: "principal",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 unmarked conjunction AST keeps balanced conjuncts without a head",
        {
            kind: unmarkedAdditiveAst.kind,
            supported: unmarkedAdditiveAst.supported,
            conjunctionRelation: unmarkedAdditiveAst.conjunctionRelation,
            coordinationType: unmarkedAdditiveAst.coordinationType,
            unitType: unmarkedAdditiveAst.unitType,
            level: unmarkedAdditiveAst.level,
            surface: unmarkedAdditiveAst.surface,
            balanced: unmarkedAdditiveAst.balanced,
            marking: unmarkedAdditiveAst.marking,
            changesNawatSurfaceForms: unmarkedAdditiveAst.changesNawatSurfaceForms,
            changesParserBehavior: unmarkedAdditiveAst.changesParserBehavior,
            generationAllowed: unmarkedAdditiveAst.generationAllowed,
            ok: unmarkedAdditiveAst.ok,
            frameAstKind: unmarkedAdditiveAst.frames?.astFrame?.kind || "",
            frameRouteStage: unmarkedAdditiveAst.frames?.routeContract?.routeStage || "",
            frameGenerationAllowed: unmarkedAdditiveAst.frames?.routeContract?.generationAllowed,
            frameStatus: unmarkedAdditiveAst.frames?.diagnosticFrame?.status || "",
            diagnostics: unmarkedAdditiveAst.diagnostics,
        },
        {
            kind: "conjunction-clause-ast",
            supported: true,
            conjunctionRelation: "unmarked",
            coordinationType: "additive",
            unitType: "clause",
            level: "principal-clause-level",
            surface: "nitakwa niktalia",
            balanced: {
                noHead: true,
                sameSyntacticRank: true,
                subordinateRelation: false,
            },
            marking: {
                value: "unmarked",
                markerIsStructuralConjunctor: false,
                adverbialModifierNotConjunctor: false,
                unmarkedPreferred: true,
            },
            changesNawatSurfaceForms: false,
            changesParserBehavior: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "conjunction-clause-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            diagnostics: [],
        }
    );
    s.eq(
        "conjunction AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const leftFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-left / frame-left-alt"],
                    outputKind: "vnc",
                }),
            });
            const rightFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-right / frame-right-alt"],
                    outputKind: "vnc",
                }),
            });
            const leftInput = {
                result: "stale-left-result",
                surface: "top-left-surface",
                surfaceForms: ["stale-left-a / stale-left-b"],
                surfaceDisplay: "stale-left-display",
                word: "stale-left-word",
                frames: leftFrame,
            };
            const rightInput = {
                result: "stale-right-result",
                surface: "top-right-surface",
                surfaceForms: ["stale-right-a / stale-right-b"],
                surfaceDisplay: "stale-right-display",
                word: "stale-right-word",
                frames: rightFrame,
            };
            const ast = ctx.buildConjunctionClauseAst({
                conjuncts: [leftInput, rightInput],
                conjunctionRelation: "unmarked",
                coordinationType: "additive",
                unitType: "clause",
                level: "principal",
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                conjunctSurfaces: ast.conjuncts.map((node) => node.surface),
                leftForms: ctx.getConjunctionClauseSurfaceForms(leftInput),
                rightForms: ctx.getConjunctionClauseSurfaceForms(rightInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-left frame-right",
            conjunctSurfaces: ["frame-left", "frame-right"],
            leftForms: ["frame-left", "frame-left-alt"],
            rightForms: ["frame-right", "frame-right-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "conjunction AST reads surfaceForms before legacy result",
        (() => {
            const ast = ctx.buildConjunctionClauseAst({
                conjuncts: [
                    {
                        result: "legacy-left",
                        surface: "top-left-surface",
                        surfaceForms: ["top-left-a / top-left-b"],
                    },
                    {
                        result: "legacy-right",
                        surface: "top-right-surface",
                        surfaceForms: ["top-right-a / top-right-b"],
                    },
                ],
                conjunctionRelation: "unmarked",
                coordinationType: "additive",
                unitType: "clause",
                level: "principal",
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                conjunctSurfaces: ast.conjuncts.map((node) => node.surface),
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-left-a top-right-a",
            conjunctSurfaces: ["top-left-a", "top-right-a"],
            ok: true,
        }
    );

    const markedAuhAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["nitakwa", "niktalia"],
        marker: "auh",
        conjunctionRelation: "marked",
        coordinationType: "adversative",
        unitType: "sentence",
        level: "principal",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 marked conjunction uses auh as structural conjunctor",
        {
            surface: markedAuhAst.surface,
            marker: markedAuhAst.marker,
            marking: markedAuhAst.marking,
            coordinationType: markedAuhAst.coordinationType,
            supported: markedAuhAst.supported,
            diagnostics: markedAuhAst.diagnostics,
        },
        {
            surface: "nitakwa auh niktalia",
            marker: "auh",
            marking: {
                value: "auh",
                markerIsStructuralConjunctor: true,
                adverbialModifierNotConjunctor: false,
                unmarkedPreferred: true,
            },
            coordinationType: "adversative",
            supported: true,
            diagnostics: [],
        }
    );

    const ihuanAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["omotali", "otakwa"],
        marker: "ihuan",
        conjunctionRelation: "unmarked",
        coordinationType: "additive",
        unitType: "clause",
        marking: "ihuan",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 rightward ihuan is adverbial modifier, not conjunctor",
        {
            surface: ihuanAst.surface,
            marking: ihuanAst.marking,
            supported: ihuanAst.supported,
            diagnostics: ihuanAst.diagnostics,
        },
        {
            surface: "omotali ihuan otakwa",
            marking: {
                value: "adverbial-modifier",
                markerIsStructuralConjunctor: false,
                adverbialModifierNotConjunctor: true,
                unmarkedPreferred: true,
            },
            supported: true,
            diagnostics: ["rightward-adverbial-modifier-is-not-conjunctor"],
        }
    );

    const correlativeAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["ashan", "mustat"],
        marker: "ahzo ... ahzo",
        conjunctionRelation: "correlative",
        coordinationType: "alternative",
        unitType: "nnc",
        marking: "ahzo-ahzo",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 correlative conjunction uses paired adverbial particles, not an English relative model",
        {
            surface: correlativeAst.surface,
            conjunctionRelation: correlativeAst.conjunctionRelation,
            coordinationType: correlativeAst.coordinationType,
            marking: correlativeAst.marking,
            supported: correlativeAst.supported,
        },
        {
            surface: "ahzo ashan ahzo mustat",
            conjunctionRelation: "correlative",
            coordinationType: "alternative",
            marking: {
                value: "correlative-particle",
                markerIsStructuralConjunctor: false,
                adverbialModifierNotConjunctor: false,
                unmarkedPreferred: true,
            },
            supported: true,
        }
    );

    const lexicalAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["at", "tepet"],
        conjunctionRelation: "lexical-innovation",
        coordinationType: "additive",
        unitType: "nnc",
        level: "lexical-unit",
        lexicalInnovation: "biclausalism",
        sharedReferent: true,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 conjoined-NNC lexical innovation requires shared referent and stays non-generative",
        {
            level: lexicalAst.level,
            lexicalInnovation: lexicalAst.lexicalInnovation,
            supported: lexicalAst.supported,
            newWordGenerationAllowed: lexicalAst.newWordGenerationAllowed,
            diagnostics: lexicalAst.diagnostics,
        },
        {
            level: "lexical-unit-level",
            lexicalInnovation: {
                type: "biclausalism",
                sharedReferentRequired: true,
                sharedReferent: true,
                metaphoricalDisplacement: true,
                canBecomeCompoundNounstem: true,
            },
            supported: true,
            newWordGenerationAllowed: false,
            diagnostics: [],
        }
    );

    const invalidLexicalAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["nantzin", "tajtzin"],
        conjunctionRelation: "lexical-innovation",
        coordinationType: "additive",
        unitType: "nnc",
        level: "lexical-unit",
        lexicalInnovation: "biclausalism",
        sharedReferent: false,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 lexical conjoined NNC without shared referent remains diagnostic",
        {
            supported: invalidLexicalAst.supported,
            diagnostics: invalidLexicalAst.diagnostics,
        },
        {
            supported: false,
            diagnostics: ["lexical-conjoined-nnc-requires-shared-referent"],
        }
    );

    const parallelAst = ctx.buildConjunctionClauseAst({
        conjuncts: ["nikita", "nikihtoa"],
        conjunctionRelation: "parallel-structure",
        coordinationType: "additive",
        unitType: "clause",
        parallelism: "rephrasive",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 52 parallel structure records rephrasive/progressive distinction",
        {
            conjunctionRelation: parallelAst.conjunctionRelation,
            parallelism: parallelAst.parallelism,
            supported: parallelAst.supported,
        },
        {
            conjunctionRelation: "parallel-structure",
            parallelism: {
                type: "rephrasive",
                rephrasesContent: true,
                progressesContent: false,
                appositive: false,
            },
            supported: true,
        }
    );

    return s;
}

module.exports = { run };
