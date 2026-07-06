// core/nnc/compound/compound.js
// Lessons 31-32 compound/affective NNC boundary metadata. This keeps current
// VNC compound parser metadata and ordinary NNC fixtures separate from
// Andrews-licensed compound nounstem or affective NNC generation.

"use strict";

const COMPOUND_NNC_BOUNDARY_VERSION = 1;

const COMPOUND_NNC_KIND = Object.freeze({
    compoundNounstem: "compound-nounstem",
    affectiveNnc: "affective-nnc",
    lexicalEmbed: "lexical-embed",
    ordinaryNncFixture: "ordinary-nnc-fixture",
    unknown: "unknown",
});

const COMPOUND_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    vncCompoundAst: "vnc-compound-ast",
    outerLexicalEmbed: "outer-lexical-embed",
    ordinaryNncFixture: "ordinary-nnc-fixture",
    openStem: "open-stem",
    parserPunctuation: "parser-punctuation",
    generatedVncSurface: "generated-vnc-surface",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const COMPOUND_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "VNC compoundAst metadata is not compound NNC generation",
    "outer lexical embeds are not compound nounstem fixture evidence",
    "ordinary NNC fixtures are not affective NNC fixtures",
    "open-stem ordinary NNC previews are not compound NNC evidence",
    "parser punctuation is not a compound NNC schema",
    "Andrews compound/affective categories are architecture, not Classical surface authority",
]);

const COMPOUND_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "headStem",
        asks: "Which nounstem is the head or matrix of the compound NNC candidate?",
    }),
    Object.freeze({
        field: "embeddedStem",
        asks: "Which nounstem, VNC, or lexical element is embedded?",
    }),
    Object.freeze({
        field: "compoundKind",
        asks: "Is the candidate a compound nounstem, affective NNC, lexical embed, ordinary fixture, or unknown?",
    }),
    Object.freeze({
        field: "affectiveValue",
        asks: "If affective, what affective value is evidenced by Andrews source data plus orthography-bridge realization?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "Which Andrews source gate or structured source supports the compound/affective status?",
    }),
]);

const LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_compound.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON31_COMPOUND_NOUNSTEM_PDF_REFS = Object.freeze([
    "Andrews Lesson 31.1",
    "Andrews Lesson 31.2",
    "Andrews Lesson 31.3",
    "Andrews Lesson 31.4",
    "Andrews Lesson 31.5",
    "Andrews Lesson 31.6",
    "Andrews Lesson 31.7",
    "Andrews Lesson 31.8",
    "Andrews Lesson 31.9",
    "Andrews Lesson 31.10",
    "Andrews Lesson 31.11",
    "Andrews Lesson 31.12",
    "Andrews Lesson 31.13",
]);

const LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-type-frame",
    sourceSection: "Andrews 31.1",
    sourceFormula: "NNC + NNC = compound NNC",
    structureTypes: Object.freeze([
        "linked-connective-t",
        "linked-connectiveless",
        "integrated",
    ]),
    embedBeforeMatrix: true,
    matrixGovernsCompoundNounstemClass: true,
    embedUsuallyGeneralUseStem: true,
    subclass2BFinalARetentionMatchesNominalEmbedVerbstems: true,
});

const LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-meaning-frame",
    sourceSection: "Andrews 31.2",
    embedSources: Object.freeze(["supplement", "modifier"]),
    embedFunction: "modifier of the matrix within the compound stem",
    possibleMeaningRoles: Object.freeze([
        "source",
        "material",
        "purpose",
        "form",
        "appearance",
        "manner",
        "pertinence",
        "possession",
        "association",
        "production",
        "carrier",
        "sex",
        "instrument",
        "means",
        "character",
    ]),
});

const LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-possessor-frame",
    sourceSection: "Andrews 31.3",
    linkedStructureAlwaysEmbedOriented: true,
    integratedStructureUsuallyMatrixOriented: true,
    integratedStructureMayBeEmbedOriented: true,
    matrixOrientedRule: "possessor pronoun is normally oriented toward the governing matrix and compound as a whole",
    embedOrientedRule: "possessive-state predicate of an adjoined clause can become the embed and keep possessor orientation toward the embed",
    orientationCanBeSemanticallyUnimportant: true,
    linkedStructureRequiresOrientationTracking: true,
});

const LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-matrix-frame",
    sourceSection: "Andrews 31.4",
    matrixDeterminesCompoundKind: true,
    translationMustNotReverseEmbedAndMatrix: true,
    dictionaryConcatenationIsInsufficient: true,
    nahuatlClassificationMayDifferFromTranslationLanguage: true,
    matrixEmbedIndifferenceIsRareAndStillNotProofOfNoStructure: true,
});

const LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-example-frame",
    sourceSection: "Andrews 31.5",
    embedClassesCovered: Object.freeze([
        "tli-in-zero-stem",
        "ti-subclass-1-stem",
        "ti-subclass-2-stem",
    ]),
    matrixSubpositionUsuallyDoesNotCauseClassProblems: true,
    subclass2BEphemeralAUsuallyRetainedButMayBeIrregularlyLost: true,
    tiLongVowelMayBecomeShortVowelPlusGlottalStop: true,
    negativeAhMayServeAsAdverbialEmbed: true,
    unexpectedVariantStemsOccur: true,
    glottalFinalBeforeVowelMaySurfaceAsY: true,
});

const LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-unique-frame",
    sourceSection: "Andrews 31.6",
    uniqueStemMayFillEmbedOrMatrix: true,
    comparesToLesson30UniqueNominalEmbeds: true,
    prolificMatrixStems: Object.freeze([
        Object.freeze({
            stem: "ca",
            glossRole: "entity associated with, characterized by, or made of the embed",
            usualClasses: Object.freeze(["ti-subclass-1A", "ti-subclass-2C"]),
            excludesKaFinalSubclass2BNounstems: true,
        }),
        Object.freeze({
            stem: "yo",
            glossRole: "thing/state/condition/quality pertaining to or characteristic of the embed",
            sourceLesson: "Andrews 39.3",
            possessiveStateTlaEmbedPatternAttested: true,
            specialUsageRefs: Object.freeze(["Andrews 47.9", "Andrews 48.12", "Andrews 39.3"]),
        }),
    ]),
    simpleStemAttestationNotRequiredForUniqueCompoundFiller: true,
});

const LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-conjunctive-frame",
    sourceSection: "Andrews 31.7",
    structure: "conjunct + conjunct",
    notAdjunctionEmbedMatrix: true,
    firstConjunctRetainsVestigeOfSourceNum1TlOrTli: true,
    possessiveStateMayBreakIntoSeparateConjoinedNncs: true,
    relatedLessonRefs: Object.freeze(["Andrews Lesson 52.6"]),
});

const LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-recursive-frame",
    sourceSection: "Andrews 31.8",
    recursiveCompounding: true,
    compoundStemCanFillEmbed: true,
    compoundStemCanFillMatrix: true,
    compoundStemsCanFillBothSubpositions: true,
    ambiguousSegmentationRequiresSourceAnalysis: true,
});

const LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-special-function-frame",
    sourceSections: Object.freeze(["Andrews 31.9", "Andrews 31.10", "Andrews 31.11"]),
    functions: Object.freeze([
        Object.freeze({
            id: "sex-distinction",
            matrixRequirement: "animate entity matrix",
            embedOptions: Object.freeze(["oquich", "cihua"]),
        }),
        Object.freeze({
            id: "progeny",
            matrixOptions: Object.freeze(["cone", "pilton"]),
            embedRequirement: "animal nounstem or animal-like compound source",
            humanConeRestriction: "cone specifies child of a woman",
        }),
        Object.freeze({
            id: "fellowship",
            matrix: "poh",
            state: "possessive-state compound-stemmed NNC",
        }),
    ]),
});

const LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME = Object.freeze({
    kind: "lesson-31-compound-nounstem-plural-stem-frame",
    sourceSections: Object.freeze(["Andrews 31.12", "Andrews 31.13"]),
    affinity: Object.freeze({
        usedWithPluralSubjectInAbsolutiveState: true,
        reduplicationMayTargetEmbed: true,
        reduplicationMayTargetMatrix: true,
        reduplicationMayTargetBoth: true,
        possessiveStateMatrixMayReduplicate: true,
    }),
    distributiveVarietal: Object.freeze({
        notions: Object.freeze(["distribution", "variety"]),
        reduplicationTargetsEmbed: true,
        contrastWithAffinityMatrixReduplicationMustBePreserved: true,
    }),
});

const LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson31-types", andrewsSection: "31.1", category: "compound-nounstem-types", directiveEs: "La CNN compuesta procede de NNC+NNC=NNC; el incrustado precede a la matriz y la matriz gobierna la clase nominal.", engineSurface: "diagnostic compound-nounstem type frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson31-embed-meaning", andrewsSection: "31.2", category: "embed-meaning-role", directiveEs: "El incrustado viene de suplemento o modificador y funciona como modificador interno de la matriz.", engineSurface: "diagnostic meaning-role frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson31-possessor-orientation", andrewsSection: "31.3", category: "possessor-orientation", directiveEs: "La orientacion posesiva debe distinguir matriz, incrustado, estructura ligada e integrada.", engineSurface: "diagnostic possessor-orientation frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson31-matrix-importance", andrewsSection: "31.4", category: "matrix-governance", directiveEs: "La matriz determina el tipo de compuesto; la traduccion no debe invertir ni borrar la estructura.", engineSurface: "diagnostic matrix-governance frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson31-examples", andrewsSection: "31.5", category: "embed-class-examples", directiveEs: "Los ejemplos separan incrustados tli/in/cero, ti subclase 1 y ti subclase 2, con irregularidades ortograficas.", engineSurface: "diagnostic example-class frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson31-unique-fillers", andrewsSection: "31.6", category: "unique-compound-fillers", directiveEs: "Algunos troncos solo aparecen como fillers de incrustado o matriz; ca y yo son matrices prolificas especiales.", engineSurface: "diagnostic unique-filler frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson31-conjunctive-compounds", andrewsSection: "31.7", category: "conjunctive-compound", directiveEs: "Algunos compuestos son conjuncion, no adjuncion; el primer conjuncto conserva vestigio de tl/tli.", engineSurface: "diagnostic conjunctive frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson31-recursive-fillers", andrewsSection: "31.8", category: "recursive-compound-fillers", directiveEs: "La composicion es recursiva: incrustado, matriz o ambos pueden ser compuestos.", engineSurface: "diagnostic recursive frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson31-sex-distinction", andrewsSection: "31.9", category: "sex-distinction-compound", directiveEs: "Un nombre animado puede incorporar oquich o cihua para distinguir sexo.", engineSurface: "diagnostic special-function frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson31-progeny", andrewsSection: "31.10", category: "progeny-compound", directiveEs: "Cone o pilton como matriz pueden marcar progenie animal; cone humano tiene restriccion propia.", engineSurface: "diagnostic special-function frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson31-fellowship", andrewsSection: "31.11", category: "fellowship-compound", directiveEs: "Poh puede servir como matriz en CNN posesivas de compania, igualdad o parentesco.", engineSurface: "diagnostic special-function frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson31-affinity", andrewsSection: "31.12", category: "compound-affinity-stem", directiveEs: "La afinidad con sujeto plural puede reduplicar incrustado, matriz o ambos.", engineSurface: "diagnostic plural-stem frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson31-distributive-varietal", andrewsSection: "31.13", category: "compound-distributive-varietal-stem", directiveEs: "La distribucion y variedad se expresan en el incrustado y deben distinguirse de afinidad.", engineSurface: "diagnostic plural-stem frame", implementationState: "partial", redirectAction: "refactor-engine" }),
]);

const LESSON32_AFFECTIVE_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_compound.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON32_AFFECTIVE_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 32.1",
    "Andrews Lesson 32.2",
    "Andrews Lesson 32.3",
    "Andrews Lesson 32.4",
    "Andrews Lesson 32.5",
    "Andrews Lesson 32.6",
    "Andrews Lesson 32.7",
    "Andrews Lesson 32.8",
]);

const LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-32-affective-nnc-overview-frame",
    sourceSection: "Andrews 32.1",
    attitudeSites: Object.freeze(["nounstem", "subject-pronoun"]),
    nounstemMethod: "compound affective nounstem",
    subjectPronounMethod: "flawed-subject NNC",
    affectiveMatrixFillsMatrixSubposition: true,
    affectiveMatrixNotSimpleStemmedInCurrentUse: true,
    matrixGroupsByCompoundClassRelationToEmbedClass: true,
});

const LESSON32_AFFECTIVE_ZERO_CLASS_FRAME = Object.freeze({
    kind: "lesson-32-affective-zero-class-frame",
    sourceSection: "Andrews 32.2",
    matrixStems: Object.freeze([
        Object.freeze({ stem: "pil", classResult: "zero", value: "smallness with affection" }),
        Object.freeze({ stem: "pol", classResult: "zero", value: "largeness with disparagement or contempt" }),
    ]),
    resultClassIndependentOfEmbedClass: true,
    lexicalizedSpecialMeaningMayShiftToTiClass: true,
});

const LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME = Object.freeze({
    kind: "lesson-32-affective-class-dependent-frame",
    sourceSection: "Andrews 32.3",
    matrixStems: Object.freeze([
        Object.freeze({
            stem: "tzin",
            valueRange: Object.freeze(["deference", "esteem", "honorific", "compassion", "affection", "cherished-smallness"]),
            abbreviatedVocativeStem: "tz",
            abbreviatedVocativeLessFormal: true,
            mayDelimitMasslikeEntity: true,
        }),
        Object.freeze({
            stem: "ton",
            valueRange: Object.freeze(["smallness-without-admiration-or-affection"]),
            largerCompoundAffectiveMatrixPossible: true,
        }),
    ]),
    zeroEmbedYieldsZeroClassCompound: true,
    nonZeroEmbedYieldsTliClassCompound: true,
    irregularFormationsMustStayEvidenced: true,
});

const LESSON32_AFFECTIVE_ZOL_FRAME = Object.freeze({
    kind: "lesson-32-affective-zol-frame",
    sourceSection: "Andrews 32.4",
    matrixStem: "zol",
    value: "old worn-out thing",
    resultClassIndependentOfEmbedClass: "tli",
    embedRestriction: "nonanimate nounstems only",
    canServeAsEmbedInLargerCompoundStem: true,
    freelyPermitsCompoundAffectiveEmbed: true,
    denominalVerbstemSource: Object.freeze(["zol-i-hui", "zol-o-a"]),
    tzinAndPolDenominalSourcesRestrictedToHonorificPejorativeVncMatrices: true,
});

const LESSON32_AFFECTIVE_AFFINITY_FRAME = Object.freeze({
    kind: "lesson-32-affective-affinity-frame",
    sourceSection: "Andrews 32.5",
    pluralSubjectShape: "reduplicated prefix on affective matrix stem",
    reduplicatedVowelLength: "short",
    contrastsWithLesson31AffinityLongVowel: true,
    absolutivePluralDyadRule: Object.freeze({
        sounded: "t-in when corresponding singular absolutive num1 is sounded",
        silent: "zero-zero when corresponding singular absolutive num1 is silent",
    }),
    possessivePluralDyadRule: Object.freeze({
        options: Object.freeze(["hu-an", "zero-zero"]),
        huAnMoreFrequent: true,
        historicalGrammariansDisagreeOnPilPolHuan: true,
    }),
    demonstrativeHonorificsUseAffinityShape: true,
    embedAndMatrixCanBothShowAffinityShape: true,
    doubleAffinityMayBeOptionalOrObligatory: true,
});

const LESSON32_PIL_NOUNSTEM_FRAME = Object.freeze({
    kind: "lesson-32-pil-nounstem-frame",
    sourceSection: "Andrews 32.6",
    baseMeaning: "pendant dependent thing or appendage",
    extendedValues: Object.freeze(["child", "noble"]),
    childFrame: Object.freeze({
        simpleStemPrimarilyPossessivePlural: true,
        uniqueWholePossessiveNncEmbeddedInTzitzinMatrix: true,
        distributiveVarietalOfIrregularAffectivePossible: true,
        absolutivePluralAffinityAmbiguousWithNoble: true,
        genderSpecificCompoundsAvailable: true,
        affectiveMatrixChildForms: Object.freeze(["pil-tzin", "pil-ton", "pil-pil", "pil-pol"]),
        abbreviatedVocativePiltzChangesMeaning: true,
    }),
    nobleFrame: Object.freeze({
        simpleStemUsedInAbsolutiveSingularOrPlural: true,
        cihuaCompoundCustomaryForWoman: true,
        possessiveStateEmbedsPilInYoMatrix: true,
        piltzintzinVocativeHonorificIsSingularNotAffinity: true,
        childNobleAmbiguityMustBePreserved: true,
    }),
});

const LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION = 1;

