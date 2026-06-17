// core/nnc/nnc.js
// Noun derivation results: instrumentivo, calificativo-instrumentivo, locativo-temporal.
// Extracted from script.js Noun Derivations section (post-Phase-4 lines 14,045–14,584).
// Global-scope module: all functions defined directly on the global object.
// Deps (resolved at call time via global scope from script.js):
//   VERB_DERIVED_NOMINAL_KIND, INSTRUMENTIVO_MODE, COMBINED_MODE
//   buildVerbDerivedNominalBuilderContext, buildVerbDerivedNominalEntry, buildVerbDerivedNominalResult
//   buildNonactiveSourceChain, normalizeDerivationStemValue, getNounNonactiveRuleBase
//   getVisibleNonactiveDerivationOptions, resolveNonactiveStemSelection
//   shouldForceAllNonactiveOptions, getSelectedNonactiveSuffix
//   applyNonactiveSourceChainStemSpec, realizeMorphStemSpec, buildLiteralMorphStemSpec
//   applyMorphologyRules, buildMorphologyMetaOptions
//   resolveNominalSourceOuterSurfacePlacement, resolvePlacedNominalStemSpec
//   buildOutputPrefixedChain, buildStructuredPrefixedStemSpec
//   buildPasadoRemotoStemEntries, buildCalificativoInstrumentivoPredicateStemSpec
//   collapseCalificativoMarkerEcho, composeObj1Chain
//   getForwardDerivationConfig, getNounDerivationTypeFromMeta, normalizeRuleBase
//   getBaseObjectSlots, resolveHasNonspecificValence, getSuppletiveStemSet
//   stripDirectionalPrefixFromStem, applyPassiveImpersonal
//   getCombinedMode

"use strict";

const ORDINARY_NNC_STATE = Object.freeze({
    absolutive: "absolutive",
    possessive: "possessive",
});

const ORDINARY_NNC_CLAUSE_KIND = "nominal-nuclear-clause";

const ORDINARY_NNC_PLURAL_TYPE = Object.freeze({
    auto: "auto",
    count: "count",
    distributive: "distributive",
});

const ORDINARY_NNC_POSSESSION_KIND = Object.freeze({
    ordinary: "ordinary",
    organic: "organic",
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
    organicPossessionRequiresPossessiveState: "ordinary-nnc-organic-possession-requires-possessive-state",
    organicPossessionRequiresPossessor: "ordinary-nnc-organic-possession-requires-possessor",
});

const NNC_LESSON12_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const NNC_LESSON12_PDF_REFS = Object.freeze([
    "Andrews Lesson 12.1",
    "Andrews Lesson 12.2",
    "Andrews Lesson 12.3",
    "Andrews Lesson 12.4",
    "Andrews Lesson 12.5",
    "Andrews Lesson 12.6",
    "Andrews Lesson 12.7",
]);

const NNC_LESSON12_FORMULA_CONTRAST_FRAME = Object.freeze({
    kind: "lesson-12-nnc-vnc-contrast-frame",
    sourceSection: "Andrews §12.1",
    nncFormula: "#pers1-pers2(STEM)num1-num2#",
    vncContrast: "NNC has State where VNC has Valence, and NNC has no Tense position.",
    stateFunction: "State brings a possessor participant into the predicate.",
    valenceContrast: "Valence brings an object participant; State brings a possessor participant.",
    hasTensePosition: false,
    generationAllowed: false,
});

const NNC_LESSON12_ABSOLUTIVE_FORMULA_FRAME = Object.freeze({
    kind: "lesson-12-absolutive-nnc-formula-frame",
    sourceSection: "Andrews §12.2",
    linearFormula: "#pers1-pers2(STEM)num1-num2#",
    diagrammaticFormula: Object.freeze({
        subjectLine: "#pers1-pers2(...)num1-num2#",
        predicateLine: "(STEM)",
    }),
    statePosition: "vacant",
    possessorPronounPresent: false,
    predicateStemInsideParentheses: true,
    subjectConnectorOutsideParentheses: true,
    generationAllowed: false,
});

const NNC_LESSON12_SUBJECT_POSITION_FRAME = Object.freeze({
    kind: "lesson-12-absolutive-subject-position-frame",
    sourceSection: "Andrews §12.3",
    pers1Pers2Rule: Object.freeze({
        sameAsVncExcept: Object.freeze(["second-person x carrier absent", "second-person xi carrier absent"]),
        absentCarriers: Object.freeze(["x", "xi"]),
    }),
    num1Num2Rule: Object.freeze({
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: Object.freeze(["predicate-state", "nounstem", "noun suffix"]),
        sensitiveToPredicateState: true,
        singularCommonDyads: Object.freeze(["tl-0", "tli-0", "li-0", "in-0", "0-0"]),
        pluralDyads: Object.freeze(["t-in", "m-eh", "0-h"]),
        singularNum1Morphs: Object.freeze(["tl", "tli", "li", "in", "0"]),
        pluralNum1Morphs: Object.freeze(["t", "m", "0"]),
        singularNum2Morphs: Object.freeze(["0"]),
        pluralNum2Morphs: Object.freeze(["in", "eh", "h"]),
    }),
    nawatRealizationStatus: "Classical filler letters are Andrews structural evidence; Nawat/Pipil realization requires orthography bridge plus evidence.",
});

const NNC_LESSON12_SUBJECT_PRONOUN_INVENTORY_FRAME = Object.freeze({
    kind: "lesson-12-absolutive-subject-pronoun-inventory-frame",
    sourceSection: "Andrews §12.4",
    formulaUse: "subject only on absolutive-state NNCs",
    contrastsWith: "possessive-state NNC subject shapes in Andrews Lesson 13.3",
    persons: Object.freeze([
        Object.freeze({ id: "1sg", number: "singular", variantCount: 4 }),
        Object.freeze({ id: "1pl", number: "plural", variantCount: 3 }),
        Object.freeze({ id: "2sg", number: "singular", variantCount: 4 }),
        Object.freeze({ id: "2pl", number: "plural", variantCount: 3 }),
        Object.freeze({ id: "3sg-common", number: "singular-common", variantCount: 4 }),
        Object.freeze({ id: "3pl", number: "plural", variantCount: 3 }),
    ]),
    includesSupportiveAndAssimilatedPers1Shapes: true,
    generationAllowed: false,
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
    generationAllowed: false,
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
    warning: "num1-num2 belongs to the subject personal pronoun, not to the nounstem.",
});

const NNC_LESSON12_STATE_NOUNSTEM_FRAME = Object.freeze({
    kind: "lesson-12-state-nounstem-frame",
    sourceSection: "Andrews §12.7",
    stateRelationDiffersFromValence: true,
    nounstemUsuallyDoesNotChooseState: true,
    mostNounstemsCanUseEitherState: true,
    restrictedStateStemsDeferredToLesson15: true,
    generationAllowed: false,
});

const NNC_LESSON12_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson12-nnc-vnc-contrast",
        andrewsSection: "12.1",
        category: "nnc-vnc-formula-contrast",
        directiveEs: "La CNN tiene Estado donde la CNV tiene Valencia, y no tiene posicion de tiempo.",
        engineSurface: "formula and category metadata over ordinary NNC output",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-absolutive-state-nnc",
        andrewsSection: "12.2",
        category: "absolutive-state-formula",
        directiveEs: "La formula absolutiva es #pers1-pers2(STEM)num1-num2#; el Estado esta vacante y el tronco funciona como predicado.",
        engineSurface: "ordinary NNC formula slots",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-subject-positions",
        andrewsSection: "12.3",
        category: "absolutive-subject-slots",
        directiveEs: "pers1/pers2 siguen la CNV salvo x/xi; num1-num2 es conector del sujeto, no estado ni sufijo del nombre.",
        engineSurface: "subject and num1-num2 metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-subject-pronoun-summary",
        andrewsSection: "12.4",
        category: "absolutive-subject-pronoun-inventory",
        directiveEs: "Los paradigmas de sujeto absolutivo tienen variantes por persona y numero; no deben confundirse con los paradigmas posesivos de la Leccion 13.",
        engineSurface: "diagnostic inventory metadata",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-predicate-position",
        andrewsSection: "12.5",
        category: "absolutive-predicate",
        directiveEs: "El tronco nominal identifica, describe o localiza al sujeto; no contiene tiempo y requiere contexto para referencia temporal.",
        engineSurface: "predicate metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-animacy",
        andrewsSection: "12.6",
        category: "animacy-and-reference",
        directiveEs: "La animacidad guia la referencia singular/plural, pero la referencia del sujeto decide; num1-num2 sigue siendo material del sujeto.",
        engineSurface: "animacy/reference diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson12-state-and-nounstem",
        andrewsSection: "12.7",
        category: "state-nounstem-boundary",
        directiveEs: "El Estado no se relaciona con el tronco como la Valencia se relaciona con el verbo; la mayoria de troncos puede entrar en ambos estados.",
        engineSurface: "state boundary metadata",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
]);

const NNC_LESSON12_REMAINING_GAPS = Object.freeze([
    "The full Andrews 12.3-12.4 absolutive subject-pronoun filler inventory is not generated as a complete paradigm.",
    "Current ordinary NNC output remains Nawat/Pipil evidence-bound and cannot import Classical num1-num2 surfaces directly.",
    "Discourse time reference, definiteness/article choice, metaphorical animacy overrides, and state-restriction exceptions remain diagnostic or deferred.",
]);

const NNC_LESSON13_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const NNC_LESSON13_PDF_REFS = Object.freeze([
    "Andrews Lesson 13.1",
    "Andrews Lesson 13.2",
    "Andrews Lesson 13.3",
    "Andrews Lesson 13.4",
    "Andrews Lesson 13.5",
    "Andrews Lesson 13.6",
]);

const NNC_LESSON13_POSSESSIVE_FORMULA_FRAME = Object.freeze({
    kind: "lesson-13-possessive-nnc-formula-frame",
    sourceSection: "Andrews §13.1",
    formulas: Object.freeze([
        Object.freeze({
            id: "monadic-state-position",
            linearFormula: "#pers1-pers2+st(STEM)num1-num2#",
            subjectLine: "#pers1-pers2+...)num1-num2#",
            predicateLine: "+st(STEM)",
        }),
        Object.freeze({
            id: "dyadic-state-position",
            linearFormula: "#pers1-pers2+st1-st2(STEM)num1-num2#",
            subjectLine: "#pers1-pers2+...)num1-num2#",
            predicateLine: "+st1-st2(STEM)",
        }),
    ]),
    statePosition: "present-in-predicate",
    stateBringsParticipantRole: "possessor",
    hasTensePosition: false,
    stemProblemDeferredToLesson14: true,
    generationAllowed: false,
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
        uhHuSpellingVariants: "uh before silent morph; hu before sounded morph",
    }),
    generationAllowed: false,
});

const NNC_LESSON13_SUBJECT_PRONOUN_INVENTORY_FRAME = Object.freeze({
    kind: "lesson-13-possessive-subject-pronoun-inventory-frame",
    sourceSection: "Andrews §13.3",
    formulaUse: "subject only on possessive-state NNCs",
    contrastsWith: "absolutive-state NNC subject shapes in Andrews Lesson 12.4",
    persons: Object.freeze([
        Object.freeze({ id: "1sg", number: "singular-common", variants: Object.freeze(["uh-0", "hui-0", "0-0"]) }),
        Object.freeze({ id: "1pl", number: "plural", variants: Object.freeze(["hu-an"]) }),
        Object.freeze({ id: "2sg", number: "singular-common", variants: Object.freeze(["uh-0", "hui-0", "0-0"]) }),
        Object.freeze({ id: "2pl", number: "plural", variants: Object.freeze(["hu-an"]) }),
        Object.freeze({ id: "3sg-common", number: "singular-common", variants: Object.freeze(["uh-0", "hui-0", "0-0"]) }),
        Object.freeze({ id: "3pl", number: "plural", variants: Object.freeze(["hu-an"]) }),
    ]),
    nawatRealizationStatus: "current Nawat subject/connector output remains evidence-bound and does not import Classical connector paradigms",
    generationAllowed: false,
});

const NNC_LESSON13_MONADIC_STATE_FRAME = Object.freeze({
    kind: "lesson-13-monadic-possessive-state-frame",
    sourceSection: "Andrews §13.4",
    statePosition: "monadic",
    stateSlot: "st",
    predicatePosition: true,
    expressesCategories: Object.freeze(["person", "number", "possessive-case"]),
    sameShapesAsMonadicValence: true,
    fillers: Object.freeze([
        Object.freeze({
            id: "reciprocative-possessor",
            andrewsMorph: "ne",
            meaning: "one another's / each other's",
            restrictions: Object.freeze(["third-person only", "highly infrequent", "narrower than shuntline reflexive/reciprocal object ne"]),
            nawatStatus: "requires Nawat/Pipil evidence before generation",
        }),
        Object.freeze({
            id: "human-nonspecific-possessor",
            andrewsMorph: "te",
            meaning: "someone's / anyone's / everyone's",
            frequency: "frequent",
            nawatCandidate: "te",
            nawatStatus: "requires Nawat/Pipil evidence before generation",
        }),
        Object.freeze({
            id: "nonhuman-nonspecific-possessor",
            andrewsMorph: "tla",
            meaning: "something's / anything's / everything's",
            primaryUse: "relational nounstems",
            lessonRefs: Object.freeze(["Andrews Lessons 45-47", "Andrews §15.1.6"]),
            nawatCandidate: "ta",
            nawatStatus: "orthography-adapted candidate only; requires Nawat/Pipil evidence before generation",
        }),
    ]),
    generationAllowed: false,
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
            filler: "i",
        }),
        firstSecondPerson: Object.freeze({
            combines: Object.freeze(["person", "number"]),
            fillers: Object.freeze(["m", "am", "n", "t"]),
            sameAsValenceSlot: "va1",
        }),
    }),
    st2: Object.freeze({
        suppliesCategoryMissingFromSt1: true,
        thirdPerson: Object.freeze({
            manifests: "number",
            singular: "0",
            plural: "m~n...",
            soundChangeRefs: Object.freeze(["Andrews §2.11.1", "Andrews §2.11.5", "Andrews §2.12.4-5"]),
        }),
        firstSecondPerson: Object.freeze({
            manifests: "possessive-case",
            filler: "o",
            vowelInitialStemAllomorph: "□",
        }),
    }),
    generationAllowed: false,
});

const NNC_LESSON13_SPECIFIC_POSSESSOR_FRAME = Object.freeze({
    kind: "lesson-13-specific-possessor-frame",
    sourceSection: "Andrews §13.6",
    role: "specific personal pronouns in possessor role",
    possessors: Object.freeze([
        Object.freeze({ id: "1sg", andrews: "n-o ~ n-□", meaning: "my", currentNawatPrefix: "nu" }),
        Object.freeze({ id: "1pl", andrews: "t-o ~ t-□", meaning: "our", currentNawatPrefix: "tu" }),
        Object.freeze({ id: "2sg", andrews: "m-o ~ m-□", meaning: "your (sg)", currentNawatPrefix: "mu" }),
        Object.freeze({ id: "2pl", andrews: "am-o ~ am-□", meaning: "your (pl)", currentNawatPrefix: "anmu" }),
        Object.freeze({ id: "3sg-common", andrews: "i-0", meaning: "his/her/its; its/their", currentNawatPrefix: "i" }),
        Object.freeze({ id: "3pl", andrews: "i-m ~ i-n...", meaning: "their", currentNawatPrefix: "in" }),
    ]),
    pluralPossessorTranslationRange: Object.freeze(["of one of us", "of one of you", "of one of them", "belonging to one of us/you/them"]),
    firstPluralBroadUse: "can broaden to someone's",
    traditionalSpellingWarning: "Distinguish VNC #am-0+m-o(... from NNC #0-0+am-o(... in texts with double/single consonant inconsistency.",
    nawatRealizationStatus: "current Nawat possessor prefixes are repo evidence, not automatic Classical surface imports",
    generationAllowed: false,
});

