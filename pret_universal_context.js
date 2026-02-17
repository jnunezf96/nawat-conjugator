// Preterit/perfective universal context + candidate selection.
// Extracted from pret_universal_engine.js for maintainability.
function getPretUniversalCoreVowelCount(verb) {
    const lastLIndex = verb.lastIndexOf("l");
    if (lastLIndex >= 0 && lastLIndex < verb.length - 1) {
        return getTotalVowelCount(verb.slice(lastLIndex + 1));
    }
    return getTotalVowelCount(verb);
}

function getUniversalReplacementStem(verb, options = {}) {
    if (verb.endsWith("ya")) {
        const letters = splitVerbLetters(verb);
        const recent = letters.slice(Math.max(0, letters.length - 6));
        const hasRecentS = recent.includes("s");
        const base = verb.slice(0, -2);
        if (!options.isTransitive && hasRecentS) {
            return base.endsWith("s") ? base : base + "s";
        }
        return base + "sh";
    }
    return verb.slice(0, -1) + "j";
}

function getPerfectiveReplacementStem(verb, options = {}) {
    return getUniversalReplacementStem(verb, options);
}

function applyPretUniversalDeletionShift(stem, options = {}) {
    if (stem.endsWith("kw")) {
        return [stem.slice(0, -2) + "k"];
    }
    if (stem.endsWith("w")) {
        return [stem, stem.slice(0, -1) + "j"];
    }
    if (stem.endsWith("m")) {
        return [stem.slice(0, -1) + "n"];
    }
    if (stem.endsWith("y")) {
        const letters = splitVerbLetters(stem);
        const recent = letters.slice(Math.max(0, letters.length - 6));
        const hasRecentS = recent.includes("s");
        const base = stem.slice(0, -1);
        if (!options.isTransitive && hasRecentS) {
            return [base.endsWith("s") ? base : base + "s"];
        }
        return [base + "sh"];
    }
    return [stem];
}

function getPerfectiveAlternationStems(verb, options = {}) {
    if (!verb) {
        return [];
    }
    const isRootPlusYa = options.isRootPlusYa === true;
    if (isRootPlusYa && verb.endsWith("ya")) {
        const replaced = getPerfectiveReplacementStem(verb, options);
        return replaced ? [replaced] : [];
    }
    const base = verb.slice(0, -1);
    if (!base) {
        return [];
    }
    return applyPretUniversalDeletionShift(base, options);
}

function getMonosyllableStemPath(verb) {
    if (!verb) {
        return null;
    }
    return {
        path: "monosyllable",
        classDBase: `${verb}j`,
    };
}

const PRET_UNIVERSAL_CLASS_ORDER = Object.freeze(["A", "B", "C", "D"]);
const PRET_UNIVERSAL_RULE_TIER_ORDER = Object.freeze([
    "override",
    "path",
    "monosyllable",
    "forced",
    "exact",
    "default",
]);
const PRET_UNIVERSAL_DEFAULT_RULE_LABEL = "default class rules";
const PRET_UNIVERSAL_DEFAULT_RULE_TIER = "default";
const PRET_UNIVERSAL_CLASS_ORDER_INDEX = Object.freeze(
    PRET_UNIVERSAL_CLASS_ORDER.reduce((acc, classKey, index) => {
        acc[classKey] = index;
        return acc;
    }, {}),
);
const PRET_UNIVERSAL_CLASS_GATE_RULES = Object.freeze([
    {
        id: "unpronounceable_root",
        label: "unpronounceable root",
        tier: PRET_UNIVERSAL_DEFAULT_RULE_TIER,
        when: (context, flags) => !context?.rootSyllablesOk && !flags?.allowUnpronounceable,
        classes: [],
    },
    {
        id: "override_classes",
        tier: "override",
        when: (_context, flags) => {
            const override = flags?.override;
            return Boolean(override && Array.isArray(override.classes) && override.classes.length);
        },
        resolveLabel: (context, flags) => {
            const override = flags?.override || {};
            const labelBase = override.id || context?.analysisVerb || override.verbs?.[0] || "lexical";
            return `override ${labelBase}`;
        },
        resolveCandidates: (_context, flags) => {
            const override = flags?.override || {};
            return toPretUniversalCandidateSet(override.classes);
        },
    },
]);

function getPretUniversalClassOrder() {
    return PRET_UNIVERSAL_CLASS_ORDER.slice();
}

function sortPretUniversalClassKeys(values) {
    const entries = Array.isArray(values)
        ? values
        : Array.from(values || []);
    return Array.from(new Set(entries.filter(Boolean))).sort((left, right) => {
        const leftIndex = Object.prototype.hasOwnProperty.call(PRET_UNIVERSAL_CLASS_ORDER_INDEX, left)
            ? PRET_UNIVERSAL_CLASS_ORDER_INDEX[left]
            : Number.MAX_SAFE_INTEGER;
        const rightIndex = Object.prototype.hasOwnProperty.call(PRET_UNIVERSAL_CLASS_ORDER_INDEX, right)
            ? PRET_UNIVERSAL_CLASS_ORDER_INDEX[right]
            : Number.MAX_SAFE_INTEGER;
        if (leftIndex !== rightIndex) {
            return leftIndex - rightIndex;
        }
        return String(left).localeCompare(String(right));
    });
}

function formatPretUniversalClassList(candidates) {
    return sortPretUniversalClassKeys(candidates).join("/");
}

function inferPretUniversalRuleTier(ruleLabel = "") {
    const label = String(ruleLabel || "").toLowerCase();
    if (!label) {
        return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    }
    const mappedTier = PRET_UNIVERSAL_RULE_TIER_BY_LABEL?.[label];
    if (mappedTier) {
        return mappedTier;
    }
    if (label.startsWith("override")) {
        return "override";
    }
    if (
        label === PRET_UNIVERSAL_DEFAULT_RULE_LABEL
        || label === "unpronounceable root"
    ) {
        return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    }
    return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
}

