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
      field: "sourceContext",
      asks: "Which surrounding VNC, NNC, clause, sentence, or concatenate context triggers the diagnostic?"
    }), Object.freeze({
      field: "referentRelation",
      asks: "Do the affected pronouns refer to the same extralinguistic entity or group?"
    }), Object.freeze({
      field: "diagnosticEvidence",
      asks: "What evidence shows mismatch, exception, textual problem, or analysis status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided text supports the analysis?"
    })]);
    const LESSON57_ANALYSIS_PDF_REFS = Object.freeze(["Andrews Lesson 57.1", "Andrews Lesson 57.2", "Andrews Lesson 57.3", "Andrews Lesson 57.4", "Andrews Lesson 57.5", "Andrews Lesson 57.6", "Andrews Lesson 57.7"]);
    const LESSON57_ANALYSIS_VALIDATION_REFS = Object.freeze(["src/tests/analysis.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON57_ANALYSIS_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      range: "57.1",
      issue: ANALYSIS_ISSUE.nonsystemicTense,
      role: "nonsystemic-tense-use",
      directive: "Treat present, preterit, and future tense morphs as grammatical tense categories whose time reference can shift under nearby VNC or sentence context; do not change finite tense generation from translation time alone.",
      diagnosticKinds: Object.freeze(["present-time-shift", "preterit-priority-shift", "future-posteriority-shift", "concatenate-tense-attraction"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["single-vnc-output", "translation-time-label", "tense-generation-rewrite"])
    }), Object.freeze({
      range: "57.2",
      issue: ANALYSIS_ISSUE.irregularValence,
      role: "irregular-valence",
      directive: "Record exceptional valence only from textual evidence, and distinguish true valence irregularity from compound-stem analysis such as incorporated-object structure.",
      diagnosticKinds: Object.freeze(["unexpected-intransitive-valence", "unexpected-transitive-valence", "compound-valence-assessment"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["route-profile-shortcut", "compound-misanalysis", "unevidenced-valence-change"])
    }), Object.freeze({
      range: "57.3",
      issue: ANALYSIS_ISSUE.absoluteTopic,
      role: "absolute-topic",
      directive: "Keep absolute topic separate from supplementation: the topic is free from grammatical relation to the comment, while apparent topics may instead be topicalized heads of modification.",
      diagnosticKinds: Object.freeze(["absolute-topic", "non-supplement-topic", "topicalized-head-contrast"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["topic-focus-ui-label", "supplementation-collapse", "single-clause-label"])
    }), Object.freeze({
      range: "57.4",
      issue: ANALYSIS_ISSUE.agreementMismatch,
      role: "supplement-head-agreement-mismatch",
      directive: "Record lack of person, number, or specificity agreement only when supplement and head refer to the same extralinguistic group seen from different grammatical perspectives.",
      diagnosticKinds: Object.freeze(["person-agreement-mismatch", "number-agreement-mismatch", "specificity-agreement-mismatch", "same-referent-perspective"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["different-referent-misread", "generic-number-shortcut", "specificity-without-text"])
    }), Object.freeze({
      range: "57.5",
      issue: ANALYSIS_ISSUE.adverbialNncSupplement,
      role: "adverbial-nnc-as-supplement",
      directive: "Distinguish adverbial NNC supplementary objects from ordinary adverbial modifiers and from deleted-principal speech constructions.",
      diagnosticKinds: Object.freeze(["adverbial-nnc-supplementary-object", "adverbial-modifier-contrast", "deleted-principal-contrast"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["adverbio-output-shortcut", "lesson-50-collapse", "deleted-speech-head-unmodeled"])
    }), Object.freeze({
      range: "57.6",
      issue: ANALYSIS_ISSUE.problematicConstruction,
      role: "silent-pers1-morph",
      directive: "Treat silent pers1 after a sounded first-person VNC, or with first-person reflexive evidence, as stylistic textual analysis rather than third-person subject generation.",
      diagnosticKinds: Object.freeze(["silent-pers1-after-sounded-first-person", "reflexive-signaled-first-person", "adjunction-or-conjunction-license"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["third-person-fallback", "single-vnc-analysis", "silent-morph-generation"])
    }), Object.freeze({
      range: "57.7",
      issue: ANALYSIS_ISSUE.miscellany,
      role: "nounstem-forming-l",
      directive: "Keep the nounstem-forming l suffix as a patientive-looking nounstem-source diagnostic where no nonactive verbstem source is evidenced.",
      diagnosticKinds: Object.freeze(["nounstem-forming-l", "nounstem-source-not-nonactive-verbstem", "patientive-lookalike-boundary"]),
      redirectAction: "diagnostic-only",
      generationStatus: "nounstem-source-diagnostic-only",
      blockers: Object.freeze(["nonactive-source-assumption", "patientive-generator-shortcut", "fixture-without-lexical-evidence"])
    })]);
    function getLesson57AnalysisSubsectionInventory() {
      return LESSON57_ANALYSIS_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        diagnosticKinds: Array.from(entry.diagnosticKinds),
        blockers: Array.from(entry.blockers)
      }));
    }
    function buildLesson57AnalysisPursuitFrame() {
      const subsectionInventory = getLesson57AnalysisSubsectionInventory();
      return {
        version: 1,
        outputKind: "lesson-57-analysis-pursuit-frame",
        curriculumRef: {
          source: "Andrews",
          range: "57.1-57.7",
          role: "plan-pursue-step"
        },
        stepNumber: 57,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON57_ANALYSIS_PDF_REFS),
        directive: "Use Andrews Lesson 57 to direct miscellany part-one diagnostics: nonsystemic tense use, irregular valence, absolute topic, supplement/head agreement mismatch, adverbial NNC supplements, silent pers1 morphs, and nounstem-forming l boundaries before any text behavior is treated as implemented.",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON57_ANALYSIS_VALIDATION_REFS),
        plannedArrows: [{
          id: "lesson-57-analysis-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 57.1-57.7 against current textual-analysis boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
          andrewsRefs: Array.from(LESSON57_ANALYSIS_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON57_ANALYSIS_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-57-analysis-audit",
          result: "hit",
          correction: "Lesson 57 now records Andrews miscellany part-one diagnostics across tense/time mismatch, exceptional valence, absolute topic, agreement mismatch, adverbial NNC supplements, silent pers1 morphs, and nounstem-forming l boundaries while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON57_ANALYSIS_PDF_REFS),
          feedbackRefs: Array.from(LESSON57_ANALYSIS_VALIDATION_REFS)
        }],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 57 textual examples, sentence-context parser behavior, tense-attraction detection, valence-irregularity lexicon, absolute-topic ASTs, supplement/head referent tracking, adverbial-NNC supplement detection, silent-pers1 diagnostics, nounstem-forming-l lexical data, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
        subsectionInventory,
        coverage: {
          subsectionCount: subsectionInventory.length,
          diagnosticKindCount: subsectionInventory.reduce((count, entry) => count + entry.diagnosticKinds.length, 0),
          blockerCount: subsectionInventory.reduce((count, entry) => count + entry.blockers.length, 0),
          generationAllowed: false
        },
        boundaries: {
          noClassicalSurfaceImport: true,
          noNewFixtureEvidence: true,
          noSilentGeneration: true,
          textualAnalysisGenerationAllowed: false,
          staticAnalysisDataExists: false,
          visibleUiSpanishRequired: true
        }
      };
    }
    const LESSON58_ANALYSIS_PDF_REFS = Object.freeze(["Andrews Lesson 58.1", "Andrews Lesson 58.2", "Andrews Lesson 58.3", "Andrews Lesson 58.4", "Andrews Lesson 58.5", "Andrews Lesson 58.6", "Andrews Lesson 58.7", "Andrews Lesson 58.8"]);
    const LESSON58_ANALYSIS_VALIDATION_REFS = Object.freeze(["src/tests/analysis.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON58_ANALYSIS_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      range: "58.1",
      issue: ANALYSIS_ISSUE.miscellany,
      role: "instrumental-az-nounstems",
      directive: "Treat instrumental nounstems in az-tli and hu-az-tli as restricted compound-nounstem diagnostics whose later huia or o-a verbstem use still needs lexical source evidence.",
      diagnosticKinds: Object.freeze(["instrumental-az-matrix", "optional-hu-az-connector", "huia-or-o-a-source-boundary", "restricted-matrix-stem"]),
      redirectAction: "diagnostic-only",
      generationStatus: "nounstem-source-diagnostic-only",
      blockers: Object.freeze(["instrumental-fixture-shortcut", "automatic-huia-generation", "automatic-o-a-generation"])
    }), Object.freeze({
      range: "58.2",
      issue: ANALYSIS_ISSUE.problematicConstruction,
      role: "problematic-stem-and-clause-formations",
      directive: "Record small exceptional formations as diagnostics: e-hua compounds preserving source num1, pronunciation-spelling traps, nounstem embeds in connective-t compounds, embedded agentive object complements, rule-violating compounds, nonrelational connective-t nounstems, and frozen third-person reflexives.",
      diagnosticKinds: Object.freeze(["e-hua-keeps-num1", "pronunciation-spelling-supplement-contrast", "nounstem-embed-connective-t", "embedded-agentive-object-complement", "rule-violating-connective-t-compound", "nonrelational-connective-t-nounstem", "frozen-third-person-reflexive"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["productive-rule-assumption", "solid-spelling-as-incorporation", "reflexive-person-rewrite"])
    }), Object.freeze({
      range: "58.3",
      issue: ANALYSIS_ISSUE.exclamation,
      role: "exclamatory-expressions",
      directive: "Classify exclamations as possible particles, NNCs, VNCs, or combinations, including haste collocations and vocative e, without turning the Classical examples into Nawat/Pipil particles or fixtures.",
      diagnosticKinds: Object.freeze(["exclamatory-particle", "exclamatory-nnc", "exclamatory-vnc", "haste-collocation", "vocative-particle-e"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["particle-mode-import", "exclamation-fixture-shortcut", "translation-label-as-form"])
    }), Object.freeze({
      range: "58.4",
      issue: ANALYSIS_ISSUE.mahConstruction,
      role: "mah-such-that-construction",
      directive: "Keep mah and mah ca/camo as such-that adjunction to interrogative NNC principals ac, tleh, can, or ic; do not confuse this with wish-marking ma or sentence-level optative behavior.",
      diagnosticKinds: Object.freeze(["mah-such-that-adjunction", "mah-ca-negative", "interrogative-nnc-principal", "strong-negative-positive-polarity", "quemah-frozen-collocation"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["wish-ma-conflation", "bare-mah-string", "polarity-generation-shortcut"])
    }), Object.freeze({
      range: "58.5",
      issue: ANALYSIS_ISSUE.mahConstruction,
      role: "cuix-ahzo-ahmo-mah-principals",
      directive: "Record cuix, ahzo, and ahmo as possible principal clauses in mah constructions, with ahmo mah as strong negative and ahmo mah ca as strong affirmative.",
      diagnosticKinds: Object.freeze(["cuix-principal", "ahzo-principal", "ahmo-principal", "ahmo-mah-polarity"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["question-particle-shortcut", "negative-label-as-analysis", "principal-clause-unmodeled"])
    }), Object.freeze({
      range: "58.6",
      issue: ANALYSIS_ISSUE.mahConstruction,
      role: "iuhqui-iuh-mah-principals",
      directive: "Record iuhqui or iuh as principal clauses in mah constructions, including ic links and traditional solid-spelling warnings, without treating simile translations as generated comparison forms.",
      diagnosticKinds: Object.freeze(["iuhqui-principal", "iuh-vnc-principal", "ic-comparison-link", "traditional-solid-spelling-warning"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["comparison-output-shortcut", "solid-spelling-import", "iuhqui-fixture-generation"])
    }), Object.freeze({
      range: "58.7",
      issue: ANALYSIS_ISSUE.incorporatedNounSubjectWarning,
      role: "incorporated-noun-not-subject",
      directive: "Block subject-function readings for incorporated nounstems: VNC subjects remain personal-pronoun circumfixes, while incorporated nouns function adverbially or as means/instrument even when translation tempts subject or passive-agent readings.",
      diagnosticKinds: Object.freeze(["active-incorporated-noun-not-subject", "nonactive-incorporated-noun-not-agent", "obligatory-subject-pronoun", "translation-mirage", "adverbial-means-instrument-transform"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["translation-as-grammar", "incorporated-subject-slot", "passive-agent-mention"])
    }), Object.freeze({
      range: "58.8",
      issue: ANALYSIS_ISSUE.textualProblem,
      role: "textual-problems",
      directive: "Treat faulty spelling, graphological-vocable boundaries, and sentence division as textual-analysis problems requiring careful source analysis, not automatic normalization or generation.",
      diagnosticKinds: Object.freeze(["scribal-copyist-typesetter-error", "old-spelling-idiosyncrasy", "graphological-vocable-boundary", "sentence-division-punctuation", "rephrasive-parallelism-reanalysis"]),
      redirectAction: "diagnostic-only",
      generationStatus: "text-context-diagnostic-only",
      blockers: Object.freeze(["automatic-old-spelling-normalization", "sentence-boundary-guess", "textual-correction-as-fixture"])
    })]);
    function getLesson58AnalysisSubsectionInventory() {
      return LESSON58_ANALYSIS_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        diagnosticKinds: Array.from(entry.diagnosticKinds),
        blockers: Array.from(entry.blockers)
      }));
    }
    function buildLesson58AnalysisPursuitFrame() {
      const subsectionInventory = getLesson58AnalysisSubsectionInventory();
      return {
        version: 1,
        outputKind: "lesson-58-analysis-pursuit-frame",
        curriculumRef: {
          source: "Andrews",
          range: "58.1-58.8",
          role: "plan-pursue-step"
        },
        stepNumber: 58,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON58_ANALYSIS_PDF_REFS),
        directive: "Use Andrews Lesson 58 to direct miscellany part-two diagnostics: instrumental az nounstems, problematic stem formations, exclamatory expressions, mah constructions, incorporated-noun subject warnings, and textual problems before any analysis behavior is treated as implemented.",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON58_ANALYSIS_VALIDATION_REFS),
        plannedArrows: [{
          id: "lesson-58-analysis-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 58.1-58.8 against current textual-analysis boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
          andrewsRefs: Array.from(LESSON58_ANALYSIS_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON58_ANALYSIS_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-58-analysis-audit",
          result: "hit",
          correction: "Lesson 58 now records Andrews miscellany part-two diagnostics across instrumental az nounstems, problematic formations, exclamations, mah construction variants, incorporated-noun subject warnings, and textual problems while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON58_ANALYSIS_PDF_REFS),
          feedbackRefs: Array.from(LESSON58_ANALYSIS_VALIDATION_REFS)
        }],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 58 textual examples, instrumental nounstem lexical data, problematic-construction parsing, exclamation classification, mah-construction ASTs, incorporated-noun subject diagnostics, textual-problem correction workflow, parser/search behavior, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
        subsectionInventory,
        coverage: {
          subsectionCount: subsectionInventory.length,
          diagnosticKindCount: subsectionInventory.reduce((count, entry) => count + entry.diagnosticKinds.length, 0),
          blockerCount: subsectionInventory.reduce((count, entry) => count + entry.blockers.length, 0),
          generationAllowed: false
        },
        boundaries: {
          noClassicalSurfaceImport: true,
          noNewFixtureEvidence: true,
          noSilentGeneration: true,
          textualAnalysisGenerationAllowed: false,
          staticAnalysisDataExists: false,
          visibleUiSpanishRequired: true
        }
      };
    }
    function attachAnalysisGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "analysis-boundary",
        routeFamily: "textual-analysis",
        structuralSource: "Andrews Lessons 57-58",
        andrewsRefs: ["Andrews Lessons 57-58"],
        ...options
      });
    }
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
      const boundary = {
        kind: "analysis-boundary",
        version: ANALYSIS_BOUNDARY_VERSION,
        lessons: [57, 58],
        status: "partial",
        structuralSource: "Andrews Lessons 57-58",
        pdfRefs: ["Andrews Lessons 57-58"],
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
      return attachAnalysisGrammarContract(boundary, {
        metadataKind: "analysis-boundary",
        routeStage: "classify-boundary",
        supported: false,
        morphBoundaryFrame: boundary,
        targetContract: {
          metadataKind: "analysis-boundary",
          generationAllowed: false,
          hasTextualAnalysisEngine: false
        }
      });
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
      const classification = {
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
      return attachAnalysisGrammarContract(classification, {
        metadataKind: "analysis-issue-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.textSource || classification.candidate,
        supported: false,
        diagnostics: classification.diagnostics,
        astFrame: {
          affectedUnit: classification.affectedUnit,
          expectedSystem: classification.expectedSystem,
          diagnosticEvidence: classification.diagnosticEvidence
        },
        targetContract: {
          metadataKind: "analysis-issue-candidate-classification",
          generationAllowed: false,
          analysisIssue: normalizedIssue,
          falsePositiveSource: normalizedFalsePositive
        }
      });
    }
    function classifyAnalysisFalsePositive(source = "") {
      const normalizedSource = normalizeAnalysisFalsePositiveSource(source);
      const classification = {
        kind: "analysis-false-positive",
        version: ANALYSIS_BOUNDARY_VERSION,
        source: normalizedSource,
        isTextualAnalysisEvidence: false,
        isMiscellanyEvidence: false,
        generationAllowed: false,
        diagnostics: ["analysis-issue-false-positive-source"],
        antiConflationRules: getAnalysisAntiConflationRules()
      };
      return attachAnalysisGrammarContract(classification, {
        metadataKind: "analysis-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics
      });
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
    Object.defineProperty(api, "LESSON57_ANALYSIS_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON57_ANALYSIS_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON57_ANALYSIS_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON57_ANALYSIS_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON57_ANALYSIS_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON57_ANALYSIS_SUBSECTION_INVENTORY; },
    });
    api.getLesson57AnalysisSubsectionInventory = getLesson57AnalysisSubsectionInventory;
    api.buildLesson57AnalysisPursuitFrame = buildLesson57AnalysisPursuitFrame;
    Object.defineProperty(api, "LESSON58_ANALYSIS_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON58_ANALYSIS_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON58_ANALYSIS_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON58_ANALYSIS_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON58_ANALYSIS_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON58_ANALYSIS_SUBSECTION_INVENTORY; },
    });
    api.getLesson58AnalysisSubsectionInventory = getLesson58AnalysisSubsectionInventory;
    api.buildLesson58AnalysisPursuitFrame = buildLesson58AnalysisPursuitFrame;
    api.attachAnalysisGrammarContract = attachAnalysisGrammarContract;
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
