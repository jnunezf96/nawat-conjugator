// Native wrapper generated from src/core/nnc/compound/compound.js.

export function createNncCompoundApi(targetObject = globalThis) {
    const COMPOUND_NNC_BOUNDARY_VERSION = 1;
    const COMPOUND_NNC_KIND = Object.freeze({
      compoundNounstem: "compound-nounstem",
      affectiveNnc: "affective-nnc",
      lexicalEmbed: "lexical-embed",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      unknown: "unknown"
    });
    const COMPOUND_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      vncCompoundAst: "vnc-compound-ast",
      outerLexicalEmbed: "outer-lexical-embed",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      openStem: "open-stem",
      parserPunctuation: "parser-punctuation",
      generatedVncSurface: "generated-vnc-surface",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPOUND_NNC_ANTI_CONFLATION_RULES = Object.freeze(["VNC compoundAst metadata is not compound NNC generation", "outer lexical embeds are not compound nounstem fixture evidence", "ordinary NNC fixtures are not affective NNC fixtures", "open-stem ordinary NNC previews are not compound NNC evidence", "parser punctuation is not a compound NNC schema", "Andrews compound/affective categories are architecture, not Nawat/Pipil form authority"]);
    const COMPOUND_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "headStem",
      asks: "Which nounstem is the head or matrix of the compound NNC candidate?"
    }), Object.freeze({
      field: "embeddedStem",
      asks: "Which nounstem, VNC, or lexical element is embedded?"
    }), Object.freeze({
      field: "compoundKind",
      asks: "Is the candidate a compound nounstem, affective NNC, lexical embed, ordinary fixture, or unknown?"
    }), Object.freeze({
      field: "affectiveValue",
      asks: "If affective, what affective value is evidenced by Nawat/Pipil data?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided evidence supports the compound/affective status?"
    })]);
    const LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS = Object.freeze(["src/tests/nnc_compound.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON31_COMPOUND_NOUNSTEM_PDF_REFS = Object.freeze(["Andrews Lesson 31.1", "Andrews Lesson 31.2", "Andrews Lesson 31.3", "Andrews Lesson 31.4", "Andrews Lesson 31.5", "Andrews Lesson 31.6", "Andrews Lesson 31.7", "Andrews Lesson 31.8", "Andrews Lesson 31.9", "Andrews Lesson 31.10", "Andrews Lesson 31.11", "Andrews Lesson 31.12", "Andrews Lesson 31.13"]);
    const LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-type-frame",
      sourceSection: "Andrews 31.1",
      sourceFormula: "NNC + NNC = compound NNC",
      structureTypes: Object.freeze(["linked-connective-t", "linked-connectiveless", "integrated"]),
      embedBeforeMatrix: true,
      matrixGovernsCompoundNounstemClass: true,
      embedUsuallyGeneralUseStem: true,
      subclass2BFinalARetentionMatchesNominalEmbedVerbstems: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-meaning-frame",
      sourceSection: "Andrews 31.2",
      embedSources: Object.freeze(["supplement", "modifier"]),
      embedFunction: "modifier of the matrix within the compound stem",
      possibleMeaningRoles: Object.freeze(["source", "material", "purpose", "form", "appearance", "manner", "pertinence", "possession", "association", "production", "carrier", "sex", "instrument", "means", "character"])
    });
    const LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-possessor-frame",
      sourceSection: "Andrews 31.3",
      linkedStructureAlwaysEmbedOriented: true,
      integratedStructureUsuallyMatrixOriented: true,
      integratedStructureMayBeEmbedOriented: true,
      matrixOrientedRule: "possessor pronoun is normally oriented toward the governing matrix and compound as a whole",
      embedOrientedRule: "possessive-state predicate of an adjoined clause can become the embed and keep possessor orientation toward the embed",
      orientationCanBeSemanticallyUnimportant: true,
      linkedStructureRequiresOrientationTracking: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-matrix-frame",
      sourceSection: "Andrews 31.4",
      matrixDeterminesCompoundKind: true,
      translationMustNotReverseEmbedAndMatrix: true,
      dictionaryConcatenationIsInsufficient: true,
      nahuatlClassificationMayDifferFromTranslationLanguage: true,
      matrixEmbedIndifferenceIsRareAndStillNotProofOfNoStructure: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-example-frame",
      sourceSection: "Andrews 31.5",
      embedClassesCovered: Object.freeze(["tli-in-zero-stem", "ti-subclass-1-stem", "ti-subclass-2-stem"]),
      matrixSubpositionUsuallyDoesNotCauseClassProblems: true,
      subclass2BEphemeralAUsuallyRetainedButMayBeIrregularlyLost: true,
      tiLongVowelMayBecomeShortVowelPlusGlottalStop: true,
      negativeAhMayServeAsAdverbialEmbed: true,
      unexpectedVariantStemsOccur: true,
      glottalFinalBeforeVowelMaySurfaceAsY: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-unique-frame",
      sourceSection: "Andrews 31.6",
      uniqueStemMayFillEmbedOrMatrix: true,
      comparesToLesson30UniqueNominalEmbeds: true,
      prolificMatrixStems: Object.freeze([Object.freeze({
        stem: "ca",
        glossRole: "entity associated with, characterized by, or made of the embed",
        usualClasses: Object.freeze(["ti-subclass-1A", "ti-subclass-2C"]),
        excludesKaFinalSubclass2BNounstems: true
      }), Object.freeze({
        stem: "yo",
        glossRole: "thing/state/condition/quality pertaining to or characteristic of the embed",
        sourceLesson: "Andrews 39.3",
        possessiveStateTlaEmbedPatternAttested: true,
        specialUsageRefs: Object.freeze(["Andrews 47.9", "Andrews 48.12", "Andrews 39.3"])
      })]),
      simpleStemAttestationNotRequiredForUniqueCompoundFiller: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-conjunctive-frame",
      sourceSection: "Andrews 31.7",
      structure: "conjunct + conjunct",
      notAdjunctionEmbedMatrix: true,
      firstConjunctRetainsVestigeOfSourceNum1TlOrTli: true,
      possessiveStateMayBreakIntoSeparateConjoinedNncs: true,
      relatedLessonRefs: Object.freeze(["Andrews Lesson 52.6"])
    });
    const LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-recursive-frame",
      sourceSection: "Andrews 31.8",
      recursiveCompounding: true,
      compoundStemCanFillEmbed: true,
      compoundStemCanFillMatrix: true,
      compoundStemsCanFillBothSubpositions: true,
      ambiguousSegmentationRequiresSourceAnalysis: true
    });
    const LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-special-function-frame",
      sourceSections: Object.freeze(["Andrews 31.9", "Andrews 31.10", "Andrews 31.11"]),
      functions: Object.freeze([Object.freeze({
        id: "sex-distinction",
        matrixRequirement: "animate entity matrix",
        embedOptions: Object.freeze(["oquich", "cihua"])
      }), Object.freeze({
        id: "progeny",
        matrixOptions: Object.freeze(["cone", "pilton"]),
        embedRequirement: "animal nounstem or animal-like compound source",
        humanConeRestriction: "cone specifies child of a woman"
      }), Object.freeze({
        id: "fellowship",
        matrix: "poh",
        state: "possessive-state compound-stemmed NNC"
      })])
    });
    const LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME = Object.freeze({
      kind: "lesson-31-compound-nounstem-plural-stem-frame",
      sourceSections: Object.freeze(["Andrews 31.12", "Andrews 31.13"]),
      affinity: Object.freeze({
        usedWithPluralSubjectInAbsolutiveState: true,
        reduplicationMayTargetEmbed: true,
        reduplicationMayTargetMatrix: true,
        reduplicationMayTargetBoth: true,
        possessiveStateMatrixMayReduplicate: true
      }),
      distributiveVarietal: Object.freeze({
        notions: Object.freeze(["distribution", "variety"]),
        reduplicationTargetsEmbed: true,
        contrastWithAffinityMatrixReduplicationMustBePreserved: true
      })
    });
    const LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson31-types",
      andrewsSection: "31.1",
      category: "compound-nounstem-types",
      directiveEs: "La CNN compuesta procede de NNC+NNC=NNC; el incrustado precede a la matriz y la matriz gobierna la clase nominal.",
      engineSurface: "diagnostic compound-nounstem type frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson31-embed-meaning",
      andrewsSection: "31.2",
      category: "embed-meaning-role",
      directiveEs: "El incrustado viene de suplemento o modificador y funciona como modificador interno de la matriz.",
      engineSurface: "diagnostic meaning-role frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson31-possessor-orientation",
      andrewsSection: "31.3",
      category: "possessor-orientation",
      directiveEs: "La orientacion posesiva debe distinguir matriz, incrustado, estructura ligada e integrada.",
      engineSurface: "diagnostic possessor-orientation frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson31-matrix-importance",
      andrewsSection: "31.4",
      category: "matrix-governance",
      directiveEs: "La matriz determina el tipo de compuesto; la traduccion no debe invertir ni borrar la estructura.",
      engineSurface: "diagnostic matrix-governance frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson31-examples",
      andrewsSection: "31.5",
      category: "embed-class-examples",
      directiveEs: "Los ejemplos separan incrustados tli/in/cero, ti subclase 1 y ti subclase 2, con irregularidades ortograficas.",
      engineSurface: "diagnostic example-class frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson31-unique-fillers",
      andrewsSection: "31.6",
      category: "unique-compound-fillers",
      directiveEs: "Algunos troncos solo aparecen como fillers de incrustado o matriz; ca y yo son matrices prolificas especiales.",
      engineSurface: "diagnostic unique-filler frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson31-conjunctive-compounds",
      andrewsSection: "31.7",
      category: "conjunctive-compound",
      directiveEs: "Algunos compuestos son conjuncion, no adjuncion; el primer conjuncto conserva vestigio de tl/tli.",
      engineSurface: "diagnostic conjunctive frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson31-recursive-fillers",
      andrewsSection: "31.8",
      category: "recursive-compound-fillers",
      directiveEs: "La composicion es recursiva: incrustado, matriz o ambos pueden ser compuestos.",
      engineSurface: "diagnostic recursive frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson31-sex-distinction",
      andrewsSection: "31.9",
      category: "sex-distinction-compound",
      directiveEs: "Un nombre animado puede incorporar oquich o cihua para distinguir sexo.",
      engineSurface: "diagnostic special-function frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson31-progeny",
      andrewsSection: "31.10",
      category: "progeny-compound",
      directiveEs: "Cone o pilton como matriz pueden marcar progenie animal; cone humano tiene restriccion propia.",
      engineSurface: "diagnostic special-function frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson31-fellowship",
      andrewsSection: "31.11",
      category: "fellowship-compound",
      directiveEs: "Poh puede servir como matriz en CNN posesivas de compania, igualdad o parentesco.",
      engineSurface: "diagnostic special-function frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson31-affinity",
      andrewsSection: "31.12",
      category: "compound-affinity-stem",
      directiveEs: "La afinidad con sujeto plural puede reduplicar incrustado, matriz o ambos.",
      engineSurface: "diagnostic plural-stem frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson31-distributive-varietal",
      andrewsSection: "31.13",
      category: "compound-distributive-varietal-stem",
      directiveEs: "La distribucion y variedad se expresan en el incrustado y deben distinguirse de afinidad.",
      engineSurface: "diagnostic plural-stem frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    })]);
    const LESSON32_AFFECTIVE_NNC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_compound.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON32_AFFECTIVE_NNC_PDF_REFS = Object.freeze(["Andrews Lesson 32.1", "Andrews Lesson 32.2", "Andrews Lesson 32.3", "Andrews Lesson 32.4", "Andrews Lesson 32.5", "Andrews Lesson 32.6", "Andrews Lesson 32.7", "Andrews Lesson 32.8"]);
    const LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-32-affective-nnc-overview-frame",
      sourceSection: "Andrews 32.1",
      attitudeSites: Object.freeze(["nounstem", "subject-pronoun"]),
      nounstemMethod: "compound affective nounstem",
      subjectPronounMethod: "flawed-subject NNC",
      affectiveMatrixFillsMatrixSubposition: true,
      affectiveMatrixNotSimpleStemmedInCurrentUse: true,
      matrixGroupsByCompoundClassRelationToEmbedClass: true
    });
    const LESSON32_AFFECTIVE_ZERO_CLASS_FRAME = Object.freeze({
      kind: "lesson-32-affective-zero-class-frame",
      sourceSection: "Andrews 32.2",
      matrixStems: Object.freeze([Object.freeze({
        stem: "pil",
        classResult: "zero",
        value: "smallness with affection"
      }), Object.freeze({
        stem: "pol",
        classResult: "zero",
        value: "largeness with disparagement or contempt"
      })]),
      resultClassIndependentOfEmbedClass: true,
      lexicalizedSpecialMeaningMayShiftToTiClass: true
    });
    const LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME = Object.freeze({
      kind: "lesson-32-affective-class-dependent-frame",
      sourceSection: "Andrews 32.3",
      matrixStems: Object.freeze([Object.freeze({
        stem: "tzin",
        valueRange: Object.freeze(["deference", "esteem", "honorific", "compassion", "affection", "cherished-smallness"]),
        abbreviatedVocativeStem: "tz",
        abbreviatedVocativeLessFormal: true,
        mayDelimitMasslikeEntity: true
      }), Object.freeze({
        stem: "ton",
        valueRange: Object.freeze(["smallness-without-admiration-or-affection"]),
        largerCompoundAffectiveMatrixPossible: true
      })]),
      zeroEmbedYieldsZeroClassCompound: true,
      nonZeroEmbedYieldsTliClassCompound: true,
      irregularFormationsMustStayEvidenced: true
    });
    const LESSON32_AFFECTIVE_ZOL_FRAME = Object.freeze({
      kind: "lesson-32-affective-zol-frame",
      sourceSection: "Andrews 32.4",
      matrixStem: "zol",
      value: "old worn-out thing",
      resultClassIndependentOfEmbedClass: "tli",
      embedRestriction: "nonanimate nounstems only",
      canServeAsEmbedInLargerCompoundStem: true,
      freelyPermitsCompoundAffectiveEmbed: true,
      denominalVerbstemSource: Object.freeze(["zol-i-hui", "zol-o-a"]),
      tzinAndPolDenominalSourcesRestrictedToHonorificPejorativeVncMatrices: true
    });
    const LESSON32_AFFECTIVE_AFFINITY_FRAME = Object.freeze({
      kind: "lesson-32-affective-affinity-frame",
      sourceSection: "Andrews 32.5",
      pluralSubjectShape: "reduplicated prefix on affective matrix stem",
      reduplicatedVowelLength: "short",
      contrastsWithLesson31AffinityLongVowel: true,
      absolutivePluralDyadRule: Object.freeze({
        sounded: "t-in when corresponding singular absolutive num1 is sounded",
        silent: "zero-zero when corresponding singular absolutive num1 is silent"
      }),
      possessivePluralDyadRule: Object.freeze({
        options: Object.freeze(["hu-an", "zero-zero"]),
        huAnMoreFrequent: true,
        historicalGrammariansDisagreeOnPilPolHuan: true
      }),
      demonstrativeHonorificsUseAffinityShape: true,
      embedAndMatrixCanBothShowAffinityShape: true,
      doubleAffinityMayBeOptionalOrObligatory: true
    });
    const LESSON32_PIL_NOUNSTEM_FRAME = Object.freeze({
      kind: "lesson-32-pil-nounstem-frame",
      sourceSection: "Andrews 32.6",
      baseMeaning: "pendant dependent thing or appendage",
      extendedValues: Object.freeze(["child", "noble"]),
      childFrame: Object.freeze({
        simpleStemPrimarilyPossessivePlural: true,
        uniqueWholePossessiveNncEmbeddedInTzitzinMatrix: true,
        distributiveVarietalOfIrregularAffectivePossible: true,
        absolutivePluralAffinityAmbiguousWithNoble: true,
        genderSpecificCompoundsAvailable: true,
        affectiveMatrixChildForms: Object.freeze(["pil-tzin", "pil-ton", "pil-pil", "pil-pol"]),
        abbreviatedVocativePiltzChangesMeaning: true
      }),
      nobleFrame: Object.freeze({
        simpleStemUsedInAbsolutiveSingularOrPlural: true,
        cihuaCompoundCustomaryForWoman: true,
        possessiveStateEmbedsPilInYoMatrix: true,
        piltzintzinVocativeHonorificIsSingularNotAffinity: true,
        childNobleAmbiguityMustBePreserved: true
      })
    });
    const LESSON32_NONANIMATE_AFFECTIVE_FRAME = Object.freeze({
      kind: "lesson-32-nonanimate-affective-frame",
      sourceSection: "Andrews 32.7",
      pdfOcrHeadingNote: "The re-OCR text labels this post-32.6 heading as 32.1; sequence and contents identify it as 32.7.",
      nonanimateAffectiveAffinityCanUsePluralThirdPersonTin: true,
      pluralSupplementCanCrossReferenceCommonNumberHead: true,
      numberAgreementDiscrepancyMustBeTracked: true,
      commonNumberFillersMoreFrequent: true,
      nonanimateReduplicativePrefixAmbiguousBetweenAffinityAndDistributiveVarietal: true
    });
    const LESSON32_FLAWED_SUBJECT_FRAME = Object.freeze({
      kind: "lesson-32-flawed-subject-frame",
      sourceSection: "Andrews 32.8",
      procedure: "replace sounded num1 ti/tli/in with irregular silent variant",
      affectiveValue: Object.freeze(["ridicule", "disparagement", "scorn"]),
      restrictedToAbsolutiveStateSingularCommonSubject: true,
      defectStemWithTzinOrTonAlwaysHasFlawedSubjectPronoun: true,
      defectiveEntityStemMayAlsoNameDefectOrDefectSource: true,
      someStemsOnlyUsedAsFlawedSubjectAndBestAssignedZeroClass: true,
      sameSilentNum1AlsoOccursInUnrelatedAdverbializationAndPersonalNames: true,
      chickenFlawedSubjectFormationIsSpecialCase: true
    });
    const LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson32-affective-overview",
      andrewsSection: "32.1",
      category: "affective-nnc-overview",
      directiveEs: "La actitud valorativa o despectiva puede estar en el tronco nominal o en el sujeto defectivo.",
      engineSurface: "diagnostic affective overview frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson32-pil-pol",
      andrewsSection: "32.2",
      category: "zero-class-affective-matrix",
      directiveEs: "Pil y pol forman matrices afectivas de clase cero, salvo lexicalizacion especial.",
      engineSurface: "diagnostic zero-class affective frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson32-tzin-ton",
      andrewsSection: "32.3",
      category: "class-dependent-affective-matrix",
      directiveEs: "Tzin y ton dejan que la clase del incrustado determine cero o tli, con usos vocativos e irregulares.",
      engineSurface: "diagnostic class-dependent affective frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson32-zol",
      andrewsSection: "32.4",
      category: "tli-class-affective-matrix",
      directiveEs: "Zol forma tli con incrustados no animados y puede alimentar compuestos o rutas denominales.",
      engineSurface: "diagnostic zol frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson32-affinity-shape",
      andrewsSection: "32.5",
      category: "affective-affinity-shape",
      directiveEs: "La afinidad afectiva reduplica la matriz afectiva con vocal breve y reglas distintas para absolutivo y posesivo.",
      engineSurface: "diagnostic affective affinity frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson32-pil",
      andrewsSection: "32.6",
      category: "pil-child-noble",
      directiveEs: "Pil distingue valores de hijo y nobleza, con ambiguedades, vocativos y formaciones unicas.",
      engineSurface: "diagnostic pil nounstem frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson32-nonanimate-affinity",
      andrewsSection: "32.7",
      category: "nonanimate-affective-affinity",
      directiveEs: "Afectivos no animados pueden mostrar plural, numero comun y ambiguedad afinidad/distributivo.",
      engineSurface: "diagnostic nonanimate affective frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson32-flawed-subject",
      andrewsSection: "32.8",
      category: "flawed-subject-nnc",
      directiveEs: "El sujeto defectivo silencia num1 para marcar burla, desprecio o escarnio en absolutivo singular/comun.",
      engineSurface: "diagnostic flawed-subject frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    })]);
    function cloneCompoundNncLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneCompoundNncLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneCompoundNncLessonRecord(value)]));
    }
    function getLesson31CompoundNounstemSubsectionInventory() {
      return LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS)
      }));
    }
    function getLesson32AffectiveNncSubsectionInventory() {
      return LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS)
      }));
    }
    function buildLesson31CompoundNounstemPursuitFrame() {
      const subsectionInventory = getLesson31CompoundNounstemSubsectionInventory();
      const typeFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME);
      const meaningFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME);
      const possessorFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME);
      const matrixFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME);
      const exampleFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME);
      const uniqueFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME);
      const conjunctiveFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME);
      const recursiveFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME);
      const specialFunctionFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME);
      const pluralStemFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME);
      const remainingGaps = ["Current compound/affective NNC metadata is not a compound nounstem generator.", "NNC-specific AST parsing for matrix/embed orientation, linked versus integrated structure, conjunctive structure, and recursive segmentation remains partial.", "Possessor orientation, embed class behavior, unique fillers, special ca/yo matrices, sex/progeny/fellowship patterns, affinity stems, and distributive/varietal stems need explicit engine gates.", "Confirmed Nawat/Pipil compound nounstem examples and orthographic exceptions remain evidence-needed."];
      const frame = {
        kind: "lesson-31-compound-nounstem-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 31,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
        plannedArrows: [{
          id: "lesson-31-compound-nounstem-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 31.1-31.13 against current compound/affective NNC boundary metadata, NNC+NNC formula control, matrix/embed order, possessor orientation, unique fillers, conjunctive and recursive compounds, sex/progeny/fellowship formations, affinity stems, and distributive/varietal stems.",
          andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-31-compound-nounstem-audit",
          result: "hit",
          correction: "Lesson 31 now records Andrews compound nounstem architecture, matrix/embed governance, possessor orientation, embed class behavior, unique fillers, conjunctive and recursive structures, special semantic formations, affinity stems, and distributive/varietal stems while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
          feedbackRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS)
        }],
        subsectionInventory,
        typeFrame,
        meaningFrame,
        possessorFrame,
        matrixFrame,
        exampleFrame,
        uniqueFrame,
        conjunctiveFrame,
        recursiveFrame,
        specialFunctionFrame,
        pluralStemFrame,
        currentEngineBoundary: {
          compoundNncBoundaryMetadataImplemented: true,
          vncCompoundAstKeptSeparate: true,
          ordinaryNncFixtureGenerationPreserved: true,
          compoundNounstemGenerationImplemented: false,
          compoundNounstemAstImplemented: false,
          possessorOrientationGenerationImplemented: false,
          conjunctiveCompoundGenerationImplemented: false,
          recursiveCompoundGenerationImplemented: false,
          affinityDistributiveGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachCompoundNncGrammarContract(frame, {
        unitKind: "compound-nounstem-boundary",
        routeStage: "audit-lesson-31",
        structuralSource: "Andrews Lesson 31",
        andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 31.1-31.13",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          orthographyStatus: "nawat-evidence-required"
        },
        morphBoundaryFrame: {
          typeFrame,
          meaningFrame,
          possessorFrame,
          matrixFrame,
          exampleFrame,
          uniqueFrame,
          conjunctiveFrame,
          recursiveFrame,
          specialFunctionFrame,
          pluralStemFrame
        },
        stemFrame: {
          stemKind: "compound-nounstem",
          sourceFormula: typeFrame.sourceFormula,
          embedBeforeMatrix: typeFrame.embedBeforeMatrix,
          matrixGovernsCompoundNounstemClass: typeFrame.matrixGovernsCompoundNounstemClass,
          structureTypes: typeFrame.structureTypes,
          recursiveCompounding: recursiveFrame.recursiveCompounding
        },
        nuclearClauseFrame: {
          unitKind: "NNC",
          sourceFormula: typeFrame.sourceFormula,
          resultClauseKind: "compound NNC",
          compoundKinds: ["linked", "integrated", "conjunctive"]
        },
        targetContract: {
          metadataKind: "lesson-31-compound-nounstem-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["compound-nounstem-diagnostic-only", "compound-nounstem-needs-nawat-evidence"]
      });
    }
    function buildLesson32AffectiveNncPursuitFrame() {
      const subsectionInventory = getLesson32AffectiveNncSubsectionInventory();
      const overviewFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME);
      const zeroClassFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_ZERO_CLASS_FRAME);
      const classDependentFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME);
      const zolFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_ZOL_FRAME);
      const affinityFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_AFFINITY_FRAME);
      const pilFrame = cloneCompoundNncLessonRecord(LESSON32_PIL_NOUNSTEM_FRAME);
      const nonanimateFrame = cloneCompoundNncLessonRecord(LESSON32_NONANIMATE_AFFECTIVE_FRAME);
      const flawedSubjectFrame = cloneCompoundNncLessonRecord(LESSON32_FLAWED_SUBJECT_FRAME);
      const remainingGaps = ["Current compound/affective NNC metadata is not an affective NNC generator.", "Affective matrix class routing for pil/pol/tzin/ton/zol and lexicalized class shifts need confirmed Nawat/Pipil evidence.", "Affinity-shaped affective stems, pil child/noble ambiguity, nonanimate number behavior, and flawed-subject num1 silencing need explicit route gates.", "Confirmed Nawat/Pipil affective examples, flawed-subject examples, and orthographic exceptions remain evidence-needed."];
      const frame = {
        kind: "lesson-32-affective-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 32,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
        plannedArrows: [{
          id: "lesson-32-affective-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 32.1-32.8 against current compound/affective NNC boundary metadata, affective-matrix nounstem classes, affinity-shaped affectives, pil child/noble ambiguity, nonanimate affective number behavior, and flawed-subject NNCs.",
          andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-32-affective-nnc-audit",
          result: "hit",
          correction: "Lesson 32 now records Andrews affective NNC architecture, affective-matrix class behavior, affinity-shaped affective stems, pil child/noble ambiguity, nonanimate number behavior, and flawed-subject NNCs while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
          feedbackRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        zeroClassFrame,
        classDependentFrame,
        zolFrame,
        affinityFrame,
        pilFrame,
        nonanimateFrame,
        flawedSubjectFrame,
        currentEngineBoundary: {
          compoundNncAffectiveBoundaryMetadataImplemented: true,
          ordinaryNncFixtureGenerationPreserved: true,
          affectiveNncGenerationImplemented: false,
          staticAffectiveDataImplemented: false,
          affectiveMatrixClassRoutingImplemented: false,
          affectiveAffinityGenerationImplemented: false,
          flawedSubjectGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachCompoundNncGrammarContract(frame, {
        unitKind: "affective-nnc-boundary",
        routeStage: "audit-lesson-32",
        structuralSource: "Andrews Lesson 32",
        andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 32.1-32.8",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          orthographyStatus: "nawat-evidence-required"
        },
        morphBoundaryFrame: {
          overviewFrame,
          zeroClassFrame,
          classDependentFrame,
          zolFrame,
          affinityFrame,
          pilFrame,
          nonanimateFrame,
          flawedSubjectFrame
        },
        stemFrame: {
          stemKind: "compound-affective-nounstem",
          affectiveMatrixFillsMatrixSubposition: overviewFrame.affectiveMatrixFillsMatrixSubposition,
          zeroClassMatrices: zeroClassFrame.matrixStems.map(entry => entry.stem),
          classDependentMatrices: classDependentFrame.matrixStems.map(entry => entry.stem),
          tliClassMatrix: zolFrame.matrixStem
        },
        nuclearClauseFrame: {
          unitKind: "NNC",
          affectiveSites: overviewFrame.attitudeSites,
          flawedSubjectRestrictedToAbsolutiveSingularCommon: flawedSubjectFrame.restrictedToAbsolutiveStateSingularCommonSubject
        },
        targetContract: {
          metadataKind: "lesson-32-affective-nnc-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["affective-nnc-diagnostic-only", "affective-nnc-needs-nawat-evidence"]
      });
    }
    function normalizeCompoundNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeCompoundNncKind(value = "") {
      return normalizeCompoundNncEnum(value, Object.values(COMPOUND_NNC_KIND), COMPOUND_NNC_KIND.unknown);
    }
    function normalizeCompoundNncFalsePositiveSource(value = "") {
      return normalizeCompoundNncEnum(value, Object.values(COMPOUND_NNC_FALSE_POSITIVE_SOURCE), COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getCompoundNncAntiConflationRules() {
      return Array.from(COMPOUND_NNC_ANTI_CONFLATION_RULES);
    }
    function getCompoundNncStructuralQuestions() {
      return COMPOUND_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachCompoundNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "compound-nnc",
        routeFamily: "compound-nnc",
        ...options
      });
    }
    function buildCompoundNncAffectiveBoundaryMetadata() {
      const boundary = {
        kind: "compound-nnc-affective-boundary",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        lessons: [31, 32],
        status: "partial",
        structuralSource: "Andrews Lessons 31-32",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCompoundNncStructuralQuestions(),
        boundaries: {
          hasVncCompoundParserMetadata: true,
          hasCompoundNncGeneration: false,
          hasAffectiveNncGeneration: false,
          hasStaticAffectiveData: false,
          treatsVncCompoundAstAsNncEvidence: false,
          changesOrdinaryNncGeneration: false,
          changesVncGeneration: false
        },
        antiConflationRules: getCompoundNncAntiConflationRules()
      };
      return attachCompoundNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyCompoundNncAffectiveCandidate({
      candidate = "",
      headStem = "",
      embeddedStem = "",
      compoundKind = "",
      affectiveValue = "",
      evidenceSource = "",
      falsePositiveSource = "",
      hasCompoundAst = false,
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizeCompoundNncKind(compoundKind);
      const normalizedFalsePositive = normalizeCompoundNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "compound-nnc-affective-candidate-classification",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        headStem: String(headStem || ""),
        embeddedStem: String(embeddedStem || ""),
        compoundKind: normalizedKind,
        affectiveValue: String(affectiveValue || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasCompoundAst: hasCompoundAst === true,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "compound-nnc-needs-validation" : "compound-nnc-needs-nawat-evidence", hasCompoundAst ? "vnc-compound-ast-not-nnc-evidence" : "compound-nnc-no-compound-ast", normalizedFalsePositive !== COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown ? "compound-nnc-false-positive-source" : "compound-nnc-unconfirmed"],
        boundary: buildCompoundNncAffectiveBoundaryMetadata()
      };
      return attachCompoundNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.headStem,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "compound-nounstem-candidate",
          matrix: classification.headStem,
          embed: classification.embeddedStem
        }
      });
    }
    function classifyCompoundNncAffectiveFalsePositive(source = "") {
      const normalizedSource = normalizeCompoundNncFalsePositiveSource(source);
      const classification = {
        kind: "compound-nnc-affective-false-positive",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isCompoundNncEvidence: false,
        isAffectiveNncEvidence: false,
        generationAllowed: false,
        diagnostics: ["compound-nnc-false-positive-source"],
        antiConflationRules: getCompoundNncAntiConflationRules()
      };
      return attachCompoundNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "COMPOUND_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_KIND; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPOUND_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPOUND_NNC_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME; },
    });
    Object.defineProperty(api, "LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_NNC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_NNC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_NNC_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_NNC_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_ZERO_CLASS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_ZERO_CLASS_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_ZOL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_ZOL_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_AFFINITY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_AFFINITY_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_PIL_NOUNSTEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_PIL_NOUNSTEM_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_NONANIMATE_AFFECTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_NONANIMATE_AFFECTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_FLAWED_SUBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_FLAWED_SUBJECT_FRAME; },
    });
    Object.defineProperty(api, "LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY; },
    });
    api.cloneCompoundNncLessonRecord = cloneCompoundNncLessonRecord;
    api.getLesson31CompoundNounstemSubsectionInventory = getLesson31CompoundNounstemSubsectionInventory;
    api.getLesson32AffectiveNncSubsectionInventory = getLesson32AffectiveNncSubsectionInventory;
    api.buildLesson31CompoundNounstemPursuitFrame = buildLesson31CompoundNounstemPursuitFrame;
    api.buildLesson32AffectiveNncPursuitFrame = buildLesson32AffectiveNncPursuitFrame;
    api.normalizeCompoundNncEnum = normalizeCompoundNncEnum;
    api.normalizeCompoundNncKind = normalizeCompoundNncKind;
    api.normalizeCompoundNncFalsePositiveSource = normalizeCompoundNncFalsePositiveSource;
    api.getCompoundNncAntiConflationRules = getCompoundNncAntiConflationRules;
    api.getCompoundNncStructuralQuestions = getCompoundNncStructuralQuestions;
    api.attachCompoundNncGrammarContract = attachCompoundNncGrammarContract;
    api.buildCompoundNncAffectiveBoundaryMetadata = buildCompoundNncAffectiveBoundaryMetadata;
    api.classifyCompoundNncAffectiveCandidate = classifyCompoundNncAffectiveCandidate;
    api.classifyCompoundNncAffectiveFalsePositive = classifyCompoundNncAffectiveFalsePositive;
    return api;
}

export function installNncCompoundGlobals(targetObject = globalThis) {
    const api = createNncCompoundApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
