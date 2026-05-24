function createDynamicProxy(targetObject, name, fallbackFactory = () => ({})) {
    return new Proxy({}, {
        get(_target, prop) {
            const source = targetObject[name] ?? fallbackFactory();
            const value = source?.[prop];
            return typeof value === "function" ? value.bind(source) : value;
        },
        has(_target, prop) {
            const source = targetObject[name] ?? fallbackFactory();
            return prop in source;
        },
        ownKeys() {
            const source = targetObject[name] ?? fallbackFactory();
            return Reflect.ownKeys(source);
        },
        getOwnPropertyDescriptor(_target, prop) {
            const source = targetObject[name] ?? fallbackFactory();
            const descriptor = Object.getOwnPropertyDescriptor(source, prop);
            if (descriptor) {
                return { ...descriptor, configurable: true };
            }
            if (prop in source) {
                return {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: source[prop],
                };
            }
            return undefined;
        },
    });
}

export function createAgreementApi(targetObject = globalThis) {
    const PASSIVE_IMPERSONAL_DIRECT_OBJECTS = createDynamicProxy(targetObject, "PASSIVE_IMPERSONAL_DIRECT_OBJECTS", () => (new Set()));
    const PASSIVE_IMPERSONAL_SUBJECT_MAP = createDynamicProxy(targetObject, "PASSIVE_IMPERSONAL_SUBJECT_MAP", () => ({}));
    const OBJECT_MARKERS = createDynamicProxy(targetObject, "OBJECT_MARKERS", () => (new Set()));
    const SPECIFIC_VALENCE_PREFIX_SET = createDynamicProxy(targetObject, "SPECIFIC_VALENCE_PREFIX_SET", () => (new Set()));
    const NONSPECIFIC_VALENCE_AFFIX_SET = createDynamicProxy(targetObject, "NONSPECIFIC_VALENCE_AFFIX_SET", () => (new Set()));
    const SPECIFIC_VALENCE_PREFIXES = createDynamicProxy(targetObject, "SPECIFIC_VALENCE_PREFIXES", () => ([]));
    const NONSPECIFIC_VALENCE_PREFIXES = createDynamicProxy(targetObject, "NONSPECIFIC_VALENCE_PREFIXES", () => ([]));
    const DERIVATION_TYPE = createDynamicProxy(targetObject, "DERIVATION_TYPE", () => ({}));
    const POSSESSIVE_TO_OBJECT_PREFIX = createDynamicProxy(targetObject, "POSSESSIVE_TO_OBJECT_PREFIX", () => ({}));
    const INVALID_COMBINATION_KEYS = createDynamicProxy(targetObject, "INVALID_COMBINATION_KEYS", () => (new Set()));
    const FULL_SOURCE_CHAIN_REALIZATION_POLICY = createDynamicProxy(targetObject, "FULL_SOURCE_CHAIN_REALIZATION_POLICY", () => ({}));
    const VOWEL_RE = createDynamicProxy(targetObject, "VOWEL_RE", () => (/a^/));
    const VOWEL_END_RE = createDynamicProxy(targetObject, "VOWEL_END_RE", () => (/a^/));
    const NOUN_OBJECT_SLOT_SCHEMA = createDynamicProxy(targetObject, "NOUN_OBJECT_SLOT_SCHEMA", () => ([]));
    const COMBINED_MODE = createDynamicProxy(targetObject, "COMBINED_MODE", () => ({}));

    const resolveComboValidationObjectPrefix = (...args) => targetObject.resolveComboValidationObjectPrefix(...args);
    const getComboKey = (...args) => targetObject.getComboKey(...args);
    const getObjectCategory = (...args) => targetObject.getObjectCategory(...args);
    const buildSupportivePrecedingSurfaceFromVerbMeta = (...args) => targetObject.buildSupportivePrecedingSurfaceFromVerbMeta(...args);
    const resolveOptionalSupportiveLetter = (...args) => targetObject.resolveOptionalSupportiveLetter(...args);
    const isPerfectiveTense = (...args) => targetObject.isPerfectiveTense(...args);
    const buildVerbDerivedNominalSourceModel = (...args) => targetObject.buildVerbDerivedNominalSourceModel(...args);
    const buildFullDerivationSourceChain = (...args) => targetObject.buildFullDerivationSourceChain(...args);
    const normalizeDerivationStemValue = (...args) => targetObject.normalizeDerivationStemValue(...args);
    const buildLiteralMorphStemSpec = (...args) => targetObject.buildLiteralMorphStemSpec(...args);
    const normalizeRuleBase = (...args) => targetObject.normalizeRuleBase(...args);
    const applySourceChainStemSpecByPolicy = (...args) => targetObject.applySourceChainStemSpecByPolicy(...args);
    const realizeMorphStemSpec = (...args) => targetObject.realizeMorphStemSpec(...args);
    const getSuppletiveStemSet = (...args) => targetObject.getSuppletiveStemSet(...args);
    const getForwardDerivationConfig = (...args) => targetObject.getForwardDerivationConfig(...args);
    const applySelectedForwardDerivation = (...args) => targetObject.applySelectedForwardDerivation(...args);
    const buildDerivationAvailabilityCoreOptions = (...args) => targetObject.buildDerivationAvailabilityCoreOptions(...args);
    const uniqueNonEmptyValues = (...args) => targetObject.uniqueNonEmptyValues(...args);
    const resolveDerivedStemList = (...args) => targetObject.resolveDerivedStemList(...args);
    const getUniqueMorphStemSpecs = (...args) => targetObject.getUniqueMorphStemSpecs(...args);
    const stripDirectionalPrefixFromStem = (...args) => targetObject.stripDirectionalPrefixFromStem(...args);
    const getNonactiveRuleBase = (...args) => targetObject.getNonactiveRuleBase(...args);
    const buildNominalFormEntry = (...args) => targetObject.buildNominalFormEntry(...args);
    const applyNonspecificObjectAllomorphy = (...args) => targetObject.applyNonspecificObjectAllomorphy(...args);
    const getInvalidVerbCharacters = (...args) => targetObject.getInvalidVerbCharacters(...args);
    const getInvalidVerbLetters = (...args) => targetObject.getInvalidVerbLetters(...args);
    const getInvalidVerbStructure = (...args) => targetObject.getInvalidVerbStructure(...args);
    const getNounObjectSlotPlansFromMeta = (...args) => targetObject.getNounObjectSlotPlansFromMeta(...args);
    const isNonactiveTransitiveVerb = (...args) => targetObject.isNonactiveTransitiveVerb(...args);
    const resolveDirectionalRuleMode = (...args) => targetObject.resolveDirectionalRuleMode(...args);
    const splitVerbLetters = (...args) => targetObject.splitVerbLetters(...args);
    const buildAppendMorphStemSpec = (...args) => targetObject.buildAppendMorphStemSpec(...args);
// === Person & Agreement ===
function getSubjectPersonInfo(subjectPrefix, subjectSuffix) {
    if (subjectPrefix === "ni" && subjectSuffix === "") {
        return { person: 1, number: "sg" };
    }
    if (subjectPrefix === "ti" && subjectSuffix === "") {
        return { person: 2, number: "sg" };
    }
    if (subjectPrefix === "ti" && subjectSuffix === "t") {
        return { person: 1, number: "pl" };
    }
    if (subjectPrefix === "an" && subjectSuffix === "t") {
        return { person: 2, number: "pl" };
    }
    if (subjectPrefix === "" && subjectSuffix === "") {
        return { person: 3, number: "sg" };
    }
    if (subjectPrefix === "" && subjectSuffix === "t") {
        return { person: 3, number: "pl" };
    }
    return null;
}

function getObjectPersonInfo(objectPrefix) {
    switch (objectPrefix) {
        case "nech":
            return { person: 1, number: "sg" };
        case "tech":
            return { person: 1, number: "pl" };
        case "metz":
            return { person: 2, number: "sg" };
        case "metzin":
            return { person: 2, number: "pl" };
        case "ki":
            return { person: 3, number: "sg" };
        case "kin":
            return { person: 3, number: "pl" };
        default:
            return null;
    }
}

function isSamePersonAcrossNumber(subjectPrefix, subjectSuffix, objectPrefix) {
    const subject = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const object = getObjectPersonInfo(objectPrefix);
    if (!subject || !object) {
        return false;
    }
    if (subject.person === 3 || object.person === 3) {
        return false;
    }
    return subject.person === object.person;
}

function isHierarchyOrderViolation(subjectPrefix, subjectSuffix, objectPrefix) {
    const subject = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const object = getObjectPersonInfo(objectPrefix);
    if (!subject || !object) {
        return false;
    }
    // 3rd-person subjects can combine with 1st/2nd-person objects.
    // Keep cross-number collision blocking in isSamePersonAcrossNumber().
    return false;
}

function isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix) {
    const subject = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const object = getObjectPersonInfo(objectPrefix);
    if (!subject || !object) {
        return false;
    }
    if (subject.person === 3) {
        return false;
    }
    return subject.person === object.person && subject.number === object.number;
}

