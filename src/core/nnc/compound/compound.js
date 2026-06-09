// core/nnc/compound/compound.js
// Lessons 31-32 compound/affective NNC boundary metadata. This keeps current
// VNC compound parser metadata and ordinary NNC fixtures separate from
// confirmed compound nounstem or affective NNC generation.

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
    "Andrews compound/affective categories are architecture, not Nawat/Pipil form authority",
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
        asks: "If affective, what affective value is evidenced by Nawat/Pipil data?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided evidence supports the compound/affective status?",
    }),
]);

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
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getCompoundNncStructuralQuestions(),
        boundaries: {
            hasVncCompoundParserMetadata: true,
            hasCompoundNncGeneration: false,
            hasAffectiveNncGeneration: false,
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
} = {}) {
    const normalizedKind = normalizeCompoundNncKind(compoundKind);
    const normalizedFalsePositive = normalizeCompoundNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "compound-nnc-affective-candidate-classification",
        version: COMPOUND_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        headStem: String(headStem || ""),
        embeddedStem: String(embeddedStem || ""),
        compoundKind: normalizedKind,
        affectiveValue: String(affectiveValue || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        hasCompoundAst: hasCompoundAst === true,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "compound-nnc-needs-validation" : "compound-nnc-needs-nawat-evidence",
            hasCompoundAst ? "vnc-compound-ast-not-nnc-evidence" : "compound-nnc-no-compound-ast",
            normalizedFalsePositive !== COMPOUND_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "compound-nnc-false-positive-source"
                : "compound-nnc-unconfirmed",
        ],
        boundary: buildCompoundNncAffectiveBoundaryMetadata(),
    };
    return attachCompoundNncGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.candidate || classification.headStem,
        supported: false,
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
            stemKind: "compound-nounstem-candidate",
            matrix: classification.headStem,
            embed: classification.embeddedStem,
        },
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
