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
    "particle or translation labels are not Nawat/Pipil conjunction evidence",
    "single generated words do not prove marked, unmarked, correlative, or parallel conjunction",
    "Andrews conjunction categories are architecture, not Nawat/Pipil form authority",
]);

const CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "conjuncts",
        asks: "Which Nawat/Pipil words, NNCs, VNCs, clauses, or sentences are conjoined?",
    }),
    Object.freeze({
        field: "marker",
        asks: "What Nawat/Pipil marker or lack of marker is evidenced?",
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
        asks: "What Nawat/Pipil repo or user-provided clause evidence supports conjunction?",
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
        ihuan: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
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

function buildConjunctionClauseBoundaryMetadata() {
    return {
        kind: "conjunction-clause-boundary",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        status: "partial",
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
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
    return String(surface || fallback || "").trim();
}

function splitConjunctionClauseSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
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
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitConjunctionClauseSurfaceText(entry))
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
    return {
        kind: "conjunction-clause-node",
        index,
        surface,
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
        diagnostics.push("conjunction-clause-needs-nawat-clause-evidence");
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
            hasEvidence ? "conjunction-clause-needs-validation" : "conjunction-clause-needs-nawat-clause-evidence",
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