// === Nonactive Derivation ===
function applyPassiveImpersonal({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    preserveSubject = false,
    allowObjectPrefix = false,
}) {
    const isTransitiveVerb = objectPrefix !== "";
    if (!isTransitiveVerb) {
        return preserveSubject
            ? { subjectPrefix, subjectSuffix, objectPrefix }
            : { subjectPrefix: "", subjectSuffix: "", objectPrefix };
    }
    if (PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix)) {
        if (preserveSubject) {
            return {
                subjectPrefix,
                subjectSuffix,
                objectPrefix: allowObjectPrefix ? objectPrefix : "",
            };
        }
        const mapped = PASSIVE_IMPERSONAL_SUBJECT_MAP[objectPrefix];
        return {
            subjectPrefix: mapped.subjectPrefix,
            subjectSuffix: mapped.subjectSuffix,
            objectPrefix: "",
        };
    }
    return preserveSubject
        ? { subjectPrefix, subjectSuffix, objectPrefix }
        : { subjectPrefix: "", subjectSuffix: "", objectPrefix };
}

function getPassiveSubjectOverride(prefix) {
    const mapped = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (mapped) {
        return mapped;
    }
    if (OBJECT_MARKERS.has(prefix)) {
        return { subjectPrefix: "", subjectSuffix: "" };
    }
    return null;
}

// === Prefix Selection ===
function applyIndirectObjectMarker(prefix, marker) {
    if (!marker) {
        return prefix;
    }
    let combined = "";
    if (SPECIFIC_VALENCE_PREFIX_SET.has(marker) || marker === "k") {
        if (!prefix) {
            combined = marker;
        } else if (SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
            combined = marker;
        } else {
            combined = `${prefix}${marker}`;
        }
    } else if (prefix === marker) {
        if (marker === "ta" || marker === "te") {
            combined = `${prefix}${marker}`;
        } else {
            combined = prefix;
        }
    } else {
        combined = `${prefix}${marker}`;
    }
    return normalizeValenceMarkerOrder(combined);
}

function parseProjectiveMarkerChain(value, inventory) {
    if (!value) {
        return false;
    }
    let remaining = value;
    while (remaining) {
        const token = inventory.find((item) => remaining.startsWith(item));
        if (!token) {
            return false;
        }
        remaining = remaining.slice(token.length);
    }
    return true;
}

function shortenProjectiveKiPrefix(prefix, subjectPrefix = "") {
    if (!prefix) {
        return prefix;
    }
    const nonspecificInventory = Array.from(NONSPECIFIC_VALENCE_AFFIX_SET)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
    const valenceMarkerInventory = Array.from(new Set([
        ...Array.from(SPECIFIC_VALENCE_PREFIX_SET || []),
        ...Array.from(NONSPECIFIC_VALENCE_AFFIX_SET || []),
        "k",
    ]))
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
    if (prefix.startsWith("ki") && prefix.length > 2 && ["ni", "ti"].includes(subjectPrefix)) {
        const tail = prefix.slice(2);
        const isNonspecificMarkerChain = parseProjectiveMarkerChain(tail, nonspecificInventory);
        const isValenceMarkerChain = parseProjectiveMarkerChain(tail, valenceMarkerInventory);
        if (isNonspecificMarkerChain || isValenceMarkerChain) {
            return `k${tail}`;
        }
    }
    if (prefix.endsWith("ki") && prefix.length > 2) {
        const leading = prefix.slice(0, -2);
        if (isNonspecificProjectivePrefix(leading)) {
            return prefix;
        }
        return `${prefix.slice(0, -2)}k`;
    }
    if (prefix === "ki" && ["ni", "ti"].includes(subjectPrefix)) {
        return "k";
    }
    return prefix;
}

