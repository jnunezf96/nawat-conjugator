// Native wrapper generated from src/core/clause/clause.js.

export function createClauseModule(targetObject = globalThis) {
    const NUCLEAR_CLAUSE_SHELL_VERSION = 1;
    const NUCLEAR_CLAUSE_KIND = Object.freeze({
      verbal: "verbal-nuclear-clause",
      nominal: "nominal-nuclear-clause",
      unknown: "unknown-nuclear-clause"
    });
    const NUCLEAR_CLAUSE_FORMULA_TYPE = Object.freeze({
      vnc: "VNC",
      nnc: "NNC",
      unknown: "unknown"
    });
    const NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK = Object.freeze({
      nc: Object.freeze({
        abbreviation: "CN",
        english: "nuclear clause",
        spanish: "cláusula nuclear",
        conceptId: "nuclear-clause"
      }),
      vnc: Object.freeze({
        abbreviation: "CNV",
        english: "verbal nuclear clause",
        spanish: "cláusula nuclear verbal",
        conceptId: "vnc",
        legacyFormulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc
      }),
      nnc: Object.freeze({
        abbreviation: "CNN",
        english: "nominal nuclear clause",
        spanish: "cláusula nuclear nominal",
        conceptId: "nnc",
        legacyFormulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc
      })
    });
    const ANDREWS_NUCLEAR_SLOT = Object.freeze({
      pers1Pers2: "pers1-pers2",
      valence: "va",
      valence1Valence2: "va1-va2",
      object1: "obj1",
      object2: "obj2",
      object3: "obj3",
      reflexive: "reflexivo",
      state: "st",
      state1State2: "st1-st2",
      predicateStem: "STEM",
      tensePosition: "tns",
      numberConnector: "num1-num2"
    });
    const VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA = "#pers1-pers2+obj1-obj2-obj3-reflexivo(STEM)tiempo+num1-num2#";
    const NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA = "#pers1-pers2(STEM)num1-num2#";
    const NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS = Object.freeze({
      dyadic: "dyadic",
      monadic: "monadic",
      vacant: "vacant",
      unknown: "unknown"
    });
    const NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE = Object.freeze({
      unspecified: "unspecified",
      simpleSentence: "simple-sentence",
      mainClause: "main-clause",
      dependentClause: "dependent-clause",
      conjoinedClause: "conjoined-clause"
    });
    const NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS = Object.freeze([Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence,
      labelEs: "oración simple completa",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause,
      labelEs: "cláusula principal",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause,
      labelEs: "cláusula dependiente",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause,
      labelEs: "cláusula coordinada",
      sourceSection: "Andrews §4.1"
    })]);
    const NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA = "Subject + Predicate";
    const NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: "#person+valence(STEM)tense+number#",
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: "#person+state(STEM)number#"
    });
    const NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: Object.freeze({
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic]: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic]: "#pers1-pers2+va(STEM)tns+num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant]: "#pers1-pers2(STEM)tns+num1-num2#"
      }),
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: Object.freeze({
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic]: "#pers1-pers2+st1-st2(STEM)num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic]: "#pers1-pers2+st(STEM)num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant]: "#pers1-pers2(STEM)num1-num2#"
      })
    });
    const NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME = Object.freeze({
      sourceSection: "Andrews §4.1",
      appliesTo: "all-non-particle-vocables",
      excludedFormalClass: "particle",
      unitKind: "nuclear-clause",
      requiredFunctions: Object.freeze(["subject", "predicate"]),
      isMorphologicalWord: false,
      rejectsSentenceWordLabel: true,
      useRoles: Object.freeze([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause])
    });
    const NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME = Object.freeze({
      sourceSections: Object.freeze(["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"]),
      foreAftBoundary: "#",
      positionBoundary: "+",
      subpositionBoundary: "-",
      stemBoundary: "()",
      vacantPositionSymbol: "absence",
      formulaRepresentsSlotCategories: true,
      formulaRepresentsMorphicFillers: true,
      formulaIsEngineContract: true,
      surfaceGenerationAuthority: false,
      nawatEvidenceCannotChangeSlotOrder: true,
      stemDimensionsExplicit: true
    });
    const LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS = Object.freeze(["ki-0", "k-et", "0-et"]);
    const LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS = Object.freeze(["ki", "k", "0"]);
    const LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS = Object.freeze(["0", "et"]);
    const LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "0-t"]);
    const LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS = Object.freeze(["0"]);
    const LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS = Object.freeze(["0", "t"]);
    const LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "k-an"]);
    const LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS = Object.freeze(["0", "k"]);
    const LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS = Object.freeze(["0", "an"]);
    const NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME = Object.freeze({
      sourceSection: "Andrews §4.4",
      role: "subject",
      structure: "discontinuous-circumfix",
      prefixPosition: "person",
      suffixPosition: "number",
      genericFormula: "#person+...+number#",
      occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc, NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
    });
    const NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME = Object.freeze({
      sourceSection: "Andrews §4.5",
      positions: Object.freeze({
        person: Object.freeze({
          complexity: "dyadic",
          subpositions: Object.freeze(["pers1", "pers2"])
        }),
        number: Object.freeze({
          complexity: "dyadic",
          subpositions: Object.freeze(["num1", "num2"])
        }),
        tense: Object.freeze({
          complexity: "monadic",
          slot: "tns",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        valence: Object.freeze({
          complexityOptions: Object.freeze(["dyadic", "monadic", "vacant"]),
          slotsByStatus: Object.freeze({
            dyadic: "va1-va2",
            monadic: "va",
            vacant: "Ø"
          }),
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        state: Object.freeze({
          complexityOptions: Object.freeze(["dyadic", "monadic", "vacant"]),
          slotsByStatus: Object.freeze({
            dyadic: "st1-st2",
            monadic: "st",
            vacant: "Ø"
          }),
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        }),
        stem: Object.freeze({
          complexityOptions: Object.freeze(["monadic", "polyadic"]),
          lessonsDeferredTo: Object.freeze(["Lesson 7", "Lesson 14"])
        })
      })
    });
    const NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: Object.freeze([Object.freeze({
        level: 1,
        key: "verbstem",
        label: "verbstem",
        labelEs: "tronco verbal",
        role: "foundation"
      }), Object.freeze({
        level: 2,
        key: "verbcore",
        label: "verbcore = valence + stem",
        labelEs: "núcleo verbal = valencia + base",
        role: "core"
      }), Object.freeze({
        level: 3,
        key: "predicate",
        label: "predicate = verbcore + tense",
        labelEs: "predicado = núcleo verbal + tiempo",
        role: "predicate"
      }), Object.freeze({
        level: 4,
        key: "vnc",
        label: "VNC = subject + predicate",
        labelEs: "CNV = sujeto + predicado",
        role: "nuclear-clause"
      })]),
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: Object.freeze([Object.freeze({
        level: 1,
        key: "nounstem",
        label: "nounstem",
        labelEs: "tronco nominal",
        role: "foundation"
      }), Object.freeze({
        level: 2,
        key: "nouncore",
        label: "nouncore = predicate = state + stem",
        labelEs: "núcleo nominal = predicado = estado + base",
        role: "predicate"
      }), Object.freeze({
        level: 3,
        key: "nnc",
        label: "NNC = subject + predicate",
        labelEs: "CNN = sujeto + predicado",
        role: "nuclear-clause"
      })])
    });
    const NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME = Object.freeze({
      kind: "lesson-4-personal-pronoun-frame",
      form: "affixal-only",
      location: "nuclear-clause-formula-positions",
      minimumMorphemeCount: 2,
      onlyReferringElements: true,
      categories: Object.freeze(["person", "animacy", "humanness", "number", "case"]),
      categoryFeatures: Object.freeze({
        person: Object.freeze(["first", "second", "third"]),
        animacy: Object.freeze(["animate", "nonanimate"]),
        humanness: Object.freeze(["human", "nonhuman"]),
        number: Object.freeze({
          animate: Object.freeze(["singular", "plural"]),
          nonanimate: Object.freeze(["common"])
        }),
        case: Object.freeze(["nominative", "objective", "possessive"])
      }),
      noGender: true,
      cases: Object.freeze({
        nominative: Object.freeze({
          functionRole: "subject",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc, NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        }),
        objective: Object.freeze({
          functionRole: "verb-object",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        possessive: Object.freeze({
          functionRole: "possessor",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        })
      }),
      referenceMode: "deictic-anaphoric-cataphoric"
    });
    const NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS = Object.freeze(["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson4-nuclear-clause-scope",
      andrewsSection: "4.1",
      category: "nuclear-clause-scope",
      directiveEs: "Todo vocablo no partícula se trata como cláusula nuclear con sujeto y predicado obligatorios.",
      engineSurface: "vocable scope frame, subject+predicate boundary, non-word anti-conflation rules, and use roles",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-nuclear-clause-kinds",
      andrewsSection: "4.2",
      category: "vnc-nnc-kinds",
      directiveEs: "Separar CNV/VNC y CNN/NNC por clase de predicado, no por traducción inglesa o palabra visible.",
      engineSurface: "predicate function profiles for verbal and nominal nuclear clauses",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-1",
      andrewsSection: "4.3",
      category: "formula-stage-1",
      directiveEs: "La fórmula comienza como sujeto + predicado; los símbolos son arquitectura de posiciones y rellenos.",
      engineSurface: "stage-1 formula inventory and formula-boundary frame",
      redirectAction: "keep",
      evidenceStatus: "direct-pdf-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-2",
      andrewsSection: "4.4",
      category: "formula-stage-2",
      directiveEs: "El sujeto es circunfijo de persona y número; la CNN usa estado+base y la CNV valencia+base+tiempo.",
      engineSurface: "stage-2 formula inventory, subject frame, and CNV/CNN organizational layers",
      redirectAction: "keep",
      evidenceStatus: "direct-pdf-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-3",
      andrewsSection: "4.5",
      category: "formula-stage-3",
      directiveEs: "Las seis fórmulas distinguen posiciones diádicas, monádicas y vacantes; la complejidad del tallo queda diferida.",
      engineSurface: "six formula records, predicate-position controls, and stem-complexity deferral to Lessons 7 and 14",
      redirectAction: "keep",
      evidenceStatus: "direct-pdf-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-personal-pronouns",
      andrewsSection: "4.6",
      category: "personal-pronouns",
      directiveEs: "Los pronombres personales son afijales, son los únicos referentes, no marcan género y requieren contexto para 3a persona.",
      engineSurface: "personal pronoun frame and slot-filler resolution diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "context-required",
      implementationState: "partial"
    })]);
    const NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES = Object.freeze({
      "": Object.freeze({
        person: 0,
        number: "none"
      }),
      nu: Object.freeze({
        person: 1,
        number: "sg"
      }),
      mu: Object.freeze({
        person: 2,
        number: "sg"
      }),
      i: Object.freeze({
        person: 3,
        number: "sg"
      }),
      tu: Object.freeze({
        person: 1,
        number: "pl"
      }),
      anmu: Object.freeze({
        person: 2,
        number: "pl"
      }),
      in: Object.freeze({
        person: 3,
        number: "pl"
      })
    });
    const NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["nuclear clause shell is not generation", "VNC/NNC surface output is not a complete sentence model", "CNV/CNN are the visible Andrews-derived names for the legacy VNC/NNC generator categories", "Lesson 4 formulas are shell architecture, not generated Nawat/Pipil surfaces", "tense position belongs to VNC, not ordinary NNC", "objective personal pronouns belong only in VNC predicates", "possessive personal pronouns belong only in NNC predicates", "topic and supplementation are clause-level relations, not noun classes", "Andrews slot order is architecture, not Nawat/Pipil surface evidence", "Andrews formulas are engine contracts, not optional metadata"]);
    const LESSON5_VNC_TENSE_PROFILE_BY_TENSE = Object.freeze({
      presente: Object.freeze({
        morph: "Ø",
        labelEs: "indicativo presente",
        mood: "indicative",
        tense: "present",
        pluralConnector: "Ø-t",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        andrewsConnectorPattern: "0 + 0/h",
        nawatConnectorPattern: "0 + 0/t",
        sourceSection: "Andrews §5.4.1/§5.5",
        orthographyBridge: "Classical plural h adapted as Nawat t"
      }),
      "presente-habitual": Object.freeze({
        morph: "ni",
        labelEs: "indicativo presente habitual",
        mood: "indicative",
        tense: "customary-present",
        pluralConnector: "Ø-t",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        andrewsConnectorPattern: "0 + 0/h",
        nawatConnectorPattern: "0 + 0/t",
        sourceSection: "Andrews §5.4.1/§5.5",
        orthographyBridge: "Classical plural h adapted as Nawat t"
      }),
      imperfecto: Object.freeze({
        morph: "ya",
        labelEs: "indicativo imperfecto",
        mood: "indicative",
        tense: "imperfect",
        pluralConnector: "Ø-t",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        andrewsConnectorPattern: "0 + 0/h",
        nawatConnectorPattern: "0 + 0/t",
        sourceSection: "Andrews §5.4.1/§5.5",
        orthographyBridge: "Classical plural h adapted as Nawat t"
      }),
      futuro: Object.freeze({
        morph: "s",
        labelEs: "indicativo futuro",
        mood: "indicative",
        tense: "future",
        pluralConnector: "k-et",
        connectorOptions: LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS,
        num1Options: LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS,
        num2Options: LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS,
        andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
        nawatConnectorPattern: "k~ki~0 + 0/et",
        sourceSection: "Andrews §5.4.2/§5.5",
        orthographyBridge: "Classical c/qu/qui~0 + 0/eh adapted as Nawat ki-0, k-et, or 0-et"
      }),
      preterito: Object.freeze({
        morph: "Ø",
        labelEs: "indicativo pretérito",
        mood: "indicative",
        tense: "preterit",
        pluralConnector: "k-et",
        connectorOptions: LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS,
        num1Options: LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS,
        num2Options: LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS,
        andrewsConnectorPattern: "c/qu/qui~0 + 0/eh",
        nawatConnectorPattern: "k~ki~0 + 0/et",
        sourceSection: "Andrews §5.4.2/§5.5",
        orthographyBridge: "Classical c/qu/qui~0 + 0/eh adapted as Nawat ki-0, k-et, or 0-et"
      }),
      "pasado-remoto": Object.freeze({
        morph: "ka",
        labelEs: "indicativo pasado remoto",
        mood: "indicative",
        tense: "distant-past",
        pluralConnector: "Ø-t",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        andrewsConnectorPattern: "0 + 0/h",
        nawatConnectorPattern: "0 + 0/t",
        sourceSection: "Andrews §5.4.1/§5.5",
        orthographyBridge: "Classical plural h adapted as Nawat t"
      }),
      "presente-desiderativo": Object.freeze({
        morph: "sneki",
        labelEs: "desiderativo presente",
        mood: "desiderative",
        tense: "present-desiderative",
        pluralConnector: "Ø-t",
        sourceSection: "Andrews §5.5 + Nawat tense suffix evidence"
      }),
      condicional: Object.freeze({
        morph: "skia",
        labelEs: "condicional",
        mood: "conditional",
        tense: "conditional",
        pluralConnector: "Ø-t",
        sourceSection: "Andrews §5.5 + Nawat tense suffix evidence"
      }),
      perfecto: Object.freeze({
        morph: "tuk",
        pluralMorph: "tiwi",
        labelEs: "perfecto",
        mood: "perfect",
        tense: "perfect",
        pluralConnector: "Ø-t",
        sourceSection: "Andrews §5.5 + Nawat tense suffix evidence"
      }),
      pluscuamperfecto: Object.freeze({
        morph: "tuya",
        labelEs: "pluscuamperfecto",
        mood: "pluperfect",
        tense: "pluperfect",
        pluralConnector: "Ø-t",
        sourceSection: "Andrews §5.5 + Nawat tense suffix evidence"
      }),
      "condicional-perfecto": Object.freeze({
        morph: "tuskia",
        labelEs: "condicional perfecto",
        mood: "conditional-perfect",
        tense: "conditional-perfect",
        pluralConnector: "Ø-t",
        sourceSection: "Andrews §5.5 + Nawat tense suffix evidence"
      }),
      optativo: Object.freeze({
        morph: "Ø",
        labelEs: "optativo no pasado",
        mood: "optative",
        tense: "nonpast",
        pluralConnector: "k-an",
        connectorOptions: LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS,
        andrewsConnectorPattern: "0-0 / c-an",
        nawatConnectorPattern: "0-0 / k-an",
        sourceSection: "Andrews §5.4.3/§5.5",
        orthographyBridge: "Classical c-an adapted as Nawat k-an"
      })
    });
    function attachNuclearClauseGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nuclear-clause-shell",
        routeFamily: "nuclear-clause-shell",
        structuralSource: "Andrews Lesson 4",
        andrewsRefs: ["Andrews Lesson 4"],
        ...options
      });
    }
    function getLesson5VncTenseProfile(tenseValue = "", tenseLabel = "") {
      const keys = [String(tenseValue || "").trim(), String(tenseLabel || "").trim()].filter(Boolean);
      for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(LESSON5_VNC_TENSE_PROFILE_BY_TENSE, key)) {
          return LESSON5_VNC_TENSE_PROFILE_BY_TENSE[key];
        }
      }
      return null;
    }
    function hasLesson5VncPluralConnector(connector = "") {
      const normalized = String(connector || "").trim();
      return Boolean(normalized) && normalized !== "Ø" && normalized !== "0" && normalized !== "Ø-Ø" && normalized !== "0-0";
    }
    function getLesson5VncTenseMorph(profile = null, numberConnectorFrame = null) {
      if (!profile) {
        return "";
      }
      if (hasLesson5VncPluralConnector(numberConnectorFrame?.displayConnector || numberConnectorFrame?.connector || "") && profile.pluralMorph) {
        return profile.pluralMorph;
      }
      return profile.morph || "";
    }
    function resolveLesson5VncProfileConnector(profile = null, rawConnector = "") {
      const raw = String(rawConnector || "").trim();
      if (!profile?.connectorOptions) {
        return "";
      }
      if (profile.connectorOptions.includes(raw)) {
        return raw;
      }
      if (raw === "k-0") {
        return "k-0";
      }
      if (raw === "ki") {
        return "ki-0";
      }
      if (raw === "k" || raw === "ket") {
        return "k-et";
      }
      if (raw === "et") {
        return "0-et";
      }
      return "";
    }
    function buildLesson5VncNumberConnectorSlot({
      subjectNumberConnector = "",
      subjectPrefix = "",
      tenseValue = "",
      tenseLabel = ""
    } = {}) {
      const rawConnector = String(subjectNumberConnector || "").trim();
      const profile = getLesson5VncTenseProfile(tenseValue, tenseLabel);
      const hasPluralConnector = hasLesson5VncPluralConnector(rawConnector);
      const selectedProfileConnector = resolveLesson5VncProfileConnector(profile, rawConnector);
      if (hasPluralConnector && profile?.pluralConnector) {
        const selectedConnector = selectedProfileConnector || profile.pluralConnector;
        const [num1, num2] = selectedConnector.includes("-") ? selectedConnector.split("-", 2) : ["", selectedConnector];
        return {
          connector: selectedConnector,
          displayConnector: selectedConnector,
          num1: num1 === "Ø" ? "" : String(num1 || ""),
          num2: num2 === "Ø" ? "" : String(num2 || ""),
          connectorOptions: profile.connectorOptions ? [...profile.connectorOptions] : undefined,
          num1Options: profile.num1Options ? [...profile.num1Options] : undefined,
          num2Options: profile.num2Options ? [...profile.num2Options] : undefined,
          andrewsConnectorPattern: profile.andrewsConnectorPattern || "",
          nawatConnectorPattern: profile.nawatConnectorPattern || "",
          andrewsSource: profile.sourceSection || "Andrews §5.4",
          orthographyBridge: profile.orthographyBridge || ""
        };
      }
      const [num1, num2] = rawConnector.includes("-") ? rawConnector.split("-", 2) : ["", rawConnector];
      return {
        connector: rawConnector,
        displayConnector: rawConnector ? rawConnector.includes("-") ? rawConnector : `Ø-${rawConnector}` : "Ø-Ø",
        num1: num1 === "Ø" ? "" : String(num1 || ""),
        num2: num2 === "Ø" ? "" : String(num2 || "")
      };
    }
    function getNuclearClauseFormulaSlot(formulaSlots = null, canonicalKey = "") {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return null;
      }
      if (formulaSlots[canonicalKey] && typeof formulaSlots[canonicalKey] === "object") {
        return formulaSlots[canonicalKey];
      }
      return null;
    }
    function normalizeNuclearClauseKind(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (["vnc", "verbal", "verb", "verbo", NUCLEAR_CLAUSE_KIND.verbal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.verbal;
      }
      if (["nnc", "nominal", "noun", "sustantivo", "adjetivo", NUCLEAR_CLAUSE_KIND.nominal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.nominal;
      }
      return NUCLEAR_CLAUSE_KIND.unknown;
    }
    function getNuclearClauseFormulaType(clauseKind = "") {
      const normalizedKind = normalizeNuclearClauseKind(clauseKind);
      if (normalizedKind === NUCLEAR_CLAUSE_KIND.verbal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.vnc;
      }
      if (normalizedKind === NUCLEAR_CLAUSE_KIND.nominal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.nnc;
      }
      return NUCLEAR_CLAUSE_FORMULA_TYPE.unknown;
    }
    function getNuclearClauseTerminologyForFormulaType(formulaType = "") {
      const normalizedFormulaType = String(formulaType || "").trim().toUpperCase();
      const terminology = typeof targetObject.getNuclearClauseTerminology === "function" ? targetObject.getNuclearClauseTerminology() : NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK;
      const fallback = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.vnc : normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.nnc : NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.nc;
      const source = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? terminology?.vnc : normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? terminology?.nnc : terminology?.nc;
      return {
        ...fallback,
        ...(source && typeof source === "object" ? source : {}),
        legacyFormulaType: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc || normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? normalizedFormulaType : ""
      };
    }
    function getNuclearClauseFormulaAbbreviation(formulaType = "") {
      return getNuclearClauseTerminologyForFormulaType(formulaType).abbreviation || "CN";
    }
    function getNuclearClauseFormulaLabel(formulaType = "") {
      return `Fórmula ${getNuclearClauseFormulaAbbreviation(formulaType)}`;
    }
    function getNuclearClauseDisplayLabel(formulaType = "") {
      const term = getNuclearClauseTerminologyForFormulaType(formulaType);
      const abbreviation = term.abbreviation || "CN";
      return `${term.spanish || "cláusula nuclear"} (${abbreviation})`;
    }
    function normalizeNuclearClauseFormulaType(value = "") {
      const normalized = String(value || "").trim().toUpperCase();
      if (normalized === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.vnc;
      }
      if (normalized === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.nnc;
      }
      return NUCLEAR_CLAUSE_FORMULA_TYPE.unknown;
    }
    function normalizeNuclearClausePredicatePositionStatus(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, "diadic", "diadica", "diádica", "va1-va2", "st1-st2"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, "monadica", "monádica", "va", "st"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant, "empty", "absent", "none", "vacante", "ø"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown;
    }
    function getNuclearClausePredicatePositionLabel(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return "valencia";
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return "estado";
      }
      return "posición predicativa";
    }
    function getNuclearClausePredicatePositionStatusLabel(status = "") {
      const normalized = normalizeNuclearClausePredicatePositionStatus(status);
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
        return "diádica";
      }
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
        return "monádica";
      }
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant) {
        return "vacante";
      }
      return "sin clasificar";
    }
    function getNuclearClausePredicatePositionSlotLabel(formulaType = "", status = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const normalizedStatus = normalizeNuclearClausePredicatePositionStatus(status);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
          return ANDREWS_NUCLEAR_SLOT.valence1Valence2;
        }
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
          return ANDREWS_NUCLEAR_SLOT.valence;
        }
        return "Ø";
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
          return ANDREWS_NUCLEAR_SLOT.state1State2;
        }
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
          return ANDREWS_NUCLEAR_SLOT.state;
        }
        return "Ø";
      }
      return "Ø";
    }
    function normalizeNuclearClauseLesson4UsageRole(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence, "sentence", "oracion-simple", "oración-simple", "oracion simple", "oración simple"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause, "principal", "clausula-principal", "cláusula-principal", "clausula principal", "cláusula principal"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause, "dependent", "subordinate", "dependiente", "subordinada", "clausula-dependiente", "cláusula-dependiente", "clausula dependiente", "cláusula dependiente"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause, "conjoined", "coordinated", "coordinada", "clausula-coordinada", "cláusula-coordinada", "clausula coordinada", "cláusula coordinada"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause;
      }
      return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified;
    }
    function getNuclearClauseLesson4UsageOptionLabel(role = "") {
      const normalizedRole = normalizeNuclearClauseLesson4UsageRole(role);
      return NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS.find(entry => entry.role === normalizedRole)?.labelEs || "sin uso sintáctico fijado";
    }
    function buildNuclearClauseLesson4FormulaRecord({
      formulaType = "",
      predicatePositionStatus = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const normalizedStatus = normalizeNuclearClausePredicatePositionStatus(predicatePositionStatus);
      const stage3Formula = NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS[normalizedFormulaType]?.[normalizedStatus] || "";
      return {
        stage: 3,
        sourceSection: "Andrews §4.5",
        formulaType: normalizedFormulaType,
        formulaAbbreviation: getNuclearClauseFormulaAbbreviation(normalizedFormulaType),
        predicatePosition: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? "valence" : "state",
        predicatePositionLabel: getNuclearClausePredicatePositionLabel(normalizedFormulaType),
        predicatePositionStatus: normalizedStatus,
        predicatePositionStatusLabel: getNuclearClausePredicatePositionStatusLabel(normalizedStatus),
        predicatePositionSlot: getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, normalizedStatus),
        formula: stage3Formula,
        generationAllowed: false
      };
    }
    function getNuclearClauseLesson4FormulaInventory() {
      const buildSet = formulaType => [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant].map(predicatePositionStatus => buildNuclearClauseLesson4FormulaRecord({
        formulaType,
        predicatePositionStatus
      }));
      return {
        kind: "lesson-4-nuclear-clause-formula-inventory",
        structuralSource: "Andrews Lesson 4",
        formulaBoundaryFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME,
          sourceSections: Array.from(NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME.sourceSections)
        },
        subjectFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME,
          occursIn: Array.from(NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME.occursIn)
        },
        positionComplexityFrame: cloneNuclearClausePositionComplexityFrame(),
        stage1: {
          stage: 1,
          sourceSection: "Andrews §4.3",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA,
          role: "general nuclear-clause relation"
        },
        stage2: {
          stage: 2,
          sourceSection: "Andrews §4.4",
          formulas: {
            VNC: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[NUCLEAR_CLAUSE_FORMULA_TYPE.vnc],
            NNC: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]
          }
        },
        stage3: {
          stage: 3,
          sourceSection: "Andrews §4.5",
          VNC: buildSet(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc),
          NNC: buildSet(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc)
        },
        generationAllowed: false
      };
    }
    function getNuclearClauseOrganizationalLayers(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      return (NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES[normalizedFormulaType] || []).map(entry => ({
        ...entry
      }));
    }
    function cloneNuclearClausePositionComplexityFrame() {
      const positions = {};
      Object.entries(NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME.positions).forEach(([key, value]) => {
        positions[key] = {
          ...value,
          subpositions: value.subpositions ? Array.from(value.subpositions) : undefined,
          occursIn: value.occursIn ? Array.from(value.occursIn) : undefined,
          complexityOptions: value.complexityOptions ? Array.from(value.complexityOptions) : undefined,
          lessonsDeferredTo: value.lessonsDeferredTo ? Array.from(value.lessonsDeferredTo) : undefined,
          slotsByStatus: value.slotsByStatus ? {
            ...value.slotsByStatus
          } : undefined
        };
        Object.keys(positions[key]).forEach(field => {
          if (positions[key][field] === undefined) {
            delete positions[key][field];
          }
        });
      });
      return {
        ...NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME,
        positions
      };
    }
    function cloneNuclearClauseCategoryFeatures() {
      const source = NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.categoryFeatures;
      return {
        person: Array.from(source.person),
        animacy: Array.from(source.animacy),
        humanness: Array.from(source.humanness),
        number: {
          animate: Array.from(source.number.animate),
          nonanimate: Array.from(source.number.nonanimate)
        },
        case: Array.from(source.case)
      };
    }
    function getNuclearClausePersonalPronounFrame() {
      return {
        ...NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME,
        categories: Array.from(NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.categories),
        categoryFeatures: cloneNuclearClauseCategoryFeatures(),
        cases: Object.fromEntries(Object.entries(NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.cases).map(([key, value]) => [key, {
          ...value,
          occursIn: Array.from(value.occursIn)
        }]))
      };
    }
    function getNuclearClauseLesson4SubsectionInventory() {
      return NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS),
        generationAllowed: false
      }));
    }
    function buildNuclearClauseLesson4PursuitFrame() {
      const inventory = getNuclearClauseLesson4SubsectionInventory();
      const pdfRefs = inventory.map(entry => entry.pdfRef);
      return {
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 4,
        aimStatus: "shooting",
        plannedArrows: [{
          id: "lesson-4-subsection-coverage-audit",
          type: "metadata-diagnostic-test",
          aim: "Aplicar Corrección antes de existencia: exponer Andrews Lección 4.1-4.6 por la ruta de entrada a salida como comportamiento de fórmula, sujeto, predicado, orden y ranuras antes de tratar la arquitectura visible CNV/CNN como implementada, con sonda de fallo contra fórmula existente que ponga tiempo en CNN o num1-num2 dentro del predicado.",
          andrewsRefs: pdfRefs,
          expectedFeedbackRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS)
        }, {
          id: "lesson-4-formula-authority-audit",
          type: "formula-engine-test",
          aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 4.3-4.5 por la ruta de entrada a salida como comportamiento de autoridad de fórmula CNV/CNN, con sonda de fallo para detectar existencia de fórmula que cambie orden, dueño de ranura, límite de predicado o ausencia de tiempo en CNN.",
          andrewsRefs: pdfRefs,
          expectedFeedbackRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-4-subsection-coverage-audit",
          result: "hit",
          correction: "Corrección antes de existencia: Lección 4 lleva referencias de PDF por subsección, directivas en español, acciones de redirección, referencias de validación y política sin generación; la ruta de entrada a salida conserva comportamiento de ranuras y límites, y la sonda de fallo contra existencia sola es una fórmula con tiempo en CNN o num1-num2 dentro del predicado.",
          andrewsRefs: pdfRefs,
          feedbackRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS)
        }, {
          id: "lesson-4-formula-authority-audit",
          result: "hit",
          correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews ahora queda explícita como comportamiento de contrato para CNV/CNN; la sonda de fallo contra existencia sola es un metadato o eco visible que cambie orden, dueño de ranura, límite de predicado o ausencia de tiempo en CNN.",
          andrewsRefs: pdfRefs,
          feedbackRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS)
        }],
        hitCount: 2,
        missCount: 0,
        remainingGaps: ["Sentence syntax and formula data registry remain partial.", "Personal-pronoun reference for 3a person remains context-required.", "Lessons 5-16 still govern detailed CNV/CNN filler paradigms."],
        closestPass: false
      };
    }
    function getNuclearClauseLesson4PredicateFunctionProfile(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return {
          kind: "lesson-4-predicate-function-profile",
          formulaType: normalizedFormulaType,
          sourceSection: "Andrews §4.2",
          labelEs: "CNV: predicado verbal",
          predicateRoleEs: "predicado verbal",
          functionalContrastEs: "La CNV funciona como predicado verbal; su predicador puede ser intransitivo o transitivo.",
          predicatorValuesEs: ["verbo intransitivo", "verbo transitivo"],
          copularLike: false,
          hasTensePosition: true
        };
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return {
          kind: "lesson-4-predicate-function-profile",
          formulaType: normalizedFormulaType,
          sourceSection: "Andrews §4.2",
          labelEs: "CNN: predicado nominal",
          predicateRoleEs: "predicado nominal de valor copulativo",
          functionalContrastEs: "La CNN corresponde a un predicado con valor sustantivo, adjetivo o adverbial; no tiene posición de tiempo.",
          predicatorValuesEs: ["sustantivo", "adjetivo", "adverbial"],
          copularLike: true,
          hasTensePosition: false
        };
      }
      return {
        kind: "lesson-4-predicate-function-profile",
        formulaType: normalizedFormulaType,
        sourceSection: "Andrews §4.2",
        labelEs: "CN: predicado sin clasificar",
        predicateRoleEs: "predicado sin clasificar",
        functionalContrastEs: "La clase CNV/CNN todavía no está fijada.",
        predicatorValuesEs: [],
        copularLike: null,
        hasTensePosition: null
      };
    }
    function buildNuclearClauseLesson4UseFrame({
      usageRole = ""
    } = {}) {
      const activeRole = normalizeNuclearClauseLesson4UsageRole(usageRole);
      return {
        kind: "lesson-4-nuclear-clause-use-frame",
        sourceSection: "Andrews §4.1",
        activeRole,
        activeRoleLabelEs: getNuclearClauseLesson4UsageOptionLabel(activeRole),
        options: NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS.map(entry => ({
          ...entry,
          isActive: entry.role === activeRole
        })),
        diagnosticStatus: activeRole === NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified ? "context-required" : "classified",
        diagnosticId: activeRole === NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified ? "lesson4-nuclear-clause-use-unspecified" : "lesson4-nuclear-clause-use-classified",
        reminderEs: "La unidad visible es una cláusula nuclear, no una palabra aislada."
      };
    }
    function buildNuclearClauseLesson4PredicatePositionControlFrame({
      formulaType = "",
      predicatePositionStatus = "",
      statusSource = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeStatus = normalizeNuclearClausePredicatePositionStatus(predicatePositionStatus);
      const entries = (NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS[normalizedFormulaType] ? [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant] : []).map(status => {
        const record = buildNuclearClauseLesson4FormulaRecord({
          formulaType: normalizedFormulaType,
          predicatePositionStatus: status
        });
        const roleLabel = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic ? "valencia doble" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic ? "valencia simple" : "sin valencia explícita" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic ? "estado doble" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic ? "estado simple" : "sin estado explícito";
        return {
          ...record,
          roleLabelEs: roleLabel,
          labelEs: `${roleLabel} · ${record.predicatePositionSlot}`,
          isActive: status === activeStatus,
          diagnosticId: `${normalizedFormulaType.toLowerCase()}-${record.predicatePositionSlot === "Ø" ? "vacant" : record.predicatePositionSlot}-position`
        };
      });
      return {
        kind: "lesson-4-predicate-position-control-frame",
        sourceSection: "Andrews §4.5",
        formulaType: normalizedFormulaType,
        predicatePositionLabel: getNuclearClausePredicatePositionLabel(normalizedFormulaType),
        activeStatus,
        activeSlot: getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, activeStatus),
        activeFormula: entries.find(entry => entry.isActive) || null,
        statusSource: statusSource || "diagnostic-inference",
        diagnosticStatus: statusSource === "explicit" ? "explicit" : "diagnostic-only",
        diagnosticId: statusSource === "explicit" ? "lesson4-predicate-position-explicit" : "lesson4-predicate-position-inferred",
        options: entries
      };
    }
    function buildNuclearClauseLesson4DiagramTree({
      formulaType = "",
      predicatePositionStatus = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeSlot = getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, predicatePositionStatus);
      const predicateChildren = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? [{
        key: "verbcore",
        labelEs: "Núcleo verbal",
        role: "core",
        children: [{
          key: "valence",
          labelEs: "Valencia",
          slot: activeSlot,
          role: "predicate-position"
        }, {
          key: "stem",
          labelEs: "Base (STEM)",
          role: "foundation"
        }]
      }, {
        key: "tense",
        labelEs: "Tiempo",
        slot: ANDREWS_NUCLEAR_SLOT.tensePosition,
        role: "tense-position"
      }] : [{
        key: "state",
        labelEs: "Estado",
        slot: activeSlot,
        role: "predicate-position"
      }, {
        key: "stem",
        labelEs: "Base (STEM)",
        role: "foundation"
      }];
      return {
        kind: "lesson-4-subject-predicate-tree",
        sourceSections: ["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"],
        formulaType: normalizedFormulaType,
        labelEs: `${getNuclearClauseFormulaAbbreviation(normalizedFormulaType)} = Sujeto + Predicado`,
        root: {
          key: "nuclear-clause",
          labelEs: getNuclearClauseDisplayLabel(normalizedFormulaType),
          role: "nuclear-clause",
          children: [{
            key: "subject",
            labelEs: "Sujeto",
            slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2,
            role: "subject"
          }, {
            key: "predicate",
            labelEs: "Predicado",
            role: "predicate",
            children: predicateChildren
          }]
        },
        foundationKey: "stem"
      };
    }
    function normalizeNuclearClausePronounNumber(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (["sg", "singular", "s"].includes(normalized)) {
        return "sg";
      }
      if (["pl", "plural", "p"].includes(normalized)) {
        return "pl";
      }
      if (["none", "ninguno", "absent"].includes(normalized)) {
        return "none";
      }
      return normalized || "unknown";
    }
    function getNuclearClausePronounPersonLabel(person = null) {
      if (person === 1 || String(person) === "1") {
        return "1a persona";
      }
      if (person === 2 || String(person) === "2") {
        return "2a persona";
      }
      if (person === 3 || String(person) === "3") {
        return "3a persona";
      }
      return "persona sin resolver";
    }
    function getNuclearClausePronounNumberLabel(number = "") {
      const normalized = normalizeNuclearClausePronounNumber(number);
      if (normalized === "sg") {
        return "singular";
      }
      if (normalized === "pl") {
        return "plural";
      }
      if (normalized === "none") {
        return "sin número";
      }
      return "número sin resolver";
    }
    function getNuclearClauseSubjectPronounFeatures(slot = null) {
      const prefix = String(slot?.prefix || "");
      const suffix = String(slot?.suffix || "");
      const info = typeof targetObject.getPers1Pers2Info === "function" ? targetObject.getPers1Pers2Info(prefix, suffix) : null;
      if (info) {
        return {
          person: info.person,
          number: normalizeNuclearClausePronounNumber(info.number),
          source: "agreement-map"
        };
      }
      if (!prefix && !suffix) {
        return {
          person: 3,
          number: "sg",
          source: "zero-third-person-candidate"
        };
      }
      return null;
    }
    function getNuclearClauseObjectPronounFeatures(slot = null) {
      const prefix = String(slot?.prefix || "");
      if (!prefix) {
        return null;
      }
      const info = typeof targetObject.getObj1PersonInfo === "function" ? targetObject.getObj1PersonInfo(prefix) : null;
      return info ? {
        person: info.person,
        number: normalizeNuclearClausePronounNumber(info.number),
        source: "agreement-map"
      } : null;
    }
    function getNuclearClausePossessivePronounFeatures(prefix = "") {
      const normalizedPrefix = String(prefix || "");
      const sourceEntry = NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES[normalizedPrefix];
      return sourceEntry ? {
        person: sourceEntry.person,
        number: normalizeNuclearClausePronounNumber(sourceEntry.number),
        source: "nawat-possessive-prefix-inventory"
      } : null;
    }
    function getNuclearClausePossessivePrefixFromSlot(predicateSlot = null) {
      const stateSlot = predicateSlot?.stateSlot && typeof predicateSlot.stateSlot === "object" ? predicateSlot.stateSlot : null;
      return String(stateSlot?.possessorPrefix || stateSlot?.possessor || stateSlot?.prefix || stateSlot?.possessivePrefix || predicateSlot?.possessorPrefix || predicateSlot?.possessor || "");
    }
    function buildNuclearClausePersonalPronounFillerRecord({
      caseKey = "",
      slot = null,
      role = "",
      prefix = "",
      suffix = "",
      features = null
    } = {}) {
      const displayPrefix = String(prefix || "") || "Ø";
      const displaySuffix = String(suffix || "") || "Ø";
      const isThirdPerson = features?.person === 3;
      const isCommonNumberCandidate = isThirdPerson && normalizeNuclearClausePronounNumber(features?.number) === "sg";
      const diagnostics = [];
      if (!features) {
        diagnostics.push({
          id: `lesson4-${caseKey}-pronoun-unresolved`,
          severity: "diagnostic",
          messageEs: "Relleno pronominal sin persona/número resuelto."
        });
      }
      if (isThirdPerson) {
        diagnostics.push({
          id: `lesson4-${caseKey}-third-person-reference-context`,
          severity: "diagnostic",
          messageEs: "La 3a persona requiere contexto para deixis, anáfora o catáfora."
        });
      }
      if (isCommonNumberCandidate) {
        diagnostics.push({
          id: `lesson4-${caseKey}-common-number-context`,
          severity: "diagnostic",
          messageEs: "La lectura singular/común se resuelve por contexto."
        });
      }
      return {
        caseKey,
        caseLabelEs: caseKey === "nominative" ? "nominativo" : caseKey === "objective" ? "objetivo" : "posesivo",
        slot: String(slot || ""),
        role: String(role || ""),
        prefix: String(prefix || ""),
        suffix: String(suffix || ""),
        display: suffix ? `${displayPrefix}-${displaySuffix}` : displayPrefix,
        isPresent: Boolean(prefix || suffix || caseKey === "nominative"),
        features: features ? {
          person: features.person,
          personLabelEs: getNuclearClausePronounPersonLabel(features.person),
          number: normalizeNuclearClausePronounNumber(features.number),
          numberLabelEs: getNuclearClausePronounNumberLabel(features.number),
          case: caseKey,
          animacy: features.person === 3 ? "contextual" : "speaker/addressee",
          humanness: features.person === 3 ? "contextual" : "human",
          commonNumberAmbiguous: isCommonNumberCandidate,
          source: features.source || "unknown"
        } : null,
        referenceResolution: {
          modes: ["deixis", "anáfora", "catáfora"],
          status: isThirdPerson ? "context-required" : "participant-anchored"
        },
        diagnostics
      };
    }
    function buildNuclearClauseLesson4PersonalPronounResolutionFrame({
      formulaType = "",
      slots = null
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const sourceSlots = slots && typeof slots === "object" ? slots : {};
      const fillers = [];
      const subjectSlot = sourceSlots.pers1Pers2 || null;
      if (subjectSlot) {
        fillers.push(buildNuclearClausePersonalPronounFillerRecord({
          caseKey: "nominative",
          slot: subjectSlot.slot || ANDREWS_NUCLEAR_SLOT.pers1Pers2,
          role: "sujeto",
          prefix: subjectSlot.prefix || "",
          suffix: subjectSlot.suffix || "",
          features: getNuclearClauseSubjectPronounFeatures(subjectSlot)
        }));
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        ["obj1", "obj2", "obj3", "reflexivo"].forEach(slotKey => {
          const slot = sourceSlots[slotKey] || null;
          const prefix = String(slot?.prefix || "");
          if (!prefix) {
            return;
          }
          fillers.push(buildNuclearClausePersonalPronounFillerRecord({
            caseKey: "objective",
            slot: slot.slot || slotKey,
            role: slot.role || "objeto",
            prefix,
            features: getNuclearClauseObjectPronounFeatures(slot)
          }));
        });
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        const predicateSlot = sourceSlots.predicateStem || null;
        const possessorPrefix = getNuclearClausePossessivePrefixFromSlot(predicateSlot);
        if (possessorPrefix) {
          fillers.push(buildNuclearClausePersonalPronounFillerRecord({
            caseKey: "possessive",
            slot: "poseedor",
            role: "poseedor",
            prefix: possessorPrefix,
            features: getNuclearClausePossessivePronounFeatures(possessorPrefix)
          }));
        }
      }
      const diagnostics = fillers.flatMap(entry => entry.diagnostics || []);
      const hasThirdPersonContext = fillers.some(entry => entry.features?.person === 3);
      const hasCommonNumberAmbiguity = fillers.some(entry => entry.features?.commonNumberAmbiguous);
      return {
        ...getNuclearClausePersonalPronounFrame(),
        resolutionKind: "lesson-4-personal-pronoun-resolution",
        sourceSection: "Andrews §4.6",
        formulaType: normalizedFormulaType,
        fillers,
        referenceResolution: {
          modes: ["deixis", "anáfora", "catáfora"],
          status: hasThirdPersonContext ? "context-required" : "participant-anchored"
        },
        animacyHumannessResolution: {
          status: hasThirdPersonContext ? "context-required" : "participant-anchored",
          noteEs: hasThirdPersonContext ? "La animacidad/humanidad de la 3a persona no sale de la forma sola." : "1a/2a persona se ancla en participantes del habla."
        },
        commonNumberResolution: {
          ambiguous: hasCommonNumberAmbiguity,
          status: hasCommonNumberAmbiguity ? "context-required" : "resolved-or-not-applicable"
        },
        diagnostics
      };
    }
    function getNuclearClauseLesson4StatusSourceLabel(statusSource = "") {
      const normalized = String(statusSource || "").trim();
      if (normalized === "explicit") {
        return "explícito";
      }
      if (normalized === "inferred-from-visible-fillers") {
        return "inferido por rellenos visibles";
      }
      return "diagnóstico";
    }
    function buildNuclearClauseLesson4Frame({
      formulaType = "",
      predicatePositionStatus = "",
      predicatePositionStatusSource = "",
      usageRole = "",
      slots = null
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeFormula = buildNuclearClauseLesson4FormulaRecord({
        formulaType: normalizedFormulaType,
        predicatePositionStatus
      });
      const useFrame = buildNuclearClauseLesson4UseFrame({
        usageRole
      });
      const predicateFunctionProfile = getNuclearClauseLesson4PredicateFunctionProfile(normalizedFormulaType);
      const predicatePositionControl = buildNuclearClauseLesson4PredicatePositionControlFrame({
        formulaType: normalizedFormulaType,
        predicatePositionStatus,
        statusSource: predicatePositionStatusSource
      });
      const diagramTree = buildNuclearClauseLesson4DiagramTree({
        formulaType: normalizedFormulaType,
        predicatePositionStatus
      });
      const pronounFrame = buildNuclearClauseLesson4PersonalPronounResolutionFrame({
        formulaType: normalizedFormulaType,
        slots
      });
      const subsectionInventory = getNuclearClauseLesson4SubsectionInventory();
      const pursuit = buildNuclearClauseLesson4PursuitFrame();
      return {
        kind: "nuclear-clause-lesson-4-frame",
        structuralSource: "Andrews Lesson 4",
        sections: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"],
        pdfRefs: subsectionInventory.map(entry => entry.pdfRef),
        subsectionInventory,
        pursuit,
        isGeneration: false,
        nuclearClauseIsWord: false,
        particlesAreExcluded: true,
        vocableScopeFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME,
          requiredFunctions: Array.from(NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME.requiredFunctions),
          useRoles: Array.from(NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME.useRoles)
        },
        formulaBoundaryFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME,
          sourceSections: Array.from(NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME.sourceSections)
        },
        subjectFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME,
          occursIn: Array.from(NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME.occursIn)
        },
        positionComplexityFrame: cloneNuclearClausePositionComplexityFrame(),
        useFrame,
        predicateFunctionProfile,
        activeFormula,
        formulaStages: [{
          stage: 1,
          sourceSection: "Andrews §4.3",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA,
          role: "sujeto + predicado"
        }, {
          stage: 2,
          sourceSection: "Andrews §4.4",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[normalizedFormulaType] || "",
          role: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? "predicado = valencia + base + tiempo" : "predicado = estado + base"
        }, activeFormula],
        organizationalLayers: getNuclearClauseOrganizationalLayers(normalizedFormulaType),
        diagramTree,
        predicatePositionControl,
        personalPronounFrame: pronounFrame,
        inventory: getNuclearClauseLesson4FormulaInventory(),
        boundaries: {
          formulaInventoryIsNotGeneration: true,
          subjectAndPredicateRequired: true,
          stemIsFoundation: true,
          personalPronounsAreAffixalOnly: true,
          objectiveCaseOnlyInVncPredicate: true,
          possessiveCaseOnlyInNncPredicate: true
        },
        diagnostics: [{
          id: useFrame.diagnosticId,
          severity: useFrame.diagnosticStatus === "classified" ? "info" : "diagnostic",
          messageEs: useFrame.diagnosticStatus === "classified" ? `Uso de CN: ${useFrame.activeRoleLabelEs}.` : "Uso de CN pendiente: oración simple, cláusula principal, dependiente o coordinada."
        }, {
          id: predicatePositionControl.diagnosticId,
          severity: predicatePositionControl.diagnosticStatus === "explicit" ? "info" : "diagnostic",
          messageEs: `${predicatePositionControl.predicatePositionLabel}: ${activeFormula.predicatePositionStatusLabel} (${getNuclearClauseLesson4StatusSourceLabel(predicatePositionStatusSource)}).`
        }, ...pronounFrame.diagnostics]
      };
    }
    function inferVerbalPredicatePositionStatus({
      object = null,
      object2 = null,
      object3 = null,
      reflexive = null,
      predicate = null
    } = {}) {
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicate?.valenceStructure || predicate?.valenceStatus || predicate?.predicatePositionStatus || object?.valenceStructure || object?.predicatePositionStatus || "");
      if (explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return explicitStatus;
      }
      const hasSecondaryValence = Boolean(object2?.prefix || object2?.obj2 || object?.obj2 || object3?.prefix || object3?.obj3 || object?.obj3);
      if (hasSecondaryValence) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      const objectPrefix = String(object?.prefix || object?.objectPrefix || "");
      const reflexivePrefix = String(reflexive?.prefix || reflexive?.reflexivo || object?.reflexivo || "");
      const lesson6ObjectStatus = getLesson6VerbalObjectPositionStatus(objectPrefix, reflexivePrefix);
      if (lesson6ObjectStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return lesson6ObjectStatus;
      }
      const hasValence = Boolean(object?.prefix || object?.objectPrefix || reflexive?.prefix || reflexive?.reflexivo || object?.reflexivo);
      return hasValence ? NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic : NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
    }
    const LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES = Object.freeze(["nech", "tech", "metz", "metzin", "ki", "k", "kin", "n-ech", "t-ech", "m-etz", "m-etz-in", "ki-0", "k-0", "k-in", "m-u", "m-0"]);
    const LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES = Object.freeze(["te", "ta"]);
    const LESSON6_MONADIC_OBJECT_PREFIXES = Object.freeze(["ne", ...LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES]);
    function getLesson6VerbalObjectPositionStatus(objectPrefix = "", reflexivePrefix = "") {
      const objectValue = String(objectPrefix || "").trim();
      const reflexiveValue = String(reflexivePrefix || "").trim();
      if (reflexiveValue || objectValue === "mu") {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES.includes(objectValue)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (LESSON6_MONADIC_OBJECT_PREFIXES.includes(objectValue)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown;
    }
    function getVerbalPredicatePositionStatusSource({
      object = null,
      predicate = null
    } = {}) {
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicate?.valenceStructure || predicate?.valenceStatus || predicate?.predicatePositionStatus || object?.valenceStructure || object?.predicatePositionStatus || "");
      return explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown ? "explicit" : "inferred-from-visible-fillers";
    }
    function inferNominalPredicatePositionStatus({
      predicate = null,
      formulaSlots = null,
      predicateState = ""
    } = {}) {
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const stateSlot = predicateSource.stateSlot || null;
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicateSource.stateStructure || predicateSource.stateStatus || predicateSource.predicatePositionStatus || stateSlot?.stateStructure || stateSlot?.predicatePositionStatus || "");
      if (explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return explicitStatus;
      }
      if (stateSlot?.isDyadic === true || stateSlot?.statePosition === "dyadic") {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (stateSlot?.isVacant === false || stateSlot?.hasPossessor || stateSlot?.statePosition === "possessor" || String(predicateSource.state || predicateState || "").trim().toLowerCase() === "possessive") {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
    }
    function getNominalPredicatePositionStatusSource({
      predicate = null,
      formulaSlots = null
    } = {}) {
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const stateSlot = predicateSource.stateSlot || null;
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicateSource.stateStructure || predicateSource.stateStatus || predicateSource.predicatePositionStatus || stateSlot?.stateStructure || stateSlot?.predicatePositionStatus || "");
      return explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown ? "explicit" : "inferred-from-visible-fillers";
    }
    function buildClauseParticipantSlot({
      slot = "",
      prefix = "",
      suffix = "",
      role = "",
      label = ""
    } = {}) {
      return {
        slot: String(slot || ""),
        role: String(role || slot || ""),
        prefix: String(prefix || ""),
        suffix: String(suffix || ""),
        displayPrefix: String(prefix || "") || "Ø",
        displaySuffix: String(suffix || "") || "Ø",
        label: String(label || "")
      };
    }
    function getNuclearClauseShellResultFrame(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = input.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : input.frames && typeof input.frames === "object" ? input.frames : null;
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function normalizeNuclearClauseShellSurface(value = "") {
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitNuclearClauseShellSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeNuclearClauseShellSurface(entry)).filter(Boolean);
    }
    function getNuclearClauseShellFramedSurface(input = null) {
      const resultFrame = getNuclearClauseShellResultFrame(input);
      if (!resultFrame) {
        return null;
      }
      const forms = [];
      if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame.surface) {
        forms.push(resultFrame.surface);
      }
      return forms.flatMap(entry => splitNuclearClauseShellSurfaceText(entry))[0] || "";
    }
    function resolveNuclearClauseShellText(input = null, fields = [], fallback = "") {
      const framedSurface = getNuclearClauseShellFramedSurface(input);
      if (framedSurface !== null) {
        return framedSurface;
      }
      const source = input && typeof input === "object" ? input : {};
      for (const field of fields) {
        const value = normalizeNuclearClauseShellSurface(source[field]);
        if (value) {
          return value;
        }
      }
      return normalizeNuclearClauseShellSurface(fallback);
    }
    function buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots = null) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const subject = getNuclearClauseFormulaSlot(formulaSlots, "pers1Pers2") || {};
      const object = getNuclearClauseFormulaSlot(formulaSlots, "obj1") || {};
      const object2 = getNuclearClauseFormulaSlot(formulaSlots, "obj2") || {};
      const object3 = getNuclearClauseFormulaSlot(formulaSlots, "obj3") || {};
      const reflexive = getNuclearClauseFormulaSlot(formulaSlots, "reflexivo") || {};
      const predicate = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || {};
      const tense = getNuclearClauseFormulaSlot(formulaSlots, "tensePosition") || {};
      const numberConnector = getNuclearClauseFormulaSlot(formulaSlots, "num1Num2") || {};
      const subjectDisplay = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const subjectCaseDisplay = String(subject.displayCase || subject.case || subject.pers2 || "Ø") || "Ø";
      const objectDisplay = String(object.displayPrefix || object.prefix || "Ø") || "Ø";
      const object2Display = String(object2.displayPrefix || object2.prefix || "");
      const object3Display = String(object3.displayPrefix || object3.prefix || "");
      const reflexiveDisplay = String(reflexive.displayPrefix || reflexive.prefix || "");
      const rawPredicateDisplay = String(predicate.displayStem || predicate.stem || "∅") || "∅";
      const normalizedPredicateDisplay = rawPredicateDisplay.trim() || "∅";
      const predicateDisplay = normalizedPredicateDisplay.includes("(") && normalizedPredicateDisplay.includes(")") ? normalizedPredicateDisplay : `(${normalizedPredicateDisplay})`;
      const tenseDisplay = String(tense.displayMorph || tense.morph || tense.tenseMorph || tense.label || tense.tenseValue || "Ø") || "Ø";
      const rawNumberConnector = String(numberConnector.displayConnector || numberConnector.displaySurface || numberConnector.connector || numberConnector.surface || subject.suffix || "").trim();
      const numberConnectorDisplay = rawNumberConnector ? rawNumberConnector.includes("-") ? rawNumberConnector : `Ø-${rawNumberConnector}` : "Ø-Ø";
      const objectChain = [];
      if (object.prefix || object.displayPrefix && object.displayPrefix !== "Ø") {
        objectChain.push(objectDisplay);
      }
      if (object2.prefix || object2Display && object2Display !== "Ø") {
        objectChain.push(object2Display);
      }
      if (object3.prefix || object3Display && object3Display !== "Ø") {
        objectChain.push(object3Display);
      }
      if ((reflexive.prefix || reflexiveDisplay) && reflexiveDisplay !== "Ø" && reflexiveDisplay !== objectDisplay) {
        objectChain.push(reflexiveDisplay);
      }
      const objectPart = objectChain.length ? `+${objectChain.join("-")}` : "";
      return `#${subjectDisplay}-${subjectCaseDisplay}${objectPart}${predicateDisplay}${tenseDisplay}+${numberConnectorDisplay}#`;
    }
    function buildVerbalNuclearClauseShell({
      subject = null,
      object = null,
      object2 = null,
      object3 = null,
      reflexive = null,
      predicate = null,
      tenseValue = "",
      tenseLabel = "",
      usageRole = ""
    } = {}) {
      const subjectSlot = buildClauseParticipantSlot({
        slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2,
        role: "subject",
        prefix: subject?.prefix ?? subject?.subjectPrefix ?? "",
        suffix: subject?.suffix ?? subject?.subjectSuffix ?? "",
        label: subject?.label || ""
      });
      const subjectNumberConnector = subject?.numberConnector ?? subject?.num1Num2 ?? subject?.suffix ?? subject?.subjectSuffix ?? "";
      const numberConnectorFrame = buildLesson5VncNumberConnectorSlot({
        subjectNumberConnector,
        subjectPrefix: subjectSlot.prefix,
        tenseValue,
        tenseLabel
      });
      const numberConnectorSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.numberConnector,
        role: "subject-number-connector",
        connector: numberConnectorFrame.connector,
        displayConnector: numberConnectorFrame.displayConnector,
        num1: numberConnectorFrame.num1,
        num2: numberConnectorFrame.num2,
        belongsTo: "subject",
        notTense: true,
        andrewsSource: numberConnectorFrame.andrewsSource || "Andrews §5.4",
        orthographyBridge: numberConnectorFrame.orthographyBridge || ""
      };
      if (Array.isArray(numberConnectorFrame.connectorOptions) && numberConnectorFrame.connectorOptions.length) {
        numberConnectorSlot.connectorOptions = numberConnectorFrame.connectorOptions.slice();
      }
      if (Array.isArray(numberConnectorFrame.num1Options) && numberConnectorFrame.num1Options.length) {
        numberConnectorSlot.num1Options = numberConnectorFrame.num1Options.slice();
      }
      if (Array.isArray(numberConnectorFrame.num2Options) && numberConnectorFrame.num2Options.length) {
        numberConnectorSlot.num2Options = numberConnectorFrame.num2Options.slice();
      }
      if (numberConnectorFrame.andrewsConnectorPattern) {
        numberConnectorSlot.andrewsConnectorPattern = numberConnectorFrame.andrewsConnectorPattern;
      }
      if (numberConnectorFrame.nawatConnectorPattern) {
        numberConnectorSlot.nawatConnectorPattern = numberConnectorFrame.nawatConnectorPattern;
      }
      const objectPrefix = object?.prefix ?? object?.objectPrefix ?? "";
      const objectSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.object1,
        role: "mainline-object",
        prefix: String(objectPrefix || ""),
        displayPrefix: String(objectPrefix || "") || "Ø",
        isPresent: Boolean(objectPrefix),
        label: object?.label || ""
      };
      const object2Prefix = object2?.prefix ?? object2?.obj2 ?? object?.obj2 ?? object?.indirectObjectMarker ?? "";
      const object2Slot = {
        slot: ANDREWS_NUCLEAR_SLOT.object2,
        role: "secondary-object",
        prefix: String(object2Prefix || ""),
        displayPrefix: String(object2Prefix || "") || "Ø",
        isPresent: Boolean(object2Prefix),
        label: object2?.label || ""
      };
      const object3Prefix = object3?.prefix ?? object3?.obj3 ?? object?.obj3 ?? object?.thirdObjectMarker ?? "";
      const object3Slot = {
        slot: ANDREWS_NUCLEAR_SLOT.object3,
        role: "tertiary-object",
        prefix: String(object3Prefix || ""),
        displayPrefix: String(object3Prefix || "") || "Ø",
        isPresent: Boolean(object3Prefix),
        label: object3?.label || ""
      };
      const reflexivePrefix = reflexive?.prefix ?? reflexive?.reflexivo ?? object?.reflexivo ?? "";
      const reflexiveSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.reflexive,
        role: "reflexive-object",
        prefix: String(reflexivePrefix || ""),
        displayPrefix: String(reflexivePrefix || "") || "Ø",
        isPresent: Boolean(reflexivePrefix),
        label: reflexive?.label || ""
      };
      const predicateStem = predicate?.stem ?? predicate?.verb ?? "";
      const predicateSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.predicateStem,
        role: "verbal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateStem || "") || "∅",
        valency: predicate?.valency || ""
      };
      const tenseProfile = getLesson5VncTenseProfile(tenseValue, tenseLabel);
      const tenseMorph = getLesson5VncTenseMorph(tenseProfile, numberConnectorFrame);
      const compatibilityTenseLabel = String(tenseLabel || tenseValue || "");
      const tenseSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.tensePosition,
        role: "tense-position",
        tenseValue: String(tenseValue || ""),
        label: tenseProfile?.labelEs || compatibilityTenseLabel,
        compatibilityLabel: compatibilityTenseLabel,
        morph: tenseMorph,
        displayMorph: tenseMorph || compatibilityTenseLabel,
        mood: tenseProfile?.mood || "",
        andrewsTense: tenseProfile?.tense || "",
        isPresent: Boolean(tenseValue || tenseLabel),
        notAvailableInOrdinaryNnc: true,
        andrewsSource: tenseProfile?.sourceSection || "",
        compatibilityRoute: ""
      };
      const formulaSlots = {
        pers1Pers2: {
          ...subjectSlot,
          slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2
        },
        obj1: {
          ...objectSlot,
          slot: ANDREWS_NUCLEAR_SLOT.object1
        },
        obj2: {
          ...object2Slot,
          slot: ANDREWS_NUCLEAR_SLOT.object2
        },
        obj3: {
          ...object3Slot,
          slot: ANDREWS_NUCLEAR_SLOT.object3
        },
        reflexivo: {
          ...reflexiveSlot,
          slot: ANDREWS_NUCLEAR_SLOT.reflexive
        },
        predicateStem: {
          ...predicateSlot,
          slot: ANDREWS_NUCLEAR_SLOT.predicateStem
        },
        tensePosition: tenseSlot,
        num1Num2: numberConnectorSlot
      };
      const terminology = getNuclearClauseTerminologyForFormulaType(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc);
      const predicatePositionStatus = inferVerbalPredicatePositionStatus({
        object,
        object2,
        object3,
        reflexive,
        predicate
      });
      const predicatePositionStatusSource = getVerbalPredicatePositionStatusSource({
        object,
        predicate
      });
      const lesson4 = buildNuclearClauseLesson4Frame({
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc,
        predicatePositionStatus,
        predicatePositionStatusSource,
        usageRole,
        slots: formulaSlots
      });
      return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc,
        formulaAbbreviation: terminology.abbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc),
        terminology,
        formula: lesson4.activeFormula.formula,
        expandedFormula: VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA,
        formulaSlots,
        formulaEcho: buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots),
        lesson4,
        predicatePositionStatus,
        predicatePositionStatusSource,
        predicateFunctionProfile: lesson4.predicateFunctionProfile,
        clauseUseFrame: lesson4.useFrame,
        diagramTree: lesson4.diagramTree,
        predicatePositionControl: lesson4.predicatePositionControl,
        organizationalLayers: lesson4.organizationalLayers,
        personalPronounFrame: lesson4.personalPronounFrame,
        hasTensePosition: true,
        slots: {
          pers1Pers2: subjectSlot,
          obj1: objectSlot,
          obj2: object2Slot,
          obj3: object3Slot,
          reflexivo: reflexiveSlot,
          predicateStem: predicateSlot,
          tensePosition: tenseSlot,
          num1Num2: numberConnectorSlot
        }
      };
    }
    function buildNominalNuclearClauseShell({
      subject = null,
      predicate = null,
      formulaSlots = null,
      formulaEcho = "",
      predicateState = "",
      usageRole = ""
    } = {}) {
      const subjectSource = getNuclearClauseFormulaSlot(formulaSlots, "pers1Pers2") || subject || {};
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const connectorSource = getNuclearClauseFormulaSlot(formulaSlots, "num1Num2") || {};
      const subjectSlot = buildClauseParticipantSlot({
        slot: subjectSource.slot || ANDREWS_NUCLEAR_SLOT.pers1Pers2,
        role: "subject",
        prefix: subjectSource.prefix || subjectSource.subjectPrefix || "",
        suffix: subjectSource.suffix || subjectSource.subjectSuffix || "",
        label: subjectSource.label || ""
      });
      const predicateStem = resolveNuclearClauseShellText(predicateSource, ["stem", "surface"], predicate?.stem || "");
      const predicateSlot = {
        slot: predicateSource.slot || ANDREWS_NUCLEAR_SLOT.predicateStem,
        role: "nominal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateStem || "") || "∅",
        state: predicateSource.state || predicateState || "unknown",
        stateSlot: predicateSource.stateSlot || null
      };
      const connectorSlot = {
        slot: connectorSource.slot || ANDREWS_NUCLEAR_SLOT.numberConnector,
        role: "subject-number-connector",
        connector: resolveNuclearClauseShellText(connectorSource, ["connector", "surface"], ""),
        displayConnector: resolveNuclearClauseShellText(connectorSource, ["displayConnector", "displaySurface", "connector"], "Ø") || "Ø",
        nounClass: connectorSource.nounClass || "",
        notLexicalSuffix: true,
        notTense: true
      };
      const echo = formulaEcho || `#${subjectSlot.displayPrefix}-${subjectSlot.displaySuffix}(${predicateSlot.displayStem})${connectorSlot.displayConnector}#`;
      const terminology = getNuclearClauseTerminologyForFormulaType(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc);
      const predicatePositionStatus = inferNominalPredicatePositionStatus({
        predicate,
        formulaSlots,
        predicateState
      });
      const predicatePositionStatusSource = getNominalPredicatePositionStatusSource({
        predicate,
        formulaSlots
      });
      const lesson4Slots = {
        pers1Pers2: subjectSlot,
        predicateStem: predicateSlot,
        num1Num2: connectorSlot
      };
      const lesson4 = buildNuclearClauseLesson4Frame({
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc,
        predicatePositionStatus,
        predicatePositionStatusSource,
        usageRole,
        slots: lesson4Slots
      });
      return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc,
        formulaAbbreviation: terminology.abbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc),
        terminology,
        formula: lesson4.activeFormula.formula,
        expandedFormula: NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA,
        formulaEcho: echo,
        lesson4,
        predicatePositionStatus,
        predicatePositionStatusSource,
        predicateFunctionProfile: lesson4.predicateFunctionProfile,
        clauseUseFrame: lesson4.useFrame,
        diagramTree: lesson4.diagramTree,
        predicatePositionControl: lesson4.predicatePositionControl,
        organizationalLayers: lesson4.organizationalLayers,
        personalPronounFrame: lesson4.personalPronounFrame,
        hasTensePosition: false,
        slots: lesson4Slots
      };
    }
    function buildNuclearClauseShellMetadata(options = {}) {
      const clauseKind = normalizeNuclearClauseKind(options.clauseKind || options.kind || options.tenseMode || "");
      const formulaType = getNuclearClauseFormulaType(clauseKind);
      const terminology = getNuclearClauseTerminologyForFormulaType(formulaType);
      const formulaAbbreviation = terminology.abbreviation || "CN";
      const payload = clauseKind === NUCLEAR_CLAUSE_KIND.verbal ? buildVerbalNuclearClauseShell(options) : clauseKind === NUCLEAR_CLAUSE_KIND.nominal ? buildNominalNuclearClauseShell(options) : {
        formulaType,
        formulaAbbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(formulaType),
        terminology,
        formula: "",
        formulaEcho: "",
        lesson4: null,
        predicateFunctionProfile: getNuclearClauseLesson4PredicateFunctionProfile(formulaType),
        clauseUseFrame: buildNuclearClauseLesson4UseFrame({
          usageRole: options.usageRole || ""
        }),
        diagramTree: null,
        predicatePositionControl: null,
        organizationalLayers: [],
        personalPronounFrame: getNuclearClausePersonalPronounFrame(),
        hasTensePosition: null,
        slots: {}
      };
      const shell = {
        kind: "nuclear-clause-shell",
        version: NUCLEAR_CLAUSE_SHELL_VERSION,
        source: "Andrews Lesson 4 structural analogy",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        clauseKind,
        terminology,
        formulaAbbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(formulaType),
        displayLabel: formulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.unknown ? getNuclearClauseDisplayLabel(formulaType) : getNuclearClauseDisplayLabel(formulaType),
        generationAllowed: false,
        ...payload,
        antiConflationRules: Array.from(NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES)
      };
      return attachNuclearClauseGrammarContract(shell, {
        metadataKind: "nuclear-clause-shell",
        routeStage: "classify-shell",
        sourceInput: shell.formulaEcho || shell.formula || shell.clauseKind,
        supported: formulaType !== NUCLEAR_CLAUSE_FORMULA_TYPE.unknown,
        nuclearClauseFrame: {
          clauseKind,
          formulaType,
          formulaAbbreviation,
          formulaLabel: getNuclearClauseFormulaLabel(formulaType),
          terminology,
          displayLabel: shell.displayLabel,
          formula: shell.formula,
          expandedFormula: shell.expandedFormula || "",
          formulaEcho: shell.formulaEcho,
          lesson4: shell.lesson4 || null,
          predicatePositionStatus: shell.predicatePositionStatus || "",
          predicatePositionStatusSource: shell.predicatePositionStatusSource || "",
          predicateFunctionProfile: shell.predicateFunctionProfile || null,
          clauseUseFrame: shell.clauseUseFrame || null,
          diagramTree: shell.diagramTree || null,
          predicatePositionControl: shell.predicatePositionControl || null,
          organizationalLayers: shell.organizationalLayers || [],
          personalPronounFrame: shell.personalPronounFrame || null,
          hasTensePosition: shell.hasTensePosition,
          slots: shell.slots
        },
        participantFrame: {
          subject: shell.slots?.pers1Pers2 || null,
          object: shell.slots?.obj1 || null
        },
        inflectionFrame: {
          tense: shell.slots?.tensePosition || null,
          hasTensePosition: shell.hasTensePosition
        },
        targetContract: {
          metadataKind: "nuclear-clause-shell",
          generationAllowed: false,
          formulaType,
          clauseKind
        }
      });
    }

    const api = {};
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SHELL_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SHELL_VERSION; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_KIND", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_KIND; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_FORMULA_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_FORMULA_TYPE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK; },
    });
    Object.defineProperty(api, "ANDREWS_NUCLEAR_SLOT", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_NUCLEAR_SLOT; },
    });
    Object.defineProperty(api, "VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA; },
    });
    Object.defineProperty(api, "NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "LESSON5_VNC_TENSE_PROFILE_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_VNC_TENSE_PROFILE_BY_TENSE; },
    });
    api.attachNuclearClauseGrammarContract = attachNuclearClauseGrammarContract;
    api.getLesson5VncTenseProfile = getLesson5VncTenseProfile;
    api.hasLesson5VncPluralConnector = hasLesson5VncPluralConnector;
    api.getLesson5VncTenseMorph = getLesson5VncTenseMorph;
    api.resolveLesson5VncProfileConnector = resolveLesson5VncProfileConnector;
    api.buildLesson5VncNumberConnectorSlot = buildLesson5VncNumberConnectorSlot;
    api.getNuclearClauseFormulaSlot = getNuclearClauseFormulaSlot;
    api.normalizeNuclearClauseKind = normalizeNuclearClauseKind;
    api.getNuclearClauseFormulaType = getNuclearClauseFormulaType;
    api.getNuclearClauseTerminologyForFormulaType = getNuclearClauseTerminologyForFormulaType;
    api.getNuclearClauseFormulaAbbreviation = getNuclearClauseFormulaAbbreviation;
    api.getNuclearClauseFormulaLabel = getNuclearClauseFormulaLabel;
    api.getNuclearClauseDisplayLabel = getNuclearClauseDisplayLabel;
    api.normalizeNuclearClauseFormulaType = normalizeNuclearClauseFormulaType;
    api.normalizeNuclearClausePredicatePositionStatus = normalizeNuclearClausePredicatePositionStatus;
    api.getNuclearClausePredicatePositionLabel = getNuclearClausePredicatePositionLabel;
    api.getNuclearClausePredicatePositionStatusLabel = getNuclearClausePredicatePositionStatusLabel;
    api.getNuclearClausePredicatePositionSlotLabel = getNuclearClausePredicatePositionSlotLabel;
    api.normalizeNuclearClauseLesson4UsageRole = normalizeNuclearClauseLesson4UsageRole;
    api.getNuclearClauseLesson4UsageOptionLabel = getNuclearClauseLesson4UsageOptionLabel;
    api.buildNuclearClauseLesson4FormulaRecord = buildNuclearClauseLesson4FormulaRecord;
    api.getNuclearClauseLesson4FormulaInventory = getNuclearClauseLesson4FormulaInventory;
    api.getNuclearClauseOrganizationalLayers = getNuclearClauseOrganizationalLayers;
    api.cloneNuclearClausePositionComplexityFrame = cloneNuclearClausePositionComplexityFrame;
    api.cloneNuclearClauseCategoryFeatures = cloneNuclearClauseCategoryFeatures;
    api.getNuclearClausePersonalPronounFrame = getNuclearClausePersonalPronounFrame;
    api.getNuclearClauseLesson4SubsectionInventory = getNuclearClauseLesson4SubsectionInventory;
    api.buildNuclearClauseLesson4PursuitFrame = buildNuclearClauseLesson4PursuitFrame;
    api.getNuclearClauseLesson4PredicateFunctionProfile = getNuclearClauseLesson4PredicateFunctionProfile;
    api.buildNuclearClauseLesson4UseFrame = buildNuclearClauseLesson4UseFrame;
    api.buildNuclearClauseLesson4PredicatePositionControlFrame = buildNuclearClauseLesson4PredicatePositionControlFrame;
    api.buildNuclearClauseLesson4DiagramTree = buildNuclearClauseLesson4DiagramTree;
    api.normalizeNuclearClausePronounNumber = normalizeNuclearClausePronounNumber;
    api.getNuclearClausePronounPersonLabel = getNuclearClausePronounPersonLabel;
    api.getNuclearClausePronounNumberLabel = getNuclearClausePronounNumberLabel;
    api.getNuclearClauseSubjectPronounFeatures = getNuclearClauseSubjectPronounFeatures;
    api.getNuclearClauseObjectPronounFeatures = getNuclearClauseObjectPronounFeatures;
    api.getNuclearClausePossessivePronounFeatures = getNuclearClausePossessivePronounFeatures;
    api.getNuclearClausePossessivePrefixFromSlot = getNuclearClausePossessivePrefixFromSlot;
    api.buildNuclearClausePersonalPronounFillerRecord = buildNuclearClausePersonalPronounFillerRecord;
    api.buildNuclearClauseLesson4PersonalPronounResolutionFrame = buildNuclearClauseLesson4PersonalPronounResolutionFrame;
    api.getNuclearClauseLesson4StatusSourceLabel = getNuclearClauseLesson4StatusSourceLabel;
    api.buildNuclearClauseLesson4Frame = buildNuclearClauseLesson4Frame;
    api.inferVerbalPredicatePositionStatus = inferVerbalPredicatePositionStatus;
    Object.defineProperty(api, "LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_MONADIC_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_MONADIC_OBJECT_PREFIXES; },
    });
    api.getLesson6VerbalObjectPositionStatus = getLesson6VerbalObjectPositionStatus;
    api.getVerbalPredicatePositionStatusSource = getVerbalPredicatePositionStatusSource;
    api.inferNominalPredicatePositionStatus = inferNominalPredicatePositionStatus;
    api.getNominalPredicatePositionStatusSource = getNominalPredicatePositionStatusSource;
    api.buildClauseParticipantSlot = buildClauseParticipantSlot;
    api.getNuclearClauseShellResultFrame = getNuclearClauseShellResultFrame;
    api.normalizeNuclearClauseShellSurface = normalizeNuclearClauseShellSurface;
    api.splitNuclearClauseShellSurfaceText = splitNuclearClauseShellSurfaceText;
    api.getNuclearClauseShellFramedSurface = getNuclearClauseShellFramedSurface;
    api.resolveNuclearClauseShellText = resolveNuclearClauseShellText;
    api.buildVerbalNuclearClauseFormulaEchoFromSlots = buildVerbalNuclearClauseFormulaEchoFromSlots;
    api.buildVerbalNuclearClauseShell = buildVerbalNuclearClauseShell;
    api.buildNominalNuclearClauseShell = buildNominalNuclearClauseShell;
    api.buildNuclearClauseShellMetadata = buildNuclearClauseShellMetadata;
    return api;
}

export function installClauseGlobals(targetObject = globalThis) {
    const api = createClauseModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
