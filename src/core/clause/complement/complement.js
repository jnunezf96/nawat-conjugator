// core/clause/complement/complement.js
// Lesson 51 complementation boundary metadata. This keeps current word-level
// VNC/NNC outputs, object controls, and nominalization metadata separate from
// confirmed clause-level complement structures until Nawat/Pipil evidence
// supports them.

"use strict";

const COMPLEMENT_CLAUSE_BOUNDARY_VERSION = 1;

const COMPLEMENT_CLAUSE_ROLE = Object.freeze({
    objectComplement: "object-complement",
    subjectComplement: "subject-complement",
    adverbialComplement: "adverbial-complement",
    doubleNucleus: "double-nucleus",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_UNIT = Object.freeze({
    vnc: "vnc",
    nnc: "nnc",
    clause: "clause",
    sentence: "sentence",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY = Object.freeze({
    change: "change",
    materialComposition: "material-composition",
    designation: "designation",
    state: "state",
    identity: "identity",
    composition: "composition",
    coverage: "coverage",
    beginning: "beginning",
    satisfaction: "satisfaction",
    daring: "daring",
    cessation: "cessation",
    tarrying: "tarrying",
    relationalLexicalized: "relational-lexicalized",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_LINK = Object.freeze({
    objectPronounToComplementSubject: "object-pronoun-to-complement-subject",
    subjectPronounToComplementSubject: "subject-pronoun-to-complement-subject",
    possessorPronounToComplement: "possessor-pronoun-to-complement",
    principalSubjectToAdjoinedSubject: "principal-subject-to-adjoined-subject",
    relationalNncToCompatibleVerbstem: "relational-nnc-to-compatible-verbstem",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_ORDER = Object.freeze({
    complementPrincipal: "complement-principal",
    principalComplement: "principal-complement",
    discontinuous: "discontinuous",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryVncOutput: "ordinary-vnc-output",
    ordinaryNncOutput: "ordinary-nnc-output",
    nominalizationProfile: "nominalization-profile",
    objectControlLabel: "object-control-label",
    subjectLabel: "subject-label",
    adverbTranslation: "adverb-translation",
    singleGeneratedWord: "single-generated-word",
    csvVerbSurface: "csv-verb-surface",
    routeLabel: "route-label",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze([
    "complement-clause boundary metadata is not generation",
    "object controls and subject labels are not complement-clause evidence",
    "ordinary VNC or NNC output is not a complement AST",
    "nominalizationProfile is not a clause-level complement relation",
    "single generated words do not prove object, subject, or adverbial complements",
    "Andrews complementation categories are architecture, not Nawat/Pipil form authority",
]);

const COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "principalClause",
        asks: "Which Nawat/Pipil principal clause hosts the complement?",
    }),
    Object.freeze({
        field: "complement",
        asks: "Which Nawat/Pipil VNC, NNC, clause, or sentence functions as complement?",
    }),
    Object.freeze({
        field: "complementRole",
        asks: "Is the relation object complement, subject complement, adverbial complement, double nucleus, or unknown?",
    }),
    Object.freeze({
        field: "complementUnitType",
        asks: "Is the complement unit a VNC, NNC, clause, sentence, or unknown?",
    }),
    Object.freeze({
        field: "linkingEvidence",
        asks: "What marking, order, valency, or shared-argument evidence supports complement status?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided clause evidence supports complementation?",
    }),
]);

function normalizeComplementClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeComplementClauseRole(value = "") {
    return normalizeComplementClauseEnum(
        value,
        Object.values(COMPLEMENT_CLAUSE_ROLE),
        COMPLEMENT_CLAUSE_ROLE.unknown
    );
}

function normalizeComplementClauseUnit(value = "") {
    return normalizeComplementClauseEnum(
        value,
        Object.values(COMPLEMENT_CLAUSE_UNIT),
        COMPLEMENT_CLAUSE_UNIT.unknown
    );
}

function normalizeComplementClauseSemanticCategory(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        material: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.materialComposition,
        composition: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        composed: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        name: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        naming: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        begin: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        start: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        covered: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.coverage,
        "relational": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized,
        "relational-idiom": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized,
    };
    return aliases[normalized] || normalizeComplementClauseEnum(
        normalized,
        Object.values(COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY),
        COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown
    );
}

function normalizeComplementClauseLink(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        object: COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject,
        subject: COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject,
        possessor: COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement,
        adverbial: COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject,
        relational: COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem,
    };
    return aliases[normalized] || normalizeComplementClauseEnum(
        normalized,
        Object.values(COMPLEMENT_CLAUSE_LINK),
        COMPLEMENT_CLAUSE_LINK.unknown
    );
}

function normalizeComplementClauseOrder(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        preposed: COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        "complement-precedes-principal": COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        postposed: COMPLEMENT_CLAUSE_ORDER.principalComplement,
        "complement-follows-principal": COMPLEMENT_CLAUSE_ORDER.principalComplement,
    };
    return aliases[normalized] || normalizeComplementClauseEnum(
        normalized,
        Object.values(COMPLEMENT_CLAUSE_ORDER),
        COMPLEMENT_CLAUSE_ORDER.unknown
    );
}

function normalizeComplementClauseFalsePositiveSource(value = "") {
    return normalizeComplementClauseEnum(
        value,
        Object.values(COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE),
        COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getComplementClauseAntiConflationRules() {
    return Array.from(COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES);
}

function getComplementClauseStructuralQuestions() {
    return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildComplementClauseBoundaryMetadata() {
    return {
        kind: "complement-clause-boundary",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        status: "partial",
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getComplementClauseStructuralQuestions(),
        boundaries: {
            hasVncGeneration: true,
            hasNncGeneration: true,
            hasNominalizationProfileMetadata: true,
            hasComplementAst: true,
            hasConfirmedClauseExamples: false,
            hasStaticComplementData: false,
            changesVncGeneration: false,
            changesNncGeneration: false,
            changesNominalizationGeneration: false,
            changesValencyBehavior: false,
            treatsGeneratedWordAsComplementEvidence: false,
            treatsObjectControlAsComplementEvidence: false,
        },
        antiConflationRules: getComplementClauseAntiConflationRules(),
    };
}

function getComplementClauseSurface(input = "", fallback = "") {
    if (typeof input === "string") {
        return String(input || fallback || "").trim();
    }
    if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
    }
    const surface = getComplementClauseSurfaceForms(input)[0];
    if (getComplementClauseResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
    }
    return String(surface || fallback || "").trim();
}

function splitComplementClauseSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
}

function getComplementClauseResultFrame(input = null) {
    return (
        (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null)
        || (input?.frames && typeof input.frames === "object" ? input.frames : null)
    );
}

function getComplementClauseSurfaceForms(input = null) {
    if (typeof input === "string") {
        return splitComplementClauseSurfaceText(input);
    }
    if (!input || typeof input !== "object") {
        return [];
    }
    const grammarFrame = getComplementClauseResultFrame(input);
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
            .flatMap((entry) => splitComplementClauseSurfaceText(entry))
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
        .flatMap((entry) => splitComplementClauseSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function buildComplementClauseNode(input = "", role = "unknown", fallbackSurface = "") {
    const surface = getComplementClauseSurface(input, fallbackSurface);
    return {
        kind: "complement-clause-node",
        role: String(role || "unknown"),
        surface,
        clauseKind: typeof input === "object" && input
            ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown")
            : "unknown",
        formulaEcho: typeof input === "object" && input
            ? String(input.formulaEcho || input.nuclearClauseShell?.formulaEcho || input.nncBasic?.formulaEcho || "")
            : "",
        preservesSurface: true,
    };
}

function getDefaultComplementClauseLink(complementRole = "") {
    const normalizedRole = normalizeComplementClauseRole(complementRole);
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject;
    }
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject;
    }
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject;
    }
    return COMPLEMENT_CLAUSE_LINK.unknown;
}

function buildComplementClauseSurfaceSequence({
    principalSurface = "",
    complementSurface = "",
    order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
} = {}) {
    const principal = String(principalSurface || "").trim();
    const complement = String(complementSurface || "").trim();
    const normalizedOrder = normalizeComplementClauseOrder(order);
    if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.principalComplement) {
        return [principal, complement].filter(Boolean);
    }
    if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.discontinuous) {
        return [complement, "...", principal].filter(Boolean);
    }
    return [complement, principal].filter(Boolean);
}

function buildComplementClauseRelationContract({
    complementRole = "",
    semanticCategory = "",
    link = "",
    principalVerbStem = "",
    complementState = "",
    complementTense = "",
    passiveTransformOfObjectComplement = false,
} = {}) {
    const normalizedRole = normalizeComplementClauseRole(complementRole);
    const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
    const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
    const base = {
        role: normalizedRole,
        semanticCategory: normalizedCategory,
        link: normalizedLink,
        principalVerbStem: String(principalVerbStem || ""),
        complementState: String(complementState || ""),
        complementTense: String(complementTense || ""),
        distinctFromSupplementation: true,
        incorporatedComplementAlternative: normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement,
    };
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return {
            ...base,
            headPronounSlot: "object",
            complementSubjectSharesWith: "principal-object-pronoun",
            objectComplementTypes: ["change", "material-composition", "designation", "state"],
            possessiveNameComplementPossible: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        };
    }
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return {
            ...base,
            headPronounSlot: "subject",
            complementSubjectSharesWith: "principal-subject-pronoun",
            subjectComplementTypes: ["identity", "composition", "state"],
            passiveTransformOfObjectComplement: passiveTransformOfObjectComplement === true,
        };
    }
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return {
            ...base,
            headPronounSlot: "principal-subject-or-compatible-relation",
            complementSubjectSharesWith: normalizedLink === COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem
                ? "relational-nnc-compatible-verbstem"
                : "principal-subject-pronoun",
            adverbialComplementTypes: [
                "coverage",
                "beginning",
                "satisfaction",
                "daring",
                "cessation",
                "tarrying",
                "relational-lexicalized",
            ],
            pehuaComplementUsuallyPresentTense: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
            activeActionCanIncorporateRelationalNnc:
                normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized,
        };
    }
    return base;
}