function buildPretUniversalContext(verb, analysisVerb, isTransitive, options = {}) {
    const isYawi = options.isYawi === true;
    const isWeya = options.isWeya === true;
    const isBitransitive = options.isBitransitive === true;
    const hasSlashMarker = options.hasSlashMarker === true;
    const hasSuffixSeparator = options.hasSuffixSeparator === true;
    const hasLeadingDash = options.hasLeadingDash === true;
    const hasBoundMarker = options.hasBoundMarker === true;
    const hasCompoundMarker = options.hasCompoundMarker === true;
    const boundPrefix = typeof options.boundPrefix === "string" ? options.boundPrefix : "";
    const hasImpersonalTaPrefix = options.hasImpersonalTaPrefix === true;
    const hasOptionalSupportiveI = options.hasOptionalSupportiveI === true;
    const hasNonspecificValence = options.hasNonspecificValence === true;
    const derivationType = options.derivationType || "";
    const exactBaseVerb = derivationType === DERIVATION_TYPE.direct
        ? options.exactBaseVerb
        : "";
    const sourceVerb = exactBaseVerb || getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    const rootPlusYaSource = hasImpersonalTaPrefix ? verb : sourceVerb;
    const rawSyllables = getSyllables(sourceVerb, {
        analysis: true,
        assumeFinalV: true,
    });
    const getLooseRedupRoot = (syls) => {
        if (!syls || syls.length < 2) {
            return sourceVerb;
        }
        const first = syls[0];
        const second = syls[1];
        if (!REDUP_PREFIX_FORMS.has(first?.form) || !second?.nucleus) {
            return sourceVerb;
        }
        if (getSyllableBaseKey(first) !== getSyllableBaseKey(second)) {
            return sourceVerb;
        }
        return syls.slice(1).map((syllable) => syllable.text).join("");
    };
    const strictNonRedupRoot = getNonReduplicatedRoot(sourceVerb);
    const nonRedupRoot = strictNonRedupRoot !== sourceVerb
        ? strictNonRedupRoot
        : getLooseRedupRoot(rawSyllables);
    const baseIsReduplicated = sourceVerb !== nonRedupRoot;
    const parsedRootPlusYaBase = typeof options.rootPlusYaBase === "string"
        ? options.rootPlusYaBase
        : "";
    const parsedRootPlusYaPronounceable = typeof options.rootPlusYaBasePronounceable === "string"
        ? options.rootPlusYaBasePronounceable
        : "";
    const computedRootPlusYaBase = !isTransitive && parsedRootPlusYaBase
        ? parsedRootPlusYaBase
        : getRootPlusYaBase(rootPlusYaSource, { isTransitive, isYawi, isWeya });
    const rootPlusYaBase = isTransitive ? null : computedRootPlusYaBase;
    const rootPlusYaBasePronounceable = rootPlusYaBase
        ? (parsedRootPlusYaPronounceable || (isSyllableSequencePronounceable(rootPlusYaBase) ? rootPlusYaBase : ""))
        : "";
    const isRootPlusYa = Boolean(rootPlusYaBase);
    const isReduplicatedCVCV = !isRootPlusYa
        && baseIsReduplicated
        && rawSyllables.length >= 2
        && rawSyllables[0]?.form === "CV"
        && rawSyllables[1]?.form === "CV"
        && getSyllableBaseKey(rawSyllables[0]) === getSyllableBaseKey(rawSyllables[1]);
    const analysisRoot = isRootPlusYa ? rootPlusYaBase : nonRedupRoot;
    const isCausativeTypeTwo = derivationType === DERIVATION_TYPE.causative
        && /(t|w|l)ia$/.test(analysisRoot);
    const redupRoot = isRootPlusYa ? getNonReduplicatedRoot(rootPlusYaBase) : analysisRoot;
    const isReduplicatedRootPlusYa = isRootPlusYa && redupRoot !== rootPlusYaBase;
    const verbOverride = getPretUniversalVerbOverride(analysisRoot, isTransitive);
    let allowUnpronounceable = verbOverride?.allowUnpronounceable === true;
    let allowUnpronounceableStems = verbOverride?.allowUnpronounceableStems === true;
    if (isCausativeTypeTwo) {
        allowUnpronounceable = true;
        allowUnpronounceableStems = true;
    }
    const classAKiOnly = verbOverride?.classAKiOnly === true;
    const allowKWVClassB = verbOverride?.allowKWVClassB === true;
    const letters = analysisRoot ? splitVerbLetters(analysisRoot) : [];
    const startsWithConsonant = letters.length > 0 && isVerbLetterConsonant(letters[0]);
    const startsWithConsonantCluster = startsWithConsonant
        && letters.length > 1
        && isVerbLetterConsonant(letters[1]);
    const startsWithL = letters[0] === "l";
    const startsWithJ = letters[0] === "j";
    const hasBoundaryMarker = hasSlashMarker || hasSuffixSeparator || hasLeadingDash;
    const allowSupportiveMatch = startsWithConsonant
        && !hasNonspecificValence
        && (
            hasOptionalSupportiveI
            || (!hasBoundaryMarker || startsWithConsonantCluster || startsWithL || startsWithJ)
        );
    const supportiveInitialI = allowSupportiveMatch;
    const supportiveRoot = allowSupportiveMatch ? `i${analysisRoot}` : "";
    const syllables = getSyllables(analysisRoot, {
        analysis: true,
        assumeFinalV: true,
    });
    const supportiveSyllables = supportiveRoot
        ? getSyllables(supportiveRoot, { analysis: true, assumeFinalV: true })
        : null;
    const analysisSyllables = baseIsReduplicated ? rawSyllables : syllables;
    const matchExact = (matcher) => (
        matcher(syllables, 0)
        || (baseIsReduplicated && matcher(analysisSyllables, 1))
        || (supportiveSyllables && matcher(supportiveSyllables, 0))
    );
    const letterCount = getVerbLetterCount(analysisRoot);
    const syllableForms = syllables.length ? syllables.map((syllable) => syllable.form) : null;
    const syllableCount = syllableForms
        ? syllableForms.length
        : getPretUniversalCoreVowelCount(analysisRoot);
    const vowelCount = getTrailingVowelCountFromSyllables(syllables);
    let isMonosyllable = syllableCount === 1;
    let isDerivedMonosyllable = isMonosyllable;
    if (isRootPlusYa) {
        isMonosyllable = false;
        isDerivedMonosyllable = false;
    }
    const stemPath = isRootPlusYa ? "root-plus-ya" : (isMonosyllable ? "monosyllable" : "default");
    const monosyllableStemPath = isMonosyllable ? getMonosyllableStemPath(verb) : null;
    const lastSyllable = syllables[syllables.length - 1] || null;
    const penultimateSyllable = syllables[syllables.length - 2] || null;
    const antepenultimateSyllable = syllables[syllables.length - 3] || null;
    const lastOnset = lastSyllable?.onset || "";
    const lastNucleus = lastSyllable?.nucleus || "";
    const penultimateNucleus = penultimateSyllable?.nucleus || "";
    const endsWithKV = lastSyllable?.form === "CV" && lastOnset === "k";
    const endsWithKU = endsWithKV && lastNucleus === "u";
    const endsWithKWV = lastSyllable?.form === "CV" && lastOnset === "kw";
    const endsWithKWU = endsWithKWV && lastNucleus === "u";
    const endsWithKSeries = endsWithKV || endsWithKWV;
    const endsWithKSeriesU = endsWithKU || endsWithKWU;
    const endsWithKSeriesNoU = endsWithKSeries && !endsWithKSeriesU;
    const endsWithWV = lastSyllable?.form === "CV" && lastOnset === "w";
    const endsWithWa = endsWithWV && lastNucleus === "a";
    const endsWithTV = lastSyllable?.form === "CV" && lastOnset === "t";
    const endsWithNV = lastSyllable?.form === "CV" && lastOnset === "n";
    const endsWithLV = letterCount >= 5
        && lastSyllable?.form === "V"
        && penultimateSyllable?.coda === "l";
    const endsWithVjCV = lastSyllable?.form === "CV"
        && (penultimateSyllable?.form === "Vj" || penultimateSyllable?.form === "CVj");
    const endsWithVlCV = lastSyllable?.form === "CV"
        && (penultimateSyllable?.form === "Vl" || penultimateSyllable?.form === "CVl");
    const endsWithVCCV = syllables.length >= 3
        && penultimateSyllable?.form === "C"
        && lastSyllable?.form === "CV"
        && (
            syllables[syllables.length - 3]?.form === "V"
            || syllables[syllables.length - 3]?.form === "CV"
        );
    const forceClassBEnding = endsWithVjCV || endsWithVlCV || endsWithVCCV;
    const endsWithPV = lastSyllable?.form === "CV" && lastOnset === "p";
    const endsWithPA = endsWithPV && lastNucleus === "a";
    const endsWithPI = endsWithPV && lastNucleus === "i";
    const endsWithMV = lastSyllable?.form === "CV"
        && lastOnset === "m"
        && (lastNucleus === "a" || lastNucleus === "i");
    const endsWithChi = lastSyllable?.form === "CV"
        && lastOnset === "ch"
        && lastNucleus === "i";
    const endsWithU = isOpenSyllable(lastSyllable) && lastNucleus === "u";
    const endsWithTA = lastSyllable?.form === "CV" && lastOnset === "t" && lastNucleus === "a";
    const endsWithYA = lastSyllable?.form === "CV" && lastOnset === "y" && lastNucleus === "a";
    const endsWithTZV = lastSyllable?.form === "CV" && lastOnset === "tz";
    const endsWithTZA = endsWithTZV && lastNucleus === "a";
    const endsWithKA = lastSyllable?.form === "CV" && lastOnset === "k" && lastNucleus === "a";
    const endsWithVka = endsWithKA && penultimateSyllable?.form === "V";
    const endsWithCVka = endsWithKA && penultimateSyllable?.form === "CV";
    const endsWithCaka = endsWithCVka && penultimateSyllable?.nucleus === "a";
    const endsWithCVnV = endsWithNV && penultimateSyllable?.form === "CV";
    const endsWithVnV = endsWithNV && penultimateSyllable?.form === "V";
    const matchesExactVnV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "n"
    );
    const matchesExactCVnV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "n"
    );
    const matchesExactCVsV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "s"
    );
    const matchesExactCVpV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "p"
    );
    const isNaFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "n"
        && syllable.nucleus === "a"
    );
    const isNiFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "n"
        && syllable.nucleus === "i"
    );
    const isTaFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "t"
        && syllable.nucleus === "a"
    );
    const isTzaFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "tz"
        && syllable.nucleus === "a"
    );
    const isMaFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "m"
        && syllable.nucleus === "a"
    );
    const isKwiFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "kw"
        && syllable.nucleus === "i"
    );
    const isCuFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.nucleus === "u"
    );
    const matchesNiaSuffix = (syls, startIndex = 0) => (
        syls.length - startIndex >= 2
        && isNiFinalSyllable(syls[startIndex])
        && syls[startIndex + 1]?.form === "V"
        && syls[startIndex + 1]?.nucleus === "a"
    );
    const matchesExactVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "V"
        && isNaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCVCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVlVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && isNaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVlCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCVCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCCVCVna = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isNaFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVta = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isTaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCVtza = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isTzaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVjCVtza = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isTzaFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isTzaFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactCVnia = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && matchesNiaSuffix(syls, startIndex + 1)
    );
    const matchesExactCVCVnia = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && matchesNiaSuffix(syls, startIndex + 2)
    );
    const matchesExactCVlVnia = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && matchesNiaSuffix(syls, startIndex + 2)
    );
    const matchesExactVjCVnia = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && matchesNiaSuffix(syls, startIndex + 2)
        ) || (
            syls.length - startIndex === 5
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && matchesNiaSuffix(syls, startIndex + 3)
        )
    );
    const matchesExactCVlVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && isNiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVjCVni = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isNiFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isNiFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactVjCVna = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isNaFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isNaFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactCVCVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && isNiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCVCVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isNiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCCVCVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isNiFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVCVCVCVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isNiFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "V"
        && isNiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVni = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isNiFinalSyllable(syls[startIndex + 1])
    );
    const isWiFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "w"
        && syllable.nucleus === "i"
    );
    const matchesExactVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "V"
        && isWiFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "C"
        && isWiFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVCCVwiShort = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "C"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVjCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVj"
        && syls[startIndex + 1]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVkwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isKwiFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVCVCu = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "CV"
        && isCuFinalSyllable(syls[startIndex + 2])
    );
    const isCewaCVSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.nucleus === "e"
    );
    const isCawaCVSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.nucleus === "a"
    );
    const matchesExactCewa = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && isCewaCVSyllable(syls[startIndex])
        && isWaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVCCawa = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "C"
        && isCawaCVSyllable(syls[startIndex + 2])
        && isWaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactVlV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "V"
    );
    const matchesExactCVlV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
    );
    const matchesExactVlVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "V"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const isWaFinalSyllable = (syllable) => (
        syllable?.form === "CV"
        && syllable.onset === "w"
        && syllable.nucleus === "a"
    );
    const matchesExactVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "V"
        && isWaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVjwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "Vj"
        && isWaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVCCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "C"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVjCVwa = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isWaFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isWaFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactCVjCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVj"
        && syls[startIndex + 1]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCawa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && isCawaCVSyllable(syls[startIndex + 1])
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCewa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && isCewaCVSyllable(syls[startIndex + 1])
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVjCewa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vj"
        && isCewaCVSyllable(syls[startIndex + 1])
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVlewa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && syls[startIndex + 1]?.nucleus === "e"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVlawa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && syls[startIndex + 1]?.nucleus === "a"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVlVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "V"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVlVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVlCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCVCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCCVCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVlCVCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactVCCVCVwa = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isWaFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVlVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "V"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactVlCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 3
        && syls[startIndex]?.form === "Vl"
        && syls[startIndex + 1]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 2])
    );
    const matchesExactCVCVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactVCCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactVjCVwi = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isWiFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isWiFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactVjCVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "Vj"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVVjCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "Vj"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCVlVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CVl"
        && syls[startIndex + 2]?.form === "V"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactCVCCVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 5
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "C"
        && syls[startIndex + 2]?.form === "CV"
        && syls[startIndex + 3]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 4])
    );
    const matchesExactCVlCVCVwi = (syls, startIndex = 0) => (
        syls.length - startIndex === 4
        && syls[startIndex]?.form === "CVl"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 2]?.form === "CV"
        && isWiFinalSyllable(syls[startIndex + 3])
    );
    const matchesExactLongFinal = (syls, startIndex, minLength, isFinal) => {
        if (syls.length - startIndex < minLength) {
            return false;
        }
        if (!isFinal(syls[syls.length - 1])) {
            return false;
        }
        for (let i = startIndex; i < syls.length; i += 1) {
            if (!SYLLABLE_FORM_SET.has(syls[i]?.form)) {
                return false;
            }
        }
        return true;
    };
    const matchesExactLongWa = (syls, startIndex = 0) => (
        matchesExactLongFinal(syls, startIndex, 4, isWaFinalSyllable)
    );
    const matchesExactLongWi = (syls, startIndex = 0) => (
        matchesExactLongFinal(syls, startIndex, 4, isWiFinalSyllable)
    );
    const matchesExactLongNa = (syls, startIndex = 0) => (
        matchesExactLongFinal(syls, startIndex, 4, isNaFinalSyllable)
    );
    const matchesExactLongNi = (syls, startIndex = 0) => (
        matchesExactLongFinal(syls, startIndex, 4, isNiFinalSyllable)
    );
    const matchesExactCVmV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "m"
    );
    const matchesExactCVma = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && isMaFinalSyllable(syls[startIndex + 1])
    );
    const matchesExactVjCVma = (syls, startIndex = 0) => (
        (
            syls.length - startIndex === 3
            && syls[startIndex]?.form === "Vj"
            && syls[startIndex + 1]?.form === "CV"
            && isMaFinalSyllable(syls[startIndex + 2])
        ) || (
            syls.length - startIndex === 4
            && syls[startIndex]?.form === "V"
            && syls[startIndex + 1]?.form === "C"
            && syls[startIndex + 1]?.onset === "j"
            && syls[startIndex + 2]?.form === "CV"
            && isMaFinalSyllable(syls[startIndex + 3])
        )
    );
    const matchesExactCVV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "V"
    );
    const matchesExactVV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "V"
        && syls[startIndex + 1]?.form === "V"
    );
    const matchesExactCa = (syls, startIndex = 0) => (
        syls.length - startIndex === 1
        && syls[startIndex]?.form === "CV"
        && syls[startIndex]?.nucleus === "a"
    );
    const matchesExactTi = (syls, startIndex = 0) => (
        syls.length - startIndex === 1
        && syls[startIndex]?.form === "CV"
        && syls[startIndex]?.onset === "t"
        && syls[startIndex]?.nucleus === "i"
    );
    const hasVnVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "V" || syllables[0]?.form === "Vj")
        && matchesExactVnV(syllables, 1);
    const hasCVnVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "CV" || syllables[0]?.form === "CVj")
        && matchesExactCVnV(syllables, 1);
    const hasCVsVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "CV" || syllables[0]?.form === "CVj")
        && matchesExactCVsV(syllables, 1);
    const hasCVmVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "CV" || syllables[0]?.form === "CVj")
        && matchesExactCVmV(syllables, 1);
    const isExactVnVRaw = matchExact(matchesExactVnV) || hasVnVRedupPrefix;
    const isExactCVnVRaw = matchExact(matchesExactCVnV) || hasCVnVRedupPrefix;
    const isExactCVsV = matchExact(matchesExactCVsV) || hasCVsVRedupPrefix;
    const isExactCVpV = matchExact(matchesExactCVpV);
    const isExactCVmV = matchExact(matchesExactCVmV) || hasCVmVRedupPrefix;
    const isExactCVma = matchExact(matchesExactCVma);
    const isExactVjCVma = matchExact(matchesExactVjCVma);
    const isExactCVV = matchExact(matchesExactCVV);
    const isExactVV = matchExact(matchesExactVV);
    const isExactCa = matchExact(matchesExactCa);
    const isExactTi = matchExact(matchesExactTi);
    const isExactVna = matchExact(matchesExactVna);
    const isExactCVna = matchExact(matchesExactCVna);
    const isExactCVCVna = matchExact(matchesExactCVCVna);
    const isExactCVlVna = matchExact(matchesExactCVlVna);
    const isExactVlCVna = matchExact(matchesExactVlCVna);
    const isExactCVCCVna = matchExact(matchesExactCVCCVna);
    const isExactCVCVCVna = matchExact(matchesExactCVCVCVna);
    const isExactCVCCVCVna = matchExact(matchesExactCVCCVCVna);
    const isExactCVta = matchExact(matchesExactCVta)
        || (baseIsReduplicated && matchesExactCVta(rawSyllables, 0));
    const isExactCVtza = matchExact(matchesExactCVtza);
    const isExactVjCVtza = matchExact(matchesExactVjCVtza);
    const isExactCVnia = matchExact(matchesExactCVnia);
    const isExactCVCVnia = matchExact(matchesExactCVCVnia);
    const isExactCVlVnia = matchExact(matchesExactCVlVnia);
    const isExactVjCVnia = matchExact(matchesExactVjCVnia);
    const isExactCVlVni = matchExact(matchesExactCVlVni);
    const isExactVjCVni = matchExact(matchesExactVjCVni);
    const isExactVjCVna = matchExact(matchesExactVjCVna);
    const isExactCVCVni = matchExact(matchesExactCVCVni);
    const isExactCVCVCVni = matchExact(matchesExactCVCVCVni);
    const isExactCVCCVCVni = matchExact(matchesExactCVCCVCVni);
    const isExactCVCVCVCVni = matchExact(matchesExactCVCVCVCVni);
    const isExactCVVni = matchExact(matchesExactCVVni);
    const isExactCVni = matchExact(matchesExactCVni);
    const isExactCVniU = isExactCVni && syllables[0]?.nucleus === "u";
    const endsWithNaOrNi = isExactVna || isExactCVna;
    const isExactVnV = isExactVnVRaw && !isExactVna && !endsWithNaOrNi;
    const isExactCVnV = isExactCVnVRaw && !isExactCVna && !endsWithNaOrNi;
    const isExactVwi = matchExact(matchesExactVwi);
    const isExactCVwi = matchExact(matchesExactCVwi);
    const isExactCCVwi = matchExact(matchesExactCCVwi);
    const isExactVCCVwiShort = matchExact(matchesExactVCCVwiShort);
    const isExactCVkwi = matchExact(matchesExactCVkwi);
    const isExactVCVwi = matchExact(matchesExactVCVwi);
    const isExactVCVCu = matchesExactVCVCu(syllables, 0)
        || (baseIsReduplicated && matchesExactVCVCu(analysisSyllables, 1));
    const isExactVlV = matchExact(matchesExactVlV);
    const isExactCVlV = matchExact(matchesExactCVlV);
    const isExactVlVwi = matchExact(matchesExactVlVwi);
    const isExactVwa = matchExact(matchesExactVwa);
    const isExactVjwa = matchExact(matchesExactVjwa);
    const isExactCVwa = matchExact(matchesExactCVwa);
    const isExactVCCVwa = matchExact(matchesExactVCCVwa);
    const isExactCVwaA = isExactCVwa && syllables[0]?.nucleus === "a";
    const isExactCVwaI = isExactCVwa && syllables[0]?.nucleus === "i";
    const isExactCewa = matchExact(matchesExactCewa);
    const isExactVCCawa = matchExact(matchesExactVCCawa);
    const isExactCuwa = isExactCVwa && syllables[0]?.nucleus === "u";
    const isExactVwaI = isExactVwa && syllables[0]?.nucleus === "i";
    const isExactCVCVwa = matchExact(matchesExactCVCVwa);
    const isExactVjCVwa = matchExact(matchesExactVjCVwa);
    const isExactCVjCVwa = matchExact(matchesExactCVjCVwa);
    const isExactCVCawa = matchExact(matchesExactCVCawa);
    const isExactCVCewa = matchExact(matchesExactCVCewa);
    const isExactVjCewa = matchExact(matchesExactVjCewa);
    const isExactCVlewa = matchExact(matchesExactCVlewa);
    const isExactCVlawa = matchExact(matchesExactCVlawa);
    const isExactVlVwa = matchExact(matchesExactVlVwa);
    const isExactCVlVwa = matchExact(matchesExactCVlVwa);
    const isExactVlCVwa = matchExact(matchesExactVlCVwa);
    const isExactCVCCVwa = matchExact(matchesExactCVCCVwa);
    const isExactCVCVCVwa = matchExact(matchesExactCVCVCVwa);
    const isExactCVCCVCVwa = matchExact(matchesExactCVCCVCVwa);
    const isExactCVlCVCVwa = matchExact(matchesExactCVlCVCVwa);
    const isExactVCCVCVwa = matchExact(matchesExactVCCVCVwa);
    const isExactCVCVwi = matchExact(matchesExactCVCVwi);
    const isExactCVlVwi = matchExact(matchesExactCVlVwi);
    const isExactVlCVwi = matchExact(matchesExactVlCVwi);
    const isExactCVCVCVwi = matchExact(matchesExactCVCVCVwi);
    const isExactVCCVwi = matchExact(matchesExactVCCVwi);
    const isExactCVjCVwi = matchExact(matchesExactCVjCVwi);
    const isExactCVCVlVwi = matchExact(matchesExactCVCVlVwi);
    const isExactCVCCVwi = matchExact(matchesExactCVCCVwi);
    const isExactCVCCVCVwi = matchExact(matchesExactCVCCVCVwi);
    const isExactCVlCVCVwi = matchExact(matchesExactCVlCVCVwi);
    const isExactVjCVwi = matchExact(matchesExactVjCVwi);
    const isExactVjCVCVwi = matchExact(matchesExactVjCVCVwi);
    const isExactCVVjCVwi = matchExact(matchesExactCVVjCVwi);
    const isExactLongWa = matchExact(matchesExactLongWa);
    const isExactLongWi = matchExact(matchesExactLongWi);
    const isExactLongNa = matchExact(matchesExactLongNa);
    const isExactLongNi = matchExact(matchesExactLongNi);
    const resolvedForceClassBEnding = forceClassBEnding
        && !isExactVCCVwi
        && !isExactVCCVwiShort
        && !isExactVCCVwa;
    const isExactWiPattern = (
        isExactVwi
        || isExactCVwi
        || isExactVCVwi
        || isExactVlVwi
        || isExactCVCVwi
        || isExactCVlVwi
        || isExactCVCVCVwi
        || isExactVCCVwi
        || isExactCVjCVwi
        || isExactCVCVlVwi
        || isExactCVCCVwi
        || isExactCVCCVCVwi
        || isExactCVlCVCVwi
        || isExactVjCVwi
        || isExactVjCVCVwi
        || isExactCVVjCVwi
        || isExactLongWi
    );
    const isExactWaPattern = (
        isExactCVwa
        || isExactCVCVwa
        || isExactVCCVwa
        || isExactCVCCVwa
        || isExactCVCVCVwa
        || isExactCVCCVCVwa
        || isExactCVlCVCVwa
        || isExactVCCVCVwa
        || isExactLongWa
    );
    const isExactEwaPattern = isExactCewa || isExactCVCewa || isExactVjCewa || isExactCVlewa;
    const isExactLWaPattern = isExactVlVwa || isExactCVlVwa;
    const isExactKawa = isExactCVwaA && syllables[0]?.onset === "k";
    const endsWithNA = lastSyllable?.form === "CV" && lastOnset === "n" && lastNucleus === "a";
    const endsWithKisV = lastSyllable?.form === "CV"
        && lastOnset === "s"
        && penultimateSyllable?.form === "CV"
        && penultimateSyllable.onset === "k"
        && penultimateSyllable.nucleus === "i"
        && antepenultimateSyllable
        && SYLLABLE_FORM_SET.has(antepenultimateSyllable.form);
    const totalVowels = getTotalVowelCountFromSyllables(syllables);
    const isVtVStart = isPlainVowelSyllable(syllables[0]) && isCVWithOnset(syllables[1], "t");
    const isVVtVStart = isPlainVowelSyllable(syllables[0])
        && isPlainVowelSyllable(syllables[1])
        && isCVWithOnset(syllables[2], "t");
    const isTransitiveUniI = isTransitive && isIVerbSyllableSequence(syllables);
    const rootSyllablesOk = areSyllablesPronounceable(syllables);
    const lastSyllableForm = lastSyllable?.form || null;
    const endsInOpenSyllable = isOpenSyllable(lastSyllable);
    const endsInOpenSyllableNonU = endsInOpenSyllable && lastNucleus !== "u";
    const endsWithIaUa = endsWithIaUaSyllables(syllables);
    const isItaVerb = isItaSyllableSequence(syllables);

    const forceClassAForKWV = endsWithKWV && !endsWithKWU && !isRootPlusYa && !isMonosyllable;
    const resolvedForceClassAForKWV = forceClassAForKWV && !allowKWVClassB;
    const resolvedVerb = isWeya && rootPlusYaBase ? `${rootPlusYaBase}ya` : verb;
    const deletionCreatesCluster = !isTransitive
        && !isRootPlusYa
        && deletionCreatesConsonantCluster(resolvedVerb);
    return {
        verb: resolvedVerb,
        analysisVerb: analysisRoot,
        verbOverride,
        allowUnpronounceable,
        allowUnpronounceableStems,
        classAKiOnly,
        supportiveInitialI,
        isTransitive,
        isBitransitive,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        fromRootPlusYa: isRootPlusYa,
        isReduplicatedRootPlusYa,
        isReduplicated: !isRootPlusYa && (
            baseIsReduplicated
            || hasVnVRedupPrefix
            || hasCVnVRedupPrefix
            || hasCVmVRedupPrefix
        ),
        isReduplicatedCVCV,
        letterCount,
        vowelCount,
        syllableForms,
        syllableCount,
        isMonosyllable,
        isDerivedMonosyllable,
        stemPath,
        isCausativeTypeTwo,
        monosyllableStemPath,
        endsWithKV,
        endsWithKU,
        endsWithKWV,
        endsWithKWU,
        endsWithKSeries,
        endsWithKSeriesU,
        endsWithKSeriesNoU,
        endsWithWV,
        endsWithWa,
        endsWithTV,
        endsWithNV,
        endsWithLV,
        endsWithVjCV,
        endsWithVlCV,
        endsWithVCCV,
        forceClassBEnding: resolvedForceClassBEnding,
        endsWithMV,
        endsWithU,
        endsWithTA,
        endsWithYA,
        endsWithTZA,
        endsWithTZV,
        endsWithKA,
        endsWithVka,
        endsWithCVka,
        endsWithCaka,
        endsWithCVnV,
        endsWithVnV,
        endsWithPV,
        endsWithPA,
        endsWithPI,
        endsWithChi,
        isExactCVnV,
        isExactCVsV,
        isExactCVpV,
        isExactVnV,
        isExactCVmV,
        isExactCVma,
        isExactVjCVma,
        isExactCVV,
        isExactVV,
        isExactCa,
        isExactTi,
        isExactVna,
        isExactCVna,
        isExactCVCVna,
        isExactCVlVna,
        isExactVlCVna,
        isExactCVCCVna,
        isExactCVCVCVna,
        isExactCVCCVCVna,
        isExactCVta,
        isExactCVtza,
        isExactVjCVtza,
        isExactCVnia,
        isExactCVCVnia,
        isExactCVlVnia,
        isExactVjCVnia,
        isExactCVlVni,
        isExactVjCVni,
        isExactVjCVna,
        isExactCVCVni,
        isExactCVCVCVni,
        isExactCVCCVCVni,
        isExactCVCVCVCVni,
        isExactCVVni,
        isExactCVni,
        isExactCVniU,
        isExactVwi,
        isExactCVwi,
        isExactCCVwi,
        isExactVCCVwiShort,
        isExactCVkwi,
        isExactVCVwi,
        isExactVCVCu,
        isExactVlV,
        isExactCVlV,
        isExactVlVwi,
        isExactVwa,
        isExactVjwa,
        isExactCVwa,
        isExactVCCVwa,
        isExactCVwaA,
        isExactCVwaI,
        isExactCewa,
        isExactVCCawa,
        isExactCuwa,
        isExactVwaI,
        isExactCVCVwa,
        isExactVjCVwa,
        isExactCVjCVwa,
        isExactCVCawa,
        isExactCVCewa,
        isExactVjCewa,
        isExactCVlewa,
        isExactCVlawa,
        isExactVlVwa,
        isExactCVlVwa,
        isExactVlCVwa,
        isExactCVCCVwa,
        isExactCVCVCVwa,
        isExactCVCCVCVwa,
        isExactCVlCVCVwa,
        isExactVCCVCVwa,
        isExactCVCVwi,
        isExactCVlVwi,
        isExactVlCVwi,
        isExactCVCVCVwi,
        isExactVCCVwi,
        isExactCVjCVwi,
        isExactCVCVlVwi,
        isExactCVCCVwi,
        isExactCVCCVCVwi,
        isExactCVlCVCVwi,
        isExactVjCVwi,
        isExactVjCVCVwi,
        isExactCVVjCVwi,
        isExactLongWa,
        isExactLongWi,
        isExactLongNa,
        isExactLongNi,
        isExactWiPattern,
        isExactWaPattern,
        isExactEwaPattern,
        isExactLWaPattern,
        isExactKawa,
        endsWithNA,
        endsWithKisV,
        totalVowels,
        isVtVStart,
        isVVtVStart,
        isTransitiveUniI,
        rootSyllablesOk,
        deletionCreatesCluster,
        lastSyllableForm,
        lastNucleus,
        penultimateNucleus,
        endsInOpenSyllable,
        endsInOpenSyllableNonU,
        endsWithIaUa,
        isItaVerb,
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        allowIntransitiveKV: resolvedForceClassAForKWV,
        forceClassAForKWV: resolvedForceClassAForKWV,
    };
}

