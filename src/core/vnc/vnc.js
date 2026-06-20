// core/vnc/vnc.js
// Browser-facing nuclear-clause surface facade.
// Global-scope VNC facade. Nuclear-clause surface generation is canonical;
// generateWord remains a compatibility alias through the extracted request + engine modules.

"use strict";

const VNC_LESSON5_VALIDATION_REFS = Object.freeze([
    "src/tests/vnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const VNC_LESSON5_PDF_REFS = Object.freeze([
    "Andrews Lesson 5.1",
    "Andrews Lesson 5.2",
    "Andrews Lesson 5.3",
    "Andrews Lesson 5.4",
    "Andrews Lesson 5.5",
]);

const VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME = Object.freeze({
    kind: "lesson-5-intransitive-vnc-formula",
    sourceSection: "Andrews §5.1",
    formulaType: "VNC",
    formulaAbbreviation: "CNV",
    pdfFormula: "#pers1-pers2(STEM)tns+num1-num2#",
    visibleFormula: "#pers1-pers2(base)tiempo+núm1-núm2#",
    slotOrder: Object.freeze(["pers1", "pers2", "base", "tiempo", "num1", "num2"]),
    subjectSlots: Object.freeze(["pers1", "pers2", "num1", "num2"]),
    predicateSlots: Object.freeze(["base", "tiempo"]),
    valencePosition: "implicit-vacant-core",
    valenceRole: "intransitive",
    generationScope: "finite-intransitive-vnc-surface",
});

const VNC_LESSON5_SUBJECT_SLOT_FRAME = Object.freeze({
    kind: "lesson-5-subject-slot-frame",
    sourceSections: Object.freeze(["Andrews §5.2", "Andrews §5.3", "Andrews §5.4"]),
    caseSlot: Object.freeze({ slot: "pers2", role: "nominative", classicalCarrier: "0" }),
    featureDistribution: Object.freeze({
        person: Object.freeze(["pers1"]),
        case: Object.freeze(["pers2"]),
        number: Object.freeze(["num1", "num2"]),
        animacyHumanness: "no-separate-subposition",
    }),
    nawatSurfaceAuthority: "repo-evidence-and-user-provided-forms",
    classicalCarriersAreNotFixtures: true,
});

const VNC_LESSON5_SUBJECT_FILLER_PARADIGMS = Object.freeze([
    Object.freeze({
        id: "main-indicative-present-customary-imperfect-distant-past",
        sourceSection: "Andrews §5.4.1",
        tenseFamily: Object.freeze(["present", "customary-present", "imperfect", "distant-past"]),
        currentNawatTenses: Object.freeze(["presente", "presente-habitual", "imperfecto", "pasado-remoto"]),
        singularConnector: "0-0",
        pluralConnector: "0-h",
        nawatPluralBridge: Object.freeze({ classicalCarrier: "h", adaptedCarrier: "t" }),
        currentNawatSubjectSlots: Object.freeze([
            Object.freeze({ person: "1sg", pers1: "ni", pers2: "" }),
            Object.freeze({ person: "1pl", pers1: "ti", pers2: "t" }),
            Object.freeze({ person: "2sg", pers1: "ti", pers2: "" }),
            Object.freeze({ person: "2pl", pers1: "an", pers2: "t" }),
            Object.freeze({ person: "3sg", pers1: "", pers2: "" }),
            Object.freeze({ person: "3pl", pers1: "", pers2: "t" }),
        ]),
    }),
    Object.freeze({
        id: "future-preterit-indicative",
        sourceSection: "Andrews §5.4.2",
        tenseFamily: Object.freeze(["future", "preterit"]),
        currentNawatTenses: Object.freeze(["futuro", "preterito"]),
        connectorPattern: "c/qu~qui~0 plus 0/eh",
        implementationNote: "current engine realizes Nawat future and preterit through tense suffix rules and preterit class logic, not Classical fixture import",
    }),
    Object.freeze({
        id: "nonpast-optative-admonitive-boundary",
        sourceSections: Object.freeze(["Andrews §5.4.3", "Andrews §5.4.4"]),
        tenseFamily: Object.freeze(["nonpast-optative", "nonpast-admonitive"]),
        currentNawatTenses: Object.freeze(["optativo", "presente-desiderativo"]),
        implementationNote: "sentence-level optative/admonitive meanings remain Lessons 9-10; Lesson 5 only licenses finite-slot diagnostics",
    }),
]);

const VNC_LESSON5_TENSE_MORPH_FRAME = Object.freeze({
    kind: "lesson-5-tense-morph-frame",
    sourceSection: "Andrews §5.5",
    tenseSlot: "tns",
    visibleSlot: "tiempo",
    fusedCategories: Object.freeze(["mood", "tense"]),
    stemCategories: Object.freeze(["aspect", "valence", "voice"]),
    stemDetailDeferredTo: Object.freeze(["Andrews Lesson 7", "Andrews Lesson 20", "Andrews Lesson 21", "Andrews Lesson 22"]),
    andrewsMoodTenseInventory: Object.freeze({
        indicative: Object.freeze({
            imperfectiveStem: Object.freeze(["present", "customary-present", "imperfect", "future"]),
            perfectiveStem: Object.freeze(["preterit", "distant-past"]),
        }),
        optative: Object.freeze({
            imperfectiveStem: Object.freeze(["nonpast", "past"]),
        }),
        admonitive: Object.freeze({
            perfectiveStem: Object.freeze(["nonpast"]),
        }),
    }),
    currentNawatTenseInventory: Object.freeze([
        "presente",
        "presente-habitual",
        "presente-desiderativo",
        "imperfecto",
        "futuro",
        "preterito",
        "pasado-remoto",
        "condicional",
        "optativo",
        "perfecto",
        "pluscuamperfecto",
        "condicional-perfecto",
    ]),
    tenseIsNotTime: true,
});

const VNC_LESSON5_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson5-intransitive-vnc-formula",
        andrewsSection: "5.1",
        category: "intransitive-vnc-formula",
        directiveEs: "La CNV intransitiva usa #pers1-pers2(base)tiempo+núm1-núm2#; la valencia queda implícita y vacante en el núcleo.",
        engineSurface: "CNV finite surface route with empty objective slots and intransitive valence frame",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson5-subject-positions",
        andrewsSection: "5.2",
        category: "subject-positions",
        directiveEs: "Distribuir persona, caso y número en pers1, pers2, núm1 y núm2; animacidad y humanidad no reciben posición separada.",
        engineSurface: "pers1/pers2 subject slots plus Nawat plural suffix bridge",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson5-subject-morphic-fillers",
        andrewsSection: "5.3",
        category: "subject-morphic-fillers",
        directiveEs: "Los rellenos de sujeto son morfos portadores de persona, caso y número; las variantes clásicas no se importan como formas nawat.",
        engineSurface: "agreement slot inventory and Nawat evidence-gated subject prefixes/suffixes",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson5-subject-paradigms",
        andrewsSection: "5.4",
        category: "subject-pronoun-paradigms",
        directiveEs: "Agrupar los paradigmas de sujeto por correlación de tiempo con núm1/núm2; el sufijo plural clásico -h pasa por la ortografía nawat antes de mostrarse.",
        engineSurface: "indicative and optative subject-slot identity plus tense-sensitive suffix rules",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson5-predicate-tense-morphs",
        andrewsSection: "5.5",
        category: "predicate-tense-morphs",
        directiveEs: "El predicado organiza base, voz, aspecto, valencia y tiempo; el slot tiempo fusiona modo y tiempo sin confundir tiempo gramatical con tiempo real.",
        engineSurface: "TENSE_SUFFIX_RULES, preterit class routing, active/nonactive gates, and finite CNV output",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
]);

const VNC_LESSON6_VALIDATION_REFS = Object.freeze([
    "src/tests/vnc.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const VNC_LESSON6_PDF_REFS = Object.freeze([
    "Andrews Lesson 6.1",
    "Andrews Lesson 6.2",
    "Andrews Lesson 6.3",
    "Andrews Lesson 6.4",
    "Andrews Lesson 6.5",
    "Andrews Lesson 6.6",
    "Andrews Lesson 6.7",
]);

