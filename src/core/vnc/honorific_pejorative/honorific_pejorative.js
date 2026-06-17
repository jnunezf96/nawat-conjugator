// core/vnc/honorific_pejorative/honorific_pejorative.js
// Lesson 33 honorific/pejorative VNC boundary metadata. This keeps current
// VNC derivation and label surfaces separate from confirmed honorific or
// pejorative VNC generation until Nawat/Pipil evidence supports it.

"use strict";

const HONORIFIC_PEJORATIVE_BOUNDARY_VERSION = 1;

const HONORIFIC_PEJORATIVE_POLARITY = Object.freeze({
    honorific: "honorific",
    pejorative: "pejorative",
    neutral: "neutral",
    unknown: "unknown",
});

const HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE = Object.freeze({
    politeTranslation: "polite-translation",
    pejorativeTranslation: "pejorative-translation",
    ordinaryCausative: "ordinary-causative",
    ordinaryApplicative: "ordinary-applicative",
    nonactiveDerivation: "nonactive-derivation",
    personLabel: "person-label",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES = Object.freeze([
    "honorific/pejorative boundary metadata is not generation",
    "polite or insulting translation labels are not Nawat/Pipil fixture evidence",
    "ordinary causative/applicative derivation is not honorific or pejorative VNC generation",
    "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation",
    "person or agreement labels are not honorific or pejorative VNC evidence",
    "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil form authority",
]);

const HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "sourceStem",
        asks: "Which VNC stem is the source of the honorific or pejorative candidate?",
    }),
    Object.freeze({
        field: "polarity",
        asks: "Is the candidate honorific, pejorative, neutral, or unknown?",
    }),
    Object.freeze({
        field: "morphologicalStrategy",
        asks: "What Nawat/Pipil evidence shows the honorific or pejorative strategy?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided form evidence supports the status?",
    }),
]);

const LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/honorific_pejorative.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 33.1",
    "Andrews Lesson 33.2",
    "Andrews Lesson 33.3",
    "Andrews Lesson 33.4",
    "Andrews Lesson 33.5",
    "Andrews Lesson 33.6",
    "Andrews Lesson 33.7",
    "Andrews Lesson 33.8",
    "Andrews Lesson 33.9",
    "Andrews Lesson 33.10",
]);

const LESSON33_HONORIFIC_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-33-honorific-overview-frame",
    sourceSection: "Andrews 33.1",
    honorificMeaning: "respect or high esteem toward another entity",
    selfHonorificWarning: "one should not use an honorific to speak of oneself",
    ordinaryRoute: "neutral VNC transformed into causative or applicative VNC with reflexive mainline object",
    reflexiveSourceRoute: "mainline reflexive-object source requires special compound stem",
    translationSymbolIsNotEvidence: "H marks an honorific source in glosses; translation tone is not structural evidence",
});

const LESSON33_INTRANSITIVE_CAUSATIVE_FRAME = Object.freeze({
    kind: "lesson-33-intransitive-causative-honorific-frame",
    sourceSection: "Andrews 33.2",
    sourceKind: "intransitive VNC",
    strategy: "honorific-via-causative-reflexive",
    reflexiveObjectPresentsHonoredEntityAsCausingSelfToAct: true,
    causativeFamilies: Object.freeze(["type-one-causative", "type-two-causative", "lia-causative"]),
    irregularIntransitiveBoundary: Object.freeze({
        causativeHonorificsAttested: true,
        connectiveTCompoundOftenPreferred: true,
        yaUhAndHualLaUhUseMoHuica: true,
        huiTzUsesMoHuicaTz: true,
        optativeUnavailableForMoHuicaTzSoIndicativeCommandsUsed: true,
    }),
    causativeOrApplicativeChoiceMayVaryByVerb: true,
});

const LESSON33_INTRANSITIVE_APPLICATIVE_FRAME = Object.freeze({
    kind: "lesson-33-intransitive-applicative-honorific-frame",
    sourceSection: "Andrews 33.3",
    sourceKind: "intransitive VNC",
    strategy: "honorific-via-applicative-reflexive",
    semanticPresentation: "honored subject acts for own sake or interest",
    someApplicativeStemsOnlyOccurInHonorificVncs: true,
    causativeOrApplicativeChoiceMayVaryByVerb: true,
});

