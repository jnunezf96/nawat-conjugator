// core/agreement/display.js
// UI-facing agreement display helpers: object toggle defaults, transitividad
// selectors, and localized role/person labels.
// Depends on core agreement helpers plus legacy UI state globals at call time.

"use strict";

function resolveDefaultToggleId(options, preferredId, fallbackIds = []) {
    const ids = options instanceof Map
        ? Array.from(options.keys())
        : (Array.isArray(options) ? options : []);
    if (!ids.length) {
        return "";
    }
    const normalizedIds = ids
        .filter((value) => value !== undefined && value !== null)
        .map((value) => String(value || ""));
    const available = new Set(normalizedIds);
    const ordered = [preferredId, ...fallbackIds];
    for (let index = 0; index < ordered.length; index += 1) {
        const candidate = ordered[index];
        if (candidate === undefined || candidate === null) {
            continue;
        }
        const normalizedCandidate = String(candidate || "");
        if (available.has(normalizedCandidate)) {
            return normalizedCandidate;
        }
    }
    return normalizedIds[0] || "";
}

function getDefaultOutputToggleSelection({
    context = "",
    values = [],
    preferredId,
    fallbackIds = [],
    subjectOptions = null,
    isAddedSlot = false,
    isNonactiveMode = false,
} = {}) {
    if (context === "verb-subject") {
        return resolveDefaultToggleId(values, preferredId, [SUBJECT_TOGGLE_ALL, ...fallbackIds]);
    }
    if (context === "verb-passive-subject") {
        return resolveDefaultToggleId(values, preferredId, [OBJECT_TOGGLE_ALL, ...fallbackIds]);
    }
    if (context === "verb-primary-object") {
        const defaultPreferredId = "ki";
        return resolveDefaultToggleId(values, preferredId ?? defaultPreferredId, [
            defaultPreferredId,
            OBJECT_TOGGLE_ALL,
            ...fallbackIds,
        ]);
    }
    if (context === "verb-extra-object") {
        return resolveDefaultToggleId(values, preferredId ?? "ki", [
            "ki",
            OBJECT_TOGGLE_ALL,
            "",
            ...fallbackIds,
        ]);
    }
    if (context === "noun-primary-object") {
        return resolveDefaultToggleId(values, preferredId ?? "ta", [
            "ta",
            "ki",
            "",
            ...fallbackIds,
        ]);
    }
    if (context === "noun-extra-object") {
        const normalizedValues = Array.isArray(values)
            ? values.map((value) => String(value || ""))
            : [];
        if (!isAddedSlot && normalizedValues.includes("")) {
            return "";
        }
        return resolveDefaultToggleId(normalizedValues, preferredId ?? "ta", [
            "ta",
            "",
            ...fallbackIds,
        ]);
    }
    if (context === "noun-possessor") {
        return resolveDefaultToggleId(values, preferredId ?? "i", [
            "i",
            ...fallbackIds,
        ]);
    }
    if (context === "noun-nonactive-primary") {
        return resolveDefaultToggleId(values, preferredId ?? "obj:ta", [
            "obj:ta",
            ...fallbackIds,
        ]);
    }
    if (context === "noun-subject") {
        const zeroSubjectId = Array.isArray(subjectOptions)
            ? (subjectOptions.find((entry) => entry.subjectPrefix === "" && entry.subjectSuffix === "")?.id)
            : null;
        return resolveDefaultToggleId(values, preferredId ?? zeroSubjectId ?? SUBJECT_TOGGLE_ALL, [
            zeroSubjectId,
            SUBJECT_TOGGLE_ALL,
            ...fallbackIds,
        ]);
    }
    return resolveDefaultToggleId(values, preferredId, fallbackIds);
}

function getPreferredObjectPrefix(prefixes) {
    return getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: prefixes,
    });
}

function getPreferredNounObjectPrefix(prefixes) {
    return getDefaultOutputToggleSelection({
        context: "noun-primary-object",
        values: prefixes,
    });
}

