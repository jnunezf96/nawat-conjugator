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
