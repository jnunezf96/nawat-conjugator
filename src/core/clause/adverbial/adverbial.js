// core/clause/adverbial/adverbial.js
// Lesson 44 adverbial nuclear-clause boundary metadata. This keeps the current
// legacy adverbio word output separate from confirmed adverbial NNC/VNC or
// clause-level modeling until Nawat/Pipil evidence supports it.

"use strict";

const ADVERBIAL_NUCLEAR_BOUNDARY_VERSION = 1;

const ADVERBIAL_NUCLEAR_KIND = Object.freeze({
    vncAdverbial: "vnc-adverbial",
    nncAdverbial: "nnc-adverbial",
    particleLookingNnc: "particle-looking-nnc",
    possessiveStateNnc: "possessive-state-nnc",
    mannerSurface: "manner-surface",
    unknown: "unknown",
});

const ADVERBIAL_NUCLEAR_DEGREE = Object.freeze({
    firstDegree: "first-degree",
    secondDegree: "second-degree",
    lexicalized: "lexicalized",
    legacy: "legacy-adverbio",
    unknown: "unknown",
});

const ADVERBIAL_NUCLEAR_DOMAIN = Object.freeze({
    manner: "manner",
    place: "place",
    direction: "direction",
    time: "time",
    duration: "duration",
    degree: "degree",
    unknown: "unknown",
});

const ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND = Object.freeze({
    vnc: "vnc",
    nncAbsolutive: "nnc-absolutive",
    nncPossessive: "nnc-possessive",
    unknown: "unknown",
});

const ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE = Object.freeze({
    legacyAdverbioSurface: "legacy-adverbio-surface",
    adverbTranslation: "adverb-translation",
    particleLabel: "particle-label",
    ordinaryNncOutput: "ordinary-nnc-output",
    ordinaryVncOutput: "ordinary-vnc-output",
    routeLabel: "route-label",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES = Object.freeze([
    "adverbial nuclear-clause boundary metadata is not generation",
    "adverbialNuclearClauseFrame describes existing generated output; it does not create new Nawat word forms",
    "legacy adverbio word output is not a full Lesson 44 engine",
    "adverb translations are not Nawat/Pipil adverbial-clause evidence",
    "particle-looking labels are not particle or adverbial NNC fixture evidence",
    "ordinary NNC/VNC outputs are not clause-level adverbialization evidence",
    "Andrews adverbial categories are architecture, not Nawat/Pipil form authority",
]);

const ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "source",
        asks: "Which Nawat/Pipil VNC, NNC, particle-looking form, or clause is the source?",
    }),
    Object.freeze({
        field: "adverbialKind",
        asks: "Is the candidate VNC-adverbial, NNC-adverbial, particle-looking NNC, possessive-state NNC, manner surface, or unknown?",
    }),
    Object.freeze({
        field: "adverbialDegree",
        asks: "What evidence supports first-degree, second-degree, lexicalized, or other adverbialization status?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided clause/form evidence supports adverbial status?",
    }),
]);

function normalizeAdverbialNuclearEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeAdverbialNuclearKind(value = "") {
    return normalizeAdverbialNuclearEnum(
        value,
        Object.values(ADVERBIAL_NUCLEAR_KIND),
        ADVERBIAL_NUCLEAR_KIND.unknown
    );
}

function normalizeAdverbialNuclearDegree(value = "") {
    return normalizeAdverbialNuclearEnum(
        value,
        Object.values(ADVERBIAL_NUCLEAR_DEGREE),
        ADVERBIAL_NUCLEAR_DEGREE.unknown
    );
}

function normalizeAdverbialNuclearDomain(value = "") {
    return normalizeAdverbialNuclearEnum(
        value,
        Object.values(ADVERBIAL_NUCLEAR_DOMAIN),
        ADVERBIAL_NUCLEAR_DOMAIN.unknown
    );
}

function normalizeAdverbialNuclearSourceClauseKind(value = "") {
    return normalizeAdverbialNuclearEnum(
        value,
        Object.values(ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND),
        ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.unknown
    );
}

function normalizeAdverbialNuclearFalsePositiveSource(value = "") {
    return normalizeAdverbialNuclearEnum(
        value,
        Object.values(ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE),
        ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown
    );
}