function getCurrentObjectPrefix() {
    if (isNominalTenseMode(getActiveTenseMode())) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        const tenseValue = selectionState.tenseValue;
        const groupKey = SUSTANTIVO_VERBAL_PREFIXES.join("|");
        const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
        const verbMeta = getVerbInputMeta();
        const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue);
        const isAllowed = (prefix) => allowedPrefixes.includes(prefix);
        const stored = getToggleStateValue(ObjectToggleState, objectStateKey);
        if (stored && isAllowed(stored)) {
            return stored;
        }
        return getPreferredNounObjectPrefix(allowedPrefixes);
    }
    const prefixes = getObjectPrefixesForTransitividad();
    if (prefixes.length === 1 && prefixes[0] === "") {
        return "";
    }
    const groups = buildObjectPrefixGroups(prefixes);
    const directGroup = groups.find((group) => group.prefixes.includes("ki")) || groups[0];
    if (!directGroup) {
        return "";
    }
    const groupKey = directGroup.prefixes.join("|") || "intrans";
    const selectionState = getCurrentResolvedConjugationSelectionState();
    const tenseValue = selectionState.group === CONJUGATION_GROUPS.universal
        ? selectionState.universalTenseValue
        : selectionState.tenseValue;
    const mode = selectionState.group === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode, isNonactive: isNonactiveMode });
    const stored = getToggleStateValue(ObjectToggleState, objectStateKey);
    if (stored && directGroup.prefixes.includes(stored)) {
        return stored;
    }
    return getPreferredObjectPrefix(directGroup.prefixes);
}

function getKnownTenseSuffixes() {
    const suffixes = new Set();
    Object.values(TENSE_SUFFIX_RULES).forEach((rules) => {
        Object.values(rules).forEach((suffix) => {
            if (suffix) {
                suffixes.add(String(suffix).toLowerCase());
            }
        });
    });
    return suffixes;
}

function getTransitividadSelection(parsedVerb = null) {
    const parsed = parsedVerb || getVerbInputMeta();
    if (getAvailableObjectSlots(parsed) > 0) {
        return "transitivo";
    }
    if (parsed.verb.length > 0) {
        return "intransitivo";
    }
    return "intransitivo";
}

function getActiveVerbBlockLabelType({
    labelValency = null,
    activeValency = null,
    embeddedObjectFilled = false,
} = {}) {
    const resolvedValency = Number.isFinite(labelValency)
        ? Number(labelValency)
        : (Number.isFinite(activeValency) ? Number(activeValency) : 0);
    return (embeddedObjectFilled || resolvedValency >= 2)
        ? "transitive"
        : "intransitive";
}

function getObjectPrefixesForTransitividad(parsedVerb = null) {
    const parsed = parsedVerb || getVerbInputMeta();
    const availableSlots = getAvailableObjectSlots(parsed);
    return availableSlots > 0
        ? OBJECT_PREFIXES.map((opt) => opt.value)
        : [""];
}

function buildObjectPrefixGroups(objectPrefixes) {
    const groups = [];
    const used = new Set();
    objectPrefixes.forEach((prefix) => {
        if (used.has(prefix)) {
            return;
        }
        if (!prefix) {
            groups.push({ prefixes: [prefix] });
            used.add(prefix);
            return;
        }
        const matchedGroup = OBJECT_PREFIX_GROUPS.find((group) => group.includes(prefix));
        if (matchedGroup) {
            const available = matchedGroup.filter((candidate) => objectPrefixes.includes(candidate));
            if (available.length) {
                available.forEach((candidate) => used.add(candidate));
                groups.push({ prefixes: available });
                return;
            }
        }
        used.add(prefix);
        groups.push({ prefixes: [prefix] });
    });
    return groups;
}

function getObjectLabel(prefix, isNawat = false) {
    if (!prefix) {
        return getLocalizedLabel(OBJECT_LABELS.intransitive, isNawat, "intransitivo");
    }
    const entry = OBJECT_PREFIX_LABELS.get(prefix);
    if (!entry) {
        return prefix;
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat ? (entry.labelNa || entry.labelEs || prefix) : (entry.labelEs || entry.labelNa || prefix);
    }
    return prefix;
}

function getAllObjectPrefixValues() {
    return OBJECT_PREFIXES.map((entry) => entry.value);
}

function getObjectLabelShort(prefix, isNawat = false) {
    return getObjectLabel(prefix, isNawat).replace(/\s*\([^)]*\)/g, "").trim();
}

function getObjectRoleLabel(role, isNawat = false) {
    if (!role) {
        return "";
    }
    const entry = OBJECT_ROLE_LABELS[role];
    if (!entry || typeof entry !== "object") {
        return role;
    }
    return isNawat ? (entry.labelNa || entry.labelEs || role) : (entry.labelEs || entry.labelNa || role);
}

var VALENCE3_PLUS_SLOT_ROLE_KEYS = Object.freeze({
    object: "mainline",
    object2: "shuntline",
    object3: "shuntline2",
});

var VALENCE3_PLUS_SLOT_ROLE_FALLBACKS = Object.freeze({
    object: "línea principal",
    object2: "línea secundaria",
    object3: "línea secundaria 2",
});

