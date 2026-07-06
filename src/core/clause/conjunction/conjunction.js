// core/clause/conjunction/conjunction.js
// Lesson 52 conjunction boundary metadata. This keeps current parser
// separators, translations, and generated word variants separate from
// confirmed clause-level conjunction or parallel-structure modeling.

"use strict";

const CONJUNCTION_CLAUSE_BOUNDARY_VERSION = 1;

const CONJUNCTION_CLAUSE_RELATION = Object.freeze({
    marked: "marked",
    unmarked: "unmarked",
    correlative: "correlative",
    parallelStructure: "parallel-structure",
    lexicalInnovation: "lexical-innovation",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_COORDINATION_TYPE = Object.freeze({
    additive: "additive",
    alternative: "alternative",
    adversative: "adversative",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_UNIT = Object.freeze({
    word: "word",
    nnc: "nnc",
    vnc: "vnc",
    clause: "clause",
    sentence: "sentence",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_LEVEL = Object.freeze({
    principal: "principal-clause-level",
    adjoined: "adjoined-clause-level",
    lexicalUnit: "lexical-unit-level",
    particleUnit: "particle-unit-level",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_MARKING = Object.freeze({
    unmarked: "unmarked",
    auh: "auh",
    adverbialModifier: "adverbial-modifier",
    correlativeParticle: "correlative-particle",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_PARALLELISM = Object.freeze({
    none: "none",
    rephrasive: "rephrasive",
    progressive: "progressive",
    appositive: "appositive",
    combined: "combined",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_LEXICAL_INNOVATION = Object.freeze({
    none: "none",
    biclausalism: "biclausalism",
    triclausalism: "triclausalism",
    conjunctiveCompound: "conjunctive-compound",
    derivedSurvival: "derived-survival",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
    parserSeparator: "parser-separator",
    slashVariant: "slash-variant",
    csvVariant: "csv-variant",
    particleLabel: "particle-label",
    conjunctionTranslation: "conjunction-translation",
    routeLabel: "route-label",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze([
    "conjunction boundary metadata is not generation",
    "parser separators and slash variants are not conjunction AST evidence",
    "CSV alternants are not clause-level conjunction evidence",
    "particle or translation labels are not orthography-bridge conjunction evidence",
    "single generated words do not prove marked, unmarked, correlative, or parallel conjunction",
    "Andrews conjunction categories are architecture, not Nawat/Pipil orthography authority",
]);

const CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "conjuncts",
        asks: "Which Nawat/Pipil words, NNCs, VNCs, clauses, or sentences are conjoined?",
    }),
    Object.freeze({
        field: "marker",
        asks: "What Andrews marker model or orthographic absence is evidenced?",
    }),
    Object.freeze({
        field: "conjunctionRelation",
        asks: "Is the relation marked, unmarked, correlative, parallel, lexicalized, or unknown?",
    }),
    Object.freeze({
        field: "unitType",
        asks: "Are the conjuncts words, NNCs, VNCs, clauses, sentences, or unknown?",
    }),
    Object.freeze({
        field: "parallelism",
        asks: "What evidence supports parallel structure or lexical innovation by conjunction?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Andrews source model or user-provided clause context supports conjunction?",
    }),
]);

function normalizeConjunctionClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeConjunctionClauseRelation(value = "") {
    return normalizeConjunctionClauseEnum(
        value,
        Object.values(CONJUNCTION_CLAUSE_RELATION),
        CONJUNCTION_CLAUSE_RELATION.unknown
    );
}

function normalizeConjunctionClauseCoordinationType(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        and: CONJUNCTION_CLAUSE_COORDINATION_TYPE.additive,
        or: CONJUNCTION_CLAUSE_COORDINATION_TYPE.alternative,
        but: CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative,
    };
    return aliases[normalized] || normalizeConjunctionClauseEnum(
        normalized,
        Object.values(CONJUNCTION_CLAUSE_COORDINATION_TYPE),
        CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown
    );
}

function normalizeConjunctionClauseUnit(value = "") {
    return normalizeConjunctionClauseEnum(
        value,
        Object.values(CONJUNCTION_CLAUSE_UNIT),
        CONJUNCTION_CLAUSE_UNIT.unknown
    );
}

function normalizeConjunctionClauseLevel(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        principal: CONJUNCTION_CLAUSE_LEVEL.principal,
        adjoined: CONJUNCTION_CLAUSE_LEVEL.adjoined,
        adjunct: CONJUNCTION_CLAUSE_LEVEL.adjoined,
        lexical: CONJUNCTION_CLAUSE_LEVEL.lexicalUnit,
        "lexical-unit": CONJUNCTION_CLAUSE_LEVEL.lexicalUnit,
        particle: CONJUNCTION_CLAUSE_LEVEL.particleUnit,
    };
    return aliases[normalized] || normalizeConjunctionClauseEnum(
        normalized,
        Object.values(CONJUNCTION_CLAUSE_LEVEL),
        CONJUNCTION_CLAUSE_LEVEL.unknown
    );
}

function normalizeConjunctionClauseMarking(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        "": CONJUNCTION_CLAUSE_MARKING.unmarked,
        none: CONJUNCTION_CLAUSE_MARKING.unmarked,
        unmarked: CONJUNCTION_CLAUSE_MARKING.unmarked,
        marked: CONJUNCTION_CLAUSE_MARKING.auh,
        auh: CONJUNCTION_CLAUSE_MARKING.auh,
        auj: CONJUNCTION_CLAUSE_MARKING.auh,
        ihuan: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        ijuan: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        "no": CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        oc: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        "no-zo": CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        ahzo: CONJUNCTION_CLAUSE_MARKING.correlativeParticle,
        "ahzo-ahzo": CONJUNCTION_CLAUSE_MARKING.correlativeParticle,
        "ahmo-no": CONJUNCTION_CLAUSE_MARKING.correlativeParticle,
    };
    return aliases[normalized] || normalizeConjunctionClauseEnum(
        normalized,
        Object.values(CONJUNCTION_CLAUSE_MARKING),
        CONJUNCTION_CLAUSE_MARKING.unknown
    );
}

function normalizeConjunctionClauseParallelism(value = "") {
    return normalizeConjunctionClauseEnum(
        value,
        Object.values(CONJUNCTION_CLAUSE_PARALLELISM),
        CONJUNCTION_CLAUSE_PARALLELISM.unknown
    );
}

function normalizeConjunctionClauseLexicalInnovation(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        none: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none,
        biclausal: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism,
        biclausalism: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism,
        triclausal: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
        triclausalism: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
        compound: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.conjunctiveCompound,
        derived: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.derivedSurvival,
    };
    return aliases[normalized] || normalizeConjunctionClauseEnum(
        normalized,
        Object.values(CONJUNCTION_CLAUSE_LEXICAL_INNOVATION),
        CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown
    );
}

function normalizeConjunctionClauseFalsePositiveSource(value = "") {
    return normalizeConjunctionClauseEnum(
        value,
        Object.values(CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE),
        CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getConjunctionClauseAntiConflationRules() {
    return Array.from(CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES);
}

function getConjunctionClauseStructuralQuestions() {
    return CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function attachConjunctionClauseGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "conjunction-clause-boundary",
        routeFamily: "conjunction-clause",
        ...options,
    });
}

const LESSON52_CONJUNCTION_VALIDATION_REFS = Object.freeze([
    "src/tests/conjunction.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON52_CONJUNCTION_PDF_REFS = Object.freeze([
    "Andrews Lesson 52.1",
    "Andrews Lesson 52.2",
    "Andrews Lesson 52.3",
    "Andrews Lesson 52.4",
    "Andrews Lesson 52.5",
    "Andrews Lesson 52.6",
    "Andrews Lesson 52.7",
]);

const LESSON52_CONJUNCTION_ARCHITECTURE_FRAME = Object.freeze({
    kind: "lesson-52-conjunction-architecture-frame",
    sourceSection: "Andrews 52.1",
    specialConcatenateStructure: true,
    balancedRelation: true,
    noHead: true,
    conjunctsSameSyntacticRank: true,
    usualConjunctUnits: Object.freeze(["nuclear-clause", "nuclear-clause-group"]),
    exceptionalParticleUnit: "za zan",
    levels: Object.freeze([
        CONJUNCTION_CLAUSE_LEVEL.principal,
        CONJUNCTION_CLAUSE_LEVEL.adjoined,
    ]),
    relationTypes: Object.freeze([
        CONJUNCTION_CLAUSE_COORDINATION_TYPE.additive,
        CONJUNCTION_CLAUSE_COORDINATION_TYPE.alternative,
        CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative,
    ]),
    markednessTypes: Object.freeze([
        CONJUNCTION_CLAUSE_RELATION.marked,
        CONJUNCTION_CLAUSE_RELATION.unmarked,
    ]),
    unmarkedPreferred: true,
});

const LESSON52_UNMARKED_CONJUNCTION_FRAME = Object.freeze({
    kind: "lesson-52-unmarked-conjunction-frame",
    sourceSection: "Andrews 52.2",
    structure: "juxtaposed nuclear clauses or nuclear-clause groups",
    explicitConjunctorRequired: false,
    relationInferredFromContent: true,
    additive: Object.freeze({
        sourceSection: "Andrews 52.2.1",
        positiveAndNegativeSeries: true,
        sharedSupplementUsuallyAfterLastConjunct: true,
        canOperateAtPrincipalAndAdjoinedLevels: true,
        tightSeriesModifierMayAppearBeforeFirstConjunctOnly: true,
    }),
    alternative: Object.freeze({
        sourceSection: "Andrews 52.2.2",
        juxtaposedAlternatives: true,
        adverbialParticlesMaySupportTranslation: true,
    }),
    adversative: Object.freeze({
        sourceSection: "Andrews 52.2.3",
        exactlyTwoConjuncts: true,
        counterbalancedPositiveNegativeContent: true,
    }),
});

const LESSON52_MARKED_CONJUNCTION_FRAME = Object.freeze({
    kind: "lesson-52-marked-conjunction-frame",
    sourceSection: "Andrews 52.3",
    classicalConjunctor: "auh",
    nawatVisibleSpellingRequiresEvidence: true,
    principalClauseOrSentenceLevelUsual: true,
    adjunctLevelPossibleButUnusual: true,
    sentenceInitialAuhCanClaimRightwardConjunctStatus: true,
    additive: Object.freeze({ sourceSection: "Andrews 52.3.1", usesAuh: true }),
    alternative: Object.freeze({ sourceSection: "Andrews 52.3.2", usesAuh: true }),
    adversative: Object.freeze({ sourceSection: "Andrews 52.3.3", usesAuh: true }),
});

const LESSON52_ADVERBIAL_MODIFIER_CONJUNCTION_FRAME = Object.freeze({
    kind: "lesson-52-adverbial-modifier-conjunction-frame",
    sourceSection: "Andrews 52.4",
    notConjunctors: true,
    mayAccompanyMarkedOrUnmarkedConjunction: true,
    additive: Object.freeze({
        sourceSection: "Andrews 52.4.1",
        rightwardModifiers: Object.freeze(["no", "oc", "oc no"]),
        ihuanIsPossessiveStateRelationalNnc: true,
        ihuanIsNotConjunctor: true,
        ihuanNawatVisibleSpellingRequiresEvidence: true,
        negativeModifiers: Object.freeze(["ahno", "ahmo no", "no zo", "no zo eh", "ma no zo", "ma no zo eh"]),
        auhCanCooccurWithAdverbialModifier: true,
    }),
    alternative: Object.freeze({
        sourceSection: "Andrews 52.4.2",
        rightwardParticlesAndCollocations: Object.freeze([
            "ahzo",
            "ahzo eh",
            "no zo",
            "no zo eh",
            "ma no zo",
            "ma no zo eh",
            "ahno zo",
            "ahno zo eh",
        ]),
        oftenPrecededByIn: true,
        markedAuhMayCooccur: true,
    }),
    adversative: Object.freeze({
        sourceSection: "Andrews 52.4.3",
        rightwardModifiers: Object.freeze(["zan", "tel", "yeceh", "yeh", "neh"]),
        yehOrNehMayBeIntroducedByIn: true,
        markedAuhMayCooccur: true,
    }),
});

const LESSON52_CORRELATIVE_CONJUNCTION_FRAME = Object.freeze({
    kind: "lesson-52-correlative-conjunction-frame",
    sourceSection: "Andrews 52.5",
    noConjunctorForEitherOr: true,
    standardCorrelation: Object.freeze({
        sourceSection: "Andrews 52.5.1",
        pairedParticles: Object.freeze(["ahzo ... ahzo", "ahzo eh ... ahzo eh", "ahzo ... ahzo no"]),
        negativePairing: "ahmo no ... ahmo no",
    }),
    looserCorrelation: Object.freeze({
        sourceSection: "Andrews 52.5.2",
        pairedAdverbialOrPronominalNncs: true,
        contrastiveConjunctRelation: true,
    }),
});

const LESSON52_LEXICAL_INNOVATION_FRAME = Object.freeze({
    kind: "lesson-52-lexical-innovation-by-conjunction-frame",
    sourceSection: "Andrews 52.6",
    unmarkedConjunctionCanFuseNncsForLexicalItems: true,
    combinesNuclearClausesNotStems: true,
    metaphoricalDisplacementRequired: true,
    sameReferentAcrossConjoinedSubjectPronounsRequired: true,
    canTransformIntoConjunctiveCompoundNounstem: true,
    possessiveStateCanFormOnCompoundOrOnConjoinedStems: true,
    canSurviveFurtherDerivations: true,
    inUsuallyPrecedesEachNncWhenSupplementOrModifier: true,
    inMayPrecedeOnlyLeftwardConjunct: true,
    lordAndMasterType: Object.freeze({
        sourceSection: "Andrews 52.6.1",
        synonymousOrNearlySynonymousConjuncts: true,
        combinedMeaningUsuallyOneConjunctOrImplication: true,
    }),
    breadAndButterType: Object.freeze({
        sourceSection: "Andrews 52.6.2",
        situationalAssociation: true,
        biclausalismOrTriclausalism: true,
        possessiveOnlyTendencies: true,
        affectiveFormationMustAppearOnAllStems: true,
        simpleConjunctionContrastRequired: true,
    }),
});

const LESSON52_PARALLEL_STRUCTURE_FRAME = Object.freeze({
    kind: "lesson-52-parallel-structure-frame",
    sourceSection: "Andrews 52.7",
    conjunctionCreatesParallelStructure: true,
    rephrasive: Object.freeze({
        sourceSection: "Andrews 52.7 item 1",
        staticRepetitionWithSlightlyDifferentForm: true,
        grammarMayStayOrChange: true,
        recastTypes: Object.freeze([
            "nonspecific-object/specific-object",
            "active/passive",
            "tense-shift",
            "incorporated-object/supplementary-object",
            "intransitive/reflexive-transitive",
        ]),
        relatedAppositiveConstructions: Object.freeze(["clarifying-appositive", "summarizing-appositive"]),
    }),
    progressive: Object.freeze({
        sourceSection: "Andrews 52.7 item 2",
        similarGrammarWithChangedContent: true,
        listlikeCollectionOfStatements: true,
    }),
    combined: Object.freeze({
        sourceSection: "Andrews 52.7 item 3",
        rephrasiveAndProgressiveCanCombine: true,
    }),
});

const LESSON52_CONJUNCTION_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson52-conjunction-overview", andrewsSection: "52.1", category: "conjunction-architecture", directiveEs: "La conjuncion es concatenacion balanceada: no tiene nucleo y sus conjuntivos cooperan en el mismo rango.", engineSurface: "diagnostic conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-unmarked-overview", andrewsSection: "52.2", category: "unmarked-conjunction", directiveEs: "La conjuncion no marcada se lee por yuxtaposicion; el contenido decide si es aditiva, alternativa o adversativa.", engineSurface: "diagnostic unmarked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-unmarked-additive", andrewsSection: "52.2.1", category: "unmarked-additive", directiveEs: "La serie aditiva puede compartir suplemento y operar en nivel principal o adyacente.", engineSurface: "diagnostic unmarked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-unmarked-alternative", andrewsSection: "52.2.2", category: "unmarked-alternative", directiveEs: "La alternativa no marcada depende de la yuxtaposicion y de particulas adverbiales de apoyo.", engineSurface: "diagnostic unmarked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-unmarked-adversative", andrewsSection: "52.2.3", category: "unmarked-adversative", directiveEs: "La adversativa no marcada contrapone dos conjuntivos; no se modela como serie abierta.", engineSurface: "diagnostic unmarked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-marked-overview", andrewsSection: "52.3", category: "marked-conjunction", directiveEs: "La conjuncion marcada introduce auh en la fuente Andrews; la ortografia Nawat visible requiere evidencia.", engineSurface: "diagnostic marked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-marked-additive", andrewsSection: "52.3.1", category: "marked-additive", directiveEs: "Auh puede marcar una relacion aditiva entre oraciones o clausulas principales.", engineSurface: "diagnostic marked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-marked-alternative", andrewsSection: "52.3.2", category: "marked-alternative", directiveEs: "Auh tambien puede aparecer con alternativas, sin convertir particulas adverbiales en conjuntores.", engineSurface: "diagnostic marked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-marked-adversative", andrewsSection: "52.3.3", category: "marked-adversative", directiveEs: "Auh puede marcar una adversativa, usualmente en nivel principal o de oracion.", engineSurface: "diagnostic marked-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-adverbial-modifier-overview", andrewsSection: "52.4", category: "adverbial-modifiers-near-conjunction", directiveEs: "Varias particulas o CNN adverbializadas parecen conjuncion en traduccion, pero Andrews las trata como modificadores.", engineSurface: "diagnostic adverbial-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-adverbial-additive", andrewsSection: "52.4.1", category: "additive-adverbial-modifiers", directiveEs: "No, oc, oc no e ihuan apoyan lectura aditiva; ihuan no es conjunctor.", engineSurface: "diagnostic adverbial-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-adverbial-alternative", andrewsSection: "52.4.2", category: "alternative-adverbial-modifiers", directiveEs: "Ahzo y otras colocaciones apoyan lectura alternativa donde el ingles espera or.", engineSurface: "diagnostic adverbial-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-adverbial-adversative", andrewsSection: "52.4.3", category: "adversative-adverbial-modifiers", directiveEs: "Zan, tel, yeceh, yeh y neh apoyan adversativa, pero siguen siendo modificadores.", engineSurface: "diagnostic adverbial-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-correlative-overview", andrewsSection: "52.5", category: "correlative-conjunction", directiveEs: "La correlacion no usa conjunctor para either-or; usa pares de particulas o CNN adverbiales/pronominales.", engineSurface: "diagnostic correlative-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-correlative-standard", andrewsSection: "52.5.1", category: "standard-correlation", directiveEs: "La correlacion estandar repite particulas como ahzo...ahzo o ahmo no...ahmo no.", engineSurface: "diagnostic correlative-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-correlative-loose", andrewsSection: "52.5.2", category: "loose-correlation", directiveEs: "La correlacion suelta empareja CNN adverbiales o pronominales para contrastar conjuntivos.", engineSurface: "diagnostic correlative-conjunction frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-lexical-innovation-overview", andrewsSection: "52.6", category: "lexical-innovation-by-conjunction", directiveEs: "La innovacion lexica fusiona CNN por conjuncion no marcada; no es compuesto de troncos.", engineSurface: "diagnostic lexical-innovation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-lexical-lord-master", andrewsSection: "52.6.1", category: "lord-and-master-type", directiveEs: "El tipo lord-and-master une conjuntivos sinonimos o casi sinonimos.", engineSurface: "diagnostic lexical-innovation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-lexical-bread-butter", andrewsSection: "52.6.2", category: "bread-and-butter-type", directiveEs: "El tipo bread-and-butter une referentes asociados, exige desplazamiento metaforico y referente compartido.", engineSurface: "diagnostic lexical-innovation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-parallel-overview", andrewsSection: "52.7", category: "parallel-structure", directiveEs: "La estructura paralela es creada por conjuncion y se modela como refrasiva, progresiva o combinada.", engineSurface: "diagnostic parallel-structure frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-parallel-rephrasive", andrewsSection: "52.7 item 1", category: "rephrasive-parallelism", directiveEs: "El paralelismo refrasivo repite el contenido con forma algo distinta; puede cambiar la gramatica.", engineSurface: "diagnostic parallel-structure frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-parallel-progressive", andrewsSection: "52.7 item 2", category: "progressive-parallelism", directiveEs: "El paralelismo progresivo mantiene forma gramatical similar mientras cambia el contenido.", engineSurface: "diagnostic parallel-structure frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson52-parallel-combined", andrewsSection: "52.7 item 3", category: "combined-parallelism", directiveEs: "Las estructuras mas complejas combinan paralelismo refrasivo y progresivo.", engineSurface: "diagnostic parallel-structure frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function cloneConjunctionClauseLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneConjunctionClauseLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneConjunctionClauseLessonRecord(value)])
    );
}

function getLesson52ConjunctionClauseSubsectionInventory() {
    return LESSON52_CONJUNCTION_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON52_CONJUNCTION_VALIDATION_REFS),
    }));
}

