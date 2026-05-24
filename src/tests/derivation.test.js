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

    const originalNonactiveOptionPronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "kinemu";
        const prefixedNonactiveRuleSource = ctx.buildNonactiveRuleSourceContext("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
        });
        const prefixedNonactiveOptions = ctx.getNonactiveDerivationOptions("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
            nonactiveRuleSource: prefixedNonactiveRuleSource,
        });
        const realizedPrefixedNonactiveOptions = prefixedNonactiveOptions
            .map((option) => ctx.realizeNonactiveDerivationOption(option, prefixedNonactiveRuleSource))
            .filter(Boolean);
        s.ok(
            "nonactive derivation options keep source-aware prefixed surfaces",
            realizedPrefixedNonactiveOptions.some((entry) => entry.suffix === "u" && entry.stem === "kinemu")
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalNonactiveOptionPronounceability;
    }

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

    const originalResolvePretUniversalContextBundle = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdge = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidates = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenance = ctx.buildClassBasedResultWithProvenance;
    const originalIsSyllableSequencePronounceable = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = () => true;
        const prioritizedClassCDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo prefers class c provenance stem over class a/b trim fallback",
            `${prioritizedClassCDerivations[0].verb}${prioritizedClassCDerivations[0].subjectSuffix}`,
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundle;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdge;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidates;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenance;
        ctx.isSyllableSequencePronounceable = originalIsSyllableSequencePronounceable;
    }

    const originalResolvePretUniversalContextBundleForPerfectivoGate = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdgeForPerfectivoGate = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidatesForPerfectivoGate = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenanceForPerfectivoGate = ctx.buildClassBasedResultWithProvenance;
    const originalPerfectivoGatePronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = (value) => value === "salujti";
        const gatedPerfectivoStemEntries = ctx.buildPatientivoPerfectivoStemEntries({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.ok(
            "patientivo perfectivo stem entries keep class c stem when ti surface is the authority",
            gatedPerfectivoStemEntries.some((entry) => entry.verb === "saluj")
        );
        const gatedPerfectivoDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo derivations still gate on the surfaced ti form",
            gatedPerfectivoDerivations.map((entry) => `${entry.verb}${entry.subjectSuffix}`).join(" / "),
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPerfectivoGate;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdgeForPerfectivoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPerfectivoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPerfectivoGate;
        ctx.isSyllableSequencePronounceable = originalPerfectivoGatePronounceability;
    }

    const originalPasadoRemotoPronounceability = ctx.isSyllableSequencePronounceable;
    const originalResolvePretUniversalContextBundleForPasadoRemotoGate = ctx.resolvePretUniversalContextBundle;
    const originalGetPretUniversalClassCandidatesForPasadoRemotoGate = ctx.getPretUniversalClassCandidates;
    const originalGetPretUniversalClassOrderForPasadoRemotoGate = ctx.getPretUniversalClassOrder;
    const originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate = ctx.buildClassBasedResultWithProvenance;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "takawajka";
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.getPretUniversalClassCandidates = () => new Set(["D"]);
        ctx.getPretUniversalClassOrder = () => ["D"];
        ctx.buildClassBasedResultWithProvenance = () => ({
            provenance: {
                variants: [
                    {
                        base: "waj",
                        suffix: "",
                        surfaceStem: "waj",
                    },
                ],
            },
        });
        const parsedCalificativoClassD = ctx.parseVerbInput("(taka)-(wa)");
        const gatedPasadoRemotoStemEntries = ctx.buildPasadoRemotoStemEntries({
            verb: parsedCalificativoClassD.verb,
            analysisVerb: parsedCalificativoClassD.analysisVerb,
            rawAnalysisVerb: parsedCalificativoClassD.rawAnalysisVerb || "",
            sourceRawVerb: parsedCalificativoClassD.sourceRawVerb || "(taka)-(wa)",
            isTransitive: true,
            directionalPrefix: parsedCalificativoClassD.directionalPrefix || "",
            boundPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsedCalificativoClassD.boundPrefixes) ? parsedCalificativoClassD.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsedCalificativoClassD.boundExplicitFlags) ? parsedCalificativoClassD.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsedCalificativoClassD.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            sourcePrefix: parsedCalificativoClassD.sourcePrefix || "",
            sourceBase: parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.canonicalRuleBase || "",
            sourceCompositeBase: parsedCalificativoClassD.canonical?.slashCompositeRuleBase || "",
            hasImpersonalTaPrefix: parsedCalificativoClassD.hasImpersonalTaPrefix === true,
            hasOptionalSupportiveI: parsedCalificativoClassD.hasOptionalSupportiveI === true,
            hasSlashMarker: parsedCalificativoClassD.hasSlashMarker === true,
            hasSuffixSeparator: parsedCalificativoClassD.hasSuffixSeparator === true,
            hasLeadingDash: parsedCalificativoClassD.hasLeadingDash === true,
            hasBoundMarker: parsedCalificativoClassD.hasBoundMarker === true,
            hasCompoundMarker: parsedCalificativoClassD.hasCompoundMarker === true,
            hasNonspecificValence: parsedCalificativoClassD.hasNonspecificValence === true,
            exactBaseVerb: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsedCalificativoClassD.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsedCalificativoClassD.rootPlusYaBasePronounceable || "",
            matrixBaseOverride: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
        });
        s.eq(
            "pasado remoto stem entries keep stems when the predicate surface is pronounceable",
            gatedPasadoRemotoStemEntries.map((entry) => entry.verb).join(" / "),
            "takawaj"
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalPasadoRemotoPronounceability;
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPasadoRemotoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPasadoRemotoGate;
        ctx.getPretUniversalClassOrder = originalGetPretUniversalClassOrderForPasadoRemotoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate;
    }

    const transitiveLuaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "-(salua)",
        analysisVerb: "salua",
        rawAnalysisVerb: "salua",
        isTransitive: true,
        sourceBase: "salua",
        hasLeadingDash: true,
    });
    s.ok(
        "patientivo tronco transitive l|VV ua keeps the raw stem family",
        transitiveLuaTroncoDerivations.some((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}` === "sal")
    );
    const expandedTransitiveLuaTronco = ctx.expandPatientivoNominalMarkerOptions(
        transitiveLuaTroncoDerivations,
        "tronco-verbal"
    );
    s.eq(
        "patientivo tronco transitive l|VV ua expands nominal markers",
        expandedTransitiveLuaTronco.map((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}`).join(" / "),
        "sal / salti / salin"
    );

    return s;
}

module.exports = { run };
