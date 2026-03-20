// Preterit/perfective universal runtime (class builders + policy + assembly).
// Depends on pret_universal_context.js.
function buildPretUniversalClassC(context) {
    const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
    const isAllowedStem = (base) => allowUnpronounceableStems || isSyllableSequencePronounceable(base);
    const allowExactCVV = context.isTransitive && context.isExactCVV;
    const allowExactVV = !context.isTransitive && context.isExactVV;
    if (!context.endsInOpenSyllableNonU && !(allowExactCVV || allowExactVV)) {
        return null;
    }
    if (context.vowelCount !== 2 || (!context.endsWithIaUa && !allowExactCVV && !allowExactVV)) {
        return null;
    }
    const replaced = getPerfectiveReplacementStem(context.verb, {
        isTransitive: context.isTransitive,
    });
    if (!isAllowedStem(replaced)) {
        return null;
    }
    return [{ base: replaced, suffix: "" }];
}

function buildPretUniversalClassD(context) {
    if (context.isTransitive && context.isExactVwaI) {
        const base = `${context.verb}j`;
        if (!isSyllableSequencePronounceable(base)) {
            return null;
        }
        return [{ base, suffix: "" }];
    }
    if (context.vowelCount !== 1 || !context.isDerivedMonosyllable) {
        return null;
    }
    const monosyllableStemPath = context.monosyllableStemPath;
    if (!monosyllableStemPath) {
        return null;
    }
    const base = monosyllableStemPath.classDBase;
    if (!isSyllableSequencePronounceable(base)) {
        return null;
    }
    return [{ base, suffix: "" }];
}

function getRootPlusYaSurfaceVerb(context) {
    const normalizeYaCandidate = (value) => {
        const normalized = String(value || "");
        if (!normalized) {
            return "";
        }
        return normalized.endsWith("ya") ? normalized : `${normalized}ya`;
    };
    const candidates = [
        normalizeYaCandidate(context?.verb),
        normalizeYaCandidate(context?.analysisVerb),
        normalizeYaCandidate(context?.exactBaseVerb),
        normalizeYaCandidate(context?.rootPlusYaBase),
    ].filter(Boolean);
    if (!candidates.length) {
        return "";
    }
    return candidates.reduce((best, current) => (
        current.length > best.length ? current : best
    ));
}

function isSlashDenominalRootPlusYaMatrix(context) {
    return Boolean(
        context
        && !context.isTransitive
        && context.hasSlashMarker
        && context.isDenominalMatrixInput
        && (context.denominalMatrixStem === "tiya" || context.denominalMatrixStem === "wiya")
    );
}

