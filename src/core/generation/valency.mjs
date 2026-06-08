// Native wrapper generated from src/core/generation/valency.js.

export function createGenerationValencyApi(targetObject = globalThis) {
    function shouldDropBoundObjectPrefix(parsedVerb) {
      if (!parsedVerb || !parsedVerb.hasBoundMarker) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0 || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.applicative) {
        return false;
      }
      const boundPrefixes = Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes : [];
      if (!boundPrefixes.length) {
        return false;
      }
      return boundPrefixes.some(prefix => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || targetObject.OBJECT_MARKERS.has(prefix) || targetObject.FUSION_PREFIXES.has(prefix));
    }
    function shouldDropOccupiedSourceObjectPrefix(parsedVerb) {
      if (!parsedVerb || targetObject.getOccupiedLexicalSourceObjectSlots(parsedVerb) <= 0) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0) {
        return false;
      }
      return targetObject.getAvailableObjectSlots(parsedVerb) <= 0;
    }
    function applyBoundMarkerPrefixOverrides(parsedVerb, objectPrefix, baseObjectPrefix, options = {}) {
      const preserveOccupiedSourceObjectPrefix = options.preserveOccupiedSourceObjectPrefix === true;
      if (shouldDropBoundObjectPrefix(parsedVerb) || !preserveOccupiedSourceObjectPrefix && shouldDropOccupiedSourceObjectPrefix(parsedVerb)) {
        return {
          objectPrefix: "",
          baseObjectPrefix: ""
        };
      }
      return {
        objectPrefix,
        baseObjectPrefix
      };
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
      directionalPrefix = ""
    }) {
      const allomorphyObjectPrefix = !isPassiveImpersonalMode && targetObject.isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix) ? "mu" : objectPrefix;
      const nonspecificAllomorphy = targetObject.applyNonspecificObjectAllomorphy({
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
        directionalPrefix
      });
      return {
        verb: nonspecificAllomorphy.verb,
        analysisVerb: nonspecificAllomorphy.analysisVerb,
        morphologyObjectPrefix: nonspecificAllomorphy.objectPrefix || allomorphyObjectPrefix
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
      hasPromotableObject
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
          morphologyObjectPrefix
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
        morphologyObjectPrefix
      };
    }
    function resetSubjectForNounTenses(tense, override, subjectPrefix, subjectSuffix) {
      if (tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "agentivo-presente" || tense === "agentivo-preterito" || tense === "agentivo-futuro" || tense === "patientivo") {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectPrefix")) {
          subjectPrefix = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectSuffix")) {
          subjectSuffix = "";
        }
      }
      return {
        subjectPrefix,
        subjectSuffix
      };
    }
    function applyPassiveImpersonalOverrides({
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      analysisVerb,
      preserveSubjectForPassive,
      allowPassiveObject
    }) {
      const updated = targetObject.applyPassiveImpersonal({
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        analysisVerb,
        preserveSubject: preserveSubjectForPassive,
        allowObjectPrefix: allowPassiveObject
      });
      return {
        subjectPrefix: updated.subjectPrefix,
        subjectSuffix: updated.subjectSuffix,
        objectPrefix: updated.objectPrefix,
        morphologyObjectPrefix: updated.objectPrefix
      };
    }
    function applyReflexiveAutoSwitch({
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      isPassiveImpersonal,
      clearError
    }) {
      let isReflexive = objectPrefix === "mu";
      if (!isPassiveImpersonal) {
        if (targetObject.isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)) {
          objectPrefix = "mu";
          isReflexive = true;
          if (clearError) {
            clearError("object-prefix");
          }
        } else if (objectPrefix === "mu") {
          isReflexive = true;
        }
      }
      return {
        objectPrefix,
        isReflexive
      };
    }

    const api = {};
    api.shouldDropBoundObjectPrefix = shouldDropBoundObjectPrefix;
    api.shouldDropOccupiedSourceObjectPrefix = shouldDropOccupiedSourceObjectPrefix;
    api.applyBoundMarkerPrefixOverrides = applyBoundMarkerPrefixOverrides;
    api.applyObjectAllomorphy = applyObjectAllomorphy;
    api.applyPassiveImpersonalValencyAdjustments = applyPassiveImpersonalValencyAdjustments;
    api.resetSubjectForNounTenses = resetSubjectForNounTenses;
    api.applyPassiveImpersonalOverrides = applyPassiveImpersonalOverrides;
    api.applyReflexiveAutoSwitch = applyReflexiveAutoSwitch;
    return api;
}

export function installGenerationValencyGlobals(targetObject = globalThis) {
    const api = createGenerationValencyApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
