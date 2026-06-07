// Native wrapper generated from src/core/generation/morphology_engine.js.

export function createMorphologyEngineApi(targetObject = globalThis) {
    // core/generation/morphology_engine.js
    // Shared morphology engine.
    // Global-scope module: all functions defined directly on the global object.
    // Deps (resolved at call time): all globals and functions in global scope from
    // script.js and other extracted modules.

    function buildTroncoActivePatientivoCoreForms({
      wrapperProfile = "tik",
      sourceTense = "",
      sourceCandidates = [],
      subjectSuffix = "",
      exactAnalysisVerb = "",
      isTransitive = false,
      directionalPrefix = "",
      boundPrefix = "",
      boundPrefixes = [],
      boundExplicitFlags = [],
      directionalPrefixFromSlash = "",
      sourceSplitPrefix = "",
      sourcePrefix = "",
      sourceBase = "",
      sourceCompositeBase = "",
      hasImpersonalTaPrefix = false,
      hasOptionalSupportiveI = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false
    } = {}) {
      if (sourceTense !== "preterito" && sourceTense !== "perfecto") {
        return [];
      }
      const sourceSubjectSuffix = (() => {
        if (sourceTense === "preterito") {
          return subjectSuffix === "t" ? "ket" : "k";
        }
        const resolved = targetObject.applyTenseSuffixRules(sourceTense, subjectSuffix);
        return typeof resolved === "string" ? resolved : "";
      })();
      const forms = [];
      const seen = new Set();
      const addForm = (core = "", suffix = "") => {
        const normalizedCore = String(core || "").trim();
        if (!normalizedCore) {
          return;
        }
        const normalizedSuffix = String(suffix || "");
        const key = `${normalizedCore}|${normalizedSuffix}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        forms.push({
          verb: normalizedCore,
          subjectSuffix: normalizedSuffix
        });
      };
      const buildEntrySurface = entry => targetObject.buildNominalOutputText({
        verb: entry?.verb || "",
        subjectSuffix: entry?.subjectSuffix || ""
      });
      const isKStemEntry = entry => targetObject.normalizeRuleBase(entry?.verb || "").endsWith("k");
      (Array.isArray(sourceCandidates) ? sourceCandidates : []).forEach(candidate => {
        const sourceVerb = String(candidate?.verb || "").trim();
        if (!sourceVerb) {
          return;
        }
        const sourceAnalysis = String(candidate?.analysisVerb || "").trim() || (directionalPrefix ? targetObject.stripDirectionalPrefixFromStem(sourceVerb, directionalPrefix) : sourceVerb);
        const candidateSourceBase = sourceBase || exactAnalysisVerb || sourceAnalysis || sourceVerb;
        const troncoDerivations = targetObject.buildPatientivoTroncoDerivations({
          verb: sourceVerb,
          analysisVerb: sourceAnalysis || sourceVerb,
          rawAnalysisVerb: sourceAnalysis || sourceVerb,
          isTransitive,
          directionalPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix,
          sourcePrefix,
          sourceBase: candidateSourceBase,
          sourceCompositeBase,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker
        });
        const expandedEntries = targetObject.expandPatientivoNominalMarkerOptions(troncoDerivations, "tronco-verbal");
        const zeroKEntry = expandedEntries.find(entry => isKStemEntry(entry) && String(entry?.subjectSuffix || "") === "");
        const tiKEntry = expandedEntries.find(entry => isKStemEntry(entry) && String(entry?.subjectSuffix || "") === "ti");
        if (sourceTense === "preterito") {
          const selectedEntry = zeroKEntry || tiKEntry;
          if (selectedEntry) {
            const wrapperSuffix = wrapperProfile === "naj" ? subjectSuffix === "t" ? "najket" : "naj" : `ti${sourceSubjectSuffix}`;
            addForm(selectedEntry.verb || buildEntrySurface(selectedEntry), wrapperSuffix);
          }
          return;
        }
        if (wrapperProfile === "naj") {
          const selectedEntry = zeroKEntry || tiKEntry;
          if (selectedEntry) {
            addForm(selectedEntry.verb || buildEntrySurface(selectedEntry), `naj${sourceSubjectSuffix}`);
          }
          return;
        }
        if (tiKEntry) {
          addForm(buildEntrySurface(tiKEntry), sourceSubjectSuffix);
          return;
        }
        if (zeroKEntry) {
          addForm(`${zeroKEntry.verb || buildEntrySurface(zeroKEntry)}ti`, sourceSubjectSuffix);
        }
      });
      return forms;
    }
    function buildPotencialActiveForms({
      tense = "",
      verb = "",
      subjectPrefix = "",
      objectPrefix = "",
      subjectSuffix = "",
      analysisVerb = "",
      rawAnalysisVerb = "",
      exactAnalysisVerb = "",
      isTransitive = false,
      isYawi = false,
      isWeya = false,
      directionalPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = "",
      baseObjectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      rootPlusYaBase = "",
      rootPlusYaBasePronounceable = "",
      suppletiveStemSet = null,
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = "",
      hasDoubleDash = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false,
      hasImpersonalTaPrefix = false,
      hasNonspecificValence = false,
      derivationType = "",
      forceTransitiveBase = false,
      boundPrefix = "",
      boundPrefixes = [],
      boundExplicitFlags = [],
      directionalPrefixFromSlash = "",
      sourceSplitPrefix = "",
      sourcePrefix = "",
      sourceBase = "",
      sourceCompositeBase = "",
      alternateForms = []
    } = {}) {
      const sourceTense = targetObject.getPotencialActiveSourceTense(tense);
      const isTroncoNajProfile = targetObject.isPotencialTroncoNajActiveTense(tense);
      const isTroncoTikProfile = targetObject.isPotencialTroncoActiveTense(tense) && !isTroncoNajProfile;
      const isTroncoPatientivoCoreProfile = isTroncoTikProfile || isTroncoNajProfile;
      const stripsProjectiveObjectForPotentialPatient = tense === "potencial";
      const wrapperObjectPrefix = stripsProjectiveObjectForPotentialPatient ? "" : baseObjectPrefix || "";
      const wrapperIndirectObjectMarker = stripsProjectiveObjectForPotentialPatient ? "" : targetObject.composeProjectiveObjectPrefix({
        objectPrefix: "",
        markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
        subjectPrefix: baseSubjectPrefix
      });
      const sourceSubjectSuffix = (() => {
        if (sourceTense === "preterito") {
          return subjectSuffix === "t" ? "ket" : "";
        }
        let resolved = targetObject.applyTenseSuffixRules(sourceTense, subjectSuffix);
        return typeof resolved === "string" ? resolved : "";
      })();
      const sourceCandidates = [];
      const seenCandidates = new Set();
      const stripPotentialPatientProjectivePrefixes = (stem = "", analysisStem = "") => {
        const objectlessSourceBase = targetObject.normalizeRuleBase(sourceBase || exactAnalysisVerb || "");
        if (objectlessSourceBase && objectlessSourceBase !== targetObject.normalizeRuleBase(stem)) {
          return objectlessSourceBase;
        }
        const analysis = String(analysisStem || "").trim();
        if (analysis && analysis !== stem) {
          return analysis;
        }
        const prefixes = [baseObjectPrefix, objectPrefix, indirectObjectMarker, thirdObjectMarker].filter((prefix, index, list) => prefix && list.indexOf(prefix) === index);
        return typeof targetObject.stripLeadingPrefixes === "function" ? targetObject.stripLeadingPrefixes(stem, prefixes) : stem;
      };
      const addCandidate = (candidateVerb = "", candidateAnalysis = "") => {
        const rawSourceVerb = String(candidateVerb || "").trim();
        if (!rawSourceVerb) {
          return;
        }
        const sourceAnalysis = String(candidateAnalysis || "").trim() || (directionalPrefix ? targetObject.stripDirectionalPrefixFromStem(rawSourceVerb, directionalPrefix) : rawSourceVerb);
        const sourceVerb = stripsProjectiveObjectForPotentialPatient ? stripPotentialPatientProjectivePrefixes(rawSourceVerb, sourceAnalysis) : rawSourceVerb;
        if (!sourceVerb) {
          return;
        }
        const key = `${sourceVerb}|${sourceAnalysis}`;
        if (seenCandidates.has(key)) {
          return;
        }
        seenCandidates.add(key);
        sourceCandidates.push({
          verb: sourceVerb,
          analysisVerb: sourceAnalysis || sourceVerb
        });
      };
      addCandidate(verb, analysisVerb || verb);
      (Array.isArray(alternateForms) ? alternateForms : []).forEach(form => {
        if (!form || !form.verb) {
          return;
        }
        const formVerb = String(form.verb || "").trim();
        addCandidate(formVerb, directionalPrefix ? targetObject.stripDirectionalPrefixFromStem(formVerb, directionalPrefix) : formVerb);
      });
      if (isTroncoPatientivoCoreProfile) {
        const patientivoTroncoForms = buildTroncoActivePatientivoCoreForms({
          wrapperProfile: isTroncoNajProfile ? "naj" : "tik",
          sourceTense,
          sourceCandidates,
          subjectSuffix,
          exactAnalysisVerb: exactAnalysisVerb || rawAnalysisVerb || analysisVerb || verb,
          isTransitive: (isTransitive || forceTransitiveBase) && !hasImpersonalTaPrefix,
          directionalPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker
        });
        if (patientivoTroncoForms.length) {
          return patientivoTroncoForms;
        }
      }
      const wrapperForms = [];
      const seenWrapperForms = new Set();
      const addWrapperForm = (formValue = "") => {
        const form = String(formValue || "").trim();
        if (!form || form === "—" || seenWrapperForms.has(form)) {
          return;
        }
        seenWrapperForms.add(form);
        wrapperForms.push(form);
      };
      const inputMatrixRoot = targetObject.normalizeRuleBase(exactAnalysisVerb || analysisVerb || verb);
      const isAdjectiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.adjetivo;
      sourceCandidates.forEach(candidate => {
        const candidateMatrix = targetObject.normalizeRuleBase(exactAnalysisVerb || candidate.analysisVerb || candidate.verb);
        const classPolicy = targetObject.resolveActiveAdjectiveClassPolicy({
          tenseValue: tense,
          sourceTense,
          isAdjectiveMode,
          hasSlashMarker,
          hasBoundMarker,
          inputMatrix: inputMatrixRoot,
          candidateMatrix
        });
        const classOutput = targetObject.buildClassBasedResultWithProvenance({
          verb: candidate.verb,
          subjectPrefix,
          objectPrefix: wrapperObjectPrefix,
          subjectSuffix: sourceTense === "preterito" ? subjectSuffix : sourceSubjectSuffix,
          tense: sourceTense,
          analysisVerb: candidate.analysisVerb || candidate.verb,
          exactBaseVerb: exactAnalysisVerb || candidate.analysisVerb || candidate.verb,
          classFilter: classPolicy.classFilter,
          allowAllClasses: false,
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
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          derivationType,
          directionalInputPrefix: directionalPrefix,
          directionalOutputPrefix,
          baseSubjectPrefix,
          baseObjectPrefix: wrapperObjectPrefix,
          suppletiveStemSet,
          forceTransitive: forceTransitiveBase,
          indirectObjectMarker: wrapperIndirectObjectMarker,
          hasDoubleDash,
          forceClassBSelection: classPolicy.forceClassBSelection
        });
        const candidateForms = targetObject.selectPreferredActiveAdjectiveForms(classOutput?.forms || [], {
          sourceVerb: candidate.analysisVerb || candidate.verb,
          sourceTense,
          selectionMode: classPolicy.preferredFinalYaSurfaceMode,
          isYawi,
          isWeya
        });
        candidateForms.forEach(form => addWrapperForm(form));
      });
      if (!wrapperForms.length) {
        return [];
      }
      const splitTroncoTikForm = (formValue = "") => {
        const form = String(formValue || "").trim();
        if (!form) {
          return {
            verb: "",
            subjectSuffix: ""
          };
        }
        if (sourceTense === "perfecto" && form.endsWith("tuk")) {
          return {
            verb: form.slice(0, -3),
            subjectSuffix: sourceSubjectSuffix
          };
        }
        if (sourceTense === "preterito" && form.endsWith("k")) {
          return {
            verb: form.slice(0, -1),
            subjectSuffix: subjectSuffix === "t" ? "ket" : "k"
          };
        }
        return {
          verb: form,
          subjectSuffix: sourceTense === "preterito" ? subjectSuffix === "t" ? "ket" : "k" : sourceSubjectSuffix
        };
      };
      return wrapperForms.map(form => isTroncoTikProfile ? splitTroncoTikForm(form) : {
        verb: form,
        subjectSuffix: ""
      }).filter(entry => entry.verb);
    }
    function applyMorphologyRules({
      subjectPrefix,
      objectPrefix,
      subjectSuffix,
      verb,
      tense,
      analysisVerb,
      rawAnalysisVerb,
      rawVerb = "",
      sourceRawVerb = "",
      analysisExactVerb,
      verbMeta = null,
      isYawi,
      isWeya,
      directionalPrefix,
      directionalRuleMode = "",
      suppletiveStemSet,
      suppletiveTenseSuffixes = null,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasDoubleDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false,
      hasImpersonalTaPrefix = false,
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = "",
      hasNonspecificValence = false,
      isTaFusion = false,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      skipPretClass = false,
      isUnderlyingTransitive = false,
      hasSubjectValent = true,
      boundPrefix = "",
      embeddedPrefix = "",
      boundPrefixes = [],
      boundExplicitFlags = [],
      directionalPrefixFromSlash = "",
      sourceSplitPrefix = "",
      sourcePrefix = "",
      sourceBase = "",
      sourceCompositeBase = "",
      verbSegment = "",
      isNounContext = false,
      patientivoSource = "nonactive",
      patientivoNominalSuffix = null,
      passivePatientivoSelectedProjectiveObjectPrefix = "",
      possessivePrefix = "",
      combinedMode = "",
      instrumentivoMode = "",
      stemProvenanceSeed = null,
      rootPlusYaBase = "",
      rootPlusYaBasePronounceable = "",
      derivationType = "",
      isNonactiveMode = false
    }) {
      subjectPrefix = typeof subjectPrefix === "string" ? subjectPrefix : "";
      objectPrefix = typeof objectPrefix === "string" ? objectPrefix : "";
      subjectSuffix = typeof subjectSuffix === "string" ? subjectSuffix : "";
      verb = typeof verb === "string" ? verb : "";
      analysisVerb = typeof analysisVerb === "string" ? analysisVerb : "";
      const baseSubjectSuffix = subjectSuffix;
      const baseSubjectPrefix = subjectPrefix;
      const isAgentivoTense = tense === "agentivo";
      const isPotencialHabitualProfile = targetObject.isPotencialHabitualTense(tense);
      const isPotencialActiveProfile = targetObject.isPotencialActiveTense(tense);
      const isPatientivoAdjectiveProfile = targetObject.isPatientivoAdjectiveTense(tense);
      const isPotencialNounLikeTense = tense === "potencial";
      const isSustantivoVerbalLikeTense = tense === "sustantivo-verbal" || isPotencialNounLikeTense;
      const agentivoNumberSlot = isAgentivoTense ? baseSubjectSuffix : "";
      const sustantivoVerbalLikeNumberSlot = tense === "sustantivo-verbal" ? "" : isSustantivoVerbalLikeTense ? baseSubjectSuffix : "";
      const morphologyTense = isAgentivoTense ? "presente-habitual" : isPotencialNounLikeTense ? "sustantivo-verbal" : isPotencialHabitualProfile ? "presente-habitual" : tense;
      if (isAgentivoTense) {
        subjectSuffix = "";
      }
      let baseObjectPrefix = objectPrefix;
      const prefixCheckCandidate = rawAnalysisVerb || analysisExactVerb || analysisVerb || verb;
      const prefixCheckBase = targetObject.getDerivationRuleBase(prefixCheckCandidate, targetObject.buildDerivationRuleBaseOptions({
        analysisVerb: prefixCheckCandidate,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix
      }));
      const prefixCheckTarget = prefixCheckBase || verb;
      const canonicalSourceSplit = targetObject.resolveCanonicalSourceSplit({
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefix,
        directionalPrefixFromSlash,
        analysisVerb: analysisVerb || rawAnalysisVerb || verb,
        verb
      }, {
        verb,
        analysisVerb: analysisVerb || rawAnalysisVerb || verb
      });
      const resolvedSourceSplitPrefix = sourceSplitPrefix || canonicalSourceSplit.sourcePrefix || "";
      const resolvedSourceCompositeBase = sourceCompositeBase || canonicalSourceSplit.slashCompositeBase || "";
      const directionalInputPrefix = directionalPrefix || "";
      let directionalOutputPrefix = directionalInputPrefix;
      let directionalPlan = null;
      const alternateForms = [];
      const pushAlternateForm = (verbValue = "", suffixValue = subjectSuffix, options = {}) => {
        const normalizedVerb = String(verbValue || "").trim();
        if (!normalizedVerb) {
          return;
        }
        if (isNounContextFinal) {
          alternateForms.push(targetObject.buildNominalFormEntry(normalizedVerb, suffixValue, options));
          return;
        }
        alternateForms.push({
          ...options,
          verb: normalizedVerb,
          subjectSuffix: typeof suffixValue === "string" ? suffixValue : ""
        });
      };
      let suppressPreferredPerfectAlternates = false;
      let suppressSustantivoIEndingSVariant = false;
      let passivePatientivoKeepsSelectedProjectiveFromDoubleObject = false;
      const earlyPatientivoFamily = tense === "patientivo" ? typeof targetObject.normalizeVerbDerivedPatientiveFamily === "function" ? targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) : String(patientivoSource || "").trim() : "";
      if (earlyPatientivoFamily === "passive") {
        const projectiveObjects = [objectPrefix, indirectObjectMarker, thirdObjectMarker].filter(marker => marker === "ta" || marker === "te");
        const selectedProjective = passivePatientivoSelectedProjectiveObjectPrefix === "ta" || passivePatientivoSelectedProjectiveObjectPrefix === "te" ? passivePatientivoSelectedProjectiveObjectPrefix : "";
        if (projectiveObjects.length > 1 && selectedProjective) {
          objectPrefix = selectedProjective;
          indirectObjectMarker = "";
          thirdObjectMarker = "";
          passivePatientivoKeepsSelectedProjectiveFromDoubleObject = true;
        }
      }
      const hasPatientivoShuntlineTa = indirectObjectMarker === "ta" || thirdObjectMarker === "ta";
      if ((earlyPatientivoFamily === "impersonal" || earlyPatientivoFamily === "perfectivo" || earlyPatientivoFamily === "imperfectivo") && objectPrefix === "te" && !hasPatientivoShuntlineTa) {
        objectPrefix = "ta";
      }
      const isIntransitiveVerb = objectPrefix === "" && !isTaFusion && !indirectObjectMarker && !thirdObjectMarker && !isUnderlyingTransitive;
      const forceTransitiveBase = isTaFusion || isUnderlyingTransitive;
      const isNounTense = targetObject.isNonanimateNounTense(tense) || targetObject.isPotencialProfileTense(tense) || isPatientivoAdjectiveProfile || tense === "agentivo" || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
      const isNounContextFinal = isNounContext || isNounTense;
      const forceTransitiveDirectional = directionalRuleMode === "transitive";
      const forceIntransitiveDirectional = directionalRuleMode === "intransitive";
      const forceNonspecificDirectional = directionalRuleMode === "nonspecific";
      const directionalPrefixResult = targetObject.applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        subjectPrefix,
        objectPrefix,
        verb,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        tense,
        isYawi,
        isNounTense: isNounContextFinal
      }, "prefix");
      ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix
      } = directionalPrefixResult);
      let nounContextPrimaryFormSpec = null;
      let nounContextPrimaryTrailingSuffix = "";
      const markerChain = [indirectObjectMarker || "", thirdObjectMarker || ""];
      objectPrefix = targetObject.composeProjectiveObjectPrefix({
        objectPrefix,
        markers: markerChain,
        subjectPrefix: baseSubjectPrefix
      });
      const shouldApplyEarlyContactElision = !targetObject.isPerfectiveTense(tense);
      subjectSuffix = targetObject.applyTenseSuffixRules(morphologyTense, subjectSuffix);
      if (suppletiveTenseSuffixes && Object.prototype.hasOwnProperty.call(suppletiveTenseSuffixes, morphologyTense)) {
        const overrideMap = suppletiveTenseSuffixes[morphologyTense];
        if (overrideMap && Object.prototype.hasOwnProperty.call(overrideMap, baseSubjectSuffix)) {
          subjectSuffix = overrideMap[baseSubjectSuffix];
        }
      }
      const exactAnalysisVerb = analysisExactVerb || analysisVerb || verb;
      const hasYaEndingMatrixRoot = exactAnalysisVerb.endsWith("ya");
      const rawAnalysis = analysisVerb || verb;
      const nonRedupAnalysis = targetObject.getNonReduplicatedRoot(rawAnalysis);
      const useAnalysisForCounts = Boolean(directionalInputPrefix) || nonRedupAnalysis !== rawAnalysis;
      const analysisTarget = useAnalysisForCounts ? nonRedupAnalysis : rawAnalysis;
      const resolveVerbDerivedNominalVerbMeta = () => {
        if (verbMeta && typeof verbMeta === "object") {
          return verbMeta;
        }
        const candidateRawVerb = rawVerb || sourceRawVerb || rawAnalysisVerb || exactAnalysisVerb || analysisVerb || verb;
        return targetObject.parseVerbInput(candidateRawVerb);
      };
      const applyVerbDerivedNominalResultToMorphology = nominalResult => {
        const entries = Array.isArray(nominalResult?.entries) ? targetObject.normalizeVerbDerivedNominalEntries(nominalResult.entries, {
          kind: nominalResult?.nounDerivationKind || ""
        }) : [];
        if (!entries.length) {
          return false;
        }
        const [primaryEntry, ...alternateEntries] = entries;
        const primaryRealized = targetObject.realizeNominalFormSpec(primaryEntry.formSpec || null, primaryEntry);
        subjectPrefix = "";
        objectPrefix = primaryEntry.surfaceObjectPrefix || "";
        verb = primaryRealized.verb || primaryEntry.verb || "";
        subjectSuffix = primaryRealized.subjectSuffix ?? primaryEntry.subjectSuffix ?? "";
        nounContextPrimaryFormSpec = primaryEntry.formSpec || targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix);
        nounContextPrimaryTrailingSuffix = primaryEntry.trailingSuffix || "";
        alternateForms.length = 0;
        alternateEntries.forEach(entry => {
          const realized = targetObject.realizeNominalFormSpec(entry.formSpec || null, entry);
          const alternateVerb = realized.verb || entry.verb || "";
          if (!alternateVerb) {
            return;
          }
          pushAlternateForm(alternateVerb, realized.subjectSuffix ?? entry.subjectSuffix ?? "", {
            formSpec: entry.formSpec || targetObject.buildLiteralNominalFormSpec(alternateVerb, realized.subjectSuffix ?? entry.subjectSuffix ?? ""),
            trailingSuffix: entry.trailingSuffix || "",
            surfaceObjectPrefix: entry.surfaceObjectPrefix || "",
            surfaceRuleMeta: entry.surfaceRuleMeta || null,
            nounDerivationKind: entry.nounDerivationKind || nominalResult?.nounDerivationKind || "",
            sourceTense: entry.sourceTense || "",
            provenance: entry.provenance || null
          });
        });
        return true;
      };
      if (tense === "imperativo") {
        const isImperativeSecondSingular = baseSubjectPrefix === "ti" && baseSubjectSuffix === "";
        const isImperativeSecondPlural = baseSubjectPrefix === "an" && baseSubjectSuffix === "t";
        if (isImperativeSecondSingular || isImperativeSecondPlural) {
          subjectPrefix = "shi";
        }
      }
      const dropClassCNucleusTenses = new Set(["presente-desiderativo", "futuro", "condicional"]);
      if (isSustantivoVerbalLikeTense && !isPotencialActiveProfile) {
        const sustantivoVerbalStemCandidates = targetObject.buildSustantivoVerbalStemCandidates({
          verb,
          analysisVerb,
          rawAnalysisVerb,
          sourceRawVerb,
          directionalPrefix: directionalInputPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix: resolvedSourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase: resolvedSourceCompositeBase,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          isIntransitive: isIntransitiveVerb,
          isYawi,
          isWeya,
          rootPlusYaBase,
          rootPlusYaBasePronounceable
        });
        if (!sustantivoVerbalStemCandidates.length) {
          return {
            error: true
          };
        }
        const [primarySustantivoStem, ...alternateSustantivoStems] = sustantivoVerbalStemCandidates;
        verb = primarySustantivoStem.verb;
        nounContextPrimaryFormSpec = primarySustantivoStem.formSpec || null;
        suppressSustantivoIEndingSVariant = primarySustantivoStem.suppressIEndingSVariant === true;
        alternateSustantivoStems.forEach(entry => {
          pushAlternateForm(entry.verb, "", {
            formSpec: entry.formSpec || targetObject.buildStemNominalFormSpec(targetObject.buildLiteralMorphStemSpec(entry.verb), "", {
              stem: entry.verb
            })
          });
        });
      }
      if (isPatientivoAdjectiveProfile) {
        const patientivoAdjectiveSource = targetObject.getPatientivoAdjectiveSourceForTense(tense) || "nonactive";
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        if (patientivoAdjectiveSource === "tronco-verbal" && isTransitive && !objectPrefix) {
          objectPrefix = "ta";
        }
        if (patientivoAdjectiveSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
          return {
            error: true
          };
        }
        const patientivoInput = targetObject.buildPatientivoDerivationInput({
          verb,
          analysisVerb,
          rawAnalysisVerb,
          sourceRawVerb,
          isTransitive,
          objectPrefix,
          directionalPrefix: directionalInputPrefix,
          isYawi,
          hasImpersonalTaPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix: resolvedSourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase: resolvedSourceCompositeBase,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          exactBaseVerb: exactAnalysisVerb,
          suppletiveStemSet,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          blockPerfectivoClassC: patientivoAdjectiveSource === "perfectivo"
        });
        const patientivoDerivations = targetObject.getPatientivoDerivationBuilder(patientivoAdjectiveSource)(patientivoInput);
        const patientivoAdjectiveForms = targetObject.buildPatientivoAdjectiveDerivations(patientivoDerivations, patientivoAdjectiveSource);
        if (!patientivoAdjectiveForms.length) {
          return {
            error: true
          };
        }
        const [primary, ...alternates] = patientivoAdjectiveForms;
        verb = primary.verb;
        subjectSuffix = primary.subjectSuffix;
        alternateForms.length = 0;
        alternates.forEach(entry => {
          pushAlternateForm(entry.verb, entry.subjectSuffix, {
            formSpec: entry.formSpec || targetObject.buildLiteralNominalFormSpec(entry.verb, entry.subjectSuffix)
          });
        });
      }
      if (tense === "patientivo") {
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        const resolvedPatientivoFamily = typeof targetObject.normalizeVerbDerivedPatientiveFamily === "function" ? targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) : String(patientivoSource || "").trim();
        if (resolvedPatientivoFamily === "passive" && !isTransitive) {
          return {
            error: true
          };
        }
        if (resolvedPatientivoFamily === "passive" && (objectPrefix === "ta" || objectPrefix === "te") && !indirectObjectMarker && !thirdObjectMarker && !passivePatientivoKeepsSelectedProjectiveFromDoubleObject) {
          objectPrefix = "";
        }
        if (resolvedPatientivoFamily === "impersonal" && objectPrefix === "te" && !hasPatientivoShuntlineTa) {
          objectPrefix = "ta";
        }
        if ((resolvedPatientivoFamily === "perfectivo" || resolvedPatientivoFamily === "imperfectivo") && objectPrefix === "te" && !hasPatientivoShuntlineTa) {
          objectPrefix = "ta";
        }
        if (patientivoSource === "tronco-verbal" && isTransitive && !objectPrefix) {
          objectPrefix = "ta";
        }
        if (patientivoSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
          return {
            error: true
          };
        }
        const pluralMarker = baseSubjectSuffix === "p" ? "wan" : baseSubjectSuffix === "t" ? "met" : "";
        const applyPatientivoSuffix = suffix => {
          if (pluralMarker) {
            return pluralMarker;
          }
          return suffix || "";
        };
        const patientivoInput = targetObject.buildPatientivoDerivationInput({
          verb,
          analysisVerb,
          rawAnalysisVerb,
          sourceRawVerb,
          isTransitive,
          objectPrefix,
          directionalPrefix: directionalInputPrefix,
          isYawi,
          hasImpersonalTaPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix: resolvedSourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase: resolvedSourceCompositeBase,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          exactBaseVerb: exactAnalysisVerb,
          suppletiveStemSet,
          rootPlusYaBase,
          rootPlusYaBasePronounceable
        });
        const patientivoDerivationBuilder = targetObject.getPatientivoDerivationBuilder(patientivoSource);
        const derivations = targetObject.normalizePatientivoDerivationEntries(patientivoDerivationBuilder(patientivoInput), patientivoSource);
        const patientivoNominalDerivations = targetObject.expandPatientivoNominalMarkerOptions(derivations, patientivoSource);
        let resolvedPatientivoDerivations = patientivoNominalDerivations.length ? patientivoNominalDerivations : derivations;
        const resolvedPatientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        if (patientivoSource === "tronco-verbal" && resolvedPatientivoNominalSuffix === null && typeof targetObject.getTClassSuffixForStem === "function") {
          resolvedPatientivoDerivations = resolvedPatientivoDerivations.filter(entry => String(entry?.subjectSuffix || "") === targetObject.getTClassSuffixForStem(entry?.verb || entry?.stem || ""));
        }
        if (resolvedPatientivoNominalSuffix !== null) {
          resolvedPatientivoDerivations = resolvedPatientivoDerivations.filter(entry => String(entry?.subjectSuffix || "") === resolvedPatientivoNominalSuffix);
        }
        if (!resolvedPatientivoDerivations.length && (resolvedPatientivoNominalSuffix !== null || targetObject.isStrictPatientivoDerivationSource(patientivoSource))) {
          return {
            error: true
          };
        }
        if (resolvedPatientivoDerivations.length) {
          const [primary, ...alternates] = targetObject.normalizePatientivoDerivationEntries(resolvedPatientivoDerivations, patientivoSource);
          const shouldAddPassiveTeDeletionAlternate = resolvedPatientivoFamily === "passive" && passivePatientivoKeepsSelectedProjectiveFromDoubleObject && passivePatientivoSelectedProjectiveObjectPrefix === "te";
          const pushPassiveTeDeletionAlternate = (entry, nextSuffix) => {
            const deletedVerb = String(entry?.verb || "");
            if (!shouldAddPassiveTeDeletionAlternate || !deletedVerb) {
              return;
            }
            pushAlternateForm(deletedVerb, nextSuffix, {
              formSpec: targetObject.buildLiteralNominalFormSpec(deletedVerb, nextSuffix),
              surfaceObjectPrefix: ""
            });
          };
          verb = primary.verb;
          subjectSuffix = applyPatientivoSuffix(primary.subjectSuffix);
          pushPassiveTeDeletionAlternate(primary, subjectSuffix);
          alternates.forEach(entry => {
            const nextSuffix = applyPatientivoSuffix(entry.subjectSuffix);
            pushAlternateForm(entry.verb, nextSuffix, {
              formSpec: targetObject.withNominalFormSpecSuffix(entry.formSpec || null, nextSuffix, {
                verb: entry.verb,
                subjectSuffix: nextSuffix
              })
            });
            pushPassiveTeDeletionAlternate(entry, nextSuffix);
          });
        }
      }
      const resolveOutputVerbForCurrentPrefixes = (verbValue = "", prefixOverrides = {}) => targetObject.resolveOptionalSupportiveOutputVerb({
        subjectPrefix: prefixOverrides.subjectPrefix ?? subjectPrefix,
        objectPrefix: prefixOverrides.objectPrefix ?? objectPrefix,
        verb: verbValue,
        hasOptionalSupportiveI,
        optionalSupportiveLetter
      });
      const isVerbNonactiveMode = !isNounContextFinal && (isNonactiveMode === true || targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo && targetObject.getActiveDerivationMode() === targetObject.DERIVATION_MODE.nonactive);
      const pretDerivationSharedOptions = {
        verb,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        tense,
        analysisVerb,
        exactBaseVerb: resolveOutputVerbForCurrentPrefixes(exactAnalysisVerb),
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
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        suppletiveStemSet,
        forceTransitive: forceTransitiveBase,
        indirectObjectMarker,
        hasDoubleDash,
        forceClassBOnly: isVerbNonactiveMode
      };
      const pretSurfaceRuleMeta = suppletiveStemSet?.surfaceRuleMeta || null;
      if (targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalOutput = targetObject.buildPretUniversalResultWithProvenance(pretDerivationSharedOptions);
        const resolvedUniversalForms = (universalOutput.forms || []).map(f => targetObject.resolveOptionalSupportiveOutputText({
          value: f,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        })).filter(Boolean);
        const primaryUniversalVerb = resolvedUniversalForms[0] || "—";
        resolvedUniversalForms.slice(1).forEach(f => pushAlternateForm(f, "", {
          surfaceRuleMeta: pretSurfaceRuleMeta
        }));
        return {
          subjectPrefix: "",
          objectPrefix: "",
          subjectSuffix: "",
          verb: primaryUniversalVerb,
          alternateForms,
          surfaceRuleMeta: pretSurfaceRuleMeta,
          stemProvenance: universalOutput.provenance || null
        };
      }
      if (!skipPretClass && targetObject.PRETERITO_CLASS_TENSES.has(tense)) {
        const isAdjectiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.adjetivo;
        const forceAdjectiveClassB = isAdjectiveMode && hasYaEndingMatrixRoot;
        if (isVerbNonactiveMode) {
          const nonactiveResult = targetObject.buildNonactivePerfectiveResult({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            indirectObjectMarker,
            hasOptionalSupportiveI,
            optionalSupportiveLetter
          });
          const nonactiveForms = nonactiveResult?.forms || [];
          const primaryNonactiveVerb = nonactiveForms[0] || "—";
          nonactiveForms.slice(1).forEach(f => pushAlternateForm(f, ""));
          return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: primaryNonactiveVerb,
            alternateForms,
            stemProvenance: null
          };
        }
        const classOutput = targetObject.buildClassBasedResultWithProvenance({
          ...pretDerivationSharedOptions,
          classFilter: forceAdjectiveClassB ? "B" : targetObject.getCurrentResolvedConjugationSelectionState().classFilter,
          allowAllClasses: false,
          forceClassBSelection: forceAdjectiveClassB,
          forceClassBOnly: isVerbNonactiveMode
        });
        const resolvedClassForms = (classOutput.forms || []).map(f => targetObject.resolveOptionalSupportiveOutputText({
          value: f,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        })).filter(Boolean);
        const primaryClassVerb = resolvedClassForms[0] || "—";
        resolvedClassForms.slice(1).forEach(f => pushAlternateForm(f, "", {
          surfaceRuleMeta: pretSurfaceRuleMeta
        }));
        return {
          subjectPrefix: "",
          objectPrefix: "",
          subjectSuffix: "",
          verb: primaryClassVerb,
          alternateForms,
          surfaceRuleMeta: pretSurfaceRuleMeta,
          stemProvenance: classOutput.provenance || null
        };
      }
      const isTransitive = objectPrefix !== "" || forceTransitiveBase;
      const directionalPostResult = targetObject.applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        directionalPlan,
        subjectPrefix,
        objectPrefix,
        verb,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        tense,
        isYawi,
        isNounTense: isNounContextFinal
      }, "post-elision");
      ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix
      } = directionalPostResult);
      const isSlashDenominalMatrixInput = hasSlashMarker && hasBoundMarker && (exactAnalysisVerb === "tiya" || exactAnalysisVerb === "wiya");
      const isPotencialActiveBoundInput = isPotencialActiveProfile && hasSlashMarker && hasBoundMarker;
      const disallowRootPlusYa = exactAnalysisVerb === "ya" && (hasSlashMarker || hasSuffixSeparator || hasLeadingDash) || isSlashDenominalMatrixInput || isPotencialActiveBoundInput;
      const finalYaPerfectiveAlternateBase = targetObject.isPerfectiveTense(tense) && !disallowRootPlusYa ? rootPlusYaBasePronounceable || targetObject.resolveFinalYaPerfectiveAlternateBase(verb, {
        isTransitive,
        isYawi,
        isWeya,
        requirePronounceable: true
      }) : "";
      if (finalYaPerfectiveAlternateBase) {
        pushAlternateForm(finalYaPerfectiveAlternateBase, subjectSuffix);
      }
      if (suppressPreferredPerfectAlternates) {
        alternateForms.length = 0;
      }
      const hasDerivedMuPrefix = Boolean(hasSuffixSeparator || hasCompoundMarker || hasSlashMarker || directionalInputPrefix);
      ({
        objectPrefix,
        verb
      } = targetObject.realizeDerivedMuStemInteraction({
        objectPrefix,
        verb,
        alternateForms,
        enable: hasDerivedMuPrefix
      }));
      if (isPotencialActiveProfile) {
        const potentialForms = buildPotencialActiveForms({
          tense,
          verb,
          subjectPrefix,
          objectPrefix,
          subjectSuffix,
          analysisVerb,
          rawAnalysisVerb,
          exactAnalysisVerb,
          prefixCheckTarget,
          isTransitive,
          isYawi,
          directionalPrefix: directionalInputPrefix,
          directionalOutputPrefix,
          baseSubjectPrefix,
          baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          suppletiveStemSet,
          hasOptionalSupportiveI,
          optionalSupportiveLetter,
          markerChain,
          hasDoubleDash,
          isNounContextFinal,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasImpersonalTaPrefix,
          hasNonspecificValence,
          derivationType,
          forceTransitiveBase,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix: resolvedSourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase: resolvedSourceCompositeBase,
          alternateForms
        });
        if (!potentialForms.length) {
          return {
            error: true
          };
        }
        const [primaryPotential, ...alternatePotentials] = potentialForms;
        verb = primaryPotential.verb;
        subjectSuffix = primaryPotential.subjectSuffix;
        subjectPrefix = targetObject.isPotencialTroncoActiveTense(tense) ? baseSubjectPrefix : "";
        objectPrefix = "";
        alternateForms.length = 0;
        alternatePotentials.forEach(entry => {
          pushAlternateForm(entry.verb, entry.subjectSuffix, {
            formSpec: entry.formSpec || null
          });
        });
      }
      if (tense === "calificativo-instrumentivo") {
        const nominalVerbMeta = resolveVerbDerivedNominalVerbMeta();
        const calificativoResult = targetObject.getCalificativoInstrumentivoResult({
          rawVerb: rawVerb || sourceRawVerb || rawAnalysisVerb || exactAnalysisVerb || analysisVerb || verb,
          verbMeta: nominalVerbMeta,
          subjectPrefix: baseSubjectPrefix,
          subjectSuffix: baseSubjectSuffix,
          objectPrefix: baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          possessivePrefix
        });
        if (!calificativoResult || calificativoResult.error || !applyVerbDerivedNominalResultToMorphology(calificativoResult)) {
          return {
            error: true
          };
        }
      }
      if (tense === "instrumentivo") {
        const nominalVerbMeta = resolveVerbDerivedNominalVerbMeta();
        const resolvedInstrumentivoMode = instrumentivoMode || (possessivePrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo);
        const instrumentivoResult = targetObject.getInstrumentivoResult({
          rawVerb: rawVerb || sourceRawVerb || rawAnalysisVerb || exactAnalysisVerb || analysisVerb || verb,
          verbMeta: nominalVerbMeta,
          subjectPrefix: baseSubjectPrefix,
          subjectSuffix: baseSubjectSuffix,
          objectPrefix: baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          mode: resolvedInstrumentivoMode,
          possessivePrefix
        });
        if (!instrumentivoResult || instrumentivoResult.error || !applyVerbDerivedNominalResultToMorphology(instrumentivoResult)) {
          return {
            error: true
          };
        }
      }
      if (tense === "locativo-temporal") {
        const nominalVerbMeta = resolveVerbDerivedNominalVerbMeta();
        const locativoResult = targetObject.getLocativoTemporalResult({
          rawVerb: rawVerb || sourceRawVerb || rawAnalysisVerb || exactAnalysisVerb || analysisVerb || verb,
          verbMeta: nominalVerbMeta,
          objectPrefix: baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          possessivePrefix,
          combinedMode
        });
        if (!locativoResult || locativoResult.error || !applyVerbDerivedNominalResultToMorphology(locativoResult)) {
          return {
            error: true
          };
        }
      }
      if (tense === "activo-no-finito") {
        subjectPrefix = "";
        objectPrefix = "";
        subjectSuffix = "";
      }
      const isCompositeDerivedInput = Boolean(hasSuffixSeparator || hasCompoundMarker || hasSlashMarker && (hasBoundMarker || Boolean(sourcePrefix)));
      if (tense === "activo-tronco-preterito" || tense === "activo-tronco-perfecto") {
        const isAdjectiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.adjetivo;
        const activeWrapperSourceTense = tense === "activo-tronco-preterito" ? "preterito" : "perfecto";
        const isTroncoTikActiveWrapper = tense === "activo-tronco-preterito";
        const isTroncoNajActiveWrapper = tense === "activo-tronco-perfecto";
        const isTroncoActiveWrapper = isTroncoTikActiveWrapper || isTroncoNajActiveWrapper;
        const sourceSubjectSuffix = targetObject.resolveTroncoSourceSuffix(activeWrapperSourceTense, baseSubjectSuffix);
        const wrapperObjectPrefix = isTroncoNajActiveWrapper && !forceTransitiveBase ? "ta" : objectPrefix;
        const wrapperIndirectObjectMarker = isTroncoNajActiveWrapper ? targetObject.composeProjectiveObjectPrefix({
          objectPrefix: "",
          markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
          subjectPrefix: baseSubjectPrefix
        }) : indirectObjectMarker;
        const inputMatrixRoot = targetObject.normalizeRuleBase(exactAnalysisVerb);
        const baseStemCandidates = isCompositeDerivedInput ? targetObject.buildActiveWrapperBaseStemCandidates({
          verb,
          analysisVerb,
          exactAnalysisVerb,
          rawAnalysisVerb,
          sourceRawVerb,
          directionalPrefix: directionalInputPrefix,
          boundPrefix,
          boundPrefixes,
          boundExplicitFlags,
          directionalPrefixFromSlash,
          sourceSplitPrefix: resolvedSourceSplitPrefix,
          sourcePrefix,
          sourceBase,
          sourceCompositeBase: resolvedSourceCompositeBase,
          verbSegment,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasNonspecificValence,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          isYawi,
          isWeya,
          derivationType,
          isUnderlyingTransitive,
          isTaFusion,
          suppletiveStemSet
        }) : [{
          verb,
          analysisVerb: exactAnalysisVerb
        }];
        const wrapperStemCandidates = [];
        const precomputedWrapperForms = [];
        const addWrapperStemCandidate = (sourceVerb = "", sourceAnalysis = "") => {
          const normalizedSourceVerb = String(sourceVerb || "").trim();
          if (!normalizedSourceVerb) {
            return;
          }
          wrapperStemCandidates.push({
            verb: normalizedSourceVerb,
            analysisVerb: String(sourceAnalysis || "").trim() || normalizedSourceVerb,
            rootPlusYaProxyBase: ""
          });
        };
        const addPrecomputedWrapperForm = (value = "") => {
          const form = String(value || "").trim();
          if (!form) {
            return;
          }
          precomputedWrapperForms.push(form);
        };
        if (isTroncoActiveWrapper && baseStemCandidates.length) {
          if (activeWrapperSourceTense === "perfecto" && patientivoSource === "perfectivo") {
            const objectMatrixRoot = targetObject.buildObjectMatrixRootFromInput({
              sourceVerb: exactAnalysisVerb,
              sourceAnalysis: exactAnalysisVerb
            });
            baseStemCandidates.forEach(candidate => {
              const sourceVerb = String(candidate?.verb || "").trim();
              if (!sourceVerb) {
                return;
              }
              const sourceAnalysis = String(candidate?.analysisVerb || "") || (directionalInputPrefix ? targetObject.stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix) : sourceVerb);
              const sourceSubjectSuffix = activeWrapperSourceTense === "perfecto" ? "tuk" : "k";
              const passthroughNaj = targetObject.shouldPassthroughNajPerfectoWrapper({
                activeWrapperSourceTense,
                sourceVerb,
                sourceAnalysis
              });
              if (passthroughNaj) {
                const matrixStem = targetObject.selectPreferredPatientivoPerfectivoStem({
                  sourceVerb,
                  sourceAnalysis,
                  objectMatrixRoot,
                  directionalPrefix: directionalInputPrefix,
                  boundPrefix,
                  boundPrefixes,
                  boundExplicitFlags,
                  directionalPrefixFromSlash,
                  sourceSplitPrefix: resolvedSourceSplitPrefix,
                  sourcePrefix,
                  sourceBase,
                  sourceCompositeBase: resolvedSourceCompositeBase,
                  hasImpersonalTaPrefix,
                  hasOptionalSupportiveI,
                  hasSlashMarker,
                  hasSuffixSeparator,
                  hasLeadingDash,
                  hasBoundMarker,
                  hasCompoundMarker,
                  hasNonspecificValence,
                  rootPlusYaBase,
                  rootPlusYaBasePronounceable,
                  patientivoSource
                });
                const incorporatedStem = targetObject.buildObjectIncorporatedSourceStem({
                  sourceVerb,
                  sourceAnalysis,
                  matrixStem,
                  allowedMatrixStems: targetObject.PRETERIT_OBJECT_MATRIX_STEMS
                });
                if (incorporatedStem) {
                  targetObject.buildPreteritObjectIncorporatedStems({
                    matrixStem,
                    incorporatedStem
                  }).forEach(stem => addPrecomputedWrapperForm(`${stem}${targetObject.MATRIX_NA_STEM}j${sourceSubjectSuffix}`));
                }
              } else {
                const pretSimpleNajSourceBuilder = targetObject.shouldMirrorNajFinalYaPretSimple(sourceAnalysis || sourceVerb) ? targetObject.buildObjectWrapperPretSimpleForms : targetObject.buildTroncoNajBaseForms;
                const pretSimpleNajSourceForms = pretSimpleNajSourceBuilder({
                  sourceVerb,
                  sourceAnalysis
                });
                const pretSimpleNajSourceValues = Array.isArray(pretSimpleNajSourceForms) ? pretSimpleNajSourceForms : pretSimpleNajSourceForms?.baseForms || [];
                pretSimpleNajSourceValues.forEach(stem => addPrecomputedWrapperForm(`${stem}${targetObject.MATRIX_NA_STEM}j${sourceSubjectSuffix}`));
              }
            });
          } else {
            const troncoIsTransitive = forceTransitiveBase && !hasImpersonalTaPrefix;
            baseStemCandidates.forEach(candidate => {
              const sourceVerb = String(candidate?.verb || "").trim();
              if (!sourceVerb) {
                return;
              }
              const sourceAnalysis = String(candidate?.analysisVerb || "") || (directionalInputPrefix ? targetObject.stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix) : sourceVerb);
              const troncoDerivations = targetObject.buildPatientivoTroncoDerivations({
                verb: sourceVerb,
                analysisVerb: sourceAnalysis || sourceVerb,
                rawAnalysisVerb: sourceAnalysis || sourceVerb,
                isTransitive: troncoIsTransitive,
                directionalPrefix: directionalInputPrefix,
                boundPrefix,
                boundPrefixes,
                boundExplicitFlags,
                directionalPrefixFromSlash,
                sourceSplitPrefix: resolvedSourceSplitPrefix,
                sourceCompositeBase: resolvedSourceCompositeBase,
                hasImpersonalTaPrefix,
                hasOptionalSupportiveI,
                hasSlashMarker,
                hasSuffixSeparator,
                hasLeadingDash,
                hasBoundMarker,
                hasCompoundMarker
              });
              const troncoWrapperSuffix = activeWrapperSourceTense === "perfecto" ? "tuk" : "k";
              const troncoSourceForms = targetObject.buildTroncoNajBaseForms({
                sourceVerb,
                sourceAnalysis
              });
              const troncoBaseForms = Array.isArray(troncoSourceForms) ? [] : troncoSourceForms?.baseForms || [];
              if (troncoBaseForms.length) {
                troncoBaseForms.forEach(troncoEntry => {
                  const normalizedEntry = targetObject.normalizeNominalFormEntry(troncoEntry, {
                    subjectSuffix: ""
                  });
                  if (!normalizedEntry.verb) {
                    return;
                  }
                  addPrecomputedWrapperForm(targetObject.buildNominalOutputText({
                    verb: normalizedEntry.verb,
                    subjectSuffix: "ti",
                    trailingSuffix: troncoWrapperSuffix
                  }));
                });
                return;
              }
              const troncoTiForms = Array.isArray(troncoSourceForms) ? [] : troncoSourceForms?.tiForms || [];
              troncoTiForms.forEach(troncoEntry => {
                const normalizedEntry = targetObject.normalizeNominalFormEntry(troncoEntry);
                if (!normalizedEntry.verb) {
                  return;
                }
                addPrecomputedWrapperForm(targetObject.buildNominalOutputText({
                  verb: normalizedEntry.verb,
                  subjectSuffix: normalizedEntry.subjectSuffix,
                  trailingSuffix: troncoWrapperSuffix
                }));
              });
            });
          }
        } else {
          baseStemCandidates.forEach(candidate => {
            const sourceVerb = String(candidate?.verb || "").trim();
            if (!sourceVerb) {
              return;
            }
            const sourceAnalysis = String(candidate?.analysisVerb || "") || (directionalInputPrefix ? targetObject.stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix) : sourceVerb);
            addWrapperStemCandidate(sourceVerb, sourceAnalysis);
          });
        }
        const wrapperForms = [];
        const seenWrapperForms = new Set();
        const addWrapperForm = (formValue = "") => {
          const form = String(formValue || "").trim();
          if (!form || form === "—" || seenWrapperForms.has(form)) {
            return;
          }
          seenWrapperForms.add(form);
          wrapperForms.push(form);
        };
        precomputedWrapperForms.forEach(formValue => addWrapperForm(formValue));
        wrapperStemCandidates.forEach(candidate => {
          const sourceVerb = String(candidate?.verb || "");
          if (!sourceVerb) {
            return;
          }
          const sourceAnalysis = String(candidate?.analysisVerb || "") || (directionalInputPrefix ? targetObject.stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix) : sourceVerb);
          const candidateRootPlusYaProxyBase = String(candidate?.rootPlusYaProxyBase || "").trim();
          const candidateRootPlusYaProxyBasePronounceable = candidateRootPlusYaProxyBase && targetObject.isSyllableSequencePronounceable(candidateRootPlusYaProxyBase) ? candidateRootPlusYaProxyBase : "";
          const shouldCarryRootPlusYaIntoWrapper = !isTroncoActiveWrapper;
          const candidateExactBaseVerb = isTroncoNajActiveWrapper ? sourceAnalysis || "" : exactAnalysisVerb;
          const candidateMatrix = targetObject.normalizeRuleBase(candidateExactBaseVerb);
          const adjectiveClassPolicy = targetObject.resolveActiveAdjectiveClassPolicy({
            tenseValue: tense,
            sourceTense: activeWrapperSourceTense,
            isAdjectiveMode,
            hasSlashMarker,
            hasBoundMarker,
            inputMatrix: inputMatrixRoot,
            candidateMatrix
          });
          const classOutput = targetObject.buildClassBasedResultWithProvenance({
            verb: sourceVerb,
            subjectPrefix,
            objectPrefix: wrapperObjectPrefix,
            subjectSuffix: activeWrapperSourceTense === "preterito" ? baseSubjectSuffix : sourceSubjectSuffix,
            tense: activeWrapperSourceTense,
            analysisVerb: sourceAnalysis || sourceVerb,
            exactBaseVerb: candidateExactBaseVerb,
            classFilter: adjectiveClassPolicy.classFilter,
            allowAllClasses: false,
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
            rootPlusYaBase: candidateRootPlusYaProxyBase || (shouldCarryRootPlusYaIntoWrapper ? rootPlusYaBase : ""),
            rootPlusYaBasePronounceable: candidateRootPlusYaProxyBasePronounceable || (shouldCarryRootPlusYaIntoWrapper ? rootPlusYaBasePronounceable : ""),
            derivationType,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix: wrapperObjectPrefix,
            suppletiveStemSet,
            forceTransitive: isTroncoNajActiveWrapper ? true : forceTransitiveBase,
            indirectObjectMarker: wrapperIndirectObjectMarker,
            hasDoubleDash,
            forceClassBSelection: adjectiveClassPolicy.forceClassBSelection
          });
          let candidateForms = targetObject.selectPreferredActiveAdjectiveForms(classOutput?.forms || [], {
            sourceVerb: sourceAnalysis || sourceVerb,
            sourceTense: activeWrapperSourceTense,
            selectionMode: adjectiveClassPolicy.preferredFinalYaSurfaceMode,
            isYawi,
            isWeya
          });
          if (adjectiveClassPolicy.preferredFinalYaSurfaceMode === "deleted-perfect" && candidateForms.length) {
            suppressPreferredPerfectAlternates = true;
          }
          candidateForms.forEach(formValue => addWrapperForm(formValue));
        });
        if (!wrapperForms.length) {
          return {
            error: true
          };
        }
        const [primaryWrapperForm, ...alternateWrapperForms] = wrapperForms;
        const splitTroncoTikWrapperForm = (formValue = "") => {
          const form = String(formValue || "").trim();
          if (!form) {
            return {
              verb: "",
              suffix: ""
            };
          }
          if (activeWrapperSourceTense === "perfecto" && form.endsWith("tuk")) {
            return {
              verb: form.slice(0, -3),
              suffix: targetObject.resolveTroncoTikWrapperSuffix(activeWrapperSourceTense)
            };
          }
          if (activeWrapperSourceTense === "preterito" && form.endsWith("k")) {
            return {
              verb: form.slice(0, -1),
              suffix: targetObject.resolveTroncoTikWrapperSuffix(activeWrapperSourceTense)
            };
          }
          return {
            verb: form,
            suffix: targetObject.resolveTroncoTikWrapperSuffix(activeWrapperSourceTense)
          };
        };
        if (isTroncoTikActiveWrapper) {
          const primaryWrapperParts = splitTroncoTikWrapperForm(primaryWrapperForm);
          verb = primaryWrapperParts.verb;
          subjectSuffix = primaryWrapperParts.suffix;
        } else {
          verb = primaryWrapperForm;
          subjectSuffix = "";
        }
        alternateForms.length = 0;
        alternateWrapperForms.forEach(formValue => {
          if (isTroncoTikActiveWrapper) {
            const alternateWrapperParts = splitTroncoTikWrapperForm(formValue);
            pushAlternateForm(alternateWrapperParts.verb, alternateWrapperParts.suffix);
            return;
          }
          pushAlternateForm(formValue, subjectSuffix);
        });
        if (!isTroncoTikActiveWrapper && suppressPreferredPerfectAlternates) {
          alternateForms.length = 0;
        }
        subjectPrefix = isTroncoTikActiveWrapper || isTroncoNajActiveWrapper ? baseSubjectPrefix : "";
        objectPrefix = "";
      }
      if (isAgentivoTense) {
        const baseSuffix = subjectSuffix;
        subjectSuffix = targetObject.applyAgentivoNumberSuffix(baseSuffix, agentivoNumberSlot);
        if (alternateForms.length) {
          alternateForms.forEach(form => {
            if (!form) {
              return;
            }
            const formSuffix = typeof form.subjectSuffix === "string" ? form.subjectSuffix : baseSuffix;
            form.subjectSuffix = targetObject.applyAgentivoNumberSuffix(formSuffix, agentivoNumberSlot);
            if (isNounContextFinal) {
              form.formSpec = targetObject.withNominalFormSpecSuffix(form.formSpec || null, form.subjectSuffix, form);
            }
          });
        }
      }
      if (isSustantivoVerbalLikeTense) {
        const pluralSlot = sustantivoVerbalLikeNumberSlot === "t" ? "t" : "";
        const getSustantivoVerbalSuffixVariants = (stemValue = "") => {
          const stem = typeof stemValue === "string" ? stemValue : "";
          const variants = ["lis"];
          if (stem.endsWith("i") && !suppressSustantivoIEndingSVariant) {
            variants.push("s");
          }
          return variants.map(value => targetObject.applyAgentivoNumberSuffix(value, pluralSlot)).filter((value, index, list) => list.indexOf(value) === index);
        };
        const baseVariants = getSustantivoVerbalSuffixVariants(verb);
        subjectSuffix = baseVariants[0] || targetObject.applyAgentivoNumberSuffix("lis", pluralSlot);
        if (isNounContextFinal && nounContextPrimaryFormSpec) {
          nounContextPrimaryFormSpec = targetObject.withNominalFormSpecSuffix(nounContextPrimaryFormSpec, subjectSuffix, {
            verb,
            subjectSuffix
          });
        }
        const nounAlternatesWithSuffixes = baseVariants.slice(1).map(value => targetObject.buildNominalFormEntry(verb, value));
        if (alternateForms.length) {
          alternateForms.forEach((form, index) => {
            if (!form) {
              return;
            }
            const normalizedForm = isNounContextFinal ? targetObject.normalizeNominalFormEntry(form, {
              verb,
              subjectSuffix: form.subjectSuffix ?? targetObject.baseSuffix
            }) : form;
            const formStem = typeof normalizedForm.verb === "string" ? normalizedForm.verb : verb;
            const formVariants = getSustantivoVerbalSuffixVariants(formStem);
            normalizedForm.subjectSuffix = formVariants[0] || targetObject.applyAgentivoNumberSuffix("lis", pluralSlot);
            if (isNounContextFinal) {
              normalizedForm.formSpec = targetObject.withNominalFormSpecSuffix(normalizedForm.formSpec || null, normalizedForm.subjectSuffix, normalizedForm);
            }
            alternateForms[index] = normalizedForm;
            formVariants.slice(1).forEach(value => {
              nounAlternatesWithSuffixes.push(isNounContextFinal ? targetObject.withNominalFormEntrySuffix(normalizedForm, value, normalizedForm) : {
                ...normalizedForm,
                subjectSuffix: value
              });
            });
          });
        }
        nounAlternatesWithSuffixes.forEach(entry => alternateForms.push(entry));
      }
      if (isPatientivoAdjectiveProfile) {
        const pluralSlot = baseSubjectSuffix === "t" ? "t" : "";
        subjectSuffix = targetObject.applyPatientivoAdjectiveNumberSuffix(pluralSlot);
        if (alternateForms.length) {
          alternateForms.forEach(form => {
            if (!form) {
              return;
            }
            form.subjectSuffix = targetObject.applyPatientivoAdjectiveNumberSuffix(pluralSlot);
            if (isNounContextFinal) {
              form.formSpec = targetObject.withNominalFormSpecSuffix(form.formSpec || null, form.subjectSuffix, form);
            }
          });
        }
      }
      let sourceOuterPrefixForNominalOutput = "";
      if (isNounContextFinal && objectPrefix && sourceRawVerb) {
        const nounOutputSourceModel = targetObject.buildVerbDerivedNominalSourceModel({
          sourceRawVerb,
          verb,
          analysisVerb,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker
        });
        const nominalSurfacePlacement = targetObject.resolveVerbDerivedNominalSourceOuterSurfacePlacement({
          sourceModel: nounOutputSourceModel,
          runtimeObjectPrefix: objectPrefix,
          objectPrefix,
          verb,
          surfaceRuleMeta: null
        });
        sourceOuterPrefixForNominalOutput = String(nominalSurfacePlacement?.surfaceRuleMeta?.sourceOuterPrefix || "");
        if (sourceOuterPrefixForNominalOutput) {
          verb = nominalSurfacePlacement.verb;
          if (nounContextPrimaryFormSpec) {
            nounContextPrimaryFormSpec = targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix);
          }
          if (alternateForms.length) {
            for (let index = 0; index < alternateForms.length; index += 1) {
              alternateForms[index] = targetObject.applyVerbDerivedNominalPlacementToEntry(alternateForms[index], nounOutputSourceModel, {
                runtimeObjectPrefix: objectPrefix,
                objectPrefix
              });
            }
          }
        }
      }
      objectPrefix = targetObject.normalizeValenceMarkerOrder(objectPrefix);
      const surfaceRuleMeta = {
        sourceOuterPrefix: sourceOuterPrefixForNominalOutput,
        imperativeKiReduction: tense === "imperativo" && (baseSubjectPrefix === "ti" && baseSubjectSuffix === "" || baseSubjectPrefix === "an" && baseSubjectSuffix === "t"),
        dropVerbInitialIAfterObjectI: shouldApplyEarlyContactElision,
        dropInitialIFromIskaliaAfterMu: objectPrefix === "mu" || markerChain.includes("mu"),
        trimFinalIAUAVowel: tense === "imperativo" || dropClassCNucleusTenses.has(tense)
      };
      const directionalChainMeta = directionalInputPrefix ? {
        directionalInputPrefix,
        directionalOutputPrefix,
        directionalPlan,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        directionalRuleMode,
        tense,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        isYawi,
        isNounTense: isNounContextFinal
      } : null;
      const normalizedAlternateForms = isNounContextFinal ? alternateForms.map(form => targetObject.normalizeNominalFormEntry(form, {
        subjectSuffix
      })).filter(form => form && form.subjectSuffix !== null) : alternateForms;
      return {
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        formSpec: isNounContextFinal ? nounContextPrimaryFormSpec || targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix) : null,
        trailingSuffix: isNounContextFinal ? nounContextPrimaryTrailingSuffix : "",
        alternateForms: normalizedAlternateForms,
        surfaceRuleMeta,
        directionalChainMeta,
        stemProvenance: stemProvenanceSeed || null
      };
    }

    const api = {};
    api.buildTroncoActivePatientivoCoreForms = buildTroncoActivePatientivoCoreForms;
    api.buildPotencialActiveForms = buildPotencialActiveForms;
    api.applyMorphologyRules = applyMorphologyRules;
    return api;
}

export function installMorphologyEngineGlobals(targetObject = globalThis) {
    const api = createMorphologyEngineApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