const NNC_LESSON13_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson13-possessive-state-nnc",
        andrewsSection: "13.1",
        category: "possessive-state-formula",
        directiveEs: "La CNN posesiva tiene Estado en el predicado: monadico +st(STEM) o diadico +st1-st2(STEM), sin posicion de tiempo.",
        engineSurface: "possessive formula metadata over ordinary NNC output",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson13-subject-positions",
        andrewsSection: "13.2",
        category: "possessive-subject-slots",
        directiveEs: "El sujeto posesivo conserva pers1-pers2, y su num1-num2 usa conectores sensibles al Estado; el conector sigue siendo del sujeto.",
        engineSurface: "subject and num1-num2 metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson13-subject-pronoun-summary",
        andrewsSection: "13.3",
        category: "possessive-subject-pronoun-inventory",
        directiveEs: "Los paradigmas de sujeto posesivo solo sirven para CNN posesivas y contrastan con los paradigmas absolutivos de la Leccion 12.",
        engineSurface: "diagnostic inventory metadata",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson13-monadic-state",
        andrewsSection: "13.4",
        category: "monadic-possessive-state",
        directiveEs: "El Estado monadico concentra persona, numero y caso posesivo en un solo pronombre prefijal: ne, te o tla.",
        engineSurface: "blocked monadic-state taxonomy",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson13-dyadic-state",
        andrewsSection: "13.5",
        category: "dyadic-possessive-state",
        directiveEs: "El Estado diadico divide persona, numero y caso entre st1 y st2, con reglas distintas para poseedor de tercera persona.",
        engineSurface: "specific possessor metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson13-specific-possessors",
        andrewsSection: "13.6",
        category: "specific-possessor-pronouns",
        directiveEs: "Los poseedores especificos son pronombres posesivos; sus realizaciones Nawat se toman de evidencia del repo, no de importacion grafica clasica.",
        engineSurface: "current possessor-prefix metadata",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
]);

const NNC_LESSON13_REMAINING_GAPS = Object.freeze([
    "The full Andrews possessive-state subject connector inventory is not generated as a complete paradigm.",
    "Monadic possessive-state NNCs with ne, te, and nonhuman tla/ta remain blocked until confirmed Nawat/Pipil evidence licenses them.",
    "Current specific possessor prefixes are Nawat repo evidence, while Andrews st1/st2 allomorphy and traditional-spelling caveats remain diagnostic metadata.",
    "Lesson 14 stem selection is required before possessive-state NNC generation can claim full Andrews coverage.",
]);

const NNC_LESSON14_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const NNC_LESSON14_PDF_REFS = Object.freeze([
    "Andrews Lesson 14.1",
    "Andrews Lesson 14.2",
    "Andrews Lesson 14.3",
    "Andrews Lesson 14.4",
    "Andrews Lesson 14.5",
    "Andrews Lesson 14.6",
    "Andrews Lesson 14.7",
    "Andrews Lesson 14.8",
]);

const NNC_LESSON14_USE_STEM_FRAME = Object.freeze({
    kind: "lesson-14-use-stem-frame",
    sourceSection: "Andrews §14.1",
    restrictedUseStem: Object.freeze({
        shape: "base",
        usualRole: "citation-form",
        usedIn: Object.freeze(["absolutive-state NNC"]),
    }),
    generalUseStem: Object.freeze({
        derivedFromRestrictedUseStem: true,
        usedIn: Object.freeze(["possessive-state NNC", "compound-stem embed subposition"]),
        shapeOptions: Object.freeze(["base", "truncated", "glottalized"]),
    }),
    currentEngineBoundary: "ordinary NNC stores a predicate stem and class, but does not yet model complete restricted/general use-stem alternation",
    generationAllowed: false,
});

const NNC_LESSON14_NOUNSTEM_CLASS_FRAME = Object.freeze({
    kind: "lesson-14-nounstem-class-frame",
    sourceSection: "Andrews §14.2",
    classNamingSlot: "subject num1 in absolutive singular/common NNCs",
    classMembershipPredictable: false,
    classes: Object.freeze([
        Object.freeze({
            andrewsClass: "ti",
            currentNawatClass: "t",
            absolutiveSingularCommonNum1: "tl",
            stemFinalShape: "vowel-final",
        }),
        Object.freeze({
            andrewsClass: "tli",
            currentNawatClass: "ti",
            absolutiveSingularCommonNum1: "tli/li",
            stemFinalShape: "consonant-final",
            liIsSeparateClass: false,
        }),
        Object.freeze({
            andrewsClass: "in",
            currentNawatClass: "in",
            absolutiveSingularCommonNum1: "in",
            stemFinalShape: "consonant-final",
        }),
        Object.freeze({
            andrewsClass: "0",
            currentNawatClass: "zero",
            absolutiveSingularCommonNum1: "0",
            stemFinalShape: "consonant-or-vowel-final",
        }),
    ]),
    mainDivision: "ti-class versus all other classes",
    inAndZeroNotNumerous: true,
    alternativeClassMembershipPossible: true,
    supportiveInitialVowelMayHaveVariantWithoutVowel: true,
    currentEngineClasses: Object.freeze(["t", "ti", "in", "zero"]),
    currentEngineBoundary: "class/stem-final compatibility is enforced; lexical class membership and alternatives remain evidence-bound",
    generationAllowed: false,
});

const NNC_LESSON14_NOUNSTEM_NUMBER_FRAME = Object.freeze({
    kind: "lesson-14-nounstem-number-frame",
    sourceSection: "Andrews §14.3",
    numberBelongsTo: "personal-pronoun subject",
    predicateMarksNumber: false,
    nounstemCanBeDerivationallyAlteredForGroupRelation: true,
    derivedStemTypes: Object.freeze([
        Object.freeze({
            id: "plain",
            relationship: "unmarked stem",
        }),
        Object.freeze({
            id: "affinity",
            relationship: "cohesive group relation",
            reduplication: "long-vowel reduplicative prefix inside the stem",
        }),
        Object.freeze({
            id: "distributive-varietal",
            relationship: "separate locations, separate members, or various kinds",
            reduplication: "glottal-stop reduplicative prefix inside the stem",
        }),
    ]),
    derivedStemIsNotSubjectPluralInflection: true,
    animateNonanimateDistinctionMaintained: true,
    affectiveStemContrast: "Lesson 32",
    pronominalPluralStemExceptions: Object.freeze(["Andrews §16.3", "Andrews §16.9"]),
    generationAllowed: false,
});

const NNC_LESSON14_ABSOLUTIVE_SINGULAR_COMMON_FRAME = Object.freeze({
    kind: "lesson-14-absolutive-singular-common-frame",
    sourceSection: "Andrews §14.4",
    predicateState: "absolutive",
    subjectNumber: "singular/common",
    requiredStemShape: "restricted-use base shape",
    derivedDistributiveOrVarietalStemMayServeAsBase: true,
    hasTensePosition: false,
    generationAllowed: false,
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
        tliInZeroClasses: "t or m; t favors consonant-final stems and m favors vowel-final stems, but lexical choice must be learned",
    }),
    affinityStemRules: Object.freeze({
        tiSource: "0 or infrequent m",
        tliOrInSource: "t",
        lexicallyObligatoryForSomeItems: true,
    }),
    distributiveVarietalRule: "formation follows the source stem",
    lexicalAlternativesCanBeFickleOrSteadfast: true,
    generationAllowed: false,
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
    generationAllowed: false,
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
            num1: "0",
        }),
        tli: Object.freeze({
            stemShape: "base",
            subclasses: Object.freeze([
                Object.freeze({ id: "tli-1", num1: "0", frequency: "almost all tli stems" }),
                Object.freeze({ id: "tli-2", num1: "hui", frequency: "very limited" }),
                Object.freeze({ id: "tli-2-alternative", num1: "0 instead of hui", frequency: "very limited" }),
            ]),
        }),
        ti: Object.freeze({
            subclasses: Object.freeze([
                Object.freeze({ id: "ti-1-a", stemShape: "base", num1: "uh", lexicalChoiceMustBeLearned: true }),
                Object.freeze({ id: "ti-1-b", stemShape: "base", num1: "0", lexicalChoiceMustBeLearned: true }),
                Object.freeze({ id: "ti-2-a", stemShape: "truncated", num1: "0", deletes: "ephemeral short i after long vowel" }),
                Object.freeze({ id: "ti-2-b", stemShape: "truncated", num1: "0", deletes: "ephemeral short a/i after one consonant" }),
                Object.freeze({ id: "ti-2-c", stemShape: "truncated-plus-supportive-i", num1: "0", deletes: "ephemeral short a after two consonants" }),
            ]),
        }),
    }),
    num1BelongsTo: "subject personal pronoun",
    num1DoesNotBelongTo: Object.freeze(["predicate-state", "nounstem", "noun suffix"]),
    warning: "Do not call uh/hu possessive suffixes or tli/li/in absolutive suffixes; State is in front of the nounstem.",
    generationAllowed: false,
});

const NNC_LESSON14_CONSTITUENT_ANALYSIS_FRAME = Object.freeze({
    kind: "lesson-14-constituent-analysis-frame",
    sourceSection: "Andrews §14.8",
    ambiguousBackConstituents: Object.freeze([
        "uh can be stem-final consonant or num1 filler",
        "ti can be stem-final consonant sequence or num1 filler",
        "tli can rarely be stem-final material or num1 filler",
    ]),
    ambiguousFrontConstituents: Object.freeze([
        "o after n/t/am can belong to the stem or to st2",
        "m after long i can belong to the stem or to st2",
    ]),
    spellingProblemRefs: Object.freeze([
        "amo ambiguity from Andrews §13.6",
        "long o missing in traditional spelling",
        "i-0 before long i or glottal-stop-initial stems",
        "supportive i dropped after i-0",
    ]),
    diagnosticRule: "keep alternative analyses open unless vocabulary, filler morphs, sound changes, and Nawat/Pipil evidence settle the parse",
    generationAllowed: false,
});

const NNC_LESSON14_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson14-use-stem-kinds",
        andrewsSection: "14.1",
        category: "restricted-general-use-stems",
        directiveEs: "Distinguir tronco de uso restringido para CNN absolutiva y tronco de uso general para CNN posesiva y encaje compuesto.",
        engineSurface: "use-stem metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-nounstem-classes",
        andrewsSection: "14.2",
        category: "nounstem-class-system",
        directiveEs: "Las clases se nombran por num1 absolutivo singular/comun; en Nawat actual son t, ti, in y zero, con membresia lexica no predecible.",
        engineSurface: "class/stem compatibility metadata",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-number-and-derived-stems",
        andrewsSection: "14.3",
        category: "number-and-derived-nounstems",
        directiveEs: "El numero pertenece al sujeto; afinidad y distributivo/varietal son derivaciones internas del tronco, no plural nominal.",
        engineSurface: "derived-stem diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-absolutive-singular-common",
        andrewsSection: "14.4",
        category: "absolutive-singular-common-stem-selection",
        directiveEs: "La CNN absolutiva singular/comun usa la forma base del tronco de uso restringido.",
        engineSurface: "absolutive class compatibility",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-absolutive-plural",
        andrewsSection: "14.5",
        category: "absolutive-plural-stem-selection",
        directiveEs: "La CNN absolutiva plural puede usar tronco simple, de afinidad o distributivo/varietal, con num1 lexicamente aprendido.",
        engineSurface: "plural-subject diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-possessive-plural",
        andrewsSection: "14.6",
        category: "possessive-plural-stem-selection",
        directiveEs: "La CNN posesiva plural normalmente usa tronco simple, salvo necesidad semantica de afinidad o distribucion.",
        engineSurface: "possessive plural diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-possessive-singular-common",
        andrewsSection: "14.7",
        category: "possessive-singular-common-stem-selection",
        directiveEs: "La CNN posesiva singular/comun selecciona forma base o truncada segun clase y subclase; num1 sigue siendo del sujeto.",
        engineSurface: "possessive class/subclass diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson14-constituent-analysis-difficulties",
        andrewsSection: "14.8",
        category: "constituent-analysis-diagnostics",
        directiveEs: "Mantener analisis alternativos para uh, ti, tli, o y m cuando la ortografia o el vocabulario no decidan la frontera.",
        engineSurface: "ambiguity diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
]);

const NNC_LESSON14_REMAINING_GAPS = Object.freeze([
    "Current ordinary NNC class handling enforces Nawat t/ti/in/zero shape compatibility, but full Andrews lexical class membership and class alternatives are not data-complete.",
    "Restricted-use versus general-use stem selection is not yet a complete engine contract for possessive NNCs and compound embed positions.",
    "Affinity and distributive/varietal nounstem derivation, plural-subject alternatives, and class/subclass num1 choices remain diagnostic or Nawat/Pipil-evidence-needed.",
    "Constituent-analysis ambiguities around uh, ti, tli, o, m, and traditional spelling remain diagnostic metadata until vocabulary and Nawat/Pipil evidence settle them.",
]);

const NNC_LESSON15_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const NNC_LESSON15_PDF_REFS = Object.freeze([
    "Andrews Lesson 15.1",
    "Andrews Lesson 15.2",
    "Andrews Lesson 15.3",
]);

const NNC_LESSON15_POSSESSIVE_PECULIARITIES_FRAME = Object.freeze({
    kind: "lesson-15-possessive-peculiarities-frame",
    sourceSection: "Andrews §15.1",
    possessivePluralAssimilation: Object.freeze({
        connector: "hu-an",
        affectedStemFinals: Object.freeze(["voiceless uh/w", "n"]),
        soundChangeRefs: Object.freeze(["Andrews §2.12.6", "Andrews §2.12.5"]),
        generationAllowedWithoutEvidence: false,
    }),
    suppletivePossessiveStems: Object.freeze([
        Object.freeze({ source: "(tlacoh)-tli", possessiveStem: "(tlaca)-tl", role: "slave/person replacement" }),
        Object.freeze({ source: "(pil)-li", possessiveStem: "(pil-lo)-tl", role: "nobleman/nobility replacement" }),
        Object.freeze({ source: "(teuc)-tli", possessiveStem: "(teuc-yo)-tl", role: "lord/lordship replacement" }),
        Object.freeze({ source: "(tec)-0", possessiveStem: "Totec", role: "special title/name" }),
    ]),
    spuriousOrTraditionalWarning: "totecuiyo/notecuiyo is treated as a text-history warning, not a productive source stem.",
    derivedNonanimatePossessive: Object.freeze({
        stemTypes: Object.freeze(["distributive-varietal", "affinity"]),
        numberDyadReports: "common number",
        englishMayTranslatePlural: true,
    }),
    possessorReduplicationCanMarkPlurality: true,
    secondaryGeneralUseStem: Object.freeze({
        possessor: "te",
        operation: "possessive-state predicate downgraded to general-use stem",
        teMayBlurTo: Object.freeze(["ti", "t"]),
    }),
    analogicalTlaStem: Object.freeze({
        possessor: "tla",
        operation: "possessive-state predicate downgraded to restricted-use stem",
        currentNawatCandidate: "ta",
        generationAllowedWithoutEvidence: false,
    }),
    tiSubclassReclassification: "Subclass 2-A ti stems can reclassify as Subclass 1-A by loss of ephemeral i, with possible meaning or style shift.",
    nuclearPossessorRule: "The pronominal possessor inside the NNC is the nuclear/basic possessor; supplementary possessors are later sentence structure.",
    generationAllowed: false,
});

