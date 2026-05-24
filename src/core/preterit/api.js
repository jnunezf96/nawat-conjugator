// Preterit/perfective API wrappers: context resolution, options builders,
// and provenance-aware class result assembly.
// Depends on surface provenance helpers, pret context/engine, and legacy globals.

"use strict";

function buildClassBasedProvenance({
    verb,
    analysisTarget,
    tense,
    classKey,
    isTransitive,
    context,
    variants,
    subjectSuffix,
    suppletiveStemSet,
}) {
    return {
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        stemPath: context?.stemPath || (suppletiveStemSet ? "suppletive" : null),
        fromRootPlusYa: Boolean(context?.fromRootPlusYa),
        isMonosyllable: Boolean(context?.isMonosyllable),
        variants: (variants || []).map((variant) => buildProvenanceVariantEntry({
            base: getPretVariantBase(variant),
            suffix: getPretVariantSuffix(variant),
            baseSpec: variant?.baseSpec || null,
        })),
        subjectSuffix,
        blockedReason: null,
        usesSuppletiveSet: Boolean(suppletiveStemSet),
    };
}

function resolvePretUniversalContextBundle({
    verb,
    analysisVerb = "",
    analysisTarget = "",
    isTransitive = false,
    markerOptions = {},
    contextOptions = {},
    includeSummary = false,
}) {
    const resolvedAnalysisTarget = analysisTarget || getDerivationRuleBase(analysisVerb || verb, markerOptions);
    const context = buildPretUniversalContext(verb, resolvedAnalysisTarget, isTransitive, contextOptions);
    const summary = includeSummary && typeof buildPretUniversalRuleSummary === "function"
        ? buildPretUniversalRuleSummary(context)
        : null;
    return {
        analysisTarget: resolvedAnalysisTarget,
        context,
        summary,
    };
}

function buildPretUniversalMarkerOptions({
    analysisVerb = "",
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
}) {
    return {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    };
}

function buildPretMarkerOptionsFromFlags(flags = {}, overrides = {}) {
    return buildPretUniversalMarkerOptions({
        analysisVerb: flags.analysisVerb,
        hasSlashMarker: flags.hasSlashMarker,
        hasSuffixSeparator: flags.hasSuffixSeparator,
        hasLeadingDash: flags.hasLeadingDash,
        hasBoundMarker: flags.hasBoundMarker,
        hasCompoundMarker: flags.hasCompoundMarker,
        ...overrides,
    });
}

function buildPretUniversalContextOptions({
    isYawi = false,
    isWeya = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    isBitransitive = false,
    exactBaseVerb = "",
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
    forceClassBOnly = false,
}) {
    return {
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        isBitransitive,
        exactBaseVerb,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
        forceClassBOnly,
    };
}

function buildPretContextOptionsFromFlags(flags = {}, overrides = {}) {
    return buildPretUniversalContextOptions({
        isYawi: flags.isYawi,
        isWeya: flags.isWeya,
        hasSlashMarker: flags.hasSlashMarker,
        hasSuffixSeparator: flags.hasSuffixSeparator,
        hasLeadingDash: flags.hasLeadingDash,
        hasBoundMarker: flags.hasBoundMarker,
        hasCompoundMarker: flags.hasCompoundMarker,
        hasImpersonalTaPrefix: flags.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: flags.hasOptionalSupportiveI,
        hasNonspecificValence: flags.hasNonspecificValence,
        isBitransitive: flags.isBitransitive,
        exactBaseVerb: flags.exactBaseVerb || "",
        rootPlusYaBase: flags.rootPlusYaBase,
        rootPlusYaBasePronounceable: flags.rootPlusYaBasePronounceable,
        derivationType: flags.derivationType || "",
        forceClassBOnly: flags.forceClassBOnly === true,
        ...overrides,
    });
}

function buildPretContextOptionsFromMeta(meta, overrides = {}) {
    return buildPretContextOptionsFromFlags({
        isYawi: meta?.isYawi,
        isWeya: meta?.isWeya,
        hasSlashMarker: meta?.hasSlashMarker,
        hasSuffixSeparator: meta?.hasSuffixSeparator,
        hasLeadingDash: meta?.hasLeadingDash,
        hasBoundMarker: meta?.hasBoundMarker,
        hasCompoundMarker: meta?.hasCompoundMarker,
        hasImpersonalTaPrefix: meta?.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        exactBaseVerb: meta?.exactBaseVerb || "",
        rootPlusYaBase: meta?.rootPlusYaBase,
        rootPlusYaBasePronounceable: meta?.rootPlusYaBasePronounceable,
        derivationType: meta?.derivationType || "",
    }, overrides);
}

