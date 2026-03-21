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
    "shape",
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

function buildPretOrderedRightEdgeDescriptor({
    endingFamily = "",
    rightEdgeProfile = "",
    juncture = "",
    rightEdgeDepth = 0,
    previousForm = "",
    previousOnset = "",
    previousNucleus = "",
    previousCoda = "",
    previousHasCoda = false,
    antepenultimateForm = "",
    antepenultimateOnset = "",
    antepenultimateNucleus = "",
    antepenultimateCoda = "",
    finalOnset = "",
    finalNucleus = "",
    finalCoda = "",
    finalForm = "",
} = {}) {
    return Object.freeze({
        endingFamily,
        rightEdgeProfile,
        juncture,
        rightEdgeDepth,
        previousForm,
        previousOnset,
        previousNucleus,
        previousCoda,
        previousHasCoda,
        antepenultimateForm,
        antepenultimateOnset,
        antepenultimateNucleus,
        antepenultimateCoda,
        finalOnset,
        finalNucleus,
        finalCoda,
        finalForm,
    });
}

function buildPretRightEdgeDescriptor(syllables = []) {
    const safeSyllables = Array.isArray(syllables) ? syllables : [];
    const lastSyllable = safeSyllables[safeSyllables.length - 1] || null;
    const previousSyllable = safeSyllables[safeSyllables.length - 2] || null;
    const antepenultimateSyllable = safeSyllables[safeSyllables.length - 3] || null;
    return buildPretOrderedRightEdgeDescriptor({
        endingFamily: formatPretEndingFamily(lastSyllable),
        rightEdgeProfile: formatPretRightEdgeProfile(safeSyllables),
        juncture: formatPretJuncture(safeSyllables),
        rightEdgeDepth: safeSyllables.length,
        previousForm: previousSyllable?.form || "",
        previousOnset: previousSyllable?.onset || "",
        previousNucleus: previousSyllable?.nucleus || "",
        previousCoda: previousSyllable?.coda || "",
        previousHasCoda: Boolean(previousSyllable?.coda),
        antepenultimateForm: antepenultimateSyllable?.form || "",
        antepenultimateOnset: antepenultimateSyllable?.onset || "",
        antepenultimateNucleus: antepenultimateSyllable?.nucleus || "",
        antepenultimateCoda: antepenultimateSyllable?.coda || "",
        finalOnset: lastSyllable?.onset || "",
        finalNucleus: lastSyllable?.nucleus || "",
        finalCoda: lastSyllable?.coda || "",
        finalForm: lastSyllable?.form || "",
    });
}

function buildPretOrderedRightEdgeQuery({
    endingFamily = "",
    endingFamilies = [],
    rightEdgeProfiles = [],
    rightEdgeProfileSuffixes = [],
    rightEdgeDepth = 0,
    minimumRightEdgeDepth = 0,
    maximumRightEdgeDepth = 0,
    junctures = [],
    finalForm = "",
    finalOnset = "",
    finalOnsets = [],
    finalNucleus = "",
    finalNuclei = [],
    previousForm = "",
    previousForms = [],
    previousOnset = "",
    previousOnsets = [],
    previousNucleus = "",
    previousNuclei = [],
    previousCoda = "",
    previousCodas = [],
    previousHasCoda,
    antepenultimateForm = "",
    antepenultimateForms = [],
} = {}) {
    const query = {};
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (endingFamilies.length) {
        query.endingFamilies = freezePretDescriptorList(endingFamilies);
    }
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = freezePretDescriptorList(rightEdgeProfiles);
    }
    if (rightEdgeProfileSuffixes.length) {
        query.rightEdgeProfileSuffixes = freezePretDescriptorList(rightEdgeProfileSuffixes);
    }
    if (rightEdgeDepth > 0) {
        query.rightEdgeDepth = rightEdgeDepth;
    }
    if (minimumRightEdgeDepth > 0) {
        query.minimumRightEdgeDepth = minimumRightEdgeDepth;
    }
    if (maximumRightEdgeDepth > 0) {
        query.maximumRightEdgeDepth = maximumRightEdgeDepth;
    }
    if (junctures.length) {
        query.junctures = freezePretDescriptorList(junctures);
    }
    if (finalForm) {
        query.finalForm = finalForm;
    }
    if (finalOnset) {
        query.finalOnset = finalOnset;
    }
    if (finalOnsets.length) {
        query.finalOnsets = freezePretDescriptorList(finalOnsets);
    }
    if (finalNucleus) {
        query.finalNucleus = finalNucleus;
    }
    if (finalNuclei.length) {
        query.finalNuclei = freezePretDescriptorList(finalNuclei);
    }
    if (previousForm) {
        query.previousForm = previousForm;
    }
    if (previousForms.length) {
        query.previousForms = freezePretDescriptorList(previousForms);
    }
    if (previousOnset) {
        query.previousOnset = previousOnset;
    }
    if (previousOnsets.length) {
        query.previousOnsets = freezePretDescriptorList(previousOnsets);
    }
    if (previousNucleus) {
        query.previousNucleus = previousNucleus;
    }
    if (previousNuclei.length) {
        query.previousNuclei = freezePretDescriptorList(previousNuclei);
    }
    if (previousCoda) {
        query.previousCoda = previousCoda;
    }
    if (previousCodas.length) {
        query.previousCodas = freezePretDescriptorList(previousCodas);
    }
    if (typeof previousHasCoda === "boolean") {
        query.previousHasCoda = previousHasCoda;
    }
    if (antepenultimateForm) {
        query.antepenultimateForm = antepenultimateForm;
    }
    if (antepenultimateForms.length) {
        query.antepenultimateForms = freezePretDescriptorList(antepenultimateForms);
    }
    return Object.freeze(query);
}