const VNC_LESSON6_TRANSITIVE_FORMULA_FRAME = Object.freeze({
    kind: "lesson-6-transitive-vnc-formula",
    sourceSections: Object.freeze(["Andrews §6.1", "Andrews §6.2", "Andrews §6.3"]),
    formulaType: "VNC",
    formulaAbbreviation: "CNV",
    formulas: Object.freeze({
        monadicValence: Object.freeze({
            pdfFormula: "#pers1-pers2+va(STEM)tns+num1-num2#",
            visibleFormula: "#pers1-pers2+val(base)tiempo+núm1-núm2#",
            valenceSlots: Object.freeze(["va"]),
            objectReference: "nonspecific-or-shuntline-reflexive",
        }),
        dyadicValence: Object.freeze({
            pdfFormula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            visibleFormula: "#pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
            valenceSlots: Object.freeze(["va1", "va2"]),
            objectReference: "specific-mainline-projective-or-mainline-reflexive",
        }),
    }),
    transitiveDifferenceFromLesson5: "valence-position-present",
    valencePositionCategories: Object.freeze(["person", "number", "animacy", "humanness", "objective-case"]),
    additionalObjectiveDistinctions: Object.freeze(["trajectory", "specificity", "prominence"]),
});

const VNC_LESSON6_OBJECT_CATEGORY_FRAME = Object.freeze({
    kind: "lesson-6-object-category-frame",
    sourceSection: "Andrews §6.1",
    objectiveCaseFeature: "objective",
    trajectory: Object.freeze(["projective", "reflexive", "reciprocative"]),
    specificity: Object.freeze(["specific", "nonspecific"]),
    prominence: Object.freeze(["mainline", "shuntline"]),
    nonSpecificIsIndefinite: true,
    shuntlineProminenceDeferredTo: Object.freeze(["Andrews Lesson 21", "Andrews Lesson 22", "Andrews Lesson 23", "Andrews Lesson 24", "Andrews Lesson 25", "Andrews Lesson 26"]),
});

const VNC_LESSON6_MONADIC_VALENCE_FILLERS = Object.freeze([
    Object.freeze({
        id: "shuntline-reflexive-reciprocative",
        sourceSection: "Andrews §6.2.1",
        classicalCarrier: "ne",
        currentNawatSlotValue: "ne",
        currentNawatSlotStatus: "direct-nawat-generation",
        trajectory: "reflexive-reciprocative",
        prominence: "shuntline",
        specificity: "specific",
        realizationSource: "Andrews Lección 6 con forma Nawat directa provista por el usuario; no se colapsa con mu de línea principal",
        generationPolicy: "direct-nawat-generation",
    }),
    Object.freeze({
        id: "nonspecific-human-projective",
        sourceSection: "Andrews §6.2.2a",
        classicalCarrier: "te",
        currentNawatSlotValue: "te",
        trajectory: "projective",
        specificity: "nonspecific",
        humanness: "human",
        pronounClass: "indefinite",
    }),
    Object.freeze({
        id: "nonspecific-nonhuman-projective",
        sourceSection: "Andrews §6.2.2b",
        classicalCarrier: "tla",
        currentNawatSlotValue: "ta",
        trajectory: "projective",
        specificity: "nonspecific",
        humanness: "nonhuman",
        pronounClass: "indefinite",
        orthographyBridge: "Classical tla -> Nawat ta",
    }),
]);

const VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM = Object.freeze([
    Object.freeze({ person: "1sg", classicalDyad: "n-ech", currentNawatDyad: "n-ech", currentNawatPrefix: "nech", glossEs: "me" }),
    Object.freeze({ person: "1pl", classicalDyad: "t-ech", currentNawatDyad: "t-ech", currentNawatPrefix: "tech", glossEs: "nos" }),
    Object.freeze({ person: "2sg", classicalDyad: "m-itz", currentNawatDyad: "m-etz", currentNawatPrefix: "metz", glossEs: "te" }),
    Object.freeze({ person: "2pl", classicalDyad: "am-ech", currentNawatDyad: "m-etz-in", currentNawatPrefix: "metzin", glossEs: "los/las a ustedes" }),
    Object.freeze({ person: "3sg", classicalDyad: "c-0/qu-0/qui-0", currentNawatDyad: "ki-0/k-0", currentNawatPrefix: "ki/k", glossEs: "lo/la" }),
    Object.freeze({ person: "3pl", classicalDyad: "qu-im", currentNawatDyad: "k-in", currentNawatPrefix: "kin", glossEs: "los/las" }),
]);

const VNC_LESSON6_DYADIC_OBJECT_FRAME = Object.freeze({
    kind: "lesson-6-dyadic-object-frame",
    sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
    subpositions: Object.freeze(["va1", "va2"]),
    featureDistribution: Object.freeze({
        thirdPerson: Object.freeze({
            va1: Object.freeze(["person", "objective-case"]),
            va2: Object.freeze(["number"]),
            classicalVa1Variants: Object.freeze(["c/qu", "qui"]),
            classicalVa2Variants: Object.freeze(["0", "im", "in"]),
        }),
        nonThirdPerson: Object.freeze({
            va1: Object.freeze(["person", "number"]),
            va2: Object.freeze(["objective-case"]),
            classicalVa1Fillers: Object.freeze(["m", "am", "n", "t"]),
            classicalVa2Variants: Object.freeze(["ech", "itz"]),
        }),
    }),
    currentNawatSpecificPrefixes: Object.freeze(["nech", "tech", "metz", "metzin", "ki", "k", "kin"]),
    directNawatDyadByPrefix: Object.freeze({
        nech: "n-ech",
        tech: "t-ech",
        metz: "m-etz",
        metzin: "m-etz-in",
        ki: "ki-0",
        k: "k-0",
        kin: "k-in",
    }),
    currentNawatAllomorphyNotes: Object.freeze(["ki-0 is the direct Nawat 3sg object dyad; k-0 is the reduced Nawat dyad when the object prefix surfaces as k"]),
});

const VNC_LESSON6_REFLEXIVE_OBJECT_FRAME = Object.freeze({
    kind: "lesson-6-reflexive-object-frame",
    sourceSections: Object.freeze(["Andrews §6.6", "Andrews §6.7"]),
    valencePosition: "va1-va2",
    trajectory: "mainline-reflexive-reciprocative",
    subjectAgreement: "object reflects subject person and number",
    classicalDyads: Object.freeze([
        Object.freeze({ person: "1sg", dyad: "n-o/n-0", glossEs: "a mí mismo" }),
        Object.freeze({ person: "1pl", dyad: "t-o/t-0", glossEs: "a nosotros mismos / entre nosotros" }),
        Object.freeze({ person: "nonfirst", dyad: "m-o/m-0", currentNawatDyad: "m-u/m-0", glossEs: "a sí mismo(s) / entre sí" }),
    ]),
    currentNawatReflexiveSlot: "mu",
    directNawatReflexiveParadigm: "m-u/m-0",
    directNawatReflexiveCondition: "m-u cuando la alomorfía conserva mu; m-0 cuando obj1-mu-before-vowel-m reduce mu a m",
    engineBehavior: "same-person specific objects are redirected to dyadic mainline mu by reflexive slot logic",
    generationAddsNoClassicalFixtures: true,
});

