"use strict";

/**
 * Tests for src/core/clause/complement/complement.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("complement");

    s.eq(
        "Lesson 51 complement API is exported",
        [
            typeof ctx.buildComplementClauseBoundaryMetadata,
            typeof ctx.classifyComplementClauseCandidate,
            typeof ctx.classifyComplementClauseFalsePositive,
            typeof ctx.buildComplementClauseAst,
            typeof ctx.getComplementClauseAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildComplementClauseBoundaryMetadata();
    s.eq(
        "complement boundary is explicit and non-generative",
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
            kind: "complement-clause-boundary",
            lesson: 51,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasNncGeneration: true,
                hasNominalizationProfileMetadata: true,
                hasComplementAst: true,
                hasConfirmedClauseExamples: false,
                hasStaticComplementData: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesNominalizationGeneration: false,
                changesValencyBehavior: false,
                treatsGeneratedWordAsComplementEvidence: false,
                treatsObjectControlAsComplementEvidence: false,
            },
            questionFields: [
                "principalClause",
                "complement",
                "complementRole",
                "complementUnitType",
                "linkingEvidence",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized complement role remains unconfirmed without Nawat clause evidence",
        ctx.classifyComplementClauseCandidate({
            principalClause: "unknown",
            complement: "single generated word",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            falsePositiveSource: "single-generated-word",
        }),
        {
            kind: "complement-clause-candidate-classification",
            version: 1,
            principalClause: "unknown",
            complement: "single generated word",
            candidate: "",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            linkingEvidence: "",
            evidenceSource: "",
            falsePositiveSource: "single-generated-word",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "complement-clause-needs-nawat-clause-evidence",
                "complement-clause-role-recognized",
                "complement-clause-unit-recognized",
                "complement-clause-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "object controls are not complement evidence",
        ctx.classifyComplementClauseFalsePositive("object-control-label"),
        {
            kind: "complement-clause-false-positive",
            version: 1,
            source: "object-control-label",
            isComplementClauseEvidence: false,
            isComplementAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["complement-clause-false-positive-source"],
            antiConflationRules: ctx.getComplementClauseAntiConflationRules(),
        }
    );

    s.eq(
        "complement metadata carries anti-conflation rules",
        ctx.getComplementClauseAntiConflationRules(),
        [
            "complement-clause boundary metadata is not generation",
            "object controls and subject labels are not complement-clause evidence",
            "ordinary VNC or NNC output is not a complement AST",
            "nominalizationProfile is not a clause-level complement relation",
            "single generated words do not prove object, subject, or adverbial complements",
            "Andrews complementation categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("complement boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("complement boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const objectComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "kichiwa",
        complementSurface: "tayekanki",
        complementRole: "object-complement",
        complementUnitType: "nnc",
        semanticCategory: "change",
        principalVerbStem: "chiwa",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 object complement AST links principal object pronoun to complement subject",
        {
            kind: objectComplementAst.kind,
            supported: objectComplementAst.supported,
            confirmed: objectComplementAst.confirmed,
            complementRole: objectComplementAst.complementRole,
            complementUnitType: objectComplementAst.complementUnitType,
            semanticCategory: objectComplementAst.semanticCategory,
            order: objectComplementAst.order,
            surface: objectComplementAst.surface,
            link: objectComplementAst.link,
            relationContract: objectComplementAst.relationContract,
            changesNawatSurfaceForms: objectComplementAst.changesNawatSurfaceForms,
            changesValencyBehavior: objectComplementAst.changesValencyBehavior,
            generationAllowed: objectComplementAst.generationAllowed,
            ok: objectComplementAst.ok,
            frameAstKind: objectComplementAst.frames?.astFrame?.kind || "",
            frameRouteStage: objectComplementAst.frames?.routeContract?.routeStage || "",
            frameGenerationAllowed: objectComplementAst.frames?.routeContract?.generationAllowed,
            frameStatus: objectComplementAst.frames?.diagnosticFrame?.status || "",
            diagnostics: objectComplementAst.diagnostics,
        },
        {
            kind: "complement-clause-ast",
            supported: true,
            confirmed: false,
            complementRole: "object-complement",
            complementUnitType: "nnc",
            semanticCategory: "change",
            order: "complement-principal",
            surface: "tayekanki kichiwa",
            link: {
                type: "object-pronoun-to-complement-subject",
                sharedReferenceRequired: true,
                distinguishesFromSupplementation: true,
            },
            relationContract: {
                role: "object-complement",
                semanticCategory: "change",
                link: "object-pronoun-to-complement-subject",
                principalVerbStem: "chiwa",
                complementState: "",
                complementTense: "",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: true,
                headPronounSlot: "object",
                complementSubjectSharesWith: "principal-object-pronoun",
                objectComplementTypes: ["change", "material-composition", "designation", "state"],
                possessiveNameComplementPossible: false,
            },
            changesNawatSurfaceForms: false,
            changesValencyBehavior: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "complement-clause-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            diagnostics: [],
        }
    );
    s.eq(
        "complement AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const principalFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-principal / frame-principal-alt"],
                    outputKind: "vnc",
                }),
            });
            const complementFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-complement / frame-complement-alt"],
                    outputKind: "nnc",
                }),
            });
            const principalInput = {
                result: "stale-principal-result",
                surface: "top-principal-surface",
                surfaceForms: ["stale-principal-a / stale-principal-b"],
                surfaceDisplay: "stale-principal-display",
                word: "stale-principal-word",
                frames: principalFrame,
            };
            const complementInput = {
                result: "stale-complement-result",
                surface: "top-complement-surface",
                surfaceForms: ["stale-complement-a / stale-complement-b"],
                surfaceDisplay: "stale-complement-display",
                word: "stale-complement-word",
                frames: complementFrame,
            };
            const ast = ctx.buildComplementClauseAst({
                principalClause: principalInput,
                complement: complementInput,
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
                principalVerbStem: "frame",
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                complementSurface: ast.complement.surface,
                principalForms: ctx.getComplementClauseSurfaceForms(principalInput),
                complementForms: ctx.getComplementClauseSurfaceForms(complementInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-complement frame-principal",
            principalSurface: "frame-principal",
            complementSurface: "frame-complement",
            principalForms: ["frame-principal", "frame-principal-alt"],
            complementForms: ["frame-complement", "frame-complement-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "complement surface helper suppresses fallback for an empty LCM result frame",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "blocked-complement-source",
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
                surface: ctx.getComplementClauseSurface(input, "fallback-complement"),
                forms: ctx.getComplementClauseSurfaceForms(input),
            };
        })(),
        {
            surface: "",
            forms: [],
        }
    );
    s.eq(
        "complement AST reads surfaceForms before legacy result",
        (() => {
            const ast = ctx.buildComplementClauseAst({
                principalClause: {
                    result: "legacy-principal",
                    surface: "top-principal-surface",
                    surfaceForms: ["top-principal-a / top-principal-b"],
                },
                complement: {
                    result: "legacy-complement",
                    surface: "top-complement-surface",
                    surfaceForms: ["top-complement-a / top-complement-b"],
                },
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
                principalVerbStem: "test",
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                complementSurface: ast.complement.surface,
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-complement-a top-principal-a",
            principalSurface: "top-principal-a",
            complementSurface: "top-complement-a",
            ok: true,
        }
    );

    const subjectComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "yes",
        complementSurface: "nukniw",
        complementRole: "subject-complement",
        complementUnitType: "nnc",
        semanticCategory: "identity",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 subject complement AST links principal subject to complement subject",
        {
            surface: subjectComplementAst.surface,
            linkType: subjectComplementAst.link.type,
            relationContract: subjectComplementAst.relationContract,
            supported: subjectComplementAst.supported,
        },
        {
            surface: "nukniw yes",
            linkType: "subject-pronoun-to-complement-subject",
            relationContract: {
                role: "subject-complement",
                semanticCategory: "identity",
                link: "subject-pronoun-to-complement-subject",
                principalVerbStem: "",
                complementState: "",
                complementTense: "",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: false,
                headPronounSlot: "subject",
                complementSubjectSharesWith: "principal-subject-pronoun",
                subjectComplementTypes: ["identity", "composition", "state"],
                passiveTransformOfObjectComplement: false,
            },
            supported: true,
        }
    );

    const passiveTransformAst = ctx.buildComplementClauseAst({
        principalSurface: "tokayotilo",
        complementSurface: "Tumi",
        complementRole: "subject-complement",
        complementUnitType: "nnc",
        semanticCategory: "designation",
        passiveTransformOfObjectComplement: true,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 passive transform of object-complement naming is recorded as subject complement",
        {
            complementRole: passiveTransformAst.complementRole,
            semanticCategory: passiveTransformAst.semanticCategory,
            passiveTransformOfObjectComplement: passiveTransformAst.relationContract.passiveTransformOfObjectComplement,
            supported: passiveTransformAst.supported,
        },
        {
            complementRole: "subject-complement",
            semanticCategory: "designation",
            passiveTransformOfObjectComplement: true,
            supported: true,
        }
    );

    const pehuaAst = ctx.buildComplementClauseAst({
        principalSurface: "pewa",
        complementSurface: "nitaketsa",
        complementRole: "adverbial-complement",
        complementUnitType: "vnc",
        semanticCategory: "beginning",
        principalVerbStem: "pewa",
        complementTense: "present",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 adverbial complement records pehua beginning contract without treating it as purpose",
        {
            surface: pehuaAst.surface,
            relationContract: pehuaAst.relationContract,
            supported: pehuaAst.supported,
            diagnostics: pehuaAst.diagnostics,
        },
        {
            surface: "nitaketsa pewa",
            relationContract: {
                role: "adverbial-complement",
                semanticCategory: "beginning",
                link: "principal-subject-to-adjoined-subject",
                principalVerbStem: "pewa",
                complementState: "",
                complementTense: "present",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: false,
                headPronounSlot: "principal-subject-or-compatible-relation",
                complementSubjectSharesWith: "principal-subject-pronoun",
                adverbialComplementTypes: [
                    "coverage",
                    "beginning",
                    "satisfaction",
                    "daring",
                    "cessation",
                    "tarrying",
                    "relational-lexicalized",
                ],
                pehuaComplementUsuallyPresentTense: true,
                activeActionCanIncorporateRelationalNnc: false,
            },
            supported: true,
            diagnostics: [],
        }
    );

    const relationalComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "nikpia",
        complementSurface: "itech",
        complementRole: "adverbial-complement",
        complementUnitType: "nnc",
        semanticCategory: "relational-lexicalized",
        link: "relational",
        principalVerbStem: "pia",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 relational adverbial complement records lexicalized compatibility and later incorporation risk",
        {
            semanticCategory: relationalComplementAst.semanticCategory,
            linkType: relationalComplementAst.link.type,
            complementSubjectSharesWith: relationalComplementAst.relationContract.complementSubjectSharesWith,
            activeActionCanIncorporateRelationalNnc: relationalComplementAst.relationContract.activeActionCanIncorporateRelationalNnc,
            supported: relationalComplementAst.supported,
        },
        {
            semanticCategory: "relational-lexicalized",
            linkType: "relational-nnc-to-compatible-verbstem",
            complementSubjectSharesWith: "relational-nnc-compatible-verbstem",
            activeActionCanIncorporateRelationalNnc: true,
            supported: true,
        }
    );

    s.eq(
        "complement AST rejects single generated word as complete complement structure",
        (() => {
            const ast = ctx.buildComplementClauseAst({
                complementSurface: "tayekanki",
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
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
                "complement-clause-requires-principal-surface",
                "complement-clause-needs-nawat-clause-evidence",
            ],
        }
    );

    return s;
}

module.exports = { run };
