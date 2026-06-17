// core/vnc/purposive/purposive.js
// Lesson 29 purposive/directional boundary metadata. This layer keeps the
// repo's existing directional-prefix mechanics separate from confirmed
// purposive VNC generation until Nawat/Pipil evidence supports it.

"use strict";

const PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION = 1;

const PURPOSIVE_DIRECTIONAL_RELATION = Object.freeze({
    directional: "directional",
    purpose: "purpose",
    purposiveDirectional: "purposive-directional",
    unknown: "unknown",
});

const PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE = Object.freeze({
    directionalPrefixOnly: "directional-prefix-only",
    parserBracketSyntax: "parser-bracket-syntax",
    composerDirectionalControl: "composer-directional-control",
    translationLabel: "translation-label",
    compoundMarker: "compound-marker",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES = Object.freeze([
    "directional prefix mechanics are not purposive VNC generation",
    "bracketed directional parser syntax is not purposive evidence",
    "composer directional controls are not confirmed purposive forms",
    "purpose translations are not Nawat/Pipil fixture evidence",
    "compound parsing is not purposive VNC generation",
    "Andrews purposive categories are architecture, not Nawat/Pipil form authority",
]);

const PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "sourceStem",
        asks: "Which VNC stem is the source of the purposive or directional candidate?",
    }),
    Object.freeze({
        field: "directionalPrefix",
        asks: "Is a directional prefix such as wal or un present, and is it evidence-backed?",
    }),
    Object.freeze({
        field: "relation",
        asks: "Is the relation directional, purposive, both, or unknown?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided clause/form evidence supports purposive status?",
    }),
]);

const LESSON29_PURPOSIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/purposive.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON29_PURPOSIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 29.1",
    "Andrews Lesson 29.2",
    "Andrews Lesson 29.3",
    "Andrews Lesson 29.4",
    "Andrews Lesson 29.5",
    "Andrews Lesson 29.6",
    "Andrews Lesson 29.7",
]);

const LESSON29_PURPOSIVE_VERBSTEM_FRAME = Object.freeze({
    kind: "lesson-29-purposive-verbstem-frame",
    sourceSection: "Andrews 29.1",
    compoundType: "future-embed linked connectiveless compound",
    differsFromLesson2811IntegratedFutureEmbed: true,
    differsFromLesson28ConnectiveTCompounds: true,
    embed: Object.freeze({
        predicateTense: "future",
        futureMorph: "silent variant of z",
        classCImperfectiveStem: "final a deletes and remaining i/o lengthens",
        classDImperfectiveStem: "final a remains long",
        embedActionOccursAfterMatrixMovement: true,
    }),
    matrix: Object.freeze({
        valence: "intransitive",
        directionalPrefixInsideMatrixStem: true,
        directionalMorphs: Object.freeze([
            Object.freeze({ classical: "t", direction: "outbound/thither", nawatLetterHint: "t" }),
            Object.freeze({ classical: "c/qu", direction: "inbound/hither", nawatLetterHint: "k" }),
        ]),
        directionalMorphsAreNotConnectiveT: true,
        silentFutureMorphAlwaysPrecedesDirectionalPrefix: true,
        baseStemMeaning: "move purposefully",
        imperfectiveBaseStem: "i",
        imperfectiveCompoundVariants: Object.freeze(["i-uh", "i-hui"]),
        perfectiveBaseStem: "o",
        perfectiveBaseStemNotOno: true,
    }),
});

const LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME = Object.freeze({
    kind: "lesson-29-purposive-vnc-paradigm-frame",
    sourceSection: "Andrews 29.2",
    movementSets: Object.freeze(["outbound", "inbound"]),
    moods: Object.freeze(["indicative", "optative"]),
    indicativeTenseSystems: Object.freeze([
        Object.freeze({ direction: "outbound", contrast: "past/nonpast" }),
        Object.freeze({ direction: "inbound", contrast: "future/nonfuture" }),
    ]),
    optativeTenseSystem: "nonpast only",
    tenseMorphForAllTenses: "0",
    numberDyads: Object.freeze([
        Object.freeze({ number: "singular/common", dyad: "0-0" }),
        Object.freeze({ number: "plural", dyad: "0-h" }),
    ]),
    stemShapeDistinguishesMoodAndTense: true,
});

