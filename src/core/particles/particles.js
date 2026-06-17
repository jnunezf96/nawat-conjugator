// core/particles/particles.js
// Lesson 3 particle and placement metadata. This layer records structural
// questions that a particle engine must answer, but it does not supply Nawat
// particle forms or generate surfaces.

"use strict";

const PARTICLE_METADATA_VERSION = 1;

const PARTICLE_PLACEMENT_SCOPE = Object.freeze({
    clauseInitial: "clause-initial",
    secondPosition: "second-position",
    prePredicate: "pre-predicate",
    postPredicate: "post-predicate",
    enclitic: "enclitic",
    boundToFollowing: "bound-to-following",
    boundToPrevious: "bound-to-previous",
    collocationSequence: "collocation-sequence",
    independentUtterance: "independent-utterance",
    floating: "floating",
    unknown: "unknown",
});

const PARTICLE_FUNCTION_SCOPE = Object.freeze({
    clauseIntroducer: "clause-introducer",
    adjunctor: "adjunctor",
    conjunctor: "conjunctor",
    adverbialModifier: "adverbial-modifier",
    interjection: "interjection",
    negation: "negation",
    question: "question",
    emphasis: "emphasis",
    discourse: "discourse",
    topic: "topic",
    collocation: "collocation",
    honorificized: "honorificized",
    unknown: "unknown",
});

const PARTICLE_FUNCTION_CLASS_FRAME = Object.freeze([
    Object.freeze({
        id: "clause-introducer",
        label: "introductor de cláusula",
        scope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer,
        hostLayer: "sentence",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "adjunctor",
        label: "adjuntor",
        scope: PARTICLE_FUNCTION_SCOPE.adjunctor,
        hostLayer: "adjoined-clause",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "conjunctor",
        label: "conjuntor de cláusula/oración",
        scope: PARTICLE_FUNCTION_SCOPE.conjunctor,
        hostLayer: "clause-or-sentence",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "adverbial-modifier",
        label: "modificador adverbial",
        scope: PARTICLE_FUNCTION_SCOPE.adverbialModifier,
        hostLayer: "sentence",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "interjection",
        label: "interjección",
        scope: PARTICLE_FUNCTION_SCOPE.interjection,
        hostLayer: "utterance",
        canServeAsPrincipalClause: true,
    }),
    Object.freeze({
        id: "negation",
        label: "partícula negativizante",
        scope: PARTICLE_FUNCTION_SCOPE.negation,
        hostLayer: "particle-or-clause",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "collocation",
        label: "colocación de partículas",
        scope: PARTICLE_FUNCTION_SCOPE.collocation,
        hostLayer: "particle-sequence",
        canServeAsPrincipalClause: false,
    }),
    Object.freeze({
        id: "honorificized",
        label: "partícula honorificada",
        scope: PARTICLE_FUNCTION_SCOPE.honorificized,
        hostLayer: "particle-or-collocation",
        canServeAsPrincipalClause: false,
    }),
]);

const PARTICLE_PLACEMENT_FRAME = Object.freeze([
    Object.freeze({
        id: "clause-initial",
        label: "inicio de cláusula",
        scope: PARTICLE_PLACEMENT_SCOPE.clauseInitial,
        hostLayer: "sentence",
        beforePredicate: true,
        afterPredicate: false,
    }),
    Object.freeze({
        id: "second-position",
        label: "segunda posición",
        scope: PARTICLE_PLACEMENT_SCOPE.secondPosition,
        hostLayer: "sentence",
        beforePredicate: null,
        afterPredicate: null,
    }),
    Object.freeze({
        id: "pre-predicate",
        label: "antes del predicado",
        scope: PARTICLE_PLACEMENT_SCOPE.prePredicate,
        hostLayer: "nuclear-clause",
        beforePredicate: true,
        afterPredicate: false,
    }),
    Object.freeze({
        id: "post-predicate",
        label: "después del predicado",
        scope: PARTICLE_PLACEMENT_SCOPE.postPredicate,
        hostLayer: "nuclear-clause",
        beforePredicate: false,
        afterPredicate: true,
    }),
    Object.freeze({
        id: "enclitic",
        label: "enclítica",
        scope: PARTICLE_PLACEMENT_SCOPE.enclitic,
        hostLayer: "word-output",
        beforePredicate: false,
        afterPredicate: true,
    }),
    Object.freeze({
        id: "bound-to-following",
        label: "ligada al elemento siguiente",
        scope: PARTICLE_PLACEMENT_SCOPE.boundToFollowing,
        hostLayer: "particle-or-nuclear-clause",
        beforePredicate: true,
        afterPredicate: false,
    }),
    Object.freeze({
        id: "bound-to-previous",
        label: "ligada al elemento anterior",
        scope: PARTICLE_PLACEMENT_SCOPE.boundToPrevious,
        hostLayer: "nominal-nuclear-clause",
        beforePredicate: false,
        afterPredicate: true,
    }),
    Object.freeze({
        id: "collocation-sequence",
        label: "secuencia de colocación",
        scope: PARTICLE_PLACEMENT_SCOPE.collocationSequence,
        hostLayer: "particle-sequence",
        beforePredicate: null,
        afterPredicate: null,
    }),
    Object.freeze({
        id: "independent-utterance",
        label: "enunciado independiente",
        scope: PARTICLE_PLACEMENT_SCOPE.independentUtterance,
        hostLayer: "utterance",
        beforePredicate: null,
        afterPredicate: null,
    }),
    Object.freeze({
        id: "floating",
        label: "posición libre o no especificada",
        scope: PARTICLE_PLACEMENT_SCOPE.floating,
        hostLayer: "sentence-or-utterance",
        beforePredicate: null,
        afterPredicate: null,
    }),
]);

const PARTICLE_ANTI_CONFLATION_RULES = Object.freeze([
    "particle placement metadata is not particle generation",
    "particle-looking string is not confirmed Nawat/Pipil particle evidence",
    "particle mode label is not a particle inventory",
    "preposed output segment is not a Lesson 3 particle engine",
    "topic/focus label is not supplementation",
    "Andrews particle categories are architecture, not Nawat/Pipil form authority",
]);

