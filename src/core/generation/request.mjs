// Native wrapper generated from src/core/generation/request.js.

export function createGenerationRequestModule(targetObject = globalThis) {
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
    const CNV_FORMULA_SLOT_KEYS = Object.freeze(["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"]);
    const NUCLEAR_CLAUSE_SURFACE_UI_SLOT_KEYS = CNV_FORMULA_SLOT_KEYS;
    const NUCLEAR_CLAUSE_SURFACE_UI_TO_CNV_SLOT_BRIDGE = Object.freeze({
      pers1: Object.freeze({
        surfaceSlot: "pers1",
        surfaceName: "pers1",
        cnvFormulaSlot: "pers1",
        cnvFormulaName: "pers1",
        cnvSubslot: "pers1",
        surfaceSegmentRole: "pers1"
      }),
      pers2: Object.freeze({
        surfaceSlot: "pers2",
        surfaceName: "pers2",
        cnvFormulaSlot: "pers2",
        cnvFormulaName: "pers2",
        cnvSubslot: "pers2",
        surfaceSegmentRole: "pers2"
      }),
      va: Object.freeze({
        surfaceSlot: "va",
        surfaceName: "va",
        cnvFormulaSlot: "va",
        cnvFormulaName: "va",
        cnvSubslot: "va",
        surfaceSegmentRole: "obj1"
      }),
      va1: Object.freeze({
        surfaceSlot: "va1",
        surfaceName: "va1",
        cnvFormulaSlot: "va1",
        cnvFormulaName: "va1",
        cnvSubslot: "va1",
        surfaceSegmentRole: "obj1"
      }),
      va2: Object.freeze({
        surfaceSlot: "va2",
        surfaceName: "va2",
        cnvFormulaSlot: "va2",
        cnvFormulaName: "va2",
        cnvSubslot: "va2",
        surfaceSegmentRole: "obj1"
      }),
      base: Object.freeze({
        surfaceSlot: "base",
        surfaceName: "base",
        cnvFormulaSlot: "base",
        cnvFormulaName: "base",
        cnvSubslot: "base",
        surfaceSegmentRole: "tronco"
      }),
      tns: Object.freeze({
        surfaceSlot: "tns",
        surfaceName: "tns",
        cnvFormulaSlot: "tns",
        cnvFormulaName: "tns",
        cnvSubslot: "tns",
        surfaceSegmentRole: "tronco/pers2"
      }),
      num1: Object.freeze({
        surfaceSlot: "num1",
        surfaceName: "num1",
        cnvFormulaSlot: "num1",
        cnvFormulaName: "num1",
        cnvSubslot: "num1",
        surfaceSegmentRole: "pers2"
      }),
      num2: Object.freeze({
        surfaceSlot: "num2",
        surfaceName: "num2",
        cnvFormulaSlot: "num2",
        cnvFormulaName: "num2",
        cnvSubslot: "num2",
        surfaceSegmentRole: "pers2"
      })
    });
    const NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_TENSES = new Set(["futuro", "preterito"]);
    const NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS = Object.freeze(["ki-0", "k-et", "0-et"]);
    const NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS = Object.freeze(["ki", "k", "0"]);
    const NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS = Object.freeze(["0", "et"]);
    const NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_TENSES = new Set(["presente", "presente-habitual", "imperfecto", "pasado-remoto"]);
    const NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "0-t"]);
    const NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM1_OPTIONS = Object.freeze(["0"]);
    const NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM2_OPTIONS = Object.freeze(["0", "t"]);
    const NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "k-an"]);
    const NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM1_OPTIONS = Object.freeze(["0", "k"]);
    const NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM2_OPTIONS = Object.freeze(["0", "an"]);
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
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3]),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive, obj1 === "mu" ? "mu" : fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive]),
        [NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition]: resolveNuclearClauseSurfaceSlotInputValue(source, NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition, fallback[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition])
      };
      if (obj1 === "mu" && !normalized[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive]) {
        normalized[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive] = "mu";
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
        poseedor: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.possessor] || "",
        obj2: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj2] || "",
        obj3: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj3] || "",
        reflexivo: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive] || "",
        tiempo: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition] || ""
      };
    }
    function buildGenerateWordEntradasInternasFromPosicionesFormula(posicionesFormula = null, fallbackPosicionesFormula = {}) {
      return buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula, fallbackPosicionesFormula);
    }
    function splitNuclearClauseSurfaceFormulaSubslots(value = "") {
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
    function resolveNuclearClauseSurfaceFormulaObjectFrame(source = {}) {
      const stem = String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem] || "");
      const reflexive = String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.reflexive] || "");
      const object = reflexive || String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.obj1] || "");
      if (!object) {
        return {
          slots: [],
          values: {}
        };
      }
      const dyadFrame = typeof targetObject.getLesson6DirectNawatObjectDyadFrame === "function" ? targetObject.getLesson6DirectNawatObjectDyadFrame(object, {
        stem,
        pers1: source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1] || ""
      }) : null;
      if (dyadFrame?.formulaPosition === "va") {
        return {
          slots: ["va"],
          values: {
            va: dyadFrame.va || dyadFrame.visibleFormulaPrefix || object
          }
        };
      }
      if (dyadFrame?.formulaPosition === "va1-va2") {
        return {
          slots: ["va1", "va2"],
          values: {
            va1: dyadFrame.functionalVa1 || dyadFrame.va1 || "",
            va2: dyadFrame.functionalVa2 || dyadFrame.va2 || ""
          },
          features: {
            va1: dyadFrame.val1Features || null,
            va2: dyadFrame.val2Features || null
          },
          visibleLinearMorph: dyadFrame.visibleFormulaPrefix || ""
        };
      }
      const [va1, va2] = splitNuclearClauseSurfaceFormulaSubslots(object);
      if (va1 || va2) {
        return object.includes("-") ? {
          slots: ["va1", "va2"],
          values: {
            va1,
            va2
          }
        } : {
          slots: ["va"],
          values: {
            va: object
          }
        };
      }
      return {
        slots: [],
        values: {}
      };
    }
    function resolveNuclearClauseSurfaceProfileConnector(raw = "", tense = "") {
      const normalizedRaw = String(raw || "").trim();
      const normalizedTense = String(tense || "").trim();
      if (NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_TENSES.has(normalizedTense)) {
        if (normalizedRaw === "0-0" || normalizedRaw === "Ø-Ø") {
          return {
            connector: "0-0",
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "0 + 0/h",
            nawatConnectorPattern: "0 + 0/t"
          };
        }
        if (normalizedRaw === "t" || normalizedRaw === "0-t" || normalizedRaw === "Ø-t") {
          return {
            connector: "0-t",
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "0 + 0/h",
            nawatConnectorPattern: "0 + 0/t"
          };
        }
      }
      if (NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_TENSES.has(normalizedTense)) {
        if (NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS.includes(normalizedRaw)) {
          return {
            connector: normalizedRaw,
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
            nawatConnectorPattern: "k~ki~0 + 0/et"
          };
        }
        if (normalizedRaw === "ki") {
          return {
            connector: "ki-0",
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
            nawatConnectorPattern: "k~ki~0 + 0/et"
          };
        }
        if (normalizedRaw === "t" || normalizedRaw === "k" || normalizedRaw === "ket") {
          return {
            connector: "k-et",
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
            nawatConnectorPattern: "k~ki~0 + 0/et"
          };
        }
        if (normalizedRaw === "et") {
          return {
            connector: "0-et",
            connectorOptions: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS.slice(),
            num1Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS.slice(),
            num2Options: NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS.slice(),
            andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
            nawatConnectorPattern: "k~ki~0 + 0/et"
          };
        }
      }
      if (normalizedTense === "optativo" && (normalizedRaw === "t" || normalizedRaw === "kan" || normalizedRaw === "k-an")) {
        return {
          connector: "k-an",
          connectorOptions: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_CONNECTOR_OPTIONS.slice(),
          num1Options: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM1_OPTIONS.slice(),
          num2Options: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM2_OPTIONS.slice(),
          andrewsConnectorPattern: "0-0 / c-an",
          nawatConnectorPattern: "0-0 / k-an"
        };
      }
      if (normalizedTense === "optativo" && (normalizedRaw === "0-0" || normalizedRaw === "Ø-Ø")) {
        return {
          connector: "0-0",
          connectorOptions: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_CONNECTOR_OPTIONS.slice(),
          num1Options: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM1_OPTIONS.slice(),
          num2Options: NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM2_OPTIONS.slice(),
          andrewsConnectorPattern: "0-0 / c-an",
          nawatConnectorPattern: "0-0 / k-an"
        };
      }
      return null;
    }
    function resolveNuclearClauseSurfaceFormulaNumberValues(source = {}) {
      const raw = String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.num2] || source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers2] || "").trim();
      const tense = String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition] || "").trim();
      const profileConnector = resolveNuclearClauseSurfaceProfileConnector(raw, tense);
      if (profileConnector?.connector) {
        const [num1, num2] = splitNuclearClauseSurfaceFormulaSubslots(profileConnector.connector);
        return {
          num1: num1 || "Ø",
          num2: num2 || "Ø",
          ...profileConnector
        };
      }
      if (!raw) {
        return {
          num1: "Ø",
          num2: "Ø"
        };
      }
      if (raw.includes("-")) {
        const [num1, num2] = splitNuclearClauseSurfaceFormulaSubslots(raw);
        return {
          num1: num1 || "Ø",
          num2: num2 || "Ø"
        };
      }
      if (raw === "kan") {
        return {
          num1: "k",
          num2: "an"
        };
      }
      return {
        num1: "Ø",
        num2: raw
      };
    }
    function buildNuclearClauseSurfaceAndrewsFormulaPath(source = {}) {
      const objectFrame = resolveNuclearClauseSurfaceFormulaObjectFrame(source);
      const numberValues = resolveNuclearClauseSurfaceFormulaNumberValues(source);
      const values = {
        pers1: String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.pers1] || "Ø") || "Ø",
        pers2: "Ø",
        ...objectFrame.values,
        base: String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.stem] || "∅") || "∅",
        tns: String(source[NUCLEAR_CLAUSE_SURFACE_ANDREWS_SLOT_KEYS.tensePosition] || "Ø") || "Ø",
        num1: numberValues.num1,
        num2: numberValues.num2
      };
      return ["pers1", "pers2", ...objectFrame.slots, "base", "tns", "num1", "num2"].map(slot => ({
        slot,
        value: values[slot] ?? "",
        formulaFeatures: objectFrame.features?.[slot] || null,
        visibleLinearMorph: objectFrame.visibleLinearMorph || "",
        formulaOptions: slot === "num1" ? numberValues.num1Options || [] : slot === "num2" ? numberValues.num2Options || [] : [],
        formulaDyadOptions: slot === "num1" || slot === "num2" ? numberValues.connectorOptions || [] : [],
        andrewsConnectorPattern: slot === "num1" || slot === "num2" ? numberValues.andrewsConnectorPattern || "" : "",
        nawatConnectorPattern: slot === "num1" || slot === "num2" ? numberValues.nawatConnectorPattern || "" : ""
      }));
    }
    function buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula = null, fallbackPosicionesFormula = {}) {
      const source = normalizeNuclearClauseSurfaceFormulaPositions(posicionesFormula, fallbackPosicionesFormula);
      const andrewsPath = buildNuclearClauseSurfaceAndrewsFormulaPath(source);
      const surfaceProducingSlots = andrewsPath.map(entry => entry.slot);
      const slots = andrewsPath.map(pathEntry => {
        const surfaceSlot = pathEntry.slot;
        const bridge = NUCLEAR_CLAUSE_SURFACE_UI_TO_CNV_SLOT_BRIDGE[surfaceSlot] || {};
        return {
          ...bridge,
          surfaceSlot,
          value: pathEntry.value,
          formulaFeatures: pathEntry.formulaFeatures || null,
          visibleLinearMorph: pathEntry.visibleLinearMorph || "",
          formulaOptions: pathEntry.formulaOptions || [],
          formulaDyadOptions: pathEntry.formulaDyadOptions || [],
          andrewsConnectorPattern: pathEntry.andrewsConnectorPattern || "",
          nawatConnectorPattern: pathEntry.nawatConnectorPattern || ""
        };
      });
      return {
        surfaceProducingSlotNamespace: "posicionesFormula",
        cnvFormulaSlotNamespace: "Andrews CNV formula",
        surfaceProducingSlotCount: surfaceProducingSlots.length,
        cnvFormulaSlotCount: surfaceProducingSlots.length,
        surfaceProducingSlots,
        cnvFormulaSlots: surfaceProducingSlots.slice(),
        acceptedInputAliasSlots: ["pers1", "obj1", "tronco", "pers2", "num2", "poseedor", "obj2", "obj3", "reflexivo", "tiempo"],
        slots
      };
    }
    function buildGenerateWordSlotNameBridge(posicionesFormula = null, fallbackPosicionesFormula = {}) {
      return buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula, fallbackPosicionesFormula);
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
        reflexivo: overrideFormula.reflexivo ?? override?.reflexivo ?? "",
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
    Object.defineProperty(api, "CNV_FORMULA_SLOT_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return CNV_FORMULA_SLOT_KEYS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_UI_SLOT_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_UI_SLOT_KEYS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_UI_TO_CNV_SLOT_BRIDGE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_UI_TO_CNV_SLOT_BRIDGE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_TENSES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_FUTURE_PRETERIT_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_TENSES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_MAIN_INDICATIVE_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NONPAST_OPTATIVE_NUM2_OPTIONS; },
    });
    api.normalizeNuclearClauseSurfaceSlotValue = normalizeNuclearClauseSurfaceSlotValue;
    api.normalizeGenerateWordSlotValue = normalizeGenerateWordSlotValue;
    api.resolveNuclearClauseSurfaceSlotInputValue = resolveNuclearClauseSurfaceSlotInputValue;
    api.resolveGenerateWordSlotInputValue = resolveGenerateWordSlotInputValue;
    api.normalizeNuclearClauseSurfaceFormulaPositions = normalizeNuclearClauseSurfaceFormulaPositions;
    api.normalizeGenerateWordPosicionesFormula = normalizeGenerateWordPosicionesFormula;
    api.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula = buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula;
    api.buildGenerateWordEntradasInternasFromPosicionesFormula = buildGenerateWordEntradasInternasFromPosicionesFormula;
    api.splitNuclearClauseSurfaceFormulaSubslots = splitNuclearClauseSurfaceFormulaSubslots;
    api.resolveNuclearClauseSurfaceFormulaObjectFrame = resolveNuclearClauseSurfaceFormulaObjectFrame;
    api.resolveNuclearClauseSurfaceProfileConnector = resolveNuclearClauseSurfaceProfileConnector;
    api.resolveNuclearClauseSurfaceFormulaNumberValues = resolveNuclearClauseSurfaceFormulaNumberValues;
    api.buildNuclearClauseSurfaceAndrewsFormulaPath = buildNuclearClauseSurfaceAndrewsFormulaPath;
    api.buildNuclearClauseSurfaceSlotNameBridge = buildNuclearClauseSurfaceSlotNameBridge;
    api.buildGenerateWordSlotNameBridge = buildGenerateWordSlotNameBridge;
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
    const api = createGenerationRequestModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
