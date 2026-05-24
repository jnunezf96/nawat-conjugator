"use strict";

/**
 * Tests for src/core/vnc/vnc.js
 * Covers: getComboKey, startsWithAny, getTotalVowelCount,
 *         isWalThirdPersonMarker, splitSearchInput.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("vnc");

    // getComboKey — joins subject prefix, stem, object prefix with pipe
    s.eq("comboKey: ni|nemi|ki", ctx.getComboKey("ni", "nemi", "ki"), "ni|nemi|ki");
    s.eq("comboKey: 3sg subj (empty prefix)", ctx.getComboKey("", "nemi", ""), "|nemi|");
    s.eq("comboKey: ti|nemi|ki", ctx.getComboKey("ti", "nemi", "ki"), "ti|nemi|ki");
    s.eq("comboKey: all empty", ctx.getComboKey("", "", ""), "||");

    // startsWithAny — returns true if value starts with any of the given prefixes
    s.ok("startsWithAny: nemi starts with ne", ctx.startsWithAny("nemi", ["ne", "ki"]));
    s.no("startsWithAny: nemi doesn't start with ki/mu", ctx.startsWithAny("nemi", ["ki", "mu"]));
    s.ok("startsWithAny: single-char prefix", ctx.startsWithAny("nemi", ["n"]));
    s.no("startsWithAny: empty array", ctx.startsWithAny("nemi", []));

    // getTotalVowelCount — counts vowels in a string
    s.eq("vowelCount: nemi = 2", ctx.getTotalVowelCount("nemi"), 2);
    s.eq("vowelCount: chiwa = 2", ctx.getTotalVowelCount("chiwa"), 2);
    s.eq("vowelCount: ki = 1", ctx.getTotalVowelCount("ki"), 1);
    s.eq("vowelCount: consonants only = 0", ctx.getTotalVowelCount("ch"), 0);
    s.eq("vowelCount: empty = 0", ctx.getTotalVowelCount(""), 0);

    // isWalThirdPersonMarker — true for ki, kin, k (wal-directional capable 3rd-person markers)
    s.ok("isWal3P: ki", ctx.isWalThirdPersonMarker("ki"));
    s.ok("isWal3P: kin", ctx.isWalThirdPersonMarker("kin"));
    s.ok("isWal3P: k", ctx.isWalThirdPersonMarker("k"));
    s.no("isWal3P: ni (1st person)", ctx.isWalThirdPersonMarker("ni"));
    s.no("isWal3P: wal (directional)", ctx.isWalThirdPersonMarker("wal"));
    s.no("isWal3P: empty", ctx.isWalThirdPersonMarker(""));

    // splitSearchInput — splits input into base verb and optional query
    const r1 = ctx.splitSearchInput("nemi");
    s.eq("splitSearch: single verb — base", r1.base, "nemi");
    s.no("splitSearch: single verb — no query", r1.hasQuery);

    const r2 = ctx.splitSearchInput("ni nemi");
    s.eq("splitSearch: prefix+verb — base", r2.base, "ni nemi");
    s.no("splitSearch: prefix+verb — no query", r2.hasQuery);

    const noStemMask = ctx.buildNoStemMaskResult({
        shouldMask: true,
        silent: true,
        renderVerb: "nemi",
        tense: "presente",
    });
    s.eq("noStemMask: masked result marker", noStemMask.result, "—");
    s.eq("noStemMask: masked result exposes empty surfaceForms", noStemMask.surfaceForms, []);

    const nonactiveOverride = ctx.applyNonactiveGenerateOverrides({
        nonactiveDerivation: {
            nonactiveObjectPrefixOverride: "mu",
            nonactiveIndirectMarkerOverride: "te",
        },
        objectPrefix: "ki",
        morphologyObjectPrefix: "ki",
        baseObjectPrefix: "ki",
        indirectObjectMarker: "ta",
        thirdObjectMarker: "te",
        isReflexive: false,
    });
    s.eq("nonactive override: object prefix forced to mu", nonactiveOverride.objectPrefix, "mu");
    s.eq("nonactive override: indirect marker overridden", nonactiveOverride.indirectObjectMarker, "te");
    s.eq("nonactive override: third marker cleared", nonactiveOverride.thirdObjectMarker, "");
    s.ok("nonactive override: mu implies reflexive", nonactiveOverride.isReflexive);

    const suppletiveStemSet = {
        imperfective: { verb: "nemi", analysisVerb: "nemi" },
        variantsByClass: new Map([
            ["A", [{ base: "nem", suffix: "ki" }]],
        ]),
    };
    const prefixedSuppletive = ctx.applySuppletiveYawiPrefixToStemSet(
        suppletiveStemSet,
        (value) => `ya${value}`
    );
    s.eq("suppletive yawi prefix: imperfective stem", prefixedSuppletive.imperfective.verb, "yanemi");
    s.eq(
        "suppletive yawi prefix: class A variant base",
        prefixedSuppletive.variantsByClass.get("A")[0].base,
        "yanem"
    );

    const normalizedOptions = ctx.normalizeGenerateWordOptions({
        skipTransitivityValidation: true,
    });
    s.ok("normalizeGenerateWordOptions maps legacy skip flag", normalizedOptions.skipValidation === true);

    const sanitizedOptions = ctx.sanitizeGenerateWordOptions({
        skipTransitivityValidation: true,
        renderOnlyTense: "presente",
    });
    s.ok("sanitizeGenerateWordOptions keeps canonical skipValidation", sanitizedOptions.skipValidation === true);
    s.no("sanitizeGenerateWordOptions removes renderOnlyTense", Object.prototype.hasOwnProperty.call(sanitizedOptions, "renderOnlyTense"));

    s.ok(
        "canReusePreParsedVerb accepts matching source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(nemi)" })
    );
    s.no(
        "canReusePreParsedVerb rejects mismatched source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(kisa)" })
    );

    const prefixInputs = ctx.getPrefixInputs({
        override: { objectPrefix: "ki" },
        subjectPrefixInput: { value: "ni" },
        subjectSuffixInput: { value: "" },
        verbInput: { value: "(nemi)" },
        verbInputSource: { parseValue: "nemi" },
    });
    s.eq("getPrefixInputs reads subject prefix from input", prefixInputs.subjectPrefix, "ni");
    s.eq("getPrefixInputs prefers override object prefix", prefixInputs.objectPrefix, "ki");
    s.eq("getPrefixInputs uses parsed verb input source", prefixInputs.verb, "nemi");

    const boundOverride = ctx.applyBoundMarkerPrefixOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki"
    );
    s.eq("bound override drops occupied object prefix", boundOverride.objectPrefix, "");
    s.eq("bound override drops occupied base object prefix", boundOverride.baseObjectPrefix, "");

    const passiveAdjustments = ctx.applyPassiveImpersonalValencyAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "ki",
        indirectObjectMarker: "ta",
        thirdObjectMarker: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObjectPrefix: "ki",
        hasPromotableObject: true,
    });
    s.eq("passive valency adjusts clears direct object", passiveAdjustments.objectPrefix, "");
    s.eq("passive valency adjusts clears indirect object", passiveAdjustments.indirectObjectMarker, "");
    s.ok("passive valency adjusts preserves subject for promoted passive", passiveAdjustments.preserveSubjectForPassive);

    const resetNominalSubject = ctx.resetSubjectForNounTenses("agentivo", {}, "ni", "t");
    s.eq("resetSubjectForNounTenses clears nominal subject prefix", resetNominalSubject.subjectPrefix, "");
    s.eq("resetSubjectForNounTenses clears nominal subject suffix", resetNominalSubject.subjectSuffix, "");

    let clearedTarget = "";
    const reflexiveSwitch = ctx.applyReflexiveAutoSwitch({
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "nech",
        isPassiveImpersonal: false,
        clearError: (id) => {
            clearedTarget = id;
        },
    });
    s.eq("reflexive auto switch rewrites same-person object to mu", reflexiveSwitch.objectPrefix, "mu");
    s.ok("reflexive auto switch marks reflexive", reflexiveSwitch.isReflexive);
    s.eq("reflexive auto switch clears object-prefix error", clearedTarget, "object-prefix");

    const executeEngineResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: "",
            verb: "(nemi)",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.ok("executeGenerateWordRequest returns a surfaceForms array", Array.isArray(executeEngineResult.surfaceForms));
    s.ok(
        "executeGenerateWordRequest computes present nemi output without DOM access",
        executeEngineResult.result.includes("nemi")
    );

    return s;
}

module.exports = { run };