function normalizePretRightEdgeQuery(query = {}) {
    if (!query || typeof query !== "object") {
        return Object.freeze({});
    }
    return buildPretOrderedRightEdgeQuery({
        endingFamily: query.endingFamily || "",
        endingFamilies: Array.isArray(query.endingFamilies) ? query.endingFamilies : [],
        rightEdgeProfiles: Array.isArray(query.rightEdgeProfiles)
            ? query.rightEdgeProfiles
            : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []),
        rightEdgeProfileSuffixes: Array.isArray(query.rightEdgeProfileSuffixes)
            ? query.rightEdgeProfileSuffixes
            : (query.rightEdgeProfileSuffix ? [query.rightEdgeProfileSuffix] : []),
        rightEdgeDepth: Number.isInteger(query.rightEdgeDepth) ? query.rightEdgeDepth : 0,
        minimumRightEdgeDepth: Number.isInteger(query.minimumRightEdgeDepth) ? query.minimumRightEdgeDepth : 0,
        maximumRightEdgeDepth: Number.isInteger(query.maximumRightEdgeDepth) ? query.maximumRightEdgeDepth : 0,
        junctures: Array.isArray(query.junctures)
            ? query.junctures
            : (query.juncture ? [query.juncture] : []),
        finalForm: query.finalForm || "",
        finalOnset: query.finalOnset || "",
        finalOnsets: Array.isArray(query.finalOnsets) ? query.finalOnsets : [],
        finalNucleus: query.finalNucleus || "",
        finalNuclei: Array.isArray(query.finalNuclei) ? query.finalNuclei : [],
        previousForm: query.previousForm || "",
        previousForms: Array.isArray(query.previousForms) ? query.previousForms : [],
        previousOnset: query.previousOnset || "",
        previousOnsets: Array.isArray(query.previousOnsets) ? query.previousOnsets : [],
        previousNucleus: query.previousNucleus || "",
        previousNuclei: Array.isArray(query.previousNuclei) ? query.previousNuclei : [],
        previousCoda: query.previousCoda || "",
        previousCodas: Array.isArray(query.previousCodas) ? query.previousCodas : [],
        previousHasCoda: query.previousHasCoda,
        antepenultimateForm: query.antepenultimateForm || "",
        antepenultimateForms: Array.isArray(query.antepenultimateForms) ? query.antepenultimateForms : [],
    });
}