function composeProjectiveObjectPrefix({
    objectPrefix = "",
    markers = [],
    subjectPrefix = "",
}) {
    let combined = objectPrefix || "";
    const markerChain = Array.isArray(markers) ? markers : [];
    markerChain
        .filter(Boolean)
        .forEach((marker) => {
            combined = applyIndirectObjectMarker(combined, marker);
        });
    return shortenProjectiveKiPrefix(combined, subjectPrefix);
}

function isSpecificProjectivePrefix(prefix) {
    return SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k";
}

function isNonspecificProjectivePrefix(prefix) {
    return NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
}

function getProjectiveHierarchyRank(prefix) {
    if (!prefix) {
        return 99;
    }
    if (isSpecificProjectivePrefix(prefix)) {
        return 0;
    }
    if (prefix === "mu") {
        return 1;
    }
    if (prefix === "te") {
        return 2;
    }
    if (prefix === "ta") {
        return 3;
    }
    if (NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return 4;
    }
    return 5;
}

function normalizeValenceMarkerOrder(prefix) {
    if (!prefix) {
        return prefix;
    }
    const full = prefix;
    let directional = "";
    let rest = prefix;
    if (rest.startsWith("al") && rest !== "al") {
        directional = "al";
        rest = rest.slice(2);
    }
    const markerInventory = Array.from(new Set([
        ...SPECIFIC_VALENCE_PREFIXES,
        ...NONSPECIFIC_VALENCE_PREFIXES,
        "k",
    ])).sort((a, b) => b.length - a.length);
    const tokenEntries = [];
    let working = rest;
    let tokenIndex = 0;
    while (working) {
        const match = markerInventory.find((token) => working.startsWith(token));
        if (!match) {
            return full;
        }
        tokenEntries.push({ token: match, index: tokenIndex });
        tokenIndex += 1;
        working = working.slice(match.length);
    }
    if (tokenEntries.length <= 1) {
        return full;
    }
    tokenEntries.sort((a, b) => {
        const rankDiff = getProjectiveHierarchyRank(a.token) - getProjectiveHierarchyRank(b.token);
        if (rankDiff !== 0) {
            return rankDiff;
        }
        return a.index - b.index;
    });
    return `${directional}${tokenEntries.map((entry) => entry.token).join("")}`;
}

function reorderProjectivePairByHierarchy(objectPrefix, indirectObjectMarker) {
    if (!objectPrefix || !indirectObjectMarker) {
        return { objectPrefix, indirectObjectMarker };
    }
    const objectRank = getProjectiveHierarchyRank(objectPrefix);
    const indirectRank = getProjectiveHierarchyRank(indirectObjectMarker);
    if (indirectRank < objectRank) {
        return {
            objectPrefix: indirectObjectMarker,
            indirectObjectMarker: objectPrefix,
        };
    }
    return { objectPrefix, indirectObjectMarker };
}

function resolveValencePositionPrefixes({
    objectPrefix,
    indirectObjectMarker,
    derivationType,
}) {
    if (!indirectObjectMarker) {
        return { objectPrefix, indirectObjectMarker };
    }
    ({
        objectPrefix,
        indirectObjectMarker,
    } = reorderProjectivePairByHierarchy(objectPrefix, indirectObjectMarker));
    if (derivationType === DERIVATION_TYPE.direct) {
        return { objectPrefix, indirectObjectMarker };
    }
    const isApplicative = derivationType === DERIVATION_TYPE.applicative;
    const allowSpecificWithNonspecific = isApplicative || derivationType === DERIVATION_TYPE.causative;
    if (allowSpecificWithNonspecific && indirectObjectMarker === "mu") {
        return { objectPrefix, indirectObjectMarker };
    }
    const isSpecific = (prefix) => SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k";
    const isNonspecific = (prefix) => NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
    const isReflexive = (prefix) => prefix === "mu";
    const keepReflexiveIndirect = allowSpecificWithNonspecific && indirectObjectMarker === "mu";
    if (isApplicative) {
        if (isSpecific(indirectObjectMarker) || isReflexive(indirectObjectMarker)) {
            if (keepReflexiveIndirect) {
                return { objectPrefix, indirectObjectMarker };
            }
            if (allowSpecificWithNonspecific && isNonspecific(objectPrefix)) {
                return { objectPrefix, indirectObjectMarker };
            }
            indirectObjectMarker = "";
        }
        return { objectPrefix, indirectObjectMarker };
    }
    if (isSpecific(indirectObjectMarker)) {
        if (isSpecific(objectPrefix) || isReflexive(objectPrefix)) {
            objectPrefix = "";
        }
        return { objectPrefix, indirectObjectMarker };
    }
    if (isReflexive(indirectObjectMarker)) {
        if (keepReflexiveIndirect) {
            return { objectPrefix, indirectObjectMarker };
        }
        objectPrefix = "";
        return { objectPrefix, indirectObjectMarker };
    }
    if (isSpecific(objectPrefix) || isReflexive(objectPrefix)) {
        if (allowSpecificWithNonspecific && isNonspecific(indirectObjectMarker)) {
            return { objectPrefix, indirectObjectMarker };
        }
        objectPrefix = "";
    }
    return { objectPrefix, indirectObjectMarker };
}

function resolveDisplayValencePrefixes({
    objectPrefix,
    indirectObjectMarker,
    derivationType,
}) {
    let nextObjectPrefix = objectPrefix || "";
    let nextIndirectObjectMarker = indirectObjectMarker || "";
    if (
        (derivationType === DERIVATION_TYPE.applicative
            || derivationType === DERIVATION_TYPE.causative)
        && nextIndirectObjectMarker
    ) {
        const isSpecific = (prefix) =>
            isSpecificProjectivePrefix(prefix) || prefix === "mu";
        const indirectIsSpecific = isSpecific(nextIndirectObjectMarker);
        const shouldSwap = !nextObjectPrefix && indirectIsSpecific;
        if (shouldSwap) {
            const rightmostObject = nextIndirectObjectMarker;
            nextIndirectObjectMarker = nextObjectPrefix || "";
            nextObjectPrefix = rightmostObject;
        }
    }
    return resolveValencePositionPrefixes({
        objectPrefix: nextObjectPrefix,
        indirectObjectMarker: nextIndirectObjectMarker,
        derivationType,
    });
}

