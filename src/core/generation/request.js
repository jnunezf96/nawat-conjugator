// core/generation/request.js
// Request/options preparation helpers for generateWord().

"use strict";

function getPrefixInputs({
    override,
    subjectPrefixInput,
    subjectSuffixInput,
    verbInput,
    verbInputSource = null,
}) {
    const resolvedVerbInputSource = (
        verbInputSource && typeof verbInputSource === "object"
    )
        ? verbInputSource
        : resolveVerbInputSource(verbInput?.value || "");
    return {
        subjectPrefix: override?.subjectPrefix ?? subjectPrefixInput.value,
        objectPrefix: override?.objectPrefix ?? getCurrentObjectPrefix(),
        verb: override?.verb ?? resolvedVerbInputSource.parseValue ?? verbInput.value,
        subjectSuffix: override?.subjectSuffix ?? subjectSuffixInput.value,
        possessivePrefix: override?.possessivePrefix ?? "",
    };
}

function normalizeGenerateWordOptions(options = {}) {
    const normalized = options && typeof options === "object"
        ? { ...options }
        : {};
    const hasCanonical = Object.prototype.hasOwnProperty.call(normalized, "skipValidation");
    const hasLegacy = Object.prototype.hasOwnProperty.call(normalized, "skipTransitivityValidation");
    if (!hasCanonical && hasLegacy) {
        normalized.skipValidation = normalized.skipTransitivityValidation === true;
    }
    return normalized;
}

function canReusePreParsedVerb({
    parsedVerb = null,
    rawVerb = "",
}) {
    if (!parsedVerb || typeof parsedVerb !== "object") {
        return false;
    }
    const candidateSourceRaw = typeof parsedVerb.sourceRawVerb === "string"
        ? parsedVerb.sourceRawVerb
        : "";
    if (!candidateSourceRaw) {
        return false;
    }
    return candidateSourceRaw === String(rawVerb || "");
}

let hasWarnedRenderOnlyTenseDeprecation = false;

function shouldLogGenerateWordDeprecationWarning() {
    if (
        typeof process !== "undefined"
        && process
        && process.env
        && process.env.NODE_ENV === "production"
    ) {
        return false;
    }
    return true;
}

function warnRenderOnlyTenseDeprecationOnce() {
    if (hasWarnedRenderOnlyTenseDeprecation) {
        return;
    }
    hasWarnedRenderOnlyTenseDeprecation = true;
    if (
        shouldLogGenerateWordDeprecationWarning()
        && typeof console !== "undefined"
        && typeof console.warn === "function"
    ) {
        console.warn("[generateWord] option `renderOnlyTense` is deprecated and ignored.");
    }
}

function sanitizeGenerateWordOptions(options = {}) {
    const normalized = normalizeGenerateWordOptions(options);
    if (Object.prototype.hasOwnProperty.call(normalized, "renderOnlyTense")) {
        warnRenderOnlyTenseDeprecationOnce();
        delete normalized.renderOnlyTense;
    }
    return normalized;
}
