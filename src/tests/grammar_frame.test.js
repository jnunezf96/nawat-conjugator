"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("grammar_frame");

    s.eq(
        "LCM grammar frame exposes the canonical layer keys",
        ctx.GRAMMAR_FRAME_KEYS,
        [
            "authorityFrame",
            "unitFrame",
            "orthographyFrame",
            "morphBoundaryFrame",
            "stemFrame",
            "nuclearClauseFrame",
            "participantFrame",
            "inflectionFrame",
            "routeContract",
            "astFrame",
            "resultFrame",
            "diagnosticFrame",
        ]
    );
    s.eq(
        "grammar frame preserves independent route/result/diagnostic contracts",
        (() => {
            const diagnostic = {
                id: "adjectival-nnc-requires-patientive-surface",
                severity: "error",
            };
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "source-evidence-missing",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "execute",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "adjectival-nnc-patientive-function",
                    generationRoute: "adjectival-nnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [diagnostic],
                }),
            });
            return {
                keys: ctx.GRAMMAR_FRAME_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(frame, key)),
                version: frame.version,
                firstLayer: frame.layerOrder[0],
                evidenceStatus: frame.authorityFrame.evidenceStatus,
                routeFamily: frame.routeContract.routeFamily,
                generationAllowed: frame.routeContract.generationAllowed,
                resultOk: frame.resultFrame.ok,
                diagnosticId: frame.diagnosticFrame.diagnostics[0].id,
                emptyStemFrame: frame.stemFrame,
            };
        })(),
        {
            keys: ctx.GRAMMAR_FRAME_KEYS,
            version: 1,
            firstLayer: "authority-evidence",
            evidenceStatus: "source-evidence-missing",
            routeFamily: "adjectival-nnc",
            generationAllowed: false,
            resultOk: false,
            diagnosticId: "adjectival-nnc-requires-patientive-surface",
            emptyStemFrame: null,
        }
    );
    s.eq(
        "grammar result contract exposes the common ok/surface/frames shape",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "nemi",
                    surfaceForms: ["nemi"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "generated",
                    diagnostics: [],
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: { result: "nemi", diagnostics: [{ id: "kept", severity: "note" }] },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
                hasFrames: contract.frames === frame,
                diagnosticIds: contract.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            ok: true,
            surface: "nemi",
            surfaceForms: ["nemi"],
            hasFrames: true,
            diagnosticIds: ["kept"],
        }
    );
    s.eq(
        "grammar result contract accepts frame surface forms without legacy result text",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-only-a / frame-only-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: { result: "—" },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "frame-only-a",
            surfaceForms: ["frame-only-a", "frame-only-b"],
        }
    );
    s.eq(
        "grammar result contract selects the first surface form before singular surfaces",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surface: "frame-surface",
                    surfaceForms: ["frame-primary-a / frame-primary-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: {
                    surface: "top-surface",
                    surfaceForms: ["stale-top-primary"],
                    result: "stale-legacy-result",
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "frame-primary-a",
            surfaceForms: [
                "frame-primary-a",
                "frame-primary-b",
                "frame-surface",
            ],
        }
    );
    s.eq(
        "grammar result contract treats the legacy no-output marker as blank surface",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "—",
                    surfaceForms: ["—"],
                    outputKind: "vnc",
                    generationRoute: "generate-word",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [{ id: "blocked", severity: "error" }],
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: {
                    result: "—",
                    surface: "stale-blocked-surface",
                    surfaceForms: ["stale-blocked-a"],
                    error: true,
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                resultSurface: frame.resultFrame.surface,
                resultSurfaceForms: frame.resultFrame.surfaceForms,
                diagnosticId: contract.diagnostics[0].id,
            };
        })(),
        {
            ok: false,
            surface: "",
            resultSurface: "",
            resultSurfaceForms: [],
            diagnosticId: "blocked",
        }
    );
    s.eq(
        "grammar AST contract preserves AST diagnostics while filling astFrame",
        (() => {
            const ast = ctx.attachGrammarAstContract({
                kind: "adjectival-modification-ast",
                supported: false,
                surface: "",
                structuralSource: "Andrews Lessons 42-43",
                targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
                generationAllowed: false,
                newWordGenerationAllowed: false,
                diagnostics: ["adjectival-modification-requires-head-surface"],
            }, {
                astKind: "adjectival-modification-ast",
                lessons: [42, 43],
            });
            return {
                ok: ast.ok,
                surface: ast.surface,
                framesIsGrammarFrame: ast.frames === ast.grammarFrame,
                astKind: ast.frames.astFrame.kind,
                routeStage: ast.frames.routeContract.routeStage,
                generationAllowed: ast.frames.routeContract.generationAllowed,
                diagnosticStatus: ast.frames.diagnosticFrame.status,
                originalDiagnostics: ast.diagnostics,
                contractDiagnosticId: ast.contractDiagnostics[0].id,
            };
        })(),
        {
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            astKind: "adjectival-modification-ast",
            routeStage: "compose-ast",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            originalDiagnostics: ["adjectival-modification-requires-head-surface"],
            contractDiagnosticId: "adjectival-modification-requires-head-surface",
        }
    );
    s.eq(
        "grammar metadata contract fills diagnostic-only route frames without changing JSON shape",
        (() => {
            const source = {
                kind: "comparison-candidate-classification",
                lesson: 53,
                structuralSource: "Andrews Lesson 53",
                candidate: "translation label",
                generationAllowed: false,
                diagnostics: ["comparison-needs-nawat-clause-evidence"],
            };
            const metadata = ctx.attachGrammarMetadataContract(source, {
                unitKind: "comparison-clause-unit",
                routeFamily: "comparison",
                routeStage: "classify-boundary",
                morphBoundaryFrame: { kind: "comparison-boundary" },
            });
            return {
                jsonShape: Object.keys(metadata),
                hasGrammarFrame: Boolean(metadata.grammarFrame),
                framesIsGrammarFrame: metadata.frames === metadata.grammarFrame,
                routeStage: metadata.frames.routeContract.routeStage,
                unitKind: metadata.frames.unitFrame.unitKind,
                generationAllowed: metadata.frames.routeContract.generationAllowed,
                diagnosticId: metadata.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(metadata, "grammarFrame"),
            };
        })(),
        {
            jsonShape: [
                "kind",
                "lesson",
                "structuralSource",
                "candidate",
                "generationAllowed",
                "diagnostics",
            ],
            hasGrammarFrame: true,
            framesIsGrammarFrame: true,
            routeStage: "classify-boundary",
            unitKind: "comparison-clause-unit",
            generationAllowed: false,
            diagnosticId: "comparison-needs-nawat-clause-evidence",
            enumerableGrammarFrame: false,
        }
    );
    s.eq(
        "grammar metadata contract suppresses stale aliases when result frame exists",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-frame-reader",
                result: "stale-meta-result",
                surface: "legacy-surface",
                surfaceForms: ["stale-meta-a / stale-meta-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-meta-surface",
                        surfaceForms: ["frame-meta-a / frame-meta-b"],
                    }),
                }),
            }, {
                unitKind: "metadata-frame-reader-unit",
                routeFamily: "metadata-frame-reader",
                routeStage: "test-frame-reader",
                supported: true,
            });
            return {
                surface: metadata.surface,
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
                legacyResultStillEnumerable: Object.keys(metadata).includes("result"),
                enumerableSurface: Object.prototype.propertyIsEnumerable.call(metadata, "surface"),
            };
        })(),
        {
            surface: "frame-meta-a",
            frameSurface: "frame-meta-a",
            frameSurfaceForms: ["frame-meta-a", "frame-meta-b", "frame-meta-surface"],
            legacyResultStillEnumerable: true,
            enumerableSurface: false,
        }
    );
    s.eq(
        "grammar metadata contract ignores stale output primarySurface when contract output surfaces exist",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-output-frame-reader",
                result: "legacy-form",
                output: {
                    primarySurface: "stale-primary-output",
                    surface: "output-surface",
                    surfaceForms: ["output-a / output-b"],
                },
            }, {
                unitKind: "metadata-output-reader-unit",
                routeFamily: "metadata-output-reader",
                routeStage: "test-output-reader",
                supported: true,
            });
            return {
                surface: metadata.surface,
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
            };
        })(),
        {
            surface: "output-a",
            frameSurface: "output-a",
            frameSurfaceForms: ["output-a", "output-b", "output-surface"],
        }
    );

    return s;
}

module.exports = { run };
