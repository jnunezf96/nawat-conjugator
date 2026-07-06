// Native wrapper generated from src/core/calendar/calendar.js.

export function createCalendarNameApi(targetObject = globalThis) {
    const CALENDAR_NAME_BOUNDARY_VERSION = 1;
    const CALENDAR_NAME_KIND = Object.freeze({
      dayName: "day-name",
      monthName: "month-name",
      yearName: "year-name",
      cycleName: "cycle-name",
      personalNameSource: "personal-name-source",
      unknown: "unknown"
    });
    const CALENDAR_NAME_FALSE_POSITIVE_SOURCE = Object.freeze({
      roadmapText: "roadmap-text",
      calendarRoadmapText: "calendar-roadmap-text",
      personalNameBoundary: "personal-name-boundary",
      placeGentilicBoundary: "place-gentilic-boundary",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      staticLabel: "static-label",
      translationLabel: "translation-label",
      properNameTranslation: "proper-name-translation",
      dateUiLabel: "date-ui-label",
      andrewsExample: "andrews-example",
      unknown: "unknown"
    });
    const CALENDAR_NAME_ANTI_CONFLATION_RULES = Object.freeze(["calendar-name boundary metadata is not generation", "day, month, year, or cycle labels are not calendar-name orthography fixture data", "personal-name NNC boundary metadata is not calendar-name data", "place/gentilic boundary metadata and calendar roadmap text are not confirmed calendar names", "ordinary NNC fixtures or open-stem previews are not calendar-name evidence", "Andrews calendar categories are architecture, not Nawat/Pipil orthography authority"]);
    const CALENDAR_NAME_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "calendarKind",
      asks: "Is the candidate a day, month, year, cycle, personal-name source, or unknown?"
    }), Object.freeze({
      field: "calendarCycle",
      asks: "Which calendar cycle or naming system is evidenced?"
    }), Object.freeze({
      field: "sourceName",
      asks: "Which Andrews calendar-name form is licensed before Nawat/Pipil orthography realizes it?"
    }), Object.freeze({
      field: "nameFunction",
      asks: "Does the candidate function as date label, cycle label, personal-name source, or unknown?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured route licenses calendar-name status?"
    })]);
    function normalizeCalendarNameEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeCalendarNameKind(value = "") {
      return normalizeCalendarNameEnum(value, Object.values(CALENDAR_NAME_KIND), CALENDAR_NAME_KIND.unknown);
    }
    function normalizeCalendarNameFalsePositiveSource(value = "") {
      return normalizeCalendarNameEnum(value, Object.values(CALENDAR_NAME_FALSE_POSITIVE_SOURCE), CALENDAR_NAME_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizeCalendarNameCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews calendar-name candidate formula",
        slot: "calendar-name"
      }) : {
        output: source,
        diagnostics: []
      };
      return String(conversion?.output || source || "").trim();
    }
    function hasCalendarNameAndrewsSourceGate({
      sourceGate = "",
      structuredSource = false
    } = {}) {
      return structuredSource === true || Boolean(String(sourceGate || "").trim());
    }
    function getCalendarNameAntiConflationRules() {
      return Array.from(CALENDAR_NAME_ANTI_CONFLATION_RULES);
    }
    function getCalendarNameStructuralQuestions() {
      return CALENDAR_NAME_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachCalendarNameGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "calendar-name",
        routeFamily: "calendar-name",
        ...options
      });
    }
    function buildCalendarNameBoundaryMetadata() {
      const boundary = {
        kind: "calendar-name-boundary",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        appendix: "E",
        status: "partial",
        structuralSource: "Andrews Appendix E",
        targetAuthority: "Andrews Appendix E with Nawat/Pipil orthographic realization",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCalendarNameStructuralQuestions(),
        boundaries: {
          hasPersonalNameBoundary: true,
          hasPlaceGentilicBoundary: true,
          hasCalendarNameGeneration: false,
          hasStaticCalendarData: false,
          hasConfirmedFixtureData: false,
          changesNncGeneration: false,
          changesPersonalNameGeneration: false,
          changesPlaceGentilicGeneration: false,
          treatsRoadmapTextAsEvidence: false,
          treatsTranslationLabelsAsEvidence: false
        },
        antiConflationRules: getCalendarNameAntiConflationRules()
      };
      return attachCalendarNameGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyCalendarNameCandidate({
      candidate = "",
      calendarKind = "",
      calendarCycle = "",
      sourceName = "",
      nameFunction = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = ""
    } = {}) {
      const normalizedKind = normalizeCalendarNameKind(calendarKind);
      const normalizedFalsePositive = normalizeCalendarNameFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const sourceSurface = normalizeCalendarNameCandidateSurface(candidate || sourceName);
      const hasSourceGate = hasCalendarNameAndrewsSourceGate({
        sourceGate,
        structuredSource
      });
      const canGenerate = Boolean(sourceSurface && hasSourceGate && normalizedKind !== CALENDAR_NAME_KIND.unknown && normalizedFalsePositive === CALENDAR_NAME_FALSE_POSITIVE_SOURCE.unknown);
      const classification = {
        kind: "calendar-name-candidate-classification",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        calendarKind: normalizedKind,
        calendarCycle: String(calendarCycle || ""),
        sourceName: String(sourceName || ""),
        nameFunction: String(nameFunction || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        diagnostics: [canGenerate ? "calendar-name-andrews-source-generated" : hasEvidence ? "calendar-name-needs-validation" : "calendar-name-source-gate-required", normalizedKind !== CALENDAR_NAME_KIND.unknown ? "calendar-name-kind-recognized" : "calendar-name-kind-unconfirmed", normalizedFalsePositive !== CALENDAR_NAME_FALSE_POSITIVE_SOURCE.unknown ? "calendar-name-false-positive-source" : canGenerate ? "calendar-name-structured-source" : "calendar-name-unconfirmed"],
        boundary: buildCalendarNameBoundaryMetadata()
      };
      return attachCalendarNameGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-calendar-name" : "classify-boundary",
        sourceInput: classification.candidate || classification.sourceName,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: canGenerate ? "orthography-bridge-realized" : "orthography-bridge-required",
          surface: classification.surface,
          surfaceForms: classification.surfaceForms
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "calendar-name-candidate",
          sourceStem: classification.sourceName,
          targetStem: classification.surface,
          sourceGate: classification.sourceGate
        }
      });
    }
    function classifyCalendarNameFalsePositive(source = "") {
      const normalizedSource = normalizeCalendarNameFalsePositiveSource(source);
      const classification = {
        kind: "calendar-name-false-positive",
        version: CALENDAR_NAME_BOUNDARY_VERSION,
        source: normalizedSource,
        isCalendarNameEvidence: false,
        isPersonalNameNncEvidence: false,
        isPlaceNameNncEvidence: false,
        generationAllowed: false,
        diagnostics: ["calendar-name-false-positive-source"],
        antiConflationRules: getCalendarNameAntiConflationRules()
      };
      return attachCalendarNameGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "CALENDAR_NAME_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CALENDAR_NAME_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "CALENDAR_NAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return CALENDAR_NAME_KIND; },
    });
    Object.defineProperty(api, "CALENDAR_NAME_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return CALENDAR_NAME_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "CALENDAR_NAME_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CALENDAR_NAME_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "CALENDAR_NAME_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CALENDAR_NAME_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeCalendarNameEnum = normalizeCalendarNameEnum;
    api.normalizeCalendarNameKind = normalizeCalendarNameKind;
    api.normalizeCalendarNameFalsePositiveSource = normalizeCalendarNameFalsePositiveSource;
    api.normalizeCalendarNameCandidateSurface = normalizeCalendarNameCandidateSurface;
    api.hasCalendarNameAndrewsSourceGate = hasCalendarNameAndrewsSourceGate;
    api.getCalendarNameAntiConflationRules = getCalendarNameAntiConflationRules;
    api.getCalendarNameStructuralQuestions = getCalendarNameStructuralQuestions;
    api.attachCalendarNameGrammarContract = attachCalendarNameGrammarContract;
    api.buildCalendarNameBoundaryMetadata = buildCalendarNameBoundaryMetadata;
    api.classifyCalendarNameCandidate = classifyCalendarNameCandidate;
    api.classifyCalendarNameFalsePositive = classifyCalendarNameFalsePositive;
    return api;
}

export function installCalendarNameGlobals(targetObject = globalThis) {
    const api = createCalendarNameApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