const PARTICLE_LESSON3_INVENTORY_GROUPS = Object.freeze([
    Object.freeze({
        id: "lesson3-functional-classes",
        label: "3.2 Clases funcionales",
        sectionPrefix: "3.2",
        sectionLabel: "3.2",
        description: "introductores, adjuntores, conjuntores, modificadores adverbiales e interjecciones",
    }),
    Object.freeze({
        id: "lesson3-negation",
        label: "3.3 Negación",
        sectionPrefix: "3.3",
        sectionLabel: "3.3",
        description: "partículas negativizantes y combinaciones negativas",
    }),
    Object.freeze({
        id: "lesson3-collocations",
        label: "3.4 Colocaciones",
        sectionPrefix: "3.4",
        sectionLabel: "3.4",
        description: "secuencias de partículas tratadas como colocaciones",
    }),
    Object.freeze({
        id: "lesson3-honorificized",
        label: "3.5 Honorificadas",
        sectionPrefix: "3.5",
        sectionLabel: "3.5",
        description: "partículas y colocaciones honorificadas",
    }),
]);

const PARTICLE_LESSON3_SEED_SOURCE_ENTRIES = Object.freeze([
    Object.freeze({ id: "l3-ca", sourceForm: "ca", functionScope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "en verdad; de hecho", section: "3.2.1", priority: 10 }),
    Object.freeze({ id: "l3-cuix", sourceForm: "cuix?", aliases: ["cuix"], functionScope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "¿acaso?; ¿quizá?", section: "3.2.1", priority: 11 }),
    Object.freeze({ id: "l3-tla", sourceForm: "tla", functionScope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "si; con tal que", section: "3.2.1", priority: 12 }),
    Object.freeze({ id: "l3-ma", sourceForm: "ma", functionScope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "ojalá; si tan solo", section: "3.2.1", priority: 13 }),
    Object.freeze({ id: "l3-o-behold", sourceForm: "o", functionScope: PARTICLE_FUNCTION_SCOPE.clauseIntroducer, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "mira; he aquí", section: "3.2.1", priority: 14 }),

    Object.freeze({ id: "l3-in", sourceForm: "in", functionScope: PARTICLE_FUNCTION_SCOPE.adjunctor, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "introductor de unidad adjunta", section: "3.2.2", priority: 20 }),
    Object.freeze({ id: "l3-anca", sourceForm: "anca", functionScope: PARTICLE_FUNCTION_SCOPE.adjunctor, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "por tanto; en consecuencia", section: "3.2.2", priority: 21 }),
    Object.freeze({ id: "l3-mah", sourceForm: "mah", functionScope: PARTICLE_FUNCTION_SCOPE.adjunctor, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "como si; de tal modo que", section: "3.2.2", priority: 22 }),
    Object.freeze({ id: "l3-auh-conjunctor", sourceForm: "auh", functionScope: PARTICLE_FUNCTION_SCOPE.conjunctor, placementScope: PARTICLE_PLACEMENT_SCOPE.clauseInitial, gloss: "y; pero", section: "3.2.3", priority: 30 }),

    Object.freeze({ id: "l3-mec", sourceForm: "mec", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "entonces", section: "3.2.4", priority: 40 }),
    Object.freeze({ id: "l3-nee", sourceForm: "nee", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "entonces", section: "3.2.4", priority: 41 }),
    Object.freeze({ id: "l3-tel", sourceForm: "tel", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "sin embargo", section: "3.2.4", priority: 42 }),
    Object.freeze({ id: "l3-oc", sourceForm: "oc", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "todavía; aún", section: "3.2.4", priority: 43 }),
    Object.freeze({ id: "l3-zan", sourceForm: "zan", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "solo; apenas", section: "3.2.4", priority: 44 }),
    Object.freeze({ id: "l3-za", sourceForm: "za", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "solo; apenas ahora", section: "3.2.4", priority: 45 }),
    Object.freeze({ id: "l3-ye", sourceForm: "ye", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ya; pronto", section: "3.2.4", priority: 46 }),
    Object.freeze({ id: "l3-o-antecessive", sourceForm: "o#", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.boundToFollowing, gloss: "partícula de orden antecesivo", section: "3.2.4", priority: 47 }),
    Object.freeze({ id: "l3-no-adverbial", sourceForm: "no", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "también", section: "3.2.4", priority: 48 }),
    Object.freeze({ id: "l3-zo", sourceForm: "zo", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "seguramente", section: "3.2.4", priority: 49 }),
    Object.freeze({ id: "l3-quin", sourceForm: "quin", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ahora mismo; pronto", section: "3.2.4", priority: 50 }),
    Object.freeze({ id: "l3-ach", sourceForm: "ach", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "posiblemente", section: "3.2.4", priority: 51 }),
    Object.freeze({ id: "l3-at", sourceForm: "at", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "quizá; tal vez", section: "3.2.4", priority: 52 }),
    Object.freeze({ id: "l3-ac", sourceForm: "ac", functionScope: PARTICLE_FUNCTION_SCOPE.adverbialModifier, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "variante de quizá; tal vez", section: "3.2.4", priority: 53 }),

    Object.freeze({ id: "l3-e-vocative", sourceForm: "#e", aliases: ["e"], functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.boundToPrevious, gloss: "vocativo", section: "3.2.5", priority: 60 }),
    Object.freeze({ id: "l3-a", sourceForm: "a", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 61 }),
    Object.freeze({ id: "l3-ax", sourceForm: "ax", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay; au", section: "3.2.5", priority: 62 }),
    Object.freeze({ id: "l3-hue", sourceForm: "hue", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 63 }),
    Object.freeze({ id: "l3-hueya", sourceForm: "hueya", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 64 }),
    Object.freeze({ id: "l3-yahua", sourceForm: "yahua", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 65 }),
    Object.freeze({ id: "l3-ihyo", sourceForm: "ihyo", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay de mí; ay", section: "3.2.5", priority: 66 }),
    Object.freeze({ id: "l3-hui", sourceForm: "hui", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "vaya", section: "3.2.5", priority: 67 }),
    Object.freeze({ id: "l3-elele", sourceForm: "elele", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 68 }),
    Object.freeze({ id: "l3-ahcua", sourceForm: "ahcua", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "ay", section: "3.2.5", priority: 69 }),
    Object.freeze({ id: "l3-xi", sourceForm: "xi", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "pst", section: "3.2.5", priority: 70 }),
    Object.freeze({ id: "l3-xiuh", sourceForm: "xiuh", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "fuera", section: "3.2.5", priority: 71 }),
    Object.freeze({ id: "l3-iye", sourceForm: "iye", functionScope: PARTICLE_FUNCTION_SCOPE.interjection, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "sí", section: "3.2.5", priority: 72 }),

    Object.freeze({ id: "l3-ah-negative", sourceForm: "ah#", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.boundToFollowing, gloss: "no", section: "3.3", priority: 80 }),
    Object.freeze({ id: "l3-ca-negative", sourceForm: "ca#", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.boundToFollowing, gloss: "no después de ma/tla/mah", section: "3.3", priority: 81 }),
    Object.freeze({ id: "l3-ahzo", sourceForm: "ahzo", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.independentUtterance, gloss: "quizá", section: "3.3", priority: 82 }),
    Object.freeze({ id: "l3-ma-cazo", sourceForm: "ma cazo", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá quizá", section: "3.3", priority: 83 }),
    Object.freeze({ id: "l3-ahtel", sourceForm: "ahtel?", aliases: ["ahtel"], functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "¿no está claro?", section: "3.3", priority: 84 }),
    Object.freeze({ id: "l3-aya", sourceForm: "aya", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "todavía no", section: "3.3", priority: 85 }),
    Object.freeze({ id: "l3-ma-caye", sourceForm: "ma caye", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá todavía no", section: "3.3", priority: 86 }),
    Object.freeze({ id: "l3-ma-caya", sourceForm: "ma caya", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá todavía no", section: "3.3", priority: 87 }),
    Object.freeze({ id: "l3-ahoc", sourceForm: "ahoc", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ya no", section: "3.3", priority: 88 }),
    Object.freeze({ id: "l3-ayoc", sourceForm: "ayoc", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ya no", section: "3.3", priority: 89 }),
    Object.freeze({ id: "l3-aoc", sourceForm: "aoc", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ya no", section: "3.3", priority: 90 }),
    Object.freeze({ id: "l3-ma-caoc", sourceForm: "ma caoc", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá ya no", section: "3.3", priority: 91 }),
    Object.freeze({ id: "l3-ahno", sourceForm: "ahno", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "ni; tampoco", section: "3.3", priority: 92 }),
    Object.freeze({ id: "l3-ma-cano", sourceForm: "ma cano", functionScope: PARTICLE_FUNCTION_SCOPE.negation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá tampoco", section: "3.3", priority: 93 }),

    Object.freeze({ id: "l3-in-tla", sourceForm: "in tla", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "si", section: "3.4", priority: 100 }),
    Object.freeze({ id: "l3-in-tla-ca", sourceForm: "in tla ca#", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "si no", section: "3.4", priority: 101 }),
    Object.freeze({ id: "l3-in-tla-zan", sourceForm: "in tla zan", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y si; ojalá", section: "3.4", priority: 102 }),
    Object.freeze({ id: "l3-in-tla-za", sourceForm: "in tla za", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y si; pero si", section: "3.4", priority: 103 }),
    Object.freeze({ id: "l3-in-aya", sourceForm: "in aya", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "antes", section: "3.4", priority: 104 }),
    Object.freeze({ id: "l3-in-tla-no-zo", sourceForm: "in tla no zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y si quizá", section: "3.4", priority: 105 }),
    Object.freeze({ id: "l3-no-zo", sourceForm: "no zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "o bien", section: "3.4", priority: 106 }),
    Object.freeze({ id: "l3-ahno-zo", sourceForm: "ahno zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ni; tampoco", section: "3.4", priority: 107 }),
    Object.freeze({ id: "l3-ma-cano-zo", sourceForm: "ma cano zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "ojalá tampoco", section: "3.4", priority: 108 }),
    Object.freeze({ id: "l3-no-zan", sourceForm: "no zan", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "todavía; hasta ahora", section: "3.4", priority: 109 }),
    Object.freeze({ id: "l3-za-zo", sourceForm: "za zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "-quiera; no importa", section: "3.4", priority: 110 }),
    Object.freeze({ id: "l3-ahza-zo", sourceForm: "ahza zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá; tal vez", section: "3.4", priority: 111 }),
    Object.freeze({ id: "l3-ahza-zo-oc", sourceForm: "ahza zo oc", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá todavía; quizá otro", section: "3.4", priority: 112 }),
    Object.freeze({ id: "l3-ma-za-zo", sourceForm: "ma za zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "sea como sea", section: "3.4", priority: 113 }),
    Object.freeze({ id: "l3-za-zan", sourceForm: "za zan", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "de cualquier modo; tontamente; sin sentido", section: "3.4", priority: 114 }),
    Object.freeze({ id: "l3-zan-no", sourceForm: "zan no", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "asimismo", section: "3.4", priority: 115 }),
    Object.freeze({ id: "l3-zan-ye-no", sourceForm: "zan ye no", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "asimismo", section: "3.4", priority: 116 }),
    Object.freeze({ id: "l3-ahzo-za", sourceForm: "ahzo za", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá; tal vez", section: "3.4", priority: 117 }),
    Object.freeze({ id: "l3-ahzo-zan", sourceForm: "ahzo zan", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá; tal vez", section: "3.4", priority: 118 }),
    Object.freeze({ id: "l3-ahzo-ah", sourceForm: "ahzo ah#", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá no", section: "3.4", priority: 119 }),
    Object.freeze({ id: "l3-ahzo-ma", sourceForm: "ahzo ma", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "¿quizá?", section: "3.4", priority: 120 }),
    Object.freeze({ id: "l3-oc-no", sourceForm: "oc no", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y además", section: "3.4", priority: 121 }),
    Object.freeze({ id: "l3-za-oc-no", sourceForm: "za oc no", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "aún más; además", section: "3.4", priority: 122 }),
    Object.freeze({ id: "l3-auh-in-tla", sourceForm: "auh in tla", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y si", section: "3.4", priority: 123 }),
    Object.freeze({ id: "l3-auh-in-tla-ca", sourceForm: "auh in tla ca#", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "y si no", section: "3.4", priority: 124 }),
    Object.freeze({ id: "l3-ma-tel", sourceForm: "ma tel", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "que sea sin embargo", section: "3.4", priority: 125 }),
    Object.freeze({ id: "l3-ma-zo", sourceForm: "ma zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "aunque; aun si", section: "3.4", priority: 126 }),
    Object.freeze({ id: "l3-ma-zo-tel", sourceForm: "ma zo tel", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "suponiendo que", section: "3.4", priority: 127 }),
    Object.freeze({ id: "l3-ihyo-ma", sourceForm: "ihyo ma ... !", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "¡ojalá!", section: "3.4", priority: 128 }),
    Object.freeze({ id: "l3-ihyo-iyahua", sourceForm: "ihyo iyahua!", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "¡ay de mí!; ¡qué desgracia!", section: "3.4", priority: 129 }),
    Object.freeze({ id: "l3-ahca-zo", sourceForm: "ahca zo", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá; tal vez", section: "3.4", priority: 130 }),
    Object.freeze({ id: "l3-ahzo-ca", sourceForm: "ahzo ca", functionScope: PARTICLE_FUNCTION_SCOPE.collocation, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "quizá; tal vez", section: "3.4", priority: 131 }),

    Object.freeze({ id: "l3-otzin", sourceForm: "otzin", functionScope: PARTICLE_FUNCTION_SCOPE.honorificized, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "mira; he aquí", section: "3.5", priority: 130 }),
    Object.freeze({ id: "l3-auhtzin", sourceForm: "auhtzin", functionScope: PARTICLE_FUNCTION_SCOPE.honorificized, placementScope: PARTICLE_PLACEMENT_SCOPE.floating, gloss: "bien, bien", section: "3.5", priority: 131 }),
    Object.freeze({ id: "l3-ca-no-zotzin", sourceForm: "ca no zotzin", functionScope: PARTICLE_FUNCTION_SCOPE.honorificized, placementScope: PARTICLE_PLACEMENT_SCOPE.collocationSequence, gloss: "así es", section: "3.5", priority: 132 }),
]);

const PARTICLE_INVENTORY_PREVIEW_LIMIT = PARTICLE_LESSON3_SEED_SOURCE_ENTRIES.length;

function attachParticleGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "particle-metadata",
        routeFamily: "particle-placement",
        structuralSource: "Andrews Lesson 3",
        andrewsRefs: ["Andrews Lesson 3"],
        ...options,
    });
}

function cloneParticlePlacementFrame(frame = {}) {
    return { ...frame };
}

function cloneParticleFunctionClassFrame(frame = {}) {
    return { ...frame };
}

function getParticleAntiConflationRules() {
    return Array.from(PARTICLE_ANTI_CONFLATION_RULES);
}

function getParticlePlacementFrames() {
    return PARTICLE_PLACEMENT_FRAME.map(cloneParticlePlacementFrame);
}

function getParticleFunctionClassFrames() {
    return PARTICLE_FUNCTION_CLASS_FRAME.map(cloneParticleFunctionClassFrame);
}

function normalizeParticlePlacementScope(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return Object.values(PARTICLE_PLACEMENT_SCOPE).includes(normalized)
        ? normalized
        : PARTICLE_PLACEMENT_SCOPE.unknown;
}

function normalizeParticleFunctionScope(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        introducer: PARTICLE_FUNCTION_SCOPE.clauseIntroducer,
        "clause-introducers": PARTICLE_FUNCTION_SCOPE.clauseIntroducer,
        adjunction: PARTICLE_FUNCTION_SCOPE.adjunctor,
        "adjoined-clause-introducer": PARTICLE_FUNCTION_SCOPE.adjunctor,
        conjunction: PARTICLE_FUNCTION_SCOPE.conjunctor,
        conjunctions: PARTICLE_FUNCTION_SCOPE.conjunctor,
        "clause-conjunctor": PARTICLE_FUNCTION_SCOPE.conjunctor,
        "sentence-conjunctor": PARTICLE_FUNCTION_SCOPE.conjunctor,
        adverbial: PARTICLE_FUNCTION_SCOPE.adverbialModifier,
        modifier: PARTICLE_FUNCTION_SCOPE.adverbialModifier,
        "adverbial-modifiers": PARTICLE_FUNCTION_SCOPE.adverbialModifier,
        interjections: PARTICLE_FUNCTION_SCOPE.interjection,
        negative: PARTICLE_FUNCTION_SCOPE.negation,
        negativizing: PARTICLE_FUNCTION_SCOPE.negation,
        "negative-particle": PARTICLE_FUNCTION_SCOPE.negation,
        collocations: PARTICLE_FUNCTION_SCOPE.collocation,
        honorific: PARTICLE_FUNCTION_SCOPE.honorificized,
        honorificized: PARTICLE_FUNCTION_SCOPE.honorificized,
        honorificised: PARTICLE_FUNCTION_SCOPE.honorificized,
    };
    if (aliases[normalized]) {
        return aliases[normalized];
    }
    return Object.values(PARTICLE_FUNCTION_SCOPE).includes(normalized)
        ? normalized
        : PARTICLE_FUNCTION_SCOPE.unknown;
}

function getParticlePlacementFrame(scope = "") {
    const normalizedScope = normalizeParticlePlacementScope(scope);
    const frame = PARTICLE_PLACEMENT_FRAME.find((entry) => entry.scope === normalizedScope);
    return frame ? cloneParticlePlacementFrame(frame) : null;
}

function getParticleFunctionClassFrame(scope = "") {
    const normalizedScope = normalizeParticleFunctionScope(scope);
    const frame = PARTICLE_FUNCTION_CLASS_FRAME.find((entry) => entry.scope === normalizedScope);
    return frame ? cloneParticleFunctionClassFrame(frame) : null;
}

function normalizeParticleInventoryLookupValue(value = "") {
    return String(value == null ? "" : value)
        .trim()
        .toLowerCase()
        .replace(/[¡!]/g, "")
        .replace(/\u2026/g, "...")
        .replace(/\s+/g, " ");
}

function getAndrewsLesson3ParticleAsNawat(value = "") {
    const source = String(value == null ? "" : value).trim();
    if (!source) {
        return "";
    }
    const converter = typeof getClassicalLettersAsNawat === "function"
        ? getClassicalLettersAsNawat
        : (typeof globalThis !== "undefined" && typeof globalThis.getClassicalLettersAsNawat === "function"
            ? globalThis.getClassicalLettersAsNawat
            : null);
    if (typeof converter === "function") {
        return converter(source, {
            contract: "andrews-lesson-3-particle-orthography-adaptation",
            grammarSlot: "particle",
        });
    }
    return source;
}

function cloneParticleSeedInventoryEntry(entry = {}) {
    const cloned = {
        ...entry,
        aliases: Array.isArray(entry.aliases) ? Array.from(entry.aliases) : [],
        lookupKeys: Array.isArray(entry.lookupKeys) ? Array.from(entry.lookupKeys) : [],
        diagnostics: Array.isArray(entry.diagnostics) ? Array.from(entry.diagnostics) : [],
        orthography: entry.orthography && typeof entry.orthography === "object"
            ? { ...entry.orthography }
            : null,
    };
    return attachParticleSeedInventoryEntryGrammarContract(cloned);
}

function attachParticleSeedInventoryEntryGrammarContract(entry = {}) {
    const displayForm = String(entry.displayForm || entry.nawatForm || entry.sourceForm || "").trim();
    const diagnostics = Array.isArray(entry.diagnostics) && entry.diagnostics.length
        ? entry.diagnostics
        : [
            "particle-seed-inventory-entry",
            "particle-orthography-adapted",
            "particle-generation-disabled",
        ];
    return attachParticleGrammarContract({
        ...entry,
        diagnostics,
    }, {
        metadataKind: "particle-seed-inventory-entry",
        routeStage: "inventory-preview",
        sourceInput: entry.sourceForm || displayForm,
        surface: displayForm,
        surfaceForms: displayForm ? [displayForm] : [],
        supported: false,
        evidenceStatus: "andrews-orthography-adapted",
        diagnostics,
        orthographyFrame: entry.orthography || null,
        nuclearClauseFrame: {
            clauseKind: "not-a-nuclear-clause",
            particleMode: true,
            placementScope: entry.placement?.scope || "",
            functionScope: entry.functionScope || "",
        },
        targetContract: {
            metadataKind: "particle-seed-inventory-entry",
            generationAllowed: false,
            hasConfirmedNawatInventory: false,
            isConfirmedNawat: entry.isConfirmedNawat === true,
            sourceForm: entry.sourceForm || "",
            nawatForm: entry.nawatForm || "",
        },
        morphBoundaryFrame: {
            seedEntryId: entry.id || "",
            sourceForm: entry.sourceForm || "",
            nawatForm: entry.nawatForm || "",
            placement: entry.placement || null,
            functionClass: entry.functionClass || null,
            section: entry.section || "",
        },
    });
}

function buildParticleSeedInventoryEntry(sourceEntry = {}) {
    const sourceForm = String(sourceEntry.sourceForm || "").trim();
    const nawatForm = getAndrewsLesson3ParticleAsNawat(sourceForm);
    const aliases = [
        sourceForm,
        nawatForm,
        ...(Array.isArray(sourceEntry.aliases) ? sourceEntry.aliases : []),
        ...(Array.isArray(sourceEntry.aliases) ? sourceEntry.aliases.map(getAndrewsLesson3ParticleAsNawat) : []),
    ]
        .map((entry) => String(entry || "").trim())
        .filter(Boolean)
        .filter((entry, index, list) => list.indexOf(entry) === index);
    const lookupKeys = aliases
        .flatMap((entry) => {
            const normalized = normalizeParticleInventoryLookupValue(entry);
            const noQuestion = normalized.replace(/\?/g, "");
            return [normalized, noQuestion];
        })
        .filter(Boolean)
        .filter((entry, index, list) => list.indexOf(entry) === index);
    const entry = {
        kind: "particle-seed-inventory-entry",
        version: PARTICLE_METADATA_VERSION,
        id: sourceEntry.id || `l3-${sourceForm.replace(/\W+/g, "-")}`,
        sourceForm,
        nawatForm,
        displayForm: nawatForm || sourceForm,
        aliases,
        lookupKeys,
        functionScope: normalizeParticleFunctionScope(sourceEntry.functionScope),
        functionClass: getParticleFunctionClassFrame(sourceEntry.functionScope),
        placement: getParticlePlacementFrame(sourceEntry.placementScope) || getParticlePlacementFrame(PARTICLE_PLACEMENT_SCOPE.floating),
        gloss: String(sourceEntry.gloss || "").trim(),
        section: String(sourceEntry.section || "3").trim(),
        priority: Number(sourceEntry.priority || 999),
        evidenceStatus: "andrews-orthography-adapted",
        sourceAuthority: "Andrews Lesson 3",
        targetAuthority: "Modern Nawat/Pipil orthography",
        isConfirmedNawat: false,
        generationAllowed: false,
        diagnostics: [
            "particle-seed-inventory-entry",
            "particle-orthography-adapted",
            "particle-generation-disabled",
        ],
        orthography: {
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "nawat-modern",
            sourceSurface: sourceForm,
            surface: nawatForm,
            orthographyConversionAllowed: true,
            noClassicalSurfaceImport: true,
        },
    };
    return attachParticleSeedInventoryEntryGrammarContract(entry);
}

function getParticleSeedInventoryEntries({
    limit = 0,
    functionScope = "",
} = {}) {
    const normalizedFunctionScope = functionScope ? normalizeParticleFunctionScope(functionScope) : "";
    const entries = PARTICLE_LESSON3_SEED_SOURCE_ENTRIES
        .map(buildParticleSeedInventoryEntry)
        .filter((entry) => !normalizedFunctionScope || entry.functionScope === normalizedFunctionScope)
        .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
    const numericLimit = Number(limit || 0);
    return (numericLimit > 0 ? entries.slice(0, numericLimit) : entries).map(cloneParticleSeedInventoryEntry);
}

function cloneParticleInventoryGroup(group = {}) {
    return {
        id: group.id || "",
        label: group.label || "",
        sectionPrefix: group.sectionPrefix || "",
        sectionLabel: group.sectionLabel || group.sectionPrefix || "",
        description: group.description || "",
        entryCount: Number(group.entryCount || 0),
        entries: Array.isArray(group.entries)
            ? group.entries.map(cloneParticleSeedInventoryEntry)
            : [],
    };
}

function getParticleLesson3InventoryGroups({
    excludeEntryId = "",
} = {}) {
    const normalizedExcludeEntryId = String(excludeEntryId || "").trim();
    const entries = getParticleSeedInventoryEntries()
        .filter((entry) => !normalizedExcludeEntryId || entry.id !== normalizedExcludeEntryId);
    return PARTICLE_LESSON3_INVENTORY_GROUPS
        .map((group) => {
            const groupedEntries = entries.filter((entry) => (
                group.sectionPrefix
                && String(entry.section || "").startsWith(group.sectionPrefix)
            ));
            return cloneParticleInventoryGroup({
                ...group,
                entryCount: groupedEntries.length,
                entries: groupedEntries,
            });
        })
        .filter((group) => group.entryCount > 0);
}

function findParticleSeedInventoryEntries(value = "") {
    const lookupKey = normalizeParticleInventoryLookupValue(value);
    if (!lookupKey) {
        return [];
    }
    const noQuestionKey = lookupKey.replace(/\?/g, "");
    return getParticleSeedInventoryEntries()
        .filter((entry) => entry.lookupKeys.includes(lookupKey) || entry.lookupKeys.includes(noQuestionKey));
}

function getParticleInventoryPreviewEntries({
    matchedEntry = null,
    functionScope = "",
    limit = PARTICLE_INVENTORY_PREVIEW_LIMIT,
} = {}) {
    const normalizedFunctionScope = functionScope ? normalizeParticleFunctionScope(functionScope) : "";
    const baseEntries = getParticleSeedInventoryEntries({ functionScope: normalizedFunctionScope });
    const prioritized = [
        matchedEntry,
        ...baseEntries,
    ]
        .filter(Boolean)
        .filter((entry, index, list) => list.findIndex((candidate) => candidate.id === entry.id) === index);
    return prioritized.slice(0, Math.max(1, Number(limit || PARTICLE_INVENTORY_PREVIEW_LIMIT))).map(cloneParticleSeedInventoryEntry);
}

function inferParticleCandidateProfile(candidate = "") {
    const raw = String(candidate == null ? "" : candidate).trim();
    const bare = raw.replace(/#/g, "").trim();
    const tokens = bare ? bare.split(/\s+/g).filter(Boolean) : [];
    const hasLeftBoundary = raw.startsWith("#");
    const hasRightBoundary = raw.endsWith("#");
    const hasParenthesizedStemSyntax = /[()]/.test(raw);
    const hasNuclearClauseFormulaSyntax = /^#.*\(.*\).*#$/.test(raw);
    const isStemSyntax = hasParenthesizedStemSyntax || hasNuclearClauseFormulaSyntax;
    const isCollocation = tokens.length > 1;
    const placementScope = isStemSyntax
        ? PARTICLE_PLACEMENT_SCOPE.unknown
        : (hasLeftBoundary
        ? PARTICLE_PLACEMENT_SCOPE.boundToPrevious
        : (hasRightBoundary
            ? PARTICLE_PLACEMENT_SCOPE.boundToFollowing
            : (isCollocation
                ? PARTICLE_PLACEMENT_SCOPE.collocationSequence
                : PARTICLE_PLACEMENT_SCOPE.floating)));
    const functionScope = isStemSyntax
        ? PARTICLE_FUNCTION_SCOPE.unknown
        : (isCollocation
        ? PARTICLE_FUNCTION_SCOPE.collocation
        : PARTICLE_FUNCTION_SCOPE.unknown);
    return {
        raw,
        bare,
        tokens,
        tokenCount: tokens.length,
        isEmpty: !bare,
        isCollocation,
        hasParenthesizedStemSyntax,
        hasNuclearClauseFormulaSyntax,
        isStemSyntax,
        syntaxClass: isStemSyntax ? "stem-or-nuclear-clause-syntax" : "particle-candidate",
        boundaryMarker: hasLeftBoundary
            ? "left-bound-to-previous"
            : (hasRightBoundary ? "right-bound-to-following" : ""),
        placementScope,
        functionScope,
    };
}

function buildParticlePlacementMetadata({
    candidate = "",
    placementScope = "",
    functionScope = "",
    hostLayer = "",
    source = "manual-candidate",
} = {}) {
    const placement = getParticlePlacementFrame(placementScope);
    const normalizedFunctionScope = normalizeParticleFunctionScope(functionScope);
    const metadata = {
        kind: "particle-placement-metadata",
        version: PARTICLE_METADATA_VERSION,
        structuralSource: "Andrews Lesson 3",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        candidate: String(candidate == null ? "" : candidate),
        source,
        placement: placement || {
            id: PARTICLE_PLACEMENT_SCOPE.unknown,
            label: "unknown",
            scope: PARTICLE_PLACEMENT_SCOPE.unknown,
            hostLayer: hostLayer || "unknown",
            beforePredicate: null,
            afterPredicate: null,
        },
        functionScope: normalizedFunctionScope,
        isInventoryBacked: false,
        generationAllowed: false,
        diagnostics: [
            "particle-placement-diagnostic-only",
            "particle-needs-confirmed-nawat-evidence",
        ],
        antiConflationRules: getParticleAntiConflationRules(),
    };
    return attachParticleGrammarContract(metadata, {
        metadataKind: "particle-placement-metadata",
        routeStage: "classify-placement",
        sourceInput: metadata.candidate,
        supported: false,
        nuclearClauseFrame: {
            hostLayer: metadata.placement.hostLayer,
            placementScope: metadata.placement.scope,
            functionScope: metadata.functionScope,
        },
        targetContract: {
            metadataKind: "particle-placement-metadata",
            generationAllowed: false,
            placementScope: metadata.placement.scope,
            functionScope: metadata.functionScope,
        },
    });
}

function classifyParticleCandidate(value = "", options = {}) {
    const candidate = String(value == null ? "" : value).trim();
    const inferred = inferParticleCandidateProfile(candidate);
    const seedMatches = findParticleSeedInventoryEntries(candidate);
    const seedEntry = seedMatches[0] || null;
    const placementScope = options.placementScope || options.placement || seedEntry?.placement?.scope || inferred.placementScope || PARTICLE_PLACEMENT_SCOPE.unknown;
    const functionScope = options.functionScope || options.function || seedEntry?.functionScope || inferred.functionScope || PARTICLE_FUNCTION_SCOPE.unknown;
    const placementMetadata = buildParticlePlacementMetadata({
        candidate: seedEntry?.displayForm || candidate,
        placementScope,
        functionScope,
        source: seedEntry ? "andrews-lesson-3-seed" : (options.source || "candidate"),
    });
    const matched = Boolean(seedEntry);
    const outOfScopeReason = !matched && inferred.isStemSyntax
        ? "stem-or-nuclear-clause-syntax"
        : "";
    const diagnostics = matched
        ? [
            "particle-candidate-andrews-derived",
            "particle-orthography-adapted",
            "particle-generation-disabled",
        ]
        : (candidate
            ? (outOfScopeReason
                ? [
                    "particle-candidate-stem-syntax",
                    "particle-mode-not-vnc-or-nnc",
                    "particle-generation-disabled",
                ]
                : ["particle-candidate-unconfirmed"])
            : ["particle-candidate-empty"]);
    const classification = {
        kind: "particle-candidate-classification",
        version: PARTICLE_METADATA_VERSION,
        candidate,
        candidateProfile: inferred,
        matched,
        status: matched ? "andrews-derived" : (outOfScopeReason ? "out-of-scope" : "unconfirmed"),
        outOfScopeReason,
        seedEntry,
        seedMatches,
        placement: placementMetadata.placement,
        functionScope: placementMetadata.functionScope,
        functionClass: getParticleFunctionClassFrame(placementMetadata.functionScope),
        generationAllowed: false,
        diagnostics,
        placementMetadata,
    };
    return attachParticleGrammarContract(classification, {
        metadataKind: "particle-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: seedEntry?.sourceForm || candidate,
        surface: seedEntry?.displayForm || "",
        surfaceForms: seedEntry?.displayForm ? [seedEntry.displayForm] : [],
        supported: false,
        evidenceStatus: matched ? "andrews-orthography-adapted" : (outOfScopeReason ? "not-particle-syntax" : "diagnostic-only"),
        diagnostics: classification.diagnostics,
        orthographyFrame: seedEntry?.orthography || null,
        nuclearClauseFrame: outOfScopeReason
            ? {
                clauseKind: "nuclear-clause-or-stem-syntax",
                particleMode: true,
                rejectedByParticleMode: true,
                outOfScopeReason,
                placementScope: PARTICLE_PLACEMENT_SCOPE.unknown,
                functionScope: PARTICLE_FUNCTION_SCOPE.unknown,
            }
            : (placementMetadata.grammarFrame?.nuclearClauseFrame || null),
        targetContract: {
            metadataKind: "particle-candidate-classification",
            generationAllowed: false,
            hasAndrewsDerivedSeedEntry: matched,
            hasConfirmedNawatInventory: false,
            outOfScopeReason,
            placementScope: classification.placement.scope,
            functionScope: classification.functionScope,
        },
    });
}

function buildParticleInventoryBoundaryMetadata() {
    const seedEntries = getParticleSeedInventoryEntries();
    const previewEntries = getParticleSeedInventoryEntries({ limit: PARTICLE_INVENTORY_PREVIEW_LIMIT });
    const boundary = {
        kind: "particle-inventory-boundary",
        version: PARTICLE_METADATA_VERSION,
        lesson: 3,
        status: "partial",
        confirmedParticles: [],
        andrewsDerivedParticleCount: seedEntries.length,
        andrewsDerivedParticlePreview: previewEntries,
        placementFrames: getParticlePlacementFrames(),
        functionClassFrames: getParticleFunctionClassFrames(),
        generationAllowed: false,
        boundaries: {
            hasStaticParticleInventory: false,
            hasAndrewsDerivedSeedInventory: seedEntries.length > 0,
            hasParticleGeneration: false,
            hasPlacementEngine: false,
            hasVisibleParticleMode: typeof document !== "undefined"
                ? !Boolean(document.getElementById("calc-nawat-mode-particle")?.disabled)
                : false,
            existingParticleModeIsPlaceholder: typeof document !== "undefined"
                ? Boolean(document.getElementById("calc-nawat-mode-particle")?.disabled)
                : true,
        },
        antiConflationRules: getParticleAntiConflationRules(),
    };
    return attachParticleGrammarContract(boundary, {
        metadataKind: "particle-inventory-boundary",
        routeStage: "classify-boundary",
        supported: false,
        evidenceStatus: "andrews-orthography-adapted",
        morphBoundaryFrame: boundary,
    });
}

function buildParticleModeDisplayModel({
    candidate = "",
    source = "particula-mode",
} = {}) {
    const candidateProfile = inferParticleCandidateProfile(candidate);
    const classification = classifyParticleCandidate(candidateProfile.raw, {
        source,
    });
    const boundary = buildParticleInventoryBoundaryMetadata();
    const seedEntry = classification.seedEntry || null;
    const isOutOfScopeStemSyntax = classification.status === "out-of-scope"
        && classification.outOfScopeReason === "stem-or-nuclear-clause-syntax";
    const inventoryPreviewEntries = getParticleInventoryPreviewEntries({
        matchedEntry: seedEntry,
        functionScope: seedEntry?.functionScope || "",
        limit: PARTICLE_INVENTORY_PREVIEW_LIMIT,
    });
    const inventoryGroups = getParticleLesson3InventoryGroups();
    const candidateDisplay = seedEntry?.displayForm || candidateProfile.raw || "Ø";
    const model = {
        kind: "particle-mode-display-model",
        version: PARTICLE_METADATA_VERSION,
        lesson: 3,
        title: "Partículas",
        structuralSource: "Andrews Lesson 3",
        targetAuthority: "Modern Nawat/Pipil orthography; repo data still decides confirmed forms",
        candidate: candidateProfile.raw,
        candidateDisplay,
        candidateProfile,
        classification,
        unitProfile: {
            lexicalClass: isOutOfScopeStemSyntax ? "not-particle" : "particle",
            morphology: "monomorphemic",
            paradigmaticity: "invariant",
            internalMorphologicalStructure: false,
            nuclearClauseKind: isOutOfScopeStemSyntax
                ? "stem-or-nuclear-clause-syntax"
                : "not-vnc-or-nnc",
            matrixStemAllowed: false,
            canServeAsEmbedRarely: true,
            generationAllowed: false,
        },
        functionClassFrames: getParticleFunctionClassFrames(),
        placementFrames: getParticlePlacementFrames(),
        inventoryBoundary: boundary,
        inventoryPreviewLimit: PARTICLE_INVENTORY_PREVIEW_LIMIT,
        inventoryPreviewEntries,
        inventoryGroups,
        rows: [
            {
                id: "unit",
                label: "Unidad",
                value: isOutOfScopeStemSyntax ? "no partícula" : "partícula",
                detail: isOutOfScopeStemSyntax
                    ? "la sintaxis con paréntesis pertenece a tallo/CN, no a Lesson 3 Partículas"
                    : "léxico menor, invariante y sin estructura morfológica interna",
            },
            {
                id: "candidate",
                label: "Candidata",
                value: candidateDisplay,
                detail: seedEntry
                    ? `Andrews ${seedEntry.section}; fuente ${seedEntry.sourceForm}; ortografía adaptada`
                    : (isOutOfScopeStemSyntax
                        ? "tallo o cláusula nuclear detectada; Andrews Lección 3 no la clasifica como partícula"
                        : (candidateProfile.isEmpty
                    ? "ingresa una forma para clasificarla"
                            : "forma no encontrada en la transferencia Andrews Lección 3")),
            },
            {
                id: "placement",
                label: "Posición",
                value: isOutOfScopeStemSyntax
                    ? "fuera de Partícula"
                    : (classification.placement?.label || "unknown"),
                detail: isOutOfScopeStemSyntax
                    ? "los paréntesis marcan un tallo/predicado para otro modo"
                    : `capa: ${classification.placement?.hostLayer || "unknown"}`,
            },
            {
                id: "function",
                label: "Función",
                value: isOutOfScopeStemSyntax
                    ? "no partícula"
                    : (classification.functionClass?.label || classification.functionScope || "unknown"),
                detail: seedEntry?.gloss
                    ? `${seedEntry.gloss}; clase Andrews transferida`
                    : (isOutOfScopeStemSyntax
                        ? "Lección 3 cubre partículas, negativas, colocaciones e interjecciones; no tallos verbales"
                        : "clase Andrews estructural; no evidencia lexical Nawat"),
            },
            {
                id: "boundary",
                label: "Límite",
                value: "sin generación",
                detail: seedEntry
                    ? "transferencia Andrews con ortografía Nawat; no VNC, no CNN/NNC"
                    : (isOutOfScopeStemSyntax
                        ? "Partícula no analiza ni genera tallos entre paréntesis"
                        : "no VNC, no CNN/NNC, no inventario confirmado"),
            },
        ],
        diagnostics: [
            ...(classification.diagnostics || []),
            "particle-mode-diagnostic-only",
            "particle-mode-no-generation",
        ],
        generationAllowed: false,
        antiConflationRules: getParticleAntiConflationRules(),
    };
    return attachParticleGrammarContract(model, {
        metadataKind: "particle-mode-display-model",
        routeStage: "render-mode",
        sourceInput: seedEntry?.sourceForm || candidateProfile.raw,
        surface: seedEntry?.displayForm || "",
        surfaceForms: seedEntry?.displayForm ? [seedEntry.displayForm] : [],
        supported: false,
        evidenceStatus: seedEntry
            ? "andrews-orthography-adapted"
            : (isOutOfScopeStemSyntax ? "not-particle-syntax" : "diagnostic-only"),
        diagnostics: model.diagnostics,
        orthographyFrame: seedEntry?.orthography || null,
        nuclearClauseFrame: {
            clauseKind: isOutOfScopeStemSyntax
                ? "nuclear-clause-or-stem-syntax"
                : "not-a-nuclear-clause",
            particleMode: true,
            rejectedByParticleMode: isOutOfScopeStemSyntax,
            placementScope: classification.placement?.scope || "",
            functionScope: classification.functionScope || "",
        },
        targetContract: {
            metadataKind: "particle-mode-display-model",
            generationAllowed: false,
            hasConfirmedParticleInventory: false,
            hasAndrewsDerivedSeedEntry: Boolean(seedEntry),
            outOfScopeReason: classification.outOfScopeReason || "",
            changesFiniteOutput: false,
        },
        morphBoundaryFrame: {
            unitProfile: model.unitProfile,
            candidateProfile,
            seedEntry,
            inventoryPreviewEntries,
            inventoryGroups,
            functionClassFrames: model.functionClassFrames,
            placementFrames: model.placementFrames,
        },
    });
}

function installParticleClassicGlobals() {
    const globalTarget = (typeof targetObject !== "undefined" && targetObject)
        || (typeof globalThis !== "undefined" ? globalThis : null);
    if (!globalTarget || typeof globalTarget !== "object") {
        return null;
    }
    Object.assign(globalTarget, {
        getParticlePlacementFrames,
        getParticleFunctionClassFrames,
        getParticleAntiConflationRules,
        getParticlePlacementFrame,
        getParticleFunctionClassFrame,
        normalizeParticleInventoryLookupValue,
        getAndrewsLesson3ParticleAsNawat,
        cloneParticleSeedInventoryEntry,
        attachParticleSeedInventoryEntryGrammarContract,
        buildParticleSeedInventoryEntry,
        getParticleSeedInventoryEntries,
        getParticleLesson3InventoryGroups,
        findParticleSeedInventoryEntries,
        getParticleInventoryPreviewEntries,
        inferParticleCandidateProfile,
        classifyParticleCandidate,
        buildParticlePlacementMetadata,
        buildParticleInventoryBoundaryMetadata,
        buildParticleModeDisplayModel,
    });
    return globalTarget;
}

installParticleClassicGlobals();
