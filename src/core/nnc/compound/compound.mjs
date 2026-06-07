// Native wrapper generated from src/core/nnc/compound/compound.js.

export function createNncCompoundApi(targetObject = globalThis) {
    const COMPOUND_NNC_BOUNDARY_VERSION = 1;
    const COMPOUND_NNC_KIND = Object.freeze({
      compoundNounstem: "compound-nounstem",
      affectiveNnc: "affective-nnc",
      lexicalEmbed: "lexical-embed",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      unknown: "unknown"
    });
    const COMPOUND_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      vncCompoundAst: "vnc-compound-ast",
      outerLexicalEmbed: "outer-lexical-embed",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      openStem: "open-stem",
      parserPunctuation: "parser-punctuation",
      generatedVncSurface: "generated-vnc-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPOUND_NNC_ANTI_CONFLATION_RULES = Object.freeze(["VNC compoundAst metadata is not compound NNC generation", "outer lexical embeds are not compound nounstem fixture evidence", "ordinary NNC fixtures are not affective NNC fixtures", "open-stem ordinary NNC previews are not compound NNC evidence", "parser punctuation is not a compound NNC schema", "Andrews compound/affective categories are architecture, not Nawat/Pipil form authority"]);
    const COMPOUND_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "headStem",
      asks: "Which nounstem is the head or matrix of the compound NNC candidate?"
    }), Object.freeze({
      field: "embeddedStem",
      asks: "Which nounstem, VNC, or lexical element is embedded?"
    }), Object.freeze({
      field: "compoundKind",
      asks: "Is the candidate a compound nounstem, affective NNC, lexical embed, ordinary fixture, or unknown?"
    }), Object.freeze({
      field: "affectiveValue",
      asks: "If affective, what affective value is evidenced by Nawat/Pipil data?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided evidence supports the compound/affective status?"
    })]);
    function normalizeCompoundNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeCompoundNncKind(value = "") {
      return normalizeCompoundNncEnum(value, Object.values(COMPOUND_NNC_KIND), COMPOUND_NNC_KIND.unknown);
    }
    function normalizeCompoundNncFalsePositiveSource(value = "") {
      return normalizeCompoundNncEnum(value, Object.values(COMPOUND_NNC_FALSE_POSITIVE_SOURCE), COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getCompoundNncAntiConflationRules() {
      return Array.from(COMPOUND_NNC_ANTI_CONFLATION_RULES);
    }
    function getCompoundNncStructuralQuestions() {
      return COMPOUND_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildCompoundNncAffectiveBoundaryMetadata() {
      return {
        kind: "compound-nnc-affective-boundary",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        lessons: [31, 32],
        status: "partial",
        structuralSource: "Andrews Lessons 31-32",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCompoundNncStructuralQuestions(),
        boundaries: {
          hasVncCompoundParserMetadata: true,
          hasCompoundNncGeneration: false,
          hasAffectiveNncGeneration: false,
          hasStaticAffectiveData: false,
          treatsVncCompoundAstAsNncEvidence: false,
          changesOrdinaryNncGeneration: false,
          changesVncGeneration: false
        },
        antiConflationRules: getCompoundNncAntiConflationRules()
      };
    }
    function classifyCompoundNncAffectiveCandidate({
      candidate = "",
      headStem = "",
      embeddedStem = "",
      compoundKind = "",
      affectiveValue = "",
      evidenceSource = "",
      falsePositiveSource = "",
      hasCompoundAst = false,
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizeCompoundNncKind(compoundKind);
      const normalizedFalsePositive = normalizeCompoundNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "compound-nnc-affective-candidate-classification",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        headStem: String(headStem || ""),
        embeddedStem: String(embeddedStem || ""),
        compoundKind: normalizedKind,
        affectiveValue: String(affectiveValue || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasCompoundAst: hasCompoundAst === true,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "compound-nnc-needs-validation" : "compound-nnc-needs-nawat-evidence", hasCompoundAst ? "vnc-compound-ast-not-nnc-evidence" : "compound-nnc-no-compound-ast", normalizedFalsePositive !== COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown ? "compound-nnc-false-positive-source" : "compound-nnc-unconfirmed"],
        boundary: buildCompoundNncAffectiveBoundaryMetadata()
      };
    }
    function classifyCompoundNncAffectiveFalsePositive(source = "") {
      const normalizedSource = normalizeCompoundNncFalsePositiveSource(source);
      return {
        kind: "compound-nnc-affective-false-positive",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isCompoundNncEvidence: false,
        isAffectiveNncEvidence: false,
        generationAllowed: false,
        diagnostics: ["compound-nnc-false-positive-source"],
        antiConflationRules: getCompoundNncAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "COMPOUND_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_KIND; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeCompoundNncEnum = normalizeCompoundNncEnum;
    api.normalizeCompoundNncKind = normalizeCompoundNncKind;
    api.normalizeCompoundNncFalsePositiveSource = normalizeCompoundNncFalsePositiveSource;
    api.getCompoundNncAntiConflationRules = getCompoundNncAntiConflationRules;
    api.getCompoundNncStructuralQuestions = getCompoundNncStructuralQuestions;
    api.buildCompoundNncAffectiveBoundaryMetadata = buildCompoundNncAffectiveBoundaryMetadata;
    api.classifyCompoundNncAffectiveCandidate = classifyCompoundNncAffectiveCandidate;
    api.classifyCompoundNncAffectiveFalsePositive = classifyCompoundNncAffectiveFalsePositive;
    return api;
}

export function installNncCompoundGlobals(targetObject = globalThis) {
    const api = createNncCompoundApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