const NNC_LESSON15_NATURALLY_POSSESSED_FRAME = Object.freeze({
    kind: "lesson-15-naturally-possessed-frame",
    sourceSection: "Andrews §15.2",
    description: "Some nounstems usually or always occur in possessive-state NNCs because their referent is naturally associated with another entity.",
    dictionaryAbsolutiveSuffixCanOnlyIdentifyClass: true,
    naturalPossessionTypes: Object.freeze([
        Object.freeze({ id: "property", examples: Object.freeze(["home/homeland", "property/possession"]) }),
        Object.freeze({ id: "kinship-human-relations", examples: Object.freeze(["child", "mother", "enemy", "companion"]) }),
        Object.freeze({ id: "body-parts", examples: Object.freeze(["nose", "hand"]) }),
    ]),
    unavailablePossessiveContrast: Object.freeze({
        examples: Object.freeze(["cloud", "rain"]),
        metaphorCanOverrideRestriction: true,
    }),
    organicIntegralPossessionRef: "Andrews §39.3.4",
    currentEngineBoundary: "current ordinary possessive fixtures and organic -yu opt-in do not prove complete Lesson 15 natural-possession classes",
    generationAllowed: false,
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
    generationAllowed: false,
});

const NNC_LESSON15_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson15-possessive-peculiarities",
        andrewsSection: "15.1",
        category: "possessive-state-peculiarities",
        directiveEs: "Registrar asimilacion con hu-an, suplencias posesivas, troncos secundarios, analogias con tla, reduplicacion de poseedor y poseedor nuclear sin generar paradigmas no confirmados.",
        engineSurface: "possessive peculiarity diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson15-naturally-possessed-nounstems",
        andrewsSection: "15.2",
        category: "natural-possession-state-cases",
        directiveEs: "Distinguir posesion natural, obligatoria o restringida de posesion ordinaria; los sufijos absolutivos de diccionario solo identifican clase.",
        engineSurface: "natural-possession evidence boundary",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson15-nnc-sentence-structure",
        andrewsSection: "15.3",
        category: "nnc-sentence-structure",
        directiveEs: "Una CNN puede ser oracion simple o entrar en oraciones complejas/compuestas, pero la salida nominal no debe convertirse silenciosamente en generador de oraciones.",
        engineSurface: "sentence-layer diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
]);

const NNC_LESSON15_REMAINING_GAPS = Object.freeze([
    "Possessive plural assimilation, suppletive possessive stems, te/tla secondary stems, possessor reduplication, and ti-subclass reclassification remain diagnostic until Nawat/Pipil evidence licenses concrete forms.",
    "Natural-possession state cases require lexical metadata for required, optional, unavailable, possessive-only, absolutive-unavailable, and irregular nouns.",
    "Current fixture-backed possessive forms and organic -yu generation do not prove complete Lesson 15 natural-possession coverage.",
    "NNC sentence-structure behavior remains sentence-layer metadata; sentence generation and particle placement are not licensed by ordinary NNC output alone.",
]);

const NNC_LESSON16_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const NNC_LESSON16_PDF_REFS = Object.freeze([
    "Andrews Lesson 16.1",
    "Andrews Lesson 16.2",
    "Andrews Lesson 16.3",
    "Andrews Lesson 16.4",
    "Andrews Lesson 16.5",
    "Andrews Lesson 16.6",
    "Andrews Lesson 16.7",
    "Andrews Lesson 16.8",
    "Andrews Lesson 16.9",
]);

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
    currentEngineBoundary: "ordinary NNC formula slots are not reused as generated pronominal NNC paradigms without a separate Nawat evidence model",
    generationAllowed: false,
});

const NNC_LESSON16_ENTITIVE_FRAME = Object.freeze({
    kind: "lesson-16-entitive-pronominal-frame",
    sourceSection: "Andrews §16.2",
    subtypes: Object.freeze(["personal", "interrogative", "indefinite", "demonstrative"]),
    hasRelativePronouns: false,
    generationAllowed: false,
});

const NNC_LESSON16_PERSONAL_FRAME = Object.freeze({
    kind: "lesson-16-personal-pronominal-nnc-frame",
    sourceSection: "Andrews §16.3",
    realPersonalPronounsAreAffixal: true,
    stems: Object.freeze([
        Object.freeze({
            id: "simple-eh",
            stems: Object.freeze(["eh-0", "yeh-0"]),
            thirdPersonVariant: "yeh",
            meaning: "entity/existent one",
            pluralSubjectUse: "extremely rare",
            shortFormsUsuallySupplements: true,
        }),
        Object.freeze({
            id: "compound-eh-hua",
            stems: Object.freeze(["eh-hua-tl", "yeh-hua-tl"]),
            thirdPersonVariant: "yeh-hua",
            pluralStemRule: "add derivational n inside predicate stem when subject is plural",
            num1Variants: Object.freeze(["sounded", "silent"]),
            distributiveVarietalCommonSubjectPossible: true,
        }),
    ]),
    adverbialModificationPossible: true,
    idiomaticQuenMachHuelConstruction: true,
    doubledFirstPluralPers1Formation: true,
    supplementRefs: Object.freeze(["Andrews Lessons 17-18"]),
    generationAllowed: false,
});

const NNC_LESSON16_INTERROGATIVE_FRAME = Object.freeze({
    kind: "lesson-16-interrogative-pronominal-nnc-frame",
    sourceSection: "Andrews §16.4",
    questionScope: "identity of the affixal subject",
    stems: Object.freeze([
        Object.freeze({ id: "what-entity", stem: "tl-eh-0", gloss: "what entity / what", usualSubject: "third-person singular", anyPersonPossible: true }),
        Object.freeze({ id: "what-entity-compound", stem: "tl-eh-hua-tl", gloss: "what entity / what" }),
        Object.freeze({ id: "which-entity", stem: "ca-tl", gloss: "which entity / which one" }),
        Object.freeze({ id: "who", stem: "a-0-c", gloss: "what person / who", fixedSubject: "third-person singular", singularOrPluralMeaning: true }),
    ]),
    tlehInFusion: Object.freeze({
        source: "tleh + in",
        fusedForms: Object.freeze(["tlein", "tlei", "tlen"]),
        writeSeparateWhenDependentClauseFollows: true,
    }),
    acInFusion: Object.freeze({
        source: "ac + in",
        fusedForms: Object.freeze(["aquin", "aqui"]),
        writeSeparateWhenDependentClauseFollows: true,
    }),
    interrogativeQualityLostWhen: Object.freeze(["negative", "not sentence-initial"]),
    relativePronounWarning: "do not model these as English-style relative pronouns",
    generationAllowed: false,
});

const NNC_LESSON16_DEMONSTRATIVE_FRAME = Object.freeze({
    kind: "lesson-16-demonstrative-pronominal-nnc-frame",
    sourceSection: "Andrews §16.5",
    stems: Object.freeze([
        Object.freeze({ id: "proximal", stem: "in", gloss: "this one / these" }),
        Object.freeze({ id: "distal", stem: "on", gloss: "that one / those" }),
    ]),
    canFunctionAdjectivally: true,
    adjectivalFunctionRef: "Andrews §40.1",
    invariantButPreferNncAnalysis: true,
    subjectLimit: "third-person",
    pluralNumberDyad: "0-0",
    pluralizesStem: false,
    stemFinalNMayBeUnwritten: true,
    adjunctorSolidSpellingWarning: "in in / in on are traditionally written inin / inon",
    generationAllowed: false,
});

const NNC_LESSON16_INDEFINITE_FRAME = Object.freeze({
    kind: "lesson-16-indefinite-pronominal-nnc-frame",
    sourceSection: "Andrews §16.6",
    matrixStem: "ah-0",
    matrixMeaning: "undetermined, unspecified, or unknown entity",
    stems: Object.freeze([
        Object.freeze({ id: "someone", stem: "a-c-ah-0", source: "ac", humanMeaning: true }),
        Object.freeze({ id: "something", stem: "itl-ah-0", source: "related to tla / tl-eh", humanSubjectOnlySpecialSituations: true }),
    ]),
    embedVowelLengthLost: true,
    lessGeneralThanPrefixes: Object.freeze(["te", "tla"]),
    generationAllowed: false,
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
    generationAllowed: false,
});

const NNC_LESSON16_QUICH_FRAME = Object.freeze({
    kind: "lesson-16-quantitive-quich-frame",
    sourceSection: "Andrews §16.8",
    matrix: "qui-ch-0",
    stems: Object.freeze([
        Object.freeze({ id: "all", stem: "ix-qui-ch-0", meaning: "total amount / all" }),
        Object.freeze({ id: "how-much-general", stem: "que-x-qui-ch-0", meaning: "how much / how many in general" }),
        Object.freeze({ id: "how-many-varietal", stem: "que-x-ix-qui-ch-0", meaning: "how many in different places or kinds" }),
    ]),
    adverbialModificationFrequent: true,
    interrogativeQualityLostWhenNotInitial: true,
    generationAllowed: false,
});

const NNC_LESSON16_QUI_CHI_FRAME = Object.freeze({
    kind: "lesson-16-quantitive-qui-chi-frame",
    sourceSection: "Andrews §16.9",
    matrices: Object.freeze(["qui/c", "chi/ch"]),
    pluralizedStemRule: "normally includes derivational n when subject is plural",
    pluralSubjectNumberDyads: Object.freeze(["t-in", "0-0"]),
    stems: Object.freeze([
        Object.freeze({ id: "abundant", stem: "miya/miye-qui/c", meaning: "much / many" }),
        Object.freeze({ id: "some", stem: "ce-qui/c", meaning: "one, some, part" }),
        Object.freeze({ id: "equal", stem: "iz-qui", meaning: "as much / as many" }),
        Object.freeze({ id: "how-many-specific", stem: "que-z-qui", meaning: "how many specifically" }),
        Object.freeze({ id: "few", stem: "a-qui", meaning: "a few" }),
        Object.freeze({ id: "little", stem: "a-chi", meaning: "a little" }),
        Object.freeze({ id: "all-full", stem: "mo-chi/ch", meaning: "all" }),
        Object.freeze({ id: "great-many", stem: "ix-a-chi", meaning: "very large amount / many" }),
    ]),
    variantPluralFormationsExist: true,
    interrogativeQualityLostWhenNotInitial: true,
    generationAllowed: false,
});

const NNC_LESSON16_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson16-pronominal-nnc-overview",
        andrewsSection: "16.1",
        category: "pronominal-nnc-overview",
        directiveEs: "Las CNN pronominales son CNN absolutivas especiales sobre troncos entitativos o cuantitativos, no pronombres-palabra importables.",
        engineSurface: "pronominal NNC boundary metadata",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-entitive-subtypes",
        andrewsSection: "16.2",
        category: "entitive-pronominal-subtypes",
        directiveEs: "Las entitativas se dividen en personales, interrogativas, indefinidas y demostrativas; no hay pronombres relativos.",
        engineSurface: "entitive subtype metadata",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-personal-pronominal",
        andrewsSection: "16.3",
        category: "personal-pronominal-nnc",
        directiveEs: "Los pronombres personales reales son afijales; eh/yeh y eh-hua/yeh-hua son predicados CNN de entidad y suelen servir como suplementos.",
        engineSurface: "personal-pronominal diagnostic metadata",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-interrogative-pronominal",
        andrewsSection: "16.4",
        category: "interrogative-pronominal-nnc",
        directiveEs: "Las interrogativas identificacionales preguntan por el sujeto afijal; pierden interrogatividad en negativo o fuera de posicion inicial.",
        engineSurface: "interrogative pronominal diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-demonstrative-pronominal",
        andrewsSection: "16.5",
        category: "demonstrative-pronominal-nnc",
        directiveEs: "in y on son CNN demostrativas de tercera persona, aunque sean invariantes y puedan parecer particulas.",
        engineSurface: "demonstrative pronominal diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-indefinite-pronominal",
        andrewsSection: "16.6",
        category: "indefinite-pronominal-nnc",
        directiveEs: "acah e itlah son compuestos indefinidos menos generales que los prefijos te y tla.",
        engineSurface: "indefinite pronominal diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-quantitive-overview",
        andrewsSection: "16.7",
        category: "quantitive-pronominal-overview",
        directiveEs: "Las cuantitativas son CNN absolutivas de cantidad/numero con matrices chi, qui y qui-ch, no cuantificadores sueltos.",
        engineSurface: "quantitive pronominal diagnostics",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-quantitive-quich",
        andrewsSection: "16.8",
        category: "quantitive-quich-pronominal",
        directiveEs: "ixquich y quexquich pertenecen a la matriz qui-ch y mantienen reglas de posicion interrogativa.",
        engineSurface: "qui-ch quantitive diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
    Object.freeze({
        id: "lesson16-quantitive-qui-chi",
        andrewsSection: "16.9",
        category: "quantitive-qui-chi-pronominal",
        directiveEs: "Las matrices qui/c y chi/ch pluralizan por n derivacional en el tronco cuando corresponde; no se generan paradigmas sin evidencia.",
        engineSurface: "qui/chi quantitive diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        implementationState: "partial",
    }),
]);

const NNC_LESSON16_REMAINING_GAPS = Object.freeze([
    "Confirmed Nawat/Pipil pronominal NNC examples are still needed before any personal, interrogative, demonstrative, indefinite, or quantitive paradigms can generate.",
    "The current ordinary NNC formula slot model is not yet extended to a safe pronominal NNC route.",
    "Fused spellings such as tlein/aquin and demonstrative inin/inon remain diagnostic text-analysis metadata, not generated Nawat fixtures.",
    "Quantitive matrix allomorphy, derivational plural n, adjectival-function use, and supplementation behavior remain diagnostic or deferred to later lessons.",
]);

function buildVerbDerivedNominalDiagnostic({
    id = "verb-derived-nominal-blocked",
    message = "La generacion no produjo una forma.",
    failedLayer = "route",
    contractLayer = "routeContract",
    routeStage = "",
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
        routeStage: String(routeStage || "").trim(),
    };
}