function getKnownLegacyAdverbioTensesForAdverbialBoundary() {
    return ["pasado-remoto-adverbio-activo"];
}

function getAdverbialNuclearAntiConflationRules() {
    return Array.from(ADVERBIAL_NUCLEAR_ANTI_CONFLATION_RULES);
}

function getAdverbialNuclearStructuralQuestions() {
    return ADVERBIAL_NUCLEAR_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function attachAdverbialNuclearGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "adverbial-nuclear-clause",
        routeFamily: "adverbial-nuclear",
        ...options,
    });
}

function normalizeAdverbialNuclearSurfaceValue(value = "") {
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitAdverbialNuclearSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdverbialNuclearSurfaceValue(entry))
        .filter(Boolean);
}

function getAdverbialNuclearGrammarFrame(frameLike = null) {
    if (!frameLike || typeof frameLike !== "object") {
        return null;
    }
    return [
        frameLike.grammarFrame,
        frameLike.frames,
        frameLike,
    ].find((candidate) => (
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

function getAdverbialNuclearResultFrame({
    grammarFrame = null,
    frames = null,
    result = null,
    output = null,
} = {}) {
    const frame = [
        getAdverbialNuclearGrammarFrame(grammarFrame),
        getAdverbialNuclearGrammarFrame(frames),
        getAdverbialNuclearGrammarFrame(result),
        getAdverbialNuclearGrammarFrame(output),
    ].find(Boolean);
    return frame?.resultFrame && typeof frame.resultFrame === "object"
        ? frame.resultFrame
        : null;
}

function getAdverbialNuclearContractSurfaceForms({
    surfaceForms = [],
    surface = "",
    result = null,
    output = null,
    grammarFrame = null,
    frames = null,
} = {}) {
    const frameResult = getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output,
    });
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
            .flatMap((entry) => splitAdverbialNuclearSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(surfaceForms)) {
        forms.push(...surfaceForms);
    } else if (!hasResultFrame && surfaceForms) {
        forms.push(surfaceForms);
    }
    if (!hasResultFrame && surface) {
        forms.push(surface);
    }
    [result, output].forEach((node) => {
        if (!node || typeof node !== "object") {
            return;
        }
        if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
            forms.push(...node.surfaceForms);
        }
        if (!hasResultFrame && node.surface) {
            forms.push(node.surface);
        }
        if (!hasResultFrame && node.result) {
            forms.push(node.result);
        }
    });
    return forms
        .flatMap((form) => splitAdverbialNuclearSurfaceText(form))
        .filter((form, index, list) => form && list.indexOf(form) === index);
}

function getAdverbialNuclearContractSourceText({
    source = "",
    sourceStem = "",
    analysisStem = "",
    finalStem = "",
    result = null,
    output = null,
    grammarFrame = null,
    frames = null,
} = {}) {
    const frameResult = getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output,
    });
    if (frameResult) {
        return normalizeAdverbialNuclearSurfaceValue(frameResult.sourceInput || "");
    }
    return String(
        source
        || sourceStem
        || analysisStem
        || finalStem
        || result?.sourceInput
        || output?.sourceInput
        || result?.source
        || output?.source
        || ""
    ).trim();
}

function buildAdverbialNuclearBoundaryMetadata() {
    const boundary = {
        kind: "adverbial-nuclear-boundary",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        lesson: 44,
        status: "partial",
        structuralSource: "Andrews Lesson 44",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        knownLegacyAdverbioTenses: getKnownLegacyAdverbioTensesForAdverbialBoundary(),
        structuralQuestions: getAdverbialNuclearStructuralQuestions(),
        boundaries: {
            hasLegacyAdverbioSurface: true,
            hasAdverbialNuclearClauseFrame: true,
            hasFullAdverbialNuclearClauseEngine: false,
            hasAdverbialNncGeneration: false,
            hasAdverbialVncGeneration: false,
            hasStaticAdverbialData: false,
            changesAdverbioGeneration: false,
            changesNncGeneration: false,
            changesVncGeneration: false,
            treatsLegacyAdverbioSurfaceAsFullLesson44Evidence: false,
        },
        antiConflationRules: getAdverbialNuclearAntiConflationRules(),
    };
    return attachAdverbialNuclearGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary,
    });
}