const VNC_LESSON6_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson6-transitive-vnc-formulas",
        andrewsSection: "6.1",
        category: "transitive-vnc-formulas",
        directiveEs: "La CNV transitiva difiere de la intransitiva por la posición de valencia, que porta pronombre objetivo.",
        engineSurface: "CNV route with occupied obj1/valence slot and valency frame",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson6-monadic-valence",
        andrewsSection: "6.2",
        category: "monadic-valence-position",
        directiveEs: "La valencia monádica cubre reflexivo/recíproco de línea secundaria y objetos inespecíficos humanos/no humanos.",
        engineSurface: "ne, te, and ta object-slot diagnostics with direct Nawat realization",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson6-dyadic-valence-formula",
        andrewsSection: "6.3",
        category: "dyadic-valence-formula",
        directiveEs: "La valencia diádica usa val1-val2 para objetos específicos de línea principal.",
        engineSurface: "specific obj1 prefixes and valency frame",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson6-projective-object-distribution",
        andrewsSection: "6.4",
        category: "projective-object-distribution",
        directiveEs: "Los objetos proyectivos reparten persona, número y caso entre val1 y val2 según sean de 3a persona o no.",
        engineSurface: "specific object prefix inventory and allomorphy metadata",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson6-projective-object-summary",
        andrewsSection: "6.5",
        category: "projective-object-paradigm",
        directiveEs: "El paradigma de objeto específico se conserva como mapa de función; la fórmula visible expone subcasillas Nawat directas.",
        engineSurface: "n-ech/t-ech/m-etz/m-etz-in/ki-0~k-0/k-in formula dyads plus current surface prefix set",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson6-mainline-reflexive-distribution",
        andrewsSection: "6.6",
        category: "mainline-reflexive-distribution",
        directiveEs: "El reflexivo de línea principal refleja persona y número del sujeto; no se debe duplicar información fuera del contrato de objeto.",
        engineSurface: "same-person object auto-switch to reflexive mu with diagnostics",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson6-mainline-reflexive-summary",
        andrewsSection: "6.7",
        category: "mainline-reflexive-paradigm",
        directiveEs: "Los paradigmas reflexivos/recíprocos quedan vinculados al sujeto; la fórmula visible expone m-u o m-0 según la alomorfía mu.",
        engineSurface: "reflexivo slot metadata with conditional direct Nawat m-u/m-0 paradigm and unchanged finite output",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
]);

const VNC_LESSON6_SHOT_REPORT = Object.freeze([
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.1",
        requirementEs: "La CNV transitiva se distingue por la posicion de valencia objetiva y por trayectoria, especificidad y prominencia.",
        shotStatus: "hit-no-edit",
        missProbeEs: "La ruta renderiza un objeto, pero no distingue valencia monadica/diadica ni especifico/inespecifico/reflexivo.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.2",
        requirementEs: "La formula monadica +va cubre ne de linea secundaria y objetos inespecificos te/ta.",
        shotStatus: "hit-no-edit",
        missProbeEs: "ne, te o ta aparecen como val1-val2 o quedan bloqueados.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.2.1",
        requirementEs: "ne es reflexivo/reciproco de linea secundaria, no mu de linea principal.",
        shotStatus: "hit-no-edit",
        missProbeEs: "ne se colapsa en mu, se bloquea, o pierde la formula monadica.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.2.2a",
        requirementEs: "te es proyectivo inespecifico humano.",
        shotStatus: "hit-no-edit",
        missProbeEs: "te se trata como objeto personal especifico o como valencia diadica.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.2.2b",
        requirementEs: "tla corresponde estructuralmente a Nawat ta como proyectivo inespecifico no humano.",
        shotStatus: "hit-no-edit",
        missProbeEs: "ta se importa como superficie clasica tla o se trata como objeto especifico.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.3",
        requirementEs: "Los objetos especificos de linea principal usan valencia diadica val1-val2.",
        shotStatus: "hit-no-edit",
        missProbeEs: "ki, kin, nech, tech, metz, metzin o mu aparecen como valencia monadica.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4",
        requirementEs: "Los objetos proyectivos personales distribuyen persona, numero y caso entre val1 y val2.",
        shotStatus: "hit-no-edit",
        missProbeEs: "La superficie genera, pero la formula oculta la propiedad de subcasillas.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.1",
        requirementEs: "val1 siempre manifiesta persona, nunca como unica informacion.",
        shotStatus: "hit-no-edit",
        missProbeEs: "val1 queda como persona desnuda sin caso objetivo o numero.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.1a",
        requirementEs: "En tercera persona, val1 combina persona y caso objetivo.",
        shotStatus: "hit-no-edit",
        missProbeEs: "ki/k se presenta como monadico o como portador del numero.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.1b",
        requirementEs: "En primera y segunda persona, val1 combina persona y numero.",
        shotStatus: "hit-no-edit",
        missProbeEs: "nech, tech, metz o metzin no exponen los dyads Nawat adaptados.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.2",
        requirementEs: "val2 provee la categoria no contenida en val1.",
        shotStatus: "hit-no-edit",
        missProbeEs: "val2 queda vacio o se pliega en el prefijo superficial.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.2a",
        requirementEs: "En tercera persona, val2 manifiesta numero: cero singular e in/im plural.",
        shotStatus: "hit-edit",
        missProbeEs: "nikpiya muestra ki-0 en vez de k-0, kipiya muestra k-0 en vez de ki-0, o kin no expone k-in.",
        changedFiles: Object.freeze([
            "docs/ANDREWS_TRAJECTORY.md",
            "docs/GRAMMAR_SPEC.md",
            "src/core/generation/engine.js",
            "src/core/generation/engine.mjs",
            "src/core/generation/morphology_engine.js",
            "src/core/generation/morphology_engine.mjs",
            "src/core/orthography/orthography.js",
            "src/core/orthography/orthography.mjs",
            "src/core/vnc/vnc.js",
            "src/core/vnc/vnc.mjs",
            "src/tests/vnc.test.js",
        ]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.4.2b",
        requirementEs: "En no tercera persona, val2 expresa caso objetivo.",
        shotStatus: "hit-no-edit",
        missProbeEs: "metz/metzin quedan sin division o importan itz sin adaptacion Nawat.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.5",
        requirementEs: "El paradigma proyectivo especifico se muestra como dyads Nawat directos.",
        shotStatus: "hit-edit",
        missProbeEs: "Los prefijos generan, pero faltan n-ech, t-ech, m-etz, m-etz-in, ki-0/k-0 o k-in en la formula, o nikpiya no acopla superficie k con formula k-0.",
        changedFiles: Object.freeze([
            "docs/ANDREWS_TRAJECTORY.md",
            "docs/GRAMMAR_SPEC.md",
            "src/core/generation/engine.js",
            "src/core/generation/engine.mjs",
            "src/core/generation/morphology_engine.js",
            "src/core/generation/morphology_engine.mjs",
            "src/core/orthography/orthography.js",
            "src/core/orthography/orthography.mjs",
            "src/core/vnc/vnc.js",
            "src/core/vnc/vnc.mjs",
            "src/tests/vnc.test.js",
        ]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.6",
        requirementEs: "El reflexivo principal es diadico y refleja persona/numero del sujeto.",
        shotStatus: "hit-no-edit",
        missProbeEs: "mu se duplica como mu-mu o se analiza como valencia monadica.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.6.1",
        requirementEs: "En reflexivo principal, val1 es el locus de persona y numero.",
        shotStatus: "hit-no-edit",
        missProbeEs: "La formula reflexiva no muestra m en val1 para no primera persona.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.6.2",
        requirementEs: "En reflexivo principal, val2 expresa caso objetivo y alterna u/0 segun alomorfia.",
        shotStatus: "hit-no-edit",
        missProbeEs: "m-u/m-0 se elige por atajo amplio y no por la misma regla de superficie.",
        changedFiles: Object.freeze([]),
    }),
    Object.freeze({
        andrewsRef: "Andrews Lesson 6.7",
        requirementEs: "El paradigma reflexivo Nawat visible usa m-u o m-0 acoplado a la superficie.",
        shotStatus: "hit-no-edit",
        missProbeEs: "mu+ajsi no da m-u/muajsit o mu+altia no da m-0/maltiat con marco de regla.",
        changedFiles: Object.freeze([]),
    }),
]);