function pretRightEdgeDescriptorMatchesQuery(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const orderedQuery = normalizePretRightEdgeQuery(query);
    const endingFamilies = Array.isArray(orderedQuery.endingFamilies)
        ? orderedQuery.endingFamilies
        : (orderedQuery.endingFamily ? [orderedQuery.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const rightEdgeProfiles = Array.isArray(orderedQuery.rightEdgeProfiles) ? orderedQuery.rightEdgeProfiles : [];
    if (rightEdgeProfiles.length && !rightEdgeProfiles.includes(descriptor.rightEdgeProfile)) {
        return false;
    }
    const rightEdgeProfileSuffixes = Array.isArray(orderedQuery.rightEdgeProfileSuffixes)
        ? orderedQuery.rightEdgeProfileSuffixes
        : [];
    if (
        rightEdgeProfileSuffixes.length
        && !rightEdgeProfileSuffixes.some((suffix) => descriptor.rightEdgeProfile === suffix || descriptor.rightEdgeProfile.endsWith(`|${suffix}`))
    ) {
        return false;
    }
    if (orderedQuery.rightEdgeDepth && descriptor.rightEdgeDepth !== orderedQuery.rightEdgeDepth) {
        return false;
    }
    if (orderedQuery.minimumRightEdgeDepth && descriptor.rightEdgeDepth < orderedQuery.minimumRightEdgeDepth) {
        return false;
    }
    if (orderedQuery.maximumRightEdgeDepth && descriptor.rightEdgeDepth > orderedQuery.maximumRightEdgeDepth) {
        return false;
    }
    const junctures = Array.isArray(orderedQuery.junctures) ? orderedQuery.junctures : [];
    if (junctures.length && !junctures.includes(descriptor.juncture)) {
        return false;
    }
    if (orderedQuery.finalForm && descriptor.finalForm !== orderedQuery.finalForm) {
        return false;
    }
    const finalOnsets = Array.isArray(orderedQuery.finalOnsets)
        ? orderedQuery.finalOnsets
        : (orderedQuery.finalOnset ? [orderedQuery.finalOnset] : []);
    if (finalOnsets.length && !finalOnsets.includes(descriptor.finalOnset)) {
        return false;
    }
    const finalNuclei = Array.isArray(orderedQuery.finalNuclei)
        ? orderedQuery.finalNuclei
        : (orderedQuery.finalNucleus ? [orderedQuery.finalNucleus] : []);
    if (finalNuclei.length && !finalNuclei.includes(descriptor.finalNucleus)) {
        return false;
    }
    const previousForms = Array.isArray(orderedQuery.previousForms)
        ? orderedQuery.previousForms
        : (orderedQuery.previousForm ? [orderedQuery.previousForm] : []);
    if (previousForms.length && !previousForms.includes(descriptor.previousForm)) {
        return false;
    }
    const previousOnsets = Array.isArray(orderedQuery.previousOnsets)
        ? orderedQuery.previousOnsets
        : (orderedQuery.previousOnset ? [orderedQuery.previousOnset] : []);
    if (previousOnsets.length && !previousOnsets.includes(descriptor.previousOnset)) {
        return false;
    }
    const previousNuclei = Array.isArray(orderedQuery.previousNuclei)
        ? orderedQuery.previousNuclei
        : (orderedQuery.previousNucleus ? [orderedQuery.previousNucleus] : []);
    if (previousNuclei.length && !previousNuclei.includes(descriptor.previousNucleus)) {
        return false;
    }
    const previousCodas = Array.isArray(orderedQuery.previousCodas)
        ? orderedQuery.previousCodas
        : (orderedQuery.previousCoda ? [orderedQuery.previousCoda] : []);
    if (previousCodas.length && !previousCodas.includes(descriptor.previousCoda)) {
        return false;
    }
    if (
        Object.prototype.hasOwnProperty.call(orderedQuery, "previousHasCoda")
        && descriptor.previousHasCoda !== Boolean(orderedQuery.previousHasCoda)
    ) {
        return false;
    }
    const antepenultimateForms = Array.isArray(orderedQuery.antepenultimateForms)
        ? orderedQuery.antepenultimateForms
        : (orderedQuery.antepenultimateForm ? [orderedQuery.antepenultimateForm] : []);
    if (antepenultimateForms.length && !antepenultimateForms.includes(descriptor.antepenultimateForm)) {
        return false;
    }
    return true;
}

function pretContextHasRightEdge(context, query = {}) {
    return pretRightEdgeDescriptorMatchesQuery(context?.rightEdgeDescriptor, query);
}

function pretContextHasAnyRightEdge(context, queries = []) {
    return (Array.isArray(queries) ? queries : []).some((query) => (
        pretContextHasRightEdge(context, query)
    ));
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

function buildPretOrderedDescriptorQuery({
    endingFamily = "",
    rightEdgeProfiles = [],
    junctures = [],
    modifierSet = null,
    modifiers = [],
    excludeModifiers = [],
} = {}) {
    const query = {};
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = freezePretDescriptorList(rightEdgeProfiles);
    }
    if (junctures.length) {
        query.junctures = freezePretDescriptorList(junctures);
    }
    if (modifierSet !== null) {
        query.modifierSet = freezePretDescriptorList(modifierSet);
    }
    if (modifiers.length) {
        query.modifiers = freezePretDescriptorList(modifiers);
    }
    if (excludeModifiers.length) {
        query.excludeModifiers = freezePretDescriptorList(excludeModifiers);
    }
    return Object.freeze(query);
}

function normalizePretDescriptorQuery(query = {}) {
    if (!query || typeof query !== "object") {
        return Object.freeze({});
    }
    return buildPretOrderedDescriptorQuery({
        rightEdgeProfiles: Array.isArray(query.rightEdgeProfiles)
            ? query.rightEdgeProfiles
            : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []),
        junctures: Array.isArray(query.junctures)
            ? query.junctures
            : (query.juncture ? [query.juncture] : []),
        endingFamily: query.endingFamily || "",
        modifierSet: Object.prototype.hasOwnProperty.call(query, "modifierSet")
            ? (Array.isArray(query.modifierSet) ? query.modifierSet : [])
            : null,
        modifiers: Array.isArray(query.modifiers) ? query.modifiers : [],
        excludeModifiers: Array.isArray(query.excludeModifiers) ? query.excludeModifiers : [],
    });
}

function makePretDescriptorQuery(endingFamily = "", rightEdgeProfileOrProfiles = null, options = {}) {
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
    return buildPretOrderedDescriptorQuery({
        rightEdgeProfiles,
        junctures,
        endingFamily,
        modifierSet,
        modifiers: descriptorModifiers,
        excludeModifiers: Array.isArray(options.excludeModifiers)
            ? options.excludeModifiers.filter(Boolean)
            : [],
    });
}

function pretDescriptorMatchesQuery(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const orderedQuery = normalizePretDescriptorQuery(query);
    const descriptorModifiers = Array.isArray(descriptor.modifiers) ? descriptor.modifiers : [];
    const descriptorProfiles = Array.isArray(descriptor.rightEdgeProfiles) ? descriptor.rightEdgeProfiles : [];
    const descriptorJunctures = Array.isArray(descriptor.junctures) ? descriptor.junctures : [];
    const endingFamilies = Array.isArray(query.endingFamilies)
        ? query.endingFamilies
        : (orderedQuery.endingFamily ? [orderedQuery.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const profiles = Array.isArray(orderedQuery.rightEdgeProfiles)
        ? orderedQuery.rightEdgeProfiles
        : (orderedQuery.rightEdgeProfile ? [orderedQuery.rightEdgeProfile] : []);
    if (profiles.length && !profiles.some((profile) => descriptorProfiles.includes(profile))) {
        return false;
    }
    const junctures = Array.isArray(orderedQuery.junctures)
        ? orderedQuery.junctures
        : (orderedQuery.juncture ? [orderedQuery.juncture] : []);
    if (junctures.length && !junctures.some((value) => descriptorJunctures.includes(value))) {
        return false;
    }
    if (Array.isArray(orderedQuery.modifiers) && orderedQuery.modifiers.length) {
        if (!orderedQuery.modifiers.every((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    if (Array.isArray(orderedQuery.excludeModifiers) && orderedQuery.excludeModifiers.length) {
        if (orderedQuery.excludeModifiers.some((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "modifierSet")) {
        const expectedModifiers = Array.isArray(orderedQuery.modifierSet) ? orderedQuery.modifierSet : [];
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
    if (descriptor.endingFamily) {
        parts.push(descriptor.endingFamily);
    }
    if (activeProfile) {
        parts.push(activeProfile);
    }
    const modifiers = Array.isArray(descriptor.modifiers)
        ? descriptor.modifiers.filter((modifier) => modifier !== "aggregate")
        : [];
    return parts.concat(modifiers).join(" · ");
}

const PRET_DESCRIPTOR_QUERIES = Object.freeze({
    shape: Object.freeze({
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

const PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS = Object.freeze([
    Object.freeze({ descriptorKey: "cvniU", baseKey: "cvni", leadingNucleus: "u" }),
    Object.freeze({ descriptorKey: "cvwaA", baseKey: "cvwa", leadingNucleus: "a" }),
    Object.freeze({ descriptorKey: "cvwaI", baseKey: "cvwa", leadingNucleus: "i" }),
    Object.freeze({ descriptorKey: "cuwa", baseKey: "cvwa", leadingNucleus: "u" }),
    Object.freeze({ descriptorKey: "vwaI", baseKey: "vwa", leadingNucleus: "i" }),
]);

const PRET_RIGHT_EDGE_RULE_QUERIES = Object.freeze({
    naCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
    naCV_CV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV|CV|CV"],
    }),
    naDepthAtLeastFour: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        minimumRightEdgeDepth: 4,
    }),
    wiV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+i",
        rightEdgeProfiles: ["V|CV|CV"],
    }),
    wiCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
    waCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
});

const PRET_AGGREGATE_DESCRIPTOR_SPECS = Object.freeze([
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.vwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vccvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvlcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vjcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvvjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.longWi,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.waPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.cvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.vccvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlcvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.vccvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.longWa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.cewa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvewa,
            PRET_DESCRIPTOR_QUERIES.shape.vjcewa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlewa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.vlvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlvwa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.kawa,
        matcher: (shapeDescriptors = [], runtimeState = {}) => (
            pretDescriptorListHasQuery(shapeDescriptors, PRET_DESCRIPTOR_QUERIES.shape.cvwaA)
            && runtimeState.leadingOnset === "k"
        ),
    }),
]);

function pretEndingFamilyMatchesPattern(actualFamily = "", expectedFamily = "") {
    if (!expectedFamily) {
        return true;
    }
    const [actualOnset = "", actualNucleus = ""] = String(actualFamily || "").split("+");
    const [expectedOnset = "", expectedNucleus = ""] = String(expectedFamily || "").split("+");
    const onsetMatches = expectedOnset === "*" || actualOnset === expectedOnset;
    const nucleusMatches = expectedNucleus === "*" || actualNucleus === expectedNucleus;
    return onsetMatches && nucleusMatches;
}

function pretRightEdgeProfileMatchesSyllableWindow(profile = "", syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    const windowForms = windowSyllables.map((syllable) => String(syllable?.form || "")).filter(Boolean);
    const profileParts = String(profile || "").split("|").filter(Boolean);
    if (!windowForms.length || !profileParts.length) {
        return false;
    }
    if (profileParts[0] === "...") {
        const suffixParts = profileParts.slice(1);
        if (!suffixParts.length || windowForms.length < suffixParts.length) {
            return false;
        }
        return suffixParts.every((part, index) => (
            windowForms[windowForms.length - suffixParts.length + index] === part
        ));
    }
    if (windowForms.length !== profileParts.length) {
        return false;
    }
    return profileParts.every((part, index) => windowForms[index] === part);
}

function pretShapeModifiersMatchSyllableWindow(query = {}, syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    const modifiers = Array.isArray(query?.modifiers) ? query.modifiers : [];
    if (!modifiers.length) {
        return true;
    }
    const leadSyllable = windowSyllables[0] || null;
    const bridgeSyllable = windowSyllables[windowSyllables.length - 2] || null;
    return modifiers.every((modifier) => {
        if (modifier === "long") {
            return windowSyllables.length >= 4;
        }
        if (modifier === "aggregate" || modifier === "l-bridge") {
            return true;
        }
        if (modifier.startsWith("leadNucleus=")) {
            return (leadSyllable?.nucleus || "") === modifier.slice("leadNucleus=".length);
        }
        if (modifier.startsWith("leadOnset=")) {
            return (leadSyllable?.onset || "") === modifier.slice("leadOnset=".length);
        }
        if (modifier.startsWith("bridgeNucleus=")) {
            return (bridgeSyllable?.nucleus || "") === modifier.slice("bridgeNucleus=".length);
        }
        return true;
    });
}

function pretShapeDescriptorMatchesSyllableWindow(query = {}, syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    if (!windowSyllables.length) {
        return false;
    }
    const normalizedQuery = normalizePretDescriptorQuery(query);
    const rightEdgeProfiles = Array.isArray(normalizedQuery.rightEdgeProfiles)
        ? normalizedQuery.rightEdgeProfiles
        : [];
    if (
        rightEdgeProfiles.length
        && !rightEdgeProfiles.some((profile) => pretRightEdgeProfileMatchesSyllableWindow(profile, windowSyllables, 0))
    ) {
        return false;
    }
    const actualEndingFamily = formatPretEndingFamily(windowSyllables[windowSyllables.length - 1]);
    if (!pretEndingFamilyMatchesPattern(actualEndingFamily, normalizedQuery.endingFamily || "")) {
        return false;
    }
    return pretShapeModifiersMatchSyllableWindow(normalizedQuery, windowSyllables, 0);
}

const PRET_SHAPE_SOURCE_OPTIONS = Object.freeze({
    cvta: Object.freeze({ includeRawReduplicatedSource: true }),
    vcvcu: Object.freeze({ includeSupportiveSource: false }),
    vnV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["V", "Vj"]) }),
        ]),
    }),
    cvnV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
    cvsV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
    cvmV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
});