const LESSON33_PROJECTIVE_APPLICATIVE_FRAME = Object.freeze({
    kind: "lesson-33-projective-applicative-honorific-frame",
    sourceSection: "Andrews 33.4",
    sourceKind: "projective-object VNC",
    strategy: "honorific-via-applicative-reflexive",
    honoredEntityMayBeSubjectOrObject: true,
    ambiguityBecauseNoSignalIdentifiesHonoredEntity: true,
    firstPersonSubjectPermittedOnlyWhenPatientHonored: true,
});

const LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME = Object.freeze({
    kind: "lesson-33-causative-applicative-source-honorific-frame",
    sourceSection: "Andrews 33.5",
    sourceKinds: Object.freeze(["causative VNC", "applicative VNC"]),
    followsProjectiveObjectGeneralRule: true,
    strategy: "honorific-via-applicative-reflexive",
    existingCausativeApplicativeGenerationIsNotHonorificEvidence: true,
});

const LESSON33_PROJECTIVE_CAUSATIVE_FRAME = Object.freeze({
    kind: "lesson-33-projective-causative-honorific-frame",
    sourceSection: "Andrews 33.6",
    sourceKind: "projective-object VNC",
    strategy: "honorific-via-causative-reflexive",
    honoredEntityMayBePatientOrAgent: true,
    ambiguityBecauseAgentStillCausesSelfToAct: true,
    causativeOrApplicativeChoiceMayVaryByVerb: true,
});

const LESSON33_REFLEXIVE_SOURCE_FRAME = Object.freeze({
    kind: "lesson-33-reflexive-source-honorific-frame",
    sourceSection: "Andrews 33.7",
    sourceKind: "mainline reflexive-object VNC",
    strategy: "preterit-embed integrated compound",
    matrixStem: "tla-(tzin-o-a)",
    matrixMeaning: "cause something to become honored",
    sourceOfMatrix: "affective-matrix nounstem tzin",
    embeddedPredicate: "perfective stem plus preterit-tense zero",
    embeddedPredicateReplacesSpecificObjectOfMatrix: true,
    objectPronounsSameAsSourceVnc: true,
    validForVerbstemClasses: Object.freeze(["A", "B", "C", "D"]),
    shuntlineAndMainlineReflexiveSourcesMustRemainDistinct: true,
});

const LESSON33_REVERENTIAL_FRAME = Object.freeze({
    kind: "lesson-33-reverential-frame",
    sourceSection: "Andrews 33.8",
    subtypeOfHonorific: true,
    strategy: "double honorific construction",
    firstHonorificBecomesReflexiveObjectVnc: true,
    honorificPreteritPredicateIncorporatedIntoTzinoaMatrix: true,
    translationSymbol: "R",
});

const LESSON33_PEJORATIVE_FRAME = Object.freeze({
    kind: "lesson-33-pejorative-frame",
    sourceSection: "Andrews 33.9",
    pejorativeMeaning: "contempt or scorn",
    strategy: "preterit-embed integrated compound",
    matrixStem: "ta-(pul-u-a)",
    matrixMeaning: "cause something to become disparaged",
    matrixOnlyUsedInThisConstruction: true,
    sourceOfMatrix: "affective-matrix nounstem pul",
    sourceKinds: Object.freeze(["intransitive VNC", "projective-object VNC", "reflexive-object VNC"]),
    selfPejorativePermitted: true,
    validForVerbstemClasses: Object.freeze(["A", "B", "C", "D"]),
    translationSymbol: "P",
});

const LESSON33_COMPOUND_VERBSTEM_FRAME = Object.freeze({
    kind: "lesson-33-compound-verbstem-honorific-pejorative-frame",
    sourceSection: "Andrews 33.10",
    compoundVerbstemsCanUndergoHonorificPejorativeTransform: true,
    intransitiveMatrixConnectiveTCompoundNormallyTransformsEmbed: true,
    itziHonorificInConnectiveTCompoundUsesApplicativeStem: "m-o+te-/tla-(itz-ti-lia)",
    idiomaticCompoundTransformsMatrixStem: true,
    sharedObjectCompoundTransformsMatrixStem: true,
    sharedObjectMatrixTransformShowsTighterBoundCompoundUnit: true,
});

const LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson33-honorific-overview", andrewsSection: "33.1", category: "honorific-vnc-overview", directiveEs: "El honorifico expresa respeto hacia otra entidad; no es una etiqueta de traduccion ni una forma para hablar de uno mismo.", engineSurface: "diagnostic honorific overview frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson33-intransitive-causative", andrewsSection: "33.2", category: "honorific-intransitive-causative", directiveEs: "Fuentes intransitivas pueden formar honorifico con causativo y reflexivo mainline; irregulares y compuestos requieren rutas propias.", engineSurface: "diagnostic intransitive causative frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson33-intransitive-applicative", andrewsSection: "33.3", category: "honorific-intransitive-applicative", directiveEs: "Algunas fuentes intransitivas forman honorifico con aplicativo reflexivo y accion en beneficio propio.", engineSurface: "diagnostic intransitive applicative frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson33-projective-applicative", andrewsSection: "33.4", category: "honorific-projective-applicative", directiveEs: "Fuentes con objeto proyectivo suelen usar aplicativo reflexivo; el honrado puede ser sujeto u objeto y queda ambiguo.", engineSurface: "diagnostic projective applicative frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson33-causative-applicative-sources", andrewsSection: "33.5", category: "honorific-causative-applicative-source", directiveEs: "VNC causativos y aplicativos siguen la regla de fuentes con objeto proyectivo; la derivacion ordinaria no basta como evidencia.", engineSurface: "diagnostic causative/applicative source frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson33-projective-causative", andrewsSection: "33.6", category: "honorific-projective-causative", directiveEs: "Algunas fuentes proyectivas usan causativo reflexivo y conservan ambiguedad agente/paciente.", engineSurface: "diagnostic projective causative frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson33-reflexive-sources", andrewsSection: "33.7", category: "honorific-reflexive-source", directiveEs: "Fuentes reflexivas mainline usan compuesto integrado con incrustado preterito y matriz tzin-o-a.", engineSurface: "diagnostic reflexive source frame", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson33-reverential", andrewsSection: "33.8", category: "reverential-vnc", directiveEs: "El reverencial dobla la construccion honorifica incorporando el preterito del honorifico en tzin-o-a.", engineSurface: "diagnostic reverential frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson33-pejorative", andrewsSection: "33.9", category: "pejorative-vnc", directiveEs: "El peyorativo usa compuesto con incrustado preterito y matriz pul-u-a para desprecio o escarnio.", engineSurface: "diagnostic pejorative frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson33-compound-verbstems", andrewsSection: "33.10", category: "compound-verbstem-honorific-pejorative", directiveEs: "Los compuestos verbales pueden transformarse; incrustado, matriz o unidad fija dependen del tipo de compuesto.", engineSurface: "diagnostic compound verbstem frame", implementationState: "partial", redirectAction: "refactor-engine" }),
]);

function cloneHonorificPejorativeLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => cloneHonorificPejorativeLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, cloneHonorificPejorativeLessonRecord(value)])
    );
}

function getLesson33HonorificPejorativeSubsectionInventory() {
    return LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS),
    }));
}