function buildPretUniversalClassA(context) {
    const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
    const isAllowedStem = (base) => allowUnpronounceableStems || isSyllableSequencePronounceable(base);
    if (!context.isTransitive && context.fromRootPlusYa) {
        if (isSlashDenominalRootPlusYaMatrix(context)) {
            return null;
        }
        if (context.isWeya && context.rootPlusYaBase) {
            const base = context.rootPlusYaBase;
            if (!isAllowedStem(base)) {
                return null;
            }
            return [{ base, suffix: "ki" }];
        }
        const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context);
        const stems = getPerfectiveAlternationStems(rootPlusYaVerb, {
            isTransitive: context.isTransitive,
            isRootPlusYa: true,
        });
        const variants = stems
            .filter((base) => isAllowedStem(base))
            .map((base) => ({ base, suffix: "ki" }));
        return variants.length ? variants : null;
    }
    if (context.vowelCount !== 1) {
        return null;
    }
    if (!context.endsInOpenSyllableNonU) {
        return null;
    }
    let allowZeroSuffix = context.totalVowels > 2;
    let allowKiSuffix = true;
    if (!context.isTransitive && context.isExactCVniU) {
        return null;
    }
    const isIntransitiveWiKiOnly = !context.isTransitive && (
        context.isExactVwi
        || (context.isExactVCVwi && !context.supportiveInitialI)
        || context.isExactVjCVwi
        || context.isExactVlVwi
        || context.isExactCVlVwi
    );
    const allowIntransitiveChiClassA = !context.isTransitive && context.endsWithChi;
    const isExactLVIKiOnly = !context.endsWithLV
        && context.lastNucleus === "i"
        && (context.isExactVlV || context.isExactCVlV);
    const isIntransitiveLWaKiOnly = !context.isTransitive && context.isExactLWaPattern;
    const isEwaKiOnly = context.isTransitive && context.isExactCewa;
    const isTransitiveVwaKiOnly = context.isTransitive
        && context.isExactVwa
        && !context.isExactVwaI;
    const isEwaAllowZero = context.isTransitive
        && context.isExactEwaPattern
        && !context.isExactCewa;
    const isTransitiveCawa = context.isTransitive && context.isExactCVwaA;
    const isTransitiveCVwaI = context.isTransitive && context.isExactCVwaI;
    const isTransitiveCawaZeroOnly = isTransitiveCawa && context.hasSlashMarker;
    const isTransitiveCawaAllowZero = isTransitiveCawa && context.isReduplicated;
    const isTransitiveCawaKiOnly = isTransitiveCawa
        && !isTransitiveCawaZeroOnly
        && !isTransitiveCawaAllowZero;
    const isTransitiveAwaAllowZero = context.isTransitive
        && (context.isExactCVCawa || context.isExactCVlawa);
    const isTransitiveCVwi = context.isTransitive && context.isExactCVwi;
    const isTransitiveMV = context.isTransitive && context.endsWithMV && !context.isMonosyllable;
    const isTransitiveExactCVCVna = context.isTransitive && context.isExactCVCVna;
    const isTransitiveCVnaAllowZero = context.isTransitive
        && context.isExactCVna
        && (context.isReduplicated || context.isBitransitive);
    const isTransitiveExactNi = context.isTransitive
        && !context.isExactCVnV
        && (
            context.isExactCVni
            || context.isExactCVCVni
            || context.isExactCVlVni
            || context.isExactVjCVni
            || context.isExactCVVni
            || context.isExactCVCVCVni
            || context.isExactCVCCVCVni
            || context.isExactCVCVCVCVni
            || context.isExactLongNi
        );
    const isTransitiveTaRedupCVCV = context.isTransitive
        && context.endsWithTA
        && context.isReduplicatedCVCV
        && context.analysisVerb !== "ita";
    const allowSlashAkiZero = !context.isTransitive
        && context.hasSlashMarker
        && context.analysisVerb === "aki";
    const isDenominalWiVowelSourceClassA = !context.isTransitive
        && context.isDenominalMatrixInput
        && context.isDenominalWiMatrix
        && context.denominalSourceEndsWithVowel;
    if (context.isExactCVsV) {
        allowZeroSuffix = false;
    }
    if (context.isTransitive && context.isExactCVpV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (
        !context.isTransitive
        && (context.isExactWaPattern || context.isExactLWaPattern)
        && !isEwaAllowZero
    ) {
        allowZeroSuffix = false;
    }
    const isKSeriesNoU = context.endsWithKSeriesNoU;
    const allowIntransitiveKV = context.allowIntransitiveKV === true;
    if (
        !context.isTransitive
        && isKSeriesNoU
        && !context.hasSlashMarker
        && !allowIntransitiveKV
    ) {
        return null;
    }
    if (context.isTransitive && context.endsWithKA && !context.endsWithCaka) {
        return null;
    }
    if (!context.isTransitive && context.endsWithVka) {
        return null;
    }
    if (!context.isTransitive && context.endsWithCVka) {
        return null;
    }
    if (context.isTransitive && context.endsWithTZA) {
        allowZeroSuffix = false;
    }
    if (context.endsWithTZV && !context.endsWithVCCV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.endsWithPA && !context.isMonosyllable) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (isKSeriesNoU) {
        allowKiSuffix = false;
        allowZeroSuffix = true;
    }
    if (context.endsWithTV && !isKSeriesNoU) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithWV && !isKSeriesNoU && !isEwaAllowZero) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithNA) {
        if (context.totalVowels <= 2 && !context.isExactCVna) {
            return null;
        }
        allowZeroSuffix = false;
    }
    if (context.endsWithYA) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithCVnV) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.isExactCVlVni) {
        allowZeroSuffix = false;
    }
    if (context.isTransitive && context.isExactVnV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactCVnV) {
        if (context.isExactCVna) {
            allowZeroSuffix = true;
            allowKiSuffix = true;
        } else if (context.isExactCVni) {
            allowZeroSuffix = true;
            allowKiSuffix = true;
        } else {
            allowZeroSuffix = context.isReduplicated;
            allowKiSuffix = !context.isReduplicated;
        }
    }
    if (context.isTransitive && context.isExactVjCVna) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactVlCVna) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (isTransitiveExactCVCVna) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveCVnaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveExactNi) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactCVmV) {
        if (context.isExactCVma) {
            allowZeroSuffix = true;
            allowKiSuffix = true;
        } else {
            allowZeroSuffix = context.isReduplicated;
            allowKiSuffix = !context.isReduplicated;
        }
    }
    if (context.isTransitive && context.isExactVjCVma) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveMV) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (!context.isTransitive && context.endsWithKisV) {
        allowZeroSuffix = false;
    }
    if (!context.forceClassAForKWV) {
        const allowIntransitiveWiVtV = !context.isTransitive && context.isExactWiPattern;
        if (
            (context.isMonosyllable && !context.endsWithTV && !isDenominalWiVowelSourceClassA) ||
            (
                !context.isTransitive
                && (context.isVtVStart || context.isVVtVStart)
                && !allowIntransitiveWiVtV
                && !allowIntransitiveChiClassA
            )
        ) {
            return null;
        }
    }
    if (
        isIntransitiveWiKiOnly
        || isExactLVIKiOnly
        || isIntransitiveLWaKiOnly
        || isEwaKiOnly
        || isTransitiveVwaKiOnly
        || isTransitiveCawaKiOnly
    ) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (isEwaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveCawaZeroOnly) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
    }
    if (isTransitiveCawaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveAwaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveCVwaI) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (context.isTransitive && (context.isExactVjCVwa || context.isExactVlCVwa)) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactCVjCVwa) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.endsWithLV) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
    }
    if (!context.isTransitive && !context.endsWithLV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (allowSlashAkiZero) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
    }
    if (
        !context.isTransitive
        && context.isExactWiPattern
        && context.isReduplicated
        && !isIntransitiveWiKiOnly
    ) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
    }
    if (isTransitiveCVwi) {
        allowZeroSuffix = context.isReduplicated;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactCVCVwi) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
    }
    if (isTransitiveTaRedupCVCV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.classAKiOnly) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    const isExactItaVerb = context.analysisVerb === "ita";
    if (context.isTransitive && context.isItaVerb && isExactItaVerb) {
        const variants = [];
        const itaStem = context.verb.slice(0, -2) + "tz";
        if (!isAllowedStem(itaStem)) {
            return null;
        }
        if (allowKiSuffix) {
            variants.push({ base: itaStem, suffix: "ki" });
        }
        if (allowZeroSuffix) {
            variants.push({ base: itaStem, suffix: "" });
        }
        return variants.length ? variants : null;
    }
    if (!context.isTransitive && context.verb.endsWith("yya")) {
        const base = context.verb.slice(0, -2);
        if (!isAllowedStem(base)) {
            return null;
        }
        return [{ base, suffix: "ki" }];
    }
    let deletedStems = context.isCausativeTypeTwo
        ? [context.verb]
        : getPerfectiveAlternationStems(context.verb, {
            isTransitive: context.isTransitive,
        });
    if (context.isTransitive && context.isExactVCCawa) {
        deletedStems = deletedStems.filter((base) => !base.endsWith("j"));
    }
    if (
        context.isTransitive
        && context.isExactKawa
        && !(context.isReduplicated || context.hasSlashMarker)
    ) {
        deletedStems = deletedStems.filter((base) => !base.endsWith("j"));
    }
    const variants = [];
    deletedStems.forEach((base) => {
        if (!isAllowedStem(base)) {
            return;
        }
        if (allowKiSuffix) {
            variants.push({ base, suffix: "ki" });
        }
        if (allowZeroSuffix) {
            variants.push({ base, suffix: "" });
        }
    });
    return variants.length ? variants : null;
}