function pretShapeDescriptorMatchesSources(shapeKey = "", query = {}, {
    syllables = [],
    analysisSyllables = [],
    supportiveSyllables = null,
    rawSyllables = [],
    baseIsReduplicated = false,
} = {}) {
    const options = PRET_SHAPE_SOURCE_OPTIONS[shapeKey] || {};
    const availableSources = Object.freeze({
        syllables,
        analysisSyllables,
        supportiveSyllables,
        rawSyllables,
    });
    const sourceMatches = (sourceSyllables = [], startIndex = 0, prefixForms = []) => {
        if (!Array.isArray(sourceSyllables) || !sourceSyllables.length) {
            return false;
        }
        if (Array.isArray(prefixForms) && prefixForms.length) {
            const prefixForm = sourceSyllables[startIndex - 1]?.form || "";
            if (!prefixForms.includes(prefixForm)) {
                return false;
            }
        }
        return pretShapeDescriptorMatchesSyllableWindow(query, sourceSyllables, startIndex);
    };
    if (pretShapeDescriptorMatchesSyllableWindow(query, syllables, 0)) {
        return true;
    }
    if (baseIsReduplicated && pretShapeDescriptorMatchesSyllableWindow(query, analysisSyllables, 1)) {
        return true;
    }
    if (
        options.includeRawReduplicatedSource === true
        && baseIsReduplicated
        && pretShapeDescriptorMatchesSyllableWindow(query, rawSyllables, 0)
    ) {
        return true;
    }
    if (
        options.includeSupportiveSource !== false
        && supportiveSyllables
        && pretShapeDescriptorMatchesSyllableWindow(query, supportiveSyllables, 0)
    ) {
        return true;
    }
    const extraSources = Array.isArray(options.extraSources) ? options.extraSources : [];
    for (const extraSource of extraSources) {
        const sourceName = extraSource?.source || "";
        if (!sourceName || !Object.prototype.hasOwnProperty.call(availableSources, sourceName)) {
            continue;
        }
        if (
            sourceMatches(
                availableSources[sourceName],
                Number.isInteger(extraSource?.startIndex) ? extraSource.startIndex : 0,
                Array.isArray(extraSource?.prefixForms) ? extraSource.prefixForms : [],
            )
        ) {
            return true;
        }
    }
    return false;
}

