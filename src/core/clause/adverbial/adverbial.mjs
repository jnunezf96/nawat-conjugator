// Native wrapper generated from src/core/clause/adverbial/adverbial.js.

export function createAdverbialNuclearApi(targetObject = globalThis) {
    const ADVERBIAL_NUCLEAR_BOUNDARY_VERSION = 1;
    const ADVERBIAL_NUCLEAR_KIND = Object.freeze({
      vncAdverbial: "vnc-adverbial",
      nncAdverbial: "nnc-adverbial",
      particleLookingNnc: "particle-looking-nnc",
      possessiveStateNnc: "possessive-state-nnc",
      mannerSurface: "manner-surface",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE = Object.freeze({
      legacyAdverbioSurface: "legacy-adverbio-surface",
      adverbTranslation: "adverb-translation",
      particleLabel: "particle-label",
      ordinaryNncOutput: "ordinary-nnc-output",
      ordinaryVncOutput: "ordinary-vnc-output",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES = Object.freeze(["adverbial nuclear-clause boundary metadata is not generation", "legacy adverbio word output is not a full Lesson 44 engine", "adverb translations are not Nawat/Pipil adverbial-clause evidence", "particle-looking labels are not particle or adverbial NNC fixture evidence", "ordinary NNC/VNC outputs are not clause-level adverbialization evidence", "Andrews adverbial categories are architecture, not Nawat/Pipil form authority"]);
    const ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "source",
      asks: "Which Nawat/Pipil VNC, NNC, particle-looking form, or clause is the source?"
    }), Object.freeze({
      field: "adverbialKind",
      asks: "Is the candidate VNC-adverbial, NNC-adverbial, particle-looking NNC, possessive-state NNC, manner surface, or unknown?"
    }), Object.freeze({
      field: "adverbialDegree",
      asks: "What evidence supports first-degree, second-degree, lexicalized, or other adverbialization status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause/form evidence supports adverbial status?"
    })]);
    function normalizeAdverbialNuclearEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdverbialNuclearKind(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_KIND), ADVERBIAL_NUCLEAR_KIND.unknown);
    }
    function normalizeAdverbialNuclearFalsePositiveSource(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE), ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getKnownLegacyAdverbioTensesForAdverbialBoundary() {
      return ["pasado-remoto-adverbio-activo"];
    }
    function getAdverbialNuclearAntiConflationRules() {
      return Array.from(ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES);
    }
    function getAdverbialNuclearStructuralQuestions() {
      return ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildAdverbialNuclearBoundaryMetadata() {
      return {
        kind: "adverbial-nuclear-boundary",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        lesson: 44,
        status: "partial",
        structuralSource: "Andrews Lesson 44",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        knownLegacyAdverbioTenses: getKnownLegacyAdverbioTensesForAdverbialBoundary(),
        structuralQuestions: getAdverbialNuclearStructuralQuestions(),
        boundaries: {
          hasLegacyAdverbioSurface: true,
          hasAdverbialNuclearClauseEngine: false,
          hasAdverbialNncGeneration: false,
          hasAdverbialVncGeneration: false,
          hasStaticAdverbialData: false,
          changesAdverbioGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsLegacyAdverbioSurfaceAsFullLesson44Evidence: false
        },
        antiConflationRules: getAdverbialNuclearAntiConflationRules()
      };
    }
    function classifyAdverbialNuclearCandidate({
      source = "",
      candidate = "",
      tense = "",
      adverbialKind = "",
      adverbialDegree = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedKind = normalizeAdverbialNuclearKind(adverbialKind);
      const normalizedFalsePositive = normalizeAdverbialNuclearFalsePositiveSource(falsePositiveSource);
      const normalizedTense = String(tense || "").trim();
      const hasKnownLegacyAdverbioTense = getKnownLegacyAdverbioTensesForAdverbialBoundary().includes(normalizedTense);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adverbial-nuclear-candidate-classification",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: String(source || ""),
        candidate: String(candidate || ""),
        tense: normalizedTense,
        hasKnownLegacyAdverbioTense,
        adverbialKind: normalizedKind,
        adverbialDegree: String(adverbialDegree || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adverbial-nuclear-needs-validation" : "adverbial-nuclear-needs-nawat-evidence", hasKnownLegacyAdverbioTense ? "legacy-adverbio-surface-recognized" : "legacy-adverbio-surface-unconfirmed", normalizedFalsePositive !== ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown ? "adverbial-nuclear-false-positive-source" : "adverbial-nuclear-unconfirmed"],
        boundary: buildAdverbialNuclearBoundaryMetadata()
      };
    }
    function classifyAdverbialNuclearFalsePositive(source = "") {
      const normalizedSource = normalizeAdverbialNuclearFalsePositiveSource(source);
      return {
        kind: "adverbial-nuclear-false-positive",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialNuclearEvidence: false,
        isAdverbialNncEvidence: false,
        isAdverbialVncEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-nuclear-false-positive-source"],
        antiConflationRules: getAdverbialNuclearAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_KIND; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdverbialNuclearEnum = normalizeAdverbialNuclearEnum;
    api.normalizeAdverbialNuclearKind = normalizeAdverbialNuclearKind;
    api.normalizeAdverbialNuclearFalsePositiveSource = normalizeAdverbialNuclearFalsePositiveSource;
    api.getKnownLegacyAdverbioTensesForAdverbialBoundary = getKnownLegacyAdverbioTensesForAdverbialBoundary;
    api.getAdverbialNuclearAntiConflationRules = getAdverbialNuclearAntiConflationRules;
    api.getAdverbialNuclearStructuralQuestions = getAdverbialNuclearStructuralQuestions;
    api.buildAdverbialNuclearBoundaryMetadata = buildAdverbialNuclearBoundaryMetadata;
    api.classifyAdverbialNuclearCandidate = classifyAdverbialNuclearCandidate;
    api.classifyAdverbialNuclearFalsePositive = classifyAdverbialNuclearFalsePositive;
    return api;
}

export function installAdverbialNuclearGlobals(targetObject = globalThis) {
    const api = createAdverbialNuclearApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
