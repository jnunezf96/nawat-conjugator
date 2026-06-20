// Native wrapper generated from src/core/parsing/parsing.js.

export function createParsingModule(targetObject = globalThis) {
    const LESSON28_COMPOUND_BOUNDARY_VERSION = 1;
    const LESSON28_VERBAL_EMBED_VALIDATION_REFS = Object.freeze(["src/tests/parsing.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON28_VERBAL_EMBED_PDF_REFS = Object.freeze(["Andrews Lesson 28.1", "Andrews Lesson 28.2", "Andrews Lesson 28.3", "Andrews Lesson 28.4", "Andrews Lesson 28.5", "Andrews Lesson 28.6", "Andrews Lesson 28.7", "Andrews Lesson 28.8", "Andrews Lesson 28.9", "Andrews Lesson 28.10", "Andrews Lesson 28.11", "Andrews Lesson 28.12"]);
    const LESSON28_COMPOUND_FORMULA_FRAME = Object.freeze({
      kind: "lesson-28-compounding-formula-frame",
      sourceSection: "Andrews 28.1",
      transformation: "combine nuclear clauses into a new nuclear clause",
      syntacticToMorphologicalDowngrade: true,
      formulas: Object.freeze(["VNC + VNC = compound VNC", "NNC + VNC = compound VNC", "NNC + NNC = compound NNC"]),
      recursiveBinaryArrangement: true,
      compoundStemIsConvenienceAbstraction: true,
      sourcePredicatesRemainAnalyticallyPrimary: true
    });
    const LESSON28_MATRIX_EMBED_FRAME = Object.freeze({
      kind: "lesson-28-matrix-embed-frame",
      sourceSection: "Andrews 28.2",
      relationTypes: Object.freeze(["conjunctive compound", "adjunctive compound"]),
      matrixPosition: "after embed",
      embedBeforeMatrixInviolable: true,
      matrixDeterminesCompoundClauseKind: true,
      subjectPronounBelongsToMatrixSource: true,
      embedSubjectDeletedExceptSpecialConstructions: true,
      embedValenceDeterminesCompoundVerbstemValenceWhenVncIncorporatesIntoVnc: true,
      allowedEmbedFunctions: Object.freeze(["incorporated object", "incorporated possessor", "incorporated modifier", "incorporated complement"]),
      embedNeverFunctionsAsSubject: true
    });
    const LESSON28_COHESIVENESS_FRAME = Object.freeze({
      kind: "lesson-28-cohesiveness-frame",
      sourceSection: "Andrews 28.3",
      types: Object.freeze([Object.freeze({
        id: "linked",
        matrixBehavior: "matrix remains aloof from embed",
        subtypes: Object.freeze(["connective-t", "connectiveless"])
      }), Object.freeze({
        id: "integrated",
        matrixBehavior: "matrix takes over or enslaves the embed",
        subtypes: Object.freeze(["integrated"])
      })]),
      vncPlusVncMayBeLinkedOrIntegrated: true,
      nncPlusNncMayBeLinkedOrIntegrated: true,
      nncPlusVncRestrictedToIntegrated: true
    });
    const LESSON28_VERBAL_EMBED_VALENCE_FRAME = Object.freeze({
      kind: "lesson-28-verbal-embed-valence-frame",
      sourceSection: "Andrews 28.4",
      combinations: Object.freeze(["ISTEM + ISTEM", "TSTEM + ISTEM", "ISTEM + TSTEM", "TSTEM + TSTEM"]),
      embedValenceChoiceFree: true,
      matrixChoiceExtremelyLimited: true,
      embedDeterminesCompoundValence: true,
      matrixDeterminesLinkedOrIntegratedType: true,
      lesson28CoversFourPatterns: true,
      lesson29CoversFifthPattern: true
    });
    const LESSON28_CONNECTIVE_T_FRAME = Object.freeze({
      kind: "lesson-28-connective-t-frame",
      sourceSection: "Andrews 28.5",
      cohesivenessType: "linked",
      connectiveMorpheme: "t",
      morphs: Object.freeze([Object.freeze({
        morph: "t",
        environment: "before vowel"
      }), Object.freeze({
        morph: "ti",
        environment: "before consonant or supportive vowel"
      })]),
      functionsAsSeparatorAndConnector: true,
      patterns: Object.freeze(["intransitive-matrix", "intransitivized-reflexive-matrix", "shared-object"]),
      embedPredicateTense: "preterit predicate: perfective stem plus zero preterit before connective t",
      embedActionBeginsBeforeMatrixAction: true,
      matrixIndicatesContinuanceOrStance: true,
      auxiliaryVerbLabelRejected: true
    });
    const LESSON28_INTRANSITIVE_MATRIX_FRAME = Object.freeze({
      kind: "lesson-28-intransitive-matrix-frame",
      sourceSection: "Andrews 28.6",
      matrixCount: 15,
      embedMayBeActiveOrNonactive: true,
      matrixIsNotAuxiliary: true,
      matrixInventory: Object.freeze([Object.freeze({
        id: "ca-h",
        andrewsStem: "ca-h",
        roleGlossEs: "estar en el acto de hacer algo",
        note: "variant ye after connective t"
      }), Object.freeze({
        id: "nemi",
        andrewsStem: "nemi",
        roleGlossEs: "seguir o pasar el tiempo haciendo algo"
      }), Object.freeze({
        id: "ya-uh",
        andrewsStem: "ya-uh",
        roleGlossEs: "irse haciendo algo",
        note: "singular present stem uh; ti-ya may syncopate to t-a"
      }), Object.freeze({
        id: "hual-la-uh",
        andrewsStem: "hual-la-uh",
        roleGlossEs: "venir haciendo algo",
        note: "directional prefix remains part of the matrix"
      }), Object.freeze({
        id: "hui-tz",
        andrewsStem: "hui-tz",
        roleGlossEs: "venir haciendo algo",
        note: "huica and itqui use old itz formation without connective"
      }), Object.freeze({
        id: "ahci",
        andrewsStem: "ahci",
        roleGlossEs: "llegar haciendo algo",
        note: "often permits hysteron-proteron reversal"
      }), Object.freeze({
        id: "mani",
        andrewsStem: "mani",
        roleGlossEs: "estar o extenderse en cierto estado; grupo de pie haciendo algo"
      }), Object.freeze({
        id: "ihca",
        andrewsStem: "ihca",
        roleGlossEs: "estar de pie haciendo algo o en cierto estado"
      }), Object.freeze({
        id: "o",
        andrewsStem: "o",
        roleGlossEs: "yacer extendido haciendo algo o en cierto estado",
        note: "ordinary locative on is not used as matrix here"
      }), Object.freeze({
        id: "e-hua",
        andrewsStem: "e-hua",
        roleGlossEs: "empezar o moverse hacia una accion; hacerlo rapidamente",
        note: "Class A or Class B perfective stem possible"
      }), Object.freeze({
        id: "quiza",
        andrewsStem: "quiza",
        roleGlossEs: "hacer algo rapidamente o abruptamente"
      }), Object.freeze({
        id: "huetzi",
        andrewsStem: "huetzi",
        roleGlossEs: "hacer algo rapidamente o abruptamente; tambien caer"
      }), Object.freeze({
        id: "tlehco",
        andrewsStem: "tlehco",
        roleGlossEs: "ascender"
      }), Object.freeze({
        id: "cal-aqui",
        andrewsStem: "cal-aqui",
        roleGlossEs: "entrar",
        note: "itself a Lesson 30 compound"
      }), Object.freeze({
        id: "pil-ca",
        andrewsStem: "pil-ca",
        roleGlossEs: "colgar o estar suspendido"
      })])
    });
    const LESSON28_SPECIAL_FORMATIONS_FRAME = Object.freeze({
      kind: "lesson-28-special-formations-frame",
      sourceSection: "Andrews 28.7",
      formations: Object.freeze([Object.freeze({
        id: "ca-h-as-embed",
        directive: "ca-h as embed unexpectedly uses perfective ye"
      }), Object.freeze({
        id: "ya-uh-as-embed",
        directive: "ya-uh as embed uses preterit predicate on yah"
      }), Object.freeze({
        id: "cac-embed-only",
        directive: "cac occurs only as embed and only with nonanimate subject reference"
      }), Object.freeze({
        id: "itta-blocked-as-embed",
        directive: "te/tla-(itt-a) cannot embed; perfective itz is used instead"
      }), Object.freeze({
        id: "hysteron-proteron",
        directive: "event order may be reversed; ahci frequently permits it"
      }), Object.freeze({
        id: "connective-t-passive",
        directive: "embed or both embed and matrix may be nonactive"
      }), Object.freeze({
        id: "connective-t-impersonal",
        directive: "embed, matrix, or both may be impersonal; tla impersonal must appear on embed"
      })])
    });
    const LESSON28_ACCOMPANYING_POSSESSION_FRAME = Object.freeze({
      kind: "lesson-28-accompanying-possession-frame",
      sourceSection: "Andrews 28.8",
      construction: "possessive-state NNC adjoined as supplementary subject to connective-t VNC whose embed is ye",
      meaning: "have something along with one or on one at a given time",
      topicCanFunctionAsSupplementarySubject: true,
      topicCanFunctionAsSupplementaryPossessor: true,
      generationAllowed: false
    });
    const LESSON28_INTRANSITIVIZED_REFLEXIVE_MATRIX_FRAME = Object.freeze({
      kind: "lesson-28-intransitivized-reflexive-matrix-frame",
      sourceSection: "Andrews 28.9",
      matrixCoreDischargesTransitivityOntoReflexiveObject: true,
      reflexiveObjectPlusStemStructurallyIntransitiveInCompound: true,
      moInvariantAcrossSubjectPerson: true,
      embedMayBeTransitiveOrIntransitive: true,
      commonMatrices: Object.freeze(["m-o-cahua", "m-o-teca", "m-o-tlal-i-a", "m-o-man-a", "m-o-quetza"]),
      moManaAnimateSubjectRestriction: "not individual animate beings; animate reference must be plural"
    });
    const LESSON28_SHARED_OBJECT_FRAME = Object.freeze({
      kind: "lesson-28-shared-object-frame",
      sourceSection: "Andrews 28.10",
      connectiveTDoesNotFullySeparateEmbedAndMatrix: true,
      matrixAndEmbedBothFromTransitiveVncsWithCoreferentialObjects: true,
      objectPronounManifestationOccursOnEmbed: true,
      objectPronounMayBeReflexiveOrProjective: true,
      commonMatrices: Object.freeze(["m-o/te/tla-(tlal-i-a)", "m-o/te/tla-(quetza)", "m-o/te/tla-(teca)", "m-o/te/tla-(cahua)", "m-o/te/tla-(quix-tia)", "m-o/te/tla-(may-a-hui)"])
    });
    const LESSON28_FUTURE_EMBED_FRAME = Object.freeze({
      kind: "lesson-28-future-embed-frame",
      sourceSection: "Andrews 28.11",
      cohesivenessType: "integrated",
      sourceConstruction: "concatenate sentence with adjoined future-tense VNC as supplementary object",
      futurePredicateReplacesMatrixObjectPronoun: true,
      embedMayBeTransitiveOrIntransitive: true,
      embedValenceBecomesCompoundValence: true,
      futureTenseMorphMarksEmbedActionSubsequentToMatrixAction: true,
      matrices: Object.freeze([Object.freeze({
        id: "tla-nequi",
        andrewsStem: "tla-(nequi)",
        directive: "want or desire; passive and impersonal manifest in embed"
      }), Object.freeze({
        id: "tla-qui",
        andrewsStem: "*tla-(qui)",
        directive: "will or intend; matrix-only, imperfect tense only; conditional label is translational mirage"
      })])
    });
    const LESSON28_RECURSION_FRAME = Object.freeze({
      kind: "lesson-28-recursion-frame",
      sourceSection: "Andrews 28.12",
      compoundStemCanBecomeEmbedOfAnotherCompound: true,
      compoundStemCanBecomeMatrixOfAnotherCompound: true,
      binaryArrangementRequired: true
    });
    const LESSON28_VERBAL_EMBED_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson28-compounding",
      andrewsSection: "28.1",
      category: "compounding-transform",
      directiveEs: "La composicion combina CNV/CNN en una nueva clausula nuclear y baja relaciones sintacticas a morfologia.",
      engineSurface: "compoundAst parser metadata",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson28-matrix-embed",
      andrewsSection: "28.2",
      category: "matrix-embed-order",
      directiveEs: "La matriz siempre va despues del incrustado; la matriz decide si el compuesto es verbal o nominal.",
      engineSurface: "matrix/embed parser roles",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson28-cohesiveness",
      andrewsSection: "28.3",
      category: "linked-integrated",
      directiveEs: "El compuesto puede ser ligado o integrado; NNC+VNC queda restringido al tipo integrado.",
      engineSurface: "compound boundary metadata",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson28-verbal-embed-valence",
      andrewsSection: "28.4",
      category: "verbal-embed-valence",
      directiveEs: "El incrustado verbal decide la valencia del compuesto; la matriz decide el tipo ligado o integrado.",
      engineSurface: "parser valency metadata",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson28-connective-t",
      andrewsSection: "28.5",
      category: "connective-t",
      directiveEs: "El conectivo t/ti separa y conecta; el incrustado es preterito perfecto antes de t.",
      engineSurface: "diagnostic connective-t frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson28-intransitive-matrix",
      andrewsSection: "28.6",
      category: "intransitive-matrix",
      directiveEs: "Las matrices intransitivas son una lista limitada y no deben llamarse auxiliares.",
      engineSurface: "diagnostic matrix inventory",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson28-special-formations",
      andrewsSection: "28.7",
      category: "special-formations",
      directiveEs: "Las formaciones especiales gobiernan ye, yah, cac, itz, orden invertido, pasivo e impersonal.",
      engineSurface: "diagnostic special-formation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson28-accompanying-possession",
      andrewsSection: "28.8",
      category: "accompanying-possession",
      directiveEs: "La posesion acompanante usa una CNN posesiva como sujeto suplementario de una CNV con ye incrustado.",
      engineSurface: "supplementation boundary metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson28-reflexive-matrix",
      andrewsSection: "28.9",
      category: "intransitivized-reflexive-matrix",
      directiveEs: "La matriz reflexiva descarga su transitividad en m-o, que no cambia por persona del sujeto.",
      engineSurface: "diagnostic reflexive-matrix frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson28-shared-object",
      andrewsSection: "28.10",
      category: "shared-object",
      directiveEs: "Matriz e incrustado comparten el mismo objeto; el pronombre objeto aparece una vez en el incrustado.",
      engineSurface: "diagnostic shared-object frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson28-future-embed",
      andrewsSection: "28.11",
      category: "future-embed",
      directiveEs: "El incrustado futuro reemplaza el objeto de la matriz y su valencia se vuelve la valencia del compuesto.",
      engineSurface: "diagnostic future-embed frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson28-recursion",
      andrewsSection: "28.12",
      category: "compound-recursion",
      directiveEs: "Un compuesto puede volver a servir como incrustado o matriz en otro compuesto.",
      engineSurface: "recursive compound metadata",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    })]);
    function cloneLesson28CompoundRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneLesson28CompoundRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneLesson28CompoundRecord(value)]));
    }
    function getLesson28VerbalEmbedSubsectionInventory() {
      return LESSON28_VERBAL_EMBED_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON28_VERBAL_EMBED_VALIDATION_REFS)
      }));
    }
    function attachLesson28CompoundGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "compound-verbstem-boundary",
        routeFamily: "compound-verbstem",
        structuralSource: "Andrews Lesson 28",
        andrewsRefs: Array.from(LESSON28_VERBAL_EMBED_PDF_REFS),
        generationAllowed: false,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          orthographyStatus: "nawat-evidence-required"
        },
        ...options
      });
    }
    function buildLesson28VerbalEmbedPursuitFrame() {
      const subsectionInventory = getLesson28VerbalEmbedSubsectionInventory();
      const formulaFrame = cloneLesson28CompoundRecord(LESSON28_COMPOUND_FORMULA_FRAME);
      const matrixEmbedFrame = cloneLesson28CompoundRecord(LESSON28_MATRIX_EMBED_FRAME);
      const cohesivenessFrame = cloneLesson28CompoundRecord(LESSON28_COHESIVENESS_FRAME);
      const verbalEmbedValenceFrame = cloneLesson28CompoundRecord(LESSON28_VERBAL_EMBED_VALENCE_FRAME);
      const connectiveTFrame = cloneLesson28CompoundRecord(LESSON28_CONNECTIVE_T_FRAME);
      const intransitiveMatrixFrame = cloneLesson28CompoundRecord(LESSON28_INTRANSITIVE_MATRIX_FRAME);
      const specialFormationsFrame = cloneLesson28CompoundRecord(LESSON28_SPECIAL_FORMATIONS_FRAME);
      const accompanyingPossessionFrame = cloneLesson28CompoundRecord(LESSON28_ACCOMPANYING_POSSESSION_FRAME);
      const reflexiveMatrixFrame = cloneLesson28CompoundRecord(LESSON28_INTRANSITIVIZED_REFLEXIVE_MATRIX_FRAME);
      const sharedObjectFrame = cloneLesson28CompoundRecord(LESSON28_SHARED_OBJECT_FRAME);
      const futureEmbedFrame = cloneLesson28CompoundRecord(LESSON28_FUTURE_EMBED_FRAME);
      const recursionFrame = cloneLesson28CompoundRecord(LESSON28_RECURSION_FRAME);
      const remainingGaps = ["Current compoundAst is additive parser metadata, not full Andrews compound generation.", "Connective-t preterit-embed morphology, limited matrix inventories, and special formations are diagnostic only.", "Intransitivized-reflexive-matrix, shared-object, future-embed, passive/impersonal, and accompanying-possession behavior still need explicit engine routes.", "Nawat/Pipil spelling realization and lexical exceptions remain evidence-needed before finite output can expand."];
      const frame = {
        kind: "lesson-28-verbal-embed-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 28,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON28_VERBAL_EMBED_PDF_REFS),
        plannedArrows: [{
          id: "lesson-28-verbal-embed-compound-audit",
          type: "metadata-parser-test",
          aim: "Audit Andrews Lesson 28.1-28.12 against current compoundAst parser metadata, matrix/embed order, linked/integrated boundaries, connective-t patterns, intransitive/reflexive/shared-object matrices, future-embed behavior, and recursion.",
          andrewsRefs: Array.from(LESSON28_VERBAL_EMBED_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON28_VERBAL_EMBED_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-28-verbal-embed-compound-audit",
          result: "hit",
          correction: "Lesson 28 now records Andrews compound formulas, matrix/embed architecture, cohesiveness, connective-t requirements, intransitive/reflexive/shared-object/future-embed frames, special formations, accompanying possession, and recursion while leaving expanded generation blocked.",
          andrewsRefs: Array.from(LESSON28_VERBAL_EMBED_PDF_REFS),
          feedbackRefs: Array.from(LESSON28_VERBAL_EMBED_VALIDATION_REFS)
        }],
        subsectionInventory,
        formulaFrame,
        matrixEmbedFrame,
        cohesivenessFrame,
        verbalEmbedValenceFrame,
        connectiveTFrame,
        intransitiveMatrixFrame,
        specialFormationsFrame,
        accompanyingPossessionFrame,
        reflexiveMatrixFrame,
        sharedObjectFrame,
        futureEmbedFrame,
        recursionFrame,
        currentEngineBoundary: {
          compoundAstImplemented: true,
          compoundFrameImplemented: true,
          existingAcceptedCompoundGenerationPreserved: true,
          connectiveTGenerationImplemented: false,
          intransitiveMatrixInventoryImplemented: false,
          reflexiveMatrixGenerationImplemented: false,
          sharedObjectGenerationImplemented: false,
          futureEmbedGenerationImplemented: false,
          recursionGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachLesson28CompoundGrammarContract(frame, {
        metadataKind: "lesson-28-verbal-embed-pursuit-frame",
        routeStage: "audit-lesson-28",
        supported: true,
        sourceInput: "Andrews Lesson 28.1-28.12",
        morphBoundaryFrame: {
          connectiveTFrame,
          cohesivenessFrame,
          specialFormationsFrame
        },
        stemFrame: {
          stemKind: "compound-verbstem",
          matrixPosition: "after embed",
          embedBeforeMatrixInviolable: true,
          embedNeverFunctionsAsSubject: true,
          embedValenceDeterminesCompoundValence: true,
          intransitiveMatrixCount: intransitiveMatrixFrame.matrixCount
        },
        nuclearClauseFrame: {
          sourceClauseKinds: ["VNC", "NNC"],
          resultClauseKinds: ["compound VNC", "compound NNC"],
          binaryRecursiveCompounding: true
        },
        targetContract: {
          metadataKind: "lesson-28-verbal-embed-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["compound-verbstem-diagnostic-only", "compound-verbstem-needs-nawat-evidence"]
      });
    }
    const LESSON30_NOMINAL_EMBED_VALIDATION_REFS = Object.freeze(["src/tests/parsing.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON30_NOMINAL_EMBED_PDF_REFS = Object.freeze(["Andrews Lesson 30.1", "Andrews Lesson 30.2", "Andrews Lesson 30.3", "Andrews Lesson 30.4", "Andrews Lesson 30.5", "Andrews Lesson 30.6", "Andrews Lesson 30.7", "Andrews Lesson 30.8", "Andrews Lesson 30.9", "Andrews Lesson 30.10", "Andrews Lesson 30.11", "Andrews Lesson 30.12", "Andrews Lesson 30.13", "Andrews Lesson 30.14", "Andrews Lesson 30.15", "Andrews Lesson 30.16", "Andrews Lesson 30.17", "Andrews Lesson 30.18"]);
    const LESSON30_NOMINAL_EMBED_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-30-nominal-embed-overview-frame",
      sourceSection: "Andrews 30.1",
      sourceFormula: "NNC + VNC = compound VNC",
      compoundStructure: "integrated",
      nominalEmbedFiller: "general-use nounstem",
      sourceStates: Object.freeze(["absolutive-state NNC", "possessive-state NNC"]),
      generalUseStemExceptions: Object.freeze(["ti-class subclass 2-B ephemeral final a may remain in embed subposition", "some lexical exceptions override even the subclass 2-B exception"]),
      incorporatedNncTypes: Object.freeze(["incorporated-object", "incorporated-adverb", "incorporated-complement"])
    });
    const LESSON30_INCORPORATED_OBJECT_FRAME = Object.freeze({
      kind: "lesson-30-incorporated-object-frame",
      sourceSections: Object.freeze(["Andrews 30.2", "Andrews 30.3", "Andrews 30.4"]),
      matrixRequirement: "transitive VNC matrix",
      embeddedNncRole: "general patient area restricting matrix action",
      incorporatedObjectIsNotNuclearObject: true,
      valenceReduction: Object.freeze([Object.freeze({
        sourceMatrix: "single-object VNC",
        compoundValence: "intransitive VNC",
        objectPronounPermitted: false
      }), Object.freeze({
        sourceMatrix: "double-object VNC",
        compoundValence: "single-object VNC",
        objectPronounPermitted: true
      }), Object.freeze({
        sourceMatrix: "triple-object VNC",
        compoundValence: "double-object VNC",
        objectPronounPermitted: true
      })]),
      derivedCausativeOrApplicativeMayComeFromExistingIncorporatedObjectStem: true,
      irregularAtlIIncludesAbsolutiveNum1Filler: true,
      exceptionalTlaFusionFrame: Object.freeze({
        sourceSection: "Andrews 30.4",
        apparentObjectIncorporatedIntoTlaFusionStem: true,
        becauseTlaAlreadyRepresentsFusedObjectTheNominalEmbedMustBeAdverbial: true,
        semantics: "in the form of, having the nature of, resembling",
        analysisUnclear: true
      })
    });
    const LESSON30_INCORPORATED_ADVERB_FRAME = Object.freeze({
      kind: "lesson-30-incorporated-adverb-frame",
      sourceSections: Object.freeze(["Andrews 30.5", "Andrews 30.6"]),
      sourceTransforms: Object.freeze(["adverbial NNC in a concatenate source becomes incorporated adverb", "supplementary subject or object becomes incorporated adverb"]),
      matrixMayBeIntransitiveOrTransitive: true,
      compoundValenceRemainsMatrixValence: true,
      transformationRoutesCanLookIdenticalOnSurface: true,
      sourceAdverbialComplexityDeferredToLessons44To50: true,
      idiomaticTranslationPossible: true
    });
    const LESSON30_ADVERB_ROLE_FRAME = Object.freeze({
      kind: "lesson-30-adverb-role-frame",
      sourceSections: Object.freeze(["Andrews 30.7", "Andrews 30.8", "Andrews 30.9", "Andrews 30.10", "Andrews 30.11", "Andrews 30.12", "Andrews 30.13"]),
      roles: Object.freeze([Object.freeze({
        section: "30.7",
        role: "means-or-instrument",
        bodyPartPossessorDeletedByCoreference: true
      }), Object.freeze({
        section: "30.8",
        role: "place",
        bodyPartPossessorDeletedByCoreference: true
      }), Object.freeze({
        section: "30.9",
        role: "time-or-duration"
      }), Object.freeze({
        section: "30.10",
        role: "cause-or-purpose"
      }), Object.freeze({
        section: "30.11",
        role: "manner",
        subjectOrObjectFocus: true
      }), Object.freeze({
        section: "30.12",
        role: "compared-manner",
        orientation: "subject for intransitive; subject or object for transitive"
      }), Object.freeze({
        section: "30.13",
        role: "unique-embed-nounstems",
        simpleNncUseMissingOrUncertain: true
      })]),
      bodyPartEmbedIsNotSubject: true,
      uniqueEmbedExamples: Object.freeze(["il", "tel", "pol", "poz", "ih"]),
      ihAdverbialCanAppearInDestockalFrequentativeLikeStems: true
    });
    const LESSON30_SUPPLEMENT_TRANSFORM_FRAME = Object.freeze({
      kind: "lesson-30-supplement-transform-frame",
      sourceSection: "Andrews 30.14",
      transformTypes: Object.freeze([Object.freeze({
        id: "supplementary-subject-to-incorporated-adverb",
        sourcePrincipal: "intransitive VNC",
        adjunctRequirement: "possessive-state supplementary subject",
        possessorCaseReplacement: "possessive -> nominative",
        targetPronoun: "compound VNC subject pronoun"
      }), Object.freeze({
        id: "supplementary-object-to-incorporated-adverb",
        sourcePrincipal: "transitive VNC",
        adjunctRequirement: "possessive-state supplementary object",
        possessorCaseReplacement: "possessive -> objective",
        targetPronoun: "compound VNC object pronoun"
      }), Object.freeze({
        id: "passive-barrier-adverbialization",
        sourcePrincipal: "active transitive VNC with supplementary subject",
        rule: "supplementary subject must become an adverb to survive passivization"
      })]),
      bodyPartClothingFamilyRelationsCommon: true,
      applicativePrincipalWithBodyPartOrClothingSupplementCannotServeAsSource: true,
      surfaceIdenticalFormsCanHaveDifferentSources: true,
      lessIntimatePossessionsCanImitateTransformAndPermitApplicativeStem: true
    });
    const LESSON30_COMPLEMENT_FRAME = Object.freeze({
      kind: "lesson-30-incorporated-complement-frame",
      sourceSection: "Andrews 30.15",
      complementDefinition: "necessary addition completing something said about a personal pronoun or stem",
      compoundValenceRemainsMatrixValence: true,
      sourceNncSubjectCorefersWithMatrixSubjectOrObjectAndIsDeleted: true,
      complementTypes: Object.freeze([Object.freeze({
        id: "subject-complement",
        relation: "embed subject corefers with matrix subject"
      }), Object.freeze({
        id: "object-complement-considering",
        relation: "embed subject corefers with matrix object",
        semanticField: "considering"
      }), Object.freeze({
        id: "object-complement-changing",
        relation: "embed subject corefers with matrix object",
        semanticField: "changing into"
      })]),
      comparesToLesson51DoubleNucleusComplementation: true
    });
    const LESSON30_REDUP_NONACTIVE_CAVEAT_FRAME = Object.freeze({
      kind: "lesson-30-redup-nonactive-caveat-frame",
      sourceSections: Object.freeze(["Andrews 30.16", "Andrews 30.17", "Andrews 30.18"]),
      reduplication: Object.freeze({
        embedCanHaveReduplicativePrefix: true,
        matrixCanHaveReduplicativePrefix: true,
        bothEmbedAndMatrixCanBeReduplicated: true
      }),
      nonactive: Object.freeze({
        nonactiveStemCanFormFromAnyIncorporatedNncCompoundVerbstem: true,
        passiveIfSourceIsTransitiveWithSpecificObject: true,
        impersonalIfSourceIsIntransitiveOrOnlyNonspecificObjects: true,
        incorporatedObjectFromSingleObjectMatrixIsIntransitiveSoOnlyImpersonal: true
      }),
      caveats: Object.freeze({
        embedDoesNotRepresentAgent: true,
        embedDoesNotFunctionAsSubject: true,
        passiveAgentCannotBeMentioned: true,
        translationCanMisleadAnalysis: true
      })
    });
    const LESSON30_NOMINAL_EMBED_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson30-nnc-vnc-compound",
      andrewsSection: "30.1",
      category: "nnc-plus-vnc-integrated",
      directiveEs: "Un compuesto NNC+VNC siempre es integrado y usa el tronco nominal de uso general como incrustado.",
      engineSurface: "compoundAst lexical embed metadata",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson30-incorporated-object-stem",
      andrewsSection: "30.2",
      category: "incorporated-object-stem",
      directiveEs: "El objeto incorporado solo procede de matriz transitiva y reduce la valencia del compuesto.",
      engineSurface: "diagnostic incorporated-object frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson30-incorporated-object-vnc",
      andrewsSection: "30.3",
      category: "incorporated-object-vnc",
      directiveEs: "Las rutas de uno, dos y tres objetos bajan una posicion de valencia; causativos y aplicativos pueden derivarse de troncos ya incorporados.",
      engineSurface: "diagnostic valence-reduction frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson30-exceptional-tla-fusion",
      andrewsSection: "30.4",
      category: "exceptional-tla-fusion",
      directiveEs: "Cuando tla ya es objeto fusionado, el nominal incorporado debe analizarse como adverbial, no como otro objeto.",
      engineSurface: "diagnostic exceptional frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson30-incorporated-adverb-vnc",
      andrewsSection: "30.5",
      category: "incorporated-adverb-vnc",
      directiveEs: "El adverbio incorporado puede venir de adjuncto adverbial o de suplemento, y conserva la valencia de la matriz.",
      engineSurface: "diagnostic incorporated-adverb frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson30-incorporated-adverb-stem",
      andrewsSection: "30.6",
      category: "incorporated-adverb-stem",
      directiveEs: "Las fuentes adverbiales son complejas y se conectan con Lecciones 44-50; no basta un signo de parser.",
      engineSurface: "diagnostic adverb-source frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson30-means-instrument",
      andrewsSection: "30.7",
      category: "means-instrument-adverb",
      directiveEs: "El incrustado puede marcar medio o instrumento; posesores de partes del cuerpo se eliminan por correferencia.",
      engineSurface: "diagnostic adverb-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-place",
      andrewsSection: "30.8",
      category: "place-adverb",
      directiveEs: "El incrustado puede marcar lugar; no debe confundirse con objeto aplicativo.",
      engineSurface: "diagnostic adverb-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-time-duration",
      andrewsSection: "30.9",
      category: "time-duration-adverb",
      directiveEs: "El incrustado puede marcar tiempo o duracion, incluso con fuente nominal compuesta.",
      engineSurface: "diagnostic adverb-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-cause-purpose",
      andrewsSection: "30.10",
      category: "cause-purpose-adverb",
      directiveEs: "El incrustado puede marcar causa o proposito de la accion.",
      engineSurface: "diagnostic adverb-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-manner",
      andrewsSection: "30.11",
      category: "manner-adverb",
      directiveEs: "El incrustado puede marcar manera, forma o estilo con foco de sujeto u objeto.",
      engineSurface: "diagnostic adverb-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-compared-manner",
      andrewsSection: "30.12",
      category: "compared-manner-adverb",
      directiveEs: "La comparacion se orienta al sujeto con matriz intransitiva y al sujeto u objeto con matriz transitiva.",
      engineSurface: "diagnostic comparison-role frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson30-unique-embed-nounstems",
      andrewsSection: "30.13",
      category: "unique-embed-nounstems",
      directiveEs: "Algunos incrustados nominales solo sobreviven en compuestos y tienen significado incierto.",
      engineSurface: "diagnostic unique-embed frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson30-supplement-transform",
      andrewsSection: "30.14",
      category: "supplement-to-adverb-transform",
      directiveEs: "Un suplemento posesivo puede transformarse en adverbio; su poseedor cambia a sujeto u objeto del compuesto.",
      engineSurface: "diagnostic supplement-transform frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson30-incorporated-complement",
      andrewsSection: "30.15",
      category: "incorporated-complement",
      directiveEs: "El complemento incorporado conserva la valencia de matriz y borra el sujeto coreferente de la CNN fuente.",
      engineSurface: "diagnostic complement frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson30-reduplication",
      andrewsSection: "30.16",
      category: "embed-reduplication",
      directiveEs: "El incrustado nominal, la matriz, o ambos pueden reduplicarse.",
      engineSurface: "diagnostic reduplication frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson30-passive-impersonal",
      andrewsSection: "30.17",
      category: "nonactive-compound-vnc",
      directiveEs: "Cualquier compuesto NNC+VNC puede formar no activo; la voz pasiva o impersonal depende de la valencia fuente.",
      engineSurface: "diagnostic nonactive frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson30-embed-caveats",
      andrewsSection: "30.18",
      category: "embed-not-agent-or-subject",
      directiveEs: "El incrustado no es agente ni sujeto; la traduccion puede ocultar la estructura nahua.",
      engineSurface: "diagnostic anti-translation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneLesson30NominalEmbedRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneLesson30NominalEmbedRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneLesson30NominalEmbedRecord(value)]));
    }
    function getLesson30NominalEmbedSubsectionInventory() {
      return LESSON30_NOMINAL_EMBED_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON30_NOMINAL_EMBED_VALIDATION_REFS)
      }));
    }
    function attachLesson30NominalEmbedGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "compound-verbstem-boundary",
        routeFamily: "compound-verbstem",
        structuralSource: "Andrews Lesson 30",
        andrewsRefs: Array.from(LESSON30_NOMINAL_EMBED_PDF_REFS),
        generationAllowed: false,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          orthographyStatus: "nawat-evidence-required"
        },
        ...options
      });
    }
    function buildLesson30NominalEmbedPursuitFrame() {
      const subsectionInventory = getLesson30NominalEmbedSubsectionInventory();
      const overviewFrame = cloneLesson30NominalEmbedRecord(LESSON30_NOMINAL_EMBED_OVERVIEW_FRAME);
      const incorporatedObjectFrame = cloneLesson30NominalEmbedRecord(LESSON30_INCORPORATED_OBJECT_FRAME);
      const incorporatedAdverbFrame = cloneLesson30NominalEmbedRecord(LESSON30_INCORPORATED_ADVERB_FRAME);
      const adverbRoleFrame = cloneLesson30NominalEmbedRecord(LESSON30_ADVERB_ROLE_FRAME);
      const supplementTransformFrame = cloneLesson30NominalEmbedRecord(LESSON30_SUPPLEMENT_TRANSFORM_FRAME);
      const complementFrame = cloneLesson30NominalEmbedRecord(LESSON30_COMPLEMENT_FRAME);
      const redupNonactiveCaveatFrame = cloneLesson30NominalEmbedRecord(LESSON30_REDUP_NONACTIVE_CAVEAT_FRAME);
      const remainingGaps = ["Current compoundAst lexical-embed metadata is not an Andrews Lesson 30 generator.", "Incorporated-object valence lowering, exceptional tla-fusion analysis, and incorporated-adverb source transforms are diagnostic only.", "Supplement-to-adverb, complement incorporation, reduplication, passive/impersonal routing, and embed caveats need explicit engine gates before finite output expands.", "General-use nounstem selection, subclass exceptions, unique embeds, idioms, and Nawat/Pipil lexical evidence remain evidence-needed."];
      const frame = {
        kind: "lesson-30-nominal-embed-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 30,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON30_NOMINAL_EMBED_PDF_REFS),
        plannedArrows: [{
          id: "lesson-30-nominal-embed-compound-audit",
          type: "metadata-parser-test",
          aim: "Audit Andrews Lesson 30.1-30.18 against current lexical compound parser metadata, NNC fixture classifications, incorporated-object/adverb/complement categories, supplement transforms, reduplication, nonactive routing, and anti-translation caveats.",
          andrewsRefs: Array.from(LESSON30_NOMINAL_EMBED_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON30_NOMINAL_EMBED_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-30-nominal-embed-compound-audit",
          result: "hit",
          correction: "Lesson 30 now records Andrews NNC+VNC integrated compound architecture, incorporated-object valence lowering, incorporated-adverb roles and supplement transforms, incorporated-complement behavior, reduplication, nonactive voice routing, and caveats that the embed is neither agent nor subject while keeping expanded generation blocked.",
          andrewsRefs: Array.from(LESSON30_NOMINAL_EMBED_PDF_REFS),
          feedbackRefs: Array.from(LESSON30_NOMINAL_EMBED_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        incorporatedObjectFrame,
        incorporatedAdverbFrame,
        adverbRoleFrame,
        supplementTransformFrame,
        complementFrame,
        redupNonactiveCaveatFrame,
        currentEngineBoundary: {
          compoundAstLexicalEmbedMetadataImplemented: true,
          ordinaryNncFixtureClassificationsImplemented: true,
          unchangedAcceptedCompoundGenerationPreserved: true,
          incorporatedObjectGenerationImplemented: false,
          incorporatedAdverbGenerationImplemented: false,
          supplementTransformGenerationImplemented: false,
          incorporatedComplementGenerationImplemented: false,
          nonactiveCompoundRoutingImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachLesson30NominalEmbedGrammarContract(frame, {
        metadataKind: "lesson-30-nominal-embed-pursuit-frame",
        routeStage: "audit-lesson-30",
        supported: true,
        sourceInput: "Andrews Lesson 30.1-30.18",
        morphBoundaryFrame: {
          overviewFrame,
          incorporatedObjectFrame,
          incorporatedAdverbFrame,
          adverbRoleFrame,
          supplementTransformFrame,
          complementFrame,
          redupNonactiveCaveatFrame
        },
        stemFrame: {
          stemKind: "compound-verbstem-with-nominal-embed",
          sourceFormula: overviewFrame.sourceFormula,
          compoundStructure: overviewFrame.compoundStructure,
          nominalEmbedFiller: overviewFrame.nominalEmbedFiller,
          incorporatedNncTypes: overviewFrame.incorporatedNncTypes
        },
        nuclearClauseFrame: {
          unitKind: "VNC",
          compoundKind: "NNC+VNC compound VNC",
          matrixDeterminesClauseKind: true,
          embedDoesNotFunctionAsSubject: true
        },
        targetContract: {
          metadataKind: "lesson-30-nominal-embed-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["nominal-embed-compound-diagnostic-only", "nominal-embed-compound-needs-nawat-evidence"]
      });
    }
    function normalizeMovingTargetCoreText(value = "") {
      const placeholderProtected = targetObject.convertRegexInputSupportiveMarkersToEnvelope(String(value || ""));
      return normalizeRegexSpecialSerialShorthandCore(restoreBracketSupportiveMarkers(placeholderProtected.replace(/\//g, "-").toLowerCase()));
    }
    function getMovingTargetOuterPieceDescriptors(semantic = {}) {
      const pieces = [];
      const addLexicalEmbedPieces = (embed = "") => {
        targetObject.getComposerEmbedTokens(embed).forEach(token => {
          const normalized = targetObject.normalizeComposerStem(token);
          if (normalized) {
            pieces.push({
              type: "lexical",
              value: normalized
            });
          }
        });
      };
      const addValencePiece = (token = "") => {
        const normalized = normalizeEntradaGrammarValenceSurfaceToken(token);
        if (normalized) {
          pieces.push({
            type: "valence",
            value: normalized
          });
        }
      };
      const directionalPrefix = targetObject.normalizeComposerStem(semantic?.directional?.prefix || "");
      if (directionalPrefix) {
        pieces.push({
          type: "directional",
          value: directionalPrefix
        });
      }
      const transitivity = semantic?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        addLexicalEmbedPieces(semantic?.valence?.intransitive?.embed || "");
        addValencePiece(semantic?.valence?.intransitive?.token || "");
        return pieces;
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        addLexicalEmbedPieces(semantic?.valence?.primary?.embed || "");
        addValencePiece(semantic?.valence?.primary?.token || "");
        return pieces;
      }
      addLexicalEmbedPieces(semantic?.valence?.secondary?.embed || semantic?.valence?.primary?.embed || "");
      const secondaryPair = targetObject.parseComposerSecondaryValenceSelection(semantic?.valence?.secondary?.raw || "");
      let firstToken = secondaryPair.first || semantic?.valence?.primary?.token || "";
      let secondToken = secondaryPair.second || semantic?.valence?.secondary?.token || "";
      addValencePiece(firstToken);
      addValencePiece(secondToken);
      return pieces;
    }
    function formatMovingTargetOuterPiece(piece = null) {
      if (!piece || !piece.value) {
        return "";
      }
      return piece.type === "lexical" ? `(${piece.value})` : piece.value;
    }
    function buildMovingTargetRegexFromCoreAndPieces({
      transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive,
      coreText = "",
      outerPieces = []
    } = {}) {
      const normalizedCore = normalizeMovingTargetCoreText(coreText);
      if (!normalizedCore) {
        return "";
      }
      const normalizedPieces = (Array.isArray(outerPieces) ? outerPieces : []).map(piece => formatMovingTargetOuterPiece(piece)).filter(Boolean);
      const isPlaceholderCore = /^_+[a-z0-9]*$/i.test(normalizedCore);
      if (!normalizedPieces.length && isPlaceholderCore) {
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
          return normalizedCore;
        }
        return `-${normalizedCore}`;
      }
      const wrappedCore = `(${normalizedCore})`;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        return normalizedPieces.length ? `${normalizedPieces.join("+")}+${wrappedCore}` : wrappedCore;
      }
      const transitiveCore = `-${wrappedCore}`;
      return normalizedPieces.length ? `${normalizedPieces.join("+")}${transitiveCore}` : transitiveCore;
    }
    function stripPrefixOnce(value = "", prefix = "") {
      const source = String(value || "");
      const matchPrefix = String(prefix || "");
      return source.startsWith(matchPrefix) ? source.slice(matchPrefix.length) : source;
    }
    function getComposerDisplayExternalValenceSegments(semantic = {}) {
      const transitivity = semantic?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const toSurface = (token = "") => normalizeEntradaGrammarValenceSurfaceToken(token);
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const token = toSurface(semantic?.valence?.intransitive?.token || "");
        return token ? [token] : [];
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        const token = toSurface(semantic?.valence?.primary?.token || "");
        return token ? [token] : [];
      }
      const secondaryPair = targetObject.parseComposerSecondaryValenceSelection(semantic?.valence?.secondary?.raw || "");
      let slotOneValue = toSurface(secondaryPair.first || "");
      let slotTwoValue = toSurface(secondaryPair.second || "");
      if (!slotOneValue && !slotTwoValue) {
        slotOneValue = toSurface(semantic?.valence?.primary?.token || "");
        slotTwoValue = toSurface(semantic?.valence?.secondary?.token || "");
      }
      return [slotOneValue, slotTwoValue].filter(Boolean);
    }
    function stripLeadingComposerDisplaySegments(screenCore = "", targetSegments = []) {
      const parts = String(screenCore || "").split("-").map(part => String(part || "").trim()).filter(Boolean);
      const removed = [];
      let index = 0;
      const normalizedTargets = (Array.isArray(targetSegments) ? targetSegments : []).map(segment => String(segment || "").trim().toLowerCase()).filter(Boolean);
      while (index < normalizedTargets.length && removed.length < Math.max(0, parts.length - 1) && parts[removed.length] && parts[removed.length].toLowerCase() === normalizedTargets[index]) {
        removed.push(parts[removed.length]);
        index += 1;
      }
      return {
        removed,
        remaining: parts.slice(removed.length).join("-")
      };
    }
    function buildComposerDisplayVerbFromEnvelope(dashPrefix = "", coreText = "", options = {}) {
      const normalizedDashPrefix = String(dashPrefix || "").startsWith("--") ? "--" : String(dashPrefix || "").startsWith("-") ? "-" : "";
      let workingCore = String(coreText || "").trim();
      if (!workingCore) {
        return normalizedDashPrefix;
      }
      const semantic = options.semantic && typeof options.semantic === "object" ? options.semantic : null;
      const semanticTransitivity = String(semantic?.transitivity || "");
      const composerCoreDashPrefix = semanticTransitivity === targetObject.COMPOSER_TRANSITIVITY.transitive || semanticTransitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? "-" : normalizedDashPrefix;
      let directionalPrefix = "";
      const semanticDirectional = String(semantic?.directional?.prefix || "").trim().toLowerCase();
      const directionalMatch = workingCore.match(/^\[([a-z]+)\]\//i);
      if (semanticDirectional && workingCore.startsWith(`[${semanticDirectional}]/`)) {
        directionalPrefix = semanticDirectional;
        workingCore = workingCore.slice(semanticDirectional.length + 3);
      } else if (directionalMatch && isDirectionalPrefixToken(directionalMatch[1] || "")) {
        directionalPrefix = String(directionalMatch[1] || "").toLowerCase();
        workingCore = workingCore.slice(directionalMatch[0].length);
      }
      const screenCore = normalizeComposerScreenCoreValue(workingCore, options);
      const semanticExternalSegments = semantic ? getComposerDisplayExternalValenceSegments(semantic) : [];
      const stripped = stripLeadingComposerDisplaySegments(screenCore, semanticExternalSegments);
      let outsideSegments = [];
      if (directionalPrefix) {
        outsideSegments.push(directionalPrefix);
      }
      if (stripped.removed.length) {
        outsideSegments.push(...stripped.removed);
      }
      if (!outsideSegments.length) {
        let externalMarker = "";
        const externalMarkerMatch = workingCore.match(/^((?:TA|TE|MU|T|M))-(.+)$/);
        if (externalMarkerMatch) {
          externalMarker = String(externalMarkerMatch[1] || "").toLowerCase();
          workingCore = String(externalMarkerMatch[2] || "");
        }
        if (!directionalPrefix && !externalMarker) {
          return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
        }
        const fallbackOutsideSegments = [];
        if (directionalPrefix) {
          fallbackOutsideSegments.push(directionalPrefix);
        }
        if (externalMarker) {
          fallbackOutsideSegments.push(externalMarker);
        }
        const fallbackWrappedCore = buildRegexDisplayVerb(composerCoreDashPrefix, normalizeComposerScreenCoreValue(workingCore, options));
        return `${fallbackOutsideSegments.join("+")}${fallbackWrappedCore}`;
      }
      const remainingCore = stripped.remaining || screenCore;
      if (!remainingCore) {
        return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
      }
      const outsideText = outsideSegments.join("+");
      const wrappedCore = buildRegexDisplayVerb(composerCoreDashPrefix, remainingCore);
      return `${outsideText}${wrappedCore}`;
    }
    function buildComposerDisplayVerbFromMovingTargetParts(parsed = null, options = {}) {
      if (!parsed || parsed.isValid !== true) {
        return "";
      }
      const transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const dashPrefix = transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive || transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? "-" : "";
      const outsidePieces = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).map(piece => formatComposerDisplayMovingTargetPiece(piece, options)).filter(Boolean);
      const screenCore = normalizeComposerScreenCoreValue(parsed.coreText || "", options);
      const wrappedCore = buildRegexDisplayVerb(dashPrefix, screenCore);
      if (!outsidePieces.length) {
        return wrappedCore;
      }
      return `${outsidePieces.join("+")}${wrappedCore}`;
    }
    function serializeRegexInputValue(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const shorthandDisplayValue = serializeRegexSpecialSerialShorthandValue(raw);
      if (shorthandDisplayValue) {
        return shorthandDisplayValue;
      }
      const movingTargetParsed = parseMovingTargetRegexInput(raw);
      if (movingTargetParsed.isValid) {
        return serializeRegexSpecialSerialShorthandValue(movingTargetParsed.regexValue) || movingTargetParsed.regexValue;
      }
      return raw;
    }
    function findFinalTopLevelWrappedCore(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw.endsWith(")")) {
        return null;
      }
      let depth = 0;
      let startIndex = -1;
      for (let index = raw.length - 1; index >= 0; index -= 1) {
        const char = raw[index];
        if (char === ")") {
          depth += 1;
        } else if (char === "(") {
          depth -= 1;
          if (depth === 0) {
            startIndex = index;
            break;
          }
          if (depth < 0) {
            return null;
          }
        }
      }
      if (startIndex < 0) {
        return null;
      }
      return {
        startIndex,
        coreText: raw.slice(startIndex + 1, -1),
        prefix: raw.slice(0, startIndex)
      };
    }
    function splitTopLevelByPlus(rawValue = "") {
      const raw = String(rawValue || "");
      const parts = [];
      let depth = 0;
      let current = "";
      for (let index = 0; index < raw.length; index += 1) {
        const char = raw[index];
        if (char === "(") {
          depth += 1;
          current += char;
          continue;
        }
        if (char === ")") {
          depth -= 1;
          if (depth < 0) {
            return null;
          }
          current += char;
          continue;
        }
        if (char === "+" && depth === 0) {
          if (!current.trim()) {
            return null;
          }
          parts.push(current.trim());
          current = "";
          continue;
        }
        current += char;
      }
      if (depth !== 0 || !current.trim()) {
        return null;
      }
      parts.push(current.trim());
      return parts;
    }
    function parseMovingTargetOuterPiece(rawPiece = "") {
      const raw = String(rawPiece || "").trim();
      if (!raw) {
        return null;
      }
      const lexicalMatch = raw.match(/^\(([^()]+)\)$/);
      if (lexicalMatch) {
        return {
          type: "lexical",
          value: targetObject.normalizeComposerStem(lexicalMatch[1] || "")
        };
      }
      const normalized = targetObject.normalizeComposerStem(raw);
      if (!normalized) {
        return null;
      }
      if (isDirectionalPrefixToken(normalized)) {
        return {
          type: "directional",
          value: normalized
        };
      }
      if (targetObject.getComposerValenceFamilyToken(normalized)) {
        return {
          type: "valence",
          value: normalized
        };
      }
      return null;
    }
    function getEmbeddedSlashTransitiveObjSlotCount(rawValue = "") {
      const raw = String(rawValue || "").trim().toLowerCase();
      if (!raw.startsWith("-") || raw.startsWith("--")) {
        return null;
      }
      const body = raw.slice(1);
      if (!body || !body.includes("/")) {
        return null;
      }
      const slashIndex = body.indexOf("/");
      if (slashIndex <= 0 || slashIndex === body.length - 1) {
        return null;
      }
      const left = String(body.slice(0, slashIndex) || "").trim();
      if (!left) {
        return null;
      }
      if (left.startsWith("[i]") || left.startsWith("[y]")) {
        return null;
      }
      if (getBracketDirectionalPrefixToken(left)) {
        return null;
      }
      if (targetObject.getComposerValenceFamilyToken(left)) {
        return null;
      }
      if (targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(left.toUpperCase())) {
        return null;
      }
      return 1;
    }
    function getMovingTargetAdjacentEmbedParts(coreText = "") {
      const normalizedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(normalizeRegexCoreTokenCase(String(coreText || "").trim())).toLowerCase();
      if (!normalizedCore || !normalizedCore.includes("-")) {
        return null;
      }
      const segments = normalizedCore.split("-").map(segment => String(segment || "").trim()).filter(Boolean);
      if (segments.length !== 2) {
        return null;
      }
      const [embed, stem] = segments;
      if (!embed || !stem) {
        return null;
      }
      if (embed.startsWith("[i]") || embed.startsWith("[y]")) {
        return null;
      }
      if (isDirectionalPrefixToken(embed)) {
        return null;
      }
      if (targetObject.getComposerValenceFamilyToken(embed)) {
        return null;
      }
      if (targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(embed.toUpperCase())) {
        return null;
      }
      return {
        embed,
        stem
      };
    }
    function parseMovingTargetRegexInput(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw || raw.includes("?")) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const finalCore = findFinalTopLevelWrappedCore(raw);
      if (!finalCore) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const coreText = normalizeMovingTargetCoreText(String(finalCore.coreText || "").trim()).replace(/^-+/, "");
      if (!coreText || /[()]/.test(coreText)) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const prefix = finalCore.prefix;
      let transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
      let outerPrefix = "";
      if (!prefix) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
      } else if (prefix === "-") {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.transitive;
      } else if (prefix.endsWith("+")) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.intransitive;
        outerPrefix = prefix.slice(0, -1);
      } else if (prefix.endsWith("-")) {
        transitivity = targetObject.COMPOSER_TRANSITIVITY.transitive;
        outerPrefix = prefix.slice(0, -1);
      } else {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const outerRawPieces = outerPrefix ? splitTopLevelByPlus(outerPrefix) : [];
      if (outerPrefix && !outerRawPieces) {
        return {
          isValid: false,
          regexValue: ""
        };
      }
      const parsedPieces = [];
      let directionalPrefix = "";
      for (let index = 0; index < outerRawPieces.length; index += 1) {
        const parsedPiece = parseMovingTargetOuterPiece(outerRawPieces[index]);
        if (!parsedPiece || !parsedPiece.value) {
          return {
            isValid: false,
            regexValue: ""
          };
        }
        if (parsedPiece.type === "directional") {
          if (index !== 0 || directionalPrefix) {
            return {
              isValid: false,
              regexValue: ""
            };
          }
          directionalPrefix = parsedPiece.value;
        }
        parsedPieces.push(parsedPiece);
      }
      const valenceCount = parsedPieces.filter(piece => piece.type === "valence").length;
      const resolvedTransitivity = transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive && valenceCount >= 2 ? targetObject.COMPOSER_TRANSITIVITY.bitransitive : transitivity;
      const regexValue = buildMovingTargetRegexFromCoreAndPieces({
        transitivity: resolvedTransitivity,
        coreText,
        outerPieces: parsedPieces
      });
      return {
        isValid: Boolean(regexValue),
        regexValue,
        transitivity: resolvedTransitivity,
        outerPieces: parsedPieces,
        directionalPrefix,
        coreText
      };
    }

    // ─── CanonicalVerbSpec ────────────────────────────────────────────────────────
    // Intermediate upstream object using composer vocabulary as canonical field
    // names. Both the regex parsing path and the composer semantic path produce
    // one of these, which is then consumed by buildVerbMetaFromCanonicalSpec().
    //
    // Fields (composer vocabulary → regex syntax alias):
    //   matrixStem       – the verb root                    (matrix.stem)
    //   adjacentEmbed    – slash-adjacent embed prefix      (matrix.adjacentEmbed / hasSuffixSeparator)
    //   transitivity     – "intransitive"|"transitive"|…    (transitivity / hasLeadingDash)
    //   valenceTokens    – object markers [primary, …]      (valence.primary.token / outerValenceTokens)
    //   valenceEmbeds    – lexical bound prefixes           (valence.primary.embed / outerLexicalPrefixes)
    //   directionalPrefix– directional prefix token         (directional.prefix)
    //   supportiveMarker – "i"|"y"|""                       (supportiveMarker / hasOptionalSupportiveI)
    //   tiCausativeClass – "become"|"have"|""               (ti.causativeClass)
    //   isYawi / isWeya  – suppletive flags
    // ─────────────────────────────────────────────────────────────────────────────

    // Builds a CanonicalVerbSpec from the output of parseMovingTargetRegexInput().
    function buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata) {
      if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
      }
      const parsed = movingTargetParsed;
      const outerPieces = Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [];
      // directionalPrefix — composer: directional.prefix
      const directionalPrefix = targetObject.normalizeComposerStem(parsed.directionalPrefix || "");
      // valenceTokens — composer: valence.primary.token, valence.secondary.token
      const valenceTokens = outerPieces.filter(piece => piece && piece.type === "valence" && piece.value).map(piece => normalizeEntradaGrammarValenceSurfaceToken(piece.value)).filter(Boolean);
      // valenceEmbeds — composer: valence.primary.embed (lexical bound prefixes)
      const valenceEmbeds = outerPieces.filter(piece => piece && piece.type === "lexical" && piece.value).map(piece => targetObject.normalizeRuleBase(piece.value)).filter(Boolean);
      // supportiveMarker — composer: supportiveMarker ("i"|"y"|"")
      const markedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(normalizeRegexCoreTokenCase(String(parsed.coreText || "").trim()));
      const supportiveResolution = targetObject.resolveOptionalSupportiveMarkedSurface({
        precedingSurface: `${directionalPrefix}${valenceTokens.join("")}${valenceEmbeds.join("")}`,
        markedSurface: markedCore,
        inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false
      });
      const supportiveMarker = supportiveResolution.markerLetter || "";
      // adjacentEmbed — composer: matrix.adjacentEmbed (slash-adjacent prefix)
      const plainCore = String(supportiveResolution.plainSurface || markedCore || "").trim().toLowerCase();
      const inlineSurface = targetObject.parseInlineTiCausativeClassFromBase(targetObject.collapseSerialStemDashInput(plainCore));
      const normalizedCoreBase = String(inlineSurface.base || plainCore || "").trim().toLowerCase();
      const supportFreeCore = stripLeadingSupportiveLetterFromCoreSurface(normalizedCoreBase, supportiveMarker);
      const inlineRuleBase = targetObject.parseInlineTiCausativeClassFromBase(targetObject.collapseSerialStemDashInput(supportFreeCore));
      const normalizedRuleCoreBase = String(inlineRuleBase.base || supportFreeCore || "").trim().toLowerCase();
      const transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
      const adjacentEmbed = adjacentCoreEmbed ? targetObject.normalizeRuleBase(adjacentCoreEmbed.embed) : "";
      // matrixStem — composer: matrix.stem (the rightmost verb root)
      const matrixStem = targetObject.normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
      const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedRuleCoreBase);
      const matrixRuleBase = targetObject.normalizeRuleBase(ruleAdjacentCoreEmbed ? ruleAdjacentCoreEmbed.stem : normalizedRuleCoreBase);
      // tiCausativeClass — composer: ti.causativeClass
      const tiCausativeClass = tiInputMetadata?.tiCausativeClass || inlineSurface.tiCausativeClass || inlineRuleBase.tiCausativeClass || "";
      // isYawi / isWeya — suppletive form detection
      const isSpecificToken = (token = "") => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
      const isNonspecificToken = (token = "") => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const hasExplicitTransitivityMarkers = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive || valenceTokens.some(isSpecificToken) || valenceTokens.some(isNonspecificToken);
      const yawiCanonical = targetObject.getSuppletiveYawiCanonical();
      const yawiWithoutSupportive = yawiCanonical.startsWith("y") ? yawiCanonical.slice(1) : "";
      const matchesOptionalSupportiveYawi = supportiveMarker === "y" && Boolean(yawiWithoutSupportive) && matrixStem === yawiWithoutSupportive;
      const isYawi = !hasExplicitTransitivityMarkers && (matrixStem === yawiCanonical || matchesOptionalSupportiveYawi);
      const isWeya = !hasExplicitTransitivityMarkers && SUPPLETIVE_WEYA_FORMS.has(matrixStem);
      return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya
      };
    }

    // Builds a CanonicalVerbSpec from the output of buildComposerSemanticState().
    function buildCanonicalVerbSpecFromComposerSemantic(semantic = {}) {
      if (!semantic || typeof semantic !== "object") {
        return null;
      }
      const transitivity = semantic.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      // matrixStem — the active slot's verb root
      const matrixStem = targetObject.normalizeRuleBase(String(semantic.matrix?.stem || semantic.matrix?.regexStem || "").trim().toLowerCase());
      // adjacentEmbed — slash-adjacent embed prefix inside the core slot
      const adjacentEmbed = targetObject.normalizeRuleBase(String(semantic.matrix?.adjacentEmbed || "").trim().toLowerCase());
      // valenceTokens — primary and secondary object markers per transitivity
      const valenceTokensRaw = [];
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const tok = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.intransitive?.token || "");
        if (tok) valenceTokensRaw.push(tok);
      } else {
        const tok = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.primary?.token || "");
        if (tok) valenceTokensRaw.push(tok);
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
          const tok2 = normalizeEntradaGrammarValenceSurfaceToken(semantic.valence?.secondary?.token || "");
          if (tok2) valenceTokensRaw.push(tok2);
        }
      }
      const valenceTokens = valenceTokensRaw.filter(Boolean);
      // valenceEmbeds — lexical bound prefixes paired with the valence slots
      const valenceEmbedsRaw = [];
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        const emb = targetObject.normalizeRuleBase(semantic.valence?.intransitive?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
      } else {
        const emb = targetObject.normalizeRuleBase(semantic.valence?.primary?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
        if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
          const emb2 = targetObject.normalizeRuleBase(semantic.valence?.secondary?.embed || "");
          if (emb2) valenceEmbedsRaw.push(emb2);
        }
      }
      const valenceEmbeds = valenceEmbedsRaw.filter(Boolean);
      const directionalPrefix = targetObject.normalizeComposerStem(semantic.directional?.prefix || "");
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(semantic.supportiveMarker || "");
      const surfaceCorePath = adjacentEmbed ? `${adjacentEmbed}-${matrixStem}` : matrixStem;
      const supportFreeCorePath = stripLeadingSupportiveLetterFromCoreSurface(surfaceCorePath, supportiveMarker);
      const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(supportFreeCorePath);
      const matrixRuleBase = targetObject.normalizeRuleBase(ruleAdjacentCoreEmbed ? ruleAdjacentCoreEmbed.stem : supportFreeCorePath);
      const tiCausativeClass = targetObject.normalizeTiCausativeClass(semantic.ti?.causativeClass || "");
      // isYawi / isWeya — suppletive form detection (same logic as parsing path)
      const isSpecificToken = (token = "") => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
      const isNonspecificToken = (token = "") => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const hasExplicitTransitivityMarkers = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive || valenceTokens.some(isSpecificToken) || valenceTokens.some(isNonspecificToken);
      const yawiCanonical = targetObject.getSuppletiveYawiCanonical();
      const yawiWithoutSupportive = yawiCanonical.startsWith("y") ? yawiCanonical.slice(1) : "";
      const matchesOptionalSupportiveYawi = supportiveMarker === "y" && Boolean(yawiWithoutSupportive) && matrixStem === yawiWithoutSupportive;
      const isYawi = !hasExplicitTransitivityMarkers && (matrixStem === yawiCanonical || matchesOptionalSupportiveYawi);
      const isWeya = !hasExplicitTransitivityMarkers && SUPPLETIVE_WEYA_FORMS.has(matrixStem);
      return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya
      };
    }
    const ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER = Object.freeze(["morph-boundary-frame", "formula-boundary", "stem-frame", "valence-frame", "object-frame", "route-frame", "function-use-frame"]);
    const ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES = Object.freeze(["Lesson 1 morph/allomorph evidence is staged before formula boundaries.", "Stem behavior is staged separately from valence behavior.", "Valence behavior is staged separately from object slot ownership.", "Object slots remain structural slots until the valence frame is fixed.", "Function-use is downstream and may annotate only already licensed readings."]);
    const ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE = Object.freeze({
      nech: Object.freeze({
        formulaMorph: "n-ech",
        morphs: Object.freeze(["n", "ech"])
      }),
      tech: Object.freeze({
        formulaMorph: "t-ech",
        morphs: Object.freeze(["t", "ech"])
      }),
      metz: Object.freeze({
        formulaMorph: "m-etz",
        morphs: Object.freeze(["m", "etz"])
      }),
      metzin: Object.freeze({
        formulaMorph: "m-etz-in",
        morphs: Object.freeze(["m", "etz", "in"])
      }),
      ki: Object.freeze({
        formulaMorph: "ki-0",
        morphs: Object.freeze(["ki", "0"])
      }),
      k: Object.freeze({
        formulaMorph: "k-0",
        morphs: Object.freeze(["k", "0"])
      }),
      kin: Object.freeze({
        formulaMorph: "k-in",
        morphs: Object.freeze(["k", "in"])
      })
    });
    const ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH = Object.freeze(Object.fromEntries(Object.entries(ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE).map(([surfaceMorph, frame]) => [frame.formulaMorph, surfaceMorph])));
    function cloneEntradaGrammarObjectRecord(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      try {
        return JSON.parse(JSON.stringify(record));
      } catch (_error) {
        return null;
      }
    }
    function hasEntradaGrammarFormulaSlotEvidence(sourceFormulaSlots = null, sourceFormulaEcho = "") {
      return Boolean(sourceFormulaSlots && typeof sourceFormulaSlots === "object" && Object.keys(sourceFormulaSlots).length) || Boolean(String(sourceFormulaEcho || "").trim());
    }
    function getEntradaGrammarFormulaSlotObjectValue(slot = null) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      return String(slot.token || slot.prefix || slot.displayPrefix || slot.surface || slot.value || "").trim();
    }
    function getEntradaGrammarFormulaSlotStemValue(slot = null) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      return String(slot.stem || slot.displayStem || slot.token || slot.surface || slot.value || "").trim();
    }
    function normalizeEntradaGrammarMorphToken(value = "") {
      return String(value || "").trim().toLowerCase();
    }
    function getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph = "") {
      const normalized = normalizeEntradaGrammarMorphToken(surfaceMorph);
      if (!normalized) {
        return null;
      }
      const frame = ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE[normalized];
      if (!frame) {
        return null;
      }
      return {
        surfaceMorph: normalized,
        formulaMorph: frame.formulaMorph,
        morphs: Array.from(frame.morphs)
      };
    }
    function getEntradaGrammarSurfaceForEarlyAllomorph(formulaMorph = "") {
      return ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH[normalizeEntradaGrammarMorphToken(formulaMorph)] || "";
    }
    function getEntradaGrammarFormulaMorphForSurface(surfaceMorph = "") {
      const frame = getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph);
      return frame?.formulaMorph || normalizeEntradaGrammarMorphToken(surfaceMorph);
    }
    function normalizeEntradaGrammarValenceSurfaceToken(value = "") {
      return targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value) || getEntradaGrammarEarlyAllomorphFrameForSurface(value)?.surfaceMorph || "";
    }
    function getEntradaGrammarMorphicVariantsForSurface(surfaceMorph = "") {
      const normalizedSurface = normalizeEntradaGrammarMorphToken(surfaceMorph);
      const variants = new Set();
      if (normalizedSurface) {
        variants.add(normalizedSurface);
      }
      const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(normalizedSurface);
      if (allomorphFrame?.formulaMorph) {
        variants.add(allomorphFrame.formulaMorph);
      }
      const surfaceFromFormula = getEntradaGrammarSurfaceForEarlyAllomorph(normalizedSurface);
      if (surfaceFromFormula) {
        variants.add(surfaceFromFormula);
      }
      return variants;
    }
    function entradaGrammarFormulaObjectValueCoversToken(formulaValue = "", token = "") {
      const normalizedFormulaValue = normalizeEntradaGrammarMorphToken(formulaValue);
      if (!normalizedFormulaValue) {
        return false;
      }
      return getEntradaGrammarMorphicVariantsForSurface(token).has(normalizedFormulaValue);
    }
    function buildEntradaGrammarFormulaObjectCoverage({
      objectSlots = [],
      sourceFormulaSlots = null
    } = {}) {
      const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : {};
      const requiredObjectSlots = (Array.isArray(objectSlots) ? objectSlots : []).filter(entry => entry?.ownsObjectSlot === true).map(entry => ({
        slotId: String(entry.slotId || "").trim(),
        token: String(entry.token || "").trim()
      })).filter(entry => entry.slotId && entry.token);
      const missingObjectSlots = requiredObjectSlots.filter(entry => {
        const formulaValue = getEntradaGrammarFormulaSlotObjectValue(slots[entry.slotId]);
        if (entradaGrammarFormulaObjectValueCoversToken(formulaValue, entry.token)) {
          return false;
        }
        if (entry.token === "mu" && entradaGrammarFormulaObjectValueCoversToken(getEntradaGrammarFormulaSlotObjectValue(slots.reflexivo), "mu")) {
          return false;
        }
        return true;
      });
      return {
        requiredObjectSlots,
        missingObjectSlots,
        objectSlotsCovered: missingObjectSlots.length === 0
      };
    }
    function buildEntradaGrammarObjectValenceSlots(spec = null) {
      const transitivity = spec?.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const tokens = Array.isArray(spec?.valenceTokens) ? spec.valenceTokens.map(entry => normalizeEntradaGrammarValenceSurfaceToken(entry)).filter(Boolean) : [];
      const embeds = Array.isArray(spec?.valenceEmbeds) ? spec.valenceEmbeds.map(entry => targetObject.normalizeRuleBase(entry)).filter(Boolean) : [];
      return tokens.map((token, index) => {
        const ownsObjectSlot = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive;
        const slotId = ownsObjectSlot ? `obj${index + 1}` : `valence${index + 1}`;
        const formulaMorph = getEntradaGrammarFormulaMorphForSurface(token);
        const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(token);
        return {
          slotId,
          token,
          formulaMorph,
          allomorphicFormulaMorph: allomorphFrame ? allomorphFrame.formulaMorph : "",
          morphs: allomorphFrame ? allomorphFrame.morphs : [token],
          embed: embeds[index] || "",
          role: ownsObjectSlot ? "object-marker" : "valence-marker",
          ownsObjectSlot,
          sourceLayer: ownsObjectSlot ? "object-frame" : "valence-frame"
        };
      });
    }
    function buildEntradaGrammarObjectObjectVector(valenceSlots = []) {
      const vector = {
        obj1: "",
        obj2: "",
        obj3: "",
        reflexivo: ""
      };
      (Array.isArray(valenceSlots) ? valenceSlots : []).filter(entry => entry?.ownsObjectSlot === true).forEach(entry => {
        if (Object.prototype.hasOwnProperty.call(vector, entry.slotId)) {
          vector[entry.slotId] = entry.token || "";
        }
        if (entry.slotId === "obj1" && entry.token === "mu") {
          vector.reflexivo = "mu";
        }
      });
      return vector;
    }
    function buildEntradaGrammarObjectCandidateFormulaSlots({
      spec = null,
      objectVector = null
    } = {}) {
      const slots = {};
      const matrixStem = String(spec?.matrixStem || "").trim();
      if (matrixStem) {
        slots.predicateStem = {
          slot: "predicateStem",
          stem: matrixStem,
          ruleBase: String(spec?.matrixRuleBase || matrixStem),
          adjacentEmbed: String(spec?.adjacentEmbed || ""),
          ownerLayer: "stem-frame"
        };
      }
      ["obj1", "obj2", "obj3", "reflexivo"].forEach(slotId => {
        const value = String(objectVector?.[slotId] || "").trim();
        if (value) {
          const formulaMorph = getEntradaGrammarFormulaMorphForSurface(value);
          slots[slotId] = {
            slot: slotId,
            token: formulaMorph,
            surfaceToken: value,
            allomorphicFormulaMorph: formulaMorph !== value ? formulaMorph : "",
            ownerLayer: "object-frame"
          };
        }
      });
      return slots;
    }
    function buildEntradaGrammarObjectMorphBoundaryFrame({
      spec = null,
      valenceSlots = [],
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceBlock = "#1 Entrada"
    } = {}) {
      const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : {};
      const objectMorphs = (Array.isArray(valenceSlots) ? valenceSlots : []).map(slot => {
        const surfaceMorph = normalizeEntradaGrammarMorphToken(slot.token || "");
        if (!surfaceMorph) {
          return null;
        }
        const formulaSlotMorph = getEntradaGrammarFormulaSlotObjectValue(slots[slot.slotId]);
        const allomorphFrame = getEntradaGrammarEarlyAllomorphFrameForSurface(surfaceMorph);
        const formulaMorph = formulaSlotMorph || allomorphFrame?.formulaMorph || surfaceMorph;
        const governingFrame = typeof targetObject.buildLesson6NawatValenceGoverningFrame === "function" ? targetObject.buildLesson6NawatValenceGoverningFrame(surfaceMorph, {
          stem: spec?.matrixStem || "",
          visibleFormulaPrefix: formulaMorph
        }) : null;
        return {
          slotId: String(slot.slotId || ""),
          role: String(slot.role || ""),
          surfaceMorph,
          formulaMorph,
          morphs: allomorphFrame?.morphs || [surfaceMorph],
          allomorphyKind: allomorphFrame ? "lesson-1-morph-boundary-object-prefix" : "lesson-1-morph-boundary-same-surface",
          governingFrame,
          governingFrameKind: governingFrame?.kind || "",
          governingPath: governingFrame?.governingPath || "",
          governingSlotId: governingFrame?.valencePosition || "",
          valencePosition: governingFrame?.valencePosition || "",
          predicatePositionStatus: governingFrame?.predicatePositionStatus || "",
          sourceSections: governingFrame?.sourceSections || [],
          va: governingFrame?.va || null,
          va1: governingFrame?.va1 || null,
          va2: governingFrame?.va2 || null,
          ownerLayer: String(slot.sourceLayer || ""),
          beforeFormulaBoundary: true
        };
      }).filter(Boolean);
      const predicateFormulaStem = getEntradaGrammarFormulaSlotStemValue(slots.predicateStem);
      const predicateSurfaceStem = normalizeEntradaGrammarMorphToken(spec?.matrixStem || "");
      const stemAllomorphs = predicateFormulaStem && predicateSurfaceStem && normalizeEntradaGrammarMorphToken(predicateFormulaStem) !== predicateSurfaceStem ? [{
        slotId: "predicateStem",
        role: "predicate-stem",
        formulaMorph: normalizeEntradaGrammarMorphToken(predicateFormulaStem),
        surfaceMorph: predicateSurfaceStem,
        allomorphyKind: "lesson-1-morph-boundary-stem-shape",
        ownerLayer: "stem-frame",
        beforeFormulaBoundary: true
      }] : [];
      const governedObjectMorphs = objectMorphs.filter(entry => entry.governingFrame);
      const objectAllomorphs = objectMorphs.filter(entry => entry.formulaMorph !== entry.surfaceMorph).map(entry => ({
        slotId: entry.slotId,
        role: entry.role,
        surfaceMorph: entry.surfaceMorph,
        formulaMorph: entry.formulaMorph,
        morphs: entry.morphs,
        allomorphyKind: entry.allomorphyKind,
        ownerLayer: entry.ownerLayer,
        beforeFormulaBoundary: entry.beforeFormulaBoundary
      }));
      const allomorphs = [...objectAllomorphs, ...stemAllomorphs];
      return {
        kind: "andrews-lesson-1-entrada-morph-boundary-frame",
        version: 1,
        sourceLesson: "Andrews Lesson 1",
        sourceSections: ["Andrews §1.8", "Andrews §1.11", "Andrews Lesson 4"],
        stageBlock: String(sourceBlock || "#1 Entrada"),
        evaluationOrder: "before-formula-boundary",
        sourceLayer: "morph-boundary-frame",
        beforeFormulaBoundary: true,
        formulaBoundaryConsumesMorphEvidence: true,
        formulaSlotIsLiteralSpelling: false,
        allomorphyIsEntradaEvidence: true,
        functionUseEvaluationOrder: "last",
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        valenceGoverningFrame: typeof targetObject.getLesson6NawatValenceGoverningInventory === "function" ? targetObject.getLesson6NawatValenceGoverningInventory() : null,
        objectMorphs,
        governedObjectMorphs,
        stemAllomorphs,
        allomorphs
      };
    }
    function buildEntradaGrammarObjectFromCanonicalVerbSpec(spec = null, {
      rawInput = "",
      sourceBlock = "#1 Entrada",
      sourceUnit = "CNV",
      sourceKind = "verbal-nuclear-clause",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      valenceFrameFixed = null,
      routeRecordId = ""
    } = {}) {
      if (!spec || typeof spec !== "object") {
        return null;
      }
      const transitivity = spec.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const valenceSlots = buildEntradaGrammarObjectValenceSlots(spec);
      const objectSlots = valenceSlots.filter(entry => entry.ownsObjectSlot === true);
      const objectVector = buildEntradaGrammarObjectObjectVector(valenceSlots);
      const explicitFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? cloneEntradaGrammarObjectRecord(sourceFormulaSlots) : null;
      const formulaEvidencePresent = hasEntradaGrammarFormulaSlotEvidence(explicitFormulaSlots, sourceFormulaEcho);
      const formulaObjectCoverage = buildEntradaGrammarFormulaObjectCoverage({
        objectSlots,
        sourceFormulaSlots: explicitFormulaSlots
      });
      const resolvedValenceFrameFixed = valenceFrameFixed === null ? formulaEvidencePresent && formulaObjectCoverage.objectSlotsCovered : valenceFrameFixed === true;
      const candidateFormulaSlots = buildEntradaGrammarObjectCandidateFormulaSlots({
        spec,
        objectVector
      });
      const morphBoundaryFrame = buildEntradaGrammarObjectMorphBoundaryFrame({
        spec,
        valenceSlots,
        sourceFormulaSlots: explicitFormulaSlots,
        sourceFormulaEcho,
        sourceBlock
      });
      return {
        kind: "andrews-entrada-grammar-object",
        version: 1,
        sourceBlock: String(sourceBlock || "#1 Entrada"),
        rawInput: String(rawInput || ""),
        layerOrder: Array.from(ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER),
        sourceUnit: String(sourceUnit || "CNV"),
        sourceKind: String(sourceKind || "verbal-nuclear-clause"),
        morphBoundaryFrame,
        formulaBoundaryFrame: {
          stageBlock: String(sourceBlock || "#1 Entrada"),
          formulaType: String(sourceUnit || "CNV"),
          frameFixed: formulaEvidencePresent,
          valenceFrameFixed: resolvedValenceFrameFixed,
          sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
          sourceFormulaSlots: explicitFormulaSlots,
          candidateFormulaSlots,
          candidateSlotsDoNotLicenseFunctionUse: true,
          formulaEvidencePresent,
          objectSlotsCovered: formulaObjectCoverage.objectSlotsCovered,
          missingObjectSlots: formulaObjectCoverage.missingObjectSlots
        },
        stemFrame: {
          matrixStem: String(spec.matrixStem || ""),
          matrixRuleBase: String(spec.matrixRuleBase || spec.matrixStem || ""),
          adjacentEmbed: String(spec.adjacentEmbed || ""),
          directionalPrefix: String(spec.directionalPrefix || ""),
          supportiveMarker: String(spec.supportiveMarker || ""),
          tiCausativeClass: String(spec.tiCausativeClass || ""),
          rank: "verbstem",
          sourceLayer: "stem-frame"
        },
        valenceFrame: {
          transitivity,
          tokens: valenceSlots.map(entry => entry.token),
          lexicalEmbeds: Array.isArray(spec.valenceEmbeds) ? spec.valenceEmbeds.map(entry => targetObject.normalizeRuleBase(entry)).filter(Boolean) : [],
          slots: valenceSlots,
          frameFixed: resolvedValenceFrameFixed,
          fixedBy: resolvedValenceFrameFixed ? "formula-slot-evidence" : "",
          sourceLayer: "valence-frame"
        },
        objectFrame: {
          slots: objectSlots,
          vector: objectVector,
          hasObjectSlots: objectSlots.length > 0,
          slotOwnership: objectSlots.length ? "entrada-object-frame" : "none",
          frameFixed: resolvedValenceFrameFixed,
          sourceLayer: "object-frame"
        },
        routeFrame: {
          routeRecordId: String(routeRecordId || ""),
          routeRankingAllowed: resolvedValenceFrameFixed,
          requiresFixedValenceFrameBeforeFunctionUse: true,
          sourceLayer: "route-frame"
        },
        functionUseFrame: {
          status: "deferred",
          evaluationOrder: "last",
          downstreamOfValenceFrame: true,
          mayAnnotateLicensedReadingsOnly: true,
          consumesValenceObjectStructure: false,
          createsValenceObjectStructure: false,
          relocatesValenceObjectStructure: false,
          reclassifiesValenceObjectStructure: false,
          sourceLayer: "function-use-frame"
        },
        antiConflationRules: Array.from(ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES)
      };
    }
    function buildEntradaGrammarObjectFromComposerSemantic(semantic = null, options = {}) {
      const spec = buildCanonicalVerbSpecFromComposerSemantic(semantic || {});
      return buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, options);
    }
    function buildEntradaGrammarObjectFromMovingTargetParsed(rawValue = "", movingTargetParsed = null, tiInputMetadata = null, options = {}) {
      const spec = buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata);
      return buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, {
        rawInput: rawValue,
        ...options
      });
    }
    function getCompoundAstExternalObjectSlotId(index = 0) {
      const numeric = Number(index);
      return `obj${Number.isFinite(numeric) && numeric >= 0 ? numeric + 1 : 1}`;
    }
    function buildCompoundAstExternalObjectSlots(compoundAst = null) {
      const tokens = Array.isArray(compoundAst?.valency?.tokens) ? compoundAst.valency.tokens : [];
      return tokens.map((token, index) => ({
        slotId: getCompoundAstExternalObjectSlotId(index),
        prefix: String(token || ""),
        owner: "source-valence-frame"
      })).filter(slot => slot.prefix);
    }
    function buildCompoundAstRouteFrame(compoundAst = null) {
      if (!compoundAst || typeof compoundAst !== "object") {
        return null;
      }
      const embeds = Array.isArray(compoundAst.embeds) ? compoundAst.embeds : [];
      const lexicalEmbeds = embeds.filter(entry => entry?.kind === "lexical");
      const sourceExternalObjectSlots = buildCompoundAstExternalObjectSlots(compoundAst);
      const remainingExternalObjectSlots = sourceExternalObjectSlots.map(slot => ({
        ...slot,
        owner: "unfixed-matrix-route-frame"
      }));
      const matrixValence = String(compoundAst.valency?.transitivity || "");
      const sourceFormula = lexicalEmbeds.length ? "NNC + VNC = compound VNC" : "VNC + VNC = compound VNC";
      const routeFrame = {
        kind: "andrews-compound-ast-route-frame",
        version: 1,
        sourceFormula,
        andrewsSection: lexicalEmbeds.length ? "Andrews Lesson 30" : "Andrews Lesson 28",
        generationStatus: "diagnostic-only",
        generationAllowed: false,
        sourcePrincipalVnc: {
          role: "matrix",
          stem: String(compoundAst.matrix?.stem || ""),
          ruleBase: String(compoundAst.matrix?.ruleBase || compoundAst.matrix?.stem || ""),
          matrixPosition: "after embed",
          valence: matrixValence,
          externalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          }))
        },
        sourceAdjunctNnc: lexicalEmbeds[0] ? {
          role: String(lexicalEmbeds[0].role || ""),
          stem: String(lexicalEmbeds[0].value || ""),
          source: String(lexicalEmbeds[0].source || "")
        } : null,
        sourceAdjunctNncs: lexicalEmbeds.map(entry => ({
          role: String(entry.role || ""),
          stem: String(entry.value || ""),
          source: String(entry.source || "")
        })),
        sourceEmbeds: embeds.map(entry => ({
          role: String(entry.role || ""),
          kind: String(entry.kind || ""),
          value: String(entry.value || ""),
          source: String(entry.source || "")
        })),
        matrixValence,
        matrixValenceFrameFixed: false,
        embedRole: embeds.length === 1 ? String(embeds[0]?.role || "") : "multiple-parser-embed-roles",
        embedRoleStatus: "parser-role-unresolved-until-route-frame",
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        valenceDelta: {
          sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
          consumedObjectSlotCount: 0,
          remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
          unresolvedUntilValenceFrameFixed: true
        },
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        routeFrameLicensesEmbedRole: false,
        routeFrameLicensesObjectSlotOwnership: false,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        objectSlotOwnership: {
          kind: "compound-ast-object-slot-ownership-frame",
          matrixValence,
          matrixValenceFrameFixed: false,
          matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
          routeFrameOwnsObjectSlotLicensing: false,
          routeFrameLicensesObjectSlotOwnership: false,
          sourceExternalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          })),
          remainingExternalObjectSlots: remainingExternalObjectSlots.map(slot => ({
            ...slot
          })),
          consumedObjectSlot: "",
          consumedObjectSlotOwnedBy: "none",
          sourceExternalObjectSlotsOwnedBy: sourceExternalObjectSlots.length ? "source-valence-frame" : "none",
          remainingExternalObjectSlotsOwnedBy: remainingExternalObjectSlots.length ? "unfixed-matrix-route-frame" : "none",
          functionUseOwnsObjectSlots: false,
          finalFormulaShapeOwnsObjectSlots: false,
          functionUseMayAnnotateLicensedReadingsOnly: true
        }
      };
      return routeFrame;
    }
    function buildCompoundAstMetadata({
      sourceRawVerb = "",
      displayVerb = "",
      displayCore = "",
      verb = "",
      analysisVerb = "",
      matrixStem = "",
      matrixRuleBase = "",
      transitivity = "",
      outerValenceTokens = [],
      outerLexicalPrefixes = [],
      structuralOuterPieces = [],
      coreStructuralPrefixParts = [],
      embeddedPrefix = "",
      sourcePrefix = "",
      sourceBase = "",
      verbSegment = "",
      parts = [],
      hasCompoundMarker = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasBoundMarker = false,
      hasImpersonalTaPrefix = false,
      hasSpecificValence = false,
      hasNonspecificValence = false,
      isMarkedTransitive = false,
      isTaFusion = false,
      valenceSlotCount = 0
    } = {}) {
      const normalizedOuterPieces = (Array.isArray(structuralOuterPieces) ? structuralOuterPieces : []).map((piece, index) => ({
        type: String(piece?.type || ""),
        value: targetObject.normalizeRuleBase(piece?.value || ""),
        index
      })).filter(piece => piece.type && piece.value);
      const normalizedCorePieces = (Array.isArray(coreStructuralPrefixParts) ? coreStructuralPrefixParts : []).map((piece, index) => ({
        type: String(piece?.type || ""),
        value: targetObject.normalizeRuleBase(piece?.value || ""),
        index
      })).filter(piece => piece.type && piece.value);
      const hasCompoundStructure = Boolean(hasCompoundMarker || normalizedCorePieces.some(piece => piece.type === "adjacent-embed") || normalizedOuterPieces.some(piece => piece.type === "lexical"));
      if (!hasCompoundStructure) {
        return null;
      }
      const embeds = [];
      normalizedOuterPieces.forEach(piece => {
        if (piece.type === "directional") {
          return;
        }
        const isLexical = piece.type === "lexical";
        const role = isLexical ? "outer-lexical" : hasImpersonalTaPrefix ? "impersonal-valence" : "outer-valence";
        embeds.push({
          role,
          kind: piece.type,
          value: piece.value,
          source: "outer",
          index: piece.index,
          explicit: !isLexical
        });
      });
      normalizedCorePieces.filter(piece => piece.type === "adjacent-embed").forEach(piece => {
        embeds.push({
          role: "adjacent-core-embed",
          kind: "lexical",
          value: piece.value,
          source: "core",
          index: piece.index,
          explicit: false
        });
      });
      if (!embeds.length) {
        return null;
      }
      const compoundAst = {
        version: 1,
        kind: "compound",
        matrix: {
          role: "matrix",
          stem: targetObject.normalizeRuleBase(matrixStem || sourceBase || ""),
          ruleBase: targetObject.normalizeRuleBase(matrixRuleBase || sourceBase || matrixStem || "")
        },
        embeds,
        source: {
          rawInput: String(sourceRawVerb || ""),
          displayVerb: String(displayVerb || ""),
          displayCore: String(displayCore || ""),
          verb: String(verb || ""),
          analysisVerb: String(analysisVerb || ""),
          embeddedPrefix: String(embeddedPrefix || ""),
          sourcePrefix: String(sourcePrefix || ""),
          sourceBase: String(sourceBase || ""),
          verbSegment: String(verbSegment || ""),
          parts: Array.isArray(parts) ? parts.filter(Boolean) : []
        },
        valency: {
          transitivity: String(transitivity || ""),
          tokens: (Array.isArray(outerValenceTokens) ? outerValenceTokens : []).filter(Boolean),
          slotCount: Number.isFinite(valenceSlotCount) ? valenceSlotCount : 0,
          hasSpecific: hasSpecificValence === true,
          hasNonspecific: hasNonspecificValence === true,
          isMarkedTransitive: isMarkedTransitive === true,
          isTaFusion: isTaFusion === true
        },
        flags: {
          hasCompoundMarker: hasCompoundMarker === true,
          hasSlashMarker: hasSlashMarker === true,
          hasSuffixSeparator: hasSuffixSeparator === true,
          hasBoundMarker: hasBoundMarker === true,
          hasImpersonalTaPrefix: hasImpersonalTaPrefix === true
        },
        outerPieces: normalizedOuterPieces,
        corePieces: normalizedCorePieces,
        lexicalPrefixes: (Array.isArray(outerLexicalPrefixes) ? outerLexicalPrefixes : []).map(value => targetObject.normalizeRuleBase(value)).filter(Boolean)
      };
      const compoundRouteFrame = buildCompoundAstRouteFrame(compoundAst);
      compoundAst.sourceRouteFrame = compoundRouteFrame;
      compoundAst.routeFrame = compoundRouteFrame;
      compoundAst.objectSlotOwnership = compoundRouteFrame?.objectSlotOwnership || null;
      return attachLesson28CompoundGrammarContract(compoundAst, {
        metadataKind: "compound-ast",
        routeStage: "parse-compound-ast",
        supported: true,
        sourceInput: compoundAst.source.rawInput,
        sourceContract: {
          unitKind: "compound-verbstem-boundary",
          metadataKind: "compound-ast",
          sourceInput: compoundAst.source.rawInput,
          sourceSurface: compoundAst.source.displayVerb,
          parserKind: "current-regex",
          sourceRouteFrame: compoundRouteFrame,
          objectSlotOwnership: compoundRouteFrame?.objectSlotOwnership || null
        },
        targetContract: {
          metadataKind: "compound-ast",
          generationAllowed: false,
          matrixStem: compoundAst.matrix.stem,
          embedRoles: compoundAst.embeds.map(entry => entry.role),
          routeFrame: compoundRouteFrame,
          sourceRouteFrame: compoundRouteFrame,
          lesson28Coverage: "parser-metadata-only"
        },
        stemFrame: {
          stemKind: "compound-verbstem",
          matrixStem: compoundAst.matrix.stem,
          embeddedPieces: compoundAst.embeds,
          matrixPosition: "after embed",
          embedBeforeMatrixInviolable: true,
          sourceRouteFrame: compoundRouteFrame
        },
        participantFrame: {
          valenceFrame: {
            matrixValence: compoundRouteFrame?.matrixValence || "",
            frameFixed: false,
            valenceFrameFixed: false,
            sourceLayer: "parser-compound-ast"
          },
          sourceRouteFrame: compoundRouteFrame,
          routeFrame: compoundRouteFrame,
          objectSlotOwnership: compoundRouteFrame?.objectSlotOwnership || null,
          functionUseDoesNotLicenseObjectSlots: true
        },
        diagnostics: ["compound-ast-parser-metadata-only"]
      });
    }
    function resolveOrdinaryNncParseFixture(value = "") {
      if (typeof targetObject.resolveOrdinaryNncFixture !== "function") {
        return null;
      }
      return targetObject.resolveOrdinaryNncFixture({
        stem: value
      });
    }
    function buildOrdinaryNncParseClassification(role = "", value = "") {
      const normalizedValue = targetObject.normalizeRuleBase(value);
      if (!normalizedValue) {
        return null;
      }
      const candidate = resolveOrdinaryNncParseFixture(normalizedValue);
      if (!candidate || !candidate.fixture) {
        return null;
      }
      return {
        kind: "ordinary-nnc-fixture-classification",
        outputKind: candidate.outputKind || candidate.clauseKind || "nominal-nuclear-clause",
        clauseKind: candidate.clauseKind || "nominal-nuclear-clause",
        role,
        value: normalizedValue,
        normalizedInput: candidate.normalizedInput || normalizedValue,
        fixture: {
          id: candidate.fixture.id || "",
          stem: candidate.fixture.stem || "",
          lemma: candidate.fixture.lemma || "",
          nounClass: candidate.fixture.nounClass || "",
          animacy: candidate.fixture.animacy || "",
          aliases: Array.isArray(candidate.fixture.aliases) ? [...candidate.fixture.aliases] : [],
          sourceRefs: Array.isArray(candidate.fixture.sourceRefs) ? [...candidate.fixture.sourceRefs] : []
        }
      };
    }
    function buildOrdinaryNncFixtureClassifications({
      matrixStem = "",
      lexicalBoundPrefixes = [],
      compoundAst = null
    } = {}) {
      const candidates = [];
      const seen = new Set();
      const addCandidate = (role = "", value = "") => {
        const normalizedValue = targetObject.normalizeRuleBase(value);
        const key = `${role}|${normalizedValue}`;
        if (!role || !normalizedValue || seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          role,
          value: normalizedValue
        });
      };
      addCandidate("matrix", matrixStem);
      (Array.isArray(lexicalBoundPrefixes) ? lexicalBoundPrefixes : []).forEach(value => addCandidate("outer-lexical", value));
      (Array.isArray(compoundAst?.embeds) ? compoundAst.embeds : []).filter(entry => entry?.kind === "lexical" && entry?.role).forEach(entry => addCandidate(entry.role, entry.value));
      return candidates.map(candidate => buildOrdinaryNncParseClassification(candidate.role, candidate.value)).filter(Boolean);
    }

    // Universal downstream builder: derives the full verbMeta from a CanonicalVerbSpec.
    // rawValue and rawParsed are optional and used only for display/provenance fields.
    function buildVerbMetaFromCanonicalSpec(spec, rawValue, rawParsed, tiInputMetadata) {
      if (!spec) return null;
      const {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed: coreEmbeddedPrefix,
        transitivity,
        valenceTokens: outerValenceTokens,
        valenceEmbeds: outerLexicalPrefixes,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya
      } = spec;
      const optionalSupportiveLetter = supportiveMarker;
      const hasOptionalSupportiveI = Boolean(optionalSupportiveLetter);
      const lexicalSourcePrefix = outerLexicalPrefixes.join("");
      const isIntransitiveOuterValenceCompound = transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive && outerValenceTokens.length > 0 && !outerLexicalPrefixes.length && !coreEmbeddedPrefix;
      const isOuterLexicalBoundValence = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && !coreEmbeddedPrefix;
      const isOuterLexicalBoundValenceWithAdjacentEmbed = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && Boolean(coreEmbeddedPrefix);
      const embeddedPrefix = isIntransitiveOuterValenceCompound ? outerValenceTokens.join("") : isOuterLexicalBoundValenceWithAdjacentEmbed ? coreEmbeddedPrefix : `${lexicalSourcePrefix}${coreEmbeddedPrefix}`;
      const analysisCore = isIntransitiveOuterValenceCompound ? matrixStem : isOuterLexicalBoundValence ? matrixStem : isOuterLexicalBoundValenceWithAdjacentEmbed ? `${embeddedPrefix}${matrixStem}` : `${outerValenceTokens.join("")}${embeddedPrefix}${matrixStem}`;
      const verbCore = isIntransitiveOuterValenceCompound ? `${embeddedPrefix}${matrixStem}` : transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive && outerLexicalPrefixes.length > 0 && outerValenceTokens.length > 0 && (!coreEmbeddedPrefix || isOuterLexicalBoundValenceWithAdjacentEmbed) ? `${lexicalSourcePrefix}${outerValenceTokens.join("")}${coreEmbeddedPrefix}${matrixStem}` : `${analysisCore}`;
      const verb = `${directionalPrefix}${verbCore}`;
      const analysisVerb = analysisCore || verb;
      const rawAnalysisVerb = analysisVerb;
      const exactBaseVerb = targetObject.normalizeRuleBase(matrixRuleBase || matrixStem);
      const hasLeadingDash = transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive;
      const dashCount = hasLeadingDash ? 1 : 0;
      const hasDoubleDash = false;
      const baseObjectSlots = transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive ? 1 : 0;
      const isMarkedTransitive = baseObjectSlots > 0;
      const isSpecificToken = (token = "") => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
      const isNonspecificToken = (token = "") => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const hasSpecificValence = outerValenceTokens.some(token => isSpecificToken(token));
      const hasNonspecificValence = outerValenceTokens.some(token => isNonspecificToken(token));
      const trailingValenceTokens = outerValenceTokens.slice(1);
      const hasNonactiveSpecificValence = trailingValenceTokens.some(token => isSpecificToken(token));
      const hasNonactiveNonspecificValence = trailingValenceTokens.some(token => isNonspecificToken(token));
      const hasConsecutiveSpecificValences = outerValenceTokens.length >= 2 && outerValenceTokens.every(token => isSpecificToken(token));
      const directionalRuleMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: 0,
        isNonactive: false,
        phase: "resolved"
      });
      const directObjectToken = "";
      const indirectObjectMarker = "";
      const structuralOuterPieces = [...(directionalPrefix ? [{
        type: "directional",
        value: directionalPrefix
      }] : []), ...outerLexicalPrefixes.map(value => ({
        type: "lexical",
        value
      })), ...outerValenceTokens.map(value => ({
        type: "valence",
        value
      }))];
      const coreStructuralPrefixParts = [];
      if (optionalSupportiveLetter) {
        coreStructuralPrefixParts.push({
          type: "supportive",
          value: optionalSupportiveLetter
        });
      }
      if (coreEmbeddedPrefix) {
        coreStructuralPrefixParts.push({
          type: "adjacent-embed",
          value: coreEmbeddedPrefix
        });
      }
      const parts = embeddedPrefix ? [embeddedPrefix, matrixStem].filter(Boolean) : [matrixStem].filter(Boolean);
      const verbSegment = embeddedPrefix ? `${embeddedPrefix}-${matrixStem}` : matrixStem;
      const objectSegment = "";
      const hasCompoundMarker = Boolean(embeddedPrefix) || isIntransitiveOuterValenceCompound;
      const hasSuffixSeparator = Boolean(coreEmbeddedPrefix);
      const hasSlashMarker = Boolean(coreEmbeddedPrefix);
      const hasBoundMarker = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed;
      const boundPrefixes = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes, ...outerValenceTokens] : [];
      const boundExplicitFlags = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes.map(() => false), ...outerValenceTokens.map(() => true)] : [];
      const fusionPrefixes = isIntransitiveOuterValenceCompound ? [] : isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed ? [...outerLexicalPrefixes, ...outerValenceTokens] : outerValenceTokens.slice();
      const isTaFusion = fusionPrefixes.length > 0 && Boolean(analysisVerb);
      const finalYaAnalysis = targetObject.analyzeFinalYaStructure(exactBaseVerb, {
        isTransitive: isMarkedTransitive,
        isYawi: false,
        isWeya: false
      });
      const yawiImperfective = targetObject.getSuppletiveYawiImperfective();
      const normalizedAnalysisVerb = isYawi ? yawiImperfective : analysisVerb;
      const normalizedVerb = isYawi ? `${directionalPrefix}${outerValenceTokens.join("")}${embeddedPrefix}${yawiImperfective}` : verb;
      const sourceRawVerb = String(rawValue || "");
      const displayVerb = tiInputMetadata?.displayVerb || (rawParsed ? rawParsed.regexValue : "") || "";
      const displayCore = tiInputMetadata?.displayCore || (rawParsed ? rawParsed.coreText : "") || "";
      const compoundAst = buildCompoundAstMetadata({
        sourceRawVerb,
        displayVerb,
        displayCore,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        matrixStem,
        matrixRuleBase: exactBaseVerb,
        transitivity,
        outerValenceTokens,
        outerLexicalPrefixes,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        verbSegment,
        parts,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasBoundMarker,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasSpecificValence,
        hasNonspecificValence,
        isMarkedTransitive,
        isTaFusion,
        valenceSlotCount: baseObjectSlots
      });
      const ordinaryNncFixtureClassifications = buildOrdinaryNncFixtureClassifications({
        matrixStem: exactBaseVerb,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        compoundAst
      });
      const entradaGrammarObject = buildEntradaGrammarObjectFromCanonicalVerbSpec(spec, {
        rawInput: sourceRawVerb
      });
      const canonical = {
        parseLanguage: "current-regex",
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        ruleBase: exactBaseVerb,
        fullRuleBase: exactBaseVerb,
        hasSlashMarker,
        hasLeadingDash,
        dashCount,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        directObjectToken,
        indirectObjectMarker,
        parts,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        lexicalBoundPrefix: lexicalSourcePrefix,
        fusionPrefixes,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasSuffixSeparator,
        hasCompoundMarker,
        hasBoundMarker,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount: 0,
        totalValenceSlotCount: baseObjectSlots,
        hasFinalYaSuffix: finalYaAnalysis.hasFinalYaSuffix === true,
        finalYaHost: finalYaAnalysis.finalYaHost || "",
        finalYaHostKind: finalYaAnalysis.finalYaHostKind || "",
        bareRootPlusYaBase: finalYaAnalysis.bareRootPlusYaBase || "",
        bareRootPlusYaBasePronounceable: finalYaAnalysis.bareRootPlusYaBasePronounceable || "",
        rootPlusYaBase: finalYaAnalysis.isRootPlusYa ? finalYaAnalysis.bareRootPlusYaBase || "" : "",
        rootPlusYaBasePronounceable: finalYaAnalysis.isRootPlusYa ? finalYaAnalysis.bareRootPlusYaBasePronounceable || "" : "",
        isRootPlusYa: finalYaAnalysis.isRootPlusYa === true,
        isMarkedTransitive,
        isTaFusion,
        isYawi,
        isWeya,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        slashCompositeRuleBase: "",
        compoundAst,
        ordinaryNncFixtureClassifications,
        entradaGrammarObject
      };
      const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0)) : baseObjectSlots;
      return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasBoundMarker,
        isMarkedTransitive,
        isTaFusion,
        isYawi,
        isWeya,
        hasFinalYaSuffix: canonical.hasFinalYaSuffix,
        finalYaHost: canonical.finalYaHost,
        finalYaHostKind: canonical.finalYaHostKind,
        bareRootPlusYaBase: canonical.bareRootPlusYaBase,
        bareRootPlusYaBasePronounceable: canonical.bareRootPlusYaBasePronounceable,
        rootPlusYaBase: canonical.rootPlusYaBase,
        rootPlusYaBasePronounceable: canonical.rootPlusYaBasePronounceable,
        isRootPlusYa: canonical.isRootPlusYa,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        directObjectToken,
        indirectObjectMarker,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix: tiInputMetadata?.dashPrefix || (hasLeadingDash ? "-" : ""),
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb,
        hasLeadingDash,
        dashCount,
        hasDoubleDash,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount: 0,
        totalValenceSlotCount: baseObjectSlots,
        parts,
        embeddedPrefix,
        fusionPrefixes,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        canonical,
        compoundAst,
        ordinaryNncFixtureClassifications,
        entradaGrammarObject,
        canonicalRuleBase: canonical.ruleBase,
        canonicalFullRuleBase: canonical.fullRuleBase,
        tiCausativeClass
      };
    }
    function buildParsedVerbFromMovingTargetInput(rawValue = "", movingTargetParsed = null, tiInputMetadata = null) {
      const spec = buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata);
      if (!spec) return null;
      return buildVerbMetaFromCanonicalSpec(spec, rawValue, movingTargetParsed, tiInputMetadata);
    }
    function isVerbValueAllowed(rawValue) {
      return getInvalidVerbCharacters(rawValue).length === 0 && getInvalidVerbLetters(rawValue).length === 0 && !getInvalidVerbStructure(rawValue, {
        allowPartial: true
      });
    }
    function getInputGateRightmostStem(rawValue, parsedVerb = null) {
      if (parsedVerb && typeof parsedVerb.exactBaseVerb === "string" && parsedVerb.exactBaseVerb) {
        return parsedVerb.exactBaseVerb;
      }
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
      const cleanedSupportive = targetObject.hasOptionalSupportiveMarker(cleaned) ? targetObject.replaceOptionalSupportiveMarkersWithLetters(cleaned) : cleaned;
      return getExactBaseVerbFromCleaned(cleanedSupportive);
    }
    function startsWithConsonantCluster(stem) {
      const letters = targetObject.splitVerbLetters(stem);
      return letters.length >= 2 && targetObject.isVerbLetterConsonant(letters[0]) && targetObject.isVerbLetterConsonant(letters[1]);
    }
    function evaluateVerbStemInputGate(rawValue, parsedVerb = null) {
      const stem = getInputGateRightmostStem(rawValue, parsedVerb);
      if (!stem) {
        return {
          stem: "",
          gateStem: "",
          basePronounceable: false,
          supportiveCandidate: "",
          supportivePronounceable: false,
          isValid: false
        };
      }
      // Keep reduplicated inputs aligned with their base stem gate behavior.
      const gateStem = targetObject.getNonReduplicatedRoot(stem) || stem;
      const basePronounceable = targetObject.isSyllableSequencePronounceable(gateStem);
      const letters = targetObject.splitVerbLetters(gateStem);
      const startsWithConsonant = letters.length > 0 && targetObject.isVerbLetterConsonant(letters[0]);
      const startsWithVowel = letters.length > 0 && targetObject.isVerbLetterVowel(letters[0]);
      const hasOptionalSupportiveMarkerFlag = targetObject.hasOptionalSupportiveMarker(rawValue) || Boolean(parsedVerb?.hasOptionalSupportiveI);
      const hasInitialCluster = startsWithConsonantCluster(gateStem);
      const requiresExplicitSupportiveI = hasInitialCluster && !hasOptionalSupportiveMarkerFlag;
      const supportiveCandidate = startsWithConsonant && !startsWithVowel ? `i${gateStem}` : "";
      const supportivePronounceable = supportiveCandidate ? targetObject.isSyllableSequencePronounceable(supportiveCandidate) : false;
      const canUseBaseAsTyped = basePronounceable && !requiresExplicitSupportiveI;
      const canUseSupportiveFallback = supportivePronounceable && !requiresExplicitSupportiveI;
      return {
        stem,
        gateStem,
        basePronounceable: canUseBaseAsTyped,
        supportiveCandidate,
        supportivePronounceable: canUseSupportiveFallback,
        isValid: canUseBaseAsTyped || canUseSupportiveFallback
      };
    }
    function getAuthoritativeDerivationalSourceForRawInputGate({
      tense = "",
      patientivoSource = ""
    } = {}) {
      if (tense === "patientivo" && targetObject.isStrictPatientivoDerivationSource(patientivoSource)) {
        return patientivoSource;
      }
      if (!targetObject.isPatientivoAdjectiveTense(tense)) {
        return "";
      }
      const adjectiveSource = targetObject.getPatientivoAdjectiveSourceForTense(tense);
      return targetObject.isStrictPatientivoDerivationSource(adjectiveSource) ? adjectiveSource : "";
    }

    // === Verb Parsing ===
    const DEFAULT_NONSPECIFIC_VALENCE_AFFIXES = Object.freeze(["ta", "te", "mu", "tajta", "tejte", "t", "mujmu", "m"]);
    const DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET = new Set(DEFAULT_NONSPECIFIC_VALENCE_AFFIXES);
    const EXPLICIT_VALENCE_SHORTHAND_MAP = Object.freeze({
      m: "m",
      mu: "mu"
    });
    function getNonspecificValenceAffixSetForMatching() {
      return targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.size ? targetObject.NONSPECIFIC_VALENCE_AFFIX_SET : DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET;
    }
    function normalizeExplicitValenceToken(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
      if (!normalized) {
        return "";
      }
      const mapped = EXPLICIT_VALENCE_SHORTHAND_MAP[normalized] || normalized;
      return isNonspecificValenceAffixToken(mapped, {
        explicit: true
      }) ? mapped : "";
    }
    function isNonspecificValenceAffixToken(value = "", options = {}) {
      const token = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
      if (!token) {
        return false;
      }
      if (getNonspecificValenceAffixSetForMatching().has(token)) {
        return true;
      }
      // "(m)" remains an explicit shorthand for nonspecific "mu".
      if (options.explicit === true && token === "m") {
        return true;
      }
      return false;
    }
    function getExplicitValenceTokenFromSegment(segment = "") {
      const normalized = String(segment || "").trim().toLowerCase();
      const match = normalized.match(/^\(([^)]+)\)(?=[/-]|$)/);
      if (!match) {
        return "";
      }
      return normalizeExplicitValenceToken(match[1] || "");
    }
    function splitCompoundPartsWithExplicitFlags(segment = "") {
      const rawParts = String(segment || "").split(/[|~#\\/?-]/).map(part => String(part || "").trim()).filter(Boolean);
      const parts = [];
      const explicitFlags = [];
      rawParts.forEach(rawPart => {
        const explicitToken = getExplicitValenceTokenFromSegment(rawPart);
        const normalizedPart = explicitToken || rawPart.replace(/[()]/g, "");
        if (!normalizedPart) {
          return;
        }
        parts.push(normalizedPart);
        explicitFlags.push(Boolean(explicitToken));
      });
      return {
        parts,
        explicitFlags
      };
    }
    function isFusionPrefixTokenForParsing(token = "", explicitFlag = false) {
      if (targetObject.FUSION_PREFIXES.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
      }
      return explicitFlag === true && token === "m";
    }
    function isObjectMarkerTokenForParsing(token = "", explicitFlag = false) {
      if (targetObject.OBJECT_MARKERS.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
      }
      return explicitFlag === true && token === "m";
    }
    function getValenceSlotsFromCleaned(cleaned) {
      const slots = [];
      let token = "";
      for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "-") {
          slots.push(token);
          token = "";
          continue;
        }
        token += char;
      }
      return slots;
    }
    function getExactBaseVerbFromCleaned(cleaned) {
      if (!cleaned) {
        return "";
      }
      const segments = cleaned.split(/[-/]/).filter(Boolean);
      if (!segments.length) {
        return "";
      }
      const lastSegment = segments[segments.length - 1];
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      return lastSegment.replace(markerRe, "");
    }
    function stripLeadingSupportiveLetterFromCoreSurface(coreSurface = "", supportiveMarker = "") {
      const normalizedCoreSurface = String(coreSurface || "").trim().toLowerCase();
      const normalizedSupportiveMarker = targetObject.normalizeSupportiveMarkerValue(supportiveMarker);
      if (!normalizedCoreSurface || !normalizedSupportiveMarker) {
        return normalizedCoreSurface;
      }
      if (!normalizedCoreSurface.startsWith(normalizedSupportiveMarker)) {
        return normalizedCoreSurface;
      }
      return normalizedCoreSurface.slice(normalizedSupportiveMarker.length);
    }
    const SLASH_MATRIX_FUSED_RULEBASES = new Set(["ti"]);
    const SLASH_MATRIX_FUSED_SUFFIXES = Object.freeze(["awi", "iwi", "uwi", "ewi", "awa", "iwa", "uwa", "ewa", "wi", "wa"]);
    function shouldFuseSlashMatrixRuleBase(matrixBase = "") {
      if (!matrixBase) {
        return false;
      }
      if (SLASH_MATRIX_FUSED_RULEBASES.has(matrixBase)) {
        return true;
      }
      return SLASH_MATRIX_FUSED_SUFFIXES.some(suffix => matrixBase.endsWith(suffix));
    }
    function getLexicalBoundPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
      const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
      return (Array.isArray(boundPrefixes) ? boundPrefixes : []).map(prefix => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || "")).map(prefix => targetObject.normalizeRuleBase(prefix)).filter((prefix, index) => {
        if (!prefix) {
          return false;
        }
        if (isDirectionalPrefixToken(prefix)) {
          return false;
        }
        if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
          return false;
        }
        const explicitFlag = explicitFlags[index] === true;
        if (explicitFlag && isNonspecificValenceAffixToken(prefix, {
          explicit: true
        })) {
          return false;
        }
        return true;
      });
    }
    function getExplicitBoundNonspecificPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
      const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
      return (Array.isArray(boundPrefixes) ? boundPrefixes : []).map(prefix => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || "")).map(prefix => targetObject.normalizeRuleBase(prefix)).filter((prefix, index) => {
        if (!prefix) {
          return false;
        }
        if (isDirectionalPrefixToken(prefix)) {
          return false;
        }
        return explicitFlags[index] === true && isNonspecificValenceAffixToken(prefix, {
          explicit: true
        });
      });
    }
    function getSlashMatrixCompositeRuleBase({
      hasSlashMarker = false,
      hasBoundMarker = false,
      hasImpersonalTaPrefix = false,
      boundPrefixes = [],
      boundExplicitFlags = [],
      analysisVerb = "",
      sourceVerb = ""
    } = {}) {
      if (!hasSlashMarker || !hasBoundMarker || hasImpersonalTaPrefix) {
        return "";
      }
      const matrixBase = targetObject.normalizeRuleBase(analysisVerb || sourceVerb || "");
      if (!shouldFuseSlashMatrixRuleBase(matrixBase)) {
        return "";
      }
      const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
      if (!lexicalBoundPrefixes.length) {
        return "";
      }
      return `${lexicalBoundPrefixes.join("")}${matrixBase}`;
    }
    function resolveCanonicalSourceSplit(verbMeta = {}, {
      verb = "",
      analysisVerb = ""
    } = {}) {
      const meta = verbMeta || {};
      const sourceVerb = String(verb || meta.verb || "");
      const sourceAnalysis = String(analysisVerb || meta.analysisVerb || sourceVerb);
      const parseLanguage = String(meta.parseLanguage || meta.inputLanguage || meta.canonical?.parseLanguage || meta.canonical?.inputLanguage || "");
      if (parseLanguage === "current-regex") {
        const lexicalBoundPrefixes = Array.isArray(meta.lexicalBoundPrefixes) ? meta.lexicalBoundPrefixes.filter(Boolean) : Array.isArray(meta.canonical?.lexicalBoundPrefixes) ? meta.canonical.lexicalBoundPrefixes.filter(Boolean) : [];
        const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
        const sourcePrefix = String(meta.sourcePrefix || meta.canonical?.sourcePrefix || lexicalBoundPrefix || "");
        const sourceBase = targetObject.normalizeRuleBase(meta.sourceBase || meta.canonical?.sourceBase || meta.exactBaseVerb || meta.canonicalRuleBase || meta.canonical?.ruleBase || sourceAnalysis || sourceVerb || "");
        return {
          sourceVerb,
          sourceAnalysis,
          hasSlashMarker: false,
          hasBoundMarker: meta.hasBoundMarker === true || Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0,
          hasImpersonalTaPrefix: meta.hasImpersonalTaPrefix === true,
          directionalPrefix: String(meta.directionalPrefix || meta.canonical?.directionalPrefix || ""),
          directionalPrefixFromSlash: "",
          boundPrefixes: Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [],
          boundExplicitFlags: Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [],
          lexicalBoundPrefixes,
          lexicalBoundPrefix,
          sourcePrefix,
          matrixBase: sourceBase,
          slashCompositeBase: "",
          sourceBase
        };
      }
      const hasSlashMarker = meta.hasSlashMarker === true;
      const hasBoundMarker = meta.hasBoundMarker === true || Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0;
      const hasImpersonalTaPrefix = meta.hasImpersonalTaPrefix === true;
      const boundPrefixes = Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [];
      const boundExplicitFlags = Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [];
      const directionalPrefix = String(meta.directionalPrefix || "");
      const directionalPrefixFromSlash = String(meta.directionalPrefixFromSlash || meta.canonical && meta.canonical.directionalPrefixFromSlash || "");
      const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
      const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
      const fusionPrefixes = Array.isArray(meta.fusionPrefixes) ? meta.fusionPrefixes : [];
      const grammaticalPrefixes = fusionPrefixes.filter(Boolean);
      if (meta.indirectObjectMarker && !grammaticalPrefixes.includes(meta.indirectObjectMarker)) {
        grammaticalPrefixes.push(meta.indirectObjectMarker);
      }
      if (meta.directObjectToken && !grammaticalPrefixes.includes(meta.directObjectToken)) {
        grammaticalPrefixes.push(meta.directObjectToken);
      }
      const includeDirectionalFromSlash = Boolean(directionalPrefix && directionalPrefixFromSlash && directionalPrefixFromSlash === directionalPrefix);
      const sourcePrefixParts = includeDirectionalFromSlash ? [directionalPrefix, ...lexicalBoundPrefixes] : lexicalBoundPrefixes;
      const sourcePrefix = sourcePrefixParts.join("");
      const matrixBase = targetObject.normalizeRuleBase(sourceAnalysis || sourceVerb || "");
      const slashCompositeBase = getSlashMatrixCompositeRuleBase({
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        boundPrefixes,
        boundExplicitFlags,
        analysisVerb: sourceAnalysis || sourceVerb || "",
        sourceVerb: sourceVerb || sourceAnalysis || ""
      });
      return {
        sourceVerb,
        sourceAnalysis,
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        directionalPrefix,
        directionalPrefixFromSlash,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes,
        lexicalBoundPrefix,
        sourcePrefix,
        matrixBase,
        slashCompositeBase,
        sourceBase: slashCompositeBase || targetObject.stripLeadingPrefixes(matrixBase, grammaticalPrefixes)
      };
    }
    function getEmbeddedVerbPrefixFromParts(parts = []) {
      const list = Array.isArray(parts) ? parts : [];
      if (list.length <= 1) {
        return "";
      }
      const prefixParts = list.slice(0, -1).filter(part => part && !isDirectionalPrefixToken(part));
      return prefixParts.length ? prefixParts.join("") : "";
    }
    function getValenceCategoryFromToken(token) {
      if (!token) {
        return "specific";
      }
      const explicitValenceToken = getExplicitValenceTokenFromSegment(token);
      if (explicitValenceToken && isNonspecificValenceAffixToken(explicitValenceToken, {
        explicit: true
      })) {
        return "nonspecific";
      }
      const parts = token.split(targetObject.COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
      const suffix = parts.length ? parts[parts.length - 1] : "";
      if (!suffix) {
        return "specific";
      }
      if (isNonspecificValenceAffixToken(suffix)) {
        return "embedded";
      }
      if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(suffix) || suffix === "k") {
        return "specific";
      }
      return "embedded";
    }
    function hasConsecutiveSpecificValences(valenceSlots) {
      let prevCategory = "";
      for (let i = 0; i < valenceSlots.length; i += 1) {
        const category = getValenceCategoryFromToken(valenceSlots[i]);
        if (category === "embedded") {
          continue;
        }
        if (prevCategory === "specific" && category === "specific") {
          return true;
        }
        prevCategory = category;
      }
      return false;
    }
    function computeDirectionalRuleModeCore({
      directionalPrefix = "",
      hasSpecificValence = false,
      hasNonspecificValence = false,
      derivationValencyDelta = 0,
      isNonactive = false,
      phase = "resolved"
    }) {
      if (!directionalPrefix || !isDirectionalPrefixToken(directionalPrefix)) {
        return "";
      }
      if (hasSpecificValence) {
        return "transitive";
      }
      if (phase === "resolved" && !isNonactive && derivationValencyDelta > 0) {
        return "transitive";
      }
      if (hasNonspecificValence) {
        return "nonspecific";
      }
      return "intransitive";
    }
    function resolveDirectionalRuleMode(parsedVerb, options = {}) {
      if (!parsedVerb) {
        return "";
      }
      const directionalPrefix = parsedVerb.directionalPrefix || "";
      const isNonactive = options.isNonactive === true;
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : parsedVerb.derivationType || "";
      const derivationDelta = Number.isFinite(parsedVerb.derivationValencyDelta) ? parsedVerb.derivationValencyDelta : targetObject.getDerivationValencyDelta(derivationType);
      const hasSpecificValence = isNonactive ? parsedVerb.hasNonactiveSpecificValence : parsedVerb.hasSpecificValence;
      const hasNonspecificValence = isNonactive ? parsedVerb.hasNonactiveNonspecificValence : parsedVerb.hasNonspecificValence;
      const resolvedMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: derivationDelta,
        isNonactive,
        phase: "resolved"
      });
      parsedVerb.directionalRuleModeResolved = resolvedMode;
      parsedVerb.directionalRuleMode = resolvedMode;
      return resolvedMode;
    }
    function getDirectionalRulesForPrefix(prefix, stage) {
      if (!prefix) {
        return [];
      }
      const rules = targetObject.DIRECTIONAL_RULES.length ? targetObject.DIRECTIONAL_RULES : targetObject.DEFAULT_DIRECTIONAL_RULES;
      return rules.filter(rule => {
        if (!rule || rule.enabled === false) {
          return false;
        }
        if (!Array.isArray(rule.prefixes) || !rule.prefixes.includes(prefix)) {
          return false;
        }
        if (!stage) {
          return true;
        }
        return Array.isArray(rule.stages) && rule.stages.includes(stage);
      });
    }
    function applyDirectionalRules(context, stage) {
      let next = {
        ...context
      };
      const rules = getDirectionalRulesForPrefix(next.directionalInputPrefix, stage);
      rules.forEach(rule => {
        if (next.isNounTense && rule.applyToNouns === false) {
          return;
        }
        if (!next.isNounTense && rule.applyToVerbs === false) {
          return;
        }
        const handler = DIRECTIONAL_RULE_HANDLERS.get(rule.handler);
        if (handler) {
          const updated = handler(next, rule, stage);
          if (updated) {
            next = updated;
          }
        }
      });
      return next;
    }
    function applyWalDirectionalRule(context, rule, stage) {
      let {
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
        directionalInputPrefix,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        tense,
        isYawi,
        thirdObjectMarker,
        isNounTense
      } = context;
      if (stage === "prefix") {
        directionalPlan = targetObject.buildWalDirectionalPlan({
          directionalOutputPrefix,
          pers1Base: baseSubjectPrefix,
          obj1Base: baseObjectPrefix,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker,
          directionalRuleMode,
          hasSubjectValent,
          isTaFusion,
          isIntransitiveVerb
        });
        directionalOutputPrefix = directionalPlan.directionalOutputPrefix;
      }
      if (stage === "post-elision" && !isNounTense && verb.startsWith(directionalInputPrefix)) {
        let stem = verb.slice(directionalInputPrefix.length);
        if (directionalInputPrefix === "wal" && isYawi && stem.startsWith("ya")) {
          stem = stem.slice(1);
        }
        verb = stem;
      }
      return {
        ...context,
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix
      };
    }
    function applyWalNounPlacement(context) {
      if (!context.isNounTense) {
        return context;
      }
      if (context.directionalInputPrefix !== "wal") {
        return context;
      }
      const nounObjectPrefixes = new Set(["ta", "te", "mu"]);
      if (!nounObjectPrefixes.has(context.objectPrefix)) {
        return context;
      }
      const verb = context.verb || "";
      if (!verb.startsWith("wal")) {
        return context;
      }
      const stem = verb.slice(3);
      if (!stem) {
        return context;
      }
      return {
        ...context,
        objectPrefix: `wal${context.objectPrefix}`,
        verb: stem
      };
    }
    const DIRECTIONAL_RULE_HANDLERS = new Map([["wal-alternation", applyWalDirectionalRule], ["wal-noun-placement", applyWalNounPlacement]]);
    function getCurrentRegexShorthandParseInput(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw || raw.includes("?")) {
        return "";
      }
      const protectedSupportives = raw.replace(/\[[iy]\]/gi, "__supportive__");
      if (/[()[\]+]/.test(protectedSupportives)) {
        return "";
      }
      if (protectedSupportives.includes("/")) {
        return "";
      }
      const hasLeadingDash = raw.startsWith("-");
      const bare = hasLeadingDash ? raw.slice(1).trim() : raw;
      if (!bare || bare.startsWith("-")) {
        return "";
      }
      const normalizedBare = normalizeRegexSpecialSerialShorthandCore(bare);
      return hasLeadingDash ? `-(${normalizedBare})` : `(${normalizedBare})`;
    }
    function buildEmptyParsedVerb(rawValue = "", tiInputMetadata = null) {
      const displayVerb = String(tiInputMetadata?.displayVerb || rawValue || "");
      const displayCore = String(tiInputMetadata?.displayCore || "");
      const sourceRawVerb = String(rawValue || "");
      const tiCausativeClass = String(tiInputMetadata?.tiCausativeClass || "");
      const dashPrefix = String(tiInputMetadata?.dashPrefix || "");
      const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0)) : 0;
      const canonical = {
        parseLanguage: "current-regex",
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        ruleBase: "",
        fullRuleBase: "",
        hasSlashMarker: false,
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        directObjectToken: "",
        indirectObjectMarker: "",
        parts: [],
        embeddedPrefix: "",
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        lexicalBoundPrefix: "",
        fusionPrefixes: [],
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasSuffixSeparator: false,
        hasCompoundMarker: false,
        hasBoundMarker: false,
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTaFusion: false,
        isYawi: false,
        isWeya: false,
        sourcePrefix: "",
        sourceBase: "",
        slashCompositeRuleBase: "",
        compoundAst: null,
        ordinaryNncFixtureClassifications: []
      };
      return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasBoundMarker: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTaFusion: false,
        isYawi: false,
        isWeya: false,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix,
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb: "",
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        hasDoubleDash: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        parts: [],
        embeddedPrefix: "",
        fusionPrefixes: [],
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        sourcePrefix: "",
        sourceBase: "",
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        canonical,
        compoundAst: null,
        ordinaryNncFixtureClassifications: [],
        canonicalRuleBase: "",
        canonicalFullRuleBase: "",
        tiCausativeClass
      };
    }
    function parseVerbInput(value) {
      const sourceRawVerb = String(value || "");
      const tiInputMetadata = targetObject.getRawInputTiCausativeMetadata(sourceRawVerb);
      const movingTargetParsed = parseMovingTargetRegexInput(sourceRawVerb);
      if (movingTargetParsed.isValid) {
        const directParsed = buildParsedVerbFromMovingTargetInput(sourceRawVerb, movingTargetParsed, tiInputMetadata);
        if (directParsed) {
          return directParsed;
        }
      }
      const shorthandInput = getCurrentRegexShorthandParseInput(sourceRawVerb);
      if (shorthandInput) {
        const shorthandParsed = parseMovingTargetRegexInput(shorthandInput);
        if (shorthandParsed.isValid) {
          const shorthandMetadata = {
            ...tiInputMetadata,
            normalizedBase: shorthandParsed.regexValue,
            normalizedInput: shorthandParsed.regexValue,
            displayVerb: tiInputMetadata.displayVerb || sourceRawVerb,
            displayCore: tiInputMetadata.displayCore || shorthandParsed.coreText || "",
            dashPrefix: tiInputMetadata.dashPrefix || (shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive ? "" : "-"),
            hasExternalObjectDash: tiInputMetadata.hasExternalObjectDash === true || shorthandParsed.transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive,
            semanticObjectSlotCount: Number.isFinite(tiInputMetadata.semanticObjectSlotCount) ? tiInputMetadata.semanticObjectSlotCount : shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : shorthandParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive ? 1 : 0
          };
          const directParsed = buildParsedVerbFromMovingTargetInput(sourceRawVerb, shorthandParsed, shorthandMetadata);
          if (directParsed) {
            return directParsed;
          }
        }
      }
      return buildEmptyParsedVerb(sourceRawVerb, tiInputMetadata);
    }
    function getParsedSyllableAnalysisTarget(rawVerb, options = {}) {
      const parsed = parseVerbInput(rawVerb);
      const target = options.analysis ? parsed.analysisVerb : parsed.verb;
      return targetObject.applySyllableAnalysisTargetOptions(target, options);
    }

    // === Suppletive Stem Paths ===

    function startsWithKSeries(raw) {
      const letters = targetObject.splitVerbLetters(String(raw || ""));
      const first = letters[0] || "";
      return first === "k" || first === "kw";
    }
    function getDisambiguationPrefixCandidates(core) {
      const candidates = new Set();
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      targetObject.DIRECTIONAL_PREFIXES.forEach(prefix => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
          candidates.add(prefix);
        }
      });
      targetObject.NONSPECIFIC_VALENCE_PREFIXES.forEach(prefix => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
          candidates.add(prefix);
        }
      });
      return Array.from(candidates).sort((a, b) => b.length - a.length);
    }
    function getDisambiguationAffixCandidates(core) {
      const candidates = new Set();
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      targetObject.NONSPECIFIC_VALENCE_AFFIXES.forEach(affix => {
        if (normalized.startsWith(affix) && normalized.length > affix.length) {
          candidates.add(affix);
        }
      });
      return Array.from(candidates).sort((a, b) => b.length - a.length);
    }
    function getDisambiguationSuffixCandidates(core) {
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      const suffixes = ["kwi", "kwa"];
      const candidates = [];
      suffixes.forEach(suffix => {
        if (!normalized.endsWith(suffix)) {
          return;
        }
        const prefix = normalized.slice(0, -suffix.length);
        if (prefix.length < 2) {
          return;
        }
        candidates.push({
          prefix,
          suffix
        });
      });
      return candidates;
    }
    function getDisambiguationKnownSuffixCandidates(core, options = {}) {
      const normalized = String(core || "");
      const baseInfo = targetObject.VerbDisambiguationBaseInfo;
      if (!normalized || !baseInfo.size) {
        return [];
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
          return [];
        }
      }
      const syllables = targetObject.splitVerbSyllables(normalized);
      if (syllables.length < 2) {
        return [];
      }
      const candidates = [];
      const seen = new Set();
      const isValidSuffixStart = index => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
      };
      const addCandidate = (prefix, suffix) => {
        const allowShortPrefix = prefix.length === 1 && targetObject.VOWELS.includes(prefix);
        if (!allowShortPrefix && prefix.length < 2 || suffix.length < 2) {
          return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          prefix,
          suffix
        });
      };
      const wantsTransitive = options.isTransitive === true;
      const wantsIntransitive = options.isTransitive === false;
      for (let i = 1; i <= syllables.length - 1; i += 1) {
        if (!isValidSuffixStart(i)) {
          continue;
        }
        const prefix = syllables.slice(0, i).map(syllable => syllable.text).join("");
        const suffix = syllables.slice(i).map(syllable => syllable.text).join("");
        const info = baseInfo.get(suffix.toLowerCase());
        if (!info) {
          continue;
        }
        if (wantsTransitive && !info.transitive) {
          continue;
        }
        if (wantsIntransitive && !info.intransitive) {
          continue;
        }
        if (info) {
          const displaySuffix = info.displayBase || suffix;
          addCandidate(prefix, displaySuffix);
          break;
        }
      }
      return candidates;
    }
    function getDisambiguationLongSplitCandidates(core) {
      const normalized = String(core || "");
      if (!normalized) {
        return [];
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
          return [];
        }
      }
      const syllables = targetObject.splitVerbSyllables(normalized);
      const letterCount = targetObject.getVerbLetterCount(normalized);
      const isLong = syllables.length >= targetObject.VERB_DISAMBIGUATION_LONG_SYLLABLES || letterCount >= targetObject.VERB_DISAMBIGUATION_LONG_LETTERS;
      if (!isLong || syllables.length < 3) {
        return [];
      }
      const candidates = [];
      const seen = new Set();
      const isValidSuffixStart = index => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
      };
      const addCandidate = (prefix, suffix) => {
        if (prefix.length < 2 || suffix.length < 2) {
          return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        candidates.push({
          prefix,
          suffix
        });
      };
      const positions = [];
      if (syllables.length >= 4) {
        for (let i = 2; i <= syllables.length - 2; i += 1) {
          positions.push(i);
        }
        const midpoint = syllables.length / 2;
        positions.sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint));
        positions.forEach(index => {
          if (!isValidSuffixStart(index)) {
            return;
          }
          const prefix = syllables.slice(0, index).map(syllable => syllable.text).join("");
          const suffix = syllables.slice(index).map(syllable => syllable.text).join("");
          addCandidate(prefix, suffix);
        });
      }
      return candidates;
    }
    function getShapePatternLabels(context) {
      if (typeof targetObject.getPretUniversalShapeLabels === "function") {
        return targetObject.getPretUniversalShapeLabels(context);
      }
      if (!context) {
        return [];
      }
      const descriptorState = context.descriptorState || {};
      const shapeDescriptors = Array.isArray(descriptorState.shapeDescriptors) ? descriptorState.shapeDescriptors : [];
      if (typeof targetObject.formatPretDescriptorLabel === "function") {
        return shapeDescriptors.map(descriptor => targetObject.formatPretDescriptorLabel(descriptor, {
          activeRightEdgeProfile: context.rightEdgeProfile
        })).filter(Boolean);
      }
      return [];
    }
    function getPretClassSignatureFromParsed(parsedVerb) {
      if (!parsedVerb || !parsedVerb.verb) {
        return null;
      }
      const isTransitive = targetObject.getBaseObjectSlots(parsedVerb) > 0;
      const contextOptions = targetObject.buildPretContextOptionsFromMeta(parsedVerb);
      const resolvedBundle = targetObject.resolvePretUniversalContextBundle({
        verb: parsedVerb.verb,
        analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb,
        analysisTarget: parsedVerb.analysisVerb || parsedVerb.verb,
        isTransitive,
        contextOptions,
        includeSummary: true
      });
      const context = resolvedBundle.context;
      const summary = resolvedBundle.summary;
      let classList = "";
      if (summary && typeof summary.resolvedClassList === "string" && summary.resolvedClassList) {
        classList = summary.resolvedClassList;
      } else if (summary && typeof summary.classList === "string") {
        classList = summary.classList;
      } else {
        const candidates = targetObject.getPretUniversalClassCandidates(context);
        classList = candidates.size ? typeof targetObject.formatPretUniversalClassList === "function" ? targetObject.formatPretUniversalClassList(candidates) : Array.from(candidates).sort().join("/") : "";
      }
      const shapeLabels = summary && Array.isArray(summary.shapeLabels) ? summary.shapeLabels.slice() : getShapePatternLabels(context);
      return {
        classList,
        shapeLabels,
        parsedVerb
      };
    }
    function getPretClassSignatureFromValue(rawValue) {
      return getPretClassSignatureFromParsed(parseVerbInput(rawValue));
    }
    function buildVerbDisambiguationCandidates(rawValue) {
      const parsedBase = parseVerbInput(rawValue);
      const display = targetObject.stripOptionalSupportiveI(parsedBase.displayVerb || "");
      if (!display) {
        return {
          suggestions: [],
          patterns: []
        };
      }
      const signatureCache = new Map();
      const getCachedSignature = value => {
        if (!value) {
          return null;
        }
        if (signatureCache.has(value)) {
          return signatureCache.get(value);
        }
        const signature = getPretClassSignatureFromValue(value);
        signatureCache.set(value, signature || null);
        return signature || null;
      };
      const original = getPretClassSignatureFromParsed(parsedBase);
      if (!original) {
        return {
          suggestions: [],
          patterns: []
        };
      }
      signatureCache.set(display, original);
      const isTransitive = targetObject.getBaseObjectSlots(parsedBase) > 0;
      const suggestions = [];
      const seen = new Set();
      const originalClassList = original.classList;
      const patternSet = new Set(original.shapeLabels || []);
      const patterns = Array.from(patternSet);
      const maxDashCount = Math.max(1, Math.min(2, Number.isFinite(parsedBase.dashCount) ? parsedBase.dashCount : 0));
      const considerCandidate = (candidateValue, options = {}) => {
        if (!candidateValue || candidateValue === display || seen.has(candidateValue)) {
          return;
        }
        const candidateDashCount = (candidateValue.match(/-/g) || []).length;
        if (candidateDashCount > maxDashCount) {
          return;
        }
        const candidate = getCachedSignature(candidateValue);
        if (!candidate || !candidate.classList) {
          return;
        }
        const allowSameClass = options.allowSameClass === true;
        if (candidate.classList === originalClassList && !allowSameClass) {
          return;
        }
        seen.add(candidateValue);
        suggestions.push({
          value: candidateValue,
          classList: candidate.classList,
          shapeLabels: candidate.shapeLabels || []
        });
      };
      const supportiveCandidate = (() => {
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        if (!targetObject.isSupportiveIClusterBase(core)) {
          return "";
        }
        const letters = targetObject.splitVerbLetters(core);
        const nextCore = letters.slice(1).join("");
        if (!nextCore) {
          return "";
        }
        const marker = targetObject.getRegexOptionalSupportiveMarkerForLetter(letters[0]);
        const candidateCore = `${marker}${nextCore}`;
        return `${hasLeadingDash ? "-" : ""}${candidateCore}`;
      })();
      if (display.includes("/")) {
        const noSlash = display.replace(/\//g, "");
        considerCandidate(noSlash);
      } else {
        if (supportiveCandidate) {
          considerCandidate(supportiveCandidate, {
            allowSameClass: true
          });
        }
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        const affixes = getDisambiguationAffixCandidates(core);
        affixes.forEach(affix => {
          const remainder = core.slice(affix.length);
          if (!remainder) {
            return;
          }
          if ((affix === "te" || affix === "ta") && remainder.startsWith("n") && startsWithKSeries(remainder.slice(1))) {
            return;
          }
          const candidateValue = `${hasLeadingDash ? "-" : ""}${affix}-${remainder}`;
          considerCandidate(candidateValue, {
            allowSameClass: true
          });
        });
        const prefixes = getDisambiguationPrefixCandidates(core);
        prefixes.forEach(prefix => {
          const remainder = core.slice(prefix.length);
          if (!remainder) {
            return;
          }
          if ((prefix === "te" || prefix === "ta") && remainder.startsWith("n") && startsWithKSeries(remainder.slice(1))) {
            return;
          }
          const candidateValue = `${hasLeadingDash ? "-" : ""}${prefix}/${remainder}`;
          considerCandidate(candidateValue);
        });
        const suffixCandidates = getDisambiguationSuffixCandidates(core);
        suffixCandidates.forEach(candidate => {
          const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
          considerCandidate(candidateValue, {
            allowSameClass: true
          });
        });
        const knownSuffixCandidates = getDisambiguationKnownSuffixCandidates(core, {
          isTransitive
        });
        knownSuffixCandidates.forEach(candidate => {
          const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
          considerCandidate(candidateValue, {
            allowSameClass: true
          });
        });
        if (!knownSuffixCandidates.length) {
          const longSplitCandidates = getDisambiguationLongSplitCandidates(core);
          longSplitCandidates.forEach(candidate => {
            const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
            considerCandidate(candidateValue, {
              allowSameClass: true
            });
          });
        }
      }
      return {
        suggestions: suggestions.slice(0, targetObject.VERB_DISAMBIGUATION_LIMIT),
        patterns
      };
    }

    // === CSV Export ===
    // === Input Validation ===
    function isRecognizedCurrentRegexValue(rawValue, {
      allowPartial = false
    } = {}) {
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return false;
      }
      if (parseMovingTargetRegexInput(trimmed).isValid) {
        return true;
      }
      const shorthandInput = getCurrentRegexShorthandParseInput(trimmed);
      if (shorthandInput && parseMovingTargetRegexInput(shorthandInput).isValid) {
        return true;
      }
      if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return true;
      }
      return false;
    }
    function getInvalidVerbCharacters(rawValue) {
      if (isRecognizedCurrentRegexValue(rawValue, {
        allowPartial: true
      })) {
        return [];
      }
      const raw = targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "");
      const invalid = new Set();
      for (const char of raw) {
        if (/[a-z0-9|~#()\[\]{}\/\s-]/i.test(char)) {
          continue;
        }
        invalid.add(char);
      }
      return Array.from(invalid);
    }
    function getInvalidVerbLetters(rawValue) {
      if (isRecognizedCurrentRegexValue(rawValue, {
        allowPartial: true
      })) {
        return [];
      }
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_MARKER_RE, "").replace(/\s+/g, "");
      const letters = targetObject.splitVerbLetters(cleaned);
      const invalid = new Set();
      letters.forEach(letter => {
        if (!letter) {
          return;
        }
        if (/^[0-9]+$/.test(letter)) {
          return;
        }
        if (targetObject.DIGRAPH_SET.has(letter)) {
          return;
        }
        if (targetObject.VALID_VOWEL_SET.has(letter)) {
          return;
        }
        if (targetObject.VALID_CONSONANTS.has(letter)) {
          return;
        }
        invalid.add(letter);
      });
      return Array.from(invalid);
    }
    function getInvalidVerbEnvelopeStructure(rawValue, options = {}) {
      const raw = (targetObject.getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
      const cleaned = raw.replace(targetObject.COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
      const allowPartial = options.allowPartial === true;
      if (cleaned.includes("/-") || cleaned.includes("-/")) {
        return "separator";
      }
      const markerRe = targetObject.COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
      const tokens = [];
      const separators = [];
      let current = "";
      for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "/" || char === "-") {
          tokens.push(current);
          separators.push(char);
          current = "";
        } else {
          current += char;
        }
      }
      tokens.push(current);
      const isNonspecificToken = token => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
      const isPrefixToken = token => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(token) || isNonspecificToken(token) || token === "k";
      for (let i = 0; i < separators.length; i += 1) {
        const sep = separators[i];
        const leftRaw = tokens[i] ?? "";
        const rightRaw = tokens[i + 1] ?? "";
        const left = leftRaw.replace(markerRe, "");
        const right = rightRaw.replace(markerRe, "");
        if (!right) {
          if (allowPartial && i === separators.length - 1) {
            return "";
          }
          if (sep === "-") {
            let hasNonEmptyLater = false;
            let onlyDashes = true;
            for (let j = i + 1; j < separators.length; j += 1) {
              if (separators[j] !== "-") {
                onlyDashes = false;
                break;
              }
              const nextToken = (tokens[j + 1] ?? "").replace(markerRe, "");
              if (nextToken) {
                hasNonEmptyLater = true;
                break;
              }
            }
            if (onlyDashes && hasNonEmptyLater) {
              continue;
            }
          }
          return "separator";
        }
        if (sep === "/") {
          // PREFIX/ can bind only to nonspecific or verbstem (not to specific prefixes).
          const rightIsPrefix = separators[i + 1] === "/";
          if (isPrefixToken(right) && !isNonspecificToken(right)) {
            return "separator";
          }
          if (rightIsPrefix && !isNonspecificToken(right)) {
            const nextRaw = tokens[i + 2] ?? "";
            const next = nextRaw.replace(markerRe, "");
            const allowImpersonalTaRightEmbed = left === "ta" && Boolean(right) && Boolean(next) && !isPrefixToken(right);
            const leftDirectionalFromBracket = getBracketDirectionalPrefixToken(leftRaw.replace(/^-+/, ""));
            const allowDirectionalRightEmbed = Boolean(leftDirectionalFromBracket) && Boolean(right) && Boolean(next) && !isPrefixToken(right);
            if (!allowImpersonalTaRightEmbed && !allowDirectionalRightEmbed) {
              return "separator";
            }
          }
        }
      }
      const valenceSlots = getValenceSlotsFromCleaned(cleaned);
      if (valenceSlots.length >= 2) {
        for (let i = 0; i < valenceSlots.length; i += 1) {
          if (getValenceCategoryFromToken(valenceSlots[i]) === "embedded") {
            return "embedded-between-dashes";
          }
        }
      }
      return "";
    }
    function getInvalidVerbStructure(rawValue, options = {}) {
      const expectRegexEnvelope = options.expectRegexEnvelope === true ? true : options.expectRegexEnvelope === false ? false : true;
      const allowPartial = options.allowPartial === true;
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return "";
      }
      const movingTargetParsed = parseMovingTargetRegexInput(trimmed);
      if (movingTargetParsed.isValid) {
        return "";
      }
      const shorthandInput = getCurrentRegexShorthandParseInput(trimmed);
      if (shorthandInput && parseMovingTargetRegexInput(shorthandInput).isValid) {
        return "";
      }
      if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return "";
      }
      if (trimmed.includes("?")) {
        return "search";
      }
      if (expectRegexEnvelope) {
        return "core-envelope";
      }
      return "core-envelope";
    }
    function getInvalidVerbStructureMessage(invalidStructure = "", options = {}) {
      switch (String(invalidStructure || "")) {
        case "search":
          return "La búsqueda con ? ya no forma parte del regex.";
        case "core-envelope":
          return "Regex usa solo la gramática nueva: (...) o -(...) con piezas exteriores unidas por +.";
        case "core-empty":
          return "El core no puede ir vacío.";
        case "unsupported-parentheses":
          return "Regex nuevo usa valencias exteriores y [i] o [y]; no uses la notación anterior.";
        case "supportive-marker":
          return "Regex usa [i] o [y] como apoyo opcional.";
        case "dash":
          return "El regex nuevo solo usa -(...) para núcleos transitivos.";
        case "separator":
          return "El verbo contiene separadores inválidos.";
        default:
          return "La estructura del regex es inválida.";
      }
    }
    function serializeCanonicalRegexEnvelope(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      return serializeRegexInputValue(raw) || raw;
    }
    function normalizeComposerScreenCoreValue(value = "", options = {}) {
      const preserveSupportiveMarkers = options.preserveSupportiveMarkers === true;
      const supportivePattern = /\[([iy])\]/g;
      const supportiveReplacement = preserveSupportiveMarkers ? "[$1]" : "$1";
      const boundSupportiveIPattern = /(^|[-/])\[i\]([a-z]+)\/i([a-z]+)/gi;
      return String(value || "").replace(/\[([a-z]+)\]/gi, match => getBracketDirectionalPrefixToken(match) || match).replace(boundSupportiveIPattern, (_match, separator, embed, stem) => {
        const normalizedSeparator = String(separator || "");
        const normalizedEmbed = String(embed || "").toLowerCase();
        const normalizedStem = `i${String(stem || "").toLowerCase()}`;
        if (preserveSupportiveMarkers) {
          return `${normalizedSeparator}[i]${normalizedEmbed}/${normalizedStem}`;
        }
        return `${normalizedSeparator}i${normalizedEmbed}/${normalizedStem}`;
      }).replace(/\//g, "-").toLowerCase().replace(supportivePattern, supportiveReplacement).replace(/\((ta|te|mu|t|m)\)/g, "$1").replace(/\((tajta|tejte|mujmu)\)/g, "$1");
    }
    function restoreBracketSupportiveMarkers(value = "") {
      return String(value || "").replace(/__supportive_i__/gi, "[i]").replace(/__supportive_y__/gi, "[y]");
    }
    function stripBracketSupportiveMarkersForDisplay(value = "") {
      return String(value || "").replace(/\[i\]/gi, "i").replace(/\[y\]/gi, "y").replace(/\/i\//gi, "i").replace(/\/y\//gi, "y");
    }
    function formatComposerDisplayMovingTargetPiece(piece = null, options = {}) {
      if (!piece || !piece.value) {
        return "";
      }
      const value = normalizeComposerScreenCoreValue(piece.value, options);
      if (!value) {
        return "";
      }
      if (piece.type === "lexical") {
        return `(${value})`;
      }
      return value;
    }
    // Core parsing functions extracted to src/core/parsing/parsing.js

    function triggerInputShake(target) {
      if (!target || !target.classList) {
        return;
      }
      target.classList.remove("shake");
      void target.offsetWidth;
      target.classList.add("shake");
      if (target._shakeTimeout) {
        targetObject.clearTimeout(target._shakeTimeout);
      }
      target._shakeTimeout = targetObject.setTimeout(() => {
        target.classList.remove("shake");
      }, 350);
    }
    function handleVerbBeforeInput(event) {
      if (event.isComposing) {
        return;
      }
      if (event.inputType && event.inputType.startsWith("delete")) {
        return;
      }
      const data = event.data;
      if (!data) {
        return;
      }
      const target = event.target;
      if (!target || typeof target.value !== "string") {
        return;
      }
      const value = target.value;
      const start = target.selectionStart ?? value.length;
      const end = target.selectionEnd ?? value.length;
      const writableSelection = target.id === "verb" ? targetObject.getVerbInputWritableSelection(value) : null;
      const selectionInsideWritableSlot = Boolean(writableSelection && (start === end && start >= writableSelection.start && start <= writableSelection.end || end > writableSelection.start && start < writableSelection.end));
      if (selectionInsideWritableSlot) {
        const nextValue = value.slice(0, writableSelection.start) + data + value.slice(writableSelection.end);
        if (nextValue.includes("/-") || nextValue.includes("-/")) {
          event.preventDefault();
          triggerInputShake(target);
          return;
        }
        event.preventDefault();
        target.value = nextValue;
        if (typeof target.setSelectionRange === "function") {
          const caret = writableSelection.start + data.length;
          target.setSelectionRange(caret, caret);
        }
        targetObject.dispatchTextInputUpdate(target);
        return;
      }
      const nextValue = value.slice(0, start) + data + value.slice(end);
      if (nextValue.includes("/-") || nextValue.includes("-/")) {
        event.preventDefault();
        triggerInputShake(target);
      }
    }

    // === Verb Parsing ===
    // Extracted to src/core/parsing/parsing.js

    var SUPPLETIVE_KATI_FORMS = new Set();
    var SUPPLETIVE_KATI_IMPERFECTIVE = "";
    var SUPPLETIVE_KATI_CLASS_A = "";
    var SUPPLETIVE_KATI_CLASS_D = "";
    var SUPPLETIVE_KATI_CLASS_EXCLUSIONS = {};
    var SUPPLETIVE_KATI_NONACTIVE = "";
    var SUPPLETIVE_YAWI_FORMS = new Set();
    var SUPPLETIVE_YAWI_CANONICAL = "";
    var SUPPLETIVE_YAWI_IMPERFECTIVE = "";
    var SUPPLETIVE_YAWI_SHORT = "";
    var SUPPLETIVE_YAWI_YU_VARIANT = "";
    var SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE = "";
    var SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE = "";
    var SUPPLETIVE_WEYA_FORMS = new Set();
    var SUPPLETIVE_WEYA_ROOT = "";
    var SUPPLETIVE_WEYA_CANONICAL = "";
    var SUPPLETIVE_WITZI_FORMS = new Set();
    var SUPPLETIVE_WITZI_IMPERFECTIVE = "";
    var SUPPLETIVE_WITZI_PERFECTIVE = "";
    var SUPPLETIVE_WITZI_OPTATIVE = "";
    var SUPPLETIVE_WITZI_NONACTIVE = "";
    var SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE = "";
    var SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE = "";
    var SUPPLETIVE_WITZI_NONACTIVE_TENSES = new Set();
    var SUPPLETIVE_STEM_PATHS = [];
    var INTRANSITIVE_ONLY_SUPPLETIVE_IDS = new Set(["yawi", "weya", "kati", "witzi"]);
    // Getter/builder functions extracted to src/core/irregulars/irregulars.js

    function isPerfectiveTense(tense) {
      return targetObject.PRETERITO_CLASS_TENSES.has(tense) || targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense) || tense === "preterito" || targetObject.isPotencialActiveTense(tense) || tense === "pasado-remoto-adverbio-activo";
    }
    function getEmptyNonactiveStemMetadataResult() {
      return {
        nonactiveStems: null,
        nonactiveAllStems: null,
        nonactiveAllStemSpecs: null,
        derivedNonactiveStems: null
      };
    }
    function buildNonactiveDerivationOptions({
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      parsedVerb = null,
      directionalPrefix = "",
      isYawi = false,
      suppletiveStemSet = null,
      tense = "",
      tenseMode = "",
      derivationMode = "",
      preferredNonactiveBaseVerb = "",
      preferredNonactiveSourceMeta = null,
      preferredNonactiveSourcePrefix = "",
      selectedSuffix = undefined
    }) {
      return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        isYawi,
        suppletiveStemSet,
        tense,
        tenseMode,
        derivationMode,
        preferredNonactiveBaseVerb,
        preferredNonactiveSourceMeta,
        preferredNonactiveSourcePrefix,
        selectedSuffix
      };
    }
    function getLexicallyAttestedValencyReducedTransitiveVariant(baseVerb = "", targetObjectSlots = 0) {
      if (!baseVerb || !targetObject.BASIC_DATA_CANONICAL_MAP.size) {
        return null;
      }
      const normalizedBase = targetObject.normalizeRuleBase(baseVerb);
      if (!normalizedBase) {
        return null;
      }
      const normalizedTargetSlots = Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(targetObjectSlots) || 0));
      const nonRedupBase = targetObject.normalizeRuleBase(targetObject.getNonReduplicatedRoot(normalizedBase) || normalizedBase);
      const exactRedupCandidate = nonRedupBase && nonRedupBase !== normalizedBase ? targetObject.normalizeRuleBase(targetObject.buildReduplicatedSurfaceForm(nonRedupBase) || "") : "";
      const directCandidates = Array.from(new Set([exactRedupCandidate, normalizedBase, nonRedupBase].filter(Boolean)));
      for (const candidate of directCandidates) {
        const info = targetObject.BASIC_DATA_CANONICAL_MAP.get(candidate.toLowerCase());
        const parsed = info?.transitiveParsed || null;
        if (parsed && targetObject.getBaseObjectSlots(parsed) === normalizedTargetSlots) {
          return parsed;
        }
      }
      const matches = [];
      targetObject.BASIC_DATA_CANONICAL_MAP.forEach(info => {
        const parsed = info?.transitiveParsed || null;
        if (!parsed || targetObject.getBaseObjectSlots(parsed) !== normalizedTargetSlots) {
          return;
        }
        const parsedBase = targetObject.normalizeRuleBase(parsed.canonicalRuleBase || parsed.canonical?.ruleBase || parsed.verb || "");
        const parsedNonRedup = targetObject.normalizeRuleBase(targetObject.getNonReduplicatedRoot(parsedBase) || parsedBase);
        if (!parsedNonRedup || parsedNonRedup !== nonRedupBase) {
          return;
        }
        matches.push({
          parsed,
          isExactRedup: Boolean(exactRedupCandidate && parsedBase === exactRedupCandidate),
          isExactBase: parsedBase === normalizedBase,
          length: targetObject.getVerbLetterCount(parsedBase)
        });
      });
      matches.sort((left, right) => {
        if (left.isExactRedup !== right.isExactRedup) {
          return left.isExactRedup ? -1 : 1;
        }
        if (left.isExactBase !== right.isExactBase) {
          return left.isExactBase ? -1 : 1;
        }
        return left.length - right.length;
      });
      return matches[0]?.parsed || null;
    }
    function resolvePotencialHabitualReducedNonactiveSource({
      parsedVerb = null,
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      tense = "",
      tenseMode = "",
      derivationMode = ""
    }) {
      if (!parsedVerb || !targetObject.isPotencialHabitualTense(tense) || tenseMode !== targetObject.TENSE_MODE.adjetivo || derivationMode !== targetObject.DERIVATION_MODE.nonactive) {
        return null;
      }
      const sourceObjectSlots = targetObject.getBaseObjectSlots(parsedVerb);
      if (sourceObjectSlots < 2 || !targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
        return null;
      }
      const source = targetObject.getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
      const baseVerb = targetObject.stripBoundSourcePrefixFromNonactiveBase(source.baseVerb || "", source.prefix || "", parsedVerb);
      if (!baseVerb) {
        return null;
      }
      const reducedParsed = getLexicallyAttestedValencyReducedTransitiveVariant(baseVerb, Math.max(0, sourceObjectSlots - 1));
      if (!reducedParsed) {
        return null;
      }
      const reducedBaseVerb = targetObject.normalizeRuleBase(reducedParsed.canonicalRuleBase || reducedParsed.canonical?.ruleBase || reducedParsed.analysisVerb || reducedParsed.verb || "");
      if (!reducedBaseVerb || reducedBaseVerb === targetObject.normalizeRuleBase(baseVerb)) {
        return null;
      }
      return {
        preferredNonactiveBaseVerb: reducedBaseVerb,
        preferredNonactiveSourceMeta: reducedParsed,
        preferredNonactiveSourcePrefix: source.prefix || ""
      };
    }
    function applyNonactiveDerivationFromOptions({
      isNonactive = false,
      derivationType = "",
      causativeAllStems = null,
      applicativeAllStems = null,
      derivationOptions = null
    }) {
      return targetObject.applyNonactiveDerivation({
        ...(derivationOptions || {}),
        isNonactive,
        derivationType,
        causativeAllStems,
        applicativeAllStems
      });
    }
    function getParsedVerbNonactiveStemMetadata(parsedVerb, options = {}) {
      if (!parsedVerb || !parsedVerb.verb) {
        return getEmptyNonactiveStemMetadataResult();
      }
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : targetObject.DERIVATION_TYPE.direct;
      const objectPrefix = typeof options.objectPrefix === "string" ? options.objectPrefix : "";
      const uniqueStems = targetObject.uniqueNonEmptyValues;
      const parsedWithDerivation = {
        ...parsedVerb,
        derivationType,
        derivationValencyDelta: targetObject.getDerivationValencyDelta(derivationType)
      };
      const emptyResult = getEmptyNonactiveStemMetadataResult();
      let verb = parsedWithDerivation.verb || "";
      let analysisVerb = parsedWithDerivation.analysisVerb || verb;
      let isYawi = parsedWithDerivation.isYawi === true;
      let suppletiveStemSet = targetObject.getSuppletiveStemSet(parsedWithDerivation);
      const forwardDerivation = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions: buildNonactiveDerivationOptions({
          verb,
          analysisVerb,
          objectPrefix,
          parsedVerb: parsedWithDerivation,
          directionalPrefix: parsedWithDerivation.directionalPrefix || "",
          isYawi,
          suppletiveStemSet,
          selectedSuffix: null
        }),
        uniqueStems
      });
      if (forwardDerivation.blocked) {
        return emptyResult;
      }
      ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = targetObject.extractForwardDerivationState(forwardDerivation, {
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      }));
      const causativeAllStems = forwardDerivation.causativeAllStems;
      const applicativeAllStems = forwardDerivation.applicativeAllStems;
      const nonactiveDerivation = applyNonactiveDerivationFromOptions({
        isNonactive: true,
        derivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: buildNonactiveDerivationOptions({
          verb,
          analysisVerb,
          objectPrefix,
          parsedVerb: parsedWithDerivation,
          directionalPrefix: parsedWithDerivation.directionalPrefix || "",
          isYawi,
          suppletiveStemSet,
          selectedSuffix: null
        })
      });
      ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      } = targetObject.extractForwardDerivationState(nonactiveDerivation, {
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet
      }));
      const nonactiveStems = uniqueStems([verb, analysisVerb]);
      const nonactiveAllStems = uniqueStems(Array.isArray(nonactiveDerivation.nonactiveAllStems) ? nonactiveDerivation.nonactiveAllStems : nonactiveStems);
      const nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs) ? targetObject.getUniqueMorphStemSpecs(nonactiveDerivation.nonactiveAllStemSpecs) : null;
      const derivedNonactiveStems = derivationType === targetObject.DERIVATION_TYPE.direct ? null : nonactiveAllStems;
      return {
        nonactiveStems: nonactiveStems.length ? nonactiveStems : null,
        nonactiveAllStems: nonactiveAllStems.length ? nonactiveAllStems : null,
        nonactiveAllStemSpecs: nonactiveAllStemSpecs && nonactiveAllStemSpecs.length ? nonactiveAllStemSpecs : null,
        derivedNonactiveStems: derivedNonactiveStems && derivedNonactiveStems.length ? derivedNonactiveStems : null
      };
    }
    function buildParsedVerbForTab(tabId, rawValue, options = {}) {
      const raw = typeof rawValue === "string" ? rawValue : "";
      const rawTiMetadata = targetObject.getRawInputTiCausativeMetadata(raw);
      const effectiveRaw = options.useSearchBase === false ? raw : targetObject.getSearchInputBase(raw);
      const tiInputMetadata = targetObject.getRawInputTiCausativeMetadata(effectiveRaw);
      const parseInput = tiInputMetadata.normalizedInput || effectiveRaw;
      const parsed = parseVerbInput(parseInput);
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(options.derivationType) ? options.derivationType : targetObject.DERIVATION_TYPE.direct;
      const derivationValencyDelta = targetObject.getDerivationValencyDelta(derivationType);
      const explicitTiCausativeClass = targetObject.normalizeTiCausativeClass(options.tiCausativeClass || "");
      const tiCausativeClass = explicitTiCausativeClass || tiInputMetadata.tiCausativeClass || rawTiMetadata.tiCausativeClass || "";
      const parsedWithContext = {
        ...parsed,
        tabId: tabId || "",
        derivationType,
        derivationValencyDelta,
        tiCausativeClass
      };
      const includeNonactiveStemMetadata = options.includeNonactiveStemMetadata !== false;
      if (!includeNonactiveStemMetadata) {
        return parsedWithContext;
      }
      const nonactiveStemMetadata = getParsedVerbNonactiveStemMetadata(parsedWithContext, {
        derivationType,
        objectPrefix: options.objectPrefix
      });
      return {
        ...parsedWithContext,
        ...nonactiveStemMetadata
      };
    }
    function createEmptyComposerRegexState(rawValue = "") {
      void rawValue;
      return {
        mode: targetObject.VERB_INPUT_MODE.composer,
        transitivity: targetObject.COMPOSER_TRANSITIVITY.intransitive,
        valenceIntransitive: "",
        valenceIntransitiveEmbed: "",
        valence: "",
        valenceEmbedPrimary: "",
        valenceSecondary: "",
        valenceEmbedSecondary: "",
        slotAEmbed: "",
        slotAStem: "",
        slotBEmbed: "",
        slotBStem: "",
        slotCEmbed: "",
        slotCStem: "",
        directionalPrefix: "",
        embedPrefix: "",
        supportiveMarker: "",
        syllableMode: targetObject.COMPOSER_SYLLABLE_MODE.multisyllable,
        tiCausativeClass: ""
      };
    }
    function buildComposerStateFromMovingTargetParsed(parsed = null, rawValue = "") {
      const state = createEmptyComposerRegexState(rawValue);
      if (!parsed || parsed.isValid !== true) {
        return state;
      }
      const normalizedCore = String(parsed.coreText || "").trim();
      const inline = targetObject.parseInlineTiCausativeClassFromBase(normalizedCore);
      const coreText = String(inline.base || normalizedCore || "").trim();
      const outerLexical = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).filter(piece => piece && piece.type === "lexical" && piece.value).map(piece => targetObject.normalizeComposerStem(piece.value)).filter(Boolean).join("-");
      const outerValences = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : []).filter(piece => piece && piece.type === "valence" && piece.value).map(piece => normalizeEntradaGrammarValenceSurfaceToken(piece.value)).filter(Boolean);
      const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(coreText);
      const normalizedCoreStem = targetObject.normalizeComposerStem(coreText);
      const supportiveMarker = targetObject.normalizeSupportiveMarkerValue(targetObject.getRegexOptionalSupportiveMarkerLetter(coreText));
      const activeStem = adjacentCoreEmbed ? targetObject.normalizeComposerStem(adjacentCoreEmbed.stem) : normalizedCoreStem;
      const activeEmbed = adjacentCoreEmbed ? targetObject.normalizeComposerEmbedValue(adjacentCoreEmbed.embed) : "";
      state.transitivity = parsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      state.directionalPrefix = targetObject.normalizeComposerStem(parsed.directionalPrefix || "");
      state.supportiveMarker = supportiveMarker;
      state.tiCausativeClass = targetObject.normalizeTiCausativeClass(inline.tiCausativeClass || "");
      if (state.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        state.valenceIntransitive = outerValences[0] || "";
        state.valenceIntransitiveEmbed = state.valenceIntransitive ? outerLexical : "";
        state.slotAStem = activeStem;
        state.slotAEmbed = state.valenceIntransitive ? activeEmbed : targetObject.normalizeComposerEmbedValue(activeEmbed || outerLexical);
        state.embedPrefix = state.slotAEmbed;
      } else if (state.transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        state.valence = outerValences[0] || "";
        state.valenceEmbedPrimary = outerLexical;
        state.slotBStem = activeStem;
        state.slotBEmbed = activeEmbed;
        state.embedPrefix = state.slotBEmbed;
      } else {
        const firstValence = outerValences[0] || "";
        const secondValence = outerValences[1] || "";
        state.valenceSecondary = targetObject.encodeComposerSecondaryValenceSelection(firstValence, secondValence);
        state.valenceEmbedSecondary = outerLexical;
        state.slotCStem = activeStem;
        state.slotCEmbed = activeEmbed;
        state.embedPrefix = state.slotCEmbed;
      }
      const syllables = targetObject.getComposerStemSyllableCount(targetObject.getComposerActiveStemValue(state));
      state.syllableMode = syllables === 1 ? targetObject.COMPOSER_SYLLABLE_MODE.monosyllable : targetObject.COMPOSER_SYLLABLE_MODE.multisyllable;
      return state;
    }
    function normalizeRegexCoreTokenCase(value = "", options = {}) {
      const forceUppercaseMarkers = options.forceUppercaseMarkers === true;
      const protectedSupportives = String(value || "").replace(/(?:\/([iy])\/|\[([iy])\])/gi, (_match, letterA, letterB) => `__regex_supportive_${String(letterA || letterB || "").toLowerCase()}__`);
      return protectedSupportives.replace(/\//g, "-").split(/([-\u0000])/).map(part => {
        if (part === "-") {
          return "-";
        }
        const trimmed = String(part || "").trim();
        if (!trimmed) {
          return "";
        }
        const restoredSupportives = trimmed.replace(/__regex_supportive_i__/gi, "[i]").replace(/__regex_supportive_y__/gi, "[y]");
        if (restoredSupportives !== trimmed) {
          return restoredSupportives;
        }
        if (/^\[[a-z]+\]$/i.test(trimmed)) {
          return `[${trimmed.slice(1, -1).toLowerCase()}]`;
        }
        const supportiveMatch = trimmed.match(/^\[([iy])\]/i);
        if (supportiveMatch) {
          const supportiveLetter = String(supportiveMatch[1] || "").toLowerCase();
          const remainder = trimmed.slice(supportiveMatch[0].length).toLowerCase();
          return `${targetObject.getRegexOptionalSupportiveMarkerForLetter(supportiveLetter)}${remainder}`;
        }
        const normalized = trimmed.toLowerCase();
        const shouldUppercaseMarker = targetObject.REGEX_ENVELOPE_OBJECT_MARKERS.includes(trimmed.toUpperCase()) && (forceUppercaseMarkers || trimmed === trimmed.toUpperCase());
        return shouldUppercaseMarker ? trimmed.toUpperCase() : normalized;
      }).join("");
    }
    function parseComposerPlaceholderBase(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return null;
      }
      const match = raw.match(/^(--|-)?(_+(?:[a-z]+)?)$/i);
      if (!match) {
        return null;
      }
      const dashPrefix = match[1] === "--" ? "--" : match[1] === "-" ? "-" : "";
      const coreText = String(match[2] || "").toLowerCase();
      if (!coreText) {
        return null;
      }
      return {
        dashPrefix,
        coreText,
        displayCore: coreText,
        displayVerb: buildRegexDisplayVerb(dashPrefix, coreText)
      };
    }
    function normalizeRegexSpecialSerialShorthandCore(coreValue = "") {
      const normalized = String(coreValue || "").trim().toLowerCase();
      if (!normalized) {
        return "";
      }
      return targetObject.REGEX_SPECIAL_SERIAL_SHORTHAND_CORE_MAP[normalized] || normalized;
    }
    function serializeRegexSpecialSerialShorthandValue(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const shorthandMatch = raw.match(/^(--|-)?(_wi-auto|_wiauto)$/i);
      if (shorthandMatch) {
        const dashPrefix = shorthandMatch[1] === "--" ? "--" : shorthandMatch[1] === "-" ? "-" : "";
        const displayCore = targetObject.REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(shorthandMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
      }
      const wrappedMatch = raw.match(/^(--|-)?\((_wi-auto|_wiauto)\)$/i);
      if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--" ? "--" : wrappedMatch[1] === "-" ? "-" : "";
        const displayCore = targetObject.REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(wrappedMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
      }
      return "";
    }
    function serializeComposerPlaceholderValenceScreen(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return "";
      }
      const directMatch = raw.match(/^(--|-)?\((tajta|tejte|mujmu)\)-(_+(?:[a-z]+)?)$/i);
      if (directMatch) {
        const dashPrefix = directMatch[1] === "--" ? "--" : directMatch[1] === "-" ? "-" : "";
        const token = String(directMatch[2] || "").toLowerCase();
        const placeholderStem = String(directMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
      }
      const wrappedMatch = raw.match(/^(--|-)?\(\((tajta|tejte|mujmu)\)-(_+(?:[a-z]+)?)\)$/i);
      if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--" ? "--" : wrappedMatch[1] === "-" ? "-" : "";
        const token = String(wrappedMatch[2] || "").toLowerCase();
        const placeholderStem = String(wrappedMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
      }
      return "";
    }
    function convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers(value = "") {
      return String(value || "").replace(/(^|[-/])((?:TA|TE|MU|T|M))(?=$|[-/])/g, (_match, separator, token) => `${separator}(${String(token || "").toLowerCase()})`);
    }
    function getRegexCoreMainObjectCount(coreText = "") {
      const normalized = String(coreText || "").trim();
      if (!normalized) {
        return 0;
      }
      const splitIndex = normalized.lastIndexOf("-");
      if (splitIndex <= 0 || splitIndex >= normalized.length - 1) {
        return 0;
      }
      const head = normalized.slice(0, splitIndex).trim();
      const tail = normalized.slice(splitIndex + 1).trim();
      return head && tail ? 1 : 0;
    }
    function buildRegexDisplayVerb(dashPrefix = "", coreText = "", options = {}) {
      const normalizedDashPrefix = String(dashPrefix || "").startsWith("-") ? "-" : "";
      let normalizedCore = normalizeRegexCoreTokenCase(coreText, options);
      while (normalizedCore.startsWith("-")) {
        normalizedCore = normalizedCore.slice(1);
      }
      if (!normalizedCore) {
        return normalizedDashPrefix;
      }
      return `${normalizedDashPrefix}(${normalizedCore})`;
    }
    function parseRegexCore(coreText = "", options = {}) {
      const rawCore = String(coreText || "").trim();
      if (!rawCore) {
        return {
          rawCore,
          coreText: "",
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: options.allowEmpty === true ? "" : "core-empty"
        };
      }
      const withoutRegexMarkers = rawCore.replace(targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, "");
      if (/[()]/.test(rawCore)) {
        return {
          rawCore,
          coreText: rawCore,
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: "unsupported-parentheses"
        };
      }
      if (/[{}]/.test(withoutRegexMarkers)) {
        return {
          rawCore,
          coreText: rawCore,
          displayCore: "",
          coreObjectCount: 0,
          isValid: false,
          invalidReason: "supportive-marker"
        };
      }
      const displayCore = normalizeRegexCoreTokenCase(rawCore);
      return {
        rawCore,
        coreText: displayCore,
        displayCore,
        coreObjectCount: getRegexCoreMainObjectCount(displayCore),
        isValid: true,
        invalidReason: ""
      };
    }
    function serializeRegexEnvelope({
      dashPrefix = "",
      coreText = ""
    } = {}) {
      return buildRegexDisplayVerb(dashPrefix, coreText);
    }
    function serializeRegexCore(coreState = {}) {
      if (typeof coreState === "string") {
        return normalizeRegexCoreTokenCase(coreState);
      }
      if (coreState && typeof coreState === "object") {
        if (typeof coreState.coreText === "string" && coreState.coreText) {
          return normalizeRegexCoreTokenCase(coreState.coreText);
        }
        if (typeof coreState.displayCore === "string" && coreState.displayCore) {
          return normalizeRegexCoreTokenCase(coreState.displayCore);
        }
      }
      return "";
    }
    function isAllowedPartialRegexEnvelopeValue(rawValue = "") {
      const trimmed = String(rawValue || "").trim();
      if (!trimmed) {
        return true;
      }
      if (trimmed.includes("?")) {
        return false;
      }
      if (parseMovingTargetRegexInput(trimmed).isValid) {
        return true;
      }
      const strippedSupportive = trimmed.replace(/(?:\/[iy]\/|\[[iy]\])/gi, "");
      if (/[^a-z0-9()+-]/i.test(strippedSupportive)) {
        return false;
      }
      let depth = 0;
      for (let index = 0; index < strippedSupportive.length; index += 1) {
        const char = strippedSupportive[index];
        if (char === "(") {
          depth += 1;
        } else if (char === ")") {
          depth -= 1;
          if (depth < 0) {
            return false;
          }
        }
      }
      return depth >= 0;
    }
    function getStemLeadingSupportiveLetter(stem = "") {
      const normalized = targetObject.normalizeComposerStem(stem);
      if (!normalized) {
        return "";
      }
      if (normalized.startsWith("i")) {
        return "i";
      }
      if (normalized.startsWith("y")) {
        return "y";
      }
      return "";
    }
    function resolveComposerSupportiveMarkerCandidate({
      stem = "",
      embed = ""
    } = {}) {
      const fromStem = getStemLeadingSupportiveLetter(stem);
      if (fromStem) {
        return fromStem;
      }
      return getStemLeadingSupportiveLetter(embed);
    }
    function resolveOptionalSupportiveLetter(letter = "", analysisVerb = "") {
      const explicit = String(letter || "").trim().toLowerCase();
      if (explicit === "i" || explicit === "y") {
        return explicit;
      }
      const fromAnalysis = getStemLeadingSupportiveLetter(analysisVerb);
      if (fromAnalysis) {
        return fromAnalysis;
      }
      return "i";
    }
    function getDirectionalPrefixesSource() {
      if (Array.isArray(targetObject.DIRECTIONAL_PREFIXES) && targetObject.DIRECTIONAL_PREFIXES.length) {
        return targetObject.DIRECTIONAL_PREFIXES;
      }
      return targetObject.FALLBACK_DIRECTIONAL_PREFIXES;
    }
    function isDirectionalPrefixToken(value = "") {
      const token = String(value || "");
      if (!token) {
        return false;
      }
      return getDirectionalPrefixesSource().includes(token);
    }
    function getBracketDirectionalPrefixToken(value = "") {
      const token = String(value || "").trim().toLowerCase();
      const match = token.match(/^\[([a-z]+)\]$/);
      if (!match) {
        return "";
      }
      const directional = match[1];
      return isDirectionalPrefixToken(directional) ? directional : "";
    }

    const api = {};
    Object.defineProperty(api, "LESSON28_COMPOUND_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_COMPOUND_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "LESSON28_VERBAL_EMBED_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_VERBAL_EMBED_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON28_VERBAL_EMBED_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_VERBAL_EMBED_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON28_COMPOUND_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_COMPOUND_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_MATRIX_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_MATRIX_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_COHESIVENESS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_COHESIVENESS_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_VERBAL_EMBED_VALENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_VERBAL_EMBED_VALENCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_CONNECTIVE_T_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_CONNECTIVE_T_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_INTRANSITIVE_MATRIX_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_INTRANSITIVE_MATRIX_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_SPECIAL_FORMATIONS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_SPECIAL_FORMATIONS_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_ACCOMPANYING_POSSESSION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_ACCOMPANYING_POSSESSION_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_INTRANSITIVIZED_REFLEXIVE_MATRIX_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_INTRANSITIVIZED_REFLEXIVE_MATRIX_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_SHARED_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_SHARED_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_FUTURE_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_FUTURE_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_RECURSION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_RECURSION_FRAME; },
    });
    Object.defineProperty(api, "LESSON28_VERBAL_EMBED_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON28_VERBAL_EMBED_SUBSECTION_INVENTORY; },
    });
    api.cloneLesson28CompoundRecord = cloneLesson28CompoundRecord;
    api.getLesson28VerbalEmbedSubsectionInventory = getLesson28VerbalEmbedSubsectionInventory;
    api.attachLesson28CompoundGrammarContract = attachLesson28CompoundGrammarContract;
    api.buildLesson28VerbalEmbedPursuitFrame = buildLesson28VerbalEmbedPursuitFrame;
    Object.defineProperty(api, "LESSON30_NOMINAL_EMBED_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_NOMINAL_EMBED_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON30_NOMINAL_EMBED_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_NOMINAL_EMBED_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON30_NOMINAL_EMBED_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_NOMINAL_EMBED_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_INCORPORATED_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_INCORPORATED_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_INCORPORATED_ADVERB_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_INCORPORATED_ADVERB_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_ADVERB_ROLE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_ADVERB_ROLE_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_SUPPLEMENT_TRANSFORM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_SUPPLEMENT_TRANSFORM_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_COMPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_COMPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_REDUP_NONACTIVE_CAVEAT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_REDUP_NONACTIVE_CAVEAT_FRAME; },
    });
    Object.defineProperty(api, "LESSON30_NOMINAL_EMBED_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON30_NOMINAL_EMBED_SUBSECTION_INVENTORY; },
    });
    api.cloneLesson30NominalEmbedRecord = cloneLesson30NominalEmbedRecord;
    api.getLesson30NominalEmbedSubsectionInventory = getLesson30NominalEmbedSubsectionInventory;
    api.attachLesson30NominalEmbedGrammarContract = attachLesson30NominalEmbedGrammarContract;
    api.buildLesson30NominalEmbedPursuitFrame = buildLesson30NominalEmbedPursuitFrame;
    api.normalizeMovingTargetCoreText = normalizeMovingTargetCoreText;
    api.getMovingTargetOuterPieceDescriptors = getMovingTargetOuterPieceDescriptors;
    api.formatMovingTargetOuterPiece = formatMovingTargetOuterPiece;
    api.buildMovingTargetRegexFromCoreAndPieces = buildMovingTargetRegexFromCoreAndPieces;
    api.stripPrefixOnce = stripPrefixOnce;
    api.getComposerDisplayExternalValenceSegments = getComposerDisplayExternalValenceSegments;
    api.stripLeadingComposerDisplaySegments = stripLeadingComposerDisplaySegments;
    api.buildComposerDisplayVerbFromEnvelope = buildComposerDisplayVerbFromEnvelope;
    api.buildComposerDisplayVerbFromMovingTargetParts = buildComposerDisplayVerbFromMovingTargetParts;
    api.serializeRegexInputValue = serializeRegexInputValue;
    api.findFinalTopLevelWrappedCore = findFinalTopLevelWrappedCore;
    api.splitTopLevelByPlus = splitTopLevelByPlus;
    api.parseMovingTargetOuterPiece = parseMovingTargetOuterPiece;
    api.getEmbeddedSlashTransitiveObjSlotCount = getEmbeddedSlashTransitiveObjSlotCount;
    api.getMovingTargetAdjacentEmbedParts = getMovingTargetAdjacentEmbedParts;
    api.parseMovingTargetRegexInput = parseMovingTargetRegexInput;
    api.buildCanonicalVerbSpecFromMovingTargetParsed = buildCanonicalVerbSpecFromMovingTargetParsed;
    api.buildCanonicalVerbSpecFromComposerSemantic = buildCanonicalVerbSpecFromComposerSemantic;
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_LAYER_ORDER; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_EARLY_ALLOMORPH_BY_SURFACE; },
    });
    Object.defineProperty(api, "ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH", {
        configurable: true,
        enumerable: true,
        get() { return ENTRADA_GRAMMAR_OBJECT_SURFACE_BY_EARLY_ALLOMORPH; },
    });
    api.cloneEntradaGrammarObjectRecord = cloneEntradaGrammarObjectRecord;
    api.hasEntradaGrammarFormulaSlotEvidence = hasEntradaGrammarFormulaSlotEvidence;
    api.getEntradaGrammarFormulaSlotObjectValue = getEntradaGrammarFormulaSlotObjectValue;
    api.getEntradaGrammarFormulaSlotStemValue = getEntradaGrammarFormulaSlotStemValue;
    api.normalizeEntradaGrammarMorphToken = normalizeEntradaGrammarMorphToken;
    api.getEntradaGrammarEarlyAllomorphFrameForSurface = getEntradaGrammarEarlyAllomorphFrameForSurface;
    api.getEntradaGrammarSurfaceForEarlyAllomorph = getEntradaGrammarSurfaceForEarlyAllomorph;
    api.getEntradaGrammarFormulaMorphForSurface = getEntradaGrammarFormulaMorphForSurface;
    api.normalizeEntradaGrammarValenceSurfaceToken = normalizeEntradaGrammarValenceSurfaceToken;
    api.getEntradaGrammarMorphicVariantsForSurface = getEntradaGrammarMorphicVariantsForSurface;
    api.entradaGrammarFormulaObjectValueCoversToken = entradaGrammarFormulaObjectValueCoversToken;
    api.buildEntradaGrammarFormulaObjectCoverage = buildEntradaGrammarFormulaObjectCoverage;
    api.buildEntradaGrammarObjectValenceSlots = buildEntradaGrammarObjectValenceSlots;
    api.buildEntradaGrammarObjectObjectVector = buildEntradaGrammarObjectObjectVector;
    api.buildEntradaGrammarObjectCandidateFormulaSlots = buildEntradaGrammarObjectCandidateFormulaSlots;
    api.buildEntradaGrammarObjectMorphBoundaryFrame = buildEntradaGrammarObjectMorphBoundaryFrame;
    api.buildEntradaGrammarObjectFromCanonicalVerbSpec = buildEntradaGrammarObjectFromCanonicalVerbSpec;
    api.buildEntradaGrammarObjectFromComposerSemantic = buildEntradaGrammarObjectFromComposerSemantic;
    api.buildEntradaGrammarObjectFromMovingTargetParsed = buildEntradaGrammarObjectFromMovingTargetParsed;
    api.getCompoundAstExternalObjectSlotId = getCompoundAstExternalObjectSlotId;
    api.buildCompoundAstExternalObjectSlots = buildCompoundAstExternalObjectSlots;
    api.buildCompoundAstRouteFrame = buildCompoundAstRouteFrame;
    api.buildCompoundAstMetadata = buildCompoundAstMetadata;
    api.resolveOrdinaryNncParseFixture = resolveOrdinaryNncParseFixture;
    api.buildOrdinaryNncParseClassification = buildOrdinaryNncParseClassification;
    api.buildOrdinaryNncFixtureClassifications = buildOrdinaryNncFixtureClassifications;
    api.buildVerbMetaFromCanonicalSpec = buildVerbMetaFromCanonicalSpec;
    api.buildParsedVerbFromMovingTargetInput = buildParsedVerbFromMovingTargetInput;
    api.isVerbValueAllowed = isVerbValueAllowed;
    api.getInputGateRightmostStem = getInputGateRightmostStem;
    api.startsWithConsonantCluster = startsWithConsonantCluster;
    api.evaluateVerbStemInputGate = evaluateVerbStemInputGate;
    api.getAuthoritativeDerivationalSourceForRawInputGate = getAuthoritativeDerivationalSourceForRawInputGate;
    Object.defineProperty(api, "DEFAULT_NONSPECIFIC_VALENCE_AFFIXES", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NONSPECIFIC_VALENCE_AFFIXES; },
    });
    Object.defineProperty(api, "DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET; },
    });
    Object.defineProperty(api, "EXPLICIT_VALENCE_SHORTHAND_MAP", {
        configurable: true,
        enumerable: true,
        get() { return EXPLICIT_VALENCE_SHORTHAND_MAP; },
    });
    api.getNonspecificValenceAffixSetForMatching = getNonspecificValenceAffixSetForMatching;
    api.normalizeExplicitValenceToken = normalizeExplicitValenceToken;
    api.isNonspecificValenceAffixToken = isNonspecificValenceAffixToken;
    api.getExplicitValenceTokenFromSegment = getExplicitValenceTokenFromSegment;
    api.splitCompoundPartsWithExplicitFlags = splitCompoundPartsWithExplicitFlags;
    api.isFusionPrefixTokenForParsing = isFusionPrefixTokenForParsing;
    api.isObjectMarkerTokenForParsing = isObjectMarkerTokenForParsing;
    api.getValenceSlotsFromCleaned = getValenceSlotsFromCleaned;
    api.getExactBaseVerbFromCleaned = getExactBaseVerbFromCleaned;
    api.stripLeadingSupportiveLetterFromCoreSurface = stripLeadingSupportiveLetterFromCoreSurface;
    Object.defineProperty(api, "SLASH_MATRIX_FUSED_RULEBASES", {
        configurable: true,
        enumerable: true,
        get() { return SLASH_MATRIX_FUSED_RULEBASES; },
    });
    Object.defineProperty(api, "SLASH_MATRIX_FUSED_SUFFIXES", {
        configurable: true,
        enumerable: true,
        get() { return SLASH_MATRIX_FUSED_SUFFIXES; },
    });
    api.shouldFuseSlashMatrixRuleBase = shouldFuseSlashMatrixRuleBase;
    api.getLexicalBoundPrefixes = getLexicalBoundPrefixes;
    api.getExplicitBoundNonspecificPrefixes = getExplicitBoundNonspecificPrefixes;
    api.getSlashMatrixCompositeRuleBase = getSlashMatrixCompositeRuleBase;
    api.resolveCanonicalSourceSplit = resolveCanonicalSourceSplit;
    api.getEmbeddedVerbPrefixFromParts = getEmbeddedVerbPrefixFromParts;
    api.getValenceCategoryFromToken = getValenceCategoryFromToken;
    api.hasConsecutiveSpecificValences = hasConsecutiveSpecificValences;
    api.computeDirectionalRuleModeCore = computeDirectionalRuleModeCore;
    api.resolveDirectionalRuleMode = resolveDirectionalRuleMode;
    api.getDirectionalRulesForPrefix = getDirectionalRulesForPrefix;
    api.applyDirectionalRules = applyDirectionalRules;
    api.applyWalDirectionalRule = applyWalDirectionalRule;
    api.applyWalNounPlacement = applyWalNounPlacement;
    Object.defineProperty(api, "DIRECTIONAL_RULE_HANDLERS", {
        configurable: true,
        enumerable: true,
        get() { return DIRECTIONAL_RULE_HANDLERS; },
    });
    api.getCurrentRegexShorthandParseInput = getCurrentRegexShorthandParseInput;
    api.buildEmptyParsedVerb = buildEmptyParsedVerb;
    api.parseVerbInput = parseVerbInput;
    api.getParsedSyllableAnalysisTarget = getParsedSyllableAnalysisTarget;
    api.startsWithKSeries = startsWithKSeries;
    api.getDisambiguationPrefixCandidates = getDisambiguationPrefixCandidates;
    api.getDisambiguationAffixCandidates = getDisambiguationAffixCandidates;
    api.getDisambiguationSuffixCandidates = getDisambiguationSuffixCandidates;
    api.getDisambiguationKnownSuffixCandidates = getDisambiguationKnownSuffixCandidates;
    api.getDisambiguationLongSplitCandidates = getDisambiguationLongSplitCandidates;
    api.getShapePatternLabels = getShapePatternLabels;
    api.getPretClassSignatureFromParsed = getPretClassSignatureFromParsed;
    api.getPretClassSignatureFromValue = getPretClassSignatureFromValue;
    api.buildVerbDisambiguationCandidates = buildVerbDisambiguationCandidates;
    api.isRecognizedCurrentRegexValue = isRecognizedCurrentRegexValue;
    api.getInvalidVerbCharacters = getInvalidVerbCharacters;
    api.getInvalidVerbLetters = getInvalidVerbLetters;
    api.getInvalidVerbEnvelopeStructure = getInvalidVerbEnvelopeStructure;
    api.getInvalidVerbStructure = getInvalidVerbStructure;
    api.getInvalidVerbStructureMessage = getInvalidVerbStructureMessage;
    api.serializeCanonicalRegexEnvelope = serializeCanonicalRegexEnvelope;
    api.normalizeComposerScreenCoreValue = normalizeComposerScreenCoreValue;
    api.restoreBracketSupportiveMarkers = restoreBracketSupportiveMarkers;
    api.stripBracketSupportiveMarkersForDisplay = stripBracketSupportiveMarkersForDisplay;
    api.formatComposerDisplayMovingTargetPiece = formatComposerDisplayMovingTargetPiece;
    api.triggerInputShake = triggerInputShake;
    api.handleVerbBeforeInput = handleVerbBeforeInput;
    Object.defineProperty(api, "SUPPLETIVE_KATI_FORMS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_FORMS; },
        set(value) { SUPPLETIVE_KATI_FORMS = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_KATI_IMPERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_IMPERFECTIVE; },
        set(value) { SUPPLETIVE_KATI_IMPERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_KATI_CLASS_A", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_CLASS_A; },
        set(value) { SUPPLETIVE_KATI_CLASS_A = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_KATI_CLASS_D", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_CLASS_D; },
        set(value) { SUPPLETIVE_KATI_CLASS_D = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_KATI_CLASS_EXCLUSIONS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_CLASS_EXCLUSIONS; },
        set(value) { SUPPLETIVE_KATI_CLASS_EXCLUSIONS = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_KATI_NONACTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_KATI_NONACTIVE; },
        set(value) { SUPPLETIVE_KATI_NONACTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_FORMS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_FORMS; },
        set(value) { SUPPLETIVE_YAWI_FORMS = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_CANONICAL", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_CANONICAL; },
        set(value) { SUPPLETIVE_YAWI_CANONICAL = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_IMPERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_IMPERFECTIVE; },
        set(value) { SUPPLETIVE_YAWI_IMPERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_SHORT", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_SHORT; },
        set(value) { SUPPLETIVE_YAWI_SHORT = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_YU_VARIANT", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_YU_VARIANT; },
        set(value) { SUPPLETIVE_YAWI_YU_VARIANT = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE; },
        set(value) { SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE; },
        set(value) { SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WEYA_FORMS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WEYA_FORMS; },
        set(value) { SUPPLETIVE_WEYA_FORMS = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WEYA_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WEYA_ROOT; },
        set(value) { SUPPLETIVE_WEYA_ROOT = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WEYA_CANONICAL", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WEYA_CANONICAL; },
        set(value) { SUPPLETIVE_WEYA_CANONICAL = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_FORMS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_FORMS; },
        set(value) { SUPPLETIVE_WITZI_FORMS = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_IMPERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_IMPERFECTIVE; },
        set(value) { SUPPLETIVE_WITZI_IMPERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_PERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_PERFECTIVE; },
        set(value) { SUPPLETIVE_WITZI_PERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_OPTATIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_OPTATIVE; },
        set(value) { SUPPLETIVE_WITZI_OPTATIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_NONACTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_NONACTIVE; },
        set(value) { SUPPLETIVE_WITZI_NONACTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE; },
        set(value) { SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE; },
        set(value) { SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_WITZI_NONACTIVE_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_WITZI_NONACTIVE_TENSES; },
        set(value) { SUPPLETIVE_WITZI_NONACTIVE_TENSES = value; },
    });
    Object.defineProperty(api, "SUPPLETIVE_STEM_PATHS", {
        configurable: true,
        enumerable: true,
        get() { return SUPPLETIVE_STEM_PATHS; },
        set(value) { SUPPLETIVE_STEM_PATHS = value; },
    });
    Object.defineProperty(api, "INTRANSITIVE_ONLY_SUPPLETIVE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return INTRANSITIVE_ONLY_SUPPLETIVE_IDS; },
        set(value) { INTRANSITIVE_ONLY_SUPPLETIVE_IDS = value; },
    });
    api.isPerfectiveTense = isPerfectiveTense;
    api.getEmptyNonactiveStemMetadataResult = getEmptyNonactiveStemMetadataResult;
    api.buildNonactiveDerivationOptions = buildNonactiveDerivationOptions;
    api.getLexicallyAttestedValencyReducedTransitiveVariant = getLexicallyAttestedValencyReducedTransitiveVariant;
    api.resolvePotencialHabitualReducedNonactiveSource = resolvePotencialHabitualReducedNonactiveSource;
    api.applyNonactiveDerivationFromOptions = applyNonactiveDerivationFromOptions;
    api.getParsedVerbNonactiveStemMetadata = getParsedVerbNonactiveStemMetadata;
    api.buildParsedVerbForTab = buildParsedVerbForTab;
    api.createEmptyComposerRegexState = createEmptyComposerRegexState;
    api.buildComposerStateFromMovingTargetParsed = buildComposerStateFromMovingTargetParsed;
    api.normalizeRegexCoreTokenCase = normalizeRegexCoreTokenCase;
    api.parseComposerPlaceholderBase = parseComposerPlaceholderBase;
    api.normalizeRegexSpecialSerialShorthandCore = normalizeRegexSpecialSerialShorthandCore;
    api.serializeRegexSpecialSerialShorthandValue = serializeRegexSpecialSerialShorthandValue;
    api.serializeComposerPlaceholderValenceScreen = serializeComposerPlaceholderValenceScreen;
    api.convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers = convertRegexCoreUppercaseMarkersToEnvelopeExplicitMarkers;
    api.getRegexCoreMainObjectCount = getRegexCoreMainObjectCount;
    api.buildRegexDisplayVerb = buildRegexDisplayVerb;
    api.parseRegexCore = parseRegexCore;
    api.serializeRegexEnvelope = serializeRegexEnvelope;
    api.serializeRegexCore = serializeRegexCore;
    api.isAllowedPartialRegexEnvelopeValue = isAllowedPartialRegexEnvelopeValue;
    api.getStemLeadingSupportiveLetter = getStemLeadingSupportiveLetter;
    api.resolveComposerSupportiveMarkerCandidate = resolveComposerSupportiveMarkerCandidate;
    api.resolveOptionalSupportiveLetter = resolveOptionalSupportiveLetter;
    api.getDirectionalPrefixesSource = getDirectionalPrefixesSource;
    api.isDirectionalPrefixToken = isDirectionalPrefixToken;
    api.getBracketDirectionalPrefixToken = getBracketDirectionalPrefixToken;
    return api;
}

export function installParsingGlobals(targetObject = globalThis) {
    const api = createParsingModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