function shouldForceClassBOnlyForVerbMode({
    tenseMode = getActiveTenseMode(),
    combinedMode = getCombinedMode(),
    derivationMode = getActiveDerivationMode(),
} = {}) {
    if (tenseMode !== TENSE_MODE.verbo) {
        return false;
    }
    return (
        combinedMode === COMBINED_MODE.nonactive
        || derivationMode === DERIVATION_MODE.nonactive
    );
}

function buildPretVariantsOptionsFromMeta(meta, overrides = {}) {
    const options = buildPretContextOptionsFromMeta(meta, overrides);
    return {
        isYawi: options.isYawi,
        isWeya: options.isWeya,
        hasSlashMarker: options.hasSlashMarker,
        hasSuffixSeparator: options.hasSuffixSeparator,
        hasLeadingDash: options.hasLeadingDash,
        hasBoundMarker: options.hasBoundMarker,
        hasCompoundMarker: options.hasCompoundMarker,
        hasImpersonalTaPrefix: options.hasImpersonalTaPrefix,
        exactBaseVerb: options.exactBaseVerb || "",
        derivationType: options.derivationType || "",
        forceClassBOnly: options.forceClassBOnly === true,
    };
}

function buildClassBasedResultWithProvenance({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    analysisVerb,
    exactBaseVerb,
    classFilter = null,
    allowAllClasses = false,
    isYawi = false,
    isWeya = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    hasNonspecificValence = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
    hasDoubleDash = false,
    forceClassBSelection = false,
    forceClassBOnly = false,
}) {
    const isTransitive = forceTransitive || objectPrefix !== "";
    const resolvedFinalYaProxyBase = (
        !rootPlusYaBasePronounceable
        && PRETERITO_CLASS_TENSES.has(tense)
        && !isTransitive
    )
        ? resolveFinalYaPerfectiveAlternateBase(analysisVerb || verb, {
            isTransitive,
            isYawi,
            isWeya,
            requirePronounceable: true,
        })
        : "";
    const effectiveRootPlusYaBasePronounceable = rootPlusYaBasePronounceable || resolvedFinalYaProxyBase;
    const effectiveRootPlusYaBase = rootPlusYaBase || effectiveRootPlusYaBasePronounceable;
    const result = buildClassBasedResult({
        verb,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        tense,
        analysisVerb,
        exactBaseVerb,
        classFilter,
        allowAllClasses,
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasNonspecificValence,
        rootPlusYaBase: effectiveRootPlusYaBase,
        rootPlusYaBasePronounceable: effectiveRootPlusYaBasePronounceable,
        derivationType,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        suppletiveStemSet,
        forceTransitive,
        indirectObjectMarker,
        hasDoubleDash,
        forceClassBSelection,
        forceClassBOnly,
    });
    const splitForms = (r) => (r && r !== "—") ? r.split(" / ") : [];
    if (!result || result === "—") {
        return { result, forms: [], provenance: null };
    }
    const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
    const classKey = forceClassBOnly ? "B" : (classFilter || null);
    if (!classKey) {
        return { result, forms: splitForms(result), provenance: null };
    }
    const markerOptions = buildPretMarkerOptionsFromFlags({
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    let analysisTarget = getDerivationRuleBase(analysisVerb || verb, markerOptions);
    let context = null;
    let variants = null;
    if (suppletiveStemSet) {
        const tenseVariantsByClass = suppletiveStemSet.tenseVariantsByClass || null;
        const tenseClassVariants = tenseVariantsByClass && tenseVariantsByClass[tense]
            ? tenseVariantsByClass[tense]
            : null;
        variants = (tenseClassVariants && tenseClassVariants.get(classKey))
            || suppletiveStemSet.variantsByClass.get(classKey)
            || null;
    } else {
        const contextOptions = buildPretContextOptionsFromFlags({
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase: effectiveRootPlusYaBase,
            rootPlusYaBasePronounceable: effectiveRootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly,
        });
        const resolvedBundle = resolvePretUniversalContextBundle({
            verb,
            analysisVerb,
            isTransitive,
            markerOptions,
            contextOptions,
        });
        analysisTarget = resolvedBundle.analysisTarget;
        context = resolvedBundle.context;
        const variantsByClass = getPretUniversalVariantsByClass(context);
        variants = variantsByClass.get(classKey) || null;
    }
    if (!variants) {
        return { result, forms: splitForms(result), provenance: null };
    }
    const provenance = buildClassBasedProvenance({
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        context,
        variants,
        subjectSuffix,
        suppletiveStemSet,
    });
    return { result, forms: splitForms(result), provenance };
}
