// Native wrapper generated from src/core/nnc/place_gentilic/place_gentilic.js.

export function createPlaceGentilicNncApi(targetObject = globalThis) {
    const PLACE_GENTILIC_NNC_BOUNDARY_VERSION = 1;
    const PLACE_GENTILIC_NNC_KIND = Object.freeze({
      placeName: "place-name",
      gentilic: "gentilic",
      gentilicCollective: "gentilic-collective",
      professionPlaceAssociation: "profession-place-association",
      calendarName: "calendar-name",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      relationalNncBoundary: "relational-nnc-boundary",
      locativeTemporalNominal: "locative-temporal-nominal",
      placeTranslation: "place-translation",
      gentilicTranslation: "gentilic-translation",
      professionTranslation: "profession-translation",
      routeLabel: "route-label",
      csvVerbSurface: "csv-verb-surface",
      calendarRoadmapText: "calendar-roadmap-text",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_USAGE = Object.freeze({
      ordinary: "ordinary-nnc",
      adverbial: "adverbial-nnc",
      adjectival: "adjectival-nnc",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_PLACE_GROUP = Object.freeze({
      nGroup: "n-group",
      panGroup: "pan-group",
      coCGroup: "co-c-group",
      tlahGroup: "tlah-group",
      tzalanGroup: "tzalan-group",
      titlanGroup: "ti-tlan-group",
      chanGroup: "chan-group",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_GENTILIC_FORMATION = Object.freeze({
      nonlocativeAbsolutive: "nonlocative-absolutive",
      twoClauseConcatenate: "two-clause-concatenate",
      preteritAgentivePlace: "preterit-agentive-place",
      caMatrixFullPlace: "ca-matrix-full-place",
      caMatrixPanEca: "ca-matrix-pan-e-ca",
      caMatrixCanMeca: "ca-matrix-ca-n-m-e-ca",
      caMatrixSilentReplacement: "ca-matrix-silent-replacement",
      caMatrixManTlanTeca: "ca-matrix-ma-n-tla-n-te-ca",
      collectivityYo: "collectivity-yo",
      professionExtension: "profession-extension",
      incorporation: "incorporation",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_SUBJECT_REFERENCE = Object.freeze({
      uniqueSocial: "unique-socially-designated-place",
      contextChosen: "context-chosen-locative-relation",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_STATE = Object.freeze({
      absolutive: "absolutive",
      possessive: "possessive",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES = Object.freeze(["place-name/gentilic NNC boundary metadata is not generation", "ordinary NNC fixtures are not place-name or gentilic fixture evidence", "open-stem ordinary NNC previews are not place-name or gentilic data", "locative-temporal nominal outputs are not place-name NNC evidence", "relational NNC boundary metadata is not place-name or gentilic evidence", "place, profession, or gentilic translations are not Nawat/Pipil form evidence", "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil form authority"]);
    const PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "placeNameSource",
      asks: "Which Nawat/Pipil place-name NNC form is evidenced?"
    }), Object.freeze({
      field: "gentilicSource",
      asks: "Which Nawat/Pipil gentilic NNC form is evidenced?"
    }), Object.freeze({
      field: "placeGentilicKind",
      asks: "Is the candidate a place-name, gentilic, gentilic collective, profession/place association, calendar-name, or unknown?"
    }), Object.freeze({
      field: "associatedPlace",
      asks: "What place is associated with the gentilic, collective, profession, or name?"
    }), Object.freeze({
      field: "collectivity",
      asks: "Is collectivity evidenced by Nawat/Pipil data or only by a translation/category label?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided example supports place/gentilic status?"
    })]);
    function normalizePlaceGentilicNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizePlaceGentilicNncKind(value = "") {
      return normalizePlaceGentilicNncEnum(value, Object.values(PLACE_GENTILIC_NNC_KIND), PLACE_GENTILIC_NNC_KIND.unknown);
    }
    function normalizePlaceGentilicNncFalsePositiveSource(value = "") {
      return normalizePlaceGentilicNncEnum(value, Object.values(PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE), PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizePlaceGentilicNncUsage(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        ordinary: PLACE_GENTILIC_NNC_USAGE.ordinary,
        adverbial: PLACE_GENTILIC_NNC_USAGE.adverbial,
        adjectival: PLACE_GENTILIC_NNC_USAGE.adjectival
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_USAGE), PLACE_GENTILIC_NNC_USAGE.unknown);
    }
    function normalizePlaceGentilicNncPlaceGroup(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        n: PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n-tli": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        pan: PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup,
        "co": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        c: PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        "co-c": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        tlah: PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup,
        tzalan: PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup,
        titlan: PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        "ti-tlan": PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        chan: PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_PLACE_GROUP), PLACE_GENTILIC_NNC_PLACE_GROUP.unknown);
    }
    function normalizePlaceGentilicNncGentilicFormation(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "tribal": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "nonlocative": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "two-clause": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        concatenate: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        "preterit-agentive": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.preteritAgentivePlace,
        "full-place": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace,
        "pan-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca,
        "ca-n-m-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca,
        "silent-replacement": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement,
        "te-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca,
        collectivity: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo,
        profession: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension,
        incorporation: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.incorporation
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_GENTILIC_FORMATION), PLACE_GENTILIC_NNC_GENTILIC_FORMATION.unknown);
    }
    function normalizePlaceGentilicNncSubjectReference(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        unique: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "social": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "socially-designated": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        contextual: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        "context-chosen": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        locative: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_SUBJECT_REFERENCE), PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown);
    }
    function normalizePlaceGentilicNncState(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        absolute: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutive: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutivo: PLACE_GENTILIC_NNC_STATE.absolutive,
        possessive: PLACE_GENTILIC_NNC_STATE.possessive,
        possessed: PLACE_GENTILIC_NNC_STATE.possessive,
        posesivo: PLACE_GENTILIC_NNC_STATE.possessive
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_STATE), PLACE_GENTILIC_NNC_STATE.unknown);
    }
    function getPlaceGentilicNncPlaceMatrix(placeGroup = "") {
      const normalized = normalizePlaceGentilicNncPlaceGroup(placeGroup);
      const matrixByGroup = {
        [PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup]: "-n",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup]: "pan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup]: "co/c",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup]: "tlah",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup]: "tzalan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup]: "ti-tlan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup]: "chan"
      };
      return matrixByGroup[normalized] || "";
    }
    function getPlaceGentilicNncAntiConflationRules() {
      return Array.from(PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES);
    }
    function getPlaceGentilicNncStructuralQuestions() {
      return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachPlaceGentilicNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "place-gentilic-nnc",
        routeFamily: "place-gentilic-nnc",
        ...options
      });
    }
    const LESSON48_PLACE_GENTILIC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_place_gentilic.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON48_PLACE_GENTILIC_PDF_REFS = Object.freeze(["Andrews Lesson 48.1", "Andrews Lesson 48.2", "Andrews Lesson 48.3", "Andrews Lesson 48.4", "Andrews Lesson 48.5", "Andrews Lesson 48.6", "Andrews Lesson 48.7", "Andrews Lesson 48.8", "Andrews Lesson 48.9", "Andrews Lesson 48.10", "Andrews Lesson 48.11", "Andrews Lesson 48.12", "Andrews Lesson 48.13"]);
    const LESSON48_PLACE_NAME_FRAME = Object.freeze({
      kind: "lesson-48-place-name-frame",
      sourceSection: "Andrews 48.1",
      placeNamesAreAdverbialNncs: true,
      adverbializedSubjectPronounRequired: true,
      uniqueSociallyDesignatedReference: true,
      contextualLocativeContrastRequired: true,
      functions: Object.freeze(["ordinary-nnc", "adverbial-nnc", "adjectival-nnc"]),
      placeReferents: Object.freeze(["settlement", "region", "province", "nation-or-state", "district-or-quarter", "building", "temple", "socially-significant-site"]),
      topographicalFeatureIsNotPlaceNameByDefault: true,
      topographicalFeatureMayEmbedInPlaceName: true,
      translationPrepositionsAreContextual: true,
      manyTranslationsConjecturalOrOpaque: true
    });
    const LESSON48_PLACE_GROUPS_FRAME = Object.freeze({
      kind: "lesson-48-place-groups-frame",
      sourceSection: "Andrews 48.2-48.8",
      groups: Object.freeze([Object.freeze({
        group: "n-group",
        sourceSection: "Andrews 48.2",
        matrixes: Object.freeze(["(-n)-tli", "(-ya-n)-tli", "(-ma-n)-0", "(-tla-n)-0", "(ca-n)-0"]),
        formationTypes: Object.freeze(["nominalized-imperfect-predicate-active-or-nonactive", "ya-n-perfective-core", "ma-n-place-of-area", "tla-n-place-in-vicinity", "ca-n-non-vnc-nounstem", "preterit-agentive-general-use", "action-noun-with-distant-past-ca"]),
        tlaNIsDistinctFromRelationalTlan: true,
        mictlanCanHaveNonadverbializedSubjectInChristianUsage: true
      }), Object.freeze({
        group: "pan-group",
        sourceSection: "Andrews 48.3",
        basedOnRelationalSection: "47.3.3",
        integratedStructure: true,
        connectiveTStructure: true,
        watercourseNamesCommon: true,
        crossingOrFordingMeaningPossible: true,
        bodyPartIxpanPossible: true
      }), Object.freeze({
        group: "co-c-group",
        sourceSection: "Andrews 48.4",
        basedOnRelationalSections: Object.freeze(["46.7", "46.8", "47.2.2"]),
        coAndCVariants: true,
        affectiveEmbedPossible: true,
        placeNamePlusAffectiveCanBeAmbiguousAfterSilentReplacement: true,
        historicalInformationMayDecideAffectiveAnalysis: true,
        soCalledCompoundMatrixSubtypeIncluded: true
      }), Object.freeze({
        group: "tlah-group",
        sourceSection: "Andrews 48.5",
        basedOnRelationalSections: Object.freeze(["46.6", "47.3.3.a"]),
        normalNounstemEmbed: true,
        panRelationalEmbedPossible: true
      }), Object.freeze({
        group: "tzalan-group",
        sourceSection: "Andrews 48.6",
        basedOnRelationalSection: "47.1.1"
      }), Object.freeze({
        group: "ti-tlan-group",
        sourceSection: "Andrews 48.7",
        basedOnRelationalSection: "47.3.2.c"
      }), Object.freeze({
        group: "chan-group",
        sourceSection: "Andrews 48.8",
        possessorSupplementationStructure: true,
        tamoanchanMeaningUncertain: true
      })])
    });
    const LESSON48_GENTILIC_FRAME = Object.freeze({
      kind: "lesson-48-gentilic-frame",
      sourceSection: "Andrews 48.9",
      gentilicSense: "human being intimately associated with a named place",
      principalFormationCount: 4,
      formations: Object.freeze([Object.freeze({
        id: "nonlocative-absolutive",
        sourceSection: "Andrews 48.9.1",
        state: "absolutive",
        limitedToTribalMemberNames: true
      }), Object.freeze({
        id: "two-clause-concatenate",
        sourceSection: "Andrews 48.9.2",
        structure: "place-name adjectival modifier plus absolutive head NNC",
        headNounstems: Object.freeze(["tlaca", "cal-ca", "cal-0-qui", "chan-eh-0"]),
        exceptionsPossible: true
      }), Object.freeze({
        id: "preterit-agentive-place",
        sourceSection: "Andrews 48.9.3",
        placeNameDerivedFromGentilic: true,
        ownerhoodAndNonOwnerhoodSubtypes: true
      }), Object.freeze({
        id: "ca-matrix-from-place-name",
        sourceSection: "Andrews 48.9.4",
        matrixStem: "(-ca)-tl",
        groupOneFullPlaceNameStem: true,
        panAddsEBeforeCa: true,
        canChangesNToMeca: true,
        groupTwoSilentReplacement: true,
        coCMatrixSilentReplacement: true,
        ownerhoodNMatrixSilentReplacementAndCaLoss: true,
        manTlanChangeToTeca: true
      })]),
      notesFrame: Object.freeze({
        alternativeFormationsPossible: true,
        defectiveTraditionalSpellingCanHideTlanVsTlah: true,
        gentilicNounstemCanResolveSomePlaceNameAmbiguity: true
      })
    });
    const LESSON48_EXTENSIONS_FRAME = Object.freeze({
      kind: "lesson-48-extensions-frame",
      sourceSection: "Andrews 48.10-48.13",
      incorporationFrame: Object.freeze({
        sourceSection: "Andrews 48.10",
        gentilicNounstemCanIncorporateIntoCompoundStem: true,
        gentilicNounstemCanEmbedInPlaceNameNounstem: true,
        associatedEntityVersusGentilicAnalysisRequiresCare: true,
        affectiveGentilicPlaceNamesPossible: true
      }),
      adjectivalUseFrame: Object.freeze({
        sourceSection: "Andrews 48.11",
        gentilicNncMayBeUsedAdjectivally: true
      }),
      collectivityFrame: Object.freeze({
        sourceSection: "Andrews 48.12",
        matrixStem: "(-yo)-tl",
        meansCollectiveBodyOrCharacteristicOfPeople: true,
        identicalFormCanBePertinencyWhenBaseIsNotPlaceName: true,
        possessiveNum1Variants: Object.freeze(["zero", "uh"]),
        adjectivalUseAllowed: true
      }),
      professionFrame: Object.freeze({
        sourceSection: "Andrews 48.13",
        famedPlaceGentilicCanExtendToProfession: true,
        states: Object.freeze(["absolutive", "possessive"]),
        pertinencyYoPossible: true,
        highRankAdministrativeOrMilitaryTitlesPossible: true
      })
    });
    const LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson48-place-name-overview",
      andrewsSection: "48.1",
      category: "place-name-nnc",
      directiveEs: "Los nombres de lugar son CNN adverbializadas con referencia social unica, no simples etiquetas locativas.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-place-name-functions",
      andrewsSection: "48.1 ordinary-adverbial-adjectival",
      category: "place-name-functions",
      directiveEs: "Un nombre de lugar puede funcionar como CNN ordinaria, adverbial o adjetival sin cambiar a preposicion.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-topographical-warning",
      andrewsSection: "48.1 note",
      category: "topographical-feature-warning",
      directiveEs: "Un nombre topografico no es automaticamente nombre de lugar; puede servir como embed de un nombre de lugar.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-n-group",
      andrewsSection: "48.2",
      category: "n-place-name-group",
      directiveEs: "El grupo n hereda formaciones de 46.3-46.5 y agrega matrices ma-n y tla-n propias de nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-imperfect",
      andrewsSection: "48.2.1",
      category: "n-imperfect-place-name",
      directiveEs: "N puede embeder predicado imperfecto nominalizado de fuente activa o no activa.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-yan",
      andrewsSection: "48.2.2",
      category: "yan-place-name",
      directiveEs: "La matriz ya-n de 46.5 puede formar nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-man",
      andrewsSection: "48.2.3",
      category: "man-place-area",
      directiveEs: "Ma-n significa lugar del area de y se usa solo en nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-tlan",
      andrewsSection: "48.2.4",
      category: "tlan-place-vicinity",
      directiveEs: "Tla-n de nombres de lugar significa lugar en la vecindad de y se distingue de tlan relacional.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-can",
      andrewsSection: "48.2.5",
      category: "can-place-name",
      directiveEs: "Ca-n puede formar nombres de lugar con embed nominal que no viene de VNC nominalizada.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-preterit-agentive",
      andrewsSection: "48.2.6",
      category: "preterit-agentive-place-name",
      directiveEs: "N puede embeder forma de uso general de un agentivo preterito, incluso de posesion.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-n-action-noun",
      andrewsSection: "48.2.7",
      category: "action-noun-place-name",
      directiveEs: "N puede embeder nombre de accion; ca ante n es morfo de pasado remoto.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-pan-group",
      andrewsSection: "48.3",
      category: "pan-place-name-group",
      directiveEs: "Pan forma nombres de lugar integrados o con conectivo t; con cursos de agua puede sugerir cruce o vado.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-co-c-group",
      andrewsSection: "48.4",
      category: "co-c-place-name-group",
      directiveEs: "Co/c forma nombres de lugar; los afectivos y la variante silenciosa pueden crear ambiguedad que requiere historia o evidencia.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-tlah-group",
      andrewsSection: "48.5",
      category: "tlah-place-name-group",
      directiveEs: "Tlah forma nombres de lugar con embed normal o con pan relacional.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-tzalan-group",
      andrewsSection: "48.6",
      category: "tzalan-place-name-group",
      directiveEs: "Tzalan forma nombres de lugar de en medio o entre.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-ti-tlan-group",
      andrewsSection: "48.7",
      category: "ti-tlan-place-name-group",
      directiveEs: "Ti-tlan forma nombres de lugar basados en la estructura relacional con conectivo t.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-chan-group",
      andrewsSection: "48.8",
      category: "chan-place-name-group",
      directiveEs: "Chan forma nombres de lugar mediante suplementacion de poseedor; Tamoanchan queda incierto.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-overview",
      andrewsSection: "48.9",
      category: "gentilic-nnc",
      directiveEs: "Los gentilicios nombran humanos asociados intimamente con un lugar nombrado y tienen cuatro vias principales.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-nonlocative",
      andrewsSection: "48.9.1",
      category: "nonlocative-absolutive-gentilic",
      directiveEs: "La formacion absolutiva no locativa se limita a nombres tribales.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-two-clause",
      andrewsSection: "48.9.2",
      category: "two-clause-gentilic",
      directiveEs: "Una unidad gentilicia puede ser biclausal: nombre de lugar como modificador adjetival mas cabeza absolutiva.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-preterit-agentive",
      andrewsSection: "48.9.3",
      category: "preterit-agentive-gentilic-place",
      directiveEs: "Algunos nombres de lugar derivan de un gentilicio agentivo preterito de posesion o no posesion.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-ca-matrix",
      andrewsSection: "48.9.4",
      category: "ca-matrix-gentilic",
      directiveEs: "Los demas nombres de lugar pueden embederse en ca-tl con forma completa, e-ca, m-e-ca, variante silenciosa o te-ca.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-spelling-ambiguity",
      andrewsSection: "48.9 notes",
      category: "gentilic-spelling-ambiguity",
      directiveEs: "La ortografia tradicional defectiva puede ocultar tla-n versus tlah; el gentilicio puede resolver parte de la ambiguedad.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-gentilic-incorporation",
      andrewsSection: "48.10",
      category: "gentilic-incorporation",
      directiveEs: "Un tronco gentilicio puede incorporarse en compuestos o embederse en nombres de lugar; debe distinguirse de entidad asociada.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-adjectival",
      andrewsSection: "48.11",
      category: "gentilic-adjectival-use",
      directiveEs: "Las CNN gentilicias pueden usarse adjetivalmente.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-gentilic-collectivity",
      andrewsSection: "48.12",
      category: "gentilic-collectivity-yo",
      directiveEs: "Yo-tl crea colectividad gentilicia o caracteristica del pueblo; las formas posesivas permiten num1 cero o uh.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson48-profession-titles",
      andrewsSection: "48.13",
      category: "profession-title-extension",
      directiveEs: "Algunos gentilicios se lexicalizan como profesion o titulo; admiten absolutivo o posesivo y pueden formar pertinencia con yo-tl.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    })]);
    function clonePlaceGentilicNncLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => clonePlaceGentilicNncLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, clonePlaceGentilicNncLessonRecord(value)]));
    }
    function getLesson48PlaceGentilicSubsectionInventory() {
      return LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON48_PLACE_GENTILIC_VALIDATION_REFS)
      }));
    }
    function buildLesson48PlaceGentilicPursuitFrame() {
      const subsectionInventory = getLesson48PlaceGentilicSubsectionInventory();
      const placeNameFrame = clonePlaceGentilicNncLessonRecord(LESSON48_PLACE_NAME_FRAME);
      const placeGroupsFrame = clonePlaceGentilicNncLessonRecord(LESSON48_PLACE_GROUPS_FRAME);
      const gentilicFrame = clonePlaceGentilicNncLessonRecord(LESSON48_GENTILIC_FRAME);
      const extensionsFrame = clonePlaceGentilicNncLessonRecord(LESSON48_EXTENSIONS_FRAME);
      const remainingGaps = ["Current Lesson 48 support records Andrews' place-name and gentilic architecture as diagnostics and usage frames; it does not implement place-name fixture data, gentilic fixture data, or surface generation.", "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require confirmed Nawat/Pipil evidence before visible output.", "Parser/search detection, unique-reference place-name resolution, place-name group parsing, gentilic derivation routing, traditional spelling ambiguity, incorporation, collectivity, profession/title extension, acciones de interfaz, and sentence-level context inference remain partial or evidence-needed."];
      const frame = {
        kind: "lesson-48-place-gentilic-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 48,
        aimStatus: "shooting",
        routeStage: "audit-lesson-48",
        pdfRefs: Array.from(LESSON48_PLACE_GENTILIC_PDF_REFS),
        plannedArrows: [{
          id: "lesson-48-place-gentilic-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 48.1-48.13 against current place-name/gentilic NNC boundary metadata, place-name uniqueness, seven place-name groups, four gentilic formation routes, incorporation, adjectival use, collectivity, profession/title extensions, and translation/evidence blockers.",
          andrewsRefs: Array.from(LESSON48_PLACE_GENTILIC_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON48_PLACE_GENTILIC_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-48-place-gentilic-audit",
          result: "hit",
          correction: "Lesson 48 now records Andrews place-name and gentilic architecture across unique social reference, seven place-name groups, four gentilic formation routes, spelling ambiguity, incorporation, adjectival use, collectivity, and profession/title extensions while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON48_PLACE_GENTILIC_PDF_REFS),
          feedbackRefs: Array.from(LESSON48_PLACE_GENTILIC_VALIDATION_REFS)
        }],
        subsectionInventory,
        placeNameFrame,
        placeGroupsFrame,
        gentilicFrame,
        extensionsFrame,
        currentEngineBoundary: {
          placeGentilicBoundaryMetadataImplemented: true,
          placeGentilicUsageFrameImplemented: true,
          placeNameUniqueReferenceDiagnosticOnly: true,
          placeNameGroupInventoryDiagnosticOnly: true,
          gentilicFormationInventoryDiagnosticOnly: true,
          gentilicCollectivityDiagnosticOnly: true,
          professionTitleExtensionDiagnosticOnly: true,
          parserDetectionImplemented: false,
          staticPlaceDataImplemented: false,
          staticGentilicDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson48GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachPlaceGentilicNncGrammarContract(frame, {
        metadataKind: "lesson-48-place-gentilic-pursuit-frame",
        unitKind: "place-gentilic-nnc-boundary",
        routeStage: "audit-lesson-48",
        structuralSource: "Andrews Lesson 48",
        andrewsRefs: Array.from(LESSON48_PLACE_GENTILIC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 48.1-48.13",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil place/gentilic evidence",
          noClassicalSurfaceImport: true,
          slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
          orthographyStatus: "nawat-evidence-required"
        },
        morphBoundaryFrame: {
          placeNameFrame,
          placeGroupsFrame,
          gentilicFrame,
          extensionsFrame
        },
        nuclearClauseFrame: {
          sourceClauseKind: "place-name or gentilic NNC",
          placeNameRequiresAdverbializedSubjectPronoun: true,
          uniqueSocialReferenceRequiredForPlaceNames: true,
          gentilicFormationsAreDerivedNncStructures: true,
          translationPrepositionMustBeInferredFromContext: true
        },
        participantFrame: {
          semanticRole: "unique place referent, human associated with place, collective body, profession, or title",
          translationPrepositionIsNotMorphology: true,
          associatedEntityGentilicCalendarDistinctionsEvidenceGated: true
        },
        targetContract: {
          metadataKind: "lesson-48-place-gentilic-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["place-gentilic-nnc-lesson-48-diagnostic-partial", "place-gentilic-nnc-needs-nawat-evidence"]
      });
    }
    function buildPlaceGentilicNncBoundaryMetadata() {
      const boundary = {
        kind: "place-gentilic-nnc-boundary",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        status: "partial",
        structuralSource: "Andrews Lesson 48",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPlaceGentilicNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasRelationalNncBoundary: true,
          hasPlaceGentilicUsageFrame: true,
          hasPlaceNameNncGeneration: false,
          hasGentilicNncGeneration: false,
          hasStaticPlaceData: false,
          hasStaticGentilicData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesRelationalNncGeneration: false,
          changesNominalizationGeneration: false,
          changesRouteBehavior: false,
          treatsPlaceTranslationsAsEvidence: false,
          treatsProfessionLabelsAsEvidence: false
        },
        antiConflationRules: getPlaceGentilicNncAntiConflationRules()
      };
      return attachPlaceGentilicNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyPlaceGentilicNncCandidate({
      candidate = "",
      placeNameSource = "",
      gentilicSource = "",
      placeGentilicKind = "",
      associatedPlace = "",
      collectivity = "",
      evidenceSource = "",
      falsePositiveSource = "",
      sourceKind = ""
    } = {}) {
      const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
      const normalizedFalsePositive = normalizePlaceGentilicNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const classification = {
        kind: "place-gentilic-nnc-candidate-classification",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "place-gentilic-nnc-needs-validation" : "place-gentilic-nnc-needs-nawat-evidence", normalizedKind !== PLACE_GENTILIC_NNC_KIND.unknown ? "place-gentilic-nnc-kind-recognized" : "place-gentilic-nnc-kind-unconfirmed", normalizedFalsePositive !== PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown ? "place-gentilic-nnc-false-positive-source" : "place-gentilic-nnc-unconfirmed"],
        boundary: buildPlaceGentilicNncBoundaryMetadata()
      };
      return attachPlaceGentilicNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.placeNameSource || classification.gentilicSource,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "place-gentilic-source-candidate",
          sourceStem: classification.placeNameSource || classification.gentilicSource,
          sourceKind: classification.placeGentilicKind
        }
      });
    }
    function classifyPlaceGentilicNncFalsePositive(source = "") {
      const normalizedSource = normalizePlaceGentilicNncFalsePositiveSource(source);
      const classification = {
        kind: "place-gentilic-nnc-false-positive",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPlaceNameNncEvidence: false,
        isGentilicNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["place-gentilic-nnc-false-positive-source"],
        antiConflationRules: getPlaceGentilicNncAntiConflationRules()
      };
      return attachPlaceGentilicNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }
    function buildPlaceGentilicNncUsageFrame({
      candidate = "",
      placeNameSource = "",
      gentilicSource = "",
      placeGentilicKind = "",
      usage = "",
      placeGroup = "",
      gentilicFormation = "",
      subjectReference = "",
      state = "",
      associatedPlace = "",
      collectivity = "",
      headNounstem = "",
      matrixStem = "",
      embeddedStem = "",
      sourcePlaceName = "",
      evidenceSource = "",
      sourceKind = "",
      translationLabel = ""
    } = {}) {
      const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
      const normalizedUsage = normalizePlaceGentilicNncUsage(usage);
      const normalizedPlaceGroup = normalizePlaceGentilicNncPlaceGroup(placeGroup);
      const normalizedFormation = normalizePlaceGentilicNncGentilicFormation(gentilicFormation);
      const normalizedState = normalizePlaceGentilicNncState(state);
      const normalizedSubjectReference = normalizePlaceGentilicNncSubjectReference(subjectReference) || PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown;
      const placeMatrix = String(matrixStem || getPlaceGentilicNncPlaceMatrix(normalizedPlaceGroup));
      const diagnostics = ["place-gentilic-nnc-usage-frame-non-generative"];
      let supported = true;
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName && normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen) {
        supported = false;
        diagnostics.push("place-name-nnc-requires-unique-social-reference");
      }
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic && normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca) {
        diagnostics.push("gentilic-pan-e-ca-distinct-from-associated-entity-pan-ca");
      }
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo) {
        diagnostics.push("gentilic-collectivity-yo-matrix");
      }
      if (String(translationLabel || "").trim()) {
        diagnostics.push("place-gentilic-nnc-translation-label-is-not-morphology");
      }
      const isProfession = normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension;
      const isCollective = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo;
      const allowedStates = isProfession || isCollective ? [PLACE_GENTILIC_NNC_STATE.absolutive, PLACE_GENTILIC_NNC_STATE.possessive] : [PLACE_GENTILIC_NNC_STATE.absolutive];
      if (normalizedState !== PLACE_GENTILIC_NNC_STATE.unknown && !allowedStates.includes(normalizedState)) {
        supported = false;
        diagnostics.push("place-gentilic-nnc-state-not-allowed-for-kind");
      }
      const placeNameContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName ? {
        adverbializedSubjectPronoun: true,
        uniqueReferenceRequired: true,
        subjectReference: normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown ? PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial : normalizedSubjectReference,
        contextualLocativeContrast: "ordinary adverbialized locative NNC has context-chosen reference",
        topographicalFeatureIsPlaceName: false,
        topographicalFeatureMayEmbedInPlaceName: true,
        functions: [PLACE_GENTILIC_NNC_USAGE.ordinary, PLACE_GENTILIC_NNC_USAGE.adverbial, PLACE_GENTILIC_NNC_USAGE.adjectival]
      } : null;
      const gentilicContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic || normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation ? {
        semanticRole: isProfession ? "profession-associated-with-place" : isCollective ? "collective-body-or-characteristic-of-people" : "human-associated-with-place",
        formation: normalizedFormation,
        headNounstem: String(headNounstem || ""),
        clauseStructure: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate ? "place-name-adjoined-to-absolutive-head-nnc" : "",
        matrixStem: isCollective ? "yo" : normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca ? "ca" : String(matrixStem || ""),
        relationToAssociatedEntity: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca ? "gentilic pan-e-ca, not associated-entity pan-ca" : "",
        possessiveNum1Variants: isCollective ? ["zero", "uh"] : [],
        adjectivalUseAllowed: isCollective
      } : null;
      const frame = {
        kind: "place-gentilic-nnc-usage-frame",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        structuralSource: "Andrews Lesson 48",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        usage: normalizedUsage,
        placeGroup: normalizedPlaceGroup,
        placeMatrix,
        gentilicFormation: normalizedFormation,
        state: normalizedState,
        allowedStates,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        embeddedStem: String(embeddedStem || ""),
        sourcePlaceName: String(sourcePlaceName || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceKind: String(sourceKind || ""),
        placeNameContract,
        gentilicContract,
        supported,
        generationAllowed: false,
        generationContract: {
          frameGeneratesSurface: false,
          changesSurfaceForms: false,
          newWordGenerationAllowed: false
        },
        translationWarning: {
          labelsAreMorphology: false,
          translationLabel: String(translationLabel || ""),
          warning: "place, profession, and gentilic labels are translation-only unless Nawat/Pipil morphology is evidenced"
        },
        diagnostics,
        boundary: buildPlaceGentilicNncBoundaryMetadata()
      };
      return attachPlaceGentilicNncGrammarContract(frame, {
        routeStage: "describe-usage-frame",
        sourceInput: frame.candidate || frame.placeNameSource || frame.gentilicSource,
        supported,
        morphBoundaryFrame: frame.boundary,
        stemFrame: {
          stemKind: "place-gentilic-nounstem",
          sourceStem: frame.placeNameSource || frame.gentilicSource,
          matrix: frame.placeMatrix,
          embed: frame.embeddedStem,
          sourceKind: frame.placeGentilicKind
        },
        nuclearClauseFrame: frame
      });
    }

    const api = {};
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_KIND; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_USAGE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_USAGE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_PLACE_GROUP", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_PLACE_GROUP; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_GENTILIC_FORMATION", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_GENTILIC_FORMATION; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_SUBJECT_REFERENCE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_SUBJECT_REFERENCE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_STATE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_STATE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS; },
    });
    api.normalizePlaceGentilicNncEnum = normalizePlaceGentilicNncEnum;
    api.normalizePlaceGentilicNncKind = normalizePlaceGentilicNncKind;
    api.normalizePlaceGentilicNncFalsePositiveSource = normalizePlaceGentilicNncFalsePositiveSource;
    api.normalizePlaceGentilicNncUsage = normalizePlaceGentilicNncUsage;
    api.normalizePlaceGentilicNncPlaceGroup = normalizePlaceGentilicNncPlaceGroup;
    api.normalizePlaceGentilicNncGentilicFormation = normalizePlaceGentilicNncGentilicFormation;
    api.normalizePlaceGentilicNncSubjectReference = normalizePlaceGentilicNncSubjectReference;
    api.normalizePlaceGentilicNncState = normalizePlaceGentilicNncState;
    api.getPlaceGentilicNncPlaceMatrix = getPlaceGentilicNncPlaceMatrix;
    api.getPlaceGentilicNncAntiConflationRules = getPlaceGentilicNncAntiConflationRules;
    api.getPlaceGentilicNncStructuralQuestions = getPlaceGentilicNncStructuralQuestions;
    api.attachPlaceGentilicNncGrammarContract = attachPlaceGentilicNncGrammarContract;
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_NAME_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_NAME_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GROUPS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GROUPS_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_GENTILIC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_GENTILIC_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_EXTENSIONS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_EXTENSIONS_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY; },
    });
    api.clonePlaceGentilicNncLessonRecord = clonePlaceGentilicNncLessonRecord;
    api.getLesson48PlaceGentilicSubsectionInventory = getLesson48PlaceGentilicSubsectionInventory;
    api.buildLesson48PlaceGentilicPursuitFrame = buildLesson48PlaceGentilicPursuitFrame;
    api.buildPlaceGentilicNncBoundaryMetadata = buildPlaceGentilicNncBoundaryMetadata;
    api.classifyPlaceGentilicNncCandidate = classifyPlaceGentilicNncCandidate;
    api.classifyPlaceGentilicNncFalsePositive = classifyPlaceGentilicNncFalsePositive;
    api.buildPlaceGentilicNncUsageFrame = buildPlaceGentilicNncUsageFrame;
    return api;
}

export function installPlaceGentilicNncGlobals(targetObject = globalThis) {
    const api = createPlaceGentilicNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