const LESSON29_OUTBOUND_PURPOSIVE_FRAME = Object.freeze({
    kind: "lesson-29-outbound-purposive-frame",
    sourceSection: "Andrews 29.3",
    matrixDirection: "outbound",
    matrixDirectionalMorph: "t",
    paradigms: Object.freeze([
        Object.freeze({
            id: "outbound-nonpast-indicative",
            stemShape: "-t-i-uh / -t-i-hui",
            tenseMeaning: "present or future",
            tenseMorph: "0",
        }),
        Object.freeze({
            id: "outbound-past-indicative",
            stemShape: "-t-o",
            tenseMeaning: "preterit, imperfect, or distant-past",
            tenseMorph: "0",
            antecessiveOParticleOptional: true,
        }),
        Object.freeze({
            id: "outbound-nonpast-optative",
            stemShape: "-t-i",
            tenseMeaning: "nonpast optative",
            tenseMorph: "0",
            irregularPluralNVariant: true,
        }),
    ]),
    contrastWithProgressiveYaUh: Object.freeze({
        purposiveEmbedTense: "future",
        progressiveEmbedTense: "preterit",
        purposiveTIsDirectionalInsideMatrix: true,
        progressiveTiIsConnectiveOutsideMatrix: true,
        classASpellingCanBeAmbiguousInTraditionalTexts: true,
        classCDistinctionNeedsVowelLengthOrGlottalEvidence: true,
        classBDistinctByStemShape: true,
    }),
    contrastWithAdmonitive: Object.freeze({
        purposivePluralEndings: Object.freeze(["-t-i + 0-h", "-t-i + 0-n"]),
        admonitivePluralDyads: Object.freeze(["t-ih", "t-in"]),
        secondPersonPurposiveOptativeUsesXi: true,
    }),
    aberrantEarlySpanishGrammarianSingularFormIsNotRegularParadigm: true,
});

const LESSON29_INBOUND_PURPOSIVE_FRAME = Object.freeze({
    kind: "lesson-29-inbound-purposive-frame",
    sourceSection: "Andrews 29.4",
    matrixDirection: "inbound",
    matrixDirectionalMorph: "c/qu",
    nawatLetterHint: "k",
    paradigms: Object.freeze([
        Object.freeze({
            id: "inbound-nonfuture-indicative",
            stemShape: "-c-o",
            tenseMeaning: "present, preterit, imperfect, or distant-past",
            tenseMorph: "0",
            antecessiveOParticleOptionalEvenForPresentMeaning: true,
        }),
        Object.freeze({
            id: "inbound-future-indicative",
            stemShape: "-qu-i-uh / -qu-i-hui",
            tenseMeaning: "future",
            tenseMorph: "0",
        }),
        Object.freeze({
            id: "inbound-nonpast-optative",
            stemShape: "-qu-i",
            tenseMeaning: "nonpast optative",
            tenseMorph: "0",
        }),
    ]),
});

const LESSON29_NONACTIVE_EMBED_FRAME = Object.freeze({
    kind: "lesson-29-nonactive-embed-frame",
    sourceSection: "Andrews 29.5",
    futurePredicateOnNonactiveStemMayOccupyEmbed: true,
    voices: Object.freeze(["passive", "impersonal"]),
    compareLesson2811FutureEmbed: true,
    generationAllowed: false,
});

const LESSON29_COMPOUND_EMBED_FRAME = Object.freeze({
    kind: "lesson-29-compound-stemmed-embed-frame",
    sourceSection: "Andrews 29.6",
    compoundStemmedPredicateMayOccupyEmbed: true,
    dependsOnLesson28CompoundFrame: true,
    generationAllowed: false,
});

const LESSON29_EXTERNAL_DIRECTIONAL_FRAME = Object.freeze({
    kind: "lesson-29-external-directional-frame",
    sourceSection: "Andrews 29.7",
    printedSectionLabelInPdf: "29.1",
    externalDirectionalsCanStandWherePurposiveWouldBeFormal: true,
    externalDirectionals: Object.freeze([
        Object.freeze({ classical: "hual", currentNawatHint: "wal", direction: "toward speaker" }),
        Object.freeze({ classical: "on", currentNawatHint: "un", direction: "away/there" }),
    ]),
    externalDirectionalCanOccurOnPurposiveVnc: true,
    externalAndInternalDirectionCanDisagree: true,
    reasonDirectionCanDisagree: "embed action and matrix movement are separate actions",
    purposiveMeaningCanShiftToFulfilledPurposeOrResult: true,
    movementCanBeMetaphorical: true,
    intentionCanBeMuted: true,
});

