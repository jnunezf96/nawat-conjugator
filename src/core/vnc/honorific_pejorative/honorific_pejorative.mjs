// Native wrapper generated from src/core/vnc/honorific_pejorative/honorific_pejorative.js.

export function createHonorificPejorativeApi(targetObject = globalThis) {
    const HONORIFIC_PEJORATIVE_BOUNDARY_VERSION = 1;
    const HONORIFIC_PEJORATIVE_POLARITY = Object.freeze({
      honorific: "honorific",
      pejorative: "pejorative",
      neutral: "neutral",
      unknown: "unknown"
    });
    const HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE = Object.freeze({
      politeTranslation: "polite-translation",
      pejorativeTranslation: "pejorative-translation",
      ordinaryCausative: "ordinary-causative",
      ordinaryApplicative: "ordinary-applicative",
      nonactiveDerivation: "nonactive-derivation",
      personLabel: "person-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES = Object.freeze(["honorific/pejorative boundary metadata is not generation", "polite or insulting translation labels are not Nawat/Pipil fixture evidence", "ordinary causative/applicative derivation is not honorific or pejorative VNC generation", "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation", "person or agreement labels are not honorific or pejorative VNC evidence", "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil form authority"]);
    const HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "sourceStem",
      asks: "Which VNC stem is the source of the honorific or pejorative candidate?"
    }), Object.freeze({
      field: "polarity",
      asks: "Is the candidate honorific, pejorative, neutral, or unknown?"
    }), Object.freeze({
      field: "morphologicalStrategy",
      asks: "What Nawat/Pipil evidence shows the honorific or pejorative strategy?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided form evidence supports the status?"
    })]);
    function attachHonorificPejorativeGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "vnc-derivation-boundary",
        routeFamily: "honorific-pejorative",
        structuralSource: "Andrews Lesson 33",
        andrewsRefs: ["Andrews Lesson 33"],
        ...options
      });
    }
    function normalizeHonorificPejorativeEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeHonorificPejorativePolarity(value = "") {
      return normalizeHonorificPejorativeEnum(value, Object.values(HONORIFIC_PEJORATIVE_POLARITY), HONORIFIC_PEJORATIVE_POLARITY.unknown);
    }
    function normalizeHonorificPejorativeFalsePositiveSource(value = "") {
      return normalizeHonorificPejorativeEnum(value, Object.values(HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE), HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getHonorificPejorativeAntiConflationRules() {
      return Array.from(HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES);
    }
    function getHonorificPejorativeStructuralQuestions() {
      return HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildHonorificPejorativeBoundaryMetadata() {
      const boundary = {
        kind: "honorific-pejorative-boundary",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        lesson: 33,
        status: "partial",
        structuralSource: "Andrews Lesson 33",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getHonorificPejorativeStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasHonorificGeneration: false,
          hasPejorativeGeneration: false,
          hasConfirmedFixtureData: false,
          changesCausativeGeneration: false,
          changesApplicativeGeneration: false,
          changesNonactiveGeneration: false,
          changesVncGeneration: false,
          treatsTranslationToneAsEvidence: false
        },
        antiConflationRules: getHonorificPejorativeAntiConflationRules()
      };
      return attachHonorificPejorativeGrammarContract(boundary, {
        metadataKind: "honorific-pejorative-boundary",
        routeStage: "classify-boundary",
        supported: false,
        morphBoundaryFrame: boundary,
        targetContract: {
          metadataKind: "honorific-pejorative-boundary",
          generationAllowed: false,
          hasHonorificGeneration: false,
          hasPejorativeGeneration: false
        }
      });
    }
    function classifyHonorificPejorativeCandidate({
      sourceStem = "",
      candidate = "",
      polarity = "",
      morphologicalStrategy = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedPolarity = normalizeHonorificPejorativePolarity(polarity);
      const normalizedFalsePositive = normalizeHonorificPejorativeFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "honorific-pejorative-candidate-classification",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        polarity: normalizedPolarity,
        morphologicalStrategy: String(morphologicalStrategy || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "honorific-pejorative-needs-validation" : "honorific-pejorative-needs-nawat-evidence", normalizedPolarity !== HONORIFIC_PEJORATIVE_POLARITY.unknown ? "honorific-pejorative-category-recognized" : "honorific-pejorative-category-unconfirmed", normalizedFalsePositive !== HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown ? "honorific-pejorative-false-positive-source" : "honorific-pejorative-unconfirmed"],
        boundary: buildHonorificPejorativeBoundaryMetadata()
      };
      return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        supported: false,
        diagnostics: classification.diagnostics,
        stemFrame: {
          stemKind: "honorific-pejorative-candidate",
          sourceStem: classification.sourceStem,
          targetStem: classification.candidate,
          morphologicalStrategy: classification.morphologicalStrategy
        },
        participantFrame: {
          honorificPejorativePolarity: normalizedPolarity,
          evidenceSource: classification.evidenceSource
        },
        targetContract: {
          metadataKind: "honorific-pejorative-candidate-classification",
          generationAllowed: false,
          polarity: normalizedPolarity
        }
      });
    }
    function classifyHonorificPejorativeFalsePositive(source = "") {
      const normalizedSource = normalizeHonorificPejorativeFalsePositiveSource(source);
      const classification = {
        kind: "honorific-pejorative-false-positive",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        source: normalizedSource,
        isHonorificEvidence: false,
        isPejorativeEvidence: false,
        generationAllowed: false,
        diagnostics: ["honorific-pejorative-false-positive-source"],
        antiConflationRules: getHonorificPejorativeAntiConflationRules()
      };
      return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics
      });
    }

    const api = {};
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_POLARITY", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_POLARITY; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS; },
    });
    api.attachHonorificPejorativeGrammarContract = attachHonorificPejorativeGrammarContract;
    api.normalizeHonorificPejorativeEnum = normalizeHonorificPejorativeEnum;
    api.normalizeHonorificPejorativePolarity = normalizeHonorificPejorativePolarity;
    api.normalizeHonorificPejorativeFalsePositiveSource = normalizeHonorificPejorativeFalsePositiveSource;
    api.getHonorificPejorativeAntiConflationRules = getHonorificPejorativeAntiConflationRules;
    api.getHonorificPejorativeStructuralQuestions = getHonorificPejorativeStructuralQuestions;
    api.buildHonorificPejorativeBoundaryMetadata = buildHonorificPejorativeBoundaryMetadata;
    api.classifyHonorificPejorativeCandidate = classifyHonorificPejorativeCandidate;
    api.classifyHonorificPejorativeFalsePositive = classifyHonorificPejorativeFalsePositive;
    return api;
}

export function installHonorificPejorativeGlobals(targetObject = globalThis) {
    const api = createHonorificPejorativeApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
