// core/sentence/sentence.js
// Diagnostic sentence-layer metadata for Lessons 8-10. This records where
// negation, question, emphasis, and sentence mood would live relative to a
// nuclear clause; it does not generate Nawat/Pipil sentence forms.

"use strict";

const SENTENCE_LAYER_VERSION = 1;

const SENTENCE_POLARITY = Object.freeze({
    affirmative: "affirmative",
    negative: "negative",
    unknown: "unknown",
});

const SENTENCE_QUESTION_TYPE = Object.freeze({
    none: "none",
    yesNo: "yes-no",
    content: "content",
    unknown: "unknown",
});

const SENTENCE_EMPHASIS_TYPE = Object.freeze({
    none: "none",
    focus: "focus",
    emphatic: "emphatic",
    unknown: "unknown",
});

const SENTENCE_MOOD_SCOPE = Object.freeze({
    declarative: "declarative",
    wish: "wish",
    command: "command",
    exhortation: "exhortation",
    admonition: "admonition",
    unknown: "unknown",
});

const SENTENCE_LAYER_ANTI_CONFLATION_RULES = Object.freeze([
    "sentence layer metadata is not generation",
    "finite optative/admonitive form is not full sentence mood semantics",
    "negation/question/emphasis labels are not Nawat/Pipil particle evidence",
    "VNC output is not a complete sentence",
    "topic and supplementation require separate clause metadata",
    "Andrews sentence categories are architecture, not Nawat/Pipil form authority",
]);

function normalizeSentenceEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeSentencePolarity(value = "") {
    return normalizeSentenceEnum(
        value,
        Object.values(SENTENCE_POLARITY),
        SENTENCE_POLARITY.unknown
    );
}

function normalizeSentenceQuestionType(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    if (["no", "none", "false"].includes(normalized)) {
        return SENTENCE_QUESTION_TYPE.none;
    }
    if (["yesno", "yes-no", "polar"].includes(normalized)) {
        return SENTENCE_QUESTION_TYPE.yesNo;
    }
    return normalizeSentenceEnum(
        normalized,
        Object.values(SENTENCE_QUESTION_TYPE),
        SENTENCE_QUESTION_TYPE.unknown
    );
}

function normalizeSentenceEmphasisType(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    if (["no", "none", "false"].includes(normalized)) {
        return SENTENCE_EMPHASIS_TYPE.none;
    }
    return normalizeSentenceEnum(
        normalized,
        Object.values(SENTENCE_EMPHASIS_TYPE),
        SENTENCE_EMPHASIS_TYPE.unknown
    );
}

function normalizeSentenceMoodScope(value = "") {
    return normalizeSentenceEnum(
        value,
        Object.values(SENTENCE_MOOD_SCOPE),
        SENTENCE_MOOD_SCOPE.unknown
    );
}

function getSentenceLayerAntiConflationRules() {
    return Array.from(SENTENCE_LAYER_ANTI_CONFLATION_RULES);
}

function buildSentenceOperatorSlot({
    slot = "",
    value = "",
    scope = "",
    particleCandidate = "",
    isParticleEvidenceBacked = false,
} = {}) {
    return {
        slot: String(slot || ""),
        value: String(value || ""),
        scope: String(scope || "sentence"),
        particleCandidate: String(particleCandidate || ""),
        isParticleEvidenceBacked: isParticleEvidenceBacked === true,
        generationAllowed: false,
    };
}

