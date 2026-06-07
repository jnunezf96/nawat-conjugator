// Native wrapper generated from src/core/clause/complement/complement.js.

export function createComplementClauseApi(targetObject = globalThis) {
    const COMPLEMENT_CLAUSE_BOUNDARY_VERSION = 1;
    const COMPLEMENT_CLAUSE_ROLE = Object.freeze({
      objectComplement: "object-complement",
      subjectComplement: "subject-complement",
      adverbialComplement: "adverbial-complement",
      doubleNucleus: "double-nucleus",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_UNIT = Object.freeze({
      vnc: "vnc",
      nnc: "nnc",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryVncOutput: "ordinary-vnc-output",
      ordinaryNncOutput: "ordinary-nnc-output",
      nominalizationProfile: "nominalization-profile",
      objectControlLabel: "object-control-label",
      subjectLabel: "subject-label",
      adverbTranslation: "adverb-translation",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["complement-clause boundary metadata is not generation", "object controls and subject labels are not complement-clause evidence", "ordinary VNC or NNC output is not a complement AST", "nominalizationProfile is not a clause-level complement relation", "single generated words do not prove object, subject, or adverbial complements", "Andrews complementation categories are architecture, not Nawat/Pipil form authority"]);
    const COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Nawat/Pipil principal clause hosts the complement?"
    }), Object.freeze({
      field: "complement",
      asks: "Which Nawat/Pipil VNC, NNC, clause, or sentence functions as complement?"
    }), Object.freeze({
      field: "complementRole",
      asks: "Is the relation object complement, subject complement, adverbial complement, double nucleus, or unknown?"
    }), Object.freeze({
      field: "complementUnitType",
      asks: "Is the complement unit a VNC, NNC, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "linkingEvidence",
      asks: "What marking, order, valency, or shared-argument evidence supports complement status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports complementation?"
    })]);
    function normalizeComplementClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComplementClauseRole(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_ROLE), COMPLEMENT_CLAUSE_ROLE.unknown);
    }
    function normalizeComplementClauseUnit(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_UNIT), COMPLEMENT_CLAUSE_UNIT.unknown);
    }
    function normalizeComplementClauseFalsePositiveSource(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE), COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComplementClauseAntiConflationRules() {
      return Array.from(COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES);
    }
    function getComplementClauseStructuralQuestions() {
      return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildComplementClauseBoundaryMetadata() {
      return {
        kind: "complement-clause-boundary",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        status: "partial",
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getComplementClauseStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasNncGeneration: true,
          hasNominalizationProfileMetadata: true,
          hasComplementAst: false,
          hasConfirmedClauseExamples: false,
          hasStaticComplementData: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesNominalizationGeneration: false,
          changesValencyBehavior: false,
          treatsGeneratedWordAsComplementEvidence: false,
          treatsObjectControlAsComplementEvidence: false
        },
        antiConflationRules: getComplementClauseAntiConflationRules()
      };
    }
    function classifyComplementClauseCandidate({
      principalClause = "",
      complement = "",
      candidate = "",
      complementRole = "",
      complementUnitType = "",
      linkingEvidence = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
      const normalizedFalsePositive = normalizeComplementClauseFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "complement-clause-candidate-classification",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        complement: String(complement || ""),
        candidate: String(candidate || ""),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        linkingEvidence: String(linkingEvidence || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "complement-clause-needs-validation" : "complement-clause-needs-nawat-clause-evidence", normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown ? "complement-clause-role-recognized" : "complement-clause-role-unconfirmed", normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown ? "complement-clause-unit-recognized" : "complement-clause-unit-unconfirmed", normalizedFalsePositive !== COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown ? "complement-clause-false-positive-source" : "complement-clause-unconfirmed"],
        boundary: buildComplementClauseBoundaryMetadata()
      };
    }
    function classifyComplementClauseFalsePositive(source = "") {
      const normalizedSource = normalizeComplementClauseFalsePositiveSource(source);
      return {
        kind: "complement-clause-false-positive",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        source: normalizedSource,
        isComplementClauseEvidence: false,
        isComplementAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["complement-clause-false-positive-source"],
        antiConflationRules: getComplementClauseAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ROLE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ROLE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_UNIT; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeComplementClauseEnum = normalizeComplementClauseEnum;
    api.normalizeComplementClauseRole = normalizeComplementClauseRole;
    api.normalizeComplementClauseUnit = normalizeComplementClauseUnit;
    api.normalizeComplementClauseFalsePositiveSource = normalizeComplementClauseFalsePositiveSource;
    api.getComplementClauseAntiConflationRules = getComplementClauseAntiConflationRules;
    api.getComplementClauseStructuralQuestions = getComplementClauseStructuralQuestions;
    api.buildComplementClauseBoundaryMetadata = buildComplementClauseBoundaryMetadata;
    api.classifyComplementClauseCandidate = classifyComplementClauseCandidate;
    api.classifyComplementClauseFalsePositive = classifyComplementClauseFalsePositive;
    return api;
}

export function installComplementClauseGlobals(targetObject = globalThis) {
    const api = createComplementClauseApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
