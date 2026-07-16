// Canonical modern ESM module.

export function createClassicalNahuatlLesson2OrthographyApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON2_MACHINERY_VERSION = 1;
    const CLASSICAL_NAHUATL_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_PROFILE_MODE = Object.freeze({
      nawatPipil: "nawat-pipil",
      classicalNahuatl: CLASSICAL_NAHUATL_PROFILE_ID
    });
    const CLASSICAL_NAHUATL_LESSON2_LETTERS = Object.freeze("acehilmnopqtuxyzāēīō".split(""));
    const CLASSICAL_NAHUATL_LESSON2_DIGRAPHS = Object.freeze(["ch", "cu", "hu", "qu", "tz", "tl", "uc", "uh"]);
    const CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS = Object.freeze(["\u2395"]);
    const CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS = Object.freeze(["-", "(", ")", "#", "/", ".", "'", "?", "!", "¡", ",", ";", ":", " "]);
    const CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS = Object.freeze(["a", "e", "i", "o"]);
    const CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES = Object.freeze([{
      id: "cn-l2-24-k-initial-before-a-o",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "initial",
      followingVowels: ["a", "o"],
      spelling: "c",
      examples: ["ca", "co"]
    }, {
      id: "cn-l2-24-k-initial-before-e-i",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "initial",
      followingVowels: ["e", "i"],
      spelling: "qu",
      examples: ["que", "qui"]
    }, {
      id: "cn-l2-24-k-final",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/k/",
      syllablePosition: "final",
      precedingVowels: ["a", "o", "e", "i"],
      spelling: "c",
      examples: ["ac", "oc", "ec", "ic"]
    }, {
      id: "cn-l2-24-s-initial-before-a-o",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "initial",
      followingVowels: ["a", "o"],
      spelling: "z",
      examples: ["za", "zo"]
    }, {
      id: "cn-l2-24-s-initial-before-e-i",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "initial",
      followingVowels: ["e", "i"],
      spelling: "c",
      examples: ["ce", "ci"]
    }, {
      id: "cn-l2-24-s-final",
      operationId: "cn-l2-spelling-changes-k-s-environment",
      phoneme: "/s/",
      syllablePosition: "final",
      precedingVowels: ["a", "o", "e", "i"],
      spelling: "z",
      examples: ["az", "oz", "ez", "iz"]
    }, {
      id: "cn-l2-24-w-nonfinal",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[w]",
      syllablePosition: "nonfinal",
      followingVowels: ["a", "e", "i"],
      spelling: "hu",
      pronunciationPhone: "[w]",
      pronunciationChanged: true,
      examples: ["hua", "hue", "hui"]
    }, {
      id: "cn-l2-24-w-final",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[w]",
      syllablePosition: "final",
      precedingVowels: ["a", "e", "i", "o"],
      spelling: "uh",
      pronunciationPhone: "[w̥]",
      pronunciationChanged: true,
      examples: ["auh", "euh", "iuh", "ouh"]
    }, {
      id: "cn-l2-24-kw-nonfinal",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[kʷ]",
      syllablePosition: "nonfinal",
      followingVowels: ["a", "e", "i"],
      spelling: "cu",
      pronunciationPhone: "[kʷ]",
      pronunciationChanged: true,
      examples: ["cua", "cue", "cui"]
    }, {
      id: "cn-l2-24-kw-final",
      operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
      phoneme: "[kʷ]",
      syllablePosition: "final",
      precedingVowels: ["a", "e", "i", "o"],
      spelling: "uc",
      pronunciationPhone: "[kʷ̥]",
      pronunciationChanged: true,
      examples: ["auc", "euc", "iuc", "ouc"]
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.4",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      transcriptionLineStart: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? 1697 : 1686,
      transcriptionLineEnd: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? 1700 : 1696,
      exactWitness: rule.operationId === "cn-l2-spelling-changes-w-kw-syllable-final" ? "This depends on whether the sounds are syllable-final or not.\n[w]: hua hue hui; [w̥]: auh euh iuh ouh\n[kʷ]: cua cue cui; [kʷ̥]: auc euc iuc ouc" : "/k/: ca co que qui; ac oc ec ic\n/s/: za zo ce ci; az oz ez iz",
      pronunciationChanged: rule.pronunciationChanged === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES = Object.freeze([{
      id: "cn-l2-25-compound-boundary-open-transition",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      outcome: "open-transition",
      examples: ["stem + stem"],
      transcriptionLineStart: 1701,
      transcriptionLineEnd: 1703,
      exactWitness: "When two stems are joined by compounding\n(see primarily Lessons 30 and 31), their boundaries, as a rule, are preserved by open\ntransition"
    }, {
      id: "cn-l2-25-supportive-i-kept",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      stemInitialSupportiveI: true,
      outputSpelling: "i",
      examples: ["tekoma + ikšiλ"],
      transcriptionLineStart: 1703,
      transcriptionLineEnd: 1705,
      exactWitness: "an initial supportive [i] (see § 2.6, note) is frequently kept"
    }, {
      id: "cn-l2-25-stem-final-w-vocable-final",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[w]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "uh",
      outputExample: "cuauhēhuatl",
      blockedExample: "cuahuēhuatl",
      spelledAsVocableFinal: true,
      pronunciationPhone: "[w̥]",
      transcriptionLineStart: 1705,
      transcriptionLineEnd: 1708,
      exactWitness: "a stem-final consonant has the sound it would have in vocable-final position"
    }, {
      id: "cn-l2-25-stem-final-k-before-e-i-qu",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "/k/",
      followingVowels: ["e", "i"],
      outputSpelling: "qu",
      outputExample: "tēyēquihtoa",
      blockedExample: "tēyēcihtoa",
      exception: true,
      transcriptionLineStart: 1708,
      transcriptionLineEnd: 1709,
      exactWitness: "Stem-final\n/k/ before stem-initial /e/ or /i/ is spelled qu"
    }, {
      id: "cn-l2-25-stem-final-kw-before-vowel-cu",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[kʷ]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "cu",
      outputExample: "necuātl",
      blockedExample: "neucātl",
      exception: true,
      transcriptionLineStart: 1709,
      transcriptionLineEnd: 1710,
      exactWitness: "Stem-\nfinal /kʷ/ retains voice on its release feature before a vowel and is usually spelled cu"
    }, {
      id: "cn-l2-25-stem-final-w-before-vowel-hu-variant",
      operationId: "cn-l2-open-transition",
      boundaryType: "compound-stem-boundary",
      phoneme: "[w]",
      followingVowels: ["a", "e", "i", "o"],
      outputSpelling: "hu",
      outputExample: "cuācuahueh",
      alternateForRuleId: "cn-l2-25-stem-final-w-vocable-final",
      exception: true,
      transcriptionLineStart: 1711,
      transcriptionLineEnd: 1712,
      exactWitness: "At times stem-final [w̥] before a vowel is spelled hu"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.5",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES = Object.freeze([{
      id: "cn-l2-26-vowel-count-no-diphthongs",
      operationId: "cn-l2-syllable-structure",
      transcriptionLineStart: 1713,
      transcriptionLineEnd: 1715,
      exactWitness: "has as many syllables as it has vowels (there are\nno diphthongs)"
    }, {
      id: "cn-l2-26-four-syllable-shapes",
      operationId: "cn-l2-syllable-structure",
      syllableShapes: ["V", "CV", "VC", "CVC"],
      transcriptionLineStart: 1714,
      transcriptionLineEnd: 1719,
      exactWitness: "A syllable may have one of four shapes"
    }, {
      id: "cn-l2-26-intervocalic-consonant-onset",
      operationId: "cn-l2-syllable-structure",
      examples: ["cā-na", "nā-hui"],
      transcriptionLineStart: 1721,
      transcriptionLineEnd: 1722,
      exactWitness: "Any consonant sound between two vowels forms a syllable with the second vowel"
    }, {
      id: "cn-l2-26-vowel-sequence-separated",
      operationId: "cn-l2-syllable-structure",
      examples: ["te-otl"],
      transcriptionLineStart: 1723,
      transcriptionLineEnd: 1723,
      exactWitness: "Any two vowels in sequence belong to separate syllables"
    }, {
      id: "cn-l2-26-u-is-digraph-only",
      operationId: "cn-l2-syllable-structure",
      examples: ["qui-tza-cui-a", "nauh", "iuc-ci", "no-cuauh", "cac-huah"],
      transcriptionLineStart: 1724,
      transcriptionLineEnd: 1727,
      exactWitness: "in these lessons it is never a vowel letter\nbut only a part of a digraph"
    }, {
      id: "cn-l2-26-two-consonant-cluster-split",
      operationId: "cn-l2-syllable-structure",
      examples: ["ōm-pa", "cal-li", "iz-tatl"],
      transcriptionLineStart: 1728,
      transcriptionLineEnd: 1731,
      exactWitness: "No more than two consonant sounds can be juxtaposed, and such a juxtaposition is never\npermitted in initial or final positions"
    }, {
      id: "cn-l2-26-digraphs-single-consonant",
      operationId: "cn-l2-syllable-structure",
      examples: ["a-tzan", "tōch-tli"],
      transcriptionLineStart: 1732,
      transcriptionLineEnd: 1733,
      exactWitness: "Care should be taken with digraphs, since they represent a single consonant sound"
    }, {
      id: "cn-l2-26-supportive-i-illegal-sequence",
      operationId: "cn-l2-supportive-i",
      examples: ["išλa:walo:", "kikaki", "okičλi"],
      transcriptionLineStart: 1738,
      transcriptionLineEnd: 1744,
      exactWitness: "any type-level consonant sequence\nthat is illegal at the token level is lifted into a pronounceable sequence by the introduction of an [i]"
    }, {
      id: "cn-l2-26-phonological-not-morphological",
      operationId: "cn-l2-syllable-structure",
      transcriptionLineStart: 1755,
      transcriptionLineEnd: 1758,
      exactWitness: "One should never confuse syllable\ndivision in a vocable with the morphological analysis of a particle or nuclear clause"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.6",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_STRESS_RULES = Object.freeze([{
      id: "cn-l2-27-penultimate-vocable-stress",
      operationId: "cn-l2-vocable-stress",
      transcriptionLineStart: 1759,
      transcriptionLineEnd: 1760,
      exactWitness: "Stress in Nahuatl vocables falls on the penultimate (next-to-the-last) syllable."
    }, {
      id: "cn-l2-27-final-short-vowel-contrast",
      operationId: "cn-l2-vocable-stress",
      examples: ["calaqui", "calac"],
      transcriptionLineStart: 1773,
      transcriptionLineEnd: 1774,
      exactWitness: "Syllable stress helps indicate the presence of a vocable-final (reduced) short vowel."
    }, {
      id: "cn-l2-27-vocative-particle-exception",
      operationId: "cn-l2-vocable-stress",
      examples: ["nopiltziné"],
      transcriptionLineStart: 1775,
      transcriptionLineEnd: 1778,
      exactWitness: "There is only one exception to the above rule for stress"
    }, {
      id: "cn-l2-27-stress-group-connected-speech",
      operationId: "cn-l2-vocable-stress",
      examples: ["i-nōm-pa", "i-nin"],
      transcriptionLineStart: 1779,
      transcriptionLineEnd: 1790,
      exactWitness: "syllable division operates across vocable boundaries within the group"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.7",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES = Object.freeze([{
      id: "cn-l2-28-identical-consonants-create-long-consonant",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1791,
      transcriptionLineEnd: 1792,
      exactWitness: "When two identical consonants come together as a result of grammatical\nconstruction, they create a long consonant."
    }, {
      id: "cn-l2-28-single-bridging-pronunciation",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1793,
      transcriptionLineEnd: 1799,
      exactWitness: "there is not a separate\npronunciation for each of the juxtaposed consonants but rather a single pronunciation"
    }, {
      id: "cn-l2-28-affricate-release-feature-loss",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1800,
      transcriptionLineEnd: 1801,
      exactWitness: "the release feature of the first consonant is lost"
    }, {
      id: "cn-l2-28-within-vocable-double-spelling",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1802,
      transcriptionLineEnd: 1812,
      exactWitness: "When a\nlong consonant occurs within a vocable, it is usually spelled with a double letter or a double\ndigraph"
    }, {
      id: "cn-l2-28-traditional-text-spelling-warning",
      operationId: "cn-l2-consonantal-length",
      transcriptionLineStart: 1813,
      transcriptionLineEnd: 1815,
      exactWitness: "one should, however, be alert to the possibility of a long consonant\nspelled as a short one"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.8",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
    })));
    const CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES = Object.freeze([{
      id: "cn-l2-29-grammatical-unlike-consonants",
      operationId: "cn-l2-assimilation",
      section: "2.9",
      matchKind: "gate",
      transcriptionLineStart: 1816,
      transcriptionLineEnd: 1820,
      exactWitness: "certain unlike consonants\nare juxtaposed"
    }, {
      id: "cn-l2-29-progressive-vs-regressive",
      operationId: "cn-l2-assimilation",
      section: "2.9",
      matchKind: "direction-inventory",
      transcriptionLineStart: 1821,
      transcriptionLineEnd: 1822,
      exactWitness: "The assimilation may be progressive"
    }, {
      id: "cn-l2-210-progressive-l-tl-ll",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "l",
      sourceRight: "tl",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ll",
      outputSpelling: "ll",
      example: "mil- + -tlah > millah",
      transcriptionLineStart: 1829,
      transcriptionLineEnd: 1829,
      exactWitness: "1. /l/ + /λ/ > [ll]: mil- + -tlah > millah"
    }, {
      id: "cn-l2-210-progressive-l-y-ll",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "l",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ll",
      outputSpelling: "ll",
      example: "pil- + -yōtl > pillōtl",
      transcriptionLineStart: 1830,
      transcriptionLineEnd: 1830,
      exactWitness: "2. /l/ + /y/ > [ll]: pil- + -yōtl > pillōtl"
    }, {
      id: "cn-l2-210-progressive-s-y-ss",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "s",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "ss",
      outputSpelling: "zz",
      example: "chōquiz- + -yoh > chōquizzoh",
      transcriptionLineStart: 1831,
      transcriptionLineEnd: 1831,
      exactWitness: "3. /s/ + /y/ > [ss]: chōquiz- + -yoh > chōquizzoh"
    }, {
      id: "cn-l2-210-progressive-x-y-xx",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "x",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "šš",
      outputSpelling: "xx",
      example: "mix- + -yoh > mixxoh",
      transcriptionLineStart: 1832,
      transcriptionLineEnd: 1832,
      exactWitness: "4. /š/ + /y/ > [šš]: mix- + -yoh > mixxoh"
    }, {
      id: "cn-l2-210-progressive-tz-y-tztz",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "tz",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "¢¢",
      outputSpelling: "tztz",
      releasePronunciation: "[t¢]",
      example: "huitz- + -yoh > huitztzoh",
      transcriptionLineStart: 1833,
      transcriptionLineEnd: 1833,
      exactWitness: "5. /¢/ + /y/ > [¢¢]: huitz- + -yoh > huitztzoh"
    }, {
      id: "cn-l2-210-progressive-ch-y-chch",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "exact",
      direction: "progressive",
      sourceLeft: "ch",
      sourceRight: "y",
      dominantSide: "left",
      assimilationType: "total",
      outputSound: "čč",
      outputSpelling: "chch",
      releasePronunciation: "[tč]",
      example: "oquich- + -yōtl > oquichchōtl",
      transcriptionLineStart: 1834,
      transcriptionLineEnd: 1834,
      exactWitness: "6. /č/ + /y/ > [čč]: oquich- + -yōtl > oquichchōtl"
    }, {
      id: "cn-l2-210-ll-only-listed",
      operationId: "cn-l2-assimilation",
      section: "2.10",
      matchKind: "ll-restriction",
      transcriptionLineStart: 1835,
      transcriptionLineEnd: 1841,
      exactWitness: "Rules 1 and 2 above are the only ways in which the [ll] sequence can occur"
    }, {
      id: "cn-l2-211-regressive-nasal-sibilant",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "nasal-sibilant",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1842,
      transcriptionLineEnd: 1851,
      exactWitness: "1. /nasal/+ /sibilant/> [long sibilant]"
    }, {
      id: "cn-l2-211-regressive-sibilant-group",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "sibilant-group",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1852,
      transcriptionLineEnd: 1856,
      exactWitness: "In a combination of any two unlike consonants of the group /s š ¢ č/"
    }, {
      id: "cn-l2-211-regressive-w-bilabial",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "w-bilabial",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "total",
      transcriptionLineStart: 1862,
      transcriptionLineEnd: 1864,
      exactWitness: "3. /w/ + /bilabial/ > [long bilabial]"
    }, {
      id: "cn-l2-211-regressive-m-n-nn",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "m",
      sourceRight: "n",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "nn",
      outputSpelling: "nn",
      example: "ōm- + nohpalli > ōnnohpalli",
      transcriptionLineStart: 1865,
      transcriptionLineEnd: 1866,
      exactWitness: "4. /m/ + /n/ > [nn]"
    }, {
      id: "cn-l2-211-regressive-m-partial",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "m-partial",
      direction: "regressive",
      dominantSide: "right",
      assimilationType: "partial",
      transcriptionLineStart: 1871,
      transcriptionLineEnd: 1879,
      exactWitness: "When /m/ is followed by /t/, /λ/, /¢/, /č/, /k/, or /kʷ/, it undergoes partial assimilation"
    }, {
      id: "cn-l2-211-regressive-n-m-mm",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "n",
      sourceRight: "m",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "mm",
      outputSpelling: "mm",
      example: "on- + mopiqui > ommopiqui",
      transcriptionLineStart: 1880,
      transcriptionLineEnd: 1882,
      exactWitness: "6. /n/ + /m/ > [mm]"
    }, {
      id: "cn-l2-211-regressive-n-p-mp",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "n",
      sourceRight: "p",
      dominantSide: "right",
      assimilationType: "partial",
      outputSound: "mp",
      outputSpelling: "mp",
      example: "on- + pēhua > ompēhua",
      transcriptionLineStart: 1883,
      transcriptionLineEnd: 1885,
      exactWitness: "7. When /n/ is followed by /p/, it undergoes partial assimilation, resulting in [mp]."
    }, {
      id: "cn-l2-211-low-frequency-ch-p-pp",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "exact",
      direction: "regressive",
      sourceLeft: "ch",
      sourceRight: "p",
      dominantSide: "right",
      assimilationType: "total",
      outputSound: "pp",
      outputSpelling: "pp",
      lowFrequency: true,
      example: "tzīntlāltech- + -pachihui > tzīntlālteppachihui",
      transcriptionLineStart: 1886,
      transcriptionLineEnd: 1889,
      exactWitness: "other, less frequently encountered assimilation is possible"
    }, {
      id: "cn-l2-211-regressive-dissimilation-kk-hk",
      operationId: "cn-l2-assimilation",
      section: "2.11",
      matchKind: "dissimilation",
      processKind: "dissimilation",
      direction: "regressive",
      sourceLeft: "k",
      sourceRight: "k",
      outputSound: "hk",
      outputSpelling: "hc",
      optional: true,
      transcriptionLineStart: 1890,
      transcriptionLineEnd: 1896,
      exactWitness: "another process called dissimilation"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: rule.example ? [rule.example] : [],
      lowFrequency: rule.lowFrequency === true,
      optional: rule.optional === true,
      processKind: rule.processKind || "assimilation"
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES = Object.freeze([{
      id: "cn-l2-212-loss-general",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "gate",
      transcriptionLineStart: 1897,
      transcriptionLineEnd: 1899,
      exactWitness: "In certain consonant sequences one of the consonants becomes imperceptible."
    }, {
      id: "cn-l2-212-tz-w-tz",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "tz",
      sourceRight: "w",
      lostSide: "right",
      lostConsonant: "w",
      outputSound: "¢",
      outputSpelling: "tz",
      optional: true,
      example: "mitz- + -huālmomaquilia > mitzālmomaquilia",
      transcriptionLineStart: 1900,
      transcriptionLineEnd: 1901,
      exactWitness: "1. /¢/ + /w/ > [¢]. This is an optional rule."
    }, {
      id: "cn-l2-212-ch-w-ch",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "ch",
      sourceRight: "w",
      lostSide: "right",
      lostConsonant: "w",
      outputSound: "č",
      outputSpelling: "ch",
      optional: true,
      example: "tēch- + -huālnōtza > tēchālnōtza",
      transcriptionLineStart: 1902,
      transcriptionLineEnd: 1903,
      exactWitness: "2. /č/ + /w/ > [č]. This is an optional rule."
    }, {
      id: "cn-l2-212-glottal-y-h",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "glottal-y-h",
      sourceLeft: "glottal",
      sourceRight: "y",
      lostSide: "merged",
      lostConsonant: "glottal-y",
      outputSound: "h",
      outputSpelling: "h",
      optional: true,
      example: "tlahyelli > tlahelli",
      transcriptionLineStart: 1904,
      transcriptionLineEnd: 1906,
      exactWitness: "3. /ʔ/ + /y/ > [h]. This is an optional rule."
    }, {
      id: "cn-l2-212-glottal-y-y",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "glottal-y-y",
      sourceLeft: "glottal",
      sourceRight: "y",
      lostSide: "left",
      lostConsonant: "glottal",
      outputSound: "y",
      outputSpelling: "y",
      example: "ah- + ye > *ayye > aye > aya",
      transcriptionLineStart: 1907,
      transcriptionLineEnd: 1910,
      exactWitness: "There is another rule that produces the opposite result"
    }, {
      id: "cn-l2-212-glottal-y-y-reduplication-block",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "reduplication-block",
      sourceLeft: "glottal",
      sourceRight: "y",
      transcriptionLineStart: 1907,
      transcriptionLineEnd: 1909,
      exactWitness: "This rule cannot operate when the /ʔ/ is due to reduplication."
    }, {
      id: "cn-l2-212-initial-y-unstable-note",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "initial-y-note",
      sourceLeft: "y",
      lostSide: "initial",
      lostConsonant: "y",
      outputSound: "",
      outputSpelling: "",
      transcriptionLineStart: 1911,
      transcriptionLineEnd: 1912,
      exactWitness: "A stem-initial /y/ is sometimes omitted for no apparent reason"
    }, {
      id: "cn-l2-212-y-between-long-a-o-vowels",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "long-vowel-y-loss",
      sourceLeft: "y",
      lostSide: "medial",
      lostConsonant: "y",
      outputSound: "long-vowel-sequence",
      outputSpelling: "",
      transcriptionLineStart: 1913,
      transcriptionLineEnd: 1914,
      exactWitness: "/y/ between the two long vowels /a:/ and /o:/ (in either order) is lost"
    }, {
      id: "cn-l2-212-nasal-y-y",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "nasal-y",
      sourceRight: "y",
      lostSide: "left",
      lostConsonant: "nasal",
      outputSound: "y",
      outputSpelling: "ny",
      nasalizationTrace: true,
      transcriptionLineStart: 1919,
      transcriptionLineEnd: 1926,
      exactWitness: "4. /nasal/ + /y/ > [y]."
    }, {
      id: "cn-l2-212-nasal-w-w",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "nasal-w",
      sourceRight: "w",
      lostSide: "left",
      lostConsonant: "nasal",
      outputSound: "w",
      outputSpelling: "nhu",
      nasalizationTrace: true,
      transcriptionLineStart: 1927,
      transcriptionLineEnd: 1933,
      exactWitness: "5. /nasal/ + /w/ > [w]."
    }, {
      id: "cn-l2-212-w-w-w",
      operationId: "cn-l2-consonant-loss",
      section: "2.12",
      matchKind: "exact",
      sourceLeft: "w",
      sourceRight: "w",
      lostSide: "left",
      lostConsonant: "w",
      outputSound: "w",
      outputSpelling: "hu",
      example: "cuāuh- + -huah > cuāhuah",
      transcriptionLineStart: 1934,
      transcriptionLineEnd: 1935,
      exactWitness: "6. /w/ + /w/ > [w]. The first /w/, which is voiceless, is lost."
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: rule.example ? [rule.example] : [],
      optional: rule.optional === true,
      nasalizationTrace: rule.nasalizationTrace === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES = Object.freeze([{
      id: "cn-l2-213-phone-shift-general",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "gate",
      transcriptionLineStart: 1936,
      transcriptionLineEnd: 1940,
      exactWitness: "a shift may occur when, as a\nresult of grammatical construction"
    }, {
      id: "cn-l2-213-glottal-vowel-y",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "glottal-vowel",
      sourceConsonant: "glottal",
      outputSound: "y",
      outputSpelling: "y",
      optional: true,
      transcriptionLineStart: 1941,
      transcriptionLineEnd: 1945,
      exactWitness: "1. /ʔ/ + /vowel/ > [y] + [vowel]. This is an optional change."
    }, {
      id: "cn-l2-213-intervocalic-y-disappears",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "intervocalic-y-disappears",
      sourceConsonant: "glottal",
      outputSound: "",
      outputSpelling: "",
      transcriptionLineStart: 1941,
      transcriptionLineEnd: 1949,
      exactWitness: "When intervocalic, the resultant\n[y] may disappear."
    }, {
      id: "cn-l2-213-m-exposed-n",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "m-exposed",
      sourceConsonant: "m",
      outputSound: "n̥",
      outputSpelling: "n",
      transcriptionLineStart: 1950,
      transcriptionLineEnd: 1962,
      exactWitness: "2. /m/ > [n̥] when left exposed at the end of a syllable or vocable."
    }, {
      id: "cn-l2-213-y-exposed-x",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "y-exposed",
      sourceConsonant: "y",
      outputSound: "š",
      outputSpelling: "x",
      transcriptionLineStart: 1963,
      transcriptionLineEnd: 1967,
      exactWitness: "3. /y/ > [š] when left exposed at the end of a syllable or vocable."
    }, {
      id: "cn-l2-213-y-exposed-prior-s",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "y-exposed-prior-s",
      sourceConsonant: "y",
      outputSound: "s",
      outputSpelling: "z",
      transcriptionLineStart: 1966,
      transcriptionLineEnd: 1967,
      exactWitness: "When the vocable contains a prior s-sound, /y/ > [s]"
    }, {
      id: "cn-l2-213-kw-exposed-k",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "kw-exposed",
      sourceConsonant: "kw",
      outputSound: "k",
      outputSpelling: "c",
      optional: true,
      transcriptionLineStart: 1969,
      transcriptionLineEnd: 1972,
      exactWitness: "4. Occasionally, /kʷ/ > [k]"
    }, {
      id: "cn-l2-213-t-final-h",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "t-final",
      sourceConsonant: "t",
      outputSound: "h",
      outputSpelling: "h",
      optional: true,
      transcriptionLineStart: 1973,
      transcriptionLineEnd: 1975,
      exactWitness: "5. Occasionally, /t/ > [h] when the /t/ is forced into a vocable-final position"
    }, {
      id: "cn-l2-213-rare-glottal-nonfinal-t",
      operationId: "cn-l2-consonant-phone-shift",
      section: "2.13",
      matchKind: "rare-glottal-nonfinal-t",
      sourceConsonant: "glottal",
      outputSound: "t",
      outputSpelling: "t",
      rare: true,
      transcriptionLineStart: 1976,
      transcriptionLineEnd: 1978,
      exactWitness: "non-final /ʔ/ > non-\nfinal [t]"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      optional: rule.optional === true,
      rare: rule.rare === true
    })));
    const CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES = Object.freeze([{
      id: "cn-l2-214-short-vowel-stress-group-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1979,
      transcriptionLineEnd: 1981,
      exactWitness: "An initial or final short vowel of certain vocables can be elided"
    }, {
      id: "cn-l2-214-long-vowel-resists-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1979,
      transcriptionLineEnd: 1981,
      exactWitness: "A long vowel tends not\nto undergo elision."
    }, {
      id: "cn-l2-214-listed-stress-group-examples",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1982,
      transcriptionLineEnd: 1985,
      exactWitness: "zā oc > zāc",
      examples: ["zā oc > zāc", "zā zo īc in > zāciquin", "mā zo ihui > mācihui", "mā zo in ahmō > mācinahmō"]
    }, {
      id: "cn-l2-214-spelling-change-required",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1986,
      transcriptionLineEnd: 1986,
      exactWitness: "if elision is indicated in writing, a spelling change is often necessary"
    }, {
      id: "cn-l2-214-supportive-i-not-proper-elision",
      operationId: "cn-l2-vowel-elision",
      transcriptionLineStart: 1987,
      transcriptionLineEnd: 1990,
      exactWitness: "When the omitted vowel is a supportive [i], it is not, properly speaking, elision"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.14",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES = Object.freeze([{
      id: "cn-l2-215-irregular-short-vowel-glottal-morph",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1991,
      transcriptionLineEnd: 1994,
      exactWitness: "certain morphemes with a long\nfinal vowel have in their morphic repertory an irregular morph that has a short vowel plus a glottal\nstop"
    }, {
      id: "cn-l2-215-small-number-of-morphemes",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1994,
      transcriptionLineEnd: 1994,
      exactWitness: "Only a small number of morphemes permit this."
    }, {
      id: "cn-l2-215-embed-subposition-required",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1994,
      transcriptionLineEnd: 1996,
      exactWitness: "the morph with the glottal stop must occupy the embed subposition of a compound stem"
    }, {
      id: "cn-l2-215-matrix-determines-choice",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1995,
      transcriptionLineEnd: 1996,
      exactWitness: "its choice being determined by the morpheme in the matrix subposition"
    }, {
      id: "cn-l2-215-listed-examples",
      operationId: "cn-l2-long-vowel-glottal-stop",
      transcriptionLineStart: 1997,
      transcriptionLineEnd: 1999,
      exactWitness: "huē- + -cāuh > huehcāuh",
      examples: ["huē- + -cāuh > huehcāuh", "teō- + -calli > teohcalli", "māi- + -pilli > mahpilli"]
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.15",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
      examples: Array.isArray(rule.examples) ? rule.examples : []
    })));
    const CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES = Object.freeze([{
      id: "cn-l2-216-sentences-had-prosodic-contours",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2004,
      transcriptionLineEnd: 2006,
      exactWitness: "Classical Nahuatl sentences, of course, had prosodic contours"
    }, {
      id: "cn-l2-216-known-stress-rules",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2006,
      transcriptionLineEnd: 2008,
      exactWitness: "rules for stress are known for nuclear clauses and stress groups"
    }, {
      id: "cn-l2-216-long-final-vowel-low-pitch",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2007,
      transcriptionLineEnd: 2008,
      exactWitness: "a long final vowel has low pitch"
    }, {
      id: "cn-l2-216-sentential-prosody-unknown",
      operationId: "cn-l2-prosodic-contours",
      transcriptionLineStart: 2008,
      transcriptionLineEnd: 2010,
      exactWitness: "practically nothing is known of the language's sentential prosodic features"
    }].map(rule => Object.freeze({
      ...rule,
      lesson: "Andrews Lesson 2",
      section: "2.16",
      sourceAuthority: "Andrews transcription",
      sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
    })));
    const CLASSICAL_NAHUATL_FIREWALL_RULES = Object.freeze(["Classical Nahuatl is a language profile, not a UI density mode", "Classical Nahuatl tab output is Andrews transcription direct", "Classical Nahuatl tab authority never targets nawat-modern", "Nawat/Pipil orthography bridge is not applied inside the Classical tab", "Modern Nawat/Pipil spelling authority cannot authorize Classical tab output", "Profile selection, not spelling scanning, separates Classical and Nawat/Pipil"]);
    function getClassicalNahuatlLesson2RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function getClassicalNahuatlLesson2Letters() {
      return Array.from(CLASSICAL_NAHUATL_LESSON2_LETTERS);
    }
    function getClassicalNahuatlLesson2Digraphs() {
      return Array.from(CLASSICAL_NAHUATL_LESSON2_DIGRAPHS);
    }
    function normalizeClassicalNahuatlOrthographyInput(value) {
      const normalizer = getClassicalNahuatlLesson2RuntimeTarget()?.normalizeOrthographyInput;
      if (typeof normalizer === "function") {
        return normalizer(value);
      }
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlLesson2SimpleVowel(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value).replace(/[ā]/gu, "a").replace(/[ē]/gu, "e").replace(/[ī]/gu, "i").replace(/[ō]/gu, "o");
      const vowel = normalized[0] || "";
      return CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS.includes(vowel) ? vowel : "";
    }
    function normalizeClassicalNahuatlLesson2Phoneme(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value).normalize("NFD").replace(/\u0325/gu, "").replace(/[\/\[\]]/gu, "");
      if (normalized === "k") {
        return "/k/";
      }
      if (normalized === "s") {
        return "/s/";
      }
      if (normalized === "w") {
        return "[w]";
      }
      if (normalized === "kw" || normalized === "kʷ") {
        return "[kʷ]";
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson2SyllablePosition(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["initial", "syllable-initial", "onset"].includes(normalized)) {
        return "initial";
      }
      if (["final", "syllable-final", "coda"].includes(normalized)) {
        return "final";
      }
      if (["nonfinal", "non-final", "not-final", "not-syllable-final"].includes(normalized)) {
        return "nonfinal";
      }
      return "";
    }
    function inferClassicalNahuatlLesson2SyllablePosition(options = {}, phoneme = "") {
      const explicit = normalizeClassicalNahuatlLesson2SyllablePosition(options.syllablePosition);
      if (explicit) {
        return explicit;
      }
      if (options.followingVowel) {
        return phoneme === "[w]" || phoneme === "[kʷ]" ? "nonfinal" : "initial";
      }
      if (options.precedingVowel) {
        return "final";
      }
      return "";
    }
    function getClassicalNahuatlLesson2SpellingChangeRules() {
      return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES.map(rule => ({
        ...rule,
        followingVowels: Array.isArray(rule.followingVowels) ? rule.followingVowels.slice() : [],
        precedingVowels: Array.isArray(rule.precedingVowels) ? rule.precedingVowels.slice() : [],
        examples: rule.examples.slice()
      }));
    }
    function copyClassicalNahuatlLesson2OpenTransitionRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        followingVowels: Array.isArray(rule.followingVowels) ? rule.followingVowels.slice() : [],
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2OpenTransitionRules() {
      return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.map(copyClassicalNahuatlLesson2OpenTransitionRule);
    }
    function copyClassicalNahuatlLesson2SyllableStructureRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        syllableShapes: Array.isArray(rule.syllableShapes) ? rule.syllableShapes.slice() : [],
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2SyllableStructureRules() {
      return CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES.map(copyClassicalNahuatlLesson2SyllableStructureRule);
    }
    function copyClassicalNahuatlLesson2StressRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2StressRules() {
      return CLASSICAL_NAHUATL_LESSON2_STRESS_RULES.map(copyClassicalNahuatlLesson2StressRule);
    }
    function copyClassicalNahuatlLesson2ConsonantalLengthRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlLesson2ConsonantalLengthRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES.map(copyClassicalNahuatlLesson2ConsonantalLengthRule);
    }
    function copyClassicalNahuatlLesson2AssimilationRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2AssimilationRules() {
      return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.map(copyClassicalNahuatlLesson2AssimilationRule);
    }
    function copyClassicalNahuatlLesson2ConsonantLossRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2ConsonantLossRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.map(copyClassicalNahuatlLesson2ConsonantLossRule);
    }
    function copyClassicalNahuatlLesson2ConsonantPhoneShiftRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlLesson2ConsonantPhoneShiftRules() {
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.map(copyClassicalNahuatlLesson2ConsonantPhoneShiftRule);
    }
    function copyClassicalNahuatlLesson2VowelElisionRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2VowelElisionRules() {
      return CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.map(copyClassicalNahuatlLesson2VowelElisionRule);
    }
    function copyClassicalNahuatlLesson2LongVowelGlottalRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule,
        examples: Array.isArray(rule.examples) ? rule.examples.slice() : []
      };
    }
    function getClassicalNahuatlLesson2LongVowelGlottalRules() {
      return CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.map(copyClassicalNahuatlLesson2LongVowelGlottalRule);
    }
    function copyClassicalNahuatlLesson2ProsodicContourRule(rule) {
      if (!rule) {
        return null;
      }
      return {
        ...rule
      };
    }
    function getClassicalNahuatlLesson2ProsodicContourRules() {
      return CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.map(copyClassicalNahuatlLesson2ProsodicContourRule);
    }
    function isClassicalNahuatlLesson2SyllableVowel(sound) {
      return ["a", "e", "i", "o", "ā", "ē", "ī", "ō"].includes(sound);
    }
    function normalizeClassicalNahuatlLesson2StressSyllableInput(value) {
      return normalizeClassicalNahuatlOrthographyInput(value).replace(/[á]/gu, "a").replace(/[é]/gu, "e").replace(/[í]/gu, "i").replace(/[ó]/gu, "o");
    }
    function getClassicalNahuatlLesson2SyllableSoundSegmentations(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const consonantDigraphs = ["qu", "cu", "hu", "uc", "uh", "ch", "tz", "tl"];
      const singleConsonants = new Set(["c", "h", "l", "m", "n", "p", "t", "x", "y", "z"]);
      const cache = new Map();
      function segmentAt(index) {
        if (index >= normalized.length) {
          return [[]];
        }
        if (cache.has(index)) {
          return cache.get(index);
        }
        const char = normalized[index];
        if (isClassicalNahuatlLesson2BoundaryChar(char)) {
          const skipped = segmentAt(index + 1);
          cache.set(index, skipped);
          return skipped;
        }
        const segmentations = [];
        for (const digraph of consonantDigraphs) {
          if (normalized.startsWith(digraph, index)) {
            for (const rest of segmentAt(index + digraph.length)) {
              segmentations.push([digraph, ...rest]);
            }
          }
        }
        if (isClassicalNahuatlLesson2SyllableVowel(char) || singleConsonants.has(char)) {
          for (const rest of segmentAt(index + 1)) {
            segmentations.push([char, ...rest]);
          }
        }
        cache.set(index, segmentations);
        return segmentations;
      }
      return segmentAt(0);
    }
    function buildClassicalNahuatlLesson2SyllablesFromSounds(sounds) {
      const vowelIndexes = sounds.map((sound, index) => ({
        sound,
        index
      })).filter(entry => isClassicalNahuatlLesson2SyllableVowel(entry.sound)).map(entry => entry.index);
      const violations = [];
      if (!sounds.length) {
        violations.push("missing-vocable");
      }
      if (!vowelIndexes.length) {
        violations.push("missing-vowel");
      }
      const syllables = vowelIndexes.map(vowelIndex => ({
        onset: [],
        nucleus: sounds[vowelIndex],
        coda: []
      }));
      if (!vowelIndexes.length) {
        return {
          syllables: [],
          violations
        };
      }
      const firstCluster = sounds.slice(0, vowelIndexes[0]);
      if (firstCluster.length > 1) {
        violations.push("initial-consonant-cluster");
      } else if (firstCluster.length === 1) {
        syllables[0].onset = firstCluster;
      }
      for (let index = 0; index < vowelIndexes.length - 1; index += 1) {
        const cluster = sounds.slice(vowelIndexes[index] + 1, vowelIndexes[index + 1]);
        if (cluster.length > 2) {
          violations.push("too-many-medial-consonants");
        } else if (cluster.length === 1) {
          syllables[index + 1].onset = cluster;
        } else if (cluster.length === 2) {
          syllables[index].coda = [cluster[0]];
          syllables[index + 1].onset = [cluster[1]];
        }
      }
      const finalCluster = sounds.slice(vowelIndexes[vowelIndexes.length - 1] + 1);
      if (finalCluster.length > 1) {
        violations.push("final-consonant-cluster");
      } else if (finalCluster.length === 1) {
        syllables[syllables.length - 1].coda = finalCluster;
      }
      const syllableFrames = syllables.map(syllable => {
        const shape = `${syllable.onset.length ? "C" : ""}V${syllable.coda.length ? "C" : ""}`;
        return {
          onset: syllable.onset.slice(),
          nucleus: syllable.nucleus,
          coda: syllable.coda.slice(),
          shape,
          display: [...syllable.onset, syllable.nucleus, ...syllable.coda].join(""),
          open: syllable.coda.length === 0
        };
      });
      if (syllableFrames.some(syllable => !["V", "CV", "VC", "CVC"].includes(syllable.shape))) {
        violations.push("invalid-syllable-shape");
      }
      return {
        syllables: syllableFrames,
        violations
      };
    }
    function buildClassicalNahuatlLesson2SyllableStructureFrame(value, options = {}) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const segmentations = getClassicalNahuatlLesson2SyllableSoundSegmentations(normalized);
      const candidates = segmentations.map(sounds => ({
        sounds,
        result: buildClassicalNahuatlLesson2SyllablesFromSounds(sounds)
      }));
      const selected = candidates.find(candidate => candidate.result.violations.length === 0) || candidates[0] || {
        sounds: [],
        result: {
          syllables: [],
          violations: ["missing-vocable"]
        }
      };
      const sounds = selected.sounds;
      const syllables = selected.result.syllables;
      const violations = selected.result.violations;
      const vowelCount = sounds.filter(isClassicalNahuatlLesson2SyllableVowel).length;
      const hasStandaloneU = sounds.includes("u");
      const syllableCountMatchesVowelCount = syllables.length === vowelCount && vowelCount > 0;
      const authorized = normalized.length > 0 && violations.length === 0 && !hasStandaloneU && syllableCountMatchesVowelCount;
      return {
        kind: "classical-nahuatl-lesson2-syllable-structure-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.6",
        operationId: "cn-l2-syllable-structure",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1713,
        transcriptionLineEnd: 1758,
        exactWitness: "2.6. Syllable Structure. A vocable in Nahuatl has as many syllables as it has vowels",
        input: String(value == null ? "" : value),
        normalized,
        sounds,
        vowelCount,
        syllableCount: syllables.length,
        syllables,
        syllableDisplays: syllables.map(syllable => syllable.display),
        division: syllables.map(syllable => syllable.display).join("-"),
        violations,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : violations[0] || (hasStandaloneU ? "u-used-as-vowel" : "syllable-count-mismatch"),
        morphologyBoundaryIgnored: options.morphologyBoundaryIgnored !== false,
        premises: [{
          layer: "vowel-count",
          rule: "A vocable has as many syllables as it has vowels; there are no diphthongs.",
          passed: syllableCountMatchesVowelCount,
          vowelCount,
          syllableCount: syllables.length
        }, {
          layer: "syllable-shapes",
          rule: "Only V, CV, VC, and CVC syllable shapes are permitted.",
          passed: syllables.every(syllable => ["V", "CV", "VC", "CVC"].includes(syllable.shape)),
          shapes: syllables.map(syllable => syllable.shape)
        }, {
          layer: "u-digraph-only",
          rule: "In Lesson 2, u is not a vowel letter and appears only as part of a digraph.",
          passed: !hasStandaloneU
        }, {
          layer: "consonant-clusters",
          rule: "At most two consonant sounds may be juxtaposed, and medial pairs split across syllables.",
          passed: !violations.some(violation => ["initial-consonant-cluster", "too-many-medial-consonants", "final-consonant-cluster"].includes(violation))
        }, {
          layer: "phonology-not-morphology",
          rule: "Syllable division is phonological and must not be confused with morpheme or morph analysis.",
          passed: options.morphologyBoundaryIgnored !== false,
          morphologyBoundaryIgnored: options.morphologyBoundaryIgnored !== false
        }],
        conclusion: {
          authorized,
          division: authorized ? syllables.map(syllable => syllable.display).join("-") : "",
          syllableDisplays: authorized ? syllables.map(syllable => syllable.display) : []
        }
      };
    }
    function buildClassicalNahuatlLesson2StressFrame(value, options = {}) {
      const input = String(value == null ? "" : value);
      const normalized = normalizeClassicalNahuatlOrthographyInput(input);
      const syllableInput = normalizeClassicalNahuatlLesson2StressSyllableInput(input);
      const syllableFrame = buildClassicalNahuatlLesson2SyllableStructureFrame(syllableInput);
      const syllableDisplays = syllableFrame.syllableDisplays.slice();
      const hasVocativeAccent = /é$/u.test(normalized);
      const vocativeParticle = options.vocativeParticle === true || hasVocativeAccent;
      const stressGroup = options.stressGroup === true || /\s/u.test(normalized);
      const stressIndex = syllableDisplays.length ? vocativeParticle ? syllableDisplays.length - 1 : Math.max(0, syllableDisplays.length - 2) : -1;
      const authorized = syllableFrame.authorizationStatus === "authorized" && stressIndex >= 0;
      return {
        kind: "classical-nahuatl-lesson2-stress-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.7",
        operationId: "cn-l2-vocable-stress",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1759,
        transcriptionLineEnd: 1790,
        exactWitness: "Stress in Nahuatl vocables falls on the penultimate (next-to-the-last) syllable.",
        input,
        normalized,
        syllableInput,
        syllableFrame,
        syllableDisplays,
        division: syllableDisplays.join("-"),
        stressIndex,
        stressedSyllable: stressIndex >= 0 ? syllableDisplays[stressIndex] : "",
        stressRule: vocativeParticle ? "vocative-final-stress" : "penultimate",
        vocativeParticle,
        stressGroup,
        stressGroupDivision: stressGroup ? syllableDisplays.join("-") : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : syllableFrame.blockReason || "missing-stressable-syllable",
        premises: [{
          layer: "syllable-structure",
          rule: "Stress is assigned after Lesson 2.6 syllable division.",
          passed: syllableFrame.authorizationStatus === "authorized",
          syllableCount: syllableDisplays.length
        }, {
          layer: "penultimate-stress",
          rule: "Ordinary Nahuatl vocables stress the penultimate syllable.",
          passed: vocativeParticle || stressIndex === Math.max(0, syllableDisplays.length - 2),
          stressIndex
        }, {
          layer: "vocative-exception",
          rule: "The vocative particle #é is stressed as an exception.",
          passed: vocativeParticle ? stressIndex === syllableDisplays.length - 1 : true,
          vocativeParticle
        }, {
          layer: "stress-group",
          rule: "In connected speech, syllable division can operate across vocable boundaries within a stress group.",
          passed: stressGroup ? syllableFrame.authorizationStatus === "authorized" : true,
          stressGroup,
          stressGroupDivision: stressGroup ? syllableDisplays.join("-") : ""
        }],
        conclusion: {
          authorized,
          stressedSyllable: authorized ? syllableDisplays[stressIndex] || "" : "",
          stressIndex: authorized ? stressIndex : -1,
          stressRule: authorized ? vocativeParticle ? "vocative-final-stress" : "penultimate" : "",
          division: authorized ? syllableDisplays.join("-") : ""
        }
      };
    }
    function normalizeClassicalNahuatlLesson2ConsonantSound(value) {
      const raw = normalizeClassicalNahuatlOrthographyInput(value).replace(/[\/\[\]]/gu, "");
      if (raw === "č" || raw === "ch") {
        return "ch";
      }
      if (raw === "¢" || raw === "tz") {
        return "tz";
      }
      const normalized = raw.normalize("NFD").replace(/\u0325/gu, "").replace(/\u030c/gu, "");
      if (normalized === "kʷ" || normalized === "kw" || normalized === "cu") {
        return "cu";
      }
      if (["c", "h", "l", "m", "n", "p", "qu", "t", "x", "y", "z"].includes(normalized)) {
        return normalized;
      }
      return "";
    }
    function getClassicalNahuatlLesson2LongConsonantSpelling(sound) {
      if (!sound) {
        return "";
      }
      return `${sound}${sound}`;
    }
    function buildClassicalNahuatlLesson2ConsonantalLengthFrame(options = {}) {
      const leftConsonant = normalizeClassicalNahuatlLesson2ConsonantSound(options.leftConsonant || options.firstConsonant || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlLesson2ConsonantSound(options.rightConsonant || options.secondConsonant || options.consonant);
      const boundaryType = normalizeClassicalNahuatlOrthographyInput(options.boundaryType || "within-vocable");
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const identicalConsonants = Boolean(leftConsonant) && leftConsonant === rightConsonant;
      const withinVocable = boundaryType === "within-vocable" || boundaryType === "vocable-internal";
      const releaseFeatureLost = ["tz", "ch"].includes(leftConsonant) && identicalConsonants;
      const releasePronunciation = releaseFeatureLost ? leftConsonant === "tz" ? "[t¢]" : "[tč]" : "";
      const authorized = grammaticalConstruction && identicalConsonants;
      const outputSpelling = authorized && withinVocable ? getClassicalNahuatlLesson2LongConsonantSpelling(leftConsonant) : "";
      return {
        kind: "classical-nahuatl-lesson2-consonantal-length-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.8",
        operationId: "cn-l2-consonantal-length",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1791,
        transcriptionLineEnd: 1815,
        exactWitness: "When two identical consonants come together as a result of grammatical\nconstruction, they create a long consonant.",
        leftConsonant,
        rightConsonant,
        boundaryType,
        grammaticalConstruction,
        identicalConsonants,
        longConsonant: authorized,
        outputSpelling,
        pronunciationMode: authorized ? "single-bridging-pronunciation" : "",
        releaseFeatureLost,
        releasePronunciation,
        traditionalTextSpellingWarning: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : !grammaticalConstruction ? "not-grammatical-construction" : "consonants-not-identical",
        premises: [{
          layer: "grammatical-construction",
          rule: "The consonants come together as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "identical-consonants",
          rule: "Two identical consonants create a long consonant.",
          passed: identicalConsonants,
          leftConsonant,
          rightConsonant
        }, {
          layer: "single-pronunciation",
          rule: "The long consonant has a single bridging pronunciation, not two separate consonant pronunciations.",
          passed: authorized,
          pronunciationMode: authorized ? "single-bridging-pronunciation" : ""
        }, {
          layer: "within-vocable-spelling",
          rule: "A long consonant within a vocable is usually spelled with a double letter or double digraph.",
          passed: authorized ? withinVocable ? Boolean(outputSpelling) : true : false,
          outputSpelling
        }, {
          layer: "affricate-release",
          rule: "For tz/tz and ch/ch, the release feature of the first consonant is lost.",
          passed: releaseFeatureLost ? Boolean(releasePronunciation) : true,
          releaseFeatureLost,
          releasePronunciation
        }],
        conclusion: {
          authorized,
          longConsonant: authorized,
          outputSpelling,
          pronunciationMode: authorized ? "single-bridging-pronunciation" : "",
          releaseFeatureLost,
          releasePronunciation
        }
      };
    }
    function normalizeClassicalNahuatlLesson2AssimilationSound(value) {
      const raw = normalizeClassicalNahuatlOrthographyInput(value).replace(/[\/\[\]]/gu, "");
      if (raw === "λ" || raw === "tl") {
        return "tl";
      }
      if (raw === "š" || raw === "x") {
        return "x";
      }
      if (raw === "¢" || raw === "tz") {
        return "tz";
      }
      if (raw === "č" || raw === "ch") {
        return "ch";
      }
      if (raw === "kʷ" || raw === "kw" || raw === "cu" || raw === "uc") {
        return "kw";
      }
      if (raw === "w" || raw === "hu" || raw === "uh") {
        return "w";
      }
      if (raw === "ʔ" || raw === "glottal") {
        return "glottal";
      }
      const normalized = raw.normalize("NFD").replace(/\u0325/gu, "").replace(/\u030c/gu, "");
      if (normalized === "s" || normalized === "z") {
        return "s";
      }
      if (normalized === "c") {
        return "s";
      }
      if (normalized === "qu") {
        return "k";
      }
      if (["h", "k", "l", "m", "n", "p", "t", "y"].includes(normalized)) {
        return normalized;
      }
      return "";
    }
    function isClassicalNahuatlLesson2Nasal(sound) {
      return sound === "m" || sound === "n";
    }
    function isClassicalNahuatlLesson2Sibilant(sound) {
      return ["s", "x", "tz", "ch"].includes(sound);
    }
    function isClassicalNahuatlLesson2Bilabial(sound) {
      return sound === "m" || sound === "p";
    }
    function getClassicalNahuatlLesson2LongAssimilationOutcome(sound) {
      const outcomeMap = {
        l: {
          outputSound: "ll",
          outputSpelling: "ll"
        },
        s: {
          outputSound: "ss",
          outputSpelling: "zz"
        },
        x: {
          outputSound: "šš",
          outputSpelling: "xx"
        },
        tz: {
          outputSound: "¢¢",
          outputSpelling: "tztz",
          releasePronunciation: "[t¢]"
        },
        ch: {
          outputSound: "čč",
          outputSpelling: "chch",
          releasePronunciation: "[tč]"
        },
        m: {
          outputSound: "mm",
          outputSpelling: "mm"
        },
        n: {
          outputSound: "nn",
          outputSpelling: "nn"
        },
        p: {
          outputSound: "pp",
          outputSpelling: "pp"
        }
      };
      return outcomeMap[sound] || {
        outputSound: "",
        outputSpelling: ""
      };
    }
    function getClassicalNahuatlLesson2PartialAssimilationOutcome(leftConsonant, rightConsonant) {
      if (leftConsonant === "m") {
        const outcomeMap = {
          t: {
            outputSound: "nt",
            outputSpelling: "nt"
          },
          tl: {
            outputSound: "nλ",
            outputSpelling: "ntl"
          },
          tz: {
            outputSound: "n¢",
            outputSpelling: "ntz"
          },
          ch: {
            outputSound: "nč",
            outputSpelling: "nch"
          },
          k: {
            outputSound: "ŋk",
            outputSpelling: "nc"
          },
          kw: {
            outputSound: "ŋkʷ",
            outputSpelling: "ncu"
          }
        };
        return outcomeMap[rightConsonant] || {
          outputSound: "",
          outputSpelling: ""
        };
      }
      if (leftConsonant === "n" && rightConsonant === "p") {
        return {
          outputSound: "mp",
          outputSpelling: "mp"
        };
      }
      return {
        outputSound: "",
        outputSpelling: ""
      };
    }
    function getClassicalNahuatlLesson2AssimilationRuleOutcome(rule, leftConsonant, rightConsonant) {
      if (!rule) {
        return {
          outputSound: "",
          outputSpelling: "",
          releasePronunciation: ""
        };
      }
      if (rule.outputSound || rule.outputSpelling) {
        return {
          outputSound: rule.outputSound || "",
          outputSpelling: rule.outputSpelling || "",
          releasePronunciation: rule.releasePronunciation || ""
        };
      }
      if (rule.assimilationType === "partial") {
        return {
          ...getClassicalNahuatlLesson2PartialAssimilationOutcome(leftConsonant, rightConsonant),
          releasePronunciation: ""
        };
      }
      if (rule.dominantSide === "right") {
        return getClassicalNahuatlLesson2LongAssimilationOutcome(rightConsonant);
      }
      if (rule.dominantSide === "left") {
        return getClassicalNahuatlLesson2LongAssimilationOutcome(leftConsonant);
      }
      return {
        outputSound: "",
        outputSpelling: "",
        releasePronunciation: ""
      };
    }
    function findClassicalNahuatlLesson2AssimilationRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const leftConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first);
      const rightConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const exactRule = CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.matchKind === "exact" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant);
      if (exactRule) {
        return exactRule;
      }
      const dissimilationRule = CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.matchKind === "dissimilation" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant);
      if (dissimilationRule) {
        return dissimilationRule;
      }
      if (isClassicalNahuatlLesson2Nasal(leftConsonant) && isClassicalNahuatlLesson2Sibilant(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-nasal-sibilant") || null;
      }
      if (isClassicalNahuatlLesson2Sibilant(leftConsonant) && isClassicalNahuatlLesson2Sibilant(rightConsonant) && leftConsonant !== rightConsonant) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-sibilant-group") || null;
      }
      if (leftConsonant === "w" && isClassicalNahuatlLesson2Bilabial(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-w-bilabial") || null;
      }
      if (leftConsonant === "m" && ["t", "tl", "tz", "ch", "k", "kw"].includes(rightConsonant)) {
        return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES.find(rule => rule.id === "cn-l2-211-regressive-m-partial") || null;
      }
      return null;
    }
    function buildClassicalNahuatlLesson2AssimilationFrame(options = {}) {
      const leftConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first);
      const rightConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2AssimilationRule({
        ...options,
        leftConsonant,
        rightConsonant
      });
      const processKind = selectedRule?.processKind || "assimilation";
      const unlikeConsonants = Boolean(leftConsonant && rightConsonant && leftConsonant !== rightConsonant);
      const dissimilation = processKind === "dissimilation";
      const outcome = getClassicalNahuatlLesson2AssimilationRuleOutcome(selectedRule, leftConsonant, rightConsonant);
      const requestedSpellingMatches = !requestedSpelling || !outcome.outputSpelling || requestedSpelling === outcome.outputSpelling;
      const authorized = grammaticalConstruction && Boolean(selectedRule) && (unlikeConsonants || dissimilation) && requestedSpellingMatches && Boolean(outcome.outputSound || outcome.outputSpelling);
      const releaseFeatureLost = outcome.outputSpelling === "tztz" || outcome.outputSpelling === "chch";
      let blockReason = "";
      if (!authorized) {
        if (!grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (!leftConsonant || !rightConsonant) {
          blockReason = "missing-consonant";
        } else if (!unlikeConsonants && !dissimilation) {
          blockReason = "consonants-not-unlike";
        } else if (!selectedRule) {
          blockReason = "no-lesson2-assimilation-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-assimilation-rule";
        } else {
          blockReason = "missing-assimilation-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-lesson2-assimilation-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: selectedRule?.section || "2.9-2.11",
        operationId: "cn-l2-assimilation",
        processKind,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1816,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1896,
        exactWitness: selectedRule?.exactWitness || "2.9. Assimilation.",
        leftConsonant,
        rightConsonant,
        grammaticalConstruction,
        unlikeConsonants,
        direction: selectedRule?.direction || "",
        dominantSide: selectedRule?.dominantSide || "",
        assimilationType: selectedRule?.assimilationType || "",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2AssimilationRule(selectedRule),
        outputSound: authorized ? outcome.outputSound : "",
        outputSpelling: authorized ? outcome.outputSpelling : "",
        requestedSpelling,
        releaseFeatureLost: authorized ? releaseFeatureLost : false,
        releasePronunciation: authorized ? outcome.releasePronunciation || "" : "",
        lowFrequency: selectedRule?.lowFrequency === true,
        optional: selectedRule?.optional === true,
        traditionalSpellingMayHidePronunciation: ["cn-l2-211-regressive-nasal-sibilant", "cn-l2-211-regressive-sibilant-group"].includes(selectedRule?.id || ""),
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "grammatical-construction",
          rule: "Assimilation applies when consonants meet as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "unlike-consonants",
          rule: "Lesson 2.9 assimilation concerns unlike consonants; the dissimilation note is separately marked.",
          passed: unlikeConsonants || dissimilation,
          leftConsonant,
          rightConsonant,
          processKind
        }, {
          layer: "rule-selection",
          rule: "The consonant pair must match an Andrews 2.10 or 2.11 rule.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "direction",
          rule: "The proof records whether the dominant sound is progressive or regressive.",
          passed: Boolean(selectedRule?.direction) || dissimilation,
          direction: selectedRule?.direction || "",
          dominantSide: selectedRule?.dominantSide || ""
        }, {
          layer: "outcome",
          rule: "The selected rule must yield a long consonant, partial assimilation, or marked dissimilation output.",
          passed: Boolean(outcome.outputSound || outcome.outputSpelling),
          assimilationType: selectedRule?.assimilationType || "",
          outputSound: outcome.outputSound,
          outputSpelling: outcome.outputSpelling
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews assimilation outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: outcome.outputSpelling
        }],
        conclusion: {
          authorized,
          processKind: authorized ? processKind : "",
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          outputSound: authorized ? outcome.outputSound : "",
          outputSpelling: authorized ? outcome.outputSpelling : "",
          releasePronunciation: authorized ? outcome.releasePronunciation || "" : "",
          lowFrequency: selectedRule?.lowFrequency === true,
          optional: selectedRule?.optional === true
        }
      };
    }
    function getClassicalNahuatlLesson210BoundaryConsonant(part = "", side = "left") {
      const normalized = normalizeClassicalNahuatlOrthographyInput(part);
      const candidates = ["tl", "tz", "ch", "l", "s", "z", "x", "y"];
      return candidates.find(candidate => side === "right" ? normalized.startsWith(candidate) : normalized.endsWith(candidate)) || "";
    }
    function splitClassicalNahuatlLesson210AssimilationSpelling(outputSpelling = "") {
      const spelling = normalizeClassicalNahuatlOrthographyInput(outputSpelling);
      const pairs = {
        ll: ["l", "l"],
        zz: ["z", "z"],
        xx: ["x", "x"],
        tztz: ["tz", "tz"],
        chch: ["ch", "ch"]
      };
      return pairs[spelling] || ["", ""];
    }
    function buildClassicalNahuatlLesson210ProgressiveAssimilationFrame(stem = "", options = {}) {
      const sourceStem = normalizeClassicalNahuatlOrthographyInput(stem).replace(/^\((.*)\)$/u, "$1").replace(/^-|-$/gu, "");
      const sourceMorphs = sourceStem ? sourceStem.split("-").filter(Boolean) : [];
      const realizedMorphs = sourceMorphs.slice();
      const boundaryActions = [];
      const prohibitedLlBoundaryIndexes = [];
      for (let index = 0; index < realizedMorphs.length - 1; index += 1) {
        const leftMorph = realizedMorphs[index];
        const rightMorph = realizedMorphs[index + 1];
        const leftSpelling = getClassicalNahuatlLesson210BoundaryConsonant(leftMorph, "left");
        const rightSpelling = getClassicalNahuatlLesson210BoundaryConsonant(rightMorph, "right");
        if (leftSpelling === "l" && rightSpelling === "l") {
          prohibitedLlBoundaryIndexes.push(index);
          continue;
        }
        const assimilationFrame = buildClassicalNahuatlLesson2AssimilationFrame({
          leftConsonant: leftSpelling,
          rightConsonant: rightSpelling,
          grammaticalConstruction: true
        });
        const lesson210Rule = assimilationFrame.authorizationStatus === "authorized" && assimilationFrame.section === "2.10";
        if (!lesson210Rule) {
          continue;
        }
        const [leftOutput, rightOutput] = splitClassicalNahuatlLesson210AssimilationSpelling(assimilationFrame.outputSpelling);
        if (!leftOutput || !rightOutput) {
          continue;
        }
        realizedMorphs[index] = leftMorph.slice(0, -leftSpelling.length) + leftOutput;
        realizedMorphs[index + 1] = rightOutput + rightMorph.slice(rightSpelling.length);
        boundaryActions.push({
          kind: "classical-nahuatl-lesson2-10-progressive-assimilation-action",
          ruleAction: "realize-progressive-assimilation-at-morph-boundary",
          boundaryIndex: index,
          sourceLeftMorph: leftMorph,
          sourceRightMorph: rightMorph,
          sourceLeftConsonant: assimilationFrame.leftConsonant,
          sourceRightConsonant: assimilationFrame.rightConsonant,
          selectedRuleId: assimilationFrame.selectedRuleId,
          outputSound: assimilationFrame.outputSound,
          outputSpelling: assimilationFrame.outputSpelling,
          realizedLeftMorph: realizedMorphs[index],
          realizedRightMorph: realizedMorphs[index + 1],
          transcriptionLineStart: assimilationFrame.transcriptionLineStart,
          transcriptionLineEnd: assimilationFrame.transcriptionLineEnd,
          exactWitness: assimilationFrame.exactWitness
        });
      }
      const realizedAnalyzedStem = realizedMorphs.join("-");
      const realizedSolidStem = realizedMorphs.join("");
      const requestedRealizedStem = normalizeClassicalNahuatlOrthographyInput(options.requestedRealizedStem || options.requestedStem || "");
      const requestedMatches = !requestedRealizedStem || requestedRealizedStem === realizedAnalyzedStem || requestedRealizedStem === realizedSolidStem;
      const authorized = Boolean(sourceStem) && requestedMatches && prohibitedLlBoundaryIndexes.length === 0;
      return {
        kind: "classical-nahuatl-lesson2-10-progressive-assimilation-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.10",
        operationId: "cn-l2-210-progressive-assimilation-boundary-realization",
        ruleLogicRole: "morph-boundary-surface-realization",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: 1823,
        transcriptionLineEnd: 1841,
        exactWitness: "The following rules deal with the most frequent cases of progressive assimilation (the first consonant dominates the second)",
        generalRule: "At a grammatical morph boundary, apply only an Andrews 2.10 consonant pair; the first consonant determines the long output.",
        ruleVariables: {
          leftMorph: "morph before the boundary",
          rightMorph: "morph after the boundary",
          leftConsonant: "last consonant of the left morph",
          rightConsonant: "first consonant of the right morph"
        },
        ruleInputs: {
          sourceStem,
          sourceMorphs,
          boundaryCount: Math.max(0, sourceMorphs.length - 1)
        },
        ruleOutputs: {
          realizedAnalyzedStem,
          realizedSolidStem
        },
        sourceStem,
        sourceMorphs,
        realizedMorphs,
        realizedAnalyzedStem,
        realizedSolidStem,
        boundaryActions,
        appliedRuleIds: boundaryActions.map(action => action.selectedRuleId),
        transformationApplied: boundaryActions.length > 0,
        prohibitedLlBoundaryIndexes,
        llRestrictedToLesson210Rules: true,
        witnessesAreProofAnchorsNotWhitelist: true,
        requestedRealizedStem,
        requestedMatches,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : !sourceStem ? "missing-stem" : prohibitedLlBoundaryIndexes.length ? "ll-not-authorized-outside-lesson2-10-rules-1-2" : "requested-realization-conflicts-with-lesson2-10",
        ruleRefs: boundaryActions.map(action => ({
          id: action.selectedRuleId,
          tagId: action.selectedRuleId,
          section: "2.10",
          lineStart: action.transcriptionLineStart,
          lineEnd: action.transcriptionLineEnd,
          exactWitness: action.exactWitness
        }))
      };
    }
    function normalizeClassicalNahuatlLesson2LongVowelForLoss(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["a:", "ā", "a"].includes(normalized)) {
        return "a";
      }
      if (["o:", "ō", "o"].includes(normalized)) {
        return "o";
      }
      return "";
    }
    function findClassicalNahuatlLesson2ConsonantLossRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const leftConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const position = normalizeClassicalNahuatlOrthographyInput(options.position || options.stemPosition);
      const environment = normalizeClassicalNahuatlOrthographyInput(options.environment);
      if (leftConsonant === "glottal" && rightConsonant === "y") {
        if (options.firstConsonantLost === true || options.outputSound === "y" || normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling) === "y") {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-glottal-y-y") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-glottal-y-h") || null;
      }
      if (leftConsonant === "y" && (position === "stem-initial" || position === "initial")) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-initial-y-unstable-note") || null;
      }
      const leftVowel = normalizeClassicalNahuatlLesson2LongVowelForLoss(options.leftVowel || options.precedingVowel);
      const rightVowel = normalizeClassicalNahuatlLesson2LongVowelForLoss(options.rightVowel || options.followingVowel);
      if (leftConsonant === "y" && (environment === "between-long-a-o-vowels" || ["a", "o"].includes(leftVowel) && ["a", "o"].includes(rightVowel) && leftVowel !== rightVowel)) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-y-between-long-a-o-vowels") || null;
      }
      if (isClassicalNahuatlLesson2Nasal(leftConsonant) && rightConsonant === "y") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-nasal-y-y") || null;
      }
      if (isClassicalNahuatlLesson2Nasal(leftConsonant) && rightConsonant === "w") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.id === "cn-l2-212-nasal-w-w") || null;
      }
      return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES.find(rule => rule.matchKind === "exact" && rule.sourceLeft === leftConsonant && rule.sourceRight === rightConsonant) || null;
    }
    function buildClassicalNahuatlLesson2ConsonantLossFrame(options = {}) {
      const leftConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.leftConsonant || options.firstConsonant || options.left || options.first || options.consonant);
      const rightConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.rightConsonant || options.secondConsonant || options.right || options.second);
      const selectedRule = findClassicalNahuatlLesson2ConsonantLossRule({
        ...options,
        leftConsonant,
        rightConsonant
      });
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const requestedSpellingMatches = !requestedSpelling || !selectedRule?.outputSpelling || requestedSpelling === selectedRule.outputSpelling;
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requiresGrammaticalConstruction = !["cn-l2-212-initial-y-unstable-note", "cn-l2-212-y-between-long-a-o-vowels"].includes(selectedRule?.id || "");
      const reduplicationBlocked = selectedRule?.id === "cn-l2-212-glottal-y-y" && options.reduplicationGlottal === true;
      const hasLossOutcome = Boolean(selectedRule?.lostConsonant || selectedRule?.outputSound || selectedRule?.outputSpelling);
      const authorized = Boolean(selectedRule) && (!requiresGrammaticalConstruction || grammaticalConstruction) && !reduplicationBlocked && requestedSpellingMatches && hasLossOutcome;
      let blockReason = "";
      if (!authorized) {
        if (!selectedRule) {
          blockReason = "no-lesson2-consonant-loss-rule";
        } else if (requiresGrammaticalConstruction && !grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (reduplicationBlocked) {
          blockReason = "reduplicative-glottal-blocks-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-consonant-loss-rule";
        } else {
          blockReason = "missing-consonant-loss-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-lesson2-consonant-loss-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.12",
        operationId: "cn-l2-consonant-loss",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1897,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1935,
        exactWitness: selectedRule?.exactWitness || "2.12. Consonant Loss.",
        leftConsonant,
        rightConsonant,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ConsonantLossRule(selectedRule),
        grammaticalConstruction,
        requiresGrammaticalConstruction,
        lostSide: selectedRule?.lostSide || "",
        lostConsonant: selectedRule?.lostConsonant || "",
        outputSound: authorized ? selectedRule?.outputSound || "" : "",
        outputSpelling: authorized ? selectedRule?.outputSpelling || "" : "",
        requestedSpelling,
        optional: selectedRule?.optional === true,
        nasalizationTrace: selectedRule?.nasalizationTrace === true,
        reduplicationGlottal: options.reduplicationGlottal === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "consonant-sequence",
          rule: "Lesson 2.12 begins from consonant sequences where one consonant becomes imperceptible.",
          passed: Boolean(selectedRule),
          leftConsonant,
          rightConsonant,
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "grammatical-construction",
          rule: "Most consonant-loss rules are tied to grammatical construction unless Andrews marks them as a note.",
          passed: !requiresGrammaticalConstruction || grammaticalConstruction,
          requiresGrammaticalConstruction,
          grammaticalConstruction
        }, {
          layer: "loss-outcome",
          rule: "The selected rule identifies the lost consonant and the remaining phone or spelling trace.",
          passed: hasLossOutcome,
          lostSide: selectedRule?.lostSide || "",
          lostConsonant: selectedRule?.lostConsonant || "",
          outputSound: selectedRule?.outputSound || "",
          outputSpelling: selectedRule?.outputSpelling || ""
        }, {
          layer: "reduplication-block",
          rule: "The glottal+y -> y rule cannot operate when the glottal stop is due to reduplication.",
          passed: !reduplicationBlocked,
          reduplicationGlottal: options.reduplicationGlottal === true
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews consonant-loss outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: selectedRule?.outputSpelling || ""
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          lostConsonant: authorized ? selectedRule?.lostConsonant || "" : "",
          outputSound: authorized ? selectedRule?.outputSound || "" : "",
          outputSpelling: authorized ? selectedRule?.outputSpelling || "" : "",
          optional: selectedRule?.optional === true,
          nasalizationTrace: selectedRule?.nasalizationTrace === true
        }
      };
    }
    function normalizeClassicalNahuatlLesson2ExposedPosition(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["exposed", "syllable-final", "vocable-final", "word-final", "final", "end-of-syllable", "end-of-vocable"].includes(normalized)) {
        return "exposed";
      }
      if (["nonfinal", "non-final", "intervocalic"].includes(normalized)) {
        return normalized === "intervocalic" ? "intervocalic" : "nonfinal";
      }
      return "";
    }
    function findClassicalNahuatlLesson2ConsonantPhoneShiftRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const sourceConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.sourceConsonant || options.consonant || options.leftConsonant || options.firstConsonant);
      const position = normalizeClassicalNahuatlLesson2ExposedPosition(options.position || options.syllablePosition || options.vocablePosition);
      if (sourceConsonant === "glottal" && options.followingVowel) {
        if (options.intervocalicYDisappears === true || position === "intervocalic") {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-intervocalic-y-disappears") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-glottal-vowel-y") || null;
      }
      if (sourceConsonant === "m" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-m-exposed-n") || null;
      }
      if (sourceConsonant === "y" && position === "exposed") {
        if (options.priorSSound === true) {
          return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-y-exposed-prior-s") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-y-exposed-x") || null;
      }
      if (sourceConsonant === "kw" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-kw-exposed-k") || null;
      }
      if (sourceConsonant === "t" && position === "exposed") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-t-final-h") || null;
      }
      if (sourceConsonant === "glottal" && position === "nonfinal") {
        return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES.find(rule => rule.id === "cn-l2-213-rare-glottal-nonfinal-t") || null;
      }
      return null;
    }
    function buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame(options = {}) {
      const sourceConsonant = normalizeClassicalNahuatlLesson2AssimilationSound(options.sourceConsonant || options.consonant || options.leftConsonant || options.firstConsonant);
      const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
      const position = normalizeClassicalNahuatlLesson2ExposedPosition(options.position || options.syllablePosition || options.vocablePosition);
      const selectedRule = findClassicalNahuatlLesson2ConsonantPhoneShiftRule({
        ...options,
        sourceConsonant,
        followingVowel,
        position
      });
      const grammaticalConstruction = options.grammaticalConstruction !== false;
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      let outputSound = selectedRule?.outputSound || "";
      let outputSpelling = selectedRule?.outputSpelling || "";
      if (selectedRule?.id === "cn-l2-213-glottal-vowel-y" && followingVowel) {
        outputSound = `y${followingVowel}`;
        outputSpelling = `y${followingVowel}`;
      }
      if (selectedRule?.id === "cn-l2-213-intervocalic-y-disappears" && followingVowel) {
        outputSound = followingVowel;
        outputSpelling = followingVowel;
      }
      if (selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true) {
        outputSound = "m";
        outputSpelling = "m";
      }
      const requestedSpellingMatches = !requestedSpelling || !outputSpelling || requestedSpelling === outputSpelling;
      const authorized = grammaticalConstruction && Boolean(selectedRule) && requestedSpellingMatches && Boolean(outputSound || outputSpelling);
      let blockReason = "";
      if (!authorized) {
        if (!grammaticalConstruction) {
          blockReason = "not-grammatical-construction";
        } else if (!selectedRule) {
          blockReason = "no-lesson2-consonant-phone-shift-rule";
        } else if (!requestedSpellingMatches) {
          blockReason = "requested-spelling-conflicts-with-consonant-phone-shift-rule";
        } else {
          blockReason = "missing-consonant-phone-shift-outcome";
        }
      }
      return {
        kind: "classical-nahuatl-lesson2-consonant-phone-shift-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.13",
        operationId: "cn-l2-consonant-phone-shift",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1936,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1978,
        exactWitness: selectedRule?.exactWitness || "2.13. Consonant-Phone Shift Other Than Assimilation.",
        sourceConsonant,
        followingVowel,
        position,
        grammaticalConstruction,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ConsonantPhoneShiftRule(selectedRule),
        outputSound: authorized ? outputSound : "",
        outputSpelling: authorized ? outputSpelling : "",
        requestedSpelling,
        optional: selectedRule?.optional === true,
        rare: selectedRule?.rare === true,
        priorSSound: options.priorSSound === true,
        intervocalicYDisappears: selectedRule?.id === "cn-l2-213-intervocalic-y-disappears",
        followingVocableBeginsWithVowel: options.followingVocableBeginsWithVowel === true,
        revertsToOriginalM: selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "grammatical-construction",
          rule: "Lesson 2.13 shifts occur as a result of grammatical construction.",
          passed: grammaticalConstruction
        }, {
          layer: "environment",
          rule: "The consonant must be followed by a vowel or be exposed at syllable/vocable edge.",
          passed: Boolean(selectedRule),
          sourceConsonant,
          followingVowel,
          position
        }, {
          layer: "phone-shift-selection",
          rule: "The selected shift must be one of Andrews' listed 2.13 cases.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "output-phone",
          rule: "The selected rule yields the irregular phone or the marked disappearance result.",
          passed: Boolean(outputSound || outputSpelling),
          outputSound,
          outputSpelling
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews consonant-phone shift outcome.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: outputSpelling
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          outputSound: authorized ? outputSound : "",
          outputSpelling: authorized ? outputSpelling : "",
          optional: selectedRule?.optional === true,
          rare: selectedRule?.rare === true,
          revertsToOriginalM: selectedRule?.id === "cn-l2-213-m-exposed-n" && options.followingVocableBeginsWithVowel === true
        }
      };
    }
    function buildClassicalNahuatlLesson2VowelElisionFrame(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const vowelLength = normalizeClassicalNahuatlOrthographyInput(options.vowelLength || "short");
      const supportiveI = options.supportiveI === true;
      const stressGroupCombination = options.stressGroupCombination !== false;
      const selectedRule = requestedRuleId ? CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.find(rule => rule.id === requestedRuleId) || null : supportiveI ? CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.find(rule => rule.id === "cn-l2-214-supportive-i-not-proper-elision") : CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES.find(rule => rule.id === "cn-l2-214-short-vowel-stress-group-elision");
      const longVowelBlocked = vowelLength === "long" && selectedRule?.id !== "cn-l2-214-long-vowel-resists-elision";
      const authorized = Boolean(selectedRule) && stressGroupCombination && !longVowelBlocked;
      return {
        kind: "classical-nahuatl-lesson2-vowel-elision-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.14",
        operationId: "cn-l2-vowel-elision",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1979,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1990,
        exactWitness: selectedRule?.exactWitness || "2.14. Vowel Elision.",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2VowelElisionRule(selectedRule),
        vowelLength,
        supportiveI,
        stressGroupCombination,
        properElision: !supportiveI,
        spellingChangeOftenNecessary: selectedRule?.id === "cn-l2-214-spelling-change-required" || options.indicatedInWriting === true,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : longVowelBlocked ? "long-vowel-resists-elision" : "not-set-stress-group-combination",
        premises: [{
          layer: "stress-group-combination",
          rule: "Vowel elision occurs in set stress-group combinations.",
          passed: stressGroupCombination
        }, {
          layer: "short-vowel",
          rule: "Initial or final short vowels can be elided; long vowels tend not to undergo elision.",
          passed: !longVowelBlocked,
          vowelLength
        }, {
          layer: "supportive-i",
          rule: "Supportive-i omission is recorded but is not properly phonemic elision.",
          passed: true,
          supportiveI,
          properElision: !supportiveI
        }],
        conclusion: {
          authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : "",
          properElision: authorized ? !supportiveI : false,
          spellingChangeOftenNecessary: selectedRule?.id === "cn-l2-214-spelling-change-required" || options.indicatedInWriting === true
        }
      };
    }
    function buildClassicalNahuatlLesson2LongVowelGlottalFrame(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      const morpheme = normalizeClassicalNahuatlOrthographyInput(options.morpheme || "");
      const permittedMorphemes = ["a", "ā", "huē", "hue", "teō", "teo", "māi", "mai"];
      const compoundSubposition = normalizeClassicalNahuatlOrthographyInput(options.compoundSubposition || options.subposition);
      const embedSubposition = compoundSubposition === "embed";
      const matrixDeterminesChoice = options.matrixDeterminesChoice === true || options.matrixMorpheme != null;
      const selectedRule = requestedRuleId ? CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.find(rule => rule.id === requestedRuleId) || null : CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES.find(rule => rule.id === "cn-l2-215-irregular-short-vowel-glottal-morph");
      const morphemePermitted = !morpheme || permittedMorphemes.includes(morpheme);
      const authorized = Boolean(selectedRule) && morphemePermitted && embedSubposition && matrixDeterminesChoice;
      return {
        kind: "classical-nahuatl-lesson2-long-vowel-glottal-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.15",
        operationId: "cn-l2-long-vowel-glottal-stop",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1991,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1999,
        exactWitness: selectedRule?.exactWitness || "2.15. Long Vowel to Short Vowel Plus Glottal Stop.",
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2LongVowelGlottalRule(selectedRule),
        morpheme,
        morphemePermitted,
        compoundSubposition,
        embedSubposition,
        matrixDeterminesChoice,
        outputMorphType: authorized ? "short-vowel-plus-glottal-stop" : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : !morphemePermitted ? "morpheme-not-in-small-permitted-class" : !embedSubposition ? "not-embed-subposition" : "matrix-does-not-determine-choice",
        premises: [{
          layer: "small-morpheme-class",
          rule: "Only a small number of morphemes permit the irregular glottal morph.",
          passed: morphemePermitted,
          morpheme
        }, {
          layer: "embed-subposition",
          rule: "The glottal-stop morph must occupy the embed subposition of a compound stem.",
          passed: embedSubposition,
          compoundSubposition
        }, {
          layer: "matrix-determination",
          rule: "The matrix morpheme determines the choice of glottal morph.",
          passed: matrixDeterminesChoice
        }],
        conclusion: {
          authorized,
          outputMorphType: authorized ? "short-vowel-plus-glottal-stop" : "",
          selectedRuleId: authorized ? selectedRule?.id || "" : ""
        }
      };
    }
    function buildClassicalNahuatlLesson2ProsodicContourFrame(options = {}) {
      const contourType = normalizeClassicalNahuatlOrthographyInput(options.contourType || options.kind || "sentential-prosody");
      let selectedRule = null;
      if (contourType === "nuclear-clause-stress" || contourType === "stress-group") {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-known-stress-rules") || null;
      } else if (contourType === "long-final-vowel-low-pitch") {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-long-final-vowel-low-pitch") || null;
      } else {
        selectedRule = CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES.find(rule => rule.id === "cn-l2-216-sentential-prosody-unknown") || null;
      }
      const sententialUnknown = selectedRule?.id === "cn-l2-216-sentential-prosody-unknown";
      const authorized = Boolean(selectedRule) && !sententialUnknown;
      return {
        kind: "classical-nahuatl-lesson2-prosodic-contour-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.16",
        operationId: "cn-l2-prosodic-contours",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 2004,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 2010,
        exactWitness: selectedRule?.exactWitness || "2.16. Prosodic Contours.",
        contourType,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2ProsodicContourRule(selectedRule),
        sententialProsodyKnown: !sententialUnknown,
        outputGenerationAllowed: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : "sentential-prosody-lacks-information",
        premises: [{
          layer: "known-contour-domain",
          rule: "Only nuclear-clause/stress-group stress and long-final-vowel low pitch are available as known contour facts.",
          passed: authorized,
          contourType
        }, {
          layer: "sentential-prosody-limit",
          rule: "Sentential prosodic features must be left undiscussed for lack of information.",
          passed: !sententialUnknown,
          sententialUnknown
        }],
        conclusion: {
          authorized,
          outputGenerationAllowed: authorized,
          selectedRuleId: authorized ? selectedRule?.id || "" : ""
        }
      };
    }
    function normalizeClassicalNahuatlLesson2BoundaryType(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      if (["compound", "compound-stem-boundary", "stem-boundary", "internal-open-transition"].includes(normalized)) {
        return "compound-stem-boundary";
      }
      return "";
    }
    function findClassicalNahuatlLesson2OpenTransitionRule(options = {}) {
      const requestedRuleId = normalizeClassicalNahuatlOrthographyInput(options.ruleId);
      if (requestedRuleId) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === requestedRuleId) || null;
      }
      const boundaryType = normalizeClassicalNahuatlLesson2BoundaryType(options.boundaryType || "compound");
      if (!boundaryType) {
        return null;
      }
      if (options.stemInitialSupportiveI === true) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-supportive-i-kept") || null;
      }
      const phoneme = normalizeClassicalNahuatlLesson2Phoneme(options.stemFinalPhoneme || options.phoneme);
      const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      if (phoneme === "/k/" && ["e", "i"].includes(followingVowel)) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-k-before-e-i-qu") || null;
      }
      if (phoneme === "[kʷ]" && followingVowel) {
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-kw-before-vowel-cu") || null;
      }
      if (phoneme === "[w]" && followingVowel) {
        if (requestedSpelling === "hu") {
          return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-w-before-vowel-hu-variant") || null;
        }
        return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-stem-final-w-vocable-final") || null;
      }
      return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES.find(rule => rule.id === "cn-l2-25-compound-boundary-open-transition") || null;
    }
    function buildClassicalNahuatlLesson2OpenTransitionFrame(options = {}) {
      const boundaryType = normalizeClassicalNahuatlLesson2BoundaryType(options.boundaryType || "compound");
      const phoneme = normalizeClassicalNahuatlLesson2Phoneme(options.stemFinalPhoneme || options.phoneme);
      const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2OpenTransitionRule({
        ...options,
        boundaryType,
        phoneme,
        followingVowel,
        requestedSpelling
      });
      const expectedSpelling = selectedRule?.outputSpelling || "";
      const requestedSpellingMatches = !requestedSpelling || !expectedSpelling || requestedSpelling === expectedSpelling;
      const authorized = Boolean(selectedRule) && requestedSpellingMatches;
      return {
        kind: "classical-nahuatl-lesson2-open-transition-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.5",
        operationId: "cn-l2-open-transition",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1701,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1712,
        exactWitness: selectedRule?.exactWitness || "2.5. Spelling at Points of Internal Open Transition.",
        boundaryType,
        stemFinalPhoneme: phoneme,
        followingVowel,
        stemInitialSupportiveI: options.stemInitialSupportiveI === true,
        requestedSpelling,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: copyClassicalNahuatlLesson2OpenTransitionRule(selectedRule),
        outputSpelling: authorized ? expectedSpelling : "",
        outputExample: authorized ? selectedRule?.outputExample || selectedRule?.examples?.[0] || "" : "",
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason: authorized ? "" : selectedRule ? "requested-spelling-conflicts-with-open-transition-rule" : "no-lesson2-open-transition-rule",
        premises: [{
          layer: "transcription-witness",
          rule: "Lesson 2.5 is cited by exact transcription lines.",
          passed: true,
          transcriptionLineStart: selectedRule?.transcriptionLineStart || 1701,
          transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1712
        }, {
          layer: "compound-boundary",
          rule: "The rule applies when two stems are joined by compounding.",
          passed: boundaryType === "compound-stem-boundary",
          boundaryType
        }, {
          layer: "open-transition-selection",
          rule: "Open transition preserves the stem boundary and selects listed spelling consequences or exceptions.",
          passed: Boolean(selectedRule),
          selectedRuleId: selectedRule?.id || ""
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the selected open-transition consequence.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling
        }],
        conclusion: {
          authorized,
          selectedRuleId: selectedRule?.id || "",
          outputSpelling: authorized ? expectedSpelling : "",
          outputExample: authorized ? selectedRule?.outputExample || selectedRule?.examples?.[0] || "" : "",
          spelledAsVocableFinal: selectedRule?.spelledAsVocableFinal === true,
          exception: selectedRule?.exception === true
        }
      };
    }
    function findClassicalNahuatlLesson2SpellingChangeRule(options = {}) {
      const phoneme = normalizeClassicalNahuatlLesson2Phoneme(options.phoneme);
      const syllablePosition = inferClassicalNahuatlLesson2SyllablePosition(options, phoneme);
      const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
      const precedingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.precedingVowel);
      return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES.find(rule => {
        const positionMatches = rule.syllablePosition === syllablePosition || rule.syllablePosition === "nonfinal" && syllablePosition === "initial";
        if (rule.phoneme !== phoneme || !positionMatches) {
          return false;
        }
        if (syllablePosition === "initial" || syllablePosition === "nonfinal") {
          return Array.isArray(rule.followingVowels) && rule.followingVowels.includes(followingVowel);
        }
        if (syllablePosition === "final") {
          return Array.isArray(rule.precedingVowels) && rule.precedingVowels.includes(precedingVowel);
        }
        return false;
      }) || null;
    }
    function getClassicalNahuatlLesson2SpellingChangeExample(rule, options = {}) {
      if (!rule) {
        return "";
      }
      if (rule.syllablePosition === "initial" || rule.syllablePosition === "nonfinal") {
        const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
        return followingVowel ? `${rule.spelling}${followingVowel}` : rule.examples[0];
      }
      const precedingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.precedingVowel);
      return precedingVowel ? `${precedingVowel}${rule.spelling}` : rule.examples[0];
    }
    function buildClassicalNahuatlLesson2SpellingChangeFrame(options = {}) {
      const phoneme = normalizeClassicalNahuatlLesson2Phoneme(options.phoneme);
      const syllablePosition = inferClassicalNahuatlLesson2SyllablePosition(options, phoneme);
      const followingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.followingVowel);
      const precedingVowel = normalizeClassicalNahuatlLesson2SimpleVowel(options.precedingVowel);
      const requestedSpelling = normalizeClassicalNahuatlOrthographyInput(options.requestedSpelling);
      const selectedRule = findClassicalNahuatlLesson2SpellingChangeRule({
        phoneme,
        syllablePosition,
        followingVowel,
        precedingVowel
      });
      const requestedSpellingMatches = !requestedSpelling || selectedRule && requestedSpelling === selectedRule.spelling;
      const authorized = Boolean(selectedRule) && requestedSpellingMatches;
      const blockReason = selectedRule ? requestedSpellingMatches ? "" : "requested-spelling-conflicts-with-transcription-environment" : "no-lesson2-spelling-change-rule";
      const ruleCopy = selectedRule ? {
        ...selectedRule,
        followingVowels: Array.isArray(selectedRule.followingVowels) ? selectedRule.followingVowels.slice() : [],
        precedingVowels: Array.isArray(selectedRule.precedingVowels) ? selectedRule.precedingVowels.slice() : [],
        examples: selectedRule.examples.slice()
      } : null;
      return {
        kind: "classical-nahuatl-lesson2-spelling-change-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        lesson: "Andrews Lesson 2",
        section: "2.4",
        operationId: selectedRule?.operationId || "cn-l2-spelling-changes",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        transcriptionLineStart: selectedRule?.transcriptionLineStart || 1686,
        transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1696,
        exactWitness: selectedRule?.exactWitness || "2.4. Spelling Changes.",
        phoneme,
        syllablePosition,
        followingVowel,
        precedingVowel,
        requestedSpelling,
        selectedRuleId: selectedRule?.id || "",
        selectedRule: ruleCopy,
        outputSpelling: authorized ? selectedRule.spelling : "",
        outputExample: authorized ? getClassicalNahuatlLesson2SpellingChangeExample(selectedRule, {
          followingVowel,
          precedingVowel
        }) : "",
        pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null,
        authorizationStatus: authorized ? "authorized" : "blocked",
        proofStatus: authorized ? "proven" : "blocked",
        blockReason,
        premises: [{
          layer: "transcription-witness",
          rule: "Lesson 2.4 is cited by exact transcription lines.",
          passed: true,
          transcriptionLineStart: selectedRule?.transcriptionLineStart || 1686,
          transcriptionLineEnd: selectedRule?.transcriptionLineEnd || 1696
        }, {
          layer: "phoneme",
          rule: "Lesson 2.4 spelling-change logic covers /k/, /s/, [w], and [kʷ].",
          passed: phoneme === "/k/" || phoneme === "/s/" || phoneme === "[w]" || phoneme === "[kʷ]",
          phoneme
        }, {
          layer: "environment",
          rule: "The spelling choice depends on syllable position and the neighboring vowel.",
          passed: Boolean(selectedRule),
          syllablePosition,
          followingVowel,
          precedingVowel
        }, {
          layer: "pronunciation",
          rule: "Lesson 2.4 distinguishes spelling-only changes from spelling changes that mark pronunciation contrast.",
          passed: Boolean(selectedRule),
          pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null,
          pronunciationPhone: selectedRule?.pronunciationPhone || ""
        }, {
          layer: "requested-spelling",
          rule: "A requested spelling must match the Andrews environment rule.",
          passed: requestedSpellingMatches,
          requestedSpelling,
          expectedSpelling: selectedRule?.spelling || ""
        }],
        conclusion: {
          authorized,
          outputSpelling: authorized ? selectedRule.spelling : "",
          outputExample: authorized ? getClassicalNahuatlLesson2SpellingChangeExample(selectedRule, {
            followingVowel,
            precedingVowel
          }) : "",
          pronunciationChanged: selectedRule ? selectedRule.pronunciationChanged : null
        }
      };
    }
    function isClassicalNahuatlLesson2BoundaryChar(char) {
      return CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS.includes(char);
    }
    function splitClassicalNahuatlLesson2Graphemes(value) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const digraphs = CLASSICAL_NAHUATL_LESSON2_DIGRAPHS.slice().sort((a, b) => b.length - a.length);
      const graphemes = [];
      for (let index = 0; index < normalized.length;) {
        const char = normalized[index];
        if (isClassicalNahuatlLesson2BoundaryChar(char)) {
          index += 1;
          continue;
        }
        const digraph = digraphs.find(item => normalized.startsWith(item, index));
        if (digraph) {
          graphemes.push(digraph);
          index += digraph.length;
          continue;
        }
        graphemes.push(char);
        index += 1;
      }
      return graphemes;
    }
    function getInvalidClassicalNahuatlLesson2Graphemes(value) {
      const allowed = new Set([...CLASSICAL_NAHUATL_LESSON2_LETTERS, ...CLASSICAL_NAHUATL_LESSON2_DIGRAPHS, ...CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS]);
      return splitClassicalNahuatlLesson2Graphemes(value).filter(grapheme => !allowed.has(grapheme));
    }
    function getClassicalNahuatlLesson2CoverageFrame() {
      const coverageBuilder = getClassicalNahuatlLesson2RuntimeTarget()?.buildLesson2CoverageFrame;
      if (typeof coverageBuilder === "function") {
        return coverageBuilder();
      }
      return {
        pdfRefs: [],
        inventory: []
      };
    }
    function attachClassicalNahuatlLesson2Contract(frame, options = {}) {
      const attach = getClassicalNahuatlLesson2RuntimeTarget()?.attachOrthographyGrammarContract;
      if (typeof attach === "function") {
        return attach(frame, options);
      }
      frame.grammarFrame = {
        kind: `${options.metadataKind || frame.kind}-grammar-contract`,
        version: frame.version,
        routeStage: options.routeStage || "",
        orthographyFrame: options.orthographyFrame || {},
        targetContract: options.targetContract || {},
        diagnostics: options.diagnostics || []
      };
      return frame;
    }
    function buildClassicalNahuatlLesson2ProofFrame(orthographyFrame = {}) {
      const invalidGraphemes = Array.isArray(orthographyFrame.invalidGraphemes) ? orthographyFrame.invalidGraphemes : [];
      const normalized = String(orthographyFrame.normalized || "");
      const hasSource = normalized.length > 0;
      const profileSeparated = orthographyFrame.sourceProfileId === CLASSICAL_NAHUATL_PROFILE_ID && orthographyFrame.targetProfileId === CLASSICAL_NAHUATL_PROFILE_ID && orthographyFrame.profileSeparationMechanism === "profile-selection" && orthographyFrame.spellingInspection === "not-performed";
      const directTranscription = orthographyFrame.surface === normalized && orthographyFrame.orthographyPolicy === "transcription-direct" && orthographyFrame.nawatPipilOrthographyBridge === "not-applied";
      const graphemeInventoryAccepted = invalidGraphemes.length === 0;
      const spellingChangeRules = Array.isArray(orthographyFrame.spellingChangeInventory) ? orthographyFrame.spellingChangeInventory : [];
      const requiredSpellingChangeRuleIds = ["cn-l2-24-k-initial-before-e-i", "cn-l2-24-s-initial-before-e-i", "cn-l2-24-w-final", "cn-l2-24-kw-final"];
      const spellingChangeAuthorityAccepted = requiredSpellingChangeRuleIds.every(ruleId => spellingChangeRules.some(rule => rule.id === ruleId)) && spellingChangeRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const openTransitionRules = Array.isArray(orthographyFrame.openTransitionInventory) ? orthographyFrame.openTransitionInventory : [];
      const requiredOpenTransitionRuleIds = ["cn-l2-25-compound-boundary-open-transition", "cn-l2-25-supportive-i-kept", "cn-l2-25-stem-final-w-vocable-final", "cn-l2-25-stem-final-k-before-e-i-qu", "cn-l2-25-stem-final-kw-before-vowel-cu", "cn-l2-25-stem-final-w-before-vowel-hu-variant"];
      const openTransitionAuthorityAccepted = requiredOpenTransitionRuleIds.every(ruleId => openTransitionRules.some(rule => rule.id === ruleId)) && openTransitionRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const syllableStructureRules = Array.isArray(orthographyFrame.syllableStructureInventory) ? orthographyFrame.syllableStructureInventory : [];
      const requiredSyllableStructureRuleIds = ["cn-l2-26-vowel-count-no-diphthongs", "cn-l2-26-four-syllable-shapes", "cn-l2-26-intervocalic-consonant-onset", "cn-l2-26-vowel-sequence-separated", "cn-l2-26-u-is-digraph-only", "cn-l2-26-two-consonant-cluster-split", "cn-l2-26-digraphs-single-consonant", "cn-l2-26-supportive-i-illegal-sequence", "cn-l2-26-phonological-not-morphological"];
      const syllableStructureAuthorityAccepted = requiredSyllableStructureRuleIds.every(ruleId => syllableStructureRules.some(rule => rule.id === ruleId)) && syllableStructureRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const stressRules = Array.isArray(orthographyFrame.stressInventory) ? orthographyFrame.stressInventory : [];
      const requiredStressRuleIds = ["cn-l2-27-penultimate-vocable-stress", "cn-l2-27-final-short-vowel-contrast", "cn-l2-27-vocative-particle-exception", "cn-l2-27-stress-group-connected-speech"];
      const stressAuthorityAccepted = requiredStressRuleIds.every(ruleId => stressRules.some(rule => rule.id === ruleId)) && stressRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const consonantalLengthRules = Array.isArray(orthographyFrame.consonantalLengthInventory) ? orthographyFrame.consonantalLengthInventory : [];
      const requiredConsonantalLengthRuleIds = ["cn-l2-28-identical-consonants-create-long-consonant", "cn-l2-28-single-bridging-pronunciation", "cn-l2-28-affricate-release-feature-loss", "cn-l2-28-within-vocable-double-spelling", "cn-l2-28-traditional-text-spelling-warning"];
      const consonantalLengthAuthorityAccepted = requiredConsonantalLengthRuleIds.every(ruleId => consonantalLengthRules.some(rule => rule.id === ruleId)) && consonantalLengthRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const assimilationRules = Array.isArray(orthographyFrame.assimilationInventory) ? orthographyFrame.assimilationInventory : [];
      const requiredAssimilationRuleIds = ["cn-l2-29-grammatical-unlike-consonants", "cn-l2-29-progressive-vs-regressive", "cn-l2-210-progressive-l-tl-ll", "cn-l2-210-progressive-l-y-ll", "cn-l2-210-progressive-s-y-ss", "cn-l2-210-progressive-x-y-xx", "cn-l2-210-progressive-tz-y-tztz", "cn-l2-210-progressive-ch-y-chch", "cn-l2-210-ll-only-listed", "cn-l2-211-regressive-nasal-sibilant", "cn-l2-211-regressive-sibilant-group", "cn-l2-211-regressive-w-bilabial", "cn-l2-211-regressive-m-n-nn", "cn-l2-211-regressive-m-partial", "cn-l2-211-regressive-n-m-mm", "cn-l2-211-regressive-n-p-mp", "cn-l2-211-low-frequency-ch-p-pp", "cn-l2-211-regressive-dissimilation-kk-hk"];
      const assimilationAuthorityAccepted = requiredAssimilationRuleIds.every(ruleId => assimilationRules.some(rule => rule.id === ruleId)) && assimilationRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const consonantLossRules = Array.isArray(orthographyFrame.consonantLossInventory) ? orthographyFrame.consonantLossInventory : [];
      const requiredConsonantLossRuleIds = ["cn-l2-212-loss-general", "cn-l2-212-tz-w-tz", "cn-l2-212-ch-w-ch", "cn-l2-212-glottal-y-h", "cn-l2-212-glottal-y-y", "cn-l2-212-glottal-y-y-reduplication-block", "cn-l2-212-initial-y-unstable-note", "cn-l2-212-y-between-long-a-o-vowels", "cn-l2-212-nasal-y-y", "cn-l2-212-nasal-w-w", "cn-l2-212-w-w-w"];
      const consonantLossAuthorityAccepted = requiredConsonantLossRuleIds.every(ruleId => consonantLossRules.some(rule => rule.id === ruleId)) && consonantLossRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const consonantPhoneShiftRules = Array.isArray(orthographyFrame.consonantPhoneShiftInventory) ? orthographyFrame.consonantPhoneShiftInventory : [];
      const requiredConsonantPhoneShiftRuleIds = ["cn-l2-213-phone-shift-general", "cn-l2-213-glottal-vowel-y", "cn-l2-213-intervocalic-y-disappears", "cn-l2-213-m-exposed-n", "cn-l2-213-y-exposed-x", "cn-l2-213-y-exposed-prior-s", "cn-l2-213-kw-exposed-k", "cn-l2-213-t-final-h", "cn-l2-213-rare-glottal-nonfinal-t"];
      const consonantPhoneShiftAuthorityAccepted = requiredConsonantPhoneShiftRuleIds.every(ruleId => consonantPhoneShiftRules.some(rule => rule.id === ruleId)) && consonantPhoneShiftRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const vowelElisionRules = Array.isArray(orthographyFrame.vowelElisionInventory) ? orthographyFrame.vowelElisionInventory : [];
      const requiredVowelElisionRuleIds = ["cn-l2-214-short-vowel-stress-group-elision", "cn-l2-214-long-vowel-resists-elision", "cn-l2-214-listed-stress-group-examples", "cn-l2-214-spelling-change-required", "cn-l2-214-supportive-i-not-proper-elision"];
      const vowelElisionAuthorityAccepted = requiredVowelElisionRuleIds.every(ruleId => vowelElisionRules.some(rule => rule.id === ruleId)) && vowelElisionRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const longVowelGlottalRules = Array.isArray(orthographyFrame.longVowelGlottalInventory) ? orthographyFrame.longVowelGlottalInventory : [];
      const requiredLongVowelGlottalRuleIds = ["cn-l2-215-irregular-short-vowel-glottal-morph", "cn-l2-215-small-number-of-morphemes", "cn-l2-215-embed-subposition-required", "cn-l2-215-matrix-determines-choice", "cn-l2-215-listed-examples"];
      const longVowelGlottalAuthorityAccepted = requiredLongVowelGlottalRuleIds.every(ruleId => longVowelGlottalRules.some(rule => rule.id === ruleId)) && longVowelGlottalRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const prosodicContourRules = Array.isArray(orthographyFrame.prosodicContourInventory) ? orthographyFrame.prosodicContourInventory : [];
      const requiredProsodicContourRuleIds = ["cn-l2-216-sentences-had-prosodic-contours", "cn-l2-216-known-stress-rules", "cn-l2-216-long-final-vowel-low-pitch", "cn-l2-216-sentential-prosody-unknown"];
      const prosodicContourAuthorityAccepted = requiredProsodicContourRuleIds.every(ruleId => prosodicContourRules.some(rule => rule.id === ruleId)) && prosodicContourRules.every(rule => rule.sourceAuthority === "Andrews transcription");
      const authorized = hasSource && profileSeparated && directTranscription && graphemeInventoryAccepted && spellingChangeAuthorityAccepted && openTransitionAuthorityAccepted && syllableStructureAuthorityAccepted && stressAuthorityAccepted && consonantalLengthAuthorityAccepted && assimilationAuthorityAccepted && consonantLossAuthorityAccepted && consonantPhoneShiftAuthorityAccepted && vowelElisionAuthorityAccepted && longVowelGlottalAuthorityAccepted && prosodicContourAuthorityAccepted;
      return {
        kind: "classical-nahuatl-lesson2-logic-proof-frame",
        lesson: "Andrews Lesson 2",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : hasSource ? "blocked" : "preview",
        authorizationStatus: authorized ? "authorized" : hasSource ? "blocked" : "preview",
        sourceAuthority: "Andrews transcription",
        proofDepth: "foundation",
        input: orthographyFrame.input || "",
        normalized,
        legalWitnessTagIds: ["cn-l2-profile-firewall", "cn-l2-grapheme-inventory", "cn-l2-boundary-marks", "cn-l2-spelling-changes", "cn-l2-open-transition", "cn-l2-syllable-structure", "cn-l2-vocable-stress", "cn-l2-consonantal-length", "cn-l2-assimilation", "cn-l2-consonant-loss", "cn-l2-consonant-phone-shift", "cn-l2-vowel-elision", "cn-l2-long-vowel-glottal-stop", "cn-l2-prosodic-contours"],
        premises: [{
          lesson: "Andrews Lesson 2",
          layer: "profile-wall",
          rule: "Classical Nahuatl stays in the Classical language profile.",
          passed: profileSeparated,
          legalWitnessTagId: "cn-l2-profile-firewall",
          sourceProfileId: orthographyFrame.sourceProfileId || "",
          targetProfileId: orthographyFrame.targetProfileId || "",
          spellingInspection: orthographyFrame.spellingInspection || ""
        }, {
          lesson: "Andrews Lesson 2",
          layer: "transcription-source",
          rule: "The proof needs Andrews transcription source text.",
          passed: hasSource
        }, {
          lesson: "Andrews Lesson 2",
          layer: "grapheme-inventory",
          rule: "Each pronounced unit must be a Lesson 2 Classical letter, digraph, macron vowel, or boundary mark.",
          passed: graphemeInventoryAccepted,
          legalWitnessTagIds: ["cn-l2-grapheme-inventory", "cn-l2-boundary-marks"],
          invalidGraphemes
        }, {
          lesson: "Andrews Lesson 2",
          layer: "spelling-changes-2-4",
          rule: "Lesson 2.4 spelling changes are selected by environment and by syllable-final pronunciation contrast.",
          passed: spellingChangeAuthorityAccepted,
          operationIds: ["cn-l2-spelling-changes-k-s-environment", "cn-l2-spelling-changes-w-kw-syllable-final"],
          implementedRuleIds: spellingChangeRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "open-transition-2-5",
          rule: "Lesson 2.5 open transition preserves compound stem boundaries and selects listed spelling consequences.",
          passed: openTransitionAuthorityAccepted,
          operationId: "cn-l2-open-transition",
          implementedRuleIds: openTransitionRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "syllable-structure-2-6",
          rule: "Lesson 2.6 syllable division is phonological and follows vowel count, syllable-shape, digraph, and consonant-cluster constraints.",
          passed: syllableStructureAuthorityAccepted,
          operationId: "cn-l2-syllable-structure",
          implementedRuleIds: syllableStructureRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "stress-2-7",
          rule: "Lesson 2.7 assigns vocable stress by penultimate syllable, with the vocative and stress-group conditions recorded.",
          passed: stressAuthorityAccepted,
          operationId: "cn-l2-vocable-stress",
          implementedRuleIds: stressRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "consonantal-length-2-8",
          rule: "Lesson 2.8 creates long consonants only from identical consonants brought together by grammatical construction.",
          passed: consonantalLengthAuthorityAccepted,
          operationId: "cn-l2-consonantal-length",
          implementedRuleIds: consonantalLengthRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "assimilation-2-9-2-11",
          rule: "Lessons 2.9-2.11 authorize progressive, regressive, partial, low-frequency, and marked dissimilation outcomes from direct transcription rules.",
          passed: assimilationAuthorityAccepted,
          operationId: "cn-l2-assimilation",
          implementedRuleIds: assimilationRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "consonant-loss-2-12",
          rule: "Lesson 2.12 authorizes only the listed consonant-loss, nasal-trace, and reduplication-block cases.",
          passed: consonantLossAuthorityAccepted,
          operationId: "cn-l2-consonant-loss",
          implementedRuleIds: consonantLossRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "consonant-phone-shift-2-13",
          rule: "Lesson 2.13 authorizes consonant-phone shifts only in the listed vowel-following or exposed-position environments.",
          passed: consonantPhoneShiftAuthorityAccepted,
          operationId: "cn-l2-consonant-phone-shift",
          implementedRuleIds: consonantPhoneShiftRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "vowel-elision-2-14",
          rule: "Lesson 2.14 permits short-vowel elision only in set stress-group combinations and records supportive-i as not proper elision.",
          passed: vowelElisionAuthorityAccepted,
          operationId: "cn-l2-vowel-elision",
          implementedRuleIds: vowelElisionRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "long-vowel-glottal-2-15",
          rule: "Lesson 2.15 permits short-vowel plus glottal morphs only for the small listed class in compound embed position.",
          passed: longVowelGlottalAuthorityAccepted,
          operationId: "cn-l2-long-vowel-glottal-stop",
          implementedRuleIds: longVowelGlottalRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "prosodic-contours-2-16",
          rule: "Lesson 2.16 carries forward known stress and low-pitch facts while blocking sentential-prosody generation for lack of information.",
          passed: prosodicContourAuthorityAccepted,
          operationId: "cn-l2-prosodic-contours",
          implementedRuleIds: prosodicContourRules.map(rule => rule.id)
        }, {
          lesson: "Andrews Lesson 2",
          layer: "orthography-policy",
          rule: "Classical output is direct transcription; the Nawat/Pipil bridge is not applied.",
          passed: directTranscription,
          orthographyPolicy: orthographyFrame.orthographyPolicy || "",
          nawatPipilOrthographyBridge: orthographyFrame.nawatPipilOrthographyBridge || ""
        }],
        conclusion: {
          authorized,
          outputAllowed: authorized,
          surface: authorized ? orthographyFrame.surface || "" : "",
          sourceProfileId: authorized ? orthographyFrame.sourceProfileId || "" : "",
          targetProfileId: authorized ? orthographyFrame.targetProfileId || "" : "",
          orthographyPolicy: authorized ? orthographyFrame.orthographyPolicy || "" : "",
          nawatPipilOrthographyBridge: authorized ? orthographyFrame.nawatPipilOrthographyBridge || "" : ""
        },
        nextLessonContract: {
          kind: "classical-nahuatl-lesson2-to-lesson3-contract",
          carriesForward: ["sourceProfileId", "targetProfileId", "surface", "spellingChangeRuleIds", "openTransitionRuleIds", "syllableStructureRuleIds", "stressRuleIds", "consonantalLengthRuleIds", "assimilationRuleIds", "consonantLossRuleIds", "consonantPhoneShiftRuleIds", "vowelElisionRuleIds", "longVowelGlottalRuleIds", "prosodicContourRuleIds", "orthographyPolicy", "nawatPipilOrthographyBridge"],
          laterLessonsBuildOnPreviousLessons: true
        }
      };
    }
    function buildClassicalNahuatlLesson2OrthographyFrame(value, options = {}) {
      const normalized = normalizeClassicalNahuatlOrthographyInput(value);
      const graphemes = splitClassicalNahuatlLesson2Graphemes(normalized);
      const invalidGraphemes = getInvalidClassicalNahuatlLesson2Graphemes(normalized);
      const spellingChangeInventory = getClassicalNahuatlLesson2SpellingChangeRules();
      const spellingChangeRuleIds = spellingChangeInventory.map(rule => rule.id);
      const openTransitionInventory = getClassicalNahuatlLesson2OpenTransitionRules();
      const openTransitionRuleIds = openTransitionInventory.map(rule => rule.id);
      const syllableStructureInventory = getClassicalNahuatlLesson2SyllableStructureRules();
      const syllableStructureRuleIds = syllableStructureInventory.map(rule => rule.id);
      const stressInventory = getClassicalNahuatlLesson2StressRules();
      const stressRuleIds = stressInventory.map(rule => rule.id);
      const consonantalLengthInventory = getClassicalNahuatlLesson2ConsonantalLengthRules();
      const consonantalLengthRuleIds = consonantalLengthInventory.map(rule => rule.id);
      const assimilationInventory = getClassicalNahuatlLesson2AssimilationRules();
      const assimilationRuleIds = assimilationInventory.map(rule => rule.id);
      const consonantLossInventory = getClassicalNahuatlLesson2ConsonantLossRules();
      const consonantLossRuleIds = consonantLossInventory.map(rule => rule.id);
      const consonantPhoneShiftInventory = getClassicalNahuatlLesson2ConsonantPhoneShiftRules();
      const consonantPhoneShiftRuleIds = consonantPhoneShiftInventory.map(rule => rule.id);
      const vowelElisionInventory = getClassicalNahuatlLesson2VowelElisionRules();
      const vowelElisionRuleIds = vowelElisionInventory.map(rule => rule.id);
      const longVowelGlottalInventory = getClassicalNahuatlLesson2LongVowelGlottalRules();
      const longVowelGlottalRuleIds = longVowelGlottalInventory.map(rule => rule.id);
      const prosodicContourInventory = getClassicalNahuatlLesson2ProsodicContourRules();
      const prosodicContourRuleIds = prosodicContourInventory.map(rule => rule.id);
      const profileWallFrame = typeof targetObject.buildClassicalNahuatlProfileWallFrame === "function" ? targetObject.buildClassicalNahuatlProfileWallFrame(CLASSICAL_NAHUATL_PROFILE_ID, {
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT
      }) : null;
      const coverageFrame = getClassicalNahuatlLesson2CoverageFrame();
      const diagnostics = [];
      if (!normalized) {
        diagnostics.push({
          id: "classical-lesson2-orthography-missing-source",
          severity: "warning",
          message: "Classical Nahuatl Lesson 2 orthography needs Andrews transcription source text."
        });
      }
      if (invalidGraphemes.length) {
        diagnostics.push({
          id: "classical-lesson2-orthography-invalid-graphemes",
          severity: "warning",
          invalidGraphemes,
          message: "The Classical tab can preserve only Lesson 2 Classical Nahuatl letters, macron vowels, digraphs, and boundary marks."
        });
      }
      const frame = {
        kind: "classical-nahuatl-lesson2-orthography-frame",
        version: CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        surface: normalized,
        surfaceForms: normalized ? [normalized] : [],
        languageProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        sourceProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        graphemes,
        invalidGraphemes,
        profileWallFrame,
        profileWallKind: profileWallFrame?.kind || "classical-nahuatl-profile-wall-frame",
        profileSeparationMechanism: profileWallFrame?.separationMechanism || "profile-selection",
        spellingInspection: profileWallFrame?.spellingInspection || "not-performed",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT,
        lesson: "Andrews Lesson 2",
        lessonTitle: "Pronunciation. Orthography",
        outputLanguage: "Classical Nahuatl",
        outputAuthority: "Andrews transcription",
        orthographyAuthority: "Andrews transcription",
        orthographyPolicy: "transcription-direct",
        nawatPipilOrthographyBridge: "not-applied",
        nawatPipilOutputAuthority: "not-authority-for-classical-lane",
        modernNawatPipilAuthority: "not-authority-for-classical-lane",
        oldNawatPipilConjugatorAuthority: profileWallFrame?.oldNawatPipilConjugatorAuthority || "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: profileWallFrame?.nawatPipilGrammarAuthorityForClassical || "not-authority-for-classical-lane",
        classicalOutputImport: "authorized-within-classical-lane",
        orthographyOutputAllowed: invalidGraphemes.length === 0 && normalized.length > 0,
        grammarGenerationAllowed: false,
        legalWitnessTagIds: ["cn-l2-profile-firewall", "cn-l2-grapheme-inventory", "cn-l2-boundary-marks", "cn-l2-spelling-changes", "cn-l2-open-transition", "cn-l2-syllable-structure", "cn-l2-vocable-stress", "cn-l2-consonantal-length", "cn-l2-assimilation", "cn-l2-consonant-loss", "cn-l2-consonant-phone-shift", "cn-l2-vowel-elision", "cn-l2-long-vowel-glottal-stop", "cn-l2-prosodic-contours"],
        spellingChangeInventory,
        spellingChangeRuleIds,
        openTransitionInventory,
        openTransitionRuleIds,
        syllableStructureInventory,
        syllableStructureRuleIds,
        stressInventory,
        stressRuleIds,
        consonantalLengthInventory,
        consonantalLengthRuleIds,
        assimilationInventory,
        assimilationRuleIds,
        consonantLossInventory,
        consonantLossRuleIds,
        consonantPhoneShiftInventory,
        consonantPhoneShiftRuleIds,
        vowelElisionInventory,
        vowelElisionRuleIds,
        longVowelGlottalInventory,
        longVowelGlottalRuleIds,
        prosodicContourInventory,
        prosodicContourRuleIds,
        coverageRefs: coverageFrame.pdfRefs || [],
        coverageCategories: (coverageFrame.inventory || []).map(entry => entry.category),
        diagnostics
      };
      const proofFrame = buildClassicalNahuatlLesson2ProofFrame(frame);
      frame.proofFrame = proofFrame;
      frame.logicProofFrame = proofFrame;
      frame.logicAuthorizationStatus = proofFrame.authorizationStatus;
      return attachClassicalNahuatlLesson2Contract(frame, {
        metadataKind: "classical-nahuatl-lesson2-orthography-frame",
        routeStage: "classical-tab-lesson2-orthography",
        sourceInput: frame.input,
        surface: frame.surface,
        surfaceForms: frame.surfaceForms,
        supported: frame.orthographyOutputAllowed,
        diagnostics,
        evidenceStatus: "andrews-transcription-direct",
        orthographyFrame: {
          languageProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          sourceProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          targetProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          sourceSurface: frame.normalized,
          surface: frame.surface,
          surfaceForms: frame.surfaceForms,
          graphemes,
          invalidGraphemes,
          spellingChangeRuleIds,
          openTransitionRuleIds,
          syllableStructureRuleIds,
          stressRuleIds,
          consonantalLengthRuleIds,
          assimilationRuleIds,
          consonantLossRuleIds,
          consonantPhoneShiftRuleIds,
          vowelElisionRuleIds,
          longVowelGlottalRuleIds,
          prosodicContourRuleIds,
          profileWallKind: frame.profileWallKind,
          profileSeparationMechanism: frame.profileSeparationMechanism,
          spellingInspection: frame.spellingInspection,
          sourceAuthority: frame.sourceAuthority,
          sourceDocument: frame.sourceDocument,
          spellingAuthority: frame.orthographyAuthority,
          orthographyPolicy: frame.orthographyPolicy,
          nawatPipilOrthographyBridge: frame.nawatPipilOrthographyBridge,
          nawatPipilOutputAuthority: frame.nawatPipilOutputAuthority,
          modernNawatPipilAuthority: frame.modernNawatPipilAuthority,
          oldNawatPipilConjugatorAuthority: frame.oldNawatPipilConjugatorAuthority,
          nawatPipilGrammarAuthorityForClassical: frame.nawatPipilGrammarAuthorityForClassical,
          classicalOutputImport: frame.classicalOutputImport,
          noClassicalSurfaceImport: false
        },
        targetContract: {
          metadataKind: "classical-nahuatl-lesson2-orthography-frame",
          languageProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          sourceProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          targetProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
          generationAllowed: false,
          orthographyOutputAllowed: frame.orthographyOutputAllowed,
          profileWallKind: frame.profileWallKind,
          profileSeparationMechanism: frame.profileSeparationMechanism,
          spellingInspection: frame.spellingInspection,
          outputLanguage: frame.outputLanguage,
          outputAuthority: frame.outputAuthority,
          orthographyPolicy: frame.orthographyPolicy,
          nawatPipilOrthographyBridge: frame.nawatPipilOrthographyBridge
        }
      });
    }
    function buildClassicalNahuatlLesson2MachineryFrame(value, options = {}) {
      const orthographyFrame = buildClassicalNahuatlLesson2OrthographyFrame(value, options);
      const outputAllowed = orthographyFrame.proofFrame?.conclusion?.authorized === true;
      return {
        kind: "classical-nahuatl-lesson2-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON2_MACHINERY_VERSION,
        lesson: orthographyFrame.lesson,
        lessonTitle: orthographyFrame.lessonTitle,
        machineryScope: "pronunciation-orthography",
        activeAuthority: "Andrews transcription",
        sourceAuthority: orthographyFrame.sourceAuthority,
        grammarAuthority: orthographyFrame.grammarAuthority,
        outputAuthority: orthographyFrame.outputAuthority,
        sourceDocument: orthographyFrame.sourceDocument,
        profileWallFrame: orthographyFrame.profileWallFrame,
        profileWallKind: orthographyFrame.profileWallKind,
        profileSeparationMechanism: orthographyFrame.profileSeparationMechanism,
        spellingInspection: orthographyFrame.spellingInspection,
        input: orthographyFrame.input,
        normalized: orthographyFrame.normalized,
        output: outputAllowed ? orthographyFrame.surface : "",
        outputForms: outputAllowed ? orthographyFrame.surfaceForms.slice() : [],
        spellingChangeRuleIds: orthographyFrame.spellingChangeRuleIds.slice(),
        spellingChangeInventory: orthographyFrame.spellingChangeInventory.map(rule => ({
          ...rule,
          followingVowels: Array.isArray(rule.followingVowels) ? rule.followingVowels.slice() : [],
          precedingVowels: Array.isArray(rule.precedingVowels) ? rule.precedingVowels.slice() : [],
          examples: rule.examples.slice()
        })),
        openTransitionRuleIds: orthographyFrame.openTransitionRuleIds.slice(),
        openTransitionInventory: orthographyFrame.openTransitionInventory.map(copyClassicalNahuatlLesson2OpenTransitionRule),
        syllableStructureRuleIds: orthographyFrame.syllableStructureRuleIds.slice(),
        syllableStructureInventory: orthographyFrame.syllableStructureInventory.map(copyClassicalNahuatlLesson2SyllableStructureRule),
        stressRuleIds: orthographyFrame.stressRuleIds.slice(),
        stressInventory: orthographyFrame.stressInventory.map(copyClassicalNahuatlLesson2StressRule),
        consonantalLengthRuleIds: orthographyFrame.consonantalLengthRuleIds.slice(),
        consonantalLengthInventory: orthographyFrame.consonantalLengthInventory.map(copyClassicalNahuatlLesson2ConsonantalLengthRule),
        assimilationRuleIds: orthographyFrame.assimilationRuleIds.slice(),
        assimilationInventory: orthographyFrame.assimilationInventory.map(copyClassicalNahuatlLesson2AssimilationRule),
        consonantLossRuleIds: orthographyFrame.consonantLossRuleIds.slice(),
        consonantLossInventory: orthographyFrame.consonantLossInventory.map(copyClassicalNahuatlLesson2ConsonantLossRule),
        consonantPhoneShiftRuleIds: orthographyFrame.consonantPhoneShiftRuleIds.slice(),
        consonantPhoneShiftInventory: orthographyFrame.consonantPhoneShiftInventory.map(copyClassicalNahuatlLesson2ConsonantPhoneShiftRule),
        vowelElisionRuleIds: orthographyFrame.vowelElisionRuleIds.slice(),
        vowelElisionInventory: orthographyFrame.vowelElisionInventory.map(copyClassicalNahuatlLesson2VowelElisionRule),
        longVowelGlottalRuleIds: orthographyFrame.longVowelGlottalRuleIds.slice(),
        longVowelGlottalInventory: orthographyFrame.longVowelGlottalInventory.map(copyClassicalNahuatlLesson2LongVowelGlottalRule),
        prosodicContourRuleIds: orthographyFrame.prosodicContourRuleIds.slice(),
        prosodicContourInventory: orthographyFrame.prosodicContourInventory.map(copyClassicalNahuatlLesson2ProsodicContourRule),
        acceptsInput: outputAllowed,
        blocksInput: !outputAllowed,
        blockReason: outputAllowed ? "" : orthographyFrame.invalidGraphemes.length ? "invalid-lesson2-graphemes" : "missing-transcription-source",
        languageProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        sourceProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_PROFILE_ID,
        controllingFrameKind: orthographyFrame.kind,
        orthographyFrame,
        proofFrame: orthographyFrame.proofFrame,
        proofStatus: orthographyFrame.proofFrame?.proofStatus || "blocked",
        authorizationStatus: orthographyFrame.proofFrame?.authorizationStatus || "blocked",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: orthographyFrame.nawatPipilOrthographyBridge,
        modernNawatPipilAuthority: orthographyFrame.modernNawatPipilAuthority,
        oldNawatPipilConjugatorAuthority: orthographyFrame.oldNawatPipilConjugatorAuthority,
        nawatPipilGrammarAuthorityForClassical: orthographyFrame.nawatPipilGrammarAuthorityForClassical,
        grammarGenerationAllowed: false,
        diagnostics: orthographyFrame.diagnostics.slice()
      };
    }
    function getClassicalNahuatlFirewallRules() {
      return Array.from(CLASSICAL_NAHUATL_FIREWALL_RULES);
    }
    function installClassicalNahuatlLesson2OrthographyClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_PROFILE_MODE,
        getClassicalNahuatlLesson2Letters,
        getClassicalNahuatlLesson2Digraphs,
        getClassicalNahuatlLesson2SpellingChangeRules,
        buildClassicalNahuatlLesson2SpellingChangeFrame,
        getClassicalNahuatlLesson2OpenTransitionRules,
        buildClassicalNahuatlLesson2OpenTransitionFrame,
        getClassicalNahuatlLesson2SyllableStructureRules,
        buildClassicalNahuatlLesson2SyllableStructureFrame,
        getClassicalNahuatlLesson2StressRules,
        buildClassicalNahuatlLesson2StressFrame,
        getClassicalNahuatlLesson2ConsonantalLengthRules,
        buildClassicalNahuatlLesson2ConsonantalLengthFrame,
        getClassicalNahuatlLesson2AssimilationRules,
        buildClassicalNahuatlLesson2AssimilationFrame,
        buildClassicalNahuatlLesson210ProgressiveAssimilationFrame,
        getClassicalNahuatlLesson2ConsonantLossRules,
        buildClassicalNahuatlLesson2ConsonantLossFrame,
        getClassicalNahuatlLesson2ConsonantPhoneShiftRules,
        buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame,
        getClassicalNahuatlLesson2VowelElisionRules,
        buildClassicalNahuatlLesson2VowelElisionFrame,
        getClassicalNahuatlLesson2LongVowelGlottalRules,
        buildClassicalNahuatlLesson2LongVowelGlottalFrame,
        getClassicalNahuatlLesson2ProsodicContourRules,
        buildClassicalNahuatlLesson2ProsodicContourFrame,
        normalizeClassicalNahuatlOrthographyInput,
        splitClassicalNahuatlLesson2Graphemes,
        getInvalidClassicalNahuatlLesson2Graphemes,
        buildClassicalNahuatlLesson2ProofFrame,
        buildClassicalNahuatlLesson2OrthographyFrame,
        buildClassicalNahuatlLesson2MachineryFrame,
        getClassicalNahuatlFirewallRules
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson2OrthographyClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_FRAME_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_MACHINERY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_MACHINERY_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_TRANSCRIPTION_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_PROFILE_MODE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_PROFILE_MODE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_LETTERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_LETTERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_DIGRAPHS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_DIGRAPHS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_MORPHIC_CARRIERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_BOUNDARY_CHARS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SIMPLE_VOWELS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SPELLING_CHANGE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_OPEN_TRANSITION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_SYLLABLE_STRUCTURE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_STRESS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_STRESS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANTAL_LENGTH_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_ASSIMILATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANT_LOSS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_CONSONANT_PHONE_SHIFT_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_VOWEL_ELISION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_LONG_VOWEL_GLOTTAL_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON2_PROSODIC_CONTOUR_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_FIREWALL_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_FIREWALL_RULES; },
    });
    api.getClassicalNahuatlLesson2RuntimeTarget = getClassicalNahuatlLesson2RuntimeTarget;
    api.getClassicalNahuatlLesson2Letters = getClassicalNahuatlLesson2Letters;
    api.getClassicalNahuatlLesson2Digraphs = getClassicalNahuatlLesson2Digraphs;
    api.normalizeClassicalNahuatlOrthographyInput = normalizeClassicalNahuatlOrthographyInput;
    api.normalizeClassicalNahuatlLesson2SimpleVowel = normalizeClassicalNahuatlLesson2SimpleVowel;
    api.normalizeClassicalNahuatlLesson2Phoneme = normalizeClassicalNahuatlLesson2Phoneme;
    api.normalizeClassicalNahuatlLesson2SyllablePosition = normalizeClassicalNahuatlLesson2SyllablePosition;
    api.inferClassicalNahuatlLesson2SyllablePosition = inferClassicalNahuatlLesson2SyllablePosition;
    api.getClassicalNahuatlLesson2SpellingChangeRules = getClassicalNahuatlLesson2SpellingChangeRules;
    api.copyClassicalNahuatlLesson2OpenTransitionRule = copyClassicalNahuatlLesson2OpenTransitionRule;
    api.getClassicalNahuatlLesson2OpenTransitionRules = getClassicalNahuatlLesson2OpenTransitionRules;
    api.copyClassicalNahuatlLesson2SyllableStructureRule = copyClassicalNahuatlLesson2SyllableStructureRule;
    api.getClassicalNahuatlLesson2SyllableStructureRules = getClassicalNahuatlLesson2SyllableStructureRules;
    api.copyClassicalNahuatlLesson2StressRule = copyClassicalNahuatlLesson2StressRule;
    api.getClassicalNahuatlLesson2StressRules = getClassicalNahuatlLesson2StressRules;
    api.copyClassicalNahuatlLesson2ConsonantalLengthRule = copyClassicalNahuatlLesson2ConsonantalLengthRule;
    api.getClassicalNahuatlLesson2ConsonantalLengthRules = getClassicalNahuatlLesson2ConsonantalLengthRules;
    api.copyClassicalNahuatlLesson2AssimilationRule = copyClassicalNahuatlLesson2AssimilationRule;
    api.getClassicalNahuatlLesson2AssimilationRules = getClassicalNahuatlLesson2AssimilationRules;
    api.copyClassicalNahuatlLesson2ConsonantLossRule = copyClassicalNahuatlLesson2ConsonantLossRule;
    api.getClassicalNahuatlLesson2ConsonantLossRules = getClassicalNahuatlLesson2ConsonantLossRules;
    api.copyClassicalNahuatlLesson2ConsonantPhoneShiftRule = copyClassicalNahuatlLesson2ConsonantPhoneShiftRule;
    api.getClassicalNahuatlLesson2ConsonantPhoneShiftRules = getClassicalNahuatlLesson2ConsonantPhoneShiftRules;
    api.copyClassicalNahuatlLesson2VowelElisionRule = copyClassicalNahuatlLesson2VowelElisionRule;
    api.getClassicalNahuatlLesson2VowelElisionRules = getClassicalNahuatlLesson2VowelElisionRules;
    api.copyClassicalNahuatlLesson2LongVowelGlottalRule = copyClassicalNahuatlLesson2LongVowelGlottalRule;
    api.getClassicalNahuatlLesson2LongVowelGlottalRules = getClassicalNahuatlLesson2LongVowelGlottalRules;
    api.copyClassicalNahuatlLesson2ProsodicContourRule = copyClassicalNahuatlLesson2ProsodicContourRule;
    api.getClassicalNahuatlLesson2ProsodicContourRules = getClassicalNahuatlLesson2ProsodicContourRules;
    api.isClassicalNahuatlLesson2SyllableVowel = isClassicalNahuatlLesson2SyllableVowel;
    api.normalizeClassicalNahuatlLesson2StressSyllableInput = normalizeClassicalNahuatlLesson2StressSyllableInput;
    api.getClassicalNahuatlLesson2SyllableSoundSegmentations = getClassicalNahuatlLesson2SyllableSoundSegmentations;
    api.buildClassicalNahuatlLesson2SyllablesFromSounds = buildClassicalNahuatlLesson2SyllablesFromSounds;
    api.buildClassicalNahuatlLesson2SyllableStructureFrame = buildClassicalNahuatlLesson2SyllableStructureFrame;
    api.buildClassicalNahuatlLesson2StressFrame = buildClassicalNahuatlLesson2StressFrame;
    api.normalizeClassicalNahuatlLesson2ConsonantSound = normalizeClassicalNahuatlLesson2ConsonantSound;
    api.getClassicalNahuatlLesson2LongConsonantSpelling = getClassicalNahuatlLesson2LongConsonantSpelling;
    api.buildClassicalNahuatlLesson2ConsonantalLengthFrame = buildClassicalNahuatlLesson2ConsonantalLengthFrame;
    api.normalizeClassicalNahuatlLesson2AssimilationSound = normalizeClassicalNahuatlLesson2AssimilationSound;
    api.isClassicalNahuatlLesson2Nasal = isClassicalNahuatlLesson2Nasal;
    api.isClassicalNahuatlLesson2Sibilant = isClassicalNahuatlLesson2Sibilant;
    api.isClassicalNahuatlLesson2Bilabial = isClassicalNahuatlLesson2Bilabial;
    api.getClassicalNahuatlLesson2LongAssimilationOutcome = getClassicalNahuatlLesson2LongAssimilationOutcome;
    api.getClassicalNahuatlLesson2PartialAssimilationOutcome = getClassicalNahuatlLesson2PartialAssimilationOutcome;
    api.getClassicalNahuatlLesson2AssimilationRuleOutcome = getClassicalNahuatlLesson2AssimilationRuleOutcome;
    api.findClassicalNahuatlLesson2AssimilationRule = findClassicalNahuatlLesson2AssimilationRule;
    api.buildClassicalNahuatlLesson2AssimilationFrame = buildClassicalNahuatlLesson2AssimilationFrame;
    api.getClassicalNahuatlLesson210BoundaryConsonant = getClassicalNahuatlLesson210BoundaryConsonant;
    api.splitClassicalNahuatlLesson210AssimilationSpelling = splitClassicalNahuatlLesson210AssimilationSpelling;
    api.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame = buildClassicalNahuatlLesson210ProgressiveAssimilationFrame;
    api.normalizeClassicalNahuatlLesson2LongVowelForLoss = normalizeClassicalNahuatlLesson2LongVowelForLoss;
    api.findClassicalNahuatlLesson2ConsonantLossRule = findClassicalNahuatlLesson2ConsonantLossRule;
    api.buildClassicalNahuatlLesson2ConsonantLossFrame = buildClassicalNahuatlLesson2ConsonantLossFrame;
    api.normalizeClassicalNahuatlLesson2ExposedPosition = normalizeClassicalNahuatlLesson2ExposedPosition;
    api.findClassicalNahuatlLesson2ConsonantPhoneShiftRule = findClassicalNahuatlLesson2ConsonantPhoneShiftRule;
    api.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame = buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame;
    api.buildClassicalNahuatlLesson2VowelElisionFrame = buildClassicalNahuatlLesson2VowelElisionFrame;
    api.buildClassicalNahuatlLesson2LongVowelGlottalFrame = buildClassicalNahuatlLesson2LongVowelGlottalFrame;
    api.buildClassicalNahuatlLesson2ProsodicContourFrame = buildClassicalNahuatlLesson2ProsodicContourFrame;
    api.normalizeClassicalNahuatlLesson2BoundaryType = normalizeClassicalNahuatlLesson2BoundaryType;
    api.findClassicalNahuatlLesson2OpenTransitionRule = findClassicalNahuatlLesson2OpenTransitionRule;
    api.buildClassicalNahuatlLesson2OpenTransitionFrame = buildClassicalNahuatlLesson2OpenTransitionFrame;
    api.findClassicalNahuatlLesson2SpellingChangeRule = findClassicalNahuatlLesson2SpellingChangeRule;
    api.getClassicalNahuatlLesson2SpellingChangeExample = getClassicalNahuatlLesson2SpellingChangeExample;
    api.buildClassicalNahuatlLesson2SpellingChangeFrame = buildClassicalNahuatlLesson2SpellingChangeFrame;
    api.isClassicalNahuatlLesson2BoundaryChar = isClassicalNahuatlLesson2BoundaryChar;
    api.splitClassicalNahuatlLesson2Graphemes = splitClassicalNahuatlLesson2Graphemes;
    api.getInvalidClassicalNahuatlLesson2Graphemes = getInvalidClassicalNahuatlLesson2Graphemes;
    api.getClassicalNahuatlLesson2CoverageFrame = getClassicalNahuatlLesson2CoverageFrame;
    api.attachClassicalNahuatlLesson2Contract = attachClassicalNahuatlLesson2Contract;
    api.buildClassicalNahuatlLesson2ProofFrame = buildClassicalNahuatlLesson2ProofFrame;
    api.buildClassicalNahuatlLesson2OrthographyFrame = buildClassicalNahuatlLesson2OrthographyFrame;
    api.buildClassicalNahuatlLesson2MachineryFrame = buildClassicalNahuatlLesson2MachineryFrame;
    api.getClassicalNahuatlFirewallRules = getClassicalNahuatlFirewallRules;
    api.installClassicalNahuatlLesson2OrthographyClassicGlobals = installClassicalNahuatlLesson2OrthographyClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson2OrthographyGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson2OrthographyApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