function getRootPlusYaClassCandidates(context) {
    const candidates = new Set();
    if (!context || !context.fromRootPlusYa || context.isTransitive) {
        return candidates;
    }
    if (context.analysisVerb === "ya" || context.verb === "ya") {
        return candidates;
    }
    candidates.add("A");
    candidates.add("B");
    return candidates;
}

const PRET_UNIVERSAL_EARLY_TIER_RULES = Object.freeze([
    {
        id: "root_plus_ya",
        label: "root+ya",
        tier: "path",
        resolveCandidates: (context) => getRootPlusYaClassCandidates(context),
    },
    {
        id: "causative_type_two",
        label: "causative type-two (-ia/-ua)",
        tier: "path",
        when: (context) => context.isCausativeTypeTwo,
        classes: ["C"],
    },
    {
        id: "monosyllable_transitive_v",
        label: "monosyllable transitive V",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && context.isTransitive && context.lastSyllableForm === "V",
        classes: ["B"],
    },
    {
        id: "monosyllable_transitive_cv",
        label: "monosyllable transitive CV",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && context.isTransitive && context.lastSyllableForm === "CV",
        classes: ["D"],
    },
    {
        id: "monosyllable_intransitive_v",
        label: "monosyllable intransitive V",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && !context.isTransitive && context.lastSyllableForm === "V",
        classes: ["B"],
    },
    {
        id: "monosyllable_intransitive_cv",
        label: "monosyllable intransitive CV",
        tier: "monosyllable",
        when: (context) => (
            context.isMonosyllable
            && !context.isTransitive
            && context.lastSyllableForm === "CV"
            && context.analysisVerb !== "ta"
            && context.verb !== "ta"
        ),
        classes: ["D"],
    },
    {
        id: "deleted_vowel_cluster_intransitive",
        label: "deleted vowel cluster (intransitive)",
        tier: "forced",
        when: (context) => {
            if (context.isTransitive || !context.deletionCreatesCluster) {
                return false;
            }
            const allowClusterExactWiWa = context.isExactCCVwi
                || context.isExactVCCVwiShort
                || context.isExactVCCVwa;
            return !allowClusterExactWiWa;
        },
        classes: ["B"],
    },
    {
        id: "ends_with_ta_intransitive",
        label: "ends with ta (intransitive)",
        tier: "forced",
        when: (context) => !context.isTransitive && context.endsWithTA,
        classes: ["B"],
    },
    {
        id: "ends_with_chi_intransitive",
        label: "ends with chi (intransitive)",
        tier: "forced",
        when: (context) => !context.isTransitive && context.endsWithChi && !context.isMonosyllable,
        classes: ["A", "B"],
    },
    {
        id: "ends_with_pa_transitive",
        label: "ends with pa (transitive)",
        tier: "forced",
        when: (context) => context.isTransitive && context.endsWithPA && !context.isMonosyllable,
        classes: ["A"],
    },
    {
        id: "ends_with_ma_mi_transitive",
        label: "ends with ma/mi (transitive)",
        tier: "forced",
        when: (context) => context.isTransitive && context.endsWithMV && !context.isMonosyllable,
        classes: ["A"],
    },
    {
        id: "ends_with_pi_intransitive",
        label: "ends with pi (intransitive)",
        tier: "forced",
        when: (context) => !context.isTransitive && context.endsWithPI && !context.isMonosyllable,
        classes: ["A", "B"],
    },
    {
        id: "ends_with_ta_transitive_redup_cvcv",
        label: "ends with ta (transitive redup CVCV)",
        tier: "forced",
        when: (context) => (
            context.isTransitive
            && context.endsWithTA
            && context.analysisVerb !== "ita"
            && context.isReduplicatedCVCV
        ),
        classes: ["A", "B"],
    },
    {
        id: "ends_with_ta_transitive",
        label: "ends with ta (transitive)",
        tier: "forced",
        when: (context) => context.isTransitive && context.endsWithTA && context.analysisVerb !== "ita",
        classes: ["B"],
    },
    {
        id: "ends_with_tzv",
        label: "ends with tzV",
        tier: "forced",
        when: (context) => context.endsWithTZV && !context.endsWithVCCV,
        classes: ["A"],
    },
    {
        id: "forced_b_ending",
        label: "forced B ending",
        tier: "forced",
        when: (context) => context.forceClassBEnding,
        classes: ["B"],
    },
]);

