// core/clause/modification/modification.js
// Lessons 42-43 adjectival-modification boundary metadata. This keeps current
// adjective-like word outputs separate from confirmed clause-level modification
// AST behavior until Andrews source logic plus the orthography bridge supports it.

"use strict";

const ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION = 1;

const ADJECTIVAL_MODIFICATION_RELATION = Object.freeze({
    predicateFunction: "predicate-function",
    attributiveModifier: "attributive-modifier",
    clauseModifier: "clause-modifier",
    supplementationAmbiguous: "supplementation-ambiguous",
    unknown: "unknown",
});

const ADJECTIVAL_MODIFICATION_ORDER = Object.freeze({
    headModifier: "head-modifier",
    headMarkedModifier: "head-marked-modifier",
    modifierHeadPreposed: "modifier-head-preposed",
    markedModifierHeadAdjoined: "marked-modifier-head-adjoined",
    discontinuous: "discontinuous",
    unknown: "unknown",
});

const ADJECTIVAL_MODIFICATION_SCOPE = Object.freeze({
    standalone: "standalone",
    adjoinedUnit: "adjoined-unit",
    principalUnit: "principal-unit",
    unknown: "unknown",
});

const ADJECTIVAL_MODIFICATION_LINK_ROLE = Object.freeze({
    sharedSubject: "shared-subject",
    vncSubject: "vnc-subject",
    vncObject: "vnc-object",
    possessor: "possessor",
    unknown: "unknown",
});

const ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE = Object.freeze({
    adjectiveModeOutput: "adjective-mode-output",
    nominalizationProfile: "nominalization-profile",
    ordinaryNncFormulaSlots: "ordinary-nnc-formula-slots",
    translationAdjective: "translation-adjective",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES = Object.freeze([
    "adjectival modification boundary metadata is not generation",
    "modificationAst composes existing clause outputs; it does not create new Nawat word forms",
    "adjetivo route output is not a clause-level modification AST",
    "nominalizationProfile is not adjectival modification syntax",
    "ordinary NNC formulaSlots are not modifier/head relation metadata",
    "single generated words do not prove modification, supplementation, or topic relations",
    "Andrews modification categories are architecture, not Nawat/Pipil orthography authority",
]);

const ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "head",
        asks: "Which Nawat/Pipil clause, nucleus, or phrase is modified?",
    }),
    Object.freeze({
        field: "modifier",
        asks: "Which NNC, VNC, or clause functions as the modifier?",
    }),
    Object.freeze({
        field: "relation",
        asks: "Is the relation predicate function, attributive modifier, clause modifier, supplementation-ambiguous, or unknown?",
    }),
    Object.freeze({
        field: "order",
        asks: "What evidence supports modifier/head order, marking, discontinuity, or recursion?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Andrews source model or user-provided clause context supports modification status?",
    }),
]);

const LESSON42_ADJECTIVAL_MODIFICATION_VALIDATION_REFS = Object.freeze([
    "src/tests/modification.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON42_ADJECTIVAL_MODIFICATION_PDF_REFS = Object.freeze([
    "Andrews Lesson 42.1",
    "Andrews Lesson 42.2",
    "Andrews Lesson 42.3",
    "Andrews Lesson 42.4",
    "Andrews Lesson 42.5",
    "Andrews Lesson 42.6",
    "Andrews Lesson 42.7",
    "Andrews Lesson 42.8",
    "Andrews Lesson 42.8.1",
    "Andrews Lesson 42.8.2",
    "Andrews Lesson 42.8.3",
    "Andrews Lesson 42.8.4",
    "Andrews Lesson 42.8.5",
    "Andrews Lesson 42.8.6",
    "Andrews Lesson 42.8.7",
    "Andrews Lesson 42.8.8",
    "Andrews Lesson 42.8.9",
    "Andrews Lesson 42.9",
    "Andrews Lesson 42.10",
]);

const LESSON42_MODIFICATION_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-42-modification-overview-frame",
    sourceSection: "Andrews 42.1",
    modificationCanBeSingleNucleusOrMultipleNucleus: true,
    modificationCanBeAdjectivalOrAdverbial: true,
    multipleNucleusAdjectivalModificationIsLesson42_43Target: true,
    adverbialMultipleNucleusDeferredToLessons49_50: true,
});

const LESSON42_MULTIPLE_NUCLEUS_ADJECTIVAL_MODIFICATION_FRAME = Object.freeze({
    kind: "lesson-42-multiple-nucleus-adjectival-modification-frame",
    sourceSection: "Andrews 42.2",
    allNonEmbeddedAdjectivalModifiersAreClauses: true,
    noEnglishStyleModifierWordPlusHeadWordStructure: true,
    noRelativePronounLink: true,
    derivedFromSharedReferentSupplementation: true,
    reversesPrincipalAndAdjunctRanksFromSupplementation: true,
    linkBySharedReferentAffixalPersonalPronouns: true,
    supplementationContrast: Object.freeze({
        head: "affixal personal pronoun in the principal clause",
        supplement: "adjunct clause whose core identifies the head",
    }),
    modificationStructure: Object.freeze({
        head: "core in an NNC functioning as principal clause",
        modifier: "adjunct clause whose core describes, qualifies, or limits the head",
    }),
    modifierMayBeMarkedByAdjunctorIn: true,
});

const LESSON42_PREPOSED_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-42-preposed-modifier-frame",
    sourceSection: "Andrews 42.3",
    unmarkedAdjectivalModifierMayPreposeBeforeHead: true,
    preposingDoesNotCreateTopic: true,
    preposedModifierJoinedMoreTightlyThanTopicalization: true,
    noHiatusBetweenModifierAndHead: true,
});

const LESSON42_ADJOINED_UNIT_FRAME = Object.freeze({
    kind: "lesson-42-adjoined-unit-frame",
    sourceSection: "Andrews 42.4",
    modificationStructureCanServeAsAdjoinedUnit: true,
    adjunctorBeforePreposedModifierSubordinatesWholeStructure: true,
    adjunctorBeforePreposedModifierDoesNotSubordinateOnlyModifier: true,
    markedPreposedModifierHeadPatternIncompleteAsStandalone: true,
});

const LESSON42_PRINCIPAL_UNIT_FRAME = Object.freeze({
    kind: "lesson-42-principal-unit-frame",
    sourceSection: "Andrews 42.5",
    modificationStructureCanServeAsPrincipalUnit: true,
    largerConcatenateStructureCanHaveModificationUnitAsPrincipal: true,
});