const VNC_LESSON7_VALIDATION_REFS = Object.freeze([
    "src/tests/vnc.test.js",
    "src/tests/registry.test.js",
    "src/tests/preterit.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const VNC_LESSON7_PDF_REFS = Object.freeze([
    "Andrews Lesson 7.1",
    "Andrews Lesson 7.2",
    "Andrews Lesson 7.3",
    "Andrews Lesson 7.4",
    "Andrews Lesson 7.5",
    "Andrews Lesson 7.6",
    "Andrews Lesson 7.7",
    "Andrews Lesson 7.8",
    "Andrews Lesson 7.9",
    "Andrews Lesson 7.10",
]);

const VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME = Object.freeze({
    kind: "lesson-7-verbstem-structure-frame",
    sourceSection: "Andrews §7.1",
    stemRole: "lexical-meaning-locus",
    morphology: Object.freeze(["monomorphemic", "polymorphemic"]),
    internalBoundary: "-",
    stemBoundary: "()",
    internalMorphsGlossedIndividually: false,
    analysisPolicy: "stem translation stays unified even when internal morph boundaries are shown",
});

const VNC_LESSON7_CITATION_FORM_FRAME = Object.freeze({
    kind: "lesson-7-citation-form-frame",
    sourceSection: "Andrews §7.2",
    citationUnit: "verbcore",
    verbcoreFormula: "valence + stem",
    directiveEs: "Citar el núcleo verbal con su valencia; no citar una base verbal aislada cuando la valencia decide la ruta.",
    citationObjectMarkers: Object.freeze({
        intransitive: Object.freeze({ classical: "", currentNawat: "" }),
        projectiveHuman: Object.freeze({ classical: "te", currentNawat: "te" }),
        projectiveNonhuman: Object.freeze({ classical: "tla", currentNawat: "ta", orthographyBridge: "Classical tla -> Nawat ta" }),
        reflexive: Object.freeze({ classical: "m-o/m-0", currentNawat: "mu" }),
        reciprocalHuman: Object.freeze({ classical: "t-o/t-0", currentNawat: "mu", implementationBoundary: "current reflexive slot; reciprocal interpretation needs context" }),
    }),
    classicalCitationExamplesAreFixtures: false,
});

const VNC_LESSON7_VERBSTEM_CLASS_FRAME = Object.freeze({
    kind: "lesson-7-verbstem-class-frame",
    sourceSection: "Andrews §7.3",
    classBasis: "perfective-stem-shape",
    imperfectiveIsBasicShape: true,
    classes: Object.freeze({
        A: Object.freeze({
            id: "A",
            perfectiveFormation: "same carrier shape as imperfective, with A-2 long-final-vowel alternants",
            imperfectiveShapes: "one or two",
            totalShapeSummary: "A-1 one shape; A-2 two shapes",
            currentEngineClass: "A",
        }),
        B: Object.freeze({
            id: "B",
            perfectiveFormation: "final vowel disappears or causative final vowel is silently present",
            imperfectiveShapes: "one",
            totalShapeSummary: "two shapes",
            currentEngineClass: "B",
        }),
        C: Object.freeze({
            id: "C",
            perfectiveFormation: "final long a after o/i is replaced by glottal stop",
            imperfectiveShapes: "four",
            totalShapeSummary: "five shapes",
            currentEngineClass: "C",
        }),
        D: Object.freeze({
            id: "D",
            perfectiveFormation: "adds glottal stop after final long a and shortens the vowel",
            imperfectiveShapes: "two",
            totalShapeSummary: "three shapes",
            currentEngineClass: "D",
        }),
    }),
    currentEngineUsesClassLabels: Object.freeze(["A", "B", "C", "D"]),
});

const VNC_LESSON7_CLASS_B_CHANGE_FRAME = Object.freeze({
    kind: "lesson-7-class-b-change-frame",
    sourceSection: "Andrews §7.4",
    trigger: "loss-or-silencing-of-final-vowel",
    changeKinds: Object.freeze(["spelling-change", "phonological-change"]),
    classicalExamples: Object.freeze([
        Object.freeze({ pattern: "k spelling", example: "(miqui) > (mic)", nawatBoundary: "Nawat realization must use repo orthography, not Classical c/qu spelling" }),
        Object.freeze({ pattern: "s spelling", example: "(neci) > (nez)", nawatBoundary: "Nawat realization must use repo orthography" }),
        Object.freeze({ pattern: "m to n-like nasal", example: "(nemi) > (nen)", nawatBoundary: "current preterit classes decide attested output" }),
        Object.freeze({ pattern: "y to s/x", example: "(tlaoco-ya) > (tlaoco-x)", nawatBoundary: "Nawat h/j/x/s choices remain evidence-gated" }),
    ]),
    traditionalSpellingWarning: "oa/ia spellings can obscure w/y and mislead class assignment",
});

const VNC_LESSON7_VARIABLE_CLASS_FRAME = Object.freeze({
    kind: "lesson-7-variable-class-frame",
    sourceSection: "Andrews §7.5",
    variableMembership: true,
    typicalValence: "mostly-intransitive",
    classOptions: Object.freeze(["A", "B"]),
    implementationPolicy: "accept class alternatives only from parsed metadata, repo evidence, or user-provided forms",
});

const VNC_LESSON7_CLASS_GUIDELINES = Object.freeze([
    Object.freeze({ id: "monosyllabic-long-a", sourceSection: "Andrews §7.6.1", classId: "D", directiveEs: "Monosílabos con a larga final pertenecen a clase D; otros monosílabos tienden a clase A." }),
    Object.freeze({ id: "final-vowel-after-cluster", sourceSection: "Andrews §7.6.2", classId: "A", directiveEs: "Final precedido por dos consonantes o consonante larga apunta a clase A." }),
    Object.freeze({ id: "final-ka", sourceSection: "Andrews §7.6.3", classId: "A", directiveEs: "Sílabas finales ka apuntan a clase A, con excepciones evidence-gated." }),
    Object.freeze({ id: "final-tla", sourceSection: "Andrews §7.6.4", classId: "A", directiveEs: "Sílabas finales tla apuntan a clase A en la regla clásica; en Nawat la letra visible pasa por ta." }),
    Object.freeze({ id: "intransitive-wa-change", sourceSection: "Andrews §7.6.5", classId: "A", directiveEs: "Intransitivos en wa que significan cambio apuntan a clase A." }),
    Object.freeze({ id: "final-ya", sourceSection: "Andrews §7.6.6", classId: "B", directiveEs: "Final ya apunta a clase B, con opción A frecuente en intransitivos." }),
    Object.freeze({ id: "final-o", sourceSection: "Andrews §7.6.7", classId: "A", directiveEs: "Final o corta o larga apunta a clase A." }),
    Object.freeze({ id: "class-d-list", sourceSection: "Andrews §7.6.8", classId: "D", directiveEs: "La lista cerrada de ocho troncos clase D se conserva como regla de clasificación, no como fixture Nawat automática." }),
]);

const VNC_LESSON7_PREDICATE_FORMATION_FRAME = Object.freeze({
    kind: "lesson-7-predicate-formation-frame",
    sourceSection: "Andrews §7.7",
    predicateConstituents: Object.freeze(["core", "tense"]),
    cooperatesWithSubjectPronounsFrom: "Andrews §5.4",
    indicativeSide: Object.freeze(["present", "customary-present", "imperfect", "future", "preterit", "distant-past"]),
    nonIndicativeSide: Object.freeze(["nonpast-optative", "past-optative", "nonpast-admonitive"]),
    currentNawatImplementedTenses: Object.freeze(["presente", "presente-habitual", "imperfecto", "futuro", "preterito", "pasado-remoto", "optativo", "presente-desiderativo"]),
    currentEngineSurfaces: "TENSE_SUFFIX_RULES plus preterit class routing and suppletive path gates",
});

const VNC_LESSON7_ANALYSIS_FRAME = Object.freeze({
    kind: "lesson-7-analysis-translation-frame",
    sourceSection: "Andrews §7.8",
    requiredDivision: "subject-plus-predicate",
    linearAnalysisOrder: Object.freeze(["morphic-carrier", "morphic-content", "translation"]),
    diagrammaticAnalysisOrder: Object.freeze(["morphic-carrier", "function-unit", "translation-equivalent"]),
    ambiguityPolicy: "ambiguous surfaces require structural analysis rather than surface-only translation",
    supportiveInitialVowelPolicy: "supportive initial i may drop after reflexive or nonspecific nonhuman object, but real initial vowels do not",
});

const VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME = Object.freeze({
    kind: "lesson-7-indefinite-personal-object-frame",
    sourceSection: "Andrews §7.9",
    humanIndefinite: Object.freeze({ classical: "te", currentNawat: "te", relatesTo: Object.freeze(["reflexive", "specific projective personal objects"]) }),
    nonhumanIndefinite: Object.freeze({ classical: "tla", currentNawat: "ta", relatesTo: Object.freeze(["3sg/3common", "3pl animate"]) }),
    indefiniteRange: Object.freeze(["nonspecific", "vague", "total"]),
    implementationBoundary: "object controls may explain relationships; they do not prove a clause relation by surface alone",
});

const VNC_LESSON7_TA_FUSION_FRAME = Object.freeze({
    kind: "lesson-7-ta-fusion-frame",
    sourceSection: "Andrews §7.10",
    classicalName: "tla fusion",
    visibleNawatName: "fusión ta",
    processKind: "derivational",
    sourceStructure: "tla + transitive stem",
    targetStructure: "derived intransitive verbstem",
    objectSlotAfterFusion: "none",
    meaningMayShift: true,
    boundaryTest: "incorporated adverb before tla/ta indicates that the nonspecific object has fused into the stem",
    generationPolicy: "treat as stem derivation evidence, not as an obj1 prefix at finite-generation time",
});

const VNC_LESSON7_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson7-verbstem-structure",
        andrewsSection: "7.1",
        category: "verbstem-morphemic-structure",
        directiveEs: "El tronco verbal porta el significado léxico y puede ser mono- o polimorfémico; sus morfos internos no se glosan como palabras separadas.",
        engineSurface: "stem frame and parser morph-boundary diagnostics",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson7-citation-form",
        andrewsSection: "7.2",
        category: "verbcore-citation-form",
        directiveEs: "La cita verbal debe incluir valencia: núcleo verbal = valencia + tronco.",
        engineSurface: "parseVerbInput valence metadata and object-prefix gates",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson7-verbstem-classes",
        andrewsSection: "7.3",
        category: "verbstem-classes",
        directiveEs: "Las clases A/B/C/D dependen de la forma perfectiva frente a la imperfectiva básica.",
        engineSurface: "preterit class routing and verbstem class profile metadata",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson7-class-b-changes",
        andrewsSection: "7.4",
        category: "class-b-perfective-changes",
        directiveEs: "La pérdida o silencio de la vocal final en clase B provoca cambios ortográficos o fonológicos; la realización Nawat requiere evidencia local.",
        engineSurface: "preterit class allomorphy and orthography bridge diagnostics",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson7-variable-class",
        andrewsSection: "7.5",
        category: "variable-class-membership",
        directiveEs: "Algunos verbos pueden pertenecer a A o B sin contraste; las alternativas se aceptan solo con metadatos o evidencia.",
        engineSurface: "variant-by-class metadata and preterit class selection",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson7-class-guidelines",
        andrewsSection: "7.6",
        category: "class-determination-guidelines",
        directiveEs: "Las guías de clase orientan clasificación; no sustituyen evidencia léxica Nawat/Pipil.",
        engineSurface: "class guessers, parsed metadata, and preterit class tests",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-diagnostic",
        implementationState: "implemented-diagnostic",
    }),
    Object.freeze({
        id: "lesson7-predicate-formation",
        andrewsSection: "7.7",
        category: "core-tense-predicate-formation",
        directiveEs: "Las variantes de tronco cooperan con el slot tiempo para formar el predicado de la CNV.",
        engineSurface: "TENSE_SUFFIX_RULES and preterit class routing",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson7-analysis-translation",
        andrewsSection: "7.8",
        category: "vnc-analysis-translation",
        directiveEs: "La traducción debe respetar la división obligatoria sujeto + predicado y no depender solo de la superficie.",
        engineSurface: "nuclearClauseShell, grammarFrame, and formula echo diagnostics",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-audited",
        implementationState: "implemented-audited",
    }),
    Object.freeze({
        id: "lesson7-indefinite-personal-object-relationship",
        andrewsSection: "7.9",
        category: "indefinite-personal-object-relationship",
        directiveEs: "Relacionar te/ta indefinidos con objetos personales específicos sin colapsarlos en la misma función.",
        engineSurface: "object-prefix sets and valency-frame metadata",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
    Object.freeze({
        id: "lesson7-ta-fusion",
        andrewsSection: "7.10",
        category: "ta-fusion-derivation",
        directiveEs: "La fusión ta es derivación: ta + tronco transitivo produce un tronco intransitivo nuevo, no un obj1 visible.",
        engineSurface: "ta-fusion parser metadata and intransitive derived-stem boundary",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        implementationState: "implemented-adapted",
    }),
]);

// Shared agreement combo validation extracted to src/core/agreement/combo_validation.js
// Shared morphology support extracted to src/core/generation/morphology_support.js
// Shared morphology engine extracted to src/core/generation/morphology_engine.js

function cloneVncLesson5Array(value) {
    return Array.isArray(value) ? value.map((entry) => cloneVncLesson5Record(entry)) : value;
}

function cloneVncLesson5Record(value) {
    if (Array.isArray(value)) {
        return cloneVncLesson5Array(value);
    }
    if (!value || typeof value !== "object") {
        return value;
    }
    return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, cloneVncLesson5Record(entry)])
    );
}

function getVncLesson5IntransitiveFormulaFrame() {
    return cloneVncLesson5Record(VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME);
}

function getVncLesson5SubjectSlotFrame() {
    return cloneVncLesson5Record(VNC_LESSON5_SUBJECT_SLOT_FRAME);
}

function getVncLesson5SubjectFillerParadigms() {
    return cloneVncLesson5Array(VNC_LESSON5_SUBJECT_FILLER_PARADIGMS);
}

function getVncLesson5TenseMorphFrame() {
    return cloneVncLesson5Record(VNC_LESSON5_TENSE_MORPH_FRAME);
}

function getVncLesson5SubsectionInventory() {
    return VNC_LESSON5_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
        generationPolicy: "solo por rutas de cláusula verbal existentes con evidencia Nawat/Pipil; esta auditoría no crea fixtures",
    }));
}

