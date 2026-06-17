// Native wrapper generated from src/core/derivation/frequentative/frequentative.js.

export function createFrequentativeApi(targetObject = globalThis) {
    const FREQUENTATIVE_BOUNDARY_VERSION = 1;
    const FREQUENTATIVE_TYPE = Object.freeze({
      ordinary: "ordinary",
      objectPronounReduplicating: "object-pronoun-reduplicating",
      destockal: "destockal",
      uncertain: "uncertain",
      nonactive: "nonactive",
      unknown: "unknown"
    });
    const FREQUENTATIVE_REPLICATION_TARGET = Object.freeze({
      stem: "stem",
      objectPronoun: "object-pronoun",
      sourcePrefix: "source-prefix",
      nonactiveStem: "nonactive-stem",
      unknown: "unknown"
    });
    const FREQUENTATIVE_FALSE_POSITIVE_SOURCE = Object.freeze({
      genericReduplication: "generic-reduplication",
      preteritDiagnostic: "preterit-diagnostic",
      ordinaryNncDistributive: "ordinary-nnc-distributive",
      patientiveAdjectival: "patientive-adjectival",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const FREQUENTATIVE_ANTI_CONFLATION_RULES = Object.freeze(["frequentative boundary metadata is not generation", "generic reduplication is not a frequentative derivation engine", "preterit reduplication diagnostics are not frequentative evidence", "ordinary NNC distributive reduplication is not VNC frequentative derivation", "patientive/adjectival reduplication is not VNC frequentative derivation", "Andrews frequentative categories are architecture, not Nawat/Pipil form authority"]);
    const FREQUENTATIVE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "sourceStem",
      asks: "Which VNC stem is the source of the frequentative candidate?"
    }), Object.freeze({
      field: "frequentativeType",
      asks: "Is the candidate ordinary, object-pronoun-reduplicating, destockal, uncertain, nonactive, or unknown?"
    }), Object.freeze({
      field: "reduplicationTarget",
      asks: "Does reduplication target the stem, object pronoun, source prefix, nonactive stem, or an unknown position?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided evidence supports the form?"
    })]);
    const LESSON27_FREQUENTATIVE_VALIDATION_REFS = Object.freeze(["src/tests/frequentative.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON27_FREQUENTATIVE_PDF_REFS = Object.freeze(["Andrews Lesson 27.1", "Andrews Lesson 27.2", "Andrews Lesson 27.3", "Andrews Lesson 27.4", "Andrews Lesson 27.5", "Andrews Lesson 27.6"]);
    const LESSON27_FREQUENTATIVE_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-27-frequentative-overview-frame",
      sourceSection: "Andrews 27.1",
      meanings: Object.freeze(["repetition", "continuity", "intensity", "multiplicity of agents, patients, occasions, or places"]),
      prefixShapes: Object.freeze(["optional consonant plus short vowel plus glottal stop", "optional consonant plus long vowel", "optional consonant plus short vowel"]),
      sourceInitialConsonantOptionalBySourceStem: true
    });
    const LESSON27_ORDINARY_FREQUENTATIVE_FRAME = Object.freeze({
      kind: "lesson-27-ordinary-frequentative-frame",
      sourceSection: "Andrews 27.2",
      noStrictShapeSelectionRules: true,
      shapes: Object.freeze([Object.freeze({
        id: "short-vowel-glottal",
        meaning: "intensity with multiple separately executed performances",
        emphasis: "singly defined reiteration, separate individuals, occasions, or places"
      }), Object.freeze({
        id: "long-vowel",
        meaning: "intensity with smooth continuity in repeated performance",
        emphasis: "interconnectedness or uniformity"
      }), Object.freeze({
        id: "short-vowel",
        meaning: "less used ordinary frequentative formation",
        emphasis: "repetition without the first two shapes' clearer profile"
      })]),
      idiomaticMeaningsPossible: true,
      sourceStemMayBeUnattested: true,
      canUndergoTlaFusion: true,
      tlaImpersonalCanReduplicateSourceOrPrefix: true,
      supportiveIUsuallyDropsBeforeReduplication: true,
      multipleReduplicationCanBeRecursive: true
    });
    const LESSON27_OBJECT_PRONOUN_REDUPLICATION_FRAME = Object.freeze({
      kind: "lesson-27-object-pronoun-reduplication-frame",
      sourceSection: "Andrews 27.3",
      tlaFusion: Object.freeze({
        target: "nonspecific object pronoun tla after fusion into an intransitive stem",
        reduplicatedForms: Object.freeze(["tlah-tla", "tla-tla"]),
        canFuseWithReduplicatedVerbstem: true
      }),
      reflexiveObject: Object.freeze({
        target: "mainline reflexive object pronoun before supportive-i stems",
        partialReduplicatedForms: Object.freeze(["m-oh-o", "n-oh-o", "t-oh-o"]),
        supportiveIDeleted: true,
        initialConsonantOccursOnce: true
      })
    });
    const LESSON27_DESTOCKAL_FREQUENTATIVE_FRAME = Object.freeze({
      kind: "lesson-27-destockal-frequentative-frame",
      sourceSection: "Andrews 27.4",
      intransitiveDestockal: Object.freeze({
        sourceThemeSuffixes: Object.freeze(["ni", "hui"]),
        targetThemeSuffix: "ca",
        reduplicativePrefixShape: "short vowel",
        nonactiveStems: Object.freeze(["c-o", "c-o-hua"]),
        nonactiveUse: "impersonal voice only",
        impersonalTlaCanBePrefixedAndReduplicated: true,
        targetClass: "Class A"
      }),
      causativeDestockal: Object.freeze({
        sourceFormatives: Object.freeze(["n", "ni", "hu"]),
        targetFormative: "tz-a",
        keepsCausativeA: true,
        reduplicativePrefixShape: "short vowel",
        targetClass: "Class B"
      }),
      lexicalizedOnlyFrequentativesPossible: true,
      fusedStockVowelRemainsLong: true,
      tzaCanHaveApplicativeMeaning: true,
      applicativeOfCausativeDestockal: "change tz-a to ch-i and add lia",
      typeTwoCausativeFromFrequentativeIntransitivePossibleButInfrequent: true
    });
    const LESSON27_UNCERTAIN_FREQUENTATIVE_FRAME = Object.freeze({
      kind: "lesson-27-uncertain-frequentative-frame",
      sourceSection: "Andrews 27.5",
      detailsUnclear: true,
      semanticTendency: Object.freeze(["auditory effects", "visual effects", "onomatopoeic roots"]),
      caType: Object.freeze({
        operation: "add ca to a root with reduplicative prefix",
        causativeCounterpart: "tz-a, sometimes with applicative force"
      }),
      tzcaType: Object.freeze({
        operation: "replace a final syllable with tz-ca and add a reduplicative prefix",
        canOccurWithoutReduplication: true
      })
    });
    const LESSON27_NONACTIVE_FREQUENTATIVE_FRAME = Object.freeze({
      kind: "lesson-27-nonactive-frequentative-frame",
      sourceSection: "Andrews 27.6",
      nonactiveVerbstemsCanUndergoFrequentativeDerivation: true,
      impersonalVncMeaning: "multiplicity of individual acts within a collective action"
    });
    const LESSON27_FREQUENTATIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson27-frequentative-overview",
      andrewsSection: "27.1",
      category: "frequentative-overview",
      directiveEs: "El frecuentativo expresa repeticion, continuidad, intensidad o multiplicidad por prefijo reduplicativo.",
      engineSurface: "frequentative boundary metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-ordinary-glottal",
      andrewsSection: "27.2.1",
      category: "ordinary-short-vowel-glottal",
      directiveEs: "La forma con vocal corta y cierre glotal suele marcar intensidad con actos separados.",
      engineSurface: "ordinary frequentative candidate classification",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson27-ordinary-long-vowel",
      andrewsSection: "27.2.2",
      category: "ordinary-long-vowel",
      directiveEs: "La forma con vocal larga suele marcar continuidad uniforme o repeticion conectada.",
      engineSurface: "ordinary frequentative candidate classification",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson27-ordinary-short-vowel",
      andrewsSection: "27.2.3",
      category: "ordinary-short-vowel",
      directiveEs: "La forma con vocal corta es menos usada; fuentes con i de apoyo y reduplicacion recursiva necesitan diagnostico.",
      engineSurface: "ordinary frequentative candidate classification",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson27-tla-reduplication",
      andrewsSection: "27.3.1",
      category: "object-pronoun-tla-reduplication",
      directiveEs: "En tla fusion, tla puede reduplicarse porque ya forma parte del tronco intransitivo.",
      engineSurface: "object-pronoun frequentative classifier",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-reflexive-reduplication",
      andrewsSection: "27.3.2",
      category: "reflexive-object-reduplication",
      directiveEs: "El reflexivo principal puede reduplicarse parcialmente ante troncos con i de apoyo.",
      engineSurface: "object-pronoun frequentative classifier",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-intransitive-destockal",
      andrewsSection: "27.4.1",
      category: "intransitive-destockal-frequentative",
      directiveEs: "Destockales intransitivos cambian ni/hui a ca con prefijo de vocal corta; no activos c-o/c-o-hua son solo impersonales.",
      engineSurface: "destockal frequentative classifier",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson27-causative-destockal",
      andrewsSection: "27.4.2",
      category: "causative-destockal-frequentative",
      directiveEs: "Destockales causativos conservan a y cambian n/ni/hu a tz para formar tz-a.",
      engineSurface: "destockal frequentative classifier",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson27-lexicalized-destockal",
      andrewsSection: "27.4.3",
      category: "lexicalized-destockal-frequentative",
      directiveEs: "A veces solo sobreviven las formas frecuentativas y la vocal fusionada del stock queda larga.",
      engineSurface: "destockal frequentative classifier",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson27-tza-applicative-force",
      andrewsSection: "27.4.4",
      category: "tza-causative-applicative-ambiguity",
      directiveEs: "La unidad tz-a puede tener lectura causativa o aplicativa segun contexto.",
      engineSurface: "ambiguity diagnostics",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-destockal-applicative",
      andrewsSection: "27.4.5",
      category: "destockal-frequentative-applicative",
      directiveEs: "El causativo destockal frecuentativo forma aplicativo cambiando tz-a a ch-i y agregando lia.",
      engineSurface: "destockal applicative classifier",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson27-destockal-type-two-causative",
      andrewsSection: "27.4.6",
      category: "destockal-frequentative-type-two-causative",
      directiveEs: "Algunos intransitivos destockales frecuentativos tienen causativo tipo 2, pero no es frecuente.",
      engineSurface: "destockal causative classifier",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson27-uncertain-ca",
      andrewsSection: "27.5.1",
      category: "uncertain-ca-frequentative",
      directiveEs: "Un tipo incierto usa ca con raiz reduplicada, frecuentemente auditivo, visual u onomatopeyico.",
      engineSurface: "uncertain frequentative classifier",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-uncertain-tzca",
      andrewsSection: "27.5.2",
      category: "uncertain-tzca-frequentative",
      directiveEs: "Otro tipo incierto reemplaza silaba final por tz-ca y agrega prefijo reduplicativo.",
      engineSurface: "uncertain frequentative classifier",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson27-nonactive-frequentative",
      andrewsSection: "27.6",
      category: "nonactive-frequentative",
      directiveEs: "Los troncos no activos pueden frecuentativizarse; la CNV impersonal marca actos individuales dentro de una accion colectiva.",
      engineSurface: "nonactive frequentative classifier",
      implementationState: "partial",
      redirectAction: "block-generation"
    })]);
    function cloneFrequentativeLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneFrequentativeLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneFrequentativeLessonRecord(value)]));
    }
    function getLesson27FrequentativeSubsectionInventory() {
      return LESSON27_FREQUENTATIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON27_FREQUENTATIVE_VALIDATION_REFS)
      }));
    }
    function attachFrequentativeGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "vnc-derivation-boundary",
        routeFamily: "frequentative",
        structuralSource: "Andrews Lesson 27",
        andrewsRefs: ["Andrews Lesson 27"],
        ...options
      });
    }
    function normalizeFrequentativeEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeFrequentativeType(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_TYPE), FREQUENTATIVE_TYPE.unknown);
    }
    function normalizeFrequentativeReplicationTarget(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_REPLICATION_TARGET), FREQUENTATIVE_REPLICATION_TARGET.unknown);
    }
    function normalizeFrequentativeFalsePositiveSource(value = "") {
      return normalizeFrequentativeEnum(value, Object.values(FREQUENTATIVE_FALSE_POSITIVE_SOURCE), FREQUENTATIVE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getFrequentativeAntiConflationRules() {
      return Array.from(FREQUENTATIVE_ANTI_CONFLATION_RULES);
    }
    function getFrequentativeStructuralQuestions() {
      return FREQUENTATIVE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildFrequentativeBoundaryMetadata() {
      const subsectionInventory = getLesson27FrequentativeSubsectionInventory();
      const boundary = {
        kind: "frequentative-boundary",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        lesson: 27,
        status: "partial",
        structuralSource: "Andrews Lesson 27",
        pdfRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
        subsectionInventory,
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getFrequentativeStructuralQuestions(),
        boundaries: {
          hasFrequentativeGeneration: false,
          hasConfirmedFixtureData: false,
          reusesGenericReduplicationAsEvidence: false,
          changesExistingReduplicationHelpers: false,
          changesVncGeneration: false
        },
        antiConflationRules: getFrequentativeAntiConflationRules()
      };
      return attachFrequentativeGrammarContract(boundary, {
        metadataKind: "frequentative-boundary",
        routeStage: "classify-boundary",
        supported: false,
        andrewsRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
        morphBoundaryFrame: boundary,
        targetContract: {
          metadataKind: "frequentative-boundary",
          generationAllowed: false,
          hasFrequentativeGeneration: false
        }
      });
    }
    function buildLesson27FrequentativePursuitFrame() {
      const subsectionInventory = getLesson27FrequentativeSubsectionInventory();
      const overviewFrame = cloneFrequentativeLessonRecord(LESSON27_FREQUENTATIVE_OVERVIEW_FRAME);
      const ordinaryFrame = cloneFrequentativeLessonRecord(LESSON27_ORDINARY_FREQUENTATIVE_FRAME);
      const objectPronounFrame = cloneFrequentativeLessonRecord(LESSON27_OBJECT_PRONOUN_REDUPLICATION_FRAME);
      const destockalFrame = cloneFrequentativeLessonRecord(LESSON27_DESTOCKAL_FREQUENTATIVE_FRAME);
      const uncertainFrame = cloneFrequentativeLessonRecord(LESSON27_UNCERTAIN_FREQUENTATIVE_FRAME);
      const nonactiveFrame = cloneFrequentativeLessonRecord(LESSON27_NONACTIVE_FREQUENTATIVE_FRAME);
      const remainingGaps = ["No confirmed Nawat/Pipil frequentative fixture inventory licenses finite frequentative output.", "Ordinary frequentative prefix-shape selection is not rule-complete and often lexical, idiomatic, recursive, or based on unattested sources.", "Object-pronoun, destockal, uncertain, and nonactive frequentative formations are only classified; they are not generation routes.", "Frequentative causative/applicative ambiguity, nonactive impersonal use, and Andrews Classical examples remain diagnostic until Nawat evidence and Appendix-style validation exist."];
      const frame = {
        kind: "lesson-27-frequentative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 27,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-27-frequentative-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 27.1-27.6 against current frequentative boundary metadata, generic reduplication helpers, object-pronoun reduplication, destockal frequentatives, uncertain formations, and nonactive frequentatives.",
          andrewsRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON27_FREQUENTATIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-27-frequentative-audit",
          result: "hit",
          correction: "Lesson 27 now records Andrews ordinary, object-pronoun, destockal, uncertain, and nonactive frequentative categories while keeping generation blocked and current generic reduplication helpers marked as non-evidence.",
          andrewsRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON27_FREQUENTATIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        ordinaryFrame,
        objectPronounFrame,
        destockalFrame,
        uncertainFrame,
        nonactiveFrame,
        currentEngineBoundary: {
          frequentativeGenerationImplemented: false,
          boundaryMetadataImplemented: true,
          candidateClassifierImplemented: true,
          falsePositiveClassifierImplemented: true,
          genericReduplicationNotEvidence: true,
          ordinaryPrefixSelectionIncomplete: true,
          objectPronounReduplicationDiagnosticOnly: true,
          destockalFrequentativeGenerationMissing: true,
          uncertainFormationDiagnosticOnly: true,
          nonactiveFrequentativeGenerationMissing: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachFrequentativeGrammarContract(frame, {
        metadataKind: "lesson-27-frequentative-pursuit-frame",
        routeStage: "audit-lesson-27",
        supported: true,
        andrewsRefs: Array.from(LESSON27_FREQUENTATIVE_PDF_REFS),
        sourceInput: "Andrews Lesson 27.1-27.6",
        morphBoundaryFrame: {
          overviewFrame,
          ordinaryFrame,
          objectPronounFrame,
          destockalFrame,
          uncertainFrame,
          nonactiveFrame
        },
        stemFrame: {
          stemKind: "frequentative-verbstem",
          sourceStem: "VNC stem, object pronoun, destockal stem, uncertain root, or nonactive stem",
          targetStem: "frequentative candidate",
          reduplicationTarget: "stem/object-pronoun/nonactive-stem/source-prefix",
          frequentativeTypes: Object.values(FREQUENTATIVE_TYPE).filter(value => value !== FREQUENTATIVE_TYPE.unknown)
        },
        targetContract: {
          metadataKind: "lesson-27-frequentative-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["frequentative-diagnostic-only", "frequentative-needs-nawat-evidence"]
      });
    }
    function classifyFrequentativeCandidate({
      sourceStem = "",
      candidate = "",
      frequentativeType = "",
      reduplicationTarget = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedType = normalizeFrequentativeType(frequentativeType);
      const normalizedTarget = normalizeFrequentativeReplicationTarget(reduplicationTarget);
      const normalizedFalsePositive = normalizeFrequentativeFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "frequentative-candidate-classification",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        frequentativeType: normalizedType,
        reduplicationTarget: normalizedTarget,
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "frequentative-needs-validation" : "frequentative-needs-nawat-evidence", normalizedFalsePositive !== FREQUENTATIVE_FALSE_POSITIVE_SOURCE.unknown ? "frequentative-false-positive-source" : "frequentative-unconfirmed"],
        boundary: buildFrequentativeBoundaryMetadata()
      };
      return attachFrequentativeGrammarContract(classification, {
        metadataKind: "frequentative-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        supported: false,
        diagnostics: classification.diagnostics,
        stemFrame: {
          stemKind: "frequentative-candidate",
          sourceStem: classification.sourceStem,
          targetStem: classification.candidate,
          reduplicationTarget: normalizedTarget,
          frequentativeType: normalizedType
        },
        targetContract: {
          metadataKind: "frequentative-candidate-classification",
          generationAllowed: false,
          frequentativeType: normalizedType,
          reduplicationTarget: normalizedTarget
        }
      });
    }
    function classifyFrequentativeFalsePositive(source = "") {
      const normalizedSource = normalizeFrequentativeFalsePositiveSource(source);
      const classification = {
        kind: "frequentative-false-positive",
        version: FREQUENTATIVE_BOUNDARY_VERSION,
        source: normalizedSource,
        isFrequentativeEvidence: false,
        generationAllowed: false,
        diagnostics: ["frequentative-false-positive-source"],
        antiConflationRules: getFrequentativeAntiConflationRules()
      };
      return attachFrequentativeGrammarContract(classification, {
        metadataKind: "frequentative-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics
      });
    }

    const api = {};
    Object.defineProperty(api, "FREQUENTATIVE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_TYPE; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_REPLICATION_TARGET", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_REPLICATION_TARGET; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "FREQUENTATIVE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return FREQUENTATIVE_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON27_FREQUENTATIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_FREQUENTATIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON27_FREQUENTATIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_FREQUENTATIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON27_FREQUENTATIVE_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_FREQUENTATIVE_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_ORDINARY_FREQUENTATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_ORDINARY_FREQUENTATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_OBJECT_PRONOUN_REDUPLICATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_OBJECT_PRONOUN_REDUPLICATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_DESTOCKAL_FREQUENTATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_DESTOCKAL_FREQUENTATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_UNCERTAIN_FREQUENTATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_UNCERTAIN_FREQUENTATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_NONACTIVE_FREQUENTATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_NONACTIVE_FREQUENTATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON27_FREQUENTATIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON27_FREQUENTATIVE_SUBSECTION_INVENTORY; },
    });
    api.cloneFrequentativeLessonRecord = cloneFrequentativeLessonRecord;
    api.getLesson27FrequentativeSubsectionInventory = getLesson27FrequentativeSubsectionInventory;
    api.attachFrequentativeGrammarContract = attachFrequentativeGrammarContract;
    api.normalizeFrequentativeEnum = normalizeFrequentativeEnum;
    api.normalizeFrequentativeType = normalizeFrequentativeType;
    api.normalizeFrequentativeReplicationTarget = normalizeFrequentativeReplicationTarget;
    api.normalizeFrequentativeFalsePositiveSource = normalizeFrequentativeFalsePositiveSource;
    api.getFrequentativeAntiConflationRules = getFrequentativeAntiConflationRules;
    api.getFrequentativeStructuralQuestions = getFrequentativeStructuralQuestions;
    api.buildFrequentativeBoundaryMetadata = buildFrequentativeBoundaryMetadata;
    api.buildLesson27FrequentativePursuitFrame = buildLesson27FrequentativePursuitFrame;
    api.classifyFrequentativeCandidate = classifyFrequentativeCandidate;
    api.classifyFrequentativeFalsePositive = classifyFrequentativeFalsePositive;
    return api;
}

export function installFrequentativeGlobals(targetObject = globalThis) {
    const api = createFrequentativeApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