const LESSON32_PIL_CHILD_NNC_SIDE_ROWS = Object.freeze([
    Object.freeze({
        id: "p294-an-no-pil-huan",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#an-0+n-o(pil)hu-an#",
        subject: Object.freeze({ structural: "an-0", prefix: "an", suffix: "0" }),
        state: "possessive",
        possessiveState: Object.freeze({ structural: "n-o", possessor: "1sg" }),
        predicateStem: "pil",
        num1Num2: Object.freeze({ structural: "hu-an", referenceNumber: "plural", connectorKind: "possessive-plural" }),
        role: "pil-child-possessive-plural",
    }),
    Object.freeze({
        id: "p294-no-pilhuantzitzin-huan",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0+n-o(pil-hu-an-tzi-tzin)hu-an#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "possessive",
        possessiveState: Object.freeze({ structural: "n-o", possessor: "1sg" }),
        predicateStem: "pil-hu-an-tzi-tzin",
        num1Num2: Object.freeze({ structural: "hu-an", referenceNumber: "plural", connectorKind: "possessive-plural" }),
        role: "pil-child-possessive-affinity-huan",
    }),
    Object.freeze({
        id: "p294-no-pilhuantzitzin-zero",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0+n-o(pil-hu-an-tzi-tzin)0-[sq0]#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "possessive",
        possessiveState: Object.freeze({ structural: "n-o", possessor: "1sg" }),
        predicateStem: "pil-hu-an-tzi-tzin",
        num1Num2: Object.freeze({ structural: "0-[sq0]", referenceNumber: "plural", connectorKind: "silent-square-zero" }),
        role: "pil-child-possessive-affinity-zero",
    }),
    Object.freeze({
        id: "p294-im-pihpilhuantzitzin-zero",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0+i-m(pih-pil-hu-an-tzi-tzin)0-[sq0]#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "possessive",
        possessiveState: Object.freeze({ structural: "i-m", possessor: "3pl" }),
        predicateStem: "pih-pil-hu-an-tzi-tzin",
        num1Num2: Object.freeze({ structural: "0-[sq0]", referenceNumber: "plural", connectorKind: "silent-square-zero" }),
        role: "pil-child-possessive-third-plural-affinity-zero",
    }),
    Object.freeze({
        id: "p294-pipil-tin",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0(pi-pil)t-in#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "absolutive",
        possessiveState: null,
        predicateStem: "pi-pil",
        num1Num2: Object.freeze({ structural: "t-in", referenceNumber: "plural", connectorKind: "absolutive-plural-tin" }),
        role: "pil-child-or-noble-absolutive-plural",
    }),
    Object.freeze({
        id: "p294-oquich-pipil-tin",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0(oquich-pi-pil)t-in#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "absolutive",
        possessiveState: null,
        predicateStem: "oquich-pi-pil",
        num1Num2: Object.freeze({ structural: "t-in", referenceNumber: "plural", connectorKind: "absolutive-plural-tin" }),
        role: "male-child-or-noble-absolutive-plural",
    }),
    Object.freeze({
        id: "p294-cihua-pipil-tin",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0(cihua-pi-pil)t-in#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "absolutive",
        possessiveState: null,
        predicateStem: "cihua-pi-pil",
        num1Num2: Object.freeze({ structural: "t-in", referenceNumber: "plural", connectorKind: "absolutive-plural-tin" }),
        role: "female-child-or-noble-absolutive-plural",
    }),
    Object.freeze({
        id: "p294-ti-piltzin-tli",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#ti-0(pil-tzin)tli-0#",
        subject: Object.freeze({ structural: "ti-0", prefix: "ti", suffix: "0" }),
        state: "absolutive",
        possessiveState: null,
        predicateStem: "pil-tzin",
        num1Num2: Object.freeze({ structural: "tli-0", referenceNumber: "singular", connectorKind: "absolutive-singular-tli" }),
        role: "pil-child-affective-tzin-singular",
    }),
    Object.freeze({
        id: "p294-pilton-tli",
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        formula: "#0-0(pil-ton)tli-0#",
        subject: Object.freeze({ structural: "0-0", prefix: "0", suffix: "0" }),
        state: "absolutive",
        possessiveState: null,
        predicateStem: "pil-ton",
        num1Num2: Object.freeze({ structural: "tli-0", referenceNumber: "singular", connectorKind: "absolutive-singular-tli" }),
        role: "pil-child-affective-ton-singular",
    }),
]);

const LESSON32_NONANIMATE_AFFECTIVE_FRAME = Object.freeze({
    kind: "lesson-32-nonanimate-affective-frame",
    sourceSection: "Andrews 32.7",
    pdfOcrHeadingNote: "The re-OCR text labels this post-32.6 heading as 32.1; sequence and contents identify it as 32.7.",
    nonanimateAffectiveAffinityCanUsePluralThirdPersonTin: true,
    pluralSupplementCanCrossReferenceCommonNumberHead: true,
    numberAgreementDiscrepancyMustBeTracked: true,
    commonNumberFillersMoreFrequent: true,
    nonanimateReduplicativePrefixAmbiguousBetweenAffinityAndDistributiveVarietal: true,
});

const LESSON32_FLAWED_SUBJECT_FRAME = Object.freeze({
    kind: "lesson-32-flawed-subject-frame",
    sourceSection: "Andrews 32.8",
    procedure: "replace sounded num1 ti/tli/in with irregular silent variant",
    affectiveValue: Object.freeze(["ridicule", "disparagement", "scorn"]),
    restrictedToAbsolutiveStateSingularCommonSubject: true,
    defectStemWithTzinOrTonAlwaysHasFlawedSubjectPronoun: true,
    defectiveEntityStemMayAlsoNameDefectOrDefectSource: true,
    someStemsOnlyUsedAsFlawedSubjectAndBestAssignedZeroClass: true,
    sameSilentNum1AlsoOccursInUnrelatedAdverbializationAndPersonalNames: true,
    chickenFlawedSubjectFormationIsSpecialCase: true,
});

const LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson32-affective-overview", andrewsSection: "32.1", category: "affective-nnc-overview", directiveEs: "La actitud valorativa o despectiva puede estar en el tronco nominal o en el sujeto defectivo.", engineSurface: "diagnostic affective overview frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson32-pil-pol", andrewsSection: "32.2", category: "zero-class-affective-matrix", directiveEs: "Pil y pol forman matrices afectivas de clase cero, salvo lexicalizacion especial.", engineSurface: "diagnostic zero-class affective frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson32-tzin-ton", andrewsSection: "32.3", category: "class-dependent-affective-matrix", directiveEs: "Tzin y ton dejan que la clase del incrustado determine cero o tli, con usos vocativos e irregulares.", engineSurface: "diagnostic class-dependent affective frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson32-zol", andrewsSection: "32.4", category: "tli-class-affective-matrix", directiveEs: "Zol forma tli con incrustados no animados y puede alimentar compuestos o rutas denominales.", engineSurface: "diagnostic zol frame", implementationState: "partial", redirectAction: "source-gated" }),
    Object.freeze({ id: "lesson32-affinity-shape", andrewsSection: "32.5", category: "affective-affinity-shape", directiveEs: "La afinidad afectiva reduplica la matriz afectiva con vocal breve y reglas distintas para absolutivo y posesivo.", engineSurface: "diagnostic affective affinity frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson32-pil", andrewsSection: "32.6", category: "pil-child-noble", directiveEs: "Pil distingue valores de hijo y nobleza, con ambiguedades, vocativos y formaciones unicas.", engineSurface: "diagnostic pil nounstem frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson32-nonanimate-affinity", andrewsSection: "32.7", category: "nonanimate-affective-affinity", directiveEs: "Afectivos no animados pueden mostrar plural, numero comun y ambiguedad afinidad/distributivo.", engineSurface: "diagnostic nonanimate affective frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson32-flawed-subject", andrewsSection: "32.8", category: "flawed-subject-nnc", directiveEs: "El sujeto defectivo silencia num1 para marcar burla, desprecio o escarnio en absolutivo singular/comun.", engineSurface: "diagnostic flawed-subject frame", implementationState: "partial", redirectAction: "block-generation" }),
]);

function cloneCompoundNncLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneCompoundNncLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneCompoundNncLessonRecord(value)])
    );
}