function getValence3PlusSlotRoleLabel(slotId, isNawat = false) {
    const roleKey = VALENCE3_PLUS_SLOT_ROLE_KEYS[slotId];
    if (!roleKey) {
        return "";
    }
    const entry = OBJECT_ROLE_LABELS[roleKey];
    if (entry && typeof entry === "object") {
        return isNawat ? (entry.labelNa || entry.labelEs || VALENCE3_PLUS_SLOT_ROLE_FALLBACKS[slotId])
            : (entry.labelEs || entry.labelNa || VALENCE3_PLUS_SLOT_ROLE_FALLBACKS[slotId]);
    }
    return VALENCE3_PLUS_SLOT_ROLE_FALLBACKS[slotId] || "";
}

function getObjectComboLabel(prefix, isNawat) {
    if (!prefix) {
        return getObjectLabelShort(prefix, isNawat);
    }
    if (!isNawat) {
        return getObjectLabelShort(prefix, isNawat);
    }
    switch (prefix) {
        case "nech":
            return "naja";
        case "metz":
            return "taja";
        case "ki":
            return "yaja";
        case "tech":
            return "tejemet";
        case "metzin":
            return "anmejemet";
        case "kin":
            return "yejemet";
        default:
            return getObjectLabelShort(prefix, isNawat);
    }
}

function getNounObjectLabel(prefix, isNawat = false) {
    if (!prefix) {
        return getLocalizedLabel(
            NOUN_OBJECT_LABELS.intransitive,
            isNawat,
            "a él/ella/eso"
        );
    }
    return getObjectLabel(prefix, isNawat);
}

function getNounObjectLabelShort(prefix, isNawat = false) {
    return getNounObjectLabel(prefix, isNawat).replace(/\s*\([^)]*\)/g, "").trim();
}

function getNounObjectComboLabel(prefix, isNawat) {
    if (!prefix) {
        return getNounObjectLabelShort(prefix, isNawat);
    }
    return getObjectComboLabel(prefix, isNawat);
}

function getNounZeroObjectComboLabel(isNawat = false, options = {}) {
    if (options.isImpersonalDummy) {
        return getVerbBlockLabel("impersonal", isNawat, "impersonal");
    }
    return getNounObjectComboLabel("", isNawat);
}

function getPossessorLabel(prefix, isNawat = false) {
    const entry = POSSESSOR_LABELS[prefix];
    if (!entry) {
        return "";
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat
            ? (entry.labelNa || entry.labelEs || "")
            : (entry.labelEs || entry.labelNa || "");
    }
    return "";
}

function getPossessorPersonLabel(prefix, isNawat = false) {
    const entry = POSSESSIVE_PREFIX_LABELS.get(prefix);
    return getLocalizedLabel(entry, isNawat, "");
}

function buildPersonSub({ subjectLabel, possessorLabel, objectLabel }) {
    const parts = [];
    if (subjectLabel) {
        parts.push(subjectLabel);
    }
    if (possessorLabel) {
        parts.push(possessorLabel);
    }
    if (objectLabel) {
        parts.push(objectLabel);
    }
    return parts.join(" · ");
}

function getDummySubjectSubLabel(isNawat = false) {
    return isNawat ? "yaja" : "ello";
}

function formatActiveValence3PlusPersonSub(basePersonSub = "", objectParts = [], isNawat = false) {
    const parts = Array.isArray(objectParts) ? objectParts.filter(Boolean) : [];
    const prefixParts = [basePersonSub].filter(Boolean);
    if (!parts.length) {
        return prefixParts.join(" · ");
    }
    if (isNawat) {
        return [...prefixParts, ...parts].join(" · ");
    }
    const renderedObjectParts = parts
        .map((part, index) => (index === 0 ? `${part} (escrito)` : part));
    return [...prefixParts, ...renderedObjectParts].join(" · ");
}

function getSubjectSubLabel(selection, options = {}) {
    const isNawat = options.isNawat === true;
    const mode = options.mode || "";
    const tenseValue = options.tenseValue || "";
    const isNonanimateContext = options.isNonanimateContext === true
        || (mode === "noun" && NONANIMATE_NOUN_TENSES.has(tenseValue));
    if (!selection) {
        return "";
    }
    if (!isNawat && isNonanimateContext && isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix)) {
        return getDummySubjectSubLabel(isNawat);
    }
    if (!isNawat && selection.subjectPrefix === "" && selection.subjectSuffix === "t") {
        return "ellos/ellas/esos";
    }
    return getPersonSubLabel(selection, isNawat);
}