function pretShapeHasRedupPrefix(query = {}, syllables = [], prefixForms = []) {
    if (!Array.isArray(syllables) || !syllables.length) {
        return false;
    }
    const prefixForm = syllables[0]?.form || "";
    if (!Array.isArray(prefixForms) || !prefixForms.includes(prefixForm)) {
        return false;
    }
    return pretShapeDescriptorMatchesSyllableWindow(query, syllables, 1);
}

function buildPretActiveShapeDescriptors(shapeQueries = PRET_DESCRIPTOR_QUERIES.shape, {
    syllables = [],
    analysisSyllables = [],
    supportiveSyllables = null,
    rawSyllables = [],
    baseIsReduplicated = false,
    leadingNucleus = "",
} = {}) {
    const activeDescriptors = [];
    const derivedKeys = new Set(PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS.map((spec) => spec.descriptorKey));
    const activate = (query) => {
        if (query && !pretDescriptorListHasQuery(activeDescriptors, query)) {
            activeDescriptors.push(query);
        }
    };
    const hasShape = (query) => pretDescriptorListHasQuery(activeDescriptors, query);
    Object.entries(shapeQueries).forEach(([shapeKey, query]) => {
        if (derivedKeys.has(shapeKey)) {
            return;
        }
        if (
            pretShapeDescriptorMatchesSources(shapeKey, query, {
                syllables,
                analysisSyllables,
                supportiveSyllables,
                rawSyllables,
                baseIsReduplicated,
            })
        ) {
            activate(query);
        }
    });
    PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS.forEach((spec) => {
        if (leadingNucleus !== spec.leadingNucleus) {
            return;
        }
        const baseDescriptor = shapeQueries[spec.baseKey];
        if (!hasShape(baseDescriptor)) {
            return;
        }
        activate(shapeQueries[spec.descriptorKey]);
    });
    if (hasShape(shapeQueries.vna) || hasShape(shapeQueries.cvna)) {
        return Object.freeze(activeDescriptors.filter((descriptor) => (
            !pretDescriptorMatchesQuery(descriptor, shapeQueries.vnV)
            && !pretDescriptorMatchesQuery(descriptor, shapeQueries.cvnV)
        )));
    }
    return Object.freeze(activeDescriptors.slice());
}

