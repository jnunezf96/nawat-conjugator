"use strict";

/**
 * Tests for src/core/generation/morphology_support.mjs
 * Covers: tense suffix rules, directional support, patientivo possession
 * adjustment, and small morphology utilities.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_support");

    s.eq("applyTenseSuffixRules preserves preterito suffix", ctx.applyTenseSuffixRules("preterito", "t"), "t");
    s.eq("applyTenseSuffixRules resolves pasado-remoto suffix", ctx.applyTenseSuffixRules("pasado-remoto", "t"), "kat");

    s.eq("getAgentivoNumberSuffix plural slot", ctx.getAgentivoNumberSuffix("p"), "wan");
    s.eq("applyAgentivoNumberSuffix appends plural marker", ctx.applyAgentivoNumberSuffix("lis", "p"), "liswan");
    s.eq("applyPatientivoAdjectiveNumberSuffix t -> met", ctx.applyPatientivoAdjectiveNumberSuffix("t"), "met");

    s.ok("startsWithAny matches shared prefix", ctx.startsWithAny("nemi", ["ne", "ki"]));
    s.eq("getTotalVowelCount counts nemi vowels", ctx.getTotalVowelCount("nemi"), 2);

    const walPlan = ctx.buildWalDirectionalPlan({
        pers1Base: "",
        obj1Base: "ki",
        directionalOutputPrefix: "wal",
    });
    s.ok("buildWalDirectionalPlan promotes wal -> al for third-person object", walPlan.shouldUseAl);
    s.eq("buildWalDirectionalPlan resolves output prefix", walPlan.directionalOutputPrefix, "al");

    const walRealization = ctx.resolveDirectionalOutputChain({
        pers1: "",
        obj1: "ki",
        tronco: "walitta",
        directionalChainMeta: {
            directionalInputPrefix: "wal",
            pers1Base: "",
            pers2Base: "",
            obj1Base: "ki",
            directionalOutputPrefix: "wal",
            directionalPlan: walPlan,
            tense: "presente",
            isYawi: false,
        },
    });
    s.eq("resolveDirectionalOutputChain rewrites wal chain obj1", walRealization.obj1, "kal");
    s.eq("resolveDirectionalOutputChain strips wal from tronco", walRealization.tronco, "itta");

    const intransitiveWalPlan = ctx.buildWalDirectionalPlan({
        pers1Base: "ni",
        obj1Base: "",
        directionalOutputPrefix: "wal",
        directionalRuleMode: "intransitive",
        isIntransitiveVerb: true,
    });
    const intransitiveWalRealization = ctx.resolveDirectionalOutputChain({
        pers1: "ni",
        obj1: "",
        tronco: "walchulua",
        directionalChainMeta: {
            directionalInputPrefix: "wal",
            pers1Base: "ni",
            pers2Base: "",
            obj1Base: "",
            directionalOutputPrefix: "wal",
            directionalPlan: intransitiveWalPlan,
            directionalRuleMode: "intransitive",
            tense: "presente",
            isIntransitiveVerb: true,
            isYawi: false,
        },
    });
    s.eq("buildWalDirectionalPlan promotes intransitive first person wal -> al", intransitiveWalPlan.directionalOutputPrefix, "al");
    s.eq(
        "resolveDirectionalOutputChain rewrites intransitive first person wal chain",
        {
            pers1: intransitiveWalRealization.pers1,
            obj1: intransitiveWalRealization.obj1,
            tronco: intransitiveWalRealization.tronco,
        },
        {
            pers1: "n",
            obj1: "al",
            tronco: "chulua",
        }
    );

    s.eq(
        "adjustPatientivoPossessiveSuffix converts ti to yu in organic ownership",
        ctx.adjustPatientivoPossessiveSuffix("ti", true, "yu", {}),
        "yu"
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership drops ti after consonant-final patientive stem",
        ctx.adjustPatientivoPossessiveSuffix("ti", true, undefined, { stem: "taketz" }),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership rejects ti after vowel-final stem",
        ctx.adjustPatientivoPossessiveSuffix("ti", true, undefined, { stem: "naka" }),
        null
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix zero-ownership clears in",
        ctx.adjustPatientivoPossessiveSuffix("in", true, "zero", {}),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix zero-ownership still clears t",
        ctx.adjustPatientivoPossessiveSuffix("t", true, "zero", {}),
        ""
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership keeps w after vowel-final t stem",
        ctx.adjustPatientivoPossessiveSuffix("t", true, undefined, { stem: "temi" }),
        "w"
    );
    s.eq(
        "adjustPatientivoPossessiveSuffix default ownership drops w after consonant-final in stem",
        ctx.adjustPatientivoPossessiveSuffix("in", true, undefined, { stem: "ten" }),
        ""
    );

    return s;
}

module.exports = { run };