function buildAdverbializedSubjectPronounFrame({
    sourceClauseKind = ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.unknown,
    adverbialDegree = ADVERBIAL_NUCLEAR_DEGREE.unknown,
} = {}) {
    const normalizedSourceKind = normalizeAdverbialNuclearSourceClauseKind(sourceClauseKind);
    const normalizedDegree = normalizeAdverbialNuclearDegree(adverbialDegree);
    const secondDegree = normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.secondDegree;
    return {
        kind: "adverbialized-subject-pronoun",
        lessonRef: "Andrews 44.2",
        degree: normalizedDegree,
        sourceClauseKind: normalizedSourceKind,
        locus: "subject-pronoun",
        num1: {
            changesSoundedFillerToSilent: secondDegree,
            description: secondDegree
                ? "second-degree adverbialization replaces a sounded num1 filler with a silent one"
                : "first-degree adverbialization has no required subject-pronoun shape change",
        },
        constraints: {
            vncAllowsOnlyFirstDegree: true,
            possessiveNncAllowsOnlyFirstDegree: true,
            absolutiveNncIsIdiosyncratic: true,
        },
    };
}

function buildAdverbialNuclearClauseFrame({
    source = "",
    surfaceForms = [],
    surface = "",
    result = null,
    output = null,
    grammarFrame = null,
    frames = null,
    sourceClauseKind = ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.vnc,
    adverbialKind = ADVERBIAL_NUCLEAR_KIND.vncAdverbial,
    adverbialDegree = ADVERBIAL_NUCLEAR_DEGREE.firstDegree,
    semanticDomain = ADVERBIAL_NUCLEAR_DOMAIN.manner,
    tense = "",
    sourceStem = "",
    finalStem = "",
    analysisStem = "",
    sourceValency = "",
    objectPrefix = "",
    baseObjectPrefix = "",
    evidenceSource = "",
    legacyTense = "",
} = {}) {
    const normalizedSourceKind = normalizeAdverbialNuclearSourceClauseKind(sourceClauseKind);
    const normalizedKind = normalizeAdverbialNuclearKind(adverbialKind);
    const normalizedDegree = normalizeAdverbialNuclearDegree(adverbialDegree);
    const normalizedDomain = normalizeAdverbialNuclearDomain(semanticDomain);
    const forms = getAdverbialNuclearContractSurfaceForms({
        surfaceForms,
        surface,
        result,
        output,
        grammarFrame,
        frames,
    });
    const sourceText = getAdverbialNuclearContractSourceText({
        source,
        sourceStem,
        analysisStem,
        finalStem,
        result,
        output,
        grammarFrame,
        frames,
    });
    const hasResultFrame = Boolean(getAdverbialNuclearResultFrame({
        grammarFrame,
        frames,
        result,
        output,
    }));
    const diagnostics = [];
    if (!sourceText) {
        diagnostics.push("adverbial-nuclear-requires-source");
    }
    if (!forms.length) {
        diagnostics.push("adverbial-nuclear-requires-generated-surface");
    }
    if (
        (normalizedSourceKind === ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.vnc
            || normalizedSourceKind === ADVERBIAL_NUCLEAR_SOURCE_CLAUSE_KIND.nncPossessive)
        && normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.secondDegree
    ) {
        diagnostics.push("adverbial-nuclear-source-permits-first-degree-only");
    }
    if (normalizedDomain === ADVERBIAL_NUCLEAR_DOMAIN.unknown) {
        diagnostics.push("adverbial-nuclear-semantic-domain-unconfirmed");
    }
    const supported = Boolean(sourceText && forms.length)
        && !diagnostics.includes("adverbial-nuclear-source-permits-first-degree-only");
    const subjectPronoun = buildAdverbializedSubjectPronounFrame({
        sourceClauseKind: normalizedSourceKind,
        adverbialDegree: normalizedDegree,
    });
    const frame = {
        kind: "adverbial-nuclear-clause-frame",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        lesson: 44,
        structuralSource: "Andrews 44.1-44.4",
        targetAuthority: "Nawat/Pipil generated output supplied to this frame",
        supported,
        confirmed: false,
        source: {
            raw: sourceText,
            clauseKind: normalizedSourceKind,
            adverbialKind: normalizedKind,
            stem: String(hasResultFrame ? sourceText : (sourceStem || sourceText)),
            finalStem: String(hasResultFrame ? sourceText : (finalStem || sourceStem || sourceText)),
            analysisStem: String(hasResultFrame ? sourceText : (analysisStem || sourceStem || sourceText)),
            valency: String(sourceValency || ""),
            objectPrefix: String(objectPrefix || ""),
            baseObjectPrefix: String(baseObjectPrefix || objectPrefix || ""),
            tense: String(tense || legacyTense || ""),
        },
        adverbialization: {
            degree: normalizedDegree,
            semanticDomain: normalizedDomain,
            subjectPronoun,
            lexicalized: normalizedDegree === ADVERBIAL_NUCLEAR_DEGREE.lexicalized,
            legacyRoute: Boolean(legacyTense),
        },
        output: {
            surfaceForms: forms,
            preservesGeneratedSurface: true,
        },
        generationContract: {
            routeGeneratesSurface: Boolean(legacyTense),
            frameGeneratesSurface: false,
            changesSurfaceForms: false,
            newWordGenerationAllowed: false,
        },
        evidenceSource: String(evidenceSource || ""),
        diagnostics,
        boundary: buildAdverbialNuclearBoundaryMetadata(),
    };
    return attachAdverbialNuclearGrammarContract(frame, {
        routeStage: "describe-existing-output",
        sourceInput: sourceText,
        surfaceForms: forms,
        supported,
        generationAllowed: false,
        nuclearClauseFrame: frame,
        morphBoundaryFrame: frame.boundary,
    });
}

