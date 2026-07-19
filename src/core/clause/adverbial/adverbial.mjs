// Canonical modern ESM module.

export function createAdverbialNuclearApi(targetObject = globalThis) {
    const ADVERBIAL_NUCLEAR_BOUNDARY_VERSION = 1;
    const ADVERBIAL_NUCLEAR_KIND = Object.freeze({
      vncAdverbial: "vnc-adverbial",
      nncAdverbial: "nnc-adverbial",
      particleLookingNnc: "particle-looking-nnc",
      possessiveStateNnc: "possessive-state-nnc",
      mannerSurface: "manner-surface",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_DEGREE = Object.freeze({
      firstDegree: "first-degree",
      secondDegree: "second-degree",
      lexicalized: "lexicalized",
      configured: "configured-adverbio",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_DOMAIN = Object.freeze({
      manner: "manner",
      place: "place",
      direction: "direction",
      time: "time",
      duration: "duration",
      degree: "degree",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND = Object.freeze({
      vnc: "vnc",
      nncAbsolutive: "nnc-absolutive",
      nncPossessive: "nnc-possessive",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE = Object.freeze({
      configuredAdverbioSurface: "configured-adverbio-surface",
      adverbTranslation: "adverb-translation",
      particleLabel: "particle-label",
      ordinaryNncOutput: "ordinary-nnc-output",
      ordinaryVncOutput: "ordinary-vnc-output",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES = Object.freeze(["adverbial nuclear-clause boundary metadata is not generation", "adverbialNuclearClauseFrame describes existing generated output; it does not create new Nawat word forms", "configured adverbio word output is not a full Lesson 44 engine", "adverb translations are not orthography-bridge adverbial-clause evidence", "particle-looking labels are not particle or adverbial NNC fixture evidence", "ordinary NNC/VNC outputs are not clause-level adverbialization evidence", "Andrews adverbial categories are architecture, not Nawat/Pipil orthography authority"]);
    const ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "source",
      asks: "Which Andrews VNC, NNC, particle-looking form, or clause licenses the source?"
    }), Object.freeze({
      field: "adverbialKind",
      asks: "Is the candidate VNC-adverbial, NNC-adverbial, particle-looking NNC, possessive-state NNC, manner surface, or unknown?"
    }), Object.freeze({
      field: "adverbialDegree",
      asks: "Which Andrews status supports first-degree, second-degree, lexicalized, or other adverbialization?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured route licenses adverbial status?"
    })]);
    function normalizeAdverbialNuclearEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeAdverbialNuclearKind(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_KIND), ADVERBIAL_NUCLEAR_KIND.unknown);
    }
    function normalizeAdverbialNuclearDegree(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_DEGREE), ADVERBIAL_NUCLEAR_DEGREE.unknown);
    }
    function normalizeAdverbialNuclearDomain(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_DOMAIN), ADVERBIAL_NUCLEAR_DOMAIN.unknown);
    }
    function normalizeAdverbialNuclearSourceClauseKind(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND), ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.unknown);
    }
    function normalizeAdverbialNuclearFalsePositiveSource(value = "") {
      return normalizeAdverbialNuclearEnum(value, Object.values(ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE), ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizeAdverbialNuclearCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews adverbial nuclear candidate formula",
        slot: "adverbial-nuclear"
      }) : {
        output: source,
        diagnostics: []
      };
      return String(conversion?.output || source || "").trim();
    }
    function hasAdverbialNuclearAndrewsSourceGate({
      sourceGate = "",
      structuredSource = false
    } = {}) {
      return structuredSource === true || Boolean(String(sourceGate || "").trim());
    }
    function getKnownConfiguredAdverbioTensesForAdverbialBoundary() {
      return ["pasado-remoto-adverbio-activo"];
    }
    function getAdverbialNuclearAntiConflationRules() {
      return Array.from(ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES);
    }
    function getAdverbialNuclearStructuralQuestions() {
      return ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachAdverbialNuclearGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adverbial-nuclear-clause",
        routeFamily: "adverbial-nuclear",
        ...options
      });
    }
    const LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS = Object.freeze(["src/tests/adverbial.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS = Object.freeze(["Andrews Lesson 44.1", "Andrews Lesson 44.2", "Andrews Lesson 44.3", "Andrews Lesson 44.4", "Andrews Lesson 44.5", "Andrews Lesson 44.6", "Andrews Lesson 44.7", "Andrews Lesson 44.8", "Andrews Lesson 44.9"]);
    const LESSON44_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-44-adverbial-nuclear-overview-frame",
      sourceSection: "Andrews 44.1",
      adverbialParticlesBelongToLesson3: true,
      adverbialModifiersAreNuclearClausesOrAdjoinedUnits: true,
      adjoinedConcatenateUnitsDeferredToLessons49_50: true,
      transformationAssignsAdverbializedSubjectPronoun: true,
      adverbialPotentialConstrainedByPredicateMeaning: true,
      semanticDomains: Object.freeze(["location", "direction", "time", "duration", "manner", "degree"]),
      englishHasNoDirectEquivalentToAdverbializedSubjectPronoun: true
    });
    const LESSON44_DEGREES_FRAME = Object.freeze({
      kind: "lesson-44-adverbialization-degrees-frame",
      sourceSection: "Andrews 44.2",
      firstDegreeSemanticOnly: true,
      firstDegreeSubjectPronounShapeUnchanged: true,
      secondDegreeReplacesSoundedNum1WithSilent: true,
      vncAllowsOnlyFirstDegree: true,
      possessiveStateNncAllowsOnlyFirstDegree: true,
      absolutiveStateNncIsIdiosyncratic: true,
      firstDegreeMayBeAmbiguousOrLexicalized: true
    });
    const LESSON44_ADVERBIALIZED_VNC_FRAME = Object.freeze({
      kind: "lesson-44-adverbialized-vnc-frame",
      sourceSection: "Andrews 44.3",
      onlySmallNumberOfVncsPermitAdverbialization: true,
      mostAreLexicalizedInAdverbialMeaning: true,
      preteritAgentiveIuhquiAndIzquiAreNotAdverbialHere: true,
      nohmahSynonymousWithParticleOcButRemainsAnalyzedAsVnc: true,
      examples: Object.freeze(["cencah", "hualcah", "cemihcac", "ihui", "iuh", "ihuihuih", "ici", "iz", "nohmah", "yehua", "iyoh", "motquiticah", "mahciticah"])
    });
    const LESSON44_ADVERBIALIZED_NNC_FRAME = Object.freeze({
      kind: "lesson-44-adverbialized-nnc-frame",
      sourceSection: "Andrews 44.4",
      vastMajorityAreNncs: true,
      firstDegreeFrame: Object.freeze({
        sourceSection: "Andrews 44.4.1",
        thirdPersonSingularSubjectPronounAmbiguous: true,
        sameShapeCanBeEquativeOrAdverbial: true,
        possessiveStateNncsCanShareTheAmbiguity: true
      }),
      secondDegreeFrame: Object.freeze({
        sourceSection: "Andrews 44.4.2",
        absolutiveStateOnly: true,
        distinctiveSubjectPronounShapeRemovesAmbiguity: true,
        silentNum1VisibleInFormula: true
      }),
      distributiveVarietalAndAffinityStemsPossibleWhenMeaningPermits: true
    });
    const LESSON44_PARTICLE_LOOKING_NNC_FRAME = Object.freeze({
      kind: "lesson-44-particle-looking-nnc-frame",
      sourceSection: "Andrews 44.5",
      singleSyllabledSecondDegreeCanLookLikeParticle: true,
      particleLookingIsNotParticleFixtureEvidence: true,
      examples: Object.freeze(["nel", "huel", "nen", "mo", "cuel", "mach", "quen"]),
      huelFrame: Object.freeze({
        sourceSection: "Andrews 44.5.2",
        negativeAhhuelPossible: true,
        canMeanAbilityPossibilityOrDegree: true,
        flawedSubjectNegativeHueliSeparated: true
      }),
      moFrame: Object.freeze({
        sourceSection: "Andrews 44.5.4",
        notInherentlyInterrogative: true,
        canParticipateInQuestionsAwayFromInitialPosition: true,
        ahmoAndCamoAreNegativizedNncs: true,
        negativeBeforeVncDeniesActionButNegativeBeforeAdjunctNegatesAdjunct: true,
        subordinateMoMayTakeNegativeMeaning: true
      }),
      machFrame: Object.freeze({
        sourceSection: "Andrews 44.5.6",
        idiomaticUses: true,
        machEhMeansEspecially: true,
        afterInterrogativeCanMeanEver: true,
        homophonousKinshipNounstemNotAdverbializable: true
      }),
      quenFrame: Object.freeze({
        sourceSection: "Andrews 44.5.7",
        fusedAdjunctorInAnalysis: true,
        anotherInMayFollow: true,
        nonInitialPositionLosesInterrogativeForce: true,
        mayLexicalizeWithFollowingVncOrNnc: true
      })
    });
    const LESSON44_OTHER_ABSOLUTIVE_NNC_FRAME = Object.freeze({
      kind: "lesson-44-other-absolutive-nnc-frame",
      sourceSection: "Andrews 44.6",
      secondDegreeEffectOftenObvious: true,
      semanticSubcategories: Object.freeze(["time", "place", "manner"]),
      timeExamples: Object.freeze(["teotlac", "moztla", "huiptla", "yalhua", "ticatla", "tlahcah", "niman", "imman", "quemman", "ihcuac", "yectel", "huehcauh", "ixquichcauh", "achtzan", "achto"]),
      placeExamples: Object.freeze(["necoc", "noncuah", "chico", "pani", "tlani", "ixtlapal", "centlapal", "quexquich", "ixquich"]),
      mannerDegreeExamples: Object.freeze(["cemi", "cen", "cecen", "cehcen", "achi", "tlacuauh", "tlapic", "ilhuiz", "tlalhuiz", "ilihuiz", "tlamach", "quemah"]),
      stressGroupWithYehOrEhPossible: true,
      yequenehAndYecehConstituentsUnknown: true
    });
    const LESSON44_PRETERIT_AGENTIVE_ADVERBIAL_NNC_FRAME = Object.freeze({
      kind: "lesson-44-preterit-agentive-adverbial-nnc-frame",
      sourceSection: "Andrews 44.7",
      generalUsePreteritAgentiveStemIsRichAdverbialSource: true,
      meaningPattern: "in the manner of one who has done or become the source predicate",
      englishOftenUsesAdjectivePlusLy: true,
      sourceUsuallyIntransitive: true,
      obsoleteSourceVerbstemsPossible: true,
      rootPlusYaObsoletePreteritSourcesCanCorrespond: true,
      someRootPlusYaSourcesUseFullStem: true,
      irregularFormsPossible: true,
      transitiveSourceOccasionallyPossible: true,
      reflexiveObjectPronounRare: true,
      shuntlineReflexiveNormallyUsedInGeneralUseStem: true,
      lexicalizedFormsMayUseMainlineReflexive: true,
      comparedMannerIncorporationAlreadyBelongsToLesson35_12: true
    });
    const LESSON44_POSSESSIVE_STATE_ADVERBIAL_NNC_FRAME = Object.freeze({
      kind: "lesson-44-possessive-state-adverbial-nnc-frame",
      sourceSection: "Andrews 44.8",
      possessiveStateCanBeAdverbializedFirstDegree: true,
      majorityDeferredToLessons45_47: true,
      rarePatientiveOrActiveActionExamplesRemainDiagnostic: true,
      iyohcaBuiltFromActiveActionNounstem: true,
      nohmahAndNohmatcaAnalysesAreConjectural: true,
      honorificTzincoCaveatSuggestsLexicalizationOrRelationalProblem: true
    });
    const LESSON44_INCORPORATED_ADVERBIAL_MODIFIER_FRAME = Object.freeze({
      kind: "lesson-44-incorporated-adverbial-modifier-frame",
      sourceSection: "Andrews 44.9",
      absolutiveNncPredicateCanIncorporateIntoCompoundVncEmbed: true,
      subjectPronounDiscardedSoDegreesDisappear: true,
      externalAdverbialNncModifiesWholeVnc: true,
      incorporatedAdverbialModifiesOnlyMatrixVerbstem: true,
      translationMayNotShowDifference: true,
      compoundVerbstemMayBecomeIdiomatic: true,
      paniOrdinarilyLosesFinalIWhenIncorporated: true,
      someAdverbialsOccurOnlyAsCompoundStems: true,
      someAdverbialsOccurInCompoundsOrPossessiveStateNncs: true
    });
    const LESSON44_ADVERBIAL_NUCLEAR_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson44-adverbial-nuclear-overview",
      andrewsSection: "44.1",
      category: "adverbial-nuclear-clause-overview",
      directiveEs: "Los modificadores adverbiales no-particula son CNV/CNN o unidades concatenadas adjuntas; las unidades adjuntas se difieren a 49-50.",
      engineSurface: "diagnostic boundary plus configured adverbio frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-adverbialized-subject-pronoun",
      andrewsSection: "44.1 transformation",
      category: "adverbialized-subject-pronoun",
      directiveEs: "La adverbializacion asigna un pronombre sujeto adverbializado al predicado; el significado del tronco limita el dominio posible.",
      engineSurface: "adverbialized subject pronoun frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-adverbialization-degrees",
      andrewsSection: "44.2",
      category: "adverbialization-degree",
      directiveEs: "El primer grado es semantico; el segundo reemplaza el relleno sonoro de num1 por silencio.",
      engineSurface: "degree constraint frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-first-degree-source-limits",
      andrewsSection: "44.2 VNC/possessive",
      category: "first-degree-source-limits",
      directiveEs: "Las CNV y CNN posesivas permiten solo primer grado; las CNN absolutivas son idiosincraticas.",
      engineSurface: "degree gate in adverbial frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-adverbialized-vncs",
      andrewsSection: "44.3",
      category: "adverbialized-vnc",
      directiveEs: "Solo pocas CNV permiten adverbializacion y la mayoria esta lexicalizada.",
      engineSurface: "diagnostic VNC inventory frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-iuh-izqui-warning",
      andrewsSection: "44.3 iuh/iz note",
      category: "substantival-adjectival-warning",
      directiveEs: "Formas como iuhqui e izqui pueden ser sustantivas o adjetivales, no adverbiales en este punto.",
      engineSurface: "diagnostic false-positive boundary",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-adverbialized-nnc-first-degree",
      andrewsSection: "44.4.1",
      category: "nnc-first-degree-adverbialization",
      directiveEs: "La CNN de primer grado puede ser ambigua entre predicado ecuativo y predicado adverbial.",
      engineSurface: "diagnostic NNC degree frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-adverbialized-nnc-second-degree",
      andrewsSection: "44.4.2",
      category: "nnc-second-degree-adverbialization",
      directiveEs: "La CNN absolutiva de segundo grado usa forma distintiva del sujeto y elimina la ambiguedad.",
      engineSurface: "diagnostic NNC degree frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-distributive-affinity-adverbials",
      andrewsSection: "44.4 note",
      category: "distributive-affinity-adverbials",
      directiveEs: "Las CNN adverbializadas pueden formarse sobre troncos distributivos/varietales y de afinidad si el significado lo permite.",
      engineSurface: "diagnostic stem-family frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-particle-looking-nncs",
      andrewsSection: "44.5",
      category: "particle-looking-nnc",
      directiveEs: "Una CNN monosilabica de segundo grado puede parecer particula; eso no la convierte en evidencia de particula.",
      engineSurface: "diagnostic particle-looking NNC frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-mo-negative-boundary",
      andrewsSection: "44.5.4",
      category: "mo-negative-boundary",
      directiveEs: "Mo no es interrogativo inherente; ahmo/camo son CNN negativizadas y la negacion antes de adjunto no niega necesariamente la accion.",
      engineSurface: "diagnostic particle-looking NNC frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-quen-fused-in",
      andrewsSection: "44.5.7",
      category: "quen-fused-in",
      directiveEs: "Quen se analiza como formacion especial con in fusionado; otro in puede seguir y la posicion no inicial quita fuerza interrogativa.",
      engineSurface: "diagnostic particle-looking NNC frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-other-absolutive-nncs",
      andrewsSection: "44.6",
      category: "other-absolutive-state-adverbials",
      directiveEs: "Otras CNN absolutivas adverbializadas se organizan por tiempo, lugar y manera/grado.",
      engineSurface: "diagnostic absolutive NNC inventory frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-eh-stress-collocations",
      andrewsSection: "44.6 eh collocations",
      category: "eh-stress-collocations",
      directiveEs: "Algunas CNN adverbiales forman grupo acentual con yeh/eh; yequeneh y yeceh tienen constituyentes desconocidos.",
      engineSurface: "diagnostic collocation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson44-preterit-agentive-adverbial-nncs",
      andrewsSection: "44.7",
      category: "preterit-agentive-adverbial-nnc",
      directiveEs: "El tronco de uso general del agentivo preterito produce adverbios de manera: como quien ha hecho o llegado a ser algo.",
      engineSurface: "diagnostic preterit-agentive adverbial frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-preterit-agentive-source-variants",
      andrewsSection: "44.7 variants",
      category: "preterit-agentive-source-variants",
      directiveEs: "Pueden intervenir fuentes obsoletas, root-plus-ya, tronco pleno, irregularidad, fuentes transitivas y reflexivos de linea auxiliar o principal.",
      engineSurface: "diagnostic preterit-agentive adverbial frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-possessive-state-adverbial-nncs",
      andrewsSection: "44.8",
      category: "possessive-state-adverbialized-nnc",
      directiveEs: "Las CNN posesivas adverbializadas son de primer grado; la mayoria corresponde a 45-47 y los casos raros quedan diagnosticos.",
      engineSurface: "diagnostic possessive-state adverbial frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson44-incorporated-adverbial-modifiers",
      andrewsSection: "44.9",
      category: "incorporated-adverbial-modifier",
      directiveEs: "Al incorporarse el predicado de una CNN absolutiva a una CNV compuesta, se descarta el sujeto y desaparece la diferencia de grados.",
      engineSurface: "diagnostic incorporated-adverbial frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function cloneAdverbialNuclearLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneAdverbialNuclearLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneAdverbialNuclearLessonRecord(value)]));
    }
    function getLesson44AdverbialNuclearSubsectionInventory() {
      return LESSON44_ADVERBIAL_NUCLEAR_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS)
      }));
    }
    function buildLesson44AdverbialNuclearPursuitFrame() {
      const subsectionInventory = getLesson44AdverbialNuclearSubsectionInventory();
      const overviewFrame = cloneAdverbialNuclearLessonRecord(LESSON44_OVERVIEW_FRAME);
      const degreesFrame = cloneAdverbialNuclearLessonRecord(LESSON44_DEGREES_FRAME);
      const adverbializedVncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_ADVERBIALIZED_VNC_FRAME);
      const adverbializedNncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_ADVERBIALIZED_NNC_FRAME);
      const particleLookingNncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_PARTICLE_LOOKING_NNC_FRAME);
      const otherAbsolutiveNncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_OTHER_ABSOLUTIVE_NNC_FRAME);
      const preteritAgentiveAdverbialNncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_PRETERIT_AGENTIVE_ADVERBIAL_NNC_FRAME);
      const possessiveStateAdverbialNncFrame = cloneAdverbialNuclearLessonRecord(LESSON44_POSSESSIVE_STATE_ADVERBIAL_NNC_FRAME);
      const incorporatedAdverbialModifierFrame = cloneAdverbialNuclearLessonRecord(LESSON44_INCORPORATED_ADVERBIAL_MODIFIER_FRAME);
      const remainingGaps = ["Current Lesson 44 support records Andrews' adverbial nuclear-clause architecture as diagnostics and preserves the existing configured adverbio route; it does not implement a full adverbial VNC/NNC generator.", "Second-degree absolutive NNC adverbialization, particle-looking NNCs, other absolutive-state adverbials, preterit-agentive adverbial NNCs, possessive-state adverbials, and incorporated adverbial modifiers remain inventory/diagnostic frames.", "Classical example spellings from Andrews are not imported as Nawat/Pipil fixtures; Andrews source models plus orthography-bridge fixtures are required before static data, parser/search detection, acciones de interfaz, or generation routing can expand."];
      const frame = {
        kind: "lesson-44-adverbial-nuclear-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 44,
        aimStatus: "shooting",
        routeStage: "audit-lesson-44",
        pdfRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS),
        plannedArrows: [{
          id: "lesson-44-adverbial-nuclear-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 44.1-44.9 against current adverbial nuclear-clause boundary metadata, configured adverbio output frames, adverbialization degrees, adverbialized VNC/NNC inventories, particle-looking NNCs, preterit-agentive adverbial NNCs, possessive-state adverbials, and incorporated adverbial modifiers.",
          andrewsRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-44-adverbial-nuclear-audit",
          result: "hit",
          correction: "Lesson 44 now records Andrews adverbial nuclear-clause architecture across adverbialized subject pronouns, degree constraints, adverbialized VNCs and NNCs, particle-looking NNCs, absolutive and possessive-state adverbials, preterit-agentive adverbials, and incorporated adverbial modifiers while keeping generation expansion blocked.",
          andrewsRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS),
          feedbackRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        degreesFrame,
        adverbializedVncFrame,
        adverbializedNncFrame,
        particleLookingNncFrame,
        otherAbsolutiveNncFrame,
        preteritAgentiveAdverbialNncFrame,
        possessiveStateAdverbialNncFrame,
        incorporatedAdverbialModifierFrame,
        currentEngineBoundary: {
          adverbialNuclearBoundaryMetadataImplemented: true,
          configuredAdverbioSurfaceImplemented: true,
          adverbialNuclearClauseFrameImplemented: true,
          firstDegreeVncFrameImplemented: true,
          secondDegreeNncDiagnosticOnly: true,
          adverbializedVncInventoryDiagnosticOnly: true,
          adverbializedNncInventoryDiagnosticOnly: true,
          particleLookingNncDiagnosticOnly: true,
          preteritAgentiveAdverbialNncDiagnosticOnly: true,
          possessiveStateAdverbialNncDiagnosticOnly: true,
          incorporatedAdverbialModifierDiagnosticOnly: true,
          parserDetectionImplemented: false,
          staticAdverbialDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson44GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachAdverbialNuclearGrammarContract(frame, {
        metadataKind: "lesson-44-adverbial-nuclear-pursuit-frame",
        unitKind: "adverbial-nuclear-clause-boundary",
        routeStage: "audit-lesson-44",
        structuralSource: "Andrews Lesson 44",
        andrewsRefs: Array.from(LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 44.1-44.9",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil adverbial orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required"
        },
        morphBoundaryFrame: {
          overviewFrame,
          degreesFrame,
          adverbializedVncFrame,
          adverbializedNncFrame,
          particleLookingNncFrame,
          otherAbsolutiveNncFrame,
          preteritAgentiveAdverbialNncFrame,
          possessiveStateAdverbialNncFrame,
          incorporatedAdverbialModifierFrame
        },
        nuclearClauseFrame: {
          sourceClauseKinds: ["VNC", "NNC absolutive", "NNC possessive"],
          adverbializedSubjectPronounRequired: true,
          vncAllowsOnlyFirstDegree: true,
          possessiveNncAllowsOnlyFirstDegree: true,
          absolutiveNncDegreeIsIdiosyncratic: true,
          adjoinedUnitsDeferredToLessons49_50: true
        },
        participantFrame: {
          semanticRole: "adverbialized subject pronoun",
          firstDegreeSubjectPronounShapeUnchanged: true,
          secondDegreeNum1Silent: true,
          subjectPronounDiscardedInIncorporation: true
        },
        targetContract: {
          metadataKind: "lesson-44-adverbial-nuclear-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["adverbial-nuclear-lesson-44-diagnostic-partial", "adverbial-nuclear-source-gated"]
      });
    }
    function normalizeAdverbialNuclearSurfaceValue(value = "") {
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitAdverbialNuclearSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeAdverbialNuclearSurfaceValue(entry)).filter(Boolean);
    }
    function getAdverbialNuclearCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => normalizeAdverbialNuclearSurfaceValue(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getAdverbialNuclearSelectedRealizationVariant({
      grammarFrame = null,
      frames = null,
      result = null,
      output = null
    } = {}) {
      const resultFrame = getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output
      });
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => normalizeAdverbialNuclearSurfaceValue(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
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
    function getAdverbialNuclearGrammarFrame(frameLike = null) {
      if (!frameLike || typeof frameLike !== "object") {
        return null;
      }
      return [frameLike.grammarFrame, frameLike.frames, frameLike].find(candidate => candidate && typeof candidate === "object" && (candidate.authorityFrame || candidate.routeContract || candidate.resultFrame || candidate.diagnosticFrame)) || null;
    }
    function getAdverbialNuclearResultFrame({
      grammarFrame = null,
      frames = null,
      result = null,
      output = null
    } = {}) {
      const frame = [getAdverbialNuclearGrammarFrame(grammarFrame), getAdverbialNuclearGrammarFrame(frames), getAdverbialNuclearGrammarFrame(result), getAdverbialNuclearGrammarFrame(output)].find(Boolean);
      return frame?.resultFrame && typeof frame.resultFrame === "object" ? frame.resultFrame : null;
    }
    function getAdverbialNuclearContractSurfaceForms({
      surfaceForms = [],
      surface = "",
      result = null,
      output = null,
      grammarFrame = null,
      frames = null
    } = {}) {
      const frameResult = getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output
      });
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getAdverbialNuclearCanonicalRealizationSurfaceForms(frameResult);
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
        return forms.map(entry => normalizeAdverbialNuclearSurfaceValue(entry)).filter(entry => entry && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(surfaceForms)) {
        forms.push(...surfaceForms);
      } else if (!hasResultFrame && surfaceForms) {
        forms.push(surfaceForms);
      }
      if (!hasResultFrame && surface) {
        forms.push(surface);
      }
      [result, output].forEach(node => {
        if (!node || typeof node !== "object") {
          return;
        }
        if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
          forms.push(...node.surfaceForms);
        }
        if (!hasResultFrame && node.surface) {
          forms.push(node.surface);
        }
        if (!hasResultFrame && node.result) {
          forms.push(node.result);
        }
      });
      return forms.flatMap(form => splitAdverbialNuclearSurfaceText(form)).filter((form, index, list) => form && list.indexOf(form) === index);
    }
    function getAdverbialNuclearContractSourceText({
      source = "",
      sourceStem = "",
      analysisStem = "",
      finalStem = "",
      result = null,
      output = null,
      grammarFrame = null,
      frames = null
    } = {}) {
      const frameResult = getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output
      });
      if (frameResult) {
        return normalizeAdverbialNuclearSurfaceValue(frameResult.sourceInput || "");
      }
      return String(source || sourceStem || analysisStem || finalStem || result?.sourceInput || output?.sourceInput || result?.source || output?.source || "").trim();
    }
    function buildAdverbialNuclearBoundaryMetadata() {
      const boundary = {
        kind: "adverbial-nuclear-boundary",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        lesson: 44,
        status: "partial",
        structuralSource: "Andrews Lesson 44",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        knownConfiguredAdverbioTenses: getKnownConfiguredAdverbioTensesForAdverbialBoundary(),
        structuralQuestions: getAdverbialNuclearStructuralQuestions(),
        boundaries: {
          hasConfiguredAdverbioSurface: true,
          hasAdverbialNuclearClauseFrame: true,
          hasFullAdverbialNuclearClauseEngine: false,
          hasAdverbialNncGeneration: false,
          hasAdverbialVncGeneration: false,
          hasStaticAdverbialData: false,
          changesAdverbioGeneration: false,
          changesNncGeneration: false,
          changesVncGeneration: false,
          treatsConfiguredAdverbioSurfaceAsFullLesson44Evidence: false
        },
        antiConflationRules: getAdverbialNuclearAntiConflationRules()
      };
      return attachAdverbialNuclearGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function buildAdverbializedSubjectPronounFrame({
      sourceClauseKind = ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.unknown,
      adverbialDegree = ADVERBIAL_NUCLEAR_DEGREE.unknown
    } = {}) {
      const normalizedSourceKind = normalizeAdverbialNuclearSourceClauseKind(sourceClauseKind);
      const normalizedDegree = normalizeAdverbialNuclearDegree(adverbialDegree);
      const secondDegree = normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.secondDegree;
      return {
        kind: "adverbialized-subject-pronoun",
        lessonRef: "Andrews 44.2",
        degree: normalizedDegree,
        sourceClauseKind: normalizedSourceKind,
        locus: "subject-pronoun",
        num1: {
          changesSoundedFillerToSilent: secondDegree,
          description: secondDegree ? "second-degree adverbialization replaces a sounded num1 filler with a silent one" : "first-degree adverbialization has no required subject-pronoun shape change"
        },
        constraints: {
          vncAllowsOnlyFirstDegree: true,
          possessiveNncAllowsOnlyFirstDegree: true,
          absolutiveNncIsIdiosyncratic: true
        }
      };
    }
    function buildAdverbialNuclearClauseFrame({
      source = "",
      surfaceForms = [],
      surface = "",
      result = null,
      output = null,
      grammarFrame = null,
      frames = null,
      sourceClauseKind = ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.vnc,
      adverbialKind = ADVERBIAL_NUCLEAR_KIND.vncAdverbial,
      adverbialDegree = ADVERBIAL_NUCLEAR_DEGREE.firstDegree,
      semanticDomain = ADVERBIAL_NUCLEAR_DOMAIN.manner,
      tense = "",
      sourceStem = "",
      finalStem = "",
      analysisStem = "",
      sourceValency = "",
      objectPrefix = "",
      baseObjectPrefix = "",
      evidenceSource = "",
      configuredTense = ""
    } = {}) {
      const normalizedSourceKind = normalizeAdverbialNuclearSourceClauseKind(sourceClauseKind);
      const normalizedKind = normalizeAdverbialNuclearKind(adverbialKind);
      const normalizedDegree = normalizeAdverbialNuclearDegree(adverbialDegree);
      const normalizedDomain = normalizeAdverbialNuclearDomain(semanticDomain);
      const forms = getAdverbialNuclearContractSurfaceForms({
        surfaceForms,
        surface,
        result,
        output,
        grammarFrame,
        frames
      });
      const selectedVariant = getAdverbialNuclearSelectedRealizationVariant({
        grammarFrame,
        frames,
        result,
        output
      });
      const sourceText = getAdverbialNuclearContractSourceText({
        source,
        sourceStem,
        analysisStem,
        finalStem,
        result,
        output,
        grammarFrame,
        frames
      });
      const hasResultFrame = Boolean(getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output
      }));
      const diagnostics = [];
      if (!sourceText) {
        diagnostics.push("adverbial-nuclear-requires-source");
      }
      if (!forms.length) {
        diagnostics.push("adverbial-nuclear-requires-generated-surface");
      }
      if ((normalizedSourceKind === ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.vnc || normalizedSourceKind === ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.nncPossessive) && normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.secondDegree) {
        diagnostics.push("adverbial-nuclear-source-permits-first-degree-only");
      }
      if (normalizedDomain === ADVERBIAL_NUCLEAR_DOMAIN.unknown) {
        diagnostics.push("adverbial-nuclear-semantic-domain-unconfirmed");
      }
      const supported = Boolean(sourceText && forms.length) && !diagnostics.includes("adverbial-nuclear-source-permits-first-degree-only");
      const subjectPronoun = buildAdverbializedSubjectPronounFrame({
        sourceClauseKind: normalizedSourceKind,
        adverbialDegree: normalizedDegree
      });
      const frame = {
        kind: "adverbial-nuclear-clause-frame",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        lesson: 44,
        structuralSource: "Andrews 44.1-44.4",
        targetAuthority: "Nawat/Pipil generated output supplied to this frame",
        supported,
        confirmed: false,
        source: {
          raw: sourceText,
          clauseKind: normalizedSourceKind,
          adverbialKind: normalizedKind,
          stem: String(hasResultFrame ? sourceText : sourceStem || sourceText),
          finalStem: String(hasResultFrame ? sourceText : finalStem || sourceStem || sourceText),
          analysisStem: String(hasResultFrame ? sourceText : analysisStem || sourceStem || sourceText),
          valency: String(sourceValency || ""),
          objectPrefix: String(objectPrefix || ""),
          baseObjectPrefix: String(baseObjectPrefix || objectPrefix || ""),
          tense: String(tense || configuredTense || "")
        },
        adverbialization: {
          degree: normalizedDegree,
          semanticDomain: normalizedDomain,
          subjectPronoun,
          lexicalized: normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.lexicalized,
          configuredRoute: Boolean(configuredTense)
        },
        output: {
          surfaceForms: forms,
          ...(selectedVariant ? {
            selectedVariant,
            selectedVariantId: selectedVariant.selectedVariantId,
            formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
            formulaRecordId: selectedVariant.formulaRecordId
          } : {}),
          preservesGeneratedSurface: true
        },
        generationContract: {
          routeGeneratesSurface: Boolean(configuredTense),
          frameGeneratesSurface: false,
          changesSurfaceForms: false,
          newWordGenerationAllowed: false
        },
        evidenceSource: String(evidenceSource || ""),
        diagnostics,
        boundary: buildAdverbialNuclearBoundaryMetadata()
      };
      return attachAdverbialNuclearGrammarContract(frame, {
        routeStage: "describe-existing-output",
        sourceInput: sourceText,
        surfaceForms: forms,
        supported,
        generationAllowed: false,
        nuclearClauseFrame: frame,
        morphBoundaryFrame: frame.boundary
      });
    }
    function classifyAdverbialNuclearCandidate({
      source = "",
      candidate = "",
      tense = "",
      adverbialKind = "",
      adverbialDegree = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = ""
    } = {}) {
      const normalizedKind = normalizeAdverbialNuclearKind(adverbialKind);
      const normalizedFalsePositive = normalizeAdverbialNuclearFalsePositiveSource(falsePositiveSource);
      const normalizedTense = String(tense || "").trim();
      const hasKnownConfiguredAdverbioTense = getKnownConfiguredAdverbioTensesForAdverbialBoundary().includes(normalizedTense);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const sourceSurface = normalizeAdverbialNuclearCandidateSurface(candidate);
      const hasSourceGate = hasAdverbialNuclearAndrewsSourceGate({
        sourceGate,
        structuredSource
      });
      const canGenerate = Boolean(sourceSurface && hasSourceGate && normalizedKind !== ADVERBIAL_NUCLEAR_KIND.unknown && normalizedFalsePositive === ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown);
      const classification = {
        kind: "adverbial-nuclear-candidate-classification",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: String(source || ""),
        candidate: String(candidate || ""),
        tense: normalizedTense,
        hasKnownConfiguredAdverbioTense,
        adverbialKind: normalizedKind,
        adverbialDegree: String(adverbialDegree || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        diagnostics: [canGenerate ? "adverbial-nuclear-andrews-source-generated" : hasEvidence ? "adverbial-nuclear-needs-validation" : "adverbial-nuclear-source-gate-required", hasKnownConfiguredAdverbioTense ? "configured-adverbio-surface-recognized" : "configured-adverbio-surface-unconfirmed", normalizedFalsePositive !== ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown ? "adverbial-nuclear-false-positive-source" : canGenerate ? "adverbial-nuclear-structured-source" : "adverbial-nuclear-unconfirmed"],
        boundary: buildAdverbialNuclearBoundaryMetadata()
      };
      return attachAdverbialNuclearGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-adverbial-nuclear" : "classify-boundary",
        sourceInput: classification.source || classification.candidate,
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
        nuclearClauseFrame: {
          source: classification.source,
          adverbialKind: classification.adverbialKind,
          adverbialDegree: classification.adverbialDegree,
          sourceGate: classification.sourceGate
        }
      });
    }
    function classifyAdverbialNuclearFalsePositive(source = "") {
      const normalizedSource = normalizeAdverbialNuclearFalsePositiveSource(source);
      const classification = {
        kind: "adverbial-nuclear-false-positive",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialNuclearEvidence: false,
        isAdverbialNncEvidence: false,
        isAdverbialVncEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-nuclear-false-positive-source"],
        antiConflationRules: getAdverbialNuclearAntiConflationRules()
      };
      return attachAdverbialNuclearGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_KIND; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_DEGREE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_DEGREE; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_DOMAIN", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_DOMAIN; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeAdverbialNuclearEnum = normalizeAdverbialNuclearEnum;
    api.normalizeAdverbialNuclearKind = normalizeAdverbialNuclearKind;
    api.normalizeAdverbialNuclearDegree = normalizeAdverbialNuclearDegree;
    api.normalizeAdverbialNuclearDomain = normalizeAdverbialNuclearDomain;
    api.normalizeAdverbialNuclearSourceClauseKind = normalizeAdverbialNuclearSourceClauseKind;
    api.normalizeAdverbialNuclearFalsePositiveSource = normalizeAdverbialNuclearFalsePositiveSource;
    api.normalizeAdverbialNuclearCandidateSurface = normalizeAdverbialNuclearCandidateSurface;
    api.hasAdverbialNuclearAndrewsSourceGate = hasAdverbialNuclearAndrewsSourceGate;
    api.getKnownConfiguredAdverbioTensesForAdverbialBoundary = getKnownConfiguredAdverbioTensesForAdverbialBoundary;
    api.getAdverbialNuclearAntiConflationRules = getAdverbialNuclearAntiConflationRules;
    api.getAdverbialNuclearStructuralQuestions = getAdverbialNuclearStructuralQuestions;
    api.attachAdverbialNuclearGrammarContract = attachAdverbialNuclearGrammarContract;
    Object.defineProperty(api, "LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_ADVERBIAL_NUCLEAR_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_ADVERBIAL_NUCLEAR_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON44_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_DEGREES_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_DEGREES_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_ADVERBIALIZED_VNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_ADVERBIALIZED_VNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_ADVERBIALIZED_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_ADVERBIALIZED_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_PARTICLE_LOOKING_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_PARTICLE_LOOKING_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_OTHER_ABSOLUTIVE_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_OTHER_ABSOLUTIVE_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_PRETERIT_AGENTIVE_ADVERBIAL_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_PRETERIT_AGENTIVE_ADVERBIAL_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_POSSESSIVE_STATE_ADVERBIAL_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_POSSESSIVE_STATE_ADVERBIAL_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_INCORPORATED_ADVERBIAL_MODIFIER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_INCORPORATED_ADVERBIAL_MODIFIER_FRAME; },
    });
    Object.defineProperty(api, "LESSON44_ADVERBIAL_NUCLEAR_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON44_ADVERBIAL_NUCLEAR_SUBSECTION_INVENTORY; },
    });
    api.cloneAdverbialNuclearLessonRecord = cloneAdverbialNuclearLessonRecord;
    api.getLesson44AdverbialNuclearSubsectionInventory = getLesson44AdverbialNuclearSubsectionInventory;
    api.buildLesson44AdverbialNuclearPursuitFrame = buildLesson44AdverbialNuclearPursuitFrame;
    api.normalizeAdverbialNuclearSurfaceValue = normalizeAdverbialNuclearSurfaceValue;
    api.splitAdverbialNuclearSurfaceText = splitAdverbialNuclearSurfaceText;
    api.getAdverbialNuclearCanonicalRealizationSurfaceForms = getAdverbialNuclearCanonicalRealizationSurfaceForms;
    api.getAdverbialNuclearSelectedRealizationVariant = getAdverbialNuclearSelectedRealizationVariant;
    api.getAdverbialNuclearGrammarFrame = getAdverbialNuclearGrammarFrame;
    api.getAdverbialNuclearResultFrame = getAdverbialNuclearResultFrame;
    api.getAdverbialNuclearContractSurfaceForms = getAdverbialNuclearContractSurfaceForms;
    api.getAdverbialNuclearContractSourceText = getAdverbialNuclearContractSourceText;
    api.buildAdverbialNuclearBoundaryMetadata = buildAdverbialNuclearBoundaryMetadata;
    api.buildAdverbializedSubjectPronounFrame = buildAdverbializedSubjectPronounFrame;
    api.buildAdverbialNuclearClauseFrame = buildAdverbialNuclearClauseFrame;
    api.classifyAdverbialNuclearCandidate = classifyAdverbialNuclearCandidate;
    api.classifyAdverbialNuclearFalsePositive = classifyAdverbialNuclearFalsePositive;
    return api;
}

export function installAdverbialNuclearGlobals(targetObject = globalThis) {
    const api = createAdverbialNuclearApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
