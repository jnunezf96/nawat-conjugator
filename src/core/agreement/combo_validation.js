"use strict";

// core/agreement/combo_validation.js
// Shared valence-combo validation and display helpers.
// Global-scope module: all functions defined directly on the global object.
// Deps (resolved at call time via global scope from script.js / other modules):
//   resolveDisplayValencePrefixes, getDerivationControllerSlotPriority

function getComboKey(subjectPrefix, objectPrefix, subjectSuffix) {
    return `${subjectPrefix}|${objectPrefix}|${subjectSuffix}`;
}

function resolveComboValidationObjectPrefix({
    objectPrefix = "",
    indirectObjectMarker = "",
    derivationType = "",
    controllerObjectMarker = null,
}) {
    if (controllerObjectMarker !== null) {
        return controllerObjectMarker || "";
    }
    const normalized = resolveDisplayValencePrefixes({
        objectPrefix,
        indirectObjectMarker,
        derivationType,
    });
    const object = normalized.objectPrefix || "";
    const indirect = normalized.indirectObjectMarker || "";
    const personMarkers = new Set(["nech", "metz", "ki", "tech", "metzin", "kin", "k"]);
    const pickByPriority = (ordered) => {
        const personMatch = ordered.find((prefix) => personMarkers.has(prefix));
        if (personMatch) {
            return personMatch;
        }
        return ordered.find((prefix) => Boolean(prefix)) || "";
    };
    const slotValues = {
        object,
        object2: indirect,
    };
    const orderedByDerivation = getDerivationControllerSlotPriority(derivationType)
        .map((slotId) => slotValues[slotId] || "");
    return pickByPriority(orderedByDerivation);
}

const VALENCE4_VALID_COMBO_SIGNATURES = new Set([
    "ta|ta|ta",
    "te|ta|ta",
    "mu|ta|ta",
    "te|te|ta",
    "mu|te|ta",
    "ki|mu|ta",
    "te|te|te",
    "mu|te|te",
    "ki|mu|te",
    "ki|0|ta",
    "ki|0|te",
    "ki|0|mu",
    "ki|0|0",
]);

const VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES = new Set([
    "nech",
    "metz",
    "ki",
    "tech",
    "metzin",
    "kin",
    "k",
]);

function collapseProjectiveForSignature(prefix = "") {
    if (!prefix) {
        return "0";
    }
    if (VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(prefix)) {
        return "ki";
    }
    if (prefix === "mu") {
        return "mu";
    }
    if (prefix === "te") {
        return "te";
    }
    if (prefix === "ta") {
        return "ta";
    }
    return prefix;
}

function collapseSilentSpecificForSignature(prefix = "") {
    if (!prefix) {
        return "0";
    }
    if (VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(prefix)) {
        return "0";
    }
    if (prefix === "mu") {
        return "mu";
    }
    if (prefix === "te") {
        return "te";
    }
    if (prefix === "ta") {
        return "ta";
    }
    return prefix;
}

function collapseSilentSpecificForDisplay(prefix = "") {
    if (!prefix) {
        return "";
    }
    if (VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(prefix)) {
        return "";
    }
    return prefix;
}

function getValence4ComboSignature({
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
}) {
    return [
        collapseProjectiveForSignature(objectPrefix),
        collapseSilentSpecificForSignature(indirectObjectMarker),
        collapseSilentSpecificForSignature(thirdObjectMarker),
    ].join("|");
}

function isValidValence4Combo(options = {}) {
    return VALENCE4_VALID_COMBO_SIGNATURES.has(getValence4ComboSignature(options));
}
