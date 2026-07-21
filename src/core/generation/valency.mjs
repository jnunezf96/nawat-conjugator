// Canonical modern ESM module.

export const GENERATION_SOURCE_TRANSITIVITY = Object.freeze({
  intransitive: "intransitive",
  transitive: "transitive",
  bitransitive: "bitransitive",
});

export const GENERATION_SOURCE_TRANSITIVITY_ORDER = Object.freeze([
  GENERATION_SOURCE_TRANSITIVITY.intransitive,
  GENERATION_SOURCE_TRANSITIVITY.transitive,
  GENERATION_SOURCE_TRANSITIVITY.bitransitive,
]);

export const GENERATION_SOURCE_TRANSITIVITY_ALIASES = Object.freeze({
  vi: GENERATION_SOURCE_TRANSITIVITY.intransitive,
  vt: GENERATION_SOURCE_TRANSITIVITY.transitive,
  vb: GENERATION_SOURCE_TRANSITIVITY.bitransitive,
});

export const GENERATION_SOURCE_SLOT_BY_TRANSITIVITY = Object.freeze({
  [GENERATION_SOURCE_TRANSITIVITY.intransitive]: "a",
  [GENERATION_SOURCE_TRANSITIVITY.transitive]: "b",
  [GENERATION_SOURCE_TRANSITIVITY.bitransitive]: "c",
});

export function normalizeGenerationSourceTransitivity(value = "", { allowAliases = true } = {}) {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  if (GENERATION_SOURCE_TRANSITIVITY_ORDER.includes(normalized)) {
    return normalized;
  }
  return allowAliases ? GENERATION_SOURCE_TRANSITIVITY_ALIASES[normalized] || "" : "";
}

export function getGenerationSourceTransitivityVocabulary() {
  return Object.freeze({
    kind: "generation-source-transitivity-vocabulary",
    sourceTransitivities: GENERATION_SOURCE_TRANSITIVITY_ORDER,
    aliases: GENERATION_SOURCE_TRANSITIVITY_ALIASES,
    sourceSlotByTransitivity: GENERATION_SOURCE_SLOT_BY_TRANSITIVITY,
    canvasFormulaGroups: Object.freeze(["intransitive", "transitive"]),
    canvasFormulaGroupBySourceTransitivity: Object.freeze({
      intransitive: "intransitive",
      transitive: "transitive",
      bitransitive: "transitive",
    }),
    structuralTopologyIsNotCanvasValenceAuthority: true,
  });
}

export function validateGenerationSourceTransitivitySelection(value = "", options = {}) {
  const requestedSourceTransitivity = String(value == null ? "" : value).trim().toLowerCase();
  const explicit = requestedSourceTransitivity !== "";
  const sourceTransitivity = normalizeGenerationSourceTransitivity(requestedSourceTransitivity, options);
  const recognized = sourceTransitivity !== "";
  return Object.freeze({
    kind: "generation-source-transitivity-selection-frame",
    requestedSourceTransitivity,
    sourceTransitivity,
    sourceSlotKey: recognized ? GENERATION_SOURCE_SLOT_BY_TRANSITIVITY[sourceTransitivity] : "",
    explicit,
    recognized,
    authorizationStatus: !explicit ? "not-applicable" : recognized ? "authorized" : "blocked",
    blockReason: explicit && !recognized ? "generation-source-transitivity-not-recognized" : "",
    structuralTopologyIsNotCanvasValenceAuthority: true,
  });
}

export function validateGenerationSourceTransitivityControlInventory({
  hiddenSelectValues = [],
  visibleGroupValues = [],
  slotShellValues = [],
} = {}) {
  const expectedValues = Array.from(GENERATION_SOURCE_TRANSITIVITY_ORDER);
  const normalizedHiddenSelectValues = Array.from(hiddenSelectValues, value => String(value || ""));
  const normalizedVisibleGroups = Array.from(visibleGroupValues, group => Array.from(group || [], value => String(value || "")));
  const normalizedSlotShellValues = Array.from(slotShellValues, value => String(value || ""));
  const exact = values => values.length === expectedValues.length && values.every((value, index) => value === expectedValues[index]);
  const hiddenSelectMatches = exact(normalizedHiddenSelectValues);
  const visibleGroupsMatch = normalizedVisibleGroups.length === 3 && normalizedVisibleGroups.every(exact);
  const slotShellsMatch = exact(normalizedSlotShellValues);
  const inventoryMatches = hiddenSelectMatches && visibleGroupsMatch && slotShellsMatch;
  return Object.freeze({
    kind: "generation-source-transitivity-control-inventory-validation-frame",
    expectedValues: Object.freeze(expectedValues),
    hiddenSelectValues: Object.freeze(normalizedHiddenSelectValues),
    visibleGroupValues: Object.freeze(normalizedVisibleGroups.map(group => Object.freeze(group))),
    slotShellValues: Object.freeze(normalizedSlotShellValues),
    hiddenSelectMatches,
    visibleGroupsMatch,
    slotShellsMatch,
    inventoryMatches,
    authorizationStatus: inventoryMatches ? "authorized" : "blocked",
    blockReason: inventoryMatches ? "" : "generation-source-transitivity-control-inventory-mismatch",
    structuralControlsAreNotCanvasValenceAuthority: true,
  });
}

