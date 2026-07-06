// Native wrapper generated from src/core/comparison/comparison.js.

export function createComparisonApi(targetObject = globalThis) {
    const COMPARISON_BOUNDARY_VERSION = 1;
    const COMPARISON_RELATION = Object.freeze({
      equality: "equality",
      similarity: "similarity",
      size: "size",
      comparativeDegree: "comparative-degree",
      superlativeDegree: "superlative-degree",
      comparisonQuestion: "comparison-question",
      unknown: "unknown"
    });
    const COMPARISON_FALSE_POSITIVE_SOURCE = Object.freeze({
      adjectiveModeOutput: "adjective-mode-output",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      translationAdjective: "translation-adjective",
      comparisonTranslation: "comparison-translation",
      degreeLabel: "degree-label",
      questionLabel: "question-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPARISON_ANTI_CONFLATION_RULES = Object.freeze(["comparison boundary metadata is not generation", "adjective-like word output is not comparison syntax", "adjectival modification metadata is not similarity or comparison evidence", "degree, question, or translation labels are not comparison surface forms", "single generated words do not prove equality, similarity, comparative, or superlative relations", "Andrews comparison categories are architecture, not Nawat/Pipil orthography authority"]);
    const COMPARISON_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "target",
      asks: "Which Nawat/Pipil item is being compared?"
    }), Object.freeze({
      field: "standard",
      asks: "Which Andrews comparison standard or reference item is modeled?"
    }), Object.freeze({
      field: "comparisonRelation",
      asks: "Is the relation equality, similarity, size, comparative, superlative, comparison question, or unknown?"
    }), Object.freeze({
      field: "dimension",
      asks: "What quality, size, degree, or dimension is being compared?"
    }), Object.freeze({
      field: "marker",
      asks: "What Nawat/Pipil marker, order, or question pattern supports comparison status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Andrews source model or user-provided clause context supports comparison?"
    })]);
    function normalizeComparisonEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComparisonRelation(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_RELATION), COMPARISON_RELATION.unknown);
    }
    function normalizeComparisonFalsePositiveSource(value = "") {
      return normalizeComparisonEnum(value, Object.values(COMPARISON_FALSE_POSITIVE_SOURCE), COMPARISON_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComparisonAntiConflationRules() {
      return Array.from(COMPARISON_ANTI_CONFLATION_RULES);
    }
    function getComparisonStructuralQuestions() {
      return COMPARISON_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachComparisonGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "comparison-clause-unit",
        routeFamily: "comparison",
        ...options
      });
    }
    const LESSON53_COMPARISON_VALIDATION_REFS = Object.freeze(["src/tests/comparison.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON53_COMPARISON_PDF_REFS = Object.freeze(["Andrews Lesson 53.1", "Andrews Lesson 53.2", "Andrews Lesson 53.3", "Andrews Lesson 53.4", "Andrews Lesson 53.5", "Andrews Lesson 53.6", "Andrews Lesson 53.7"]);
    const LESSON53_SIMILARITY_FRAME = Object.freeze({
      kind: "lesson-53-similarity-frame",
      sourceSection: "Andrews 53.1",
      relation: COMPARISON_RELATION.similarity,
      expressionRoutes: Object.freeze([Object.freeze({
        sourceSection: "Andrews 53.1 item 1",
        route: "reduplicative-prefix",
        createsQuasiOrLikeMeaning: true,
        mayFeedNounstemVerbstemOrNncOutputs: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 2",
        route: "downgraded-possessive-state-predicate-with-nonspecific-tla",
        createsQuasiBodyPartOrCornerMeaning: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 3",
        route: "possessive-state-relational-nnc-tloc",
        relationalNncServesAsPrincipalClause: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 4",
        route: "nonpreposed-adjectival-modifier-with-zan-no-yehhuatl",
        sameAsConstruction: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 5",
        route: "incorporated-complement-compound-verbstem-mo-nehnequi",
        resemblanceMatrix: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 6",
        route: "nnc-built-on-resemble-or-equal-verbstem",
        nncServesAsPrincipalClause: true
      }), Object.freeze({
        sourceSection: "Andrews 53.1 item 7",
        route: "ihui-or-iuhqui-construction",
        iuhquiCanServeAsPrincipalClause: true,
        impersonalSubjectCommon: true,
        adjoinedClauseMayUseIn: true,
        supplementaryNncOftenSentenceTopic: true,
        concatenateCanAdjoinToLargerStructure: true,
        icCanEstablishRelation: true
      })])
    });
    const LESSON53_COMPARISON_ARCHITECTURE_FRAME = Object.freeze({
      kind: "lesson-53-comparison-architecture-frame",
      sourceSection: "Andrews 53.2",
      comparisonKinds: Object.freeze(["sameness", "difference"]),
      samenessEnglishValues: Object.freeze(["like", "as-as"]),
      differenceEnglishValues: Object.freeze(["more-than", "less-than"]),
      comparisonSyntaxIsNotAdjectiveGeneration: true
    });
    const LESSON53_EQUALITY_FRAME = Object.freeze({
      kind: "lesson-53-equality-comparison-frame",
      sourceSection: "Andrews 53.3",
      relation: COMPARISON_RELATION.equality,
      qualityOrMannerEquality: true,
      routes: Object.freeze([Object.freeze({
        sourceSection: "Andrews 53.3 item 1",
        route: "iuhqui-construction",
        standardMarkedByAdjoinedClause: true
      }), Object.freeze({
        sourceSection: "Andrews 53.3 item 2",
        route: "ihuan-construction",
        ihuanMeansCompanyRelationNotConjunctor: true
      })])
    });
    const LESSON53_SIZE_FRAME = Object.freeze({
      kind: "lesson-53-size-comparison-frame",
      sourceSection: "Andrews 53.4",
      relation: COMPARISON_RELATION.size,
      routes: Object.freeze([Object.freeze({
        sourceSection: "Andrews 53.4 item 1",
        route: "ixquich-quantitive-pronominal-nnc",
        expressesSameSizeOrAmount: true
      }), Object.freeze({
        sourceSection: "Andrews 53.4 item 2",
        route: "quezqui-no-izqui-correlative",
        expressesAsManyAsSoMany: true
      }), Object.freeze({
        sourceSection: "Andrews 53.4 item 2 note",
        route: "more-more-correlative",
        expressesTheMoreTheMore: true
      })])
    });
    const LESSON53_COMPARATIVE_DEGREE_FRAME = Object.freeze({
      kind: "lesson-53-comparative-degree-frame",
      sourceSection: "Andrews 53.5",
      relation: COMPARISON_RELATION.comparativeDegree,
      inequalityComparison: true,
      oftenUsesConjunctionWithOnlyTwoConjuncts: true,
      routes: Object.freeze([Object.freeze({
        sourceSection: "Andrews 53.5 item 1",
        route: "adversative-conjunction-contrasting-two-affirmative-statements",
        cencahCollocationInOneConjunct: true
      }), Object.freeze({
        sourceSection: "Andrews 53.5 item 2",
        route: "affirmative-plus-negative-than-clause",
        negativeIntroducers: Object.freeze(["inahmo", "in ahmo iuh", "in ahmo iuhqui", "in ahmo mach iuh", "in ahmo mach iuhqui"]),
        adjunctorInOptional: true
      }), Object.freeze({
        sourceSection: "Andrews 53.5 item 2a",
        route: "affirmative-adverbial-collocation",
        adverbialCollocations: Object.freeze(["oc achi", "oc cencah", "oc cencah yeh", "oc cencah yehhuatl", "oc yeh", "oc yeh cencah"]),
        huelCanIntensify: true
      }), Object.freeze({
        sourceSection: "Andrews 53.5 item 2b",
        route: "tachcauh-or-hualcah-principal-with-ic-adjunct",
        comparisonPointInIcAdjoinedClause: true,
        supplementarySubjectOftenPreposedAsTopic: true
      }), Object.freeze({
        sourceSection: "Andrews 53.5 item 2c",
        route: "tlapanahuia-or-tlacempanahuia-with-unspecified-object",
        comparisonPointIntroducedByIcOrInIc: true
      }), Object.freeze({
        sourceSection: "Andrews 53.5 item 2d",
        route: "panahuia-with-specified-applicative-object",
        specifiedStandardAsObject: true
      })])
    });
    const LESSON53_COMPARISON_QUESTION_FRAME = Object.freeze({
      kind: "lesson-53-comparison-question-frame",
      sourceSection: "Andrews 53.6",
      relation: COMPARISON_RELATION.comparisonQuestion,
      questionValue: "how-much-more",
      quenInsertedBeforeComparativeCollocation: true,
      comparativeCollocations: Object.freeze(["oc yeh", "oc eh", "zan yeh", "oc yeh cencah hualcah", "oc yeh cencah tlapanahuia"])
    });
    const LESSON53_SUPERLATIVE_FRAME = Object.freeze({
      kind: "lesson-53-superlative-degree-frame",
      sourceSection: "Andrews 53.7",
      relation: COMPARISON_RELATION.superlativeDegree,
      generalSuperiorityByDeletingContrastingNegativeStatement: true,
      adverbialExpressions: Object.freeze(["cencah", "huel"]),
      adverbialCollocations: Object.freeze(["cencah huel", "za cencah", "za cencah huel"]),
      incorporatedOrNncOptions: Object.freeze(["cem", "cenquizca", "ahcic", "cemahcic"]),
      vncOptionsWithIcAdjoinedClause: Object.freeze(["tlapanahuia", "tlacempanahuia"]),
      honorificConstructionPossible: true
    });
    const LESSON53_COMPARISON_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson53-similarity-overview",
      andrewsSection: "53.1",
      category: "similarity",
      directiveEs: "La semejanza puede expresarse por varios recursos; ninguno autoriza por si solo una forma Nawat visible.",
      engineSurface: "diagnostic comparison frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-reduplicative-prefix",
      andrewsSection: "53.1 item 1",
      category: "reduplicative-similarity",
      directiveEs: "Un prefijo reduplicativo puede crear sentido de quasi o parecido.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-tla-possessive-source",
      andrewsSection: "53.1 item 2",
      category: "tla-possessive-source",
      directiveEs: "Un predicado posesivo con poseedor no especifico tla puede bajarse a tronco nominal de semejanza.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-tloc-relational",
      andrewsSection: "53.1 item 3",
      category: "tloc-relational-nnc",
      directiveEs: "Una CNN posesiva sobre el relacional tloc puede servir como clausula principal de semejanza.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-zan-no-yehhuatl",
      andrewsSection: "53.1 item 4",
      category: "same-as-zan-no-yehhuatl",
      directiveEs: "La construccion con zan no yehhuatl y variantes pertenece a modificacion adjetival no prepuesta.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-nehnequi",
      andrewsSection: "53.1 item 5",
      category: "incorporated-complement-nehnequi",
      directiveEs: "Mo-nehnequi puede actuar como matriz de compuesto con complemento incorporado para semejanza.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-resemble-verbstem-nnc",
      andrewsSection: "53.1 item 6",
      category: "resemble-verbstem-nnc",
      directiveEs: "Una CNN formada sobre tronco de parecerse o igualarse puede ser clausula principal.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-similarity-ihui-iuhqui",
      andrewsSection: "53.1 item 7",
      category: "ihui-iuhqui",
      directiveEs: "Ihui e iuhqui forman una red de semejanza con clausula principal, adjunta, impersonal, topico e ic.",
      engineSurface: "diagnostic similarity frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparison-overview",
      andrewsSection: "53.2",
      category: "comparison-architecture",
      directiveEs: "La comparacion separa igualdad o semejanza de diferencia, y no se reduce a salida adjetival.",
      engineSurface: "diagnostic comparison frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-equality-quality-manner",
      andrewsSection: "53.3",
      category: "equality-quality-manner",
      directiveEs: "La igualdad de cualidad o manera puede usar iuhqui o ihuan.",
      engineSurface: "diagnostic equality frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-size-equality",
      andrewsSection: "53.4",
      category: "size-equality",
      directiveEs: "La igualdad de tamano usa ixquich o correlacion quezqui...no izqui.",
      engineSurface: "diagnostic size-comparison frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-degree",
      andrewsSection: "53.5",
      category: "comparative-degree",
      directiveEs: "El grado comparativo expresa desigualdad y suele usar conjuncion de solo dos conjuntivos.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-adversative",
      andrewsSection: "53.5 item 1",
      category: "comparative-adversative",
      directiveEs: "Una ruta compara dos afirmativas por conjuncion adversativa con cencah o colocaciones.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-negative-than",
      andrewsSection: "53.5 item 2",
      category: "affirmative-negative-than",
      directiveEs: "Otra ruta contrapone afirmativa y negativa introducida por inahmo o in ahmo iuh/iuhqui.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-collocations",
      andrewsSection: "53.5 item 2a",
      category: "comparative-collocations",
      directiveEs: "Oc achi, oc cencah, oc yeh y variantes marcan el lado afirmativo de la comparacion.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-tachcauh-hualcah",
      andrewsSection: "53.5 item 2b",
      category: "tachcauh-hualcah",
      directiveEs: "Tachcauh o hualcah pueden ser clausula principal; el punto de comparacion entra por ic.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-tlapanahuia-unspecified-object",
      andrewsSection: "53.5 item 2c",
      category: "tlapanahuia-unspecified-object",
      directiveEs: "Tlapanahuia o tlacempanahuia pueden comparar sin objeto especificado y con punto introducido por ic.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-comparative-panahuia-specified-object",
      andrewsSection: "53.5 item 2d",
      category: "panahuia-specified-object",
      directiveEs: "Panahuia con objeto aplicativo especificado puede hacer del estandar un objeto.",
      engineSurface: "diagnostic comparative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-how-much-more-question",
      andrewsSection: "53.6",
      category: "how-much-more-question",
      directiveEs: "La pregunta cuanto mas inserta quen antes de colocaciones comparativas.",
      engineSurface: "diagnostic comparison-question frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson53-superlative-degree",
      andrewsSection: "53.7",
      category: "superlative-degree",
      directiveEs: "El superlativo borra el contraste negativo del comparativo y usa intensificadores o tlapanahuia con ic.",
      engineSurface: "diagnostic superlative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneComparisonLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneComparisonLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneComparisonLessonRecord(value)]));
    }
    function getLesson53ComparisonSubsectionInventory() {
      return LESSON53_COMPARISON_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON53_COMPARISON_VALIDATION_REFS)
      }));
    }
    function buildLesson53ComparisonPursuitFrame() {
      const subsectionInventory = getLesson53ComparisonSubsectionInventory();
      const similarityFrame = cloneComparisonLessonRecord(LESSON53_SIMILARITY_FRAME);
      const architectureFrame = cloneComparisonLessonRecord(LESSON53_COMPARISON_ARCHITECTURE_FRAME);
      const equalityFrame = cloneComparisonLessonRecord(LESSON53_EQUALITY_FRAME);
      const sizeFrame = cloneComparisonLessonRecord(LESSON53_SIZE_FRAME);
      const comparativeDegreeFrame = cloneComparisonLessonRecord(LESSON53_COMPARATIVE_DEGREE_FRAME);
      const comparisonQuestionFrame = cloneComparisonLessonRecord(LESSON53_COMPARISON_QUESTION_FRAME);
      const superlativeFrame = cloneComparisonLessonRecord(LESSON53_SUPERLATIVE_FRAME);
      const remainingGaps = ["Current Lesson 53 support records Andrews' similarity and comparison architecture as diagnostics only; it does not implement comparison ASTs, static comparison data, parser/search detection, or generation.", "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require Andrews source models plus the orthography bridge before generating visible output.", "Similarity-route classification, iuhqui/ihuan/tloc/tlapanahuia parsing, equality and size-comparison detection, comparative conjunction integration, superlative routing, acciones de interfaz, and Andrews source models plus orthography-bridge fixtures remain partial or evidence-needed."];
      const frame = {
        kind: "lesson-53-comparison-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 53,
        aimStatus: "shooting",
        routeStage: "audit-lesson-53",
        pdfRefs: Array.from(LESSON53_COMPARISON_PDF_REFS),
        plannedArrows: [{
          id: "lesson-53-comparison-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 53.1-53.7 against current comparison boundary metadata, similarity routes, equality comparison, size comparison, comparative degree, how-much-more questions, and superlative degree while blocking adjective-output drift.",
          andrewsRefs: Array.from(LESSON53_COMPARISON_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON53_COMPARISON_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-53-comparison-audit",
          result: "hit",
          correction: "Lesson 53 now records Andrews similarity/comparison architecture across seven similarity routes, comparison of sameness versus difference, equality, size comparison, comparative degree, how-much-more questions, and superlative degree while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON53_COMPARISON_PDF_REFS),
          feedbackRefs: Array.from(LESSON53_COMPARISON_VALIDATION_REFS)
        }],
        subsectionInventory,
        similarityFrame,
        architectureFrame,
        equalityFrame,
        sizeFrame,
        comparativeDegreeFrame,
        comparisonQuestionFrame,
        superlativeFrame,
        currentEngineBoundary: {
          comparisonBoundaryMetadataImplemented: true,
          comparisonAstImplemented: false,
          similarityFrameDiagnosticOnly: true,
          equalityFrameDiagnosticOnly: true,
          sizeFrameDiagnosticOnly: true,
          comparativeDegreeFrameDiagnosticOnly: true,
          comparisonQuestionFrameDiagnosticOnly: true,
          superlativeFrameDiagnosticOnly: true,
          parserDetectionImplemented: false,
          staticComparisonDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson53GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachComparisonGrammarContract(frame, {
        metadataKind: "lesson-53-comparison-pursuit-frame",
        unitKind: "comparison-clause-unit",
        routeStage: "audit-lesson-53",
        structuralSource: "Andrews Lesson 53",
        andrewsRefs: Array.from(LESSON53_COMPARISON_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 53.1-53.7",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil comparison-clause orthography bridge",
          noClassicalSurfaceImport: true,
          slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
          orthographyStatus: "not-surface-bearing"
        },
        morphBoundaryFrame: {
          similarityFrame,
          architectureFrame,
          equalityFrame,
          sizeFrame,
          comparativeDegreeFrame,
          comparisonQuestionFrame,
          superlativeFrame
        },
        nuclearClauseFrame: {
          sourceClauseKind: "similarity and comparison structure",
          comparisonSyntaxSeparateFromAdjectiveWordOutput: true,
          iuhquiAndIhuanRoutesTracked: true,
          comparativeDegreeCanDependOnTwoConjuncts: true,
          superlativeDeletesComparativeNegativeContrast: true
        },
        participantFrame: {
          semanticRole: "target, standard, dimension, marker, equality relation, comparative relation, or superlative relation",
          translationComparisonIsNotMorphology: true,
          adjectiveOutputIsNotComparisonEvidence: true,
          standardsRequireClauseEvidence: true
        },
        targetContract: {
          metadataKind: "lesson-53-comparison-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["comparison-lesson-53-diagnostic-partial", "comparison-source-gated"]
      });
    }
    function buildComparisonBoundaryMetadata() {
      const boundary = {
        kind: "comparison-boundary",
        version: COMPARISON_BOUNDARY_VERSION,
        lesson: 53,
        status: "partial",
        structuralSource: "Andrews Lesson 53",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getComparisonStructuralQuestions(),
        boundaries: {
          hasAdjectiveLikeWordOutputs: true,
          hasAdjectivalModificationBoundary: true,
          hasComparisonAst: false,
          hasConfirmedClauseExamples: false,
          hasStaticComparisonData: false,
          changesAdjectiveGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsAdjectiveOutputAsComparisonEvidence: false,
          treatsTranslationsAsComparisonEvidence: false
        },
        antiConflationRules: getComparisonAntiConflationRules()
      };
      return attachComparisonGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyComparisonCandidate({
      target = "",
      standard = "",
      candidate = "",
      comparisonRelation = "",
      dimension = "",
      marker = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeComparisonRelation(comparisonRelation);
      const normalizedFalsePositive = normalizeComparisonFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "comparison-candidate-classification",
        version: COMPARISON_BOUNDARY_VERSION,
        target: String(target || ""),
        standard: String(standard || ""),
        candidate: String(candidate || ""),
        comparisonRelation: normalizedRelation,
        dimension: String(dimension || ""),
        marker: String(marker || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "comparison-needs-validation" : "comparison-source-gated", normalizedRelation !== COMPARISON_RELATION.unknown ? "comparison-relation-recognized" : "comparison-relation-unconfirmed", normalizedFalsePositive !== COMPARISON_FALSE_POSITIVE_SOURCE.unknown ? "comparison-false-positive-source" : "comparison-unconfirmed"],
        boundary: buildComparisonBoundaryMetadata()
      };
      return attachComparisonGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.target,
        supported: false,
        morphBoundaryFrame: classification.boundary
      });
    }
    function classifyComparisonFalsePositive(source = "") {
      const normalizedSource = normalizeComparisonFalsePositiveSource(source);
      const classification = {
        kind: "comparison-false-positive",
        version: COMPARISON_BOUNDARY_VERSION,
        source: normalizedSource,
        isComparisonEvidence: false,
        isComparisonAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["comparison-false-positive-source"],
        antiConflationRules: getComparisonAntiConflationRules()
      };
      return attachComparisonGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "COMPARISON_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPARISON_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_RELATION; },
    });
    Object.defineProperty(api, "COMPARISON_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPARISON_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPARISON_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPARISON_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeComparisonEnum = normalizeComparisonEnum;
    api.normalizeComparisonRelation = normalizeComparisonRelation;
    api.normalizeComparisonFalsePositiveSource = normalizeComparisonFalsePositiveSource;
    api.getComparisonAntiConflationRules = getComparisonAntiConflationRules;
    api.getComparisonStructuralQuestions = getComparisonStructuralQuestions;
    api.attachComparisonGrammarContract = attachComparisonGrammarContract;
    Object.defineProperty(api, "LESSON53_COMPARISON_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARISON_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON53_COMPARISON_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARISON_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON53_SIMILARITY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_SIMILARITY_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_COMPARISON_ARCHITECTURE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARISON_ARCHITECTURE_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_EQUALITY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_EQUALITY_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_SIZE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_SIZE_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_COMPARATIVE_DEGREE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARATIVE_DEGREE_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_COMPARISON_QUESTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARISON_QUESTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_SUPERLATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_SUPERLATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON53_COMPARISON_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON53_COMPARISON_SUBSECTION_INVENTORY; },
    });
    api.cloneComparisonLessonRecord = cloneComparisonLessonRecord;
    api.getLesson53ComparisonSubsectionInventory = getLesson53ComparisonSubsectionInventory;
    api.buildLesson53ComparisonPursuitFrame = buildLesson53ComparisonPursuitFrame;
    api.buildComparisonBoundaryMetadata = buildComparisonBoundaryMetadata;
    api.classifyComparisonCandidate = classifyComparisonCandidate;
    api.classifyComparisonFalsePositive = classifyComparisonFalsePositive;
    return api;
}

export function installComparisonGlobals(targetObject = globalThis) {
    const api = createComparisonApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
