// core/nnc/names/names.js
// Lesson 56 personal-name NNC boundary metadata. This keeps ordinary NNC,
// place/gentilic, adjunction, and conjunction metadata separate from confirmed
// personal-name NNC generation until Nawat/Pipil evidence supports it.

"use strict";

const PERSONAL_NAME_NNC_BOUNDARY_VERSION = 1;

const PERSONAL_NAME_NNC_KIND = Object.freeze({
    personalNameNnc: "personal-name-nnc",
    singleClauseName: "single-clause-name",
    adjunctionDerivedName: "adjunction-derived-name",
    conjunctionDerivedName: "conjunction-derived-name",
    calendarName: "calendar-name",
    unknown: "unknown",
});

const PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    pronounLabel: "pronoun-label",
    capitalizationLabel: "capitalization-label",
    placeGentilicBoundary: "place-gentilic-boundary",
    adverbialAdjunctionBoundary: "adverbial-adjunction-boundary",
    conjunctionBoundary: "conjunction-boundary",
    calendarRoadmapText: "calendar-roadmap-text",
    properNameTranslation: "proper-name-translation",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "personal-name NNC boundary metadata is not generation",
    "ordinary NNC fixtures or open-stem previews are not personal-name fixture evidence",
    "capitalization labels and proper-name translations are not Nawat/Pipil name evidence",
    "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence",
    "calendar roadmap text is not personal-name NNC data",
    "Andrews personal-name categories are architecture, not Nawat/Pipil form authority",
]);

const PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "nameSource",
        asks: "Which Nawat/Pipil personal-name NNC form is evidenced?",
    }),
    Object.freeze({
        field: "sourceClauseType",
        asks: "Is the name sourced from a single clause, adjunction, conjunction, calendar naming, or unknown?",
    }),
    Object.freeze({
        field: "outerSubject",
        asks: "Which outer personal-name NNC subject pronoun is evidenced, and is its number dyad 0-0?",
    }),
    Object.freeze({
        field: "innerSubjectBarrier",
        asks: "Which inner subject pronoun blocks the outer subject from controlling the inner predicate?",
    }),
    Object.freeze({
        field: "innerSourceStructure",
        asks: "Which downgraded statement, nominalized VNC, NNC, adjunction, or conjunction is the inner predicate?",
    }),
    Object.freeze({
        field: "clauseSource",
        asks: "Which Nawat/Pipil clause source supports the name?",
    }),
    Object.freeze({
        field: "adjunctionSource",
        asks: "Which adjoined-unit source supports the name, if any?",
    }),
    Object.freeze({
        field: "conjunctionSource",
        asks: "Which conjunction source supports the name, if any?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports personal-name status?",
    }),
]);

const LESSON56_PERSONAL_NAME_NNC_PDF_REFS = Object.freeze([
    "Andrews Lesson 56.1",
    "Andrews Lesson 56.2",
    "Andrews Lesson 56.3",
    "Andrews Lesson 56.4",
    "Andrews Lesson 56.5",
]);

const LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS = Object.freeze([
    "src/tests/nnc_names.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        range: "56.1",
        role: "two-tier-personal-name-nnc",
        directive: "Treat personal names as absolutive-state NNCs whose predicate is an entire downgraded statement; keep inner and outer subject pronouns separate, with the outer number dyad 0-0.",
        sourceKinds: Object.freeze(["downgraded-statement", "one-or-more-nuclear-clauses"]),
        redirectAction: "diagnostic-only",
        generationStatus: "blocked-until-confirmed-name-data",
        blockers: Object.freeze(["word-like-name-analysis", "translation-as-structure", "outer-subject-controls-inner-predicate"]),
    }),
    Object.freeze({
        range: "56.2",
        role: "single-clause-source",
        directive: "Classify single-clause personal-name sources as nominalized VNC stems or downgraded NNC stems, including preterit/present/customary agentive, purposive, reflexive, passive, impersonal, absolutive, possessive, affective, gentilic, and calendrical subtypes.",
        sourceKinds: Object.freeze(["nominalized-vnc", "downgraded-absolutive-nnc", "downgraded-possessive-nnc"]),
        redirectAction: "diagnostic-only",
        generationStatus: "classification-only",
        blockers: Object.freeze(["single-generated-word", "capitalization-label", "proper-name-translation"]),
    }),
    Object.freeze({
        range: "56.3",
        role: "adjunction-source",
        directive: "Classify adjunction-derived personal names only when a full multiple-clause source is supplied: subject supplementation, possessor supplementation, adjectival modification, adverbial modification, or divinatory-calendar name structures.",
        sourceKinds: Object.freeze(["subject-supplementation", "possessor-supplementation", "adjectival-modification", "adverbial-modification", "calendar-name-source"]),
        redirectAction: "diagnostic-only",
        generationStatus: "classification-only",
        blockers: Object.freeze(["statement-without-two-tier-name-structure", "place-gentilic-boundary-only", "calendar-roadmap-text"]),
    }),
    Object.freeze({
        range: "56.4",
        role: "conjunction-source",
        directive: "Classify conjunctorless conjunction personal-name units like conjoined-NNC lexical items while preserving the two-tier personal-name structure on each conjunct.",
        sourceKinds: Object.freeze(["conjunctorless-conjunction", "biclausalism", "conjoined-nnc-lexical-unit"]),
        redirectAction: "diagnostic-only",
        generationStatus: "classification-only",
        blockers: Object.freeze(["conjunction-boundary-only", "single-conjunct-name", "unverified-biclausalism"]),
    }),
    Object.freeze({
        range: "56.5",
        role: "sentence-use-and-downgrades",
        directive: "Keep sentence use, title contrasts, vocative collocations, adjunctor placement, god-name downgrades to normal NNCs, and god-name embeds in place-name NNCs as sentence/name diagnostics, not generated personal-name data.",
        sourceKinds: Object.freeze(["sentence-use", "vocative-collocation", "normal-nnc-downgrade", "place-name-embed"]),
        redirectAction: "diagnostic-only",
        generationStatus: "diagnostic-only",
        blockers: Object.freeze(["title-nnc-as-personal-name", "vocative-as-name-fixture", "god-name-devotee-plural-as-personal-name-generation"]),
    }),
]);

function normalizePersonalNameNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePersonalNameNncKind(value = "") {
    return normalizePersonalNameNncEnum(
        value,
        Object.values(PERSONAL_NAME_NNC_KIND),
        PERSONAL_NAME_NNC_KIND.unknown
    );
}

function normalizePersonalNameNncFalsePositiveSource(value = "") {
    return normalizePersonalNameNncEnum(
        value,
        Object.values(PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE),
        PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getPersonalNameNncAntiConflationRules() {
    return Array.from(PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES);
}

function getPersonalNameNncStructuralQuestions() {
    return PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function getLesson56PersonalNameNncSubsectionInventory() {
    return LESSON56_PERSONAL_NAME_NNC_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        sourceKinds: Array.from(entry.sourceKinds),
        blockers: Array.from(entry.blockers),
    }));
}

function attachPersonalNameNncGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "personal-name-nnc",
        routeFamily: "personal-name-nnc",
        ...options,
    });
}

function buildPersonalNameNncBoundaryMetadata() {
    const boundary = {
        kind: "personal-name-nnc-boundary",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        lesson: 56,
        appendices: ["E"],
        status: "partial",
        structuralSource: "Andrews Lesson 56 and Appendix E",
        pdfRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPersonalNameNncStructuralQuestions(),
        boundaries: {
            hasOrdinaryNncGeneration: true,
            hasPlaceGentilicBoundary: true,
            hasAdverbialAdjunctionBoundary: true,
            hasConjunctionBoundary: true,
            hasPersonalNameNncGeneration: false,
            hasCalendarNameGeneration: false,
            hasStaticNameData: false,
            hasConfirmedFixtureData: false,
            changesOrdinaryNncGeneration: false,
            changesPlaceGentilicGeneration: false,
            changesAdjunctionBehavior: false,
            changesConjunctionBehavior: false,
            treatsCapitalizationAsNameEvidence: false,
            treatsTranslationsAsNameEvidence: false,
        },
        antiConflationRules: getPersonalNameNncAntiConflationRules(),
    };
    return attachPersonalNameNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary,
    });
}

