// core/generation/valency.js
// Bound-marker, object-allomorphy, passive, and reflexive support around generation.

"use strict";

function shouldDropBoundObjectPrefix(parsedVerb) {
    if (!parsedVerb || !parsedVerb.hasBoundMarker) {
        return false;
    }
    if ((parsedVerb.derivationValencyDelta || 0) > 0
        || parsedVerb.derivationType === DERIVATION_TYPE.causative
        || parsedVerb.derivationType === DERIVATION_TYPE.applicative) {
        return false;
    }
    const boundPrefixes = Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes : [];
    if (!boundPrefixes.length) {
        return false;
    }
    return boundPrefixes.some((prefix) => (
        SPECIFIC_VALENCE_PREFIX_SET.has(prefix)
        || OBJECT_MARKERS.has(prefix)
        || FUSION_PREFIXES.has(prefix)
    ));
}

function shouldDropOccupiedSourceObjectPrefix(parsedVerb) {
    if (!parsedVerb || (getOccupiedLexicalSourceObjectSlots(parsedVerb) <= 0)) {
        return false;
    }
    if ((parsedVerb.derivationValencyDelta || 0) > 0) {
        return false;
    }
    return getAvailableObjectSlots(parsedVerb) <= 0;
}

function applyBoundMarkerPrefixOverrides(parsedVerb, objectPrefix, baseObjectPrefix, options = {}) {
    const preserveOccupiedSourceObjectPrefix = options.preserveOccupiedSourceObjectPrefix === true;
    if (
        shouldDropBoundObjectPrefix(parsedVerb)
        || (!preserveOccupiedSourceObjectPrefix && shouldDropOccupiedSourceObjectPrefix(parsedVerb))
    ) {
        return { objectPrefix: "", baseObjectPrefix: "" };
    }
    return { objectPrefix, baseObjectPrefix };
}

function applyObjectAllomorphy({
    verb,
    analysisVerb,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    indirectObjectMarker,
    thirdObjectMarker = "",
    isTaFusion,
    isPassiveImpersonalMode,
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    supportivePrecedingSurface = "",
    hasNonspecificValence = false,
    hasSlashMarker = false,
    hasBoundMarker = false,
    directionalPrefix = "",
}) {
    const allomorphyObjectPrefix = !isPassiveImpersonalMode
        && isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)
        ? "mu"
        : objectPrefix;
    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix: allomorphyObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isTaFusion,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        supportivePrecedingSurface,
        hasNonspecificValence,
        hasSlashMarker,
        hasBoundMarker,
        directionalPrefix,
    });
    return {
        verb: nonspecificAllomorphy.verb,
        analysisVerb: nonspecificAllomorphy.analysisVerb,
        morphologyObjectPrefix: nonspecificAllomorphy.objectPrefix || allomorphyObjectPrefix,
    };
}

function applyPassiveImpersonalValencyAdjustments({
    isPassiveImpersonalMode,
    verb,
    analysisVerb,
    fusionPrefixes,
    targetValency,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    indirectObjectMarker,
    thirdObjectMarker = "",
    preserveSubjectForPassive,
    allowPassiveObject,
    morphologyObjectPrefix,
    hasPromotableObject,
}) {
    if (!isPassiveImpersonalMode) {
        return {
            verb,
            analysisVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            preserveSubjectForPassive,
            morphologyObjectPrefix,
        };
    }
    const clearObjectMarkers = () => {
        objectPrefix = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
    };
    let valencyAdjustedPrefix = false;
    const forceImpersonal = targetValency > 0 && !hasPromotableObject;
    if (forceImpersonal) {
        subjectPrefix = "";
        subjectSuffix = "";
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
    } else if (targetValency <= 0) {
        subjectPrefix = "";
        subjectSuffix = "";
        clearObjectMarkers();
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
    } else if (targetValency === 1) {
        clearObjectMarkers();
        preserveSubjectForPassive = true;
        valencyAdjustedPrefix = true;
    } else {
        preserveSubjectForPassive = true;
        if (fusionPrefixes.length && !allowPassiveObject) {
            clearObjectMarkers();
            valencyAdjustedPrefix = true;
        }
    }
    if (valencyAdjustedPrefix) {
        morphologyObjectPrefix = objectPrefix;
    }
    return {
        verb,
        analysisVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        preserveSubjectForPassive,
        morphologyObjectPrefix,
    };
}

function resetSubjectForNounTenses(tense, override, subjectPrefix, subjectSuffix) {
    if (tense === "sustantivo-verbal"
        || isPotencialProfileTense(tense)
        || tense === "agentivo"
        || tense === "agentivo-presente"
        || tense === "agentivo-preterito"
        || tense === "agentivo-futuro"
        || tense === "patientivo") {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectPrefix")) {
            subjectPrefix = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectSuffix")) {
            subjectSuffix = "";
        }
    }
    return { subjectPrefix, subjectSuffix };
}

function applyPassiveImpersonalOverrides({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    analysisVerb,
    preserveSubjectForPassive,
    allowPassiveObject,
}) {
    const updated = applyPassiveImpersonal({
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        analysisVerb,
        preserveSubject: preserveSubjectForPassive,
        allowObjectPrefix: allowPassiveObject,
    });
    return {
        subjectPrefix: updated.subjectPrefix,
        subjectSuffix: updated.subjectSuffix,
        objectPrefix: updated.objectPrefix,
        morphologyObjectPrefix: updated.objectPrefix,
    };
}

function applyReflexiveAutoSwitch({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    isPassiveImpersonal,
    clearError,
}) {
    let isReflexive = objectPrefix === "mu";
    if (!isPassiveImpersonal) {
        if (isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)) {
            objectPrefix = "mu";
            isReflexive = true;
            if (clearError) {
                clearError("object-prefix");
            }
        } else if (objectPrefix === "mu") {
            isReflexive = true;
        }
    }
    return { objectPrefix, isReflexive };
}
