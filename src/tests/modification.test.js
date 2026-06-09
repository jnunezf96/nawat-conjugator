"use strict";

/**
 * Tests for src/core/clause/modification/modification.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("modification");

    s.eq(
        "Lessons 42-43 adjectival modification API is exported",
        [
            typeof ctx.buildAdjectivalModificationBoundaryMetadata,
            typeof ctx.classifyAdjectivalModificationCandidate,
            typeof ctx.classifyAdjectivalModificationFalsePositive,
            typeof ctx.getAdjectivalModificationAntiConflationRules,
            typeof ctx.buildAdjectivalModificationAst,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdjectivalModificationBoundaryMetadata();
    s.eq(
        "adjectival modification boundary is explicit and non-generative",
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
            kind: "adjectival-modification-boundary",
            lessons: [42, 43],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveLikeWordOutputs: true,
                hasNominalizationProfileMetadata: true,
                hasModificationAst: true,
                hasConfirmedClauseExamples: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsSingleGeneratedWordAsModificationEvidence: false,
            },
            questionFields: [
                "head",
                "modifier",
                "relation",
                "order",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "Andrews 42.2 modification AST composes generated head and modifier outputs without changing forms",
        (() => {
            const head = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "singular",
            });
            const modifier = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "yektiya" });
            const ast = ctx.buildAdjectivalModificationAst({
                head,
                modifier,
                order: "head-modifier",
                linkRole: "shared-subject",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                supported: ast.supported,
                confirmed: ast.confirmed,
                relation: ast.relation,
                order: ast.order,
                scope: ast.scope,
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                headFormula: ast.head.formulaEcho,
                modifierFormula: ast.modifier.formulaEcho,
                linkRole: ast.link.role,
                changesNawatSurfaceForms: ast.changesNawatSurfaceForms,
                newWordGenerationAllowed: ast.newWordGenerationAllowed,
                generationAllowed: ast.generationAllowed,
                ok: ast.ok,
                frameAstKind: ast.frames?.astFrame?.kind || "",
                frameRouteStage: ast.frames?.routeContract?.routeStage || "",
                frameGenerationAllowed: ast.frames?.routeContract?.generationAllowed,
                frameStatus: ast.frames?.diagnosticFrame?.status || "",
                hasTopLevelFormulaSlots: Object.prototype.hasOwnProperty.call(ast, "formulaSlots"),
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            supported: true,
            confirmed: false,
            relation: "attributive-modifier",
            order: "head-modifier",
            scope: "standalone",
            surface: "kal yektik",
            headSurface: "kal",
            modifierSurface: "yektik",
            headFormula: "#Ø...Ø(kal)Ø#",
            modifierFormula: "#Ø...Ø(yekti)k#",
            linkRole: "shared-subject",
            changesNawatSurfaceForms: false,
            newWordGenerationAllowed: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "adjectival-modification-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            hasTopLevelFormulaSlots: false,
            diagnostics: [],
        }
    );
    s.eq(
        "modification AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const headFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-head / frame-head-alt"],
                    outputKind: "nnc",
                }),
            });
            const modifierFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-modifier / frame-modifier-alt"],
                    outputKind: "adjectival-nnc",
                }),
            });
            const headInput = {
                result: "stale-head-result",
                surface: "top-head-surface",
                surfaceForms: ["stale-head-a / stale-head-b"],
                surfaceDisplay: "stale-head-display",
                word: "stale-head-word",
                frames: headFrame,
            };
            const modifierInput = {
                result: "stale-modifier-result",
                surface: "top-modifier-surface",
                surfaceForms: ["stale-modifier-a / stale-modifier-b"],
                surfaceDisplay: "stale-modifier-display",
                word: "stale-modifier-word",
                frames: modifierFrame,
            };
            const ast = ctx.buildAdjectivalModificationAst({
                head: headInput,
                modifier: modifierInput,
                order: "head-modifier",
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                headForms: ctx.getAdjectivalModificationSurfaceForms(headInput),
                modifierForms: ctx.getAdjectivalModificationSurfaceForms(modifierInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-head frame-modifier",
            headSurface: "frame-head",
            modifierSurface: "frame-modifier",
            headForms: ["frame-head", "frame-head-alt"],
            modifierForms: ["frame-modifier", "frame-modifier-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "modification surface helper suppresses fallback for an empty LCM result frame",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "blocked-modification-source",
                }),
            });
            const input = {
                surface: "stale-surface",
                surfaceForms: ["stale-a / stale-b"],
                surfaceDisplay: "stale-display",
                result: "stale-result",
                word: "stale-word",
                frames: emptyFrame,
            };
            return {
                surface: ctx.getAdjectivalModificationSurface(input, "fallback-head"),
                forms: ctx.getAdjectivalModificationSurfaceForms(input),
            };
        })(),
        {
            surface: "",
            forms: [],
        }
    );
    s.eq(
        "modification AST reads surfaceForms before legacy result",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                head: {
                    result: "legacy-head",
                    surface: "top-head-surface",
                    surfaceForms: ["top-head-a / top-head-b"],
                },
                modifier: {
                    result: "legacy-modifier",
                    surface: "top-modifier-surface",
                    surfaceForms: ["top-modifier-a / top-modifier-b"],
                },
                order: "head-modifier",
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-head-a top-modifier-a",
            headSurface: "top-head-a",
            modifierSurface: "top-modifier-a",
            ok: true,
        }
    );

    s.eq(
        "Andrews 42.3 preposed modifier AST is not a topic transform",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                order: "modifier-head-preposed",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                surface: ast.surface,
                order: ast.order,
                isPreposed: ast.transformations.isPreposed,
                isTopic: ast.transformations.isTopic,
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            surface: "yektik kal",
            order: "modifier-head-preposed",
            isPreposed: true,
            isTopic: false,
            diagnostics: ["adjectival-modification-preposed-modifier-is-not-topic"],
        }
    );

    s.eq(
        "Andrews 42.4 marked preposed modifier is an adjoined-unit structure",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                marker: "ne",
                order: "marked-modifier-head-adjoined",
                scope: "adjoined-unit",
                evidenceSource: "test-generated-output-contract",
            });
            const standalone = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                marker: "ne",
                order: "marked-modifier-head-adjoined",
                scope: "standalone",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                supported: ast.supported,
                surface: ast.surface,
                scope: ast.scope,
                isMarked: ast.transformations.isMarked,
                standaloneDiagnostics: standalone.diagnostics,
            };
        })(),
        {
            supported: true,
            surface: "ne yektik kal",
            scope: "adjoined-unit",
            isMarked: true,
            standaloneDiagnostics: ["adjectival-modification-marked-preposed-unit-requires-adjoined-scope"],
        }
    );

    s.eq(
        "adjectival modification AST rejects single generated words as complete structure",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                modifierSurface: "yektik",
                order: "head-modifier",
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
                "adjectival-modification-requires-head-surface",
                "adjectival-modification-needs-nawat-clause-evidence",
            ],
        }
    );

    s.eq(
        "adjetivo route output remains unconfirmed modification evidence",
        ctx.classifyAdjectivalModificationCandidate({
            head: "unknown",
            modifier: "chipaktik",
            candidate: "chipaktik",
            relation: "predicate-function",
            falsePositiveSource: "adjective-mode-output",
        }),
        {
            kind: "adjectival-modification-candidate-classification",
            version: 1,
            head: "unknown",
            modifier: "chipaktik",
            candidate: "chipaktik",
            relation: "predicate-function",
            order: "",
            evidenceSource: "",
            falsePositiveSource: "adjective-mode-output",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adjectival-modification-needs-nawat-clause-evidence",
                "adjectival-modification-relation-recognized",
                "adjectival-modification-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "nominalization profile is classified as false positive AST evidence",
        ctx.classifyAdjectivalModificationFalsePositive("nominalization-profile"),
        {
            kind: "adjectival-modification-false-positive",
            version: 1,
            source: "nominalization-profile",
            isModificationEvidence: false,
            isSupplementationEvidence: false,
            isTopicEvidence: false,
            generationAllowed: false,
            diagnostics: ["adjectival-modification-false-positive-source"],
            antiConflationRules: ctx.getAdjectivalModificationAntiConflationRules(),
        }
    );

    s.eq(
        "adjectival modification metadata carries anti-conflation rules",
        ctx.getAdjectivalModificationAntiConflationRules(),
        [
            "adjectival modification boundary metadata is not generation",
            "modificationAst composes existing clause outputs; it does not create new Nawat word forms",
            "adjetivo route output is not a clause-level modification AST",
            "nominalizationProfile is not adjectival modification syntax",
            "ordinary NNC formulaSlots are not modifier/head relation metadata",
            "single generated words do not prove modification, supplementation, or topic relations",
            "Andrews modification categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("adjectival modification boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adjectival modification boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