function getVerbDerivedNominalAndrewsRefs(kind = "", result = null) {
    const refs = [];
    const output = result && typeof result === "object" ? result : {};
    [
        output.instrumentivoSourceSubjectPossessor?.grammarSource,
        output.actionNounSourceSubjectPossessor?.grammarSource,
        output.nominalizationProfile?.curriculumRef?.source === "Andrews"
            ? `Andrews ${output.nominalizationProfile.curriculumRef.range || "Lesson 36"}`
            : "",
    ].forEach((entry) => {
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
    return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function normalizeVerbDerivedNominalSurfaceValue(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitVerbDerivedNominalSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeVerbDerivedNominalSurfaceValue(entry))
        .filter(Boolean);
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
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
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
        return forms
            .flatMap((entry) => splitVerbDerivedNominalSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
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
    return forms
        .flatMap((entry) => splitVerbDerivedNominalSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getVerbDerivedNominalSurface(result = null) {
    const output = result && typeof result === "object" ? result : {};
    const frameResult = getVerbDerivedNominalResultFramePayload(output);
    const hasResultFrame = Boolean(frameResult);
    return normalizeVerbDerivedNominalSurfaceValue(
        getVerbDerivedNominalSurfaceForms(output)[0]
        || frameResult?.surface
        || (!hasResultFrame ? (output.surface || output.result) : "")
        || ""
    );
}

function hasVerbDerivedNominalSurface(result = null) {
    return Boolean(getVerbDerivedNominalSurface(result) || getVerbDerivedNominalSurfaceForms(result).length);
}

function normalizeVerbDerivedNominalDiagnostics(result = null, fallbackDiagnostic = null) {
    const output = result && typeof result === "object" ? result : {};
    const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
    const normalized = typeof normalizeGrammarDiagnosticContractEntries === "function"
        ? normalizeGrammarDiagnosticContractEntries(diagnostics)
        : diagnostics.filter((entry) => entry && typeof entry === "object");
    if (!normalized.length && fallbackDiagnostic) {
        normalized.push(fallbackDiagnostic);
    }
    return normalized;
}

function applyVerbDerivedNominalDiagnosticLayerMetadata(diagnostics = [], routeStage = "") {
    return (Array.isArray(diagnostics) ? diagnostics : []).map((entry) => {
        if (!entry || typeof entry !== "object") {
            return entry;
        }
        return {
            ...entry,
            failedLayer: entry.failedLayer || "route",
            contractLayer: entry.contractLayer || "routeContract",
            routeFamily: entry.routeFamily || "verb-derived-nominal",
            routeStage: entry.routeStage || String(routeStage || "").trim(),
        };
    });
}

function attachVerbDerivedNominalGrammarContract(result = null, {
    kind = "",
    rawVerb = "",
    routeStage = "execute",
    diagnosticId = "verb-derived-nominal-blocked",
    message = "La generacion no produjo una forma.",
    enumerable = false,
} = {}) {
    const output = result && typeof result === "object" ? result : {};
    const nominalKind = String(kind || output.nounDerivationKind || "").trim();
    const fallbackDiagnostic = buildVerbDerivedNominalDiagnostic({
        id: diagnosticId,
        message,
        failedLayer: "route",
        contractLayer: "routeContract",
        routeStage,
    });
    const diagnostics = applyVerbDerivedNominalDiagnosticLayerMetadata(
        normalizeVerbDerivedNominalDiagnostics(output, output.error ? fallbackDiagnostic : null),
        routeStage
    );
    if (!Object.prototype.hasOwnProperty.call(output, "diagnostics")) {
        Object.defineProperty(output, "diagnostics", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: diagnostics,
        });
    }
    const surface = getVerbDerivedNominalSurface(output);
    const surfaceForms = getVerbDerivedNominalSurfaceForms(output);
    const ok = Boolean(surface) && output.error !== true && output.supported !== false;
    const grammarFrame = typeof buildGrammarFrame === "function"
        ? buildGrammarFrame({
            authorityFrame: typeof buildGrammarAuthorityFrame === "function"
                ? buildGrammarAuthorityFrame({
                    sourceEvidence: {
                        kind: "verb-derived-nominal",
                        nominalKind,
                        sourceModel: output.sourceModel || null,
                    },
                    evidenceStatus: ok ? "generated" : "blocked",
                    andrewsRefs: getVerbDerivedNominalAndrewsRefs(nominalKind, output),
                    supported: ok,
                })
                : null,
            unitFrame: {
                unitKind: "nominal-nuclear-clause",
                outputKind: "verb-derived-nominal",
                generationRoute: nominalKind,
            },
            orthographyFrame: {
                surface,
                surfaceForms,
                spellingAuthority: "Nawat/Pipil evidence",
                noClassicalSurfaceImport: true,
            },
            morphBoundaryFrame: {
                num1Num2: output.num1Num2 || null,
                num1Num2Alternates: Array.isArray(output.num1Num2Alternates)
                    ? output.num1Num2Alternates
                    : [],
            },
            stemFrame: {
                stem: String(output.entries?.[0]?.verb || ""),
                sourceStem: String(output.sourceModel?.sourceStem || output.sourceModel?.matrixBase || ""),
                entries: Array.isArray(output.entries) ? output.entries : [],
            },
            nuclearClauseFrame: output.nominalClauseFrame || null,
            participantFrame: {
                possessor: {
                    prefix: String(
                        output.instrumentivoSourceSubjectPossessor?.possessivePrefix
                        || output.actionNounSourceSubjectPossessor?.possessivePrefix
                        || output.possessorPrefix
                        || ""
                    ),
                },
            },
            inflectionFrame: {
                tenseMode: "sustantivo",
                tense: nominalKind,
                state: output.nominalClauseFrame?.stateSlot?.state || "",
            },
            routeContract: typeof buildGrammarRouteContractFrame === "function"
                ? buildGrammarRouteContractFrame({
                    routeFamily: "verb-derived-nominal",
                    routeStage: ok ? routeStage : "blocked",
                    sourceContract: {
                        rawVerb: String(rawVerb || ""),
                        nominalKind,
                        sourceModel: output.sourceModel || null,
                    },
                    targetContract: {
                        outputKind: "verb-derived-nominal",
                        generationRoute: nominalKind,
                    },
                    generationAllowed: ok,
                    blockingDiagnostics: ok ? [] : diagnostics,
                })
                : null,
            astFrame: null,
            resultFrame: typeof buildGrammarResultFrame === "function"
                ? buildGrammarResultFrame({
                    ok,
                    surface,
                    surfaceForms,
                    outputKind: "verb-derived-nominal",
                    generationRoute: nominalKind,
                    sourceInput: String(rawVerb || ""),
                })
                : null,
            diagnosticFrame: typeof buildGrammarDiagnosticFrame === "function"
                ? buildGrammarDiagnosticFrame({
                    status: ok ? "generated" : "blocked",
                    diagnostics,
                    blockers: ok ? [] : diagnostics,
                })
                : null,
        })
        : null;
    const resultContract = typeof buildGrammarResultContract === "function"
        ? buildGrammarResultContract({ result: output, grammarFrame })
        : { ok, surface, frames: grammarFrame, diagnostics };
    Object.defineProperties(output, {
        grammarFrame: {
            configurable: true,
            enumerable,
            writable: true,
            value: grammarFrame,
        },
        ok: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.ok,
        },
        surface: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.surface,
        },
        frames: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.frames,
        },
    });
    return output;
}

function buildVerbDerivedNominalBlockedResult(options = {}) {
    return attachVerbDerivedNominalGrammarContract({ error: true }, {
        ...options,
        routeStage: "blocked",
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
    if (
        normalized === "organic"
        || normalized === "integral"
        || normalized === "inalienable"
        || normalized === "natural"
        || normalized === "organic-possession"
        || normalized === "natural-possession"
    ) {
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
    return animacy === "animate"
        ? ORDINARY_NNC_PLURAL_TYPE.count
        : ORDINARY_NNC_PLURAL_TYPE.distributive;
}

function normalizeOrdinaryNncAgreementNumber(value = "") {
    const normalized = normalizeOrdinaryNncText(value);
    return normalized === "sg" ? "singular" : (normalized === "pl" ? "plural" : normalized);
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
    return (
        typeof ORDINARY_NNC_FIXTURES !== "undefined"
        && Array.isArray(ORDINARY_NNC_FIXTURES)
    )
        ? ORDINARY_NNC_FIXTURES
        : [];
}

function getOrdinaryNncPossessiveEntries() {
    return (
        typeof POSSESSIVE_PREFIXES !== "undefined"
        && Array.isArray(POSSESSIVE_PREFIXES)
    )
        ? POSSESSIVE_PREFIXES
        : [];
}

function getOrdinaryNncSubjectEntries() {
    return (
        typeof SUBJECT_COMBINATIONS !== "undefined"
        && Array.isArray(SUBJECT_COMBINATIONS)
    )
        ? SUBJECT_COMBINATIONS
        : [];
}

function buildOrdinaryNncDiagnostic(id = "", message = "", severity = "unsupported") {
    return {
        id,
        severity,
        message,
    };
}

function attachNncLessonGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nominal-nuclear-clause-metadata",
        routeFamily: "ordinary-nnc",
        structuralSource: "Andrews Lesson 12",
        andrewsRefs: ["Andrews Lesson 12.1-12.7"],
        ...options,
    });
}

function cloneNncLessonRecord(value) {
    if (Array.isArray(value)) {
        return value.map((entry) => cloneNncLessonRecord(entry));
    }
    if (!value || typeof value !== "object") {
        return value;
    }
    return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, cloneNncLessonRecord(entry)])
    );
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
    return NNC_LESSON12_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON12_VALIDATION_REFS),
        generationPolicy: "diagnostico; no importa conectores clasicos ni genera paradigmas completos sin evidencia Nawat/Pipil",
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
        plannedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 12.1-12.7 against NNC/VNC contrast, absolutive-state NNC formula slots, subject-pronoun positions, predicate behavior, animacy, and state/nounstem boundaries.",
                andrewsRefs: Array.from(NNC_LESSON12_PDF_REFS),
                expectedFeedbackRefs: Array.from(NNC_LESSON12_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                result: "hit",
                correction: "Lesson 12 now carries subsection PDF refs, Spanish directives, absolutive NNC formula metadata, subject num1-num2 ownership, no-tense predicate boundaries, animacy diagnostics, and generation blockers for unlicensed Classical connector paradigms.",
                andrewsRefs: Array.from(NNC_LESSON12_PDF_REFS),
                feedbackRefs: Array.from(NNC_LESSON12_VALIDATION_REFS),
            },
        ],
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
            noTenseSlot: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson12RemainingGaps(),
        closestPass: false,
        generationAllowed: false,
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
            formula: absolutiveFormulaFrame.linearFormula,
            statePosition: "vacant",
            hasTensePosition: false,
        },
        participantFrame: {
            subject: subjectPositionFrame,
            animacy: animacyFrame,
        },
        inflectionFrame: {
            hasTensePosition: false,
            predicateState: "absolutive",
        },
        targetContract: {
            metadataKind: "lesson-12-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
        },
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
    return NNC_LESSON13_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON13_VALIDATION_REFS),
        generationPolicy: "diagnostico; no importa poseedores clasicos ni genera paradigmas posesivos completos sin evidencia Nawat/Pipil",
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
        plannedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 13.1-13.6 against possessive-state NNC formulas, subject connector behavior, monadic and dyadic State slots, and possessor-pronoun inventories.",
                andrewsRefs: Array.from(NNC_LESSON13_PDF_REFS),
                expectedFeedbackRefs: Array.from(NNC_LESSON13_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                result: "hit",
                correction: "Lesson 13 now carries subsection PDF refs, Spanish directives, possessive-state formula metadata, subject num1-num2 ownership, monadic and dyadic State taxonomy, specific possessor frames, and blockers for unlicensed Classical-to-Nawat possessive paradigms.",
                andrewsRefs: Array.from(NNC_LESSON13_PDF_REFS),
                feedbackRefs: Array.from(NNC_LESSON13_VALIDATION_REFS),
            },
        ],
        subsectionInventory: inventory,
        possessiveFormulaFrame,
        subjectPositionFrame,
        subjectPronounInventoryFrame: getNncLesson13SubjectPronounInventoryFrame(),
        monadicStateFrame,
        dyadicStateFrame,
        specificPossessorFrame,
        currentEngineBoundary: {
            ordinaryNncPossessiveStateExists: true,
            currentSpecificPossessorPrefixesAreNawatEvidence: true,
            monadicPossessiveStateGenerated: false,
            completeAndrewsPossessiveParadigmGenerated: false,
            noTenseSlot: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson13RemainingGaps(),
        closestPass: false,
        generationAllowed: false,
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
                dyadic: dyadicStateFrame,
            },
        },
        nuclearClauseFrame: {
            clauseKind: ORDINARY_NNC_CLAUSE_KIND,
            formulas: possessiveFormulaFrame.formulas,
            statePosition: "present-in-predicate",
            hasTensePosition: false,
        },
        participantFrame: {
            subject: subjectPositionFrame,
            possessor: specificPossessorFrame,
        },
        inflectionFrame: {
            hasTensePosition: false,
            predicateState: "possessive",
        },
        targetContract: {
            metadataKind: "lesson-13-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
        },
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
    return NNC_LESSON14_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON14_VALIDATION_REFS),
        generationPolicy: "diagnostico; no completa clases, subclases, derivaciones de tronco ni alternativas sin evidencia Nawat/Pipil",
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
        plannedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 14.1-14.8 against use-stem kinds, nounstem classes, number boundaries, state/number-specific stem selection, and constituent-analysis warnings.",
                andrewsRefs: Array.from(NNC_LESSON14_PDF_REFS),
                expectedFeedbackRefs: Array.from(NNC_LESSON14_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                result: "hit",
                correction: "Lesson 14 now carries subsection PDF refs, Spanish directives, use-stem and nounstem-class metadata, number/derived-stem boundaries, state-specific stem-selection frames, and blockers for unlicensed class/subclass generation.",
                andrewsRefs: Array.from(NNC_LESSON14_PDF_REFS),
                feedbackRefs: Array.from(NNC_LESSON14_VALIDATION_REFS),
            },
        ],
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
            noTenseSlot: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson14RemainingGaps(),
        closestPass: false,
        generationAllowed: false,
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
            ambiguityFrame: constituentAnalysisFrame,
        },
        stemFrame: {
            useStemFrame,
            nounstemClassFrame,
            nounstemNumberFrame,
            stateSpecificStemSelection: {
                absolutiveSingularCommon: absolutiveSingularCommonFrame,
                absolutivePlural: absolutivePluralFrame,
                possessivePlural: possessivePluralFrame,
                possessiveSingularCommon: possessiveSingularCommonFrame,
            },
        },
        nuclearClauseFrame: {
            clauseKind: ORDINARY_NNC_CLAUSE_KIND,
            stateScope: ["absolutive", "possessive"],
            hasTensePosition: false,
        },
        participantFrame: {
            subject: {
                numberBelongsTo: nounstemNumberFrame.numberBelongsTo,
                predicateMarksNumber: nounstemNumberFrame.predicateMarksNumber,
            },
        },
        inflectionFrame: {
            hasTensePosition: false,
            predicateState: "absolutive-or-possessive",
            nounstemClassValues: nounstemClassFrame.currentEngineClasses,
        },
        targetContract: {
            metadataKind: "lesson-14-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
        },
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
    return NNC_LESSON15_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON15_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera suplencias, posesion natural ni oraciones CNN sin evidencia Nawat/Pipil y capa sintactica",
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
        plannedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 15.1-15.3 against possessive-state peculiarities, naturally possessed nounstems, and NNC sentence-structure boundaries.",
                andrewsRefs: Array.from(NNC_LESSON15_PDF_REFS),
                expectedFeedbackRefs: Array.from(NNC_LESSON15_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                result: "hit",
                correction: "Lesson 15 now carries subsection PDF refs, Spanish directives, possessive-peculiarity metadata, natural-possession evidence boundaries, NNC sentence-structure diagnostics, and blockers for unlicensed state-case or sentence generation.",
                andrewsRefs: Array.from(NNC_LESSON15_PDF_REFS),
                feedbackRefs: Array.from(NNC_LESSON15_VALIDATION_REFS),
            },
        ],
        subsectionInventory: inventory,
        possessivePeculiaritiesFrame,
        naturallyPossessedFrame,
        sentenceStructureFrame,
        currentEngineBoundary: {
            ordinaryPossessiveFixturesExist: true,
            organicYuOptInExists: true,
            completeNaturalPossessionLexicon: false,
            sentenceGenerationLicensed: false,
            noTenseSlot: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson15RemainingGaps(),
        closestPass: false,
        generationAllowed: false,
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
            nuclearPossessorRule: possessivePeculiaritiesFrame.nuclearPossessorRule,
        },
        stemFrame: {
            possessivePeculiaritiesFrame,
            naturallyPossessedFrame,
        },
        nuclearClauseFrame: {
            clauseKind: ORDINARY_NNC_CLAUSE_KIND,
            sentenceStructureFrame,
            hasTensePosition: false,
        },
        participantFrame: {
            possessor: {
                nuclearBasicPossessor: true,
                supplementaryPossessorsDeferred: true,
            },
        },
        inflectionFrame: {
            hasTensePosition: false,
            predicateState: "possessive-state-diagnostic",
        },
        targetContract: {
            metadataKind: "lesson-15-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
        },
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
    return NNC_LESSON16_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NNC_LESSON16_VALIDATION_REFS),
        generationPolicy: "diagnostico; no genera CNN pronominales sin ejemplos Nawat/Pipil confirmados y contrato de ruta separado",
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
        plannedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 16.1-16.9 against pronominal NNC kinds, entitive and quantitive subtypes, absolutive-only status, fused-spelling warnings, and generation blockers.",
                andrewsRefs: Array.from(NNC_LESSON16_PDF_REFS),
                expectedFeedbackRefs: Array.from(NNC_LESSON16_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                result: "hit",
                correction: "Lesson 16 now carries subsection PDF refs, Spanish directives, pronominal-NNC subtype metadata, absolutive-only boundaries, fused-spelling diagnostics, quantitive matrix frames, and blockers for unlicensed pronominal generation.",
                andrewsRefs: Array.from(NNC_LESSON16_PDF_REFS),
                feedbackRefs: Array.from(NNC_LESSON16_VALIDATION_REFS),
            },
        ],
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
            confirmedNawatPronominalFixtures: false,
            absolutiveOnly: true,
            noTenseSlot: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: getNncLesson16RemainingGaps(),
        closestPass: false,
        generationAllowed: false,
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
                demonstrative: demonstrativeFrame.adjunctorSolidSpellingWarning,
            },
        },
        stemFrame: {
            nncKind: overviewFrame.nncKind,
            entitiveFrame,
            quantitiveFrame: {
                overview: quantitiveOverviewFrame,
                quich: quichFrame,
                quiChi: quiChiFrame,
            },
        },
        nuclearClauseFrame: {
            clauseKind: ORDINARY_NNC_CLAUSE_KIND,
            nncKind: "pronominal",
            stateRestriction: overviewFrame.stateRestriction,
            hasTensePosition: false,
        },
        participantFrame: {
            subject: {
                affixalSubjectRemainsBasic: true,
                relativePronounsPresent: false,
            },
        },
        inflectionFrame: {
            hasTensePosition: false,
            predicateState: "absolutive-only",
        },
        targetContract: {
            metadataKind: "lesson-16-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
        },
    });
}

