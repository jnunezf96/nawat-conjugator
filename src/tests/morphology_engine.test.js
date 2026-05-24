"use strict";

/**
 * Tests for src/core/generation/morphology_engine.js
 * Covers: direct applyMorphologyRules execution without the browser wrapper.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_engine");

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
    s.eq("applyMorphologyRules agentivo plural applies niwan suffix", agentivo.subjectSuffix, "niwan");
    s.eq("applyMorphologyRules agentivo keeps nemi stem", agentivo.verb, "nemi");
    s.ok("applyMorphologyRules agentivo returns nominal formSpec", agentivo.formSpec && typeof agentivo.formSpec === "object");

    return s;
}

module.exports = { run };