function buildPretUniversalClassB(context) {
    const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
    const isAllowedStem = (base) => allowUnpronounceableStems || isSyllableSequencePronounceable(base);
    if (!context.isTransitive && context.fromRootPlusYa) {
        if (isSlashDenominalRootPlusYaMatrix(context)) {
            const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context) || context.verb || "";
            const deletedYaBase = rootPlusYaVerb.endsWith("ya")
                ? rootPlusYaVerb.slice(0, -2)
                : (context.rootPlusYaBase || rootPlusYaVerb);
            if (!deletedYaBase || !isAllowedStem(deletedYaBase)) {
                return null;
            }
            return [{ base: deletedYaBase, suffix: "k" }];
        }
        if (context.isWeya) {
            return [{ base: context.verb, suffix: "k" }];
        }
        const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context);
        const variants = [{ base: rootPlusYaVerb || context.verb, suffix: "k" }];
        const rootPlusYaBase = context.rootPlusYaBase;
        const addRootPlusYaVariant = (candidateBase) => {
            if (!candidateBase || !isAllowedStem(candidateBase)) {
                return;
            }
            let base = candidateBase;
            let suffix = "k";
            if (shouldCoalesceFinalI(base)) {
                base = `${base.slice(0, -1)}y`;
                suffix = "ka";
            }
            if (!variants.some((variant) => variant.base === base && variant.suffix === suffix)) {
                variants.push({ base, suffix });
            }
        };
        const isShortRootPlusYaBase = (() => {
            if (!rootPlusYaBase) {
                return false;
            }
            const baseSyllables = getSyllables(rootPlusYaBase, { analysis: true, assumeFinalV: true });
            if (baseSyllables.length !== 1) {
                return false;
            }
            const form = baseSyllables[0]?.form;
            return form === "V" || form === "CV" || form === "Vj";
        })();
        if (!isShortRootPlusYaBase && rootPlusYaBase) {
            addRootPlusYaVariant(rootPlusYaBase);
        }
        const slashEmbeddedYaBase = context.hasSlashMarker && rootPlusYaVerb.endsWith("ya")
            ? rootPlusYaVerb.slice(0, -2)
            : "";
        if (slashEmbeddedYaBase) {
            addRootPlusYaVariant(slashEmbeddedYaBase);
        }
        return variants;
    }
    const isExactNaPattern = context.isExactVna
        || context.isExactCVna
        || context.isExactCVCVna
        || context.isExactCVlVna
        || context.isExactCVCCVna
        || context.isExactCVCVCVna
        || context.isExactCVCCVCVna
        || context.isExactLongNa;
    const isExactNiPattern = context.isExactCVni
        || context.isExactCVCVni
        || context.isExactCVlVni
        || context.isExactVjCVni
        || context.isExactCVVni
        || context.isExactCVCVCVni
        || context.isExactCVCCVCVni
        || context.isExactCVCVCVCVni
        || context.isExactLongNi;
    const isExactNiaPattern = context.isExactCVnia
        || context.isExactCVCVnia
        || context.isExactCVlVnia
        || context.isExactVjCVnia;
    if (context.isTransitive && (isExactNaPattern || isExactNiPattern || isExactNiaPattern)) {
        return null;
    }
    if (!context.isTransitive && context.isExactCVCVCVna) {
        return null;
    }
    if (!context.isTransitive && context.isExactWaPattern) {
        if (context.isExactCuwa) {
            return [{ base: context.verb, suffix: "k" }];
        }
        if (context.isReduplicated || !context.isExactCVCVwa) {
            return null;
        }
        return [{ base: context.verb, suffix: "k" }];
    }
    if (context.isExactCVsV && !context.endsWithU) {
        if (context.lastNucleus !== "i" || context.isTransitive) {
            return null;
        }
    }
    if (context.vowelCount !== 1) {
        return null;
    }
    if (!isAllowedStem(context.verb)) {
        return null;
    }
    const variants = [{ base: context.verb, suffix: "k" }];
    const disallowRootPlusYa = context.analysisVerb === "ya"
        && (context.hasSlashMarker || context.hasSuffixSeparator || context.hasLeadingDash);
    const rootPlusYaBase = disallowRootPlusYa
        ? null
        : (context.rootPlusYaBasePronounceable || "");
    if (rootPlusYaBase) {
        let base = rootPlusYaBase;
        let suffix = "k";
        if (shouldCoalesceFinalI(base)) {
            base = `${base.slice(0, -1)}y`;
            suffix = "ka";
        }
        if (!variants.some((variant) => variant.base === base && variant.suffix === suffix)) {
            variants.push({ base, suffix });
        }
    }
    return variants;
}

function getPretUniversalVariants(verb, tense, isTransitive, analysisVerb = verb, options = {}) {
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
    if (!classKey) {
        return null;
    }
    const context = buildPretUniversalContext(verb, analysisVerb, isTransitive, options);
    if (!isTransitive && context.endsWithKSeriesNoU) {
        context.allowIntransitiveKV = true;
    }
    const candidates = getPretUniversalClassCandidates(context);
    if (!candidates.has(classKey)) {
        return null;
    }
    switch (classKey) {
        case "A":
            return buildPretUniversalClassA(context);
        case "B":
            return buildPretUniversalClassB(context);
        case "C":
            return buildPretUniversalClassC(context);
        case "D":
            return buildPretUniversalClassD(context);
        default:
            return null;
    }
}

function getPronounceableClassBFallback(context) {
    if (!context || !context.verb) {
        return null;
    }
    const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
    if (!allowUnpronounceableStems && !isSyllableSequencePronounceable(context.verb)) {
        return null;
    }
    return [{ base: context.verb, suffix: "k" }];
}

function getPretUniversalVariantsByClass(context) {
    const candidates = getPretUniversalClassCandidates(context);
    const variantsByClass = new Map();
    if (candidates.has("A")) {
        const variants = buildPretUniversalClassA(context);
        if (variants) {
            variantsByClass.set("A", variants);
        }
    }
    if (candidates.has("B")) {
        const variants = buildPretUniversalClassB(context);
        if (variants) {
            variantsByClass.set("B", variants);
        }
    }
    if (candidates.has("C")) {
        const variants = buildPretUniversalClassC(context);
        if (variants) {
            variantsByClass.set("C", variants);
        }
    }
    if (candidates.has("D")) {
        const variants = buildPretUniversalClassD(context);
        if (variants) {
            variantsByClass.set("D", variants);
        }
    }
    if (!variantsByClass.size) {
        const fallback = getPronounceableClassBFallback(context);
        if (fallback) {
            variantsByClass.set("B", fallback);
        }
    }
    return variantsByClass;
}

function splitDirectionalPrefixFromBase(base, directionalPrefix) {
    if (!directionalPrefix || directionalPrefix !== "wal") {
        return { directional: "", base };
    }
    if (base.startsWith(directionalPrefix)) {
        return { directional: directionalPrefix, base: base.slice(directionalPrefix.length) };
    }
    return { directional: "", base };
}

function maybeShortenZeroBitransitiveKi(prefix, baseSubjectPrefix, allowZeroBitransitiveDrop) {
    if (!allowZeroBitransitiveDrop) {
        return prefix;
    }
    if (prefix === "ki" && ["ni", "ti"].includes(baseSubjectPrefix)) {
        return "k";
    }
    return prefix;
}

