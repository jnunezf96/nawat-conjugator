// Native wrapper generated from src/core/nnc/adjectival/adjectival.js.

export function createAdjectivalNncGlobals(targetObject = globalThis) {
    const ADJECTIVAL_NNC_BOUNDARY_VERSION = 1;
    const ADJECTIVAL_NNC_GENERATION_VERSION = 1;
    const ADJECTIVAL_NNC_FUNCTION = Object.freeze({
      predicateFunction: "predicate-function",
      patientiveAdjectival: "patientive-adjectival",
      adjectivalSurface: "adjectival-surface",
      potentialPatient: "potential-patient",
      modifierCandidate: "modifier-candidate",
      unknown: "unknown"
    });
    const ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      adjetivoRoute: "adjetivo-route",
      nominalizationProfile: "nominalization-profile",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      ordinaryNncFormulaSlots: "ordinary-nnc-formula-slots",
      translationAdjective: "translation-adjective",
      singleGeneratedWord: "single-generated-word",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADJECTIVAL_NNC_ANTI_CONFLATION_RULES = Object.freeze(["adjectival NNC function generation is opt-in and does not create a modification AST", "adjetivo route output is a generated surface, not complete Lessons 40-41 coverage", "nominalizationProfile adjectivalFunction is explanatory metadata, not modifier/head syntax", "Lessons 40-41 adjectival function is separate from Lessons 42-43 modification AST", "single generated words do not prove adjectival modification, supplementation, or topic relations", "Andrews adjectival categories govern grammar behavior, while Nawat/Pipil orthography governs output spelling"]);
    const ADJECTIVAL_NNC_DIAGNOSTIC_IDS = Object.freeze({
      unavailable: "adjectival-nnc-unavailable",
      requiresAbsolutiveState: "adjectival-nnc-requires-absolutive-state",
      requiresRootPlusYa: "adjectival-nnc-requires-root-plus-ya",
      rootPlusYaException: "adjectival-nnc-root-plus-ya-exception",
      segmentedRootPlusYaUnsupported: "adjectival-nnc-segmented-root-plus-ya-unsupported"
    });
    const ADJECTIVAL_NNC_FORMATION = Object.freeze({
      ordinaryAbsolutive: "ordinary-absolutive",
      rootPlusYaObsoletePreterit: "root-plus-ya-obsolete-preterit"
    });
    const ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE = Object.freeze({
      rootPlusYa: "root-plus-ya",
      denominalTiya: "denominal-tiya",
      segmentedDenominalTiya: "segmented-denominal-tiya"
    });
    const ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "functionKind",
      asks: "Does the generated surface function as predicate, modifier candidate, patientive adjective, VNC surface, or unknown?"
    }), Object.freeze({
      field: "sourceCategory",
      asks: "Is the source NNC, VNC, patientive, ordinary nounstem, or unknown?"
    }), Object.freeze({
      field: "predicateSurface",
      asks: "What role does the visible Nawat/Pipil surface have before any clause-level modification analysis?"
    }), Object.freeze({
      field: "adjectivalRole",
      asks: "Is there confirmed clause evidence for modifier/head behavior, or only an adjective-like word output?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided evidence supports adjectival function beyond route output?"
    })]);
    function normalizeAdjectivalNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdjectivalNncFunction(value = "") {
      return normalizeAdjectivalNncEnum(value, Object.values(ADJECTIVAL_NNC_FUNCTION), ADJECTIVAL_NNC_FUNCTION.unknown);
    }
    function normalizeAdjectivalNncFalsePositiveSource(value = "") {
      return normalizeAdjectivalNncEnum(value, Object.values(ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE), ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getAdjectivalNncAntiConflationRules() {
      return Array.from(ADJECTIVAL_NNC_ANTI_CONFLATION_RULES);
    }
    function getAdjectivalNncStructuralQuestions() {
      return ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildAdjectivalNncFunctionBoundaryMetadata() {
      return {
        kind: "adjectival-nnc-function-boundary",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        lessons: [40, 41],
        status: "partial",
        structuralSource: "Andrews Lessons 40-41",
        targetAuthority: "Andrews grammar rule with Nawat/Pipil orthography",
        generationAllowed: "opt-in",
        confirmedExamples: [],
        structuralQuestions: getAdjectivalNncStructuralQuestions(),
        boundaries: {
          hasAdjectiveModeOutputs: true,
          hasNominalizationProfileAdjectivalFunction: true,
          hasAdjectivalNncGeneration: true,
          hasOptInAdjectivalNncGeneration: true,
          hasModificationAst: false,
          hasConfirmedModifierHeadExamples: false,
          changesAdjectiveGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsAdjetivoOutputAsFullLessonEvidence: false
        },
        antiConflationRules: getAdjectivalNncAntiConflationRules()
      };
    }
    function buildAdjectivalNncBoundaryMetadata() {
      return buildAdjectivalNncFunctionBoundaryMetadata();
    }
    function classifyAdjectivalNncFunctionCandidate({
      candidate = "",
      functionKind = "",
      sourceCategory = "",
      predicateSurface = "",
      adjectivalRole = "",
      evidenceSource = "",
      falsePositiveSource = "",
      hasNominalizationProfile = false
    } = {}) {
      const normalizedFunction = normalizeAdjectivalNncFunction(functionKind);
      const normalizedFalsePositive = normalizeAdjectivalNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adjectival-nnc-function-candidate-classification",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        functionKind: normalizedFunction,
        sourceCategory: String(sourceCategory || ""),
        predicateSurface: String(predicateSurface || ""),
        adjectivalRole: String(adjectivalRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasNominalizationProfile: hasNominalizationProfile === true,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adjectival-nnc-needs-validation" : "adjectival-nnc-needs-nawat-evidence", normalizedFunction !== ADJECTIVAL_NNC_FUNCTION.unknown ? "adjectival-nnc-function-recognized" : "adjectival-nnc-function-unconfirmed", hasNominalizationProfile ? "nominalization-profile-adjectival-function-is-metadata" : "nominalization-profile-absent", normalizedFalsePositive !== ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE.unknown ? "adjectival-nnc-false-positive-source" : "adjectival-nnc-unconfirmed"],
        boundary: buildAdjectivalNncFunctionBoundaryMetadata()
      };
    }
    function classifyAdjectivalNncCandidate(options = {}) {
      return classifyAdjectivalNncFunctionCandidate({
        ...options,
        functionKind: options.functionKind || options.adjectivalFunction || "",
        predicateSurface: options.predicateSurface || options.surfaceRole || "",
        adjectivalRole: options.adjectivalRole || ""
      });
    }
    function classifyAdjectivalNncFalsePositive(source = "") {
      const normalizedSource = normalizeAdjectivalNncFalsePositiveSource(source);
      return {
        kind: "adjectival-nnc-false-positive",
        version: ADJECTIVAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdjectivalNncEvidence: false,
        isAdjectivalFunctionEvidence: false,
        isModifierHeadEvidence: false,
        isAdjectivalParadigmEvidence: false,
        isModificationEvidence: false,
        isSupplementationEvidence: false,
        isTopicEvidence: false,
        generationAllowed: false,
        diagnostics: ["adjectival-nnc-false-positive-source"],
        antiConflationRules: getAdjectivalNncAntiConflationRules()
      };
    }
    function normalizeAdjectivalNncText(value = "") {
      return String(value || "").trim().toLowerCase();
    }
    function normalizeAdjectivalNncState(value = "") {
      const normalized = normalizeAdjectivalNncText(value || "absolutive");
      if (normalized === "absolutivo") {
        return "absolutive";
      }
      if (normalized === "posesivo" || normalized === "possessed") {
        return "possessive";
      }
      return normalized || "absolutive";
    }
    function buildAdjectivalNncDiagnostic(id = "", message = "", severity = "unsupported") {
      return {
        id,
        severity,
        message
      };
    }
    function isRootPlusYaAdjectivalNncFormation(value = "") {
      return normalizeAdjectivalNncText(value) === ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit;
    }
    function shouldGenerateRootPlusYaAdjectivalNnc(options = {}) {
      return options?.rootPlusYaObsoletePreterit === true || isRootPlusYaAdjectivalNncFormation(options?.formation) || isRootPlusYaAdjectivalNncFormation(options?.subtype) || isRootPlusYaAdjectivalNncFormation(options?.sourceFormation);
    }
    function buildAdjectivalNncFormulaEchoFromSlots(formulaSlots = null) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const subject = formulaSlots.subjectPerson || {};
      const predicate = formulaSlots.predicate || {};
      const connector = formulaSlots.subjectNumberConnector || {};
      const stem = String(predicate.stem || "").trim();
      if (!stem) {
        return "";
      }
      const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const connectorSurface = String(connector.connector || connector.surface || "Ø") || "Ø";
      return `#${prefix}...${suffix}(${stem})${connectorSurface}#`;
    }
    function buildRootPlusYaAdjectivalNncFormulaSlots({
      rootPlusYaBase = "",
      subject = null,
      sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa
    } = {}) {
      return {
        subjectPerson: {
          role: "subject-person",
          slot: "pers1-pers2",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
          displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
          label: String(subject?.personSubKey || "3sg")
        },
        predicate: {
          role: "predicate",
          slot: "STEM",
          stem: rootPlusYaBase,
          state: "absolutive",
          sourceFormation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
          sourceFormationSubtype
        },
        subjectNumberConnector: {
          role: "subject-number-connector",
          slot: "num1-num2",
          connector: "k",
          surface: "k",
          label: "obsolete preterit Class A subject-number connector",
          belongsTo: "subject",
          referenceNumber: "singular",
          pluralType: "",
          nounClass: "",
          connectorClass: "preterit-agentive-a",
          notNounSuffix: true,
          notStatePosition: true
        }
      };
    }
    function resolveAdjectivalNncParsedVerb(rawStem = "") {
      const raw = String(rawStem || "").trim();
      if (!raw) {
        return null;
      }
      return typeof targetObject.parseVerbInput === "function" ? targetObject.parseVerbInput(raw) : {
        sourceRawVerb: raw,
        verb: raw.replace(/[()]/g, ""),
        analysisVerb: raw.replace(/[()]/g, ""),
        isRootPlusYa: false,
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isWeya: false
      };
    }
    function resolveRootPlusYaAdjectivalNncSource(parsedVerb = null) {
      if (!parsedVerb || typeof parsedVerb !== "object") {
        return {
          supported: false,
          rootPlusYaBase: "",
          sourceFormationSubtype: "",
          diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa
        };
      }
      const sourceVerb = String(parsedVerb.verb || parsedVerb.analysisVerb || "").trim();
      const rawSource = String(parsedVerb.sourceRawVerb || parsedVerb.displayVerb || "").trim();
      const displayCore = String(parsedVerb.displayCore || "").trim();
      const hasSlashTiyaSource = /\/\s*tiya\s*\)?$/i.test(rawSource) || /\/\s*tiya\s*$/i.test(displayCore);
      const sourceEndsInTiya = /tiya$/i.test(sourceVerb);
      const parsedBase = String(parsedVerb.rootPlusYaBasePronounceable || parsedVerb.rootPlusYaBase || parsedVerb.bareRootPlusYaBasePronounceable || parsedVerb.bareRootPlusYaBase || "").trim();
      if (parsedVerb.isWeya === true) {
        return {
          supported: false,
          rootPlusYaBase: parsedBase,
          sourceFormationSubtype: "",
          diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException
        };
      }
      if (hasSlashTiyaSource && sourceEndsInTiya) {
        return {
          supported: true,
          rootPlusYaBase: sourceVerb.slice(0, -2),
          sourceFormationSubtype: ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.segmentedDenominalTiya,
          diagnosticId: ""
        };
      }
      if (parsedVerb.hasSlashMarker === true) {
        return {
          supported: false,
          rootPlusYaBase: parsedBase,
          sourceFormationSubtype: "",
          diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported
        };
      }
      if (parsedVerb.isRootPlusYa === true && parsedBase) {
        return {
          supported: true,
          rootPlusYaBase: parsedBase,
          sourceFormationSubtype: sourceEndsInTiya ? ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.denominalTiya : ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa,
          diagnosticId: ""
        };
      }
      return {
        supported: false,
        rootPlusYaBase: parsedBase,
        sourceFormationSubtype: "",
        diagnosticId: ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa
      };
    }
    function buildRootPlusYaAdjectivalNncFunctionFrame({
      parsedVerb = null,
      rootPlusYaBase = "",
      formulaSlots = null,
      requestedState = "absolutive",
      role = "predicate-surface",
      sourceFormationSubtype = ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE.rootPlusYa
    } = {}) {
      const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
      return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-root-plus-ya",
        lessonRef: "Andrews 40.9",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.adjectivalSurface,
        role,
        rule: "root-plus-ya adjectival NNC uses the obsolete preterit/root base plus the subject-number connector",
        formation: ADJECTIVAL_NNC_FORMATION.rootPlusYaObsoletePreterit,
        sourceFormationSubtype,
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: "absolutive",
        sourceVerb: parsedVerb?.sourceRawVerb || parsedVerb?.verb || "",
        sourceRootPlusYaBase: rootPlusYaBase,
        sourceFormulaSlots: formulaSlots,
        sourceFormulaEcho: formulaEcho,
        usesObsoletePreteritBase: true,
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF"
      };
    }
    function buildRootPlusYaAdjectivalNncUnsupportedOutput({
      stem = "",
      requestedState = "absolutive",
      diagnostic = null,
      parsedVerb = null,
      rootPlusYaBase = "",
      sourceFormationSubtype = ""
    } = {}) {
      const diagnostics = diagnostic ? [diagnostic] : [];
      const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase: rootPlusYaBase || parsedVerb?.rootPlusYaBasePronounceable || parsedVerb?.rootPlusYaBase || "",
        formulaSlots: null,
        requestedState,
        sourceFormationSubtype
      });
      return {
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(parsedVerb?.verb || stem || ""),
        state: requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        diagnostics
      };
    }
    function buildAdjectivalNncFunctionFrame({
      sourceNnc = null,
      requestedState = "absolutive",
      role = "modifier-candidate"
    } = {}) {
      return {
        version: ADJECTIVAL_NNC_GENERATION_VERSION,
        outputKind: "adjectival-nnc-function",
        lessonRef: "Andrews 40.1",
        nncKind: "adjectival",
        functionKind: ADJECTIVAL_NNC_FUNCTION.modifierCandidate,
        role,
        rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
        requiredPredicateState: "absolutive",
        requestedPredicateState: requestedState,
        actualPredicateState: sourceNnc?.state || "",
        sourceClauseKind: sourceNnc?.clauseKind || "",
        sourceFormulaSlots: sourceNnc?.nncBasic?.formulaSlots || sourceNnc?.clauseFrame?.formulaSlots || null,
        sourceFormulaEcho: sourceNnc?.nncBasic?.formulaEcho || sourceNnc?.clauseFrame?.formulaEcho || "",
        hasModificationAst: false,
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF"
      };
    }
    function buildAdjectivalNncUnsupportedOutput({
      stem = "",
      requestedState = "absolutive",
      diagnostic = null,
      sourceNnc = null
    } = {}) {
      const diagnostics = diagnostic ? [diagnostic] : [];
      if (sourceNnc && Array.isArray(sourceNnc.diagnostics)) {
        diagnostics.push(...sourceNnc.diagnostics);
      }
      return {
        outputKind: "adjectival-nnc-function",
        clauseKind: "nominal-nuclear-clause",
        supported: false,
        result: "",
        surfaceForms: [],
        stem: String(sourceNnc?.stem || stem || ""),
        state: sourceNnc?.state || requestedState,
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: buildAdjectivalNncFunctionFrame({
          sourceNnc,
          requestedState
        }),
        sourceNnc: sourceNnc || null,
        diagnostics
      };
    }
    function generateAdjectivalNncFunctionOutput({
      stem = "",
      state = "absolutive",
      subject = null,
      number = "singular",
      pluralType = "auto",
      nounClass = "",
      animacy = "",
      role = "modifier-candidate"
    } = {}) {
      const requestedState = normalizeAdjectivalNncState(state);
      if (requestedState !== "absolutive") {
        return buildAdjectivalNncUnsupportedOutput({
          stem,
          requestedState,
          diagnostic: buildAdjectivalNncDiagnostic(ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState, "Adjectival NNC generation follows Andrews 40.1 and requires absolutive predicate state.")
        });
      }
      if (typeof targetObject.generateOrdinaryNncParadigm !== "function") {
        return buildAdjectivalNncUnsupportedOutput({
          stem,
          requestedState,
          diagnostic: buildAdjectivalNncDiagnostic(ADJECTIVAL_NNC_DIAGNOSTIC_IDS.unavailable, "Ordinary NNC generation is unavailable, so adjectival NNC function generation cannot run.")
        });
      }
      const sourceNnc = targetObject.generateOrdinaryNncParadigm({
        stem,
        state: "absolutive",
        subject,
        number,
        pluralType,
        nounClass,
        animacy
      });
      const frame = buildAdjectivalNncFunctionFrame({
        sourceNnc,
        requestedState,
        role
      });
      if (!sourceNnc?.supported) {
        return buildAdjectivalNncUnsupportedOutput({
          stem,
          requestedState,
          sourceNnc
        });
      }
      return {
        ...sourceNnc,
        outputKind: "adjectival-nnc-function",
        generationRoute: "adjectival-nnc",
        adjectivalNncFunctionFrame: frame,
        sourceNnc,
        diagnostics: Array.isArray(sourceNnc.diagnostics) ? [...sourceNnc.diagnostics] : []
      };
    }
    function generateRootPlusYaAdjectivalNncOutput({
      stem = "",
      state = "absolutive",
      subject = null,
      role = "predicate-surface"
    } = {}) {
      const requestedState = normalizeAdjectivalNncState(state);
      const parsedVerb = resolveAdjectivalNncParsedVerb(stem);
      if (requestedState !== "absolutive") {
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
          stem,
          requestedState,
          parsedVerb,
          diagnostic: buildAdjectivalNncDiagnostic(ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresAbsolutiveState, "Root-plus-ya adjectival NNC generation follows Andrews 40.9 and requires absolutive predicate state.")
        });
      }
      const source = resolveRootPlusYaAdjectivalNncSource(parsedVerb);
      const rootPlusYaBase = source.rootPlusYaBase;
      if (!source.supported || !rootPlusYaBase) {
        const diagnosticId = source.diagnosticId || ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa;
        const messageById = {
          [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.rootPlusYaException]: "Andrews 40.9 excludes the hue-i-ya/weya path from the obsolete-preterit adjectival route.",
          [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.segmentedRootPlusYaUnsupported]: "Segmented slash sources require a denominal tiya source before using the Andrews 40.9 adjectival route.",
          [ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa]: "Root-plus-ya adjectival NNC generation requires a recognized root-plus-ya source."
        };
        return buildRootPlusYaAdjectivalNncUnsupportedOutput({
          stem,
          requestedState,
          parsedVerb,
          rootPlusYaBase,
          sourceFormationSubtype: source.sourceFormationSubtype,
          diagnostic: buildAdjectivalNncDiagnostic(diagnosticId, messageById[diagnosticId] || messageById[ADJECTIVAL_NNC_DIAGNOSTIC_IDS.requiresRootPlusYa])
        });
      }
      const subjectSlot = subject && typeof subject === "object" ? subject : {};
      const formulaSlots = buildRootPlusYaAdjectivalNncFormulaSlots({
        rootPlusYaBase,
        subject: subjectSlot,
        sourceFormationSubtype: source.sourceFormationSubtype
      });
      const formulaEcho = buildAdjectivalNncFormulaEchoFromSlots(formulaSlots);
      const subjectPrefix = String(subjectSlot.subjectPrefix || "");
      const result = `${subjectPrefix}${rootPlusYaBase}k`;
      const frame = buildRootPlusYaAdjectivalNncFunctionFrame({
        parsedVerb,
        rootPlusYaBase,
        formulaSlots,
        requestedState,
        role,
        sourceFormationSubtype: source.sourceFormationSubtype
      });
      return {
        outputKind: "adjectival-nnc-root-plus-ya",
        clauseKind: "nominal-nuclear-clause",
        supported: true,
        result,
        surfaceForms: [result],
        stem: String(parsedVerb?.verb || stem || ""),
        state: "absolutive",
        generationRoute: "adjectival-nnc",
        formulaSlots,
        formulaEcho,
        adjectivalNncFunctionFrame: frame,
        rootPlusYaAdjectivalNncFrame: frame,
        diagnostics: []
      };
    }

    const api = {};
    Object.defineProperty(api, "ADJECTIVAL_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_GENERATION_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_GENERATION_VERSION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_FUNCTION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_FUNCTION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_DIAGNOSTIC_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_DIAGNOSTIC_IDS; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_FORMATION", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_FORMATION; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_SOURCE_FORMATION_SUBTYPE; },
    });
    Object.defineProperty(api, "ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADJECTIVAL_NNC_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdjectivalNncEnum = normalizeAdjectivalNncEnum;
    api.normalizeAdjectivalNncFunction = normalizeAdjectivalNncFunction;
    api.normalizeAdjectivalNncFalsePositiveSource = normalizeAdjectivalNncFalsePositiveSource;
    api.getAdjectivalNncAntiConflationRules = getAdjectivalNncAntiConflationRules;
    api.getAdjectivalNncStructuralQuestions = getAdjectivalNncStructuralQuestions;
    api.buildAdjectivalNncFunctionBoundaryMetadata = buildAdjectivalNncFunctionBoundaryMetadata;
    api.buildAdjectivalNncBoundaryMetadata = buildAdjectivalNncBoundaryMetadata;
    api.classifyAdjectivalNncFunctionCandidate = classifyAdjectivalNncFunctionCandidate;
    api.classifyAdjectivalNncCandidate = classifyAdjectivalNncCandidate;
    api.classifyAdjectivalNncFalsePositive = classifyAdjectivalNncFalsePositive;
    api.normalizeAdjectivalNncText = normalizeAdjectivalNncText;
    api.normalizeAdjectivalNncState = normalizeAdjectivalNncState;
    api.buildAdjectivalNncDiagnostic = buildAdjectivalNncDiagnostic;
    api.isRootPlusYaAdjectivalNncFormation = isRootPlusYaAdjectivalNncFormation;
    api.shouldGenerateRootPlusYaAdjectivalNnc = shouldGenerateRootPlusYaAdjectivalNnc;
    api.buildAdjectivalNncFormulaEchoFromSlots = buildAdjectivalNncFormulaEchoFromSlots;
    api.buildRootPlusYaAdjectivalNncFormulaSlots = buildRootPlusYaAdjectivalNncFormulaSlots;
    api.resolveAdjectivalNncParsedVerb = resolveAdjectivalNncParsedVerb;
    api.resolveRootPlusYaAdjectivalNncSource = resolveRootPlusYaAdjectivalNncSource;
    api.buildRootPlusYaAdjectivalNncFunctionFrame = buildRootPlusYaAdjectivalNncFunctionFrame;
    api.buildRootPlusYaAdjectivalNncUnsupportedOutput = buildRootPlusYaAdjectivalNncUnsupportedOutput;
    api.buildAdjectivalNncFunctionFrame = buildAdjectivalNncFunctionFrame;
    api.buildAdjectivalNncUnsupportedOutput = buildAdjectivalNncUnsupportedOutput;
    api.generateAdjectivalNncFunctionOutput = generateAdjectivalNncFunctionOutput;
    api.generateRootPlusYaAdjectivalNncOutput = generateRootPlusYaAdjectivalNncOutput;
    return api;
}

export function installAdjectivalNncGlobals(targetObject = globalThis) {
    const api = createAdjectivalNncGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