function parseOrdinaryNncPersonSubKey(personSubKey = "") {
    const match = String(personSubKey || "").match(/^([123])(?:s|sg|p|pl)$/i);
    if (!match) {
        return { person: null, number: "" };
    }
    return {
        person: Number(match[1]),
        number: /p/i.test(personSubKey) ? "plural" : "singular",
    };
}

function resolveOrdinaryNncSubject(subject = null) {
    const source = subject && typeof subject === "object" ? subject : {};
    const requestedId = typeof subject === "string" ? subject : (source.id || source.personSubKey || "");
    const subjectPrefix = typeof source.subjectPrefix === "string"
        ? source.subjectPrefix
        : (typeof source.prefix === "string" ? source.prefix : "");
    const subjectSuffix = typeof source.subjectSuffix === "string"
        ? source.subjectSuffix
        : (typeof source.suffix === "string" ? source.suffix : "");
    const entries = getOrdinaryNncSubjectEntries();
    const entry = entries.find((candidate) => (
        (requestedId && (candidate.id === requestedId || candidate.personSubKey === requestedId))
        || (
            String(candidate.subjectPrefix || "") === subjectPrefix
            && String(candidate.subjectSuffix || "") === subjectSuffix
        )
    )) || entries.find((candidate) => (
        String(candidate.subjectPrefix || "") === ""
        && String(candidate.subjectSuffix || "") === ""
    ));
    const prefix = entry ? String(entry.subjectPrefix || "") : subjectPrefix;
    const suffix = entry ? String(entry.subjectSuffix || "") : subjectSuffix;
    const agreementInfo = typeof getPers1Pers2Info === "function"
        ? getPers1Pers2Info(prefix, suffix)
        : null;
    const parsed = parseOrdinaryNncPersonSubKey(entry?.personSubKey || "");
    return {
        subjectPrefix: prefix,
        subjectSuffix: suffix,
        person: agreementInfo?.person || parsed.person || 3,
        number: normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular"),
        personSubKey: entry?.personSubKey || (
            `${agreementInfo?.person || parsed.person || 3}${normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular") === "plural" ? "pl" : "sg"}`
        ),
    };
}

function hasExplicitOrdinaryNncSubject(subject = null) {
    if (typeof subject === "string") {
        return String(subject || "").trim() !== "";
    }
    if (!subject || typeof subject !== "object") {
        return false;
    }
    return ["id", "personSubKey", "subjectPrefix", "prefix", "subjectSuffix", "suffix"]
        .some((key) => Object.prototype.hasOwnProperty.call(subject, key));
}

function resolveOrdinaryNncClauseSubject(subject = null, number = "singular", animacy = "") {
    if (!hasExplicitOrdinaryNncSubject(subject) && animacy === "animate" && number === "plural") {
        return resolveOrdinaryNncSubject({ personSubKey: "3pl" });
    }
    return resolveOrdinaryNncSubject(subject);
}

function resolveOrdinaryNncPossessor(possessor = null, possessivePrefix = "") {
    const raw = possessor && typeof possessor === "object"
        ? (possessor.prefix || possessor.value || possessor.id || "")
        : (possessor || possessivePrefix || "");
    const normalized = String(raw || "").trim();
    if (!normalized || normalized === "none") {
        return null;
    }
    const entry = getOrdinaryNncPossessiveEntries().find((candidate) => (
        candidate.value === normalized
        || candidate.id === normalized
        || candidate.personSubKey === normalized
    ));
    if (!entry) {
        return {
            id: "",
            prefix: normalized,
            personSubKey: "",
            number: "",
            unsupported: true,
        };
    }
    return {
        id: entry.id || "",
        prefix: entry.value || "",
        personSubKey: entry.personSubKey || "",
        number: entry.number || "",
    };
}

function findOrdinaryNncFixture(stem = "") {
    const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
    return getOrdinaryNncFixtureEntries().find((fixture) => {
        const keys = [
            fixture.id,
            fixture.stem,
            fixture.lemma,
            ...(Array.isArray(fixture.aliases) ? fixture.aliases : []),
        ].map(normalizeOrdinaryNncText).filter(Boolean);
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
            actualStemShape: normalizedStem ? getOrdinaryNncStemShapeLabel(normalizedStem) : "",
        };
    }
    const vowelFinal = isOrdinaryNncVowelFinalStem(normalizedStem);
    const requiredStemShape = normalizedClass === "t"
        ? "vowel-final"
        : "consonant-final";
    const compatible = normalizedClass === "t"
        ? vowelFinal
        : !vowelFinal;
    return {
        compatible,
        nounClass: normalizedClass,
        stem: normalizedStem,
        requiredStemShape,
        actualStemShape: getOrdinaryNncStemShapeLabel(normalizedStem),
    };
}

function buildOrdinaryNncClassStemCompatibilityDiagnostic(compatibility = {}) {
    return buildOrdinaryNncDiagnostic(
        ORDINARY_NNC_DIAGNOSTIC_IDS.classStemIncompatible,
        `Nominal nuclear clause class "${compatibility.nounClass || ""}" requires a ${compatibility.requiredStemShape || "compatible"} stem; "${compatibility.stem || ""}" is ${compatibility.actualStemShape || "not compatible"}.`
    );
}

function buildOrdinaryNncOrganicPossessionStem(stem = "") {
    const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
    if (!normalizedStem) {
        return "";
    }
    return normalizedStem.endsWith("yu")
        ? normalizedStem
        : `${normalizedStem}yu`;
}

function buildOrdinaryNncOrganicPossessionFrame({
    sourceStem = "",
    organicStem = "",
    possessor = null,
} = {}) {
    const resolvedSourceStem = normalizeOrdinaryNncText(sourceStem).replace(/[()]/g, "");
    const resolvedOrganicStem = normalizeOrdinaryNncText(organicStem).replace(/[()]/g, "")
        || buildOrdinaryNncOrganicPossessionStem(resolvedSourceStem);
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
    };
}

function buildOrdinaryNncSurfaceChainText({
    subjectPrefix = "",
    possessivePrefix = "",
    core = "",
} = {}) {
    const result = buildOrdinaryNncSurfaceChainResult({
        subjectPrefix,
        possessivePrefix,
        core,
    });
    return String(result?.surface || "");
}

function collectOrdinaryNncSurfaceSoundSpellingFrames(...sources) {
    const frames = [];
    const pushFrame = (frame = null) => {
        if (!frame || typeof frame !== "object" || !frame.ruleId) {
            return;
        }
        const key = [
            frame.ruleId || "",
            frame.grammarSlot || "",
            frame.syllablePosition || "",
            frame.sourceSurface || "",
            frame.target || "",
            Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "",
            frame.segmentRole || "",
            frame.sourceSegmentValue || "",
            frame.targetSegmentValue || "",
        ].join(":");
        if (!key || frames.some((entry) => [
            entry.ruleId || "",
            entry.grammarSlot || "",
            entry.syllablePosition || "",
            entry.sourceSurface || "",
            entry.target || "",
            Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "",
            entry.segmentRole || "",
            entry.sourceSegmentValue || "",
            entry.targetSegmentValue || "",
        ].join(":") === key)) {
            return;
        }
        frames.push({ ...frame });
    };
    sources.forEach((source) => {
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
        const grammarFrame = (
            (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null)
            || (source.frames && typeof source.frames === "object" ? source.frames : null)
        );
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
    core = "",
} = {}) {
    const normalizedCore = String(core || "");
    if (!normalizedCore) {
        return { surface: "", surfaceForms: [], soundSpellingFrames: [] };
    }
    if (typeof buildOutputWordResult === "function") {
        const result = buildOutputWordResult({
            pers1: String(subjectPrefix || ""),
            poseedor: String(possessivePrefix || ""),
            obj1: "",
            tronco: normalizedCore,
        });
        const surface = String(result?.surface || result?.surfaceForms?.[0] || "");
        return {
            ...result,
            surface,
            surfaceForms: surface ? [surface] : [],
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result),
        };
    }
    if (typeof buildOutputPrefixedChain === "function") {
        const surface = buildOutputPrefixedChain({
            pers1: String(subjectPrefix || ""),
            poseedor: String(possessivePrefix || ""),
            obj1: "",
            tronco: normalizedCore,
        });
        return { surface, surfaceForms: surface ? [surface] : [], soundSpellingFrames: [] };
    }
    const surface = `${subjectPrefix || ""}${possessivePrefix || ""}${normalizedCore}`;
    return { surface, surfaceForms: surface ? [surface] : [], soundSpellingFrames: [] };
}

function isOrdinaryNncPluralPossessor(possessor = null) {
    const prefix = String(possessor?.prefix || possessor || "");
    return possessor?.number === "plural" || ["tu", "anmu", "in"].includes(prefix);
}

function buildOrdinaryNncOpenStemPossessiveSurface(stem = "", possessivePrefix = "", animacy = "") {
    return String(buildOrdinaryNncOpenStemPossessiveSurfaceCell(stem, possessivePrefix, animacy).surfaceForms?.[0] || "");
}

function buildOrdinaryNncOpenStemPossessiveSurfaceCell(stem = "", possessivePrefix = "", animacy = "") {
    const prefix = String(possessivePrefix || "");
    const resolvedPossessor = resolveOrdinaryNncPossessor(prefix);
    const isAnimate = normalizeOrdinaryNncAnimacy(animacy) === "animate";
    const usesPluralPossessorShape = isAnimate && isOrdinaryNncPluralPossessor(resolvedPossessor);
    const core = isAnimate && prefix === "in"
        ? buildOrdinaryNncReduplicatedSurface(stem)
        : stem;
    const result = buildOrdinaryNncSurfaceChainResult({
        possessivePrefix: prefix,
        core: `${core}${usesPluralPossessorShape ? "wan" : ""}`,
    });
    return {
        surfaceForms: result.surface ? [result.surface] : [],
        soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result),
    };
}

