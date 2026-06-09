// core/agreement/agreement.js
// Person/number mapping and passive/impersonal agreement logic.
// Extracted from script.js lines 3,706–3,827 (Person & Agreement + Nonactive Derivation).
// Global-scope module: all functions defined directly on the global object.
// Deps (Nonactive section): PASSIVE_IMPERSONAL_DIRECT_OBJECTS, PASSIVE_IMPERSONAL_SUBJECT_MAP,
//       OBJECT_MARKERS — all initialized in script.js Configuration before first call.

"use strict";

// === Person & Agreement ===
function getImperativeSubjectPersonInfo(subjectPrefix, subjectSuffix) {
    const key = `${subjectPrefix}|${subjectSuffix}`;
    switch (key) {
        case "ni|":
            return { person: 1, number: "sg", mode: "imperative" };
        case "shi|":
            return { person: 2, number: "sg", mode: "imperative" };
        case "|":
            return { person: 3, number: "sg", mode: "imperative" };
        case "ti|kan":
            return { person: 1, number: "pl", mode: "imperative" };
        case "shi|kan":
            return { person: 2, number: "pl", mode: "imperative" };
        case "|kan":
            return { person: 3, number: "pl", mode: "imperative" };
        default:
            return null;
    }
}

function getNonImperativeSubjectPersonInfo(subjectPrefix, subjectSuffix) {
    const key = `${subjectPrefix}|${subjectSuffix}`;
    switch (key) {
        case "ni|":
            return { person: 1, number: "sg", mode: "nonimperative" };
        case "ti|":
            return { person: 2, number: "sg", mode: "nonimperative" };
        case "|":
            return { person: 3, number: "sg", mode: "nonimperative" };
        case "ti|t":
            return { person: 1, number: "pl", mode: "nonimperative" };
        case "an|t":
            return { person: 2, number: "pl", mode: "nonimperative" };
        case "|t":
            return { person: 3, number: "pl", mode: "nonimperative" };
        default:
            return null;
    }
}

function isImperativeSubjectIdentityContext(options = {}) {
    return options?.mode === "imperative" || options?.tense === "imperativo";
}

function isNonImperativeSubjectIdentityContext(options = {}) {
    return (
        options?.mode === "nonimperative"
        || options?.mode === "non-imperative"
        || (
            typeof options?.tense === "string"
            && options.tense
            && options.tense !== "imperativo"
        )
    );
}

function stripSubjectIdentityMode(info = null) {
    return info ? { person: info.person, number: info.number } : null;
}

