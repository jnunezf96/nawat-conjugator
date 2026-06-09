"use strict";

/**
 * Tests for src/core/preterit/context.js and engine.js
 * Covers: getPretUniversalCoreVowelCount, getPretUniversalClassOrder,
 *         getMonosyllableStemPath, getUniversalReplacementStem.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("preterit");

    // getPretUniversalClassOrder — canonical order must be A, B, C, D
    s.eq("class order = [A,B,C,D]", ctx.getPretUniversalClassOrder(), ["A","B","C","D"]);

    // getPretUniversalCoreVowelCount — counts vowel letters in stem
    s.eq("vowel count: nemi = 2", ctx.getPretUniversalCoreVowelCount("nemi"), 2);
    s.eq("vowel count: nem = 1", ctx.getPretUniversalCoreVowelCount("nem"), 1);
    s.eq("vowel count: kisa = 2", ctx.getPretUniversalCoreVowelCount("kisa"), 2);
    s.eq("vowel count: chia = 2", ctx.getPretUniversalCoreVowelCount("chia"), 2);
    s.eq("vowel count: chiwa = 2", ctx.getPretUniversalCoreVowelCount("chiwa"), 2);

    // getUniversalReplacementStem — Class C: j replaces the final vowel of a two-vowel ending
    s.eq("class C replacement: nemia → nemij (j replaces final -a)", ctx.getUniversalReplacementStem("nemia"), "nemij");
    s.eq("class C replacement: nemua → nemuj (j replaces final -a)", ctx.getUniversalReplacementStem("nemua"), "nemuj");

    // getMonosyllableStemPath — Class D: j appends after the nucleus of a vowel-final monosyllable
    const monoKi = ctx.getMonosyllableStemPath("ki");
    s.eq("class D monosyllable: ki → path=monosyllable", monoKi.path, "monosyllable");
    s.eq("class D monosyllable: ki → classDBase=kij (j appended after nucleus)", monoKi.classDBase, "kij");

    const monoMu = ctx.getMonosyllableStemPath("mu");
    s.eq("class D monosyllable: mu → classDBase=muj", monoMu.classDBase, "muj");

    // preterit context cache — explicit lifecycle hooks for isolated runtimes
    ctx.resetPretUniversalContextCache();
    s.eq("preterit cache: starts empty", ctx.getPretUniversalContextCacheSize(), 0);
    ctx.buildPretUniversalContext("nemi", "nemi", false, {});
    s.eq("preterit cache: populated after context build", ctx.getPretUniversalContextCacheSize(), 1);
    ctx.resetPretUniversalContextCache();
    s.eq("preterit cache: reset clears entries", ctx.getPretUniversalContextCacheSize(), 0);

    // preterit API wrappers — extracted from surface.js into preterit/api.js
    const markerOptions = ctx.buildPretMarkerOptionsFromFlags({ analysisVerb: "nemi" });
    const contextOptions = ctx.buildPretContextOptionsFromMeta({ exactBaseVerb: "nemi" });
    const bundle = ctx.resolvePretUniversalContextBundle({
        verb: "nemi",
        analysisVerb: "nemi",
        isTransitive: false,
        markerOptions,
        contextOptions,
        includeSummary: true,
    });
    s.eq("preterit API: meta options keep exact base", contextOptions.exactBaseVerb, "nemi");
    s.eq("preterit API: bundle analysis target = nemi", bundle.analysisTarget, "nemi");
    s.ok("preterit API: bundle context exists", bundle.context && typeof bundle.context === "object");
    s.ok("preterit API: bundle summary exists", bundle.summary && typeof bundle.summary === "object");
    s.eq(
        "preterit API: class profile helper rejects missing provenance",
        ctx.buildVncVerbstemClassProfileFromProvenance(null),
        null
    );

    const universalClassA = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "preterito-universal-1",
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "preterit universal output exposes diagnostic verbstem class profile",
        {
            classKey: universalClassA.verbstemClassProfile?.classKey,
            source: universalClassA.verbstemClassProfile?.source,
            diagnosticOnly: universalClassA.verbstemClassProfile?.diagnosticOnly,
            doesNotGenerateForms: universalClassA.verbstemClassProfile?.doesNotGenerateForms,
            fromProvenance: universalClassA.stemProvenance?.verbstemClassProfile?.classKey,
        },
        {
            classKey: "A",
            source: "preterit-provenance",
            diagnosticOnly: true,
            doesNotGenerateForms: true,
            fromProvenance: "A",
        }
    );
    s.eq(
        "preterit class-based direct result exposes non-enumerable LCM frame",
        (() => {
            const result = ctx.buildClassBasedResultWithProvenance({
                verb: "asi",
                analysisVerb: "asi",
                exactBaseVerb: "asi",
                tense: "preterito",
                classFilter: "A",
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                frameAlias: result.frames === result.grammarFrame,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                evidenceStatus: result.grammarFrame.authorityFrame.evidenceStatus,
                classKey: result.grammarFrame.stemFrame.classKey,
            };
        })(),
        {
            result: "niaski",
            forms: ["niaski"],
            ok: true,
            surface: "niaski",
            frameAlias: true,
            grammarFrameEnumerable: false,
            routeFamily: "preterit-class-based-result",
            routeStage: "assemble-output",
            unitKind: "verbal-nuclear-clause",
            generationAllowed: true,
            evidenceStatus: "generated",
            classKey: "A",
        }
    );
    s.eq(
        "preterit class-based contract reader prefers LCM result-frame surface forms before legacy no-output text",
        (() => {
            const result = ctx.attachPreteritClassBasedGrammarContract({
                result: "stale-preterit-result",
                surface: "top-preterit-surface",
                forms: ["stale-preterit-form"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-pret-surface",
                        surfaceForms: ["frame-pret-a / frame-pret-b"],
                    }),
                }),
            }, {
                verb: "asi",
                analysisVerb: "asi",
                tense: "preterito",
                classKey: "A",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
            };
        })(),
        {
            ok: true,
            surface: "frame-pret-a",
            frameSurface: "frame-pret-a",
            frameForms: ["frame-pret-a", "frame-pret-b", "frame-pret-surface"],
            generationAllowed: true,
        }
    );
    s.eq(
        "preterit class-based contract reader keeps legacy forms for metadata-only frames",
        (() => {
            const result = ctx.attachPreteritClassBasedGrammarContract({
                result: "legacy-preterit-result",
                surface: "top-preterit-surface",
                forms: ["legacy-preterit-a / legacy-preterit-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "preterit-class-based-result",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            }, {
                verb: "asi",
                analysisVerb: "asi",
                tense: "preterito",
                classKey: "A",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "legacy-preterit-a",
            frameSurface: "legacy-preterit-a",
            frameForms: ["legacy-preterit-a", "legacy-preterit-b", "top-preterit-surface", "legacy-preterit-result"],
        }
    );
    s.eq(
        "preterit class-based blocked result normalizes dash surface",
        (() => {
            const result = ctx.buildClassBasedResultWithProvenance({
                verb: "asi",
                analysisVerb: "asi",
                exactBaseVerb: "asi",
                tense: "perfecto",
                classFilter: "B",
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticStatus: result.grammarFrame.diagnosticFrame.status,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
                diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(result, "diagnostics"),
            };
        })(),
        {
            result: "—",
            forms: [],
            ok: false,
            surface: "",
            routeStage: "class-result-gate",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "preterit-class-based-result-no-output",
            diagnosticFailedLayer: "output",
            diagnosticContractLayer: "resultFrame",
            diagnosticsEnumerable: false,
        }
    );
    s.eq(
        "preterit variant assembly exposes LCM frame",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const result = ctx.buildPretUniversalResultDetailedFromVariants(variants, "ni", "", "");
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                variantCount: result.grammarFrame.stemFrame.variantCount,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
            };
        })(),
        {
            result: "niaski",
            forms: ["niaski"],
            ok: true,
            surface: "niaski",
            routeFamily: "preterit-variant-assembly",
            routeStage: "assemble-variants",
            unitKind: "verbal-nuclear-clause",
            variantCount: 1,
            grammarFrameEnumerable: false,
        }
    );
    s.eq(
        "preterit variant assembly contract reader prefers LCM result-frame surface forms before legacy no-output text",
        (() => {
            const result = ctx.attachPretUniversalVariantAssemblyGrammarContract({
                result: "stale-variant-result",
                surface: "top-variant-surface",
                forms: ["stale-variant-form"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-variant-surface",
                        surfaceForms: ["frame-variant-a / frame-variant-b"],
                    }),
                }),
            }, {
                variants: [],
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
            };
        })(),
        {
            ok: true,
            surface: "frame-variant-a",
            frameSurface: "frame-variant-a",
            frameForms: ["frame-variant-a", "frame-variant-b", "frame-variant-surface"],
            generationAllowed: true,
        }
    );
    s.eq(
        "preterit variant assembly reader keeps legacy forms for metadata-only frames",
        (() => {
            const result = ctx.attachPretUniversalVariantAssemblyGrammarContract({
                result: "legacy-variant-result",
                surface: "top-variant-surface",
                forms: ["legacy-variant-a / legacy-variant-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "preterit-variant-assembly",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            }, {
                variants: [],
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "legacy-variant-a",
            frameSurface: "legacy-variant-a",
            frameForms: ["legacy-variant-a", "legacy-variant-b", "top-variant-surface", "legacy-variant-result"],
        }
    );
    s.eq(
        "preterit variant assembly blocked source gate carries diagnostics",
        (() => {
            const result = ctx.buildPretUniversalResultDetailedFromVariants([], "ni", "", "");
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            routeStage: "variant-source-gate",
            generationAllowed: false,
            diagnosticId: "preterit-variant-assembly-blocked",
            diagnosticFailedLayer: "route",
            diagnosticContractLayer: "routeContract",
        }
    );

    const asiSecondPluralPreterite = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "asi",
            tense: "preterito",
            subjectPrefix: "an",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq(
        "preterit 2pl intransitive vowel stem realizes an→anh",
        asiSecondPluralPreterite.surfaceForms,
        ["anhasket", "anhasiket"]
    );

    const asiSecondPluralPerfect = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "asi",
            tense: "perfecto",
            subjectPrefix: "an",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq(
        "perfect 2pl intransitive vowel stem realizes an→anh",
        asiSecondPluralPerfect.surfaceForms,
        ["anhastiwit"]
    );

    const asiSecondPluralRemote = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "asi",
            tense: "pasado-remoto",
            subjectPrefix: "an",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq(
        "remote past 2pl intransitive vowel stem realizes an→anh",
        asiSecondPluralRemote.surfaceForms,
        ["anhaskat"]
    );

    return s;
}

module.exports = { run };