const LESSON42_SUPPLEMENTATION_AMBIGUITY_FRAME = Object.freeze({
    kind: "lesson-42-supplementation-ambiguity-frame",
    sourceSection: "Andrews 42.6",
    supplementationAndModificationBothAppositional: true,
    modificationGeneratedFromSharedReferentSupplementation: true,
    noSpecialAdjunctorDistinguishesModification: true,
    eitherNucleusMayBePrincipal: true,
    principalChoiceControlsMeaning: true,
    inAdjunctPrincipalStandaloneIsSupplementation: true,
    inAdjunctPrincipalAdjoinedIsModification: true,
    headModifierCanConvertToModifierHeadWithInBeforeHead: true,
    ambiguityPatterns: Object.freeze([
        "principal-plus-adjunct",
        "principal-plus-in-plus-adjunct",
        "adjunct-plus-principal",
        "in-plus-adjunct-plus-principal",
    ]),
});

const LESSON42_COMPOUND_HEAD_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-42-compound-head-modifier-frame",
    sourceSection: "Andrews 42.7",
    headMayBeSimpleStemmedOrCompoundStemmedNnc: true,
    modifierOfCompoundHeadTendsToRelateToMatrix: true,
    metaphoricallyDistantCompoundMayMakeModifierRelateToWholeCompound: true,
    compareWithIncorporatedModificationIn42_10: true,
});

const LESSON42_MODIFIER_FUNCTION_TYPES_FRAME = Object.freeze({
    kind: "lesson-42-modifier-function-types-frame",
    sourceSection: "Andrews 42.8",
    wideVarietyOfNuclearClauseTypesCanServeAsAdjectivalAdjuncts: true,
    intransitiveVncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.1",
        intransitiveVncCanServeAsModifier: true,
        vncNeedNotUndergoNominalization: true,
    }),
    transitiveVncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.2",
        transitiveVncCanServeAsModifier: true,
        reflexiveOrNonspecificProjectiveObjectActsLikeIntransitiveCase: true,
        specificProjectiveObjectCanLinkThroughSubjectOrObjectPronoun: true,
        ambiguityDependsOnAnimacyPersonNumberAndStemMeaning: true,
    }),
    adverbializedNncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.3",
        adverbializedNncCanServeAsModifier: true,
    }),
    cardinalNumeralFrame: Object.freeze({
        sourceSection: "Andrews 42.8.4",
        cardinalNumeralNncCanServeAsModifier: true,
        cardinalNumeralNncCanServeAsHead: true,
        englishOftenIgnoresInternalConstruction: true,
        dateUseCommon: true,
        doubleNucleusCounterpartOfCompoundNumeralStemPossible: true,
    }),
    quantitivePronominalFrame: Object.freeze({
        sourceSection: "Andrews 42.8.5",
        quantitivePronominalNncCanServeAsModifier: true,
        singularConstructionCanReferToPluralAnimateEntities: true,
        quantitiveNncCanServeAsHead: true,
        englishTranslationReversesHeadAndModifier: true,
        numberAgreementMayDifferWhenServingAsSupplement: true,
    }),
    nncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.6",
        ordinaryNncCanServeAsModifier: true,
        doubleNucleusCounterpartOfCompoundNounstemPossible: true,
    }),
    supplementationStructureFrame: Object.freeze({
        sourceSection: "Andrews 42.8.7",
        supplementationStructureCanServeAsModifier: true,
    }),
    pronominalNncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.8",
        personalOrDemonstrativePronominalNncCanCooperateWithNncInModification: true,
        contraryToTranslationNncIsAppositiveAndModifier: true,
    }),
    measureNncFrame: Object.freeze({
        sourceSection: "Andrews 42.8.9",
        measureNncServesAsHead: true,
        measuredThingNncServesAsAdjectivalModifier: true,
        citesLesson34_16: true,
    }),
});

const LESSON42_RECURSION_FRAME = Object.freeze({
    kind: "lesson-42-recursion-frame",
    sourceSection: "Andrews 42.9",
    modificationTransformationIsRecursive: true,
    modificationStructureMayParticipateAsHeadInLargerModification: true,
});

const LESSON42_INCORPORATED_MODIFICATION_FRAME = Object.freeze({
    kind: "lesson-42-incorporated-modification-frame",
    sourceSection: "Andrews 42.10",
    entireModifierPlusHeadStructureCanFillCompoundStemEmbedSubposition: true,
    constituentNncsKeepSubjectPronounsInsideCompoundStem: true,
    headNncNumberDyadOfIncorporatedStructureDeleted: true,
    incorporatedStructureUsuallyLexicalizedOrFrozenSequence: true,
    canServeAsEmbedInCompoundNnc: true,
    canServeAsEmbedInCompoundVnc: true,
    canServeAsEmbedInPreteritAgentiveNnc: true,
    someModifierHeadSequencesLexicalizeAsCompoundsWithoutServingAsEmbed: true,
    normalPluralOrReduplicationMayBeSuppressedInLexicalizedCompound: true,
});