export function createGenerationValencyModule(targetObject = globalThis) {
    const GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID = "generation-valency-object-slot-frame-unfixed";
    const GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE = "generation-valency-object-slot-gate";
    function normalizeGenerationValencySlotInput(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const {
        pers1 = "",
        pers2,
        num2,
        obj1 = "",
        obj2 = "",
        obj3 = "",
        ...rest
      } = node;
      return {
        ...rest,
        pers1: String(pers1 || ""),
        pers2: String(pers2 ?? num2 ?? ""),
        obj1: String(obj1 || ""),
        obj2: String(obj2 || ""),
        obj3: String(obj3 || "")
      };
    }
    function buildGenerationValencySlotFrame({
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj2 = "",
      obj3 = ""
    } = {}) {
      const resolvedPers1 = String(pers1 || "");
      const resolvedPers2 = String(pers2 || "");
      const resolvedObj1 = String(obj1 || "");
      const resolvedObj2 = String(obj2 || "");
      const resolvedObj3 = String(obj3 || "");
      return {
        pers1: resolvedPers1,
        pers2: resolvedPers2,
        obj1: resolvedObj1,
        obj2: resolvedObj2,
        obj3: resolvedObj3,
        pers1Pers2: {
          slot: "pers1-pers2",
          prefix: resolvedPers1,
          suffix: resolvedPers2
        },
        objectSlotSequence: [{
          slot: "obj1",
          prefix: resolvedObj1
        }, {
          slot: "obj2",
          prefix: resolvedObj2
        }, {
          slot: "obj3",
          prefix: resolvedObj3
        }]
      };
    }
    const VNC_VALENCE_FORMULA_SCHEMA_ID = "vnc-shell";
    const VNC_VALENCE_TENSE_SPECS = Object.freeze({
      zero: Object.freeze({
        id: "zero",
        label: "tns zero",
        andrewsStructural: "0",
        nawatFormula: "Ø",
        compactDisplay: "Ø",
        surface: "",
        evidenceSource: "Andrews 5.1-5.3"
      })
    });
    const VNC_VALENCE_NUMBER_CONNECTOR_SPECS = Object.freeze({
      zero: Object.freeze({
        id: "zero",
        label: "zero subject number",
        andrewsStructural: "0-0",
        nawatFormula: "Ø-Ø",
        compactDisplay: "Ø",
        surface: "",
        evidenceSource: "Andrews 5.1-5.3"
      }),
      preterit3sg: Object.freeze({
        id: "preterit3sg",
        label: "preterit 3sg subject number",
        andrewsStructural: "qui-0",
        nawatFormula: "ki-0 ~ k-0",
        compactDisplay: "ki/k",
        surface: "ki/k",
        evidenceSource: "Andrews 5.1-5.3; current Nawat preterit connector alternation evidence"
      })
    });
    const VNC_VALENCE_MONADIC_SPECS = Object.freeze({
      ne: Object.freeze({
        id: "reflexive-reciprocal-monadic",
        key: "ne",
        andrewsStructural: "ne",
        nawatFormula: "ne",
        compactDisplay: "ne",
        surfacePrefix: "ne",
        specificity: "specific",
        trajectory: "reflexive-reciprocative",
        gloss: "reflexive/reciprocal object",
        evidenceSource: "Andrews 6.3",
        generationStatus: "andrews-logic-generated"
      }),
      te: Object.freeze({
        id: "nonspecific-human",
        key: "te",
        andrewsStructural: "te",
        nawatFormula: "te",
        compactDisplay: "te",
        surfacePrefix: "te",
        specificity: "nonspecific",
        humanness: "human",
        gloss: "someone/some people",
        evidenceSource: "Andrews 6.2",
        generationStatus: "andrews-logic-generated"
      }),
      ta: Object.freeze({
        id: "nonspecific-nonhuman",
        key: "ta",
        andrewsStructural: "tla",
        nawatFormula: "ta",
        compactDisplay: "ta",
        surfacePrefix: "ta",
        specificity: "nonspecific",
        humanness: "nonhuman",
        gloss: "something",
        evidenceSource: "Andrews 6.2; Classical tla maps structurally to Nawat ta",
        generationStatus: "generated-scoped"
      })
    });
    const VNC_VALENCE_DYADIC_SPECS = Object.freeze({
      nech: Object.freeze({
        id: "1sg-specific-object",
        key: "nech",
        andrewsStructural: "n-ech",
        nawatFormula: "n-ech",
        compactDisplay: "nech",
        surfacePrefix: "nech",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      tech: Object.freeze({
        id: "1pl-specific-object",
        key: "tech",
        andrewsStructural: "t-ech",
        nawatFormula: "t-ech",
        compactDisplay: "tech",
        surfacePrefix: "tech",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      metz: Object.freeze({
        id: "2sg-specific-object",
        key: "metz",
        andrewsStructural: "m-itz",
        nawatFormula: "m-etz",
        compactDisplay: "metz",
        surfacePrefix: "metz",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      metzin: Object.freeze({
        id: "2pl-specific-object",
        key: "metzin",
        andrewsStructural: "am-ech",
        nawatFormula: "m-etz-in",
        compactDisplay: "metzin",
        surfacePrefix: "metzin",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      ki: Object.freeze({
        id: "3sg-specific-object",
        key: "ki",
        andrewsStructural: "c-0/qu-0/qui-0",
        nawatFormula: "ki-0",
        compactDisplay: "ki",
        surfacePrefix: "ki",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      k: Object.freeze({
        id: "3sg-specific-object-before-vowel",
        key: "k",
        andrewsStructural: "c-0/qu-0/qui-0",
        nawatFormula: "k-0",
        compactDisplay: "k",
        surfacePrefix: "k",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix allomorphy evidence"
      }),
      kin: Object.freeze({
        id: "3pl-specific-object",
        key: "kin",
        andrewsStructural: "qu-im",
        nawatFormula: "k-in",
        compactDisplay: "kin",
        surfacePrefix: "kin",
        trajectory: "projective",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat object-prefix evidence"
      }),
      mu: Object.freeze({
        id: "mainline-reflexive-reciprocal",
        key: "mu",
        andrewsStructural: "m-o",
        nawatFormula: "m-u",
        compactDisplay: "mu",
        surfacePrefix: "mu",
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        evidenceSource: "Andrews 6.4 + current Nawat reflexive evidence"
      })
    });
    const VNC_VALENCE_KNOWN_FORM_INPUTS = Object.freeze({
      nemi: Object.freeze({
        stem: "nemi",
        kind: "intransitive",
        valence: ""
      }),
      nenki: Object.freeze({
        stem: "nemi",
        kind: "intransitive",
        valence: ""
      }),
      nemik: Object.freeze({
        stem: "nemi",
        kind: "intransitive",
        valence: ""
      }),
      taijpiya: Object.freeze({
        stem: "ijpiya",
        kind: "monadic",
        valence: "ta"
      }),
      taijpishki: Object.freeze({
        stem: "ijpiya",
        kind: "monadic",
        valence: "ta"
      }),
      taijpiyak: Object.freeze({
        stem: "ijpiya",
        kind: "monadic",
        valence: "ta"
      }),
      taijpik: Object.freeze({
        stem: "ijpiya",
        kind: "monadic",
        valence: "ta"
      }),
      kipiya: Object.freeze({
        stem: "piya",
        kind: "dyadic",
        valence: "ki"
      }),
      kipishki: Object.freeze({
        stem: "piya",
        kind: "dyadic",
        valence: "ki"
      }),
      kipiyak: Object.freeze({
        stem: "piya",
        kind: "dyadic",
        valence: "ki"
      })
    });
    function getVncValenceKnownFormInput(value = "") {
      const key = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
      return VNC_VALENCE_KNOWN_FORM_INPUTS[key] || null;
    }
    function getVncValenceFormulaSchema() {
      return typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema(VNC_VALENCE_FORMULA_SCHEMA_ID) : null;
    }
    function getVncValenceFormulaSlotDefinition(slotId = "") {
      return typeof targetObject.getAndrewsFormulaSlotDefinition === "function" ? targetObject.getAndrewsFormulaSlotDefinition(VNC_VALENCE_FORMULA_SCHEMA_ID, slotId) : null;
    }
    function getVncValenceAndrewsLogicAuthorityPolicy() {
      return typeof targetObject.getAndrewsLogicAuthorityPolicy === "function" ? targetObject.getAndrewsLogicAuthorityPolicy() : {
        grammarLogicAuthority: "Andrews PDF",
        grammarLogicDecidesGeneration: true,
        orthographyExamplesDecideGrammarLogic: false,
        grammarLogicGate: "andrews-licensed-route-plus-required-source-context",
        orthographyExamplesRole: "spelling-realization-only",
        orthographyAuthority: "Nawat/Pipil orthography bridge",
        orthographyBridgeRequired: true,
        noClassicalSurfaceImport: true
      };
    }
    function normalizeVncValenceWorkbenchRawStemForSourceFrame(value = "") {
      const rawInput = String(value || "").trim();
      const known = getVncValenceKnownFormInput(rawInput);
      if (known?.stem) {
        return known.stem;
      }
      const parenthetical = rawInput.match(/\(([^)]+)\)/);
      const stemSource = parenthetical ? parenthetical[1] : rawInput;
      return String(stemSource || "").trim().replace(/^[-#\s]+/g, "").replace(/[#()]/g, "").replace(/^(?:ne|te|ta|tla|ki|k|kin|nech|tech|metz|metzin|mu)[-\s]+/i, "").trim();
    }
    function buildVncValenceWorkbenchSourceFrame({
      inputValue = "",
      valenceKind = "",
      valence = ""
    } = {}) {
      const rawInput = String(inputValue || "").trim();
      const raw = rawInput.toLowerCase();
      const requestedKind = String(valenceKind || "").trim();
      const requestedValence = String(valence || "").trim().toLowerCase();
      const known = getVncValenceKnownFormInput(rawInput);
      const normalizedStem = normalizeVncValenceWorkbenchRawStemForSourceFrame(rawInput);
      let kind = "intransitive";
      let valenceKey = "";
      let sourceKind = rawInput ? "open-stem-or-formula" : "";
      if (known) {
        kind = known.kind || "intransitive";
        valenceKey = known.valence || "";
        sourceKind = "known-vnc-valence-input";
      } else if (requestedKind === "blocked") {
        kind = "blocked";
        valenceKey = requestedValence || "nech";
        sourceKind = "explicit-blocked-valence-selection";
      } else if (requestedKind === "monadic" || VNC_VALENCE_MONADIC_SPECS[requestedValence]) {
        kind = "monadic";
        valenceKey = requestedValence || "ta";
        sourceKind = "explicit-monadic-valence-selection";
      } else if (requestedKind === "dyadic" || VNC_VALENCE_DYADIC_SPECS[requestedValence]) {
        kind = "dyadic";
        valenceKey = requestedValence || "ki";
        sourceKind = "explicit-dyadic-valence-selection";
      } else if (/^(?:blocked|unsupported|same-person)\b/.test(raw)) {
        kind = "blocked";
        valenceKey = "nech";
        sourceKind = "parsed-blocked-valence-input";
      } else {
        const plusMatch = raw.match(/\+(ne|te|ta|tla|ki|k|kin|nech|tech|metz|metzin|mu)(?:[-+()#\s]|$)/);
        const prefixMatch = raw.match(/^(ne|te|ta|tla|ki|k|kin|nech|tech|metz|metzin|mu)[-\s]+/);
        const marker = (plusMatch?.[1] || prefixMatch?.[1] || "").replace(/^tla$/, "ta");
        if (VNC_VALENCE_MONADIC_SPECS[marker]) {
          kind = "monadic";
          valenceKey = marker;
          sourceKind = "parsed-monadic-valence-input";
        } else if (VNC_VALENCE_DYADIC_SPECS[marker]) {
          kind = "dyadic";
          valenceKey = marker;
          sourceKind = "parsed-dyadic-valence-input";
        }
      }
      const diagnostics = normalizedStem ? [] : ["vnc-valence-workbench-predicate-stem-required"];
      return Object.freeze({
        kind: "vnc-valence-workbench-source-frame",
        version: 1,
        formulaSchemaId: VNC_VALENCE_FORMULA_SCHEMA_ID,
        rawInput,
        predicateStem: normalizedStem,
        selectionKind: kind,
        valenceKind: kind,
        valence: valenceKey,
        valenceKey,
        sourceKind,
        parseAuthority: "user-input-parse-tree",
        formulaSlotSource: "andrews-formula-slot-schema",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        diagnostics: Object.freeze(diagnostics)
      });
    }
    function isVncValenceWorkbenchSourceFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "vnc-valence-workbench-source-frame" && frame.consumesRenderedInput === false && frame.displayStringsAuthorizeGrammar === false);
    }
    function normalizeVncValenceWorkbenchStem(value = "", {
      sourceFrame = null
    } = {}) {
      void value;
      if (!isVncValenceWorkbenchSourceFrame(sourceFrame)) {
        return "";
      }
      return String(sourceFrame.predicateStem || "");
    }
    function inferVncValenceWorkbenchSelection(rawInput = "", {
      valenceKind = "",
      valence = "",
      sourceFrame = null
    } = {}) {
      void rawInput;
      void valenceKind;
      void valence;
      if (!isVncValenceWorkbenchSourceFrame(sourceFrame)) {
        return {
          kind: "blocked",
          valence: "",
          diagnosticId: "vnc-valence-workbench-source-frame-required"
        };
      }
      return {
        kind: sourceFrame.selectionKind || sourceFrame.valenceKind || "intransitive",
        valence: sourceFrame.valenceKey || sourceFrame.valence || "",
        sourceFrame
      };
    }
    function getVncValenceMonadicSpec(key = "ta") {
      const normalized = String(key || "ta").trim().toLowerCase().replace(/^tla$/, "ta");
      return VNC_VALENCE_MONADIC_SPECS[normalized] || VNC_VALENCE_MONADIC_SPECS.ta;
    }
    function getVncValenceDyadicSpec(key = "ki", {
      stem = "",
      subjectPrefix = ""
    } = {}) {
      const normalized = String(key || "ki").trim().toLowerCase();
      const directFrame = typeof targetObject.getLesson6DirectNawatObjectDyadFrame === "function" ? targetObject.getLesson6DirectNawatObjectDyadFrame(normalized, {
        stem,
        pers1: subjectPrefix
      }) : null;
      const base = VNC_VALENCE_DYADIC_SPECS[normalized] || VNC_VALENCE_DYADIC_SPECS.ki;
      if (!directFrame) {
        return base;
      }
      return {
        ...base,
        nawatFormula: directFrame.visibleFormulaPrefix || base.nawatFormula,
        compactDisplay: directFrame.sourcePrefix || base.compactDisplay,
        surfacePrefix: directFrame.surfaceScopedPrefix || directFrame.sourcePrefix || base.surfacePrefix,
        trajectory: directFrame.trajectory || base.trajectory,
        specificity: directFrame.specificity || base.specificity,
        directNawatDyadFrame: directFrame
      };
    }
    function buildVncValenceSubjectSlot(subject = null) {
      const slotDefinition = getVncValenceFormulaSlotDefinition("pers1-pers2") || {};
      return {
        role: slotDefinition.role || "subject-person",
        slot: slotDefinition.id || "pers1-pers2",
        owner: slotDefinition.owner || "subject",
        path: slotDefinition.path || "subject.pers1-pers2",
        prefix: String(subject?.subjectPrefix || subject?.prefix || ""),
        suffix: String(subject?.subjectSuffix || subject?.suffix || ""),
        displayPrefix: String(subject?.subjectPrefix || subject?.prefix || "") || "Ø",
        displaySuffix: String(subject?.subjectSuffix || subject?.suffix || "") || "Ø",
        label: String(subject?.personSubKey || subject?.label || "3sg"),
        notObject: true,
        notTense: true
      };
    }
    function buildVncValenceTenseSlot(tense = "zero") {
      const slotDefinition = getVncValenceFormulaSlotDefinition("tns") || {};
      const spec = VNC_VALENCE_TENSE_SPECS[String(tense || "zero").trim()] || VNC_VALENCE_TENSE_SPECS.zero;
      return {
        role: slotDefinition.role || "tense",
        slot: slotDefinition.id || "tns",
        owner: slotDefinition.owner || "predicate",
        path: slotDefinition.path || "predicate.tense",
        tenseValue: spec.id,
        structuralDisplay: spec.andrewsStructural,
        andrewsStructural: spec.andrewsStructural,
        nawatDisplay: spec.nawatFormula,
        nawatRealization: spec.nawatFormula,
        compactDisplay: spec.compactDisplay,
        display: spec.andrewsStructural,
        value: spec.andrewsStructural,
        morph: spec.nawatFormula,
        displayMorph: spec.andrewsStructural,
        evidenceSource: spec.evidenceSource,
        vncOnly: true,
        notAvailableInOrdinaryNnc: true,
        notSubjectNumber: true
      };
    }
    function buildVncValenceNumberSlot(connector = "zero") {
      const slotDefinition = getVncValenceFormulaSlotDefinition("num1-num2") || {};
      const spec = VNC_VALENCE_NUMBER_CONNECTOR_SPECS[String(connector || "zero").trim()] || VNC_VALENCE_NUMBER_CONNECTOR_SPECS.zero;
      const [structuralNum1 = "0", structuralNum2 = "0"] = String(spec.andrewsStructural || "0-0").split("-");
      const primaryNawatFormula = String(spec.nawatFormula || "Ø-Ø").split(/\s*~\s*/)[0] || "Ø-Ø";
      const [nawatNum1 = "Ø", nawatNum2 = "Ø"] = primaryNawatFormula.split("-");
      return {
        role: slotDefinition.role || "subject-number-connector",
        slot: slotDefinition.id || "num1-num2",
        owner: slotDefinition.owner || "subject",
        path: slotDefinition.path || "subject.num1-num2",
        connector: spec.nawatFormula,
        surface: spec.surface,
        structuralDisplay: spec.andrewsStructural,
        andrewsStructural: spec.andrewsStructural,
        nawatDisplay: spec.nawatFormula,
        compactDisplay: spec.compactDisplay,
        displayDyad: spec.andrewsStructural,
        nawatDyad: spec.nawatFormula,
        compactSurface: spec.compactDisplay,
        num1: structuralNum1,
        num2: structuralNum2,
        displayNum1: structuralNum1,
        displayNum2: structuralNum2,
        nawatNum1,
        nawatNum2,
        label: spec.label,
        belongsTo: slotDefinition.owner || "subject",
        evidenceSource: spec.evidenceSource,
        notTense: true,
        notObjectValence: true,
        blockedInterpretations: Array.isArray(slotDefinition.blockedInterpretations) ? Array.from(slotDefinition.blockedInterpretations) : ["tense", "stem-suffix", "object-valence", "predicate-state"]
      };
    }
    function buildVncValenceObjectSlot({
      kind = "intransitive",
      valence = "",
      stem = "",
      subject = null,
      blockedReason = ""
    } = {}) {
      const schema = getVncValenceFormulaSchema();
      const slotDefinition = getVncValenceFormulaSlotDefinition("va1-va2") || {};
      const normalizedKind = String(kind || "intransitive").trim();
      const subjectPrefix = String(subject?.subjectPrefix || subject?.prefix || "");
      if (normalizedKind === "intransitive") {
        return {
          role: slotDefinition.role || "object-valence",
          formulaSchemaId: schema?.id || VNC_VALENCE_FORMULA_SCHEMA_ID,
          formulaSlot: "",
          slot: slotDefinition.path || "predicate.valence.va1-va2",
          owner: slotDefinition.owner || "predicate",
          belongsTo: slotDefinition.owner || "predicate",
          valenceKind: "intransitive",
          omitted: true,
          structuralDisplay: "",
          nawatDisplay: "",
          compactDisplay: "",
          surfacePrefix: "",
          status: "omitted",
          notStem: true,
          notSubjectConnector: true,
          notTense: true,
          blockedInterpretations: Array.isArray(slotDefinition.blockedInterpretations) ? Array.from(slotDefinition.blockedInterpretations) : ["stem", "subject-connector", "subject-number-connector", "tense"]
        };
      }
      const isMonadic = normalizedKind === "monadic";
      const spec = isMonadic ? getVncValenceMonadicSpec(valence) : getVncValenceDyadicSpec(valence, {
        stem,
        subjectPrefix
      });
      const formulaSlot = isMonadic ? "va" : "va1-va2";
      return {
        role: isMonadic ? "monadic-valence" : "dyadic-valence",
        formulaSchemaId: schema?.id || VNC_VALENCE_FORMULA_SCHEMA_ID,
        formulaSlot,
        slot: slotDefinition.path || "predicate.valence.va1-va2",
        owner: slotDefinition.owner || "predicate",
        belongsTo: slotDefinition.owner || "predicate",
        valenceKind: normalizedKind,
        valenceId: spec.id || "",
        valenceKey: spec.key || valence,
        structuralDisplay: spec.andrewsStructural || "",
        andrewsStructural: spec.andrewsStructural || "",
        nawatDisplay: spec.nawatFormula || spec.compactDisplay || "",
        nawatRealization: spec.nawatFormula || spec.compactDisplay || "",
        compactDisplay: spec.compactDisplay || spec.surfacePrefix || "",
        surfacePrefix: spec.surfacePrefix || spec.compactDisplay || "",
        display: spec.andrewsStructural || "",
        value: spec.andrewsStructural || "",
        gloss: spec.gloss || "",
        trajectory: spec.trajectory || "",
        specificity: spec.specificity || "",
        humanness: spec.humanness || "",
        evidenceSource: spec.evidenceSource || "",
        directNawatDyadFrame: spec.directNawatDyadFrame || null,
        generationStatus: spec.generationStatus || "generated-scoped",
        status: blockedReason ? "blocked" : "resolved",
        blockedReason,
        classicalStructuralOnly: true,
        noClassicalSurfaceImport: true,
        notStem: true,
        notSubjectConnector: true,
        notSubjectNumber: true,
        notTense: true,
        blockedInterpretations: Array.isArray(slotDefinition.blockedInterpretations) ? Array.from(slotDefinition.blockedInterpretations) : ["stem", "subject-connector", "subject-number-connector", "tense"]
      };
    }
    function buildVncValenceFormulaSlots({
      stem = "",
      kind = "intransitive",
      valence = "",
      subject = null,
      tense = "zero",
      numberConnector = "zero",
      blockedReason = ""
    } = {}) {
      const predicateSlotDefinition = getVncValenceFormulaSlotDefinition("STEM") || {};
      const subjectSlot = buildVncValenceSubjectSlot(subject);
      return {
        pers1Pers2: subjectSlot,
        valence: buildVncValenceObjectSlot({
          kind,
          valence,
          stem,
          subject: subjectSlot,
          blockedReason
        }),
        predicateStem: {
          role: predicateSlotDefinition.role || "predicate-stem",
          slot: predicateSlotDefinition.id || "STEM",
          owner: predicateSlotDefinition.owner || "predicate",
          path: predicateSlotDefinition.path || "predicate.stem",
          stem,
          displayStem: stem,
          notValence: true,
          notSubjectConnector: true,
          notTense: true
        },
        tensePosition: buildVncValenceTenseSlot(tense),
        num1Num2: buildVncValenceNumberSlot(numberConnector)
      };
    }
    function getVncValenceFormulaRenderOptions(formulaSlots = null) {
      return formulaSlots?.valence?.omitted === true ? {
        omitSlots: ["valence", "va1-va2"]
      } : {};
    }
    function getVncValenceFormulaSlotToken(formulaSlots = null) {
      return formulaSlots?.valence?.formulaSlot === "va" ? "va" : "va1-va2";
    }
    function renderVncValenceFormulaTemplate(formulaSlots = null) {
      if (typeof targetObject.renderAndrewsFormulaTemplate !== "function") {
        return "";
      }
      return targetObject.renderAndrewsFormulaTemplate(VNC_VALENCE_FORMULA_SCHEMA_ID, {
        slotTokens: {
          valence: getVncValenceFormulaSlotToken(formulaSlots)
        },
        ...getVncValenceFormulaRenderOptions(formulaSlots)
      });
    }
    function buildVncValenceFormulaEchoFromSlots(formulaSlots = null, {
      mode = "structural",
      expanded = true
    } = {}) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const valenceSlot = formulaSlots.valence || {};
      const tenseSlot = formulaSlots.tensePosition || {};
      const numberConnector = formulaSlots.num1Num2 || {};
      const displayValence = mode === "compact" ? valenceSlot.compactDisplay || valenceSlot.surfacePrefix || valenceSlot.nawatDisplay || valenceSlot.structuralDisplay || "" : mode === "nawat" ? valenceSlot.nawatDisplay || valenceSlot.nawatRealization || valenceSlot.compactDisplay || valenceSlot.structuralDisplay || "" : valenceSlot.structuralDisplay || valenceSlot.andrewsStructural || valenceSlot.display || "";
      const displayTense = mode === "structural" ? tenseSlot.structuralDisplay || tenseSlot.andrewsStructural || tenseSlot.display || "0" : tenseSlot.nawatDisplay || tenseSlot.nawatRealization || tenseSlot.compactDisplay || "Ø";
      const displayNumber = expanded ? mode === "structural" ? numberConnector.structuralDisplay || numberConnector.displayDyad || "0-0" : numberConnector.nawatDisplay || numberConnector.nawatDyad || numberConnector.displayDyad || "Ø-Ø" : numberConnector.compactDisplay || numberConnector.surface || "Ø";
      const echoSlots = {
        ...formulaSlots,
        renderOptions: getVncValenceFormulaRenderOptions(formulaSlots),
        valence: {
          ...valenceSlot,
          display: displayValence,
          value: displayValence,
          surface: displayValence
        },
        tensePosition: {
          ...tenseSlot,
          display: displayTense,
          value: displayTense,
          morph: displayTense,
          displayMorph: displayTense
        },
        num1Num2: expanded ? {
          ...numberConnector,
          displayDyad: displayNumber,
          displayConnector: displayNumber,
          connector: displayNumber,
          surface: displayNumber
        } : {
          ...numberConnector,
          displayDyad: "",
          displayConnector: displayNumber,
          connector: displayNumber,
          surface: displayNumber
        }
      };
      if (typeof targetObject.renderAndrewsFormulaEchoFromSchema === "function") {
        return targetObject.renderAndrewsFormulaEchoFromSchema(VNC_VALENCE_FORMULA_SCHEMA_ID, echoSlots);
      }
      const subject = formulaSlots.pers1Pers2 || {};
      const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const stem = String(formulaSlots.predicateStem?.stem || "");
      const valencePart = valenceSlot.omitted ? "" : `+${displayValence}`;
      return stem ? `#${prefix}-${suffix}${valencePart}(${stem})${displayTense}+${displayNumber}#` : "";
    }
    function buildVncValenceFormulaWorkbenchSlotRecords(schema = null, formulaSlots = {}) {
      const slots = Array.isArray(schema?.slots) ? schema.slots : [];
      return slots.map(slot => {
        const sourceSlot = formulaSlots?.[slot.key] || formulaSlots?.[slot.id] || formulaSlots?.[slot.path] || {};
        const omitted = slot.key === "valence" && sourceSlot.omitted === true;
        const structuralValue = (() => {
          if (slot.key === "valence") {
            return String(sourceSlot.structuralDisplay || sourceSlot.andrewsStructural || sourceSlot.display || "");
          }
          if (slot.key === "tensePosition") {
            return String(sourceSlot.structuralDisplay || sourceSlot.andrewsStructural || sourceSlot.display || "0");
          }
          if (slot.key === "num1Num2") {
            return String(sourceSlot.structuralDisplay || sourceSlot.displayDyad || "0-0");
          }
          return targetObject.getAndrewsFormulaEchoSlotValue(slot, formulaSlots);
        })();
        const nawatValue = (() => {
          if (slot.key === "valence") {
            return String(sourceSlot.nawatDisplay || sourceSlot.nawatRealization || sourceSlot.compactDisplay || structuralValue);
          }
          if (slot.key === "tensePosition") {
            return String(sourceSlot.nawatDisplay || sourceSlot.nawatRealization || sourceSlot.compactDisplay || "Ø");
          }
          if (slot.key === "num1Num2") {
            return String(sourceSlot.nawatDisplay || sourceSlot.nawatDyad || structuralValue || "Ø-Ø");
          }
          return structuralValue;
        })();
        const compactValue = (() => {
          if (slot.key === "valence" || slot.key === "tensePosition" || slot.key === "num1Num2") {
            return String(sourceSlot.compactDisplay || sourceSlot.surfacePrefix || sourceSlot.surface || nawatValue || structuralValue);
          }
          return structuralValue;
        })();
        const missing = slot.requiredForEcho === true && !String(structuralValue || "").trim();
        const renderedValue = omitted || missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${structuralValue})` : structuralValue}${slot.trailing || ""}`;
        const token = slot.key === "valence" && !omitted ? sourceSlot.formulaSlot || slot.token || slot.id || "" : typeof targetObject.renderAndrewsFormulaSlotTemplate === "function" ? targetObject.renderAndrewsFormulaSlotTemplate(slot, omitted ? {
          omitSlots: ["valence", "va1-va2"]
        } : {}) : slot.wrapper === "parentheses" ? `(${slot.token || ""})` : slot.token || "";
        return {
          id: slot.id || "",
          key: slot.key || "",
          label: slot.label || "",
          role: slot.key === "valence" && sourceSlot.role ? sourceSlot.role : slot.role || "",
          owner: slot.owner || "",
          path: slot.path || "",
          boundary: slot.boundary || "",
          layer: slot.layer || "",
          position: slot.position || "",
          token,
          value: structuralValue,
          structuralValue,
          nawatValue,
          compactValue,
          renderedValue,
          compactRenderedValue: omitted || missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${compactValue})` : compactValue}${slot.trailing || ""}`,
          status: omitted ? "omitted" : missing ? "missing" : slot.role === "nuclear-boundary" ? "structural" : "resolved",
          modelFields: [{
            label: "owner",
            value: slot.owner || ""
          }, {
            label: "path",
            value: slot.path || ""
          }, ...(slot.key === "valence" ? [{
            label: "Andrews",
            value: structuralValue || "omitted"
          }, {
            label: "Nawat",
            value: nawatValue || "omitted"
          }, {
            label: "kind",
            value: sourceSlot.valenceKind || "intransitive"
          }, {
            label: "not",
            value: "stem/subject/tense"
          }] : []), ...(slot.key === "tensePosition" ? [{
            label: "VNC-only",
            value: "true"
          }, {
            label: "not",
            value: "CNN/CNN posesiva"
          }] : []), ...(slot.key === "num1Num2" ? [{
            label: "dyad",
            value: structuralValue
          }, {
            label: "not",
            value: "tense/object"
          }] : [])].filter(entry => entry.value),
          blockedInterpretations: Array.isArray(slot.blockedInterpretations) ? Array.from(slot.blockedInterpretations) : []
        };
      });
    }
    function buildVncValenceExample({
      id = "",
      label = "",
      stem = "nemi",
      kind = "intransitive",
      valence = "",
      numberConnector = "preterit3sg",
      surface = "",
      status = "generated-scoped",
      blockedReason = ""
    } = {}) {
      const sourceFrame = buildVncValenceWorkbenchSourceFrame({
        inputValue: stem,
        valenceKind: kind,
        valence
      });
      const normalizedStem = isVncValenceWorkbenchSourceFrame(sourceFrame) ? String(sourceFrame.predicateStem || "") || "nemi" : "nemi";
      const formulaSlots = buildVncValenceFormulaSlots({
        stem: normalizedStem,
        kind,
        valence,
        numberConnector,
        blockedReason
      });
      const structuralFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "structural",
        expanded: true
      });
      const nawatFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "nawat",
        expanded: true
      });
      const compactFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "compact",
        expanded: false
      });
      const blocked = Boolean(blockedReason);
      return {
        id: String(id || `${kind}-${valence || "none"}-${normalizedStem}`),
        label: String(label || kind),
        stem: normalizedStem,
        valenceKind: formulaSlots.valence.valenceKind,
        valenceSlot: formulaSlots.valence.formulaSlot || "",
        structuralFormulaEcho,
        fullFormulaEcho: structuralFormulaEcho,
        nawatFormulaEcho,
        compactFormulaEcho,
        surface: blocked ? "" : String(surface || ""),
        surfaceForms: blocked || !surface ? [] : String(surface).split(/\s*\/\s*/g).filter(Boolean),
        supported: !blocked,
        status: blocked ? "unsupported" : status,
        formulaSlots,
        slotModel: {
          valence: formulaSlots.valence,
          tensePosition: formulaSlots.tensePosition,
          num1Num2: formulaSlots.num1Num2
        },
        diagnostics: blocked ? [{
          id: "vnc-valence-object-combination-blocked",
          severity: "blocked",
          status: "blocked",
          message: blockedReason
        }] : []
      };
    }
    function buildVncValenceFormulaWorkbenchExamples() {
      return [buildVncValenceExample({
        id: "intransitive-nemi",
        label: "intransitive",
        stem: "nemi",
        kind: "intransitive",
        surface: "nenki / nemik"
      }), buildVncValenceExample({
        id: "monadic-ta-ijpiya",
        label: "monadic ta/tla",
        stem: "ijpiya",
        kind: "monadic",
        valence: "ta",
        surface: "taijpishki / taijpiyak / taijpik"
      }), buildVncValenceExample({
        id: "dyadic-ki-piya",
        label: "dyadic specific",
        stem: "piya",
        kind: "dyadic",
        valence: "ki",
        surface: "kipishki / kipiyak"
      }), buildVncValenceExample({
        id: "blocked-same-person-nech",
        label: "blocked object",
        stem: "chiwa",
        kind: "dyadic",
        valence: "nech",
        surface: "",
        status: "unsupported",
        blockedReason: "Specific 1sg object with an implicit 1sg subject is blocked here; use the reflexive/reciprocal dyad route instead of treating n-ech as a stem or tense suffix."
      })];
    }
    function getVncValenceScopedSurfaceForSlots(formulaSlots = null) {
      const stem = String(formulaSlots?.predicateStem?.stem || "").trim();
      const valenceSlot = formulaSlots?.valence || {};
      const kind = String(valenceSlot.valenceKind || "intransitive");
      const key = String(valenceSlot.valenceKey || "");
      if (kind === "intransitive" && stem === "nemi") {
        return "nenki / nemik";
      }
      if (kind === "monadic" && key === "ta" && stem === "ijpiya") {
        return "taijpishki / taijpiyak / taijpik";
      }
      if (kind === "dyadic" && key === "ki" && stem === "piya") {
        return "kipishki / kipiyak";
      }
      return "";
    }
    function normalizeVncValenceFormulaSurfacePart(value = "") {
      return String(value || "").replace(/[Ø0]/g, "").replace(/\s+/g, "").replace(/-/g, "").trim();
    }
    function buildVncValenceAndrewsLogicTargetSegmentFrames(formulaSlots = null) {
      const stem = normalizeVncValenceFormulaSurfacePart(formulaSlots?.predicateStem?.stem || "");
      if (!stem) {
        return [];
      }
      const subjectSlot = formulaSlots?.pers1Pers2 || {};
      const valenceSlot = formulaSlots?.valence || {};
      const tenseSlot = formulaSlots?.tensePosition || {};
      const numberSlot = formulaSlots?.num1Num2 || {};
      const kind = String(valenceSlot.valenceKind || "intransitive");
      const subjectPrefix = normalizeVncValenceFormulaSurfacePart(subjectSlot.prefix || "");
      const valencePrefix = kind === "intransitive" ? "" : normalizeVncValenceFormulaSurfacePart(valenceSlot.surfacePrefix || valenceSlot.nawatRealization || valenceSlot.nawatDisplay);
      const tenseSurface = normalizeVncValenceFormulaSurfacePart(tenseSlot.surface || tenseSlot.compactSurface || "");
      const numberSurface = normalizeVncValenceFormulaSurfacePart(numberSlot.surface || numberSlot.compactSurface || "");
      return Object.freeze([Object.freeze({
        slot: "pers1-pers2",
        role: "subject-person",
        surface: subjectPrefix,
        formulaValue: subjectSlot.structuralDisplay || subjectSlot.displayPrefix || "",
        source: "vnc-valence-formula-slot"
      }), Object.freeze({
        slot: "va1-va2",
        role: kind === "intransitive" ? "no-valence-prefix" : "object-valence",
        surface: valencePrefix,
        formulaValue: valenceSlot.structuralDisplay || "",
        valenceKind: kind,
        valenceKey: valenceSlot.valenceKey || "",
        source: "vnc-valence-formula-slot"
      }), Object.freeze({
        slot: "STEM",
        role: "predicate-stem",
        surface: stem,
        formulaValue: formulaSlots?.predicateStem?.displayStem || formulaSlots?.predicateStem?.stem || "",
        source: "vnc-valence-formula-slot"
      }), Object.freeze({
        slot: "tns",
        role: "tense",
        surface: tenseSurface,
        formulaValue: tenseSlot.structuralDisplay || "",
        source: "vnc-valence-formula-slot"
      }), Object.freeze({
        slot: "num1-num2",
        role: "subject-number",
        surface: numberSurface,
        formulaValue: numberSlot.structuralDisplay || "",
        source: "vnc-valence-formula-slot"
      })]);
    }
    function getVncValenceTargetSurfaceFromSegmentFrames(targetSegmentFrames = []) {
      if (!Array.isArray(targetSegmentFrames) || !targetSegmentFrames.length) {
        return "";
      }
      return targetSegmentFrames.map(frame => String(frame?.surface || "")).join("");
    }
    function getVncValenceFormulaSlotSignature(formulaSlots = null) {
      const targetSegmentFrames = buildVncValenceAndrewsLogicTargetSegmentFrames(formulaSlots);
      return targetSegmentFrames.map(frame => `${frame.slot}:${frame.role}:${frame.surface}:${frame.formulaValue || ""}:${frame.valenceKind || ""}:${frame.valenceKey || ""}`).join("|");
    }
    function buildVncValenceAndrewsLogicSurfaceSourceFrame({
      formulaSlots = null
    } = {}) {
      const targetSegmentFrames = buildVncValenceAndrewsLogicTargetSegmentFrames(formulaSlots);
      const predicateStem = targetSegmentFrames.find(frame => frame.slot === "STEM")?.surface || "";
      if (!predicateStem || !targetSegmentFrames.length) {
        return null;
      }
      const valenceFrame = targetSegmentFrames.find(frame => frame.slot === "va1-va2") || null;
      return Object.freeze({
        kind: "vnc-valence-andrews-logic-surface-source-frame",
        version: 1,
        formulaSchemaId: VNC_VALENCE_FORMULA_SCHEMA_ID,
        formulaSlotSource: "andrews-formula-slot-schema",
        sourceUnit: "vnc-formula-slots",
        predicateStem,
        valenceKind: valenceFrame?.valenceKind || "intransitive",
        valenceKey: valenceFrame?.valenceKey || "",
        targetSegmentFrames,
        targetSurface: getVncValenceTargetSurfaceFromSegmentFrames(targetSegmentFrames),
        formulaSlotSignature: getVncValenceFormulaSlotSignature(formulaSlots),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil orthography bridge"
      });
    }
    function buildVncValenceAndrewsLogicSurfaceOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "vnc-valence-andrews-logic-surface-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-vnc-valence-slot-surface-realization",
        family: "vnc-valence",
        routeFamily: "vnc-valence",
        routeStage: "formula-workbench-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceFrameSignature: sourceFrame.formulaSlotSignature || "",
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetSurface: sourceFrame.targetSurface || "",
        operationApplied: "realize-vnc-valence-formula-slots",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        outputPolicy: "formula-slots-and-typed-operation-authorize-vnc-valence-surface"
      });
    }
    function getVncValenceAndrewsLogicSurfaceFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "vnc-valence-andrews-logic-surface-source-frame") {
        return "vnc-valence-source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame") {
        return "vnc-valence-operation-frame-required";
      }
      if (operationFrame.operationId !== "andrews-vnc-valence-slot-surface-realization" || operationFrame.routeFamily !== "vnc-valence" || operationFrame.operationApplied !== "realize-vnc-valence-formula-slots" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "vnc-valence-operation-frame-required";
      }
      if (String(operationFrame.sourceFrameSignature || "") !== String(sourceFrame.formulaSlotSignature || "")) {
        return "vnc-valence-contradictory-source-frame";
      }
      const sourceSurface = String(sourceFrame.targetSurface || "");
      const operationSurface = String(operationFrame.targetSurface || "");
      const operationSegmentSurface = getVncValenceTargetSurfaceFromSegmentFrames(operationFrame.targetSegmentFrames);
      if (!operationSurface || operationSurface !== sourceSurface || operationSegmentSurface !== operationSurface) {
        return "vnc-valence-contradictory-target-frame";
      }
      return "";
    }
    function getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots = null, {
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      void formulaSlots;
      const mismatch = getVncValenceAndrewsLogicSurfaceFrameMismatch({
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return "";
      }
      return String(operationFrame.targetSurface || "");
    }
    function getVncValenceScopedNumberConnector({
      stem = "",
      kind = "intransitive",
      valence = ""
    } = {}) {
      const normalizedStem = String(stem || "").trim();
      const normalizedKind = String(kind || "intransitive");
      const normalizedValence = String(valence || "").trim();
      if (normalizedKind === "intransitive" && normalizedStem === "nemi" || normalizedKind === "monadic" && normalizedValence === "ta" && normalizedStem === "ijpiya" || normalizedKind === "dyadic" && normalizedValence === "ki" && normalizedStem === "piya") {
        return "preterit3sg";
      }
      return "zero";
    }
    function buildVncValenceFormulaWorkbenchSlice({
      inputValue = "",
      valenceKind = "",
      valence = ""
    } = {}) {
      const schema = getVncValenceFormulaSchema();
      const rawInput = String(inputValue || "").trim();
      const sourceFrame = buildVncValenceWorkbenchSourceFrame({
        inputValue: rawInput,
        valenceKind,
        valence
      });
      const parsedSelection = isVncValenceWorkbenchSourceFrame(sourceFrame) ? {
        kind: sourceFrame.selectionKind || sourceFrame.valenceKind || "intransitive",
        valence: sourceFrame.valenceKey || sourceFrame.valence || "",
        sourceFrame
      } : {
        kind: "blocked",
        valence: "",
        diagnosticId: "vnc-valence-workbench-source-frame-required"
      };
      const normalizedStem = isVncValenceWorkbenchSourceFrame(sourceFrame) ? String(sourceFrame.predicateStem || "") : "";
      const blockedReason = parsedSelection.kind === "blocked" ? "Object combination is diagnostic-only until the valence route is explicitly supported by Andrews slot logic." : "";
      const formulaKind = parsedSelection.kind === "blocked" ? "dyadic" : parsedSelection.kind;
      const numberConnector = getVncValenceScopedNumberConnector({
        stem: normalizedStem,
        kind: formulaKind,
        valence: parsedSelection.valence
      });
      const formulaSlots = buildVncValenceFormulaSlots({
        stem: normalizedStem,
        kind: formulaKind,
        valence: parsedSelection.valence,
        numberConnector,
        blockedReason
      });
      const sourceRequirementCheck = typeof targetObject.evaluateAndrewsFormulaSourceRequirements === "function" ? targetObject.evaluateAndrewsFormulaSourceRequirements(VNC_VALENCE_FORMULA_SCHEMA_ID, {
        inputValue: normalizedStem,
        slotValues: formulaSlots,
        sourceValues: {
          predicateStem: normalizedStem,
          "predicate.stem": normalizedStem,
          STEM: normalizedStem
        }
      }) : {
        ok: Boolean(normalizedStem),
        diagnostics: normalizedStem ? [] : [{
          id: "vnc-missing-predicate-stem",
          severity: "blocked",
          message: "VNC formula workbench requires a verbal predicate stem inside the parentheses."
        }],
        generationContract: schema?.generationContract || null,
        sourceRequirements: schema?.sourceRequirements || [],
        missingRequirements: normalizedStem ? [] : [{
          id: "vnc-predicate-stem"
        }],
        satisfiedRequirements: normalizedStem ? [{
          id: "vnc-predicate-stem"
        }] : []
      };
      const structuralFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "structural",
        expanded: true
      });
      const nawatFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "nawat",
        expanded: true
      });
      const compactFormulaEcho = buildVncValenceFormulaEchoFromSlots(formulaSlots, {
        mode: "compact",
        expanded: false
      });
      const slotBlockDiagnostics = [["vnc-shell", "va1-va2", "stem"], ["vnc-shell", "va1-va2", "tense"], ["vnc-shell", "tns", "subject-number-connector"], ["ordinary-nnc-shell", "num1-num2", "tense"], ["possessive-state-nnc", "st1-st2", "tense"]].map(([schemaId, slotId, interpretation]) => typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation(schemaId, slotId, interpretation).diagnostic : null).filter(Boolean);
      const logicAuthorityPolicy = getVncValenceAndrewsLogicAuthorityPolicy();
      const scopedEvidenceSurface = getVncValenceScopedSurfaceForSlots(formulaSlots);
      const andrewsLogicSurfaceSourceFrame = buildVncValenceAndrewsLogicSurfaceSourceFrame({
        formulaSlots
      });
      const andrewsLogicSurfaceOperationFrame = buildVncValenceAndrewsLogicSurfaceOperationFrame(andrewsLogicSurfaceSourceFrame);
      const andrewsLogicSurface = getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots, {
        sourceFrame: andrewsLogicSurfaceSourceFrame,
        operationFrame: andrewsLogicSurfaceOperationFrame
      });
      const generationSurface = scopedEvidenceSurface || andrewsLogicSurface;
      const generationStatusWhenAllowed = scopedEvidenceSurface ? "generated-scoped" : "andrews-logic-generated";
      const generationAllowed = Boolean(normalizedStem && sourceRequirementCheck.ok && !blockedReason && generationSurface);
      const generationStatus = !normalizedStem ? "blocked" : blockedReason ? "unsupported" : generationAllowed ? generationStatusWhenAllowed : "blocked";
      return {
        kind: "vnc-valence-formula-workbench-slice",
        version: 1,
        formulaSchemaId: schema?.id || VNC_VALENCE_FORMULA_SCHEMA_ID,
        formulaSchemaVersion: schema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: renderVncValenceFormulaTemplate(formulaSlots),
        formulaFamilies: [{
          id: "intransitive-vnc",
          label: "intransitive",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate(VNC_VALENCE_FORMULA_SCHEMA_ID, {
            omitSlots: ["valence", "va1-va2"]
          }) : "#pers1-pers2(STEM)tns+num1-num2#"
        }, {
          id: "monadic-transitive-vnc",
          label: "monadic",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate(VNC_VALENCE_FORMULA_SCHEMA_ID, {
            slotTokens: {
              valence: "va"
            }
          }) : "#pers1-pers2+va(STEM)tns+num1-num2#"
        }, {
          id: "dyadic-transitive-vnc",
          label: "dyadic",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate(VNC_VALENCE_FORMULA_SCHEMA_ID, {
            slotTokens: {
              valence: "va1-va2"
            }
          }) : "#pers1-pers2+va1-va2(STEM)tns+num1-num2#"
        }],
        formulaEcho: structuralFormulaEcho,
        fullFormulaEcho: structuralFormulaEcho,
        structuralFormulaEcho,
        nawatFormulaEcho,
        compactFormulaEcho,
        hasTensePosition: true,
        sourceMaterial: {
          rawInput,
          stem: normalizedStem,
          inputKind: "vnc-valence",
          placeholder: "nemi / ta-ijpiya / ki-piya",
          inputLabel: "Verbo o formula CNV",
          sourceKind: normalizedStem ? "open-stem-or-formula" : ""
        },
        sourceFrame,
        sourceRequirements: sourceRequirementCheck.sourceRequirements || [],
        missingRequirements: sourceRequirementCheck.missingRequirements || [],
        satisfiedRequirements: sourceRequirementCheck.satisfiedRequirements || [],
        parsedSlots: buildVncValenceFormulaWorkbenchSlotRecords(schema, formulaSlots),
        examples: buildVncValenceFormulaWorkbenchExamples(),
        evidenceRefs: [...(Array.isArray(schema?.evidenceRefs) ? schema.evidenceRefs : []), "Andrews formula inventory: VNC valence/object slots", ...(scopedEvidenceSurface ? ["data/basic-data.csv scoped preterit examples"] : [])].filter(Boolean),
        realizationBoundary: {
          structuralFormulaEcho,
          nawatFormulaEcho,
          compactFormulaEcho,
          classicalStructuralOnly: true,
          noClassicalSurfaceImport: true,
          structuralExamples: ["tla", "c-0/qu-0/qui-0", "qu-im"],
          nawatAuthority: "Nawat/Pipil orthography bridge; examples illustrate spelling only and do not gate grammar logic",
          logicAuthority: logicAuthorityPolicy.grammarLogicAuthority,
          generationGate: logicAuthorityPolicy.grammarLogicGate
        },
        generation: {
          allowed: generationAllowed,
          status: generationStatus,
          routeFamily: sourceRequirementCheck.generationContract?.routeFamily || "vnc-valence",
          routeStage: sourceRequirementCheck.generationContract?.routeStage || "formula-workbench",
          outputPolicy: sourceRequirementCheck.generationContract?.outputPolicy || "",
          surface: generationAllowed ? generationSurface : "",
          surfaceForms: generationAllowed ? generationSurface.split(/\s*\/\s*/g).filter(Boolean) : [],
          sourceKind: normalizedStem ? "formula-workbench" : "",
          logicAuthority: logicAuthorityPolicy.grammarLogicAuthority,
          orthographyAuthority: logicAuthorityPolicy.orthographyAuthority,
          generationGate: logicAuthorityPolicy.grammarLogicGate,
          orthographyExamplesRole: logicAuthorityPolicy.orthographyExamplesRole,
          andrewsLogicSurface,
          scopedEvidenceSurface,
          andrewsLogicSurfaceSourceFrame,
          andrewsLogicSurfaceOperationFrame,
          targetSegmentFrames: andrewsLogicSurfaceOperationFrame?.targetSegmentFrames || []
        },
        diagnostics: [...(Array.isArray(sourceRequirementCheck.diagnostics) ? sourceRequirementCheck.diagnostics : []), ...slotBlockDiagnostics, ...(blockedReason ? [{
          id: "vnc-valence-object-combination-blocked",
          severity: "blocked",
          status: "blocked",
          message: blockedReason
        }] : []), {
          id: "vnc-valence-classical-spelling-structural-only",
          severity: "note",
          message: "Andrews object spellings such as tla and c/qu/qui are structural rule evidence; Nawat formula and surface realization pass through the orthography bridge."
        }]
      };
    }
    function buildVncShellFormulaWorkbenchSlice({
      inputValue = ""
    } = {}) {
      const rawInput = String(inputValue || "").trim();
      const effectiveInput = rawInput || "nemi";
      const slice = buildVncValenceFormulaWorkbenchSlice({
        inputValue: effectiveInput,
        valenceKind: rawInput ? "" : "intransitive"
      });
      const tenseSlot = (Array.isArray(slice.parsedSlots) ? slice.parsedSlots : []).find(slot => slot.key === "tensePosition") || null;
      const numberSlot = (Array.isArray(slice.parsedSlots) ? slice.parsedSlots : []).find(slot => slot.key === "num1Num2") || null;
      return {
        ...slice,
        kind: "vnc-shell-formula-workbench-slice",
        formulaSchemaId: "vnc-shell",
        formula: slice.formula || (typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("vnc-shell", {
          omitSlots: ["valence", "va1-va2"]
        }) : "#pers1-pers2(STEM)tns+num1-num2#"),
        sourceMaterial: {
          ...(slice.sourceMaterial || {}),
          rawInput,
          stem: slice.sourceMaterial?.stem || effectiveInput,
          inputKind: "vnc-shell",
          placeholder: "nemi",
          inputLabel: "Predicado verbal CNV",
          sourceKind: rawInput ? slice.sourceMaterial?.sourceKind || "open-stem-or-formula" : "default-intransitive-example"
        },
        evidenceRefs: ["Andrews 4.5", "Andrews 5.1-5.3", "Andrews 6.1-6.4", ...(Array.isArray(slice.evidenceRefs) ? slice.evidenceRefs : [])].filter((ref, index, refs) => ref && refs.indexOf(ref) === index),
        realizationBoundary: {
          ...(slice.realizationBoundary || {}),
          structuralExamples: ["tns", "qui-0", "Ø-Ø"],
          nawatAuthority: "la ortografia Nawat/Pipil realiza la logica CNV autorizada por Andrews; tns no existe en formulas CNN"
        },
        generation: {
          ...(slice.generation || {}),
          routeFamily: "vnc-shell",
          outputPolicy: "La ranura tns pertenece solo a CNV; Andrews decide la logica de slots y la ortografia Nawat/Pipil realiza la salida."
        },
        diagnostics: [...(Array.isArray(slice.diagnostics) ? slice.diagnostics : []), {
          id: "vnc-shell-tense-slot-is-vnc-only",
          severity: "note",
          message: "La ranura tns pertenece al lado predicativo CNV y no se copia a formulas CNN."
        }, ...(tenseSlot?.owner === "predicate" && numberSlot?.owner === "subject" ? [] : [{
          id: "vnc-shell-slot-owner-mismatch",
          severity: "blocked",
          message: "La ranura tns debe pertenecer al predicado CNV y num1-num2 al sujeto."
        }])]
      };
    }
    function cloneGenerationValencyLessonRecord(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneGenerationValencyLessonRecord(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneGenerationValencyLessonRecord(entry)]));
    }
    const LESSON21_PASSIVE_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON21_PASSIVE_PDF_REFS = Object.freeze(["Andrews Lesson 21.1", "Andrews Lesson 21.2", "Andrews Lesson 21.3", "Andrews Lesson 21.4"]);
    const LESSON21_PASSIVE_TRANSFORMATION_FRAME = Object.freeze({
      kind: "lesson-21-passive-transformation-frame",
      sourceSection: "Andrews 21.1",
      sourceVoice: "active VNC",
      targetVoice: "passive VNC",
      requiresSpecificObjectPronoun: true,
      sourceIntransitiveAllowed: false,
      sourceNonspecificObjectAllowed: false,
      nonspecificObjectRedirect: "Andrews Lesson 22 impersonal voice",
      operations: Object.freeze(["delete-active-subject", "replace-active-stem-with-nonactive-counterpart", "relocate-specific-object-to-subject-function"]),
      agentPhraseAllowed: false,
      agentInterpretation: "passive agent is impersonal and cannot be expressed as a by-phrase"
    });
    const LESSON21_PASSIVE_GENERATION_CASES = Object.freeze([Object.freeze({
      id: "single-specific-projective-object",
      sourceSection: "Andrews 21.2.1",
      sourceObjectProfile: "one specific projective object",
      targetFormula: "intransitive VNC",
      objectToSubject: true,
      shuntlineObjectPreserved: false,
      currentEngineStatus: "implemented-through-passive-subject-override-and-nonactive-stem"
    }), Object.freeze({
      id: "single-specific-reflexive-object",
      sourceSection: "Andrews 21.2.2",
      sourceObjectProfile: "one specific reflexive object",
      targetFormula: "transitive VNC",
      objectToSubject: true,
      reflexiveWitness: "shuntline ne",
      currentEngineStatus: "partial-nawat-reflexive-slot-exists-but-passive-ne-witness-needs-audited-routing"
    }), Object.freeze({
      id: "projective-plus-reflexive-object",
      sourceSection: "Andrews 21.2.3",
      sourceObjectProfile: "one specific projective object plus one reflexive object",
      targetFormula: "transitive VNC",
      mainlineProjectiveToSubject: true,
      reflexiveWitness: "shuntline ne",
      currentEngineStatus: "partial-double-object-passive-routing-needs-focused-audit"
    }), Object.freeze({
      id: "two-specific-projective-objects",
      sourceSection: "Andrews 21.2.4",
      sourceObjectProfile: "two specific projective objects",
      targetFormula: "transitive VNC",
      mainlineObjectToSubject: true,
      shuntlineSpecificObjectPreserved: true,
      currentEngineStatus: "partial-mainline-shuntline-passive-distinction-needs-focused-audit"
    }), Object.freeze({
      id: "one-specific-one-nonspecific-projective-object",
      sourceSection: "Andrews 21.2.5",
      sourceObjectProfile: "one specific projective object plus one nonspecific projective object",
      targetFormula: "transitive VNC",
      specificObjectToSubject: true,
      nonspecificObjectPreserved: true,
      currentEngineStatus: "partial-current-combined-passive-impersonal-route-can-clear nonspecific markers"
    }), Object.freeze({
      id: "three-object-pronouns",
      sourceSection: "Andrews 21.2.6",
      sourceObjectProfile: "three object pronouns",
      targetFormula: "principles from 21.2.1-21.2.5",
      currentEngineStatus: "partial-needs-separate-three-object-passive-audit"
    })]);
    const LESSON21_PASSIVE_MOOD_FRAME = Object.freeze({
      kind: "lesson-21-passive-mood-frame",
      sourceSection: "Andrews 21.3",
      passiveAssertionsCanTransformTo: Object.freeze(["wish", "command/exhortation", "admonition"]),
      sentenceLayerLessons: Object.freeze(["Andrews Lesson 9", "Andrews Lesson 10"]),
      currentEngineStatus: "finite nonactive tenses exist; sentence-level optative/admonitive particles remain diagnostic"
    });
    const LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME = Object.freeze({
      kind: "lesson-21-active-reflexive-passive-notion-frame",
      sourceSection: "Andrews 21.4",
      construction: "active-voice VNC with reflexive object pronoun can express a passive notion",
      subjectRole: "patient, not agent",
      typicalSubjectAnimacy: "nonanimate, with animate subjects possible",
      currentEngineStatus: "ordinary active reflexive generation exists; passive-notion interpretation is not a separate generated voice route",
      generationPolicy: "diagnostic interpretation only until Andrews passive-notion sentence context is modeled as an interpretation layer"
    });
    const LESSON21_PASSIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson21-passive-transformation",
      andrewsSection: "21.1",
      category: "passive-transformation",
      directiveEs: "La pasiva transforma una CNV activa con objeto especifico: borra el sujeto activo, usa el tronco no activo y convierte el objeto especifico en sujeto.",
      engineSurface: "nonactive voice mode, passive subject override map, object-clearing valency frame",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson21-passive-generation-rules",
      andrewsSection: "21.2",
      category: "passive-generation-cases",
      directiveEs: "Las reglas de generacion dependen de si la fuente tiene un objeto especifico, reflexivo, dos objetos o tres objetos; el sujeto activo nunca participa.",
      engineSurface: "single-object passive subject controls plus double-object valency metadata",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson21-passive-optative-admonitive",
      andrewsSection: "21.3",
      category: "passive-sentence-moods",
      directiveEs: "Las aserciones pasivas pueden entrar en oraciones de deseo, mandato/exhortacion o admonicion; esto pertenece a capa de oracion.",
      engineSurface: "finite nonactive tense output with sentence-layer diagnostics",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson21-active-reflexive-passive-notion",
      andrewsSection: "21.4",
      category: "active-reflexive-passive-notion",
      directiveEs: "Una CNV activa reflexiva puede expresar nocion pasiva; el sujeto visible es paciente, no agente.",
      engineSurface: "active reflexive generation; passive-notion interpretation not yet modeled as sentence metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function getLesson21PassiveVoiceSubsectionInventory() {
      return LESSON21_PASSIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
      }));
    }
    function buildLesson21PassiveVoicePursuitFrame() {
      const subsectionInventory = getLesson21PassiveVoiceSubsectionInventory();
      const transformationFrame = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_TRANSFORMATION_FRAME);
      const generationCases = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_GENERATION_CASES);
      const moodFrame = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_MOOD_FRAME);
      const activeReflexivePassiveNotionFrame = cloneGenerationValencyLessonRecord(LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME);
      const remainingGaps = ["Current visible/generated voice route is still combined as passive-impersonal instead of Andrews-separate passive and impersonal contracts.", "Passive mode still needs a hard gate or redirect for nonspecific ta/te sources, which Andrews sends to impersonal voice rather than passive voice.", "Single reflexive, projective-plus-reflexive, two-projective, one-specific-plus-nonspecific, and three-object passive cases need focused engine audits against Andrews 21.2.", "Passive optative/admonitive and active-reflexive passive-notion readings remain sentence-layer diagnostics."];
      const frame = {
        kind: "lesson-21-passive-voice-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 21,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-21-passive-voice-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 21.1-21.4 against the current nonactive/passive route, object-to-subject mapping, passive generation cases, sentence-mood boundaries, and active-reflexive passive notion.",
          andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-21-passive-voice-audit",
          result: "hit",
          correction: "Lesson 21 now records the Andrews passive transform, the 21.2 case inventory, current Nawat passive-subject override support, combined passive/impersonal drift, and explicit remaining gaps before closest-pass can be claimed.",
          andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        transformationFrame,
        generationCases,
        moodFrame,
        activeReflexivePassiveNotionFrame,
        currentEngineBoundary: {
          nonactiveStemReplacementImplemented: true,
          passiveSubjectOverrideMapImplemented: true,
          activeSubjectDeletionRepresentedByNoAgentRoute: true,
          noAgentPhraseRoute: true,
          combinedPassiveImpersonalLabelStillVisible: true,
          nonspecificObjectPassiveGateMissing: true,
          reflexivePassiveWitnessNeedsAudit: true,
          doubleObjectPassiveRulesNeedAudit: true,
          activeReflexivePassiveNotionDiagnosticOnly: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return frame;
      }
      return targetObject.attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "verbal-nuclear-clause",
        metadataKind: "lesson-21-passive-voice-pursuit-frame",
        routeFamily: "generation-valency",
        routeStage: "audit-lesson-21",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 21",
        andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 21.1-21.4",
        morphBoundaryFrame: {
          transformationFrame,
          generationCases,
          moodFrame,
          activeReflexivePassiveNotionFrame
        },
        participantFrame: {
          sourceSubject: "deleted",
          promotedSourceObject: "specific projective or reflexive object, by Andrews case",
          agentPhraseAllowed: false,
          nonspecificObjectRedirect: "Andrews Lesson 22"
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sourceVoice: "active",
          targetVoice: "passive",
          formulaDependsOnSourceObjects: true
        },
        targetContract: {
          metadataKind: "lesson-21-passive-voice-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnosticStatus: "partial-audit"
      });
    }
    const LESSON22_IMPERSONAL_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON22_IMPERSONAL_PDF_REFS = Object.freeze(["Andrews Lesson 22.1", "Andrews Lesson 22.2", "Andrews Lesson 22.3", "Andrews Lesson 22.4", "Andrews Lesson 22.5", "Andrews Lesson 22.6"]);
    const LESSON22_INHERENT_IMPERSONAL_FRAME = Object.freeze({
      kind: "lesson-22-inherent-impersonal-frame",
      sourceSection: "Andrews 22.1",
      subjectReferent: "none",
      subjectPersonNumber: "third-person singular only",
      subjectSupplementable: false,
      subjectIsFictitiousButPresent: true,
      typicalSemanticDomains: Object.freeze(["meteorological events", "agentless conditions"]),
      currentEngineStatus: "not a confirmed lexical impersonal verb inventory"
    });
    const LESSON22_NONANIMATE_DISTINCTION_FRAME = Object.freeze({
      kind: "lesson-22-nonanimate-distinction-frame",
      sourceSection: "Andrews 22.2",
      sharedSurfaceLimit: "third-person singular/common-number surface",
      impersonalSubjectReferent: "no specifiable referent; cannot be supplemented",
      nonanimateSubjectReferent: "specific nonanimate entity or entities; can be supplemented",
      activeReflexivePassiveNotionLink: "Lesson 21.4 active reflexive passive-notion subjects tend to be nonanimate and specific",
      currentEngineStatus: "nonanimate subject metadata exists elsewhere; impersonal/nonanimate interpretation is not fully separated in VNC generation"
    });
    const LESSON22_IMPERSONAL_TRANSFORMATION_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-transformation-frame",
      sourceSection: "Andrews 22.3",
      sourceVoice: "active personal VNC",
      targetVoice: "impersonal VNC",
      operations: Object.freeze(["replace-active-personal-subject-with-impersonal-third-singular-subject", "replace-active-stem-with-nonactive-counterpart"]),
      activeSourceMayBeIntransitive: true,
      activeSourceMayBeTransitive: true,
      transitiveRestriction: "source must not contain a specific projective object",
      reflexiveSpecificObjectException: true,
      passiveContrast: "passive is personal because a specific patient becomes subject; impersonal has a faceless third-singular subject"
    });
    const LESSON22_IMPERSONAL_GENERATION_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-generation-frame",
      sourceSection: "Andrews 22.4",
      formulaPolicy: "use the same VNC formula as the active source",
      intransitiveSourceTargetFormula: "intransitive VNC",
      transitiveSourceTargetFormula: "transitive VNC",
      subjectPronounSource: "imported impersonal subject from outside; not generated from active source subject",
      discardedSourceSubjectRecoverable: false,
      nonspecificProjectiveObjectsPreserved: Object.freeze(["te", "tla"]),
      nawatNonspecificObjectBridge: Object.freeze([Object.freeze({
        andrews: "te",
        nawat: "te"
      }), Object.freeze({
        andrews: "tla",
        nawat: "ta"
      })]),
      reflexiveSourceUsesShuntlineWitness: "ne"
    });
    const LESSON22_IMPERSONAL_MOOD_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-mood-frame",
      sourceSection: "Andrews 22.5",
      impersonalAssertionsCanTransformTo: Object.freeze(["wish", "command/exhortation", "admonition"]),
      sentenceLayerLessons: Object.freeze(["Andrews Lesson 9", "Andrews Lesson 10"]),
      currentEngineStatus: "finite nonactive output exists; sentence-level wish/exhortation/admonition remains diagnostic"
    });
    const LESSON22_TA_IMPERSONAL_FRAME = Object.freeze({
      kind: "lesson-22-ta-impersonal-frame",
      sourceSection: "Andrews 22.6",
      derivationalPrefix: Object.freeze({
        andrews: "tla",
        nawat: "ta"
      }),
      sourceStemType: "active intransitive verbstem, usually inceptive/inchoative or stative",
      prefixRole: "derivational impersonalizer inside derived verbstem",
      notObjectPronoun: true,
      mayAttachToInherentImpersonalStem: true,
      animateGeneralSubjectLimited: true,
      currentEngineStatus: "hasImpersonalTaPrefix metadata exists, but Lesson 22.6 derivational inventory and generation are not data-complete"
    });
    const LESSON22_IMPERSONAL_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson22-inherent-impersonal-vncs",
      andrewsSection: "22.1",
      category: "inherent-impersonal-vnc",
      directiveEs: "La CNV impersonal inherente tiene sujeto ficticio de tercera singular sin referente nombrable; no puede suplementarse.",
      engineSurface: "impersonal subject diagnostics and no lexical weather-verb inventory",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson22-nonanimate-vs-impersonal",
      andrewsSection: "22.2",
      category: "nonanimate-impersonal-distinction",
      directiveEs: "No confundir sujeto no animado con sujeto impersonal: ambos pueden verse como tercera singular, pero solo el no animado tiene referente suplementable.",
      engineSurface: "clause animacy metadata plus VNC impersonal diagnostics",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson22-impersonal-voice",
      andrewsSection: "22.3",
      category: "impersonal-voice-transform",
      directiveEs: "La voz impersonal cambia el sujeto personal por uno impersonal y usa el tronco no activo; fuentes transitivas no pueden tener objeto proyectivo especifico.",
      engineSurface: "nonactive voice mode and subject/object clearing rules",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson22-impersonal-generation",
      andrewsSection: "22.4",
      category: "impersonal-generation-rules",
      directiveEs: "La CNV impersonal usa la misma formula que la fuente activa, conserva objetos inespecificos te/ta y cambia reflexivo fuente a testigo ne.",
      engineSurface: "combined passive/impersonal route plus patientive impersonal-source evidence",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson22-impersonal-optative-admonitive",
      andrewsSection: "22.5",
      category: "impersonal-sentence-moods",
      directiveEs: "Una asercion impersonal puede entrar en deseo, mandato/exhortacion o admonicion; esto pertenece a capa de oracion.",
      engineSurface: "finite nonactive output with sentence-layer diagnostics",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson22-ta-impersonal",
      andrewsSection: "22.6",
      category: "ta-impersonal-derivation",
      directiveEs: "El prefijo impersonalizador Andrews tla, Nawat ta, es derivacional dentro del tronco y no el pronombre objeto inespecifico.",
      engineSurface: "hasImpersonalTaPrefix metadata; no data-complete ta-impersonal derivation inventory",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function getLesson22ImpersonalVoiceSubsectionInventory() {
      return LESSON22_IMPERSONAL_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
      }));
    }
    function buildLesson22ImpersonalVoicePursuitFrame() {
      const subsectionInventory = getLesson22ImpersonalVoiceSubsectionInventory();
      const inherentImpersonalFrame = cloneGenerationValencyLessonRecord(LESSON22_INHERENT_IMPERSONAL_FRAME);
      const nonanimateDistinctionFrame = cloneGenerationValencyLessonRecord(LESSON22_NONANIMATE_DISTINCTION_FRAME);
      const impersonalTransformationFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_TRANSFORMATION_FRAME);
      const impersonalGenerationFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_GENERATION_FRAME);
      const moodFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_MOOD_FRAME);
      const taImpersonalFrame = cloneGenerationValencyLessonRecord(LESSON22_TA_IMPERSONAL_FRAME);
      const remainingGaps = ["Current visible/generated voice route is still combined as passive-impersonal instead of an Andrews-separate impersonal contract.", "Inherent impersonal verb inventory and nonanimate-versus-impersonal subject interpretation require modeled Andrews source classes and sentence metadata.", "Impersonal voice still needs explicit gates: permit intransitive sources and transitive sources without specific projective objects, but block or redirect specific projective-object sources to passive handling.", "Andrews 22.4 preservation of nonspecific te/ta and reflexive-source witness ne needs focused finite-CNV audit.", "Andrews 22.5 sentence moods and 22.6 derivational ta-impersonal inventory remain diagnostic or source-gated."];
      const frame = {
        kind: "lesson-22-impersonal-voice-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 22,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
        plannedArrows: [{
          id: "lesson-22-impersonal-voice-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 22.1-22.6 against current passive/impersonal voice routing, impersonal subject behavior, nonanimate distinction, source restrictions, preserved nonspecific objects, reflexive witness ne, sentence moods, and ta-impersonal derivation.",
          andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-22-impersonal-voice-audit",
          result: "hit",
          correction: "Lesson 22 now records the Andrews impersonal subject contract, nonanimate distinction, impersonal transform, 22.4 generation rules, sentence-mood boundary, ta-impersonal derivation boundary, current engine support, and explicit remaining gaps before closest-pass can be claimed.",
          andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
          feedbackRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
        }],
        subsectionInventory,
        inherentImpersonalFrame,
        nonanimateDistinctionFrame,
        impersonalTransformationFrame,
        impersonalGenerationFrame,
        moodFrame,
        taImpersonalFrame,
        currentEngineBoundary: {
          nonactiveStemReplacementImplemented: true,
          impersonalThirdSingularSubjectClearingImplemented: true,
          combinedPassiveImpersonalLabelStillVisible: true,
          hasImpersonalTaPrefixMetadataExists: true,
          inherentImpersonalLexiconMissing: true,
          nonanimateImpersonalDistinctionIncomplete: true,
          specificProjectiveObjectImpersonalGateMissing: true,
          nonspecificObjectPreservationNeedsAudit: true,
          reflexiveWitnessNeedsAudit: true,
          taImpersonalDerivationInventoryMissing: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return frame;
      }
      return targetObject.attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "verbal-nuclear-clause",
        metadataKind: "lesson-22-impersonal-voice-pursuit-frame",
        routeFamily: "generation-valency",
        routeStage: "audit-lesson-22",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 22",
        andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 22.1-22.6",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil output spelling",
          noClassicalSurfaceImport: true,
          derivationalPrefixBridge: taImpersonalFrame.derivationalPrefix,
          nonspecificObjectBridge: impersonalGenerationFrame.nawatNonspecificObjectBridge
        },
        morphBoundaryFrame: {
          impersonalTransformationFrame,
          impersonalGenerationFrame,
          taImpersonalFrame
        },
        participantFrame: {
          subjectReferent: "none",
          subjectPersonNumber: "third-person singular",
          subjectSupplementable: false,
          specificProjectiveObjectAllowed: false,
          nonspecificProjectiveObjectsPreserved: ["te", "ta"],
          reflexiveWitness: "ne"
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sourceVoice: "active",
          targetVoice: "impersonal",
          formulaPolicy: "same formula as active source",
          nonanimateContrast: nonanimateDistinctionFrame
        },
        targetContract: {
          metadataKind: "lesson-22-impersonal-voice-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnosticStatus: "partial-audit"
      });
    }
    function shouldDropBoundObjectPrefix(parsedVerb) {
      if (!parsedVerb || !parsedVerb.hasBoundMarker) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0 || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.applicative) {
        return false;
      }
      const boundPrefixes = Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes : [];
      if (!boundPrefixes.length) {
        return false;
      }
      return boundPrefixes.some(prefix => isGenerationValencyObjectOrFusionPrefix(prefix));
    }
    function shouldDropOccupiedSourceObjectPrefix(parsedVerb) {
      if (!parsedVerb || targetObject.getOccupiedLexicalSourceObjectSlots(parsedVerb) <= 0) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0) {
        return false;
      }
      return targetObject.getAvailableObjectSlots(parsedVerb) <= 0;
    }
    function isGenerationValencyObjectOrFusionPrefix(prefix = "") {
      const normalized = String(prefix || "").trim();
      if (!normalized) {
        return false;
      }
      return targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(normalized) || targetObject.OBJECT_MARKERS.has(normalized) || targetObject.FUSION_PREFIXES.has(normalized) || ["k", "ki", "kin", "nech", "metz", "tech", "mech", "te", "ta", "mu", "m", "t"].includes(normalized);
    }
    function generationValencyEntradaGrammarObjectHasValenceObjectSignal(entradaGrammarObject = null) {
      if (!entradaGrammarObject || typeof entradaGrammarObject !== "object" || String(entradaGrammarObject.kind || "") !== "andrews-entrada-grammar-object") {
        return false;
      }
      const valenceFrame = entradaGrammarObject.valenceFrame && typeof entradaGrammarObject.valenceFrame === "object" ? entradaGrammarObject.valenceFrame : {};
      const objectFrame = entradaGrammarObject.objectFrame && typeof entradaGrammarObject.objectFrame === "object" ? entradaGrammarObject.objectFrame : {};
      return Boolean(objectFrame.hasObjectSlots === true || Array.isArray(objectFrame.slots) && objectFrame.slots.length > 0 || Array.isArray(valenceFrame.slots) && valenceFrame.slots.length > 0 || Array.isArray(valenceFrame.tokens) && valenceFrame.tokens.length > 0);
    }
    function generationValencyEntradaGrammarObjectHasFixedFrame(entradaGrammarObject = null) {
      return Boolean(entradaGrammarObject && typeof entradaGrammarObject === "object" && String(entradaGrammarObject.kind || "") === "andrews-entrada-grammar-object" && (entradaGrammarObject.valenceFrame?.frameFixed === true || entradaGrammarObject.objectFrame?.frameFixed === true || entradaGrammarObject.formulaBoundaryFrame?.valenceFrameFixed === true || entradaGrammarObject.formulaBoundaryFrame?.frameFixed === true && entradaGrammarObject.formulaBoundaryFrame?.objectSlotsCovered === true));
    }
    function generationValencyFrameHasFixedValenceEvidence(frame = null) {
      if (!frame || typeof frame !== "object") {
        return false;
      }
      if (frame.frameFixed === false || frame.valenceFrameFixed === false || frame.sourceValenceFrameFixed === false) {
        return false;
      }
      return Boolean(frame.frameFixed === true || frame.valenceFrameFixed === true || frame.sourceValenceFrameFixed === true || frame.objectFrameFixed === true || frame.matrixValenceFrameFixed === true || frame.valencyFrameFixed === true || frame.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.participantFrame?.valenceFrame?.frameFixed === true || frame.participantFrame?.valenceFrame?.valenceFrameFixed === true || frame.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.incorporationRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true);
    }
    function generationValencyFrameHasValenceObjectSignal(frame = null) {
      if (!frame || typeof frame !== "object") {
        return false;
      }
      const hasSlots = (...slotLists) => slotLists.some(slots => Array.isArray(slots) && slots.length > 0);
      return Boolean(String(frame.kind || "") === "andrews-incorporation-route-frame" || String(frame.matrixValence || "").trim() || String(frame.consumedObjectSlot || "").trim() || frame.routeFrameLicensesObjectSlotOwnership === true || frame.routeFrameLicensesObjectSlotOwnership === false || hasSlots(frame.remainingExternalObjectSlots, frame.sourceExternalObjectSlots, frame.objectSlotOwnership?.remainingExternalObjectSlots, frame.objectSlotOwnership?.sourceExternalObjectSlots, frame.participantFrame?.objectSlotOwnership?.remainingExternalObjectSlots, frame.participantFrame?.objectSlotOwnership?.sourceExternalObjectSlots, frame.routeFrame?.remainingExternalObjectSlots, frame.sourceRouteFrame?.remainingExternalObjectSlots, frame.incorporationRouteFrame?.remainingExternalObjectSlots, frame.routeContract?.sourceContract?.routeFrame?.remainingExternalObjectSlots, frame.routeContract?.targetContract?.routeFrame?.remainingExternalObjectSlots, frame.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.routeContract?.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.sourceContract?.routeFrame?.remainingExternalObjectSlots, frame.targetContract?.routeFrame?.remainingExternalObjectSlots, frame.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots) || frame.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.objectSlotOwnership?.matrixValenceFrameFixed === false || frame.participantFrame?.valenceFrame || frame.participantFrame?.object || frame.routeContract?.sourceContract?.valenceFrame || frame.routeContract?.targetContract?.valenceFrame || frame.sourceContract?.valenceFrame || frame.targetContract?.valenceFrame);
    }
    function getGenerationValencyFrameCandidates(options = {}) {
      const source = options && typeof options === "object" ? options : {};
      return [source.sourceFrame, source.grammarFrame, source.frames, source.participantFrame, source.sourceRouteFrame, source.routeFrame, source.incorporationRouteFrame, source.objectSlotOwnership, source.routeContract, source.sourceContract, source.targetContract, source.grammarFrame?.participantFrame, source.grammarFrame?.routeContract, source.grammarFrame?.routeContract?.sourceContract, source.grammarFrame?.routeContract?.targetContract, source.frames?.participantFrame, source.frames?.routeContract, source.frames?.routeContract?.sourceContract, source.frames?.routeContract?.targetContract, source.routeContract?.sourceContract, source.routeContract?.targetContract].filter(candidate => candidate && typeof candidate === "object");
    }
    function resolveGenerationValencyFrameFixed(options = {}) {
      if (options.valenceFrameFixed === true || options.sourceValenceFrameFixed === true) {
        return true;
      }
      if (options.valenceFrameFixed === false || options.sourceValenceFrameFixed === false) {
        return false;
      }
      const hasEntradaGrammarObject = Boolean(options.entradaGrammarObject && typeof options.entradaGrammarObject === "object" && String(options.entradaGrammarObject.kind || "") === "andrews-entrada-grammar-object");
      if (generationValencyEntradaGrammarObjectHasValenceObjectSignal(options.entradaGrammarObject) || options.requireFixedValenceFrame === true && hasEntradaGrammarObject) {
        return generationValencyEntradaGrammarObjectHasFixedFrame(options.entradaGrammarObject);
      }
      const frameCandidates = getGenerationValencyFrameCandidates(options);
      if (frameCandidates.some(frame => generationValencyFrameHasValenceObjectSignal(frame))) {
        return frameCandidates.some(frame => generationValencyFrameHasFixedValenceEvidence(frame));
      }
      return options.requireFixedValenceFrame === true ? false : true;
    }
    function buildGenerationValencyObjectSlotMutationGate({
      operation = "",
      mutationKind = "",
      reason = "",
      sourceObj1 = "",
      sourceBaseObj1 = "",
      sourceObj2 = "",
      sourceObj3 = "",
      targetObj1 = "",
      targetBaseObj1 = "",
      targetObj2 = "",
      targetObj3 = "",
      options = {}
    } = {}) {
      const normalizedSourceObj1 = String(sourceObj1 || "");
      const normalizedSourceBaseObj1 = String(sourceBaseObj1 || "");
      const normalizedSourceObj2 = String(sourceObj2 || "");
      const normalizedSourceObj3 = String(sourceObj3 || "");
      const normalizedTargetObj1 = String(targetObj1 || "");
      const normalizedTargetBaseObj1 = String(targetBaseObj1 || "");
      const normalizedTargetObj2 = String(targetObj2 || "");
      const normalizedTargetObj3 = String(targetObj3 || "");
      const mutatesObjectSlot = normalizedSourceObj1 !== normalizedTargetObj1 || normalizedSourceBaseObj1 !== normalizedTargetBaseObj1 || normalizedSourceObj2 !== normalizedTargetObj2 || normalizedSourceObj3 !== normalizedTargetObj3;
      const entradaHasValenceObjectSignal = generationValencyEntradaGrammarObjectHasValenceObjectSignal(options.entradaGrammarObject);
      const frameCandidates = getGenerationValencyFrameCandidates(options);
      const frameHasValenceObjectSignal = frameCandidates.some(frame => generationValencyFrameHasValenceObjectSignal(frame));
      const requiresFixedValenceFrame = options.requireFixedValenceFrame === true || entradaHasValenceObjectSignal || frameHasValenceObjectSignal;
      const valenceFrameFixed = resolveGenerationValencyFrameFixed(options);
      const status = mutatesObjectSlot && requiresFixedValenceFrame && !valenceFrameFixed ? "blocked" : "pass";
      return {
        kind: "generation-valency-object-slot-mutation-gate",
        version: 1,
        operation: String(operation || ""),
        mutationKind: String(mutationKind || ""),
        status,
        diagnosticId: GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID,
        routeStage: GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE,
        reason: status === "blocked" ? "generation-valency-source-frame-unfixed" : String(reason || "generation-valency-object-slot-mutation-licensed"),
        generationAllowed: status !== "blocked",
        routeRankingAllowed: status !== "blocked",
        requiresFixedValenceFrame,
        valenceFrameFixed,
        entradaHasValenceObjectSignal,
        frameHasValenceObjectSignal,
        mutatesObjectSlot,
        sourceVector: {
          obj1: normalizedSourceObj1,
          baseObj1: normalizedSourceBaseObj1,
          obj2: normalizedSourceObj2,
          obj3: normalizedSourceObj3
        },
        targetVector: {
          obj1: normalizedTargetObj1,
          baseObj1: normalizedTargetBaseObj1,
          obj2: normalizedTargetObj2,
          obj3: normalizedTargetObj3
        },
        boundaries: {
          unresolvedValenceFrameIsHardGate: true,
          objectSlotDeletionRequiresFixedValenceFrame: true,
          objectSlotRelocationRequiresFixedValenceFrame: true,
          objectSlotReclassificationRequiresFixedValenceFrame: true,
          objectSlotCreationRequiresFixedValenceFrame: true
        }
      };
    }
    function applyBoundMarkerSlotOverrides(parsedVerb, obj1 = "", baseObj1 = "", options = {}) {
      const preserveOccupiedSourceObjectPrefix = options.preserveOccupiedSourceObjectPrefix === true;
      const dropBoundObjectPrefix = shouldDropBoundObjectPrefix(parsedVerb);
      const dropOccupiedSourceObjectPrefix = !preserveOccupiedSourceObjectPrefix && shouldDropOccupiedSourceObjectPrefix(parsedVerb);
      const shouldDrop = dropBoundObjectPrefix || dropOccupiedSourceObjectPrefix;
      const reason = dropBoundObjectPrefix ? "bound-marker-owns-object-slot" : dropOccupiedSourceObjectPrefix ? "occupied-source-object-slot" : "";
      const targetObj1 = shouldDrop ? "" : obj1;
      const targetBaseObj1 = shouldDrop ? "" : baseObj1;
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-bound-marker-slot-overrides",
        mutationKind: shouldDrop ? "delete-object-slot" : "none",
        reason,
        sourceObj1: obj1,
        sourceBaseObj1: baseObj1,
        targetObj1,
        targetBaseObj1,
        options
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          obj1,
          baseObj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      if (shouldDrop) {
        return {
          obj1: "",
          baseObj1: "",
          valencyObjectSlotGate
        };
      }
      return {
        obj1,
        baseObj1,
        valencyObjectSlotGate
      };
    }
    function applyObj1Allomorphy(input = {}) {
      const {
        verb,
        analysisVerb,
        pers1,
        pers2,
        obj1,
        obj2,
        obj3 = "",
        isTaFusion,
        isPassiveImpersonalMode,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        supportivePrecedingSurface = "",
        hasNonspecificValence = false,
        hasSlashMarker = false,
        hasBoundMarker = false,
        directionalPrefix = ""
      } = normalizeGenerationValencySlotInput(input);
      const allomorphyObjectPrefix = !isPassiveImpersonalMode && targetObject.isPers1Obj1Reflexivo(pers1, pers2, obj1) ? "mu" : obj1;
      const nonspecificAllomorphyRequest = {
        verb,
        analysisVerb,
        obj1: allomorphyObjectPrefix,
        obj2,
        obj3,
        isTaFusion,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        supportivePrecedingSurface,
        hasNonspecificValence,
        hasSlashMarker,
        hasBoundMarker,
        directionalPrefix
      };
      const nonspecificAllomorphySourceFrame = targetObject.buildNonspecificObjectAllomorphySourceFrame(nonspecificAllomorphyRequest);
      const nonspecificAllomorphyOperationFrame = targetObject.buildNonspecificObjectAllomorphyOperationFrame(nonspecificAllomorphySourceFrame);
      const nonspecificAllomorphy = targetObject.applyNonspecificObjectAllomorphy({
        ...nonspecificAllomorphyRequest,
        sourceFrame: nonspecificAllomorphySourceFrame,
        operationFrame: nonspecificAllomorphyOperationFrame
      });
      return {
        obj1: nonspecificAllomorphy.obj1 || allomorphyObjectPrefix,
        verb: nonspecificAllomorphy.verb,
        analysisVerb: nonspecificAllomorphy.analysisVerb,
        morphologyObj1: nonspecificAllomorphy.obj1 || allomorphyObjectPrefix,
        nonspecificAllomorphySourceFrame,
        nonspecificAllomorphyOperationFrame,
        soundSpellingFrames: Array.isArray(nonspecificAllomorphy.soundSpellingFrames) ? nonspecificAllomorphy.soundSpellingFrames : []
      };
    }
    function applyPassiveImpersonalSlotAdjustments(input = {}) {
      let {
        isPassiveImpersonalMode,
        verb,
        analysisVerb,
        fusionPrefixes,
        targetValency,
        pers1,
        pers2,
        obj1,
        obj2,
        obj3 = "",
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObj1,
        hasPromotableObject
      } = normalizeGenerationValencySlotInput(input);
      const sourceObj1 = obj1;
      const sourceObj2 = obj2;
      const sourceObj3 = obj3;
      const sourceMorphologyObj1 = morphologyObj1;
      if (!isPassiveImpersonalMode) {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1,
            obj2,
            obj3
          }),
          verb,
          analysisVerb,
          preserveSubjectForPassive,
          morphologyObj1
        };
      }
      const clearObjectMarkers = () => {
        obj1 = "";
        obj2 = "";
        obj3 = "";
      };
      let valencyAdjustedPrefix = false;
      const forceImpersonal = targetValency > 0 && !hasPromotableObject;
      if (forceImpersonal) {
        pers1 = "";
        pers2 = "";
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
      } else if (targetValency <= 0) {
        pers1 = "";
        pers2 = "";
        clearObjectMarkers();
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
      } else if (targetValency === 1) {
        clearObjectMarkers();
        preserveSubjectForPassive = true;
        valencyAdjustedPrefix = true;
      } else {
        preserveSubjectForPassive = true;
        if (fusionPrefixes.length && !allowPassiveObject) {
          clearObjectMarkers();
          valencyAdjustedPrefix = true;
        }
      }
      if (valencyAdjustedPrefix) {
        morphologyObj1 = obj1;
      }
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-passive-impersonal-slot-adjustments",
        mutationKind: valencyAdjustedPrefix ? "delete-object-slots" : "none",
        reason: valencyAdjustedPrefix ? "passive-impersonal-valency-adjustment" : "",
        sourceObj1,
        sourceBaseObj1: sourceMorphologyObj1 || sourceObj1,
        sourceObj2,
        sourceObj3,
        targetObj1: obj1,
        targetBaseObj1: morphologyObj1 || obj1,
        targetObj2: obj2,
        targetObj3: obj3,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1: sourceObj1,
            obj2: sourceObj2,
            obj3: sourceObj3
          }),
          verb,
          analysisVerb,
          preserveSubjectForPassive,
          morphologyObj1: sourceMorphologyObj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2,
          obj1,
          obj2,
          obj3
        }),
        verb,
        analysisVerb,
        preserveSubjectForPassive,
        morphologyObj1,
        valencyObjectSlotGate
      };
    }
    function resetPers1Pers2ForNounTenses(tense, override, pers1, pers2) {
      if (tense && typeof tense === "object") {
        const input = normalizeGenerationValencySlotInput(tense);
        const updated = resetPers1Pers2ForNounTenses(input.tiempo ?? input.tense, input.override, input.pers1, input.pers2);
        return {
          ...updated,
          ...buildGenerationValencySlotFrame({
            pers1: updated.pers1,
            pers2: updated.pers2
          })
        };
      }
      if (tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "agentivo-presente" || tense === "agentivo-preterito" || tense === "agentivo-futuro" || tense === "patientivo" || targetObject.isPredicateNominalTense(tense)) {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "pers1")) {
          pers1 = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "pers2") && !Object.prototype.hasOwnProperty.call(override || {}, "num2")) {
          pers2 = "";
        }
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2
        })
      };
    }
    function resetPers1Pers2ForNominalTiempos(input = {}) {
      return resetPers1Pers2ForNounTenses(normalizeGenerationValencySlotInput(input));
    }
    function applyPassiveImpersonalSlotOverrides(input = {}) {
      const {
        pers1,
        pers2,
        obj1,
        analysisVerb,
        preserveSubjectForPassive,
        allowPassiveObject
      } = normalizeGenerationValencySlotInput(input);
      const updated = targetObject.applyPassiveImpersonal({
        pers1,
        pers2,
        obj1,
        analysisVerb,
        preservePers1Pers2: preserveSubjectForPassive,
        allowObj1: allowPassiveObject
      });
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-passive-impersonal-slot-overrides",
        mutationKind: obj1 !== updated.obj1 ? "delete-object-slot" : "none",
        reason: obj1 !== updated.obj1 ? "passive-impersonal-slot-override" : "",
        sourceObj1: obj1,
        sourceBaseObj1: obj1,
        targetObj1: updated.obj1,
        targetBaseObj1: updated.obj1,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1
          }),
          morphologyObj1: obj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1: updated.pers1,
          pers2: updated.pers2,
          obj1: updated.obj1
        }),
        morphologyObj1: updated.obj1,
        valencyObjectSlotGate
      };
    }
    function applyReflexivoAutoSwitch(input = {}) {
      let {
        pers1,
        pers2,
        obj1,
        isPassiveImpersonal,
        clearError
      } = normalizeGenerationValencySlotInput(input);
      const sourceObj1 = obj1;
      let isReflexive = obj1 === "mu";
      let shouldClearObjectError = false;
      let mutationReason = "";
      if (!isPassiveImpersonal) {
        if (targetObject.isPers1Obj1Reflexivo(pers1, pers2, obj1)) {
          obj1 = "mu";
          isReflexive = true;
          shouldClearObjectError = true;
          mutationReason = "same-person-object-reflexive-auto-switch";
        } else if (obj1 === "mu") {
          isReflexive = true;
        }
      }
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-reflexivo-auto-switch",
        mutationKind: sourceObj1 !== obj1 ? "reclassify-object-slot-reflexive" : "none",
        reason: mutationReason,
        sourceObj1,
        sourceBaseObj1: sourceObj1,
        targetObj1: obj1,
        targetBaseObj1: obj1,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1: sourceObj1
          }),
          isReflexive: sourceObj1 === "mu",
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      if (shouldClearObjectError && clearError) {
        clearError("object-prefix");
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2,
          obj1
        }),
        isReflexive,
        valencyObjectSlotGate
      };
    }

    const api = {};
    Object.defineProperty(api, "GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID; },
    });
    Object.defineProperty(api, "GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE; },
    });
    api.normalizeGenerationValencySlotInput = normalizeGenerationValencySlotInput;
    api.buildGenerationValencySlotFrame = buildGenerationValencySlotFrame;
    Object.defineProperty(api, "VNC_VALENCE_FORMULA_SCHEMA_ID", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_FORMULA_SCHEMA_ID; },
    });
    Object.defineProperty(api, "VNC_VALENCE_TENSE_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_TENSE_SPECS; },
    });
    Object.defineProperty(api, "VNC_VALENCE_NUMBER_CONNECTOR_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_NUMBER_CONNECTOR_SPECS; },
    });
    Object.defineProperty(api, "VNC_VALENCE_MONADIC_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_MONADIC_SPECS; },
    });
    Object.defineProperty(api, "VNC_VALENCE_DYADIC_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_DYADIC_SPECS; },
    });
    Object.defineProperty(api, "VNC_VALENCE_KNOWN_FORM_INPUTS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_VALENCE_KNOWN_FORM_INPUTS; },
    });
    api.getVncValenceKnownFormInput = getVncValenceKnownFormInput;
    api.getVncValenceFormulaSchema = getVncValenceFormulaSchema;
    api.getVncValenceFormulaSlotDefinition = getVncValenceFormulaSlotDefinition;
    api.getVncValenceAndrewsLogicAuthorityPolicy = getVncValenceAndrewsLogicAuthorityPolicy;
    api.normalizeVncValenceWorkbenchRawStemForSourceFrame = normalizeVncValenceWorkbenchRawStemForSourceFrame;
    api.buildVncValenceWorkbenchSourceFrame = buildVncValenceWorkbenchSourceFrame;
    api.isVncValenceWorkbenchSourceFrame = isVncValenceWorkbenchSourceFrame;
    api.normalizeVncValenceWorkbenchStem = normalizeVncValenceWorkbenchStem;
    api.inferVncValenceWorkbenchSelection = inferVncValenceWorkbenchSelection;
    api.getVncValenceMonadicSpec = getVncValenceMonadicSpec;
    api.getVncValenceDyadicSpec = getVncValenceDyadicSpec;
    api.buildVncValenceSubjectSlot = buildVncValenceSubjectSlot;
    api.buildVncValenceTenseSlot = buildVncValenceTenseSlot;
    api.buildVncValenceNumberSlot = buildVncValenceNumberSlot;
    api.buildVncValenceObjectSlot = buildVncValenceObjectSlot;
    api.buildVncValenceFormulaSlots = buildVncValenceFormulaSlots;
    api.getVncValenceFormulaRenderOptions = getVncValenceFormulaRenderOptions;
    api.getVncValenceFormulaSlotToken = getVncValenceFormulaSlotToken;
    api.renderVncValenceFormulaTemplate = renderVncValenceFormulaTemplate;
    api.buildVncValenceFormulaEchoFromSlots = buildVncValenceFormulaEchoFromSlots;
    api.buildVncValenceFormulaWorkbenchSlotRecords = buildVncValenceFormulaWorkbenchSlotRecords;
    api.buildVncValenceExample = buildVncValenceExample;
    api.buildVncValenceFormulaWorkbenchExamples = buildVncValenceFormulaWorkbenchExamples;
    api.getVncValenceScopedSurfaceForSlots = getVncValenceScopedSurfaceForSlots;
    api.normalizeVncValenceFormulaSurfacePart = normalizeVncValenceFormulaSurfacePart;
    api.buildVncValenceAndrewsLogicTargetSegmentFrames = buildVncValenceAndrewsLogicTargetSegmentFrames;
    api.getVncValenceTargetSurfaceFromSegmentFrames = getVncValenceTargetSurfaceFromSegmentFrames;
    api.getVncValenceFormulaSlotSignature = getVncValenceFormulaSlotSignature;
    api.buildVncValenceAndrewsLogicSurfaceSourceFrame = buildVncValenceAndrewsLogicSurfaceSourceFrame;
    api.buildVncValenceAndrewsLogicSurfaceOperationFrame = buildVncValenceAndrewsLogicSurfaceOperationFrame;
    api.getVncValenceAndrewsLogicSurfaceFrameMismatch = getVncValenceAndrewsLogicSurfaceFrameMismatch;
    api.getVncValenceAndrewsLogicSurfaceForSlots = getVncValenceAndrewsLogicSurfaceForSlots;
    api.getVncValenceScopedNumberConnector = getVncValenceScopedNumberConnector;
    api.buildVncValenceFormulaWorkbenchSlice = buildVncValenceFormulaWorkbenchSlice;
    api.buildVncShellFormulaWorkbenchSlice = buildVncShellFormulaWorkbenchSlice;
    api.cloneGenerationValencyLessonRecord = cloneGenerationValencyLessonRecord;
    Object.defineProperty(api, "LESSON21_PASSIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_TRANSFORMATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_TRANSFORMATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_GENERATION_CASES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_GENERATION_CASES; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_MOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_MOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_SUBSECTION_INVENTORY; },
    });
    api.getLesson21PassiveVoiceSubsectionInventory = getLesson21PassiveVoiceSubsectionInventory;
    api.buildLesson21PassiveVoicePursuitFrame = buildLesson21PassiveVoicePursuitFrame;
    Object.defineProperty(api, "LESSON22_IMPERSONAL_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON22_INHERENT_IMPERSONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_INHERENT_IMPERSONAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_NONANIMATE_DISTINCTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_NONANIMATE_DISTINCTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_TRANSFORMATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_TRANSFORMATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_GENERATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_GENERATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_MOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_MOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_TA_IMPERSONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_TA_IMPERSONAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_SUBSECTION_INVENTORY; },
    });
    api.getLesson22ImpersonalVoiceSubsectionInventory = getLesson22ImpersonalVoiceSubsectionInventory;
    api.buildLesson22ImpersonalVoicePursuitFrame = buildLesson22ImpersonalVoicePursuitFrame;
    api.shouldDropBoundObjectPrefix = shouldDropBoundObjectPrefix;
    api.shouldDropOccupiedSourceObjectPrefix = shouldDropOccupiedSourceObjectPrefix;
    api.isGenerationValencyObjectOrFusionPrefix = isGenerationValencyObjectOrFusionPrefix;
    api.generationValencyEntradaGrammarObjectHasValenceObjectSignal = generationValencyEntradaGrammarObjectHasValenceObjectSignal;
    api.generationValencyEntradaGrammarObjectHasFixedFrame = generationValencyEntradaGrammarObjectHasFixedFrame;
    api.generationValencyFrameHasFixedValenceEvidence = generationValencyFrameHasFixedValenceEvidence;
    api.generationValencyFrameHasValenceObjectSignal = generationValencyFrameHasValenceObjectSignal;
    api.getGenerationValencyFrameCandidates = getGenerationValencyFrameCandidates;
    api.resolveGenerationValencyFrameFixed = resolveGenerationValencyFrameFixed;
    api.buildGenerationValencyObjectSlotMutationGate = buildGenerationValencyObjectSlotMutationGate;
    api.applyBoundMarkerSlotOverrides = applyBoundMarkerSlotOverrides;
    api.applyObj1Allomorphy = applyObj1Allomorphy;
    api.applyPassiveImpersonalSlotAdjustments = applyPassiveImpersonalSlotAdjustments;
    api.resetPers1Pers2ForNounTenses = resetPers1Pers2ForNounTenses;
    api.resetPers1Pers2ForNominalTiempos = resetPers1Pers2ForNominalTiempos;
    api.applyPassiveImpersonalSlotOverrides = applyPassiveImpersonalSlotOverrides;
    api.applyReflexivoAutoSwitch = applyReflexivoAutoSwitch;
    Object.defineProperty(api, "GENERATION_SOURCE_TRANSITIVITY", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_SOURCE_TRANSITIVITY; },
    });
    Object.defineProperty(api, "GENERATION_SOURCE_TRANSITIVITY_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_SOURCE_TRANSITIVITY_ORDER; },
    });
    Object.defineProperty(api, "GENERATION_SOURCE_TRANSITIVITY_ALIASES", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_SOURCE_TRANSITIVITY_ALIASES; },
    });
    Object.defineProperty(api, "GENERATION_SOURCE_SLOT_BY_TRANSITIVITY", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_SOURCE_SLOT_BY_TRANSITIVITY; },
    });
    api.normalizeGenerationSourceTransitivity = normalizeGenerationSourceTransitivity;
    api.getGenerationSourceTransitivityVocabulary = getGenerationSourceTransitivityVocabulary;
    api.validateGenerationSourceTransitivitySelection = validateGenerationSourceTransitivitySelection;
    api.validateGenerationSourceTransitivityControlInventory = validateGenerationSourceTransitivityControlInventory;
    return api;
}

export function installGenerationValencyGlobals(targetObject = globalThis) {
    const api = createGenerationValencyModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
