"use strict";

// core/generation/morphology_support.js
// Shared morphology support helpers used across parsing, derivation, generation,
// output, and preterit context.
// Global-scope module: all functions defined directly on the global object.
// Deps (resolved at call time via global scope from script.js / other modules):
//   TENSE_SUFFIX_RULES, SPECIFIC_VALENCE_PREFIX_SET, NONSPECIFIC_VALENCE_AFFIX_SET
//   DEFAULT_PATIENTIVO_OWNERSHIP
//   composeObj1Chain, normalizeValenceMarkerOrder
//   getTotalVowelCountFromSyllables, getSyllables (phonology.js)

function normalizeMorphologySupportTenseValue(tenseValue = "") {
    return String(tenseValue || "").trim();
}

function applyTenseSuffixRules(tense, pers2) {
    tense = normalizeMorphologySupportTenseValue(tense);
    if (tense === "preterito") {
        return pers2;
    }
    const rules = TENSE_SUFFIX_RULES[tense];
    if (!rules || rules[pers2] === undefined) {
        return pers2;
    }
    return rules[pers2];
}

const AGENTIVO_NUMBER_SUFFIX_BY_SLOT = {
    "": "",
    t: "met",
    p: "wan",
};

function getAgentivoNumberSuffix(slot = "") {
    return Object.prototype.hasOwnProperty.call(AGENTIVO_NUMBER_SUFFIX_BY_SLOT, slot)
        ? AGENTIVO_NUMBER_SUFFIX_BY_SLOT[slot]
        : "";
}

function applyAgentivoNumberSuffix(habitualSuffix, slot = "") {
    const base = typeof habitualSuffix === "string" ? habitualSuffix : "";
    return `${base}${getAgentivoNumberSuffix(slot)}`;
}

function applyPatientivoAdjectiveNumberSuffix(slot = "") {
    return slot === "t" ? "met" : "ti";
}

function isWalThirdPersonMarker(value = "") {
    return value === "ki" || value === "kin" || value === "k";
}

function buildDirectionalMarkerChain({
    obj1Base = "",
    obj2 = "",
    obj3 = "",
    pers1 = "",
}) {
    return composeObj1Chain({
        obj1: obj1Base,
        markers: [obj2 || "", obj3 || ""],
        pers1,
    });
}

function buildWalDirectionalPlan({
    directionalOutputPrefix = "",
    pers1Base = "",
    obj1Base = "",
    obj2 = "",
    obj3 = "",
    directionalRuleMode = "",
    hasSubjectValent = true,
    isTaFusion = false,
    isIntransitiveVerb = false,
} = {}) {
    const normalizedDirectionalOutputPrefix = String(directionalOutputPrefix || "wal");
    const normalizedPers1 = String(pers1Base || "");
    const normalizedObj1Base = String(obj1Base || "");
    const normalizedObj2 = String(obj2 || "");
    const normalizedObj3 = String(obj3 || "");
    const normalizedDirectionalRuleMode = String(directionalRuleMode || "");
    const isThirdPersonSubject = normalizedPers1 === "";
    const hasRuntimeSecondValent = Boolean(
        normalizedObj1Base
        || normalizedObj2
        || normalizedObj3
        || isTaFusion
    );
    const hasRuntimeSpecificObject = [
        normalizedObj1Base,
        normalizedObj2,
        normalizedObj3,
    ].some((value) => SPECIFIC_VALENCE_PREFIX_SET.has(value) || value === "k");
    const effectiveDirectionalRuleMode = (
        (normalizedDirectionalRuleMode === "intransitive" && hasRuntimeSecondValent)
        || (normalizedDirectionalRuleMode === "nonspecific" && hasRuntimeSpecificObject)
    ) ? "" : normalizedDirectionalRuleMode;
    const forceTransitiveDirectional = effectiveDirectionalRuleMode === "transitive";
    const forceIntransitiveDirectional = effectiveDirectionalRuleMode === "intransitive";
    const forceNonspecificDirectional = effectiveDirectionalRuleMode === "nonspecific";
    const hasSecondValent = hasRuntimeSecondValent;
    const hasNonspecificObject = [
        normalizedObj1Base,
        normalizedObj2,
        normalizedObj3,
    ].some((value) => NONSPECIFIC_VALENCE_AFFIX_SET.has(value));
    const isMainlineThirdPersonObject = isWalThirdPersonMarker(normalizedObj1Base);
    const allowMainlineThirdPersonAlWithNonspecific = isMainlineThirdPersonObject && !forceNonspecificDirectional;
    const shouldUseAl = (forceTransitiveDirectional
        ? hasSubjectValent
        : (forceNonspecificDirectional
            ? (hasSubjectValent && !isThirdPersonSubject)
            : (forceIntransitiveDirectional
                ? (hasSubjectValent && !isThirdPersonSubject)
                : (!isIntransitiveVerb && hasSecondValent && hasSubjectValent))))
        && (!hasNonspecificObject || allowMainlineThirdPersonAlWithNonspecific);
    return {
        handler: "wal",
        shouldUseAl,
        directionalOutputPrefix: shouldUseAl ? "al" : normalizedDirectionalOutputPrefix,
        effectiveDirectionalRuleMode,
    };
}