const LESSON42_ADJECTIVAL_MODIFICATION_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson42-modification-overview", andrewsSection: "42.1", category: "modification-overview", directiveEs: "La modificacion puede ser de nucleo unico o multiple, adjetival o adverbial; esta leccion enfoca la modificacion adjetival multinuclear.", engineSurface: "diagnostic modification boundary plus partial AST", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-multiple-nucleus-modification", andrewsSection: "42.2", category: "multiple-nucleus-adjectival-modification", directiveEs: "Todo modificador adjetival no incrustado es clausula; el enlace viene de pronombres afijales correferentes, no de pronombre relativo.", engineSurface: "partial modificationAst builder", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-preposed-modifier", andrewsSection: "42.3", category: "preposed-modifier", directiveEs: "El modificador prepuesto no es topico y se une mas estrechamente al nucleo principal.", engineSurface: "partial preposed-order AST metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-adjoined-unit", andrewsSection: "42.4", category: "adjoined-modification-unit", directiveEs: "Una estructura de modificacion puede ser unidad adjunta; in antes del modificador prepuesto subordina toda la estructura.", engineSurface: "partial marked-adjoined AST metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-principal-unit", andrewsSection: "42.5", category: "principal-modification-unit", directiveEs: "Una estructura de modificacion tambien puede funcionar como unidad principal de una estructura mayor.", engineSurface: "diagnostic principal-unit frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-supplementation-ambiguity", andrewsSection: "42.6", category: "supplementation-modification-ambiguity", directiveEs: "Suplementacion y modificacion son aposicionales; la clausula principal entendida controla el significado y la ambiguedad.", engineSurface: "partial ambiguity diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-compound-head-modifier", andrewsSection: "42.7", category: "compound-head-modification", directiveEs: "Si la cabeza es CNN compuesta, el modificador tiende a relacionarse con la matriz salvo metafora lexicalizada.", engineSurface: "diagnostic compound-head frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-modifier-function-types", andrewsSection: "42.8", category: "modifier-function-types", directiveEs: "Muchos tipos de CN pueden funcionar como adjuntos adjetivales; no se limita a CNN adjetivas.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-intransitive-vnc-modifier", andrewsSection: "42.8.1", category: "intransitive-vnc-modifier", directiveEs: "Una CNV intransitiva puede modificar adjetivamente sin nominalizarse.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-transitive-vnc-modifier", andrewsSection: "42.8.2", category: "transitive-vnc-modifier", directiveEs: "Una CNV transitiva puede enlazar por sujeto u objeto; la ambiguedad depende de animacidad, persona, numero y significado.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-adverbialized-nnc-modifier", andrewsSection: "42.8.3", category: "adverbialized-nnc-modifier", directiveEs: "Una CNN adverbializada puede funcionar como modificador adjetival.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-cardinal-numeral-modifier", andrewsSection: "42.8.4", category: "cardinal-numeral-modifier-or-head", directiveEs: "Una CNN numeral cardinal puede ser modificador o cabeza; el ingles suele ocultar la relacion interna.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-quantitive-pronominal-modifier", andrewsSection: "42.8.5", category: "quantitive-pronominal-modifier-or-head", directiveEs: "Una CNN pronominal cuantitativa puede usar forma singular con referente plural y tambien servir como cabeza.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-nnc-modifier", andrewsSection: "42.8.6", category: "nnc-modifier", directiveEs: "Una CNN puede modificar otra CNN; puede corresponder a un compuesto nominal de nucleo unico.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-supplementation-structure-modifier", andrewsSection: "42.8.7", category: "supplementation-structure-modifier", directiveEs: "Una estructura de suplementacion completa puede funcionar como modificador.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-pronominal-nnc-cooperation", andrewsSection: "42.8.8", category: "pronominal-nnc-cooperation", directiveEs: "Con CNN pronominal personal o demostrativa, la CNN comun es la aposicion modificadora aunque la traduccion sugiera otra cosa.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-measure-nnc-head", andrewsSection: "42.8.9", category: "measure-nnc-head", directiveEs: "La CNN de medida es la cabeza y la cosa medida es el modificador adjetival.", engineSurface: "diagnostic modifier-type frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-recursion", andrewsSection: "42.9", category: "recursive-modification", directiveEs: "La transformacion de modificacion es recursiva: una estructura modificada puede ser cabeza de otra.", engineSurface: "diagnostic recursion frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson42-incorporated-modification", andrewsSection: "42.10", category: "incorporated-modification-structure", directiveEs: "Una estructura completa modificador+cabeza puede incrustarse en un compuesto; las CNN conservan pronombres salvo el dyad de numero de la cabeza.", engineSurface: "diagnostic incorporated-modification frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function cloneAdjectivalModificationLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneAdjectivalModificationLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneAdjectivalModificationLessonRecord(value)])
    );
}

function getLesson42AdjectivalModificationSubsectionInventory() {
    return LESSON42_ADJECTIVAL_MODIFICATION_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
    }));
}

function attachAdjectivalModificationPursuitGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adjectival-modification",
        routeFamily: "adjectival-modification",
        ...options,
    });
}

