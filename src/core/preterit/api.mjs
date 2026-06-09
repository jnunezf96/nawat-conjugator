// Native wrapper generated from src/core/preterit/api.js.

export function createPreteritApiGlobals(targetObject = globalThis) {
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
    function splitPreteritResultForms(result = "") {
      return result && result !== "—" ? String(result).split(" / ").map(entry => entry.trim()).filter(Boolean) : [];
    }
    function normalizePreteritClassBasedSurfaceValue(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitPreteritClassBasedSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizePreteritClassBasedSurfaceValue(entry)).filter(Boolean);
    }
    function getPreteritClassBasedResultFrame(result = null) {
      const output = result && typeof result === "object" ? result : {};
      if (output.grammarFrame && typeof output.grammarFrame === "object") {
        return output.grammarFrame;
      }
      if (output.frames && typeof output.frames === "object") {
        return output.frames;
      }
      return null;
    }
    function getPreteritClassBasedResultFramePayload(result = null) {
      const grammarFrame = getPreteritClassBasedResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getPreteritClassBasedSurfaceForms(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getPreteritClassBasedResultFramePayload(output);
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitPreteritClassBasedSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output.forms)) {
        forms.push(...output.forms);
      }
      if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output.result) {
        forms.push(output.result);
      }
      return forms.flatMap(entry => splitPreteritClassBasedSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getPreteritClassBasedSurface(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getPreteritClassBasedResultFramePayload(output);
      const candidates = [getPreteritClassBasedSurfaceForms(output)[0], frameResult?.surface, !frameResult ? output.surface || output.result : ""];
      for (const candidate of candidates) {
        const surface = normalizePreteritClassBasedSurfaceValue(candidate);
        if (surface) {
          return surface;
        }
      }
      return "";
    }
    function buildPreteritClassBasedDiagnostic({
      id = "preterit-class-based-result-blocked",
      message = "La generacion no produjo una forma.",
      details = null,
      failedLayer = "output",
      contractLayer = "resultFrame",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "preterit-class-based-result-blocked").trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || "La generacion no produjo una forma.").trim(),
        details: details && typeof details === "object" ? details : null,
        failedLayer: String(failedLayer || "output").trim(),
        contractLayer: String(contractLayer || "resultFrame").trim(),
        routeFamily: "preterit-class-based",
        routeStage: String(routeStage || "").trim()
      };
    }
    function normalizePreteritClassBasedDiagnostics(diagnostics = [], fallbackDiagnostic = null) {
      const entries = [...(Array.isArray(diagnostics) ? diagnostics : []), ...(fallbackDiagnostic ? [fallbackDiagnostic] : [])];
      if (typeof targetObject.normalizeGrammarDiagnosticContractEntries === "function") {
        return targetObject.normalizeGrammarDiagnosticContractEntries(entries);
      }
      return entries.filter(entry => entry && typeof entry === "object");
    }
    function attachPreteritClassBasedGrammarContract(output = null, {
      verb = "",
      analysisVerb = "",
      exactBaseVerb = "",
      tense = "",
      classKey = "",
      classFilter = null,
      allowAllClasses = false,
      isTransitive = false,
      subjectPrefix = "",
      subjectSuffix = "",
      objectPrefix = "",
      baseSubjectPrefix = "",
      baseObjectPrefix = "",
      indirectObjectMarker = "",
      hasNonspecificValence = false,
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      routeStage = "assemble-output",
      diagnosticId = "preterit-class-based-result-blocked",
      message = "La generacion no produjo una forma.",
      diagnosticDetails = null,
      enumerable = false
    } = {}) {
      const result = output && typeof output === "object" ? output : {};
      const forms = getPreteritClassBasedSurfaceForms(result);
      const surface = getPreteritClassBasedSurface(result);
      const ok = Boolean(surface && forms.length);
      const resolvedClassKey = String(classKey || result.provenance?.classKey || classFilter || "").trim();
      const fallbackDiagnostic = buildPreteritClassBasedDiagnostic({
        id: diagnosticId,
        message,
        details: diagnosticDetails,
        failedLayer: "output",
        contractLayer: "resultFrame",
        routeStage
      });
      const diagnostics = normalizePreteritClassBasedDiagnostics(result.diagnostics, ok ? null : fallbackDiagnostic);
      if (!Object.prototype.hasOwnProperty.call(result, "diagnostics")) {
        Object.defineProperty(result, "diagnostics", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: diagnostics
        });
      }
      const grammarFrame = typeof targetObject.buildGrammarFrame === "function" ? targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "preterit-class-based-result",
            classKey: resolvedClassKey,
            provenance: result.provenance || null
          },
          evidenceStatus: ok ? "generated" : "blocked",
          andrewsRefs: ["Andrews Lesson 7"],
          supported: ok
        }) : null,
        unitFrame: {
          unitKind: "verbal-nuclear-clause",
          outputKind: "preterit-class-based-result",
          generationRoute: String(tense || "")
        },
        orthographyFrame: {
          surface,
          surfaceForms: forms,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          subjectPrefix: String(subjectPrefix || ""),
          objectPrefix: String(objectPrefix || ""),
          subjectSuffix: String(subjectSuffix || ""),
          baseSubjectPrefix: String(baseSubjectPrefix || subjectPrefix || ""),
          baseObjectPrefix: String(baseObjectPrefix || objectPrefix || ""),
          indirectObjectMarker: String(indirectObjectMarker || ""),
          directionalInputPrefix: String(directionalInputPrefix || ""),
          directionalOutputPrefix: String(directionalOutputPrefix || ""),
          hasNonspecificValence: hasNonspecificValence === true
        },
        stemFrame: {
          stem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || ""),
          exactBaseVerb: String(exactBaseVerb || ""),
          classKey: resolvedClassKey,
          classFilter: classFilter || null,
          allowAllClasses: allowAllClasses === true,
          variants: Array.isArray(result.provenance?.variants) ? result.provenance.variants : [],
          verbstemClassProfile: result.provenance?.verbstemClassProfile || null
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          formula: "#pers1-pers2(STEM)tense-num1-num2#",
          predicateInsideParentheses: true,
          tenseSlot: true
        },
        participantFrame: {
          subject: {
            prefix: String(subjectPrefix || ""),
            suffix: String(subjectSuffix || "")
          },
          object: {
            prefix: String(objectPrefix || ""),
            indirectObjectMarker: String(indirectObjectMarker || "")
          }
        },
        inflectionFrame: {
          tense: String(tense || ""),
          tenseMode: "verbo",
          classKey: resolvedClassKey,
          isTransitive: isTransitive === true
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily: "preterit-class-based-result",
          routeStage,
          sourceContract: {
            verb: String(verb || ""),
            analysisVerb: String(analysisVerb || verb || ""),
            exactBaseVerb: String(exactBaseVerb || ""),
            classFilter: classFilter || null
          },
          targetContract: {
            outputKind: "preterit-class-based-result",
            tense: String(tense || ""),
            classKey: resolvedClassKey
          },
          generationAllowed: ok,
          blockingDiagnostics: ok ? [] : diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms: forms,
          outputKind: "preterit-class-based-result",
          generationRoute: String(tense || ""),
          sourceInput: String(verb || ""),
          provenance: result.provenance || null
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: ok ? "generated" : "blocked",
          diagnostics,
          blockers: ok ? [] : diagnostics
        }) : null
      }) : null;
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result,
        grammarFrame
      }) : {
        ok,
        surface,
        frames: grammarFrame,
        diagnostics
      };
      Object.defineProperties(result, {
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.frames
        },
        contractDiagnostics: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.diagnostics
        }
      });
      return result;
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
      const contractOptions = {
        verb,
        analysisVerb,
        exactBaseVerb,
        tense,
        classFilter,
        allowAllClasses,
        isTransitive,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        hasNonspecificValence,
        directionalInputPrefix,
        directionalOutputPrefix
      };
      if (!result || result === "—") {
        return attachPreteritClassBasedGrammarContract({
          result,
          forms: [],
          provenance: null
        }, {
          ...contractOptions,
          routeStage: "class-result-gate",
          diagnosticId: "preterit-class-based-result-no-output",
          message: "La ruta preterita/perfectiva no produjo una forma."
        });
      }
      const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
      const classKey = forceClassBOnly ? "B" : classFilter || null;
      if (!classKey) {
        return attachPreteritClassBasedGrammarContract({
          result,
          forms: splitPreteritResultForms(result),
          provenance: null
        }, {
          ...contractOptions,
          routeStage: "assemble-output"
        });
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
        return attachPreteritClassBasedGrammarContract({
          result,
          forms: splitPreteritResultForms(result),
          provenance: null
        }, {
          ...contractOptions,
          classKey,
          routeStage: "assemble-output"
        });
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
      return attachPreteritClassBasedGrammarContract({
        result,
        forms: splitPreteritResultForms(result),
        provenance
      }, {
        ...contractOptions,
        classKey,
        routeStage: "assemble-output"
      });
    }

    const api = {};
    api.buildClassBasedProvenance = buildClassBasedProvenance;
    api.buildVncVerbstemClassProfileFromProvenance = buildVncVerbstemClassProfileFromProvenance;
    api.splitPreteritResultForms = splitPreteritResultForms;
    api.normalizePreteritClassBasedSurfaceValue = normalizePreteritClassBasedSurfaceValue;
    api.splitPreteritClassBasedSurfaceText = splitPreteritClassBasedSurfaceText;
    api.getPreteritClassBasedResultFrame = getPreteritClassBasedResultFrame;
    api.getPreteritClassBasedResultFramePayload = getPreteritClassBasedResultFramePayload;
    api.getPreteritClassBasedSurfaceForms = getPreteritClassBasedSurfaceForms;
    api.getPreteritClassBasedSurface = getPreteritClassBasedSurface;
    api.buildPreteritClassBasedDiagnostic = buildPreteritClassBasedDiagnostic;
    api.normalizePreteritClassBasedDiagnostics = normalizePreteritClassBasedDiagnostics;
    api.attachPreteritClassBasedGrammarContract = attachPreteritClassBasedGrammarContract;
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
    const api = createPreteritApiGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
