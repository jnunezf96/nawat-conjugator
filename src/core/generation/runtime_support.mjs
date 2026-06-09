// Native wrapper generated from src/core/generation/runtime_support.js.

export function createGenerationRuntimeSupportGlobals(targetObject = globalThis) {
    const GENERATE_RUNTIME_NO_OUTPUT_MESSAGE = "La generacion no produjo una forma.";
    function buildGenerateRuntimeBlockedDiagnostic({
      id = "generate-runtime-no-output",
      message = GENERATE_RUNTIME_NO_OUTPUT_MESSAGE,
      failedLayer = "stem",
      contractLayer = "stemFrame",
      routeFamily = "generate-word",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "generate-runtime-no-output").trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || GENERATE_RUNTIME_NO_OUTPUT_MESSAGE).trim(),
        failedLayer: String(failedLayer || "stem").trim(),
        contractLayer: String(contractLayer || "stemFrame").trim(),
        routeFamily: String(routeFamily || "generate-word").trim(),
        routeStage: String(routeStage || "").trim()
      };
    }
    function getGenerateRuntimeDiagnosticLayerContract(routeStage = "") {
      const stage = String(routeStage || "").trim();
      if (/orthography|spelling|letter/i.test(stage)) {
        return {
          failedLayer: "orthography",
          contractLayer: "orthographyFrame"
        };
      }
      if (/agreement|participant/i.test(stage)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/surface|result/i.test(stage)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      return {
        failedLayer: "stem",
        contractLayer: "stemFrame"
      };
    }
    function normalizeGenerateRuntimeDiagnostics(diagnostics = [], fallbackDiagnostic = null, {
      routeFamily = "generate-word",
      routeStage = ""
    } = {}) {
      const layerContract = getGenerateRuntimeDiagnosticLayerContract(routeStage);
      const entries = [...(Array.isArray(diagnostics) ? diagnostics : []), ...(fallbackDiagnostic ? [fallbackDiagnostic] : [])];
      const normalized = entries.map(entry => {
        if (!entry) {
          return null;
        }
        const normalizedEntry = typeof entry === "string" ? {
          id: String(entry || "").trim(),
          message: ""
        } : entry && typeof entry === "object" ? {
          ...entry
        } : null;
        if (!normalizedEntry) {
          return null;
        }
        const id = String(normalizedEntry.id || normalizedEntry.code || normalizedEntry.message || "").trim();
        if (!id) {
          return null;
        }
        return {
          ...normalizedEntry,
          id,
          code: String(normalizedEntry.code || id.toUpperCase().replace(/-/g, "_")).trim(),
          severity: String(normalizedEntry.severity || "error").trim(),
          message: String(normalizedEntry.message || "").trim(),
          failedLayer: normalizedEntry.failedLayer || layerContract.failedLayer,
          contractLayer: normalizedEntry.contractLayer || layerContract.contractLayer,
          routeFamily: normalizedEntry.routeFamily || String(routeFamily || "generate-word").trim(),
          routeStage: normalizedEntry.routeStage || String(routeStage || "").trim()
        };
      }).filter(Boolean);
      return normalized.filter((entry, index, list) => {
        const key = `${entry.id || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function getGenerateRuntimeResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function normalizeGenerateRuntimeContractSurface(value = "") {
      return typeof targetObject.normalizeGrammarSurfaceValue === "function" ? targetObject.normalizeGrammarSurfaceValue(value) : String(value || "").trim() === "—" ? "" : String(value || "").trim();
    }
    function splitGenerateRuntimeContractSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeGenerateRuntimeContractSurface(entry)).filter(Boolean);
    }
    function getGenerateRuntimeSurfaceForms(result = null) {
      if (!result || typeof result !== "object") {
        return [];
      }
      const grammarFrame = getGenerateRuntimeResultFrame(result);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(resultFrame);
      const forms = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitGenerateRuntimeContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        forms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        forms.push(result.result);
      }
      return forms.flatMap(entry => splitGenerateRuntimeContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function resolveGenerateRuntimeContractSurface(result = null) {
      const grammarFrame = getGenerateRuntimeResultFrame(result);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(resultFrame);
      const surfaceForms = getGenerateRuntimeSurfaceForms(result);
      const rawSurface = surfaceForms[0] || resultFrame?.surface || (!hasResultFrame ? result?.surface || result?.result : "") || "";
      return normalizeGenerateRuntimeContractSurface(rawSurface);
    }
    function attachGenerateRuntimeBlockedContract(result = null, {
      routeFamily = "generate-word",
      routeStage = "no-output",
      renderVerb = "",
      objectPrefix = "",
      tense = "",
      derivationType = "",
      diagnosticId = "generate-runtime-no-output",
      message = GENERATE_RUNTIME_NO_OUTPUT_MESSAGE
    } = {}) {
      if (!result || typeof result !== "object" || typeof targetObject.buildGrammarFrame !== "function") {
        return result;
      }
      const fallbackDiagnostic = buildGenerateRuntimeBlockedDiagnostic({
        id: diagnosticId,
        message,
        failedLayer: "stem",
        contractLayer: "stemFrame",
        routeFamily,
        routeStage
      });
      const diagnostics = normalizeGenerateRuntimeDiagnostics(result.diagnostics, Array.isArray(result.diagnostics) && result.diagnostics.length ? null : fallbackDiagnostic, {
        routeFamily,
        routeStage
      });
      Object.defineProperty(result, "diagnostics", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: diagnostics
      });
      const normalizedSurface = resolveGenerateRuntimeContractSurface(result);
      const normalizedSurfaceForms = getGenerateRuntimeSurfaceForms(result);
      const grammarFrame = targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "generate-runtime-no-output",
            evidenceSource: "forward derivation route blocked before stem output"
          },
          evidenceStatus: "blocked",
          supported: false
        }) : null,
        unitFrame: {
          unitKind: "verbal-nuclear-clause",
          outputKind: "generate-runtime-no-output",
          generationRoute: routeFamily
        },
        orthographyFrame: {
          surface: normalizedSurface,
          surfaceForms: normalizedSurfaceForms,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          blockedBoundary: "stem-output",
          tense: String(tense || "")
        },
        stemFrame: {
          stem: String(renderVerb || ""),
          blocked: true
        },
        nuclearClauseFrame: null,
        participantFrame: {
          object: {
            prefix: String(objectPrefix || "")
          }
        },
        inflectionFrame: {
          tense: String(tense || ""),
          derivationType: String(derivationType || "")
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily,
          routeStage,
          sourceContract: {
            renderVerb: String(renderVerb || ""),
            objectPrefix: String(objectPrefix || ""),
            tense: String(tense || ""),
            derivationType: String(derivationType || "")
          },
          targetContract: {
            outputKind: "generate-runtime-no-output",
            generationRoute: routeFamily
          },
          generationAllowed: false,
          blockingDiagnostics: diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok: false,
          surface: normalizedSurface,
          surfaceForms: normalizedSurfaceForms,
          outputKind: "generate-runtime-no-output",
          generationRoute: routeFamily,
          sourceInput: String(renderVerb || "")
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: "blocked",
          diagnostics,
          blockers: diagnostics
        }) : null
      });
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result,
        grammarFrame
      }) : {
        ok: false,
        surface: normalizedSurface,
        frames: grammarFrame,
        diagnostics
      };
      Object.defineProperties(result, {
        grammarFrame: {
          configurable: true,
          enumerable: false,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable: false,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable: false,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable: false,
          writable: true,
          value: resultContract.frames
        },
        contractDiagnostics: {
          configurable: true,
          enumerable: false,
          writable: true,
          value: resultContract.diagnostics
        }
      });
      return result;
    }
    function buildNoStemMaskResult({
      shouldMask = false,
      silent = false,
      renderVerb = "",
      objectPrefix = "",
      tense = "",
      isReflexive = false,
      derivationType = "",
      routeFamily = "forward-derivation",
      routeStage = "no-stem-mask"
    }) {
      if (!shouldMask) {
        return null;
      }
      if (!silent) {
        targetObject.renderAllOutputs({
          verb: renderVerb,
          objectPrefix,
          tense
        });
      }
      return attachGenerateRuntimeBlockedContract({
        result: "—",
        surfaceForms: [],
        isReflexive
      }, {
        routeFamily,
        routeStage,
        renderVerb,
        objectPrefix,
        tense,
        derivationType,
        diagnosticId: "generate-forward-derivation-no-stem"
      });
    }
    function applyForwardStageForGenerate({
      derivationType = "",
      enabled = false,
      derivationOptions = null,
      silent = false,
      renderVerb = "",
      baseObjectPrefix = "",
      tense = "",
      isReflexive = false
    }) {
      const stage = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions,
        enabled
      });
      const noStemMask = buildNoStemMaskResult({
        shouldMask: stage.blocked,
        silent,
        renderVerb,
        objectPrefix: baseObjectPrefix,
        tense,
        isReflexive,
        derivationType
      });
      const config = targetObject.getForwardDerivationConfig(derivationType);
      return {
        stage,
        noStemMask,
        derivedStems: config?.resultField ? stage[config.resultField] : null,
        derivedStemSpecs: config?.resultSpecField ? stage[config.resultSpecField] : null
      };
    }
    function applyGenerateForwardDerivations({
      resolvedDerivationType = "",
      buildDerivationOptions = () => ({}),
      silent = false,
      renderVerb = "",
      baseObjectPrefix = "",
      tense = "",
      isReflexive = false,
      initialState = null
    }) {
      let {
        verb = "",
        analysisVerb = "",
        isYawi = false,
        suppletiveStemSet = null
      } = initialState || {};
      const derivedStemPoolByField = {
        causativeAllStems: null,
        applicativeAllStems: null
      };
      const derivedStemSpecPoolByField = {
        causativeAllStemSpecs: null,
        applicativeAllStemSpecs: null
      };
      const selectedForwardMetaByType = {
        [targetObject.DERIVATION_TYPE.causative]: null,
        [targetObject.DERIVATION_TYPE.applicative]: null
      };
      const applyStage = (derivationType, enabled) => {
        const stageResult = applyForwardStageForGenerate({
          derivationType,
          derivationOptions: buildDerivationOptions({
            verb,
            analysisVerb,
            isYawi,
            suppletiveStemSet
          }),
          enabled,
          silent,
          renderVerb,
          baseObjectPrefix,
          tense,
          isReflexive
        });
        const stageState = targetObject.extractForwardDerivationState(stageResult.stage, {
          verb,
          analysisVerb,
          isYawi,
          suppletiveStemSet
        });
        verb = stageState.verb;
        analysisVerb = stageState.analysisVerb;
        isYawi = stageState.isYawi;
        suppletiveStemSet = stageState.suppletiveStemSet;
        return stageResult;
      };
      for (const stageType of targetObject.FORWARD_DERIVATION_STAGE_ORDER) {
        const stageResult = applyStage(stageType, resolvedDerivationType === stageType);
        if (stageResult.noStemMask) {
          return {
            noStemMask: stageResult.noStemMask
          };
        }
        const config = targetObject.getForwardDerivationConfig(stageType);
        if (config?.resultField) {
          derivedStemPoolByField[config.resultField] = stageResult.derivedStems;
        }
        if (config?.resultSpecField) {
          derivedStemSpecPoolByField[config.resultSpecField] = stageResult.derivedStemSpecs;
        }
        selectedForwardMetaByType[stageType] = stageResult.stage?.selectedForwardMeta || null;
      }
      return {
        noStemMask: null,
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
        causativeAllStems: derivedStemPoolByField.causativeAllStems,
        applicativeAllStems: derivedStemPoolByField.applicativeAllStems,
        causativeAllStemSpecs: derivedStemSpecPoolByField.causativeAllStemSpecs,
        applicativeAllStemSpecs: derivedStemSpecPoolByField.applicativeAllStemSpecs,
        causativeSelectionMeta: selectedForwardMetaByType[targetObject.DERIVATION_TYPE.causative] || null,
        applicativeSelectionMeta: selectedForwardMetaByType[targetObject.DERIVATION_TYPE.applicative] || null
      };
    }
    function applySuppletiveYawiPrefixToStemSet(suppletiveStemSet, applyPrefix) {
      if (!suppletiveStemSet || typeof applyPrefix !== "function") {
        return suppletiveStemSet;
      }
      const prefixedVariants = new Map();
      suppletiveStemSet.variantsByClass.forEach((variants, classKey) => {
        prefixedVariants.set(classKey, variants.map(variant => ({
          ...variant,
          base: applyPrefix(variant.base)
        })));
      });
      return {
        ...suppletiveStemSet,
        imperfective: {
          verb: applyPrefix(suppletiveStemSet.imperfective?.verb || ""),
          analysisVerb: suppletiveStemSet.imperfective?.analysisVerb || ""
        },
        variantsByClass: prefixedVariants
      };
    }
    function applyNonactiveGenerateOverrides({
      nonactiveDerivation,
      objectPrefix,
      morphologyObjectPrefix,
      baseObjectPrefix,
      indirectObjectMarker,
      thirdObjectMarker,
      isReflexive
    }) {
      if (nonactiveDerivation?.nonactiveObjectPrefixOverride == null) {
        return {
          objectPrefix,
          morphologyObjectPrefix,
          baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          isReflexive
        };
      }
      const overriddenObjectPrefix = nonactiveDerivation.nonactiveObjectPrefixOverride;
      return {
        objectPrefix: overriddenObjectPrefix,
        morphologyObjectPrefix: overriddenObjectPrefix,
        baseObjectPrefix: overriddenObjectPrefix,
        indirectObjectMarker: nonactiveDerivation.nonactiveIndirectMarkerOverride != null ? nonactiveDerivation.nonactiveIndirectMarkerOverride : indirectObjectMarker,
        thirdObjectMarker: "",
        isReflexive: overriddenObjectPrefix === "mu"
      };
    }
    function resolveStemCandidateMorphologyResult({
      stemCandidate,
      baseMorphologyInput,
      directionalPrefix,
      embeddedPrefix,
      shouldApplyDerivedAllomorphy,
      isPassiveImpersonalMode,
      parsedVerb,
      indirectObjectMarker,
      thirdObjectMarker,
      isNominalOutputProfile,
      tense,
      possessivePrefix,
      patientivoOwnership,
      isYawi
    }) {
      const stem = stemCandidate && typeof stemCandidate === "object" && stemCandidate.kind ? targetObject.realizeMorphStemSpec(stemCandidate, "") : String(stemCandidate || "");
      if (!stem) {
        return null;
      }
      let stemAnalysis = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
      if (embeddedPrefix && stemAnalysis.startsWith(embeddedPrefix)) {
        stemAnalysis = stemAnalysis.slice(embeddedPrefix.length);
      }
      let stemVerb = stem;
      let stemAnalysisResolved = stemAnalysis;
      let stemObjectPrefix = baseMorphologyInput.objectPrefix;
      if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = targetObject.applyObjectAllomorphy({
          verb: stemVerb,
          analysisVerb: stemAnalysisResolved,
          subjectPrefix: baseMorphologyInput.subjectPrefix,
          subjectSuffix: baseMorphologyInput.subjectSuffix,
          objectPrefix: stemObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          isPassiveImpersonalMode,
          ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
        });
        stemVerb = derivedAllomorphy.verb;
        stemAnalysisResolved = derivedAllomorphy.analysisVerb;
        stemObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
      }
      const applied = targetObject.applyMorphologyRules({
        ...baseMorphologyInput,
        verb: stemVerb,
        analysisVerb: stemAnalysisResolved,
        analysisExactVerb: stemAnalysisResolved,
        objectPrefix: stemObjectPrefix
      });
      if (!applied || applied.error || !applied.verb) {
        return null;
      }
      const localSubjectPrefix = applied.subjectPrefix;
      const localObjectPrefix = applied.objectPrefix;
      let localSubjectSuffix = applied.subjectSuffix;
      let localVerb = applied.verb;
      const customaryPresentPatientiveSelectedProjectiveObjectPrefix = baseMorphologyInput.customaryPresentPatientiveSelectedProjectiveObjectPrefix === "ta" || baseMorphologyInput.customaryPresentPatientiveSelectedProjectiveObjectPrefix === "te" ? baseMorphologyInput.customaryPresentPatientiveSelectedProjectiveObjectPrefix : "";
      const keepSelectedCustomaryPresentPatientiveProjectiveStem = (stemValue = "") => {
        const normalizedStem = String(stemValue || "");
        if (!customaryPresentPatientiveSelectedProjectiveObjectPrefix || !normalizedStem) {
          return normalizedStem;
        }
        return normalizedStem.startsWith(customaryPresentPatientiveSelectedProjectiveObjectPrefix) ? normalizedStem : `${customaryPresentPatientiveSelectedProjectiveObjectPrefix}${normalizedStem}`;
      };
      if (baseMorphologyInput.customaryPresentPatientiveNnc === true) {
        const moveCustomaryPresentNi = localSubjectSuffix === "ni" || localSubjectSuffix === "nit";
        if (moveCustomaryPresentNi) {
          localVerb = `${localVerb || ""}ni`;
          localSubjectSuffix = baseMorphologyInput.customaryPresentPatientivePlural === true ? "met" : "";
        }
        localVerb = keepSelectedCustomaryPresentPatientiveProjectiveStem(localVerb);
      }
      let localFormSpec = applied.formSpec || (isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(localVerb, localSubjectSuffix) : null);
      if (isNominalOutputProfile && baseMorphologyInput.customaryPresentPatientiveNnc === true) {
        localFormSpec = targetObject.buildLiteralNominalFormSpec(localVerb, localSubjectSuffix);
      }
      if (tense === "patientivo" && Boolean(possessivePrefix)) {
        localSubjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(localSubjectSuffix, true, patientivoOwnership, {
          stem: applied.verb
        });
        if (localSubjectSuffix === null) {
          return null;
        }
        if (isNominalOutputProfile) {
          localFormSpec = targetObject.withNominalFormSpecSuffix(localFormSpec, localSubjectSuffix, {
            verb: applied.verb,
            subjectSuffix: localSubjectSuffix
          });
        }
      }
      const isYawiImperative = isYawi && tense === "imperativo" && localSubjectSuffix === "";
      const localAlternates = (applied.alternateForms || []).map(form => {
        const normalizedForm = isNominalOutputProfile ? targetObject.normalizeNominalFormEntry(form, {
          subjectSuffix: localSubjectSuffix
        }) : form;
        const rawAltSuffix = form.subjectSuffix ?? localSubjectSuffix;
        const moveAltCustomaryPresentNi = baseMorphologyInput.customaryPresentPatientiveNnc === true && (rawAltSuffix === "ni" || rawAltSuffix === "nit");
        const altVerb = moveAltCustomaryPresentNi ? `${normalizedForm.verb || ""}ni` : normalizedForm.verb;
        const resolvedAltVerb = baseMorphologyInput.customaryPresentPatientiveNnc === true ? keepSelectedCustomaryPresentPatientiveProjectiveStem(altVerb) : altVerb;
        const customaryPluralAltSuffix = moveAltCustomaryPresentNi ? baseMorphologyInput.customaryPresentPatientivePlural === true ? "met" : "" : rawAltSuffix;
        const altSuffix = tense === "patientivo" && Boolean(possessivePrefix) ? targetObject.adjustPatientivoPossessiveSuffix(customaryPluralAltSuffix, true, patientivoOwnership, {
          stem: normalizedForm.verb
        }) : customaryPluralAltSuffix;
        if (altSuffix === null) {
          return null;
        }
        const altFormSpec = isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(resolvedAltVerb, altSuffix) : normalizedForm.formSpec;
        return {
          ...normalizedForm,
          verb: resolvedAltVerb,
          subjectSuffix: altSuffix,
          formSpec: altFormSpec,
          trailingSuffix: normalizedForm.trailingSuffix || ""
        };
      }).filter(Boolean);
      return {
        subjectPrefix: localSubjectPrefix,
        objectPrefix: localObjectPrefix,
        subjectSuffix: localSubjectSuffix,
        verb: localVerb,
        formSpec: localFormSpec,
        trailingSuffix: applied.trailingSuffix || "",
        alternateForms: localAlternates,
        directionalChainMeta: applied.directionalChainMeta || null,
        surfaceRuleMeta: applied.surfaceRuleMeta || null,
        isYawiImperative
      };
    }

    const api = {};
    Object.defineProperty(api, "GENERATE_RUNTIME_NO_OUTPUT_MESSAGE", {
        configurable: true,
        enumerable: true,
        get() { return GENERATE_RUNTIME_NO_OUTPUT_MESSAGE; },
    });
    api.buildGenerateRuntimeBlockedDiagnostic = buildGenerateRuntimeBlockedDiagnostic;
    api.getGenerateRuntimeDiagnosticLayerContract = getGenerateRuntimeDiagnosticLayerContract;
    api.normalizeGenerateRuntimeDiagnostics = normalizeGenerateRuntimeDiagnostics;
    api.getGenerateRuntimeResultFrame = getGenerateRuntimeResultFrame;
    api.normalizeGenerateRuntimeContractSurface = normalizeGenerateRuntimeContractSurface;
    api.splitGenerateRuntimeContractSurfaceText = splitGenerateRuntimeContractSurfaceText;
    api.getGenerateRuntimeSurfaceForms = getGenerateRuntimeSurfaceForms;
    api.resolveGenerateRuntimeContractSurface = resolveGenerateRuntimeContractSurface;
    api.attachGenerateRuntimeBlockedContract = attachGenerateRuntimeBlockedContract;
    api.buildNoStemMaskResult = buildNoStemMaskResult;
    api.applyForwardStageForGenerate = applyForwardStageForGenerate;
    api.applyGenerateForwardDerivations = applyGenerateForwardDerivations;
    api.applySuppletiveYawiPrefixToStemSet = applySuppletiveYawiPrefixToStemSet;
    api.applyNonactiveGenerateOverrides = applyNonactiveGenerateOverrides;
    api.resolveStemCandidateMorphologyResult = resolveStemCandidateMorphologyResult;
    return api;
}

export function installGenerationRuntimeSupportGlobals(targetObject = globalThis) {
    const api = createGenerationRuntimeSupportGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