function buildVncLesson5PursuitFrame() {
    const inventory = getVncLesson5SubsectionInventory();
    return {
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 5,
        aimStatus: "closest-pass",
        pdfRefs: Array.from(VNC_LESSON5_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.1-5.5 por la ruta de entrada a salida como comportamiento de fórmula de cláusula verbal intransitiva, rellenos de sujeto y tiempo, con sonda de fallo para detectar superficie optativa shi con metadatos pers1 todavía ti o an.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
            {
                id: "lesson-5-optative-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.4-5.5 por la ruta de entrada a salida como comportamiento de autoridad de fórmula optativa, con sonda de fallo para detectar existencia de salida plural optativa que conserve Ø-t, k-et o sufijo plegado en vez de k-an en num1-num2.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
            {
                id: "lesson-5-tense-morph-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.5 por la ruta de entrada a salida como comportamiento de morfo en la ranura tiempo para cada tiempo finito implementado, con sonda de fallo para detectar existencia de fórmula que muestre presente-desiderativo, condicional, perfecto, pluscuamperfecto o condicional-perfecto como texto de ranura.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la Lección 5 conserva referencias de PDF por subsección, directivas en español, fórmula intransitiva, paradigmas de sujeto, inventario de tiempo y política Nawat; la ruta de entrada a salida corrige el comportamiento del relleno de sujeto optativo shi, y la sonda de fallo contra existencia sola es una fórmula visible que deje ti/an en pers1 cuando la superficie generada usa shi.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
            {
                id: "lesson-5-optative-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews ahora domina la ruta de entrada a salida como comportamiento de optativo plural; la sonda de fallo contra existencia sola es una salida o metadato plural optativo que deje Ø-t, k-et o sufijo plegado donde num1-num2 debe ser k-an.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
            {
                id: "lesson-5-tense-morph-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la ranura tiempo de fórmula ahora usa morfos de tiempo por la ruta de entrada a salida como comportamiento de las rutas finitas implementadas; la sonda de fallo contra existencia sola es que una clave como condicional-perfecto aparezca en la fórmula donde debe estar el morfo tuskia.",
                andrewsRefs: Array.from(VNC_LESSON5_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
            },
        ],
        subsectionInventory: inventory,
        formulaFrame: getVncLesson5IntransitiveFormulaFrame(),
        subjectSlotFrame: getVncLesson5SubjectSlotFrame(),
        subjectFillerParadigms: getVncLesson5SubjectFillerParadigms(),
        tenseMorphFrame: getVncLesson5TenseMorphFrame(),
        hitCount: 3,
        missCount: 0,
        remainingGaps: [],
        closestPass: true,
    };
}

function getVncLesson6TransitiveFormulaFrame() {
    return cloneVncLesson5Record(VNC_LESSON6_TRANSITIVE_FORMULA_FRAME);
}

function getVncLesson6ObjectCategoryFrame() {
    return cloneVncLesson5Record(VNC_LESSON6_OBJECT_CATEGORY_FRAME);
}

function getVncLesson6MonadicValenceFillers() {
    return cloneVncLesson5Array(VNC_LESSON6_MONADIC_VALENCE_FILLERS);
}

function getVncLesson6DyadicObjectFrame() {
    return cloneVncLesson5Record(VNC_LESSON6_DYADIC_OBJECT_FRAME);
}

function getVncLesson6ProjectiveObjectParadigm() {
    return cloneVncLesson5Array(VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM);
}

function getVncLesson6ReflexiveObjectFrame() {
    return cloneVncLesson5Record(VNC_LESSON6_REFLEXIVE_OBJECT_FRAME);
}

function getVncLesson6SubsectionInventory() {
    return VNC_LESSON6_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
        generationPolicy: "solo por rutas CNV existentes con evidencia Nawat/Pipil; esta auditoría no crea fixtures",
    }));
}

function getVncLesson6ShotReport() {
    return VNC_LESSON6_SHOT_REPORT.map((entry) => ({
        ...entry,
        changedFiles: Array.from(entry.changedFiles || []),
        validationRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
    }));
}

function buildVncLesson6PursuitFrame() {
    const inventory = getVncLesson6SubsectionInventory();
    const shotReport = getVncLesson6ShotReport();
    return {
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 6,
        aimStatus: "closest-pass",
        pdfRefs: Array.from(VNC_LESSON6_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 6.1-6.7 por la ruta de entrada a salida como comportamiento de valencia transitiva, categorías de objeto y realización Nawat, con sonda de fallo para detectar metadatos que existan sin separar valencia monádica, diádica, específica, inespecífica y reflexiva.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
            {
                id: "lesson-6-valence-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar autoridad de fórmula de Andrews: verificar por la ruta de entrada a salida que los objetos específicos y el reflexivo principal usen val1-val2, que te/ta inespecíficos usen val, y que mu no se duplique como objeto y reflexivo; la sonda de fallo es una salida que rinda ki como monádico, ta como diádico o mu-mu.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
            {
                id: "lesson-6-shuntline-ne-direct-generation-audit",
                type: "formula-engine-test",
                aim: "Aplicar autoridad de fórmula de Andrews: verificar por la ruta de entrada a salida que ne de línea secundaria conserve fórmula monádica y genere como Nawat directo; la sonda de fallo es bloquear ne o un metadato que lo llame mu de línea principal.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la Lección 6 conserva referencias de PDF por subsección, directivas en español, metadatos de valencia monádica y diádica, categorías de objeto, paradigmas proyectivo/reflexivo y política Nawat; la sonda de fallo contra existencia sola es que la ruta de entrada a salida no distinga comportamiento específico, inespecífico y reflexivo.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
            {
                id: "lesson-6-valence-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews ahora decide la posición de valencia en la ruta de entrada a salida; los objetos específicos usan val1-val2, te/ta usan val, y mu no se duplica como mu-mu.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
            {
                id: "lesson-6-shuntline-ne-direct-generation-audit",
                result: "hit",
                correction: "Corrección antes de existencia: ne de línea secundaria queda como fórmula monádica activa por la ruta de entrada a salida; la sonda de fallo contra existencia sola es bloquear la superficie Nawat ne o confundirla con mu de línea principal.",
                andrewsRefs: Array.from(VNC_LESSON6_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
            },
        ],
        subsectionInventory: inventory,
        shotReport,
        formulaFrame: getVncLesson6TransitiveFormulaFrame(),
        objectCategoryFrame: getVncLesson6ObjectCategoryFrame(),
        monadicValenceFillers: getVncLesson6MonadicValenceFillers(),
        dyadicObjectFrame: getVncLesson6DyadicObjectFrame(),
        projectiveObjectParadigm: getVncLesson6ProjectiveObjectParadigm(),
        reflexiveObjectFrame: getVncLesson6ReflexiveObjectFrame(),
        hitCount: 3,
        missCount: 0,
        remainingGaps: [],
        closestPass: true,
    };
}

function getVncLesson7VerbstemStructureFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME);
}

function getVncLesson7CitationFormFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_CITATION_FORM_FRAME);
}

function getVncLesson7VerbstemClassFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_VERBSTEM_CLASS_FRAME);
}

function getVncLesson7ClassBChangeFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_CLASS_B_CHANGE_FRAME);
}

function getVncLesson7VariableClassFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_VARIABLE_CLASS_FRAME);
}

function getVncLesson7ClassGuidelines() {
    return cloneVncLesson5Array(VNC_LESSON7_CLASS_GUIDELINES);
}

function getVncLesson7PredicateFormationFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_PREDICATE_FORMATION_FRAME);
}

function getVncLesson7AnalysisFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_ANALYSIS_FRAME);
}

function getVncLesson7ObjectRelationshipFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME);
}

function getVncLesson7TaFusionFrame() {
    return cloneVncLesson5Record(VNC_LESSON7_TA_FUSION_FRAME);
}

function getVncLesson7SubsectionInventory() {
    return VNC_LESSON7_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON7_VALIDATION_REFS),
        generationPolicy: "solo por rutas CNV existentes con evidencia Nawat/Pipil; esta auditoría no crea fixtures",
    }));
}

function buildVncLesson7PursuitFrame() {
    const inventory = getVncLesson7SubsectionInventory();
    return {
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 7,
        aimStatus: "closest-pass",
        pdfRefs: Array.from(VNC_LESSON7_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 7.1-7.10 against verbcore citation, verbstem classes, perfective/imperfective class routing, analysis frames, object relationships, and ta-fusion derivation boundaries.",
                andrewsRefs: Array.from(VNC_LESSON7_PDF_REFS),
                expectedFeedbackRefs: Array.from(VNC_LESSON7_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                result: "hit",
                correction: "Lesson 7 now carries subsection PDF refs, Spanish directives, verbcore citation policy, A/B/C/D class frames, predicate-formation inventory, analysis boundaries, object-relationship metadata, and ta-fusion derivation policy.",
                andrewsRefs: Array.from(VNC_LESSON7_PDF_REFS),
                feedbackRefs: Array.from(VNC_LESSON7_VALIDATION_REFS),
            },
        ],
        subsectionInventory: inventory,
        verbstemStructureFrame: getVncLesson7VerbstemStructureFrame(),
        citationFormFrame: getVncLesson7CitationFormFrame(),
        verbstemClassFrame: getVncLesson7VerbstemClassFrame(),
        classBChangeFrame: getVncLesson7ClassBChangeFrame(),
        variableClassFrame: getVncLesson7VariableClassFrame(),
        classGuidelines: getVncLesson7ClassGuidelines(),
        predicateFormationFrame: getVncLesson7PredicateFormationFrame(),
        analysisFrame: getVncLesson7AnalysisFrame(),
        objectRelationshipFrame: getVncLesson7ObjectRelationshipFrame(),
        taFusionFrame: getVncLesson7TaFusionFrame(),
        hitCount: 1,
        missCount: 0,
        remainingGaps: [],
        closestPass: true,
    };
}