function getPossessivePrefixForSubject(subjectPrefix, subjectSuffix) {
    const key = `${subjectPrefix}|${subjectSuffix}`;
    switch (key) {
        case "ni|":
            return "nu";
        case "ti|":
            return "mu";
        case "|":
            return "i";
        case "ti|t":
            return "tu";
        case "an|t":
            return "anmu";
        case "|t":
            return "in";
        default:
            return "";
    }
}

function getPossessivePersonInfo(possessivePrefix) {
    if (!possessivePrefix) {
        return null;
    }
    const objectEquivalent = POSSESSIVE_TO_OBJECT_PREFIX[possessivePrefix] || "";
    if (!objectEquivalent) {
        return null;
    }
    return getObjectPersonInfo(objectEquivalent);
}

function isSameSubjectPossessor(subjectPrefix, subjectSuffix, possessivePrefix) {
    if (!possessivePrefix) {
        return false;
    }
    const subjectInfo = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const possessorInfo = getPossessivePersonInfo(possessivePrefix);
    if (subjectInfo && possessorInfo) {
        if (subjectInfo.person === 3 && possessorInfo.person === 3) {
            return false;
        }
        return subjectInfo.person === possessorInfo.person;
    }
    const expectedPossessivePrefix = getPossessivePrefixForSubject(subjectPrefix, subjectSuffix);
    return Boolean(expectedPossessivePrefix && expectedPossessivePrefix === possessivePrefix);
}

function isNonanimateSubject(subjectPrefix, subjectSuffix) {
    return subjectPrefix === "" && subjectSuffix === "";
}

var CONJUGATION_AVAILABILITY_STATE = Object.freeze({
    viable: "viable",
    masked: "masked",
    impossible: "impossible",
});

var CONJUGATION_DIAGNOSTIC_IDS = Object.freeze({
    resultError: "result-error",
    reflexiveHidden: "reflexive-hidden",
    invalidCombo: "invalid-combo",
    personAgreement: "person-agreement",
    hierarchyOrder: "hierarchy-order",
    subjectPossessorCollision: "subject-possessor-collision",
    valence4Matrix: "valence4-matrix",
});

function buildConjugationDiagnosticEntry(id = "", severity = "masked", options = {}) {
    return {
        id: String(id || ""),
        severity: severity || "masked",
        source: options.source || "",
        masked: options.masked !== false,
    };
}

