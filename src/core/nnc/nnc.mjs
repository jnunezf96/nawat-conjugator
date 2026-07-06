// Native wrapper generated from src/core/nnc/nnc.js.

export function createNncApi(targetObject = globalThis) {
    const ORDINARY_NNC_STATE = Object.freeze({
      absolutive: "absolutive",
      possessive: "possessive"
    });
    const ORDINARY_NNC_CLAUSE_KIND = "nominal-nuclear-clause";
    const ORDINARY_NNC_PLURAL_TYPE = Object.freeze({
      auto: "auto",
      count: "count",
      distributive: "distributive"
    });
    const ORDINARY_NNC_POSSESSION_KIND = Object.freeze({
      ordinary: "ordinary",
      organic: "organic"
    });
    const ORDINARY_NNC_DIAGNOSTIC_IDS = Object.freeze({
      unsupportedStem: "ordinary-nnc-unsupported-stem",
      unsupportedState: "ordinary-nnc-unsupported-state",
      unsupportedPossessiveState: "ordinary-nnc-unsupported-possessive-state",
      unsupportedPossessor: "ordinary-nnc-unsupported-possessor",
      unsupportedNumber: "ordinary-nnc-unsupported-number",
      unsupportedPluralType: "ordinary-nnc-unsupported-plural-type",
      unsupportedSubject: "ordinary-nnc-unsupported-subject",
      nounClassMismatch: "ordinary-nnc-noun-class-mismatch",
      classStemIncompatible: "ordinary-nnc-class-stem-incompatible",
      legacyFormulaStringBlocked: "ordinary-nnc-legacy-formula-string-blocked",
      legacyFormulaStringConflictsWithSlots: "ordinary-nnc-legacy-formula-string-conflicts-with-slots",
      organicPossessionMissingSourceFrame: "ordinary-nnc-organic-possession-missing-source-frame",
      organicPossessionMissingOperationFrame: "ordinary-nnc-organic-possession-missing-operation-frame",
      organicPossessionContradictoryFrame: "ordinary-nnc-organic-possession-contradictory-frame",
      organicPossessionRequiresPossessiveState: "ordinary-nnc-organic-possession-requires-possessive-state",
      organicPossessionRequiresPossessor: "ordinary-nnc-organic-possession-requires-possessor",
      possessiveStateMonadicMissingSourceFrame: "possessive-state-nnc-monadic-missing-source-frame",
      possessiveStateMonadicMissingOperationFrame: "possessive-state-nnc-monadic-missing-operation-frame",
      possessiveStateMonadicContradictoryFrame: "possessive-state-nnc-monadic-contradictory-frame",
      resultTextMissingTypedOperationFrame: "ordinary-nnc-result-text-missing-typed-operation-frame"
    });
    const NNC_LESSON12_VALIDATION_REFS = Object.freeze(["src/tests/nnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NNC_LESSON12_PDF_REFS = Object.freeze(["Andrews Lesson 12.1", "Andrews Lesson 12.2", "Andrews Lesson 12.3", "Andrews Lesson 12.4", "Andrews Lesson 12.5", "Andrews Lesson 12.6", "Andrews Lesson 12.7"]);
    const NNC_LESSON12_FORMULA_CONTRAST_FRAME = Object.freeze({
      kind: "lesson-12-nnc-vnc-contrast-frame",
      sourceSection: "Andrews §12.1",
      nncFormula: "#pers1-pers2(STEM)num1-num2#",
      vncContrast: "NNC has State where VNC has Valence, and NNC has no Tense position.",
      stateFunction: "State brings a possessor participant into the predicate.",
      valenceContrast: "Valence brings an object participant; State brings a possessor participant.",
      hasTensePosition: false,
      generationAllowed: false
    });
    const NNC_LESSON12_ABSOLUTIVE_FORMULA_FRAME = Object.freeze({
      kind: "lesson-12-absolutive-nnc-formula-frame",
      sourceSection: "Andrews §12.2",
      linearFormula: "#pers1-pers2(STEM)num1-num2#",
      diagrammaticFormula: Object.freeze({
        subjectLine: "#pers1-pers2(...)num1-num2#",
        predicateLine: "(STEM)"
      }),
      statePosition: "vacant",
      possessorPronounPresent: false,
      predicateStemInsideParentheses: true,
      subjectConnectorOutsideParentheses: true,
      generationAllowed: false
    });
    const NNC_LESSON12_SUBJECT_POSITION_FRAME = Object.freeze({
      kind: "lesson-12-absolutive-subject-position-frame",
      sourceSection: "Andrews §12.3",
      pers1Pers2Rule: Object.freeze({
        sameAsVncExcept: Object.freeze(["second-person x carrier absent", "second-person xi carrier absent"]),
        absentCarriers: Object.freeze(["x", "xi"])
      }),
      num1Num2Rule: Object.freeze({
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: Object.freeze(["predicate-state", "nounstem", "noun suffix"]),
        sensitiveToPredicateState: true,
        singularCommonDyads: Object.freeze(["tl-0", "tli-0", "li-0", "in-0", "0-0"]),
        pluralDyads: Object.freeze(["t-in", "m-eh", "0-h"]),
        nawatPluralDyadBridge: Object.freeze([Object.freeze({
          classicalDyad: "m-eh",
          currentNawatDyad: "m-et",
          num1: "m",
          classicalNum2: "eh",
          currentNawatNum2: "et",
          orthographyRule: "Classical final -h maps to current Nawat/Pipil -t."
        })]),
        singularNum1Morphs: Object.freeze(["tl", "tli", "li", "in", "0"]),
        pluralNum1Morphs: Object.freeze(["t", "m", "0"]),
        singularNum2Morphs: Object.freeze(["0"]),
        pluralNum2Morphs: Object.freeze(["in", "eh", "h"])
      }),
      nawatRealizationStatus: "Classical filler letters are Andrews structural evidence; Nawat/Pipil realization requires orthography bridge plus evidence."
    });
    const NNC_LESSON12_SUBJECT_PRONOUN_INVENTORY_FRAME = Object.freeze({
      kind: "lesson-12-absolutive-subject-pronoun-inventory-frame",
      sourceSection: "Andrews §12.4",
      formulaUse: "subject only on absolutive-state NNCs",
      contrastsWith: "possessive-state NNC subject shapes in Andrews Lesson 13.3",
      persons: Object.freeze([Object.freeze({
        id: "1sg",
        number: "singular",
        variantCount: 4
      }), Object.freeze({
        id: "1pl",
        number: "plural",
        variantCount: 3
      }), Object.freeze({
        id: "2sg",
        number: "singular",
        variantCount: 4
      }), Object.freeze({
        id: "2pl",
        number: "plural",
        variantCount: 3
      }), Object.freeze({
        id: "3sg-common",
        number: "singular-common",
        variantCount: 4
      }), Object.freeze({
        id: "3pl",
        number: "plural",
        variantCount: 3
      })]),
      includesSupportiveAndAssimilatedPers1Shapes: true,
      generationAllowed: false
    });
    const NNC_LESSON12_PREDICATE_FRAME = Object.freeze({
      kind: "lesson-12-absolutive-predicate-frame",
      sourceSection: "Andrews §12.5",
      predicateState: "absolutive",
      statePosition: "vacant",
      predicateConstituent: "nounstem-alone-in-these-lessons",
      hasTenseMorph: false,
      timeReferenceSource: "discourse-context",
      translationRequiresEnglishCopulaChoice: true,
      definitenessMarkedInNahuatlNnc: false,
      predicateFunctions: Object.freeze(["identify", "describe", "locate"]),
      nounstemNotIndependentWord: true,
      generationAllowed: false
    });
    const NNC_LESSON12_ANIMACY_FRAME = Object.freeze({
      kind: "lesson-12-animacy-frame",
      sourceSection: "Andrews §12.6",
      nounstemAnimacyIsCulturalClassification: true,
      subjectReferenceIsDecisive: true,
      animateNncAllowsSubjectNumberContrast: true,
      nonanimateNncAllowsCommonNumberOnly: true,
      metaphorCanOverrideExpectedAnimacy: true,
      countMassDistinctionAbsent: true,
      numberPositionBelongsToSubject: true,
      numberPositionNotInflectionOnNounstem: true,
      warning: "num1-num2 belongs to the subject personal pronoun, not to the nounstem."
    });
    const NNC_LESSON12_STATE_NOUNSTEM_FRAME = Object.freeze({
      kind: "lesson-12-state-nounstem-frame",
      sourceSection: "Andrews §12.7",
      stateRelationDiffersFromValence: true,
      nounstemUsuallyDoesNotChooseState: true,
      mostNounstemsCanUseEitherState: true,
      restrictedStateStemsDeferredToLesson15: true,
      generationAllowed: false
    });
    const NNC_LESSON12_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson12-nnc-vnc-contrast",
      andrewsSection: "12.1",
      category: "nnc-vnc-formula-contrast",
      directiveEs: "La CNN tiene Estado donde la CNV tiene Valencia, y no tiene posicion de tiempo.",
      engineSurface: "formula and category metadata over ordinary NNC output",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-absolutive-state-nnc",
      andrewsSection: "12.2",
      category: "absolutive-state-formula",
      directiveEs: "La formula absolutiva es #pers1-pers2(STEM)num1-num2#; el Estado esta vacante y el tronco funciona como predicado.",
      engineSurface: "ordinary NNC formula slots",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-subject-positions",
      andrewsSection: "12.3",
      category: "absolutive-subject-slots",
      directiveEs: "pers1/pers2 siguen la CNV salvo x/xi; num1-num2 es conector del sujeto, no estado ni sufijo del nombre.",
      engineSurface: "subject and num1-num2 metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-subject-pronoun-summary",
      andrewsSection: "12.4",
      category: "absolutive-subject-pronoun-inventory",
      directiveEs: "Los paradigmas de sujeto absolutivo tienen variantes por persona y numero; no deben confundirse con los paradigmas posesivos de la Leccion 13.",
      engineSurface: "diagnostic inventory metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-predicate-position",
      andrewsSection: "12.5",
      category: "absolutive-predicate",
      directiveEs: "El tronco nominal identifica, describe o localiza al sujeto; no contiene tiempo y requiere contexto para referencia temporal.",
      engineSurface: "predicate metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-animacy",
      andrewsSection: "12.6",
      category: "animacy-and-reference",
      directiveEs: "La animacidad guia la referencia singular/plural, pero la referencia del sujeto decide; num1-num2 sigue siendo material del sujeto.",
      engineSurface: "animacy/reference diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson12-state-and-nounstem",
      andrewsSection: "12.7",
      category: "state-nounstem-boundary",
      directiveEs: "El Estado no se relaciona con el tronco como la Valencia se relaciona con el verbo; la mayoria de troncos puede entrar en ambos estados.",
      engineSurface: "state boundary metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const NNC_LESSON12_REMAINING_GAPS = Object.freeze(["The full Andrews 12.3-12.4 absolutive subject-pronoun filler inventory is not generated as a complete paradigm.", "Current ordinary NNC output follows Andrews slot logic and cannot import Classical num1-num2 surfaces directly; Nawat/Pipil realization still passes through the orthography bridge.", "Discourse time reference, definiteness/article choice, metaphorical animacy overrides, and state-restriction exceptions remain diagnostic or deferred."]);
    const NNC_LESSON13_VALIDATION_REFS = Object.freeze(["src/tests/nnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NNC_LESSON13_PDF_REFS = Object.freeze(["Andrews Lesson 13.1", "Andrews Lesson 13.2", "Andrews Lesson 13.3", "Andrews Lesson 13.4", "Andrews Lesson 13.5", "Andrews Lesson 13.6"]);
    const NNC_LESSON13_POSSESSIVE_FORMULA_FRAME = Object.freeze({
      kind: "lesson-13-possessive-nnc-formula-frame",
      sourceSection: "Andrews §13.1",
      formulas: Object.freeze([Object.freeze({
        id: "monadic-state-position",
        linearFormula: "#pers1-pers2+st(STEM)num1-num2#",
        subjectLine: "#pers1-pers2+...)num1-num2#",
        predicateLine: "+st(STEM)"
      }), Object.freeze({
        id: "dyadic-state-position",
        linearFormula: "#pers1-pers2+st1-st2(STEM)num1-num2#",
        subjectLine: "#pers1-pers2+...)num1-num2#",
        predicateLine: "+st1-st2(STEM)"
      })]),
      statePosition: "present-in-predicate",
      stateBringsParticipantRole: "possessor",
      hasTensePosition: false,
      stemProblemDeferredToLesson14: true,
      generationAllowed: false
    });
    const NNC_LESSON13_SUBJECT_POSITION_FRAME = Object.freeze({
      kind: "lesson-13-possessive-subject-position-frame",
      sourceSection: "Andrews §13.2",
      pers1Pers2Rule: "same fillers as absolutive-state NNC subject positions in Andrews 12.3.1",
      num1Num2Rule: Object.freeze({
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: Object.freeze(["predicate-state", "possessor", "nounstem", "noun suffix"]),
        sensitiveToPredicateState: true,
        num1Variants: Object.freeze(["uh/hu", "hui", "0"]),
        singularCommonNum2: "0",
        pluralNum2: "an",
        uhAfterVowel: true,
        huiAfterConsonant: true,
        huiRareMorphologicallyConditioned: true,
        uhHuSpellingVariants: "uh before silent morph; hu before sounded morph"
      }),
      generationAllowed: false
    });
    const NNC_LESSON13_SUBJECT_PRONOUN_INVENTORY_FRAME = Object.freeze({
      kind: "lesson-13-possessive-subject-pronoun-inventory-frame",
      sourceSection: "Andrews §13.3",
      formulaUse: "subject only on possessive-state NNCs",
      contrastsWith: "absolutive-state NNC subject shapes in Andrews Lesson 12.4",
      persons: Object.freeze([Object.freeze({
        id: "1sg",
        number: "singular-common",
        variants: Object.freeze(["uh-0", "hui-0", "0-0"])
      }), Object.freeze({
        id: "1pl",
        number: "plural",
        variants: Object.freeze(["hu-an"])
      }), Object.freeze({
        id: "2sg",
        number: "singular-common",
        variants: Object.freeze(["uh-0", "hui-0", "0-0"])
      }), Object.freeze({
        id: "2pl",
        number: "plural",
        variants: Object.freeze(["hu-an"])
      }), Object.freeze({
        id: "3sg-common",
        number: "singular-common",
        variants: Object.freeze(["uh-0", "hui-0", "0-0"])
      }), Object.freeze({
        id: "3pl",
        number: "plural",
        variants: Object.freeze(["hu-an"])
      })]),
      nawatRealizationStatus: "current Nawat subject/connector output is orthography-bridge realization, not imported Classical connector paradigms",
      generationAllowed: false
    });
    const NNC_LESSON13_MONADIC_STATE_FRAME = Object.freeze({
      kind: "lesson-13-monadic-possessive-state-frame",
      sourceSection: "Andrews §13.4",
      statePosition: "monadic",
      stateSlot: "st",
      predicatePosition: true,
      expressesCategories: Object.freeze(["person", "number", "possessive-case"]),
      sameShapesAsMonadicValence: true,
      fillers: Object.freeze([Object.freeze({
        id: "reciprocative-possessor",
        andrewsMorph: "ne",
        meaning: "one another's / each other's",
        restrictions: Object.freeze(["third-person only", "highly infrequent", "narrower than shuntline reflexive/reciprocal object ne"]),
        nawatStatus: "requires an Andrews source gate plus orthography bridge before generation"
      }), Object.freeze({
        id: "human-nonspecific-possessor",
        andrewsMorph: "te",
        meaning: "someone's / anyone's / everyone's",
        frequency: "frequent",
        nawatCandidate: "te",
        nawatStatus: "requires an Andrews source gate plus orthography bridge before generation"
      }), Object.freeze({
        id: "nonhuman-nonspecific-possessor",
        andrewsMorph: "tla",
        meaning: "something's / anything's / everything's",
        primaryUse: "relational nounstems",
        lessonRefs: Object.freeze(["Andrews Lessons 45-47", "Andrews §15.1.6"]),
        nawatCandidate: "ta",
        nawatStatus: "orthography-adapted candidate only; requires an Andrews source gate plus orthography bridge before generation"
      })]),
      generationAllowed: false
    });
    const NNC_LESSON13_DYADIC_STATE_FRAME = Object.freeze({
      kind: "lesson-13-dyadic-possessive-state-frame",
      sourceSection: "Andrews §13.5",
      statePosition: "dyadic",
      stateSlots: Object.freeze(["st1", "st2"]),
      categoriesDistributedByThirdPerson: true,
      st1: Object.freeze({
        alwaysManifests: "person",
        thirdPerson: Object.freeze({
          combines: Object.freeze(["person", "possessive-case"]),
          filler: "i"
        }),
        firstSecondPerson: Object.freeze({
          combines: Object.freeze(["person", "number"]),
          fillers: Object.freeze(["m", "am", "n", "t"]),
          sameAsValenceSlot: "va1"
        })
      }),
      st2: Object.freeze({
        suppliesCategoryMissingFromSt1: true,
        thirdPerson: Object.freeze({
          manifests: "number",
          singular: "0",
          plural: "m~n...",
          soundChangeRefs: Object.freeze(["Andrews §2.11.1", "Andrews §2.11.5", "Andrews §2.12.4-5"])
        }),
        firstSecondPerson: Object.freeze({
          manifests: "possessive-case",
          filler: "o",
          vowelInitialStemAllomorph: "□"
        })
      }),
      generationAllowed: false
    });
    const NNC_LESSON13_SPECIFIC_POSSESSOR_FRAME = Object.freeze({
      kind: "lesson-13-specific-possessor-frame",
      sourceSection: "Andrews §13.6",
      role: "specific personal pronouns in possessor role",
      possessors: Object.freeze([Object.freeze({
        id: "1sg",
        andrews: "n-o ~ n-□",
        meaning: "my",
        currentNawatPrefix: "nu"
      }), Object.freeze({
        id: "1pl",
        andrews: "t-o ~ t-□",
        meaning: "our",
        currentNawatPrefix: "tu"
      }), Object.freeze({
        id: "2sg",
        andrews: "m-o ~ m-□",
        meaning: "your (sg)",
        currentNawatPrefix: "mu"
      }), Object.freeze({
        id: "2pl",
        andrews: "am-o ~ am-□",
        meaning: "your (pl)",
        currentNawatPrefix: "anmu"
      }), Object.freeze({
        id: "3sg-common",
        andrews: "i-0",
        meaning: "his/her/its; its/their",
        currentNawatPrefix: "i"
      }), Object.freeze({
        id: "3pl",
        andrews: "i-m ~ i-n...",
        meaning: "their",
        currentNawatPrefix: "in"
      })]),
      pluralPossessorTranslationRange: Object.freeze(["of one of us", "of one of you", "of one of them", "belonging to one of us/you/them"]),
      firstPluralBroadUse: "can broaden to someone's",
      traditionalSpellingWarning: "Distinguish VNC #am-0+m-o(... from NNC #0-0+am-o(... in texts with double/single consonant inconsistency.",
      nawatRealizationStatus: "current Nawat possessor prefixes are repo evidence, not automatic Classical surface imports",
      generationAllowed: false
    });
    const NNC_LESSON13_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson13-possessive-state-nnc",
      andrewsSection: "13.1",
      category: "possessive-state-formula",
      directiveEs: "La CNN posesiva tiene Estado en el predicado: monadico +st(STEM) o diadico +st1-st2(STEM), sin posicion de tiempo.",
      engineSurface: "possessive formula metadata over ordinary NNC output",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson13-subject-positions",
      andrewsSection: "13.2",
      category: "possessive-subject-slots",
      directiveEs: "El sujeto posesivo conserva pers1-pers2, y su num1-num2 usa conectores sensibles al Estado; el conector sigue siendo del sujeto.",
      engineSurface: "subject and num1-num2 metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson13-subject-pronoun-summary",
      andrewsSection: "13.3",
      category: "possessive-subject-pronoun-inventory",
      directiveEs: "Los paradigmas de sujeto posesivo solo sirven para CNN posesivas y contrastan con los paradigmas absolutivos de la Leccion 12.",
      engineSurface: "diagnostic inventory metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson13-monadic-state",
      andrewsSection: "13.4",
      category: "monadic-possessive-state",
      directiveEs: "El Estado monadico concentra persona, numero y caso posesivo en un solo pronombre prefijal: ne, te o tla.",
      engineSurface: "Andrews-licensed monadic-state taxonomy",
      redirectAction: "block-generation",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson13-dyadic-state",
      andrewsSection: "13.5",
      category: "dyadic-possessive-state",
      directiveEs: "El Estado diadico divide persona, numero y caso entre st1 y st2, con reglas distintas para poseedor de tercera persona.",
      engineSurface: "specific possessor metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson13-specific-possessors",
      andrewsSection: "13.6",
      category: "specific-possessor-pronouns",
      directiveEs: "Los poseedores especificos son pronombres posesivos; sus realizaciones Nawat se toman de evidencia del repo, no de importacion grafica clasica.",
      engineSurface: "current possessor-prefix metadata",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const NNC_LESSON13_REMAINING_GAPS = Object.freeze(["The full Andrews possessive-state subject connector inventory is not generated as a complete paradigm.", "Monadic possessive-state NNCs with ne, te, and nonhuman tla/ta are Andrews-licensed when the source stem is present; Classical letters still realize through the orthography bridge.", "Current specific possessor prefixes are orthography-bridge realizations of Andrews st1/st2 logic, while full allomorphy and traditional-spelling caveats remain diagnostic metadata.", "Lesson 14 stem selection is required before possessive-state NNC generation can claim full Andrews coverage."]);
    const NNC_LESSON14_VALIDATION_REFS = Object.freeze(["src/tests/nnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NNC_LESSON14_PDF_REFS = Object.freeze(["Andrews Lesson 14.1", "Andrews Lesson 14.2", "Andrews Lesson 14.3", "Andrews Lesson 14.4", "Andrews Lesson 14.5", "Andrews Lesson 14.6", "Andrews Lesson 14.7", "Andrews Lesson 14.8"]);
    const NNC_LESSON14_USE_STEM_FRAME = Object.freeze({
      kind: "lesson-14-use-stem-frame",
      sourceSection: "Andrews §14.1",
      restrictedUseStem: Object.freeze({
        shape: "base",
        usualRole: "citation-form",
        usedIn: Object.freeze(["absolutive-state NNC"])
      }),
      generalUseStem: Object.freeze({
        derivedFromRestrictedUseStem: true,
        usedIn: Object.freeze(["possessive-state NNC", "compound-stem embed subposition"]),
        shapeOptions: Object.freeze(["base", "truncated", "glottalized"])
      }),
      currentEngineBoundary: "ordinary NNC stores a predicate stem and class, but does not yet model complete restricted/general use-stem alternation",
      generationAllowed: false
    });
    const NNC_LESSON14_NOUNSTEM_CLASS_FRAME = Object.freeze({
      kind: "lesson-14-nounstem-class-frame",
      sourceSection: "Andrews §14.2",
      classNamingSlot: "subject num1 in absolutive singular/common NNCs",
      classMembershipPredictable: false,
      classes: Object.freeze([Object.freeze({
        andrewsClass: "ti",
        currentNawatClass: "t",
        absolutiveSingularCommonNum1: "tl",
        stemFinalShape: "vowel-final"
      }), Object.freeze({
        andrewsClass: "tli",
        currentNawatClass: "ti",
        absolutiveSingularCommonNum1: "tli/li",
        stemFinalShape: "consonant-final",
        liIsSeparateClass: false
      }), Object.freeze({
        andrewsClass: "in",
        currentNawatClass: "in",
        absolutiveSingularCommonNum1: "in",
        stemFinalShape: "consonant-final"
      }), Object.freeze({
        andrewsClass: "0",
        currentNawatClass: "zero",
        absolutiveSingularCommonNum1: "0",
        stemFinalShape: "consonant-or-vowel-final"
      })]),
      mainDivision: "ti-class versus all other classes",
      inAndZeroNotNumerous: true,
      alternativeClassMembershipPossible: true,
      supportiveInitialVowelMayHaveVariantWithoutVowel: true,
      currentEngineClasses: Object.freeze(["t", "ti", "in", "zero"]),
      currentEngineBoundary: "class/stem-final compatibility is enforced; lexical class membership and alternatives remain source-gated",
      generationAllowed: false
    });
    const NNC_LESSON14_NOUNSTEM_NUMBER_FRAME = Object.freeze({
      kind: "lesson-14-nounstem-number-frame",
      sourceSection: "Andrews §14.3",
      numberBelongsTo: "personal-pronoun subject",
      predicateMarksNumber: false,
      nounstemCanBeDerivationallyAlteredForGroupRelation: true,
      derivedStemTypes: Object.freeze([Object.freeze({
        id: "plain",
        relationship: "unmarked stem"
      }), Object.freeze({
        id: "affinity",
        relationship: "cohesive group relation",
        reduplication: "long-vowel reduplicative prefix inside the stem"
      }), Object.freeze({
        id: "distributive-varietal",
        relationship: "separate locations, separate members, or various kinds",
        reduplication: "glottal-stop reduplicative prefix inside the stem"
      })]),
      derivedStemIsNotSubjectPluralInflection: true,
      animateNonanimateDistinctionMaintained: true,
      affectiveStemContrast: "Lesson 32",
      pronominalPluralStemExceptions: Object.freeze(["Andrews §16.3", "Andrews §16.9"]),
      generationAllowed: false
    });
    const NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME = Object.freeze({
      kind: "lesson-14-absolutive-singular-common-frame",
      sourceSection: "Andrews §14.4",
      predicateState: "absolutive",
      subjectNumber: "singular/common",
      requiredStemShape: "restricted-use base shape",
      derivedDistributiveOrVarietalStemMayServeAsBase: true,
      hasTensePosition: false,
      generationAllowed: false
    });
    const NNC_LESSON14_ABSOLUTIVE_PLURAL_FRAME = Object.freeze({
      kind: "lesson-14-absolutive-plural-frame",
      sourceSection: "Andrews §14.5",
      predicateState: "absolutive",
      subjectNumber: "plural",
      subjectReference: "animate",
      allowedStemTypes: Object.freeze(["plain base", "affinity base", "distributive/varietal base"]),
      plainStemNum1Rules: Object.freeze({
        tiClass: "usually m, occasionally 0; lexical choice must be learned",
        tliInZeroClasses: "t or m; t favors consonant-final stems and m favors vowel-final stems, but lexical choice must be learned"
      }),
      affinityStemRules: Object.freeze({
        tiSource: "0 or infrequent m",
        tliOrInSource: "t",
        lexicallyObligatoryForSomeItems: true
      }),
      distributiveVarietalRule: "formation follows the source stem",
      lexicalAlternativesCanBeFickleOrSteadfast: true,
      generationAllowed: false
    });
    const NNC_LESSON14_POSSESSIVE_PLURAL_FRAME = Object.freeze({
      kind: "lesson-14-possessive-plural-frame",
      sourceSection: "Andrews §14.6",
      predicateState: "possessive",
      subjectNumber: "plural",
      normalStemType: "plain general-use stem",
      affinityStemAvailableForSpecialGroupCohesion: true,
      distributiveVarietalStemAvailableForDistributionOrVariety: true,
      subjectConnector: "hu-an",
      derivedStemUseIsSemantic: true,
      generationAllowed: false
    });
    const NNC_LESSON14_POSSESSIVE_SINGULAR_COMMON_FRAME = Object.freeze({
      kind: "lesson-14-possessive-singular-common-frame",
      sourceSection: "Andrews §14.7",
      predicateState: "possessive",
      subjectNumber: "singular/common",
      possibleGeneralUseShapes: Object.freeze(["base", "truncated"]),
      classRules: Object.freeze({
        inAndZero: Object.freeze({
          stemShape: "base",
          num1: "0"
        }),
        tli: Object.freeze({
          stemShape: "base",
          subclasses: Object.freeze([Object.freeze({
            id: "tli-1",
            num1: "0",
            frequency: "almost all tli stems"
          }), Object.freeze({
            id: "tli-2",
            num1: "hui",
            frequency: "very limited"
          }), Object.freeze({
            id: "tli-2-alternative",
            num1: "0 instead of hui",
            frequency: "very limited"
          })])
        }),
        ti: Object.freeze({
          subclasses: Object.freeze([Object.freeze({
            id: "ti-1-a",
            stemShape: "base",
            num1: "uh",
            lexicalChoiceMustBeLearned: true
          }), Object.freeze({
            id: "ti-1-b",
            stemShape: "base",
            num1: "0",
            lexicalChoiceMustBeLearned: true
          }), Object.freeze({
            id: "ti-2-a",
            stemShape: "truncated",
            num1: "0",
            deletes: "ephemeral short i after long vowel"
          }), Object.freeze({
            id: "ti-2-b",
            stemShape: "truncated",
            num1: "0",
            deletes: "ephemeral short a/i after one consonant"
          }), Object.freeze({
            id: "ti-2-c",
            stemShape: "truncated-plus-supportive-i",
            num1: "0",
            deletes: "ephemeral short a after two consonants"
          })])
        })
      }),
      num1BelongsTo: "subject personal pronoun",
      num1DoesNotBelongTo: Object.freeze(["predicate-state", "nounstem", "noun suffix"]),
      warning: "Do not call uh/hu possessive suffixes or tli/li/in absolutive suffixes; State is in front of the nounstem.",
      generationAllowed: false
    });
    const NNC_LESSON14_CONSTITUENT_ANALYSIS_FRAME = Object.freeze({
      kind: "lesson-14-constituent-analysis-frame",
      sourceSection: "Andrews §14.8",
      ambiguousBackConstituents: Object.freeze(["uh can be stem-final consonant or num1 filler", "ti can be stem-final consonant sequence or num1 filler", "tli can rarely be stem-final material or num1 filler"]),
      ambiguousFrontConstituents: Object.freeze(["o after n/t/am can belong to the stem or to st2", "m after long i can belong to the stem or to st2"]),
      spellingProblemRefs: Object.freeze(["amo ambiguity from Andrews §13.6", "long o missing in traditional spelling", "i-0 before long i or glottal-stop-initial stems", "supportive i dropped after i-0"]),
      diagnosticRule: "keep alternative analyses open unless vocabulary, filler morphs, sound changes, and Andrews source logic plus orthography-bridge support settle the parse",
      generationAllowed: false
    });
    const NNC_LESSON14_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson14-use-stem-kinds",
      andrewsSection: "14.1",
      category: "restricted-general-use-stems",
      directiveEs: "Distinguir tronco de uso restringido para CNN absolutiva y tronco de uso general para CNN posesiva y encaje compuesto.",
      engineSurface: "use-stem metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-nounstem-classes",
      andrewsSection: "14.2",
      category: "nounstem-class-system",
      directiveEs: "Las clases se nombran por num1 absolutivo singular/comun; en Nawat actual son t, ti, in y zero, con membresia lexica no predecible.",
      engineSurface: "class/stem compatibility metadata",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-number-and-derived-stems",
      andrewsSection: "14.3",
      category: "number-and-derived-nounstems",
      directiveEs: "El numero pertenece al sujeto; afinidad y distributivo/varietal son derivaciones internas del tronco, no plural nominal.",
      engineSurface: "derived-stem diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-absolutive-singular-common",
      andrewsSection: "14.4",
      category: "absolutive-singular-common-stem-selection",
      directiveEs: "La CNN absolutiva singular/comun usa la forma base del tronco de uso restringido.",
      engineSurface: "absolutive class compatibility",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-absolutive-plural",
      andrewsSection: "14.5",
      category: "absolutive-plural-stem-selection",
      directiveEs: "La CNN absolutiva plural puede usar tronco simple, de afinidad o distributivo/varietal, con num1 lexicamente aprendido.",
      engineSurface: "plural-subject diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-possessive-plural",
      andrewsSection: "14.6",
      category: "possessive-plural-stem-selection",
      directiveEs: "La CNN posesiva plural normalmente usa tronco simple, salvo necesidad semantica de afinidad o distribucion.",
      engineSurface: "possessive plural diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-possessive-singular-common",
      andrewsSection: "14.7",
      category: "possessive-singular-common-stem-selection",
      directiveEs: "La CNN posesiva singular/comun selecciona forma base o truncada segun clase y subclase; num1 sigue siendo del sujeto.",
      engineSurface: "possessive class/subclass diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson14-constituent-analysis-difficulties",
      andrewsSection: "14.8",
      category: "constituent-analysis-diagnostics",
      directiveEs: "Mantener analisis alternativos para uh, ti, tli, o y m cuando la ortografia o el vocabulario no decidan la frontera.",
      engineSurface: "ambiguity diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const NNC_LESSON14_REMAINING_GAPS = Object.freeze(["Current ordinary NNC class handling enforces Nawat t/ti/in/zero shape compatibility, but full Andrews lexical class membership and class alternatives are not data-complete.", "Restricted-use versus general-use stem selection is not yet a complete engine contract for possessive NNCs and compound embed positions.", "Affinity and distributive/varietal nounstem derivation, plural-subject alternatives, and class/subclass num1 choices remain diagnostic or source-gated.", "Constituent-analysis ambiguities around uh, ti, tli, o, m, and traditional spelling remain diagnostic metadata until vocabulary and Andrews source logic plus orthography-bridge support settle them."]);
    const NNC_LESSON15_VALIDATION_REFS = Object.freeze(["src/tests/nnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NNC_LESSON15_PDF_REFS = Object.freeze(["Andrews Lesson 15.1", "Andrews Lesson 15.2", "Andrews Lesson 15.3"]);
    const NNC_LESSON15_POSSESSIVE_PECULIARITIES_FRAME = Object.freeze({
      kind: "lesson-15-possessive-peculiarities-frame",
      sourceSection: "Andrews §15.1",
      possessivePluralAssimilation: Object.freeze({
        connector: "hu-an",
        affectedStemFinals: Object.freeze(["voiceless uh/w", "n"]),
        soundChangeRefs: Object.freeze(["Andrews §2.12.6", "Andrews §2.12.5"]),
        generationAllowedWithoutEvidence: false
      }),
      suppletivePossessiveStems: Object.freeze([Object.freeze({
        source: "(tlacoh)-tli",
        possessiveStem: "(tlaca)-tl",
        role: "slave/person replacement"
      }), Object.freeze({
        source: "(pil)-li",
        possessiveStem: "(pil-lo)-tl",
        role: "nobleman/nobility replacement"
      }), Object.freeze({
        source: "(teuc)-tli",
        possessiveStem: "(teuc-yo)-tl",
        role: "lord/lordship replacement"
      }), Object.freeze({
        source: "(tec)-0",
        possessiveStem: "Totec",
        role: "special title/name"
      })]),
      spuriousOrTraditionalWarning: "totecuiyo/notecuiyo is treated as a text-history warning, not a productive source stem.",
      derivedNonanimatePossessive: Object.freeze({
        stemTypes: Object.freeze(["distributive-varietal", "affinity"]),
        numberDyadReports: "common number",
        englishMayTranslatePlural: true
      }),
      possessorReduplicationCanMarkPlurality: true,
      secondaryGeneralUseStem: Object.freeze({
        possessor: "te",
        operation: "possessive-state predicate downgraded to general-use stem",
        teMayBlurTo: Object.freeze(["ti", "t"])
      }),
      analogicalTlaStem: Object.freeze({
        possessor: "tla",
        operation: "possessive-state predicate downgraded to restricted-use stem",
        currentNawatCandidate: "ta",
        generationAllowedWithoutEvidence: false
      }),
      tiSubclassReclassification: "Subclass 2-A ti stems can reclassify as Subclass 1-A by loss of ephemeral i, with possible meaning or style shift.",
      nuclearPossessorRule: "The pronominal possessor inside the NNC is the nuclear/basic possessor; supplementary possessors are later sentence structure.",
      generationAllowed: false
    });
    const NNC_LESSON15_NATURALLY_POSSESSED_FRAME = Object.freeze({
      kind: "lesson-15-naturally-possessed-frame",
      sourceSection: "Andrews §15.2",
      description: "Some nounstems usually or always occur in possessive-state NNCs because their referent is naturally associated with another entity.",
      dictionaryAbsolutiveSuffixCanOnlyIdentifyClass: true,
      naturalPossessionTypes: Object.freeze([Object.freeze({
        id: "property",
        examples: Object.freeze(["home/homeland", "property/possession"])
      }), Object.freeze({
        id: "kinship-human-relations",
        examples: Object.freeze(["child", "mother", "enemy", "companion"])
      }), Object.freeze({
        id: "body-parts",
        examples: Object.freeze(["nose", "hand"])
      })]),
      unavailablePossessiveContrast: Object.freeze({
        examples: Object.freeze(["cloud", "rain"]),
        metaphorCanOverrideRestriction: true
      }),
      organicIntegralPossessionRef: "Andrews §39.3.4",
      currentEngineBoundary: "current ordinary possessive fixtures and organic -yu opt-in do not prove complete Lesson 15 natural-possession classes",
      generationAllowed: false
    });
    const NNC_LESSON15_SENTENCE_STRUCTURE_FRAME = Object.freeze({
      kind: "lesson-15-nnc-sentence-structure-frame",
      sourceSection: "Andrews §15.3",
      nncCanConstituteSentence: true,
      sentenceParticipation: Object.freeze(["simple", "complex", "compound"]),
      equationalPredicateFunctions: Object.freeze(["equative", "attributive", "adverbial"]),
      equativeSentenceTypes: Object.freeze(["simple affirmative", "negative", "emphatic", "yes/no question", "wish"]),
      adverbialModifiersAllowed: true,
      possessiveStateMayTranslateAsHaving: true,
      predicateDefinitenessAmbiguous: true,
      currentEngineBoundary: "sentence-layer NNC composition remains diagnostic; word-level NNC output does not license sentence generation",
      generationAllowed: false
    });
    const NNC_LESSON15_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson15-possessive-peculiarities",
      andrewsSection: "15.1",
      category: "possessive-state-peculiarities",
      directiveEs: "Registrar asimilacion con hu-an, suplencias posesivas, troncos secundarios, analogias con tla, reduplicacion de poseedor y poseedor nuclear sin generar paradigmas no confirmados.",
      engineSurface: "possessive peculiarity diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson15-naturally-possessed-nounstems",
      andrewsSection: "15.2",
      category: "natural-possession-state-cases",
      directiveEs: "Distinguir posesion natural, obligatoria o restringida de posesion ordinaria; los sufijos absolutivos de diccionario solo identifican clase.",
      engineSurface: "natural-possession evidence boundary",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson15-nnc-sentence-structure",
      andrewsSection: "15.3",
      category: "nnc-sentence-structure",
      directiveEs: "Una CNN puede ser oracion simple o entrar en oraciones complejas/compuestas, pero la salida nominal no debe convertirse silenciosamente en generador de oraciones.",
      engineSurface: "sentence-layer diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const NNC_LESSON15_REMAINING_GAPS = Object.freeze(["Possessive plural assimilation, suppletive possessive stems, te/tla secondary stems, possessor reduplication, and ti-subclass reclassification remain diagnostic until Andrews source models plus the orthography bridge can license concrete forms.", "Natural-possession state cases require lexical metadata for required, optional, unavailable, possessive-only, absolutive-unavailable, and irregular nouns.", "Current fixture-backed possessive forms and organic -yu generation do not prove complete Lesson 15 natural-possession coverage.", "NNC sentence-structure behavior remains sentence-layer metadata; sentence generation and particle placement are not licensed by ordinary NNC output alone."]);
    const NNC_LESSON16_VALIDATION_REFS = Object.freeze(["src/tests/nnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NNC_LESSON16_PDF_REFS = Object.freeze(["Andrews Lesson 16.1", "Andrews Lesson 16.2", "Andrews Lesson 16.3", "Andrews Lesson 16.4", "Andrews Lesson 16.5", "Andrews Lesson 16.6", "Andrews Lesson 16.7", "Andrews Lesson 16.8", "Andrews Lesson 16.9"]);
    const NNC_LESSON16_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-16-pronominal-nnc-overview-frame",
      sourceSection: "Andrews §16.1",
      nncKind: "pronominal",
      builtOnStemMeanings: Object.freeze(["entitive", "quantitive"]),
      stateRestriction: "absolutive-only",
      translatedAsPronounWords: true,
      structuralWarning: "Nahuatl pronominal NNCs are structured as NNCs, not as English pronoun words.",
      semanticKinds: Object.freeze(["entitive", "quantitive"]),
      pluralStructuralTypes: Object.freeze(["plain-stem plural", "pluralized-stem plural"]),
      pluralizedStemRule: "plural-number morph n is derivational suffix inside the stem",
      pluralizedStemSubjectNumberDyads: Object.freeze(["t-in", "0-0"]),
      currentEngineBoundary: "ordinary NNC formula slots are not reused as generated pronominal NNC paradigms without a separate Andrews source model",
      generationAllowed: false
    });
    const NNC_LESSON16_ENTITIVE_FRAME = Object.freeze({
      kind: "lesson-16-entitive-pronominal-frame",
      sourceSection: "Andrews §16.2",
      subtypes: Object.freeze(["personal", "interrogative", "indefinite", "demonstrative"]),
      hasRelativePronouns: false,
      generationAllowed: false
    });
    const NNC_LESSON16_PERSONAL_FRAME = Object.freeze({
      kind: "lesson-16-personal-pronominal-nnc-frame",
      sourceSection: "Andrews §16.3",
      realPersonalPronounsAreAffixal: true,
      stems: Object.freeze([Object.freeze({
        id: "simple-eh",
        stems: Object.freeze(["eh-0", "yeh-0"]),
        thirdPersonVariant: "yeh",
        meaning: "entity/existent one",
        pluralSubjectUse: "extremely rare",
        shortFormsUsuallySupplements: true
      }), Object.freeze({
        id: "compound-eh-hua",
        stems: Object.freeze(["eh-hua-tl", "yeh-hua-tl"]),
        thirdPersonVariant: "yeh-hua",
        pluralStemRule: "add derivational n inside predicate stem when subject is plural",
        num1Variants: Object.freeze(["sounded", "silent"]),
        distributiveVarietalCommonSubjectPossible: true
      })]),
      adverbialModificationPossible: true,
      idiomaticQuenMachHuelConstruction: true,
      doubledFirstPluralPers1Formation: true,
      supplementRefs: Object.freeze(["Andrews Lessons 17-18"]),
      generationAllowed: false
    });
    const NNC_LESSON16_INTERROGATIVE_FRAME = Object.freeze({
      kind: "lesson-16-interrogative-pronominal-nnc-frame",
      sourceSection: "Andrews §16.4",
      questionScope: "identity of the affixal subject",
      stems: Object.freeze([Object.freeze({
        id: "what-entity",
        stem: "tl-eh-0",
        gloss: "what entity / what",
        usualSubject: "third-person singular",
        anyPersonPossible: true
      }), Object.freeze({
        id: "what-entity-compound",
        stem: "tl-eh-hua-tl",
        gloss: "what entity / what"
      }), Object.freeze({
        id: "which-entity",
        stem: "ca-tl",
        gloss: "which entity / which one"
      }), Object.freeze({
        id: "who",
        stem: "a-0-c",
        gloss: "what person / who",
        fixedSubject: "third-person singular",
        singularOrPluralMeaning: true
      })]),
      tlehInFusion: Object.freeze({
        source: "tleh + in",
        fusedForms: Object.freeze(["tlein", "tlei", "tlen"]),
        writeSeparateWhenDependentClauseFollows: true
      }),
      acInFusion: Object.freeze({
        source: "ac + in",
        fusedForms: Object.freeze(["aquin", "aqui"]),
        writeSeparateWhenDependentClauseFollows: true
      }),
      interrogativeQualityLostWhen: Object.freeze(["negative", "not sentence-initial"]),
      relativePronounWarning: "do not model these as English-style relative pronouns",
      generationAllowed: false
    });
    const NNC_LESSON16_DEMONSTRATIVE_FRAME = Object.freeze({
      kind: "lesson-16-demonstrative-pronominal-nnc-frame",
      sourceSection: "Andrews §16.5",
      stems: Object.freeze([Object.freeze({
        id: "proximal",
        stem: "in",
        gloss: "this one / these"
      }), Object.freeze({
        id: "distal",
        stem: "on",
        gloss: "that one / those"
      })]),
      canFunctionAdjectivally: true,
      adjectivalFunctionRef: "Andrews §40.1",
      invariantButPreferNncAnalysis: true,
      subjectLimit: "third-person",
      pluralNumberDyad: "0-0",
      pluralizesStem: false,
      stemFinalNMayBeUnwritten: true,
      adjunctorSolidSpellingWarning: "in in / in on are traditionally written inin / inon",
      generationAllowed: false
    });
    const NNC_LESSON16_INDEFINITE_FRAME = Object.freeze({
      kind: "lesson-16-indefinite-pronominal-nnc-frame",
      sourceSection: "Andrews §16.6",
      matrixStem: "ah-0",
      matrixMeaning: "undetermined, unspecified, or unknown entity",
      stems: Object.freeze([Object.freeze({
        id: "someone",
        stem: "a-c-ah-0",
        source: "ac",
        humanMeaning: true
      }), Object.freeze({
        id: "something",
        stem: "itl-ah-0",
        source: "related to tla / tl-eh",
        humanSubjectOnlySpecialSituations: true
      })]),
      embedVowelLengthLost: true,
      lessGeneralThanPrefixes: Object.freeze(["te", "tla"]),
      generationAllowed: false
    });
    const NNC_LESSON16_QUANTITIVE_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-16-quantitive-pronominal-overview-frame",
      sourceSection: "Andrews §16.7",
      canFunctionAdjectivally: true,
      adjectivalFunctionRef: "Andrews §40.1",
      stateRestriction: "absolutive-only",
      matrixStems: Object.freeze(["chi/ch", "qui/c", "qui-ch"]),
      matrixMeaning: "amount, quantity, number",
      embedMeanings: Object.freeze(["equal", "total", "abundant", "full", "small"]),
      chiQuiMorphVariants: Object.freeze(["long vowel", "glottal stop", "short vowel", "zero vowel"]),
      morphDeploymentPredictable: false,
      generationAllowed: false
    });
    const NNC_LESSON16_QUICH_FRAME = Object.freeze({
      kind: "lesson-16-quantitive-quich-frame",
      sourceSection: "Andrews §16.8",
      matrix: "qui-ch-0",
      stems: Object.freeze([Object.freeze({
        id: "all",
        stem: "ix-qui-ch-0",
        meaning: "total amount / all"
      }), Object.freeze({
        id: "how-much-general",
        stem: "que-x-qui-ch-0",
        meaning: "how much / how many in general"
      }), Object.freeze({
        id: "how-many-varietal",
        stem: "que-x-ix-qui-ch-0",
        meaning: "how many in different places or kinds"
      })]),
      adverbialModificationFrequent: true,
      interrogativeQualityLostWhenNotInitial: true,
      generationAllowed: false
    });
    const NNC_LESSON16_QUI_CHI_FRAME = Object.freeze({
      kind: "lesson-16-quantitive-qui-chi-frame",
      sourceSection: "Andrews §16.9",
      matrices: Object.freeze(["qui/c", "chi/ch"]),
      pluralizedStemRule: "normally includes derivational n when subject is plural",
      pluralSubjectNumberDyads: Object.freeze(["t-in", "0-0"]),
      stems: Object.freeze([Object.freeze({
        id: "abundant",
        stem: "miya/miye-qui/c",
        meaning: "much / many"
      }), Object.freeze({
        id: "some",
        stem: "ce-qui/c",
        meaning: "one, some, part"
      }), Object.freeze({
        id: "equal",
        stem: "iz-qui",
        meaning: "as much / as many"
      }), Object.freeze({
        id: "how-many-specific",
        stem: "que-z-qui",
        meaning: "how many specifically"
      }), Object.freeze({
        id: "few",
        stem: "a-qui",
        meaning: "a few"
      }), Object.freeze({
        id: "little",
        stem: "a-chi",
        meaning: "a little"
      }), Object.freeze({
        id: "all-full",
        stem: "mo-chi/ch",
        meaning: "all"
      }), Object.freeze({
        id: "great-many",
        stem: "ix-a-chi",
        meaning: "very large amount / many"
      })]),
      variantPluralFormationsExist: true,
      interrogativeQualityLostWhenNotInitial: true,
      generationAllowed: false
    });
    const NNC_LESSON16_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson16-pronominal-nnc-overview",
      andrewsSection: "16.1",
      category: "pronominal-nnc-overview",
      directiveEs: "Las CNN pronominales son CNN absolutivas especiales sobre troncos entitativos o cuantitativos, no pronombres-palabra importables.",
      engineSurface: "pronominal NNC boundary metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-entitive-subtypes",
      andrewsSection: "16.2",
      category: "entitive-pronominal-subtypes",
      directiveEs: "Las entitativas se dividen en personales, interrogativas, indefinidas y demostrativas; no hay pronombres relativos.",
      engineSurface: "entitive subtype metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-personal-pronominal",
      andrewsSection: "16.3",
      category: "personal-pronominal-nnc",
      directiveEs: "Los pronombres personales reales son afijales; eh/yeh y eh-hua/yeh-hua son predicados CNN de entidad y suelen servir como suplementos.",
      engineSurface: "personal-pronominal diagnostic metadata",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-interrogative-pronominal",
      andrewsSection: "16.4",
      category: "interrogative-pronominal-nnc",
      directiveEs: "Las interrogativas identificacionales preguntan por el sujeto afijal; pierden interrogatividad en negativo o fuera de posicion inicial.",
      engineSurface: "interrogative pronominal diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-demonstrative-pronominal",
      andrewsSection: "16.5",
      category: "demonstrative-pronominal-nnc",
      directiveEs: "in y on son CNN demostrativas de tercera persona, aunque sean invariantes y puedan parecer particulas.",
      engineSurface: "demonstrative pronominal diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-indefinite-pronominal",
      andrewsSection: "16.6",
      category: "indefinite-pronominal-nnc",
      directiveEs: "acah e itlah son compuestos indefinidos menos generales que los prefijos te y tla.",
      engineSurface: "indefinite pronominal diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-quantitive-overview",
      andrewsSection: "16.7",
      category: "quantitive-pronominal-overview",
      directiveEs: "Las cuantitativas son CNN absolutivas de cantidad/numero con matrices chi, qui y qui-ch, no cuantificadores sueltos.",
      engineSurface: "quantitive pronominal diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-quantitive-quich",
      andrewsSection: "16.8",
      category: "quantitive-quich-pronominal",
      directiveEs: "ixquich y quexquich pertenecen a la matriz qui-ch y mantienen reglas de posicion interrogativa.",
      engineSurface: "qui-ch quantitive diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson16-quantitive-qui-chi",
      andrewsSection: "16.9",
      category: "quantitive-qui-chi-pronominal",
      directiveEs: "Las matrices qui/c y chi/ch pluralizan por n derivacional en el tronco cuando corresponde; no se generan paradigmas sin evidencia.",
      engineSurface: "qui/chi quantitive diagnostics",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const NNC_LESSON16_REMAINING_GAPS = Object.freeze(["A complete Andrews pronominal-NNC route contract and orthography-bridge mapping are still needed before personal, interrogative, demonstrative, indefinite, or quantitive paradigms can generate.", "The current ordinary NNC formula slot model is not yet extended to a safe pronominal NNC route.", "Fused spellings such as tlein/aquin and demonstrative inin/inon remain diagnostic text-analysis metadata, not generated Nawat fixtures.", "Quantitive matrix allomorphy, derivational plural n, adjectival-function use, and supplementation behavior remain diagnostic or deferred to later lessons."]);
    function buildVerbDerivedNominalDiagnostic({
      id = "verb-derived-nominal-blocked",
      message = "La generacion no produjo una forma.",
      failedLayer = "route",
      contractLayer = "routeContract",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "verb-derived-nominal-blocked").trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || "La generacion no produjo una forma.").trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: "verb-derived-nominal",
        routeStage: String(routeStage || "").trim()
      };
    }
    function getVerbDerivedNominalAndrewsRefs(kind = "", result = null) {
      const refs = [];
      const output = result && typeof result === "object" ? result : {};
      [output.instrumentivoSourceSubjectPossessor?.grammarSource, output.actionNounSourceSubjectPossessor?.grammarSource, output.nominalizationProfile?.curriculumRef?.source === "Andrews" ? `Andrews ${output.nominalizationProfile.curriculumRef.range || "Lesson 36"}` : ""].forEach(entry => {
        const value = String(entry || "").trim();
        if (value) {
          refs.push(value);
        }
      });
      switch (kind) {
        case "instrumentivo":
          refs.push("Andrews 36.6");
          break;
        case "calificativo-instrumentivo":
          refs.push("Andrews 36.10-36.11");
          break;
        case "locativo-temporal":
          refs.push("Andrews 46.4");
          break;
        default:
          break;
      }
      if (targetObject.isPredicateNominalTense(kind)) {
        refs.push("Andrews 36.6 note 2");
      }
      return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function normalizeVerbDerivedNominalSurfaceValue(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitVerbDerivedNominalSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeVerbDerivedNominalSurfaceValue(entry)).filter(Boolean);
    }
    function getVerbDerivedNominalResultFrame(result = null) {
      const output = result && typeof result === "object" ? result : {};
      if (output.grammarFrame && typeof output.grammarFrame === "object") {
        return output.grammarFrame;
      }
      if (output.frames && typeof output.frames === "object") {
        return output.frames;
      }
      return null;
    }
    function getVerbDerivedNominalResultFramePayload(result = null) {
      const grammarFrame = getVerbDerivedNominalResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getVerbDerivedNominalSurfaceForms(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getVerbDerivedNominalResultFramePayload(output);
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitVerbDerivedNominalSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output.surfaceForms)) {
        forms.push(...output.surfaceForms);
      }
      if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output.result) {
        forms.push(output.result);
      }
      return forms.flatMap(entry => splitVerbDerivedNominalSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getVerbDerivedNominalSurface(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getVerbDerivedNominalResultFramePayload(output);
      const hasResultFrame = Boolean(frameResult);
      return normalizeVerbDerivedNominalSurfaceValue(getVerbDerivedNominalSurfaceForms(output)[0] || frameResult?.surface || (!hasResultFrame ? output.surface || output.result : "") || "");
    }
    function hasVerbDerivedNominalSurface(result = null) {
      return Boolean(getVerbDerivedNominalSurface(result) || getVerbDerivedNominalSurfaceForms(result).length);
    }
    function normalizeVerbDerivedNominalDiagnostics(result = null, fallbackDiagnostic = null) {
      const output = result && typeof result === "object" ? result : {};
      const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
      const normalized = typeof targetObject.normalizeGrammarDiagnosticContractEntries === "function" ? targetObject.normalizeGrammarDiagnosticContractEntries(diagnostics) : diagnostics.filter(entry => entry && typeof entry === "object");
      if (!normalized.length && fallbackDiagnostic) {
        normalized.push(fallbackDiagnostic);
      }
      return normalized;
    }
    function applyVerbDerivedNominalDiagnosticLayerMetadata(diagnostics = [], routeStage = "") {
      return (Array.isArray(diagnostics) ? diagnostics : []).map(entry => {
        if (!entry || typeof entry !== "object") {
          return entry;
        }
        return {
          ...entry,
          failedLayer: entry.failedLayer || "route",
          contractLayer: entry.contractLayer || "routeContract",
          routeFamily: entry.routeFamily || "verb-derived-nominal",
          routeStage: entry.routeStage || String(routeStage || "").trim()
        };
      });
    }
    function attachVerbDerivedNominalGrammarContract(result = null, {
      kind = "",
      rawVerb = "",
      routeStage = "execute",
      diagnosticId = "verb-derived-nominal-blocked",
      message = "La generacion no produjo una forma.",
      enumerable = false
    } = {}) {
      const output = result && typeof result === "object" ? result : {};
      const nominalKind = String(kind || output.nounDerivationKind || "").trim();
      const fallbackDiagnostic = buildVerbDerivedNominalDiagnostic({
        id: diagnosticId,
        message,
        failedLayer: "route",
        contractLayer: "routeContract",
        routeStage
      });
      const diagnostics = applyVerbDerivedNominalDiagnosticLayerMetadata(normalizeVerbDerivedNominalDiagnostics(output, output.error ? fallbackDiagnostic : null), routeStage);
      if (!Object.prototype.hasOwnProperty.call(output, "diagnostics")) {
        Object.defineProperty(output, "diagnostics", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: diagnostics
        });
      }
      const surface = getVerbDerivedNominalSurface(output);
      const surfaceForms = getVerbDerivedNominalSurfaceForms(output);
      const ok = Boolean(surface) && output.error !== true && output.supported !== false;
      const grammarFrame = typeof targetObject.buildGrammarFrame === "function" ? targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "verb-derived-nominal",
            nominalKind,
            sourceModel: output.sourceModel || null
          },
          evidenceStatus: ok ? "generated" : "blocked",
          andrewsRefs: getVerbDerivedNominalAndrewsRefs(nominalKind, output),
          supported: ok
        }) : null,
        unitFrame: {
          unitKind: "nominal-nuclear-clause",
          outputKind: "verb-derived-nominal",
          generationRoute: nominalKind
        },
        orthographyFrame: {
          surface,
          surfaceForms,
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          num1Num2: output.num1Num2 || null,
          num1Num2Alternates: Array.isArray(output.num1Num2Alternates) ? output.num1Num2Alternates : []
        },
        stemFrame: {
          stem: String(output.entries?.[0]?.verb || ""),
          sourceStem: String(output.sourceModel?.sourceStem || output.sourceModel?.matrixBase || ""),
          entries: Array.isArray(output.entries) ? output.entries : []
        },
        nuclearClauseFrame: output.nominalClauseFrame || null,
        participantFrame: {
          possessor: {
            prefix: String(output.instrumentivoSourceSubjectPossessor?.possessivePrefix || output.actionNounSourceSubjectPossessor?.possessivePrefix || output.possessorPrefix || "")
          }
        },
        inflectionFrame: {
          tenseMode: "sustantivo",
          tense: nominalKind,
          state: output.nominalClauseFrame?.stateSlot?.state || ""
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily: "verb-derived-nominal",
          routeStage: ok ? routeStage : "blocked",
          sourceContract: {
            rawVerb: String(rawVerb || ""),
            nominalKind,
            sourceModel: output.sourceModel || null
          },
          targetContract: {
            outputKind: "verb-derived-nominal",
            generationRoute: nominalKind
          },
          generationAllowed: ok,
          blockingDiagnostics: ok ? [] : diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms,
          outputKind: "verb-derived-nominal",
          generationRoute: nominalKind,
          sourceInput: String(rawVerb || "")
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: ok ? "generated" : "blocked",
          diagnostics,
          blockers: ok ? [] : diagnostics
        }) : null
      }) : null;
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result: output,
        grammarFrame
      }) : {
        ok,
        surface,
        frames: grammarFrame,
        diagnostics
      };
      Object.defineProperties(output, {
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.frames
        }
      });
      return output;
    }
    function buildVerbDerivedNominalBlockedResult(options = {}) {
      return attachVerbDerivedNominalGrammarContract({
        error: true
      }, {
        ...options,
        routeStage: "blocked"
      });
    }
    function normalizeOrdinaryNncText(value = "") {
      return String(value || "").trim().toLowerCase();
    }
    function normalizeOrdinaryNncNumber(value = "") {
      const normalized = normalizeOrdinaryNncText(value || "singular");
      if (normalized === "sg") {
        return "singular";
      }
      if (normalized === "pl") {
        return "plural";
      }
      return normalized || "singular";
    }
    function normalizeOrdinaryNncPluralType(value = "") {
      const normalized = normalizeOrdinaryNncText(value || ORDINARY_NNC_PLURAL_TYPE.auto);
      if (normalized === "met" || normalized === "count" || normalized === "ordinary") {
        return ORDINARY_NNC_PLURAL_TYPE.count;
      }
      if (normalized === "reduplicative" || normalized === "reduplicated" || normalized === "distributive" || normalized === "distr") {
        return ORDINARY_NNC_PLURAL_TYPE.distributive;
      }
      return ORDINARY_NNC_PLURAL_TYPE.auto;
    }
    function normalizeOrdinaryNncPossessionKind(value = "") {
      const normalized = normalizeOrdinaryNncText(value);
      if (!normalized || normalized === "ordinary" || normalized === "optional") {
        return ORDINARY_NNC_POSSESSION_KIND.ordinary;
      }
      if (normalized === "organic" || normalized === "integral" || normalized === "inalienable" || normalized === "natural" || normalized === "organic-possession" || normalized === "natural-possession") {
        return ORDINARY_NNC_POSSESSION_KIND.organic;
      }
      return normalized;
    }
    function isOrdinaryNncOrganicPossessionKind(value = "") {
      return normalizeOrdinaryNncPossessionKind(value) === ORDINARY_NNC_POSSESSION_KIND.organic;
    }
    function normalizeOrdinaryNncAnimacy(value = "", fallback = "inanimate") {
      const normalized = normalizeOrdinaryNncText(value);
      if (normalized === "animate" || normalized === "animado") {
        return "animate";
      }
      if (normalized === "inanimate" || normalized === "nonanimate" || normalized === "no-animado" || normalized === "noanimado") {
        return "inanimate";
      }
      return fallback;
    }
    function getEffectiveOrdinaryNncPluralType(pluralType = ORDINARY_NNC_PLURAL_TYPE.auto, animacy = "") {
      const normalized = normalizeOrdinaryNncPluralType(pluralType);
      if (normalized !== ORDINARY_NNC_PLURAL_TYPE.auto) {
        return normalized;
      }
      return animacy === "animate" ? ORDINARY_NNC_PLURAL_TYPE.count : ORDINARY_NNC_PLURAL_TYPE.distributive;
    }
    function normalizeOrdinaryNncAgreementNumber(value = "") {
      const normalized = normalizeOrdinaryNncText(value);
      return normalized === "sg" ? "singular" : normalized === "pl" ? "plural" : normalized;
    }
    function normalizeOrdinaryNncState(value = "", possessor = null) {
      const normalized = normalizeOrdinaryNncText(value);
      if (!normalized) {
        return possessor?.prefix ? ORDINARY_NNC_STATE.possessive : ORDINARY_NNC_STATE.absolutive;
      }
      if (normalized === "absolutive" || normalized === "absolutivo") {
        return ORDINARY_NNC_STATE.absolutive;
      }
      if (normalized === "possessive" || normalized === "possessed" || normalized === "posesivo") {
        return ORDINARY_NNC_STATE.possessive;
      }
      return normalized;
    }
    function getOrdinaryNncFixtureEntries() {
      return typeof targetObject.ORDINARY_NNC_FIXTURES !== "undefined" && Array.isArray(targetObject.ORDINARY_NNC_FIXTURES) ? targetObject.ORDINARY_NNC_FIXTURES : [];
    }
    function getOrdinaryNncPossessiveEntries() {
      return typeof targetObject.POSSESSIVE_PREFIXES !== "undefined" && Array.isArray(targetObject.POSSESSIVE_PREFIXES) ? targetObject.POSSESSIVE_PREFIXES : [];
    }
    function getOrdinaryNncSubjectEntries() {
      return typeof targetObject.SUBJECT_COMBINATIONS !== "undefined" && Array.isArray(targetObject.SUBJECT_COMBINATIONS) ? targetObject.SUBJECT_COMBINATIONS : [];
    }
    function buildOrdinaryNncDiagnostic(id = "", message = "", severity = "unsupported") {
      return {
        id,
        severity,
        message
      };
    }
    function attachNncLessonGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nominal-nuclear-clause-metadata",
        routeFamily: "ordinary-nnc",
        structuralSource: "Andrews Lesson 12",
        andrewsRefs: ["Andrews Lesson 12.1-12.7"],
        ...options
      });
    }
    function getOrdinaryNncFormulaSchema() {
      return typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema("ordinary-nnc-shell") : null;
    }
    function getOrdinaryNncFormulaSlotDefinition(slotId = "") {
      return typeof targetObject.getAndrewsFormulaSlotDefinition === "function" ? targetObject.getAndrewsFormulaSlotDefinition("ordinary-nnc-shell", slotId) : null;
    }
    function renderOrdinaryNncFormulaTemplate() {
      return typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("ordinary-nnc-shell") : "#pers1-pers2(STEM)num1-num2#";
    }
    function cloneNncLessonRecord(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneNncLessonRecord(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneNncLessonRecord(entry)]));
    }
    function getNncLesson12FormulaContrastFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_FORMULA_CONTRAST_FRAME);
    }
    function getNncLesson12AbsolutiveFormulaFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_ABSOLUTIVE_FORMULA_FRAME);
    }
    function getNncLesson12SubjectPositionFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_SUBJECT_POSITION_FRAME);
    }
    function getNncLesson12SubjectPronounInventoryFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_SUBJECT_PRONOUN_INVENTORY_FRAME);
    }
    function getNncLesson12PredicateFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_PREDICATE_FRAME);
    }
    function getNncLesson12AnimacyFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_ANIMACY_FRAME);
    }
    function getNncLesson12StateNounstemFrame() {
      return cloneNncLessonRecord(NNC_LESSON12_STATE_NOUNSTEM_FRAME);
    }
    function getNncLesson12SubsectionInventory() {
      return NNC_LESSON12_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON12_VALIDATION_REFS),
        generationPolicy: "diagnostico; no importa conectores clasicos ni genera paradigmas completos sin fuente Andrews concreta y puente ortografico"
      }));
    }
    function getNncLesson12RemainingGaps() {
      return Array.from(NNC_LESSON12_REMAINING_GAPS);
    }
    function buildNncLesson12PursuitFrame() {
      const inventory = getNncLesson12SubsectionInventory();
      const absolutiveFormulaFrame = getNncLesson12AbsolutiveFormulaFrame();
      const subjectPositionFrame = getNncLesson12SubjectPositionFrame();
      const predicateFrame = getNncLesson12PredicateFrame();
      const animacyFrame = getNncLesson12AnimacyFrame();
      const frame = {
        kind: "lesson-12-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 12,
        aimStatus: "shooting",
        pdfRefs: Array.from(NNC_LESSON12_PDF_REFS),
        plannedArrows: [{
          id: "lesson-12-absolutive-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 12.1-12.7 against NNC/VNC contrast, absolutive-state NNC formula slots, subject-pronoun positions, predicate behavior, animacy, and state/nounstem boundaries.",
          andrewsRefs: Array.from(NNC_LESSON12_PDF_REFS),
          expectedFeedbackRefs: Array.from(NNC_LESSON12_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-12-absolutive-nnc-audit",
          result: "hit",
          correction: "Lesson 12 now carries subsection PDF refs, Spanish directives, absolutive NNC formula metadata, subject num1-num2 ownership, no-tense predicate boundaries, animacy diagnostics, and generation blockers for unlicensed Classical connector paradigms.",
          andrewsRefs: Array.from(NNC_LESSON12_PDF_REFS),
          feedbackRefs: Array.from(NNC_LESSON12_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        formulaContrastFrame: getNncLesson12FormulaContrastFrame(),
        absolutiveFormulaFrame,
        subjectPositionFrame,
        subjectPronounInventoryFrame: getNncLesson12SubjectPronounInventoryFrame(),
        predicateFrame,
        animacyFrame,
        stateNounstemFrame: getNncLesson12StateNounstemFrame(),
        currentEngineBoundary: {
          ordinaryNncFormulaSlotsExist: true,
          ordinaryNncGenerationIsEvidenceBound: true,
          completeAndrewsSubjectParadigmGenerated: false,
          noTenseSlot: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson12RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachNncLessonGrammarContract(frame, {
        metadataKind: "lesson-12-pursuit-frame",
        routeStage: "audit-lesson-12",
        sourceInput: "Andrews Lesson 12.1-12.7",
        supported: false,
        diagnostics: ["lesson-12-absolutive-nnc-partial"],
        morphBoundaryFrame: subjectPositionFrame.num1Num2Rule,
        stemFrame: predicateFrame,
        nuclearClauseFrame: {
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          formulaSchemaId: "ordinary-nnc-shell",
          formula: renderOrdinaryNncFormulaTemplate(),
          formulaSlots: getOrdinaryNncFormulaSchema()?.slots || [],
          statePosition: "vacant",
          hasTensePosition: false
        },
        participantFrame: {
          subject: subjectPositionFrame,
          animacy: animacyFrame
        },
        inflectionFrame: {
          hasTensePosition: false,
          predicateState: "absolutive"
        },
        targetContract: {
          metadataKind: "lesson-12-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getNncLesson13PossessiveFormulaFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_POSSESSIVE_FORMULA_FRAME);
    }
    function getNncLesson13SubjectPositionFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_SUBJECT_POSITION_FRAME);
    }
    function getNncLesson13SubjectPronounInventoryFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_SUBJECT_PRONOUN_INVENTORY_FRAME);
    }
    function getNncLesson13MonadicStateFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_MONADIC_STATE_FRAME);
    }
    function getNncLesson13DyadicStateFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_DYADIC_STATE_FRAME);
    }
    function getNncLesson13SpecificPossessorFrame() {
      return cloneNncLessonRecord(NNC_LESSON13_SPECIFIC_POSSESSOR_FRAME);
    }
    function getNncLesson13SubsectionInventory() {
      return NNC_LESSON13_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON13_VALIDATION_REFS),
        generationPolicy: "diagnostico; no importa poseedores clasicos ni genera paradigmas posesivos completos sin fuente Andrews concreta y puente ortografico"
      }));
    }
    function getNncLesson13RemainingGaps() {
      return Array.from(NNC_LESSON13_REMAINING_GAPS);
    }
    function buildNncLesson13PursuitFrame() {
      const inventory = getNncLesson13SubsectionInventory();
      const possessiveFormulaFrame = getNncLesson13PossessiveFormulaFrame();
      const subjectPositionFrame = getNncLesson13SubjectPositionFrame();
      const monadicStateFrame = getNncLesson13MonadicStateFrame();
      const dyadicStateFrame = getNncLesson13DyadicStateFrame();
      const specificPossessorFrame = getNncLesson13SpecificPossessorFrame();
      const frame = {
        kind: "lesson-13-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 13,
        aimStatus: "shooting",
        pdfRefs: Array.from(NNC_LESSON13_PDF_REFS),
        plannedArrows: [{
          id: "lesson-13-possessive-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 13.1-13.6 against possessive-state NNC formulas, subject connector behavior, monadic and dyadic State slots, and possessor-pronoun inventories.",
          andrewsRefs: Array.from(NNC_LESSON13_PDF_REFS),
          expectedFeedbackRefs: Array.from(NNC_LESSON13_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-13-possessive-nnc-audit",
          result: "hit",
          correction: "Lesson 13 now carries subsection PDF refs, Spanish directives, possessive-state formula metadata, subject num1-num2 ownership, monadic and dyadic State taxonomy, specific possessor frames, and Andrews-governed Classical-to-Nawat orthography boundaries.",
          andrewsRefs: Array.from(NNC_LESSON13_PDF_REFS),
          feedbackRefs: Array.from(NNC_LESSON13_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        possessiveFormulaFrame,
        subjectPositionFrame,
        subjectPronounInventoryFrame: getNncLesson13SubjectPronounInventoryFrame(),
        monadicStateFrame,
        dyadicStateFrame,
        specificPossessorFrame,
        currentEngineBoundary: {
          ordinaryNncPossessiveStateExists: true,
          currentSpecificPossessorPrefixesUseOrthographyBridge: true,
          monadicPossessiveStateGenerated: true,
          completeAndrewsPossessiveParadigmGenerated: false,
          noTenseSlot: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson13RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachNncLessonGrammarContract(frame, {
        metadataKind: "lesson-13-pursuit-frame",
        routeStage: "audit-lesson-13",
        sourceInput: "Andrews Lesson 13.1-13.6",
        structuralSource: "Andrews Lesson 13",
        andrewsRefs: ["Andrews Lesson 13.1-13.6"],
        supported: false,
        diagnostics: ["lesson-13-possessive-nnc-partial"],
        morphBoundaryFrame: subjectPositionFrame.num1Num2Rule,
        stemFrame: {
          stemProblemDeferredToLesson14: true,
          stateFrames: {
            monadic: monadicStateFrame,
            dyadic: dyadicStateFrame
          }
        },
        nuclearClauseFrame: {
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          formulas: possessiveFormulaFrame.formulas,
          statePosition: "present-in-predicate",
          hasTensePosition: false
        },
        participantFrame: {
          subject: subjectPositionFrame,
          possessor: specificPossessorFrame
        },
        inflectionFrame: {
          hasTensePosition: false,
          predicateState: "possessive"
        },
        targetContract: {
          metadataKind: "lesson-13-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getNncLesson14UseStemFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_USE_STEM_FRAME);
    }
    function getNncLesson14NounstemClassFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_NOUNSTEM_CLASS_FRAME);
    }
    function getNncLesson14NounstemNumberFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_NOUNSTEM_NUMBER_FRAME);
    }
    function getNncLesson14AbsolutiveSingularCommonFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME);
    }
    function getNncLesson14AbsolutivePluralFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_ABSOLUTIVE_PLURAL_FRAME);
    }
    function getNncLesson14PossessivePluralFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_POSSESSIVE_PLURAL_FRAME);
    }
    function getNncLesson14PossessiveSingularCommonFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_POSSESSIVE_SINGULAR_COMMON_FRAME);
    }
    function getNncLesson14ConstituentAnalysisFrame() {
      return cloneNncLessonRecord(NNC_LESSON14_CONSTITUENT_ANALYSIS_FRAME);
    }
    function getNncLesson14SubsectionInventory() {
      return NNC_LESSON14_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON14_VALIDATION_REFS),
        generationPolicy: "diagnostico; no completa clases, subclases, derivaciones de tronco ni alternativas sin fuente Andrews concreta y puente ortografico"
      }));
    }
    function getNncLesson14RemainingGaps() {
      return Array.from(NNC_LESSON14_REMAINING_GAPS);
    }
    function buildNncLesson14PursuitFrame() {
      const inventory = getNncLesson14SubsectionInventory();
      const useStemFrame = getNncLesson14UseStemFrame();
      const nounstemClassFrame = getNncLesson14NounstemClassFrame();
      const nounstemNumberFrame = getNncLesson14NounstemNumberFrame();
      const absolutiveSingularCommonFrame = getNncLesson14AbsolutiveSingularCommonFrame();
      const absolutivePluralFrame = getNncLesson14AbsolutivePluralFrame();
      const possessivePluralFrame = getNncLesson14PossessivePluralFrame();
      const possessiveSingularCommonFrame = getNncLesson14PossessiveSingularCommonFrame();
      const constituentAnalysisFrame = getNncLesson14ConstituentAnalysisFrame();
      const frame = {
        kind: "lesson-14-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 14,
        aimStatus: "shooting",
        pdfRefs: Array.from(NNC_LESSON14_PDF_REFS),
        plannedArrows: [{
          id: "lesson-14-nounstem-class-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 14.1-14.8 against use-stem kinds, nounstem classes, number boundaries, state/number-specific stem selection, and constituent-analysis warnings.",
          andrewsRefs: Array.from(NNC_LESSON14_PDF_REFS),
          expectedFeedbackRefs: Array.from(NNC_LESSON14_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-14-nounstem-class-audit",
          result: "hit",
          correction: "Lesson 14 now carries subsection PDF refs, Spanish directives, use-stem and nounstem-class metadata, number/derived-stem boundaries, state-specific stem-selection frames, and blockers for unlicensed class/subclass generation.",
          andrewsRefs: Array.from(NNC_LESSON14_PDF_REFS),
          feedbackRefs: Array.from(NNC_LESSON14_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        useStemFrame,
        nounstemClassFrame,
        nounstemNumberFrame,
        absolutiveSingularCommonFrame,
        absolutivePluralFrame,
        possessivePluralFrame,
        possessiveSingularCommonFrame,
        constituentAnalysisFrame,
        currentEngineBoundary: {
          currentNawatClasses: ["t", "ti", "in", "zero"],
          classStemCompatibilityEnforced: true,
          completeLexicalClassInventory: false,
          completeUseStemAlternation: false,
          completeDerivedStemGeneration: false,
          noTenseSlot: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson14RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachNncLessonGrammarContract(frame, {
        metadataKind: "lesson-14-pursuit-frame",
        routeStage: "audit-lesson-14",
        sourceInput: "Andrews Lesson 14.1-14.8",
        structuralSource: "Andrews Lesson 14",
        andrewsRefs: ["Andrews Lesson 14.1-14.8"],
        supported: false,
        diagnostics: ["lesson-14-nounstem-class-partial"],
        morphBoundaryFrame: {
          num1BelongsTo: "subject-personal-pronoun",
          classNamingSlot: nounstemClassFrame.classNamingSlot,
          ambiguityFrame: constituentAnalysisFrame
        },
        stemFrame: {
          useStemFrame,
          nounstemClassFrame,
          nounstemNumberFrame,
          stateSpecificStemSelection: {
            absolutiveSingularCommon: absolutiveSingularCommonFrame,
            absolutivePlural: absolutivePluralFrame,
            possessivePlural: possessivePluralFrame,
            possessiveSingularCommon: possessiveSingularCommonFrame
          }
        },
        nuclearClauseFrame: {
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          stateScope: ["absolutive", "possessive"],
          hasTensePosition: false
        },
        participantFrame: {
          subject: {
            numberBelongsTo: nounstemNumberFrame.numberBelongsTo,
            predicateMarksNumber: nounstemNumberFrame.predicateMarksNumber
          }
        },
        inflectionFrame: {
          hasTensePosition: false,
          predicateState: "absolutive-or-possessive",
          nounstemClassValues: nounstemClassFrame.currentEngineClasses
        },
        targetContract: {
          metadataKind: "lesson-14-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getNncLesson15PossessivePeculiaritiesFrame() {
      return cloneNncLessonRecord(NNC_LESSON15_POSSESSIVE_PECULIARITIES_FRAME);
    }
    function getNncLesson15NaturallyPossessedFrame() {
      return cloneNncLessonRecord(NNC_LESSON15_NATURALLY_POSSESSED_FRAME);
    }
    function getNncLesson15SentenceStructureFrame() {
      return cloneNncLessonRecord(NNC_LESSON15_SENTENCE_STRUCTURE_FRAME);
    }
    function getNncLesson15SubsectionInventory() {
      return NNC_LESSON15_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON15_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera suplencias, posesion natural ni oraciones CNN sin fuente Andrews concreta y puente ortografico y capa sintactica"
      }));
    }
    function getNncLesson15RemainingGaps() {
      return Array.from(NNC_LESSON15_REMAINING_GAPS);
    }
    function buildNncLesson15PursuitFrame() {
      const inventory = getNncLesson15SubsectionInventory();
      const possessivePeculiaritiesFrame = getNncLesson15PossessivePeculiaritiesFrame();
      const naturallyPossessedFrame = getNncLesson15NaturallyPossessedFrame();
      const sentenceStructureFrame = getNncLesson15SentenceStructureFrame();
      const frame = {
        kind: "lesson-15-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 15,
        aimStatus: "shooting",
        pdfRefs: Array.from(NNC_LESSON15_PDF_REFS),
        plannedArrows: [{
          id: "lesson-15-further-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 15.1-15.3 against possessive-state peculiarities, naturally possessed nounstems, and NNC sentence-structure boundaries.",
          andrewsRefs: Array.from(NNC_LESSON15_PDF_REFS),
          expectedFeedbackRefs: Array.from(NNC_LESSON15_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-15-further-nnc-audit",
          result: "hit",
          correction: "Lesson 15 now carries subsection PDF refs, Spanish directives, possessive-peculiarity metadata, natural-possession evidence boundaries, NNC sentence-structure diagnostics, and blockers for unlicensed state-case or sentence generation.",
          andrewsRefs: Array.from(NNC_LESSON15_PDF_REFS),
          feedbackRefs: Array.from(NNC_LESSON15_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        possessivePeculiaritiesFrame,
        naturallyPossessedFrame,
        sentenceStructureFrame,
        currentEngineBoundary: {
          ordinaryPossessiveFixturesExist: true,
          organicYuOptInExists: true,
          completeNaturalPossessionLexicon: false,
          sentenceGenerationLicensed: false,
          noTenseSlot: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson15RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachNncLessonGrammarContract(frame, {
        metadataKind: "lesson-15-pursuit-frame",
        routeStage: "audit-lesson-15",
        sourceInput: "Andrews Lesson 15.1-15.3",
        structuralSource: "Andrews Lesson 15",
        andrewsRefs: ["Andrews Lesson 15.1-15.3"],
        supported: false,
        diagnostics: ["lesson-15-further-nnc-partial"],
        morphBoundaryFrame: {
          possessivePluralAssimilation: possessivePeculiaritiesFrame.possessivePluralAssimilation,
          nuclearPossessorRule: possessivePeculiaritiesFrame.nuclearPossessorRule
        },
        stemFrame: {
          possessivePeculiaritiesFrame,
          naturallyPossessedFrame
        },
        nuclearClauseFrame: {
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          sentenceStructureFrame,
          hasTensePosition: false
        },
        participantFrame: {
          possessor: {
            nuclearBasicPossessor: true,
            supplementaryPossessorsDeferred: true
          }
        },
        inflectionFrame: {
          hasTensePosition: false,
          predicateState: "possessive-state-diagnostic"
        },
        targetContract: {
          metadataKind: "lesson-15-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function getNncLesson16OverviewFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_OVERVIEW_FRAME);
    }
    function getNncLesson16EntitiveFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_ENTITIVE_FRAME);
    }
    function getNncLesson16PersonalFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_PERSONAL_FRAME);
    }
    function getNncLesson16InterrogativeFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_INTERROGATIVE_FRAME);
    }
    function getNncLesson16DemonstrativeFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_DEMONSTRATIVE_FRAME);
    }
    function getNncLesson16IndefiniteFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_INDEFINITE_FRAME);
    }
    function getNncLesson16QuantitiveOverviewFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_QUANTITIVE_OVERVIEW_FRAME);
    }
    function getNncLesson16QuichFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_QUICH_FRAME);
    }
    function getNncLesson16QuiChiFrame() {
      return cloneNncLessonRecord(NNC_LESSON16_QUI_CHI_FRAME);
    }
    function getNncLesson16SubsectionInventory() {
      return NNC_LESSON16_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON16_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera CNN pronominales sin contrato de ruta Andrews separado y puente ortografico"
      }));
    }
    function getNncLesson16RemainingGaps() {
      return Array.from(NNC_LESSON16_REMAINING_GAPS);
    }
    function buildNncLesson16PursuitFrame() {
      const inventory = getNncLesson16SubsectionInventory();
      const overviewFrame = getNncLesson16OverviewFrame();
      const entitiveFrame = getNncLesson16EntitiveFrame();
      const personalFrame = getNncLesson16PersonalFrame();
      const interrogativeFrame = getNncLesson16InterrogativeFrame();
      const demonstrativeFrame = getNncLesson16DemonstrativeFrame();
      const indefiniteFrame = getNncLesson16IndefiniteFrame();
      const quantitiveOverviewFrame = getNncLesson16QuantitiveOverviewFrame();
      const quichFrame = getNncLesson16QuichFrame();
      const quiChiFrame = getNncLesson16QuiChiFrame();
      const frame = {
        kind: "lesson-16-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 16,
        aimStatus: "shooting",
        pdfRefs: Array.from(NNC_LESSON16_PDF_REFS),
        plannedArrows: [{
          id: "lesson-16-pronominal-nnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 16.1-16.9 against pronominal NNC kinds, entitive and quantitive subtypes, absolutive-only status, fused-spelling warnings, and generation blockers.",
          andrewsRefs: Array.from(NNC_LESSON16_PDF_REFS),
          expectedFeedbackRefs: Array.from(NNC_LESSON16_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-16-pronominal-nnc-audit",
          result: "hit",
          correction: "Lesson 16 now carries subsection PDF refs, Spanish directives, pronominal-NNC subtype metadata, absolutive-only boundaries, fused-spelling diagnostics, quantitive matrix frames, and blockers for unlicensed pronominal generation.",
          andrewsRefs: Array.from(NNC_LESSON16_PDF_REFS),
          feedbackRefs: Array.from(NNC_LESSON16_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        overviewFrame,
        entitiveFrame,
        personalFrame,
        interrogativeFrame,
        demonstrativeFrame,
        indefiniteFrame,
        quantitiveOverviewFrame,
        quichFrame,
        quiChiFrame,
        currentEngineBoundary: {
          pronominalNncRouteGenerated: false,
          ordinaryNncFormulaSlotsReused: false,
          confirmedOrthographyBridgePronominalFixtures: false,
          absolutiveOnly: true,
          noTenseSlot: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson16RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachNncLessonGrammarContract(frame, {
        metadataKind: "lesson-16-pursuit-frame",
        routeStage: "audit-lesson-16",
        sourceInput: "Andrews Lesson 16.1-16.9",
        structuralSource: "Andrews Lesson 16",
        andrewsRefs: ["Andrews Lesson 16.1-16.9"],
        supported: false,
        diagnostics: ["lesson-16-pronominal-nnc-partial"],
        morphBoundaryFrame: {
          pluralizedStemRule: overviewFrame.pluralizedStemRule,
          fusedSpellingWarnings: {
            tlehIn: interrogativeFrame.tlehInFusion,
            acIn: interrogativeFrame.acInFusion,
            demonstrative: demonstrativeFrame.adjunctorSolidSpellingWarning
          }
        },
        stemFrame: {
          nncKind: overviewFrame.nncKind,
          entitiveFrame,
          quantitiveFrame: {
            overview: quantitiveOverviewFrame,
            quich: quichFrame,
            quiChi: quiChiFrame
          }
        },
        nuclearClauseFrame: {
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          nncKind: "pronominal",
          stateRestriction: overviewFrame.stateRestriction,
          hasTensePosition: false
        },
        participantFrame: {
          subject: {
            affixalSubjectRemainsBasic: true,
            relativePronounsPresent: false
          }
        },
        inflectionFrame: {
          hasTensePosition: false,
          predicateState: "absolutive-only"
        },
        targetContract: {
          metadataKind: "lesson-16-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        }
      });
    }
    function parseOrdinaryNncPersonSubKey(personSubKey = "") {
      const match = String(personSubKey || "").match(/^([123])(?:s|sg|p|pl)$/i);
      if (!match) {
        return {
          person: null,
          number: ""
        };
      }
      return {
        person: Number(match[1]),
        number: /p/i.test(personSubKey) ? "plural" : "singular"
      };
    }
    function resolveOrdinaryNncSubject(subject = null) {
      const source = subject && typeof subject === "object" ? subject : {};
      const requestedId = typeof subject === "string" ? subject : source.id || source.personSubKey || "";
      const subjectPrefix = typeof source.subjectPrefix === "string" ? source.subjectPrefix : typeof source.prefix === "string" ? source.prefix : "";
      const subjectSuffix = typeof source.subjectSuffix === "string" ? source.subjectSuffix : typeof source.suffix === "string" ? source.suffix : "";
      const entries = getOrdinaryNncSubjectEntries();
      const entry = entries.find(candidate => requestedId && (candidate.id === requestedId || candidate.personSubKey === requestedId) || String(candidate.subjectPrefix || "") === subjectPrefix && String(candidate.subjectSuffix || "") === subjectSuffix) || entries.find(candidate => String(candidate.subjectPrefix || "") === "" && String(candidate.subjectSuffix || "") === "");
      const prefix = entry ? String(entry.subjectPrefix || "") : subjectPrefix;
      const suffix = entry ? String(entry.subjectSuffix || "") : subjectSuffix;
      const agreementInfo = typeof targetObject.getPers1Pers2Info === "function" ? targetObject.getPers1Pers2Info(prefix, suffix) : null;
      const parsed = parseOrdinaryNncPersonSubKey(entry?.personSubKey || "");
      return {
        subjectPrefix: prefix,
        subjectSuffix: suffix,
        person: agreementInfo?.person || parsed.person || 3,
        number: normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular"),
        personSubKey: entry?.personSubKey || `${agreementInfo?.person || parsed.person || 3}${normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular") === "plural" ? "pl" : "sg"}`
      };
    }
    function hasExplicitOrdinaryNncSubject(subject = null) {
      if (typeof subject === "string") {
        return String(subject || "").trim() !== "";
      }
      if (!subject || typeof subject !== "object") {
        return false;
      }
      return ["id", "personSubKey", "subjectPrefix", "prefix", "subjectSuffix", "suffix"].some(key => Object.prototype.hasOwnProperty.call(subject, key));
    }
    function resolveOrdinaryNncClauseSubject(subject = null, number = "singular", animacy = "") {
      if (!hasExplicitOrdinaryNncSubject(subject) && animacy === "animate" && number === "plural") {
        return resolveOrdinaryNncSubject({
          personSubKey: "3pl"
        });
      }
      return resolveOrdinaryNncSubject(subject);
    }
    function resolveOrdinaryNncPossessor(possessor = null, possessivePrefix = "") {
      const raw = possessor && typeof possessor === "object" ? possessor.prefix || possessor.value || possessor.id || "" : possessor || possessivePrefix || "";
      const normalized = String(raw || "").trim();
      if (!normalized || normalized === "none") {
        return null;
      }
      const entry = getOrdinaryNncPossessiveEntries().find(candidate => candidate.value === normalized || candidate.id === normalized || candidate.personSubKey === normalized);
      if (!entry) {
        return {
          id: "",
          prefix: normalized,
          personSubKey: "",
          number: "",
          unsupported: true
        };
      }
      return {
        id: entry.id || "",
        prefix: entry.value || "",
        personSubKey: entry.personSubKey || "",
        number: entry.number || ""
      };
    }
    function findOrdinaryNncFixture(stem = "") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      return getOrdinaryNncFixtureEntries().find(fixture => {
        const keys = [fixture.id, fixture.stem, fixture.lemma, ...(Array.isArray(fixture.aliases) ? fixture.aliases : [])].map(normalizeOrdinaryNncText).filter(Boolean);
        return keys.includes(normalizedStem);
      }) || null;
    }
    function isOrdinaryNncVowelFinalStem(stem = "") {
      return /[aeiou]$/i.test(normalizeOrdinaryNncText(stem));
    }
    function getOrdinaryNncStemShapeLabel(stem = "") {
      return isOrdinaryNncVowelFinalStem(stem) ? "vowel-final" : "consonant-final";
    }
    function getOrdinaryNncClassStemCompatibility(nounClass = "", stem = "") {
      const normalizedClass = normalizeOrdinaryNncNum1Num2Class(nounClass) || "zero";
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      if (!normalizedStem || normalizedClass === "zero") {
        return {
          compatible: true,
          nounClass: normalizedClass,
          stem: normalizedStem,
          requiredStemShape: "consonant-or-vowel-final",
          actualStemShape: normalizedStem ? getOrdinaryNncStemShapeLabel(normalizedStem) : ""
        };
      }
      const vowelFinal = isOrdinaryNncVowelFinalStem(normalizedStem);
      const requiredStemShape = normalizedClass === "t" ? "vowel-final" : "consonant-final";
      const compatible = normalizedClass === "t" ? vowelFinal : !vowelFinal;
      return {
        compatible,
        nounClass: normalizedClass,
        stem: normalizedStem,
        requiredStemShape,
        actualStemShape: getOrdinaryNncStemShapeLabel(normalizedStem)
      };
    }
    function buildOrdinaryNncClassStemCompatibilityDiagnostic(compatibility = {}) {
      return buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.classStemIncompatible, `Nominal nuclear clause class "${compatibility.nounClass || ""}" requires a ${compatibility.requiredStemShape || "compatible"} stem; "${compatibility.stem || ""}" is ${compatibility.actualStemShape || "not compatible"}.`);
    }
    function getOrdinaryNncOrganicPossessionSourceSignature({
      sourceStem = "",
      possessorPrefix = "",
      possessionKind = ORDINARY_NNC_POSSESSION_KIND.organic
    } = {}) {
      return [String(sourceStem || ""), String(possessorPrefix || ""), String(possessionKind || ""), "Andrews 39.3.4"].join("|");
    }
    function getOrdinaryNncOrganicPossessionSourceStemFromFormulaSlots(formulaSlots = null) {
      return getOrdinaryNncRequestFormulaSlotStem(formulaSlots);
    }
    function buildOrdinaryNncOrganicPossessionSourceFrame({
      formulaSlots = null,
      possessor = null,
      possessionKind = ORDINARY_NNC_POSSESSION_KIND.organic
    } = {}) {
      const sourceStem = getOrdinaryNncOrganicPossessionSourceStemFromFormulaSlots(formulaSlots);
      if (!sourceStem || normalizeOrdinaryNncPossessionKind(possessionKind) !== ORDINARY_NNC_POSSESSION_KIND.organic) {
        return null;
      }
      const possessorPrefix = String(possessor?.prefix || "");
      const sourceSignature = getOrdinaryNncOrganicPossessionSourceSignature({
        sourceStem,
        possessorPrefix,
        possessionKind: ORDINARY_NNC_POSSESSION_KIND.organic
      });
      return Object.freeze({
        kind: "ordinary-nnc-organic-possession-source-frame",
        version: 1,
        formulaSchemaId: "ordinary-nnc-shell",
        routeFamily: "ordinary-nnc",
        routeStage: "organic-possession",
        lessonRef: "Andrews 39.3.4",
        sourceStem,
        sourceFormulaSlots: formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null,
        possessorPrefix,
        possessionKind: ORDINARY_NNC_POSSESSION_KIND.organic,
        stateCase: "organic-possession",
        matrixStem: "yu",
        classicalAnalogue: "(-yo)-tl",
        operation: "append-organic-possession-yu",
        sourceSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil orthography bridge"
      });
    }
    function buildOrdinaryNncOrganicPossessionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-organic-possession-source-frame") {
        return null;
      }
      const sourceStem = String(sourceFrame.sourceStem || "");
      if (!sourceStem) {
        return null;
      }
      const matrixSurface = sourceStem.endsWith("yu") ? "" : "yu";
      const predicateStem = `${sourceStem}${matrixSurface}`;
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-organic-possession-target-frame",
        predicateStem,
        sourceStem,
        matrixStem: "yu",
        matrixSurface,
        state: ORDINARY_NNC_STATE.possessive,
        nounClass: "t",
        stateCase: "organic-possession",
        possessionKind: ORDINARY_NNC_POSSESSION_KIND.organic,
        possessorPrefix: sourceFrame.possessorPrefix || "",
        targetSegmentFrames: Object.freeze([Object.freeze({
          role: "predicate",
          slot: "source-stem",
          surface: sourceStem,
          formulaValue: sourceStem
        }), Object.freeze({
          role: "organic-possession-matrix",
          slot: "organic-matrix",
          surface: matrixSurface,
          formulaValue: "yu"
        })])
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-organic-possession-yu-realization",
        family: "ordinary-nnc",
        routeFamily: "ordinary-nnc",
        routeStage: "organic-possession",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        operationApplied: "append-organic-possession-yu-from-source-frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getOrdinaryNncOrganicPossessionFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-organic-possession-source-frame") {
        return "ordinary-nnc-organic-possession-source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-organic-possession-yu-realization" || operationFrame.routeFamily !== "ordinary-nnc" || operationFrame.operationApplied !== "append-organic-possession-yu-from-source-frame" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "ordinary-nnc-organic-possession-operation-frame-required";
      }
      if (String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "ordinary-nnc-organic-possession-contradictory-source-frame";
      }
      const expectedPredicateStem = `${sourceFrame.sourceStem || ""}${String(sourceFrame.sourceStem || "").endsWith("yu") ? "" : "yu"}`;
      if (String(operationFrame.targetFrame?.predicateStem || "") !== expectedPredicateStem) {
        return "ordinary-nnc-organic-possession-contradictory-target-frame";
      }
      return "";
    }
    function buildOrdinaryNncOrganicPossessionProfile({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const mismatch = getOrdinaryNncOrganicPossessionFrameMismatch({
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return null;
      }
      return {
        sourceStem: sourceFrame.sourceStem || "",
        organicStem: operationFrame.targetFrame?.predicateStem || "",
        targetFrame: operationFrame.targetFrame || null,
        sourceFrame,
        operationFrame
      };
    }
    function buildOrdinaryNncOrganicPossessionStem(stem = "", options = {}) {
      void stem;
      return buildOrdinaryNncOrganicPossessionProfile(options)?.organicStem || "";
    }
    function buildOrdinaryNncOrganicPossessionFrame({
      sourceStem = "",
      organicStem = "",
      possessor = null,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const profile = buildOrdinaryNncOrganicPossessionProfile({
        sourceFrame,
        operationFrame
      });
      const resolvedSourceStem = profile?.sourceStem || normalizeOrdinaryNncText(sourceStem).replace(/[()]/g, "");
      const resolvedOrganicStem = profile?.organicStem || normalizeOrdinaryNncText(organicStem).replace(/[()]/g, "");
      return {
        version: 1,
        outputKind: "ordinary-nnc-organic-possession",
        lessonRef: "Andrews 39.3.4",
        stateCase: "organic-possession",
        possessionKind: ORDINARY_NNC_POSSESSION_KIND.organic,
        sourceStem: resolvedSourceStem,
        matrixStem: "yu",
        classicalAnalogue: "(-yo)-tl",
        nawatMatrix: "-yu",
        predicateStem: resolvedOrganicStem,
        requiredState: ORDINARY_NNC_STATE.possessive,
        possessorPrefix: String(possessor?.prefix || ""),
        semanticRelation: "integral-part-to-whole",
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF",
        sourceFrame: sourceFrame || null,
        operationFrame: operationFrame || null
      };
    }
    function buildOrdinaryNncSurfaceChainText({
      subjectPrefix = "",
      possessivePrefix = "",
      core = ""
    } = {}) {
      const result = buildOrdinaryNncSurfaceChainResult({
        subjectPrefix,
        possessivePrefix,
        core
      });
      return String(result?.surface || "");
    }
    function collectOrdinaryNncSurfaceSoundSpellingFrames(...sources) {
      const frames = [];
      const pushFrame = (frame = null) => {
        if (!frame || typeof frame !== "object" || !frame.ruleId) {
          return;
        }
        const key = [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
        if (!key || frames.some(entry => [entry.ruleId || "", entry.grammarSlot || "", entry.syllablePosition || "", entry.sourceSurface || "", entry.target || "", Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "", entry.segmentRole || "", entry.sourceSegmentValue || "", entry.targetSegmentValue || ""].join(":") === key)) {
          return;
        }
        frames.push({
          ...frame
        });
      };
      sources.forEach(source => {
        if (!source) {
          return;
        }
        if (Array.isArray(source)) {
          source.forEach(pushFrame);
          return;
        }
        if (typeof source !== "object") {
          return;
        }
        if (Array.isArray(source.soundSpellingFrames)) {
          source.soundSpellingFrames.forEach(pushFrame);
        }
        if (source.soundSpellingFrame && typeof source.soundSpellingFrame === "object") {
          pushFrame(source.soundSpellingFrame);
        }
        const grammarFrame = (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
        if (Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames)) {
          grammarFrame.orthographyFrame.soundSpellingFrames.forEach(pushFrame);
        }
        if (Array.isArray(source.orthographyFrame?.soundSpellingFrames)) {
          source.orthographyFrame.soundSpellingFrames.forEach(pushFrame);
        }
      });
      return frames;
    }
    function buildOrdinaryNncSurfaceChainResult({
      subjectPrefix = "",
      possessivePrefix = "",
      core = ""
    } = {}) {
      const normalizedCore = String(core || "");
      if (!normalizedCore) {
        return {
          surface: "",
          surfaceForms: [],
          soundSpellingFrames: []
        };
      }
      if (typeof targetObject.buildOutputWordResult === "function") {
        const result = targetObject.buildOutputWordResult({
          pers1: String(subjectPrefix || ""),
          poseedor: String(possessivePrefix || ""),
          obj1: "",
          tronco: normalizedCore
        });
        const surface = String(result?.surface || result?.surfaceForms?.[0] || "");
        return {
          ...result,
          surface,
          surfaceForms: surface ? [surface] : [],
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result)
        };
      }
      if (typeof targetObject.buildOutputPrefixedChain === "function") {
        const surface = targetObject.buildOutputPrefixedChain({
          pers1: String(subjectPrefix || ""),
          poseedor: String(possessivePrefix || ""),
          obj1: "",
          tronco: normalizedCore
        });
        return {
          surface,
          surfaceForms: surface ? [surface] : [],
          soundSpellingFrames: []
        };
      }
      const surface = `${subjectPrefix || ""}${possessivePrefix || ""}${normalizedCore}`;
      return {
        surface,
        surfaceForms: surface ? [surface] : [],
        soundSpellingFrames: []
      };
    }
    function isOrdinaryNncPluralPossessor(possessor = null) {
      const prefix = String(possessor?.prefix || possessor || "");
      return possessor?.number === "plural" || ["tu", "anmu", "in"].includes(prefix);
    }
    function buildOrdinaryNncOpenStemPossessiveSurface(stem = "", possessivePrefix = "", animacy = "") {
      void stem;
      void possessivePrefix;
      void animacy;
      return "";
    }
    function getOrdinaryNncAbsolutiveSingularSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        nounClass: sourceFrame.nounClass || "",
        nounClassSurface: sourceFrame.nounClassSurface || "",
        state: sourceFrame.state || "",
        number: sourceFrame.number || "",
        animacy: sourceFrame.animacy || ""
      });
    }
    function buildOrdinaryNncAbsolutiveSingularSourceFrame({
      sourceStem = "",
      nounClass = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      animacy = ""
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const normalizedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
      const nounClassSurface = getOrdinaryNncNum1Num2Surface(normalizedNounClass);
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-absolutive-singular-missing-source-stem");
      }
      if (!normalizedNounClass) {
        diagnostics.push("ordinary-nnc-absolutive-singular-missing-noun-class-frame");
      }
      if (normalizedState !== ORDINARY_NNC_STATE.absolutive) {
        diagnostics.push("ordinary-nnc-absolutive-singular-state-required");
      }
      if (normalizedNumber !== "singular") {
        diagnostics.push("ordinary-nnc-absolutive-singular-number-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-absolutive-singular-source-frame",
        routeId: "ordinary-nnc-absolutive-singular-realization",
        sourceStem: normalizedSourceStem,
        sourceStemRole: "ordinary-nnc-structural-predicate-stem",
        sourceStemIsGeneratedDisplay: false,
        nounClass: normalizedNounClass,
        nounClassSurface,
        state: normalizedState,
        number: normalizedNumber,
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAbsolutiveSingularSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAbsolutiveSingularOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-absolutive-singular-source-frame") {
        return null;
      }
      const targetSurface = sourceFrame.supported === true ? `${sourceFrame.sourceStem || ""}${sourceFrame.nounClassSurface || ""}` : "";
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-absolutive-singular-target-frame",
        surface: targetSurface,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || "",
          surface: sourceFrame.sourceStem || "",
          operationId: "ordinary-nnc-absolutive-singular-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-number-connector",
          slot: "num1-num2",
          formulaValue: sourceFrame.nounClass || "",
          surface: sourceFrame.nounClassSurface || "",
          operationId: "ordinary-nnc-absolutive-singular-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-absolutive-singular-realization",
        routeId: "ordinary-nnc-absolutive-singular-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-absolutive-singular-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-absolutive-singular-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-absolutive-singular-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAbsolutiveSingularOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncOpenStemPossessiveSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        formulaStem: sourceFrame.formulaStem || "",
        sourceStemRole: sourceFrame.sourceStemRole || "",
        sourceStemEvidence: sourceFrame.sourceStemEvidence || "",
        possessorPrefix: sourceFrame.possessorPrefix || "",
        possessorNumber: sourceFrame.possessorNumber || "",
        animacy: sourceFrame.animacy || "",
        pluralPossessorSuffix: sourceFrame.pluralPossessorSuffix || "",
        requiresReduplicatedStem: sourceFrame.requiresReduplicatedStem === true
      });
    }
    function buildOrdinaryNncOpenStemPossessiveSourceFrame({
      sourceStem = "",
      formulaStem = "",
      sourceStemEvidence = "",
      possessor = null,
      animacy = ""
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const normalizedFormulaStem = String(formulaStem || sourceStem || "").trim();
      const normalizedSourceStemEvidence = String(sourceStemEvidence || "ordinary-nnc-formula-stem").trim();
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
      const possessorPrefix = String(resolvedPossessor?.prefix || "").trim();
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const pluralPossessorSuffix = normalizedAnimacy === "animate" && isOrdinaryNncPluralPossessor(resolvedPossessor) ? "wan" : "";
      const requiresReduplicatedStem = normalizedAnimacy === "animate" && possessorPrefix === "in";
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-open-stem-possessive-missing-source-stem");
      }
      if (!possessorPrefix || resolvedPossessor?.unsupported) {
        diagnostics.push("ordinary-nnc-open-stem-possessive-missing-possessor-frame");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-open-stem-possessive-source-frame",
        routeId: "ordinary-nnc-open-stem-possessive-realization",
        sourceStem: normalizedSourceStem,
        formulaStem: normalizedFormulaStem,
        sourceStemRole: normalizedSourceStemEvidence === "static-nnc-structured-possessive-stem" ? "ordinary-nnc-structured-possessive-predicate-stem" : "ordinary-nnc-structural-predicate-stem",
        sourceStemEvidence: normalizedSourceStemEvidence,
        sourceStemIsGeneratedDisplay: false,
        possessorPrefix,
        possessorNumber: String(resolvedPossessor?.number || ""),
        animacy: normalizedAnimacy,
        pluralPossessorSuffix,
        requiresReduplicatedStem,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncOpenStemPossessiveSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncOpenStemPossessiveOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-open-stem-possessive-source-frame") {
        return null;
      }
      const targetStemSurface = sourceFrame.supported === true ? sourceFrame.requiresReduplicatedStem === true ? buildOrdinaryNncReduplicatedSurfaceLegacy(sourceFrame.sourceStem || "") : String(sourceFrame.sourceStem || "") : "";
      const targetPossessorSurface = sourceFrame.supported === true && String(sourceFrame.possessorPrefix || "") === "in" && /^[aeiou]/.test(targetStemSurface) ? "inh" : String(sourceFrame.possessorPrefix || "");
      const targetSurface = sourceFrame.supported === true ? `${targetPossessorSurface}${targetStemSurface}${sourceFrame.pluralPossessorSuffix || ""}` : "";
      const soundSpellingFrames = sourceFrame.possessorPrefix === "in" && targetPossessorSurface === "inh" ? Object.freeze([Object.freeze({
        ruleId: "n-open-transition-nh",
        source: "n",
        sourceSurface: "n",
        target: "nh",
        grammarSlot: "poseedor",
        segmentRole: "poseedor",
        sourceSegmentValue: "in",
        targetSegmentValue: "inh"
      })]) : Object.freeze([]);
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-open-stem-possessive-target-frame",
        surface: targetSurface,
        soundSpellingFrames,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessor-prefix",
          slot: "st1-st2",
          formulaValue: sourceFrame.possessorPrefix || "",
          surface: targetPossessorSurface,
          operationId: "ordinary-nnc-open-stem-possessive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: sourceFrame.requiresReduplicatedStem === true ? "predicate-possessive-reduplicated" : "predicate",
          slot: "STEM",
          formulaValue: sourceFrame.formulaStem || sourceFrame.sourceStem || "",
          surface: targetStemSurface,
          operationId: "ordinary-nnc-open-stem-possessive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessive-plural-suffix",
          slot: "st1-st2-number",
          formulaValue: sourceFrame.pluralPossessorSuffix || "",
          surface: sourceFrame.pluralPossessorSuffix || "",
          operationId: "ordinary-nnc-open-stem-possessive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-open-stem-possessive-realization",
        routeId: "ordinary-nnc-open-stem-possessive-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-open-stem-possessive-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-open-stem-possessive-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-open-stem-possessive-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function buildOrdinaryNncOpenStemPossessiveSurfaceCell(stem = "", possessivePrefix = "", animacy = "", options = {}) {
      const sourceFrame = options?.sourceFrame || null;
      const operationFrame = options?.operationFrame || null;
      const surface = buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
        sourceFrame,
        operationFrame
      });
      if (!surface) {
        return {
          surfaceForms: [],
          soundSpellingFrames: [],
          sourceFrame,
          operationFrame,
          segmentFrames: []
        };
      }
      return {
        surfaceForms: [surface],
        soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
        sourceFrame,
        operationFrame,
        segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
      };
    }
    function buildOrdinaryNncOpenStemFixture(stem = "", {
      nounClass = "",
      animacy = ""
    } = {}) {
      const normalizedClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
      const normalizedStem = stripOrdinaryNncNum1Num2FromInput(stem, normalizedClass);
      if (!normalizedStem) {
        return null;
      }
      const absolutiveSurface = `${normalizedStem}${getOrdinaryNncNum1Num2Surface(normalizedClass)}`;
      const singularPossessives = {};
      getOrdinaryNncPossessorInventory().forEach(prefix => {
        const sourceFrame = buildOrdinaryNncOpenStemPossessiveSourceFrame({
          sourceStem: normalizedStem,
          possessor: resolveOrdinaryNncPossessor(prefix),
          animacy
        });
        const operationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame(sourceFrame);
        singularPossessives[prefix] = buildOrdinaryNncOpenStemPossessiveSurfaceCell(normalizedStem, prefix, animacy, {
          sourceFrame,
          operationFrame
        });
      });
      const states = {
        [ORDINARY_NNC_STATE.absolutive]: {
          numberForms: {
            singular: {
              surfaceForms: [absolutiveSurface || normalizedStem]
            }
          }
        }
      };
      if (Object.keys(singularPossessives).length) {
        states[ORDINARY_NNC_STATE.possessive] = {
          numberFormsByPossessor: {
            singular: singularPossessives
          }
        };
      }
      return {
        id: `open:${normalizedStem}`,
        stem: normalizedStem,
        lemma: absolutiveSurface || normalizedStem,
        nounClass: normalizedClass || "zero",
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        openStem: true,
        sourceRefs: [],
        states
      };
    }
    function getOrdinaryNncSurfaceFormsFromCell(cell = null, {
      pluralType = ""
    } = {}) {
      if (Array.isArray(cell)) {
        return cell.filter(Boolean);
      }
      if (cell && typeof cell === "object" && pluralType && cell.formsByPluralType) {
        const byPluralType = cell.formsByPluralType?.[normalizeOrdinaryNncPluralType(pluralType)];
        const pluralTypeForms = getOrdinaryNncSurfaceFormsFromCell(byPluralType);
        if (pluralTypeForms.length) {
          return pluralTypeForms;
        }
      }
      if (cell && typeof cell === "object" && Array.isArray(cell.surfaceForms)) {
        return cell.surfaceForms.filter(Boolean);
      }
      return [];
    }
    function getOrdinaryNncPossessiveStemFromCell(cell = null, {
      pluralType = ""
    } = {}) {
      if (!cell || typeof cell !== "object" || Array.isArray(cell)) {
        return "";
      }
      if (pluralType && cell.formsByPluralType) {
        const byPluralType = cell.formsByPluralType?.[normalizeOrdinaryNncPluralType(pluralType)];
        const pluralTypeStem = getOrdinaryNncPossessiveStemFromCell(byPluralType);
        if (pluralTypeStem) {
          return pluralTypeStem;
        }
      }
      return String(cell.possessiveStem || "").trim();
    }
    function getOrdinaryNncSoundSpellingFramesFromCell(cell = null, {
      pluralType = ""
    } = {}) {
      if (!cell || typeof cell !== "object" || Array.isArray(cell)) {
        return [];
      }
      if (pluralType && cell.formsByPluralType) {
        const byPluralType = cell.formsByPluralType?.[normalizeOrdinaryNncPluralType(pluralType)];
        const pluralTypeFrames = getOrdinaryNncSoundSpellingFramesFromCell(byPluralType);
        if (pluralTypeFrames.length) {
          return pluralTypeFrames;
        }
      }
      return collectOrdinaryNncSurfaceSoundSpellingFrames(cell);
    }
    function getOrdinaryNncFixtureStateCell(fixture = null, state = "", {
      number = "singular",
      possessor = null,
      pluralType = ""
    } = {}) {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return null;
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix] || null;
        if (byNumber) {
          return byNumber;
        }
        return stateData.surfaceByPossessor?.[possessorPrefix] || null;
      }
      return stateData.numberForms?.[number] || stateData || null;
    }
    function getOrdinaryNncSurfaceSegmentRecordsFromCell(cell = null, {
      pluralType = ""
    } = {}) {
      if (!cell || typeof cell !== "object" || Array.isArray(cell)) {
        return [];
      }
      if (pluralType && cell.formsByPluralType) {
        const byPluralType = cell.formsByPluralType?.[normalizeOrdinaryNncPluralType(pluralType)];
        const pluralTypeRecords = getOrdinaryNncSurfaceSegmentRecordsFromCell(byPluralType);
        if (pluralTypeRecords.length) {
          return pluralTypeRecords;
        }
      }
      if (!Array.isArray(cell.segmentFrames) || !cell.segmentFrames.length) {
        return [];
      }
      return (Array.isArray(cell.surfaceForms) ? cell.surfaceForms : []).map((surface, index) => ({
        kind: "ordinary-nnc-derived-plural-surface-segment-record",
        index,
        surface: String(surface || ""),
        sourceFrame: cell.sourceFrame || null,
        operationFrame: cell.operationFrame || null,
        segmentFrames: cell.segmentFrames || []
      })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length);
    }
    function getOrdinaryNncFixtureStateForms(fixture = null, state = "", {
      number = "singular",
      possessor = null,
      pluralType = ""
    } = {}) {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, {
          pluralType
        });
        if (formsByNumber.length) {
          return formsByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSurfaceFormsFromCell(byPossessor, {
          pluralType
        });
      }
      const byNumber = stateData.numberForms?.[number];
      const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, {
        pluralType
      });
      if (formsByNumber.length) {
        return formsByNumber;
      }
      return getOrdinaryNncSurfaceFormsFromCell(stateData, {
        pluralType
      });
    }
    function getOrdinaryNncFixtureStateSoundSpellingFrames(fixture = null, state = "", {
      number = "singular",
      possessor = null,
      pluralType = ""
    } = {}) {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const framesByNumber = getOrdinaryNncSoundSpellingFramesFromCell(byNumber, {
          pluralType
        });
        if (framesByNumber.length) {
          return framesByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSoundSpellingFramesFromCell(byPossessor, {
          pluralType
        });
      }
      const byNumber = stateData.numberForms?.[number];
      const framesByNumber = getOrdinaryNncSoundSpellingFramesFromCell(byNumber, {
        pluralType
      });
      if (framesByNumber.length) {
        return framesByNumber;
      }
      return getOrdinaryNncSoundSpellingFramesFromCell(stateData, {
        pluralType
      });
    }
    function getOrdinaryNncFixtureStateSurfaceSegmentRecords(fixture = null, state = "", {
      number = "singular",
      possessor = null,
      pluralType = ""
    } = {}) {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const recordsByNumber = getOrdinaryNncSurfaceSegmentRecordsFromCell(byNumber, {
          pluralType
        });
        if (recordsByNumber.length) {
          return recordsByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSurfaceSegmentRecordsFromCell(byPossessor, {
          pluralType
        });
      }
      const byNumber = stateData.numberForms?.[number];
      const recordsByNumber = getOrdinaryNncSurfaceSegmentRecordsFromCell(byNumber, {
        pluralType
      });
      if (recordsByNumber.length) {
        return recordsByNumber;
      }
      return getOrdinaryNncSurfaceSegmentRecordsFromCell(stateData, {
        pluralType
      });
    }
    function buildOrdinaryNncStructuredPossessiveSurfaceResults({
      fixture = null,
      stateCell = null,
      state = "",
      number = "",
      possessor = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      if (state !== ORDINARY_NNC_STATE.possessive || number !== "singular" || !fixture || typeof fixture !== "object") {
        return [];
      }
      if (!stateCell || typeof stateCell !== "object" || Array.isArray(stateCell)) {
        return [];
      }
      const normalizedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || fixture?.nounClass || "");
      const structuredPossessiveStem = getOrdinaryNncPossessiveStemFromCell(stateCell);
      const possessiveStem = structuredPossessiveStem || (normalizedNounClass === "zero" && fixture.openStem !== true ? String(fixture.stem || "").trim() : "");
      if (!possessiveStem) {
        return [];
      }
      const sourceFrame = buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: possessiveStem,
        formulaStem: fixture.stem || "",
        sourceStemEvidence: structuredPossessiveStem ? "static-nnc-structured-possessive-stem" : "ordinary-nnc-zero-class-formula-stem",
        possessor,
        animacy
      });
      const operationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame(sourceFrame);
      const surface = buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
        sourceFrame,
        operationFrame
      });
      if (!surface) {
        return [];
      }
      return [{
        surface,
        soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
        sourceFrame,
        operationFrame,
        segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
      }];
    }
    function buildOrdinaryNncStructuredAbsolutiveSingularSurfaceResults({
      fixture = null,
      state = "",
      number = "",
      nounClass = "",
      animacy = ""
    } = {}) {
      if (state !== ORDINARY_NNC_STATE.absolutive || number !== "singular" || !fixture || typeof fixture !== "object") {
        return [];
      }
      const sourceFrame = buildOrdinaryNncAbsolutiveSingularSourceFrame({
        sourceStem: fixture.stem || "",
        nounClass,
        state,
        number,
        animacy
      });
      const operationFrame = buildOrdinaryNncAbsolutiveSingularOperationFrame(sourceFrame);
      const surface = buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
        sourceFrame,
        operationFrame
      });
      if (!surface) {
        return [];
      }
      return [{
        surface,
        soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
        sourceFrame,
        operationFrame,
        segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
      }];
    }
    function isOrdinaryNncThirdSingularSubject(subject = null) {
      return !subject || String(subject.subjectPrefix || "") === "" && String(subject.subjectSuffix || "") === "";
    }
    function buildOrdinaryNncReduplicatedSurface(surface = "") {
      void surface;
      return "";
    }
    function buildOrdinaryNncReduplicatedSurfaceLegacy(surface = "") {
      const normalized = String(surface || "").trim();
      if (!normalized) {
        return "";
      }
      const syllables = typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalized) : [];
      const first = syllables?.[0] || null;
      if (!first || !first.nucleus) {
        return normalized;
      }
      return `${first.onset || ""}${first.nucleus || ""}j${normalized}`;
    }
    function getOrdinaryNncDistributiveReduplicationSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceSurface: sourceFrame.sourceSurface || "",
        sourceSurfaceRole: sourceFrame.sourceSurfaceRole || "",
        sourceStem: sourceFrame.sourceStem || "",
        nounClass: sourceFrame.nounClass || "",
        priorSourceFrameKind: sourceFrame.priorSourceFrameKind || "",
        priorSourceSignature: sourceFrame.priorSourceSignature || "",
        priorOperationId: sourceFrame.priorOperationId || "",
        priorOperationSourceSignature: sourceFrame.priorOperationSourceSignature || "",
        priorOperationTargetFrameKind: sourceFrame.priorOperationTargetFrameKind || "",
        priorOperationTargetSurface: sourceFrame.priorOperationTargetSurface || "",
        syllableFrames: sourceFrame.syllableFrames || [],
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || ""
      });
    }
    function buildOrdinaryNncDistributiveReduplicationSourceFrame({
      sourceSurface = "",
      sourceSurfaceRole = "ordinary-nnc-prior-typed-absolutive-singular-source-form",
      priorSourceFrame = null,
      priorOperationFrame = null,
      state = ORDINARY_NNC_STATE.absolutive,
      animacy = "",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.distributive
    } = {}) {
      const priorTargetSurface = String(priorOperationFrame?.targetFrame?.surface || "").trim();
      const normalizedSourceSurface = String(sourceSurface || priorTargetSurface || "").trim();
      const syllables = normalizedSourceSurface && typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalizedSourceSurface) : [];
      const syllableFrames = (Array.isArray(syllables) ? syllables : []).map((syllable, index) => ({
        kind: "ordinary-nnc-distributive-source-syllable-frame",
        index,
        onset: String(syllable?.onset || ""),
        nucleus: String(syllable?.nucleus || ""),
        coda: String(syllable?.coda || "")
      })).filter(syllable => syllable.nucleus);
      const first = syllableFrames[0] || null;
      const reduplicant = first ? `${first.onset}${first.nucleus}j` : "";
      const diagnostics = [];
      const priorSurface = buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
        sourceFrame: priorSourceFrame,
        operationFrame: priorOperationFrame
      });
      if (!priorSourceFrame || priorSourceFrame.kind !== "ordinary-nnc-absolutive-singular-source-frame") {
        diagnostics.push("ordinary-nnc-distributive-missing-prior-absolutive-source-frame");
      }
      if (!priorOperationFrame || priorOperationFrame.kind !== "andrews-typed-operation-frame" || priorOperationFrame.operationId !== "ordinary-nnc-absolutive-singular-realization") {
        diagnostics.push("ordinary-nnc-distributive-missing-prior-absolutive-operation-frame");
      }
      if (priorSourceFrame && priorOperationFrame && (!priorSurface || !priorTargetSurface || priorSurface !== priorTargetSurface)) {
        diagnostics.push("ordinary-nnc-distributive-contradictory-prior-absolutive-frame");
      }
      if (priorTargetSurface && normalizedSourceSurface && priorTargetSurface !== normalizedSourceSurface) {
        diagnostics.push("ordinary-nnc-distributive-source-surface-contradicts-prior-target");
      }
      if (!normalizedSourceSurface) {
        diagnostics.push("ordinary-nnc-distributive-missing-source-surface");
      }
      if (!reduplicant) {
        diagnostics.push("ordinary-nnc-distributive-missing-source-syllable-frame");
      }
      if (normalizeOrdinaryNncPluralType(pluralType) !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        diagnostics.push("ordinary-nnc-distributive-plural-type-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-distributive-reduplication-source-frame",
        routeId: "ordinary-nnc-distributive-reduplication",
        sourceSurface: normalizedSourceSurface,
        sourceSurfaceRole,
        sourceSurfaceIsGeneratedDisplay: false,
        sourceStem: String(priorSourceFrame?.sourceStem || ""),
        nounClass: String(priorSourceFrame?.nounClass || ""),
        priorSourceFrameKind: priorSourceFrame?.kind || "",
        priorSourceSignature: priorSourceFrame?.sourceSignature || "",
        priorOperationId: priorOperationFrame?.operationId || "",
        priorOperationSourceSignature: priorOperationFrame?.sourceSignature || "",
        priorOperationTargetFrameKind: priorOperationFrame?.targetFrame?.kind || "",
        priorOperationTargetSurface: priorTargetSurface,
        state: normalizeOrdinaryNncState(state),
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        pluralType: normalizeOrdinaryNncPluralType(pluralType),
        syllableFrames: Object.freeze(syllableFrames.map(Object.freeze)),
        reduplicant,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncDistributiveReduplicationSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncDistributiveReduplicationOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-distributive-reduplication-source-frame") {
        return null;
      }
      const targetSurface = sourceFrame.supported === true ? `${sourceFrame.reduplicant || ""}${sourceFrame.sourceSurface || ""}` : "";
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-distributive-reduplication-target-frame",
        surface: targetSurface,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-distributive-reduplicated",
          slot: "STEM",
          formulaValue: sourceFrame.sourceSurface || "",
          surface: targetSurface,
          operationId: "ordinary-nnc-distributive-reduplication",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })])
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-distributive-reduplication",
        routeId: "ordinary-nnc-distributive-reduplication",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-distributive-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-distributive-reduplication-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-distributive-reduplication" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncDistributiveReduplicationOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncAnimateDistributiveSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        subjectPrefix: sourceFrame.subjectPrefix || "",
        subjectSuffix: sourceFrame.subjectSuffix || "",
        numberConnectorSurface: sourceFrame.numberConnectorSurface || "",
        syllableFrames: sourceFrame.syllableFrames || [],
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || ""
      });
    }
    function buildOrdinaryNncAnimateDistributiveSourceFrame({
      sourceStem = "",
      subject = null,
      state = ORDINARY_NNC_STATE.absolutive,
      animacy = "animate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.distributive
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const resolvedSubject = resolveOrdinaryNncSubject(subject);
      const subjectPrefix = String(resolvedSubject?.subjectPrefix || "");
      const subjectSuffix = String(resolvedSubject?.subjectSuffix || "");
      const numberConnectorSurface = "met";
      const syllables = normalizedSourceStem && typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalizedSourceStem) : [];
      const syllableFrames = (Array.isArray(syllables) ? syllables : []).map((syllable, index) => ({
        kind: "ordinary-nnc-animate-distributive-source-syllable-frame",
        index,
        onset: String(syllable?.onset || ""),
        nucleus: String(syllable?.nucleus || ""),
        coda: String(syllable?.coda || "")
      })).filter(syllable => syllable.nucleus);
      const first = syllableFrames[0] || null;
      const reduplicant = first ? `${first.onset}${first.nucleus}j` : "";
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-animate-distributive-missing-source-stem");
      }
      if (!reduplicant) {
        diagnostics.push("ordinary-nnc-animate-distributive-missing-source-syllable-frame");
      }
      if (normalizeOrdinaryNncState(state) !== ORDINARY_NNC_STATE.absolutive) {
        diagnostics.push("ordinary-nnc-animate-distributive-absolutive-state-required");
      }
      if (normalizeOrdinaryNncAnimacy(animacy) !== "animate") {
        diagnostics.push("ordinary-nnc-animate-distributive-animate-reference-required");
      }
      if (normalizeOrdinaryNncPluralType(pluralType) !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        diagnostics.push("ordinary-nnc-animate-distributive-plural-type-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-animate-distributive-source-frame",
        routeId: "ordinary-nnc-animate-distributive-realization",
        sourceStem: normalizedSourceStem,
        sourceStemRole: "ordinary-nnc-structural-predicate-stem",
        sourceStemIsGeneratedDisplay: false,
        subjectPrefix,
        subjectSuffix,
        numberConnectorSurface,
        state: normalizeOrdinaryNncState(state),
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        pluralType: normalizeOrdinaryNncPluralType(pluralType),
        syllableFrames: Object.freeze(syllableFrames.map(Object.freeze)),
        reduplicant,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAnimateDistributiveSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAnimateDistributiveOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-distributive-source-frame") {
        return null;
      }
      const targetStemSurface = sourceFrame.supported === true ? `${sourceFrame.reduplicant || ""}${sourceFrame.sourceStem || ""}` : "";
      const targetSurface = sourceFrame.supported === true ? `${sourceFrame.subjectPrefix || ""}${targetStemSurface}${sourceFrame.numberConnectorSurface || ""}` : "";
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-animate-distributive-target-frame",
        surface: targetSurface,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-person-prefix",
          slot: "pers1-pers2",
          formulaValue: sourceFrame.subjectPrefix || "",
          surface: sourceFrame.subjectPrefix || "",
          operationId: "ordinary-nnc-animate-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-animate-distributive-reduplicated",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || "",
          surface: targetStemSurface,
          operationId: "ordinary-nnc-animate-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-number-connector",
          slot: "num1-num2",
          formulaValue: sourceFrame.numberConnectorSurface || "",
          surface: sourceFrame.numberConnectorSurface || "",
          operationId: "ordinary-nnc-animate-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-animate-distributive-realization",
        routeId: "ordinary-nnc-animate-distributive-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-animate-distributive-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAnimateDistributiveSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-distributive-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-animate-distributive-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAnimateDistributiveOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncAnimateCountPluralSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        sourceSurface: sourceFrame.sourceSurface || "",
        sourceSurfaceRole: sourceFrame.sourceSurfaceRole || "",
        priorSourceFrameKind: sourceFrame.priorSourceFrameKind || "",
        priorSourceSignature: sourceFrame.priorSourceSignature || "",
        priorOperationId: sourceFrame.priorOperationId || "",
        subjectPrefix: sourceFrame.subjectPrefix || "",
        subjectSuffix: sourceFrame.subjectSuffix || "",
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || "",
        numberConnectorSurface: sourceFrame.numberConnectorSurface || ""
      });
    }
    function buildOrdinaryNncAnimateCountPluralSourceFrame({
      sourceStem = "",
      sourceSurface = "",
      subject = null,
      state = ORDINARY_NNC_STATE.absolutive,
      animacy = "animate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.count
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const normalizedSourceSurface = String(sourceSurface || normalizedSourceStem || "").trim();
      const resolvedSubject = resolveOrdinaryNncClauseSubject(subject, "plural", "animate");
      const subjectPrefix = String(resolvedSubject?.subjectPrefix || "");
      const subjectSuffix = String(resolvedSubject?.subjectSuffix || "");
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const effectivePluralType = getEffectiveOrdinaryNncPluralType(pluralType, normalizedAnimacy);
      const diagnostics = [];
      if (!normalizedSourceSurface) {
        diagnostics.push("ordinary-nnc-animate-count-plural-missing-source-surface");
      }
      if (normalizedAnimacy !== "animate") {
        diagnostics.push("ordinary-nnc-animate-count-plural-requires-animate-source");
      }
      if (effectivePluralType !== ORDINARY_NNC_PLURAL_TYPE.count) {
        diagnostics.push("ordinary-nnc-animate-count-plural-requires-count-plural");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-animate-count-plural-source-frame",
        routeId: "ordinary-nnc-animate-count-plural-realization",
        sourceStem: normalizedSourceStem,
        sourceSurface: normalizedSourceSurface,
        sourceSurfaceRole: "ordinary-nnc-authorized-singular-source-form",
        sourceSurfaceIsGeneratedDisplay: false,
        subjectPrefix,
        subjectSuffix,
        state: normalizedState,
        animacy: normalizedAnimacy,
        pluralType: effectivePluralType,
        numberConnectorSurface: "met",
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAnimateCountPluralSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAnimateCountPluralOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-count-plural-source-frame") {
        return null;
      }
      const targetSubjectSurface = sourceFrame.supported === true && String(sourceFrame.subjectPrefix || "").endsWith("n") && /^[aeiou]/.test(String(sourceFrame.sourceSurface || "")) ? `${sourceFrame.subjectPrefix || ""}h` : String(sourceFrame.subjectPrefix || "");
      const targetSurface = sourceFrame.supported === true ? `${targetSubjectSurface}${sourceFrame.sourceSurface || ""}${sourceFrame.numberConnectorSurface || ""}` : "";
      const soundSpellingFrames = targetSubjectSurface !== String(sourceFrame.subjectPrefix || "") ? Object.freeze([Object.freeze({
        ruleId: "n-open-transition-nh",
        source: "n",
        sourceSurface: "n",
        target: "nh",
        grammarSlot: "pers1",
        segmentRole: "pers1",
        sourceSegmentValue: sourceFrame.subjectPrefix || "",
        targetSegmentValue: targetSubjectSurface
      })]) : Object.freeze([]);
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-animate-count-plural-target-frame",
        surface: targetSurface,
        soundSpellingFrames,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-person-prefix",
          slot: "pers1-pers2",
          formulaValue: sourceFrame.subjectPrefix || "",
          surface: targetSubjectSurface,
          operationId: "ordinary-nnc-animate-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-authorized-singular-source",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || sourceFrame.sourceSurface || "",
          surface: sourceFrame.sourceSurface || "",
          operationId: "ordinary-nnc-animate-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-number-connector",
          slot: "num1-num2",
          formulaValue: sourceFrame.subjectSuffix || sourceFrame.numberConnectorSurface || "",
          surface: sourceFrame.numberConnectorSurface || "",
          operationId: "ordinary-nnc-animate-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-animate-count-plural-realization",
        routeId: "ordinary-nnc-animate-count-plural-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-animate-count-plural-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAnimateCountPluralSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-count-plural-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-animate-count-plural-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAnimateCountPluralOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncAnimateSubjectPrefixSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        sourceSurface: sourceFrame.sourceSurface || "",
        subjectPrefix: sourceFrame.subjectPrefix || "",
        subjectSuffix: sourceFrame.subjectSuffix || "",
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || ""
      });
    }
    function buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
      sourceStem = "",
      sourceSurface = "",
      sourceSurfaceRole = "ordinary-nnc-authorized-singular-source-form",
      priorSourceFrame = null,
      priorOperationFrame = null,
      subject = null,
      state = ORDINARY_NNC_STATE.absolutive,
      animacy = "animate"
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const normalizedSourceSurface = String(sourceSurface || normalizedSourceStem || "").trim();
      const resolvedSubject = resolveOrdinaryNncClauseSubject(subject, "singular", "animate");
      const subjectPrefix = String(resolvedSubject?.subjectPrefix || "");
      const subjectSuffix = String(resolvedSubject?.subjectSuffix || "");
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const diagnostics = [];
      if (!normalizedSourceSurface) {
        diagnostics.push("ordinary-nnc-animate-subject-prefix-missing-source-surface");
      }
      if (normalizedAnimacy !== "animate") {
        diagnostics.push("ordinary-nnc-animate-subject-prefix-requires-animate-source");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-animate-subject-prefix-source-frame",
        routeId: "ordinary-nnc-animate-subject-prefix-realization",
        sourceStem: normalizedSourceStem,
        sourceSurface: normalizedSourceSurface,
        sourceSurfaceRole: String(sourceSurfaceRole || "ordinary-nnc-authorized-singular-source-form"),
        sourceSurfaceIsGeneratedDisplay: false,
        priorSourceFrameKind: String(priorSourceFrame?.kind || ""),
        priorSourceSignature: String(priorSourceFrame?.sourceSignature || ""),
        priorOperationId: String(priorOperationFrame?.operationId || ""),
        priorOperationTargetSurface: String(priorOperationFrame?.targetFrame?.surface || ""),
        subjectPrefix,
        subjectSuffix,
        state: normalizedState,
        animacy: normalizedAnimacy,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAnimateSubjectPrefixSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAnimateSubjectPrefixOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-subject-prefix-source-frame") {
        return null;
      }
      const sourceSurface = String(sourceFrame.sourceSurface || "");
      const sourcePrefix = String(sourceFrame.subjectPrefix || "");
      const initial = sourceSurface.charAt(0);
      const targetSubjectSurface = (() => {
        if (sourceFrame.supported !== true) {
          return "";
        }
        if ((sourcePrefix === "ni" || sourcePrefix === "ti") && initial === "i") {
          return sourcePrefix.slice(0, -1);
        }
        if (sourcePrefix.endsWith("n") && /^[aeiou]/.test(sourceSurface)) {
          return `${sourcePrefix}h`;
        }
        return sourcePrefix;
      })();
      const targetSurface = sourceFrame.supported === true ? `${targetSubjectSurface}${sourceSurface}` : "";
      const soundSpellingFrames = (() => {
        if (targetSubjectSurface === sourcePrefix) {
          return Object.freeze([]);
        }
        if ((sourcePrefix === "ni" || sourcePrefix === "ti") && initial === "i") {
          return Object.freeze([Object.freeze({
            ruleId: "subject-i-stem-i-reduction",
            source: "i",
            sourceSurface: "i",
            target: "",
            grammarSlot: "pers1",
            segmentRole: "pers1",
            sourceSegmentValue: sourcePrefix,
            targetSegmentValue: targetSubjectSurface
          })]);
        }
        return Object.freeze([Object.freeze({
          ruleId: "n-open-transition-nh",
          source: "n",
          sourceSurface: "n",
          target: "nh",
          grammarSlot: "pers1",
          segmentRole: "pers1",
          sourceSegmentValue: sourcePrefix,
          targetSegmentValue: targetSubjectSurface
        })]);
      })();
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-animate-subject-prefix-target-frame",
        surface: targetSurface,
        soundSpellingFrames,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-person-prefix",
          slot: "pers1-pers2",
          formulaValue: sourcePrefix,
          surface: targetSubjectSurface,
          operationId: "ordinary-nnc-animate-subject-prefix-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-authorized-singular-source",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || sourceSurface,
          surface: sourceSurface,
          operationId: "ordinary-nnc-animate-subject-prefix-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-animate-subject-prefix-realization",
        routeId: "ordinary-nnc-animate-subject-prefix-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-animate-subject-prefix-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-subject-prefix-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-animate-subject-prefix-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAnimateSubjectPrefixOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function applyOrdinaryNncSubjectPrefix(surface = "", subject = null, state = ORDINARY_NNC_STATE.absolutive, animacy = "") {
      return applyOrdinaryNncSubjectPrefixResult(surface, subject, state, animacy).surface;
    }
    function applyOrdinaryNncSubjectPrefixResult(surface = "", subject = null, state = ORDINARY_NNC_STATE.absolutive, animacy = "", options = {}) {
      void options;
      if (animacy !== "animate") {
        return {
          surface,
          soundSpellingFrames: []
        };
      }
      return {
        surface: "",
        soundSpellingFrames: []
      };
    }
    function stripOrdinaryNncPossessiveSurfacePrefix(surface = "", possessor = null) {
      const normalizedSurface = String(surface || "").trim();
      const prefix = String(possessor?.prefix || "").trim();
      if (!normalizedSurface || !prefix) {
        return normalizedSurface;
      }
      const candidates = prefix === "in" ? ["inh", "in"] : [prefix];
      const matched = candidates.sort((a, b) => b.length - a.length).find(candidate => normalizedSurface.startsWith(candidate) && normalizedSurface.length > candidate.length);
      return matched ? normalizedSurface.slice(matched.length) : normalizedSurface;
    }
    function buildOrdinaryNncPossessiveDistributiveSurface(surface = "", possessor = null) {
      void surface;
      void possessor;
      return "";
    }
    function buildOrdinaryNncPossessiveDistributiveSurfaceResult(surface = "", possessor = null) {
      void surface;
      void possessor;
      return {
        surface: "",
        soundSpellingFrames: []
      };
    }
    function getOrdinaryNncNonanimatePossessiveDistributiveSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        formulaStem: sourceFrame.formulaStem || "",
        sourceStemEvidence: sourceFrame.sourceStemEvidence || "",
        possessorPrefix: sourceFrame.possessorPrefix || "",
        possessorNumber: sourceFrame.possessorNumber || "",
        syllableFrames: sourceFrame.syllableFrames || [],
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || ""
      });
    }
    function buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame({
      sourceStem = "",
      formulaStem = "",
      sourceStemEvidence = "",
      possessor = null,
      state = ORDINARY_NNC_STATE.possessive,
      animacy = "inanimate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.distributive
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
      const possessorPrefix = String(resolvedPossessor?.prefix || "").trim();
      const possessorNumber = String(resolvedPossessor?.number || "").trim();
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
      const syllables = normalizedSourceStem && typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalizedSourceStem) : [];
      const syllableFrames = (Array.isArray(syllables) ? syllables : []).map((syllable, index) => ({
        kind: "ordinary-nnc-nonanimate-possessive-distributive-source-syllable-frame",
        index,
        onset: String(syllable?.onset || ""),
        nucleus: String(syllable?.nucleus || ""),
        coda: String(syllable?.coda || "")
      })).filter(syllable => syllable.nucleus);
      const first = syllableFrames[0] || null;
      const reduplicant = first ? `${first.onset}${first.nucleus}j` : "";
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-missing-source-stem");
      }
      if (!possessorPrefix || resolvedPossessor?.unsupported) {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-missing-possessor-frame");
      }
      if (!reduplicant) {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-missing-source-syllable-frame");
      }
      if (normalizedState !== ORDINARY_NNC_STATE.possessive) {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-possessive-state-required");
      }
      if (normalizedAnimacy !== "inanimate") {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-nonanimate-reference-required");
      }
      if (normalizedPluralType !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        diagnostics.push("ordinary-nnc-nonanimate-possessive-distributive-plural-type-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-nonanimate-possessive-distributive-source-frame",
        routeId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
        sourceStem: normalizedSourceStem,
        formulaStem: String(formulaStem || sourceStem || "").trim(),
        sourceStemRole: "ordinary-nnc-possessive-predicate-stem",
        sourceStemEvidence: String(sourceStemEvidence || "ordinary-nnc-formula-stem").trim(),
        sourceStemIsGeneratedDisplay: false,
        possessorPrefix,
        possessorNumber,
        state: normalizedState,
        animacy: normalizedAnimacy,
        pluralType: normalizedPluralType,
        syllableFrames: Object.freeze(syllableFrames.map(Object.freeze)),
        reduplicant,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncNonanimatePossessiveDistributiveSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-nonanimate-possessive-distributive-source-frame") {
        return null;
      }
      const targetStemSurface = sourceFrame.supported === true ? `${sourceFrame.reduplicant || ""}${sourceFrame.sourceStem || ""}` : "";
      const targetPossessorSurface = sourceFrame.supported === true && String(sourceFrame.possessorPrefix || "") === "in" && /^[aeiou]/.test(targetStemSurface) ? "inh" : String(sourceFrame.possessorPrefix || "");
      const targetSurface = sourceFrame.supported === true ? `${targetPossessorSurface}${targetStemSurface}` : "";
      const soundSpellingFrames = sourceFrame.possessorPrefix === "in" && targetPossessorSurface === "inh" ? Object.freeze([Object.freeze({
        ruleId: "n-open-transition-nh",
        source: "n",
        sourceSurface: "n",
        target: "nh",
        grammarSlot: "poseedor",
        segmentRole: "poseedor",
        sourceSegmentValue: "in",
        targetSegmentValue: "inh"
      })]) : Object.freeze([]);
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-nonanimate-possessive-distributive-target-frame",
        surface: targetSurface,
        soundSpellingFrames,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessor-prefix",
          slot: "st1-st2",
          formulaValue: sourceFrame.possessorPrefix || "",
          surface: targetPossessorSurface,
          operationId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-possessive-distributive-reduplicated",
          slot: "STEM",
          formulaValue: sourceFrame.formulaStem || sourceFrame.sourceStem || "",
          surface: targetStemSurface,
          operationId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
        routeId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-nonanimate-possessive-distributive-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-nonanimate-possessive-distributive-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-nonanimate-possessive-distributive-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncPossessiveDistributiveSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        possessorPrefix: sourceFrame.possessorPrefix || "",
        possessorNumber: sourceFrame.possessorNumber || "",
        pluralPossessorSuffix: sourceFrame.pluralPossessorSuffix || "",
        syllableFrames: sourceFrame.syllableFrames || [],
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || ""
      });
    }
    function buildOrdinaryNncPossessiveDistributiveSourceFrame({
      sourceStem = "",
      possessor = null,
      state = ORDINARY_NNC_STATE.possessive,
      animacy = "animate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.distributive
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
      const possessorPrefix = String(resolvedPossessor?.prefix || "").trim();
      const possessorNumber = String(resolvedPossessor?.number || "").trim();
      const pluralPossessorSuffix = isOrdinaryNncPluralPossessor(resolvedPossessor) ? "wan" : "";
      const syllables = normalizedSourceStem && typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalizedSourceStem) : [];
      const syllableFrames = (Array.isArray(syllables) ? syllables : []).map((syllable, index) => ({
        kind: "ordinary-nnc-possessive-distributive-source-syllable-frame",
        index,
        onset: String(syllable?.onset || ""),
        nucleus: String(syllable?.nucleus || ""),
        coda: String(syllable?.coda || "")
      })).filter(syllable => syllable.nucleus);
      const first = syllableFrames[0] || null;
      const reduplicant = first ? `${first.onset}${first.nucleus}j` : "";
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-possessive-distributive-missing-source-stem");
      }
      if (!possessorPrefix || resolvedPossessor?.unsupported) {
        diagnostics.push("ordinary-nnc-possessive-distributive-missing-possessor-frame");
      }
      if (!pluralPossessorSuffix || possessorPrefix === "in") {
        diagnostics.push("ordinary-nnc-possessive-distributive-plural-possessor-required");
      }
      if (!reduplicant) {
        diagnostics.push("ordinary-nnc-possessive-distributive-missing-source-syllable-frame");
      }
      if (normalizeOrdinaryNncState(state) !== ORDINARY_NNC_STATE.possessive) {
        diagnostics.push("ordinary-nnc-possessive-distributive-possessive-state-required");
      }
      if (normalizeOrdinaryNncAnimacy(animacy) !== "animate") {
        diagnostics.push("ordinary-nnc-possessive-distributive-animate-reference-required");
      }
      if (normalizeOrdinaryNncPluralType(pluralType) !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        diagnostics.push("ordinary-nnc-possessive-distributive-plural-type-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-possessive-distributive-source-frame",
        routeId: "ordinary-nnc-possessive-distributive-realization",
        sourceStem: normalizedSourceStem,
        sourceStemRole: "ordinary-nnc-structural-predicate-stem",
        sourceStemIsGeneratedDisplay: false,
        possessorPrefix,
        possessorNumber,
        pluralPossessorSuffix,
        state: normalizeOrdinaryNncState(state),
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        pluralType: normalizeOrdinaryNncPluralType(pluralType),
        syllableFrames: Object.freeze(syllableFrames.map(Object.freeze)),
        reduplicant,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncPossessiveDistributiveSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncPossessiveDistributiveOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-possessive-distributive-source-frame") {
        return null;
      }
      const targetStemSurface = sourceFrame.supported === true ? `${sourceFrame.reduplicant || ""}${sourceFrame.sourceStem || ""}` : "";
      const targetSurface = sourceFrame.supported === true ? `${sourceFrame.possessorPrefix || ""}${targetStemSurface}${sourceFrame.pluralPossessorSuffix || ""}` : "";
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-possessive-distributive-target-frame",
        surface: targetSurface,
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessor-prefix",
          slot: "st1-st2",
          formulaValue: sourceFrame.possessorPrefix || "",
          surface: sourceFrame.possessorPrefix || "",
          operationId: "ordinary-nnc-possessive-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "predicate-possessive-distributive-reduplicated",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || "",
          surface: targetStemSurface,
          operationId: "ordinary-nnc-possessive-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessive-plural-suffix",
          slot: "st1-st2-number",
          formulaValue: sourceFrame.pluralPossessorSuffix || "",
          surface: sourceFrame.pluralPossessorSuffix || "",
          operationId: "ordinary-nnc-possessive-distributive-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-possessive-distributive-realization",
        routeId: "ordinary-nnc-possessive-distributive-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-possessive-distributive-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-possessive-distributive-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-possessive-distributive-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncPossessiveDistributiveOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncAnimatePossessiveCountPluralSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        possessorPrefix: sourceFrame.possessorPrefix || "",
        possessorNumber: sourceFrame.possessorNumber || "",
        subjectPrefix: sourceFrame.subjectPrefix || "",
        subjectSuffix: sourceFrame.subjectSuffix || "",
        pluralPossessorSuffix: sourceFrame.pluralPossessorSuffix || "",
        requiresReduplicatedStem: sourceFrame.requiresReduplicatedStem === true,
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || ""
      });
    }
    function buildOrdinaryNncAnimatePossessiveCountPluralSourceFrame({
      sourceStem = "",
      possessor = null,
      subject = null,
      state = ORDINARY_NNC_STATE.possessive,
      animacy = "animate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.count
    } = {}) {
      const normalizedSourceStem = String(sourceStem || "").trim();
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
      const possessorPrefix = String(resolvedPossessor?.prefix || "").trim();
      const possessorNumber = String(resolvedPossessor?.number || "").trim();
      const resolvedSubject = resolveOrdinaryNncClauseSubject(subject, "plural", "animate");
      const subjectPrefix = String(resolvedSubject?.subjectPrefix || "");
      const subjectSuffix = String(resolvedSubject?.subjectSuffix || "");
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const effectivePluralType = getEffectiveOrdinaryNncPluralType(pluralType, normalizedAnimacy);
      const pluralPossessorSuffix = normalizedAnimacy === "animate" && isOrdinaryNncPluralPossessor(resolvedPossessor) ? "wan" : "";
      const requiresReduplicatedStem = normalizedAnimacy === "animate" && possessorPrefix === "in";
      const syllables = requiresReduplicatedStem && normalizedSourceStem && typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalizedSourceStem) : [];
      const syllableFrames = (Array.isArray(syllables) ? syllables : []).map((syllable, index) => ({
        kind: "ordinary-nnc-animate-possessive-count-plural-source-syllable-frame",
        index,
        onset: String(syllable?.onset || ""),
        nucleus: String(syllable?.nucleus || ""),
        coda: String(syllable?.coda || "")
      })).filter(syllable => syllable.nucleus);
      const first = syllableFrames[0] || null;
      const reduplicant = first ? `${first.onset}${first.nucleus}j` : "";
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-missing-source-stem");
      }
      if (!possessorPrefix || resolvedPossessor?.unsupported) {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-missing-possessor-frame");
      }
      if (requiresReduplicatedStem && !reduplicant) {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-missing-source-syllable-frame");
      }
      if (normalizedState !== ORDINARY_NNC_STATE.possessive) {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-possessive-state-required");
      }
      if (normalizedAnimacy !== "animate") {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-animate-reference-required");
      }
      if (effectivePluralType !== ORDINARY_NNC_PLURAL_TYPE.count) {
        diagnostics.push("ordinary-nnc-animate-possessive-count-plural-count-type-required");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-animate-possessive-count-plural-source-frame",
        routeId: "ordinary-nnc-animate-possessive-count-plural-realization",
        sourceStem: normalizedSourceStem,
        sourceStemRole: "ordinary-nnc-structural-predicate-stem",
        sourceStemIsGeneratedDisplay: false,
        possessorPrefix,
        possessorNumber,
        subjectPrefix,
        subjectSuffix,
        pluralPossessorSuffix,
        requiresReduplicatedStem,
        syllableFrames: Object.freeze(syllableFrames.map(Object.freeze)),
        reduplicant,
        state: normalizedState,
        animacy: normalizedAnimacy,
        pluralType: effectivePluralType,
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAnimatePossessiveCountPluralSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-possessive-count-plural-source-frame") {
        return null;
      }
      const targetStemSurface = sourceFrame.supported === true ? `${sourceFrame.requiresReduplicatedStem ? sourceFrame.reduplicant || "" : ""}${sourceFrame.sourceStem || ""}` : "";
      const targetPossessorSurface = sourceFrame.supported === true && String(sourceFrame.possessorPrefix || "") === "in" && /^[aeiou]/.test(targetStemSurface) ? "inh" : String(sourceFrame.possessorPrefix || "");
      const possessiveBaseSurface = sourceFrame.supported === true ? `${targetPossessorSurface}${targetStemSurface}${sourceFrame.pluralPossessorSuffix || ""}` : "";
      const sourceSubjectPrefix = String(sourceFrame.subjectPrefix || "");
      const targetSubjectSurface = (() => {
        if (sourceFrame.supported !== true) {
          return "";
        }
        if ((sourceSubjectPrefix === "ni" || sourceSubjectPrefix === "ti") && possessiveBaseSurface.charAt(0) === "i") {
          return sourceSubjectPrefix.slice(0, -1);
        }
        if (sourceSubjectPrefix.endsWith("n") && /^[aeiou]/.test(possessiveBaseSurface)) {
          return `${sourceSubjectPrefix}h`;
        }
        return sourceSubjectPrefix;
      })();
      const subjectSoundSpellingFrames = (() => {
        if (!sourceSubjectPrefix || targetSubjectSurface === sourceSubjectPrefix) {
          return [];
        }
        if ((sourceSubjectPrefix === "ni" || sourceSubjectPrefix === "ti") && possessiveBaseSurface.charAt(0) === "i") {
          return [{
            ruleId: "subject-i-stem-i-reduction",
            source: "i",
            sourceSurface: "i",
            target: "",
            grammarSlot: "pers1",
            segmentRole: "pers1",
            sourceSegmentValue: sourceSubjectPrefix,
            targetSegmentValue: targetSubjectSurface
          }];
        }
        return [{
          ruleId: "n-open-transition-nh",
          source: "n",
          sourceSurface: "n",
          target: "nh",
          grammarSlot: "pers1",
          segmentRole: "pers1",
          sourceSegmentValue: sourceSubjectPrefix,
          targetSegmentValue: targetSubjectSurface
        }];
      })();
      const possessorSoundSpellingFrames = sourceFrame.possessorPrefix === "in" && targetPossessorSurface === "inh" ? [{
        ruleId: "n-open-transition-nh",
        source: "n",
        sourceSurface: "n",
        target: "nh",
        grammarSlot: "poseedor",
        segmentRole: "poseedor",
        sourceSegmentValue: "in",
        targetSegmentValue: "inh"
      }] : [];
      const targetSurface = sourceFrame.supported === true ? `${targetSubjectSurface}${possessiveBaseSurface}` : "";
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-animate-possessive-count-plural-target-frame",
        surface: targetSurface,
        soundSpellingFrames: Object.freeze([...subjectSoundSpellingFrames, ...possessorSoundSpellingFrames].map(Object.freeze)),
        segmentFrames: Object.freeze([Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "subject-person-prefix",
          slot: "pers1-pers2",
          formulaValue: sourceSubjectPrefix,
          surface: targetSubjectSurface,
          operationId: "ordinary-nnc-animate-possessive-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessor-prefix",
          slot: "st1-st2",
          formulaValue: sourceFrame.possessorPrefix || "",
          surface: targetPossessorSurface,
          operationId: "ordinary-nnc-animate-possessive-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: sourceFrame.requiresReduplicatedStem ? "predicate-possessive-reduplicated" : "predicate",
          slot: "STEM",
          formulaValue: sourceFrame.sourceStem || "",
          surface: targetStemSurface,
          operationId: "ordinary-nnc-animate-possessive-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        }), Object.freeze({
          kind: "ordinary-nnc-result-text-segment-frame",
          role: "possessive-plural-suffix",
          slot: "st1-st2-number",
          formulaValue: sourceFrame.pluralPossessorSuffix || "",
          surface: sourceFrame.pluralPossessorSuffix || "",
          operationId: "ordinary-nnc-animate-possessive-count-plural-realization",
          sourceFrameKind: sourceFrame.kind,
          sourceSignature: sourceFrame.sourceSignature || ""
        })].filter(segment => segment.surface))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-animate-possessive-count-plural-realization",
        routeId: "ordinary-nnc-animate-possessive-count-plural-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-animate-possessive-count-plural-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-possessive-count-plural-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-animate-possessive-count-plural-realization" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function getOrdinaryNncAnimatePossessivePluralIdentitySourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceStem: sourceFrame.sourceStem || "",
        possessorPrefix: sourceFrame.possessorPrefix || "",
        possessorNumber: sourceFrame.possessorNumber || "",
        state: sourceFrame.state || "",
        animacy: sourceFrame.animacy || "",
        pluralType: sourceFrame.pluralType || "",
        priorSourceFrameKind: sourceFrame.priorSourceFrameKind || "",
        priorSourceSignature: sourceFrame.priorSourceSignature || "",
        priorOperationId: sourceFrame.priorOperationId || "",
        priorOperationSourceSignature: sourceFrame.priorOperationSourceSignature || "",
        priorOperationTargetFrameKind: sourceFrame.priorOperationTargetFrameKind || "",
        priorOperationTargetSurface: sourceFrame.priorOperationTargetSurface || ""
      });
    }
    function buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame({
      sourceStem = "",
      possessor = null,
      state = ORDINARY_NNC_STATE.possessive,
      animacy = "animate",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.distributive,
      priorSourceFrame = null,
      priorOperationFrame = null
    } = {}) {
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
      const possessorPrefix = String(resolvedPossessor?.prefix || "").trim();
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
      const normalizedSourceStem = String(sourceStem || priorSourceFrame?.sourceStem || "").trim();
      const priorTargetSurface = String(priorOperationFrame?.targetFrame?.surface || "").trim();
      const priorSurface = buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
        sourceFrame: priorSourceFrame,
        operationFrame: priorOperationFrame
      });
      const diagnostics = [];
      if (!normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-missing-source-stem");
      }
      if (!possessorPrefix || resolvedPossessor?.unsupported) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-missing-possessor-frame");
      }
      if (isOrdinaryNncPluralPossessor(resolvedPossessor) || possessorPrefix === "in") {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-requires-singular-possessor");
      }
      if (normalizedState !== ORDINARY_NNC_STATE.possessive) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-state-required");
      }
      if (normalizedAnimacy !== "animate") {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-animate-required");
      }
      if (normalizedPluralType !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-distributive-required");
      }
      if (!priorSourceFrame || priorSourceFrame.kind !== "ordinary-nnc-open-stem-possessive-source-frame") {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-missing-prior-possessive-source-frame");
      }
      if (!priorOperationFrame || priorOperationFrame.kind !== "andrews-typed-operation-frame" || priorOperationFrame.operationId !== "ordinary-nnc-open-stem-possessive-realization") {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-missing-prior-possessive-operation-frame");
      }
      if (priorSourceFrame && priorOperationFrame && (!priorSurface || !priorTargetSurface || priorSurface !== priorTargetSurface)) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-contradictory-prior-possessive-frame");
      }
      if (priorSourceFrame && normalizedSourceStem && String(priorSourceFrame.sourceStem || "") !== normalizedSourceStem) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-source-stem-contradicts-prior-frame");
      }
      if (priorSourceFrame && possessorPrefix && String(priorSourceFrame.possessorPrefix || "") !== possessorPrefix) {
        diagnostics.push("ordinary-nnc-animate-possessive-plural-identity-possessor-contradicts-prior-frame");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-animate-possessive-plural-identity-source-frame",
        routeId: "ordinary-nnc-animate-possessive-plural-identity",
        sourceStem: normalizedSourceStem,
        sourceStemRole: "ordinary-nnc-structural-predicate-stem",
        sourceStemIsGeneratedDisplay: false,
        possessorPrefix,
        possessorNumber: String(resolvedPossessor?.number || ""),
        state: normalizedState,
        animacy: normalizedAnimacy,
        pluralType: normalizedPluralType,
        priorSourceFrameKind: priorSourceFrame?.kind || "",
        priorSourceSignature: priorSourceFrame?.sourceSignature || "",
        priorOperationId: priorOperationFrame?.operationId || "",
        priorOperationSourceSignature: priorOperationFrame?.sourceSignature || "",
        priorOperationTargetFrameKind: priorOperationFrame?.targetFrame?.kind || "",
        priorOperationTargetSurface: priorTargetSurface,
        priorTargetSegmentFrames: Object.freeze((Array.isArray(priorOperationFrame?.targetFrame?.segmentFrames) ? priorOperationFrame.targetFrame.segmentFrames : []).map(Object.freeze)),
        supported: diagnostics.length === 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncAnimatePossessivePluralIdentitySourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-possessive-plural-identity-source-frame") {
        return null;
      }
      const targetSurface = sourceFrame.supported === true ? String(sourceFrame.priorOperationTargetSurface || "") : "";
      const priorSegmentFrames = Array.isArray(sourceFrame.priorTargetSegmentFrames) ? sourceFrame.priorTargetSegmentFrames : [];
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-animate-possessive-plural-identity-target-frame",
        surface: targetSurface,
        segmentFrames: Object.freeze(priorSegmentFrames.map(Object.freeze))
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-animate-possessive-plural-identity",
        routeId: "ordinary-nnc-animate-possessive-plural-identity",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && Boolean(targetSurface),
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-animate-possessive-plural-identity-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-animate-possessive-plural-identity-source-frame" || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-animate-possessive-plural-identity" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "";
      }
      const rebuiltOperationFrame = buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "";
      }
      return String(operationFrame.targetFrame.surface || "");
    }
    function buildOrdinaryNncAnimatePossessivePluralForms(singularForms = [], {
      possessor = null,
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto
    } = {}) {
      void singularForms;
      void possessor;
      void pluralType;
      return [];
    }
    function buildOrdinaryNncDerivedPluralForms(singularForms = [], {
      state = ORDINARY_NNC_STATE.absolutive,
      subject = null,
      possessor = null,
      animacy = "",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
      nounClass = "",
      sourceStem = "",
      sourcePossessiveStem = ""
    } = {}) {
      const effectivePluralType = getEffectiveOrdinaryNncPluralType(pluralType, animacy);
      const normalizedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
      const normalizedSourceStem = String(sourceStem || "").trim();
      const normalizedSourcePossessiveStem = String(sourcePossessiveStem || "").trim();
      if (state === ORDINARY_NNC_STATE.possessive && animacy === "animate") {
        const resolvedPossessor = resolveOrdinaryNncPossessor(possessor);
        const useTypedPossessiveDistributive = effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive && isOrdinaryNncPluralPossessor(resolvedPossessor) && String(resolvedPossessor?.prefix || "") !== "in" && String(sourceStem || "").trim();
        const pluralEntries = useTypedPossessiveDistributive ? (() => {
          const sourceFrame = buildOrdinaryNncPossessiveDistributiveSourceFrame({
            sourceStem,
            possessor: resolvedPossessor,
            state,
            animacy,
            pluralType: effectivePluralType
          });
          const operationFrame = buildOrdinaryNncPossessiveDistributiveOperationFrame(sourceFrame);
          const surface = buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame({
            sourceFrame,
            operationFrame
          });
          return [{
            surface,
            soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
            sourceFrame,
            operationFrame,
            segmentFrames: operationFrame?.targetFrame?.segmentFrames || [],
            subjectAlreadyApplied: false
          }];
        })() : (() => {
          if (effectivePluralType !== ORDINARY_NNC_PLURAL_TYPE.count && String(resolvedPossessor?.prefix || "") !== "in") {
            const priorSourceFrame = buildOrdinaryNncOpenStemPossessiveSourceFrame({
              sourceStem,
              possessor: resolvedPossessor,
              animacy
            });
            const priorOperationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame(priorSourceFrame);
            const sourceFrame = buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame({
              sourceStem,
              possessor: resolvedPossessor,
              state,
              animacy,
              pluralType: effectivePluralType,
              priorSourceFrame,
              priorOperationFrame
            });
            const operationFrame = buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame(sourceFrame);
            const surface = buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
              sourceFrame,
              operationFrame
            });
            return [{
              surface,
              soundSpellingFrames: priorOperationFrame?.targetFrame?.soundSpellingFrames || [],
              sourceFrame,
              operationFrame,
              segmentFrames: operationFrame?.targetFrame?.segmentFrames || [],
              subjectAlreadyApplied: false
            }];
          }
          const sourceFrame = buildOrdinaryNncAnimatePossessiveCountPluralSourceFrame({
            sourceStem,
            possessor: resolvedPossessor,
            subject,
            state,
            animacy,
            pluralType: ORDINARY_NNC_PLURAL_TYPE.count
          });
          const operationFrame = buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame(sourceFrame);
          const surface = buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame({
            sourceFrame,
            operationFrame
          });
          return [{
            surface,
            soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
            sourceFrame,
            operationFrame,
            segmentFrames: operationFrame?.targetFrame?.segmentFrames || [],
            subjectAlreadyApplied: true
          }];
        })();
        const pluralResults = pluralEntries.map(entry => {
          if (entry.subjectAlreadyApplied) {
            return {
              surface: entry.surface,
              soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry),
              sourceFrame: entry.sourceFrame || null,
              operationFrame: entry.operationFrame || null,
              segmentFrames: entry.segmentFrames || []
            };
          }
          if (isOrdinaryNncThirdSingularSubject(subject)) {
            return {
              surface: entry.surface,
              soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry),
              sourceFrame: entry.sourceFrame || null,
              operationFrame: entry.operationFrame || null,
              segmentFrames: entry.segmentFrames || []
            };
          }
          const priorTargetSurface = String(entry.operationFrame?.targetFrame?.surface || "");
          const subjectSourceFrame = entry.sourceFrame && entry.operationFrame?.supported === true && priorTargetSurface && priorTargetSurface === String(entry.surface || "") ? buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
            sourceStem,
            sourceSurface: priorTargetSurface,
            sourceSurfaceRole: "ordinary-nnc-prior-typed-derived-source-form",
            priorSourceFrame: entry.sourceFrame,
            priorOperationFrame: entry.operationFrame,
            subject,
            state,
            animacy
          }) : null;
          const subjectOperationFrame = buildOrdinaryNncAnimateSubjectPrefixOperationFrame(subjectSourceFrame);
          const surface = buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
            sourceFrame: subjectSourceFrame,
            operationFrame: subjectOperationFrame
          });
          return {
            surface,
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry, subjectOperationFrame?.targetFrame?.soundSpellingFrames || []),
            sourceFrame: subjectSourceFrame,
            operationFrame: subjectOperationFrame,
            segmentFrames: subjectOperationFrame?.targetFrame?.segmentFrames || []
          };
        });
        return {
          pluralType: effectivePluralType,
          forms: pluralResults.map(entry => entry.surface).filter(Boolean),
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...pluralResults),
          sourceFrame: pluralResults[0]?.sourceFrame || null,
          operationFrame: pluralResults[0]?.operationFrame || null,
          surfaceSegmentRecords: pluralResults.map((entry, index) => ({
            kind: "ordinary-nnc-derived-plural-surface-segment-record",
            index,
            surface: entry.surface || "",
            sourceFrame: entry.sourceFrame || null,
            operationFrame: entry.operationFrame || null,
            segmentFrames: entry.segmentFrames || []
          })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length)
        };
      }
      if (effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count) {
        if (animacy !== "animate") {
          return {
            forms: [],
            pluralType: effectivePluralType
          };
        }
        const sourceFrame = buildOrdinaryNncAnimateCountPluralSourceFrame({
          sourceStem,
          sourceSurface: singularForms.find(Boolean) || sourceStem,
          subject,
          state,
          animacy,
          pluralType: effectivePluralType
        });
        const operationFrame = buildOrdinaryNncAnimateCountPluralOperationFrame(sourceFrame);
        const surface = buildOrdinaryNncAnimateCountPluralSurfaceFromFrame({
          sourceFrame,
          operationFrame
        });
        const pluralResults = [{
          surface,
          soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
          sourceFrame,
          operationFrame,
          segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
        }];
        return {
          pluralType: effectivePluralType,
          forms: pluralResults.map(entry => entry.surface).filter(Boolean),
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...pluralResults),
          sourceFrame,
          operationFrame,
          surfaceSegmentRecords: pluralResults.map((entry, index) => ({
            kind: "ordinary-nnc-derived-plural-surface-segment-record",
            index,
            surface: entry.surface || "",
            sourceFrame: entry.sourceFrame || null,
            operationFrame: entry.operationFrame || null,
            segmentFrames: entry.segmentFrames || []
          })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length)
        };
      }
      if (state !== ORDINARY_NNC_STATE.absolutive && state !== ORDINARY_NNC_STATE.possessive) {
        return {
          forms: [],
          pluralType: effectivePluralType
        };
      }
      if (state === ORDINARY_NNC_STATE.absolutive && animacy === "animate" && String(sourceStem || "").trim()) {
        const sourceFrame = buildOrdinaryNncAnimateDistributiveSourceFrame({
          sourceStem,
          subject,
          state,
          animacy,
          pluralType: effectivePluralType
        });
        const operationFrame = buildOrdinaryNncAnimateDistributiveOperationFrame(sourceFrame);
        const surface = buildOrdinaryNncAnimateDistributiveSurfaceFromFrame({
          sourceFrame,
          operationFrame
        });
        const result = {
          surface,
          soundSpellingFrames: [],
          sourceFrame,
          operationFrame,
          segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
        };
        return {
          pluralType: effectivePluralType,
          forms: [result.surface].filter(Boolean),
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result),
          surfaceSegmentRecords: [{
            kind: "ordinary-nnc-derived-plural-surface-segment-record",
            index: 0,
            surface: result.surface || "",
            sourceFrame: result.sourceFrame || null,
            operationFrame: result.operationFrame || null,
            segmentFrames: result.segmentFrames || []
          }].filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length)
        };
      }
      const priorAbsolutiveSingularSourceFrame = state === ORDINARY_NNC_STATE.absolutive && normalizedSourceStem && normalizedNounClass ? buildOrdinaryNncAbsolutiveSingularSourceFrame({
        sourceStem: normalizedSourceStem,
        nounClass: normalizedNounClass,
        state: ORDINARY_NNC_STATE.absolutive,
        number: "singular",
        animacy
      }) : null;
      const priorAbsolutiveSingularOperationFrame = buildOrdinaryNncAbsolutiveSingularOperationFrame(priorAbsolutiveSingularSourceFrame);
      const priorAbsolutiveSingularSurface = buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
        sourceFrame: priorAbsolutiveSingularSourceFrame,
        operationFrame: priorAbsolutiveSingularOperationFrame
      });
      const distributiveSourceEntries = state === ORDINARY_NNC_STATE.absolutive ? priorAbsolutiveSingularSurface ? [{
        sourceSurface: priorAbsolutiveSingularSurface,
        priorSourceFrame: priorAbsolutiveSingularSourceFrame,
        priorOperationFrame: priorAbsolutiveSingularOperationFrame
      }] : [] : singularForms.map(form => ({
        sourceSurface: form
      }));
      const distributiveResults = distributiveSourceEntries.map(entry => {
        if (state === ORDINARY_NNC_STATE.possessive) {
          const typedPossessiveDistributiveStem = normalizedSourcePossessiveStem || (normalizedNounClass === "zero" ? normalizedSourceStem : "");
          if (animacy === "inanimate" && typedPossessiveDistributiveStem) {
            const sourceFrame = buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame({
              sourceStem: typedPossessiveDistributiveStem,
              formulaStem: normalizedSourceStem,
              sourceStemEvidence: normalizedSourcePossessiveStem ? "static-nnc-structured-possessive-stem" : "ordinary-nnc-formula-stem",
              possessor,
              state,
              animacy,
              pluralType: effectivePluralType
            });
            const operationFrame = buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame(sourceFrame);
            const surface = buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
              sourceFrame,
              operationFrame
            });
            return {
              surface,
              soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
              sourceFrame,
              operationFrame,
              segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
            };
          }
          return {
            surface: "",
            soundSpellingFrames: [],
            sourceFrame: null,
            operationFrame: null,
            segmentFrames: []
          };
        }
        const sourceFrame = buildOrdinaryNncDistributiveReduplicationSourceFrame({
          sourceSurface: entry.sourceSurface,
          sourceSurfaceRole: "ordinary-nnc-prior-typed-absolutive-singular-source-form",
          priorSourceFrame: entry.priorSourceFrame || null,
          priorOperationFrame: entry.priorOperationFrame || null,
          state,
          animacy,
          pluralType: effectivePluralType
        });
        const operationFrame = buildOrdinaryNncDistributiveReduplicationOperationFrame(sourceFrame);
        const surface = buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
          sourceFrame,
          operationFrame
        });
        return {
          surface,
          soundSpellingFrames: [],
          sourceFrame,
          operationFrame,
          segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
        };
      }).map(entry => ({
        ...entry,
        surface: animacy === "animate" ? `${entry.surface}met` : entry.surface
      })).map(entry => {
        if (animacy !== "animate" || isOrdinaryNncThirdSingularSubject(subject)) {
          return {
            surface: entry.surface,
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry),
            sourceFrame: entry.sourceFrame || null,
            operationFrame: entry.operationFrame || null,
            segmentFrames: entry.segmentFrames || []
          };
        }
        return {
          surface: "",
          soundSpellingFrames: [],
          sourceFrame: null,
          operationFrame: null,
          segmentFrames: []
        };
      });
      return {
        pluralType: effectivePluralType,
        forms: distributiveResults.map(entry => entry.surface).filter(Boolean),
        soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...distributiveResults),
        sourceFrame: distributiveResults[0]?.sourceFrame || null,
        operationFrame: distributiveResults[0]?.operationFrame || null,
        surfaceSegmentRecords: distributiveResults.map((entry, index) => ({
          kind: "ordinary-nnc-derived-plural-surface-segment-record",
          index,
          surface: entry.surface || "",
          sourceFrame: entry.sourceFrame || null,
          operationFrame: entry.operationFrame || null,
          segmentFrames: entry.segmentFrames || []
        })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length)
      };
    }
    function normalizeOrdinaryNncNum1Num2Class(nounClass = "") {
      const normalized = normalizeOrdinaryNncText(nounClass);
      if (normalized === "0" || normalized === "ø" || normalized === "zero") {
        return "zero";
      }
      return ["t", "ti", "in"].includes(normalized) ? normalized : "";
    }
    function formatOrdinaryNncNum1Num2Class(nounClass = "") {
      const normalized = normalizeOrdinaryNncNum1Num2Class(nounClass);
      return normalized === "zero" ? "Ø" : normalized;
    }
    function getOrdinaryNncNum1Num2Surface(nounClass = "") {
      const normalized = normalizeOrdinaryNncNum1Num2Class(nounClass);
      if (normalized === "zero") {
        return "";
      }
      return ["t", "ti", "in"].includes(normalized) ? normalized : "";
    }
    function formatOrdinaryNncFormulaDyadSegment(value = "") {
      const normalized = String(value || "").trim();
      return normalized || "Ø";
    }
    function buildOrdinaryNncNum1Num2Dyad({
      nounClass = "",
      number = "singular",
      pluralType = ""
    } = {}) {
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
      const normalizedClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
      if (normalizedNumber === "plural" && normalizedPluralType === ORDINARY_NNC_PLURAL_TYPE.count) {
        return {
          num1: "m",
          num2: "et",
          displayNum1: "m",
          displayNum2: "et",
          displayDyad: "m-et",
          compactDisplay: "met",
          compactSurface: "met",
          source: "animate-count-plural-evidence-classical-m-eh-to-nawat-m-et"
        };
      }
      const num1 = normalizedClass === "zero" ? "" : getOrdinaryNncNum1Num2Surface(normalizedClass);
      const num2 = "";
      return {
        num1,
        num2,
        displayNum1: formatOrdinaryNncFormulaDyadSegment(num1),
        displayNum2: formatOrdinaryNncFormulaDyadSegment(num2),
        displayDyad: `${formatOrdinaryNncFormulaDyadSegment(num1)}-${formatOrdinaryNncFormulaDyadSegment(num2)}`,
        compactDisplay: num1 || "Ø",
        compactSurface: num1,
        source: normalizedNumber === "plural" ? "plural-stem-route-keeps-zero-subject-number-dyad" : "singular-common-class-connector"
      };
    }
    function parseOrdinaryNncPredicateFormulaInput(value = "", {
      diagnosticOnly = false
    } = {}) {
      const raw = String(value || "").trim().toLowerCase();
      const match = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
      if (!match) {
        return null;
      }
      if (diagnosticOnly !== true) {
        return {
          status: "blocked",
          diagnosticId: "ordinary-nnc-predicate-formula-string-diagnostic-only",
          authorization: "blocked",
          boundaries: {
            noStemInference: true,
            noNounClassInference: true,
            noGenerationAuthority: true
          }
        };
      }
      const stem = normalizeOrdinaryNncText(match[1]).replace(/[()]/g, "");
      if (!stem) {
        return null;
      }
      const nounClass = normalizeOrdinaryNncNum1Num2Class(match[2] || "zero") || "zero";
      return {
        stem,
        nounClass,
        connectorSurface: getOrdinaryNncNum1Num2Surface(nounClass),
        predicateFormula: buildOrdinaryNncPredicateFormula({
          stem,
          nounClass
        })
      };
    }
    function isOrdinaryNncLegacyFormulaString(value = "") {
      const raw = String(value || "").trim();
      const predicateMatch = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
      return Boolean(raw && (predicateMatch || /^#.*#$/u.test(raw)));
    }
    function getOrdinaryNncRequestFormulaSlots({
      formulaSlots = null,
      clauseFrame = null,
      nuclearClauseFrame = null,
      routeContract = null
    } = {}) {
      const candidates = [formulaSlots, clauseFrame?.formulaSlots, nuclearClauseFrame?.formulaSlots, routeContract?.formulaSlots, routeContract?.clauseFrame?.formulaSlots, routeContract?.nuclearClauseFrame?.formulaSlots, routeContract?.morphBoundaryFrame?.formulaSlots];
      return candidates.find(candidate => candidate && typeof candidate === "object") || null;
    }
    function getOrdinaryNncRequestFormulaSlotStem(formulaSlots = null) {
      const predicate = formulaSlots?.predicateStem || formulaSlots?.STEM || formulaSlots?.["predicate.stem"] || null;
      return normalizeOrdinaryNncText(predicate?.stem || predicate?.displayStem || predicate?.formulaDisplayStem || predicate?.surface || "").replace(/[()#]/g, "");
    }
    function getOrdinaryNncRequestFormulaSlotNounClass(formulaSlots = null) {
      const connector = formulaSlots?.num1Num2 || formulaSlots?.["num1-num2"] || formulaSlots?.["subject.num1-num2"] || null;
      return normalizeOrdinaryNncNum1Num2Class(connector?.nounClass || connector?.nounStemClass || connector?.compactSurface || connector?.surface || connector?.connector || connector?.compactDisplay || "");
    }
    function stripOrdinaryNncNum1Num2FromInput(stem = "", nounClass = "") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      const connector = getOrdinaryNncNum1Num2Surface(nounClass);
      if (!normalizedStem || !connector || normalizedStem.length <= connector.length) {
        return normalizedStem;
      }
      return normalizedStem.endsWith(connector) ? normalizedStem.slice(0, -connector.length) : normalizedStem;
    }
    function buildOrdinaryNncPredicateFormula({
      stem = "",
      nounClass = ""
    } = {}) {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      if (!normalizedStem) {
        return "";
      }
      const connector = getOrdinaryNncNum1Num2Surface(nounClass);
      return `(${normalizedStem})${connector}`;
    }
    function buildOrdinaryNncNum1Num2({
      nounClass = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = ""
    } = {}) {
      const connectorClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
      const dyad = buildOrdinaryNncNum1Num2Dyad({
        nounClass: connectorClass,
        number,
        pluralType
      });
      const surface = dyad.compactSurface;
      const schema = getOrdinaryNncFormulaSchema();
      const slotDefinition = getOrdinaryNncFormulaSlotDefinition("num1-num2") || {};
      const blockedInterpretations = Array.isArray(slotDefinition.blockedInterpretations) ? Array.from(slotDefinition.blockedInterpretations) : ["tense", "stem-suffix", "nounstem", "predicate-state"];
      return {
        role: "subject-number-connector",
        formulaSchemaId: schema?.id || "ordinary-nnc-shell",
        formulaSlot: slotDefinition.id || "num1-num2",
        slot: slotDefinition.path || "subject.num1-num2",
        belongsTo: slotDefinition.owner || "subject",
        nounStemClass: connectorClass,
        classLabel: formatOrdinaryNncNum1Num2Class(connectorClass),
        surface,
        displaySurface: dyad.compactDisplay || surface || "Ø",
        compactDisplay: dyad.compactDisplay,
        compactSurface: dyad.compactSurface,
        num1: dyad.num1,
        num2: dyad.num2,
        displayNum1: dyad.displayNum1,
        displayNum2: dyad.displayNum2,
        displayDyad: dyad.displayDyad,
        dyadSource: dyad.source,
        predicateState: state,
        referenceNumber: number,
        pluralType: pluralType || "",
        blockedInterpretations,
        notNounSuffix: true,
        notStemSuffix: blockedInterpretations.includes("stem-suffix"),
        notStatePosition: true,
        notTense: blockedInterpretations.includes("tense")
      };
    }
    function getOrdinaryNncSubjectAffixLabel(subject = null) {
      const prefix = String(subject?.subjectPrefix || "");
      const suffix = String(subject?.subjectSuffix || "");
      return `${prefix || "Ø"}...${suffix || "Ø"}`;
    }
    function buildOrdinaryNncFormulaSlots({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      nounClass = ""
    } = {}) {
      const connector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType
      });
      const subjectSlotDefinition = getOrdinaryNncFormulaSlotDefinition("pers1-pers2") || {};
      const predicateSlotDefinition = getOrdinaryNncFormulaSlotDefinition("STEM") || {};
      const connectorSlotDefinition = getOrdinaryNncFormulaSlotDefinition("num1-num2") || {};
      return {
        pers1Pers2: {
          role: subjectSlotDefinition.role || "subject-person",
          slot: subjectSlotDefinition.id || "pers1-pers2",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
          displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
          label: String(subject?.personSubKey || "")
        },
        predicateStem: {
          role: "predicate",
          slot: predicateSlotDefinition.id || "STEM",
          stem,
          state
        },
        num1Num2: {
          role: connectorSlotDefinition.role || "subject-number-connector",
          slot: connectorSlotDefinition.id || "num1-num2",
          nounClass: connector.nounStemClass,
          connector: connector.displaySurface,
          surface: connector.surface,
          compactDisplay: connector.compactDisplay,
          compactSurface: connector.compactSurface,
          num1: connector.num1,
          num2: connector.num2,
          displayNum1: connector.displayNum1,
          displayNum2: connector.displayNum2,
          displayDyad: connector.displayDyad,
          dyadSource: connector.dyadSource,
          label: "subject number connector",
          belongsTo: connector.belongsTo,
          referenceNumber: connector.referenceNumber,
          pluralType: connector.pluralType
        }
      };
    }
    function getOrdinaryNncFormulaSlotResultFrame(slot = null) {
      if (!slot || typeof slot !== "object") {
        return null;
      }
      const grammarFrame = slot.grammarFrame && typeof slot.grammarFrame === "object" ? slot.grammarFrame : slot.frames && typeof slot.frames === "object" ? slot.frames : null;
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getOrdinaryNncFormulaSlotFramedSurface(slot = null) {
      const resultFrame = getOrdinaryNncFormulaSlotResultFrame(slot);
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
      return forms.flatMap(entry => splitVerbDerivedNominalSurfaceText(entry))[0] || "";
    }
    function resolveOrdinaryNncFormulaSlotText(slot = null, fields = []) {
      const framedSurface = getOrdinaryNncFormulaSlotFramedSurface(slot);
      if (framedSurface !== null) {
        return framedSurface;
      }
      const source = slot && typeof slot === "object" ? slot : {};
      for (const field of fields) {
        const value = normalizeVerbDerivedNominalSurfaceValue(source[field]);
        if (value) {
          return value;
        }
      }
      return "";
    }
    function buildOrdinaryNncFormulaEchoFromSlots(formulaSlots = null, {
      expanded = false
    } = {}) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const subject = formulaSlots.pers1Pers2 || {};
      const predicate = formulaSlots.predicateStem || {};
      const numberConnector = formulaSlots.num1Num2 || {};
      const stem = resolveOrdinaryNncFormulaSlotText(predicate, ["stem", "surface"]);
      if (!stem) {
        return "";
      }
      const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const compactConnector = resolveOrdinaryNncFormulaSlotText(numberConnector, ["connector", "surface"]) || "Ø";
      const expandedConnector = String(numberConnector.displayDyad || "").trim() || `${formatOrdinaryNncFormulaDyadSegment(numberConnector.num1)}-${formatOrdinaryNncFormulaDyadSegment(numberConnector.num2)}`;
      if (typeof targetObject.renderAndrewsFormulaEchoFromSchema === "function") {
        return targetObject.renderAndrewsFormulaEchoFromSchema("ordinary-nnc-shell", {
          pers1Pers2: {
            displayPrefix: prefix,
            displaySuffix: suffix
          },
          predicateStem: {
            stem
          },
          num1Num2: {
            ...(expanded ? {
              displayDyad: expandedConnector,
              displayConnector: compactConnector
            } : {
              displayConnector: compactConnector
            })
          }
        });
      }
      return `#${prefix}-${suffix}(${stem})${expanded ? expandedConnector : compactConnector}#`;
    }
    function buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots = null) {
      return buildOrdinaryNncFormulaEchoFromSlots(formulaSlots, {
        expanded: true
      });
    }
    function buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots = null) {
      return buildOrdinaryNncFormulaEchoFromSlots(formulaSlots, {
        expanded: false
      });
    }
    function buildOrdinaryNncPredicateStateFrame({
      state = ORDINARY_NNC_STATE.absolutive,
      possessor = null
    } = {}) {
      const normalizedState = normalizeOrdinaryNncState(state, possessor);
      const isPossessive = normalizedState === ORDINARY_NNC_STATE.possessive;
      const resolvedPossessor = isPossessive && possessor ? possessor : null;
      return {
        role: "predicate-state",
        slot: "predicate.state",
        state: normalizedState,
        statePosition: isPossessive ? "possessor" : "vacant",
        isVacant: !isPossessive,
        hasPossessor: Boolean(resolvedPossessor),
        participantRole: isPossessive ? "possessor" : "",
        possessor: resolvedPossessor,
        notSubjectConnector: true,
        notTense: true
      };
    }
    function getOrdinaryNncPredicateStateCategoryLabel(state = "") {
      const normalized = normalizeOrdinaryNncState(state);
      if (normalized === ORDINARY_NNC_STATE.possessive) {
        return "posesivo";
      }
      if (normalized === ORDINARY_NNC_STATE.absolutive) {
        return "absolutivo";
      }
      return normalized || "desconocido";
    }
    function getOrdinaryNncAnimacyCategoryLabel(animacy = "") {
      return normalizeOrdinaryNncAnimacy(animacy) === "animate" ? "animado" : "inanimado";
    }
    function buildOrdinaryNncCategoryProfile({
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      possessor = null,
      animacy = "",
      formulaSlots = null,
      markingRequested = false,
      markingAvailable = false
    } = {}) {
      const normalizedState = normalizeOrdinaryNncState(state, possessor);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, normalizedAnimacy) : "";
      const isPossessive = normalizedState === ORDINARY_NNC_STATE.possessive;
      const isKnownState = normalizedState === ORDINARY_NNC_STATE.absolutive || normalizedState === ORDINARY_NNC_STATE.possessive;
      const connectorSlot = formulaSlots?.num1Num2?.slot || "num1-num2";
      return {
        predicateState: {
          value: normalizedState,
          label: getOrdinaryNncPredicateStateCategoryLabel(normalizedState),
          slot: "predicate.state",
          isSupportedState: isKnownState
        },
        possessiveState: {
          isPossessive,
          possessorPrefix: isPossessive ? String(possessor?.prefix || "") : "",
          markingRequested: Boolean(markingRequested || isPossessive),
          markingAvailable: Boolean(isPossessive && markingAvailable)
        },
        animacy: {
          value: normalizedAnimacy,
          label: getOrdinaryNncAnimacyCategoryLabel(normalizedAnimacy),
          affectsSubjectAgreement: true,
          affectsReferencePlural: normalizedNumber === "plural"
        },
        reference: {
          number: normalizedNumber,
          pluralType: effectivePluralType,
          label: normalizedNumber,
          connectorSlot
        }
      };
    }
    function buildOrdinaryNncBasicMetadata({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = "",
      predicateFormula = "",
      sourceKind = "",
      markingRequested = false,
      markingAvailable = false
    } = {}) {
      const numberConnector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType
      });
      const predicateState = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor
      });
      const isAnimate = animacy === "animate";
      const isPlural = number === "plural";
      const effectivePluralType = isPlural ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, animacy) : "";
      const referenceLabel = !isPlural ? "referencia comun" : effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "plural -met" : "distributivo";
      const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject,
        nounClass
      });
      const categoryProfile = buildOrdinaryNncCategoryProfile({
        state,
        number,
        pluralType,
        possessor,
        animacy,
        formulaSlots,
        markingRequested,
        markingAvailable
      });
      return {
        version: 1,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        curriculumRef: {
          source: "Andrews",
          range: "12-19",
          role: "curriculum-index"
        },
        formulaSchemaId: "ordinary-nnc-shell",
        formulaSchemaVersion: getOrdinaryNncFormulaSchema()?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: renderOrdinaryNncFormulaTemplate(),
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
        fullFormulaEcho: buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots),
        compactFormulaEcho: buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots),
        categoryProfile,
        hasTensePosition: false,
        stateReplacesValence: true,
        sourceKind: sourceKind || "",
        subject: {
          role: "subject",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          affixLabel: getOrdinaryNncSubjectAffixLabel(subject),
          personSubKey: String(subject?.personSubKey || ""),
          agreementNumber: subject?.number || "",
          numberConnector,
          nonanimateThirdOnly: !isAnimate
        },
        predicate: {
          role: "predicate",
          stem,
          formula: predicateFormula || buildOrdinaryNncPredicateFormula({
            stem,
            nounClass
          }),
          state,
          stateLabel: state === ORDINARY_NNC_STATE.possessive ? "predicado posesivo" : "predicado absolutivo",
          stateSlot: predicateState,
          nounClass,
          animacy
        },
        possessor: state === ORDINARY_NNC_STATE.possessive ? possessor || null : null,
        reference: {
          number,
          pluralType: effectivePluralType,
          label: referenceLabel,
          countSuffix: isPlural && isAnimate && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "met" : "",
          animateCountSuffix: isAnimate ? "met" : "",
          distributiveReduplication: isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive,
          nonanimatePluralIsDistributive: !isAnimate && isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive
        },
        futureSyntaxLayer: ["pronominal-nnc", "supplementation", "included-referent-clause"]
      };
    }
    function buildOrdinaryNncClauseFrame({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      const numberConnector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType
      });
      const subjectFrame = subject && typeof subject === "object" ? {
        ...subject,
        numberConnector
      } : subject;
      const stateSlot = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor
      });
      const predicateFormula = buildOrdinaryNncPredicateFormula({
        stem,
        nounClass
      });
      const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject: subjectFrame,
        nounClass
      });
      return {
        kind: ORDINARY_NNC_CLAUSE_KIND,
        formulaSchemaId: "ordinary-nnc-shell",
        formulaSchemaVersion: getOrdinaryNncFormulaSchema()?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: renderOrdinaryNncFormulaTemplate(),
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
        fullFormulaEcho: buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots),
        compactFormulaEcho: buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots),
        predicateFormula,
        hasTensePosition: false,
        tense: null,
        subject: subjectFrame,
        predicate: {
          state,
          stateSlot,
          formula: predicateFormula,
          stem,
          nounClass,
          animacy
        },
        stateSlot,
        possessor: state === ORDINARY_NNC_STATE.possessive ? possessor : null,
        referenceNumber: number,
        surfaceStrategy: pluralType || "plain"
      };
    }
    function buildOrdinaryNncFormulaSurfacePairs({
      surfaceForms = [],
      clauseFrame = null,
      sourceStem = "",
      surfaceSegmentRecords = []
    } = {}) {
      const targetFormulaEcho = String(clauseFrame?.fullFormulaEcho || clauseFrame?.formulaEcho || "").trim();
      if (!targetFormulaEcho) {
        return Object.freeze([]);
      }
      const normalizedSourceStem = String(sourceStem || clauseFrame?.predicate?.stem || clauseFrame?.formulaSlots?.predicateStem?.stem || "STEM").trim() || "STEM";
      const sourceLabel = `NNC(${normalizedSourceStem})`;
      const formulaRecord = typeof targetObject.buildGrammarFormulaRecord === "function" ? targetObject.buildGrammarFormulaRecord({
        id: `ordinary-nnc:${targetFormulaEcho}`,
        unit: "NNC",
        formula: targetFormulaEcho,
        formulaSlots: clauseFrame?.formulaSlots || null,
        sourceFrame: {
          label: sourceLabel,
          formula: sourceLabel
        },
        source: "ordinary-nnc-formula-slots"
      }) : null;
      const baseSegmentFrames = [{
        slot: "pers1-pers2",
        role: "subject-person",
        formulaValue: clauseFrame?.formulaSlots?.pers1Pers2?.displayPrefix || "",
        surface: clauseFrame?.formulaSlots?.pers1Pers2?.prefix || "",
        orthographyBridge: "Nawat/Pipil orthography bridge"
      }, {
        slot: "STEM",
        role: "predicate",
        formulaValue: clauseFrame?.formulaSlots?.predicateStem?.stem || "",
        surface: clauseFrame?.formulaSlots?.predicateStem?.surface || clauseFrame?.formulaSlots?.predicateStem?.stem || clauseFrame?.predicate?.stem || "",
        orthographyBridge: "Nawat/Pipil orthography bridge"
      }, {
        slot: "num1-num2",
        role: "subject-number-connector",
        formulaValue: clauseFrame?.formulaSlots?.num1Num2?.displayDyad || clauseFrame?.formulaSlots?.num1Num2?.connector || "",
        surface: clauseFrame?.formulaSlots?.num1Num2?.surface || clauseFrame?.formulaSlots?.num1Num2?.compactSurface || "",
        orthographyBridge: "Nawat/Pipil orthography bridge"
      }];
      const seen = new Set();
      return Object.freeze((Array.isArray(surfaceForms) ? surfaceForms : []).map(surface => String(surface || "").trim()).filter(surface => {
        if (!surface || seen.has(surface)) {
          return false;
        }
        seen.add(surface);
        return true;
      }).map((surface, surfaceIndex) => {
        const surfaceSegmentRecord = (Array.isArray(surfaceSegmentRecords) ? surfaceSegmentRecords : []).find(record => String(record?.surface || "").trim() === surface) || null;
        const recordSegmentFrames = Array.isArray(surfaceSegmentRecord?.segmentFrames) ? surfaceSegmentRecord.segmentFrames : [];
        const candidateSegmentFrames = recordSegmentFrames.length ? recordSegmentFrames : baseSegmentFrames;
        const candidateSegmentDerivedSurface = candidateSegmentFrames.map(segment => String(segment?.surface || "").trim()).join("");
        const formulaRealizationRecord = typeof targetObject.buildGrammarFormulaRealizationRecord === "function" ? targetObject.buildGrammarFormulaRealizationRecord({
          id: `ordinary-nnc:${targetFormulaEcho}:surface-${surfaceIndex}`,
          formulaRecord,
          unit: "NNC",
          segmentFrames: candidateSegmentFrames,
          surfaceForms: [surface],
          deriveSurfaceFromSegments: candidateSegmentDerivedSurface === surface,
          source: "ordinary-nnc-structured-segments"
        }) : null;
        const pair = {
          surface,
          targetFormulaEcho,
          sourceToTargetFormulaEcho: `${sourceLabel} -> ${targetFormulaEcho}`
        };
        Object.defineProperties(pair, {
          sourceFormulaEcho: {
            enumerable: false,
            value: sourceLabel
          },
          andrewsFormulaEcho: {
            enumerable: false,
            value: targetFormulaEcho
          },
          conjugatorFormulaEcho: {
            enumerable: false,
            value: targetFormulaEcho
          },
          andrewsToConjugatorFormulaEcho: {
            enumerable: false,
            value: `${sourceLabel} -> ${targetFormulaEcho}`
          },
          formulaRecord: {
            enumerable: false,
            value: formulaRecord
          },
          formulaRealizationRecord: {
            enumerable: false,
            value: formulaRealizationRecord
          },
          segmentFrames: {
            enumerable: false,
            value: candidateSegmentFrames
          }
        });
        return Object.freeze(pair);
      }));
    }
    function buildOrdinaryNncFormulaSurfacePairFields({
      surfaceForms = [],
      clauseFrame = null,
      sourceStem = "",
      surfaceSegmentRecords = []
    } = {}) {
      const formulaSurfacePairs = buildOrdinaryNncFormulaSurfacePairs({
        surfaceForms,
        clauseFrame,
        sourceStem,
        surfaceSegmentRecords
      });
      return {
        formulaSurfacePairs,
        formulaRecord: formulaSurfacePairs.map(entry => entry.formulaRecord).filter(Boolean)[0] || null,
        formulaRecords: Array.from(new Set(formulaSurfacePairs.map(entry => entry.formulaRecord).filter(Boolean))),
        formulaRealizationRecord: formulaSurfacePairs.map(entry => entry.formulaRealizationRecord).filter(Boolean)[0] || null,
        formulaRealizationRecords: formulaSurfacePairs.map(entry => entry.formulaRealizationRecord).filter(Boolean),
        targetFormulaEchoes: formulaSurfacePairs.map(entry => entry.targetFormulaEcho),
        sourceFormulaEcho: formulaSurfacePairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)[0] || "",
        sourceFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.sourceFormulaEcho).filter(Boolean))),
        andrewsFormulaEcho: formulaSurfacePairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)[0] || "",
        andrewsFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean))),
        conjugatorFormulaEcho: formulaSurfacePairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)[0] || "",
        conjugatorFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean))),
        sourceToTargetFormulaEcho: formulaSurfacePairs.map(entry => entry.sourceToTargetFormulaEcho).join(" | "),
        andrewsToConjugatorFormulaEcho: formulaSurfacePairs.map(entry => entry.andrewsToConjugatorFormulaEcho).join(" | ")
      };
    }
    function normalizeOrdinaryNncResultTextRecords(formulaSurfacePairs = []) {
      return (Array.isArray(formulaSurfacePairs) ? formulaSurfacePairs : []).map((pair, index) => {
        const realizationRecord = pair?.formulaRealizationRecord || null;
        if (!realizationRecord || realizationRecord.kind !== "grammar-formula-realization-record" || !Array.isArray(realizationRecord.segmentFrames)) {
          return null;
        }
        const segmentFrames = realizationRecord.segmentFrames.map((segment, segmentIndex) => ({
          kind: "ordinary-nnc-result-text-segment-frame",
          index: segmentIndex,
          slot: String(segment?.slot || ""),
          role: String(segment?.role || ""),
          formulaValue: String(segment?.formulaValue || ""),
          surface: String(segment?.surface || "").trim()
        })).filter(segment => segment.surface);
        const segmentSurface = segmentFrames.map(segment => segment.surface).join("");
        const recordSurface = String(realizationRecord.surface || "").trim();
        if (!segmentSurface || segmentSurface !== recordSurface) {
          return null;
        }
        return Object.freeze({
          kind: "ordinary-nnc-result-text-record-frame",
          index,
          formulaRealizationRecordId: String(realizationRecord.id || ""),
          formulaRecordId: String(realizationRecord.formulaRecordId || ""),
          surface: segmentSurface,
          segmentFrames: Object.freeze(segmentFrames.map(Object.freeze))
        });
      }).filter(Boolean);
    }
    function getOrdinaryNncResultTextSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        records: (Array.isArray(sourceFrame.resultRecordFrames) ? sourceFrame.resultRecordFrames : []).map(record => ({
          formulaRealizationRecordId: record.formulaRealizationRecordId || "",
          formulaRecordId: record.formulaRecordId || "",
          surface: record.surface || "",
          segmentFrames: record.segmentFrames || []
        }))
      });
    }
    function buildOrdinaryNncResultTextSourceFrame({
      formulaSurfacePairs = []
    } = {}) {
      const resultRecordFrames = normalizeOrdinaryNncResultTextRecords(formulaSurfacePairs);
      const surfaceForms = resultRecordFrames.map(record => record.surface).filter((surface, index, list) => surface && list.indexOf(surface) === index);
      const diagnostics = [];
      if (!resultRecordFrames.length) {
        diagnostics.push("ordinary-nnc-result-text-missing-realization-records");
      }
      if (!surfaceForms.length) {
        diagnostics.push("ordinary-nnc-result-text-missing-surface-forms");
      }
      const sourceFrame = {
        kind: "ordinary-nnc-result-text-source-frame",
        routeId: "ordinary-nnc-result-text-render",
        resultRecordFrames: Object.freeze(resultRecordFrames),
        surfaceForms: Object.freeze(surfaceForms),
        supported: resultRecordFrames.length > 0 && surfaceForms.length > 0,
        diagnostics: Object.freeze(diagnostics),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getOrdinaryNncResultTextSourceSignature(sourceFrame)
      });
    }
    function buildOrdinaryNncResultTextOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-result-text-source-frame") {
        return null;
      }
      const targetSurfaceForms = (Array.isArray(sourceFrame.surfaceForms) ? sourceFrame.surfaceForms : []).map(surface => String(surface || "").trim()).filter(Boolean);
      const targetFrame = Object.freeze({
        kind: "ordinary-nnc-result-text-target-frame",
        surfaceForms: Object.freeze(targetSurfaceForms),
        resultText: targetSurfaceForms.join(" / ")
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nnc-result-text-render",
        routeId: "ordinary-nnc-result-text-render",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        supported: sourceFrame.supported === true && targetSurfaceForms.length > 0,
        diagnostics: sourceFrame.supported === true ? Object.freeze([]) : Object.freeze(["ordinary-nnc-result-text-unsupported-source-frame"]),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function validateOrdinaryNncResultTextOperationFrame({
      formulaSurfacePairs = [],
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const rebuiltSourceFrame = buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs
      });
      if (!sourceFrame || sourceFrame.kind !== "ordinary-nnc-result-text-source-frame" || String(sourceFrame.sourceSignature || "") !== String(rebuiltSourceFrame.sourceSignature || "") || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "ordinary-nnc-result-text-render" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return null;
      }
      const rebuiltOperationFrame = buildOrdinaryNncResultTextOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return null;
      }
      return operationFrame.targetFrame;
    }
    function buildOrdinaryNncResultText(formulaSurfacePairs = [], options = {}) {
      const targetFrame = validateOrdinaryNncResultTextOperationFrame({
        formulaSurfacePairs,
        sourceFrame: options?.sourceFrame || null,
        operationFrame: options?.operationFrame || null
      });
      return targetFrame ? String(targetFrame.resultText || "") : "";
    }
    function resolveOrdinaryNncResultTextFromFrames({
      formulaSurfacePairs = [],
      sourceFrame = null,
      operationFrame = null,
      fallbackSurfaceForms = []
    } = {}) {
      const typedResultText = buildOrdinaryNncResultText(formulaSurfacePairs, {
        sourceFrame,
        operationFrame
      });
      if (sourceFrame?.supported === true) {
        return {
          supported: Boolean(typedResultText),
          resultText: typedResultText,
          diagnostic: typedResultText ? null : buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.resultTextMissingTypedOperationFrame, "Ordinary NNC result text requires a matching typed source and operation frame."),
          typedRouteRequired: true
        };
      }
      return {
        supported: true,
        resultText: (Array.isArray(fallbackSurfaceForms) ? fallbackSurfaceForms : []).map(surface => String(surface || "").trim()).filter(Boolean).join(" / "),
        diagnostic: null,
        typedRouteRequired: false
      };
    }
    function buildOrdinaryNncUnsupportedResult({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = "",
      openStem = false,
      diagnostic,
      markingAvailable = false
    } = {}) {
      const clauseFrame = buildOrdinaryNncClauseFrame({
        stem,
        state,
        nounClass,
        animacy,
        number,
        pluralType,
        subject,
        possessor
      });
      const nncBasic = buildOrdinaryNncBasicMetadata({
        stem,
        state,
        nounClass,
        animacy,
        number,
        pluralType,
        subject,
        possessor,
        predicateFormula: clauseFrame.predicateFormula,
        sourceKind: openStem ? "open-stem" : "fixture",
        markingRequested: state === ORDINARY_NNC_STATE.possessive,
        markingAvailable
      });
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: false,
        result: "",
        surfaceForms: [],
        stem,
        state,
        nounClass,
        animacy,
        openStem,
        number,
        pluralType,
        subject,
        possessor,
        predicateFormula: clauseFrame.predicateFormula,
        clauseFrame,
        nncBasic,
        diagnostics: diagnostic ? [diagnostic] : []
      };
    }
    function generateOrdinaryNncParadigm({
      stem = "",
      state = "",
      subject = null,
      possessor = null,
      possessivePrefix = "",
      number = "singular",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
      nounClass = "",
      animacy = "",
      possessionKind = "",
      stateCase = "",
      possessionType = "",
      formulaSlots = null,
      clauseFrame: requestClauseFrame = null,
      nuclearClauseFrame: requestNuclearClauseFrame = null,
      routeContract = null,
      organicPossessionSourceFrame = null,
      organicPossessionOperationFrame = null
    } = {}) {
      const legacyFormulaInput = parseOrdinaryNncPredicateFormulaInput(stem, {
        diagnosticOnly: true
      });
      const hasLegacyFormulaString = isOrdinaryNncLegacyFormulaString(stem);
      const requestFormulaSlots = getOrdinaryNncRequestFormulaSlots({
        formulaSlots,
        clauseFrame: requestClauseFrame,
        nuclearClauseFrame: requestNuclearClauseFrame,
        routeContract
      });
      const structuralStem = getOrdinaryNncRequestFormulaSlotStem(requestFormulaSlots);
      const structuralNounClass = getOrdinaryNncRequestFormulaSlotNounClass(requestFormulaSlots);
      const plainStem = normalizeOrdinaryNncText(stem).replace(/[()#]/g, "");
      const normalizedStem = structuralStem || (hasLegacyFormulaString ? "" : plainStem);
      const requestedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || structuralNounClass || "");
      let resolvedSubject = resolveOrdinaryNncSubject(subject);
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor, possessivePrefix);
      const normalizedState = normalizeOrdinaryNncState(state, resolvedPossessor);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
      const normalizedPossessionKind = normalizeOrdinaryNncPossessionKind(possessionKind || stateCase || possessionType);
      const legacyConflictsWithSlots = Boolean(hasLegacyFormulaString && legacyFormulaInput && requestFormulaSlots && (structuralStem && legacyFormulaInput.stem && structuralStem !== legacyFormulaInput.stem || structuralNounClass && legacyFormulaInput.nounClass && structuralNounClass !== legacyFormulaInput.nounClass));
      if (hasLegacyFormulaString && !requestFormulaSlots || legacyConflictsWithSlots) {
        const diagnosticId = legacyConflictsWithSlots ? ORDINARY_NNC_DIAGNOSTIC_IDS.legacyFormulaStringConflictsWithSlots : ORDINARY_NNC_DIAGNOSTIC_IDS.legacyFormulaStringBlocked;
        const diagnosticMessage = legacyConflictsWithSlots ? "Ordinary NNC generation rejected a formula-looking string because it conflicts with the supplied Andrews formula slots." : "Ordinary NNC generation no longer lets formula-looking strings authorize or infer grammar; pass Andrews formula slots or a route contract instead.";
        return buildOrdinaryNncUnsupportedResult({
          stem: structuralStem || legacyFormulaInput?.stem || plainStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: requestedNounClass || structuralNounClass || legacyFormulaInput?.nounClass || "",
          animacy,
          diagnostic: buildOrdinaryNncDiagnostic(diagnosticId, diagnosticMessage)
        });
      }
      if (normalizedPossessionKind === ORDINARY_NNC_POSSESSION_KIND.organic) {
        const organicNounClass = requestedNounClass || "t";
        const organicAnimacy = normalizeOrdinaryNncAnimacy(animacy);
        resolvedSubject = resolveOrdinaryNncClauseSubject(subject, normalizedNumber, organicAnimacy);
        const organicSourceFrame = organicPossessionSourceFrame || buildOrdinaryNncOrganicPossessionSourceFrame({
          formulaSlots: requestFormulaSlots,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          possessionKind: normalizedPossessionKind
        });
        if (!organicSourceFrame) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: structuralStem || "",
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionMissingSourceFrame, "Organic possession NNC generation requires an Andrews formula-slot source frame; stem strings cannot authorize the target.")
            }),
            possessionKind: normalizedPossessionKind,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: structuralStem || ""
            }
          };
        }
        const organicOperationFrame = organicPossessionOperationFrame || buildOrdinaryNncOrganicPossessionOperationFrame(organicSourceFrame);
        const organicFrameMismatch = getOrdinaryNncOrganicPossessionFrameMismatch({
          sourceFrame: organicSourceFrame,
          operationFrame: organicOperationFrame
        });
        if (organicFrameMismatch) {
          const diagnosticId = organicFrameMismatch.includes("operation") ? ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionMissingOperationFrame : ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionContradictoryFrame;
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicSourceFrame.sourceStem || "",
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(diagnosticId, organicFrameMismatch)
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionSourceFrame: organicSourceFrame,
            organicPossessionOperationFrame: organicOperationFrame || null,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: organicSourceFrame.sourceStem || ""
            }
          };
        }
        const organicProfile = buildOrdinaryNncOrganicPossessionProfile({
          sourceFrame: organicSourceFrame,
          operationFrame: organicOperationFrame
        });
        const organicStem = organicProfile?.organicStem || "";
        const organicSourceStem = organicProfile?.sourceStem || "";
        const organicFrame = buildOrdinaryNncOrganicPossessionFrame({
          sourceStem: organicSourceStem,
          organicStem,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          sourceFrame: organicSourceFrame,
          operationFrame: organicOperationFrame
        });
        if (normalizedState !== ORDINARY_NNC_STATE.possessive) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessiveState, "Organic possession NNCs require possessive predicate state; absolutive output would name a characteristic property instead.")
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: organicSourceStem
            }
          };
        }
        if (!resolvedPossessor || resolvedPossessor.unsupported) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: null,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessor, "Organic possession NNCs require a possessor prefix because the whole is expressed in possessive state.")
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: organicSourceStem
            }
          };
        }
        const classStemCompatibility = getOrdinaryNncClassStemCompatibility(organicNounClass, organicStem);
        if (!classStemCompatibility.compatible) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility)
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: organicSourceStem
            }
          };
        }
        const organicSurfaceSourceFrame = buildOrdinaryNncOpenStemPossessiveSourceFrame({
          sourceStem: organicStem,
          possessor: resolvedPossessor,
          animacy: organicAnimacy
        });
        const organicSurfaceOperationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame(organicSurfaceSourceFrame);
        const singularSurface = buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
          sourceFrame: organicSurfaceSourceFrame,
          operationFrame: organicSurfaceOperationFrame
        });
        const singularSurfaceResult = {
          surface: singularSurface,
          surfaceForms: singularSurface ? [singularSurface] : [],
          soundSpellingFrames: organicSurfaceOperationFrame?.targetFrame?.soundSpellingFrames || [],
          sourceFrame: organicSurfaceSourceFrame,
          operationFrame: organicSurfaceOperationFrame,
          segmentFrames: organicSurfaceOperationFrame?.targetFrame?.segmentFrames || []
        };
        const singularSurfaceSegmentRecords = singularSurface && singularSurfaceResult.segmentFrames.length ? [{
          kind: "ordinary-nnc-derived-plural-surface-segment-record",
          index: 0,
          surface: singularSurface,
          sourceFrame: organicSurfaceSourceFrame,
          operationFrame: organicSurfaceOperationFrame,
          segmentFrames: singularSurfaceResult.segmentFrames
        }] : [];
        const derivedPlural = normalizedNumber === "plural" ? buildOrdinaryNncDerivedPluralForms([singularSurface], {
          state: ORDINARY_NNC_STATE.possessive,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          animacy: organicAnimacy,
          pluralType: normalizedPluralType,
          nounClass: organicNounClass,
          sourceStem: organicStem
        }) : null;
        const resolvedSurfaceForms = normalizedNumber === "plural" ? derivedPlural?.forms || [] : [singularSurface].filter(Boolean);
        const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, organicAnimacy) : "";
        const clauseFrame = buildOrdinaryNncClauseFrame({
          stem: organicStem,
          state: ORDINARY_NNC_STATE.possessive,
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor
        });
        const nncBasic = buildOrdinaryNncBasicMetadata({
          stem: organicStem,
          state: ORDINARY_NNC_STATE.possessive,
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          predicateFormula: clauseFrame.predicateFormula,
          sourceKind: "open-stem",
          markingRequested: true,
          markingAvailable: true
        });
        const formulaSurfacePairFields = buildOrdinaryNncFormulaSurfacePairFields({
          surfaceForms: resolvedSurfaceForms,
          clauseFrame,
          sourceStem: organicStem,
          surfaceSegmentRecords: derivedPlural?.surfaceSegmentRecords || singularSurfaceSegmentRecords
        });
        const ordinaryNncResultTextSourceFrame = buildOrdinaryNncResultTextSourceFrame({
          formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs
        });
        const ordinaryNncResultTextOperationFrame = buildOrdinaryNncResultTextOperationFrame(ordinaryNncResultTextSourceFrame);
        const resultTextFrame = resolveOrdinaryNncResultTextFromFrames({
          formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs,
          sourceFrame: ordinaryNncResultTextSourceFrame,
          operationFrame: ordinaryNncResultTextOperationFrame,
          fallbackSurfaceForms: resolvedSurfaceForms
        });
        if (!resultTextFrame.supported) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: ORDINARY_NNC_STATE.possessive,
              number: normalizedNumber,
              pluralType: effectivePluralType,
              subject: resolvedSubject,
              possessor: resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: resultTextFrame.diagnostic
            }),
            formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs,
            ordinaryNncResultTextSourceFrame,
            ordinaryNncResultTextOperationFrame,
            organicPossessionFrame: organicFrame,
            organicPossessionSourceFrame: organicSourceFrame,
            organicPossessionOperationFrame: organicOperationFrame,
            organicSurfaceSourceFrame,
            organicSurfaceOperationFrame
          };
        }
        return {
          outputKind: ORDINARY_NNC_CLAUSE_KIND,
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          supported: resolvedSurfaceForms.length > 0,
          result: resultTextFrame.resultText,
          surfaceForms: resolvedSurfaceForms,
          stem: organicStem,
          sourceStem: organicSourceStem,
          state: ORDINARY_NNC_STATE.possessive,
          possessionKind: normalizedPossessionKind,
          stateCase: "organic-possession",
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          openStem: true,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          predicateFormula: clauseFrame.predicateFormula,
          clauseFrame,
          nncBasic,
          ...formulaSurfacePairFields,
          ordinaryNncResultTextSourceFrame,
          ordinaryNncResultTextOperationFrame,
          ordinaryNncDerivedPluralSourceFrame: derivedPlural?.sourceFrame || null,
          ordinaryNncDerivedPluralOperationFrame: derivedPlural?.operationFrame || null,
          organicPossessionFrame: organicFrame,
          organicPossessionSourceFrame: organicSourceFrame,
          organicPossessionOperationFrame: organicOperationFrame,
          organicSurfaceSourceFrame,
          organicSurfaceOperationFrame,
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(singularSurfaceResult, derivedPlural?.soundSpellingFrames),
          diagnostics: [],
          source: {
            fixtureId: "",
            sourceRefs: ["Andrews 39.3.4"],
            sourceKind: "open-stem",
            sourceStem: organicSourceStem
          }
        };
      }
      const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy
      });
      if (!fixture) {
        return buildOrdinaryNncUnsupportedResult({
          stem: normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: requestedNounClass,
          animacy,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedStem, `No nominal nuclear clause fixture is configured for stem "${normalizedStem}".`)
        });
      }
      const isOpenStemFixture = fixture.openStem === true;
      const fixtureClass = String(fixture.nounClass || "");
      const fixtureAnimacy = fixture.animacy || "";
      resolvedSubject = resolveOrdinaryNncClauseSubject(subject, normalizedNumber, fixtureAnimacy);
      const classStemCompatibility = getOrdinaryNncClassStemCompatibility(fixtureClass, fixture.stem || normalizedStem);
      if (!classStemCompatibility.compatible) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility)
        });
      }
      if (!isOpenStemFixture && requestedNounClass && fixtureClass && requestedNounClass !== fixtureClass) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.nounClassMismatch, `Nominal nuclear clause fixture "${fixture.id || normalizedStem}" is class "${fixtureClass}", not "${requestedNounClass}".`)
        });
      }
      if (normalizedState === ORDINARY_NNC_STATE.possessive && (!resolvedPossessor || resolvedPossessor.unsupported)) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: null,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessor, `No nominal nuclear clause possessive fixture is configured for possessor "${possessor || possessivePrefix || ""}".`)
        });
      }
      const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, fixtureAnimacy) : "";
      if (fixtureAnimacy === "inanimate" && !isOrdinaryNncThirdSingularSubject(resolvedSubject)) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedSubject, `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate and only supports 3rd singular subject agreement.`)
        });
      }
      const fixtureStateCell = getOrdinaryNncFixtureStateCell(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType
      });
      const structuredPossessiveSurfaceResults = buildOrdinaryNncStructuredPossessiveSurfaceResults({
        fixture,
        stateCell: fixtureStateCell,
        state: normalizedState,
        number: normalizedNumber,
        possessor: resolvedPossessor,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy
      });
      const structuredAbsolutiveSurfaceResults = isOrdinaryNncThirdSingularSubject(resolvedSubject) || normalizedState === ORDINARY_NNC_STATE.absolutive && normalizedNumber === "singular" && fixtureAnimacy === "animate" ? buildOrdinaryNncStructuredAbsolutiveSingularSurfaceResults({
        fixture,
        state: normalizedState,
        number: normalizedNumber,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy
      }) : [];
      const structuredSurfaceResults = structuredPossessiveSurfaceResults.length ? structuredPossessiveSurfaceResults : structuredAbsolutiveSurfaceResults;
      const surfaceForms = structuredSurfaceResults.length ? [] : getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType
      });
      const sourceSoundSpellingFrames = structuredSurfaceResults.length ? collectOrdinaryNncSurfaceSoundSpellingFrames(...structuredSurfaceResults) : getOrdinaryNncFixtureStateSoundSpellingFrames(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType
      });
      const sourceSurfaceSegmentRecords = structuredSurfaceResults.length ? structuredSurfaceResults.map((entry, index) => ({
        kind: structuredPossessiveSurfaceResults.length ? "ordinary-nnc-structured-possessive-surface-segment-record" : "ordinary-nnc-structured-absolutive-singular-surface-segment-record",
        index,
        surface: entry.surface || "",
        sourceFrame: entry.sourceFrame || null,
        operationFrame: entry.operationFrame || null,
        segmentFrames: entry.segmentFrames || []
      })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length) : getOrdinaryNncFixtureStateSurfaceSegmentRecords(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType
      });
      const singularSourceCell = normalizedNumber === "plural" ? getOrdinaryNncFixtureStateCell(fixture, normalizedState, {
        number: "singular",
        possessor: resolvedPossessor
      }) : null;
      const sourcePossessiveStem = normalizedState === ORDINARY_NNC_STATE.possessive ? getOrdinaryNncPossessiveStemFromCell(singularSourceCell) : "";
      const singularForms = normalizedNumber === "plural" ? getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
        number: "singular",
        possessor: resolvedPossessor
      }) : [];
      const derivedPlural = normalizedNumber === "plural" && !surfaceForms.length && !structuredSurfaceResults.length ? buildOrdinaryNncDerivedPluralForms(singularForms, {
        state: normalizedState,
        subject: resolvedSubject,
        possessor: resolvedPossessor,
        animacy: fixtureAnimacy,
        pluralType: normalizedPluralType,
        nounClass: fixtureClass,
        sourceStem: fixture.stem || normalizedStem,
        sourcePossessiveStem
      }) : null;
      const subjectAppliedSurfaceResults = structuredSurfaceResults.length && fixtureAnimacy === "animate" && !isOrdinaryNncThirdSingularSubject(resolvedSubject) ? structuredSurfaceResults.map(entry => {
        const priorTargetSurface = String(entry.operationFrame?.targetFrame?.surface || "");
        const sourceFrame = entry.sourceFrame && entry.operationFrame?.supported === true && priorTargetSurface && priorTargetSurface === String(entry.surface || "") ? buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
          sourceStem: fixture.stem || normalizedStem,
          sourceSurface: priorTargetSurface,
          sourceSurfaceRole: structuredPossessiveSurfaceResults.length ? "ordinary-nnc-prior-typed-possessive-singular-source-form" : "ordinary-nnc-prior-typed-absolutive-singular-source-form",
          priorSourceFrame: entry.sourceFrame,
          priorOperationFrame: entry.operationFrame,
          subject: resolvedSubject,
          state: normalizedState,
          animacy: fixtureAnimacy
        }) : null;
        const operationFrame = buildOrdinaryNncAnimateSubjectPrefixOperationFrame(sourceFrame);
        const surface = buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
          sourceFrame,
          operationFrame
        });
        return {
          surface,
          soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry, operationFrame?.targetFrame?.soundSpellingFrames || []),
          sourceFrame,
          operationFrame,
          segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
        };
      }) : structuredSurfaceResults.length ? structuredSurfaceResults : surfaceForms.length ? surfaceForms.map(form => {
        if (fixtureAnimacy !== "animate") {
          return {
            surface: form,
            soundSpellingFrames: [],
            sourceFrame: null,
            operationFrame: null,
            segmentFrames: []
          };
        }
        const sourceFrame = buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
          sourceStem: fixture.stem || normalizedStem,
          sourceSurface: form,
          subject: resolvedSubject,
          state: normalizedState,
          animacy: fixtureAnimacy
        });
        const operationFrame = buildOrdinaryNncAnimateSubjectPrefixOperationFrame(sourceFrame);
        const surface = buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
          sourceFrame,
          operationFrame
        });
        return {
          surface,
          soundSpellingFrames: operationFrame?.targetFrame?.soundSpellingFrames || [],
          sourceFrame,
          operationFrame,
          segmentFrames: operationFrame?.targetFrame?.segmentFrames || []
        };
      }) : [];
      const subjectAppliedSurfaceSegmentRecords = subjectAppliedSurfaceResults.map((entry, index) => ({
        kind: "ordinary-nnc-subject-prefixed-surface-segment-record",
        index,
        surface: entry.surface || "",
        sourceFrame: entry.sourceFrame || null,
        operationFrame: entry.operationFrame || null,
        segmentFrames: entry.segmentFrames || []
      })).filter(entry => entry.surface && Array.isArray(entry.segmentFrames) && entry.segmentFrames.length);
      const resolvedSurfaceForms = structuredSurfaceResults.length ? subjectAppliedSurfaceResults.map(entry => entry.surface).filter(Boolean) : surfaceForms.length ? subjectAppliedSurfaceResults.map(entry => entry.surface).filter(Boolean) : derivedPlural?.forms || [];
      const resolvedSoundSpellingFrames = collectOrdinaryNncSurfaceSoundSpellingFrames(sourceSoundSpellingFrames, ...subjectAppliedSurfaceResults, derivedPlural?.soundSpellingFrames);
      if (!resolvedSurfaceForms.length) {
        const stateData = fixture.states?.[normalizedState] || null;
        const missingPossessiveState = normalizedState === ORDINARY_NNC_STATE.possessive && !stateData;
        const diagnosticId = missingPossessiveState ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessiveState : stateData ? normalizedNumber === "plural" && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count && fixtureAnimacy !== "animate" ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedNumber : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedState;
        const diagnosticMessage = missingPossessiveState ? `No nominal nuclear clause possessive forms are configured for stem "${fixture.stem || normalizedStem}".` : diagnosticId === ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType ? `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate; plural count -met is only configured for animate nouns.` : `No nominal nuclear clause ${normalizedState} ${normalizedNumber} form is configured for stem "${fixture.stem || normalizedStem}".`;
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(diagnosticId, diagnosticMessage),
          markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive && !missingPossessiveState && singularForms.length > 0
        });
      }
      const clauseFrame = buildOrdinaryNncClauseFrame({
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null
      });
      const nncBasic = buildOrdinaryNncBasicMetadata({
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
        predicateFormula: clauseFrame.predicateFormula,
        sourceKind: isOpenStemFixture ? "open-stem" : "fixture",
        markingRequested: normalizedState === ORDINARY_NNC_STATE.possessive,
        markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive
      });
      const formulaSurfacePairFields = buildOrdinaryNncFormulaSurfacePairFields({
        surfaceForms: resolvedSurfaceForms,
        clauseFrame,
        sourceStem: fixture.stem || normalizedStem,
        surfaceSegmentRecords: derivedPlural?.surfaceSegmentRecords || (subjectAppliedSurfaceSegmentRecords.length ? subjectAppliedSurfaceSegmentRecords : sourceSurfaceSegmentRecords)
      });
      const ordinaryNncResultTextSourceFrame = buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs
      });
      const ordinaryNncResultTextOperationFrame = buildOrdinaryNncResultTextOperationFrame(ordinaryNncResultTextSourceFrame);
      const resultTextFrame = resolveOrdinaryNncResultTextFromFrames({
        formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs,
        sourceFrame: ordinaryNncResultTextSourceFrame,
        operationFrame: ordinaryNncResultTextOperationFrame,
        fallbackSurfaceForms: resolvedSurfaceForms
      });
      if (!resultTextFrame.supported) {
        return {
          ...buildOrdinaryNncUnsupportedResult({
            stem: fixture.stem || normalizedStem,
            state: normalizedState,
            number: normalizedNumber,
            pluralType: effectivePluralType,
            subject: resolvedSubject,
            possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
            nounClass: fixtureClass,
            animacy: fixtureAnimacy,
            openStem: isOpenStemFixture,
            diagnostic: resultTextFrame.diagnostic,
            markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive
          }),
          formulaSurfacePairs: formulaSurfacePairFields.formulaSurfacePairs,
          ordinaryNncResultTextSourceFrame,
          ordinaryNncResultTextOperationFrame,
          ordinaryNncSubjectPrefixSourceFrames: subjectAppliedSurfaceSegmentRecords.map(entry => entry.sourceFrame).filter(Boolean),
          ordinaryNncSubjectPrefixOperationFrames: subjectAppliedSurfaceSegmentRecords.map(entry => entry.operationFrame).filter(Boolean),
          ordinaryNncAbsolutiveSingularSourceFrames: structuredAbsolutiveSurfaceResults.map(entry => entry.sourceFrame).filter(Boolean),
          ordinaryNncAbsolutiveSingularOperationFrames: structuredAbsolutiveSurfaceResults.map(entry => entry.operationFrame).filter(Boolean),
          ordinaryNncStructuredPossessiveSourceFrames: structuredPossessiveSurfaceResults.map(entry => entry.sourceFrame).filter(Boolean),
          ordinaryNncStructuredPossessiveOperationFrames: structuredPossessiveSurfaceResults.map(entry => entry.operationFrame).filter(Boolean)
        };
      }
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: true,
        result: resultTextFrame.resultText,
        surfaceForms: resolvedSurfaceForms,
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        openStem: isOpenStemFixture,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
        predicateFormula: clauseFrame.predicateFormula,
        clauseFrame,
        nncBasic,
        ...formulaSurfacePairFields,
        ordinaryNncResultTextSourceFrame,
        ordinaryNncResultTextOperationFrame,
        ordinaryNncSubjectPrefixSourceFrames: subjectAppliedSurfaceSegmentRecords.map(entry => entry.sourceFrame).filter(Boolean),
        ordinaryNncSubjectPrefixOperationFrames: subjectAppliedSurfaceSegmentRecords.map(entry => entry.operationFrame).filter(Boolean),
        ordinaryNncAbsolutiveSingularSourceFrames: structuredAbsolutiveSurfaceResults.map(entry => entry.sourceFrame).filter(Boolean),
        ordinaryNncAbsolutiveSingularOperationFrames: structuredAbsolutiveSurfaceResults.map(entry => entry.operationFrame).filter(Boolean),
        ordinaryNncStructuredPossessiveSourceFrames: structuredPossessiveSurfaceResults.map(entry => entry.sourceFrame).filter(Boolean),
        ordinaryNncStructuredPossessiveOperationFrames: structuredPossessiveSurfaceResults.map(entry => entry.operationFrame).filter(Boolean),
        ordinaryNncDerivedPluralSourceFrame: derivedPlural?.sourceFrame || null,
        ordinaryNncDerivedPluralOperationFrame: derivedPlural?.operationFrame || null,
        soundSpellingFrames: resolvedSoundSpellingFrames,
        diagnostics: [],
        source: isOpenStemFixture ? {
          fixtureId: "",
          sourceRefs: [],
          sourceKind: "open-stem"
        } : {
          fixtureId: fixture.id || "",
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
          sourceKind: "fixture"
        }
      };
    }
    function normalizeOrdinaryNncRequestedList(values = null, normalizer = value => value) {
      const source = Array.isArray(values) ? values : values === null || typeof values === "undefined" ? [] : [values];
      const seen = new Set();
      const normalizedValues = [];
      source.forEach(value => {
        const normalized = normalizer(value);
        if (!normalized || seen.has(normalized)) {
          return;
        }
        seen.add(normalized);
        normalizedValues.push(normalized);
      });
      return normalizedValues;
    }
    function getOrdinaryNncFixtureStates(fixture = null) {
      return Object.keys(fixture?.states || {}).map(state => normalizeOrdinaryNncState(state)).filter(Boolean);
    }
    function getOrdinaryNncFixtureNumbersForState(fixture = null, state = "") {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const numbers = Object.keys(stateData.numberFormsByPossessor || {});
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (fixture?.animacy === "animate" && normalizedNumbers.includes("singular") && !normalizedNumbers.includes("plural")) {
          normalizedNumbers.push("plural");
        }
        return normalizedNumbers;
      }
      const numbers = Object.keys(stateData.numberForms || {});
      if (numbers.length) {
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (normalizedNumbers.includes("singular") && state === ORDINARY_NNC_STATE.absolutive && !normalizedNumbers.includes("plural")) {
          normalizedNumbers.push("plural");
        }
        return normalizedNumbers;
      }
      return Array.isArray(stateData.surfaceForms) && stateData.surfaceForms.length ? ["singular"] : [];
    }
    function getOrdinaryNncDefaultPluralTypesForFixture(fixture = null, state = ORDINARY_NNC_STATE.absolutive) {
      if (state === ORDINARY_NNC_STATE.possessive) {
        return fixture?.animacy === "animate" ? [ORDINARY_NNC_PLURAL_TYPE.count] : [ORDINARY_NNC_PLURAL_TYPE.distributive];
      }
      return fixture?.animacy === "animate" ? [ORDINARY_NNC_PLURAL_TYPE.count, ORDINARY_NNC_PLURAL_TYPE.distributive] : [ORDINARY_NNC_PLURAL_TYPE.distributive];
    }
    function getOrdinaryNncPossessorInventory() {
      return getOrdinaryNncPossessiveEntries().map(entry => String(entry.value || "")).filter(Boolean);
    }
    function normalizeOrdinaryNncRequestedPossessor(value = "") {
      const resolved = resolveOrdinaryNncPossessor(value);
      if (resolved && !resolved.unsupported && resolved.prefix) {
        return resolved.prefix;
      }
      if (value && typeof value === "object") {
        return String(value.prefix || value.value || value.id || value.personSubKey || "").trim();
      }
      return String(value || "").trim();
    }
    function getOrdinaryNncFixturePossessorsForStateNumber(fixture = null, state = "", number = "singular") {
      if (state !== ORDINARY_NNC_STATE.possessive) {
        return [];
      }
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      const byNumber = stateData.numberFormsByPossessor?.[number] || {};
      const numberPossessors = Object.keys(byNumber).filter(Boolean);
      if (numberPossessors.length) {
        return numberPossessors;
      }
      if (number === "plural" && fixture?.animacy === "animate") {
        const singularPossessors = Object.keys(stateData.numberFormsByPossessor?.singular || {}).filter(Boolean);
        if (singularPossessors.length) {
          return singularPossessors;
        }
      }
      return Object.keys(stateData.surfaceByPossessor || {}).filter(Boolean);
    }
    function buildOrdinaryNncParadigmSetDiagnostic(diagnostic = null, {
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      possessor = null
    } = {}) {
      if (!diagnostic) {
        return null;
      }
      const entry = {
        ...diagnostic,
        state,
        number
      };
      if (pluralType) {
        entry.pluralType = pluralType;
      }
      entry.possessor = possessor || null;
      return entry;
    }
    function buildOrdinaryNncParadigmSetResult({
      supported = false,
      stem = "",
      nounClass = "",
      animacy = "",
      openStem = false,
      entries = [],
      diagnostics = [],
      source = null
    } = {}) {
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported,
        stem,
        nounClass,
        animacy,
        openStem,
        entries,
        diagnostics,
        source
      };
    }
    function generateOrdinaryNncParadigmSet({
      stem = "",
      states = null,
      numbers = null,
      pluralTypes = null,
      possessors = null,
      subject = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(stem);
      const hasLegacyFormulaString = isOrdinaryNncLegacyFormulaString(stem);
      const requestedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || analogueInput?.nounClass || "");
      const normalizedStem = analogueInput?.stem || (hasLegacyFormulaString ? "" : normalizeOrdinaryNncText(stem).replace(/[()]/g, ""));
      const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy
      });
      const requestedStates = normalizeOrdinaryNncRequestedList(states, value => normalizeOrdinaryNncState(value));
      const requestedNumbers = normalizeOrdinaryNncRequestedList(numbers, normalizeOrdinaryNncNumber);
      const requestedPluralTypes = normalizeOrdinaryNncRequestedList(pluralTypes, normalizeOrdinaryNncPluralType);
      const requestedPossessors = normalizeOrdinaryNncRequestedList(possessors, normalizeOrdinaryNncRequestedPossessor);
      if (!fixture) {
        const state = requestedStates[0] || ORDINARY_NNC_STATE.absolutive;
        const number = requestedNumbers[0] || "singular";
        const pluralType = number === "plural" ? requestedPluralTypes[0] || ORDINARY_NNC_PLURAL_TYPE.auto : "";
        const possessor = state === ORDINARY_NNC_STATE.possessive ? requestedPossessors[0] || null : null;
        const directResult = generateOrdinaryNncParadigm({
          stem: normalizedStem,
          state,
          number,
          pluralType,
          subject,
          possessor,
          nounClass: requestedNounClass,
          animacy
        });
        return buildOrdinaryNncParadigmSetResult({
          supported: false,
          stem: normalizedStem,
          entries: [],
          diagnostics: (directResult.diagnostics || []).map(diagnostic => buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
            state,
            number,
            pluralType: directResult.pluralType || pluralType,
            possessor
          })).filter(Boolean),
          source: null
        });
      }
      const isOpenStemFixture = fixture.openStem === true;
      const fixtureClass = String(fixture.nounClass || "");
      const setStates = requestedStates.length ? requestedStates : getOrdinaryNncFixtureStates(fixture);
      const entries = [];
      const diagnostics = [];
      setStates.forEach(state => {
        const stateNumbers = requestedNumbers.length ? requestedNumbers : getOrdinaryNncFixtureNumbersForState(fixture, state);
        const effectiveNumbers = stateNumbers.length ? stateNumbers : ["singular"];
        effectiveNumbers.forEach(number => {
          const statePluralTypes = number === "plural" ? requestedPluralTypes.length ? requestedPluralTypes : getOrdinaryNncDefaultPluralTypesForFixture(fixture, state) : [""];
          statePluralTypes.forEach(pluralType => {
            if (state === ORDINARY_NNC_STATE.possessive) {
              const fixturePossessors = getOrdinaryNncFixturePossessorsForStateNumber(fixture, state, number);
              const statePossessors = requestedPossessors.length ? requestedPossessors : fixturePossessors.length ? fixturePossessors : getOrdinaryNncPossessorInventory();
              statePossessors.forEach(possessor => {
                const directResult = generateOrdinaryNncParadigm({
                  stem: fixture.stem || normalizedStem,
                  state,
                  number,
                  pluralType,
                  subject,
                  possessor,
                  nounClass: requestedNounClass,
                  animacy
                });
                if (directResult.supported) {
                  entries.push(directResult);
                  return;
                }
                (directResult.diagnostics || []).forEach(diagnostic => {
                  diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
                    state,
                    number,
                    pluralType: directResult.pluralType || pluralType,
                    possessor
                  }));
                });
              });
              return;
            }
            const directResult = generateOrdinaryNncParadigm({
              stem: fixture.stem || normalizedStem,
              state,
              number,
              pluralType,
              subject,
              nounClass: requestedNounClass,
              animacy
            });
            if (directResult.supported) {
              entries.push(directResult);
              return;
            }
            (directResult.diagnostics || []).forEach(diagnostic => {
              diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
                state,
                number,
                pluralType: directResult.pluralType || pluralType,
                possessor: null
              }));
            });
          });
        });
      });
      return buildOrdinaryNncParadigmSetResult({
        supported: entries.length > 0,
        stem: fixture.stem || normalizedStem,
        nounClass: fixtureClass,
        animacy: fixture.animacy || "",
        openStem: isOpenStemFixture,
        entries,
        diagnostics: diagnostics.filter(Boolean),
        source: isOpenStemFixture ? {
          fixtureId: "",
          sourceRefs: [],
          sourceKind: "open-stem"
        } : {
          fixtureId: fixture.id || "",
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : []
        }
      });
    }
    function generateOrdinaryNncClause(request = {}) {
      return generateOrdinaryNncParadigm(request);
    }
    function getOrdinaryNncFormulaWorkbenchSlotValue(slot = null, formulaSlots = {}) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      if (typeof targetObject.getAndrewsFormulaEchoSlotValue === "function") {
        return targetObject.getAndrewsFormulaEchoSlotValue(slot, formulaSlots);
      }
      if (slot.key === "predicateStem" || slot.id === "STEM") {
        return String(formulaSlots?.predicateStem?.stem || "");
      }
      if (slot.key === "pers1Pers2" || slot.id === "pers1-pers2") {
        const subject = formulaSlots?.pers1Pers2 || {};
        return `${subject.displayPrefix || subject.prefix || "Ø"}-${subject.displaySuffix || subject.suffix || "Ø"}`;
      }
      if (slot.key === "num1Num2" || slot.id === "num1-num2") {
        const connector = formulaSlots?.num1Num2 || {};
        return connector.displayConnector || connector.connector || connector.surface || "Ø";
      }
      return slot.token || "";
    }
    function buildOrdinaryNncFormulaWorkbenchSlotRecords(schema = null, formulaSlots = {}) {
      const slots = Array.isArray(schema?.slots) ? schema.slots : [];
      return slots.map(slot => {
        const value = getOrdinaryNncFormulaWorkbenchSlotValue(slot, formulaSlots);
        const sourceSlot = formulaSlots?.[slot.key] || formulaSlots?.[slot.id] || formulaSlots?.[slot.path] || {};
        const compactValue = slot.key === "num1Num2" || slot.id === "num1-num2" ? String(sourceSlot.compactDisplay || sourceSlot.connector || sourceSlot.surface || "Ø") : value;
        const missing = slot.requiredForEcho === true && !String(value || "").trim();
        return {
          id: slot.id || "",
          key: slot.key || "",
          label: slot.label || "",
          role: slot.role || "",
          owner: slot.owner || "",
          path: slot.path || "",
          boundary: slot.boundary || "",
          layer: slot.layer || "",
          position: slot.position || "",
          token: typeof targetObject.renderAndrewsFormulaSlotTemplate === "function" ? targetObject.renderAndrewsFormulaSlotTemplate(slot) : slot.wrapper === "parentheses" ? `(${slot.token || ""})` : slot.token || "",
          value,
          compactValue,
          renderedValue: missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${value})` : value}${slot.trailing || ""}`,
          compactRenderedValue: missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${compactValue})` : compactValue}${slot.trailing || ""}`,
          status: missing ? "missing" : slot.role === "nuclear-boundary" ? "structural" : "resolved",
          blockedInterpretations: Array.isArray(slot.blockedInterpretations) ? Array.from(slot.blockedInterpretations) : []
        };
      });
    }
    function normalizeOrdinaryNncFormulaWorkbenchInput(value = "") {
      const rawInput = String(value || "").trim();
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(rawInput);
      const hasLegacyFormulaString = isOrdinaryNncLegacyFormulaString(rawInput);
      const normalizedStem = analogueInput?.stem || (hasLegacyFormulaString ? "" : normalizeOrdinaryNncText(rawInput).replace(/[()#]/g, ""));
      return {
        rawInput,
        stem: normalizedStem,
        nounClass: normalizeOrdinaryNncNum1Num2Class(analogueInput?.nounClass || "") || "",
        predicateFormula: analogueInput?.predicateFormula || ""
      };
    }
    function buildOrdinaryNncFormulaWorkbenchExample({
      id = "",
      label = "",
      request = {}
    } = {}) {
      const result = generateOrdinaryNncParadigm(request);
      const formulaSlots = result?.clauseFrame?.formulaSlots || null;
      const connector = formulaSlots?.num1Num2 || result?.clauseFrame?.subject?.numberConnector || null;
      return {
        id: String(id || request.stem || ""),
        label: String(label || request.stem || ""),
        stem: result?.stem || request.stem || "",
        nounClass: result?.nounClass || request.nounClass || "",
        number: result?.number || request.number || "singular",
        pluralType: result?.pluralType || request.pluralType || "",
        supported: result?.supported === true,
        status: result?.supported === true ? "generated" : "unsupported",
        fullFormulaEcho: result?.clauseFrame?.fullFormulaEcho || (formulaSlots ? buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots) : ""),
        compactFormulaEcho: result?.clauseFrame?.compactFormulaEcho || result?.clauseFrame?.formulaEcho || (formulaSlots ? buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots) : ""),
        surface: result?.result || "",
        surfaceForms: Array.isArray(result?.surfaceForms) ? Array.from(result.surfaceForms) : [],
        connectorDyad: connector?.displayDyad || "",
        connectorCompact: connector?.compactDisplay || connector?.connector || "",
        diagnostics: Array.isArray(result?.diagnostics) ? result.diagnostics : []
      };
    }
    function buildOrdinaryNncFormulaWorkbenchExamples() {
      return [buildOrdinaryNncFormulaWorkbenchExample({
        id: "zero-common-kal",
        label: "zero/common",
        request: {
          stem: "kal",
          state: "absolutive",
          number: "singular"
        }
      }), buildOrdinaryNncFormulaWorkbenchExample({
        id: "t-class-siwa",
        label: "t class",
        request: {
          stem: "siwa",
          state: "absolutive",
          nounClass: "t",
          number: "singular"
        }
      }), buildOrdinaryNncFormulaWorkbenchExample({
        id: "ti-class-xilun",
        label: "ti class",
        request: {
          stem: "xilun",
          state: "absolutive",
          nounClass: "ti",
          number: "singular"
        }
      }), buildOrdinaryNncFormulaWorkbenchExample({
        id: "in-class-tekpan",
        label: "in class",
        request: {
          stem: "tekpan",
          state: "absolutive",
          nounClass: "in",
          number: "singular"
        }
      }), buildOrdinaryNncFormulaWorkbenchExample({
        id: "animate-count-mistun",
        label: "animate plural count",
        request: {
          stem: "mistun",
          state: "absolutive",
          number: "plural",
          pluralType: "count"
        }
      })];
    }
    function buildOrdinaryNncFormulaWorkbenchSlice({
      inputValue = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
      subject = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      const schema = getOrdinaryNncFormulaSchema();
      const parsedInput = normalizeOrdinaryNncFormulaWorkbenchInput(inputValue);
      const resolvedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || parsedInput.nounClass || "") || "";
      const normalizedState = normalizeOrdinaryNncState(state);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const formula = renderOrdinaryNncFormulaTemplate();
      const baseFormulaSlots = buildOrdinaryNncFormulaSlots({
        stem: parsedInput.stem,
        state: normalizedState,
        number: normalizedNumber,
        pluralType,
        subject,
        nounClass: resolvedNounClass
      });
      const sourceRequirementCheck = typeof targetObject.evaluateAndrewsFormulaSourceRequirements === "function" ? targetObject.evaluateAndrewsFormulaSourceRequirements("ordinary-nnc-shell", {
        inputValue: parsedInput.stem,
        slotValues: baseFormulaSlots,
        sourceValues: {
          predicateStem: parsedInput.stem,
          "predicate.stem": parsedInput.stem,
          STEM: parsedInput.stem
        }
      }) : {
        ok: Boolean(parsedInput.stem),
        diagnostics: parsedInput.stem ? [] : [{
          id: "ordinary-nnc-missing-predicate-stem",
          severity: "blocked",
          message: "Ordinary NNC/S requires a predicate nounstem inside the parentheses."
        }],
        generationContract: schema?.generationContract || null,
        sourceRequirements: schema?.sourceRequirements || [],
        missingRequirements: parsedInput.stem ? [] : [{
          id: "ordinary-nnc-predicate-stem"
        }],
        satisfiedRequirements: parsedInput.stem ? [{
          id: "ordinary-nnc-predicate-stem"
        }] : []
      };
      const formulaAuthority = typeof targetObject.evaluateAndrewsFormulaGenerationAuthority === "function" ? targetObject.evaluateAndrewsFormulaGenerationAuthority("ordinary-nnc-shell", {
        inputValue: parsedInput.stem,
        slotValues: baseFormulaSlots,
        sourceValues: {
          predicateStem: parsedInput.stem,
          "predicate.stem": parsedInput.stem,
          STEM: parsedInput.stem
        }
      }) : {
        ok: Boolean(parsedInput.stem && sourceRequirementCheck.ok),
        allowed: Boolean(parsedInput.stem && sourceRequirementCheck.ok),
        gate: parsedInput.stem && sourceRequirementCheck.ok ? "andrews-formula-authorized-generation" : "andrews-formula-generation-blocked",
        status: parsedInput.stem && sourceRequirementCheck.ok ? "generated" : "blocked",
        authority: "Andrews PDF",
        logicAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil orthography bridge",
        orthographyBoundary: "orthography-realization",
        spellingEvidenceRole: "spelling-realization-only",
        classicalSurfaceImport: "blocked",
        blockedReasons: parsedInput.stem && sourceRequirementCheck.ok ? [] : ["formula-source-requirement-missing"],
        generationContract: sourceRequirementCheck.generationContract || null
      };
      const result = parsedInput.stem ? generateOrdinaryNncParadigm({
        stem: parsedInput.stem,
        state: normalizedState,
        subject,
        number: normalizedNumber,
        pluralType,
        nounClass: resolvedNounClass,
        animacy
      }) : null;
      const formulaSlots = result?.clauseFrame?.formulaSlots || baseFormulaSlots;
      const slotRecords = buildOrdinaryNncFormulaWorkbenchSlotRecords(schema, formulaSlots);
      const compactFormulaEcho = result?.clauseFrame?.compactFormulaEcho || result?.clauseFrame?.formulaEcho || buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots) || "";
      const fullFormulaEcho = result?.clauseFrame?.fullFormulaEcho || buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots) || "";
      const slotBlockDiagnostics = ["tense", "stem-suffix"].map(interpretation => typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation("ordinary-nnc-shell", "num1-num2", interpretation).diagnostic : null).filter(Boolean);
      const resultDiagnostics = Array.isArray(result?.diagnostics) ? result.diagnostics : [];
      const generationAllowed = Boolean(formulaAuthority.allowed && result?.supported === true);
      const generationStatus = !parsedInput.stem ? "blocked" : generationAllowed ? "generated" : "unsupported";
      return {
        kind: "ordinary-nnc-formula-workbench-slice",
        version: 1,
        formulaSchemaId: schema?.id || "ordinary-nnc-shell",
        formulaSchemaVersion: schema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula,
        formulaEcho: compactFormulaEcho,
        compactFormulaEcho,
        fullFormulaEcho,
        hasTensePosition: schema?.hasTensePosition === true,
        sourceMaterial: {
          rawInput: parsedInput.rawInput,
          stem: parsedInput.stem,
          nounClass: resolvedNounClass || result?.nounClass || "",
          sourceKind: result?.source?.sourceKind || (parsedInput.stem ? "open-stem-or-fixture" : ""),
          fixtureId: result?.source?.fixtureId || ""
        },
        sourceRequirements: sourceRequirementCheck.sourceRequirements || [],
        missingRequirements: sourceRequirementCheck.missingRequirements || [],
        satisfiedRequirements: sourceRequirementCheck.satisfiedRequirements || [],
        parsedSlots: slotRecords,
        examples: buildOrdinaryNncFormulaWorkbenchExamples(),
        evidenceRefs: [...(Array.isArray(schema?.evidenceRefs) ? schema.evidenceRefs : []), ...(Array.isArray(result?.source?.sourceRefs) ? result.source.sourceRefs : [])].filter(Boolean),
        generation: {
          allowed: generationAllowed,
          status: generationStatus,
          formulaAuthorityAllowed: formulaAuthority.allowed === true,
          formulaAuthorityGate: formulaAuthority.gate || "",
          formulaAuthorityStatus: formulaAuthority.status || "",
          logicAuthority: formulaAuthority.logicAuthority || formulaAuthority.authority || "Andrews PDF",
          orthographyAuthority: formulaAuthority.orthographyAuthority || "Nawat/Pipil orthography bridge",
          orthographyBoundary: formulaAuthority.orthographyBoundary || "orthography-realization",
          spellingEvidenceRole: formulaAuthority.spellingEvidenceRole || "spelling-realization-only",
          classicalSurfaceImport: formulaAuthority.classicalSurfaceImport || "blocked",
          formulaAuthorityBlockedReasons: Array.isArray(formulaAuthority.blockedReasons) ? Array.from(formulaAuthority.blockedReasons) : [],
          routeFamily: sourceRequirementCheck.generationContract?.routeFamily || "ordinary-nnc",
          routeStage: sourceRequirementCheck.generationContract?.routeStage || "formula-workbench",
          outputPolicy: sourceRequirementCheck.generationContract?.outputPolicy || "",
          surface: result?.result || "",
          surfaceForms: Array.isArray(result?.surfaceForms) ? Array.from(result.surfaceForms) : [],
          sourceKind: result?.source?.sourceKind || ""
        },
        diagnostics: [...(Array.isArray(sourceRequirementCheck.diagnostics) ? sourceRequirementCheck.diagnostics : []), ...resultDiagnostics, ...slotBlockDiagnostics]
      };
    }
    const POSSESSIVE_STATE_NNC_SPECIFIC_POSSESSOR_SPECS = Object.freeze({
      nu: Object.freeze({
        id: "1sg",
        personSubKey: "1sg",
        andrewsStructural: "n-o",
        nawatFormula: "n-u",
        nawatRealization: "nu",
        gloss: "my",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      }),
      tu: Object.freeze({
        id: "1pl",
        personSubKey: "1pl",
        andrewsStructural: "t-o",
        nawatFormula: "t-u",
        nawatRealization: "tu",
        gloss: "our",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      }),
      mu: Object.freeze({
        id: "2sg",
        personSubKey: "2sg",
        andrewsStructural: "m-o",
        nawatFormula: "m-u",
        nawatRealization: "mu",
        gloss: "your (sg)",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      }),
      anmu: Object.freeze({
        id: "2pl",
        personSubKey: "2pl",
        andrewsStructural: "am-o",
        nawatFormula: "an-mu",
        nawatRealization: "anmu",
        gloss: "your (pl)",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      }),
      i: Object.freeze({
        id: "3sg",
        personSubKey: "3sg",
        andrewsStructural: "i-0",
        nawatFormula: "i-Ø",
        nawatRealization: "i",
        gloss: "his/her/its",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      }),
      in: Object.freeze({
        id: "3pl",
        personSubKey: "3pl",
        andrewsStructural: "i-n",
        nawatFormula: "i-n",
        nawatRealization: "in",
        gloss: "their",
        source: "Andrews 13.6 + current Nawat possessor prefix"
      })
    });
    const POSSESSIVE_STATE_NNC_MONADIC_POSSESSOR_SPECS = Object.freeze({
      te: Object.freeze({
        id: "human-nonspecific",
        andrewsStructural: "te",
        nawatRealization: "te",
        gloss: "someone's",
        source: "Andrews 13.4",
        status: "andrews-logic-generated"
      }),
      ta: Object.freeze({
        id: "nonhuman-nonspecific",
        andrewsStructural: "tla",
        nawatRealization: "ta",
        gloss: "something's",
        source: "Andrews 13.4; Classical tla maps structurally to Nawat ta",
        status: "andrews-logic-generated"
      }),
      ne: Object.freeze({
        id: "reciprocative",
        andrewsStructural: "ne",
        nawatRealization: "ne",
        gloss: "one another's",
        source: "Andrews 13.4",
        status: "andrews-logic-generated"
      })
    });
    function getPossessiveStateNncFormulaSchema() {
      return typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema("possessive-state-nnc") : null;
    }
    function getPossessiveStateNncFormulaSlotDefinition(slotId = "") {
      return typeof targetObject.getAndrewsFormulaSlotDefinition === "function" ? targetObject.getAndrewsFormulaSlotDefinition("possessive-state-nnc", slotId) : null;
    }
    function normalizePossessiveStateNncWorkbenchInput(value = "") {
      const rawInput = String(value || "").trim();
      const normalizedStem = normalizeOrdinaryNncText(rawInput).replace(/[()#]/g, "");
      return {
        rawInput,
        stem: normalizedStem
      };
    }
    function getPossessiveStateNncSpecificPossessorSpec(prefix = "nu") {
      const normalized = String(prefix || "nu").trim();
      return POSSESSIVE_STATE_NNC_SPECIFIC_POSSESSOR_SPECS[normalized] || POSSESSIVE_STATE_NNC_SPECIFIC_POSSESSOR_SPECS.nu;
    }
    function getPossessiveStateNncMonadicPossessorSpec(key = "te") {
      const normalized = String(key || "te").trim();
      return POSSESSIVE_STATE_NNC_MONADIC_POSSESSOR_SPECS[normalized] || POSSESSIVE_STATE_NNC_MONADIC_POSSESSOR_SPECS.te;
    }
    function buildPossessiveStateNncStateSlot({
      kind = "specific",
      possessor = "nu"
    } = {}) {
      const schema = getPossessiveStateNncFormulaSchema();
      const slotDefinition = getPossessiveStateNncFormulaSlotDefinition("st1-st2") || {};
      const isMonadic = String(kind || "") === "monadic";
      const spec = isMonadic ? getPossessiveStateNncMonadicPossessorSpec(possessor) : getPossessiveStateNncSpecificPossessorSpec(possessor);
      const structuralDisplay = spec.andrewsStructural || "";
      const nawatFormulaDisplay = spec.nawatFormula || spec.nawatDisplay || spec.nawatRealization || structuralDisplay;
      const compactDisplay = spec.nawatRealization || nawatFormulaDisplay;
      return {
        role: slotDefinition.role || "possessive-state",
        formulaSchemaId: schema?.id || "possessive-state-nnc",
        formulaSlot: isMonadic ? "st" : slotDefinition.id || "st1-st2",
        slot: slotDefinition.path || "predicate.state.st1-st2",
        owner: slotDefinition.owner || "predicate",
        belongsTo: slotDefinition.owner || "predicate",
        statePosition: isMonadic ? "monadic" : "dyadic",
        stateSlot: isMonadic ? "st" : "st1-st2",
        possessorKind: isMonadic ? "nonspecific-monadic" : "specific-dyadic",
        possessorId: spec.id || "",
        possessorPrefix: isMonadic ? "" : compactDisplay,
        andrewsStructural: structuralDisplay,
        structuralDisplay,
        display: structuralDisplay,
        value: structuralDisplay,
        nawatRealization: nawatFormulaDisplay,
        nawatDisplay: nawatFormulaDisplay,
        compactDisplay,
        surface: compactDisplay,
        gloss: spec.gloss || "",
        evidenceSource: spec.source || "",
        spellingAuthority: "Nawat/Pipil orthography bridge",
        classicalStructuralOnly: true,
        noClassicalSurfaceImport: true,
        generationStatus: isMonadic ? spec.status || "source-gated" : "generated",
        blockedInterpretations: Array.isArray(slotDefinition.blockedInterpretations) ? Array.from(slotDefinition.blockedInterpretations) : ["subject-connector", "tense"],
        notSubjectConnector: true,
        notSubjectNumber: true,
        notTense: true
      };
    }
    function buildPossessiveStateNncFormulaSlots({
      stem = "",
      subject = null,
      number = "singular",
      pluralType = "",
      nounClass = "zero",
      possessorKind = "specific",
      possessor = "nu"
    } = {}) {
      const subjectSlotDefinition = getPossessiveStateNncFormulaSlotDefinition("pers1-pers2") || {};
      const predicateSlotDefinition = getPossessiveStateNncFormulaSlotDefinition("STEM") || {};
      const connectorSlotDefinition = getPossessiveStateNncFormulaSlotDefinition("num1-num2") || {};
      const connector = buildOrdinaryNncNum1Num2({
        nounClass,
        state: ORDINARY_NNC_STATE.possessive,
        number,
        pluralType
      });
      return {
        pers1Pers2: {
          role: subjectSlotDefinition.role || "subject-person",
          slot: subjectSlotDefinition.id || "pers1-pers2",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
          displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
          label: String(subject?.personSubKey || "3sg")
        },
        possessiveState: buildPossessiveStateNncStateSlot({
          kind: possessorKind,
          possessor
        }),
        predicateStem: {
          role: "predicate",
          slot: predicateSlotDefinition.id || "STEM",
          stem,
          state: ORDINARY_NNC_STATE.possessive
        },
        num1Num2: {
          role: connectorSlotDefinition.role || "subject-number-connector",
          slot: connectorSlotDefinition.id || "num1-num2",
          nounClass: connector.nounStemClass,
          connector: connector.displaySurface,
          surface: connector.surface,
          compactDisplay: connector.compactDisplay,
          compactSurface: connector.compactSurface,
          num1: connector.num1,
          num2: connector.num2,
          displayNum1: connector.displayNum1,
          displayNum2: connector.displayNum2,
          displayDyad: connector.displayDyad,
          dyadSource: connector.dyadSource,
          label: "subject number connector",
          belongsTo: connector.belongsTo,
          referenceNumber: connector.referenceNumber,
          pluralType: connector.pluralType,
          blockedInterpretations: Array.isArray(connectorSlotDefinition.blockedInterpretations) ? Array.from(connectorSlotDefinition.blockedInterpretations) : ["tense", "stem-suffix", "nounstem", "predicate-state"],
          notPossessiveState: true,
          notTense: true
        }
      };
    }
    function getPossessiveStateNncFormulaSlotStateToken(formulaSlots = null) {
      return formulaSlots?.possessiveState?.statePosition === "monadic" ? "st" : "st1-st2";
    }
    function renderPossessiveStateNncFormulaTemplate(formulaSlots = null) {
      if (typeof targetObject.renderAndrewsFormulaTemplate !== "function") {
        return "";
      }
      return targetObject.renderAndrewsFormulaTemplate("possessive-state-nnc", {
        slotTokens: {
          possessiveState: getPossessiveStateNncFormulaSlotStateToken(formulaSlots)
        }
      });
    }
    function buildPossessiveStateNncFormulaEchoFromSlots(formulaSlots = null, {
      mode = "structural",
      expanded = true
    } = {}) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const stateSlot = formulaSlots.possessiveState || {};
      const displayState = mode === "compact" ? stateSlot.compactDisplay || stateSlot.surface || stateSlot.nawatDisplay || stateSlot.nawatRealization || stateSlot.display || "" : mode === "nawat" ? stateSlot.nawatDisplay || stateSlot.nawatRealization || stateSlot.compactDisplay || stateSlot.display || "" : stateSlot.structuralDisplay || stateSlot.andrewsStructural || stateSlot.display || "";
      const numberConnector = formulaSlots.num1Num2 || {};
      const compactConnector = numberConnector.compactDisplay || numberConnector.connector || numberConnector.surface || "Ø";
      const renderedNumberConnector = expanded ? {
        displayDyad: numberConnector.displayDyad || `${formatOrdinaryNncFormulaDyadSegment(numberConnector.num1)}-${formatOrdinaryNncFormulaDyadSegment(numberConnector.num2)}`,
        displayConnector: compactConnector
      } : {
        displayConnector: compactConnector
      };
      const echoSlots = {
        ...formulaSlots,
        possessiveState: {
          ...stateSlot,
          display: displayState,
          value: displayState,
          surface: displayState
        },
        num1Num2: renderedNumberConnector
      };
      if (typeof targetObject.renderAndrewsFormulaEchoFromSchema === "function") {
        return targetObject.renderAndrewsFormulaEchoFromSchema("possessive-state-nnc", echoSlots);
      }
      const subject = formulaSlots.pers1Pers2 || {};
      const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const stem = String(formulaSlots.predicateStem?.stem || "");
      const connector = expanded ? renderedNumberConnector.displayDyad : renderedNumberConnector.displayConnector;
      return stem ? `#${prefix}-${suffix}+${displayState}(${stem})${connector}#` : "";
    }
    function buildPossessiveStateNncFormulaWorkbenchSlotRecords(schema = null, formulaSlots = {}) {
      const slots = Array.isArray(schema?.slots) ? schema.slots : [];
      return slots.map(slot => {
        const sourceSlot = formulaSlots?.[slot.key] || formulaSlots?.[slot.id] || formulaSlots?.[slot.path] || {};
        const structuralValue = slot.key === "possessiveState" ? String(sourceSlot.structuralDisplay || sourceSlot.andrewsStructural || sourceSlot.display || "") : getOrdinaryNncFormulaWorkbenchSlotValue(slot, formulaSlots);
        const nawatValue = slot.key === "possessiveState" ? String(sourceSlot.nawatDisplay || sourceSlot.nawatRealization || sourceSlot.compactDisplay || structuralValue) : slot.key === "num1Num2" || slot.id === "num1-num2" ? String(sourceSlot.displayDyad || structuralValue || "Ø") : structuralValue;
        const compactValue = slot.key === "num1Num2" || slot.id === "num1-num2" ? String(sourceSlot.compactDisplay || sourceSlot.connector || sourceSlot.surface || "Ø") : slot.key === "possessiveState" ? String(sourceSlot.compactDisplay || nawatValue || structuralValue) : structuralValue;
        const missing = slot.requiredForEcho === true && !String(structuralValue || "").trim();
        const renderedValue = missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${structuralValue})` : structuralValue}${slot.trailing || ""}`;
        return {
          id: slot.id || "",
          key: slot.key || "",
          label: slot.label || "",
          role: slot.role || "",
          owner: slot.owner || "",
          path: slot.path || "",
          boundary: slot.boundary || "",
          layer: slot.layer || "",
          position: slot.position || "",
          token: slot.key === "possessiveState" ? sourceSlot.stateSlot || slot.token || slot.id || "" : typeof targetObject.renderAndrewsFormulaSlotTemplate === "function" ? targetObject.renderAndrewsFormulaSlotTemplate(slot) : slot.wrapper === "parentheses" ? `(${slot.token || ""})` : slot.token || "",
          value: structuralValue,
          structuralValue,
          nawatValue,
          compactValue,
          renderedValue,
          compactRenderedValue: missing ? "" : `${slot.leading || ""}${slot.wrapper === "parentheses" ? `(${compactValue})` : compactValue}${slot.trailing || ""}`,
          status: missing ? "missing" : slot.role === "nuclear-boundary" ? "structural" : "resolved",
          modelFields: [{
            label: "owner",
            value: slot.owner || ""
          }, {
            label: "path",
            value: slot.path || ""
          }, ...(slot.key === "possessiveState" ? [{
            label: "Andrews",
            value: structuralValue
          }, {
            label: "Nawat",
            value: nawatValue
          }, {
            label: "position",
            value: sourceSlot.statePosition || ""
          }] : []), ...(slot.key === "num1Num2" ? [{
            label: "dyad",
            value: structuralValue
          }, {
            label: "not",
            value: "tense/state"
          }] : [])].filter(entry => entry.value),
          blockedInterpretations: Array.isArray(slot.blockedInterpretations) ? Array.from(slot.blockedInterpretations) : []
        };
      });
    }
    function getPossessiveStateNncMonadicSourceSignature(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      return JSON.stringify({
        stem: String(slots.predicateStem?.stem || ""),
        statePosition: String(slots.possessiveState?.statePosition || ""),
        stateSlot: String(slots.possessiveState?.stateSlot || ""),
        compactDisplay: String(slots.possessiveState?.compactDisplay || slots.possessiveState?.surface || ""),
        connector: String(slots.num1Num2?.compactDisplay || slots.num1Num2?.connector || slots.num1Num2?.surface || "")
      });
    }
    function buildPossessiveStateNncMonadicSourceFrame({
      formulaSlots = null
    } = {}) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
      const stem = normalizeOrdinaryNncText(slots?.predicateStem?.stem || "").replace(/[()#]/g, "");
      const stateSlot = slots?.possessiveState || null;
      const stateSurface = String(stateSlot?.compactDisplay || stateSlot?.surface || stateSlot?.nawatRealization || "").trim();
      if (!slots || !stem || stateSlot?.statePosition !== "monadic" || !stateSurface) {
        return null;
      }
      return Object.freeze({
        kind: "possessive-state-nnc-monadic-source-frame",
        version: 1,
        formulaSchemaId: "possessive-state-nnc",
        routeFamily: "possessive-state-nnc",
        routeStage: "monadic-state-realization",
        formulaSlots: slots,
        predicateStem: stem,
        stateSlot: stateSlot.stateSlot || "st",
        stateSurface,
        sourceSignature: getPossessiveStateNncMonadicSourceSignature(slots),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil orthography bridge"
      });
    }
    function buildPossessiveStateNncMonadicOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "possessive-state-nnc-monadic-source-frame") {
        return null;
      }
      const stateSurface = String(sourceFrame.stateSurface || "");
      const predicateStem = String(sourceFrame.predicateStem || "");
      if (!stateSurface || !predicateStem) {
        return null;
      }
      const targetFrame = Object.freeze({
        kind: "possessive-state-nnc-monadic-target-frame",
        surface: `${stateSurface}${predicateStem}`,
        segmentFrames: Object.freeze([Object.freeze({
          role: "predicate-state",
          slot: "possessiveState",
          surface: stateSurface,
          formulaValue: sourceFrame.stateSlot || "st"
        }), Object.freeze({
          role: "predicate",
          slot: "STEM",
          surface: predicateStem,
          formulaValue: predicateStem
        })])
      });
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "possessive-state-nnc-monadic-realization",
        family: "possessive-state-nnc",
        routeFamily: "possessive-state-nnc",
        routeStage: "monadic-state-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame,
        operationApplied: "realize-monadic-possessive-state-from-formula-frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getPossessiveStateNncMonadicFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "possessive-state-nnc-monadic-source-frame") {
        return "possessive-state-nnc-monadic-source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "possessive-state-nnc-monadic-realization" || operationFrame.routeFamily !== "possessive-state-nnc" || operationFrame.operationApplied !== "realize-monadic-possessive-state-from-formula-frame" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "possessive-state-nnc-monadic-operation-frame-required";
      }
      if (String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "possessive-state-nnc-monadic-contradictory-source-frame";
      }
      const expectedSurface = `${sourceFrame.stateSurface || ""}${sourceFrame.predicateStem || ""}`;
      if (String(operationFrame.targetFrame?.surface || "") !== expectedSurface) {
        return "possessive-state-nnc-monadic-contradictory-target-frame";
      }
      return "";
    }
    function buildPossessiveStateNncFormulaWorkbenchExample({
      id = "",
      label = "",
      stem = "kal",
      possessorKind = "specific",
      possessor = "nu",
      number = "singular",
      nounClass = "zero",
      formulaSlots: sourceFormulaSlots = null,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "") || "kal";
      const normalizedKind = possessorKind === "monadic" ? "monadic" : "specific";
      const formulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : normalizedKind === "specific" ? buildPossessiveStateNncFormulaSlots({
        stem: normalizedStem,
        number,
        nounClass,
        possessorKind: normalizedKind,
        possessor
      }) : null;
      const structuralFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(formulaSlots, {
        mode: "structural",
        expanded: true
      });
      const nawatFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(formulaSlots, {
        mode: "nawat",
        expanded: true
      });
      const compactFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(formulaSlots, {
        mode: "compact",
        expanded: false
      });
      const result = normalizedKind === "specific" ? generateOrdinaryNncParadigm({
        stem: normalizedStem,
        state: ORDINARY_NNC_STATE.possessive,
        possessor,
        number,
        nounClass
      }) : null;
      const resolvedSourceFrame = normalizedKind === "monadic" ? sourceFrame || buildPossessiveStateNncMonadicSourceFrame({
        formulaSlots
      }) : null;
      const resolvedOperationFrame = normalizedKind === "monadic" ? operationFrame || buildPossessiveStateNncMonadicOperationFrame(resolvedSourceFrame) : null;
      const monadicMismatch = normalizedKind === "monadic" ? getPossessiveStateNncMonadicFrameMismatch({
        sourceFrame: resolvedSourceFrame,
        operationFrame: resolvedOperationFrame
      }) : "";
      const monadicSurface = normalizedKind === "monadic" && !monadicMismatch ? String(resolvedOperationFrame?.targetFrame?.surface || "") : "";
      const supported = normalizedKind === "specific" ? result?.supported === true : Boolean(monadicSurface);
      const surface = normalizedKind === "specific" ? supported ? result?.result || "" : "" : monadicSurface;
      const surfaceForms = normalizedKind === "specific" ? supported && Array.isArray(result?.surfaceForms) ? Array.from(result.surfaceForms) : [] : monadicSurface ? [monadicSurface] : [];
      const monadicDiagnostic = (() => {
        if (normalizedKind !== "monadic" || !monadicMismatch) {
          return null;
        }
        if (monadicMismatch.includes("operation")) {
          return buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.possessiveStateMonadicMissingOperationFrame, monadicMismatch);
        }
        if (monadicMismatch.includes("contradictory")) {
          return buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.possessiveStateMonadicContradictoryFrame, monadicMismatch);
        }
        return buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.possessiveStateMonadicMissingSourceFrame, monadicMismatch);
      })();
      return {
        id: String(id || `${normalizedKind}-${possessor}-${normalizedStem}`),
        label: String(label || (normalizedKind === "specific" ? "specific possessor" : "monadic possessor")),
        stem: normalizedKind === "monadic" ? String(formulaSlots?.predicateStem?.stem || normalizedStem) : normalizedStem,
        state: ORDINARY_NNC_STATE.possessive,
        statePosition: formulaSlots?.possessiveState?.statePosition || normalizedKind,
        possessorKind: formulaSlots?.possessiveState?.possessorKind || normalizedKind,
        possessor,
        formulaTemplate: renderPossessiveStateNncFormulaTemplate(formulaSlots),
        structuralFormulaEcho,
        fullFormulaEcho: structuralFormulaEcho,
        nawatFormulaEcho,
        compactFormulaEcho,
        surface,
        surfaceForms,
        supported,
        status: supported ? normalizedKind === "monadic" ? "andrews-logic-generated" : "generated" : "blocked",
        formulaSlots,
        slotModel: {
          possessiveState: formulaSlots?.possessiveState || null,
          num1Num2: formulaSlots?.num1Num2 || null
        },
        sourceFrame: resolvedSourceFrame,
        operationFrame: resolvedOperationFrame,
        diagnostics: monadicDiagnostic ? [monadicDiagnostic] : []
      };
    }
    function buildPossessiveStateNncFormulaWorkbenchExamples(stem = "kal") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "") || "kal";
      const monadicFormulaSlots = buildPossessiveStateNncFormulaSlots({
        stem: normalizedStem,
        possessorKind: "monadic",
        possessor: "te"
      });
      return [buildPossessiveStateNncFormulaWorkbenchExample({
        id: "specific-1sg-nu-kal",
        label: "specific 1sg",
        stem: normalizedStem,
        possessorKind: "specific",
        possessor: "nu"
      }), buildPossessiveStateNncFormulaWorkbenchExample({
        id: "monadic-human-te-kal",
        label: "monadic nonspecific",
        stem: "display-stem-ignored",
        possessorKind: "monadic",
        possessor: "te",
        formulaSlots: monadicFormulaSlots
      })];
    }
    function buildPossessiveStateNncFormulaWorkbenchSlice({
      inputValue = "",
      possessor = "nu"
    } = {}) {
      const schema = getPossessiveStateNncFormulaSchema();
      const parsedInput = normalizePossessiveStateNncWorkbenchInput(inputValue);
      const normalizedStem = parsedInput.stem;
      const formulaSlots = buildPossessiveStateNncFormulaSlots({
        stem: normalizedStem,
        possessorKind: "specific",
        possessor
      });
      const sourceRequirementCheck = typeof targetObject.evaluateAndrewsFormulaSourceRequirements === "function" ? targetObject.evaluateAndrewsFormulaSourceRequirements("possessive-state-nnc", {
        inputValue: normalizedStem,
        slotValues: formulaSlots,
        sourceValues: {
          predicateStem: normalizedStem,
          "predicate.stem": normalizedStem,
          STEM: normalizedStem
        }
      }) : {
        ok: Boolean(normalizedStem),
        diagnostics: normalizedStem ? [] : [{
          id: "possessive-nnc-missing-predicate-stem",
          severity: "blocked",
          message: "Possessive-state NNC requires a predicate nounstem inside the parentheses."
        }],
        generationContract: schema?.generationContract || null,
        sourceRequirements: schema?.sourceRequirements || [],
        missingRequirements: normalizedStem ? [] : [{
          id: "possessive-nnc-predicate-stem"
        }],
        satisfiedRequirements: normalizedStem ? [{
          id: "possessive-nnc-predicate-stem"
        }] : []
      };
      const formulaAuthority = typeof targetObject.evaluateAndrewsFormulaGenerationAuthority === "function" ? targetObject.evaluateAndrewsFormulaGenerationAuthority("possessive-state-nnc", {
        inputValue: normalizedStem,
        slotValues: formulaSlots,
        sourceValues: {
          predicateStem: normalizedStem,
          "predicate.stem": normalizedStem,
          STEM: normalizedStem
        }
      }) : {
        ok: Boolean(normalizedStem && sourceRequirementCheck.ok),
        allowed: Boolean(normalizedStem && sourceRequirementCheck.ok),
        gate: normalizedStem && sourceRequirementCheck.ok ? "andrews-formula-authorized-generation" : "andrews-formula-generation-blocked",
        status: normalizedStem && sourceRequirementCheck.ok ? "source-gated" : "blocked",
        authority: "Andrews PDF",
        logicAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil orthography bridge",
        orthographyBoundary: "orthography-realization",
        spellingEvidenceRole: "spelling-realization-only",
        classicalSurfaceImport: "blocked",
        blockedReasons: normalizedStem && sourceRequirementCheck.ok ? [] : ["formula-source-requirement-missing"],
        generationContract: sourceRequirementCheck.generationContract || null
      };
      const result = normalizedStem ? generateOrdinaryNncParadigm({
        stem: normalizedStem,
        state: ORDINARY_NNC_STATE.possessive,
        possessor,
        number: "singular"
      }) : null;
      const resultSlots = result?.supported && result?.clauseFrame?.formulaSlots ? buildPossessiveStateNncFormulaSlots({
        stem: result.stem || normalizedStem,
        number: result.number || "singular",
        nounClass: result.nounClass || "zero",
        possessorKind: "specific",
        possessor
      }) : formulaSlots;
      const structuralFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(resultSlots, {
        mode: "structural",
        expanded: true
      });
      const nawatFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(resultSlots, {
        mode: "nawat",
        expanded: true
      });
      const compactFormulaEcho = buildPossessiveStateNncFormulaEchoFromSlots(resultSlots, {
        mode: "compact",
        expanded: false
      });
      const resultDiagnostics = Array.isArray(result?.diagnostics) ? result.diagnostics : [];
      const slotBlockDiagnostics = ["subject-connector", "tense"].map(interpretation => typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation("possessive-state-nnc", "st1-st2", interpretation).diagnostic : null).filter(Boolean);
      const numBlockDiagnostics = ["predicate-state", "tense"].map(interpretation => typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation("possessive-state-nnc", "num1-num2", interpretation).diagnostic : null).filter(Boolean);
      const generationAllowed = Boolean(formulaAuthority.allowed && result?.supported === true);
      const generationStatus = !normalizedStem ? "blocked" : generationAllowed ? "generated" : "unsupported";
      return {
        kind: "possessive-state-nnc-formula-workbench-slice",
        version: 1,
        formulaSchemaId: schema?.id || "possessive-state-nnc",
        formulaSchemaVersion: schema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: renderPossessiveStateNncFormulaTemplate(resultSlots),
        formulaFamilies: [{
          id: "monadic-possessive-state",
          label: "monadic",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("possessive-state-nnc", {
            slotTokens: {
              possessiveState: "st"
            }
          }) : "#pers1-pers2+st(STEM)num1-num2#"
        }, {
          id: "dyadic-possessive-state",
          label: "dyadic",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("possessive-state-nnc", {
            slotTokens: {
              possessiveState: "st1-st2"
            }
          }) : "#pers1-pers2+st1-st2(STEM)num1-num2#"
        }],
        formulaEcho: structuralFormulaEcho,
        fullFormulaEcho: structuralFormulaEcho,
        structuralFormulaEcho,
        nawatFormulaEcho,
        compactFormulaEcho,
        hasTensePosition: false,
        sourceMaterial: {
          rawInput: parsedInput.rawInput,
          stem: normalizedStem,
          inputKind: "possessive-state-nnc",
          placeholder: "kal",
          inputLabel: "Predicado posesivo",
          sourceKind: result?.source?.sourceKind || (normalizedStem ? "open-stem-or-fixture" : ""),
          fixtureId: result?.source?.fixtureId || ""
        },
        sourceRequirements: sourceRequirementCheck.sourceRequirements || [],
        missingRequirements: sourceRequirementCheck.missingRequirements || [],
        satisfiedRequirements: sourceRequirementCheck.satisfiedRequirements || [],
        parsedSlots: buildPossessiveStateNncFormulaWorkbenchSlotRecords(schema, resultSlots),
        examples: buildPossessiveStateNncFormulaWorkbenchExamples(normalizedStem || "kal"),
        evidenceRefs: [...(Array.isArray(schema?.evidenceRefs) ? schema.evidenceRefs : []), ...(Array.isArray(result?.source?.sourceRefs) ? result.source.sourceRefs : [])].filter(Boolean),
        realizationBoundary: {
          structuralFormulaEcho,
          nawatFormulaEcho,
          compactFormulaEcho,
          classicalStructuralOnly: true,
          noClassicalSurfaceImport: true,
          structuralExamples: ["hu-an", "uh-0", "hui-0"],
          nawatAuthority: "Nawat/Pipil orthography bridge; examples illustrate spelling only and do not gate grammar logic"
        },
        generation: {
          allowed: generationAllowed,
          status: generationStatus,
          formulaAuthorityAllowed: formulaAuthority.allowed === true,
          formulaAuthorityGate: formulaAuthority.gate || "",
          formulaAuthorityStatus: formulaAuthority.status || "",
          logicAuthority: formulaAuthority.logicAuthority || formulaAuthority.authority || "Andrews PDF",
          orthographyAuthority: formulaAuthority.orthographyAuthority || "Nawat/Pipil orthography bridge",
          orthographyBoundary: formulaAuthority.orthographyBoundary || "orthography-realization",
          spellingEvidenceRole: formulaAuthority.spellingEvidenceRole || "spelling-realization-only",
          classicalSurfaceImport: formulaAuthority.classicalSurfaceImport || "blocked",
          formulaAuthorityBlockedReasons: Array.isArray(formulaAuthority.blockedReasons) ? Array.from(formulaAuthority.blockedReasons) : [],
          routeFamily: sourceRequirementCheck.generationContract?.routeFamily || "possessive-state-nnc",
          routeStage: sourceRequirementCheck.generationContract?.routeStage || "formula-workbench",
          outputPolicy: sourceRequirementCheck.generationContract?.outputPolicy || "",
          surface: generationAllowed ? result?.result || "" : "",
          surfaceForms: generationAllowed && Array.isArray(result?.surfaceForms) ? Array.from(result.surfaceForms) : [],
          sourceKind: result?.source?.sourceKind || ""
        },
        diagnostics: [...(Array.isArray(sourceRequirementCheck.diagnostics) ? sourceRequirementCheck.diagnostics : []), ...resultDiagnostics, ...slotBlockDiagnostics, ...numBlockDiagnostics, {
          id: "possessive-state-classical-spelling-structural-only",
          severity: "note",
          message: "Andrews hu-an, uh-0, and hui-0 are structural connector evidence; displayed Nawat/Pipil surfaces pass through the orthography bridge."
        }]
      };
    }
    const SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID = "subject-number-connectors";
    function getSubjectNumberConnectorFormulaSchema() {
      return typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema(SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID) : null;
    }
    function normalizeSubjectNumberConnectorWorkbenchInput(value = "") {
      const rawInput = String(value || "").trim();
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(rawInput);
      const hasLegacyFormulaString = isOrdinaryNncLegacyFormulaString(rawInput);
      const normalizedStem = analogueInput?.stem || (hasLegacyFormulaString ? "" : normalizeOrdinaryNncText(rawInput).replace(/[()#]/g, ""));
      return {
        rawInput,
        stem: normalizedStem || "kal",
        explicitStem: Boolean(normalizedStem)
      };
    }
    function buildSubjectNumberConnectorFormulaWorkbenchSlotRecords(schema = null, {
      stem = "kal",
      subjectDyad = "Ø-Ø",
      numberStructural = "Ø-Ø",
      numberNawat = "Ø-Ø",
      numberCompact = "Ø"
    } = {}) {
      const slots = Array.isArray(schema?.slots) ? schema.slots : [];
      return slots.map(slot => {
        const structuralValue = (() => {
          if (slot.key === "pers1Pers2" || slot.id === "pers1-pers2") {
            return subjectDyad;
          }
          if (slot.key === "num1Num2" || slot.id === "num1-num2") {
            return numberStructural;
          }
          if (slot.key === "predicateSide" || slot.id === "predicate-side") {
            return `(${stem || "STEM"})`;
          }
          return slot.token || "";
        })();
        const nawatValue = slot.key === "num1Num2" || slot.id === "num1-num2" ? numberNawat : structuralValue;
        const compactValue = slot.key === "num1Num2" || slot.id === "num1-num2" ? numberCompact : structuralValue;
        return {
          id: slot.id || "",
          key: slot.key || "",
          label: slot.label || "",
          role: slot.role || "",
          owner: slot.owner || "",
          path: slot.path || "",
          boundary: slot.boundary || "",
          layer: slot.layer || "",
          position: slot.position || "",
          token: typeof targetObject.renderAndrewsFormulaSlotTemplate === "function" ? targetObject.renderAndrewsFormulaSlotTemplate(slot) : slot.token || slot.id || "",
          value: structuralValue,
          structuralValue,
          nawatValue,
          compactValue,
          renderedValue: structuralValue,
          compactRenderedValue: compactValue,
          status: "resolved",
          modelFields: [{
            label: "owner",
            value: slot.owner || ""
          }, {
            label: "path",
            value: slot.path || ""
          }, ...(slot.key === "pers1Pers2" ? [{
            label: "dyad",
            value: subjectDyad
          }, {
            label: "outside",
            value: "predicate"
          }, {
            label: "not",
            value: "state/tense/object"
          }] : []), ...(slot.key === "predicateSide" ? [{
            label: "boundary",
            value: "connectors stay outside"
          }, {
            label: "context",
            value: "stem/state/valence/tns differ by shell"
          }] : []), ...(slot.key === "num1Num2" ? [{
            label: "dyad",
            value: numberStructural
          }, {
            label: "Nawat",
            value: numberNawat
          }, {
            label: "not",
            value: "tense/object/state/stem suffix"
          }] : [])].filter(entry => entry.value),
          blockedInterpretations: Array.isArray(slot.blockedInterpretations) ? Array.from(slot.blockedInterpretations) : []
        };
      });
    }
    function buildSubjectNumberConnectorOrdinaryExample({
      id = "",
      label = "",
      stem = "kal",
      nounClass = "zero",
      number = "singular",
      pluralType = "",
      structuralNumberDyad = "",
      structuralConnectorSource = ""
    } = {}) {
      const result = generateOrdinaryNncParadigm({
        stem,
        state: ORDINARY_NNC_STATE.absolutive,
        nounClass,
        number,
        pluralType
      });
      const formulaSlots = result?.clauseFrame?.formulaSlots || buildOrdinaryNncFormulaSlots({
        stem,
        state: ORDINARY_NNC_STATE.absolutive,
        nounClass,
        number,
        pluralType
      });
      const connector = formulaSlots.num1Num2 || {};
      const structuralSlots = structuralNumberDyad ? {
        ...formulaSlots,
        num1Num2: {
          ...connector,
          displayDyad: structuralNumberDyad
        }
      } : formulaSlots;
      const structuralFormulaEcho = buildOrdinaryNncExpandedFormulaEchoFromSlots(structuralSlots);
      const nawatFormulaEcho = buildOrdinaryNncExpandedFormulaEchoFromSlots(formulaSlots);
      const compactFormulaEcho = buildOrdinaryNncCompactFormulaEchoFromSlots(formulaSlots);
      return {
        id: String(id || `ordinary-${stem}`),
        label: String(label || "ordinary NNC/S"),
        shell: "ordinary-nnc-shell",
        routeFamily: "ordinary-nnc",
        hasTensePosition: false,
        structuralFormulaEcho,
        fullFormulaEcho: structuralFormulaEcho,
        nawatFormulaEcho,
        compactFormulaEcho,
        surface: result?.result || "",
        surfaceForms: Array.isArray(result?.surfaceForms) ? Array.from(result.surfaceForms) : [],
        supported: result?.supported === true,
        status: result?.supported === true ? "generated" : "unsupported",
        connectorDyad: connector.displayDyad || "",
        connectorStructural: structuralNumberDyad || connector.displayDyad || "",
        connectorNawat: connector.displayDyad || "",
        connectorCompact: connector.compactDisplay || connector.connector || "",
        connectorSource: structuralConnectorSource || connector.dyadSource || "",
        numberOwner: connector.belongsTo || "subject",
        numberPath: "subject.num1-num2",
        stateOwner: "",
        valenceOwner: "",
        tenseOwner: "",
        formulaSlots,
        diagnostics: Array.isArray(result?.diagnostics) ? result.diagnostics : []
      };
    }
    function buildSubjectNumberConnectorPossessiveExample({
      stem = "kal",
      possessor = "nu"
    } = {}) {
      const example = buildPossessiveStateNncFormulaWorkbenchExample({
        id: "possessive-specific-1sg-nu-kal",
        label: "possessive state",
        stem,
        possessorKind: "specific",
        possessor
      });
      return {
        ...example,
        shell: "possessive-state-nnc",
        routeFamily: "possessive-state-nnc",
        hasTensePosition: false,
        connectorDyad: example.formulaSlots?.num1Num2?.displayDyad || "",
        connectorStructural: example.formulaSlots?.num1Num2?.displayDyad || "",
        connectorNawat: example.formulaSlots?.num1Num2?.displayDyad || "",
        connectorCompact: example.formulaSlots?.num1Num2?.compactDisplay || "",
        numberOwner: example.formulaSlots?.num1Num2?.belongsTo || "subject",
        numberPath: "subject.num1-num2",
        stateOwner: example.formulaSlots?.possessiveState?.owner || "predicate",
        statePath: example.formulaSlots?.possessiveState?.slot || "predicate.state.st1-st2",
        valenceOwner: "",
        tenseOwner: ""
      };
    }
    function buildSubjectNumberConnectorVncExample() {
      const vncSlice = typeof targetObject.buildVncValenceFormulaWorkbenchSlice === "function" ? targetObject.buildVncValenceFormulaWorkbenchSlice({
        inputValue: "ki-piya"
      }) : null;
      const slots = vncSlice?.parsedSlots || [];
      const valenceSlot = slots.find(slot => slot.key === "valence") || {};
      const tenseSlot = slots.find(slot => slot.key === "tensePosition") || {};
      const numberSlot = slots.find(slot => slot.key === "num1Num2") || {};
      return {
        id: "vnc-preterit-ki-piya",
        label: "VNC preterit number",
        shell: "vnc-shell",
        routeFamily: "vnc-valence",
        hasTensePosition: true,
        structuralFormulaEcho: vncSlice?.structuralFormulaEcho || "",
        fullFormulaEcho: vncSlice?.structuralFormulaEcho || "",
        nawatFormulaEcho: vncSlice?.nawatFormulaEcho || "",
        compactFormulaEcho: vncSlice?.compactFormulaEcho || "",
        surface: vncSlice?.generation?.surface || "",
        surfaceForms: Array.isArray(vncSlice?.generation?.surfaceForms) ? Array.from(vncSlice.generation.surfaceForms) : [],
        supported: vncSlice?.generation?.allowed === true,
        status: vncSlice?.generation?.status || "source-gated",
        connectorDyad: numberSlot.structuralValue || "",
        connectorStructural: numberSlot.structuralValue || "",
        connectorNawat: numberSlot.nawatValue || "",
        connectorCompact: numberSlot.compactValue || "",
        numberOwner: numberSlot.owner || "subject",
        numberPath: numberSlot.path || "subject.num1-num2",
        valenceOwner: valenceSlot.owner || "predicate",
        valencePath: valenceSlot.path || "predicate.valence.va1-va2",
        valenceStructural: valenceSlot.structuralValue || "",
        valenceNawat: valenceSlot.nawatValue || "",
        tenseOwner: tenseSlot.owner || "predicate",
        tensePath: tenseSlot.path || "predicate.tense",
        tenseStructural: tenseSlot.structuralValue || "",
        formulaSlots: vncSlice?.formulaSlots || null,
        diagnostics: Array.isArray(vncSlice?.diagnostics) ? Array.from(vncSlice.diagnostics) : []
      };
    }
    function buildSubjectNumberConnectorDiagnosticExample() {
      const diagnostic = typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation(SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID, "num1-num2", "tense").diagnostic : {
        id: "formula-slot-num1-num2-not-tense",
        severity: "blocked",
        message: "num1-num2 cannot be interpreted as tense."
      };
      return {
        id: "blocked-num1-num2-as-tense",
        label: "blocked tense reading",
        shell: SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID,
        routeFamily: "connector-diagnostic",
        hasTensePosition: false,
        structuralFormulaEcho: "#pers1-pers2(STEM)num1-num2#",
        fullFormulaEcho: "#pers1-pers2(STEM)num1-num2#",
        nawatFormulaEcho: "",
        compactFormulaEcho: "num1-num2 != tns",
        surface: "",
        surfaceForms: [],
        supported: false,
        status: "unsupported",
        connectorDyad: "num1-num2",
        connectorStructural: "num1-num2",
        connectorNawat: "",
        connectorCompact: "",
        numberOwner: "subject",
        numberPath: "subject.num1-num2",
        tenseOwner: "",
        valenceOwner: "",
        diagnostics: [diagnostic].filter(Boolean)
      };
    }
    function buildSubjectNumberConnectorFormulaWorkbenchExamples(stem = "kal") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "") || "kal";
      return [buildSubjectNumberConnectorOrdinaryExample({
        id: "ordinary-zero-common",
        label: "ordinary zero/common",
        stem: normalizedStem,
        nounClass: "zero",
        number: "singular"
      }), buildSubjectNumberConnectorOrdinaryExample({
        id: "ordinary-animate-count",
        label: "animate plural",
        stem: "mistun",
        nounClass: "zero",
        number: "plural",
        pluralType: ORDINARY_NNC_PLURAL_TYPE.count,
        structuralNumberDyad: "m-eh",
        structuralConnectorSource: "Andrews structural m-eh; Nawat/Pipil realization m-et"
      }), buildSubjectNumberConnectorPossessiveExample({
        stem: normalizedStem,
        possessor: "nu"
      }), buildSubjectNumberConnectorVncExample(), buildSubjectNumberConnectorDiagnosticExample()];
    }
    function buildSubjectNumberConnectorFormulaWorkbenchSlice({
      inputValue = ""
    } = {}) {
      const schema = getSubjectNumberConnectorFormulaSchema();
      const parsedInput = normalizeSubjectNumberConnectorWorkbenchInput(inputValue);
      const activeOrdinary = buildSubjectNumberConnectorOrdinaryExample({
        id: "active-ordinary-zero-common",
        label: "active ordinary",
        stem: parsedInput.stem,
        nounClass: "zero",
        number: "singular"
      });
      const slotBlockDiagnostics = [[SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID, "num1-num2", "tense"], [SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID, "num1-num2", "stem-suffix"], [SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID, "num1-num2", "object-valence"], [SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID, "num1-num2", "predicate-state"], ["vnc-shell", "tns", "subject-number-connector"]].map(([schemaId, slotId, interpretation]) => typeof targetObject.diagnoseAndrewsFormulaSlotInterpretation === "function" ? targetObject.diagnoseAndrewsFormulaSlotInterpretation(schemaId, slotId, interpretation).diagnostic : null).filter(Boolean);
      return {
        kind: "subject-number-connector-formula-workbench-slice",
        version: 1,
        formulaSchemaId: schema?.id || SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID,
        formulaSchemaVersion: schema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: schema?.compactFormula || "pers1-pers2 ... num1-num2",
        formulaFamilies: [{
          id: "ordinary-nnc-subject-number",
          label: "CNN/S",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("ordinary-nnc-shell") : "#pers1-pers2(STEM)num1-num2#"
        }, {
          id: "possessive-nnc-subject-number",
          label: "CNN posesiva",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("possessive-state-nnc") : "#pers1-pers2+st1-st2(STEM)num1-num2#"
        }, {
          id: "vnc-subject-number",
          label: "CNV",
          formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate("vnc-shell") : "#pers1-pers2+va1-va2(STEM)tns+num1-num2#"
        }],
        formulaEcho: activeOrdinary.structuralFormulaEcho,
        fullFormulaEcho: activeOrdinary.structuralFormulaEcho,
        structuralFormulaEcho: activeOrdinary.structuralFormulaEcho,
        nawatFormulaEcho: activeOrdinary.nawatFormulaEcho,
        compactFormulaEcho: activeOrdinary.compactFormulaEcho,
        hasTensePosition: null,
        sourceMaterial: {
          rawInput: parsedInput.explicitStem ? parsedInput.rawInput : "",
          stem: parsedInput.stem,
          inputKind: "subject-number-connectors",
          placeholder: "kal",
          inputLabel: "Predicado para auditar conectores",
          sourceKind: parsedInput.explicitStem ? "open-stem" : "default-example"
        },
        parsedSlots: buildSubjectNumberConnectorFormulaWorkbenchSlotRecords(schema, {
          stem: parsedInput.stem,
          subjectDyad: "Ø-Ø",
          numberStructural: activeOrdinary.connectorStructural || "Ø-Ø",
          numberNawat: activeOrdinary.connectorNawat || "Ø-Ø",
          numberCompact: activeOrdinary.connectorCompact || "Ø"
        }),
        examples: buildSubjectNumberConnectorFormulaWorkbenchExamples(parsedInput.stem),
        evidenceRefs: Array.isArray(schema?.evidenceRefs) ? Array.from(schema.evidenceRefs) : [],
        realizationBoundary: {
          structuralFormulaEcho: activeOrdinary.structuralFormulaEcho,
          nawatFormulaEcho: activeOrdinary.nawatFormulaEcho,
          compactFormulaEcho: activeOrdinary.compactFormulaEcho,
          classicalStructuralOnly: true,
          noClassicalSurfaceImport: true,
          structuralExamples: ["m-eh", "qui-0", "Ø-Ø"],
          nawatAuthority: "Nawat/Pipil connector realization: m-et for animate count plural and ki-0 ~ k-0 for scoped VNC preterit number"
        },
        generation: {
          allowed: activeOrdinary.supported === true,
          status: activeOrdinary.status || "generated",
          routeFamily: "subject-number-connectors",
          routeStage: "formula-workbench",
          outputPolicy: "Audit subject connector dyads across formula shells; do not treat num1-num2 as tense, object valence, state, or stem suffix.",
          surface: activeOrdinary.surface || "",
          surfaceForms: Array.isArray(activeOrdinary.surfaceForms) ? Array.from(activeOrdinary.surfaceForms) : [],
          sourceKind: "formula-workbench"
        },
        diagnostics: [...slotBlockDiagnostics, {
          id: "subject-number-connectors-preserve-dyads",
          severity: "note",
          message: "pers1-pers2 and num1-num2 are modeled as dyads even when compact display collapses zero or fused Nawat realization."
        }]
      };
    }
    function generateOrdinaryNncClauseSet(request = {}) {
      return generateOrdinaryNncParadigmSet(request);
    }
    function resolveOrdinaryNncFixture(request = {}) {
      const source = request && typeof request === "object" ? request : {
        stem: request
      };
      const rawInput = source.stem ?? source.input ?? source.rawStem ?? source.rawInput ?? source.value ?? "";
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(rawInput);
      const hasLegacyFormulaString = isOrdinaryNncLegacyFormulaString(rawInput);
      const normalizedInput = analogueInput?.stem || (hasLegacyFormulaString ? "" : normalizeOrdinaryNncText(rawInput).replace(/[()]/g, ""));
      const fixture = findOrdinaryNncFixture(normalizedInput);
      if (!fixture) {
        return null;
      }
      const fixtureStem = fixture.stem || normalizedInput;
      const paradigmSet = generateOrdinaryNncParadigmSet({
        stem: fixtureStem,
        states: source.states ?? source.state ?? null,
        numbers: source.numbers ?? source.number ?? null,
        pluralTypes: source.pluralTypes ?? source.pluralType ?? null,
        possessors: source.possessors ?? source.possessor ?? source.possessivePrefix ?? null,
        subject: source.subject ?? null,
        nounClass: source.nounClass || ""
      });
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: true,
        kind: "ordinary-nnc-fixture",
        input: String(rawInput || ""),
        normalizedInput,
        fixture: {
          id: fixture.id || "",
          stem: fixtureStem,
          lemma: fixture.lemma || "",
          nounClass: String(fixture.nounClass || ""),
          animacy: fixture.animacy || "",
          aliases: Array.isArray(fixture.aliases) ? [...fixture.aliases] : [],
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : []
        },
        paradigmSet
      };
    }
    function resolveNawatPossessorPrefixFromSourceSubject(subjectPrefix = "", subjectSuffix = "") {
      const prefix = String(subjectPrefix || "");
      const suffix = String(subjectSuffix || "");
      if (prefix === "ni" && suffix === "") {
        return "nu";
      }
      if (prefix === "ti" && suffix === "") {
        return "mu";
      }
      if (prefix === "" && suffix === "") {
        return "i";
      }
      if (prefix === "ti" && suffix === "t") {
        return "tu";
      }
      if (prefix === "an" && suffix === "t") {
        return "anmu";
      }
      if (prefix === "" && suffix === "t") {
        return "in";
      }
      return "";
    }
    function resolveInstrumentivoPossessorPrefixFromSourceSubject(subjectPrefix = "", subjectSuffix = "") {
      return resolveNawatPossessorPrefixFromSourceSubject(subjectPrefix, subjectSuffix);
    }
    function buildAndrewsSourceSubjectFrame({
      subjectPrefix = "",
      subjectSuffix = "",
      sourceUnit = "CNV",
      sourceTense = "",
      sourceFormulaRecord = null,
      sourceFormulaSlots = null
    } = {}) {
      const prefix = String(subjectPrefix || "").trim();
      const suffix = String(subjectSuffix || "").trim();
      const frame = {
        version: 1,
        kind: "andrews-source-subject-frame",
        sourceUnit: String(sourceUnit || "CNV").trim(),
        sourceTense: String(sourceTense || "").trim(),
        subject: {
          prefix,
          suffix,
          formulaSlots: {
            pers1: prefix,
            pers2: suffix,
            num2: suffix
          }
        },
        sourceFormulaRecord: sourceFormulaRecord && typeof sourceFormulaRecord === "object" ? sourceFormulaRecord : null,
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null
      };
      return Object.freeze(frame);
    }
    function isAndrewsSourceSubjectFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-source-subject-frame" && frame.subject && typeof frame.subject === "object");
    }
    function getAndrewsSourceSubjectFramePossessorPrefix(frame = null) {
      if (!isAndrewsSourceSubjectFrame(frame)) {
        return "";
      }
      return resolveNawatPossessorPrefixFromSourceSubject(frame.subject.prefix || "", frame.subject.suffix || "");
    }
    function buildSourceSubjectPossessorOperationFrame({
      sourceSubjectFrame = null,
      targetPossessivePrefix = "",
      nominalKind = "calificativo-instrumentivo",
      operationId = "",
      andrewsRef = ""
    } = {}) {
      const frame = isAndrewsSourceSubjectFrame(sourceSubjectFrame) ? sourceSubjectFrame : null;
      const resolvedOperationId = String(operationId || "").trim() || (String(nominalKind || "") === "instrumentivo" ? "andrews-36-6-instrumentive-source-subject-to-possessor" : "andrews-36-11-active-action-source-subject-to-possessor");
      const resolvedTargetPossessivePrefix = String(targetPossessivePrefix || "").trim() || getAndrewsSourceSubjectFramePossessorPrefix(frame);
      return Object.freeze({
        version: 1,
        kind: "andrews-source-subject-possessor-operation-frame",
        operationId: resolvedOperationId,
        operationApplied: "source-subject-transforms-to-target-possessor",
        nominalKind: String(nominalKind || "").trim(),
        andrewsRef: String(andrewsRef || "").trim() || (String(nominalKind || "") === "instrumentivo" ? "Andrews 36.6" : "Andrews 36.11"),
        sourceSubjectFrame: frame,
        sourceSubject: frame ? {
          prefix: String(frame.subject?.prefix || ""),
          suffix: String(frame.subject?.suffix || "")
        } : null,
        targetPossessivePrefix: resolvedTargetPossessivePrefix,
        operationFrame: {
          kind: "andrews-typed-operation-frame",
          operationId: resolvedOperationId,
          consumesRenderedInput: false,
          displayStringsAuthorizeGrammar: false,
          sourceRole: "source-vnc-subject",
          targetRole: "target-nnc-possessor"
        }
      });
    }
    function getSourceSubjectPossessorOperationFrameMismatch({
      operationFrame = null,
      sourceSubjectFrame = null,
      targetPossessivePrefix = "",
      nominalKind = "",
      operationId = ""
    } = {}) {
      if (!isAndrewsSourceSubjectFrame(sourceSubjectFrame)) {
        return "missing-source-subject-frame";
      }
      const expectedPossessor = getAndrewsSourceSubjectFramePossessorPrefix(sourceSubjectFrame);
      if (!expectedPossessor) {
        return "unmapped-source-subject";
      }
      if (!operationFrame || typeof operationFrame !== "object") {
        return "missing-operation-frame";
      }
      if (operationFrame.kind !== "andrews-source-subject-possessor-operation-frame" || operationFrame.operationFrame?.kind !== "andrews-typed-operation-frame") {
        return "missing-operation-frame";
      }
      const expectedOperationId = String(operationId || "").trim();
      if (expectedOperationId && String(operationFrame.operationId || "") !== expectedOperationId) {
        return "contradictory-operation-frame";
      }
      const expectedNominalKind = String(nominalKind || "").trim();
      if (expectedNominalKind && String(operationFrame.nominalKind || "") !== expectedNominalKind) {
        return "contradictory-operation-frame";
      }
      if (String(operationFrame.sourceSubject?.prefix || "") !== String(sourceSubjectFrame.subject?.prefix || "") || String(operationFrame.sourceSubject?.suffix || "") !== String(sourceSubjectFrame.subject?.suffix || "")) {
        return "contradictory-source-frame";
      }
      if (operationFrame.sourceSubjectFrame && operationFrame.sourceSubjectFrame !== sourceSubjectFrame) {
        const embedded = operationFrame.sourceSubjectFrame;
        if (!isAndrewsSourceSubjectFrame(embedded) || String(embedded.subject?.prefix || "") !== String(sourceSubjectFrame.subject?.prefix || "") || String(embedded.subject?.suffix || "") !== String(sourceSubjectFrame.subject?.suffix || "")) {
          return "contradictory-source-frame";
        }
      }
      const targetPrefix = String(targetPossessivePrefix || "").trim();
      const operationTargetPrefix = String(operationFrame.targetPossessivePrefix || "").trim();
      if (operationTargetPrefix !== expectedPossessor || targetPrefix && targetPrefix !== expectedPossessor) {
        return "contradictory-target-frame";
      }
      if (operationFrame.operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "missing-operation-frame";
      }
      return "";
    }
    function isSourceSubjectPossessorOperationFrame(operationFrame = null, options = {}) {
      return !getSourceSubjectPossessorOperationFrameMismatch({
        operationFrame,
        ...options
      });
    }
    function isInstrumentivoImperfectActiveAbsolutiveMode(mode = "") {
      return String(mode || "") === "absolutivo-imperfecto-activo" || String(mode || "") === String(targetObject.INSTRUMENTIVO_MODE.absolutivoImperfectoActivo || "");
    }
    function getPredicateNominalPreviousNonZeroSegment(value = "") {
      const tokens = String(value || "").toLowerCase().match(/[a-z]+/g) || [];
      return tokens.filter(token => token && token !== "0").pop() || "";
    }
    function resolvePredicateNominalAbsolutiveTtiConnector(value = "", fallback = "t", options = {}) {
      if (options.allowDiagnosticStringResolution !== true) {
        return "";
      }
      if (typeof targetObject.getTClassSuffixForStem === "function") {
        return targetObject.getTClassSuffixForStem(value) || String(fallback || "t");
      }
      const previousSegment = getPredicateNominalPreviousNonZeroSegment(value);
      const finalLetter = previousSegment.slice(-1);
      if (!finalLetter) {
        return String(fallback || "t");
      }
      return /[aeiou]/.test(finalLetter) ? "t" : "ti";
    }
    function shouldResolvePredicateNominalConnectorAsTti(connector = "") {
      return ["", "t", "ti"].includes(String(connector || ""));
    }
    function getPredicateNominalPreviousNonZeroSegmentFromStemSpec(stemSpec = null) {
      if (!stemSpec || typeof stemSpec !== "object") {
        return "";
      }
      if (stemSpec.kind === "literal") {
        return getPredicateNominalPreviousNonZeroSegment(stemSpec.surfaceStem || "");
      }
      if (stemSpec.kind === "base-suffix") {
        return getPredicateNominalPreviousNonZeroSegment(stemSpec.resultSuffix || stemSpec.sourceBase || "");
      }
      if (stemSpec.kind === "transform") {
        const transformKind = String(stemSpec.transformKind || "");
        if (transformKind === "append" && stemSpec.appendText) {
          const appendSegment = getPredicateNominalPreviousNonZeroSegment(stemSpec.appendText);
          if (appendSegment) {
            return appendSegment;
          }
        }
        if (transformKind === "prepend" && stemSpec.sourceStemSpec) {
          const sourceSegment = getPredicateNominalPreviousNonZeroSegmentFromStemSpec(stemSpec.sourceStemSpec);
          if (sourceSegment) {
            return sourceSegment;
          }
        }
        if (transformKind === "replace-suffix" && stemSpec.replacement) {
          const replacementSegment = getPredicateNominalPreviousNonZeroSegment(stemSpec.replacement);
          if (replacementSegment) {
            return replacementSegment;
          }
        }
        const sourceSpecSegment = getPredicateNominalPreviousNonZeroSegmentFromStemSpec(stemSpec.sourceStemSpec);
        if (sourceSpecSegment) {
          return sourceSpecSegment;
        }
        return getPredicateNominalPreviousNonZeroSegment(stemSpec.sourceStem || "");
      }
      return "";
    }
    function buildPredicateNominalConnectorOperationFrame({
      sourceTense = "imperfecto",
      nominalKind = targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
      nominalConnector = "t",
      operationId = "andrews-36-6-note-2-predicate-nominal-absolutive-tti-connector",
      andrewsRef = "Andrews 36.6 note 2"
    } = {}) {
      const resolvedOperationId = String(operationId || "").trim() || "andrews-36-6-note-2-predicate-nominal-absolutive-tti-connector";
      return Object.freeze({
        version: 1,
        kind: "andrews-predicate-nominal-connector-operation-frame",
        operationId: resolvedOperationId,
        operationApplied: "derive-target-absolutive-t-ti-from-source-predicate-stem-frame",
        nominalKind: String(nominalKind || targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal).trim(),
        sourceUnit: "vnc-predicate",
        sourceTense: targetObject.normalizePredicateNominalSourceTense(sourceTense),
        requestedConnector: String(nominalConnector || "t").trim(),
        targetConnectorFamily: "t/ti",
        andrewsRef: String(andrewsRef || "Andrews 36.6 note 2").trim(),
        operationFrame: {
          kind: "andrews-typed-operation-frame",
          operationId: resolvedOperationId,
          consumesRenderedInput: false,
          displayStringsAuthorizeGrammar: false,
          sourceRole: "source-vnc-predicate-stem-frame",
          targetRole: "target-nnc-absolutive-connector"
        }
      });
    }
    function getPredicateNominalConnectorOperationFrameMismatch({
      operationFrame = null,
      sourceTense = "imperfecto",
      nominalKind = targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
      nominalConnector = "t",
      operationId = "andrews-36-6-note-2-predicate-nominal-absolutive-tti-connector"
    } = {}) {
      if (!operationFrame || typeof operationFrame !== "object") {
        return "missing-operation-frame";
      }
      if (operationFrame.kind !== "andrews-predicate-nominal-connector-operation-frame" || operationFrame.operationFrame?.kind !== "andrews-typed-operation-frame") {
        return "missing-operation-frame";
      }
      if (operationFrame.operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "missing-operation-frame";
      }
      const expectedOperationId = String(operationId || "").trim();
      if (expectedOperationId && String(operationFrame.operationId || "") !== expectedOperationId) {
        return "contradictory-operation-frame";
      }
      if (String(operationFrame.targetConnectorFamily || "") !== "t/ti") {
        return "contradictory-operation-frame";
      }
      const expectedKind = String(nominalKind || targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal).trim();
      if (expectedKind && String(operationFrame.nominalKind || "") !== expectedKind) {
        return "contradictory-operation-frame";
      }
      const expectedSourceTense = targetObject.normalizePredicateNominalSourceTense(sourceTense);
      if (expectedSourceTense && String(operationFrame.sourceTense || "") !== expectedSourceTense) {
        return "contradictory-source-frame";
      }
      const requestedConnector = String(nominalConnector || "t").trim();
      if (!shouldResolvePredicateNominalConnectorAsTti(requestedConnector)) {
        return "";
      }
      const frameRequestedConnector = String(operationFrame.requestedConnector || "t").trim();
      if (!shouldResolvePredicateNominalConnectorAsTti(frameRequestedConnector)) {
        return "contradictory-operation-frame";
      }
      return "";
    }
    function resolvePredicateNominalAbsolutiveTtiConnectorFromFrame({
      operationFrame = null,
      predicateStemSpec = null,
      fallback = "t"
    } = {}) {
      if (!operationFrame || typeof operationFrame !== "object") {
        return "";
      }
      if (!predicateStemSpec || typeof predicateStemSpec !== "object" || !predicateStemSpec.kind) {
        return "";
      }
      const previousSegment = getPredicateNominalPreviousNonZeroSegmentFromStemSpec(predicateStemSpec);
      const finalLetter = previousSegment.slice(-1);
      if (!finalLetter) {
        return String(fallback || "t");
      }
      return /[aeiou]/.test(finalLetter) ? "t" : "ti";
    }
    function buildPredicateNominalFormulaDisplayStem(baseStem = "", sourceTenseSuffix = "", surfaceObjectPrefix = "") {
      const stem = String(baseStem || "");
      const suffix = String(sourceTenseSuffix || "");
      const objectPrefix = String(surfaceObjectPrefix || "");
      const displayStem = objectPrefix && stem && !stem.startsWith(objectPrefix) ? typeof targetObject.buildOutputPrefixedChain === "function" ? targetObject.buildOutputPrefixedChain({
        obj1: objectPrefix,
        tronco: stem
      }) : `${objectPrefix}${stem}` : stem;
      return displayStem && suffix ? `${displayStem}-${suffix}` : displayStem;
    }
    function getPredicateNominalResult({
      rawVerb,
      verbMeta,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      nominalKind = targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
      sourceTense = "imperfecto",
      nominalConnector = "t",
      combinedMode = "",
      entradaGrammarObject = null,
      sourceFrame = null,
      sourceRouteFrame = null,
      routeFrame = null,
      valenceFrameFixed = null,
      sourceValenceFrameFixed = null,
      predicateNominalConnectorOperationFrame = null
    }) {
      const resolvedSourceTense = targetObject.normalizePredicateNominalSourceTense(sourceTense);
      const resolvedNominalKind = targetObject.isPredicateNominalTense(nominalKind) ? String(nominalKind || "") : targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal;
      const resolvedMode = combinedMode || targetObject.COMBINED_MODE.active;
      const isNonactive = resolvedMode === targetObject.COMBINED_MODE.nonactive;
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: resolvedNominalKind,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode: resolvedMode
      });
      if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
          rawVerb,
          diagnosticId: "predicado-nominal-context-blocked"
        });
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        derivedIsWeya,
        derivationIsTransitive,
        resolvedDirectionalRuleMode,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const hasResolvedNonactiveSourceStem = isNonactive && verbMeta?.predicateNominalSourceStemResolved === true;
      const nonactivePassiveObjectPrefix = isNonactive ? targetObject.applyPassiveImpersonal({
        pers1: subjectPrefix,
        pers2: subjectSuffix,
        obj1: resolvedObjectPrefix
      }).obj1 : resolvedObjectPrefix;
      if (isNonactive && nonactivePassiveObjectPrefix !== resolvedObjectPrefix) {
        const predicateNominalObjectSlotGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "predicate-nominal-nonactive-source-object-adjustment",
          mutationKind: nonactivePassiveObjectPrefix ? "reclassify-object-slot" : "delete-object-slot",
          sourceObj1: resolvedObjectPrefix,
          sourceBaseObj1: resolvedObjectPrefix,
          sourceObj2: resolvedIndirectObjectMarker,
          sourceObj3: resolvedThirdObjectMarker,
          targetObj1: nonactivePassiveObjectPrefix,
          targetBaseObj1: nonactivePassiveObjectPrefix,
          targetObj2: resolvedIndirectObjectMarker,
          targetObj3: resolvedThirdObjectMarker,
          options: {
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (predicateNominalObjectSlotGate?.status === "blocked") {
          return attachVerbDerivedNominalGrammarContract({
            error: true,
            valencyObjectSlotGate: predicateNominalObjectSlotGate
          }, {
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
            rawVerb,
            diagnosticId: predicateNominalObjectSlotGate.diagnosticId,
            routeStage: predicateNominalObjectSlotGate.routeStage
          });
        }
      }
      const connector = String(nominalConnector || "t");
      const resolveTtiConnector = shouldResolvePredicateNominalConnectorAsTti(connector);
      if (resolveTtiConnector) {
        const connectorOperationMismatch = getPredicateNominalConnectorOperationFrameMismatch({
          operationFrame: predicateNominalConnectorOperationFrame,
          sourceTense: resolvedSourceTense,
          nominalKind: resolvedNominalKind,
          nominalConnector: connector
        });
        if (connectorOperationMismatch) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
            rawVerb,
            diagnosticId: `predicado-nominal-absolutive-connector-${connectorOperationMismatch}`
          });
        }
      }
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        let sourceStemEntries = [{
          stemSpec: stemContext.stemSpec || targetObject.buildLiteralMorphStemSpec(stemContext.verb),
          stem: stemContext.verb,
          analysisVerb: stemContext.analysisVerb,
          isYawi: derivedIsYawi,
          isWeya: derivedIsWeya
        }];
        if (isNonactive && !hasResolvedNonactiveSourceStem) {
          const nonactiveSourceChain = targetObject.buildNonactiveSourceChain(verbMeta, stemContext.verb, stemContext.analysisVerb);
          const nonactiveBaseVerb = targetObject.normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
          const nonactiveRuleBase = targetObject.getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
          const selection = targetObject.resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: derivedIsYawi,
            forceAll: targetObject.shouldForceAllNonactiveOptions(),
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase
          });
          const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs) ? selection.selectedStemSpecs.filter(Boolean) : [];
          const rawStemSpecs = !selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1 ? selection.allStemSpecs : selection.selectedSuffix && selectedStemSpecList.length > 1 ? selectedStemSpecList : [selection.selectedStemSpec || targetObject.buildLiteralMorphStemSpec(selection.selectedStem)];
          sourceStemEntries = rawStemSpecs.map((spec, index) => {
            const sourceStemSpec = targetObject.applyNonactiveSourceChainStemSpec(spec, Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "", nonactiveSourceChain, {
              sourceSuffix: selection.selectedSuffix || ""
            });
            const stem = targetObject.realizeMorphStemSpec(sourceStemSpec, "");
            if (!stem) {
              return null;
            }
            return {
              stemSpec: sourceStemSpec,
              stem,
              analysisVerb: targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix),
              isYawi: false,
              isWeya: false
            };
          }).filter(Boolean);
        }
        if (!sourceStemEntries.length) {
          return;
        }
        const sourceObjectPrefix = isNonactive ? nonactivePassiveObjectPrefix : stemContext.morphologyObjectPrefix === "mu" ? "ne" : stemContext.morphologyObjectPrefix;
        sourceStemEntries.forEach(sourceStemEntry => {
          const applied = targetObject.applyMorphologyRules({
            subjectPrefix,
            objectPrefix: sourceObjectPrefix,
            subjectSuffix: "",
            verb: sourceStemEntry.stem,
            tense: resolvedSourceTense,
            analysisVerb: sourceStemEntry.analysisVerb,
            sourceRawVerb: rawVerb,
            isYawi: sourceStemEntry.isYawi,
            isWeya: sourceStemEntry.isWeya,
            directionalPrefix,
            directionalRuleMode: resolvedDirectionalRuleMode,
            isNounContext: true,
            ...targetObject.buildMorphologyMetaOptions(verbMeta),
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            combinedMode: resolvedMode,
            isNonactiveMode: isNonactive,
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed
          });
          if (!applied || !applied.verb) {
            return;
          }
          const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
            sourceModel: nounSourceModel,
            runtimeObjectPrefix: sourceObjectPrefix,
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
            surfaceRuleMeta: applied.surfaceRuleMeta || null
          });
          const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, isNonactive ? sourceStemEntry.stemSpec : stemContext.stemSpec);
          const sourceTenseSuffix = String(applied.subjectSuffix || "");
          const predicateStem = sourceTenseSuffix ? `${nominalSurface.verb}${sourceTenseSuffix}` : nominalSurface.verb;
          const predicateStemSpec = sourceTenseSuffix ? targetObject.buildAppendMorphStemSpec(nominalSurface.verb, sourceTenseSuffix, {
            sourceStemSpec: placedStemSpec
          }) : placedStemSpec;
          const resolvedConnector = resolveTtiConnector ? resolvePredicateNominalAbsolutiveTtiConnectorFromFrame({
            operationFrame: predicateNominalConnectorOperationFrame,
            predicateStemSpec,
            fallback: connector || "t"
          }) : connector;
          if (resolveTtiConnector && !resolvedConnector) {
            return;
          }
          entries.push(targetObject.buildVerbDerivedNominalEntry({
            kind: resolvedNominalKind,
            sourceModel: nounSourceModel,
            verb: predicateStem,
            subjectSuffix: resolvedConnector,
            stemSpec: predicateStemSpec,
            surfaceObjectPrefix: nominalSurface.objectPrefix,
            runtimeObjectPrefix: sourceObjectPrefix,
            surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
            sourceTense: resolvedSourceTense,
            provenance: {
              forward: stemContext.derivationProvenance || null
            },
            metadata: {
              formulaDisplayStem: sourceTenseSuffix === "s" ? buildPredicateNominalFormulaDisplayStem(nominalSurface.verb, sourceTenseSuffix, nominalSurface.objectPrefix) : "",
              sourceTenseSuffix,
              absolutiveConnectorFamily: resolveTtiConnector ? "t/ti" : "",
              absolutiveConnectorSelector: sourceTenseSuffix ? "typed-predicate-stem-frame-previous-non-zero-segment" : "",
              absolutiveConnectorInput: "",
              absolutiveConnectorOperationFrame: resolveTtiConnector ? predicateNominalConnectorOperationFrame : null
            }
          }));
        });
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: resolvedNominalKind
      });
      if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.predicadoNominal,
          rawVerb,
          diagnosticId: "predicado-nominal-no-output"
        });
      }
      return attachVerbDerivedNominalGrammarContract({
        ...result,
        predicateNominalSource: {
          grammarSource: "Andrews 36.6 note 2",
          sourceUnit: "vnc-predicate",
          sourceTense: resolvedSourceTense,
          connectorClass: connector || "t",
          connectorFamily: resolveTtiConnector ? "t/ti" : connector,
          connectorSelector: resolveTtiConnector ? "typed-predicate-stem-frame-previous-non-zero-segment" : ""
        },
        predicateNominalConnectorOperationFrame: resolveTtiConnector ? predicateNominalConnectorOperationFrame : null
      }, {
        kind: resolvedNominalKind,
        rawVerb
      });
    }
    function getInstrumentivoResult({
      rawVerb,
      verbMeta,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      mode,
      possessivePrefix,
      entradaGrammarObject = null,
      sourceFrame = null,
      sourceRouteFrame = null,
      routeFrame = null,
      valenceFrameFixed = null,
      sourceValenceFrameFixed = null,
      sourceSubjectFrame = null,
      sourceSubjectPossessorOperationFrame = null
    }) {
      const commonNumberSuffix = "";
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker
      });
      if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          rawVerb,
          diagnosticId: "instrumentivo-context-blocked"
        });
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        derivedIsWeya,
        derivationIsTransitive,
        resolvedDirectionalRuleMode,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const reflexiveInstrumentivoStemContext = (Array.isArray(forwardStemContexts) ? forwardStemContexts : []).find(stemContext => stemContext?.morphologyObjectPrefix === "mu");
      if (reflexiveInstrumentivoStemContext) {
        const instrumentivoReflexiveObjectGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "instrumentivo-reflexive-source-object-reclassification",
          mutationKind: "reclassify-object-slot",
          sourceObj1: reflexiveInstrumentivoStemContext.morphologyObjectPrefix,
          sourceBaseObj1: reflexiveInstrumentivoStemContext.morphologyObjectPrefix,
          sourceObj2: resolvedIndirectObjectMarker,
          sourceObj3: resolvedThirdObjectMarker,
          targetObj1: "ne",
          targetBaseObj1: "ne",
          targetObj2: resolvedIndirectObjectMarker,
          targetObj3: resolvedThirdObjectMarker,
          options: {
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (instrumentivoReflexiveObjectGate?.status === "blocked") {
          return attachVerbDerivedNominalGrammarContract({
            error: true,
            valencyObjectSlotGate: instrumentivoReflexiveObjectGate
          }, {
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: instrumentivoReflexiveObjectGate.diagnosticId,
            routeStage: instrumentivoReflexiveObjectGate.routeStage
          });
        }
      }
      if (mode === targetObject.INSTRUMENTIVO_MODE.absolutivo) {
        const entries = [];
        forwardStemContexts.forEach(stemContext => {
          const morphologyObjectPrefix = stemContext.morphologyObjectPrefix === "mu" ? "ne" : stemContext.morphologyObjectPrefix;
          const nonactiveSourceChain = targetObject.buildNonactiveSourceChain(verbMeta, stemContext.verb, stemContext.analysisVerb);
          const baseVerb = targetObject.normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
          const nonactiveRuleBase = targetObject.getNounNonactiveRuleBase(baseVerb, verbMeta);
          let options = targetObject.getVisibleNonactiveDerivationOptions(baseVerb, baseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: derivedIsYawi,
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase
          });
          const selectedNonactiveSuffix = targetObject.shouldForceAllNonactiveOptions() ? null : targetObject.getSelectedNonactiveSuffix();
          if (selectedNonactiveSuffix && options.some(option => option.suffix === selectedNonactiveSuffix)) {
            options = options.filter(option => option.suffix === selectedNonactiveSuffix);
          }
          options.forEach(option => {
            const rawOptionStemSpec = option?.stemSpec || targetObject.buildLiteralMorphStemSpec(targetObject.realizeMorphStemSpec(option?.stemSpec, option?.stem || ""));
            const stemSpec = targetObject.applyNonactiveSourceChainStemSpec(rawOptionStemSpec, option?.stem || "", nonactiveSourceChain, {
              sourceSuffix: option?.suffix || ""
            });
            const stem = targetObject.realizeMorphStemSpec(stemSpec, "");
            const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix) ? stem.slice(directionalPrefix.length) : targetObject.realizeMorphStemSpec(rawOptionStemSpec, option?.stem || "");
            const applied = targetObject.applyMorphologyRules({
              subjectPrefix,
              objectPrefix: morphologyObjectPrefix,
              subjectSuffix: commonNumberSuffix,
              verb: stem,
              tense: "presente-habitual",
              analysisVerb: analysisStem,
              sourceRawVerb: rawVerb,
              isYawi: false,
              isWeya: false,
              directionalPrefix,
              directionalRuleMode: resolvedDirectionalRuleMode,
              isNounContext: true,
              ...targetObject.buildMorphologyMetaOptions(verbMeta),
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              entradaGrammarObject,
              sourceFrame,
              sourceRouteFrame,
              routeFrame,
              valenceFrameFixed,
              sourceValenceFrameFixed
            });
            if (!applied || !applied.verb) {
              return;
            }
            const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
              sourceModel: nounSourceModel,
              runtimeObjectPrefix: morphologyObjectPrefix,
              objectPrefix: applied.objectPrefix,
              verb: applied.verb,
              surfaceRuleMeta: applied.surfaceRuleMeta || null
            });
            const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemSpec);
            const core = targetObject.buildOutputPrefixedChain({
              pers1: applied.subjectPrefix,
              obj1: nominalSurface.objectPrefix,
              tronco: nominalSurface.verb,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            });
            const coreStemSpec = targetObject.buildStructuredPrefixedStemSpec({
              stemSpec: placedStemSpec,
              verb: nominalSurface.verb,
              subjectPrefix: applied.subjectPrefix,
              objectPrefix: nominalSurface.objectPrefix,
              output: core,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            }) || targetObject.buildLiteralMorphStemSpec(core);
            const sourceTenseSuffix = String(applied.subjectSuffix || "");
            const predicateStem = ["ni", "ya"].includes(sourceTenseSuffix) ? `${core}${sourceTenseSuffix}` : core;
            const predicateStemSpec = ["ni", "ya"].includes(sourceTenseSuffix) ? targetObject.buildAppendMorphStemSpec(core, sourceTenseSuffix, {
              sourceStemSpec: coreStemSpec
            }) : coreStemSpec;
            entries.push(targetObject.buildVerbDerivedNominalEntry({
              kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
              sourceModel: nounSourceModel,
              verb: predicateStem,
              subjectSuffix: "",
              stemSpec: predicateStemSpec,
              sourceTense: "presente-habitual",
              provenance: {
                nonactiveSuffix: option?.suffix || "",
                forward: stemContext.derivationProvenance || null
              },
              metadata: {
                runtimeObjectPrefix: morphologyObjectPrefix
              }
            }));
          });
        });
        const result = targetObject.buildVerbDerivedNominalResult(entries, {
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo
        });
        if (!hasVerbDerivedNominalSurface(result)) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: "instrumentivo-no-output"
          });
        }
        return attachVerbDerivedNominalGrammarContract(result, {
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          rawVerb
        });
      }
      const explicitPossessivePrefix = typeof possessivePrefix === "string" ? possessivePrefix : "";
      let resolvedPossessivePrefix = explicitPossessivePrefix;
      let resolvedSourceSubjectPossessorFrame = null;
      let resolvedSourceSubjectPossessorOperationFrame = null;
      if (mode === targetObject.INSTRUMENTIVO_MODE.posesivo && !explicitPossessivePrefix) {
        resolvedSourceSubjectPossessorFrame = isAndrewsSourceSubjectFrame(sourceSubjectFrame) ? sourceSubjectFrame : null;
        if (!resolvedSourceSubjectPossessorFrame) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: "instrumentivo-source-subject-frame-required"
          });
        }
        resolvedPossessivePrefix = getAndrewsSourceSubjectFramePossessorPrefix(resolvedSourceSubjectPossessorFrame);
        if (!resolvedPossessivePrefix) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: "instrumentivo-possessor-unmapped"
          });
        }
        const operationMismatch = getSourceSubjectPossessorOperationFrameMismatch({
          operationFrame: sourceSubjectPossessorOperationFrame,
          sourceSubjectFrame: resolvedSourceSubjectPossessorFrame,
          targetPossessivePrefix: resolvedPossessivePrefix,
          nominalKind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          operationId: "andrews-36-6-instrumentive-source-subject-to-possessor"
        });
        if (operationMismatch) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: operationMismatch === "contradictory-source-frame" || operationMismatch === "contradictory-target-frame" || operationMismatch === "contradictory-operation-frame" ? "instrumentivo-source-subject-contradictory-frame" : "instrumentivo-source-subject-typed-operation-frame-required"
          });
        }
        resolvedSourceSubjectPossessorOperationFrame = sourceSubjectPossessorOperationFrame;
      }
      const activeAbsolutiveException = isInstrumentivoImperfectActiveAbsolutiveMode(mode);
      const activeBranchSubjectSuffix = activeAbsolutiveException ? "t" : "";
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        const morphologyObjectPrefix = stemContext.morphologyObjectPrefix === "mu" ? "ne" : stemContext.morphologyObjectPrefix;
        const applied = targetObject.applyMorphologyRules({
          subjectPrefix,
          objectPrefix: morphologyObjectPrefix,
          subjectSuffix: commonNumberSuffix,
          verb: stemContext.verb,
          tense: "imperfecto",
          analysisVerb: stemContext.analysisVerb,
          sourceRawVerb: rawVerb,
          isYawi: derivedIsYawi,
          isWeya: derivedIsWeya,
          directionalPrefix,
          directionalRuleMode: resolvedDirectionalRuleMode,
          isNounContext: true,
          ...targetObject.buildMorphologyMetaOptions(verbMeta),
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker,
          entradaGrammarObject,
          sourceFrame,
          sourceRouteFrame,
          routeFrame,
          valenceFrameFixed,
          sourceValenceFrameFixed
        });
        if (!applied || !applied.verb) {
          return;
        }
        const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
          sourceModel: nounSourceModel,
          runtimeObjectPrefix: morphologyObjectPrefix,
          objectPrefix: applied.objectPrefix,
          verb: applied.verb,
          surfaceRuleMeta: applied.surfaceRuleMeta || null
        });
        const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemContext.stemSpec);
        const sourceTenseSuffix = String(applied.subjectSuffix || "");
        const predicateStem = ["ni", "ya"].includes(sourceTenseSuffix) ? `${nominalSurface.verb}${sourceTenseSuffix}` : nominalSurface.verb;
        const predicateStemSpec = ["ni", "ya"].includes(sourceTenseSuffix) ? targetObject.buildAppendMorphStemSpec(nominalSurface.verb, sourceTenseSuffix, {
          sourceStemSpec: placedStemSpec
        }) : placedStemSpec;
        entries.push(targetObject.buildVerbDerivedNominalEntry({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          sourceModel: nounSourceModel,
          verb: predicateStem,
          subjectSuffix: activeBranchSubjectSuffix,
          stemSpec: predicateStemSpec,
          surfaceObjectPrefix: nominalSurface.objectPrefix,
          runtimeObjectPrefix: morphologyObjectPrefix,
          surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
          sourceTense: "imperfecto",
          provenance: {
            forward: stemContext.derivationProvenance || null
          }
        }));
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || ""
      });
      if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          rawVerb,
          diagnosticId: "instrumentivo-no-output"
        });
      }
      return attachVerbDerivedNominalGrammarContract({
        ...result,
        instrumentivoSourceSubjectPossessor: mode === targetObject.INSTRUMENTIVO_MODE.posesivo ? {
          grammarSource: "Andrews 36.6",
          sourceSubjectPrefix: resolvedSourceSubjectPossessorFrame?.subject?.prefix ?? (subjectPrefix || ""),
          sourceSubjectSuffix: resolvedSourceSubjectPossessorFrame?.subject?.suffix ?? (subjectSuffix || ""),
          possessivePrefix: resolvedPossessivePrefix,
          explicitPossessivePrefix,
          derivedFromSourceSubject: !explicitPossessivePrefix && Boolean(resolvedPossessivePrefix),
          sourceSubjectFrame: resolvedSourceSubjectPossessorFrame,
          operationFrame: resolvedSourceSubjectPossessorOperationFrame
        } : null,
        instrumentivoImperfectActiveAbsolutiveException: activeAbsolutiveException ? {
          grammarSource: "Andrews 36.6 note 2",
          sourcePredicate: "imperfect-active",
          targetState: "absolutive",
          connectorClass: "t",
          lexicalEvidenceRequiredForProductiveUse: true
        } : null
      }, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        rawVerb
      });
    }
    function getCalificativoInstrumentivoResult({
      rawVerb,
      verbMeta,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      possessivePrefix,
      actionNounStemUse = "",
      combinedMode = "",
      entradaGrammarObject = null,
      sourceFrame = null,
      sourceRouteFrame = null,
      routeFrame = null,
      valenceFrameFixed = null,
      sourceValenceFrameFixed = null,
      sourceSubjectFrame = null,
      sourceSubjectPossessorOperationFrame = null
    }) {
      const resolvedActionNounStemUse = String(actionNounStemUse || "");
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        actionNounStemUse: resolvedActionNounStemUse,
        combinedMode,
        requireNonanimateSubject: resolvedActionNounStemUse !== "general-use"
      });
      if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
          rawVerb,
          diagnosticId: "calificativo-instrumentivo-context-blocked"
        });
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const explicitPossessivePrefix = typeof possessivePrefix === "string" ? possessivePrefix : "";
      const useGeneralActionStem = resolvedActionNounStemUse === "general-use";
      let resolvedPossessivePrefix = explicitPossessivePrefix;
      let resolvedSourceSubjectPossessorFrame = null;
      let resolvedSourceSubjectPossessorOperationFrame = null;
      if (useGeneralActionStem && !explicitPossessivePrefix) {
        resolvedSourceSubjectPossessorFrame = isAndrewsSourceSubjectFrame(sourceSubjectFrame) ? sourceSubjectFrame : null;
        if (!resolvedSourceSubjectPossessorFrame) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-source-subject-frame-required"
          });
        }
        resolvedPossessivePrefix = getAndrewsSourceSubjectFramePossessorPrefix(resolvedSourceSubjectPossessorFrame);
        if (!resolvedPossessivePrefix) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-possessor-unmapped"
          });
        }
        const operationMismatch = getSourceSubjectPossessorOperationFrameMismatch({
          operationFrame: sourceSubjectPossessorOperationFrame,
          sourceSubjectFrame: resolvedSourceSubjectPossessorFrame,
          targetPossessivePrefix: resolvedPossessivePrefix,
          nominalKind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
          operationId: "andrews-36-11-active-action-source-subject-to-possessor"
        });
        if (operationMismatch) {
          return buildVerbDerivedNominalBlockedResult({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: operationMismatch === "contradictory-source-frame" || operationMismatch === "contradictory-target-frame" || operationMismatch === "contradictory-operation-frame" ? "calificativo-instrumentivo-source-subject-contradictory-frame" : "calificativo-instrumentivo-source-subject-typed-operation-frame-required"
          });
        }
        resolvedSourceSubjectPossessorOperationFrame = sourceSubjectPossessorOperationFrame;
      }
      if (useGeneralActionStem && !resolvedPossessivePrefix) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
          rawVerb,
          diagnosticId: "calificativo-instrumentivo-possessor-unmapped"
        });
      }
      const isActiveGeneralActionStem = useGeneralActionStem && String(combinedMode || "") !== targetObject.COMBINED_MODE.nonactive;
      const isActiveActionSource = String(combinedMode || "") !== targetObject.COMBINED_MODE.nonactive;
      const activeActionRootPlusYaBase = isActiveActionSource ? targetObject.normalizeRuleBase(verbMeta?.rootPlusYaBasePronounceable || verbMeta?.rootPlusYaBase || "") : "";
      const sourceHasActiveObjectSlot = Boolean(targetObject.getBaseObjectSlots(verbMeta) > 0 || verbMeta?.isMarkedTransitive || verbMeta?.isTaFusion);
      const sourceHasReflexiveObject = resolvedObjectPrefix === "mu";
      if (isActiveGeneralActionStem && sourceHasActiveObjectSlot && !sourceHasReflexiveObject) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
          rawVerb,
          diagnosticId: "calificativo-instrumentivo-transitive-source-blocked"
        });
      }
      const reflexiveGeneralUseStemContext = isActiveGeneralActionStem ? (Array.isArray(forwardStemContexts) ? forwardStemContexts : []).find(stemContext => stemContext?.morphologyObjectPrefix === "mu") : null;
      if (reflexiveGeneralUseStemContext) {
        const calificativoReflexiveObjectGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "calificativo-instrumentivo-active-action-reflexive-source-object-reclassification",
          mutationKind: "reclassify-object-slot",
          sourceObj1: reflexiveGeneralUseStemContext.morphologyObjectPrefix,
          sourceBaseObj1: reflexiveGeneralUseStemContext.morphologyObjectPrefix,
          sourceObj2: resolvedIndirectObjectMarker,
          sourceObj3: resolvedThirdObjectMarker,
          targetObj1: "ne",
          targetBaseObj1: "ne",
          targetObj2: resolvedIndirectObjectMarker,
          targetObj3: resolvedThirdObjectMarker,
          options: {
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (calificativoReflexiveObjectGate?.status === "blocked") {
          return attachVerbDerivedNominalGrammarContract({
            error: true,
            valencyObjectSlotGate: calificativoReflexiveObjectGate
          }, {
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: calificativoReflexiveObjectGate.diagnosticId,
            routeStage: calificativoReflexiveObjectGate.routeStage
          });
        }
      }
      const shouldCollapseMarkerEcho = Boolean(targetObject.getForwardDerivationConfig(targetObject.getNounDerivationTypeFromMeta(verbMeta)) && (resolvedIndirectObjectMarker || resolvedThirdObjectMarker));
      const calificativoMatrixBase = targetObject.normalizeRuleBase(verbMeta?.exactBaseVerb || verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || nounSourceModel?.matrixBase || "");
      const pasadoRemotoIsTransitive = Boolean(targetObject.getBaseObjectSlots(verbMeta) > 0 || verbMeta?.isMarkedTransitive || verbMeta?.isTaFusion);
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        const activeActionMorphologyObjectPrefix = isActiveGeneralActionStem && stemContext.morphologyObjectPrefix === "mu" ? "ne" : stemContext.morphologyObjectPrefix;
        let pasadoRemotoStemEntries = targetObject.buildPasadoRemotoStemEntries({
          verb: stemContext.verb || "",
          analysisVerb: stemContext.analysisVerb || stemContext.verb || "",
          rawAnalysisVerb: stemContext.analysisVerb || stemContext.verb || "",
          sourceRawVerb: rawVerb,
          isTransitive: pasadoRemotoIsTransitive,
          directionalPrefix,
          boundPrefix: verbMeta?.hasBoundMarker ? verbMeta?.sourcePrefix || "" : "",
          boundPrefixes: Array.isArray(verbMeta?.boundPrefixes) ? verbMeta.boundPrefixes : [],
          boundExplicitFlags: Array.isArray(verbMeta?.boundExplicitFlags) ? verbMeta.boundExplicitFlags : [],
          directionalPrefixFromSlash: verbMeta?.directionalPrefixFromSlash || "",
          sourceSplitPrefix: verbMeta?.hasBoundMarker ? verbMeta?.sourcePrefix || "" : "",
          sourcePrefix: verbMeta?.sourcePrefix || "",
          sourceBase: verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || verbMeta?.canonicalRuleBase || "",
          sourceCompositeBase: verbMeta?.canonical?.slashCompositeRuleBase || "",
          isYawi: derivedIsYawi,
          hasImpersonalTaPrefix: verbMeta?.hasImpersonalTaPrefix === true,
          hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
          hasSlashMarker: verbMeta?.hasSlashMarker === true,
          hasSuffixSeparator: verbMeta?.hasSuffixSeparator === true,
          hasLeadingDash: verbMeta?.hasLeadingDash === true,
          hasBoundMarker: verbMeta?.hasBoundMarker === true,
          hasCompoundMarker: verbMeta?.hasCompoundMarker === true,
          hasNonspecificValence: targetObject.resolveHasNonspecificValence(verbMeta),
          exactBaseVerb: calificativoMatrixBase,
          suppletiveStemSet: targetObject.getSuppletiveStemSet(verbMeta),
          rootPlusYaBase: verbMeta?.rootPlusYaBase || "",
          rootPlusYaBasePronounceable: verbMeta?.rootPlusYaBasePronounceable || "",
          matrixBaseOverride: calificativoMatrixBase
        });
        if (activeActionRootPlusYaBase) {
          const obsoleteRootEntries = pasadoRemotoStemEntries.filter(entry => targetObject.normalizeRuleBase(entry?.verb || "") === activeActionRootPlusYaBase);
          if (obsoleteRootEntries.length) {
            pasadoRemotoStemEntries = obsoleteRootEntries;
          }
        }
        if (!pasadoRemotoStemEntries.length) {
          return;
        }
        const composedObjectPrefix = targetObject.composeObj1Chain({
          obj1: activeActionMorphologyObjectPrefix,
          markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
          pers1: ""
        });
        pasadoRemotoStemEntries.forEach(pasadoRemotoEntry => {
          const predicateStemSpec = targetObject.buildCalificativoInstrumentivoPredicateStemSpec(pasadoRemotoEntry.stemSpec || null, pasadoRemotoEntry.verb || "");
          const predicateStem = targetObject.realizeMorphStemSpec(predicateStemSpec, `${pasadoRemotoEntry.verb || ""}ka`);
          if (!predicateStem || predicateStem === "—") {
            return;
          }
          const baseForms = [predicateStem].map(form => targetObject.collapseCalificativoMarkerEcho({
            form,
            morphologyObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            enable: shouldCollapseMarkerEcho
          }));
          if (!baseForms.length) {
            return;
          }
          baseForms.forEach(form => {
            const baseStemSpec = form === predicateStem && predicateStemSpec && typeof predicateStemSpec === "object" && predicateStemSpec.kind ? predicateStemSpec : targetObject.buildLiteralMorphStemSpec(form);
            const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
              sourceModel: nounSourceModel,
              runtimeObjectPrefix: composedObjectPrefix || activeActionMorphologyObjectPrefix,
              objectPrefix: composedObjectPrefix || "",
              verb: form,
              surfaceRuleMeta: null
            });
            const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, form, baseStemSpec);
            const objectChainForm = targetObject.buildOutputPrefixedChain({
              obj1: nominalSurface.objectPrefix,
              tronco: nominalSurface.verb,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            });
            const objectChainStemSpec = targetObject.buildStructuredPrefixedStemSpec({
              stemSpec: placedStemSpec,
              verb: nominalSurface.verb,
              subjectPrefix: "",
              objectPrefix: nominalSurface.objectPrefix,
              output: objectChainForm,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            }) || targetObject.buildLiteralMorphStemSpec(objectChainForm);
            entries.push(targetObject.buildVerbDerivedNominalEntry({
              kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
              sourceModel: nounSourceModel,
              verb: objectChainForm,
              subjectSuffix: "",
              stemSpec: objectChainStemSpec,
              trailingSuffix: useGeneralActionStem ? "" : resolvedPossessivePrefix === "" ? "yut" : "yu",
              sourceTense: "pasado-remoto",
              provenance: {
                pasadoRemotoEntry,
                forward: stemContext.derivationProvenance || null
              }
            }));
          });
        });
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || ""
      });
      if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
          rawVerb,
          diagnosticId: "calificativo-instrumentivo-no-output"
        });
      }
      return attachVerbDerivedNominalGrammarContract({
        ...result,
        actionNounSourceSubjectPossessor: useGeneralActionStem ? {
          grammarSource: isActiveActionSource ? "Andrews 36.11" : "Andrews 36.10",
          sourceSubjectPrefix: resolvedSourceSubjectPossessorFrame?.subject?.prefix ?? (subjectPrefix || ""),
          sourceSubjectSuffix: resolvedSourceSubjectPossessorFrame?.subject?.suffix ?? (subjectSuffix || ""),
          possessivePrefix: resolvedPossessivePrefix,
          explicitPossessivePrefix,
          derivedFromSourceSubject: !explicitPossessivePrefix && Boolean(resolvedPossessivePrefix),
          sourceSubjectFrame: resolvedSourceSubjectPossessorFrame,
          operationFrame: resolvedSourceSubjectPossessorOperationFrame
        } : null
      }, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        rawVerb
      });
    }
    function getLocativoTemporalResult({
      rawVerb,
      verbMeta,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      possessivePrefix,
      combinedMode,
      entradaGrammarObject = null,
      sourceFrame = null,
      sourceRouteFrame = null,
      routeFrame = null,
      valenceFrameFixed = null,
      sourceValenceFrameFixed = null
    }) {
      const resolvedMode = combinedMode || targetObject.getCombinedMode();
      const isNonactive = resolvedMode === targetObject.COMBINED_MODE.nonactive;
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        rawVerb,
        verbMeta,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode: resolvedMode
      });
      if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
          rawVerb,
          diagnosticId: "locativo-temporal-context-blocked"
        });
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        derivedIsWeya,
        derivationIsTransitive,
        resolvedDirectionalRuleMode,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
      const isImpersonal = isNonactive && !possessorInput;
      const nonactivePassiveObjectPrefix = isNonactive ? targetObject.applyPassiveImpersonal({
        pers1: "",
        pers2: "",
        obj1: resolvedObjectPrefix
      }).obj1 : resolvedObjectPrefix;
      if (isNonactive && nonactivePassiveObjectPrefix !== resolvedObjectPrefix) {
        const locativoTemporalObjectSlotGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "locativo-temporal-nonactive-source-object-adjustment",
          mutationKind: nonactivePassiveObjectPrefix ? "reclassify-object-slot" : "delete-object-slot",
          sourceObj1: resolvedObjectPrefix,
          sourceBaseObj1: resolvedObjectPrefix,
          sourceObj2: resolvedIndirectObjectMarker,
          sourceObj3: resolvedThirdObjectMarker,
          targetObj1: nonactivePassiveObjectPrefix,
          targetBaseObj1: nonactivePassiveObjectPrefix,
          targetObj2: resolvedIndirectObjectMarker,
          targetObj3: resolvedThirdObjectMarker,
          options: {
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (locativoTemporalObjectSlotGate?.status === "blocked") {
          return attachVerbDerivedNominalGrammarContract({
            error: true,
            valencyObjectSlotGate: locativoTemporalObjectSlotGate
          }, {
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            rawVerb,
            diagnosticId: locativoTemporalObjectSlotGate.diagnosticId,
            routeStage: locativoTemporalObjectSlotGate.routeStage
          });
        }
      }
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        let nonactiveStemSpecs = [stemContext.stemSpec || targetObject.buildLiteralMorphStemSpec(stemContext.verb)];
        if (isNonactive) {
          const nonactiveSourceChain = targetObject.buildNonactiveSourceChain(verbMeta, stemContext.verb, stemContext.analysisVerb);
          const nonactiveBaseVerb = targetObject.normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
          const nonactiveRuleBase = targetObject.getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
          const selection = targetObject.resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: derivedIsYawi,
            forceAll: targetObject.shouldForceAllNonactiveOptions(),
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase
          });
          const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs) ? selection.selectedStemSpecs.filter(Boolean) : [];
          const rawStemSpecs = !selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1 ? selection.allStemSpecs : selection.selectedSuffix && selectedStemSpecList.length > 1 ? selectedStemSpecList : [selection.selectedStemSpec || targetObject.buildLiteralMorphStemSpec(selection.selectedStem)];
          nonactiveStemSpecs = rawStemSpecs.map((spec, index) => targetObject.applyNonactiveSourceChainStemSpec(spec, Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "", nonactiveSourceChain, {
            sourceSuffix: selection.selectedSuffix || ""
          })).filter(Boolean);
        }
        const nonactiveStemEntries = (nonactiveStemSpecs || []).map(spec => ({
          stemSpec: spec,
          stem: targetObject.realizeMorphStemSpec(spec, "")
        })).filter(entry => Boolean(entry.stem));
        if (!nonactiveStemEntries.length) {
          return;
        }
        let sourceObjectPrefix = resolvedObjectPrefix;
        if (isNonactive) {
          sourceObjectPrefix = nonactivePassiveObjectPrefix;
        }
        const locativeObjectPrefix = sourceObjectPrefix === resolvedObjectPrefix ? stemContext.morphologyObjectPrefix : sourceObjectPrefix;
        nonactiveStemEntries.forEach(({
          stemSpec,
          stem
        }) => {
          const stemAnalysisLocal = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
          const applied = targetObject.applyMorphologyRules({
            subjectPrefix: "",
            objectPrefix: locativeObjectPrefix,
            subjectSuffix: "",
            verb: stem,
            tense: "imperfecto",
            analysisVerb: stemAnalysisLocal,
            sourceRawVerb: rawVerb,
            isYawi: isNonactive ? false : derivedIsYawi,
            isWeya: isNonactive ? false : derivedIsWeya,
            directionalPrefix,
            directionalRuleMode: resolvedDirectionalRuleMode,
            isNounContext: true,
            ...targetObject.buildMorphologyMetaOptions(verbMeta),
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            entradaGrammarObject,
            sourceFrame,
            sourceRouteFrame,
            routeFrame,
            valenceFrameFixed,
            sourceValenceFrameFixed
          });
          if (!applied || !applied.verb) {
            return;
          }
          const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
            sourceModel: nounSourceModel,
            runtimeObjectPrefix: locativeObjectPrefix,
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
            surfaceRuleMeta: applied.surfaceRuleMeta || null
          });
          const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, isNonactive ? stemSpec : null);
          entries.push(targetObject.buildVerbDerivedNominalEntry({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            sourceModel: nounSourceModel,
            verb: nominalSurface.verb,
            subjectSuffix: applied.subjectSuffix,
            stemSpec: placedStemSpec,
            runtimeObjectPrefix: locativeObjectPrefix,
            surfaceObjectPrefix: nominalSurface.objectPrefix,
            surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
            trailingSuffix: "n",
            sourceTense: isNonactive ? "imperfecto-no-activo" : "imperfecto",
            provenance: {
              forward: stemContext.derivationProvenance || null
            }
          }));
        });
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        possessivePrefix: possessorInput
      });
      if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
          rawVerb,
          diagnosticId: "locativo-temporal-no-output"
        });
      }
      return attachVerbDerivedNominalGrammarContract({
        ...result,
        possessorPrefix: possessorInput,
        isImpersonal
      }, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        rawVerb
      });
    }

    const api = {};
    Object.defineProperty(api, "ORDINARY_NNC_STATE", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_STATE; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_CLAUSE_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_CLAUSE_KIND; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_PLURAL_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_PLURAL_TYPE; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_POSSESSION_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_POSSESSION_KIND; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_DIAGNOSTIC_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_DIAGNOSTIC_IDS; },
    });
    Object.defineProperty(api, "NNC_LESSON12_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON12_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_PDF_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON12_FORMULA_CONTRAST_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_FORMULA_CONTRAST_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_ABSOLUTIVE_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_ABSOLUTIVE_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_SUBJECT_POSITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_SUBJECT_POSITION_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_SUBJECT_PRONOUN_INVENTORY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_SUBJECT_PRONOUN_INVENTORY_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_PREDICATE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_PREDICATE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_ANIMACY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_ANIMACY_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_STATE_NOUNSTEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_STATE_NOUNSTEM_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON12_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NNC_LESSON12_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON12_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "NNC_LESSON13_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON13_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_PDF_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON13_POSSESSIVE_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_POSSESSIVE_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_SUBJECT_POSITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_SUBJECT_POSITION_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_SUBJECT_PRONOUN_INVENTORY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_SUBJECT_PRONOUN_INVENTORY_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_MONADIC_STATE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_MONADIC_STATE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_DYADIC_STATE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_DYADIC_STATE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_SPECIFIC_POSSESSOR_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_SPECIFIC_POSSESSOR_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON13_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NNC_LESSON13_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON13_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "NNC_LESSON14_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON14_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_PDF_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON14_USE_STEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_USE_STEM_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_NOUNSTEM_CLASS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_NOUNSTEM_CLASS_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_NOUNSTEM_NUMBER_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_NOUNSTEM_NUMBER_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_ABSOLUTIVE_PLURAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_ABSOLUTIVE_PLURAL_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_POSSESSIVE_PLURAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_POSSESSIVE_PLURAL_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_POSSESSIVE_SINGULAR_COMMON_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_POSSESSIVE_SINGULAR_COMMON_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_CONSTITUENT_ANALYSIS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_CONSTITUENT_ANALYSIS_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON14_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NNC_LESSON14_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON14_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "NNC_LESSON15_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON15_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_PDF_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON15_POSSESSIVE_PECULIARITIES_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_POSSESSIVE_PECULIARITIES_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON15_NATURALLY_POSSESSED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_NATURALLY_POSSESSED_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON15_SENTENCE_STRUCTURE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_SENTENCE_STRUCTURE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON15_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NNC_LESSON15_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON15_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "NNC_LESSON16_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON16_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_PDF_REFS; },
    });
    Object.defineProperty(api, "NNC_LESSON16_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_ENTITIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_ENTITIVE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_PERSONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_PERSONAL_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_INTERROGATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_INTERROGATIVE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_DEMONSTRATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_DEMONSTRATIVE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_INDEFINITE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_INDEFINITE_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_QUANTITIVE_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_QUANTITIVE_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_QUICH_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_QUICH_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_QUI_CHI_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_QUI_CHI_FRAME; },
    });
    Object.defineProperty(api, "NNC_LESSON16_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NNC_LESSON16_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return NNC_LESSON16_REMAINING_GAPS; },
    });
    api.buildVerbDerivedNominalDiagnostic = buildVerbDerivedNominalDiagnostic;
    api.getVerbDerivedNominalAndrewsRefs = getVerbDerivedNominalAndrewsRefs;
    api.normalizeVerbDerivedNominalSurfaceValue = normalizeVerbDerivedNominalSurfaceValue;
    api.splitVerbDerivedNominalSurfaceText = splitVerbDerivedNominalSurfaceText;
    api.getVerbDerivedNominalResultFrame = getVerbDerivedNominalResultFrame;
    api.getVerbDerivedNominalResultFramePayload = getVerbDerivedNominalResultFramePayload;
    api.getVerbDerivedNominalSurfaceForms = getVerbDerivedNominalSurfaceForms;
    api.getVerbDerivedNominalSurface = getVerbDerivedNominalSurface;
    api.hasVerbDerivedNominalSurface = hasVerbDerivedNominalSurface;
    api.normalizeVerbDerivedNominalDiagnostics = normalizeVerbDerivedNominalDiagnostics;
    api.applyVerbDerivedNominalDiagnosticLayerMetadata = applyVerbDerivedNominalDiagnosticLayerMetadata;
    api.attachVerbDerivedNominalGrammarContract = attachVerbDerivedNominalGrammarContract;
    api.buildVerbDerivedNominalBlockedResult = buildVerbDerivedNominalBlockedResult;
    api.normalizeOrdinaryNncText = normalizeOrdinaryNncText;
    api.normalizeOrdinaryNncNumber = normalizeOrdinaryNncNumber;
    api.normalizeOrdinaryNncPluralType = normalizeOrdinaryNncPluralType;
    api.normalizeOrdinaryNncPossessionKind = normalizeOrdinaryNncPossessionKind;
    api.isOrdinaryNncOrganicPossessionKind = isOrdinaryNncOrganicPossessionKind;
    api.normalizeOrdinaryNncAnimacy = normalizeOrdinaryNncAnimacy;
    api.getEffectiveOrdinaryNncPluralType = getEffectiveOrdinaryNncPluralType;
    api.normalizeOrdinaryNncAgreementNumber = normalizeOrdinaryNncAgreementNumber;
    api.normalizeOrdinaryNncState = normalizeOrdinaryNncState;
    api.getOrdinaryNncFixtureEntries = getOrdinaryNncFixtureEntries;
    api.getOrdinaryNncPossessiveEntries = getOrdinaryNncPossessiveEntries;
    api.getOrdinaryNncSubjectEntries = getOrdinaryNncSubjectEntries;
    api.buildOrdinaryNncDiagnostic = buildOrdinaryNncDiagnostic;
    api.attachNncLessonGrammarContract = attachNncLessonGrammarContract;
    api.getOrdinaryNncFormulaSchema = getOrdinaryNncFormulaSchema;
    api.getOrdinaryNncFormulaSlotDefinition = getOrdinaryNncFormulaSlotDefinition;
    api.renderOrdinaryNncFormulaTemplate = renderOrdinaryNncFormulaTemplate;
    api.cloneNncLessonRecord = cloneNncLessonRecord;
    api.getNncLesson12FormulaContrastFrame = getNncLesson12FormulaContrastFrame;
    api.getNncLesson12AbsolutiveFormulaFrame = getNncLesson12AbsolutiveFormulaFrame;
    api.getNncLesson12SubjectPositionFrame = getNncLesson12SubjectPositionFrame;
    api.getNncLesson12SubjectPronounInventoryFrame = getNncLesson12SubjectPronounInventoryFrame;
    api.getNncLesson12PredicateFrame = getNncLesson12PredicateFrame;
    api.getNncLesson12AnimacyFrame = getNncLesson12AnimacyFrame;
    api.getNncLesson12StateNounstemFrame = getNncLesson12StateNounstemFrame;
    api.getNncLesson12SubsectionInventory = getNncLesson12SubsectionInventory;
    api.getNncLesson12RemainingGaps = getNncLesson12RemainingGaps;
    api.buildNncLesson12PursuitFrame = buildNncLesson12PursuitFrame;
    api.getNncLesson13PossessiveFormulaFrame = getNncLesson13PossessiveFormulaFrame;
    api.getNncLesson13SubjectPositionFrame = getNncLesson13SubjectPositionFrame;
    api.getNncLesson13SubjectPronounInventoryFrame = getNncLesson13SubjectPronounInventoryFrame;
    api.getNncLesson13MonadicStateFrame = getNncLesson13MonadicStateFrame;
    api.getNncLesson13DyadicStateFrame = getNncLesson13DyadicStateFrame;
    api.getNncLesson13SpecificPossessorFrame = getNncLesson13SpecificPossessorFrame;
    api.getNncLesson13SubsectionInventory = getNncLesson13SubsectionInventory;
    api.getNncLesson13RemainingGaps = getNncLesson13RemainingGaps;
    api.buildNncLesson13PursuitFrame = buildNncLesson13PursuitFrame;
    api.getNncLesson14UseStemFrame = getNncLesson14UseStemFrame;
    api.getNncLesson14NounstemClassFrame = getNncLesson14NounstemClassFrame;
    api.getNncLesson14NounstemNumberFrame = getNncLesson14NounstemNumberFrame;
    api.getNncLesson14AbsolutiveSingularCommonFrame = getNncLesson14AbsolutiveSingularCommonFrame;
    api.getNncLesson14AbsolutivePluralFrame = getNncLesson14AbsolutivePluralFrame;
    api.getNncLesson14PossessivePluralFrame = getNncLesson14PossessivePluralFrame;
    api.getNncLesson14PossessiveSingularCommonFrame = getNncLesson14PossessiveSingularCommonFrame;
    api.getNncLesson14ConstituentAnalysisFrame = getNncLesson14ConstituentAnalysisFrame;
    api.getNncLesson14SubsectionInventory = getNncLesson14SubsectionInventory;
    api.getNncLesson14RemainingGaps = getNncLesson14RemainingGaps;
    api.buildNncLesson14PursuitFrame = buildNncLesson14PursuitFrame;
    api.getNncLesson15PossessivePeculiaritiesFrame = getNncLesson15PossessivePeculiaritiesFrame;
    api.getNncLesson15NaturallyPossessedFrame = getNncLesson15NaturallyPossessedFrame;
    api.getNncLesson15SentenceStructureFrame = getNncLesson15SentenceStructureFrame;
    api.getNncLesson15SubsectionInventory = getNncLesson15SubsectionInventory;
    api.getNncLesson15RemainingGaps = getNncLesson15RemainingGaps;
    api.buildNncLesson15PursuitFrame = buildNncLesson15PursuitFrame;
    api.getNncLesson16OverviewFrame = getNncLesson16OverviewFrame;
    api.getNncLesson16EntitiveFrame = getNncLesson16EntitiveFrame;
    api.getNncLesson16PersonalFrame = getNncLesson16PersonalFrame;
    api.getNncLesson16InterrogativeFrame = getNncLesson16InterrogativeFrame;
    api.getNncLesson16DemonstrativeFrame = getNncLesson16DemonstrativeFrame;
    api.getNncLesson16IndefiniteFrame = getNncLesson16IndefiniteFrame;
    api.getNncLesson16QuantitiveOverviewFrame = getNncLesson16QuantitiveOverviewFrame;
    api.getNncLesson16QuichFrame = getNncLesson16QuichFrame;
    api.getNncLesson16QuiChiFrame = getNncLesson16QuiChiFrame;
    api.getNncLesson16SubsectionInventory = getNncLesson16SubsectionInventory;
    api.getNncLesson16RemainingGaps = getNncLesson16RemainingGaps;
    api.buildNncLesson16PursuitFrame = buildNncLesson16PursuitFrame;
    api.parseOrdinaryNncPersonSubKey = parseOrdinaryNncPersonSubKey;
    api.resolveOrdinaryNncSubject = resolveOrdinaryNncSubject;
    api.hasExplicitOrdinaryNncSubject = hasExplicitOrdinaryNncSubject;
    api.resolveOrdinaryNncClauseSubject = resolveOrdinaryNncClauseSubject;
    api.resolveOrdinaryNncPossessor = resolveOrdinaryNncPossessor;
    api.findOrdinaryNncFixture = findOrdinaryNncFixture;
    api.isOrdinaryNncVowelFinalStem = isOrdinaryNncVowelFinalStem;
    api.getOrdinaryNncStemShapeLabel = getOrdinaryNncStemShapeLabel;
    api.getOrdinaryNncClassStemCompatibility = getOrdinaryNncClassStemCompatibility;
    api.buildOrdinaryNncClassStemCompatibilityDiagnostic = buildOrdinaryNncClassStemCompatibilityDiagnostic;
    api.getOrdinaryNncOrganicPossessionSourceSignature = getOrdinaryNncOrganicPossessionSourceSignature;
    api.getOrdinaryNncOrganicPossessionSourceStemFromFormulaSlots = getOrdinaryNncOrganicPossessionSourceStemFromFormulaSlots;
    api.buildOrdinaryNncOrganicPossessionSourceFrame = buildOrdinaryNncOrganicPossessionSourceFrame;
    api.buildOrdinaryNncOrganicPossessionOperationFrame = buildOrdinaryNncOrganicPossessionOperationFrame;
    api.getOrdinaryNncOrganicPossessionFrameMismatch = getOrdinaryNncOrganicPossessionFrameMismatch;
    api.buildOrdinaryNncOrganicPossessionProfile = buildOrdinaryNncOrganicPossessionProfile;
    api.buildOrdinaryNncOrganicPossessionStem = buildOrdinaryNncOrganicPossessionStem;
    api.buildOrdinaryNncOrganicPossessionFrame = buildOrdinaryNncOrganicPossessionFrame;
    api.buildOrdinaryNncSurfaceChainText = buildOrdinaryNncSurfaceChainText;
    api.collectOrdinaryNncSurfaceSoundSpellingFrames = collectOrdinaryNncSurfaceSoundSpellingFrames;
    api.buildOrdinaryNncSurfaceChainResult = buildOrdinaryNncSurfaceChainResult;
    api.isOrdinaryNncPluralPossessor = isOrdinaryNncPluralPossessor;
    api.buildOrdinaryNncOpenStemPossessiveSurface = buildOrdinaryNncOpenStemPossessiveSurface;
    api.getOrdinaryNncAbsolutiveSingularSourceSignature = getOrdinaryNncAbsolutiveSingularSourceSignature;
    api.buildOrdinaryNncAbsolutiveSingularSourceFrame = buildOrdinaryNncAbsolutiveSingularSourceFrame;
    api.buildOrdinaryNncAbsolutiveSingularOperationFrame = buildOrdinaryNncAbsolutiveSingularOperationFrame;
    api.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame = buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame;
    api.getOrdinaryNncOpenStemPossessiveSourceSignature = getOrdinaryNncOpenStemPossessiveSourceSignature;
    api.buildOrdinaryNncOpenStemPossessiveSourceFrame = buildOrdinaryNncOpenStemPossessiveSourceFrame;
    api.buildOrdinaryNncOpenStemPossessiveOperationFrame = buildOrdinaryNncOpenStemPossessiveOperationFrame;
    api.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame = buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame;
    api.buildOrdinaryNncOpenStemPossessiveSurfaceCell = buildOrdinaryNncOpenStemPossessiveSurfaceCell;
    api.buildOrdinaryNncOpenStemFixture = buildOrdinaryNncOpenStemFixture;
    api.getOrdinaryNncSurfaceFormsFromCell = getOrdinaryNncSurfaceFormsFromCell;
    api.getOrdinaryNncPossessiveStemFromCell = getOrdinaryNncPossessiveStemFromCell;
    api.getOrdinaryNncSoundSpellingFramesFromCell = getOrdinaryNncSoundSpellingFramesFromCell;
    api.getOrdinaryNncFixtureStateCell = getOrdinaryNncFixtureStateCell;
    api.getOrdinaryNncSurfaceSegmentRecordsFromCell = getOrdinaryNncSurfaceSegmentRecordsFromCell;
    api.getOrdinaryNncFixtureStateForms = getOrdinaryNncFixtureStateForms;
    api.getOrdinaryNncFixtureStateSoundSpellingFrames = getOrdinaryNncFixtureStateSoundSpellingFrames;
    api.getOrdinaryNncFixtureStateSurfaceSegmentRecords = getOrdinaryNncFixtureStateSurfaceSegmentRecords;
    api.buildOrdinaryNncStructuredPossessiveSurfaceResults = buildOrdinaryNncStructuredPossessiveSurfaceResults;
    api.buildOrdinaryNncStructuredAbsolutiveSingularSurfaceResults = buildOrdinaryNncStructuredAbsolutiveSingularSurfaceResults;
    api.isOrdinaryNncThirdSingularSubject = isOrdinaryNncThirdSingularSubject;
    api.buildOrdinaryNncReduplicatedSurface = buildOrdinaryNncReduplicatedSurface;
    api.buildOrdinaryNncReduplicatedSurfaceLegacy = buildOrdinaryNncReduplicatedSurfaceLegacy;
    api.getOrdinaryNncDistributiveReduplicationSourceSignature = getOrdinaryNncDistributiveReduplicationSourceSignature;
    api.buildOrdinaryNncDistributiveReduplicationSourceFrame = buildOrdinaryNncDistributiveReduplicationSourceFrame;
    api.buildOrdinaryNncDistributiveReduplicationOperationFrame = buildOrdinaryNncDistributiveReduplicationOperationFrame;
    api.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame = buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame;
    api.getOrdinaryNncAnimateDistributiveSourceSignature = getOrdinaryNncAnimateDistributiveSourceSignature;
    api.buildOrdinaryNncAnimateDistributiveSourceFrame = buildOrdinaryNncAnimateDistributiveSourceFrame;
    api.buildOrdinaryNncAnimateDistributiveOperationFrame = buildOrdinaryNncAnimateDistributiveOperationFrame;
    api.buildOrdinaryNncAnimateDistributiveSurfaceFromFrame = buildOrdinaryNncAnimateDistributiveSurfaceFromFrame;
    api.getOrdinaryNncAnimateCountPluralSourceSignature = getOrdinaryNncAnimateCountPluralSourceSignature;
    api.buildOrdinaryNncAnimateCountPluralSourceFrame = buildOrdinaryNncAnimateCountPluralSourceFrame;
    api.buildOrdinaryNncAnimateCountPluralOperationFrame = buildOrdinaryNncAnimateCountPluralOperationFrame;
    api.buildOrdinaryNncAnimateCountPluralSurfaceFromFrame = buildOrdinaryNncAnimateCountPluralSurfaceFromFrame;
    api.getOrdinaryNncAnimateSubjectPrefixSourceSignature = getOrdinaryNncAnimateSubjectPrefixSourceSignature;
    api.buildOrdinaryNncAnimateSubjectPrefixSourceFrame = buildOrdinaryNncAnimateSubjectPrefixSourceFrame;
    api.buildOrdinaryNncAnimateSubjectPrefixOperationFrame = buildOrdinaryNncAnimateSubjectPrefixOperationFrame;
    api.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame = buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame;
    api.applyOrdinaryNncSubjectPrefix = applyOrdinaryNncSubjectPrefix;
    api.applyOrdinaryNncSubjectPrefixResult = applyOrdinaryNncSubjectPrefixResult;
    api.stripOrdinaryNncPossessiveSurfacePrefix = stripOrdinaryNncPossessiveSurfacePrefix;
    api.buildOrdinaryNncPossessiveDistributiveSurface = buildOrdinaryNncPossessiveDistributiveSurface;
    api.buildOrdinaryNncPossessiveDistributiveSurfaceResult = buildOrdinaryNncPossessiveDistributiveSurfaceResult;
    api.getOrdinaryNncNonanimatePossessiveDistributiveSourceSignature = getOrdinaryNncNonanimatePossessiveDistributiveSourceSignature;
    api.buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame = buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame;
    api.buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame = buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame;
    api.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame = buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame;
    api.getOrdinaryNncPossessiveDistributiveSourceSignature = getOrdinaryNncPossessiveDistributiveSourceSignature;
    api.buildOrdinaryNncPossessiveDistributiveSourceFrame = buildOrdinaryNncPossessiveDistributiveSourceFrame;
    api.buildOrdinaryNncPossessiveDistributiveOperationFrame = buildOrdinaryNncPossessiveDistributiveOperationFrame;
    api.buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame = buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame;
    api.getOrdinaryNncAnimatePossessiveCountPluralSourceSignature = getOrdinaryNncAnimatePossessiveCountPluralSourceSignature;
    api.buildOrdinaryNncAnimatePossessiveCountPluralSourceFrame = buildOrdinaryNncAnimatePossessiveCountPluralSourceFrame;
    api.buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame = buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame;
    api.buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame = buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame;
    api.getOrdinaryNncAnimatePossessivePluralIdentitySourceSignature = getOrdinaryNncAnimatePossessivePluralIdentitySourceSignature;
    api.buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame = buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame;
    api.buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame = buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame;
    api.buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame = buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame;
    api.buildOrdinaryNncAnimatePossessivePluralForms = buildOrdinaryNncAnimatePossessivePluralForms;
    api.buildOrdinaryNncDerivedPluralForms = buildOrdinaryNncDerivedPluralForms;
    api.normalizeOrdinaryNncNum1Num2Class = normalizeOrdinaryNncNum1Num2Class;
    api.formatOrdinaryNncNum1Num2Class = formatOrdinaryNncNum1Num2Class;
    api.getOrdinaryNncNum1Num2Surface = getOrdinaryNncNum1Num2Surface;
    api.formatOrdinaryNncFormulaDyadSegment = formatOrdinaryNncFormulaDyadSegment;
    api.buildOrdinaryNncNum1Num2Dyad = buildOrdinaryNncNum1Num2Dyad;
    api.parseOrdinaryNncPredicateFormulaInput = parseOrdinaryNncPredicateFormulaInput;
    api.isOrdinaryNncLegacyFormulaString = isOrdinaryNncLegacyFormulaString;
    api.getOrdinaryNncRequestFormulaSlots = getOrdinaryNncRequestFormulaSlots;
    api.getOrdinaryNncRequestFormulaSlotStem = getOrdinaryNncRequestFormulaSlotStem;
    api.getOrdinaryNncRequestFormulaSlotNounClass = getOrdinaryNncRequestFormulaSlotNounClass;
    api.stripOrdinaryNncNum1Num2FromInput = stripOrdinaryNncNum1Num2FromInput;
    api.buildOrdinaryNncPredicateFormula = buildOrdinaryNncPredicateFormula;
    api.buildOrdinaryNncNum1Num2 = buildOrdinaryNncNum1Num2;
    api.getOrdinaryNncSubjectAffixLabel = getOrdinaryNncSubjectAffixLabel;
    api.buildOrdinaryNncFormulaSlots = buildOrdinaryNncFormulaSlots;
    api.getOrdinaryNncFormulaSlotResultFrame = getOrdinaryNncFormulaSlotResultFrame;
    api.getOrdinaryNncFormulaSlotFramedSurface = getOrdinaryNncFormulaSlotFramedSurface;
    api.resolveOrdinaryNncFormulaSlotText = resolveOrdinaryNncFormulaSlotText;
    api.buildOrdinaryNncFormulaEchoFromSlots = buildOrdinaryNncFormulaEchoFromSlots;
    api.buildOrdinaryNncExpandedFormulaEchoFromSlots = buildOrdinaryNncExpandedFormulaEchoFromSlots;
    api.buildOrdinaryNncCompactFormulaEchoFromSlots = buildOrdinaryNncCompactFormulaEchoFromSlots;
    api.buildOrdinaryNncPredicateStateFrame = buildOrdinaryNncPredicateStateFrame;
    api.getOrdinaryNncPredicateStateCategoryLabel = getOrdinaryNncPredicateStateCategoryLabel;
    api.getOrdinaryNncAnimacyCategoryLabel = getOrdinaryNncAnimacyCategoryLabel;
    api.buildOrdinaryNncCategoryProfile = buildOrdinaryNncCategoryProfile;
    api.buildOrdinaryNncBasicMetadata = buildOrdinaryNncBasicMetadata;
    api.buildOrdinaryNncClauseFrame = buildOrdinaryNncClauseFrame;
    api.buildOrdinaryNncFormulaSurfacePairs = buildOrdinaryNncFormulaSurfacePairs;
    api.buildOrdinaryNncFormulaSurfacePairFields = buildOrdinaryNncFormulaSurfacePairFields;
    api.normalizeOrdinaryNncResultTextRecords = normalizeOrdinaryNncResultTextRecords;
    api.getOrdinaryNncResultTextSourceSignature = getOrdinaryNncResultTextSourceSignature;
    api.buildOrdinaryNncResultTextSourceFrame = buildOrdinaryNncResultTextSourceFrame;
    api.buildOrdinaryNncResultTextOperationFrame = buildOrdinaryNncResultTextOperationFrame;
    api.validateOrdinaryNncResultTextOperationFrame = validateOrdinaryNncResultTextOperationFrame;
    api.buildOrdinaryNncResultText = buildOrdinaryNncResultText;
    api.resolveOrdinaryNncResultTextFromFrames = resolveOrdinaryNncResultTextFromFrames;
    api.buildOrdinaryNncUnsupportedResult = buildOrdinaryNncUnsupportedResult;
    api.generateOrdinaryNncParadigm = generateOrdinaryNncParadigm;
    api.normalizeOrdinaryNncRequestedList = normalizeOrdinaryNncRequestedList;
    api.getOrdinaryNncFixtureStates = getOrdinaryNncFixtureStates;
    api.getOrdinaryNncFixtureNumbersForState = getOrdinaryNncFixtureNumbersForState;
    api.getOrdinaryNncDefaultPluralTypesForFixture = getOrdinaryNncDefaultPluralTypesForFixture;
    api.getOrdinaryNncPossessorInventory = getOrdinaryNncPossessorInventory;
    api.normalizeOrdinaryNncRequestedPossessor = normalizeOrdinaryNncRequestedPossessor;
    api.getOrdinaryNncFixturePossessorsForStateNumber = getOrdinaryNncFixturePossessorsForStateNumber;
    api.buildOrdinaryNncParadigmSetDiagnostic = buildOrdinaryNncParadigmSetDiagnostic;
    api.buildOrdinaryNncParadigmSetResult = buildOrdinaryNncParadigmSetResult;
    api.generateOrdinaryNncParadigmSet = generateOrdinaryNncParadigmSet;
    api.generateOrdinaryNncClause = generateOrdinaryNncClause;
    api.getOrdinaryNncFormulaWorkbenchSlotValue = getOrdinaryNncFormulaWorkbenchSlotValue;
    api.buildOrdinaryNncFormulaWorkbenchSlotRecords = buildOrdinaryNncFormulaWorkbenchSlotRecords;
    api.normalizeOrdinaryNncFormulaWorkbenchInput = normalizeOrdinaryNncFormulaWorkbenchInput;
    api.buildOrdinaryNncFormulaWorkbenchExample = buildOrdinaryNncFormulaWorkbenchExample;
    api.buildOrdinaryNncFormulaWorkbenchExamples = buildOrdinaryNncFormulaWorkbenchExamples;
    api.buildOrdinaryNncFormulaWorkbenchSlice = buildOrdinaryNncFormulaWorkbenchSlice;
    Object.defineProperty(api, "POSSESSIVE_STATE_NNC_SPECIFIC_POSSESSOR_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSIVE_STATE_NNC_SPECIFIC_POSSESSOR_SPECS; },
    });
    Object.defineProperty(api, "POSSESSIVE_STATE_NNC_MONADIC_POSSESSOR_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return POSSESSIVE_STATE_NNC_MONADIC_POSSESSOR_SPECS; },
    });
    api.getPossessiveStateNncFormulaSchema = getPossessiveStateNncFormulaSchema;
    api.getPossessiveStateNncFormulaSlotDefinition = getPossessiveStateNncFormulaSlotDefinition;
    api.normalizePossessiveStateNncWorkbenchInput = normalizePossessiveStateNncWorkbenchInput;
    api.getPossessiveStateNncSpecificPossessorSpec = getPossessiveStateNncSpecificPossessorSpec;
    api.getPossessiveStateNncMonadicPossessorSpec = getPossessiveStateNncMonadicPossessorSpec;
    api.buildPossessiveStateNncStateSlot = buildPossessiveStateNncStateSlot;
    api.buildPossessiveStateNncFormulaSlots = buildPossessiveStateNncFormulaSlots;
    api.getPossessiveStateNncFormulaSlotStateToken = getPossessiveStateNncFormulaSlotStateToken;
    api.renderPossessiveStateNncFormulaTemplate = renderPossessiveStateNncFormulaTemplate;
    api.buildPossessiveStateNncFormulaEchoFromSlots = buildPossessiveStateNncFormulaEchoFromSlots;
    api.buildPossessiveStateNncFormulaWorkbenchSlotRecords = buildPossessiveStateNncFormulaWorkbenchSlotRecords;
    api.getPossessiveStateNncMonadicSourceSignature = getPossessiveStateNncMonadicSourceSignature;
    api.buildPossessiveStateNncMonadicSourceFrame = buildPossessiveStateNncMonadicSourceFrame;
    api.buildPossessiveStateNncMonadicOperationFrame = buildPossessiveStateNncMonadicOperationFrame;
    api.getPossessiveStateNncMonadicFrameMismatch = getPossessiveStateNncMonadicFrameMismatch;
    api.buildPossessiveStateNncFormulaWorkbenchExample = buildPossessiveStateNncFormulaWorkbenchExample;
    api.buildPossessiveStateNncFormulaWorkbenchExamples = buildPossessiveStateNncFormulaWorkbenchExamples;
    api.buildPossessiveStateNncFormulaWorkbenchSlice = buildPossessiveStateNncFormulaWorkbenchSlice;
    Object.defineProperty(api, "SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID", {
        configurable: true,
        enumerable: true,
        get() { return SUBJECT_NUMBER_CONNECTOR_SCHEMA_ID; },
    });
    api.getSubjectNumberConnectorFormulaSchema = getSubjectNumberConnectorFormulaSchema;
    api.normalizeSubjectNumberConnectorWorkbenchInput = normalizeSubjectNumberConnectorWorkbenchInput;
    api.buildSubjectNumberConnectorFormulaWorkbenchSlotRecords = buildSubjectNumberConnectorFormulaWorkbenchSlotRecords;
    api.buildSubjectNumberConnectorOrdinaryExample = buildSubjectNumberConnectorOrdinaryExample;
    api.buildSubjectNumberConnectorPossessiveExample = buildSubjectNumberConnectorPossessiveExample;
    api.buildSubjectNumberConnectorVncExample = buildSubjectNumberConnectorVncExample;
    api.buildSubjectNumberConnectorDiagnosticExample = buildSubjectNumberConnectorDiagnosticExample;
    api.buildSubjectNumberConnectorFormulaWorkbenchExamples = buildSubjectNumberConnectorFormulaWorkbenchExamples;
    api.buildSubjectNumberConnectorFormulaWorkbenchSlice = buildSubjectNumberConnectorFormulaWorkbenchSlice;
    api.generateOrdinaryNncClauseSet = generateOrdinaryNncClauseSet;
    api.resolveOrdinaryNncFixture = resolveOrdinaryNncFixture;
    api.resolveNawatPossessorPrefixFromSourceSubject = resolveNawatPossessorPrefixFromSourceSubject;
    api.resolveInstrumentivoPossessorPrefixFromSourceSubject = resolveInstrumentivoPossessorPrefixFromSourceSubject;
    api.buildAndrewsSourceSubjectFrame = buildAndrewsSourceSubjectFrame;
    api.isAndrewsSourceSubjectFrame = isAndrewsSourceSubjectFrame;
    api.getAndrewsSourceSubjectFramePossessorPrefix = getAndrewsSourceSubjectFramePossessorPrefix;
    api.buildSourceSubjectPossessorOperationFrame = buildSourceSubjectPossessorOperationFrame;
    api.getSourceSubjectPossessorOperationFrameMismatch = getSourceSubjectPossessorOperationFrameMismatch;
    api.isSourceSubjectPossessorOperationFrame = isSourceSubjectPossessorOperationFrame;
    api.isInstrumentivoImperfectActiveAbsolutiveMode = isInstrumentivoImperfectActiveAbsolutiveMode;
    api.getPredicateNominalPreviousNonZeroSegment = getPredicateNominalPreviousNonZeroSegment;
    api.resolvePredicateNominalAbsolutiveTtiConnector = resolvePredicateNominalAbsolutiveTtiConnector;
    api.shouldResolvePredicateNominalConnectorAsTti = shouldResolvePredicateNominalConnectorAsTti;
    api.getPredicateNominalPreviousNonZeroSegmentFromStemSpec = getPredicateNominalPreviousNonZeroSegmentFromStemSpec;
    api.buildPredicateNominalConnectorOperationFrame = buildPredicateNominalConnectorOperationFrame;
    api.getPredicateNominalConnectorOperationFrameMismatch = getPredicateNominalConnectorOperationFrameMismatch;
    api.resolvePredicateNominalAbsolutiveTtiConnectorFromFrame = resolvePredicateNominalAbsolutiveTtiConnectorFromFrame;
    api.buildPredicateNominalFormulaDisplayStem = buildPredicateNominalFormulaDisplayStem;
    api.getPredicateNominalResult = getPredicateNominalResult;
    api.getInstrumentivoResult = getInstrumentivoResult;
    api.getCalificativoInstrumentivoResult = getCalificativoInstrumentivoResult;
    api.getLocativoTemporalResult = getLocativoTemporalResult;
    return api;
}

export function installNncGlobals(targetObject = globalThis) {
    const api = createNncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