function buildPretAggregateDescriptors(shapeDescriptors = [], runtimeState = {}) {
    const activeDescriptors = [];
    PRET_AGGREGATE_DESCRIPTOR_SPECS.forEach((spec) => {
        const isActive = typeof spec.matcher === "function"
            ? spec.matcher(shapeDescriptors, runtimeState)
            : pretDescriptorListHasAnyQuery(shapeDescriptors, spec.sourceQueries || []);
        if (!isActive || pretDescriptorListHasQuery(activeDescriptors, spec.descriptor)) {
            return;
        }
        activeDescriptors.push(spec.descriptor);
    });
    return Object.freeze(activeDescriptors.slice());
}

function buildPretDescriptorState(shapeDescriptors = [], aggregateDescriptors = []) {
    return Object.freeze({
        shapeDescriptors: Object.freeze(Array.isArray(shapeDescriptors) ? shapeDescriptors.slice() : []),
        aggregateDescriptors: Object.freeze(Array.isArray(aggregateDescriptors) ? aggregateDescriptors.slice() : []),
    });
}

function pretContextGetDescriptorState(context) {
    return context?.descriptorState || null;
}

function pretContextHasShapeDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.shapeDescriptors, query);
}

function pretContextHasAnyShapeDescriptor(context, queries = []) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasAnyQuery(descriptorState?.shapeDescriptors, queries);
}

function pretContextHasAggregateDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.aggregateDescriptors, query);
}