function buildDirectionalLesson2SoundSpellingFrame(frameInput = {}, beforeValue = "", afterValue = "", role = "") {
    if (typeof buildLesson2SoundSpellingFrame !== "function") {
        return null;
    }
    const frame = buildLesson2SoundSpellingFrame(frameInput);
    if (!frame || !frame.ruleId) {
        return null;
    }
    const normalizedRole = String(role || frame.grammarSlot || "");
    return {
        ...frame,
        segmentRole: normalizedRole,
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || ""),
    };
}

function pushDirectionalLesson2SoundSpellingFrame(frames = [], frameInput = {}, beforeValue = "", afterValue = "", role = "") {
    if (!Array.isArray(frames)) {
        return;
    }
    const frame = buildDirectionalLesson2SoundSpellingFrame(frameInput, beforeValue, afterValue, role);
    if (!frame) {
        return;
    }
    const key = [
        frame.ruleId || "",
        frame.grammarSlot || "",
        frame.syllablePosition || "",
        frame.sourceSurface || "",
        frame.target || "",
        Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "",
        frame.segmentRole || "",
        frame.sourceSegmentValue || "",
        frame.targetSegmentValue || "",
    ].join(":");
    if (key && frames.some((entry) => [
        entry.ruleId || "",
        entry.grammarSlot || "",
        entry.syllablePosition || "",
        entry.sourceSurface || "",
        entry.target || "",
        Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "",
        entry.segmentRole || "",
        entry.sourceSegmentValue || "",
        entry.targetSegmentValue || "",
    ].join(":") === key)) {
        return;
    }
    frames.push(frame);
}