function buildLesson33HonorificPejorativePursuitFrame() {
    const subsectionInventory = getLesson33HonorificPejorativeSubsectionInventory();
    const overviewFrame = cloneHonorificPejorativeLessonRecord(LESSON33_HONORIFIC_OVERVIEW_FRAME);
    const intransitiveCausativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_INTRANSITIVE_CAUSATIVE_FRAME);
    const intransitiveApplicativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_INTRANSITIVE_APPLICATIVE_FRAME);
    const projectiveApplicativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PROJECTIVE_APPLICATIVE_FRAME);
    const causativeApplicativeSourceFrame = cloneHonorificPejorativeLessonRecord(LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME);
    const projectiveCausativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PROJECTIVE_CAUSATIVE_FRAME);
    const reflexiveSourceFrame = cloneHonorificPejorativeLessonRecord(LESSON33_REFLEXIVE_SOURCE_FRAME);
    const reverentialFrame = cloneHonorificPejorativeLessonRecord(LESSON33_REVERENTIAL_FRAME);
    const pejorativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PEJORATIVE_FRAME);
    const compoundVerbstemFrame = cloneHonorificPejorativeLessonRecord(LESSON33_COMPOUND_VERBSTEM_FRAME);
    const remainingGaps = [
        "Current honorific/pejorative metadata is not an honorific or pejorative VNC generator.",
        "Causative/applicative reflexive honorific routing, agent/patient ambiguity, and source-specific strategy choice remain diagnostic.",
        "Preterit-embed honorific, reverential, and pejorative compound routing with tzin-o-a or pul-u-a matrices is not implemented.",
        "Compound-verbstem transformation targets and confirmed Nawat/Pipil honorific or pejorative examples remain evidence-needed.",
    ];
    const frame = {
        kind: "lesson-33-honorific-pejorative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 33,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 33.1-33.10 against current honorific/pejorative boundary metadata, causative/applicative reflexive routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pul-u-a compounds, and compound-verbstem transforms.",
                andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                result: "hit",
                correction: "Lesson 33 now records Andrews honorific and pejorative VNC architecture, causative/applicative reflexive honorific routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pul-u-a compounds, and compound-verbstem transformation boundaries while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        overviewFrame,
        intransitiveCausativeFrame,
        intransitiveApplicativeFrame,
        projectiveApplicativeFrame,
        causativeApplicativeSourceFrame,
        projectiveCausativeFrame,
        reflexiveSourceFrame,
        reverentialFrame,
        pejorativeFrame,
        compoundVerbstemFrame,
        currentEngineBoundary: {
            honorificPejorativeBoundaryMetadataImplemented: true,
            ordinaryCausativeApplicativeGenerationPreserved: true,
            honorificGenerationImplemented: false,
            pejorativeGenerationImplemented: false,
            reverentialGenerationImplemented: false,
            preteritEmbedTzinoaRoutingImplemented: false,
            preteritEmbedPuluaRoutingImplemented: false,
            compoundVerbstemTransformGenerationImplemented: false,
            finiteOutputExpansionAllowed: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachHonorificPejorativeGrammarContract(frame, {
        unitKind: "honorific-pejorative-vnc-boundary",
        routeStage: "audit-lesson-33",
        structuralSource: "Andrews Lesson 33",
        andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 33.1-33.10",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
        },
        morphBoundaryFrame: {
            overviewFrame,
            intransitiveCausativeFrame,
            intransitiveApplicativeFrame,
            projectiveApplicativeFrame,
            causativeApplicativeSourceFrame,
            projectiveCausativeFrame,
            reflexiveSourceFrame,
            reverentialFrame,
            pejorativeFrame,
            compoundVerbstemFrame,
        },
        stemFrame: {
            stemKind: "honorific-pejorative-vnc",
            honorificOrdinaryRoute: overviewFrame.ordinaryRoute,
            reflexiveHonorificMatrix: reflexiveSourceFrame.matrixStem,
            pejorativeMatrix: pejorativeFrame.matrixStem,
            compoundVerbstemsCanTransform: compoundVerbstemFrame.compoundVerbstemsCanUndergoHonorificPejorativeTransform,
        },
        participantFrame: {
            honorificMeaning: overviewFrame.honorificMeaning,
            pejorativeMeaning: pejorativeFrame.pejorativeMeaning,
            honoredEntityMayBeSubjectOrObject: projectiveApplicativeFrame.honoredEntityMayBeSubjectOrObject,
            selfPejorativePermitted: pejorativeFrame.selfPejorativePermitted,
        },
        targetContract: {
            metadataKind: "lesson-33-honorific-pejorative-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["honorific-pejorative-diagnostic-only", "honorific-pejorative-needs-nawat-evidence"],
    });
}

function attachHonorificPejorativeGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "vnc-derivation-boundary",
        routeFamily: "honorific-pejorative",
        structuralSource: "Andrews Lesson 33",
        andrewsRefs: ["Andrews Lesson 33"],
        ...options,
    });
}

function normalizeHonorificPejorativeEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeHonorificPejorativePolarity(value = "") {
    return normalizeHonorificPejorativeEnum(
        value,
        Object.values(HONORIFIC_PEJORATIVE_POLARITY),
        HONORIFIC_PEJORATIVE_POLARITY.unknown
    );
}

function normalizeHonorificPejorativeFalsePositiveSource(value = "") {
    return normalizeHonorificPejorativeEnum(
        value,
        Object.values(HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE),
        HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getHonorificPejorativeAntiConflationRules() {
    return Array.from(HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES);
}

function getHonorificPejorativeStructuralQuestions() {
    return HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildHonorificPejorativeBoundaryMetadata() {
    const boundary = {
        kind: "honorific-pejorative-boundary",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        lesson: 33,
        status: "partial",
        structuralSource: "Andrews Lesson 33",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getHonorificPejorativeStructuralQuestions(),
        boundaries: {
            hasVncGeneration: true,
            hasHonorificGeneration: false,
            hasPejorativeGeneration: false,
            hasConfirmedFixtureData: false,
            changesCausativeGeneration: false,
            changesApplicativeGeneration: false,
            changesNonactiveGeneration: false,
            changesVncGeneration: false,
            treatsTranslationToneAsEvidence: false,
        },
        antiConflationRules: getHonorificPejorativeAntiConflationRules(),
    };
    return attachHonorificPejorativeGrammarContract(boundary, {
        metadataKind: "honorific-pejorative-boundary",
        routeStage: "classify-boundary",
        supported: false,
        morphBoundaryFrame: boundary,
        targetContract: {
            metadataKind: "honorific-pejorative-boundary",
            generationAllowed: false,
            hasHonorificGeneration: false,
            hasPejorativeGeneration: false,
        },
    });
}

function classifyHonorificPejorativeCandidate({
    sourceStem = "",
    candidate = "",
    polarity = "",
    morphologicalStrategy = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedPolarity = normalizeHonorificPejorativePolarity(polarity);
    const normalizedFalsePositive = normalizeHonorificPejorativeFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "honorific-pejorative-candidate-classification",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        polarity: normalizedPolarity,
        morphologicalStrategy: String(morphologicalStrategy || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "honorific-pejorative-needs-validation" : "honorific-pejorative-needs-nawat-evidence",
            normalizedPolarity !== HONORIFIC_PEJORATIVE_POLARITY.unknown
                ? "honorific-pejorative-category-recognized"
                : "honorific-pejorative-category-unconfirmed",
            normalizedFalsePositive !== HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown
                ? "honorific-pejorative-false-positive-source"
                : "honorific-pejorative-unconfirmed",
        ],
        boundary: buildHonorificPejorativeBoundaryMetadata(),
    };
    return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        supported: false,
        diagnostics: classification.diagnostics,
        stemFrame: {
            stemKind: "honorific-pejorative-candidate",
            sourceStem: classification.sourceStem,
            targetStem: classification.candidate,
            morphologicalStrategy: classification.morphologicalStrategy,
        },
        participantFrame: {
            honorificPejorativePolarity: normalizedPolarity,
            evidenceSource: classification.evidenceSource,
        },
        targetContract: {
            metadataKind: "honorific-pejorative-candidate-classification",
            generationAllowed: false,
            polarity: normalizedPolarity,
        },
    });
}

function classifyHonorificPejorativeFalsePositive(source = "") {
    const normalizedSource = normalizeHonorificPejorativeFalsePositiveSource(source);
    const classification = {
        kind: "honorific-pejorative-false-positive",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        source: normalizedSource,
        isHonorificEvidence: false,
        isPejorativeEvidence: false,
        generationAllowed: false,
        diagnostics: ["honorific-pejorative-false-positive-source"],
        antiConflationRules: getHonorificPejorativeAntiConflationRules(),
    };
    return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics,
    });
}
