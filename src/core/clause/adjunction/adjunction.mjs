// Native wrapper generated from src/core/clause/adjunction/adjunction.js.

export function createAdverbialAdjunctionGlobals(targetObject = globalThis) {
    const ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION = 1;
    const ADVERBIAL_ADJUNCTION_RELATION = Object.freeze({
      time: "time",
      place: "place",
      manner: "manner",
      consideration: "consideration",
      purpose: "purpose",
      condition: "condition",
      concession: "concession",
      consequence: "consequence",
      proviso: "proviso",
      reason: "reason",
      recursive: "recursive",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_UNIT = Object.freeze({
      nnc: "nnc",
      vnc: "vnc",
      particle: "particle",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_ORDER = Object.freeze({
      modifierHead: "modifier-head",
      headModifier: "head-modifier",
      appositiveHeadModifier: "appositive-head-modifier",
      principalAdverbialHead: "principal-adverbial-head",
      discontinuous: "discontinuous",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_RECURSION = Object.freeze({
      none: "none",
      head: "head",
      modifier: "modifier",
      both: "both",
      appositive: "appositive",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_MARKING = Object.freeze({
      unmarked: "unmarked",
      in: "in",
      tla: "tla",
      inTla: "in-tla",
      ma: "ma",
      inMa: "in-ma",
      ca: "ca",
      iuh: "iuh",
      ahzo: "ahzo",
      particle: "particle",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE = Object.freeze({
      configuredAdverbioSurface: "configured-adverbio-surface",
      adverbialNuclearBoundary: "adverbial-nuclear-boundary",
      relationalNncBoundary: "relational-nnc-boundary",
      placeGentilicBoundary: "place-gentilic-boundary",
      adjectivalModificationBoundary: "adjectival-modification-boundary",
      particleLabel: "particle-label",
      routeLabel: "route-label",
      translationLabel: "translation-label",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES = Object.freeze(["adverbial-adjunction boundary metadata is not generation", "configured adverbio word output is not a clause-adjunction AST", "adverbial nuclear-clause metadata is not recursive adverbial adjunction", "relational and place/gentilic boundary metadata are not adjoined-clause evidence", "single generated NNC or VNC words do not prove adjoined-unit relations", "translations for time, place, manner, purpose, reason, or condition are not orthography-bridge clause evidence", "Andrews adverbial-adjunction categories are architecture, not Nawat/Pipil orthography authority"]);
    const ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Nawat/Pipil principal clause or sentence hosts the adjoined unit?"
    }), Object.freeze({
      field: "adjoinedUnit",
      asks: "Which NNC, VNC, particle-looking form, clause, or sentence is adjoined?"
    }), Object.freeze({
      field: "semanticRelation",
      asks: "Is the relation time, place, manner, consideration, purpose, concession, consequence, proviso, reason, recursive, or unknown?"
    }), Object.freeze({
      field: "adjoinedUnitType",
      asks: "Is the adjoined unit an NNC, VNC, particle, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "marking",
      asks: "What marker, order, scope, or discontinuity evidence supports adjoined status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Andrews source model or user-provided clause context supports adverbial adjunction?"
    })]);
    function normalizeAdverbialAdjunctionEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdverbialAdjunctionRelation(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_RELATION), ADVERBIAL_ADJUNCTION_RELATION.unknown);
    }
    function normalizeAdverbialAdjunctionUnit(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_UNIT), ADVERBIAL_ADJUNCTION_UNIT.unknown);
    }
    function normalizeAdverbialAdjunctionOrder(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        preposed: ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        "modifier-precedes-head": ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        postposed: ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        "modifier-follows-head": ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        apposition: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        appositive: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        principal: ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
        "adverbial-principal": ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead
      };
      return aliases[normalized] || normalizeAdverbialAdjunctionEnum(normalized, Object.values(ADVERBIAL_ADJUNCTION_ORDER), ADVERBIAL_ADJUNCTION_ORDER.unknown);
    }
    function normalizeAdverbialAdjunctionRecursion(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_RECURSION), ADVERBIAL_ADJUNCTION_RECURSION.unknown);
    }
    function normalizeAdverbialAdjunctionMarking(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "": ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        none: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        unmarked: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        "in-tla": ADVERBIAL_ADJUNCTION_MARKING.inTla,
        intla: ADVERBIAL_ADJUNCTION_MARKING.inTla,
        "in-ma": ADVERBIAL_ADJUNCTION_MARKING.inMa,
        inma: ADVERBIAL_ADJUNCTION_MARKING.inMa
      };
      return aliases[normalized] || normalizeAdverbialAdjunctionEnum(normalized, Object.values(ADVERBIAL_ADJUNCTION_MARKING), ADVERBIAL_ADJUNCTION_MARKING.unknown);
    }
    function normalizeAdverbialAdjunctionFalsePositiveSource(value = "") {
      return normalizeAdverbialAdjunctionEnum(value, Object.values(ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE), ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getAdverbialAdjunctionAntiConflationRules() {
      return Array.from(ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES);
    }
    function getAdverbialAdjunctionStructuralQuestions() {
      return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachAdverbialAdjunctionGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adverbial-adjunction",
        routeFamily: "adverbial-adjunction",
        ...options
      });
    }
    const LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS = Object.freeze(["src/tests/adjunction.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS = Object.freeze(["Andrews Lesson 49.1", "Andrews Lesson 49.2", "Andrews Lesson 49.3", "Andrews Lesson 49.4", "Andrews Lesson 49.5", "Andrews Lesson 49.6", "Andrews Lesson 49.7", "Andrews Lesson 49.8", "Andrews Lesson 49.9", "Andrews Lesson 49.10"]);
    const LESSON49_SIMPLE_ADVERBIAL_MODIFICATION_FRAME = Object.freeze({
      kind: "lesson-49-simple-adverbial-modification-frame",
      sourceSection: "Andrews 49.1",
      simpleWhenNeitherModifierNorHeadIsAdverbialModification: true,
      normalOrder: ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
      alternateOrder: ADVERBIAL_ADJUNCTION_ORDER.headModifier,
      firstDegreeAdverbializedNncDomains: Object.freeze(["place", "duration", "manner", "compared-manner", "means"]),
      secondDegreeAdverbializedNncDomains: Object.freeze(["place", "time", "manner", "compared-manner"]),
      comparedMannerRequiresSupplementarySubjectContrast: true,
      thirdPersonSingularCanBeAmbiguous: true,
      incorporatedAdverbCounterpartCanDisambiguate: true
    });
    const LESSON49_MULTINUCLEUS_FRAME = Object.freeze({
      kind: "lesson-49-multiple-nucleus-simple-frame",
      sourceSection: "Andrews 49.2",
      simpleAdverbialModificationCanContain: Object.freeze(["adjectival-modification", "supplementation", "combination"]),
      domains: Object.freeze(["place", "time", "manner"]),
      topicSupplementaryPossessorAndSubjectInteractionsRemainClauseStructure: true,
      notAWordLevelGenerationLicense: true
    });
    const LESSON49_RECURSION_FRAME = Object.freeze({
      kind: "lesson-49-recursive-adverbial-modification-frame",
      sourceSections: Object.freeze(["Andrews 49.3", "Andrews 49.4", "Andrews 49.5", "Andrews 49.7", "Andrews 49.9"]),
      complexWhenModifierHeadOrBothAreAdverbialModification: true,
      recursionLoci: Object.freeze({
        head: Object.freeze({
          sourceSection: "Andrews 49.4",
          pattern: "modifier + (head = modifier + head)",
          astRecursionValue: ADVERBIAL_ADJUNCTION_RECURSION.head
        }),
        modifier: Object.freeze({
          sourceSection: "Andrews 49.5",
          pattern: "(modifier = modifier + head) + head",
          astRecursionValue: ADVERBIAL_ADJUNCTION_RECURSION.modifier
        }),
        modifierInternal: Object.freeze({
          sourceSection: "Andrews 49.7",
          pattern: "modifier of adverbial modifier can itself recurse",
          astRecursionValue: ADVERBIAL_ADJUNCTION_RECURSION.modifier
        }),
        both: Object.freeze({
          sourceSection: "Andrews 49.9",
          pattern: "(modifier = modifier + head) + (head = modifier + head)",
          astRecursionValue: ADVERBIAL_ADJUNCTION_RECURSION.both
        })
      }),
      recursiveParserImplemented: false
    });
    const LESSON49_INTERROGATIVE_INTENSIFIER_FRAME = Object.freeze({
      kind: "lesson-49-interrogative-intensifier-frame",
      sourceSections: Object.freeze(["Andrews 49.4", "Andrews 49.6", "Andrews 49.7", "Andrews 49.10"]),
      interrogativeOrder: Object.freeze({
        inherentlyInterrogativeAdverbialModifierMustComeFirst: true,
        cuixOptionalWhenInterrogativeModifierAlreadyLeads: true,
        cuixComesFirstWhenThereIsNoInherentlyInterrogativeModifier: true,
        machCanMarkExasperatedOrAmazedQuestion: true,
        nelOrNoZoNelAfterInterrogativeAdverbialMarksRhetoricalSurrender: true,
        sentenceInitialInterrogativeAdverbialCanBecomePrincipalClause: true,
        inOftenFollowsUpgradedInterrogativeAdverbialPrincipal: true,
        quenExceptionNoQueIn: true
      }),
      intensifiers: Object.freeze(["achi", "cencah", "hualcah", "cenquizca", "huel", "nel", "neneuhca", "tlacuauh", "niman", "ahzo", "zan", "za"]),
      intensifierPrecedesHeadWhenIntensifying: true,
      intensifierCanModifyAdjectivalNnc: true,
      slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true
    });
    const LESSON49_COLLOCATION_APPOSITION_PRINCIPAL_FRAME = Object.freeze({
      kind: "lesson-49-collocation-apposition-principal-frame",
      sourceSections: Object.freeze(["Andrews 49.5", "Andrews 49.8", "Andrews 49.10"]),
      collocations: Object.freeze({
        particlePlusAdverbialNuclearClause: Object.freeze(["oc", "quin", "ye", "zan", "za", "za zo"]),
        classicalNegativeParticles: Object.freeze(["ah#", "ca#", "ahmo", "camo"]),
        manyWrittenSolidTraditionally: true,
        lexicalizedInventoryDiagnosticOnly: true,
        notAutomaticSurfaceGeneration: true
      }),
      apposition: Object.freeze({
        sourceSection: "Andrews 49.8",
        generalPlaceOrTimeHeadPlusSpecificAppositive: true,
        modifierFollowsHeadInApposition: true,
        distinguishFromConjunctionCollocation: true
      }),
      adverbialPrincipalClause: Object.freeze({
        sourceSection: "Andrews 49.10",
        adverbializedNuclearClauseCanBePrincipal: true,
        originalPrincipalCanBecomeAdjunct: true,
        interrogativeAdverbialNncMustBeSentenceInitialToRemainInterrogative: true,
        includedClauseCanLoseInterrogativeForceWhileKeepingPrincipalAdjunctRelation: true
      })
    });
    const LESSON49_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson49-simple-structure",
      andrewsSection: "49.1",
      category: "simple-adverbial-modification",
      directiveEs: "La modificacion adverbial simple tiene modificador y cabeza; normalmente el modificador precede, pero puede seguir.",
      engineSurface: "diagnostic adverbial-adjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-first-degree-domains",
      andrewsSection: "49.1 first-degree",
      category: "first-degree-adverbialized-nnc",
      directiveEs: "Las CNN adverbializadas de primer grado cubren lugar, duracion, manera, manera comparada y medio sin autorizar generacion nueva.",
      engineSurface: "diagnostic simple frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-compared-manner",
      andrewsSection: "49.1 compared-manner",
      category: "compared-manner-ambiguity",
      directiveEs: "La manera comparada debe distinguirse de sujeto suplementario y construcciones metaforicas; la tercera singular puede ser ambigua.",
      engineSurface: "diagnostic simple frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-second-degree-domains",
      andrewsSection: "49.1 second-degree",
      category: "second-degree-adverbialized-nnc",
      directiveEs: "Las CNN adverbializadas de segundo grado cubren lugar, tiempo, manera y manera comparada como arquitectura de clausula.",
      engineSurface: "diagnostic simple frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-multiple-nucleus",
      andrewsSection: "49.2",
      category: "multiple-nucleus-simple-structure",
      directiveEs: "Una estructura simple puede contener modificacion adjetival, suplementacion o combinacion dentro del modificador o de la cabeza.",
      engineSurface: "diagnostic multiple-nucleus frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-complex-overview",
      andrewsSection: "49.3",
      category: "complex-recursive-overview",
      directiveEs: "La modificacion adverbial se vuelve compleja cuando modificador, cabeza o ambos son tambien modificaciones adverbiales.",
      engineSurface: "diagnostic recursion frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-head-recursion",
      andrewsSection: "49.4",
      category: "head-recursion",
      directiveEs: "La cabeza puede ser el locus de recursion: modificador mas cabeza que ya contiene modificador y cabeza.",
      engineSurface: "diagnostic recursion frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-interrogative-head-recursion",
      andrewsSection: "49.4 interrogatives",
      category: "interrogative-adverbial-order",
      directiveEs: "Un modificador adverbial interrogativo debe ir primero; cuix, mach, nel y no zo nel se tratan como alcance de pregunta, no como salida generada.",
      engineSurface: "diagnostic interrogative frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-modifier-recursion",
      andrewsSection: "49.5",
      category: "modifier-recursion",
      directiveEs: "El modificador puede ser el locus de recursion; muchas combinaciones particula mas CNN adverbializada son colocaciones lexicalizadas.",
      engineSurface: "diagnostic recursion frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-collocations",
      andrewsSection: "49.5 collocations",
      category: "particle-adverbial-collocations",
      directiveEs: "Las colocaciones con particulas como oc, quin, ye, zan, za y negativos son inventario diagnostico, no generacion automatica.",
      engineSurface: "diagnostic collocation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-intensifiers",
      andrewsSection: "49.6",
      category: "intensifiers",
      directiveEs: "Los intensificadores preceden a la cabeza cuando intensifican y tambien pueden modificar CNN adjetivales.",
      engineSurface: "diagnostic interrogative-intensifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-modifier-internal-recursion",
      andrewsSection: "49.7",
      category: "modifier-internal-recursion",
      directiveEs: "El modificador de un modificador adverbial puede recursar; la ruta actual solo lo marca como estructura.",
      engineSurface: "diagnostic recursion frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-apposition",
      andrewsSection: "49.8",
      category: "adverbial-apposition",
      directiveEs: "En aposicion de lugar o tiempo, una unidad general es seguida por una unidad mas especifica; no se confunde con conjuncion.",
      engineSurface: "diagnostic apposition frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-both-recursion",
      andrewsSection: "49.9",
      category: "both-recursion",
      directiveEs: "Modificador y cabeza pueden ser recursivos al mismo tiempo; esto requiere analisis de clausula, no salida de palabra.",
      engineSurface: "diagnostic recursion frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson49-principal-adverbial",
      andrewsSection: "49.10",
      category: "adverbialized-principal-clause",
      directiveEs: "Una CNN adverbializada puede ser clausula principal; en preguntas debe ir inicial para conservar fuerza interrogativa.",
      engineSurface: "diagnostic principal-clause frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneAdverbialAdjunctionLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneAdverbialAdjunctionLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneAdverbialAdjunctionLessonRecord(value)]));
    }
    function getLesson49AdverbialAdjunctionSubsectionInventory() {
      return LESSON49_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
      }));
    }
    function buildLesson49AdverbialAdjunctionPursuitFrame() {
      const subsectionInventory = getLesson49AdverbialAdjunctionSubsectionInventory();
      const simpleFrame = cloneAdverbialAdjunctionLessonRecord(LESSON49_SIMPLE_ADVERBIAL_MODIFICATION_FRAME);
      const multipleNucleusFrame = cloneAdverbialAdjunctionLessonRecord(LESSON49_MULTINUCLEUS_FRAME);
      const recursionFrame = cloneAdverbialAdjunctionLessonRecord(LESSON49_RECURSION_FRAME);
      const interrogativeIntensifierFrame = cloneAdverbialAdjunctionLessonRecord(LESSON49_INTERROGATIVE_INTENSIFIER_FRAME);
      const collocationAppositionPrincipalFrame = cloneAdverbialAdjunctionLessonRecord(LESSON49_COLLOCATION_APPOSITION_PRINCIPAL_FRAME);
      const remainingGaps = ["Current Lesson 49 support records Andrews' adverbial-modification part-one architecture as diagnostics and supplied-surface AST frames; it does not implement static adverbial-adjunction data, recursive parsing, or surface generation.", "Classical collocation examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require Andrews source models plus the orthography bridge before generating visible output.", "Parser/search detection, multiple-nucleus resolution, compared-manner ambiguity, interrogative principal-clause analysis, intensifier routing, lexicalized collocation inventory, apposition fixtures, acciones de interfaz, and Andrews source models plus orthography-bridge fixtures remain partial or evidence-needed."];
      const frame = {
        kind: "lesson-49-adverbial-adjunction-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 49,
        aimStatus: "shooting",
        routeStage: "audit-lesson-49",
        pdfRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS),
        plannedArrows: [{
          id: "lesson-49-adverbial-adjunction-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 49.1-49.10 against current adverbial-adjunction boundary metadata, supplied-surface AST behavior, simple and multiple-nucleus modification, recursion loci, interrogative/intensifier scope, collocations, apposition, and adverbial-principal clause behavior.",
          andrewsRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-49-adverbial-adjunction-audit",
          result: "hit",
          correction: "Lesson 49 now records Andrews adverbial-modification part-one architecture across simple modifier/head order, multiple-nucleus structures, recursive head/modifier/both loci, interrogative and intensifier scope, particle-adverbial collocations, apposition, and adverbialized principal clauses while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS),
          feedbackRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
        }],
        subsectionInventory,
        simpleFrame,
        multipleNucleusFrame,
        recursionFrame,
        interrogativeIntensifierFrame,
        collocationAppositionPrincipalFrame,
        currentEngineBoundary: {
          adverbialAdjunctionBoundaryMetadataImplemented: true,
          adverbialAdjunctionAstImplemented: true,
          simpleModifierHeadOrderMetadataImplemented: true,
          multipleNucleusFrameDiagnosticOnly: true,
          recursionFrameDiagnosticOnly: true,
          interrogativeFrameDiagnosticOnly: true,
          intensifierFrameDiagnosticOnly: true,
          collocationInventoryDiagnosticOnly: true,
          appositionFrameDiagnosticOnly: true,
          principalClauseFrameDiagnosticOnly: true,
          parserDetectionImplemented: false,
          staticAdverbialAdjunctionDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson49GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachAdverbialAdjunctionGrammarContract(frame, {
        metadataKind: "lesson-49-adverbial-adjunction-pursuit-frame",
        unitKind: "adverbial-adjunction-boundary",
        routeStage: "audit-lesson-49",
        structuralSource: "Andrews Lesson 49",
        andrewsRefs: Array.from(LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 49.1-49.10",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil adjoined-clause orthography bridge",
          noClassicalSurfaceImport: true,
          slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
          orthographyStatus: "not-surface-bearing"
        },
        morphBoundaryFrame: {
          simpleFrame,
          multipleNucleusFrame,
          recursionFrame,
          interrogativeIntensifierFrame,
          collocationAppositionPrincipalFrame
        },
        nuclearClauseFrame: {
          sourceClauseKind: "adverbialized NNC/VNC modifier, head, appositive, or principal clause",
          firstAndSecondDegreeAdverbializedNncDomainsTracked: true,
          modifierNormallyPrecedesHeadButCanFollow: true,
          recursiveAdverbialModificationRequiresClauseAnalysis: true,
          interrogativeAdverbialNncOrderCanChangePrincipalAdjunctRelation: true
        },
        participantFrame: {
          semanticRole: "adverbial modifier, head clause, appositive, interrogative adverbial principal, or lexicalized collocation participant",
          translationAdverbOrPrepositionIsNotMorphology: true,
          comparedMannerAndSupplementarySubjectDistinctionsEvidenceGated: true
        },
        targetContract: {
          metadataKind: "lesson-49-adverbial-adjunction-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["adverbial-adjunction-lesson-49-diagnostic-partial", "adverbial-adjunction-source-gated"]
      });
    }
    const LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS = Object.freeze(["src/tests/adjunction.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS = Object.freeze(["Andrews Lesson 50.1", "Andrews Lesson 50.2", "Andrews Lesson 50.3", "Andrews Lesson 50.4", "Andrews Lesson 50.5", "Andrews Lesson 50.6", "Andrews Lesson 50.7", "Andrews Lesson 50.8", "Andrews Lesson 50.9", "Andrews Lesson 50.10", "Andrews Lesson 50.11"]);
    const LESSON50_NONADVERBIALIZED_ADJOINED_UNIT_FRAME = Object.freeze({
      kind: "lesson-50-nonadverbialized-adjoined-unit-frame",
      sourceSection: "Andrews 50.1",
      modifierIsNotAdverbialized: true,
      modifierIsAdjoinedClauseOrClauseUnit: true,
      explicitAdverbializedNncMayIndicateRelation: true,
      meaningTypes: Object.freeze([ADVERBIAL_ADJUNCTION_RELATION.time, ADVERBIAL_ADJUNCTION_RELATION.place, ADVERBIAL_ADJUNCTION_RELATION.manner, ADVERBIAL_ADJUNCTION_RELATION.consideration, ADVERBIAL_ADJUNCTION_RELATION.purpose, ADVERBIAL_ADJUNCTION_RELATION.condition, ADVERBIAL_ADJUNCTION_RELATION.concession, ADVERBIAL_ADJUNCTION_RELATION.consequence, ADVERBIAL_ADJUNCTION_RELATION.proviso, ADVERBIAL_ADJUNCTION_RELATION.reason]),
      notLesson49AdverbializedModifier: true,
      clauseEvidenceRequired: true
    });
    const LESSON50_TIME_PLACE_MANNER_FRAME = Object.freeze({
      kind: "lesson-50-time-place-manner-frame",
      sourceSections: Object.freeze(["Andrews 50.2", "Andrews 50.3", "Andrews 50.4"]),
      time: Object.freeze({
        sourceSection: "Andrews 50.2",
        implicitTemporalMeaningCanLackTimeNnc: true,
        explicitTemporalAdverbializedNncs: Object.freeze(["ihcuac", "ic"]),
        ocIcCollocationTraditionalSpelling: "oquic",
        otherTemporalExpressions: Object.freeze(["aya mo", "oc", "macuilli"]),
        principalClauseMayContainCorroboratingAdverbialElement: true,
        iuhCanBeAdverbializedOrNonadverbializedVnc: true,
        iuhquiPreteritAgentiveCanEnterConstruction: true,
        ellipticalTemporalConstructionPossible: true,
        oneOutOfNumberExtension: true,
        higherPrincipalTenseCanSetAdverbializedNncTimeReference: true,
        canDowngradeToLesson49MultipleNucleusStructure: true
      }),
      place: Object.freeze({
        sourceSection: "Andrews 50.3",
        locativeClauseUnitModifiesPrincipal: true,
        futureTenseCanMeanFutureFromPastMoment: true,
        reducedCaOrCatcaConstructionPossible: true,
        overlapsWithLesson49AppositionAnalysis: true
      }),
      manner: Object.freeze({
        sourceSection: "Andrews 50.4",
        mannerClauseUnitIndicatesHowActionOccurs: true,
        commonAdverbialCenters: Object.freeze(["iuh", "quen"])
      })
    });
    const LESSON50_CONSIDERATION_FRAME = Object.freeze({
      kind: "lesson-50-consideration-frame",
      sourceSection: "Andrews 50.5",
      semanticRange: Object.freeze(["concerning", "regarding", "with-regard-to", "in-relation-to", "with-reference-to"]),
      mustNotBeConfusedWithIncludedReferentSupplementation: true,
      clearWithIntransitivePrincipal: true,
      clearWithReflexivePrincipal: true,
      nonspecificProjectiveObjectBlocksIncludedReferentAnalysis: true,
      sharedReferenceRequiresSupplementationCaution: true,
      translationIsNotStructure: true
    });
    const LESSON50_PURPOSE_CONDITION_FRAME = Object.freeze({
      kind: "lesson-50-purpose-condition-frame",
      sourceSections: Object.freeze(["Andrews 50.6", "Andrews 50.7"]),
      purpose: Object.freeze({
        sourceSection: "Andrews 50.6",
        usuallyFutureVncWhenPurposeUnmarked: true,
        adjunctorInOptional: true,
        otherTensesPossible: true,
        lesson29PurposivesCanCombineWithYauhAndHuallauh: true,
        canBeAmbiguousWithAdjectivalClause: true,
        withoutInCanResembleConjunctiveConstruction: true,
        weakPurposeReadingsPossible: true,
        maOrInMaPlusOptativeCanSuggestPurpose: true,
        maOrInMaPlusAdmonitiveExpressesLest: true
      }),
      condition: Object.freeze({
        sourceSection: "Andrews 50.7",
        marker: ADVERBIAL_ADJUNCTION_MARKING.tla,
        markerWithAdjunctor: ADVERBIAL_ADJUNCTION_MARKING.inTla,
        principalSentenceTypes: Object.freeze(["statement", "question", "wish", "command", "admonition"]),
        adjoinedClauseMayPrecedeOrFollow: true,
        openConditionPossible: true,
        hypotheticalConditionPossible: true,
        wishWithTlaIsConditionalAdjunctUpgradedToPrincipal: true,
        openConditionAdjunctCenterMayBeNncOrVnc: true,
        negativeOpenConditionMarkers: Object.freeze(["in tla ca#", "in tla camo"]),
        openVncConditionMoods: Object.freeze(["nonpast-optative", "future-optative", "preterit-optative", "present-indicative"]),
        presentIndicativeCanStandForPast: true,
        inTlaCamoIhcuacEquivalentUntil: true,
        hypotheticalPresentFutureUsesPastOptativeWithoutAntecessivePrefix: true,
        hypotheticalPrincipalUsesFutureEmbedCompoundWithTlaQuiMatrix: true,
        hypotheticalPastAntecessivePrefixOptionalButMustMatchWhenUsed: true,
        tlaCanBeOmittedWhenOtherConditionalElementPresent: true
      })
    });
    const LESSON50_CONCESSION_FRAME = Object.freeze({
      kind: "lesson-50-concession-frame",
      sourceSection: "Andrews 50.8",
      inTlaNel: Object.freeze({
        meaning: "even-if",
        traditionalSpelling: "intlanel",
        intensivePronominalAdditions: Object.freeze(["yeh", "eh"]),
        negatives: Object.freeze(["in tla canel", "in tla canel mo"])
      }),
      inMaNel: Object.freeze({
        meaning: "although",
        maOrInMaIntroducesAdjoinedClause: true,
        nelAlmostAlwaysFollowsMa: true,
        traditionalSpellings: Object.freeze(["inmanel", "immanel"]),
        intensivePronominalAdditions: Object.freeze(["yeh", "eh"])
      }),
      maZoFamily: Object.freeze({
        baseCollocations: Object.freeze(["ma zo", "ma zo eh", "ma zo nel", "ma zo ihui", "ma zo iuh", "ma zo nel ihui", "ma zo nel iuh"]),
        optionalAdjunctorIn: true,
        telCanCreateSupposingThatReading: true,
        negativeWithCa: Object.freeze(["ma canel", "ma cazo", "ma cazo mo", "ma cazo tel"])
      }),
      atLeastCollocations: Object.freeze(["ma nel zan", "ma zan nel", "ma nel za", "ma za nel", "ma tel za", "ma tel za yeh"]),
      zaZanDistinctionRequired: true,
      collocationsDiagnosticOnly: true
    });
    const LESSON50_CONSEQUENCE_PROVISO_REASON_FRAME = Object.freeze({
      kind: "lesson-50-consequence-proviso-reason-frame",
      sourceSections: Object.freeze(["Andrews 50.9", "Andrews 50.10", "Andrews 50.11"]),
      consequence: Object.freeze({
        sourceSection: "Andrews 50.9",
        containsAdverbializedVncIuh: true,
        meaning: "so-as-a-result"
      }),
      proviso: Object.freeze({
        sourceSection: "Andrews 50.10",
        containsNegativizedParticleAhzo: true,
        meaning: "in-case",
        ahzoAcahCanBeWrittenSolidWithLiaison: true
      }),
      reason: Object.freeze({
        sourceSection: "Andrews 50.11",
        introducedByCa: true,
        caIsPrincipalClauseIntroducer: true,
        juxtaposesSeparateSentences: true,
        caDoesNotMeanBecauseForSince: true,
        caIsNotConjunction: true,
        becauseForSinceAreTranslationMirage: true,
        negativeForms: Object.freeze(["ca ah#", "ca ahmo", "camo"])
      })
    });
    const LESSON50_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson50-nonadverbialized-overview",
      andrewsSection: "50.1",
      category: "nonadverbialized-adjoined-unit",
      directiveEs: "El modificador adverbial de esta leccion no esta adverbializado; es una clausula o unidad de clausula adyacente.",
      engineSurface: "diagnostic adverbial-adjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-time-overview",
      andrewsSection: "50.2",
      category: "time",
      directiveEs: "La unidad adyacente puede expresar tiempo implicito o explicito; la traduccion de los tiempos no autoriza generacion nueva.",
      engineSurface: "diagnostic time frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-time-implicit",
      andrewsSection: "50.2.1",
      category: "implicit-time",
      directiveEs: "El significado temporal puede estar implicito sin CNN temporal en la clausula adyacente.",
      engineSurface: "diagnostic time frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-time-explicit",
      andrewsSection: "50.2.2",
      category: "explicit-time-nnc",
      directiveEs: "Ihcuac, ic, oc ic y otras expresiones temporales pueden indicar explicitamente el tiempo dentro de la unidad adyacente.",
      engineSurface: "diagnostic time frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-time-corroborating",
      andrewsSection: "50.2.3",
      category: "principal-corroborating-time",
      directiveEs: "La clausula principal puede contener elemento adverbial corroborante; algunas estructuras se rebajan a 49.2.",
      engineSurface: "diagnostic time frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-place",
      andrewsSection: "50.3",
      category: "place",
      directiveEs: "La unidad adyacente puede expresar lugar; las reducciones con ca o catca pueden traslaparse con la aposicion de 49.8.",
      engineSurface: "diagnostic place frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-manner",
      andrewsSection: "50.4",
      category: "manner",
      directiveEs: "La unidad adyacente puede expresar la manera en que ocurre la accion o evento.",
      engineSurface: "diagnostic manner frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-consideration",
      andrewsSection: "50.5",
      category: "consideration",
      directiveEs: "La unidad adyacente puede expresar respecto a o en relacion con; no debe confundirse con suplementacion de referente incluido.",
      engineSurface: "diagnostic consideration frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-purpose-unmarked",
      andrewsSection: "50.6.1",
      category: "purpose-unmarked",
      directiveEs: "El proposito puede carecer de marca explicita y normalmente usa CNV futura; in puede faltar y la lectura puede rozar conjuncion.",
      engineSurface: "diagnostic purpose frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-purpose-ma",
      andrewsSection: "50.6.2",
      category: "purpose-ma-optative-admonitive",
      directiveEs: "Ma o in ma con optativo sugiere proposito; ma o in ma con admonitivo expresa para que no o lest.",
      engineSurface: "diagnostic purpose frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-condition-overview",
      andrewsSection: "50.7",
      category: "condition",
      directiveEs: "Tla, con o sin in, introduce condiciones abiertas o hipoteticas; la unidad adyacente puede preceder o seguir.",
      engineSurface: "diagnostic condition frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-open-condition-nnc",
      andrewsSection: "50.7.1.a",
      category: "open-condition-nnc",
      directiveEs: "En condiciones abiertas, el centro de la unidad adyacente puede ser CNN; el tiempo lo decide la CNV principal.",
      engineSurface: "diagnostic condition frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-open-condition-vnc",
      andrewsSection: "50.7.1.b",
      category: "open-condition-vnc",
      directiveEs: "En condiciones abiertas, el centro puede ser CNV optativa o indicativa; presente indicativo puede tener valor pasado.",
      engineSurface: "diagnostic condition frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-hypothetical-condition",
      andrewsSection: "50.7.2",
      category: "hypothetical-condition",
      directiveEs: "La condicion hipotetica usa optativo pasado y una principal con compuesto de embed futuro; el prefijo antecesivo debe tratarse como regla de alcance.",
      engineSurface: "diagnostic condition frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-concession",
      andrewsSection: "50.8",
      category: "concession",
      directiveEs: "La concesion usa familias de in tla nel, in ma nel, ma zo y colocaciones relacionadas; son diagnosticas hasta tener fuente Andrews concreta y puente ortografico.",
      engineSurface: "diagnostic concession frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-consequence",
      andrewsSection: "50.9",
      category: "consequence",
      directiveEs: "La consecuencia contiene iuh adverbializado con valor de resultado.",
      engineSurface: "diagnostic consequence frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-proviso",
      andrewsSection: "50.10",
      category: "proviso",
      directiveEs: "La provision contiene ahzo negativizado con valor de en caso de que.",
      engineSurface: "diagnostic proviso frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson50-reason",
      andrewsSection: "50.11",
      category: "reason",
      directiveEs: "Ca introduce una clausula principal explicativa; no significa porque y no es conjuncion.",
      engineSurface: "diagnostic reason frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function getLesson50AdverbialAdjunctionSubsectionInventory() {
      return LESSON50_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
      }));
    }
    function buildLesson50AdverbialAdjunctionPursuitFrame() {
      const subsectionInventory = getLesson50AdverbialAdjunctionSubsectionInventory();
      const nonadverbializedAdjoinedUnitFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_NONADVERBIALIZED_ADJOINED_UNIT_FRAME);
      const timePlaceMannerFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_TIME_PLACE_MANNER_FRAME);
      const considerationFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_CONSIDERATION_FRAME);
      const purposeConditionFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_PURPOSE_CONDITION_FRAME);
      const concessionFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_CONCESSION_FRAME);
      const consequenceProvisoReasonFrame = cloneAdverbialAdjunctionLessonRecord(LESSON50_CONSEQUENCE_PROVISO_REASON_FRAME);
      const remainingGaps = ["Current Lesson 50 support records Andrews' nonadverbialized adjoined-clause architecture as diagnostics and relation contracts; it does not implement static adjoined-clause data, parser/search detection, or surface generation.", "Classical collocation examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require Andrews source models plus the orthography bridge before generating visible output.", "Time/place/manner fixture analysis, consideration versus included-referent supplementation, purpose/conjunction ambiguity, open and hypothetical condition parsing, concession collocation inventory, consequence/proviso/reason detection, acciones de interfaz, and Andrews source models plus orthography-bridge fixtures remain partial or evidence-needed."];
      const frame = {
        kind: "lesson-50-adverbial-adjunction-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 50,
        aimStatus: "shooting",
        routeStage: "audit-lesson-50",
        pdfRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS),
        plannedArrows: [{
          id: "lesson-50-adverbial-adjunction-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 50.1-50.11 against current adverbial-adjunction boundary metadata, supplied-surface AST behavior, nonadverbialized adjoined-clause units, ten meaning types, purpose/condition/concession particles, and ca reason-as-principal-clause-introducer behavior.",
          andrewsRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-50-adverbial-adjunction-audit",
          result: "hit",
          correction: "Lesson 50 now records Andrews adverbial-modification part-two architecture across nonadverbialized adjoined clause units, time, place, manner, consideration, purpose, condition, concession, consequence, proviso, and reason while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS),
          feedbackRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS)
        }],
        subsectionInventory,
        nonadverbializedAdjoinedUnitFrame,
        timePlaceMannerFrame,
        considerationFrame,
        purposeConditionFrame,
        concessionFrame,
        consequenceProvisoReasonFrame,
        currentEngineBoundary: {
          adverbialAdjunctionBoundaryMetadataImplemented: true,
          adverbialAdjunctionAstImplemented: true,
          relationContractImplemented: true,
          timePlaceMannerDiagnosticOnly: true,
          considerationFrameDiagnosticOnly: true,
          purposeFrameDiagnosticOnly: true,
          conditionFrameDiagnosticOnly: true,
          concessionFrameDiagnosticOnly: true,
          consequenceFrameDiagnosticOnly: true,
          provisoFrameDiagnosticOnly: true,
          reasonCaPrincipalClauseIntroducerImplemented: true,
          parserDetectionImplemented: false,
          staticAdverbialAdjunctionDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson50GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachAdverbialAdjunctionGrammarContract(frame, {
        metadataKind: "lesson-50-adverbial-adjunction-pursuit-frame",
        unitKind: "adverbial-adjunction-boundary",
        routeStage: "audit-lesson-50",
        structuralSource: "Andrews Lesson 50",
        andrewsRefs: Array.from(LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 50.1-50.11",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil adjoined-clause orthography bridge",
          noClassicalSurfaceImport: true,
          slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
          orthographyStatus: "not-surface-bearing"
        },
        morphBoundaryFrame: {
          nonadverbializedAdjoinedUnitFrame,
          timePlaceMannerFrame,
          considerationFrame,
          purposeConditionFrame,
          concessionFrame,
          consequenceProvisoReasonFrame
        },
        nuclearClauseFrame: {
          sourceClauseKind: "nonadverbialized adjoined clause or clause unit",
          tenMeaningTypesTracked: true,
          explicitAdverbializedNncMaySignalRelation: true,
          conditionAndConcessionParticlesAreClauseScopeMarkers: true,
          reasonCaIsPrincipalClauseIntroducerNotConjunction: true
        },
        participantFrame: {
          semanticRole: "time, place, manner, consideration, purpose, condition, concession, consequence, proviso, or reason adjunct",
          translationAdverbConjunctionOrPrepositionIsNotMorphology: true,
          supplementationAndConjunctionContrastsEvidenceGated: true
        },
        targetContract: {
          metadataKind: "lesson-50-adverbial-adjunction-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["adverbial-adjunction-lesson-50-diagnostic-partial", "adverbial-adjunction-source-gated"]
      });
    }
    function buildAdverbialAdjunctionBoundaryMetadata() {
      return {
        kind: "adverbial-adjunction-boundary",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        lessons: [49, 50],
        status: "partial",
        structuralSource: "Andrews Lessons 49-50",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdverbialAdjunctionStructuralQuestions(),
        boundaries: {
          hasConfiguredAdverbioSurface: true,
          hasAdverbialNuclearBoundary: true,
          hasRelationalNncBoundary: true,
          hasPlaceGentilicBoundary: true,
          hasClauseAdjunctionAst: true,
          hasConfirmedClauseExamples: false,
          hasStaticAdjunctionData: false,
          changesAdverbioGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          changesRouteBehavior: false,
          treatsSingleGeneratedWordAsAdjunctionEvidence: false,
          treatsTranslationAsAdjunctionEvidence: false
        },
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules()
      };
    }
    function getAdverbialAdjunctionSurface(input = "", fallback = "") {
      if (typeof input === "string") {
        return String(input || fallback || "").trim();
      }
      if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
      }
      const surface = getAdverbialAdjunctionSurfaceForms(input)[0];
      if (getAdverbialAdjunctionResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
      }
      return String(surface || fallback || "").trim();
    }
    function splitAdverbialAdjunctionSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getAdverbialAdjunctionCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getAdverbialAdjunctionSelectedRealizationVariant(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = getAdverbialAdjunctionResultFrame(input);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
        if (!surfaces.length) {
          continue;
        }
        const formulaRealizationRecordId = String(record.id || "");
        const formulaRecordId = String(record.formulaRecordId || resultFrame.formulaRecord?.id || "");
        const selectedVariantIndex = 0;
        return {
          kind: "grammar-formula-realization-selected-variant",
          selectedVariantId: `${formulaRealizationRecordId || formulaRecordId || "realization"}::surface-${selectedVariantIndex}`,
          selectedVariantIndex,
          formulaRealizationRecordId,
          formulaRecordId,
          unit: String(record.unit || resultFrame.formulaRecord?.unit || "")
        };
      }
      return null;
    }
    function getAdverbialAdjunctionResultFrame(input = null) {
      const candidates = [input?.grammarFrame, input?.frames, input?.output?.grammarFrame, input?.output?.frames];
      return candidates.find(candidate => candidate && typeof candidate === "object" && (candidate.authorityFrame || candidate.routeContract || candidate.resultFrame || candidate.diagnosticFrame)) || null;
    }
    function getAdverbialAdjunctionSurfaceForms(input = null) {
      if (typeof input === "string") {
        return splitAdverbialAdjunctionSurfaceText(input);
      }
      if (!input || typeof input !== "object") {
        return [];
      }
      const grammarFrame = getAdverbialAdjunctionResultFrame(input);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getAdverbialAdjunctionCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—" && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
      }
      if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
      }
      if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
      }
      if (!hasResultFrame && Array.isArray(input.output?.surfaceForms)) {
        forms.push(...input.output.surfaceForms);
      }
      if (!hasResultFrame && input.output?.surface) {
        forms.push(input.output.surface);
      }
      if (!hasResultFrame && input.result) {
        forms.push(input.result);
      }
      if (!hasResultFrame && input.word) {
        forms.push(input.word);
      }
      return forms.flatMap(entry => splitAdverbialAdjunctionSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getAdverbialAdjunctionFormulaEcho(input = null) {
      if (!input || typeof input !== "object") {
        return "";
      }
      return String(input.formulaEcho || input.clauseFrame?.formulaEcho || input.nncBasic?.formulaEcho || input.nuclearClauseShell?.formulaEcho || input.adverbialNuclearFrame?.source?.raw || "");
    }
    function buildAdverbialAdjunctionClauseNode(input = "", role = "unknown", fallbackSurface = "") {
      const surface = getAdverbialAdjunctionSurface(input, fallbackSurface);
      const selectedVariant = getAdverbialAdjunctionSelectedRealizationVariant(input);
      return {
        kind: "adverbial-adjunction-clause-node",
        role: String(role || "unknown"),
        surface,
        ...(selectedVariant ? {
          selectedVariant,
          selectedVariantId: selectedVariant.selectedVariantId,
          formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
          formulaRecordId: selectedVariant.formulaRecordId
        } : {}),
        clauseKind: typeof input === "object" && input ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown") : "unknown",
        unitType: typeof input === "object" && input ? normalizeAdverbialAdjunctionUnit(input.adjoinedUnitType || input.unitType || input.clauseKind || "") : ADVERBIAL_ADJUNCTION_UNIT.unknown,
        formulaEcho: getAdverbialAdjunctionFormulaEcho(input),
        preservesSurface: true
      };
    }
    function buildAdverbialAdjunctionSurfaceSequence({
      principalSurface = "",
      adjoinedSurface = "",
      order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      marker = ""
    } = {}) {
      const principal = String(principalSurface || "").trim();
      const adjoined = String(adjoinedSurface || "").trim();
      const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
      const markerText = String(marker || "").trim() || (normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.unmarked ? "" : normalizedMarking.replace("-", " "));
      const markedAdjoined = [markerText, adjoined].filter(Boolean).join(" ");
      switch (normalizedOrder) {
        case ADVERBIAL_ADJUNCTION_ORDER.headModifier:
        case ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier:
          return [principal, markedAdjoined].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead:
          return [adjoined, markerText, principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.discontinuous:
          return [markedAdjoined, "...", principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.modifierHead:
        default:
          return [markedAdjoined, principal].filter(Boolean);
      }
    }
    function buildAdverbialAdjunctionRelationContract({
      relation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      adjoinedClauseAdverbialized = false,
      conditionType = "",
      purposeMood = ""
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(relation);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking);
      const base = {
        relation: normalizedRelation,
        lessonPart: adjoinedClauseAdverbialized ? 49 : 50,
        adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
        marking: normalizedMarking,
        translationMirage: false
      };
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason) {
        return {
          ...base,
          principalClauseIntroducer: normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca ? "ca" : "",
          caIsConjunction: false,
          translationMirage: true,
          note: "ca introduces a principal clause; because/for/since are translation effects"
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition) {
        return {
          ...base,
          conditionType: String(conditionType || "open"),
          expectedMarker: "tla or in tla",
          adjoinedClauseMayPrecedeOrFollow: true
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.purpose) {
        return {
          ...base,
          purposeMood: String(purposeMood || ""),
          sharedReferentPossible: true,
          admonitiveMayMeanLest: true
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.concession) {
        return {
          ...base,
          expectedMarkers: ["in tla nel", "ma nel", "in ma nel"]
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.consequence) {
        return {
          ...base,
          expectedMarker: "iuh"
        };
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.proviso) {
        return {
          ...base,
          expectedMarker: "ahzo"
        };
      }
      return base;
    }
    function buildAdverbialAdjunctionAst({
      principalClause = "",
      adjoinedUnit = "",
      principalSurface = "",
      adjoinedSurface = "",
      semanticRelation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
      adjoinedUnitType = ADVERBIAL_ADJUNCTION_UNIT.unknown,
      order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
      recursion = ADVERBIAL_ADJUNCTION_RECURSION.none,
      marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
      marker = "",
      adjoinedClauseAdverbialized = true,
      conditionType = "",
      purposeMood = "",
      evidenceSource = "",
      confirmed = false
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
      const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
      const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
      const normalizedRecursion = normalizeAdverbialAdjunctionRecursion(recursion);
      const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
      const principalNode = buildAdverbialAdjunctionClauseNode(principalClause, "principal", principalSurface);
      const adjoinedNode = buildAdverbialAdjunctionClauseNode(adjoinedUnit, "adjoined", adjoinedSurface);
      const diagnostics = [];
      if (!principalNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-principal-clause-surface");
      }
      if (!adjoinedNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-adjoined-unit-surface");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.unknown) {
        diagnostics.push("adverbial-adjunction-relation-unconfirmed");
      }
      if (normalizedUnit === ADVERBIAL_ADJUNCTION_UNIT.unknown) {
        diagnostics.push("adverbial-adjunction-unit-unconfirmed");
      }
      if (normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.unknown) {
        diagnostics.push("adverbial-adjunction-order-unconfirmed");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition && ![ADVERBIAL_ADJUNCTION_MARKING.tla, ADVERBIAL_ADJUNCTION_MARKING.inTla].includes(normalizedMarking)) {
        diagnostics.push("adverbial-adjunction-condition-usually-requires-tla-marker");
      }
      if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason && normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca) {
        diagnostics.push("adverbial-adjunction-ca-is-not-conjunction");
      }
      if (!String(evidenceSource || "").trim()) {
        diagnostics.push("adverbial-adjunction-source-gated");
      }
      const supported = Boolean(principalNode.surface && adjoinedNode.surface && normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown && normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown && normalizedOrder !== ADVERBIAL_ADJUNCTION_ORDER.unknown);
      const surfaceSequence = supported ? buildAdverbialAdjunctionSurfaceSequence({
        principalSurface: principalNode.surface,
        adjoinedSurface: adjoinedNode.surface,
        order: normalizedOrder,
        marking: normalizedMarking,
        marker
      }) : [];
      return targetObject.attachGrammarAstContract({
        kind: "adverbial-adjunction-ast",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        lessons: [49, 50],
        structuralSource: adjoinedClauseAdverbialized ? "Andrews Lesson 49" : "Andrews Lesson 50",
        targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        order: normalizedOrder,
        recursion: {
          locus: normalizedRecursion,
          recursive: normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.none && normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.unknown,
          pattern: normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.head ? "modifier + (head = modifier + head)" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.modifier ? "(modifier = modifier + head) + head" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.both ? "(modifier = modifier + head) + (head = modifier + head)" : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.appositive ? "general place/time adjunct + specific place/time appositive" : ""
        },
        marking: {
          value: normalizedMarking,
          marker: String(marker || ""),
          isMarked: normalizedMarking !== ADVERBIAL_ADJUNCTION_MARKING.unmarked
        },
        principalClause: principalNode,
        adjoinedUnit: adjoinedNode,
        relationContract: buildAdverbialAdjunctionRelationContract({
          relation: normalizedRelation,
          marking: normalizedMarking,
          adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
          conditionType,
          purposeMood
        }),
        transformations: {
          adjoinedUnitPrecedesHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.modifierHead || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous,
          adjoinedUnitFollowsHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.headModifier || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
          adverbialUnitIsPrincipal: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
          isAppositivePlaceTime: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
          isDiscontinuous: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildAdverbialAdjunctionBoundaryMetadata()
      }, {
        astKind: "adverbial-adjunction-ast",
        lessons: [49, 50],
        structuralSource: adjoinedClauseAdverbialized ? "Andrews Lesson 49" : "Andrews Lesson 50"
      });
    }
    function classifyAdverbialAdjunctionCandidate({
      principalClause = "",
      adjoinedUnit = "",
      candidate = "",
      semanticRelation = "",
      adjoinedUnitType = "",
      marking = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
      const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
      const normalizedFalsePositive = normalizeAdverbialAdjunctionFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "adverbial-adjunction-candidate-classification",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        adjoinedUnit: String(adjoinedUnit || ""),
        candidate: String(candidate || ""),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        marking: String(marking || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "adverbial-adjunction-needs-validation" : "adverbial-adjunction-source-gated", normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown ? "adverbial-adjunction-relation-recognized" : "adverbial-adjunction-relation-unconfirmed", normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown ? "adverbial-adjunction-unit-recognized" : "adverbial-adjunction-unit-unconfirmed", normalizedFalsePositive !== ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown ? "adverbial-adjunction-false-positive-source" : "adverbial-adjunction-unconfirmed"],
        boundary: buildAdverbialAdjunctionBoundaryMetadata()
      };
    }
    function classifyAdverbialAdjunctionFalsePositive(source = "") {
      const normalizedSource = normalizeAdverbialAdjunctionFalsePositiveSource(source);
      return {
        kind: "adverbial-adjunction-false-positive",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialAdjunctionEvidence: false,
        isClauseAdjunctionAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-adjunction-false-positive-source"],
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_RELATION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_UNIT; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_ORDER; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_RECURSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_RECURSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_MARKING", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_MARKING; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdverbialAdjunctionEnum = normalizeAdverbialAdjunctionEnum;
    api.normalizeAdverbialAdjunctionRelation = normalizeAdverbialAdjunctionRelation;
    api.normalizeAdverbialAdjunctionUnit = normalizeAdverbialAdjunctionUnit;
    api.normalizeAdverbialAdjunctionOrder = normalizeAdverbialAdjunctionOrder;
    api.normalizeAdverbialAdjunctionRecursion = normalizeAdverbialAdjunctionRecursion;
    api.normalizeAdverbialAdjunctionMarking = normalizeAdverbialAdjunctionMarking;
    api.normalizeAdverbialAdjunctionFalsePositiveSource = normalizeAdverbialAdjunctionFalsePositiveSource;
    api.getAdverbialAdjunctionAntiConflationRules = getAdverbialAdjunctionAntiConflationRules;
    api.getAdverbialAdjunctionStructuralQuestions = getAdverbialAdjunctionStructuralQuestions;
    api.attachAdverbialAdjunctionGrammarContract = attachAdverbialAdjunctionGrammarContract;
    Object.defineProperty(api, "LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_ADVERBIAL_ADJUNCTION_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_ADVERBIAL_ADJUNCTION_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON49_SIMPLE_ADVERBIAL_MODIFICATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_SIMPLE_ADVERBIAL_MODIFICATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON49_MULTINUCLEUS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_MULTINUCLEUS_FRAME; },
    });
    Object.defineProperty(api, "LESSON49_RECURSION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_RECURSION_FRAME; },
    });
    Object.defineProperty(api, "LESSON49_INTERROGATIVE_INTENSIFIER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_INTERROGATIVE_INTENSIFIER_FRAME; },
    });
    Object.defineProperty(api, "LESSON49_COLLOCATION_APPOSITION_PRINCIPAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_COLLOCATION_APPOSITION_PRINCIPAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON49_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON49_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY; },
    });
    api.cloneAdverbialAdjunctionLessonRecord = cloneAdverbialAdjunctionLessonRecord;
    api.getLesson49AdverbialAdjunctionSubsectionInventory = getLesson49AdverbialAdjunctionSubsectionInventory;
    api.buildLesson49AdverbialAdjunctionPursuitFrame = buildLesson49AdverbialAdjunctionPursuitFrame;
    Object.defineProperty(api, "LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_ADVERBIAL_ADJUNCTION_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_ADVERBIAL_ADJUNCTION_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON50_NONADVERBIALIZED_ADJOINED_UNIT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_NONADVERBIALIZED_ADJOINED_UNIT_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_TIME_PLACE_MANNER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_TIME_PLACE_MANNER_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_CONSIDERATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_CONSIDERATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_PURPOSE_CONDITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_PURPOSE_CONDITION_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_CONCESSION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_CONCESSION_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_CONSEQUENCE_PROVISO_REASON_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_CONSEQUENCE_PROVISO_REASON_FRAME; },
    });
    Object.defineProperty(api, "LESSON50_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON50_ADVERBIAL_ADJUNCTION_SUBSECTION_INVENTORY; },
    });
    api.getLesson50AdverbialAdjunctionSubsectionInventory = getLesson50AdverbialAdjunctionSubsectionInventory;
    api.buildLesson50AdverbialAdjunctionPursuitFrame = buildLesson50AdverbialAdjunctionPursuitFrame;
    api.buildAdverbialAdjunctionBoundaryMetadata = buildAdverbialAdjunctionBoundaryMetadata;
    api.getAdverbialAdjunctionSurface = getAdverbialAdjunctionSurface;
    api.splitAdverbialAdjunctionSurfaceText = splitAdverbialAdjunctionSurfaceText;
    api.getAdverbialAdjunctionCanonicalRealizationSurfaceForms = getAdverbialAdjunctionCanonicalRealizationSurfaceForms;
    api.getAdverbialAdjunctionSelectedRealizationVariant = getAdverbialAdjunctionSelectedRealizationVariant;
    api.getAdverbialAdjunctionResultFrame = getAdverbialAdjunctionResultFrame;
    api.getAdverbialAdjunctionSurfaceForms = getAdverbialAdjunctionSurfaceForms;
    api.getAdverbialAdjunctionFormulaEcho = getAdverbialAdjunctionFormulaEcho;
    api.buildAdverbialAdjunctionClauseNode = buildAdverbialAdjunctionClauseNode;
    api.buildAdverbialAdjunctionSurfaceSequence = buildAdverbialAdjunctionSurfaceSequence;
    api.buildAdverbialAdjunctionRelationContract = buildAdverbialAdjunctionRelationContract;
    api.buildAdverbialAdjunctionAst = buildAdverbialAdjunctionAst;
    api.classifyAdverbialAdjunctionCandidate = classifyAdverbialAdjunctionCandidate;
    api.classifyAdverbialAdjunctionFalsePositive = classifyAdverbialAdjunctionFalsePositive;
    return api;
}

export function installAdverbialAdjunctionGlobals(targetObject = globalThis) {
    const api = createAdverbialAdjunctionGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
