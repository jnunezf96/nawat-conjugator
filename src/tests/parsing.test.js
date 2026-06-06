"use strict";

/**
 * Tests for src/core/parsing/parsing.js
 * Covers: normalizeMovingTargetCoreText, splitTopLevelByPlus, stripPrefixOnce,
 *         serializeRegexInputValue, findFinalTopLevelWrappedCore,
 *         isRecognizedCurrentRegexValue, applyIndirectObjectMarker.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("parsing");
    const summarizeOrdinaryNncClassifications = (parsed) => (
        Array.isArray(parsed?.ordinaryNncFixtureClassifications)
            ? parsed.ordinaryNncFixtureClassifications.map((entry) => ({
                kind: entry.kind,
                role: entry.role,
                value: entry.value,
                normalizedInput: entry.normalizedInput,
                fixture: entry.fixture && {
                    id: entry.fixture.id,
                    stem: entry.fixture.stem,
                    lemma: entry.fixture.lemma,
                    nounClass: entry.fixture.nounClass,
                    animacy: entry.fixture.animacy,
                },
            }))
            : []
    );
    const summarizeGenerated = (result) => ({
        error: result?.error === true,
        result: result?.result || "",
        surfaceForms: result?.surfaceForms || [],
    });

    // normalizeMovingTargetCoreText — lowercases, strips non-alphabetic
    s.eq("normalize: uppercases lowercased", ctx.normalizeMovingTargetCoreText("CHIWA"), "chiwa");
    s.eq("normalize: mixed case", ctx.normalizeMovingTargetCoreText("Nemi"), "nemi");
    s.eq("normalize: already lowercase", ctx.normalizeMovingTargetCoreText("kisa"), "kisa");
    s.eq("normalize: empty", ctx.normalizeMovingTargetCoreText(""), "");

    // splitTopLevelByPlus — splits on + at depth 0 (respects parentheses)
    s.eq("split: single token", ctx.splitTopLevelByPlus("nemi"), ["nemi"]);
    s.eq("split: two tokens", ctx.splitTopLevelByPlus("ni+nemi"), ["ni", "nemi"]);
    s.eq("split: three tokens", ctx.splitTopLevelByPlus("ni+k+chiwa"), ["ni", "k", "chiwa"]);
    s.eq("split: parens protect inner +", ctx.splitTopLevelByPlus("a+(b+c)+d"), ["a", "(b+c)", "d"]);
    s.eq("split: empty returns null", ctx.splitTopLevelByPlus(""), null);

    // stripPrefixOnce — removes a literal prefix string from the start
    s.eq("stripPrefix: removes ni+", ctx.stripPrefixOnce("ni+nemi", "ni+"), "nemi");
    s.eq("stripPrefix: no match returns original", ctx.stripPrefixOnce("nemi", "ni+"), "nemi");
    s.eq("stripPrefix: empty prefix", ctx.stripPrefixOnce("nemi", ""), "nemi");

    // serializeRegexInputValue — trims whitespace, preserves case
    s.eq("serialize: trims whitespace", ctx.serializeRegexInputValue("  NEMI  "), "NEMI");
    s.eq("serialize: ni+nemi preserved", ctx.serializeRegexInputValue("ni+nemi"), "ni+nemi");
    s.eq("serialize: empty", ctx.serializeRegexInputValue(""), "");

    // findFinalTopLevelWrappedCore — finds the last top-level (...) wrapper
    const wrapped = ctx.findFinalTopLevelWrappedCore("(nemi)");
    s.ok("findWrappedCore: finds (nemi)", wrapped !== null);
    s.eq("findWrappedCore: coreText=nemi", wrapped && wrapped.coreText, "nemi");
    s.eq("findWrappedCore: no wrapper returns null", ctx.findFinalTopLevelWrappedCore("nemi"), null);

    // isRecognizedCurrentRegexValue — validates that input is non-empty
    s.ok("isRecognized: nemi is valid", ctx.isRecognizedCurrentRegexValue("nemi"));
    s.no("isRecognized: empty is invalid", ctx.isRecognizedCurrentRegexValue(""));
    s.no("isRecognized: whitespace-only is invalid", ctx.isRecognizedCurrentRegexValue("   "));

    // applyIndirectObjectMarker — prepends indirect object marker to prefix
    s.eq("indirectMarker: ni + ch = nich", ctx.applyIndirectObjectMarker("ni", "ch"), "nich");
    s.eq("indirectMarker: empty marker unchanged", ctx.applyIndirectObjectMarker("ni", ""), "ni");
    s.eq("indirectMarker: empty prefix + marker", ctx.applyIndirectObjectMarker("", "mits"), "mits");

    // getParsedSyllableAnalysisTarget — parser-owned syllable normalization
    s.eq("parsedSyllableTarget: wrapped core", ctx.getParsedSyllableAnalysisTarget("(nemi)"), "nemi");
    s.eq(
        "parsedSyllableTarget: assume final vowel",
        ctx.getParsedSyllableAnalysisTarget("nem", { assumeFinalV: true }),
        "nema"
    );

    const noCompound = ctx.parseVerbInput("(nemi)");
    s.eq("compoundAst: plain input returns null", noCompound.compoundAst, null);
    s.eq("compoundAst: plain canonical returns null", noCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: plain verb has no fixture classifications", summarizeOrdinaryNncClassifications(noCompound), []);

    const ordinaryKal = ctx.parseVerbInput("kal");
    s.eq(
        "ordinaryNnc: kal classification marks nominal nuclear clause output",
        ordinaryKal.ordinaryNncFixtureClassifications[0].outputKind,
        "nominal-nuclear-clause"
    );
    s.eq("ordinaryNnc: kal keeps verb parse core fields", {
        verb: ordinaryKal.verb,
        analysisVerb: ordinaryKal.analysisVerb,
        exactBaseVerb: ordinaryKal.exactBaseVerb,
        displayVerb: ordinaryKal.displayVerb,
        displayCore: ordinaryKal.displayCore,
    }, {
        verb: "kal",
        analysisVerb: "kal",
        exactBaseVerb: "kal",
        displayVerb: "kal",
        displayCore: "kal",
    });
    s.eq("ordinaryNnc: kal has matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryKal), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "kal",
        normalizedInput: "kal",
        fixture: {
            id: "kal",
            stem: "kal",
            lemma: "kal",
            nounClass: "zero",
            animacy: "inanimate",
        },
    }]);

    const ordinaryShuchit = ctx.parseVerbInput("shuchit");
    s.eq("ordinaryNnc: shuchit keeps verb parse core fields", {
        verb: ordinaryShuchit.verb,
        analysisVerb: ordinaryShuchit.analysisVerb,
        exactBaseVerb: ordinaryShuchit.exactBaseVerb,
        displayVerb: ordinaryShuchit.displayVerb,
        displayCore: ordinaryShuchit.displayCore,
    }, {
        verb: "shuchit",
        analysisVerb: "shuchit",
        exactBaseVerb: "shuchit",
        displayVerb: "shuchit",
        displayCore: "shuchit",
    });
    s.eq("ordinaryNnc: shuchit has lemma-backed matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryShuchit), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "shuchit",
        normalizedInput: "shuchit",
        fixture: {
            id: "shuchi",
            stem: "shuchi",
            lemma: "shuchit",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);

    const ordinaryMistun = ctx.parseVerbInput("mistun");
    s.eq("ordinaryNnc: mistun has user-provided matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryMistun), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "mistun",
        normalizedInput: "mistun",
        fixture: {
            id: "mistun",
            stem: "mistun",
            lemma: "mistun",
            nounClass: "zero",
            animacy: "animate",
        },
    }]);

    const unconfiguredOrdinaryNnc = ctx.parseVerbInput("unconfigurednnc");
    s.eq("ordinaryNnc: unconfigured stem has no fixture classifications", summarizeOrdinaryNncClassifications(unconfiguredOrdinaryNnc), []);

    const impersonalCompound = ctx.parseVerbInput("ta+(nemi)");
    s.eq("compoundAst: impersonal compound kind", impersonalCompound.compoundAst.kind, "compound");
    s.eq("compoundAst: impersonal compound matrix", impersonalCompound.compoundAst.matrix, {
        role: "matrix",
        stem: "nemi",
        ruleBase: "nemi",
    });
    s.eq("compoundAst: impersonal compound roles", impersonalCompound.compoundAst.embeds.map((entry) => entry.role), ["impersonal-valence"]);
    s.eq("compoundAst: impersonal compound source", impersonalCompound.compoundAst.source, {
        rawInput: "ta+(nemi)",
        displayVerb: "ta+(nemi)",
        displayCore: "nemi",
        verb: "tanemi",
        analysisVerb: "nemi",
        embeddedPrefix: "ta",
        sourcePrefix: "",
        sourceBase: "nemi",
        verbSegment: "ta-nemi",
        parts: ["ta", "nemi"],
    });

    const adjacentCompound = ctx.parseVerbInput("-(ish-kwi)");
    s.eq("compoundAst: adjacent core embed role", adjacentCompound.compoundAst.embeds.map((entry) => entry.role), ["adjacent-core-embed"]);
    s.eq("compoundAst: adjacent core embed matrix", adjacentCompound.compoundAst.matrix.stem, "kwi");

    const lexicalCompound = ctx.parseVerbInput("(shuchi)-(kwi)");
    s.eq("compoundAst: outer lexical embed role", lexicalCompound.compoundAst.embeds.map((entry) => entry.role), ["outer-lexical"]);
    s.eq("compoundAst: outer lexical embed value", lexicalCompound.compoundAst.embeds[0].value, "shuchi");
    s.eq("ordinaryNnc: lexical compound classifies outer noun fixture", summarizeOrdinaryNncClassifications(lexicalCompound), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "outer-lexical",
        value: "shuchi",
        normalizedInput: "shuchi",
        fixture: {
            id: "shuchi",
            stem: "shuchi",
            lemma: "shuchit",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);

    const lexicalValenceAdjacentCompound = ctx.parseVerbInput("(a)+ta-(ish-kwi)");
    s.eq(
        "compoundAst: outer lexical plus valence plus adjacent roles",
        lexicalValenceAdjacentCompound.compoundAst.embeds.map((entry) => entry.role),
        ["outer-lexical", "outer-valence", "adjacent-core-embed"]
    );
    s.eq("compoundAst: outer lexical plus adjacent source prefix", lexicalValenceAdjacentCompound.compoundAst.source.sourcePrefix, "a");
    s.eq("ordinaryNnc: outer lexical plus adjacent classifies source noun fixture", summarizeOrdinaryNncClassifications(lexicalValenceAdjacentCompound), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "outer-lexical",
        value: "a",
        normalizedInput: "a",
        fixture: {
            id: "a",
            stem: "a",
            lemma: "at",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);
    s.eq("compoundAst: outer lexical plus adjacent valency", lexicalValenceAdjacentCompound.compoundAst.valency, {
        transitivity: "transitive",
        tokens: ["ta"],
        slotCount: 1,
        hasSpecific: false,
        hasNonspecific: true,
        isMarkedTransitive: true,
        isTaFusion: true,
    });

    const malformedCompound = ctx.parseVerbInput("ta+(");
    s.eq("compoundAst: malformed compound-like input returns null", malformedCompound.compoundAst, null);
    s.eq("compoundAst: malformed canonical returns null", malformedCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: malformed compound-like input has no fixture classifications", summarizeOrdinaryNncClassifications(malformedCompound), []);

    const generatePresent = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "",
            verb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq("compoundAst: generated ta+(nemi) unchanged", generatePresent("ta+(nemi)").surfaceForms, ["nitanemi"]);
    s.eq("compoundAst: generated (a)+ta-(kwi) unchanged", generatePresent("(a)+ta-(kwi)").surfaceForms, ["niatakwi"]);
    s.eq("compoundAst: generated (shuchi)-(kwi) unchanged", generatePresent("(shuchi)-(kwi)").surfaceForms, ["nishuchikwi"]);
    s.eq("ordinaryNnc: generated (kal)-(kwi) unchanged", generatePresent("(kal)-(kwi)").surfaceForms, ["nikalkwi"]);
    s.eq("ordinaryNnc: generated (mistun)-(kwi) unchanged", generatePresent("(mistun)-(kwi)").surfaceForms, ["nimistunkwi"]);
    s.eq("ordinaryNnc: generated (shuchit)-(kwi) unchanged", generatePresent("(shuchit)-(kwi)").surfaceForms, ["nishuchitkwi"]);
    s.eq("compoundAst: generated -(ish-kwi) unchanged", generatePresent("-(ish-kwi)").surfaceForms, ["nishkwi"]);
    s.eq("compoundAst: generated (a)+ta-(ish-kwi) unchanged", generatePresent("(a)+ta-(ish-kwi)").surfaceForms, ["niataishkwi"]);
    s.eq("ordinaryNnc: bare kal generation remains verb-routed", summarizeGenerated(generatePresent("kal")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    s.eq("ordinaryNnc: bare shuchit generation remains verb-routed", summarizeGenerated(generatePresent("shuchit")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    s.eq("ordinaryNnc: bare mistun generation remains verb-routed", summarizeGenerated(generatePresent("mistun")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });

    return s;
}

module.exports = { run };