const LESSON29_PURPOSIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson29-purposive-verbstems", andrewsSection: "29.1", category: "purposive-verbstem", directiveEs: "El purposivo es un compuesto futuro-incrustado, ligado y sin conectivo; no es el futuro integrado de 28.11 ni el conectivo t de 28.5.", engineSurface: "purposive boundary metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson29-purposive-vncs", andrewsSection: "29.2", category: "purposive-vnc-paradigm", directiveEs: "Hay series entrante y saliente; el indicativo tiene dos contrastes de tiempo y el optativo solo no pasado.", engineSurface: "purposive paradigm metadata", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson29-outbound", andrewsSection: "29.3", category: "outbound-purposive", directiveEs: "La matriz saliente usa t direccional dentro del tronco; debe distinguirse del progresivo con ya-uh y del admonitivo.", engineSurface: "outbound diagnostic frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson29-inbound", andrewsSection: "29.4", category: "inbound-purposive", directiveEs: "La matriz entrante usa c/qu, adaptado como k en grafia nawat cuando haya evidencia de superficie.", engineSurface: "inbound diagnostic frame", implementationState: "partial", redirectAction: "block-generation" }),
    Object.freeze({ id: "lesson29-passive-impersonal", andrewsSection: "29.5", category: "nonactive-embed", directiveEs: "El incrustado futuro puede construirse sobre tronco no activo en voz pasiva o impersonal.", engineSurface: "nonactive embed diagnostic frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson29-compound-embed", andrewsSection: "29.6", category: "compound-stemmed-embed", directiveEs: "El incrustado del purposivo puede ser un predicado de tronco compuesto.", engineSurface: "compound-embed diagnostic frame", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson29-external-directionals", andrewsSection: "29.7", category: "external-directional-purposive-notion", directiveEs: "Hual/on externos pueden expresar nocion purposiva informal, combinarse con purposivos, o discrepar de la direccion interna.", engineSurface: "directional false-positive and boundary metadata", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
]);

function clonePurposiveLessonRecord(record) {
    if (!record || typeof record !== "object") {
        return record;
    }
    if (Array.isArray(record)) {
        return record.map((entry) => clonePurposiveLessonRecord(entry));
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, clonePurposiveLessonRecord(value)])
    );
}

