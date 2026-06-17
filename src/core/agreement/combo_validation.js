"use strict";

// core/agreement/combo_validation.js
// Shared valence-combo validation and display helpers.
// Global-scope module: all functions defined directly on the global object.
// Deps (resolved at call time via global scope from script.js / other modules):
//   resolveDisplayObj1Obj2, getDerivationControllerSlotPriority

function getPers1Obj1Pers2Key(pers1 = "", obj1 = "", pers2 = "") {
    return `${pers1}|${obj1}|${pers2}`;
}

function resolveComboValidationObj1({
    obj1 = "",
    obj2 = "",
    derivationType = "",
    controllerObj1 = null,
}) {
    if (controllerObj1 !== null) {
        return controllerObj1 || "";
    }
    const normalized = resolveDisplayObj1Obj2({
        obj1,
        obj2,
        derivationType,
    });
    const resolvedObj1 = normalized.obj1 || "";
    const resolvedObj2 = normalized.obj2 || "";
    const personMarkers = new Set(["nech", "metz", "ki", "tech", "metzin", "kin", "k"]);
    const pickByPriority = (ordered) => {
        const personMatch = ordered.find((prefix) => personMarkers.has(prefix));
        if (personMatch) {
            return personMatch;
        }
        return ordered.find((prefix) => Boolean(prefix)) || "";
    };
    const slotValues = {
        object: resolvedObj1,
        object2: resolvedObj2,
        obj1: resolvedObj1,
        obj2: resolvedObj2,
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

function getObj1Obj2Obj3Signature({
    obj1 = "",
    obj2 = "",
    obj3 = "",
}) {
    return [
        collapseProjectiveForSignature(obj1),
        collapseSilentSpecificForSignature(obj2),
        collapseSilentSpecificForSignature(obj3),
    ].join("|");
}

function isValidObj1Obj2Obj3Combo(options = {}) {
    return VALENCE4_VALID_COMBO_SIGNATURES.has(getObj1Obj2Obj3Signature(options));
}
