"use strict";

/**
 * Tests for src/core/clause/adjunction/adjunction.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("adjunction");

    s.eq(
        "Lessons 49-50 adverbial adjunction API is exported",
        [
            typeof ctx.buildAdverbialAdjunctionBoundaryMetadata,
            typeof ctx.classifyAdverbialAdjunctionCandidate,
            typeof ctx.classifyAdverbialAdjunctionFalsePositive,
            typeof ctx.buildAdverbialAdjunctionAst,
            typeof ctx.getAdverbialAdjunctionAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdverbialAdjunctionBoundaryMetadata();
    s.eq(
        "adverbial adjunction boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "adverbial-adjunction-boundary",
            lessons: [49, 50],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasLegacyAdverbioSurface: true,
                hasAdverbialNuclearBoundary: true,
                hasRelationalNncBoundary: true,
                hasPlaceGentilicBoundary: true,
                hasClauseAdjunctionAst: true,
                hasConfirmedClauseExamples: false,
                hasStaticAdjunctionData: false,
                changesAdverbioGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                changesRouteBehavior: false,
                treatsSingleGeneratedWordAsAdjunctionEvidence: false,
                treatsTranslationAsAdjunctionEvidence: false,
            },
            questionFields: [
                "principalClause",
                "adjoinedUnit",
                "semanticRelation",
                "adjoinedUnitType",
                "marking",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized adverbial relation remains unconfirmed without Nawat clause evidence",
        ctx.classifyAdverbialAdjunctionCandidate({
            principalClause: "unknown",
            adjoinedUnit: "translation label",
            semanticRelation: "purpose",
            adjoinedUnitType: "clause",
            falsePositiveSource: "translation-label",
        }),
        {
            kind: "adverbial-adjunction-candidate-classification",
            version: 1,
            principalClause: "unknown",
            adjoinedUnit: "translation label",
            candidate: "",
            semanticRelation: "purpose",
            adjoinedUnitType: "clause",
            marking: "",
            evidenceSource: "",
            falsePositiveSource: "translation-label",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adverbial-adjunction-needs-nawat-clause-evidence",
                "adverbial-adjunction-relation-recognized",
                "adverbial-adjunction-unit-recognized",
                "adverbial-adjunction-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "single generated word is not adverbial adjunction evidence",
        ctx.classifyAdverbialAdjunctionFalsePositive("single-generated-word"),
        {
            kind: "adverbial-adjunction-false-positive",
            version: 1,
            source: "single-generated-word",
            isAdverbialAdjunctionEvidence: false,
            isClauseAdjunctionAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["adverbial-adjunction-false-positive-source"],
            antiConflationRules: ctx.getAdverbialAdjunctionAntiConflationRules(),
        }
    );

    s.eq(
        "adverbial adjunction metadata carries anti-conflation rules",
        ctx.getAdverbialAdjunctionAntiConflationRules(),
        [
            "adverbial-adjunction boundary metadata is not generation",
            "legacy adverbio word output is not a clause-adjunction AST",
            "adverbial nuclear-clause metadata is not recursive adverbial adjunction",
            "relational and place/gentilic boundary metadata are not adjoined-clause evidence",
            "single generated NNC or VNC words do not prove adjoined-unit relations",
            "translations for time, place, manner, purpose, reason, or condition are not Nawat/Pipil clause evidence",
            "Andrews adverbial-adjunction categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("adverbial adjunction boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adverbial adjunction boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const simpleAst = ctx.buildAdverbialAdjunctionAst({
        principalSurface: "niyawi",
        adjoinedSurface: "nepa",
        semanticRelation: "place",
        adjoinedUnitType: "nnc",
        order: "modifier-head",
        adjoinedClauseAdverbialized: true,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 49 adverbialized adjunct AST composes supplied clause surfaces without generation",
        {
            kind: simpleAst.kind,
            supported: simpleAst.supported,
            confirmed: simpleAst.confirmed,
            semanticRelation: simpleAst.semanticRelation,
            adjoinedUnitType: simpleAst.adjoinedUnitType,
            order: simpleAst.order,
            surface: simpleAst.surface,
            relationContract: simpleAst.relationContract,
            changesNawatSurfaceForms: simpleAst.changesNawatSurfaceForms,
            newWordGenerationAllowed: simpleAst.newWordGenerationAllowed,
            generationAllowed: simpleAst.generationAllowed,
            ok: simpleAst.ok,
            frameAstKind: simpleAst.frames?.astFrame?.kind || "",
            frameRouteStage: simpleAst.frames?.routeContract?.routeStage || "",
            frameGenerationAllowed: simpleAst.frames?.routeContract?.generationAllowed,
            frameStatus: simpleAst.frames?.diagnosticFrame?.status || "",
            diagnostics: simpleAst.diagnostics,
        },
        {
            kind: "adverbial-adjunction-ast",
            supported: true,
            confirmed: false,
            semanticRelation: "place",
            adjoinedUnitType: "nnc",
            order: "modifier-head",
            surface: "nepa niyawi",
            relationContract: {
                relation: "place",
                lessonPart: 49,
                adjoinedClauseAdverbialized: true,
                marking: "unmarked",
                translationMirage: false,
            },
            changesNawatSurfaceForms: false,
            newWordGenerationAllowed: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "adverbial-adjunction-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            diagnostics: [],
        }
    );
    s.eq(
        "adverbial adjunction AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const principalFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-principal / frame-principal-alt"],
                    outputKind: "vnc",
                }),
            });
            const adjoinedFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-adjoined / frame-adjoined-alt"],
                    outputKind: "nnc",
                }),
            });
            const principalInput = {
                result: "stale-principal-result",
                surface: "top-principal-surface",
                surfaceForms: ["stale-principal-a / stale-principal-b"],
                surfaceDisplay: "stale-principal-display",
                output: {
                    surface: "stale-output-principal-surface",
                    surfaceForms: ["stale-output-principal-a / stale-output-principal-b"],
                },
                word: "stale-principal-word",
                frames: principalFrame,
            };
            const adjoinedInput = {
                result: "stale-adjoined-result",
                surface: "top-adjoined-surface",
                surfaceForms: ["stale-adjoined-a / stale-adjoined-b"],
                surfaceDisplay: "stale-adjoined-display",
                output: {
                    surface: "stale-output-adjoined-surface",
                    surfaceForms: ["stale-output-adjoined-a / stale-output-adjoined-b"],
                },
                word: "stale-adjoined-word",
                frames: adjoinedFrame,
            };
            const ast = ctx.buildAdverbialAdjunctionAst({
                principalClause: principalInput,
                adjoinedUnit: adjoinedInput,
                semanticRelation: "place",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                adjoinedClauseAdverbialized: true,
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                adjoinedSurface: ast.adjoinedUnit.surface,
                principalForms: ctx.getAdverbialAdjunctionSurfaceForms(principalInput),
                adjoinedForms: ctx.getAdverbialAdjunctionSurfaceForms(adjoinedInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-adjoined frame-principal",
            principalSurface: "frame-principal",
            adjoinedSurface: "frame-adjoined",
            principalForms: ["frame-principal", "frame-principal-alt"],
            adjoinedForms: ["frame-adjoined", "frame-adjoined-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "adverbial adjunction AST reads surfaceForms before legacy result",
        (() => {
            const ast = ctx.buildAdverbialAdjunctionAst({
                principalClause: {
                    result: "legacy-principal",
                    surface: "top-principal-surface",
                    surfaceForms: ["top-principal-a / top-principal-b"],
                },
                adjoinedUnit: {
                    result: "legacy-adjoined",
                    surface: "top-adjoined-surface",
                    surfaceForms: ["top-adjoined-a / top-adjoined-b"],
                },
                semanticRelation: "place",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                adjoinedClauseAdverbialized: true,
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                adjoinedSurface: ast.adjoinedUnit.surface,
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-adjoined-a top-principal-a",
            principalSurface: "top-principal-a",
            adjoinedSurface: "top-adjoined-a",
            ok: true,
        }
    );
	    s.eq(
	        "adverbial adjunction AST ignores stale output primarySurface when contract surfaces exist",
	        (() => {
	            const ast = ctx.buildAdverbialAdjunctionAst({
	                principalClause: {
                    result: "legacy-principal",
                    output: {
                        primarySurface: "stale-primary-principal",
                        surface: "output-principal-surface",
                        surfaceForms: ["output-principal-a / output-principal-b"],
                    },
                },
                adjoinedUnit: {
                    result: "legacy-adjoined",
                    output: {
                        primarySurface: "stale-primary-adjoined",
                        surface: "output-adjoined-surface",
                        surfaceForms: ["output-adjoined-a / output-adjoined-b"],
                    },
                },
                semanticRelation: "place",
                adjoinedUnitType: "nnc",
                order: "modifier-head",
                adjoinedClauseAdverbialized: true,
                evidenceSource: "test-output-surface-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                adjoinedSurface: ast.adjoinedUnit.surface,
            };
        })(),
        {
            surface: "output-adjoined-a output-principal-a",
            principalSurface: "output-principal-a",
	            adjoinedSurface: "output-adjoined-a",
	        }
	    );
	    s.eq(
	        "adverbial adjunction AST reads nested output LCM result frames before stale output surfaces",
	        (() => {
	            const principalFrame = ctx.buildGrammarFrame({
	                resultFrame: ctx.buildGrammarResultFrame({
	                    surface: "frame-output-principal-surface",
	                    surfaceForms: ["frame-output-principal-a / frame-output-principal-b"],
	                    outputKind: "vnc",
	                }),
	            });
	            const adjoinedFrame = ctx.buildGrammarFrame({
	                resultFrame: ctx.buildGrammarResultFrame({
	                    surface: "frame-output-adjoined-surface",
	                    surfaceForms: ["frame-output-adjoined-a / frame-output-adjoined-b"],
	                    outputKind: "nnc",
	                }),
	            });
	            const principalInput = {
	                result: "legacy-principal",
	                output: {
	                    result: "stale-output-principal-result",
	                    surface: "stale-output-principal-surface",
	                    surfaceForms: ["stale-output-principal-a / stale-output-principal-b"],
	                    frames: principalFrame,
	                },
	            };
	            const adjoinedInput = {
	                result: "legacy-adjoined",
	                output: {
	                    result: "stale-output-adjoined-result",
	                    surface: "stale-output-adjoined-surface",
	                    surfaceForms: ["stale-output-adjoined-a / stale-output-adjoined-b"],
	                    frames: adjoinedFrame,
	                },
	            };
	            const ast = ctx.buildAdverbialAdjunctionAst({
	                principalClause: principalInput,
	                adjoinedUnit: adjoinedInput,
	                semanticRelation: "place",
	                adjoinedUnitType: "nnc",
	                order: "modifier-head",
	                adjoinedClauseAdverbialized: true,
	                evidenceSource: "test-nested-output-frame-contract",
	            });
	            return {
	                surface: ast.surface,
	                principalSurface: ast.principalClause.surface,
	                adjoinedSurface: ast.adjoinedUnit.surface,
	                principalForms: ctx.getAdverbialAdjunctionSurfaceForms(principalInput),
	                adjoinedForms: ctx.getAdverbialAdjunctionSurfaceForms(adjoinedInput),
	            };
	        })(),
	        {
	            surface: "frame-output-adjoined-a frame-output-principal-a",
	            principalSurface: "frame-output-principal-a",
	            adjoinedSurface: "frame-output-adjoined-a",
	            principalForms: [
	                "frame-output-principal-a",
	                "frame-output-principal-b",
	                "frame-output-principal-surface",
	            ],
	            adjoinedForms: [
	                "frame-output-adjoined-a",
	                "frame-output-adjoined-b",
	                "frame-output-adjoined-surface",
	            ],
	        }
	    );

	    const headRecursiveAst = ctx.buildAdverbialAdjunctionAst({
	        principalSurface: "san ihsiwka niyawi",
        adjoinedSurface: "ashkan",
        semanticRelation: "time",
        adjoinedUnitType: "nnc",
        recursion: "head",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 49 head recursion records modifier plus recursive head pattern",
        {
            surface: headRecursiveAst.surface,
            recursion: headRecursiveAst.recursion,
            supported: headRecursiveAst.supported,
        },
        {
            surface: "ashkan san ihsiwka niyawi",
            recursion: {
                locus: "head",
                recursive: true,
                pattern: "modifier + (head = modifier + head)",
            },
            supported: true,
        }
    );

    const appositiveAst = ctx.buildAdverbialAdjunctionAst({
        principalSurface: "nepa",
        adjoinedSurface: "Kuskatan",
        semanticRelation: "place",
        adjoinedUnitType: "nnc",
        order: "appositive-head-modifier",
        recursion: "appositive",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 49 adverbial apposition keeps general place/time head before specific appositive",
        {
            surface: appositiveAst.surface,
            order: appositiveAst.order,
            recursion: appositiveAst.recursion,
            transformations: appositiveAst.transformations,
        },
        {
            surface: "nepa Kuskatan",
            order: "appositive-head-modifier",
            recursion: {
                locus: "appositive",
                recursive: true,
                pattern: "general place/time adjunct + specific place/time appositive",
            },
            transformations: {
                adjoinedUnitPrecedesHead: false,
                adjoinedUnitFollowsHead: true,
                adverbialUnitIsPrincipal: false,
                isAppositivePlaceTime: true,
                isDiscontinuous: false,
            },
        }
    );

    const conditionAst = ctx.buildAdverbialAdjunctionAst({
        principalSurface: "ye nitlakuaj",
        adjoinedSurface: "tiwalas",
        semanticRelation: "condition",
        adjoinedUnitType: "clause",
        order: "modifier-head",
        marking: "in-tla",
        adjoinedClauseAdverbialized: false,
        conditionType: "open",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 50 nonadverbialized condition adjunct is clause-level metadata, not word generation",
        {
            surface: conditionAst.surface,
            relationContract: conditionAst.relationContract,
            supported: conditionAst.supported,
            diagnostics: conditionAst.diagnostics,
        },
        {
            surface: "in tla tiwalas ye nitlakuaj",
            relationContract: {
                relation: "condition",
                lessonPart: 50,
                adjoinedClauseAdverbialized: false,
                marking: "in-tla",
                translationMirage: false,
                conditionType: "open",
                expectedMarker: "tla or in tla",
                adjoinedClauseMayPrecedeOrFollow: true,
            },
            supported: true,
            diagnostics: [],
        }
    );

    const reasonAst = ctx.buildAdverbialAdjunctionAst({
        principalSurface: "kwali kichiwa",
        adjoinedSurface: "yaja kiasik",
        semanticRelation: "reason",
        adjoinedUnitType: "sentence",
        order: "head-modifier",
        marking: "ca",
        adjoinedClauseAdverbialized: false,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 50 reason frame records ca as principal-clause introducer, not conjunction",
        {
            surface: reasonAst.surface,
            relationContract: reasonAst.relationContract,
            diagnostics: reasonAst.diagnostics,
        },
        {
            surface: "kwali kichiwa ca yaja kiasik",
            relationContract: {
                relation: "reason",
                lessonPart: 50,
                adjoinedClauseAdverbialized: false,
                marking: "ca",
                translationMirage: true,
                principalClauseIntroducer: "ca",
                caIsConjunction: false,
                note: "ca introduces a principal clause; because/for/since are translation effects",
            },
            diagnostics: ["adverbial-adjunction-ca-is-not-conjunction"],
        }
    );

    s.eq(
        "adverbial adjunction AST rejects single generated words as complete structure",
        (() => {
            const ast = ctx.buildAdverbialAdjunctionAst({
                adjoinedSurface: "nepa",
                semanticRelation: "place",
                adjoinedUnitType: "nnc",
            });
            return {
                supported: ast.supported,
                surface: ast.surface,
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            supported: false,
            surface: "",
            diagnostics: [
                "adverbial-adjunction-requires-principal-clause-surface",
                "adverbial-adjunction-needs-nawat-clause-evidence",
            ],
        }
    );

    return s;
}

module.exports = { run };
