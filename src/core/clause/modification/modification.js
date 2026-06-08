// core/clause/modification/modification.js
// Lessons 42-43 adjectival-modification boundary metadata. This keeps current
// adjective-like word outputs separate from confirmed clause-level modification
// AST behavior until Nawat/Pipil evidence supports it.

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
    "Andrews modification categories are architecture, not Nawat/Pipil form authority",
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
        asks: "What Nawat/Pipil repo or user-provided clause evidence supports modification status?",
    }),
]);

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
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
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
    const surfaceForms = Array.isArray(input.surfaceForms) ? input.surfaceForms : [];
    return String(
        input.result
        || input.surface
        || input.surfaceDisplay
        || surfaceForms[0]
        || input.word
        || fallback
        || ""
    ).trim();
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
    return {
        kind: "adjectival-modification-clause-node",
        role: String(role || "unknown"),
        surface,
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
        diagnostics.push("adjectival-modification-needs-nawat-clause-evidence");
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
    return {
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
    };
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
            hasEvidence ? "adjectival-modification-needs-validation" : "adjectival-modification-needs-nawat-clause-evidence",
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
