// Native wrapper generated from src/core/clause/conjunction/conjunction.js.

export function createConjunctionClauseApi(targetObject = globalThis) {
    const CONJUNCTION_CLAUSE_BOUNDARY_VERSION = 1;
    const CONJUNCTION_CLAUSE_RELATION = Object.freeze({
      marked: "marked",
      unmarked: "unmarked",
      correlative: "correlative",
      parallelStructure: "parallel-structure",
      lexicalInnovation: "lexical-innovation",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_UNIT = Object.freeze({
      word: "word",
      nnc: "nnc",
      vnc: "vnc",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
      parserSeparator: "parser-separator",
      slashVariant: "slash-variant",
      csvVariant: "csv-variant",
      particleLabel: "particle-label",
      conjunctionTranslation: "conjunction-translation",
      routeLabel: "route-label",
      singleGeneratedWord: "single-generated-word",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["conjunction boundary metadata is not generation", "parser separators and slash variants are not conjunction AST evidence", "CSV alternants are not clause-level conjunction evidence", "particle or translation labels are not Nawat/Pipil conjunction evidence", "single generated words do not prove marked, unmarked, correlative, or parallel conjunction", "Andrews conjunction categories are architecture, not Nawat/Pipil form authority"]);
    const CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "conjuncts",
      asks: "Which Nawat/Pipil words, NNCs, VNCs, clauses, or sentences are conjoined?"
    }), Object.freeze({
      field: "marker",
      asks: "What Nawat/Pipil marker or lack of marker is evidenced?"
    }), Object.freeze({
      field: "conjunctionRelation",
      asks: "Is the relation marked, unmarked, correlative, parallel, lexicalized, or unknown?"
    }), Object.freeze({
      field: "unitType",
      asks: "Are the conjuncts words, NNCs, VNCs, clauses, sentences, or unknown?"
    }), Object.freeze({
      field: "parallelism",
      asks: "What evidence supports parallel structure or lexical innovation by conjunction?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports conjunction?"
    })]);
    function normalizeConjunctionClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeConjunctionClauseRelation(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_RELATION), CONJUNCTION_CLAUSE_RELATION.unknown);
    }
    function normalizeConjunctionClauseUnit(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_UNIT), CONJUNCTION_CLAUSE_UNIT.unknown);
    }
    function normalizeConjunctionClauseFalsePositiveSource(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE), CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getConjunctionClauseAntiConflationRules() {
      return Array.from(CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES);
    }
    function getConjunctionClauseStructuralQuestions() {
      return CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildConjunctionClauseBoundaryMetadata() {
      return {
        kind: "conjunction-clause-boundary",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        status: "partial",
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getConjunctionClauseStructuralQuestions(),
        boundaries: {
          hasParserSeparators: true,
          hasConjunctionAst: false,
          hasConfirmedClauseExamples: false,
          hasStaticConjunctionData: false,
          changesParserBehavior: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesRouteBehavior: false,
          treatsParserSeparatorsAsConjunctionEvidence: false,
          treatsTranslationsAsConjunctionEvidence: false
        },
        antiConflationRules: getConjunctionClauseAntiConflationRules()
      };
    }
    function classifyConjunctionClauseCandidate({
      conjuncts = [],
      marker = "",
      candidate = "",
      conjunctionRelation = "",
      unitType = "",
      parallelism = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeConjunctionClauseRelation(conjunctionRelation);
      const normalizedUnit = normalizeConjunctionClauseUnit(unitType);
      const normalizedFalsePositive = normalizeConjunctionClauseFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const normalizedConjuncts = Array.isArray(conjuncts) ? conjuncts.map(conjunct => String(conjunct || "")) : [String(conjuncts || "")].filter(Boolean);
      return {
        kind: "conjunction-clause-candidate-classification",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        conjuncts: normalizedConjuncts,
        marker: String(marker || ""),
        candidate: String(candidate || ""),
        conjunctionRelation: normalizedRelation,
        unitType: normalizedUnit,
        parallelism: String(parallelism || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "conjunction-clause-needs-validation" : "conjunction-clause-needs-nawat-clause-evidence", normalizedRelation !== CONJUNCTION_CLAUSE_RELATION.unknown ? "conjunction-clause-relation-recognized" : "conjunction-clause-relation-unconfirmed", normalizedUnit !== CONJUNCTION_CLAUSE_UNIT.unknown ? "conjunction-clause-unit-recognized" : "conjunction-clause-unit-unconfirmed", normalizedFalsePositive !== CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE.unknown ? "conjunction-clause-false-positive-source" : "conjunction-clause-unconfirmed"],
        boundary: buildConjunctionClauseBoundaryMetadata()
      };
    }
    function classifyConjunctionClauseFalsePositive(source = "") {
      const normalizedSource = normalizeConjunctionClauseFalsePositiveSource(source);
      return {
        kind: "conjunction-clause-false-positive",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        source: normalizedSource,
        isConjunctionEvidence: false,
        isConjunctionAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["conjunction-clause-false-positive-source"],
        antiConflationRules: getConjunctionClauseAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_RELATION; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_UNIT; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeConjunctionClauseEnum = normalizeConjunctionClauseEnum;
    api.normalizeConjunctionClauseRelation = normalizeConjunctionClauseRelation;
    api.normalizeConjunctionClauseUnit = normalizeConjunctionClauseUnit;
    api.normalizeConjunctionClauseFalsePositiveSource = normalizeConjunctionClauseFalsePositiveSource;
    api.getConjunctionClauseAntiConflationRules = getConjunctionClauseAntiConflationRules;
    api.getConjunctionClauseStructuralQuestions = getConjunctionClauseStructuralQuestions;
    api.buildConjunctionClauseBoundaryMetadata = buildConjunctionClauseBoundaryMetadata;
    api.classifyConjunctionClauseCandidate = classifyConjunctionClauseCandidate;
    api.classifyConjunctionClauseFalsePositive = classifyConjunctionClauseFalsePositive;
    return api;
}

export function installConjunctionClauseGlobals(targetObject = globalThis) {
    const api = createConjunctionClauseApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
