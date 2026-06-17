// Native wrapper generated from src/core/generation/engine.js.

export function createGenerationEngineModule(targetObject = globalThis) {
    const NUCLEAR_CLAUSE_SURFACE_NOOP = () => {};
    const NUCLEAR_CLAUSE_SURFACE_ENGINE = Object.freeze({
      canonicalGenerateFunction: "generateNuclearClauseSurface",
      canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
      compatibilityGenerateFunction: "generateWord",
      compatibilityExecuteFunction: "executeGenerateWordRequest",
      generatedUnit: "nuclear-clause-surface"
    });
    function normalizeNuclearClauseSurfaceTenseValue(tenseValue = "") {
      return String(tenseValue || "").trim();
    }
    function resolveNuclearClauseSurfaceUiHook(uiHooks = null, key = "") {
      const hook = uiHooks && typeof uiHooks === "object" ? uiHooks[key] : null;
      return typeof hook === "function" ? hook : NUCLEAR_CLAUSE_SURFACE_NOOP;
    }
    function isOrdinaryNncGenerationOptIn(override = null) {
      const ordinaryNnc = override?.ordinaryNnc;
      return ordinaryNnc === true || ordinaryNnc && typeof ordinaryNnc === "object" && ordinaryNnc.enabled === true;
    }
    function isAdjectivalNncGenerationOptIn(override = null) {
      const adjectivalNnc = override?.adjectivalNnc;
      return adjectivalNnc === true || adjectivalNnc && typeof adjectivalNnc === "object" && adjectivalNnc.enabled === true;
    }
    function getOrdinaryNncGenerationOptions(override = null) {
      return override?.ordinaryNnc && typeof override.ordinaryNnc === "object" ? override.ordinaryNnc : {};
    }
    function getAdjectivalNncGenerationOptions(override = null) {
      return override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {};
    }
    function resolveAdjectivalNncGenerationSurface(adjectivalNnc = null, fields = [], fallback = "") {
      const source = adjectivalNnc && typeof adjectivalNnc === "object" ? adjectivalNnc : {};
      const framedSurface = resolveNuclearClauseSurfaceContractSurface(source);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(source)) {
        return "";
      }
      const fieldNames = Array.isArray(fields) ? fields : [fields];
      for (const fieldName of fieldNames) {
        const value = normalizeNuclearClauseSurfaceContractSurface(source[fieldName]);
        if (value) {
          return value;
        }
      }
      return normalizeNuclearClauseSurfaceContractSurface(fallback);
    }
    const NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE = "La generacion no produjo una forma.";
    const GENERATE_WORD_NO_OUTPUT_MESSAGE = NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE;
    const NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY = "nuclear-clause-surface";
    const NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID = "nuclear-clause-surface-route-blocked";
    const LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX = Object.freeze({
      nech: "n-ech",
      tech: "t-ech",
      metz: "m-etz",
      metzin: "m-etz-in",
      ki: "ki-0",
      k: "k-0",
      kin: "k-in"
    });
    const LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS = Object.freeze({
      ne: Object.freeze({
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline"
      }),
      te: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "human"
      }),
      ta: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "nonhuman"
      })
    });
    const NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS = Object.freeze([Object.freeze({
      id: "surface-output-not-grammar-source",
      lhs: "surface output",
      relation: "not-equal",
      rhs: "grammar source"
    }), Object.freeze({
      id: "formula-slot-not-literal-spelling",
      lhs: "formula slot",
      relation: "not-equal",
      rhs: "literal spelling"
    }), Object.freeze({
      id: "stem-not-whole-output",
      lhs: "stem",
      relation: "not-equal",
      rhs: "whole output"
    }), Object.freeze({
      id: "affix-not-stem",
      lhs: "affix",
      relation: "not-equal",
      rhs: "stem"
    }), Object.freeze({
      id: "derivation-inside-stem",
      lhs: "derivation",
      relation: "inside",
      rhs: "stem"
    }), Object.freeze({
      id: "inflection-outside-stem",
      lhs: "inflection",
      relation: "outside",
      rhs: "stem"
    }), Object.freeze({
      id: "vnc-nnc-not-word",
      lhs: "VNC/NNC",
      relation: "not-equal",
      rhs: "word"
    })]);
    function getLesson6DirectNawatReflexiveDyadForStem(stem = "") {
      const normalizedStem = String(stem || "").trim().replace(/^[^a-zA-Z]+/, "").replace(/[^a-zA-Z]+$/, "");
      if (!normalizedStem) {
        return "m-u";
      }
      if (typeof targetObject.applyObj1Allomorphy === "function") {
        const allomorphy = targetObject.applyObj1Allomorphy({
          verb: normalizedStem,
          analysisVerb: normalizedStem,
          obj1: "mu"
        });
        return allomorphy?.morphologyObj1 === "m" ? "m-0" : "m-u";
      }
      const shouldReduceMu = (typeof targetObject.startsWithICVCVPattern === "function" && targetObject.startsWithICVCVPattern(normalizedStem) || typeof targetObject.startsWithAlPrefix === "function" && targetObject.startsWithAlPrefix(normalizedStem) || typeof targetObject.startsWithACVlPattern === "function" && targetObject.startsWithACVlPattern(normalizedStem)) && !(typeof targetObject.startsWithAny === "function" && typeof targetObject.NONSPECIFIC_I_DROP_VERBS !== "undefined" && targetObject.startsWithAny(normalizedStem, targetObject.NONSPECIFIC_I_DROP_VERBS));
      return shouldReduceMu ? "m-0" : "m-u";
    }
    function splitLesson6DirectNawatDyad(value = "") {
      const directValue = String(value || "").trim();
      if (!directValue || !directValue.includes("-")) {
        return {
          va: directValue,
          va1: "",
          va2: "",
          functionalVa1: "",
          functionalVa2: ""
        };
      }
      if (directValue === "n-ech" || directValue === "t-ech" || directValue === "m-etz") {
        const [person, objective] = directValue.split("-");
        return {
          va: "",
          va1: person || "",
          va2: objective || "",
          functionalVa1: `${person || ""}-0`,
          functionalVa2: objective || "",
          val1Features: {
            person: person || "",
            number: "0"
          },
          val2Features: {
            objective: objective || ""
          },
          linearPieces: [person || "", objective || ""]
        };
      }
      if (directValue === "m-etz-in") {
        return {
          va: "",
          va1: "m",
          va2: "etz-in",
          functionalVa1: "m-in",
          functionalVa2: "etz",
          val1Features: {
            person: "m",
            number: "in"
          },
          val2Features: {
            objective: "etz"
          },
          linearPieces: ["m", "etz", "in"]
        };
      }
      if (directValue === "k-0" || directValue === "ki-0") {
        const [personCase, number] = directValue.split("-");
        return {
          va: "",
          va1: personCase || "",
          va2: number || "",
          functionalVa1: `${personCase || ""}-0`,
          functionalVa2: number || "0",
          val1Features: {
            person: personCase || "",
            objective: "0"
          },
          val2Features: {
            number: number || "0"
          },
          linearPieces: [personCase || "", number || "0"]
        };
      }
      if (directValue === "k-in") {
        return {
          va: "",
          va1: "k",
          va2: "in",
          functionalVa1: "k-0",
          functionalVa2: "in",
          val1Features: {
            person: "k",
            objective: "0"
          },
          val2Features: {
            number: "in"
          },
          linearPieces: ["k", "in"]
        };
      }
      if (directValue === "m-u" || directValue === "m-0") {
        const va2 = directValue === "m-0" ? "0" : "u";
        return {
          va: "",
          va1: "m",
          va2,
          functionalVa1: "m",
          functionalVa2: va2
        };
      }
      const parts = directValue.split("-");
      const va1 = parts[0] || "";
      const va2 = parts.slice(1).join("-") || "";
      return {
        va: "",
        va1,
        va2,
        functionalVa1: va1,
        functionalVa2: va2
      };
    }
    function getLesson6DirectNawatObjectDyadFrame(obj1 = "", {
      stem = "",
      pers1 = "",
      subjectPrefix = ""
    } = {}) {
      const normalized = String(obj1 || "").trim();
      if (!normalized) {
        return null;
      }
      const normalizedSubjectPrefix = String(subjectPrefix || pers1 || "").trim();
      const surfaceScopedPrefix = normalized === "ki" && (normalizedSubjectPrefix === "ni" || normalizedSubjectPrefix === "ti") ? "k" : normalized;
      const directDyad = surfaceScopedPrefix === "mu" ? getLesson6DirectNawatReflexiveDyadForStem(stem) : surfaceScopedPrefix.includes("-") ? surfaceScopedPrefix : LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX[surfaceScopedPrefix];
      if (directDyad) {
        const subslots = splitLesson6DirectNawatDyad(directDyad);
        return {
          sourcePrefix: normalized,
          surfaceScopedPrefix,
          visibleFormulaPrefix: directDyad,
          formulaPosition: "va1-va2",
          predicatePositionStatus: "dyadic",
          trajectory: surfaceScopedPrefix === "mu" || directDyad === "m-u" || directDyad === "m-0" ? "reflexive-reciprocative" : "projective",
          specificity: "specific",
          prominence: "mainline",
          va1: subslots.va1,
          va2: subslots.va2,
          functionalVa1: subslots.functionalVa1 || subslots.va1,
          functionalVa2: subslots.functionalVa2 || subslots.va2,
          val1Features: subslots.val1Features || null,
          val2Features: subslots.val2Features || null,
          linearPieces: subslots.linearPieces || null,
          directNawatGeneration: true
        };
      }
      const monadicFrame = LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS[normalized];
      if (monadicFrame) {
        return {
          sourcePrefix: normalized,
          visibleFormulaPrefix: normalized,
          formulaPosition: "va",
          predicatePositionStatus: "monadic",
          va: normalized,
          ...monadicFrame,
          directNawatGeneration: true
        };
      }
      return null;
    }
    function getLesson6DirectNawatFormulaObjectPrefix(obj1 = "", options = {}) {
      return getLesson6DirectNawatObjectDyadFrame(obj1, options)?.visibleFormulaPrefix || String(obj1 || "");
    }
    function getNuclearClauseSurfaceEngineInvariants() {
      return NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS.map(entry => ({
        ...entry
      }));
    }
    function buildNuclearClauseSurfaceEngineContract({
      routeFamily = "",
      routeStage = "",
      compatibilityFunction = NUCLEAR_CLAUSE_SURFACE_ENGINE.compatibilityExecuteFunction
    } = {}) {
      return {
        ...NUCLEAR_CLAUSE_SURFACE_ENGINE,
        routeFamily: String(routeFamily || ""),
        routeStage: String(routeStage || ""),
        compatibilityFunction: String(compatibilityFunction || ""),
        invariants: getNuclearClauseSurfaceEngineInvariants(),
        surfaceOutputIsGrammarSource: false,
        formulaSlotIsLiteralSpelling: false,
        stemIsWholeOutput: false,
        affixIsStem: false,
        derivationScope: "inside-stem",
        inflectionScope: "outside-stem",
        nuclearClauseIsWord: false
      };
    }
    function normalizeNuclearClauseSurfaceContractSurface(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitNuclearClauseSurfaceContractText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeNuclearClauseSurfaceContractSurface(entry)).filter(Boolean);
    }
    function getNuclearClauseSurfaceResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function getNuclearClauseSurfaceResultFramePayload(result = null) {
      const grammarFrame = getNuclearClauseSurfaceResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function resolveNuclearClauseSurfaceContractSurface(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      const hasResultFrame = Boolean(frameResult);
      const surfaceForms = normalizeGrammarFrameSurfaceForms(result);
      return normalizeNuclearClauseSurfaceContractSurface(surfaceForms[0] || frameResult?.surface || (!hasResultFrame ? result?.surface || result?.result : "") || "");
    }
    function resolveNuclearClauseSurfaceResultFrameSurface(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      if (!frameResult) {
        return "";
      }
      const frameForms = [];
      if (Array.isArray(frameResult.surfaceForms)) {
        frameForms.push(...frameResult.surfaceForms);
      }
      if (frameResult.surface) {
        frameForms.push(frameResult.surface);
      }
      return frameForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).find(Boolean) || "";
    }
    function resolveNuclearClauseSurfaceNominalConnectorSurface(connector = null, fallbackSurface = "") {
      const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(connector?.surface || fallbackSurface || "");
    }
    function resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(connector = null, fallbackSurface = "") {
      const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(connector?.displaySurface || connector?.displayConnector || connector?.surface || fallbackSurface || "");
    }
    function resolveNuclearClauseSurfaceFrameSourceInput({
      result = null,
      renderVerb = "",
      verb = ""
    } = {}) {
      const explicitRenderInput = normalizeNuclearClauseSurfaceContractSurface(renderVerb);
      if (explicitRenderInput) {
        return explicitRenderInput;
      }
      const framedSurface = resolveNuclearClauseSurfaceContractSurface(result);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(result)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(result?.stem) || normalizeNuclearClauseSurfaceContractSurface(verb);
    }
    function getNuclearClauseSurfaceSoundSpellingFrameKey(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      return [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
    }
    function collectNuclearClauseSurfaceSoundSpellingFrames(...sources) {
      const frames = [];
      const pushFrame = (frame = null) => {
        if (!frame || typeof frame !== "object" || !frame.ruleId) {
          return;
        }
        const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
        if (!key || frames.some(entry => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
          return;
        }
        frames.push({
          ...frame
        });
      };
      sources.forEach(source => {
        if (!source) {
          return;
        }
        if (Array.isArray(source)) {
          source.forEach(pushFrame);
          return;
        }
        if (typeof source === "object") {
          if (Array.isArray(source.soundSpellingFrames)) {
            source.soundSpellingFrames.forEach(pushFrame);
          }
          if (source.soundSpellingFrame && typeof source.soundSpellingFrame === "object") {
            pushFrame(source.soundSpellingFrame);
          }
          const grammarFrame = (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
          if (Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames)) {
            grammarFrame.orthographyFrame.soundSpellingFrames.forEach(pushFrame);
          }
        }
      });
      return frames;
    }
    const CNV_FORMULA_SURFACE_SLOT_ROLES = Object.freeze({
      pers1: Object.freeze(["pers1"]),
      pers2: Object.freeze(["pers2"]),
      va: Object.freeze(["obj1"]),
      va1: Object.freeze(["obj1"]),
      va2: Object.freeze(["obj1"]),
      base: Object.freeze(["tronco"]),
      tns: Object.freeze(["tronco", "pers2"]),
      num1: Object.freeze(["pers2"]),
      num2: Object.freeze(["pers2"])
    });
    function normalizeCnvSurfacePathSegments(segments = []) {
      if (typeof targetObject.normalizeOutputSurfaceSegments === "function") {
        return targetObject.normalizeOutputSurfaceSegments(segments);
      }
      return (Array.isArray(segments) ? segments : []).map(segment => ({
        role: String(segment?.role || ""),
        slot: String(segment?.slot || ""),
        value: String(segment?.value || ""),
        soundSpellingFrames: Array.isArray(segment?.soundSpellingFrames) ? segment.soundSpellingFrames.map(frame => ({
          ...frame
        })) : []
      })).filter(segment => segment.role || segment.slot || segment.value);
    }
    function getCnvSurfacePathSegmentValue(segments = [], role = "") {
      const normalizedRole = String(role || "");
      const match = normalizeCnvSurfacePathSegments(segments).find(segment => segment.role === normalizedRole || segment.slot === normalizedRole);
      return String(match?.value || "");
    }
    function splitGeneratedPreteritCnvFoldedConnector(value = "", sourceSubjectSuffix = "") {
      const text = String(value || "");
      if (!text) {
        return null;
      }
      const candidates = String(sourceSubjectSuffix || "") === "t" ? [{
        suffix: "ket",
        connector: "k-et",
        num1: "k",
        num2: "et"
      }] : [{
        suffix: "ki",
        connector: "ki-0",
        num1: "ki",
        num2: ""
      }, {
        suffix: "k",
        connector: "k-0",
        num1: "k",
        num2: ""
      }];
      const match = candidates.find(candidate => text.length > candidate.suffix.length && text.endsWith(candidate.suffix));
      if (!match) {
        return null;
      }
      return {
        base: text.slice(0, -match.suffix.length),
        connector: match.connector,
        num1: match.num1,
        num2: match.num2,
        suffix: match.suffix
      };
    }
    function buildGeneratedPreteritCnvConnectorProfile({
      tense = "",
      primaryVerb = "",
      alternateForms = [],
      sourceSubjectSuffix = ""
    } = {}) {
      if (String(tense || "") !== "preterito") {
        return null;
      }
      const entries = [];
      const addEntry = (verb = "") => {
        const split = splitGeneratedPreteritCnvFoldedConnector(verb, sourceSubjectSuffix);
        if (!split || !split.base) {
          return;
        }
        if (!entries.some(entry => entry.base === split.base && entry.connector === split.connector)) {
          entries.push(split);
        }
      };
      addEntry(primaryVerb);
      (Array.isArray(alternateForms) ? alternateForms : []).forEach(form => {
        addEntry(form?.verb || "");
      });
      if (!entries.length) {
        return null;
      }
      return {
        entries,
        primaryConnector: entries[0]?.connector || "",
        baseRealizations: entries.map(entry => entry.base).filter((entry, index, list) => entry && list.indexOf(entry) === index),
        connectorRealizations: entries.map(entry => entry.connector).filter((entry, index, list) => entry && list.indexOf(entry) === index)
      };
    }
    function getGeneratedPreteritFoldedObjectPrefix(obj1 = "", subjectPrefix = "") {
      const normalizedObj1 = String(obj1 || "").trim();
      if (normalizedObj1 === "ki" && (subjectPrefix === "ni" || subjectPrefix === "ti")) {
        return "k";
      }
      return normalizedObj1;
    }
    function stripCnvFormulaSurfacePrefix(base = "", prefix = "") {
      const normalizedBase = String(base || "");
      const prefixParts = String(prefix || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅");
      const normalizedPrefix = prefixParts.join("");
      if (!normalizedBase || !normalizedPrefix) {
        return normalizedBase;
      }
      return normalizedBase.startsWith(normalizedPrefix) ? normalizedBase.slice(normalizedPrefix.length) : normalizedBase;
    }
    function stripCnvFormulaSurfacePrefixWithTrace(base = "", prefix = "") {
      const normalizedBase = String(base || "");
      const prefixParts = String(prefix || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅");
      const candidates = [prefixParts.join(""), prefixParts[0] || ""].filter((candidate, index, list) => candidate && list.indexOf(candidate) === index);
      const matched = candidates.find(candidate => normalizedBase.startsWith(candidate)) || "";
      if (!normalizedBase || !matched) {
        return {
          base: normalizedBase,
          strippedPrefix: "",
          formulaPrefix: String(prefix || "")
        };
      }
      return {
        base: normalizedBase.slice(matched.length),
        strippedPrefix: matched,
        formulaPrefix: String(prefix || "")
      };
    }
    function getCnvFormulaFoldableBasePrefixes(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      return [slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "", slots.obj1?.displayPrefix || slots.obj1?.prefix || "", slots.obj2?.displayPrefix || slots.obj2?.prefix || "", slots.obj3?.displayPrefix || slots.obj3?.prefix || "", slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || ""];
    }
    function stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base = "", formulaSlots = null) {
      return getCnvFormulaFoldableBasePrefixes(formulaSlots).reduce((state, prefix) => {
        const stripped = stripCnvFormulaSurfacePrefixWithTrace(state.base, prefix);
        if (stripped.strippedPrefix) {
          state.strippedPrefixes.push({
            sourceSlot: "val1-val2",
            targetSlot: "base",
            relation: "copied-into-base",
            formulaPrefix: stripped.formulaPrefix,
            surfacePrefix: stripped.strippedPrefix
          });
        }
        state.base = stripped.base;
        return state;
      }, {
        base: String(base || ""),
        strippedPrefixes: []
      });
    }
    function stripCnvFormulaPreteritFoldedBasePrefixes(base = "", formulaSlots = null) {
      return stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base, formulaSlots).base;
    }
    function getCnvFormulaPreteritFoldedSurfaceSlots(formulaSlots = null, segments = []) {
      const tenseValue = String(formulaSlots?.tensePosition?.tenseValue || formulaSlots?.tensePosition?.compatibilityLabel || "");
      if (tenseValue !== "preterito") {
        return null;
      }
      const normalizedSegments = normalizeCnvSurfacePathSegments(segments);
      const hasSurfacePers2 = normalizedSegments.some(segment => (segment.role === "pers2" || segment.slot === "pers2") && String(segment.value || ""));
      if (hasSurfacePers2) {
        return null;
      }
      const tronco = getCnvSurfacePathSegmentValue(normalizedSegments, "tronco");
      const sourceConnector = String(formulaSlots?.num1Num2?.displayConnector || formulaSlots?.num1Num2?.connector || "");
      const sourceSubjectSuffix = sourceConnector === "k-et" ? "t" : "";
      const split = splitGeneratedPreteritCnvFoldedConnector(tronco, sourceSubjectSuffix) || splitGeneratedPreteritCnvFoldedConnector(tronco, "");
      if (!split) {
        return null;
      }
      const strippedBase = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(split.base, formulaSlots);
      const objectMorph = getCnvFormulaObjectMorph(formulaSlots);
      const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(formulaSlots);
      const [linearVa1, linearVa2] = objectMorph.includes("-") ? splitCnvFormulaSubslots(objectMorph) : [objectMorph, ""];
      const va1 = objectFunctionalSubslots?.va1 || linearVa1;
      const va2 = objectFunctionalSubslots?.va2 || linearVa2;
      return {
        base: strippedBase.base,
        baseCopyRelations: strippedBase.strippedPrefixes,
        ...(objectMorph && objectMorph !== "Ø" ? {
          va: objectMorph.includes("-") ? "" : objectMorph,
          va1: objectMorph.includes("-") ? va1 === "Ø" || va1 === "0" ? "" : va1 : "",
          va2: objectMorph.includes("-") ? va2 === "Ø" || va2 === "0" ? "" : va2 : ""
        } : {}),
        num1: split.num1,
        num2: split.num2,
        connector: split.connector
      };
    }
    function normalizeCnvFormulaMorphForSurface(value = "") {
      return String(value || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅").join("");
    }
    function getCnvFormulaSlotDisplayMorph(slotKey = "", slot = null) {
      const node = slot && typeof slot === "object" ? slot : {};
      switch (slotKey) {
        case "pers1Pers2":
          return `${String(node.displayPrefix || node.prefix || "Ø") || "Ø"}-${String(node.displayCase || node.case || node.pers2 || "Ø") || "Ø"}`;
        case "predicateStem":
          return String(node.displayStem || node.stem || "∅") || "∅";
        case "tensePosition":
          return String(node.displayMorph || node.morph || node.tenseMorph || "Ø") || "Ø";
        case "num1Num2":
          return String(node.displayConnector || node.connector || node.surface || "Ø-Ø") || "Ø-Ø";
        default:
          return String(node.displayPrefix || node.prefix || "Ø") || "Ø";
      }
    }
    function splitCnvFormulaSubslots(value = "") {
      const normalized = String(value || "").trim();
      if (!normalized) {
        return ["", ""];
      }
      if (!normalized.includes("-")) {
        return ["", normalized];
      }
      const parts = normalized.split("-");
      return [parts[0] || "", parts.slice(1).join("-") || ""];
    }
    function getCnvFormulaObjectMorph(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const reflexive = slots.reflexivo || {};
      const object = slots.obj1 || {};
      const reflexiveDisplay = String(reflexive.displayPrefix || reflexive.prefix || "");
      if (reflexiveDisplay && reflexiveDisplay !== "Ø") {
        return reflexiveDisplay;
      }
      return String(object.displayPrefix || object.prefix || "");
    }
    function getCnvFormulaObjectFunctionalSubslots(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const reflexive = slots.reflexivo || {};
      const object = slots.obj1 || {};
      const source = reflexive.lesson6DirectNawatDyad && String(reflexive.displayPrefix || reflexive.prefix || "") !== "Ø" ? reflexive.lesson6DirectNawatDyad : object.lesson6DirectNawatDyad;
      if (!source || typeof source !== "object" || source.formulaPosition !== "va1-va2") {
        return null;
      }
      const va1 = String(source.functionalVa1 || source.va1 || "");
      const va2 = String(source.functionalVa2 || source.va2 || "");
      if (!va1 && !va2) {
        return null;
      }
      return {
        va1,
        va2,
        val1Features: source.val1Features || null,
        val2Features: source.val2Features || null,
        visibleFormulaPrefix: String(source.visibleFormulaPrefix || ""),
        linearPieces: Array.isArray(source.linearPieces) ? source.linearPieces.slice() : []
      };
    }
    function buildCnvFormulaAndrewsPathSlots(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const subject = slots.pers1Pers2 || {};
      const predicate = slots.predicateStem || {};
      const tense = slots.tensePosition || {};
      const connector = slots.num1Num2 || {};
      const objectMorph = getCnvFormulaObjectMorph(slots);
      const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(slots);
      const connectorMorph = getCnvFormulaSlotDisplayMorph("num1Num2", connector);
      const [num1, num2] = splitCnvFormulaSubslots(connectorMorph);
      const connectorOptions = Array.isArray(connector.connectorOptions) ? connector.connectorOptions.slice() : [];
      const num1Options = Array.isArray(connector.num1Options) ? connector.num1Options.slice() : [];
      const num2Options = Array.isArray(connector.num2Options) ? connector.num2Options.slice() : [];
      const pathSlots = [{
        formulaSlotKey: "pers1",
        formulaSlot: "pers1",
        formulaRole: "subject",
        formulaMorph: String(subject.displayPrefix || subject.prefix || "Ø") || "Ø"
      }, {
        formulaSlotKey: "pers2",
        formulaSlot: "pers2",
        formulaRole: "subject",
        formulaMorph: String(subject.displayCase || subject.case || subject.pers2 || "Ø") || "Ø"
      }];
      if (objectMorph && objectMorph !== "Ø") {
        if (objectMorph.includes("-")) {
          const [va1, va2] = splitCnvFormulaSubslots(objectMorph);
          pathSlots.push({
            formulaSlotKey: "va1",
            formulaSlot: "va1",
            formulaRole: "valence",
            formulaMorph: objectFunctionalSubslots?.va1 || va1 || "Ø",
            surfaceValueOverride: objectFunctionalSubslots?.va1 || "",
            formulaFeatures: objectFunctionalSubslots?.val1Features || null,
            visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
            linearPieces: objectFunctionalSubslots?.linearPieces || []
          }, {
            formulaSlotKey: "va2",
            formulaSlot: "va2",
            formulaRole: "valence",
            formulaMorph: objectFunctionalSubslots?.va2 || va2 || "Ø",
            surfaceValueOverride: objectFunctionalSubslots?.va2 === "0" ? "" : objectFunctionalSubslots?.va2 || "",
            formulaFeatures: objectFunctionalSubslots?.val2Features || null,
            visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
            linearPieces: objectFunctionalSubslots?.linearPieces || []
          });
        } else {
          pathSlots.push({
            formulaSlotKey: "va",
            formulaSlot: "va",
            formulaRole: "valence",
            formulaMorph: objectMorph
          });
        }
      }
      pathSlots.push({
        formulaSlotKey: "base",
        formulaSlot: "base",
        formulaRole: "predicate",
        formulaMorph: getCnvFormulaSlotDisplayMorph("predicateStem", predicate)
      }, {
        formulaSlotKey: "tns",
        formulaSlot: "tns",
        formulaRole: "tense-mood",
        formulaMorph: getCnvFormulaSlotDisplayMorph("tensePosition", tense)
      }, {
        formulaSlotKey: "num1",
        formulaSlot: "num1",
        formulaRole: "subject-number",
        formulaMorph: num1 || "Ø",
        formulaOptions: num1Options,
        formulaDyadOptions: connectorOptions
      }, {
        formulaSlotKey: "num2",
        formulaSlot: "num2",
        formulaRole: "subject-number",
        formulaMorph: num2 || "Ø",
        formulaOptions: num2Options,
        formulaDyadOptions: connectorOptions
      });
      return pathSlots;
    }
    function getCnvFormulaSurfacePathFrames(soundSpellingFrames = [], roles = []) {
      const roleSet = new Set((Array.isArray(roles) ? roles : []).map(role => String(role || "")));
      return (Array.isArray(soundSpellingFrames) ? soundSpellingFrames : []).filter(frame => {
        const segmentRole = String(frame?.segmentRole || frame?.grammarSlot || "");
        return roleSet.has(segmentRole);
      }).map(frame => ({
        ...frame
      }));
    }
    function getCnvFormulaSurfacePathRecordKey(record = null) {
      const surface = String(record?.surface || "");
      const segments = normalizeCnvSurfacePathSegments(record?.segments || []);
      return `${surface}|${segments.map(segment => `${segment.role || segment.slot}:${segment.value}`).join("|")}`;
    }
    function buildCnvFormulaSurfacePathRecord({
      nuclearClauseShell = null,
      surfaceRecord = null,
      soundSpellingFrames = [],
      surfaceRealizationsBySlot = {}
    } = {}) {
      const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object" ? nuclearClauseShell.formulaSlots : null;
      if (!formulaSlots) {
        return null;
      }
      const segments = normalizeCnvSurfacePathSegments(surfaceRecord?.segments || []);
      const surface = String(surfaceRecord?.surface || "");
      const preteritFoldedSlots = getCnvFormulaPreteritFoldedSurfaceSlots(formulaSlots, segments);
      const paths = buildCnvFormulaAndrewsPathSlots(formulaSlots).map(pathSlot => {
        const slotKey = pathSlot.formulaSlotKey;
        const formulaMorph = pathSlot.formulaMorph;
        const surfaceRoles = CNV_FORMULA_SURFACE_SLOT_ROLES[slotKey] || [];
        const expectedSurfaceMorph = normalizeCnvFormulaMorphForSurface(formulaMorph);
        const activeSurfaceRoles = expectedSurfaceMorph ? surfaceRoles : [];
        const surfaceValuesByRole = activeSurfaceRoles.reduce((acc, role) => {
          acc[role] = getCnvSurfacePathSegmentValue(segments, role);
          return acc;
        }, {});
        const foldedSurfaceValue = preteritFoldedSlots && Object.prototype.hasOwnProperty.call(preteritFoldedSlots, slotKey) ? preteritFoldedSlots[slotKey] : null;
        const surfaceValue = foldedSurfaceValue !== null ? String(foldedSurfaceValue || "") : pathSlot.surfaceValueOverride !== undefined && pathSlot.surfaceValueOverride !== null ? String(pathSlot.surfaceValueOverride || "") : activeSurfaceRoles.map(role => surfaceValuesByRole[role] || "").join("");
        const status = (() => {
          if (!expectedSurfaceMorph && !surfaceValue) {
            return "matched-zero";
          }
          if (!expectedSurfaceMorph) {
            return "surface-carried-by-other-slot";
          }
          const normalizedSurfaceValue = normalizeCnvFormulaMorphForSurface(surfaceValue);
          if (surfaceValue === expectedSurfaceMorph || surfaceValue.includes(expectedSurfaceMorph) || normalizedSurfaceValue === expectedSurfaceMorph || normalizedSurfaceValue.includes(expectedSurfaceMorph)) {
            return "matched";
          }
          if (expectedSurfaceMorph && !surfaceValue) {
            return "formula-only";
          }
          return "surface-rule-required";
        })();
        return {
          formulaSlotKey: slotKey,
          formulaSlot: String(pathSlot.formulaSlot || slotKey),
          formulaRole: String(pathSlot.formulaRole || ""),
          formulaMorph,
          formulaFeatures: pathSlot.formulaFeatures || null,
          formulaOptions: Array.isArray(pathSlot.formulaOptions) ? pathSlot.formulaOptions.slice() : [],
          formulaDyadOptions: Array.isArray(pathSlot.formulaDyadOptions) ? pathSlot.formulaDyadOptions.slice() : [],
          visibleLinearMorph: String(pathSlot.visibleLinearMorph || ""),
          linearPieces: Array.isArray(pathSlot.linearPieces) ? pathSlot.linearPieces.slice() : [],
          expectedSurfaceMorph,
          surfaceRoles: activeSurfaceRoles,
          surfaceValuesByRole,
          surfaceValue,
          status,
          surfaceRealizations: Array.isArray(surfaceRealizationsBySlot[slotKey]) ? surfaceRealizationsBySlot[slotKey].slice() : [],
          surfaceCopyRelations: slotKey === "base" && Array.isArray(preteritFoldedSlots?.baseCopyRelations) ? preteritFoldedSlots.baseCopyRelations.map(relation => ({
            ...relation
          })) : [],
          soundSpellingFrames: getCnvFormulaSurfacePathFrames(soundSpellingFrames, surfaceRoles)
        };
      });
      return {
        surface,
        segments,
        paths,
        allSlotsConnected: paths.every(path => path.status !== "formula-only")
      };
    }
    function buildGeneratedCnvFormulaSurfacePath({
      nuclearClauseShell = null,
      surfaceRecord = null,
      surfaceRecords = [],
      soundSpellingFrames = []
    } = {}) {
      const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object" ? nuclearClauseShell.formulaSlots : null;
      if (!formulaSlots) {
        return null;
      }
      const orderedRecords = [];
      [surfaceRecord, ...(Array.isArray(surfaceRecords) ? surfaceRecords : [])].forEach(record => {
        if (!record || typeof record !== "object") {
          return;
        }
        const key = getCnvFormulaSurfacePathRecordKey(record);
        if (!key || orderedRecords.some(entry => getCnvFormulaSurfacePathRecordKey(entry) === key)) {
          return;
        }
        orderedRecords.push(record);
      });
      const pathRecordsWithoutAlternatives = orderedRecords.map(record => buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        surfaceRecord: record,
        soundSpellingFrames,
        surfaceRealizationsBySlot: {}
      })).filter(Boolean);
      const surfaceRealizationsBySlot = pathRecordsWithoutAlternatives.reduce((acc, record) => {
        (record.paths || []).forEach(path => {
          const slotKey = String(path.formulaSlotKey || "");
          const value = String(path.surfaceValue || "");
          if (!slotKey || !value) {
            return;
          }
          if (!acc[slotKey]) {
            acc[slotKey] = [];
          }
          if (!acc[slotKey].includes(value)) {
            acc[slotKey].push(value);
          }
        });
        return acc;
      }, {});
      const pathRecords = orderedRecords.map(record => buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        surfaceRecord: record,
        soundSpellingFrames,
        surfaceRealizationsBySlot
      })).filter(Boolean);
      const primaryPath = pathRecords[0] || buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        surfaceRecord,
        soundSpellingFrames,
        surfaceRealizationsBySlot
      });
      if (!primaryPath) {
        return null;
      }
      const surfaceNumberConnectorRealizations = pathRecords.map(record => {
        const bySlot = Object.fromEntries((Array.isArray(record.paths) ? record.paths : []).map(entry => [entry.formulaSlotKey, entry]));
        const num1 = String(bySlot.num1?.surfaceValue || "");
        const num2 = String(bySlot.num2?.surfaceValue || "");
        if (!num1 && !num2) {
          return "";
        }
        return `${num1 || "0"}-${num2 || "0"}`;
      }).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      return {
        unit: "CNV",
        formulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        ...primaryPath,
        surfaceStemRealizations: Array.isArray(surfaceRealizationsBySlot.base) ? surfaceRealizationsBySlot.base.slice() : [],
        surfaceNumberConnectorRealizations,
        pathsBySurface: pathRecords
      };
    }
    function buildNuclearClauseSurfaceDiagnosticEntry({
      id = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
      message = GENERATE_WORD_NO_OUTPUT_MESSAGE,
      severity = "error",
      failedLayer = "route",
      contractLayer = "routeContract",
      routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID).trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: String(severity || "error"),
        message: String(message || GENERATE_WORD_NO_OUTPUT_MESSAGE).trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: String(routeFamily || NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY).trim(),
        routeStage: String(routeStage || "").trim()
      };
    }
    function getNuclearClauseSurfaceFailedLayerContract(routeStage = "") {
      const stage = String(routeStage || "").trim();
      if (/morphology|stem/i.test(stage)) {
        return {
          failedLayer: "stem",
          contractLayer: "stemFrame"
        };
      }
      if (/orthography|spelling/i.test(stage)) {
        return {
          failedLayer: "orthography",
          contractLayer: "orthographyFrame"
        };
      }
      if (/agreement|participant|subject|object|possess/i.test(stage)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/output|result|surface|no-output/i.test(stage)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      return {
        failedLayer: "route",
        contractLayer: "routeContract"
      };
    }
    function normalizeNuclearClauseSurfaceDiagnosticEntries(diagnostics = [], fallbackDiagnostic = null) {
      const entries = Array.isArray(diagnostics) ? diagnostics : [];
      const normalized = entries.map(entry => {
        if (typeof targetObject.normalizeGrammarDiagnosticContractEntry === "function") {
          return targetObject.normalizeGrammarDiagnosticContractEntry(entry);
        }
        if (typeof entry === "string") {
          const id = entry.trim();
          return id ? {
            id,
            severity: "diagnostic",
            message: ""
          } : null;
        }
        return entry && typeof entry === "object" ? entry : null;
      }).filter(Boolean);
      if (!normalized.length && fallbackDiagnostic) {
        normalized.push(fallbackDiagnostic);
      }
      return normalized.filter((entry, index, list) => {
        const key = `${entry.id || entry.code || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || candidate.code || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode = "") {
      return resolvedTenseMode === targetObject.TENSE_MODE.sustantivo || resolvedTenseMode === targetObject.TENSE_MODE.adjetivo || resolvedTenseMode === targetObject.TENSE_MODE.adverbio ? "nominal-nuclear-clause" : "verbal-nuclear-clause";
    }
    function normalizeGrammarFrameSurfaceForms(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      const hasResultFrame = Boolean(frameResult);
      const surfaceForms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        surfaceForms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        surfaceForms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return surfaceForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        surfaceForms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        surfaceForms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        surfaceForms.push(result.result);
      }
      return surfaceForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function collectGrammarFrameRefsFromObject(source = null, refs = []) {
      if (!source || typeof source !== "object") {
        return refs;
      }
      [source.lessonRef, source.curriculumRef, source.range, source.andrewsRef, source.authorityRef].forEach(entry => {
        const value = String(entry || "").trim();
        if (value) {
          refs.push(value);
        }
      });
      if (Array.isArray(source.lessonRefs)) {
        source.lessonRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      if (Array.isArray(source.authorityRefs)) {
        source.authorityRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      if (Array.isArray(source.andrewsRefs)) {
        source.andrewsRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      return refs;
    }
    function isNuclearClauseSurfaceGrammarFrameCandidate(value = null) {
      return Boolean(value && typeof value === "object" && (value.authorityFrame || value.routeContract || value.resultFrame || value.diagnosticFrame));
    }
    function getNuclearClauseSurfaceOverrideSourceGrammarFrame(override = null) {
      const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
      const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object" ? adjectivalNnc.entryRouteContract : null;
      return [adjectivalNnc.grammarFrame, adjectivalNnc.frames, entryRouteContract?.grammarFrame, entryRouteContract?.frames, override?.grammarFrame, override?.frames].find(candidate => isNuclearClauseSurfaceGrammarFrameCandidate(candidate)) || null;
    }
    function getNuclearClauseSurfaceSourceEvidenceBoundaries(value = null) {
      return value?.boundaries && typeof value.boundaries === "object" ? value.boundaries : {};
    }
    function mergeNuclearClauseSurfaceSourceEvidence(primary = null, fallback = null) {
      const primaryEvidence = primary && typeof primary === "object" ? primary : null;
      const fallbackEvidence = fallback && typeof fallback === "object" ? fallback : null;
      if (!primaryEvidence) {
        return fallbackEvidence;
      }
      if (!fallbackEvidence) {
        return primaryEvidence;
      }
      const merged = {
        ...fallbackEvidence,
        ...primaryEvidence,
        kind: String(primaryEvidence.kind || primaryEvidence.sourceKind || primaryEvidence.type || fallbackEvidence.kind || fallbackEvidence.sourceKind || fallbackEvidence.type || "").trim(),
        status: String(primaryEvidence.status || primaryEvidence.evidenceStatus || primaryEvidence.validationStatus || fallbackEvidence.status || fallbackEvidence.evidenceStatus || fallbackEvidence.validationStatus || "").trim(),
        targetAuthority: String(primaryEvidence.targetAuthority || fallbackEvidence.targetAuthority || "").trim(),
        evidenceSource: String(primaryEvidence.evidenceSource || fallbackEvidence.evidenceSource || "").trim(),
        boundaries: {
          ...getNuclearClauseSurfaceSourceEvidenceBoundaries(fallbackEvidence),
          ...getNuclearClauseSurfaceSourceEvidenceBoundaries(primaryEvidence)
        }
      };
      if (merged.status && !merged.evidenceStatus) {
        merged.evidenceStatus = merged.status;
      }
      return merged;
    }
    function buildNuclearClauseSurfaceOverrideSourceEvidence(override = null) {
      const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
      if (!adjectivalNnc || !Object.keys(adjectivalNnc).length) {
        return null;
      }
      const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object" ? adjectivalNnc.entryRouteContract : null;
      const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
      const authorityFrame = sourceFrame?.authorityFrame && typeof sourceFrame.authorityFrame === "object" ? sourceFrame.authorityFrame : {};
      const routeContract = sourceFrame?.routeContract && typeof sourceFrame.routeContract === "object" ? sourceFrame.routeContract : {};
      const sourceContract = routeContract.sourceContract && typeof routeContract.sourceContract === "object" ? routeContract.sourceContract : {};
      const targetContract = routeContract.targetContract && typeof routeContract.targetContract === "object" ? routeContract.targetContract : {};
      const resultFrame = sourceFrame?.resultFrame && typeof sourceFrame.resultFrame === "object" ? sourceFrame.resultFrame : null;
      const sourceSurface = normalizeNuclearClauseSurfaceContractSurface((Array.isArray(resultFrame?.surfaceForms) ? resultFrame.surfaceForms[0] : "") || resultFrame?.surface || (!resultFrame ? adjectivalNnc.surface || adjectivalNnc.patientivoSurface || adjectivalNnc.nominalizedSurface || adjectivalNnc.vncSurface : "") || "");
      const hasEntryContract = Boolean(entryRouteContract);
      const hasSourceFrame = Boolean(sourceFrame);
      const sourceGenerated = resultFrame?.ok === true || routeContract.generationAllowed === true || entryRouteContract?.generationAllowed === true;
      if (!hasEntryContract && !hasSourceFrame && !adjectivalNnc.sourceEvidenceStatus && !adjectivalNnc.sourceRouteFamily) {
        return null;
      }
      const status = String(sourceGenerated ? "source-evidence-satisfied" : adjectivalNnc.sourceEvidenceStatus || entryRouteContract?.evidenceStatus || authorityFrame.evidenceStatus || "").trim();
      const sourceRouteFamily = String(adjectivalNnc.sourceRouteFamily || entryRouteContract?.routeFamily || routeContract.routeFamily || "").trim();
      const sourceRouteStage = String(adjectivalNnc.sourceRouteStage || entryRouteContract?.routeStage || routeContract.routeStage || "").trim();
      return {
        kind: String(adjectivalNnc.sourceEvidenceKind || "adjectival-nnc-function").trim(),
        status,
        evidenceStatus: status,
        targetAuthority: String(authorityFrame.grammarAuthority || "Andrews").trim(),
        evidenceSource: String(adjectivalNnc.sourceEvidenceSource || "linked-promoted grammar frame").trim(),
        sourceRouteFamily,
        sourceRouteStage,
        sourceOutputKind: String(resultFrame?.outputKind || targetContract.outputKind || "").trim(),
        sourceUnitKind: String(sourceFrame?.unitFrame?.unitKind || sourceContract.unitKind || "").trim(),
        sourceSurface,
        sourceCategory: String(sourceContract.sourceCategory || adjectivalNnc.sourceCategory || "").trim(),
        boundaries: {
          sourceEvidenceFromAndrewsContractRoute: Boolean(sourceRouteFamily),
          sourceEvidenceFromSelectedGeneratedStage: Boolean(sourceSurface && sourceGenerated),
          sourceEvidenceFromAdjectivalNncEntryContract: hasEntryContract,
          sourceEvidenceFromMirroredGrammarFrame: hasSourceFrame
        }
      };
    }
    function collectGrammarFrameAndrewsRefs(result = null, override = null) {
      const refs = [];
      const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
      const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
      const entryRouteContract = adjectivalNnc.entryRouteContract && typeof adjectivalNnc.entryRouteContract === "object" ? adjectivalNnc.entryRouteContract : null;
      [result, result?.grammarFrame?.authorityFrame, result?.frames?.authorityFrame, result?.adjectivalNncFunctionFrame, result?.rootPlusYaAdjectivalNncFrame, result?.denominalCompoundSourceFrame, result?.nominalizationProfile, result?.denominalFamilyProfile, result?.patientiveSourceStageFrame, result?.formationFrame, result?.adverbialNuclearFrame, result?.relationalNncBoundaryFrame, result?.placeGentilicNncBoundaryFrame, result?.adverbialAdjunctionBoundaryFrame, result?.sentenceLayer, adjectivalNnc, entryRouteContract, sourceFrame?.authorityFrame].forEach(entry => {
        collectGrammarFrameRefsFromObject(entry, refs);
      });
      return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function resolveGrammarFrameSourceEvidence(result = null, override = null) {
      const outputSourceEvidence = result?.sourceEvidence || result?.denominalFamilyProfile?.sourceEvidence || result?.formationFrame?.sourceEvidence || result?.patientiveSourceStageFrame?.sourceEvidence || null;
      return mergeNuclearClauseSurfaceSourceEvidence(outputSourceEvidence, buildNuclearClauseSurfaceOverrideSourceEvidence(override));
    }
    function resolveGrammarFrameAstFrame(result = null) {
      return result?.astFrame || result?.modificationAst || result?.adverbialAdjunctionAst || result?.complementClauseAst || result?.conjunctionClauseAst || result?.comparisonAst || result?.compoundFrame || null;
    }
    function buildNuclearClauseSurfaceGrammarFrame({
      result = null,
      override = null,
      resolvedTenseMode = "",
      tense = "",
      routeFamily = "",
      routeStage = "execute",
      unitKind = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      poseedor = "",
      posicionesFormula = null,
      verb = "",
      renderVerb = "",
      nuclearClauseShell = null,
      cnvFormulaSurfacePath = null,
      vncValencyFrame = null,
      resolvedDerivationMode = "",
      resolvedDerivationType = "",
      resolvedVoiceMode = ""
    } = {}) {
      if (typeof targetObject.buildGrammarFrame !== "function") {
        return null;
      }
      const output = result && typeof result === "object" ? result : {};
      const surface = resolveNuclearClauseSurfaceContractSurface(output);
      const surfaceForms = normalizeGrammarFrameSurfaceForms(output);
      const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
      const ok = Boolean(surface) && output.error !== true && output.supported !== false;
      const evidenceStatus = ok ? "generated" : diagnostics.length ? "blocked" : "pending";
      const activeRouteFamily = routeFamily || output.generationRoute || output.outputKind || "";
      const surfaceEngineContract = buildNuclearClauseSurfaceEngineContract({
        routeFamily: activeRouteFamily,
        routeStage
      });
      const sourceEvidence = resolveGrammarFrameSourceEvidence(output, override);
      const activeNuclearShell = nuclearClauseShell || output.nuclearClauseShell || null;
      const activeCnvFormulaSurfacePath = cnvFormulaSurfacePath || output.cnvFormulaSurfacePath || null;
      const activeSlotNameBridge = output.slotNameBridge || (typeof targetObject.buildNuclearClauseSurfaceSlotNameBridge === "function" ? targetObject.buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula) : null);
      const formulaSlots = activeNuclearShell?.formulaSlots || output.formulaSlots || null;
      const formulaEcho = activeNuclearShell?.formulaEcho || output.formulaEcho || "";
      const outputOrthographyFrame = output.orthographyFrame && typeof output.orthographyFrame === "object" ? output.orthographyFrame : null;
      const soundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(output.soundSpellingFrames, outputOrthographyFrame, output.targetContract);
      const adjectivalFunctionFrame = output.adjectivalNncFunctionFrame && typeof output.adjectivalNncFunctionFrame === "object" ? output.adjectivalNncFunctionFrame : {};
      const frameSourceInput = resolveNuclearClauseSurfaceFrameSourceInput({
        result: output,
        renderVerb,
        verb
      });
      const routeContract = typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
        routeFamily: activeRouteFamily,
        routeStage,
        sourceContract: {
          unitKind,
          tenseMode: resolvedTenseMode,
          tense,
          sourceEvidence,
          sourceRouteFamily: sourceEvidence?.sourceRouteFamily || "",
          sourceRouteStage: sourceEvidence?.sourceRouteStage || "",
          sourceOutputKind: sourceEvidence?.sourceOutputKind || "",
          sourceSurface: sourceEvidence?.sourceSurface || "",
          sourceCategory: adjectivalFunctionFrame.sourceCategory || "",
          sourceClauseKind: adjectivalFunctionFrame.sourceClauseKind || output.clauseKind || "",
          sourceVerb: adjectivalFunctionFrame.sourceVerb || "",
          sourceTenseValue: adjectivalFunctionFrame.sourceTenseValue || "",
          sourceCombinedMode: adjectivalFunctionFrame.sourceCombinedMode || "",
          sourceVoiceMode: adjectivalFunctionFrame.sourceVoiceMode || ""
        },
        targetContract: {
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily,
          surfaceEngineContract
        },
        generationAllowed: ok,
        blockingDiagnostics: ok ? [] : diagnostics
      }) : null;
      const resultFrame = typeof targetObject.buildGrammarResultFrame === "function" ? {
        ...targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms,
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily,
          sourceInput: frameSourceInput,
          provenance: output.stemProvenance || output.provenance || null,
          continuation: output.continuation || null
        }),
        surfaceOutputIsGrammarSource: false,
        nuclearClauseIsWord: false
      } : null;
      const diagnosticFrame = typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
        status: ok ? "generated" : evidenceStatus,
        diagnostics,
        blockers: ok ? [] : diagnostics
      }) : null;
      const authorityFrame = typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
        sourceEvidence,
        evidenceStatus,
        andrewsRefs: collectGrammarFrameAndrewsRefs(output, override),
        supported: ok
      }) : null;
      return targetObject.buildGrammarFrame({
        authorityFrame,
        unitFrame: {
          unitKind,
          tenseMode: resolvedTenseMode,
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily
        },
        orthographyFrame: {
          surface,
          surfaceForms,
          soundSpellingFrames,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          formulaSlots,
          formulaEcho: String(formulaEcho || ""),
          cnvFormulaSurfacePath: activeCnvFormulaSurfacePath,
          formulaSlotIsLiteralSpelling: false,
          invariants: surfaceEngineContract.invariants
        },
        stemFrame: {
          stem: normalizeNuclearClauseSurfaceContractSurface(output.stem) || frameSourceInput,
          sourceStem: String(output.sourceStem || output.stemProvenance?.sourceStem || ""),
          stemProvenance: output.stemProvenance || null,
          verbstemClassProfile: output.verbstemClassProfile || output.stemProvenance?.verbstemClassProfile || null,
          stemIsWholeOutput: false,
          affixIsStem: false,
          derivationScope: surfaceEngineContract.derivationScope
        },
        nuclearClauseFrame: activeNuclearShell,
        participantFrame: {
          posicionesFormula: posicionesFormula && typeof posicionesFormula === "object" ? {
            ...posicionesFormula
          } : null,
          slotNameBridge: activeSlotNameBridge,
          pers1Pers2: {
            prefix: String(pers1 || ""),
            suffix: String(pers2 || "")
          },
          obj1: {
            prefix: String(obj1 || "")
          },
          poseedor: {
            prefix: String(poseedor || "")
          },
          valenceFrame: vncValencyFrame || output.vncValencyFrame || null
        },
        inflectionFrame: {
          tenseMode: resolvedTenseMode,
          tiempo: tense,
          tense,
          derivationMode: resolvedDerivationMode,
          derivationType: resolvedDerivationType,
          voiceMode: resolvedVoiceMode,
          state: output.state || "",
          sourceTenseValue: adjectivalFunctionFrame.sourceTenseValue || "",
          sourceCombinedMode: adjectivalFunctionFrame.sourceCombinedMode || "",
          sourceVoiceMode: adjectivalFunctionFrame.sourceVoiceMode || "",
          inflectionScope: surfaceEngineContract.inflectionScope,
          inflectionInsideStem: false
        },
        routeContract,
        astFrame: resolveGrammarFrameAstFrame(output),
        resultFrame,
        diagnosticFrame
      });
    }
    function buildNuclearClauseSurfaceResultContract(resultPayload = null, grammarFrame = null) {
      if (typeof targetObject.buildGrammarResultContract === "function") {
        return targetObject.buildGrammarResultContract({
          result: resultPayload,
          grammarFrame
        });
      }
      const surface = resolveNuclearClauseSurfaceContractSurface(resultPayload);
      return {
        ok: Boolean(surface) && resultPayload?.error !== true && resultPayload?.supported !== false,
        surface,
        frames: grammarFrame,
        diagnostics: Array.isArray(resultPayload?.diagnostics) ? resultPayload.diagnostics : []
      };
    }
    function stripGeneratedVncFormulaTenseSuffix(stem = "", tense = "", sourceSubjectSuffix = "") {
      const value = String(stem || "");
      if (!value) {
        return "";
      }
      const suffixes = [];
      const rules = typeof targetObject.TENSE_SUFFIX_RULES === "object" && targetObject.TENSE_SUFFIX_RULES ? targetObject.TENSE_SUFFIX_RULES[String(tense || "")] : null;
      const sourceSuffix = String(sourceSubjectSuffix || "");
      if (rules && Object.prototype.hasOwnProperty.call(rules, sourceSuffix)) {
        suffixes.push(String(rules[sourceSuffix] || ""));
      }
      if (String(tense || "") === "preterito") {
        suffixes.push(sourceSuffix === "t" ? "ket" : "k");
        suffixes.push("k");
      }
      const suffix = suffixes.filter(Boolean).sort((left, right) => right.length - left.length).find(candidate => value.length > candidate.length && value.endsWith(candidate));
      return suffix ? value.slice(0, -suffix.length) : value;
    }
    function attachNuclearClauseSurfaceContractProperties(resultPayload = null, resultContract = null, grammarFrame = null, {
      enumerable = false
    } = {}) {
      if (!resultPayload || typeof resultPayload !== "object") {
        return resultPayload;
      }
      const contract = resultContract || buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || buildNuclearClauseSurfaceEngineContract();
      Object.defineProperties(resultPayload, {
        surfaceEngineContract: {
          configurable: true,
          enumerable,
          writable: true,
          value: surfaceEngineContract
        },
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
          value: contract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.frames
        }
      });
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "diagnostics")) {
        Object.defineProperty(resultPayload, "diagnostics", {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.diagnostics
        });
      }
      return resultPayload;
    }
    function buildNuclearClauseSurfaceBlockedResult({
      result = null,
      message = GENERATE_WORD_NO_OUTPUT_MESSAGE,
      diagnosticId = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
      routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      routeStage = "validate",
      resultMarker = "—",
      override = null,
      resolvedTenseMode = "",
      tense = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      poseedor = "",
      posicionesFormula = null,
      verb = "",
      renderVerb = "",
      isReflexive = false,
      resolvedDerivationMode = "",
      resolvedDerivationType = "",
      resolvedVoiceMode = "",
      nuclearClauseShell = null,
      vncValencyFrame = null,
      enumerableContract = false
    } = {}) {
      const resultPayload = result && typeof result === "object" ? result : {};
      if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "result")) {
        resultPayload.result = resultMarker;
      }
      if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "surfaceForms")) {
        resultPayload.surfaceForms = [];
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "error")) {
        resultPayload.error = true;
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "isReflexive")) {
        resultPayload.isReflexive = isReflexive;
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "posicionesFormula")) {
        resultPayload.posicionesFormula = posicionesFormula && typeof posicionesFormula === "object" ? {
          ...posicionesFormula
        } : null;
      }
      const failedLayerContract = getNuclearClauseSurfaceFailedLayerContract(routeStage);
      const fallbackDiagnostic = buildNuclearClauseSurfaceDiagnosticEntry({
        id: diagnosticId,
        message,
        ...failedLayerContract,
        routeFamily,
        routeStage
      });
      resultPayload.diagnostics = normalizeNuclearClauseSurfaceDiagnosticEntries(resultPayload.diagnostics, fallbackDiagnostic);
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily,
        routeStage,
        unitKind: resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode),
        pers1,
        pers2,
        obj1,
        poseedor,
        posicionesFormula,
        verb,
        renderVerb,
        nuclearClauseShell,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      return attachNuclearClauseSurfaceContractProperties(resultPayload, resultContract, grammarFrame, {
        enumerable: enumerableContract
      });
    }
    function resolveGenerateWordUiHook(uiHooks = null, key = "") {
      return resolveNuclearClauseSurfaceUiHook(uiHooks, key);
    }
    function normalizeGenerateWordContractSurface(value = "") {
      return normalizeNuclearClauseSurfaceContractSurface(value);
    }
    function splitGenerateWordContractSurfaceText(value = "") {
      return splitNuclearClauseSurfaceContractText(value);
    }
    function getGenerateWordResultFrame(result = null) {
      return getNuclearClauseSurfaceResultFrame(result);
    }
    function getGenerateWordResultFramePayload(result = null) {
      return getNuclearClauseSurfaceResultFramePayload(result);
    }
    function resolveGenerateWordContractSurface(result = null) {
      return resolveNuclearClauseSurfaceContractSurface(result);
    }
    function resolveGenerateWordResultFrameSurface(result = null) {
      return resolveNuclearClauseSurfaceResultFrameSurface(result);
    }
    function resolveGenerateWordNominalConnectorSurface(connector = null, fallbackSurface = "") {
      return resolveNuclearClauseSurfaceNominalConnectorSurface(connector, fallbackSurface);
    }
    function resolveGenerateWordNominalConnectorDisplaySurface(connector = null, fallbackSurface = "") {
      return resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(connector, fallbackSurface);
    }
    function resolveGenerateWordFrameSourceInput(options = {}) {
      return resolveNuclearClauseSurfaceFrameSourceInput(options);
    }
    function buildGenerateWordDiagnosticEntry(options = {}) {
      return buildNuclearClauseSurfaceDiagnosticEntry(options);
    }
    function getGenerateWordFailedLayerContract(routeStage = "") {
      return getNuclearClauseSurfaceFailedLayerContract(routeStage);
    }
    function normalizeGenerateWordDiagnosticEntries(diagnostics = [], fallbackDiagnostic = null) {
      return normalizeNuclearClauseSurfaceDiagnosticEntries(diagnostics, fallbackDiagnostic);
    }
    function resolveGenerateWordUnitKind(resolvedTenseMode = "") {
      return resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode);
    }
    function isGenerateWordGrammarFrameCandidate(value = null) {
      return isNuclearClauseSurfaceGrammarFrameCandidate(value);
    }
    function getGenerateWordOverrideSourceGrammarFrame(override = null) {
      return getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
    }
    function getGenerateWordSourceEvidenceBoundaries(value = null) {
      return getNuclearClauseSurfaceSourceEvidenceBoundaries(value);
    }
    function mergeGenerateWordSourceEvidence(primary = null, fallback = null) {
      return mergeNuclearClauseSurfaceSourceEvidence(primary, fallback);
    }
    function buildGenerateWordOverrideSourceEvidence(override = null) {
      return buildNuclearClauseSurfaceOverrideSourceEvidence(override);
    }
    function buildGenerateWordGrammarFrame(options = {}) {
      return buildNuclearClauseSurfaceGrammarFrame(options);
    }
    function buildGenerateWordResultContract(resultPayload = null, grammarFrame = null) {
      return buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
    }
    function attachGenerateWordContractProperties(resultPayload = null, resultContract = null, grammarFrame = null, options = {}) {
      return attachNuclearClauseSurfaceContractProperties(resultPayload, resultContract, grammarFrame, options);
    }
    function buildGenerateWordBlockedResult(options = {}) {
      return buildNuclearClauseSurfaceBlockedResult(options);
    }
    function executeAdjectivalNncGenerationRoute({
      override = null,
      verb = "",
      pers1 = "",
      pers2 = "",
      obj1 = ""
    } = {}) {
      const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
      const adjectivalPers1 = adjectivalNnc.pers1 ?? pers1;
      const adjectivalPers2 = adjectivalNnc.pers2 ?? adjectivalNnc.num2 ?? pers2;
      const adjectivalObj1 = adjectivalNnc.obj1 ?? obj1;
      const shouldUseIntensifiedRoute = typeof targetObject.shouldGenerateIntensifiedAdjectivalNnc === "function" && targetObject.shouldGenerateIntensifiedAdjectivalNnc(adjectivalNnc);
      const shouldUseVncRoute = typeof targetObject.shouldGenerateVncAdjectivalNnc === "function" && targetObject.shouldGenerateVncAdjectivalNnc(adjectivalNnc);
      const shouldUseCompoundSourceRoute = typeof targetObject.shouldGenerateCompoundSourceAdjectivalNnc === "function" && targetObject.shouldGenerateCompoundSourceAdjectivalNnc(adjectivalNnc);
      const shouldUseDenominalCompoundRoute = typeof targetObject.shouldGenerateDenominalCompoundAdjectivalNnc === "function" && targetObject.shouldGenerateDenominalCompoundAdjectivalNnc(adjectivalNnc);
      const shouldUsePatientiveRoute = typeof targetObject.shouldGeneratePatientiveAdjectivalNnc === "function" && targetObject.shouldGeneratePatientiveAdjectivalNnc(adjectivalNnc);
      const shouldUseNominalizedVncRoute = typeof targetObject.shouldGenerateNominalizedVncAdjectivalNnc === "function" && targetObject.shouldGenerateNominalizedVncAdjectivalNnc(adjectivalNnc);
      const shouldUseRootPlusYaRoute = typeof targetObject.shouldGenerateRootPlusYaAdjectivalNnc === "function" && targetObject.shouldGenerateRootPlusYaAdjectivalNnc(adjectivalNnc);
      const shouldUseOrdinaryAbsolutiveRoute = String(adjectivalNnc.formation || "").trim() === "ordinary-absolutive";
      const result = shouldUseIntensifiedRoute && typeof targetObject.buildIntensifiedAdjectivalNncOutput === "function" ? targetObject.buildIntensifiedAdjectivalNncOutput({
        sourceSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["sourceSurface", "surface", "stem"], verb),
        sourceFormulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
        sourceFormulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUseVncRoute && typeof targetObject.buildVncAdjectivalNncFunctionOutput === "function" ? targetObject.buildVncAdjectivalNncFunctionOutput({
        vncSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["vncSurface", "surface", "stem"], verb),
        sourceVerb: adjectivalNnc.sourceVerb ?? verb,
        sourceTenseValue: adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? "",
        sourceCombinedMode: adjectivalNnc.sourceCombinedMode ?? "",
        sourceVoiceMode: adjectivalNnc.sourceVoiceMode ?? "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUseCompoundSourceRoute && typeof targetObject.buildCompoundSourceAdjectivalNncFunctionOutput === "function" ? targetObject.buildCompoundSourceAdjectivalNncFunctionOutput({
        compoundSourceSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["compoundSourceSurface", "nominalizedSurface", "surface", "stem"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        sourceCompoundFrame: adjectivalNnc.sourceCompoundFrame || adjectivalNnc.compoundFrame || null,
        nominalizationKind: adjectivalNnc.nominalizedVncKind || adjectivalNnc.nominalizationProfile?.role?.nominalizationKind || "",
        nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
        formulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
        formulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUseDenominalCompoundRoute && typeof targetObject.buildDenominalCompoundAdjectivalNncFunctionOutput === "function" ? targetObject.buildDenominalCompoundAdjectivalNncFunctionOutput({
        denominalCompoundSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["denominalCompoundSurface", "nominalizedSurface", "surface", "stem"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        sourceDenominalCompoundFrame: adjectivalNnc.sourceDenominalCompoundFrame || adjectivalNnc.denominalCompoundFrame || null,
        formulaSlots: adjectivalNnc.sourceFormulaSlots || adjectivalNnc.formulaSlots || null,
        formulaEcho: adjectivalNnc.sourceFormulaEcho || adjectivalNnc.formulaEcho || "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUseNominalizedVncRoute && typeof targetObject.buildNominalizedVncAdjectivalNncFunctionOutput === "function" ? targetObject.buildNominalizedVncAdjectivalNncFunctionOutput({
        nominalizedSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["nominalizedSurface", "surface", "stem"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
        formulaSlots: adjectivalNnc.formulaSlots || null,
        formulaEcho: adjectivalNnc.formulaEcho || "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUsePatientiveRoute && typeof targetObject.buildPatientivoAdjectivalNncFunctionOutput === "function" ? targetObject.buildPatientivoAdjectivalNncFunctionOutput({
        patientivoSurface: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["patientivoSurface", "surface", "stem"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        patientivoSource: adjectivalNnc.patientivoSource ?? "",
        sourceTenseValue: adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? "",
        sourceCombinedMode: adjectivalNnc.sourceCombinedMode ?? "",
        nominalizationProfile: adjectivalNnc.nominalizationProfile || null,
        formulaSlots: adjectivalNnc.formulaSlots || null,
        formulaEcho: adjectivalNnc.formulaEcho || "",
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : shouldUseOrdinaryAbsolutiveRoute && typeof targetObject.generateAdjectivalNncFunctionOutput === "function" ? targetObject.generateAdjectivalNncFunctionOutput({
        stem: String(adjectivalNnc.sourceStem || adjectivalNnc.predicateStem || adjectivalNnc.stem || verb || "").trim(),
        state: adjectivalNnc.state ?? "absolutive",
        subject: {
          subjectPrefix: adjectivalPers1,
          subjectSuffix: adjectivalPers2,
          personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? ""
        },
        number: adjectivalNnc.number ?? "singular",
        pluralType: adjectivalNnc.pluralType ?? "auto",
        nounClass: adjectivalNnc.nounClass ?? "",
        animacy: adjectivalNnc.animacy ?? "",
        role: adjectivalNnc.role ?? "modifier-candidate"
      }) : shouldUseRootPlusYaRoute && typeof targetObject.generateRootPlusYaAdjectivalNncOutput === "function" ? targetObject.generateRootPlusYaAdjectivalNncOutput({
        stem: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["stem", "surface"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        subject: {
          subjectPrefix: adjectivalPers1,
          subjectSuffix: adjectivalPers2,
          personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? ""
        },
        role: adjectivalNnc.role ?? "predicate-surface"
      }) : typeof targetObject.generateAdjectivalNncFunctionOutput === "function" ? targetObject.generateAdjectivalNncFunctionOutput({
        stem: resolveAdjectivalNncGenerationSurface(adjectivalNnc, ["stem", "surface"], verb),
        state: adjectivalNnc.state ?? "absolutive",
        subject: {
          subjectPrefix: adjectivalPers1,
          subjectSuffix: adjectivalPers2,
          personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? ""
        },
        number: adjectivalNnc.number ?? "singular",
        pluralType: adjectivalNnc.pluralType ?? "auto",
        nounClass: adjectivalNnc.nounClass ?? "",
        animacy: adjectivalNnc.animacy ?? "",
        role: adjectivalNnc.role ?? "modifier-candidate"
      }) : {
        outputKind: "adjectival-nnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(adjectivalNnc.stem ?? verb ?? ""),
        state: adjectivalNnc.state ?? "absolutive",
        generationRoute: "adjectival-nnc",
        diagnostics: [{
          id: "adjectival-nnc-unavailable",
          severity: "error",
          message: "Adjectival NNC function generation is unavailable."
        }]
      };
      const resultClauseKind = result.clauseKind || "nominal-nuclear-clause";
      const isVerbalAdjectivalFunction = resultClauseKind === "verbal-nuclear-clause";
      const nuclearClauseShell = typeof targetObject.buildNuclearClauseShellMetadata === "function" ? targetObject.buildNuclearClauseShellMetadata({
        clauseKind: resultClauseKind,
        formulaSlots: result.adjectivalNncFunctionFrame?.sourceFormulaSlots || result.nncBasic?.formulaSlots || result.clauseFrame?.formulaSlots || null,
        formulaEcho: result.adjectivalNncFunctionFrame?.sourceFormulaEcho || result.nncBasic?.formulaEcho || result.clauseFrame?.formulaEcho || "",
        subject: {
          subjectPrefix: adjectivalPers1,
          subjectSuffix: adjectivalPers2
        },
        object: {
          objectPrefix: adjectivalObj1
        },
        predicate: {
          stem: result.stem || adjectivalNnc.stem || verb,
          state: result.state || (isVerbalAdjectivalFunction ? "" : "absolutive")
        },
        predicateState: result.state || (isVerbalAdjectivalFunction ? "" : "absolutive"),
        tenseValue: isVerbalAdjectivalFunction ? adjectivalNnc.sourceTenseValue ?? adjectivalNnc.sourceTense ?? result.tense ?? "" : ""
      }) : null;
      const sentenceLayer = typeof targetObject.buildGeneratedSentenceLayerMetadata === "function" ? targetObject.buildGeneratedSentenceLayerMetadata({
        override,
        tense: result.tense || adjectivalNnc.targetTense || "",
        nuclearClauseShell,
        clauseKind: resultClauseKind
      }) : null;
      const adjectivalSourceStem = String(result.sourceStem || result.adjectivalNncFunctionFrame?.sourceFormulaSlots?.predicateStem?.stem || result.adjectivalNncFunctionFrame?.sourcePredicateStem || "").trim();
      const resultPayload = {
        ...result,
        generationRoute: "adjectival-nnc",
        isReflexive: false,
        sourceStem: adjectivalSourceStem,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer
      };
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode: targetObject.TENSE_MODE.adjetivo,
        tense: result.tense || adjectivalNnc.targetTense || "adjectival-nnc",
        routeFamily: "adjectival-nnc",
        routeStage: "execute",
        unitKind: resultClauseKind === "verbal-nuclear-clause" ? "verbal-nuclear-clause" : "ordinary-nnc",
        pers1: adjectivalPers1,
        pers2: adjectivalPers2,
        obj1: adjectivalObj1,
        verb,
        renderVerb: resolveNuclearClauseSurfaceFrameSourceInput({
          result: resultPayload,
          verb: result.stem || verb
        }),
        nuclearClauseShell
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
      return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract
      };
    }
    function executeOrdinaryNncGenerationRoute({
      override = null,
      verb = "",
      pers1 = "",
      pers2 = "",
      poseedor = ""
    } = {}) {
      const ordinaryNnc = getOrdinaryNncGenerationOptions(override);
      const ordinaryPers1 = ordinaryNnc.pers1 ?? pers1;
      const ordinaryPers2 = ordinaryNnc.pers2 ?? ordinaryNnc.num2 ?? pers2;
      const possessor = ordinaryNnc.possessor ?? ordinaryNnc.possessivePrefix ?? poseedor;
      const state = ordinaryNnc.state ?? (possessor ? "possessive" : "absolutive");
      const result = typeof targetObject.generateOrdinaryNncParadigm === "function" ? targetObject.generateOrdinaryNncParadigm({
        stem: ordinaryNnc.stem ?? verb,
        state,
        subject: {
          subjectPrefix: ordinaryPers1,
          subjectSuffix: ordinaryPers2,
          personSubKey: ordinaryNnc.subjectKey ?? ordinaryNnc.personSubKey ?? ""
        },
        possessor,
        possessivePrefix: possessor,
        number: ordinaryNnc.number ?? "singular",
        pluralType: ordinaryNnc.pluralType ?? "auto",
        nounClass: ordinaryNnc.nounClass ?? "",
        animacy: ordinaryNnc.animacy ?? "",
        possessionKind: ordinaryNnc.possessionKind ?? "",
        stateCase: ordinaryNnc.stateCase ?? "",
        possessionType: ordinaryNnc.possessionType ?? ""
      }) : {
        outputKind: "nominal-nuclear-clause",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(ordinaryNnc.stem ?? verb ?? ""),
        state,
        nounClass: "",
        animacy: "",
        number: ordinaryNnc.number ?? "singular",
        pluralType: ordinaryNnc.pluralType ?? "",
        subject: null,
        possessor: null,
        diagnostics: [{
          id: "ordinary-nnc-unavailable",
          severity: "error",
          message: "Ordinary NNC generation is unavailable."
        }]
      };
      const nuclearClauseShell = typeof targetObject.buildNuclearClauseShellMetadata === "function" ? targetObject.buildNuclearClauseShellMetadata({
        clauseKind: "nominal-nuclear-clause",
        formulaSlots: result.formulaSlots || result.clauseFrame?.formulaSlots || null,
        formulaEcho: result.formulaEcho || result.clauseFrame?.formulaEcho || "",
        predicate: {
          stem: result.stem || ordinaryNnc.stem || verb,
          state: result.state || state
        },
        predicateState: result.state || state
      }) : null;
      const sentenceLayer = typeof targetObject.buildGeneratedSentenceLayerMetadata === "function" ? targetObject.buildGeneratedSentenceLayerMetadata({
        override,
        tense: result.tense || ordinaryNnc.targetTense || "",
        nuclearClauseShell,
        clauseKind: "nominal-nuclear-clause"
      }) : null;
      const resultPayload = {
        ...result,
        generationRoute: "ordinary-nnc",
        isReflexive: false,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer
      };
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode: targetObject.TENSE_MODE.sustantivo,
        tense: result.tense || ordinaryNnc.targetTense || "ordinary-nnc",
        routeFamily: "ordinary-nnc",
        routeStage: "execute",
        unitKind: "ordinary-nnc",
        pers1: ordinaryPers1,
        pers2: ordinaryPers2,
        poseedor: possessor,
        verb,
        renderVerb: resolveNuclearClauseSurfaceFrameSourceInput({
          result: resultPayload,
          verb: result.stem || verb
        }),
        nuclearClauseShell
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
      return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract
      };
    }
    function buildGeneratedNuclearClauseShellMetadata({
      resolvedTenseMode = "",
      tense = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj2 = "",
      obj3 = "",
      isReflexive = false,
      verb = "",
      renderVerb = "",
      formulaPers1 = null,
      formulaPers2 = null,
      formulaObj1 = null,
      formulaObj2 = null,
      formulaObj3 = null,
      formulaReflexive = null,
      formulaVerb = "",
      formulaSubjectSuffix = "",
      formulaNumberConnector = null,
      nominalClauseMetadata = null
    } = {}) {
      if (typeof targetObject.buildNuclearClauseShellMetadata !== "function") {
        return null;
      }
      const isNominalShell = Boolean(nominalClauseMetadata?.nominalClauseFrame) || resolvedTenseMode === targetObject.TENSE_MODE.sustantivo || resolvedTenseMode === targetObject.TENSE_MODE.adjetivo || resolvedTenseMode === targetObject.TENSE_MODE.adverbio;
      if (isNominalShell) {
        const numberConnector = nominalClauseMetadata?.num1Num2 || nominalClauseMetadata?.nominalClauseFrame?.subject?.numberConnector || null;
        const connectorSurface = numberConnector ? resolveNuclearClauseSurfaceNominalConnectorSurface(numberConnector, pers2) : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const connectorDisplaySurface = numberConnector ? resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(numberConnector, pers2) : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const nominalPredicateStem = (() => {
          const stem = String(verb || renderVerb || "");
          const insideObjectPrefix = String(obj1 || "");
          if (!insideObjectPrefix || stem.startsWith(insideObjectPrefix)) {
            return stem;
          }
          return typeof targetObject.buildOutputPrefixedChain === "function" ? targetObject.buildOutputPrefixedChain({
            obj1: insideObjectPrefix,
            tronco: stem
          }) : `${insideObjectPrefix}${stem}`;
        })();
        return targetObject.buildNuclearClauseShellMetadata({
          clauseKind: "nominal-nuclear-clause",
          formulaSlots: {
            pers1Pers2: {
              slot: "pers1-pers2",
              prefix: pers1,
              suffix: ""
            },
            predicateStem: {
              slot: "STEM",
              stem: nominalPredicateStem,
              state: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
              stateSlot: nominalClauseMetadata?.nominalClauseFrame?.predicate?.stateSlot || null
            },
            num1Num2: {
              slot: "num1-num2",
              connector: connectorSurface,
              displayConnector: connectorDisplaySurface || "Ø",
              nounClass: numberConnector?.nounClass || ""
            }
          },
          predicateState: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal"
        });
      }
      const verbalFormulaPers1 = formulaPers1 === null || formulaPers1 === undefined ? pers1 : formulaPers1;
      const verbalFormulaPers2 = formulaPers2 === null || formulaPers2 === undefined ? formulaSubjectSuffix : formulaPers2;
      const verbalFormulaNumberConnector = formulaNumberConnector === null || formulaNumberConnector === undefined ? pers2 : formulaNumberConnector;
      const verbalFormulaObj1 = formulaObj1 === null || formulaObj1 === undefined ? obj1 : formulaObj1;
      const verbalFormulaObj2 = formulaObj2 === null || formulaObj2 === undefined ? obj2 : formulaObj2;
      const verbalFormulaObj3 = formulaObj3 === null || formulaObj3 === undefined ? obj3 : formulaObj3;
      const verbalFormulaReflexive = formulaReflexive === null || formulaReflexive === undefined ? isReflexive ? "mu" : "" : formulaReflexive;
      const verbalFormulaObjectPrefix = String(verbalFormulaObj1 || "");
      const verbalFormulaReflexivePrefix = String(verbalFormulaReflexive || "");
      const shellFormulaObj1 = verbalFormulaObjectPrefix && verbalFormulaObjectPrefix === verbalFormulaReflexivePrefix ? "" : verbalFormulaObj1;
      const shell = targetObject.buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
          prefix: verbalFormulaPers1,
          suffix: verbalFormulaPers2,
          numberConnector: verbalFormulaNumberConnector
        },
        object: {
          prefix: shellFormulaObj1,
          obj2: verbalFormulaObj2,
          obj3: verbalFormulaObj3,
          reflexivo: verbalFormulaReflexive
        },
        predicate: {
          stem: formulaVerb || renderVerb || verb
        },
        tenseValue: tense,
        tenseLabel: tense
      });
      const shellStem = String(formulaVerb || renderVerb || verb || "");
      const enrichLesson6Slot = (slotKey = "", prefix = "") => {
        const dyadFrame = getLesson6DirectNawatObjectDyadFrame(prefix, {
          stem: shellStem,
          pers1: verbalFormulaPers1
        });
        if (!dyadFrame || !shell?.formulaSlots?.[slotKey]) {
          return;
        }
        shell.formulaSlots[slotKey].lesson6DirectNawatDyad = dyadFrame;
        shell.formulaSlots[slotKey].functionalSubslots = dyadFrame.formulaPosition === "va1-va2" ? {
          va1: dyadFrame.functionalVa1 || dyadFrame.va1 || "",
          va2: dyadFrame.functionalVa2 || dyadFrame.va2 || "",
          val1Features: dyadFrame.val1Features || null,
          val2Features: dyadFrame.val2Features || null,
          visibleLinearMorph: dyadFrame.visibleFormulaPrefix || ""
        } : null;
      };
      enrichLesson6Slot("obj1", shellFormulaObj1);
      enrichLesson6Slot("obj2", verbalFormulaObj2);
      enrichLesson6Slot("obj3", verbalFormulaObj3);
      enrichLesson6Slot("reflexivo", verbalFormulaReflexive);
      return shell;
    }
    function buildGeneratedVncValencyFrameMetadata({
      resolvedTenseMode = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj1Base = "",
      obj2 = "",
      obj3 = "",
      parsedVerb = null,
      valencySummary = null,
      targetValency = null,
      isPassiveImpersonalMode = false,
      nuclearClauseShell = null
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const normalizedObj1 = String(obj1 || "");
      const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
      const normalizedObj2 = String(obj2 || "");
      const normalizedObj3 = String(obj3 || "");
      const selectedObjectMarkers = [normalizedObj1, normalizedObj2, normalizedObj3].filter(Boolean);
      const baseObjectSlots = Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : typeof targetObject.getBaseObjectSlots === "function" ? targetObject.getBaseObjectSlots(parsedVerb) : selectedObjectMarkers.length;
      const availableObjectSlots = Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : Math.max(0, baseObjectSlots);
      const resolvedTargetValency = Number.isFinite(targetValency) ? targetValency : Math.max(1, baseObjectSlots + 1);
      const subjectInfo = typeof targetObject.getPers1Pers2Info === "function" ? targetObject.getPers1Pers2Info(pers1, pers2) : null;
      const objectInfo = typeof targetObject.getObj1PersonInfo === "function" ? targetObject.getObj1PersonInfo(normalizedObj1) : null;
      const lesson6StemForDyad = String(nuclearClauseShell?.formulaSlots?.predicateStem?.stem || nuclearClauseShell?.formulaSlots?.predicateStem?.displayStem || parsedVerb?.verb || parsedVerb?.displayVerb || "");
      const lesson6ObjectDyadFrame = getLesson6DirectNawatObjectDyadFrame(normalizedObj1Base || normalizedObj1, {
        stem: lesson6StemForDyad,
        pers1
      });
      const lesson6ShellFormulaObjectPrefix = String(nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix && nuclearClauseShell.formulaSlots.reflexivo.displayPrefix !== "Ø" ? nuclearClauseShell.formulaSlots.reflexivo.displayPrefix : nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix && nuclearClauseShell.formulaSlots.obj1.displayPrefix !== "Ø" ? nuclearClauseShell.formulaSlots.obj1.displayPrefix : "");
      const lesson6ResolvedObjectDyadFrame = lesson6ObjectDyadFrame ? {
        ...lesson6ObjectDyadFrame,
        visibleFormulaPrefix: lesson6ShellFormulaObjectPrefix || lesson6ObjectDyadFrame.visibleFormulaPrefix
      } : null;
      const selectedValency = Math.max(1, 1 + selectedObjectMarkers.length);
      const isTransitiveFrame = baseObjectSlots > 0 || selectedObjectMarkers.length > 0 || resolvedTargetValency > 1;
      const pers1Pers2Slot = {
        slot: "pers1-pers2",
        functionRole: "subject",
        prefix: String(pers1 || ""),
        suffix: String(pers2 || ""),
        displayPrefix: String(pers1 || "") || "Ø",
        displaySuffix: String(pers2 || "") || "Ø",
        person: subjectInfo?.person ?? null,
        number: subjectInfo?.number || ""
      };
      const obj1Slot = {
        slot: "obj1",
        functionRole: "mainline-object",
        prefix: normalizedObj1,
        basePrefix: normalizedObj1Base,
        displayPrefix: normalizedObj1 || "Ø",
        displayBasePrefix: normalizedObj1Base || "Ø",
        person: objectInfo?.person ?? null,
        number: objectInfo?.number || "",
        isPresent: Boolean(normalizedObj1),
        lesson6DirectNawatDyad: lesson6ResolvedObjectDyadFrame,
        formulaPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1,
        formulaPosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        predicatePositionStatus: lesson6ResolvedObjectDyadFrame?.predicatePositionStatus || "",
        trajectory: lesson6ResolvedObjectDyadFrame?.trajectory || "",
        specificity: lesson6ResolvedObjectDyadFrame?.specificity || "",
        prominence: lesson6ResolvedObjectDyadFrame?.prominence || ""
      };
      const obj2Slot = {
        slot: "obj2",
        functionRole: "secondary-object",
        prefix: normalizedObj2,
        displayPrefix: normalizedObj2 || "Ø",
        isPresent: Boolean(normalizedObj2)
      };
      const obj3Slot = {
        slot: "obj3",
        functionRole: "tertiary-object",
        prefix: normalizedObj3,
        displayPrefix: normalizedObj3 || "Ø",
        isPresent: Boolean(normalizedObj3)
      };
      return {
        kind: "vnc-valency-frame",
        version: 1,
        lessonRange: "5-6",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        valency: isTransitiveFrame ? "transitive" : "intransitive",
        valencyLabel: isTransitiveFrame ? "transitiva" : "intransitiva",
        baseObjectSlots,
        availableObjectSlots,
        selectedObjectSlots: selectedObjectMarkers.length,
        selectedValency,
        targetValency: resolvedTargetValency,
        isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
        pers1Pers2: pers1Pers2Slot,
        obj1: obj1Slot,
        obj2: obj2Slot,
        obj3: obj3Slot,
        objectSlotSequence: [obj1Slot, obj2Slot, obj3Slot],
        lesson6DirectNawatObject: lesson6ResolvedObjectDyadFrame,
        lesson6VisibleFormulaObjectPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1 || "",
        lesson6ValencePosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        nuclearClauseFormulaSlots: nuclearClauseShell?.formulaSlots || null,
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          objectLabelsAreNotEvidenceForSentenceObjects: true
        }
      };
    }
    function buildGeneratedDerivedVoiceFrameMetadata({
      resolvedTenseMode = "",
      resolvedDerivationMode = "",
      resolvedVoiceMode = "",
      isNonactive = false,
      isPassiveImpersonalMode = false,
      sourceValency = null,
      targetValency = null,
      valencySummary = null,
      parsedVerb = null,
      verb = "",
      analysisVerb = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj1Base = "",
      hasPromotableObject = false,
      preserveSubjectForPassive = false,
      allowPassiveObject = false
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const hasImpersonalPrefix = parsedVerb?.hasImpersonalTaPrefix === true;
      if (!isNonactive && !isPassiveImpersonalMode && !hasImpersonalPrefix) {
        return null;
      }
      const normalizedObj1 = String(obj1 || "");
      const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
      const normalizedSourceValency = Number.isFinite(sourceValency) ? sourceValency : Math.max(1, (Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : 0) + 1);
      const normalizedTargetValency = Number.isFinite(targetValency) ? targetValency : normalizedSourceValency;
      const isImpersonalFrame = hasImpersonalPrefix || isPassiveImpersonalMode && !hasPromotableObject;
      const voiceLabel = hasImpersonalPrefix ? "impersonal ta-" : isPassiveImpersonalMode ? "pasivo/impersonal" : "no activo";
      return {
        kind: "derived-voice-frame",
        version: 1,
        lessonRange: "20-23",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
          mode: String(resolvedDerivationMode || ""),
          isNonactive: Boolean(isNonactive),
          label: isNonactive ? "no activo" : "activo",
          finalStem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || "")
        },
        voice: {
          mode: String(resolvedVoiceMode || ""),
          label: voiceLabel,
          isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
          isImpersonalFrame,
          hasImpersonalTaPrefix: hasImpersonalPrefix,
          hasPromotableObject: Boolean(hasPromotableObject),
          preserveSubjectForPassive: Boolean(preserveSubjectForPassive),
          allowPassiveObject: Boolean(allowPassiveObject)
        },
        valency: {
          sourceValency: normalizedSourceValency,
          targetValency: normalizedTargetValency,
          baseObjectSlots: Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : null,
          fusionObjectSlots: Number.isFinite(valencySummary?.fusionObjectSlots) ? valencySummary.fusionObjectSlots : null,
          availableObjectSlots: Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : null,
          selectedObj1: normalizedObj1,
          baseObj1: normalizedObj1Base,
          obj1ClearedByVoice: Boolean(normalizedObj1Base && !normalizedObj1 && isPassiveImpersonalMode)
        },
        pers1Pers2: {
          slot: "pers1-pers2",
          prefix: String(pers1 || ""),
          suffix: String(pers2 || ""),
          displayPrefix: String(pers1 || "") || "Ø",
          displaySuffix: String(pers2 || "") || "Ø"
        },
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewVoiceBehavior: true
        }
      };
    }
    function getGeneratedForwardDerivationLabel(derivationType = "") {
      if (derivationType === targetObject.DERIVATION_TYPE.causative) {
        return "causativa";
      }
      if (derivationType === targetObject.DERIVATION_TYPE.applicative) {
        return "aplicativa";
      }
      return String(derivationType || "");
    }
    function resolveForwardDerivationMetadataStemSurface(record = null) {
      if (!record || typeof record !== "object") {
        return "";
      }
      if (typeof targetObject.getProvenancePrimaryStemSurface === "function") {
        const framedSurface = targetObject.getProvenancePrimaryStemSurface(record);
        if (framedSurface) {
          return framedSurface;
        }
      }
      const grammarFrame = (record.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : null) || (record.frames && typeof record.frames === "object" ? record.frames : null);
      if (grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object") {
        return "";
      }
      return targetObject.normalizeDerivationStemValue(record.surfaceStem || (record.stemSpec ? targetObject.realizeMorphStemSpec(record.stemSpec, record.stem || "") : "") || record.stem || "");
    }
    function buildGeneratedForwardDerivationFrameMetadata({
      resolvedTenseMode = "",
      resolvedDerivationType = "",
      derivationValencyDelta = 0,
      sourceValency = null,
      forwardDerivations = null,
      forwardStemProvenance = null,
      causativeAllStems = null,
      applicativeAllStems = null,
      renderVerb = "",
      verb = "",
      analysisVerb = ""
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const config = typeof targetObject.getForwardDerivationConfig === "function" ? targetObject.getForwardDerivationConfig(resolvedDerivationType) : null;
      if (!config) {
        return null;
      }
      const selectedMeta = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? forwardDerivations?.causativeSelectionMeta : forwardDerivations?.applicativeSelectionMeta;
      const candidateStems = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? causativeAllStems : applicativeAllStems;
      const normalizedCandidateStems = Array.isArray(candidateStems) ? candidateStems.map(stem => String(stem || "")).filter(Boolean) : [];
      const sourceStemForComparison = targetObject.normalizeDerivationStemValue(renderVerb || "");
      const derivedCandidateStem = normalizedCandidateStems.find(stem => targetObject.normalizeDerivationStemValue(stem) !== sourceStemForComparison) || normalizedCandidateStems[0] || "";
      const selectedStemCandidate = targetObject.normalizeDerivationStemValue(resolveForwardDerivationMetadataStemSurface(selectedMeta) || resolveForwardDerivationMetadataStemSurface(forwardStemProvenance) || "");
      const selectedStem = targetObject.normalizeDerivationStemValue(selectedStemCandidate && selectedStemCandidate !== sourceStemForComparison ? selectedStemCandidate : derivedCandidateStem || selectedStemCandidate || analysisVerb || verb || "");
      const delta = Number.isFinite(derivationValencyDelta) ? derivationValencyDelta : 0;
      const derivedValency = Number.isFinite(sourceValency) ? sourceValency : null;
      const baseValency = Number.isFinite(derivedValency) ? Math.max(1, derivedValency - delta) : null;
      const lessonRange = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? "24-25" : "26";
      return {
        kind: "forward-derivation-frame",
        version: 1,
        lessonRange,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
          type: resolvedDerivationType,
          label: getGeneratedForwardDerivationLabel(resolvedDerivationType),
          valencyDelta: delta,
          rule: String(selectedMeta?.rule || forwardStemProvenance?.rule || ""),
          patternType: String(selectedMeta?.patternType || forwardStemProvenance?.patternType || ""),
          guidanceRouteText: String(selectedMeta?.guidanceRoute?.text || forwardStemProvenance?.guidanceRoute?.text || "")
        },
        stem: {
          sourceVerb: String(renderVerb || ""),
          selectedStem,
          finalStem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || ""),
          candidateStems: normalizedCandidateStems
        },
        valency: {
          sourceValency: baseValency,
          derivedValency,
          delta
        },
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewDerivationBehavior: true
        }
      };
    }
    function buildGeneratedCompoundFrameMetadata({
      resolvedTenseMode = "",
      parsedVerb = null
    } = {}) {
      const compoundAst = parsedVerb?.compoundAst || null;
      const allowsCompoundFrame = resolvedTenseMode === targetObject.TENSE_MODE.verbo || resolvedTenseMode === targetObject.TENSE_MODE.sustantivo || resolvedTenseMode === targetObject.TENSE_MODE.adjetivo;
      if (!allowsCompoundFrame || !compoundAst || compoundAst.kind !== "compound") {
        return null;
      }
      const embeds = Array.isArray(compoundAst.embeds) ? compoundAst.embeds.map(entry => ({
        role: String(entry?.role || ""),
        kind: String(entry?.kind || ""),
        value: String(entry?.value || ""),
        source: String(entry?.source || ""),
        explicit: entry?.explicit === true
      })) : [];
      if (!embeds.length) {
        return null;
      }
      return {
        kind: "compound-frame",
        version: 1,
        lessonRange: "28,30",
        source: "parse-compoundAst",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        matrix: {
          role: "matrix",
          stem: String(compoundAst.matrix?.stem || ""),
          ruleBase: String(compoundAst.matrix?.ruleBase || "")
        },
        embeds,
        sourceInput: {
          rawInput: String(compoundAst.source?.rawInput || ""),
          displayVerb: String(compoundAst.source?.displayVerb || ""),
          displayCore: String(compoundAst.source?.displayCore || ""),
          verb: String(compoundAst.source?.verb || ""),
          analysisVerb: String(compoundAst.source?.analysisVerb || "")
        },
        valency: compoundAst.valency && typeof compoundAst.valency === "object" ? {
          ...compoundAst.valency
        } : null,
        flags: compoundAst.flags && typeof compoundAst.flags === "object" ? {
          ...compoundAst.flags
        } : {},
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          notCompoundNncGeneration: true
        }
      };
    }
    function buildGeneratedPatientiveCompoundSourceFrameMetadata({
      resolvedTenseMode = "",
      compoundFrame = null,
      nominalizationProfile = null,
      nuclearClauseShell = null,
      surfaceForms = []
    } = {}) {
      const patientiveFamilyProfile = nominalizationProfile?.patientiveFamilyProfile || null;
      if (resolvedTenseMode !== targetObject.TENSE_MODE.sustantivo || !compoundFrame || compoundFrame.kind !== "compound-frame" || nominalizationProfile?.nominalKind !== "patientivo" || !patientiveFamilyProfile) {
        return null;
      }
      const forms = Array.isArray(surfaceForms) ? surfaceForms.map(form => String(form || "")).filter(Boolean) : [];
      const family = String(patientiveFamilyProfile.family || "");
      return {
        kind: "patientive-compound-source-frame",
        version: 1,
        lessonRef: "Andrews 41.2.3",
        relatedLessonRefs: ["Andrews 39.6", "Andrews 39.7", "Andrews 39.8"],
        outputKind: "patientive-nnc-compound-source",
        sourceCategory: "compound-verbstem",
        nominalizationKind: "patientive",
        patientiveFamily: family,
        sourcePattern: String(patientiveFamilyProfile.sourcePattern || ""),
        sourceFamilyIds: Array.isArray(patientiveFamilyProfile.sourceFamilyIds) ? Array.from(patientiveFamilyProfile.sourceFamilyIds) : [],
        generatedSurfacePreserved: true,
        surfaceForms: forms,
        sourceFormulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        sourceFormulaSlots: nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object" ? {
          ...nuclearClauseShell.slots
        } : null,
        sourceCompoundFrame: {
          kind: compoundFrame.kind,
          lessonRange: compoundFrame.lessonRange,
          matrix: compoundFrame.matrix && typeof compoundFrame.matrix === "object" ? {
            ...compoundFrame.matrix
          } : null,
          embeds: Array.isArray(compoundFrame.embeds) ? compoundFrame.embeds.map(entry => ({
            ...entry
          })) : [],
          sourceInput: compoundFrame.sourceInput && typeof compoundFrame.sourceInput === "object" ? {
            ...compoundFrame.sourceInput
          } : null,
          valency: compoundFrame.valency && typeof compoundFrame.valency === "object" ? {
            ...compoundFrame.valency
          } : null,
          flags: compoundFrame.flags && typeof compoundFrame.flags === "object" ? {
            ...compoundFrame.flags
          } : {}
        },
        compoundPatientiveSource: {
          relation: family ? `${family}-patientive-from-compound-source` : "patientive-from-compound-source",
          evidence: "patientiveFamilyProfile + compoundAst",
          sourceRoleClass: family === "passive" ? "passive-patientive-compound-source" : family === "impersonal" ? "impersonal-patientive-compound-source" : "patientive-compound-source"
        },
        cannotInferFromSurfaceAlone: true,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          doesNotResolveAllCompoundSemantics: true
        }
      };
    }
    function buildGeneratedAdjectivalCompoundSourceFrameMetadata({
      resolvedTenseMode = "",
      compoundFrame = null,
      nominalizationProfile = null,
      nuclearClauseShell = null,
      surfaceForms = []
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.adjetivo || !compoundFrame || compoundFrame.kind !== "compound-frame") {
        return null;
      }
      const nominalizationKind = String(nominalizationProfile?.role?.nominalizationKind || "");
      const adjectivalFunction = String(nominalizationProfile?.role?.adjectivalFunction || "");
      const isAdjectivalPredicateSurface = adjectivalFunction === "predicate-surface" || nominalizationKind === "adjectival-surface" || nominalizationKind === "patientive-adjectival";
      if (!isAdjectivalPredicateSurface) {
        return null;
      }
      const forms = Array.isArray(surfaceForms) ? surfaceForms.map(form => String(form || "")).filter(Boolean) : [];
      return {
        kind: "adjectival-compound-source-frame",
        version: 1,
        lessonRef: "Andrews 41.2",
        outputKind: "adjectival-nnc-compound-source",
        sourceCategory: "compound-verbstem",
        functionKind: "compound-source-adjectival",
        nominalizationKind: nominalizationKind || "adjectival-surface",
        adjectivalFunction: adjectivalFunction || "predicate-surface",
        generatedSurfacePreserved: true,
        surfaceForms: forms,
        sourceFormulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        sourceFormulaSlots: nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object" ? {
          ...nuclearClauseShell.slots
        } : null,
        sourceCompoundFrame: {
          kind: compoundFrame.kind,
          lessonRange: compoundFrame.lessonRange,
          matrix: compoundFrame.matrix && typeof compoundFrame.matrix === "object" ? {
            ...compoundFrame.matrix
          } : null,
          embeds: Array.isArray(compoundFrame.embeds) ? compoundFrame.embeds.map(entry => ({
            ...entry
          })) : [],
          sourceInput: compoundFrame.sourceInput && typeof compoundFrame.sourceInput === "object" ? {
            ...compoundFrame.sourceInput
          } : null,
          valency: compoundFrame.valency && typeof compoundFrame.valency === "object" ? {
            ...compoundFrame.valency
          } : null,
          flags: compoundFrame.flags && typeof compoundFrame.flags === "object" ? {
            ...compoundFrame.flags
          } : {}
        },
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewSurfaceForms: true,
          noModificationAst: true,
          doesNotImplementLessons42_43: true
        }
      };
    }
    function buildGeneratedAdverbialNuclearFrameMetadata({
      resolvedTenseMode = "",
      tense = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      baseObjectPrefix = "",
      surfaceForms = []
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.adverbio) {
        return null;
      }
      const knownTenses = typeof targetObject.getKnownConfiguredAdverbioTensesForAdverbialBoundary === "function" ? targetObject.getKnownConfiguredAdverbioTensesForAdverbialBoundary() : ["pasado-remoto-adverbio-activo"];
      if (!knownTenses.includes(tense)) {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const normalizedObjectPrefix = String(objectPrefix || "");
      const normalizedBaseObjectPrefix = String(baseObjectPrefix || normalizedObjectPrefix || "");
      const sourceValency = normalizedObjectPrefix || normalizedBaseObjectPrefix ? "transitive" : "intransitive";
      const classification = typeof targetObject.classifyAdverbialNuclearCandidate === "function" ? targetObject.classifyAdverbialNuclearCandidate({
        source: sourceStem,
        candidate: "",
        tense,
        adverbialKind: "manner-surface",
        falsePositiveSource: "configured-adverbio-surface"
      }) : null;
      const clauseFrame = typeof targetObject.buildAdverbialNuclearClauseFrame === "function" ? targetObject.buildAdverbialNuclearClauseFrame({
        source: sourceStem,
        surfaceForms,
        sourceClauseKind: "vnc",
        adverbialKind: "vnc-adverbial",
        adverbialDegree: "first-degree",
        semanticDomain: "manner",
        tense,
        configuredTense: tense,
        sourceStem,
        finalStem: String(verb || ""),
        analysisStem: String(analysisVerb || verb || ""),
        sourceValency,
        objectPrefix: normalizedObjectPrefix,
        baseObjectPrefix: normalizedBaseObjectPrefix,
        evidenceSource: "generated configured adverbio route"
      }) : null;
      return {
        kind: "adverbial-nuclear-frame",
        version: 1,
        lesson: 44,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: false,
        doesNotGenerateForms: true,
        adverbialNuclearClauseFrame: clauseFrame,
        adverbial: {
          kind: "manner-surface",
          label: "manera",
          degree: "first-degree",
          configuredDegreeLabel: "configured-adverbio",
          isFullLesson44Engine: false
        },
        sourceVnc: {
          stem: sourceStem,
          finalStem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || ""),
          valency: sourceValency,
          objectPrefix: normalizedObjectPrefix,
          baseObjectPrefix: normalizedBaseObjectPrefix
        },
        tense,
        classification: classification ? {
          kind: classification.kind,
          adverbialKind: classification.adverbialKind,
          hasKnownConfiguredAdverbioTense: classification.hasKnownConfiguredAdverbioTense === true,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          hasAdverbialNuclearClauseFrame: Boolean(clauseFrame),
          noFullAdverbialClauseEngine: true,
          configuredAdverbioSurfaceOnly: true
        }
      };
    }
    function buildGeneratedRelationalNncBoundaryFrameMetadata({
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      nominalizationProfile = null
    } = {}) {
      if (nominalKind !== "locativo-temporal") {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
      const classification = typeof targetObject.classifyRelationalNncCandidate === "function" ? targetObject.classifyRelationalNncCandidate({
        candidate: String(renderVerb || verb || ""),
        relationalStem: "",
        relationalKind: "locative",
        relationalOption: "unknown",
        governedArgument: "",
        falsePositiveSource: "locative-temporal-nominal",
        sourceKind: "generated-verb-derived-nominal"
      }) : null;
      return {
        kind: "relational-nnc-boundary-frame",
        version: 1,
        lessonRange: "45-47",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
          nominalKind,
          kindLabel: "locativo-temporal generado",
          sourceVnc: sourceStem,
          sourceTense,
          sourceKind: "generated-verb-derived-nominal"
        },
        classification: classification ? {
          kind: classification.kind,
          relationalKind: classification.relationalKind,
          relationalOption: classification.relationalOption,
          falsePositiveSource: classification.falsePositiveSource,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isGenerationRule: false,
          changesSurfaceForms: false,
          noRelationalNncGeneration: true,
          locativeTemporalNominalIsEvidence: false,
          noStaticRelationalFixture: true
        }
      };
    }
    function buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      nominalizationProfile = null
    } = {}) {
      if (nominalKind !== "locativo-temporal") {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
      const classification = typeof targetObject.classifyPlaceGentilicNncCandidate === "function" ? targetObject.classifyPlaceGentilicNncCandidate({
        candidate: String(renderVerb || verb || ""),
        placeNameSource: "",
        gentilicSource: "",
        placeGentilicKind: "place-name",
        associatedPlace: "",
        collectivity: "",
        falsePositiveSource: "locative-temporal-nominal",
        sourceKind: "generated-verb-derived-nominal"
      }) : null;
      return {
        kind: "place-gentilic-nnc-boundary-frame",
        version: 1,
        lesson: 48,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
          nominalKind,
          kindLabel: "locativo-temporal generado",
          placeGentilicKind: "place-name",
          sourceVnc: sourceStem,
          sourceTense,
          sourceKind: "generated-verb-derived-nominal"
        },
        classification: classification ? {
          kind: classification.kind,
          placeGentilicKind: classification.placeGentilicKind,
          falsePositiveSource: classification.falsePositiveSource,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isGenerationRule: false,
          changesSurfaceForms: false,
          noPlaceNameNncGeneration: true,
          noGentilicNncGeneration: true,
          locativeTemporalNominalIsEvidence: false,
          noStaticPlaceOrGentilicFixture: true
        }
      };
    }
    function buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
      resolvedTenseMode = "",
      tense = "",
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      sourceTense = ""
    } = {}) {
      const isConfiguredAdverbio = resolvedTenseMode === targetObject.TENSE_MODE.adverbio && tense === "pasado-remoto-adverbio-activo";
      const isLocativoTemporal = nominalKind === "locativo-temporal";
      if (!isConfiguredAdverbio && !isLocativoTemporal) {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const semanticRelation = isConfiguredAdverbio ? "manner" : "place";
      const adjoinedUnitType = isConfiguredAdverbio ? "vnc" : "nnc";
      const falsePositiveSource = isConfiguredAdverbio ? "configured-adverbio-surface" : "single-generated-word";
      const candidateLabel = isConfiguredAdverbio ? "adverbio heredado" : "locativo-temporal generado";
      const classification = typeof targetObject.classifyAdverbialAdjunctionCandidate === "function" ? targetObject.classifyAdverbialAdjunctionCandidate({
        principalClause: "",
        adjoinedUnit: candidateLabel,
        candidate: String(renderVerb || verb || ""),
        semanticRelation,
        adjoinedUnitType,
        marking: "",
        falsePositiveSource
      }) : null;
      return {
        kind: "adverbial-adjunction-boundary-frame",
        version: 1,
        lessonRange: "49-50",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmada",
        candidate: {
          label: candidateLabel,
          sourceVnc: sourceStem,
          sourceTense: String(sourceTense || tense || ""),
          semanticRelation,
          adjoinedUnitType,
          falsePositiveSource
        },
        classification: classification ? {
          kind: classification.kind,
          semanticRelation: classification.semanticRelation,
          adjoinedUnitType: classification.adjoinedUnitType,
          falsePositiveSource: classification.falsePositiveSource,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isGenerationRule: false,
          changesSurfaceForms: false,
          noClauseAdjunctionAst: true,
          singleGeneratedWordIsEvidence: false,
          noStaticAdjunctionData: true
        }
      };
    }
    const GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE = Object.freeze({
      "adjetivo-preterito-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-preterit",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "preterito",
        surfaceSuffix: "-tik"
      },
      "adjetivo-perfecto-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-perfect",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "perfecto",
        surfaceSuffix: "-tituk"
      },
      "adjetivo-preterito-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        routeId: "denominal-vt-na-preterit",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "preterito",
        surfaceSuffix: "-naj"
      },
      "adjetivo-perfecto-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        routeId: "denominal-vt-na-perfect",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "perfecto",
        surfaceSuffix: "-najtuk"
      }
    });
    function resolveGeneratedDenominalRouteProfileSpec(nominalKind = "") {
      const key = String(nominalKind || "").trim();
      if (!key) {
        return null;
      }
      if (typeof targetObject.getNawatRouteProfile === "function") {
        const profile = targetObject.getNawatRouteProfile(key);
        if (profile && typeof profile === "object" && profile.routePlacement === "patientivo-tronco-conversion" && profile.denominalFamily) {
          return {
            ...profile,
            routeProfileSource: "static-modes"
          };
        }
      }
      const fallback = GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE[key];
      return fallback ? {
        ...fallback,
        routeProfileSource: "route-fallback"
      } : null;
    }
    function generatedDenominalRouteHasAndrewsSuffixContract(spec = null) {
      return String(spec?.structuralAnalogue || "").trim() !== "nawat-transitive-route-no-andrews-suffix";
    }
    function getGeneratedDenominalRouteCurriculumRef(spec = null) {
      if (generatedDenominalRouteHasAndrewsSuffixContract(spec)) {
        return {
          source: "Andrews",
          range: "54-55",
          role: "structural-analogue"
        };
      }
      return {
        source: "Nawat route data",
        range: "static_modes",
        role: "configured-denominal-route"
      };
    }
    function getGeneratedDenominalRouteSupportStatus(spec = null) {
      return generatedDenominalRouteHasAndrewsSuffixContract(spec) ? "current-route-supported" : "current-route-supported-nawat-only";
    }
    const GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS = Object.freeze(["54.2.2-inceptive-stative-hui", "54.2.2-hui-lia-causative", "54.2.3-inceptive-stative-ya", "54.2.3-ti-ya-deverbal", "54.2.3-hui-ya-deverbal", "54.2.3-ya-lia-causative", "54.2.4-inceptive-stative-a", "54.2.5-inceptive-stative-hua", "54.3-included-possessor-ti", "54.2-54.4-ti-lia-causative", "54.5-ti-a-causative", "54.6-t-ia-applicative", "55.1-temporal-tia", "55.2-causative-tla", "55.2-tla-ti-lia-applicative", "55.2-intransitive-tla", "55.2-intransitive-tla-ti-a-causative", "55.2-intransitive-tla-ti-lia-applicative", "55.3-intransitive-o-a-applicative-huia", "55.3-o-a-il-huia-al-huia-applicative-note", "55.4-adverbial-huia", "55.5-relational-compound-o-a-huia", "55.7-transitive-i-a"]);
    const GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS = Object.freeze(["55.6-i-hui-a-hui-to-o-a"]);
    function getGeneratedDenominalRouteFamiliesWithoutAndrewsContract() {
      if (typeof targetObject.getNawatRouteProfiles !== "function") {
        return ["vt-na"];
      }
      return Array.from(new Set(targetObject.getNawatRouteProfiles().filter(profile => profile?.routePlacement === "patientivo-tronco-conversion").filter(profile => !generatedDenominalRouteHasAndrewsSuffixContract(profile)).map(profile => profile.denominalFamily || profile.routeFamily || "").filter(Boolean))).sort();
    }
    function getGeneratedDenominalAndrewsContractCoverageSummary() {
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2-55.7",
          role: "denominal-contract-inventory"
        },
        outputKind: "denominal-andrews-contract-coverage",
        contractCount: 26,
        routeCoveredContractCount: 3,
        unmodeledContractCount: GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS.length,
        targetUnmodeledContractCount: GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS.length,
        nawatOnlyRouteFamilies: getGeneratedDenominalRouteFamiliesWithoutAndrewsContract(),
        unmodeledContractIds: Array.from(GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS),
        targetUnmodeledContractIds: Array.from(GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS),
        boundaries: {
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          structuralInventoryOnly: true,
          fullLessonGenerationModeled: false
        }
      };
    }
    function getGeneratedDenominalRouteSuffixContract(spec = null) {
      const familyKey = spec?.denominalFamily || spec?.routeFamily || "";
      const contractByFamily = {
        "vi-ti": {
          range: "54.2/54.4",
          classicalSuffix: "ti"
        },
        "vi-iwi": {
          range: "55.6",
          classicalSuffix: "i-hui"
        },
        "vi-awi": {
          range: "55.6",
          classicalSuffix: "a-hui"
        }
      };
      const contractSpec = contractByFamily[familyKey];
      if (!contractSpec) {
        return null;
      }
      const orthographyConversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(contractSpec.classicalSuffix, {
        source: "Andrews Lessons 54-55 denominal route suffix"
      }) : null;
      const nawatRuleSuffix = orthographyConversion?.output || contractSpec.classicalSuffix;
      return {
        kind: "denominal-route-suffix-contract",
        curriculumRef: {
          source: "Andrews",
          range: contractSpec.range,
          role: "suffix-family"
        },
        routeFamily: familyKey,
        classicalSuffix: contractSpec.classicalSuffix,
        nawatRuleSuffix,
        nawatVerbalizer: `-${String(nawatRuleSuffix || "").replace(/-/g, "")}`,
        routeVerbalizer: String(spec?.verbalizer || "").trim(),
        orthographyConversion,
        boundaries: {
          noFixtureEvidence: true,
          noNewSurfaceForms: true,
          suffixFamilyInventoryComplete: false
        }
      };
    }
    function buildGeneratedDenominalRouteBoundaries(spec = null) {
      const boundaries = {
        noNewSurfaceForms: true,
        routeBasedOnly: true,
        suffixFamilyInventoryComplete: false,
        includedPossessorModeled: false,
        possessionDenominalModeled: false,
        temporalDenominalModeled: false,
        causativeApplicativeFamilyModeled: false
      };
      if (!generatedDenominalRouteHasAndrewsSuffixContract(spec)) {
        boundaries.noAndrewsSuffixContract = true;
      }
      return boundaries;
    }
    function buildGeneratedDenominalFamilyProfileMetadata({
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = ""
    } = {}) {
      const spec = resolveGeneratedDenominalRouteProfileSpec(nominalKind);
      if (!spec) {
        return null;
      }
      const sourceSurface = String(renderVerb || analysisVerb || verb || "").trim();
      const sourceInput = String(verb || analysisVerb || renderVerb || "").trim();
      const andrewsContractRoutePreview = typeof targetObject.generateNawatDenominalAndrewsContractRoutePreview === "function" ? targetObject.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceInput || sourceSurface
      }) : null;
      return {
        version: 1,
        curriculumRef: getGeneratedDenominalRouteCurriculumRef(spec),
        outputKind: "denominal-route",
        routeFamily: spec.denominalFamily || spec.routeFamily || "",
        structuralAnalogue: spec.structuralAnalogue || "",
        routeId: spec.id || spec.routeId || "",
        routePlacement: spec.routePlacement || "patientivo-tronco-conversion",
        routeProfileSource: spec.routeProfileSource || "route-fallback",
        sourceState: "patientivo-tronco",
        sourceSlot: spec.sourceSlot,
        sourceCategory: spec.sourceCategory,
        sourceSurface,
        sourceInput,
        suffixContract: getGeneratedDenominalRouteSuffixContract(spec),
        verbalizer: spec.verbalizer,
        verbalizerType: spec.verbalizerType,
        valency: spec.valency,
        targetTense: spec.nawatTenseValue || spec.targetTenseValue || spec.finiteTense || spec.targetTense || "",
        surfaceSuffix: spec.surfaceSuffix,
        andrewsContractCoverage: getGeneratedDenominalAndrewsContractCoverageSummary(),
        andrewsContractRoutePreview,
        supportStatus: getGeneratedDenominalRouteSupportStatus(spec),
        isCompleteLesson54_55: false,
        boundaries: buildGeneratedDenominalRouteBoundaries(spec)
      };
    }
    function buildGeneratedNominalNum1Num2Metadata({
      subjectSuffix = "",
      nominalKind = "",
      possessivePrefix = "",
      source = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      sourceTense = "",
      sourceCombinedMode = "",
      actionNounStemUse = "",
      patientivoSource = "",
      patientiveSourceStageFrame = null,
      patientiveMultipleDerivationContract = null,
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      subjectPrefix = "",
      sourceSubjectPrefix = "",
      sourceSubjectSuffix = ""
    } = {}) {
      const connector = typeof targetObject.buildNominalNum1Num2 === "function" ? targetObject.buildNominalNum1Num2({
        subjectSuffix,
        nominalKind,
        predicateState: "derived-nominal",
        source
      }) : {
        version: 1,
        role: "subject-number-connector",
        slot: "subject.num1-num2",
        belongsTo: "subject",
        surface: String(subjectSuffix || ""),
        displaySurface: String(subjectSuffix || "") || "Ø",
        nominalKind: String(nominalKind || ""),
        predicateState: "derived-nominal",
        source,
        notNounSuffix: true,
        notStatePosition: true
      };
      const hasPossessor = Boolean(possessivePrefix);
      const predicateStateSlot = {
        role: "predicate-state",
        slot: "predicate.state",
        state: hasPossessor ? "possessive" : "absolutive",
        statePosition: hasPossessor ? "possessor" : "vacant",
        isVacant: !hasPossessor,
        hasPossessor,
        participantRole: hasPossessor ? "possessor" : "",
        possessorPrefix: possessivePrefix || "",
        notSubjectConnector: true,
        notTense: true
      };
      const nominalizationProfile = typeof targetObject.buildVerbDerivedNominalizationProfile === "function" ? targetObject.buildVerbDerivedNominalizationProfile({
        nominalKind,
        sourceTense,
        sourceModel: sourceCombinedMode || actionNounStemUse ? {
          matrixBase: analysisVerb || verb || renderVerb || "",
          sourceRawVerb: renderVerb || verb || analysisVerb || "",
          analysisVerb: analysisVerb || verb || "",
          combinedMode: sourceCombinedMode,
          actionNounStemUse,
          sourceSubjectPrefix: sourceSubjectPrefix || subjectPrefix,
          sourceSubjectSuffix
        } : null,
        predicateStateSlot,
        num1Num2: connector,
        patientivoSource,
        patientiveSourceStageFrame,
        patientiveMultipleDerivationContract
      }) : null;
      return {
        num1Num2: connector,
        nominalizationProfile,
        relationalNncBoundaryFrame: buildGeneratedRelationalNncBoundaryFrameMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb,
          nominalizationProfile
        }),
        placeGentilicNncBoundaryFrame: buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb,
          nominalizationProfile
        }),
        denominalFamilyProfile: buildGeneratedDenominalFamilyProfileMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb
        }),
        adverbialAdjunctionBoundaryFrame: buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb,
          sourceTense
        }),
        nominalClauseFrame: {
          version: 1,
          clauseKind: "nominal-nuclear-clause",
          predicateKind: String(nominalKind || ""),
          hasTensePosition: false,
          tense: null,
          subject: {
            numberConnector: connector,
            numberConnectors: [connector]
          },
          predicate: {
            kind: String(nominalKind || ""),
            state: predicateStateSlot.state,
            stateSlot: predicateStateSlot
          },
          stateSlot: predicateStateSlot
        }
      };
    }
    function executeNuclearClauseSurfaceRequest(request = {}) {
      let options = request?.options || {};
      if (typeof targetObject.Event !== "undefined" && options instanceof targetObject.Event) {
        options = {};
      }
      options = targetObject.sanitizeNuclearClauseSurfaceOptions(options);
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
      const posicionesFormula = typeof targetObject.normalizeNuclearClauseSurfaceFormulaPositions === "function" ? targetObject.normalizeNuclearClauseSurfaceFormulaPositions(request?.posicionesFormula || override?.posicionesFormula || null, {}, {
        override
      }) : null;
      const entradasInternas = typeof targetObject.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula === "function" ? targetObject.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula) : {};
      let pers1 = entradasInternas.pers1 || "";
      let obj1 = entradasInternas.obj1 || "";
      let tronco = entradasInternas.tronco || "";
      let pers2 = entradasInternas.pers2 || entradasInternas.num2 || "";
      let poseedor = entradasInternas.poseedor || "";
      let pers1Slot = pers1;
      let obj1Slot = obj1;
      let troncoSlot = tronco;
      let pers2Slot = pers2;
      let poseedorSlot = poseedor;
      const inputPers1 = pers1;
      const inputPers2 = pers2;
      const entradaTronco = request?.entradaTronco && typeof request.entradaTronco === "object" ? request.entradaTronco : {};
      const tieneControlTronco = entradaTronco.tieneControlTronco === true;
      const valorTronco = String(entradaTronco.valorTronco || "");
      const clearError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "clearError");
      const setError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "setError");
      const onSearchQueryOnly = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onSearchQueryOnly");
      const onValidationError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onValidationError");
      const onEntradaTroncoSync = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onEntradaTroncoSync");
      const onAnalisisTroncoResuelto = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onAnalisisTroncoResuelto");
      const onComplete = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onComplete");
      const patientivoOwnership = override?.patientivoOwnership ?? targetObject.DEFAULT_PATIENTIVO_OWNERSHIP;
      const patientivoSource = override?.patientivoSource ?? "nonactive";
      const patientivoNominalSuffix = override?.patientivoNominalSuffix ?? null;
      const actionNounStemUse = String(override?.actionNounStemUse || "");
      let searchQuery = "";
      let hasSearchQuery = false;
      let hasSearchSeparator = false;
      if (!override?.tronco && tieneControlTronco) {
        const searchParts = targetObject.getSearchParts(troncoSlot);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = targetObject.rememberNonSearchValue(searchParts);
        if (baseValue) {
          troncoSlot = searchParts.base;
        } else if (hasSearchQuery && targetObject.VerbInputState.lastNonSearchValue) {
          troncoSlot = targetObject.VerbInputState.lastNonSearchValue;
        }
        if (hasSearchQuery && !troncoSlot) {
          if (!silent) {
            onSearchQueryOnly({
              valorTronco
            });
          }
          return null;
        }
      }
      let tiempo = posicionesFormula?.tiempo || override?.tiempo || "";
      if (!tiempo) {
        const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
        tiempo = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
      }
      let tense = normalizeNuclearClauseSurfaceTenseValue(tiempo);
      if (isOrdinaryNncGenerationOptIn(override)) {
        return executeOrdinaryNncGenerationRoute({
          override,
          verb: troncoSlot,
          pers1: pers1Slot,
          pers2: pers2Slot,
          poseedor: poseedorSlot
        });
      }
      if (isAdjectivalNncGenerationOptIn(override)) {
        return executeAdjectivalNncGenerationRoute({
          override,
          verb: troncoSlot,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot
        });
      }
      const isTroncoNajActiveWrapperTense = targetObject.isPotencialTroncoNajActiveTense(tense);
      const isPatientivoAdjectiveProfile = targetObject.isPatientivoAdjectiveTense(tense);
      const isNominalOutputProfile = targetObject.isNominalMorphProfileTense(tense);
      const isPresentAgentivoNominalProfile = tense === "agentivo-presente";
      const isPreteritAgentivoNominalProfile = tense === "agentivo-preterito";
      const isFutureAgentivoNominalProfile = tense === "agentivo-futuro";
      if (targetObject.isPotencialProfileTense(tense) && tense !== "potencial") {
        poseedorSlot = "";
      }
      const overrideInstrumentivoMode = override?.instrumentivoMode === targetObject.INSTRUMENTIVO_MODE.posesivo ? targetObject.INSTRUMENTIVO_MODE.posesivo : override?.instrumentivoMode === targetObject.INSTRUMENTIVO_MODE.absolutivo ? targetObject.INSTRUMENTIVO_MODE.absolutivo : "";
      if (tense === "instrumentivo" && overrideInstrumentivoMode === targetObject.INSTRUMENTIVO_MODE.posesivo && !poseedorSlot && typeof targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject === "function") {
        poseedorSlot = targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
      }
      if (tense === "calificativo-instrumentivo" && actionNounStemUse === "general-use" && !poseedorSlot && typeof targetObject.resolveNawatPossessorPrefixFromSourceSubject === "function") {
        poseedorSlot = targetObject.resolveNawatPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
      }
      if (isPresentAgentivoNominalProfile) {
        poseedorSlot = "";
      }
      if (isPatientivoAdjectiveProfile) {
        poseedorSlot = "";
      }
      if (isTroncoNajActiveWrapperTense) {
        obj1Slot = "";
      }
      let baseObj1Slot = obj1Slot;
      let isReflexive = obj1Slot === "mu";
      let isYawiOptativeSingular = false;
      let shouldAddYuVariant = false;
      const yawiSurfaceBase = targetObject.getSuppletiveYawiImperfective();
      const yawiPresentLong = yawiSurfaceBase;
      const yawiPresentShort = yawiSurfaceBase;
      const yawiHabitual = yawiSurfaceBase;
      const yawiCanonicalLong = targetObject.getSuppletiveYawiCanonical();
      const yawiCanonicalShort = targetObject.getSuppletiveYawiShort();
      const yawiYuVariant = targetObject.getSuppletiveYawiYuVariant();
      let primaryFormSpec = null;
      let troncoRender = "";
      const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
          return null;
        }
        errorTargets.forEach(target => setError(target));
        if (!silent) {
          onValidationError({
            tiempo: tense,
            obj1Base: baseObj1Slot
          });
        }
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            error: message
          },
          message,
          diagnosticId: "nuclear-clause-surface-validation-error",
          routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
          routeStage: "validate",
          resultMarker: null,
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      };
      const returnIfError = (message, errorTargets = []) => {
        const error = returnError(message, errorTargets);
        return error || null;
      };
      const buildActiveNuclearClauseSurfaceText = ({
        pers1Slot: pers1SlotValue = "",
        obj1Slot: obj1SlotValue = "",
        pers2Slot: pers2SlotValue = "",
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
        isYawiOptative = false
      } = {}) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const usePossessivePrefix = tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "agentivo-presente" || tense === "agentivo-preterito" || tense === "agentivo-futuro" || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
        const preposedParticle = tense === "optativo" ? isYawiOptative ? "ma " : targetObject.getPers1Pers2Info(pers1SlotValue, pers2SlotValue)?.person === 2 ? "" : "ma " : "";
        const outputTextOptions = {
          particulaPrepuesta: preposedParticle,
          pers1: pers1SlotValue,
          poseedor: usePossessivePrefix ? poseedorSlot : "",
          obj1: obj1SlotValue,
          tronco: resolvedTroncoSlot,
          pers2: pers2SlotValue,
          hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI === true,
          optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter || "",
          directionalChainMeta,
          surfaceRuleMeta
        };
        const outputSurfaceResult = isNominalOutputProfile ? targetObject.buildNominalOutputResult({
          ...outputTextOptions,
          sufijoNominal: trailingSuffix
        }) : targetObject.buildOutputWordResult(outputTextOptions);
        collectGeneratedSurfaceSoundSpellingFrames(outputSurfaceResult);
        collectGeneratedOutputSurfaceRecord(outputSurfaceResult);
        return outputSurfaceResult.surface || "";
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
      const generatedSurfaceSoundSpellingFrames = [];
      const generatedOutputSurfaceRecords = [];
      const collectGeneratedSurfaceSoundSpellingFrames = (...sources) => {
        collectNuclearClauseSurfaceSoundSpellingFrames(...sources).forEach(frame => {
          const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
          if (!key || generatedSurfaceSoundSpellingFrames.some(entry => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
            return;
          }
          generatedSurfaceSoundSpellingFrames.push(frame);
        });
      };
      const collectGeneratedOutputSurfaceRecord = (record = null) => {
        if (!record || typeof record !== "object") {
          return;
        }
        const surface = String(record.surface || "");
        const segments = normalizeCnvSurfacePathSegments(record.segments || []);
        if (!surface && !segments.length) {
          return;
        }
        if (generatedOutputSurfaceRecords.some(entry => entry.surface === surface)) {
          return;
        }
        generatedOutputSurfaceRecords.push({
          surface,
          segments
        });
      };
      const buildSurfaceFromCurrentSlots = (overrideTronco = troncoSlot, overrideSuffix = pers2Slot) => {
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(primaryFormSpec, {
          verb: overrideTronco,
          subjectSuffix: overrideSuffix
        }) : null;
        return buildActiveNuclearClauseSurfaceText({
          pers1Slot: pers1Slot,
          obj1Slot: obj1Slot,
          pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : overrideSuffix,
          troncoSlot: realizedNominal ? realizedNominal.verb : overrideTronco,
          trailingSuffix: appliedMorphology?.trailingSuffix || "",
          directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
          surfaceRuleMeta: getCurrentSurfaceRuleMeta(),
          isYawiOptative: isYawiOptativeSingular
        });
      };
      const buildSurfaceFromSlotParts = ({
        pers1Slot: pers1SlotValue,
        obj1Slot: obj1SlotValue,
        pers2Slot: pers2SlotValue,
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        formSpec = null,
        trailingSuffix = "",
        isYawiOptative = false,
        directionalChainMeta = null,
        surfaceRuleMeta = null
      }) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(formSpec, {
          verb: resolvedTroncoSlot,
          subjectSuffix: pers2SlotValue
        }) : null;
        return buildActiveNuclearClauseSurfaceText({
          pers1Slot: pers1SlotValue,
          obj1Slot: obj1SlotValue,
          pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : pers2SlotValue,
          troncoSlot: realizedNominal ? realizedNominal.verb : resolvedTroncoSlot,
          trailingSuffix,
          directionalChainMeta,
          surfaceRuleMeta,
          isYawiOptative
        });
      };
      clearError("subject-prefix");
      clearError("object-prefix");
      clearError("subject-suffix");
      const rawVerb = String(troncoSlot || "");
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
      troncoSlot = parsedVerb.verb;
      troncoRender = parsedVerb.displayVerb;
      const rootPlusYaAdjectivalSource = typeof targetObject.resolveRootPlusYaAdjectivalNncSource === "function" ? targetObject.resolveRootPlusYaAdjectivalNncSource(parsedVerb) : {
        supported: parsedVerb.isRootPlusYa === true && parsedVerb.isWeya !== true && parsedVerb.hasSlashMarker !== true
      };
      if (tense === "adjetivo-preterito" && resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.active && rootPlusYaAdjectivalSource.supported === true) {
        return executeAdjectivalNncGenerationRoute({
          override: {
            ...override,
            adjectivalNnc: {
              ...(override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {}),
              enabled: true,
              stem: rawVerb || troncoRender || troncoSlot,
              state: "absolutive",
              formation: "root-plus-ya-obsolete-preterit",
              role: "predicate-surface"
            }
          },
          verb: rawVerb || troncoRender || troncoSlot,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot
        });
      }
      if (tense === "adjetivo-preterito" && resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.active && rootPlusYaAdjectivalSource.diagnosticId === "adjectival-nnc-root-plus-ya-exception") {
        return executeAdjectivalNncGenerationRoute({
          override: {
            ...override,
            adjectivalNnc: {
              ...(override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {}),
              enabled: true,
              stem: rawVerb || troncoRender || troncoSlot,
              state: "absolutive",
              formation: "root-plus-ya-obsolete-preterit",
              role: "predicate-surface"
            }
          },
          verb: rawVerb || troncoRender || troncoSlot,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot
        });
      }
      let analysisVerb = parsedVerb.analysisVerb;
      const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
      let indirectObjectMarker = posicionesFormula?.obj2 || parsedVerb.indirectObjectMarker;
      let thirdObjectMarker = posicionesFormula?.obj3 || "";
      const sourceSelectedProjectiveObjectPrefix = obj1Slot;
      const sourceSelectedProjectiveMarkers = [obj1Slot, indirectObjectMarker, thirdObjectMarker].filter(marker => marker === "ta" || marker === "te");
      const passivePatientivoSelectedProjectiveObjectPrefix = tense === "patientivo" && targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) === "passive" && sourceSelectedProjectiveMarkers.length > 1 && (sourceSelectedProjectiveObjectPrefix === "ta" || sourceSelectedProjectiveObjectPrefix === "te") ? sourceSelectedProjectiveObjectPrefix : "";
      const customaryPresentPatientiveSelectedProjectiveObjectPrefix = sourceSelectedProjectiveMarkers.length > 1 && (sourceSelectedProjectiveObjectPrefix === "ta" || sourceSelectedProjectiveObjectPrefix === "te") ? sourceSelectedProjectiveObjectPrefix : "";
      ({
        obj1: obj1Slot,
        baseObj1: baseObj1Slot
      } = targetObject.applyBoundMarkerSlotOverrides(parsedVerb, obj1Slot, baseObj1Slot, {
        preserveOccupiedSourceObjectPrefix: isNominalOutputProfile
      }));
      if (parsedVerb.hasImpersonalTaPrefix) {
        obj1Slot = "";
        baseObj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      ({
        obj1: obj1Slot,
        obj2: indirectObjectMarker
      } = targetObject.resolveObj1Obj2Positions({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType
      }));
      if (isTroncoNajActiveWrapperTense) {
        obj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      baseObj1Slot = obj1Slot;
      const sourceValency = targetObject.getActiveVerbValency(parsedVerb);
      const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
      const validationVerb = troncoSlot;
      const hasObjectSelection = Boolean(obj1Slot || indirectObjectMarker || thirdObjectMarker);
      const allowIntransitiveSuppletiveContext = targetObject.isSuppletiveIntransitiveOnlyContext(parsedVerb, {
        hasObjectSelection
      });
      let isYawi = parsedVerb.isYawi === true && allowIntransitiveSuppletiveContext;
      const isWeya = parsedVerb.isWeya === true && allowIntransitiveSuppletiveContext;
      isReflexive = obj1Slot === "mu";
      const directionalPrefix = parsedVerb.directionalPrefix;
      const rawSuppletivePath = targetObject.getSuppletiveStemPath(parsedVerb);
      const suppletivePath = rawSuppletivePath && targetObject.isIntransitiveOnlySuppletiveId(rawSuppletivePath.id) && !allowIntransitiveSuppletiveContext ? null : rawSuppletivePath;
      let suppletiveStemSet = suppletivePath?.stemSet || null;
      const isYawiSuppletive = suppletivePath?.id === "yawi";
      const yawiPrefix = isYawiSuppletive && analysisVerb && troncoSlot.endsWith(analysisVerb) ? troncoSlot.slice(0, -analysisVerb.length) : "";
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
      const yawiCanonicalLongPrefixed = applyYawiPrefix(yawiCanonicalLong);
      const yawiCanonicalShortPrefixed = applyYawiPrefix(yawiCanonicalShort);
      const yawiYuVariantPrefixed = applyYawiPrefix(yawiYuVariant);
      if (suppletiveStemSet?.imperfective && !targetObject.isPerfectiveTense(tense)) {
        troncoSlot = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
      }
      const isPotencialHabitualNominalProfile = targetObject.isPotencialHabitualTense(tense) && resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPotencialHabitualNominalNonactive = isPotencialHabitualNominalProfile;
      const isSustantivoVerbalImpersonalActionProfile = tense === "sustantivo-verbal" && resolvedTenseMode === targetObject.TENSE_MODE.sustantivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isCalificativoInstrumentivoPassiveActionProfile = tense === "calificativo-instrumentivo" && resolvedTenseMode === targetObject.TENSE_MODE.sustantivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPassiveImpersonalMode = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedVoiceMode === targetObject.VOICE_MODE.passive || isPotencialHabitualNominalNonactive || isSustantivoVerbalImpersonalActionProfile || isCalificativoInstrumentivoPassiveActionProfile;
      const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
      let preserveSubjectForPassive = preservePassiveSubject;
      const valencySummary = targetObject.getVerbValencySummary(parsedVerb);
      const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
      const hasPromotableObject = targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(obj1Slot) || fusionPrefixes.some(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix)) || hasOpenObjectSlot;
      const hasSubjectValent = !isPassiveImpersonalMode || targetValency > 0 && hasPromotableObject;
      const shouldDelayPretAllomorphy = targetObject.shouldDelaySlashSupportiveIAllomorphyForPret({
        parsedVerb,
        tense,
        obj1Slot: obj1Slot,
        indirectObjectMarker,
        thirdObjectMarker
      });
      const allomorphyResult = shouldDelayPretAllomorphy ? {
        verb: troncoSlot,
        analysisVerb,
        morphologyObj1: obj1Slot,
        soundSpellingFrames: []
      } : targetObject.applyObj1Allomorphy({
        verb: troncoSlot,
        analysisVerb,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isPassiveImpersonalMode,
        ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
      });
      troncoSlot = allomorphyResult.verb;
      analysisVerb = allomorphyResult.analysisVerb;
      let morphologyObj1Slot = allomorphyResult.morphologyObj1;
      let allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(allomorphyResult.soundSpellingFrames);
      if (!silent) {
        const resolvedComposerDisplayValue = targetObject.isVerbInputModeComposer() ? targetObject.resolveVerbInputSource(valorTronco || rawVerb, {
          mode: targetObject.VERB_INPUT_MODE.composer
        }).displayValue : "";
        const siguienteValorTronco = targetObject.isVerbInputModeComposer() ? resolvedComposerDisplayValue || rawVerb : targetObject.serializeRegexInputValue(parseInputVerb) || parseInputVerb;
        onEntradaTroncoSync({
          siguienteValorTronco
        });
      }
      const isNonactive = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive || isPotencialHabitualNominalNonactive || isSustantivoVerbalImpersonalActionProfile || isCalificativoInstrumentivoPassiveActionProfile;
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
        const optionVerb = overrides.verb ?? troncoSlot;
        const optionAnalysisVerb = overrides.analysisVerb ?? analysisVerb;
        const optionIsYawi = overrides.isYawi ?? isYawi;
        const optionSuppletiveStemSet = overrides.suppletiveStemSet ?? suppletiveStemSet;
        const reducedPotencialHabitualSource = targetObject.resolvePotencialHabitualReducedNonactiveSource({
          parsedVerb,
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          obj1Slot: obj1Slot,
          tense,
          tenseMode: resolvedTenseMode,
          derivationMode: resolvedDerivationMode
        });
        return targetObject.buildNonactiveDerivationOptions({
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          obj1Slot: obj1Slot,
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
        renderVerb: troncoRender,
        obj1Base: baseObj1Slot,
        tense,
        isReflexive,
        initialState: {
          verb: troncoSlot,
          analysisVerb,
          isYawi,
          suppletiveStemSet
        }
      });
      if (forwardDerivations.noStemMask) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: forwardDerivations.noStemMask,
          message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
          diagnosticId: "nuclear-clause-surface-forward-derivation-no-stem",
          routeFamily: "forward-derivation",
          routeStage: "no-stem-mask",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      ({
        verb: troncoSlot,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = forwardDerivations);
      let causativeAllStems = forwardDerivations.causativeAllStems;
      let applicativeAllStems = forwardDerivations.applicativeAllStems;
      let causativeAllStemSpecs = forwardDerivations.causativeAllStemSpecs || null;
      let applicativeAllStemSpecs = forwardDerivations.applicativeAllStemSpecs || null;
      const forwardStemProvenance = !isNonactive && resolvedDerivationType === targetObject.DERIVATION_TYPE.causative && forwardDerivations.causativeSelectionMeta ? targetObject.buildForwardDerivationProvenance({
        sourceVerb: troncoRender,
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
        verb: troncoSlot,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = targetObject.extractForwardDerivationState(nonactiveDerivation, {
        verb: troncoSlot,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      }));
      let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
      let nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs) ? nonactiveDerivation.nonactiveAllStemSpecs : null;
      ({
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive
      } = targetObject.applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive
      }));
      const passiveValencyAdjustments = targetObject.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode,
        verb: troncoSlot,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObj1: morphologyObj1Slot,
        hasPromotableObject
      });
      troncoSlot = passiveValencyAdjustments.verb;
      analysisVerb = passiveValencyAdjustments.analysisVerb;
      pers1Slot = passiveValencyAdjustments.pers1;
      pers2Slot = passiveValencyAdjustments.pers2;
      obj1Slot = passiveValencyAdjustments.obj1;
      indirectObjectMarker = passiveValencyAdjustments.obj2;
      thirdObjectMarker = passiveValencyAdjustments.obj3;
      preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
      morphologyObj1Slot = passiveValencyAdjustments.morphologyObj1;
      const shouldApplyDerivedAllomorphy = !!targetObject.getForwardDerivationConfig(resolvedDerivationType);
      if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = targetObject.applyObj1Allomorphy({
          verb: troncoSlot,
          analysisVerb,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: morphologyObj1Slot,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker,
          isPassiveImpersonalMode,
          ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
        });
        troncoSlot = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObj1Slot = derivedAllomorphy.morphologyObj1;
        allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(allomorphySoundSpellingFrames, derivedAllomorphy.soundSpellingFrames);
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
        troncoSlot = overrideVerb;
        analysisVerb = overrideVerb;
      }
      if (!isNonactive && resolvedTenseMode === targetObject.TENSE_MODE.verbo && suppletivePath?.activeTenses && !suppletivePath.activeTenses.has(tense)) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
      }
      isYawiOptativeSingular = isYawi && tense === "optativo" && pers2Slot === "";
      shouldAddYuVariant = isYawi && (tense === "presente" || isYawiOptativeSingular);
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
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              error: true,
              surfaceForms: [],
              isReflexive
            },
            message: "El verbo debe terminar en vocal.",
            diagnosticId: "nuclear-clause-surface-final-vowel-gate-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "raw-input-final-vowel-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
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
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              error: true,
              surfaceForms: [],
              isReflexive
            },
            message: "El segmento final del verbo no cumple un patrón silábico válido.",
            diagnosticId: "nuclear-clause-surface-stem-syllable-gate-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "raw-input-stem-syllable-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        const message = "El segmento final del verbo no cumple un patrón silábico válido.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      if (isYawi && (tense === "presente" || isYawiOptativeSingular)) {
        const useLongYawiSlot = pers2Slot === "t" || pers1Slot === "";
        if (useLongYawiSlot) {
          troncoSlot = yawiPresentLongPrefixed;
        } else {
          troncoSlot = yawiPresentShortPrefixed;
        }
      }
      if (isYawi && (tense === "presente-habitual" || tense === "agentivo" || tense === "potencial-habitual")) {
        troncoSlot = yawiHabitualPrefixed;
      }
      const resetSubjectOverride = {
        ...(override && typeof override === "object" ? override : {})
      };
      if (posicionesFormula && Object.prototype.hasOwnProperty.call(posicionesFormula, "pers1")) {
        resetSubjectOverride.pers1 = pers1Slot;
      }
      if (posicionesFormula && (Object.prototype.hasOwnProperty.call(posicionesFormula, "pers2") || Object.prototype.hasOwnProperty.call(posicionesFormula, "num2"))) {
        resetSubjectOverride.pers2 = pers2Slot;
      }
      ({
        pers1: pers1Slot,
        pers2: pers2Slot
      } = targetObject.resetPers1Pers2ForNominalTiempos({
        tiempo: tense,
        override: resetSubjectOverride,
        pers1: pers1Slot,
        pers2: pers2Slot
      }));
      const isPassiveImpersonal = isPassiveImpersonalMode;
      if (isPassiveImpersonal) {
        const passiveOverrides = targetObject.applyPassiveImpersonalSlotOverrides({
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          analysisVerb,
          preserveSubjectForPassive,
          allowPassiveObject
        });
        pers1Slot = passiveOverrides.pers1;
        pers2Slot = passiveOverrides.pers2;
        obj1Slot = passiveOverrides.obj1;
        morphologyObj1Slot = passiveOverrides.morphologyObj1;
      }
      const allowReflexiveAutoSwitch = !indirectObjectMarker && !thirdObjectMarker || resolvedDerivationType === targetObject.DERIVATION_TYPE.applicative;
      const reflexiveUpdate = allowReflexiveAutoSwitch ? targetObject.applyReflexivoAutoSwitch({
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        isPassiveImpersonal,
        clearError
      }) : {
        obj1Slot: obj1Slot,
        isReflexive: obj1Slot === "mu"
      };
      obj1Slot = reflexiveUpdate.obj1 ?? reflexiveUpdate.obj1Slot;
      isReflexive = reflexiveUpdate.isReflexive;
      const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
      const isNounTense = targetObject.isNonanimateNounTense(tense) || targetObject.isPotencialProfileTense(tense) || isPatientivoAdjectiveProfile || tense === "agentivo" || isPresentAgentivoNominalProfile || isPreteritAgentivoNominalProfile || isFutureAgentivoNominalProfile || tense === "patientivo" || tense === "instrumentivo" || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
      const invalidComboObjectPrefix = targetObject.resolveComboValidationObj1({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType
      });
      if (!skipValidation && !isNounTense && targetObject.INVALID_COMBINATION_KEYS.has(targetObject.getPers1Obj1Pers2Key(pers1Slot, invalidComboObjectPrefix, pers2Slot))) {
        const message = "Combinacion inválida";
        const error = returnIfError(message, ["subject-prefix", "object-prefix", "subject-suffix"]);
        if (error) return error;
      }
      clearError("object-prefix");
      if (isNounTense) {
        const sourceSubjectMapsToPossessor = tense === "calificativo-instrumentivo" && actionNounStemUse === "general-use";
        if (targetObject.isNonanimateNounTense(tense) && !sourceSubjectMapsToPossessor && !targetObject.isNonanimatePers1Pers2(pers1Slot, pers2Slot)) {
          const message = tense === "sustantivo-verbal" ? "Sustantivo verbal solo con 3a persona no animada común." : "Solo 3a persona no animada (singular o plural).";
          const error = returnIfError(message, ["subject-prefix", "subject-suffix"]);
          if (error) return error;
        }
        const isTransitiveVerb = targetObject.getBaseObjectSlots(parsedVerb) > 0;
        if ((tense === "patientivo" && patientivoSource === "tronco-verbal" || isPatientivoAdjectiveProfile && targetObject.getPatientivoAdjectiveSourceForTense(tense) === "tronco-verbal") && isTransitiveVerb && !obj1Slot) {
          obj1Slot = "ta";
          morphologyObj1Slot = "ta";
        }
        if (resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && targetObject.isIntransitiveOnlyActiveAdjectiveTense(tense) && isTransitiveVerb) {
          if (skipValidation) {
            return buildNuclearClauseSurfaceBlockedResult({
              result: {
                result: "—",
                error: true,
                surfaceForms: [],
                isReflexive
              },
              message: "Adjetivo activo solo para verbos intransitivos.",
              diagnosticId: "nuclear-clause-surface-active-adjective-transitive-blocked",
              routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
              routeStage: "adjective-active-valency-gate",
              resultMarker: "—",
              override,
              resolvedTenseMode,
              tense,
              pers1: pers1Slot,
              pers2: pers2Slot,
              obj1: obj1Slot,
              poseedor: poseedorSlot,
              verb: troncoSlot,
              renderVerb: troncoRender,
              isReflexive,
              resolvedDerivationMode,
              resolvedDerivationType,
              resolvedVoiceMode,
              enumerableContract: false
            });
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
          object: obj1Slot || "",
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
        if (slotPlans.length >= 3 && !targetObject.isValidObj1Obj2Obj3Combo({
          obj1: obj1Slot,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker
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
      if (isWitziNonactive && tense === "preterito" && pers2Slot === "t") {
        pers2Slot = "et";
      }
      if (isPotencialHabitualNominalProfile && sourceSelectedProjectiveObjectPrefix === "mu") {
        morphologyObj1Slot = "ne";
      }
      const skipPretClass = isWitziNonactive && targetObject.SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);
      const isUnderlyingTransitive = !isNonactive ? resolvedDerivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.isMarkedTransitive || parsedVerb.isTaFusion : Boolean(morphologyObj1Slot || indirectObjectMarker || thirdObjectMarker || parsedVerb.isTaFusion);
      const forceTransitiveBase = parsedVerb.isTaFusion || isUnderlyingTransitive;
      if (!silent) {
        onAnalisisTroncoResuelto({
          tronco: troncoSlot,
          troncoAnalisis: analysisVerb,
          troncoAnalisisExacto: analysisExactVerb,
          obj1Morfologico: morphologyObj1Slot,
          fuerzaTransitivaBase: forceTransitiveBase,
          isYawi,
          isWeya,
          resolvedDerivationType,
          parsedVerb,
          troncoRender: troncoRender
        });
      }
      const formulaStemBeforeInflection = troncoSlot;
      const baseMorphologyInput = {
        pers1: pers1Slot,
        obj1: morphologyObj1Slot,
        pers2: pers2Slot,
        subjectPrefix: pers1Slot,
        objectPrefix: morphologyObj1Slot,
        subjectSuffix: pers2Slot,
        pers1Slot: pers1Slot,
        obj1Slot: morphologyObj1Slot,
        pers2Slot: pers2Slot,
        verb: troncoSlot,
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
        passivePatientivoSelectedProjectiveObjectPrefix,
        possessivePrefix: poseedorSlot,
        poseedorSlot: poseedorSlot,
        actionNounStemUse,
        combinedMode: isNonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        customaryPresentPatientiveNnc: isPotencialHabitualNominalProfile,
        customaryPresentPatientivePlural: isPotencialHabitualNominalProfile && inputPers2 === "t",
        customaryPresentPatientiveSelectedProjectiveObjectPrefix,
        instrumentivoMode: overrideInstrumentivoMode || (poseedorSlot === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo),
        derivationType: resolvedDerivationType,
        isNonactiveMode: isNonactive,
        stemProvenanceSeed: forwardStemProvenance
      };
      appliedMorphology = targetObject.applyMorphologyRules(baseMorphologyInput);
      if (!appliedMorphology?.error && allomorphySoundSpellingFrames.length) {
        appliedMorphology = {
          ...appliedMorphology,
          soundSpellingFrames: collectNuclearClauseSurfaceSoundSpellingFrames(allomorphySoundSpellingFrames, appliedMorphology?.soundSpellingFrames)
        };
      }
      if (appliedMorphology?.error) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            error: true
          },
          message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
          diagnosticId: "nuclear-clause-surface-morphology-application-blocked",
          routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
          routeStage: "morphology-application",
          resultMarker: null,
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: morphologyObj1Slot,
          poseedor: poseedorSlot,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      const formulaStemContext = {
        stem: formulaStemBeforeInflection,
        pers1: inputPers1
      };
      const realizedFormulaObj1Slot = String(isReflexive ? "mu" : appliedMorphology?.objectPrefix ?? morphologyObj1Slot);
      const foldedPreteritFormulaObj1Slot = !isReflexive && !realizedFormulaObj1Slot && morphologyObj1Slot && tense === "preterito" ? getGeneratedPreteritFoldedObjectPrefix(morphologyObj1Slot, inputPers1) : realizedFormulaObj1Slot;
      const formulaReflexiveBeforeInflection = isReflexive ? getLesson6DirectNawatFormulaObjectPrefix("mu", formulaStemContext) : "";
      const formulaObj1BeforeInflection = isReflexive ? formulaReflexiveBeforeInflection : getLesson6DirectNawatFormulaObjectPrefix(foldedPreteritFormulaObj1Slot, formulaStemContext);
      const formulaObj2BeforeInflection = getLesson6DirectNawatFormulaObjectPrefix(indirectObjectMarker, formulaStemContext);
      const formulaObj3BeforeInflection = getLesson6DirectNawatFormulaObjectPrefix(thirdObjectMarker, formulaStemContext);
      if (isPotencialHabitualNominalProfile) {
        const customaryPresentSubjectSuffix = String(appliedMorphology.subjectSuffix || "");
        const customaryPresentPluralSuffix = inputPers2 === "t" ? "met" : "";
        const keepSelectedProjectiveInPatientiveStem = (stem = "") => {
          const normalizedStem = String(stem || "");
          if (!customaryPresentPatientiveSelectedProjectiveObjectPrefix || !normalizedStem) {
            return normalizedStem;
          }
          return normalizedStem.startsWith(customaryPresentPatientiveSelectedProjectiveObjectPrefix) ? normalizedStem : `${customaryPresentPatientiveSelectedProjectiveObjectPrefix}${normalizedStem}`;
        };
        const shouldMoveCustomaryPresentNi = customaryPresentSubjectSuffix === "ni" || customaryPresentSubjectSuffix === "nit";
        const customaryPresentVerb = keepSelectedProjectiveInPatientiveStem(shouldMoveCustomaryPresentNi ? `${appliedMorphology.verb || ""}ni` : appliedMorphology.verb);
        const customaryPresentConnector = shouldMoveCustomaryPresentNi ? customaryPresentPluralSuffix : customaryPresentSubjectSuffix;
        appliedMorphology = {
          ...appliedMorphology,
          verb: customaryPresentVerb,
          subjectSuffix: customaryPresentConnector,
          formSpec: isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(customaryPresentVerb, customaryPresentConnector) : appliedMorphology.formSpec,
          alternateForms: (appliedMorphology.alternateForms || []).map(form => {
            const formSubjectSuffix = String(form.subjectSuffix || "");
            const moveFormNi = formSubjectSuffix === "ni" || formSubjectSuffix === "nit";
            const formVerb = keepSelectedProjectiveInPatientiveStem(moveFormNi ? `${form.verb || ""}ni` : form.verb);
            const formConnector = moveFormNi ? customaryPresentPluralSuffix : formSubjectSuffix;
            return {
              ...form,
              verb: formVerb,
              subjectSuffix: formConnector,
              formSpec: isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(formVerb, formConnector) : form.formSpec
            };
          })
        };
      }
      ({
        subjectPrefix: pers1Slot,
        objectPrefix: obj1Slot,
        subjectSuffix: pers2Slot,
        verb: troncoSlot
      } = appliedMorphology);
      const isPatientivoPossessed = tense === "patientivo" && Boolean(poseedorSlot);
      if (isPatientivoPossessed) {
        pers2Slot = targetObject.adjustPatientivoPossessiveSuffix(pers2Slot, true, patientivoOwnership, {
          stem: troncoSlot
        });
        if (pers2Slot === null) {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              error: true
            },
            message: GENERATE_WORD_NO_OUTPUT_MESSAGE,
            diagnosticId: "nuclear-clause-surface-patientivo-possessive-suffix-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "patientivo-possessive-suffix",
            resultMarker: null,
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: "",
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
      }
      primaryFormSpec = appliedMorphology.formSpec || (isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(troncoSlot, pers2Slot) : null);
      let formulaShellVerb = stripGeneratedVncFormulaTenseSuffix(isNonactive ? troncoSlot : formulaStemBeforeInflection, tense, inputPers2);
      let formulaShellSubjectSuffix = "";
      let formulaShellCapturedFromStemCandidate = false;
      if (isNominalOutputProfile && isPatientivoPossessed) {
        primaryFormSpec = targetObject.withNominalFormSpecSuffix(primaryFormSpec, pers2Slot, {
          verb: troncoSlot,
          subjectSuffix: pers2Slot
        });
      }
      const alternateForms = (appliedMorphology.alternateForms || []).map(form => {
        if (!form) {
          return form;
        }
        if (!isPatientivoPossessed) {
          return isNominalOutputProfile ? targetObject.normalizeNominalFormEntry(form, {
            subjectSuffix: pers2Slot
          }) : form;
        }
        const adjustedSubjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(form.subjectSuffix ?? pers2Slot, true, patientivoOwnership, {
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
      const preteritCnvConnectorProfile = buildGeneratedPreteritCnvConnectorProfile({
        tense,
        primaryVerb: appliedMorphology?.verb || "",
        alternateForms,
        sourceSubjectSuffix: inputPers2
      });
      let stemProvenance = appliedMorphology.stemProvenance || null;
      const verbstemClassProfile = stemProvenance?.verbstemClassProfile || (typeof targetObject.buildVncVerbstemClassProfileFromProvenance === "function" ? targetObject.buildVncVerbstemClassProfileFromProvenance(stemProvenance) : null);
      if (stemProvenance && verbstemClassProfile && !stemProvenance.verbstemClassProfile) {
        stemProvenance = {
          ...stemProvenance,
          verbstemClassProfile
        };
      }
      let forms = [];
      const embeddedPrefix = targetObject.getEmbeddedVerbPrefix(parsedVerb);
      const stemMorphologyArgs = {
        baseMorphologyInput,
        directionalPrefix,
        embeddedPrefix,
        shouldApplyDerivedAllomorphy,
        isPassiveImpersonalMode,
        parsedVerb,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isNominalOutputProfile,
        tense,
        poseedor: poseedorSlot,
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
          if (!formulaShellCapturedFromStemCandidate) {
            formulaShellVerb = stripGeneratedVncFormulaTenseSuffix(morphResult.verb, tense, inputPers2);
            formulaShellSubjectSuffix = "";
            formulaShellCapturedFromStemCandidate = true;
          }
          const baseText = buildSurfaceFromSlotParts({
            pers1Slot: morphResult.pers1,
            obj1Slot: morphResult.obj1,
            pers2Slot: morphResult.pers2,
            troncoSlot: morphResult.verb,
            formSpec: morphResult.formSpec,
            trailingSuffix: morphResult.trailingSuffix || "",
            isYawiOptative: morphResult.isYawiOptative,
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
            const altText = buildSurfaceFromSlotParts({
              pers1Slot: morphResult.pers1,
              obj1Slot: form.surfaceObjectPrefix ?? morphResult.obj1,
              pers2Slot: form.subjectSuffix,
              troncoSlot: form.verb,
              formSpec: form.formSpec,
              trailingSuffix: form.trailingSuffix || "",
              isYawiOptative: morphResult.isYawiOptative,
              directionalChainMeta: morphResult.directionalChainMeta,
              surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta, form.surfaceRuleMeta)
            });
            if (altText && !forms.includes(altText)) {
              forms.push(altText);
            }
          });
        });
      } else {
        const baseText = buildSurfaceFromCurrentSlots();
        forms.push(baseText);
        alternateForms.forEach(form => {
          if (!form || !form.verb) {
            return;
          }
          const altText = buildSurfaceFromSlotParts({
            pers1Slot: pers1Slot,
            obj1Slot: form.surfaceObjectPrefix ?? obj1Slot,
            pers2Slot: form.subjectSuffix ?? pers2Slot,
            troncoSlot: form.verb,
            formSpec: form.formSpec || null,
            trailingSuffix: form.trailingSuffix || "",
            directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
            surfaceRuleMeta: mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta, form.surfaceRuleMeta),
            isYawiOptative: isYawiOptativeSingular
          });
          if (!forms.includes(altText)) {
            forms.push(altText);
          }
        });
      }
      if (isYawi && tense === "presente" && directionalPrefix !== "wal") {
        const useLongYawiSlot = pers2Slot === "t" || pers1Slot === "";
        const yawiSelectedForm = useLongYawiSlot ? yawiCanonicalLongPrefixed : yawiCanonicalShortPrefixed;
        const yawiText = buildSurfaceFromCurrentSlots(yawiSelectedForm, pers2Slot);
        if (yawiText && !forms.includes(yawiText)) {
          forms.push(yawiText);
        }
      }
      if (shouldAddYuVariant && (troncoSlot === yawiPresentShortPrefixed || troncoSlot === yawiPresentLongPrefixed)) {
        const yuText = buildSurfaceFromCurrentSlots(yawiYuVariantPrefixed);
        if (!forms.includes(yuText)) {
          forms.push(yuText);
        }
      }
      const generatedText = forms.join(" / ");
      const generatedSoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(generatedSurfaceSoundSpellingFrames, appliedMorphology?.soundSpellingFrames, appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta);
      if (!silent) {
        onComplete({
          textoGenerado: generatedText,
          analisisTronco: parsedVerb,
          procedenciaTronco: stemProvenance,
          tiempo: tense,
          troncoRender: troncoRender,
          obj1Base: baseObj1Slot
        });
      }
      const nominalClauseMetadata = isNominalOutputProfile ? buildGeneratedNominalNum1Num2Metadata({
        subjectSuffix: pers2Slot,
        nominalKind: tense,
        possessivePrefix: poseedorSlot,
        patientivoSource,
        sourceCombinedMode: isNonactive ? targetObject.COMBINED_MODE.nonactive : "",
        actionNounStemUse,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
        patientiveSourceStageFrame: appliedMorphology?.surfaceRuleMeta?.patientivoSourceStageFrame || null,
        patientiveMultipleDerivationContract: appliedMorphology?.surfaceRuleMeta?.patientivoMultipleDerivationContract || null,
        sourceSubjectPrefix: inputPers1,
        sourceSubjectSuffix: inputPers2
      }) : {};
      const formulaPers1BeforeInflection = tense === "optativo" && (inputPers1 === "ti" || inputPers1 === "an") && (appliedMorphology?.pers1 === "shi" || appliedMorphology?.subjectPrefix === "shi") ? "shi" : inputPers1;
      const nuclearClauseShell = buildGeneratedNuclearClauseShellMetadata({
        resolvedTenseMode,
        tense,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive,
        verb: troncoSlot,
        renderVerb: troncoRender,
        formulaPers1: formulaPers1BeforeInflection,
        formulaPers2: "",
        formulaObj1: formulaObj1BeforeInflection,
        formulaObj2: formulaObj2BeforeInflection,
        formulaObj3: formulaObj3BeforeInflection,
        formulaReflexive: formulaReflexiveBeforeInflection,
        formulaVerb: formulaShellVerb,
        formulaSubjectSuffix: formulaShellSubjectSuffix,
        formulaNumberConnector: preteritCnvConnectorProfile?.primaryConnector || inputPers2,
        nominalClauseMetadata
      });
      const primaryOutputSurfaceRecord = generatedOutputSurfaceRecords.find(record => record.surface === forms[0]) || generatedOutputSurfaceRecords[0] || null;
      const cnvFormulaSurfacePath = buildGeneratedCnvFormulaSurfacePath({
        nuclearClauseShell,
        surfaceRecord: primaryOutputSurfaceRecord,
        surfaceRecords: generatedOutputSurfaceRecords,
        soundSpellingFrames: generatedSoundSpellingFrames
      });
      const vncValencyFrame = buildGeneratedVncValencyFrameMetadata({
        resolvedTenseMode,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        parsedVerb,
        valencySummary,
        targetValency,
        isPassiveImpersonalMode,
        nuclearClauseShell
      });
      const derivedVoiceFrame = buildGeneratedDerivedVoiceFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationMode,
        resolvedVoiceMode,
        isNonactive,
        isPassiveImpersonalMode,
        sourceValency,
        targetValency,
        valencySummary,
        parsedVerb,
        verb: troncoSlot,
        analysisVerb,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        hasPromotableObject,
        preserveSubjectForPassive,
        allowPassiveObject
      });
      const forwardDerivationFrame = buildGeneratedForwardDerivationFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationType,
        derivationValencyDelta,
        sourceValency,
        forwardDerivations,
        forwardStemProvenance,
        causativeAllStems,
        applicativeAllStems,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb
      });
      const compoundFrame = buildGeneratedCompoundFrameMetadata({
        resolvedTenseMode,
        parsedVerb
      });
      const patientiveCompoundSourceFrame = buildGeneratedPatientiveCompoundSourceFrameMetadata({
        resolvedTenseMode,
        compoundFrame,
        nominalizationProfile: nominalClauseMetadata?.nominalizationProfile || null,
        nuclearClauseShell,
        surfaceForms: forms
      });
      const adjectivalCompoundSourceFrame = buildGeneratedAdjectivalCompoundSourceFrameMetadata({
        resolvedTenseMode,
        compoundFrame,
        nominalizationProfile: nominalClauseMetadata?.nominalizationProfile || null,
        nuclearClauseShell,
        surfaceForms: forms
      });
      const adverbialNuclearFrame = buildGeneratedAdverbialNuclearFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
        objectPrefix: obj1Slot,
        baseObjectPrefix: baseObj1Slot,
        surfaceForms: forms
      });
      const generatedAdverbialAdjunctionBoundaryFrame = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb
      });
      const sentenceLayer = typeof targetObject.buildGeneratedSentenceLayerMetadata === "function" ? targetObject.buildGeneratedSentenceLayerMetadata({
        override,
        tense,
        nuclearClauseShell,
        clauseKind: nuclearClauseShell?.clauseKind || ""
      }) : null;
      const resultPayload = {
        result: generatedText,
        surfaceForms: forms,
        isReflexive,
        stemProvenance,
        verbstemClassProfile,
        ...nominalClauseMetadata,
        nuclearClauseShell,
        vncValencyFrame,
        derivedVoiceFrame,
        forwardDerivationFrame,
        compoundFrame,
        patientiveCompoundSourceFrame,
        adjectivalCompoundSourceFrame,
        adverbialNuclearFrame,
        adverbialNuclearClauseFrame: adverbialNuclearFrame?.adverbialNuclearClauseFrame || null,
        adverbialAdjunctionBoundaryFrame: generatedAdverbialAdjunctionBoundaryFrame || nominalClauseMetadata?.adverbialAdjunctionBoundaryFrame || null,
        sentenceLayer,
        cnvFormulaSurfacePath,
        slotNameBridge: typeof targetObject.buildNuclearClauseSurfaceSlotNameBridge === "function" ? targetObject.buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula) : null,
        soundSpellingFrames: generatedSoundSpellingFrames,
        orthographyFrame: {
          soundSpellingFrames: generatedSoundSpellingFrames
        },
        posicionesFormula
      };
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily: resultPayload.generationRoute || nominalClauseMetadata?.nominalizationProfile?.role?.nominalizationKind || (resolvedTenseMode === targetObject.TENSE_MODE.verbo ? "vnc" : resolvedTenseMode),
        routeStage: "execute",
        unitKind: nuclearClauseShell?.clauseKind || (resolvedTenseMode === targetObject.TENSE_MODE.verbo ? "verbal-nuclear-clause" : "nominal-nuclear-clause"),
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        poseedor: poseedorSlot,
        posicionesFormula,
        verb: troncoSlot,
        renderVerb: troncoRender,
        nuclearClauseShell,
        cnvFormulaSurfacePath,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
      return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract
      };
    }
    function executeGenerateWordRequest(request = {}) {
      return executeNuclearClauseSurfaceRequest(request);
    }

    const api = {};
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NOOP", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NOOP; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ENGINE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ENGINE; },
    });
    api.normalizeNuclearClauseSurfaceTenseValue = normalizeNuclearClauseSurfaceTenseValue;
    api.resolveNuclearClauseSurfaceUiHook = resolveNuclearClauseSurfaceUiHook;
    api.isOrdinaryNncGenerationOptIn = isOrdinaryNncGenerationOptIn;
    api.isAdjectivalNncGenerationOptIn = isAdjectivalNncGenerationOptIn;
    api.getOrdinaryNncGenerationOptions = getOrdinaryNncGenerationOptions;
    api.getAdjectivalNncGenerationOptions = getAdjectivalNncGenerationOptions;
    api.resolveAdjectivalNncGenerationSurface = resolveAdjectivalNncGenerationSurface;
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE; },
    });
    Object.defineProperty(api, "GENERATE_WORD_NO_OUTPUT_MESSAGE", {
        configurable: true,
        enumerable: true,
        get() { return GENERATE_WORD_NO_OUTPUT_MESSAGE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID; },
    });
    Object.defineProperty(api, "LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_DIRECT_NAWAT_OBJECT_DYAD_BY_PREFIX; },
    });
    Object.defineProperty(api, "LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_MONADIC_DIRECT_NAWAT_OBJECTS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS; },
    });
    api.getLesson6DirectNawatReflexiveDyadForStem = getLesson6DirectNawatReflexiveDyadForStem;
    api.splitLesson6DirectNawatDyad = splitLesson6DirectNawatDyad;
    api.getLesson6DirectNawatObjectDyadFrame = getLesson6DirectNawatObjectDyadFrame;
    api.getLesson6DirectNawatFormulaObjectPrefix = getLesson6DirectNawatFormulaObjectPrefix;
    api.getNuclearClauseSurfaceEngineInvariants = getNuclearClauseSurfaceEngineInvariants;
    api.buildNuclearClauseSurfaceEngineContract = buildNuclearClauseSurfaceEngineContract;
    api.normalizeNuclearClauseSurfaceContractSurface = normalizeNuclearClauseSurfaceContractSurface;
    api.splitNuclearClauseSurfaceContractText = splitNuclearClauseSurfaceContractText;
    api.getNuclearClauseSurfaceResultFrame = getNuclearClauseSurfaceResultFrame;
    api.getNuclearClauseSurfaceResultFramePayload = getNuclearClauseSurfaceResultFramePayload;
    api.resolveNuclearClauseSurfaceContractSurface = resolveNuclearClauseSurfaceContractSurface;
    api.resolveNuclearClauseSurfaceResultFrameSurface = resolveNuclearClauseSurfaceResultFrameSurface;
    api.resolveNuclearClauseSurfaceNominalConnectorSurface = resolveNuclearClauseSurfaceNominalConnectorSurface;
    api.resolveNuclearClauseSurfaceNominalConnectorDisplaySurface = resolveNuclearClauseSurfaceNominalConnectorDisplaySurface;
    api.resolveNuclearClauseSurfaceFrameSourceInput = resolveNuclearClauseSurfaceFrameSourceInput;
    api.getNuclearClauseSurfaceSoundSpellingFrameKey = getNuclearClauseSurfaceSoundSpellingFrameKey;
    api.collectNuclearClauseSurfaceSoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames;
    Object.defineProperty(api, "CNV_FORMULA_SURFACE_SLOT_ROLES", {
        configurable: true,
        enumerable: true,
        get() { return CNV_FORMULA_SURFACE_SLOT_ROLES; },
    });
    api.normalizeCnvSurfacePathSegments = normalizeCnvSurfacePathSegments;
    api.getCnvSurfacePathSegmentValue = getCnvSurfacePathSegmentValue;
    api.splitGeneratedPreteritCnvFoldedConnector = splitGeneratedPreteritCnvFoldedConnector;
    api.buildGeneratedPreteritCnvConnectorProfile = buildGeneratedPreteritCnvConnectorProfile;
    api.getGeneratedPreteritFoldedObjectPrefix = getGeneratedPreteritFoldedObjectPrefix;
    api.stripCnvFormulaSurfacePrefix = stripCnvFormulaSurfacePrefix;
    api.stripCnvFormulaSurfacePrefixWithTrace = stripCnvFormulaSurfacePrefixWithTrace;
    api.getCnvFormulaFoldableBasePrefixes = getCnvFormulaFoldableBasePrefixes;
    api.stripCnvFormulaPreteritFoldedBasePrefixesWithTrace = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace;
    api.stripCnvFormulaPreteritFoldedBasePrefixes = stripCnvFormulaPreteritFoldedBasePrefixes;
    api.getCnvFormulaPreteritFoldedSurfaceSlots = getCnvFormulaPreteritFoldedSurfaceSlots;
    api.normalizeCnvFormulaMorphForSurface = normalizeCnvFormulaMorphForSurface;
    api.getCnvFormulaSlotDisplayMorph = getCnvFormulaSlotDisplayMorph;
    api.splitCnvFormulaSubslots = splitCnvFormulaSubslots;
    api.getCnvFormulaObjectMorph = getCnvFormulaObjectMorph;
    api.getCnvFormulaObjectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots;
    api.buildCnvFormulaAndrewsPathSlots = buildCnvFormulaAndrewsPathSlots;
    api.getCnvFormulaSurfacePathFrames = getCnvFormulaSurfacePathFrames;
    api.getCnvFormulaSurfacePathRecordKey = getCnvFormulaSurfacePathRecordKey;
    api.buildCnvFormulaSurfacePathRecord = buildCnvFormulaSurfacePathRecord;
    api.buildGeneratedCnvFormulaSurfacePath = buildGeneratedCnvFormulaSurfacePath;
    api.buildNuclearClauseSurfaceDiagnosticEntry = buildNuclearClauseSurfaceDiagnosticEntry;
    api.getNuclearClauseSurfaceFailedLayerContract = getNuclearClauseSurfaceFailedLayerContract;
    api.normalizeNuclearClauseSurfaceDiagnosticEntries = normalizeNuclearClauseSurfaceDiagnosticEntries;
    api.resolveNuclearClauseSurfaceUnitKind = resolveNuclearClauseSurfaceUnitKind;
    api.normalizeGrammarFrameSurfaceForms = normalizeGrammarFrameSurfaceForms;
    api.collectGrammarFrameRefsFromObject = collectGrammarFrameRefsFromObject;
    api.isNuclearClauseSurfaceGrammarFrameCandidate = isNuclearClauseSurfaceGrammarFrameCandidate;
    api.getNuclearClauseSurfaceOverrideSourceGrammarFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame;
    api.getNuclearClauseSurfaceSourceEvidenceBoundaries = getNuclearClauseSurfaceSourceEvidenceBoundaries;
    api.mergeNuclearClauseSurfaceSourceEvidence = mergeNuclearClauseSurfaceSourceEvidence;
    api.buildNuclearClauseSurfaceOverrideSourceEvidence = buildNuclearClauseSurfaceOverrideSourceEvidence;
    api.collectGrammarFrameAndrewsRefs = collectGrammarFrameAndrewsRefs;
    api.resolveGrammarFrameSourceEvidence = resolveGrammarFrameSourceEvidence;
    api.resolveGrammarFrameAstFrame = resolveGrammarFrameAstFrame;
    api.buildNuclearClauseSurfaceGrammarFrame = buildNuclearClauseSurfaceGrammarFrame;
    api.buildNuclearClauseSurfaceResultContract = buildNuclearClauseSurfaceResultContract;
    api.stripGeneratedVncFormulaTenseSuffix = stripGeneratedVncFormulaTenseSuffix;
    api.attachNuclearClauseSurfaceContractProperties = attachNuclearClauseSurfaceContractProperties;
    api.buildNuclearClauseSurfaceBlockedResult = buildNuclearClauseSurfaceBlockedResult;
    api.resolveGenerateWordUiHook = resolveGenerateWordUiHook;
    api.normalizeGenerateWordContractSurface = normalizeGenerateWordContractSurface;
    api.splitGenerateWordContractSurfaceText = splitGenerateWordContractSurfaceText;
    api.getGenerateWordResultFrame = getGenerateWordResultFrame;
    api.getGenerateWordResultFramePayload = getGenerateWordResultFramePayload;
    api.resolveGenerateWordContractSurface = resolveGenerateWordContractSurface;
    api.resolveGenerateWordResultFrameSurface = resolveGenerateWordResultFrameSurface;
    api.resolveGenerateWordNominalConnectorSurface = resolveGenerateWordNominalConnectorSurface;
    api.resolveGenerateWordNominalConnectorDisplaySurface = resolveGenerateWordNominalConnectorDisplaySurface;
    api.resolveGenerateWordFrameSourceInput = resolveGenerateWordFrameSourceInput;
    api.buildGenerateWordDiagnosticEntry = buildGenerateWordDiagnosticEntry;
    api.getGenerateWordFailedLayerContract = getGenerateWordFailedLayerContract;
    api.normalizeGenerateWordDiagnosticEntries = normalizeGenerateWordDiagnosticEntries;
    api.resolveGenerateWordUnitKind = resolveGenerateWordUnitKind;
    api.isGenerateWordGrammarFrameCandidate = isGenerateWordGrammarFrameCandidate;
    api.getGenerateWordOverrideSourceGrammarFrame = getGenerateWordOverrideSourceGrammarFrame;
    api.getGenerateWordSourceEvidenceBoundaries = getGenerateWordSourceEvidenceBoundaries;
    api.mergeGenerateWordSourceEvidence = mergeGenerateWordSourceEvidence;
    api.buildGenerateWordOverrideSourceEvidence = buildGenerateWordOverrideSourceEvidence;
    api.buildGenerateWordGrammarFrame = buildGenerateWordGrammarFrame;
    api.buildGenerateWordResultContract = buildGenerateWordResultContract;
    api.attachGenerateWordContractProperties = attachGenerateWordContractProperties;
    api.buildGenerateWordBlockedResult = buildGenerateWordBlockedResult;
    api.executeAdjectivalNncGenerationRoute = executeAdjectivalNncGenerationRoute;
    api.executeOrdinaryNncGenerationRoute = executeOrdinaryNncGenerationRoute;
    api.buildGeneratedNuclearClauseShellMetadata = buildGeneratedNuclearClauseShellMetadata;
    api.buildGeneratedVncValencyFrameMetadata = buildGeneratedVncValencyFrameMetadata;
    api.buildGeneratedDerivedVoiceFrameMetadata = buildGeneratedDerivedVoiceFrameMetadata;
    api.getGeneratedForwardDerivationLabel = getGeneratedForwardDerivationLabel;
    api.resolveForwardDerivationMetadataStemSurface = resolveForwardDerivationMetadataStemSurface;
    api.buildGeneratedForwardDerivationFrameMetadata = buildGeneratedForwardDerivationFrameMetadata;
    api.buildGeneratedCompoundFrameMetadata = buildGeneratedCompoundFrameMetadata;
    api.buildGeneratedPatientiveCompoundSourceFrameMetadata = buildGeneratedPatientiveCompoundSourceFrameMetadata;
    api.buildGeneratedAdjectivalCompoundSourceFrameMetadata = buildGeneratedAdjectivalCompoundSourceFrameMetadata;
    api.buildGeneratedAdverbialNuclearFrameMetadata = buildGeneratedAdverbialNuclearFrameMetadata;
    api.buildGeneratedRelationalNncBoundaryFrameMetadata = buildGeneratedRelationalNncBoundaryFrameMetadata;
    api.buildGeneratedPlaceGentilicNncBoundaryFrameMetadata = buildGeneratedPlaceGentilicNncBoundaryFrameMetadata;
    api.buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata;
    Object.defineProperty(api, "GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE; },
    });
    api.resolveGeneratedDenominalRouteProfileSpec = resolveGeneratedDenominalRouteProfileSpec;
    api.generatedDenominalRouteHasAndrewsSuffixContract = generatedDenominalRouteHasAndrewsSuffixContract;
    api.getGeneratedDenominalRouteCurriculumRef = getGeneratedDenominalRouteCurriculumRef;
    api.getGeneratedDenominalRouteSupportStatus = getGeneratedDenominalRouteSupportStatus;
    Object.defineProperty(api, "GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS", {
        configurable: true,
        enumerable: true,
        get() { return GENERATED_DENOMINAL_ANDREWS_UNMODELED_CONTRACT_IDS; },
    });
    Object.defineProperty(api, "GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS", {
        configurable: true,
        enumerable: true,
        get() { return GENERATED_DENOMINAL_ANDREWS_TARGET_UNMODELED_CONTRACT_IDS; },
    });
    api.getGeneratedDenominalRouteFamiliesWithoutAndrewsContract = getGeneratedDenominalRouteFamiliesWithoutAndrewsContract;
    api.getGeneratedDenominalAndrewsContractCoverageSummary = getGeneratedDenominalAndrewsContractCoverageSummary;
    api.getGeneratedDenominalRouteSuffixContract = getGeneratedDenominalRouteSuffixContract;
    api.buildGeneratedDenominalRouteBoundaries = buildGeneratedDenominalRouteBoundaries;
    api.buildGeneratedDenominalFamilyProfileMetadata = buildGeneratedDenominalFamilyProfileMetadata;
    api.buildGeneratedNominalNum1Num2Metadata = buildGeneratedNominalNum1Num2Metadata;
    api.executeNuclearClauseSurfaceRequest = executeNuclearClauseSurfaceRequest;
    api.executeGenerateWordRequest = executeGenerateWordRequest;
    return api;
}

export function installGenerationEngineGlobals(targetObject = globalThis) {
    const api = createGenerationEngineModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
