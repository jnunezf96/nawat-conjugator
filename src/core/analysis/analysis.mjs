// Native wrapper generated from src/core/analysis/analysis.js.

export function createAnalysisApi(targetObject = globalThis) {
    const ANALYSIS_BOUNDARY_VERSION = 1;
    const ANALYSIS_ISSUE = Object.freeze({
      nonsystemicTense: "nonsystemic-tense",
      irregularValence: "irregular-valence",
      absoluteTopic: "absolute-topic",
      agreementMismatch: "agreement-mismatch",
      adverbialNncSupplement: "adverbial-nnc-supplement",
      problematicConstruction: "problematic-construction",
      exclamation: "exclamation",
      mahConstruction: "mah-construction",
      incorporatedNounSubjectWarning: "incorporated-noun-subject-warning",
      textualProblem: "textual-problem",
      miscellany: "miscellany",
      unknown: "unknown"
    });
    const ANALYSIS_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryVncOutput: "ordinary-vnc-output",
      ordinaryNncOutput: "ordinary-nnc-output",
      sentenceLayerMetadata: "sentence-layer-metadata",
      clauseShellMetadata: "clause-shell-metadata",
      parserLabel: "parser-label",
      topicFocusUiLabel: "topic-focus-ui-label",
      mahString: "mah-string",
      translationLabel: "translation-label",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ANALYSIS_ANTI_CONFLATION_RULES = Object.freeze(["analysis boundary metadata is not generation", "ordinary VNC or NNC output is not textual analysis evidence", "sentence-layer and clause-shell metadata are not full textual diagnostics", "topic/focus UI labels are not absolute-topic evidence", "a bare mah-looking string is not a confirmed mah construction", "CSV verb rows and translation labels are not textual problem evidence", "Andrews miscellany categories are architecture, not Nawat/Pipil form authority"]);
    const ANALYSIS_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "textSource",
      asks: "Which Nawat/Pipil text, clause, or sentence is being analyzed?"
    }), Object.freeze({
      field: "analysisIssue",
      asks: "Is the issue nonsystemic tense, irregular valence, absolute topic, agreement mismatch, mah construction, textual problem, or unknown?"
    }), Object.freeze({
      field: "affectedUnit",
      asks: "Which VNC, NNC, clause, sentence, or textual span is affected?"
    }), Object.freeze({
      field: "expectedSystem",
      asks: "Which current engine/system expectation is being compared against?"
    }), Object.freeze({
      field: "diagnosticEvidence",
      asks: "What evidence shows mismatch, exception, textual problem, or analysis status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided text supports the analysis?"
    })]);
    function normalizeAnalysisEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAnalysisIssue(value = "") {
      return normalizeAnalysisEnum(value, Object.values(ANALYSIS_ISSUE), ANALYSIS_ISSUE.unknown);
    }
    function normalizeAnalysisFalsePositiveSource(value = "") {
      return normalizeAnalysisEnum(value, Object.values(ANALYSIS_FALSE_POSITIVE_SOURCE), ANALYSIS_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getAnalysisAntiConflationRules() {
      return Array.from(ANALYSIS_ANTI_CONFLATION_RULES);
    }
    function getAnalysisStructuralQuestions() {
      return ANALYSIS_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildAnalysisBoundaryMetadata() {
      return {
        kind: "analysis-boundary",
        version: ANALYSIS_BOUNDARY_VERSION,
        lessons: [57, 58],
        status: "partial",
        structuralSource: "Andrews Lessons 57-58",
        targetAuthority: "Nawat/Pipil repo data and user-provided texts",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAnalysisStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasNncGeneration: true,
          hasSentenceLayerMetadata: true,
          hasClauseShellMetadata: true,
          hasTextualAnalysisEngine: false,
          hasConfirmedTextExamples: false,
          hasStaticAnalysisData: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesParserBehavior: false,
          changesSentenceLayerBehavior: false,
          treatsGeneratedWordAsAnalysisEvidence: false,
          treatsUiLabelsAsAnalysisEvidence: false
        },
        antiConflationRules: getAnalysisAntiConflationRules()
      };
    }
    function classifyAnalysisIssueCandidate({
      textSource = "",
      candidate = "",
      analysisIssue = "",
      affectedUnit = "",
      expectedSystem = "",
      diagnosticEvidence = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedIssue = normalizeAnalysisIssue(analysisIssue);
      const normalizedFalsePositive = normalizeAnalysisFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "analysis-issue-candidate-classification",
        version: ANALYSIS_BOUNDARY_VERSION,
        textSource: String(textSource || ""),
        candidate: String(candidate || ""),
        analysisIssue: normalizedIssue,
        affectedUnit: String(affectedUnit || ""),
        expectedSystem: String(expectedSystem || ""),
        diagnosticEvidence: String(diagnosticEvidence || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "analysis-issue-needs-validation" : "analysis-issue-needs-nawat-text-evidence", normalizedIssue !== ANALYSIS_ISSUE.unknown ? "analysis-issue-kind-recognized" : "analysis-issue-kind-unconfirmed", normalizedFalsePositive !== ANALYSIS_FALSE_POSITIVE_SOURCE.unknown ? "analysis-issue-false-positive-source" : "analysis-issue-unconfirmed"],
        boundary: buildAnalysisBoundaryMetadata()
      };
    }
    function classifyAnalysisFalsePositive(source = "") {
      const normalizedSource = normalizeAnalysisFalsePositiveSource(source);
      return {
        kind: "analysis-false-positive",
        version: ANALYSIS_BOUNDARY_VERSION,
        source: normalizedSource,
        isTextualAnalysisEvidence: false,
        isMiscellanyEvidence: false,
        generationAllowed: false,
        diagnostics: ["analysis-issue-false-positive-source"],
        antiConflationRules: getAnalysisAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "ANALYSIS_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ANALYSIS_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ANALYSIS_ISSUE", {
        configurable: true,
        enumerable: true,
        get() { return ANALYSIS_ISSUE; },
    });
    Object.defineProperty(api, "ANALYSIS_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ANALYSIS_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ANALYSIS_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ANALYSIS_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ANALYSIS_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ANALYSIS_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAnalysisEnum = normalizeAnalysisEnum;
    api.normalizeAnalysisIssue = normalizeAnalysisIssue;
    api.normalizeAnalysisFalsePositiveSource = normalizeAnalysisFalsePositiveSource;
    api.getAnalysisAntiConflationRules = getAnalysisAntiConflationRules;
    api.getAnalysisStructuralQuestions = getAnalysisStructuralQuestions;
    api.buildAnalysisBoundaryMetadata = buildAnalysisBoundaryMetadata;
    api.classifyAnalysisIssueCandidate = classifyAnalysisIssueCandidate;
    api.classifyAnalysisFalsePositive = classifyAnalysisFalsePositive;
    return api;
}

export function installAnalysisGlobals(targetObject = globalThis) {
    const api = createAnalysisApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
