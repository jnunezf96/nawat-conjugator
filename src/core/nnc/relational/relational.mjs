// Native wrapper generated from src/core/nnc/relational/relational.js.

export function createRelationalNncApi(targetObject = globalThis) {
    const RELATIONAL_NNC_BOUNDARY_VERSION = 1;
    const RELATIONAL_NNC_KIND = Object.freeze({
      relationalStem: "relational-stem",
      locative: "locative",
      directional: "directional",
      frequency: "frequency",
      associatedEntity: "associated-entity",
      pertinency: "pertinency",
      unknown: "unknown"
    });
    const RELATIONAL_NNC_OPTION = Object.freeze({
      optionOne: "option-one",
      optionTwo: "option-two",
      optionThree: "option-three",
      optionFour: "option-four",
      unknown: "unknown"
    });
    const RELATIONAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      locativeTemporalNominal: "locative-temporal-nominal",
      placeTranslation: "place-translation",
      prepositionTranslation: "preposition-translation",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const RELATIONAL_NNC_ANTI_CONFLATION_RULES = Object.freeze(["relational NNC boundary metadata is not generation", "ordinary NNC fixtures are not relational NNC fixture evidence", "open-stem ordinary NNC previews are not relational nounstem data", "locative-temporal nominal outputs are not full relational NNC options", "preposition or place translations are not Nawat/Pipil relational form evidence", "Andrews relational categories are architecture, not Nawat/Pipil form authority"]);
    const RELATIONAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "relationalStem",
      asks: "Which Nawat/Pipil relational nounstem is evidenced?"
    }), Object.freeze({
      field: "relationalKind",
      asks: "Is the candidate locative, directional, frequency, associated-entity, pertinency, relational-stem, or unknown?"
    }), Object.freeze({
      field: "relationalOption",
      asks: "Which relational usage option is evidenced: one, two, three, four, or unknown?"
    }), Object.freeze({
      field: "governedArgument",
      asks: "What noun, pronoun, possessor, or clause is governed by the relational NNC?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided example supports relational status?"
    })]);
    function normalizeRelationalNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeRelationalNncKind(value = "") {
      return normalizeRelationalNncEnum(value, Object.values(RELATIONAL_NNC_KIND), RELATIONAL_NNC_KIND.unknown);
    }
    function normalizeRelationalNncOption(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "1": RELATIONAL_NNC_OPTION.optionOne,
        one: RELATIONAL_NNC_OPTION.optionOne,
        "2": RELATIONAL_NNC_OPTION.optionTwo,
        two: RELATIONAL_NNC_OPTION.optionTwo,
        "3": RELATIONAL_NNC_OPTION.optionThree,
        three: RELATIONAL_NNC_OPTION.optionThree,
        "4": RELATIONAL_NNC_OPTION.optionFour,
        four: RELATIONAL_NNC_OPTION.optionFour
      };
      return aliases[normalized] || normalizeRelationalNncEnum(normalized, Object.values(RELATIONAL_NNC_OPTION), RELATIONAL_NNC_OPTION.unknown);
    }
    function normalizeRelationalNncFalsePositiveSource(value = "") {
      return normalizeRelationalNncEnum(value, Object.values(RELATIONAL_NNC_FALSE_POSITIVE_SOURCE), RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getRelationalNncAntiConflationRules() {
      return Array.from(RELATIONAL_NNC_ANTI_CONFLATION_RULES);
    }
    function getRelationalNncStructuralQuestions() {
      return RELATIONAL_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildRelationalNncBoundaryMetadata() {
      return {
        kind: "relational-nnc-boundary",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        lessons: [45, 46, 47],
        status: "partial",
        structuralSource: "Andrews Lessons 45-47",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getRelationalNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasRelationalNncGeneration: false,
          hasStaticRelationalData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesNominalizationGeneration: false,
          changesRouteBehavior: false,
          treatsTranslationAsRelationalEvidence: false
        },
        antiConflationRules: getRelationalNncAntiConflationRules()
      };
    }
    function classifyRelationalNncCandidate({
      candidate = "",
      relationalStem = "",
      relationalKind = "",
      relationalOption = "",
      governedArgument = "",
      evidenceSource = "",
      falsePositiveSource = "",
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizeRelationalNncKind(relationalKind);
      const normalizedOption = normalizeRelationalNncOption(relationalOption);
      const normalizedFalsePositive = normalizeRelationalNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "relational-nnc-candidate-classification",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        relationalStem: String(relationalStem || ""),
        relationalKind: normalizedKind,
        relationalOption: normalizedOption,
        governedArgument: String(governedArgument || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "relational-nnc-needs-validation" : "relational-nnc-needs-nawat-evidence", normalizedKind !== RELATIONAL_NNC_KIND.unknown ? "relational-nnc-kind-recognized" : "relational-nnc-kind-unconfirmed", normalizedFalsePositive !== RELATIONAL_NNC_FALSE_POSITIVE_SOURCE.unknown ? "relational-nnc-false-positive-source" : "relational-nnc-unconfirmed"],
        boundary: buildRelationalNncBoundaryMetadata()
      };
    }
    function classifyRelationalNncFalsePositive(source = "") {
      const normalizedSource = normalizeRelationalNncFalsePositiveSource(source);
      return {
        kind: "relational-nnc-false-positive",
        version: RELATIONAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isRelationalNncEvidence: false,
        isPlaceNameEvidence: false,
        isGentilicEvidence: false,
        generationAllowed: false,
        diagnostics: ["relational-nnc-false-positive-source"],
        antiConflationRules: getRelationalNncAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "RELATIONAL_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "RELATIONAL_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_KIND; },
    });
    Object.defineProperty(api, "RELATIONAL_NNC_OPTION", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_OPTION; },
    });
    Object.defineProperty(api, "RELATIONAL_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "RELATIONAL_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "RELATIONAL_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return RELATIONAL_NNC_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeRelationalNncEnum = normalizeRelationalNncEnum;
    api.normalizeRelationalNncKind = normalizeRelationalNncKind;
    api.normalizeRelationalNncOption = normalizeRelationalNncOption;
    api.normalizeRelationalNncFalsePositiveSource = normalizeRelationalNncFalsePositiveSource;
    api.getRelationalNncAntiConflationRules = getRelationalNncAntiConflationRules;
    api.getRelationalNncStructuralQuestions = getRelationalNncStructuralQuestions;
    api.buildRelationalNncBoundaryMetadata = buildRelationalNncBoundaryMetadata;
    api.classifyRelationalNncCandidate = classifyRelationalNncCandidate;
    api.classifyRelationalNncFalsePositive = classifyRelationalNncFalsePositive;
    return api;
}

export function installRelationalNncGlobals(targetObject = globalThis) {
    const api = createRelationalNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