function composePretUniversalObjectPrefix({
    objectPrefix = "",
    baseSubjectPrefix = "",
    indirectObjectMarker = "",
    hasDoubleDash = false,
}) {
    const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
        hasDoubleDash,
        indirectObjectMarker,
    });
    if (typeof composeProjectiveObjectPrefix === "function") {
        return composeProjectiveObjectPrefix({
            objectPrefix,
            markers: [indirectObjectMarker || ""],
            subjectPrefix: baseSubjectPrefix,
        });
    }
    let adjustedObjectPrefix = objectPrefix;
    adjustedObjectPrefix = applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
    adjustedObjectPrefix = maybeShortenZeroBitransitiveKi(
        adjustedObjectPrefix,
        baseSubjectPrefix,
        allowZeroBitransitiveDrop
    );
    return adjustedObjectPrefix;
}

function shouldAllowZeroBitransitiveKiDrop({
    hasDoubleDash = false,
    indirectObjectMarker = "",
}) {
    return hasDoubleDash && indirectObjectMarker === "ki";
}

function adjustPretPrefixBaseContact(prefix, base, baseSubjectPrefix = "", options = {}) {
    let adjustedPrefix = prefix || "";
    let adjustedBase = base || "";
    const shouldDropLeadingI = adjustedPrefix && adjustedPrefix.endsWith("i") && adjustedBase.startsWith("i");
    if (shouldDropLeadingI) {
        adjustedBase = adjustedBase.slice(1);
    }
    if (options.dropYAfterWal === true && adjustedBase.startsWith("ya")) {
        adjustedBase = adjustedBase.slice(1);
    }
    return {
        prefix: adjustedPrefix,
        base: adjustedBase,
    };
}

function adjustPretComposedObjectPrefixContact({
    objectPrefix = "",
    base = "",
    baseSubjectPrefix = "",
    allowZeroBitransitiveDrop = false,
    dropYAfterWal = false,
}) {
    let adjustedObjectPrefix = objectPrefix;
    let adjustedBase = base;
    if (adjustedObjectPrefix.endsWith("k") && adjustedBase.startsWith("k")) {
        if (adjustedBase.startsWith("kw")) {
            adjustedObjectPrefix = adjustedObjectPrefix.slice(0, -1);
        } else {
            adjustedBase = adjustedBase.slice(1);
        }
    }
    return adjustPretPrefixBaseContact(
        adjustedObjectPrefix,
        adjustedBase,
        baseSubjectPrefix,
        { allowZeroBitransitiveDrop, dropYAfterWal }
    );
}

function resolvePretObjectPrefixContact({
    objectPrefix = "",
    base = "",
    baseSubjectPrefix = "",
    indirectObjectMarker = "",
    hasDoubleDash = false,
    suppressBareKBeforeK = false,
    dropYAfterWal = false,
}) {
    const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
        hasDoubleDash,
        indirectObjectMarker,
    });
    let adjustedObjectPrefix = objectPrefix;
    if (suppressBareKBeforeK && adjustedObjectPrefix === "k" && base.startsWith("k") && !indirectObjectMarker) {
        adjustedObjectPrefix = "";
    }
    adjustedObjectPrefix = composePretUniversalObjectPrefix({
        objectPrefix: adjustedObjectPrefix,
        baseSubjectPrefix,
        indirectObjectMarker,
        hasDoubleDash,
    });
    return adjustPretComposedObjectPrefixContact({
        objectPrefix: adjustedObjectPrefix,
        base,
        baseSubjectPrefix,
        allowZeroBitransitiveDrop,
        dropYAfterWal,
    });
}

function getPretUniversalPrefixForBase(
    base,
    subjectPrefix,
    objectPrefix,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    indirectObjectMarker = "",
    hasDoubleDash = false,
    isYawi = false
) {
    const split = splitDirectionalPrefixFromBase(base, directionalInputPrefix);
    const outputDirectional = split.directional ? (directionalOutputPrefix || split.directional) : "";
    const baseCore = split.base;
    const dropYAfterWal = Boolean(isYawi && split.directional);
    if (!split.directional) {
        const contactAdjusted = resolvePretObjectPrefixContact({
            objectPrefix,
            base: baseCore,
            baseSubjectPrefix,
            indirectObjectMarker,
            hasDoubleDash,
            suppressBareKBeforeK: true,
            dropYAfterWal: false,
        });
        return {
            prefix: subjectPrefix + contactAdjusted.prefix,
            base: contactAdjusted.base,
        };
    }
    const isThirdPersonMarker = (value) => value === "ki" || value === "kin" || value === "k";
    const isThirdPersonObject = isThirdPersonMarker(baseObjectPrefix);
    const isShuntlineThirdPersonObject = !isThirdPersonObject && isThirdPersonMarker(indirectObjectMarker);
    const isThirdPersonSubject = baseSubjectPrefix === "" && subjectPrefix === "";
    const subjectHead = (isThirdPersonSubject && outputDirectional === "al" && !isThirdPersonObject)
        ? "k"
        : subjectPrefix;
    if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = (
            baseSubjectPrefix === "ni"
            || baseSubjectPrefix === "ti"
            || baseSubjectPrefix === "n"
            || baseSubjectPrefix === "t"
        );
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        const objectHead = applyIndirectObjectMarker(`${dropK ? "" : "k"}${objectTail}`, indirectObjectMarker);
        const directionalizedObjectHead = objectHead.startsWith("k")
            ? `k${outputDirectional}${objectHead.slice(1)}`
            : `${outputDirectional}${objectHead}`;
        return {
            prefix: `${subjectHead}${directionalizedObjectHead}`,
            base: dropYAfterWal && baseCore.startsWith("ya") ? baseCore.slice(1) : baseCore,
        };
    }
    if (isShuntlineThirdPersonObject && outputDirectional === "al") {
        const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
            hasDoubleDash,
            indirectObjectMarker,
        });
        let adjustedObjectPrefix = composePretUniversalObjectPrefix({
            objectPrefix,
            baseSubjectPrefix,
            indirectObjectMarker,
            hasDoubleDash,
        });
        let adjustedBase = baseCore;
        const startsWithK = adjustedObjectPrefix.startsWith("k");
        const objectTail = startsWithK
            ? (adjustedObjectPrefix === "kin" ? "in" : "")
            : adjustedObjectPrefix;
        const isSecondPluralSubject = baseSubjectPrefix === "an" || subjectPrefix === "an";
        if (startsWithK && isSecondPluralSubject) {
            adjustedObjectPrefix = `k${outputDirectional}${objectTail}`;
        } else if (startsWithK) {
            adjustedObjectPrefix = `${outputDirectional}${objectTail}`;
        } else {
            adjustedObjectPrefix = `${outputDirectional}${adjustedObjectPrefix}`;
        }
        const contactAdjusted = adjustPretComposedObjectPrefixContact({
            objectPrefix: adjustedObjectPrefix,
            base: adjustedBase,
            baseSubjectPrefix,
            allowZeroBitransitiveDrop,
            dropYAfterWal,
        });
        return {
            prefix: subjectHead + contactAdjusted.prefix,
            base: contactAdjusted.base,
        };
    }
    const contactAdjusted = resolvePretObjectPrefixContact({
        objectPrefix,
        base: baseCore,
        baseSubjectPrefix,
        indirectObjectMarker,
        hasDoubleDash,
        suppressBareKBeforeK: true,
        dropYAfterWal,
    });
    return {
        prefix: subjectHead + outputDirectional + contactAdjusted.prefix,
        base: contactAdjusted.base,
    };
}

