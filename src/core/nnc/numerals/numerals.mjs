// Native wrapper generated from src/core/nnc/numerals/numerals.js.

export function createNumeralNncApi(targetObject = globalThis) {
    const NUMERAL_NNC_BOUNDARY_VERSION = 1;
    const NUMERAL_NNC_KIND = Object.freeze({
      cardinal: "cardinal",
      ordinal: "ordinal",
      vigesimal: "vigesimal",
      numeralNnc: "numeral-nnc",
      numberLexeme: "number-lexeme",
      unknown: "unknown"
    });
    const NUMERAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      uiNumberLabel: "ui-number-label",
      appendixHeading: "appendix-heading",
      translationLabel: "translation-label",
      parserToken: "parser-token",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const NUMERAL_NNC_ANTI_CONFLATION_RULES = Object.freeze(["numeral NNC boundary metadata is not generation", "ordinary NNC open-stem output is not numeral NNC fixture evidence", "UI number labels are not Nawat/Pipil numeral data", "Appendix D headings are not fixture cells", "English or Spanish number translations are not Nawat/Pipil form evidence", "Andrews numeral categories are architecture, not Nawat/Pipil form authority"]);
    const NUMERAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "numeralBase",
      asks: "Which Nawat/Pipil numeral base or number lexeme is evidenced?"
    }), Object.freeze({
      field: "numeralKind",
      asks: "Is the candidate cardinal, ordinal, vigesimal, numeral-NNC, number lexeme, or unknown?"
    }), Object.freeze({
      field: "nncRole",
      asks: "How does the numeral participate in an NNC rather than an ordinary nounstem preview?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided data supports the numeral form?"
    })]);
    function normalizeNumeralNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeNumeralNncKind(value = "") {
      return normalizeNumeralNncEnum(value, Object.values(NUMERAL_NNC_KIND), NUMERAL_NNC_KIND.unknown);
    }
    function normalizeNumeralNncFalsePositiveSource(value = "") {
      return normalizeNumeralNncEnum(value, Object.values(NUMERAL_NNC_FALSE_POSITIVE_SOURCE), NUMERAL_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getNumeralNncAntiConflationRules() {
      return Array.from(NUMERAL_NNC_ANTI_CONFLATION_RULES);
    }
    function getNumeralNncStructuralQuestions() {
      return NUMERAL_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachNumeralNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "numeral-nnc",
        routeFamily: "numeral-nnc",
        ...options
      });
    }
    function buildNumeralNncBoundaryMetadata() {
      const boundary = {
        kind: "numeral-nnc-boundary",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        lesson: 34,
        appendices: ["D"],
        status: "partial",
        structuralSource: "Andrews Lesson 34 and Appendix D",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getNumeralNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasNumeralNncGeneration: false,
          hasStaticNumberData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesNncFormulaSlots: false,
          treatsUiNumberLabelsAsEvidence: false
        },
        antiConflationRules: getNumeralNncAntiConflationRules()
      };
      return attachNumeralNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyNumeralNncCandidate({
      candidate = "",
      numeralBase = "",
      numeralKind = "",
      nncRole = "",
      evidenceSource = "",
      falsePositiveSource = "",
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizeNumeralNncKind(numeralKind);
      const normalizedFalsePositive = normalizeNumeralNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "numeral-nnc-candidate-classification",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        numeralBase: String(numeralBase || ""),
        numeralKind: normalizedKind,
        nncRole: String(nncRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "numeral-nnc-needs-validation" : "numeral-nnc-needs-nawat-evidence", normalizedKind !== NUMERAL_NNC_KIND.unknown ? "numeral-nnc-category-recognized" : "numeral-nnc-category-unconfirmed", normalizedFalsePositive !== NUMERAL_NNC_FALSE_POSITIVE_SOURCE.unknown ? "numeral-nnc-false-positive-source" : "numeral-nnc-unconfirmed"],
        boundary: buildNumeralNncBoundaryMetadata()
      };
      return attachNumeralNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.numeralBase,
        supported: false,
        morphBoundaryFrame: classification.boundary
      });
    }
    function classifyNumeralNncFalsePositive(source = "") {
      const normalizedSource = normalizeNumeralNncFalsePositiveSource(source);
      const classification = {
        kind: "numeral-nnc-false-positive",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isNumeralNncEvidence: false,
        isNumberLexemeEvidence: false,
        generationAllowed: false,
        diagnostics: ["numeral-nnc-false-positive-source"],
        antiConflationRules: getNumeralNncAntiConflationRules()
      };
      return attachNumeralNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "NUMERAL_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_KIND; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeNumeralNncEnum = normalizeNumeralNncEnum;
    api.normalizeNumeralNncKind = normalizeNumeralNncKind;
    api.normalizeNumeralNncFalsePositiveSource = normalizeNumeralNncFalsePositiveSource;
    api.getNumeralNncAntiConflationRules = getNumeralNncAntiConflationRules;
    api.getNumeralNncStructuralQuestions = getNumeralNncStructuralQuestions;
    api.attachNumeralNncGrammarContract = attachNumeralNncGrammarContract;
    api.buildNumeralNncBoundaryMetadata = buildNumeralNncBoundaryMetadata;
    api.classifyNumeralNncCandidate = classifyNumeralNncCandidate;
    api.classifyNumeralNncFalsePositive = classifyNumeralNncFalsePositive;
    return api;
}

export function installNumeralNncGlobals(targetObject = globalThis) {
    const api = createNumeralNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
