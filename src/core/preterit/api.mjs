// Native wrapper generated from src/core/preterit/api.js.

export function createPreteritApi(targetObject = globalThis) {
    function buildClassBasedProvenance({
      verb,
      analysisTarget,
      tense,
      classKey,
      isTransitive,
      context,
      variants,
      subjectSuffix,
      suppletiveStemSet
    }) {
      const provenance = {
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        stemPath: context?.stemPath || (suppletiveStemSet ? "suppletive" : null),
        fromRootPlusYa: Boolean(context?.fromRootPlusYa),
        isMonosyllable: Boolean(context?.isMonosyllable),
        variants: (variants || []).map(variant => targetObject.buildProvenanceVariantEntry({
          base: targetObject.getPretVariantBase(variant),
          suffix: targetObject.getPretVariantSuffix(variant),
          baseSpec: variant?.baseSpec || null
        })),
        subjectSuffix,
        blockedReason: null,
        usesSuppletiveSet: Boolean(suppletiveStemSet)
      };
      provenance.verbstemClassProfile = buildVncVerbstemClassProfileFromProvenance(provenance, {
        context,
        variants,
        suppletiveStemSet
      });
      return provenance;
    }
    function buildVncVerbstemClassProfileFromProvenance(provenance = null, {
      context = null,
      variants = null,
      suppletiveStemSet = null
    } = {}) {
      if (!provenance || typeof provenance !== "object" || !provenance.classKey) {
        return null;
      }
      const classKey = String(provenance.classKey || "");
      const summary = context && typeof targetObject.buildPretUniversalRuleSummary === "function" ? targetObject.buildPretUniversalRuleSummary(context) : null;
      const splitClassList = (value = "") => String(value || "").split("/").map(entry => entry.trim()).filter(Boolean);
      const profileVariants = Array.isArray(provenance.variants) ? provenance.variants : Array.isArray(variants) ? variants.map(variant => targetObject.buildProvenanceVariantEntry({
        base: targetObject.getPretVariantBase(variant),
        suffix: targetObject.getPretVariantSuffix(variant),
        baseSpec: variant?.baseSpec || null
      })) : [];
      return {
        kind: "vnc-verbstem-class-profile",
        version: 1,
        lesson: 7,
        source: suppletiveStemSet ? "suppletive-preterit-provenance" : "preterit-provenance",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        selectedClass: classKey,
        classKey,
        classLabel: classKey ? `Clase ${classKey}` : "",
        tense: String(provenance.tense || ""),
        verb: String(provenance.verb || ""),
        analysisTarget: String(provenance.analysisTarget || ""),
        isTransitive: Boolean(provenance.isTransitive),
        stemPath: provenance.stemPath || "",
        shape: {
          fromRootPlusYa: Boolean(provenance.fromRootPlusYa),
          isMonosyllable: Boolean(provenance.isMonosyllable)
        },
        candidates: splitClassList(summary?.classList || classKey),
        resolvedClasses: splitClassList(summary?.resolvedClassList || classKey),
        ruleSummary: summary ? {
          ruleLabel: summary.ruleLabel || "",
          ruleTier: summary.ruleTier || "",
          shapeLabel: summary.shapeLabel || "",
          shapeLabels: Array.isArray(summary.shapeLabels) ? summary.shapeLabels.slice() : [],
          classList: summary.classList || "",
          resolvedClassList: summary.resolvedClassList || ""
        } : null,
        variants: profileVariants
      };
    }
    function resolvePretUniversalContextBundle({
      verb,
      analysisVerb = "",
      analysisTarget = "",
      isTransitive = false,
      markerOptions = {},
      contextOptions = {},
      includeSummary = false
    }) {
      const resolvedAnalysisTarget = analysisTarget || targetObject.getDerivationRuleBase(analysisVerb || verb, markerOptions);
      const context = targetObject.buildPretUniversalContext(verb, resolvedAnalysisTarget, isTransitive, contextOptions);
      const summary = includeSummary && typeof targetObject.buildPretUniversalRuleSummary === "function" ? targetObject.buildPretUniversalRuleSummary(context) : null;
      return {
        analysisTarget: resolvedAnalysisTarget,
        context,
        summary
      };
    }
    function buildPretUniversalMarkerOptions({
      analysisVerb = "",
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false
    }) {
      return {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
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
        ...overrides
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
      forceClassBOnly = false
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
        forceClassBOnly
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
        ...overrides
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
        hasNonspecificValence: targetObject.resolveHasNonspecificValence(meta),
        exactBaseVerb: meta?.exactBaseVerb || "",
        rootPlusYaBase: meta?.rootPlusYaBase,
        rootPlusYaBasePronounceable: meta?.rootPlusYaBasePronounceable,
        derivationType: meta?.derivationType || ""
      }, overrides);
    }
    function shouldForceClassBOnlyForVerbMode({
      tenseMode = targetObject.getActiveTenseMode(),
      combinedMode = targetObject.getCombinedMode(),
      derivationMode = targetObject.getActiveDerivationMode()
    } = {}) {
      if (tenseMode !== targetObject.TENSE_MODE.verbo) {
        return false;
      }
      return combinedMode === targetObject.COMBINED_MODE.nonactive || derivationMode === targetObject.DERIVATION_MODE.nonactive;
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
        forceClassBOnly: options.forceClassBOnly === true
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
      forceClassBOnly = false
    }) {
      const isTransitive = forceTransitive || objectPrefix !== "";
      const resolvedFinalYaProxyBase = !rootPlusYaBasePronounceable && targetObject.PRETERITO_CLASS_TENSES.has(tense) && !isTransitive ? targetObject.resolveFinalYaPerfectiveAlternateBase(analysisVerb || verb, {
        isTransitive,
        isYawi,
        isWeya,
        requirePronounceable: true
      }) : "";
      const effectiveRootPlusYaBasePronounceable = rootPlusYaBasePronounceable || resolvedFinalYaProxyBase;
      const effectiveRootPlusYaBase = rootPlusYaBase || effectiveRootPlusYaBasePronounceable;
      const result = targetObject.buildClassBasedResult({
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
        forceClassBOnly
      });
      const splitForms = r => r && r !== "—" ? r.split(" / ") : [];
      if (!result || result === "—") {
        return {
          result,
          forms: [],
          provenance: null
        };
      }
      const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
      const classKey = forceClassBOnly ? "B" : classFilter || null;
      if (!classKey) {
        return {
          result,
          forms: splitForms(result),
          provenance: null
        };
      }
      const markerOptions = buildPretMarkerOptionsFromFlags({
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
      });
      let analysisTarget = targetObject.getDerivationRuleBase(analysisVerb || verb, markerOptions);
      let context = null;
      let variants = null;
      if (suppletiveStemSet) {
        const tenseVariantsByClass = suppletiveStemSet.tenseVariantsByClass || null;
        const tenseClassVariants = tenseVariantsByClass && tenseVariantsByClass[tense] ? tenseVariantsByClass[tense] : null;
        variants = tenseClassVariants && tenseClassVariants.get(classKey) || suppletiveStemSet.variantsByClass.get(classKey) || null;
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
          forceClassBOnly
        });
        const resolvedBundle = resolvePretUniversalContextBundle({
          verb,
          analysisVerb,
          isTransitive,
          markerOptions,
          contextOptions
        });
        analysisTarget = resolvedBundle.analysisTarget;
        context = resolvedBundle.context;
        const variantsByClass = targetObject.getPretUniversalVariantsByClass(context);
        variants = variantsByClass.get(classKey) || null;
      }
      if (!variants) {
        return {
          result,
          forms: splitForms(result),
          provenance: null
        };
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
        suppletiveStemSet
      });
      return {
        result,
        forms: splitForms(result),
        provenance
      };
    }

    const api = {};
    api.buildClassBasedProvenance = buildClassBasedProvenance;
    api.buildVncVerbstemClassProfileFromProvenance = buildVncVerbstemClassProfileFromProvenance;
    api.resolvePretUniversalContextBundle = resolvePretUniversalContextBundle;
    api.buildPretUniversalMarkerOptions = buildPretUniversalMarkerOptions;
    api.buildPretMarkerOptionsFromFlags = buildPretMarkerOptionsFromFlags;
    api.buildPretUniversalContextOptions = buildPretUniversalContextOptions;
    api.buildPretContextOptionsFromFlags = buildPretContextOptionsFromFlags;
    api.buildPretContextOptionsFromMeta = buildPretContextOptionsFromMeta;
    api.shouldForceClassBOnlyForVerbMode = shouldForceClassBOnlyForVerbMode;
    api.buildPretVariantsOptionsFromMeta = buildPretVariantsOptionsFromMeta;
    api.buildClassBasedResultWithProvenance = buildClassBasedResultWithProvenance;
    return api;
}

export function installPreteritApiGlobals(targetObject = globalThis) {
    const api = createPreteritApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
