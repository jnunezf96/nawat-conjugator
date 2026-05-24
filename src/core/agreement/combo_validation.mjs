const PERSON_MARKERS = new Set(["nech", "metz", "ki", "tech", "metzin", "kin", "k"]);

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

export function createComboValidationApi(targetObject = globalThis) {
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
        const normalized = targetObject.resolveDisplayValencePrefixes({
            objectPrefix,
            indirectObjectMarker,
            derivationType,
        });
        const object = normalized.objectPrefix || "";
        const indirect = normalized.indirectObjectMarker || "";
        const pickByPriority = (ordered) => {
            const personMatch = ordered.find((prefix) => PERSON_MARKERS.has(prefix));
            if (personMatch) {
                return personMatch;
            }
            return ordered.find((prefix) => Boolean(prefix)) || "";
        };
        const slotValues = {
            object,
            object2: indirect,
        };
        const orderedByDerivation = targetObject.getDerivationControllerSlotPriority(derivationType)
            .map((slotId) => slotValues[slotId] || "");
        return pickByPriority(orderedByDerivation);
    }

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

    return {
        getComboKey,
        resolveComboValidationObjectPrefix,
        collapseProjectiveForSignature,
        collapseSilentSpecificForSignature,
        collapseSilentSpecificForDisplay,
        getValence4ComboSignature,
        isValidValence4Combo,
    };
}

export function installComboValidationGlobals(targetObject = globalThis) {
    const api = createComboValidationApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
