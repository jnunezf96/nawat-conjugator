// Canonical modern ESM module.

export function createSentenceApi(targetObject = globalThis) {
    const SENTENCE_LAYER_VERSION = 1;
    const SENTENCE_POLARITY = Object.freeze({
      affirmative: "affirmative",
      negative: "negative",
      unknown: "unknown"
    });
    const SENTENCE_QUESTION_TYPE = Object.freeze({
      none: "none",
      yesNo: "yes-no",
      content: "content",
      unknown: "unknown"
    });
    const SENTENCE_EMPHASIS_TYPE = Object.freeze({
      none: "none",
      focus: "focus",
      emphatic: "emphatic",
      unknown: "unknown"
    });
    const SENTENCE_MOOD_SCOPE = Object.freeze({
      declarative: "declarative",
      wish: "wish",
      command: "command",
      exhortation: "exhortation",
      admonition: "admonition",
      unknown: "unknown"
    });
    const SENTENCE_LAYER_ANTI_CONFLATION_RULES = Object.freeze(["sentence layer metadata is not generation", "finite optative/admonitive form is not full sentence mood semantics", "negation/question/emphasis labels are not orthography-bridge particle evidence", "VNC output is not a complete sentence", "topic and supplementation require separate clause metadata", "Andrews sentence categories are architecture, not Nawat/Pipil orthography authority"]);
    const SENTENCE_LESSON8_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON8_PDF_REFS = Object.freeze(["Andrews Lesson 8.1", "Andrews Lesson 8.2", "Andrews Lesson 8.3", "Andrews Lesson 8.4", "Andrews Lesson 8.5", "Andrews Lesson 8.6"]);
    const SENTENCE_LESSON8_EXPANDED_VNC_FRAME = Object.freeze({
      kind: "lesson-8-expanded-vnc-frame",
      sourceSection: "Andrews §8.1",
      lessonScope: "further-remarks-on-vncs",
      generationAllowed: false,
      expandedConstituents: Object.freeze([Object.freeze({
        id: "directional-locative-prefix",
        andrewsMorphemes: Object.freeze(["on", "hual"]),
        nawatCandidates: Object.freeze(["un", "wal"]),
        semanticRole: "direction-or-location",
        vncBoundary: "inside-vnc-core",
        formulaPlacement: Object.freeze({
          intransitive: "before-stem",
          transitiveMonadicTeTa: "before-monadic-valence",
          transitiveReflexiveDyadic: "before-reflexive-dyadic-valence",
          transitiveSpecificProjectiveDyadic: "after-dyadic-valence"
        }),
        supportiveVowelRule: Object.freeze({
          environment: "pers1 plus c-0 plus on",
          changes: Object.freeze(["ni->no", "ti->to", "xi->xo"]),
          rareOptionalDeletion: Object.freeze(["nocon->noco", "tocon->toco", "xocon->xoco"])
        }),
        fusedExceptions: Object.freeze(["(on-o)", "(hual-la)"]),
        notDecorative: true
      }), Object.freeze({
        id: "antecessive-order-prefix",
        andrewsMorphemes: Object.freeze(["o#"]),
        nawatCandidates: Object.freeze(["u#"]),
        semanticRole: "temporal-precedence",
        vncBoundary: "outside-vnc-left-boundary-or-forelying-clausemate",
        tenseRestriction: "past-tense-vnc",
        indicativeUse: "optional",
        objectMorphImpact: "none",
        attachesToForelyingClausemate: true
      }), Object.freeze({
        id: "negative-prefix",
        andrewsMorphemes: Object.freeze(["ah#", "ca#"]),
        nawatCandidates: Object.freeze(["aj#", "ka#"]),
        semanticRole: "sentence-or-group-negation",
        vncBoundary: "outside-vnc-left-boundary-or-forelying-clausemate",
        attractionRule: "negativity is attracted away from a VNC to a modifier",
        orderWithAntecessive: "negative-before-o#",
        caTrigger: Object.freeze(["ma", "tla"])
      })]),
      nawatOrthographyPolicy: "Classical carriers are Andrews structural evidence only; Nawat/Pipil surfaces require the orthography bridge plus explicit source context before generation."
    });
    const SENTENCE_LESSON8_BASIC_SENTENCE_FRAME = Object.freeze({
      kind: "lesson-8-basic-sentence-frame",
      sourceSections: Object.freeze(["Andrews §8.2", "Andrews §8.3"]),
      sentenceDefinition: "grammatically-self-contained-unit",
      basicSentence: "simple-affirmative-assertion",
      transformSentence: "any-other-sentence-kind-from-transformations",
      transformOperations: Object.freeze(["add", "replace", "rearrange", "delete"]),
      simpleAffirmativeAssertion: Object.freeze({
        nuclearClauseCount: "single",
        optionalCompanions: "one-or-more-particles",
        verbalNuclearClauseRequirement: "indicative-mode",
        vncSources: Object.freeze(["Andrews Lesson 7", "Andrews Lesson 8.1"])
      }),
      currentEngineBoundary: Object.freeze({
        finiteVncGenerationRemainsInCoreVnc: true,
        fullSentenceGenerationModeled: false,
        sentenceLayerMetadataOnly: true
      })
    });
    const SENTENCE_LESSON8_TRANSFORM_FRAME = Object.freeze({
      kind: "lesson-8-transform-sentence-frame",
      sourceSections: Object.freeze(["Andrews §8.4", "Andrews §8.5", "Andrews §8.6"]),
      generationAllowed: false,
      transformTypes: Object.freeze([Object.freeze({
        id: "simple-negative-assertion",
        sourceSection: "Andrews §8.4",
        operation: "add-negative-prefix-to-vnc-or-modifier",
        andrewsParticles: Object.freeze(["ah#"]),
        nawatCandidates: Object.freeze(["aj#"]),
        metadataSlot: "polarity",
        currentStatus: "diagnostic-only"
      }), Object.freeze({
        id: "emphatic-assertion",
        sourceSection: "Andrews §8.5",
        operation: "place-ca-at-beginning-or-before-negative-element",
        andrewsParticles: Object.freeze(["ca"]),
        nawatCandidates: Object.freeze(["ka"]),
        metadataSlot: "emphasis",
        currentStatus: "diagnostic-only"
      }), Object.freeze({
        id: "yes-no-question",
        sourceSection: "Andrews §8.6",
        operation: "question-intonation-or-initial-cuix",
        andrewsParticles: Object.freeze(["cuix?"]),
        nawatCandidates: Object.freeze(["kwish?"]),
        metadataSlot: "question",
        currentStatus: "diagnostic-only"
      })]),
      unsupportedSurfaceBehavior: Object.freeze(["negative sentence generation", "emphatic sentence generation", "yes/no question sentence generation", "orthography-bridge particle realization for Lesson 8 transforms"])
    });
    const SENTENCE_LESSON8_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson8-expanded-vnc",
      andrewsSection: "8.1",
      category: "expanded-vnc-prefix-boundaries",
      directiveEs: "Distinguir la verdadera expansión dentro de la CNV (un/wal) de o# y ah#/ca#, que quedan fuera del límite izquierdo de la CNV.",
      engineSurface: "diagnostic boundary metadata over core VNC output",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson8-basic-vs-transform-sentences",
      andrewsSection: "8.2",
      category: "sentence-type-boundary",
      directiveEs: "La oración básica es una aserción afirmativa simple; las demás son oraciones transformadas por añadir, reemplazar, reordenar o borrar elementos.",
      engineSurface: "sentence-layer classifier metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson8-simple-affirmative-assertion",
      andrewsSection: "8.3",
      category: "simple-affirmative-assertion",
      directiveEs: "Una aserción afirmativa simple contiene una sola cláusula nuclear, sola o con partículas; una CNV debe estar en modo indicativo.",
      engineSurface: "finite CNV generation plus optional diagnostic sentence shell",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson8-simple-negative-assertion",
      andrewsSection: "8.4",
      category: "negative-assertion",
      directiveEs: "La negación se añade con ah# a la CNV o a un modificador; el motor actual solo registra polaridad, no genera la oración negativa.",
      engineSurface: "polarity diagnostic slot",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson8-emphatic-assertion",
      andrewsSection: "8.5",
      category: "emphatic-assertion",
      directiveEs: "La aserción enfática usa ca al inicio, o antes del elemento negativo en una negación enfática.",
      engineSurface: "emphasis diagnostic slot",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson8-yes-no-question",
      andrewsSection: "8.6",
      category: "yes-no-question",
      directiveEs: "La pregunta sí/no cambia la entonación/puntuación o introduce cuix? al inicio; esto es capa oracional, no flexión de la CNV.",
      engineSurface: "question diagnostic slot",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON8_REMAINING_GAPS = Object.freeze(["No sentence generator models full Lesson 8 assertion, negative, emphatic, or yes/no question surfaces.", "Lesson 8 particles and prefixal carriers remain Andrews structural evidence until Andrews source models plus orthography-bridge fixtures license spelling and placement.", "Directional/locative CNV prefixes are not yet integrated as generative CNV slot controls with Nawat/Pipil surface validation."]);
    const SENTENCE_LESSON9_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON9_PDF_REFS = Object.freeze(["Andrews Lesson 9.1", "Andrews Lesson 9.2", "Andrews Lesson 9.3", "Andrews Lesson 9.4", "Andrews Lesson 9.5", "Andrews Lesson 9.6", "Andrews Lesson 9.7", "Andrews Lesson 9.8", "Andrews Lesson 9.9"]);
    const SENTENCE_LESSON9_OPTATIVE_VNC_FRAME = Object.freeze({
      kind: "lesson-9-optative-vnc-frame",
      sourceSections: Object.freeze(["Andrews §9.1", "Andrews §9.2", "Andrews §9.3", "Andrews §9.4"]),
      moodFunction: Object.freeze(["wish", "hope"]),
      distinctiveTenses: Object.freeze(["nonpast-optative", "past-optative"]),
      borrowedUseTenses: Object.freeze([Object.freeze({
        tense: "future-optative",
        sourceForm: "future-indicative",
        identifiedBy: "use-not-form",
        sentenceFunction: "insist-on-futurity-of-wished-event"
      }), Object.freeze({
        tense: "preterit-optative",
        sourceForm: "preterit-indicative",
        identifiedBy: "use-not-form",
        requiredParticle: "o#",
        sentenceFunction: "regret-or-disillusionment-about-definite-past-event"
      })]),
      distinctiveMarkers: Object.freeze([Object.freeze({
        id: "second-person-pers1",
        appliesTo: "all-nonpast-and-past-optative-vncs",
        andrewsMorphs: Object.freeze(["x", "xi"]),
        currentNawatCandidate: "xi"
      }), Object.freeze({
        id: "plural-nonpast-optative-number",
        appliesTo: "all-nonpast-optative-plural-subjects",
        andrewsDyad: "c-an",
        orthographyBridgeRequired: true
      }), Object.freeze({
        id: "class-c-nonpast-optative-stem",
        appliesTo: "Class C verbstems",
        rule: "truncate-final-a-of-base-imperfective-stem"
      }), Object.freeze({
        id: "class-d-nonpast-optative-stem",
        appliesTo: "Class D verbstems",
        rule: "short-vowel-before-silent-morphs-and-long-vowel-before-sounded-morphs",
        orthographyBridgeRequired: true
      })]),
      surfaceIdentityPolicy: "When optative and indicative VNCs have the same shape, syntax and introductory particles distinguish the optative.",
      currentEngineBoundary: Object.freeze({
        finiteOptativeLikeFormsExist: true,
        sentenceMeaningModeled: false,
        canonicalFiniteOptativeKey: "optativo"
      })
    });
    const SENTENCE_LESSON9_WISH_SENTENCE_FRAME = Object.freeze({
      kind: "lesson-9-wish-sentence-frame",
      sourceSections: Object.freeze(["Andrews §9.5", "Andrews §9.6"]),
      generationAllowed: false,
      affirmativeWish: Object.freeze({
        operation: "replace-indicative-vnc-with-optative-vnc-and-insert-introductory-particle",
        andrewsIntroducers: Object.freeze(["ma", "tla"]),
        nawatCandidates: Object.freeze(["ma", "ta"]),
        nonpastOptativeFunction: "open-wish-realizable-now-or-in-future",
        pastOptativeFunction: "contrary-to-fact-or-regret",
        antecessiveWithPastOptative: "o# narrows concern to a past event"
      }),
      intensifiers: Object.freeze([Object.freeze({
        andrews: "cuel",
        nawatCandidate: "kwel",
        placement: "after-ma-or-tla"
      }), Object.freeze({
        andrews: "ye cuel",
        nawatCandidate: "ye kwel",
        placement: "after-ma-or-tla"
      }), Object.freeze({
        andrews: "cuel eh",
        nawatCandidate: "kwel ej",
        placement: "after-ma-or-tla"
      }), Object.freeze({
        andrews: "ye cuel eh",
        nawatCandidate: "ye kwel ej",
        placement: "after-ma-or-tla"
      }), Object.freeze({
        andrews: "ihyo",
        nawatCandidate: "ijyu",
        placement: "before-ma-tla-or-in-tla"
      }), Object.freeze({
        andrews: "ye",
        nawatCandidate: "ye",
        placement: "before-tla-for-intensification"
      })]),
      negativeWish: Object.freeze({
        operation: "replace-indicative-vnc-with-optative-vnc-insert-ma-or-tla-and-change-negative-prefix",
        negativePrefixChange: Object.freeze({
          fromAndrews: "ah#",
          toAndrews: "ca#",
          toNawatCandidate: "ka#"
        }),
        caPrefixStatus: "prefixal-even-when-triggered-by-ma-or-tla",
        metadataSlot: "polarity"
      })
    });
    const SENTENCE_LESSON9_COMMAND_EXHORTATION_FRAME = Object.freeze({
      kind: "lesson-9-command-exhortation-frame",
      sourceSections: Object.freeze(["Andrews §9.7", "Andrews §9.8", "Andrews §9.9"]),
      generationAllowed: false,
      noSeparateCommandMood: true,
      affirmativeCommandExhortation: Object.freeze({
        construction: "wish-sentence-with-nonpast-optative-vnc-or-future-indicative-as-optative-vnc",
        sourceIndicativeTenses: Object.freeze(["present", "future"]),
        subjectFunction: Object.freeze({
          secondPerson: "direct-command",
          thirdPerson: "indirect-command",
          firstPerson: "exhortation"
        }),
        introducerRule: Object.freeze({
          firstOrThirdPerson: "ma-or-tla-obligatory",
          secondPerson: "ma-or-tla-optional-because-x-xi-is-distinctly-optative",
          omittedSecondPersonEffect: "brusque-command-or-command-to-inferior",
          politenessScale: Object.freeze(["omitted", "ma", "tla"])
        }),
        encouragingParticle: Object.freeze({
          andrews: "tel",
          nawatCandidate: "tel",
          placement: "after-ma"
        })
      }),
      futureCommand: Object.freeze({
        construction: "future-indicative-as-optative-vnc-plus-ma-or-tla",
        complianceTime: "beyond-near-future",
        optionalParticle: Object.freeze({
          andrews: "quin",
          nawatCandidate: "kin",
          placement: "after-ma"
        })
      }),
      negativeCommandExhortation: Object.freeze({
        construction: "negative-wish-sentence",
        vncOptions: Object.freeze(["nonpast-optative", "future-optative"]),
        normalNegativePrefix: Object.freeze({
          andrews: "ca#",
          nawatCandidate: "ka#"
        }),
        brusqueNoMaException: Object.freeze({
          andrews: "ah#",
          nawatCandidate: "aj#"
        })
      })
    });
    const SENTENCE_LESSON9_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson9-optative-mood",
      andrewsSection: "9.1",
      category: "optative-mood-function",
      directiveEs: "El optativo expresa deseo o esperanza; sus tiempos distintivos son no pasado y pasado general.",
      engineSurface: "finite CNV tense metadata plus sentence-layer diagnostic frame",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-preterit-future-optative",
      andrewsSection: "9.2",
      category: "borrowed-indicative-form-use",
      directiveEs: "El optativo futuro y el optativo preterito se identifican por uso, no por forma; el preterito optativo requiere o#.",
      engineSurface: "diagnostic tense-use boundary",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-nonpast-past-optative-vnc",
      andrewsSection: "9.3",
      category: "optative-vnc-formation",
      directiveEs: "Los optativos no pasado y pasado se forman sobre el tronco imperfectivo; x/xi, c-an y cambios por clase distinguen formas.",
      engineSurface: "finite CNV optative-like forms plus diagnostic class rules",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-optative-indicative-comparison",
      andrewsSection: "9.4",
      category: "surface-identity-diagnostics",
      directiveEs: "Cuando optativo e indicativo tienen la misma forma, las particulas introductorias y la sintaxis distinguen la funcion optativa.",
      engineSurface: "sentence-layer disambiguation metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-affirmative-wish",
      andrewsSection: "9.5",
      category: "affirmative-wish-sentence",
      directiveEs: "La oracion de deseo sustituye una CNV optativa e introduce ma o tla; los intensificadores son capa oracional.",
      engineSurface: "mood diagnostic slot",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-negative-wish",
      andrewsSection: "9.6",
      category: "negative-wish-sentence",
      directiveEs: "La oracion negativa de deseo cambia ah# por ca# con ma o tla; ca# sigue siendo prefijal.",
      engineSurface: "polarity plus mood diagnostic slots",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-command-exhortation",
      andrewsSection: "9.7",
      category: "command-exhortation-sentence",
      directiveEs: "No hay modo de mandato separado: mandato y exhortacion usan oraciones de deseo con CNV optativa no pasada o futuro indicativo como optativo.",
      engineSurface: "sentence-mood diagnostic frame over finite CNV forms",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-future-command",
      andrewsSection: "9.8",
      category: "future-command-sentence",
      directiveEs: "El mandato futuro usa futuro indicativo como optativo con ma o tla, frecuentemente ma quin.",
      engineSurface: "future tense-use diagnostic boundary",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson9-negative-command-exhortation",
      andrewsSection: "9.9",
      category: "negative-command-exhortation-sentence",
      directiveEs: "El mandato o exhortacion negativa es una oracion negativa de deseo; si falta ma en mandato brusco, se usa ah#.",
      engineSurface: "polarity plus command/exhortation diagnostic frame",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON9_REMAINING_GAPS = Object.freeze(["No sentence generator composes ma/tla wish, command, exhortation, or negative-wish surfaces.", "The finite optativo key is canonical, but sentence-level optative/command UI semantics remain diagnostic until Andrews-directed sentence generation is implemented.", "Lesson 9 particles, intensifiers, and negative-prefix placements remain Andrews structural evidence until Andrews source models plus orthography-bridge fixtures license spelling and placement."]);
    const SENTENCE_LESSON10_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON10_PDF_REFS = Object.freeze(["Andrews Lesson 10.1", "Andrews Lesson 10.2", "Andrews Lesson 10.3", "Andrews Lesson 10.4", "Andrews Lesson 10.5"]);
    const SENTENCE_LESSON10_ADMONITIVE_MOOD_FRAME = Object.freeze({
      kind: "lesson-10-admonitive-mood-frame",
      sourceSection: "Andrews §10.1",
      moodFunction: Object.freeze(["warning", "admonition", "advice"]),
      rejectedLabels: Object.freeze(["vetitive", "prohibition", "negative-command"]),
      isPositiveForm: true,
      isNegativeInShapeOrMeaning: false,
      cautionaryMeaning: true,
      translationWarning: "Do not confuse a translation beginning with don't with a negative grammar form.",
      noSeparateCommandMood: true
    });
    const SENTENCE_LESSON10_NONPAST_ADMONITIVE_VNC_FRAME = Object.freeze({
      kind: "lesson-10-nonpast-admonitive-vnc-frame",
      sourceSection: "Andrews §10.2",
      tenseInventory: Object.freeze(["nonpast-admonitive"]),
      stemSource: "perfective-stem",
      classContrast: Object.freeze({
        classA: "admonitive tense morph h differs from preterit indicative zero",
        classB: "same predicate shape as singular preterit indicative unless sentence context distinguishes it",
        classC: "same predicate shape as singular preterit indicative unless sentence context distinguishes it",
        classD: "glottal-stop contrast distinguishes singular admonitive from nonpast optative when represented"
      }),
      subjectNumberDyad: Object.freeze({
        singular: "0-0",
        plural: "t-in~t-ih",
        num1RegularMorphCondition: "only with plural num2 morph"
      }),
      outsideSentenceTranslation: "none",
      currentEngineBoundary: Object.freeze({
        finiteAdmonitiveLikeFormsExist: true,
        sentenceWarningMeaningModeled: false,
        canonicalFiniteOptativeKey: "optativo"
      })
    });
    const SENTENCE_LESSON10_AFFIRMATIVE_ADMONITION_FRAME = Object.freeze({
      kind: "lesson-10-affirmative-admonition-frame",
      sourceSection: "Andrews §10.3",
      generationAllowed: false,
      transformation: "replace-present-indicative-vnc-with-admonitive-vnc-and-insert-ma",
      obligatoryIntroducer: Object.freeze({
        andrews: "ma",
        nawatCandidate: "ma"
      }),
      optionalStrengthener: Object.freeze({
        andrews: "nen",
        nawatCandidate: "nen",
        collocation: "ma nen"
      }),
      subjectFunction: Object.freeze({
        secondPerson: "direct-warning",
        thirdPerson: "indirect-warning",
        firstPerson: "self-or-group-exhortative-warning"
      }),
      translationBoundaries: Object.freeze(["positive-admonition-is-not-negative-command", "do-not-translate-as-dont-as-grammar", "do-not-translate-as-may-not", "nonanimate-subjects-require-advice-judgment-translation"]),
      classInventory: Object.freeze(["A", "B", "C", "D"])
    });
    const SENTENCE_LESSON10_NEGATIVE_ADMONITION_FRAME = Object.freeze({
      kind: "lesson-10-negative-admonition-frame",
      sourceSection: "Andrews §10.4",
      generationAllowed: false,
      transformation: "negative-assertion-with-present-indicative-vnc-to-negative-admonition",
      obligatoryIntroducer: Object.freeze({
        andrews: "ma nen",
        nawatCandidate: "ma nen"
      }),
      negativePrefix: Object.freeze({
        andrews: "ah#",
        nawatCandidate: "aj#"
      }),
      prefixPlacement: "affixed-to-admonitive-vnc",
      meaning: "cancellation-of-warning-and-recommendation-to-reject-caution",
      rejectedTraditionalLabel: "positive-vetative"
    });
    const SENTENCE_LESSON10_CONTRAST_FRAME = Object.freeze({
      kind: "lesson-10-vnc-contrast-frame",
      sourceSection: "Andrews §10.5",
      comparedCategories: Object.freeze(["preterit-indicative", "nonpast-admonitive", "nonpast-optative", "present-indicative"]),
      disambiguationRules: Object.freeze([Object.freeze({
        id: "second-person-optative",
        rule: "x-and-xi-in-pers1-distinguish-second-person-optative-from-admonitive"
      }), Object.freeze({
        id: "plural-vncs",
        rule: "plural-subject-vncs-are-always-distinctive"
      }), Object.freeze({
        id: "ma-context",
        rule: "ma-distinguishes-admonitive-or-optative-sentence-context-from indicative shape"
      }), Object.freeze({
        id: "antecessive-o",
        rule: "o# cannot occur with admonitive because admonitive is nonpast"
      }), Object.freeze({
        id: "h-role",
        rule: "same visible h can be admonitive tense morph or present-indicative num1 filler depending on formula slot"
      }), Object.freeze({
        id: "glottal-omission-risk",
        rule: "texts without glottal stop can obscure first-and-third-person singular contrasts"
      })]),
      currentEngineBoundary: "diagnostic-disambiguation-only"
    });
    const SENTENCE_LESSON10_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson10-admonitive-mood",
      andrewsSection: "10.1",
      category: "admonitive-mood-function",
      directiveEs: "El admonitivo expresa advertencia, admonicion o consejo; no es prohibicion, no es negativo y no debe llamarse vetitivo.",
      engineSurface: "sentence-mood diagnostic frame",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson10-nonpast-admonitive-vnc",
      andrewsSection: "10.2",
      category: "nonpast-admonitive-vnc-formation",
      directiveEs: "La CNV admonitiva no pasada se forma sobre tronco perfectivo; fuera de contexto oracional no tiene valor de traduccion.",
      engineSurface: "finite CNV admonitive-like forms plus diagnostic class rules",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson10-affirmative-admonition",
      andrewsSection: "10.3",
      category: "affirmative-admonition-sentence",
      directiveEs: "La admonicion afirmativa sustituye una CNV admonitiva e introduce ma obligatoria, con ma nen opcional; no equivale a mandato negativo.",
      engineSurface: "mood diagnostic slot with generation blocked",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson10-negative-admonition",
      andrewsSection: "10.4",
      category: "negative-admonition-sentence",
      directiveEs: "La admonicion negativa usa ma nen obligatoria y ah# en la CNV admonitiva; cancela la advertencia y recomienda rechazar la cautela.",
      engineSurface: "polarity plus mood diagnostic slots",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson10-vnc-contrasts",
      andrewsSection: "10.5",
      category: "admonitive-optative-indicative-contrast",
      directiveEs: "Distinguir admonitivo, optativo, indicativo presente e indicativo preterito por slot, particula ma, o#, pluralidad y representacion del saltillo.",
      engineSurface: "contrast diagnostic metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON10_REMAINING_GAPS = Object.freeze(["No sentence generator composes affirmative or negative admonition surfaces.", "The finite optativo key is canonical, but sentence-level admonitive and optative functions remain diagnostic until Andrews-directed sentence generation is implemented.", "Lesson 10 ma/nen/ah# placement and class-specific admonitive surfaces remain Andrews structural evidence until Andrews source models plus orthography-bridge fixtures license spelling and placement."]);
    const SENTENCE_LESSON17_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON17_PDF_REFS = Object.freeze(["Andrews Lesson 17.1", "Andrews Lesson 17.2", "Andrews Lesson 17.3", "Andrews Lesson 17.4", "Andrews Lesson 17.5", "Andrews Lesson 17.6"]);
    const SENTENCE_LESSON17_MULTIPLE_NUCLEUS_FRAME = Object.freeze({
      kind: "lesson-17-multiple-nucleus-frame",
      sourceSection: "Andrews §17.1",
      syntacticGroup: "concatenate structure with two or more nuclear clauses",
      discussedStructure: "supplementation",
      previousComparison: "adverbial modification combines particles with one nuclear clause",
      generationAllowed: false
    });
    const SENTENCE_LESSON17_SUPPLEMENTATION_FRAME = Object.freeze({
      kind: "lesson-17-supplementation-frame",
      sourceSection: "Andrews §17.2",
      relationType: "apposition",
      headAlways: "personal-pronoun",
      referenceMechanism: Object.freeze(["anaphora", "cataphora"]),
      nahuatlReason: "personal pronouns are affixal and cannot be stressed or replaced by wordal pronouns inside the nuclear clause",
      expandableNuclearFunctions: Object.freeze(["subject", "object", "possessor"]),
      supplementUnitTypes: Object.freeze(["nuclear-clause", "concatenated nuclear-clause group"]),
      supplementRoles: Object.freeze(["supplementary subject", "supplementary object", "supplementary possessor"]),
      supplementationKinds: Object.freeze(["shared-referent", "included-referent"]),
      includedReferentDeferredTo: "Andrews §19.3",
      generationAllowed: false
    });
    const SENTENCE_LESSON17_SHARED_REFERENT_FRAME = Object.freeze({
      kind: "lesson-17-shared-referent-frame",
      sourceSection: "Andrews §17.3",
      definition: "a personal pronoun in the supplement and its head in the principal nuclear clause point to the same referent",
      agreementUsuallyShowsIdentity: true,
      simplestSupplementType: "NNC manifesting an equational sentence",
      roles: Object.freeze([Object.freeze({
        id: "supplementary-subject",
        supplementSubjectMatches: "principal subject"
      }), Object.freeze({
        id: "supplementary-object",
        supplementSubjectMatches: "principal object"
      }), Object.freeze({
        id: "supplementary-possessor",
        supplementSubjectMatches: "principal possessor"
      })]),
      haveConstruction: "locative ca-h VNC principal plus possessive-state NNC supplementary subject can express having",
      directPossessorModifierBlocked: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON17_FURTHER_PARTICULARS_FRAME = Object.freeze({
      kind: "lesson-17-further-particulars-frame",
      sourceSection: "Andrews §17.4",
      recursiveAdjunction: true,
      contactByPronounReferentIdentityNotStem: true,
      indefinitePronominalNncCanCrossReferenceSpecificPronoun: true,
      demonstrativePronominalNncsCanSupplement: Object.freeze(["in", "on"]),
      thirdPersonTransitiveAmbiguity: "subject/object shared-referent contact can be ambiguous when both roles permit animate referents",
      generationAllowed: false
    });
    const SENTENCE_LESSON17_TOPICALIZATION_FRAME = Object.freeze({
      kind: "lesson-17-topicalization-frame",
      sourceSection: "Andrews §17.5",
      supplementPositionFixed: false,
      topicRule: "supplement before principal becomes sentence topic",
      commentRule: "what follows topic is the comment",
      topicMustBeAdjunctBeforePrincipal: true,
      connection: "loose",
      caCanIntroduceComment: true,
      multipleTopicsPossible: true,
      ambiguityResolution: Object.freeze(["adjunctor in", "emphatic particle ca"]),
      generationAllowed: false
    });
    const SENTENCE_LESSON17_INFORMATION_QUESTION_FRAME = Object.freeze({
      kind: "lesson-17-information-question-frame",
      sourceSection: "Andrews §17.6",
      transformation: "replace a supplement in a yes/no question with an interrogative pronominal NNC",
      requiredPosition: "sentence-initial",
      questionDomains: Object.freeze(["what", "amount", "who", "whose"]),
      dependsOnPronominalNnc: "Andrews Lesson 16",
      generationAllowed: false
    });
    const SENTENCE_LESSON17_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson17-multiple-nucleus-combinations",
      andrewsSection: "17.1",
      category: "multiple-nucleus-combination",
      directiveEs: "La suplementacion pertenece a grupos con dos o mas clausulas nucleares, no a una sola salida de palabra.",
      engineSurface: "sentence-layer structure metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson17-supplementation-definition",
      andrewsSection: "17.2",
      category: "supplementation-definition",
      directiveEs: "La cabeza de la suplementacion es un pronombre personal afijal; el suplemento aclara sujeto, objeto o poseedor.",
      engineSurface: "supplementation relation metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson17-shared-referent-supplementation",
      andrewsSection: "17.3",
      category: "shared-referent-supplementation",
      directiveEs: "En suplementacion de referente compartido, el pronombre del suplemento y la cabeza en la principal apuntan al mismo referente.",
      engineSurface: "shared-referent diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson17-further-shared-referent-particulars",
      andrewsSection: "17.4",
      category: "shared-referent-particulars",
      directiveEs: "La relacion se basa en identidad de referentes pronominales, puede ser recursiva y puede producir ambiguedad sujeto/objeto.",
      engineSurface: "recursive and ambiguity diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson17-topicalization",
      andrewsSection: "17.5",
      category: "topicalization-transform",
      directiveEs: "Un suplemento antepuesto a la principal funciona como topico; topico no es clase nominal ni dato de generacion.",
      engineSurface: "topic/comment diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson17-information-questions",
      andrewsSection: "17.6",
      category: "information-question-by-supplement",
      directiveEs: "La pregunta informativa reemplaza un suplemento por una CNN pronominal interrogativa al inicio de la oracion.",
      engineSurface: "question transform diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON17_REMAINING_GAPS = Object.freeze(["Supplementation is not yet an executable clause/sentence AST over generated Nawat/Pipil surfaces.", "Shared-referent subject, object, and possessor examples require Andrews clause-source model plus orthography bridge before generation or UI controls.", "Topicalization, recursive supplementation, third-person ambiguity, and information-question transforms remain diagnostic metadata.", "Included-referent supplementation is deferred to Andrews Lesson 19."]);
    const SENTENCE_LESSON18_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON18_PDF_REFS = Object.freeze(["Andrews Lesson 18.1", "Andrews Lesson 18.2", "Andrews Lesson 18.3", "Andrews Lesson 18.4", "Andrews Lesson 18.5", "Andrews Lesson 18.6", "Andrews Lesson 18.7", "Andrews Lesson 18.8", "Andrews Lesson 18.9", "Andrews Lesson 18.10", "Andrews Lesson 18.11", "Andrews Lesson 18.12"]);
    const SENTENCE_LESSON18_INTEGRATED_SUPPLEMENT_FRAME = Object.freeze({
      kind: "lesson-18-integrated-supplement-frame",
      sourceSection: "Andrews §18.1",
      condition: "supplementary subject or object precedes a VNC that contains its head and the VNC is modified by antecessive-order o#",
      transformation: "o# may prefix to the supplement instead of the VNC",
      syntacticEffect: "supplement and principal are felt as an integrated syntactical unit",
      translationBoundary: "the structural difference is not translated into English",
      generationAllowed: false
    });
    const SENTENCE_LESSON18_SHORT_PRONOMINAL_FRAME = Object.freeze({
      kind: "lesson-18-short-pronominal-frame",
      sourceSection: "Andrews §18.2",
      unitClass: "short personal-pronominal NNC",
      cannotStandAloneAsUtterance: true,
      ordinaryFunction: "supplement",
      mayServeAsPrincipalWithAdjoinedConstituents: true,
      standaloneRequiresLongForm: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON18_MARKED_SUPPLEMENTATION_FRAME = Object.freeze({
      kind: "lesson-18-marked-supplementation-frame",
      sourceSection: "Andrews §18.3",
      marker: "in",
      markerFunction: "adjoin a lower-level unit to a higher-level unit",
      subordinatesWholeUnit: true,
      affectsNncPredicateDeterminacy: false,
      canMarkTopic: true,
      demonstrativesCanBeMarked: Object.freeze(["in", "on"]),
      traditionalSolidSpellingsAreDiagnosticOnly: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON18_DISCONTINUOUS_FRAME = Object.freeze({
      kind: "lesson-18-discontinuous-frame",
      sourceSection: "Andrews §18.4",
      frequentWith: "supplementary possessor",
      cause: "topic movement can move the head-containing nuclear clause or the supplement away from the other",
      requiresDistanceAwareAst: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON18_AGREEMENT_EXCEPTION_FRAME = Object.freeze({
      kind: "lesson-18-agreement-exception-frame",
      sourceSection: "Andrews §18.5",
      condition: "some NNCs appear singular in subject form but plural in reference",
      exampleCategory: "collective NNC",
      agreementMayMismatch: true,
      analysisUncertain: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON18_NAMED_PARTNER_FRAME = Object.freeze({
      kind: "lesson-18-named-partner-frame",
      sourceSection: "Andrews §18.6",
      pluralIncludesKnownEntity: true,
      rule: "only the named third-person entity is normally mentioned in the supplement",
      referentScope: "known participant plus newly named third-person entity",
      generationAllowed: false
    });
    const SENTENCE_LESSON18_MALE_BONDING_FRAME = Object.freeze({
      kind: "lesson-18-male-bonding-frame",
      sourceSection: "Andrews §18.7",
      nounstem: "(oquich)-tli",
      specialConstruction: true,
      speakerCondition: "male speaker associated with the men involved",
      subjectMismatch: "first-person plural supplement may cross-reference a third-person head",
      excludedSpeakersUseThirdPerson: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON18_SILENT_SPECIFIC_OBJECT_FRAME = Object.freeze({
      kind: "lesson-18-silent-specific-object-frame",
      sourceSection: "Andrews §18.8",
      verbstem: "tla-(ayi)",
      nonspecificPatientUses: "tla",
      specificPatientObjectDyad: "0-0",
      appearsIntransitiveButTransitive: true,
      supplementaryObjectHead: "silently present specific object pronoun",
      commonSupplementStems: Object.freeze(["tl-eh", "itl-ah", "mo-chi"]),
      generationAllowed: false
    });
    const SENTENCE_LESSON18_PRINCIPAL_DELETION_FRAME = Object.freeze({
      kind: "lesson-18-principal-deletion-frame",
      sourceSection: "Andrews §18.9",
      deletedUnit: "principal VNC",
      conditions: Object.freeze(["principal also has an adverbial modifier", "principal has a supplementary subject"]),
      result: "adverbial adjunct upgrades to proxy principal and former supplementary subject becomes a surface subject",
      commonSourceStem: "(ca-h)",
      generationAllowed: false
    });
    const SENTENCE_LESSON18_VOCATIVE_FRAME = Object.freeze({
      kind: "lesson-18-vocative-frame",
      sourceSections: Object.freeze(["Andrews §18.10", "Andrews §18.11"]),
      soCalledVocative: Object.freeze({
        structure: "second-person supplementary subject with head in an optative VNC",
        reasonForName: "translated as vocative in Spanish and English",
        isRealVocative: false
      }),
      realVocative: Object.freeze({
        subjectPerson: "third-person",
        maleSpeakerParticle: "#e",
        maleParticleWrittenAsSuffix: true,
        supportiveIAbsorbedByE: true,
        absolutivePluralInCanBeSilentBeforeParticle: true,
        femaleSpeakerParticle: "",
        femaleSpeakerProsody: "higher tone and affected stress on final syllable"
      }),
      generationAllowed: false
    });
    const SENTENCE_LESSON18_SENTENCE_ORDER_FRAME = Object.freeze({
      kind: "lesson-18-sentence-order-frame",
      sourceSection: "Andrews §18.12",
      constituentOrder: "free",
      supplementsStandLooselyAroundPrincipal: true,
      functionMarkersObligatory: false,
      principalMarkersObligatory: false,
      multipleSupplementsSameFunctionPossible: true,
      recursiveSupplementationPossible: true,
      comprehensionRule: "context, meaning logic, and the principal clause as organizing center determine function",
      translationWarning: "NNCs and pronominal NNCs remain complete clauses even when translated as words",
      generationAllowed: false
    });
    const SENTENCE_LESSON18_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson18-integrated-supplement",
      andrewsSection: "18.1",
      category: "integrated-supplement",
      directiveEs: "Si un suplemento sujeto u objeto precede una CNV con su cabeza, o# puede prefijarse al suplemento; esto es integracion sintactica, no nueva forma generada.",
      engineSurface: "antecessive-order integration diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-short-personal-pronominal-nnc",
      andrewsSection: "18.2",
      category: "short-pronominal-nnc",
      directiveEs: "Las CNN pronominales personales cortas no son enunciados independientes; normalmente funcionan como suplementos.",
      engineSurface: "short-pronominal boundary metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-marked-supplementation",
      andrewsSection: "18.3",
      category: "marked-supplementation",
      directiveEs: "El adjuntor in subordina una unidad completa y puede marcar topico; no determina por si solo el predicado de una CNN.",
      engineSurface: "adjunctor in diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-discontinuous-supplementation",
      andrewsSection: "18.4",
      category: "discontinuous-supplementation",
      directiveEs: "La suplementacion puede ser discontinua, sobre todo con poseedor, por movimiento hacia o desde posicion de topico.",
      engineSurface: "distance-aware AST blocker",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-supplement-head-agreement-gap",
      andrewsSection: "18.5",
      category: "agreement-mismatch",
      directiveEs: "Algunas CNN colectivas pueden tener forma singular y referencia plural; la concordancia puede fallar y el analisis queda diagnostico.",
      engineSurface: "agreement mismatch diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-named-partner-supplement",
      andrewsSection: "18.6",
      category: "named-partner-supplement",
      directiveEs: "Cuando un plural incluye una entidad conocida y una tercera persona nombrada, normalmente solo se menciona esa tercera persona en el suplemento.",
      engineSurface: "referent-scope diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-male-bonding-supplement",
      andrewsSection: "18.7",
      category: "male-bonding-supplement",
      directiveEs: "Con el tronco oquich, un hablante hombre asociado al grupo puede usar primera persona plural aunque la cabeza sea tercera persona.",
      engineSurface: "speaker-conditioned mismatch diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-tla-ayi-silent-object",
      andrewsSection: "18.8",
      category: "silent-specific-object",
      directiveEs: "El verbo tla-(ayi) conserva transitividad fuerte: con paciente especifico el objeto es 0-0 silencioso y puede recibir suplemento objeto.",
      engineSurface: "silent object head diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-principal-deletion",
      andrewsSection: "18.9",
      category: "principal-deletion",
      directiveEs: "Una CNV principal con modificador adverbial y sujeto suplementario puede borrarse; el adverbial queda como principal proxy.",
      engineSurface: "proxy principal diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-so-called-vocative",
      andrewsSection: "18.10",
      category: "so-called-vocative",
      directiveEs: "El llamado vocativo es en realidad sujeto suplementario de segunda persona con cabeza en CNV optativa.",
      engineSurface: "vocative label blocker",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-real-vocative",
      andrewsSection: "18.11",
      category: "real-vocative",
      directiveEs: "El vocativo real usa sujeto de tercera persona, formaciones por genero del hablante y particula #e o prosodia especial.",
      engineSurface: "vocative formation diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson18-sentence-constituent-order",
      andrewsSection: "18.12",
      category: "sentence-constituent-order",
      directiveEs: "El orden de constituyentes es libre; los suplementos son clausulas completas y no deben reducirse a sustantivos o pronombres traducidos.",
      engineSurface: "sentence-order and anti-translation diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON18_REMAINING_GAPS = Object.freeze(["Lesson 18 supplementation is not yet an executable sentence AST over generated Nawat/Pipil surfaces.", "Integrated o# movement, marked in adjunction, discontinuity, proxy-principal deletion, and free constituent order need a distance-aware clause/sentence parser before generation.", "Short personal-pronominal NNCs, named-partner supplements, male-bonding supplements, agreement mismatches, and silent object heads require Andrews source models plus orthography-bridge support before UI controls or output.", "Real vocative formation needs orthography-bridge support for particle/prosody spelling behavior before any surface generation."]);
    const SENTENCE_LESSON19_VALIDATION_REFS = Object.freeze(["src/tests/sentence.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const SENTENCE_LESSON19_PDF_REFS = Object.freeze(["Andrews Lesson 19.1", "Andrews Lesson 19.2", "Andrews Lesson 19.3", "Andrews Lesson 19.4", "Andrews Lesson 19.5", "Andrews Lesson 19.6"]);
    const SENTENCE_LESSON19_VNC_SUPPLEMENTS_FRAME = Object.freeze({
      kind: "lesson-19-vnc-supplements-frame",
      sourceSection: "Andrews §19.1",
      supplementClauseTypes: Object.freeze(["intransitive VNC", "transitive VNC"]),
      usualMarker: "adjunctor in",
      markerAlmostAlwaysOptional: true,
      supplementRoles: Object.freeze(["supplementary subject", "supplementary object", "supplementary possessor"]),
      recursiveAdjunction: true,
      rhetoricalWeightingCanReverseEnglishSubordination: true,
      fusedInterrogativeSpellingsAreDiagnosticOnly: Object.freeze(["tleh in", "ac in"]),
      generationAllowed: false
    });
    const SENTENCE_LESSON19_PRONOMINAL_PLURAL_FRAME = Object.freeze({
      kind: "lesson-19-pronominal-plural-frame",
      sourceSection: "Andrews §19.2",
      targets: Object.freeze(["in", "on", "ac"]),
      formation: "special plural formations built by supplementation with a VNC on perfective stem (0-i-h) to exist",
      principalVncSubject: "third-person plural for demonstratives; person varies in ac questions",
      principalVncTense: "preterit-as-present",
      demonstrativePluralUses: Object.freeze(["ihqueh in", "ihqueh on"]),
      acPluralAgreementMayMismatch: true,
      acSupplementNeedNotBeContiguous: true,
      traditionalSolidSpellingsAreDiagnosticOnly: true,
      negativeCounterpartPluralUsesPreteritPlural: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON19_INCLUDED_REFERENT_FRAME = Object.freeze({
      kind: "lesson-19-included-referent-frame",
      sourceSection: "Andrews §19.3",
      contrastsWith: "shared-referent supplementation",
      referentIdentityRequired: false,
      supplementAsWholeIsReferent: true,
      wholeSupplementAssessedAs: "third-person singular",
      headInPrincipalMustBe: "third-person singular",
      principalClauseTypes: Object.freeze([Object.freeze({
        clauseType: "NNC",
        allowedSupplementFunctions: Object.freeze(["supplementary subject", "supplementary possessor"])
      }), Object.freeze({
        clauseType: "intransitive VNC",
        allowedSupplementFunctions: Object.freeze(["supplementary subject"])
      }), Object.freeze({
        clauseType: "transitive VNC",
        allowedSupplementFunctions: Object.freeze(["supplementary subject", "supplementary object"])
      })]),
      transitivePrincipalSemanticGroups: Object.freeze(["saying-questioning", "causing", "wanting-desiring-needing", "perception", "knowing-remembering-forgetting", "affect"]),
      directAndIndirectSpeechShareAdjunctorPrivilege: true,
      nahuatlNormallyDoesNotBackshiftIndirectSpeech: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON19_INFINITIVE_TRANSLATION_FRAME = Object.freeze({
      kind: "lesson-19-infinitive-translation-frame",
      sourceSection: "Andrews §19.4",
      principalVerbstems: Object.freeze(["tla-(mati)", "tla-(il-namiqui)", "tla-(il-cahua)", "tla-(nequi)"]),
      conditions: Object.freeze(["included-referent supplementation", "adjoined VNC has future tense morph", "both clauses have subject pronouns with the same referent"]),
      englishRendering: "infinitive",
      nequiDistinctive: Object.freeze(["can form incorporated-object future-embed compound VNC", "can take wish-sentence supplementary object"]),
      generationAllowed: false
    });
    const SENTENCE_LESSON19_RUMORED_REPORT_FRAME = Object.freeze({
      kind: "lesson-19-rumored-report-frame",
      sourceSection: "Andrews §19.5",
      principalVnc: "quil",
      reportResponsibility: "reporter takes no responsibility for the information",
      translationValues: Object.freeze(["it is said that", "it is reported that"]),
      optionalIntroducer: "mach",
      traditionalSolidSpelling: "quilmach",
      uniqueForm: true,
      fixedSubject: "third-person singular",
      fixedTense: "preterit",
      generationAllowed: false
    });
    const SENTENCE_LESSON19_DELETED_SAYING_FRAME = Object.freeze({
      kind: "lesson-19-deleted-saying-frame",
      sourceSection: "Andrews §19.6",
      condition: "speech-action VNC plus following included-referent supplementary-clause construction",
      deletedPrincipal: "principal clause of saying",
      result: "quote or indirect-speech supplement is juxtaposed to another principal with no direct grammatical relation",
      canLeaveOnlyAdverbInPrincipal: true,
      requiresSpeechAst: true,
      generationAllowed: false
    });
    const SENTENCE_LESSON19_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson19-vncs-as-supplements",
      andrewsSection: "19.1",
      category: "vnc-supplement",
      directiveEs: "Las CNV intransitivas y transitivas tambien pueden ser suplementos; normalmente llevan in, casi siempre opcional.",
      engineSurface: "VNC supplement diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson19-pronominal-plurals",
      andrewsSection: "19.2",
      category: "pronominal-plural-supplementation",
      directiveEs: "Los plurales especiales de in, on y ac se forman por suplementacion con una CNV de existir; no son simples plurales de palabra.",
      engineSurface: "pronominal plural formation diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson19-included-referent-supplementation",
      andrewsSection: "19.3",
      category: "included-referent-supplementation",
      directiveEs: "En suplementacion de referente incluido, la clausula o sentencia adjunta entera es el referente de una cabeza pronominal tercera singular.",
      engineSurface: "included-referent diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson19-know-how-remember-to",
      andrewsSection: "19.4",
      category: "infinitive-translation-supplementation",
      directiveEs: "Las traducciones 'saber como', 'recordar', 'olvidar' y 'querer' dependen de suplementacion con CNV futura y sujeto compartido.",
      engineSurface: "translation diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson19-rumored-report",
      andrewsSection: "19.5",
      category: "rumored-report",
      directiveEs: "Quil funciona como CNV fija de reporte no responsable, a menudo con mach; no admite otros tiempos ni sujetos.",
      engineSurface: "reported-speech diagnostic",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson19-deleted-saying-principal",
      andrewsSection: "19.6",
      category: "deleted-saying-principal",
      directiveEs: "Una principal de decir puede borrarse despues de una CNV de accion verbal, dejando cita o discurso indirecto yuxtapuesto.",
      engineSurface: "speech AST blocker",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const SENTENCE_LESSON19_REMAINING_GAPS = Object.freeze(["Lesson 19 VNC supplementation and included-referent supplementation are not executable sentence ASTs over generated Nawat/Pipil surfaces.", "Pronominal plural formations, fused spelling warnings, and noncontiguous ac structures require Andrews source models plus orthography-bridge support and a safe pronominal route contract.", "Direct/indirect speech, reported questions, reported commands, wishing/needing/perception/knowing/affect complements, rumored report, and deleted saying principals require speech/complement AST support before generation.", "English infinitive translations and rhetorical weighting must remain diagnostics, not generation rules."]);
    function attachSentenceGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "sentence-layer",
        routeFamily: "sentence-layer",
        structuralSource: "Andrews Lessons 8-10",
        andrewsRefs: ["Andrews Lessons 8-10"],
        ...options
      });
    }
    function normalizeSentenceEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeSentencePolarity(value = "") {
      return normalizeSentenceEnum(value, Object.values(SENTENCE_POLARITY), SENTENCE_POLARITY.unknown);
    }
    function normalizeSentenceQuestionType(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      if (["no", "none", "false"].includes(normalized)) {
        return SENTENCE_QUESTION_TYPE.none;
      }
      if (["yesno", "yes-no", "polar"].includes(normalized)) {
        return SENTENCE_QUESTION_TYPE.yesNo;
      }
      return normalizeSentenceEnum(normalized, Object.values(SENTENCE_QUESTION_TYPE), SENTENCE_QUESTION_TYPE.unknown);
    }
    function normalizeSentenceEmphasisType(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      if (["no", "none", "false"].includes(normalized)) {
        return SENTENCE_EMPHASIS_TYPE.none;
      }
      return normalizeSentenceEnum(normalized, Object.values(SENTENCE_EMPHASIS_TYPE), SENTENCE_EMPHASIS_TYPE.unknown);
    }
    function normalizeSentenceMoodScope(value = "") {
      return normalizeSentenceEnum(value, Object.values(SENTENCE_MOOD_SCOPE), SENTENCE_MOOD_SCOPE.unknown);
    }
    function getSentenceLayerAntiConflationRules() {
      return Array.from(SENTENCE_LAYER_ANTI_CONFLATION_RULES);
    }
    function cloneSentenceLessonArray(value) {
      return Array.isArray(value) ? value.map(entry => cloneSentenceLessonRecord(entry)) : value;
    }
    function cloneSentenceLessonRecord(value) {
      if (Array.isArray(value)) {
        return cloneSentenceLessonArray(value);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneSentenceLessonRecord(entry)]));
    }
    function cloneSentenceLesson8Array(value) {
      return cloneSentenceLessonArray(value);
    }
    function cloneSentenceLesson8Record(value) {
      return cloneSentenceLessonRecord(value);
    }
    function getSentenceLesson8ExpandedVncFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON8_EXPANDED_VNC_FRAME);
    }
    function getSentenceLesson8BasicSentenceFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON8_BASIC_SENTENCE_FRAME);
    }
    function getSentenceLesson8TransformFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON8_TRANSFORM_FRAME);
    }
    function getSentenceLesson8SubsectionInventory() {
      return SENTENCE_LESSON8_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON8_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera oraciones ni importa superficies clasicas como fixtures Nawat/Pipil"
      }));
    }
    function getSentenceLesson8RemainingGaps() {
      return Array.from(SENTENCE_LESSON8_REMAINING_GAPS);
    }
    function buildSentenceLesson8PursuitFrame() {
      const inventory = getSentenceLesson8SubsectionInventory();
      const frame = {
        kind: "lesson-8-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 8,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON8_PDF_REFS),
        plannedArrows: [{
          id: "lesson-8-expanded-vnc-basic-sentence-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 8.1-8.6 against expanded VNC boundary placement, basic/transform sentence categories, and diagnostic-only sentence-layer slots.",
          andrewsRefs: Array.from(SENTENCE_LESSON8_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON8_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-8-expanded-vnc-basic-sentence-audit",
          result: "hit",
          correction: "Lesson 8 now carries subsection PDF refs, Spanish directives, expanded-CNV boundary metadata, basic/transform sentence frames, and explicit generation blockers for negative, emphatic, and yes/no question sentences.",
          andrewsRefs: Array.from(SENTENCE_LESSON8_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON8_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        expandedVncFrame: getSentenceLesson8ExpandedVncFrame(),
        basicSentenceFrame: getSentenceLesson8BasicSentenceFrame(),
        transformFrame: getSentenceLesson8TransformFrame(),
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson8RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-8-pursuit-frame",
        routeStage: "audit-lesson-8",
        sourceInput: "Andrews Lesson 8.1-8.6",
        supported: false,
        diagnostics: ["lesson-8-sentence-layer-partial"],
        morphBoundaryFrame: frame.expandedVncFrame,
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sentenceLayerStatus: "partial"
        },
        targetContract: {
          metadataKind: "lesson-8-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getSentenceLesson9OptativeVncFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON9_OPTATIVE_VNC_FRAME);
    }
    function getSentenceLesson9WishSentenceFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON9_WISH_SENTENCE_FRAME);
    }
    function getSentenceLesson9CommandExhortationFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON9_COMMAND_EXHORTATION_FRAME);
    }
    function getSentenceLesson9SubsectionInventory() {
      return SENTENCE_LESSON9_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON9_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera oraciones optativas, de mandato ni de exhortacion"
      }));
    }
    function getSentenceLesson9RemainingGaps() {
      return Array.from(SENTENCE_LESSON9_REMAINING_GAPS);
    }
    function buildSentenceLesson9PursuitFrame() {
      const inventory = getSentenceLesson9SubsectionInventory();
      const frame = {
        kind: "lesson-9-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 9,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON9_PDF_REFS),
        plannedArrows: [{
          id: "lesson-9-optative-sentence-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 9.1-9.9 against optative VNC use, wish sentences, command/exhortation sentences, and the no-separate-command-mood boundary.",
          andrewsRefs: Array.from(SENTENCE_LESSON9_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON9_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-9-optative-sentence-audit",
          result: "hit",
          correction: "Lesson 9 now carries subsection PDF refs, Spanish directives, optative VNC use metadata, wish/negative-wish frames, command/exhortation frames, canonical optativo engine keying, and explicit blockers for treating command labels as a separate Andrews mood.",
          andrewsRefs: Array.from(SENTENCE_LESSON9_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON9_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        optativeVncFrame: getSentenceLesson9OptativeVncFrame(),
        wishSentenceFrame: getSentenceLesson9WishSentenceFrame(),
        commandExhortationFrame: getSentenceLesson9CommandExhortationFrame(),
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson9RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-9-pursuit-frame",
        routeStage: "audit-lesson-9",
        sourceInput: "Andrews Lesson 9.1-9.9",
        supported: false,
        diagnostics: ["lesson-9-optative-sentence-layer-partial"],
        morphBoundaryFrame: frame.optativeVncFrame,
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sentenceLayerStatus: "partial",
          noSeparateCommandMood: true
        },
        participantFrame: {
          moodScope: "wish-command-exhortation",
          noSeparateCommandMood: true
        },
        targetContract: {
          metadataKind: "lesson-9-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getSentenceLesson10AdmonitiveMoodFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON10_ADMONITIVE_MOOD_FRAME);
    }
    function getSentenceLesson10NonpastAdmonitiveVncFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON10_NONPAST_ADMONITIVE_VNC_FRAME);
    }
    function getSentenceLesson10AffirmativeAdmonitionFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON10_AFFIRMATIVE_ADMONITION_FRAME);
    }
    function getSentenceLesson10NegativeAdmonitionFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON10_NEGATIVE_ADMONITION_FRAME);
    }
    function getSentenceLesson10ContrastFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON10_CONTRAST_FRAME);
    }
    function getSentenceLesson10SubsectionInventory() {
      return SENTENCE_LESSON10_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON10_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera oraciones admonitivas ni prohibiciones"
      }));
    }
    function getSentenceLesson10RemainingGaps() {
      return Array.from(SENTENCE_LESSON10_REMAINING_GAPS);
    }
    function buildSentenceLesson10PursuitFrame() {
      const inventory = getSentenceLesson10SubsectionInventory();
      const frame = {
        kind: "lesson-10-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 10,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON10_PDF_REFS),
        plannedArrows: [{
          id: "lesson-10-admonitive-sentence-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 10.1-10.5 against admonitive mood meaning, nonpast admonitive VNC formation, admonition sentence transforms, and admonitive/optative/indicative contrast diagnostics.",
          andrewsRefs: Array.from(SENTENCE_LESSON10_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON10_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-10-admonitive-sentence-audit",
          result: "hit",
          correction: "Lesson 10 now carries subsection PDF refs, Spanish directives, admonitive mood metadata, nonpast admonitive VNC formation, affirmative/negative admonition frames, and contrast diagnostics that block treating admonitive forms as negative commands.",
          andrewsRefs: Array.from(SENTENCE_LESSON10_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON10_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        admonitiveMoodFrame: getSentenceLesson10AdmonitiveMoodFrame(),
        nonpastAdmonitiveVncFrame: getSentenceLesson10NonpastAdmonitiveVncFrame(),
        affirmativeAdmonitionFrame: getSentenceLesson10AffirmativeAdmonitionFrame(),
        negativeAdmonitionFrame: getSentenceLesson10NegativeAdmonitionFrame(),
        contrastFrame: getSentenceLesson10ContrastFrame(),
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson10RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-10-pursuit-frame",
        routeStage: "audit-lesson-10",
        sourceInput: "Andrews Lesson 10.1-10.5",
        supported: false,
        diagnostics: ["lesson-10-admonitive-sentence-layer-partial"],
        morphBoundaryFrame: frame.nonpastAdmonitiveVncFrame,
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sentenceLayerStatus: "partial",
          admonitiveIsNotNegativeCommand: true
        },
        participantFrame: {
          moodScope: "admonition",
          admonitiveIsPositive: true
        },
        targetContract: {
          metadataKind: "lesson-10-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getSentenceLesson17MultipleNucleusFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_MULTIPLE_NUCLEUS_FRAME);
    }
    function getSentenceLesson17SupplementationFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_SUPPLEMENTATION_FRAME);
    }
    function getSentenceLesson17SharedReferentFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_SHARED_REFERENT_FRAME);
    }
    function getSentenceLesson17FurtherParticularsFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_FURTHER_PARTICULARS_FRAME);
    }
    function getSentenceLesson17TopicalizationFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_TOPICALIZATION_FRAME);
    }
    function getSentenceLesson17InformationQuestionFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON17_INFORMATION_QUESTION_FRAME);
    }
    function getSentenceLesson17SubsectionInventory() {
      return SENTENCE_LESSON17_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON17_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera suplementacion, topicos ni preguntas informativas sin AST y fuente Andrews concreta y puente ortografico"
      }));
    }
    function getSentenceLesson17RemainingGaps() {
      return Array.from(SENTENCE_LESSON17_REMAINING_GAPS);
    }
    function buildSentenceLesson17PursuitFrame() {
      const inventory = getSentenceLesson17SubsectionInventory();
      const multipleNucleusFrame = getSentenceLesson17MultipleNucleusFrame();
      const supplementationFrame = getSentenceLesson17SupplementationFrame();
      const sharedReferentFrame = getSentenceLesson17SharedReferentFrame();
      const furtherParticularsFrame = getSentenceLesson17FurtherParticularsFrame();
      const topicalizationFrame = getSentenceLesson17TopicalizationFrame();
      const informationQuestionFrame = getSentenceLesson17InformationQuestionFrame();
      const frame = {
        kind: "lesson-17-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 17,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON17_PDF_REFS),
        plannedArrows: [{
          id: "lesson-17-supplementation-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 17.1-17.6 against multiple-nucleus structure, supplementation roles, shared-referent contact, topicalization, and information-question transforms.",
          andrewsRefs: Array.from(SENTENCE_LESSON17_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON17_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-17-supplementation-audit",
          result: "hit",
          correction: "Lesson 17 now carries subsection PDF refs, Spanish directives, multiple-nucleus metadata, supplementation role frames, shared-referent diagnostics, topicalization boundaries, and question-transform blockers.",
          andrewsRefs: Array.from(SENTENCE_LESSON17_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON17_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        multipleNucleusFrame,
        supplementationFrame,
        sharedReferentFrame,
        furtherParticularsFrame,
        topicalizationFrame,
        informationQuestionFrame,
        currentEngineBoundary: {
          sentenceLayerMetadataOnly: true,
          supplementationAstGenerated: false,
          topicUiLabelsAreEvidence: false,
          ordinaryNncFormulaSlotsReused: false,
          includedReferentDeferred: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson17RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-17-pursuit-frame",
        routeStage: "audit-lesson-17",
        sourceInput: "Andrews Lesson 17.1-17.6",
        structuralSource: "Andrews Lesson 17",
        andrewsRefs: ["Andrews Lesson 17.1-17.6"],
        supported: false,
        diagnostics: ["lesson-17-supplementation-partial"],
        morphBoundaryFrame: {
          relationType: supplementationFrame.relationType,
          headAlways: supplementationFrame.headAlways,
          supplementRoles: supplementationFrame.supplementRoles
        },
        nuclearClauseFrame: {
          sentenceLayerStatus: "partial",
          multipleNucleusFrame,
          supplementationFrame,
          sharedReferentFrame
        },
        participantFrame: {
          supplementRoles: supplementationFrame.supplementRoles,
          headFunctions: supplementationFrame.expandableNuclearFunctions
        },
        targetContract: {
          metadataKind: "lesson-17-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          requiresSentenceAst: true
        }
      });
    }
    function getSentenceLesson18IntegratedSupplementFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_INTEGRATED_SUPPLEMENT_FRAME);
    }
    function getSentenceLesson18ShortPronominalFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_SHORT_PRONOMINAL_FRAME);
    }
    function getSentenceLesson18MarkedSupplementationFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_MARKED_SUPPLEMENTATION_FRAME);
    }
    function getSentenceLesson18DiscontinuousFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_DISCONTINUOUS_FRAME);
    }
    function getSentenceLesson18AgreementExceptionFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_AGREEMENT_EXCEPTION_FRAME);
    }
    function getSentenceLesson18NamedPartnerFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_NAMED_PARTNER_FRAME);
    }
    function getSentenceLesson18MaleBondingFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_MALE_BONDING_FRAME);
    }
    function getSentenceLesson18SilentSpecificObjectFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_SILENT_SPECIFIC_OBJECT_FRAME);
    }
    function getSentenceLesson18PrincipalDeletionFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_PRINCIPAL_DELETION_FRAME);
    }
    function getSentenceLesson18VocativeFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_VOCATIVE_FRAME);
    }
    function getSentenceLesson18SentenceOrderFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON18_SENTENCE_ORDER_FRAME);
    }
    function getSentenceLesson18SubsectionInventory() {
      return SENTENCE_LESSON18_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON18_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera integracion, marcas, discontinuidad, vocativos ni orden libre sin AST y fuente Andrews concreta y puente ortografico"
      }));
    }
    function getSentenceLesson18RemainingGaps() {
      return Array.from(SENTENCE_LESSON18_REMAINING_GAPS);
    }
    function buildSentenceLesson18PursuitFrame() {
      const inventory = getSentenceLesson18SubsectionInventory();
      const integratedSupplementFrame = getSentenceLesson18IntegratedSupplementFrame();
      const shortPronominalFrame = getSentenceLesson18ShortPronominalFrame();
      const markedSupplementationFrame = getSentenceLesson18MarkedSupplementationFrame();
      const discontinuousFrame = getSentenceLesson18DiscontinuousFrame();
      const agreementExceptionFrame = getSentenceLesson18AgreementExceptionFrame();
      const namedPartnerFrame = getSentenceLesson18NamedPartnerFrame();
      const maleBondingFrame = getSentenceLesson18MaleBondingFrame();
      const silentSpecificObjectFrame = getSentenceLesson18SilentSpecificObjectFrame();
      const principalDeletionFrame = getSentenceLesson18PrincipalDeletionFrame();
      const vocativeFrame = getSentenceLesson18VocativeFrame();
      const sentenceOrderFrame = getSentenceLesson18SentenceOrderFrame();
      const frame = {
        kind: "lesson-18-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 18,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON18_PDF_REFS),
        plannedArrows: [{
          id: "lesson-18-supplementation-part-two-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 18.1-18.12 against integrated supplementation, short pronominal NNCs, marked and discontinuous supplements, agreement exceptions, named-partner and male-bonding supplements, silent object heads, principal deletion, vocatives, and free sentence order.",
          andrewsRefs: Array.from(SENTENCE_LESSON18_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON18_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-18-supplementation-part-two-audit",
          result: "hit",
          correction: "Lesson 18 now carries subsection PDF refs, Spanish directives, integrated-supplement metadata, short-pronominal boundaries, marked/discontinuous diagnostics, agreement and referent exceptions, silent-object blockers, vocative boundaries, and sentence-order anti-translation warnings.",
          andrewsRefs: Array.from(SENTENCE_LESSON18_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON18_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        integratedSupplementFrame,
        shortPronominalFrame,
        markedSupplementationFrame,
        discontinuousFrame,
        agreementExceptionFrame,
        namedPartnerFrame,
        maleBondingFrame,
        silentSpecificObjectFrame,
        principalDeletionFrame,
        vocativeFrame,
        sentenceOrderFrame,
        currentEngineBoundary: {
          sentenceLayerMetadataOnly: true,
          supplementationAstGenerated: false,
          shortPronominalNncGenerated: false,
          markedSupplementationParsed: false,
          discontinuityResolved: false,
          vocativeGenerated: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson18RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-18-pursuit-frame",
        routeStage: "audit-lesson-18",
        sourceInput: "Andrews Lesson 18.1-18.12",
        structuralSource: "Andrews Lesson 18",
        andrewsRefs: ["Andrews Lesson 18.1-18.12"],
        supported: false,
        diagnostics: ["lesson-18-supplementation-part-two-partial"],
        morphBoundaryFrame: {
          integratedSupplementFrame,
          markedSupplementationFrame,
          silentSpecificObjectFrame,
          vocativeFrame
        },
        nuclearClauseFrame: {
          sentenceLayerStatus: "partial",
          shortPronominalFrame,
          discontinuousFrame,
          principalDeletionFrame,
          sentenceOrderFrame
        },
        participantFrame: {
          agreementExceptionFrame,
          namedPartnerFrame,
          maleBondingFrame,
          silentSpecificObjectHead: silentSpecificObjectFrame.supplementaryObjectHead
        },
        targetContract: {
          metadataKind: "lesson-18-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          requiresSentenceAst: true,
          requiresAndrewsSourceGate: true
        }
      });
    }
    function getSentenceLesson19VncSupplementsFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_VNC_SUPPLEMENTS_FRAME);
    }
    function getSentenceLesson19PronominalPluralFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_PRONOMINAL_PLURAL_FRAME);
    }
    function getSentenceLesson19IncludedReferentFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_INCLUDED_REFERENT_FRAME);
    }
    function getSentenceLesson19InfinitiveTranslationFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_INFINITIVE_TRANSLATION_FRAME);
    }
    function getSentenceLesson19RumoredReportFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_RUMORED_REPORT_FRAME);
    }
    function getSentenceLesson19DeletedSayingFrame() {
      return cloneSentenceLessonRecord(SENTENCE_LESSON19_DELETED_SAYING_FRAME);
    }
    function getSentenceLesson19SubsectionInventory() {
      return SENTENCE_LESSON19_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(SENTENCE_LESSON19_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera CNV suplementarias, referente incluido, reporte, cita ni traducciones infinitivas sin AST y fuente Andrews concreta y puente ortografico"
      }));
    }
    function getSentenceLesson19RemainingGaps() {
      return Array.from(SENTENCE_LESSON19_REMAINING_GAPS);
    }
    function buildSentenceLesson19PursuitFrame() {
      const inventory = getSentenceLesson19SubsectionInventory();
      const vncSupplementsFrame = getSentenceLesson19VncSupplementsFrame();
      const pronominalPluralFrame = getSentenceLesson19PronominalPluralFrame();
      const includedReferentFrame = getSentenceLesson19IncludedReferentFrame();
      const infinitiveTranslationFrame = getSentenceLesson19InfinitiveTranslationFrame();
      const rumoredReportFrame = getSentenceLesson19RumoredReportFrame();
      const deletedSayingFrame = getSentenceLesson19DeletedSayingFrame();
      const frame = {
        kind: "lesson-19-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 19,
        aimStatus: "shooting",
        pdfRefs: Array.from(SENTENCE_LESSON19_PDF_REFS),
        plannedArrows: [{
          id: "lesson-19-supplementation-part-three-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 19.1-19.6 against VNC supplements, pronominal plural supplementation, included-referent architecture, infinitive-translation conditions, rumored report, and deleted saying principals.",
          andrewsRefs: Array.from(SENTENCE_LESSON19_PDF_REFS),
          expectedFeedbackRefs: Array.from(SENTENCE_LESSON19_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-19-supplementation-part-three-audit",
          result: "hit",
          correction: "Lesson 19 now carries subsection PDF refs, Spanish directives, VNC supplement roles, pronominal plural supplementation metadata, included-referent frames, speech/complement semantic groups, rumored-report blockers, and deleted-saying diagnostics.",
          andrewsRefs: Array.from(SENTENCE_LESSON19_PDF_REFS),
          feedbackRefs: Array.from(SENTENCE_LESSON19_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        vncSupplementsFrame,
        pronominalPluralFrame,
        includedReferentFrame,
        infinitiveTranslationFrame,
        rumoredReportFrame,
        deletedSayingFrame,
        currentEngineBoundary: {
          sentenceLayerMetadataOnly: true,
          vncSupplementAstGenerated: false,
          includedReferentAstGenerated: false,
          reportedSpeechParsed: false,
          pronominalPluralGenerated: false,
          translationRulesGenerateForms: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getSentenceLesson19RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachSentenceGrammarContract(frame, {
        metadataKind: "lesson-19-pursuit-frame",
        routeStage: "audit-lesson-19",
        sourceInput: "Andrews Lesson 19.1-19.6",
        structuralSource: "Andrews Lesson 19",
        andrewsRefs: ["Andrews Lesson 19.1-19.6"],
        supported: false,
        diagnostics: ["lesson-19-supplementation-part-three-partial"],
        morphBoundaryFrame: {
          vncSupplementsFrame,
          pronominalPluralFrame,
          infinitiveTranslationFrame
        },
        nuclearClauseFrame: {
          sentenceLayerStatus: "partial",
          includedReferentFrame,
          rumoredReportFrame,
          deletedSayingFrame
        },
        participantFrame: {
          supplementRoles: vncSupplementsFrame.supplementRoles,
          principalClauseTypes: includedReferentFrame.principalClauseTypes,
          wholeSupplementAssessedAs: includedReferentFrame.wholeSupplementAssessedAs
        },
        targetContract: {
          metadataKind: "lesson-19-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          requiresSentenceAst: true,
          requiresAndrewsSourceGate: true
        }
      });
    }
    function buildSentenceOperatorSlot({
      slot = "",
      value = "",
      scope = "",
      particleCandidate = "",
      isParticleEvidenceBacked = false
    } = {}) {
      return {
        slot: String(slot || ""),
        value: String(value || ""),
        scope: String(scope || "sentence"),
        particleCandidate: String(particleCandidate || ""),
        isParticleEvidenceBacked: isParticleEvidenceBacked === true,
        generationAllowed: false
      };
    }
    function buildSentenceLayerMetadata({
      clauseKind = "",
      nuclearClauseShell = null,
      polarity = SENTENCE_POLARITY.affirmative,
      questionType = SENTENCE_QUESTION_TYPE.none,
      emphasisType = SENTENCE_EMPHASIS_TYPE.none,
      moodScope = SENTENCE_MOOD_SCOPE.declarative,
      particleCandidates = {},
      source = "manual-candidate",
      finiteTenseValue = ""
    } = {}) {
      const resolvedPolarity = normalizeSentencePolarity(polarity);
      const resolvedQuestionType = normalizeSentenceQuestionType(questionType);
      const resolvedEmphasisType = normalizeSentenceEmphasisType(emphasisType);
      const resolvedMoodScope = normalizeSentenceMoodScope(moodScope);
      const resolvedClauseKind = nuclearClauseShell?.clauseKind || clauseKind || "unknown";
      const layer = {
        kind: "sentence-layer-metadata",
        version: SENTENCE_LAYER_VERSION,
        structuralSource: "Andrews Lessons 8-10",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided forms",
        source,
        finiteTenseValue: String(finiteTenseValue || ""),
        clauseKind: String(resolvedClauseKind || "unknown"),
        nuclearClauseShell: nuclearClauseShell || null,
        generationAllowed: false,
        slots: {
          polarity: buildSentenceOperatorSlot({
            slot: "negation",
            value: resolvedPolarity,
            particleCandidate: particleCandidates.negation || ""
          }),
          question: buildSentenceOperatorSlot({
            slot: "question",
            value: resolvedQuestionType,
            particleCandidate: particleCandidates.question || ""
          }),
          emphasis: buildSentenceOperatorSlot({
            slot: "emphasis",
            value: resolvedEmphasisType,
            particleCandidate: particleCandidates.emphasis || ""
          }),
          mood: buildSentenceOperatorSlot({
            slot: "sentence-mood",
            value: resolvedMoodScope,
            particleCandidate: particleCandidates.mood || ""
          })
        },
        boundaries: {
          isSentenceEngine: false,
          isWordGeneration: false,
          changesFiniteVncOutput: false,
          hasConfirmedParticleInventory: false,
          finiteMoodIsSentenceSemantics: false
        },
        diagnostics: ["sentence-layer-diagnostic-only", "sentence-layer-source-gated"],
        antiConflationRules: getSentenceLayerAntiConflationRules()
      };
      return attachSentenceGrammarContract(layer, {
        metadataKind: "sentence-layer-metadata",
        routeStage: "classify-sentence-layer",
        sourceInput: String(layer.finiteTenseValue || layer.clauseKind || ""),
        supported: false,
        nuclearClauseFrame: nuclearClauseShell || {
          clauseKind: layer.clauseKind
        },
        participantFrame: {
          polarity: resolvedPolarity,
          questionType: resolvedQuestionType,
          emphasisType: resolvedEmphasisType,
          moodScope: resolvedMoodScope
        },
        targetContract: {
          metadataKind: "sentence-layer-metadata",
          generationAllowed: false,
          changesFiniteVncOutput: false,
          hasConfirmedParticleInventory: false
        }
      });
    }
    function buildBasicSentenceBoundaryMetadata(options = {}) {
      const boundary = {
        kind: "basic-sentence-boundary",
        version: SENTENCE_LAYER_VERSION,
        lessonRange: "8-10",
        status: "partial",
        sentenceLayer: buildSentenceLayerMetadata(options),
        generationAllowed: false,
        supportedFiniteFormsRemainInVnc: true,
        unsupportedBehavior: ["negation particle generation", "question particle generation", "emphasis particle generation", "sentence-level optative semantics", "sentence-level admonitive semantics"],
        antiConflationRules: getSentenceLayerAntiConflationRules()
      };
      return attachSentenceGrammarContract(boundary, {
        metadataKind: "basic-sentence-boundary",
        routeStage: "classify-boundary",
        supported: false,
        morphBoundaryFrame: boundary,
        nuclearClauseFrame: boundary.sentenceLayer?.grammarFrame?.nuclearClauseFrame || null
      });
    }
    function isSentenceLayerGenerationOptIn(override = null) {
      const sentenceLayer = override?.sentenceLayer;
      return sentenceLayer === true || sentenceLayer && typeof sentenceLayer === "object" && sentenceLayer.enabled === true;
    }
    function getSentenceLayerGenerationOptions(override = null) {
      return override?.sentenceLayer && typeof override.sentenceLayer === "object" ? override.sentenceLayer : {};
    }
    function buildGeneratedSentenceLayerMetadata({
      override = null,
      tense = "",
      nuclearClauseShell = null,
      clauseKind = ""
    } = {}) {
      if (!isSentenceLayerGenerationOptIn(override)) {
        return null;
      }
      const sentenceLayer = getSentenceLayerGenerationOptions(override);
      return buildSentenceLayerMetadata({
        nuclearClauseShell,
        clauseKind: nuclearClauseShell?.clauseKind || clauseKind || "",
        polarity: sentenceLayer.polarity || SENTENCE_POLARITY.affirmative,
        questionType: sentenceLayer.questionType || SENTENCE_QUESTION_TYPE.none,
        emphasisType: sentenceLayer.emphasisType || SENTENCE_EMPHASIS_TYPE.none,
        moodScope: sentenceLayer.moodScope || SENTENCE_MOOD_SCOPE.declarative,
        particleCandidates: sentenceLayer.particleCandidates || {},
        source: sentenceLayer.source || "nuclear-clause-surface-override",
        finiteTenseValue: tense
      });
    }
    function classifySentenceCandidate({
      text = "",
      polarity = "",
      questionType = "",
      emphasisType = "",
      moodScope = ""
    } = {}) {
      const sentenceLayer = buildSentenceLayerMetadata({
        polarity: polarity || SENTENCE_POLARITY.unknown,
        questionType: questionType || SENTENCE_QUESTION_TYPE.unknown,
        emphasisType: emphasisType || SENTENCE_EMPHASIS_TYPE.unknown,
        moodScope: moodScope || SENTENCE_MOOD_SCOPE.unknown,
        source: "candidate"
      });
      const classification = {
        kind: "sentence-candidate-classification",
        version: SENTENCE_LAYER_VERSION,
        text: String(text == null ? "" : text),
        matched: false,
        status: "unconfirmed",
        sentenceLayer,
        generationAllowed: false,
        diagnostics: ["sentence-candidate-unconfirmed"]
      };
      return attachSentenceGrammarContract(classification, {
        metadataKind: "sentence-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.text,
        supported: false,
        diagnostics: classification.diagnostics,
        nuclearClauseFrame: sentenceLayer.grammarFrame?.nuclearClauseFrame || null,
        participantFrame: sentenceLayer.grammarFrame?.participantFrame || null
      });
    }

    const api = {};
    Object.defineProperty(api, "SENTENCE_LAYER_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LAYER_VERSION; },
    });
    Object.defineProperty(api, "SENTENCE_POLARITY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_POLARITY; },
    });
    Object.defineProperty(api, "SENTENCE_QUESTION_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_QUESTION_TYPE; },
    });
    Object.defineProperty(api, "SENTENCE_EMPHASIS_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_EMPHASIS_TYPE; },
    });
    Object.defineProperty(api, "SENTENCE_MOOD_SCOPE", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_MOOD_SCOPE; },
    });
    Object.defineProperty(api, "SENTENCE_LAYER_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LAYER_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_EXPANDED_VNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_EXPANDED_VNC_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_BASIC_SENTENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_BASIC_SENTENCE_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_TRANSFORM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_TRANSFORM_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON8_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON8_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_OPTATIVE_VNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_OPTATIVE_VNC_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_WISH_SENTENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_WISH_SENTENCE_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_COMMAND_EXHORTATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_COMMAND_EXHORTATION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON9_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON9_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_ADMONITIVE_MOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_ADMONITIVE_MOOD_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_NONPAST_ADMONITIVE_VNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_NONPAST_ADMONITIVE_VNC_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_AFFIRMATIVE_ADMONITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_AFFIRMATIVE_ADMONITION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_NEGATIVE_ADMONITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_NEGATIVE_ADMONITION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_CONTRAST_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_CONTRAST_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON10_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON10_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_MULTIPLE_NUCLEUS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_MULTIPLE_NUCLEUS_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_SUPPLEMENTATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_SUPPLEMENTATION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_SHARED_REFERENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_SHARED_REFERENT_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_FURTHER_PARTICULARS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_FURTHER_PARTICULARS_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_TOPICALIZATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_TOPICALIZATION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_INFORMATION_QUESTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_INFORMATION_QUESTION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON17_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON17_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_INTEGRATED_SUPPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_INTEGRATED_SUPPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_SHORT_PRONOMINAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_SHORT_PRONOMINAL_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_MARKED_SUPPLEMENTATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_MARKED_SUPPLEMENTATION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_DISCONTINUOUS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_DISCONTINUOUS_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_AGREEMENT_EXCEPTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_AGREEMENT_EXCEPTION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_NAMED_PARTNER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_NAMED_PARTNER_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_MALE_BONDING_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_MALE_BONDING_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_SILENT_SPECIFIC_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_SILENT_SPECIFIC_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_PRINCIPAL_DELETION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_PRINCIPAL_DELETION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_VOCATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_VOCATIVE_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_SENTENCE_ORDER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_SENTENCE_ORDER_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON18_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON18_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_PDF_REFS; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_VNC_SUPPLEMENTS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_VNC_SUPPLEMENTS_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_PRONOMINAL_PLURAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_PRONOMINAL_PLURAL_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_INCLUDED_REFERENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_INCLUDED_REFERENT_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_INFINITIVE_TRANSLATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_INFINITIVE_TRANSLATION_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_RUMORED_REPORT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_RUMORED_REPORT_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_DELETED_SAYING_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_DELETED_SAYING_FRAME; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "SENTENCE_LESSON19_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return SENTENCE_LESSON19_REMAINING_GAPS; },
    });
    api.attachSentenceGrammarContract = attachSentenceGrammarContract;
    api.normalizeSentenceEnum = normalizeSentenceEnum;
    api.normalizeSentencePolarity = normalizeSentencePolarity;
    api.normalizeSentenceQuestionType = normalizeSentenceQuestionType;
    api.normalizeSentenceEmphasisType = normalizeSentenceEmphasisType;
    api.normalizeSentenceMoodScope = normalizeSentenceMoodScope;
    api.getSentenceLayerAntiConflationRules = getSentenceLayerAntiConflationRules;
    api.cloneSentenceLessonArray = cloneSentenceLessonArray;
    api.cloneSentenceLessonRecord = cloneSentenceLessonRecord;
    api.cloneSentenceLesson8Array = cloneSentenceLesson8Array;
    api.cloneSentenceLesson8Record = cloneSentenceLesson8Record;
    api.getSentenceLesson8ExpandedVncFrame = getSentenceLesson8ExpandedVncFrame;
    api.getSentenceLesson8BasicSentenceFrame = getSentenceLesson8BasicSentenceFrame;
    api.getSentenceLesson8TransformFrame = getSentenceLesson8TransformFrame;
    api.getSentenceLesson8SubsectionInventory = getSentenceLesson8SubsectionInventory;
    api.getSentenceLesson8RemainingGaps = getSentenceLesson8RemainingGaps;
    api.buildSentenceLesson8PursuitFrame = buildSentenceLesson8PursuitFrame;
    api.getSentenceLesson9OptativeVncFrame = getSentenceLesson9OptativeVncFrame;
    api.getSentenceLesson9WishSentenceFrame = getSentenceLesson9WishSentenceFrame;
    api.getSentenceLesson9CommandExhortationFrame = getSentenceLesson9CommandExhortationFrame;
    api.getSentenceLesson9SubsectionInventory = getSentenceLesson9SubsectionInventory;
    api.getSentenceLesson9RemainingGaps = getSentenceLesson9RemainingGaps;
    api.buildSentenceLesson9PursuitFrame = buildSentenceLesson9PursuitFrame;
    api.getSentenceLesson10AdmonitiveMoodFrame = getSentenceLesson10AdmonitiveMoodFrame;
    api.getSentenceLesson10NonpastAdmonitiveVncFrame = getSentenceLesson10NonpastAdmonitiveVncFrame;
    api.getSentenceLesson10AffirmativeAdmonitionFrame = getSentenceLesson10AffirmativeAdmonitionFrame;
    api.getSentenceLesson10NegativeAdmonitionFrame = getSentenceLesson10NegativeAdmonitionFrame;
    api.getSentenceLesson10ContrastFrame = getSentenceLesson10ContrastFrame;
    api.getSentenceLesson10SubsectionInventory = getSentenceLesson10SubsectionInventory;
    api.getSentenceLesson10RemainingGaps = getSentenceLesson10RemainingGaps;
    api.buildSentenceLesson10PursuitFrame = buildSentenceLesson10PursuitFrame;
    api.getSentenceLesson17MultipleNucleusFrame = getSentenceLesson17MultipleNucleusFrame;
    api.getSentenceLesson17SupplementationFrame = getSentenceLesson17SupplementationFrame;
    api.getSentenceLesson17SharedReferentFrame = getSentenceLesson17SharedReferentFrame;
    api.getSentenceLesson17FurtherParticularsFrame = getSentenceLesson17FurtherParticularsFrame;
    api.getSentenceLesson17TopicalizationFrame = getSentenceLesson17TopicalizationFrame;
    api.getSentenceLesson17InformationQuestionFrame = getSentenceLesson17InformationQuestionFrame;
    api.getSentenceLesson17SubsectionInventory = getSentenceLesson17SubsectionInventory;
    api.getSentenceLesson17RemainingGaps = getSentenceLesson17RemainingGaps;
    api.buildSentenceLesson17PursuitFrame = buildSentenceLesson17PursuitFrame;
    api.getSentenceLesson18IntegratedSupplementFrame = getSentenceLesson18IntegratedSupplementFrame;
    api.getSentenceLesson18ShortPronominalFrame = getSentenceLesson18ShortPronominalFrame;
    api.getSentenceLesson18MarkedSupplementationFrame = getSentenceLesson18MarkedSupplementationFrame;
    api.getSentenceLesson18DiscontinuousFrame = getSentenceLesson18DiscontinuousFrame;
    api.getSentenceLesson18AgreementExceptionFrame = getSentenceLesson18AgreementExceptionFrame;
    api.getSentenceLesson18NamedPartnerFrame = getSentenceLesson18NamedPartnerFrame;
    api.getSentenceLesson18MaleBondingFrame = getSentenceLesson18MaleBondingFrame;
    api.getSentenceLesson18SilentSpecificObjectFrame = getSentenceLesson18SilentSpecificObjectFrame;
    api.getSentenceLesson18PrincipalDeletionFrame = getSentenceLesson18PrincipalDeletionFrame;
    api.getSentenceLesson18VocativeFrame = getSentenceLesson18VocativeFrame;
    api.getSentenceLesson18SentenceOrderFrame = getSentenceLesson18SentenceOrderFrame;
    api.getSentenceLesson18SubsectionInventory = getSentenceLesson18SubsectionInventory;
    api.getSentenceLesson18RemainingGaps = getSentenceLesson18RemainingGaps;
    api.buildSentenceLesson18PursuitFrame = buildSentenceLesson18PursuitFrame;
    api.getSentenceLesson19VncSupplementsFrame = getSentenceLesson19VncSupplementsFrame;
    api.getSentenceLesson19PronominalPluralFrame = getSentenceLesson19PronominalPluralFrame;
    api.getSentenceLesson19IncludedReferentFrame = getSentenceLesson19IncludedReferentFrame;
    api.getSentenceLesson19InfinitiveTranslationFrame = getSentenceLesson19InfinitiveTranslationFrame;
    api.getSentenceLesson19RumoredReportFrame = getSentenceLesson19RumoredReportFrame;
    api.getSentenceLesson19DeletedSayingFrame = getSentenceLesson19DeletedSayingFrame;
    api.getSentenceLesson19SubsectionInventory = getSentenceLesson19SubsectionInventory;
    api.getSentenceLesson19RemainingGaps = getSentenceLesson19RemainingGaps;
    api.buildSentenceLesson19PursuitFrame = buildSentenceLesson19PursuitFrame;
    api.buildSentenceOperatorSlot = buildSentenceOperatorSlot;
    api.buildSentenceLayerMetadata = buildSentenceLayerMetadata;
    api.buildBasicSentenceBoundaryMetadata = buildBasicSentenceBoundaryMetadata;
    api.isSentenceLayerGenerationOptIn = isSentenceLayerGenerationOptIn;
    api.getSentenceLayerGenerationOptions = getSentenceLayerGenerationOptions;
    api.buildGeneratedSentenceLayerMetadata = buildGeneratedSentenceLayerMetadata;
    api.classifySentenceCandidate = classifySentenceCandidate;
    return api;
}

export function installSentenceGlobals(targetObject = globalThis) {
    const api = createSentenceApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