function buildSentenceLayerMetadata({
    clauseKind = "",
    nuclearClauseShell = null,
    polarity = SENTENCE_POLARITY.affirmative,
    questionType = SENTENCE_QUESTION_TYPE.none,
    emphasisType = SENTENCE_EMPHASIS_TYPE.none,
    moodScope = SENTENCE_MOOD_SCOPE.declarative,
    particleCandidates = {},
    source = "manual-candidate",
    finiteTenseValue = "",
} = {}) {
    const resolvedPolarity = normalizeSentencePolarity(polarity);
    const resolvedQuestionType = normalizeSentenceQuestionType(questionType);
    const resolvedEmphasisType = normalizeSentenceEmphasisType(emphasisType);
    const resolvedMoodScope = normalizeSentenceMoodScope(moodScope);
    const resolvedClauseKind = nuclearClauseShell?.clauseKind || clauseKind || "unknown";
    return {
        kind: "sentence-layer-metadata",
        version: SENTENCE_LAYER_VERSION,
        structuralSource: "Andrews Lessons 8-10",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        source,
        finiteTenseValue: String(finiteTenseValue || ""),
        clauseKind: String(resolvedClauseKind || "unknown"),
        nuclearClauseShell: nuclearClauseShell || null,
        generationAllowed: false,
        slots: {
            polarity: buildSentenceOperatorSlot({
                slot: "negation",
                value: resolvedPolarity,
                particleCandidate: particleCandidates.negation || "",
            }),
            question: buildSentenceOperatorSlot({
                slot: "question",
                value: resolvedQuestionType,
                particleCandidate: particleCandidates.question || "",
            }),
            emphasis: buildSentenceOperatorSlot({
                slot: "emphasis",
                value: resolvedEmphasisType,
                particleCandidate: particleCandidates.emphasis || "",
            }),
            mood: buildSentenceOperatorSlot({
                slot: "sentence-mood",
                value: resolvedMoodScope,
                particleCandidate: particleCandidates.mood || "",
            }),
        },
        boundaries: {
            isSentenceEngine: false,
            isWordGeneration: false,
            changesFiniteVncOutput: false,
            hasConfirmedParticleInventory: false,
            finiteMoodIsSentenceSemantics: false,
        },
        diagnostics: [
            "sentence-layer-diagnostic-only",
            "sentence-layer-needs-confirmed-nawat-evidence",
        ],
        antiConflationRules: getSentenceLayerAntiConflationRules(),
    };
}

function buildBasicSentenceBoundaryMetadata(options = {}) {
    return {
        kind: "basic-sentence-boundary",
        version: SENTENCE_LAYER_VERSION,
        lessonRange: "8-10",
        status: "partial",
        sentenceLayer: buildSentenceLayerMetadata(options),
        generationAllowed: false,
        supportedFiniteFormsRemainInVnc: true,
        unsupportedBehavior: [
            "negation particle generation",
            "question particle generation",
            "emphasis particle generation",
            "sentence-level optative semantics",
            "sentence-level admonitive semantics",
        ],
        antiConflationRules: getSentenceLayerAntiConflationRules(),
    };
}

function isSentenceLayerGenerationOptIn(override = null) {
    const sentenceLayer = override?.sentenceLayer;
    return sentenceLayer === true
        || (sentenceLayer && typeof sentenceLayer === "object" && sentenceLayer.enabled === true);
}

function getSentenceLayerGenerationOptions(override = null) {
    return override?.sentenceLayer && typeof override.sentenceLayer === "object"
        ? override.sentenceLayer
        : {};
}

function buildGeneratedSentenceLayerMetadata({
    override = null,
    tense = "",
    nuclearClauseShell = null,
    clauseKind = "",
} = {}) {
    if (!isSentenceLayerGenerationOptIn(override)) {
        return null;
    }
    const sentenceLayer = getSentenceLayerGenerationOptions(override);
    return buildSentenceLayerMetadata({
        nuclearClauseShell,
        clauseKind: nuclearClauseShell?.clauseKind || clauseKind || "",
        polarity: sentenceLayer.polarity || SENTENCE_POLARITY.affirmative,
        questionType: sentenceLayer.questionType || SENTENCE_QUESTION_TYPE.none,
        emphasisType: sentenceLayer.emphasisType || SENTENCE_EMPHASIS_TYPE.none,
        moodScope: sentenceLayer.moodScope || SENTENCE_MOOD_SCOPE.declarative,
        particleCandidates: sentenceLayer.particleCandidates || {},
        source: sentenceLayer.source || "generate-word-override",
        finiteTenseValue: tense,
    });
}

function classifySentenceCandidate({
    text = "",
    polarity = "",
    questionType = "",
    emphasisType = "",
    moodScope = "",
} = {}) {
    const sentenceLayer = buildSentenceLayerMetadata({
        polarity: polarity || SENTENCE_POLARITY.unknown,
        questionType: questionType || SENTENCE_QUESTION_TYPE.unknown,
        emphasisType: emphasisType || SENTENCE_EMPHASIS_TYPE.unknown,
        moodScope: moodScope || SENTENCE_MOOD_SCOPE.unknown,
        source: "candidate",
    });
    return {
        kind: "sentence-candidate-classification",
        version: SENTENCE_LAYER_VERSION,
        text: String(text == null ? "" : text),
        matched: false,
        status: "unconfirmed",
        sentenceLayer,
        generationAllowed: false,
        diagnostics: ["sentence-candidate-unconfirmed"],
    };
}