function normalizePretYawiPreteriteVariants(variants, tense, isYawi) {
    if (!isYawi || tense !== "preterito" || !Array.isArray(variants)) {
        return variants;
    }
    return variants.map((variant) => {
        if (!variant || variant.suffix !== "ki") {
            return variant;
        }
        return {
            ...variant,
            suffix: "",
        };
    });
}

function buildPretUniversalResultFromVariants(
    variants,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    pluralSuffix = null,
    indirectObjectMarker = "",
    hasDoubleDash = false,
    isYawi = false
) {
    if (!variants || variants.length === 0) {
        return null;
    }
    const isPlural = subjectSuffix === "t";
    if (isPlural) {
        const resolvedPluralSuffix = pluralSuffix || "ket";
        const seen = new Set();
        const results = [];
        variants.forEach((variant) => {
            const { prefix, base } = getPretUniversalPrefixForBase(
                variant.base,
                subjectPrefix,
                objectPrefix,
                directionalInputPrefix,
                directionalOutputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix,
                indirectObjectMarker,
                hasDoubleDash,
                isYawi
            );
            const form = `${prefix}${base}${resolvedPluralSuffix}`;
            if (!seen.has(form)) {
                seen.add(form);
                results.push(form);
            }
        });
        return results.join(" / ");
    }
    const groups = new Map();
    const order = [];
    variants.forEach((variant) => {
        const { prefix, base } = getPretUniversalPrefixForBase(
            variant.base,
            subjectPrefix,
            objectPrefix,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            indirectObjectMarker,
            hasDoubleDash,
            isYawi
        );
        const baseKey = `${prefix}${base}`;
        let entry = groups.get(baseKey);
        if (!entry) {
            entry = { suffixes: new Set(), order: [] };
            groups.set(baseKey, entry);
            order.push(baseKey);
        }
        if (!entry.suffixes.has(variant.suffix)) {
            entry.suffixes.add(variant.suffix);
            entry.order.push(variant.suffix);
        }
    });
    const results = [];
    order.forEach((base) => {
        const entry = groups.get(base);
        const hasEmpty = entry.suffixes.has("");
        const hasKi = entry.suffixes.has("ki");
        let emittedOptional = false;
        let emittedBase = false;
        if (hasEmpty && hasKi) {
            results.push(`${base}(ki)`);
            emittedOptional = true;
        } else if (hasEmpty) {
            results.push(base);
            emittedBase = true;
        }
        entry.order.forEach((suffix) => {
            if (suffix === "") {
                if (!emittedOptional && !emittedBase) {
                    results.push(base);
                    emittedBase = true;
                }
                return;
            }
            if (suffix === "ki") {
                if (emittedOptional) {
                    return;
                }
                results.push(`${base}ki`);
                return;
            }
            results.push(`${base}${suffix}`);
        });
    });
    return results.join(" / ");
}

function buildNonactivePerfectiveResult({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    indirectObjectMarker = "",
}) {
    if (tense === "preterito") {
        const variants = [{ base: verb, suffix: "k" }];
        return buildPretUniversalResultFromVariants(
            variants,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            null,
            indirectObjectMarker
        );
    }
    const suffix = subjectSuffix || "";
    const { prefix, base } = getPretUniversalPrefixForBase(
        verb,
        subjectPrefix,
        objectPrefix,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker
    );
    return `${prefix}${base}${suffix}`;
}

function getKVClassPolicy({
    context,
    isTransitive,
    isPreterit,
    classFilter,
    baseObjectPrefix,
    hasClassA,
    hasClassB,
    allowAllClasses = false,
}) {
    const isRootPlusYaIntransitive = !!(context && !context.isTransitive && context.fromRootPlusYa);
    const isTVEnding = !!(context && context.endsWithTV);
    const mvSource = context?.analysisVerb || context?.verb || "";
    const isMVEnding = !!(
        context
        && !isTransitive
        && (context.endsWithMV || /m[ai]$/.test(mvSource))
    );
    const allowSlashAkiZero = !!(
        context
        && !isTransitive
        && context.hasSlashMarker
        && context.analysisVerb === "aki"
    );
    if (allowSlashAkiZero) {
        return {
            shouldMaskClassBSelection: false,
            shouldSkipClassA: false,
            shouldSkipClassB: false,
        };
    }
    const allowClassBWithA = !allowAllClasses
        && context
        && !isTransitive
        && (
            (context.isExactCVCVwa && !context.isReduplicated)
            || context.isExactLWaPattern
            || context.isExactCVna
        );
    const baseMaskClassB = !allowAllClasses
        && classFilter === "B"
        && !isTransitive
        && !isPreterit
        && !isRootPlusYaIntransitive
        && !isTVEnding
        && !isMVEnding
        && !allowClassBWithA
        && hasClassA
        && hasClassB;
    const baseSkipClassB =
        !allowAllClasses
        && !isTransitive
        && !isPreterit
        && !classFilter
        && !isRootPlusYaIntransitive
        && !isTVEnding
        && !isMVEnding
        && !allowClassBWithA
        && hasClassA
        && hasClassB;
    if (!context || !hasClassA || !hasClassB) {
        return {
            shouldMaskClassBSelection: baseMaskClassB,
            shouldSkipClassA: false,
            shouldSkipClassB: baseSkipClassB,
        };
    }
    const forceClassAForKWV = context.forceClassAForKWV;
    const allowBothForKi = isTransitive && baseObjectPrefix === "ki";
    const isKOnlyNoU = context.endsWithKV && !context.endsWithKU;
    const preferClassBForKV = !allowAllClasses
        && isPreterit
        && !classFilter
        && isKOnlyNoU
        && !allowBothForKi;
    const preferClassAForKV = !allowAllClasses
        && !isPreterit
        && !classFilter
        && isKOnlyNoU;
    return {
        shouldMaskClassBSelection: baseMaskClassB || (classFilter === "B" && forceClassAForKWV),
        shouldSkipClassA: preferClassBForKV,
        shouldSkipClassB: baseSkipClassB || preferClassAForKV || forceClassAForKWV,
    };
}