function buildLesson42AdjectivalModificationPursuitFrame() {
    const subsectionInventory = getLesson42AdjectivalModificationSubsectionInventory();
    const modificationOverviewFrame = cloneAdjectivalModificationLessonRecord(LESSON42_MODIFICATION_OVERVIEW_FRAME);
    const multipleNucleusFrame = cloneAdjectivalModificationLessonRecord(LESSON42_MULTIPLE_NUCLEUS_ADJECTIVAL_MODIFICATION_FRAME);
    const preposedModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON42_PREPOSED_MODIFIER_FRAME);
    const adjoinedUnitFrame = cloneAdjectivalModificationLessonRecord(LESSON42_ADJOINED_UNIT_FRAME);
    const principalUnitFrame = cloneAdjectivalModificationLessonRecord(LESSON42_PRINCIPAL_UNIT_FRAME);
    const supplementationAmbiguityFrame = cloneAdjectivalModificationLessonRecord(LESSON42_SUPPLEMENTATION_AMBIGUITY_FRAME);
    const compoundHeadModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON42_COMPOUND_HEAD_MODIFIER_FRAME);
    const modifierFunctionTypesFrame = cloneAdjectivalModificationLessonRecord(LESSON42_MODIFIER_FUNCTION_TYPES_FRAME);
    const recursionFrame = cloneAdjectivalModificationLessonRecord(LESSON42_RECURSION_FRAME);
    const incorporatedModificationFrame = cloneAdjectivalModificationLessonRecord(LESSON42_INCORPORATED_MODIFICATION_FRAME);
    const remainingGaps = [
        "Current Lesson 42 modification support is partial and does not exhaust multiple-nucleus modification syntax, all modifier/head order patterns, all supplementation ambiguities, compound-head matrix targeting, all modifier clause types, recursion, or incorporated modification structures.",
        "The current modificationAst composes supplied generated surfaces and records selected order/scope diagnostics; it does not parse or generate Nawat clause examples.",
        "Transitive VNC modifier ambiguity, pronominal/quantitive/numeral head behavior, measure NNC head behavior, and incorporated modifier-head compounds remain diagnostic.",
        "A complete Andrews modifier/head clause-source model plus orthography context is still required before fixture data, parser/search detection, acciones de interfaz, or generation routing can expand.",
    ];
    const frame = {
        kind: "lesson-42-adjectival-modification-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 42,
        aimStatus: "shooting",
        routeStage: "audit-lesson-42",
        pdfRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 42.1-42.10 against current adjectival modification boundary metadata, AST composition, modifier/head ordering, adjoined/principal unit behavior, supplementation ambiguity, modifier clause type inventory, recursion, and incorporated modification structures.",
                andrewsRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                result: "hit",
                correction: "Lesson 42 now records Andrews adjectival modification architecture across multiple-nucleus modification, preposing, adjoined/principal units, supplementation ambiguity, compound-head behavior, modifier clause types, recursion, and incorporated modification structures while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_PDF_REFS),
                feedbackRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        modificationOverviewFrame,
        multipleNucleusFrame,
        preposedModifierFrame,
        adjoinedUnitFrame,
        principalUnitFrame,
        supplementationAmbiguityFrame,
        compoundHeadModifierFrame,
        modifierFunctionTypesFrame,
        recursionFrame,
        incorporatedModificationFrame,
        currentEngineBoundary: {
            adjectivalModificationBoundaryMetadataImplemented: true,
            modificationAstCompositionImplemented: true,
            preposedModifierDiagnosticImplemented: true,
            markedAdjoinedUnitDiagnosticImplemented: true,
            supplementationAmbiguityDiagnosticPartial: true,
            modifierClauseTypeInventoryDiagnosticOnly: true,
            recursionDiagnosticOnly: true,
            incorporatedModificationDiagnosticOnly: true,
            parserDetectionImplemented: false,
            fixtureBackedClauseExamplesImplemented: false,
            newWordGenerationAllowed: false,
            fullLesson42GenerationImplemented: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachAdjectivalModificationPursuitGrammarContract(frame, {
        metadataKind: "lesson-42-adjectival-modification-pursuit-frame",
        unitKind: "adjectival-modification-boundary",
        routeStage: "audit-lesson-42",
        structuralSource: "Andrews Lesson 42",
        andrewsRefs: Array.from(LESSON42_ADJECTIVAL_MODIFICATION_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 42.1-42.10",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil clause orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "not-surface-bearing",
        },
        morphBoundaryFrame: {
            modificationOverviewFrame,
            multipleNucleusFrame,
            preposedModifierFrame,
            adjoinedUnitFrame,
            principalUnitFrame,
            supplementationAmbiguityFrame,
            compoundHeadModifierFrame,
            modifierFunctionTypesFrame,
            recursionFrame,
            incorporatedModificationFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "multiple nuclear clauses",
            targetRelationKind: "adjectival modification",
            headDefinition: multipleNucleusFrame.modificationStructure.head,
            modifierDefinition: multipleNucleusFrame.modificationStructure.modifier,
            linkMechanism: "shared-referent affixal personal pronouns",
            noRelativePronounLink: true,
        },
        participantFrame: {
            semanticRole: "head/modifier shared referent",
            transitiveVncCanLinkThroughSubjectOrObject: true,
            embeddedNounstemSubjectMisreadingBlocked: true,
        },
        targetContract: {
            metadataKind: "lesson-42-adjectival-modification-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["adjectival-modification-lesson-42-diagnostic-partial", "adjectival-modification-source-gated"],
    });
}

const LESSON43_ADJECTIVAL_MODIFICATION_VALIDATION_REFS = Object.freeze([
    "src/tests/modification.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON43_ADJECTIVAL_MODIFICATION_PDF_REFS = Object.freeze([
    "Andrews Lesson 43.1",
    "Andrews Lesson 43.2",
    "Andrews Lesson 43.3",
    "Andrews Lesson 43.4",
    "Andrews Lesson 43.4.1",
    "Andrews Lesson 43.4.2",
    "Andrews Lesson 43.5",
    "Andrews Lesson 43.6",
    "Andrews Lesson 43.6.1",
    "Andrews Lesson 43.6.2",
    "Andrews Lesson 43.7",
    "Andrews Lesson 43.7.1",
    "Andrews Lesson 43.7.2",
    "Andrews Lesson 43.8",
    "Andrews Lesson 43.9",
]);

const LESSON43_NONPREPOSED_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-43-nonpreposed-modifier-frame",
    sourceSection: "Andrews 43.1",
    followsHeadHasPeculiarities: true,
    supplementaryElementsAllowedBeyondPreposedModifier: true,
    supplementaryElementMayStandAtDistance: true,
    personalPronominalNncHeadConstructionFavored: true,
    englishTranslationOftenFalsifiesNahuatlStructure: true,
    mayModifyNumeralOrQuantitiveNncHead: true,
    englishOftenHidesNahuatlWeighting: true,
});

const LESSON43_PREPOSED_NONPREPOSED_COOPERATION_FRAME = Object.freeze({
    kind: "lesson-43-preposed-nonpreposed-cooperation-frame",
    sourceSection: "Andrews 43.2",
    preposedAndNonpreposedModifiersMayAdjoinToSameHead: true,
    sameHeadMayReceiveMultipleModifierPositions: true,
    currentAstRequiresSuppliedHeadModifierNodes: true,
});

const LESSON43_DISCONTINUOUS_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-43-discontinuous-modifier-frame",
    sourceSection: "Andrews 43.3",
    headAndModifierMayBeSeparated: true,
    frequentSourceTopicalizesHeadAndLeavesModifierInPlace: true,
    modifierMayLackAdjunctor: true,
    lessFrequentPatternLeavesHeadAndShiftsModifier: true,
    shiftedModifierMayFunctionAsAdverbialAdjunct: true,
    shiftedModifierMayFunctionAsSupplementarySubject: true,
});

const LESSON43_INTERROGATIVE_HEAD_FRAME = Object.freeze({
    kind: "lesson-43-interrogative-head-frame",
    sourceSection: "Andrews 43.4",
    noRelativePronouns: true,
    acAndTlehAreNotRelativePronouns: true,
    acAndTlehAsPrincipalClausesAreInherentlyAmbiguous: true,
    supplementHeadIsNuclearPronounInPrincipalClause: true,
    modificationHeadIsCoreNominalPredicateInPrincipalNnc: true,
    adjunctorInNormallyBeginsTheAdjoinedClause: true,
    solidTraditionalWritingDisguisesInAsUnitWithFollowingClause: true,
    englishRelativePronounTranslatesAdjunctorOrItsAbsence: true,
    supplementationFrame: Object.freeze({
        sourceSection: "Andrews 43.4.1",
        acTranslationValue: "the one(s) or person(s)",
        tlehTranslationValue: "the thing(s) or what",
        acOrTlehRemainPrincipalClauses: true,
    }),
    modificationFrame: Object.freeze({
        sourceSection: "Andrews 43.4.2",
        acTranslationValue: "someone, anyone, or whoever",
        tlehTranslationValue: "something, anything, or whatever",
        zaZoAcInValue: "whoever",
        zaZoTlehInValue: "whatever",
        acOrTlehRemainPrincipalClauses: true,
    }),
    otherInterrogativeNncsMayServeAsHeads: true,
});

const LESSON43_OC_CE_COLLOCATION_FRAME = Object.freeze({
    kind: "lesson-43-oc-ce-collocation-frame",
    sourceSection: "Andrews 43.5",
    ocCeMayServeAsHeadInModification: true,
    semanticValues: Object.freeze(["who else", "someone/anyone else", "no one else"]),
    modifiesAsHeadNotParticleOnly: true,
});

