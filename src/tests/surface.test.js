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
    // m→n coda assimilation: [m] in coda position (before any consonant onset or word-finally) → [n]
    const mFinal = ctx.buildSurfaceChainState({ subjectPrefix: "ni", verb: "chinam" });
    s.eq("realize: coda m → n (word-final)", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mFinal)), "nichinan");

    s.eq(
        "patientivo display uses compact nominal marker families",
        ctx.formatConjugationDisplay("tamachti / tamach / tamachin / tamachit / tamatti / tamat / tamatit / tamatil / tamatilti / tamatilin"),
        "tamachti/tamach, tamachin\ntamachit\ntamatti/tamat\ntamatit\ntamatil/tamatilti, tamatilin"
    );

    // provenance helpers — extracted from surface.js into output/provenance.js
    const provenanceVariant = ctx.buildProvenanceVariantEntry({ base: "nemi", suffix: "j" });
    s.eq("provenance variant builds surface stem", provenanceVariant.surfaceStem, "nemij");
    s.eq(
        "provenance primary stem prefers first variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [provenanceVariant] }),
        "nemij"
    );

    return s;
}

module.exports = { run };