function buildOrdinaryNncOpenStemFixture(stem = "", {
    nounClass = "",
    animacy = "",
} = {}) {
    const normalizedClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
    const normalizedStem = stripOrdinaryNncNum1Num2FromInput(stem, normalizedClass);
    if (!normalizedStem) {
        return null;
    }
    const absolutiveSurface = `${normalizedStem}${getOrdinaryNncNum1Num2Surface(normalizedClass)}`;
    const singularPossessives = {};
    getOrdinaryNncPossessorInventory().forEach((prefix) => {
        singularPossessives[prefix] = buildOrdinaryNncOpenStemPossessiveSurfaceCell(normalizedStem, prefix, animacy);
    });
    const states = {
        [ORDINARY_NNC_STATE.absolutive]: {
            numberForms: {
                singular: {
                    surfaceForms: [absolutiveSurface || normalizedStem],
                },
            },
        },
    };
    if (Object.keys(singularPossessives).length) {
        states[ORDINARY_NNC_STATE.possessive] = {
            numberFormsByPossessor: {
                singular: singularPossessives,
            },
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
        states,
    };
}

function getOrdinaryNncSurfaceFormsFromCell(cell = null, {
    pluralType = "",
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

function getOrdinaryNncSoundSpellingFramesFromCell(cell = null, {
    pluralType = "",
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

function getOrdinaryNncFixtureStateForms(fixture = null, state = "", {
    number = "singular",
    possessor = null,
    pluralType = "",
} = {}) {
    const stateData = fixture?.states?.[state] || null;
    if (!stateData) {
        return [];
    }
    if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, { pluralType });
        if (formsByNumber.length) {
            return formsByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSurfaceFormsFromCell(byPossessor, { pluralType });
    }
    const byNumber = stateData.numberForms?.[number];
    const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, { pluralType });
    if (formsByNumber.length) {
        return formsByNumber;
    }
    return getOrdinaryNncSurfaceFormsFromCell(stateData, { pluralType });
}

function getOrdinaryNncFixtureStateSoundSpellingFrames(fixture = null, state = "", {
    number = "singular",
    possessor = null,
    pluralType = "",
} = {}) {
    const stateData = fixture?.states?.[state] || null;
    if (!stateData) {
        return [];
    }
    if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const framesByNumber = getOrdinaryNncSoundSpellingFramesFromCell(byNumber, { pluralType });
        if (framesByNumber.length) {
            return framesByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSoundSpellingFramesFromCell(byPossessor, { pluralType });
    }
    const byNumber = stateData.numberForms?.[number];
    const framesByNumber = getOrdinaryNncSoundSpellingFramesFromCell(byNumber, { pluralType });
    if (framesByNumber.length) {
        return framesByNumber;
    }
    return getOrdinaryNncSoundSpellingFramesFromCell(stateData, { pluralType });
}

function isOrdinaryNncThirdSingularSubject(subject = null) {
    return !subject
        || (
            String(subject.subjectPrefix || "") === ""
            && String(subject.subjectSuffix || "") === ""
        );
}

function buildOrdinaryNncReduplicatedSurface(surface = "") {
    const normalized = String(surface || "").trim();
    if (!normalized) {
        return "";
    }
    const syllables = typeof splitVerbSyllables === "function"
        ? splitVerbSyllables(normalized)
        : [];
    const first = syllables?.[0] || null;
    if (!first || !first.nucleus) {
        return normalized;
    }
    return `${first.onset || ""}${first.nucleus || ""}j${normalized}`;
}

function applyOrdinaryNncSubjectPrefix(surface = "", subject = null, state = ORDINARY_NNC_STATE.absolutive, animacy = "") {
    return applyOrdinaryNncSubjectPrefixResult(surface, subject, state, animacy).surface;
}

function applyOrdinaryNncSubjectPrefixResult(surface = "", subject = null, state = ORDINARY_NNC_STATE.absolutive, animacy = "") {
    if (animacy !== "animate") {
        return { surface, soundSpellingFrames: [] };
    }
    const result = buildOrdinaryNncSurfaceChainResult({
        subjectPrefix: subject?.subjectPrefix || "",
        core: surface,
    });
    return {
        surface: result.surface,
        soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result),
    };
}

function stripOrdinaryNncPossessiveSurfacePrefix(surface = "", possessor = null) {
    const normalizedSurface = String(surface || "").trim();
    const prefix = String(possessor?.prefix || "").trim();
    if (!normalizedSurface || !prefix) {
        return normalizedSurface;
    }
    const candidates = prefix === "in" ? ["inh", "in"] : [prefix];
    const matched = candidates
        .sort((a, b) => b.length - a.length)
        .find((candidate) => (
            normalizedSurface.startsWith(candidate)
            && normalizedSurface.length > candidate.length
        ));
    return matched ? normalizedSurface.slice(matched.length) : normalizedSurface;
}

function buildOrdinaryNncPossessiveDistributiveSurface(surface = "", possessor = null) {
    return buildOrdinaryNncPossessiveDistributiveSurfaceResult(surface, possessor).surface;
}

function buildOrdinaryNncPossessiveDistributiveSurfaceResult(surface = "", possessor = null) {
    const core = stripOrdinaryNncPossessiveSurfacePrefix(surface, possessor);
    const distributiveCore = buildOrdinaryNncReduplicatedSurface(core);
    const result = buildOrdinaryNncSurfaceChainResult({
        possessivePrefix: possessor?.prefix || "",
        core: distributiveCore,
    });
    if (result.surface) {
        return {
            surface: result.surface,
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(result),
        };
    }
    return {
        surface: buildOrdinaryNncReduplicatedSurface(surface),
        soundSpellingFrames: [],
    };
}

function buildOrdinaryNncAnimatePossessivePluralForms(singularForms = [], {
    possessor = null,
    pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
} = {}) {
    const effectivePluralType = normalizeOrdinaryNncPluralType(pluralType);
    if (String(possessor?.prefix || "") === "in") {
        return singularForms.filter(Boolean);
    }
    if (!isOrdinaryNncPluralPossessor(possessor)) {
        return singularForms.filter(Boolean);
    }
    if (effectivePluralType !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        return singularForms.filter(Boolean);
    }
    return singularForms
        .map((form) => buildOrdinaryNncPossessiveDistributiveSurface(form, possessor))
        .filter(Boolean);
}

function buildOrdinaryNncDerivedPluralForms(singularForms = [], {
    state = ORDINARY_NNC_STATE.absolutive,
    subject = null,
    possessor = null,
    animacy = "",
    pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
} = {}) {
    const effectivePluralType = getEffectiveOrdinaryNncPluralType(pluralType, animacy);
    if (state === ORDINARY_NNC_STATE.possessive && animacy === "animate") {
        const pluralResults = buildOrdinaryNncAnimatePossessivePluralForms(singularForms, {
            possessor,
            pluralType: effectivePluralType,
        }).map((form) => applyOrdinaryNncSubjectPrefixResult(form, subject, state, animacy));
        return {
            pluralType: effectivePluralType,
            forms: pluralResults.map((entry) => entry.surface).filter(Boolean),
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...pluralResults),
        };
    }
    if (effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count) {
        if (animacy !== "animate") {
            return { forms: [], pluralType: effectivePluralType };
        }
        const pluralResults = singularForms
            .map((form) => `${form}met`)
            .map((form) => applyOrdinaryNncSubjectPrefixResult(form, subject, state, animacy));
        return {
            pluralType: effectivePluralType,
            forms: pluralResults.map((entry) => entry.surface).filter(Boolean),
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...pluralResults),
        };
    }
    if (state !== ORDINARY_NNC_STATE.absolutive && state !== ORDINARY_NNC_STATE.possessive) {
        return { forms: [], pluralType: effectivePluralType };
    }
    const distributiveResults = singularForms
        .map((form) => (
            state === ORDINARY_NNC_STATE.possessive
                ? buildOrdinaryNncPossessiveDistributiveSurfaceResult(form, possessor)
                : { surface: buildOrdinaryNncReduplicatedSurface(form), soundSpellingFrames: [] }
        ))
        .map((entry) => ({
            ...entry,
            surface: animacy === "animate" ? `${entry.surface}met` : entry.surface,
        }))
        .map((entry) => {
            const subjectResult = applyOrdinaryNncSubjectPrefixResult(entry.surface, subject, state, animacy);
            return {
                surface: subjectResult.surface,
                soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(entry, subjectResult),
            };
        });
    return {
        pluralType: effectivePluralType,
        forms: distributiveResults.map((entry) => entry.surface).filter(Boolean),
        soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(...distributiveResults),
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

function parseOrdinaryNncPredicateFormulaInput(value = "") {
    const raw = String(value || "").trim().toLowerCase();
    const match = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
    if (!match) {
        return null;
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
        predicateFormula: buildOrdinaryNncPredicateFormula({ stem, nounClass }),
    };
}

function stripOrdinaryNncNum1Num2FromInput(stem = "", nounClass = "") {
    const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
    const connector = getOrdinaryNncNum1Num2Surface(nounClass);
    if (!normalizedStem || !connector || normalizedStem.length <= connector.length) {
        return normalizedStem;
    }
    return normalizedStem.endsWith(connector)
        ? normalizedStem.slice(0, -connector.length)
        : normalizedStem;
}

function buildOrdinaryNncPredicateFormula({
    stem = "",
    nounClass = "",
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
    pluralType = "",
} = {}) {
    const connectorClass = normalizeOrdinaryNncNum1Num2Class(nounClass);
    const surface = getOrdinaryNncNum1Num2Surface(connectorClass);
    return {
        role: "subject-number-connector",
        slot: "subject.num1-num2",
        belongsTo: "subject",
        nounStemClass: connectorClass,
        classLabel: formatOrdinaryNncNum1Num2Class(connectorClass),
        surface,
        displaySurface: surface || "Ø",
        predicateState: state,
        referenceNumber: number,
        pluralType: pluralType || "",
        notNounSuffix: true,
        notStatePosition: true,
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
    nounClass = "",
} = {}) {
    const connector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType,
    });
    return {
        pers1Pers2: {
            role: "subject-person",
            slot: "pers1-pers2",
            prefix: String(subject?.subjectPrefix || ""),
            suffix: String(subject?.subjectSuffix || ""),
            displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
            displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
            label: String(subject?.personSubKey || ""),
        },
        predicateStem: {
            role: "predicate",
            slot: "STEM",
            stem,
            state,
        },
        num1Num2: {
            role: "subject-number-connector",
            slot: "num1-num2",
            nounClass: connector.nounStemClass,
            connector: connector.displaySurface,
            surface: connector.surface,
            label: "subject number connector",
            belongsTo: connector.belongsTo,
            referenceNumber: connector.referenceNumber,
            pluralType: connector.pluralType,
        },
    };
}

function getOrdinaryNncFormulaSlotResultFrame(slot = null) {
    if (!slot || typeof slot !== "object") {
        return null;
    }
    const grammarFrame = slot.grammarFrame && typeof slot.grammarFrame === "object"
        ? slot.grammarFrame
        : (slot.frames && typeof slot.frames === "object" ? slot.frames : null);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
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
    return forms.flatMap((entry) => splitVerbDerivedNominalSurfaceText(entry))[0] || "";
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

function buildOrdinaryNncFormulaEchoFromSlots(formulaSlots = null) {
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
    const connector = resolveOrdinaryNncFormulaSlotText(numberConnector, ["connector", "surface"]) || "Ø";
    return `#${prefix}...${suffix}(${stem})${connector}#`;
}

function buildOrdinaryNncPredicateStateFrame({
    state = ORDINARY_NNC_STATE.absolutive,
    possessor = null,
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
        notTense: true,
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
    markingAvailable = false,
} = {}) {
    const normalizedState = normalizeOrdinaryNncState(state, possessor);
    const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
    const normalizedNumber = normalizeOrdinaryNncNumber(number);
    const effectivePluralType = normalizedNumber === "plural"
        ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, normalizedAnimacy)
        : "";
    const isPossessive = normalizedState === ORDINARY_NNC_STATE.possessive;
    const isKnownState = normalizedState === ORDINARY_NNC_STATE.absolutive
        || normalizedState === ORDINARY_NNC_STATE.possessive;
    const connectorSlot = formulaSlots?.num1Num2?.slot || "num1-num2";
    return {
        predicateState: {
            value: normalizedState,
            label: getOrdinaryNncPredicateStateCategoryLabel(normalizedState),
            slot: "predicate.state",
            isSupportedState: isKnownState,
        },
        possessiveState: {
            isPossessive,
            possessorPrefix: isPossessive ? String(possessor?.prefix || "") : "",
            markingRequested: Boolean(markingRequested || isPossessive),
            markingAvailable: Boolean(isPossessive && markingAvailable),
        },
        animacy: {
            value: normalizedAnimacy,
            label: getOrdinaryNncAnimacyCategoryLabel(normalizedAnimacy),
            affectsSubjectAgreement: true,
            affectsReferencePlural: normalizedNumber === "plural",
        },
        reference: {
            number: normalizedNumber,
            pluralType: effectivePluralType,
            label: normalizedNumber,
            connectorSlot,
        },
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
    markingAvailable = false,
} = {}) {
    const numberConnector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType,
    });
    const predicateState = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor,
    });
    const isAnimate = animacy === "animate";
    const isPlural = number === "plural";
    const effectivePluralType = isPlural
        ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, animacy)
        : "";
    const referenceLabel = !isPlural
        ? "referencia comun"
        : (effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "plural -met" : "distributivo");
    const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject,
        nounClass,
    });
    const categoryProfile = buildOrdinaryNncCategoryProfile({
        state,
        number,
        pluralType,
        possessor,
        animacy,
        formulaSlots,
        markingRequested,
        markingAvailable,
    });
    return {
        version: 1,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        curriculumRef: {
            source: "Andrews",
            range: "12-19",
            role: "curriculum-index",
        },
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
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
            nonanimateThirdOnly: !isAnimate,
        },
        predicate: {
            role: "predicate",
            stem,
            formula: predicateFormula || buildOrdinaryNncPredicateFormula({ stem, nounClass }),
            state,
            stateLabel: state === ORDINARY_NNC_STATE.possessive ? "predicado posesivo" : "predicado absolutivo",
            stateSlot: predicateState,
            nounClass,
            animacy,
        },
        possessor: state === ORDINARY_NNC_STATE.possessive ? (possessor || null) : null,
        reference: {
            number,
            pluralType: effectivePluralType,
            label: referenceLabel,
            countSuffix: isPlural && isAnimate && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "met" : "",
            animateCountSuffix: isAnimate ? "met" : "",
            distributiveReduplication: isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive,
            nonanimatePluralIsDistributive: !isAnimate && isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive,
        },
        futureSyntaxLayer: [
            "pronominal-nnc",
            "supplementation",
            "included-referent-clause",
        ],
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
    animacy = "",
} = {}) {
    const numberConnector = buildOrdinaryNncNum1Num2({
        nounClass,
        state,
        number,
        pluralType,
    });
    const subjectFrame = subject && typeof subject === "object"
        ? { ...subject, numberConnector }
        : subject;
    const stateSlot = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor,
    });
    const predicateFormula = buildOrdinaryNncPredicateFormula({ stem, nounClass });
    const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject: subjectFrame,
        nounClass,
    });
    return {
        kind: ORDINARY_NNC_CLAUSE_KIND,
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
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
            animacy,
        },
        stateSlot,
        possessor: state === ORDINARY_NNC_STATE.possessive ? possessor : null,
        referenceNumber: number,
        surfaceStrategy: pluralType || "plain",
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
    markingAvailable = false,
} = {}) {
    const clauseFrame = buildOrdinaryNncClauseFrame({
        stem,
        state,
        nounClass,
        animacy,
        number,
        pluralType,
        subject,
        possessor,
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
        markingAvailable,
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
        diagnostics: diagnostic ? [diagnostic] : [],
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
} = {}) {
    const analogueInput = parseOrdinaryNncPredicateFormulaInput(stem);
    const requestedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || analogueInput?.nounClass || "");
    const normalizedStem = analogueInput?.stem || normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
    let resolvedSubject = resolveOrdinaryNncSubject(subject);
    const resolvedPossessor = resolveOrdinaryNncPossessor(possessor, possessivePrefix);
    const normalizedState = normalizeOrdinaryNncState(state, resolvedPossessor);
    const normalizedNumber = normalizeOrdinaryNncNumber(number);
    const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
    const normalizedPossessionKind = normalizeOrdinaryNncPossessionKind(
        possessionKind || stateCase || possessionType
    );
    if (normalizedPossessionKind === ORDINARY_NNC_POSSESSION_KIND.organic) {
        const organicStem = buildOrdinaryNncOrganicPossessionStem(normalizedStem);
        const organicNounClass = requestedNounClass || "t";
        const organicAnimacy = normalizeOrdinaryNncAnimacy(animacy);
        resolvedSubject = resolveOrdinaryNncClauseSubject(subject, normalizedNumber, organicAnimacy);
        const organicFrame = buildOrdinaryNncOrganicPossessionFrame({
            sourceStem: normalizedStem,
            organicStem,
            possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
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
                    diagnostic: buildOrdinaryNncDiagnostic(
                        ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessiveState,
                        "Organic possession NNCs require possessive predicate state; absolutive output would name a characteristic property instead."
                    ),
                }),
                possessionKind: normalizedPossessionKind,
                organicPossessionFrame: organicFrame,
                source: {
                    fixtureId: "",
                    sourceRefs: ["Andrews 39.3.4"],
                    sourceKind: "open-stem",
                    sourceStem: normalizedStem,
                },
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
                    diagnostic: buildOrdinaryNncDiagnostic(
                        ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessor,
                        "Organic possession NNCs require a possessor prefix because the whole is expressed in possessive state."
                    ),
                }),
                possessionKind: normalizedPossessionKind,
                organicPossessionFrame: organicFrame,
                source: {
                    fixtureId: "",
                    sourceRefs: ["Andrews 39.3.4"],
                    sourceKind: "open-stem",
                    sourceStem: normalizedStem,
                },
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
                    diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility),
                }),
                possessionKind: normalizedPossessionKind,
                organicPossessionFrame: organicFrame,
                source: {
                    fixtureId: "",
                    sourceRefs: ["Andrews 39.3.4"],
                    sourceKind: "open-stem",
                    sourceStem: normalizedStem,
                },
            };
        }
        const singularSurfaceResult = buildOrdinaryNncSurfaceChainResult({
            possessivePrefix: resolvedPossessor.prefix,
            core: organicStem,
        });
        const singularSurface = singularSurfaceResult.surface;
        const derivedPlural = normalizedNumber === "plural"
            ? buildOrdinaryNncDerivedPluralForms([singularSurface], {
                state: ORDINARY_NNC_STATE.possessive,
                subject: resolvedSubject,
                possessor: resolvedPossessor,
                animacy: organicAnimacy,
                pluralType: normalizedPluralType,
            })
            : null;
        const resolvedSurfaceForms = normalizedNumber === "plural"
            ? (derivedPlural?.forms || [])
            : [singularSurface].filter(Boolean);
        const effectivePluralType = normalizedNumber === "plural"
            ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, organicAnimacy)
            : "";
        const clauseFrame = buildOrdinaryNncClauseFrame({
            stem: organicStem,
            state: ORDINARY_NNC_STATE.possessive,
            nounClass: organicNounClass,
            animacy: organicAnimacy,
            number: normalizedNumber,
            pluralType: effectivePluralType,
            subject: resolvedSubject,
            possessor: resolvedPossessor,
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
            markingAvailable: true,
        });
        return {
            outputKind: ORDINARY_NNC_CLAUSE_KIND,
            clauseKind: ORDINARY_NNC_CLAUSE_KIND,
            supported: resolvedSurfaceForms.length > 0,
            result: resolvedSurfaceForms.join(" / "),
            surfaceForms: resolvedSurfaceForms,
            stem: organicStem,
            sourceStem: normalizedStem,
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
            organicPossessionFrame: organicFrame,
            soundSpellingFrames: collectOrdinaryNncSurfaceSoundSpellingFrames(singularSurfaceResult, derivedPlural?.soundSpellingFrames),
            diagnostics: [],
            source: {
                fixtureId: "",
                sourceRefs: ["Andrews 39.3.4"],
                sourceKind: "open-stem",
                sourceStem: normalizedStem,
            },
        };
    }
    const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy,
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
            diagnostic: buildOrdinaryNncDiagnostic(
                ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedStem,
                `No nominal nuclear clause fixture is configured for stem "${normalizedStem}".`
            ),
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
            diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility),
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
            diagnostic: buildOrdinaryNncDiagnostic(
                ORDINARY_NNC_DIAGNOSTIC_IDS.nounClassMismatch,
                `Nominal nuclear clause fixture "${fixture.id || normalizedStem}" is class "${fixtureClass}", not "${requestedNounClass}".`
            ),
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
            diagnostic: buildOrdinaryNncDiagnostic(
                ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessor,
                `No nominal nuclear clause possessive fixture is configured for possessor "${possessor || possessivePrefix || ""}".`
            ),
        });
    }
    const effectivePluralType = normalizedNumber === "plural"
        ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, fixtureAnimacy)
        : "";
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
            diagnostic: buildOrdinaryNncDiagnostic(
                ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedSubject,
                `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate and only supports 3rd singular subject agreement.`
            ),
        });
    }
    const surfaceForms = getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType,
    });
    const sourceSoundSpellingFrames = getOrdinaryNncFixtureStateSoundSpellingFrames(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType,
    });
    const singularForms = normalizedNumber === "plural"
        ? getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
            number: "singular",
            possessor: resolvedPossessor,
        })
        : [];
    const derivedPlural = normalizedNumber === "plural" && !surfaceForms.length
        ? buildOrdinaryNncDerivedPluralForms(singularForms, {
            state: normalizedState,
            subject: resolvedSubject,
            possessor: resolvedPossessor,
            animacy: fixtureAnimacy,
            pluralType: normalizedPluralType,
        })
        : null;
    const subjectAppliedSurfaceResults = surfaceForms.length
        ? surfaceForms.map((form) => applyOrdinaryNncSubjectPrefixResult(form, resolvedSubject, normalizedState, fixtureAnimacy))
        : [];
    const resolvedSurfaceForms = surfaceForms.length
        ? subjectAppliedSurfaceResults.map((entry) => entry.surface).filter(Boolean)
        : (derivedPlural?.forms || []);
    const resolvedSoundSpellingFrames = collectOrdinaryNncSurfaceSoundSpellingFrames(
        sourceSoundSpellingFrames,
        ...subjectAppliedSurfaceResults,
        derivedPlural?.soundSpellingFrames
    );
    if (!resolvedSurfaceForms.length) {
        const stateData = fixture.states?.[normalizedState] || null;
        const missingPossessiveState = normalizedState === ORDINARY_NNC_STATE.possessive && !stateData;
        const diagnosticId = missingPossessiveState
            ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessiveState
            : (stateData
                ? (normalizedNumber === "plural" && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count && fixtureAnimacy !== "animate"
                    ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType
                    : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedNumber)
                : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedState);
        const diagnosticMessage = missingPossessiveState
            ? `No nominal nuclear clause possessive forms are configured for stem "${fixture.stem || normalizedStem}".`
            : (diagnosticId === ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType
                ? `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate; plural count -met is only configured for animate nouns.`
                : `No nominal nuclear clause ${normalizedState} ${normalizedNumber} form is configured for stem "${fixture.stem || normalizedStem}".`);
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
            diagnostic: buildOrdinaryNncDiagnostic(
                diagnosticId,
                diagnosticMessage
            ),
            markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive && !missingPossessiveState && singularForms.length > 0,
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
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
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
        markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive,
    });
    return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: true,
        result: resolvedSurfaceForms.join(" / "),
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
        soundSpellingFrames: resolvedSoundSpellingFrames,
        diagnostics: [],
        source: isOpenStemFixture ? {
            fixtureId: "",
            sourceRefs: [],
            sourceKind: "open-stem",
        } : {
            fixtureId: fixture.id || "",
            sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
            sourceKind: "fixture",
        },
    };
}

