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

const PRET_DENOMINAL_MATRIX_STEM_SET = Object.freeze([
    "ti",
    "wi",
    "ya",
    "a",
    "wa",
    "tiya",
    "wiya",
]);

function normalizePretDenominalStem(value) {
    if (!value) {
        return "";
    }
    return String(value)
        .toLowerCase()
        .replace(/[|~#()\\/?-]/g, "");
}

function getPretDenominalSourceContext({
    verb = "",
    matrixStem = "",
    hasSlashMarker = false,
    hasBoundMarker = false,
    hasImpersonalTaPrefix = false,
} = {}) {
    const defaults = {
        isDenominalMatrixInput: false,
        denominalMatrixStem: "",
        denominalSourceStem: "",
        denominalSourceEndsWithVowel: false,
        denominalSourceEndsWithConsonant: false,
        isDenominalTiMatrix: false,
        isDenominalWiMatrix: false,
    };
    if (!hasSlashMarker || !hasBoundMarker || hasImpersonalTaPrefix) {
        return defaults;
    }
    const normalizedMatrix = normalizePretDenominalStem(matrixStem);
    if (!normalizedMatrix || !PRET_DENOMINAL_MATRIX_STEM_SET.includes(normalizedMatrix)) {
        return defaults;
    }
    const normalizedVerb = normalizePretDenominalStem(verb);
    if (
        !normalizedVerb
        || normalizedVerb.length <= normalizedMatrix.length
        || !normalizedVerb.endsWith(normalizedMatrix)
    ) {
        return defaults;
    }
    const sourceStem = normalizedVerb.slice(0, -normalizedMatrix.length);
    const letters = splitVerbLetters(sourceStem);
    const lastLetter = letters[letters.length - 1] || "";
    const sourceEndsWithVowel = Boolean(lastLetter && isVerbLetterVowel(lastLetter));
    const sourceEndsWithConsonant = Boolean(lastLetter && isVerbLetterConsonant(lastLetter));
    return {
        isDenominalMatrixInput: true,
        denominalMatrixStem: normalizedMatrix,
        denominalSourceStem: sourceStem,
        denominalSourceEndsWithVowel: sourceEndsWithVowel,
        denominalSourceEndsWithConsonant: sourceEndsWithConsonant,
        isDenominalTiMatrix: normalizedMatrix === "ti",
        isDenominalWiMatrix: normalizedMatrix === "wi",
    };
}

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

const PRET_UNIVERSAL_CONTEXT_CACHE_LIMIT = 1200;
const PRET_UNIVERSAL_CONTEXT_CACHE = new Map();

function encodePretContextCacheValue(value) {
    if (value === true) {
        return "1";
    }
    if (value === false || value == null) {
        return "0";
    }
    const raw = String(value || "");
    return `${raw.length}:${raw}`;
}

function buildPretUniversalContextCacheKey(verb, analysisVerb, isTransitive, options = {}) {
    const parts = [
        encodePretContextCacheValue(verb),
        encodePretContextCacheValue(analysisVerb),
        encodePretContextCacheValue(isTransitive === true),
        encodePretContextCacheValue(options.isYawi === true),
        encodePretContextCacheValue(options.isWeya === true),
        encodePretContextCacheValue(options.isBitransitive === true),
        encodePretContextCacheValue(options.hasSlashMarker === true),
        encodePretContextCacheValue(options.hasSuffixSeparator === true),
        encodePretContextCacheValue(options.hasLeadingDash === true),
        encodePretContextCacheValue(options.hasBoundMarker === true),
        encodePretContextCacheValue(options.hasCompoundMarker === true),
        encodePretContextCacheValue(options.boundPrefix || ""),
        encodePretContextCacheValue(options.hasImpersonalTaPrefix === true),
        encodePretContextCacheValue(options.hasOptionalSupportiveI === true),
        encodePretContextCacheValue(options.hasNonspecificValence === true),
        encodePretContextCacheValue(options.exactBaseVerb || ""),
        encodePretContextCacheValue(options.rootPlusYaBase || ""),
        encodePretContextCacheValue(options.rootPlusYaBasePronounceable || ""),
        encodePretContextCacheValue(options.derivationType || ""),
        encodePretContextCacheValue(options.forceClassBOnly === true),
    ];
    return parts.join("|");
}

function clonePretUniversalContext(context) {
    if (!context || typeof context !== "object") {
        return context;
    }
    const clone = { ...context };
    if (context.rightEdgeDescriptor && typeof context.rightEdgeDescriptor === "object") {
        clone.rightEdgeDescriptor = { ...context.rightEdgeDescriptor };
    }
    if (context.verbOverride && typeof context.verbOverride === "object") {
        clone.verbOverride = { ...context.verbOverride };
        if (Array.isArray(context.verbOverride.classes)) {
            clone.verbOverride.classes = context.verbOverride.classes.slice();
        }
    }
    return clone;
}

function formatPretRightEdgeProfile(syllables = []) {
    return (Array.isArray(syllables) ? syllables : [])
        .map((syllable) => String(syllable?.form || ""))
        .filter(Boolean)
        .join("|");
}

function formatPretJuncture(syllables = []) {
    const forms = (Array.isArray(syllables) ? syllables : [])
        .map((syllable) => String(syllable?.form || ""))
        .filter(Boolean);
    if (!forms.length) {
        return "";
    }
    return forms.slice(-2).join("|");
}

function formatPretEndingFamily(syllable = null) {
    if (!syllable || typeof syllable !== "object") {
        return "";
    }
    const onset = syllable.onset || "Ø";
    const nucleus = syllable.nucleus || "Ø";
    return `${onset}+${nucleus}`;
}

function buildPretRightEdgeDescriptor(syllables = []) {
    const safeSyllables = Array.isArray(syllables) ? syllables : [];
    const lastSyllable = safeSyllables[safeSyllables.length - 1] || null;
    return {
        rightEdgeProfile: formatPretRightEdgeProfile(safeSyllables),
        juncture: formatPretJuncture(safeSyllables),
        endingFamily: formatPretEndingFamily(lastSyllable),
        rightEdgeDepth: safeSyllables.length,
        finalForm: lastSyllable?.form || "",
        finalOnset: lastSyllable?.onset || "",
        finalNucleus: lastSyllable?.nucleus || "",
        finalCoda: lastSyllable?.coda || "",
    };
}

function freezePretDescriptorList(list = []) {
    return Object.freeze(Array.isArray(list) ? list.slice() : []);
}

function buildPretJuncturesFromProfiles(rightEdgeProfiles = []) {
    const junctures = [];
    const seen = new Set();
    for (const profile of rightEdgeProfiles) {
        const parts = String(profile || "").split("|").filter(Boolean);
        if (!parts.length) {
            continue;
        }
        const juncture = parts.slice(-2).join("|");
        if (!juncture || seen.has(juncture)) {
            continue;
        }
        seen.add(juncture);
        junctures.push(juncture);
    }
    return freezePretDescriptorList(junctures);
}

function makePretDescriptorQuery(endingFamily = "", rightEdgeProfileOrProfiles = null, options = {}) {
    const query = {};
    const rightEdgeProfiles = Array.isArray(rightEdgeProfileOrProfiles)
        ? rightEdgeProfileOrProfiles.filter(Boolean)
        : (rightEdgeProfileOrProfiles ? [String(rightEdgeProfileOrProfiles)] : []);
    const modifierSet = Object.prototype.hasOwnProperty.call(options, "modifierSet")
        ? (Array.isArray(options.modifierSet) ? options.modifierSet.filter(Boolean) : [])
        : null;
    const modifiers = Array.isArray(options.modifiers)
        ? options.modifiers.filter(Boolean)
        : [];
    const descriptorModifiers = modifierSet !== null ? modifierSet : modifiers;
    const junctures = Array.isArray(options.junctures)
        ? options.junctures.filter(Boolean)
        : (options.juncture ? [String(options.juncture)] : buildPretJuncturesFromProfiles(rightEdgeProfiles));
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = freezePretDescriptorList(rightEdgeProfiles);
    }
    if (modifierSet !== null) {
        query.modifierSet = freezePretDescriptorList(modifierSet);
    }
    if (descriptorModifiers.length) {
        query.modifiers = freezePretDescriptorList(descriptorModifiers);
    }
    if (Array.isArray(options.excludeModifiers) && options.excludeModifiers.length) {
        query.excludeModifiers = freezePretDescriptorList(options.excludeModifiers.filter(Boolean));
    }
    if (junctures.length) {
        query.junctures = freezePretDescriptorList(junctures);
    }
    return Object.freeze(query);
}

function pretDescriptorMatchesQuery(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const descriptorModifiers = Array.isArray(descriptor.modifiers) ? descriptor.modifiers : [];
    const descriptorProfiles = Array.isArray(descriptor.rightEdgeProfiles) ? descriptor.rightEdgeProfiles : [];
    const descriptorJunctures = Array.isArray(descriptor.junctures) ? descriptor.junctures : [];
    const endingFamilies = Array.isArray(query.endingFamilies)
        ? query.endingFamilies
        : (query.endingFamily ? [query.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const profiles = Array.isArray(query.rightEdgeProfiles)
        ? query.rightEdgeProfiles
        : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []);
    if (profiles.length && !profiles.some((profile) => descriptorProfiles.includes(profile))) {
        return false;
    }
    const junctures = Array.isArray(query.junctures)
        ? query.junctures
        : (query.juncture ? [query.juncture] : []);
    if (junctures.length && !junctures.some((value) => descriptorJunctures.includes(value))) {
        return false;
    }
    if (Array.isArray(query.modifiers) && query.modifiers.length) {
        if (!query.modifiers.every((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    if (Array.isArray(query.excludeModifiers) && query.excludeModifiers.length) {
        if (query.excludeModifiers.some((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    if (Object.prototype.hasOwnProperty.call(query, "modifierSet")) {
        const expectedModifiers = Array.isArray(query.modifierSet) ? query.modifierSet : [];
        if (descriptorModifiers.length !== expectedModifiers.length) {
            return false;
        }
        if (!expectedModifiers.every((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    return true;
}

function pretDescriptorListHasQuery(descriptors = [], query = {}) {
    return (Array.isArray(descriptors) ? descriptors : []).some((descriptor) => (
        pretDescriptorMatchesQuery(descriptor, query)
    ));
}

function pretDescriptorListHasAnyQuery(descriptors = [], queries = []) {
    return (Array.isArray(queries) ? queries : []).some((query) => (
        pretDescriptorListHasQuery(descriptors, query)
    ));
}

function formatPretDescriptorLabel(descriptor, options = {}) {
    if (!descriptor || typeof descriptor !== "object") {
        return "";
    }
    const activeProfile = options.activeRightEdgeProfile
        && Array.isArray(descriptor.rightEdgeProfiles)
        && descriptor.rightEdgeProfiles.includes(options.activeRightEdgeProfile)
        ? options.activeRightEdgeProfile
        : (descriptor.rightEdgeProfiles?.[0] || "");
    const parts = [];
    if (activeProfile) {
        parts.push(activeProfile);
    }
    if (descriptor.endingFamily) {
        parts.push(descriptor.endingFamily);
    }
    const modifiers = Array.isArray(descriptor.modifiers)
        ? descriptor.modifiers.filter((modifier) => modifier !== "aggregate")
        : [];
    return parts.concat(modifiers).join(" · ");
}

const PRET_DESCRIPTOR_QUERIES = Object.freeze({
    exact: Object.freeze({
        cvv: makePretDescriptorQuery("Ø+*", "CV|V", { modifierSet: [] }),
        vv: makePretDescriptorQuery("Ø+*", "V|V", { modifierSet: [] }),
        vlv: makePretDescriptorQuery("Ø+*", "Vl|V", { modifierSet: [] }),
        cvlv: makePretDescriptorQuery("Ø+*", "CVl|V", { modifierSet: [] }),
        ca: makePretDescriptorQuery("*+a", "CV", { modifierSet: [] }),
        ti: makePretDescriptorQuery("t+i", "CV", { modifierSet: [] }),
        vna: makePretDescriptorQuery("n+a", "V|CV", { modifierSet: [] }),
        cvna: makePretDescriptorQuery("n+a", "CV|CV", { modifierSet: [] }),
        cvcvna: makePretDescriptorQuery("n+a", "CV|CV|CV", { modifierSet: [] }),
        cvlvna: makePretDescriptorQuery("n+a", "CVl|V|CV", { modifierSet: [] }),
        vlcvna: makePretDescriptorQuery("n+a", "Vl|CV|CV", { modifierSet: [] }),
        cvccvna: makePretDescriptorQuery("n+a", "CV|C|CV|CV", { modifierSet: [] }),
        cvcvcvna: makePretDescriptorQuery("n+a", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvna: makePretDescriptorQuery("n+a", "CV|C|CV|CV|CV", { modifierSet: [] }),
        vjcvna: makePretDescriptorQuery("n+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        longNa: makePretDescriptorQuery("n+a", "...|CV", { modifierSet: ["long"] }),
        cvta: makePretDescriptorQuery("t+a", "CV|CV", { modifierSet: [] }),
        cvtza: makePretDescriptorQuery("tz+a", "CV|CV", { modifierSet: [] }),
        vjcvtza: makePretDescriptorQuery("tz+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvnia: makePretDescriptorQuery("n+ia", "CV|CV|V", { modifierSet: [] }),
        cvcvnia: makePretDescriptorQuery("n+ia", "CV|CV|CV|V", { modifierSet: [] }),
        cvlvnia: makePretDescriptorQuery("n+ia", "CVl|V|CV|V", { modifierSet: [] }),
        vjcvnia: makePretDescriptorQuery("n+ia", ["Vj|CV|CV|V", "V|C|CV|CV|V"], { modifierSet: [] }),
        cvlvni: makePretDescriptorQuery("n+i", "CVl|V|CV", { modifierSet: [] }),
        vjcvni: makePretDescriptorQuery("n+i", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV", { modifierSet: [] }),
        cvcvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvni: makePretDescriptorQuery("n+i", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvcvcvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV|CV|CV", { modifierSet: [] }),
        cvvni: makePretDescriptorQuery("n+i", "CV|V|CV", { modifierSet: [] }),
        cvni: makePretDescriptorQuery("n+i", "CV|CV", { modifierSet: [] }),
        cvniU: makePretDescriptorQuery("n+i", "CV|CV", { modifierSet: ["leadNucleus=u"] }),
        longNi: makePretDescriptorQuery("n+i", "...|CV", { modifierSet: ["long"] }),
        vnV: makePretDescriptorQuery("n+*", "V|CV", { modifierSet: [] }),
        cvnV: makePretDescriptorQuery("n+*", "CV|CV", { modifierSet: [] }),
        cvsV: makePretDescriptorQuery("s+*", "CV|CV", { modifierSet: [] }),
        cvpV: makePretDescriptorQuery("p+*", "CV|CV", { modifierSet: [] }),
        cvmV: makePretDescriptorQuery("m+*", "CV|CV", { modifierSet: [] }),
        cvma: makePretDescriptorQuery("m+a", "CV|CV", { modifierSet: [] }),
        vjcvma: makePretDescriptorQuery("m+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        vwi: makePretDescriptorQuery("w+i", "V|CV", { modifierSet: [] }),
        cvwi: makePretDescriptorQuery("w+i", "CV|CV", { modifierSet: [] }),
        ccvwi: makePretDescriptorQuery("w+i", "C|CV", { modifierSet: [] }),
        vccvwiShort: makePretDescriptorQuery("w+i", "V|C|CV", { modifierSet: [] }),
        vcvwi: makePretDescriptorQuery("w+i", "V|CV|CV", { modifierSet: [] }),
        vlvwi: makePretDescriptorQuery("w+i", "Vl|V|CV", { modifierSet: [] }),
        cvcvwi: makePretDescriptorQuery("w+i", "CV|CV|CV", { modifierSet: [] }),
        cvlvwi: makePretDescriptorQuery("w+i", "CVl|V|CV", { modifierSet: [] }),
        vlcvwi: makePretDescriptorQuery("w+i", "Vl|CV|CV", { modifierSet: [] }),
        cvcvcvwi: makePretDescriptorQuery("w+i", "CV|CV|CV|CV", { modifierSet: [] }),
        vccvwi: makePretDescriptorQuery("w+i", "V|C|CV|CV", { modifierSet: [] }),
        cvjcvwi: makePretDescriptorQuery("w+i", "CVj|CV|CV", { modifierSet: [] }),
        cvcvlvwi: makePretDescriptorQuery("w+i", "CV|CVl|V|CV", { modifierSet: [] }),
        cvccvwi: makePretDescriptorQuery("w+i", "CV|C|CV|CV", { modifierSet: [] }),
        cvccvcvwi: makePretDescriptorQuery("w+i", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvlcvcvwi: makePretDescriptorQuery("w+i", "CVl|CV|CV|CV", { modifierSet: [] }),
        vjcvwi: makePretDescriptorQuery("w+i", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        vjcvcvwi: makePretDescriptorQuery("w+i", "Vj|CV|CV|CV", { modifierSet: [] }),
        cvvjcvwi: makePretDescriptorQuery("w+i", "CV|Vj|CV|CV", { modifierSet: [] }),
        longWi: makePretDescriptorQuery("w+i", "...|CV", { modifierSet: ["long"] }),
        cvkwi: makePretDescriptorQuery("kw+i", "CV|CV", { modifierSet: [] }),
        vcvcu: makePretDescriptorQuery("*+u", "V|CV|CV", { modifierSet: [] }),
        vwa: makePretDescriptorQuery("w+a", "V|CV", { modifierSet: [] }),
        vjwa: makePretDescriptorQuery("w+a", "Vj|CV", { modifierSet: [] }),
        cvwa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: [] }),
        vccvwa: makePretDescriptorQuery("w+a", "V|C|CV", { modifierSet: [] }),
        cvwaA: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=a"] }),
        cvwaI: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=i"] }),
        cewa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=e"] }),
        vccawa: makePretDescriptorQuery("w+a", "V|C|CV|CV", { modifierSet: ["bridgeNucleus=a"] }),
        cuwa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=u"] }),
        vwaI: makePretDescriptorQuery("w+a", "V|CV", { modifierSet: ["leadNucleus=i"] }),
        vjcvwa: makePretDescriptorQuery("w+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvjcvwa: makePretDescriptorQuery("w+a", "CVj|CV|CV", { modifierSet: [] }),
        cvcawa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: ["bridgeNucleus=a"] }),
        cvcvwa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: [] }),
        cvcvewa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: ["bridgeNucleus=e"] }),
        vjcewa: makePretDescriptorQuery("w+a", "Vj|CV|CV", { modifierSet: ["bridgeNucleus=e"] }),
        cvlewa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: ["bridgeNucleus=e"] }),
        cvlawa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: ["bridgeNucleus=a"] }),
        vlvwa: makePretDescriptorQuery("w+a", "Vl|V|CV", { modifierSet: [] }),
        cvlvwa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: [] }),
        vlcvwa: makePretDescriptorQuery("w+a", "Vl|CV|CV", { modifierSet: [] }),
        cvccvwa: makePretDescriptorQuery("w+a", "CV|C|CV|CV", { modifierSet: [] }),
        cvcvcvwa: makePretDescriptorQuery("w+a", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvwa: makePretDescriptorQuery("w+a", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvlcvcvwa: makePretDescriptorQuery("w+a", "CVl|CV|CV|CV", { modifierSet: [] }),
        vccvcvwa: makePretDescriptorQuery("w+a", "V|C|CV|CV|CV", { modifierSet: [] }),
        longWa: makePretDescriptorQuery("w+a", "...|CV", { modifierSet: ["long"] }),
    }),
    aggregate: Object.freeze({
        wiPattern: makePretDescriptorQuery("w+i", null, { modifierSet: ["aggregate"] }),
        waPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate"] }),
        ewaPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate", "bridgeNucleus=e"] }),
        lwaPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate", "l-bridge"] }),
        kawa: makePretDescriptorQuery("w+a", null, {
            modifierSet: ["aggregate", "leadOnset=k", "leadNucleus=a"],
        }),
    }),
});

const PRET_AGGREGATE_DESCRIPTOR_SPECS = Object.freeze([
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.exact.vwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvwi,
            PRET_DESCRIPTOR_QUERIES.exact.vcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.vlvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvlvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.vccvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvjcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvlvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvccvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvccvcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvlcvcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.vjcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.vjcvcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.cvvjcvwi,
            PRET_DESCRIPTOR_QUERIES.exact.longWi,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.waPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.exact.cvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvwa,
            PRET_DESCRIPTOR_QUERIES.exact.vccvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvccvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvcvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvccvcvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvlcvcvwa,
            PRET_DESCRIPTOR_QUERIES.exact.vccvcvwa,
            PRET_DESCRIPTOR_QUERIES.exact.longWa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.exact.cewa,
            PRET_DESCRIPTOR_QUERIES.exact.cvcvewa,
            PRET_DESCRIPTOR_QUERIES.exact.vjcewa,
            PRET_DESCRIPTOR_QUERIES.exact.cvlewa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.exact.vlvwa,
            PRET_DESCRIPTOR_QUERIES.exact.cvlvwa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.kawa,
        matcher: (exactDescriptors = [], runtimeState = {}) => (
            pretDescriptorListHasQuery(exactDescriptors, PRET_DESCRIPTOR_QUERIES.exact.cvwaA)
            && runtimeState.leadingOnset === "k"
        ),
    }),
]);

function buildPretAggregateDescriptors(exactDescriptors = [], runtimeState = {}) {
    const activeDescriptors = [];
    PRET_AGGREGATE_DESCRIPTOR_SPECS.forEach((spec) => {
        const isActive = typeof spec.matcher === "function"
            ? spec.matcher(exactDescriptors, runtimeState)
            : pretDescriptorListHasAnyQuery(exactDescriptors, spec.sourceQueries || []);
        if (!isActive || pretDescriptorListHasQuery(activeDescriptors, spec.descriptor)) {
            return;
        }
        activeDescriptors.push(spec.descriptor);
    });
    return Object.freeze(activeDescriptors.slice());
}

function buildPretDescriptorState(exactDescriptors = [], aggregateDescriptors = []) {
    return Object.freeze({
        exactDescriptors: Object.freeze(Array.isArray(exactDescriptors) ? exactDescriptors.slice() : []),
        aggregateDescriptors: Object.freeze(Array.isArray(aggregateDescriptors) ? aggregateDescriptors.slice() : []),
    });
}

function pretContextGetDescriptorState(context) {
    return context?.descriptorState || null;
}

function pretContextHasExactDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.exactDescriptors, query);
}

function pretContextHasAnyExactDescriptor(context, queries = []) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasAnyQuery(descriptorState?.exactDescriptors, queries);
}

function pretContextHasAggregateDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.aggregateDescriptors, query);
}

function pretContextHasExactEndingFamily(context, endingFamily) {
    return pretContextHasExactDescriptor(context, { endingFamily });
}

function buildPretUniversalContext(verb, analysisVerb, isTransitive, options = {}) {
    const isYawi = options.isYawi === true;
    const isWeya = options.isWeya === true;
    const isBitransitive = options.isBitransitive === true;
    const forceClassBOnly = options.forceClassBOnly === true;
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
    const contextCacheKey = buildPretUniversalContextCacheKey(verb, analysisVerb, isTransitive, {
        ...options,
        exactBaseVerb,
    });
    const cachedContext = PRET_UNIVERSAL_CONTEXT_CACHE.get(contextCacheKey);
    if (cachedContext) {
        return clonePretUniversalContext(cachedContext);
    }
    const denominalSource = getPretDenominalSourceContext({
        verb,
        matrixStem: exactBaseVerb,
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
    });
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
    const denominalRootPlusYaBase = (
        !isTransitive
        && denominalSource.isDenominalMatrixInput
        && denominalSource.denominalMatrixStem === "ya"
        && denominalSource.denominalSourceStem
    ) ? denominalSource.denominalSourceStem : "";
    const computedRootPlusYaBase = !isTransitive && parsedRootPlusYaBase
        ? parsedRootPlusYaBase
        : (denominalRootPlusYaBase || getRootPlusYaBase(rootPlusYaSource, { isTransitive, isYawi, isWeya }));
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
    const lexicalVerbOverride = getPretUniversalVerbOverride(analysisRoot, isTransitive);
    const verbOverride = (() => {
        if (!lexicalVerbOverride && !forceClassBOnly) {
            return null;
        }
        const next = lexicalVerbOverride && typeof lexicalVerbOverride === "object"
            ? { ...lexicalVerbOverride }
            : {};
        if (Array.isArray(lexicalVerbOverride?.classes)) {
            next.classes = lexicalVerbOverride.classes.slice();
        }
        if (forceClassBOnly) {
            next.classes = ["B"];
        }
        return next;
    })();
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
    const rightEdgeDescriptor = buildPretRightEdgeDescriptor(syllables);
    const rightEdgeProfile = rightEdgeDescriptor.rightEdgeProfile;
    const juncture = rightEdgeDescriptor.juncture;
    const endingFamily = rightEdgeDescriptor.endingFamily;
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
    const exactQuery = PRET_DESCRIPTOR_QUERIES.exact;
    const activePretExactDescriptors = [];
    const activateExactDescriptor = (query, value) => {
        const isActive = Boolean(value);
        if (isActive && query && !pretDescriptorListHasQuery(activePretExactDescriptors, query)) {
            activePretExactDescriptors.push(query);
        }
        return isActive;
    };
    const hasExactDescriptor = (query) => pretDescriptorListHasQuery(activePretExactDescriptors, query);

    const rawVnVMatch = matchExact(matchesExactVnV) || hasVnVRedupPrefix;
    const rawCVnVMatch = matchExact(matchesExactCVnV) || hasCVnVRedupPrefix;

    activateExactDescriptor(exactQuery.cvsV, matchExact(matchesExactCVsV) || hasCVsVRedupPrefix);
    activateExactDescriptor(exactQuery.cvpV, matchExact(matchesExactCVpV));
    activateExactDescriptor(exactQuery.cvmV, matchExact(matchesExactCVmV) || hasCVmVRedupPrefix);
    activateExactDescriptor(exactQuery.cvma, matchExact(matchesExactCVma));
    activateExactDescriptor(exactQuery.vjcvma, matchExact(matchesExactVjCVma));
    activateExactDescriptor(exactQuery.cvv, matchExact(matchesExactCVV));
    activateExactDescriptor(exactQuery.vv, matchExact(matchesExactVV));
    activateExactDescriptor(exactQuery.ca, matchExact(matchesExactCa));
    activateExactDescriptor(exactQuery.ti, matchExact(matchesExactTi));
    activateExactDescriptor(exactQuery.vna, matchExact(matchesExactVna));
    activateExactDescriptor(exactQuery.cvna, matchExact(matchesExactCVna));
    activateExactDescriptor(exactQuery.cvcvna, matchExact(matchesExactCVCVna));
    activateExactDescriptor(exactQuery.cvlvna, matchExact(matchesExactCVlVna));
    activateExactDescriptor(exactQuery.vlcvna, matchExact(matchesExactVlCVna));
    activateExactDescriptor(exactQuery.cvccvna, matchExact(matchesExactCVCCVna));
    activateExactDescriptor(exactQuery.cvcvcvna, matchExact(matchesExactCVCVCVna));
    activateExactDescriptor(exactQuery.cvccvcvna, matchExact(matchesExactCVCCVCVna));
    activateExactDescriptor(
        exactQuery.cvta,
        matchExact(matchesExactCVta) || (baseIsReduplicated && matchesExactCVta(rawSyllables, 0))
    );
    activateExactDescriptor(exactQuery.cvtza, matchExact(matchesExactCVtza));
    activateExactDescriptor(exactQuery.vjcvtza, matchExact(matchesExactVjCVtza));
    activateExactDescriptor(exactQuery.cvnia, matchExact(matchesExactCVnia));
    activateExactDescriptor(exactQuery.cvcvnia, matchExact(matchesExactCVCVnia));
    activateExactDescriptor(exactQuery.cvlvnia, matchExact(matchesExactCVlVnia));
    activateExactDescriptor(exactQuery.vjcvnia, matchExact(matchesExactVjCVnia));
    activateExactDescriptor(exactQuery.cvlvni, matchExact(matchesExactCVlVni));
    activateExactDescriptor(exactQuery.vjcvni, matchExact(matchesExactVjCVni));
    activateExactDescriptor(exactQuery.vjcvna, matchExact(matchesExactVjCVna));
    activateExactDescriptor(exactQuery.cvcvni, matchExact(matchesExactCVCVni));
    activateExactDescriptor(exactQuery.cvcvcvni, matchExact(matchesExactCVCVCVni));
    activateExactDescriptor(exactQuery.cvccvcvni, matchExact(matchesExactCVCCVCVni));
    activateExactDescriptor(exactQuery.cvcvcvcvni, matchExact(matchesExactCVCVCVCVni));
    activateExactDescriptor(exactQuery.cvvni, matchExact(matchesExactCVVni));
    activateExactDescriptor(exactQuery.cvni, matchExact(matchesExactCVni));
    activateExactDescriptor(exactQuery.cvniU, hasExactDescriptor(exactQuery.cvni) && syllables[0]?.nucleus === "u");

    const endsWithNaOrNi = hasExactDescriptor(exactQuery.vna) || hasExactDescriptor(exactQuery.cvna);
    activateExactDescriptor(exactQuery.vnV, rawVnVMatch && !hasExactDescriptor(exactQuery.vna) && !endsWithNaOrNi);
    activateExactDescriptor(exactQuery.cvnV, rawCVnVMatch && !hasExactDescriptor(exactQuery.cvna) && !endsWithNaOrNi);

    activateExactDescriptor(exactQuery.vwi, matchExact(matchesExactVwi));
    activateExactDescriptor(exactQuery.cvwi, matchExact(matchesExactCVwi));
    activateExactDescriptor(exactQuery.ccvwi, matchExact(matchesExactCCVwi));
    activateExactDescriptor(exactQuery.vccvwiShort, matchExact(matchesExactVCCVwiShort));
    activateExactDescriptor(exactQuery.cvkwi, matchExact(matchesExactCVkwi));
    activateExactDescriptor(exactQuery.vcvwi, matchExact(matchesExactVCVwi));
    activateExactDescriptor(
        exactQuery.vcvcu,
        matchesExactVCVCu(syllables, 0) || (baseIsReduplicated && matchesExactVCVCu(analysisSyllables, 1))
    );
    activateExactDescriptor(exactQuery.vlv, matchExact(matchesExactVlV));
    activateExactDescriptor(exactQuery.cvlv, matchExact(matchesExactCVlV));
    activateExactDescriptor(exactQuery.vlvwi, matchExact(matchesExactVlVwi));

    activateExactDescriptor(exactQuery.vwa, matchExact(matchesExactVwa));
    activateExactDescriptor(exactQuery.vjwa, matchExact(matchesExactVjwa));
    activateExactDescriptor(exactQuery.cvwa, matchExact(matchesExactCVwa));
    activateExactDescriptor(exactQuery.vccvwa, matchExact(matchesExactVCCVwa));
    activateExactDescriptor(exactQuery.cvwaA, hasExactDescriptor(exactQuery.cvwa) && syllables[0]?.nucleus === "a");
    activateExactDescriptor(exactQuery.cvwaI, hasExactDescriptor(exactQuery.cvwa) && syllables[0]?.nucleus === "i");
    activateExactDescriptor(exactQuery.cewa, matchExact(matchesExactCewa));
    activateExactDescriptor(exactQuery.vccawa, matchExact(matchesExactVCCawa));
    activateExactDescriptor(exactQuery.cuwa, hasExactDescriptor(exactQuery.cvwa) && syllables[0]?.nucleus === "u");
    activateExactDescriptor(exactQuery.vwaI, hasExactDescriptor(exactQuery.vwa) && syllables[0]?.nucleus === "i");
    activateExactDescriptor(exactQuery.cvcvwa, matchExact(matchesExactCVCVwa));
    activateExactDescriptor(exactQuery.vjcvwa, matchExact(matchesExactVjCVwa));
    activateExactDescriptor(exactQuery.cvjcvwa, matchExact(matchesExactCVjCVwa));
    activateExactDescriptor(exactQuery.cvcawa, matchExact(matchesExactCVCawa));
    activateExactDescriptor(exactQuery.cvcvewa, matchExact(matchesExactCVCewa));
    activateExactDescriptor(exactQuery.vjcewa, matchExact(matchesExactVjCewa));
    activateExactDescriptor(exactQuery.cvlewa, matchExact(matchesExactCVlewa));
    activateExactDescriptor(exactQuery.cvlawa, matchExact(matchesExactCVlawa));
    activateExactDescriptor(exactQuery.vlvwa, matchExact(matchesExactVlVwa));
    activateExactDescriptor(exactQuery.cvlvwa, matchExact(matchesExactCVlVwa));
    activateExactDescriptor(exactQuery.vlcvwa, matchExact(matchesExactVlCVwa));
    activateExactDescriptor(exactQuery.cvccvwa, matchExact(matchesExactCVCCVwa));
    activateExactDescriptor(exactQuery.cvcvcvwa, matchExact(matchesExactCVCVCVwa));
    activateExactDescriptor(exactQuery.cvccvcvwa, matchExact(matchesExactCVCCVCVwa));
    activateExactDescriptor(exactQuery.cvlcvcvwa, matchExact(matchesExactCVlCVCVwa));
    activateExactDescriptor(exactQuery.vccvcvwa, matchExact(matchesExactVCCVCVwa));

    activateExactDescriptor(exactQuery.cvcvwi, matchExact(matchesExactCVCVwi));
    activateExactDescriptor(exactQuery.cvlvwi, matchExact(matchesExactCVlVwi));
    activateExactDescriptor(exactQuery.vlcvwi, matchExact(matchesExactVlCVwi));
    activateExactDescriptor(exactQuery.cvcvcvwi, matchExact(matchesExactCVCVCVwi));
    activateExactDescriptor(exactQuery.vccvwi, matchExact(matchesExactVCCVwi));
    activateExactDescriptor(exactQuery.cvjcvwi, matchExact(matchesExactCVjCVwi));
    activateExactDescriptor(exactQuery.cvcvlvwi, matchExact(matchesExactCVCVlVwi));
    activateExactDescriptor(exactQuery.cvccvwi, matchExact(matchesExactCVCCVwi));
    activateExactDescriptor(exactQuery.cvccvcvwi, matchExact(matchesExactCVCCVCVwi));
    activateExactDescriptor(exactQuery.cvlcvcvwi, matchExact(matchesExactCVlCVCVwi));
    activateExactDescriptor(exactQuery.vjcvwi, matchExact(matchesExactVjCVwi));
    activateExactDescriptor(exactQuery.vjcvcvwi, matchExact(matchesExactVjCVCVwi));
    activateExactDescriptor(exactQuery.cvvjcvwi, matchExact(matchesExactCVVjCVwi));

    activateExactDescriptor(exactQuery.longWa, matchExact(matchesExactLongWa));
    activateExactDescriptor(exactQuery.longWi, matchExact(matchesExactLongWi));
    activateExactDescriptor(exactQuery.longNa, matchExact(matchesExactLongNa));
    activateExactDescriptor(exactQuery.longNi, matchExact(matchesExactLongNi));

    const resolvedForceClassBEnding = forceClassBEnding
        && !hasExactDescriptor(exactQuery.vccvwi)
        && !hasExactDescriptor(exactQuery.vccvwiShort)
        && !hasExactDescriptor(exactQuery.vccvwa);
    const activePretAggregateDescriptors = buildPretAggregateDescriptors(activePretExactDescriptors, {
        leadingOnset: syllables[0]?.onset || "",
    });
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
    const context = {
        verb: resolvedVerb,
        analysisVerb: analysisRoot,
        verbOverride,
        forceClassBOnly,
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
        rightEdgeProfile,
        juncture,
        endingFamily,
        rightEdgeDescriptor,
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
        ...denominalSource,
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        allowIntransitiveKV: resolvedForceClassAForKWV,
        forceClassAForKWV: resolvedForceClassAForKWV,
    };
    const descriptorState = buildPretDescriptorState(activePretExactDescriptors, activePretAggregateDescriptors);
    context.descriptorState = descriptorState;
    PRET_UNIVERSAL_CONTEXT_CACHE.set(contextCacheKey, clonePretUniversalContext(context));
    if (PRET_UNIVERSAL_CONTEXT_CACHE.size > PRET_UNIVERSAL_CONTEXT_CACHE_LIMIT) {
        const firstKey = PRET_UNIVERSAL_CONTEXT_CACHE.keys().next().value;
        if (firstKey !== undefined) {
            PRET_UNIVERSAL_CONTEXT_CACHE.delete(firstKey);
        }
    }
    return context;
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
        id: "denominal_ti_source_consonant",
        label: "denominal TI with consonant source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalTiMatrix
            && context.denominalSourceEndsWithConsonant
        ),
        classes: ["B"],
    },
    {
        id: "denominal_ti_source_vowel",
        label: "denominal TI with vowel source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalTiMatrix
            && context.denominalSourceEndsWithVowel
        ),
        classes: ["A", "B"],
    },
    {
        id: "denominal_wi_source_consonant",
        label: "denominal WI with consonant source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalWiMatrix
            && context.denominalSourceEndsWithConsonant
        ),
        classes: ["B"],
    },
    {
        id: "denominal_wi_source_vowel",
        label: "denominal WI with vowel source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalWiMatrix
            && context.denominalSourceEndsWithVowel
        ),
        classes: ["A", "B"],
    },
    {
        id: "monosyllable_transitive_v_e",
        label: "monosyllable transitive V (e)",
        tier: "monosyllable",
        when: (context) => (
            context.isMonosyllable
            && context.isTransitive
            && context.lastSyllableForm === "V"
            && context.lastNucleus === "e"
        ),
        classes: ["D"],
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
        ),
        classes: ["B"],
    },
    {
        id: "deleted_vowel_cluster_intransitive",
        label: "deleted vowel cluster (intransitive)",
        tier: "forced",
        when: (context) => {
            if (context.isTransitive || !context.deletionCreatesCluster) {
                return false;
            }
            const allowClusterExactWiWa = pretContextHasAnyExactDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.exact.ccvwi,
                    PRET_DESCRIPTOR_QUERIES.exact.vccvwiShort,
                    PRET_DESCRIPTOR_QUERIES.exact.vccvwa,
                ]
            );
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
            && pretContextHasAnyExactDescriptor(
                context,
                [PRET_DESCRIPTOR_QUERIES.exact.vlv, PRET_DESCRIPTOR_QUERIES.exact.cvlv]
            )
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
            && pretContextHasAnyExactDescriptor(
                context,
                [PRET_DESCRIPTOR_QUERIES.exact.vlv, PRET_DESCRIPTOR_QUERIES.exact.cvlv]
            )
        ),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_EXACT_CORE_TIER_RULES = Object.freeze([
    {
        id: "exact_nia_transitive",
        label: "exact Nia (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactEndingFamily(context, "n+ia"),
        classes: ["C"],
    },
    {
        id: "exact_cvv_transitive",
        label: "exact CV-V (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvv),
        classes: ["C"],
    },
    {
        id: "exact_vv_intransitive",
        label: "exact V-V (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vv),
        classes: ["C"],
    },
]);