function buildComplementClauseAst({
    principalClause = "",
    complement = "",
    principalSurface = "",
    complementSurface = "",
    complementRole = COMPLEMENT_CLAUSE_ROLE.unknown,
    complementUnitType = COMPLEMENT_CLAUSE_UNIT.unknown,
    semanticCategory = COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown,
    link = "",
    order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
    principalVerbStem = "",
    complementState = "",
    complementTense = "",
    passiveTransformOfObjectComplement = false,
    evidenceSource = "",
    confirmed = false,
} = {}) {
    const normalizedRole = normalizeComplementClauseRole(complementRole);
    const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
    const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
    const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
    const normalizedOrder = normalizeComplementClauseOrder(order);
    const principalNode = buildComplementClauseNode(principalClause, "principal", principalSurface);
    const complementNode = buildComplementClauseNode(complement, "complement", complementSurface);
    const diagnostics = [];
    if (!principalNode.surface) {
        diagnostics.push("complement-clause-requires-principal-surface");
    }
    if (!complementNode.surface) {
        diagnostics.push("complement-clause-requires-complement-surface");
    }
    if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.unknown) {
        diagnostics.push("complement-clause-role-unconfirmed");
    }
    if (normalizedUnit === COMPLEMENT_CLAUSE_UNIT.unknown) {
        diagnostics.push("complement-clause-unit-unconfirmed");
    }
    if (normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown) {
        diagnostics.push("complement-clause-semantic-category-unconfirmed");
    }
    if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.unknown) {
        diagnostics.push("complement-clause-order-unconfirmed");
    }
    if (
        normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement
        && normalizedLink !== COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject
        && normalizedLink !== COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement
    ) {
        diagnostics.push("object-complement-requires-object-pronoun-link");
    }
    if (
        normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement
        && normalizedLink !== COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject
    ) {
        diagnostics.push("subject-complement-requires-subject-pronoun-link");
    }
    if (!String(evidenceSource || "").trim()) {
        diagnostics.push("complement-clause-needs-nawat-clause-evidence");
    }
    const supported = Boolean(
        principalNode.surface
        && complementNode.surface
        && normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown
        && normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown
        && normalizedCategory !== COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown
        && normalizedOrder !== COMPLEMENT_CLAUSE_ORDER.unknown
        && !diagnostics.includes("object-complement-requires-object-pronoun-link")
        && !diagnostics.includes("subject-complement-requires-subject-pronoun-link")
    );
    const surfaceSequence = supported
        ? buildComplementClauseSurfaceSequence({
            principalSurface: principalNode.surface,
            complementSurface: complementNode.surface,
            order: normalizedOrder,
        })
        : [];
    return attachGrammarAstContract({
        kind: "complement-clause-ast",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        semanticCategory: normalizedCategory,
        order: normalizedOrder,
        principalClause: principalNode,
        complement: complementNode,
        link: {
            type: normalizedLink,
            sharedReferenceRequired: true,
            distinguishesFromSupplementation: true,
        },
        relationContract: buildComplementClauseRelationContract({
            complementRole: normalizedRole,
            semanticCategory: normalizedCategory,
            link: normalizedLink,
            principalVerbStem,
            complementState,
            complementTense,
            passiveTransformOfObjectComplement,
        }),
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        changesValencyBehavior: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildComplementClauseBoundaryMetadata(),
    }, {
        astKind: "complement-clause-ast",
        lessons: [51],
        structuralSource: "Andrews Lesson 51",
    });
}