function getSubjectPersonInfo(subjectPrefix, subjectSuffix, options = {}) {
    const imperativeInfo = getImperativeSubjectPersonInfo(subjectPrefix, subjectSuffix);
    if (
        imperativeInfo
        && (
            isImperativeSubjectIdentityContext(options)
            || subjectPrefix === "shi"
            || subjectSuffix === "kan"
        )
    ) {
        return imperativeInfo;
    }
    const nonImperativeInfo = getNonImperativeSubjectPersonInfo(subjectPrefix, subjectSuffix);
    if (nonImperativeInfo) {
        return isNonImperativeSubjectIdentityContext(options)
            ? nonImperativeInfo
            : stripSubjectIdentityMode(nonImperativeInfo);
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

var CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS = Object.freeze({
    [CONJUGATION_DIAGNOSTIC_IDS.resultError]: "La generacion no produjo una forma.",
    [CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden]: "Forma reflexiva oculta para este rol.",
    [CONJUGATION_DIAGNOSTIC_IDS.invalidCombo]: "Combinacion incompatible.",
    [CONJUGATION_DIAGNOSTIC_IDS.personAgreement]: "Persona incompatible.",
    [CONJUGATION_DIAGNOSTIC_IDS.hierarchyOrder]: "Jerarquia de participantes incompatible.",
    [CONJUGATION_DIAGNOSTIC_IDS.subjectPossessorCollision]: "Sujeto y poseedor incompatibles.",
    [CONJUGATION_DIAGNOSTIC_IDS.valence4Matrix]: "Matriz de valencia incompatible.",
});

function buildConjugationDiagnosticEntry(id = "", severity = "masked", options = {}) {
    return {
        id: String(id || ""),
        severity: severity || "masked",
        source: options.source || "",
        masked: options.masked !== false,
    };
}

function normalizeConjugationDiagnosticEntry(entry = null, fallbackSource = "") {
    if (!entry) {
        return null;
    }
    if (typeof entry === "string") {
        const id = entry.trim();
        return id ? buildConjugationDiagnosticEntry(id, "diagnostic", { source: fallbackSource }) : null;
    }
    if (typeof entry !== "object") {
        return null;
    }
    const id = String(entry.id || entry.code || entry.message || "").trim();
    if (!id) {
        return null;
    }
    return {
        ...entry,
        id,
        severity: String(entry.severity || "diagnostic"),
        source: entry.source || fallbackSource || "",
    };
}

function dedupeConjugationDiagnosticEntries(entries = []) {
    const seen = new Set();
    return (Array.isArray(entries) ? entries : [])
        .map((entry) => normalizeConjugationDiagnosticEntry(entry))
        .filter((entry) => entry && entry.id)
        .filter((entry) => {
            const key = `${entry.id}|${entry.severity || ""}|${entry.source || ""}|${entry.message || ""}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
}

function getConjugationResultFrame(result = null) {
    return (
        (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null)
        || (result?.frames && typeof result.frames === "object" ? result.frames : null)
    );
}

function splitConjugationRenderableSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeConjugationDisplayText(entry))
        .filter(Boolean);
}

function getConjugationRenderableSurfaceForms(result = null) {
    const grammarFrame = getConjugationResultFrame(result);
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
            .flatMap((entry) => splitConjugationRenderableSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        forms.push(...result.surfaceForms);
    }
    if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
    }
    if (!hasResultFrame && result?.result) {
        forms.push(result.result);
    }
    return forms
        .flatMap((entry) => splitConjugationRenderableSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getConjugationRenderableSurface(result = null) {
    return getConjugationRenderableSurfaceForms(result).join(" / ");
}

function buildConjugationFrameStatusDiagnostic(result = null) {
    const grammarFrame = getConjugationResultFrame(result);
    if (!grammarFrame || typeof grammarFrame !== "object") {
        return null;
    }
    const routeContract = grammarFrame.routeContract && typeof grammarFrame.routeContract === "object"
        ? grammarFrame.routeContract
        : {};
    const authorityFrame = grammarFrame.authorityFrame && typeof grammarFrame.authorityFrame === "object"
        ? grammarFrame.authorityFrame
        : {};
    const resultFrame = grammarFrame.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : {};
    const blocked = (
        result?.ok === false
        || resultFrame.ok === false
        || routeContract.generationAllowed === false
        || authorityFrame.supported === false
    );
    if (!blocked) {
        return null;
    }
    const andrewsRefs = Array.isArray(authorityFrame.andrewsRefs)
        ? authorityFrame.andrewsRefs.map((entry) => String(entry || "").trim()).filter(Boolean)
        : [];
    const routeFamily = String(routeContract.routeFamily || "").trim();
    const routeStage = String(routeContract.routeStage || "").trim();
    const hasAndrewsAuthority = andrewsRefs.length > 0 || String(authorityFrame.grammarAuthority || "") === "Andrews";
    const authorityBlocked = authorityFrame.supported === false;
    const routeBlocked = routeContract.generationAllowed === false;
    const resultBlocked = result?.ok === false || resultFrame.ok === false;
    let failedLayer = "diagnostic";
    let contractLayer = "diagnosticFrame";
    if (authorityBlocked) {
        failedLayer = "authority";
        contractLayer = "authorityFrame";
    } else if (routeBlocked) {
        failedLayer = "route";
        contractLayer = "routeContract";
    } else if (resultBlocked) {
        failedLayer = "output";
        contractLayer = "resultFrame";
    }
    return {
        id: hasAndrewsAuthority ? "ANDREWS_ROUTE_NOT_LICENSED" : "LCM_ROUTE_GENERATION_BLOCKED",
        code: hasAndrewsAuthority ? "ANDREWS_ROUTE_NOT_LICENSED" : "LCM_ROUTE_GENERATION_BLOCKED",
        severity: "error",
        source: "grammar-frame",
        failedLayer,
        contractLayer,
        message: hasAndrewsAuthority
            ? "Ruta bloqueada antes de generar por la evidencia Andrews del contrato."
            : "Ruta bloqueada antes de generar por el contrato gramatical.",
        authority: andrewsRefs.join("; "),
        routeFamily,
        routeStage,
    };
}

function isGenericConjugationNoOutputDiagnostic(entry = null) {
    if (!entry || typeof entry !== "object") {
        return false;
    }
    const id = String(entry.id || entry.code || "").trim();
    const message = String(entry.message || "").trim();
    return id === CONJUGATION_DIAGNOSTIC_IDS.resultError
        || id === "generate-word-route-blocked"
        || id === "generate-runtime-no-output"
        || id === "morphology-application-blocked"
        || id === "verb-derived-nominal-blocked"
        || id === "verb-derived-nominal-context-blocked"
        || id === "preterit-class-based-result-blocked"
        || message === "La generacion no produjo una forma."
        || message === "La generación no produjo una forma.";
}

function hasConjugationFailedLayerDiagnostic(entries = []) {
    return entries.some((entry) => {
        if (!entry || typeof entry !== "object") {
            return false;
        }
        const id = String(entry.id || entry.code || "").trim();
        return entry.source === "grammar-frame"
            || Boolean(entry.failedLayer || entry.contractLayer)
            || id === "ANDREWS_ROUTE_NOT_LICENSED"
            || id === "LCM_ROUTE_GENERATION_BLOCKED";
    });
}

function shouldPromoteConjugationFrameStatusDiagnostic(frameStatusDiagnostic = null, entries = []) {
    if (!frameStatusDiagnostic || typeof frameStatusDiagnostic !== "object") {
        return false;
    }
    const statusLayer = String(frameStatusDiagnostic.failedLayer || "").trim();
    const statusId = String(frameStatusDiagnostic.id || frameStatusDiagnostic.code || "").trim();
    if (!["authority", "route", "stem", "orthography", "agreement"].includes(statusLayer)) {
        return false;
    }
    const diagnosticEntries = Array.isArray(entries) ? entries : [];
    if (diagnosticEntries.some((entry) => (
        entry
        && typeof entry === "object"
        && !isGenericConjugationNoOutputDiagnostic(entry)
    ))) {
        return false;
    }
    return !diagnosticEntries.some((entry) => {
        if (!entry || typeof entry !== "object") {
            return false;
        }
        const entryId = String(entry.id || entry.code || "").trim();
        if (
            entry.source === "grammar-frame"
            || entryId === statusId
            || entryId === "ANDREWS_ROUTE_NOT_LICENSED"
            || entryId === "LCM_ROUTE_GENERATION_BLOCKED"
        ) {
            return true;
        }
        const failedLayer = String(entry.failedLayer || "").trim();
        const contractLayer = String(entry.contractLayer || "").trim();
        if (!failedLayer && !contractLayer) {
            return false;
        }
        if (isGenericConjugationNoOutputDiagnostic(entry)) {
            return false;
        }
        return failedLayer !== "output" && failedLayer !== "result" && contractLayer !== "resultFrame";
    });
}

function getConjugationResultDiagnostics(result = null) {
    if (!result || typeof result !== "object") {
        return [];
    }
    const grammarFrame = getConjugationResultFrame(result);
    const routeDiagnostics = Array.isArray(grammarFrame?.routeContract?.blockingDiagnostics)
        ? grammarFrame.routeContract.blockingDiagnostics
        : [];
    const frameDiagnostics = Array.isArray(grammarFrame?.diagnosticFrame?.diagnostics)
        ? grammarFrame.diagnosticFrame.diagnostics
        : [];
    const diagnostics = [
        ...(Array.isArray(result.diagnostics) ? result.diagnostics : []),
        ...routeDiagnostics,
        ...frameDiagnostics,
        ...(Array.isArray(result.contractDiagnostics) ? result.contractDiagnostics : []),
    ];
    const frameStatusDiagnostic = buildConjugationFrameStatusDiagnostic(result);
    if (
        frameStatusDiagnostic
        && (
            (
                !hasConjugationFailedLayerDiagnostic(diagnostics)
                && (!diagnostics.length || diagnostics.every((entry) => isGenericConjugationNoOutputDiagnostic(entry)))
            )
            || diagnostics.every((entry) => isGenericConjugationNoOutputDiagnostic(entry))
            || shouldPromoteConjugationFrameStatusDiagnostic(frameStatusDiagnostic, diagnostics)
        )
    ) {
        diagnostics.unshift(frameStatusDiagnostic);
    }
    return dedupeConjugationDiagnosticEntries(diagnostics);
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
        ...getConjugationResultDiagnostics(result),
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
        || Boolean(getConjugationRenderableSurface(result));
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

function getConjugationDiagnosticDisplayLabel(diagnostic = null) {
    const entry = typeof diagnostic === "string" ? { id: diagnostic } : diagnostic;
    const explicitMessage = String(entry?.message || "").trim();
    if (explicitMessage) {
        return explicitMessage;
    }
    const id = String(entry?.id || "").trim();
    return id ? (CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS[id] || id) : "";
}

function getConjugationNoOutputDisplay(evaluation = null, fallback = "Sin salida para esta configuracion.") {
    const diagnostics = Array.isArray(evaluation?.diagnostics)
        ? evaluation.diagnostics
        : [];
    const primaryDiagnostic = diagnostics.find((entry) => (
        String(entry?.message || "").trim()
        || String(entry?.id || "").trim()
    ));
    const diagnosticLabel = getConjugationDiagnosticDisplayLabel(primaryDiagnostic);
    if (diagnosticLabel) {
        return diagnosticLabel;
    }
    const diagnosticIds = Array.isArray(evaluation?.diagnosticIds)
        ? evaluation.diagnosticIds
        : [];
    const diagnosticIdLabel = getConjugationDiagnosticDisplayLabel(diagnosticIds.find(Boolean) || "");
    if (diagnosticIdLabel) {
        return diagnosticIdLabel;
    }
    if (evaluation?.shouldMaskRow) {
        return evaluation.isErrorRow
            ? "Combinacion bloqueada por la gramatica."
            : "Salida no visible para esta seleccion.";
    }
    return String(fallback || "").trim() || "Sin salida para esta configuracion.";
}

function normalizeConjugationDisplayText(value = "") {
    const text = String(value || "").trim();
    return text && text !== "—" ? text : "";
}

function applyConjugationEvaluationPresentation({
    row = null,
    value = null,
    evaluation = null,
    formattedValue = "",
}) {
    const availabilityState = evaluation?.availabilityState || CONJUGATION_AVAILABILITY_STATE.impossible;
    const diagnosticIds = Array.isArray(evaluation?.diagnosticIds) ? evaluation.diagnosticIds : [];
    const grammarFrame = evaluation?.result?.grammarFrame || evaluation?.result?.frames || null;
    const routeContract = grammarFrame?.routeContract || {};
    const authorityFrame = grammarFrame?.authorityFrame || {};
    const diagnosticFrame = grammarFrame?.diagnosticFrame || {};
    const primaryDiagnostic = (Array.isArray(evaluation?.diagnostics) ? evaluation.diagnostics : [])
        .find((entry) => (
            entry
            && typeof entry === "object"
            && (
                String(entry.id || entry.code || "").trim()
                || String(entry.failedLayer || entry.contractLayer || "").trim()
            )
        )) || {};
    const frameStatusDiagnostic = buildConjugationFrameStatusDiagnostic(evaluation?.result);
    const datasetLayerDiagnostic = String(primaryDiagnostic.failedLayer || primaryDiagnostic.contractLayer || "").trim()
        ? primaryDiagnostic
        : (frameStatusDiagnostic || {});
    if (row) {
        row.dataset.availabilityState = availabilityState;
        row.dataset.diagnosticState = availabilityState;
        row.dataset.diagnosticIds = diagnosticIds.join(",");
        if (grammarFrame && typeof grammarFrame === "object") {
            row.dataset.grammarFrameVersion = String(grammarFrame.version || "");
            row.dataset.lcmRouteFamily = String(routeContract.routeFamily || "");
            row.dataset.lcmRouteStage = String(routeContract.routeStage || "");
            row.dataset.lcmGenerationAllowed = routeContract.generationAllowed === false ? "false" : (routeContract.generationAllowed === true ? "true" : "");
            row.dataset.lcmEvidenceStatus = String(authorityFrame.evidenceStatus || "");
            row.dataset.lcmDiagnosticStatus = String(diagnosticFrame.status || "");
        }
        row.dataset.lcmDiagnosticId = String(primaryDiagnostic.id || primaryDiagnostic.code || "").trim();
        row.dataset.lcmFailedLayer = String(datasetLayerDiagnostic.failedLayer || "").trim();
        row.dataset.lcmContractLayer = String(datasetLayerDiagnostic.contractLayer || "").trim();
    }
    if (!value) {
        return;
    }
    value.classList.remove("conjugation-error", "conjugation-reflexive");
    value.classList.remove("conjugation-value--no-output");
    value.dataset.availabilityState = availabilityState;
    value.dataset.diagnosticState = availabilityState;
    value.dataset.diagnosticIds = diagnosticIds.join(",");
    if (evaluation?.shouldMaskRow) {
        value.textContent = getConjugationNoOutputDisplay(evaluation);
        value.classList.add("conjugation-value--no-output");
        if (evaluation.isErrorRow) {
            value.classList.add("conjugation-error");
        }
        return;
    }
    const displayValue = normalizeConjugationDisplayText(formattedValue)
        || getConjugationRenderableSurface(evaluation?.result);
    if (!displayValue) {
        value.textContent = getConjugationNoOutputDisplay(evaluation);
        value.classList.add("conjugation-value--no-output");
        value.classList.add("conjugation-error");
        return;
    }
    value.textContent = displayValue;
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
        const resultDiagnostics = getConjugationResultDiagnostics(result);
        if (resultDiagnostics.length) {
            diagnostics.push(...resultDiagnostics);
        } else {
            diagnostics.push(buildConjugationDiagnosticEntry(
                CONJUGATION_DIAGNOSTIC_IDS.resultError,
                "error",
                { source: "result" }
            ));
        }
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
    const hasRenderableResult = Boolean(getConjugationRenderableSurface(result));
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

function resolveNominalAvailabilityProbeSelection({
    tenseValue = "",
    patientivoSource = null,
    verbMeta = null,
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
} = {}) {
    const resolvedObjectPrefix = String(objectPrefix || "");
    const resolvedIndirectObjectMarker = String(indirectObjectMarker || "");
    const resolvedThirdObjectMarker = String(thirdObjectMarker || "");
    let normalizedObjectPrefix = resolvedObjectPrefix;
    const resolvedPatientivoSource = String(patientivoSource || "");
    const isPatientivoTroncoProbe = String(tenseValue || "") === "patientivo"
        && resolvedPatientivoSource === "tronco-verbal";
    if (isPatientivoTroncoProbe && !normalizedObjectPrefix && verbMeta?.hasImpersonalTaPrefix !== true) {
        const baseObjectSlots = Number(getBaseObjectSlots(verbMeta));
        const isTransitiveBase = (
            Number.isFinite(baseObjectSlots) && baseObjectSlots > 0
        ) || verbMeta?.isMarkedTransitive === true
            || verbMeta?.isTaFusion === true;
        if (isTransitiveBase) {
            normalizedObjectPrefix = "ta";
        }
    }
    return {
        objectPrefix: normalizedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        wasNormalized: normalizedObjectPrefix !== resolvedObjectPrefix,
    };
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

function buildVerbDerivedNominalBuilderContextDiagnostic({
    id = "verb-derived-nominal-context-blocked",
    message = "La generacion no produjo una forma.",
    details = null,
    failedLayer = "",
    contractLayer = "",
    routeStage = "",
} = {}) {
    const normalizedId = String(id || "verb-derived-nominal-context-blocked").trim();
    const layerContract = getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage);
    return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || "La generacion no produjo una forma.").trim(),
        details: details && typeof details === "object" ? details : null,
        failedLayer: String(failedLayer || layerContract.failedLayer).trim(),
        contractLayer: String(contractLayer || layerContract.contractLayer).trim(),
        routeFamily: "verb-derived-nominal-builder-context",
        routeStage: String(routeStage || "").trim(),
    };
}

function getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage = "") {
    const stage = String(routeStage || "").trim();
    if (/parse-input|orthography|spelling|letters?|characters?/i.test(stage)) {
        return { failedLayer: "orthography", contractLayer: "orthographyFrame" };
    }
    if (/parse-stem|stem-context|stem|source-stem/i.test(stage)) {
        return { failedLayer: "stem", contractLayer: "stemFrame" };
    }
    if (/subject|object-slot|object|possess|participant|agreement|valence|state/i.test(stage)) {
        return { failedLayer: "agreement", contractLayer: "participantFrame" };
    }
    if (/output|result|surface|no-output/i.test(stage)) {
        return { failedLayer: "output", contractLayer: "resultFrame" };
    }
    return { failedLayer: "route", contractLayer: "routeContract" };
}

function getVerbDerivedNominalBuilderContextAndrewsRefs(kind = "") {
    const refs = [
        "Andrews Lesson 5",
        "Andrews Lesson 6",
        "Andrews Lesson 7",
    ];
    switch (String(kind || "")) {
        case "instrumentivo":
            refs.push("Andrews 36.6");
            break;
        case "calificativo-instrumentivo":
            refs.push("Andrews 36.10-36.11");
            break;
        case "locativo-temporal":
            refs.push("Andrews 46.4");
            break;
        default:
            refs.push("Andrews Lessons 35-37");
            break;
    }
    return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function normalizeVerbDerivedNominalBuilderContextDiagnostics(diagnostics = [], fallbackDiagnostic = null) {
    const entries = [
        ...(Array.isArray(diagnostics) ? diagnostics : []),
        ...(fallbackDiagnostic ? [fallbackDiagnostic] : []),
    ];
    if (typeof normalizeGrammarDiagnosticContractEntries === "function") {
        return normalizeGrammarDiagnosticContractEntries(entries);
    }
    return entries.filter((entry) => entry && typeof entry === "object");
}

function applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata(diagnostics = [], routeStage = "") {
    const layerContract = getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage);
    return (Array.isArray(diagnostics) ? diagnostics : []).map((entry) => {
        if (!entry || typeof entry !== "object") {
            return entry;
        }
        return {
            ...entry,
            failedLayer: entry.failedLayer || layerContract.failedLayer,
            contractLayer: entry.contractLayer || layerContract.contractLayer,
            routeFamily: entry.routeFamily || "verb-derived-nominal-builder-context",
            routeStage: entry.routeStage || String(routeStage || "").trim(),
        };
    });
}

function attachVerbDerivedNominalBuilderContextContract(context = null, {
    kind = "",
    rawVerb = "",
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    combinedMode = "",
    slotPlanBundle = null,
    routeStage = "build-context",
    diagnosticId = "verb-derived-nominal-context-blocked",
    message = "La generacion no produjo una forma.",
    diagnosticDetails = null,
    enumerable = false,
} = {}) {
    const output = context && typeof context === "object" ? context : {};
    const nominalKind = String(kind || output.kind || output.nounSourceModel?.nounDerivationKind || "").trim();
    const blocked = output.error === true;
    const fallbackDiagnostic = buildVerbDerivedNominalBuilderContextDiagnostic({
        id: diagnosticId,
        message,
        details: diagnosticDetails,
        routeStage,
    });
    const diagnostics = applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata(
        normalizeVerbDerivedNominalBuilderContextDiagnostics(
            output.diagnostics,
            blocked ? fallbackDiagnostic : null
        ),
        routeStage
    );
    if (!Object.prototype.hasOwnProperty.call(output, "diagnostics")) {
        Object.defineProperty(output, "diagnostics", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: diagnostics,
        });
    }
    const ok = !blocked;
    const grammarFrame = typeof buildGrammarFrame === "function"
        ? buildGrammarFrame({
            authorityFrame: typeof buildGrammarAuthorityFrame === "function"
                ? buildGrammarAuthorityFrame({
                    sourceEvidence: {
                        kind: "verb-derived-nominal-builder-context",
                        nominalKind,
                        sourceModel: output.nounSourceModel || null,
                    },
                    evidenceStatus: ok ? "context-built" : "blocked",
                    andrewsRefs: getVerbDerivedNominalBuilderContextAndrewsRefs(nominalKind),
                    supported: ok,
                })
                : null,
            unitFrame: {
                unitKind: "agreement-builder-context",
                outputKind: "verb-derived-nominal-builder-context",
                generationRoute: nominalKind,
            },
            orthographyFrame: {
                surface: "",
                surfaceForms: [],
                spellingAuthority: "Nawat/Pipil evidence",
                noClassicalSurfaceImport: true,
            },
            morphBoundaryFrame: {
                objectPrefix: String(output.objectPrefix || objectPrefix || ""),
                indirectObjectMarker: String(output.indirectObjectMarker || indirectObjectMarker || ""),
                thirdObjectMarker: String(output.thirdObjectMarker || thirdObjectMarker || ""),
                slotPlanBundle: output.slotPlanBundle || slotPlanBundle || null,
            },
            stemFrame: {
                stem: String(output.verb || ""),
                analysisStem: String(output.analysisVerb || ""),
                sourceRawVerb: String(rawVerb || output.rawVerb || ""),
                sourceModel: output.nounSourceModel || null,
                forwardStemTargets: Array.isArray(output.forwardStemTargets) ? output.forwardStemTargets : [],
                forwardStemContexts: Array.isArray(output.forwardStemContexts) ? output.forwardStemContexts : [],
            },
            nuclearClauseFrame: {
                clauseKind: "nominal-nuclear-clause",
                sourceUnitKind: "verbal-nuclear-clause",
                predicateInsideParentheses: true,
                subjectConnectorsOutsideParentheses: true,
                tenseSlot: false,
            },
            participantFrame: {
                subject: {
                    prefix: String(output.subjectPrefix || subjectPrefix || ""),
                    suffix: String(output.subjectSuffix || subjectSuffix || ""),
                },
                object: {
                    prefix: String(output.objectPrefix || objectPrefix || ""),
                    indirectObjectMarker: String(output.indirectObjectMarker || indirectObjectMarker || ""),
                    thirdObjectMarker: String(output.thirdObjectMarker || thirdObjectMarker || ""),
                },
            },
            inflectionFrame: {
                nominalKind,
                combinedMode: String(output.combinedMode || combinedMode || ""),
            },
            routeContract: typeof buildGrammarRouteContractFrame === "function"
                ? buildGrammarRouteContractFrame({
                    routeFamily: "verb-derived-nominal-builder-context",
                    routeStage,
                    sourceContract: {
                        rawVerb: String(rawVerb || output.rawVerb || ""),
                        nominalKind,
                    },
                    targetContract: {
                        outputKind: "verb-derived-nominal-builder-context",
                        generationRoute: nominalKind,
                        contextReady: ok,
                    },
                    generationAllowed: ok,
                    blockingDiagnostics: ok ? [] : diagnostics,
                })
                : null,
            astFrame: null,
            resultFrame: typeof buildGrammarResultFrame === "function"
                ? buildGrammarResultFrame({
                    ok,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "verb-derived-nominal-builder-context",
                    generationRoute: nominalKind,
                    sourceInput: String(rawVerb || output.rawVerb || ""),
                })
                : null,
            diagnosticFrame: typeof buildGrammarDiagnosticFrame === "function"
                ? buildGrammarDiagnosticFrame({
                    status: ok ? "context-built" : "blocked",
                    diagnostics,
                    blockers: ok ? [] : diagnostics,
                })
                : null,
        })
        : null;
    const resultContract = typeof buildGrammarResultContract === "function"
        ? buildGrammarResultContract({ result: output, grammarFrame })
        : { ok, surface: "", frames: grammarFrame, diagnostics };
    Object.defineProperties(output, {
        grammarFrame: {
            configurable: true,
            enumerable,
            writable: true,
            value: grammarFrame,
        },
        ok: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.ok,
        },
        surface: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.surface,
        },
        frames: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.frames,
        },
        contractDiagnostics: {
            configurable: true,
            enumerable,
            writable: true,
            value: resultContract.diagnostics,
        },
    });
    return output;
}

function buildVerbDerivedNominalBuilderContextBlocked({
    kind = "",
    rawVerb = "",
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    combinedMode = "",
    slotPlanBundle = null,
    routeStage = "blocked",
    diagnosticId = "verb-derived-nominal-context-blocked",
    message = "La generacion no produjo una forma.",
    diagnosticDetails = null,
} = {}) {
    return attachVerbDerivedNominalBuilderContextContract({ error: true }, {
        kind,
        rawVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode,
        slotPlanBundle,
        routeStage,
        diagnosticId,
        message,
        diagnosticDetails,
    });
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
    actionNounStemUse = "",
    combinedMode = "",
    requireNonanimateSubject = false,
} = {}) {
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            combinedMode,
            routeStage: "parse-input",
            diagnosticId: "verb-derived-nominal-context-invalid-input",
            message: "Entrada verbal incompatible con la ruta nominal.",
            diagnosticDetails: {
                invalidCharacters,
                invalidLetters,
                invalidStructure,
            },
        });
    }
    let verb = String(verbMeta?.verb || "");
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            combinedMode,
            routeStage: "parse-stem",
            diagnosticId: "verb-derived-nominal-context-invalid-stem",
            message: "La ruta nominal requiere un tronco verbal con vocal final.",
            diagnosticDetails: {
                verb,
                hasVowel: VOWEL_RE.test(verb),
                hasFinalVowel: VOWEL_END_RE.test(verb),
            },
        });
    }
    if (requireNonanimateSubject && !isNonanimateSubject(subjectPrefix, subjectSuffix)) {
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            combinedMode,
            routeStage: "subject-gate",
            diagnosticId: "verb-derived-nominal-context-nonanimate-subject-required",
            message: "Esta ruta nominal requiere sujeto no animado.",
        });
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
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            combinedMode,
            slotPlanBundle,
            routeStage: "object-slot-gate",
            diagnosticId: "verb-derived-nominal-context-invalid-object-slot",
            message: "La seleccion de objeto no coincide con las ranuras de esta ruta nominal.",
            diagnosticDetails: {
                selectedBySlot,
                hasOverflowedSlotSelection,
                hasInvalidSlotSelection,
            },
        });
    }
    const nounSourceModel = buildVerbDerivedNominalSourceModel({
        ...(verbMeta && typeof verbMeta === "object" ? verbMeta : {}),
        sourceRawVerb: rawVerb,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        actionNounStemUse,
        combinedMode,
        sourceSubjectPrefix: subjectPrefix,
        sourceSubjectSuffix: subjectSuffix,
    }, kind);
    const nounForwardDerivation = applyNounForwardDerivation({
        verbMeta,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix,
    });
    if (nounForwardDerivation.blocked) {
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            combinedMode,
            slotPlanBundle,
            routeStage: "forward-derivation-gate",
            diagnosticId: "verb-derived-nominal-context-forward-derivation-blocked",
            message: "La derivacion nominal no produjo un tronco de avance.",
            diagnosticDetails: nounForwardDerivation,
        });
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
        return buildVerbDerivedNominalBuilderContextBlocked({
            kind,
            rawVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            combinedMode,
            slotPlanBundle,
            routeStage: "forward-stem-context-gate",
            diagnosticId: "verb-derived-nominal-context-no-forward-stem",
            message: "La ruta nominal no encontro un tronco aplicable.",
        });
    }
    return attachVerbDerivedNominalBuilderContextContract({
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
    }, {
        kind,
        rawVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        combinedMode,
        slotPlanBundle,
        routeStage: "build-context",
    });
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
