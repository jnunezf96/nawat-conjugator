// Native wrapper generated from src/core/generation/morphology_engine.js.

export function createMorphologyEngineApi(targetObject = globalThis) {
    // core/generation/morphology_engine.js
    // Shared morphology engine.
    // Global-scope module: all functions defined directly on the global object.
    // Deps (resolved at call time): all globals and functions in global scope from
    // script.js and other extracted modules.

    const MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE = "La generacion no produjo una forma.";
    function normalizeMorphologyTenseValue(tenseValue = "") {
      return String(tenseValue || "").trim();
    }
    function buildMorphologyApplicationDiagnostic({
      id = "morphology-application-blocked",
      message = MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE,
      failedLayer = "stem",
      contractLayer = "stemFrame",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "morphology-application-blocked").trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE).trim(),
        failedLayer: String(failedLayer || "stem").trim(),
        contractLayer: String(contractLayer || "stemFrame").trim(),
        routeFamily: "morphology-application",
        routeStage: String(routeStage || "").trim()
      };
    }
    function getMorphologyApplicationDiagnosticLayerContract(routeStage = "") {
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
      if (/surface|result|output/i.test(stage)) {
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
    function normalizeMorphologyApplicationDiagnostics(diagnostics = [], fallbackDiagnostic = null, {
      routeStage = ""
    } = {}) {
      const entries = Array.isArray(diagnostics) && diagnostics.length ? diagnostics : fallbackDiagnostic ? [fallbackDiagnostic] : [];
      const normalized = typeof targetObject.normalizeGrammarDiagnosticContractEntries === "function" ? targetObject.normalizeGrammarDiagnosticContractEntries(entries) : entries.filter(entry => entry && typeof entry === "object");
      const layerContract = getMorphologyApplicationDiagnosticLayerContract(routeStage);
      return normalized.map(entry => ({
        ...entry,
        failedLayer: entry.failedLayer || layerContract.failedLayer,
        contractLayer: entry.contractLayer || layerContract.contractLayer,
        routeFamily: entry.routeFamily || "morphology-application",
        routeStage: entry.routeStage || String(routeStage || "").trim()
      }));
    }
    function normalizeMorphologyApplicationSurfaceValue(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitMorphologyApplicationSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeMorphologyApplicationSurfaceValue(entry)).filter(Boolean);
    }
    function getMorphologyApplicationResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function getMorphologyApplicationSurfaceForms(result = null, fallbackSurface = "") {
      const output = result && typeof result === "object" ? result : {};
      const grammarFrame = getMorphologyApplicationResultFrame(output);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitMorphologyApplicationSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output.surfaceForms)) {
        forms.push(...output.surfaceForms);
      }
      if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output.result) {
        forms.push(output.result);
      }
      if (!hasResultFrame && fallbackSurface) {
        forms.push(fallbackSurface);
      }
      return forms.flatMap(entry => splitMorphologyApplicationSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getMorphologyApplicationSourceSurfaceForms(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const grammarFrame = getMorphologyApplicationResultFrame(output);
      const hasResultFrame = Boolean(grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object");
      const frameFirstForms = getMorphologyApplicationSurfaceForms(output);
      if (frameFirstForms.length || hasResultFrame) {
        return frameFirstForms;
      }
      return (Array.isArray(output.forms) ? output.forms : []).flatMap(entry => splitMorphologyApplicationSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getMorphologyApplicationSoundSpellingFrames(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const grammarFrame = getMorphologyApplicationResultFrame(output);
      return [...(Array.isArray(output.soundSpellingFrames) ? output.soundSpellingFrames : []), ...(Array.isArray(output.orthographyFrame?.soundSpellingFrames) ? output.orthographyFrame.soundSpellingFrames : []), ...(Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames) ? grammarFrame.orthographyFrame.soundSpellingFrames : [])].map(frame => ({
        ...frame
      }));
    }
    function buildMorphologyLesson2SoundSpellingFrame(frameInput = {}, beforeValue = "", afterValue = "", role = "") {
      if (typeof targetObject.buildLesson2SoundSpellingFrame !== "function") {
        return null;
      }
      const frame = targetObject.buildLesson2SoundSpellingFrame(frameInput);
      if (!frame || !frame.ruleId) {
        return null;
      }
      const normalizedRole = String(role || frame.grammarSlot || "");
      return {
        ...frame,
        segmentRole: normalizedRole,
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || "")
      };
    }
    function pushMorphologyLesson2SoundSpellingFrame(frames = [], frameInput = {}, beforeValue = "", afterValue = "", role = "") {
      if (!Array.isArray(frames)) {
        return;
      }
      const frame = buildMorphologyLesson2SoundSpellingFrame(frameInput, beforeValue, afterValue, role);
      if (!frame) {
        return;
      }
      const key = [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
      if (key && frames.some(entry => [entry.ruleId || "", entry.grammarSlot || "", entry.syllablePosition || "", entry.sourceSurface || "", entry.target || "", Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "", entry.segmentRole || "", entry.sourceSegmentValue || "", entry.targetSegmentValue || ""].join(":") === key)) {
        return;
      }
      frames.push(frame);
    }
    function getMorphologyApplicationAndrewsRefs({
      tense = "",
      derivationType = "",
      patientivoSource = ""
    } = {}) {
      const refs = ["Andrews Lesson 5", "Andrews Lesson 7"];
      const normalizedTense = String(tense || "");
      if (normalizedTense === "sustantivo-verbal" || normalizedTense === "agentivo" || normalizedTense === "agentivo-presente" || normalizedTense === "agentivo-preterito" || normalizedTense === "agentivo-futuro" || normalizedTense === "instrumentivo" || normalizedTense === "calificativo-instrumentivo") {
        refs.push("Andrews Lessons 35-36");
      }
      if (normalizedTense === "potencial" || normalizedTense === "patientivo" || String(patientivoSource || "")) {
        refs.push("Andrews Lessons 37-39");
      }
      if (String(derivationType || "") === "causative") {
        refs.push("Andrews Lessons 24-25");
      }
      if (String(derivationType || "") === "applicative") {
        refs.push("Andrews Lesson 26");
      }
      return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function attachMorphologyApplicationGrammarContract(result = null, {
      routeStage = "apply",
      diagnosticId = "morphology-application-blocked",
      message = MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE,
      subjectPrefix = "",
      objectPrefix = "",
      subjectSuffix = "",
      verb = "",
      tense = "",
      analysisVerb = "",
      rawVerb = "",
      sourceRawVerb = "",
      derivationType = "",
      patientivoSource = "",
      combinedMode = "",
      isNounContext = false,
      enumerable = false
    } = {}) {
      const output = result && typeof result === "object" ? result : {};
      const fallbackDiagnostic = buildMorphologyApplicationDiagnostic({
        id: diagnosticId,
        message,
        failedLayer: "stem",
        contractLayer: "stemFrame",
        routeStage
      });
      const diagnostics = normalizeMorphologyApplicationDiagnostics(output.diagnostics, output.error ? fallbackDiagnostic : null, {
        routeStage
      });
      Object.defineProperty(output, "diagnostics", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: diagnostics
      });
      const outputVerb = String(output.verb || verb || "");
      const surfaceForms = output.error ? [] : getMorphologyApplicationSurfaceForms(output, outputVerb);
      const surface = output.error ? "" : surfaceForms[0] || "";
      const ok = Boolean(surface) && output.error !== true;
      const soundSpellingFrames = getMorphologyApplicationSoundSpellingFrames(output);
      const grammarFrame = typeof targetObject.buildGrammarFrame === "function" ? targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "morphology-application",
            tense: String(tense || ""),
            derivationType: String(derivationType || ""),
            patientivoSource: String(patientivoSource || "")
          },
          evidenceStatus: ok ? "applied" : "blocked",
          andrewsRefs: getMorphologyApplicationAndrewsRefs({
            tense,
            derivationType,
            patientivoSource
          }),
          supported: ok
        }) : null,
        unitFrame: {
          unitKind: isNounContext ? "nominal-morphology" : "verbal-morphology",
          outputKind: "morphology-application",
          generationRoute: String(tense || "")
        },
        orthographyFrame: {
          surface,
          surfaceForms,
          soundSpellingFrames,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          subjectSuffix: String(output.subjectSuffix ?? subjectSuffix ?? ""),
          trailingSuffix: String(output.trailingSuffix || ""),
          alternateCount: Array.isArray(output.alternateForms) ? output.alternateForms.length : 0
        },
        stemFrame: {
          stem: outputVerb,
          analysisStem: String(analysisVerb || ""),
          sourceRawVerb: String(sourceRawVerb || rawVerb || ""),
          stemProvenance: output.stemProvenance || null
        },
        nuclearClauseFrame: null,
        participantFrame: {
          subject: {
            prefix: String(output.subjectPrefix ?? subjectPrefix ?? ""),
            suffix: String(output.subjectSuffix ?? subjectSuffix ?? "")
          },
          object: {
            prefix: String(output.objectPrefix ?? objectPrefix ?? "")
          }
        },
        inflectionFrame: {
          tense: String(tense || ""),
          derivationType: String(derivationType || ""),
          patientivoSource: String(patientivoSource || ""),
          combinedMode: String(combinedMode || ""),
          isNounContext: isNounContext === true
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily: "morphology-application",
          routeStage,
          sourceContract: {
            tense: String(tense || ""),
            verb: String(verb || ""),
            analysisVerb: String(analysisVerb || ""),
            derivationType: String(derivationType || "")
          },
          targetContract: {
            outputKind: "morphology-application",
            surfaceKind: isNounContext ? "nominal-stem" : "verbal-stem"
          },
          generationAllowed: ok,
          blockingDiagnostics: ok ? [] : diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms,
          outputKind: "morphology-application",
          generationRoute: String(tense || ""),
          sourceInput: String(sourceRawVerb || rawVerb || verb || ""),
          provenance: output.stemProvenance || null
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: ok ? "applied" : "blocked",
          diagnostics,
          blockers: ok ? [] : diagnostics
        }) : null
      }) : null;
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result: output,
        grammarFrame
      }) : {
        ok,
        surface,
        frames: grammarFrame,
        diagnostics
      };
      Object.defineProperties(output, {
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
      return output;
    }
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
        tronco: entry?.verb || "",
        pers2: entry?.subjectSuffix || ""
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
      const wrapperIndirectObjectMarker = stripsProjectiveObjectForPotentialPatient ? "" : targetObject.composeObj1Chain({
        obj1: "",
        markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
        pers1: baseSubjectPrefix
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
        const candidateForms = targetObject.selectPreferredActiveAdjectiveForms(getMorphologyApplicationSourceSurfaceForms(classOutput), {
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
      actionNounStemUse = "",
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
      tense = normalizeMorphologyTenseValue(tense);
      const soundSpellingFrames = [];
      const baseSubjectSuffix = subjectSuffix;
      const baseSubjectPrefix = subjectPrefix;
      const isAgentivoTense = tense === "agentivo";
      const isPresentAgentivoTense = tense === "agentivo-presente";
      const isPreteritAgentivoTense = tense === "agentivo-preterito";
      const isFutureAgentivoTense = tense === "agentivo-futuro";
      const isPotencialHabitualProfile = targetObject.isPotencialHabitualTense(tense);
      const isPotencialActiveProfile = targetObject.isPotencialActiveTense(tense);
      const isPatientivoAdjectiveProfile = targetObject.isPatientivoAdjectiveTense(tense);
      const isPotencialNounLikeTense = tense === "potencial";
      const isSustantivoVerbalLikeTense = tense === "sustantivo-verbal" || isPotencialNounLikeTense;
      const agentivoNumberSlot = isAgentivoTense ? baseSubjectSuffix : "";
      const sustantivoVerbalLikeNumberSlot = tense === "sustantivo-verbal" ? "" : isSustantivoVerbalLikeTense ? baseSubjectSuffix : "";
      const morphologyTense = isAgentivoTense ? "presente-habitual" : isPresentAgentivoTense ? "presente" : isPreteritAgentivoTense ? "preterito" : isFutureAgentivoTense ? "futuro" : isPotencialNounLikeTense ? "sustantivo-verbal" : isPotencialHabitualProfile ? "presente-habitual" : tense;
      const returnMorphologyError = (routeStage = "blocked", diagnosticId = "morphology-application-blocked") => attachMorphologyApplicationGrammarContract({
        error: true
      }, {
        routeStage,
        diagnosticId,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        rawVerb,
        sourceRawVerb,
        derivationType,
        patientivoSource,
        combinedMode,
        isNounContext
      });
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
      let customaryPresentPatientiveSelectedProjectiveObjectPrefix = "";
      let patientivoSourceStageFrame = null;
      let patientivoSourceStageFrames = [];
      let patientivoMultipleDerivationContract = null;
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
      if (isPotencialHabitualProfile) {
        const projectiveObjects = [objectPrefix, indirectObjectMarker, thirdObjectMarker].filter(marker => marker === "ta" || marker === "te");
        if (projectiveObjects.length > 1 && (objectPrefix === "ta" || objectPrefix === "te")) {
          customaryPresentPatientiveSelectedProjectiveObjectPrefix = objectPrefix;
          indirectObjectMarker = "";
          thirdObjectMarker = "";
        }
      }
      const hasPatientivoShuntlineTa = indirectObjectMarker === "ta" || thirdObjectMarker === "ta";
      if ((earlyPatientivoFamily === "impersonal" || earlyPatientivoFamily === "perfectivo" || earlyPatientivoFamily === "imperfectivo") && objectPrefix === "te" && !hasPatientivoShuntlineTa) {
        objectPrefix = "ta";
      }
      const isIntransitiveVerb = objectPrefix === "" && !isTaFusion && !indirectObjectMarker && !thirdObjectMarker && !isUnderlyingTransitive;
      const forceTransitiveBase = isTaFusion || isUnderlyingTransitive;
      const isNounTense = targetObject.isNonanimateNounTense(tense) || targetObject.isPotencialProfileTense(tense) || isPatientivoAdjectiveProfile || tense === "agentivo" || isPresentAgentivoTense || isPreteritAgentivoTense || isFutureAgentivoTense || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
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
      const objectPrefixBeforeComposition = objectPrefix;
      objectPrefix = targetObject.composeObj1Chain({
        obj1: objectPrefix,
        markers: markerChain,
        pers1: baseSubjectPrefix
      });
      if (objectPrefixBeforeComposition === "ki" && objectPrefix === "k" && ["ni", "ti"].includes(baseSubjectPrefix)) {
        pushMorphologyLesson2SoundSpellingFrame(soundSpellingFrames, {
          ruleId: "obj1-ki-after-ni-ti-k",
          source: "ki",
          target: "k",
          slot: "obj1",
          syllablePosition: "pers1-obj1-boundary"
        }, objectPrefixBeforeComposition, objectPrefix, "obj1");
      }
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
      const resolveVerbDerivedNominalVerbMeta = ({
        preferCurrentDerivedStem = false
      } = {}) => {
        const candidateMeta = verbMeta && typeof verbMeta === "object" ? verbMeta : null;
        if (candidateMeta && preferCurrentDerivedStem) {
          const derivedStem = targetObject.normalizeRuleBase(analysisVerb || verb || "");
          if (derivedStem) {
            return {
              ...candidateMeta,
              sourceRawVerb: derivedStem,
              verb: derivedStem,
              analysisVerb: derivedStem,
              rawAnalysisVerb: derivedStem,
              exactBaseVerb: derivedStem,
              sourceBase: derivedStem,
              canonical: {
                ...(candidateMeta.canonical && typeof candidateMeta.canonical === "object" ? candidateMeta.canonical : {}),
                sourceBase: derivedStem,
                slashCompositeRuleBase: derivedStem
              },
              hasLeadingDash: false,
              hasBoundMarker: false,
              hasCompoundMarker: false,
              isMarkedTransitive: false,
              isTaFusion: false
            };
          }
        }
        if (candidateMeta) {
          return candidateMeta;
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
      if (tense === "optativo") {
        const isOptativeSecondSingular = baseSubjectPrefix === "ti" && baseSubjectSuffix === "";
        const isOptativeSecondPlural = baseSubjectPrefix === "an" && baseSubjectSuffix === "t";
        if (isOptativeSecondSingular || isOptativeSecondPlural) {
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
          rootPlusYaBasePronounceable,
          combinedMode
        });
        if (!sustantivoVerbalStemCandidates.length) {
          return returnMorphologyError("sustantivo-verbal-stem-candidates", "morphology-sustantivo-verbal-no-stem");
        }
        const [primarySustantivoStem, ...alternateSustantivoStems] = sustantivoVerbalStemCandidates;
        const isActiveActionSustantivoVerbal = tense === "sustantivo-verbal" && combinedMode !== "nonactive";
        const activeActionHasReflexiveProjective = Boolean(isActiveActionSustantivoVerbal && baseObjectPrefix === "mu" && markerChain.some(marker => marker === "ta" || marker === "te"));
        const activeActionObjectPrefix = isActiveActionSustantivoVerbal && (objectPrefix === "mu" || activeActionHasReflexiveProjective) ? "ne" : objectPrefix;
        const adjustActiveActionSustantivoStem = (stemValue = "") => {
          const stem = String(stemValue || "");
          if (isActiveActionSustantivoVerbal && activeActionObjectPrefix === "ta" && stem.startsWith("i")) {
            const adjustedStem = stem.slice(1);
            pushMorphologyLesson2SoundSpellingFrame(soundSpellingFrames, {
              ruleId: "supportive-i-stem-initial-elision",
              source: "i",
              target: "",
              slot: "stem-initial",
              syllablePosition: "after-object"
            }, stem, adjustedStem, "stem-initial");
            return adjustedStem;
          }
          return stem;
        };
        const primarySustantivoVerb = adjustActiveActionSustantivoStem(primarySustantivoStem.verb);
        objectPrefix = activeActionObjectPrefix;
        verb = primarySustantivoVerb;
        nounContextPrimaryFormSpec = primarySustantivoVerb === primarySustantivoStem.verb ? primarySustantivoStem.formSpec || null : targetObject.buildLiteralNominalFormSpec(primarySustantivoVerb, "");
        suppressSustantivoIEndingSVariant = primarySustantivoStem.suppressIEndingSVariant === true;
        if (isActiveActionSustantivoVerbal && activeActionObjectPrefix === "ne" && primarySustantivoVerb.startsWith("ih")) {
          const neDroppedSupportiveIStem = primarySustantivoVerb.slice(1);
          pushMorphologyLesson2SoundSpellingFrame(soundSpellingFrames, {
            ruleId: "supportive-i-stem-initial-elision",
            source: "i",
            target: "",
            slot: "stem-initial",
            syllablePosition: "after-object"
          }, primarySustantivoVerb, neDroppedSupportiveIStem, "stem-initial");
          pushAlternateForm(neDroppedSupportiveIStem, "", {
            formSpec: targetObject.buildStemNominalFormSpec(targetObject.buildLiteralMorphStemSpec(neDroppedSupportiveIStem), "", {
              stem: neDroppedSupportiveIStem
            })
          });
        }
        alternateSustantivoStems.forEach(entry => {
          const alternateSustantivoVerb = adjustActiveActionSustantivoStem(entry.verb);
          pushAlternateForm(alternateSustantivoVerb, "", {
            formSpec: alternateSustantivoVerb === entry.verb ? entry.formSpec || targetObject.buildStemNominalFormSpec(targetObject.buildLiteralMorphStemSpec(entry.verb), "", {
              stem: entry.verb
            }) : targetObject.buildStemNominalFormSpec(targetObject.buildLiteralMorphStemSpec(alternateSustantivoVerb), "", {
              stem: alternateSustantivoVerb
            }),
            suppressIEndingSVariant: entry.suppressIEndingSVariant === true
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
          return returnMorphologyError("patientive-adjective-tronco-object-gate", "morphology-patientive-adjective-tronco-object-blocked");
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
          blockPerfectivoClassC: patientivoAdjectiveSource === "perfectivo",
          preserveProjectiveObjectPrefix: customaryPresentPatientiveSelectedProjectiveObjectPrefix
        });
        const patientivoDerivations = targetObject.getPatientivoDerivationBuilder(patientivoAdjectiveSource)(patientivoInput);
        const patientivoAdjectiveForms = targetObject.buildPatientivoAdjectiveDerivations(patientivoDerivations, patientivoAdjectiveSource);
        if (!patientivoAdjectiveForms.length) {
          return returnMorphologyError("patientive-adjective-source-forms", "morphology-patientive-adjective-no-forms");
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
        if (isPotencialHabitualProfile) {
          objectPrefix = "";
        }
      }
      if (tense === "patientivo") {
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        const resolvedPatientivoFamily = typeof targetObject.normalizeVerbDerivedPatientiveFamily === "function" ? targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) : String(patientivoSource || "").trim();
        if (resolvedPatientivoFamily === "passive" && !isTransitive) {
          return returnMorphologyError("patientivo-passive-valency-gate", "morphology-patientivo-passive-intransitive-blocked");
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
        if (objectPrefix === "mu" && (resolvedPatientivoFamily === "passive" || resolvedPatientivoFamily === "impersonal" || resolvedPatientivoFamily === "nonactive" || resolvedPatientivoFamily === "perfectivo" || resolvedPatientivoFamily === "imperfectivo")) {
          objectPrefix = "ne";
        }
        if (patientivoSource === "tronco-verbal" && isTransitive && !objectPrefix) {
          objectPrefix = "ta";
        }
        if (patientivoSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
          return returnMorphologyError("patientivo-tronco-object-gate", "morphology-patientivo-tronco-object-blocked");
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
        if (patientivoSource === "tronco-verbal" && String(patientivoNominalSuffix || "") === "zero") {
          return returnMorphologyError("patientivo-tronco-zero-suffix-gate", "morphology-patientivo-tronco-zero-suffix-blocked");
        }
        const resolvedPatientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        if (patientivoSource === "tronco-verbal" && resolvedPatientivoNominalSuffix === null && typeof targetObject.getTClassSuffixForStem === "function") {
          resolvedPatientivoDerivations = resolvedPatientivoDerivations.filter(entry => String(entry?.subjectSuffix || "") === targetObject.getTClassSuffixForStem(entry?.verb || entry?.stem || ""));
        }
        if (resolvedPatientivoNominalSuffix !== null) {
          resolvedPatientivoDerivations = resolvedPatientivoDerivations.filter(entry => String(entry?.subjectSuffix || "") === resolvedPatientivoNominalSuffix);
        }
        if (!resolvedPatientivoDerivations.length && (resolvedPatientivoNominalSuffix !== null || targetObject.isStrictPatientivoDerivationSource(patientivoSource))) {
          return returnMorphologyError("patientivo-source-derivations", "morphology-patientivo-source-no-derivations");
        }
        if (resolvedPatientivoDerivations.length) {
          const [primary, ...alternates] = targetObject.normalizePatientivoDerivationEntries(resolvedPatientivoDerivations, patientivoSource);
          const buildSelectedPatientivoSourceStageFrame = (entry, nextSuffix) => {
            const frame = entry?.patientiveSourceStageFrame;
            if (!frame || typeof frame !== "object") {
              return null;
            }
            const outputStem = String(entry?.verb || entry?.stem || frame.outputStem || "");
            const outputConnector = String(nextSuffix || "");
            const outputPrefix = String(objectPrefix || "");
            const sourceStockContract = frame.sourceStockContract && frame.sourceStockContract.kind === "patientive-root-stock-source-contract" && typeof targetObject.getPatientivoRootStockSourceContract === "function" ? targetObject.getPatientivoRootStockSourceContract({
              sourceStem: frame.sourceStockContract.sourceStem || frame.sourceStem || "",
              outputStem,
              outputConnector,
              routeStemOnly: outputConnector === "",
              variantConsonant: frame.sourceStockContract.variantConsonant || ""
            }) : frame.sourceStockContract || null;
            return {
              ...frame,
              selectedOutput: true,
              outputPrefix,
              outputStem,
              outputConnector,
              outputSurface: `${outputPrefix}${outputStem}${outputConnector}`,
              sourceStockContract
            };
          };
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
          patientivoSourceStageFrame = buildSelectedPatientivoSourceStageFrame(primary, subjectSuffix);
          patientivoSourceStageFrames = patientivoSourceStageFrame ? [patientivoSourceStageFrame] : [];
          pushPassiveTeDeletionAlternate(primary, subjectSuffix);
          alternates.forEach(entry => {
            const nextSuffix = applyPatientivoSuffix(entry.subjectSuffix);
            const alternateSourceStageFrame = buildSelectedPatientivoSourceStageFrame(entry, nextSuffix);
            if (alternateSourceStageFrame) {
              patientivoSourceStageFrames.push(alternateSourceStageFrame);
            }
            pushAlternateForm(entry.verb, nextSuffix, {
              formSpec: targetObject.withNominalFormSpecSuffix(entry.formSpec || null, nextSuffix, {
                verb: entry.verb,
                subjectSuffix: nextSuffix
              })
            });
            pushPassiveTeDeletionAlternate(entry, nextSuffix);
          });
          patientivoMultipleDerivationContract = typeof targetObject.buildPatientivoMultipleDerivationContract === "function" ? targetObject.buildPatientivoMultipleDerivationContract({
            patientivoInput,
            selectedSource: resolvedPatientivoFamily || patientivoSource,
            selectedStageFrame: patientivoSourceStageFrame,
            selectedOutputSurface: patientivoSourceStageFrame?.outputSurface || ""
          }) : null;
        }
      }
      const resolveOutputVerbForCurrentPrefixes = (verbValue = "", prefixOverrides = {}) => targetObject.resolveOptionalSupportiveOutputVerb({
        pers1: prefixOverrides.pers1 ?? subjectPrefix,
        obj1: prefixOverrides.obj1 ?? objectPrefix,
        tronco: verbValue,
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
      if (isPreteritAgentivoTense) {
        const hasPreteritAgentivePossessor = Boolean(possessivePrefix);
        const sourceObjectPrefix = hasPreteritAgentivePossessor && objectPrefix === "mu" ? "ne" : objectPrefix;
        const preteritAgentiveOutput = targetObject.buildClassBasedResultWithProvenance({
          ...pretDerivationSharedOptions,
          tense: "preterito",
          objectPrefix: sourceObjectPrefix,
          baseObjectPrefix: sourceObjectPrefix,
          subjectSuffix: baseSubjectSuffix,
          classFilter: targetObject.getCurrentResolvedConjugationSelectionState().classFilter,
          allowAllClasses: false,
          forceClassBOnly: isVerbNonactiveMode
        });
        const splitPreteritAgentiveForm = (formValue = "") => {
          const form = String(formValue || "").trim();
          if (!form || form === "—") {
            return null;
          }
          const subjectless = baseSubjectPrefix && form.startsWith(baseSubjectPrefix) ? form.slice(baseSubjectPrefix.length) : form;
          const suffixCandidates = baseSubjectSuffix === "t" ? ["ket"] : ["ki", "k"];
          for (const connector of suffixCandidates) {
            if (subjectless.endsWith(connector)) {
              const stem = subjectless.slice(0, -connector.length);
              if (!stem) {
                return null;
              }
              if (hasPreteritAgentivePossessor) {
                return {
                  verb: `${stem}ka`,
                  subjectSuffix: baseSubjectSuffix === "t" ? "wan" : "w"
                };
              }
              return {
                verb: stem,
                subjectSuffix: connector
              };
            }
          }
          return null;
        };
        const resolvedPreteritAgentiveEntries = getMorphologyApplicationSourceSurfaceForms(preteritAgentiveOutput).map(form => targetObject.resolveOptionalSupportiveOutputText({
          value: form,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        })).map(form => splitPreteritAgentiveForm(form)).filter(Boolean);
        if (!resolvedPreteritAgentiveEntries.length) {
          return returnMorphologyError("preterit-agentive-source-forms", "morphology-preterit-agentive-no-forms");
        }
        const [primaryEntry, ...alternateEntries] = resolvedPreteritAgentiveEntries;
        subjectPrefix = baseSubjectPrefix;
        objectPrefix = "";
        verb = primaryEntry.verb;
        subjectSuffix = primaryEntry.subjectSuffix;
        nounContextPrimaryFormSpec = targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix);
        alternateForms.length = 0;
        alternateEntries.forEach(entry => {
          pushAlternateForm(entry.verb, entry.subjectSuffix, {
            formSpec: targetObject.buildLiteralNominalFormSpec(entry.verb, entry.subjectSuffix),
            surfaceRuleMeta: pretSurfaceRuleMeta,
            nounDerivationKind: "agentivo-preterito",
            sourceTense: "preterito",
            provenance: preteritAgentiveOutput.provenance || null
          });
        });
      }
      if (targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalOutput = targetObject.buildPretUniversalResultWithProvenance(pretDerivationSharedOptions);
        const resolvedUniversalForms = getMorphologyApplicationSourceSurfaceForms(universalOutput).map(f => targetObject.resolveOptionalSupportiveOutputText({
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
          const nonactiveForms = getMorphologyApplicationSourceSurfaceForms(nonactiveResult);
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
        const classSoundSpellingFrames = getMorphologyApplicationSoundSpellingFrames(classOutput);
        const classSurfaceRuleMeta = classSoundSpellingFrames.length ? {
          ...(pretSurfaceRuleMeta || {}),
          soundSpellingFrames: classSoundSpellingFrames
        } : pretSurfaceRuleMeta;
        const resolvedClassForms = getMorphologyApplicationSourceSurfaceForms(classOutput).map(f => targetObject.resolveOptionalSupportiveOutputText({
          value: f,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        })).filter(Boolean);
        const primaryClassVerb = resolvedClassForms[0] || "—";
        resolvedClassForms.slice(1).forEach(f => pushAlternateForm(f, "", {
          surfaceRuleMeta: classSurfaceRuleMeta
        }));
        return {
          subjectPrefix: "",
          objectPrefix: "",
          subjectSuffix: "",
          verb: primaryClassVerb,
          alternateForms,
          surfaceRuleMeta: classSurfaceRuleMeta,
          soundSpellingFrames: classSoundSpellingFrames,
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
        obj1: objectPrefix,
        tronco: verb
      } = targetObject.realizeDerivedMuStemInteraction({
        obj1: objectPrefix,
        tronco: verb,
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
          return returnMorphologyError("potential-active-source-forms", "morphology-potential-active-no-forms");
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
        const nominalVerbMeta = resolveVerbDerivedNominalVerbMeta({
          preferCurrentDerivedStem: combinedMode === "nonactive"
        });
        const calificativoResult = targetObject.getCalificativoInstrumentivoResult({
          rawVerb: rawVerb || sourceRawVerb || rawAnalysisVerb || exactAnalysisVerb || analysisVerb || verb,
          verbMeta: nominalVerbMeta,
          subjectPrefix: baseSubjectPrefix,
          subjectSuffix: baseSubjectSuffix,
          objectPrefix: baseObjectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          possessivePrefix,
          actionNounStemUse,
          combinedMode
        });
        if (!calificativoResult || calificativoResult.error || !applyVerbDerivedNominalResultToMorphology(calificativoResult)) {
          return returnMorphologyError("calificativo-instrumentivo-direct-route", "morphology-calificativo-instrumentivo-route-blocked");
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
          return returnMorphologyError("instrumentivo-direct-route", "morphology-instrumentivo-route-blocked");
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
          return returnMorphologyError("locativo-temporal-direct-route", "morphology-locativo-temporal-route-blocked");
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
        const wrapperIndirectObjectMarker = isTroncoNajActiveWrapper ? targetObject.composeObj1Chain({
          obj1: "",
          markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
          pers1: baseSubjectPrefix
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
                    tronco: normalizedEntry.verb,
                    pers2: "ti",
                    sufijoNominal: troncoWrapperSuffix
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
                  tronco: normalizedEntry.verb,
                  pers2: normalizedEntry.subjectSuffix,
                  sufijoNominal: troncoWrapperSuffix
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
          let candidateForms = targetObject.selectPreferredActiveAdjectiveForms(getMorphologyApplicationSourceSurfaceForms(classOutput), {
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
          return returnMorphologyError("active-adjective-wrapper-forms", "morphology-active-adjective-wrapper-no-forms");
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
        if (subjectSuffix.startsWith("ni")) {
          verb = `${verb}ni`;
          subjectSuffix = subjectSuffix.slice(2);
          if (isNounContextFinal) {
            nounContextPrimaryFormSpec = targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix);
          }
        }
        if (alternateForms.length) {
          alternateForms.forEach(form => {
            if (!form) {
              return;
            }
            const formSuffix = typeof form.subjectSuffix === "string" ? form.subjectSuffix : baseSuffix;
            form.subjectSuffix = targetObject.applyAgentivoNumberSuffix(formSuffix, agentivoNumberSlot);
            if (form.subjectSuffix.startsWith("ni")) {
              form.verb = `${form.verb || verb.slice(0, -2)}ni`;
              form.subjectSuffix = form.subjectSuffix.slice(2);
            }
            if (isNounContextFinal) {
              form.formSpec = targetObject.withNominalFormSpecSuffix(form.formSpec || null, form.subjectSuffix, form);
            }
          });
        }
      }
      if (isFutureAgentivoTense) {
        const hasFutureAgentivePossessor = Boolean(possessivePrefix);
        const resolveFutureAgentivoParts = (stemValue = "", suffixValue = "") => {
          const futureSuffix = String(suffixValue || "");
          const isPluralConnector = futureSuffix === "sket";
          const hasFutureStemSuffix = futureSuffix === "s" || isPluralConnector;
          const stemWithFuture = `${stemValue || ""}${hasFutureStemSuffix ? "s" : ""}`;
          return {
            verb: `${stemWithFuture}${hasFutureAgentivePossessor ? "ka" : ""}`,
            subjectSuffix: hasFutureAgentivePossessor ? isPluralConnector ? "wan" : "w" : isPluralConnector ? "ket" : hasFutureStemSuffix ? "ki" : futureSuffix
          };
        };
        const primaryParts = resolveFutureAgentivoParts(verb, subjectSuffix);
        verb = primaryParts.verb;
        subjectSuffix = primaryParts.subjectSuffix;
        if (isNounContextFinal) {
          nounContextPrimaryFormSpec = targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix);
        }
        if (alternateForms.length) {
          alternateForms.forEach(form => {
            if (!form) {
              return;
            }
            const formParts = resolveFutureAgentivoParts(form.verb || verb, typeof form.subjectSuffix === "string" ? form.subjectSuffix : "");
            form.verb = formParts.verb;
            form.subjectSuffix = formParts.subjectSuffix;
            if (isNounContextFinal) {
              form.formSpec = targetObject.buildLiteralNominalFormSpec(form.verb, form.subjectSuffix);
            }
          });
        }
      }
      if (isPotencialNounLikeTense) {
        objectPrefix = "";
      }
      if (isSustantivoVerbalLikeTense) {
        const pluralSlot = sustantivoVerbalLikeNumberSlot === "t" ? "t" : "";
        const getSustantivoVerbalSuffixVariants = (stemValue = "", {
          suppressIEndingSVariant = false
        } = {}) => {
          const stem = typeof stemValue === "string" ? stemValue : "";
          const nominalizerContract = typeof targetObject.getActiveActionNominalizerContract === "function" ? targetObject.getActiveActionNominalizerContract() : null;
          const longNominalizer = nominalizerContract?.nawatSuffixes?.long || "lis";
          const shortNominalizer = nominalizerContract?.nawatSuffixes?.short || "s";
          const variants = [longNominalizer];
          if (stem.endsWith("i") && !suppressSustantivoIEndingSVariant && suppressIEndingSVariant !== true) {
            variants.push(shortNominalizer);
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
            const alternateSuppressIEndingSVariant = normalizedForm.suppressIEndingSVariant === true || form.suppressIEndingSVariant === true;
            const resolvedFormVariants = alternateSuppressIEndingSVariant ? getSustantivoVerbalSuffixVariants(formStem, {
              suppressIEndingSVariant: true
            }) : getSustantivoVerbalSuffixVariants(formStem);
            normalizedForm.subjectSuffix = resolvedFormVariants[0] || targetObject.applyAgentivoNumberSuffix("lis", pluralSlot);
            if (isNounContextFinal) {
              normalizedForm.formSpec = targetObject.withNominalFormSpecSuffix(normalizedForm.formSpec || null, normalizedForm.subjectSuffix, normalizedForm);
            }
            alternateForms[index] = normalizedForm;
            resolvedFormVariants.slice(1).forEach(value => {
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
        optativeKiReduction: tense === "optativo" && (baseSubjectPrefix === "ti" && baseSubjectSuffix === "" || baseSubjectPrefix === "an" && baseSubjectSuffix === "t"),
        dropVerbInitialIAfterObjectI: shouldApplyEarlyContactElision,
        dropInitialIFromIskaliaAfterMu: objectPrefix === "mu" || markerChain.includes("mu"),
        trimFinalIAUAVowel: tense === "optativo" || dropClassCNucleusTenses.has(tense),
        patientivoSourceStageFrame,
        patientivoSourceStageFrames,
        patientivoMultipleDerivationContract
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
      return attachMorphologyApplicationGrammarContract({
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        formSpec: isNounContextFinal ? nounContextPrimaryFormSpec || targetObject.buildLiteralNominalFormSpec(verb, subjectSuffix) : null,
        trailingSuffix: isNounContextFinal ? nounContextPrimaryTrailingSuffix : "",
        alternateForms: normalizedAlternateForms,
        surfaceRuleMeta,
        directionalChainMeta,
        soundSpellingFrames,
        stemProvenance: stemProvenanceSeed || null
      }, {
        routeStage: "apply",
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        rawVerb,
        sourceRawVerb,
        derivationType,
        patientivoSource,
        combinedMode,
        isNounContext: isNounContextFinal
      });
    }

    const api = {};
    Object.defineProperty(api, "MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE", {
        configurable: true,
        enumerable: true,
        get() { return MORPHOLOGY_APPLICATION_NO_OUTPUT_MESSAGE; },
    });
    api.normalizeMorphologyTenseValue = normalizeMorphologyTenseValue;
    api.buildMorphologyApplicationDiagnostic = buildMorphologyApplicationDiagnostic;
    api.getMorphologyApplicationDiagnosticLayerContract = getMorphologyApplicationDiagnosticLayerContract;
    api.normalizeMorphologyApplicationDiagnostics = normalizeMorphologyApplicationDiagnostics;
    api.normalizeMorphologyApplicationSurfaceValue = normalizeMorphologyApplicationSurfaceValue;
    api.splitMorphologyApplicationSurfaceText = splitMorphologyApplicationSurfaceText;
    api.getMorphologyApplicationResultFrame = getMorphologyApplicationResultFrame;
    api.getMorphologyApplicationSurfaceForms = getMorphologyApplicationSurfaceForms;
    api.getMorphologyApplicationSourceSurfaceForms = getMorphologyApplicationSourceSurfaceForms;
    api.getMorphologyApplicationSoundSpellingFrames = getMorphologyApplicationSoundSpellingFrames;
    api.buildMorphologyLesson2SoundSpellingFrame = buildMorphologyLesson2SoundSpellingFrame;
    api.pushMorphologyLesson2SoundSpellingFrame = pushMorphologyLesson2SoundSpellingFrame;
    api.getMorphologyApplicationAndrewsRefs = getMorphologyApplicationAndrewsRefs;
    api.attachMorphologyApplicationGrammarContract = attachMorphologyApplicationGrammarContract;
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
