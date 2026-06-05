// Native wrapper generated from src/core/generation/engine.js.

export function createGenerationEngineApi(targetObject = globalThis) {
    const GENERATE_WORD_NOOP = () => {};
    function resolveGenerateWordUiHook(uiHooks = null, key = "") {
      const hook = uiHooks && typeof uiHooks === "object" ? uiHooks[key] : null;
      return typeof hook === "function" ? hook : GENERATE_WORD_NOOP;
    }
    function isOrdinaryNncGenerationOptIn(override = null) {
      const ordinaryNnc = override?.ordinaryNnc;
      return ordinaryNnc === true || ordinaryNnc && typeof ordinaryNnc === "object" && ordinaryNnc.enabled === true;
    }
    function getOrdinaryNncGenerationOptions(override = null) {
      return override?.ordinaryNnc && typeof override.ordinaryNnc === "object" ? override.ordinaryNnc : {};
    }
    function executeOrdinaryNncGenerationRoute({
      override = null,
      verb = "",
      subjectPrefix = "",
      subjectSuffix = "",
      possessivePrefix = ""
    } = {}) {
      const ordinaryNnc = getOrdinaryNncGenerationOptions(override);
      const possessor = ordinaryNnc.possessor ?? ordinaryNnc.possessivePrefix ?? possessivePrefix;
      const state = ordinaryNnc.state ?? (possessor ? "possessive" : "absolutive");
      const result = typeof targetObject.generateOrdinaryNncParadigm === "function" ? targetObject.generateOrdinaryNncParadigm({
        stem: ordinaryNnc.stem ?? verb,
        state,
        subject: {
          subjectPrefix,
          subjectSuffix
        },
        possessor,
        possessivePrefix: possessor,
        number: ordinaryNnc.number ?? "singular",
        nounClass: ordinaryNnc.nounClass ?? ""
      }) : {
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(ordinaryNnc.stem ?? verb ?? ""),
        state,
        nounClass: "",
        animacy: "",
        number: ordinaryNnc.number ?? "singular",
        subject: null,
        possessor: null,
        diagnostics: [{
          id: "ordinary-nnc-unavailable",
          severity: "error",
          message: "Ordinary NNC generation is unavailable."
        }]
      };
      return {
        ...result,
        generationRoute: "ordinary-nnc",
        isReflexive: false,
        stemProvenance: null
      };
    }
    function executeGenerateWordRequest(request = {}) {
      let options = request?.options || {};
      if (typeof targetObject.Event !== "undefined" && options instanceof targetObject.Event) {
        options = {};
      }
      options = targetObject.sanitizeGenerateWordOptions(options);
      const silent = options.silent === true;
      const skipValidation = options.skipValidation === true;
      const override = options.override || null;
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(override?.tenseMode) ? override.tenseMode : targetObject.getActiveTenseMode();
      const resolvedDerivationMode = Object.values(targetObject.DERIVATION_MODE).includes(override?.derivationMode) ? override.derivationMode : targetObject.getActiveDerivationMode();
      const resolvedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(override?.derivationType) ? override.derivationType : targetObject.getActiveDerivationType();
      const derivationValencyDelta = targetObject.getDerivationValencyDelta(resolvedDerivationType);
      const resolvedVoiceMode = Object.values(targetObject.VOICE_MODE).includes(override?.voiceMode) ? override.voiceMode : targetObject.getActiveVoiceMode();
      const preservePassiveSubject = override?.preservePassiveSubject === true;
      const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
      const prefixInputs = request?.prefixInputs && typeof request.prefixInputs === "object" ? request.prefixInputs : {};
      let subjectPrefix = prefixInputs.subjectPrefix || "";
      let objectPrefix = prefixInputs.objectPrefix || "";
      let verb = prefixInputs.verb || "";
      let subjectSuffix = prefixInputs.subjectSuffix || "";
      let possessivePrefix = prefixInputs.possessivePrefix || "";
      const liveInput = request?.liveInput && typeof request.liveInput === "object" ? request.liveInput : {};
      const hasVerbInput = liveInput.hasVerbInput === true;
      const verbInputValue = String(liveInput.verbInputValue || "");
      const clearError = resolveGenerateWordUiHook(request?.uiHooks, "clearError");
      const setError = resolveGenerateWordUiHook(request?.uiHooks, "setError");
      const onSearchQueryOnly = resolveGenerateWordUiHook(request?.uiHooks, "onSearchQueryOnly");
      const onValidationError = resolveGenerateWordUiHook(request?.uiHooks, "onValidationError");
      const onVerbInputSync = resolveGenerateWordUiHook(request?.uiHooks, "onVerbInputSync");
      const onVerbAnalysisResolved = resolveGenerateWordUiHook(request?.uiHooks, "onVerbAnalysisResolved");
      const onComplete = resolveGenerateWordUiHook(request?.uiHooks, "onComplete");
      const patientivoOwnership = override?.patientivoOwnership ?? targetObject.DEFAULT_PATIENTIVO_OWNERSHIP;
      const patientivoSource = override?.patientivoSource ?? "nonactive";
      const patientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(override?.patientivoNominalSuffix);
      let searchQuery = "";
      let hasSearchQuery = false;
      let hasSearchSeparator = false;
      if (!override?.verb && hasVerbInput) {
        const searchParts = targetObject.getSearchParts(verb);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = targetObject.rememberNonSearchValue(searchParts);
        if (baseValue) {
          verb = searchParts.base;
        } else if (hasSearchQuery && targetObject.VerbInputState.lastNonSearchValue) {
          verb = targetObject.VerbInputState.lastNonSearchValue;
        }
        if (hasSearchQuery && !verb) {
          if (!silent) {
            onSearchQueryOnly({
              verbInputValue
            });
          }
          return null;
        }
      }
      let tense = override?.tense || "";
      if (!tense) {
        const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
        tense = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
      }
      if (isOrdinaryNncGenerationOptIn(override)) {
        return executeOrdinaryNncGenerationRoute({
          override,
          verb,
          subjectPrefix,
          subjectSuffix,
          possessivePrefix
        });
      }
      const isTroncoNajActiveWrapperTense = targetObject.isPotencialTroncoNajActiveTense(tense);
      const isPatientivoAdjectiveProfile = targetObject.isPatientivoAdjectiveTense(tense);
      const isNominalOutputProfile = targetObject.isNominalMorphProfileTense(tense);
      if (targetObject.isPotencialProfileTense(tense)) {
        possessivePrefix = "";
      }
      if (isPatientivoAdjectiveProfile) {
        possessivePrefix = "";
      }
      if (isTroncoNajActiveWrapperTense) {
        objectPrefix = "";
      }
      let baseObjectPrefix = objectPrefix;
      let isReflexive = objectPrefix === "mu";
      let isYawiImperativeSingular = false;
      let shouldAddYuVariant = false;
      const yawiSurfaceBase = targetObject.getSuppletiveYawiImperfective();
      const yawiPresentLong = yawiSurfaceBase;
      const yawiPresentShort = yawiSurfaceBase;
      const yawiHabitual = yawiSurfaceBase;
      const yawiLegacyLong = targetObject.getSuppletiveYawiCanonical();
      const yawiLegacyShort = targetObject.getSuppletiveYawiShort();
      const yawiYuVariant = targetObject.getSuppletiveYawiYuVariant();
      let primaryFormSpec = null;
      const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
          return null;
        }
        errorTargets.forEach(target => setError(target));
        if (!silent) {
          onValidationError({
            tense,
            baseObjectPrefix
          });
        }
        return {
          error: message
        };
      };
      const returnIfError = (message, errorTargets = []) => {
        const error = returnError(message, errorTargets);
        return error || null;
      };
      const buildActiveOutputWordText = ({
        subjectPrefix: subjectPrefixValue = "",
        objectPrefix: objectPrefixValue = "",
        subjectSuffix: subjectSuffixValue = "",
        verb: verbValue = "",
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
        isYawiImperative = false
      } = {}) => {
        const usePossessivePrefix = tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
        const preposedParticle = tense === "imperativo" ? isYawiImperative ? "ma " : targetObject.getSubjectPersonInfo(subjectPrefixValue, subjectSuffixValue)?.person === 2 ? "" : "ma " : "";
        const outputTextOptions = {
          preposedParticle,
          subjectPrefix: subjectPrefixValue,
          possessivePrefix: usePossessivePrefix ? possessivePrefix : "",
          objectPrefix: objectPrefixValue,
          verb: verbValue,
          subjectSuffix: subjectSuffixValue,
          hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI === true,
          optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter || "",
          directionalChainMeta,
          surfaceRuleMeta
        };
        return isNominalOutputProfile ? targetObject.buildNominalOutputText({
          ...outputTextOptions,
          trailingSuffix
        }) : targetObject.buildOutputWordText(outputTextOptions);
      };
      let appliedMorphology = null;
      const mergeSurfaceRuleMeta = (...metas) => {
        const merged = {};
        let hasMeta = false;
        metas.forEach(meta => {
          if (!meta || typeof meta !== "object") {
            return;
          }
          Object.assign(merged, meta);
          hasMeta = true;
        });
        return hasMeta ? merged : null;
      };
      const getCurrentSurfaceRuleMeta = () => mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta);
      const buildWord = (overrideVerb = verb, overrideSuffix = subjectSuffix) => {
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(primaryFormSpec, {
          verb: overrideVerb,
          subjectSuffix: overrideSuffix
        }) : null;
        return buildActiveOutputWordText({
          subjectPrefix,
          objectPrefix,
          subjectSuffix: realizedNominal ? realizedNominal.subjectSuffix : overrideSuffix,
          verb: realizedNominal ? realizedNominal.verb : overrideVerb,
          trailingSuffix: appliedMorphology?.trailingSuffix || "",
          directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
          surfaceRuleMeta: getCurrentSurfaceRuleMeta(),
          isYawiImperative: isYawiImperativeSingular
        });
      };
      const buildWordFromParts = ({
        subjectPrefix: subjectPrefixValue,
        objectPrefix: objectPrefixValue,
        subjectSuffix: subjectSuffixValue,
        verb: verbValue,
        formSpec = null,
        trailingSuffix = "",
        isYawiImperative = false,
        directionalChainMeta = null,
        surfaceRuleMeta = null
      }) => {
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(formSpec, {
          verb: verbValue,
          subjectSuffix: subjectSuffixValue
        }) : null;
        return buildActiveOutputWordText({
          subjectPrefix: subjectPrefixValue,
          objectPrefix: objectPrefixValue,
          subjectSuffix: realizedNominal ? realizedNominal.subjectSuffix : subjectSuffixValue,
          verb: realizedNominal ? realizedNominal.verb : verbValue,
          trailingSuffix,
          directionalChainMeta,
          surfaceRuleMeta,
          isYawiImperative
        });
      };
      clearError("subject-prefix");
      clearError("object-prefix");
      clearError("subject-suffix");
      const rawVerb = String(verb || "");
      const parseInputVerb = rawVerb;
      const rawVerbTiMetadata = targetObject.getRawInputTiCausativeMetadata(parseInputVerb);
      const invalidCharacters = targetObject.getInvalidVerbCharacters(parseInputVerb);
      const invalidLetters = targetObject.getInvalidVerbLetters(parseInputVerb);
      const invalidStructure = targetObject.getInvalidVerbStructure(parseInputVerb, {
        expectRegexEnvelope: false
      });
      if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidStructure ? targetObject.getInvalidVerbStructureMessage(invalidStructure, {
          expectRegexEnvelope: false
        }) : invalidList ? `El verbo contiene letras invalidas: ${invalidList}` : "El verbo contiene letras invalidas.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      }
      const preParsedVerb = override?.parsedVerb;
      const shouldReusePreParsed = targetObject.canReusePreParsedVerb({
        parsedVerb: preParsedVerb,
        rawVerb: parseInputVerb
      });
      const parsedVerb = shouldReusePreParsed ? {
        ...preParsedVerb
      } : targetObject.parseVerbInput(parseInputVerb);
      parsedVerb.derivationType = resolvedDerivationType;
      parsedVerb.derivationValencyDelta = derivationValencyDelta;
      parsedVerb.tiCausativeClass = parsedVerb.tiCausativeClass || rawVerbTiMetadata.tiCausativeClass || targetObject.normalizeTiCausativeClass(targetObject.getComposerActiveTiCausativeClass()) || "";
      verb = parsedVerb.verb;
      const renderVerb = parsedVerb.displayVerb;
      let analysisVerb = parsedVerb.analysisVerb;
      const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
      let indirectObjectMarker = parsedVerb.indirectObjectMarker;
      if (override && Object.prototype.hasOwnProperty.call(override, "indirectObjectMarker")) {
        indirectObjectMarker = override.indirectObjectMarker || "";
      }
      let thirdObjectMarker = "";
      if (override && Object.prototype.hasOwnProperty.call(override, "thirdObjectMarker")) {
        thirdObjectMarker = override.thirdObjectMarker || "";
      }
      ({
        objectPrefix,
        baseObjectPrefix
      } = targetObject.applyBoundMarkerPrefixOverrides(parsedVerb, objectPrefix, baseObjectPrefix, {
        preserveOccupiedSourceObjectPrefix: isNominalOutputProfile
      }));
      if (parsedVerb.hasImpersonalTaPrefix) {
        objectPrefix = "";
        baseObjectPrefix = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      ({
        objectPrefix,
        indirectObjectMarker
      } = targetObject.resolveValencePositionPrefixes({
        objectPrefix,
        indirectObjectMarker,
        derivationType: resolvedDerivationType
      }));
      if (isTroncoNajActiveWrapperTense) {
        objectPrefix = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      baseObjectPrefix = objectPrefix;
      const sourceValency = targetObject.getActiveVerbValency(parsedVerb);
      const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
      const validationVerb = verb;
      const hasObjectSelection = Boolean(objectPrefix || indirectObjectMarker || thirdObjectMarker);
      const allowIntransitiveSuppletiveContext = targetObject.isSuppletiveIntransitiveOnlyContext(parsedVerb, {
        hasObjectSelection
      });
      let isYawi = parsedVerb.isYawi === true && allowIntransitiveSuppletiveContext;
      const isWeya = parsedVerb.isWeya === true && allowIntransitiveSuppletiveContext;
      isReflexive = objectPrefix === "mu";
      const directionalPrefix = parsedVerb.directionalPrefix;
      const rawSuppletivePath = targetObject.getSuppletiveStemPath(parsedVerb);
      const suppletivePath = rawSuppletivePath && targetObject.isIntransitiveOnlySuppletiveId(rawSuppletivePath.id) && !allowIntransitiveSuppletiveContext ? null : rawSuppletivePath;
      let suppletiveStemSet = suppletivePath?.stemSet || null;
      const isYawiSuppletive = suppletivePath?.id === "yawi";
      const yawiPrefix = isYawiSuppletive && analysisVerb && verb.endsWith(analysisVerb) ? verb.slice(0, -analysisVerb.length) : "";
      const applyYawiPrefix = form => yawiPrefix ? `${yawiPrefix}${form}` : form;
      if (suppletiveStemSet && isYawiSuppletive && yawiPrefix) {
        suppletiveStemSet = targetObject.applySuppletiveYawiPrefixToStemSet(suppletiveStemSet, applyYawiPrefix);
      }
      const suppletiveTenseSuffixes = suppletivePath?.tenseSuffixOverrides || null;
      const suppletiveVerbOverrides = suppletivePath?.verbOverrides || null;
      const suppletiveNonactiveTenses = suppletivePath?.nonactiveTenses || null;
      const yawiPresentLongPrefixed = applyYawiPrefix(yawiPresentLong);
      const yawiPresentShortPrefixed = applyYawiPrefix(yawiPresentShort);
      const yawiHabitualPrefixed = applyYawiPrefix(yawiHabitual);
      const yawiLegacyLongPrefixed = applyYawiPrefix(yawiLegacyLong);
      const yawiLegacyShortPrefixed = applyYawiPrefix(yawiLegacyShort);
      const yawiYuVariantPrefixed = applyYawiPrefix(yawiYuVariant);
      if (suppletiveStemSet?.imperfective && !targetObject.isPerfectiveTense(tense)) {
        verb = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
      }
      const isPotencialHabitualNominalProfile = targetObject.isPotencialHabitualTense(tense) && resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPotencialHabitualNominalNonactive = isPotencialHabitualNominalProfile;
      const isPassiveImpersonalMode = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedVoiceMode === targetObject.VOICE_MODE.passive || isPotencialHabitualNominalNonactive;
      const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
      let preserveSubjectForPassive = preservePassiveSubject;
      const valencySummary = targetObject.getVerbValencySummary(parsedVerb);
      const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
      const hasPromotableObject = targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix) || fusionPrefixes.some(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix)) || hasOpenObjectSlot;
      const hasSubjectValent = !isPassiveImpersonalMode || targetValency > 0 && hasPromotableObject;
      const shouldDelayPretAllomorphy = targetObject.shouldDelaySlashSupportiveIAllomorphyForPret({
        parsedVerb,
        tense,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker
      });
      const allomorphyResult = shouldDelayPretAllomorphy ? {
        verb,
        analysisVerb,
        morphologyObjectPrefix: objectPrefix
      } : targetObject.applyObjectAllomorphy({
        verb,
        analysisVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isPassiveImpersonalMode,
        ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
      });
      verb = allomorphyResult.verb;
      analysisVerb = allomorphyResult.analysisVerb;
      let morphologyObjectPrefix = allomorphyResult.morphologyObjectPrefix;
      if (!silent) {
        const resolvedComposerDisplayValue = targetObject.isVerbInputModeComposer() ? targetObject.resolveVerbInputSource(verbInputValue || rawVerb, {
          mode: targetObject.VERB_INPUT_MODE.composer
        }).displayValue : "";
        const nextVerbInputValue = targetObject.isVerbInputModeComposer() ? resolvedComposerDisplayValue || rawVerb : targetObject.serializeRegexInputValue(parseInputVerb) || parseInputVerb;
        onVerbInputSync({
          nextVerbInputValue
        });
      }
      const isNonactive = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive || isPotencialHabitualNominalNonactive;
      if (isNonactive && targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        tense = targetObject.getCurrentResolvedConjugationSelectionState({
          tenseMode: resolvedTenseMode
        }).tenseValue;
      }
      const resolvedDirectionalRuleMode = targetObject.resolveDirectionalRuleMode(parsedVerb, {
        isNonactive,
        derivationType: resolvedDerivationType
      });
      const getCurrentDerivationOptions = (overrides = {}) => {
        const optionVerb = overrides.verb ?? verb;
        const optionAnalysisVerb = overrides.analysisVerb ?? analysisVerb;
        const optionIsYawi = overrides.isYawi ?? isYawi;
        const optionSuppletiveStemSet = overrides.suppletiveStemSet ?? suppletiveStemSet;
        const reducedPotencialHabitualSource = targetObject.resolvePotencialHabitualReducedNonactiveSource({
          parsedVerb,
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          objectPrefix,
          tense,
          tenseMode: resolvedTenseMode,
          derivationMode: resolvedDerivationMode
        });
        return targetObject.buildNonactiveDerivationOptions({
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          objectPrefix,
          parsedVerb,
          directionalPrefix,
          isYawi: optionIsYawi,
          suppletiveStemSet: optionSuppletiveStemSet,
          tense,
          tenseMode: resolvedTenseMode,
          derivationMode: resolvedDerivationMode,
          preferredNonactiveBaseVerb: reducedPotencialHabitualSource?.preferredNonactiveBaseVerb || "",
          preferredNonactiveSourceMeta: reducedPotencialHabitualSource?.preferredNonactiveSourceMeta || null,
          preferredNonactiveSourcePrefix: reducedPotencialHabitualSource?.preferredNonactiveSourcePrefix || ""
        });
      };
      const forwardDerivations = targetObject.applyGenerateForwardDerivations({
        resolvedDerivationType,
        buildDerivationOptions: ({
          verb,
          analysisVerb,
          isYawi,
          suppletiveStemSet
        }) => ({
          ...getCurrentDerivationOptions({
            verb,
            analysisVerb,
            isYawi,
            suppletiveStemSet
          }),
          causativeSubtype: targetObject.getActiveCausativeSubtype()
        }),
        silent,
        renderVerb,
        baseObjectPrefix,
        tense,
        isReflexive,
        initialState: {
          verb,
          analysisVerb,
          isYawi,
          suppletiveStemSet
        }
      });
      if (forwardDerivations.noStemMask) {
        return forwardDerivations.noStemMask;
      }
      ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = forwardDerivations);
      let causativeAllStems = forwardDerivations.causativeAllStems;
      let applicativeAllStems = forwardDerivations.applicativeAllStems;
      let causativeAllStemSpecs = forwardDerivations.causativeAllStemSpecs || null;
      let applicativeAllStemSpecs = forwardDerivations.applicativeAllStemSpecs || null;
      const forwardStemProvenance = !isNonactive && resolvedDerivationType === targetObject.DERIVATION_TYPE.causative && forwardDerivations.causativeSelectionMeta ? targetObject.buildForwardDerivationProvenance({
        sourceVerb: renderVerb,
        analysisTarget: analysisVerb,
        tense,
        derivationType: resolvedDerivationType,
        isTransitive: targetObject.getBaseObjectSlots(parsedVerb) > 0,
        selectedMeta: forwardDerivations.causativeSelectionMeta
      }) : null;
      const nonactiveDerivation = targetObject.applyNonactiveDerivationFromOptions({
        isNonactive,
        derivationType: resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: getCurrentDerivationOptions()
      });
      ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = targetObject.extractForwardDerivationState(nonactiveDerivation, {
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      }));
      let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
      let nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs) ? nonactiveDerivation.nonactiveAllStemSpecs : null;
      ({
        objectPrefix,
        morphologyObjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isReflexive
      } = targetObject.applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        objectPrefix,
        morphologyObjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isReflexive
      }));
      const passiveValencyAdjustments = targetObject.applyPassiveImpersonalValencyAdjustments({
        isPassiveImpersonalMode,
        verb,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObjectPrefix,
        hasPromotableObject
      });
      verb = passiveValencyAdjustments.verb;
      analysisVerb = passiveValencyAdjustments.analysisVerb;
      subjectPrefix = passiveValencyAdjustments.subjectPrefix;
      subjectSuffix = passiveValencyAdjustments.subjectSuffix;
      objectPrefix = passiveValencyAdjustments.objectPrefix;
      indirectObjectMarker = passiveValencyAdjustments.indirectObjectMarker;
      thirdObjectMarker = passiveValencyAdjustments.thirdObjectMarker;
      preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
      morphologyObjectPrefix = passiveValencyAdjustments.morphologyObjectPrefix;
      const shouldApplyDerivedAllomorphy = !!targetObject.getForwardDerivationConfig(resolvedDerivationType);
      if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = targetObject.applyObjectAllomorphy({
          verb,
          analysisVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix: morphologyObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          isPassiveImpersonalMode,
          ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
        });
        verb = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
      }
      const isWitziNonactive = isNonactive && suppletivePath?.id === "witzi";
      const isWitzInput = validationVerb === "witz";
      const allowConsonantEnding = isWitzInput;
      if (isNonactive && resolvedTenseMode === targetObject.TENSE_MODE.verbo && suppletiveNonactiveTenses && !suppletiveNonactiveTenses.has(tense)) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
      }
      if (!isNonactive && suppletiveVerbOverrides && Object.prototype.hasOwnProperty.call(suppletiveVerbOverrides, tense)) {
        const overrideVerb = suppletiveVerbOverrides[tense];
        verb = overrideVerb;
        analysisVerb = overrideVerb;
      }
      if (!isNonactive && resolvedTenseMode === targetObject.TENSE_MODE.verbo && suppletivePath?.activeTenses && !suppletivePath.activeTenses.has(tense)) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
      }
      isYawiImperativeSingular = isYawi && tense === "imperativo" && subjectSuffix === "";
      shouldAddYuVariant = isYawi && (tense === "presente" || isYawiImperativeSingular);
      if (validationVerb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      if (!targetObject.VOWEL_RE.test(validationVerb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      const authoritativeDerivationalRawInputSource = targetObject.getAuthoritativeDerivationalSourceForRawInputGate({
        tense,
        patientivoSource
      });
      const shouldBypassGenericRawInputGates = Boolean(authoritativeDerivationalRawInputSource);
      if (!targetObject.VOWEL_END_RE.test(validationVerb) && !allowConsonantEnding && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
          return {
            result: "—",
            error: true,
            isReflexive
          };
        }
        const message = "El verbo debe terminar en vocal.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      const stemGate = targetObject.evaluateVerbStemInputGate(rawVerb, parsedVerb);
      if (!stemGate.isValid && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
          return {
            result: "—",
            error: true,
            isReflexive
          };
        }
        const message = "El segmento final del verbo no cumple un patrón silábico válido.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      if (isYawi && (tense === "presente" || isYawiImperativeSingular)) {
        const useLongYawiSlot = subjectSuffix === "t" || subjectPrefix === "";
        if (useLongYawiSlot) {
          verb = yawiPresentLongPrefixed;
        } else {
          verb = yawiPresentShortPrefixed;
        }
      }
      if (isYawi && (tense === "presente-habitual" || tense === "agentivo" || tense === "potencial-habitual")) {
        verb = yawiHabitualPrefixed;
      }
      ({
        subjectPrefix,
        subjectSuffix
      } = targetObject.resetSubjectForNounTenses(tense, override, subjectPrefix, subjectSuffix));
      const isPassiveImpersonal = isPassiveImpersonalMode;
      if (isPassiveImpersonal) {
        const passiveOverrides = targetObject.applyPassiveImpersonalOverrides({
          subjectPrefix,
          subjectSuffix,
          objectPrefix,
          analysisVerb,
          preserveSubjectForPassive,
          allowPassiveObject
        });
        subjectPrefix = passiveOverrides.subjectPrefix;
        subjectSuffix = passiveOverrides.subjectSuffix;
        objectPrefix = passiveOverrides.objectPrefix;
        morphologyObjectPrefix = passiveOverrides.morphologyObjectPrefix;
      }
      const allowReflexiveAutoSwitch = !indirectObjectMarker && !thirdObjectMarker || resolvedDerivationType === targetObject.DERIVATION_TYPE.applicative;
      const reflexiveUpdate = allowReflexiveAutoSwitch ? targetObject.applyReflexiveAutoSwitch({
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        isPassiveImpersonal,
        clearError
      }) : {
        objectPrefix,
        isReflexive: objectPrefix === "mu"
      };
      objectPrefix = reflexiveUpdate.objectPrefix;
      isReflexive = reflexiveUpdate.isReflexive;
      const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
      const isNounTense = targetObject.isNonanimateNounTense(tense) || targetObject.isPotencialProfileTense(tense) || isPatientivoAdjectiveProfile || tense === "agentivo" || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
      const invalidComboObjectPrefix = targetObject.resolveComboValidationObjectPrefix({
        objectPrefix,
        indirectObjectMarker,
        derivationType: resolvedDerivationType
      });
      if (!skipValidation && !isNounTense && targetObject.INVALID_COMBINATION_KEYS.has(targetObject.getComboKey(subjectPrefix, invalidComboObjectPrefix, subjectSuffix))) {
        const message = "Combinacion inválida";
        const error = returnIfError(message, ["subject-prefix", "object-prefix", "subject-suffix"]);
        if (error) return error;
      }
      clearError("object-prefix");
      if (isNounTense) {
        if (targetObject.isNonanimateNounTense(tense) && !targetObject.isNonanimateSubject(subjectPrefix, subjectSuffix)) {
          const message = "Solo 3a persona no animada (singular o plural).";
          const error = returnIfError(message, ["subject-prefix", "subject-suffix"]);
          if (error) return error;
        }
        const isTransitiveVerb = targetObject.getBaseObjectSlots(parsedVerb) > 0;
        if ((tense === "patientivo" && patientivoSource === "tronco-verbal" || isPatientivoAdjectiveProfile && targetObject.getPatientivoAdjectiveSourceForTense(tense) === "tronco-verbal") && isTransitiveVerb && !objectPrefix) {
          objectPrefix = "ta";
          morphologyObjectPrefix = "ta";
        }
        if (resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && targetObject.isIntransitiveOnlyActiveAdjectiveTense(tense) && isTransitiveVerb) {
          if (skipValidation) {
            return {
              result: "—",
              error: true,
              isReflexive
            };
          }
          const error = returnIfError("Adjetivo activo solo para verbos intransitivos.", ["verb"]);
          if (error) return error;
        }
        const nounCombinedMode = resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        const slotPlanBundle = targetObject.getNounObjectSlotPlansFromMeta(parsedVerb, tense, {
          combinedMode: nounCombinedMode
        });
        const slotPlans = slotPlanBundle.slotPlans;
        const selectedBySlot = {
          object: objectPrefix || "",
          object2: indirectObjectMarker || "",
          object3: thirdObjectMarker || ""
        };
        const hasDerivedValencyIncrease = targetObject.getDerivationValencyDelta(resolvedDerivationType) > 0;
        const derivationLabel = targetObject.getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
        const derivedSlots = slotPlans.filter(slotPlan => slotPlan.isAddedSlot);
        const allowCollapsedDerivedSlot = targetObject.allowsCollapsedDerivedNounSlot({
          tenseValue: tense,
          combinedMode: nounCombinedMode,
          slotPlanBundle,
          derivationType: resolvedDerivationType
        });
        if (hasDerivedValencyIncrease && !derivedSlots.length && !allowCollapsedDerivedSlot) {
          const error = returnIfError(`La derivación ${derivationLabel} no tiene espacio para prefijo no específico (ta/te/mu).`, ["object-prefix"]);
          if (error) return error;
        }
        const overflowedSlot = targetObject.NOUN_OBJECT_SLOT_SCHEMA.slice(slotPlans.length).find(slotMeta => Boolean(selectedBySlot[slotMeta.id]));
        if (overflowedSlot) {
          const derivationLabel = targetObject.getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
          const error = returnIfError(`La derivación ${derivationLabel} no tiene espacio para marcadores de valencia adicionales.`, ["object-prefix"]);
          if (error) return error;
        }
        const invalidSlotPlan = slotPlans.find(slotPlan => !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || ""));
        if (invalidSlotPlan) {
          if (invalidSlotPlan.id !== "object") {
            const slotNumber = Number.isFinite(invalidSlotPlan.index) ? invalidSlotPlan.index + 1 : 2;
            const error = returnIfError(`Derivación ${derivationLabel} nominal requiere ta/te/mu en objeto ${slotNumber}.`, ["object-prefix"]);
            if (error) return error;
          }
          if (isCalificativoInstrumentivo) {
            if (isTransitiveVerb && slotPlans.length > 0) {
              const error = returnIfError("Calificativo transitivo solo con ta/te/mu.", ["object-prefix"]);
              if (error) return error;
            } else {
              const error = returnIfError("Calificativo intransitivo va sin prefijo.", ["object-prefix"]);
              if (error) return error;
            }
          }
          const primaryUsesDerivedSlot = slotPlans[0]?.isAddedSlot === true;
          const transitiveMessage = (() => {
            if (hasDerivedValencyIncrease && primaryUsesDerivedSlot) {
              return `Derivación ${derivationLabel} nominal transitiva solo con ta/te/mu.`;
            }
            switch (tense) {
              case "agentivo":
                return "Agentivo transitivo solo con ta/te/mu.";
              case "patientivo":
                return "Patientivo transitivo solo con ta/te/mu o Ø.";
              case "instrumentivo":
                return "Instrumentivo transitivo solo con ta/te/mu o Ø.";
              case "potencial":
                return "Potencial transitivo solo con Ø.";
              case "adjetivo-preterito":
              case "adjetivo-perfecto":
              case "adjetivo-preterito-tik":
              case "adjetivo-perfecto-tik":
              case "adjetivo-preterito-naj":
              case "adjetivo-perfecto-naj":
                return "Adjetivo activo solo para verbos intransitivos.";
              case "adjetivo-patientivo-no-activo":
              case "adjetivo-patientivo-perfectivo":
                return "Adjetivo patientivo transitivo solo con ta/te/mu o Ø.";
              case "potencial-habitual":
                return "Adjetivo no activo transitivo solo con ta/te/mu.";
              case "pasado-remoto-adverbio-activo":
                return "Adverbio activo transitivo solo con ta/te/mu.";
              case "sustantivo-verbal":
                return "Sustantivo verbal transitivo solo con ta/te/mu.";
              default:
                return "Sustantivo verbal transitivo solo con ta/te/mu.";
            }
          })();
          const intransitiveMessage = (() => {
            switch (tense) {
              case "agentivo":
                return "Agentivo intransitivo va sin prefijo.";
              case "patientivo":
                return "Patientivo intransitivo va sin prefijo.";
              case "instrumentivo":
                return "Instrumentivo intransitivo va sin prefijo.";
              case "potencial":
                return "Potencial intransitivo va sin prefijo.";
              case "adjetivo-preterito":
              case "adjetivo-perfecto":
              case "adjetivo-preterito-tik":
              case "adjetivo-perfecto-tik":
              case "adjetivo-preterito-naj":
              case "adjetivo-perfecto-naj":
                return "Adjetivo activo solo para verbos intransitivos.";
              case "adjetivo-patientivo-no-activo":
              case "adjetivo-patientivo-perfectivo":
                return "Adjetivo patientivo intransitivo va sin prefijo.";
              case "potencial-habitual":
                return "Adjetivo no activo intransitivo va sin prefijo.";
              case "pasado-remoto-adverbio-activo":
                return "Adverbio activo intransitivo va sin prefijo.";
              default:
                return "Sustantivo verbal intransitivo va sin prefijo.";
            }
          })();
          if (isTransitiveVerb && slotPlans.length > 0) {
            const error = returnIfError(transitiveMessage, ["object-prefix"]);
            if (error) return error;
          }
          const error = returnIfError(intransitiveMessage, ["object-prefix"]);
          if (error) return error;
        }
        if (slotPlans.length >= 3 && !targetObject.isValidValence4Combo({
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker
        })) {
          const error = returnIfError("Combinación de objetos no permitida para valencia nominal 4.", ["object-prefix"]);
          if (error) return error;
        }
        if (!slotPlans.length) {
          const hasUnexpectedObjectMarker = Boolean(selectedBySlot.object || selectedBySlot.object2 || selectedBySlot.object3);
          if (hasUnexpectedObjectMarker) {
            const intransitiveMessage = (() => {
              switch (tense) {
                case "agentivo":
                  return "Agentivo intransitivo va sin prefijo.";
                case "patientivo":
                  return "Patientivo intransitivo va sin prefijo.";
                case "instrumentivo":
                  return "Instrumentivo intransitivo va sin prefijo.";
                case "potencial":
                  return "Potencial intransitivo va sin prefijo.";
                case "adjetivo-preterito":
                case "adjetivo-perfecto":
                case "adjetivo-preterito-tik":
                case "adjetivo-perfecto-tik":
                case "adjetivo-preterito-naj":
                case "adjetivo-perfecto-naj":
                  return "Adjetivo activo solo para verbos intransitivos.";
                case "adjetivo-patientivo-no-activo":
                case "adjetivo-patientivo-perfectivo":
                  return "Adjetivo patientivo intransitivo va sin prefijo.";
                case "potencial-habitual":
                  return "Adjetivo no activo intransitivo va sin prefijo.";
                case "pasado-remoto-adverbio-activo":
                  return "Adverbio activo intransitivo va sin prefijo.";
                default:
                  return "Sustantivo verbal intransitivo va sin prefijo.";
              }
            })();
            const error = returnIfError(intransitiveMessage, ["object-prefix"]);
            if (error) return error;
          }
        }
      }
      if (isWitziNonactive && tense === "preterito" && subjectSuffix === "t") {
        subjectSuffix = "et";
      }
      const skipPretClass = isWitziNonactive && targetObject.SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);
      const isUnderlyingTransitive = !isNonactive ? resolvedDerivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.isMarkedTransitive || parsedVerb.isTaFusion : Boolean(morphologyObjectPrefix || indirectObjectMarker || thirdObjectMarker || parsedVerb.isTaFusion);
      const forceTransitiveBase = parsedVerb.isTaFusion || isUnderlyingTransitive;
      if (!silent) {
        onVerbAnalysisResolved({
          verb,
          analysisVerb,
          analysisExactVerb,
          morphologyObjectPrefix,
          forceTransitiveBase,
          isYawi,
          isWeya,
          resolvedDerivationType,
          parsedVerb,
          renderVerb
        });
      }
      const baseMorphologyInput = {
        subjectPrefix,
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        rawVerb,
        sourceRawVerb: parsedVerb.sourceRawVerb,
        analysisExactVerb,
        verbMeta: parsedVerb,
        isYawi,
        isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        suppletiveStemSet,
        suppletiveTenseSuffixes,
        ...targetObject.buildMorphologyMetaOptions(parsedVerb, {
          hasDoubleDash: parsedVerb.hasDoubleDash,
          indirectObjectMarker,
          isUnderlyingTransitive
        }),
        thirdObjectMarker,
        skipPretClass,
        hasSubjectValent,
        boundPrefix: parsedVerb.hasBoundMarker ? parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || (parsedVerb.boundPrefixes || []).join("") : "",
        embeddedPrefix: targetObject.getEmbeddedVerbPrefix(parsedVerb),
        boundPrefixes: Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes.slice() : [],
        boundExplicitFlags: Array.isArray(parsedVerb.boundExplicitFlags) ? parsedVerb.boundExplicitFlags.slice() : [],
        directionalPrefixFromSlash: parsedVerb.directionalPrefixFromSlash || parsedVerb.canonical?.directionalPrefixFromSlash || "",
        sourceSplitPrefix: parsedVerb.hasBoundMarker ? parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || "" : "",
        sourceCompositeBase: parsedVerb.canonical?.slashCompositeRuleBase || "",
        verbSegment: parsedVerb.verbSegment || "",
        patientivoOwnership: override?.patientivoOwnership ?? targetObject.DEFAULT_PATIENTIVO_OWNERSHIP,
        patientivoSource,
        patientivoNominalSuffix,
        possessivePrefix,
        combinedMode: isNonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        instrumentivoMode: possessivePrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo,
        derivationType: resolvedDerivationType,
        isNonactiveMode: isNonactive,
        stemProvenanceSeed: forwardStemProvenance
      };
      appliedMorphology = targetObject.applyMorphologyRules(baseMorphologyInput);
      if (appliedMorphology?.error) {
        return {
          error: true
        };
      }
      ({
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb
      } = appliedMorphology);
      const isPatientivoPossessed = tense === "patientivo" && Boolean(possessivePrefix);
      if (isPatientivoPossessed) {
        subjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(subjectSuffix, true, patientivoOwnership, {
          stem: verb
        });
        if (subjectSuffix === null) {
          return {
            error: true
          };
        }
      }
      primaryFormSpec = appliedMorphology.formSpec || (isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix) : null);
      if (isNominalOutputProfile && isPatientivoPossessed) {
        primaryFormSpec = targetObject.withNominalFormSpecSuffix(primaryFormSpec, subjectSuffix, {
          verb,
          subjectSuffix
        });
      }
      const alternateForms = (appliedMorphology.alternateForms || []).map(form => {
        if (!form) {
          return form;
        }
        if (!isPatientivoPossessed) {
          return isNominalOutputProfile ? targetObject.normalizeNominalFormEntry(form, {
            subjectSuffix
          }) : form;
        }
        const adjustedSubjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(form.subjectSuffix ?? subjectSuffix, true, patientivoOwnership, {
          stem: form.verb
        });
        return {
          ...form,
          subjectSuffix: adjustedSubjectSuffix,
          formSpec: isNominalOutputProfile ? targetObject.withNominalFormSpecSuffix(form.formSpec || null, adjustedSubjectSuffix, {
            verb: form.verb,
            subjectSuffix: adjustedSubjectSuffix
          }) : form.formSpec
        };
      }).filter(form => form && form.subjectSuffix !== null);
      const stemProvenance = appliedMorphology.stemProvenance || null;
      let forms = [];
      const embeddedPrefix = targetObject.getEmbeddedVerbPrefix(parsedVerb);
      const stemMorphologyArgs = {
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
      };
      const stemCollectionPool = targetObject.resolveStemCollectionPool({
        isNonactive,
        nonactiveAllStems,
        nonactiveAllStemSpecs,
        resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        causativeAllStemSpecs,
        applicativeAllStemSpecs
      });
      if (Array.isArray(stemCollectionPool) && stemCollectionPool.length > 1) {
        stemCollectionPool.forEach(stemCandidate => {
          const morphResult = targetObject.resolveStemCandidateMorphologyResult({
            stemCandidate,
            ...stemMorphologyArgs
          });
          if (!morphResult) {
            return;
          }
          const baseText = buildWordFromParts({
            subjectPrefix: morphResult.subjectPrefix,
            objectPrefix: morphResult.objectPrefix,
            subjectSuffix: morphResult.subjectSuffix,
            verb: morphResult.verb,
            formSpec: morphResult.formSpec,
            trailingSuffix: morphResult.trailingSuffix || "",
            isYawiImperative: morphResult.isYawiImperative,
            directionalChainMeta: morphResult.directionalChainMeta,
            surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta)
          });
          if (baseText && !forms.includes(baseText)) {
            forms.push(baseText);
          }
          morphResult.alternateForms.forEach(form => {
            if (!form || !form.verb) {
              return;
            }
            const altText = buildWordFromParts({
              subjectPrefix: morphResult.subjectPrefix,
              objectPrefix: form.surfaceObjectPrefix ?? morphResult.objectPrefix,
              subjectSuffix: form.subjectSuffix,
              verb: form.verb,
              formSpec: form.formSpec,
              trailingSuffix: form.trailingSuffix || "",
              isYawiImperative: morphResult.isYawiImperative,
              directionalChainMeta: morphResult.directionalChainMeta,
              surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta, form.surfaceRuleMeta)
            });
            if (altText && !forms.includes(altText)) {
              forms.push(altText);
            }
          });
        });
      } else {
        const baseText = buildWord();
        forms.push(baseText);
        alternateForms.forEach(form => {
          if (!form || !form.verb) {
            return;
          }
          const altText = buildWordFromParts({
            subjectPrefix,
            objectPrefix: form.surfaceObjectPrefix ?? objectPrefix,
            subjectSuffix: form.subjectSuffix ?? subjectSuffix,
            verb: form.verb,
            formSpec: form.formSpec || null,
            trailingSuffix: form.trailingSuffix || "",
            directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
            surfaceRuleMeta: mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta, form.surfaceRuleMeta),
            isYawiImperative: isYawiImperativeSingular
          });
          if (!forms.includes(altText)) {
            forms.push(altText);
          }
        });
      }
      if (isYawi && tense === "presente" && directionalPrefix !== "wal") {
        const useLongYawiSlot = subjectSuffix === "t" || subjectPrefix === "";
        const legacyYawiForm = useLongYawiSlot ? yawiLegacyLongPrefixed : yawiLegacyShortPrefixed;
        const legacyText = buildWord(legacyYawiForm, subjectSuffix);
        if (legacyText && !forms.includes(legacyText)) {
          forms.push(legacyText);
        }
      }
      if (shouldAddYuVariant && (verb === yawiPresentShortPrefixed || verb === yawiPresentLongPrefixed)) {
        const yuText = buildWord(yawiYuVariantPrefixed);
        if (!forms.includes(yuText)) {
          forms.push(yuText);
        }
      }
      const generatedText = forms.join(" / ");
      if (!silent) {
        onComplete({
          generatedText,
          parsedVerb,
          stemProvenance,
          tense,
          renderVerb,
          baseObjectPrefix
        });
      }
      return {
        result: generatedText,
        surfaceForms: forms,
        isReflexive,
        stemProvenance
      };
    }

    const api = {};
    Object.defineProperty(api, "GENERATE_WORD_NOOP", {
        configurable: true,
        enumerable: true,
        get() { return GENERATE_WORD_NOOP; },
    });
    api.resolveGenerateWordUiHook = resolveGenerateWordUiHook;
    api.executeGenerateWordRequest = executeGenerateWordRequest;
    return api;
}

export function installGenerationEngineGlobals(targetObject = globalThis) {
    const api = createGenerationEngineApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
