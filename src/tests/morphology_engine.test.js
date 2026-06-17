"use strict";

/**
 * Tests for src/core/generation/morphology_engine.js
 * Covers: direct applyMorphologyRules execution without the browser wrapper.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_engine");
    const summarizeNominalizationProfile = (profile) => profile && ({
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        nominalKind: profile.nominalKind,
        sourceTense: profile.source?.sourceTense || "",
        nominalizationKind: profile.role?.nominalizationKind || "",
        semanticRole: profile.role?.semanticRole || "",
        patientiveFamily: profile.role?.patientiveFamily || "",
        adjectivalFunction: profile.role?.adjectivalFunction || "",
        categoryTransition: profile.categoryTransition,
        nominalizationScope: profile.boundaries?.nominalizationScope || "",
        isFunctionalSupplementation: profile.boundaries?.isFunctionalSupplementation === true,
        isAdjectivalModification: profile.boundaries?.isAdjectivalModification === true,
        doesNotImplementLessons42_43: profile.boundaries?.doesNotImplementLessons42_43 === true,
    });
    const summarizePossessorSourceFrame = (frame) => frame && ({
        grammarSource: frame.grammarSource || "",
        possessorOrigin: frame.possessorOrigin || "",
        sourceSubjectRelation: frame.sourceSubjectRelation || "",
        contrastNominalKind: frame.contrastNominalKind || "",
        notSourceSubjectTransform: frame.notSourceSubjectTransform === true,
        notExternalPossessorImport: frame.notExternalPossessorImport === true,
        sourceSubject: frame.sourceSubject ? {
            prefix: frame.sourceSubject.prefix || "",
            suffix: frame.sourceSubject.suffix || "",
        } : null,
    });
    const summarizeDenominalFamilyProfile = (profile) => profile && ({
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        routeFamily: profile.routeFamily,
        structuralAnalogue: profile.structuralAnalogue,
        routeId: profile.routeId,
        routePlacement: profile.routePlacement,
        routeProfileSource: profile.routeProfileSource,
        sourceState: profile.sourceState,
        suffixContract: profile.suffixContract ? {
            classicalSuffix: profile.suffixContract.classicalSuffix || "",
            nawatRuleSuffix: profile.suffixContract.nawatRuleSuffix || "",
            nawatVerbalizer: profile.suffixContract.nawatVerbalizer || "",
            routeVerbalizer: profile.suffixContract.routeVerbalizer || "",
        } : null,
        verbalizer: profile.verbalizer,
        verbalizerType: profile.verbalizerType,
        valency: profile.valency,
        targetTense: profile.targetTense,
        surfaceSuffix: profile.surfaceSuffix,
        supportStatus: profile.supportStatus,
        isCompleteLesson54_55: profile.isCompleteLesson54_55,
        noNewSurfaceForms: profile.boundaries?.noNewSurfaceForms === true,
        noAndrewsSuffixContract: profile.boundaries?.noAndrewsSuffixContract === true,
    });
    s.eq(
        "runtime exposes shared nominalization metadata helpers",
        [
            typeof ctx.getVerbDerivedNominalProfileDefaults,
            typeof ctx.buildVerbDerivedPatientiveFamilyProfile,
            typeof ctx.getPatientivoNonactiveSourceSuffixContract,
            typeof ctx.getPatientivoPerfectiveSourceStemContract,
            typeof ctx.getPatientivoImperfectiveSourceStemContract,
            typeof ctx.getPatientivoRootStockSourceContract,
            typeof ctx.buildPatientivoMultipleDerivationContract,
            typeof ctx.buildPatientivoSourceStageFrame,
            typeof ctx.getActiveActionNominalizerContract,
            typeof ctx.buildVerbDerivedNominalizationProfile,
            typeof ctx.buildGeneratedNominalNum1Num2Metadata,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );
    s.eq(
        "generation contract readers accept LCM result-frame surface forms",
        (() => {
            const result = {
                result: "—",
                surface: "stale-generate-surface",
                surfaceForms: ["stale-generate-a / stale-generate-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surface: "frame-generate-surface",
                        surfaceForms: ["frame-generate-a / frame-generate-b"],
                        outputKind: "vnc",
                    }),
                }),
            };
            const runtimeWrapped = ctx.attachGenerateRuntimeBlockedContract({ ...result }, {
                routeFamily: "test-runtime-route",
                routeStage: "test-surface-reader",
                renderVerb: "frame",
            });
            return {
                generateSurface: ctx.resolveNuclearClauseSurfaceContractSurface(result),
                generateForms: ctx.normalizeGrammarFrameSurfaceForms(result),
                runtimeSurface: ctx.resolveGenerateRuntimeContractSurface(result),
                runtimeWrappedSurface: runtimeWrapped.surface,
                runtimeWrappedFrameForms: runtimeWrapped.frames.resultFrame.surfaceForms,
            };
        })(),
        {
            generateSurface: "frame-generate-a",
            generateForms: ["frame-generate-a", "frame-generate-b", "frame-generate-surface"],
            runtimeSurface: "frame-generate-a",
            runtimeWrappedSurface: "frame-generate-a",
            runtimeWrappedFrameForms: ["frame-generate-a", "frame-generate-b", "frame-generate-surface"],
        }
    );
    s.eq(
        "generation contract readers stop at empty LCM result frames before stale surfaces",
        (() => {
            const result = {
                result: "stale-generate-result",
                surface: "stale-generate-surface",
                surfaceForms: ["stale-generate-a / stale-generate-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "blocked-vnc",
                    }),
                }),
            };
            const runtimeWrapped = ctx.attachGenerateRuntimeBlockedContract({ ...result }, {
                routeFamily: "test-runtime-route",
                routeStage: "test-empty-surface-reader",
                renderVerb: "frame",
            });
            return {
                generateSurface: ctx.resolveNuclearClauseSurfaceContractSurface(result),
                generateForms: ctx.normalizeGrammarFrameSurfaceForms(result),
                runtimeSurface: ctx.resolveGenerateRuntimeContractSurface(result),
                runtimeForms: ctx.getGenerateRuntimeSurfaceForms(result),
                runtimeWrappedSurface: runtimeWrapped.surface,
                runtimeWrappedFrameForms: runtimeWrapped.frames.resultFrame.surfaceForms,
            };
        })(),
        {
            generateSurface: "",
            generateForms: [],
            runtimeSurface: "",
            runtimeForms: [],
            runtimeWrappedSurface: "",
            runtimeWrappedFrameForms: [],
        }
    );
    s.eq(
        "nuclear-clause surface frame source input stops at empty LCM result frames before stale stem or verb fallback",
        (() => {
            const framed = {
                stem: "stale-stem",
                result: "stale-result",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-source-input"],
                    }),
                }),
            };
            const emptyFramed = {
                stem: "stale-stem",
                result: "stale-result",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            };
            const emptyFrame = ctx.buildNuclearClauseSurfaceGrammarFrame({
                result: emptyFramed,
                resolvedTenseMode: ctx.TENSE_MODE?.verbo || "verbo",
                tense: "test-empty-frame",
                routeFamily: "test-source-input",
                verb: "stale-verb",
            });
            const explicitFrame = ctx.buildNuclearClauseSurfaceGrammarFrame({
                result: emptyFramed,
                resolvedTenseMode: ctx.TENSE_MODE?.verbo || "verbo",
                tense: "test-empty-frame",
                routeFamily: "test-source-input",
                renderVerb: "explicit-render-input",
                verb: "stale-verb",
            });
            return {
                framed: ctx.resolveGenerateWordFrameSourceInput({
                    result: framed,
                    verb: "stale-verb",
                }),
                empty: ctx.resolveGenerateWordFrameSourceInput({
                    result: emptyFramed,
                    verb: "stale-verb",
                }),
                explicit: ctx.resolveGenerateWordFrameSourceInput({
                    result: emptyFramed,
                    renderVerb: "explicit-render-input",
                    verb: "stale-verb",
                }),
                stale: ctx.resolveGenerateWordFrameSourceInput({
                    result: { stem: "stale-stem" },
                    verb: "stale-verb",
                }),
                emptyFrameSourceInput: emptyFrame?.resultFrame?.sourceInput || "",
                explicitFrameSourceInput: explicitFrame?.resultFrame?.sourceInput || "",
            };
        })(),
        {
            framed: "frame-source-input",
            empty: "",
            explicit: "explicit-render-input",
            stale: "stale-stem",
            emptyFrameSourceInput: "",
            explicitFrameSourceInput: "explicit-render-input",
        }
    );
    s.eq(
        "generateWord nominal connector shell reads LCM result frames before stale connector fields",
        (() => {
            const framedConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-connector",
                    }),
                }),
            };
            const emptyConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            };
            const framedShell = ctx.buildGeneratedNuclearClauseShellMetadata({
                resolvedTenseMode: "sustantivo",
                pers2: "fallback-connector",
                verb: "nemi",
                nominalClauseMetadata: {
                    num1Num2: framedConnector,
                    nominalClauseFrame: { predicate: { state: "derived-nominal" } },
                },
            });
            const emptyShell = ctx.buildGeneratedNuclearClauseShellMetadata({
                resolvedTenseMode: "sustantivo",
                pers2: "fallback-connector",
                verb: "nemi",
                nominalClauseMetadata: {
                    num1Num2: emptyConnector,
                    nominalClauseFrame: { predicate: { state: "derived-nominal" } },
                },
            });
            return {
                directFramed: ctx.resolveGenerateWordNominalConnectorSurface(framedConnector, "fallback-connector"),
                directFramedDisplay: ctx.resolveGenerateWordNominalConnectorDisplaySurface(framedConnector, "fallback-connector"),
                directEmpty: ctx.resolveGenerateWordNominalConnectorSurface(emptyConnector, "fallback-connector"),
                directEmptyDisplay: ctx.resolveGenerateWordNominalConnectorDisplaySurface(emptyConnector, "fallback-connector"),
                directFallback: ctx.resolveGenerateWordNominalConnectorSurface({
                    surface: "stale-connector",
                    displaySurface: "stale-display",
                }, "fallback-connector"),
                directFallbackDisplay: ctx.resolveGenerateWordNominalConnectorDisplaySurface({
                    surface: "stale-connector",
                    displaySurface: "stale-display",
                }, "fallback-connector"),
                framedShellConnector: framedShell?.slots?.num1Num2?.connector || "",
                framedShellDisplay: framedShell?.slots?.num1Num2?.displayConnector || "",
                emptyShellConnector: emptyShell?.slots?.num1Num2?.connector || "",
                emptyShellDisplay: emptyShell?.slots?.num1Num2?.displayConnector || "",
            };
        })(),
        {
            directFramed: "frame-connector",
            directFramedDisplay: "frame-connector",
            directEmpty: "",
            directEmptyDisplay: "",
            directFallback: "stale-connector",
            directFallbackDisplay: "stale-display",
            framedShellConnector: "frame-connector",
            framedShellDisplay: "frame-connector",
            emptyShellConnector: "",
            emptyShellDisplay: "Ø",
        }
    );
    s.eq(
        "morphology source reader keeps preterit source forms frame-first",
        (() => {
            const output = {
                result: "—",
                forms: ["stale-preterit-form"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-preterit-surface",
                        surfaceForms: ["frame-preterit-a / frame-preterit-b"],
                        outputKind: "preterit-source",
                    }),
                }),
            };
            return ctx.getMorphologyApplicationSourceSurfaceForms(output);
        })(),
        ["frame-preterit-a", "frame-preterit-b", "frame-preterit-surface"]
    );
    s.eq(
        "morphology source reader stops at empty LCM result frames before stale aliases",
        (() => {
            const output = {
                result: "stale-morph-result",
                surface: "stale-morph-surface",
                surfaceForms: ["stale-morph-a / stale-morph-b"],
                forms: ["stale-preterit-form"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "blocked-morphology",
                    }),
                }),
            };
            return {
                surfaceForms: ctx.getMorphologyApplicationSurfaceForms(output, "fallback-morph-surface"),
                sourceSurfaceForms: ctx.getMorphologyApplicationSourceSurfaceForms(output),
            };
        })(),
        {
            surfaceForms: [],
            sourceSurfaceForms: [],
        }
    );
    s.eq(
        "morphology source reader keeps stale forms for metadata-only frames",
        (() => {
            const output = {
                forms: ["stale-source-a / stale-source-b"],
                grammarFrame: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "morphology-application",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            };
            return ctx.getMorphologyApplicationSourceSurfaceForms(output);
        })(),
        ["stale-source-a", "stale-source-b"]
    );
    s.eq(
        "runtime blocked contract enriches existing diagnostics with failed layer metadata",
        (() => {
            const wrapped = ctx.attachGenerateRuntimeBlockedContract({
                result: "—",
                diagnostics: ["runtime-existing-blocked"],
            }, {
                routeFamily: "forward-derivation",
                routeStage: "no-stem-mask",
                renderVerb: "nemi",
                tense: "presente",
            });
            return {
                diagnosticId: wrapped.diagnostics[0]?.id || "",
                diagnosticFailedLayer: wrapped.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: wrapped.diagnostics[0]?.contractLayer || "",
                frameDiagnosticFailedLayer: wrapped.frames.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                blockingDiagnosticFailedLayer: wrapped.frames.routeContract.blockingDiagnostics[0]?.failedLayer || "",
                contractDiagnosticFailedLayer: wrapped.contractDiagnostics[0]?.failedLayer || "",
            };
        })(),
        {
            diagnosticId: "runtime-existing-blocked",
            diagnosticFailedLayer: "stem",
            diagnosticContractLayer: "stemFrame",
            frameDiagnosticFailedLayer: "stem",
            blockingDiagnosticFailedLayer: "stem",
            contractDiagnosticFailedLayer: "stem",
        }
    );
    s.eq(
        "morphology application contract reads LCM result-frame surface forms",
        (() => {
            const result = {
                result: "stale-morph-result",
                surface: "top-morph-surface",
                surfaceForms: ["stale-morph-a / stale-morph-b"],
                verb: "stale-morph-verb",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surfaceForms: ["frame-morph-a / frame-morph-b"],
                        outputKind: "morphology-application",
                        generationRoute: "presente",
                    }),
                }),
            };
            const wrapped = ctx.attachMorphologyApplicationGrammarContract(result, {
                routeStage: "test-frame-reader",
                tense: "presente",
            });
            return {
                ok: wrapped.ok,
                surface: wrapped.surface,
                frameSurface: wrapped.frames.resultFrame.surface,
                frameSurfaceForms: wrapped.frames.resultFrame.surfaceForms,
                routeStage: wrapped.frames.routeContract.routeStage,
            };
        })(),
        {
            ok: true,
            surface: "frame-morph-a",
            frameSurface: "frame-morph-a",
            frameSurfaceForms: ["frame-morph-a", "frame-morph-b"],
            routeStage: "test-frame-reader",
        }
    );
    s.eq(
        "morphology application contract enriches existing diagnostics with failed layer metadata",
        (() => {
            const wrapped = ctx.attachMorphologyApplicationGrammarContract({
                error: true,
                diagnostics: ["morphology-existing-blocked"],
            }, {
                routeStage: "apply-existing-diagnostic",
                tense: "presente",
                verb: "nemi",
            });
            return {
                diagnosticId: wrapped.diagnostics[0]?.id || "",
                diagnosticFailedLayer: wrapped.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: wrapped.diagnostics[0]?.contractLayer || "",
                frameDiagnosticFailedLayer: wrapped.frames.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                blockingDiagnosticFailedLayer: wrapped.frames.routeContract.blockingDiagnostics[0]?.failedLayer || "",
                contractDiagnosticFailedLayer: wrapped.contractDiagnostics[0]?.failedLayer || "",
            };
        })(),
        {
            diagnosticId: "morphology-existing-blocked",
            diagnosticFailedLayer: "stem",
            diagnosticContractLayer: "stemFrame",
            frameDiagnosticFailedLayer: "stem",
            blockingDiagnosticFailedLayer: "stem",
            contractDiagnosticFailedLayer: "stem",
        }
    );

    const present = ctx.applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: "",
        subjectSuffix: "",
        verb: "nemi",
        tense: "presente",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules present keeps nemi stem", present.verb, "nemi");
    s.eq("applyMorphologyRules present keeps empty subject suffix", present.subjectSuffix, "");
    s.eq("applyMorphologyRules present returns no alternates", present.alternateForms.length, 0);
    s.ok("applyMorphologyRules present returns surfaceRuleMeta", present.surfaceRuleMeta && typeof present.surfaceRuleMeta === "object");
    s.eq("applyMorphologyRules present exposes the LCM morphology contract", {
        ok: present.ok,
        surface: present.surface,
        framesIsGrammarFrame: present.frames === present.grammarFrame,
        routeFamily: present.frames.routeContract.routeFamily,
        routeStage: present.frames.routeContract.routeStage,
        unitKind: present.frames.unitFrame.unitKind,
        generationAllowed: present.frames.routeContract.generationAllowed,
        enumerableContract: Object.prototype.propertyIsEnumerable.call(present, "grammarFrame"),
    }, {
        ok: true,
        surface: "nemi",
        framesIsGrammarFrame: true,
        routeFamily: "morphology-application",
        routeStage: "apply",
        unitKind: "verbal-morphology",
        generationAllowed: true,
        enumerableContract: false,
    });

    const blockedMorphology = ctx.applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: "ki",
        subjectSuffix: "",
        verb: "mati",
        tense: "patientivo",
        analysisVerb: "mati",
        rawAnalysisVerb: "mati",
        analysisExactVerb: "mati",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
        patientivoSource: "tronco-verbal",
    });
    s.eq("applyMorphologyRules blocked result exposes the LCM morphology contract", {
        error: blockedMorphology.error,
        ok: blockedMorphology.ok,
        surface: blockedMorphology.surface,
        framesIsGrammarFrame: blockedMorphology.frames === blockedMorphology.grammarFrame,
        routeFamily: blockedMorphology.frames.routeContract.routeFamily,
        routeStage: blockedMorphology.frames.routeContract.routeStage,
        generationAllowed: blockedMorphology.frames.routeContract.generationAllowed,
        diagnosticId: blockedMorphology.diagnostics[0].id,
        diagnosticFailedLayer: blockedMorphology.diagnostics[0].failedLayer,
        diagnosticContractLayer: blockedMorphology.diagnostics[0].contractLayer,
    }, {
        error: true,
        ok: false,
        surface: "",
        framesIsGrammarFrame: true,
        routeFamily: "morphology-application",
        routeStage: "patientivo-tronco-object-gate",
        generationAllowed: false,
        diagnosticId: "morphology-patientivo-tronco-object-blocked",
        diagnosticFailedLayer: "stem",
        diagnosticContractLayer: "stemFrame",
    });

    const imperative = ctx.applyMorphologyRules({
        subjectPrefix: "ti",
        objectPrefix: "",
        subjectSuffix: "",
        verb: "nemi",
        tense: "imperativo",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules imperative rewrites second person prefix to shi", imperative.subjectPrefix, "shi");
    s.eq("applyMorphologyRules imperative keeps nemi stem", imperative.verb, "nemi");

    const nemiImperativeSecondSingular = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "imperativo",
        },
    });
    s.eq("generateWord imperative 2sg suppresses ma after shi rewrite", nemiImperativeSecondSingular.surfaceForms, ["shinemi"]);

    const asiImperativeSecondPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "an",
            obj1: "",
            tronco: "asi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "imperativo",
        },
    });
    s.eq("generateWord imperative 2pl suppresses ma after shi rewrite", asiImperativeSecondPlural.surfaceForms, ["shiasikan"]);

    const nemiImperativeThirdSingular = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "imperativo",
        },
    });
    s.eq("generateWord imperative 3sg keeps ma", nemiImperativeThirdSingular.surfaceForms, ["ma nemi"]);

    const agentivo = ctx.applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: "",
        subjectSuffix: "p",
        verb: "nemi",
        tense: "agentivo",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules agentivo keeps customary ni inside predicate stem", agentivo.verb, "nemini");
    s.eq("applyMorphologyRules agentivo plural uses NNC connector without reusing ni", agentivo.subjectSuffix, "wan");
    s.ok("applyMorphologyRules agentivo returns nominal formSpec", agentivo.formSpec && typeof agentivo.formSpec === "object");
    const generatedAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo",
        },
    });
    s.eq("generateWord agentivo surface remains unchanged", generatedAgentivo.surfaceForms, ["nemini"]);
    s.eq("generateWord agentivo formula uses generated predicate stem and vacant connector", {
        connector: generatedAgentivo.num1Num2?.displaySurface || "",
        formulaEcho: generatedAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        connector: "Ø",
        formulaEcho: "#Ø...Ø(nemini)Ø#",
    });
    s.eq("generateWord agentivo exposes customary-present agentive nominalization profile", summarizeNominalizationProfile(generatedAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo",
        sourceTense: "presente-habitual",
        nominalizationKind: "customary-present-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPresentAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-presente",
        },
    });
    s.eq("Andrews 36.7 present-agentive NNC reanalyzes the present predicate as the nounstem", generatedPresentAgentivo.surfaceForms, ["nemi"]);
    s.eq("Andrews 36.7 present-agentive formula uses the generated present predicate and vacant connector", {
        connector: generatedPresentAgentivo.num1Num2?.displaySurface || "",
        formulaEcho: generatedPresentAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        connector: "Ø",
        formulaEcho: "#Ø...Ø(nemi)Ø#",
    });
    s.eq("Andrews 36.7 present-agentive profile stays distinct from customary-present agentive", summarizeNominalizationProfile(generatedPresentAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-presente",
        sourceTense: "presente",
        nominalizationKind: "present-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPresentAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "nemi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "agentivo-presente",
        },
    });
    s.eq("Andrews 36.7 present-agentive plural keeps the present source number connector", {
        forms: generatedPresentAgentivoPlural.surfaceForms,
        connector: generatedPresentAgentivoPlural.num1Num2?.displaySurface || "",
        formulaEcho: generatedPresentAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinemit"],
        connector: "t",
        formulaEcho: "#ti...Ø(nemi)t#",
    });
    const generatedPresentAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-presente",
        },
    });
    s.eq("Andrews 36.7 present-agentive transitive source keeps the generated object inside the nounstem", {
        forms: generatedPresentAgentivoTransitive.surfaceForms,
        formulaEcho: generatedPresentAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamati"],
        formulaEcho: "#Ø...Ø(tamati)Ø#",
    });
    const generatedPresentAgentivoPossessiveProbe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "agentivo-presente",
        },
    });
    s.eq("Andrews 36.7 present-agentive is absolutive-only even when a possessive probe is supplied", {
        forms: generatedPresentAgentivoPossessiveProbe.surfaceForms,
        predicateState: generatedPresentAgentivoPossessiveProbe.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPresentAgentivoPossessiveProbe.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nemi"],
        predicateState: "absolutive",
        formulaEcho: "#Ø...Ø(nemi)Ø#",
    });
    const generatedPreteritAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive restricted NNC reanalyzes the preterit predicate as the nounstem", {
        forms: generatedPreteritAgentivo.surfaceForms,
        connector: generatedPreteritAgentivo.num1Num2?.displaySurface || "",
        formulaEcho: generatedPreteritAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nenki", "nemik"],
        connector: "ki",
        formulaEcho: "#Ø...Ø(nen)ki#",
    });
    s.eq("Andrews 35 preterit-agentive profile stays distinct from customary, present, and future agentives", summarizeNominalizationProfile(generatedPreteritAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-preterito",
        sourceTense: "preterito",
        nominalizationKind: "preterit-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPreteritAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "nemi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive plural exposes the preterit NNC connector", {
        forms: generatedPreteritAgentivoPlural.surfaceForms,
        connector: generatedPreteritAgentivoPlural.num1Num2?.displaySurface || "",
        formulaEcho: generatedPreteritAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinenket", "tinemiket"],
        connector: "ket",
        formulaEcho: "#ti...Ø(nen)ket#",
    });
    const generatedPreteritAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive transitive source keeps the projective object inside the nounstem", {
        forms: generatedPreteritAgentivoTransitive.surfaceForms,
        formulaEcho: generatedPreteritAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamatki", "tamatik"],
        formulaEcho: "#Ø...Ø(tamat)ki#",
    });
    const generatedPreteritAgentivoPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 35.5-35.6 preterit-agentive general-use possessive adds Nawat ka matrix before possessive connector", {
        forms: generatedPreteritAgentivoPossessive.surfaceForms,
        connector: generatedPreteritAgentivoPossessive.num1Num2?.displaySurface || "",
        predicateState: generatedPreteritAgentivoPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPreteritAgentivoPossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nutamatkaw", "nutamatikaw"],
        connector: "w",
        predicateState: "possessive",
        formulaEcho: "#Ø...Ø(tamatka)w#",
    });
    const generatedPreteritAgentivoReflexivePossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 35.5 preterit-agentive general-use reflexive source maps mainline mu to shuntline ne", {
        forms: generatedPreteritAgentivoReflexivePossessive.surfaceForms,
        formulaEcho: generatedPreteritAgentivoReflexivePossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nunematkaw", "nunematikaw"],
        formulaEcho: "#Ø...Ø(nematka)w#",
    });
    const generatedPreteritAgentivoMikiPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(miki)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "agentivo-preterito",
        },
    });
    s.eq("Andrews 36.12 preterit-agentive keeps the source subject as NNC subject and imports an external possessor", {
        forms: generatedPreteritAgentivoMikiPossessive.surfaceForms,
        predicateState: generatedPreteritAgentivoMikiPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPreteritAgentivoMikiPossessive.nuclearClauseShell?.formulaEcho || "",
        possessorSourceFrame: summarizePossessorSourceFrame(generatedPreteritAgentivoMikiPossessive.nominalizationProfile?.possessorSourceFrame),
    }, {
        forms: ["ninumikikaw"],
        predicateState: "possessive",
        formulaEcho: "#ni...Ø(mikika)w#",
        possessorSourceFrame: {
            grammarSource: "Andrews 36.12",
            possessorOrigin: "external",
            sourceSubjectRelation: "retained-as-nnc-subject",
            contrastNominalKind: "calificativo-instrumentivo",
            notSourceSubjectTransform: true,
            notExternalPossessorImport: false,
            sourceSubject: null,
        },
    });
    const generatedFutureAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-futuro",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted NNC keeps future s inside the nounstem and adds ki connector", {
        forms: generatedFutureAgentivo.surfaceForms,
        connector: generatedFutureAgentivo.num1Num2?.displaySurface || "",
        formulaEcho: generatedFutureAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nemiski"],
        connector: "ki",
        formulaEcho: "#Ø...Ø(nemis)ki#",
    });
    s.eq("Andrews 36.8 future-agentive profile stays distinct from customary and present agentive", summarizeNominalizationProfile(generatedFutureAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-futuro",
        sourceTense: "futuro",
        nominalizationKind: "future-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedFutureAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "nemi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "agentivo-futuro",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted plural keeps future s and exposes ket connector", {
        forms: generatedFutureAgentivoPlural.surfaceForms,
        connector: generatedFutureAgentivoPlural.num1Num2?.displaySurface || "",
        formulaEcho: generatedFutureAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinemisket"],
        connector: "ket",
        formulaEcho: "#ti...Ø(nemis)ket#",
    });
    const generatedFutureAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "agentivo-futuro",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted transitive source keeps projective object inside the nounstem", {
        forms: generatedFutureAgentivoTransitive.surfaceForms,
        formulaEcho: generatedFutureAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamatiski"],
        formulaEcho: "#Ø...Ø(tamatis)ki#",
    });
    const generatedFutureAgentivoPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "agentivo-futuro",
        },
    });
    s.eq("Andrews 36.8 future-agentive general-use possessive adds Nawat ka matrix before possessive connector", {
        forms: generatedFutureAgentivoPossessive.surfaceForms,
        connector: generatedFutureAgentivoPossessive.num1Num2?.displaySurface || "",
        predicateState: generatedFutureAgentivoPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedFutureAgentivoPossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nutamatiskaw"],
        connector: "w",
        predicateState: "possessive",
        formulaEcho: "#Ø...Ø(tamatiska)w#",
    });

    const nemiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action z/liz maps to Nawat s/lis from the future core",
        {
            forms: nemiActionNominal.surfaceForms,
            sourceTense: nemiActionNominal.nominalizationProfile?.source?.sourceTense || "",
            kind: nemiActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
            num1Num2: nemiActionNominal.num1Num2?.displaySurface || "",
            shellConnector: nemiActionNominal.nuclearClauseShell?.slots?.num1Num2?.displayConnector || "",
            lisRole: nemiActionNominal.num1Num2?.derivationalSuffixRole || "",
        },
        {
            forms: ["nemilis", "nemis"],
            sourceTense: "futuro",
            kind: "action-nominal",
            num1Num2: "Ø",
            shellConnector: "Ø",
            lisRole: "predicate.action-nominalizer",
        }
    );
    s.eq(
        "Andrews Lesson 37 active-action nominalizer is an engine contract converted to Nawat letters",
        (() => {
            const contract = ctx.getActiveActionNominalizerContract();
            return {
                kind: contract.kind,
                range: contract.curriculumRef.range,
                sourceSlot: contract.sourceStageModel.slot,
                sourceCore: contract.sourceStageModel.sourceCore,
                classical: contract.classicalSuffixes,
                nawat: contract.nawatSuffixes,
                longGenerationAllowed: contract.orthographyConversions.long.generationAllowed,
                shortGenerationAllowed: contract.orthographyConversions.short.generationAllowed,
                noFixtureEvidence: contract.boundaries.noFixtureEvidence,
            };
        })(),
        {
            kind: "active-action-nominalizer-contract",
            range: "37.2-37.5",
            sourceSlot: "#3 salida",
            sourceCore: "future-active-core",
            classical: {
                long: "liz",
                short: "z",
            },
            nawat: {
                long: "lis",
                short: "s",
            },
            longGenerationAllowed: false,
            shortGenerationAllowed: false,
            noFixtureEvidence: true,
        }
    );
    const chukaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "chuka",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 ka-final active-action NNC uses the configured replacive imperfective stem",
        chukaActionNominal.surfaceForms,
        ["chukilis"]
    );
    const nesiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nesi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 si-final active-action NNC uses Nawat shi replacive imperfective stem",
        nesiActionNominal.surfaceForms,
        ["neshilis"]
    );
    const ajsiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(ajsi)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 transitive si-final active-action NNC uses Nawat shi with the projective object",
        ajsiActionNominal.surfaceForms,
        ["taajshilis"]
    );
    const teomatiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(teomati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 ti-final active-action NNC keeps the configured optional Nawat chi alternate",
        teomatiActionNominal.surfaceForms,
        ["tateomatilis", "tateomachilis", "tateomatis"]
    );
    const kuawiyaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "kuawiya",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 ya-stem active-action alternates keep s/lis nominalizer",
        {
            forms: kuawiyaActionNominal.surfaceForms,
            hasBareSourceStem: kuawiyaActionNominal.surfaceForms.includes("kuawiya"),
            allAlternatesNominalized: kuawiyaActionNominal.surfaceForms.every((form) => /(?:lis|s)$/.test(form)),
        },
        {
            forms: ["kuawilis", "kuawiyalis"],
            hasBareSourceStem: false,
            allAlternatesNominalized: true,
        }
    );
    const istayaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "istaya",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 root-plus-ya active-action NNC deletes ya when configured from the PDF example",
        {
            forms: istayaActionNominal.surfaceForms,
            hasStemVariant: istayaActionNominal.surfaceForms.includes("istayalis"),
        },
        {
            forms: ["istalis"],
            hasStemVariant: false,
        }
    );
    const pluralRequestedActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC remains common-number even if plural is probed",
        pluralRequestedActionNominal.surfaceForms,
        ["nemilis", "nemis"]
    );
    const invalidActionNominalSubject = ctx.generateWord({
        silent: true,
        skipValidation: false,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "nemi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC rejects plural subject connector in validated generation",
        invalidActionNominalSubject.error,
        "Sustantivo verbal solo con 3a persona no animada común."
    );
    const transitiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action transitive NNC keeps the object pronoun",
        transitiveActionNominal.surfaceForms,
        ["tamatilis", "tamatis"]
    );
    const reflexiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(maka)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC maps mainline mu to shuntline ne",
        reflexiveActionNominal.surfaceForms,
        ["nemakalis"]
    );
    const reflexiveProjectiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action double-object reflexive NNC drops the projective object and keeps shuntline ne",
        {
            forms: reflexiveProjectiveActionNominal.surfaceForms,
            kind: reflexiveProjectiveActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
        },
        {
            forms: ["nematilis", "nematis"],
            kind: "action-nominal",
        }
    );
    const reflexiveVowelStemActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(cuepa)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC keeps ne before a vowel-final source",
        reflexiveVowelStemActionNominal.surfaceForms,
        ["necuepalis"]
    );
    const reflexiveSupportiveIActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(ihmati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC allows supportive i to drop after ne",
        reflexiveSupportiveIActionNominal.surfaceForms,
        ["neihmatilis", "nehmatilis", "neihmatis", "nehmatis"]
    );
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC exposes Lesson 2 chip metadata for alternate supportive i deletion",
        reflexiveSupportiveIActionNominal.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
            ruleId: frame.ruleId,
            source: frame.sourceSurface,
            target: frame.target,
            slot: frame.grammarSlot,
            sourceSegment: frame.sourceSegmentValue,
            targetSegment: frame.targetSegmentValue,
        })),
        [{
            ruleId: "supportive-i-stem-initial-elision",
            source: "i",
            target: "",
            slot: "stem-initial",
            sourceSegment: "ihmati",
            targetSegment: "hmati",
        }]
    );
    const supportiveIActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(ilnamiqui)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC drops source supportive i after ta",
        supportiveIActionNominal.surfaceForms,
        ["talnamiquilis", "talnamiquis"]
    );
    s.eq(
        "Andrews Lesson 37 active-action NNC exposes Lesson 2 chip metadata for supportive i deletion",
        supportiveIActionNominal.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
            ruleId: frame.ruleId,
            source: frame.sourceSurface,
            target: frame.target,
            slot: frame.grammarSlot,
            sourceSegment: frame.sourceSegmentValue,
            targetSegment: frame.targetSegmentValue,
        })),
        [{
            ruleId: "supportive-i-stem-initial-elision",
            source: "i",
            target: "",
            slot: "stem-initial",
            sourceSegment: "ilnamiqui",
            targetSegment: "lnamiqui",
        }]
    );
    const impersonalActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "sustantivo-verbal",
        },
    });
    s.eq(
        "Andrews Lesson 37 impersonal-action liz NNC is generated from the nonactive core",
        {
            forms: impersonalActionNominal.surfaceForms,
            sourceMode: impersonalActionNominal.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: impersonalActionNominal.nominalizationProfile?.source?.sourceTense || "",
            kind: impersonalActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: impersonalActionNominal.nominalizationProfile?.role?.semanticRole || "",
        },
        {
            forms: ["machulis", "matulis", "matilulis"],
            sourceMode: "nonactive",
            sourceTense: "impersonal-core",
            kind: "impersonal-action-nominal",
            semanticRole: "general action",
        }
    );
    s.eq(
        "Andrews Lesson 37 impersonal-action liz NNC does not use the active-action short s subtype",
        impersonalActionNominal.surfaceForms.some((form) => form.endsWith("s") && !form.endsWith("lis")),
        false
    );
    const passiveActionCharacteristic = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "calificativo-instrumentivo",
        },
    });
    s.eq(
        "Andrews Lesson 36 passive-action characteristic NNC is generated from the nonactive distant-past core",
        {
            forms: passiveActionCharacteristic.surfaceForms,
            sourceMode: passiveActionCharacteristic.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: passiveActionCharacteristic.nominalizationProfile?.source?.sourceTense || "",
        },
        {
            forms: ["machukayut", "matukayut", "matilukayut"],
            sourceMode: "nonactive",
            sourceTense: "pasado-remoto",
        }
    );
    const possessedPassiveActionCharacteristic = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "calificativo-instrumentivo",
        },
    });
    s.eq(
        "Andrews Lesson 36 default possessed passive-action characteristic keeps the restricted yu matrix",
        possessedPassiveActionCharacteristic.surfaceForms,
        ["numachukayu", "numatukayu", "numatilukayu"]
    );
    const passiveActionGeneralUse = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            actionNounStemUse: "general-use",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "calificativo-instrumentivo",
        },
    });
    s.eq(
        "Andrews Lesson 36 possessive passive-action general-use NNC uses the nonactive ka stem without the restricted yu matrix",
        {
            forms: passiveActionGeneralUse.surfaceForms,
            sourceMode: passiveActionGeneralUse.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: passiveActionGeneralUse.nominalizationProfile?.source?.sourceTense || "",
            kind: passiveActionGeneralUse.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: passiveActionGeneralUse.nominalizationProfile?.role?.semanticRole || "",
        },
        {
            forms: ["numachuka", "numatuka", "numatiluka"],
            sourceMode: "nonactive",
            sourceTense: "pasado-remoto",
            kind: "passive-action-nominal",
            semanticRole: "patient/action",
        }
    );
    const passiveActionGeneralUseFromSourceSubject = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            actionNounStemUse: "general-use",
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "calificativo-instrumentivo",
        },
    });
    s.eq(
        "Andrews Lesson 36 passive-action general-use derives possessor from the source VNC subject",
        {
            forms: passiveActionGeneralUseFromSourceSubject.surfaceForms,
            predicateState: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.predicateState?.possessorPrefix || "",
            sourceMode: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.source?.sourceCombinedMode || "",
        },
        {
            forms: ["tumachuka", "tumatuka", "tumatiluka"],
            predicateState: "possessive",
            possessorPrefix: "tu",
            sourceMode: "nonactive",
        }
    );
    s.eq(
        "Andrews 36.10/36.12 passive-action records source subject as transformed possessor",
        summarizePossessorSourceFrame(passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.possessorSourceFrame),
        {
            grammarSource: "Andrews 36.10/36.12",
            possessorOrigin: "source-vnc-subject",
            sourceSubjectRelation: "transformed-to-possessor",
            contrastNominalKind: "agentivo-preterito",
            notSourceSubjectTransform: false,
            notExternalPossessorImport: true,
            sourceSubject: { prefix: "ti", suffix: "t" },
        }
    );
    const transitivePotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "potencial",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC strips transitive object pronouns even in generation probes",
        {
            forms: transitivePotentialPatient.surfaceForms,
            kind: transitivePotentialPatient.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: transitivePotentialPatient.nominalizationProfile?.role?.semanticRole || "",
            sourceTense: transitivePotentialPatient.nominalizationProfile?.source?.sourceTense || "",
            num1Num2: transitivePotentialPatient.num1Num2?.displaySurface || "",
            nominalizerRole: transitivePotentialPatient.num1Num2?.derivationalSuffixRole || "",
            predicateDerivationalSuffix: transitivePotentialPatient.num1Num2?.predicateDerivationalSuffix || "",
            formulaEcho: transitivePotentialPatient.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["matilis", "matis"],
            kind: "potential-patient",
            semanticRole: "potential-patient",
            sourceTense: "futuro",
            num1Num2: "Ø",
            nominalizerRole: "predicate.potential-patient-nominalizer",
            predicateDerivationalSuffix: "lis",
            formulaEcho: "#Ø...Ø(mati)Ø#",
        }
    );
    const firstPersonPotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: false,
        override: {
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "mati",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "potencial",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC is not limited to third-person common-number subjects",
        firstPersonPotentialPatient.surfaceForms,
        ["nimatilis", "nimatis"]
    );
    const possessedPotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "potencial",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC preserves possessive state",
        {
            forms: possessedPotentialPatient.surfaceForms,
            predicateState: possessedPotentialPatient.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: possessedPotentialPatient.nominalizationProfile?.predicateState?.possessorPrefix || "",
            kind: possessedPotentialPatient.nominalizationProfile?.role?.nominalizationKind || "",
        },
        {
            forms: ["numatilis", "numatis"],
            predicateState: "possessive",
            possessorPrefix: "nu",
            kind: "potential-patient",
        }
    );
    const customaryPresentPatientiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "potencial-habitual",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive maps source reflexive mu to shuntline ne",
        {
            forms: customaryPresentPatientiveReflexive.surfaceForms,
            kind: customaryPresentPatientiveReflexive.nominalizationProfile?.role?.nominalizationKind || "",
            family: customaryPresentPatientiveReflexive.nominalizationProfile?.role?.patientiveFamily || "",
            sourcePattern: customaryPresentPatientiveReflexive.nominalizationProfile?.patientiveFamilyProfile?.sourcePattern || "",
            sourceTense: customaryPresentPatientiveReflexive.nominalizationProfile?.source?.sourceTense || "",
        },
        {
            forms: ["tinemachuni", "tinematuni", "tinematiluni"],
            kind: "customary-present-patientive",
            family: "customary-present-passive",
            sourcePattern: "customary-present-passive-core",
            sourceTense: "presente-habitual",
        }
    );
    const customaryPresentPatientiveProjective = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "potencial-habitual",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive does not keep single projective object pronouns",
        customaryPresentPatientiveProjective.surfaceForms,
        ["timachuni", "timatuni", "timatiluni"]
    );
    const customaryPresentPatientiveDoubleProjectiveTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "te",
            tiempo: "potencial-habitual",
        },
    });
    const customaryPresentPatientiveDoubleProjectiveTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            tiempo: "potencial-habitual",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive keeps selected ta from double-projective source",
        customaryPresentPatientiveDoubleProjectiveTa.surfaceForms,
        ["tamachuni", "tamatuni", "tamatiluni"]
    );
    s.eq(
        "Andrews 36.5 customary-present patientive keeps selected te from double-projective source",
        customaryPresentPatientiveDoubleProjectiveTe.surfaceForms,
        ["temachuni", "tematuni", "tematiluni"]
    );
    const customaryPresentPatientivePossessiveProbe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "potencial-habitual",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive cannot enter possessive state",
        {
            forms: customaryPresentPatientivePossessiveProbe.surfaceForms,
            hasPossessiveSurface: customaryPresentPatientivePossessiveProbe.surfaceForms.some((form) => form.startsWith("nu")),
            predicateState: customaryPresentPatientivePossessiveProbe.nominalizationProfile?.predicateState?.value || "",
        },
        {
            forms: customaryPresentPatientiveReflexive.surfaceForms,
            hasPossessiveSurface: false,
            predicateState: "absolutive",
        }
    );
    const customaryPresentPatientivePlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "potencial-habitual",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive plural uses the NNC plural connector, not finite t",
        {
            forms: customaryPresentPatientivePlural.surfaceForms,
            connector: customaryPresentPatientivePlural.num1Num2?.displaySurface || "",
            formulaEcho: customaryPresentPatientivePlural.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["tinemachunimet", "tinematunimet", "tinematilunimet"],
            connector: "met",
            formulaEcho: "#ti...Ø(nematiluni)met#",
        }
    );
    const absolutiveInstrumentiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.sustantivo,
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "instrumentivo",
        },
    });
    s.eq(
        "Andrews 36.6 absolutive instrumentive maps source reflexive mu to shuntline ne",
        {
            forms: absolutiveInstrumentiveReflexive.surfaceForms,
            sourceTense: absolutiveInstrumentiveReflexive.nominalizationProfile?.source?.sourceTense || "",
            connector: absolutiveInstrumentiveReflexive.num1Num2?.displaySurface || "",
            formulaEcho: absolutiveInstrumentiveReflexive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["nemachuni", "nematuni", "nematiluni"],
            sourceTense: "presente-habitual",
            connector: "Ø",
            formulaEcho: "#Ø...Ø(nemachuni)Ø#",
        }
    );
    const possessedInstrumentiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.sustantivo,
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "instrumentivo",
        },
    });
    s.eq(
        "Andrews 36.6 possessive instrumentive maps source reflexive mu to shuntline ne",
        {
            forms: possessedInstrumentiveReflexive.surfaceForms,
            sourceTense: possessedInstrumentiveReflexive.nominalizationProfile?.source?.sourceTense || "",
            predicateState: possessedInstrumentiveReflexive.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: possessedInstrumentiveReflexive.nominalizationProfile?.predicateState?.possessorPrefix || "",
            connector: possessedInstrumentiveReflexive.num1Num2?.displaySurface || "",
            formulaEcho: possessedInstrumentiveReflexive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["nunematiya"],
            sourceTense: "imperfecto",
            predicateState: "possessive",
            possessorPrefix: "nu",
            connector: "Ø",
            formulaEcho: "#Ø...Ø(nematiya)Ø#",
        }
    );
    const generatedInstrumentiveSourceSubjectPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.sustantivo,
            instrumentivoMode: ctx.INSTRUMENTIVO_MODE.posesivo,
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "instrumentivo",
        },
    });
    s.eq(
        "Andrews 36.6 generated possessive instrumentive transforms source subject into possessor",
        {
            forms: generatedInstrumentiveSourceSubjectPossessive.surfaceForms,
            predicateState: generatedInstrumentiveSourceSubjectPossessive.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: generatedInstrumentiveSourceSubjectPossessive.nominalizationProfile?.predicateState?.possessorPrefix || "",
            formulaEcho: generatedInstrumentiveSourceSubjectPossessive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["tutamatiya"],
            predicateState: "possessive",
            possessorPrefix: "tu",
            formulaEcho: "#Ø...Ø(tamatiya)Ø#",
        }
    );

    const matiPatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "nonactive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "patientivo mati ta keeps Andrews tli-class nonactive outputs without zero/in spillover",
        matiPatientivo.surfaceForms,
        ["tamachti", "tamachit", "tamatti", "tamatit", "tamatilti"]
    );
    s.eq(
        "patientivo mati ta display groups nominal markers compactly",
        ctx.formatConjugationDisplay(matiPatientivo.result),
        "tamachti\ntamachit\ntamatti\ntamatit\ntamatilti"
    );
    s.eq("generateWord patientivo exposes patientive nominalization profile", summarizeNominalizationProfile(matiPatientivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "patientivo",
        sourceTense: "",
        nominalizationKind: "patientive",
        semanticRole: "patient/result",
        patientiveFamily: "nonactive",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    s.eq(
        "patientivo profile derives Lessons 37.9-39 family metadata separately from generation",
        {
            family: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.family,
            sourcePattern: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourcePattern,
            sourceFamilyIds: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
            sourceFamilyLabel: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyLabel,
            sourceFamilyBoundary: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyBoundary,
            sourceTense: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceTense,
            curriculumRange: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.curriculumRef.range,
            outputSlot: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceStageModel.slot,
            generatedOnly: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.isGeneratedSurfaceOnly,
            completeTaxonomy: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.isCompletePatientiveTaxonomy,
            noNewSurfaceForms: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.boundaries.noNewSurfaceForms,
        },
        {
            family: "nonactive",
            sourcePattern: "nonactive-passive-impersonal",
            sourceFamilyIds: ["passive-core", "impersonal-core"],
            sourceFamilyLabel: "pasivo + impersonal (no distinguido)",
            sourceFamilyBoundary: "current-nonactive-branch-does-not-distinguish-passive-vs-impersonal",
            sourceTense: "",
            curriculumRange: "37.9-39",
            outputSlot: "#3 salida",
            generatedOnly: true,
            completeTaxonomy: false,
            noNewSurfaceForms: true,
        }
    );
    s.eq(
        "Andrews 37.8 nonactive patientive suffix contract converts Classical rule letters into Nawat engine suffixes",
        {
            luwa: (() => {
                const contract = ctx.getPatientivoNonactiveSourceSuffixContract("luwa");
                return {
                    classicalSuffix: contract.classicalSuffix,
                    nawatRuleSuffix: contract.nawatRuleSuffix,
                    nawatSurfaceSuffix: contract.nawatSurfaceSuffix,
                    operation: contract.sourceOperation,
                    class: contract.andrewsNounstemClass,
                    orthographyGenerationAllowed: contract.orthographyConversion.generationAllowed,
                };
            })(),
            wa: (() => {
                const contract = ctx.getPatientivoNonactiveSourceSuffixContract("wa");
                return {
                    classicalSuffix: contract.classicalSuffix,
                    nawatRuleSuffix: contract.nawatRuleSuffix,
                    operation: contract.sourceOperation,
                    class: contract.andrewsNounstemClass,
                    connectorFamily: contract.nawatConnectorFamily,
                };
            })(),
        },
        {
            luwa: {
                classicalSuffix: "lo-hua",
                nawatRuleSuffix: "lu-wa",
                nawatSurfaceSuffix: "luwa",
                operation: "delete-wa-and-final-u",
                class: "tli",
                orthographyGenerationAllowed: false,
            },
            wa: {
                classicalSuffix: "hua",
                nawatRuleSuffix: "wa",
                operation: "delete-entire-suffix",
                class: "ti",
                connectorFamily: "ti",
            },
        }
    );
    const summarizeNonactivePatientiveStemDerivations = (sourceStem, sourceSuffix) => (
        ctx.getPatientivoStemFromNonactive(sourceStem, sourceSuffix, { isTransitive: true })
            .map((entry) => ({
                stem: entry.stem,
                connector: entry.suffix,
                sourceSuffix: entry.patientiveSourceStageFrame?.sourceSuffix || "",
                operation: entry.patientiveSourceStageFrame?.operation || "",
                deletedSegment: entry.patientiveSourceStageFrame?.sourceSuffixContract?.deletedSegment || "",
                retainedSegment: entry.patientiveSourceStageFrame?.sourceSuffixContract?.retainedSegment || "",
            }))
    );
    s.eq(
        "Andrews 37.8 nonactive patientive source-suffix contracts drive stem deletion without changing outputs",
        {
            lu: summarizeNonactivePatientiveStemDerivations("matilu", "lu"),
            luwa: summarizeNonactivePatientiveStemDerivations("matiluwa", "luwa"),
            u: summarizeNonactivePatientiveStemDerivations("matu", "u"),
            uwa: summarizeNonactivePatientiveStemDerivations("matuwa", "uwa"),
            wa: summarizeNonactivePatientiveStemDerivations("matiwa", "wa"),
            walu: summarizeNonactivePatientiveStemDerivations("matiwalu", "walu"),
        },
        {
            lu: [{
                stem: "matil",
                connector: "ti",
                sourceSuffix: "lu",
                operation: "delete-final-u",
                deletedSegment: "u",
                retainedSegment: "l",
            }],
            luwa: [{
                stem: "matil",
                connector: "ti",
                sourceSuffix: "luwa",
                operation: "delete-wa-and-final-u",
                deletedSegment: "uwa",
                retainedSegment: "l",
            }],
            u: [
                {
                    stem: "mat",
                    connector: "ti",
                    sourceSuffix: "u",
                    operation: "delete-entire-suffix",
                    deletedSegment: "u",
                    retainedSegment: "",
                },
                {
                    stem: "mati",
                    connector: "t",
                    sourceSuffix: "u",
                    operation: "delete-entire-suffix",
                    deletedSegment: "u",
                    retainedSegment: "",
                },
            ],
            uwa: [
                {
                    stem: "mat",
                    connector: "ti",
                    sourceSuffix: "uwa",
                    operation: "delete-entire-suffix",
                    deletedSegment: "uwa",
                    retainedSegment: "",
                },
                {
                    stem: "mati",
                    connector: "t",
                    sourceSuffix: "uwa",
                    operation: "delete-entire-suffix",
                    deletedSegment: "uwa",
                    retainedSegment: "",
                },
            ],
            wa: [{
                stem: "mati",
                connector: "t",
                sourceSuffix: "wa",
                operation: "delete-entire-suffix",
                deletedSegment: "wa",
                retainedSegment: "",
            }],
            walu: [{
                stem: "matiwal",
                connector: "ti",
                sourceSuffix: "walu",
                operation: "delete-final-u-after-chained-nonactive",
                deletedSegment: "u",
                retainedSegment: "wal",
            }],
        }
    );
    s.eq(
        "patientivo output carries selected #3 salida source-stage frame without changing surfaces",
        {
            forms: matiPatientivo.surfaceForms,
            stageSlot: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.slot,
            profileStageSlot: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceStageFrame.slot,
            sourceType: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceType,
            sourceSuffix: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceSuffix,
            classicalSuffix: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceSuffixContract.classicalSuffix,
            nawatRuleSuffix: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceSuffixContract.nawatRuleSuffix,
            operation: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.operation,
            outputPrefix: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.outputPrefix,
            outputStem: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.outputStem,
            outputConnector: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.outputConnector,
            outputSurface: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.outputSurface,
            noClassicalSurfaceImport: matiPatientivo.nominalizationProfile.patientiveSourceStageFrame.boundaries.noClassicalSurfaceImport,
        },
        {
            forms: ["tamachti", "tamachit", "tamatti", "tamatit", "tamatilti"],
            stageSlot: "#3 salida",
            profileStageSlot: "#3 salida",
            sourceType: "nonactive",
            sourceSuffix: "u",
            classicalSuffix: "o",
            nawatRuleSuffix: "u",
            operation: "delete-entire-suffix",
            outputPrefix: "ta",
            outputStem: "mach",
            outputConnector: "ti",
            outputSurface: "tamachti",
            noClassicalSurfaceImport: true,
        }
    );

    const patientiveFamilyExamples = [
        {
            label: "perfective",
            verb: "-(ketza)",
            objectPrefix: "ta",
            source: "perfectivo",
            surfaceForms: ["taketzti"],
            sourcePattern: "perfective-active-stem",
            sourceFamilyIds: ["perfective-active-core"],
            sourceFamilyLabel: "perfectivo activo",
            sourceTense: "preterito",
        },
        {
            label: "imperfective",
            verb: "-(mati)",
            objectPrefix: "ta",
            source: "imperfectivo",
            surfaceForms: ["tamatiyat"],
            sourcePattern: "imperfective-active-stem",
            sourceFamilyIds: ["imperfective-active-core"],
            sourceFamilyLabel: "imperfectivo activo",
            sourceTense: "imperfecto",
        },
        {
            label: "root/stock",
            verb: "(pusuni)",
            objectPrefix: "",
            source: "tronco-verbal",
            surfaceForms: ["pusukti", "pusuchti", "pususti", "pusushti", "pusut"],
            sourcePattern: "root-or-stock-stem",
            sourceFamilyIds: ["root-or-stock"],
            sourceFamilyLabel: "raiz/tronco",
            sourceTense: "",
        },
    ];
    patientiveFamilyExamples.forEach((example) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.active,
                patientivoSource: example.source,
            },
            posicionesFormula: {
                pers1: "",
                obj1: example.objectPrefix,
                tronco: example.verb,
                pers2: "",
                num2: "",
                poseedor: "",
                tiempo: "patientivo",
            },
        });
        s.eq(`patientivo ${example.label} family keeps existing surfaces`, generated.surfaceForms, example.surfaceForms);
        s.eq(`patientivo ${example.label} family profile records source pattern`, {
            family: generated.nominalizationProfile.patientiveFamilyProfile.family,
            sourcePattern: generated.nominalizationProfile.patientiveFamilyProfile.sourcePattern,
            sourceFamilyIds: generated.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
            sourceFamilyLabel: generated.nominalizationProfile.patientiveFamilyProfile.sourceFamilyLabel,
            sourceTense: generated.nominalizationProfile.patientiveFamilyProfile.sourceTense,
            completeTaxonomy: generated.nominalizationProfile.patientiveFamilyProfile.isCompletePatientiveTaxonomy,
        }, {
            family: example.source,
            sourcePattern: example.sourcePattern,
            sourceFamilyIds: example.sourceFamilyIds,
            sourceFamilyLabel: example.sourceFamilyLabel,
            sourceTense: example.sourceTense,
            completeTaxonomy: false,
        });
    });
    const generatedRootStockDefault = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "tronco-verbal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const directRootStockContract = ctx.getPatientivoRootStockSourceContract({
        sourceStem: "pusuni",
        outputStem: "pusuk",
    });
    const rootStockStageFrame = generatedRootStockDefault.nominalizationProfile?.patientiveSourceStageFrame || null;
    s.eq(
        "Andrews 39.4 root/stock patientive contract records tli-class variant boundary without adding surfaces",
        {
            direct: {
                supported: directRootStockContract.supported,
                sourceCore: directRootStockContract.sourceCore,
                class: directRootStockContract.andrewsNounstemClass,
                connector: directRootStockContract.outputConnector,
                surface: directRootStockContract.outputSurface,
                variantStatus: directRootStockContract.variantSelectionStatus,
                nawatVariants: directRootStockContract.nawatVariantConsonants,
                conversionOutputs: directRootStockContract.orthographyConversions.map((entry) => entry.output),
                noSurfaceImport: directRootStockContract.boundaries.noClassicalSurfaceImport,
            },
            generated: {
                forms: generatedRootStockDefault.surfaceForms,
                sourceCore: rootStockStageFrame?.sourceCore || "",
                contractKind: rootStockStageFrame?.sourceStockContract?.kind || "",
                contractSourceStem: rootStockStageFrame?.sourceStockContract?.sourceStem || "",
                connector: rootStockStageFrame?.sourceStockContract?.outputConnector || "",
                contractSurface: rootStockStageFrame?.sourceStockContract?.outputSurface || "",
                selectedOutputSurface: rootStockStageFrame?.outputSurface || "",
                routeStemOnly: rootStockStageFrame?.sourceStockContract?.routeStemOnly === true,
            },
        },
        {
            direct: {
                supported: true,
                sourceCore: "root-or-stock-stem",
                class: "tli",
                connector: "ti",
                surface: "pusukti",
                variantStatus: "not-fully-recoverable-from-surface-grammar",
                nawatVariants: ["k", "sh", "s", "ch"],
                conversionOutputs: ["k", "sh", "s", "ch"],
                noSurfaceImport: true,
            },
            generated: {
                forms: ["pusukti", "pusuchti", "pususti", "pusushti", "pusut"],
                sourceCore: "root-or-stock-stem",
                contractKind: "patientive-root-stock-source-contract",
                contractSourceStem: "pusuni",
                connector: "ti",
                contractSurface: "pusukti",
                selectedOutputSurface: "pusukti",
                routeStemOnly: false,
            },
        }
    );
    const explicitTroncoStemForRoute = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const explicitTroncoInClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "in",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const explicitTroncoZeroClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "zero",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const explicitTransitiveTroncoInClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "in",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(salua)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.4 root/stock default output does not advertise zero or in noun-class spillover",
        generatedRootStockDefault.surfaceForms.some((form) => form.endsWith("in") || !/(?:t|ti)$/.test(form)),
        false
    );
    s.eq(
        "explicit tronco-verbal stem request remains available for route composition",
        explicitTroncoStemForRoute.surfaceForms,
        ["pusuk", "pusuch", "pusus", "pusush"]
    );
    s.eq(
        "explicit tronco-verbal route stem keeps root/stock contract but marks it route-only",
        {
            connector: explicitTroncoStemForRoute.nominalizationProfile?.patientiveSourceStageFrame?.sourceStockContract?.outputConnector || "",
            outputSurface: explicitTroncoStemForRoute.nominalizationProfile?.patientiveSourceStageFrame?.sourceStockContract?.outputSurface || "",
            routeStemOnly: explicitTroncoStemForRoute.nominalizationProfile?.patientiveSourceStageFrame?.sourceStockContract?.routeStemOnly === true,
        },
        {
            connector: "",
            outputSurface: "pusuk",
            routeStemOnly: true,
        }
    );
    s.eq(
        "explicit tronco-verbal in-class request is rejected for intransitive root/stock patientive",
        explicitTroncoInClass.error,
        true
    );
    s.eq(
        "explicit tronco-verbal zero-class request is rejected for root/stock patientive noun output",
        explicitTroncoZeroClass.error,
        true
    );
    s.eq(
        "explicit tronco-verbal in-class request is rejected for transitive root/stock patientive",
        explicitTransitiveTroncoInClass.error,
        true
    );
    const multipleDerivationPerfective = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "perfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(ketza)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const multipleDerivationContract = multipleDerivationPerfective.nominalizationProfile?.patientiveMultipleDerivationContract || null;
    s.eq(
        "Andrews 39.5 patientive output carries a multiple-derivation procedure contract without merging forms",
        {
            forms: multipleDerivationPerfective.surfaceForms,
            kind: multipleDerivationContract?.kind || "",
            range: multipleDerivationContract?.curriculumRef?.range || "",
            selectedSource: multipleDerivationContract?.selectedSource || "",
            selectedSurface: multipleDerivationContract?.selectedOutputSurface || "",
            availableFamilies: multipleDerivationContract?.availableSourceFamilies || [],
            multiple: multipleDerivationContract?.hasMultipleAvailableProcedures === true,
            noNewForms: multipleDerivationContract?.boundaries?.noNewSurfaceForms === true,
            noSynonymMerge: multipleDerivationContract?.boundaries?.doesNotMergeSynonymousTranslations === true,
        },
        {
            forms: ["taketzti"],
            kind: "patientive-multiple-derivation-contract",
            range: "39.5",
            selectedSource: "perfectivo",
            selectedSurface: "taketzti",
            availableFamilies: ["passive", "impersonal", "perfectivo", "imperfectivo"],
            multiple: true,
            noNewForms: true,
            noSynonymMerge: true,
        }
    );
    [
        {
            source: "perfectivo",
            verb: "-(ketza)",
            taForms: ["taketzti"],
            reflexiveForms: ["neketzti"],
        },
        {
            source: "imperfectivo",
            verb: "-(mati)",
            taForms: ["tamatiyat"],
            reflexiveForms: ["nematiyat"],
        },
    ].forEach((example) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.active,
                patientivoSource: example.source,
            },
            posicionesFormula: {
                pers1: "",
                obj1: "te",
                tronco: example.verb,
                pers2: "",
                num2: "",
                poseedor: "",
                tiempo: "patientivo",
            },
        });
        s.eq(
            `Andrews 39 ${example.source} patientivo maps single-object te source to ta pattern`,
            generated.surfaceForms,
            example.taForms
        );
        s.no(
            `Andrews 39 ${example.source} patientivo does not retain te as nounstem prefix`,
            generated.surfaceForms.some((form) => form.startsWith("te"))
        );
        const reflexiveGenerated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.active,
                patientivoSource: example.source,
            },
            posicionesFormula: {
                pers1: "",
                obj1: "mu",
                tronco: example.verb,
                pers2: "",
                num2: "",
                poseedor: "",
                tiempo: "patientivo",
            },
        });
        s.eq(
            `Andrews 39 ${example.source} patientivo maps source reflexive mu to shuntline ne`,
            reflexiveGenerated.surfaceForms,
            example.reflexiveForms
        );
        s.no(
            `Andrews 39 ${example.source} patientivo does not keep source reflexive mu as the nounstem prefix`,
            reflexiveGenerated.surfaceForms.some((form) => form.startsWith("mu"))
        );
    });
    const summarizePerfectiveEndingContract = (stem) => {
        const contract = ctx.getPatientivoPerfectiveSourceStemContract(stem);
        return {
            allowed: contract.allowed,
            matchedEnding: contract.matchedEnding,
            contractId: contract.contractId,
            classicalEnding: contract.classicalEnding,
            nawatEndings: contract.nawatEndings,
            firstConversionOutput: contract.orthographyConversions?.[0]?.output || "",
            diagnostic: contract.diagnostics?.[0] || "",
        };
    };
    s.eq(
        "Andrews 39.1 perfective patientive source-ending gate converts Classical endings to Nawat letters",
        {
            tz: summarizePerfectiveEndingContract("taketz"),
            x: summarizePerfectiveEndingContract("tax"),
            qu: summarizePerfectiveEndingContract("taqu"),
            blockedT: summarizePerfectiveEndingContract("tamat"),
            blockedCh: summarizePerfectiveEndingContract("kuch"),
        },
        {
            tz: {
                allowed: true,
                matchedEnding: "tz",
                contractId: "tz",
                classicalEnding: "tz",
                nawatEndings: ["tz"],
                firstConversionOutput: "tz",
                diagnostic: "perfective-patientive-source-ending-allowed",
            },
            x: {
                allowed: true,
                matchedEnding: "x",
                contractId: "sh",
                classicalEnding: "x",
                nawatEndings: ["sh"],
                firstConversionOutput: "sh",
                diagnostic: "perfective-patientive-source-ending-allowed",
            },
            qu: {
                allowed: true,
                matchedEnding: "qu",
                contractId: "k",
                classicalEnding: "k",
                nawatEndings: ["k"],
                firstConversionOutput: "k",
                diagnostic: "perfective-patientive-source-ending-allowed",
            },
            blockedT: {
                allowed: false,
                matchedEnding: "t",
                contractId: "",
                classicalEnding: "",
                nawatEndings: [],
                firstConversionOutput: "",
                diagnostic: "unsupported-perfective-patientive-source-ending",
            },
            blockedCh: {
                allowed: false,
                matchedEnding: "ch",
                contractId: "",
                classicalEnding: "",
                nawatEndings: [],
                firstConversionOutput: "",
                diagnostic: "unsupported-perfective-patientive-source-ending",
            },
        }
    );
    const nonactiveSuffixFrameContract = ctx.getPatientivoNonactiveSourceSuffixContract("luwa");
    const perfectiveFrameContract = ctx.getPatientivoPerfectiveSourceStemContract("taketz");
    const imperfectiveFrameContract = ctx.getPatientivoImperfectiveSourceStemContract({
        sourceStem: "matiya",
        outputStem: "tamatiya",
    });
    const rootStockFrameContract = ctx.getPatientivoRootStockSourceContract({
        sourceStem: "mat",
        outputStem: "mat",
    });
    const multipleFrameContract = ctx.buildPatientivoMultipleDerivationContract({
        patientivoInput: {
            verb: "ketza",
            surfaceForms: ["taketzti"],
        },
        selectedSource: "perfectivo",
        selectedOutputSurface: "taketzti",
    });
    s.eq(
        "patientive allomorphy contracts expose non-enumerable LCM frames",
        {
            nonactive: {
                routeFamily: nonactiveSuffixFrameContract.grammarFrame?.routeContract?.routeFamily || "",
                routeStage: nonactiveSuffixFrameContract.grammarFrame?.routeContract?.routeStage || "",
                generationAllowed: nonactiveSuffixFrameContract.grammarFrame?.routeContract?.generationAllowed,
                suffix: nonactiveSuffixFrameContract.grammarFrame?.stemFrame?.sourceSuffix || "",
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(nonactiveSuffixFrameContract, "grammarFrame"),
            },
            perfective: {
                routeStage: perfectiveFrameContract.grammarFrame?.routeContract?.routeStage || "",
                stem: perfectiveFrameContract.grammarFrame?.stemFrame?.sourceStem || "",
                output: perfectiveFrameContract.grammarFrame?.orthographyFrame?.nawatRuleSpelling || "",
            },
            imperfective: {
                routeStage: imperfectiveFrameContract.grammarFrame?.routeContract?.routeStage || "",
                output: imperfectiveFrameContract.grammarFrame?.routeContract?.targetContract?.outputSurface || "",
            },
            rootStock: {
                routeStage: rootStockFrameContract.grammarFrame?.routeContract?.routeStage || "",
                output: rootStockFrameContract.grammarFrame?.routeContract?.targetContract?.outputSurface || "",
            },
            multiple: {
                routeStage: multipleFrameContract.grammarFrame?.routeContract?.routeStage || "",
                procedureCount: multipleFrameContract.grammarFrame?.routeContract?.targetContract?.availableProcedureCount,
            },
        },
        {
            nonactive: {
                routeFamily: "patientive-source-contract",
                routeStage: "classify-nonactive-source-suffix",
                generationAllowed: false,
                suffix: "luwa",
                enumerableGrammarFrame: false,
            },
            perfective: {
                routeStage: "classify-perfective-source-ending",
                stem: "taketz",
                output: "tz",
            },
            imperfective: {
                routeStage: "classify-imperfective-source-stem",
                output: "tamatiyat",
            },
            rootStock: {
                routeStage: "classify-root-stock-source",
                output: "matti",
            },
            multiple: {
                routeStage: "classify-multiple-derivation",
                procedureCount: 4,
            },
        }
    );
    const sourceStageFrameContract = ctx.buildPatientivoSourceStageFrame({
        sourceType: "imperfectivo",
        sourceStem: "matiya",
        outputStem: "tamatiya",
        outputConnector: "t",
    });
    const framedAllomorphyContract = ctx.attachVncAllomorphyGrammarContract({
        result: "stale-allomorphy-result",
        outputSurface: "staleallomorphy",
        selectedOutputSurface: "stale-selected-allomorphy",
        sourceStem: "stale-source-stem",
        stem: "stale-stem",
        outputStem: "stale-output-stem",
        sourceSuffix: "stale-source-suffix",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frame-allomorph-a / frame-allomorph-b"],
                outputKind: "vnc-allomorphy-contract",
                generationRoute: "test-frame-reader",
                sourceInput: "frame-source-input",
            }),
        }),
    }, {
        metadataKind: "vnc-allomorphy-contract",
        routeStage: "test-frame-reader",
        supported: true,
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            surface: "stale-orthography-surface",
            surfaceForms: ["stale-orthography-a / stale-orthography-b"],
        },
        targetContract: {
            metadataKind: "vnc-allomorphy-contract",
            outputSurface: "stale-target-output",
            selectedOutputSurface: "stale-target-selected",
            surface: "stale-target-surface",
            surfaceForms: ["stale-target-form"],
        },
    });
    const emptyFramedAllomorphyContract = ctx.attachVncAllomorphyGrammarContract({
        result: "stale-empty-allomorphy-result",
        outputSurface: "staleemptyallomorphy",
        surface: "stale-empty-surface",
        selectedOutputSurface: "stale-empty-selected",
        sourceStem: "stale-empty-source-stem",
        stem: "stale-empty-stem",
        outputStem: "stale-empty-output-stem",
        sourceSuffix: "stale-empty-source-suffix",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surfaceForms: [],
                outputKind: "vnc-allomorphy-contract",
                generationRoute: "test-empty-frame-reader",
            }),
        }),
    }, {
        metadataKind: "vnc-allomorphy-contract",
        routeStage: "test-empty-frame-reader",
        supported: false,
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            surface: "stale-empty-orthography-surface",
            surfaceForms: ["stale-empty-orthography-a / stale-empty-orthography-b"],
        },
        targetContract: {
            metadataKind: "vnc-allomorphy-contract",
            outputSurface: "stale-empty-target-output",
            selectedOutputSurface: "stale-empty-target-selected",
            surface: "stale-empty-target-surface",
            surfaceForms: ["stale-empty-target-form"],
        },
    });
    s.eq(
        "patientive allomorphy contracts suppress stale aliases when result frame exists",
        {
            nonactive: nonactiveSuffixFrameContract.grammarFrame?.resultFrame?.surfaceForms || [],
            perfective: perfectiveFrameContract.grammarFrame?.resultFrame?.surfaceForms || [],
            imperfective: imperfectiveFrameContract.grammarFrame?.resultFrame?.surfaceForms || [],
            rootStock: rootStockFrameContract.grammarFrame?.resultFrame?.surfaceForms || [],
            sourceStage: sourceStageFrameContract.grammarFrame?.resultFrame?.surfaceForms || [],
            framed: framedAllomorphyContract.grammarFrame?.resultFrame?.surfaceForms || [],
            framedSurface: framedAllomorphyContract.surface || "",
            framedOrthography: framedAllomorphyContract.grammarFrame?.orthographyFrame?.surfaceForms || [],
            framedOrthographySurface: framedAllomorphyContract.grammarFrame?.orthographyFrame?.surface || "",
            framedSourceInput: framedAllomorphyContract.grammarFrame?.resultFrame?.sourceInput || "",
            framedStemSource: framedAllomorphyContract.grammarFrame?.stemFrame?.sourceStem || "",
            framedStemTarget: framedAllomorphyContract.grammarFrame?.stemFrame?.targetStem || "",
            framedStemSuffix: framedAllomorphyContract.grammarFrame?.stemFrame?.sourceSuffix || "",
            framedTargetOutput: framedAllomorphyContract.grammarFrame?.routeContract?.targetContract?.outputSurface || "",
            emptyFramed: emptyFramedAllomorphyContract.grammarFrame?.resultFrame?.surfaceForms || [],
            emptyFramedTopLevelForms: emptyFramedAllomorphyContract.surfaceForms || [],
            emptyFramedOrthography: emptyFramedAllomorphyContract.grammarFrame?.orthographyFrame?.surfaceForms || [],
            emptyFramedSurface: emptyFramedAllomorphyContract.surface || "",
            emptyFramedOrthographySurface: emptyFramedAllomorphyContract.grammarFrame?.orthographyFrame?.surface || "",
            emptyFramedSourceInput: emptyFramedAllomorphyContract.grammarFrame?.resultFrame?.sourceInput || "",
            emptyFramedStemSource: emptyFramedAllomorphyContract.grammarFrame?.stemFrame?.sourceStem || "",
            emptyFramedStemTarget: emptyFramedAllomorphyContract.grammarFrame?.stemFrame?.targetStem || "",
            emptyFramedStemSuffix: emptyFramedAllomorphyContract.grammarFrame?.stemFrame?.sourceSuffix || "",
            emptyFramedTargetOutput: emptyFramedAllomorphyContract.grammarFrame?.routeContract?.targetContract?.outputSurface || "",
        },
        {
            nonactive: ["luwa"],
            perfective: ["tz"],
            imperfective: ["tamatiyat"],
            rootStock: ["matti"],
            sourceStage: ["tamatiyat"],
            framed: ["frame-allomorph-a", "frame-allomorph-b"],
            framedSurface: "frame-allomorph-a",
            framedOrthography: ["frame-allomorph-a", "frame-allomorph-b"],
            framedOrthographySurface: "frame-allomorph-a",
            framedSourceInput: "frame-source-input",
            framedStemSource: "frame-source-input",
            framedStemTarget: "frame-allomorph-a",
            framedStemSuffix: "",
            framedTargetOutput: "frame-allomorph-a",
            emptyFramed: [],
            emptyFramedTopLevelForms: [],
            emptyFramedOrthography: [],
            emptyFramedSurface: "",
            emptyFramedOrthographySurface: "",
            emptyFramedSourceInput: "",
            emptyFramedStemSource: "",
            emptyFramedStemTarget: "",
            emptyFramedStemSuffix: "",
            emptyFramedTargetOutput: "",
        }
    );
    const blockedPerfectiveTCore = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "perfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.1 blocks perfective patientivo when the perfective source core ends in t",
        blockedPerfectiveTCore.error,
        true
    );
    s.eq(
        "blocked perfective patientivo exposes the LCM morphology-failure contract",
        {
            ok: blockedPerfectiveTCore.ok,
            surface: blockedPerfectiveTCore.surface,
            framesIsGrammarFrame: blockedPerfectiveTCore.frames === blockedPerfectiveTCore.grammarFrame,
            routeStage: blockedPerfectiveTCore.frames.routeContract.routeStage,
            generationAllowed: blockedPerfectiveTCore.frames.routeContract.generationAllowed,
            diagnosticId: blockedPerfectiveTCore.diagnostics[0].id,
            diagnosticFailedLayer: blockedPerfectiveTCore.diagnostics[0].failedLayer,
            diagnosticContractLayer: blockedPerfectiveTCore.diagnostics[0].contractLayer,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(blockedPerfectiveTCore, "grammarFrame"),
        },
        {
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeStage: "morphology-application",
            generationAllowed: false,
            diagnosticId: "nuclear-clause-surface-morphology-application-blocked",
            diagnosticFailedLayer: "stem",
            diagnosticContractLayer: "stemFrame",
            enumerableContract: false,
        }
    );
    const blockedPerfectiveChCore = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "perfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(kuchi)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.1 blocks perfective patientivo when the perfective source core ends in ch",
        blockedPerfectiveChCore.error,
        true
    );
    const possessedPerfectivePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "perfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(ketza)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.1 possessed tli-class patientivo drops Nawat ti connector instead of erroring",
        possessedPerfectivePatientivo.surfaceForms,
        ["nutaketz"]
    );
    s.eq(
        "generated perfective patientivo carries the same Andrews 39.1 source-ending gate in #3 salida metadata",
        {
            forms: possessedPerfectivePatientivo.surfaceForms,
            sourceCore: possessedPerfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceCore,
            matchedEnding: possessedPerfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceEndingContract.matchedEnding,
            contractId: possessedPerfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceEndingContract.contractId,
            allowed: possessedPerfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceEndingContract.allowed,
        },
        {
            forms: ["nutaketz"],
            sourceCore: "perfective-active-core",
            matchedEnding: "tz",
            contractId: "tz",
            allowed: true,
        }
    );
    const directImperfectiveVowelStemContract = ctx.getPatientivoImperfectiveSourceStemContract({
        sourceStem: "matiya",
        outputStem: "tamatiya",
    });
    const directImperfectiveConsonantStemContract = ctx.getPatientivoImperfectiveSourceStemContract({
        sourceStem: "mach",
        outputStem: "mach",
    });
    const generatedImperfectivePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "imperfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.2 imperfective patientive source-stem contract drives the ti-class Nawat connector",
        {
            vowelStem: {
                class: directImperfectiveVowelStemContract.andrewsNounstemClass,
                connector: directImperfectiveVowelStemContract.outputConnector,
                family: directImperfectiveVowelStemContract.nawatConnectorFamily,
                sourceModel: directImperfectiveVowelStemContract.classicalSourceModel.classD,
            },
            consonantStem: {
                class: directImperfectiveConsonantStemContract.andrewsNounstemClass,
                connector: directImperfectiveConsonantStemContract.outputConnector,
                family: directImperfectiveConsonantStemContract.nawatConnectorFamily,
            },
            generated: {
                forms: generatedImperfectivePatientivo.surfaceForms,
                sourceCore: generatedImperfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceCore,
                connector: generatedImperfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceStemContract.outputConnector,
                contractSurface: generatedImperfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.sourceStemContract.outputSurface,
                selectedOutputSurface: generatedImperfectivePatientivo.nominalizationProfile.patientiveSourceStageFrame.outputSurface,
            },
        },
        {
            vowelStem: {
                class: "ti",
                connector: "t",
                family: "t/ti",
                sourceModel: "imperfective-final-long-a",
            },
            consonantStem: {
                class: "ti",
                connector: "ti",
                family: "t/ti",
            },
            generated: {
                forms: ["tamatiyat"],
                sourceCore: "imperfective-active-core",
                connector: "t",
                contractSurface: "matiyat",
                selectedOutputSurface: "tamatiyat",
            },
        }
    );

    const passiveTransitiveZero = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    ["ta", "te"].forEach((objectPrefix) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.active,
                patientivoSource: "passive",
            },
            posicionesFormula: {
                pers1: "",
                obj1: objectPrefix,
                tronco: "-(mati)",
                pers2: "",
                num2: "",
                poseedor: "",
                tiempo: "patientivo",
            },
        });
        const profile = generated.nominalizationProfile.patientiveFamilyProfile;
        s.eq(
            `Andrews 37.9 passive patientivo clears single-object ${objectPrefix} from nounstem`,
            generated.surfaceForms,
            passiveTransitiveZero.surfaceForms
        );
        s.no(
            `passive patientivo ${objectPrefix} output does not retain nonspecific prefix`,
            generated.surfaceForms.some((form) => form.startsWith(objectPrefix))
        );
        s.eq(`patientivo passive exposes Andrews source core separately for ${objectPrefix}`, {
            family: profile.family,
            sourcePattern: profile.sourcePattern,
            sourceFamilyIds: profile.sourceFamilyIds,
            sourceFamilyLabel: profile.sourceFamilyLabel,
            boundary: profile.sourceFamilyBoundary,
            outputSlot: profile.sourceStageModel.slot,
        }, {
            family: "passive",
            sourcePattern: "passive-core",
            sourceFamilyIds: ["passive-core"],
            sourceFamilyLabel: "pasivo",
            boundary: "realized-through-current-nonactive-builder",
            outputSlot: "#3 salida",
        });
    });
    s.eq(
        "Andrews 41.2 patientive compound-source output preserves the underlying compound source when surfaces match",
        (() => {
            const generateCompoundPatientive = (patientivoSource) => ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "-(tal/chiwa)",
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "patientivo",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.nonactive,
                        voiceMode: ctx.VOICE_MODE.passive,
                        patientivoSource,
                    },
                },
            });
            const passive = generateCompoundPatientive("passive");
            const impersonal = generateCompoundPatientive("impersonal");
            const summarize = (generated) => ({
                surfaceForms: generated.surfaceForms,
                compoundFrame: {
                    kind: generated.compoundFrame?.kind || "",
                    matrixStem: generated.compoundFrame?.matrix?.stem || "",
                    embedValues: generated.compoundFrame?.embeds?.map((entry) => entry.value) || [],
                    rawInput: generated.compoundFrame?.sourceInput?.rawInput || "",
                },
                patientiveCompoundSourceFrame: {
                    kind: generated.patientiveCompoundSourceFrame?.kind || "",
                    lessonRef: generated.patientiveCompoundSourceFrame?.lessonRef || "",
                    outputKind: generated.patientiveCompoundSourceFrame?.outputKind || "",
                    patientiveFamily: generated.patientiveCompoundSourceFrame?.patientiveFamily || "",
                    sourcePattern: generated.patientiveCompoundSourceFrame?.sourcePattern || "",
                    sourceMatrixStem: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.matrix?.stem || "",
                    sourceEmbedValues: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.value) || [],
                    sourceRawInput: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.sourceInput?.rawInput || "",
                    cannotInferFromSurfaceAlone: generated.patientiveCompoundSourceFrame?.cannotInferFromSurfaceAlone,
                    changesSurfaceForms: generated.patientiveCompoundSourceFrame?.boundaries?.changesSurfaceForms,
                },
            });
            return {
                sameSurface: passive.surfaceForms.join("/") === impersonal.surfaceForms.join("/"),
                passive: summarize(passive),
                impersonal: summarize(impersonal),
            };
        })(),
        {
            sameSurface: true,
            passive: {
                surfaceForms: ["talchiwalti"],
                compoundFrame: {
                    kind: "compound-frame",
                    matrixStem: "chiwa",
                    embedValues: ["tal"],
                    rawInput: "-(tal/chiwa)",
                },
                patientiveCompoundSourceFrame: {
                    kind: "patientive-compound-source-frame",
                    lessonRef: "Andrews 41.2.3",
                    outputKind: "patientive-nnc-compound-source",
                    patientiveFamily: "passive",
                    sourcePattern: "passive-core",
                    sourceMatrixStem: "chiwa",
                    sourceEmbedValues: ["tal"],
                    sourceRawInput: "-(tal/chiwa)",
                    cannotInferFromSurfaceAlone: true,
                    changesSurfaceForms: false,
                },
            },
            impersonal: {
                surfaceForms: ["talchiwalti"],
                compoundFrame: {
                    kind: "compound-frame",
                    matrixStem: "chiwa",
                    embedValues: ["tal"],
                    rawInput: "-(tal/chiwa)",
                },
                patientiveCompoundSourceFrame: {
                    kind: "patientive-compound-source-frame",
                    lessonRef: "Andrews 41.2.3",
                    outputKind: "patientive-nnc-compound-source",
                    patientiveFamily: "impersonal",
                    sourcePattern: "impersonal-core",
                    sourceMatrixStem: "chiwa",
                    sourceEmbedValues: ["tal"],
                    sourceRawInput: "-(tal/chiwa)",
                    cannotInferFromSurfaceAlone: true,
                    changesSurfaceForms: false,
                },
            },
        }
    );
    const passiveReflexiveSource = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 37.9.2 passive patientivo maps source reflexive mu to shuntline ne",
        passiveReflexiveSource.surfaceForms,
        ["nemachti", "nemachit", "nematti", "nematit", "nematilti"]
    );
    const passiveDoubleProjectiveTaTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "te",
            tiempo: "patientivo",
        },
    });
    const passiveDoubleProjectiveTeTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 37.9.3 passive patientivo can keep the selected ta projective from a double-object source",
        passiveDoubleProjectiveTaTe.surfaceForms,
        ["tamachti", "tamachit", "tamatti", "tamatit", "tamatilti"]
    );
    s.eq(
        "Andrews 37.9.3 passive patientivo can keep selected te and also delete it from a double-object source",
        passiveDoubleProjectiveTeTa.surfaceForms,
        [
            "temachti", "machti",
            "temachit", "machit",
            "tematti", "matti",
            "tematit", "matit",
            "tematilti", "matilti",
        ]
    );
    const possessedPassivePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 37.9 possessed passive patientivo uses generated nounstem state, not route labels",
        possessedPassivePatientivo.surfaceForms,
        ["numach", "numachiw", "numat", "numatiw", "numatil"]
    );
    const possessedPassiveSelectedTePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "nu",
            obj2: "ta",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 37.9.3 possessed passive selected-te patientivo includes the deleted-te nounstem",
        possessedPassiveSelectedTePatientivo.surfaceForms,
        [
            "nutemach", "numach",
            "nutemachiw", "numachiw",
            "nutemat", "numat",
            "nutematiw", "numatiw",
            "nutematil", "numatil",
        ]
    );
    const impersonalTransitiveTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    const impersonalTransitiveProfile = impersonalTransitiveTa.nominalizationProfile.patientiveFamilyProfile;
    s.eq(
        "Andrews 38.1 impersonal patientivo keeps transitive ta object inside nounstem",
        impersonalTransitiveTa.surfaceForms,
        matiPatientivo.surfaceForms
    );
    const impersonalReflexiveSource = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "mu",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 38.1.2 impersonal patientivo maps source reflexive mu to shuntline ne",
        impersonalReflexiveSource.surfaceForms,
        ["nemachti", "nemachit", "nematti", "nematit", "nematilti"]
    );
    const impersonalTransitiveTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 38.1.4 impersonal patientivo maps single-object te source to ta pattern",
        impersonalTransitiveTe.surfaceForms,
        impersonalTransitiveTa.surfaceForms
    );
    s.no(
        "impersonal patientivo te source does not retain te as nounstem prefix",
        impersonalTransitiveTe.surfaceForms.some((form) => form.startsWith("te"))
    );
    const impersonalTransitiveTeWithShuntlineTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "te",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 38.1.3 impersonal patientivo maps mainline te to ta even with shuntline te present",
        impersonalTransitiveTeWithShuntlineTe.surfaceForms,
        ["tetamachti", "tetamachit", "tetamatti", "tetamatit", "tetamatilti"]
    );
    const impersonalTransitiveTeWithShuntlineTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 38.1.3 impersonal patientivo preserves te+tla when shuntline ta already marks the nonhuman patient",
        impersonalTransitiveTeWithShuntlineTa.surfaceForms,
        ["tetamachti", "tetamachit", "tetamatti", "tetamatit", "tetamatilti"]
    );
    const perfectiveMainlineTeWithShuntlineTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "perfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(ketza)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "te",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.1 patientivo analogy maps mainline te to ta even with shuntline te present",
        perfectiveMainlineTeWithShuntlineTe.surfaceForms,
        ["tetaketzti"]
    );
    const imperfectiveTeWithShuntlineTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "imperfectivo",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "te",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 39.2 imperfective patientivo preserves te+tla under impersonal analogy when shuntline ta already marks the patient",
        imperfectiveTeWithShuntlineTa.surfaceForms,
        ["tetamatiyat"]
    );
    s.eq("patientivo impersonal exposes Andrews source core separately", {
        family: impersonalTransitiveProfile.family,
        sourcePattern: impersonalTransitiveProfile.sourcePattern,
        sourceFamilyIds: impersonalTransitiveProfile.sourceFamilyIds,
        sourceFamilyLabel: impersonalTransitiveProfile.sourceFamilyLabel,
        boundary: impersonalTransitiveProfile.sourceFamilyBoundary,
        outputSlot: impersonalTransitiveProfile.sourceStageModel.slot,
    }, {
        family: "impersonal",
        sourcePattern: "impersonal-core",
        sourceFamilyIds: ["impersonal-core"],
        sourceFamilyLabel: "impersonal",
        boundary: "realized-through-current-nonactive-builder",
        outputSlot: "#3 salida",
    });

    const passiveFromIntransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "passive",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 37.9 contract blocks passive patientivo from intransitive ultimate source",
        passiveFromIntransitive.error,
        true
    );
    const impersonalFromIntransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            derivationMode: ctx.DERIVATION_MODE.active,
            patientivoSource: "impersonal",
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuni)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "patientivo",
        },
    });
    s.eq(
        "Andrews 38.1 contract permits impersonal patientivo from intransitive source",
        impersonalFromIntransitive.surfaceForms,
        ["pusunit", "pusunti"]
    );
    s.eq(
        "impersonal intransitive patientivo keeps impersonal-core family metadata",
        impersonalFromIntransitive.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
        ["impersonal-core"]
    );

    const buildSilentAdverbRequest = ({ verb, objectPrefix = "" }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.adverbio,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: objectPrefix,
            tronco: verb,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "pasado-remoto-adverbio-activo",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const adverbioMatiVi = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({ verb: "(mati)" }));
    s.ok("adverbio mati VI generates", adverbioMatiVi && !adverbioMatiVi.error);
    s.eq("adverbio mati VI uses active preterit adverb forms", adverbioMatiVi.surfaceForms, ["matka", "matika"]);
    s.eq(
        "adverbio generated output carries diagnostic Lesson 44 frame without changing forms",
        {
            kind: adverbioMatiVi.adverbialNuclearFrame?.kind,
            lesson: adverbioMatiVi.adverbialNuclearFrame?.lesson,
            adverbialKind: adverbioMatiVi.adverbialNuclearFrame?.adverbial?.kind,
            sourceStem: adverbioMatiVi.adverbialNuclearFrame?.sourceVnc?.stem,
            sourceValency: adverbioMatiVi.adverbialNuclearFrame?.sourceVnc?.valency,
            clauseFrameKind: adverbioMatiVi.adverbialNuclearClauseFrame?.kind,
            clauseFrameDegree: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.degree,
            clauseFrameDomain: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.semanticDomain,
            clauseFrameSubjectNum1Changes: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.subjectPronoun?.num1?.changesSoundedFillerToSilent,
            clauseFrameChangesSurfaceForms: adverbioMatiVi.adverbialNuclearClauseFrame?.generationContract?.changesSurfaceForms,
            hasKnownConfiguredAdverbioTense: adverbioMatiVi.adverbialNuclearFrame?.classification?.hasKnownConfiguredAdverbioTense,
            changesSurfaceForms: adverbioMatiVi.adverbialNuclearFrame?.boundaries?.changesSurfaceForms,
            forms: adverbioMatiVi.surfaceForms,
        },
        {
            kind: "adverbial-nuclear-frame",
            lesson: 44,
            adverbialKind: "manner-surface",
            sourceStem: "mati",
            sourceValency: "intransitive",
            clauseFrameKind: "adverbial-nuclear-clause-frame",
            clauseFrameDegree: "first-degree",
            clauseFrameDomain: "manner",
            clauseFrameSubjectNum1Changes: false,
            clauseFrameChangesSurfaceForms: false,
            hasKnownConfiguredAdverbioTense: true,
            changesSurfaceForms: false,
            forms: ["matka", "matika"],
        }
    );
    s.eq(
        "adverbio generated output carries diagnostic Lessons 49-50 adjunction boundary frame",
        {
            kind: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.kind,
            lessonRange: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.lessonRange,
            statusLabel: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.statusLabel,
            candidateLabel: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.candidate?.label,
            semanticRelation: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.semanticRelation,
            adjoinedUnitType: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.adjoinedUnitType,
            falsePositiveSource: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.falsePositiveSource,
            singleGeneratedWordIsEvidence: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.boundaries?.singleGeneratedWordIsEvidence,
            forms: adverbioMatiVi.surfaceForms,
        },
        {
            kind: "adverbial-adjunction-boundary-frame",
            lessonRange: "49-50",
            statusLabel: "no confirmada",
            candidateLabel: "adverbio heredado",
            semanticRelation: "manner",
            adjoinedUnitType: "vnc",
            falsePositiveSource: "configured-adverbio-surface",
            singleGeneratedWordIsEvidence: false,
            forms: ["matka", "matika"],
        }
    );

    const adverbioMatiVtTa = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({
        verb: "-(mati)",
        objectPrefix: "ta",
    }));
    s.ok("adverbio mati VT ta generates", adverbioMatiVtTa && !adverbioMatiVtTa.error);
    s.eq("adverbio mati VT ta does not double-prefix ta", adverbioMatiVtTa.surfaceForms, ["tamatka", "tamatika"]);
    s.eq(
        "transitive adverbio frame records source valency only",
        {
            sourceValency: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.valency,
            objectPrefix: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.objectPrefix,
            baseObjectPrefix: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.baseObjectPrefix,
            forms: adverbioMatiVtTa.surfaceForms,
        },
        {
            sourceValency: "transitive",
            objectPrefix: "",
            baseObjectPrefix: "ta",
            forms: ["tamatka", "tamatika"],
        }
    );

    const adverbioMatiVtZero = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({ verb: "-(mati)" }));
    s.eq("adverbio mati VT rejects zero object", adverbioMatiVtZero.error, "Adverbio activo transitivo solo con ta/te/mu.");

    const buildSilentActiveAdjectiveRequest = ({
        tense,
        verb,
        subjectPrefix = "",
        subjectSuffix = "",
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.adjetivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: subjectPrefix,
            obj1: "",
            tronco: verb,
            pers2: subjectSuffix,
            num2: subjectSuffix,
            poseedor: "",
            tiempo: tense,
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const chipawaPreteritoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-tik",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo preterito -tik uses patientivo tronco -k core", chipawaPreteritoTik.surfaceForms, ["chipaktik"]);
    s.eq("adjetivo preterito -tik profile marks adjectival surface but not modification", summarizeNominalizationProfile(chipawaPreteritoTik.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "adjetivo-preterito-tik",
        sourceTense: "preterito",
        nominalizationKind: "adjectival-surface",
        semanticRole: "property",
        patientiveFamily: "",
        adjectivalFunction: "predicate-surface",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const chipawaPerfectoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-tik",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo perfecto -tik uses patientivo tronco -kti core", chipawaPerfectoTik.surfaceForms, ["chipaktituk"]);
    const chipawaPreteritoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo preterito -naj uses patientivo tronco -k core", chipawaPreteritoNaj.surfaceForms, ["chipaknaj"]);
    const chipawaPreteritoNajFirstPlural = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
        subjectPrefix: "ti",
        subjectSuffix: "t",
    }));
    s.eq("adjetivo preterito -naj plural keeps preterite plural tail", chipawaPreteritoNajFirstPlural.surfaceForms, ["tichipaknajket"]);
    const chipawaPreteritoNajEachOfUsBase = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
        subjectPrefix: "ti",
    }));
    s.eq(
        "adjetivo preterito -naj distributive plural reduplicates singular surface",
        ctx.reduplicateConjugationDisplay(chipawaPreteritoNajEachOfUsBase.result, {
            prefixChain: "ti",
            applyMissingPrefixChain: true,
        }),
        "tichijchipaknaj"
    );
    const chipawaPerfectoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-naj",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo perfecto -naj uses patientivo tronco -k core", chipawaPerfectoNaj.surfaceForms, ["chipaknajtuk"]);
    const pusuniPreteritoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-tik",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VI -ti preterit keeps stale generation", pusuniPreteritoTik.surfaceForms, ["pusuktik"]);
    s.eq("pusuni denominal VI -ti preterit exposes route-family metadata without adding surfaces", summarizeDenominalFamilyProfile(pusuniPreteritoTik.denominalFamilyProfile), {
        curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
        outputKind: "denominal-route",
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-preterit",
        routePlacement: "patientivo-tronco-conversion",
        routeProfileSource: "static-modes",
        sourceState: "patientivo-tronco",
        suffixContract: {
            classicalSuffix: "ti",
            nawatRuleSuffix: "ti",
            nawatVerbalizer: "-ti",
            routeVerbalizer: "-ti",
        },
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "preterito",
        surfaceSuffix: "-tik",
        supportStatus: "current-route-supported",
        isCompleteLesson54_55: false,
        noNewSurfaceForms: true,
        noAndrewsSuffixContract: false,
    });
    const viTiRouteProfile = ctx.getNawatRouteProfile("adjetivo-preterito-tik");
    s.eq("generated VI -ti denominal metadata derives from static route profile", {
        routeFamily: pusuniPreteritoTik.denominalFamilyProfile.routeFamily,
        structuralAnalogue: pusuniPreteritoTik.denominalFamilyProfile.structuralAnalogue,
        routeId: pusuniPreteritoTik.denominalFamilyProfile.routeId,
        verbalizer: pusuniPreteritoTik.denominalFamilyProfile.verbalizer,
        valency: pusuniPreteritoTik.denominalFamilyProfile.valency,
        targetTense: pusuniPreteritoTik.denominalFamilyProfile.targetTense,
        surfaceSuffix: pusuniPreteritoTik.denominalFamilyProfile.surfaceSuffix,
    }, {
        routeFamily: viTiRouteProfile.denominalFamily,
        structuralAnalogue: viTiRouteProfile.structuralAnalogue,
        routeId: viTiRouteProfile.id,
        verbalizer: viTiRouteProfile.verbalizer,
        valency: viTiRouteProfile.valency,
        targetTense: viTiRouteProfile.nawatTenseValue,
        surfaceSuffix: viTiRouteProfile.surfaceSuffix,
    });
    s.eq("generated denominal metadata carries Andrews contract coverage without broadening surfaces", {
        outputKind: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.outputKind || "",
        contractCount: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.contractCount || 0,
        routeCoveredContractCount: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.routeCoveredContractCount || 0,
        unmodeledContractCount: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.unmodeledContractCount || 0,
        targetUnmodeledContractCount: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.targetUnmodeledContractCount || 0,
        nawatOnlyRouteFamilies: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.nawatOnlyRouteFamilies || [],
        noNewSurfaceForms: pusuniPreteritoTik.denominalFamilyProfile.andrewsContractCoverage?.boundaries?.noNewSurfaceForms === true,
    }, {
        outputKind: "denominal-andrews-contract-coverage",
        contractCount: 26,
        routeCoveredContractCount: 3,
        unmodeledContractCount: 23,
        targetUnmodeledContractCount: 1,
        nawatOnlyRouteFamilies: ["vt-na"],
        noNewSurfaceForms: true,
    });
    const generatedAndrewsRoutePreview = pusuniPreteritoTik.denominalFamilyProfile.andrewsContractRoutePreview;
    const findGeneratedAndrewsRoute = (contractId, routeTemplateId) => (
        (generatedAndrewsRoutePreview?.routes || []).find((route) => (
            route.contractId === contractId && route.routeTemplateId === routeTemplateId
        ))
    );
    const wFinalGeneratedAndrewsRoutePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "tlaw",
        contractId: "55.7-transitive-i-a",
    });
    s.eq("generated Andrews 55.7 i-a route flags w-final huia ambiguity", {
        routeDiagnosticCount: wFinalGeneratedAndrewsRoutePreview.routeDiagnosticCount,
        routeWarningCount: wFinalGeneratedAndrewsRoutePreview.routeWarningCount,
        routeNoteCount: wFinalGeneratedAndrewsRoutePreview.routeNoteCount,
        routeDiagnostics: (wFinalGeneratedAndrewsRoutePreview.routes?.[0]?.routeDiagnostics || []).map((diagnostic) => ({
            id: diagnostic.id,
            alternateContractId: diagnostic.alternateContractId,
            relatedContractId: diagnostic.relatedContractId,
            severity: diagnostic.severity,
            noFixtureEvidence: diagnostic.boundaries?.noFixtureEvidence === true,
            doesNotRejectRouteTarget: diagnostic.boundaries?.doesNotRejectRouteTarget === true,
        })),
    }, {
        routeDiagnosticCount: 3,
        routeWarningCount: 1,
        routeNoteCount: 2,
        routeDiagnostics: [
            {
                id: "andrews-55.7-i-a-w-final-source-may-be-huia",
                alternateContractId: "55.3-intransitive-o-a-applicative-huia",
                relatedContractId: undefined,
                severity: "warning",
                noFixtureEvidence: true,
                doesNotRejectRouteTarget: true,
            },
            {
                id: "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                alternateContractId: undefined,
                relatedContractId: undefined,
                severity: "info",
                noFixtureEvidence: true,
                doesNotRejectRouteTarget: true,
            },
            {
                id: "andrews-55.7-i-a-source-i-hui-causative-path-possible",
                alternateContractId: undefined,
                relatedContractId: "55.6-i-hui-a-hui-to-o-a",
                severity: "info",
                noFixtureEvidence: true,
                doesNotRejectRouteTarget: true,
            },
        ],
    });
    s.eq("generated denominal metadata carries Andrews NNC-to-VNC route targets without finite generation", {
        outputKind: generatedAndrewsRoutePreview?.outputKind || "",
        sourceStem: generatedAndrewsRoutePreview?.sourceStem || "",
        contractCount: generatedAndrewsRoutePreview?.contractCount || 0,
        routeCount: generatedAndrewsRoutePreview?.routeCount || 0,
        finiteRouteRequestCount: generatedAndrewsRoutePreview?.finiteRouteRequestCount || 0,
        finiteRouteObjectPrefixRequiredCount: generatedAndrewsRoutePreview?.finiteRouteObjectPrefixRequiredCount || 0,
        finiteRouteStemClassContractCount: generatedAndrewsRoutePreview?.finiteRouteStemClassContractCount || 0,
        finiteRouteSourceEvidenceRequiredCount: generatedAndrewsRoutePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
        doesNotGenerateFiniteVnc: generatedAndrewsRoutePreview?.boundaries?.doesNotGenerateFiniteVnc === true,
        noFixtureEvidence: generatedAndrewsRoutePreview?.boundaries?.noFixtureEvidence === true,
        targets: [
            findGeneratedAndrewsRoute("54.2.2-inceptive-stative-hui", "hui"),
            findGeneratedAndrewsRoute("54.2.3-ti-ya-deverbal", "ti-ya"),
            findGeneratedAndrewsRoute("54.2.3-hui-ya-deverbal", "hui-ya"),
            findGeneratedAndrewsRoute("54.4-possession-ti", "possession-ti"),
            findGeneratedAndrewsRoute("55.2-causative-tla", "tla"),
            findGeneratedAndrewsRoute("55.2-tla-ti-lia-applicative", "tla-ti-lia"),
            findGeneratedAndrewsRoute("55.2-intransitive-tla", "intransitive-tla"),
            findGeneratedAndrewsRoute("55.2-intransitive-tla-ti-a-causative", "intransitive-tla-ti-a"),
            findGeneratedAndrewsRoute("55.2-intransitive-tla-ti-lia-applicative", "intransitive-tla-ti-lia"),
            findGeneratedAndrewsRoute("55.3-intransitive-o-a-applicative-huia", "o-a"),
            findGeneratedAndrewsRoute("55.3-intransitive-o-a-applicative-huia", "huia"),
            findGeneratedAndrewsRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-i-l-huia"),
            findGeneratedAndrewsRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-a-l-huia"),
            findGeneratedAndrewsRoute("55.7-transitive-i-a", "i-a"),
        ].map((route) => ({
            contractId: route?.contractId || "",
            routeTemplateId: route?.routeTemplateId || "",
            classicalSuffixSequence: route?.classicalSuffixSequence || "",
                nawatSurfaceSuffix: route?.nawatSurfaceSuffix || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                targetStemClass: route?.targetStemClass || "",
                finiteGenerationRequiresSourceEvidence: route?.finiteGenerationRequiresSourceEvidence === true,
                generationAllowed: route?.generationAllowed === true,
                routeTargetGenerated: route?.routeTargetGenerated === true,
            })),
    }, {
        outputKind: "denominal-andrews-contract-route-preview",
        sourceStem: "pusuk",
        contractCount: 26,
        routeCount: 31,
        finiteRouteRequestCount: 11,
        finiteRouteObjectPrefixRequiredCount: 3,
        finiteRouteStemClassContractCount: 10,
        finiteRouteSourceEvidenceRequiredCount: 20,
        doesNotGenerateFiniteVnc: true,
        noFixtureEvidence: true,
        targets: [
            {
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                classicalSuffixSequence: "hui",
                nawatSurfaceSuffix: "wi",
                targetVerbStem: "pusukwi",
                targetInputValue: "(pusukwi)",
                targetStemClass: "A",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
            {
                contractId: "54.2.3-ti-ya-deverbal",
                routeTemplateId: "ti-ya",
                classicalSuffixSequence: "ti-ya",
                nawatSurfaceSuffix: "tiya",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "A/B",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "54.2.3-hui-ya-deverbal",
                routeTemplateId: "hui-ya",
                classicalSuffixSequence: "hui-ya",
                nawatSurfaceSuffix: "wiya",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "B",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "54.4-possession-ti",
                routeTemplateId: "possession-ti",
                classicalSuffixSequence: "ti",
                nawatSurfaceSuffix: "ti",
                targetVerbStem: "pusukti",
                targetInputValue: "(pusukti)",
                targetStemClass: "A/B",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
            {
                contractId: "55.2-causative-tla",
                routeTemplateId: "tla",
                classicalSuffixSequence: "tla",
                nawatSurfaceSuffix: "ta",
                targetVerbStem: "pusukta",
                targetInputValue: "(pusuk)-(ta)",
                targetStemClass: "A",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
            {
                contractId: "55.2-tla-ti-lia-applicative",
                routeTemplateId: "tla-ti-lia",
                classicalSuffixSequence: "ti-lia",
                nawatSurfaceSuffix: "tilia",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.2-intransitive-tla",
                routeTemplateId: "intransitive-tla",
                classicalSuffixSequence: "tla",
                nawatSurfaceSuffix: "ta",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.2-intransitive-tla-ti-a-causative",
                routeTemplateId: "intransitive-tla-ti-a",
                classicalSuffixSequence: "ti-a",
                nawatSurfaceSuffix: "tia",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.2-intransitive-tla-ti-lia-applicative",
                routeTemplateId: "intransitive-tla-ti-lia",
                classicalSuffixSequence: "ti-lia",
                nawatSurfaceSuffix: "tilia",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "o-a",
                classicalSuffixSequence: "o-a",
                nawatSurfaceSuffix: "ua",
                targetVerbStem: "pusukua",
                targetInputValue: "(pusukua)",
                targetStemClass: "C",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "huia",
                classicalSuffixSequence: "huia",
                nawatSurfaceSuffix: "wia",
                targetVerbStem: "pusukwia",
                targetInputValue: "(pusuk)-(wia)",
                targetStemClass: "C",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
            {
                contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
                routeTemplateId: "o-a-i-l-huia",
                classicalSuffixSequence: "i-l-huia",
                nawatSurfaceSuffix: "ilwia",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
                routeTemplateId: "o-a-a-l-huia",
                classicalSuffixSequence: "a-l-huia",
                nawatSurfaceSuffix: "alwia",
                targetVerbStem: "",
                targetInputValue: "",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: true,
                generationAllowed: false,
                routeTargetGenerated: false,
            },
            {
                contractId: "55.7-transitive-i-a",
                routeTemplateId: "i-a",
                classicalSuffixSequence: "i-a",
                nawatSurfaceSuffix: "ia",
                targetVerbStem: "pusukia",
                targetInputValue: "(pusuk)-(ia)",
                targetStemClass: "",
                finiteGenerationRequiresSourceEvidence: false,
                generationAllowed: false,
                routeTargetGenerated: true,
            },
        ],
    });
    const pusuktiVerbPreterito = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "pusukti",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "preterito",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq("pusukti lives in verb convention preterite", pusuktiVerbPreterito.surfaceForms, ["pusuktik"]);
    const pusuniPerfectoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-tik",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VI -ti perfect keeps stale generation", pusuniPerfectoTik.surfaceForms, ["pusuktituk"]);
    const pusuniPreteritoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VT -na preterit keeps stale generation", pusuniPreteritoNaj.surfaceForms, ["pusuknaj"]);
    s.eq("pusuni denominal VT -na preterit exposes route-family metadata without adding surfaces", summarizeDenominalFamilyProfile(pusuniPreteritoNaj.denominalFamilyProfile), {
        curriculumRef: { source: "Nawat route data", range: "static_modes", role: "configured-denominal-route" },
        outputKind: "denominal-route",
        routeFamily: "vt-na",
        structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        routeId: "denominal-vt-na-preterit",
        routePlacement: "patientivo-tronco-conversion",
        routeProfileSource: "static-modes",
        sourceState: "patientivo-tronco",
        suffixContract: null,
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "preterito",
        surfaceSuffix: "-naj",
        supportStatus: "current-route-supported-nawat-only",
        isCompleteLesson54_55: false,
        noNewSurfaceForms: true,
        noAndrewsSuffixContract: true,
    });
    const pusuniPerfectoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-naj",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VT -na perfect keeps stale generation", pusuniPerfectoNaj.surfaceForms, ["pusuknajtuk"]);
    s.eq("denominal-style adjective profile remains a surface classification only", summarizeNominalizationProfile(pusuniPerfectoNaj.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "adjetivo-perfecto-naj",
        sourceTense: "perfecto",
        nominalizationKind: "adjectival-surface",
        semanticRole: "property",
        patientiveFamily: "",
        adjectivalFunction: "predicate-surface",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const segmentedNaPreterit = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: ctx.TENSE_MODE.verbo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(pusuk)-(na)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "preterito",
        },
    });
    s.eq("segmented nawat -na verb convention preterite produces -naj", segmentedNaPreterit.surfaceForms, ["pusuknaj"]);

    const restoreState = {
        tenseMode: typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : null,
        derivationMode: typeof ctx.getActiveDerivationMode === "function" ? ctx.getActiveDerivationMode() : null,
        derivationType: typeof ctx.getActiveDerivationType === "function" ? ctx.getActiveDerivationType() : null,
        voiceMode: typeof ctx.getActiveVoiceMode === "function" ? ctx.getActiveVoiceMode() : null,
        combinedMode: typeof ctx.getCombinedMode === "function" ? ctx.getCombinedMode() : null,
    };
    const callIfExists = (name, ...args) => {
        if (typeof ctx[name] === "function") {
            ctx[name](...args);
        }
    };
    const advertisedRouteFailures = [];
    const routeSamples = [
        { label: "VI mati", verb: "(mati)" },
        { label: "VT mati", verb: "-(mati)" },
        { label: "VI nemi", verb: "(nemi)" },
        { label: "VT maka", verb: "-(maka)" },
    ];
    const routeModeNames = ["verbo", "sustantivo", "adjetivo", "adverbio"];
    const routeDerivationTypeNames = ["direct", "causative", "applicative"];
    const getRouteObjectPrefixes = (modeName, tense, verb) => {
        const parsed = ctx.parseVerbInput(verb);
        if (modeName === "sustantivo" || modeName === "adjetivo" || modeName === "adverbio") {
            const bundle = ctx.getNounObjectSlotPlansFromMeta(parsed, tense, {
                combinedMode: ctx.COMBINED_MODE.active,
            });
            const primarySlot = bundle.slotPlans.find((slot) => slot.id === "object");
            return primarySlot ? primarySlot.toggleValues : [""];
        }
        return ctx.getBaseObjectSlots(parsed) > 0 ? ["", "ki", "ta", "te", "mu"] : [""];
    };
    routeModeNames.forEach((modeName) => {
        const mode = ctx.TENSE_MODE[modeName];
        callIfExists("setActiveTenseMode", mode);
        callIfExists("setActiveDerivationMode", ctx.DERIVATION_MODE.active);
        callIfExists("setActiveVoiceMode", ctx.VOICE_MODE.active);
        callIfExists("setCombinedMode", ctx.COMBINED_MODE.active);
        ctx.getTenseOrderForMode(mode).forEach((tense) => {
            routeDerivationTypeNames.forEach((derivationTypeName) => {
                const derivationType = ctx.DERIVATION_TYPE[derivationTypeName];
                callIfExists("setActiveDerivationType", derivationType);
                routeSamples.forEach((sample) => {
                    getRouteObjectPrefixes(modeName, tense, sample.verb).forEach((objectPrefix) => {
                        try {
                            ctx.executeGenerateWordRequest({
                                options: {
                                    silent: true,
                                    skipValidation: false,
                                    override: {
                                        tenseMode: mode,
                                        derivationMode: ctx.DERIVATION_MODE.active,
                                        derivationType,
                                        voiceMode: ctx.VOICE_MODE.active,
                                    },
                                },
                                posicionesFormula: {
                                    pers1: "",
                                    obj1: "",
                                    tronco: sample.verb,
                                    pers2: "",
                                    num2: "",
                                    poseedor: "",
                                    tiempo: tense,
                                },
                                entradaTronco: {
                                    tieneControlTronco: false,
                                    valorTronco: "",
                                },
                            });
                        } catch (error) {
                            advertisedRouteFailures.push({
                                mode: modeName,
                                tense,
                                derivationType: derivationTypeName,
                                sample: sample.label,
                                objectPrefix: objectPrefix || "Ø",
                                error: error && error.message ? error.message : String(error),
                            });
                        }
                    });
                });
            });
        });
    });
    callIfExists("setActiveTenseMode", restoreState.tenseMode);
    callIfExists("setActiveDerivationMode", restoreState.derivationMode);
    callIfExists("setActiveDerivationType", restoreState.derivationType);
    callIfExists("setActiveVoiceMode", restoreState.voiceMode);
    callIfExists("setCombinedMode", restoreState.combinedMode);
    s.eq("advertised direct mode routes do not throw", advertisedRouteFailures, []);

    return s;
}

module.exports = { run };