const PRET_UNIVERSAL_EXACT_NA_INTRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "exact_vna_intransitive",
        label: "exact V-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vna),
        classes: ["B"],
    },
    {
        id: "exact_cvna_intransitive",
        label: "exact CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvna),
        classes: ["A", "B"],
    },
    {
        id: "exact_cvcvna_intransitive",
        label: "exact CV-CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvcvna),
        classes: ["A"],
    },
    {
        id: "exact_cvcvcvna_intransitive",
        label: "exact CV-CV-CV-CV(na) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvcvcvna),
        classes: ["A"],
    },
    {
        id: "exact_vwi_intransitive",
        label: "exact V-CV(wi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vwi),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_NA_TRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "exact_cvcvna",
        label: "exact CV-CV-CV(na)",
        tier: "exact",
        when: (context) => pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvcvna),
        classes: ["A"],
    },
    {
        id: "exact_cvlvna_transitive",
        label: "exact CVl-V-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvlvna),
        classes: ["A"],
    },
    {
        id: "exact_vlcvna_transitive",
        label: "exact Vl-CV-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vlcvna),
        classes: ["A"],
    },
    {
        id: "exact_vjcvna_transitive",
        label: "exact Vj-CV-CV(na) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vjcvna),
        classes: ["A"],
    },
    {
        id: "exact_cvtza_transitive",
        label: "exact CV-CV(tza) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasAnyExactDescriptor(
            context,
            [PRET_DESCRIPTOR_QUERIES.exact.cvtza, PRET_DESCRIPTOR_QUERIES.exact.vjcvtza]
        ),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_TA_PV_TIER_RULES = Object.freeze([
    {
        id: "exact_cvta_intransitive",
        label: "exact CV-CV(ta) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvta),
        classes: ["B"],
    },
    {
        id: "exact_cvpv_transitive",
        label: "exact CV-CV(pV) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvpV),
        classes: ["A"],
    },
    {
        id: "exact_cvpv_intransitive",
        label: "exact CV-CV(pV) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvpV),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_EXACT_MA_KWI_NI_TIER_RULES = Object.freeze([
    {
        id: "exact_cvma_transitive",
        label: "exact CV-CV(ma) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasAnyExactDescriptor(
            context,
            [PRET_DESCRIPTOR_QUERIES.exact.cvma, PRET_DESCRIPTOR_QUERIES.exact.vjcvma]
        ),
        classes: ["A"],
    },
    {
        id: "exact_cvkwi_intransitive",
        label: "exact CV-CV(kwi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvkwi),
        classes: ["B"],
    },
    {
        id: "exact_vcvcu_intransitive",
        label: "exact V-CV-CV(u) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vcvcu),
        classes: ["B"],
    },
    {
        id: "exact_vlcvwi_intransitive",
        label: "exact Vl-CV-CV(wi) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vlcvwi),
        classes: ["B"],
    },
    {
        id: "exact_cvniu_intransitive",
        label: "exact CV(u)-CV(ni) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvniU),
        classes: ["B"],
    },
    {
        id: "exact_cvvni_intransitive",
        label: "exact CV-V-CV(ni) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvvni),
        classes: ["A", "B"],
    },
    {
        id: "exact_ni_transitive",
        label: "exact Ni (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactEndingFamily(context, "n+i"),
        classes: ["A"],
    },
    {
        id: "exact_na_transitive",
        label: "exact Na (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactEndingFamily(context, "n+a"),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_WA_ENTRY_TIER_RULES = Object.freeze([
    {
        id: "exact_vjwa",
        label: "exact Vj-CV(wa)",
        tier: "exact",
        when: (context) => pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vjwa),
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
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvwaI),
        classes: ["A"],
    },
    {
        id: "exact_vwai_transitive",
        label: "exact V(i)-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vwaI),
        classes: ["D"],
    },
    {
        id: "exact_vwa_transitive",
        label: "exact V-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive
            && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vwa)
            && !pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vwaI),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_EXACT_WA_REST_TIER_RULES = Object.freeze([
    {
        id: "exact_vccawa_transitive",
        label: "exact V-C-CV(a)-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vccawa),
        classes: ["A"],
    },
    {
        id: "exact_wa_transitive",
        label: "exact Wa (transitive)",
        tier: "exact",
        when: (context) => (
            context.isTransitive
            && pretContextHasAnyExactDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.exact.cvwaA,
                    PRET_DESCRIPTOR_QUERIES.exact.cvcawa,
                    PRET_DESCRIPTOR_QUERIES.exact.cvlawa,
                ]
            )
        ),
        classes: ["A"],
    },
    {
        id: "exact_ewa_transitive",
        label: "exact Ewa (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern),
        classes: ["A"],
    },
    {
        id: "exact_vjcvwa_transitive",
        label: "exact Vj-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vjcvwa),
        classes: ["A"],
    },
    {
        id: "exact_cvjcvwa_transitive",
        label: "exact CVj-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvjcvwa),
        classes: ["A"],
    },
    {
        id: "exact_vlcvwa_transitive",
        label: "exact Vl-CV-CV(wa) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.vlcvwa),
        classes: ["A"],
    },
    {
        id: "exact_cvwi_transitive",
        label: "exact CV-CV(wi) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvwi),
        classes: ["A", "B"],
    },
    {
        id: "exact_cvcvwi_transitive",
        label: "exact CV-CV-CV(wi) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvcvwi),
        classes: ["A", "B"],
    },
    {
        id: "exact_wi_transitive",
        label: "exact Wi (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern),
        classes: ["A", "B"],
    },
    {
        id: "exact_cuwa_intransitive",
        label: "exact CV(u)-CV(wa) (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cuwa),
        classes: ["B"],
    },
    {
        id: "exact_lwa_intransitive",
        label: "exact Lwa (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern),
        classes: ["A", "B"],
    },
    {
        id: "exact_short_wi_intransitive",
        label: "exact short Wi (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive
            && pretContextHasAnyExactDescriptor(
                context,
                [PRET_DESCRIPTOR_QUERIES.exact.vccvwiShort, PRET_DESCRIPTOR_QUERIES.exact.ccvwi]
            ),
        classes: ["A"],
    },
    {
        id: "exact_wi_intransitive",
        label: "exact Wi (intransitive)",
        tier: "exact",
        when: (context) => !context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern),
        classes: ["A", "B"],
    },
    {
        id: "exact_wa_intransitive",
        label: "exact Wa (intransitive)",
        tier: "exact",
        resolveCandidates: (context) => {
            if (!context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.waPattern)) {
                const classes = ["A"];
                if (pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvcvwa) && !context.isReduplicated) {
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
            && pretContextHasAnyExactDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.exact.cvccvna,
                    PRET_DESCRIPTOR_QUERIES.exact.cvccvcvna,
                    PRET_DESCRIPTOR_QUERIES.exact.longNa,
                ]
            )
        ),
        classes: ["A"],
    },
    {
        id: "exact_vnv_cvnv_cvmv_transitive",
        label: "exact V-CV(nV)/CV-CV(nV)/CV-CV(mV) (transitive)",
        tier: "exact",
        when: (context) => context.isTransitive
            && pretContextHasAnyExactDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.exact.vnV,
                    PRET_DESCRIPTOR_QUERIES.exact.cvnV,
                    PRET_DESCRIPTOR_QUERIES.exact.cvmV,
                ]
            ),
        classes: ["A"],
    },
    {
        id: "exact_cvsv",
        label: "exact CV-CV(sV)",
        tier: "exact",
        resolveCandidates: (context) => {
            if (!pretContextHasExactDescriptor(context, PRET_DESCRIPTOR_QUERIES.exact.cvsV)) {
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

function buildPretUniversalClassComputationFlags(context) {
    const override = context?.verbOverride || null;
    const allowUnpronounceable = override?.allowUnpronounceable === true || context?.allowUnpronounceable === true;
    const disallowTransitiveWaB = Boolean(
        context?.isTransitive
        && context?.endsWithWa
        && context?.letterCount >= 4,
    );
    const forceClassAForKWV = context?.forceClassAForKWV === true;
    return {
        override,
        allowUnpronounceable,
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

function getPretUniversalExactPatternLabels(context) {
    if (!context) {
        return [];
    }
    const descriptorState = pretContextGetDescriptorState(context);
    const exactDescriptors = Array.isArray(descriptorState?.exactDescriptors)
        ? descriptorState.exactDescriptors
        : [];
    return exactDescriptors
        .map((descriptor) => formatPretDescriptorLabel(descriptor, {
            activeRightEdgeProfile: context.rightEdgeProfile,
        }))
        .filter(Boolean);
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
