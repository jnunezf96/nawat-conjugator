// Native wrapper generated from src/core/vnc/vnc.js.

export function createVncFacadeApi(targetObject = globalThis) {
    // Shared agreement combo validation extracted to src/core/agreement/combo_validation.js
    // Shared morphology support extracted to src/core/generation/morphology_support.js
    // Shared morphology engine extracted to src/core/generation/morphology_engine.js

    function parseAdjectivalNncFunctionEntryContract(dataset = {}) {
      const rawContract = String(dataset.adjectivalNncFunctionContract || "").trim();
      if (!rawContract) {
        return null;
      }
      try {
        const parsed = JSON.parse(rawContract);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch (_error) {
        return null;
      }
    }
    function normalizeAdjectivalNncFunctionSurfaceValue(value = "") {
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitAdjectivalNncFunctionSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeAdjectivalNncFunctionSurfaceValue(entry)).filter(Boolean);
    }
    function getAdjectivalNncFunctionEntryContractFrame(contract = null) {
      const source = contract && typeof contract === "object" ? contract : {};
      return (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
    }
    function getAdjectivalNncFunctionEntryContractSurface(contract = null) {
      const source = contract && typeof contract === "object" ? contract : {};
      const frame = getAdjectivalNncFunctionEntryContractFrame(source);
      const resultFrame = frame?.resultFrame && typeof frame.resultFrame === "object" ? frame.resultFrame : null;
      const forms = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
      }
      if (resultFrame) {
        return forms.flatMap(entry => splitAdjectivalNncFunctionSurfaceText(entry)).find(Boolean) || "";
      }
      if (source.surface) {
        forms.push(source.surface);
      }
      return forms.flatMap(entry => splitAdjectivalNncFunctionSurfaceText(entry)).find(Boolean) || "";
    }
    function resolveAdjectivalNncFunctionOverrideFromInput(verbInput = null) {
      const dataset = verbInput?.dataset || {};
      const currentSurface = String(verbInput?.value || "").trim();
      const entryRouteContract = parseAdjectivalNncFunctionEntryContract(dataset);
      const entryGrammarFrame = getAdjectivalNncFunctionEntryContractFrame(entryRouteContract);
      const targetSurface = getAdjectivalNncFunctionEntryContractSurface(entryRouteContract) || normalizeAdjectivalNncFunctionSurfaceValue(dataset.adjectivalNncFunctionSurface);
      if (!currentSurface || !targetSurface || currentSurface !== targetSurface) {
        return null;
      }
      const formation = String(dataset.adjectivalNncFormation || "").trim();
      const nominalizedVncKind = String(dataset.nominalizedVncKind || "").trim();
      const patientivoSource = String(dataset.patientivoSource || "").trim();
      const formulaEcho = String(dataset.adjectivalNncFormulaEcho || "").trim();
      const adjectivalNnc = {
        enabled: true,
        stem: targetSurface,
        surface: targetSurface,
        surfaceForms: targetSurface ? [targetSurface] : [],
        state: "absolutive",
        role: "predicate-surface"
      };
      if (entryGrammarFrame) {
        adjectivalNnc.grammarFrame = entryGrammarFrame;
        adjectivalNnc.frames = entryGrammarFrame;
      }
      if (formation) {
        adjectivalNnc.formation = formation;
      }
      if (formation === "patientive-adjectival") {
        adjectivalNnc.patientivoSurface = targetSurface;
        adjectivalNnc.patientivoSource = patientivoSource;
      }
      if (formation === "nominalized-vnc-adjectival") {
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.nominalizationProfile = {
          role: {
            nominalizationKind: nominalizedVncKind
          },
          predicateState: {
            value: "absolutive"
          }
        };
      }
      if (formulaEcho) {
        adjectivalNnc.formulaEcho = formulaEcho;
      }
      if (entryRouteContract) {
        adjectivalNnc.entryRouteContract = entryRouteContract;
        adjectivalNnc.sourceAuthorityRefs = Array.isArray(entryRouteContract.authorityRefs) ? entryRouteContract.authorityRefs.slice() : [];
        adjectivalNnc.sourceEvidenceStatus = entryRouteContract.evidenceStatus || "";
        adjectivalNnc.sourceRouteFamily = entryRouteContract.routeFamily || "";
        adjectivalNnc.sourceRouteStage = entryRouteContract.routeStage || "";
      }
      return {
        verb: targetSurface,
        tense: "adjectival-nnc",
        tenseMode: targetObject.TENSE_MODE.adjetivo,
        derivationMode: targetObject.DERIVATION_MODE.active,
        voiceMode: targetObject.VOICE_MODE.active,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        adjectivalNnc
      };
    }
    function generateWord(options = {}) {
      if (typeof targetObject.Event !== "undefined" && options instanceof targetObject.Event) {
        options = {};
      }
      options = targetObject.sanitizeGenerateWordOptions(options);
      const silent = options.silent === true;
      const subjectPrefixInput = targetObject.document.getElementById("subject-prefix");
      const subjectSuffixInput = targetObject.document.getElementById("subject-suffix");
      const verbInput = targetObject.document.getElementById("verb");
      const inputAdjectivalOverride = options.override ? null : resolveAdjectivalNncFunctionOverrideFromInput(verbInput);
      const override = options.override || inputAdjectivalOverride;
      if (inputAdjectivalOverride) {
        options = {
          ...options,
          override
        };
      }
      const verbInputSource = targetObject.resolveVerbInputSource(verbInput?.value || "");
      const prefixInputs = targetObject.getPrefixInputs({
        override,
        subjectPrefixInput,
        subjectSuffixInput,
        verbInput,
        verbInputSource
      });
      return targetObject.executeGenerateWordRequest({
        options,
        prefixInputs,
        liveInput: {
          hasVerbInput: Boolean(verbInput),
          verbInputValue: verbInput?.value || ""
        },
        uiHooks: {
          clearError: id => {
            if (silent) {
              return;
            }
            const el = targetObject.document.getElementById(id);
            if (el) {
              el.classList.remove("error");
            }
            if (id === "verb" && verbInput) {
              verbInput.classList.remove("error");
            }
          },
          setError: id => {
            if (silent) {
              return;
            }
            const el = targetObject.document.getElementById(id);
            if (el) {
              el.classList.add("error");
            }
            if (id === "verb" && verbInput) {
              verbInput.classList.add("error");
            }
          },
          onSearchQueryOnly: ({
            verbInputValue: currentValue
          }) => {
            targetObject.updateVerbRuleHint({
              verb: ""
            });
            targetObject.updateVerbDisambiguation("");
            targetObject.maybeAutoScrollToConjugationRow(currentValue, {
              allowSwitch: false
            });
          },
          onValidationError: ({
            tense,
            baseObjectPrefix
          }) => {
            targetObject.updateVerbRuleHint({
              verb: ""
            });
            targetObject.updateVerbDisambiguation("");
            targetObject.renderAllOutputs({
              verb: targetObject.getVerbInputMeta().displayVerb,
              objectPrefix: baseObjectPrefix,
              tense
            });
          },
          onVerbInputSync: ({
            nextVerbInputValue
          }) => {
            if (!verbInput) {
              return;
            }
            verbInput.value = nextVerbInputValue;
            verbInput.dataset.prevValue = nextVerbInputValue;
            targetObject.renderVerbMirror();
          },
          onVerbAnalysisResolved: ({
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
          }) => {
            targetObject.updateVerbRuleHint({
              verb,
              analysisVerb,
              exactBaseVerb: analysisExactVerb,
              objectPrefix: morphologyObjectPrefix,
              forceTransitive: forceTransitiveBase,
              isYawi,
              isWeya,
              ...targetObject.buildMorphologyMetaOptions(parsedVerb),
              derivationType: resolvedDerivationType
            });
            targetObject.updateVerbDisambiguation(verbInput ? verbInput.value : renderVerb);
          },
          onComplete: ({
            generatedText,
            parsedVerb,
            stemProvenance,
            tense,
            renderVerb,
            baseObjectPrefix
          }) => {
            targetObject.rememberScreenCalculatorAnsState({
              generatedText,
              parsedVerb,
              stemProvenance,
              tense
            });
            targetObject.renderAllOutputs({
              verb: renderVerb,
              objectPrefix: baseObjectPrefix,
              tense
            });
          }
        }
      });
    }

    const api = {};
    api.parseAdjectivalNncFunctionEntryContract = parseAdjectivalNncFunctionEntryContract;
    api.normalizeAdjectivalNncFunctionSurfaceValue = normalizeAdjectivalNncFunctionSurfaceValue;
    api.splitAdjectivalNncFunctionSurfaceText = splitAdjectivalNncFunctionSurfaceText;
    api.getAdjectivalNncFunctionEntryContractFrame = getAdjectivalNncFunctionEntryContractFrame;
    api.getAdjectivalNncFunctionEntryContractSurface = getAdjectivalNncFunctionEntryContractSurface;
    api.resolveAdjectivalNncFunctionOverrideFromInput = resolveAdjectivalNncFunctionOverrideFromInput;
    api.generateWord = generateWord;
    return api;
}

export function installVncFacadeGlobals(targetObject = globalThis) {
    const api = createVncFacadeApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
