// Native wrapper generated from src/core/generation/request.js.

export function createGenerationRequestApi(targetObject = globalThis) {
    const NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS = Object.freeze({
      pers1: "pers1",
      pers2: "pers2",
      num2: "num2",
      obj1: "obj1",
      obj2: "obj2",
      obj3: "obj3",
      reflexive: "reflexivo",
      stem: "tronco",
      tensePosition: "tiempo",
      possessor: "poseedor"
    });
    const GENERATE_WORD_ANDREWS_SLOT_KEYS = NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS;
    function normalizeNuclearClauseSurfaceSlotValue(value = "") {
      return String(value ?? "");
    }
    function normalizeGenerateWordSlotValue(value = "") {
      return normalizeNuclearClauseSurfaceSlotValue(value);
    }
    function resolveNuclearClauseSurfaceSlotInputValue(source = null, key = "", fallback = "") {
      const input = source && typeof source === "object" ? source : {};
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        return normalizeNuclearClauseSurfaceSlotValue(input[key]);
      }
      return normalizeNuclearClauseSurfaceSlotValue(fallback);
    }
    function resolveGenerateWordSlotInputValue(source = null, key = "", fallback = "") {
      return resolveNuclearClauseSurfaceSlotInputValue(source, key, fallback);
    }
    function normalizeNuclearClauseSurfaceFormulaPositions(posicionesFormula = null, fallbackPosicionesFormula = {}, options = {}) {
      const fallback = fallbackPosicionesFormula && typeof fallbackPosicionesFormula === "object" ? fallbackPosicionesFormula : {};
      const source = posicionesFormula && typeof posicionesFormula === "object" ? posicionesFormula : {};
      const pers2 = resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers2, resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.num2, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers2]));
      const obj1 = resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj1, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj1]);
      const normalized = {
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1]),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj1]: obj1,
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem, resolveNuclearClauseSurfaceSlotInputValue(source, "STEM", fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem])),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers2]: pers2,
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.num2]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.num2, pers2),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.possessor]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.possessor, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.possessor]),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj2]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj2, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj2]),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3])
      };
      const reflexive = resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive]);
      if (reflexive || obj1 === "mu") {
        normalized[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive] = reflexive || "mu";
      }
      if (Object.prototype.hasOwnProperty.call(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition) || Object.prototype.hasOwnProperty.call(fallback, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition)) {
        normalized[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition] = resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition]);
      }
      return normalized;
    }
    function normalizeGenerateWordPosicionesFormula(posicionesFormula = null, fallbackPosicionesFormula = {}, options = {}) {
      return normalizeNuclearClauseSurfaceFormulaPositions(posicionesFormula, fallbackPosicionesFormula, options);
    }
    function buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula = null, fallbackPosicionesFormula = {}) {
      const source = normalizeNuclearClauseSurfaceFormulaPositions(posicionesFormula, fallbackPosicionesFormula);
      return {
        pers1: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1] || "",
        obj1: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj1] || "",
        tronco: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem] || "",
        pers2: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers2] || "",
        num2: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.num2] || "",
        poseedor: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.possessor] || ""
      };
    }
    function buildGenerateWordEntradasInternasFromPosicionesFormula(posicionesFormula = null, fallbackPosicionesFormula = {}) {
      return buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula, fallbackPosicionesFormula);
    }
    function getNuclearClauseSurfacePosicionesFormulaFromControls({
      override,
      pers1Control = null,
      pers2Control = null,
      troncoControl = null,
      troncoInputSource = null
    }) {
      const resolvedPers1Control = pers1Control || {
        value: ""
      };
      const resolvedPers2Control = pers2Control || {
        value: ""
      };
      const resolvedTroncoControl = troncoControl || {
        value: ""
      };
      const resolvedTroncoInputSource = troncoInputSource && typeof troncoInputSource === "object" ? troncoInputSource : targetObject.resolveVerbInputSource(resolvedTroncoControl?.value || "");
      const overrideFormula = override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {};
      return normalizeNuclearClauseSurfaceFormulaPositions({
        pers1: overrideFormula.pers1 ?? override?.pers1 ?? resolvedPers1Control.value,
        obj1: overrideFormula.obj1 ?? override?.obj1 ?? targetObject.getCurrentObjectPrefix(),
        obj2: overrideFormula.obj2 ?? override?.obj2 ?? "",
        obj3: overrideFormula.obj3 ?? override?.obj3 ?? "",
        tronco: overrideFormula.tronco ?? override?.tronco ?? resolvedTroncoInputSource.parseValue ?? resolvedTroncoControl.value,
        pers2: overrideFormula.pers2 ?? overrideFormula.num2 ?? override?.pers2 ?? override?.num2 ?? resolvedPers2Control.value,
        num2: overrideFormula.num2 ?? overrideFormula.pers2 ?? override?.num2 ?? override?.pers2 ?? resolvedPers2Control.value,
        poseedor: overrideFormula.poseedor ?? override?.poseedor ?? "",
        tiempo: overrideFormula.tiempo ?? override?.tiempo ?? ""
      });
    }
    function getGenerateWordPosicionesFormulaFromControls(options = {}) {
      return getNuclearClauseSurfacePosicionesFormulaFromControls(options);
    }
    function getNuclearClauseSurfacePosicionesFormula(options = {}) {
      const override = options?.override && typeof options.override === "object" ? options.override : null;
      const explicitFormula = options?.posicionesFormula && typeof options.posicionesFormula === "object" ? options.posicionesFormula : override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : null;
      const fallbackPosicionesFormula = getNuclearClauseSurfacePosicionesFormulaFromControls(options);
      if (explicitFormula) {
        return normalizeNuclearClauseSurfaceFormulaPositions(explicitFormula, fallbackPosicionesFormula, {
          override
        });
      }
      return fallbackPosicionesFormula;
    }
    function getGenerateWordPosicionesFormula(options = {}) {
      return getNuclearClauseSurfacePosicionesFormula(options);
    }
    function normalizeNuclearClauseSurfaceOptions(options = {}) {
      return options && typeof options === "object" ? {
        ...options
      } : {};
    }
    function normalizeGenerateWordOptions(options = {}) {
      return normalizeNuclearClauseSurfaceOptions(options);
    }
    function canReusePreParsedVerb({
      parsedVerb = null,
      rawVerb = ""
    }) {
      if (!parsedVerb || typeof parsedVerb !== "object") {
        return false;
      }
      const candidateSourceRaw = typeof parsedVerb.sourceRawVerb === "string" ? parsedVerb.sourceRawVerb : "";
      if (!candidateSourceRaw) {
        return false;
      }
      return candidateSourceRaw === String(rawVerb || "");
    }
    function sanitizeNuclearClauseSurfaceOptions(options = {}) {
      return normalizeNuclearClauseSurfaceOptions(options);
    }
    function sanitizeGenerateWordOptions(options = {}) {
      return sanitizeNuclearClauseSurfaceOptions(options);
    }

    const api = {};
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS; },
    });
    Object.defineProperty(api, "GENERATE_WORD_ANDREWS_SLOT_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return GENERATE_WORD_ANDREWS_SLOT_KEYS; },
    });
    api.normalizeNuclearClauseSurfaceSlotValue = normalizeNuclearClauseSurfaceSlotValue;
    api.normalizeGenerateWordSlotValue = normalizeGenerateWordSlotValue;
    api.resolveNuclearClauseSurfaceSlotInputValue = resolveNuclearClauseSurfaceSlotInputValue;
    api.resolveGenerateWordSlotInputValue = resolveGenerateWordSlotInputValue;
    api.normalizeNuclearClauseSurfaceFormulaPositions = normalizeNuclearClauseSurfaceFormulaPositions;
    api.normalizeGenerateWordPosicionesFormula = normalizeGenerateWordPosicionesFormula;
    api.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula = buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula;
    api.buildGenerateWordEntradasInternasFromPosicionesFormula = buildGenerateWordEntradasInternasFromPosicionesFormula;
    api.getNuclearClauseSurfacePosicionesFormulaFromControls = getNuclearClauseSurfacePosicionesFormulaFromControls;
    api.getGenerateWordPosicionesFormulaFromControls = getGenerateWordPosicionesFormulaFromControls;
    api.getNuclearClauseSurfacePosicionesFormula = getNuclearClauseSurfacePosicionesFormula;
    api.getGenerateWordPosicionesFormula = getGenerateWordPosicionesFormula;
    api.normalizeNuclearClauseSurfaceOptions = normalizeNuclearClauseSurfaceOptions;
    api.normalizeGenerateWordOptions = normalizeGenerateWordOptions;
    api.canReusePreParsedVerb = canReusePreParsedVerb;
    api.sanitizeNuclearClauseSurfaceOptions = sanitizeNuclearClauseSurfaceOptions;
    api.sanitizeGenerateWordOptions = sanitizeGenerateWordOptions;
    return api;
}

export function installGenerationRequestGlobals(targetObject = globalThis) {
    const api = createGenerationRequestApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