function buildLesson31CompoundNounstemObjectSlotOwnershipFrame({
    embedRole = "",
    matrixValence = "compound-nounstem-no-verbal-object-slots",
    sourceExternalObjectSlots = [],
    remainingExternalObjectSlots = [],
} = {}) {
    const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
    const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
    const resolvedMatrixValence = String(matrixValence || "").trim();
    return {
        kind: "lesson-31-compound-nounstem-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed: Boolean(resolvedMatrixValence),
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        sourceExternalObjectSlots: sourceSlots.map((slot) => ({ ...slot })),
        remainingExternalObjectSlots: remainingSlots.map((slot) => ({ ...slot })),
        sourceExternalObjectSlotIds: sourceSlots.map((slot) => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotIds: remainingSlots.map((slot) => String(slot?.slotId || "")).filter(Boolean),
        sourceExternalObjectSlotsOwnedBy: sourceSlots.length ? "source-nnc-route-frame" : "none",
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        embeddedRoleLicensedBy: embedRole ? "lesson-31-compound-nounstem-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: false,
        objectSlotOwnershipAbsentByNncStateFrame: true,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        objectSlotLicensingOrder: [
            "source-adjunct-nnc",
            "source-matrix-nnc",
            "compound-route-frame",
            "matrix-class-frame",
            "function-use-annotation",
        ],
    };
}

function buildLesson31CompoundNounstemRouteFrame({
    embedRole = "compound-nounstem-embed",
    structureType = "linked-or-integrated-compound",
    finalFormulaShape = "NNC + NNC = compound NNC",
    generationStatus = "andrews-logic-generated",
} = {}) {
    const matrixValence = "compound-nounstem-no-verbal-object-slots";
    const objectSlotOwnership = buildLesson31CompoundNounstemObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
    });
    return {
        kind: "lesson-31-compound-nounstem-route-frame",
        version: 1,
        sourcePrincipalNnc: {
            formulaType: "CNN",
            role: "matrix",
            sourceSection: "Andrews 31.1-31.4",
            governsCompoundClass: true,
        },
        sourceAdjunctNnc: {
            formulaType: "CNN",
            role: String(embedRole || "").trim(),
            sourceSection: "Andrews 31.1-31.2",
            precedesMatrix: true,
        },
        matrix: {
            valence: matrixValence,
            governsCompoundNounstemClass: true,
        },
        matrixValence,
        embedRole: String(embedRole || "").trim(),
        structureType: String(structureType || "").trim(),
        consumedObjectSlot: "",
        sourceExternalObjectSlots: [],
        remainingExternalObjectSlots: [],
        remainingExternalObjectSlotIds: [],
        objectSlotOwnership,
        valenceDelta: {
            incorporatedObjectSlots: 0,
            complementSlots: 0,
            adverbialFunctionSlots: 0,
            remainingExternalObjectSlots: 0,
        },
        andrewsSection: "Andrews 31.1-31.4",
        generationStatus,
        finalFormulaShape: String(finalFormulaShape || "").trim(),
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: false,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
    };
}

function getLesson31CompoundNounstemSubsectionInventory() {
    return LESSON31_COMPOUND_NOUNSTEM_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS),
    }));
}

function getLesson32AffectiveNncSubsectionInventory() {
    return LESSON32_AFFECTIVE_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS),
    }));
}