const LESSON43_SHARED_REFERENT_VIOLATION_FRAME = Object.freeze({
    kind: "lesson-43-shared-referent-violation-frame",
    sourceSection: "Andrews 43.6",
    idiomaticModificationMayViolateSharedReferentRestriction: true,
    cemNounstemSinglesIndividualOutOfGroup: true,
    pronominalGroupFrame: Object.freeze({
        sourceSection: "Andrews 43.6.1",
        groupMayBePronominalNnc: true,
        pluralSubjectPronounOnCemNncPreferred: true,
        thirdPersonSingularSubjectPronounPossible: true,
        personNumberAgreementMayMismatchAcrossClauses: true,
    }),
    nncGroupFrame: Object.freeze({
        sourceSection: "Andrews 43.6.2",
        groupMayBeNnc: true,
        pluralSubjectPronounOnCemNncPreferred: true,
        thirdPersonSingularSubjectPronounPossible: true,
        personNumberAgreementMayMismatchAcrossClauses: true,
    }),
});

const LESSON43_ONE_OF_NONE_OF_FRAME = Object.freeze({
    kind: "lesson-43-one-of-none-of-frame",
    sourceSection: "Andrews 43.7",
    singlingOutMayUseOtherMeans: true,
    acahFrame: Object.freeze({
        sourceSection: "Andrews 43.7.1",
        acahMayReplaceCemeh: true,
        acahMayCooperateWithCemeh: true,
        thirdPersonSingularSubjectPronounUsed: true,
    }),
    ayacFrame: Object.freeze({
        sourceSection: "Andrews 43.7.2",
        ayacMayExpressNoneOfGroup: true,
        agreementMayMismatchAcrossClauses: true,
    }),
});

const LESSON43_MALE_BONDING_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-43-male-bonding-modifier-frame",
    sourceSection: "Andrews 43.8",
    oquichNounstemModifierIsIdiomatic: true,
    maleSpeakerWithSocialOrFamilialTieUsesFirstPersonPluralSubjectPronoun: true,
    noAgreementRequiredBetweenThisPronounAndCooperatingNnc: true,
    unassociatedSpeakerUsesOrdinaryThirdPersonNnc: true,
});

const LESSON43_NAMED_PARTNER_MODIFIER_FRAME = Object.freeze({
    kind: "lesson-43-named-partner-modifier-frame",
    sourceSection: "Andrews 43.9",
    groupMayIncludeKnownEntityAndNewThirdPersonEntity: true,
    modifierNormallyMentionsOnlyNamedThirdPersonEntity: true,
    compareSupplementationLesson18_6: true,
});

const LESSON43_ADJECTIVAL_MODIFICATION_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson43-nonpreposed-supplementary-elements", andrewsSection: "43.1 item 1", category: "nonpreposed-modifier-supplementation", directiveEs: "El modificador no prepuesto puede contener elementos suplementarios que no caben en el modificador prepuesto.", engineSurface: "diagnostic nonpreposed-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-nonpreposed-distant-supplement", andrewsSection: "43.1 item 2", category: "distant-supplementary-element", directiveEs: "Un elemento suplementario dentro del adjunto adjetival puede estar a distancia.", engineSurface: "diagnostic discontinuity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-pronominal-head-nonpreposed", andrewsSection: "43.1 item 3", category: "personal-pronominal-nnc-head", directiveEs: "La construccion favorita combina modificador no prepuesto con una CNN pronominal personal como cabeza; la traduccion inglesa suele falsear la estructura.", engineSurface: "diagnostic nonpreposed-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-numeral-quantitive-head", andrewsSection: "43.1 item 4", category: "numeral-or-quantitive-head", directiveEs: "El adjunto no prepuesto modifica con frecuencia una cabeza numeral o cuantitativa; el ingles suele ocultar esa ponderacion.", engineSurface: "diagnostic nonpreposed-modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-preposed-nonpreposed-cooperation", andrewsSection: "43.2", category: "modifier-position-cooperation", directiveEs: "Un mismo nucleo puede recibir modificadores prepuestos y no prepuestos.", engineSurface: "diagnostic same-head multi-position frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-discontinuous-topicalized-head", andrewsSection: "43.3 source transform", category: "discontinuous-topicalized-head", directiveEs: "La discontinuidad frecuente topicaliza la cabeza y deja intacto el modificador.", engineSurface: "partial discontinuous-order AST metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-discontinuous-no-adjunctor", andrewsSection: "43.3 no adjunctor", category: "discontinuous-no-adjunctor", directiveEs: "A veces el modificador discontinuo no esta introducido por adjuntor.", engineSurface: "diagnostic discontinuity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-discontinuous-shifted-modifier", andrewsSection: "43.3 shifted modifier", category: "discontinuous-shifted-modifier", directiveEs: "Menos frecuente: la cabeza queda en su sitio y el modificador se desplaza; puede funcionar como adjunto adverbial o sujeto suplementario.", engineSurface: "diagnostic discontinuity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-interrogative-head-ambiguity", andrewsSection: "43.4", category: "interrogative-pronominal-head", directiveEs: "Ac y tleh como clausulas principales no son pronombres relativos; la estructura es ambigua entre suplementacion y modificacion.", engineSurface: "diagnostic interrogative-head frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-interrogative-head-in-unit", andrewsSection: "43.4 in warning", category: "adjunctor-in-unit", directiveEs: "La escritura solida tradicional disfraza que in forma unidad con la clausula que sigue.", engineSurface: "diagnostic interrogative-head frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-interrogative-supplementation", andrewsSection: "43.4.1", category: "interrogative-supplementation", directiveEs: "En suplementacion adjunta, ac se entiende como persona(s) y tleh como cosa(s); ac/tleh siguen siendo clausulas principales.", engineSurface: "diagnostic ambiguity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-interrogative-modification", andrewsSection: "43.4.2", category: "interrogative-modification", directiveEs: "En modificacion adjunta, ac se entiende como alguien/cualquiera y tleh como algo/cualquier cosa; za zo ac/tleh in da valores de quienquiera/lo que sea.", engineSurface: "diagnostic ambiguity frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-other-interrogative-heads", andrewsSection: "43.4 remark", category: "other-interrogative-nnc-heads", directiveEs: "Otras CNN interrogativas tambien pueden usarse en estructuras de modificacion.", engineSurface: "diagnostic interrogative-head frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-oc-ce-head", andrewsSection: "43.5", category: "oc-ce-collocation-head", directiveEs: "La colocacion oc ce puede servir como cabeza en una estructura de modificacion.", engineSurface: "diagnostic oc-ce head frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-shared-referent-violation-overview", andrewsSection: "43.6", category: "shared-referent-violation", directiveEs: "Algunas estructuras idiomaticas violan la restriccion general de correferente compartido.", engineSurface: "diagnostic shared-referent violation frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-cem-pronominal-group", andrewsSection: "43.6.1", category: "cem-pronominal-group", directiveEs: "Con grupo pronominal, la CNN con cem puede preferir pronombre sujeto plural, aunque tercera singular tambien es posible.", engineSurface: "diagnostic cem group frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-cem-nnc-group", andrewsSection: "43.6.2", category: "cem-nnc-group", directiveEs: "Con grupo CNN, la CNN con cem tambien prefiere pronombre sujeto plural y permite tercera singular.", engineSurface: "diagnostic cem group frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-acah-one-of", andrewsSection: "43.7.1", category: "acah-one-of", directiveEs: "Una CNN con acah puede reemplazar a cemeh o cooperar con ella para expresar uno de.", engineSurface: "diagnostic one-of frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-ayac-none-of", andrewsSection: "43.7.2", category: "ayac-none-of", directiveEs: "La CNN negativa ayac puede expresar ninguno de un grupo.", engineSurface: "diagnostic none-of frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-male-bonding-modifier", andrewsSection: "43.8", category: "male-bonding-modifier", directiveEs: "La estructura con oquich usa primera plural cuando el hablante varon tiene vinculo social o familiar con el grupo; no exige acuerdo con la CNN cooperante.", engineSurface: "diagnostic idiomatic modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson43-named-partner-modifier", andrewsSection: "43.9", category: "named-partner-modifier", directiveEs: "Cuando el grupo incluye entidad conocida y entidad tercera nombrada, normalmente solo se menciona la entidad tercera nombrada en el modificador.", engineSurface: "diagnostic idiomatic modifier frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson43AdjectivalModificationSubsectionInventory() {
    return LESSON43_ADJECTIVAL_MODIFICATION_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
    }));
}

