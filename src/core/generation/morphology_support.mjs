const AGENTIVO_NUMBER_SUFFIX_BY_SLOT = {
    "": "",
    t: "met",
    p: "wan",
};

export function createMorphologySupportApi(targetObject = globalThis) {
    const getSpecificValencePrefixSet = () => targetObject.SPECIFIC_VALENCE_PREFIX_SET || new Set();
    const getNonspecificValenceAffixSet = () => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET || new Set();

    function applyTenseSuffixRules(tense, subjectSuffix) {
        if (tense === "preterito") {
            return subjectSuffix;
        }
        const rules = targetObject.TENSE_SUFFIX_RULES?.[tense];
        if (!rules || rules[subjectSuffix] === undefined) {
            return subjectSuffix;
        }
        return rules[subjectSuffix];
    }

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
        baseObjectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        subjectPrefix = "",
    }) {
        return targetObject.composeProjectiveObjectPrefix({
            objectPrefix: baseObjectPrefix,
            markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
            subjectPrefix,
        });
    }

    function buildWalDirectionalPlan({
        directionalOutputPrefix = "",
        baseSubjectPrefix = "",
        baseObjectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        directionalRuleMode = "",
        hasSubjectValent = true,
        isTaFusion = false,
        isIntransitiveVerb = false,
    } = {}) {
        const specificPrefixSet = getSpecificValencePrefixSet();
        const nonspecificAffixSet = getNonspecificValenceAffixSet();
        const normalizedDirectionalOutputPrefix = String(directionalOutputPrefix || "wal");
        const normalizedSubjectPrefix = String(baseSubjectPrefix || "");
        const normalizedBaseObjectPrefix = String(baseObjectPrefix || "");
        const normalizedIndirectObjectMarker = String(indirectObjectMarker || "");
        const normalizedThirdObjectMarker = String(thirdObjectMarker || "");
        const normalizedDirectionalRuleMode = String(directionalRuleMode || "");
        const isThirdPersonSubject = normalizedSubjectPrefix === "";
        const hasRuntimeSecondValent = Boolean(
            normalizedBaseObjectPrefix
            || normalizedIndirectObjectMarker
            || normalizedThirdObjectMarker
            || isTaFusion
        );
        const hasRuntimeSpecificObject = [
            normalizedBaseObjectPrefix,
            normalizedIndirectObjectMarker,
            normalizedThirdObjectMarker,
        ].some((value) => specificPrefixSet.has(value) || value === "k");
        const effectiveDirectionalRuleMode = (
            (normalizedDirectionalRuleMode === "intransitive" && hasRuntimeSecondValent)
            || (normalizedDirectionalRuleMode === "nonspecific" && hasRuntimeSpecificObject)
        ) ? "" : normalizedDirectionalRuleMode;
        const forceTransitiveDirectional = effectiveDirectionalRuleMode === "transitive";
        const forceIntransitiveDirectional = effectiveDirectionalRuleMode === "intransitive";
        const forceNonspecificDirectional = effectiveDirectionalRuleMode === "nonspecific";
        const hasSecondValent = hasRuntimeSecondValent;
        const hasNonspecificObject = [
            normalizedBaseObjectPrefix,
            normalizedIndirectObjectMarker,
            normalizedThirdObjectMarker,
        ].some((value) => nonspecificAffixSet.has(value));
        const isMainlineThirdPersonObject = isWalThirdPersonMarker(normalizedBaseObjectPrefix);
        const allowMainlineThirdPersonAlWithNonspecific = isMainlineThirdPersonObject && !forceNonspecificDirectional;
        const shouldUseAl = (forceTransitiveDirectional
            ? hasSubjectValent
            : (forceNonspecificDirectional
                ? (hasSubjectValent && !isThirdPersonSubject)
                : (!forceIntransitiveDirectional && !isIntransitiveVerb && hasSecondValent && hasSubjectValent)))
            && (!hasNonspecificObject || allowMainlineThirdPersonAlWithNonspecific);
        return {
            handler: "wal",
            shouldUseAl,
            directionalOutputPrefix: shouldUseAl ? "al" : normalizedDirectionalOutputPrefix,
            effectiveDirectionalRuleMode,
        };
    }

    function realizeWalDirectionalChain({
        subjectPrefix = "",
        objectPrefix = "",
        verb = "",
        directionalChainMeta = null,
    }) {
        const nonspecificAffixSet = getNonspecificValenceAffixSet();
        const meta = directionalChainMeta && typeof directionalChainMeta === "object"
            ? directionalChainMeta
            : null;
        if (!meta || meta.directionalInputPrefix !== "wal") {
            return { subjectPrefix, objectPrefix, verb };
        }
        const baseSubjectPrefix = String(meta.baseSubjectPrefix || subjectPrefix || "");
        const baseSubjectSuffix = String(meta.baseSubjectSuffix || "");
        const baseObjectPrefix = String(meta.baseObjectPrefix || "");
        const indirectObjectMarker = String(meta.indirectObjectMarker || "");
        const thirdObjectMarker = String(meta.thirdObjectMarker || "");
        const directionalRuleMode = String(meta.directionalRuleMode || "");
        const directionalInputPrefix = String(meta.directionalInputPrefix || "wal");
        const tense = String(meta.tense || "");
        const isIntransitiveVerb = meta.isIntransitiveVerb === true;
        const hasSubjectValent = meta.hasSubjectValent !== false;
        const isTaFusion = meta.isTaFusion === true;
        const isYawi = meta.isYawi === true;
        const directionalPlan = meta.directionalPlan && typeof meta.directionalPlan === "object"
            ? meta.directionalPlan
            : buildWalDirectionalPlan({
                directionalOutputPrefix: meta.directionalOutputPrefix || directionalInputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
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
        const isFirstPersonSubject = baseSubjectPrefix === "ni" || baseSubjectPrefix === "n";
        const isSecondPersonSubject = baseSubjectPrefix === "ti" || baseSubjectPrefix === "t";
        const isThirdPersonSubject = baseSubjectPrefix === "";
        const isSecondPluralSubject = baseSubjectPrefix === "an";
        const isMainlineThirdPersonObject = isWalThirdPersonMarker(baseObjectPrefix);
        const hasThirdPersonObject = [baseObjectPrefix, indirectObjectMarker, thirdObjectMarker]
            .some((value) => isWalThirdPersonMarker(value));
        const hasNonspecificObject = [baseObjectPrefix, indirectObjectMarker, thirdObjectMarker]
            .some((value) => nonspecificAffixSet.has(value));
        const shouldUseAl = directionalPlan.shouldUseAl === true;
        let realizedSubjectPrefix = String(subjectPrefix || "");
        let realizedObjectPrefix = String(objectPrefix || "");
        let realizedVerb = String(verb || "");
        if (realizedVerb.startsWith(directionalInputPrefix)) {
            realizedVerb = realizedVerb.slice(directionalInputPrefix.length);
            if (isYawi && realizedVerb.startsWith("ya")) {
                realizedVerb = realizedVerb.slice(1);
            }
        }
        if (!shouldUseAl) {
            const markerChain = buildDirectionalMarkerChain({
                baseObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                subjectPrefix: baseSubjectPrefix,
            });
            realizedObjectPrefix = targetObject.normalizeValenceMarkerOrder(`${directionalOutputPrefix}${markerChain}`);
            return {
                subjectPrefix: realizedSubjectPrefix,
                objectPrefix: realizedObjectPrefix,
                verb: realizedVerb,
            };
        }
        const realizedDirectionalPrefix = "al";
        if (isFirstPersonSubject) {
            realizedSubjectPrefix = "n";
        } else if (isSecondPersonSubject && realizedSubjectPrefix !== "shi") {
            realizedSubjectPrefix = "t";
        } else if (isThirdPersonSubject && !hasThirdPersonObject && !hasNonspecificObject) {
            realizedSubjectPrefix = "k";
        }
        if (isMainlineThirdPersonObject) {
            const isImperativeSecondPlural =
                tense === "imperativo"
                && baseSubjectPrefix === "an"
                && baseSubjectSuffix === "t";
            const dropLeadK = (
                isFirstPersonSubject
                || isSecondPersonSubject
                || isImperativeSecondPlural
                || effectiveDirectionalRuleMode === "intransitive"
                || effectiveDirectionalRuleMode === "nonspecific"
            );
            const primaryBase = `${dropLeadK ? "" : "k"}${baseObjectPrefix === "kin" ? "in" : ""}`;
            const markerHead = buildDirectionalMarkerChain({
                baseObjectPrefix: primaryBase,
                indirectObjectMarker,
                thirdObjectMarker,
                subjectPrefix: baseSubjectPrefix,
            });
            realizedObjectPrefix = markerHead.startsWith("k")
                ? `k${realizedDirectionalPrefix}${markerHead.slice(1)}`
                : `${realizedDirectionalPrefix}${markerHead}`;
        } else if (hasThirdPersonObject) {
            const markerChain = buildDirectionalMarkerChain({
                baseObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                subjectPrefix: baseSubjectPrefix,
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
                realizedObjectPrefix = `k${realizedDirectionalPrefix}${markerTail}`;
            } else if (shouldDropLeadK) {
                realizedObjectPrefix = `${realizedDirectionalPrefix}${markerTail}`;
            } else {
                realizedObjectPrefix = `${realizedDirectionalPrefix}${markerChain}`;
            }
        } else {
            const markerChain = buildDirectionalMarkerChain({
                baseObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                subjectPrefix: baseSubjectPrefix,
            });
            realizedObjectPrefix = `${realizedDirectionalPrefix}${markerChain}`;
        }
        if (realizedObjectPrefix.endsWith("i") && realizedVerb.startsWith("i")) {
            realizedVerb = realizedVerb.slice(1);
        }
        const isImperativeSecondPersonBase =
            tense === "imperativo"
            && (
                (baseSubjectPrefix === "ti" && baseSubjectSuffix === "")
                || (baseSubjectPrefix === "an" && baseSubjectSuffix === "t")
            );
        if (isImperativeSecondPersonBase && realizedSubjectPrefix === "shi" && realizedObjectPrefix.startsWith("al")) {
            realizedSubjectPrefix = "sh";
        }
        return {
            subjectPrefix: realizedSubjectPrefix,
            objectPrefix: targetObject.normalizeValenceMarkerOrder(realizedObjectPrefix),
            verb: realizedVerb,
        };
    }

    function resolveDirectionalOutputChain({
        subjectPrefix = "",
        objectPrefix = "",
        verb = "",
        directionalChainMeta = null,
    }) {
        const meta = directionalChainMeta && typeof directionalChainMeta === "object"
            ? directionalChainMeta
            : null;
        if (!meta || !meta.directionalInputPrefix || meta.isNounTense === true) {
            return { subjectPrefix, objectPrefix, verb };
        }
        if (meta.directionalInputPrefix === "wal") {
            return realizeWalDirectionalChain({
                subjectPrefix,
                objectPrefix,
                verb,
                directionalChainMeta: meta,
            });
        }
        return { subjectPrefix, objectPrefix, verb };
    }

    function adjustPatientivoPossessiveSuffix(
        suffix,
        isPossessed,
        ownershipType = targetObject.DEFAULT_PATIENTIVO_OWNERSHIP,
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
            return null;
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
        return targetObject.getTotalVowelCountFromSyllables(targetObject.getSyllables(verb));
    }

    return {
        applyTenseSuffixRules,
        getAgentivoNumberSuffix,
        applyAgentivoNumberSuffix,
        applyPatientivoAdjectiveNumberSuffix,
        isWalThirdPersonMarker,
        buildDirectionalMarkerChain,
        buildWalDirectionalPlan,
        realizeWalDirectionalChain,
        resolveDirectionalOutputChain,
        adjustPatientivoPossessiveSuffix,
        startsWithAny,
        getTotalVowelCount,
    };
}

export function installMorphologySupportGlobals(targetObject = globalThis) {
    const api = createMorphologySupportApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
