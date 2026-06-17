// Native wrapper generated from src/core/nnc/numerals/numerals.js.

export function createNumeralNncApi(targetObject = globalThis) {
    const NUMERAL_NNC_BOUNDARY_VERSION = 1;
    const NUMERAL_NNC_KIND = Object.freeze({
      cardinal: "cardinal",
      ordinal: "ordinal",
      vigesimal: "vigesimal",
      numeralNnc: "numeral-nnc",
      numberLexeme: "number-lexeme",
      unknown: "unknown"
    });
    const NUMERAL_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      uiNumberLabel: "ui-number-label",
      appendixHeading: "appendix-heading",
      translationLabel: "translation-label",
      parserToken: "parser-token",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const NUMERAL_NNC_ANTI_CONFLATION_RULES = Object.freeze(["numeral NNC boundary metadata is not generation", "ordinary NNC open-stem output is not numeral NNC fixture evidence", "UI number labels are not Nawat/Pipil numeral data", "Appendix D headings are not fixture cells", "English or Spanish number translations are not Nawat/Pipil form evidence", "Andrews numeral categories are architecture, not Nawat/Pipil form authority"]);
    const NUMERAL_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "numeralBase",
      asks: "Which Nawat/Pipil numeral base or number lexeme is evidenced?"
    }), Object.freeze({
      field: "numeralKind",
      asks: "Is the candidate cardinal, ordinal, vigesimal, numeral-NNC, number lexeme, or unknown?"
    }), Object.freeze({
      field: "nncRole",
      asks: "How does the numeral participate in an NNC rather than an ordinary nounstem preview?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided data supports the numeral form?"
    })]);
    const LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_numerals.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS = Object.freeze(["Andrews Lesson 34.1", "Andrews Lesson 34.2", "Andrews Lesson 34.3", "Andrews Lesson 34.4", "Andrews Lesson 34.5", "Andrews Lesson 34.6", "Andrews Lesson 34.7", "Andrews Lesson 34.8", "Andrews Lesson 34.9", "Andrews Lesson 34.10", "Andrews Lesson 34.11", "Andrews Lesson 34.12", "Andrews Lesson 34.13", "Andrews Lesson 34.14", "Andrews Lesson 34.15", "Andrews Lesson 34.16"]);
    const LESSON34_NUMERAL_SYSTEM_FRAME = Object.freeze({
      kind: "lesson-34-cardinal-numeral-system-frame",
      sourceSection: "Andrews 34.1",
      numericalBase: "vigesimal",
      successiveOrders: Object.freeze([1, 20, 400, 8000]),
      cardinalNumeralNncsUseAbsolutiveStateFormula: true,
      ordinaryPossessiveStateLicensed: false,
      numeralStemsCanEmbedInCompoundNncsAndVncs: true,
      sets: Object.freeze({
        total: 5,
        basicSet: 1,
        derivedSets: 4
      }),
      simpleVsGrossCount: Object.freeze({
        appliesToCountsTwoOrMore: true,
        grossCountMatrix: "(ix)-",
        grossCountRequiresPluralSubject: true,
        grossCountPluralSubjectOverridesNonanimateCommonNumberRule: true,
        ordinaryCountUsesNormalAnimateAndNonanimateNumberRules: true
      })
    });
    const LESSON34_BASIC_SET_FRAME = Object.freeze({
      kind: "lesson-34-basic-numeral-set-frame",
      sourceSections: Object.freeze(["Andrews 34.2", "Andrews 34.3", "Andrews 34.4", "Andrews 34.5", "Andrews 34.6"]),
      countedEntityKinds: Object.freeze(["animate", "flat", "long-cylindrical"]),
      systemMemory: Object.freeze(["one hand", "two hands", "two hands and one foot", "two hands and two feet"]),
      elementsPresentedInSections: Object.freeze(["34.3", "34.4", "34.5", "34.6", "34.7", "34.8"]),
      oneFrame: Object.freeze({
        stemClass: "nounstem",
        classicalSourceStem: "(cem)-0-",
        freestandingShapeLosesFinalM: true,
        pluralSubjectDyad: "m-eh",
        canEmbedInCompoundStems: true,
        incorporatedAdverbReadings: Object.freeze(["completely", "entirely", "together", "forever"])
      }),
      twoThreeFourFrame: Object.freeze({
        stemClass: "pronominal",
        ordinaryCountStemPluralizedByN: true,
        pluralSubjectDyads: Object.freeze(["t-in", "0-silent"]),
        embedsUsuallyLoseFinalVowel: true,
        threeStemHasYInitialAndEmbedAlternations: true
      }),
      fiveFrame: Object.freeze({
        macuilliClass: "nounstem",
        pluralSubjectDyad: "t-in",
        sixThroughNineUseEmbedOnlyChicuaChicWithBasicMatrix: true,
        fivePlusXLimitedToOneThroughFour: true
      }),
      tenFifteenFrame: Object.freeze({
        stemClass: "nounstem",
        pluralAnimateSubjectDyad: "t-in",
        grossCountPossessiveStateFormationIsExceptional: true,
        exceptionalPossessiveFormationDoesNotLicenseOrdinaryPossessiveNumeralGeneration: true
      })
    });
    const LESSON34_HIGH_ORDER_FRAME = Object.freeze({
      kind: "lesson-34-high-order-numeral-frame",
      sourceSection: "Andrews 34.7",
      embedRange: "one-through-nineteen",
      orderMatrices: Object.freeze([Object.freeze({
        value: 20,
        matrixStem: "(pohu-a-l)-li-",
        meaning: "score or counted set"
      }), Object.freeze({
        value: 400,
        matrixStem: "(tzon)-tli-",
        meaning: "set of feather barbs or large number"
      }), Object.freeze({
        value: 8000,
        matrixStem: "(xiqu-ipil)-li-",
        meaning: "bagful or enclosed stack"
      })]),
      compoundNounstemFormationRequired: true
    });
    const LESSON34_CONJOINED_NUMERAL_FRAME = Object.freeze({
      kind: "lesson-34-conjoined-numeral-frame",
      sourceSection: "Andrews 34.8",
      structure: "conjunctorless conjunction",
      conjunctOrder: "higher-numeral-nnc-before-lower-numeral-nnc",
      recursive: true,
      rightwardConjunctEmbedsAdditionalNumberMorph: "(om)-",
      additionalNumberMorphAssimilatesToOnOrOz: true,
      additionalNumberMorphDistinctFromTwoStemByLengthAndDistribution: true,
      conjunctiveCompoundAlternativeAllowed: true,
      conjoinedStructureCanDowngradeToEmbedStem: true,
      sameMatrixNumeralNncsCannotBeConjoined: true,
      omittedFinalNCanCreateFalseAnimateNonanimateMismatch: true,
      highOrdersLinkedByIhuanOrIpanInLaterLessons: true
    });
    const LESSON34_CLASSIFIER_SET_FRAME = Object.freeze({
      kind: "lesson-34-cardinal-classifier-set-frame",
      sourceSections: Object.freeze(["Andrews 34.9", "Andrews 34.10", "Andrews 34.11", "Andrews 34.12", "Andrews 34.13"]),
      unitClassifierSets: Object.freeze([Object.freeze({
        id: "rock",
        sourceSection: "34.9",
        matrixStem: "(te)-tl-",
        counts: "round plump things and books",
        ordinaryPluralDyad: "m-eh",
        rightwardConjunctOmitsClassifierMatrix: true
      }), Object.freeze({
        id: "row",
        sourceSection: "34.10",
        matrixStem: "(pan)-tli-",
        counts: "rows of things or people",
        rightwardConjunctOmitsClassifierMatrix: true
      }), Object.freeze({
        id: "thing",
        sourceSection: "34.11",
        matrixStem: "(tla-man)-tli-",
        counts: "folded or stacked things",
        grossCountOnlyWithPluralSubject: true,
        rightwardConjunctOmitsClassifierMatrix: true
      }), Object.freeze({
        id: "maize-cob",
        sourceSection: "34.12",
        matrixStem: "(olo)-tl-",
        counts: "roundish or oblong things",
        countsOnlyThroughNineteen: true,
        rightwardConjunctOmitsClassifierMatrix: true
      })]),
      beyondNineteenForMaizeCobSet: Object.freeze({
        throughThirtyNineUsesTlamicCompletedTwentyCount: true,
        beyondThirtyNineUsesBasicSet: true
      }),
      specialTwentySets: Object.freeze([Object.freeze({
        id: "tecpan",
        sourceSection: "34.13.1",
        matrixStem: "(tecpan)-tli-",
        countsByTwenties: "people animals houses rocks"
      }), Object.freeze({
        id: "ipil",
        sourceSection: "34.13.2",
        matrixStem: "(ipil)-li-",
        countsByTwenties: "blankets paper tortillas hides"
      }), Object.freeze({
        id: "quimil",
        sourceSection: "34.13.3",
        matrixStem: "(quimil)-li-",
        countsByTwenties: "blankets"
      })]),
      classifierUsageAllowsVariants: true
    });
    const LESSON34_REDUPLICATION_FRAME = Object.freeze({
      kind: "lesson-34-numeral-reduplication-frame",
      sourceSection: "Andrews 34.14",
      followsNounstemAffinityAndDistributionDistinctions: true,
      affinityMeaning: "continuity or relatedness such as one-by-one or by-twos",
      distributionVarietyMeaning: "separateness or apiece lots",
      defaultReduplicationTargetsFirstPartOfStem: true,
      sevenEightNineReduplicateEmbedAndBasicNumeralMatrix: true,
      mahtlacReduplicatesMatrixStem: true,
      conjoinedStructuresReduplicateAllConjuncts: true
    });
    const LESSON34_MODIFIER_MEASURE_FRAME = Object.freeze({
      kind: "lesson-34-modifier-measure-frame",
      sourceSections: Object.freeze(["Andrews 34.15", "Andrews 34.16"]),
      approximatePreposedParticles: Object.freeze(["canah", "quen", "ahzo quen"]),
      morePreposedParticle: "oc",
      ocCeCanServeAsSupplementarySubject: true,
      measureFormation: "compound-stemmed NNC with numeral stem in embed subposition",
      lengthMeasureFormation: true,
      measuredThingJoinsByAdjectivalModification: true
    });
    const LESSON34_CARDINAL_NUMERAL_NNC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson34-number-system",
      andrewsSection: "34.1",
      category: "vigesimal-cardinal-nnc-system",
      directiveEs: "El sistema es vigesimal; una cardinal es CNN absolutiva, no posesiva ordinaria, y el total en ix exige sujeto plural.",
      engineSurface: "diagnostic numeral system frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson34-basic-set",
      andrewsSection: "34.2",
      category: "basic-numeral-set",
      directiveEs: "La serie basica cuenta animados, cosas planas y cosas largas cilindricas; sus elementos gobiernan las series derivadas.",
      engineSurface: "diagnostic basic set frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson34-one",
      andrewsSection: "34.3",
      category: "one-stem",
      directiveEs: "Uno usa tronco nominal cem/ce, plural m-eh, incrustacion en compuestos y lecturas adverbiales incorporadas.",
      engineSurface: "diagnostic one-stem frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-two-three-four",
      andrewsSection: "34.4",
      category: "two-three-four-stems",
      directiveEs: "Dos, tres y cuatro son pronominales; el conteo ordinario pluraliza el tronco con n y usa dyadas plurales especificas.",
      engineSurface: "diagnostic two-three-four frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-five",
      andrewsSection: "34.5",
      category: "five-and-six-through-nine",
      directiveEs: "Cinco tiene tronco nominal y seis a nueve se forman como cinco mas uno a cuatro con el incrustado especial chicua/chic.",
      engineSurface: "diagnostic five frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-ten-fifteen",
      andrewsSection: "34.6",
      category: "ten-fifteen-stems",
      directiveEs: "Diez y quince son troncos nominales con plural animado t-in; las formas posesivas de total son excepcionales y no regla ordinaria.",
      engineSurface: "diagnostic ten/fifteen frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-high-orders",
      andrewsSection: "34.7",
      category: "twenty-four-hundred-eight-thousand",
      directiveEs: "Multiplos de veinte, cuatrocientos y ocho mil son compuestos con matriz pohua-l, tzon o xiquipil y un incrustado de uno a diecinueve.",
      engineSurface: "diagnostic high-order frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-conjoined-numerals",
      andrewsSection: "34.8",
      category: "conjoined-numeral-nncs",
      directiveEs: "La suma usa conjuncion sin conjunctor: numero mayor antes del menor, con om adicional en el segundo conjuncionado.",
      engineSurface: "diagnostic conjoined numeral frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson34-rock-set",
      andrewsSection: "34.9",
      category: "rock-classifier-set",
      directiveEs: "La serie te cuenta cosas redondas o abultadas y libros; el conjuncionado derecho omite la matriz clasificadora.",
      engineSurface: "diagnostic rock classifier frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-row-set",
      andrewsSection: "34.10",
      category: "row-classifier-set",
      directiveEs: "La serie pan cuenta filas de cosas o personas y tambien omite la matriz clasificadora en el conjuncionado derecho.",
      engineSurface: "diagnostic row classifier frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-thing-set",
      andrewsSection: "34.11",
      category: "thing-classifier-set",
      directiveEs: "La serie tlaman cuenta cosas plegadas o apiladas; el total usa solo sujeto plural.",
      engineSurface: "diagnostic thing classifier frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-maize-cob-set",
      andrewsSection: "34.12",
      category: "maize-cob-classifier-set",
      directiveEs: "La serie olo cuenta cosas redondeadas u oblongas solo hasta diecinueve; de veinte a treinta y nueve usa tlamic.",
      engineSurface: "diagnostic maize-cob classifier frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-special-twenty-sets",
      andrewsSection: "34.13",
      category: "special-twenty-classifier-sets",
      directiveEs: "Hay series especiales por veintenas con matrices tecpan, ipil y quimil para clases concretas de entidades.",
      engineSurface: "diagnostic special-twenty classifier frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson34-reduplication",
      andrewsSection: "34.14",
      category: "numeral-reduplication",
      directiveEs: "La reduplicacion numeral distingue afinidad y distribucion/variedad; algunos troncos cambian el punto de reduplicacion.",
      engineSurface: "diagnostic reduplication frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson34-approximately-more",
      andrewsSection: "34.15",
      category: "approximation-more",
      directiveEs: "Canah, quen y ahzo quen anteponen aproximacion; oc antepuesto expresa otro o mas.",
      engineSurface: "diagnostic numeral modifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson34-measures",
      andrewsSection: "34.16",
      category: "measure-nncs",
      directiveEs: "Un compuesto con numeral incrustado puede expresar medida o longitud y se combina con lo medido por modificacion adjetival.",
      engineSurface: "diagnostic measure frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneNumeralNncLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneNumeralNncLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneNumeralNncLessonRecord(value)]));
    }
    function getLesson34CardinalNumeralNncSubsectionInventory() {
      return LESSON34_CARDINAL_NUMERAL_NNC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS)
      }));
    }
    function buildLesson34CardinalNumeralNncPursuitFrame() {
      const subsectionInventory = getLesson34CardinalNumeralNncSubsectionInventory();
      const numeralSystemFrame = cloneNumeralNncLessonRecord(LESSON34_NUMERAL_SYSTEM_FRAME);
      const basicSetFrame = cloneNumeralNncLessonRecord(LESSON34_BASIC_SET_FRAME);
      const highOrderFrame = cloneNumeralNncLessonRecord(LESSON34_HIGH_ORDER_FRAME);
      const conjoinedNumeralFrame = cloneNumeralNncLessonRecord(LESSON34_CONJOINED_NUMERAL_FRAME);
      const classifierSetFrame = cloneNumeralNncLessonRecord(LESSON34_CLASSIFIER_SET_FRAME);
      const reduplicationFrame = cloneNumeralNncLessonRecord(LESSON34_REDUPLICATION_FRAME);
      const modifierMeasureFrame = cloneNumeralNncLessonRecord(LESSON34_MODIFIER_MEASURE_FRAME);
      const remainingGaps = ["Current numeral-NNC metadata is not cardinal numeral generation.", "Basic numerals, gross counts, high-order compounds, conjoined numerals, classifier sets, reduplication, approximation, and measure formations remain diagnostic.", "Exceptional gross-count possessive-state formations are documented but do not license ordinary possessive numeral generation.", "Confirmed Nawat/Pipil numeral-NNC forms, classifier inventories, and number-lexeme data remain evidence-needed."];
      const frame = {
        kind: "lesson-34-cardinal-numeral-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 34,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS),
        plannedArrows: [{
          id: "lesson-34-cardinal-numeral-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 34.1-34.16 against current numeral-NNC boundary metadata, vigesimal order, absolutive-state cardinal formula, simple/gross counts, basic and classifier sets, conjoined numerals, reduplication, approximation, and measures.",
          andrewsRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-34-cardinal-numeral-nnc-audit",
          result: "hit",
          correction: "Lesson 34 now records Andrews cardinal-numeral NNC architecture, vigesimal orders, absolutive-state formula boundary, simple and gross counts, basic stems, high-order compounds, conjoined numerals, classifier sets, reduplication, approximation, and measures while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS),
          feedbackRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS)
        }],
        subsectionInventory,
        numeralSystemFrame,
        basicSetFrame,
        highOrderFrame,
        conjoinedNumeralFrame,
        classifierSetFrame,
        reduplicationFrame,
        modifierMeasureFrame,
        currentEngineBoundary: {
          numeralNncBoundaryMetadataImplemented: true,
          ordinaryNncGenerationPreserved: true,
          cardinalNumeralGenerationImplemented: false,
          grossCountGenerationImplemented: false,
          highOrderCompoundGenerationImplemented: false,
          conjoinedNumeralGenerationImplemented: false,
          classifierSetGenerationImplemented: false,
          reduplicationGenerationImplemented: false,
          measureGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNumeralNncGrammarContract(frame, {
        metadataKind: "lesson-34-cardinal-numeral-nnc-pursuit-frame",
        unitKind: "cardinal-numeral-nnc-boundary",
        routeStage: "audit-lesson-34",
        structuralSource: "Andrews Lesson 34",
        andrewsRefs: Array.from(LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 34.1-34.16",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          orthographyStatus: "nawat-evidence-required"
        },
        morphBoundaryFrame: {
          numeralSystemFrame,
          basicSetFrame,
          highOrderFrame,
          conjoinedNumeralFrame,
          classifierSetFrame,
          reduplicationFrame,
          modifierMeasureFrame
        },
        stemFrame: {
          stemKind: "cardinal-numeral-nnc",
          basicSetEntityKinds: basicSetFrame.countedEntityKinds,
          highOrderMatrices: highOrderFrame.orderMatrices,
          classifierSets: classifierSetFrame.unitClassifierSets.map(entry => entry.id),
          specialTwentySets: classifierSetFrame.specialTwentySets.map(entry => entry.id)
        },
        nuclearClauseFrame: {
          formulaFamily: "CNN absolutiva",
          cardinalNumeralNncsUseAbsolutiveStateFormula: true,
          ordinaryPossessiveStateLicensed: false,
          grossCountRequiresPluralSubject: true
        },
        targetContract: {
          metadataKind: "lesson-34-cardinal-numeral-nnc-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["cardinal-numeral-nnc-diagnostic-only", "cardinal-numeral-nnc-needs-nawat-evidence"]
      });
    }
    function normalizeNumeralNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeNumeralNncKind(value = "") {
      return normalizeNumeralNncEnum(value, Object.values(NUMERAL_NNC_KIND), NUMERAL_NNC_KIND.unknown);
    }
    function normalizeNumeralNncFalsePositiveSource(value = "") {
      return normalizeNumeralNncEnum(value, Object.values(NUMERAL_NNC_FALSE_POSITIVE_SOURCE), NUMERAL_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getNumeralNncAntiConflationRules() {
      return Array.from(NUMERAL_NNC_ANTI_CONFLATION_RULES);
    }
    function getNumeralNncStructuralQuestions() {
      return NUMERAL_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachNumeralNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "numeral-nnc",
        routeFamily: "numeral-nnc",
        ...options
      });
    }
    function buildNumeralNncBoundaryMetadata() {
      const boundary = {
        kind: "numeral-nnc-boundary",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        lesson: 34,
        appendices: ["D"],
        status: "partial",
        structuralSource: "Andrews Lesson 34 and Appendix D",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getNumeralNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasNumeralNncGeneration: false,
          hasStaticNumberData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesNncFormulaSlots: false,
          treatsUiNumberLabelsAsEvidence: false
        },
        antiConflationRules: getNumeralNncAntiConflationRules()
      };
      return attachNumeralNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyNumeralNncCandidate({
      candidate = "",
      numeralBase = "",
      numeralKind = "",
      nncRole = "",
      evidenceSource = "",
      falsePositiveSource = "",
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizeNumeralNncKind(numeralKind);
      const normalizedFalsePositive = normalizeNumeralNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "numeral-nnc-candidate-classification",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        numeralBase: String(numeralBase || ""),
        numeralKind: normalizedKind,
        nncRole: String(nncRole || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "numeral-nnc-needs-validation" : "numeral-nnc-needs-nawat-evidence", normalizedKind !== NUMERAL_NNC_KIND.unknown ? "numeral-nnc-category-recognized" : "numeral-nnc-category-unconfirmed", normalizedFalsePositive !== NUMERAL_NNC_FALSE_POSITIVE_SOURCE.unknown ? "numeral-nnc-false-positive-source" : "numeral-nnc-unconfirmed"],
        boundary: buildNumeralNncBoundaryMetadata()
      };
      return attachNumeralNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.numeralBase,
        supported: false,
        morphBoundaryFrame: classification.boundary
      });
    }
    function classifyNumeralNncFalsePositive(source = "") {
      const normalizedSource = normalizeNumeralNncFalsePositiveSource(source);
      const classification = {
        kind: "numeral-nnc-false-positive",
        version: NUMERAL_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isNumeralNncEvidence: false,
        isNumberLexemeEvidence: false,
        generationAllowed: false,
        diagnostics: ["numeral-nnc-false-positive-source"],
        antiConflationRules: getNumeralNncAntiConflationRules()
      };
      return attachNumeralNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "NUMERAL_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_KIND; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "NUMERAL_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUMERAL_NNC_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_CARDINAL_NUMERAL_NNC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_CARDINAL_NUMERAL_NNC_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON34_NUMERAL_SYSTEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_NUMERAL_SYSTEM_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_BASIC_SET_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_BASIC_SET_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_HIGH_ORDER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_HIGH_ORDER_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_CONJOINED_NUMERAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_CONJOINED_NUMERAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_CLASSIFIER_SET_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_CLASSIFIER_SET_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_REDUPLICATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_REDUPLICATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_MODIFIER_MEASURE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_MODIFIER_MEASURE_FRAME; },
    });
    Object.defineProperty(api, "LESSON34_CARDINAL_NUMERAL_NNC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON34_CARDINAL_NUMERAL_NNC_SUBSECTION_INVENTORY; },
    });
    api.cloneNumeralNncLessonRecord = cloneNumeralNncLessonRecord;
    api.getLesson34CardinalNumeralNncSubsectionInventory = getLesson34CardinalNumeralNncSubsectionInventory;
    api.buildLesson34CardinalNumeralNncPursuitFrame = buildLesson34CardinalNumeralNncPursuitFrame;
    api.normalizeNumeralNncEnum = normalizeNumeralNncEnum;
    api.normalizeNumeralNncKind = normalizeNumeralNncKind;
    api.normalizeNumeralNncFalsePositiveSource = normalizeNumeralNncFalsePositiveSource;
    api.getNumeralNncAntiConflationRules = getNumeralNncAntiConflationRules;
    api.getNumeralNncStructuralQuestions = getNumeralNncStructuralQuestions;
    api.attachNumeralNncGrammarContract = attachNumeralNncGrammarContract;
    api.buildNumeralNncBoundaryMetadata = buildNumeralNncBoundaryMetadata;
    api.classifyNumeralNncCandidate = classifyNumeralNncCandidate;
    api.classifyNumeralNncFalsePositive = classifyNumeralNncFalsePositive;
    return api;
}

export function installNumeralNncGlobals(targetObject = globalThis) {
    const api = createNumeralNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
