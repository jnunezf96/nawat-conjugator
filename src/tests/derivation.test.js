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

    const patientivoFromUwa = ctx.getPatientivoStemFromNonactive("kelunuwa", "uwa", {
        isTransitive: false,
        baseInfo: { lastOnset: "n" },
    });
    const patientivoTVariant = patientivoFromUwa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -uwa exposes base+i+t variant", patientivoTVariant && patientivoTVariant.stem === "keluni");
    s.ok(
        "patientivo from -uwa marks base+i+t variant as no absolutive zero class",
        patientivoTVariant && patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true
    );

    const patientivoTEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoTVariant.stemSpec,
        fallbackStem: patientivoTVariant.stem,
        subjectSuffix: patientivoTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoTEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoTEntry], "nonactive");
    const expandedPatientivoTSuffixes = expandedPatientivoTEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -uwa base+i+t forbids absolutive zero nominal marker",
        expandedPatientivoTSuffixes.includes("")
    );
    s.ok(
        "patientivo from -uwa base+i+t keeps t-class absolutive marker",
        expandedPatientivoTSuffixes.includes("t")
    );

    const patientivoFromWa = ctx.getPatientivoStemFromNonactive("temiwa", "wa", {
        isTransitive: false,
    });
    const patientivoWaTVariant = patientivoFromWa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -wa exposes t-class variant", patientivoWaTVariant && patientivoWaTVariant.stem === "temi");
    s.ok(
        "patientivo from -wa marks t-class variant as no absolutive zero class",
        patientivoWaTVariant && patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true
    );
    const patientivoWaEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoWaTVariant.stemSpec,
        fallbackStem: patientivoWaTVariant.stem,
        subjectSuffix: patientivoWaTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoWaEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoWaEntry], "nonactive");
    const expandedPatientivoWaSuffixes = expandedPatientivoWaEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -wa t-class forbids absolutive zero nominal marker",
        expandedPatientivoWaSuffixes.includes("")
    );
    s.ok(
        "patientivo from -wa t-class keeps t marker",
        expandedPatientivoWaSuffixes.includes("t")
    );
    const nonactiveTClassSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "temi",
        defaultSuffix: "t",
        lockNominalMarker: false,
    });
    s.no(
        "patientivo default suffix resolver forbids absolutive zero for nonactive t-class",
        nonactiveTClassSuffixes.includes("")
    );

    const classCPerfectiveProvenance = {
        baseSpec: ctx.buildPretPerfectiveReplacementBaseSpec("salua", {
            isTransitive: true,
        }),
        surfaceStem: "saluj",
    };
    const resolvedClassCPerfectiveStem = ctx.resolveCalificativoInstrumentivoStemFromProvenanceEntry(
        classCPerfectiveProvenance,
        "salua"
    );
    s.eq(
        "patientivo perfectivo keeps class c replacive j in provenance stem core",
        resolvedClassCPerfectiveStem.fallbackStem,
        "saluj"
    );
    const classCPatientivoEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "perfectivo",
        stemSpec: resolvedClassCPerfectiveStem.stemSpec,
        fallbackStem: resolvedClassCPerfectiveStem.fallbackStem,
        subjectSuffix: "ti",
        lockNominalMarker: true,
        nominalMarkerPolicy: ctx.buildPatientivoNominalMarkerPolicy({
            sourceType: "perfectivo",
            defaultSuffix: "ti",
            allowedSuffixes: ["ti"],
            adjectiveSuffix: "ti",
            lockNominalMarker: true,
        }),
    });
    s.eq(
        "patientivo perfectivo class c builds salujti from provenance stem core",
        `${classCPatientivoEntry.verb}${classCPatientivoEntry.subjectSuffix}`,
        "salujti"
    );

    return s;
}

module.exports = { run };