function parseAdjectivalNncFunctionEntryContract(dataset = {}) {
    const rawContract = String(dataset.adjectivalNncFunctionContract || "").trim();
    if (!rawContract) {
        return null;
    }
    try {
        const parsed = JSON.parse(rawContract);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch (_error) {
        return null;
    }
}

function normalizeAdjectivalNncFunctionSurfaceValue(value = "") {
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitAdjectivalNncFunctionSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdjectivalNncFunctionSurfaceValue(entry))
        .filter(Boolean);
}

function getAdjectivalNncFunctionEntryContractFrame(contract = null) {
    const source = contract && typeof contract === "object" ? contract : {};
    return (
        (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null)
        || (source.frames && typeof source.frames === "object" ? source.frames : null)
    );
}

function hasAdjectivalNncFunctionEntryContractResultFrame(contract = null) {
    const frame = getAdjectivalNncFunctionEntryContractFrame(contract);
    return Boolean(frame?.resultFrame && typeof frame.resultFrame === "object");
}

function getAdjectivalNncFunctionEntryContractSurface(contract = null) {
    const source = contract && typeof contract === "object" ? contract : {};
    const frame = getAdjectivalNncFunctionEntryContractFrame(source);
    const resultFrame = frame?.resultFrame && typeof frame.resultFrame === "object"
        ? frame.resultFrame
        : null;
    const forms = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
    }
    if (resultFrame) {
        return forms
            .flatMap((entry) => splitAdjectivalNncFunctionSurfaceText(entry))
            .find(Boolean)
            || "";
    }
    if (source.surface) {
        forms.push(source.surface);
    }
    return forms
        .flatMap((entry) => splitAdjectivalNncFunctionSurfaceText(entry))
        .find(Boolean)
        || "";
}

function getAdjectivalNncFunctionEntrySourceFormulaSlots(frame = null) {
    const source = frame && typeof frame === "object" ? frame : {};
    const formulaSlots = source.morphBoundaryFrame?.formulaSlots;
    return formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
}

function getAdjectivalNncFunctionEntryFormulaSlotSurface(slot = null, fields = []) {
    const source = slot && typeof slot === "object" ? slot : {};
    const fieldNames = Array.isArray(fields) ? fields : [fields];
    for (const field of fieldNames) {
        const value = normalizeAdjectivalNncFunctionSurfaceValue(source[field]);
        if (value) {
            return value === "Ø" ? "" : value;
        }
    }
    return "";
}

function getAdjectivalNncFunctionEntryNounClass(connectorSlot = null) {
    const slot = connectorSlot && typeof connectorSlot === "object" ? connectorSlot : {};
    const nounClass = String(slot.nounClass || "").trim().toLowerCase();
    if (nounClass === "0" || nounClass === "ø" || nounClass === "zero") {
        return "zero";
    }
    if (["t", "ti", "in"].includes(nounClass)) {
        return nounClass;
    }
    const connector = String(slot.connector || slot.surface || "").trim().toLowerCase();
    if (!connector || connector === "ø") {
        return "zero";
    }
    return ["t", "ti", "in"].includes(connector) ? connector : "";
}

function resolveAdjectivalNncFunctionOverrideFromInput(troncoControl = null) {
    const dataset = troncoControl?.dataset || {};
    const currentSurface = String(troncoControl?.value || "").trim();
    const entryRouteContract = parseAdjectivalNncFunctionEntryContract(dataset);
    const entryGrammarFrame = getAdjectivalNncFunctionEntryContractFrame(entryRouteContract);
    const hasEntryResultFrame = hasAdjectivalNncFunctionEntryContractResultFrame(entryRouteContract);
    const targetSurface = getAdjectivalNncFunctionEntryContractSurface(entryRouteContract)
        || (!hasEntryResultFrame
            ? normalizeAdjectivalNncFunctionSurfaceValue(dataset.adjectivalNncFunctionSurface)
            : "");
    if (!currentSurface || !targetSurface || currentSurface !== targetSurface) {
        return null;
    }
    const formation = String(dataset.adjectivalNncFormation || "").trim();
    const nominalizedVncKind = String(dataset.nominalizedVncKind || "").trim();
    const patientivoSource = String(dataset.patientivoSource || "").trim();
    const formulaEcho = String(dataset.adjectivalNncFormulaEcho || "").trim();
    const sourceContract = entryGrammarFrame?.routeContract?.sourceContract || {};
    const stemFrame = entryGrammarFrame?.stemFrame || {};
    const inflectionFrame = entryGrammarFrame?.inflectionFrame || {};
    const formulaSlots = getAdjectivalNncFunctionEntrySourceFormulaSlots(entryGrammarFrame);
    const entrySourceFormulaSlots = entryRouteContract?.sourceFormulaSlots
        && typeof entryRouteContract.sourceFormulaSlots === "object"
        ? entryRouteContract.sourceFormulaSlots
        : null;
    const entrySourceFormulaEcho = String(entryRouteContract?.sourceFormulaEcho || "").trim();
    const entrySourceCompoundFrame = entryRouteContract?.sourceCompoundFrame
        && typeof entryRouteContract.sourceCompoundFrame === "object"
        ? entryRouteContract.sourceCompoundFrame
        : null;
    const entrySourceDenominalCompoundFrame = entryRouteContract?.sourceDenominalCompoundFrame
        && typeof entryRouteContract.sourceDenominalCompoundFrame === "object"
        ? entryRouteContract.sourceDenominalCompoundFrame
        : null;
    const predicateSlot = formulaSlots?.predicateStem || null;
    const subjectSlot = formulaSlots?.pers1Pers2 || null;
    const connectorSlot = formulaSlots?.num1Num2 || null;
    const adjectivalNnc = {
        enabled: true,
        stem: targetSurface,
        surface: targetSurface,
        surfaceForms: targetSurface ? [targetSurface] : [],
        state: "absolutive",
        role: "predicate-surface",
    };
    if (entryGrammarFrame) {
        adjectivalNnc.grammarFrame = entryGrammarFrame;
        adjectivalNnc.frames = entryGrammarFrame;
    }
    if (formation) {
        adjectivalNnc.formation = formation;
    }
    if (formation === "patientive-adjectival") {
        adjectivalNnc.patientivoSurface = targetSurface;
        adjectivalNnc.patientivoSource = patientivoSource;
    }
    if (formation === "ordinary-absolutive") {
        const sourceStem = getAdjectivalNncFunctionEntryFormulaSlotSurface(predicateSlot, ["stem", "surface"])
            || String(stemFrame.sourceStem || stemFrame.stem || "").trim();
        if (sourceStem) {
            adjectivalNnc.stem = sourceStem;
            adjectivalNnc.sourceStem = sourceStem;
            adjectivalNnc.predicateStem = sourceStem;
        }
        adjectivalNnc.pers1 = String(subjectSlot?.prefix || "").trim();
        adjectivalNnc.pers2 = String(subjectSlot?.suffix || "").trim();
        adjectivalNnc.subjectKey = String(subjectSlot?.personSubKey || subjectSlot?.label || "").trim();
        adjectivalNnc.nounClass = getAdjectivalNncFunctionEntryNounClass(connectorSlot);
        adjectivalNnc.number = String(connectorSlot?.referenceNumber || "").trim() || "singular";
        adjectivalNnc.pluralType = String(connectorSlot?.pluralType || "").trim() || "auto";
    }
    if (formation === "intensified-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "compound-source-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        adjectivalNnc.compoundSourceSurface = targetSurface;
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.sourceCompoundFrame = entrySourceCompoundFrame;
        adjectivalNnc.compoundFrame = entrySourceCompoundFrame;
        adjectivalNnc.nominalizedVncKind = nominalizedVncKind || "adjectival-surface";
        adjectivalNnc.nominalizationProfile = {
            role: {
                nominalizationKind: nominalizedVncKind || "adjectival-surface",
                adjectivalFunction: "predicate-surface",
            },
            predicateState: { value: "absolutive" },
        };
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "denominal-compound-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        adjectivalNnc.denominalCompoundSurface = targetSurface;
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.sourceDenominalCompoundFrame = entrySourceDenominalCompoundFrame;
        adjectivalNnc.denominalCompoundFrame = entrySourceDenominalCompoundFrame;
        adjectivalNnc.nominalizedVncKind = nominalizedVncKind || "preterit-agentive";
        adjectivalNnc.nominalizationProfile = {
            role: {
                nominalizationKind: nominalizedVncKind || "preterit-agentive",
                adjectivalFunction: "predicate-surface",
            },
            predicateState: { value: "absolutive" },
        };
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "vnc-adjectival") {
        adjectivalNnc.vncSurface = targetSurface;
        adjectivalNnc.sourceVerb = String(
            sourceContract.sourceVerb
            || stemFrame.sourceVerb
            || stemFrame.sourceStem
            || ""
        ).trim();
        adjectivalNnc.sourceTenseValue = String(
            sourceContract.sourceTenseValue
            || inflectionFrame.sourceTenseValue
            || ""
        ).trim();
        adjectivalNnc.sourceCombinedMode = String(
            sourceContract.sourceCombinedMode
            || inflectionFrame.sourceCombinedMode
            || ""
        ).trim();
        adjectivalNnc.sourceVoiceMode = String(
            sourceContract.sourceVoiceMode
            || inflectionFrame.sourceVoiceMode
            || ""
        ).trim();
    }
    if (formation === "nominalized-vnc-adjectival") {
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.nominalizationProfile = {
            role: { nominalizationKind: nominalizedVncKind },
            predicateState: { value: "absolutive" },
        };
    }
    if (formulaEcho) {
        adjectivalNnc.formulaEcho = formulaEcho;
    }
    if (entryRouteContract) {
        adjectivalNnc.entryRouteContract = entryRouteContract;
        adjectivalNnc.sourceAuthorityRefs = Array.isArray(entryRouteContract.authorityRefs)
            ? entryRouteContract.authorityRefs.slice()
            : [];
        adjectivalNnc.sourceEvidenceStatus = entryRouteContract.evidenceStatus || "";
        adjectivalNnc.sourceRouteFamily = entryRouteContract.routeFamily || "";
        adjectivalNnc.sourceRouteStage = entryRouteContract.routeStage || "";
    }
    return {
        posicionesFormula: {
            pers1: "",
            tronco: targetSurface,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "adjectival-nnc",
        },
        tenseMode: TENSE_MODE.adjetivo,
        derivationMode: DERIVATION_MODE.active,
        voiceMode: VOICE_MODE.active,
        adjectivalNnc,
    };
}

