// Canonical modern ESM module.

export function createClassicalNahuatlLesson5VncSubjectTenseRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON5_VNC_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON5_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE = "#pers1-pers2(STEM)tns+num1-num2#";
    const CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS = Object.freeze({
      "indicative:present": Object.freeze({
        mood: "indicative",
        tense: "present",
        tns: "0",
        condition: "main-indicative"
      }),
      "indicative:customary-present": Object.freeze({
        mood: "indicative",
        tense: "customary-present",
        tns: "ni",
        condition: "main-indicative"
      }),
      "indicative:imperfect": Object.freeze({
        mood: "indicative",
        tense: "imperfect",
        tns: "ya",
        condition: "main-indicative"
      }),
      "indicative:future": Object.freeze({
        mood: "indicative",
        tense: "future",
        tns: "z",
        condition: "future-preterit-indicative"
      }),
      "indicative:preterit": Object.freeze({
        mood: "indicative",
        tense: "preterit",
        tns: "0",
        condition: "future-preterit-indicative"
      }),
      "indicative:distant-past": Object.freeze({
        mood: "indicative",
        tense: "distant-past",
        tns: "ca",
        condition: "main-indicative"
      }),
      "optative:nonpast": Object.freeze({
        mood: "optative",
        tense: "nonpast",
        tns: "0",
        condition: "nonpast-optative"
      }),
      "optative:past": Object.freeze({
        mood: "optative",
        tense: "past",
        tns: "ni",
        condition: "past-optative"
      }),
      "admonitive:nonpast": Object.freeze({
        mood: "admonitive",
        tense: "nonpast",
        tns: "0",
        classATns: "h",
        condition: "nonpast-admonitive"
      })
    });
    const CLASSICAL_NAHUATL_LESSON5_SUBJECTS = Object.freeze(["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]);
    const CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS = Object.freeze(["pers1-pers2", "tns", "num1-num2"]);
    const CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY = "Transcription line ranges are the legal deed; digest anchors are navigation aids only.";
    const CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_POLICY = "conditional-support-vowel-boundary-action";
    const CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS = Object.freeze({
      INSERT: "insert",
      SUPPRESS: "suppress",
      NOT_NEEDED: "not-needed",
      NOT_SUPPORTIVE: "not-supportive"
    });
    const CLASSICAL_NAHUATL_LESSON5_FORMULA_RULES = Object.freeze([Object.freeze({
      id: "cn-l5-51-linear-intransitive-vnc",
      tagId: "cn-l5-intransitive-vnc-formula",
      section: "5.1",
      lineStart: 2449,
      lineEnd: 2456,
      exactWitness: "Linear format: #pers\u00b9-pers\u00b2(STEM)tns+num\u00b9-num\u00b2#",
      rule: "The intransitive VNC formula is #pers1-pers2(STEM)tns+num1-num2#.",
      clauseKind: "verbal-nuclear-clause",
      transitivity: "intransitive",
      slotOrder: Object.freeze(["pers1", "pers2", "stem", "tns", "num1", "num2"])
    }), Object.freeze({
      id: "cn-l5-51-valence-vacant-in-core",
      tagId: "cn-l5-intransitive-vnc-formula",
      section: "5.1",
      lineStart: 2455,
      lineEnd: 2456,
      exactWitness: "The implicit presence of a position for valence in the Core is what defines this as an intransitive\nformula.",
      rule: "Lesson 5 authorizes only the intransitive VNC slice; transitive valence waits for Lesson 6.",
      clauseKind: "verbal-nuclear-clause",
      transitivity: "intransitive",
      valencePosition: "implicit-vacant"
    })]);
    const CLASSICAL_NAHUATL_LESSON5_SUBJECT_PERSON_RULES = Object.freeze([Object.freeze({
      id: "cn-l5-52-subject-feature-distribution",
      tagId: "cn-l5-subject-positions",
      section: "5.2",
      lineStart: 2457,
      lineEnd: 2463,
      exactWitness: "the location of the features of person, case, and number.",
      rule: "Lesson 5 distributes subject personal-pronoun person, case, and number into formula subpositions.",
      featureLoci: Object.freeze(["person", "case", "number"])
    }), Object.freeze({
      id: "cn-l5-531-pers1-person-locus",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.1",
      lineStart: 2488,
      lineEnd: 2494,
      exactWitness: "The pers1 subposition is primarily the locus for information concerning person.",
      rule: "pers1 is the primary person locus and selects 0, t/ti, x/xi, am/an/etc., or n/ni by subject and mood.",
      slot: "pers1"
    }), Object.freeze({
      id: "cn-l5-531-second-person-optative-x",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.1",
      lineStart: 2495,
      lineEnd: 2496,
      exactWitness: "The variants x and xi for the second person (either singular or plural) occur only in optative",
      rule: "Second-person x/xi is restricted to optative VNCs.",
      slot: "pers1"
    }), Object.freeze({
      id: "cn-l5-531-num2-resolves-t-ti",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.1",
      lineStart: 2497,
      lineEnd: 2501,
      exactWitness: "the subject pronoun's number suffix\n(subposition num2) is required to resolve the ambiguity.",
      rule: "The final num2 suffix resolves t/ti ambiguity between second singular and first plural.",
      slot: "pers1",
      dependency: "num2"
    }), Object.freeze({
      id: "cn-l5-531-supportive-i-and-nasal-assimilation",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.1",
      lineStart: 2502,
      lineEnd: 2506,
      exactWitness: "The [i] in ti, xi, and ni is a supportive vowel, required when there is a following consonant",
      rule: "ti/xi/ni use supportive i before a following consonant; second plural am/an can assimilate as az/ax.",
      slot: "pers1"
    }), Object.freeze({
      id: "cn-l5-532-pers2-nominative-zero",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.2",
      lineStart: 2507,
      lineEnd: 2511,
      exactWitness: "Subposition pers2 is the locus for information concerning case.",
      rule: "pers2 carries nominative case for the subject function, represented by 0.",
      slot: "pers2"
    })]);
    const CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_RULES = Object.freeze([Object.freeze({
      id: "cn-l2-26-supportive-i-illegal-sequence",
      tagId: "cn-l2-syllable-structure",
      section: "2.6 Note 1",
      lineStart: 1738,
      lineEnd: 1744,
      exactWitness: "any type-level consonant sequence\nthat is illegal at the token level is lifted into a pronounceable sequence by the introduction of an [i]",
      rule: "Lesson 2 supplies the general reason for supportive i: it repairs otherwise illegal consonant sequences.",
      slot: "phonological-support"
    }), Object.freeze({
      id: "cn-l5-531-pers1-supportive-i",
      tagId: "cn-l5-pers1-pers2-variants",
      section: "5.3.1",
      lineStart: 2502,
      lineEnd: 2503,
      exactWitness: "The [i] in ti, xi, and ni is a supportive vowel, required when there is a following consonant\nsound.",
      rule: "The i in ni, ti, and xi belongs to supportive-vowel logic, not to the base person morph.",
      slot: "pers1"
    }), Object.freeze({
      id: "cn-l5-533-qui-supportive-i",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2523,
      lineEnd: 2526,
      exactWitness: "the irregular morph [ki], spelled qui, has a supportive [i].",
      rule: "The i in num1 qui is supportive; c and qu are regular spellings of the k morph.",
      slot: "num1"
    }), Object.freeze({
      id: "cn-l5-533c-square-zero-replaces-qui",
      tagId: "cn-l5-square-zero-future-singular",
      section: "5.3.3.c",
      lineStart: 2537,
      lineEnd: 2541,
      exactWitness: "The irregular morph \u2395 is a subvariant of qui, which it has replaced except in instances\nof archaic style",
      rule: "Square-zero can replace the supportive-i variant qui in singular number dyads.",
      slot: "num1"
    })]);
    const CLASSICAL_NAHUATL_LESSON5_SUBJECT_NUMBER_RULES = Object.freeze([Object.freeze({
      id: "cn-l5-533-num1-number-connector",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2512,
      lineEnd: 2515,
      exactWitness: "Subposition num1 is the locus of a \"number-connector morph.\"",
      rule: "num1 is a number-connector morph between predicate and num2.",
      slot: "num1"
    }), Object.freeze({
      id: "cn-l5-533-main-indicative-zero",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2520,
      lineEnd: 2522,
      exactWitness: "present, customary\npresent, imperfect, and distant past tenses of the indicative mode as well as the past",
      rule: "Present, customary present, imperfect, distant-past indicative, and past optative use num1 0.",
      slot: "num1",
      conditions: Object.freeze(["main-indicative", "past-optative"])
    }), Object.freeze({
      id: "cn-l5-533-future-preterit-k-morpheme",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2523,
      lineEnd: 2526,
      exactWitness: "c/qu ~ qui ~ \u2395",
      rule: "Future and preterit indicative use the k morpheme family c/qu, qui, or square-zero in num1.",
      slot: "num1",
      conditions: Object.freeze(["future-preterit-indicative"])
    }), Object.freeze({
      id: "cn-l5-533a-qu-before-eh",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3.a",
      lineStart: 2527,
      lineEnd: 2528,
      exactWitness: "The qu variant fills the num1 subposition when the num2 subposition is filled by the\nplural morph eh.",
      rule: "Plural future and preterit indicative use qu before num2 eh.",
      slot: "num1",
      conditions: Object.freeze(["future-preterit-indicative", "plural"])
    }), Object.freeze({
      id: "cn-l5-533b-c-qui-singular-distribution",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3.b",
      lineStart: 2529,
      lineEnd: 2536,
      exactWitness: "c occurs\nafter a vowel and qui after a consonant.",
      rule: "Singular future/preterit num1 c and qui are conditioned variants and remain part of the number dyad, not tense.",
      slot: "num1",
      conditions: Object.freeze(["future-preterit-indicative", "singular"])
    }), Object.freeze({
      id: "cn-l5-533c-square-zero-qui-subvariant",
      tagId: "cn-l5-square-zero-future-singular",
      section: "5.3.3.c",
      lineStart: 2537,
      lineEnd: 2541,
      exactWitness: "The irregular morph \u2395 is a subvariant of qui",
      rule: "Square-zero is a subvariant of qui and may replace it only in singular-number pronouns in this Lesson 5 slice.",
      slot: "num1",
      conditions: Object.freeze(["singular"])
    }), Object.freeze({
      id: "cn-l5-533-nonpast-optative-c-square",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2542,
      lineEnd: 2545,
      exactWitness: "c ~ \u2395 [The morphic carriers again represent the morpheme /kl",
      rule: "Nonpast optative uses c before plural num2 and square-zero before singular num2.",
      slot: "num1",
      conditions: Object.freeze(["nonpast-optative"])
    }), Object.freeze({
      id: "cn-l5-533-nonpast-admonitive-t-square",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.3",
      lineStart: 2546,
      lineEnd: 2548,
      exactWitness: "t ~ \u2395 [The morphic carriers represent the morpheme It/",
      rule: "Nonpast admonitive uses t before plural num2 and square-zero before singular num2.",
      slot: "num1",
      conditions: Object.freeze(["nonpast-admonitive"])
    }), Object.freeze({
      id: "cn-l5-534-num2-number-locus",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.4",
      lineStart: 2549,
      lineEnd: 2553,
      exactWitness: "Subposition num2 is the definitive locus for the number category.",
      rule: "num2 is the definitive number locus: singular/common is always 0; plural is h, eh, an, or in.",
      slot: "num2"
    }), Object.freeze({
      id: "cn-l5-534-in-ih-subvariant",
      tagId: "cn-l5-num1-num2-variants",
      section: "5.3.4",
      lineStart: 2563,
      lineEnd: 2566,
      exactWitness: "in [This variant morphic carrier occurs when the tense morph signifies the nonpast\nadmonitive. This variant has ih as a subvariant.]",
      rule: "Nonpast admonitive plural num2 uses in, with ih as a subvariant.",
      slot: "num2",
      conditions: Object.freeze(["nonpast-admonitive", "plural"])
    }), Object.freeze({
      id: "cn-l5-54-four-paradigms",
      tagId: "cn-l5-personal-pronoun-summary",
      section: "5.4",
      lineStart: 2567,
      lineEnd: 2571,
      exactWitness: "There are four possible paradigms",
      rule: "The subject personal-pronoun summaries are paradigms determined by num1-num2 in correlation with predicate tense.",
      slot: "num1-num2"
    })]);
    const CLASSICAL_NAHUATL_LESSON5_TENSE_RULES = Object.freeze([Object.freeze({
      id: "cn-l5-55-stem-locus",
      tagId: "cn-l5-predicate-tense-position",
      section: "5.5.1",
      lineStart: 2610,
      lineEnd: 2631,
      exactWitness: "The STEM position is the locus for lexical meaning",
      rule: "The input stem remains the predicate stem locus; Lesson 5 outputs tense and subject fillers around it.",
      slot: "stem"
    }), Object.freeze({
      id: "cn-l5-552-tns-fused-mood-tense",
      tagId: "cn-l5-predicate-tense-position",
      section: "5.5.2",
      lineStart: 2632,
      lineEnd: 2652,
      exactWitness: "tense and mood are fused into a single position, the Tense position",
      rule: "The tns slot fuses mood and tense into one predicate position.",
      slot: "tns"
    }), Object.freeze({
      id: "cn-l5-552-indicative-tense-fillers",
      tagId: "cn-l5-predicate-tense-position",
      section: "5.5.2",
      lineStart: 2653,
      lineEnd: 2654,
      exactWitness: "Indicative: present = 0; customary present = ni; imperfect = ya ~ ya",
      rule: "Indicative tns fillers are present 0, customary ni, imperfect ya, future z, preterit 0, and distant past ca.",
      slot: "tns",
      mood: "indicative"
    }), Object.freeze({
      id: "cn-l5-552-optative-admonitive-tense-fillers",
      tagId: "cn-l5-predicate-tense-position",
      section: "5.5.2",
      lineStart: 2655,
      lineEnd: 2656,
      exactWitness: "Optative: nonpast = 0; past = ni\nAdmonitive: nonpast = h [for Class A verbs]; 0 [for all other classes]",
      rule: "Optative tns fillers are nonpast 0 and past ni; admonitive nonpast is h for Class A and 0 otherwise.",
      slot: "tns",
      mood: "optative-admonitive"
    }), Object.freeze({
      id: "cn-l5-55-square-zero-ambiguity",
      tagId: "cn-l5-square-zero-future-singular",
      section: "5.5",
      lineStart: 2675,
      lineEnd: 2677,
      exactWitness: "Keep in mind the ambiguity of the subject personal-pronoun singular-number dyad +\u2395-\u00d8.",
      rule: "The square-zero singular number dyad is ambiguous across future/preterit, nonpast optative, and nonpast admonitive contexts.",
      slot: "num1-num2"
    })]);
    const CLASSICAL_NAHUATL_LESSON5_RECEIPT_RULES = Object.freeze([Object.freeze({
      id: "cn-l5-receipt-mirrors-selected-output-logic",
      tagId: "cn-l5-receipt-not-authority",
      section: "5.1-5.5",
      lineStart: 2449,
      lineEnd: 2677,
      exactWitness: "The simplest VNC formula is the intransitive",
      rule: "The receipt may display only the Lesson 5 formula and fillers authorized by the selected-output logic; it is not itself authority.",
      receiptRole: "display-only",
      authorityRole: "not-authority"
    })]);
    function getClassicalNahuatlLesson5RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function cloneClassicalNahuatlLesson5Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["slotOrder", "featureLoci", "conditions"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function getClassicalNahuatlLesson5FormulaRules() {
      return CLASSICAL_NAHUATL_LESSON5_FORMULA_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5SubjectPersonRules() {
      return CLASSICAL_NAHUATL_LESSON5_SUBJECT_PERSON_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5SupportiveIRules() {
      return CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5SubjectNumberRules() {
      return CLASSICAL_NAHUATL_LESSON5_SUBJECT_NUMBER_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5TenseRules() {
      return CLASSICAL_NAHUATL_LESSON5_TENSE_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5ReceiptRules() {
      return CLASSICAL_NAHUATL_LESSON5_RECEIPT_RULES.map(cloneClassicalNahuatlLesson5Rule);
    }
    function getClassicalNahuatlLesson5RuleLogicRules() {
      return {
        formula: getClassicalNahuatlLesson5FormulaRules(),
        subjectPerson: getClassicalNahuatlLesson5SubjectPersonRules(),
        supportiveI: getClassicalNahuatlLesson5SupportiveIRules(),
        subjectNumber: getClassicalNahuatlLesson5SubjectNumberRules(),
        tense: getClassicalNahuatlLesson5TenseRules(),
        receipt: getClassicalNahuatlLesson5ReceiptRules()
      };
    }
    function normalizeClassicalNahuatlLesson5Token(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlLesson5Stem(value = "") {
      const lesson4Normalizer = getClassicalNahuatlLesson5RuntimeTarget()?.normalizeClassicalNahuatlLesson4Stem;
      if (typeof lesson4Normalizer === "function") {
        return lesson4Normalizer(value);
      }
      return String(value == null ? "" : value).trim().replace(/^-+\s*/u, "").replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlLesson5Subject(value = "") {
      const normalized = normalizeClassicalNahuatlLesson5Token(value || "3sg").replace(/-/gu, "").replace(/\s+/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        "firstsingular": "1sg",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        "secondsingular": "2sg",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        "thirdsingular": "3sg",
        "1p": "1pl",
        "1pl": "1pl",
        "firstplural": "1pl",
        "2p": "2pl",
        "2pl": "2pl",
        "secondplural": "2pl",
        "3p": "3pl",
        "3pl": "3pl",
        "thirdplural": "3pl"
      };
      return aliases[normalized] || "3sg";
    }
    function normalizeClassicalNahuatlLesson5Mood(value = "") {
      const normalized = normalizeClassicalNahuatlLesson5Token(value || "indicative");
      if (normalized === "optative" || normalized === "optativo") {
        return "optative";
      }
      if (normalized === "admonitive" || normalized === "admonitivo") {
        return "admonitive";
      }
      return "indicative";
    }
    function normalizeClassicalNahuatlLesson5Tense(value = "", mood = "indicative") {
      const normalized = normalizeClassicalNahuatlLesson5Token(value || "");
      const aliases = {
        "": mood === "indicative" ? "present" : "nonpast",
        presente: "present",
        present: "present",
        "customary-present": "customary-present",
        customarypresent: "customary-present",
        habitual: "customary-present",
        imperfecto: "imperfect",
        imperfect: "imperfect",
        futuro: "future",
        future: "future",
        preterito: "preterit",
        "pretérito": "preterit",
        preterit: "preterit",
        "distant-past": "distant-past",
        distantpast: "distant-past",
        remoto: "distant-past",
        nonpast: "nonpast",
        "non-past": "nonpast",
        past: "past",
        pasado: "past"
      };
      const tense = aliases[normalized] || normalized || (mood === "indicative" ? "present" : "nonpast");
      if (mood === "indicative" && (tense === "nonpast" || tense === "past")) {
        return tense === "past" ? "preterit" : "present";
      }
      if (mood !== "indicative" && !["nonpast", "past"].includes(tense)) {
        return "nonpast";
      }
      return tense;
    }
    function getClassicalNahuatlLesson5TenseFrame({
      mood = "indicative",
      tense = "present",
      verbClass = ""
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson5Tense(tense, normalizedMood);
      const key = `${normalizedMood}:${normalizedTense}`;
      const base = CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS[key] || CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS["indicative:present"];
      const normalizedClass = normalizeClassicalNahuatlLesson5Token(verbClass);
      const tns = normalizedMood === "admonitive" && normalizedClass === "a" ? base.classATns || base.tns : base.tns;
      return {
        kind: "classical-nahuatl-lesson5-tense-frame",
        mood: base.mood,
        tense: base.tense,
        tns,
        condition: base.condition,
        verbClass: normalizedClass || "not-specified",
        sourceAuthority: "Andrews transcription"
      };
    }
    function getClassicalNahuatlLesson5FinalSound(value = "") {
      const normalized = normalizeClassicalNahuatlLesson5Stem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[^a-z]/gu, "");
      return normalized ? normalized.slice(-1) : "";
    }
    function isClassicalNahuatlLesson5VowelSound(sound = "") {
      return /^[aeio]$/u.test(String(sound || "").toLowerCase());
    }
    function getClassicalNahuatlLesson5StemFinalSoundKind(stem = "") {
      const finalSound = getClassicalNahuatlLesson5FinalSound(stem);
      if (!finalSound) {
        return "unknown";
      }
      return isClassicalNahuatlLesson5VowelSound(finalSound) ? "vowel" : "consonant";
    }
    function buildClassicalNahuatlLesson5IntransitiveVncFormulaFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(stem);
      const lesson4Conclusion = options.lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true;
      const lesson4IntransitiveVnc = lesson4Conclusion.authorizedFormulaId === "vnc-valence-vacant" && lesson4Conclusion.authorizedClauseKind === "verbal-nuclear-clause";
      const authorized = Boolean(!options.lesson4Frame || lesson4Authorized && lesson4IntransitiveVnc);
      return {
        kind: "classical-nahuatl-lesson5-intransitive-vnc-formula-rule-frame",
        lesson: "Andrews Lesson 5",
        section: "5.1",
        ruleLogicRole: "formula-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5FormulaRules(),
        inputRole: "stem-only",
        stem: normalizedStem,
        formulaTemplate: CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE,
        formulaRealization: realizeClassicalNahuatlLesson5Formula({
          stem: normalizedStem,
          personDyad: options.personDyad,
          tenseFrame: options.tenseFrame,
          numberDyad: options.numberDyad
        }),
        slotOrder: ["pers1", "pers2", "stem", "tns", "num1", "num2"],
        clauseKind: "verbal-nuclear-clause",
        transitivity: "intransitive",
        valencePosition: "implicit-vacant",
        consumesLesson4FrameKind: options.lesson4Frame?.kind || "",
        lesson4FormulaId: lesson4Conclusion.authorizedFormulaId || "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson5TenseRuleFrame({
      mood = "indicative",
      tense = "present",
      verbClass = "",
      tenseFrame = null
    } = {}) {
      const resolvedTenseFrame = tenseFrame || getClassicalNahuatlLesson5TenseFrame({
        mood,
        tense,
        verbClass
      });
      return {
        kind: "classical-nahuatl-lesson5-tense-rule-frame",
        lesson: "Andrews Lesson 5",
        section: "5.5",
        ruleLogicRole: "predicate-tense-slot-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5TenseRules(),
        slot: "tns",
        mood: resolvedTenseFrame.mood,
        tense: resolvedTenseFrame.tense,
        verbClass: resolvedTenseFrame.verbClass,
        tns: resolvedTenseFrame.tns,
        condition: resolvedTenseFrame.condition,
        tenseFrameKind: resolvedTenseFrame.kind,
        tnsSlotIsPredicatePosition: true,
        moodAndTenseFused: true,
        inputStemRole: "predicate-stem-locus",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson5FollowingSound(value = "") {
      const normalized = normalizeClassicalNahuatlLesson5Stem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function isClassicalNahuatlLesson5VowelSound(sound = "") {
      return /^[aeio]$/u.test(String(sound || "").toLowerCase());
    }
    function getClassicalNahuatlLesson5Pers1BaseMorph({
      subject = "3sg",
      mood = "indicative"
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const isSecondPersonOptative = normalizedMood === "optative" && (normalizedSubject === "2sg" || normalizedSubject === "2pl");
      if (normalizedSubject === "3sg" || normalizedSubject === "3pl") {
        return "0";
      }
      if (isSecondPersonOptative) {
        return "x";
      }
      if (normalizedSubject === "1sg") {
        return "n";
      }
      if (normalizedSubject === "2sg" || normalizedSubject === "1pl") {
        return "t";
      }
      return "";
    }
    function buildClassicalNahuatlLesson5Pers1SupportiveVowelFrame({
      subject = "3sg",
      mood = "indicative",
      followingSound = "",
      selectedPers1 = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const sound = String(followingSound || "").toLowerCase();
      const followsConsonant = Boolean(sound && !isClassicalNahuatlLesson5VowelSound(sound));
      const baseMorph = getClassicalNahuatlLesson5Pers1BaseMorph({
        subject: normalizedSubject,
        mood: normalizedMood
      });
      const supportable = ["n", "t", "x"].includes(baseMorph);
      const selectedMorph = selectedPers1 || (supportable && followsConsonant ? `${baseMorph}i` : baseMorph);
      const supportiveVowelPresent = Boolean(supportable && selectedMorph === `${baseMorph}i` && followsConsonant);
      const supportiveISurfaceAction = supportiveVowelPresent ? CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.INSERT : supportable && sound ? CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_NEEDED : CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_SUPPORTIVE;
      const supportiveISurfaceReason = supportiveVowelPresent ? "following-consonant-requires-support" : supportable && sound ? "following-vowel-does-not-require-support" : "not-a-supportive-i-context";
      return {
        kind: "classical-nahuatl-lesson5-pers1-supportive-vowel-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5SupportiveIRules().filter(rule => rule.slot === "phonological-support" || rule.slot === "pers1"),
        slot: "pers1",
        subject: normalizedSubject,
        mood: normalizedMood,
        baseMorph,
        selectedMorph,
        selectedCarrier: selectedMorph,
        variants: supportable ? [baseMorph, `${baseMorph}i`] : [selectedMorph || baseMorph],
        supportiveVariant: supportable ? `${baseMorph}i` : "",
        supportiveVowelPresent,
        supportiveVowel: supportiveVowelPresent ? "i" : "",
        supportiveVowelRole: supportiveVowelPresent ? "pronounceability-repair" : "not-present",
        supportiveVowelSource: supportiveVowelPresent ? "lesson-2-syllable-structure" : "",
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        followingCarrierSource: sound ? "stem" : "",
        followingSound: sound,
        followingSoundKind: sound ? isClassicalNahuatlLesson5VowelSound(sound) ? "vowel" : "consonant" : "unknown",
        environmentRule: supportiveVowelPresent ? "lesson-5.3.1-pers1-supportive-i-before-consonant" : supportable && sound ? "lesson-5.3.1-pers1-short-before-vowel" : "lesson-5.3.1-pers1-supportive-i-not-applicable"
      };
    }
    function getClassicalNahuatlLesson5Num1LeftCarrier({
      mood = "indicative",
      tense = "present",
      stem = ""
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson5Tense(tense, normalizedMood);
      if (normalizedMood === "indicative" && normalizedTense === "future") {
        return {
          source: "tns",
          carrier: "z",
          sound: "z",
          soundKind: "consonant"
        };
      }
      const stemFinalSound = getClassicalNahuatlLesson5FinalSound(stem);
      return {
        source: stemFinalSound ? "stem" : "",
        carrier: normalizeClassicalNahuatlLesson5Stem(stem),
        sound: stemFinalSound,
        soundKind: stemFinalSound ? isClassicalNahuatlLesson5VowelSound(stemFinalSound) ? "vowel" : "consonant" : "unknown"
      };
    }
    function buildClassicalNahuatlLesson5Num1SupportiveVowelFrame({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      stem = "",
      numberDyad = null
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson5Tense(tense, normalizedMood);
      const resolvedNumberDyad = numberDyad || {};
      const selectedMorph = resolvedNumberDyad.num1 || "0";
      const variants = Array.isArray(resolvedNumberDyad.num1Variants) ? Array.from(resolvedNumberDyad.num1Variants) : [selectedMorph];
      const inKFamily = variants.some(variant => ["c", "qu", "qui", CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO].includes(variant)) && normalizedMood === "indicative" && (normalizedTense === "future" || normalizedTense === "preterit");
      const leftCarrier = getClassicalNahuatlLesson5Num1LeftCarrier({
        mood: normalizedMood,
        tense: normalizedTense,
        stem
      });
      const supportiveVowelPresent = inKFamily && selectedMorph === "qui";
      const supportiveVowelSuppressedBySquareZero = inKFamily && selectedMorph === CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO && variants.includes("qui");
      const supportiveISurfaceAction = supportiveVowelPresent ? CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.INSERT : supportiveVowelSuppressedBySquareZero ? CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.SUPPRESS : inKFamily ? CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_NEEDED : CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_SUPPORTIVE;
      const supportiveISurfaceReason = supportiveVowelPresent ? "k-morph-before-consonant-requires-support" : supportiveVowelSuppressedBySquareZero ? "square-zero-replaces-supportive-qui" : inKFamily ? "regular-k-spelling-has-sufficient-vowel-boundary" : "not-a-supportive-i-context";
      return {
        kind: "classical-nahuatl-lesson5-num1-supportive-vowel-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5SupportiveIRules().filter(rule => rule.slot === "phonological-support" || rule.slot === "num1"),
        slot: "num1",
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        morpheme: inKFamily ? "/k/" : "",
        regularMorph: inKFamily ? "[k]" : "",
        baseMorphSpelling: inKFamily ? selectedMorph === "qui" || selectedMorph === CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO ? "qu" : selectedMorph : selectedMorph,
        selectedMorph,
        selectedCarrier: selectedMorph,
        variants,
        spellingVariants: inKFamily ? ["c", "qu"] : [],
        supportiveVariant: inKFamily ? "qui" : "",
        supportiveVowelPresent,
        supportiveVowel: supportiveVowelPresent ? "i" : "",
        supportiveVowelRole: supportiveVowelPresent ? "pronounceability-repair" : "not-present",
        supportiveVowelSource: supportiveVowelPresent ? "lesson-2-syllable-structure" : "",
        supportiveVowelSuppressedBySquareZero,
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        leftCarrierSource: leftCarrier.source,
        leftCarrier: leftCarrier.carrier,
        leftSound: leftCarrier.sound,
        leftSoundKind: leftCarrier.soundKind,
        environmentRule: !inKFamily ? "lesson-5.3.3-num1-supportive-i-not-applicable" : supportiveVowelPresent ? "lesson-5.3.3b-qui-supportive-i-after-consonant" : supportiveVowelSuppressedBySquareZero ? "lesson-5.3.3c-square-zero-replaces-supportive-qui" : selectedMorph === "qu" ? "lesson-5.3.3a-qu-before-plural-eh" : "lesson-5.3.3b-c-regular-k-after-vowel"
      };
    }
    function getClassicalNahuatlLesson5Pers1Variant({
      subject = "3sg",
      mood = "indicative",
      followingSound = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const sound = String(followingSound || "").toLowerCase();
      const followsConsonant = Boolean(sound && !isClassicalNahuatlLesson5VowelSound(sound));
      const isSecondPersonOptative = normalizedMood === "optative" && (normalizedSubject === "2sg" || normalizedSubject === "2pl");
      const withSupportiveVowelFrame = frame => {
        const supportiveVowelFrame = buildClassicalNahuatlLesson5Pers1SupportiveVowelFrame({
          subject: normalizedSubject,
          mood: normalizedMood,
          followingSound: sound,
          selectedPers1: frame.pers1
        });
        return {
          ...frame,
          baseMorph: supportiveVowelFrame.baseMorph,
          supportiveVowelPresent: supportiveVowelFrame.supportiveVowelPresent,
          supportiveVowel: supportiveVowelFrame.supportiveVowel,
          supportiveISurfacePolicy: supportiveVowelFrame.supportiveISurfacePolicy,
          supportiveISurfaceAction: supportiveVowelFrame.supportiveISurfaceAction,
          supportiveISurfaceReason: supportiveVowelFrame.supportiveISurfaceReason,
          supportiveIIsOnlyAdditionOrDeletion: supportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
          followingCarrierSource: supportiveVowelFrame.followingCarrierSource,
          followingSound: supportiveVowelFrame.followingSound,
          supportiveVowelFrame
        };
      };
      if (normalizedSubject === "3sg" || normalizedSubject === "3pl") {
        return withSupportiveVowelFrame({
          pers1: "0",
          variants: ["0"],
          variantRule: "third-person-zero"
        });
      }
      if (isSecondPersonOptative) {
        return withSupportiveVowelFrame({
          pers1: followsConsonant ? "xi" : "x",
          variants: ["x", "xi"],
          variantRule: followsConsonant ? "lesson-5.3.1-pers1-supportive-i-before-consonant" : "lesson-5.3.1-pers1-short-before-vowel"
        });
      }
      if (normalizedSubject === "1sg") {
        return withSupportiveVowelFrame({
          pers1: followsConsonant ? "ni" : "n",
          variants: ["n", "ni"],
          variantRule: followsConsonant ? "lesson-5.3.1-pers1-supportive-i-before-consonant" : "lesson-5.3.1-pers1-short-before-vowel"
        });
      }
      if (normalizedSubject === "2sg" || normalizedSubject === "1pl") {
        return withSupportiveVowelFrame({
          pers1: followsConsonant ? "ti" : "t",
          variants: ["t", "ti"],
          variantRule: followsConsonant ? "lesson-5.3.1-pers1-supportive-i-before-consonant" : "lesson-5.3.1-pers1-short-before-vowel"
        });
      }
      if (normalizedSubject === "2pl") {
        const usesAm = isClassicalNahuatlLesson5VowelSound(sound) || sound === "m" || sound === "p";
        if (sound === "z" || sound === "x") {
          return withSupportiveVowelFrame({
            pers1: `a${sound}`,
            variants: ["am", "an", "az", "ax"],
            variantRule: `nasal-assimilation-before-${sound}`
          });
        }
        return withSupportiveVowelFrame({
          pers1: usesAm ? "am" : "an",
          variants: ["am", "an", "az", "ax"],
          variantRule: usesAm ? "am-before-vowel-m-p" : "nasal-assimilation-default"
        });
      }
      return withSupportiveVowelFrame({
        pers1: "0",
        variants: ["0"],
        variantRule: "fallback-zero"
      });
    }
    function getClassicalNahuatlLesson5PersonDyad(subject = "3sg", mood = "indicative", options = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const followingSound = getClassicalNahuatlLesson5FollowingSound(options.followingMaterial || options.stem || "");
      const isSecondPersonOptative = normalizedMood === "optative" && (normalizedSubject === "2sg" || normalizedSubject === "2pl");
      const pers1Variant = getClassicalNahuatlLesson5Pers1Variant({
        subject: normalizedSubject,
        mood: normalizedMood,
        followingSound
      });
      return {
        kind: "classical-nahuatl-lesson5-person-dyad-frame",
        subject: normalizedSubject,
        pers1: pers1Variant.pers1,
        pers2: "0",
        mood: normalizedMood,
        optativeSecondPersonUsesX: isSecondPersonOptative,
        pers1Variants: pers1Variant.variants,
        pers1VariantRule: pers1Variant.variantRule,
        pers1BaseMorph: pers1Variant.baseMorph,
        pers1SupportiveVowelPresent: pers1Variant.supportiveVowelPresent === true,
        pers1SupportiveVowel: pers1Variant.supportiveVowel || "",
        pers1SupportiveISurfacePolicy: pers1Variant.supportiveISurfacePolicy || "",
        pers1SupportiveISurfaceAction: pers1Variant.supportiveISurfaceAction || "",
        pers1SupportiveISurfaceReason: pers1Variant.supportiveISurfaceReason || "",
        pers1SupportiveIIsOnlyAdditionOrDeletion: pers1Variant.supportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        pers1FollowingCarrierSource: pers1Variant.followingCarrierSource || "",
        pers1SupportiveVowelFrame: pers1Variant.supportiveVowelFrame,
        followingSound,
        sourceAuthority: "Andrews transcription"
      };
    }
    function buildClassicalNahuatlLesson5SubjectPersonRuleFrame({
      subject = "3sg",
      mood = "indicative",
      stem = "",
      personDyad = null
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const resolvedPersonDyad = personDyad || getClassicalNahuatlLesson5PersonDyad(normalizedSubject, normalizedMood, {
        stem
      });
      return {
        kind: "classical-nahuatl-lesson5-subject-person-rule-frame",
        lesson: "Andrews Lesson 5",
        section: "5.2-5.3.2",
        ruleLogicRole: "subject-person-case-slot-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5SubjectPersonRules().concat(getClassicalNahuatlLesson5SupportiveIRules().filter(rule => rule.slot === "phonological-support" || rule.slot === "pers1")),
        subject: normalizedSubject,
        mood: normalizedMood,
        personFeatureLocus: "pers1",
        caseFeatureLocus: "pers2",
        caseFeature: "nominative",
        personDyadKind: resolvedPersonDyad.kind,
        pers1: resolvedPersonDyad.pers1,
        pers2: resolvedPersonDyad.pers2,
        pers1Variants: resolvedPersonDyad.pers1Variants,
        pers1VariantRule: resolvedPersonDyad.pers1VariantRule,
        pers1BaseMorph: resolvedPersonDyad.pers1BaseMorph || "",
        pers1SupportiveVowelPresent: resolvedPersonDyad.pers1SupportiveVowelPresent === true,
        pers1SupportiveVowel: resolvedPersonDyad.pers1SupportiveVowel || "",
        pers1SupportiveISurfacePolicy: resolvedPersonDyad.pers1SupportiveISurfacePolicy || "",
        pers1SupportiveISurfaceAction: resolvedPersonDyad.pers1SupportiveISurfaceAction || "",
        pers1SupportiveISurfaceReason: resolvedPersonDyad.pers1SupportiveISurfaceReason || "",
        pers1SupportiveIIsOnlyAdditionOrDeletion: resolvedPersonDyad.pers1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        pers1FollowingCarrierSource: resolvedPersonDyad.pers1FollowingCarrierSource || "",
        pers1SupportiveVowelFrame: resolvedPersonDyad.pers1SupportiveVowelFrame || null,
        followingSound: resolvedPersonDyad.followingSound,
        optativeSecondPersonUsesX: resolvedPersonDyad.optativeSecondPersonUsesX,
        dependsOnNum2ForTtiAmbiguity: resolvedPersonDyad.pers1Variants?.includes("t") === true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson5NumberDyad({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      stem = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson5Tense(tense, normalizedMood);
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(stem);
      const stemFinalSound = getClassicalNahuatlLesson5FinalSound(normalizedStem);
      const stemFinalSoundKind = getClassicalNahuatlLesson5StemFinalSoundKind(normalizedStem);
      const isPlural = normalizedSubject.endsWith("pl");
      let num1 = "0";
      let num2 = isPlural ? "h" : "0";
      let condition = "main-indicative";
      let num1Variants = ["0"];
      let num2Variants = isPlural ? ["h"] : ["0"];
      let num1VariantRule = "lesson-5.3.3-main-indicative-zero";
      let num1VariantNote = "5.3.3: main indicative num1 is 0.";
      let alternateNumberDyads = [];
      if (normalizedMood === "indicative" && normalizedTense === "future") {
        condition = "future-preterit-indicative";
        num1 = isPlural ? "qu" : CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO;
        num2 = isPlural ? "eh" : "0";
        num1Variants = isPlural ? ["qu"] : [CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO, "qui"];
        num2Variants = isPlural ? ["eh"] : ["0"];
        num1VariantRule = isPlural ? "lesson-5.3.3a-qu-before-plural-eh" : "lesson-5.3.3c-square-zero-replaces-obsolescent-qui";
        num1VariantNote = isPlural ? "5.3.3a: plural future indicative uses qu before eh." : `5.3.3c: singular future indicative uses ${CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO}-0; qui-0 is obsolescent.`;
        alternateNumberDyads = isPlural ? [] : ["qui-0"];
      } else if (normalizedMood === "indicative" && normalizedTense === "preterit") {
        condition = "future-preterit-indicative";
        const singularAfterVowel = stemFinalSoundKind === "vowel";
        num1 = isPlural ? "qu" : singularAfterVowel ? "c" : CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO;
        num2 = isPlural ? "eh" : "0";
        num1Variants = isPlural ? ["qu"] : singularAfterVowel ? ["c"] : [CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO, "qui"];
        num2Variants = isPlural ? ["eh"] : ["0"];
        num1VariantRule = isPlural ? "lesson-5.3.3a-qu-before-plural-eh" : singularAfterVowel ? "lesson-5.3.3b-c-after-vowel" : "lesson-5.3.3b-qui-after-consonant-5.3.3c-square-zero";
        num1VariantNote = isPlural ? "5.3.3a: plural preterit indicative uses qu before eh." : singularAfterVowel ? "5.3.3b: singular preterit indicative uses c after a vowel-final predicate." : `5.3.3b-c: singular preterit indicative uses qui after a consonant-final predicate; ${CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO} replaces qui in regular use.`;
        alternateNumberDyads = isPlural ? [] : singularAfterVowel ? [] : ["qui-0"];
      } else if (normalizedMood === "optative" && normalizedTense === "nonpast") {
        condition = "nonpast-optative";
        num1 = isPlural ? "c" : CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO;
        num2 = isPlural ? "an" : "0";
        num1Variants = isPlural ? ["c"] : [CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO];
        num2Variants = isPlural ? ["an"] : ["0"];
        num1VariantRule = isPlural ? "lesson-5.3.3-nonpast-optative-c-an" : "lesson-5.3.3-nonpast-optative-singular-square-zero";
        num1VariantNote = isPlural ? "5.3.3: plural nonpast optative uses c-an." : `5.3.3: singular nonpast optative uses ${CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO}-0.`;
      } else if (normalizedMood === "admonitive") {
        condition = "nonpast-admonitive";
        num1 = isPlural ? "t" : CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO;
        num2 = isPlural ? "in" : "0";
        num1Variants = isPlural ? ["t"] : [CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO];
        num2Variants = isPlural ? ["in", "ih"] : ["0"];
        num1VariantRule = isPlural ? "lesson-5.3.3-nonpast-admonitive-t-in" : "lesson-5.3.3-nonpast-admonitive-square-zero";
        num1VariantNote = isPlural ? "5.3.3-5.3.4: plural nonpast admonitive uses t-in, with t-ih as subvariant." : `5.3.3: singular nonpast admonitive uses ${CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO}-0.`;
        alternateNumberDyads = isPlural ? ["t-ih"] : [];
      } else if (normalizedMood === "optative" && normalizedTense === "past") {
        condition = "past-optative";
        num1 = "0";
        num2 = isPlural ? "h" : "0";
        num1Variants = ["0"];
        num2Variants = isPlural ? ["h"] : ["0"];
        num1VariantRule = "lesson-5.3.3-past-optative-zero";
        num1VariantNote = "5.3.3: past optative follows the main indicative number connector.";
      }
      const num1SupportiveVowelFrame = buildClassicalNahuatlLesson5Num1SupportiveVowelFrame({
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        stem: normalizedStem,
        numberDyad: {
          num1,
          num2,
          num1Variants
        }
      });
      return {
        kind: "classical-nahuatl-lesson5-number-dyad-frame",
        subject: normalizedSubject,
        conditioningStem: normalizedStem,
        stemFinalSound,
        stemFinalSoundKind,
        num1,
        num2,
        condition,
        num1Variants,
        num2Variants,
        num1VariantRule,
        num1VariantNote,
        alternateNumberDyads,
        num1BaseMorphSpelling: num1SupportiveVowelFrame.baseMorphSpelling,
        num1SupportiveVowelPresent: num1SupportiveVowelFrame.supportiveVowelPresent,
        num1SupportiveVowel: num1SupportiveVowelFrame.supportiveVowel,
        num1SupportiveVowelSuppressedBySquareZero: num1SupportiveVowelFrame.supportiveVowelSuppressedBySquareZero,
        num1SupportiveISurfacePolicy: num1SupportiveVowelFrame.supportiveISurfacePolicy,
        num1SupportiveISurfaceAction: num1SupportiveVowelFrame.supportiveISurfaceAction,
        num1SupportiveISurfaceReason: num1SupportiveVowelFrame.supportiveISurfaceReason,
        num1SupportiveIIsOnlyAdditionOrDeletion: num1SupportiveVowelFrame.supportiveIIsOnlyAdditionOrDeletion,
        num1LeftCarrierSource: num1SupportiveVowelFrame.leftCarrierSource,
        num1LeftSound: num1SupportiveVowelFrame.leftSound,
        num1SupportiveVowelFrame,
        andrewsSection: "5.3.3",
        sourceAuthority: "Andrews transcription"
      };
    }
    function buildClassicalNahuatlLesson5SubjectNumberRuleFrame({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      stem = "",
      numberDyad = null
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson5Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson5Tense(tense, normalizedMood);
      const resolvedNumberDyad = numberDyad || getClassicalNahuatlLesson5NumberDyad({
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        stem
      });
      return {
        kind: "classical-nahuatl-lesson5-subject-number-rule-frame",
        lesson: "Andrews Lesson 5",
        section: "5.3.3-5.4",
        ruleLogicRole: "subject-number-slot-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5SubjectNumberRules().concat(getClassicalNahuatlLesson5SupportiveIRules().filter(rule => rule.slot === "phonological-support" || rule.slot === "num1")),
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        numberFeatureLocus: "num2",
        numberConnectorLocus: "num1",
        numberDyadKind: resolvedNumberDyad.kind,
        conditioningStem: resolvedNumberDyad.conditioningStem,
        stemFinalSound: resolvedNumberDyad.stemFinalSound,
        stemFinalSoundKind: resolvedNumberDyad.stemFinalSoundKind,
        num1: resolvedNumberDyad.num1,
        num2: resolvedNumberDyad.num2,
        num1Variants: resolvedNumberDyad.num1Variants,
        num2Variants: resolvedNumberDyad.num2Variants,
        num1VariantRule: resolvedNumberDyad.num1VariantRule,
        num1VariantNote: resolvedNumberDyad.num1VariantNote,
        alternateNumberDyads: resolvedNumberDyad.alternateNumberDyads,
        num1BaseMorphSpelling: resolvedNumberDyad.num1BaseMorphSpelling || "",
        num1SupportiveVowelPresent: resolvedNumberDyad.num1SupportiveVowelPresent === true,
        num1SupportiveVowel: resolvedNumberDyad.num1SupportiveVowel || "",
        num1SupportiveVowelSuppressedBySquareZero: resolvedNumberDyad.num1SupportiveVowelSuppressedBySquareZero === true,
        num1SupportiveISurfacePolicy: resolvedNumberDyad.num1SupportiveISurfacePolicy || "",
        num1SupportiveISurfaceAction: resolvedNumberDyad.num1SupportiveISurfaceAction || "",
        num1SupportiveISurfaceReason: resolvedNumberDyad.num1SupportiveISurfaceReason || "",
        num1SupportiveIIsOnlyAdditionOrDeletion: resolvedNumberDyad.num1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        num1LeftCarrierSource: resolvedNumberDyad.num1LeftCarrierSource || "",
        num1LeftSound: resolvedNumberDyad.num1LeftSound || "",
        num1SupportiveVowelFrame: resolvedNumberDyad.num1SupportiveVowelFrame || null,
        squareZeroCodePoint: resolvedNumberDyad.num1 === CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO ? "U+2395" : "",
        dyadRemainsSubjectConnector: true,
        tenseMorphDoesNotOwnNum1: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson5SubjectOptions(mood = "indicative", options = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson5Mood(mood);
      return CLASSICAL_NAHUATL_LESSON5_SUBJECTS.map(subject => {
        const personDyad = getClassicalNahuatlLesson5PersonDyad(subject, normalizedMood, options);
        return {
          id: subject,
          label: `${subject} ${personDyad.pers1}-0`,
          pers1: personDyad.pers1,
          pers2: personDyad.pers2,
          mood: normalizedMood,
          variantRule: personDyad.pers1VariantRule,
          outputSlot: "pers1-pers2",
          sourceAuthority: "Andrews transcription"
        };
      });
    }
    function getClassicalNahuatlLesson5TenseOptions({
      verbClass = ""
    } = {}) {
      return Object.keys(CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS).map(id => {
        const [mood, tense] = id.split(":");
        const tenseFrame = getClassicalNahuatlLesson5TenseFrame({
          mood,
          tense,
          verbClass
        });
        return {
          id,
          label: `${tenseFrame.mood} ${tenseFrame.tense}`,
          mood: tenseFrame.mood,
          tense: tenseFrame.tense,
          tns: tenseFrame.tns,
          outputSlot: "tns",
          sourceAuthority: "Andrews transcription"
        };
      });
    }
    function realizeClassicalNahuatlLesson5Formula({
      stem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(stem);
      return `#${personDyad?.pers1 || "0"}-${personDyad?.pers2 || "0"}(${normalizedStem || "STEM"})${tenseFrame?.tns || "0"}+${numberDyad?.num1 || "0"}-${numberDyad?.num2 || "0"}#`;
    }
    function buildClassicalNahuatlLesson5ReceiptInventory({
      stem = "",
      verbClass = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(stem);
      const formulas = [];
      Object.keys(CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS).forEach(tenseKey => {
        const [mood, tense] = tenseKey.split(":");
        CLASSICAL_NAHUATL_LESSON5_SUBJECTS.forEach(subject => {
          const personDyad = getClassicalNahuatlLesson5PersonDyad(subject, mood, {
            stem: normalizedStem
          });
          const tenseFrame = getClassicalNahuatlLesson5TenseFrame({
            mood,
            tense,
            verbClass
          });
          const numberDyad = getClassicalNahuatlLesson5NumberDyad({
            subject,
            mood,
            tense,
            stem: normalizedStem
          });
          formulas.push({
            subject,
            mood,
            tense,
            formula: realizeClassicalNahuatlLesson5Formula({
              stem: normalizedStem,
              personDyad,
              tenseFrame,
              numberDyad
            }),
            slotSummary: {
              person: `${personDyad.pers1}-${personDyad.pers2}`,
              tense: tenseFrame.tns,
              number: `${numberDyad.num1}-${numberDyad.num2}`
            }
          });
        });
      });
      return {
        kind: "classical-nahuatl-lesson5-display-receipt-inventory",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS],
        formulaCount: formulas.length,
        formulas
      };
    }
    function buildClassicalNahuatlLesson5SelectedOutputLogicFrame({
      proofFrame = null,
      inputStem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      formulaRuleFrame = null,
      subjectPersonRuleFrame = null,
      tenseRuleFrame = null,
      subjectNumberRuleFrame = null
    } = {}) {
      const authorized = proofFrame?.conclusion?.authorized === true;
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(inputStem);
      const selectedFormula = authorized ? proofFrame.conclusion.formulaRealization : "";
      const outputFillers = authorized ? {
        pers1: personDyad?.pers1 || "",
        pers2: personDyad?.pers2 || "",
        pers1VariantRule: personDyad?.pers1VariantRule || "",
        pers1BaseMorph: personDyad?.pers1BaseMorph || "",
        pers1SupportiveVowelPresent: personDyad?.pers1SupportiveVowelPresent === true,
        pers1SupportiveVowel: personDyad?.pers1SupportiveVowel || "",
        pers1SupportiveISurfacePolicy: personDyad?.pers1SupportiveISurfacePolicy || "",
        pers1SupportiveISurfaceAction: personDyad?.pers1SupportiveISurfaceAction || "",
        pers1SupportiveISurfaceReason: personDyad?.pers1SupportiveISurfaceReason || "",
        pers1SupportiveIIsOnlyAdditionOrDeletion: personDyad?.pers1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        pers1FollowingCarrierSource: personDyad?.pers1FollowingCarrierSource || "",
        followingSound: personDyad?.followingSound || "",
        tns: tenseFrame?.tns || "",
        num1: numberDyad?.num1 || "",
        num2: numberDyad?.num2 || "",
        num1VariantRule: numberDyad?.num1VariantRule || "",
        num1VariantNote: numberDyad?.num1VariantNote || "",
        num1BaseMorphSpelling: numberDyad?.num1BaseMorphSpelling || "",
        num1SupportiveVowelPresent: numberDyad?.num1SupportiveVowelPresent === true,
        num1SupportiveVowel: numberDyad?.num1SupportiveVowel || "",
        num1SupportiveVowelSuppressedBySquareZero: numberDyad?.num1SupportiveVowelSuppressedBySquareZero === true,
        num1SupportiveISurfacePolicy: numberDyad?.num1SupportiveISurfacePolicy || "",
        num1SupportiveISurfaceAction: numberDyad?.num1SupportiveISurfaceAction || "",
        num1SupportiveISurfaceReason: numberDyad?.num1SupportiveISurfaceReason || "",
        num1SupportiveIIsOnlyAdditionOrDeletion: numberDyad?.num1SupportiveIIsOnlyAdditionOrDeletion === false ? false : null,
        num1LeftCarrierSource: numberDyad?.num1LeftCarrierSource || "",
        num1LeftSound: numberDyad?.num1LeftSound || "",
        numberConditioningStem: numberDyad?.conditioningStem || "",
        numberStemFinalSound: numberDyad?.stemFinalSound || "",
        numberStemFinalSoundKind: numberDyad?.stemFinalSoundKind || ""
      } : {};
      return {
        kind: "classical-nahuatl-lesson5-selected-output-logic-frame",
        lesson: "Andrews Lesson 5",
        logicRole: "selected-output-logic",
        sourceAuthority: "Andrews transcription",
        derivedFrom: proofFrame?.kind || "classical-nahuatl-lesson5-logic-proof-frame",
        authorizationStatus: authorized ? "authorized" : "blocked",
        inputRole: "stem-only",
        inputStem: normalizedStem,
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS],
        selectedFormulaRole: authorized ? "selected-output-instance" : "",
        selectedFormula,
        outputFillers,
        ruleFrameKinds: authorized ? [formulaRuleFrame?.kind || "", subjectPersonRuleFrame?.kind || "", tenseRuleFrame?.kind || "", subjectNumberRuleFrame?.kind || ""].filter(Boolean) : [],
        legalWitnessTagIds: authorized ? Array.from(new Set([...(formulaRuleFrame?.ruleRefs || []), ...(subjectPersonRuleFrame?.ruleRefs || []), ...(tenseRuleFrame?.ruleRefs || []), ...(subjectNumberRuleFrame?.ruleRefs || [])].map(rule => rule.tagId).filter(Boolean))) : [],
        selectedSubject: authorized ? personDyad?.subject || "" : "",
        selectedMood: authorized ? tenseFrame?.mood || "" : "",
        selectedTense: authorized ? tenseFrame?.tense || "" : "",
        steps: authorized ? [{
          layer: "input-stem",
          role: "input",
          value: normalizedStem
        }, {
          layer: "subject-person-dyad",
          role: "outputable",
          value: `${outputFillers.pers1}-${outputFillers.pers2}`,
          rule: outputFillers.pers1VariantRule,
          baseMorph: outputFillers.pers1BaseMorph,
          supportiveVowelPresent: outputFillers.pers1SupportiveVowelPresent,
          supportiveVowel: outputFillers.pers1SupportiveVowel,
          supportiveISurfacePolicy: outputFillers.pers1SupportiveISurfacePolicy,
          supportiveISurfaceAction: outputFillers.pers1SupportiveISurfaceAction,
          supportiveISurfaceReason: outputFillers.pers1SupportiveISurfaceReason,
          supportiveIIsOnlyAdditionOrDeletion: outputFillers.pers1SupportiveIIsOnlyAdditionOrDeletion,
          followingCarrierSource: outputFillers.pers1FollowingCarrierSource,
          followingSound: outputFillers.followingSound,
          ruleFrameKind: subjectPersonRuleFrame?.kind || ""
        }, {
          layer: "vnc-tense-slot",
          role: "outputable",
          value: outputFillers.tns,
          ruleFrameKind: tenseRuleFrame?.kind || ""
        }, {
          layer: "subject-number-dyad",
          role: "outputable",
          value: `${outputFillers.num1}-${outputFillers.num2}`,
          rule: outputFillers.num1VariantRule,
          num1BaseMorphSpelling: outputFillers.num1BaseMorphSpelling,
          supportiveVowelPresent: outputFillers.num1SupportiveVowelPresent,
          supportiveVowel: outputFillers.num1SupportiveVowel,
          supportiveVowelSuppressedBySquareZero: outputFillers.num1SupportiveVowelSuppressedBySquareZero,
          supportiveISurfacePolicy: outputFillers.num1SupportiveISurfacePolicy,
          supportiveISurfaceAction: outputFillers.num1SupportiveISurfaceAction,
          supportiveISurfaceReason: outputFillers.num1SupportiveISurfaceReason,
          supportiveIIsOnlyAdditionOrDeletion: outputFillers.num1SupportiveIIsOnlyAdditionOrDeletion,
          leftCarrierSource: outputFillers.num1LeftCarrierSource,
          leftSound: outputFillers.num1LeftSound,
          conditioningStem: outputFillers.numberConditioningStem,
          stemFinalSoundKind: outputFillers.numberStemFinalSoundKind,
          ruleFrameKind: subjectNumberRuleFrame?.kind || ""
        }] : [],
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function getClassicalNahuatlLesson5Lesson4Frame(stem = "", options = {}) {
      if (options.lesson4Frame && typeof options.lesson4Frame === "object") {
        return options.lesson4Frame;
      }
      const builder = getClassicalNahuatlLesson5RuntimeTarget()?.buildClassicalNahuatlLesson4NuclearClauseFrame;
      if (typeof builder === "function") {
        return builder(stem, {
          ...options,
          tenseMode: options.tenseMode || options.mode || "verbo",
          transitivity: options.transitivity || "intransitive"
        });
      }
      return null;
    }
    function buildClassicalNahuatlLesson5LogicProofFrame({
      lesson4Frame = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      formulaRealization = "",
      formulaRuleFrame = null,
      subjectPersonRuleFrame = null,
      tenseRuleFrame = null,
      subjectNumberRuleFrame = null
    } = {}) {
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true;
      const lesson4IntransitiveVnc = lesson4Conclusion.authorizedFormulaId === "vnc-valence-vacant" && lesson4Conclusion.authorizedClauseKind === "verbal-nuclear-clause";
      const hasTenseSlot = /\btns\b/u.test(lesson4Conclusion.authorizedFormula || lesson4Frame?.formulaTemplate || "");
      const hasNumberDyad = /\bnum1-num2\b/u.test(lesson4Conclusion.authorizedFormula || lesson4Frame?.formulaTemplate || "");
      const personDyadValid = Boolean(personDyad?.pers1 && personDyad?.pers2 === "0");
      const tenseValid = Boolean(tenseFrame?.tns != null && tenseFrame?.tns !== "");
      const numberDyadValid = Boolean(numberDyad?.num1 != null && numberDyad?.num2 != null);
      const authorized = Boolean(lesson4Authorized && lesson4IntransitiveVnc && hasTenseSlot && hasNumberDyad && personDyadValid && tenseValid && numberDyadValid);
      return {
        kind: "classical-nahuatl-lesson5-logic-proof-frame",
        lesson: "Andrews Lesson 5",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleFrameKinds: [formulaRuleFrame?.kind || "", subjectPersonRuleFrame?.kind || "", tenseRuleFrame?.kind || "", subjectNumberRuleFrame?.kind || ""].filter(Boolean),
        premises: [{
          lesson: "Andrews Lesson 4",
          layer: "prior-nuclear-clause-proof",
          rule: "Lesson 5 consumes an authorized Lesson 4 logic conclusion.",
          passed: lesson4Authorized,
          formulaId: lesson4Conclusion.authorizedFormulaId || ""
        }, {
          lesson: "Andrews Lesson 5",
          layer: "intransitive-vnc-domain",
          rule: "This Lesson 5 closest-pass applies only to intransitive VNC formulas.",
          passed: lesson4IntransitiveVnc,
          clauseKind: lesson4Conclusion.authorizedClauseKind || "",
          ruleFrameKind: formulaRuleFrame?.kind || "",
          legalWitnessTagId: "cn-l5-intransitive-vnc-formula"
        }, {
          lesson: "Andrews Lesson 5",
          layer: "subject-person-dyad",
          rule: "The subject must supply a pers1-pers2 dyad from Andrews 5.3-5.4.",
          passed: personDyadValid,
          pers1: personDyad?.pers1 || "",
          pers2: personDyad?.pers2 || "",
          pers1BaseMorph: personDyad?.pers1BaseMorph || "",
          pers1SupportiveVowelPresent: personDyad?.pers1SupportiveVowelPresent === true,
          pers1FollowingCarrierSource: personDyad?.pers1FollowingCarrierSource || "",
          followingSound: personDyad?.followingSound || "",
          ruleFrameKind: subjectPersonRuleFrame?.kind || "",
          legalWitnessTagId: "cn-l5-pers1-pers2-variants"
        }, {
          lesson: "Andrews Lesson 5",
          layer: "vnc-tense-slot",
          rule: "The VNC formula must have a tns slot and a Lesson 5 tense filler.",
          passed: hasTenseSlot && tenseValid,
          tns: tenseFrame?.tns || "",
          ruleFrameKind: tenseRuleFrame?.kind || "",
          legalWitnessTagId: "cn-l5-predicate-tense-position"
        }, {
          lesson: "Andrews Lesson 5",
          layer: "subject-number-dyad",
          rule: "The final num1-num2 dyad belongs to the subject connector.",
          passed: hasNumberDyad && numberDyadValid,
          num1: numberDyad?.num1 || "",
          num2: numberDyad?.num2 || "",
          num1BaseMorphSpelling: numberDyad?.num1BaseMorphSpelling || "",
          num1SupportiveVowelPresent: numberDyad?.num1SupportiveVowelPresent === true,
          num1SupportiveVowelSuppressedBySquareZero: numberDyad?.num1SupportiveVowelSuppressedBySquareZero === true,
          num1LeftCarrierSource: numberDyad?.num1LeftCarrierSource || "",
          num1LeftSound: numberDyad?.num1LeftSound || "",
          ruleFrameKind: subjectNumberRuleFrame?.kind || "",
          legalWitnessTagId: "cn-l5-num1-num2-variants"
        }],
        conclusion: {
          authorized,
          formulaTemplate: authorized ? CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE : "",
          formulaRealization: authorized ? formulaRealization : "",
          subject: authorized ? personDyad?.subject || "" : "",
          mood: authorized ? tenseFrame?.mood || "" : "",
          tense: authorized ? tenseFrame?.tense || "" : ""
        }
      };
    }
    function buildClassicalNahuatlLesson5DisplayReceiptFrame({
      proofFrame = null,
      formulaRealizationRecord = null,
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      receiptInventory = null,
      selectedOutputLogicFrame = null,
      receiptRuleRefs = null
    } = {}) {
      const firstFailedPremise = Array.isArray(proofFrame?.premises) ? proofFrame.premises.find(premise => premise.passed !== true) : null;
      const authorized = proofFrame?.conclusion?.authorized === true;
      const selectedFormula = authorized ? proofFrame.conclusion.formulaRealization : "";
      return {
        kind: "classical-nahuatl-lesson5-display-receipt-frame",
        lesson: "Andrews Lesson 5",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        inputRole: "stem-only",
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS],
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: Array.isArray(receiptRuleRefs) ? receiptRuleRefs.map(cloneClassicalNahuatlLesson5Rule) : getClassicalNahuatlLesson5ReceiptRules(),
        mirrorsLogicProof: proofFrame?.kind || "classical-nahuatl-lesson5-logic-proof-frame",
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
          person: `${personDyad?.pers1 || ""}-${personDyad?.pers2 || ""}`,
          tense: tenseFrame?.tns || "",
          number: `${numberDyad?.num1 || ""}-${numberDyad?.num2 || ""}`
        } : {},
        formulaRealizationRecordKind: formulaRealizationRecord?.kind || "",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson5ReceiptAuthorityFrame({
      proofFrame = null,
      selectedOutputLogicFrame = null,
      displayReceiptFrame = null
    } = {}) {
      const proofAuthorized = proofFrame?.conclusion?.authorized === true;
      const selectedOutputAuthorized = selectedOutputLogicFrame?.authorizationStatus === "authorized";
      const receiptMirrorsSelectedOutput = displayReceiptFrame?.selectedFormula === selectedOutputLogicFrame?.selectedFormula && displayReceiptFrame?.status === selectedOutputLogicFrame?.authorizationStatus;
      const receiptCanDisplay = Boolean(proofAuthorized && selectedOutputAuthorized && receiptMirrorsSelectedOutput);
      return {
        kind: "classical-nahuatl-lesson5-receipt-authority-rule-frame",
        lesson: "Andrews Lesson 5",
        section: "5.1-5.5",
        ruleLogicRole: "display-receipt-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson5ReceiptRules(),
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
    function buildClassicalNahuatlLesson5VncSubjectTenseFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson5Stem(stem);
      const mood = normalizeClassicalNahuatlLesson5Mood(options.mood || options.sentenceMood || "");
      const tense = normalizeClassicalNahuatlLesson5Tense(options.tense || options.tenseKey || "", mood);
      const subject = normalizeClassicalNahuatlLesson5Subject(options.subject || options.subjectPerson || options.subj || "");
      const lesson4Frame = getClassicalNahuatlLesson5Lesson4Frame(normalizedStem || stem, {
        ...options,
        mood,
        tense,
        subject
      });
      const personDyad = getClassicalNahuatlLesson5PersonDyad(subject, mood, {
        stem: normalizedStem
      });
      const tenseFrame = getClassicalNahuatlLesson5TenseFrame({
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const numberDyad = getClassicalNahuatlLesson5NumberDyad({
        subject,
        mood,
        tense,
        stem: normalizedStem
      });
      const formulaRealization = realizeClassicalNahuatlLesson5Formula({
        stem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad
      });
      const formulaRuleFrame = buildClassicalNahuatlLesson5IntransitiveVncFormulaFrame(normalizedStem, {
        ...options,
        lesson4Frame,
        personDyad,
        tenseFrame,
        numberDyad
      });
      const subjectPersonRuleFrame = buildClassicalNahuatlLesson5SubjectPersonRuleFrame({
        subject,
        mood,
        stem: normalizedStem,
        personDyad
      });
      const tenseRuleFrame = buildClassicalNahuatlLesson5TenseRuleFrame({
        mood,
        tense,
        verbClass: options.verbClass || options.perfectiveClass || "",
        tenseFrame
      });
      const subjectNumberRuleFrame = buildClassicalNahuatlLesson5SubjectNumberRuleFrame({
        subject,
        mood,
        tense,
        stem: normalizedStem,
        numberDyad
      });
      const proofFrame = buildClassicalNahuatlLesson5LogicProofFrame({
        lesson4Frame,
        personDyad,
        tenseFrame,
        numberDyad,
        formulaRealization,
        formulaRuleFrame,
        subjectPersonRuleFrame,
        tenseRuleFrame,
        subjectNumberRuleFrame
      });
      const formulaRealizationRecord = {
        kind: "classical-nahuatl-lesson5-formula-realization-record",
        formulaRealization: proofFrame.conclusion.formulaRealization,
        fillers: {
          pers1: proofFrame.conclusion.authorized ? personDyad.pers1 : "",
          pers2: proofFrame.conclusion.authorized ? personDyad.pers2 : "",
          stem: proofFrame.conclusion.authorized ? normalizedStem : "",
          tns: proofFrame.conclusion.authorized ? tenseFrame.tns : "",
          num1: proofFrame.conclusion.authorized ? numberDyad.num1 : "",
          num2: proofFrame.conclusion.authorized ? numberDyad.num2 : ""
        }
      };
      const vncSlotFrameBuilder = getClassicalNahuatlLesson5RuntimeTarget()?.buildClassicalNahuatlVncSlotFrame;
      const vncSlotFrame = typeof vncSlotFrameBuilder === "function" ? vncSlotFrameBuilder({
        sourceFrameKind: "classical-nahuatl-lesson5-vnc-subject-tense-machinery-frame",
        sourceAuthorizationStatus: proofFrame.conclusion.authorized ? "authorized" : "blocked",
        stem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        formulaArtifact: proofFrame.conclusion.formulaRealization
      }) : null;
      const receiptInventory = buildClassicalNahuatlLesson5ReceiptInventory({
        stem: normalizedStem,
        verbClass: options.verbClass || options.perfectiveClass || ""
      });
      const selectedOutputLogicFrame = buildClassicalNahuatlLesson5SelectedOutputLogicFrame({
        proofFrame,
        inputStem: normalizedStem,
        personDyad,
        tenseFrame,
        numberDyad,
        formulaRuleFrame,
        subjectPersonRuleFrame,
        tenseRuleFrame,
        subjectNumberRuleFrame
      });
      const displayReceiptFrame = buildClassicalNahuatlLesson5DisplayReceiptFrame({
        proofFrame,
        formulaRealizationRecord,
        personDyad,
        tenseFrame,
        numberDyad,
        receiptInventory,
        selectedOutputLogicFrame,
        receiptRuleRefs: getClassicalNahuatlLesson5ReceiptRules()
      });
      const receiptAuthorityFrame = buildClassicalNahuatlLesson5ReceiptAuthorityFrame({
        proofFrame,
        selectedOutputLogicFrame,
        displayReceiptFrame
      });
      const ruleLogicFrames = [formulaRuleFrame, subjectPersonRuleFrame, tenseRuleFrame, subjectNumberRuleFrame, receiptAuthorityFrame];
      return {
        kind: "classical-nahuatl-lesson5-vnc-subject-tense-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON5_VNC_VERSION,
        lesson: "Andrews Lesson 5",
        lessonTitle: "Verbal nuclear clauses",
        machineryScope: "vnc-subject-tense-fillers",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON5_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON5_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        stem: normalizedStem,
        subject,
        mood,
        tense,
        lesson4Frame,
        formulaRuleFrame,
        subjectPersonRuleFrame,
        tenseRuleFrame,
        subjectNumberRuleFrame,
        receiptAuthorityFrame,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame.kind),
        ruleRefs: getClassicalNahuatlLesson5RuleLogicRules(),
        personDyad,
        tenseFrame,
        numberDyad,
        formulaTemplate: CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE,
        formulaRealization,
        formulaRecord: {
          kind: "classical-nahuatl-lesson5-formula-record",
          formulaTemplate: CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE,
          slotOrder: ["pers1", "pers2", "stem", "tns", "num1", "num2"],
          sourceAuthority: "Andrews transcription"
        },
        formulaRealizationRecord,
        vncSlotFrame,
        proofFrame,
        selectedOutputLogicFrame,
        receiptInventory,
        displayReceiptFrame,
        grammarGenerationAllowed: false,
        formulaOutputAllowed: proofFrame.conclusion.authorized,
        surfaceGenerationAllowed: false,
        blocksInput: proofFrame.conclusion.authorized !== true
      };
    }
    function installClassicalNahuatlLesson5VncSubjectTenseClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLesson5FormulaRules,
        getClassicalNahuatlLesson5SubjectPersonRules,
        getClassicalNahuatlLesson5SupportiveIRules,
        getClassicalNahuatlLesson5SubjectNumberRules,
        getClassicalNahuatlLesson5TenseRules,
        getClassicalNahuatlLesson5ReceiptRules,
        getClassicalNahuatlLesson5RuleLogicRules,
        buildClassicalNahuatlLesson5Pers1SupportiveVowelFrame,
        buildClassicalNahuatlLesson5Num1SupportiveVowelFrame,
        getClassicalNahuatlLesson5PersonDyad,
        getClassicalNahuatlLesson5NumberDyad,
        getClassicalNahuatlLesson5TenseFrame,
        buildClassicalNahuatlLesson5IntransitiveVncFormulaFrame,
        buildClassicalNahuatlLesson5SubjectPersonRuleFrame,
        buildClassicalNahuatlLesson5SubjectNumberRuleFrame,
        buildClassicalNahuatlLesson5TenseRuleFrame,
        buildClassicalNahuatlLesson5ReceiptInventory,
        buildClassicalNahuatlLesson5SelectedOutputLogicFrame,
        getClassicalNahuatlLesson5SubjectOptions,
        getClassicalNahuatlLesson5TenseOptions,
        buildClassicalNahuatlLesson5LogicProofFrame,
        buildClassicalNahuatlLesson5DisplayReceiptFrame,
        buildClassicalNahuatlLesson5ReceiptAuthorityFrame,
        buildClassicalNahuatlLesson5VncSubjectTenseFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson5VncSubjectTenseClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_VNC_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_VNC_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_FORMULA_TEMPLATE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_TENSE_FILLERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUBJECTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_OUTPUTABLE_SLOTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SQUARE_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_LEGAL_WITNESS_AUTHORITY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_POLICY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_SURFACE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_FORMULA_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_FORMULA_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUBJECT_PERSON_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUBJECT_PERSON_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUPPORTIVE_I_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_SUBJECT_NUMBER_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_SUBJECT_NUMBER_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_TENSE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_TENSE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON5_RECEIPT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON5_RECEIPT_RULES; },
    });
    api.getClassicalNahuatlLesson5RuntimeTarget = getClassicalNahuatlLesson5RuntimeTarget;
    api.cloneClassicalNahuatlLesson5Rule = cloneClassicalNahuatlLesson5Rule;
    api.getClassicalNahuatlLesson5FormulaRules = getClassicalNahuatlLesson5FormulaRules;
    api.getClassicalNahuatlLesson5SubjectPersonRules = getClassicalNahuatlLesson5SubjectPersonRules;
    api.getClassicalNahuatlLesson5SupportiveIRules = getClassicalNahuatlLesson5SupportiveIRules;
    api.getClassicalNahuatlLesson5SubjectNumberRules = getClassicalNahuatlLesson5SubjectNumberRules;
    api.getClassicalNahuatlLesson5TenseRules = getClassicalNahuatlLesson5TenseRules;
    api.getClassicalNahuatlLesson5ReceiptRules = getClassicalNahuatlLesson5ReceiptRules;
    api.getClassicalNahuatlLesson5RuleLogicRules = getClassicalNahuatlLesson5RuleLogicRules;
    api.normalizeClassicalNahuatlLesson5Token = normalizeClassicalNahuatlLesson5Token;
    api.normalizeClassicalNahuatlLesson5Stem = normalizeClassicalNahuatlLesson5Stem;
    api.normalizeClassicalNahuatlLesson5Subject = normalizeClassicalNahuatlLesson5Subject;
    api.normalizeClassicalNahuatlLesson5Mood = normalizeClassicalNahuatlLesson5Mood;
    api.normalizeClassicalNahuatlLesson5Tense = normalizeClassicalNahuatlLesson5Tense;
    api.getClassicalNahuatlLesson5TenseFrame = getClassicalNahuatlLesson5TenseFrame;
    api.getClassicalNahuatlLesson5FinalSound = getClassicalNahuatlLesson5FinalSound;
    api.isClassicalNahuatlLesson5VowelSound = isClassicalNahuatlLesson5VowelSound;
    api.getClassicalNahuatlLesson5StemFinalSoundKind = getClassicalNahuatlLesson5StemFinalSoundKind;
    api.buildClassicalNahuatlLesson5IntransitiveVncFormulaFrame = buildClassicalNahuatlLesson5IntransitiveVncFormulaFrame;
    api.buildClassicalNahuatlLesson5TenseRuleFrame = buildClassicalNahuatlLesson5TenseRuleFrame;
    api.getClassicalNahuatlLesson5FollowingSound = getClassicalNahuatlLesson5FollowingSound;
    api.getClassicalNahuatlLesson5Pers1BaseMorph = getClassicalNahuatlLesson5Pers1BaseMorph;
    api.buildClassicalNahuatlLesson5Pers1SupportiveVowelFrame = buildClassicalNahuatlLesson5Pers1SupportiveVowelFrame;
    api.getClassicalNahuatlLesson5Num1LeftCarrier = getClassicalNahuatlLesson5Num1LeftCarrier;
    api.buildClassicalNahuatlLesson5Num1SupportiveVowelFrame = buildClassicalNahuatlLesson5Num1SupportiveVowelFrame;
    api.getClassicalNahuatlLesson5Pers1Variant = getClassicalNahuatlLesson5Pers1Variant;
    api.getClassicalNahuatlLesson5PersonDyad = getClassicalNahuatlLesson5PersonDyad;
    api.buildClassicalNahuatlLesson5SubjectPersonRuleFrame = buildClassicalNahuatlLesson5SubjectPersonRuleFrame;
    api.getClassicalNahuatlLesson5NumberDyad = getClassicalNahuatlLesson5NumberDyad;
    api.buildClassicalNahuatlLesson5SubjectNumberRuleFrame = buildClassicalNahuatlLesson5SubjectNumberRuleFrame;
    api.getClassicalNahuatlLesson5SubjectOptions = getClassicalNahuatlLesson5SubjectOptions;
    api.getClassicalNahuatlLesson5TenseOptions = getClassicalNahuatlLesson5TenseOptions;
    api.realizeClassicalNahuatlLesson5Formula = realizeClassicalNahuatlLesson5Formula;
    api.buildClassicalNahuatlLesson5ReceiptInventory = buildClassicalNahuatlLesson5ReceiptInventory;
    api.buildClassicalNahuatlLesson5SelectedOutputLogicFrame = buildClassicalNahuatlLesson5SelectedOutputLogicFrame;
    api.getClassicalNahuatlLesson5Lesson4Frame = getClassicalNahuatlLesson5Lesson4Frame;
    api.buildClassicalNahuatlLesson5LogicProofFrame = buildClassicalNahuatlLesson5LogicProofFrame;
    api.buildClassicalNahuatlLesson5DisplayReceiptFrame = buildClassicalNahuatlLesson5DisplayReceiptFrame;
    api.buildClassicalNahuatlLesson5ReceiptAuthorityFrame = buildClassicalNahuatlLesson5ReceiptAuthorityFrame;
    api.buildClassicalNahuatlLesson5VncSubjectTenseFrame = buildClassicalNahuatlLesson5VncSubjectTenseFrame;
    api.installClassicalNahuatlLesson5VncSubjectTenseClassicGlobals = installClassicalNahuatlLesson5VncSubjectTenseClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson5VncSubjectTenseGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson5VncSubjectTenseRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
