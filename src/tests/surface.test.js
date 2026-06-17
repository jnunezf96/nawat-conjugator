"use strict";

/**
 * Tests for src/core/output/surface.js
 * Covers: buildSurfaceChainState, getSurfaceChainSegmentValue, cloneSurfaceChainState,
 *         joinSurfaceChain, realizeSurfaceChain, endsWithAny.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("surface");

    // endsWithAny — utility: checks if value ends with any suffix in the array
    s.ok("endsWithAny: nemi ends in i", ctx.endsWithAny("nemi", ["i", "a"]));
    s.no("endsWithAny: kisa doesn't end in u/e", ctx.endsWithAny("kisa", ["u", "e"]));
    s.no("endsWithAny: empty suffix list = false", ctx.endsWithAny("nem", []));

    // buildSurfaceChainState — creates a chain with named slots
    const chain = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("chain: tronco slot", ctx.getSurfaceChainSegmentValue(chain, "tronco"), "chiwa");
    s.eq("chain: pers1 slot", ctx.getSurfaceChainSegmentValue(chain, "pers1"), "ni");
    s.eq("chain: obj1 slot", ctx.getSurfaceChainSegmentValue(chain, "obj1"), "ki");
    s.eq("chain: empty slot = empty string", ctx.getSurfaceChainSegmentValue(chain, "poseedor"), "");
    const canonicalChain = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("chain: pers1 slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "pers1"), "ni");
    s.eq("chain: obj1 slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "obj1"), "ki");
    s.eq("chain: tronco slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "tronco"), "chiwa");

    // cloneSurfaceChainState — deep copy
    const original = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    const cloned = ctx.cloneSurfaceChainState(original);
    s.eq("clone: tronco preserved", ctx.getSurfaceChainSegmentValue(cloned, "tronco"), "nemi");
    s.ok("clone: is distinct object", cloned !== original);

    // joinSurfaceChain — concatenates all non-empty segments
    const joined = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("join: ni+ki+chiwa = nikichiwa", ctx.joinSurfaceChain(joined), "nikichiwa");

    const intrans = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    s.eq("join: ni+nemi = ninemi", ctx.joinSurfaceChain(intrans), "ninemi");

    // realizeSurfaceChain — applies phonological assimilation rules
    // k-elision before vowel-initial tronco (ki + itta → kitta)
    const kVowel = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "k", tronco: "itta" });
    s.eq("realize: ni+k+itta → nikitta", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(kVowel)), "nikitta");

    // simple intransitive — no rules triggered
    const simple = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    s.eq("realize: ni+nemi unchanged", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(simple)), "ninemi");

    // normalizeSupportiveMarkerValue — pure string normalization
    s.eq("normalize 'i' → 'i'", ctx.normalizeSupportiveMarkerValue("i"), "i");
    s.eq("normalize 'y' → 'y'", ctx.normalizeSupportiveMarkerValue("y"), "y");
    s.eq("normalize 'I' → 'i' (case-insensitive)", ctx.normalizeSupportiveMarkerValue("I"), "i");
    s.eq("normalize 'Y' → 'y' (case-insensitive)", ctx.normalizeSupportiveMarkerValue("Y"), "y");
    s.eq("normalize unknown → ''", ctx.normalizeSupportiveMarkerValue("x"), "");
    s.eq("normalize empty → ''", ctx.normalizeSupportiveMarkerValue(""), "");

    // hasSupportiveMarkerValue — boolean wrapper
    s.ok("hasSupportiveMarkerValue 'i' = true", ctx.hasSupportiveMarkerValue("i"));
    s.ok("hasSupportiveMarkerValue 'y' = true", ctx.hasSupportiveMarkerValue("y"));
    s.no("hasSupportiveMarkerValue '' = false", ctx.hasSupportiveMarkerValue(""));
    s.no("hasSupportiveMarkerValue 'x' = false", ctx.hasSupportiveMarkerValue("x"));

    // buildOutputWordText — full surface realization to string
    s.eq("output: ni+nemi = ninemi", ctx.buildOutputWordText({ pers1: "ni", tronco: "nemi" }), "ninemi");
    s.eq("output: ni+ki+chiwa = nikichiwa", ctx.buildOutputWordText({ pers1: "ni", obj1: "ki", tronco: "chiwa" }), "nikichiwa");
    s.eq("output: pers1+tronco = ninemi", ctx.buildOutputWordText({ pers1: "ni", tronco: "nemi" }), "ninemi");
    s.eq("output: pers1+obj1+tronco = nikichiwa", ctx.buildOutputWordText({ pers1: "ni", obj1: "ki", tronco: "chiwa" }), "nikichiwa");
    const outputWordResult = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
    const canonicalOutputWordResult = ctx.buildOutputWordResult({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.ok("output word result exposes grammar frame", outputWordResult.grammarFrame);
    s.eq("output word result contract surface", outputWordResult.surface, "ninemi");
    s.eq("canonical output word result contract surface", canonicalOutputWordResult.surface, "nikichiwa");
    s.eq(
        "output word result route is output-surface",
        outputWordResult.grammarFrame.routeContract.routeFamily,
        "output-surface"
    );
    s.eq(
        "output word result records result-frame surface",
        outputWordResult.grammarFrame.resultFrame.surface,
        "ninemi"
    );
    s.eq(
        "output word result records participant pers1",
        outputWordResult.grammarFrame.participantFrame.pers1,
        "ni"
    );
    s.eq(
        "output word result records pers1-pers2 primary slot",
        canonicalOutputWordResult.grammarFrame.participantFrame.pers1Pers2,
        { prefix: "ni", suffix: "" }
    );
    s.eq(
        "output word result records obj1 primary slot",
        canonicalOutputWordResult.grammarFrame.participantFrame.obj1,
        { prefix: "ki" }
    );
    s.eq(
        "output word result records tronco in nuclear clause",
        canonicalOutputWordResult.grammarFrame.nuclearClauseFrame.tronco,
        "chiwa"
    );
    const framedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "stale-output-result",
        surface: "stale-output-surface",
        surfaceForms: ["stale-output-a / stale-output-b"],
        segments: [],
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frame-output-a / frame-output-b"],
                outputKind: "output-surface",
                generationRoute: "test-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-surface",
        routeStage: "test-frame-reader",
        surface: "stale-output-fallback",
    });
    s.eq(
        "output surface contract reads LCM result-frame primary surface",
        framedOutputSurface.surface,
        "frame-output-a"
    );
    s.eq(
        "output surface contract splits LCM result-frame surface forms",
        framedOutputSurface.surfaceForms,
        ["frame-output-a", "frame-output-b"]
    );
    s.eq(
        "output surface contract records split result-frame surface forms",
        framedOutputSurface.grammarFrame.resultFrame.surfaceForms,
        ["frame-output-a", "frame-output-b"]
    );
    const blockedFramedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "stale-blocked-output-result",
        surface: "stale-blocked-output-surface",
        surfaceForms: ["stale-blocked-output-a"],
        segments: ctx.buildOutputWordSegments({ pers1: "ni", tronco: "nemi" }),
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surface: "",
                surfaceForms: [],
                outputKind: "output-surface",
                generationRoute: "test-blocked-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-surface",
        routeStage: "test-blocked-frame-reader",
        surface: "stale-blocked-output-fallback",
    });
    s.eq(
        "blocked output result frame suppresses stale surface fallbacks",
        {
            ok: blockedFramedOutputSurface.ok,
            surface: blockedFramedOutputSurface.surface,
            surfaceForms: blockedFramedOutputSurface.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.no(
        "output word result grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(outputWordResult, "grammarFrame")
    );
    const nominalOutputResult = ctx.buildNominalOutputResult({
        pers1: "ni",
        tronco: "nemi",
        sufijoNominal: "t",
    });
    s.eq("nominal output result contract surface", nominalOutputResult.surface, "ninemit");
    s.eq(
        "nominal output accepts canonicalpers1/tronco/sufijo",
        ctx.buildNominalOutputResult({ pers1: "ni", tronco: "nemi", sufijoNominal: "t" }).surface,
        "ninemit"
    );
    s.eq(
        "nominal output result records sufijoNominal",
        nominalOutputResult.grammarFrame.inflectionFrame.sufijoNominal,
        "t"
    );
    s.eq(
        "output surface records Lesson 2 num2 sound-spelling frame",
        (() => {
            const pluralOutput = ctx.buildOutputWordResult({ pers1: "ti", tronco: "nemi", pers2: "t" });
            return {
                surface: pluralOutput.surface,
                frames: pluralOutput.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
                    ruleId: frame.ruleId,
                    sourceSurface: frame.sourceSurface,
                    target: frame.target,
                    grammarSlot: frame.grammarSlot,
                    ruleScope: frame.ruleScope,
                    generationAllowed: frame.generationAllowed,
                })),
            };
        })(),
        {
            surface: "tinemit",
            frames: [{
                ruleId: "h-num2-t",
                sourceSurface: "-h",
                target: "-t",
                grammarSlot: "num2",
                ruleScope: "graphic-representation",
                generationAllowed: false,
            }],
        }
    );
    s.eq(
        "nominal output surface records Lesson 2 nominal connector sound-spelling frame",
        nominalOutputResult.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
            ruleId: frame.ruleId,
            sourceSurface: frame.sourceSurface,
            target: frame.target,
            grammarSlot: frame.grammarSlot,
            ruleScope: frame.ruleScope,
        })),
        [{
            ruleId: "tl-nominal-t",
            sourceSurface: "-tl",
            target: "-t",
            grammarSlot: "sufijo-nominal",
            ruleScope: "graphic-representation",
        }]
    );
    // m→n coda assimilation: [m] in coda position (before any consonant onset or word-finally) → [n]
    const mFinal = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "chinam" });
    s.eq("realize: coda m → n (word-final)", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mFinal)), "nichinan");
    const mBeforeVowel = ctx.buildSurfaceChainState({ obj1: "m", tronco: "altia" });
    s.eq("realize: obj1 m stays m before vowel-initial tronco", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mBeforeVowel)), "maltia");
    s.eq("output: mu+ajsi = muajsi", ctx.buildOutputWordText({ obj1: "mu", tronco: "ajsi" }), "muajsi");
    s.eq("output: m+altia = maltia", ctx.buildOutputWordText({ obj1: "m", tronco: "altia" }), "maltia");
    s.eq(
        "surface chain records Lesson 2 phonotactic frames for realized output changes",
        (() => {
            const outputs = [
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "chinam" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "takw" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "tay" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "ita" }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "ita",
                    surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
                }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    tronco: "nemia",
                    surfaceRuleMeta: { trimFinalIAUAVowel: true },
                }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "mu",
                    tronco: "iskalia",
                    surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
                }),
            ];
            return outputs.map((output) => {
                const frame = output.grammarFrame.orthographyFrame.soundSpellingFrames[0] || {};
                return {
                    surface: output.surface,
                    ruleId: frame.ruleId || "",
                    sourceSurface: frame.sourceSurface || "",
                    target: frame.target,
                    grammarSlot: frame.grammarSlot || "",
                    ruleScope: frame.ruleScope || "",
                    andrewsProcess: frame.andrewsProcess || "",
                    spanishProcess: frame.spanishProcess || "",
                    sourceProfileId: frame.sourceProfileId || "",
                    targetProfileId: frame.targetProfileId || "",
                    sourceSegmentValue: frame.sourceSegmentValue || "",
                    targetSegmentValue: frame.targetSegmentValue || "",
                };
            });
        })(),
        [
            {
                surface: "nichinan",
                ruleId: "m-coda-n",
                sourceSurface: "m",
                target: "n",
                grammarSlot: "tronco",
                ruleScope: "assimilation-or-consonant-phone-shift",
                andrewsProcess: "Regressive Assimilation / Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "asimilación regresiva / cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "chinam",
                targetSegmentValue: "chinan",
            },
            {
                surface: "nitak",
                ruleId: "kw-coda-k",
                sourceSurface: "kw",
                target: "k",
                grammarSlot: "tronco",
                ruleScope: "consonant-phone-shift",
                andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "takw",
                targetSegmentValue: "tak",
            },
            {
                surface: "nitash",
                ruleId: "y-coda-sh",
                sourceSurface: "y",
                target: "sh",
                grammarSlot: "tronco",
                ruleScope: "consonant-phone-shift",
                andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "tay",
                targetSegmentValue: "tash",
            },
            {
                surface: "nita",
                ruleId: "pers1-ni-i-n",
                sourceSurface: "ni",
                target: "n",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "ni",
                targetSegmentValue: "n",
            },
            {
                surface: "nikita",
                ruleId: "object-i-stem-i-elision",
                sourceSurface: "i",
                target: "",
                grammarSlot: "stem-initial",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "ita",
                targetSegmentValue: "ta",
            },
            {
                surface: "ninemi",
                ruleId: "stem-final-a-elision",
                sourceSurface: "a",
                target: "",
                grammarSlot: "stem-final",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "nemia",
                targetSegmentValue: "nemi",
            },
            {
                surface: "nimuskalia",
                ruleId: "mu-iskalia-i-elision",
                sourceSurface: "i",
                target: "",
                grammarSlot: "stem-initial",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "iskalia",
                targetSegmentValue: "skalia",
            },
        ]
    );
    s.eq(
        "surface chain records Lesson 2 frames for directional pers1-object vowel-contact reductions",
        (() => {
            const outputs = [
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "walita",
                    directionalChainMeta: {
                        directionalInputPrefix: "wal",
                        directionalPlan: { shouldUseAl: true, effectiveDirectionalRuleMode: "" },
                        pers1Base: "ni",
                        obj1Base: "ki",
                        tense: "presente",
                    },
                }),
                ctx.buildOutputWordResult({
                    pers1: "shi",
                    obj1: "ta",
                    tronco: "walita",
                    directionalChainMeta: {
                        directionalInputPrefix: "wal",
                        directionalPlan: { shouldUseAl: true, effectiveDirectionalRuleMode: "" },
                        pers1Base: "ti",
                        obj1Base: "ta",
                        tense: "optativo",
                    },
                }),
            ];
            return outputs.map((output) => {
                const frame = output.grammarFrame.orthographyFrame.soundSpellingFrames[0] || {};
                return {
                    surface: output.surface,
                    ruleId: frame.ruleId || "",
                    sourceSurface: frame.sourceSurface || "",
                    target: frame.target || "",
                    grammarSlot: frame.grammarSlot || "",
                    ruleScope: frame.ruleScope || "",
                    andrewsProcess: frame.andrewsProcess || "",
                    sourceSegmentValue: frame.sourceSegmentValue || "",
                    targetSegmentValue: frame.targetSegmentValue || "",
                };
            });
        })(),
        [
            {
                surface: "nalita",
                ruleId: "pers1-ni-before-vowel-n",
                sourceSurface: "ni",
                target: "n",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                sourceSegmentValue: "ni",
                targetSegmentValue: "n",
            },
            {
                surface: "shaltaita",
                ruleId: "optative-shi-before-al-sh",
                sourceSurface: "shi",
                target: "sh",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                sourceSegmentValue: "shi",
                targetSegmentValue: "sh",
            },
        ]
    );

    s.eq(
        "patientivo display uses compact nominal marker families",
        ctx.formatConjugationDisplay("tamachti / tamachit / tamatti / tamatit / tamatilti"),
        "tamachti\ntamachit\ntamatti\ntamatit\ntamatilti"
    );

    // provenance helpers — extracted from surface.js into output/provenance.js
    const provenanceVariant = ctx.buildProvenanceVariantEntry({ base: "nemi", suffix: "j" });
    s.eq("provenance variant builds surface stem", provenanceVariant.surfaceStem, "nemij");
    s.ok("provenance variant exposes grammar frame", provenanceVariant.grammarFrame);
    s.no(
        "provenance variant grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(provenanceVariant, "grammarFrame")
    );
    const framedProvenanceVariant = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-provenance-result",
        surface: "stale-provenance-surface",
        surfaceForms: ["staleprova / staleprovb"],
        surfaceStem: "stale-provenance-stem",
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frameprova / frameprovb"],
                outputKind: "output-provenance",
                generationRoute: "test-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-frame-reader",
        surface: "stale-provenance-fallback",
    });
    s.eq(
        "output provenance contract reads LCM result-frame primary surface",
        framedProvenanceVariant.surface,
        "frameprova"
    );
    s.eq(
        "output provenance contract splits LCM result-frame surface forms",
        framedProvenanceVariant.surfaceForms,
        ["frameprova", "frameprovb"]
    );
    s.eq(
        "provenance primary stem reads framed variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [framedProvenanceVariant] }),
        "frameprova"
    );
    const blockedFramedProvenance = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-blocked-provenance-result",
        surface: "stale-blocked-provenance-surface",
        surfaceForms: ["stale-blocked-provenance-a"],
        surfaceStem: "stale-blocked-provenance-stem",
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surface: "",
                surfaceForms: [],
                outputKind: "output-provenance",
                generationRoute: "test-blocked-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-blocked-frame-reader",
        surface: "stale-blocked-provenance-fallback",
    });
    s.eq(
        "blocked provenance result frame suppresses stale stem fallbacks",
        {
            ok: blockedFramedProvenance.ok,
            surface: blockedFramedProvenance.surface,
            surfaceForms: blockedFramedProvenance.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.eq(
        "blocked provenance primary stem suppresses stale top-level surface",
        ctx.getProvenancePrimaryStemSurface(blockedFramedProvenance),
        ""
    );
    s.eq(
        "blocked provenance primary stem suppresses stale variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [blockedFramedProvenance] }),
        ""
    );
    s.eq(
        "provenance primary stem prefers first variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [provenanceVariant] }),
        "nemij"
    );
    const forwardProvenance = ctx.buildForwardDerivationProvenance({
        sourceVerb: "nemi",
        analysisTarget: "nemij",
        tense: "preterit",
        derivationType: "causative",
        isTransitive: false,
        selectedMeta: {
            surfaceStem: "nemij",
            rule: "forward-selection",
            patternType: "test-pattern",
        },
    });
    s.ok("forward provenance exposes result contract", forwardProvenance.ok);
    s.eq("forward provenance contract surface", forwardProvenance.surface, "nemij");
    s.ok("forward provenance frames alias grammarFrame", forwardProvenance.frames === forwardProvenance.grammarFrame);
    s.eq(
        "forward provenance records output-provenance route",
        forwardProvenance.grammarFrame.routeContract.routeFamily,
        "output-provenance"
    );
    s.eq(
        "forward provenance result frame carries provenance",
        forwardProvenance.grammarFrame.resultFrame.provenance.surfaceStem,
        "nemij"
    );
    s.eq(
        "forward provenance stem frame carries source stem",
        forwardProvenance.grammarFrame.stemFrame.sourceStem,
        "nemi"
    );
    s.no(
        "forward provenance grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(forwardProvenance, "grammarFrame")
    );
    const blockedForwardProvenance = ctx.buildForwardDerivationProvenance({
        sourceVerb: "nemi",
        analysisTarget: "nemij",
        derivationType: "causative",
    });
    s.no("blocked forward provenance is not ok", blockedForwardProvenance.ok);
    s.eq("blocked forward provenance has blank contract surface", blockedForwardProvenance.surface, "");
    s.eq(
        "blocked forward provenance names missing stem layer",
        blockedForwardProvenance.contractDiagnostics[0].id,
        "OUTPUT_PROVENANCE_STEM_MISSING"
    );

    return s;
}

module.exports = { run };
