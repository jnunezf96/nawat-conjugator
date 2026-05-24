"use strict";

/**
 * Tests for derivation source-model and source-chain helpers.
 * Covers: buildDerivationSourceModel, buildNonactiveSourceChain,
 *         getDerivationSourceOuterSurface, apply/realize source-chain stems.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("derivation");

    const verbMeta = {
        exactBaseVerb: "nemi",
        sourcePrefix: "ki",
        lexicalBoundPrefixes: ["ki"],
        isMarkedTransitive: true,
    };

    const sourceModel = ctx.buildDerivationSourceModel(verbMeta, "kinemi", "nemi");
    s.eq("source model: fallback kind", sourceModel.sourceKind, "fallback");
    s.eq("source model: matrix base = nemi", sourceModel.matrixBase, "nemi");
    s.eq("source model: outer surface = ki", ctx.getDerivationSourceOuterSurface(sourceModel), "ki");

    const chain = ctx.buildNonactiveSourceChain(verbMeta, "kinemi", "nemi");
    s.eq("nonactive chain: base verb = nemi", chain.baseVerb, "nemi");
    s.eq("nonactive chain: prefix = ki", chain.prefix, "ki");
    s.eq("nonactive chain: source prefix = ki", chain.sourcePrefix, "ki");

    const prefixedStem = ctx.realizeNonactiveSourceChainStem("nemu", chain);
    s.eq("nonactive chain realize: ki + nemu = kinemu", prefixedStem, "kinemu");

    const prefixedStemSpec = ctx.applyNonactiveSourceChainStemSpec(
        ctx.buildLiteralMorphStemSpec("nemu"),
        "nemu",
        chain
    );
    s.eq(
        "nonactive stem spec realize: ki + nemu = kinemu",
        ctx.realizeMorphStemSpec(prefixedStemSpec, ""),
        "kinemu"
    );

    const imperfectiveChain = ctx.buildPatientivoImperfectiveSourceChain(
        { exactBaseVerb: "nemia" },
        "nemia",
        "nemia"
    );
    const imperfectiveBaseSpec = ctx.resolvePatientivoImperfectiveBaseStemSpec(imperfectiveChain);
    s.eq(
        "patientivo imperfective base spec trims final a from -ia stem",
        ctx.realizeMorphStemSpec(imperfectiveBaseSpec, ""),
        "nemi"
    );

    const causativeConfig = ctx.getForwardDerivationConfig("causative");
    s.eq("forward config: causative result field", causativeConfig.resultField, "causativeAllStems");
    s.eq("forward config: causative result spec field", causativeConfig.resultSpecField, "causativeAllStemSpecs");

    const selectedForward = ctx.applySelectedForwardDerivation({
        derivationType: "causative",
        derivationOptions: {
            verb: "nemi",
            analysisVerb: "nemi",
            isYawi: false,
            suppletiveStemSet: null,
        },
        enabled: false,
    });
    s.eq("forward derivation disabled keeps verb", selectedForward.verb, "nemi");
    s.eq("forward derivation disabled keeps analysis verb", selectedForward.analysisVerb, "nemi");

    s.eq(
        "stem pool prefers forward specs when present",
        ctx.resolveStemCollectionPool({
            resolvedDerivationType: "causative",
            causativeAllStems: ["nemitia"],
            causativeAllStemSpecs: [ctx.buildLiteralMorphStemSpec("nemitia")],
        }).length,
        1
    );

    s.eq(
        "primary nonactive selection stem falls back to first selected stem",
        ctx.getPrimaryNonactiveSelectionStem({
            selectedStems: ["nemu", "nemilu"],
        }),
        "nemu"
    );
    s.eq(
        "primary nonactive selection stem spec falls back to literal spec",
        ctx.realizeMorphStemSpec(
            ctx.getPrimaryNonactiveSelectionStemSpec({
                selectedStems: ["nemu"],
            }),
            ""
        ),
        "nemu"
    );

    const prefixedSelection = ctx.buildPrefixedNonactiveSelectionEntry({
        selection: {
            selectedStem: "nemu",
            selectedStemSpec: ctx.buildLiteralMorphStemSpec("nemu"),
            selectedStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu")],
            allStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu"), ctx.buildLiteralMorphStemSpec("nemilu")],
            selectedSuffix: "u",
        },
        prefix: "ki",
        directionalPrefix: "",
        nonactiveObjectSlots: 0,
    });
    s.eq("prefixed nonactive entry realizes selected stem", prefixedSelection.selectedStem, "kinemu");
    s.eq("prefixed nonactive entry realizes all stems", prefixedSelection.allStems[1], "kinemilu");

    const nonactiveFallback = ctx.applyNonactiveDerivation({
        isNonactive: false,
        verb: "nemi",
        analysisVerb: "nemi",
        objectPrefix: "",
        parsedVerb: ctx.parseVerbInput("(nemi)"),
        directionalPrefix: "",
        derivationType: "",
        causativeAllStems: null,
        applicativeAllStems: null,
        isYawi: false,
        suppletiveStemSet: null,
    });
    s.eq("nonactive derivation passthrough keeps verb", nonactiveFallback.verb, "nemi");
    s.eq("nonactive derivation passthrough keeps null override keys", nonactiveFallback.nonactiveObjectPrefixOverride, null);

    return s;
}

module.exports = { run };