function dedupeConjugationDiagnosticEntries(entries = []) {
    const seen = new Set();
    return (Array.isArray(entries) ? entries : [])
        .filter((entry) => entry && entry.id)
        .filter((entry) => {
            const key = `${entry.id}|${entry.severity || ""}|${entry.source || ""}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
}

function resolveConjugationAvailabilityState({
    hasRenderableResult = false,
    shouldMaskRow = false,
}) {
    if (!hasRenderableResult) {
        return CONJUGATION_AVAILABILITY_STATE.impossible;
    }
    if (shouldMaskRow) {
        return CONJUGATION_AVAILABILITY_STATE.masked;
    }
    return CONJUGATION_AVAILABILITY_STATE.viable;
}

function createToggleAvailabilityRealizationSummary() {
    return {
        combinationCount: 0,
        viableCount: 0,
        maskedCount: 0,
        impossibleCount: 0,
    };
}

function recordToggleAvailabilityRealization(summary = null, evaluation = null) {
    const target = summary && typeof summary === "object"
        ? summary
        : createToggleAvailabilityRealizationSummary();
    const availabilityState = evaluation?.availabilityState || CONJUGATION_AVAILABILITY_STATE.impossible;
    target.combinationCount += 1;
    if (availabilityState === CONJUGATION_AVAILABILITY_STATE.viable) {
        target.viableCount += 1;
    } else if (availabilityState === CONJUGATION_AVAILABILITY_STATE.masked) {
        target.maskedCount += 1;
    } else {
        target.impossibleCount += 1;
    }
    return target;
}

function realizeToggleAvailabilitySummary(summary = null) {
    const resolved = summary && typeof summary === "object"
        ? summary
        : createToggleAvailabilityRealizationSummary();
    const hasAnyCombination = resolved.combinationCount > 0;
    const availabilityState = !hasAnyCombination
        ? CONJUGATION_AVAILABILITY_STATE.impossible
        : (resolved.viableCount > 0
            ? CONJUGATION_AVAILABILITY_STATE.viable
            : (resolved.maskedCount > 0
                ? CONJUGATION_AVAILABILITY_STATE.masked
                : CONJUGATION_AVAILABILITY_STATE.impossible));
    return {
        ...resolved,
        hasAnyCombination,
        availabilityState,
    };
}

function buildConjugationEvaluationRecord({
    result = null,
    maskState = null,
    grammarConstraintState = null,
    hasValenceStructureError = false,
    extraDiagnostics = [],
} = {}) {
    const resolvedMaskState = maskState && typeof maskState === "object"
        ? maskState
        : {};
    const diagnostics = [
        ...(Array.isArray(resolvedMaskState.diagnostics) ? resolvedMaskState.diagnostics : []),
        ...(Array.isArray(extraDiagnostics) ? extraDiagnostics : []),
    ];
    const maskedConstraintIds = Array.isArray(grammarConstraintState?.maskedConstraintIds)
        ? grammarConstraintState.maskedConstraintIds
        : [];
    maskedConstraintIds.forEach((constraintId) => {
        diagnostics.push(buildConjugationDiagnosticEntry(constraintId, "masked", {
            source: "grammar-constraint",
        }));
    });
    if (hasValenceStructureError) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.valence4Matrix,
            "error",
            { source: "grammar-constraint" }
        ));
    }
    const dedupedDiagnostics = dedupeConjugationDiagnosticEntries(diagnostics);
    const hasRenderableResult = resolvedMaskState.hasRenderableResult === true
        || !!(result && result.result && result.result !== "—");
    const shouldMaskRow = !!(
        resolvedMaskState.shouldMask
        || grammarConstraintState?.shouldMask
        || hasValenceStructureError
    );
    const isErrorRow = !!(
        resolvedMaskState.isError
        || grammarConstraintState?.shouldMask
        || hasValenceStructureError
    );
    return {
        result: result || resolvedMaskState.result || {},
        shouldMaskRow,
        isErrorRow,
        hasRenderableResult,
        hasVisibleResult: hasRenderableResult && !shouldMaskRow,
        availabilityState: resolveConjugationAvailabilityState({
            hasRenderableResult,
            shouldMaskRow,
        }),
        diagnostics: dedupedDiagnostics,
        diagnosticIds: dedupedDiagnostics.map((entry) => entry.id),
        maskedConstraintIds,
    };
}

function applyConjugationEvaluationPresentation({
    row = null,
    value = null,
    evaluation = null,
    formattedValue = "",
}) {
    const availabilityState = evaluation?.availabilityState || CONJUGATION_AVAILABILITY_STATE.impossible;
    const diagnosticIds = Array.isArray(evaluation?.diagnosticIds) ? evaluation.diagnosticIds : [];
    if (row) {
        row.dataset.availabilityState = availabilityState;
        row.dataset.diagnosticState = availabilityState;
        row.dataset.diagnosticIds = diagnosticIds.join(",");
    }
    if (!value) {
        return;
    }
    value.classList.remove("conjugation-error", "conjugation-reflexive");
    value.dataset.availabilityState = availabilityState;
    value.dataset.diagnosticState = availabilityState;
    value.dataset.diagnosticIds = diagnosticIds.join(",");
    if (evaluation?.shouldMaskRow) {
        value.textContent = "—";
        if (evaluation.isErrorRow) {
            value.classList.add("conjugation-error");
        }
        return;
    }
    value.textContent = formattedValue;
    if (evaluation?.result?.isReflexive) {
        value.classList.add("conjugation-reflexive");
    }
}

function getConjugationMaskState({
    result,
    subjectPrefix,
    subjectSuffix,
    objectPrefix = "",
    possessivePrefix = "",
    comboObjectPrefix,
    derivationType = "",
    indirectObjectMarker = "",
    controllerObjectMarker = null,
    requireDistinctPossessor = false,
    enforceInvalidCombo = true,
    invalidComboSet = INVALID_COMBINATION_KEYS,
}) {
    const hasExplicitComboObjectPrefix = (
        comboObjectPrefix !== undefined
        && comboObjectPrefix !== null
        && comboObjectPrefix !== ""
    );
    const effectiveObjectPrefix = hasExplicitComboObjectPrefix
        ? comboObjectPrefix
        : resolveComboValidationObjectPrefix({
            objectPrefix,
            indirectObjectMarker,
            derivationType,
            controllerObjectMarker,
        });
    const invalidCombo = enforceInvalidCombo && invalidComboSet.has(
        getComboKey(subjectPrefix, effectiveObjectPrefix, subjectSuffix)
    );
    const constraintViolations = computeConstraintViolationsCore({
        subjectPrefix,
        subjectSuffix,
        controllerPrefix: effectiveObjectPrefix,
        shouldApplyPersonAgreement: true,
    });
    const samePerson = constraintViolations.personAgreementViolation;
    const hierarchyOrderViolation = constraintViolations.hierarchyOrderViolation;
    const subjectPossessorCollision = requireDistinctPossessor
        && isSameSubjectPossessor(subjectPrefix, subjectSuffix, possessivePrefix);
    const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
    const shouldMask = !!(
        result?.error
        || hideReflexive
        || invalidCombo
        || samePerson
        || hierarchyOrderViolation
        || subjectPossessorCollision
    );
    const isError = !!(
        result?.error
        || invalidCombo
        || samePerson
        || hierarchyOrderViolation
        || subjectPossessorCollision
    );
    const diagnostics = [];
    if (result?.error) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.resultError,
            "error",
            { source: "result" }
        ));
    }
    if (hideReflexive) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden,
            "masked",
            { source: "result" }
        ));
    }
    if (invalidCombo) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.invalidCombo,
            "error",
            { source: "grammar-constraint" }
        ));
    }
    if (samePerson) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.personAgreement,
            "error",
            { source: "grammar-constraint" }
        ));
    }
    if (hierarchyOrderViolation) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.hierarchyOrder,
            "error",
            { source: "grammar-constraint" }
        ));
    }
    if (subjectPossessorCollision) {
        diagnostics.push(buildConjugationDiagnosticEntry(
            CONJUGATION_DIAGNOSTIC_IDS.subjectPossessorCollision,
            "error",
            { source: "grammar-constraint" }
        ));
    }
    const hasRenderableResult = !!(result && result.result && result.result !== "—");
    const dedupedDiagnostics = dedupeConjugationDiagnosticEntries(diagnostics);
    return {
        shouldMask,
        isError,
        invalidCombo,
        samePerson,
        hierarchyOrderViolation,
        subjectPossessorCollision,
        hideReflexive,
        hasRenderableResult,
        hasVisibleResult: hasRenderableResult && !shouldMask,
        availabilityState: resolveConjugationAvailabilityState({
            hasRenderableResult,
            shouldMaskRow: shouldMask,
        }),
        diagnostics: dedupedDiagnostics,
        diagnosticIds: dedupedDiagnostics.map((entry) => entry.id),
    };
}

function getLocativoTemporalMaskState({
    result,
    objectPrefix = "",
}) {
    return getConjugationMaskState({
        result,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix,
        controllerObjectMarker: "",
        enforceInvalidCombo: false,
    });
}

function resolveHasNonspecificValence(meta) {
    return Boolean(meta?.hasNonspecificValence || meta?.hasNonactiveNonspecificValence);
}

function buildMorphologyMetaOptions(meta, overrides = {}) {
    return {
        hasSlashMarker: meta?.hasSlashMarker,
        hasSuffixSeparator: meta?.hasSuffixSeparator,
        hasLeadingDash: meta?.hasLeadingDash,
        hasBoundMarker: meta?.hasBoundMarker,
        hasCompoundMarker: meta?.hasCompoundMarker,
        hasImpersonalTaPrefix: meta?.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        isTaFusion: meta?.isTaFusion,
        indirectObjectMarker: meta?.indirectObjectMarker,
        isUnderlyingTransitive: meta?.isMarkedTransitive || meta?.isTaFusion,
        sourcePrefix: meta?.sourcePrefix || meta?.canonical?.sourcePrefix || "",
        sourceBase: meta?.sourceBase || meta?.canonicalRuleBase || meta?.canonical?.sourceBase || "",
        rootPlusYaBase: meta?.rootPlusYaBase,
        rootPlusYaBasePronounceable: meta?.rootPlusYaBasePronounceable,
        ...overrides,
    };
}

function buildObjectAllomorphyMetaOptions(meta, overrides = {}) {
    return {
        isTaFusion: meta?.isTaFusion,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        supportivePrecedingSurface: buildSupportivePrecedingSurfaceFromVerbMeta(
            meta,
            meta?.sourceRawVerb || meta?.verb || "",
            meta?.analysisVerb || meta?.verb || ""
        ),
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        hasSlashMarker: meta?.hasSlashMarker,
        hasBoundMarker: meta?.hasBoundMarker,
        directionalPrefix: meta?.directionalPrefix,
        ...overrides,
    };
}

function buildNonspecificAllomorphyOptions(meta, overrides = {}) {
    return {
        indirectObjectMarker: meta?.indirectObjectMarker,
        isTaFusion: meta?.isTaFusion,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        supportivePrecedingSurface: buildSupportivePrecedingSurfaceFromVerbMeta(
            meta,
            meta?.sourceRawVerb || meta?.verb || "",
            meta?.analysisVerb || meta?.verb || ""
        ),
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        hasSlashMarker: meta?.hasSlashMarker,
        hasBoundMarker: meta?.hasBoundMarker,
        directionalPrefix: meta?.directionalPrefix,
        ...overrides,
    };
}

function shouldDelaySlashSupportiveIAllomorphyForPret({
    parsedVerb = null,
    tense = "",
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
} = {}) {
    if (!parsedVerb?.hasSlashMarker || !parsedVerb?.hasBoundMarker || !parsedVerb?.hasOptionalSupportiveI) {
        return false;
    }
    const supportiveLetter = resolveOptionalSupportiveLetter(
        parsedVerb.optionalSupportiveLetter,
        parsedVerb.analysisVerb || parsedVerb.verb || "",
    );
    if (supportiveLetter !== "i") {
        return false;
    }
    const isPretLikeTense = isPerfectiveTense(tense);
    if (!isPretLikeTense) {
        return false;
    }
    return (
        NONSPECIFIC_VALENCE_AFFIX_SET.has(objectPrefix)
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(indirectObjectMarker)
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(thirdObjectMarker)
        || resolveHasNonspecificValence(parsedVerb)
    );
}

function applyNounForwardDerivation({
    verbMeta = null,
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
}) {
    const nounSourceModel = buildVerbDerivedNominalSourceModel({
        ...(verbMeta && typeof verbMeta === "object" ? verbMeta : {}),
        sourceRawVerb: verbMeta?.sourceRawVerb || verb,
        verb,
        analysisVerb,
        objectPrefix,
    });
    const directSourceChain = buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
    const directBaseVerb = normalizeDerivationStemValue(
        directSourceChain?.baseVerb || analysisVerb || verb || ""
    );
    const directBaseStemSpec = directBaseVerb
        ? buildLiteralMorphStemSpec(directBaseVerb, {
            sourceBase: normalizeRuleBase(directSourceChain?.sourceBase || directBaseVerb),
        })
        : null;
    const directStemSpec = directBaseStemSpec
        ? applySourceChainStemSpecByPolicy(directBaseStemSpec, directBaseVerb, directSourceChain, {
            policy: FULL_SOURCE_CHAIN_REALIZATION_POLICY,
        })
        : null;
    const directStem = realizeMorphStemSpec(directStemSpec, verb || "");
    const directAnalysisVerb = directStem || directBaseVerb || analysisVerb || verb;
    const suppletiveStemSet = getSuppletiveStemSet(verbMeta);
    const directionalPrefix = verbMeta?.directionalPrefix || "";
    const derivationType = Object.values(DERIVATION_TYPE).includes(verbMeta?.derivationType)
        ? verbMeta.derivationType
        : DERIVATION_TYPE.direct;
    const buildStructuredTarget = ({
        verb: targetVerb = "",
        analysisVerb: targetAnalysisVerb = "",
        stemSpec = null,
        provenance = null,
    } = {}) => ({
        verb: targetVerb,
        analysisVerb: targetAnalysisVerb || targetVerb,
        stemSpec: (
            stemSpec
            && typeof stemSpec === "object"
            && stemSpec.kind
        ) ? stemSpec : buildLiteralMorphStemSpec(targetVerb),
        sourceModel: nounSourceModel,
        runtimeObjectPrefix: String(objectPrefix || ""),
        derivationProvenance: provenance || null,
    });
    const fallbackTargets = [buildStructuredTarget({
        verb: directStem || verb,
        analysisVerb: directAnalysisVerb,
        stemSpec: directStemSpec || buildLiteralMorphStemSpec(directStem || verb),
        provenance: {
            derivationType,
            mode: "direct",
        },
    })];
    const fallback = {
        blocked: false,
        verb: directStem || verb,
        analysisVerb: directAnalysisVerb,
        isYawi: verbMeta?.isYawi === true,
        isWeya: verbMeta?.isWeya === true,
        suppletiveStemSet,
        sourceModel: nounSourceModel,
        targets: fallbackTargets,
        stemTargets: fallbackTargets,
    };
    const forwardConfig = getForwardDerivationConfig(derivationType);
    if (!forwardConfig) {
        return fallback;
    }
    const forwardDerivation = applySelectedForwardDerivation({
        derivationType,
        derivationOptions: buildDerivationAvailabilityCoreOptions({
            verb,
            analysisVerb,
            objectPrefix,
            verbMeta,
            suppletiveStemSet,
        }),
        enabled: true,
    });
    if (forwardDerivation.blocked) {
        return {
            ...fallback,
            blocked: true,
        };
    }
    const derivedVerb = forwardDerivation.verb || fallback.verb;
    const derivedAnalysisVerb = forwardDerivation.analysisVerb || fallback.analysisVerb;
    const derivedStemList = uniqueNonEmptyValues(resolveDerivedStemList(
        forwardDerivation[forwardConfig.resultField],
        derivedVerb,
    ));
    const derivedStemSpecs = Array.isArray(forwardDerivation[forwardConfig.resultSpecField])
        ? getUniqueMorphStemSpecs(forwardDerivation[forwardConfig.resultSpecField])
        : [];
    const targets = derivedStemList.length
        ? derivedStemList.map((stem, index) => buildStructuredTarget({
            verb: stem,
            analysisVerb: stripDirectionalPrefixFromStem(stem, directionalPrefix),
            stemSpec: derivedStemSpecs[index] || buildLiteralMorphStemSpec(stem),
            provenance: {
                derivationType,
                mode: "forward",
                configId: forwardConfig.id || "",
                sourceField: forwardConfig.resultField || "",
            },
        }))
        : [buildStructuredTarget({
            verb: derivedVerb,
            analysisVerb: derivedAnalysisVerb || derivedVerb,
            stemSpec: derivedStemSpecs[0] || buildLiteralMorphStemSpec(derivedVerb),
            provenance: {
                derivationType,
                mode: "forward",
                configId: forwardConfig.id || "",
                sourceField: forwardConfig.resultField || "",
            },
        })];
    return {
        blocked: false,
        verb: derivedVerb,
        analysisVerb: derivedAnalysisVerb,
        isYawi: forwardDerivation.isYawi ?? fallback.isYawi,
        isWeya: false,
        suppletiveStemSet: forwardDerivation.suppletiveStemSet ?? suppletiveStemSet,
        sourceModel: nounSourceModel,
        targets,
        stemTargets: targets,
    };
}

function getNounNonactiveRuleBase(baseVerb = "", verbMeta = null) {
    const derivationType = Object.values(DERIVATION_TYPE).includes(verbMeta?.derivationType)
        ? verbMeta.derivationType
        : DERIVATION_TYPE.direct;
    if (getForwardDerivationConfig(derivationType)) {
        return normalizeRuleBase(baseVerb || "");
    }
    return getNonactiveRuleBase(baseVerb, verbMeta);
}

function getNounForwardStemTargets(nounForwardDerivation, fallbackVerb = "", fallbackAnalysisVerb = "") {
    const stemTargets = Array.isArray(nounForwardDerivation?.targets)
        ? nounForwardDerivation.targets.filter((entry) => entry && entry.verb)
        : (
            Array.isArray(nounForwardDerivation?.stemTargets)
                ? nounForwardDerivation.stemTargets.filter((entry) => entry && entry.verb)
                : []
        );
    if (stemTargets.length) {
        return stemTargets;
    }
    if (!fallbackVerb) {
        return [];
    }
    return [buildNominalFormEntry(fallbackVerb, "", {
        analysisVerb: fallbackAnalysisVerb || fallbackVerb,
        sourceModel: nounForwardDerivation?.sourceModel || null,
    })].map((entry) => ({
        verb: entry.verb,
        analysisVerb: entry.analysisVerb || fallbackAnalysisVerb || fallbackVerb,
        stemSpec: buildLiteralMorphStemSpec(entry.verb),
        sourceModel: nounForwardDerivation?.sourceModel || null,
        runtimeObjectPrefix: "",
        derivationProvenance: null,
    }));
}

function buildNounForwardStemContexts({
    stemTargets = [],
    objectPrefix = "",
    verbMeta = null,
    indirectObjectMarker = "",
    thirdObjectMarker = "",
}) {
    return (Array.isArray(stemTargets) ? stemTargets : []).map((stemTarget) => {
        const targetVerb = stemTarget?.verb || "";
        const targetAnalysisVerb = stemTarget?.analysisVerb || targetVerb;
        const targetStemSpec = (
            stemTarget?.stemSpec
            && typeof stemTarget.stemSpec === "object"
            && stemTarget.stemSpec.kind
        ) ? stemTarget.stemSpec : buildLiteralMorphStemSpec(targetVerb);
        if (!targetVerb) {
            return null;
        }
        const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
            verb: targetVerb,
            analysisVerb: targetAnalysisVerb,
            objectPrefix,
            ...buildNonspecificAllomorphyOptions(verbMeta),
            indirectObjectMarker,
            thirdObjectMarker,
        });
        return {
            verb: nonspecificAllomorphy.verb || targetVerb,
            analysisVerb: nonspecificAllomorphy.analysisVerb || targetAnalysisVerb,
            morphologyObjectPrefix: nonspecificAllomorphy.objectPrefix || objectPrefix,
            runtimeObjectPrefix: stemTarget?.runtimeObjectPrefix || objectPrefix,
            stemSpec: (
                (nonspecificAllomorphy.verb || targetVerb) === targetVerb
            ) ? targetStemSpec : buildLiteralMorphStemSpec(nonspecificAllomorphy.verb || targetVerb),
            sourceModel: stemTarget?.sourceModel || null,
            derivationProvenance: stemTarget?.derivationProvenance || null,
        };
    }).filter((entry) => entry && entry.verb);
}

function buildVerbDerivedNominalBuilderContext({
    kind = "",
    rawVerb = "",
    verbMeta = null,
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    combinedMode = "",
    requireNonanimateSubject = false,
} = {}) {
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return { error: true };
    }
    let verb = String(verbMeta?.verb || "");
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (requireNonanimateSubject && !isNonanimateSubject(subjectPrefix, subjectSuffix)) {
        return { error: true };
    }
    let resolvedObjectPrefix = String(objectPrefix || "");
    let resolvedIndirectObjectMarker = String(indirectObjectMarker || "");
    let resolvedThirdObjectMarker = String(thirdObjectMarker || "");
    if (verbMeta?.hasImpersonalTaPrefix) {
        resolvedObjectPrefix = "";
        resolvedIndirectObjectMarker = "";
        resolvedThirdObjectMarker = "";
    }
    const analysisVerb = verbMeta?.analysisVerb || verb;
    const slotOptions = combinedMode ? { combinedMode } : {};
    const slotPlanBundle = getNounObjectSlotPlansFromMeta(verbMeta, kind, slotOptions);
    const selectedBySlot = {
        object: resolvedObjectPrefix,
        object2: resolvedIndirectObjectMarker,
        object3: resolvedThirdObjectMarker,
    };
    const hasOverflowedSlotSelection = NOUN_OBJECT_SLOT_SCHEMA
        .slice(slotPlanBundle.slotPlans.length)
        .some((slotMeta) => Boolean(selectedBySlot[slotMeta.id]));
    const hasInvalidSlotSelection = slotPlanBundle.slotPlans.some((slotPlan) => (
        !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || "")
    ));
    if (hasOverflowedSlotSelection || hasInvalidSlotSelection) {
        return { error: true };
    }
    const nounSourceModel = buildVerbDerivedNominalSourceModel({
        ...(verbMeta && typeof verbMeta === "object" ? verbMeta : {}),
        sourceRawVerb: rawVerb,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        combinedMode,
    }, kind);
    const nounForwardDerivation = applyNounForwardDerivation({
        verbMeta,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix,
    });
    if (nounForwardDerivation.blocked) {
        return { error: true };
    }
    const forwardStemTargets = getNounForwardStemTargets(nounForwardDerivation, verb, analysisVerb);
    const forwardStemContexts = buildNounForwardStemContexts({
        stemTargets: forwardStemTargets,
        objectPrefix: resolvedObjectPrefix,
        verbMeta,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
    });
    if (!forwardStemContexts.length) {
        return { error: true };
    }
    return {
        error: false,
        rawVerb,
        verbMeta,
        verb,
        analysisVerb,
        directionalPrefix: verbMeta?.directionalPrefix || "",
        nounSourceModel,
        nounForwardDerivation,
        forwardStemTargets,
        forwardStemContexts,
        derivedIsYawi: nounForwardDerivation.isYawi,
        derivedIsWeya: nounForwardDerivation.isWeya,
        derivationIsTransitive: isNonactiveTransitiveVerb(
            resolvedObjectPrefix || resolvedIndirectObjectMarker || resolvedThirdObjectMarker,
            verbMeta
        ),
        resolvedDirectionalRuleMode: resolveDirectionalRuleMode(
            verbMeta,
            combinedMode === COMBINED_MODE.nonactive ? { isNonactive: true } : {}
        ),
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        combinedMode,
    };
}

function collapseCalificativoMarkerEcho({
    form = "",
    morphologyObjectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    enable = false,
}) {
    const sourceForm = String(form || "");
    if (!enable || !sourceForm) {
        return sourceForm;
    }
    const markerValues = [indirectObjectMarker || "", thirdObjectMarker || ""].filter(Boolean);
    if (!markerValues.length) {
        return sourceForm;
    }
    const echoMarker = markerValues[markerValues.length - 1] || "";
    if (!echoMarker || !NONSPECIFIC_VALENCE_AFFIX_SET.has(echoMarker)) {
        return sourceForm;
    }
    const markerChain = composeProjectiveObjectPrefix({
        objectPrefix: morphologyObjectPrefix || "",
        markers: markerValues,
        subjectPrefix: "",
    });
    if (!markerChain) {
        return sourceForm;
    }
    const duplicatedPrefix = `${markerChain}${echoMarker}`;
    if (!sourceForm.startsWith(duplicatedPrefix)) {
        return sourceForm;
    }
    return `${markerChain}${sourceForm.slice(duplicatedPrefix.length)}`;
}

function buildCalificativoInstrumentivoPredicateStemSpec(stemSpec = null, fallbackStem = "") {
    const resolvedBaseSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : buildLiteralMorphStemSpec(fallbackStem);
    const realizedBaseStem = realizeMorphStemSpec(resolvedBaseSpec, fallbackStem);
    const baseLetters = splitVerbLetters(realizedBaseStem);
    if ((baseLetters[baseLetters.length - 1] || "") === "m") {
        baseLetters[baseLetters.length - 1] = "n";
    }
    const baseStem = normalizeDerivationStemValue(baseLetters.join(""));
    if (!baseStem) {
        return null;
    }
    return buildAppendMorphStemSpec(baseStem, "ka", {
        sourceBase: baseStem,
        sourceSuffix: "ka",
    });
}


    return {
        getSubjectPersonInfo,
        getObjectPersonInfo,
        isSamePersonAcrossNumber,
        isHierarchyOrderViolation,
        isSamePersonReflexive,
        applyPassiveImpersonal,
        getPassiveSubjectOverride,
        applyIndirectObjectMarker,
        parseProjectiveMarkerChain,
        shortenProjectiveKiPrefix,
        composeProjectiveObjectPrefix,
        isSpecificProjectivePrefix,
        isNonspecificProjectivePrefix,
        getProjectiveHierarchyRank,
        normalizeValenceMarkerOrder,
        reorderProjectivePairByHierarchy,
        resolveValencePositionPrefixes,
        resolveDisplayValencePrefixes,
        getPossessivePrefixForSubject,
        getPossessivePersonInfo,
        isSameSubjectPossessor,
        isNonanimateSubject,
        buildConjugationDiagnosticEntry,
        dedupeConjugationDiagnosticEntries,
        resolveConjugationAvailabilityState,
        createToggleAvailabilityRealizationSummary,
        recordToggleAvailabilityRealization,
        realizeToggleAvailabilitySummary,
        buildConjugationEvaluationRecord,
        applyConjugationEvaluationPresentation,
        getConjugationMaskState,
        getLocativoTemporalMaskState,
        resolveHasNonspecificValence,
        buildMorphologyMetaOptions,
        buildObjectAllomorphyMetaOptions,
        buildNonspecificAllomorphyOptions,
        shouldDelaySlashSupportiveIAllomorphyForPret,
        applyNounForwardDerivation,
        getNounNonactiveRuleBase,
        getNounForwardStemTargets,
        buildNounForwardStemContexts,
        buildVerbDerivedNominalBuilderContext,
        collapseCalificativoMarkerEcho,
        buildCalificativoInstrumentivoPredicateStemSpec,
        CONJUGATION_AVAILABILITY_STATE,
        CONJUGATION_DIAGNOSTIC_IDS,
    };
}

export function installAgreementGlobals(targetObject = globalThis) {
    const api = createAgreementApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