function pretContextHasShapeEndingFamily(context, endingFamily) {
    return pretContextHasShapeDescriptor(context, { endingFamily });
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
    const hasRightEdge = (query = {}) => pretRightEdgeDescriptorMatchesQuery(rightEdgeDescriptor, query);
    const forceClassBEnding = pretContextHasAnyRightEdge(
        { rightEdgeDescriptor },
        [
            { rightEdgeProfileSuffixes: ["Vj|CV", "CVj|CV"] },
            { rightEdgeProfileSuffixes: ["Vl|CV", "CVl|CV"] },
            { rightEdgeProfileSuffixes: ["V|C|CV", "CV|C|CV"] },
        ],
    );
    const shapeQuery = PRET_DESCRIPTOR_QUERIES.shape;
    const hasVnVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.vnV, syllables, ["V", "Vj"]);
    const hasCVnVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.cvnV, syllables, ["CV", "CVj"]);
    const hasCVmVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.cvmV, syllables, ["CV", "CVj"]);
    const activePretShapeDescriptors = buildPretActiveShapeDescriptors(shapeQuery, {
        syllables,
        analysisSyllables,
        supportiveSyllables,
        rawSyllables,
        baseIsReduplicated,
        leadingNucleus: syllables[0]?.nucleus || "",
    });
    const hasShapeDescriptor = (query) => pretDescriptorListHasQuery(activePretShapeDescriptors, query);

    const resolvedForceClassBEnding = forceClassBEnding
        && !hasShapeDescriptor(shapeQuery.vccvwi)
        && !hasShapeDescriptor(shapeQuery.vccvwiShort)
        && !hasShapeDescriptor(shapeQuery.vccvwa);
    const activePretAggregateDescriptors = buildPretAggregateDescriptors(activePretShapeDescriptors, {
        leadingOnset: syllables[0]?.onset || "",
    });
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
    const isItaVerb = isItaSyllableSequence(syllables);
    const forceClassAForKWV = hasRightEdge({ finalForm: "CV", finalOnset: "kw" })
        && !hasRightEdge({ finalForm: "CV", finalOnset: "kw", finalNucleus: "u" })
        && !isRootPlusYa
        && !isMonosyllable;
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
        forceClassBEnding: resolvedForceClassBEnding,
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
    const descriptorState = buildPretDescriptorState(activePretShapeDescriptors, activePretAggregateDescriptors);
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
            const allowClusterWiWaShape = pretContextHasAnyShapeDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.shape.ccvwi,
                    PRET_DESCRIPTOR_QUERIES.shape.vccvwiShort,
                    PRET_DESCRIPTOR_QUERIES.shape.vccvwa,
                ]
            );
            return !allowClusterWiWaShape;
        },
        classes: ["B"],
    },
    {
        id: "descriptor_t+a_intransitive",
        label: "descriptor t+a (intransitive)",
        tier: "forced",
        when: (context) => !context.isTransitive && pretContextHasRightEdge(context, { endingFamily: "t+a" }),
        classes: ["B"],
    },
    {
        id: "descriptor_ch+i_intransitive",
        label: "descriptor ch+i (intransitive)",
        tier: "forced",
        when: (context) => (
            !context.isTransitive
            && !context.isMonosyllable
            && pretContextHasRightEdge(context, { endingFamily: "ch+i" })
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_p+a_transitive",
        label: "descriptor p+a (transitive)",
        tier: "forced",
        when: (context) => (
            context.isTransitive
            && !context.isMonosyllable
            && pretContextHasRightEdge(context, { endingFamily: "p+a" })
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_m+[a|i]_transitive",
        label: "descriptor m+[a|i] (transitive)",
        tier: "forced",
        when: (context) => (
            context.isTransitive
            && !context.isMonosyllable
            && pretContextHasRightEdge(context, { finalOnset: "m", finalNuclei: ["a", "i"] })
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_p+i_intransitive",
        label: "descriptor p+i (intransitive)",
        tier: "forced",
        when: (context) => (
            !context.isTransitive
            && !context.isMonosyllable
            && pretContextHasRightEdge(context, { endingFamily: "p+i" })
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_t+a_transitive_redup_cvcv",
        label: "descriptor t+a (transitive redup CVCV)",
        tier: "forced",
        when: (context) => (
            context.isTransitive
            && pretContextHasRightEdge(context, { endingFamily: "t+a" })
            && context.analysisVerb !== "ita"
            && context.isReduplicatedCVCV
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_t+a_transitive",
        label: "descriptor t+a (transitive)",
        tier: "forced",
        when: (context) => (
            context.isTransitive
            && context.analysisVerb !== "ita"
            && pretContextHasRightEdge(context, { endingFamily: "t+a" })
        ),
        classes: ["B"],
    },
    {
        id: "descriptor_tz+*",
        label: "descriptor tz+*",
        tier: "forced",
        when: (context) => (
            pretContextHasRightEdge(context, { finalOnset: "tz" })
            && !pretContextHasAnyRightEdge(context, [
                { rightEdgeProfileSuffixes: ["V|C|CV", "CV|C|CV"] },
            ])
        ),
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
        label: "descriptor l+* · [Vl|V|CVl|V] · i",
        tier: "forced",
        when: (context) => (
            !context.isTransitive
            && context.lastNucleus === "i"
            && pretContextHasAnyRightEdge(
                context,
                [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]
            )
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_lv",
        label: "descriptor l+* · [Vl|V|CVl|V]",
        tier: "forced",
        when: (context) => pretContextHasAnyRightEdge(context, [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]),
        classes: ["A"],
    },
    {
        id: "descriptor_lv_i",
        label: "descriptor l+* · [Vl|V|CVl|V] · i",
        tier: "shape",
        when: (context) => (
            context.lastNucleus === "i"
            && pretContextHasAnyRightEdge(
                context,
                [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]
            )
        ),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_SHAPE_CORE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_nia_transitive",
        label: "descriptor Nia (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeEndingFamily(context, "n+ia"),
        classes: ["C"],
    },
    {
        id: "descriptor_cvv_transitive",
        label: "descriptor CV-V (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvv),
        classes: ["C"],
    },
    {
        id: "descriptor_vv_intransitive",
        label: "descriptor V-V (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vv),
        classes: ["C"],
    },
]);

const PRET_UNIVERSAL_SHAPE_NA_INTRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vna_intransitive",
        label: "descriptor V-CV(na) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vna),
        classes: ["B"],
    },
    {
        id: "descriptor_cvna_intransitive",
        label: "descriptor CV-CV(na) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvna),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_na_three_syllable_intransitive",
        label: "descriptor n+a, three-syllable right edge (intransitive)",
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_na_four_syllable_intransitive",
        label: "descriptor n+a, four-syllable right edge (intransitive)",
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV_CV)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_vwi_intransitive",
        label: "descriptor V-CV(wi) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwi),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_NA_TRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_na_three_syllable_transitive",
        label: "descriptor n+a, three-syllable right edge (transitive)",
        tier: "shape",
        when: (context) => pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV),
        classes: ["A"],
    },
    {
        id: "descriptor_cvlvna_transitive",
        label: "descriptor CVl-V-CV(na) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvlvna),
        classes: ["A"],
    },
    {
        id: "descriptor_vlcvna_transitive",
        label: "descriptor Vl-CV-CV(na) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vlcvna),
        classes: ["A"],
    },
    {
        id: "descriptor_vjcvna_transitive",
        label: "descriptor Vj-CV-CV(na) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vjcvna),
        classes: ["A"],
    },
    {
        id: "descriptor_cvtza_transitive",
        label: "descriptor CV-CV(tza) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasAnyShapeDescriptor(
            context,
            [PRET_DESCRIPTOR_QUERIES.shape.cvtza, PRET_DESCRIPTOR_QUERIES.shape.vjcvtza]
        ),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_TA_PV_TIER_RULES = Object.freeze([
    {
        id: "descriptor_cvta_intransitive",
        label: "descriptor CV-CV(ta) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvta),
        classes: ["B"],
    },
    {
        id: "descriptor_cvpv_transitive",
        label: "descriptor CV-CV(pV) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvpV),
        classes: ["A"],
    },
    {
        id: "descriptor_cvpv_intransitive",
        label: "descriptor CV-CV(pV) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvpV),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_SHAPE_MA_KWI_NI_TIER_RULES = Object.freeze([
    {
        id: "descriptor_cvma_transitive",
        label: "descriptor CV-CV(ma) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasAnyShapeDescriptor(
            context,
            [PRET_DESCRIPTOR_QUERIES.shape.cvma, PRET_DESCRIPTOR_QUERIES.shape.vjcvma]
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_cvkwi_intransitive",
        label: "descriptor CV-CV(kwi) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvkwi),
        classes: ["B"],
    },
    {
        id: "descriptor_vcvcu_intransitive",
        label: "descriptor V-CV-CV(u) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vcvcu),
        classes: ["B"],
    },
    {
        id: "descriptor_vlcvwi_intransitive",
        label: "descriptor Vl-CV-CV(wi) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vlcvwi),
        classes: ["B"],
    },
    {
        id: "descriptor_cvniu_intransitive",
        label: "descriptor CV(u)-CV(ni) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvniU),
        classes: ["B"],
    },
    {
        id: "descriptor_cvvni_intransitive",
        label: "descriptor CV-V-CV(ni) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvvni),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_ni_transitive",
        label: "descriptor Ni (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeEndingFamily(context, "n+i"),
        classes: ["A"],
    },
    {
        id: "descriptor_na_transitive",
        label: "descriptor Na (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeEndingFamily(context, "n+a"),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_WA_ENTRY_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vjwa",
        label: "descriptor Vj-CV(wa)",
        tier: "shape",
        when: (context) => pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vjwa),
        classes: ["B"],
    },
    {
        id: "descriptor_Ø+u",
        label: "descriptor Ø+u",
        tier: "forced",
        when: (context) => pretContextHasRightEdge(context, { finalForm: "V", finalNucleus: "u" }),
        classes: ["B"],
    },
    {
        id: "descriptor_cvwai_transitive",
        label: "descriptor CV(i)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvwaI),
        classes: ["A"],
    },
    {
        id: "descriptor_vwai_transitive",
        label: "descriptor V(i)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwaI),
        classes: ["D"],
    },
    {
        id: "descriptor_vwa_transitive",
        label: "descriptor V-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive
            && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwa)
            && !pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwaI),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_WA_REST_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vccawa_transitive",
        label: "descriptor V-C-CV(a)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vccawa),
        classes: ["A"],
    },
    {
        id: "descriptor_wa_transitive",
        label: "descriptor Wa (transitive)",
        tier: "shape",
        when: (context) => (
            context.isTransitive
            && pretContextHasAnyShapeDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.shape.cvwaA,
                    PRET_DESCRIPTOR_QUERIES.shape.cvcawa,
                    PRET_DESCRIPTOR_QUERIES.shape.cvlawa,
                ]
            )
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_ewa_transitive",
        label: "descriptor Ewa (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern),
        classes: ["A"],
    },
    {
        id: "descriptor_vjcvwa_transitive",
        label: "descriptor Vj-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vjcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_cvjcvwa_transitive",
        label: "descriptor CVj-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvjcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_vlcvwa_transitive",
        label: "descriptor Vl-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vlcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_cvwi_transitive",
        label: "descriptor CV-CV(wi) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvwi),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wi_three_syllable_transitive",
        label: "descriptor w+i, three-syllable right edge (transitive)",
        tier: "shape",
        when: (context) => (
            context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV)
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wi_transitive",
        label: "descriptor Wi (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_cuwa_intransitive",
        label: "descriptor CV(u)-CV(wa) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cuwa),
        classes: ["B"],
    },
    {
        id: "descriptor_lwa_intransitive",
        label: "descriptor Lwa (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_short_wi_intransitive",
        label: "descriptor short Wi (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive
            && pretContextHasAnyShapeDescriptor(
                context,
                [PRET_DESCRIPTOR_QUERIES.shape.vccvwiShort, PRET_DESCRIPTOR_QUERIES.shape.ccvwi]
            ),
        classes: ["A"],
    },
    {
        id: "descriptor_wi_intransitive",
        label: "descriptor Wi (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wa_intransitive",
        label: "descriptor Wa (intransitive)",
        tier: "shape",
        resolveCandidates: (context) => {
            if (!context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.waPattern)) {
                const classes = ["A"];
                if (pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV) && !context.isReduplicated) {
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
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naDepthAtLeastFour)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_vnv_cvnv_cvmv_transitive",
        label: "descriptor V-CV(nV)/CV-CV(nV)/CV-CV(mV) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive
            && pretContextHasAnyShapeDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.shape.vnV,
                    PRET_DESCRIPTOR_QUERIES.shape.cvnV,
                    PRET_DESCRIPTOR_QUERIES.shape.cvmV,
                ]
            ),
        classes: ["A"],
    },
    {
        id: "descriptor_cvsv",
        label: "descriptor CV-CV(sV)",
        tier: "shape",
        resolveCandidates: (context) => {
            if (!pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvsV)) {
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
            && pretContextHasRightEdge(ctx, {
                finalForm: "V",
                finalNucleus: "a",
                previousHasCoda: false,
                previousNuclei: ["i", "u"],
            })
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
    PRET_UNIVERSAL_SHAPE_CORE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_NA_INTRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_NA_TRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_TA_PV_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_MA_KWI_NI_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_WA_ENTRY_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_WA_REST_TIER_RULES,
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
        && pretContextHasRightEdge(context, { endingFamily: "w+a" })
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
    // Precedence: root+ya > monosyllable > forced-B endings > descriptor LV > descriptor patterns
    // > general class rules.
    return resolvePretUniversalClassSelection(context, { trace }).candidates;
}

function getPretUniversalShapeLabels(context) {
    if (!context) {
        return [];
    }
    const descriptorState = pretContextGetDescriptorState(context);
    const shapeDescriptors = Array.isArray(descriptorState?.shapeDescriptors)
        ? descriptorState.shapeDescriptors
        : [];
    return shapeDescriptors
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
    const shapeLabels = getPretUniversalShapeLabels(context);
    const shapeLabel = shapeLabels.length ? shapeLabels[0] : "";
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
        shapeLabel,
        shapeLabels,
        classList,
        resolvedClassList,
        gates: selection.gates,
    };
}
