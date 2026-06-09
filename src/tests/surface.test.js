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
    const chain = ctx.buildSurfaceChainState({ subjectPrefix: "ni", objectPrefix: "ki", verb: "chiwa" });
    s.eq("chain: verb slot", ctx.getSurfaceChainSegmentValue(chain, "verb"), "chiwa");
    s.eq("chain: subject slot", ctx.getSurfaceChainSegmentValue(chain, "subject"), "ni");
    s.eq("chain: object slot", ctx.getSurfaceChainSegmentValue(chain, "object"), "ki");
    s.eq("chain: empty slot = empty string", ctx.getSurfaceChainSegmentValue(chain, "possessive"), "");

    // cloneSurfaceChainState — deep copy
    const original = ctx.buildSurfaceChainState({ subjectPrefix: "ni", verb: "nemi" });
    const cloned = ctx.cloneSurfaceChainState(original);
    s.eq("clone: verb preserved", ctx.getSurfaceChainSegmentValue(cloned, "verb"), "nemi");
    s.ok("clone: is distinct object", cloned !== original);

    // joinSurfaceChain — concatenates all non-empty segments
    const joined = ctx.buildSurfaceChainState({ subjectPrefix: "ni", objectPrefix: "ki", verb: "chiwa" });
    s.eq("join: ni+ki+chiwa = nikichiwa", ctx.joinSurfaceChain(joined), "nikichiwa");

    const intrans = ctx.buildSurfaceChainState({ subjectPrefix: "ni", verb: "nemi" });
    s.eq("join: ni+nemi = ninemi", ctx.joinSurfaceChain(intrans), "ninemi");

    // realizeSurfaceChain — applies phonological assimilation rules
    // k-elision before vowel-initial verb (ki + itta → kitta)
    const kVowel = ctx.buildSurfaceChainState({ subjectPrefix: "ni", objectPrefix: "k", verb: "itta" });
    s.eq("realize: ni+k+itta → nikitta", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(kVowel)), "nikitta");

    // simple intransitive — no rules triggered
    const simple = ctx.buildSurfaceChainState({ subjectPrefix: "ni", verb: "nemi" });
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
    s.eq("output: ni+nemi = ninemi", ctx.buildOutputWordText({ subjectPrefix: "ni", verb: "nemi" }), "ninemi");
    s.eq("output: ni+ki+chiwa = nikichiwa", ctx.buildOutputWordText({ subjectPrefix: "ni", objectPrefix: "ki", verb: "chiwa" }), "nikichiwa");
    const outputWordResult = ctx.buildOutputWordResult({ subjectPrefix: "ni", verb: "nemi" });
    s.ok("output word result exposes grammar frame", outputWordResult.grammarFrame);
    s.eq("output word result contract surface", outputWordResult.surface, "ninemi");
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
        "output word result records participant subject",
        outputWordResult.grammarFrame.participantFrame.subjectPrefix,
        "ni"
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
        segments: ctx.buildOutputWordSegments({ subjectPrefix: "ni", verb: "nemi" }),
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
        "blocked output result frame suppresses legacy surface fallbacks",
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
        subjectPrefix: "ni",
        verb: "nemi",
        trailingSuffix: "t",
    });
    s.eq("nominal output result contract surface", nominalOutputResult.surface, "ninemit");
    s.eq(
        "nominal output result records nominal suffix",
        nominalOutputResult.grammarFrame.inflectionFrame.nominalSuffix,
        "t"
    );
    // m→n coda assimilation: [m] in coda position (before any consonant onset or word-finally) → [n]
    const mFinal = ctx.buildSurfaceChainState({ subjectPrefix: "ni", verb: "chinam" });
    s.eq("realize: coda m → n (word-final)", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mFinal)), "nichinan");

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
        "blocked provenance result frame suppresses legacy stem fallbacks",
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
