// Canonical modern ESM module.

export function createClassicalNahuatlNncLayerEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_NNC_LAYER_VERSION = 1;
    const CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_NNC_ZERO = "0";
    const CLASSICAL_NAHUATL_LESSON12_RULES = Object.freeze([Object.freeze({
      id: "cn-l12-121-state-not-valence",
      section: "12.1",
      transcriptionLineStart: 4379,
      transcriptionLineEnd: 4386,
      exactWitness: "The NNC Formula Contrasted with the VNC Formula.",
      action: "replace-vnc-valence-and-tense-with-nnc-state"
    }), Object.freeze({
      id: "cn-l12-122-absolutive-formula",
      section: "12.2",
      transcriptionLineStart: 4387,
      transcriptionLineEnd: 4393,
      exactWitness: "The Absolutive-State NNC.",
      action: "build-vacant-state-nnc"
    }), Object.freeze({
      id: "cn-l12-123-subject-connectors",
      section: "12.3",
      transcriptionLineStart: 4394,
      transcriptionLineEnd: 4437,
      exactWitness: "The Subject Positions in the Absolutive-State NNC.",
      action: "select-subject-number-connector-by-state-class-and-number"
    }), Object.freeze({
      id: "cn-l12-124-subject-paradigm",
      section: "12.4",
      transcriptionLineStart: 4438,
      transcriptionLineEnd: 4483,
      exactWitness: "Summary of Subject Personal Pronouns in the Absolutive-State NNC",
      action: "build-complete-absolutive-subject-paradigm"
    }), Object.freeze({
      id: "cn-l12-125-nounstem-predicate",
      section: "12.5",
      transcriptionLineStart: 4484,
      transcriptionLineEnd: 4504,
      exactWitness: "The Predicate Position in Absolutive-State NNCs.",
      action: "keep-nounstem-predicate-tenseless-and-indefiniteness-neutral"
    }), Object.freeze({
      id: "cn-l12-126-animacy-number",
      section: "12.6",
      transcriptionLineStart: 4505,
      transcriptionLineEnd: 4560,
      exactWitness: "Animacy in Nounstems.",
      action: "keep-number-in-subject-and-gate-plural-reference-by-animacy"
    }), Object.freeze({
      id: "cn-l12-127-state-restrictions",
      section: "12.7",
      transcriptionLineStart: 4561,
      transcriptionLineEnd: 4571,
      exactWitness: "State and the Nounstem.",
      action: "allow-state-choice-subject-to-lexical-semantic-restrictions"
    })]);
    const CLASSICAL_NAHUATL_LESSON13_RULES = Object.freeze([Object.freeze({
      id: "cn-l13-131-possessive-formulas",
      section: "13.1",
      transcriptionLineStart: 4576,
      transcriptionLineEnd: 4589,
      exactWitness: "The Possessive-State NNC.",
      action: "build-monadic-or-dyadic-possessive-state"
    }), Object.freeze({
      id: "cn-l13-132-possessive-subject-number",
      section: "13.2",
      transcriptionLineStart: 4590,
      transcriptionLineEnd: 4608,
      exactWitness: "The Subject Positions in the Possessive-State Formulas.",
      action: "select-possessive-subject-number-dyad"
    }), Object.freeze({
      id: "cn-l13-133-possessive-subject-paradigm",
      section: "13.3",
      transcriptionLineStart: 4609,
      transcriptionLineEnd: 4626,
      exactWitness: "Summary of Subject Personal Pronouns in the Possessive-State NNC",
      action: "build-complete-possessive-subject-paradigm"
    }), Object.freeze({
      id: "cn-l13-134-monadic-possessor",
      section: "13.4",
      transcriptionLineStart: 4627,
      transcriptionLineEnd: 4647,
      exactWitness: "The Predicate in the Monadic Possessive-State NNC Formula.",
      action: "select-reciprocal-or-nonspecific-possessor"
    }), Object.freeze({
      id: "cn-l13-135-dyadic-possessor",
      section: "13.5",
      transcriptionLineStart: 4648,
      transcriptionLineEnd: 4671,
      exactWitness: "The Predicate in the Dyadic Possessive-State NNC Formula.",
      action: "distribute-specific-possessor-categories-across-st1-st2"
    }), Object.freeze({
      id: "cn-l13-136-specific-possessor-inventory",
      section: "13.6",
      transcriptionLineStart: 4672,
      transcriptionLineEnd: 4696,
      exactWitness: "Summary of the Specific Possessor Personal Pronouns in the Possessive-State NNC",
      action: "realize-specific-possessor-inventory"
    })]);
    const CLASSICAL_NAHUATL_LESSON14_RULES = Object.freeze([Object.freeze({
      id: "cn-l14-141-use-stem-kinds",
      section: "14.1",
      transcriptionLineStart: 4699,
      transcriptionLineEnd: 4705,
      exactWitness: "The restricted-use stem regularly is the citation form",
      action: "select-restricted-or-general-use-stem-by-state"
    }), Object.freeze({
      id: "cn-l14-142-nounstem-classes",
      section: "14.2",
      transcriptionLineStart: 4706,
      transcriptionLineEnd: 4751,
      exactWitness: "Membership in a class is not predictable and must be learned for each stem.",
      action: "keep-lexical-class-authority-distinct-from-form-guidance"
    }), Object.freeze({
      id: "cn-l14-143-affinity-distributive",
      section: "14.3",
      transcriptionLineStart: 4752,
      transcriptionLineEnd: 4824,
      exactWitness: "The Category of Number and Nounstems.",
      action: "derive-affinity-or-distributive-stem-internally-not-as-number"
    }), Object.freeze({
      id: "cn-l14-144-absolutive-common",
      section: "14.4",
      transcriptionLineStart: 4825,
      transcriptionLineEnd: 4838,
      exactWitness: "The Nounstem in Absolutive-State NNCs with a Singular/Common Subject.",
      action: "use-restricted-base-stem-with-absolutive-common-subject"
    }), Object.freeze({
      id: "cn-l14-145-absolutive-plural",
      section: "14.5",
      transcriptionLineStart: 4839,
      transcriptionLineEnd: 4931,
      exactWitness: "The Nounstem in Absolutive-State NNCs with a Plural-Number Subject.",
      action: "select-lexical-plural-stem-formation-and-number-dyad"
    }), Object.freeze({
      id: "cn-l14-146-possessive-plural",
      section: "14.6",
      transcriptionLineStart: 4932,
      transcriptionLineEnd: 4959,
      exactWitness: "Normally, however, the plain stem is used",
      action: "prefer-plain-general-use-stem-with-possessive-plural-subject"
    }), Object.freeze({
      id: "cn-l14-147-possessive-common",
      section: "14.7",
      transcriptionLineStart: 4960,
      transcriptionLineEnd: 5108,
      exactWitness: "The Nounstem in Possessive-State NNCs with a Singular/Common-Number Subject.",
      action: "select-class-subclass-general-use-shape-and-subject-connector"
    }), Object.freeze({
      id: "cn-l14-148-constituent-ambiguity",
      section: "14.8",
      transcriptionLineStart: 5109,
      transcriptionLineEnd: 5153,
      exactWitness: "one must keep one's mind open to alternative solutions",
      action: "preserve-typed-constituent-analyses-without-spelling-collapse"
    })]);
    const CLASSICAL_NAHUATL_LESSON15_RULES = Object.freeze([Object.freeze({
      id: "cn-l15-151a-huan-boundary-assimilation",
      section: "15.1.1",
      transcriptionLineStart: 5158,
      transcriptionLineEnd: 5170,
      exactWitness: "Because of the /w/ in the number dyad hu-ān",
      action: "assimilate-final-voiceless-w-or-n-before-possessive-plural-number-dyad"
    }), Object.freeze({
      id: "cn-l15-151b-possessive-suppletion",
      section: "15.1.2",
      transcriptionLineStart: 5171,
      transcriptionLineEnd: 5211,
      exactWitness: "Certain nouns use a suppletive stem to form a possessive-state NNC",
      action: "substitute-lexically-authorized-possessive-stem"
    }), Object.freeze({
      id: "cn-l15-151c-nonanimate-derived-common",
      section: "15.1.3",
      transcriptionLineStart: 5212,
      transcriptionLineEnd: 5218,
      exactWitness: "a distributive/varietal or an affinity nonanimate stem",
      action: "retain-common-subject-number-with-derived-nonanimate-stem"
    }), Object.freeze({
      id: "cn-l15-151d-possessor-reduplication",
      section: "15.1.4",
      transcriptionLineStart: 5219,
      transcriptionLineEnd: 5221,
      exactWitness: "plurality in a possessive-state NNC is indicated (at times redundantly) by a reduplication of the possessor pronoun",
      action: "reduplicate-typed-possessor-dyad"
    }), Object.freeze({
      id: "cn-l15-151e-secondary-general-use",
      section: "15.1.5",
      transcriptionLineStart: 5222,
      transcriptionLineEnd: 5254,
      exactWitness: "the possessor pronoun tē fuses with a general-use stem",
      action: "downgrade-te-possessive-predicate-to-secondary-general-use-stem"
    }), Object.freeze({
      id: "cn-l15-151f-analogical-restricted-use",
      section: "15.1.6",
      transcriptionLineStart: 5255,
      transcriptionLineEnd: 5274,
      exactWitness: "The possessive-state predicate is downgraded to the rank of a restricted-use stem",
      action: "derive-analogical-tla-restricted-use-stem"
    }), Object.freeze({
      id: "cn-l15-151g-reclassification",
      section: "15.1.7",
      transcriptionLineStart: 5275,
      transcriptionLineEnd: 5285,
      exactWitness: "A Subclass 2-A stem of the tl class may be reclassified as a Subclass 1-A stem",
      action: "reclassify-tl-2a-as-tl-1a-after-ephemeral-i-loss"
    }), Object.freeze({
      id: "cn-l15-151h-basic-possessor",
      section: "15.1.8",
      transcriptionLineStart: 5286,
      transcriptionLineEnd: 5288,
      exactWitness: "the pronominal possessor in the NNC as the nuclear or basic possessor",
      action: "identify-pronominal-possessor-as-nuclear-basic"
    }), Object.freeze({
      id: "cn-l15-152-natural-possession",
      section: "15.2",
      transcriptionLineStart: 5289,
      transcriptionLineEnd: 5335,
      exactWitness: "Naturally Possessed Nounstems.",
      action: "apply-lexical-state-availability-with-metaphorical-override"
    }), Object.freeze({
      id: "cn-l15-153-sentence-structure",
      section: "15.3",
      transcriptionLineStart: 5336,
      transcriptionLineEnd: 5371,
      exactWitness: "NNCs and Sentence Structure.",
      action: "handoff-typed-nnc-to-equative-attributive-or-adverbial-sentence-layer"
    })]);
    const CLASSICAL_NAHUATL_LESSON16_RULES = Object.freeze([Object.freeze({
      id: "cn-l16-161-pronominal-family",
      section: "16.1",
      transcriptionLineStart: 5374,
      transcriptionLineEnd: 5382,
      exactWitness: "Pronominal NNCs.",
      action: "separate-entitive-quantitive-family-and-internal-plural-n-from-subject-number"
    }), Object.freeze({
      id: "cn-l16-162-entitive-subtypes",
      section: "16.2",
      transcriptionLineStart: 5383,
      transcriptionLineEnd: 5384,
      exactWitness: "There are four subtypes of entitive pronominal NNCs",
      action: "select-personal-interrogative-indefinite-or-demonstrative-subtype"
    }), Object.freeze({
      id: "cn-l16-163-personal-pronominal",
      section: "16.3",
      transcriptionLineStart: 5385,
      transcriptionLineEnd: 5492,
      exactWitness: "Personal-pronominal NNCs.",
      action: "build-simple-or-compound-personal-pronominal-nnc"
    }), Object.freeze({
      id: "cn-l16-164-identificational-interrogative",
      section: "16.4",
      transcriptionLineStart: 5493,
      transcriptionLineEnd: 5563,
      exactWitness: "Interrogative Pronominal NNCs.",
      action: "build-identificational-interrogative-and-contextual-noninterrogative-readings"
    }), Object.freeze({
      id: "cn-l16-1643-ca-tlein-plural",
      section: "16.4.3",
      transcriptionLineStart: 5525,
      transcriptionLineEnd: 5535,
      exactWitness: "cātleimeh? = which ones are they?",
      action: "realize-final-in-as-i-before-fixed-m-eh-plural-dyad"
    }), Object.freeze({
      id: "cn-l16-165-demonstrative",
      section: "16.5",
      transcriptionLineStart: 5564,
      transcriptionLineEnd: 5584,
      exactWitness: "There are two demonstrative pronominal NNCs.",
      action: "build-invariant-third-person-demonstrative-nnc"
    }), Object.freeze({
      id: "cn-l16-166-indefinite",
      section: "16.6",
      transcriptionLineStart: 5585,
      transcriptionLineEnd: 5607,
      exactWitness: "There are two indefinite pronominal nounstems",
      action: "build-ah-matrix-indefinite-pronominal-nnc"
    }), Object.freeze({
      id: "cn-l16-167-quantitive-matrices",
      section: "16.7",
      transcriptionLineStart: 5608,
      transcriptionLineEnd: 5633,
      exactWitness: "Quantitive Pronominal NNCs.",
      action: "select-typed-quantitive-embed-matrix-and-allomorph"
    }), Object.freeze({
      id: "cn-l16-168-quich-family",
      section: "16.8",
      transcriptionLineStart: 5634,
      transcriptionLineEnd: 5673,
      exactWitness: "Quantitive Pronominal NNCs Formed on Compound Stems Ending in (-qui-ch)-Ø-.",
      action: "build-plain-plural-quich-quantitive-family"
    }), Object.freeze({
      id: "cn-l16-169-qui-chi-family",
      section: "16.9",
      transcriptionLineStart: 5674,
      transcriptionLineEnd: 5761,
      exactWitness: "Quantitive Pronominal NNCs Formed on Compound Stems Ending in (-qui)-⎕- or",
      action: "build-internal-n-qui-or-chi-quantitive-family-with-number-variants"
    })]);
    const CLASSICAL_NAHUATL_NNC_LAYER_CONTRACTS = Object.freeze([Object.freeze({
      layerId: "lesson12-absolutive-subject-state",
      rank: 120,
      consumesFrameKind: "classical-nahuatl-lesson4-nuclear-clause-machinery-frame",
      producesFrameKind: "classical-nahuatl-nnc-slot-frame",
      operation: "fill-vacant-state-subject-and-number-slots",
      leavesInputProvisional: true,
      finalizesWhenHighestActive: "selected-absolutive-nnc-formula",
      witnessRefs: Object.freeze(["cn-l12-121-state-not-valence", "cn-l12-122-absolutive-formula", "cn-l12-123-subject-connectors"])
    }), Object.freeze({
      layerId: "lesson13-possessive-state",
      rank: 130,
      consumesFrameKind: "classical-nahuatl-nnc-slot-frame",
      producesFrameKind: "classical-nahuatl-nnc-slot-frame",
      operation: "fill-possessive-state-and-subject-number-slots",
      leavesInputProvisional: true,
      finalizesWhenHighestActive: "selected-possessive-nnc-formula",
      witnessRefs: Object.freeze(["cn-l13-possessive-nnc"])
    }), Object.freeze({
      layerId: "lesson14-nounstem-class-use-shape",
      rank: 140,
      consumesFrameKind: "classical-nahuatl-nnc-slot-frame",
      producesFrameKind: "classical-nahuatl-nnc-slot-frame",
      operation: "select-use-stem-shape-class-and-derived-stem",
      leavesInputProvisional: true,
      finalizesWhenHighestActive: "selected-class-governed-nnc-formula",
      witnessRefs: Object.freeze(["cn-l14-nounstem-classes"])
    }), Object.freeze({
      layerId: "lesson15-higher-ordinary-nnc-conditions",
      rank: 150,
      consumesFrameKind: "classical-nahuatl-nnc-slot-frame",
      producesFrameKind: "classical-nahuatl-nnc-slot-frame",
      operation: "apply-higher-ordinary-nnc-conditions",
      leavesInputProvisional: false,
      finalizesWhenHighestActive: "selected-ordinary-nnc-formula",
      witnessRefs: Object.freeze(["cn-l15-further-nnc-conditions"])
    }), Object.freeze({
      layerId: "lesson16-pronominal-nnc-family",
      rank: 160,
      consumesFrameKind: "classical-nahuatl-nnc-slot-frame",
      producesFrameKind: "classical-nahuatl-nnc-slot-frame",
      operation: "select-pronominal-family-and-internal-pluralization",
      leavesInputProvisional: false,
      finalizesWhenHighestActive: "selected-pronominal-nnc-formula",
      witnessRefs: Object.freeze(["cn-l16-pronominal-nncs"])
    })]);
    function getClassicalNahuatlNncRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function cloneClassicalNahuatlNncValue(value) {
      if (Array.isArray(value)) {
        return value.map(cloneClassicalNahuatlNncValue);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlNncValue(entry)]));
    }
    function normalizeClassicalNahuatlNncToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlNncStem(value = "") {
      return normalizeClassicalNahuatlNncToken(value).replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlNncSubject(value = "3sg") {
      const key = normalizeClassicalNahuatlNncToken(value || "3sg").toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        firstsingular: "1sg",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        secondsingular: "2sg",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        thirdsingular: "3sg",
        common: "3common",
        "3common": "3common",
        thirdcommon: "3common",
        "1p": "1pl",
        "1pl": "1pl",
        firstplural: "1pl",
        "2p": "2pl",
        "2pl": "2pl",
        secondplural: "2pl",
        "3p": "3pl",
        "3pl": "3pl",
        thirdplural: "3pl"
      };
      return aliases[key] || "";
    }
    function normalizeClassicalNahuatlNounClass(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        tl: "tl",
        ti: "tl",
        tliclass: "tli",
        tli: "tli",
        li: "tli",
        in: "in",
        inclass: "in",
        zero: "zero",
        "0": "zero",
        "ø": "zero",
        null: "zero"
      };
      return aliases[key] || "";
    }
    function getClassicalNahuatlNncFirstSound(value = "") {
      const normalized = normalizeClassicalNahuatlNncToken(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function getClassicalNahuatlNncLastSound(value = "") {
      const normalized = normalizeClassicalNahuatlNncToken(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const matches = normalized.match(/[a-z]/gu);
      return matches?.length ? matches[matches.length - 1] : "";
    }
    function isClassicalNahuatlNncVowelSound(value = "") {
      return /^[aeio]$/u.test(normalizeClassicalNahuatlNncToken(value).toLowerCase());
    }
    function resolveClassicalNahuatlThirdPluralPossessorSt2(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const followingSound = getClassicalNahuatlNncFirstSound(normalizedStem);
      const mEnvironment = isClassicalNahuatlNncVowelSound(followingSound) || ["m", "p"].includes(followingSound);
      const authorized = Boolean(followingSound);
      return {
        kind: "classical-nahuatl-third-plural-possessor-st2-canvas-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "third-plural-possessor-st2-following-sound-required",
        stem: normalizedStem,
        followingSound,
        st2: authorized ? mEnvironment ? "m" : "n" : "",
        selectionRule: authorized ? mEnvironment ? "lesson13-st2-m-before-vowel-m-or-p" : "lesson13-st2-n-outside-m-environment" : "",
        userSelectionAuthority: false,
        sourceSubsetAuthority: false,
        formulaStringAuthority: false,
        legalWitnessTagIds: ["cn-l13-135-dyadic-possessor", "cn-l13-136-specific-possessor-inventory", "cn-l2-211-regressive-m-partial"]
      };
    }
    function getClassicalNahuatlLesson12Rules() {
      return CLASSICAL_NAHUATL_LESSON12_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlLesson13Rules() {
      return CLASSICAL_NAHUATL_LESSON13_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlLesson14Rules() {
      return CLASSICAL_NAHUATL_LESSON14_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlLesson15Rules() {
      return CLASSICAL_NAHUATL_LESSON15_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlLesson16Rules() {
      return CLASSICAL_NAHUATL_LESSON16_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlNncLayerContracts() {
      return CLASSICAL_NAHUATL_NNC_LAYER_CONTRACTS.map(cloneClassicalNahuatlNncValue);
    }
    function normalizeClassicalNahuatlLesson14UseShape(value = "base") {
      const key = normalizeClassicalNahuatlNncToken(value || "base").toLowerCase().replace(/[\s_-]/gu, "");
      return {
        base: "base",
        truncated: "truncated",
        glottalized: "glottalized"
      }[key] || "";
    }
    function normalizeClassicalNahuatlLesson14StemFormation(value = "plain") {
      const key = normalizeClassicalNahuatlNncToken(value || "plain").toLowerCase().replace(/[\s_/]/gu, "-");
      const aliases = {
        plain: "plain",
        affinity: "affinity",
        distributive: "distributive-varietal",
        varietal: "distributive-varietal",
        "distributive-varietal": "distributive-varietal"
      };
      return aliases[key] || "";
    }
    function getClassicalNahuatlLesson14InitialVowelFrame(sourceStem = "") {
      const stem = normalizeClassicalNahuatlNncStem(sourceStem);
      const match = stem.match(/[aeioāēīō]/iu);
      if (!match || typeof match.index !== "number") {
        return {
          kind: "classical-nahuatl-lesson14-initial-vowel-frame",
          authorizationStatus: "blocked",
          blockReason: "lesson14-derived-stem-source-initial-vowel-required",
          sourceStem: stem,
          onset: "",
          vowel: ""
        };
      }
      const vowel = match[0].toLowerCase();
      return {
        kind: "classical-nahuatl-lesson14-initial-vowel-frame",
        authorizationStatus: "authorized",
        blockReason: "",
        sourceStem: stem,
        onset: stem.slice(0, match.index),
        vowel,
        vowelIsLong: /[āēīō]/u.test(vowel),
        initialISurface: vowel === "i" || vowel === "ī",
        supportiveInitialITreatedAsRealVowel: vowel === "i" || vowel === "ī"
      };
    }
    function getClassicalNahuatlLesson14LongVowel(vowel = "") {
      return {
        a: "ā",
        ā: "ā",
        e: "ē",
        ē: "ē",
        i: "ī",
        ī: "ī",
        o: "ō",
        ō: "ō"
      }[normalizeClassicalNahuatlNncToken(vowel).toLowerCase()] || "";
    }
    function getClassicalNahuatlLesson14ShortVowel(vowel = "") {
      return {
        a: "a",
        ā: "a",
        e: "e",
        ē: "e",
        i: "i",
        ī: "i",
        o: "o",
        ō: "o"
      }[normalizeClassicalNahuatlNncToken(vowel).toLowerCase()] || "";
    }
    function deriveClassicalNahuatlLesson143Stem(sourceStem = "", formation = "plain") {
      const stem = normalizeClassicalNahuatlNncStem(sourceStem);
      const normalizedFormation = normalizeClassicalNahuatlLesson14StemFormation(formation);
      const initialVowelFrame = getClassicalNahuatlLesson14InitialVowelFrame(stem);
      if (!stem || !normalizedFormation) {
        return {
          kind: "classical-nahuatl-lesson143-stem-derivation-operation",
          authorizationStatus: "blocked",
          blockReason: !stem ? "lesson14-derived-stem-source-required" : "unknown-nounstem-formation",
          sourceStem: stem,
          stemFormation: normalizedFormation,
          derivedStem: "",
          initialVowelFrame
        };
      }
      if (normalizedFormation === "plain") {
        return {
          kind: "classical-nahuatl-lesson143-stem-derivation-operation",
          authorizationStatus: "authorized",
          blockReason: "",
          operationId: "lesson143-plain-stem-identity",
          sourceStem: stem,
          stemFormation: normalizedFormation,
          reduplicativePrefix: "",
          derivedStem: stem,
          initialVowelFrame,
          sourceStemPreserved: true
        };
      }
      if (initialVowelFrame.authorizationStatus !== "authorized") {
        return {
          kind: "classical-nahuatl-lesson143-stem-derivation-operation",
          authorizationStatus: "blocked",
          blockReason: initialVowelFrame.blockReason,
          sourceStem: stem,
          stemFormation: normalizedFormation,
          derivedStem: "",
          initialVowelFrame
        };
      }
      const reduplicativeVowel = normalizedFormation === "affinity" ? getClassicalNahuatlLesson14LongVowel(initialVowelFrame.vowel) : getClassicalNahuatlLesson14ShortVowel(initialVowelFrame.vowel);
      const reduplicativePrefix = `${initialVowelFrame.onset}${reduplicativeVowel}${normalizedFormation === "distributive-varietal" ? "h" : ""}`;
      return {
        kind: "classical-nahuatl-lesson143-stem-derivation-operation",
        authorizationStatus: reduplicativePrefix ? "authorized" : "blocked",
        blockReason: reduplicativePrefix ? "" : "lesson14-reduplicative-prefix-could-not-be-derived",
        operationId: normalizedFormation === "affinity" ? "lesson143-add-long-vowel-affinity-prefix" : "lesson143-add-glottal-stop-distributive-varietal-prefix",
        sourceStem: stem,
        stemFormation: normalizedFormation,
        reduplicativePrefix,
        derivedStem: reduplicativePrefix ? `${reduplicativePrefix}-${stem}` : "",
        initialVowelFrame,
        sourceStemPreserved: true,
        supportiveInitialIKeptInSource: initialVowelFrame.initialISurface === true,
        supportiveInitialIReduplicatedAsSupportive: initialVowelFrame.initialISurface === true,
        derivationPosition: "inside-predicate-stem",
        formulaSlotDelta: 0,
        subjectNumberChanged: false,
        grammaticalNumberValue: "none",
        animateNonanimateDistinctionPreserved: true,
        legalWitnessTagIds: ["cn-l14-143-affinity-distributive"]
      };
    }
    function getClassicalNahuatlLesson14ClassFormGuidance(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const finalSound = getClassicalNahuatlNncLastSound(normalizedStem);
      const endsInVowel = isClassicalNahuatlNncVowelSound(finalSound);
      return {
        kind: "classical-nahuatl-lesson14-class-form-guidance-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        stem: normalizedStem,
        finalSound,
        endsInVowel,
        candidateClasses: endsInVowel ? ["tl", "zero"] : ["tli", "in", "zero"],
        classAuthorized: false,
        candidateStatus: "guidance-only",
        lexicalSelectionRequired: true,
        rule: "form-constrains-candidates-but-does-not-predict-class-membership",
        legalWitnessTagIds: ["cn-l14-142-nounstem-classes"]
      };
    }
    function buildClassicalNahuatlLesson14SupportiveIRepairFrame(deletedStem = "") {
      const sourceStem = normalizeClassicalNahuatlNncStem(deletedStem);
      const finalSound = getClassicalNahuatlNncLastSound(sourceStem);
      const finalPhoneme = finalSound === "c" ? "/k/" : "";
      const openTransitionBuilder = getClassicalNahuatlNncRuntimeTarget()?.buildClassicalNahuatlLesson2OpenTransitionFrame;
      const supportiveIFrame = typeof openTransitionBuilder === "function" ? openTransitionBuilder({
        boundaryType: "internal-open-transition",
        stemInitialSupportiveI: true
      }) : null;
      const kBeforeIFrame = finalPhoneme === "/k/" && typeof openTransitionBuilder === "function" ? openTransitionBuilder({
        boundaryType: "internal-open-transition",
        stemFinalPhoneme: "/k/",
        followingVowel: "i"
      }) : null;
      const supportiveIAuthorized = supportiveIFrame?.authorizationStatus === "authorized" && supportiveIFrame.outputSpelling === "i";
      const kBeforeIAuthorized = finalPhoneme !== "/k/" || kBeforeIFrame?.authorizationStatus === "authorized" && kBeforeIFrame.outputSpelling === "qu";
      const authorized = Boolean(sourceStem && supportiveIAuthorized && kBeforeIAuthorized);
      const realizedStem = authorized ? finalPhoneme === "/k/" ? `${sourceStem.slice(0, -1)}${kBeforeIFrame.outputSpelling}${supportiveIFrame.outputSpelling}` : `${sourceStem}${supportiveIFrame.outputSpelling}` : "";
      return {
        kind: "classical-nahuatl-lesson14-supportive-i-repair-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !sourceStem ? "deleted-ephemeral-vowel-stem-required" : !supportiveIAuthorized ? "lesson2-supportive-i-authorization-required" : "lesson2-k-before-i-spelling-authorization-required",
        sourceStem,
        finalSound,
        finalPhoneme,
        supportiveVowel: "i",
        supportiveIFrame,
        kBeforeIFrame,
        orderedRuleIds: [supportiveIFrame?.selectedRuleId, ...(finalPhoneme === "/k/" ? [kBeforeIFrame?.selectedRuleId] : [])].filter(Boolean),
        realizedStem,
        stringConcatenationAuthority: false,
        legalWitnessTagIds: finalPhoneme === "/k/" ? ["cn-l2-25-supportive-i-kept", "cn-l2-25-stem-final-k-before-e-i-qu"] : ["cn-l2-25-supportive-i-kept"]
      };
    }
    function buildClassicalNahuatlLesson14NounstemSourceFrame(restrictedUseStem = "", options = {}) {
      const restrictedStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const state = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      const nounClass = normalizeClassicalNahuatlNounClass(options.nounClass || options.class || "");
      const classSelectionAuthority = normalizeClassicalNahuatlNncToken(options.classSelectionAuthority || (nounClass ? "user-selection" : "")).toLowerCase();
      const classAuthorityAllowed = ["user-selection", "external-lexical-record"].includes(classSelectionAuthority);
      const useShape = normalizeClassicalNahuatlLesson14UseShape(options.generalUseShape || options.useShape || "base");
      const classGuidanceFrame = getClassicalNahuatlLesson14ClassFormGuidance(restrictedStem);
      const selectedClassCompatible = Boolean(nounClass && classGuidanceFrame.candidateClasses.includes(nounClass));
      const ephemeralFinalVowel = normalizeClassicalNahuatlNncToken(options.ephemeralFinalVowel).toLowerCase();
      const repairAction = normalizeClassicalNahuatlNncToken(options.truncationRepair).toLowerCase();
      const suppliedGeneralStem = normalizeClassicalNahuatlNncStem(options.generalUseStem || "");
      let derivedGeneralStem = "";
      let useShapeAction = "";
      let useShapeAuthorized = false;
      let truncationRepairFrame = null;
      if (useShape === "base") {
        derivedGeneralStem = suppliedGeneralStem || restrictedStem;
        useShapeAction = "identity-base-shape";
        useShapeAuthorized = Boolean(derivedGeneralStem === restrictedStem);
      } else if (useShape === "truncated") {
        const ephemeralAllowed = ["a", "i"].includes(ephemeralFinalVowel) && restrictedStem.toLowerCase().endsWith(ephemeralFinalVowel);
        const deleted = ephemeralAllowed ? restrictedStem.slice(0, -ephemeralFinalVowel.length) : "";
        truncationRepairFrame = repairAction === "supportive-i" && deleted ? buildClassicalNahuatlLesson14SupportiveIRepairFrame(deleted) : null;
        derivedGeneralStem = repairAction === "supportive-i" ? truncationRepairFrame?.realizedStem || "" : deleted;
        useShapeAction = repairAction === "supportive-i" ? "delete-tagged-ephemeral-vowel-then-apply-supportive-i-and-orthographic-boundary-rules" : "delete-tagged-ephemeral-vowel";
        useShapeAuthorized = Boolean(ephemeralAllowed && derivedGeneralStem && (repairAction !== "supportive-i" || truncationRepairFrame?.authorizationStatus === "authorized") && (!suppliedGeneralStem || suppliedGeneralStem === derivedGeneralStem));
      } else if (useShape === "glottalized") {
        derivedGeneralStem = suppliedGeneralStem;
        useShapeAction = "glottalized-shape-reserved-for-compound-embed";
        useShapeAuthorized = options.usageEnvironment === "compound-embed" && Boolean(suppliedGeneralStem);
      }
      const supportiveInitialVariant = normalizeClassicalNahuatlNncStem(options.supportiveInitialVariant || "");
      const useStem = state === "absolutive" ? restrictedStem : derivedGeneralStem;
      const stateKnown = ["absolutive", "possessive"].includes(state);
      const authorized = Boolean(restrictedStem && stateKnown && nounClass && classAuthorityAllowed && selectedClassCompatible && useShapeAuthorized && useStem && !(state === "absolutive" && useShape !== "base") && !(state === "possessive" && useShape === "glottalized"));
      let blockReason = "";
      if (!restrictedStem) blockReason = "restricted-use-stem-required";else if (!stateKnown) blockReason = "unknown-nnc-state";else if (!nounClass) blockReason = "lexical-noun-class-selection-required";else if (!classAuthorityAllowed) blockReason = "class-must-be-user-selected-or-supplied-by-external-lexical-record";else if (!selectedClassCompatible) blockReason = "selected-class-contradicts-canvas-form-constraint";else if (!useShape) blockReason = "unknown-general-use-shape";else if (state === "absolutive" && useShape !== "base") blockReason = "absolutive-state-requires-restricted-base-shape";else if (state === "possessive" && useShape === "glottalized") blockReason = "glottalized-general-use-shape-is-not-an-nnc-shape";else if (!useShapeAuthorized) blockReason = useShape === "truncated" ? "truncation-requires-matching-tagged-ephemeral-a-or-i" : "general-use-shape-not-authorized";
      return {
        kind: "classical-nahuatl-lesson14-nounstem-source-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        restrictedUseStem: restrictedStem,
        generalUseStem: derivedGeneralStem,
        selectedUseStem: authorized ? useStem : "",
        selectedUseKind: state === "absolutive" ? "restricted-use" : "general-use",
        generalUseShape: useShape,
        useShapeAction,
        ephemeralFinalVowel,
        truncationRepair: repairAction || "none",
        truncationRepairFrame,
        nounClass,
        classSelectionAuthority,
        classGuidanceFrame,
        formGuidanceIsClassAuthority: false,
        supportiveInitialAlternatives: supportiveInitialVariant ? [restrictedStem, supportiveInitialVariant] : [restrictedStem],
        generalUseStemWasBlindlyInvented: false,
        legalWitnessTagIds: ["cn-l14-141-use-stem-kinds", "cn-l14-142-nounstem-classes", "cn-l14-147-possessive-common"]
      };
    }
    function buildClassicalNahuatlLesson14DerivedStemFrame(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const formation = normalizeClassicalNahuatlLesson14StemFormation(options.stemFormation || "plain");
      const suppliedDerivedStem = normalizeClassicalNahuatlNncStem(options.derivedStem || "");
      const derivationOperationFrame = deriveClassicalNahuatlLesson143Stem(normalizedSourceStem, formation);
      const derivedStem = derivationOperationFrame.derivedStem || "";
      const suppliedDerivedStemMatches = !suppliedDerivedStem || suppliedDerivedStem === derivedStem;
      const selectedSubject = normalizeClassicalNahuatlNncSubject(options.subject || "");
      const selectedAnimacy = normalizeClassicalNahuatlNncToken(options.animacy || "").toLowerCase();
      const relationEnvironmentAuthorized = formation === "plain" || !selectedSubject || !selectedAnimacy || selectedSubject.endsWith("pl") || selectedSubject === "3common" && selectedAnimacy === "nonanimate";
      const formationAuthorized = derivationOperationFrame.authorizationStatus === "authorized" && suppliedDerivedStemMatches && relationEnvironmentAuthorized;
      return {
        kind: "classical-nahuatl-lesson14-derived-stem-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: formationAuthorized ? "authorized" : "blocked",
        blockReason: formationAuthorized ? "" : !suppliedDerivedStemMatches ? "supplied-derived-stem-contradicts-canvas-rule-derivation" : !relationEnvironmentAuthorized ? "derived-nounstem-relation-requires-plural-or-nonanimate-common-reference" : derivationOperationFrame.blockReason,
        sourceStem: normalizedSourceStem,
        stemFormation: formation,
        derivedStem: formationAuthorized ? derivedStem : "",
        derivationOperationFrame,
        suppliedDerivedStem,
        suppliedDerivedStemMatches,
        suppliedDerivedStemIsAuthority: false,
        derivedByRule: formationAuthorized,
        derivationPosition: formation === "plain" ? "none" : "inside-predicate-stem",
        reduplicativePrefixKind: formation === "affinity" ? "long-vowel-affinity" : formation === "distributive-varietal" ? "glottal-stop-distributive-varietal" : "none",
        relationMeaning: formation === "affinity" ? "cohesiveness-or-affinity" : formation === "distributive-varietal" ? "distribution-or-variety" : "plain",
        grammaticalNumberValue: "none",
        subjectNumberChanged: false,
        mayHaveCommonNumberSubject: true,
        relationEnvironmentAuthorized,
        relationEnvironmentRule: "derived relation stem requires plural personal reference or nonanimate common reference",
        morphBoundaryPolicy: "keep-entire-derived-form-inside-one-stem-slot",
        legalWitnessTagIds: ["cn-l14-143-affinity-distributive"]
      };
    }
    function buildClassicalNahuatlLesson14ConstituentAnalysisFrame(analyses = [], options = {}) {
      const typedAnalyses = Array.isArray(analyses) ? analyses.filter(entry => entry && typeof entry === "object" && entry.kind && entry.id && entry.slots && typeof entry.slots === "object" && normalizeClassicalNahuatlNncStem(entry.slots.stem || "") && entry.vowelLengthAuthority === "explicit-typed-source-spelling").map(entry => ({
        ...cloneClassicalNahuatlNncValue(entry),
        id: normalizeClassicalNahuatlNncToken(entry.id).toLowerCase().replace(/[\s_]/gu, "-"),
        slots: {
          ...cloneClassicalNahuatlNncValue(entry.slots),
          stem: normalizeClassicalNahuatlNncStem(entry.slots.stem)
        }
      })) : [];
      const analysisIds = typedAnalyses.map(entry => entry.id);
      const duplicateAnalysisIds = analysisIds.filter((id, index, all) => all.indexOf(id) !== index);
      const selectedAnalysisId = normalizeClassicalNahuatlNncToken(options.selectedAnalysisId || "").toLowerCase().replace(/[\s_]/gu, "-");
      const selectionRequired = typedAnalyses.length > 1;
      const selectedAnalysis = typedAnalyses.length === 1 ? typedAnalyses[0] : typedAnalyses.find(entry => entry.id === selectedAnalysisId) || null;
      const selectedAnalysisAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || (selectedAnalysisId ? "user-selection" : "")).toLowerCase().replace(/[\s_]/gu, "-");
      const selectionAuthorityKnown = !selectedAnalysis || ["user-selection", "external-lexical-record", "single-typed-analysis"].includes(typedAnalyses.length === 1 ? "single-typed-analysis" : selectedAnalysisAuthority);
      let blockReason = "";
      if (Array.isArray(analyses) && analyses.length && !typedAnalyses.length) {
        blockReason = "typed-constituent-analysis-required";
      } else if (options.requireMultipleAnalyses === true && typedAnalyses.length < 2) {
        blockReason = "constituent-alternative-stem-required";
      } else if (duplicateAnalysisIds.length) blockReason = "duplicate-constituent-analysis-id";else if (selectionRequired && !selectedAnalysisId) blockReason = "constituent-analysis-selection-required";else if (selectionRequired && !selectedAnalysis) blockReason = "selected-constituent-analysis-not-authorized";else if (!selectionAuthorityKnown) blockReason = "unknown-constituent-analysis-selection-authority";
      const authorizationStatus = !typedAnalyses.length && !blockReason ? "not-required" : blockReason ? "blocked" : "authorized";
      return {
        kind: "classical-nahuatl-lesson14-constituent-analysis-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus,
        blockReason,
        analyses: typedAnalyses,
        alternativeCount: typedAnalyses.length,
        ambiguityPreserved: typedAnalyses.length > 1,
        ambiguityRemains: typedAnalyses.length > 1,
        selectionRequired,
        selectedAnalysisId: selectedAnalysis?.id || "",
        selectedAnalysis: selectedAnalysis ? cloneClassicalNahuatlNncValue(selectedAnalysis) : null,
        selectionAuthority: selectedAnalysis ? typedAnalyses.length === 1 ? "single-typed-analysis" : selectedAnalysisAuthority : "none",
        selectedAnalysisFeedsTypedSlots: Boolean(selectedAnalysis),
        spellingAloneSelectsAnalysis: false,
        rejectedUntypedAnalysisCount: Array.isArray(analyses) ? analyses.length - typedAnalyses.length : 0,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l14-148-constituent-ambiguity"]
      };
    }
    function buildClassicalNahuatlLesson14SurfaceConstituentAnalyses(lowerNncFrame = null, options = {}) {
      const typedSlotFrame = lowerNncFrame?.nncSlotFrame;
      const sourceSlots = typedSlotFrame?.slots || {};
      const predicateStem = normalizeClassicalNahuatlNncStem(sourceSlots.predicate?.stem || "");
      if (!isClassicalNahuatlNncSlotFrame(typedSlotFrame) || !predicateStem) {
        return [];
      }
      const ambiguityKind = normalizeClassicalNahuatlNncToken(options.constituentAmbiguityKind || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const allowedAmbiguityKinds = ["none", "front-o", "front-m", "back-uh", "back-tl", "back-tli"];
      if (!allowedAmbiguityKinds.includes(ambiguityKind)) {
        return [];
      }
      const stateCarriers = Object.fromEntries((sourceSlots.state?.slots || []).map(slot => [slot.role, slot.carrier]));
      const canonicalSlots = {
        stem: predicateStem,
        st: stateCarriers.st || "",
        st1: stateCarriers.st1 || "",
        st2: stateCarriers.st2 || "",
        num1: sourceSlots.number?.num1 || "",
        num2: sourceSlots.number?.num2 || ""
      };
      const canonical = {
        kind: "classical-nahuatl-lesson14-typed-constituent-analysis",
        id: "current-typed-slots",
        label: "Current typed slots",
        slots: canonicalSlots,
        vowelLengthAuthority: "explicit-typed-source-spelling",
        boundarySelectionAuthority: "typed-lower-nnc-frame",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      if (ambiguityKind === "none") {
        return [canonical];
      }
      const alternativeStem = normalizeClassicalNahuatlNncStem(options.constituentAlternativeStem || "");
      if (!alternativeStem) {
        return [canonical, {
          kind: "classical-nahuatl-lesson14-typed-constituent-analysis",
          id: "alternative-typed-slots",
          label: "Alternative typed slots",
          slots: {
            ...canonicalSlots,
            stem: ""
          },
          vowelLengthAuthority: "missing-explicit-typed-source-spelling",
          boundarySelectionAuthority: "user-supplied-lexical-analysis",
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        }];
      }
      const alternativeSlots = {
        ...canonicalSlots,
        stem: alternativeStem
      };
      if (ambiguityKind === "front-o") alternativeSlots.st2 = "o";
      if (ambiguityKind === "front-m") {
        alternativeSlots.st1 = "i";
        alternativeSlots.st2 = "m";
      }
      if (ambiguityKind.startsWith("back-")) {
        alternativeSlots.num1 = ambiguityKind.slice(5);
      }
      return [canonical, {
        kind: "classical-nahuatl-lesson14-typed-constituent-analysis",
        id: "alternative-typed-slots",
        label: "Alternative typed slots",
        ambiguityKind,
        slots: alternativeSlots,
        vowelLengthAuthority: "explicit-typed-source-spelling",
        boundarySelectionAuthority: "user-supplied-lexical-analysis",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      }];
    }
    function applyClassicalNahuatlLesson14SelectedConstituentAnalysis(nncSlotFrame = null, ambiguityFrame = null) {
      if (!isClassicalNahuatlNncSlotFrame(nncSlotFrame)) {
        return null;
      }
      if (!ambiguityFrame || ambiguityFrame.authorizationStatus === "not-required") {
        return cloneClassicalNahuatlNncValue(nncSlotFrame);
      }
      const selected = ambiguityFrame.authorizationStatus === "authorized" ? ambiguityFrame.selectedAnalysis : null;
      if (!selected?.slots?.stem) {
        return null;
      }
      const next = cloneClassicalNahuatlNncValue(nncSlotFrame);
      next.slots.predicate.stem = selected.slots.stem;
      if (selected.slots.num1) next.slots.number.num1 = selected.slots.num1;
      if (selected.slots.num2) next.slots.number.num2 = selected.slots.num2;
      if (Array.isArray(next.slots.state?.slots)) {
        next.slots.state.slots = next.slots.state.slots.map(slot => ({
          ...slot,
          carrier: selected.slots[slot.role] || slot.carrier
        }));
      }
      next.appliedLayerIds = Array.from(new Set([...(next.appliedLayerIds || []), "lesson14-constituent-analysis"]));
      next.lesson14ConstituentAnalysisId = selected.id;
      next.lesson14ConstituentAnalysisAuthority = ambiguityFrame.selectionAuthority;
      next.semanticIdentity = `${next.semanticIdentity || ""}|constituent-analysis:${selected.id}`;
      next.formulaArtifactAuthority = "display-only-not-authority";
      return next;
    }
    function buildClassicalNahuatlNncSubjectPersonFrame({
      subject = "3sg",
      followingMaterial = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const firstSound = getClassicalNahuatlNncFirstSound(followingMaterial);
      const lesson5PersonBuilder = getClassicalNahuatlNncRuntimeTarget()?.getClassicalNahuatlLesson5PersonDyad;
      const lesson5Frame = typeof lesson5PersonBuilder === "function" && normalizedSubject !== "3common" ? lesson5PersonBuilder(normalizedSubject, "indicative", {
        followingMaterial
      }) : null;
      let pers1 = lesson5Frame?.pers1 || "";
      if (normalizedSubject === "3common") {
        pers1 = CLASSICAL_NAHUATL_NNC_ZERO;
      }
      const pers2 = normalizedSubject ? CLASSICAL_NAHUATL_NNC_ZERO : "";
      const xCarrierRejected = /^xi?$/u.test(pers1);
      const authorized = Boolean(normalizedSubject && pers1 && pers2 && !xCarrierRejected);
      return {
        kind: "classical-nahuatl-nnc-subject-person-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : xCarrierRejected ? "x-xi-not-authorized-in-nnc-subject" : "unknown-nnc-subject",
        subject: normalizedSubject,
        pers1: authorized ? pers1 : "",
        pers2: authorized ? pers2 : "",
        followingMaterial: normalizeClassicalNahuatlNncToken(followingMaterial),
        followingSound: firstSound,
        personSourceFrameKind: lesson5Frame?.kind || "classical-nahuatl-nnc-third-common-person-frame",
        pers1BaseMorph: lesson5Frame?.pers1BaseMorph || pers1,
        supportiveVowelPresent: lesson5Frame?.pers1SupportiveVowelPresent === true,
        supportiveISurfacePolicy: lesson5Frame?.pers1SupportiveISurfacePolicy || "conditional-support-vowel-boundary-action",
        xXiAllowed: false,
        case: "nominative",
        formulaRegion: "subject",
        legalWitnessTagIds: ["cn-l12-123-subject-connectors", "cn-l12-124-subject-paradigm"]
      };
    }
    function resolveClassicalNahuatlLesson12AbsolutiveNumberDyad({
      subject = "3sg",
      nounClass = "",
      stem = "",
      pluralConnector = "",
      animacy = "",
      metaphoricalOverride = false
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const normalizedClass = normalizeClassicalNahuatlNounClass(nounClass);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const plural = normalizedSubject.endsWith("pl");
      const common = normalizedSubject === "3common";
      const normalizedAnimacy = normalizeClassicalNahuatlNncToken(animacy).toLowerCase();
      const pluralAnimacyAllowed = !plural || normalizedAnimacy === "animate" || metaphoricalOverride === true;
      let num1 = "";
      let num2 = "";
      let connectorRule = "";
      let alternatives = [];
      if (!plural && normalizedClass === "tl") {
        num1 = "tl";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-tl-class-after-vowel";
      } else if (!plural && normalizedClass === "tli") {
        const stemFinal = getClassicalNahuatlNncLastSound(normalizedStem);
        num1 = stemFinal === "l" ? "li" : "tli";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = stemFinal === "l" ? "lesson-12.3.2a-l-plus-tl-assimilates-to-li" : "lesson-12.3.2a-tli-after-consonant";
        alternatives = stemFinal === "l" ? [] : ["tli-0"];
      } else if (!plural && normalizedClass === "in") {
        num1 = "in";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-in-class-suppletive-connector";
      } else if (!plural && normalizedClass === "zero") {
        num1 = CLASSICAL_NAHUATL_NNC_ZERO;
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-zero-class-suppletive-connector";
      } else if (plural) {
        const connector = normalizeClassicalNahuatlNncToken(pluralConnector).toLowerCase().replace(/ø/gu, "0");
        const dyads = {
          "t-in": ["t", "in"],
          "m-eh": ["m", "eh"],
          "0-h": ["0", "h"]
        };
        [num1, num2] = dyads[connector] || ["", ""];
        connectorRule = num1 ? "lesson-12.3.2b-lexically-selected-plural-number-dyad" : "";
      }
      const classKnown = Boolean(normalizedClass);
      const connectorKnown = Boolean(num1 && num2);
      const authorized = Boolean(normalizedSubject && classKnown && connectorKnown && pluralAnimacyAllowed);
      return {
        kind: "classical-nahuatl-lesson12-absolutive-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !normalizedSubject ? "unknown-nnc-subject" : !classKnown ? "noun-class-required-for-absolutive-connector" : !pluralAnimacyAllowed ? "nonanimate-plural-requires-metaphorical-override" : "plural-number-dyad-must-be-selected-lexically",
        subject: normalizedSubject,
        subjectNumber: plural ? "plural" : common ? "common" : "singular",
        nounClass: normalizedClass,
        stem: normalizedStem,
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        connectorRule,
        alternatives,
        animacy: normalizedAnimacy || "not-specified",
        metaphoricalOverride: metaphoricalOverride === true,
        numberBelongsTo: "subject-personal-pronoun",
        numberIsNounInflection: false,
        supportiveVowelRoles: ["tli-i", "li-i", "in-i"],
        legalWitnessTagIds: ["cn-l12-123-subject-connectors", "cn-l12-126-animacy-number"]
      };
    }
    function normalizeClassicalNahuatlNncPossessor(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        ne: "reciprocal",
        reciprocal: "reciprocal",
        te: "nonspecific-human",
        "tē": "nonspecific-human",
        nonspecifichuman: "nonspecific-human",
        tla: "nonspecific-nonhuman",
        nonspecificnonhuman: "nonspecific-nonhuman",
        "1sg": "1sg",
        "2sg": "2sg",
        "3sg": "3sg",
        "1pl": "1pl",
        "2pl": "2pl",
        "3pl": "3pl"
      };
      return aliases[key] || "";
    }
    function buildClassicalNahuatlLesson13PossessiveStateFrame({
      possessor = "",
      stem = "",
      nounstemRelationKind = "",
      analogicalTlaDerivedStem = false,
      thirdPluralPossessorNumberMorph = "",
      nncSourceAuthorityFrame = null
    } = {}) {
      const normalizedPossessor = normalizeClassicalNahuatlNncPossessor(possessor);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const stemFirstSound = getClassicalNahuatlNncFirstSound(normalizedStem);
      const vowelInitialStem = isClassicalNahuatlNncVowelSound(stemFirstSound);
      const typedSourceAuthority = isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) ? nncSourceAuthorityFrame : null;
      const sourcePossessorCompatibility = typedSourceAuthority?.possessorCompatibility || "";
      const relationKind = typedSourceAuthority ? sourcePossessorCompatibility === "relational-tla" ? "relational" : "nonrelational" : normalizeClassicalNahuatlNncToken(nounstemRelationKind).toLowerCase();
      const analogicalTlaAuthorized = typedSourceAuthority ? sourcePossessorCompatibility === "analogical-tla-derived" : analogicalTlaDerivedStem === true;
      const authorizedThirdPluralSt2Options = typedSourceAuthority?.thirdPluralPossessorSt2Options?.length ? typedSourceAuthority.thirdPluralPossessorSt2Options : ["m", "n"];
      const thirdPluralSt2CanvasFrame = normalizedPossessor === "3pl" ? resolveClassicalNahuatlThirdPluralPossessorSt2(normalizedStem) : null;
      let arity = "";
      let slots = [];
      let possessorRole = "";
      let blockReason = "";
      if (["reciprocal", "nonspecific-human", "nonspecific-nonhuman"].includes(normalizedPossessor)) {
        arity = "monadic";
        const carriers = {
          reciprocal: "ne",
          "nonspecific-human": "tē",
          "nonspecific-nonhuman": "tla"
        };
        possessorRole = normalizedPossessor;
        slots = [{
          id: "state",
          role: "st",
          carrier: carriers[normalizedPossessor],
          possessorRole
        }];
        if (normalizedPossessor === "nonspecific-nonhuman" && relationKind !== "relational" && !analogicalTlaAuthorized) {
          blockReason = "tla-possessor-requires-relational-or-analogical-derived-nounstem";
        }
      } else if (["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(normalizedPossessor)) {
        arity = "dyadic";
        possessorRole = "specific";
        const st1ByPossessor = {
          "1sg": "n",
          "2sg": "m",
          "3sg": "ī",
          "1pl": "t",
          "2pl": "am",
          "3pl": "ī"
        };
        let st2 = "";
        if (["1sg", "2sg", "1pl", "2pl"].includes(normalizedPossessor)) {
          st2 = vowelInitialStem ? "⎕" : "o";
        } else if (normalizedPossessor === "3sg") {
          st2 = "0";
        } else {
          st2 = thirdPluralSt2CanvasFrame?.st2 || "";
          blockReason = thirdPluralSt2CanvasFrame?.authorizationStatus === "authorized" ? "" : thirdPluralSt2CanvasFrame?.blockReason || "third-plural-possessor-st2-following-sound-required";
        }
        slots = [{
          id: "state-person",
          role: "st1",
          carrier: st1ByPossessor[normalizedPossessor],
          possessorPerson: normalizedPossessor
        }, {
          id: "state-number-case",
          role: "st2",
          carrier: st2,
          possessorPerson: normalizedPossessor
        }];
      } else {
        blockReason = "unknown-possessor-selection";
      }
      const complete = Boolean(arity && slots.length && slots.every(slot => slot.carrier) && !blockReason);
      return {
        kind: "classical-nahuatl-lesson13-possessive-state-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason,
        state: "possessive",
        arity,
        slots: complete ? slots : [],
        possessor: normalizedPossessor,
        possessorRole,
        stem: normalizedStem,
        stemFirstSound,
        vowelInitialStem,
        nounstemRelationKind: relationKind || "not-specified",
        analogicalTlaDerivedStem: analogicalTlaDerivedStem === true,
        sourcePossessorCompatibility: sourcePossessorCompatibility || "legacy-call-options",
        authorizedThirdPluralPossessorSt2Options: authorizedThirdPluralSt2Options,
        selectedThirdPluralPossessorSt2: normalizedPossessor === "3pl" ? thirdPluralSt2CanvasFrame?.st2 || "" : "not-applicable",
        thirdPluralPossessorSt2CanvasFrame: thirdPluralSt2CanvasFrame,
        suppliedThirdPluralPossessorSt2: normalizedPossessor === "3pl" ? normalizeClassicalNahuatlNncToken(thirdPluralPossessorNumberMorph).toLowerCase() : "not-applicable",
        suppliedThirdPluralPossessorSt2Authority: false,
        st2SupportiveOrSilentBoundaryAction: ["1sg", "2sg", "1pl", "2pl"].includes(normalizedPossessor) ? vowelInitialStem ? "suppress-o-use-silent-repertory-mate" : "retain-short-o" : "not-applicable",
        legalWitnessTagIds: arity === "monadic" ? ["cn-l13-131-possessive-formulas", "cn-l13-134-monadic-possessor"] : ["cn-l13-131-possessive-formulas", "cn-l13-135-dyadic-possessor", "cn-l13-136-specific-possessor-inventory"]
      };
    }
    function resolveClassicalNahuatlLesson13PossessiveNumberDyad({
      subject = "3sg",
      stem = "",
      singularConnector = "",
      silentConnectorAuthorized = false,
      animacy = "",
      metaphoricalOverride = false
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const plural = normalizedSubject.endsWith("pl");
      const common = normalizedSubject === "3common";
      const stemFinalSound = getClassicalNahuatlNncLastSound(normalizedStem);
      const stemEndsVowel = isClassicalNahuatlNncVowelSound(stemFinalSound);
      const normalizedAnimacy = normalizeClassicalNahuatlNncToken(animacy).toLowerCase();
      let num1 = "";
      let num2 = "";
      let connectorRule = "";
      if (plural) {
        num1 = "hu";
        num2 = "ān";
        connectorRule = "lesson-13.2-possessive-plural-number-dyad";
      } else {
        const connector = normalizeClassicalNahuatlNncToken(singularConnector).toLowerCase().replace(/ø/gu, "0");
        if (connector === "uh" && stemEndsVowel) {
          num1 = "uh";
          num2 = "0";
          connectorRule = "lesson-13.2-uh-after-vowel-before-silent-num2";
        } else if (connector === "hui" && !stemEndsVowel) {
          num1 = "hui";
          num2 = "0";
          connectorRule = "lesson-13.2-hui-after-consonant";
        } else if (connector === "0" || connector === "zero") {
          num1 = "0";
          num2 = "0";
          connectorRule = "lesson-13.2-zero-morphologically-selected";
        } else if ((connector === "⎕" || connector === "silent") && silentConnectorAuthorized === true) {
          num1 = "⎕";
          num2 = "0";
          connectorRule = "lesson-14.7-tli-subclass2-lexically-authorized-silent-alternative";
        }
      }
      const authorized = Boolean(normalizedSubject && num1 && num2);
      return {
        kind: "classical-nahuatl-lesson13-possessive-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : plural ? "unknown-nnc-subject" : "possessive-singular-connector-must-match-stem-boundary-and-lexical-selection",
        subject: normalizedSubject,
        subjectNumber: plural ? "plural" : common ? "common" : "singular",
        stem: normalizedStem,
        stemFinalSound,
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        connectorRule,
        silentConnectorAuthorized: silentConnectorAuthorized === true,
        animacy: normalizedAnimacy || "not-specified",
        metaphoricalOverride: metaphoricalOverride === true,
        numberBelongsTo: "subject-personal-pronoun",
        uhHuIsPossessiveSuffix: false,
        legalWitnessTagIds: ["cn-l13-132-possessive-subject-number", "cn-l13-133-possessive-subject-paradigm"]
      };
    }
    function buildClassicalNahuatlNncSlotFrame({
      sourceFrameKind = "",
      sourceAuthorizationStatus = "",
      stem = "",
      stateFrame = null,
      personFrame = null,
      numberFrame = null,
      formulaArtifact = "",
      highestActiveLesson = 12,
      appliedLayerIds = [],
      nncFamily = "ordinary"
    } = {}) {
      const predicateStem = normalizeClassicalNahuatlNncStem(stem);
      const stateArity = stateFrame?.arity || "vacant";
      const stateSlots = Array.isArray(stateFrame?.slots) ? stateFrame.slots.map(cloneClassicalNahuatlNncValue) : [];
      const stateAuthorized = stateFrame?.authorizationStatus === "authorized" && (stateArity !== "vacant" || stateSlots.length === 0);
      const complete = Boolean(sourceAuthorizationStatus === "authorized" && predicateStem && stateAuthorized && personFrame?.authorizationStatus === "authorized" && personFrame?.pers1 && personFrame?.pers2 && numberFrame?.authorizationStatus === "authorized" && numberFrame?.num1 && numberFrame?.num2);
      const slotFrame = {
        kind: "classical-nahuatl-nnc-slot-frame",
        version: CLASSICAL_NAHUATL_NNC_LAYER_VERSION,
        frameRole: "typed-nnc-authority",
        nncFamily: normalizeClassicalNahuatlNncToken(nncFamily || "ordinary"),
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceFrameKind: normalizeClassicalNahuatlNncToken(sourceFrameKind),
        sourceAuthorizationStatus,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason: complete ? "" : "incomplete-or-unauthorized-typed-nnc-slots",
        highestActiveLesson: Number(highestActiveLesson) || 12,
        appliedLayerIds: Array.from(new Set(Array.isArray(appliedLayerIds) ? appliedLayerIds.map(normalizeClassicalNahuatlNncToken).filter(Boolean) : [])),
        slotOrder: ["pers1", "pers2", "state", "stem", "num1", "num2"],
        slots: {
          subject: {
            pers1: complete ? personFrame.pers1 : "",
            pers2: complete ? personFrame.pers2 : "",
            subject: personFrame?.subject || ""
          },
          state: {
            arity: stateArity,
            slots: complete ? stateSlots : []
          },
          predicate: {
            stem: complete ? predicateStem : "",
            tenseSlot: "none"
          },
          number: {
            num1: complete ? numberFrame.num1 : "",
            num2: complete ? numberFrame.num2 : "",
            belongsTo: "subject-personal-pronoun"
          }
        },
        nounClass: numberFrame?.nounClass || "",
        nounClassAuthority: numberFrame?.nounClassAuthority || (numberFrame?.nounClass ? "typed-number-frame" : ""),
        referentCategory: numberFrame?.referentCategory || "",
        referentCategoryAuthority: numberFrame?.referentCategoryAuthority || "",
        subjectNumber: numberFrame?.subjectNumber || "",
        subjectAnimacy: numberFrame?.animacy || "",
        metaphoricalUse: numberFrame?.metaphoricalOverride === true,
        sourceFormulaArtifact: normalizeClassicalNahuatlNncToken(formulaArtifact),
        formulaArtifactAuthority: "display-only-not-authority",
        formulaStringAuthority: false,
        tenseSlot: "none",
        valenceSlot: "not-applicable",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
      slotFrame.semanticIdentity = complete ? [personFrame.pers1, personFrame.pers2, stateArity, ...stateSlots.map(slot => slot.carrier), predicateStem, numberFrame.num1, numberFrame.num2].join("|") : "";
      return slotFrame;
    }
    function isClassicalNahuatlNncSlotFrame(frame = null) {
      if (!frame || frame.kind !== "classical-nahuatl-nnc-slot-frame" || frame.authorizationStatus !== "authorized") {
        return false;
      }
      const subject = frame.slots?.subject || {};
      const state = frame.slots?.state || {};
      const predicate = frame.slots?.predicate || {};
      const number = frame.slots?.number || {};
      if (!subject.pers1 || !subject.pers2 || !predicate.stem || !number.num1 || !number.num2 || predicate.tenseSlot !== "none") {
        return false;
      }
      if (!["vacant", "monadic", "dyadic", "reduplicated-dyadic"].includes(state.arity) || !Array.isArray(state.slots)) {
        return false;
      }
      if (state.arity === "vacant" && state.slots.length !== 0) {
        return false;
      }
      if (state.arity === "monadic" && (state.slots.length !== 1 || state.slots[0]?.role !== "st" || !state.slots[0]?.carrier)) {
        return false;
      }
      if (state.arity === "dyadic" && (state.slots.length !== 2 || state.slots[0]?.role !== "st1" || state.slots[1]?.role !== "st2")) {
        return false;
      }
      if (state.arity === "reduplicated-dyadic" && (state.slots.length !== 4 || state.slots.some(slot => !slot?.carrier) || state.slots.map(slot => slot.role).join("|") !== "st1|st2|st1|st2")) {
        return false;
      }
      return frame.formulaStringAuthority === false && frame.formulaArtifactAuthority === "display-only-not-authority";
    }
    function renderClassicalNahuatlNncSlotFrameFormula(frame = null) {
      if (!isClassicalNahuatlNncSlotFrame(frame)) {
        return "";
      }
      const subject = frame.slots.subject;
      const state = frame.slots.state;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      let stateDisplay = "";
      if (state.arity === "monadic") {
        stateDisplay = `+${state.slots[0].carrier}`;
      } else if (state.arity === "dyadic") {
        stateDisplay = `+${state.slots[0].carrier}-${state.slots[1].carrier}`;
      } else if (state.arity === "reduplicated-dyadic") {
        stateDisplay = `+${state.slots[0].carrier}-${state.slots[1].carrier}-${state.slots[2].carrier}-${state.slots[3].carrier}`;
      }
      return `#${subject.pers1}-${subject.pers2}${stateDisplay}(${predicate.stem})${number.num1}-${number.num2}#`;
    }
    function realizeClassicalNahuatlNncSurfaceCarrier(value = "") {
      return normalizeClassicalNahuatlNncToken(value).split("-").map(part => part.trim()).filter(part => part && !["0", "Ø", "⎕"].includes(part)).join("");
    }
    function capitalizeClassicalNahuatlNncSentenceInitial(value = "") {
      const text = String(value || "");
      return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
    }
    function buildClassicalNahuatlNncSentenceSurfaceFrame(nncSlotFrame = null, options = {}) {
      const sentenceTypeKey = normalizeClassicalNahuatlNncToken(options.sentenceType || "assertion").toLowerCase().replace(/[\s_]/gu, "-");
      const sentenceTypeAliases = {
        assertion: "assertion",
        statement: "assertion",
        question: "yes-no-intonation",
        "question-intonation": "yes-no-intonation",
        "yes-no-intonation": "yes-no-intonation",
        cuix: "yes-no-cuix",
        "question-cuix": "yes-no-cuix",
        "yes-no-cuix": "yes-no-cuix",
        "information-question": "information-question",
        emphatic: "emphatic",
        wish: "wish"
      };
      const requestedSentenceType = sentenceTypeAliases[sentenceTypeKey] || "";
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const discourseFrame = options.discourseFrame?.kind === "classical-nahuatl-lesson16-pronominal-discourse-frame" ? options.discourseFrame : null;
      const lesson16InformationQuestion = Boolean(discourseFrame?.inherentInterrogative && discourseFrame?.interrogativeReadingActive && polarity === "positive");
      const dependentClauseIntroducedByIn = discourseFrame?.dependentClauseIntroducedByIn === true;
      const sentenceType = lesson16InformationQuestion ? "information-question" : requestedSentenceType === "information-question" ? "assertion" : requestedSentenceType;
      const typedNnc = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const sentenceTypeKnown = Boolean(sentenceType);
      const polarityKnown = ["positive", "negative"].includes(polarity);
      const authorized = typedNnc && sentenceTypeKnown && polarityKnown;
      const blockReason = authorized ? "" : !typedNnc ? "authorized-typed-nnc-slot-frame-required" : !sentenceTypeKnown ? "unknown-nnc-sentence-type" : "unknown-nnc-sentence-polarity";
      const baseNncFormula = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const slots = nncSlotFrame?.slots || {};
      const stateCarriers = Array.isArray(slots.state?.slots) ? slots.state.slots.map(slot => slot?.carrier || "") : [];
      const nuclearSurface = authorized ? [slots.subject?.pers1, slots.subject?.pers2, ...stateCarriers, slots.predicate?.stem, slots.number?.num1, slots.number?.num2].map(realizeClassicalNahuatlNncSurfaceCarrier).join("") : "";
      const negativePrefix = polarity === "negative" ? sentenceType === "wish" ? "ca" : "ah" : "";
      const sentenceParticles = sentenceType === "emphatic" ? ["ca"] : sentenceType === "yes-no-cuix" ? ["cuix"] : sentenceType === "wish" ? ["mā"] : [];
      const finalPunctuation = ["information-question", "yes-no-intonation", "yes-no-cuix"].includes(sentenceType) ? "?" : ".";
      const sentenceWords = authorized ? [...sentenceParticles, `${negativePrefix}${nuclearSurface}`, ...(dependentClauseIntroducedByIn ? ["in", "…"] : [])].filter(Boolean) : [];
      const sentenceSurface = authorized ? `${capitalizeClassicalNahuatlNncSentenceInitial(sentenceWords.join(" "))}${finalPunctuation}` : "";
      const prefixalFormula = negativePrefix && baseNncFormula.startsWith("#") ? `${negativePrefix}#${baseNncFormula.slice(1)}` : baseNncFormula;
      const sentenceFormulaWords = [...sentenceParticles.map(capitalizeClassicalNahuatlNncSentenceInitial), prefixalFormula, ...(dependentClauseIntroducedByIn ? ["in", "…"] : [])].filter(Boolean);
      const sentenceFormulaDisplay = authorized ? `${sentenceFormulaWords.join(" ")}${finalPunctuation}` : "";
      return {
        kind: "classical-nahuatl-nnc-sentence-surface-frame",
        lesson: lesson16InformationQuestion ? "Andrews Lesson 16.4" : "Andrews Lesson 15.3",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sentenceSurfaceApplies: authorized,
        requestedSentenceType,
        sentenceType,
        polarity,
        discourseFrame,
        dependentClauseIntroducedByIn,
        dependentClausePlaceholder: dependentClauseIntroducedByIn ? "…" : "",
        adjunctWritingPolicy: dependentClauseIntroducedByIn ? "write-pronominal-nnc-and-in-separately" : "no-dependent-clause-writing-decision",
        inherentInterrogative: discourseFrame?.inherentInterrogative === true,
        interrogativeReadingActive: discourseFrame?.interrogativeReadingActive === true,
        predicateKind: normalizeClassicalNahuatlNncToken(options.predicateKind || "equative").toLowerCase(),
        baseNncFormula,
        sentenceFormulaDisplay,
        sentenceSurface,
        nuclearSurface,
        sentenceParticles,
        sentencePrefixalStack: negativePrefix ? [`${negativePrefix}#`] : [],
        sentencePrefixalStackAttachment: negativePrefix ? "prefixal-polarity-attached-at-left-edge" : "none",
        finalPunctuation,
        lowerLayerSelectedOutputRole: "typed-nnc-input-to-sentence-layer",
        lowerLessonOutputIsProvisional: authorized,
        highestActiveCanvasLayer: lesson16InformationQuestion ? "Andrews Lesson 16.4 pronominal discourse layer" : "Andrews Lesson 15.3 sentence layer",
        sentenceFinalizerLayer: lesson16InformationQuestion ? "lesson16.4-pronominal-interrogative-sentence-surface" : "lesson15.3-nnc-sentence-surface",
        sentenceSurfaceAuthority: lesson16InformationQuestion ? "typed-nnc-slots-plus-Andrews-Lesson-16.4-discourse" : "typed-nnc-slots-plus-Andrews-Lesson-15.3",
        sentenceSurfaceRealizedHere: authorized,
        typedSlotAuthority: true,
        formulaStringAuthority: false,
        formulaArtifactAuthority: "display-only-not-authority",
        legalWitnessTagIds: lesson16InformationQuestion ? ["cn-l15-153-sentence-structure", "cn-l16-164-identificational-interrogative"] : ["cn-l15-153-sentence-structure"],
        transcriptionLineStart: lesson16InformationQuestion ? 5497 : 5336,
        transcriptionLineEnd: lesson16InformationQuestion ? 5561 : 5357,
        exactWitness: lesson16InformationQuestion ? "An initial positive interrogative pronominal NNC asks for identity; negative or noninitial use loses interrogative quality." : "NNCs can constitute simple sentences; equative sentences may express assertions, questions, and wishes."
      };
    }
    function getClassicalNahuatlNncGeneralFormulaProjection(stateArity = "vacant") {
      const possessiveArity = stateArity === "monadic" ? "monadic" : ["dyadic", "reduplicated-dyadic"].includes(stateArity) ? "dyadic" : "vacant";
      if (possessiveArity === "monadic") {
        return {
          linearFormula: "#pers¹-pers²+st(STEM)num¹-num²#",
          rows: [{
            role: "Subject",
            expression: "#pers¹-pers²+ ... )num¹-num²#",
            hierarchyLevel: 3,
            discontinuousConstituent: true
          }, {
            role: "Predicate",
            expression: "+st(STEM)",
            hierarchyLevel: 2,
            foundation: "STEM"
          }]
        };
      }
      if (possessiveArity === "dyadic") {
        return {
          linearFormula: "#pers¹-pers²+st¹-st²(STEM)num¹-num²#",
          rows: [{
            role: "Subject",
            expression: "#pers¹-pers²+ ... )num¹-num²#",
            hierarchyLevel: 3,
            discontinuousConstituent: true
          }, {
            role: "Predicate",
            expression: "+st¹-st²(STEM)",
            hierarchyLevel: 2,
            foundation: "STEM"
          }]
        };
      }
      return {
        linearFormula: "#pers¹-pers²(STEM)num¹-num²#",
        rows: [{
          role: "Subject",
          expression: "#pers¹-pers²( ... )num¹-num²#",
          hierarchyLevel: 3,
          discontinuousConstituent: true
        }, {
          role: "Predicate",
          expression: "(STEM)",
          hierarchyLevel: 2,
          foundation: "STEM"
        }]
      };
    }
    function buildClassicalNahuatlNncDiagrammaticFrame(frame = null) {
      if (!isClassicalNahuatlNncSlotFrame(frame)) {
        return {
          kind: "classical-nahuatl-nnc-diagrammatic-frame",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: "authorized-typed-nnc-slot-frame-required",
          projectionAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          rows: []
        };
      }
      const subject = frame.slots.subject;
      const state = frame.slots.state;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const stateCarriers = state.slots.map(slot => slot.carrier);
      const stateDisplay = stateCarriers.length ? `+${stateCarriers.join("-")}` : "";
      const subjectGap = state.arity === "vacant" ? "( ... )" : "+ ... )";
      const subjectExpression = `#${subject.pers1}-${subject.pers2}${subjectGap}${number.num1}-${number.num2}#`;
      const predicateExpression = `${stateDisplay}(${predicate.stem})`;
      const generalProjection = getClassicalNahuatlNncGeneralFormulaProjection(state.arity);
      return {
        kind: "classical-nahuatl-nnc-diagrammatic-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        projectionAuthority: "typed-nnc-slots",
        formulaStringAuthority: false,
        linearFormula: renderClassicalNahuatlNncSlotFrameFormula(frame),
        generalLinearFormula: generalProjection.linearFormula,
        generalRows: generalProjection.rows,
        stateArity: state.arity,
        stateCarriers,
        predicateStem: predicate.stem,
        tenseSlot: "none",
        hierarchy: ["nounstem", "predicate", "NNC"],
        rows: [{
          role: "Subject",
          expression: subjectExpression,
          hierarchyLevel: 3,
          discontinuousConstituent: true
        }, {
          role: "Predicate",
          expression: predicateExpression,
          hierarchyLevel: 2,
          foundation: predicate.stem
        }],
        ruleRefs: [{
          section: "4.4",
          transcriptionLineStart: 2302,
          transcriptionLineEnd: 2309,
          exactWitness: "In a diagrammatic format, the NNC formula separates the discontinuous Subject from the State plus Stem Predicate."
        }, {
          section: "4.4 note",
          transcriptionLineStart: 2326,
          transcriptionLineEnd: 2334,
          exactWitness: "The diagram exposes the NNC hierarchy: nounstem, predicate, and NNC."
        }, {
          section: state.arity === "vacant" ? "12.2" : "13.1",
          transcriptionLineStart: state.arity === "vacant" ? 4387 : 4576,
          transcriptionLineEnd: state.arity === "vacant" ? 4393 : 4589,
          exactWitness: state.arity === "vacant" ? "The absolutive NNC diagram places the vacant predicate gap in the Subject row and the stem in the Predicate row." : "The possessive NNC diagram places State with the stem in the Predicate row."
        }]
      };
    }
    function buildClassicalNahuatlNncLayerEvaluationFrame({
      nncSlotFrame = null,
      highestActiveLesson = 12
    } = {}) {
      const highest = Number(highestActiveLesson) || 12;
      const typedAuthorized = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const stateArity = nncSlotFrame?.slots?.state?.arity || "";
      const nncFamily = nncSlotFrame?.nncFamily || "ordinary";
      const activeContracts = getClassicalNahuatlNncLayerContracts().filter(contract => contract.rank <= highest * 10).filter(contract => contract.layerId !== "lesson13-possessive-state" || stateArity !== "vacant").filter(contract => nncFamily !== "pronominal" || !["lesson14-nounstem-class-use-shape", "lesson15-higher-ordinary-nnc-conditions"].includes(contract.layerId));
      const finalizer = activeContracts.slice().reverse().find(contract => contract.finalizesWhenHighestActive) || null;
      const implementedThroughLesson = 16;
      const requestedLayerImplemented = highest <= implementedThroughLesson;
      const appliedLayerIds = Array.isArray(nncSlotFrame?.appliedLayerIds) ? nncSlotFrame.appliedLayerIds : [];
      const missingAppliedLayerIds = activeContracts.map(contract => contract.layerId).filter(layerId => !appliedLayerIds.includes(layerId));
      const allActiveLayersApplied = missingAppliedLayerIds.length === 0;
      const authorized = typedAuthorized && requestedLayerImplemented && allActiveLayersApplied && Boolean(finalizer);
      return {
        kind: "classical-nahuatl-nnc-layer-evaluation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !typedAuthorized ? "missing-or-contradictory-typed-nnc-input" : !requestedLayerImplemented ? "requested-higher-nnc-layer-not-implemented" : !allActiveLayersApplied ? "requested-nnc-layer-not-applied" : "active-nnc-layer-has-no-finalizer",
        highestActiveLesson: highest,
        nncFamily,
        implementedThroughLesson,
        activeLayerIds: activeContracts.map(contract => contract.layerId),
        appliedLayerIds: [...appliedLayerIds],
        missingAppliedLayerIds,
        finalizerLayerId: authorized ? finalizer.layerId : "",
        finalSurfaceKind: authorized ? finalizer.finalizesWhenHighestActive : "",
        lowerOutputProvisional: highest > 12,
        typedSlotAuthority: true,
        formulaStringAuthority: false
      };
    }
    function getClassicalNahuatlLesson15PredicateOptionContract(sourceStem = "", context = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selectedState = normalizeClassicalNahuatlNncToken(context.selectedState || context.state || "absolutive").toLowerCase();
      const subject = normalizeClassicalNahuatlNncSubject(context.subject || "3sg");
      const possessor = normalizeClassicalNahuatlNncPossessor(context.possessor || "3sg");
      const pluralSubject = /pl$/u.test(subject);
      const yoMatrixBoundary = getClassicalNahuatlNncLastSound(normalizedSourceStem) === "l" ? "l" : "y";
      const yoMatrixStem = normalizedSourceStem ? `${normalizedSourceStem}-${yoMatrixBoundary}${pluralSubject ? "ō" : "o"}` : "";
      const option = record => Object.freeze({
        kind: "classical-nahuatl-lesson15-predicate-option",
        sourceAuthority: "Andrews transcription Canvas witness",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        selectionAuthority: "canvas-predicate-option",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        ...record
      });
      const sourceOption = option({
        optionId: "source-stem",
        displayLabel: normalizedSourceStem || "source stem",
        operation: "regular",
        targetStem: normalizedSourceStem,
        suppletiveConnector: "class-governed",
        secondaryPossessorCarrier: "not-applicable",
        canvasSection: "15.1",
        transcriptionLineStart: 5158,
        transcriptionLineEnd: 5170,
        exactWitness: "Certain points not covered in the discussion in Lesson 14 should be noted."
      });
      const productiveOptions = [option({
        optionId: "yo-matrix",
        displayLabel: "(-yō)-tl- matrix",
        operation: "yo-matrix",
        targetStem: yoMatrixStem,
        suppletiveConnector: "0",
        secondaryPossessorCarrier: "not-applicable",
        requiresPossessive: true,
        canvasSection: "15.1.2.b-c; 39.3",
        transcriptionLineStart: 5177,
        transcriptionLineEnd: 5198,
        exactWitness: "(pil-lō)-tl- and (tēuc-yō)-tl- are realizations of the (-yō)-tl- matrix"
      }), option({
        optionId: "secondary-general-use",
        displayLabel: "secondary general-use stem (tē-)",
        operation: "secondary-general-use",
        targetStem: `tē-${normalizedSourceStem}`,
        suppletiveConnector: "not-applicable",
        secondaryPossessorCarrier: "tē",
        requiresPossessive: true,
        canvasSection: "15.1.5",
        transcriptionLineStart: 5222,
        transcriptionLineEnd: 5254,
        exactWitness: "the possessor pronoun tē fuses with a general-use stem"
      }), option({
        optionId: "analogical-restricted-use",
        displayLabel: "analogical restricted-use stem (tla-)",
        operation: "analogical-restricted-use",
        targetStem: `tla-${normalizedSourceStem}`,
        suppletiveConnector: "not-applicable",
        secondaryPossessorCarrier: "not-applicable",
        canvasSection: "15.1.6",
        transcriptionLineStart: 5255,
        transcriptionLineEnd: 5274,
        exactWitness: "The possessive-state predicate is downgraded to the rank of a restricted-use stem."
      })];
      const lexicalOptions = [option({
        optionId: "tec-title",
        displayLabel: "tēc (Totēc)",
        sourceStem: "tēuc",
        operation: "suppletive",
        targetStem: "tēc",
        suppletiveConnector: "0",
        secondaryPossessorCarrier: "not-applicable",
        requiresPossessive: true,
        requiredSubject: "3sg",
        requiredPossessor: "1pl",
        canvasSection: "15.1.2.c",
        transcriptionLineStart: 5199,
        transcriptionLineEnd: 5211,
        exactWitness: "Totēc, he is our lord, formed on the general-use stem (tēc)-Ø-; used as a title and a personal name"
      })];
      const availableOptions = [sourceOption, ...(normalizedSourceStem ? productiveOptions : []).filter(candidate => !candidate.requiresPossessive || selectedState === "possessive"), ...lexicalOptions.filter(candidate => candidate.sourceStem === normalizedSourceStem && (!candidate.requiresPossessive || selectedState === "possessive") && (!candidate.requiredSubject || candidate.requiredSubject === subject) && (!candidate.requiredPossessor || candidate.requiredPossessor === possessor))];
      return {
        kind: "classical-nahuatl-lesson15-predicate-option-contract",
        sourceAuthority: "Andrews transcription Canvas witness",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: normalizedSourceStem ? "authorized" : "blocked",
        blockReason: normalizedSourceStem ? "" : "lesson15-predicate-option-source-stem-required",
        sourceStem: normalizedSourceStem,
        selectedState,
        subject,
        possessor,
        options: availableOptions,
        optionIds: availableOptions.map(candidate => candidate.optionId),
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function buildClassicalNahuatlLesson15StemOperationRecord(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const requestedSelectionAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicateOptionId = normalizeClassicalNahuatlNncToken(options.predicateOptionId || options.optionId || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicateOptionContract = requestedSelectionAuthority === "canvas-predicate-option" ? getClassicalNahuatlLesson15PredicateOptionContract(normalizedSourceStem, {
        selectedState: options.selectedState || options.state,
        subject: options.subject,
        possessor: options.possessor
      }) : null;
      const canvasPredicateOption = predicateOptionContract?.options?.find(candidate => candidate.optionId === predicateOptionId) || null;
      const operationAliases = {
        "": "regular",
        regular: "regular",
        suppletive: "suppletive",
        "suppletive-possessive-stem": "suppletive",
        "yo-matrix": "yo-matrix",
        "predicate-suffix-lo": "yo-matrix",
        "predicate-suffix-yo": "yo-matrix",
        secondary: "secondary-general-use",
        "secondary-general-use": "secondary-general-use",
        analogical: "analogical-restricted-use",
        "analogical-restricted-use": "analogical-restricted-use",
        reclassification: "tl-2a-to-1a",
        "tl-2a-to-1a": "tl-2a-to-1a"
      };
      const requestedOperation = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.operation || options.operation || options.operationId || "regular").toLowerCase().replace(/[\s_]/gu, "-");
      const operation = operationAliases[requestedOperation] || "";
      const targetStem = operation === "regular" ? normalizedSourceStem : normalizeClassicalNahuatlNncStem(canvasPredicateOption?.targetStem || options.targetStem || "");
      const selectionAuthority = normalizeClassicalNahuatlNncToken(requestedSelectionAuthority || (operation === "regular" ? "canvas-regular-default" : "")).toLowerCase().replace(/[\s_]/gu, "-");
      const selectionAuthorityKnown = operation === "regular" ? ["canvas-regular-default", "canvas-predicate-option"].includes(selectionAuthority) : ["user-supplied-lexical-analysis", "external-lexical-record"].includes(selectionAuthority) || selectionAuthority === "canvas-predicate-option" && Boolean(canvasPredicateOption);
      const requestedConnector = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.suppletiveConnector || options.suppletiveConnector || "class-governed").toLowerCase().replace(/ø/gu, "0");
      const suppletiveConnector = ["class-governed", "uh", "hui", "0", "⎕"].includes(requestedConnector) ? requestedConnector : "";
      const secondaryPossessorCarrier = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.secondaryPossessorCarrier || options.secondaryPossessorCarrier || "tē").toLowerCase();
      let blockReason = "";
      if (!normalizedSourceStem) blockReason = "lesson15-operation-source-stem-required";else if (selectionAuthority === "canvas-predicate-option" && !canvasPredicateOption) {
        blockReason = "lesson15-predicate-option-not-authorized-for-source-and-context";
      } else if (!operation) blockReason = "unknown-lesson15-stem-operation";else if (!selectionAuthorityKnown) blockReason = "lesson15-stem-operation-requires-typed-lexical-authority";else if (operation !== "regular" && !targetStem) blockReason = "lesson15-selected-lexical-stem-required";else if (operation !== "regular" && targetStem === normalizedSourceStem) {
        blockReason = "lesson15-selected-lexical-stem-must-differ-from-source";
      } else if (operation === "suppletive" && !suppletiveConnector) {
        blockReason = "unknown-suppletive-singular-connector";
      } else if (operation === "yo-matrix" && !/-(?:l|y)[oō]$/u.test(targetStem)) {
        blockReason = "lesson15-yo-matrix-must-realize-boundary-allomorph";
      } else if (operation === "secondary-general-use" && !["tē", "ti", "t"].includes(secondaryPossessorCarrier)) {
        blockReason = "secondary-general-use-carrier-must-be-te-long-ti-or-t";
      } else if (operation === "secondary-general-use" && !targetStem.toLowerCase().startsWith(`${secondaryPossessorCarrier}-`)) {
        blockReason = "secondary-general-use-stem-must-contain-selected-inner-possessor-carrier";
      } else if (operation === "analogical-restricted-use" && !/^tla-/u.test(targetStem)) {
        blockReason = "analogical-restricted-use-stem-must-be-a-distinct-tla-derived-stem";
      }
      return {
        kind: "classical-nahuatl-lesson15-stem-operation-record",
        sourceAuthority: selectionAuthority === "canvas-predicate-option" ? "Andrews transcription Canvas predicate option" : "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: normalizedSourceStem,
        operation,
        targetStem,
        selectionAuthority,
        predicateOptionId: canvasPredicateOption?.optionId || "",
        predicateOptionFrame: canvasPredicateOption,
        suppletiveConnector: operation === "suppletive" ? suppletiveConnector : "not-applicable",
        secondaryPossessorCarrier: operation === "secondary-general-use" ? secondaryPossessorCarrier : "not-applicable",
        mutuallyExclusiveStemOperation: true,
        exactSpellingAuthority: "typed-source-record-including-vowel-length",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["suppletive", "yo-matrix"].includes(operation) ? ["cn-l15-151b-possessive-suppletion"] : operation === "secondary-general-use" ? ["cn-l15-151e-secondary-general-use"] : operation === "analogical-restricted-use" ? ["cn-l15-151f-analogical-restricted-use"] : operation === "tl-2a-to-1a" ? ["cn-l15-151g-reclassification"] : []
      };
    }
    function isClassicalNahuatlLesson15StemOperationRecord(record = null) {
      return Boolean(record && record.kind === "classical-nahuatl-lesson15-stem-operation-record" && record.authorizationStatus === "authorized" && record.sourceStem && ["regular", "suppletive", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tl-2a-to-1a"].includes(record.operation) && record.targetStem && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function buildClassicalNahuatlLesson15PossessorReduplicationSelection(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selected = options.selected === true;
      const selectionAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || (selected ? "" : "not-selected")).toLowerCase().replace(/[\s_]/gu, "-");
      const selectionAuthorityKnown = !selected || ["user-supplied-lexical-analysis", "external-lexical-record"].includes(selectionAuthority);
      const blockReason = !normalizedSourceStem ? "lesson15-reduplication-source-stem-required" : !selectionAuthorityKnown ? "possessor-reduplication-requires-typed-selection-authority" : "";
      return {
        kind: "classical-nahuatl-lesson15-possessor-reduplication-selection",
        sourceAuthority: "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: normalizedSourceStem,
        selected,
        selectionAuthority,
        separateFromStemOperation: true,
        grammaticalNumberValue: "none",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l15-151d-possessor-reduplication"]
      };
    }
    function isClassicalNahuatlLesson15PossessorReduplicationSelection(record = null) {
      return Boolean(record && record.kind === "classical-nahuatl-lesson15-possessor-reduplication-selection" && record.authorizationStatus === "authorized" && record.sourceStem && typeof record.selected === "boolean" && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function buildClassicalNahuatlNncSourceAuthorityFrame(sourceStem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selectedState = normalizeClassicalNahuatlNncToken(options.selectedState || options.state || "absolutive").toLowerCase().replace(/[\s_]/gu, "-");
      const requestedStateAvailability = normalizeClassicalNahuatlNncToken(options.stateAvailability || "").toLowerCase().replace(/[\s_]/gu, "-");
      const requestedNaturalPolicy = normalizeClassicalNahuatlNncToken(options.naturalPossessionPolicy || options.statePolicy || "").toLowerCase().replace(/[\s_]/gu, "-");
      const policyAliases = {
        "": requestedStateAvailability === "possessive-only" ? "naturally-possessed" : requestedStateAvailability === "absolutive-only" ? "never-possessive" : "ordinary",
        both: "ordinary",
        ordinary: "ordinary",
        "naturally-possessed": "naturally-possessed",
        "possessive-only": "naturally-possessed",
        "never-possessive": "never-possessive",
        "absolutive-only": "never-possessive"
      };
      const naturalPossessionPolicy = policyAliases[requestedNaturalPolicy];
      const stateAvailabilityByPolicy = {
        ordinary: "both",
        "naturally-possessed": "possessive-only",
        "never-possessive": "absolutive-only"
      };
      const stateAvailability = stateAvailabilityByPolicy[naturalPossessionPolicy] || "";
      const suppliedStateAvailabilityKnown = !requestedStateAvailability || ["both", "absolutive-only", "possessive-only"].includes(requestedStateAvailability);
      const stateAvailabilityContradiction = Boolean(requestedStateAvailability && stateAvailability && requestedStateAvailability !== stateAvailability);
      const metaphoricalOverride = options.metaphoricalOverride === true;
      const metaphoricalOverrideAvailable = naturalPossessionPolicy === "never-possessive";
      const allowedStateValues = naturalPossessionPolicy === "naturally-possessed" ? ["possessive"] : naturalPossessionPolicy === "never-possessive" ? metaphoricalOverride ? ["absolutive", "possessive"] : ["absolutive"] : ["absolutive", "possessive"];
      const policySelectionAuthority = normalizeClassicalNahuatlNncToken(options.policySelectionAuthority || (requestedNaturalPolicy || requestedStateAvailability ? "typed-call-selection" : "default-ordinary-source-analysis")).toLowerCase().replace(/[\s_]/gu, "-");
      const policyAuthorityKnown = ["default-ordinary-source-analysis", "typed-call-selection", "user-supplied-lexical-analysis", "external-lexical-record"].includes(policySelectionAuthority);
      const possessorCompatibilityAliases = {
        "": "ordinary",
        ordinary: "ordinary",
        relational: "relational-tla",
        "relational-tla": "relational-tla",
        analogical: "analogical-tla-derived",
        "analogical-tla": "analogical-tla-derived",
        "analogical-tla-derived": "analogical-tla-derived"
      };
      const requestedPossessorCompatibility = normalizeClassicalNahuatlNncToken(options.possessorCompatibility || "").toLowerCase().replace(/[\s_]/gu, "-");
      const possessorCompatibility = possessorCompatibilityAliases[requestedPossessorCompatibility] || "";
      const suppliedThirdPluralOptions = Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options");
      const rawThirdPluralOptions = Array.isArray(options.thirdPluralPossessorSt2Options) ? options.thirdPluralPossessorSt2Options : normalizeClassicalNahuatlNncToken(options.thirdPluralPossessorSt2Options || "").toLowerCase().split(/[^mn]+/u);
      const normalizedThirdPluralOptions = rawThirdPluralOptions.map(value => normalizeClassicalNahuatlNncToken(value).toLowerCase()).filter(Boolean);
      const thirdPluralPossessorSt2Options = Array.from(new Set((suppliedThirdPluralOptions ? normalizedThirdPluralOptions : ["m", "n"]).filter(value => ["m", "n"].includes(value))));
      const suppliedThirdPluralOptionsInvalid = suppliedThirdPluralOptions && (normalizedThirdPluralOptions.length !== thirdPluralPossessorSt2Options.length || !thirdPluralPossessorSt2Options.length);
      const suppliedLesson15OperationRecord = Object.prototype.hasOwnProperty.call(options, "lesson15StemOperationRecord");
      const lesson15StemOperationRecord = isClassicalNahuatlLesson15StemOperationRecord(options.lesson15StemOperationRecord) && options.lesson15StemOperationRecord.sourceStem === normalizedStem ? cloneClassicalNahuatlNncValue(options.lesson15StemOperationRecord) : buildClassicalNahuatlLesson15StemOperationRecord(normalizedStem, {
        operation: "regular"
      });
      const suppliedLesson15ReduplicationSelection = Object.prototype.hasOwnProperty.call(options, "lesson15PossessorReduplicationSelection");
      const lesson15PossessorReduplicationSelection = isClassicalNahuatlLesson15PossessorReduplicationSelection(options.lesson15PossessorReduplicationSelection) && options.lesson15PossessorReduplicationSelection.sourceStem === normalizedStem ? cloneClassicalNahuatlNncValue(options.lesson15PossessorReduplicationSelection) : buildClassicalNahuatlLesson15PossessorReduplicationSelection(normalizedStem);
      let blockReason = "";
      if (!normalizedStem) blockReason = "nnc-source-authority-stem-required";else if (!naturalPossessionPolicy) blockReason = "unknown-natural-possession-policy";else if (!suppliedStateAvailabilityKnown) blockReason = "unknown-lexical-state-availability";else if (stateAvailabilityContradiction) blockReason = "natural-possession-policy-contradicts-state-availability";else if (!policyAuthorityKnown) blockReason = "unknown-state-policy-selection-authority";else if (!possessorCompatibility) blockReason = "unknown-possessor-compatibility";else if (suppliedThirdPluralOptionsInvalid) {
        blockReason = "third-plural-possessor-st2-options-must-be-nonempty-m-n-subset";
      } else if (suppliedLesson15OperationRecord && (!isClassicalNahuatlLesson15StemOperationRecord(options.lesson15StemOperationRecord) || options.lesson15StemOperationRecord.sourceStem !== normalizedStem)) {
        blockReason = options.lesson15StemOperationRecord?.blockReason || "authorized-lesson15-stem-operation-record-required";
      } else if (suppliedLesson15ReduplicationSelection && (!isClassicalNahuatlLesson15PossessorReduplicationSelection(options.lesson15PossessorReduplicationSelection) || options.lesson15PossessorReduplicationSelection.sourceStem !== normalizedStem)) {
        blockReason = options.lesson15PossessorReduplicationSelection?.blockReason || "authorized-lesson15-possessor-reduplication-selection-required";
      } else if (!["absolutive", "possessive"].includes(selectedState)) blockReason = "unknown-nnc-state";else if (!allowedStateValues.includes(selectedState)) {
        blockReason = naturalPossessionPolicy === "naturally-possessed" ? "naturally-possessed-nounstem-requires-possessive-state" : "nounstem-never-possessive-without-metaphorical-override";
      }
      const authorized = !blockReason;
      return {
        kind: "classical-nahuatl-nnc-source-authority-frame",
        sourceAuthority: "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedStem,
        selectedState,
        stateAvailability,
        allowedStateValues,
        naturalPossessionPolicy,
        policySelectionAuthority,
        possessorCompatibility,
        tlaPossessorAvailable: possessorCompatibility !== "ordinary",
        tlaPossessorAvailabilityReason: possessorCompatibility === "relational-tla" ? "relational-nounstem-source-analysis" : possessorCompatibility === "analogical-tla-derived" ? "lesson15-analogical-tla-derived-source-analysis" : "not-authorized-for-ordinary-source-analysis",
        thirdPluralPossessorSt2Options,
        thirdPluralPossessorSt2OptionAuthority: suppliedThirdPluralOptions ? "user-supplied-lexical-analysis" : "canvas-m-n-repertory-inventory",
        lesson15StemOperationRecord,
        lesson15PossessorReduplicationSelection,
        metaphoricalOverride,
        metaphoricalOverrideAvailable,
        metaphoricalOverrideUsedForState: naturalPossessionPolicy === "never-possessive" && selectedState === "possessive" && metaphoricalOverride,
        statePolicyBelongsTo: "typed-source-lexical-analysis",
        selectedStateBelongsTo: "user-authority-selection",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l12-127-state-restrictions", "cn-l15-152-natural-possession"]
      };
    }
    function isClassicalNahuatlNncSourceAuthorityFrame(frame = null) {
      return Boolean(frame && frame.kind === "classical-nahuatl-nnc-source-authority-frame" && frame.authorizationStatus === "authorized" && frame.sourceStem && ["ordinary", "naturally-possessed", "never-possessive"].includes(frame.naturalPossessionPolicy) && ["both", "absolutive-only", "possessive-only"].includes(frame.stateAvailability) && ["ordinary", "relational-tla", "analogical-tla-derived"].includes(frame.possessorCompatibility) && Array.isArray(frame.thirdPluralPossessorSt2Options) && frame.thirdPluralPossessorSt2Options.length > 0 && frame.thirdPluralPossessorSt2Options.every(value => ["m", "n"].includes(value)) && Array.isArray(frame.allowedStateValues) && frame.allowedStateValues.includes(frame.selectedState) && isClassicalNahuatlLesson15StemOperationRecord(frame.lesson15StemOperationRecord) && frame.lesson15StemOperationRecord.sourceStem === frame.sourceStem && isClassicalNahuatlLesson15PossessorReduplicationSelection(frame.lesson15PossessorReduplicationSelection) && frame.lesson15PossessorReduplicationSelection.sourceStem === frame.sourceStem && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false);
    }
    function buildClassicalNahuatlLesson12AbsolutiveNncFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedStem && suppliedSourceAuthorityFrame.selectedState === "absolutive" ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedStem, {
        selectedState: "absolutive",
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const lesson4Builder = getClassicalNahuatlNncRuntimeTarget()?.buildClassicalNahuatlLesson4NuclearClauseFrame;
      const lesson4Frame = options.lesson4Frame || (typeof options.lesson4FrameResolver === "function" ? options.lesson4FrameResolver({
        stem: normalizedStem,
        formulaId: "nnc-state-vacant",
        stateSlot: "vacant",
        state: "absolutive"
      }) : null) || (typeof lesson4Builder === "function" ? lesson4Builder(normalizedStem, {
        formulaId: "nnc-state-vacant",
        nuclearClauseKind: "nominal-nuclear-clause",
        entryBoard: "ordinary-nnc",
        stateSlot: "vacant"
      }) : null);
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true && lesson4Conclusion.authorizedFormulaId === "nnc-state-vacant" && lesson4Conclusion.authorizedClauseKind === "nominal-nuclear-clause";
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const lexicalStateAvailability = nncSourceAuthorityFrame.stateAvailability || "";
      const stateAvailabilityKnown = ["both", "absolutive-only", "possessive-only"].includes(lexicalStateAvailability);
      const absolutiveStateAllowed = nncSourceAuthorityFrame.allowedStateValues?.includes("absolutive") === true;
      const stateFrame = {
        kind: "classical-nahuatl-nnc-state-frame",
        arity: "vacant",
        state: "absolutive",
        slots: [],
        lexicalStateAvailability,
        metaphoricalOverride: options.metaphoricalOverride === true,
        authorizationStatus: !forbiddenTense && !forbiddenValence && stateAvailabilityKnown && absolutiveStateAllowed ? "authorized" : "blocked",
        blockReason: forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : !stateAvailabilityKnown ? "unknown-lexical-state-availability" : !absolutiveStateAllowed ? "nounstem-restricted-to-possessive-state" : "",
        legalWitnessTagIds: ["cn-l12-121-state-not-valence", "cn-l12-122-absolutive-formula"]
      };
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: options.subject || "3sg",
        followingMaterial: normalizedStem
      });
      const numberFrame = resolveClassicalNahuatlLesson12AbsolutiveNumberDyad({
        subject: options.subject || "3sg",
        nounClass: options.nounClass || options.class || "",
        stem: normalizedStem,
        pluralConnector: options.pluralConnector || options.numberDyad || "",
        animacy: options.animacy || "",
        metaphoricalOverride: options.metaphoricalOverride === true
      });
      const predicateSemanticsFrame = {
        kind: "classical-nahuatl-lesson12-nounstem-predicate-semantics-frame",
        predicateRoleOptions: ["identify", "describe", "locate"],
        tenseCategoryEncoded: false,
        timeReferenceSource: "discourse-context",
        definitenessEncoded: false,
        indefinitenessEncoded: false,
        referentialityAccedesTo: "subject-personal-pronoun",
        legalWitnessTagIds: ["cn-l12-125-nounstem-predicate"]
      };
      const sourceAuthorized = Boolean(lesson4Authorized && normalizedStem && isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) && stateFrame.authorizationStatus === "authorized");
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-lesson12-absolutive-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: normalizedStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        highestActiveLesson: options.highestActiveLesson || 12,
        appliedLayerIds: ["lesson12-absolutive-subject-state"]
      });
      const layerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame({
        nncSlotFrame,
        highestActiveLesson: options.highestActiveLesson || 12
      });
      const authorized = layerEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const proofFrame = {
        kind: "classical-nahuatl-lesson12-logic-proof-frame",
        lesson: "Andrews Lesson 12",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson4-nnc-formula",
          passed: lesson4Authorized,
          consumedFrameKind: lesson4Frame?.kind || ""
        }, {
          layer: "state-not-valence-or-tense",
          passed: stateFrame.authorizationStatus === "authorized",
          stateFrame
        }, {
          layer: "nnc-nominative-subject",
          passed: personFrame.authorizationStatus === "authorized",
          personFrame
        }, {
          layer: "absolutive-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "typed-nnc-finalizer",
          passed: authorized,
          layerEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: authorized ? "" : !lesson4Authorized ? "lesson4-vacant-state-nnc-not-authorized" : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : layerEvaluationFrame.blockReason,
          formulaRealization,
          finalizerLayerId: layerEvaluationFrame.finalizerLayerId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l12-absolutive-nnc", ...CLASSICAL_NAHUATL_LESSON12_RULES.map(rule => rule.id)]
      };
      return {
        kind: "classical-nahuatl-lesson12-absolutive-nnc-frame",
        lesson: "Andrews Lesson 12",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: proofFrame.conclusion.blockReason,
        stem: normalizedStem,
        state: "absolutive",
        nounClass: numberFrame.nounClass,
        subject: personFrame.subject,
        nncSourceAuthorityFrame,
        lesson4Frame,
        stateFrame,
        predicateSemanticsFrame,
        personFrame,
        numberFrame,
        nncSlotFrame,
        layerEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        formulaTemplate: "#pers1-pers2(STEM)num1-num2#",
        ruleRefs: getClassicalNahuatlLesson12Rules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson13PossessiveNncFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedStem && suppliedSourceAuthorityFrame.selectedState === "possessive" ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedStem, {
        selectedState: "possessive",
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        possessorCompatibility: options.possessorCompatibility || "",
        ...(Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options") ? {
          thirdPluralPossessorSt2Options: options.thirdPluralPossessorSt2Options
        } : {}),
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const stateFrame = buildClassicalNahuatlLesson13PossessiveStateFrame({
        possessor: options.possessor || "",
        stem: normalizedStem,
        nounstemRelationKind: options.nounstemRelationKind || "",
        analogicalTlaDerivedStem: options.analogicalTlaDerivedStem === true,
        thirdPluralPossessorNumberMorph: options.thirdPluralPossessorNumberMorph || "",
        nncSourceAuthorityFrame
      });
      const lesson4Builder = getClassicalNahuatlNncRuntimeTarget()?.buildClassicalNahuatlLesson4NuclearClauseFrame;
      const formulaId = stateFrame.arity === "monadic" ? "nnc-state-monadic" : "nnc-state-dyadic";
      const lesson4Frame = options.lesson4Frame || (typeof options.lesson4FrameResolver === "function" ? options.lesson4FrameResolver({
        stem: normalizedStem,
        formulaId,
        stateSlot: stateFrame.arity,
        state: "possessive"
      }) : null) || (typeof lesson4Builder === "function" ? lesson4Builder(normalizedStem, {
        formulaId,
        nuclearClauseKind: "nominal-nuclear-clause",
        entryBoard: "ordinary-nnc",
        stateSlot: stateFrame.arity,
        state: "possessive"
      }) : null);
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true && lesson4Conclusion.authorizedFormulaId === formulaId && lesson4Conclusion.authorizedClauseKind === "nominal-nuclear-clause";
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const lexicalStateAvailability = nncSourceAuthorityFrame.stateAvailability || "";
      const possessiveStateAllowed = nncSourceAuthorityFrame.allowedStateValues?.includes("possessive") === true;
      if (stateFrame.authorizationStatus === "authorized" && (forbiddenTense || forbiddenValence || !possessiveStateAllowed)) {
        stateFrame.authorizationStatus = "blocked";
        stateFrame.blockReason = forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : "nounstem-restricted-to-absolutive-state";
        stateFrame.slots = [];
      }
      stateFrame.lexicalStateAvailability = lexicalStateAvailability;
      stateFrame.metaphoricalOverride = options.metaphoricalOverride === true;
      const followingStateMaterial = stateFrame.slots.map(slot => slot.carrier).join("");
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: options.subject || "3sg",
        followingMaterial: followingStateMaterial
      });
      const numberFrame = resolveClassicalNahuatlLesson13PossessiveNumberDyad({
        subject: options.subject || "3sg",
        stem: normalizedStem,
        singularConnector: options.singularConnector || options.numberDyad || "",
        silentConnectorAuthorized: options.silentConnectorAuthorized === true,
        animacy: options.animacy || "",
        metaphoricalOverride: options.metaphoricalOverride === true
      });
      const sourceAuthorized = Boolean(lesson4Authorized && normalizedStem && isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) && stateFrame.authorizationStatus === "authorized" && !forbiddenTense && !forbiddenValence);
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-lesson13-possessive-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: normalizedStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        highestActiveLesson: options.highestActiveLesson || 13,
        appliedLayerIds: ["lesson12-absolutive-subject-state", "lesson13-possessive-state"]
      });
      const layerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame({
        nncSlotFrame,
        highestActiveLesson: options.highestActiveLesson || 13
      });
      const authorized = layerEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : !lesson4Authorized ? "lesson4-possessive-state-nnc-not-authorized" : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : layerEvaluationFrame.blockReason;
      const proofFrame = {
        kind: "classical-nahuatl-lesson13-logic-proof-frame",
        lesson: "Andrews Lesson 13",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson4-possessive-formula",
          passed: lesson4Authorized,
          consumedFrameKind: lesson4Frame?.kind || ""
        }, {
          layer: "lesson12-subject-category-system",
          passed: personFrame.authorizationStatus === "authorized",
          personFrame
        }, {
          layer: "lesson13-possessive-state",
          passed: stateFrame.authorizationStatus === "authorized",
          stateFrame
        }, {
          layer: "lesson13-possessive-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "typed-nnc-finalizer",
          passed: authorized,
          layerEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          finalizerLayerId: layerEvaluationFrame.finalizerLayerId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l13-possessive-nnc", ...CLASSICAL_NAHUATL_LESSON13_RULES.map(rule => rule.id)]
      };
      return {
        kind: "classical-nahuatl-lesson13-possessive-nnc-frame",
        lesson: "Andrews Lesson 13",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        stem: normalizedStem,
        state: "possessive",
        subject: personFrame.subject,
        nncSourceAuthorityFrame,
        possessor: stateFrame.possessor,
        lesson4Frame,
        stateFrame,
        personFrame,
        numberFrame,
        nncSlotFrame,
        layerEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        formulaTemplate: stateFrame.arity === "monadic" ? "#pers1-pers2+st(STEM)num1-num2#" : "#pers1-pers2+st1-st2(STEM)num1-num2#",
        ruleRefs: getClassicalNahuatlLesson13Rules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson14Subclass(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        "1": "1",
        "2": "2",
        "1a": "1A",
        "1b": "1B",
        "2a": "2A",
        "2b": "2B",
        "2c": "2C"
      };
      return aliases[key] || "";
    }
    function resolveClassicalNahuatlLesson14ConnectorSelection(sourceFrame = null, derivedStemFrame = null, options = {}) {
      const state = sourceFrame?.state || "";
      const nounClass = sourceFrame?.nounClass || "";
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const plural = subject.endsWith("pl");
      const formation = derivedStemFrame?.stemFormation || "";
      const tlSubclass = normalizeClassicalNahuatlLesson14Subclass(options.tlSubclass || "");
      const tliSubclass = normalizeClassicalNahuatlLesson14Subclass(options.tliSubclass || "");
      const selectedPluralConnector = normalizeClassicalNahuatlNncToken(options.pluralConnector || "").toLowerCase().replace(/ø/gu, "0");
      const pluralSelectionAuthority = normalizeClassicalNahuatlNncToken(options.pluralSelectionAuthority || (selectedPluralConnector ? "user-selection" : "")).toLowerCase();
      const pluralAuthorityAllowed = ["user-selection", "external-lexical-record"].includes(pluralSelectionAuthority);
      let singularConnector = "";
      let pluralConnector = "";
      let silentConnectorAuthorized = false;
      let selectionRule = "";
      let blockReason = "";
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        blockReason = sourceFrame?.blockReason || "authorized-lesson14-source-frame-required";
      } else if (!subject) {
        blockReason = "unknown-nnc-subject";
      } else if (state === "absolutive" && !plural) {
        selectionRule = "class-names-absolutive-singular-common-num1-selection";
      } else if (state === "absolutive" && plural) {
        const knownConnector = ["t-in", "m-eh", "0-h"].includes(selectedPluralConnector);
        const affinityAllowed = formation !== "affinity" || nounClass === "tl" && ["0-h", "m-eh"].includes(selectedPluralConnector) || ["tli", "in"].includes(nounClass) && selectedPluralConnector === "t-in" || options.lexicalExceptionAuthorized === true;
        const distributiveSourceConnector = normalizeClassicalNahuatlNncToken(options.sourcePlainPluralConnector || "").toLowerCase().replace(/ø/gu, "0");
        const distributiveAllowed = formation !== "distributive-varietal" || distributiveSourceConnector && distributiveSourceConnector === selectedPluralConnector;
        if (!knownConnector) blockReason = "lexical-plural-number-dyad-selection-required";else if (!pluralAuthorityAllowed) blockReason = "plural-connector-must-be-user-selected-or-supplied-by-external-lexical-record";else if (!affinityAllowed) blockReason = "affinity-plural-connector-contradicts-class-guideline-without-lexical-exception";else if (!distributiveAllowed) blockReason = "distributive-plural-must-follow-source-stem-connector";else {
          pluralConnector = selectedPluralConnector;
          selectionRule = formation === "affinity" ? "lexical-affinity-plural-selection-with-class-guideline" : formation === "distributive-varietal" ? "distributive-plural-copies-source-stem-connector" : "lexical-plain-plural-selection-with-class-guideline";
        }
      } else if (state === "possessive" && plural) {
        selectionRule = formation === "plain" ? "possessive-plural-normally-plain-general-use-plus-number-dyad" : "possessive-plural-semantic-need-authorizes-derived-general-use-plus-number-dyad";
      } else if (state === "possessive") {
        if (["in", "zero"].includes(nounClass)) {
          if (sourceFrame.generalUseShape !== "base") blockReason = "in-and-zero-possessive-common-require-base-general-use-shape";else {
            singularConnector = "0";
            selectionRule = "in-or-zero-class-base-plus-zero-num1";
          }
        } else if (nounClass === "tli") {
          if (sourceFrame.generalUseShape !== "base") blockReason = "tli-possessive-common-requires-base-general-use-shape";else if (tliSubclass === "1") {
            singularConnector = "0";
            selectionRule = "tli-subclass1-zero-num1";
          } else if (tliSubclass === "2") {
            const selected = normalizeClassicalNahuatlNncToken(options.singularConnector || "hui").toLowerCase();
            if ((selected === "⎕" || selected === "silent") && options.silentConnectorAlternativeAuthorized === true) {
              singularConnector = "⎕";
              silentConnectorAuthorized = true;
              selectionRule = "tli-subclass2-lexically-authorized-silent-alternative";
            } else if (selected === "hui") {
              singularConnector = "hui";
              selectionRule = "tli-subclass2-hui-num1";
            } else {
              blockReason = "tli-subclass2-requires-hui-or-lexically-authorized-silent-alternative";
            }
          } else {
            blockReason = "tli-possessive-common-subclass-selection-required";
          }
        } else if (nounClass === "tl") {
          const baseSubclass = ["1A", "1B"].includes(tlSubclass);
          const truncatedSubclass = ["2A", "2B", "2C"].includes(tlSubclass);
          if (!tlSubclass) blockReason = "tl-possessive-common-subclass-selection-required";else if (baseSubclass && sourceFrame.generalUseShape !== "base") blockReason = "tl-subclass1-requires-base-general-use-shape";else if (truncatedSubclass && sourceFrame.generalUseShape !== "truncated") blockReason = "tl-subclass2-requires-truncated-general-use-shape";else if (tlSubclass === "2C" && sourceFrame.truncationRepair !== "supportive-i") blockReason = "tl-subclass2c-requires-supportive-i-repair-after-truncation";else if (["2A", "2B"].includes(tlSubclass) && sourceFrame.truncationRepair === "supportive-i") blockReason = "supportive-i-repair-is-specific-to-tl-subclass2c";else {
            singularConnector = tlSubclass === "1A" ? "uh" : "0";
            selectionRule = `tl-subclass-${tlSubclass.toLowerCase()}-${singularConnector}-num1`;
          }
        }
      }
      const authorized = Boolean(!blockReason && selectionRule);
      return {
        kind: "classical-nahuatl-lesson14-connector-selection-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        subject,
        subjectNumber: plural ? "plural" : subject === "3common" ? "common" : "singular",
        nounClass,
        stemFormation: formation,
        tlSubclass,
        tliSubclass,
        singularConnector,
        pluralConnector,
        silentConnectorAuthorized,
        pluralSelectionAuthority,
        selectionRule,
        connectorBelongsTo: "subject-personal-pronoun",
        connectorIsNounSuffix: false,
        classGuidelineIsLexicalSelection: false,
        legalWitnessTagIds: state === "absolutive" ? ["cn-l14-144-absolutive-common", "cn-l14-145-absolutive-plural"] : ["cn-l14-146-possessive-plural", "cn-l14-147-possessive-common"]
      };
    }
    function buildClassicalNahuatlLesson14ClassGovernedNncFrame(restrictedUseStem = "", options = {}) {
      const state = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const normalizedRestrictedUseStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const suppliedSourceAuthorityFrameMatches = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedRestrictedUseStem && suppliedSourceAuthorityFrame.selectedState === state;
      const nncSourceAuthorityFrame = suppliedSourceAuthorityFrame ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedRestrictedUseStem, {
        selectedState: state,
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        possessorCompatibility: options.possessorCompatibility || "",
        ...(Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options") ? {
          thirdPluralPossessorSt2Options: options.thirdPluralPossessorSt2Options
        } : {}),
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const sourceFrame = buildClassicalNahuatlLesson14NounstemSourceFrame(restrictedUseStem, {
        ...options,
        state
      });
      const derivedStemFrame = buildClassicalNahuatlLesson14DerivedStemFrame(sourceFrame.selectedUseStem, options);
      const connectorSelectionFrame = resolveClassicalNahuatlLesson14ConnectorSelection(sourceFrame, derivedStemFrame, {
        ...options,
        subject
      });
      const selectedStem = derivedStemFrame.derivedStem;
      let lowerNncFrame = null;
      if ((!suppliedSourceAuthorityFrame || suppliedSourceAuthorityFrameMatches) && sourceFrame.authorizationStatus === "authorized" && derivedStemFrame.authorizationStatus === "authorized" && connectorSelectionFrame.authorizationStatus === "authorized") {
        if (state === "absolutive") {
          lowerNncFrame = buildClassicalNahuatlLesson12AbsolutiveNncFrame(selectedStem, {
            subject,
            nounClass: sourceFrame.nounClass,
            pluralConnector: connectorSelectionFrame.pluralConnector,
            animacy: options.animacy || "",
            metaphoricalOverride: options.metaphoricalOverride === true,
            stateAvailability: nncSourceAuthorityFrame.stateAvailability || "",
            naturalPossessionPolicy: nncSourceAuthorityFrame.naturalPossessionPolicy || "",
            policySelectionAuthority: nncSourceAuthorityFrame.policySelectionAuthority || "",
            nncSourceAuthorityFrame,
            formulaArtifact: options.formulaArtifact || options.formula || "",
            highestActiveLesson: 12,
            lesson4FrameResolver: options.lesson4FrameResolver
          });
        } else if (state === "possessive") {
          lowerNncFrame = buildClassicalNahuatlLesson13PossessiveNncFrame(selectedStem, {
            subject,
            possessor: options.possessor || "",
            nounstemRelationKind: options.nounstemRelationKind || "",
            analogicalTlaDerivedStem: options.analogicalTlaDerivedStem === true,
            thirdPluralPossessorNumberMorph: options.thirdPluralPossessorNumberMorph || "",
            singularConnector: connectorSelectionFrame.singularConnector,
            silentConnectorAuthorized: connectorSelectionFrame.silentConnectorAuthorized,
            stateAvailability: nncSourceAuthorityFrame.stateAvailability || "",
            naturalPossessionPolicy: nncSourceAuthorityFrame.naturalPossessionPolicy || "",
            policySelectionAuthority: nncSourceAuthorityFrame.policySelectionAuthority || "",
            nncSourceAuthorityFrame,
            metaphoricalOverride: options.metaphoricalOverride === true,
            formulaArtifact: options.formulaArtifact || options.formula || "",
            highestActiveLesson: 13,
            lesson4FrameResolver: options.lesson4FrameResolver
          });
        }
      }
      const lowerTypedFrame = lowerNncFrame?.nncSlotFrame;
      const ambiguityKind = normalizeClassicalNahuatlNncToken(options.constituentAmbiguityKind || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const constituentAnalyses = Array.isArray(options.constituentAnalyses) && options.constituentAnalyses.length ? options.constituentAnalyses : buildClassicalNahuatlLesson14SurfaceConstituentAnalyses(lowerNncFrame, options);
      const ambiguityFrame = buildClassicalNahuatlLesson14ConstituentAnalysisFrame(constituentAnalyses, {
        selectedAnalysisId: options.selectedConstituentAnalysisId || "",
        selectionAuthority: options.constituentAnalysisSelectionAuthority || "",
        requireMultipleAnalyses: ambiguityKind !== "none"
      });
      const lowerSlotFrame = lowerNncFrame?.authorizationStatus === "authorized" && isClassicalNahuatlNncSlotFrame(lowerTypedFrame) ? cloneClassicalNahuatlNncValue(lowerTypedFrame) : null;
      let nncSlotFrame = applyClassicalNahuatlLesson14SelectedConstituentAnalysis(lowerSlotFrame, ambiguityFrame);
      if (nncSlotFrame) {
        nncSlotFrame.sourceFrameKind = "classical-nahuatl-lesson14-class-governed-nnc-frame";
        nncSlotFrame.highestActiveLesson = 14;
        nncSlotFrame.nounClass = sourceFrame.nounClass;
        nncSlotFrame.lesson14SourceFrameKind = sourceFrame.kind;
        nncSlotFrame.lesson14DerivedStemFrameKind = derivedStemFrame.kind;
        nncSlotFrame.lesson14ConnectorSelectionFrameKind = connectorSelectionFrame.kind;
        nncSlotFrame.appliedLayerIds = Array.from(new Set([...(nncSlotFrame.appliedLayerIds || []), "lesson14-nounstem-class-use-shape", ...(derivedStemFrame.stemFormation === "plain" ? [] : ["lesson14-nounstem-relation"])]));
        nncSlotFrame.semanticIdentity = [nncSlotFrame.semanticIdentity, sourceFrame.nounClass, sourceFrame.selectedUseKind, sourceFrame.generalUseShape, derivedStemFrame.stemFormation, connectorSelectionFrame.selectionRule].join("|");
      }
      const layerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame({
        nncSlotFrame,
        highestActiveLesson: 14
      });
      const ambiguityAuthorized = ["authorized", "not-required"].includes(ambiguityFrame.authorizationStatus);
      const authorized = layerEvaluationFrame.authorizationStatus === "authorized" && ambiguityAuthorized;
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : suppliedSourceAuthorityFrame && !suppliedSourceAuthorityFrameMatches ? nncSourceAuthorityFrame.blockReason || "authorized-matching-nnc-source-authority-frame-required" : sourceFrame.authorizationStatus !== "authorized" ? sourceFrame.blockReason : derivedStemFrame.authorizationStatus !== "authorized" ? derivedStemFrame.blockReason : connectorSelectionFrame.authorizationStatus !== "authorized" ? connectorSelectionFrame.blockReason : !ambiguityAuthorized ? ambiguityFrame.blockReason : lowerNncFrame?.blockReason || layerEvaluationFrame.blockReason;
      const proofFrame = {
        kind: "classical-nahuatl-lesson14-logic-proof-frame",
        lesson: "Andrews Lesson 14",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson14-lexical-class-and-use-stem",
          passed: sourceFrame.authorizationStatus === "authorized",
          sourceFrame
        }, {
          layer: "lesson14-internal-derived-stem",
          passed: derivedStemFrame.authorizationStatus === "authorized",
          derivedStemFrame
        }, {
          layer: "lesson14-state-number-connector",
          passed: connectorSelectionFrame.authorizationStatus === "authorized",
          connectorSelectionFrame
        }, {
          layer: state === "absolutive" ? "lesson12-consumed-output" : "lesson13-consumed-output",
          passed: lowerNncFrame?.authorizationStatus === "authorized",
          consumedFrameKind: lowerNncFrame?.kind || ""
        }, {
          layer: "lesson14-constituent-analysis",
          passed: ambiguityAuthorized,
          ambiguityFrame
        }, {
          layer: "lesson14-typed-finalizer",
          passed: authorized,
          layerEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          finalizerLayerId: layerEvaluationFrame.finalizerLayerId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l14-nounstem-classes", ...CLASSICAL_NAHUATL_LESSON14_RULES.map(rule => rule.id)]
      };
      return {
        kind: "classical-nahuatl-lesson14-class-governed-nnc-frame",
        lesson: "Andrews Lesson 14",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        subject,
        nncSourceAuthorityFrame,
        sourceFrame,
        derivedStemFrame,
        connectorSelectionFrame,
        ambiguityFrame,
        lowerNncFrame,
        nncSlotFrame,
        layerEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots-after-lesson14-class-use-finalizer",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlLesson14Rules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson15SentenceHandoffFrame(nncSlotFrame = null, options = {}) {
      const sentenceTypeKey = normalizeClassicalNahuatlNncToken(options.sentenceType || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const sentenceTypeAliases = {
        none: "none",
        assertion: "assertion",
        statement: "assertion",
        question: "yes-no-intonation",
        "yes-no-intonation": "yes-no-intonation",
        cuix: "yes-no-cuix",
        "yes-no-cuix": "yes-no-cuix",
        emphatic: "emphatic",
        wish: "wish"
      };
      const sentenceType = sentenceTypeAliases[sentenceTypeKey] || "";
      const predicateKind = normalizeClassicalNahuatlNncToken(options.predicateKind || "equative").toLowerCase().replace(/[\s_]/gu, "-");
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const modifier = normalizeClassicalNahuatlNncToken(options.sentenceModifier || "");
      const requested = sentenceType && sentenceType !== "none";
      const typedNnc = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const sentenceTypeKnown = Boolean(sentenceType);
      const predicateKindKnown = ["equative", "attributive", "adverbial"].includes(predicateKind);
      const polarityKnown = ["positive", "negative"].includes(polarity);
      const authorized = !requested || typedNnc && sentenceTypeKnown && predicateKindKnown && polarityKnown;
      return {
        kind: "classical-nahuatl-lesson15-sentence-handoff-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? requested ? "authorized" : "not-requested" : "blocked",
        blockReason: authorized ? "" : !typedNnc ? "typed-nnc-required-for-sentence-handoff" : !sentenceTypeKnown ? "unknown-nnc-sentence-type" : !predicateKindKnown ? "unknown-nnc-predicate-kind" : "unknown-sentence-polarity",
        sentenceLayerRequested: requested,
        sentenceType,
        predicateKind,
        polarity,
        modifier,
        allowedSentenceTypes: ["assertion", "yes-no-intonation", "yes-no-cuix", "emphatic", "wish"],
        lowerNncOutputProvisional: requested,
        finalizerRequired: requested ? "highest-active-sentence-layer" : "none",
        nncFormulaIsSentenceAuthority: false,
        sentenceSurfaceRealizedHere: false,
        possessiveHavingTranslationIsContextual: nncSlotFrame?.slots?.state?.arity !== "vacant",
        definitenessEncoded: false,
        indefinitenessEncoded: false,
        definitenessRemainsAmbiguous: true,
        legalWitnessTagIds: ["cn-l15-153-sentence-structure"]
      };
    }
    function buildClassicalNahuatlLesson15HigherNncFrame(classGovernedFrame = null, options = {}) {
      const inputIsLesson14Frame = classGovernedFrame?.kind === "classical-nahuatl-lesson14-class-governed-nnc-frame" && classGovernedFrame.authorizationStatus === "authorized";
      const inputSlot = inputIsLesson14Frame ? classGovernedFrame.nncSlotFrame : null;
      const typedInput = isClassicalNahuatlNncSlotFrame(inputSlot) && inputSlot.appliedLayerIds?.includes("lesson14-nounstem-class-use-shape");
      const nncSlotFrame = typedInput ? cloneClassicalNahuatlNncValue(inputSlot) : null;
      const state = nncSlotFrame?.slots?.state?.arity === "vacant" ? "absolutive" : "possessive";
      const subjectNumber = nncSlotFrame?.subjectNumber || "";
      const metaphoricalOverride = options.metaphoricalOverride === true;
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const inheritedSourceAuthorityFrame = classGovernedFrame?.nncSourceAuthorityFrame;
      const explicitSourcePolicyOptions = Object.prototype.hasOwnProperty.call(options, "naturalPossessionPolicy") || Object.prototype.hasOwnProperty.call(options, "stateAvailability") || Object.prototype.hasOwnProperty.call(options, "metaphoricalOverride") || Object.prototype.hasOwnProperty.call(options, "policySelectionAuthority");
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : !explicitSourcePolicyOptions && isClassicalNahuatlNncSourceAuthorityFrame(inheritedSourceAuthorityFrame) ? cloneClassicalNahuatlNncValue(inheritedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(classGovernedFrame?.sourceFrame?.restrictedUseStem || nncSlotFrame?.slots?.predicate?.stem || "", {
        selectedState: state,
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        metaphoricalOverride,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const naturalPossessionPolicy = nncSourceAuthorityFrame.naturalPossessionPolicy || "";
      const naturalPolicyKnown = isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame);
      let blockReason = "";
      if (!inputIsLesson14Frame || !typedInput) {
        blockReason = classGovernedFrame?.blockReason || "authorized-lesson14-typed-frame-required";
      } else if (!naturalPolicyKnown) blockReason = nncSourceAuthorityFrame.blockReason || "unknown-natural-possession-policy";else if (naturalPossessionPolicy === "naturally-possessed" && state !== "possessive") {
        blockReason = "naturally-possessed-nounstem-requires-possessive-state";
      } else if (naturalPossessionPolicy === "never-possessive" && state === "possessive" && !metaphoricalOverride) {
        blockReason = "nounstem-never-possessive-without-metaphorical-override";
      }
      const lesson15StemOperationRecord = nncSourceAuthorityFrame.lesson15StemOperationRecord;
      const lesson15PossessorReduplicationSelection = nncSourceAuthorityFrame.lesson15PossessorReduplicationSelection;
      const looseStemOperationRequested = Boolean(options.suppletivePossessiveStem || options.secondaryGeneralUseStem || options.analogicalRestrictedUseStem || options.reclassifyTl2ATo1A === true);
      const looseReduplicationRequested = options.reduplicatePossessor === true;
      if (!blockReason && looseStemOperationRequested) {
        blockReason = "lesson15-stem-operation-requires-typed-source-record";
      } else if (!blockReason && looseReduplicationRequested) {
        blockReason = "possessor-reduplication-requires-typed-source-selection";
      } else if (!blockReason && !isClassicalNahuatlLesson15StemOperationRecord(lesson15StemOperationRecord)) {
        blockReason = "authorized-lesson15-stem-operation-record-required";
      } else if (!blockReason && !isClassicalNahuatlLesson15PossessorReduplicationSelection(lesson15PossessorReduplicationSelection)) {
        blockReason = "authorized-lesson15-possessor-reduplication-selection-required";
      }
      const requestedStemOperations = lesson15StemOperationRecord?.operation === "regular" ? [] : [lesson15StemOperationRecord?.operation || ""];
      const appliedActions = [];
      const rejectedActions = [];
      let selectedStem = nncSlotFrame?.slots?.predicate?.stem || "";
      if (!blockReason && requestedStemOperations[0] === "yo-matrix") {
        if (state !== "possessive") {
          blockReason = "lesson15-yo-matrix-requires-possessive-state";
        } else {
          const boundaryAllomorph = getClassicalNahuatlNncLastSound(selectedStem) === "l" ? "l" : "y";
          const suffix = `${boundaryAllomorph}${subjectNumber === "plural" ? "ō" : "o"}`;
          selectedStem = `${selectedStem}-${suffix}`;
          if (subjectNumber !== "plural") {
            nncSlotFrame.slots.number.num1 = "0";
            nncSlotFrame.slots.number.num2 = "0";
          }
          appliedActions.push({
            action: "realize-lesson15-yo-matrix-at-stem-boundary",
            matrix: "(-yō)-tl-",
            boundaryAllomorph,
            suffix,
            selectedStem,
            authority: lesson15StemOperationRecord.selectionAuthority
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "suppletive") {
        const authority = lesson15StemOperationRecord.selectionAuthority;
        const suppletiveStem = lesson15StemOperationRecord.targetStem;
        if (state !== "possessive") blockReason = "possessive-suppletive-stem-requires-possessive-state";else if (!["user-supplied-lexical-analysis", "external-lexical-record", "canvas-predicate-option"].includes(authority)) {
          blockReason = "suppletive-stem-requires-lexical-selection-authority";
        } else if (!suppletiveStem || suppletiveStem === selectedStem) blockReason = "distinct-suppletive-stem-required";else {
          selectedStem = suppletiveStem;
          const suppletiveConnector = lesson15StemOperationRecord.suppletiveConnector === "class-governed" ? "" : lesson15StemOperationRecord.suppletiveConnector;
          if (subjectNumber !== "plural" && suppletiveConnector) {
            const connectorDyads = {
              uh: ["uh", "0"],
              hui: ["hui", "0"],
              "0": ["0", "0"],
              "⎕": ["⎕", "0"]
            };
            const selectedDyad = connectorDyads[suppletiveConnector];
            if (!selectedDyad) {
              blockReason = "unknown-suppletive-singular-connector";
            } else {
              [nncSlotFrame.slots.number.num1, nncSlotFrame.slots.number.num2] = selectedDyad;
            }
          }
          if (!blockReason) appliedActions.push({
            action: "substitute-lexically-authorized-possessive-stem",
            authority,
            selectedStem,
            selectedNumberDyad: [nncSlotFrame.slots.number.num1, nncSlotFrame.slots.number.num2]
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "secondary-general-use") {
        const innerCarrier = lesson15StemOperationRecord.secondaryPossessorCarrier;
        const secondaryStem = lesson15StemOperationRecord.selectionAuthority === "canvas-predicate-option" ? `${innerCarrier}-${selectedStem}` : lesson15StemOperationRecord.targetStem;
        const carrierAllowed = ["tē", "ti", "t"].includes(innerCarrier);
        if (state !== "possessive") blockReason = "secondary-general-use-stem-requires-possessive-state";else if (!carrierAllowed || !secondaryStem || !secondaryStem.toLowerCase().startsWith(`${innerCarrier}-`)) {
          blockReason = "secondary-general-use-stem-must-contain-selected-inner-possessor-carrier";
        } else {
          selectedStem = secondaryStem;
          appliedActions.push({
            action: "downgrade-inner-possessive-predicate-to-general-use-stem",
            innerCarrier,
            selectedStem
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "analogical-restricted-use") {
        const analogicalStem = lesson15StemOperationRecord.selectionAuthority === "canvas-predicate-option" ? `tla-${selectedStem}` : lesson15StemOperationRecord.targetStem;
        if (!analogicalStem || !/^tla-/u.test(analogicalStem) || analogicalStem === selectedStem) {
          blockReason = "analogical-restricted-use-stem-must-be-a-distinct-tla-derived-stem";
        } else {
          selectedStem = analogicalStem;
          appliedActions.push({
            action: "downgrade-tla-possessive-predicate-to-restricted-use-stem",
            selectedStem
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "tl-2a-to-1a") {
        const reclassifiedStem = lesson15StemOperationRecord.targetStem;
        const sourceIsTl2A = classGovernedFrame.sourceFrame?.nounClass === "tl" && classGovernedFrame.connectorSelectionFrame?.tlSubclass === "2A" && classGovernedFrame.sourceFrame?.generalUseShape === "truncated" && classGovernedFrame.sourceFrame?.ephemeralFinalVowel === "i";
        if (state !== "possessive" || subjectNumber === "plural") blockReason = "tl-2a-to-1a-reclassification-requires-possessive-singular-common";else if (!sourceIsTl2A) blockReason = "tl-2a-source-frame-required-for-1a-reclassification";else if (!reclassifiedStem || !isClassicalNahuatlNncVowelSound(getClassicalNahuatlNncLastSound(reclassifiedStem))) {
          blockReason = "reclassified-tl-1a-stem-must-end-in-vowel";
        } else {
          selectedStem = reclassifiedStem;
          nncSlotFrame.slots.number.num1 = "uh";
          nncSlotFrame.slots.number.num2 = "0";
          nncSlotFrame.lesson15ReclassifiedNounClass = {
            nounClass: "tl",
            fromSubclass: "2A",
            toSubclass: "1A"
          };
          appliedActions.push({
            action: "reclassify-tl-2a-as-tl-1a",
            selectedStem
          });
        }
      }
      if (nncSlotFrame && !blockReason) {
        nncSlotFrame.slots.predicate.stem = selectedStem;
        const possessivePluralBoundary = state === "possessive" && nncSlotFrame.slots.number.num1 === "hu" && nncSlotFrame.slots.number.num2 === "ān";
        if (possessivePluralBoundary && /uh$/u.test(selectedStem)) {
          const assimilatedStem = selectedStem.slice(0, -2);
          appliedActions.push({
            action: "delete-final-voiceless-w-before-possessive-plural-number-dyad",
            inputStem: selectedStem,
            outputStem: assimilatedStem
          });
          selectedStem = assimilatedStem;
          nncSlotFrame.slots.predicate.stem = selectedStem;
        } else if (possessivePluralBoundary && /n$/u.test(selectedStem)) {
          const assimilatedStem = selectedStem.slice(0, -1);
          appliedActions.push({
            action: "assimilate-final-n-before-possessive-plural-number-dyad",
            inputStem: selectedStem,
            outputStem: assimilatedStem,
            spellingAlternative: `${selectedStem}hu-ān`
          });
          selectedStem = assimilatedStem;
          nncSlotFrame.slots.predicate.stem = selectedStem;
        }
        if (lesson15PossessorReduplicationSelection.selected === true) {
          const stateSlots = nncSlotFrame.slots.state.slots || [];
          if (state !== "possessive" || nncSlotFrame.slots.state.arity !== "dyadic" || subjectNumber !== "plural") {
            blockReason = "possessor-reduplication-requires-dyadic-possessive-plural-subject";
            rejectedActions.push("reduplicate-possessor-dyad");
          } else {
            nncSlotFrame.slots.state.arity = "reduplicated-dyadic";
            nncSlotFrame.slots.state.slots = [cloneClassicalNahuatlNncValue(stateSlots[0]), cloneClassicalNahuatlNncValue(stateSlots[1]), cloneClassicalNahuatlNncValue(stateSlots[0]), cloneClassicalNahuatlNncValue(stateSlots[1])];
            appliedActions.push({
              action: "reduplicate-typed-possessor-dyad",
              grammaticalNumberValue: "none"
            });
          }
        }
        if (state === "possessive") {
          nncSlotFrame.slots.state.nuclearPossessorRole = "nuclear-basic-possessor";
          nncSlotFrame.slots.state.supplementaryPossessorRole = "outside-nnc-nucleus";
        }
        const sourceFormation = classGovernedFrame.derivedStemFrame?.stemFormation || "plain";
        const sourceAnimacy = normalizeClassicalNahuatlNncToken(options.animacy || classGovernedFrame.lowerNncFrame?.numberFrame?.animacy || "").toLowerCase();
        nncSlotFrame.lesson15DerivedNonanimateReading = {
          active: state === "possessive" && sourceFormation !== "plain" && sourceAnimacy === "nonanimate",
          subjectNumber,
          EnglishPluralTranslationDoesNotChangeGrammarNumber: true
        };
        nncSlotFrame.appliedLayerIds = Array.from(new Set([...(nncSlotFrame.appliedLayerIds || []), "lesson15-higher-ordinary-nnc-conditions"]));
        nncSlotFrame.semanticIdentity = [nncSlotFrame.semanticIdentity, selectedStem, naturalPossessionPolicy, ...appliedActions.map(action => action.action)].join("|");
      }
      const typedTransformed = !blockReason && isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const layerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame({
        nncSlotFrame: typedTransformed ? nncSlotFrame : null,
        highestActiveLesson: 15
      });
      const sentenceHandoffFrame = buildClassicalNahuatlLesson15SentenceHandoffFrame(typedTransformed ? nncSlotFrame : null, options);
      const authorized = !blockReason && layerEvaluationFrame.authorizationStatus === "authorized" && sentenceHandoffFrame.authorizationStatus !== "blocked";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const finalBlockReason = authorized ? "" : blockReason || sentenceHandoffFrame.blockReason || layerEvaluationFrame.blockReason;
      const operationFrame = {
        kind: "classical-nahuatl-lesson15-operation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: finalBlockReason,
        naturalPossessionPolicy,
        metaphoricalOverride,
        lesson15StemOperationRecord,
        lesson15PossessorReduplicationSelection,
        requestedStemOperations,
        appliedActions,
        rejectedActions,
        possessorRole: state === "possessive" ? "nuclear-basic-possessor" : "not-applicable",
        lexicalExamplesAreRuleWhitelist: false,
        prohibitedDerivationRecords: [{
          sourceStem: "*(tēcu-i)-tl",
          rejectedOutput: "totēcuiyo",
          reason: "Canvas rejects a source stem tecu-i and treats the priestly form as spurious",
          transcriptionLineStart: 5199,
          transcriptionLineEnd: 5211
        }],
        legalWitnessTagIds: CLASSICAL_NAHUATL_LESSON15_RULES.map(rule => rule.id)
      };
      const proofFrame = {
        kind: "classical-nahuatl-lesson15-logic-proof-frame",
        lesson: "Andrews Lesson 15",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson14-class-governed-input",
          passed: inputIsLesson14Frame && typedInput,
          consumedFrameKind: classGovernedFrame?.kind || ""
        }, {
          layer: "lesson15-typed-operations",
          passed: !blockReason,
          operationFrame
        }, {
          layer: "lesson15-sentence-handoff",
          passed: sentenceHandoffFrame.authorizationStatus !== "blocked",
          sentenceHandoffFrame
        }, {
          layer: "lesson15-typed-finalizer",
          passed: authorized,
          layerEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: finalBlockReason,
          formulaRealization,
          finalizerLayerId: layerEvaluationFrame.finalizerLayerId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l15-further-nnc-conditions", ...CLASSICAL_NAHUATL_LESSON15_RULES.map(rule => rule.id)]
      };
      return {
        kind: "classical-nahuatl-lesson15-higher-nnc-frame",
        lesson: "Andrews Lesson 15",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: finalBlockReason,
        inputClassGovernedFrame: classGovernedFrame,
        nncSourceAuthorityFrame,
        operationFrame,
        sentenceHandoffFrame,
        nncSlotFrame,
        layerEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots-after-lesson15-higher-condition-finalizer",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlLesson15Rules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        sentenceSurfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson16Subtype(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_]/gu, "-");
      const aliases = {
        "personal-simple": "personal-simple",
        "personal-compound": "personal-compound",
        "personal-compound-derived": "personal-compound-derived",
        personal: "personal-simple",
        interrogative: "interrogative",
        "quantitive-personal-compound": "quantitive-personal-compound",
        demonstrative: "demonstrative",
        indefinite: "indefinite",
        quantitive: "quantitive",
        quantitative: "quantitive",
        relative: "relative"
      };
      return aliases[key] || "";
    }
    function normalizeClassicalNahuatlLesson16QuantitiveMatrixFamily(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_]/gu, "-");
      return {
        quich: "qui-ch",
        "qui-ch": "qui-ch",
        qui: "quī",
        "quī": "quī",
        chi: "chī",
        "chī": "chī"
      }[key] || "";
    }
    function buildClassicalNahuatlLesson16QuantitiveAuthorityRecord(options = {}) {
      const matrixFamily = normalizeClassicalNahuatlLesson16QuantitiveMatrixFamily(options.matrixFamily || options.quantitiveMatrix || "");
      const matrixForm = normalizeClassicalNahuatlNncStem(options.matrixForm || options.matrixAllomorph || "");
      const embedStem = normalizeClassicalNahuatlNncStem(options.embedStem || options.quantitiveEmbed || "");
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3common");
      const pluralSubject = subject.endsWith("pl");
      const allowedMatrixForms = {
        "qui-ch": ["qui-ch"],
        "quī": ["quī", "quih", "qui", "c"],
        "chī": ["chī", "chih", "chi", "ch"]
      }[matrixFamily] || [];
      const requestedPluralization = normalizeClassicalNahuatlNncToken(options.predicatePluralization || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicatePluralization = pluralSubject ? matrixFamily === "qui-ch" ? requestedPluralization || "plain-qui-ch" : requestedPluralization : "not-applicable";
      const plainVariantForms = ["quī", "qui", "c", "chī", "chi", "ch"];
      const plainVariantLexicallyAuthorized = options.plainVariantLexicallyAuthorized === true;
      const longPluralMatrixForm = matrixFamily === "quī" ? "quī" : matrixFamily === "chī" ? "chī" : "";
      const selectedStem = embedStem && matrixForm ? `${embedStem}-${matrixForm}` : "";
      const pluralizedStem = predicatePluralization === "internal-n" && embedStem && longPluralMatrixForm ? `${embedStem}-${longPluralMatrixForm}-n` : "";
      let allowedSubjectNumberDyads = [];
      if (pluralSubject && predicatePluralization === "plain-qui-ch") {
        allowedSubjectNumberDyads = ["t-in"];
      } else if (pluralSubject && predicatePluralization === "internal-n") {
        allowedSubjectNumberDyads = ["t-in", "silent-silent"];
      } else if (pluralSubject && predicatePluralization === "plain-variant" && ["c", "ch"].includes(matrixForm)) {
        allowedSubjectNumberDyads = ["t-in"];
      } else if (pluralSubject && predicatePluralization === "plain-variant" && ["quī", "qui", "chī", "chi"].includes(matrixForm)) {
        allowedSubjectNumberDyads = ["m-eh"];
      }
      let blockReason = "";
      if (!embedStem) {
        blockReason = "quantitive-embed-stem-required";
      } else if (!matrixFamily) {
        blockReason = "typed-quantitive-matrix-family-required";
      } else if (!allowedMatrixForms.includes(matrixForm)) {
        blockReason = "selected-quantitive-matrix-form-not-authorized-for-family";
      } else if (embedStem === "ce" && matrixForm === "c") {
        blockReason = "ce-c-is-embed-only-not-a-complete-pronominal-nnc-source";
      } else if (pluralSubject && !["plain-qui-ch", "internal-n", "plain-variant"].includes(predicatePluralization)) {
        blockReason = "typed-quantitive-predicate-pluralization-required";
      } else if (matrixFamily === "qui-ch" && predicatePluralization !== (pluralSubject ? "plain-qui-ch" : "not-applicable")) {
        blockReason = "qui-ch-matrix-cannot-acquire-internal-plural-n";
      } else if (predicatePluralization === "plain-variant" && !plainVariantForms.includes(matrixForm)) {
        blockReason = "plain-quantitive-plural-variant-requires-lexically-witnessed-qui-chi-c-or-ch-form";
      } else if (predicatePluralization === "plain-variant" && !plainVariantLexicallyAuthorized) {
        blockReason = "plain-quantitive-plural-variant-requires-explicit-lexical-authorization";
      } else if (pluralSubject && !allowedSubjectNumberDyads.length) {
        blockReason = "quantitive-predicate-pluralization-has-no-authorized-subject-number-dyad";
      }
      return {
        kind: "classical-nahuatl-lesson16-quantitive-authority-record",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        subject,
        embedStem,
        matrixFamily,
        matrixForm,
        allowedMatrixForms,
        selectedStem,
        predicatePluralization,
        pluralizedStem,
        internalPluralMorph: predicatePluralization === "internal-n" ? "n-inside-stem" : "none",
        internalPluralBelongsTo: "predicate-stem-derivation",
        allowedSubjectNumberDyads,
        plainVariantLexicallyAuthorized,
        interrogativeMeaning: options.interrogativeMeaning === true,
        matrixFormSelectionAuthority: "typed-user-selection",
        predicatePluralizationSelectionAuthority: predicatePluralization === "plain-variant" ? "typed-user-supplied-lexical-analysis" : "typed-canvas-consequence",
        deploymentFullyPredictable: false,
        shortAndLongIShareTypedValue: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l16-167-quantitive-matrices", matrixFamily === "qui-ch" ? "cn-l16-168-quich-family" : "cn-l16-169-qui-chi-family"]
      };
    }
    function isClassicalNahuatlLesson16QuantitiveAuthorityRecord(record = null) {
      return Boolean(record && record.kind === "classical-nahuatl-lesson16-quantitive-authority-record" && record.sourceAuthority === "Andrews transcription" && record.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT && ["authorized", "blocked"].includes(record.authorizationStatus) && typeof record.subject === "string" && typeof record.embedStem === "string" && ["qui-ch", "quī", "chī"].includes(record.matrixFamily) && typeof record.matrixForm === "string" && Array.isArray(record.allowedMatrixForms) && (record.authorizationStatus === "blocked" || record.allowedMatrixForms.includes(record.matrixForm)) && ["not-applicable", "plain-qui-ch", "internal-n", "plain-variant"].includes(record.predicatePluralization) && Array.isArray(record.allowedSubjectNumberDyads) && record.internalPluralBelongsTo === "predicate-stem-derivation" && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function hasLooseClassicalNahuatlLesson16QuantitiveClaim(options = {}) {
      return ["quantitiveMatrix", "matrixFamily", "quantitiveEmbed", "embedStem", "matrixAllomorph", "matrixForm", "predicatePluralization", "plainPluralVariantAuthorized", "plainVariantLexicallyAuthorized"].some(key => Object.prototype.hasOwnProperty.call(options, key));
    }
    function resolveClassicalNahuatlLesson16ContextIdentity(options = {}) {
      const subtype = normalizeClassicalNahuatlLesson16Subtype(options.subtype || options.pronominalSubtype || "");
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      let subtypeDetail = "";
      if (subtype === "personal-simple") subtypeDetail = "personal-simple-eh";else if (subtype === "personal-compound") subtypeDetail = "personal-compound-eh-huā";else if (subtype === "personal-compound-derived") subtypeDetail = "personal-compound-derived-common-number";else if (subtype === "interrogative") {
        const kind = normalizeClassicalNahuatlNncToken(options.interrogativeKind || "tleh").toLowerCase();
        subtypeDetail = {
          tleh: "what-entity",
          "tleh-huā": "what-entity-compound",
          "tleh-hua": "what-entity-compound",
          cā: "which-entity",
          ca: "which-entity",
          āc: "what-person",
          ac: "what-person"
        }[kind] || "";
      } else if (subtype === "demonstrative") subtypeDetail = "demonstrative";else if (subtype === "indefinite") {
        subtypeDetail = normalizeClassicalNahuatlNncToken(options.indefiniteKind || "someone").toLowerCase();
      } else if (subtype === "quantitive") {
        const quantitiveAuthorityRecord = options.quantitiveAuthorityRecord;
        subtypeDetail = isClassicalNahuatlLesson16QuantitiveAuthorityRecord(quantitiveAuthorityRecord) ? quantitiveAuthorityRecord.matrixFamily : "";
      } else if (subtype === "quantitive-personal-compound") subtypeDetail = "quantitive-personal-compound";
      const referentKey = normalizeClassicalNahuatlNncToken(options.subjectReferentCategory || options.subjectReferentAnimacy || "").toLowerCase();
      const humanSubject = ["1sg", "2sg", "1pl", "2pl"].includes(subject) || referentKey === "human";
      return {
        subtype,
        subtypeDetail,
        subject,
        subjectReferentCategory: humanSubject ? "human" : referentKey === "nonhuman" ? "nonhuman" : "unspecified",
        humanSubject
      };
    }
    function buildClassicalNahuatlLesson16ContextSelectionRecord(options = {}) {
      const identity = resolveClassicalNahuatlLesson16ContextIdentity(options);
      const doubledFirstPluralSelected = options.doubledFirstPluralSelected === true;
      const dependentClauseIntroducedByInSelected = options.dependentClauseIntroducedByInSelected === true;
      const specialHumanUseSelected = options.specialHumanUseSelected === true;
      const doubledFirstPluralAvailable = identity.subtype === "personal-compound" && identity.subject === "1pl";
      const dependentClauseIntroducedByInAvailable = identity.subtype === "interrogative" && ["what-entity", "what-person"].includes(identity.subtypeDetail);
      const specialHumanUseAvailable = identity.subtype === "indefinite" && identity.subtypeDetail === "something" && identity.humanSubject;
      let blockReason = "";
      if (doubledFirstPluralSelected && !doubledFirstPluralAvailable) {
        blockReason = "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc";
      } else if (dependentClauseIntroducedByInSelected && !dependentClauseIntroducedByInAvailable) {
        blockReason = "dependent-in-clause-is-limited-to-tleh-or-ac-principal-clause-nncs";
      } else if (specialHumanUseSelected && !specialHumanUseAvailable) {
        blockReason = "special-human-itlah-selection-is-limited-to-itlah-with-a-human-subject";
      } else if (specialHumanUseAvailable && !specialHumanUseSelected) {
        blockReason = "itlah-with-human-subject-requires-special-situation-selection";
      }
      return {
        kind: "classical-nahuatl-lesson16-context-selection-record",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        subtype: identity.subtype,
        subtypeDetail: identity.subtypeDetail,
        subject: identity.subject,
        subjectReferentCategory: identity.subjectReferentCategory,
        doubledFirstPlural: {
          selectionId: "lesson16.3-doubled-first-plural",
          selected: doubledFirstPluralSelected,
          available: doubledFirstPluralAvailable,
          contextualMeaning: doubledFirstPluralSelected ? "member-or-members-of-our-people" : ""
        },
        dependentClauseIntroducedByIn: {
          selectionId: "lesson16.4-dependent-clause-introduced-by-in",
          selected: dependentClauseIntroducedByInSelected,
          available: dependentClauseIntroducedByInAvailable,
          writingPolicy: dependentClauseIntroducedByInSelected ? "write-pronominal-nnc-and-in-separately" : "no-dependent-clause-writing-decision"
        },
        specialHumanUse: {
          selectionId: "lesson16.6-special-human-itlah-use",
          selected: specialHumanUseSelected,
          available: specialHumanUseAvailable,
          required: specialHumanUseAvailable
        },
        selectionAuthority: "typed-user-context-selection",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l16-1634-doubled-first-plural", "cn-l16-164-identificational-interrogative", "cn-l16-166-indefinite"]
      };
    }
    function isClassicalNahuatlLesson16ContextSelectionRecord(record = null) {
      const selections = [record?.doubledFirstPlural, record?.dependentClauseIntroducedByIn, record?.specialHumanUse];
      return Boolean(record && record.kind === "classical-nahuatl-lesson16-context-selection-record" && record.sourceAuthority === "Andrews transcription" && record.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT && ["authorized", "blocked"].includes(record.authorizationStatus) && typeof record.subtype === "string" && typeof record.subtypeDetail === "string" && typeof record.subject === "string" && selections.every(selection => selection && typeof selection.selectionId === "string" && typeof selection.selected === "boolean" && typeof selection.available === "boolean") && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function hasLooseClassicalNahuatlLesson16ContextClaim(options = {}) {
      return ["doubledFirstPluralPerson", "dependentClauseIntroducedByIn", "adjunctInPresent", "adjunctClausePresent", "specialHumanUse"].some(key => Object.prototype.hasOwnProperty.call(options, key));
    }
    function resolveClassicalNahuatlLesson16PronominalSourceCategories({
      subtype = "",
      subtypeDetail = "",
      semanticKind = "",
      composition = null
    } = {}) {
      let nounClass = "zero";
      if (["personal-compound", "personal-compound-derived", "quantitive-personal-compound"].includes(subtype) || subtypeDetail === "what-entity-compound") {
        nounClass = "tl";
      } else if (subtypeDetail === "which-entity") {
        nounClass = composition?.matrixNumberClass === "zero" ? "zero" : "tl";
      } else if (subtypeDetail === "what-person") {
        nounClass = "c";
      }
      const referentCategory = semanticKind === "quantitive" ? "quantity" : ["what-person", "someone"].includes(subtypeDetail) ? "person" : "entity";
      return {
        nounClass,
        nounClassAuthority: "typed-canvas-pronominal-source-structure",
        referentCategory,
        referentCategoryAuthority: "typed-canvas-pronominal-semantic-kind"
      };
    }
    function buildClassicalNahuatlLesson16PronominalSourceFrame(options = {}) {
      const subtype = normalizeClassicalNahuatlLesson16Subtype(options.subtype || options.pronominalSubtype || "");
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const suppliedQuantitiveAuthorityRecord = options.quantitiveAuthorityRecord;
      const quantitiveAuthorityRecord = isClassicalNahuatlLesson16QuantitiveAuthorityRecord(suppliedQuantitiveAuthorityRecord) ? suppliedQuantitiveAuthorityRecord : null;
      const hasSuppliedContextSelection = Object.prototype.hasOwnProperty.call(options, "contextSelectionRecord");
      const suppliedContextSelection = options.contextSelectionRecord;
      const contextSelectionRecord = isClassicalNahuatlLesson16ContextSelectionRecord(suppliedContextSelection) ? suppliedContextSelection : hasSuppliedContextSelection ? null : buildClassicalNahuatlLesson16ContextSelectionRecord(options);
      const pluralSubject = subject.endsWith("pl");
      const thirdPerson = ["3sg", "3pl", "3common"].includes(subject);
      const requestedState = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      let semanticKind = "";
      let sourceStem = "";
      let structuralPluralType = "plain-stem";
      let inherentInterrogative = false;
      let subtypeDetail = "";
      let blockReason = "";
      let composition = null;
      if (requestedState !== "absolutive") {
        blockReason = "pronominal-nncs-occur-only-in-absolutive-state";
      } else if (subtype === "relative") {
        blockReason = "canvas-has-no-relative-pronominal-nnc-subtype";
      } else if (subtype === "personal-simple") {
        semanticKind = "entitive";
        subtypeDetail = "personal-simple-eh";
        sourceStem = thirdPerson && options.thirdCommonVariant !== "eh" ? "yeh" : "eh";
      } else if (subtype === "personal-compound") {
        semanticKind = "entitive";
        subtypeDetail = "personal-compound-eh-huā";
        sourceStem = thirdPerson && options.thirdCommonVariant !== "eh" ? "yeh-huā" : "eh-huā";
        structuralPluralType = "internally-pluralized-stem";
      } else if (subtype === "personal-compound-derived") {
        semanticKind = "entitive";
        subtypeDetail = "personal-compound-derived-common-number";
        sourceStem = normalizeClassicalNahuatlNncStem(options.derivedPersonalStem || "");
        structuralPluralType = "plain-stem";
        composition = {
          derivationalRelation: normalizeClassicalNahuatlNncToken(options.derivedPersonalRelation || "distributive-varietal").toLowerCase(),
          matrix: "eh-huā"
        };
        if (!sourceStem) blockReason = "derived-personal-compound-stem-required";else if (subject !== "3common") blockReason = "derived-personal-compound-requires-third-common-subject";
      } else if (subtype === "interrogative") {
        semanticKind = "entitive";
        inherentInterrogative = true;
        const kind = normalizeClassicalNahuatlNncToken(options.interrogativeKind || "tleh").toLowerCase();
        const stems = {
          tleh: "tl-eh",
          "tleh-huā": "tl-eh-huā",
          "tleh-hua": "tl-eh-huā",
          cā: "cā",
          ca: "cā",
          āc: "ā-0",
          ac: "ā-0"
        };
        const simpleInterrogativeStem = stems[kind] || "";
        sourceStem = normalizeClassicalNahuatlNncStem(options.compoundInterrogativeStem || simpleInterrogativeStem);
        subtypeDetail = {
          tleh: "what-entity",
          "tleh-huā": "what-entity-compound",
          "tleh-hua": "what-entity-compound",
          cā: "which-entity",
          ca: "which-entity",
          āc: "what-person",
          ac: "what-person"
        }[kind] || "";
        if (!sourceStem || !subtypeDetail) blockReason = "unknown-identificational-interrogative-kind";else if (subtypeDetail === "what-person" && subject !== "3sg") blockReason = "ac-interrogative-requires-third-singular-subject";else if (subtypeDetail === "which-entity" && !thirdPerson) blockReason = "ca-interrogative-requires-third-person-subject";
        if (subtypeDetail === "what-entity-compound") structuralPluralType = "internally-pluralized-stem";
        if (sourceStem && sourceStem !== simpleInterrogativeStem) {
          composition = {
            embed: normalizeClassicalNahuatlNncStem(options.compoundInterrogativeEmbed || ""),
            matrix: normalizeClassicalNahuatlNncStem(options.compoundInterrogativeMatrix || ""),
            matrixNumberClass: normalizeClassicalNahuatlNncToken(options.compoundInterrogativeNumberClass || "zero").toLowerCase()
          };
          if (subtypeDetail === "which-entity" && composition.matrix === "tl-e-in") {
            structuralPluralType = "fused-in-to-i-plus-m-eh";
          } else if (subtypeDetail === "which-entity" && /huā$/u.test(composition.matrix)) {
            structuralPluralType = "internally-pluralized-stem";
          }
        }
      } else if (subtype === "demonstrative") {
        semanticKind = "entitive";
        subtypeDetail = "demonstrative";
        const demonstrative = normalizeClassicalNahuatlNncToken(options.demonstrative || "īn").toLowerCase();
        sourceStem = {
          "īn": "īn",
          in: "īn",
          "ōn": "ōn",
          on: "ōn"
        }[demonstrative] || "";
        if (!sourceStem) blockReason = "unknown-demonstrative-pronominal-stem";else if (!thirdPerson) blockReason = "demonstrative-pronominal-nnc-requires-third-person-subject";
      } else if (subtype === "indefinite") {
        semanticKind = "entitive";
        const kind = normalizeClassicalNahuatlNncToken(options.indefiniteKind || "someone").toLowerCase();
        sourceStem = {
          someone: "a-c-ah",
          something: "itl-ah"
        }[kind] || "";
        subtypeDetail = kind;
        composition = sourceStem ? {
          embed: kind === "someone" ? "a-c" : "itl",
          matrix: "ah",
          embedVowelLengthAction: "remove-length-before-ah-matrix"
        } : null;
        if (!sourceStem) blockReason = "unknown-indefinite-pronominal-stem";
      } else if (subtype === "quantitive") {
        semanticKind = "quantitive";
        if (hasLooseClassicalNahuatlLesson16QuantitiveClaim(options)) {
          blockReason = "loose-lesson16-quantitive-claims-are-not-authority";
        } else if (!quantitiveAuthorityRecord) {
          blockReason = "typed-lesson16-quantitive-authority-record-required";
        } else if (quantitiveAuthorityRecord.subject !== subject) {
          blockReason = "lesson16-quantitive-authority-record-does-not-match-subject";
        } else if (quantitiveAuthorityRecord.authorizationStatus !== "authorized") {
          blockReason = quantitiveAuthorityRecord.blockReason || "lesson16-quantitive-authority-record-not-authorized";
        } else {
          sourceStem = quantitiveAuthorityRecord.selectedStem;
          subtypeDetail = quantitiveAuthorityRecord.matrixFamily;
          structuralPluralType = quantitiveAuthorityRecord.predicatePluralization === "internal-n" ? "internally-pluralized-stem" : "plain-stem";
          composition = {
            embed: quantitiveAuthorityRecord.embedStem,
            matrixFamily: subtypeDetail,
            matrixAllomorph: quantitiveAuthorityRecord.matrixForm,
            matrixAllomorphSelectionAuthority: quantitiveAuthorityRecord.matrixFormSelectionAuthority,
            predicatePluralization: quantitiveAuthorityRecord.predicatePluralization,
            deploymentFullyPredictable: quantitiveAuthorityRecord.deploymentFullyPredictable
          };
          inherentInterrogative = quantitiveAuthorityRecord.interrogativeMeaning === true;
        }
      } else if (subtype === "quantitive-personal-compound") {
        semanticKind = "quantitive";
        subtypeDetail = "quantitive-personal-compound";
        const embed = normalizeClassicalNahuatlNncStem(options.quantitiveEmbed || options.embedStem || "");
        const matrix = normalizeClassicalNahuatlNncStem(options.quantitivePersonalMatrix || options.matrixStem || "");
        if (!embed) blockReason = "quantitive-personal-compound-embed-required";else if (matrix !== "eh-huā") blockReason = "quantitive-personal-compound-requires-eh-huā-matrix";else {
          sourceStem = `${embed}-${matrix}`;
          structuralPluralType = "internally-pluralized-stem";
          composition = {
            embed,
            matrix,
            matrixFamily: "personal-compound-eh-huā"
          };
        }
      } else if (!blockReason) {
        blockReason = "unknown-pronominal-nnc-subtype";
      }
      if (!blockReason && hasLooseClassicalNahuatlLesson16ContextClaim(options)) {
        blockReason = "loose-lesson16-context-claims-are-not-authority";
      } else if (!blockReason && !contextSelectionRecord) {
        blockReason = "typed-lesson16-context-selection-record-required";
      } else if (!blockReason && (contextSelectionRecord.subtype !== subtype || contextSelectionRecord.subtypeDetail !== subtypeDetail || contextSelectionRecord.subject !== subject)) {
        blockReason = "lesson16-context-selection-does-not-match-pronominal-source";
      } else if (!blockReason && contextSelectionRecord.authorizationStatus !== "authorized") {
        blockReason = contextSelectionRecord.blockReason || "lesson16-context-selection-not-authorized";
      }
      const enteredStem = normalizeClassicalNahuatlNncStem(options.enteredStem || options.sourceStem || "");
      if (!blockReason && options.requireEnteredStem === true && !enteredStem) {
        blockReason = "pronominal-nnc-entered-stem-required";
      } else if (!blockReason && enteredStem && enteredStem !== sourceStem) {
        blockReason = "entered-stem-does-not-match-selected-pronominal-nnc-analysis";
      }
      const sourceCategories = resolveClassicalNahuatlLesson16PronominalSourceCategories({
        subtype,
        subtypeDetail,
        semanticKind,
        composition
      });
      const authorized = Boolean(!blockReason && subtype && subject && semanticKind && sourceStem);
      return {
        kind: "classical-nahuatl-lesson16-pronominal-source-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state: "absolutive",
        semanticKind,
        subtype,
        subtypeDetail,
        subject,
        enteredStem,
        enteredStemMatchesAnalysis: Boolean(enteredStem && enteredStem === sourceStem),
        enteredStemAuthority: options.requireEnteredStem === true ? "required-source-panel-stem" : "optional-verification-witness",
        sourceStem: authorized ? sourceStem : "",
        nounClass: authorized ? sourceCategories.nounClass : "",
        nounClassAuthority: sourceCategories.nounClassAuthority,
        referentCategory: authorized ? sourceCategories.referentCategory : "",
        referentCategoryAuthority: sourceCategories.referentCategoryAuthority,
        structuralPluralType,
        composition,
        inherentInterrogative,
        quantitiveAuthorityRecord,
        quantitiveAuthority: subtype === "quantitive" ? "typed-lesson16-quantitive-authority-record" : "not-applicable",
        contextSelectionRecord,
        contextSelectionAuthority: "typed-user-context-selection",
        EnglishPronounTranslationIsStructuralAuthority: false,
        relativePronounInventory: "none",
        legalWitnessTagIds: ["cn-l16-161-pronominal-family", "cn-l16-162-entitive-subtypes"]
      };
    }
    function pluralizeClassicalNahuatlLesson16InternalStem(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const supplied = normalizeClassicalNahuatlNncStem(options.pluralizedStem || "");
      if (supplied) {
        return /-n$/u.test(supplied) ? supplied : "";
      }
      if (/huā$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/quī$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/qui$/u.test(normalizedStem)) return normalizedStem.replace(/qui$/u, "quī-n");
      if (/chī$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/chi$/u.test(normalizedStem)) return normalizedStem.replace(/chi$/u, "chī-n");
      return "";
    }
    function resolveClassicalNahuatlLesson16PronominalNumberFrame(sourceFrame = null, options = {}) {
      const subject = sourceFrame?.subject || "";
      const plural = subject.endsWith("pl");
      const subtype = sourceFrame?.subtype || "";
      const detail = sourceFrame?.subtypeDetail || "";
      let predicateStem = sourceFrame?.sourceStem || "";
      let num1 = "";
      let num2 = "";
      let internalPluralMorph = "none";
      let numberVariant = "";
      let predicateStemAction = "identity";
      let blockReason = "";
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        blockReason = sourceFrame?.blockReason || "authorized-pronominal-source-frame-required";
      } else if (!plural) {
        const singularVariant = normalizeClassicalNahuatlNncToken(options.numberVariant || "sounded").toLowerCase();
        if (subtype === "personal-compound" || subtype === "personal-compound-derived" || subtype === "quantitive-personal-compound" || detail === "what-entity-compound") {
          if (singularVariant === "sounded") [num1, num2] = ["tl", "0"];else if (singularVariant === "silent") [num1, num2] = ["⎕", "0"];else blockReason = "compound-personal-singular-number-variant-must-be-sounded-or-silent";
          numberVariant = singularVariant;
        } else if (detail === "which-entity") {
          if (sourceFrame.composition?.matrixNumberClass === "zero") {
            [num1, num2] = ["0", "0"];
            numberVariant = "zero-zero";
          } else {
            [num1, num2] = ["tl", "0"];
            numberVariant = "sounded";
          }
        } else if (detail === "what-person") {
          [num1, num2] = ["c", "0"];
          numberVariant = "special-ac-c-zero";
        } else {
          [num1, num2] = ["0", "0"];
          numberVariant = "zero-zero";
        }
      } else if (subtype === "personal-simple") {
        [num1, num2] = ["m", "eh"];
        numberVariant = "m-eh";
      } else if (subtype === "demonstrative") {
        [num1, num2] = ["⎕", "⎕"];
        numberVariant = "silent-silent";
      } else if (subtype === "interrogative" && detail === "what-entity") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const dyad = {
          "m-eh": ["m", "eh"],
          "t-in": ["t", "in"]
        }[selected];
        if (dyad) [num1, num2] = dyad;else blockReason = "tleh-plural-connector-must-be-m-eh-or-t-in";
        numberVariant = selected;
      } else if (subtype === "indefinite") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const dyad = {
          "m-eh": ["m", "eh"],
          "t-in": ["t", "in"]
        }[selected];
        if (dyad) [num1, num2] = dyad;else blockReason = "indefinite-plural-connector-must-be-m-eh-or-t-in";
        numberVariant = selected;
      } else if (subtype === "interrogative" && detail === "which-entity" && sourceFrame.structuralPluralType === "fused-in-to-i-plus-m-eh") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const pluralStem = predicateStem.replace(/-in$/u, "-i");
        if (pluralStem === predicateStem) {
          blockReason = "ca-tlein-plural-requires-final-in-matrix";
        } else if (selected !== "m-eh") {
          blockReason = "ca-tlein-plural-number-dyad-must-be-m-eh";
        } else {
          predicateStem = pluralStem;
          [num1, num2] = ["m", "eh"];
          predicateStemAction = "realize-final-in-as-i-before-m-eh";
        }
        numberVariant = selected;
      } else if (subtype === "quantitive") {
        const quantitiveAuthorityRecord = sourceFrame.quantitiveAuthorityRecord;
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || quantitiveAuthorityRecord?.allowedSubjectNumberDyads?.[0] || "").toLowerCase();
        const dyad = {
          "t-in": ["t", "in"],
          "m-eh": ["m", "eh"],
          "silent-silent": ["⎕", "⎕"],
          "⎕-⎕": ["⎕", "⎕"]
        }[selected];
        if (!isClassicalNahuatlLesson16QuantitiveAuthorityRecord(quantitiveAuthorityRecord) || quantitiveAuthorityRecord.authorizationStatus !== "authorized") {
          blockReason = quantitiveAuthorityRecord?.blockReason || "authorized-typed-quantitive-record-required-for-plural-number";
        } else if (!quantitiveAuthorityRecord.allowedSubjectNumberDyads.includes(selected === "⎕-⎕" ? "silent-silent" : selected) || !dyad) {
          blockReason = "selected-subject-number-dyad-not-authorized-by-quantitive-record";
        } else if (quantitiveAuthorityRecord.predicatePluralization === "internal-n") {
          predicateStem = quantitiveAuthorityRecord.pluralizedStem;
          if (!predicateStem || !/-n$/u.test(predicateStem)) {
            blockReason = "typed-quantitive-internal-plural-n-stem-required";
          } else {
            predicateStemAction = "realize-long-quantitive-matrix-before-internal-plural-n";
            internalPluralMorph = "n-inside-stem";
          }
        } else if (!["plain-qui-ch", "plain-variant"].includes(quantitiveAuthorityRecord.predicatePluralization)) {
          blockReason = "typed-quantitive-predicate-pluralization-not-authorized-for-plural-subject";
        }
        if (dyad) [num1, num2] = dyad;
        numberVariant = selected === "⎕-⎕" ? "silent-silent" : selected;
      } else if (sourceFrame.structuralPluralType === "internally-pluralized-stem") {
        const plainVariant = options.plainPluralVariantAuthorized === true;
        if (plainVariant) {
          const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "t-in").toLowerCase();
          const dyad = {
            "t-in": ["t", "in"],
            "m-eh": ["m", "eh"]
          }[selected];
          if (!dyad) blockReason = "plain-pronominal-plural-variant-requires-t-in-or-m-eh";else [num1, num2] = dyad;
          numberVariant = selected;
        } else {
          predicateStem = pluralizeClassicalNahuatlLesson16InternalStem(predicateStem, options);
          if (!predicateStem) blockReason = "internal-pronominal-plural-n-requires-authorized-long-matrix-shape-or-typed-pluralized-stem";
          const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "t-in").toLowerCase();
          const dyad = {
            "t-in": ["t", "in"],
            "silent-silent": ["⎕", "⎕"],
            "⎕-⎕": ["⎕", "⎕"]
          }[selected];
          if (!dyad && !blockReason) blockReason = "internally-pluralized-pronominal-number-dyad-must-be-t-in-or-silent-silent";
          if (dyad) [num1, num2] = dyad;
          numberVariant = selected;
          internalPluralMorph = predicateStem ? "n-inside-stem" : "none";
        }
      } else {
        blockReason = "plural-pronominal-number-formation-not-authorized-for-subtype";
      }
      const authorized = Boolean(!blockReason && predicateStem && num1 && num2);
      return {
        kind: "classical-nahuatl-lesson16-pronominal-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        subject,
        subjectNumber: plural ? "plural" : subject === "3common" ? "common" : "singular",
        predicateStem: authorized ? predicateStem : "",
        nounClass: authorized ? sourceFrame.nounClass : "",
        nounClassAuthority: sourceFrame.nounClassAuthority || "",
        referentCategory: authorized ? sourceFrame.referentCategory : "",
        referentCategoryAuthority: sourceFrame.referentCategoryAuthority || "",
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        numberVariant,
        predicateStemAction,
        internalPluralMorph,
        internalPluralBelongsTo: "predicate-stem-derivation",
        subjectNumberBelongsTo: "subject-personal-pronoun",
        internalPluralIsSubjectNumberConnector: false,
        legalWitnessTagIds: subtype === "interrogative" ? ["cn-l16-161-pronominal-family", "cn-l16-164-identificational-interrogative", "cn-l16-1643-ca-tlein-plural"] : ["cn-l16-161-pronominal-family", "cn-l16-163-personal-pronominal", "cn-l16-169-qui-chi-family"]
      };
    }
    function buildClassicalNahuatlLesson16PronominalNncFrame(options = {}) {
      const sourceFrame = buildClassicalNahuatlLesson16PronominalSourceFrame(options);
      const contextSelectionRecord = sourceFrame.contextSelectionRecord;
      const numberFrame = resolveClassicalNahuatlLesson16PronominalNumberFrame(sourceFrame, options);
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: sourceFrame.subject || options.subject || "3sg",
        followingMaterial: numberFrame.predicateStem || sourceFrame.sourceStem
      });
      if (contextSelectionRecord?.doubledFirstPlural?.selected === true) {
        if (contextSelectionRecord.doubledFirstPlural.available === true && personFrame.authorizationStatus === "authorized") {
          personFrame.pers1 = "ti-t";
          personFrame.doubledFirstPluralPerson = true;
          personFrame.contextualMeaning = contextSelectionRecord.doubledFirstPlural.contextualMeaning;
        } else {
          personFrame.authorizationStatus = "blocked";
          personFrame.blockReason = "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc";
        }
      }
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const stateFrame = {
        kind: "classical-nahuatl-lesson16-absolutive-state-frame",
        state: "absolutive",
        arity: "vacant",
        slots: [],
        authorizationStatus: !forbiddenTense && !forbiddenValence ? "authorized" : "blocked",
        blockReason: forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : ""
      };
      const lesson4Builder = getClassicalNahuatlNncRuntimeTarget()?.buildClassicalNahuatlLesson4NuclearClauseFrame;
      const lesson4SourceStem = sourceFrame.subtypeDetail === "what-person" ? "ā" : numberFrame.predicateStem || sourceFrame.sourceStem;
      const lesson4Frame = sourceFrame.authorizationStatus === "authorized" && typeof lesson4Builder === "function" ? lesson4Builder(lesson4SourceStem, {
        formulaId: "nnc-state-vacant",
        nuclearClauseKind: "nominal-nuclear-clause",
        entryBoard: "ordinary-nnc",
        stateSlot: "vacant"
      }) : null;
      const lesson4Conclusion = lesson4Frame?.proofFrame?.conclusion || {};
      const lesson4Authorized = lesson4Conclusion.authorized === true && lesson4Conclusion.authorizedFormulaId === "nnc-state-vacant";
      const sourceAuthorized = Boolean(sourceFrame.authorizationStatus === "authorized" && numberFrame.authorizationStatus === "authorized" && personFrame.authorizationStatus === "authorized" && stateFrame.authorizationStatus === "authorized" && lesson4Authorized);
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-lesson16-pronominal-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: numberFrame.predicateStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        highestActiveLesson: 16,
        appliedLayerIds: ["lesson12-absolutive-subject-state", "lesson16-pronominal-nnc-family"],
        nncFamily: "pronominal"
      });
      nncSlotFrame.pronominalSemanticKind = sourceFrame.semanticKind;
      nncSlotFrame.pronominalSubtype = sourceFrame.subtype;
      nncSlotFrame.internalPluralMorph = numberFrame.internalPluralMorph;
      const clauseInitial = options.clauseInitial !== false;
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const interrogativeReadingActive = sourceFrame.inherentInterrogative && clauseInitial && polarity === "positive";
      const discourseFrame = {
        kind: "classical-nahuatl-lesson16-pronominal-discourse-frame",
        clauseInitial,
        polarity,
        inherentInterrogative: sourceFrame.inherentInterrogative,
        interrogativeReadingActive,
        noninterrogativeReason: sourceFrame.inherentInterrogative && !interrogativeReadingActive ? polarity === "negative" ? "negative-pronominal-nnc-loses-interrogative-quality" : "noninitial-pronominal-nnc-loses-interrogative-quality" : "",
        dependentClauseIntroducedByIn: contextSelectionRecord?.dependentClauseIntroducedByIn?.selected === true,
        adjunctInPresent: contextSelectionRecord?.dependentClauseIntroducedByIn?.selected === true,
        adjunctWritingPolicy: contextSelectionRecord?.dependentClauseIntroducedByIn?.writingPolicy || "no-dependent-clause-writing-decision",
        EnglishPronounTranslationIsAuthority: false
      };
      const layerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame({
        nncSlotFrame,
        highestActiveLesson: 16
      });
      const authorized = layerEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : sourceFrame.authorizationStatus !== "authorized" ? sourceFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : !lesson4Authorized ? "lesson4-vacant-state-nnc-not-authorized" : layerEvaluationFrame.blockReason;
      const lesson11CooperationFrame = {
        kind: "classical-nahuatl-lesson16-lesson11-cooperation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized && ["personal-simple", "personal-compound"].includes(sourceFrame.subtype) ? "authorized" : "not-authorized",
        cooperatingNncFrameKind: "classical-nahuatl-lesson16-pronominal-nnc-frame",
        cooperatingSubject: sourceFrame.subject,
        requiredLesson11Identity: "defective-nnc-cooperation",
        booleanClaimAuthority: false,
        selectedTypedNncRequired: true,
        legalWitnessTagIds: ["cn-l11-1147-zero-ia-defective", "cn-l16-163-personal-pronominal"]
      };
      const proofFrame = {
        kind: "classical-nahuatl-lesson16-logic-proof-frame",
        lesson: "Andrews Lesson 16",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson16-pronominal-source",
          passed: sourceFrame.authorizationStatus === "authorized",
          sourceFrame
        }, {
          layer: "lesson16-context-selection",
          passed: contextSelectionRecord?.authorizationStatus === "authorized",
          contextSelectionRecord
        }, {
          layer: "lesson16-internal-stem-and-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "shared-nnc-subject-and-state",
          passed: sourceAuthorized,
          personFrame,
          stateFrame
        }, {
          layer: "lesson16-typed-finalizer",
          passed: authorized,
          layerEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          finalizerLayerId: layerEvaluationFrame.finalizerLayerId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l16-pronominal-nncs", ...CLASSICAL_NAHUATL_LESSON16_RULES.map(rule => rule.id)]
      };
      return {
        kind: "classical-nahuatl-lesson16-pronominal-nnc-frame",
        lesson: "Andrews Lesson 16",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceFrame,
        contextSelectionRecord,
        numberFrame,
        personFrame,
        stateFrame,
        discourseFrame,
        lesson4Frame,
        nncSlotFrame,
        layerEvaluationFrame,
        lesson11CooperationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-pronominal-nnc-slots-after-lesson16-finalizer",
          formulaStringAuthority: false,
          EnglishTranslationAuthority: false
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlLesson16Rules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        sentenceSurfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function installClassicalNahuatlNncLayerEvaluatorClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLesson12Rules,
        getClassicalNahuatlLesson13Rules,
        getClassicalNahuatlLesson14Rules,
        getClassicalNahuatlLesson15Rules,
        getClassicalNahuatlLesson16Rules,
        getClassicalNahuatlNncLayerContracts,
        getClassicalNahuatlLesson14ClassFormGuidance,
        deriveClassicalNahuatlLesson143Stem,
        buildClassicalNahuatlLesson14SupportiveIRepairFrame,
        buildClassicalNahuatlLesson14NounstemSourceFrame,
        buildClassicalNahuatlLesson14DerivedStemFrame,
        buildClassicalNahuatlLesson14ConstituentAnalysisFrame,
        resolveClassicalNahuatlLesson14ConnectorSelection,
        normalizeClassicalNahuatlNncSubject,
        normalizeClassicalNahuatlNounClass,
        buildClassicalNahuatlNncSubjectPersonFrame,
        resolveClassicalNahuatlLesson12AbsolutiveNumberDyad,
        normalizeClassicalNahuatlNncPossessor,
        resolveClassicalNahuatlThirdPluralPossessorSt2,
        buildClassicalNahuatlLesson13PossessiveStateFrame,
        resolveClassicalNahuatlLesson13PossessiveNumberDyad,
        buildClassicalNahuatlNncSlotFrame,
        isClassicalNahuatlNncSlotFrame,
        renderClassicalNahuatlNncSlotFrameFormula,
        buildClassicalNahuatlNncSentenceSurfaceFrame,
        buildClassicalNahuatlNncDiagrammaticFrame,
        buildClassicalNahuatlNncLayerEvaluationFrame,
        getClassicalNahuatlLesson15PredicateOptionContract,
        buildClassicalNahuatlLesson15StemOperationRecord,
        isClassicalNahuatlLesson15StemOperationRecord,
        buildClassicalNahuatlLesson15PossessorReduplicationSelection,
        isClassicalNahuatlLesson15PossessorReduplicationSelection,
        buildClassicalNahuatlNncSourceAuthorityFrame,
        isClassicalNahuatlNncSourceAuthorityFrame,
        buildClassicalNahuatlLesson12AbsolutiveNncFrame,
        buildClassicalNahuatlLesson13PossessiveNncFrame,
        buildClassicalNahuatlLesson14ClassGovernedNncFrame,
        buildClassicalNahuatlLesson15SentenceHandoffFrame,
        buildClassicalNahuatlLesson15HigherNncFrame,
        buildClassicalNahuatlLesson16QuantitiveAuthorityRecord,
        isClassicalNahuatlLesson16QuantitiveAuthorityRecord,
        buildClassicalNahuatlLesson16ContextSelectionRecord,
        isClassicalNahuatlLesson16ContextSelectionRecord,
        buildClassicalNahuatlLesson16PronominalSourceFrame,
        resolveClassicalNahuatlLesson16PronominalNumberFrame,
        buildClassicalNahuatlLesson16PronominalNncFrame
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        getClassicalNahuatlLesson12Rules,
        getClassicalNahuatlLesson13Rules,
        getClassicalNahuatlLesson14Rules,
        getClassicalNahuatlLesson15Rules,
        getClassicalNahuatlLesson16Rules,
        getClassicalNahuatlNncLayerContracts,
        getClassicalNahuatlLesson14ClassFormGuidance,
        deriveClassicalNahuatlLesson143Stem,
        buildClassicalNahuatlLesson14SupportiveIRepairFrame,
        buildClassicalNahuatlLesson14NounstemSourceFrame,
        buildClassicalNahuatlLesson14DerivedStemFrame,
        buildClassicalNahuatlLesson14ConstituentAnalysisFrame,
        resolveClassicalNahuatlLesson14ConnectorSelection,
        normalizeClassicalNahuatlNncSubject,
        normalizeClassicalNahuatlNounClass,
        buildClassicalNahuatlNncSubjectPersonFrame,
        resolveClassicalNahuatlLesson12AbsolutiveNumberDyad,
        normalizeClassicalNahuatlNncPossessor,
        resolveClassicalNahuatlThirdPluralPossessorSt2,
        buildClassicalNahuatlLesson13PossessiveStateFrame,
        resolveClassicalNahuatlLesson13PossessiveNumberDyad,
        buildClassicalNahuatlNncSlotFrame,
        isClassicalNahuatlNncSlotFrame,
        renderClassicalNahuatlNncSlotFrameFormula,
        buildClassicalNahuatlNncSentenceSurfaceFrame,
        buildClassicalNahuatlNncDiagrammaticFrame,
        buildClassicalNahuatlNncLayerEvaluationFrame,
        getClassicalNahuatlLesson15PredicateOptionContract,
        buildClassicalNahuatlLesson15StemOperationRecord,
        isClassicalNahuatlLesson15StemOperationRecord,
        buildClassicalNahuatlLesson15PossessorReduplicationSelection,
        isClassicalNahuatlLesson15PossessorReduplicationSelection,
        buildClassicalNahuatlNncSourceAuthorityFrame,
        isClassicalNahuatlNncSourceAuthorityFrame,
        buildClassicalNahuatlLesson12AbsolutiveNncFrame,
        buildClassicalNahuatlLesson13PossessiveNncFrame,
        buildClassicalNahuatlLesson14ClassGovernedNncFrame,
        buildClassicalNahuatlLesson15SentenceHandoffFrame,
        buildClassicalNahuatlLesson15HigherNncFrame,
        buildClassicalNahuatlLesson16QuantitiveAuthorityRecord,
        isClassicalNahuatlLesson16QuantitiveAuthorityRecord,
        buildClassicalNahuatlLesson16ContextSelectionRecord,
        isClassicalNahuatlLesson16ContextSelectionRecord,
        buildClassicalNahuatlLesson16PronominalSourceFrame,
        resolveClassicalNahuatlLesson16PronominalNumberFrame,
        buildClassicalNahuatlLesson16PronominalNncFrame,
        installClassicalNahuatlNncLayerEvaluatorClassicGlobals
      };
    }
    if (typeof targetObject.window !== "undefined") {
      installClassicalNahuatlNncLayerEvaluatorClassicGlobals();
    }

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_LAYER_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_LAYER_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON12_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON12_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON13_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON13_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON14_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON14_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON15_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON15_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON16_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON16_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_LAYER_CONTRACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_LAYER_CONTRACTS; },
    });
    api.getClassicalNahuatlNncRuntimeTarget = getClassicalNahuatlNncRuntimeTarget;
    api.cloneClassicalNahuatlNncValue = cloneClassicalNahuatlNncValue;
    api.normalizeClassicalNahuatlNncToken = normalizeClassicalNahuatlNncToken;
    api.normalizeClassicalNahuatlNncStem = normalizeClassicalNahuatlNncStem;
    api.normalizeClassicalNahuatlNncSubject = normalizeClassicalNahuatlNncSubject;
    api.normalizeClassicalNahuatlNounClass = normalizeClassicalNahuatlNounClass;
    api.getClassicalNahuatlNncFirstSound = getClassicalNahuatlNncFirstSound;
    api.getClassicalNahuatlNncLastSound = getClassicalNahuatlNncLastSound;
    api.isClassicalNahuatlNncVowelSound = isClassicalNahuatlNncVowelSound;
    api.resolveClassicalNahuatlThirdPluralPossessorSt2 = resolveClassicalNahuatlThirdPluralPossessorSt2;
    api.getClassicalNahuatlLesson12Rules = getClassicalNahuatlLesson12Rules;
    api.getClassicalNahuatlLesson13Rules = getClassicalNahuatlLesson13Rules;
    api.getClassicalNahuatlLesson14Rules = getClassicalNahuatlLesson14Rules;
    api.getClassicalNahuatlLesson15Rules = getClassicalNahuatlLesson15Rules;
    api.getClassicalNahuatlLesson16Rules = getClassicalNahuatlLesson16Rules;
    api.getClassicalNahuatlNncLayerContracts = getClassicalNahuatlNncLayerContracts;
    api.normalizeClassicalNahuatlLesson14UseShape = normalizeClassicalNahuatlLesson14UseShape;
    api.normalizeClassicalNahuatlLesson14StemFormation = normalizeClassicalNahuatlLesson14StemFormation;
    api.getClassicalNahuatlLesson14InitialVowelFrame = getClassicalNahuatlLesson14InitialVowelFrame;
    api.getClassicalNahuatlLesson14LongVowel = getClassicalNahuatlLesson14LongVowel;
    api.getClassicalNahuatlLesson14ShortVowel = getClassicalNahuatlLesson14ShortVowel;
    api.deriveClassicalNahuatlLesson143Stem = deriveClassicalNahuatlLesson143Stem;
    api.getClassicalNahuatlLesson14ClassFormGuidance = getClassicalNahuatlLesson14ClassFormGuidance;
    api.buildClassicalNahuatlLesson14SupportiveIRepairFrame = buildClassicalNahuatlLesson14SupportiveIRepairFrame;
    api.buildClassicalNahuatlLesson14NounstemSourceFrame = buildClassicalNahuatlLesson14NounstemSourceFrame;
    api.buildClassicalNahuatlLesson14DerivedStemFrame = buildClassicalNahuatlLesson14DerivedStemFrame;
    api.buildClassicalNahuatlLesson14ConstituentAnalysisFrame = buildClassicalNahuatlLesson14ConstituentAnalysisFrame;
    api.buildClassicalNahuatlLesson14SurfaceConstituentAnalyses = buildClassicalNahuatlLesson14SurfaceConstituentAnalyses;
    api.applyClassicalNahuatlLesson14SelectedConstituentAnalysis = applyClassicalNahuatlLesson14SelectedConstituentAnalysis;
    api.buildClassicalNahuatlNncSubjectPersonFrame = buildClassicalNahuatlNncSubjectPersonFrame;
    api.resolveClassicalNahuatlLesson12AbsolutiveNumberDyad = resolveClassicalNahuatlLesson12AbsolutiveNumberDyad;
    api.normalizeClassicalNahuatlNncPossessor = normalizeClassicalNahuatlNncPossessor;
    api.buildClassicalNahuatlLesson13PossessiveStateFrame = buildClassicalNahuatlLesson13PossessiveStateFrame;
    api.resolveClassicalNahuatlLesson13PossessiveNumberDyad = resolveClassicalNahuatlLesson13PossessiveNumberDyad;
    api.buildClassicalNahuatlNncSlotFrame = buildClassicalNahuatlNncSlotFrame;
    api.isClassicalNahuatlNncSlotFrame = isClassicalNahuatlNncSlotFrame;
    api.renderClassicalNahuatlNncSlotFrameFormula = renderClassicalNahuatlNncSlotFrameFormula;
    api.realizeClassicalNahuatlNncSurfaceCarrier = realizeClassicalNahuatlNncSurfaceCarrier;
    api.capitalizeClassicalNahuatlNncSentenceInitial = capitalizeClassicalNahuatlNncSentenceInitial;
    api.buildClassicalNahuatlNncSentenceSurfaceFrame = buildClassicalNahuatlNncSentenceSurfaceFrame;
    api.getClassicalNahuatlNncGeneralFormulaProjection = getClassicalNahuatlNncGeneralFormulaProjection;
    api.buildClassicalNahuatlNncDiagrammaticFrame = buildClassicalNahuatlNncDiagrammaticFrame;
    api.buildClassicalNahuatlNncLayerEvaluationFrame = buildClassicalNahuatlNncLayerEvaluationFrame;
    api.getClassicalNahuatlLesson15PredicateOptionContract = getClassicalNahuatlLesson15PredicateOptionContract;
    api.buildClassicalNahuatlLesson15StemOperationRecord = buildClassicalNahuatlLesson15StemOperationRecord;
    api.isClassicalNahuatlLesson15StemOperationRecord = isClassicalNahuatlLesson15StemOperationRecord;
    api.buildClassicalNahuatlLesson15PossessorReduplicationSelection = buildClassicalNahuatlLesson15PossessorReduplicationSelection;
    api.isClassicalNahuatlLesson15PossessorReduplicationSelection = isClassicalNahuatlLesson15PossessorReduplicationSelection;
    api.buildClassicalNahuatlNncSourceAuthorityFrame = buildClassicalNahuatlNncSourceAuthorityFrame;
    api.isClassicalNahuatlNncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame;
    api.buildClassicalNahuatlLesson12AbsolutiveNncFrame = buildClassicalNahuatlLesson12AbsolutiveNncFrame;
    api.buildClassicalNahuatlLesson13PossessiveNncFrame = buildClassicalNahuatlLesson13PossessiveNncFrame;
    api.normalizeClassicalNahuatlLesson14Subclass = normalizeClassicalNahuatlLesson14Subclass;
    api.resolveClassicalNahuatlLesson14ConnectorSelection = resolveClassicalNahuatlLesson14ConnectorSelection;
    api.buildClassicalNahuatlLesson14ClassGovernedNncFrame = buildClassicalNahuatlLesson14ClassGovernedNncFrame;
    api.buildClassicalNahuatlLesson15SentenceHandoffFrame = buildClassicalNahuatlLesson15SentenceHandoffFrame;
    api.buildClassicalNahuatlLesson15HigherNncFrame = buildClassicalNahuatlLesson15HigherNncFrame;
    api.normalizeClassicalNahuatlLesson16Subtype = normalizeClassicalNahuatlLesson16Subtype;
    api.normalizeClassicalNahuatlLesson16QuantitiveMatrixFamily = normalizeClassicalNahuatlLesson16QuantitiveMatrixFamily;
    api.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord = buildClassicalNahuatlLesson16QuantitiveAuthorityRecord;
    api.isClassicalNahuatlLesson16QuantitiveAuthorityRecord = isClassicalNahuatlLesson16QuantitiveAuthorityRecord;
    api.hasLooseClassicalNahuatlLesson16QuantitiveClaim = hasLooseClassicalNahuatlLesson16QuantitiveClaim;
    api.resolveClassicalNahuatlLesson16ContextIdentity = resolveClassicalNahuatlLesson16ContextIdentity;
    api.buildClassicalNahuatlLesson16ContextSelectionRecord = buildClassicalNahuatlLesson16ContextSelectionRecord;
    api.isClassicalNahuatlLesson16ContextSelectionRecord = isClassicalNahuatlLesson16ContextSelectionRecord;
    api.hasLooseClassicalNahuatlLesson16ContextClaim = hasLooseClassicalNahuatlLesson16ContextClaim;
    api.resolveClassicalNahuatlLesson16PronominalSourceCategories = resolveClassicalNahuatlLesson16PronominalSourceCategories;
    api.buildClassicalNahuatlLesson16PronominalSourceFrame = buildClassicalNahuatlLesson16PronominalSourceFrame;
    api.pluralizeClassicalNahuatlLesson16InternalStem = pluralizeClassicalNahuatlLesson16InternalStem;
    api.resolveClassicalNahuatlLesson16PronominalNumberFrame = resolveClassicalNahuatlLesson16PronominalNumberFrame;
    api.buildClassicalNahuatlLesson16PronominalNncFrame = buildClassicalNahuatlLesson16PronominalNncFrame;
    api.installClassicalNahuatlNncLayerEvaluatorClassicGlobals = installClassicalNahuatlNncLayerEvaluatorClassicGlobals;
    return api;
}

export function installClassicalNahuatlNncLayerEvaluatorGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlNncLayerEvaluatorApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
