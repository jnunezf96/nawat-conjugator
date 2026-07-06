// Native wrapper generated from src/core/nnc/names/names.js.

export function createPersonalNameNncApi(targetObject = globalThis) {
    const PERSONAL_NAME_NNC_BOUNDARY_VERSION = 1;
    const PERSONAL_NAME_NNC_KIND = Object.freeze({
      personalNameNnc: "personal-name-nnc",
      singleClauseName: "single-clause-name",
      adjunctionDerivedName: "adjunction-derived-name",
      conjunctionDerivedName: "conjunction-derived-name",
      calendarName: "calendar-name",
      unknown: "unknown"
    });
    const PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      pronounLabel: "pronoun-label",
      capitalizationLabel: "capitalization-label",
      placeGentilicBoundary: "place-gentilic-boundary",
      adverbialAdjunctionBoundary: "adverbial-adjunction-boundary",
      conjunctionBoundary: "conjunction-boundary",
      calendarRoadmapText: "calendar-roadmap-text",
      properNameTranslation: "proper-name-translation",
      singleGeneratedWord: "single-generated-word",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES = Object.freeze(["personal-name NNC boundary metadata is not generation", "ordinary NNC fixtures or open-stem previews are not personal-name fixture evidence", "capitalization labels and proper-name translations are not orthography-bridge name evidence", "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence", "calendar roadmap text is not personal-name NNC data", "Andrews personal-name categories are architecture, not Nawat/Pipil orthography authority"]);
    const PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "nameSource",
      asks: "Which Andrews personal-name NNC form is licensed before Nawat/Pipil orthography realizes it?"
    }), Object.freeze({
      field: "sourceClauseType",
      asks: "Is the name sourced from a single clause, adjunction, conjunction, calendar naming, or unknown?"
    }), Object.freeze({
      field: "outerSubject",
      asks: "Which Andrews outer personal-name NNC subject pronoun is licensed, and is its number dyad 0-0?"
    }), Object.freeze({
      field: "innerSubjectBarrier",
      asks: "Which inner subject pronoun blocks the outer subject from controlling the inner predicate?"
    }), Object.freeze({
      field: "innerSourceStructure",
      asks: "Which downgraded statement, nominalized VNC, NNC, adjunction, or conjunction is the inner predicate?"
    }), Object.freeze({
      field: "clauseSource",
      asks: "Which Andrews clause source supports the name?"
    }), Object.freeze({
      field: "adjunctionSource",
      asks: "Which adjoined-unit source supports the name, if any?"
    }), Object.freeze({
      field: "conjunctionSource",
      asks: "Which conjunction source supports the name, if any?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured route licenses personal-name status?"
    })]);
    const LESSON56_PERSONAL_NAME_NNC_PDF_REFS = Object.freeze(["Andrews Lesson 56.1", "Andrews Lesson 56.2", "Andrews Lesson 56.3", "Andrews Lesson 56.4", "Andrews Lesson 56.5"]);
    const LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_names.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      range: "56.1",
      role: "two-tier-personal-name-nnc",
      directive: "Treat personal names as absolutive-state NNCs whose predicate is an entire downgraded statement; keep inner and outer subject pronouns separate, with the outer number dyad 0-0.",
      sourceKinds: Object.freeze(["downgraded-statement", "one-or-more-nuclear-clauses"]),
      redirectAction: "diagnostic-only",
      generationStatus: "blocked-until-confirmed-name-data",
      blockers: Object.freeze(["word-like-name-analysis", "translation-as-structure", "outer-subject-controls-inner-predicate"])
    }), Object.freeze({
      range: "56.2",
      role: "single-clause-source",
      directive: "Classify single-clause personal-name sources as nominalized VNC stems or downgraded NNC stems, including preterit/present/customary agentive, purposive, reflexive, passive, impersonal, absolutive, possessive, affective, gentilic, and calendrical subtypes.",
      sourceKinds: Object.freeze(["nominalized-vnc", "downgraded-absolutive-nnc", "downgraded-possessive-nnc"]),
      redirectAction: "diagnostic-only",
      generationStatus: "classification-only",
      blockers: Object.freeze(["single-generated-word", "capitalization-label", "proper-name-translation"])
    }), Object.freeze({
      range: "56.3",
      role: "adjunction-source",
      directive: "Classify adjunction-derived personal names only when a full multiple-clause source is supplied: subject supplementation, possessor supplementation, adjectival modification, adverbial modification, or divinatory-calendar name structures.",
      sourceKinds: Object.freeze(["subject-supplementation", "possessor-supplementation", "adjectival-modification", "adverbial-modification", "calendar-name-source"]),
      redirectAction: "diagnostic-only",
      generationStatus: "classification-only",
      blockers: Object.freeze(["statement-without-two-tier-name-structure", "place-gentilic-boundary-only", "calendar-roadmap-text"])
    }), Object.freeze({
      range: "56.4",
      role: "conjunction-source",
      directive: "Classify conjunctorless conjunction personal-name units like conjoined-NNC lexical items while preserving the two-tier personal-name structure on each conjunct.",
      sourceKinds: Object.freeze(["conjunctorless-conjunction", "biclausalism", "conjoined-nnc-lexical-unit"]),
      redirectAction: "diagnostic-only",
      generationStatus: "classification-only",
      blockers: Object.freeze(["conjunction-boundary-only", "single-conjunct-name", "unverified-biclausalism"])
    }), Object.freeze({
      range: "56.5",
      role: "sentence-use-and-downgrades",
      directive: "Keep sentence use, title contrasts, vocative collocations, adjunctor placement, god-name downgrades to normal NNCs, and god-name embeds in place-name NNCs as sentence/name diagnostics, not generated personal-name data.",
      sourceKinds: Object.freeze(["sentence-use", "vocative-collocation", "normal-nnc-downgrade", "place-name-embed"]),
      redirectAction: "diagnostic-only",
      generationStatus: "diagnostic-only",
      blockers: Object.freeze(["title-nnc-as-personal-name", "vocative-as-name-fixture", "god-name-devotee-plural-as-personal-name-generation"])
    })]);
    function normalizePersonalNameNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizePersonalNameNncKind(value = "") {
      return normalizePersonalNameNncEnum(value, Object.values(PERSONAL_NAME_NNC_KIND), PERSONAL_NAME_NNC_KIND.unknown);
    }
    function normalizePersonalNameNncFalsePositiveSource(value = "") {
      return normalizePersonalNameNncEnum(value, Object.values(PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE), PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizePersonalNameNncCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews personal-name NNC candidate formula",
        slot: "personal-name-nnc"
      }) : {
        output: source,
        diagnostics: []
      };
      return String(conversion?.output || source || "").trim();
    }
    function hasPersonalNameNncAndrewsSourceGate({
      sourceGate = "",
      structuredSource = false
    } = {}) {
      return structuredSource === true || Boolean(String(sourceGate || "").trim());
    }
    function buildPersonalNameNncSourceFrame({
      candidate = "",
      nameSource = "",
      personalNameKind = "",
      sourceClauseType = "",
      clauseSource = "",
      adjunctionSource = "",
      conjunctionSource = "",
      evidenceSource = "",
      sourceGate = "",
      targetFormulaSlots = null,
      targetSegmentFrames = []
    } = {}) {
      const normalizedKind = normalizePersonalNameNncKind(personalNameKind || sourceClauseType);
      if (normalizedKind === PERSONAL_NAME_NNC_KIND.unknown) {
        return null;
      }
      const segments = Array.isArray(targetSegmentFrames) ? targetSegmentFrames.map(segment => {
        const surface = String(segment?.surface || "").trim();
        if (!surface || /[A-Z_]/.test(surface)) {
          return null;
        }
        return Object.freeze({
          slot: String(segment?.slot || ""),
          role: String(segment?.role || ""),
          formulaValue: String(segment?.formulaValue || ""),
          sourceStem: String(segment?.sourceStem || ""),
          surface,
          orthographyBridge: "Nawat/Pipil orthography bridge"
        });
      }).filter(Boolean) : [];
      if (!segments.length) {
        return null;
      }
      const targetSurface = segments.map(segment => segment.surface).join("");
      if (!targetSurface) {
        return null;
      }
      return Object.freeze({
        kind: "personal-name-nnc-source-frame",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        routeFamily: "personal-name-nnc",
        personalNameKind: normalizedKind,
        sourceClauseType: String(sourceClauseType || ""),
        candidate: String(candidate || ""),
        nameSource: String(nameSource || ""),
        clauseSource: String(clauseSource || ""),
        adjunctionSource: String(adjunctionSource || ""),
        conjunctionSource: String(conjunctionSource || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        targetFormulaSlots,
        targetSegmentFrames: Object.freeze(segments),
        targetSurface,
        authority: "Andrews Lesson 56 personal-name NNC source frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildPersonalNameNncOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "personal-name-nnc-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-56-personal-name-nnc-realization",
        routeFamily: "personal-name-nnc",
        routeStage: "execute-typed-operation-frame",
        operationApplied: "realize-personal-name-nnc-from-source-frame",
        sourceFrameKind: sourceFrame.kind,
        sourcePersonalNameKind: sourceFrame.personalNameKind,
        sourceClauseType: sourceFrame.sourceClauseType,
        sourceNameSource: sourceFrame.nameSource,
        targetFormulaSlots: sourceFrame.targetFormulaSlots,
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetSurface: sourceFrame.targetSurface,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getPersonalNameNncOperationFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "personal-name-nnc-source-frame") {
        return "source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-56-personal-name-nnc-realization" || operationFrame.routeFamily !== "personal-name-nnc" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "operation-frame-required";
      }
      if (String(operationFrame.sourceFrameKind || "") !== sourceFrame.kind || String(operationFrame.sourcePersonalNameKind || "") !== String(sourceFrame.personalNameKind || "") || String(operationFrame.sourceClauseType || "") !== String(sourceFrame.sourceClauseType || "") || String(operationFrame.sourceNameSource || "") !== String(sourceFrame.nameSource || "")) {
        return "contradictory-source-frame";
      }
      const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames) ? operationFrame.targetSegmentFrames : [];
      if (!targetSegmentFrames.length) {
        return "operation-frame-required";
      }
      const targetSurface = targetSegmentFrames.map(segment => String(segment?.surface || "")).join("");
      if (targetSurface !== String(sourceFrame.targetSurface || "") || String(operationFrame.targetSurface || "") !== String(sourceFrame.targetSurface || "")) {
        return "contradictory-target-frame";
      }
      if (sourceFrame.targetFormulaSlots && operationFrame.targetFormulaSlots !== sourceFrame.targetFormulaSlots) {
        return "contradictory-target-frame";
      }
      return "";
    }
    function getPersonalNameNncBlockedDiagnostic({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const mismatch = getPersonalNameNncOperationFrameMismatch({
        sourceFrame,
        operationFrame
      });
      return mismatch ? `personal-name-nnc-${mismatch}` : "";
    }
    function getPersonalNameNncAntiConflationRules() {
      return Array.from(PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES);
    }
    function getPersonalNameNncStructuralQuestions() {
      return PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function getLesson56PersonalNameNncSubsectionInventory() {
      return LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        sourceKinds: Array.from(entry.sourceKinds),
        blockers: Array.from(entry.blockers)
      }));
    }
    function attachPersonalNameNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "personal-name-nnc",
        routeFamily: "personal-name-nnc",
        ...options
      });
    }
    function buildPersonalNameNncBoundaryMetadata() {
      const boundary = {
        kind: "personal-name-nnc-boundary",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        lesson: 56,
        appendices: ["E"],
        status: "partial",
        structuralSource: "Andrews Lesson 56 and Appendix E",
        pdfRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
        targetAuthority: "Andrews Lesson 56 with Nawat/Pipil orthographic realization",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPersonalNameNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasPlaceGentilicBoundary: true,
          hasAdverbialAdjunctionBoundary: true,
          hasConjunctionBoundary: true,
          hasPersonalNameNncGeneration: false,
          hasCalendarNameGeneration: false,
          hasStaticNameData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesPlaceGentilicGeneration: false,
          changesAdjunctionBehavior: false,
          changesConjunctionBehavior: false,
          treatsCapitalizationAsNameEvidence: false,
          treatsTranslationsAsNameEvidence: false
        },
        antiConflationRules: getPersonalNameNncAntiConflationRules()
      };
      return attachPersonalNameNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyPersonalNameNncCandidate({
      candidate = "",
      nameSource = "",
      personalNameKind = "",
      sourceClauseType = "",
      clauseSource = "",
      adjunctionSource = "",
      conjunctionSource = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const normalizedKind = normalizePersonalNameNncKind(personalNameKind || sourceClauseType);
      const normalizedFalsePositive = normalizePersonalNameNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
      const requiresTypedOperation = normalizedKind !== PERSONAL_NAME_NNC_KIND.unknown && normalizedFalsePositive === PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown;
      const blockedDiagnostic = requiresTypedOperation ? getPersonalNameNncBlockedDiagnostic({
        sourceFrame: resolvedSourceFrame,
        operationFrame
      }) : "";
      const sourceSurface = blockedDiagnostic ? "" : String(operationFrame?.targetSurface || "");
      const canGenerate = Boolean(sourceSurface && !blockedDiagnostic && normalizedKind !== PERSONAL_NAME_NNC_KIND.unknown && normalizedFalsePositive === PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown);
      const targetFormulaSlots = canGenerate ? operationFrame.targetFormulaSlots : null;
      const targetSegmentFrames = canGenerate && Array.isArray(operationFrame.targetSegmentFrames) ? operationFrame.targetSegmentFrames : [];
      const classification = {
        kind: "personal-name-nnc-candidate-classification",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        nameSource: String(nameSource || ""),
        personalNameKind: normalizedKind,
        sourceClauseType: String(sourceClauseType || ""),
        clauseSource: String(clauseSource || ""),
        adjunctionSource: String(adjunctionSource || ""),
        conjunctionSource: String(conjunctionSource || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        ...(resolvedSourceFrame ? {
          sourceFrame: resolvedSourceFrame
        } : {}),
        ...(operationFrame ? {
          operationFrame
        } : {}),
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        ...(canGenerate ? {
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : {}),
        diagnostics: [canGenerate ? "personal-name-nnc-andrews-source-generated" : blockedDiagnostic || (hasEvidence ? "personal-name-nnc-needs-validation" : "personal-name-nnc-source-gate-required"), normalizedKind !== PERSONAL_NAME_NNC_KIND.unknown ? "personal-name-nnc-kind-recognized" : "personal-name-nnc-kind-unconfirmed", normalizedFalsePositive !== PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown ? "personal-name-nnc-false-positive-source" : canGenerate ? "personal-name-nnc-structured-source" : "personal-name-nnc-unconfirmed"],
        boundary: buildPersonalNameNncBoundaryMetadata()
      };
      return attachPersonalNameNncGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-personal-name-nnc" : "classify-boundary",
        sourceInput: classification.candidate || classification.nameSource,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: canGenerate ? "orthography-bridge-realized" : "orthography-bridge-required",
          surface: classification.surface,
          surfaceForms: classification.surfaceForms,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "personal-name-source-candidate",
          sourceStem: classification.nameSource,
          sourceKind: classification.personalNameKind,
          sourceGate: classification.sourceGate,
          targetStem: classification.surface,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        nuclearClauseFrame: canGenerate ? {
          formulaFamily: "personal-name NNC",
          personalNameKind: normalizedKind,
          sourceClauseType: classification.sourceClauseType,
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : null,
        targetContract: {
          metadataKind: "personal-name-nnc-candidate-classification",
          generationAllowed: canGenerate,
          consumesRenderedInput: false,
          displayStringsAuthorizeGrammar: false
        }
      });
    }
    function buildLesson56PersonalNameNncPursuitFrame() {
      const subsectionInventory = getLesson56PersonalNameNncSubsectionInventory();
      return {
        version: 1,
        outputKind: "lesson-56-personal-name-nnc-pursuit-frame",
        curriculumRef: {
          source: "Andrews",
          range: "56.1-56.5",
          role: "plan-pursue-step"
        },
        stepNumber: 56,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
        directive: "Use Andrews Lesson 56 to direct personal-name NNC architecture: two-tier downgraded statement predicates, inner/outer subject separation, single-clause sources, adjunction sources, conjunction sources, sentence use, and non-generation until Andrews personal-name source parsing plus the orthography bridge exists.",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS),
        plannedArrows: [{
          id: "lesson-56-personal-name-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 56.1-56.5 against current personal-name NNC boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
          andrewsRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-56-personal-name-nnc-audit",
          result: "hit",
          correction: "Lesson 56 now records Andrews personal-name NNC two-tier architecture across single-clause, adjunction, conjunction, sentence-use, title, vocative, god-name downgrade, and place-name embed boundaries while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
          feedbackRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS)
        }],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 56 personal-name source parsing, Andrews personal-name source examples plus the orthography bridge, static names/calendar data, sentence-use ASTs, vocative diagnostics, god-name downgrade routing, place-name embed routing, parser/search detection, acciones visibles de interfaz, and slot-scoped visible spelling verification remain partial or evidence-needed.",
        subsectionInventory,
        coverage: {
          subsectionCount: subsectionInventory.length,
          sourceKindCount: subsectionInventory.reduce((count, entry) => count + entry.sourceKinds.length, 0),
          blockerCount: subsectionInventory.reduce((count, entry) => count + entry.blockers.length, 0),
          generationAllowed: false
        },
        boundaries: {
          noClassicalSurfaceImport: true,
          noNewFixtureEvidence: true,
          noSilentGeneration: true,
          personalNameGenerationAllowed: false,
          staticNameDataExists: false,
          visibleUiSpanishRequired: true
        }
      };
    }
    function classifyPersonalNameNncFalsePositive(source = "") {
      const normalizedSource = normalizePersonalNameNncFalsePositiveSource(source);
      const classification = {
        kind: "personal-name-nnc-false-positive",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPersonalNameNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["personal-name-nnc-false-positive-source"],
        antiConflationRules: getPersonalNameNncAntiConflationRules()
      };
      return attachPersonalNameNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "PERSONAL_NAME_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return PERSONAL_NAME_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "PERSONAL_NAME_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PERSONAL_NAME_NNC_KIND; },
    });
    Object.defineProperty(api, "PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON56_PERSONAL_NAME_NNC_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON56_PERSONAL_NAME_NNC_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY; },
    });
    api.normalizePersonalNameNncEnum = normalizePersonalNameNncEnum;
    api.normalizePersonalNameNncKind = normalizePersonalNameNncKind;
    api.normalizePersonalNameNncFalsePositiveSource = normalizePersonalNameNncFalsePositiveSource;
    api.normalizePersonalNameNncCandidateSurface = normalizePersonalNameNncCandidateSurface;
    api.hasPersonalNameNncAndrewsSourceGate = hasPersonalNameNncAndrewsSourceGate;
    api.buildPersonalNameNncSourceFrame = buildPersonalNameNncSourceFrame;
    api.buildPersonalNameNncOperationFrame = buildPersonalNameNncOperationFrame;
    api.getPersonalNameNncOperationFrameMismatch = getPersonalNameNncOperationFrameMismatch;
    api.getPersonalNameNncBlockedDiagnostic = getPersonalNameNncBlockedDiagnostic;
    api.getPersonalNameNncAntiConflationRules = getPersonalNameNncAntiConflationRules;
    api.getPersonalNameNncStructuralQuestions = getPersonalNameNncStructuralQuestions;
    api.getLesson56PersonalNameNncSubsectionInventory = getLesson56PersonalNameNncSubsectionInventory;
    api.attachPersonalNameNncGrammarContract = attachPersonalNameNncGrammarContract;
    api.buildPersonalNameNncBoundaryMetadata = buildPersonalNameNncBoundaryMetadata;
    api.classifyPersonalNameNncCandidate = classifyPersonalNameNncCandidate;
    api.buildLesson56PersonalNameNncPursuitFrame = buildLesson56PersonalNameNncPursuitFrame;
    api.classifyPersonalNameNncFalsePositive = classifyPersonalNameNncFalsePositive;
    return api;
}

export function installPersonalNameNncGlobals(targetObject = globalThis) {
    const api = createPersonalNameNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
