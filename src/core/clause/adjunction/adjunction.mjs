// Native wrapper generated from src/core/clause/adjunction/adjunction.js.

export function createAdverbialAdjunctionApi(targetObject = globalThis) {
    const ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION = 1;
    const ADVERBIAL_ADJUNCTION_RELATION = Object.freeze({
      time: "time",
      place: "place",
      manner: "manner",
      consideration: "consideration",
      purpose: "purpose",
      concession: "concession",
      consequence: "consequence",
      proviso: "proviso",
      reason: "reason",
      recursive: "recursive",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_UNIT = Object.freeze({
      nnc: "nnc",
      vnc: "vnc",
      particle: "particle",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE = Object.freeze({
      legacyAdverbioSurface: "legacy-adverbio-surface",
      adverbialNuclearBoundary: "adverbial-nuclear-boundary",
      relationalNncBoundary: "relational-nnc-boundary",
      placeGentilicBoundary: "place-gentilic-boundary",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      particleLabel: "particle-label",
      routeLabel: "route-label",
      translationLabel: "translation-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES = Object.freeze(["adverbial-adjunction boundary metadata is not generation", "legacy adverbio word output is not a clause-adjunction AST", "adverbial nuclear-clause metadata is not recursive adverbial adjunction", "relational and place/gentilic boundary metadata are not adjoined-clause evidence", "single generated NNC or VNC words do not prove adjoined-unit relations", "translations for time, place, manner, purpose, reason, or condition are not Nawat/Pipil clause evidence", "Andrews adverbial-adjunction categories are architecture, not Nawat/Pipil form authority"]);
    const ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Nawat/Pipil principal clause or sentence hosts the adjoined unit?"
    }), Object.freeze({
      field: "adjoinedUnit",
      asks: "Which NNC, VNC, particle-looking form, clause, or sentence is adjoined?"
    }), Object.freeze({
      field: "semanticRelation",
      asks: "Is the relation time, place, manner, consideration, purpose, concession, consequence, proviso, reason, recursive, or unknown?"
    }), Object.freeze({
      field: "adjoinedUnitType",
      asks: "Is the adjoined unit an NNC, VNC, particle, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "marking",
      asks: "What marker, order, scope, or discontinuity evidence supports adjoined status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports adverbial adjunction?"
    })]);
    function normalizeAdverbialAdjunctionEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdverbialAdjunctionRelation(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_RELATION), ADVERBIAL_ADJUNCTION_RELATION.unknown);
    }
    function normalizeAdverbialAdjunctionUnit(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_UNIT), ADVERBIAL_ADJUNCTION_UNIT.unknown);
    }
    function normalizeAdverbialAdjunctionFalsePositiveSource(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE), ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getAdverbialAdjunctionAntiConflationRules() {
      return Array.from(ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES);
    }
    function getAdverbialAdjunctionStructuralQuestions() {
      return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildAdverbialAdjunctionBoundaryMetadata() {
      return {
        kind: "adverbial-adjunction-boundary",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        lessons: [49, 50],
        status: "partial",
        structuralSource: "Andrews Lessons 49-50",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdverbialAdjunctionStructuralQuestions(),
        boundaries: {
          hasLegacyAdverbioSurface: true,
          hasAdverbialNuclearBoundary: true,
          hasRelationalNncBoundary: true,
          hasPlaceGentilicBoundary: true,
          hasClauseAdjunctionAst: false,
          hasConfirmedClauseExamples: false,
          hasStaticAdjunctionData: false,
          changesAdverbioGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          changesRouteBehavior: false,
          treatsSingleGeneratedWordAsAdjunctionEvidence: false,
          treatsTranslationAsAdjunctionEvidence: false
        },
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules()
      };
    }
    function classifyAdverbialAdjunctionCandidate({
      principalClause = "",
      adjoinedUnit = "",
      candidate = "",
      semanticRelation = "",
      adjoinedUnitType = "",
      marking = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
      const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
      const normalizedFalsePositive = normalizeAdverbialAdjunctionFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adverbial-adjunction-candidate-classification",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        adjoinedUnit: String(adjoinedUnit || ""),
        candidate: String(candidate || ""),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        marking: String(marking || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adverbial-adjunction-needs-validation" : "adverbial-adjunction-needs-nawat-clause-evidence", normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown ? "adverbial-adjunction-relation-recognized" : "adverbial-adjunction-relation-unconfirmed", normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown ? "adverbial-adjunction-unit-recognized" : "adverbial-adjunction-unit-unconfirmed", normalizedFalsePositive !== ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown ? "adverbial-adjunction-false-positive-source" : "adverbial-adjunction-unconfirmed"],
        boundary: buildAdverbialAdjunctionBoundaryMetadata()
      };
    }
    function classifyAdverbialAdjunctionFalsePositive(source = "") {
      const normalizedSource = normalizeAdverbialAdjunctionFalsePositiveSource(source);
      return {
        kind: "adverbial-adjunction-false-positive",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialAdjunctionEvidence: false,
        isClauseAdjunctionAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-adjunction-false-positive-source"],
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_RELATION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_UNIT; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdverbialAdjunctionEnum = normalizeAdverbialAdjunctionEnum;
    api.normalizeAdverbialAdjunctionRelation = normalizeAdverbialAdjunctionRelation;
    api.normalizeAdverbialAdjunctionUnit = normalizeAdverbialAdjunctionUnit;
    api.normalizeAdverbialAdjunctionFalsePositiveSource = normalizeAdverbialAdjunctionFalsePositiveSource;
    api.getAdverbialAdjunctionAntiConflationRules = getAdverbialAdjunctionAntiConflationRules;
    api.getAdverbialAdjunctionStructuralQuestions = getAdverbialAdjunctionStructuralQuestions;
    api.buildAdverbialAdjunctionBoundaryMetadata = buildAdverbialAdjunctionBoundaryMetadata;
    api.classifyAdverbialAdjunctionCandidate = classifyAdverbialAdjunctionCandidate;
    api.classifyAdverbialAdjunctionFalsePositive = classifyAdverbialAdjunctionFalsePositive;
    return api;
}

export function installAdverbialAdjunctionGlobals(targetObject = globalThis) {
    const api = createAdverbialAdjunctionApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
