// Canonical modern ESM module.

export function createClassicalNahuatlLesson6TransitiveVncObjectRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON6_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE = "#pers1-pers2+va(STEM)tns+num1-num2#";
    const CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE = "#pers1-pers2+va1-va2(STEM)tns+num1-num2#";
    const CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY = "Transcription line ranges are the legal deed; digest anchors are navigation aids only.";
    const CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS = Object.freeze(["pers1-pers2", "va", "va1-va2", "tns", "num1-num2"]);
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY = "conditional-support-vowel-boundary-action";
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS = Object.freeze({
      INSERT: "insert",
      DROP: "drop",
      RETAIN: "retain",
      NOT_NEEDED: "not-needed",
      NOT_SUPPORTIVE: "not-supportive"
    });
    const CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-61-transitive-valence-difference",
      tagId: "cn-l6-transitive-vnc-formulas",
      section: "6.1",
      lineStart: 2684,
      lineEnd: 2691,
      exactWitness: "The two transitive formulas given in \u00a7 4.5 differ from the\nintransitive formula only in the Valence position",
      rule: "The transitive VNC formulas differ from the intransitive VNC formula only by the objective Valence position.",
      clauseKind: "verbal-nuclear-clause",
      transitivity: "transitive",
      valencePositionRequired: true
    }), Object.freeze({
      id: "cn-l6-62-monadic-linear-formula",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2",
      lineStart: 2716,
      lineEnd: 2725,
      exactWitness: "Linear format: #pers\u00b9-pers\u00b2+va(STEM)tns+num\u00b9-num\u00b2#",
      rule: "The monadic transitive VNC formula uses a single +va valence position.",
      formulaTemplate: CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE,
      valencePosition: "va",
      valenceArity: "monadic"
    }), Object.freeze({
      id: "cn-l6-63-dyadic-linear-formula",
      tagId: "cn-l6-dyadic-valence-position",
      section: "6.3",
      lineStart: 2744,
      lineEnd: 2749,
      exactWitness: "Linear format: #pers\u00b9-pers\u00b2+va\u00b9-va\u00b2(STEM)tns+num\u00b9-num\u00b2#.",
      rule: "The dyadic transitive VNC formula uses +va1-va2 for specific mainline object pronouns.",
      formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
      valencePosition: "va1-va2",
      valenceArity: "dyadic"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-61-objective-case-valence-position",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2687,
      lineEnd: 2691,
      exactWitness: "The case category\nhere exploits the feature objective.",
      rule: "The Lesson 6 Valence position is an objective-case personal-pronoun position.",
      category: "case",
      feature: "objective"
    }), Object.freeze({
      id: "cn-l6-61-trajectory-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2692,
      lineEnd: 2698,
      exactWitness: "The category of trajectory has three features: projective, reflexive, reciprocative.",
      rule: "Objective pronouns distinguish projective, reflexive, and reciprocative trajectory.",
      category: "trajectory",
      features: Object.freeze(["projective", "reflexive", "reciprocative"])
    }), Object.freeze({
      id: "cn-l6-61-specificity-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2699,
      lineEnd: 2705,
      exactWitness: "The category of specificity has two features: specific and nonspecific.",
      rule: "Specific objects are personal pronouns; nonspecific objects are indefinite pronouns.",
      category: "specificity",
      features: Object.freeze(["specific", "nonspecific"])
    }), Object.freeze({
      id: "cn-l6-61-prominence-features",
      tagId: "cn-l6-object-pronoun-categories",
      section: "6.1",
      lineStart: 2706,
      lineEnd: 2711,
      exactWitness: "The category of prominence has two features: mainline and shuntline.",
      rule: "Objective pronouns distinguish mainline and shuntline prominence.",
      category: "prominence",
      features: Object.freeze(["mainline", "shuntline"])
    })]);
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-62-monadic-three-morphs",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2",
      lineStart: 2724,
      lineEnd: 2730,
      exactWitness: "The Valence position in this formula concentrates the pronominal categories into one of three\npossible morphs:",
      rule: "Monadic +va concentrates the object-pronoun categories into ne, te, or tla.",
      valencePosition: "va"
    }), Object.freeze({
      id: "cn-l6-621-shuntline-reflexive-ne",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2.1",
      lineStart: 2726,
      lineEnd: 2727,
      exactWitness: "a shuntline reflexive/reciprocative-object morph: ne",
      rule: "ne is the monadic shuntline reflexive/reciprocative object morph.",
      valencePosition: "va",
      morph: "ne"
    }), Object.freeze({
      id: "cn-l6-622-nonspecific-te-tla",
      tagId: "cn-l6-monadic-valence-position",
      section: "6.2.2",
      lineStart: 2728,
      lineEnd: 2743,
      exactWitness: "a. te = someone; anyone; people (in general); everyone; all",
      rule: "te and tla are nonspecific third-person projective indefinite-pronoun morphs.",
      valencePosition: "va",
      morphs: Object.freeze(["te", "tla"])
    })]);
    const CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-63-specific-mainline-dyadic",
      tagId: "cn-l6-dyadic-valence-position",
      section: "6.3",
      lineStart: 2744,
      lineEnd: 2749,
      exactWitness: "When the personal\npronoun in the objective case is mainline and has specific reference",
      rule: "Specific mainline objective personal pronouns use dyadic va1-va2.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-64-projective-distribution",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4",
      lineStart: 2758,
      lineEnd: 2760,
      exactWitness: "When the valence position is dyadic, the categories\nof person, number, and case are combined differently in va1 and va2",
      rule: "Projective dyadic object fillers distribute person, number, and objective case by third-person status.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-641-va1-person-never-alone",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1",
      lineStart: 2761,
      lineEnd: 2762,
      exactWitness: "Subposition va1 always manifests the category of person, but it is NEVER present as the\nonly information in the subposition.",
      rule: "va1 always carries person, but never person alone.",
      slot: "va1"
    }), Object.freeze({
      id: "cn-l6-641a-third-person-va1",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2763,
      lineEnd: 2775,
      exactWitness: "For the 3rd person, person is combined with objective case in the va1 subposition.",
      rule: "For third-person projective objects, va1 combines person with objective case and selects c/qu or qui.",
      slot: "va1",
      objectPersonClass: "third"
    }), Object.freeze({
      id: "cn-l6-641b-nonthird-va1",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.b",
      lineStart: 2776,
      lineEnd: 2784,
      exactWitness: "For the 1st and 2nd persons,person is combined with number in the va1 subposition.",
      rule: "For non-third-person projective objects, va1 combines person with number.",
      slot: "va1",
      objectPersonClass: "non-third"
    }), Object.freeze({
      id: "cn-l6-642-va2-completes-category",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2",
      lineStart: 2785,
      lineEnd: 2786,
      exactWitness: "Subposition va2 makes up for the category not contained in va1.",
      rule: "va2 supplies the category not contained in va1.",
      slot: "va2"
    }), Object.freeze({
      id: "cn-l6-642a-third-person-va2-number",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2.a",
      lineStart: 2787,
      lineEnd: 2796,
      exactWitness: "For the 3rd person, the va2 subposition manifests number:",
      rule: "For third-person projective objects, va2 manifests singular 0 or plural im/in.",
      slot: "va2",
      objectPersonClass: "third"
    }), Object.freeze({
      id: "cn-l6-642b-nonthird-va2-objective",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.2.b",
      lineStart: 2797,
      lineEnd: 2803,
      exactWitness: "For the non-3rd persons the va2 subposition expresses objective case",
      rule: "For non-third-person projective objects, va2 expresses objective case as ech or itz.",
      slot: "va2",
      objectPersonClass: "non-third"
    }), Object.freeze({
      id: "cn-l6-65-projective-summary",
      tagId: "cn-l6-projective-object-summary",
      section: "6.5",
      lineStart: 2804,
      lineEnd: 2813,
      exactWitness: "+n-ech( = \"+lsg-obj(\" = me",
      rule: "The projective object paradigm supplies n-ech, t-ech, m-itz, am-ech, c/qu/qui-0, and qu-im.",
      valencePosition: "va1-va2"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES = Object.freeze([Object.freeze({
      id: "cn-l2-26-supportive-i-illegal-consonant-sequence",
      tagId: "cn-l2-syllable-structure",
      section: "2.6 note 1",
      lineStart: 1738,
      lineEnd: 1740,
      exactWitness: "any type-level consonant sequence\nthat is illegal at the token level is lifted into a pronounceable sequence by the introduction of an [i]",
      rule: "Supportive [i] repairs an otherwise illegal token-level consonant sequence.",
      sourceLesson: "Andrews Lesson 2"
    }), Object.freeze({
      id: "cn-l6-641a-c-qu-regular-spelling",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2763,
      lineEnd: 2766,
      exactWitness: "The\nmorphic filler has the variants c/qu ~ qui. The first two are merely spelling variants.",
      rule: "Third-person projective va1 is the regular /k/ morph spelled c or qu when an internal vowel stands on either side.",
      sourceLesson: "Andrews Lesson 6"
    }), Object.freeze({
      id: "cn-l6-641a-qui-supportive-i",
      tagId: "cn-l6-projective-object-fillers",
      section: "6.4.1.a",
      lineStart: 2764,
      lineEnd: 2772,
      exactWitness: "The [i] on\nthe third is a supportive vowel.",
      rule: "The i of qui is supportive, used before a consonant when the VNC subject pronoun has 0-0.",
      sourceLesson: "Andrews Lesson 6"
    }), Object.freeze({
      id: "cn-l7-78-supportive-initial-i-object-boundary",
      tagId: "cn-l7-supportive-initial-i",
      section: "7.8 Note 1",
      lineStart: 3200,
      lineEnd: 3224,
      exactWitness: "supportive\n[i], the [i] is no longer needed and is omitted.",
      rule: "A stem-initial supportive i drops after mainline reflexive object prefixes and after nonspecific nonhuman tla; real initial i remains.",
      sourceLesson: "Andrews Lesson 7"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-66-mainline-reflexive-reflects-subject",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6",
      lineStart: 2814,
      lineEnd: 2819,
      exactWitness: "A mainline reflexive/reciprocative verb object reflects the person\nand number information of the subject.",
      rule: "Mainline reflexive/reciprocative objects reflect the subject's person and number.",
      valencePosition: "va1-va2"
    }), Object.freeze({
      id: "cn-l6-661-reflexive-va1-person-number",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6.1",
      lineStart: 2820,
      lineEnd: 2824,
      exactWitness: "Subposition va1 is the locus of the categories of person and number.",
      rule: "For mainline reflexive objects, va1 is the person-number locus.",
      slot: "va1"
    }), Object.freeze({
      id: "cn-l6-662-reflexive-va2-objective-o-square",
      tagId: "cn-l6-mainline-reflexive-fillers",
      section: "6.6.2",
      lineStart: 2825,
      lineEnd: 2827,
      exactWitness: "Subposition va2 is the locus of the objective-case feature",
      rule: "For mainline reflexive objects, va2 carries objective case as o, replaced by square-zero before a vowel-initial stem.",
      slot: "va2"
    }), Object.freeze({
      id: "cn-l6-67-reflexive-summary",
      tagId: "cn-l6-mainline-reflexive-summary",
      section: "6.7",
      lineStart: 2828,
      lineEnd: 2837,
      exactWitness: "+n-o( ~ +n-0( = \"+ lsg-reflexobj(\" = myself",
      rule: "The mainline reflexive object paradigm supplies n-o/n-square, t-o/t-square, and m-o/m-square.",
      valencePosition: "va1-va2"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES = Object.freeze([Object.freeze({
      id: "cn-l6-receipt-mirrors-selected-output-logic",
      tagId: "cn-l6-receipt-not-authority",
      section: "6.1-6.7",
      lineStart: 2681,
      lineEnd: 2837,
      exactWitness: "The Transitive VNC Formula. Object Pronouns",
      rule: "The receipt may display only the Lesson 6 formula and object fillers authorized by selected-output logic; it is not itself authority.",
      receiptRole: "display-only",
      authorityRole: "not-authority"
    })]);
    const CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS = Object.freeze({
      "shuntline-reflexive": Object.freeze({
        id: "shuntline-reflexive",
        va: "ne",
        objectLabel: "shuntline reflexive/reciprocative",
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline",
        pronounClass: "personal-pronoun"
      }),
      "nonspecific-human": Object.freeze({
        id: "nonspecific-human",
        va: "te",
        objectLabel: "nonspecific human projective",
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline-or-shuntline",
        humanness: "human",
        pronounClass: "indefinite-pronoun"
      }),
      "nonspecific-nonhuman": Object.freeze({
        id: "nonspecific-nonhuman",
        va: "tla",
        objectLabel: "nonspecific nonhuman projective",
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline-or-shuntline",
        humanness: "nonhuman",
        pronounClass: "indefinite-pronoun"
      })
    });
    const CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS = Object.freeze({
      "1sg": Object.freeze({
        id: "1sg",
        va1: "n",
        va2: "ech",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "1sg",
        gloss: "me"
      }),
      "1pl": Object.freeze({
        id: "1pl",
        va1: "t",
        va2: "ech",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "1pl",
        gloss: "us"
      }),
      "2sg": Object.freeze({
        id: "2sg",
        va1: "m",
        va2: "itz",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "2sg",
        gloss: "you-sg"
      }),
      "2pl": Object.freeze({
        id: "2pl",
        va1: "am",
        va2: "ech",
        va1Carries: Object.freeze(["person", "number"]),
        va2Carries: Object.freeze(["objective-case"]),
        objectPerson: "2pl",
        gloss: "you-pl"
      })
    });
    function getClassicalNahuatlLesson6RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function cloneClassicalNahuatlLesson6Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["features", "morphs", "va1Carries", "va2Carries", "valenceSlots", "outputableSlots", "ruleFrameKinds"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function getClassicalNahuatlLesson6FormulaRules() {
      return CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6ObjectCategoryRules() {
      return CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6MonadicRules() {
      return CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6DyadicProjectiveRules() {
      return CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6SupportiveIRules() {
      return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6ReflexiveRules() {
      return CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6ReceiptRules() {
      return CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES.map(cloneClassicalNahuatlLesson6Rule);
    }
    function getClassicalNahuatlLesson6RuleLogicRules() {
      return {
        formula: getClassicalNahuatlLesson6FormulaRules(),
        objectCategories: getClassicalNahuatlLesson6ObjectCategoryRules(),
        monadic: getClassicalNahuatlLesson6MonadicRules(),
        dyadicProjective: getClassicalNahuatlLesson6DyadicProjectiveRules(),
        supportiveI: getClassicalNahuatlLesson6SupportiveIRules(),
        reflexive: getClassicalNahuatlLesson6ReflexiveRules(),
        receipt: getClassicalNahuatlLesson6ReceiptRules()
      };
    }
    function normalizeClassicalNahuatlLesson6Token(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlLesson6Stem(value = "") {
      const normalizer = getClassicalNahuatlLesson6RuntimeTarget()?.normalizeClassicalNahuatlLesson5Stem;
      if (typeof normalizer === "function") {
        return normalizer(value);
      }
      return String(value == null ? "" : value).trim().replace(/^-+\s*/u, "").replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlLesson6Subject(value = "") {
      const normalizer = getClassicalNahuatlLesson6RuntimeTarget()?.normalizeClassicalNahuatlLesson5Subject;
      if (typeof normalizer === "function") {
        return normalizer(value);
      }
      const normalized = normalizeClassicalNahuatlLesson6Token(value || "3sg").replace(/-/gu, "").replace(/\s+/gu, "");
      const aliases = {
        "1": "1sg",
        "1sg": "1sg",
        "2": "2sg",
        "2sg": "2sg",
        "3": "3sg",
        "3sg": "3sg",
        "1pl": "1pl",
        "1p": "1pl",
        "2pl": "2pl",
        "2p": "2pl",
        "3pl": "3pl",
        "3p": "3pl"
      };
      return aliases[normalized] || "3sg";
    }
    function normalizeClassicalNahuatlLesson6Mood(value = "") {
      const normalizer = getClassicalNahuatlLesson6RuntimeTarget()?.normalizeClassicalNahuatlLesson5Mood;
      return typeof normalizer === "function" ? normalizer(value) : normalizeClassicalNahuatlLesson6Token(value || "indicative") || "indicative";
    }
    function normalizeClassicalNahuatlLesson6Tense(value = "", mood = "indicative") {
      const normalizer = getClassicalNahuatlLesson6RuntimeTarget()?.normalizeClassicalNahuatlLesson5Tense;
      return typeof normalizer === "function" ? normalizer(value, mood) : normalizeClassicalNahuatlLesson6Token(value || (mood === "indicative" ? "present" : "nonpast"));
    }
    function getClassicalNahuatlLesson6FollowingSound(value = "") {
      const normalized = normalizeClassicalNahuatlLesson6Stem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function isClassicalNahuatlLesson6VowelSound(sound = "") {
      return /^[aeio]$/u.test(String(sound || "").toLowerCase());
    }
    function getClassicalNahuatlLesson6InitialVowelKind(stem = "", options = {}) {
      const explicit = normalizeClassicalNahuatlLesson6Token(options.initialVowelKind || "");
      if (explicit === "real" || explicit === "supportive") {
        return explicit;
      }
      const normalized = normalizeClassicalNahuatlLesson6Stem(stem);
      if (!/^[aeioāēīō]/iu.test(normalized)) {
        return "consonant-or-supportive-i";
      }
      if (/^[iī]/iu.test(normalized) && options.supportiveInitialI === true) {
        return "supportive";
      }
      return "real";
    }
    function omitClassicalNahuatlLesson6InitialSupportiveI(stem = "") {
      return normalizeClassicalNahuatlLesson6Stem(stem).replace(/^[iī]/iu, "");
    }
    function buildClassicalNahuatlLesson6InitialSupportiveIFrame({
      stem = "",
      objectKind = "",
      initialVowelKind = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const normalizedObjectKind = normalizeClassicalNahuatlLesson6ObjectKind({
        objectKind
      });
      const resolvedInitialVowelKind = initialVowelKind || getClassicalNahuatlLesson6InitialVowelKind(normalizedStem);
      const boundaryCanDrop = normalizedObjectKind === "mainline-reflexive" || normalizedObjectKind === "nonspecific-nonhuman";
      const initialSupportiveIDropped = Boolean(boundaryCanDrop && resolvedInitialVowelKind === "supportive");
      const stemRealization = initialSupportiveIDropped ? omitClassicalNahuatlLesson6InitialSupportiveI(normalizedStem) : normalizedStem;
      const supportiveISurfaceAction = initialSupportiveIDropped ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.DROP : resolvedInitialVowelKind === "supportive" ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.RETAIN : CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_SUPPORTIVE;
      const supportiveISurfaceReason = initialSupportiveIDropped ? "boundary-removes-need-for-support" : resolvedInitialVowelKind === "supportive" ? "boundary-does-not-license-supportive-i-drop" : resolvedInitialVowelKind === "real" ? "real-initial-vowel-remains" : "stem-does-not-begin-with-supportive-i";
      return {
        kind: "classical-nahuatl-lesson6-initial-supportive-i-boundary-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6SupportiveIRules().filter(rule => rule.tagId === "cn-l2-syllable-structure" || rule.tagId === "cn-l7-supportive-initial-i"),
        inputStem: normalizedStem,
        stemRealization,
        objectKind: normalizedObjectKind,
        initialVowelKind: resolvedInitialVowelKind,
        boundaryCanDrop,
        initialSupportiveIDropped,
        supportiveVowel: initialSupportiveIDropped ? "i" : "",
        supportiveVowelRole: initialSupportiveIDropped ? "boundary-no-longer-needed" : "not-present-or-not-dropped",
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        dropsAfter: boundaryCanDrop ? normalizedObjectKind : "",
        realInitialVowelRemains: resolvedInitialVowelKind === "real",
        environmentRule: initialSupportiveIDropped ? "lesson-7.8-note1-initial-supportive-i-drops-after-object-boundary" : resolvedInitialVowelKind === "real" ? "lesson-7.8-note1-real-initial-vowel-remains" : "lesson-7.8-note1-initial-supportive-i-not-applicable"
      };
    }
    function getClassicalNahuatlLesson6PersonDyad(subject = "3sg", mood = "indicative", stem = "") {
      const builder = getClassicalNahuatlLesson6RuntimeTarget()?.getClassicalNahuatlLesson5PersonDyad;
      if (typeof builder === "function") {
        return builder(subject, mood, {
          stem
        });
      }
      return {
        kind: "classical-nahuatl-lesson5-person-dyad-frame",
        subject: normalizeClassicalNahuatlLesson6Subject(subject),
        pers1: "0",
        pers2: "0",
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson6TenseFrame({
      mood = "indicative",
      tense = "present",
      verbClass = ""
    } = {}) {
      const builder = getClassicalNahuatlLesson6RuntimeTarget()?.getClassicalNahuatlLesson5TenseFrame;
      if (typeof builder === "function") {
        return builder({
          mood,
          tense,
          verbClass
        });
      }
      return {
        kind: "classical-nahuatl-lesson5-tense-frame",
        mood,
        tense,
        tns: "0",
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson6NumberDyad({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      stem = ""
    } = {}) {
      const builder = getClassicalNahuatlLesson6RuntimeTarget()?.getClassicalNahuatlLesson5NumberDyad;
      if (typeof builder === "function") {
        return builder({
          subject,
          mood,
          tense,
          stem
        });
      }
      return {
        kind: "classical-nahuatl-lesson5-number-dyad-frame",
        subject: normalizeClassicalNahuatlLesson6Subject(subject),
        conditioningStem: normalizeClassicalNahuatlLesson6Stem(stem),
        num1: "0",
        num2: "0",
        sourceAuthority: "Andrews transcription"
      };
    }
    function normalizeClassicalNahuatlLesson6ObjectPerson(value = "") {
      const normalized = normalizeClassicalNahuatlLesson6Token(value || "3sg").replace(/-/gu, "").replace(/\s+/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        me: "1sg",
        "1p": "1pl",
        "1pl": "1pl",
        us: "1pl",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        "2p": "2pl",
        "2pl": "2pl",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        "3p": "3pl",
        "3pl": "3pl",
        them: "3pl"
      };
      return aliases[normalized] || "3sg";
    }
    function normalizeClassicalNahuatlLesson6ObjectKind(options = {}) {
      const raw = normalizeClassicalNahuatlLesson6Token(options.objectKind || options.objectType || options.object || options.objectPerson || options.obj || "specific-projective");
      if (["ne", "shuntline-reflexive", "shuntline-reflexive-reciprocative"].includes(raw)) {
        return "shuntline-reflexive";
      }
      if (["te", "nonspecific-human", "nonspecific-projective-human"].includes(raw)) {
        return "nonspecific-human";
      }
      if (["tla", "nonspecific-nonhuman", "nonspecific-projective-nonhuman"].includes(raw)) {
        return "nonspecific-nonhuman";
      }
      if (["reflexive", "mainline-reflexive", "reciprocative", "mainline-reciprocative", "mu"].includes(raw)) {
        return "mainline-reflexive";
      }
      return "specific-projective";
    }
    function getClassicalNahuatlLesson6CarrierInitialSound(value = "") {
      return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().match(/[a-z]/u)?.[0] || "";
    }
    function hasClassicalNahuatlLesson6VowelCarrier(value = "") {
      return /[aeio]/u.test(String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase());
    }
    function buildClassicalNahuatlLesson6ThirdPersonVa1SupportiveVowelFrame({
      stem = "",
      personDyad = null,
      va2 = "0"
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const normalizedVa2 = String(va2 || "0").trim();
      const personDyadValue = `${personDyad?.pers1 || ""}-${personDyad?.pers2 || ""}`;
      const leftCarrier = [personDyad?.pers1 || "", personDyad?.pers2 || ""].join("");
      const leftHasInternalVowel = hasClassicalNahuatlLesson6VowelCarrier(leftCarrier);
      const va2HasSoundedCarrier = normalizedVa2 && normalizedVa2 !== "0" && normalizedVa2 !== CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO;
      const rightCarrier = va2HasSoundedCarrier ? normalizedVa2 : normalizedStem;
      const rightCarrierSource = va2HasSoundedCarrier ? "va2" : "stem";
      const rightSound = va2HasSoundedCarrier ? getClassicalNahuatlLesson6CarrierInitialSound(normalizedVa2) : getClassicalNahuatlLesson6FollowingSound(normalizedStem);
      const stemFollowingSound = getClassicalNahuatlLesson6FollowingSound(normalizedStem);
      const rightHasInternalVowel = isClassicalNahuatlLesson6VowelSound(rightSound);
      const hasInternalVowelOnEitherSide = leftHasInternalVowel || rightHasInternalVowel;
      const zeroSubjectBeforeStemConsonant = personDyadValue === "0-0" && !va2HasSoundedCarrier && stemFollowingSound && !isClassicalNahuatlLesson6VowelSound(stemFollowingSound);
      const supportiveVowelPresent = zeroSubjectBeforeStemConsonant && !hasInternalVowelOnEitherSide;
      const regularKSpelling = rightSound === "e" || rightSound === "i" ? "qu" : "c";
      const selectedVa1 = supportiveVowelPresent ? "qui" : regularKSpelling;
      const supportiveISurfaceAction = supportiveVowelPresent ? CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.INSERT : CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_NEEDED;
      const supportiveISurfaceReason = supportiveVowelPresent ? "zero-subject-before-consonant-requires-support" : "internal-vowel-or-regular-k-boundary-does-not-require-support";
      return {
        kind: "classical-nahuatl-lesson6-third-person-va1-supportive-vowel-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6SupportiveIRules(),
        morpheme: "/k/",
        regularMorph: "[k]",
        baseMorphSpelling: supportiveVowelPresent ? "qu" : selectedVa1,
        selectedVa1,
        selectedCarrier: selectedVa1,
        variants: ["c", "qu", "qui"],
        spellingVariants: ["c", "qu"],
        supportiveVariant: "qui",
        supportiveVowelPresent,
        supportiveVowel: supportiveVowelPresent ? "i" : "",
        supportiveVowelRole: supportiveVowelPresent ? "pronounceability-repair" : "not-present",
        supportiveVowelSource: supportiveVowelPresent ? "lesson-2-syllable-structure" : "",
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        leftCarrier,
        leftHasInternalVowel,
        rightCarrier,
        rightCarrierSource,
        rightSound,
        rightHasInternalVowel,
        hasInternalVowelOnEitherSide,
        personDyad: personDyadValue,
        stemFollowingSound,
        environmentRule: supportiveVowelPresent ? "lesson-6.4.1a-qui-supportive-i-before-consonant-with-zero-subject" : rightSound === "e" || rightSound === "i" ? "lesson-6.4.1a-qu-before-e-i-vowel" : "lesson-6.4.1a-c-regular-k-spelling"
      };
    }
    function buildClassicalNahuatlLesson6ThirdPersonKObjectMorphIdentityFrame({
      objectPerson = "3sg",
      va2 = "0",
      supportiveVowelFrame = null
    } = {}) {
      const normalizedObjectPerson = normalizeClassicalNahuatlLesson6ObjectPerson(objectPerson);
      return {
        kind: "classical-nahuatl-lesson6-third-person-k-object-morph-identity-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6SupportiveIRules(),
        slot: "va1",
        objectPerson: normalizedObjectPerson,
        objectPersonClass: "third-person",
        objectRole: "person-and-objective-case",
        morphIdentity: "/k/",
        morphIdentityKind: "object-pronoun-va1",
        regularMorph: "[k]",
        regularSpellings: ["c", "qu"],
        supportiveSpelling: "qui",
        supportiveVowel: "i",
        supportiveVowelIsObjectIdentity: false,
        va2: String(va2 || "0"),
        selectedCarrierBeforeFinalBoundary: supportiveVowelFrame?.selectedVa1 || "",
        selectedCarrierSource: "pre-final-boundary-environment",
        finalBoundaryRealizationRequired: true,
        spellingAuthority: "Lesson 2 k-spelling after full slot order is known",
        supportVowelAuthority: "Lesson 2 supportive-i repair after full slot order is known"
      };
    }
    function getClassicalNahuatlLesson6ThirdPersonVa1({
      stem = "",
      personDyad = null,
      va2 = "0"
    } = {}) {
      const supportiveVowelFrame = buildClassicalNahuatlLesson6ThirdPersonVa1SupportiveVowelFrame({
        stem,
        personDyad,
        va2
      });
      const morphIdentityFrame = buildClassicalNahuatlLesson6ThirdPersonKObjectMorphIdentityFrame({
        objectPerson: va2 === "0" ? "3sg" : "3pl",
        va2,
        supportiveVowelFrame
      });
      return {
        va1: supportiveVowelFrame.selectedVa1,
        rule: supportiveVowelFrame.environmentRule,
        followingSound: supportiveVowelFrame.stemFollowingSound,
        va1RightSound: supportiveVowelFrame.rightSound,
        va1RightCarrierSource: supportiveVowelFrame.rightCarrierSource,
        morphIdentityFrame,
        supportiveVowelFrame
      };
    }
    function getClassicalNahuatlLesson6ThirdPluralVa2(stem = "") {
      const followingSound = getClassicalNahuatlLesson6FollowingSound(stem);
      const usesIm = isClassicalNahuatlLesson6VowelSound(followingSound) || followingSound === "m" || followingSound === "p";
      return {
        va2: usesIm ? "im" : "in",
        variants: ["im", "in", "iz", "ix"],
        rule: usesIm ? "lesson-6.4.2a-im-before-vowel-m-p" : "lesson-6.4.2a-in-with-nasal-assimilation",
        followingSound
      };
    }
    function getClassicalNahuatlLesson6SpecificProjectiveObjectFrame({
      objectPerson = "3sg",
      stem = "",
      personDyad = null,
      silentSpecificObject = false
    } = {}) {
      const normalizedObjectPerson = normalizeClassicalNahuatlLesson6ObjectPerson(objectPerson);
      if (normalizedObjectPerson === "3sg" && silentSpecificObject === true) {
        return {
          kind: "classical-nahuatl-lesson6-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedLesson4FormulaId: "vnc-valence-dyadic",
          objectPerson: "3sg",
          va1: CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO,
          va2: "0",
          va1Variants: [CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO],
          va2Variants: ["0"],
          va1Carries: ["person", "objective-case"],
          va2Carries: ["number"],
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: "silently present third singular object",
          objectRule: "lesson-18.8-silently-present-third-singular-object",
          silentSpecificObject: true,
          sourceAuthority: "Andrews transcription"
        };
      }
      const base = CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS[normalizedObjectPerson];
      if (base) {
        return {
          kind: "classical-nahuatl-lesson6-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedLesson4FormulaId: "vnc-valence-dyadic",
          objectPerson: normalizedObjectPerson,
          va1: base.va1,
          va2: base.va2,
          va1Variants: [base.va1],
          va2Variants: [base.va2],
          va1Carries: Array.from(base.va1Carries),
          va2Carries: Array.from(base.va2Carries),
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: base.gloss,
          objectRule: "lesson-6.4-nonthird-projective-object",
          sourceAuthority: "Andrews transcription"
        };
      }
      if (normalizedObjectPerson === "3pl") {
        const thirdVa2 = getClassicalNahuatlLesson6ThirdPluralVa2(stem);
        const thirdVa1 = getClassicalNahuatlLesson6ThirdPersonVa1({
          stem,
          personDyad,
          va2: thirdVa2.va2
        });
        return {
          kind: "classical-nahuatl-lesson6-object-valence-frame",
          objectKind: "specific-projective",
          valenceArity: "dyadic",
          valencePosition: "va1-va2",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
          expectedLesson4FormulaId: "vnc-valence-dyadic",
          objectPerson: "3pl",
          va1: thirdVa1.va1,
          va2: thirdVa2.va2,
          va1Variants: ["qu"],
          va2Variants: thirdVa2.variants,
          va1Carries: ["person", "objective-case"],
          va2Carries: ["number"],
          trajectory: "projective",
          specificity: "specific",
          prominence: "mainline",
          caseFeature: "objective",
          pronounClass: "personal-pronoun",
          objectLabel: "them",
          objectRule: thirdVa2.rule,
          va1Rule: thirdVa1.rule,
          va1MorphIdentityFrame: thirdVa1.morphIdentityFrame,
          va1MorphIdentity: thirdVa1.morphIdentityFrame.morphIdentity,
          va1MorphIdentityKind: thirdVa1.morphIdentityFrame.morphIdentityKind,
          va1RegularSpellings: thirdVa1.morphIdentityFrame.regularSpellings,
          va1SupportiveSpelling: thirdVa1.morphIdentityFrame.supportiveSpelling,
          va1FinalBoundaryRealizationRequired: thirdVa1.morphIdentityFrame.finalBoundaryRealizationRequired,
          va1BaseMorphSpelling: thirdVa1.supportiveVowelFrame.baseMorphSpelling,
          va1SupportiveVowelPresent: thirdVa1.supportiveVowelFrame.supportiveVowelPresent,
          va1SupportiveVowel: thirdVa1.supportiveVowelFrame.supportiveVowel,
          va1SupportiveISurfacePolicy: thirdVa1.supportiveVowelFrame.supportiveISurfacePolicy,
          va1SupportiveISurfaceAction: thirdVa1.supportiveVowelFrame.supportiveISurfaceAction,
          va1SupportiveISurfaceReason: thirdVa1.supportiveVowelFrame.supportiveISurfaceReason,
          va1SupportiveIIsOnlyAdditionOrDeletion: thirdVa1.supportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
          va1RightSound: thirdVa1.va1RightSound,
          va1RightCarrierSource: thirdVa1.va1RightCarrierSource,
          supportiveVowelFrame: thirdVa1.supportiveVowelFrame,
          followingSound: thirdVa2.followingSound,
          sourceAuthority: "Andrews transcription"
        };
      }
      const thirdVa1 = getClassicalNahuatlLesson6ThirdPersonVa1({
        stem,
        personDyad,
        va2: "0"
      });
      return {
        kind: "classical-nahuatl-lesson6-object-valence-frame",
        objectKind: "specific-projective",
        valenceArity: "dyadic",
        valencePosition: "va1-va2",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
        expectedLesson4FormulaId: "vnc-valence-dyadic",
        objectPerson: "3sg",
        va1: thirdVa1.va1,
        va2: "0",
        va1Variants: ["c", "qu", "qui"],
        va2Variants: ["0"],
        va1Carries: ["person", "objective-case"],
        va2Carries: ["number"],
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        caseFeature: "objective",
        pronounClass: "personal-pronoun",
        objectLabel: "third singular object",
        objectRule: thirdVa1.rule,
        va1Rule: thirdVa1.rule,
        va1MorphIdentityFrame: thirdVa1.morphIdentityFrame,
        va1MorphIdentity: thirdVa1.morphIdentityFrame.morphIdentity,
        va1MorphIdentityKind: thirdVa1.morphIdentityFrame.morphIdentityKind,
        va1RegularSpellings: thirdVa1.morphIdentityFrame.regularSpellings,
        va1SupportiveSpelling: thirdVa1.morphIdentityFrame.supportiveSpelling,
        va1FinalBoundaryRealizationRequired: thirdVa1.morphIdentityFrame.finalBoundaryRealizationRequired,
        va1BaseMorphSpelling: thirdVa1.supportiveVowelFrame.baseMorphSpelling,
        va1SupportiveVowelPresent: thirdVa1.supportiveVowelFrame.supportiveVowelPresent,
        va1SupportiveVowel: thirdVa1.supportiveVowelFrame.supportiveVowel,
        va1SupportiveISurfacePolicy: thirdVa1.supportiveVowelFrame.supportiveISurfacePolicy,
        va1SupportiveISurfaceAction: thirdVa1.supportiveVowelFrame.supportiveISurfaceAction,
        va1SupportiveISurfaceReason: thirdVa1.supportiveVowelFrame.supportiveISurfaceReason,
        va1SupportiveIIsOnlyAdditionOrDeletion: thirdVa1.supportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
        va1RightSound: thirdVa1.va1RightSound,
        va1RightCarrierSource: thirdVa1.va1RightCarrierSource,
        supportiveVowelFrame: thirdVa1.supportiveVowelFrame,
        followingSound: thirdVa1.followingSound,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson6MainlineReflexiveObjectFrame({
      subject = "3sg",
      stem = "",
      supportiveInitialI = false,
      initialVowelKind = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson6Subject(subject);
      const supportiveInitialIFrame = buildClassicalNahuatlLesson6InitialSupportiveIFrame({
        stem,
        objectKind: "mainline-reflexive",
        initialVowelKind: initialVowelKind || getClassicalNahuatlLesson6InitialVowelKind(stem, {
          supportiveInitialI
        })
      });
      const followingSound = getClassicalNahuatlLesson6FollowingSound(supportiveInitialIFrame.stemRealization);
      const va1 = normalizedSubject === "1sg" ? "n" : normalizedSubject === "1pl" ? "t" : "m";
      const va2 = supportiveInitialIFrame.initialVowelKind === "real" ? CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO : isClassicalNahuatlLesson6VowelSound(followingSound) ? CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO : "o";
      return {
        kind: "classical-nahuatl-lesson6-object-valence-frame",
        objectKind: "mainline-reflexive",
        valenceArity: "dyadic",
        valencePosition: "va1-va2",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE,
        expectedLesson4FormulaId: "vnc-valence-dyadic",
        subject: normalizedSubject,
        objectPerson: normalizedSubject.startsWith("1") ? normalizedSubject : "nonfirst-common",
        va1,
        va2,
        va1Variants: ["n", "t", "m"],
        va2Variants: ["o", CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO],
        alternateObjectDyads: [`${va1}-o`, `${va1}-${CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO}`],
        va1Carries: ["person", "number"],
        va2Carries: ["objective-case"],
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "mainline",
        caseFeature: "objective",
        pronounClass: "personal-pronoun",
        pluralMayBeReciprocal: normalizedSubject.endsWith("pl"),
        objectReflectsSubject: true,
        objectRule: va2 === CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO ? "lesson-6.6.2-square-zero-before-vowel" : "lesson-6.6.2-o-before-consonant",
        stemRealization: supportiveInitialIFrame.stemRealization,
        initialVowelKind: supportiveInitialIFrame.initialVowelKind,
        initialSupportiveIDropped: supportiveInitialIFrame.initialSupportiveIDropped,
        initialSupportiveISurfacePolicy: supportiveInitialIFrame.supportiveISurfacePolicy,
        initialSupportiveISurfaceAction: supportiveInitialIFrame.supportiveISurfaceAction,
        initialSupportiveISurfaceReason: supportiveInitialIFrame.supportiveISurfaceReason,
        initialSupportiveIIsOnlyAdditionOrDeletion: supportiveInitialIFrame.supportiveIIsOnlyAdditionOrDeletion,
        initialSupportiveIFrame: supportiveInitialIFrame,
        followingSound,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson6MonadicObjectFrame(objectKind = "nonspecific-human", options = {}) {
      const selected = CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS[objectKind] || CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS["nonspecific-human"];
      const supportiveInitialIFrame = buildClassicalNahuatlLesson6InitialSupportiveIFrame({
        stem: options.stem || "",
        objectKind: selected.id,
        initialVowelKind: getClassicalNahuatlLesson6InitialVowelKind(options.stem || "", options)
      });
      return {
        kind: "classical-nahuatl-lesson6-object-valence-frame",
        objectKind: selected.id,
        ...selected,
        valenceArity: "monadic",
        valencePosition: "va",
        formulaTemplate: CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE,
        expectedLesson4FormulaId: "vnc-valence-monadic",
        vaVariants: selected.id === "nonspecific-nonhuman" ? ["tla"] : [selected.va],
        caseFeature: "objective",
        objectRule: `lesson-6.2-${selected.id}`,
        stemRealization: supportiveInitialIFrame.stemRealization,
        initialVowelKind: supportiveInitialIFrame.initialVowelKind,
        initialSupportiveIDropped: supportiveInitialIFrame.initialSupportiveIDropped,
        initialSupportiveISurfacePolicy: supportiveInitialIFrame.supportiveISurfacePolicy,
        initialSupportiveISurfaceAction: supportiveInitialIFrame.supportiveISurfaceAction,
        initialSupportiveISurfaceReason: supportiveInitialIFrame.supportiveISurfaceReason,
        initialSupportiveIIsOnlyAdditionOrDeletion: supportiveInitialIFrame.supportiveIIsOnlyAdditionOrDeletion,
        initialSupportiveIFrame: supportiveInitialIFrame,
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson6ObjectValenceFrame(options = {}) {
      const objectKind = normalizeClassicalNahuatlLesson6ObjectKind(options);
      if (objectKind === "mainline-reflexive") {
        return getClassicalNahuatlLesson6MainlineReflexiveObjectFrame({
          subject: options.subject,
          stem: options.stem,
          supportiveInitialI: options.supportiveInitialI === true,
          initialVowelKind: options.initialVowelKind
        });
      }
      if (objectKind !== "specific-projective") {
        return getClassicalNahuatlLesson6MonadicObjectFrame(objectKind, options);
      }
      return getClassicalNahuatlLesson6SpecificProjectiveObjectFrame({
        objectPerson: options.objectPerson || options.object || options.obj || "3sg",
        stem: options.stem,
        personDyad: options.personDyad,
        silentSpecificObject: options.silentSpecificObject === true
      });
    }
    function buildClassicalNahuatlLesson6FormulaRuleFrame({
      stem = "",
      objectFrame = null,
      lesson4Frame = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const valenceArity = objectFrame?.valenceArity || "dyadic";
      const formulaTemplate = valenceArity === "monadic" ? CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE : CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE;
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true;
      const lesson4FormulaMatches = lesson4Conclusion.authorizedFormulaId === objectFrame?.expectedLesson4FormulaId;
      return {
        kind: "classical-nahuatl-lesson6-transitive-vnc-formula-rule-frame",
        lesson: "Andrews Lesson 6",
        section: valenceArity === "monadic" ? "6.1-6.2" : "6.1, 6.3",
        ruleLogicRole: "transitive-vnc-formula-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6FormulaRules(),
        inputRole: "stem-only",
        stem: normalizedStem,
        formulaTemplate,
        formulaRealization: realizeClassicalNahuatlLesson6Formula({
          stem: normalizedStem,
          personDyad,
          tenseFrame,
          numberDyad,
          objectFrame
        }),
        clauseKind: "verbal-nuclear-clause",
        transitivity: "transitive",
        valenceArity,
        valencePosition: objectFrame?.valencePosition || "",
        expectedLesson4FormulaId: objectFrame?.expectedLesson4FormulaId || "",
        lesson4FormulaId: lesson4Conclusion.authorizedFormulaId || "",
        authorizationStatus: lesson4Authorized && lesson4FormulaMatches ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson6ObjectCategoryRuleFrame(objectFrame = null) {
      const authorized = Boolean(objectFrame?.caseFeature === "objective" && objectFrame?.trajectory && objectFrame?.specificity && objectFrame?.prominence);
      return {
        kind: "classical-nahuatl-lesson6-object-category-rule-frame",
        lesson: "Andrews Lesson 6",
        section: "6.1",
        ruleLogicRole: "objective-pronoun-category-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6ObjectCategoryRules(),
        caseFeature: objectFrame?.caseFeature || "",
        trajectory: objectFrame?.trajectory || "",
        specificity: objectFrame?.specificity || "",
        prominence: objectFrame?.prominence || "",
        pronounClass: objectFrame?.pronounClass || "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson6ObjectFillerRuleFrame(objectFrame = null) {
      const baseRuleRefs = objectFrame?.valenceArity === "monadic" ? getClassicalNahuatlLesson6MonadicRules() : objectFrame?.objectKind === "mainline-reflexive" ? getClassicalNahuatlLesson6ReflexiveRules() : getClassicalNahuatlLesson6DyadicProjectiveRules();
      const ruleRefs = [...baseRuleRefs, ...(objectFrame?.supportiveVowelFrame?.ruleRefs || []), ...(objectFrame?.initialSupportiveIFrame?.ruleRefs || [])];
      const hasMonadicFiller = objectFrame?.valenceArity === "monadic" && Boolean(objectFrame?.va);
      const hasDyadicFiller = objectFrame?.valenceArity === "dyadic" && Boolean(objectFrame?.va1 && objectFrame?.va2);
      return {
        kind: "classical-nahuatl-lesson6-object-filler-rule-frame",
        lesson: "Andrews Lesson 6",
        section: objectFrame?.valenceArity === "monadic" ? "6.2" : objectFrame?.objectKind === "mainline-reflexive" ? "6.6-6.7" : "6.4-6.5",
        ruleLogicRole: "objective-valence-filler-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs,
        objectFrameKind: objectFrame?.kind || "",
        objectKind: objectFrame?.objectKind || "",
        valenceArity: objectFrame?.valenceArity || "",
        valencePosition: objectFrame?.valencePosition || "",
        va: objectFrame?.va || "",
        va1: objectFrame?.va1 || "",
        va2: objectFrame?.va2 || "",
        va1Rule: objectFrame?.va1Rule || "",
        va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
        va1SupportiveVowel: objectFrame?.va1SupportiveVowel || "",
        va1SupportiveISurfacePolicy: objectFrame?.va1SupportiveISurfacePolicy || "",
        va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
        va1SupportiveISurfaceReason: objectFrame?.va1SupportiveISurfaceReason || "",
        va1SupportiveIIsOnlyAdditionOrDeletion: objectFrame?.va1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
        va1RightSound: objectFrame?.va1RightSound || "",
        stemRealization: objectFrame?.stemRealization || "",
        initialVowelKind: objectFrame?.initialVowelKind || "",
        initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
        initialSupportiveISurfacePolicy: objectFrame?.initialSupportiveISurfacePolicy || "",
        initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
        initialSupportiveISurfaceReason: objectFrame?.initialSupportiveISurfaceReason || "",
        initialSupportiveIIsOnlyAdditionOrDeletion: objectFrame?.initialSupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1Carries: objectFrame?.va1Carries || [],
        va2Carries: objectFrame?.va2Carries || [],
        objectRule: objectFrame?.objectRule || "",
        authorizationStatus: hasMonadicFiller || hasDyadicFiller ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function realizeClassicalNahuatlLesson6Formula({
      stem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const realizedStem = objectFrame?.stemRealization || normalizedStem;
      const person = `${personDyad?.pers1 || "0"}-${personDyad?.pers2 || "0"}`;
      const tense = tenseFrame?.tns || "0";
      const number = `${numberDyad?.num1 || "0"}-${numberDyad?.num2 || "0"}`;
      if (objectFrame?.valenceArity === "monadic") {
        return `#${person}+${objectFrame.va || "va"}(${realizedStem || "STEM"})${tense}+${number}#`;
      }
      return `#${person}+${objectFrame?.va1 || "va1"}-${objectFrame?.va2 || "va2"}(${realizedStem || "STEM"})${tense}+${number}#`;
    }
    function getClassicalNahuatlLesson6Lesson4Frame(stem = "", objectFrame = null, options = {}) {
      if (options.lesson4Frame && typeof options.lesson4Frame === "object") {
        return options.lesson4Frame;
      }
      const builder = getClassicalNahuatlLesson6RuntimeTarget()?.buildClassicalNahuatlLesson4NuclearClauseFrame;
      if (typeof builder === "function") {
        return builder(stem, {
          ...options,
          tenseMode: options.tenseMode || options.mode || "verbo",
          transitivity: "transitive",
          valenceSlot: objectFrame?.valenceArity || "dyadic"
        });
      }
      return null;
    }
    function buildClassicalNahuatlLesson6LogicProofFrame({
      lesson4Frame = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      formulaRuleFrame = null,
      objectCategoryRuleFrame = null,
      objectFillerRuleFrame = null,
      formulaRealization = ""
    } = {}) {
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true;
      const lesson4TransitiveVnc = lesson4Conclusion.authorizedClauseKind === "verbal-nuclear-clause" && lesson4Conclusion.authorizedFormulaId === objectFrame?.expectedLesson4FormulaId;
      const personDyadValid = Boolean(personDyad?.pers1 && personDyad?.pers2 === "0");
      const tenseValid = Boolean(tenseFrame?.tns != null && tenseFrame?.tns !== "");
      const numberDyadValid = Boolean(numberDyad?.num1 != null && numberDyad?.num2 != null);
      const formulaValid = formulaRuleFrame?.authorizationStatus === "authorized";
      const categoryValid = objectCategoryRuleFrame?.authorizationStatus === "authorized";
      const fillerValid = objectFillerRuleFrame?.authorizationStatus === "authorized";
      const authorized = Boolean(lesson4Authorized && lesson4TransitiveVnc && personDyadValid && tenseValid && numberDyadValid && formulaValid && categoryValid && fillerValid);
      return {
        kind: "classical-nahuatl-lesson6-logic-proof-frame",
        lesson: "Andrews Lesson 6",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleFrameKinds: [formulaRuleFrame?.kind || "", objectCategoryRuleFrame?.kind || "", objectFillerRuleFrame?.kind || ""].filter(Boolean),
        premises: [{
          lesson: "Andrews Lesson 4",
          layer: "prior-nuclear-clause-proof",
          rule: "Lesson 6 consumes an authorized Lesson 4 transitive VNC formula.",
          passed: lesson4Authorized,
          formulaId: lesson4Conclusion.authorizedFormulaId || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "transitive-vnc-domain",
          rule: "Lesson 6 applies only to VNC formulas with an objective Valence position.",
          passed: lesson4TransitiveVnc && formulaValid,
          clauseKind: lesson4Conclusion.authorizedClauseKind || "",
          valencePosition: objectFrame?.valencePosition || "",
          legalWitnessTagId: "cn-l6-transitive-vnc-formulas",
          ruleFrameKind: formulaRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 5",
          layer: "subject-person-dyad",
          rule: "Lesson 6 reuses the Lesson 5 subject pers1-pers2 filler.",
          passed: personDyadValid,
          pers1: personDyad?.pers1 || "",
          pers2: personDyad?.pers2 || ""
        }, {
          lesson: "Andrews Lesson 5",
          layer: "predicate-tense-and-subject-number",
          rule: "Lesson 6 reuses Lesson 5 tense and final subject-number fillers.",
          passed: tenseValid && numberDyadValid,
          tns: tenseFrame?.tns || "",
          num1: numberDyad?.num1 || "",
          num2: numberDyad?.num2 || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "objective-pronoun-categories",
          rule: "The object must carry objective case plus trajectory, specificity, and prominence.",
          passed: categoryValid,
          legalWitnessTagId: "cn-l6-object-pronoun-categories",
          ruleFrameKind: objectCategoryRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 6",
          layer: "objective-valence-filler",
          rule: "The object filler must match the monadic or dyadic Valence position authorized by Transcription.",
          passed: fillerValid,
          va: objectFrame?.va || "",
          va1: objectFrame?.va1 || "",
          va2: objectFrame?.va2 || "",
          va1Rule: objectFrame?.va1Rule || "",
          va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
          va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
          va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
          stemRealization: objectFrame?.stemRealization || "",
          initialVowelKind: objectFrame?.initialVowelKind || "",
          initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
          initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
          legalWitnessTagId: objectFrame?.valenceArity === "monadic" ? "cn-l6-monadic-valence-position" : objectFrame?.objectKind === "mainline-reflexive" ? "cn-l6-mainline-reflexive-fillers" : "cn-l6-projective-object-fillers",
          ruleFrameKind: objectFillerRuleFrame?.kind || ""
        }],
        conclusion: {
          authorized,
          formulaTemplate: authorized ? objectFrame?.formulaTemplate || "" : "",
          formulaRealization: authorized ? formulaRealization : "",
          subject: authorized ? personDyad?.subject || "" : "",
          objectKind: authorized ? objectFrame?.objectKind || "" : "",
          objectPerson: authorized ? objectFrame?.objectPerson || "" : "",
          valencePosition: authorized ? objectFrame?.valencePosition || "" : "",
          mood: authorized ? tenseFrame?.mood || "" : "",
          tense: authorized ? tenseFrame?.tense || "" : ""
        }
      };
    }
    function buildClassicalNahuatlLesson6SelectedOutputLogicFrame({
      proofFrame = null,
      inputStem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      formulaRuleFrame = null,
      objectCategoryRuleFrame = null,
      objectFillerRuleFrame = null
    } = {}) {
      const authorized = proofFrame?.conclusion?.authorized === true;
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(inputStem);
      const outputFillers = authorized ? {
        pers1: personDyad?.pers1 || "",
        pers2: personDyad?.pers2 || "",
        va: objectFrame?.va || "",
        va1: objectFrame?.va1 || "",
        va2: objectFrame?.va2 || "",
        objectRule: objectFrame?.objectRule || "",
        va1Rule: objectFrame?.va1Rule || "",
        va1MorphIdentityFrame: objectFrame?.va1MorphIdentityFrame || null,
        va1MorphIdentity: objectFrame?.va1MorphIdentity || "",
        va1MorphIdentityKind: objectFrame?.va1MorphIdentityKind || "",
        va1RegularSpellings: objectFrame?.va1RegularSpellings || [],
        va1SupportiveSpelling: objectFrame?.va1SupportiveSpelling || "",
        va1FinalBoundaryRealizationRequired: objectFrame?.va1FinalBoundaryRealizationRequired === true,
        va1BaseMorphSpelling: objectFrame?.va1BaseMorphSpelling || "",
        va1SupportiveVowelPresent: objectFrame?.va1SupportiveVowelPresent === true,
        va1SupportiveVowel: objectFrame?.va1SupportiveVowel || "",
        va1SupportiveISurfacePolicy: objectFrame?.va1SupportiveISurfacePolicy || "",
        va1SupportiveISurfaceAction: objectFrame?.va1SupportiveISurfaceAction || "",
        va1SupportiveISurfaceReason: objectFrame?.va1SupportiveISurfaceReason || "",
        va1SupportiveIIsOnlyAdditionOrDeletion: objectFrame?.va1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        va1RightCarrierSource: objectFrame?.va1RightCarrierSource || "",
        va1RightSound: objectFrame?.va1RightSound || "",
        stemRealization: objectFrame?.stemRealization || normalizedStem,
        initialVowelKind: objectFrame?.initialVowelKind || "",
        initialSupportiveIDropped: objectFrame?.initialSupportiveIDropped === true,
        initialSupportiveISurfacePolicy: objectFrame?.initialSupportiveISurfacePolicy || "",
        initialSupportiveISurfaceAction: objectFrame?.initialSupportiveISurfaceAction || "",
        initialSupportiveISurfaceReason: objectFrame?.initialSupportiveISurfaceReason || "",
        initialSupportiveIIsOnlyAdditionOrDeletion: objectFrame?.initialSupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        tns: tenseFrame?.tns || "",
        num1: numberDyad?.num1 || "",
        num2: numberDyad?.num2 || "",
        num1VariantRule: numberDyad?.num1VariantRule || "",
        num1VariantNote: numberDyad?.num1VariantNote || "",
        numberConditioningStem: numberDyad?.conditioningStem || "",
        numberStemFinalSound: numberDyad?.stemFinalSound || "",
        numberStemFinalSoundKind: numberDyad?.stemFinalSoundKind || ""
      } : {};
      return {
        kind: "classical-nahuatl-lesson6-selected-output-logic-frame",
        lesson: "Andrews Lesson 6",
        logicRole: "selected-output-logic",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        authorizationStatus: authorized ? "authorized" : "blocked",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        selectedFormulaRole: authorized ? "selected-output-instance" : "",
        selectedFormula: authorized ? proofFrame.conclusion.formulaRealization : "",
        outputFillers,
        ruleFrameKinds: authorized ? [formulaRuleFrame?.kind || "", objectCategoryRuleFrame?.kind || "", objectFillerRuleFrame?.kind || ""].filter(Boolean) : [],
        legalWitnessTagIds: authorized ? Array.from(new Set([...(formulaRuleFrame?.ruleRefs || []), ...(objectCategoryRuleFrame?.ruleRefs || []), ...(objectFillerRuleFrame?.ruleRefs || [])].map(rule => rule.tagId).filter(Boolean))) : [],
        steps: authorized ? [{
          layer: "input-stem",
          role: "input",
          value: normalizedStem
        }, {
          layer: "subject-person-dyad",
          role: "outputable",
          value: `${outputFillers.pers1}-${outputFillers.pers2}`
        }, {
          layer: "objective-valence",
          role: "outputable",
          value: objectFrame?.valenceArity === "monadic" ? outputFillers.va : `${outputFillers.va1}-${outputFillers.va2}`,
          rule: outputFillers.objectRule,
          va1Rule: outputFillers.va1Rule,
          va1MorphIdentity: outputFillers.va1MorphIdentity,
          va1RegularSpellings: outputFillers.va1RegularSpellings,
          va1SupportiveSpelling: outputFillers.va1SupportiveSpelling,
          va1FinalBoundaryRealizationRequired: outputFillers.va1FinalBoundaryRealizationRequired,
          va1BaseMorphSpelling: outputFillers.va1BaseMorphSpelling,
          va1SupportiveVowelPresent: outputFillers.va1SupportiveVowelPresent,
          va1SupportiveISurfacePolicy: outputFillers.va1SupportiveISurfacePolicy,
          va1SupportiveISurfaceAction: outputFillers.va1SupportiveISurfaceAction,
          va1SupportiveISurfaceReason: outputFillers.va1SupportiveISurfaceReason,
          va1SupportiveIIsOnlyAdditionOrDeletion: outputFillers.va1SupportiveIIsOnlyAdditionOrDeletion,
          va1RightCarrierSource: outputFillers.va1RightCarrierSource,
          va1RightSound: outputFillers.va1RightSound,
          stemRealization: outputFillers.stemRealization,
          initialVowelKind: outputFillers.initialVowelKind,
          initialSupportiveIDropped: outputFillers.initialSupportiveIDropped,
          initialSupportiveISurfacePolicy: outputFillers.initialSupportiveISurfacePolicy,
          initialSupportiveISurfaceAction: outputFillers.initialSupportiveISurfaceAction,
          initialSupportiveISurfaceReason: outputFillers.initialSupportiveISurfaceReason,
          initialSupportiveIIsOnlyAdditionOrDeletion: outputFillers.initialSupportiveIIsOnlyAdditionOrDeletion,
          ruleFrameKind: objectFillerRuleFrame?.kind || ""
        }, {
          layer: "vnc-tense-slot",
          role: "outputable",
          value: outputFillers.tns
        }, {
          layer: "subject-number-dyad",
          role: "outputable",
          value: `${outputFillers.num1}-${outputFillers.num2}`,
          rule: outputFillers.num1VariantRule,
          conditioningStem: outputFillers.numberConditioningStem,
          stemFinalSoundKind: outputFillers.numberStemFinalSoundKind
        }] : [],
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function getClassicalNahuatlLesson6ObjectOptions({
      subject = "3sg",
      stem = "",
      personDyad = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      return [getClassicalNahuatlLesson6MonadicObjectFrame("shuntline-reflexive"), getClassicalNahuatlLesson6MonadicObjectFrame("nonspecific-human"), getClassicalNahuatlLesson6MonadicObjectFrame("nonspecific-nonhuman"), ...["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"].map(objectPerson => getClassicalNahuatlLesson6SpecificProjectiveObjectFrame({
        objectPerson,
        stem: normalizedStem,
        personDyad
      })), getClassicalNahuatlLesson6MainlineReflexiveObjectFrame({
        subject,
        stem: normalizedStem
      })].map(frame => ({
        id: frame.objectKind === "specific-projective" ? `specific-${frame.objectPerson}` : frame.objectKind,
        label: frame.objectLabel || frame.objectKind,
        valenceArity: frame.valenceArity,
        valencePosition: frame.valencePosition,
        output: frame.valenceArity === "monadic" ? frame.va : `${frame.va1}-${frame.va2}`,
        objectKind: frame.objectKind,
        objectPerson: frame.objectPerson || "",
        trajectory: frame.trajectory,
        specificity: frame.specificity,
        prominence: frame.prominence,
        sourceAuthority: "Andrews transcription"
      }));
    }
    function buildClassicalNahuatlLesson6ReceiptInventory({
      stem = "",
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      verbClass = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const normalizedSubject = normalizeClassicalNahuatlLesson6Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson6Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson6Tense(tense, normalizedMood);
      const personDyad = getClassicalNahuatlLesson6PersonDyad(normalizedSubject, normalizedMood, normalizedStem);
      const tenseFrame = getClassicalNahuatlLesson6TenseFrame({
        mood: normalizedMood,
        tense: normalizedTense,
        verbClass
      });
      const numberDyad = getClassicalNahuatlLesson6NumberDyad({
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        stem: normalizedStem
      });
      const formulas = getClassicalNahuatlLesson6ObjectOptions({
        subject: normalizedSubject,
        stem: normalizedStem,
        personDyad
      }).map(option => {
        const objectFrame = getClassicalNahuatlLesson6ObjectValenceFrame({
          objectKind: option.objectKind,
          objectPerson: option.objectPerson,
          subject: normalizedSubject,
          stem: normalizedStem,
          personDyad
        });
        return {
          objectKind: option.objectKind,
          objectPerson: option.objectPerson,
          valencePosition: option.valencePosition,
          formula: realizeClassicalNahuatlLesson6Formula({
            stem: normalizedStem,
            personDyad,
            tenseFrame,
            numberDyad,
            objectFrame
          }),
          slotSummary: {
            person: `${personDyad.pers1}-${personDyad.pers2}`,
            valence: option.output,
            tense: tenseFrame.tns,
            number: `${numberDyad.num1}-${numberDyad.num2}`
          }
        };
      });
      return {
        kind: "classical-nahuatl-lesson6-display-receipt-inventory",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        formulaCount: formulas.length,
        formulas
      };
    }
    function buildClassicalNahuatlLesson6DisplayReceiptFrame({
      proofFrame = null,
      formulaRealizationRecord = null,
      objectFrame = null,
      receiptInventory = null,
      selectedOutputLogicFrame = null
    } = {}) {
      const firstFailedPremise = Array.isArray(proofFrame?.premises) ? proofFrame.premises.find(premise => premise.passed !== true) : null;
      const authorized = proofFrame?.conclusion?.authorized === true;
      const selectedFormula = authorized ? proofFrame.conclusion.formulaRealization : "";
      return {
        kind: "classical-nahuatl-lesson6-display-receipt-frame",
        lesson: "Andrews Lesson 6",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS],
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6ReceiptRules(),
        mirrorsLogicProof: proofFrame?.kind || "classical-nahuatl-lesson6-logic-proof-frame",
        status: proofFrame?.authorizationStatus || "blocked",
        selectedFormula,
        formula: selectedFormula,
        selectedFormulaRole: authorized ? "selected-output-instance" : "",
        selectedOutputLogicKind: authorized ? selectedOutputLogicFrame?.kind || "" : "",
        selectedOutputLogicStatus: selectedOutputLogicFrame?.authorizationStatus || "blocked",
        formulaSetCount: authorized ? receiptInventory?.formulaCount || 0 : 0,
        formulaSetSample: authorized && Array.isArray(receiptInventory?.formulas) ? receiptInventory.formulas.slice(0, 6).map(entry => entry.formula) : [],
        receiptInventoryKind: authorized ? receiptInventory?.kind || "" : "",
        blockedBy: authorized ? "" : firstFailedPremise?.layer || "logic-proof",
        slotSummary: authorized ? {
          valence: objectFrame?.valenceArity === "monadic" ? objectFrame?.va || "" : `${objectFrame?.va1 || ""}-${objectFrame?.va2 || ""}`,
          valencePosition: objectFrame?.valencePosition || "",
          objectKind: objectFrame?.objectKind || ""
        } : {},
        formulaRealizationRecordKind: formulaRealizationRecord?.kind || "",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson6ReceiptAuthorityFrame({
      proofFrame = null,
      selectedOutputLogicFrame = null,
      displayReceiptFrame = null
    } = {}) {
      const proofAuthorized = proofFrame?.conclusion?.authorized === true;
      const selectedOutputAuthorized = selectedOutputLogicFrame?.authorizationStatus === "authorized";
      const receiptMirrorsSelectedOutput = displayReceiptFrame?.selectedFormula === selectedOutputLogicFrame?.selectedFormula && displayReceiptFrame?.status === selectedOutputLogicFrame?.authorizationStatus;
      const receiptCanDisplay = Boolean(proofAuthorized && selectedOutputAuthorized && receiptMirrorsSelectedOutput);
      return {
        kind: "classical-nahuatl-lesson6-receipt-authority-rule-frame",
        lesson: "Andrews Lesson 6",
        section: "6.1-6.7",
        ruleLogicRole: "display-receipt-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson6ReceiptRules(),
        receiptRole: "display-only",
        authorityRole: "not-authority",
        proofFrameKind: proofFrame?.kind || "",
        selectedOutputLogicKind: selectedOutputLogicFrame?.kind || "",
        displayReceiptKind: displayReceiptFrame?.kind || "",
        proofAuthorized,
        selectedOutputAuthorized,
        receiptMirrorsSelectedOutput,
        receiptCanDisplay,
        receiptCannotAuthorize: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson6TransitiveVncObjectFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson6Stem(stem);
      const subject = normalizeClassicalNahuatlLesson6Subject(options.subject || options.subjectPerson || options.subj || "");
      const mood = normalizeClassicalNahuatlLesson6Mood(options.mood || options.sentenceMood || "");
      const tense = normalizeClassicalNahuatlLesson6Tense(options.tense || options.tenseKey || "", mood);
      const personDyad = getClassicalNahuatlLesson6PersonDyad(subject, mood, normalizedStem);
      const tenseFrame = getClassicalNahuatlLesson6TenseFrame({
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const numberDyad = getClassicalNahuatlLesson6NumberDyad({
        subject,
        mood,
        tense,
        stem: normalizedStem
      });
      const objectFrame = getClassicalNahuatlLesson6ObjectValenceFrame({
        ...options,
        subject,
        stem: normalizedStem,
        personDyad
      });
      const lesson4Frame = getClassicalNahuatlLesson6Lesson4Frame(normalizedStem || stem, objectFrame, {
        ...options,
        subject,
        mood,
        tense
      });
      const formulaRealization = realizeClassicalNahuatlLesson6Formula({
        stem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame
      });
      const formulaRuleFrame = buildClassicalNahuatlLesson6FormulaRuleFrame({
        stem: normalizedStem,
        objectFrame,
        lesson4Frame,
        personDyad,
        tenseFrame,
        numberDyad
      });
      const objectCategoryRuleFrame = buildClassicalNahuatlLesson6ObjectCategoryRuleFrame(objectFrame);
      const objectFillerRuleFrame = buildClassicalNahuatlLesson6ObjectFillerRuleFrame(objectFrame);
      const proofFrame = buildClassicalNahuatlLesson6LogicProofFrame({
        lesson4Frame,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame,
        formulaRealization
      });
      const formulaRealizationRecord = {
        kind: "classical-nahuatl-lesson6-formula-realization-record",
        formulaRealization: proofFrame.conclusion.formulaRealization,
        fillers: {
          pers1: proofFrame.conclusion.authorized ? personDyad.pers1 : "",
          pers2: proofFrame.conclusion.authorized ? personDyad.pers2 : "",
          valence: proofFrame.conclusion.authorized && objectFrame.valenceArity === "monadic" ? objectFrame.va : "",
          va1: proofFrame.conclusion.authorized && objectFrame.valenceArity === "dyadic" ? objectFrame.va1 : "",
          va2: proofFrame.conclusion.authorized && objectFrame.valenceArity === "dyadic" ? objectFrame.va2 : "",
          stem: proofFrame.conclusion.authorized ? objectFrame.stemRealization || normalizedStem : "",
          inputStem: proofFrame.conclusion.authorized ? normalizedStem : "",
          tns: proofFrame.conclusion.authorized ? tenseFrame.tns : "",
          num1: proofFrame.conclusion.authorized ? numberDyad.num1 : "",
          num2: proofFrame.conclusion.authorized ? numberDyad.num2 : ""
        }
      };
      const vncSlotFrameBuilder = getClassicalNahuatlLesson6RuntimeTarget()?.buildClassicalNahuatlVncSlotFrame;
      const vncSlotFrame = typeof vncSlotFrameBuilder === "function" ? vncSlotFrameBuilder({
        sourceFrameKind: "classical-nahuatl-lesson6-transitive-vnc-object-machinery-frame",
        sourceAuthorizationStatus: proofFrame.conclusion.authorized ? "authorized" : "blocked",
        stem: objectFrame.stemRealization || normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaArtifact: proofFrame.conclusion.formulaRealization
      }) : null;
      const selectedOutputLogicFrame = buildClassicalNahuatlLesson6SelectedOutputLogicFrame({
        proofFrame,
        inputStem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame
      });
      const receiptInventory = buildClassicalNahuatlLesson6ReceiptInventory({
        stem: normalizedStem,
        subject,
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const displayReceiptFrame = buildClassicalNahuatlLesson6DisplayReceiptFrame({
        proofFrame,
        formulaRealizationRecord,
        objectFrame,
        receiptInventory,
        selectedOutputLogicFrame
      });
      const receiptAuthorityFrame = buildClassicalNahuatlLesson6ReceiptAuthorityFrame({
        proofFrame,
        selectedOutputLogicFrame,
        displayReceiptFrame
      });
      const ruleLogicFrames = [formulaRuleFrame, objectCategoryRuleFrame, objectFillerRuleFrame, receiptAuthorityFrame];
      return {
        kind: "classical-nahuatl-lesson6-transitive-vnc-object-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION,
        lesson: "Andrews Lesson 6",
        lessonTitle: "The Transitive VNC Formula. Object Pronouns",
        machineryScope: "transitive-vnc-object-fillers",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON6_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON6_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        stem: normalizedStem,
        subject,
        mood,
        tense,
        lesson4Frame,
        personDyad,
        tenseFrame,
        numberDyad,
        objectFrame,
        formulaRuleFrame,
        objectCategoryRuleFrame,
        objectFillerRuleFrame,
        receiptAuthorityFrame,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame.kind),
        ruleRefs: getClassicalNahuatlLesson6RuleLogicRules(),
        formulaTemplate: objectFrame.formulaTemplate,
        formulaRealization,
        formulaRecord: {
          kind: "classical-nahuatl-lesson6-formula-record",
          formulaTemplate: objectFrame.formulaTemplate,
          valencePosition: objectFrame.valencePosition,
          slotOrder: objectFrame.valenceArity === "monadic" ? ["pers1", "pers2", "va", "stem", "tns", "num1", "num2"] : ["pers1", "pers2", "va1", "va2", "stem", "tns", "num1", "num2"],
          sourceAuthority: "Andrews transcription"
        },
        formulaRealizationRecord,
        vncSlotFrame,
        proofFrame,
        selectedOutputLogicFrame,
        receiptInventory,
        displayReceiptFrame,
        objectOptions: getClassicalNahuatlLesson6ObjectOptions({
          subject,
          stem: normalizedStem,
          personDyad
        }),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: proofFrame.conclusion.authorized,
        surfaceGenerationAllowed: false,
        blocksInput: proofFrame.conclusion.authorized !== true
      };
    }
    function installClassicalNahuatlLesson6TransitiveVncObjectClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLesson6FormulaRules,
        getClassicalNahuatlLesson6ObjectCategoryRules,
        getClassicalNahuatlLesson6MonadicRules,
        getClassicalNahuatlLesson6DyadicProjectiveRules,
        getClassicalNahuatlLesson6SupportiveIRules,
        getClassicalNahuatlLesson6ReflexiveRules,
        getClassicalNahuatlLesson6ReceiptRules,
        getClassicalNahuatlLesson6RuleLogicRules,
        buildClassicalNahuatlLesson6ThirdPersonVa1SupportiveVowelFrame,
        buildClassicalNahuatlLesson6ThirdPersonKObjectMorphIdentityFrame,
        buildClassicalNahuatlLesson6InitialSupportiveIFrame,
        getClassicalNahuatlLesson6ThirdPersonVa1,
        getClassicalNahuatlLesson6ObjectValenceFrame,
        getClassicalNahuatlLesson6SpecificProjectiveObjectFrame,
        getClassicalNahuatlLesson6MainlineReflexiveObjectFrame,
        getClassicalNahuatlLesson6ObjectOptions,
        buildClassicalNahuatlLesson6FormulaRuleFrame,
        buildClassicalNahuatlLesson6ObjectCategoryRuleFrame,
        buildClassicalNahuatlLesson6ObjectFillerRuleFrame,
        buildClassicalNahuatlLesson6LogicProofFrame,
        buildClassicalNahuatlLesson6SelectedOutputLogicFrame,
        buildClassicalNahuatlLesson6ReceiptInventory,
        buildClassicalNahuatlLesson6DisplayReceiptFrame,
        buildClassicalNahuatlLesson6ReceiptAuthorityFrame,
        buildClassicalNahuatlLesson6TransitiveVncObjectFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson6TransitiveVncObjectClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_TRANSITIVE_VNC_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_FORMULA_TEMPLATE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_DYADIC_FORMULA_TEMPLATE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SQUARE_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_LEGAL_WITNESS_AUTHORITY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_OUTPUTABLE_SLOTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_POLICY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_SURFACE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_FORMULA_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_OBJECT_CATEGORY_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_DYADIC_PROJECTIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_SUPPORTIVE_I_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_REFLEXIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_RECEIPT_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_MONADIC_OBJECTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON6_PROJECTIVE_OBJECTS; },
    });
    api.getClassicalNahuatlLesson6RuntimeTarget = getClassicalNahuatlLesson6RuntimeTarget;
    api.cloneClassicalNahuatlLesson6Rule = cloneClassicalNahuatlLesson6Rule;
    api.getClassicalNahuatlLesson6FormulaRules = getClassicalNahuatlLesson6FormulaRules;
    api.getClassicalNahuatlLesson6ObjectCategoryRules = getClassicalNahuatlLesson6ObjectCategoryRules;
    api.getClassicalNahuatlLesson6MonadicRules = getClassicalNahuatlLesson6MonadicRules;
    api.getClassicalNahuatlLesson6DyadicProjectiveRules = getClassicalNahuatlLesson6DyadicProjectiveRules;
    api.getClassicalNahuatlLesson6SupportiveIRules = getClassicalNahuatlLesson6SupportiveIRules;
    api.getClassicalNahuatlLesson6ReflexiveRules = getClassicalNahuatlLesson6ReflexiveRules;
    api.getClassicalNahuatlLesson6ReceiptRules = getClassicalNahuatlLesson6ReceiptRules;
    api.getClassicalNahuatlLesson6RuleLogicRules = getClassicalNahuatlLesson6RuleLogicRules;
    api.normalizeClassicalNahuatlLesson6Token = normalizeClassicalNahuatlLesson6Token;
    api.normalizeClassicalNahuatlLesson6Stem = normalizeClassicalNahuatlLesson6Stem;
    api.normalizeClassicalNahuatlLesson6Subject = normalizeClassicalNahuatlLesson6Subject;
    api.normalizeClassicalNahuatlLesson6Mood = normalizeClassicalNahuatlLesson6Mood;
    api.normalizeClassicalNahuatlLesson6Tense = normalizeClassicalNahuatlLesson6Tense;
    api.getClassicalNahuatlLesson6FollowingSound = getClassicalNahuatlLesson6FollowingSound;
    api.isClassicalNahuatlLesson6VowelSound = isClassicalNahuatlLesson6VowelSound;
    api.getClassicalNahuatlLesson6InitialVowelKind = getClassicalNahuatlLesson6InitialVowelKind;
    api.omitClassicalNahuatlLesson6InitialSupportiveI = omitClassicalNahuatlLesson6InitialSupportiveI;
    api.buildClassicalNahuatlLesson6InitialSupportiveIFrame = buildClassicalNahuatlLesson6InitialSupportiveIFrame;
    api.getClassicalNahuatlLesson6PersonDyad = getClassicalNahuatlLesson6PersonDyad;
    api.getClassicalNahuatlLesson6TenseFrame = getClassicalNahuatlLesson6TenseFrame;
    api.getClassicalNahuatlLesson6NumberDyad = getClassicalNahuatlLesson6NumberDyad;
    api.normalizeClassicalNahuatlLesson6ObjectPerson = normalizeClassicalNahuatlLesson6ObjectPerson;
    api.normalizeClassicalNahuatlLesson6ObjectKind = normalizeClassicalNahuatlLesson6ObjectKind;
    api.getClassicalNahuatlLesson6CarrierInitialSound = getClassicalNahuatlLesson6CarrierInitialSound;
    api.hasClassicalNahuatlLesson6VowelCarrier = hasClassicalNahuatlLesson6VowelCarrier;
    api.buildClassicalNahuatlLesson6ThirdPersonVa1SupportiveVowelFrame = buildClassicalNahuatlLesson6ThirdPersonVa1SupportiveVowelFrame;
    api.buildClassicalNahuatlLesson6ThirdPersonKObjectMorphIdentityFrame = buildClassicalNahuatlLesson6ThirdPersonKObjectMorphIdentityFrame;
    api.getClassicalNahuatlLesson6ThirdPersonVa1 = getClassicalNahuatlLesson6ThirdPersonVa1;
    api.getClassicalNahuatlLesson6ThirdPluralVa2 = getClassicalNahuatlLesson6ThirdPluralVa2;
    api.getClassicalNahuatlLesson6SpecificProjectiveObjectFrame = getClassicalNahuatlLesson6SpecificProjectiveObjectFrame;
    api.getClassicalNahuatlLesson6MainlineReflexiveObjectFrame = getClassicalNahuatlLesson6MainlineReflexiveObjectFrame;
    api.getClassicalNahuatlLesson6MonadicObjectFrame = getClassicalNahuatlLesson6MonadicObjectFrame;
    api.getClassicalNahuatlLesson6ObjectValenceFrame = getClassicalNahuatlLesson6ObjectValenceFrame;
    api.buildClassicalNahuatlLesson6FormulaRuleFrame = buildClassicalNahuatlLesson6FormulaRuleFrame;
    api.buildClassicalNahuatlLesson6ObjectCategoryRuleFrame = buildClassicalNahuatlLesson6ObjectCategoryRuleFrame;
    api.buildClassicalNahuatlLesson6ObjectFillerRuleFrame = buildClassicalNahuatlLesson6ObjectFillerRuleFrame;
    api.realizeClassicalNahuatlLesson6Formula = realizeClassicalNahuatlLesson6Formula;
    api.getClassicalNahuatlLesson6Lesson4Frame = getClassicalNahuatlLesson6Lesson4Frame;
    api.buildClassicalNahuatlLesson6LogicProofFrame = buildClassicalNahuatlLesson6LogicProofFrame;
    api.buildClassicalNahuatlLesson6SelectedOutputLogicFrame = buildClassicalNahuatlLesson6SelectedOutputLogicFrame;
    api.getClassicalNahuatlLesson6ObjectOptions = getClassicalNahuatlLesson6ObjectOptions;
    api.buildClassicalNahuatlLesson6ReceiptInventory = buildClassicalNahuatlLesson6ReceiptInventory;
    api.buildClassicalNahuatlLesson6DisplayReceiptFrame = buildClassicalNahuatlLesson6DisplayReceiptFrame;
    api.buildClassicalNahuatlLesson6ReceiptAuthorityFrame = buildClassicalNahuatlLesson6ReceiptAuthorityFrame;
    api.buildClassicalNahuatlLesson6TransitiveVncObjectFrame = buildClassicalNahuatlLesson6TransitiveVncObjectFrame;
    api.installClassicalNahuatlLesson6TransitiveVncObjectClassicGlobals = installClassicalNahuatlLesson6TransitiveVncObjectClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson6TransitiveVncObjectGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson6TransitiveVncObjectRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