function buildLesson52ConjunctionClausePursuitFrame() {
    const subsectionInventory = getLesson52ConjunctionClauseSubsectionInventory();
    const architectureFrame = cloneConjunctionClauseLessonRecord(LESSON52_CONJUNCTION_ARCHITECTURE_FRAME);
    const unmarkedFrame = cloneConjunctionClauseLessonRecord(LESSON52_UNMARKED_CONJUNCTION_FRAME);
    const markedFrame = cloneConjunctionClauseLessonRecord(LESSON52_MARKED_CONJUNCTION_FRAME);
    const adverbialModifierFrame = cloneConjunctionClauseLessonRecord(LESSON52_ADVERBIAL_MODIFIER_CONJUNCTION_FRAME);
    const correlativeFrame = cloneConjunctionClauseLessonRecord(LESSON52_CORRELATIVE_CONJUNCTION_FRAME);
    const lexicalInnovationFrame = cloneConjunctionClauseLessonRecord(LESSON52_LEXICAL_INNOVATION_FRAME);
    const parallelStructureFrame = cloneConjunctionClauseLessonRecord(LESSON52_PARALLEL_STRUCTURE_FRAME);
    const remainingGaps = [
        "Current Lesson 52 support records Andrews' conjunction architecture as diagnostics and supplied-surface AST frames; it does not implement static conjunction data, parser/search detection, or automatic relation inference.",
        "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require Andrews source models plus the orthography bridge before generating visible output.",
        "Unmarked relation inference, auh/orthography decisions, adverbial-modifier-vs-conjunctor detection, correlative pairing, biclausalism/triclausalism classification, parallel-structure parsing, acciones de interfaz, and Andrews source models plus orthography-bridge fixtures remain partial or evidence-needed.",
    ];
    const frame = {
        kind: "lesson-52-conjunction-clause-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 52,
        aimStatus: "shooting",
        routeStage: "audit-lesson-52",
        pdfRefs: Array.from(LESSON52_CONJUNCTION_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 52.1-52.7 against current conjunction boundary metadata, supplied-surface AST behavior, balanced no-head conjunction, unmarked and marked conjunction, adverbial modifiers near conjunction, correlative conjunction, lexical innovation, and parallel structure.",
                andrewsRefs: Array.from(LESSON52_CONJUNCTION_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON52_CONJUNCTION_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                result: "hit",
                correction: "Lesson 52 now records Andrews conjunction architecture across balanced no-head conjunction, unmarked additive/alternative/adversative relations, marked auh structure, adverbial modifiers that are not conjunctors, correlative pairing, lexical innovation by conjoined CNNs, and rephrasive/progressive/combined parallel structure while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON52_CONJUNCTION_PDF_REFS),
                feedbackRefs: Array.from(LESSON52_CONJUNCTION_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        architectureFrame,
        unmarkedFrame,
        markedFrame,
        adverbialModifierFrame,
        correlativeFrame,
        lexicalInnovationFrame,
        parallelStructureFrame,
        currentEngineBoundary: {
            conjunctionBoundaryMetadataImplemented: true,
            conjunctionAstImplemented: true,
            balancedNoHeadAstImplemented: true,
            markedAuhAstSupportedForSuppliedSurfaces: true,
            adverbialModifierNotConjunctorDiagnosticImplemented: true,
            correlativeParticleAstSupportedForSuppliedSurfaces: true,
            lexicalInnovationSharedReferentGateImplemented: true,
            parallelismDistinctionImplemented: true,
            parserDetectionImplemented: false,
            staticConjunctionDataImplemented: false,
            automaticRelationInferenceImplemented: false,
            newWordGenerationAllowed: false,
            fullLesson52GenerationImplemented: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachConjunctionClauseGrammarContract(frame, {
        metadataKind: "lesson-52-conjunction-clause-pursuit-frame",
        unitKind: "conjunction-clause-boundary",
        routeStage: "audit-lesson-52",
        structuralSource: "Andrews Lesson 52",
        andrewsRefs: Array.from(LESSON52_CONJUNCTION_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 52.1-52.7",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil conjunction-clause orthography bridge",
            noClassicalSurfaceImport: true,
            slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
            orthographyStatus: "not-surface-bearing",
        },
        morphBoundaryFrame: {
            architectureFrame,
            unmarkedFrame,
            markedFrame,
            adverbialModifierFrame,
            correlativeFrame,
            lexicalInnovationFrame,
            parallelStructureFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "balanced conjunction structure",
            noHead: true,
            conjunctsSameSyntacticRank: true,
            usualConjunctUnits: ["nuclear-clause", "nuclear-clause-group"],
            principalAndAdjoinedLevelsTracked: true,
            lexicalInnovationUsesConjoinedNuclearClausesNotStems: true,
        },
        participantFrame: {
            semanticRole: "additive, alternative, adversative, correlative, lexical-innovation, or parallel-structure conjunct relation",
            translationConjunctionIsNotMorphology: true,
            adverbialModifiersAreNotConjunctors: true,
            sharedReferentRequiredForLexicalInnovation: true,
        },
        targetContract: {
            metadataKind: "lesson-52-conjunction-clause-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["conjunction-clause-lesson-52-diagnostic-partial", "conjunction-clause-source-gated"],
    });
}

function buildConjunctionClauseBoundaryMetadata() {
    return {
        kind: "conjunction-clause-boundary",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        status: "partial",
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getConjunctionClauseStructuralQuestions(),
        boundaries: {
            hasParserSeparators: true,
            hasConjunctionAst: true,
            hasConfirmedClauseExamples: false,
            hasStaticConjunctionData: false,
            changesParserBehavior: false,
            changesVncGeneration: false,
            changesNncGeneration: false,
            changesRouteBehavior: false,
            treatsParserSeparatorsAsConjunctionEvidence: false,
            treatsTranslationsAsConjunctionEvidence: false,
        },
        antiConflationRules: getConjunctionClauseAntiConflationRules(),
    };
}

function getConjunctionClauseSurface(input = "", fallback = "") {
    if (typeof input === "string") {
        return String(input || fallback || "").trim();
    }
    if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
    }
    const surface = getConjunctionClauseSurfaceForms(input)[0];
    if (getConjunctionClauseResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
    }
    return String(surface || fallback || "").trim();
}

function splitConjunctionClauseSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
}

function getConjunctionClauseCanonicalRealizationSurfaceForms(resultFrame = null) {
    if (!resultFrame || typeof resultFrame !== "object") {
        return [];
    }
    const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length
        ? resultFrame.formulaRealizationRecords
        : (resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : []);
    return records
        .filter((record) => record && typeof record === "object" && record.kind === "grammar-formula-realization-record")
        .flatMap((record) => [
            ...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []),
            record.surface || "",
        ])
        .map((entry) => String(entry || "").trim())
        .filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
}

function getConjunctionClauseSelectedRealizationVariant(input = null) {
    if (!input || typeof input !== "object") {
        return null;
    }
    const grammarFrame = getConjunctionClauseResultFrame(input);
    const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
    if (!resultFrame) {
        return null;
    }
    const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length
        ? resultFrame.formulaRealizationRecords
        : (resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : []);
    for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
            continue;
        }
        const surfaces = [
            ...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []),
            record.surface || "",
        ]
            .map((entry) => String(entry || "").trim())
            .filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
        if (!surfaces.length) {
            continue;
        }
        const formulaRealizationRecordId = String(record.id || "");
        const formulaRecordId = String(record.formulaRecordId || resultFrame.formulaRecord?.id || "");
        const selectedVariantIndex = 0;
        return {
            kind: "grammar-formula-realization-selected-variant",
            selectedVariantId: `${formulaRealizationRecordId || formulaRecordId || "realization"}::surface-${selectedVariantIndex}`,
            selectedVariantIndex,
            formulaRealizationRecordId,
            formulaRecordId,
            unit: String(record.unit || resultFrame.formulaRecord?.unit || ""),
        };
    }
    return null;
}