function classifyPersonalNameNncCandidate({
    candidate = "",
    nameSource = "",
    personalNameKind = "",
    sourceClauseType = "",
    clauseSource = "",
    adjunctionSource = "",
    conjunctionSource = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedKind = normalizePersonalNameNncKind(personalNameKind || sourceClauseType);
    const normalizedFalsePositive = normalizePersonalNameNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "personal-name-nnc-candidate-classification",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        nameSource: String(nameSource || ""),
        personalNameKind: normalizedKind,
        sourceClauseType: String(sourceClauseType || ""),
        clauseSource: String(clauseSource || ""),
        adjunctionSource: String(adjunctionSource || ""),
        conjunctionSource: String(conjunctionSource || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "personal-name-nnc-needs-validation" : "personal-name-nnc-needs-nawat-evidence",
            normalizedKind !== PERSONAL_NAME_NNC_KIND.unknown
                ? "personal-name-nnc-kind-recognized"
                : "personal-name-nnc-kind-unconfirmed",
            normalizedFalsePositive !== PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "personal-name-nnc-false-positive-source"
                : "personal-name-nnc-unconfirmed",
        ],
        boundary: buildPersonalNameNncBoundaryMetadata(),
    };
    return attachPersonalNameNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.nameSource,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "personal-name-source-candidate",
            sourceStem: classification.nameSource,
            sourceKind: classification.personalNameKind,
        },
    });
}

function buildLesson56PersonalNameNncPursuitFrame() {
    const subsectionInventory = getLesson56PersonalNameNncSubsectionInventory();
    return {
        version: 1,
        outputKind: "lesson-56-personal-name-nnc-pursuit-frame",
        curriculumRef: { source: "Andrews", range: "56.1-56.5", role: "plan-pursue-step" },
        stepNumber: 56,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
        directive: "Use Andrews Lesson 56 to direct personal-name NNC architecture: two-tier downgraded statement predicates, inner/outer subject separation, single-clause sources, adjunction sources, conjunction sources, sentence use, and non-generation until confirmed Nawat/Pipil personal-name evidence exists.",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS),
        plannedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 56.1-56.5 against current personal-name NNC boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
                andrewsRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                result: "hit",
                correction: "Lesson 56 now records Andrews personal-name NNC two-tier architecture across single-clause, adjunction, conjunction, sentence-use, title, vocative, god-name downgrade, and place-name embed boundaries while keeping generation blocked.",
                andrewsRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_PDF_REFS),
                feedbackRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS),
            },
        ],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 56 personal-name source parsing, confirmed Nawat/Pipil personal-name examples, static names/calendar data, sentence-use ASTs, vocative diagnostics, god-name downgrade routing, place-name embed routing, parser/search detection, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
        subsectionInventory,
        coverage: {
            subsectionCount: subsectionInventory.length,
            sourceKindCount: subsectionInventory.reduce((count, entry) => count + entry.sourceKinds.length, 0),
            blockerCount: subsectionInventory.reduce((count, entry) => count + entry.blockers.length, 0),
            generationAllowed: false,
        },
        boundaries: {
            noClassicalSurfaceImport: true,
            noNewFixtureEvidence: true,
            noSilentGeneration: true,
            personalNameGenerationAllowed: false,
            staticNameDataExists: false,
            visibleUiSpanishRequired: true,
        },
    };
}

function classifyPersonalNameNncFalsePositive(source = "") {
    const normalizedSource = normalizePersonalNameNncFalsePositiveSource(source);
    const classification = {
        kind: "personal-name-nnc-false-positive",
        version: PERSONAL_NAME_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPersonalNameNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["personal-name-nnc-false-positive-source"],
        antiConflationRules: getPersonalNameNncAntiConflationRules(),
    };
    return attachPersonalNameNncGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
    });
}
