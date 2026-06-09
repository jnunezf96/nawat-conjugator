// core/clause/adjunction/adjunction.js
// Lessons 49-50 adverbial-adjunction boundary metadata. This keeps current
// word-level adverbio, NNC, VNC, relational, and place/gentilic outputs
// separate from confirmed clause-level adjoined-unit modeling until
// Nawat/Pipil evidence supports it.

"use strict";

const ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION = 1;

const ADVERBIAL_ADJUNCTION_RELATION = Object.freeze({
    time: "time",
    place: "place",
    manner: "manner",
    consideration: "consideration",
    purpose: "purpose",
    condition: "condition",
    concession: "concession",
    consequence: "consequence",
    proviso: "proviso",
    reason: "reason",
    recursive: "recursive",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_UNIT = Object.freeze({
    nnc: "nnc",
    vnc: "vnc",
    particle: "particle",
    clause: "clause",
    sentence: "sentence",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_ORDER = Object.freeze({
    modifierHead: "modifier-head",
    headModifier: "head-modifier",
    appositiveHeadModifier: "appositive-head-modifier",
    principalAdverbialHead: "principal-adverbial-head",
    discontinuous: "discontinuous",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_RECURSION = Object.freeze({
    none: "none",
    head: "head",
    modifier: "modifier",
    both: "both",
    appositive: "appositive",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_MARKING = Object.freeze({
    unmarked: "unmarked",
    in: "in",
    tla: "tla",
    inTla: "in-tla",
    ma: "ma",
    inMa: "in-ma",
    ca: "ca",
    iuh: "iuh",
    ahzo: "ahzo",
    particle: "particle",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE = Object.freeze({
    legacyAdverbioSurface: "legacy-adverbio-surface",
    adverbialNuclearBoundary: "adverbial-nuclear-boundary",
    relationalNncBoundary: "relational-nnc-boundary",
    placeGentilicBoundary: "place-gentilic-boundary",
    adjectivalModificationBoundary: "adjectival-modification-boundary",
    particleLabel: "particle-label",
    routeLabel: "route-label",
    translationLabel: "translation-label",
    singleGeneratedWord: "single-generated-word",
    csvVerbSurface: "csv-verb-surface",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES = Object.freeze([
    "adverbial-adjunction boundary metadata is not generation",
    "legacy adverbio word output is not a clause-adjunction AST",
    "adverbial nuclear-clause metadata is not recursive adverbial adjunction",
    "relational and place/gentilic boundary metadata are not adjoined-clause evidence",
    "single generated NNC or VNC words do not prove adjoined-unit relations",
    "translations for time, place, manner, purpose, reason, or condition are not Nawat/Pipil clause evidence",
    "Andrews adverbial-adjunction categories are architecture, not Nawat/Pipil form authority",
]);

const ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "principalClause",
        asks: "Which Nawat/Pipil principal clause or sentence hosts the adjoined unit?",
    }),
    Object.freeze({
        field: "adjoinedUnit",
        asks: "Which NNC, VNC, particle-looking form, clause, or sentence is adjoined?",
    }),
    Object.freeze({
        field: "semanticRelation",
        asks: "Is the relation time, place, manner, consideration, purpose, concession, consequence, proviso, reason, recursive, or unknown?",
    }),
    Object.freeze({
        field: "adjoinedUnitType",
        asks: "Is the adjoined unit an NNC, VNC, particle, clause, sentence, or unknown?",
    }),
    Object.freeze({
        field: "marking",
        asks: "What marker, order, scope, or discontinuity evidence supports adjoined status?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided clause evidence supports adverbial adjunction?",
    }),
]);

function normalizeAdverbialAdjunctionEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeAdverbialAdjunctionRelation(value = "") {
    return normalizeAdverbialAdjunctionEnum(
        value,
        Object.values(ADVERBIAL_ADJUNCTION_RELATION),
        ADVERBIAL_ADJUNCTION_RELATION.unknown
    );
}

function normalizeAdverbialAdjunctionUnit(value = "") {
    return normalizeAdverbialAdjunctionEnum(
        value,
        Object.values(ADVERBIAL_ADJUNCTION_UNIT),
        ADVERBIAL_ADJUNCTION_UNIT.unknown
    );
}

function normalizeAdverbialAdjunctionOrder(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        preposed: ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        "modifier-precedes-head": ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
        postposed: ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        "modifier-follows-head": ADVERBIAL_ADJUNCTION_ORDER.headModifier,
        apposition: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        appositive: ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
        principal: ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
        "adverbial-principal": ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
    };
    return aliases[normalized] || normalizeAdverbialAdjunctionEnum(
        normalized,
        Object.values(ADVERBIAL_ADJUNCTION_ORDER),
        ADVERBIAL_ADJUNCTION_ORDER.unknown
    );
}

function normalizeAdverbialAdjunctionRecursion(value = "") {
    return normalizeAdverbialAdjunctionEnum(
        value,
        Object.values(ADVERBIAL_ADJUNCTION_RECURSION),
        ADVERBIAL_ADJUNCTION_RECURSION.unknown
    );
}

function normalizeAdverbialAdjunctionMarking(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        "": ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        none: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        unmarked: ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        "in-tla": ADVERBIAL_ADJUNCTION_MARKING.inTla,
        intla: ADVERBIAL_ADJUNCTION_MARKING.inTla,
        "in-ma": ADVERBIAL_ADJUNCTION_MARKING.inMa,
        inma: ADVERBIAL_ADJUNCTION_MARKING.inMa,
    };
    return aliases[normalized] || normalizeAdverbialAdjunctionEnum(
        normalized,
        Object.values(ADVERBIAL_ADJUNCTION_MARKING),
        ADVERBIAL_ADJUNCTION_MARKING.unknown
    );
}

function normalizeAdverbialAdjunctionFalsePositiveSource(value = "") {
    return normalizeAdverbialAdjunctionEnum(
        value,
        Object.values(ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE),
        ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getAdverbialAdjunctionAntiConflationRules() {
    return Array.from(ADVERBIAL_ADJUNCTION_ANTI_CONFLATION_RULES);
}

function getAdverbialAdjunctionStructuralQuestions() {
    return ADVERBIAL_ADJUNCTION_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildAdverbialAdjunctionBoundaryMetadata() {
    return {
        kind: "adverbial-adjunction-boundary",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        lessons: [49, 50],
        status: "partial",
        structuralSource: "Andrews Lessons 49-50",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getAdverbialAdjunctionStructuralQuestions(),
        boundaries: {
            hasLegacyAdverbioSurface: true,
            hasAdverbialNuclearBoundary: true,
            hasRelationalNncBoundary: true,
            hasPlaceGentilicBoundary: true,
            hasClauseAdjunctionAst: true,
            hasConfirmedClauseExamples: false,
            hasStaticAdjunctionData: false,
            changesAdverbioGeneration: false,
            changesNncGeneration: false,
            changesVncGeneration: false,
            changesRouteBehavior: false,
            treatsSingleGeneratedWordAsAdjunctionEvidence: false,
            treatsTranslationAsAdjunctionEvidence: false,
        },
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules(),
    };
}

function getAdverbialAdjunctionSurface(input = "", fallback = "") {
    if (typeof input === "string") {
        return String(input || fallback || "").trim();
    }
    if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
    }
    const surface = getAdverbialAdjunctionSurfaceForms(input)[0];
    if (getAdverbialAdjunctionResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
    }
    return String(surface || fallback || "").trim();
}

function splitAdverbialAdjunctionSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
}

function getAdverbialAdjunctionResultFrame(input = null) {
    const candidates = [
        input?.grammarFrame,
        input?.frames,
        input?.output?.grammarFrame,
        input?.output?.frames,
    ];
    return candidates.find((candidate) => (
        candidate
        && typeof candidate === "object"
        && (
            candidate.authorityFrame
            || candidate.routeContract
            || candidate.resultFrame
            || candidate.diagnosticFrame
        )
    )) || null;
}

function getAdverbialAdjunctionSurfaceForms(input = null) {
    if (typeof input === "string") {
        return splitAdverbialAdjunctionSurfaceText(input);
    }
    if (!input || typeof input !== "object") {
        return [];
    }
    const grammarFrame = getAdverbialAdjunctionResultFrame(input);
    const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
    const hasResultFrame = Boolean(frameResult);
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitAdverbialAdjunctionSurfaceText(entry))
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
    if (!hasResultFrame && Array.isArray(input.output?.surfaceForms)) {
        forms.push(...input.output.surfaceForms);
    }
    if (!hasResultFrame && input.output?.surface) {
        forms.push(input.output.surface);
    }
    if (!hasResultFrame && input.result) {
        forms.push(input.result);
    }
    if (!hasResultFrame && input.word) {
        forms.push(input.word);
    }
    return forms
        .flatMap((entry) => splitAdverbialAdjunctionSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getAdverbialAdjunctionFormulaEcho(input = null) {
    if (!input || typeof input !== "object") {
        return "";
    }
    return String(
        input.formulaEcho
        || input.clauseFrame?.formulaEcho
        || input.nncBasic?.formulaEcho
        || input.nuclearClauseShell?.formulaEcho
        || input.adverbialNuclearFrame?.source?.raw
        || ""
    );
}

function buildAdverbialAdjunctionClauseNode(input = "", role = "unknown", fallbackSurface = "") {
    const surface = getAdverbialAdjunctionSurface(input, fallbackSurface);
    return {
        kind: "adverbial-adjunction-clause-node",
        role: String(role || "unknown"),
        surface,
        clauseKind: typeof input === "object" && input
            ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown")
            : "unknown",
        unitType: typeof input === "object" && input
            ? normalizeAdverbialAdjunctionUnit(input.adjoinedUnitType || input.unitType || input.clauseKind || "")
            : ADVERBIAL_ADJUNCTION_UNIT.unknown,
        formulaEcho: getAdverbialAdjunctionFormulaEcho(input),
        preservesSurface: true,
    };
}

function buildAdverbialAdjunctionSurfaceSequence({
    principalSurface = "",
    adjoinedSurface = "",
    order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
    marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
    marker = "",
} = {}) {
    const principal = String(principalSurface || "").trim();
    const adjoined = String(adjoinedSurface || "").trim();
    const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
    const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
    const markerText = String(marker || "").trim()
        || (normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.unmarked ? "" : normalizedMarking.replace("-", " "));
    const markedAdjoined = [markerText, adjoined].filter(Boolean).join(" ");
    switch (normalizedOrder) {
        case ADVERBIAL_ADJUNCTION_ORDER.headModifier:
        case ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier:
            return [principal, markedAdjoined].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead:
            return [adjoined, markerText, principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.discontinuous:
            return [markedAdjoined, "...", principal].filter(Boolean);
        case ADVERBIAL_ADJUNCTION_ORDER.modifierHead:
        default:
            return [markedAdjoined, principal].filter(Boolean);
    }
}

function buildAdverbialAdjunctionRelationContract({
    relation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
    marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
    adjoinedClauseAdverbialized = false,
    conditionType = "",
    purposeMood = "",
} = {}) {
    const normalizedRelation = normalizeAdverbialAdjunctionRelation(relation);
    const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking);
    const base = {
        relation: normalizedRelation,
        lessonPart: adjoinedClauseAdverbialized ? 49 : 50,
        adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
        marking: normalizedMarking,
        translationMirage: false,
    };
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason) {
        return {
            ...base,
            principalClauseIntroducer: normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca ? "ca" : "",
            caIsConjunction: false,
            translationMirage: true,
            note: "ca introduces a principal clause; because/for/since are translation effects",
        };
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition) {
        return {
            ...base,
            conditionType: String(conditionType || "open"),
            expectedMarker: "tla or in tla",
            adjoinedClauseMayPrecedeOrFollow: true,
        };
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.purpose) {
        return {
            ...base,
            purposeMood: String(purposeMood || ""),
            sharedReferentPossible: true,
            admonitiveMayMeanLest: true,
        };
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.concession) {
        return {
            ...base,
            expectedMarkers: ["in tla nel", "ma nel", "in ma nel"],
        };
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.consequence) {
        return {
            ...base,
            expectedMarker: "iuh",
        };
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.proviso) {
        return {
            ...base,
            expectedMarker: "ahzo",
        };
    }
    return base;
}

function buildAdverbialAdjunctionAst({
    principalClause = "",
    adjoinedUnit = "",
    principalSurface = "",
    adjoinedSurface = "",
    semanticRelation = ADVERBIAL_ADJUNCTION_RELATION.unknown,
    adjoinedUnitType = ADVERBIAL_ADJUNCTION_UNIT.unknown,
    order = ADVERBIAL_ADJUNCTION_ORDER.modifierHead,
    recursion = ADVERBIAL_ADJUNCTION_RECURSION.none,
    marking = ADVERBIAL_ADJUNCTION_MARKING.unmarked,
    marker = "",
    adjoinedClauseAdverbialized = true,
    conditionType = "",
    purposeMood = "",
    evidenceSource = "",
    confirmed = false,
} = {}) {
    const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
    const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
    const normalizedOrder = normalizeAdverbialAdjunctionOrder(order);
    const normalizedRecursion = normalizeAdverbialAdjunctionRecursion(recursion);
    const normalizedMarking = normalizeAdverbialAdjunctionMarking(marking || marker);
    const principalNode = buildAdverbialAdjunctionClauseNode(principalClause, "principal", principalSurface);
    const adjoinedNode = buildAdverbialAdjunctionClauseNode(adjoinedUnit, "adjoined", adjoinedSurface);
    const diagnostics = [];
    if (!principalNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-principal-clause-surface");
    }
    if (!adjoinedNode.surface) {
        diagnostics.push("adverbial-adjunction-requires-adjoined-unit-surface");
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.unknown) {
        diagnostics.push("adverbial-adjunction-relation-unconfirmed");
    }
    if (normalizedUnit === ADVERBIAL_ADJUNCTION_UNIT.unknown) {
        diagnostics.push("adverbial-adjunction-unit-unconfirmed");
    }
    if (normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.unknown) {
        diagnostics.push("adverbial-adjunction-order-unconfirmed");
    }
    if (
        normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.condition
        && ![
            ADVERBIAL_ADJUNCTION_MARKING.tla,
            ADVERBIAL_ADJUNCTION_MARKING.inTla,
        ].includes(normalizedMarking)
    ) {
        diagnostics.push("adverbial-adjunction-condition-usually-requires-tla-marker");
    }
    if (normalizedRelation === ADVERBIAL_ADJUNCTION_RELATION.reason && normalizedMarking === ADVERBIAL_ADJUNCTION_MARKING.ca) {
        diagnostics.push("adverbial-adjunction-ca-is-not-conjunction");
    }
    if (!String(evidenceSource || "").trim()) {
        diagnostics.push("adverbial-adjunction-needs-nawat-clause-evidence");
    }
    const supported = Boolean(
        principalNode.surface
        && adjoinedNode.surface
        && normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown
        && normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown
        && normalizedOrder !== ADVERBIAL_ADJUNCTION_ORDER.unknown
    );
    const surfaceSequence = supported
        ? buildAdverbialAdjunctionSurfaceSequence({
            principalSurface: principalNode.surface,
            adjoinedSurface: adjoinedNode.surface,
            order: normalizedOrder,
            marking: normalizedMarking,
            marker,
        })
        : [];
    return attachGrammarAstContract({
        kind: "adverbial-adjunction-ast",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        lessons: [49, 50],
        structuralSource: adjoinedClauseAdverbialized ? "Andrews Lesson 49" : "Andrews Lesson 50",
        targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        order: normalizedOrder,
        recursion: {
            locus: normalizedRecursion,
            recursive: normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.none
                && normalizedRecursion !== ADVERBIAL_ADJUNCTION_RECURSION.unknown,
            pattern: normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.head
                ? "modifier + (head = modifier + head)"
                : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.modifier
                    ? "(modifier = modifier + head) + head"
                    : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.both
                        ? "(modifier = modifier + head) + (head = modifier + head)"
                        : normalizedRecursion === ADVERBIAL_ADJUNCTION_RECURSION.appositive
                            ? "general place/time adjunct + specific place/time appositive"
                            : "",
        },
        marking: {
            value: normalizedMarking,
            marker: String(marker || ""),
            isMarked: normalizedMarking !== ADVERBIAL_ADJUNCTION_MARKING.unmarked,
        },
        principalClause: principalNode,
        adjoinedUnit: adjoinedNode,
        relationContract: buildAdverbialAdjunctionRelationContract({
            relation: normalizedRelation,
            marking: normalizedMarking,
            adjoinedClauseAdverbialized: adjoinedClauseAdverbialized === true,
            conditionType,
            purposeMood,
        }),
        transformations: {
            adjoinedUnitPrecedesHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.modifierHead
                || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous,
            adjoinedUnitFollowsHead: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.headModifier
                || normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
            adverbialUnitIsPrincipal: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.principalAdverbialHead,
            isAppositivePlaceTime: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.appositiveHeadModifier,
            isDiscontinuous: normalizedOrder === ADVERBIAL_ADJUNCTION_ORDER.discontinuous,
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildAdverbialAdjunctionBoundaryMetadata(),
    }, {
        astKind: "adverbial-adjunction-ast",
        lessons: [49, 50],
        structuralSource: adjoinedClauseAdverbialized ? "Andrews Lesson 49" : "Andrews Lesson 50",
    });
}

function classifyAdverbialAdjunctionCandidate({
    principalClause = "",
    adjoinedUnit = "",
    candidate = "",
    semanticRelation = "",
    adjoinedUnitType = "",
    marking = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRelation = normalizeAdverbialAdjunctionRelation(semanticRelation);
    const normalizedUnit = normalizeAdverbialAdjunctionUnit(adjoinedUnitType);
    const normalizedFalsePositive = normalizeAdverbialAdjunctionFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "adverbial-adjunction-candidate-classification",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        adjoinedUnit: String(adjoinedUnit || ""),
        candidate: String(candidate || ""),
        semanticRelation: normalizedRelation,
        adjoinedUnitType: normalizedUnit,
        marking: String(marking || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "adverbial-adjunction-needs-validation" : "adverbial-adjunction-needs-nawat-clause-evidence",
            normalizedRelation !== ADVERBIAL_ADJUNCTION_RELATION.unknown
                ? "adverbial-adjunction-relation-recognized"
                : "adverbial-adjunction-relation-unconfirmed",
            normalizedUnit !== ADVERBIAL_ADJUNCTION_UNIT.unknown
                ? "adverbial-adjunction-unit-recognized"
                : "adverbial-adjunction-unit-unconfirmed",
            normalizedFalsePositive !== ADVERBIAL_ADJUNCTION_FALSE_POSITIVE_SOURCE.unknown
                ? "adverbial-adjunction-false-positive-source"
                : "adverbial-adjunction-unconfirmed",
        ],
        boundary: buildAdverbialAdjunctionBoundaryMetadata(),
    };
}

function classifyAdverbialAdjunctionFalsePositive(source = "") {
    const normalizedSource = normalizeAdverbialAdjunctionFalsePositiveSource(source);
    return {
        kind: "adverbial-adjunction-false-positive",
        version: ADVERBIAL_ADJUNCTION_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialAdjunctionEvidence: false,
        isClauseAdjunctionAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-adjunction-false-positive-source"],
        antiConflationRules: getAdverbialAdjunctionAntiConflationRules(),
    };
}