function realizeWalDirectionalChain({
    pers1 = "",
    obj1 = "",
    tronco = "",
    directionalChainMeta = null,
}) {
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    if (!meta || meta.directionalInputPrefix !== "wal") {
        return { pers1, obj1, tronco };
    }
    const basePers1 = String(meta.pers1Base || meta.baseSubjectPrefix || pers1 || "");
    const basePers2 = String(meta.pers2Base || meta.baseSubjectSuffix || "");
    const baseObj1 = String(meta.obj1Base || meta.baseObjectPrefix || "");
    const baseObj2 = String(meta.obj2 || meta.indirectObjectMarker || "");
    const baseObj3 = String(meta.obj3 || meta.thirdObjectMarker || "");
    const directionalRuleMode = String(meta.directionalRuleMode || "");
    const directionalInputPrefix = String(meta.directionalInputPrefix || "wal");
    const tense = normalizeMorphologySupportTenseValue(meta.tense || "");
    const isIntransitiveVerb = meta.isIntransitiveVerb === true;
    const hasSubjectValent = meta.hasSubjectValent !== false;
    const isTaFusion = meta.isTaFusion === true;
    const isYawi = meta.isYawi === true;
    const directionalPlan = meta.directionalPlan && typeof meta.directionalPlan === "object"
        ? meta.directionalPlan
        : buildWalDirectionalPlan({
            directionalOutputPrefix: meta.directionalOutputPrefix || directionalInputPrefix,
            pers1Base: basePers1,
            obj1Base: baseObj1,
            obj2: baseObj2,
            obj3: baseObj3,
            directionalRuleMode,
            hasSubjectValent,
            isTaFusion,
            isIntransitiveVerb,
        });
    const directionalOutputPrefix = String(
        directionalPlan.directionalOutputPrefix
        || meta.directionalOutputPrefix
        || directionalInputPrefix
        || "wal"
    );
    const effectiveDirectionalRuleMode = Object.prototype.hasOwnProperty.call(
        directionalPlan,
        "effectiveDirectionalRuleMode"
    )
        ? String(directionalPlan.effectiveDirectionalRuleMode || "")
        : String(directionalRuleMode || "");
    const isFirstPersonSubject = basePers1 === "ni" || basePers1 === "n";
    const isSecondPersonSubject = basePers1 === "ti" || basePers1 === "t";
    const isThirdPersonSubject = basePers1 === "";
    const isSecondPluralSubject = basePers1 === "an";
    const isMainlineThirdPersonObject = isWalThirdPersonMarker(baseObj1);
    const hasThirdPersonObject = [baseObj1, baseObj2, baseObj3]
        .some((value) => isWalThirdPersonMarker(value));
    const hasNonspecificObject = [baseObj1, baseObj2, baseObj3]
        .some((value) => NONSPECIFIC_VALENCE_AFFIX_SET.has(value));
    const shouldUseAl = directionalPlan.shouldUseAl === true;
    let realizedPers1 = String(pers1 || "");
    let realizedObj1 = String(obj1 || "");
    let realizedTronco = String(tronco || "");
    const soundSpellingFrames = [];
    if (realizedTronco.startsWith(directionalInputPrefix)) {
        realizedTronco = realizedTronco.slice(directionalInputPrefix.length);
        if (isYawi && realizedTronco.startsWith("ya")) {
            realizedTronco = realizedTronco.slice(1);
        }
    }
    if (!shouldUseAl) {
        const markerChain = buildDirectionalMarkerChain({
            obj1Base: baseObj1,
            obj2: baseObj2,
            obj3: baseObj3,
            pers1: basePers1,
        });
        realizedObj1 = normalizeValenceMarkerOrder(`${directionalOutputPrefix}${markerChain}`);
        return {
            pers1: realizedPers1,
            obj1: realizedObj1,
            tronco: realizedTronco,
            soundSpellingFrames,
        };
    }
    const realizedDirectionalPrefix = "al";
    if (isFirstPersonSubject) {
        if (realizedPers1 !== "n") {
            pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
                ruleId: "pers1-ni-before-vowel-n",
                source: realizedPers1 || "ni",
                target: "n",
                slot: "pers1",
                syllablePosition: "pers1-obj1-boundary",
            }, realizedPers1 || "ni", "n", "pers1");
        }
        realizedPers1 = "n";
    } else if (isSecondPersonSubject && realizedPers1 !== "shi") {
        if (realizedPers1 !== "t") {
            pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
                ruleId: "pers1-ti-before-vowel-t",
                source: realizedPers1 || "ti",
                target: "t",
                slot: "pers1",
                syllablePosition: "pers1-obj1-boundary",
            }, realizedPers1 || "ti", "t", "pers1");
        }
        realizedPers1 = "t";
    } else if (isThirdPersonSubject && !hasThirdPersonObject && !hasNonspecificObject) {
        realizedPers1 = "k";
    }
    if (isMainlineThirdPersonObject) {
        const isOptativeSecondPlural =
            tense === "optativo"
            && basePers1 === "an"
            && basePers2 === "t";
        const dropLeadK = (
            isFirstPersonSubject
            || isSecondPersonSubject
            || isOptativeSecondPlural
            || effectiveDirectionalRuleMode === "intransitive"
            || effectiveDirectionalRuleMode === "nonspecific"
        );
        const primaryBase = `${dropLeadK ? "" : "k"}${baseObj1 === "kin" ? "in" : ""}`;
        const markerHead = buildDirectionalMarkerChain({
            obj1Base: primaryBase,
            obj2: baseObj2,
            obj3: baseObj3,
            pers1: basePers1,
        });
        realizedObj1 = markerHead.startsWith("k")
            ? `k${realizedDirectionalPrefix}${markerHead.slice(1)}`
            : `${realizedDirectionalPrefix}${markerHead}`;
    } else if (hasThirdPersonObject) {
        const markerChain = buildDirectionalMarkerChain({
            obj1Base: baseObj1,
            obj2: baseObj2,
            obj3: baseObj3,
            pers1: basePers1,
        });
        const startsWithK = markerChain.startsWith("k");
        const markerTail = startsWithK ? markerChain.slice(1) : markerChain;
        const shouldDropLeadK = startsWithK
            && (
                isFirstPersonSubject
                || isSecondPersonSubject
                || (
                    isThirdPersonSubject
                    && effectiveDirectionalRuleMode === "nonspecific"
                )
            );
        const shouldPreposeKBeforeDirectional = startsWithK && isSecondPluralSubject;
        if (shouldPreposeKBeforeDirectional) {
            realizedObj1 = `k${realizedDirectionalPrefix}${markerTail}`;
        } else if (shouldDropLeadK) {
            realizedObj1 = `${realizedDirectionalPrefix}${markerTail}`;
        } else {
            realizedObj1 = `${realizedDirectionalPrefix}${markerChain}`;
        }
    } else {
        const markerChain = buildDirectionalMarkerChain({
            obj1Base: baseObj1,
            obj2: baseObj2,
            obj3: baseObj3,
            pers1: basePers1,
        });
        realizedObj1 = `${realizedDirectionalPrefix}${markerChain}`;
    }
    if (realizedObj1.endsWith("i") && realizedTronco.startsWith("i")) {
        const beforeTronco = realizedTronco;
        realizedTronco = realizedTronco.slice(1);
        pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
            ruleId: "object-i-stem-i-elision",
            source: "i",
            target: "",
            slot: "stem-initial",
            syllablePosition: "after-i-object",
        }, beforeTronco, realizedTronco, "tronco");
    }
    const isOptativeSecondPersonBase =
        tense === "optativo"
        && (
            (basePers1 === "ti" && basePers2 === "")
            || (basePers1 === "an" && basePers2 === "t")
        );
    if (isOptativeSecondPersonBase && realizedPers1 === "shi" && realizedObj1.startsWith("al")) {
        pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
            ruleId: "optative-shi-before-al-sh",
            source: "shi",
            target: "sh",
            slot: "pers1",
            syllablePosition: "before-al-object",
        }, "shi", "sh", "pers1");
        realizedPers1 = "sh";
    }
    return {
        pers1: realizedPers1,
        obj1: normalizeValenceMarkerOrder(realizedObj1),
        tronco: realizedTronco,
        soundSpellingFrames,
    };
}