const PRET_UNIVERSAL_LV_TIER_RULES = Object.freeze([
    {
        id: "lv_i",
        label: "LV (i)",
        tier: "forced",
        when: (context) => (
            !context.isTransitive
            && context.lastNucleus === "i"
            && (context.isExactVlV || context.isExactCVlV)
        ),
        classes: ["A", "B"],
    },
    {
        id: "ends_with_lv",
        label: "ends with LV",
        tier: "forced",
        when: (context) => context.endsWithLV,
        classes: ["A"],
    },
    {
        id: "exact_lv_i",
        label: "exact LV (i)",
        tier: "exact",
        when: (context) => (
            context.lastNucleus === "i"
            && (context.isExactVlV || context.isExactCVlV)
        ),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_EXACT_CORE_TIER_RULES = Object.freeze([
    {
        id: "exact_nia_transitive",
        label: "exact Nia (transitive)",
        tier: "exact",
        when: (context, flags) => context.isTransitive && flags.isExactNiaPattern,
        classes: ["C"],
    },
    {
        id: "exact_cvv_transitive",
        label: "exact CV-V (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVV,
        classes: ["C"],
    },
    {
        id: "exact_vv_intransitive",
        label: "exact V-V (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactVV,
        classes: ["C"],
    },
]);

const PRET_UNIVERSAL_EXACT_NA_INTRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "exact_vna_intransitive",
        label: "exact V-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactVna,
        classes: ["B"],
    },
    {
        id: "exact_cvna_intransitive",
        label: "exact CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVna,
        classes: ["A", "B"],
    },
    {
        id: "exact_cvcvna_intransitive",
        label: "exact CV-CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVCVna,
        classes: ["A"],
    },
    {
        id: "exact_cvcvcvna_intransitive",
        label: "exact CV-CV-CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVCVCVna,
        classes: ["A"],
    },
    {
        id: "exact_vwi_intransitive",
        label: "exact V-CV(wi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactVwi,
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_NA_TRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "exact_cvcvna",
        label: "exact CV-CV-CV(na)",
        tier: "exact",
        when: (context) => context.isExactCVCVna,
        classes: ["A"],
    },
    {
        id: "exact_cvlvna_transitive",
        label: "exact CVl-V-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVlVna,
        classes: ["A"],
    },
    {
        id: "exact_vlcvna_transitive",
        label: "exact Vl-CV-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVlCVna,
        classes: ["A"],
    },
    {
        id: "exact_vjcvna_transitive",
        label: "exact Vj-CV-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVjCVna,
        classes: ["A"],
    },
    {
        id: "exact_cvtza_transitive",
        label: "exact CV-CV(tza) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && (context.isExactCVtza || context.isExactVjCVtza),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_TA_PV_TIER_RULES = Object.freeze([
    {
        id: "exact_cvta_intransitive",
        label: "exact CV-CV(ta) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVta,
        classes: ["B"],
    },
    {
        id: "exact_cvpv_transitive",
        label: "exact CV-CV(pV) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVpV,
        classes: ["A"],
    },
    {
        id: "exact_cvpv_intransitive",
        label: "exact CV-CV(pV) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVpV,
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_EXACT_MA_KWI_NI_TIER_RULES = Object.freeze([
    {
        id: "exact_cvma_transitive",
        label: "exact CV-CV(ma) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && (context.isExactCVma || context.isExactVjCVma),
        classes: ["A"],
    },
    {
        id: "exact_cvkwi_intransitive",
        label: "exact CV-CV(kwi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVkwi,
        classes: ["B"],
    },
    {
        id: "exact_vcvcu_intransitive",
        label: "exact V-CV-CV(u) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactVCVCu,
        classes: ["B"],
    },
    {
        id: "exact_vlcvwi_intransitive",
        label: "exact Vl-CV-CV(wi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactVlCVwi,
        classes: ["B"],
    },
    {
        id: "exact_cvniu_intransitive",
        label: "exact CV(u)-CV(ni) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVniU,
        classes: ["B"],
    },
    {
        id: "exact_cvvni_intransitive",
        label: "exact CV-V-CV(ni) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCVVni,
        classes: ["A", "B"],
    },
    {
        id: "exact_ni_transitive",
        label: "exact Ni (transitive)",
        tier: "exact",
        when: (context, flags) => context.isTransitive && flags.isExactNiPattern,
        classes: ["A"],
    },
    {
        id: "exact_na_transitive",
        label: "exact Na (transitive)",
        tier: "exact",
        when: (context, flags) => context.isTransitive && flags.isExactNaPattern,
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_WA_ENTRY_TIER_RULES = Object.freeze([
    {
        id: "exact_vjwa",
        label: "exact Vj-CV(wa)",
        tier: "exact",
        when: (context) => context.isExactVjwa,
        classes: ["B"],
    },
    {
        id: "ends_with_u",
        label: "ends with U",
        tier: "forced",
        when: (context) => context.endsWithU,
        classes: ["B"],
    },
    {
        id: "exact_cvwai_transitive",
        label: "exact CV(i)-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVwaI,
        classes: ["A"],
    },
    {
        id: "exact_vwai_transitive",
        label: "exact V(i)-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVwaI,
        classes: ["D"],
    },
    {
        id: "exact_vwa_transitive",
        label: "exact V-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVwa && !context.isExactVwaI,
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_WA_REST_TIER_RULES = Object.freeze([
    {
        id: "exact_vccawa_transitive",
        label: "exact V-C-CV(a)-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVCCawa,
        classes: ["A"],
    },
    {
        id: "exact_wa_transitive",
        label: "exact Wa (transitive)",
        tier: "exact",
        when: (context) => (
            context.isTransitive
            && (context.isExactCVwaA || context.isExactCVCawa || context.isExactCVlawa)
        ),
        classes: ["A"],
    },
    {
        id: "exact_ewa_transitive",
        label: "exact Ewa (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactEwaPattern,
        classes: ["A"],
    },
    {
        id: "exact_vjcvwa_transitive",
        label: "exact Vj-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVjCVwa,
        classes: ["A"],
    },
    {
        id: "exact_cvjcvwa_transitive",
        label: "exact CVj-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVjCVwa,
        classes: ["A"],
    },
    {
        id: "exact_vlcvwa_transitive",
        label: "exact Vl-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactVlCVwa,
        classes: ["A"],
    },
    {
        id: "exact_cvwi_transitive",
        label: "exact CV-CV(wi) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVwi,
        classes: ["A", "B"],
    },
    {
        id: "exact_cvcvwi_transitive",
        label: "exact CV-CV-CV(wi) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactCVCVwi,
        classes: ["A", "B"],
    },
    {
        id: "exact_wi_transitive",
        label: "exact Wi (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && context.isExactWiPattern,
        classes: ["A", "B"],
    },
    {
        id: "exact_cuwa_intransitive",
        label: "exact CV(u)-CV(wa) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactCuwa,
        classes: ["B"],
    },
    {
        id: "exact_lwa_intransitive",
        label: "exact Lwa (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactLWaPattern,
        classes: ["A", "B"],
    },
    {
        id: "exact_short_wi_intransitive",
        label: "exact short Wi (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && (context.isExactVCCVwiShort || context.isExactCCVwi),
        classes: ["A"],
    },
    {
        id: "exact_wi_intransitive",
        label: "exact Wi (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && context.isExactWiPattern,
        classes: ["A", "B"],
    },
    {
        id: "exact_wa_intransitive",
        label: "exact Wa (intransitive)",
        tier: "exact",
        resolveCandidates: (context) => {
            if (!context.isTransitive && context.isExactWaPattern) {
                const classes = ["A"];
                if (context.isExactCVCVwa && !context.isReduplicated) {
                    classes.push("B");
                }
                return classes;
            }
            return [];
        },
    },
    {
        id: "length_gradient_na_intransitive",
        label: "length gradient Na (intransitive)",
        tier: "exact",
        when: (context) => (
            !context.isTransitive
            && (context.isExactCVCCVna || context.isExactCVCCVCVna || context.isExactLongNa)
        ),
        classes: ["A"],
    },
    {
        id: "exact_vnv_cvnv_cvmv_transitive",
        label: "exact V-CV(nV)/CV-CV(nV)/CV-CV(mV) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && (context.isExactVnV || context.isExactCVnV || context.isExactCVmV),
        classes: ["A"],
    },
    {
        id: "exact_cvsv",
        label: "exact CV-CV(sV)",
        tier: "exact",
        resolveCandidates: (context) => {
            if (!context.isExactCVsV) {
                return [];
            }
            const classes = ["A"];
            if (context.lastNucleus === "i" && !context.isTransitive) {
                classes.push("B");
            }
            return classes;
        },
    },
]);

const PRET_UNIVERSAL_DEFAULT_CLASS_RULES = Object.freeze([
    {
        label: "force class A for KWV",
        when: (ctx) => ctx.forceClassAForKWV,
        classes: ["A"],
    },
    {
        label: "default class B",
        when: (_ctx, flags) => !flags.disallowTransitiveWaB && !flags.forceClassAForKWV,
        classes: ["B"],
    },
    {
        label: "open syllable non-u adds class A",
        when: (ctx) => ctx.endsInOpenSyllableNonU,
        classes: ["A"],
    },
    {
        label: "open syllable non-u ia/ua adds class C",
        when: (ctx) => (
            ctx.endsInOpenSyllableNonU
            && ctx.vowelCount === 2
            && ctx.endsWithIaUa
        ),
        classes: ["C"],
    },
    {
        label: "intransitive yya adds class A",
        when: (ctx) => !ctx.isTransitive && ctx.verb.endsWith("yya"),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_NA_PATTERN_KEYS = Object.freeze([
    "isExactVna",
    "isExactCVna",
    "isExactCVCVna",
    "isExactCVlVna",
    "isExactCVCCVna",
    "isExactCVCVCVna",
    "isExactCVCCVCVna",
    "isExactLongNa",
]);

const PRET_UNIVERSAL_EXACT_NI_PATTERN_KEYS = Object.freeze([
    "isExactCVni",
    "isExactCVCVni",
    "isExactCVlVni",
    "isExactVjCVni",
    "isExactCVVni",
    "isExactCVCVCVni",
    "isExactCVCCVCVni",
    "isExactCVCVCVCVni",
    "isExactLongNi",
]);

const PRET_UNIVERSAL_EXACT_NIA_PATTERN_KEYS = Object.freeze([
    "isExactCVnia",
    "isExactCVCVnia",
    "isExactCVlVnia",
    "isExactVjCVnia",
]);

const PRET_UNIVERSAL_CLASS_TIER_TABLES = Object.freeze([
    PRET_UNIVERSAL_EARLY_TIER_RULES,
    PRET_UNIVERSAL_LV_TIER_RULES,
    PRET_UNIVERSAL_EXACT_CORE_TIER_RULES,
    PRET_UNIVERSAL_EXACT_NA_INTRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_EXACT_NA_TRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_EXACT_TA_PV_TIER_RULES,
    PRET_UNIVERSAL_EXACT_MA_KWI_NI_TIER_RULES,
    PRET_UNIVERSAL_EXACT_WA_ENTRY_TIER_RULES,
    PRET_UNIVERSAL_EXACT_WA_REST_TIER_RULES,
]);

function buildPretUniversalRuleTierByLabelMap() {
    const tierMap = {};
    PRET_UNIVERSAL_CLASS_TIER_TABLES.forEach((rules) => {
        (rules || []).forEach((rule) => {
            const label = String(rule?.label || "").toLowerCase();
            if (!label) {
                return;
            }
            tierMap[label] = rule.tier || PRET_UNIVERSAL_DEFAULT_RULE_TIER;
        });
    });
    tierMap[PRET_UNIVERSAL_DEFAULT_RULE_LABEL] = PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    tierMap["unpronounceable root"] = PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    return tierMap;
}

const PRET_UNIVERSAL_RULE_TIER_BY_LABEL = Object.freeze(
    buildPretUniversalRuleTierByLabelMap(),
);

function toPretUniversalCandidateSet(values) {
    const set = new Set();
    (Array.isArray(values) ? values : []).forEach((value) => {
        if (value) {
            set.add(value);
        }
    });
    return set;
}

function normalizePretUniversalRuleCandidates(values) {
    if (values instanceof Set) {
        return new Set(values);
    }
    if (Array.isArray(values)) {
        return toPretUniversalCandidateSet(values);
    }
    return new Set();
}

function resolvePretUniversalRuleMatch(rule, context, flags = {}) {
    if (!rule) {
        return null;
    }
    let candidates = null;
    if (typeof rule.resolveCandidates === "function") {
        candidates = normalizePretUniversalRuleCandidates(
            rule.resolveCandidates(context, flags),
        );
        if (!candidates.size) {
            return null;
        }
    } else {
        const matched = typeof rule.when === "function"
            ? rule.when(context, flags)
            : false;
        if (!matched) {
            return null;
        }
        // For plain `when + classes`, empty candidate sets are still considered
        // a valid match for control-flow rules (e.g., gate rules).
        candidates = toPretUniversalCandidateSet(rule.classes || []);
    }
    const resolvedLabel = typeof rule.resolveLabel === "function"
        ? rule.resolveLabel(context, flags)
        : rule.label;
    return {
        id: rule.id,
        label: resolvedLabel,
        tier: rule.tier,
        candidates,
    };
}

function evaluatePretUniversalRuleTable(ruleTable, context, flags = {}) {
    return findPretUniversalRuleMatch(ruleTable, context, flags);
}

function collectPretUniversalRuleTableCandidates(ruleTable, context, flags = {}) {
    const matches = collectPretUniversalRuleMatches(ruleTable, context, flags);
    const candidates = new Set();
    for (const match of matches) {
        match.candidates.forEach((classKey) => candidates.add(classKey));
    }
    return candidates;
}

function collectPretUniversalRuleMatches(ruleTable, context, flags = {}) {
    const matches = [];
    for (const rule of ruleTable) {
        const match = resolvePretUniversalRuleMatch(rule, context, flags);
        if (!match) {
            continue;
        }
        matches.push(match);
    }
    return matches;
}

function findPretUniversalRuleMatch(ruleTable, context, flags = {}) {
    for (const rule of ruleTable) {
        const match = resolvePretUniversalRuleMatch(rule, context, flags);
        if (!match) {
            continue;
        }
        return match;
    }
    return null;
}

function hasAnyPretPatternFlag(context, patternKeys = []) {
    return (patternKeys || []).some((key) => context?.[key]);
}

function buildPretUniversalClassComputationFlags(context) {
    const override = context?.verbOverride || null;
    const allowUnpronounceable = override?.allowUnpronounceable === true || context?.allowUnpronounceable === true;
    const isExactNaPattern = hasAnyPretPatternFlag(context, PRET_UNIVERSAL_EXACT_NA_PATTERN_KEYS);
    const isExactNiPattern = hasAnyPretPatternFlag(context, PRET_UNIVERSAL_EXACT_NI_PATTERN_KEYS);
    const isExactNiaPattern = hasAnyPretPatternFlag(context, PRET_UNIVERSAL_EXACT_NIA_PATTERN_KEYS);
    const disallowTransitiveWaB = Boolean(
        context?.isTransitive
        && context?.endsWithWa
        && context?.letterCount >= 4,
    );
    const forceClassAForKWV = context?.forceClassAForKWV === true;
    return {
        override,
        allowUnpronounceable,
        isExactNaPattern,
        isExactNiPattern,
        isExactNiaPattern,
        disallowTransitiveWaB,
        forceClassAForKWV,
    };
}

function evaluatePretUniversalClassSelectionPipeline(context, flags = {}) {
    const gateMatch = evaluatePretUniversalRuleTable(
        PRET_UNIVERSAL_CLASS_GATE_RULES,
        context,
        flags,
    );
    if (gateMatch) {
        return gateMatch;
    }
    for (const ruleTable of PRET_UNIVERSAL_CLASS_TIER_TABLES) {
        const tierMatch = evaluatePretUniversalRuleTable(ruleTable, context, flags);
        if (tierMatch) {
            return tierMatch;
        }
    }
    return {
        label: PRET_UNIVERSAL_DEFAULT_RULE_LABEL,
        tier: PRET_UNIVERSAL_DEFAULT_RULE_TIER,
        candidates: collectPretUniversalRuleTableCandidates(
            PRET_UNIVERSAL_DEFAULT_CLASS_RULES,
            context,
            flags,
        ),
    };
}

function recordPretUniversalSelectionTrace(traceState, {
    ruleLabel = "",
    ruleTier = "",
    ruleTierIndex = -1,
} = {}) {
    if (!traceState || traceState.rule) {
        return;
    }
    traceState.rule = ruleLabel;
    traceState.ruleTier = ruleTier;
    traceState.ruleTierIndex = ruleTierIndex;
}

function resolvePretUniversalClassSelection(context, options = {}) {
    const traceState = options.trace && typeof options.trace === "object"
        ? options.trace
        : null;
    const flags = buildPretUniversalClassComputationFlags(context);
    const selectionMatch = evaluatePretUniversalClassSelectionPipeline(context, flags);
    const candidates = normalizePretUniversalRuleCandidates(selectionMatch.candidates);
    const ruleLabel = selectionMatch.label || PRET_UNIVERSAL_DEFAULT_RULE_LABEL;
    const ruleTier = selectionMatch.tier || inferPretUniversalRuleTier(ruleLabel);
    const ruleTierIndex = PRET_UNIVERSAL_RULE_TIER_ORDER.indexOf(ruleTier);
    recordPretUniversalSelectionTrace(traceState, { ruleLabel, ruleTier, ruleTierIndex });
    return {
        candidates,
        ruleLabel,
        ruleTier,
        ruleTierIndex,
        gates: traceState?.gates || [],
    };
}

function getPretUniversalClassCandidates(context, trace = null) {
    // Precedence: root+ya > monosyllable > forced-B endings > endsWithLV > exact patterns
    // > general class rules.
    return resolvePretUniversalClassSelection(context, { trace }).candidates;
}

const PRET_EXACT_PATTERN_LABELS = [
    { key: "isExactVnV", label: "V-CV(nV)" },
    { key: "isExactCVnV", label: "CV-CV(nV)" },
    { key: "isExactCVsV", label: "CV-CV(sV)" },
    { key: "isExactCVpV", label: "CV-CV(pV)" },
    { key: "isExactCVma", label: "CV-CV(ma)" },
    { key: "isExactVjCVma", label: "Vj-CV-CV(ma)" },
    { key: "isExactCVmV", label: "CV-CV(mV)" },
    { key: "isExactCVV", label: "CV-V" },
    { key: "isExactVV", label: "V-V" },
    { key: "isExactCa", label: "CV(a)" },
    { key: "isExactTi", label: "CV(ti)" },
    { key: "isExactVna", label: "V-CV(na)" },
    { key: "isExactCVna", label: "CV-CV(na)" },
    { key: "isExactCVCVna", label: "CV-CV-CV(na)" },
    { key: "isExactCVlVna", label: "CVl-V-CV(na)" },
    { key: "isExactVlCVna", label: "Vl-CV-CV(na)" },
    { key: "isExactCVCCVna", label: "CV-C-CV-CV(na)" },
    { key: "isExactCVCVCVna", label: "CV-CV-CV-CV(na)" },
    { key: "isExactCVCCVCVna", label: "CV-C-CV-CV-CV(na)" },
    { key: "isExactLongNa", label: "Long-CV(na)" },
    { key: "isExactCVta", label: "CV-CV(ta)" },
    { key: "isExactCVtza", label: "CV-CV(tza)" },
    { key: "isExactVjCVtza", label: "Vj-CV-CV(tza)" },
    { key: "isExactCVnia", label: "CV-CV(ni)-V(a)" },
    { key: "isExactCVCVnia", label: "CV-CV-CV(ni)-V(a)" },
    { key: "isExactCVlVnia", label: "CVl-V-CV(ni)-V(a)" },
    { key: "isExactVjCVnia", label: "Vj-CV-CV(ni)-V(a)" },
    { key: "isExactCVlVni", label: "CVl-V-CV(ni)" },
    { key: "isExactVjCVni", label: "Vj-CV-CV(ni)" },
    { key: "isExactVjCVna", label: "Vj-CV-CV(na)" },
    { key: "isExactCVCVni", label: "CV-CV-CV(ni)" },
    { key: "isExactCVCVCVni", label: "CV-CV-CV-CV(ni)" },
    { key: "isExactCVCCVCVni", label: "CV-C-CV-CV-CV(ni)" },
    { key: "isExactCVCVCVCVni", label: "CV-CV-CV-CV-CV(ni)" },
    { key: "isExactCVVni", label: "CV-V-CV(ni)" },
    { key: "isExactLongNi", label: "Long-CV(ni)" },
    { key: "isExactCVniU", label: "CV(u)-CV(ni)" },
    { key: "isExactCVni", label: "CV-CV(ni)" },
    { key: "isExactVwi", label: "V-CV(wi)" },
    { key: "isExactCVwi", label: "CV-CV(wi)" },
    { key: "isExactCCVwi", label: "C-CV(wi)" },
    { key: "isExactVCCVwiShort", label: "V-C-CV(wi) (short)" },
    { key: "isExactCVkwi", label: "CV-CV(kwi)" },
    { key: "isExactVCVwi", label: "V-CV-CV(wi)" },
    { key: "isExactVCVCu", label: "V-CV-CV(u)" },
    { key: "isExactVlVwi", label: "Vl-V-CV(wi)" },
    { key: "isExactCVCVwi", label: "CV-CV-CV(wi)" },
    { key: "isExactCVlVwi", label: "CVl-V-CV(wi)" },
    { key: "isExactVlCVwi", label: "Vl-CV-CV(wi)" },
    { key: "isExactCVCVCVwi", label: "CV-CV-CV-CV(wi)" },
    { key: "isExactVCCVwi", label: "V-C-CV-CV(wi)" },
    { key: "isExactCVjCVwi", label: "CVj-CV-CV(wi)" },
    { key: "isExactCVCVlVwi", label: "CV-CVl-V-CV(wi)" },
    { key: "isExactCVCCVwi", label: "CV-C-CV-CV(wi)" },
    { key: "isExactCVCCVCVwi", label: "CV-C-CV-CV-CV(wi)" },
    { key: "isExactCVlCVCVwi", label: "CVl-CV-CV-CV(wi)" },
    { key: "isExactVjCVwi", label: "Vj-CV-CV(wi)" },
    { key: "isExactVjCVCVwi", label: "Vj-CV-CV-CV(wi)" },
    { key: "isExactCVVjCVwi", label: "CV-Vj-CV-CV(wi)" },
    { key: "isExactLongWi", label: "Long-CV(wi)" },
    { key: "isExactVlV", label: "Vl-V" },
    { key: "isExactCVlV", label: "CVl-V" },
    { key: "isExactCVwaA", label: "CV(a)-CV(wa)" },
    { key: "isExactCVwaI", label: "CV(i)-CV(wa)" },
    { key: "isExactCuwa", label: "CV(u)-CV(wa)" },
    { key: "isExactCVwa", label: "CV-CV(wa)" },
    { key: "isExactVCCVwa", label: "V-C-CV(wa)" },
    { key: "isExactVwaI", label: "V(i)-CV(wa)" },
    { key: "isExactVwa", label: "V-CV(wa)" },
    { key: "isExactVjwa", label: "Vj-CV(wa)" },
    { key: "isExactCVCVwa", label: "CV-CV-CV(wa)" },
    { key: "isExactVjCVwa", label: "Vj-CV-CV(wa)" },
    { key: "isExactCVjCVwa", label: "CVj-CV-CV(wa)" },
    { key: "isExactCVCawa", label: "CV-CV(a)-CV(wa)" },
    { key: "isExactCVlawa", label: "CVl-V(a)-CV(wa)" },
    { key: "isExactVCCawa", label: "V-C-CV(a)-CV(wa)" },
    { key: "isExactCewa", label: "CV(e)-CV(wa)" },
    { key: "isExactCVCewa", label: "CV-CV(e)-CV(wa)" },
    { key: "isExactVjCewa", label: "Vj-CV(e)-CV(wa)" },
    { key: "isExactCVlewa", label: "CVl-V(e)-CV(wa)" },
    { key: "isExactVlVwa", label: "Vl-V-CV(wa)" },
    { key: "isExactCVlVwa", label: "CVl-V-CV(wa)" },
    { key: "isExactVlCVwa", label: "Vl-CV-CV(wa)" },
    { key: "isExactCVCCVwa", label: "CV-C-CV-CV(wa)" },
    { key: "isExactCVCVCVwa", label: "CV-CV-CV-CV(wa)" },
    { key: "isExactCVCCVCVwa", label: "CV-C-CV-CV-CV(wa)" },
    { key: "isExactCVlCVCVwa", label: "CVl-CV-CV-CV(wa)" },
    { key: "isExactVCCVCVwa", label: "V-C-CV-CV-CV(wa)" },
    { key: "isExactLongWa", label: "Long-CV(wa)" },
];

function getPretUniversalExactPatternLabels(context) {
    if (!context) {
        return [];
    }
    const labels = [];
    for (let i = 0; i < PRET_EXACT_PATTERN_LABELS.length; i += 1) {
        const entry = PRET_EXACT_PATTERN_LABELS[i];
        if (context[entry.key]) {
            labels.push(entry.label);
        }
    }
    return labels;
}

function buildPretUniversalRuleSummary(context) {
    if (!context) {
        return null;
    }
    const selection = resolvePretUniversalClassSelection(context, {
        trace: { rule: "", gates: [] },
    });
    const candidates = selection.candidates;
    const ruleLabel = selection.ruleLabel;
    const ruleTier = selection.ruleTier;
    const exactLabels = getPretUniversalExactPatternLabels(context);
    const exactLabel = exactLabels.length ? exactLabels[0] : "";
    const classList = candidates.size ? formatPretUniversalClassList(candidates) : "";
    let resolvedClassList = "";
    if (typeof getPretUniversalVariantsByClass === "function") {
        const variantsByClass = getPretUniversalVariantsByClass(context);
        if (variantsByClass && variantsByClass.size) {
            const resolvedClasses = new Set();
            variantsByClass.forEach((_variants, classKey) => {
                if (classKey) {
                    resolvedClasses.add(classKey);
                }
            });
            if (resolvedClasses.size) {
                resolvedClassList = formatPretUniversalClassList(resolvedClasses);
            }
        }
    }
    return {
        ruleLabel,
        ruleTier,
        exactLabel,
        exactLabels,
        classList,
        resolvedClassList,
        gates: selection.gates,
    };
}
