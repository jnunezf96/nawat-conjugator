// Canonical modern ESM module.

export function createOrthographyApi(targetObject = globalThis) {
    const ORTHOGRAPHY_BRIDGE_VERSION = 1;
    const LESSON2_SOUND_SPELLING_FRAME_VERSION = 1;
    const ORTHOGRAPHY_PROFILE_IDS = Object.freeze({
      nawatModern: "nawat-modern",
      classicalNahuatl: "classical-nahuatl",
      unknown: "unknown"
    });
    const ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES = Object.freeze(["letter normalization is not morphology", "orthography match is not lexical evidence", "Classical Nahuatl form is not Nawat/Pipil fixture", "Classical Nahuatl tab output uses Andrews transcription directly, not the Nawat/Pipil orthography bridge", "open-stem is not fixture evidence", "sourceKind is not grammar class", "topic is not nounClass", "supplementation is not word generation", "pronominal NNC is not ordinary NNC", "nonactive stem derivation is not identical to passive output", "Andrews grammar authority is not Classical spelling authority for Nawat output", "orthography bridge cannot change Andrews formula slots or slot owners"]);
    const CLASSICAL_NAHUATL_LETTERS = Object.freeze("acehilmnopqtuxyzāēīō".split(""));
    const CLASSICAL_NAHUATL_DIGRAPHS = Object.freeze(["ch", "cu", "hu", "qu", "tz", "tl", "uc", "uh"]);
    const ORTHOGRAPHY_BRIDGE_RULES = Object.freeze([Object.freeze({
      id: "same-ch",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "ch",
      targetGrapheme: "ch",
      confidence: "confirmed-overlap",
      action: "profile-overlap",
      generationAllowed: false
    }), Object.freeze({
      id: "same-tz",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "tz",
      targetGrapheme: "tz",
      confidence: "confirmed-overlap",
      action: "profile-overlap",
      generationAllowed: false
    }), Object.freeze({
      id: "qu-k",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "qu",
      targetGrapheme: "k",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "cu-kw",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "cu",
      targetGrapheme: "kw",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "uc-kw",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "uc",
      targetGrapheme: "kw",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "hu-w",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "hu",
      targetGrapheme: "w",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "uh-w",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "uh",
      targetGrapheme: "w",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "x-sh",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "x",
      targetGrapheme: "sh",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "c-z-s",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "c/z",
      targetGrapheme: "s",
      confidence: "lossy",
      action: "diagnostic-only",
      generationAllowed: false
    }), Object.freeze({
      id: "long-vowel",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: ":",
      targetGrapheme: "",
      confidence: "lossy",
      action: "blocked",
      generationAllowed: false
    }), Object.freeze({
      id: "o-u",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "o",
      targetGrapheme: "u",
      confidence: "lossy",
      action: "blocked",
      generationAllowed: false
    }), Object.freeze({
      id: "tl",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "tl",
      targetGrapheme: "",
      confidence: "blocked-morphology",
      action: "blocked",
      generationAllowed: false
    })]);
    const LESSON2_SOUND_SPELLING_RULES = Object.freeze([Object.freeze({
      id: "h-num2-t",
      source: "h",
      sourceDisplay: "-h",
      target: "-t",
      slots: ["num2", "pers2", "num1-num2", "subject-number-connector"],
      syllablePositions: ["slot-final", "subposition-final", "final"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1-2.4",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica",
      processFamily: "graphic-representation",
      reason: "Classical plural/person-number -h is realized by the Nawat num2 connector as -t.",
      confidence: "slot-confirmed"
    }), Object.freeze({
      id: "h-syllable-final-glottal-j",
      source: "h",
      sourceDisplay: "-h",
      target: "j",
      slots: ["stem", "tronco", "predicate", "predicate-stem", "particle", "particula", "partícula", "unknown"],
      syllablePositions: ["final", "coda", "syllable-final", "word-final", "before-consonant"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1-2.4",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica",
      processFamily: "graphic-representation",
      reason: "Classical syllable-final glottal -h outside the num2 connector is realized in Nawat/Pipil as -j.",
      confidence: "slot-confirmed"
    }), Object.freeze({
      id: "h-nonfinal-evidence-required",
      source: "h",
      sourceDisplay: "h",
      targetCandidates: ["j"],
      slots: ["stem", "tronco", "predicate", "predicate-stem", "particle", "particula", "partícula", "unknown"],
      syllablePositions: ["initial", "medial", "unknown"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1-2.4",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica",
      processFamily: "graphic-representation",
      reason: "Classical h outside num2 is only automatic j when it is syllable-final glottal -h; other positions need Nawat/Pipil evidence.",
      confidence: "evidence-required"
    }), Object.freeze({
      id: "tl-nominal-t",
      source: "tl",
      sourceDisplay: "-tl",
      target: "-t",
      slots: ["sufijo-nominal", "sufijonominal", "nominal-connector", "num1-num2", "subject-number-connector"],
      syllablePositions: ["slot-final", "subposition-final", "final"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1-2.4",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica",
      processFamily: "graphic-representation",
      reason: "Classical nominal connector -tl is realized in Nawat/Pipil output as -t.",
      confidence: "slot-confirmed"
    }), Object.freeze({
      id: "uh-final-candidates",
      source: "uh",
      sourceDisplay: "-uh",
      targetCandidates: ["w", "uj", "j"],
      slots: ["stem", "tronco", "predicate", "predicate-stem", "unknown"],
      syllablePositions: ["final", "coda", "syllable-final"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1 and Appendix F",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica final de sílaba",
      processFamily: "graphic-representation",
      reason: "Classical syllable-final -uh needs Nawat slot and lexical evidence before choosing w, uj, or j.",
      confidence: "evidence-required"
    }), Object.freeze({
      id: "uc-final-candidates",
      source: "uc",
      sourceDisplay: "-uc",
      targetCandidates: ["k", "ku"],
      slots: ["stem", "tronco", "predicate", "predicate-stem", "unknown"],
      syllablePositions: ["final", "coda", "syllable-final"],
      ruleScope: "graphic-representation",
      andrewsSection: "2.1 and Appendix F",
      andrewsProcess: "Graphic Representations",
      spanishProcess: "representación gráfica final de sílaba",
      processFamily: "graphic-representation",
      reason: "Classical syllable-final -uc needs Nawat slot and lexical evidence before choosing k or ku.",
      confidence: "evidence-required"
    }), Object.freeze({
      id: "m-coda-n",
      source: "m",
      sourceDisplay: "m",
      target: "n",
      slots: ["surface-segment", "stem", "tronco", "predicate", "predicate-stem", "obj1", "unknown"],
      syllablePositions: ["coda", "syllable-final", "word-final", "before-consonant"],
      ruleScope: "assimilation-or-consonant-phone-shift",
      andrewsSection: "2.11.5 / 2.13.2",
      andrewsProcess: "Regressive Assimilation / Consonant-Phone Shift Other Than Assimilation",
      spanishProcess: "asimilación regresiva / cambio consonántico",
      processFamily: "assimilation-or-consonant-phone-shift",
      reason: "Coda m is realized as n before a consonant onset or word-finally in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat surface segment",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "kw-coda-k",
      source: "kw",
      sourceDisplay: "kw",
      target: "k",
      slots: ["surface-segment", "stem", "tronco", "predicate", "predicate-stem", "unknown"],
      syllablePositions: ["coda", "syllable-final", "word-final", "before-consonant"],
      ruleScope: "consonant-phone-shift",
      andrewsSection: "2.13.4",
      andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
      spanishProcess: "cambio consonántico",
      processFamily: "consonant-phone-shift",
      reason: "Coda kw is realized as k before a consonant onset or word-finally in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat surface segment",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "y-coda-sh",
      source: "y",
      sourceDisplay: "y",
      target: "sh",
      slots: ["surface-segment", "stem", "tronco", "predicate", "predicate-stem", "unknown"],
      syllablePositions: ["coda", "syllable-final", "word-final", "before-consonant"],
      ruleScope: "consonant-phone-shift",
      andrewsSection: "2.13.3",
      andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
      spanishProcess: "cambio consonántico",
      processFamily: "consonant-phone-shift",
      reason: "Coda y is realized as sh in the default Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat surface segment",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "y-coda-s",
      source: "y",
      sourceDisplay: "y",
      target: "s",
      slots: ["surface-segment", "stem", "tronco", "predicate", "predicate-stem", "unknown"],
      syllablePositions: ["coda", "syllable-final", "word-final", "before-consonant"],
      ruleScope: "consonant-phone-shift",
      andrewsSection: "2.13.3",
      andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
      spanishProcess: "cambio consonántico",
      processFamily: "consonant-phone-shift",
      reason: "Coda y is realized as s in the Nawat output surface when the current stem context selects the s-allomorph.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat surface segment",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "pers1-ni-i-n",
      source: "ni",
      sourceDisplay: "ni",
      target: "n",
      slots: ["pers1", "pers1-pers2"],
      syllablePositions: ["before-i-stem", "vowel-contact"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Subject prefix ni loses its final vowel before an i-initial predicate when no object prefix intervenes.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "pers1-ti-i-t",
      source: "ti",
      sourceDisplay: "ti",
      target: "t",
      slots: ["pers1", "pers1-pers2"],
      syllablePositions: ["before-i-stem", "vowel-contact"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Subject prefix ti loses its final vowel before an i-initial predicate when no object prefix intervenes.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "pers1-ni-before-vowel-n",
      source: "ni",
      sourceDisplay: "ni",
      target: "n",
      slots: ["pers1", "pers1-pers2"],
      syllablePositions: ["before-vowel", "vowel-contact", "pers1-obj1-boundary"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Subject prefix ni loses its final vowel before a following vowel-initial slot in the configured Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "pers1-ti-before-vowel-t",
      source: "ti",
      sourceDisplay: "ti",
      target: "t",
      slots: ["pers1", "pers1-pers2"],
      syllablePositions: ["before-vowel", "vowel-contact", "pers1-obj1-boundary"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Subject prefix ti loses its final vowel before a following vowel-initial slot in the configured Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "optative-shi-before-al-sh",
      source: "shi",
      sourceDisplay: "shi",
      target: "sh",
      slots: ["pers1", "pers1-pers2"],
      syllablePositions: ["before-vowel", "vowel-contact", "pers1-obj1-boundary", "before-al-object"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Optative shi loses final i before the vowel-initial directional object slot al in the configured Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "obj1-mu-before-vowel-m",
      source: "mu",
      sourceDisplay: "mu",
      target: "m",
      slots: ["obj1", "reflexivo"],
      syllablePositions: ["before-vowel", "before-i-stem", "before-al-stem", "before-a-cvl-stem", "vowel-contact"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Object/reflexive prefix mu loses final u before configured vowel-initial predicate or directional contexts in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "object-i-stem-i-elision",
      source: "i",
      sourceDisplay: "i",
      target: "",
      slots: ["stem-initial", "predicate-stem", "tronco"],
      syllablePositions: ["vowel-contact", "after-i-object"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "An i-initial predicate may lose initial i after an object prefix ending in i in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "obj1-ki-after-ni-ti-k",
      source: "ki",
      sourceDisplay: "ni/ti + ki",
      target: "k",
      slots: ["obj1"],
      syllablePositions: ["pers1-obj1-boundary"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Object prefix ki surfaces as k after ni or ti in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot boundary",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "supportive-i-stem-initial-elision",
      source: "i",
      sourceDisplay: "i",
      target: "",
      slots: ["stem-initial", "supportive", "predicate-stem", "tronco"],
      syllablePositions: ["after-object", "vowel-contact", "supportive-vowel", "slash-boundary"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "A configured supportive initial i is removed after an object or nonspecific slot in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "stem-final-a-elision",
      source: "a",
      sourceDisplay: "a",
      target: "",
      slots: ["stem-final", "predicate-stem", "tronco"],
      syllablePositions: ["vowel-contact", "stem-final-vowel", "final"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Configured ia/ua-final predicate stems lose final a in the Nawat output surface for this route.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "mu-iskalia-i-elision",
      source: "i",
      sourceDisplay: "i",
      target: "",
      slots: ["stem-initial", "predicate-stem", "tronco"],
      syllablePositions: ["vowel-contact", "after-mu"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "The configured mu + iskalia route loses initial i of the predicate stem in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "n-open-transition-nh",
      source: "n",
      sourceDisplay: "n",
      target: "nh",
      slots: ["surface-segment", "stem", "tronco", "obj1", "pers1", "poseedor", "possessor", "possessive-prefix", "unknown"],
      syllablePositions: ["before-vowel", "open-transition"],
      ruleScope: "open-transition",
      andrewsSection: "2.5",
      andrewsProcess: "Open Transition",
      spanishProcess: "transición abierta",
      processFamily: "open-transition",
      reason: "A vowel-plus-n segment receives h before a following vowel in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat surface segment",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "k-contact-single-k",
      source: "k+k",
      sourceDisplay: "k+k",
      target: "k",
      slots: ["obj1-stem-boundary", "surface-segment"],
      syllablePositions: ["consonant-contact", "before-k"],
      ruleScope: "consonant-loss",
      andrewsSection: "2.12",
      andrewsProcess: "Consonant Loss",
      spanishProcess: "pérdida consonántica",
      processFamily: "consonant-loss",
      reason: "Adjacent k at an object/stem boundary is realized as a single k in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot boundary",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "k-contact-before-kw-elision",
      source: "k+kw",
      sourceDisplay: "k+kw",
      target: "kw",
      slots: ["obj1-stem-boundary", "surface-segment"],
      syllablePositions: ["consonant-contact", "before-kw"],
      ruleScope: "consonant-loss",
      andrewsSection: "2.12",
      andrewsProcess: "Consonant Loss",
      spanishProcess: "pérdida consonántica",
      processFamily: "consonant-loss",
      reason: "Object-final k is not repeated before a kw-initial predicate in the Nawat output surface.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot boundary",
      targetLevel: "realized Nawat output surface"
    }), Object.freeze({
      id: "optative-ki-before-c-k",
      source: "ki",
      sourceDisplay: "ki",
      target: "k",
      slots: ["obj1"],
      syllablePositions: ["before-consonant"],
      ruleScope: "vowel-elision",
      andrewsSection: "2.14",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      processFamily: "vowel-elision",
      reason: "Object prefix ki may surface as k before a consonant in the configured optative surface route.",
      confidence: "surface-rule-confirmed",
      sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
      sourceLevel: "underlying Nawat slot surface",
      targetLevel: "realized Nawat output surface"
    })]);
    const LESSON2_COVERAGE_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson2-phoneme-graph-inventory",
      andrewsSection: "2.1",
      category: "phonemes-and-graphic-representations",
      andrewsProcess: "The Phonemes and Their Graphic Representations",
      spanishProcess: "fonemas y representaciones gráficas",
      coverageStatus: "implemented-foundation",
      engineSurface: "orthography profiles, grapheme splitting, modern Nawat phonology inventory",
      evidenceStatus: "repo-phonology-inventory",
      generationScope: "diagnostic-and-output-metadata"
    }), Object.freeze({
      id: "lesson2-vowels-length",
      andrewsSection: "2.2",
      category: "vowels-and-length",
      andrewsProcess: "Vowels",
      spanishProcess: "vocales",
      coverageStatus: "boundary-diagnostic",
      engineSurface: "Classical vowel length is detected as lossy orthography metadata; Nawat output does not generate length marks.",
      evidenceStatus: "nawat-evidence-required",
      generationScope: "blocked-for-generation"
    }), Object.freeze({
      id: "lesson2-consonants-digraphs",
      andrewsSection: "2.3",
      category: "consonants-and-digraphs",
      andrewsProcess: "Consonants",
      spanishProcess: "consonantes",
      coverageStatus: "partial-implemented",
      engineSurface: "Classical digraph bridge plus modern Nawat digraph inventory",
      evidenceStatus: "slot-or-lexical-evidence-required-for-lossy-cases",
      generationScope: "diagnostic-and-rule-spelling-conversion"
    }), Object.freeze({
      id: "lesson2-traditional-spelling",
      andrewsSection: "2.4",
      category: "traditional-spelling-conventions",
      andrewsProcess: "Traditional Spelling",
      spanishProcess: "ortografía tradicional",
      coverageStatus: "partial-implemented",
      engineSurface: "Classical-to-Nawat rule-spelling conversion and arbitrary-input bridge diagnostics",
      evidenceStatus: "conversion-is-not-lexical-evidence",
      generationScope: "grammar-rule-spelling-only"
    }), Object.freeze({
      id: "lesson2-open-transition",
      andrewsSection: "2.5",
      category: "internal-open-transition",
      andrewsProcess: "Spelling at Points of Internal Open Transition",
      spanishProcess: "ortografía en puntos de transición abierta interna",
      coverageStatus: "partial-implemented",
      engineSurface: "output-surface open-transition frames keep stem-boundary spelling metadata separate from lexical evidence",
      evidenceStatus: "implemented-output-rules-only",
      generationScope: "analysis-and-output-metadata"
    }), Object.freeze({
      id: "lesson2-syllable-structure",
      andrewsSection: "2.6",
      category: "syllable-structure",
      andrewsProcess: "Syllable Structure",
      spanishProcess: "estructura silábica",
      coverageStatus: "partial-implemented",
      engineSurface: "modern Nawat syllable parser and coda detection; syllables remain phonological metadata, not morpheme or morph boundaries",
      evidenceStatus: "repo-phonology-inventory",
      generationScope: "analysis-and-output-metadata"
    }), Object.freeze({
      id: "lesson2-stress",
      andrewsSection: "2.7",
      category: "stress",
      andrewsProcess: "Stress",
      spanishProcess: "acento",
      coverageStatus: "boundary-diagnostic",
      engineSurface: "stress is acknowledged as Lesson 2/2.16 prosody but is not used to generate surfaces",
      evidenceStatus: "not-modeled",
      generationScope: "not-generated"
    }), Object.freeze({
      id: "lesson2-long-consonants",
      andrewsSection: "2.8",
      category: "long-consonants",
      andrewsProcess: "Long Consonants",
      spanishProcess: "consonantes largas",
      coverageStatus: "boundary-diagnostic",
      engineSurface: "long consonants are not normalized into generated Nawat output without route evidence",
      evidenceStatus: "nawat-evidence-required",
      generationScope: "not-generated"
    }), Object.freeze({
      id: "lesson2-assimilation",
      andrewsSection: "2.9-2.11",
      category: "assimilation",
      andrewsProcess: "Assimilation",
      spanishProcess: "asimilación",
      coverageStatus: "partial-implemented",
      engineSurface: "Nawat output surface-chain frames for implemented assimilation/coalescence rules",
      evidenceStatus: "implemented-output-rules-only",
      generationScope: "output-surface-metadata"
    }), Object.freeze({
      id: "lesson2-consonant-loss",
      andrewsSection: "2.12",
      category: "consonant-loss",
      andrewsProcess: "Consonant Loss",
      spanishProcess: "pérdida consonántica",
      coverageStatus: "partial-implemented",
      engineSurface: "implemented adjacent-k and configured prefix/stem elision routes record sound/spelling frames",
      evidenceStatus: "implemented-output-rules-only",
      generationScope: "output-surface-metadata"
    }), Object.freeze({
      id: "lesson2-consonant-phone-shift",
      andrewsSection: "2.13",
      category: "consonant-phone-shift",
      andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
      spanishProcess: "cambio consonántico distinto de asimilación",
      coverageStatus: "partial-implemented",
      engineSurface: "implemented Nawat coda m/kw/y shifts record sound/spelling frames",
      evidenceStatus: "implemented-output-rules-only",
      generationScope: "output-surface-metadata"
    }), Object.freeze({
      id: "lesson2-vowel-elision",
      andrewsSection: "2.14",
      category: "vowel-elision",
      andrewsProcess: "Vowel Elision",
      spanishProcess: "elisión vocálica",
      coverageStatus: "partial-implemented",
      engineSurface: "implemented subject-prefix and object/stem vowel-contact routes record sound/spelling frames",
      evidenceStatus: "implemented-output-rules-only",
      generationScope: "output-surface-metadata"
    }), Object.freeze({
      id: "lesson2-long-vowel-glottal",
      andrewsSection: "2.15",
      category: "long-vowel-to-short-vowel-plus-glottal-stop",
      andrewsProcess: "Long Vowel to Short Vowel Plus Glottal Stop",
      spanishProcess: "vocal larga a vocal corta más cierre glotal",
      coverageStatus: "boundary-diagnostic",
      engineSurface: "long-vowel/glottal alternation is acknowledged but not generated without confirmed Nawat route evidence",
      evidenceStatus: "nawat-evidence-required",
      generationScope: "not-generated"
    }), Object.freeze({
      id: "lesson2-prosodic-contours",
      andrewsSection: "2.16",
      category: "prosodic-contours",
      andrewsProcess: "Prosodic Contours",
      spanishProcess: "contornos prosódicos",
      coverageStatus: "boundary-diagnostic",
      engineSurface: "sentence prosody is out of word-generation scope and remains sentence-level diagnostic metadata",
      evidenceStatus: "not-modeled",
      generationScope: "not-generated"
    })]);
    const LESSON2_COVERAGE_VALIDATION_REFS = Object.freeze(["src/tests/orthography.test.js"]);
    function getLesson2CoverageRedirectAction(entry = {}) {
      if (entry.coverageStatus === "implemented-foundation") {
        return "keep";
      }
      if (entry.generationScope === "not-generated" || entry.generationScope === "blocked-for-generation") {
        return "block-generation";
      }
      if (/evidence-required|required/.test(entry.evidenceStatus || "")) {
        return "needs-nawat-evidence";
      }
      return "diagnostic-only";
    }
    function buildLesson2CoverageDirective(entry = {}) {
      const section = entry.andrewsSection || "2";
      const process = entry.andrewsProcess || "Lesson 2 coverage";
      return `Use Andrews Lesson ${section} (${process}) as a pronunciation/orthography category; coverage metadata is not generation permission.`;
    }
    function attachOrthographyGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "orthography-bridge",
        routeFamily: "orthography",
        structuralSource: "Andrews Lesson 2",
        andrewsRefs: ["Andrews Lesson 2"],
        ...options
      });
    }
    function normalizeOrthographyInput(value) {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeLesson2SoundSpellingSlot(slot = "") {
      const normalized = String(slot || "").trim().toLowerCase().replace(/_/g, "-");
      if (!normalized) {
        return "unknown";
      }
      if (normalized === "subjectnumberconnector") {
        return "subject-number-connector";
      }
      if (normalized === "subject-number" || normalized === "num") {
        return "num1-num2";
      }
      if (normalized === "predicate-stem" || normalized === "stem" || normalized === "tronco") {
        return normalized;
      }
      return normalized;
    }
    function normalizeLesson2SoundSpellingPosition(position = "") {
      const normalized = String(position || "").trim().toLowerCase().replace(/_/g, "-");
      return normalized || "unknown";
    }
    function isClassicalOrthographyLetter(value = "") {
      return /^[a-zāēīō]$/i.test(String(value || ""));
    }
    function isClassicalOrthographyVowel(value = "") {
      return /^[aeiouāēīō]$/i.test(String(value || ""));
    }
    function inferClassicalHPosition(text = "", index = 0) {
      const source = String(text || "");
      const previous = source[index - 1] || "";
      const next = source[index + 1] || "";
      if (!next || !isClassicalOrthographyLetter(next)) {
        return "final";
      }
      if (isClassicalOrthographyVowel(previous)) {
        return isClassicalOrthographyVowel(next) ? "syllable-final" : "coda";
      }
      return index <= 0 ? "initial" : "medial";
    }
    function normalizeLesson2SoundSpellingSource(source = "") {
      const normalized = normalizeOrthographyInput(source);
      return normalized.replace(/^-+/, "").replace(/-+$/, "");
    }
    function findLesson2SoundSpellingRule(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const requestedRuleId = String(node.ruleId || "").trim();
      if (requestedRuleId) {
        return LESSON2_SOUND_SPELLING_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const source = normalizeLesson2SoundSpellingSource(node.source ?? node.sourceSurface ?? "");
      const slot = normalizeLesson2SoundSpellingSlot(node.slot ?? node.grammarSlot ?? "");
      const syllablePosition = normalizeLesson2SoundSpellingPosition(node.syllablePosition ?? node.position ?? "");
      return LESSON2_SOUND_SPELLING_RULES.find(rule => {
        if (rule.source !== source) {
          return false;
        }
        const slotMatches = rule.slots.includes(slot) || rule.slots.includes("unknown");
        const unknownPositionMayMatch = syllablePosition === "unknown" && rule.source !== "h";
        const positionMatches = rule.syllablePositions.includes(syllablePosition) || rule.syllablePositions.includes("unknown") || unknownPositionMayMatch;
        return slotMatches && positionMatches;
      }) || null;
    }
    function buildLesson2SoundSpellingFrame(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const sourceSurface = String(node.source ?? node.sourceSurface ?? "");
      const normalizedSource = normalizeLesson2SoundSpellingSource(sourceSurface);
      const grammarSlot = normalizeLesson2SoundSpellingSlot(node.slot ?? node.grammarSlot ?? "");
      const syllablePosition = normalizeLesson2SoundSpellingPosition(node.syllablePosition ?? node.position ?? "");
      const explicitTarget = node.target ?? node.targetSurface ?? node.convertedOutput ?? "";
      const rule = findLesson2SoundSpellingRule({
        ruleId: node.ruleId || "",
        source: sourceSurface,
        slot: grammarSlot,
        syllablePosition
      });
      let target = "";
      let targetCandidates = [];
      let ruleId = "";
      let reason = "";
      let ruleScope = "graphic-representation";
      let confidence = "diagnostic";
      let andrewsSection = "";
      let andrewsProcess = "";
      let spanishProcess = "";
      let processFamily = "";
      if (rule) {
        target = String(rule.target || "");
        targetCandidates = Array.isArray(rule.targetCandidates) ? [...rule.targetCandidates] : [];
        ruleId = rule.id;
        reason = rule.reason;
        ruleScope = rule.ruleScope;
        confidence = rule.confidence;
        andrewsSection = rule.andrewsSection || "";
        andrewsProcess = rule.andrewsProcess || "";
        spanishProcess = rule.spanishProcess || "";
        processFamily = rule.processFamily || "";
      } else if (explicitTarget) {
        target = String(explicitTarget || "");
        ruleId = "classical-to-nawat-letter-conversion";
        reason = "Classical grammar-rule spelling is realized in Nawat/Pipil letters through the orthography bridge.";
        andrewsSection = "2.1-2.4";
        andrewsProcess = "Graphic Representations";
        spanishProcess = "representación gráfica";
        processFamily = "graphic-representation";
      } else if (normalizedSource) {
        const converted = convertClassicalLettersToNawat(sourceSurface, {
          contract: "lesson-2-sound-spelling-frame"
        });
        target = converted.output || "";
        ruleId = "classical-to-nawat-letter-conversion";
        reason = "Classical grammar-rule spelling is realized in Nawat/Pipil letters through the orthography bridge.";
        andrewsSection = "2.1-2.4";
        andrewsProcess = "Graphic Representations";
        spanishProcess = "representación gráfica";
        processFamily = "graphic-representation";
      }
      const diagnostics = [];
      if (!normalizedSource) {
        diagnostics.push({
          id: "lesson2-sound-spelling-missing-source",
          severity: "warning",
          message: "Lesson 2 sound/spelling metadata needs a source spelling."
        });
      }
      if (grammarSlot === "unknown") {
        diagnostics.push({
          id: "lesson2-sound-spelling-slot-needed",
          severity: "info",
          message: "A spelling correspondence is weaker until the grammar slot is known."
        });
      }
      if (targetCandidates.length && !target) {
        diagnostics.push({
          id: "lesson2-sound-spelling-choice-needs-evidence",
          severity: "info",
          targetCandidates,
          message: "This syllable-final spelling has multiple Nawat realizations and needs slot or lexical evidence."
        });
      }
      return {
        kind: "lesson2-sound-spelling-frame",
        version: LESSON2_SOUND_SPELLING_FRAME_VERSION,
        sourceProfileId: node.sourceProfileId || rule?.sourceProfileId || ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
        targetProfileId: node.targetProfileId || rule?.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        sourceSurface,
        normalizedSource,
        target,
        targetCandidates,
        grammarSlot,
        syllablePosition,
        ruleId,
        ruleScope,
        andrewsSection,
        andrewsProcess,
        spanishProcess,
        processFamily,
        confidence,
        sourceLevel: node.sourceLevel || rule?.sourceLevel || "Andrews grammar-rule spelling",
        targetLevel: node.targetLevel || rule?.targetLevel || "Modern Nawat/Pipil spelling realization",
        reason,
        scopeNote: node.scopeNote || rule?.scopeNote || (rule ? "Correspondence is conditioned by grammar slot and phonological position; it is not a global letter replacement." : "Orthography conversion only; not a generated Nawat/Pipil lexical form."),
        slotSensitive: grammarSlot !== "unknown",
        generationAllowed: false,
        evidenceStatus: targetCandidates.length && !target ? "nawat-evidence-required" : rule ? "slot-sensitive-spelling" : "orthography-conversion-only",
        diagnostics
      };
    }
    function getLesson2CoverageInventory() {
      return LESSON2_COVERAGE_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        directive: buildLesson2CoverageDirective(entry),
        redirectAction: getLesson2CoverageRedirectAction(entry),
        validationRefs: [...LESSON2_COVERAGE_VALIDATION_REFS],
        generationAllowed: false
      }));
    }
    function buildLesson2CoverageFrame() {
      const inventory = getLesson2CoverageInventory();
      const coverageCounts = inventory.reduce((counts, entry) => {
        const key = entry.coverageStatus || "unknown";
        counts[key] = (counts[key] || 0) + 1;
        return counts;
      }, {});
      const pdfRefs = inventory.map(entry => entry.pdfRef);
      const remainingGaps = inventory.filter(entry => entry.coverageStatus !== "implemented-foundation").map(entry => ({
        id: entry.id,
        pdfRef: entry.pdfRef,
        coverageStatus: entry.coverageStatus,
        redirectAction: entry.redirectAction,
        evidenceStatus: entry.evidenceStatus,
        generationScope: entry.generationScope
      }));
      const frame = {
        kind: "lesson2-coverage-frame",
        version: LESSON2_SOUND_SPELLING_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        scope: "pronunciation-and-orthography",
        inventory,
        coverageCounts,
        pdfRefs,
        pursuit: {
          mainTarget: "fully Andrews-directed Nawat Conjugador",
          stepNumber: 2,
          aimStatus: "shooting",
          plannedArrows: [{
            id: "lesson-2-subsection-coverage-audit",
            type: "metadata-diagnostic-test",
            aim: "Aplicar Corrección antes de existencia: exponer cada subsección de Andrews Lección 2 por la ruta de entrada a salida como comportamiento de sonido, escritura y puente ortográfico antes de tratar la ortografía como implementada, con sonda de fallo para detectar conversión existente que cambie ranuras de fórmula.",
            andrewsRefs: pdfRefs,
            expectedFeedbackRefs: [...LESSON2_COVERAGE_VALIDATION_REFS]
          }, {
            id: "lesson-2-formula-orthography-authority-audit",
            type: "orthography-formula-test",
            aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 2 por la ruta de entrada a salida como comportamiento de puente ortográfico que realiza letras sin cambiar orden ni dueño de ranura, con sonda de fallo para detectar h de num2 tratado como j glotal o h final silábica tratada como t de num2.",
            andrewsRefs: pdfRefs,
            expectedFeedbackRefs: [...LESSON2_COVERAGE_VALIDATION_REFS]
          }],
          firedArrows: [{
            id: "lesson-2-subsection-coverage-audit",
            result: "hit",
            correction: "Corrección antes de existencia: Lección 2 lleva referencias de PDF por subsección, acciones de redirección, referencias de validación y política sin generación; la ruta de entrada a salida conserva comportamiento de puente ortográfico sin cambiar ranuras de fórmula.",
            andrewsRefs: pdfRefs,
            feedbackRefs: [...LESSON2_COVERAGE_VALIDATION_REFS]
          }, {
            id: "lesson-2-formula-orthography-authority-audit",
            result: "hit",
            correction: "Corrección antes de existencia: la ortografía de Andrews queda subordinada a ranuras de fórmula como comportamiento verificable; la sonda de fallo contra existencia sola es h de num2 realizado como j glotal o h final silábica realizado como t de num2.",
            andrewsRefs: pdfRefs,
            feedbackRefs: [...LESSON2_COVERAGE_VALIDATION_REFS]
          }],
          hitCount: 2,
          missCount: 0,
          remainingGaps,
          closestPass: false
        },
        sourceOfTruth: {
          grammarArchitecture: "Andrews Lesson 2",
          outputSpelling: "Modern Nawat/Pipil orthography",
          generatedSurfaces: "repo data and configured Nawat engine rules",
          pdfRefs
        },
        generationPolicy: ["diagnostic coverage is not generation permission", "Classical spelling is not imported as Nawat output", "lossy or evidence-sensitive categories remain blocked or diagnostic"]
      };
      return attachOrthographyGrammarContract(frame, {
        metadataKind: "lesson2-coverage-frame",
        routeStage: "classify-lesson-2-coverage",
        sourceInput: "Andrews Lesson 2",
        supported: true,
        evidenceStatus: "coverage-inventory",
        diagnostics: [],
        orthographyFrame: {
          sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
          targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
          sourceSurface: "Andrews Lesson 2",
          surface: "",
          surfaceForms: [],
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true,
          coverageCounts,
          pdfRefs
        },
        targetContract: {
          metadataKind: "lesson2-coverage-frame",
          generationAllowed: false,
          coverageCounts,
          pdfRefs,
          closestPass: false
        }
      });
    }
    function getStaticNawatVowels() {
      if (typeof targetObject.VOWELS === "string" && targetObject.VOWELS) {
        return targetObject.VOWELS.split("");
      }
      return ["a", "e", "i", "u"];
    }
    function getStaticNawatConsonants() {
      if (typeof targetObject.VALID_CONSONANTS !== "undefined" && targetObject.VALID_CONSONANTS && typeof targetObject.VALID_CONSONANTS.forEach === "function") {
        return Array.from(targetObject.VALID_CONSONANTS);
      }
      return ["p", "t", "k", "m", "n", "s", "l", "w", "y", "j", "c", "z", "d"];
    }
    function getStaticNawatDigraphs() {
      if (typeof targetObject.DIGRAPH_SET !== "undefined" && targetObject.DIGRAPH_SET && typeof targetObject.DIGRAPH_SET.forEach === "function") {
        return Array.from(targetObject.DIGRAPH_SET);
      }
      return ["tz", "sh", "ch", "kw", "nh"];
    }
    function getOrthographyProfileInventory() {
      const nawatVowels = getStaticNawatVowels();
      const nawatConsonants = getStaticNawatConsonants();
      const nawatDigraphs = getStaticNawatDigraphs();
      return Object.freeze({
        [ORTHOGRAPHY_PROFILE_IDS.nawatModern]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
          label: "Modern Nawat/Pipil",
          authority: "repo/static_phonology.json",
          vowels: Object.freeze(nawatVowels),
          consonants: Object.freeze(nawatConsonants),
          digraphs: Object.freeze(nawatDigraphs)
        }),
        [ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
          label: "Classical Nahuatl orthography",
          authority: "Andrews Lesson 2 source profile, not Nawat output spelling",
          letters: CLASSICAL_NAHUATL_LETTERS,
          digraphs: CLASSICAL_NAHUATL_DIGRAPHS
        }),
        [ORTHOGRAPHY_PROFILE_IDS.unknown]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.unknown,
          label: "Unknown orthography",
          authority: "diagnostic-only"
        })
      });
    }
    function getOrthographyAntiConflationRules() {
      return Array.from(ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES);
    }
    function getOrthographyDigraphs(profileId) {
      if (profileId === ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl) {
        return CLASSICAL_NAHUATL_DIGRAPHS;
      }
      if (profileId === ORTHOGRAPHY_PROFILE_IDS.nawatModern) {
        return getStaticNawatDigraphs();
      }
      return Array.from(new Set([...getStaticNawatDigraphs(), ...CLASSICAL_NAHUATL_DIGRAPHS]));
    }
    function isOrthographyBoundaryChar(char) {
      return /[\s#()[\]{}|~\/-]/.test(char);
    }
    function splitOrthographyGraphemes(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.unknown;
      const digraphs = getOrthographyDigraphs(profileId).slice().sort((left, right) => right.length - left.length);
      const graphemes = [];
      let index = 0;
      while (index < normalized.length) {
        const char = normalized[index];
        if (isOrthographyBoundaryChar(char)) {
          index += 1;
          continue;
        }
        const match = digraphs.find(digraph => normalized.slice(index, index + digraph.length) === digraph);
        if (match) {
          graphemes.push(match);
          index += match.length;
          continue;
        }
        graphemes.push(char);
        index += 1;
      }
      return graphemes;
    }
    function getModernNawatAllowedGraphemeSet() {
      return new Set([...getStaticNawatVowels(), ...getStaticNawatConsonants(), ...getStaticNawatDigraphs()]);
    }
    function getClassicalAllowedGraphemeSet() {
      return new Set([...CLASSICAL_NAHUATL_LETTERS, ...CLASSICAL_NAHUATL_DIGRAPHS]);
    }
    function getInvalidOrthographyGraphemes(value, options = {}) {
      const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      const allowed = profileId === ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl ? getClassicalAllowedGraphemeSet() : getModernNawatAllowedGraphemeSet();
      return splitOrthographyGraphemes(value, {
        profileId
      }).filter(grapheme => !allowed.has(grapheme));
    }
    function getOrthographyRuleMatches(normalized) {
      if (!normalized) {
        return [];
      }
      return ORTHOGRAPHY_BRIDGE_RULES.filter(rule => {
        if (rule.sourceGrapheme === "c/z") {
          return /(^|[^s])c(?!h)/.test(normalized);
        }
        if (rule.sourceGrapheme === ":") {
          return normalized.includes(":");
        }
        return normalized.includes(rule.sourceGrapheme);
      });
    }
    function inferOrthographyProfileId(value) {
      const normalized = normalizeOrthographyInput(value);
      if (!normalized) {
        return ORTHOGRAPHY_PROFILE_IDS.unknown;
      }
      const classicalMarkers = getOrthographyRuleMatches(normalized).filter(rule => rule.id !== "same-ch" && rule.id !== "same-tz");
      const nawatInvalid = getInvalidOrthographyGraphemes(normalized, {
        profileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern
      });
      if (classicalMarkers.length || nawatInvalid.some(grapheme => ["q", "x", "h", "o", ":"].includes(grapheme))) {
        return ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl;
      }
      if (!nawatInvalid.length) {
        return ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      }
      return ORTHOGRAPHY_PROFILE_IDS.unknown;
    }
    function getOrthographyBridgeDiagnostics(matches, options = {}) {
      const diagnostics = [{
        id: "orthography-bridge-no-generation",
        severity: "info",
        message: "Orthography bridge metadata never authorizes Nawat/Pipil generation."
      }];
      const blocked = matches.filter(match => match.action === "blocked");
      if (blocked.length) {
        diagnostics.push({
          id: "orthography-bridge-blocked-lossy",
          severity: "warning",
          ruleIds: blocked.map(match => match.id),
          message: "A spelling correspondence is lossy or morphology-sensitive and must remain diagnostic-only."
        });
      }
      if (options.requireNawatEvidence !== false) {
        diagnostics.push({
          id: "orthography-bridge-needs-nawat-evidence",
          severity: "info",
          message: "A spelling match is not lexical evidence; confirmed Nawat/Pipil data is still required."
        });
      }
      return diagnostics;
    }
    function convertClassicalLettersToNawat(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const correspondences = [];
      let output = "";
      let index = 0;
      const pushConverted = (source, target, ruleId, note = "") => {
        correspondences.push({
          source,
          target,
          ruleId,
          note
        });
        output += target;
        index += source.length;
      };
      while (index < normalized.length) {
        const rest = normalized.slice(index);
        const char = normalized[index];
        if (rest.startsWith("ch")) {
          pushConverted("ch", "ch", "same-ch");
        } else if (rest.startsWith("tz")) {
          pushConverted("tz", "tz", "same-tz");
        } else if (rest.startsWith("tl")) {
          pushConverted("tl", "t", "tl-t", "Nawat/Pipil realizes the Classical lateral affricate spelling without l in the current grammar-rule surface.");
        } else if (rest.startsWith("qu")) {
          pushConverted("qu", "k", "qu-k");
        } else if (rest.startsWith("cu")) {
          pushConverted("cu", "kw", "cu-kw");
        } else if (rest.startsWith("uc")) {
          pushConverted("uc", "kw", "uc-kw");
        } else if (rest.startsWith("hu")) {
          pushConverted("hu", "w", "hu-w");
        } else if (rest.startsWith("uh")) {
          pushConverted("uh", "w", "uh-w");
        } else if (char === "h") {
          const syllablePosition = options.syllablePosition ?? inferClassicalHPosition(normalized, index);
          const soundSpellingRule = findLesson2SoundSpellingRule({
            source: "h",
            slot: options.slot ?? options.grammarSlot ?? "",
            syllablePosition
          });
          if (soundSpellingRule?.target) {
            pushConverted("h", soundSpellingRule.target.replace(/^-/, ""), soundSpellingRule.id, soundSpellingRule.reason);
          } else {
            output += char;
            index += 1;
          }
        } else if (char === "x") {
          pushConverted("x", "sh", "x-sh");
        } else if (char === "z") {
          pushConverted("z", "s", "z-s");
        } else if (char === "c") {
          const next = normalized[index + 1] || "";
          const target = next === "e" || next === "i" ? "s" : "k";
          pushConverted("c", target, target === "s" ? "c-front-s" : "c-k");
        } else if (char === "o") {
          pushConverted("o", "u", "o-u");
        } else if (char === ":") {
          correspondences.push({
            source: ":",
            target: "",
            ruleId: "long-vowel-dropped",
            note: "Modern Nawat/Pipil output does not use Classical vowel-length notation."
          });
          index += 1;
        } else {
          output += char;
          index += 1;
        }
      }
      const conversion = {
        kind: "classical-to-nawat-letter-conversion",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        output,
        sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
        targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        correspondences,
        orthographyConversionAllowed: true,
        generationAllowed: false,
        evidence: {
          grammarAuthority: "Andrews PDF",
          targetAuthority: "Modern Nawat/Pipil orthography",
          contract: options.contract || "grammar-rule-surface-realization"
        },
        diagnostics: ["classical-to-nawat-orthography-conversion", "orthography-conversion-is-not-lexical-evidence"]
      };
      const soundSpellingFrame = buildLesson2SoundSpellingFrame({
        source: conversion.input,
        convertedOutput: output,
        slot: options.slot ?? options.grammarSlot ?? "",
        syllablePosition: options.syllablePosition ?? ""
      });
      return attachOrthographyGrammarContract(conversion, {
        metadataKind: "classical-to-nawat-letter-conversion",
        routeStage: "convert-rule-spelling",
        sourceInput: conversion.input,
        surface: output,
        surfaceForms: output ? [output] : [],
        supported: true,
        diagnostics: conversion.diagnostics,
        evidenceStatus: "orthography-conversion-only",
        orthographyFrame: {
          sourceProfileId: conversion.sourceProfileId,
          targetProfileId: conversion.targetProfileId,
          sourceSurface: conversion.normalized,
          surface: output,
          surfaceForms: output ? [output] : [],
          correspondences,
          soundSpellingFrame,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true,
          orthographyConversionAllowed: true
        },
        targetContract: {
          metadataKind: "classical-to-nawat-letter-conversion",
          generationAllowed: false,
          orthographyConversionAllowed: true,
          doesNotCreateLexicalEvidence: true,
          soundSpellingFrame
        }
      });
    }
    function getClassicalLettersAsNawat(value, options = {}) {
      return convertClassicalLettersToNawat(value, options).output;
    }
    function buildOrthographyBridgeMetadata(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const sourceProfileId = options.sourceProfileId || inferOrthographyProfileId(normalized);
      const targetProfileId = options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      const graphemes = splitOrthographyGraphemes(normalized, {
        profileId: sourceProfileId
      });
      const matches = getOrthographyRuleMatches(normalized).filter(rule => (sourceProfileId === ORTHOGRAPHY_PROFILE_IDS.unknown || rule.sourceProfile === sourceProfileId) && rule.targetProfile === targetProfileId);
      const blocked = matches.filter(match => match.action === "blocked");
      const bridge = {
        kind: "orthography-bridge",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        sourceProfileId,
        targetProfileId,
        graphemes,
        correspondences: matches.map(match => ({
          id: match.id,
          sourceGrapheme: match.sourceGrapheme,
          targetGrapheme: match.targetGrapheme,
          confidence: match.confidence,
          action: match.action,
          generationAllowed: false
        })),
        blocked: blocked.map(match => match.id),
        generationAllowed: false,
        antiConflationRules: Array.from(ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES),
        diagnostics: getOrthographyBridgeDiagnostics(matches, options),
        evidence: {
          grammarAuthority: "Andrews PDF",
          orthographySource: "Andrews Lesson 2 / Appendix F source profiles",
          targetAuthority: "Modern Nawat/Pipil orthography"
        }
      };
      return attachOrthographyGrammarContract(bridge, {
        metadataKind: "orthography-bridge",
        routeStage: "classify-bridge",
        sourceInput: bridge.input,
        supported: blocked.length === 0,
        diagnostics: bridge.diagnostics,
        evidenceStatus: blocked.length ? "orthography-blocked" : "orthography-diagnostic",
        orthographyFrame: {
          sourceProfileId,
          targetProfileId,
          sourceSurface: normalized,
          surface: "",
          surfaceForms: [],
          graphemes,
          correspondences: bridge.correspondences,
          blocked: bridge.blocked,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true
        },
        targetContract: {
          metadataKind: "orthography-bridge",
          generationAllowed: false,
          doesNotCreateLexicalEvidence: true,
          blocked: bridge.blocked
        }
      });
    }
    function classifyOrthographyInput(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const profileId = options.profileId || inferOrthographyProfileId(normalized);
      const profiles = getOrthographyProfileInventory();
      const graphemes = splitOrthographyGraphemes(normalized, {
        profileId
      });
      const invalidGraphemes = getInvalidOrthographyGraphemes(normalized, {
        profileId
      });
      const bridge = buildOrthographyBridgeMetadata(normalized, {
        sourceProfileId: profileId,
        targetProfileId: options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        requireNawatEvidence: options.requireNawatEvidence
      });
      const classification = {
        kind: "orthography-classification",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        profileId,
        profileLabel: profiles[profileId]?.label || profiles[ORTHOGRAPHY_PROFILE_IDS.unknown].label,
        graphemes,
        invalidGraphemes,
        bridge,
        generationAllowed: false
      };
      return attachOrthographyGrammarContract(classification, {
        metadataKind: "orthography-classification",
        routeStage: "classify-input",
        sourceInput: classification.input,
        supported: invalidGraphemes.length === 0,
        diagnostics: bridge.diagnostics,
        evidenceStatus: invalidGraphemes.length ? "orthography-invalid" : "orthography-profile-classified",
        orthographyFrame: {
          sourceProfileId: profileId,
          targetProfileId: classification.bridge.targetProfileId,
          sourceSurface: normalized,
          surface: "",
          surfaceForms: [],
          graphemes,
          invalidGraphemes,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true
        },
        targetContract: {
          metadataKind: "orthography-classification",
          generationAllowed: false,
          profileId,
          invalidGraphemes
        }
      });
    }
    function installOrthographyClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        attachOrthographyGrammarContract,
        normalizeOrthographyInput,
        normalizeLesson2SoundSpellingSlot,
        normalizeLesson2SoundSpellingPosition,
        normalizeLesson2SoundSpellingSource,
        findLesson2SoundSpellingRule,
        buildLesson2SoundSpellingFrame,
        getLesson2CoverageInventory,
        buildLesson2CoverageFrame,
        getStaticNawatVowels,
        getStaticNawatConsonants,
        getStaticNawatDigraphs,
        getOrthographyProfileInventory,
        getOrthographyAntiConflationRules,
        getOrthographyDigraphs,
        isOrthographyBoundaryChar,
        splitOrthographyGraphemes,
        getModernNawatAllowedGraphemeSet,
        getClassicalAllowedGraphemeSet,
        getInvalidOrthographyGraphemes,
        getOrthographyRuleMatches,
        inferOrthographyProfileId,
        getOrthographyBridgeDiagnostics,
        convertClassicalLettersToNawat,
        getClassicalLettersAsNawat,
        buildOrthographyBridgeMetadata,
        classifyOrthographyInput
      });
      return globalTarget;
    }
    installOrthographyClassicGlobals();

    const api = {};
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_VERSION; },
    });
    Object.defineProperty(api, "LESSON2_SOUND_SPELLING_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return LESSON2_SOUND_SPELLING_FRAME_VERSION; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_PROFILE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_PROFILE_IDS; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LETTERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LETTERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_DIGRAPHS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_DIGRAPHS; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_RULES; },
    });
    Object.defineProperty(api, "LESSON2_SOUND_SPELLING_RULES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON2_SOUND_SPELLING_RULES; },
    });
    Object.defineProperty(api, "LESSON2_COVERAGE_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON2_COVERAGE_INVENTORY; },
    });
    Object.defineProperty(api, "LESSON2_COVERAGE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON2_COVERAGE_VALIDATION_REFS; },
    });
    api.getLesson2CoverageRedirectAction = getLesson2CoverageRedirectAction;
    api.buildLesson2CoverageDirective = buildLesson2CoverageDirective;
    api.attachOrthographyGrammarContract = attachOrthographyGrammarContract;
    api.normalizeOrthographyInput = normalizeOrthographyInput;
    api.normalizeLesson2SoundSpellingSlot = normalizeLesson2SoundSpellingSlot;
    api.normalizeLesson2SoundSpellingPosition = normalizeLesson2SoundSpellingPosition;
    api.isClassicalOrthographyLetter = isClassicalOrthographyLetter;
    api.isClassicalOrthographyVowel = isClassicalOrthographyVowel;
    api.inferClassicalHPosition = inferClassicalHPosition;
    api.normalizeLesson2SoundSpellingSource = normalizeLesson2SoundSpellingSource;
    api.findLesson2SoundSpellingRule = findLesson2SoundSpellingRule;
    api.buildLesson2SoundSpellingFrame = buildLesson2SoundSpellingFrame;
    api.getLesson2CoverageInventory = getLesson2CoverageInventory;
    api.buildLesson2CoverageFrame = buildLesson2CoverageFrame;
    api.getStaticNawatVowels = getStaticNawatVowels;
    api.getStaticNawatConsonants = getStaticNawatConsonants;
    api.getStaticNawatDigraphs = getStaticNawatDigraphs;
    api.getOrthographyProfileInventory = getOrthographyProfileInventory;
    api.getOrthographyAntiConflationRules = getOrthographyAntiConflationRules;
    api.getOrthographyDigraphs = getOrthographyDigraphs;
    api.isOrthographyBoundaryChar = isOrthographyBoundaryChar;
    api.splitOrthographyGraphemes = splitOrthographyGraphemes;
    api.getModernNawatAllowedGraphemeSet = getModernNawatAllowedGraphemeSet;
    api.getClassicalAllowedGraphemeSet = getClassicalAllowedGraphemeSet;
    api.getInvalidOrthographyGraphemes = getInvalidOrthographyGraphemes;
    api.getOrthographyRuleMatches = getOrthographyRuleMatches;
    api.inferOrthographyProfileId = inferOrthographyProfileId;
    api.getOrthographyBridgeDiagnostics = getOrthographyBridgeDiagnostics;
    api.convertClassicalLettersToNawat = convertClassicalLettersToNawat;
    api.getClassicalLettersAsNawat = getClassicalLettersAsNawat;
    api.buildOrthographyBridgeMetadata = buildOrthographyBridgeMetadata;
    api.classifyOrthographyInput = classifyOrthographyInput;
    api.installOrthographyClassicGlobals = installOrthographyClassicGlobals;
    return api;
}

export function installOrthographyGlobals(targetObject = globalThis) {
    const api = createOrthographyApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