function getConjunctionClauseResultFrame(input = null) {
    return (
        (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null)
        || (input?.frames && typeof input.frames === "object" ? input.frames : null)
    );
}

function getConjunctionClauseSurfaceForms(input = null) {
    if (typeof input === "string") {
        return splitConjunctionClauseSurfaceText(input);
    }
    if (!input || typeof input !== "object") {
        return [];
    }
    const grammarFrame = getConjunctionClauseResultFrame(input);
    const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
    const hasResultFrame = Boolean(frameResult);
    const canonicalForms = getConjunctionClauseCanonicalRealizationSurfaceForms(frameResult);
    if (canonicalForms.length) {
        return canonicalForms;
    }
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .map((entry) => String(entry || "").trim())
            .filter((entry) => entry && entry !== "—" && !entry.includes("/"))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
    }
    if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
    }
    if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
    }
    if (!hasResultFrame && input.result) {
        forms.push(input.result);
    }
    if (!hasResultFrame && input.word) {
        forms.push(input.word);
    }
    return forms
        .flatMap((entry) => splitConjunctionClauseSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function buildConjunctionClauseNode(input = "", index = 0, unitType = CONJUNCTION_CLAUSE_UNIT.unknown) {
    const surface = getConjunctionClauseSurface(input);
    const selectedVariant = getConjunctionClauseSelectedRealizationVariant(input);
    return {
        kind: "conjunction-clause-node",
        index,
        surface,
        ...(selectedVariant ? {
            selectedVariant,
            selectedVariantId: selectedVariant.selectedVariantId,
            formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
            formulaRecordId: selectedVariant.formulaRecordId,
        } : {}),
        unitType: normalizeConjunctionClauseUnit(
            typeof input === "object" && input ? input.unitType || input.clauseKind || unitType : unitType
        ),
        clauseKind: typeof input === "object" && input
            ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown")
            : "unknown",
        preservesSurface: true,
    };
}

function buildConjunctionSurfaceSequence(conjunctNodes = [], marker = "", marking = CONJUNCTION_CLAUSE_MARKING.unmarked) {
    const surfaces = conjunctNodes.map((node) => node.surface).filter(Boolean);
    const markerText = String(marker || "").trim();
    const normalizedMarking = normalizeConjunctionClauseMarking(marking || markerText);
    if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.auh && markerText && surfaces.length >= 2) {
        return surfaces.reduce((acc, surface, index) => {
            if (index > 0) acc.push(markerText);
            acc.push(surface);
            return acc;
        }, []);
    }
    if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier && markerText && surfaces.length >= 2) {
        return surfaces.reduce((acc, surface, index) => {
            if (index > 0) acc.push(markerText);
            acc.push(surface);
            return acc;
        }, []);
    }
    if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.correlativeParticle && markerText && surfaces.length >= 2) {
        const markerParts = markerText.split(/\s*\.\.\.\s*/).map((part) => part.trim()).filter(Boolean);
        if (markerParts.length >= 2) {
            return surfaces.reduce((acc, surface, index) => {
                acc.push(markerParts[Math.min(index, markerParts.length - 1)]);
                acc.push(surface);
                return acc;
            }, []);
        }
        return surfaces.reduce((acc, surface) => {
            acc.push(markerText);
            acc.push(surface);
            return acc;
        }, []);
    }
    return surfaces;
}

