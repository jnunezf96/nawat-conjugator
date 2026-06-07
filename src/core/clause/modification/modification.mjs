// Native wrapper generated from src/core/clause/modification/modification.js.

export function createAdjectivalModificationApi(targetObject = globalThis) {
    const ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION = 1;
    const ADJECTIVAL_MODIFICATION_RELATION = Object.freeze({
      predicateFunction: "predicate-function",
      attributiveModifier: "attributive-modifier",
      clauseModifier: "clause-modifier",
      supplementationAmbiguous: "supplementation-ambiguous",
      unknown: "unknown"
    });
    const ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE = Object.freeze({
      adjectiveModeOutput: "adjective-mode-output",
      nominalizationProfile: "nominalization-profile",
      ordinaryNncFormulaSlots: "ordinary-nnc-formula-slots",
      translationAdjective: "translation-adjective",
      singleGeneratedWord: "single-generated-word",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES = Object.freeze(["adjectival modification boundary metadata is not generation", "adjetivo route output is not a clause-level modification AST", "nominalizationProfile is not adjectival modification syntax", "ordinary NNC formulaSlots are not modifier/head relation metadata", "single generated words do not prove modification, supplementation, or topic relations", "Andrews modification categories are architecture, not Nawat/Pipil form authority"]);
    const ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "head",
      asks: "Which Nawat/Pipil clause, nucleus, or phrase is modified?"
    }), Object.freeze({
      field: "modifier",
      asks: "Which NNC, VNC, or clause functions as the modifier?"
    }), Object.freeze({
      field: "relation",
      asks: "Is the relation predicate function, attributive modifier, clause modifier, supplementation-ambiguous, or unknown?"
    }), Object.freeze({
      field: "order",
      asks: "What evidence supports modifier/head order, marking, discontinuity, or recursion?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports modification status?"
    })]);
    function normalizeAdjectivalModificationEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdjectivalModificationRelation(value = "") {
      return normalizeAdjectivalModificationEnum(value, Object.values(ADJECTIVAL_MODIFICATION_RELATION), ADJECTIVAL_MODIFICATION_RELATION.unknown);
    }
    function normalizeAdjectivalModificationFalsePositiveSource(value = "") {
      return normalizeAdjectivalModificationEnum(value, Object.values(ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE), ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getAdjectivalModificationAntiConflationRules() {
      return Array.from(ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES);
    }
    function getAdjectivalModificationStructuralQuestions() {
      return ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildAdjectivalModificationBoundaryMetadata() {
      return {
        kind: "adjectival-modification-boundary",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        lessons: [42, 43],
        status: "partial",
        structuralSource: "Andrews Lessons 42-43",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdjectivalModificationStructuralQuestions(),
        boundaries: {
          hasAdjectiveLikeWordOutputs: true,
          hasNominalizationProfileMetadata: true,
          hasModificationAst: false,
          hasConfirmedClauseExamples: false,
          changesAdjectiveGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsSingleGeneratedWordAsModificationEvidence: false
        },
        antiConflationRules: getAdjectivalModificationAntiConflationRules()
      };
    }
    function classifyAdjectivalModificationCandidate({
      head = "",
      modifier = "",
      candidate = "",
      relation = "",
      order = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeAdjectivalModificationRelation(relation);
      const normalizedFalsePositive = normalizeAdjectivalModificationFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adjectival-modification-candidate-classification",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        head: String(head || ""),
        modifier: String(modifier || ""),
        candidate: String(candidate || ""),
        relation: normalizedRelation,
        order: String(order || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adjectival-modification-needs-validation" : "adjectival-modification-needs-nawat-clause-evidence", normalizedRelation !== ADJECTIVAL_MODIFICATION_RELATION.unknown ? "adjectival-modification-relation-recognized" : "adjectival-modification-relation-unconfirmed", normalizedFalsePositive !== ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE.unknown ? "adjectival-modification-false-positive-source" : "adjectival-modification-unconfirmed"],
        boundary: buildAdjectivalModificationBoundaryMetadata()
      };
    }
    function classifyAdjectivalModificationFalsePositive(source = "") {
      const normalizedSource = normalizeAdjectivalModificationFalsePositiveSource(source);
      return {
        kind: "adjectival-modification-false-positive",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        source: normalizedSource,
        isModificationEvidence: false,
        isSupplementationEvidence: false,
        isTopicEvidence: false,
        generationAllowed: false,
        diagnostics: ["adjectival-modification-false-positive-source"],
        antiConflationRules: getAdjectivalModificationAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_MODIFICATION_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_MODIFICATION_RELATION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdjectivalModificationEnum = normalizeAdjectivalModificationEnum;
    api.normalizeAdjectivalModificationRelation = normalizeAdjectivalModificationRelation;
    api.normalizeAdjectivalModificationFalsePositiveSource = normalizeAdjectivalModificationFalsePositiveSource;
    api.getAdjectivalModificationAntiConflationRules = getAdjectivalModificationAntiConflationRules;
    api.getAdjectivalModificationStructuralQuestions = getAdjectivalModificationStructuralQuestions;
    api.buildAdjectivalModificationBoundaryMetadata = buildAdjectivalModificationBoundaryMetadata;
    api.classifyAdjectivalModificationCandidate = classifyAdjectivalModificationCandidate;
    api.classifyAdjectivalModificationFalsePositive = classifyAdjectivalModificationFalsePositive;
    return api;
}

export function installAdjectivalModificationGlobals(targetObject = globalThis) {
    const api = createAdjectivalModificationApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
