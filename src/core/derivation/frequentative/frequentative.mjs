// Native wrapper generated from src/core/derivation/frequentative/frequentative.js.

export function createFrequentativeApi(targetObject = globalThis) {
    const FREQUENTATIVE_BOUNDARY_VERSION = 1;
    const FREQUENTATIVE_TYPE = Object.freeze({
      ordinary: "ordinary",
      objectPronounReduplicating: "object-pronoun-reduplicating",
      destockal: "destockal",
      uncertain: "uncertain",
      nonactive: "nonactive",
      unknown: "unknown"
    });
    const FREQUENTATIVE_REPLICATION_TARGET = Object.freeze({
      stem: "stem",
      objectPronoun: "object-pronoun",
      sourcePrefix: "source-prefix",
      nonactiveStem: "nonactive-stem",
      unknown: "unknown"
    });
    const FREQUENTATIVE_FALSE_POSITIVE_SOURCE = Object.freeze({
      genericReduplication: "generic-reduplication",
      preteritDiagnostic: "preterit-diagnostic",
      ordinaryNncDistributive: "ordinary-nnc-distributive",
      patientiveAdjectival: "patientive-adjectival",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const FREQUENTATIVE_ANTI_CONFLATION_RULES = Object.freeze(["frequentative boundary metadata is not generation", "generic reduplication is not a frequentative derivation engine", "preterit reduplication diagnostics are not frequentative evidence", "ordinary NNC distributive reduplication is not VNC frequentative derivation", "patientive/adjectival reduplication is not VNC frequentative derivation", "Andrews frequentative categories are architecture, not Nawat/Pipil form authority"]);
    const FREQUENTATIVE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "sourceStem",
      asks: "Which VNC stem is the source of the frequentative candidate?"
    }), Object.freeze({
      field: "frequentativeType",
      asks: "Is the candidate ordinary, object-pronoun-reduplicating, destockal, uncertain, nonactive, or unknown?"
    }), Object.freeze({
      field: "reduplicationTarget",
      asks: "Does reduplication target the stem, object pronoun, source prefix, nonactive stem, or an unknown position?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided evidence supports the form?"
    })]);
    function normalizeFrequentativeEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeFrequentativeType(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_TYPE), FREQUENTATIVE_TYPE.unknown);
    }
    function normalizeFrequentativeReplicationTarget(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_REPLICATION_TARGET), FREQUENTATIVE_REPLICATION_TARGET.unknown);
    }
    function normalizeFrequentativeFalsePositiveSource(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_FALSE_POSITIVE_SOURCE), FREQUENTATIVE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getFrequentativeAntiConflationRules() {
      return Array.from(FREQUENTATIVE_ANTI_CONFLATION_RULES);
    }
    function getFrequentativeStructuralQuestions() {
      return FREQUENTATIVE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildFrequentativeBoundaryMetadata() {
      return {
        kind: "frequentative-boundary",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        lesson: 27,
        status: "partial",
        structuralSource: "Andrews Lesson 27",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getFrequentativeStructuralQuestions(),
        boundaries: {
          hasFrequentativeGeneration: false,
          hasConfirmedFixtureData: false,
          reusesGenericReduplicationAsEvidence: false,
          changesExistingReduplicationHelpers: false,
          changesVncGeneration: false
        },
        antiConflationRules: getFrequentativeAntiConflationRules()
      };
    }
    function classifyFrequentativeCandidate({
      sourceStem = "",
      candidate = "",
      frequentativeType = "",
      reduplicationTarget = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedType = normalizeFrequentativeType(frequentativeType);
      const normalizedTarget = normalizeFrequentativeReplicationTarget(reduplicationTarget);
      const normalizedFalsePositive = normalizeFrequentativeFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "frequentative-candidate-classification",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        frequentativeType: normalizedType,
        reduplicationTarget: normalizedTarget,
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "frequentative-needs-validation" : "frequentative-needs-nawat-evidence", normalizedFalsePositive !== FREQUENTATIVE_FALSE_POSITIVE_SOURCE.unknown ? "frequentative-false-positive-source" : "frequentative-unconfirmed"],
        boundary: buildFrequentativeBoundaryMetadata()
      };
    }
    function classifyFrequentativeFalsePositive(source = "") {
      const normalizedSource = normalizeFrequentativeFalsePositiveSource(source);
      return {
        kind: "frequentative-false-positive",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        source: normalizedSource,
        isFrequentativeEvidence: false,
        generationAllowed: false,
        diagnostics: ["frequentative-false-positive-source"],
        antiConflationRules: getFrequentativeAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "FREQUENTATIVE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_TYPE; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_REPLICATION_TARGET", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_REPLICATION_TARGET; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeFrequentativeEnum = normalizeFrequentativeEnum;
    api.normalizeFrequentativeType = normalizeFrequentativeType;
    api.normalizeFrequentativeReplicationTarget = normalizeFrequentativeReplicationTarget;
    api.normalizeFrequentativeFalsePositiveSource = normalizeFrequentativeFalsePositiveSource;
    api.getFrequentativeAntiConflationRules = getFrequentativeAntiConflationRules;
    api.getFrequentativeStructuralQuestions = getFrequentativeStructuralQuestions;
    api.buildFrequentativeBoundaryMetadata = buildFrequentativeBoundaryMetadata;
    api.classifyFrequentativeCandidate = classifyFrequentativeCandidate;
    api.classifyFrequentativeFalsePositive = classifyFrequentativeFalsePositive;
    return api;
}

export function installFrequentativeGlobals(targetObject = globalThis) {
    const api = createFrequentativeApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