function buildConjunctionClauseAst({
    conjuncts = [],
    marker = "",
    conjunctionRelation = CONJUNCTION_CLAUSE_RELATION.unknown,
    coordinationType = CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown,
    unitType = CONJUNCTION_CLAUSE_UNIT.unknown,
    level = CONJUNCTION_CLAUSE_LEVEL.principal,
    marking = "",
    parallelism = CONJUNCTION_CLAUSE_PARALLELISM.none,
    lexicalInnovation = CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none,
    sharedSupplement = "",
    sharedReferent = false,
    evidenceSource = "",
    confirmed = false,
} = {}) {
    const normalizedRelation = normalizeConjunctionClauseRelation(conjunctionRelation);
    const normalizedCoordination = normalizeConjunctionClauseCoordinationType(coordinationType);
    const normalizedUnit = normalizeConjunctionClauseUnit(unitType);
    const normalizedLevel = normalizeConjunctionClauseLevel(level);
    const normalizedMarking = normalizeConjunctionClauseMarking(marking || marker);
    const normalizedParallelism = normalizeConjunctionClauseParallelism(parallelism);
    const normalizedLexicalInnovation = normalizeConjunctionClauseLexicalInnovation(lexicalInnovation);
    const inputConjuncts = Array.isArray(conjuncts) ? conjuncts : [conjuncts];
    const conjunctNodes = inputConjuncts.map((conjunct, index) => buildConjunctionClauseNode(conjunct, index, normalizedUnit));
    const diagnostics = [];
    if (conjunctNodes.filter((node) => node.surface).length < 2) {
        diagnostics.push("conjunction-clause-requires-at-least-two-conjuncts");
    }
    if (normalizedRelation === CONJUNCTION_CLAUSE_RELATION.unknown) {
        diagnostics.push("conjunction-clause-relation-unconfirmed");
    }
    if (normalizedCoordination === CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown) {
        diagnostics.push("conjunction-clause-coordination-type-unconfirmed");
    }
    if (normalizedUnit === CONJUNCTION_CLAUSE_UNIT.unknown) {
        diagnostics.push("conjunction-clause-unit-unconfirmed");
    }
    if (normalizedLevel === CONJUNCTION_CLAUSE_LEVEL.unknown) {
        diagnostics.push("conjunction-clause-level-unconfirmed");
    }
    if (
        normalizedRelation === CONJUNCTION_CLAUSE_RELATION.marked
        && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.auh
    ) {
        diagnostics.push("marked-conjunction-requires-structural-conjunctor");
    }
    if (
        normalizedRelation === CONJUNCTION_CLAUSE_RELATION.unmarked
        && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.unmarked
        && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.adverbialModifier
    ) {
        diagnostics.push("unmarked-conjunction-should-not-use-structural-conjunctor");
    }
    if (
        normalizedCoordination === CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative
        && conjunctNodes.length !== 2
    ) {
        diagnostics.push("adversative-conjunction-requires-two-conjuncts");
    }
    if (
        normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none
        && normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown
        && sharedReferent !== true
    ) {
        diagnostics.push("lexical-conjoined-nnc-requires-shared-referent");
    }
    if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier) {
        diagnostics.push("rightward-adverbial-modifier-is-not-conjunctor");
    }
    if (!String(evidenceSource || "").trim()) {
        diagnostics.push("conjunction-clause-source-gated");
    }
    const supported = Boolean(
        conjunctNodes.filter((node) => node.surface).length >= 2
        && normalizedRelation !== CONJUNCTION_CLAUSE_RELATION.unknown
        && normalizedCoordination !== CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown
        && normalizedUnit !== CONJUNCTION_CLAUSE_UNIT.unknown
        && normalizedLevel !== CONJUNCTION_CLAUSE_LEVEL.unknown
        && !diagnostics.includes("marked-conjunction-requires-structural-conjunctor")
        && !diagnostics.includes("unmarked-conjunction-should-not-use-structural-conjunctor")
        && !diagnostics.includes("adversative-conjunction-requires-two-conjuncts")
        && !diagnostics.includes("lexical-conjoined-nnc-requires-shared-referent")
    );
    const surfaceSequence = supported
        ? buildConjunctionSurfaceSequence(conjunctNodes, marker, normalizedMarking)
        : [];
    return attachGrammarAstContract({
        kind: "conjunction-clause-ast",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        conjunctionRelation: normalizedRelation,
        coordinationType: normalizedCoordination,
        unitType: normalizedUnit,
        level: normalizedLevel,
        marker: String(marker || ""),
        marking: {
            value: normalizedMarking,
            markerIsStructuralConjunctor: normalizedMarking === CONJUNCTION_CLAUSE_MARKING.auh,
            adverbialModifierNotConjunctor: normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
            unmarkedPreferred: true,
        },
        conjuncts: conjunctNodes,
        balanced: {
            noHead: true,
            sameSyntacticRank: true,
            subordinateRelation: false,
        },
        sharedSupplement: String(sharedSupplement || ""),
        lexicalInnovation: {
            type: normalizedLexicalInnovation,
            sharedReferentRequired: normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none
                && normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown,
            sharedReferent: sharedReferent === true,
            metaphoricalDisplacement: normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism
                || normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
            canBecomeCompoundNounstem: normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism
                || normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.conjunctiveCompound,
        },
        parallelism: {
            type: normalizedParallelism,
            rephrasesContent: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.rephrasive
                || normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.combined,
            progressesContent: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.progressive
                || normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.combined,
            appositive: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.appositive,
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        changesParserBehavior: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildConjunctionClauseBoundaryMetadata(),
    }, {
        astKind: "conjunction-clause-ast",
        lessons: [52],
        structuralSource: "Andrews Lesson 52",
    });
}