function generateNuclearClauseSurface(options = {}) {
    if (typeof Event !== "undefined" && options instanceof Event) {
        options = {};
    }
    options = sanitizeNuclearClauseSurfaceOptions(options);
    const silent = options.silent === true;
    const pers1Control = document.getElementById("subject-prefix");
    const pers2Control = document.getElementById("subject-suffix");
    const troncoControl = document.getElementById("verb");
    if (getActiveTenseMode() === TENSE_MODE.particula) {
        const candidate = String(troncoControl?.value || "").trim();
        const model = typeof buildParticleModeDisplayModel === "function"
            ? buildParticleModeDisplayModel({ candidate, source: "generate-action" })
            : null;
        if (!silent) {
            if (troncoControl) {
                troncoControl.classList.remove("error");
            }
            updateVerbRuleHint({ verb: "" });
            updateVerbDisambiguation("");
            renderAllOutputs({
                verb: candidate,
                objectPrefix: "",
            });
        }
        return model;
    }
    const inputAdjectivalOverride = options.override
        ? null
        : resolveAdjectivalNncFunctionOverrideFromInput(troncoControl);
    const override = options.override || inputAdjectivalOverride;
    if (inputAdjectivalOverride) {
        options = {
            ...options,
            override,
        };
    }
    const troncoInputSource = resolveVerbInputSource(troncoControl?.value || "");
    const hasExplicitFormulaPositions = options.posicionesFormula && typeof options.posicionesFormula === "object";
    const explicitEntradaGrammarObject = options.entradaGrammarObject && typeof options.entradaGrammarObject === "object"
        ? options.entradaGrammarObject
        : null;
    const posicionesFormula = getNuclearClauseSurfacePosicionesFormula({
        override,
        posicionesFormula: options.posicionesFormula,
        pers1Control,
        pers2Control,
        troncoControl,
        troncoInputSource,
    });
    return executeNuclearClauseSurfaceRequest({
        options,
        entradaGrammarObject: explicitEntradaGrammarObject,
        posicionesFormula,
        entradaTronco: {
            tieneControlTronco: Boolean(troncoControl),
            valorTronco: troncoControl?.value || "",
            entradaGrammarObject: explicitEntradaGrammarObject || (hasExplicitFormulaPositions ? null : (troncoInputSource.entradaGrammarObject || null)),
        },
        uiHooks: {
            clearError: (id) => {
                if (silent) {
                    return;
                }
                const el = document.getElementById(id);
                if (el) {
                    el.classList.remove("error");
                }
                if (id === "verb" && troncoControl) {
                    troncoControl.classList.remove("error");
                }
            },
            setError: (id) => {
                if (silent) {
                    return;
                }
                const el = document.getElementById(id);
                if (el) {
                    el.classList.add("error");
                }
                if (id === "verb" && troncoControl) {
                    troncoControl.classList.add("error");
                }
            },
            onSearchQueryOnly: ({ valorTronco: currentValue }) => {
                updateVerbRuleHint({ verb: "" });
                updateVerbDisambiguation("");
                maybeAutoScrollToConjugationRow(currentValue, { allowSwitch: false });
            },
            onValidationError: ({ tiempo, obj1Base }) => {
                updateVerbRuleHint({ verb: "" });
                updateVerbDisambiguation("");
                renderAllOutputs({
                    verb: getVerbInputMeta().displayVerb,
                    objectPrefix: obj1Base,
                    tense: tiempo,
                });
            },
            onEntradaTroncoSync: ({ siguienteValorTronco }) => {
                if (!troncoControl) {
                    return;
                }
                troncoControl.value = siguienteValorTronco;
                troncoControl.dataset.prevValue = siguienteValorTronco;
                if (typeof renderVerbMirror === "function") {
                    renderVerbMirror();
                }
            },
            onAnalisisTroncoResuelto: ({
                tronco,
                troncoAnalisis,
                troncoAnalisisExacto,
                obj1Morfologico,
                fuerzaTransitivaBase,
                isYawi,
                isWeya,
                resolvedDerivationType,
                parsedVerb,
                troncoRender,
            }) => {
                updateVerbRuleHint({
                    verb: tronco,
                    analysisVerb: troncoAnalisis,
                    exactBaseVerb: troncoAnalisisExacto,
                    objectPrefix: obj1Morfologico,
                    forceTransitive: fuerzaTransitivaBase,
                    isYawi,
                    isWeya,
                    ...buildMorphologyMetaOptions(parsedVerb),
                    derivationType: resolvedDerivationType,
                });
                updateVerbDisambiguation(troncoControl ? troncoControl.value : troncoRender);
            },
            onComplete: ({
                textoGenerado,
                analisisTronco,
                procedenciaTronco,
                tiempo,
                troncoRender,
                obj1Base,
            }) => {
                rememberScreenCalculatorAnsState({
                    generatedText: textoGenerado,
                    parsedVerb: analisisTronco,
                    stemProvenance: procedenciaTronco,
                    tense: tiempo,
                });
                renderAllOutputs({
                    verb: troncoRender,
                    objectPrefix: obj1Base,
                    tense: tiempo,
                });
            },
        },
    });
}

function generateWord(options = {}) {
    return generateNuclearClauseSurface(options);
}
