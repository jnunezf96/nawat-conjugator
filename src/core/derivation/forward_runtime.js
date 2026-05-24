// core/derivation/forward_runtime.js
// Forward-derivation runtime helpers shared by parsing, noun derivation, panels,
// and vnc generation support.

"use strict";

function getForwardDerivationConfig(derivationType = "") {
    if (derivationType === DERIVATION_TYPE.causative) {
        return {
            apply: applyCausativeDerivation,
            enableFlagKey: "isCausative",
            noStemKey: "noCausativeStem",
            stemsKey: "causativeAllStems",
            stemSpecsKey: "causativeAllStemSpecs",
            resultField: "causativeAllStems",
            resultSpecField: "causativeAllStemSpecs",
        };
    }
    if (derivationType === DERIVATION_TYPE.applicative) {
        return {
            apply: applyApplicativeDerivation,
            enableFlagKey: "isApplicative",
            noStemKey: "noApplicativeStem",
            stemsKey: "applicativeAllStems",
            stemSpecsKey: "applicativeAllStemSpecs",
            resultField: "applicativeAllStems",
            resultSpecField: "applicativeAllStemSpecs",
        };
    }
    return null;
}

var FORWARD_DERIVATION_STAGE_ORDER = Object.freeze([
    "causative",
    "applicative",
]);

function getDerivedStemPoolValue(resultField = "", pool = null) {
    if (!resultField || !pool || typeof pool !== "object") {
        return null;
    }
    return pool[resultField] || null;
}

function getDerivedStemPoolSpecValue(resultField = "", pool = null) {
    if (!resultField || !pool || typeof pool !== "object") {
        return null;
    }
    return pool[resultField] || null;
}

function runForwardDerivation({
    derivationType = "",
    derivationOptions = null,
    enabled = true,
}) {
    const config = getForwardDerivationConfig(derivationType);
    if (!config) {
        return { config: null, derivationResult: null };
    }
    const derivationResult = config.apply({
        ...(derivationOptions || {}),
        [config.enableFlagKey]: enabled,
    });
    return {
        config,
        derivationResult,
    };
}

function applySelectedForwardDerivation({
    derivationType = "",
    derivationOptions = null,
    uniqueStems = null,
    enabled = true,
}) {
    const result = {
        blocked: false,
        verb: derivationOptions?.verb || "",
        analysisVerb: derivationOptions?.analysisVerb || "",
        isYawi: derivationOptions?.isYawi === true,
        suppletiveStemSet: derivationOptions?.suppletiveStemSet || null,
        causativeAllStems: null,
        causativeAllStemSpecs: null,
        applicativeAllStems: null,
        applicativeAllStemSpecs: null,
        selectedForwardMeta: null,
    };
    const forwardDerivation = runForwardDerivation({
        derivationType,
        derivationOptions,
        enabled,
    });
    if (forwardDerivation.config && forwardDerivation.derivationResult) {
        const { config, derivationResult } = forwardDerivation;
        if (enabled && derivationResult[config.noStemKey]) {
            result.blocked = true;
            return result;
        }
        result.verb = derivationResult.verb || result.verb;
        result.analysisVerb = derivationResult.analysisVerb || result.analysisVerb;
        result.isYawi = derivationResult.isYawi;
        result.suppletiveStemSet = derivationResult.suppletiveStemSet;
        const derivedStems = typeof uniqueStems === "function"
            ? uniqueStems(derivationResult[config.stemsKey])
            : derivationResult[config.stemsKey];
        const derivedStemSpecs = Array.isArray(derivationResult[config.stemSpecsKey])
            ? getUniqueMorphStemSpecs(derivationResult[config.stemSpecsKey])
            : null;
        if (config.resultField) {
            result[config.resultField] = derivedStems;
        }
        if (config.resultSpecField) {
            result[config.resultSpecField] = derivedStemSpecs;
        }
        result.selectedForwardMeta = derivationResult.selectedForwardMeta || null;
        return result;
    }
    return result;
}

function extractForwardDerivationState(stage = null, fallback = {}) {
    return {
        verb: stage?.verb ?? fallback.verb ?? "",
        analysisVerb: stage?.analysisVerb ?? fallback.analysisVerb ?? "",
        isYawi: stage?.isYawi ?? (fallback.isYawi === true),
        suppletiveStemSet: stage?.suppletiveStemSet ?? fallback.suppletiveStemSet ?? null,
    };
}

function resolveStemCollectionPool({
    isNonactive = false,
    nonactiveAllStems = null,
    nonactiveAllStemSpecs = null,
    resolvedDerivationType = "",
    causativeAllStems = null,
    applicativeAllStems = null,
    causativeAllStemSpecs = null,
    applicativeAllStemSpecs = null,
}) {
    if (isNonactive) {
        if (Array.isArray(nonactiveAllStemSpecs) && nonactiveAllStemSpecs.length) {
            return nonactiveAllStemSpecs;
        }
        return nonactiveAllStems;
    }
    const forwardConfig = getForwardDerivationConfig(resolvedDerivationType);
    if (!forwardConfig) {
        return null;
    }
    const specPool = getDerivedStemPoolSpecValue(forwardConfig.resultSpecField, {
        causativeAllStemSpecs,
        applicativeAllStemSpecs,
    });
    if (Array.isArray(specPool) && specPool.length) {
        return specPool;
    }
    return getDerivedStemPoolValue(forwardConfig.resultField, {
        causativeAllStems,
        applicativeAllStems,
    });
}