function classifyConjunctionClauseCandidate({
    conjuncts = [],
    marker = "",
    candidate = "",
    conjunctionRelation = "",
    unitType = "",
    parallelism = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRelation = normalizeConjunctionClauseRelation(conjunctionRelation);
    const normalizedUnit = normalizeConjunctionClauseUnit(unitType);
    const normalizedFalsePositive = normalizeConjunctionClauseFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const normalizedConjuncts = Array.isArray(conjuncts)
        ? conjuncts.map((conjunct) => String(conjunct || ""))
        : [String(conjuncts || "")].filter(Boolean);
    return {
        kind: "conjunction-clause-candidate-classification",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        conjuncts: normalizedConjuncts,
        marker: String(marker || ""),
        candidate: String(candidate || ""),
        conjunctionRelation: normalizedRelation,
        unitType: normalizedUnit,
        parallelism: String(parallelism || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "conjunction-clause-needs-validation" : "conjunction-clause-source-gated",
            normalizedRelation !== CONJUNCTION_CLAUSE_RELATION.unknown
                ? "conjunction-clause-relation-recognized"
                : "conjunction-clause-relation-unconfirmed",
            normalizedUnit !== CONJUNCTION_CLAUSE_UNIT.unknown
                ? "conjunction-clause-unit-recognized"
                : "conjunction-clause-unit-unconfirmed",
            normalizedFalsePositive !== CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE.unknown
                ? "conjunction-clause-false-positive-source"
                : "conjunction-clause-unconfirmed",
        ],
        boundary: buildConjunctionClauseBoundaryMetadata(),
    };
}

function classifyConjunctionClauseFalsePositive(source = "") {
    const normalizedSource = normalizeConjunctionClauseFalsePositiveSource(source);
    return {
        kind: "conjunction-clause-false-positive",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        source: normalizedSource,
        isConjunctionEvidence: false,
        isConjunctionAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["conjunction-clause-false-positive-source"],
        antiConflationRules: getConjunctionClauseAntiConflationRules(),
    };
}