function classifyComplementClauseCandidate({
    principalClause = "",
    complement = "",
    candidate = "",
    complementRole = "",
    complementUnitType = "",
    linkingEvidence = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedRole = normalizeComplementClauseRole(complementRole);
    const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
    const normalizedFalsePositive = normalizeComplementClauseFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "complement-clause-candidate-classification",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        complement: String(complement || ""),
        candidate: String(candidate || ""),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        linkingEvidence: String(linkingEvidence || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "complement-clause-needs-validation" : "complement-clause-needs-nawat-clause-evidence",
            normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown
                ? "complement-clause-role-recognized"
                : "complement-clause-role-unconfirmed",
            normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown
                ? "complement-clause-unit-recognized"
                : "complement-clause-unit-unconfirmed",
            normalizedFalsePositive !== COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown
                ? "complement-clause-false-positive-source"
                : "complement-clause-unconfirmed",
        ],
        boundary: buildComplementClauseBoundaryMetadata(),
    };
}

function classifyComplementClauseFalsePositive(source = "") {
    const normalizedSource = normalizeComplementClauseFalsePositiveSource(source);
    return {
        kind: "complement-clause-false-positive",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        source: normalizedSource,
        isComplementClauseEvidence: false,
        isComplementAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["complement-clause-false-positive-source"],
        antiConflationRules: getComplementClauseAntiConflationRules(),
    };
}
