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

    return s;
}

module.exports = { run };
