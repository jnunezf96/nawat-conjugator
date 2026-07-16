// Canonical modern ESM module.

export function createClassicalNahuatlLesson4NuclearClauseApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON4_NUCLEAR_CLAUSE_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON4_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON4_AUTHORITY_NOTE = "Lesson 4 authorizes nuclear-clause formula frames only; it does not authorize surface generation or Nawat/Pipil spelling.";
    const CLASSICAL_NAHUATL_LESSON4_VNC_FORMULAS = Object.freeze([Object.freeze({
      id: "vnc-valence-dyadic",
      formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
      valenceSlot: "dyadic",
      stateSlot: "not-applicable",
      tenseSlot: "present"
    }), Object.freeze({
      id: "vnc-valence-monadic",
      formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
      valenceSlot: "monadic",
      stateSlot: "not-applicable",
      tenseSlot: "present"
    }), Object.freeze({
      id: "vnc-valence-vacant",
      formula: "#pers1-pers2(STEM)tns+num1-num2#",
      valenceSlot: "vacant",
      stateSlot: "not-applicable",
      tenseSlot: "present"
    })]);
    const CLASSICAL_NAHUATL_LESSON4_NNC_FORMULAS = Object.freeze([Object.freeze({
      id: "nnc-state-dyadic",
      formula: "#pers1-pers2+st1-st2(STEM)num1-num2#",
      valenceSlot: "not-applicable",
      stateSlot: "dyadic",
      tenseSlot: "none"
    }), Object.freeze({
      id: "nnc-state-monadic",
      formula: "#pers1-pers2+st(STEM)num1-num2#",
      valenceSlot: "not-applicable",
      stateSlot: "monadic",
      tenseSlot: "none"
    }), Object.freeze({
      id: "nnc-state-vacant",
      formula: "#pers1-pers2(STEM)num1-num2#",
      valenceSlot: "not-applicable",
      stateSlot: "vacant",
      tenseSlot: "none"
    })]);
    const CLASSICAL_NAHUATL_LESSON4_FORMULA_POSITION_RULES = Object.freeze([Object.freeze({
      id: "cn-l4-41-nuclear-clause-subject-predicate",
      section: "4.1",
      lineStart: 2253,
      lineEnd: 2256,
      exactWitness: "OBLIGATORILY contain a subject\nand a predicate",
      rule: "A nuclear clause obligatorily contains subject and predicate functions."
    }), Object.freeze({
      id: "cn-l4-42-two-kinds",
      section: "4.2",
      lineStart: 2274,
      lineEnd: 2279,
      exactWitness: "There are two kinds of nuclear clauses: (1) verbal nuclear\nclauses and (2) nominal nuclear clauses.",
      rule: "Lesson 4 distinguishes verbal nuclear clauses from nominal nuclear clauses."
    }), Object.freeze({
      id: "cn-l4-43-subject-predicate-formula",
      section: "4.3",
      lineStart: 2284,
      lineEnd: 2293,
      exactWitness: "The most general statement of a nuclear-clause formula is linearly expressed as Subject +\nPredicate",
      rule: "Stage 1 formula authority is Subject + Predicate."
    }), Object.freeze({
      id: "cn-l4-44-subject-circumfix",
      section: "4.4",
      lineStart: 2294,
      lineEnd: 2299,
      exactWitness: "Subject personal pronoun in Nahuatl is a discontinuous constituent",
      rule: "Subject person is prefixal and subject number is suffixal around nonsubject constituents."
    }), Object.freeze({
      id: "cn-l4-44-nnc-predicate",
      section: "4.4",
      lineStart: 2300,
      lineEnd: 2307,
      exactWitness: "In an NNC the Predicate consists of a State position and a Stem position.",
      formulaKind: "nominal-nuclear-clause",
      rule: "The NNC predicate consists of state plus stem and has no tense slot."
    }), Object.freeze({
      id: "cn-l4-44-vnc-predicate",
      section: "4.4",
      lineStart: 2310,
      lineEnd: 2316,
      exactWitness: "The verbal Predicate consists of a Valence position, a Stem position,\nand a Tense position.",
      formulaKind: "verbal-nuclear-clause",
      rule: "The VNC predicate consists of valence plus stem plus tense."
    }), Object.freeze({
      id: "cn-l4-45-position-cardinality",
      section: "4.5",
      lineStart: 2340,
      lineEnd: 2348,
      exactWitness: "the Person and Number positions are always dyadic",
      rule: "Person and number positions are dyadic; tense is monadic; state and valence may be dyadic, monadic, or vacant."
    }), Object.freeze({
      id: "cn-l4-45-six-formulas",
      section: "4.5",
      lineStart: 2353,
      lineEnd: 2380,
      exactWitness: "These six formulas are used throughout the rest of this text.",
      rule: "The three VNC and three NNC formula frames are the reusable Lesson 4 formula inventory."
    })]);
    const CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_RULES = Object.freeze([Object.freeze({
      id: "cn-l4-46-pronouns-affixal-only",
      section: "4.6",
      lineStart: 2381,
      lineEnd: 2386,
      exactWitness: "The true personal pronouns in Nahuatl are ALWAYS affixal",
      rule: "True personal pronouns are affixal."
    }), Object.freeze({
      id: "cn-l4-46-pronouns-formula-positions-only",
      section: "4.6",
      lineStart: 2385,
      lineEnd: 2386,
      exactWitness: "occur ONLY in the\npositions established in the nuclear-clause formulas",
      rule: "Personal pronouns occur only in positions established by the nuclear-clause formulas."
    }), Object.freeze({
      id: "cn-l4-46-pronoun-categories",
      section: "4.6",
      lineStart: 2386,
      lineEnd: 2388,
      exactWitness: "person,\nanimacy, humanness, number, and case.",
      categories: Object.freeze(["person", "animacy", "humanness", "number", "case"]),
      rule: "Personal pronouns carry at least person, animacy, humanness, number, and case."
    }), Object.freeze({
      id: "cn-l4-46-no-gender",
      section: "4.6",
      lineStart: 2388,
      lineEnd: 2391,
      exactWitness: "Gender distinctions (i.e., differences based on sex)\nare totally absent from Nahuatl pronouns",
      rule: "Gender is not a Nahuatl personal-pronoun category."
    }), Object.freeze({
      id: "cn-l4-46-case-distribution",
      section: "4.6",
      lineStart: 2410,
      lineEnd: 2419,
      exactWitness: "The nominative-case pronouns occur in both VNCs and NNCs.",
      rule: "Nominative pronouns occur in both VNCs and NNCs; objective pronouns occur only in the VNC predicate; possessive pronouns occur only in the NNC predicate."
    })]);
    const CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_CASE_FRAMES = Object.freeze([Object.freeze({
      id: "nominative",
      label: "nominative",
      syntacticFunction: "subject",
      formulaRegion: "subject",
      allowedClauseKinds: Object.freeze(["verbal-nuclear-clause", "nominal-nuclear-clause"]),
      formulaSlots: Object.freeze(["pers1-pers2", "num1-num2"])
    }), Object.freeze({
      id: "objective",
      label: "objective",
      syntacticFunction: "verb-object",
      formulaRegion: "vnc-predicate",
      allowedClauseKinds: Object.freeze(["verbal-nuclear-clause"]),
      formulaSlots: Object.freeze(["va1-va2", "va"])
    }), Object.freeze({
      id: "possessive",
      label: "possessive",
      syntacticFunction: "possessor",
      formulaRegion: "nnc-predicate",
      allowedClauseKinds: Object.freeze(["nominal-nuclear-clause"]),
      formulaSlots: Object.freeze(["st1-st2", "st"])
    })]);
    function getClassicalNahuatlLesson4RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function getClassicalNahuatlLesson4ProfileWallFrame(options = {}) {
      const builder = getClassicalNahuatlLesson4RuntimeTarget()?.buildClassicalNahuatlProfileWallFrame;
      if (typeof builder === "function") {
        return builder(CLASSICAL_NAHUATL_LESSON4_PROFILE_ID, {
          sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT
        });
      }
      return {
        kind: "classical-nahuatl-profile-wall-frame",
        separationMechanism: "profile-selection",
        spellingInspection: "not-performed",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT,
        oldNawatPipilConjugatorAuthority: "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: "not-authority-for-classical-lane"
      };
    }
    function normalizeClassicalNahuatlLesson4Stem(value = "") {
      return String(value == null ? "" : value).trim().replace(/^-+\s*/u, "").replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlLesson4TenseMode(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlLesson4Transitivity(value = "") {
      const normalized = String(value == null ? "" : value).trim().toLowerCase();
      if (normalized === "transitive" || normalized === "bitransitive" || normalized === "intransitive") {
        return normalized;
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson4EntryBoard(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function cloneClassicalNahuatlLesson4Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["categories", "allowedClauseKinds", "formulaSlots"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function getClassicalNahuatlLesson4FormulaPositionRules() {
      return CLASSICAL_NAHUATL_LESSON4_FORMULA_POSITION_RULES.map(cloneClassicalNahuatlLesson4Rule);
    }
    function getClassicalNahuatlLesson4PersonalPronounRules() {
      return CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_RULES.map(cloneClassicalNahuatlLesson4Rule);
    }
    function getClassicalNahuatlLesson4PersonalPronounCaseFrames() {
      return CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_CASE_FRAMES.map(cloneClassicalNahuatlLesson4Rule);
    }
    function normalizeClassicalNahuatlLesson4NuclearClauseKind(value = "") {
      const normalized = String(value == null ? "" : value).trim().toLowerCase();
      if (normalized === "vnc" || normalized === "verbal") {
        return "verbal-nuclear-clause";
      }
      if (normalized === "nnc" || normalized === "nominal") {
        return "nominal-nuclear-clause";
      }
      if (normalized === "verbal-nuclear-clause" || normalized === "nominal-nuclear-clause") {
        return normalized;
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson4PronounCase(value = "") {
      const normalized = String(value == null ? "" : value).trim().toLowerCase();
      const aliases = {
        subject: "nominative",
        nominative: "nominative",
        object: "objective",
        objective: "objective",
        possessor: "possessive",
        possessive: "possessive"
      };
      return aliases[normalized] || "";
    }
    function normalizeClassicalNahuatlLesson4PronounPositionRole(value = "") {
      const normalized = String(value == null ? "" : value).trim().toLowerCase();
      if (normalized === "subject" || normalized === "predicate") {
        return normalized;
      }
      return "";
    }
    function resolveClassicalNahuatlLesson4FormulaId(options = {}) {
      const explicitFormulaId = String(options.formulaId || "").trim();
      if (explicitFormulaId) {
        return {
          formulaId: explicitFormulaId,
          reason: "explicit-formula-id",
          inferredNuclearClauseKind: explicitFormulaId.startsWith("vnc-") ? "verbal-nuclear-clause" : "nominal-nuclear-clause"
        };
      }
      const explicitKind = String(options.nuclearClauseKind || options.clauseKind || "").trim().toLowerCase();
      const tenseMode = normalizeClassicalNahuatlLesson4TenseMode(options.tenseMode || options.mode || "");
      const transitivity = normalizeClassicalNahuatlLesson4Transitivity(options.transitivity || "");
      const entryBoard = normalizeClassicalNahuatlLesson4EntryBoard(options.entryBoard || "");
      const stateSlot = String(options.stateSlot || options.statePosition || "").trim().toLowerCase();
      const valenceSlot = String(options.valenceSlot || options.valencePosition || "").trim().toLowerCase();
      const wantsNnc = explicitKind === "nominal-nuclear-clause" || explicitKind === "nnc" || tenseMode === "sustantivo" || tenseMode === "noun" || entryBoard === "ordinary-nnc";
      if (!wantsNnc && (explicitKind === "verbal-nuclear-clause" || explicitKind === "vnc" || tenseMode === "verbo" || tenseMode === "verb" || transitivity)) {
        if (valenceSlot === "monadic") {
          return {
            formulaId: "vnc-valence-monadic",
            reason: "verbal-valence-monadic-selection",
            inferredNuclearClauseKind: "verbal-nuclear-clause"
          };
        }
        if (transitivity === "transitive" || transitivity === "bitransitive" || valenceSlot === "dyadic") {
          return {
            formulaId: "vnc-valence-dyadic",
            reason: "verbal-transitive-selection",
            inferredNuclearClauseKind: "verbal-nuclear-clause"
          };
        }
        return {
          formulaId: "vnc-valence-vacant",
          reason: "verbal-intransitive-selection",
          inferredNuclearClauseKind: "verbal-nuclear-clause"
        };
      }
      if (stateSlot === "dyadic") {
        return {
          formulaId: "nnc-state-dyadic",
          reason: "nominal-state-dyadic-selection",
          inferredNuclearClauseKind: "nominal-nuclear-clause"
        };
      }
      if (stateSlot === "monadic" || String(options.state || "").trim().toLowerCase() === "possessive") {
        return {
          formulaId: "nnc-state-monadic",
          reason: "nominal-state-monadic-selection",
          inferredNuclearClauseKind: "nominal-nuclear-clause"
        };
      }
      return {
        formulaId: "nnc-state-vacant",
        reason: "nominal-state-vacant-default",
        inferredNuclearClauseKind: "nominal-nuclear-clause"
      };
    }
    function buildClassicalNahuatlLesson4PredicateFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson4Stem(stem);
      const stemLabel = normalizedStem || "STEM";
      const predicateKind = options.predicateKind || "nominal-predicate";
      const isVerbalPredicate = predicateKind === "verbal-predicate";
      return {
        kind: "classical-nahuatl-lesson4-predicate-frame",
        predicateKind,
        stem: normalizedStem,
        display: `(${stemLabel})`,
        legalWitnessTagId: "cn-l4-predicate-boundary",
        legalWitnessTagIds: ["cn-l4-predicate-boundary"],
        stemBoundaryPolicy: "predicate-stem-inside-parentheses",
        stateBelongsTo: isVerbalPredicate ? "not-applicable" : "predicate",
        valenceBelongsTo: isVerbalPredicate ? "verbcore" : "not-applicable",
        subjectConnectorBoundary: "outside-parentheses",
        tenseSlot: isVerbalPredicate ? "present" : "none"
      };
    }
    function realizeClassicalNahuatlLesson4Formula(template = "", stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson4Stem(stem);
      if (!normalizedStem) {
        return template;
      }
      return String(template || "").replace("(STEM)", `(${normalizedStem})`);
    }
    function buildClassicalNahuatlLesson4FormulaFrames(stem = "") {
      return [...CLASSICAL_NAHUATL_LESSON4_VNC_FORMULAS.map(formula => ({
        kind: "classical-nahuatl-lesson4-formula-frame",
        lesson: "Andrews Lesson 4",
        nuclearClauseKind: "verbal-nuclear-clause",
        predicateKind: "verbal-predicate",
        ...formula,
        formulaRealization: realizeClassicalNahuatlLesson4Formula(formula.formula, stem),
        sourceAuthority: "Andrews transcription",
        legalWitnessTagIds: ["cn-l4-vnc-nnc-selection"]
      })), ...CLASSICAL_NAHUATL_LESSON4_NNC_FORMULAS.map(formula => ({
        kind: "classical-nahuatl-lesson4-formula-frame",
        lesson: "Andrews Lesson 4",
        nuclearClauseKind: "nominal-nuclear-clause",
        predicateKind: "nominal-predicate",
        ...formula,
        formulaRealization: realizeClassicalNahuatlLesson4Formula(formula.formula, stem),
        sourceAuthority: "Andrews transcription",
        legalWitnessTagIds: ["cn-l4-vnc-nnc-selection"]
      }))];
    }
    function buildClassicalNahuatlLesson4PersonalPronounFrame(options = {}) {
      const pronounCase = normalizeClassicalNahuatlLesson4PronounCase(options.pronounCase || options.case || options.syntacticFunction || "nominative");
      const nuclearClauseKind = normalizeClassicalNahuatlLesson4NuclearClauseKind(options.nuclearClauseKind || options.clauseKind || "verbal-nuclear-clause");
      const positionRole = normalizeClassicalNahuatlLesson4PronounPositionRole(options.positionRole || options.formulaRegion || (pronounCase === "nominative" ? "subject" : "predicate"));
      const caseFrame = getClassicalNahuatlLesson4PersonalPronounCaseFrames().find(frame => frame.id === pronounCase) || null;
      const caseKnown = Boolean(caseFrame);
      const clauseKindAllowed = caseKnown && caseFrame.allowedClauseKinds.includes(nuclearClauseKind);
      const positionAllowed = pronounCase === "nominative" ? positionRole === "subject" : positionRole === "predicate";
      const requestedGender = String(options.gender || options.sex || "").trim();
      const genderFeatureAllowed = false;
      const formulaPositionAuthorized = caseKnown && Boolean(nuclearClauseKind) && clauseKindAllowed && positionAllowed;
      const authorized = formulaPositionAuthorized && !requestedGender;
      const proofStatus = authorized ? "proven" : "blocked";
      const proofFrame = {
        kind: "classical-nahuatl-lesson4-personal-pronoun-proof-frame",
        lesson: "Andrews Lesson 4",
        section: "4.6",
        sourceAuthority: "Andrews transcription",
        proofKind: "logic-proof",
        proofStatus,
        authorizationStatus: authorized ? "authorized" : "blocked",
        legalWitnessTagIds: ["cn-l4-personal-pronouns"],
        premises: [{
          layer: "affixal-only",
          rule: "The true personal pronouns in Nahuatl are always affixal.",
          passed: true,
          formType: "affixal"
        }, {
          layer: "formula-positions-only",
          rule: "Personal pronouns occur only in positions established in the nuclear-clause formulas.",
          passed: formulaPositionAuthorized,
          pronounCase,
          nuclearClauseKind,
          positionRole,
          formulaSlots: caseFrame?.formulaSlots || []
        }, {
          layer: "five-category-locus",
          rule: "Personal pronouns carry person, animacy, humanness, number, and case.",
          passed: true,
          categories: ["person", "animacy", "humanness", "number", "case"]
        }, {
          layer: "no-gender-category",
          rule: "Gender distinctions are absent from Nahuatl pronouns.",
          passed: !requestedGender,
          requestedGender,
          genderFeatureAllowed
        }, {
          layer: "case-distribution",
          rule: "Nominative occurs in both VNC and NNC; objective only in the VNC predicate; possessive only in the NNC predicate.",
          passed: caseKnown && clauseKindAllowed,
          allowedClauseKinds: caseFrame?.allowedClauseKinds || [],
          formulaRegion: caseFrame?.formulaRegion || ""
        }],
        conclusion: {
          authorized,
          pronounCase,
          nuclearClauseKind: authorized ? nuclearClauseKind : "",
          positionRole: authorized ? positionRole : "",
          formulaSlots: authorized ? caseFrame?.formulaSlots || [] : [],
          genderFeatureAllowed,
          affixalOnly: true,
          formulaPositionsOnly: true
        }
      };
      return {
        kind: "classical-nahuatl-lesson4-personal-pronoun-frame",
        version: CLASSICAL_NAHUATL_LESSON4_NUCLEAR_CLAUSE_VERSION,
        lesson: "Andrews Lesson 4",
        section: "4.6",
        machineryScope: "personal-pronoun-formula-position",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT,
        pronounCase,
        nuclearClauseKind,
        positionRole,
        caseFrame,
        featuresRequired: ["person", "animacy", "humanness", "number", "case"],
        genderFeatureAllowed,
        requestedGender,
        formulaPositionAuthorized,
        legalWitnessTagIds: ["cn-l4-personal-pronouns"],
        ruleRefs: getClassicalNahuatlLesson4PersonalPronounRules(),
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        grammarGenerationAllowed: false,
        fillerGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        authorityNote: CLASSICAL_NAHUATL_LESSON4_AUTHORITY_NOTE
      };
    }
    function buildClassicalNahuatlLesson4ProofFrame({
      input = "",
      normalizedStem = "",
      selectedFormulaFrame = null,
      selectionFrame = null,
      orthographyFrame = null,
      lesson3Frame = null,
      predicateFrame = null,
      personalPronounFrame = null
    } = {}) {
      const selectedKind = selectedFormulaFrame?.nuclearClauseKind || selectionFrame?.nuclearClauseKind || "";
      const selectedFormula = selectedFormulaFrame?.formulaRealization || selectedFormulaFrame?.formula || "";
      const invalidGraphemes = Array.isArray(orthographyFrame?.invalidGraphemes) ? orthographyFrame.invalidGraphemes : [];
      const hasStemInput = Boolean(String(normalizedStem || input || "").trim());
      const lesson2ProofAuthorized = !hasStemInput || orthographyFrame?.proofFrame?.conclusion?.authorized === true;
      const orthographyAccepted = !orthographyFrame || lesson2ProofAuthorized && orthographyFrame.blocksInput !== true && invalidGraphemes.length === 0;
      const lesson3SeparatedFromNuclearClause = lesson3Frame?.proofFrame?.conclusion?.authorizedForNuclearClause === false;
      const predicateMatchesFormula = selectedFormulaFrame?.predicateKind === predicateFrame?.predicateKind;
      const subjectOutsidePredicate = predicateFrame?.subjectConnectorBoundary === "outside-parentheses";
      const stemInsidePredicate = predicateFrame?.stemBoundaryPolicy === "predicate-stem-inside-parentheses";
      const personalPronounPositionsAuthorized = personalPronounFrame?.proofFrame?.conclusion?.authorized === true;
      const formulaAuthorized = Boolean(selectedFormulaFrame && orthographyAccepted && lesson3SeparatedFromNuclearClause && predicateMatchesFormula && subjectOutsidePredicate && stemInsidePredicate && personalPronounPositionsAuthorized);
      return {
        kind: "classical-nahuatl-lesson4-logic-proof-frame",
        lesson: "Andrews Lesson 4",
        sourceAuthority: "Andrews transcription",
        proofKind: "logic-proof",
        proofStatus: formulaAuthorized ? "proven" : "blocked",
        authorizationStatus: formulaAuthorized ? "authorized" : "blocked",
        proofDepth: "rule-chain",
        input,
        stem: normalizedStem,
        legalWitnessTagIds: ["cn-l4-nuclear-clause-stage1", "cn-l4-vnc-nnc-selection", "cn-l4-predicate-boundary", "cn-l4-personal-pronouns", "cn-l4-prior-lesson-proof-chain"],
        premises: [{
          lesson: "Andrews Lesson 2",
          layer: "orthography-pronunciation",
          rule: "Classical transcription is preserved directly inside the Classical lane.",
          passed: orthographyAccepted,
          legalWitnessTagId: "cn-l4-prior-lesson-proof-chain",
          frameKind: orthographyFrame?.kind || "classical-nahuatl-lesson2-orthography-frame",
          proofStatus: orthographyFrame?.proofFrame?.proofStatus || ""
        }, {
          lesson: "Andrews Lesson 3",
          layer: "particles",
          rule: "Particles have their own proof, and that proof cannot authorize nuclear-clause formulas.",
          passed: lesson3SeparatedFromNuclearClause,
          legalWitnessTagId: "cn-l4-prior-lesson-proof-chain",
          frameKind: lesson3Frame?.kind || "",
          proofStatus: lesson3Frame?.proofFrame?.proofStatus || "",
          particleOutputAuthorized: lesson3Frame?.proofFrame?.conclusion?.authorized === true,
          authorizedForNuclearClause: lesson3Frame?.proofFrame?.conclusion?.authorizedForNuclearClause,
          role: "separate-authority-proof"
        }, {
          lesson: "Andrews Lesson 4",
          layer: "nuclear-clause-formulas",
          rule: "A nuclear clause is subject plus predicate.",
          passed: true,
          legalWitnessTagId: "cn-l4-nuclear-clause-stage1",
          formula: "Subject + Predicate"
        }, {
          lesson: "Andrews Lesson 4",
          layer: "personal-pronouns",
          rule: "True personal pronouns are affixal and occur only in the nuclear-clause formula positions.",
          passed: personalPronounPositionsAuthorized,
          frameKind: personalPronounFrame?.kind || "",
          proofStatus: personalPronounFrame?.proofFrame?.proofStatus || "",
          pronounCase: personalPronounFrame?.pronounCase || "",
          formulaSlots: personalPronounFrame?.proofFrame?.conclusion?.formulaSlots || []
        }, {
          lesson: "Andrews Lesson 4",
          layer: "predicate-boundary",
          rule: "The predicate stem is inside parentheses and subject connectors are outside.",
          passed: stemInsidePredicate && subjectOutsidePredicate,
          legalWitnessTagId: "cn-l4-predicate-boundary",
          predicateStemBoundary: predicateFrame?.stemBoundaryPolicy || "",
          subjectConnectorBoundary: predicateFrame?.subjectConnectorBoundary || ""
        }, {
          lesson: "Andrews Lesson 4",
          layer: "formula-selection",
          rule: "The selected formula must match the proven VNC/NNC predicate kind.",
          passed: Boolean(selectedFormulaFrame && predicateMatchesFormula),
          legalWitnessTagId: "cn-l4-vnc-nnc-selection",
          selectedFormulaId: selectedFormulaFrame?.id || "",
          selectedClauseKind: selectedKind
        }],
        conclusion: {
          authorized: formulaAuthorized,
          authorizedClauseKind: formulaAuthorized ? selectedKind : "",
          authorizedFormulaId: formulaAuthorized ? selectedFormulaFrame?.id || "" : "",
          authorizedFormula: formulaAuthorized ? selectedFormula : "",
          predicateStemBoundary: "inside-parentheses",
          subjectConnectorBoundary: "outside-parentheses"
        },
        authorizedClauseKind: formulaAuthorized ? selectedKind : "",
        authorizedFormulaId: formulaAuthorized ? selectedFormulaFrame?.id || "" : "",
        authorizedFormula: formulaAuthorized ? selectedFormula : "",
        predicateStemBoundary: "inside-parentheses",
        subjectConnectorBoundary: "outside-parentheses",
        selectionInputs: {
          tenseMode: selectionFrame?.tenseMode || "",
          transitivity: selectionFrame?.transitivity || "",
          entryBoard: selectionFrame?.entryBoard || "",
          stateSlot: selectionFrame?.stateSlot || "",
          valenceSlot: selectionFrame?.valenceSlot || "",
          formulaReason: selectionFrame?.formulaReason || ""
        },
        nextLessonContract: {
          kind: "classical-nahuatl-logic-proof-contract",
          carriesForward: ["sourceProfileId", "stem", "authorizedClauseKind", "authorizedFormulaId", "authorizedFormula", "predicateStemBoundary", "subjectConnectorBoundary", "personalPronounProofStatus", "lesson2ProofStatus", "lesson3ProofStatus"],
          laterLessonsBuildOnPreviousLessons: true
        }
      };
    }
    function buildClassicalNahuatlLesson4OrganizationFrame(selectedFormulaFrame = null) {
      return {
        kind: "classical-nahuatl-lesson-organization-frame",
        activeLesson: "Andrews Lesson 4",
        organizationPolicy: "ordered-visible-layers",
        entries: [{
          lesson: "Andrews Lesson 2",
          lessonNumber: 2,
          title: "Pronunciation. Orthography",
          layer: "orthography-pronunciation",
          status: "foundation",
          statusLabel: "Foundation",
          currentRole: "Classical transcription remains direct",
          visibleInClassicalMachinery: true
        }, {
          lesson: "Andrews Lesson 3",
          lessonNumber: 3,
          title: "Particles",
          layer: "particles",
          status: "organized-separate-from-nuclear-clause",
          statusLabel: "Particles",
          currentRole: "organized separately; not hidden",
          visibleInClassicalMachinery: true
        }, {
          lesson: "Andrews Lesson 4",
          lessonNumber: 4,
          title: "Nuclear Clauses",
          layer: "nuclear-clause-formulas",
          status: "active",
          statusLabel: selectedFormulaFrame?.nuclearClauseKind === "verbal-nuclear-clause" ? "Active VNC" : "Active NNC",
          currentRole: selectedFormulaFrame?.formulaRealization || selectedFormulaFrame?.formula || "",
          visibleInClassicalMachinery: true
        }]
      };
    }
    function buildClassicalNahuatlLesson4NuclearClauseFrame(stem = "", options = {}) {
      const profileWallFrame = getClassicalNahuatlLesson4ProfileWallFrame(options);
      const input = String(stem == null ? "" : stem).trim();
      const normalizedStem = normalizeClassicalNahuatlLesson4Stem(input);
      const lesson2Builder = getClassicalNahuatlLesson4RuntimeTarget()?.buildClassicalNahuatlLesson2OrthographyFrame;
      const orthographyFrame = typeof lesson2Builder === "function" ? lesson2Builder(normalizedStem || input, {
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT
      }) : null;
      const hasExplicitLesson3Frame = Object.prototype.hasOwnProperty.call(options, "lesson3Frame");
      const lesson3Builder = getClassicalNahuatlLesson4RuntimeTarget()?.buildClassicalNahuatlLesson3ParticlesFrame;
      const lesson3Frame = hasExplicitLesson3Frame ? options.lesson3Frame : typeof lesson3Builder === "function" ? lesson3Builder(normalizedStem || input, {
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT
      }) : null;
      const formulaFrames = buildClassicalNahuatlLesson4FormulaFrames(normalizedStem);
      const selectionResolution = resolveClassicalNahuatlLesson4FormulaId(options);
      const selectedFormulaId = selectionResolution.formulaId;
      const selectedFormulaFrame = formulaFrames.find(frame => frame.id === selectedFormulaId) || formulaFrames.find(frame => frame.id === "nnc-state-vacant") || null;
      const predicateFrame = buildClassicalNahuatlLesson4PredicateFrame(input, {
        predicateKind: selectedFormulaFrame?.predicateKind || "nominal-predicate"
      });
      const selectionFrame = {
        kind: "classical-nahuatl-lesson4-selection-frame",
        tenseMode: normalizeClassicalNahuatlLesson4TenseMode(options.tenseMode || options.mode || ""),
        transitivity: normalizeClassicalNahuatlLesson4Transitivity(options.transitivity || ""),
        entryBoard: normalizeClassicalNahuatlLesson4EntryBoard(options.entryBoard || ""),
        stateSlot: String(options.stateSlot || options.statePosition || "").trim().toLowerCase(),
        valenceSlot: String(options.valenceSlot || options.valencePosition || "").trim().toLowerCase(),
        formulaId: selectedFormulaFrame?.id || "",
        formulaReason: selectionResolution.reason,
        nuclearClauseKind: selectedFormulaFrame?.nuclearClauseKind || selectionResolution.inferredNuclearClauseKind
      };
      const personalPronounFrame = buildClassicalNahuatlLesson4PersonalPronounFrame({
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT,
        pronounCase: options.pronounCase || "nominative",
        nuclearClauseKind: selectedFormulaFrame?.nuclearClauseKind || selectionResolution.inferredNuclearClauseKind,
        positionRole: options.pronounPositionRole || "subject",
        gender: options.gender || ""
      });
      const proofFrame = buildClassicalNahuatlLesson4ProofFrame({
        input,
        normalizedStem,
        selectedFormulaFrame,
        selectionFrame,
        orthographyFrame,
        lesson3Frame,
        predicateFrame,
        personalPronounFrame
      });
      const diagnostics = ["classical-lesson4-nuclear-clause-formula-authority", normalizedStem ? "classical-lesson4-stem-inserted-into-formula-frame" : "classical-lesson4-formula-template-preview", selectionResolution.reason, "classical-lesson4-nawat-pipil-system-not-used"];
      return {
        kind: "classical-nahuatl-lesson4-nuclear-clause-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON4_NUCLEAR_CLAUSE_VERSION,
        lesson: "Andrews Lesson 4",
        lessonTitle: "Nuclear Clauses",
        machineryScope: "nuclear-clause-formula",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT,
        profileWallFrame,
        profileWallKind: profileWallFrame?.kind || "classical-nahuatl-profile-wall-frame",
        profileSeparationMechanism: profileWallFrame?.separationMechanism || "profile-selection",
        spellingInspection: profileWallFrame?.spellingInspection || "not-performed",
        input,
        stem: normalizedStem,
        orthographyFrame,
        lesson3Frame,
        predicateFrame,
        selectedNuclearClauseKind: selectedFormulaFrame?.nuclearClauseKind || "nominal-nuclear-clause",
        selectedFormulaId: selectedFormulaFrame?.id || "",
        selectedFormulaFrame,
        selectedFormulaReason: selectionResolution.reason,
        selectedFormulaLabel: selectedFormulaFrame?.nuclearClauseKind === "verbal-nuclear-clause" ? "Selected VNC formula" : "Selected NNC formula",
        formulaTemplate: selectedFormulaFrame?.formula || "#pers1-pers2(STEM)num1-num2#",
        formulaRealization: selectedFormulaFrame?.formulaRealization || realizeClassicalNahuatlLesson4Formula("#pers1-pers2(STEM)num1-num2#", normalizedStem),
        legalWitnessTagIds: proofFrame.legalWitnessTagIds,
        formulaPositionRuleRefs: getClassicalNahuatlLesson4FormulaPositionRules(),
        personalPronounFrame,
        personalPronounRuleRefs: getClassicalNahuatlLesson4PersonalPronounRules(),
        lessonOrganizationFrame: buildClassicalNahuatlLesson4OrganizationFrame(selectedFormulaFrame),
        proofFrame,
        formulaFrames,
        vncFormulaFrames: formulaFrames.filter(frame => frame.nuclearClauseKind === "verbal-nuclear-clause"),
        nncFormulaFrames: formulaFrames.filter(frame => frame.nuclearClauseKind === "nominal-nuclear-clause"),
        stageFrames: [{
          id: "lesson4-stage1",
          label: "Stage 1",
          formula: "Subject + Predicate",
          structure: "subject-plus-predicate",
          legalWitnessTagId: "cn-l4-nuclear-clause-stage1"
        }, {
          id: "lesson4-stage2",
          label: "Stage 2",
          formula: "#person+state(STEM)number# / #person+valence(STEM)tense+number#",
          structure: "nnc-and-vnc-predicate-slots",
          legalWitnessTagId: "cn-l4-vnc-nnc-selection"
        }, {
          id: "lesson4-stage3",
          label: "Stage 3",
          formula: selectedFormulaFrame?.formula || "#pers1-pers2(STEM)num1-num2#",
          structure: selectedFormulaFrame?.id || "subpositions-and-vacant-state-nnc",
          legalWitnessTagId: "cn-l4-vnc-nnc-selection"
        }],
        subjectFrame: {
          kind: "classical-nahuatl-lesson4-subject-frame",
          formulaRole: "subject",
          structure: "#pers1-pers2 ... num1-num2#",
          personSlot: "prefix",
          numberSlot: "suffix",
          pronounType: "affixal-personal-pronoun",
          proofFrame: personalPronounFrame.proofFrame
        },
        clauseKindFrames: [{
          id: "vnc",
          label: "Verbal nuclear clause",
          predicateSlots: ["valence", "stem", "tense"]
        }, {
          id: "nnc",
          label: "Nominal nuclear clause",
          predicateSlots: ["state", "stem"]
        }],
        selectionFrame,
        languageProfileId: CLASSICAL_NAHUATL_LESSON4_PROFILE_ID,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON4_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON4_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        oldNawatPipilConjugatorAuthority: profileWallFrame?.oldNawatPipilConjugatorAuthority || "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: profileWallFrame?.nawatPipilGrammarAuthorityForClassical || "not-authority-for-classical-lane",
        grammarGenerationAllowed: false,
        formulaOutputAllowed: true,
        surfaceGenerationAllowed: false,
        blocksInput: false,
        diagnostics,
        authorityNote: CLASSICAL_NAHUATL_LESSON4_AUTHORITY_NOTE
      };
    }
    function installClassicalNahuatlLesson4NuclearClauseClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        buildClassicalNahuatlLesson4PredicateFrame,
        getClassicalNahuatlLesson4FormulaPositionRules,
        getClassicalNahuatlLesson4PersonalPronounRules,
        getClassicalNahuatlLesson4PersonalPronounCaseFrames,
        buildClassicalNahuatlLesson4PersonalPronounFrame,
        resolveClassicalNahuatlLesson4FormulaId,
        buildClassicalNahuatlLesson4FormulaFrames,
        buildClassicalNahuatlLesson4ProofFrame,
        buildClassicalNahuatlLesson4OrganizationFrame,
        buildClassicalNahuatlLesson4NuclearClauseFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson4NuclearClauseClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_NUCLEAR_CLAUSE_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_NUCLEAR_CLAUSE_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_AUTHORITY_NOTE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_AUTHORITY_NOTE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_VNC_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_VNC_FORMULAS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_NNC_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_NNC_FORMULAS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_FORMULA_POSITION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_FORMULA_POSITION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_CASE_FRAMES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON4_PERSONAL_PRONOUN_CASE_FRAMES; },
    });
    api.getClassicalNahuatlLesson4RuntimeTarget = getClassicalNahuatlLesson4RuntimeTarget;
    api.getClassicalNahuatlLesson4ProfileWallFrame = getClassicalNahuatlLesson4ProfileWallFrame;
    api.normalizeClassicalNahuatlLesson4Stem = normalizeClassicalNahuatlLesson4Stem;
    api.normalizeClassicalNahuatlLesson4TenseMode = normalizeClassicalNahuatlLesson4TenseMode;
    api.normalizeClassicalNahuatlLesson4Transitivity = normalizeClassicalNahuatlLesson4Transitivity;
    api.normalizeClassicalNahuatlLesson4EntryBoard = normalizeClassicalNahuatlLesson4EntryBoard;
    api.cloneClassicalNahuatlLesson4Rule = cloneClassicalNahuatlLesson4Rule;
    api.getClassicalNahuatlLesson4FormulaPositionRules = getClassicalNahuatlLesson4FormulaPositionRules;
    api.getClassicalNahuatlLesson4PersonalPronounRules = getClassicalNahuatlLesson4PersonalPronounRules;
    api.getClassicalNahuatlLesson4PersonalPronounCaseFrames = getClassicalNahuatlLesson4PersonalPronounCaseFrames;
    api.normalizeClassicalNahuatlLesson4NuclearClauseKind = normalizeClassicalNahuatlLesson4NuclearClauseKind;
    api.normalizeClassicalNahuatlLesson4PronounCase = normalizeClassicalNahuatlLesson4PronounCase;
    api.normalizeClassicalNahuatlLesson4PronounPositionRole = normalizeClassicalNahuatlLesson4PronounPositionRole;
    api.resolveClassicalNahuatlLesson4FormulaId = resolveClassicalNahuatlLesson4FormulaId;
    api.buildClassicalNahuatlLesson4PredicateFrame = buildClassicalNahuatlLesson4PredicateFrame;
    api.realizeClassicalNahuatlLesson4Formula = realizeClassicalNahuatlLesson4Formula;
    api.buildClassicalNahuatlLesson4FormulaFrames = buildClassicalNahuatlLesson4FormulaFrames;
    api.buildClassicalNahuatlLesson4PersonalPronounFrame = buildClassicalNahuatlLesson4PersonalPronounFrame;
    api.buildClassicalNahuatlLesson4ProofFrame = buildClassicalNahuatlLesson4ProofFrame;
    api.buildClassicalNahuatlLesson4OrganizationFrame = buildClassicalNahuatlLesson4OrganizationFrame;
    api.buildClassicalNahuatlLesson4NuclearClauseFrame = buildClassicalNahuatlLesson4NuclearClauseFrame;
    api.installClassicalNahuatlLesson4NuclearClauseClassicGlobals = installClassicalNahuatlLesson4NuclearClauseClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson4NuclearClauseGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson4NuclearClauseApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