function buildLesson31CompoundNounstemPursuitFrame() {
    const subsectionInventory = getLesson31CompoundNounstemSubsectionInventory();
    const typeFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_TYPE_FRAME);
    const meaningFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_MEANING_FRAME);
    const possessorFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_POSSESSOR_FRAME);
    const matrixFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_MATRIX_FRAME);
    const exampleFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_EXAMPLE_FRAME);
    const uniqueFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_UNIQUE_FRAME);
    const conjunctiveFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_CONJUNCTIVE_FRAME);
    const recursiveFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_RECURSIVE_FRAME);
    const specialFunctionFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_SPECIAL_FUNCTION_FRAME);
    const pluralStemFrame = cloneCompoundNncLessonRecord(LESSON31_COMPOUND_NOUNSTEM_PLURAL_STEM_FRAME);
    const compoundNounstemRouteFrame = buildLesson31CompoundNounstemRouteFrame({
        embedRole: "compound-nounstem-embed",
        structureType: "linked-or-integrated-compound",
        finalFormulaShape: typeFrame.sourceFormula,
    });
    typeFrame.routeFrame = compoundNounstemRouteFrame;
    typeFrame.objectSlotOwnership = compoundNounstemRouteFrame.objectSlotOwnership;
    meaningFrame.routeFrame = compoundNounstemRouteFrame;
    matrixFrame.routeFrame = compoundNounstemRouteFrame;
    const remainingGaps = [
        "Current compound/affective NNC metadata generates only simple structured compound nounstem sources.",
        "NNC-specific AST parsing for matrix/embed orientation, linked versus integrated structure, conjunctive structure, and recursive segmentation remains partial.",
        "Possessor orientation, embed class behavior, unique fillers, special ca/yo matrices, sex/progeny/fellowship patterns, affinity stems, and distributive/varietal stems need explicit engine gates.",
        "Orthographic exceptions remain source-gated through the Nawat/Pipil orthography bridge.",
    ];
    const frame = {
        kind: "lesson-31-compound-nounstem-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 31,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 31.1-31.13 against current compound/affective NNC boundary metadata, NNC+NNC formula control, matrix/embed order, possessor orientation, unique fillers, conjunctive and recursive compounds, sex/progeny/fellowship formations, affinity stems, and distributive/varietal stems.",
                andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                result: "hit",
                correction: "Lesson 31 now records Andrews compound nounstem architecture, matrix/embed governance, possessor orientation, embed class behavior, unique fillers, conjunctive and recursive structures, special semantic formations, affinity stems, and distributive/varietal stems while generating only simple structured compound sources.",
                andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
                feedbackRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        typeFrame,
        meaningFrame,
        possessorFrame,
        matrixFrame,
        exampleFrame,
        uniqueFrame,
        conjunctiveFrame,
        recursiveFrame,
        specialFunctionFrame,
        pluralStemFrame,
        compoundNounstemRouteFrame,
        currentEngineBoundary: {
            compoundNncBoundaryMetadataImplemented: true,
            vncCompoundAstKeptSeparate: true,
            ordinaryNncFixtureGenerationPreserved: true,
            compoundNounstemGenerationImplemented: true,
            compoundNounstemAstImplemented: false,
            possessorOrientationGenerationImplemented: false,
            conjunctiveCompoundGenerationImplemented: false,
            recursiveCompoundGenerationImplemented: false,
            affinityDistributiveGenerationImplemented: false,
            finiteOutputExpansionAllowed: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachCompoundNncGrammarContract(frame, {
        unitKind: "compound-nounstem-boundary",
        routeStage: "audit-lesson-31",
        structuralSource: "Andrews Lesson 31",
        andrewsRefs: Array.from(LESSON31_COMPOUND_NOUNSTEM_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 31.1-31.13",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "orthography-bridge-required",
        },
        morphBoundaryFrame: {
            typeFrame,
            meaningFrame,
            possessorFrame,
            matrixFrame,
            exampleFrame,
            uniqueFrame,
            conjunctiveFrame,
            recursiveFrame,
            specialFunctionFrame,
            pluralStemFrame,
        },
        stemFrame: {
            stemKind: "compound-nounstem",
            sourceFormula: typeFrame.sourceFormula,
            embedBeforeMatrix: typeFrame.embedBeforeMatrix,
            matrixGovernsCompoundNounstemClass: typeFrame.matrixGovernsCompoundNounstemClass,
            structureTypes: typeFrame.structureTypes,
            recursiveCompounding: recursiveFrame.recursiveCompounding,
        },
        nuclearClauseFrame: {
            unitKind: "NNC",
            sourceFormula: typeFrame.sourceFormula,
            resultClauseKind: "compound NNC",
            compoundKinds: ["linked", "integrated", "conjunctive"],
        },
        participantFrame: {
            compoundNounstemRouteFrame,
            objectSlotOwnership: compoundNounstemRouteFrame.objectSlotOwnership,
        },
        targetContract: {
            metadataKind: "lesson-31-compound-nounstem-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["compound-nounstem-source-gated", "compound-nounstem-orthography-bridge-required"],
    });
}

function buildLesson32AffectiveNncPursuitFrame() {
    const subsectionInventory = getLesson32AffectiveNncSubsectionInventory();
    const overviewFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_NNC_OVERVIEW_FRAME);
    const zeroClassFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_ZERO_CLASS_FRAME);
    const classDependentFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_CLASS_DEPENDENT_FRAME);
    const zolFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_ZOL_FRAME);
    const affinityFrame = cloneCompoundNncLessonRecord(LESSON32_AFFECTIVE_AFFINITY_FRAME);
    const pilFrame = cloneCompoundNncLessonRecord(LESSON32_PIL_NOUNSTEM_FRAME);
    const nonanimateFrame = cloneCompoundNncLessonRecord(LESSON32_NONANIMATE_AFFECTIVE_FRAME);
    const flawedSubjectFrame = cloneCompoundNncLessonRecord(LESSON32_FLAWED_SUBJECT_FRAME);
    const pilChildNncSideGeneration = generateLesson32PilChildNncSideOutputs();
    const remainingGaps = [
        "Current compound/affective NNC generation is scoped to the Andrews p. 294 pil child/noble NNC-side rows.",
        "Broader affective matrix class routing for pil/pol/tzin/ton/zol and lexicalized class shifts need Andrews source gates.",
        "Additional affinity-shaped affective stems, pil child/noble ambiguity outside the p. 294 rows, nonanimate number behavior, and flawed-subject num1 silencing need explicit route gates.",
        "Affective examples, flawed-subject examples, and orthographic exceptions remain source-gated through the Nawat/Pipil orthography bridge.",
    ];
    const frame = {
        kind: "lesson-32-affective-nnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 32,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 32.1-32.8 against current compound/affective NNC boundary metadata, affective-matrix nounstem classes, affinity-shaped affectives, pil child/noble ambiguity, nonanimate affective number behavior, and flawed-subject NNCs.",
                andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                result: "hit",
                correction: "Lesson 32 now records Andrews affective NNC architecture and generates the p. 294 pil child/noble NNC-side rows while keeping broader affective routing source-gated.",
                andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON32_AFFECTIVE_NNC_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        overviewFrame,
        zeroClassFrame,
        classDependentFrame,
        zolFrame,
        affinityFrame,
        pilFrame,
        nonanimateFrame,
        flawedSubjectFrame,
        pilChildNncSideGeneration,
        currentEngineBoundary: {
            compoundNncAffectiveBoundaryMetadataImplemented: true,
            ordinaryNncFixtureGenerationPreserved: true,
            affectiveNncGenerationImplemented: true,
            generalAffectiveNncGenerationImplemented: false,
            pilChildNncSideGenerationImplemented: true,
            staticAffectiveDataImplemented: false,
            affectiveMatrixClassRoutingImplemented: false,
            affectiveAffinityGenerationImplemented: false,
            flawedSubjectGenerationImplemented: false,
            finiteOutputExpansionAllowed: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachCompoundNncGrammarContract(frame, {
        unitKind: "affective-nnc-boundary",
        routeStage: "audit-lesson-32",
        structuralSource: "Andrews Lesson 32",
        andrewsRefs: Array.from(LESSON32_AFFECTIVE_NNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 32.1-32.8",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "orthography-bridge-required",
        },
        morphBoundaryFrame: {
            overviewFrame,
            zeroClassFrame,
            classDependentFrame,
            zolFrame,
            affinityFrame,
            pilFrame,
            pilChildNncSideGeneration,
            nonanimateFrame,
            flawedSubjectFrame,
        },
        stemFrame: {
            stemKind: "compound-affective-nounstem",
            affectiveMatrixFillsMatrixSubposition: overviewFrame.affectiveMatrixFillsMatrixSubposition,
            zeroClassMatrices: zeroClassFrame.matrixStems.map((entry) => entry.stem),
            classDependentMatrices: classDependentFrame.matrixStems.map((entry) => entry.stem),
            tliClassMatrix: zolFrame.matrixStem,
        },
        nuclearClauseFrame: {
            unitKind: "NNC",
            affectiveSites: overviewFrame.attitudeSites,
            pilChildNncSideGeneratedFormulaCount: pilChildNncSideGeneration.entries.length,
            flawedSubjectRestrictedToAbsolutiveSingularCommon: flawedSubjectFrame.restrictedToAbsolutiveStateSingularCommonSubject,
        },
        targetContract: {
            metadataKind: "lesson-32-affective-nnc-pursuit-frame",
            generationAllowed: false,
            pilChildNncSideGenerationAllowed: pilChildNncSideGeneration.generationAllowed,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["affective-nnc-source-gated", "affective-nnc-orthography-bridge-required"],
    });
}

function normalizeCompoundNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeCompoundNncKind(value = "") {
    return normalizeCompoundNncEnum(
        value,
        Object.values(COMPOUND_NNC_KIND),
        COMPOUND_NNC_KIND.unknown
    );
}

function normalizeCompoundNncFalsePositiveSource(value = "") {
    return normalizeCompoundNncEnum(
        value,
        Object.values(COMPOUND_NNC_FALSE_POSITIVE_SOURCE),
        COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getCompoundNncAntiConflationRules() {
    return Array.from(COMPOUND_NNC_ANTI_CONFLATION_RULES);
}

function getCompoundNncStructuralQuestions() {
    return COMPOUND_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function normalizeCompoundNncSurfacePart(value = "") {
    const parenthetical = String(value || "").match(/\(([^)]+)\)/);
    const source = String(parenthetical?.[1] || value || "")
        .replace(/\b(?:CNV|CNN|VNC|NNC)\b/gi, "")
        .replace(/\[sq0\]/gi, "")
        .replace(/[Ø0]/g, "")
        .replace(/[#()[\]{}+_\s]/g, "")
        .replace(/-/g, "")
        .trim();
    if (!source || /[A-Z_]/.test(source)) {
        return "";
    }
    const conversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat(source, {
            source: "Andrews compound NNC source slot",
        })
        : null;
    return conversion?.output || source;
}

function getLesson32PilChildNncSideRows() {
    return LESSON32_PIL_CHILD_NNC_SIDE_ROWS.map((row) => cloneCompoundNncLessonRecord(row));
}

function findLesson32PilChildNncSideRow(rowOrId = "") {
    if (rowOrId && typeof rowOrId === "object") {
        return rowOrId;
    }
    const rowId = String(rowOrId || "").trim();
    return LESSON32_PIL_CHILD_NNC_SIDE_ROWS.find((row) => row.id === rowId || row.formula === rowId) || null;
}

function normalizeLesson32PilChildNncSideSlotSurface(value = "", {
    slot = "",
    structural = "",
} = {}) {
    const normalizedStructural = String(structural || value || "").trim();
    if (!normalizedStructural || normalizedStructural === "0" || normalizedStructural === "0-0" || normalizedStructural === "0-[sq0]") {
        return "";
    }
    if (slot === "possessive-state") {
        if (normalizedStructural === "n-o") {
            return "nu";
        }
        if (normalizedStructural === "i-m" || normalizedStructural === "i-n") {
            return "in";
        }
    }
    return normalizeCompoundNncSurfacePart(normalizedStructural);
}

function buildLesson32PilChildNncSideFormulaSlots(row = null, surfaces = {}) {
    const subject = row?.subject || {};
    const possessiveState = row?.possessiveState || null;
    const connector = row?.num1Num2 || {};
    return {
        pers1Pers2: {
            role: "subject-person",
            slot: "pers1-pers2",
            structural: subject.structural || "0-0",
            prefix: subject.prefix === "0" ? "" : String(subject.prefix || ""),
            suffix: subject.suffix === "0" ? "" : String(subject.suffix || ""),
            displayPrefix: subject.prefix || "0",
            displaySuffix: subject.suffix || "0",
            surface: surfaces.subject || "",
            owner: "subject",
        },
        possessiveState: possessiveState ? {
            role: "possessive-state",
            slot: "predicate.state.st1-st2",
            structural: possessiveState.structural || "",
            possessor: possessiveState.possessor || "",
            surface: surfaces.possessiveState || "",
            owner: "predicate",
            belongsTo: "predicate",
            notSubjectConnector: true,
            notTense: true,
        } : null,
        predicateStem: {
            role: "predicate",
            slot: "STEM",
            structural: row?.predicateStem || "",
            stem: row?.predicateStem || "",
            surface: surfaces.predicateStem || "",
            state: row?.state || "",
            insideParentheses: true,
        },
        num1Num2: {
            role: "subject-number-connector",
            slot: "num1-num2",
            structural: connector.structural || "0-0",
            displayDyad: connector.structural || "0-0",
            surface: surfaces.num1Num2 || "",
            connector: surfaces.num1Num2 || "",
            referenceNumber: connector.referenceNumber || "",
            connectorKind: connector.connectorKind || "",
            owner: "subject",
            belongsTo: "subject",
            outsideParentheses: true,
            notPredicateState: true,
            notStemSuffix: true,
            notTense: true,
        },
    };
}

function buildLesson32PilChildNncSideBlockedOutput({
    row = null,
    diagnosticId = "lesson-32-pil-child-nnc-side-blocked",
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const diagnostics = [diagnosticId];
    const blocked = {
        kind: "lesson-32-pil-child-nnc-side-generation",
        version: LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION,
        id: row?.id || sourceFrame?.rowId || "",
        structuralFormula: row?.formula || sourceFrame?.structuralFormula || "",
        formula: row?.formula || sourceFrame?.structuralFormula || "",
        sourceFrame,
        operationFrame,
        generationAllowed: false,
        diagnostics,
    };
    return attachCompoundNncGrammarContract(blocked, {
        metadataKind: blocked.kind,
        unitKind: "pil-child-nnc-side",
        routeStage: "block-lesson-32-pil-child-nnc-side",
        sourceInput: blocked.formula,
        supported: false,
        generationAllowed: false,
        diagnostics,
    });
}

function buildLesson32PilChildNncSideSourceFrame(rowOrId = "") {
    const row = findLesson32PilChildNncSideRow(rowOrId);
    if (!row) {
        return null;
    }
    const subjectSurface = normalizeLesson32PilChildNncSideSlotSurface(row.subject?.structural || "", {
        slot: "subject",
    });
    const possessiveStateSurface = row.possessiveState
        ? normalizeLesson32PilChildNncSideSlotSurface(row.possessiveState.structural, {
            slot: "possessive-state",
        })
        : "";
    const predicateStemSurface = normalizeLesson32PilChildNncSideSlotSurface(row.predicateStem, {
        slot: "predicate-stem",
    });
    const num1Num2Surface = normalizeLesson32PilChildNncSideSlotSurface(row.num1Num2?.structural || "", {
        slot: "num1-num2",
    });
    const formulaSlots = buildLesson32PilChildNncSideFormulaSlots(row, {
        subject: subjectSurface,
        possessiveState: possessiveStateSurface,
        predicateStem: predicateStemSurface,
        num1Num2: num1Num2Surface,
    });
    const segmentFrames = Object.freeze([
        Object.freeze({
            slot: "pers1-pers2",
            role: "subject-person",
            formulaValue: formulaSlots.pers1Pers2?.structural || "",
            surface: formulaSlots.pers1Pers2?.surface || "",
            orthographyBridge: "Nawat/Pipil orthography bridge",
        }),
        ...(formulaSlots.possessiveState ? [Object.freeze({
            slot: "possessive-state",
            role: "predicate-state",
            formulaValue: formulaSlots.possessiveState.structural || "",
            surface: formulaSlots.possessiveState.surface || "",
            orthographyBridge: "Nawat/Pipil orthography bridge",
        })] : []),
        Object.freeze({
            slot: "STEM",
            role: "predicate",
            formulaValue: formulaSlots.predicateStem?.structural || "",
            surface: formulaSlots.predicateStem?.surface || "",
            orthographyBridge: "Nawat/Pipil orthography bridge",
        }),
        Object.freeze({
            slot: "num1-num2",
            role: "subject-number-connector",
            formulaValue: formulaSlots.num1Num2?.structural || "",
            surface: formulaSlots.num1Num2?.surface || "",
            orthographyBridge: "Nawat/Pipil orthography bridge",
        }),
    ]);
    return Object.freeze({
        kind: "lesson-32-pil-child-nnc-side-source-frame",
        version: LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION,
        rowId: row.id,
        printedPage: row.printedPage,
        pdfPage: row.pdfPage,
        andrewsSection: row.andrewsSection,
        structuralFormula: row.formula,
        formulaSlots,
        role: row.role,
        state: row.state,
        predicateStem: row.predicateStem,
        targetStem: predicateStemSurface,
        segmentFrames,
        targetSurface: segmentFrames.map((segment) => String(segment.surface || "")).join(""),
        authority: "Andrews printed p. 294 / PDF p. 309",
        displayStringsAuthorizeGrammar: false,
    });
}

function buildLesson32PilChildNncSideOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== "lesson-32-pil-child-nnc-side-source-frame") {
        return null;
    }
    return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-32-6-pil-child-nnc-side-row-realization",
        routeFamily: "lesson-32-pil-child-nnc-side",
        routeStage: "execute-typed-operation-frame",
        operationApplied: "realize-p294-pil-child-nnc-side-row-from-source-frame",
        sourceFrameKind: sourceFrame.kind,
        sourceRowId: sourceFrame.rowId,
        sourceFormula: sourceFrame.structuralFormula,
        targetFormulaSlots: sourceFrame.formulaSlots,
        targetSegmentFrames: sourceFrame.segmentFrames,
        targetSurface: sourceFrame.targetSurface,
        targetStem: sourceFrame.targetStem,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getLesson32PilChildNncSideOperationFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== "lesson-32-pil-child-nnc-side-source-frame") {
        return "source-frame-required";
    }
    if (
        !operationFrame
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== "andrews-32-6-pil-child-nnc-side-row-realization"
        || operationFrame.routeFamily !== "lesson-32-pil-child-nnc-side"
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        String(operationFrame.sourceRowId || "") !== String(sourceFrame.rowId || "")
        || String(operationFrame.sourceFormula || "") !== String(sourceFrame.structuralFormula || "")
    ) {
        return "contradictory-source-frame";
    }
    const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    if (!targetSegmentFrames.length) {
        return "operation-frame-required";
    }
    const targetSurface = targetSegmentFrames
        .map((segment) => String(segment?.surface || ""))
        .join("");
    if (
        targetSurface !== String(sourceFrame.targetSurface || "")
        || String(operationFrame.targetSurface || "") !== String(sourceFrame.targetSurface || "")
        || String(operationFrame.targetStem || "") !== String(sourceFrame.targetStem || "")
    ) {
        return "contradictory-target-frame";
    }
    const operationSlots = operationFrame.targetFormulaSlots || null;
    if (
        !operationSlots
        || operationSlots !== sourceFrame.formulaSlots
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function generateLesson32PilChildNncSideOutput(rowOrId = "", {
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const row = findLesson32PilChildNncSideRow(rowOrId);
    const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object"
        ? sourceFrame
        : (rowOrId?.kind === "lesson-32-pil-child-nnc-side-source-frame" ? rowOrId : null);
    if (!row && !resolvedSourceFrame) {
        const blocked = {
            kind: "lesson-32-pil-child-nnc-side-generation",
            version: LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION,
            generationAllowed: false,
            diagnostics: ["lesson-32-pil-child-nnc-side-row-not-found"],
        };
        return attachCompoundNncGrammarContract(blocked, {
            metadataKind: blocked.kind,
            unitKind: "pil-child-nnc-side",
            routeStage: "block-lesson-32-pil-child-nnc-side",
            supported: false,
            generationAllowed: false,
            diagnostics: blocked.diagnostics,
        });
    }
    const mismatch = getLesson32PilChildNncSideOperationFrameMismatch({
        sourceFrame: resolvedSourceFrame,
        operationFrame,
    });
    if (mismatch) {
        return buildLesson32PilChildNncSideBlockedOutput({
            row,
            sourceFrame: resolvedSourceFrame,
            operationFrame,
            diagnosticId: `lesson-32-pil-child-nnc-side-${mismatch}`,
        });
    }
    const rowFrame = resolvedSourceFrame;
    const surface = String(operationFrame.targetSurface || "");
    const surfaceForms = surface ? [surface] : [];
    const formulaSlots = operationFrame.targetFormulaSlots;
    const generated = {
        kind: "lesson-32-pil-child-nnc-side-generation",
        version: LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION,
        id: rowFrame.rowId,
        printedPage: rowFrame.printedPage,
        pdfPage: rowFrame.pdfPage,
        andrewsSection: rowFrame.andrewsSection,
        structuralFormula: rowFrame.structuralFormula,
        formula: rowFrame.structuralFormula,
        formulaSlots,
        sourceFrame: rowFrame,
        operationFrame,
        role: rowFrame.role,
        state: rowFrame.state,
        predicateStem: rowFrame.predicateStem,
        targetStem: rowFrame.targetStem,
        surface,
        surfaceForms,
        generationAllowed: Boolean(surface),
        diagnostics: [
            "lesson-32-pil-child-nnc-side-andrews-generated",
            "nnc-predicate-stem-inside-parentheses",
            "nnc-subject-number-connector-outside-parentheses",
            "nnc-no-vnc-tense-slot",
            "orthography-bridge-realized",
        ],
    };
    return attachCompoundNncGrammarContract(generated, {
        metadataKind: generated.kind,
        unitKind: "pil-child-nnc-side",
        routeStage: "generate-lesson-32-pil-child-nnc-side",
        sourceInput: rowFrame.structuralFormula,
        supported: generated.generationAllowed,
        generationAllowed: generated.generationAllowed,
        surface,
        surfaceForms,
        diagnostics: generated.diagnostics,
        andrewsRefs: [`Andrews printed p. ${rowFrame.printedPage} / PDF p. ${rowFrame.pdfPage}`],
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "orthography-bridge-realized",
            sourceSurface: "",
            sourceFormula: rowFrame.structuralFormula,
            surface,
            surfaceForms,
        },
        morphBoundaryFrame: {
            kind: "lesson-32-pil-child-nnc-side-boundary",
            structuralFormula: rowFrame.structuralFormula,
            formulaSlots,
            state: rowFrame.state,
            predicateStemInsideParentheses: true,
            possessiveStateBeforePredicateStem: Boolean(formulaSlots.possessiveState),
            subjectNumberConnectorOutsideParentheses: true,
            noVncTenseSlot: true,
            sourceFrame: rowFrame,
            operationFrame,
        },
        stemFrame: {
            stemKind: "pil-child-nnc-side-predicate-stem",
            sourceStem: rowFrame.predicateStem,
            targetStem: rowFrame.targetStem,
            role: rowFrame.role,
        },
        nuclearClauseFrame: {
            unitKind: "NNC",
            formulaFamily: rowFrame.state === "possessive" ? "possessive-state NNC" : "absolutive-state NNC",
            structuralFormula: rowFrame.structuralFormula,
            formulaSlots,
            predicateStemInsideParentheses: true,
            subjectNumberConnectorOutsideParentheses: true,
            hasTensePosition: false,
        },
        targetContract: {
            metadataKind: generated.kind,
            generationAllowed: generated.generationAllowed,
            andrewsSection: rowFrame.andrewsSection,
            noOrdinaryNncGenerationGateChange: true,
            operationFrame,
        },
    });
}

function generateLesson32PilChildNncSideOutputs({
    ids = null,
} = {}) {
    const requestedIds = Array.isArray(ids)
        ? ids.map((id) => String(id || "").trim()).filter(Boolean)
        : [];
    const rows = requestedIds.length
        ? requestedIds.map(findLesson32PilChildNncSideRow).filter(Boolean)
        : LESSON32_PIL_CHILD_NNC_SIDE_ROWS;
    const entries = rows.map((row) => {
        const sourceFrame = buildLesson32PilChildNncSideSourceFrame(row);
        const operationFrame = buildLesson32PilChildNncSideOperationFrame(sourceFrame);
        return generateLesson32PilChildNncSideOutput(row, {
            sourceFrame,
            operationFrame,
        });
    });
    const surfaceForms = entries.flatMap((entry) => Array.isArray(entry.surfaceForms) ? entry.surfaceForms : []);
    const generated = {
        kind: "lesson-32-pil-child-nnc-side-generation-set",
        version: LESSON32_PIL_CHILD_NNC_SIDE_GENERATION_VERSION,
        printedPage: 294,
        pdfPage: 309,
        andrewsSection: "32.6",
        rowCount: rows.length,
        entries,
        structuralFormulas: entries.map((entry) => entry.structuralFormula),
        surfaceForms,
        generationAllowed: entries.length > 0 && entries.every((entry) => entry.generationAllowed === true),
        diagnostics: [
            "lesson-32-pil-child-nnc-side-output-set",
            "nnc-side-generation-scoped-to-andrews-p294",
            "ordinary-nnc-generation-gate-unchanged",
        ],
    };
    return attachCompoundNncGrammarContract(generated, {
        metadataKind: generated.kind,
        unitKind: "pil-child-nnc-side-set",
        routeStage: "generate-lesson-32-pil-child-nnc-side-set",
        sourceInput: "Andrews printed p. 294 / PDF p. 309",
        supported: generated.generationAllowed,
        generationAllowed: generated.generationAllowed,
        surfaceForms,
        diagnostics: generated.diagnostics,
        andrewsRefs: ["Andrews printed p. 294 / PDF p. 309"],
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "orthography-bridge-realized",
            surface: surfaceForms[0] || "",
            surfaceForms,
        },
        nuclearClauseFrame: {
            unitKind: "NNC",
            formulaCount: entries.length,
            structuralFormulas: generated.structuralFormulas,
            predicateStemInsideParentheses: true,
            subjectNumberConnectorOutsideParentheses: true,
            hasTensePosition: false,
        },
        targetContract: {
            metadataKind: generated.kind,
            generationAllowed: generated.generationAllowed,
            noOrdinaryNncGenerationGateChange: true,
        },
    });
}

function renderCompoundNncAffectiveCandidateSurface({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (getCompoundNncAffectiveOperationFrameMismatch({ sourceFrame, operationFrame })) {
        return "";
    }
    return String(operationFrame?.targetSurface || "");
}

function buildCompoundNncAffectiveFormulaSlots({
    embeddedStem = "",
    headStem = "",
    embeddedSurface = "",
    headSurface = "",
} = {}) {
    return Object.freeze({
        embeddedStem: Object.freeze({
            role: "embedded-nounstem",
            slot: "embedded-NNC",
            structural: String(embeddedStem || ""),
            stem: String(embeddedStem || ""),
            surface: String(embeddedSurface || ""),
            owner: "compound-source",
            insideCompoundNounstem: true,
        }),
        headStem: Object.freeze({
            role: "matrix-nounstem",
            slot: "head-NNC",
            structural: String(headStem || ""),
            stem: String(headStem || ""),
            surface: String(headSurface || ""),
            owner: "compound-head",
            governsCompoundNounstemClass: true,
        }),
    });
}

function buildCompoundNncAffectiveSourceFrame({
    candidate = "",
    headStem = "",
    embeddedStem = "",
    compoundKind = "",
    affectiveValue = "",
    evidenceSource = "",
    falsePositiveSource = "",
    hasCompoundAst = false,
    sourceKind = "",
} = {}) {
    const normalizedKind = normalizeCompoundNncKind(compoundKind);
    const normalizedFalsePositive = normalizeCompoundNncFalsePositiveSource(falsePositiveSource);
    if (
        normalizedKind !== COMPOUND_NNC_KIND.compoundNounstem
        || normalizedFalsePositive !== COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown
    ) {
        return null;
    }
    const sourceEmbed = String(embeddedStem || "").trim();
    const sourceMatrix = String(headStem || "").trim();
    const targetEmbed = normalizeCompoundNncSurfacePart(sourceEmbed);
    const targetMatrix = normalizeCompoundNncSurfacePart(sourceMatrix);
    if (!sourceEmbed || !sourceMatrix || !targetEmbed || !targetMatrix) {
        return null;
    }
    const formulaSlots = buildCompoundNncAffectiveFormulaSlots({
        embeddedStem: sourceEmbed,
        headStem: sourceMatrix,
        embeddedSurface: targetEmbed,
        headSurface: targetMatrix,
    });
    const targetSegmentFrames = Object.freeze([
        Object.freeze({
            slot: "embedded-NNC",
            role: "embedded-nounstem",
            formulaValue: sourceEmbed,
            sourceStem: sourceEmbed,
            surface: targetEmbed,
            orthographyBridge: "Nawat/Pipil orthography bridge",
        }),
        Object.freeze({
            slot: "head-NNC",
            role: "matrix-nounstem",
            formulaValue: sourceMatrix,
            sourceStem: sourceMatrix,
            surface: targetMatrix,
            orthographyBridge: "Nawat/Pipil orthography bridge",
        }),
    ]);
    return Object.freeze({
        kind: "compound-nnc-affective-source-frame",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        routeFamily: "compound-nnc-affective-candidate",
        routeKind: normalizedKind,
        candidate: String(candidate || ""),
        structuralFormula: "NNC(embedded)+NNC(head)",
        formulaSlots,
        sourceSegmentFrames: targetSegmentFrames.map((segment) => Object.freeze({
            slot: segment.slot,
            role: segment.role,
            sourceStem: segment.sourceStem,
        })),
        targetSegmentFrames,
        embeddedStem: sourceEmbed,
        headStem: sourceMatrix,
        targetEmbeddedStem: targetEmbed,
        targetHeadStem: targetMatrix,
        targetSurface: targetSegmentFrames.map((segment) => segment.surface).join(""),
        affectiveValue: String(affectiveValue || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasCompoundAst: hasCompoundAst === true,
        sourceKind: String(sourceKind || ""),
        authority: "Andrews Lessons 31-32 compound nounstem source route",
        displayStringsAuthorizeGrammar: false,
    });
}

function buildCompoundNncAffectiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== "compound-nnc-affective-source-frame") {
        return null;
    }
    return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-31-compound-nounstem-source-realization",
        routeFamily: "compound-nnc-affective-candidate",
        routeStage: "execute-typed-operation-frame",
        operationApplied: "realize-compound-nounstem-source-frame",
        sourceFrameKind: sourceFrame.kind,
        sourceRouteKind: sourceFrame.routeKind,
        sourceCandidate: sourceFrame.candidate,
        sourceStructuralFormula: sourceFrame.structuralFormula,
        targetFormulaSlots: sourceFrame.formulaSlots,
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetEmbeddedStem: sourceFrame.targetEmbeddedStem,
        targetHeadStem: sourceFrame.targetHeadStem,
        targetSurface: sourceFrame.targetSurface,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getCompoundNncAffectiveOperationFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== "compound-nnc-affective-source-frame") {
        return "source-frame-required";
    }
    if (
        !operationFrame
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== "andrews-31-compound-nounstem-source-realization"
        || operationFrame.routeFamily !== "compound-nnc-affective-candidate"
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        String(operationFrame.sourceFrameKind || "") !== sourceFrame.kind
        || String(operationFrame.sourceRouteKind || "") !== String(sourceFrame.routeKind || "")
        || String(operationFrame.sourceCandidate || "") !== String(sourceFrame.candidate || "")
        || String(operationFrame.sourceStructuralFormula || "") !== String(sourceFrame.structuralFormula || "")
    ) {
        return "contradictory-source-frame";
    }
    const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    if (!targetSegmentFrames.length) {
        return "operation-frame-required";
    }
    const targetSurface = targetSegmentFrames
        .map((segment) => String(segment?.surface || ""))
        .join("");
    if (
        targetSurface !== String(sourceFrame.targetSurface || "")
        || String(operationFrame.targetSurface || "") !== String(sourceFrame.targetSurface || "")
        || String(operationFrame.targetEmbeddedStem || "") !== String(sourceFrame.targetEmbeddedStem || "")
        || String(operationFrame.targetHeadStem || "") !== String(sourceFrame.targetHeadStem || "")
    ) {
        return "contradictory-target-frame";
    }
    const operationSlots = operationFrame.targetFormulaSlots || null;
    if (
        !operationSlots
        || operationSlots !== sourceFrame.formulaSlots
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function getCompoundNncAffectiveBlockedDiagnostic({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const mismatch = getCompoundNncAffectiveOperationFrameMismatch({
        sourceFrame,
        operationFrame,
    });
    return mismatch ? `compound-nnc-affective-${mismatch}` : "";
}

function attachCompoundNncGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "compound-nnc",
        routeFamily: "compound-nnc",
        ...options,
    });
}

function buildCompoundNncAffectiveBoundaryMetadata() {
    const boundary = {
        kind: "compound-nnc-affective-boundary",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        lessons: [31, 32],
        status: "partial",
        structuralSource: "Andrews Lessons 31-32",
        targetAuthority: "Andrews slot logic plus Nawat/Pipil orthography bridge",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCompoundNncStructuralQuestions(),
        boundaries: {
            hasVncCompoundParserMetadata: true,
            hasCompoundNncGeneration: true,
            hasAffectiveNncGeneration: true,
            hasGeneralAffectiveNncGeneration: false,
            hasPilChildNncSideGeneration: true,
            hasStaticAffectiveData: false,
            treatsVncCompoundAstAsNncEvidence: false,
            changesOrdinaryNncGeneration: false,
            changesVncGeneration: false,
        },
        antiConflationRules: getCompoundNncAntiConflationRules(),
    };
    return attachCompoundNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary,
    });
}

function classifyCompoundNncAffectiveCandidate({
    candidate = "",
    headStem = "",
    embeddedStem = "",
    compoundKind = "",
    affectiveValue = "",
    evidenceSource = "",
    falsePositiveSource = "",
    hasCompoundAst = false,
    sourceKind = "",
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    const normalizedKind = normalizeCompoundNncKind(compoundKind);
    const normalizedFalsePositive = normalizeCompoundNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const requiresTypedOperation = (
        normalizedKind === COMPOUND_NNC_KIND.compoundNounstem
        && normalizedFalsePositive === COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
    const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object"
        ? sourceFrame
        : null;
    const blockedDiagnostic = requiresTypedOperation
        ? getCompoundNncAffectiveBlockedDiagnostic({
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        })
        : "";
    const surface = blockedDiagnostic
        ? ""
        : renderCompoundNncAffectiveCandidateSurface({
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        });
    const generated = Boolean(surface);
    const targetFormulaSlots = generated ? operationFrame.targetFormulaSlots : null;
    const targetSegmentFrames = generated && Array.isArray(operationFrame.targetSegmentFrames)
        ? operationFrame.targetSegmentFrames
        : [];
    const resolvedHeadStem = generated
        ? String(operationFrame.targetHeadStem || "")
        : String(headStem || "");
    const resolvedEmbeddedStem = generated
        ? String(operationFrame.targetEmbeddedStem || "")
        : String(embeddedStem || "");
    const classification = {
        kind: "compound-nnc-affective-candidate-classification",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        headStem: resolvedHeadStem,
        embeddedStem: resolvedEmbeddedStem,
        compoundKind: normalizedKind,
        affectiveValue: String(affectiveValue || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasCompoundAst: hasCompoundAst === true,
        sourceKind: String(sourceKind || ""),
        ...(resolvedSourceFrame ? { sourceFrame: resolvedSourceFrame } : {}),
        ...(operationFrame ? { operationFrame } : {}),
        confirmed: false,
        generationAllowed: generated,
        ...(generated ? {
            surface,
            surfaceForms: [surface],
            formulaSlots: targetFormulaSlots,
            targetSegmentFrames,
        } : {}),
        diagnostics: [
            generated ? "compound-nnc-andrews-source-generated" : (
                blockedDiagnostic
                    ? blockedDiagnostic
                    : (hasEvidence ? "compound-nnc-source-provided" : "compound-nnc-source-gate-required")
            ),
            hasCompoundAst ? "vnc-compound-ast-not-nnc-evidence" : "compound-nnc-no-compound-ast",
            normalizedFalsePositive !== COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "compound-nnc-false-positive-source"
                : (generated ? "compound-nnc-structured-source" : "compound-nnc-unconfirmed"),
        ],
        boundary: buildCompoundNncAffectiveBoundaryMetadata(),
    };
    return attachCompoundNncGrammarContract(classification, {
        routeStage: generated ? "generate-structured-compound" : "classify-boundary",
        sourceInput: classification.candidate || classification.headStem,
        supported: generated,
        generationAllowed: generated,
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: generated ? "orthography-bridge-realized" : "source-gated",
            surface,
            surfaceForms: generated ? [surface] : [],
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "compound-nounstem-candidate",
            matrix: classification.headStem,
            embed: classification.embeddedStem,
            embedBeforeMatrix: true,
            matrixGovernsCompoundNounstemClass: true,
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        },
        nuclearClauseFrame: generated ? {
            unitKind: "compound NNC",
            formulaFamily: "compound nounstem",
            structuralFormula: resolvedSourceFrame.structuralFormula,
            formulaSlots: targetFormulaSlots,
            targetSegmentFrames,
            embeddedStemBeforeHeadStem: true,
            headGovernsCompoundClass: true,
            hasTensePosition: false,
        } : null,
        targetContract: {
            metadataKind: "compound-nnc-affective-candidate-classification",
            generationAllowed: generated,
            targetAuthority: "Andrews slot logic plus Nawat/Pipil orthography bridge",
            consumesRenderedInput: false,
            displayStringsAuthorizeGrammar: false,
        },
        resultFrame: generated ? {
            kind: "compound-nnc-affective-result-frame",
            surface,
            surfaceForms: [surface],
            targetFormulaSlots,
            targetSegmentFrames,
            sourceFrame: resolvedSourceFrame,
            operationFrame,
        } : null,
    });
}

function classifyCompoundNncAffectiveFalsePositive(source = "") {
    const normalizedSource = normalizeCompoundNncFalsePositiveSource(source);
    const classification = {
        kind: "compound-nnc-affective-false-positive",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isCompoundNncEvidence: false,
        isAffectiveNncEvidence: false,
        generationAllowed: false,
        diagnostics: ["compound-nnc-false-positive-source"],
        antiConflationRules: getCompoundNncAntiConflationRules(),
    };
    return attachCompoundNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
    });
}
