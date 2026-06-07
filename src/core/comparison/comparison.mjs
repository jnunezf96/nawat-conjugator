// Native wrapper generated from src/core/comparison/comparison.js.

export function createComparisonApi(targetObject = globalThis) {
    const COMPARISON_BOUNDARY_VERSION = 1;
    const COMPARISON_RELATION = Object.freeze({
      equality: "equality",
      similarity: "similarity",
      size: "size",
      comparativeDegree: "comparative-degree",
      superlativeDegree: "superlative-degree",
      comparisonQuestion: "comparison-question",
      unknown: "unknown"
    });
    const COMPARISON_FALSE_POSITIVE_SOURCE = Object.freeze({
      adjectiveModeOutput: "adjective-mode-output",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      translationAdjective: "translation-adjective",
      comparisonTranslation: "comparison-translation",
      degreeLabel: "degree-label",
      questionLabel: "question-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPARISON_ANTI_CONFLATION_RULES = Object.freeze(["comparison boundary metadata is not generation", "adjective-like word output is not comparison syntax", "adjectival modification metadata is not similarity or comparison evidence", "degree, question, or translation labels are not Nawat/Pipil comparison forms", "single generated words do not prove equality, similarity, comparative, or superlative relations", "Andrews comparison categories are architecture, not Nawat/Pipil form authority"]);
    const COMPARISON_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "target",
      asks: "Which Nawat/Pipil item is being compared?"
    }), Object.freeze({
      field: "standard",
      asks: "Which Nawat/Pipil standard or reference item is evidenced?"
    }), Object.freeze({
      field: "comparisonRelation",
      asks: "Is the relation equality, similarity, size, comparative, superlative, comparison question, or unknown?"
    }), Object.freeze({
      field: "dimension",
      asks: "What quality, size, degree, or dimension is being compared?"
    }), Object.freeze({
      field: "marker",
      asks: "What Nawat/Pipil marker, order, or question pattern supports comparison status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports comparison?"
    })]);
    function normalizeComparisonEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComparisonRelation(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_RELATION), COMPARISON_RELATION.unknown);
    }
    function normalizeComparisonFalsePositiveSource(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_FALSE_POSITIVE_SOURCE), COMPARISON_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComparisonAntiConflationRules() {
      return Array.from(COMPARISON_ANTI_CONFLATION_RULES);
    }
    function getComparisonStructuralQuestions() {
      return COMPARISON_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildComparisonBoundaryMetadata() {
      return {
        kind: "comparison-boundary",
        version: COMPARISON_BOUNDARY_VERSION,
        lesson: 53,
        status: "partial",
        structuralSource: "Andrews Lesson 53",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getComparisonStructuralQuestions(),
        boundaries: {
          hasAdjectiveLikeWordOutputs: true,
          hasAdjectivalModificationBoundary: true,
          hasComparisonAst: false,
          hasConfirmedClauseExamples: false,
          hasStaticComparisonData: false,
          changesAdjectiveGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsAdjectiveOutputAsComparisonEvidence: false,
          treatsTranslationsAsComparisonEvidence: false
        },
        antiConflationRules: getComparisonAntiConflationRules()
      };
    }
    function classifyComparisonCandidate({
      target = "",
      standard = "",
      candidate = "",
      comparisonRelation = "",
      dimension = "",
      marker = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeComparisonRelation(comparisonRelation);
      const normalizedFalsePositive = normalizeComparisonFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "comparison-candidate-classification",
        version: COMPARISON_BOUNDARY_VERSION,
        target: String(target || ""),
        standard: String(standard || ""),
        candidate: String(candidate || ""),
        comparisonRelation: normalizedRelation,
        dimension: String(dimension || ""),
        marker: String(marker || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "comparison-needs-validation" : "comparison-needs-nawat-clause-evidence", normalizedRelation !== COMPARISON_RELATION.unknown ? "comparison-relation-recognized" : "comparison-relation-unconfirmed", normalizedFalsePositive !== COMPARISON_FALSE_POSITIVE_SOURCE.unknown ? "comparison-false-positive-source" : "comparison-unconfirmed"],
        boundary: buildComparisonBoundaryMetadata()
      };
    }
    function classifyComparisonFalsePositive(source = "") {
      const normalizedSource = normalizeComparisonFalsePositiveSource(source);
      return {
        kind: "comparison-false-positive",
        version: COMPARISON_BOUNDARY_VERSION,
        source: normalizedSource,
        isComparisonEvidence: false,
        isComparisonAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["comparison-false-positive-source"],
        antiConflationRules: getComparisonAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "COMPARISON_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPARISON_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_RELATION; },
    });
    Object.defineProperty(api, "COMPARISON_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPARISON_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPARISON_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeComparisonEnum = normalizeComparisonEnum;
    api.normalizeComparisonRelation = normalizeComparisonRelation;
    api.normalizeComparisonFalsePositiveSource = normalizeComparisonFalsePositiveSource;
    api.getComparisonAntiConflationRules = getComparisonAntiConflationRules;
    api.getComparisonStructuralQuestions = getComparisonStructuralQuestions;
    api.buildComparisonBoundaryMetadata = buildComparisonBoundaryMetadata;
    api.classifyComparisonCandidate = classifyComparisonCandidate;
    api.classifyComparisonFalsePositive = classifyComparisonFalsePositive;
    return api;
}

export function installComparisonGlobals(targetObject = globalThis) {
    const api = createComparisonApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