function classifyAdverbialNuclearCandidate({
    source = "",
    candidate = "",
    tense = "",
    adverbialKind = "",
    adverbialDegree = "",
    evidenceSource = "",
    falsePositiveSource = "",
} = {}) {
    const normalizedKind = normalizeAdverbialNuclearKind(adverbialKind);
    const normalizedFalsePositive = normalizeAdverbialNuclearFalsePositiveSource(falsePositiveSource);
    const normalizedTense = String(tense || "").trim();
    const hasKnownLegacyAdverbioTense = getKnownLegacyAdverbioTensesForAdverbialBoundary().includes(normalizedTense);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    const classification = {
        kind: "adverbial-nuclear-candidate-classification",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: String(source || ""),
        candidate: String(candidate || ""),
        tense: normalizedTense,
        hasKnownLegacyAdverbioTense,
        adverbialKind: normalizedKind,
        adverbialDegree: String(adverbialDegree || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "adverbial-nuclear-needs-validation" : "adverbial-nuclear-needs-nawat-evidence",
            hasKnownLegacyAdverbioTense ? "legacy-adverbio-surface-recognized" : "legacy-adverbio-surface-unconfirmed",
            normalizedFalsePositive !== ADVERBIAL_NUCLEAR_FALSE_POSITIVE_SOURCE.unknown
                ? "adverbial-nuclear-false-positive-source"
                : "adverbial-nuclear-unconfirmed",
        ],
        boundary: buildAdverbialNuclearBoundaryMetadata(),
    };
    return attachAdverbialNuclearGrammarContract(classification, {
        routeStage: "classify-boundary",
        sourceInput: classification.source || classification.candidate,
        supported: false,
        morphBoundaryFrame: classification.boundary,
    });
}

function classifyAdverbialNuclearFalsePositive(source = "") {
    const normalizedSource = normalizeAdverbialNuclearFalsePositiveSource(source);
    const classification = {
        kind: "adverbial-nuclear-false-positive",
        version: ADVERBIAL_NUCLEAR_BOUNDARY_VERSION,
        source: normalizedSource,
        isAdverbialNuclearEvidence: false,
        isAdverbialNncEvidence: false,
        isAdverbialVncEvidence: false,
        generationAllowed: false,
        diagnostics: ["adverbial-nuclear-false-positive-source"],
        antiConflationRules: getAdverbialNuclearAntiConflationRules(),
    };
    return attachAdverbialNuclearGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
    });
}