function makePretClassPolicyState(policy = {}) {
    return {
        shouldMaskClassBSelection: Boolean(policy.shouldMaskClassBSelection),
        shouldSkipClassA: Boolean(policy.shouldSkipClassA),
        shouldSkipClassB: Boolean(policy.shouldSkipClassB),
    };
}

function buildPretClassPolicyResult(isPreterit, state = {}) {
    return {
        isPreterit,
        shouldMaskClassBSelection: Boolean(state.shouldMaskClassBSelection),
        shouldSkipClassA: Boolean(state.shouldSkipClassA),
        shouldSkipClassB: Boolean(state.shouldSkipClassB),
    };
}

function buildForcedClassBPolicyResult(isPreterit) {
    return {
        isPreterit,
        shouldMaskClassBSelection: false,
        shouldSkipClassA: true,
        shouldSkipClassB: false,
    };
}

function applyPretClassPolicyRulePipeline({
    state,
    ruleContext,
    rules = [],
    isPreterit = false,
}) {
    let nextState = makePretClassPolicyState(state);
    for (const rule of rules) {
        if (!rule || typeof rule.when !== "function" || typeof rule.run !== "function") {
            continue;
        }
        if (!rule.when(ruleContext, nextState)) {
            continue;
        }
        const outcome = rule.run(ruleContext, nextState) || {};
        if (outcome.state) {
            nextState = makePretClassPolicyState(outcome.state);
        }
        if (outcome.terminal) {
            return {
                terminated: true,
                policy: outcome.policy || buildPretClassPolicyResult(isPreterit, nextState),
            };
        }
    }
    return {
        terminated: false,
        policy: buildPretClassPolicyResult(isPreterit, nextState),
    };
}

function resolvePretClassPolicy({
    context,
    tense,
    isTransitive,
    classFilter,
    baseObjectPrefix,
    hasClassA,
    hasClassB,
    allowAllClasses = false,
    subjectSuffix = "",
}) {
    const isPreterit = tense === "preterito";
    const forceClassBOnly = Array.isArray(context?.verbOverride?.classes)
        && context.verbOverride.classes.length === 1
        && context.verbOverride.classes[0] === "B";
    const state = makePretClassPolicyState(getKVClassPolicy({
        context,
        isTransitive,
        isPreterit,
        classFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses,
    }));
    const ruleContext = {
        context,
        classFilter,
        hasClassA,
        hasClassB,
        subjectSuffix,
        isPreterit,
        forceClassBOnly,
        isDeletionClusterIntransitive: Boolean(
            context
            && !context.isTransitive
            && context.deletionCreatesCluster
        ),
        isRootPlusYaIntransitive: Boolean(
            context
            && !context.isTransitive
            && context.fromRootPlusYa
        ),
        isDenominalWiFromVowelSource: Boolean(
            context
            && context.isDenominalMatrixInput
            && context.isDenominalWiMatrix
            && context.denominalSourceEndsWithVowel
        ),
        isWiPattern: Boolean(
            context
            && context.isExactWiPattern
            && !context.isTransitive
            && !context.fromRootPlusYa
        ),
        isCVliPattern: Boolean(
            context
            && !context.isTransitive
            && (context.isExactCVlV || context.isExactVlV || context.endsWithLV)
            && context.lastNucleus === "i"
        ),
        isCVpVPattern: Boolean(
            context
            && context.isExactCVpV
            && !context.isTransitive
        ),
        isIntransitivePiPattern: Boolean(
            context
            && !context.isTransitive
            && context.endsWithPI
            && !context.isMonosyllable
        ),
        isCVVniPattern: Boolean(
            context
            && context.isExactCVVni
            && !context.isTransitive
        ),
    };
    const rules = [
        {
            name: "force-class-b-only",
            when: (ctx) => ctx.forceClassBOnly,
            run: () => ({
                terminal: true,
                policy: buildForcedClassBPolicyResult(isPreterit),
            }),
        },
        {
            name: "deletion-cluster-intransitive",
            when: (ctx) => ctx.isDeletionClusterIntransitive,
            run: () => ({
                terminal: true,
                policy: buildForcedClassBPolicyResult(isPreterit),
            }),
        },
        {
            name: "root-plus-ya-intransitive",
            when: (ctx) => ctx.isRootPlusYaIntransitive,
            run: (ctx, currentState) => ({
                terminal: true,
                policy: buildPretClassPolicyResult(isPreterit, currentState),
            }),
        },
        {
            name: "denominal-wi-vowel-source",
            when: (ctx) => ctx.isDenominalWiFromVowelSource,
            run: (ctx) => ({
                terminal: true,
                policy: ctx.isPreterit
                    ? {
                        isPreterit: ctx.isPreterit,
                        shouldMaskClassBSelection: false,
                        shouldSkipClassA: false,
                        shouldSkipClassB: false,
                    }
                    : {
                        isPreterit: ctx.isPreterit,
                        shouldMaskClassBSelection: ctx.classFilter === "B",
                        shouldSkipClassA: false,
                        shouldSkipClassB: true,
                    },
            }),
        },
        {
            name: "wi-pattern",
            when: (ctx) => ctx.isWiPattern,
            run: (ctx, currentState) => {
                if (ctx.context.isMonosyllable) {
                    return {
                        terminal: true,
                        policy: buildForcedClassBPolicyResult(ctx.isPreterit),
                    };
                }
                const next = makePretClassPolicyState(currentState);
                const isReduplicated = ctx.context.isReduplicated;
                const isPreteritSingular = ctx.isPreterit && ctx.subjectSuffix !== "t";
                const isPreteritPlural = ctx.isPreterit && ctx.subjectSuffix === "t";
                if (isReduplicated) {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                } else if (isPreteritSingular) {
                    next.shouldSkipClassA = ctx.hasClassB;
                } else if (isPreteritPlural) {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                } else {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                }
                return { state: next };
            },
        },
        {
            name: "cvli-pattern",
            when: (ctx) => ctx.isCVliPattern,
            run: (ctx, currentState) => {
                const next = makePretClassPolicyState(currentState);
                const penult = ctx.context.penultimateNucleus;
                const isPreteritSingular = ctx.isPreterit && ctx.subjectSuffix !== "t";
                if (penult === "e") {
                    next.shouldSkipClassA = true;
                    next.shouldSkipClassB = false;
                    next.shouldMaskClassBSelection = false;
                } else if (penult === "u") {
                    if (isPreteritSingular) {
                        next.shouldSkipClassA = true;
                        next.shouldSkipClassB = false;
                        next.shouldMaskClassBSelection = false;
                    } else {
                        next.shouldSkipClassB = true;
                        next.shouldMaskClassBSelection = next.shouldMaskClassBSelection || ctx.classFilter === "B";
                    }
                }
                return { state: next };
            },
        },
        {
            name: "cvpv-pattern",
            when: (ctx) => ctx.isCVpVPattern,
            run: (ctx, currentState) => {
                const next = makePretClassPolicyState(currentState);
                const isPreteritSingular = ctx.isPreterit && ctx.subjectSuffix !== "t";
                if (isPreteritSingular) {
                    next.shouldSkipClassA = ctx.hasClassB;
                } else {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                }
                return { state: next };
            },
        },
        {
            name: "intransitive-pi-pattern",
            when: (ctx) => ctx.isIntransitivePiPattern,
            run: (ctx, currentState) => {
                const next = makePretClassPolicyState(currentState);
                const isPreteritSingular = ctx.isPreterit && ctx.subjectSuffix !== "t";
                if (isPreteritSingular) {
                    next.shouldSkipClassA = ctx.hasClassB;
                } else {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                }
                return { state: next };
            },
        },
        {
            name: "cvvni-pattern",
            when: (ctx) => ctx.isCVVniPattern,
            run: (ctx, currentState) => {
                const next = makePretClassPolicyState(currentState);
                const isPreteritSingular = ctx.isPreterit && ctx.subjectSuffix !== "t";
                if (isPreteritSingular) {
                    next.shouldSkipClassA = ctx.hasClassB;
                } else {
                    next.shouldSkipClassB = true;
                    if (ctx.classFilter === "B") {
                        next.shouldMaskClassBSelection = true;
                    }
                }
                return { state: next };
            },
        },
    ];
    return applyPretClassPolicyRulePipeline({
        state,
        ruleContext,
        rules,
        isPreterit,
    }).policy;
}