function realizeRegularDirectionalChain({
    pers1 = "",
    obj1 = "",
    tronco = "",
    directionalChainMeta = null,
}) {
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    const directionalInputPrefix = String(meta?.directionalInputPrefix || "");
    const directionalOutputPrefix = String(meta?.directionalOutputPrefix || directionalInputPrefix || "");
    if (!directionalInputPrefix || !directionalOutputPrefix) {
        return { pers1, obj1, tronco, soundSpellingFrames: [] };
    }
    const basePers1 = String(meta.pers1Base || meta.baseSubjectPrefix || pers1 || "");
    const baseObj1 = String(meta.obj1Base || meta.baseObjectPrefix || obj1 || "");
    const baseObj2 = String(meta.obj2 || meta.indirectObjectMarker || "");
    const baseObj3 = String(meta.obj3 || meta.thirdObjectMarker || "");
    const soundSpellingFrames = [];
    let realizedPers1 = String(pers1 || "");
    let realizedTronco = String(tronco || "");
    if (realizedTronco.startsWith(directionalInputPrefix)) {
        realizedTronco = realizedTronco.slice(directionalInputPrefix.length);
    }
    if (/^[aeiu]/.test(directionalOutputPrefix)) {
        if (basePers1 === "ni" || basePers1 === "n") {
            if (realizedPers1 !== "n") {
                pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
                    ruleId: "pers1-ni-before-vowel-n",
                    source: realizedPers1 || "ni",
                    target: "n",
                    slot: "pers1",
                    syllablePosition: "pers1-obj1-boundary",
                }, realizedPers1 || "ni", "n", "pers1");
            }
            realizedPers1 = "n";
        } else if (basePers1 === "ti" || basePers1 === "t") {
            if (realizedPers1 !== "t") {
                pushDirectionalLesson2SoundSpellingFrame(soundSpellingFrames, {
                    ruleId: "pers1-ti-before-vowel-t",
                    source: realizedPers1 || "ti",
                    target: "t",
                    slot: "pers1",
                    syllablePosition: "pers1-obj1-boundary",
                }, realizedPers1 || "ti", "t", "pers1");
            }
            realizedPers1 = "t";
        }
    }
    const markerChain = buildDirectionalMarkerChain({
        obj1Base: baseObj1,
        obj2: baseObj2,
        obj3: baseObj3,
        pers1: basePers1,
    });
    return {
        pers1: realizedPers1,
        obj1: normalizeValenceMarkerOrder(`${directionalOutputPrefix}${markerChain}`),
        tronco: realizedTronco,
        soundSpellingFrames,
    };
}