function normalizeOrdinaryNncRequestedList(values = null, normalizer = (value) => value) {
    const source = Array.isArray(values)
        ? values
        : (values === null || typeof values === "undefined" ? [] : [values]);
    const seen = new Set();
    const normalizedValues = [];
    source.forEach((value) => {
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
    return Object.keys(fixture?.states || {})
        .map((state) => normalizeOrdinaryNncState(state))
        .filter(Boolean);
}

function getOrdinaryNncFixtureNumbersForState(fixture = null, state = "") {
    const stateData = fixture?.states?.[state] || null;
    if (!stateData) {
        return [];
    }
    if (state === ORDINARY_NNC_STATE.possessive) {
        const numbers = Object.keys(stateData.numberFormsByPossessor || {});
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (
            fixture?.animacy === "animate"
            && normalizedNumbers.includes("singular")
            && !normalizedNumbers.includes("plural")
        ) {
            normalizedNumbers.push("plural");
        }
        return normalizedNumbers;
    }
    const numbers = Object.keys(stateData.numberForms || {});
    if (numbers.length) {
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (
            normalizedNumbers.includes("singular")
            && state === ORDINARY_NNC_STATE.absolutive
            && !normalizedNumbers.includes("plural")
        ) {
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
    return fixture?.animacy === "animate"
        ? [ORDINARY_NNC_PLURAL_TYPE.count, ORDINARY_NNC_PLURAL_TYPE.distributive]
        : [ORDINARY_NNC_PLURAL_TYPE.distributive];
}

function getOrdinaryNncPossessorInventory() {
    return getOrdinaryNncPossessiveEntries()
        .map((entry) => String(entry.value || ""))
        .filter(Boolean);
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
    possessor = null,
} = {}) {
    if (!diagnostic) {
        return null;
    }
    const entry = {
        ...diagnostic,
        state,
        number,
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
    source = null,
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
        source,
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
    animacy = "",
} = {}) {
    const analogueInput = parseOrdinaryNncPredicateFormulaInput(stem);
    const requestedNounClass = normalizeOrdinaryNncNum1Num2Class(nounClass || analogueInput?.nounClass || "");
    const normalizedStem = analogueInput?.stem || normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
    const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy,
    });
    const requestedStates = normalizeOrdinaryNncRequestedList(states, (value) => normalizeOrdinaryNncState(value));
    const requestedNumbers = normalizeOrdinaryNncRequestedList(numbers, normalizeOrdinaryNncNumber);
    const requestedPluralTypes = normalizeOrdinaryNncRequestedList(pluralTypes, normalizeOrdinaryNncPluralType);
    const requestedPossessors = normalizeOrdinaryNncRequestedList(possessors, normalizeOrdinaryNncRequestedPossessor);
    if (!fixture) {
        const state = requestedStates[0] || ORDINARY_NNC_STATE.absolutive;
        const number = requestedNumbers[0] || "singular";
        const pluralType = number === "plural" ? (requestedPluralTypes[0] || ORDINARY_NNC_PLURAL_TYPE.auto) : "";
        const possessor = state === ORDINARY_NNC_STATE.possessive ? (requestedPossessors[0] || null) : null;
        const directResult = generateOrdinaryNncParadigm({
            stem: normalizedStem,
            state,
            number,
            pluralType,
            subject,
            possessor,
            nounClass: requestedNounClass,
            animacy,
        });
        return buildOrdinaryNncParadigmSetResult({
            supported: false,
            stem: normalizedStem,
            entries: [],
            diagnostics: (directResult.diagnostics || []).map((diagnostic) => (
                buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, pluralType: directResult.pluralType || pluralType, possessor })
            )).filter(Boolean),
            source: null,
        });
    }
    const isOpenStemFixture = fixture.openStem === true;
    const fixtureClass = String(fixture.nounClass || "");
    const setStates = requestedStates.length ? requestedStates : getOrdinaryNncFixtureStates(fixture);
    const entries = [];
    const diagnostics = [];
    setStates.forEach((state) => {
        const stateNumbers = requestedNumbers.length
            ? requestedNumbers
            : getOrdinaryNncFixtureNumbersForState(fixture, state);
        const effectiveNumbers = stateNumbers.length ? stateNumbers : ["singular"];
        effectiveNumbers.forEach((number) => {
            const statePluralTypes = number === "plural"
                ? (requestedPluralTypes.length ? requestedPluralTypes : getOrdinaryNncDefaultPluralTypesForFixture(fixture, state))
                : [""];
            statePluralTypes.forEach((pluralType) => {
            if (state === ORDINARY_NNC_STATE.possessive) {
                const fixturePossessors = getOrdinaryNncFixturePossessorsForStateNumber(fixture, state, number);
                const statePossessors = requestedPossessors.length
                    ? requestedPossessors
                    : (fixturePossessors.length ? fixturePossessors : getOrdinaryNncPossessorInventory());
                statePossessors.forEach((possessor) => {
                    const directResult = generateOrdinaryNncParadigm({
                        stem: fixture.stem || normalizedStem,
                        state,
                        number,
                        pluralType,
                        subject,
                        possessor,
                        nounClass: requestedNounClass,
                        animacy,
                    });
                    if (directResult.supported) {
                        entries.push(directResult);
                        return;
                    }
                    (directResult.diagnostics || []).forEach((diagnostic) => {
                        diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, pluralType: directResult.pluralType || pluralType, possessor }));
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
                animacy,
            });
            if (directResult.supported) {
                entries.push(directResult);
                return;
            }
            (directResult.diagnostics || []).forEach((diagnostic) => {
                diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, pluralType: directResult.pluralType || pluralType, possessor: null }));
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
            sourceKind: "open-stem",
        } : {
            fixtureId: fixture.id || "",
            sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
        },
    });
}

function generateOrdinaryNncClause(request = {}) {
    return generateOrdinaryNncParadigm(request);
}

function generateOrdinaryNncClauseSet(request = {}) {
    return generateOrdinaryNncParadigmSet(request);
}

function resolveOrdinaryNncFixture(request = {}) {
    const source = request && typeof request === "object" ? request : { stem: request };
    const rawInput = source.stem ?? source.input ?? source.rawStem ?? source.rawInput ?? source.value ?? "";
    const analogueInput = parseOrdinaryNncPredicateFormulaInput(rawInput);
    const normalizedInput = analogueInput?.stem || normalizeOrdinaryNncText(rawInput).replace(/[()]/g, "");
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
        nounClass: source.nounClass || "",
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
            sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
        },
        paradigmSet,
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
}) {
    const commonNumberSuffix = "";
    const context = buildVerbDerivedNominalBuilderContext({
        kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
    });
    if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: "instrumentivo-context-blocked",
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
        thirdObjectMarker: resolvedThirdObjectMarker,
    } = context;
    if (mode === INSTRUMENTIVO_MODE.absolutivo) {
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            const morphologyObjectPrefix = stemContext.morphologyObjectPrefix === "mu"
                ? "ne"
                : stemContext.morphologyObjectPrefix;
            const nonactiveSourceChain = buildNonactiveSourceChain(
                verbMeta,
                stemContext.verb,
                stemContext.analysisVerb,
            );
            const baseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
            const nonactiveRuleBase = getNounNonactiveRuleBase(baseVerb, verbMeta);
            let options = getVisibleNonactiveDerivationOptions(baseVerb, baseVerb, {
                isTransitive: derivationIsTransitive,
                isYawi: derivedIsYawi,
                ruleBase: nonactiveRuleBase,
                rootPlusYaBase: verbMeta.rootPlusYaBase,
            });
            const selectedNonactiveSuffix = shouldForceAllNonactiveOptions() ? null : getSelectedNonactiveSuffix();
            if (selectedNonactiveSuffix && options.some((option) => option.suffix === selectedNonactiveSuffix)) {
                options = options.filter((option) => option.suffix === selectedNonactiveSuffix);
            }
            options.forEach((option) => {
                const rawOptionStemSpec = option?.stemSpec || buildLiteralMorphStemSpec(
                    realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
                );
                const stemSpec = applyNonactiveSourceChainStemSpec(
                    rawOptionStemSpec,
                    option?.stem || "",
                    nonactiveSourceChain,
                    { sourceSuffix: option?.suffix || "" },
                );
                const stem = realizeMorphStemSpec(stemSpec, "");
                const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix)
                    ? stem.slice(directionalPrefix.length)
                    : realizeMorphStemSpec(rawOptionStemSpec, option?.stem || "");
                const applied = applyMorphologyRules({
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
                    ...buildMorphologyMetaOptions(verbMeta),
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                });
                if (!applied || !applied.verb) {
                    return;
                }
                const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                    sourceModel: nounSourceModel,
                    runtimeObjectPrefix: morphologyObjectPrefix,
                    objectPrefix: applied.objectPrefix,
                    verb: applied.verb,
                    surfaceRuleMeta: applied.surfaceRuleMeta || null,
                });
                const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemSpec);
                const core = buildOutputPrefixedChain({
                    pers1: applied.subjectPrefix,
                    obj1: nominalSurface.objectPrefix,
                    tronco: nominalSurface.verb,
                    hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                    optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                });
                const coreStemSpec = buildStructuredPrefixedStemSpec({
                    stemSpec: placedStemSpec,
                    verb: nominalSurface.verb,
                    subjectPrefix: applied.subjectPrefix,
                    objectPrefix: nominalSurface.objectPrefix,
                    output: core,
                    hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                    optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                }) || buildLiteralMorphStemSpec(core);
                const sourceTenseSuffix = String(applied.subjectSuffix || "");
                const predicateStem = ["ni", "ya"].includes(sourceTenseSuffix)
                    ? `${core}${sourceTenseSuffix}`
                    : core;
                const predicateStemSpec = ["ni", "ya"].includes(sourceTenseSuffix)
                    ? buildAppendMorphStemSpec(core, sourceTenseSuffix, { sourceStemSpec: coreStemSpec })
                    : coreStemSpec;
                entries.push(buildVerbDerivedNominalEntry({
                    kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                    sourceModel: nounSourceModel,
                    verb: predicateStem,
                    subjectSuffix: "",
                    stemSpec: predicateStemSpec,
                    sourceTense: "presente-habitual",
                    provenance: {
                        nonactiveSuffix: option?.suffix || "",
                        forward: stemContext.derivationProvenance || null,
                    },
                    metadata: {
                        runtimeObjectPrefix: morphologyObjectPrefix,
                    },
                }));
            });
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        });
        if (!hasVerbDerivedNominalSurface(result)) {
            return buildVerbDerivedNominalBlockedResult({
                kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                rawVerb,
                diagnosticId: "instrumentivo-no-output",
            });
        }
        return attachVerbDerivedNominalGrammarContract(result, {
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
        });
    }

    const explicitPossessivePrefix = typeof possessivePrefix === "string"
        ? possessivePrefix
        : "";
    const sourceSubjectPossessivePrefix = resolveInstrumentivoPossessorPrefixFromSourceSubject(
        subjectPrefix,
        subjectSuffix
    );
    const resolvedPossessivePrefix = explicitPossessivePrefix
        || (mode === INSTRUMENTIVO_MODE.posesivo ? sourceSubjectPossessivePrefix : "");
    const entries = [];
    forwardStemContexts.forEach((stemContext) => {
        const morphologyObjectPrefix = stemContext.morphologyObjectPrefix === "mu"
            ? "ne"
            : stemContext.morphologyObjectPrefix;
        const applied = applyMorphologyRules({
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
            ...buildMorphologyMetaOptions(verbMeta),
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        });
        if (!applied || !applied.verb) {
            return;
        }
        const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
            sourceModel: nounSourceModel,
            runtimeObjectPrefix: morphologyObjectPrefix,
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
            surfaceRuleMeta: applied.surfaceRuleMeta || null,
        });
        const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemContext.stemSpec);
        const sourceTenseSuffix = String(applied.subjectSuffix || "");
        const predicateStem = ["ni", "ya"].includes(sourceTenseSuffix)
            ? `${nominalSurface.verb}${sourceTenseSuffix}`
            : nominalSurface.verb;
        const predicateStemSpec = ["ni", "ya"].includes(sourceTenseSuffix)
            ? buildAppendMorphStemSpec(nominalSurface.verb, sourceTenseSuffix, { sourceStemSpec: placedStemSpec })
            : placedStemSpec;
        entries.push(buildVerbDerivedNominalEntry({
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            sourceModel: nounSourceModel,
            verb: predicateStem,
            subjectSuffix: "",
            stemSpec: predicateStemSpec,
            surfaceObjectPrefix: nominalSurface.objectPrefix,
            runtimeObjectPrefix: morphologyObjectPrefix,
            surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
            sourceTense: "imperfecto",
            provenance: {
                forward: stemContext.derivationProvenance || null,
            },
        }));
    });
    const result = buildVerbDerivedNominalResult(entries, {
        kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
    });
    if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            diagnosticId: "instrumentivo-no-output",
        });
    }
    return attachVerbDerivedNominalGrammarContract({
        ...result,
        instrumentivoSourceSubjectPossessor: mode === INSTRUMENTIVO_MODE.posesivo ? {
            grammarSource: "Andrews 36.6",
            sourceSubjectPrefix: subjectPrefix || "",
            sourceSubjectSuffix: subjectSuffix || "",
            possessivePrefix: resolvedPossessivePrefix,
            explicitPossessivePrefix,
            derivedFromSourceSubject: !explicitPossessivePrefix && Boolean(resolvedPossessivePrefix),
        } : null,
    }, {
        kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        rawVerb,
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
}) {
    const resolvedActionNounStemUse = String(actionNounStemUse || "");
    const context = buildVerbDerivedNominalBuilderContext({
        kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        actionNounStemUse: resolvedActionNounStemUse,
        combinedMode,
        requireNonanimateSubject: resolvedActionNounStemUse !== "general-use",
    });
    if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-context-blocked",
        });
    }
    const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
    } = context;
    const explicitPossessivePrefix = typeof possessivePrefix === "string"
        ? possessivePrefix
        : "";
    const useGeneralActionStem = resolvedActionNounStemUse === "general-use";
    const sourceSubjectPossessivePrefix = useGeneralActionStem
        ? resolveNawatPossessorPrefixFromSourceSubject(subjectPrefix, subjectSuffix)
        : "";
    const resolvedPossessivePrefix = explicitPossessivePrefix || sourceSubjectPossessivePrefix;
    if (useGeneralActionStem && !resolvedPossessivePrefix) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-possessor-unmapped",
        });
    }
    const isActiveGeneralActionStem = useGeneralActionStem
        && String(combinedMode || "") !== COMBINED_MODE.nonactive;
    const isActiveActionSource = String(combinedMode || "") !== COMBINED_MODE.nonactive;
    const activeActionRootPlusYaBase = isActiveActionSource
        ? normalizeRuleBase(verbMeta?.rootPlusYaBasePronounceable || verbMeta?.rootPlusYaBase || "")
        : "";
    const sourceHasActiveObjectSlot = Boolean(
        getBaseObjectSlots(verbMeta) > 0
        || verbMeta?.isMarkedTransitive
        || verbMeta?.isTaFusion
    );
    const sourceHasReflexiveObject = resolvedObjectPrefix === "mu";
    if (isActiveGeneralActionStem && sourceHasActiveObjectSlot && !sourceHasReflexiveObject) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-transitive-source-blocked",
        });
    }
    const shouldCollapseMarkerEcho = Boolean(
        getForwardDerivationConfig(getNounDerivationTypeFromMeta(verbMeta))
        && (resolvedIndirectObjectMarker || resolvedThirdObjectMarker)
    );
    const calificativoMatrixBase = normalizeRuleBase(
        verbMeta?.exactBaseVerb
        || verbMeta?.sourceBase
        || verbMeta?.canonical?.sourceBase
        || nounSourceModel?.matrixBase
        || ""
    );
    const pasadoRemotoIsTransitive = Boolean(
        getBaseObjectSlots(verbMeta) > 0
        || verbMeta?.isMarkedTransitive
        || verbMeta?.isTaFusion
    );
    const entries = [];
    forwardStemContexts.forEach((stemContext) => {
        const activeActionMorphologyObjectPrefix = (
            isActiveGeneralActionStem
            && stemContext.morphologyObjectPrefix === "mu"
        ) ? "ne" : stemContext.morphologyObjectPrefix;
        let pasadoRemotoStemEntries = buildPasadoRemotoStemEntries({
            verb: stemContext.verb || "",
            analysisVerb: stemContext.analysisVerb || stemContext.verb || "",
            rawAnalysisVerb: stemContext.analysisVerb || stemContext.verb || "",
            sourceRawVerb: rawVerb,
            isTransitive: pasadoRemotoIsTransitive,
            directionalPrefix,
            boundPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(verbMeta?.boundPrefixes) ? verbMeta.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(verbMeta?.boundExplicitFlags) ? verbMeta.boundExplicitFlags : [],
            directionalPrefixFromSlash: verbMeta?.directionalPrefixFromSlash || "",
            sourceSplitPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
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
            hasNonspecificValence: resolveHasNonspecificValence(verbMeta),
            exactBaseVerb: calificativoMatrixBase,
            suppletiveStemSet: getSuppletiveStemSet(verbMeta),
            rootPlusYaBase: verbMeta?.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: verbMeta?.rootPlusYaBasePronounceable || "",
            matrixBaseOverride: calificativoMatrixBase,
        });
        if (activeActionRootPlusYaBase) {
            const obsoleteRootEntries = pasadoRemotoStemEntries.filter((entry) => (
                normalizeRuleBase(entry?.verb || "") === activeActionRootPlusYaBase
            ));
            if (obsoleteRootEntries.length) {
                pasadoRemotoStemEntries = obsoleteRootEntries;
            }
        }
        if (!pasadoRemotoStemEntries.length) {
            return;
        }
        const composedObjectPrefix = composeObj1Chain({
            obj1: activeActionMorphologyObjectPrefix,
            markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
            pers1: "",
        });
        pasadoRemotoStemEntries.forEach((pasadoRemotoEntry) => {
            const predicateStemSpec = buildCalificativoInstrumentivoPredicateStemSpec(
                pasadoRemotoEntry.stemSpec || null,
                pasadoRemotoEntry.verb || "",
            );
            const predicateStem = realizeMorphStemSpec(
                predicateStemSpec,
                `${pasadoRemotoEntry.verb || ""}ka`,
            );
            if (!predicateStem || predicateStem === "—") {
                return;
            }
            const baseForms = [predicateStem]
                .map((form) => collapseCalificativoMarkerEcho({
                    form,
                    morphologyObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                    enable: shouldCollapseMarkerEcho,
                }));
            if (!baseForms.length) {
                return;
            }
            baseForms.forEach((form) => {
                const baseStemSpec = (
                    form === predicateStem
                    && predicateStemSpec
                    && typeof predicateStemSpec === "object"
                    && predicateStemSpec.kind
                )
                    ? predicateStemSpec
                    : buildLiteralMorphStemSpec(form);
                const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                    sourceModel: nounSourceModel,
                    runtimeObjectPrefix: composedObjectPrefix || activeActionMorphologyObjectPrefix,
                    objectPrefix: composedObjectPrefix || "",
                    verb: form,
                    surfaceRuleMeta: null,
                });
                const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, form, baseStemSpec);
                const objectChainForm = buildOutputPrefixedChain({
                    obj1: nominalSurface.objectPrefix,
                    tronco: nominalSurface.verb,
                    hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                    optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                });
                const objectChainStemSpec = buildStructuredPrefixedStemSpec({
                    stemSpec: placedStemSpec,
                    verb: nominalSurface.verb,
                    subjectPrefix: "",
                    objectPrefix: nominalSurface.objectPrefix,
                    output: objectChainForm,
                    hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                    optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                }) || buildLiteralMorphStemSpec(objectChainForm);
                entries.push(buildVerbDerivedNominalEntry({
                    kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
                    sourceModel: nounSourceModel,
                    verb: objectChainForm,
                    subjectSuffix: "",
                    stemSpec: objectChainStemSpec,
                    trailingSuffix: useGeneralActionStem
                        ? ""
                        : (resolvedPossessivePrefix === "" ? "yut" : "yu"),
                    sourceTense: "pasado-remoto",
                    provenance: {
                        pasadoRemotoEntry,
                        forward: stemContext.derivationProvenance || null,
                    },
                }));
            });
        });
    });
    const result = buildVerbDerivedNominalResult(entries, {
        kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
    });
    if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            diagnosticId: "calificativo-instrumentivo-no-output",
        });
    }
    return attachVerbDerivedNominalGrammarContract({
        ...result,
        actionNounSourceSubjectPossessor: useGeneralActionStem ? {
            grammarSource: isActiveActionSource ? "Andrews 36.11" : "Andrews 36.10",
            sourceSubjectPrefix: subjectPrefix || "",
            sourceSubjectSuffix: subjectSuffix || "",
            possessivePrefix: resolvedPossessivePrefix,
            explicitPossessivePrefix,
            derivedFromSourceSubject: !explicitPossessivePrefix && Boolean(resolvedPossessivePrefix),
        } : null,
    }, {
        kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        rawVerb,
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
}) {
    const resolvedMode = combinedMode || getCombinedMode();
    const isNonactive = resolvedMode === COMBINED_MODE.nonactive;
    const context = buildVerbDerivedNominalBuilderContext({
        kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        rawVerb,
        verbMeta,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode: resolvedMode,
    });
    if (context.error) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            rawVerb,
            diagnosticId: "locativo-temporal-context-blocked",
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
        thirdObjectMarker: resolvedThirdObjectMarker,
    } = context;
    const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
    const isImpersonal = isNonactive && !possessorInput;
    const entries = [];
    forwardStemContexts.forEach((stemContext) => {
        let nonactiveStemSpecs = [stemContext.stemSpec || buildLiteralMorphStemSpec(stemContext.verb)];
        if (isNonactive) {
            const nonactiveSourceChain = buildNonactiveSourceChain(
                verbMeta,
                stemContext.verb,
                stemContext.analysisVerb,
            );
            const nonactiveBaseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
            const nonactiveRuleBase = getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
            const selection = resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
                isTransitive: derivationIsTransitive,
                isYawi: derivedIsYawi,
                forceAll: shouldForceAllNonactiveOptions(),
                ruleBase: nonactiveRuleBase,
                rootPlusYaBase: verbMeta.rootPlusYaBase,
            });
            const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs)
                ? selection.selectedStemSpecs.filter(Boolean)
                : [];
            const rawStemSpecs = (!selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1)
                ? selection.allStemSpecs
                : ((selection.selectedSuffix && selectedStemSpecList.length > 1)
                    ? selectedStemSpecList
                    : [selection.selectedStemSpec || buildLiteralMorphStemSpec(selection.selectedStem)]);
            nonactiveStemSpecs = rawStemSpecs
                .map((spec, index) => applyNonactiveSourceChainStemSpec(
                    spec,
                    Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "",
                    nonactiveSourceChain,
                    { sourceSuffix: selection.selectedSuffix || "" },
                ))
                .filter(Boolean);
        }
        const nonactiveStemEntries = (nonactiveStemSpecs || [])
            .map((spec) => ({
                stemSpec: spec,
                stem: realizeMorphStemSpec(spec, ""),
            }))
            .filter((entry) => Boolean(entry.stem));
        if (!nonactiveStemEntries.length) {
            return;
        }
        let sourceObjectPrefix = resolvedObjectPrefix;
        if (isNonactive) {
            const passive = applyPassiveImpersonal({
                pers1: "",
                pers2: "",
                obj1: resolvedObjectPrefix,
                analysisVerb: stripDirectionalPrefixFromStem(nonactiveStemEntries[0].stem, directionalPrefix),
            });
            sourceObjectPrefix = passive.obj1;
        }
        const locativeObjectPrefix = sourceObjectPrefix === resolvedObjectPrefix
            ? stemContext.morphologyObjectPrefix
            : sourceObjectPrefix;
        nonactiveStemEntries.forEach(({ stemSpec, stem }) => {
            const stemAnalysisLocal = stripDirectionalPrefixFromStem(stem, directionalPrefix);
            const applied = applyMorphologyRules({
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
                ...buildMorphologyMetaOptions(verbMeta),
                indirectObjectMarker: resolvedIndirectObjectMarker,
                thirdObjectMarker: resolvedThirdObjectMarker,
            });
            if (!applied || !applied.verb) {
                return;
            }
            const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                sourceModel: nounSourceModel,
                runtimeObjectPrefix: locativeObjectPrefix,
                objectPrefix: applied.objectPrefix,
                verb: applied.verb,
                surfaceRuleMeta: applied.surfaceRuleMeta || null,
            });
            const placedStemSpec = resolvePlacedNominalStemSpec(
                nominalSurface,
                applied.verb,
                isNonactive ? stemSpec : null
            );
            entries.push(buildVerbDerivedNominalEntry({
                kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
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
                    forward: stemContext.derivationProvenance || null,
                },
            }));
        });
    });
    const result = buildVerbDerivedNominalResult(entries, {
        kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        possessivePrefix: possessorInput,
    });
    if (!hasVerbDerivedNominalSurface(result)) {
        return buildVerbDerivedNominalBlockedResult({
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            rawVerb,
            diagnosticId: "locativo-temporal-no-output",
        });
    }
    return attachVerbDerivedNominalGrammarContract({
        ...result,
        possessorPrefix: possessorInput,
        isImpersonal,
    }, {
        kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        rawVerb,
    });
}