function buildClassBasedResult({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    analysisVerb,
    exactBaseVerb,
    classFilter = null,
    allowAllClasses = false,
    isYawi = false,
    isWeya = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
    hasDoubleDash = false,
    forceClassBSelection = false,
    forceClassBOnly = false,
}) {
    const resolvedClassFilter = forceClassBOnly ? "B" : classFilter;
    const resolvedForceClassBSelection = forceClassBOnly || forceClassBSelection;
    const analysisTarget = getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    const isTransitive = forceTransitive || objectPrefix !== "";
    const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
    let variantsByClass = null;
    let context = null;
    if (suppletiveStemSet) {
        variantsByClass = suppletiveStemSet.variantsByClass;
    } else {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly,
        });
        if (
            !isTransitive
            && context.endsWithKSeriesNoU
            && tense !== "preterito"
        ) {
            context.allowIntransitiveKV = true;
        }
        variantsByClass = getPretUniversalVariantsByClass(context);
    }
    if (!variantsByClass.size) {
        return null;
    }
    const classOrder = resolvedClassFilter
        ? [resolvedClassFilter]
        : (typeof getPretUniversalClassOrder === "function"
            ? getPretUniversalClassOrder()
            : ["A", "B", "C", "D"]);
    const hasClassA = variantsByClass.has("A");
    const hasClassB = variantsByClass.has("B");
    let {
        isPreterit,
        shouldMaskClassBSelection,
        shouldSkipClassA,
        shouldSkipClassB,
    } = resolvePretClassPolicy({
        context,
        tense,
        isTransitive,
        classFilter: resolvedClassFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses,
        subjectSuffix,
    });
    if (resolvedForceClassBSelection && resolvedClassFilter === "B") {
        shouldMaskClassBSelection = false;
        shouldSkipClassA = true;
        shouldSkipClassB = false;
    }
    const usePretPluralOverride = isPreterit && subjectSuffix === "t" && suppletiveStemSet;
    const pretPluralSuffix = usePretPluralOverride ? suppletiveStemSet.pretPluralSuffix : null;
    const pretPluralClasses = usePretPluralOverride ? suppletiveStemSet.pretPluralClasses : null;
    const classExclusionsByTense = suppletiveStemSet?.classExclusionsByTense || null;
    const tenseVariantsByClass = suppletiveStemSet?.tenseVariantsByClass || null;
    const tenseClassVariants = tenseVariantsByClass && tenseVariantsByClass[tense]
        ? tenseVariantsByClass[tense]
        : null;
    const excludedClasses = classExclusionsByTense && classExclusionsByTense[tense]
        ? classExclusionsByTense[tense]
        : null;
    const results = [];
    const seen = new Set();
    if (shouldMaskClassBSelection) {
        return "—";
    }
    classOrder.forEach((classKey) => {
        if (shouldSkipClassA && classKey === "A") {
            return;
        }
        if (shouldSkipClassB && classKey === "B") {
            return;
        }
        if (excludedClasses && excludedClasses.has(classKey)) {
            return;
        }
        if (pretPluralClasses && !pretPluralClasses.has(classKey)) {
            return;
        }
        const variants = normalizePretYawiPreteriteVariants(
            (tenseClassVariants && tenseClassVariants.get(classKey))
                || variantsByClass.get(classKey),
            tense,
            isYawi
        );
        if (!variants || variants.length === 0) {
            return;
        }
        let classResult = null;
        if (isPreterit) {
            classResult = buildPretUniversalResultFromVariants(
                variants,
                subjectPrefix,
                objectPrefix,
                subjectSuffix,
                directionalInputPrefix,
                directionalOutputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix,
                pretPluralSuffix,
                indirectObjectMarker,
                hasDoubleDash,
                isYawi
            );
        } else {
            const suffix = subjectSuffix || "";
            const bases = [];
            const seenBase = new Set();
            variants.forEach((variant) => {
                if (!seenBase.has(variant.base)) {
                    seenBase.add(variant.base);
                    bases.push(variant.base);
                }
            });
            const forms = [];
            const seenForm = new Set();
            bases.forEach((base) => {
                const { prefix, base: baseCore } = getPretUniversalPrefixForBase(
                    base,
                    subjectPrefix,
                    objectPrefix,
                    directionalInputPrefix,
                    directionalOutputPrefix,
                    baseSubjectPrefix,
                    baseObjectPrefix,
                    indirectObjectMarker,
                    hasDoubleDash,
                    isYawi
                );
                const form = `${prefix}${baseCore}${suffix}`;
                if (!seenForm.has(form)) {
                    seenForm.add(form);
                    forms.push(form);
                }
            });
            classResult = forms.join(" / ");
        }
        if (!classResult) {
            return;
        }
        classResult.split(" / ").forEach((form) => {
            if (!seen.has(form)) {
                seen.add(form);
                results.push(form);
            }
        });
    });
    return results.join(" / ");
}