function resolveDirectionalOutputChain({
    pers1 = "",
    obj1 = "",
    tronco = "",
    directionalChainMeta = null,
}) {
    const meta = directionalChainMeta && typeof directionalChainMeta === "object"
        ? directionalChainMeta
        : null;
    if (!meta || !meta.directionalInputPrefix || meta.isNounTense === true) {
        return { pers1, obj1, tronco };
    }
    if (meta.directionalInputPrefix === "wal") {
        const realized = realizeWalDirectionalChain({
            pers1,
            obj1,
            tronco,
            directionalChainMeta: meta,
        });
        return {
            pers1: realized.pers1,
            obj1: realized.obj1,
            tronco: realized.tronco,
            soundSpellingFrames: Array.isArray(realized.soundSpellingFrames)
                ? realized.soundSpellingFrames
                : [],
        };
    }
    return realizeRegularDirectionalChain({
        pers1,
        obj1,
        tronco,
        directionalChainMeta: meta,
    });
}

function adjustPatientivoPossessiveSuffix(
    suffix,
    isPossessed,
    ownershipType = DEFAULT_PATIENTIVO_OWNERSHIP,
    options = {}
) {
    if (!isPossessed) {
        return suffix || "";
    }
    const normalizedSuffix = suffix || "";
    const useOrganic = ownershipType === "yu";
    const useZero = ownershipType === "zero";
    const stem = typeof options.stem === "string" ? options.stem : "";
    if (!normalizedSuffix) {
        if (useOrganic && stem.endsWith("l")) {
            return "yu";
        }
        if (useZero) {
            return "";
        }
        return null;
    }
    if (normalizedSuffix.endsWith("met")) {
        const base = normalizedSuffix.slice(0, -3);
        return useOrganic ? `${base}yuwan` : `${base}wan`;
    }
    if (normalizedSuffix.endsWith("wan")) {
        const base = normalizedSuffix.slice(0, -3);
        return useOrganic ? `${base}yuwan` : normalizedSuffix;
    }
    if (normalizedSuffix === "ti") {
        if (useOrganic) {
            return "yu";
        }
        if (useZero) {
            return "";
        }
        return stem && !/[aeiu]$/.test(stem) ? "" : null;
    }
    if (normalizedSuffix === "in") {
        if (useOrganic) {
            return "yu";
        }
        if (useZero) {
            return "";
        }
        return stem && !/[aeiu]$/.test(stem) ? "" : "w";
    }
    if (normalizedSuffix === "t") {
        if (useOrganic) {
            return "yu";
        }
        if (useZero) {
            return "";
        }
        return stem && !/[aeiu]$/.test(stem) ? "" : "w";
    }
    return normalizedSuffix;
}

function startsWithAny(value, prefixes) {
    return prefixes.some((prefix) => value.startsWith(prefix));
}

function getTotalVowelCount(verb) {
    return getTotalVowelCountFromSyllables(getSyllables(verb));
}