function buildLesson43AdjectivalModificationPursuitFrame() {
    const subsectionInventory = getLesson43AdjectivalModificationSubsectionInventory();
    const nonpreposedModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON43_NONPREPOSED_MODIFIER_FRAME);
    const preposedNonpreposedCooperationFrame = cloneAdjectivalModificationLessonRecord(LESSON43_PREPOSED_NONPREPOSED_COOPERATION_FRAME);
    const discontinuousModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON43_DISCONTINUOUS_MODIFIER_FRAME);
    const interrogativeHeadFrame = cloneAdjectivalModificationLessonRecord(LESSON43_INTERROGATIVE_HEAD_FRAME);
    const ocCeCollocationFrame = cloneAdjectivalModificationLessonRecord(LESSON43_OC_CE_COLLOCATION_FRAME);
    const sharedReferentViolationFrame = cloneAdjectivalModificationLessonRecord(LESSON43_SHARED_REFERENT_VIOLATION_FRAME);
    const oneOfNoneOfFrame = cloneAdjectivalModificationLessonRecord(LESSON43_ONE_OF_NONE_OF_FRAME);
    const maleBondingModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON43_MALE_BONDING_MODIFIER_FRAME);
    const namedPartnerModifierFrame = cloneAdjectivalModificationLessonRecord(LESSON43_NAMED_PARTNER_MODIFIER_FRAME);
    const remainingGaps = [
        "Current Lesson 43 support records Andrews' nonpreposed, cooperating, discontinuous, interrogative-head, oc ce, one-of, male-bonding, and named-partner structures as diagnostics; it does not parse full sentence distance or transform topology.",
        "The current modificationAst can mark discontinuous order, but it does not detect topicalized heads, absent adjunctors, interrogative-head ambiguity, oc ce heads, or idiomatic shared-referent violations from raw Nawat clauses.",
        "The ac/tleh and in-unit warning is recorded as structural metadata only; it does not import traditional Classical solid spellings as Nawat/Pipil fixtures.",
        "A complete Andrews modifier/head clause-source model plus orthography context is still required before fixture data, parser/search detection, acciones de interfaz, or generation routing can expand.",
    ];
    const frame = {
        kind: "lesson-43-adjectival-modification-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 43,
        aimStatus: "shooting",
        routeStage: "audit-lesson-43",
        pdfRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 43.1-43.9 against current adjectival modification boundary metadata, nonpreposed modifier behavior, preposed/nonpreposed cooperation, discontinuity, interrogative heads, oc ce heads, shared-referent violations, one-of/none-of constructions, male-bonding modifiers, and named-partner modifiers.",
                andrewsRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                result: "hit",
                correction: "Lesson 43 now records Andrews adjectival modification architecture for nonpreposed modifiers, same-head cooperation, discontinuity, interrogative heads, oc ce, idiomatic shared-referent violations, one-of/none-of expressions, male-bonding modifiers, and named-partner modifiers while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_PDF_REFS),
                feedbackRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        nonpreposedModifierFrame,
        preposedNonpreposedCooperationFrame,
        discontinuousModifierFrame,
        interrogativeHeadFrame,
        ocCeCollocationFrame,
        sharedReferentViolationFrame,
        oneOfNoneOfFrame,
        maleBondingModifierFrame,
        namedPartnerModifierFrame,
        currentEngineBoundary: {
            adjectivalModificationBoundaryMetadataImplemented: true,
            modificationAstCompositionImplemented: true,
            nonpreposedModifierDiagnosticsPartial: true,
            preposedNonpreposedCooperationDiagnosticOnly: true,
            discontinuousModifierDiagnosticPartial: true,
            interrogativeHeadAmbiguityDiagnosticOnly: true,
            ocCeCollocationDiagnosticOnly: true,
            sharedReferentViolationDiagnosticOnly: true,
            oneOfNoneOfDiagnosticOnly: true,
            maleBondingModifierDiagnosticOnly: true,
            namedPartnerModifierDiagnosticOnly: true,
            parserDetectionImplemented: false,
            fixtureBackedClauseExamplesImplemented: false,
            newWordGenerationAllowed: false,
            fullLesson43GenerationImplemented: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachAdjectivalModificationPursuitGrammarContract(frame, {
        metadataKind: "lesson-43-adjectival-modification-pursuit-frame",
        unitKind: "adjectival-modification-boundary",
        routeStage: "audit-lesson-43",
        structuralSource: "Andrews Lesson 43",
        andrewsRefs: Array.from(LESSON43_ADJECTIVAL_MODIFICATION_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 43.1-43.9",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil clause orthography bridge",
            noClassicalSurfaceImport: true,
            orthographyStatus: "not-surface-bearing",
        },
        morphBoundaryFrame: {
            nonpreposedModifierFrame,
            preposedNonpreposedCooperationFrame,
            discontinuousModifierFrame,
            interrogativeHeadFrame,
            ocCeCollocationFrame,
            sharedReferentViolationFrame,
            oneOfNoneOfFrame,
            maleBondingModifierFrame,
            namedPartnerModifierFrame,
        },
        nuclearClauseFrame: {
            sourceClauseKind: "multiple nuclear clauses",
            targetRelationKind: "adjectival modification",
            nonpreposedModifierPeculiaritiesRecorded: true,
            discontinuityRecorded: true,
            interrogativeHeadsAreNotRelativePronouns: true,
            idiomaticSharedReferentViolationsRecorded: true,
        },
        participantFrame: {
            semanticRole: "head/modifier shared or idiomatically nonmatching referent",
            pronominalNncHeadPossible: true,
            numeralOrQuantitiveNncHeadPossible: true,
            personNumberAgreementMismatchDiagnosticOnly: true,
        },
        targetContract: {
            metadataKind: "lesson-43-adjectival-modification-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["adjectival-modification-lesson-43-diagnostic-partial", "adjectival-modification-source-gated"],
    });
}

function normalizeAdjectivalModificationEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeAdjectivalModificationRelation(value = "") {
    return normalizeAdjectivalModificationEnum(
        value,
        Object.values(ADJECTIVAL_MODIFICATION_RELATION),
        ADJECTIVAL_MODIFICATION_RELATION.unknown
    );
}

function normalizeAdjectivalModificationOrder(value = "") {
    return normalizeAdjectivalModificationEnum(
        value,
        Object.values(ADJECTIVAL_MODIFICATION_ORDER),
        ADJECTIVAL_MODIFICATION_ORDER.unknown
    );
}

function normalizeAdjectivalModificationScope(value = "") {
    return normalizeAdjectivalModificationEnum(
        value,
        Object.values(ADJECTIVAL_MODIFICATION_SCOPE),
        ADJECTIVAL_MODIFICATION_SCOPE.unknown
    );
}

function normalizeAdjectivalModificationLinkRole(value = "") {
    return normalizeAdjectivalModificationEnum(
        value,
        Object.values(ADJECTIVAL_MODIFICATION_LINK_ROLE),
        ADJECTIVAL_MODIFICATION_LINK_ROLE.unknown
    );
}

function normalizeAdjectivalModificationFalsePositiveSource(value = "") {
    return normalizeAdjectivalModificationEnum(
        value,
        Object.values(ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE),
        ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getAdjectivalModificationAntiConflationRules() {
    return Array.from(ADJECTIVAL_MODIFICATION_ANTI_CONFLATION_RULES);
}

function getAdjectivalModificationStructuralQuestions() {
    return ADJECTIVAL_MODIFICATION_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildAdjectivalModificationBoundaryMetadata() {
    return {
        kind: "adjectival-modification-boundary",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        lessons: [42, 43],
        status: "partial",
        structuralSource: "Andrews Lessons 42-43",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdjectivalModificationStructuralQuestions(),
        boundaries: {
            hasAdjectiveLikeWordOutputs: true,
            hasNominalizationProfileMetadata: true,
            hasModificationAst: true,
            hasConfirmedClauseExamples: false,
            changesAdjectiveGeneration: false,
            changesNncGeneration: false,
            changesVncGeneration: false,
            treatsSingleGeneratedWordAsModificationEvidence: false,
        },
        antiConflationRules: getAdjectivalModificationAntiConflationRules(),
    };
}

function getAdjectivalModificationSurface(input = "", fallback = "") {
    if (typeof input === "string") {
        return String(input || fallback || "").trim();
    }
    if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
    }
    const surface = getAdjectivalModificationSurfaceForms(input)[0];
    if (getAdjectivalModificationResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
    }
    return String(surface || fallback || "").trim();
}

function splitAdjectivalModificationSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
}

function getAdjectivalModificationCanonicalRealizationSurfaceForms(resultFrame = null) {
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

function getAdjectivalModificationSelectedRealizationVariant(input = null) {
    if (!input || typeof input !== "object") {
        return null;
    }
    const grammarFrame = getAdjectivalModificationResultFrame(input);
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

function getAdjectivalModificationResultFrame(input = null) {
    return (
        (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null)
        || (input?.frames && typeof input.frames === "object" ? input.frames : null)
    );
}

function getAdjectivalModificationSurfaceForms(input = null) {
    if (typeof input === "string") {
        return splitAdjectivalModificationSurfaceText(input);
    }
    if (!input || typeof input !== "object") {
        return [];
    }
    const grammarFrame = getAdjectivalModificationResultFrame(input);
    const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
    const hasResultFrame = Boolean(frameResult);
    const canonicalForms = getAdjectivalModificationCanonicalRealizationSurfaceForms(frameResult);
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
        .flatMap((entry) => splitAdjectivalModificationSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getAdjectivalModificationFormulaSlots(input = null) {
    if (!input || typeof input !== "object") {
        return null;
    }
    return input.formulaSlots
        || input.clauseFrame?.formulaSlots
        || input.nncBasic?.formulaSlots
        || input.nuclearClauseShell?.formulaSlots
        || input.adjectivalNncFunctionFrame?.sourceFormulaSlots
        || null;
}

function getAdjectivalModificationFormulaEcho(input = null) {
    if (!input || typeof input !== "object") {
        return "";
    }
    return String(
        input.formulaEcho
        || input.clauseFrame?.formulaEcho
        || input.nncBasic?.formulaEcho
        || input.nuclearClauseShell?.formulaEcho
        || input.adjectivalNncFunctionFrame?.sourceFormulaEcho
        || ""
    );
}

function buildAdjectivalModificationClauseNode(input = "", role = "unknown", fallbackSurface = "") {
    const surface = getAdjectivalModificationSurface(input, fallbackSurface);
    const formulaSlots = getAdjectivalModificationFormulaSlots(input);
    const selectedVariant = getAdjectivalModificationSelectedRealizationVariant(input);
    return {
        kind: "adjectival-modification-clause-node",
        role: String(role || "unknown"),
        surface,
        ...(selectedVariant ? {
            selectedVariant,
            selectedVariantId: selectedVariant.selectedVariantId,
            formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
            formulaRecordId: selectedVariant.formulaRecordId,
        } : {}),
        clauseKind: typeof input === "object" && input
            ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown")
            : "unknown",
        formulaSlots,
        formulaEcho: getAdjectivalModificationFormulaEcho(input),
        sourceOutputKind: typeof input === "object" && input ? String(input.outputKind || "") : "",
        preservesSurface: true,
    };
}

function buildAdjectivalModificationSurfaceSequence({
    headSurface = "",
    modifierSurface = "",
    order = ADJECTIVAL_MODIFICATION_ORDER.headModifier,
    marker = "",
} = {}) {
    const head = String(headSurface || "").trim();
    const modifier = String(modifierSurface || "").trim();
    const markerText = String(marker || "").trim();
    switch (order) {
        case ADJECTIVAL_MODIFICATION_ORDER.headMarkedModifier:
            return [head, markerText, modifier].filter(Boolean);
        case ADJECTIVAL_MODIFICATION_ORDER.modifierHeadPreposed:
            return [modifier, head].filter(Boolean);
        case ADJECTIVAL_MODIFICATION_ORDER.markedModifierHeadAdjoined:
            return [markerText, modifier, head].filter(Boolean);
        case ADJECTIVAL_MODIFICATION_ORDER.discontinuous:
            return [head, "...", modifier].filter(Boolean);
        case ADJECTIVAL_MODIFICATION_ORDER.headModifier:
        default:
            return [head, modifier].filter(Boolean);
    }
}

function buildAdjectivalModificationAst({
    head = "",
    modifier = "",
    headSurface = "",
    modifierSurface = "",
    order = ADJECTIVAL_MODIFICATION_ORDER.headModifier,
    marker = "",
    scope = ADJECTIVAL_MODIFICATION_SCOPE.standalone,
    relation = ADJECTIVAL_MODIFICATION_RELATION.attributiveModifier,
    linkRole = ADJECTIVAL_MODIFICATION_LINK_ROLE.sharedSubject,
    evidenceSource = "",
    confirmed = false,
} = {}) {
    const normalizedOrder = normalizeAdjectivalModificationOrder(order);
    const normalizedScope = normalizeAdjectivalModificationScope(scope);
    const normalizedRelation = normalizeAdjectivalModificationRelation(relation);
    const normalizedLinkRole = normalizeAdjectivalModificationLinkRole(linkRole);
    const headNode = buildAdjectivalModificationClauseNode(head, "head", headSurface);
    const modifierNode = buildAdjectivalModificationClauseNode(modifier, "modifier", modifierSurface);
    const markerText = String(marker || "").trim();
    const diagnostics = [];
    if (!headNode.surface) {
        diagnostics.push("adjectival-modification-requires-head-surface");
    }
    if (!modifierNode.surface) {
        diagnostics.push("adjectival-modification-requires-modifier-surface");
    }
    if (normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.unknown) {
        diagnostics.push("adjectival-modification-unknown-order");
    }
    if (
        (normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.headMarkedModifier
            || normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.markedModifierHeadAdjoined)
        && !markerText
    ) {
        diagnostics.push("adjectival-modification-marked-order-requires-marker");
    }
    if (
        normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.markedModifierHeadAdjoined
        && normalizedScope === ADJECTIVAL_MODIFICATION_SCOPE.standalone
    ) {
        diagnostics.push("adjectival-modification-marked-preposed-unit-requires-adjoined-scope");
    }
    if (normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.modifierHeadPreposed) {
        diagnostics.push("adjectival-modification-preposed-modifier-is-not-topic");
    }
    if (!String(evidenceSource || "").trim()) {
        diagnostics.push("adjectival-modification-source-gated");
    }
    const supported = Boolean(headNode.surface && modifierNode.surface && normalizedOrder !== ADJECTIVAL_MODIFICATION_ORDER.unknown);
    const surfaceSequence = supported
        ? buildAdjectivalModificationSurfaceSequence({
            headSurface: headNode.surface,
            modifierSurface: modifierNode.surface,
            order: normalizedOrder,
            marker: markerText,
        })
        : [];
    return attachGrammarAstContract({
        kind: "adjectival-modification-ast",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        lessons: [42, 43],
        structuralSource: "Andrews Lessons 42-43",
        targetAuthority: "Nawat/Pipil generated outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        relation: normalizedRelation,
        order: normalizedOrder,
        scope: normalizedScope,
        marker: markerText,
        head: headNode,
        modifier: modifierNode,
        link: {
            role: normalizedLinkRole,
            mechanism: "shared-referent affixal pronoun alignment",
            requiresAgreementEvidence: true,
        },
        transformations: {
            isPreposed: normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.modifierHeadPreposed
                || normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.markedModifierHeadAdjoined,
            isMarked: Boolean(markerText),
            isDiscontinuous: normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.discontinuous,
            isTopic: false,
        },
        ambiguity: {
            withSupplementation: normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.headModifier
                || normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.headMarkedModifier
                || normalizedOrder === ADJECTIVAL_MODIFICATION_ORDER.modifierHeadPreposed,
            diagnostics: ["adjectival-modification-supplementation-ambiguity-possible"],
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildAdjectivalModificationBoundaryMetadata(),
    }, {
        astKind: "adjectival-modification-ast",
        lessons: [42, 43],
        structuralSource: "Andrews Lessons 42-43",
    });
}

function classifyAdjectivalModificationCandidate({
    head = "",
    modifier = "",
    candidate = "",
    relation = "",
    order = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRelation = normalizeAdjectivalModificationRelation(relation);
    const normalizedFalsePositive = normalizeAdjectivalModificationFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "adjectival-modification-candidate-classification",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        head: String(head || ""),
        modifier: String(modifier || ""),
        candidate: String(candidate || ""),
        relation: normalizedRelation,
        order: String(order || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "adjectival-modification-needs-validation" : "adjectival-modification-source-gated",
            normalizedRelation !== ADJECTIVAL_MODIFICATION_RELATION.unknown
                ? "adjectival-modification-relation-recognized"
                : "adjectival-modification-relation-unconfirmed",
            normalizedFalsePositive !== ADJECTIVAL_MODIFICATION_FALSE_POSITIVE_SOURCE.unknown
                ? "adjectival-modification-false-positive-source"
                : "adjectival-modification-unconfirmed",
        ],
        boundary: buildAdjectivalModificationBoundaryMetadata(),
    };
}

function classifyAdjectivalModificationFalsePositive(source = "") {
    const normalizedSource = normalizeAdjectivalModificationFalsePositiveSource(source);
    return {
        kind: "adjectival-modification-false-positive",
        version: ADJECTIVAL_MODIFICATION_BOUNDARY_VERSION,
        source: normalizedSource,
        isModificationEvidence: false,
        isSupplementationEvidence: false,
        isTopicEvidence: false,
        generationAllowed: false,
        diagnostics: ["adjectival-modification-false-positive-source"],
        antiConflationRules: getAdjectivalModificationAntiConflationRules(),
    };
}