function buildPretUniversalProvenance({
    verb,
    analysisTarget,
    tense,
    classKey,
    isTransitive,
    context,
    variants,
    subjectSuffix,
    blockedReason = null,
    suppletiveStemSet = null,
}) {
    return {
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        stemPath: context?.stemPath || null,
        fromRootPlusYa: Boolean(context?.fromRootPlusYa),
        isMonosyllable: Boolean(context?.isMonosyllable),
        variants: (variants || []).map((variant) => ({
            base: variant.base,
            suffix: variant.suffix,
        })),
        subjectSuffix,
        blockedReason,
        usesSuppletiveSet: Boolean(suppletiveStemSet),
    };
}

function buildPretUniversalResultWithProvenance({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    analysisVerb,
    exactBaseVerb,
    isYawi = false,
    isWeya = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
    hasDoubleDash = false,
    forceClassBOnly = false,
}) {
    const analysisTarget = getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    const isTransitive = forceTransitive || objectPrefix !== "";
    const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
    const classKey = forceClassBOnly ? "B" : PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
    let context = null;
    let variants = null;
    let pluralSuffix = null;
    let blockedReason = null;
    if (classKey === "B") {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly,
        });
        const candidates = getPretUniversalClassCandidates(context);
        const classAVariants = normalizePretYawiPreteriteVariants(
            candidates.has("A") ? buildPretUniversalClassA(context) : null,
            tense,
            isYawi
        );
        const hasClassAVariants = Array.isArray(classAVariants) && classAVariants.length > 0;
        if (context.forceClassAForKWV) {
            if (hasClassAVariants) {
                blockedReason = "class-b-fallback-to-a-kwv";
                const result = buildPretUniversalResultFromVariants(
                    classAVariants,
                    subjectPrefix,
                    objectPrefix,
                    subjectSuffix,
                    directionalInputPrefix,
                    directionalOutputPrefix,
                    baseSubjectPrefix,
                    baseObjectPrefix,
                    null,
                    indirectObjectMarker,
                    hasDoubleDash,
                    isYawi
                );
                return {
                    result,
                    provenance: buildPretUniversalProvenance({
                        verb,
                        analysisTarget,
                        tense,
                        classKey,
                        isTransitive,
                        context,
                        variants: classAVariants,
                        subjectSuffix,
                        blockedReason,
                        suppletiveStemSet,
                    }),
                };
            }
        }
        if (!isTransitive && !context.fromRootPlusYa) {
            const mvSource = context.analysisVerb || context.verb || "";
            const isMVEnding = context.endsWithMV || /m[ai]$/.test(mvSource);
            const allowClassBWithA = (
                (context.isExactCVsV && context.lastNucleus === "i")
                || context.isExactCVCVwa
            ) && !isTransitive && !context.isReduplicated;
            if (candidates.has("A") && hasClassAVariants && !isMVEnding && !allowClassBWithA) {
                blockedReason = "class-b-fallback-to-a";
                const result = buildPretUniversalResultFromVariants(
                    classAVariants,
                    subjectPrefix,
                    objectPrefix,
                    subjectSuffix,
                    directionalInputPrefix,
                    directionalOutputPrefix,
                    baseSubjectPrefix,
                    baseObjectPrefix,
                    null,
                    indirectObjectMarker,
                    hasDoubleDash,
                    isYawi
                );
                return {
                    result,
                    provenance: buildPretUniversalProvenance({
                        verb,
                        analysisTarget,
                        tense,
                        classKey,
                        isTransitive,
                        context,
                        variants: classAVariants,
                        subjectSuffix,
                        blockedReason,
                        suppletiveStemSet,
                    }),
                };
            }
        }
    }
    if (suppletiveStemSet && classKey) {
        if (
            subjectSuffix === "t"
            && suppletiveStemSet.pretPluralClasses
            && !suppletiveStemSet.pretPluralClasses.has(classKey)
        ) {
            blockedReason = "suppletive-plural-class-blocked";
            context = context || buildPretUniversalContext(verb, analysisTarget, isTransitive, {
                isYawi,
                isWeya,
                hasSlashMarker,
                hasSuffixSeparator,
                hasLeadingDash,
                hasBoundMarker,
                hasCompoundMarker,
                hasImpersonalTaPrefix,
                hasOptionalSupportiveI,
                hasNonspecificValence,
                isBitransitive,
                exactBaseVerb,
                rootPlusYaBase,
                rootPlusYaBasePronounceable,
                derivationType,
                forceClassBOnly,
            });
            return {
                result: null,
                provenance: buildPretUniversalProvenance({
                    verb,
                    analysisTarget,
                    tense,
                    classKey,
                    isTransitive,
                    context,
                    variants,
                    subjectSuffix,
                    blockedReason,
                    suppletiveStemSet,
                }),
            };
        }
        variants = normalizePretYawiPreteriteVariants(
            suppletiveStemSet.variantsByClass.get(classKey) || null,
            tense,
            isYawi
        );
        if (subjectSuffix === "t" && suppletiveStemSet.pretPluralSuffix) {
            pluralSuffix = suppletiveStemSet.pretPluralSuffix;
        }
    } else {
        variants = normalizePretYawiPreteriteVariants(
            getPretUniversalVariants(verb, tense, isTransitive, analysisTarget, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly,
        }),
            tense,
            isYawi
        );
    }
    if (!context) {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly,
        });
    }
    if (!variants || variants.length === 0) {
        blockedReason = blockedReason || "no-variants";
        return {
            result: null,
            provenance: buildPretUniversalProvenance({
                verb,
                analysisTarget,
                tense,
                classKey,
                isTransitive,
                context,
                variants,
                subjectSuffix,
                blockedReason,
                suppletiveStemSet,
            }),
        };
    }
    const result = buildPretUniversalResultFromVariants(
        variants,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        pluralSuffix,
        indirectObjectMarker,
        hasDoubleDash,
        isYawi
    );
    return {
        result,
        provenance: buildPretUniversalProvenance({
            verb,
            analysisTarget,
            tense,
            classKey,
            isTransitive,
            context,
            variants,
            subjectSuffix,
            blockedReason,
            suppletiveStemSet,
        }),
    };
}