function getLesson29PurposiveSubsectionInventory() {
    return LESSON29_PURPOSIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: entry.andrewsSection === "29.7"
            ? "Andrews Lesson 29.7 (printed as 29.1 in the PDF)"
            : `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS),
    }));
}

function attachPurposiveDirectionalGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "purposive-vnc-boundary",
        routeFamily: "purposive-directional",
        structuralSource: "Andrews Lesson 29",
        andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        generationAllowed: false,
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
            orthographyStatus: "nawat-evidence-required",
        },
        ...options,
    });
}

function normalizePurposiveDirectionalEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePurposiveDirectionalRelation(value = "") {
    return normalizePurposiveDirectionalEnum(
        value,
        Object.values(PURPOSIVE_DIRECTIONAL_RELATION),
        PURPOSIVE_DIRECTIONAL_RELATION.unknown
    );
}

function normalizePurposiveDirectionalFalsePositiveSource(value = "") {
    return normalizePurposiveDirectionalEnum(
        value,
        Object.values(PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE),
        PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getPurposiveDirectionalAntiConflationRules() {
    return Array.from(PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES);
}

function getPurposiveDirectionalStructuralQuestions() {
    return PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function getKnownDirectionalPrefixesForPurposiveBoundary() {
    if (typeof DIRECTIONAL_PREFIXES !== "undefined" && Array.isArray(DIRECTIONAL_PREFIXES)) {
        return Array.from(new Set(DIRECTIONAL_PREFIXES.filter(Boolean)));
    }
    return ["wal", "un"];
}

function buildPurposiveDirectionalBoundaryMetadata() {
    const subsectionInventory = getLesson29PurposiveSubsectionInventory();
    const boundary = {
        kind: "purposive-directional-boundary",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        lesson: 29,
        status: "partial",
        structuralSource: "Andrews Lesson 29",
        pdfRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        subsectionInventory,
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        knownDirectionalPrefixes: getKnownDirectionalPrefixesForPurposiveBoundary(),
        internalMatrixDirectionalMorphs: [
            { classical: "t", direction: "outbound", nawatLetterHint: "t" },
            { classical: "c/qu", direction: "inbound", nawatLetterHint: "k" },
        ],
        externalDirectionalHints: [
            { classical: "hual", currentNawatHint: "wal" },
            { classical: "on", currentNawatHint: "un" },
        ],
        structuralQuestions: getPurposiveDirectionalStructuralQuestions(),
        boundaries: {
            hasDirectionalPrefixMechanics: true,
            hasPurposiveGeneration: false,
            hasConfirmedPurposiveFixtureData: false,
            hasLesson29PursuitFrame: true,
            changesDirectionalGeneration: false,
            changesVncGeneration: false,
            treatsDirectionalPrefixAsPurposiveEvidence: false,
            treatsInternalDirectionalAsConnectiveT: false,
        },
        antiConflationRules: getPurposiveDirectionalAntiConflationRules(),
    };
    return attachPurposiveDirectionalGrammarContract(boundary, {
        metadataKind: "purposive-directional-boundary",
        routeStage: "classify-boundary",
        supported: false,
        andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        morphBoundaryFrame: boundary,
        targetContract: {
            metadataKind: "purposive-directional-boundary",
            generationAllowed: false,
            hasPurposiveGeneration: false,
        },
    });
}

function buildLesson29PurposivePursuitFrame() {
    const subsectionInventory = getLesson29PurposiveSubsectionInventory();
    const purposiveVerbstemFrame = clonePurposiveLessonRecord(LESSON29_PURPOSIVE_VERBSTEM_FRAME);
    const vncParadigmFrame = clonePurposiveLessonRecord(LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME);
    const outboundFrame = clonePurposiveLessonRecord(LESSON29_OUTBOUND_PURPOSIVE_FRAME);
    const inboundFrame = clonePurposiveLessonRecord(LESSON29_INBOUND_PURPOSIVE_FRAME);
    const nonactiveEmbedFrame = clonePurposiveLessonRecord(LESSON29_NONACTIVE_EMBED_FRAME);
    const compoundEmbedFrame = clonePurposiveLessonRecord(LESSON29_COMPOUND_EMBED_FRAME);
    const externalDirectionalFrame = clonePurposiveLessonRecord(LESSON29_EXTERNAL_DIRECTIONAL_FRAME);
    const remainingGaps = [
        "No confirmed Nawat/Pipil purposive VNC fixture inventory licenses finite purposive output.",
        "Outbound and inbound purposive paradigms are recorded but not generated.",
        "Silent future-morph behavior, vowel-length/glottal distinctions, optional o#, irregular plural n, and optative/admonitive contrasts remain diagnostic.",
        "Passive/impersonal purposive embeds, compound-stemmed embeds, external hual/on directional alternatives, fulfilled-purpose readings, and metaphorical movement remain evidence-needed.",
    ];
    const frame = {
        kind: "lesson-29-purposive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 29,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 29.1-29.7 against current purposive/directional boundary metadata, stem-internal directional morphs, outbound/inbound paradigms, passive/impersonal embeds, compound-stemmed embeds, and external hual/on directional alternatives.",
                andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                result: "hit",
                correction: "Lesson 29 now records Andrews purposive verbstem architecture, outbound and inbound paradigms, nonactive and compound-stemmed embeds, external directional alternatives, and anti-conflation with ordinary directional prefixes, progressive connective-t compounds, and admonitive endings while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        purposiveVerbstemFrame,
        vncParadigmFrame,
        outboundFrame,
        inboundFrame,
        nonactiveEmbedFrame,
        compoundEmbedFrame,
        externalDirectionalFrame,
        currentEngineBoundary: {
            directionalPrefixMechanicsImplemented: true,
            boundaryMetadataImplemented: true,
            candidateClassifierImplemented: true,
            falsePositiveClassifierImplemented: true,
            purposiveGenerationImplemented: false,
            confirmedPurposiveFixtureData: false,
            outboundParadigmGenerationImplemented: false,
            inboundParadigmGenerationImplemented: false,
            nonactiveEmbedGenerationImplemented: false,
            compoundStemmedEmbedGenerationImplemented: false,
            externalDirectionalPurposiveGenerationImplemented: false,
            finiteOutputExpansionAllowed: false,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    return attachPurposiveDirectionalGrammarContract(frame, {
        metadataKind: "lesson-29-purposive-pursuit-frame",
        routeStage: "audit-lesson-29",
        supported: true,
        sourceInput: "Andrews Lesson 29.1-29.7",
        morphBoundaryFrame: {
            purposiveVerbstemFrame,
            outboundFrame,
            inboundFrame,
            nonactiveEmbedFrame,
            compoundEmbedFrame,
            externalDirectionalFrame,
        },
        stemFrame: {
            stemKind: "purposive-compound-verbstem",
            compoundType: purposiveVerbstemFrame.compoundType,
            embedPredicateTense: purposiveVerbstemFrame.embed.predicateTense,
            silentFutureMorph: true,
            matrixDirectionalPrefixInsideStem: true,
            internalDirectionalMorphs: purposiveVerbstemFrame.matrix.directionalMorphs,
            baseStemMeaning: purposiveVerbstemFrame.matrix.baseStemMeaning,
        },
        nuclearClauseFrame: {
            unitKind: "VNC",
            compoundKind: "purposive VNC",
            sourceFormula: "VNC + VNC = compound VNC",
            linkedConnectiveless: true,
        },
        inflectionFrame: {
            outboundIndicativeContrasts: "past/nonpast",
            inboundIndicativeContrasts: "future/nonfuture",
            optativeTenseSystem: "nonpast only",
            tenseMorphForAllTenses: "0",
        },
        targetContract: {
            metadataKind: "lesson-29-purposive-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnostics: ["purposive-vnc-diagnostic-only", "purposive-vnc-needs-nawat-evidence"],
    });
}

function classifyPurposiveDirectionalCandidate({
    sourceStem = "",
    candidate = "",
    directionalPrefix = "",
    relation = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRelation = normalizePurposiveDirectionalRelation(relation);
    const normalizedFalsePositive = normalizePurposiveDirectionalFalsePositiveSource(falsePositiveSource);
    const knownPrefixes = getKnownDirectionalPrefixesForPurposiveBoundary();
    const normalizedDirectionalPrefix = String(directionalPrefix || "").trim().toLowerCase();
    const hasKnownDirectionalPrefix = knownPrefixes.includes(normalizedDirectionalPrefix);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "purposive-directional-candidate-classification",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        sourceStem: String(sourceStem || ""),
        candidate: String(candidate || ""),
        directionalPrefix: normalizedDirectionalPrefix,
        hasKnownDirectionalPrefix,
        relation: normalizedRelation,
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "purposive-directional-needs-validation" : "purposive-directional-needs-nawat-evidence",
            hasKnownDirectionalPrefix ? "directional-prefix-recognized" : "directional-prefix-unconfirmed",
            normalizedFalsePositive !== PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown
                ? "purposive-directional-false-positive-source"
                : "purposive-directional-unconfirmed",
        ],
        boundary: buildPurposiveDirectionalBoundaryMetadata(),
    };
    return attachPurposiveDirectionalGrammarContract(classification, {
        metadataKind: "purposive-directional-candidate-classification",
        routeStage: "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        supported: false,
        diagnostics: classification.diagnostics,
        stemFrame: {
            stemKind: "purposive-directional-candidate",
            sourceStem: classification.sourceStem,
            targetStem: classification.candidate,
            directionalPrefix: normalizedDirectionalPrefix,
            relation: normalizedRelation,
        },
        targetContract: {
            metadataKind: "purposive-directional-candidate-classification",
            generationAllowed: false,
            relation: normalizedRelation,
            hasKnownDirectionalPrefix,
        },
    });
}

function classifyPurposiveDirectionalFalsePositive(source = "") {
    const normalizedSource = normalizePurposiveDirectionalFalsePositiveSource(source);
    const classification = {
        kind: "purposive-directional-false-positive",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        source: normalizedSource,
        isPurposiveEvidence: false,
        generationAllowed: false,
        diagnostics: ["purposive-directional-false-positive-source"],
        antiConflationRules: getPurposiveDirectionalAntiConflationRules(),
    };
    return attachPurposiveDirectionalGrammarContract(classification, {
        metadataKind: "purposive-directional-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics,
    });
}
