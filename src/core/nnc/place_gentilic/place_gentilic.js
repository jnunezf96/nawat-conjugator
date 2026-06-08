// core/nnc/place_gentilic/place_gentilic.js
// Lesson 48 place-name/gentilic NNC boundary metadata. This keeps ordinary
// NNC generation, locative-temporal nominal outputs, relational boundaries,
// and translation labels separate from confirmed place-name or gentilic NNC
// generation until Nawat/Pipil evidence supports it.

"use strict";

const PLACE_GENTILIC_NNC_BOUNDARY_VERSION = 1;

const PLACE_GENTILIC_NNC_KIND = Object.freeze({
    placeName: "place-name",
    gentilic: "gentilic",
    gentilicCollective: "gentilic-collective",
    professionPlaceAssociation: "profession-place-association",
    calendarName: "calendar-name",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    relationalNncBoundary: "relational-nnc-boundary",
    locativeTemporalNominal: "locative-temporal-nominal",
    placeTranslation: "place-translation",
    gentilicTranslation: "gentilic-translation",
    professionTranslation: "profession-translation",
    routeLabel: "route-label",
    csvVerbSurface: "csv-verb-surface",
    calendarRoadmapText: "calendar-roadmap-text",
    roadmapText: "roadmap-text",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_USAGE = Object.freeze({
    ordinary: "ordinary-nnc",
    adverbial: "adverbial-nnc",
    adjectival: "adjectival-nnc",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_PLACE_GROUP = Object.freeze({
    nGroup: "n-group",
    panGroup: "pan-group",
    coCGroup: "co-c-group",
    tlahGroup: "tlah-group",
    tzalanGroup: "tzalan-group",
    titlanGroup: "ti-tlan-group",
    chanGroup: "chan-group",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_GENTILIC_FORMATION = Object.freeze({
    nonlocativeAbsolutive: "nonlocative-absolutive",
    twoClauseConcatenate: "two-clause-concatenate",
    preteritAgentivePlace: "preterit-agentive-place",
    caMatrixFullPlace: "ca-matrix-full-place",
    caMatrixPanEca: "ca-matrix-pan-e-ca",
    caMatrixCanMeca: "ca-matrix-ca-n-m-e-ca",
    caMatrixSilentReplacement: "ca-matrix-silent-replacement",
    caMatrixManTlanTeca: "ca-matrix-ma-n-tla-n-te-ca",
    collectivityYo: "collectivity-yo",
    professionExtension: "profession-extension",
    incorporation: "incorporation",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_SUBJECT_REFERENCE = Object.freeze({
    uniqueSocial: "unique-socially-designated-place",
    contextChosen: "context-chosen-locative-relation",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_STATE = Object.freeze({
    absolutive: "absolutive",
    possessive: "possessive",
    unknown: "unknown",
});

const PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES = Object.freeze([
    "place-name/gentilic NNC boundary metadata is not generation",
    "ordinary NNC fixtures are not place-name or gentilic fixture evidence",
    "open-stem ordinary NNC previews are not place-name or gentilic data",
    "locative-temporal nominal outputs are not place-name NNC evidence",
    "relational NNC boundary metadata is not place-name or gentilic evidence",
    "place, profession, or gentilic translations are not Nawat/Pipil form evidence",
    "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil form authority",
]);

const PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS = Object.freeze([
    Object.freeze({
        field: "placeNameSource",
        asks: "Which Nawat/Pipil place-name NNC form is evidenced?",
    }),
    Object.freeze({
        field: "gentilicSource",
        asks: "Which Nawat/Pipil gentilic NNC form is evidenced?",
    }),
    Object.freeze({
        field: "placeGentilicKind",
        asks: "Is the candidate a place-name, gentilic, gentilic collective, profession/place association, calendar-name, or unknown?",
    }),
    Object.freeze({
        field: "associatedPlace",
        asks: "What place is associated with the gentilic, collective, profession, or name?",
    }),
    Object.freeze({
        field: "collectivity",
        asks: "Is collectivity evidenced by Nawat/Pipil data or only by a translation/category label?",
    }),
    Object.freeze({
        field: "evidenceSource",
        asks: "What Nawat/Pipil repo or user-provided example supports place/gentilic status?",
    }),
]);

function normalizePlaceGentilicNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizePlaceGentilicNncKind(value = "") {
    return normalizePlaceGentilicNncEnum(
        value,
        Object.values(PLACE_GENTILIC_NNC_KIND),
        PLACE_GENTILIC_NNC_KIND.unknown
    );
}

function normalizePlaceGentilicNncFalsePositiveSource(value = "") {
    return normalizePlaceGentilicNncEnum(
        value,
        Object.values(PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE),
        PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown
    );
}

function normalizePlaceGentilicNncUsage(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        ordinary: PLACE_GENTILIC_NNC_USAGE.ordinary,
        adverbial: PLACE_GENTILIC_NNC_USAGE.adverbial,
        adjectival: PLACE_GENTILIC_NNC_USAGE.adjectival,
    };
    return aliases[normalized] || normalizePlaceGentilicNncEnum(
        normalized,
        Object.values(PLACE_GENTILIC_NNC_USAGE),
        PLACE_GENTILIC_NNC_USAGE.unknown
    );
}

function normalizePlaceGentilicNncPlaceGroup(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        n: PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n-tli": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        pan: PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup,
        "co": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        c: PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        "co-c": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        tlah: PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup,
        tzalan: PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup,
        titlan: PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        "ti-tlan": PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        chan: PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup,
    };
    return aliases[normalized] || normalizePlaceGentilicNncEnum(
        normalized,
        Object.values(PLACE_GENTILIC_NNC_PLACE_GROUP),
        PLACE_GENTILIC_NNC_PLACE_GROUP.unknown
    );
}

function normalizePlaceGentilicNncGentilicFormation(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        "tribal": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "nonlocative": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "two-clause": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        concatenate: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        "preterit-agentive": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.preteritAgentivePlace,
        "full-place": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace,
        "pan-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca,
        "ca-n-m-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca,
        "silent-replacement": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement,
        "te-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca,
        collectivity: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo,
        profession: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension,
        incorporation: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.incorporation,
    };
    return aliases[normalized] || normalizePlaceGentilicNncEnum(
        normalized,
        Object.values(PLACE_GENTILIC_NNC_GENTILIC_FORMATION),
        PLACE_GENTILIC_NNC_GENTILIC_FORMATION.unknown
    );
}

function normalizePlaceGentilicNncSubjectReference(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        unique: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "social": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "socially-designated": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        contextual: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        "context-chosen": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        locative: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
    };
    return aliases[normalized] || normalizePlaceGentilicNncEnum(
        normalized,
        Object.values(PLACE_GENTILIC_NNC_SUBJECT_REFERENCE),
        PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown
    );
}

function normalizePlaceGentilicNncState(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
    const aliases = {
        absolute: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutive: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutivo: PLACE_GENTILIC_NNC_STATE.absolutive,
        possessive: PLACE_GENTILIC_NNC_STATE.possessive,
        possessed: PLACE_GENTILIC_NNC_STATE.possessive,
        posesivo: PLACE_GENTILIC_NNC_STATE.possessive,
    };
    return aliases[normalized] || normalizePlaceGentilicNncEnum(
        normalized,
        Object.values(PLACE_GENTILIC_NNC_STATE),
        PLACE_GENTILIC_NNC_STATE.unknown
    );
}

function getPlaceGentilicNncPlaceMatrix(placeGroup = "") {
    const normalized = normalizePlaceGentilicNncPlaceGroup(placeGroup);
    const matrixByGroup = {
        [PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup]: "-n",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup]: "pan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup]: "co/c",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup]: "tlah",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup]: "tzalan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup]: "ti-tlan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup]: "chan",
    };
    return matrixByGroup[normalized] || "";
}

function getPlaceGentilicNncAntiConflationRules() {
    return Array.from(PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES);
}

function getPlaceGentilicNncStructuralQuestions() {
    return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS.map((question) => ({ ...question }));
}

function buildPlaceGentilicNncBoundaryMetadata() {
    return {
        kind: "place-gentilic-nnc-boundary",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        status: "partial",
        structuralSource: "Andrews Lesson 48",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getPlaceGentilicNncStructuralQuestions(),
        boundaries: {
            hasOrdinaryNncGeneration: true,
            hasRelationalNncBoundary: true,
            hasPlaceGentilicUsageFrame: true,
            hasPlaceNameNncGeneration: false,
            hasGentilicNncGeneration: false,
            hasStaticPlaceData: false,
            hasStaticGentilicData: false,
            hasConfirmedFixtureData: false,
            changesOrdinaryNncGeneration: false,
            changesRelationalNncGeneration: false,
            changesNominalizationGeneration: false,
            changesRouteBehavior: false,
            treatsPlaceTranslationsAsEvidence: false,
            treatsProfessionLabelsAsEvidence: false,
        },
        antiConflationRules: getPlaceGentilicNncAntiConflationRules(),
    };
}

function classifyPlaceGentilicNncCandidate({
    candidate = "",
    placeNameSource = "",
    gentilicSource = "",
    placeGentilicKind = "",
    associatedPlace = "",
    collectivity = "",
    evidenceSource = "",
    falsePositiveSource = "",
    sourceKind = "",
} = {}) {
    const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
    const normalizedFalsePositive = normalizePlaceGentilicNncFalsePositiveSource(falsePositiveSource);
    const hasEvidence = Boolean(String(evidenceSource || "").trim());
    return {
        kind: "place-gentilic-nnc-candidate-classification",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        confirmed: false,
        generationAllowed: false,
        diagnostics: [
            hasEvidence ? "place-gentilic-nnc-needs-validation" : "place-gentilic-nnc-needs-nawat-evidence",
            normalizedKind !== PLACE_GENTILIC_NNC_KIND.unknown
                ? "place-gentilic-nnc-kind-recognized"
                : "place-gentilic-nnc-kind-unconfirmed",
            normalizedFalsePositive !== PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown
                ? "place-gentilic-nnc-false-positive-source"
                : "place-gentilic-nnc-unconfirmed",
        ],
        boundary: buildPlaceGentilicNncBoundaryMetadata(),
    };
}

function classifyPlaceGentilicNncFalsePositive(source = "") {
    const normalizedSource = normalizePlaceGentilicNncFalsePositiveSource(source);
    return {
        kind: "place-gentilic-nnc-false-positive",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        source: normalizedSource,
        isPlaceNameNncEvidence: false,
        isGentilicNncEvidence: false,
        isCalendarNameEvidence: false,
        generationAllowed: false,
        diagnostics: ["place-gentilic-nnc-false-positive-source"],
        antiConflationRules: getPlaceGentilicNncAntiConflationRules(),
    };
}

function buildPlaceGentilicNncUsageFrame({
    candidate = "",
    placeNameSource = "",
    gentilicSource = "",
    placeGentilicKind = "",
    usage = "",
    placeGroup = "",
    gentilicFormation = "",
    subjectReference = "",
    state = "",
    associatedPlace = "",
    collectivity = "",
    headNounstem = "",
    matrixStem = "",
    embeddedStem = "",
    sourcePlaceName = "",
    evidenceSource = "",
    sourceKind = "",
    translationLabel = "",
} = {}) {
    const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
    const normalizedUsage = normalizePlaceGentilicNncUsage(usage);
    const normalizedPlaceGroup = normalizePlaceGentilicNncPlaceGroup(placeGroup);
    const normalizedFormation = normalizePlaceGentilicNncGentilicFormation(gentilicFormation);
    const normalizedState = normalizePlaceGentilicNncState(state);
    const normalizedSubjectReference = normalizePlaceGentilicNncSubjectReference(subjectReference)
        || PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown;
    const placeMatrix = String(matrixStem || getPlaceGentilicNncPlaceMatrix(normalizedPlaceGroup));
    const diagnostics = ["place-gentilic-nnc-usage-frame-non-generative"];
    let supported = true;

    if (
        normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName
        && normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen
    ) {
        supported = false;
        diagnostics.push("place-name-nnc-requires-unique-social-reference");
    }

    if (
        normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic
        && normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca
    ) {
        diagnostics.push("gentilic-pan-e-ca-distinct-from-associated-entity-pan-ca");
    }

    if (
        normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective
        || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo
    ) {
        diagnostics.push("gentilic-collectivity-yo-matrix");
    }

    if (String(translationLabel || "").trim()) {
        diagnostics.push("place-gentilic-nnc-translation-label-is-not-morphology");
    }

    const isProfession = normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation
        || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension;
    const isCollective = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective
        || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo;
    const allowedStates = isProfession || isCollective
        ? [PLACE_GENTILIC_NNC_STATE.absolutive, PLACE_GENTILIC_NNC_STATE.possessive]
        : [PLACE_GENTILIC_NNC_STATE.absolutive];
    if (
        normalizedState !== PLACE_GENTILIC_NNC_STATE.unknown
        && !allowedStates.includes(normalizedState)
    ) {
        supported = false;
        diagnostics.push("place-gentilic-nnc-state-not-allowed-for-kind");
    }

    const placeNameContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName
        ? {
            adverbializedSubjectPronoun: true,
            uniqueReferenceRequired: true,
            subjectReference: normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown
                ? PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial
                : normalizedSubjectReference,
            contextualLocativeContrast: "ordinary adverbialized locative NNC has context-chosen reference",
            topographicalFeatureIsPlaceName: false,
            topographicalFeatureMayEmbedInPlaceName: true,
            functions: [
                PLACE_GENTILIC_NNC_USAGE.ordinary,
                PLACE_GENTILIC_NNC_USAGE.adverbial,
                PLACE_GENTILIC_NNC_USAGE.adjectival,
            ],
        }
        : null;

    const gentilicContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic
        || normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective
        || normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation
        ? {
            semanticRole: isProfession
                ? "profession-associated-with-place"
                : isCollective
                    ? "collective-body-or-characteristic-of-people"
                    : "human-associated-with-place",
            formation: normalizedFormation,
            headNounstem: String(headNounstem || ""),
            clauseStructure: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate
                ? "place-name-adjoined-to-absolutive-head-nnc"
                : "",
            matrixStem: isCollective
                ? "yo"
                : normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace
                    || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca
                    || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca
                    || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement
                    || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca
                        ? "ca"
                        : String(matrixStem || ""),
            relationToAssociatedEntity: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca
                ? "gentilic pan-e-ca, not associated-entity pan-ca"
                : "",
            possessiveNum1Variants: isCollective ? ["zero", "uh"] : [],
            adjectivalUseAllowed: isCollective,
        }
        : null;

    return {
        kind: "place-gentilic-nnc-usage-frame",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        structuralSource: "Andrews Lesson 48",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        usage: normalizedUsage,
        placeGroup: normalizedPlaceGroup,
        placeMatrix,
        gentilicFormation: normalizedFormation,
        state: normalizedState,
        allowedStates,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        embeddedStem: String(embeddedStem || ""),
        sourcePlaceName: String(sourcePlaceName || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceKind: String(sourceKind || ""),
        placeNameContract,
        gentilicContract,
        supported,
        generationAllowed: false,
        generationContract: {
            frameGeneratesSurface: false,
            changesSurfaceForms: false,
            newWordGenerationAllowed: false,
        },
        translationWarning: {
            labelsAreMorphology: false,
            translationLabel: String(translationLabel || ""),
            warning: "place, profession, and gentilic labels are translation-only unless Nawat/Pipil morphology is evidenced",
        },
        diagnostics,
        boundary: buildPlaceGentilicNncBoundaryMetadata(),
    };
}
