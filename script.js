// === Configuration ===
var SPECIFIC_VALENCE_PREFIXES = [];
var NONSPECIFIC_VALENCE_PREFIXES = [];
var NONSPECIFIC_VALENCE_AFFIXES = [];
var SPECIFIC_VALENCE_PREFIX_SET = new Set();
var NONSPECIFIC_VALENCE_AFFIX_SET = new Set();
var VALENCE_CATEGORY_LABELS = {};
var OBJECT_PREFIXES = [];
var OBJECT_PREFIX_LABELS = new Map();
var OBJECT_PREFIX_GROUPS = [];
var INVALID_COMBINATION_KEYS = new Set();
var TENSE_SUFFIX_RULES = {};
var PRET_UNIVERSAL_CLASS_BY_TENSE = {};
var PRETERITO_CLASS_TENSES = new Set();
var NONSPECIFIC_I_DROP_VERBS = [];
var DIRECTIONAL_PREFIXES = [];
var IA_UA_SUFFIXES = [];
var AN_PREFIX_VOWEL_PREFIXES = [];
var VOWELS = "";
var VOWEL_RE = /[aeiu]/;
var VOWEL_START_RE = /^[aeiu]/;
var VOWEL_END_RE = /[aeiu]$/;
var VALID_VOWEL_SET = new Set();
var VALID_CONSONANTS = new Set();
var DIGRAPHS = [];
var DIGRAPH_SET = new Set();
var SYLLABLE_FORMS = [];
var SYLLABLE_FORM_SET = new Set();
var REDUP_PREFIX_FORMS = new Set();
var COMPOUND_MARKER_RE = /[|~#()\[\]{}\\/?-]/g;
var COMPOUND_MARKER_SPLIT_RE = /[|~#(){}\\/?-]/;
var COMPOUND_ALLOWED_RE = /[|~#()\[\]{}\\/?-]/g;
var DIRECTIONAL_RULES = [];
var ORDINARY_NNC_FIXTURES = [];
var STATIC_NNC_PATH = (
    typeof RUNTIME_PATHS !== "undefined"
    && RUNTIME_PATHS
    && RUNTIME_PATHS.STATIC_NNC_PATH
) || "data/static_nnc.json";
var SUPPORTIVE_I_KEEP_SLASH_PREFIXES = new Set();
var SUPPORTIVE_I_KEEP_SLASH_PREFIXES_LOADED = false;
var PATIENTIVO_PERFECTIVO_ALLOWED_FINALS = new Set();
var PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_C = new Set();
var PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_D = new Set();
var OPTIONAL_SUPPORTIVE_I_MARKER = "[i]";
var OPTIONAL_SUPPORTIVE_Y_MARKER = "[y]";
var OPTIONAL_SUPPORTIVE_I_RE = /\[i\]/g;
var OPTIONAL_SUPPORTIVE_MARKER_RE = /\[([iy])\]/gi;
var OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE = /\[([iy])\]/i;
var REGEX_OPTIONAL_SUPPORTIVE_I_MARKER = "[i]";
var REGEX_OPTIONAL_SUPPORTIVE_Y_MARKER = "[y]";
var REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE = /\[([iy])\]/gi;
var REGEX_OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE = /\[([iy])\]/i;
var REGEX_ENVELOPE_OBJECT_MARKERS = Object.freeze(["TA", "TE", "MU", "T", "M"]);
var FALLBACK_DIRECTIONAL_PREFIXES = Object.freeze(["wal", "un"]);
var REGEX_SPECIAL_SERIAL_SHORTHAND_CORE_MAP = Object.freeze({
    "$wi": "_wi-auto",
});
var REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP = Object.freeze({
    "_wi-auto": "$WI",
    "_wiauto": "$WI",
});
// Supportive marker formats:
// - legacy: default bracket-marker handling used across the current language
// - regex: explicit regex handling
// - screen: retained alias for shared surface helpers
var SUPPORTIVE_MARKER_FORMAT = Object.freeze({
    legacy: "legacy",
    regex: "regex",
    screen: "screen",
});

// Supportive Marker & Output Utilities extracted to src/core/output/surface.js
// Regex Core & Directional Prefix Utilities extracted to src/core/parsing/parsing.js

// UI constants and composer state (VERB_INPUT_MODE, COMPOSER_*, VerbComposerState, etc.)
// extracted to src/ui/composer/composer.js

function applyStaticLabels(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    VALENCE_CATEGORY_LABELS = mergeLabelMap(VALENCE_CATEGORY_LABELS, data.valenceCategoryLabels);
    NONACTIVE_SUFFIX_LABELS = mergeLabelMap(NONACTIVE_SUFFIX_LABELS, data.nonactiveSuffixLabels);
    NONACTIVE_SUFFIX_DESCRIPTIONS = mergeLabelMap(
        NONACTIVE_SUFFIX_DESCRIPTIONS,
        data.nonactiveSuffixDescriptions
    );
    NOUN_OBJECT_LABELS = mergeLabelMap(NOUN_OBJECT_LABELS, data.nounObjectLabels);
    if (data.nonactivePrefixLabel && typeof data.nonactivePrefixLabel === "object") {
        NONACTIVE_PREFIX_LABEL = { ...NONACTIVE_PREFIX_LABEL, ...data.nonactivePrefixLabel };
    }
    OBJECT_LABELS = mergeLabelMap(OBJECT_LABELS, data.objectLabels);
    OBJECT_ROLE_LABELS = mergeLabelMap(OBJECT_ROLE_LABELS, data.objectRoleLabels);
    VERB_BLOCK_LABELS = mergeLabelMap(VERB_BLOCK_LABELS, data.verbBlockLabels);
    NONACTIVE_GENERIC_LABELS = mergeLabelMap(NONACTIVE_GENERIC_LABELS, data.nonactiveGenericLabels);
    NONACTIVE_PERSON_SUB_LABELS = mergeLabelMap(NONACTIVE_PERSON_SUB_LABELS, data.nonactivePersonSubLabels);
    NONACTIVE_PERSON_CATEGORY_LABELS = mergeLabelMap(
        NONACTIVE_PERSON_CATEGORY_LABELS,
        data.nonactivePersonCategoryLabels
    );
    PERSON_GROUP_LABELS = mergeLabelMap(PERSON_GROUP_LABELS, data.personGroupLabels);
    PERSON_SUB_LABELS = mergeLabelMap(PERSON_SUB_LABELS, data.personSubLabels);
    TOGGLE_LABELS = mergeLabelMap(TOGGLE_LABELS, data.toggleLabels);
    PLACEHOLDER_LABELS = mergeLabelMap(PLACEHOLDER_LABELS, data.placeholderLabels);
    PATIENTIVO_OWNERSHIP_LABELS = mergeLabelMap(
        PATIENTIVO_OWNERSHIP_LABELS,
        data.patientivoOwnershipLabels
    );
    TENSE_LABELS = mergeLabelMap(TENSE_LABELS, data.tenseLabels);
    TENSE_DESCRIPTIONS = mergeLabelMap(TENSE_DESCRIPTIONS, data.tenseDescriptions);
    PRETERITO_CLASS_DETAIL_BY_KEY = mergeLabelMap(
        PRETERITO_CLASS_DETAIL_BY_KEY,
        data.preteritoClassDetailByKey
    );
    NUMBER_LABELS = mergeNumberLabels(NUMBER_LABELS, data.numberLabels);
    UI_LABELS = mergeLabelMap(UI_LABELS, data.uiLabels);
}

function applyStaticDerivationalRules(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    // Support { config, docs } shape so we can keep long-form documentation
    // separate from the actual data the engine consumes.
    if (data.config && typeof data.config === "object") {
        DERIVATIONAL_RULES = { ...data.config };
        DERIVATIONAL_RULES_DOCS = data.docs && typeof data.docs === "object" ? { ...data.docs } : {};
        resetDerivationalLookupCaches();
        return;
    }
    DERIVATIONAL_RULES = { ...data };
    DERIVATIONAL_RULES_DOCS = {};
    resetDerivationalLookupCaches();
}

function applyStaticValenceNeutral(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    VALENCE_NEUTRAL_RULES = { ...data };
    resetDerivationalLookupCaches();
}
async function loadStaticLabels() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_LABELS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_LABELS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticLabels(data);
        return true;
    } catch (error) {
        console.warn("Static labels not loaded.", error);
        return false;
    }
}

async function loadStaticDerivationalRules() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_DERIVATIONAL_RULES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_DERIVATIONAL_RULES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticDerivationalRules(data);
        return true;
    } catch (error) {
        console.warn("Static derivational rules not loaded.", error);
        return false;
    }
}

async function loadStaticValenceNeutral() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_VALENCE_NEUTRAL_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_VALENCE_NEUTRAL_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticValenceNeutral(data);
        return true;
    } catch (error) {
        console.warn("Static valence-neutral rules not loaded.", error);
        return false;
    }
}
function applyStaticOptions(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.specificValencePrefixes)) {
        SPECIFIC_VALENCE_PREFIXES = [...data.specificValencePrefixes];
    }
    if (Array.isArray(data.nonspecificValencePrefixes)) {
        NONSPECIFIC_VALENCE_PREFIXES = [...data.nonspecificValencePrefixes];
    }
    if (Array.isArray(data.nonspecificValenceAffixes)) {
        NONSPECIFIC_VALENCE_AFFIXES = [...data.nonspecificValenceAffixes];
    }
    if (Array.isArray(data.objectPrefixes)) {
        OBJECT_PREFIXES = [...data.objectPrefixes];
    }
    if (Array.isArray(data.invalidCombinationKeys)) {
        INVALID_COMBINATION_KEYS = new Set(data.invalidCombinationKeys);
    }
    if (Array.isArray(data.subjectCombinations)) {
        SUBJECT_COMBINATIONS = [...data.subjectCombinations];
    }
    if (Array.isArray(data.subjectPersonGroups)) {
        SUBJECT_PERSON_GROUPS = [...data.subjectPersonGroups];
    }
    if (Array.isArray(data.possessivePrefixes)) {
        POSSESSIVE_PREFIXES = [...data.possessivePrefixes];
    }
    if (data.possessorLabels && typeof data.possessorLabels === "object") {
        POSSESSOR_LABELS = { ...data.possessorLabels };
    } else {
        const fallback = {};
        if (data.possessorLabelsEs && typeof data.possessorLabelsEs === "object") {
            Object.entries(data.possessorLabelsEs).forEach(([key, labelEs]) => {
                fallback[key] = { labelEs };
            });
        }
        if (data.possessorLabelsNa && typeof data.possessorLabelsNa === "object") {
            Object.entries(data.possessorLabelsNa).forEach(([key, labelNa]) => {
                fallback[key] = { ...(fallback[key] || {}), labelNa };
            });
        }
        POSSESSOR_LABELS = fallback;
    }
    if (data.possessiveToObjectPrefix && typeof data.possessiveToObjectPrefix === "object") {
        POSSESSIVE_TO_OBJECT_PREFIX = { ...data.possessiveToObjectPrefix };
    }
    if (data.passiveImpersonalSubjectMap && typeof data.passiveImpersonalSubjectMap === "object") {
        PASSIVE_IMPERSONAL_SUBJECT_MAP = { ...data.passiveImpersonalSubjectMap };
    }
    SPECIFIC_VALENCE_PREFIX_SET = new Set(SPECIFIC_VALENCE_PREFIXES);
    NONSPECIFIC_VALENCE_AFFIX_SET = new Set(NONSPECIFIC_VALENCE_AFFIXES);
    OBJECT_PREFIX_LABELS = new Map(
        OBJECT_PREFIXES.map((option) => {
            const labelKey = option.labelKey || option.value;
            const baseLabel = labelKey ? NONACTIVE_PERSON_SUB_LABELS[labelKey] : null;
            const labelSuffix = option.labelSuffix || option.value;
            const baseLabelEs = baseLabel ? (baseLabel.labelEs || baseLabel.labelNa || "") : "";
            const baseLabelNa = baseLabel ? (baseLabel.labelNa || baseLabel.labelEs || "") : "";
            const formattedEs = baseLabelEs ? `${baseLabelEs} (${labelSuffix})` : "";
            const formattedNa = baseLabelNa ? `${baseLabelNa} (${labelSuffix})` : "";
            const labelEs = option.labelEs || option.labelText || formattedEs || option.value;
            const labelNa = option.labelNa || option.labelText || formattedNa || option.labelEs || option.value;
            return [option.value, { labelEs, labelNa }];
        })
    );
    OBJECT_PREFIX_GROUPS = [
        SPECIFIC_VALENCE_PREFIXES,
        NONSPECIFIC_VALENCE_PREFIXES,
    ];
    OBJECT_MARKERS = new Set(NONSPECIFIC_VALENCE_PREFIXES);
    FUSION_PREFIXES = new Set(NONSPECIFIC_VALENCE_AFFIXES);
    POSSESSIVE_PREFIX_LABELS = new Map(
        POSSESSIVE_PREFIXES.map((option) => {
            const personLabel = option.personSubKey ? PERSON_SUB_LABELS[option.personSubKey] : null;
            const labelEs = option.labelEs
                || option.label
                || (personLabel && (personLabel.labelEs || personLabel.labelNa))
                || option.value;
            const labelNa = option.labelNa
                || option.label
                || (personLabel && (personLabel.labelNa || personLabel.labelEs))
                || option.value;
            return [option.value, { labelEs, labelNa }];
        })
    );
    PASSIVE_IMPERSONAL_DIRECT_OBJECTS = new Set(Object.keys(PASSIVE_IMPERSONAL_SUBJECT_MAP));
    const sustantivoList = Array.isArray(data.sustantivoVerbalTransitivePrefixes)
        ? data.sustantivoVerbalTransitivePrefixes
        : NONSPECIFIC_VALENCE_PREFIXES;
    SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = new Set(sustantivoList);
    SUSTANTIVO_VERBAL_PREFIXES = ["", ...Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)];
}
async function loadStaticOptions() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_OPTIONS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_OPTIONS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticOptions(data);
        return true;
    } catch (error) {
        console.warn("Static options not loaded.", error);
        return false;
    }
}
var TENSE_LINGUISTIC_GROUPS = {
    verbo: { left: [], right: [] },
    sustantivo: { left: [], right: [] },
    adjetivo: { left: [], right: [] },
    adverbio: { left: [], right: [] },
};
function applyStaticGroups(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (data.tenseLinguisticGroups && typeof data.tenseLinguisticGroups === "object") {
        TENSE_LINGUISTIC_GROUPS = data.tenseLinguisticGroups;
    }
}
async function loadStaticGroups() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_GROUPS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_GROUPS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticGroups(data);
        return true;
    } catch (error) {
        console.warn("Static groups not loaded.", error);
        return false;
    }
}
function applyStaticOrders(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.tenseOrder)) {
        TENSE_ORDER = [...data.tenseOrder];
    }
    if (Array.isArray(data.preteritoUniversalOrder)) {
        PRETERITO_UNIVERSAL_ORDER = [...data.preteritoUniversalOrder];
    }
    if (!TenseTabsState.selected || !TENSE_ORDER.includes(TenseTabsState.selected)) {
        TenseTabsState.selected = TENSE_ORDER[0] || null;
    }
    if (
        !PreteritoUniversalTabsState.selected
        || !PRETERITO_UNIVERSAL_ORDER.includes(PreteritoUniversalTabsState.selected)
    ) {
        PreteritoUniversalTabsState.selected = PRETERITO_UNIVERSAL_ORDER[0] || null;
    }
}
async function loadStaticOrders() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_ORDERS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_ORDERS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticOrders(data);
        return true;
    } catch (error) {
        console.warn("Static orders not loaded.", error);
        return false;
    }
}
function applyStaticRules(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (data.tenseSuffixRules && typeof data.tenseSuffixRules === "object") {
        TENSE_SUFFIX_RULES = { ...data.tenseSuffixRules };
    }
    if (data.pretUniversalClassByTense && typeof data.pretUniversalClassByTense === "object") {
        PRET_UNIVERSAL_CLASS_BY_TENSE = { ...data.pretUniversalClassByTense };
    }
    if (Array.isArray(data.preteritoClassTenses)) {
        PRETERITO_CLASS_TENSES = new Set(data.preteritoClassTenses);
    }
    if (Array.isArray(data.nonspecificIDropVerbs)) {
        NONSPECIFIC_I_DROP_VERBS = [...data.nonspecificIDropVerbs];
    }
}
async function loadStaticRules() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_RULES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_RULES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticRules(data);
        return true;
    } catch (error) {
        console.warn("Static rules not loaded.", error);
        return false;
    }
}
var DEFAULT_DIRECTIONAL_RULES = [
    {
        id: "wal-alternation",
        prefixes: ["wal"],
        handler: "wal-alternation",
        stages: ["prefix", "post-elision"],
        applyToNouns: false,
        applyToVerbs: true,
        enabled: true,
    },
];
function normalizeDirectionalRules(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    const normalized = [];
    data.forEach((entry) => {
        if (!entry || typeof entry !== "object") {
            return;
        }
        const id = entry.id || entry.name || entry.rule;
        if (!id) {
            return;
        }
        let prefixes = entry.prefixes || entry.prefix || [];
        if (typeof prefixes === "string") {
            prefixes = [prefixes];
        }
        prefixes = Array.isArray(prefixes) ? prefixes.filter(Boolean) : [];
        if (!prefixes.length) {
            return;
        }
        let stages = entry.stages || entry.stage || ["prefix"];
        if (typeof stages === "string") {
            stages = [stages];
        }
        stages = Array.isArray(stages) ? stages.filter(Boolean) : ["prefix"];
        const handler = entry.handler || entry.type || id;
        normalized.push({
            id,
            prefixes,
            stages,
            handler,
            applyToNouns: entry.applyToNouns !== false,
            applyToVerbs: entry.applyToVerbs !== false,
            enabled: entry.enabled !== false,
        });
    });
    return normalized;
}
function applyStaticDirectionalRules(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    const rules = Array.isArray(data.rules) ? data.rules : null;
    if (!rules) {
        return;
    }
    const normalized = normalizeDirectionalRules(rules);
    DIRECTIONAL_RULES = normalized.length ? normalized : DEFAULT_DIRECTIONAL_RULES;
}
async function loadStaticDirectionalRules() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_DIRECTIONAL_RULES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_DIRECTIONAL_RULES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticDirectionalRules(data);
        return true;
    } catch (error) {
        console.warn("Static directional rules not loaded.", error);
        return false;
    }
}
function applyStaticAllomorphyRules(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    const supportive = data.supportive && typeof data.supportive === "object"
        ? data.supportive
        : null;
    if (supportive && Array.isArray(supportive.keepSlashPrefixes)) {
        SUPPORTIVE_I_KEEP_SLASH_PREFIXES = new Set(
            supportive.keepSlashPrefixes.filter(Boolean)
        );
        SUPPORTIVE_I_KEEP_SLASH_PREFIXES_LOADED = true;
    }
    const patientivoPerfectivo = data.patientivoPerfectivo && typeof data.patientivoPerfectivo === "object"
        ? data.patientivoPerfectivo
        : null;
    if (patientivoPerfectivo) {
        if (Array.isArray(patientivoPerfectivo.allowedFinals)) {
            PATIENTIVO_PERFECTIVO_ALLOWED_FINALS = new Set(
                patientivoPerfectivo.allowedFinals.filter(Boolean)
            );
        }
        if (Array.isArray(patientivoPerfectivo.allowedFinalsClassC)) {
            PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_C = new Set(
                patientivoPerfectivo.allowedFinalsClassC.filter(Boolean)
            );
        }
        if (Array.isArray(patientivoPerfectivo.allowedFinalsClassD)) {
            PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_D = new Set(
                patientivoPerfectivo.allowedFinalsClassD.filter(Boolean)
            );
        }
    }
}
async function loadStaticAllomorphyRules() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_ALLOMORPHY_RULES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_ALLOMORPHY_RULES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticAllomorphyRules(data);
        return true;
    } catch (error) {
        console.warn("Static allomorphy rules not loaded.", error);
        return false;
    }
}
function applyStaticPhonology(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.directionalPrefixes)) {
        DIRECTIONAL_PREFIXES = [...data.directionalPrefixes];
    }
    if (Array.isArray(data.iaUaSuffixes)) {
        IA_UA_SUFFIXES = [...data.iaUaSuffixes];
    }
    if (Array.isArray(data.anPrefixVowelPrefixes)) {
        AN_PREFIX_VOWEL_PREFIXES = [...data.anPrefixVowelPrefixes];
    }
    if (typeof data.vowels === "string") {
        VOWELS = data.vowels;
        VOWEL_RE = new RegExp(`[${VOWELS}]`);
        VOWEL_START_RE = new RegExp(`^[${VOWELS}]`);
        VOWEL_END_RE = new RegExp(`[${VOWELS}]$`);
        VALID_VOWEL_SET = new Set(VOWELS.split(""));
    }
    if (Array.isArray(data.validConsonants)) {
        VALID_CONSONANTS = new Set(data.validConsonants);
    }
    if (Array.isArray(data.digraphs)) {
        DIGRAPHS = [...data.digraphs];
        DIGRAPH_SET = new Set(DIGRAPHS);
    }
    if (Array.isArray(data.syllableForms)) {
        SYLLABLE_FORMS = [...data.syllableForms];
        SYLLABLE_FORM_SET = new Set(SYLLABLE_FORMS);
    }
}
async function loadStaticPhonology() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_PHONOLOGY_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_PHONOLOGY_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticPhonology(data);
        return true;
    } catch (error) {
        console.warn("Static phonology not loaded.", error);
        return false;
    }
}
function applyStaticModes(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    const normalizeModeMap = (map) => {
        if (!map || typeof map !== "object") {
            return {};
        }
        const normalized = {};
        Object.entries(map).forEach(([key, value]) => {
            if (value && typeof value === "object") {
                normalized[key] = value.value || value.labelEs || value.labelNa || key;
            } else {
                normalized[key] = value;
            }
        });
        return normalized;
    };
    const normalizeRouteProfileMap = (map) => {
        if (!map || typeof map !== "object") {
            return {};
        }
        const normalized = {};
        Object.entries(map).forEach(([key, value]) => {
            if (!value || typeof value !== "object") {
                return;
            }
            const hasLegacyTenseValue = Object.prototype.hasOwnProperty.call(value, "legacyTenseValue");
            normalized[key] = {
                ...value,
                legacyTenseValue: hasLegacyTenseValue
                    ? (value.legacyTenseValue || "")
                    : key,
                stations: Array.isArray(value.stations)
                    ? value.stations
                        .filter((station) => station && typeof station === "object")
                        .map((station) => ({ ...station }))
                    : [],
            };
        });
        return normalized;
    };
    if (data.voiceMode && typeof data.voiceMode === "object") {
        VOICE_MODE = normalizeModeMap(data.voiceMode);
    }
    if (data.derivationMode && typeof data.derivationMode === "object") {
        DERIVATION_MODE = normalizeModeMap(data.derivationMode);
    }
    if (data.combinedMode && typeof data.combinedMode === "object") {
        COMBINED_MODE = normalizeModeMap(data.combinedMode);
    }
    if (data.instrumentivoMode && typeof data.instrumentivoMode === "object") {
        INSTRUMENTIVO_MODE = normalizeModeMap(data.instrumentivoMode);
    }
    if (data.tenseMode && typeof data.tenseMode === "object") {
        TENSE_MODE = normalizeModeMap(data.tenseMode);
    }
    if (data.tenseModeSystem && typeof data.tenseModeSystem === "object") {
        TENSE_MODE_SYSTEM = normalizeModeMap(data.tenseModeSystem);
    }
    if (data.nawatTenseMode && typeof data.nawatTenseMode === "object") {
        NAWAT_TENSE_MODE = normalizeModeMap(data.nawatTenseMode);
    }
    if (data.nawatRouteProfiles && typeof data.nawatRouteProfiles === "object") {
        NAWAT_ROUTE_PROFILES = normalizeRouteProfileMap(data.nawatRouteProfiles);
    }
    if (data.conjugationGroups && typeof data.conjugationGroups === "object") {
        CONJUGATION_GROUPS = normalizeModeMap(data.conjugationGroups);
    }
    if (!VoiceModeState.mode && VOICE_MODE.active) {
        VoiceModeState.mode = VOICE_MODE.active;
    }
    if (!DerivationModeState.mode && DERIVATION_MODE.active) {
        DerivationModeState.mode = DERIVATION_MODE.active;
    }
    if (!InstrumentivoModeState.mode && INSTRUMENTIVO_MODE.absolutivo) {
        InstrumentivoModeState.mode = INSTRUMENTIVO_MODE.absolutivo;
    }
    if (!TenseModeState.mode && TENSE_MODE.verbo) {
        TenseModeState.mode = TENSE_MODE.verbo;
    }
    if (!EuropeanTenseModeState.mode && TENSE_MODE.verbo) {
        EuropeanTenseModeState.mode = TENSE_MODE.verbo;
    }
    if (!NawatTenseModeState.mode && (NAWAT_TENSE_MODE.verbo || TENSE_MODE.verbo)) {
        NawatTenseModeState.mode = NAWAT_TENSE_MODE.verbo || TENSE_MODE.verbo;
    }
    if (!ConjugationGroupState.activeGroup && CONJUGATION_GROUPS.tense) {
        ConjugationGroupState.activeGroup = CONJUGATION_GROUPS.tense;
    }
}
async function loadStaticModes() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_MODES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_MODES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticModes(data);
        return true;
    } catch (error) {
        console.warn("Static modes not loaded.", error);
        return false;
    }
}
function applyStaticNnc(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    ORDINARY_NNC_FIXTURES = Array.isArray(data.ordinaryNncFixtures)
        ? data.ordinaryNncFixtures.map((entry) => ({ ...entry }))
        : [];
}
async function loadStaticNnc() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_NNC_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_NNC_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticNnc(data);
        return true;
    } catch (error) {
        console.warn("Static NNC fixtures not loaded.", error);
        return false;
    }
}
function applyStaticMisc(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.nonanimateNounTenses)) {
        NONANIMATE_NOUN_TENSES = new Set(data.nonanimateNounTenses);
    }
    if (Array.isArray(data.subjectPersonNumberOrder)) {
        SUBJECT_PERSON_NUMBER_ORDER = [...data.subjectPersonNumberOrder];
    }
    if (Array.isArray(data.nonactiveSuffixOrder)) {
        NONACTIVE_SUFFIX_ORDER = [...data.nonactiveSuffixOrder];
    }
}
async function loadStaticMisc() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_MISC_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_MISC_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticMisc(data);
        return true;
    } catch (error) {
        console.warn("Static misc not loaded.", error);
        return false;
    }
}
function applyStaticSuppletives(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.suppletiveKatiForms)) {
        SUPPLETIVE_KATI_FORMS = new Set(data.suppletiveKatiForms);
    }
    if (typeof data.suppletiveKatiImperfective === "string") {
        SUPPLETIVE_KATI_IMPERFECTIVE = data.suppletiveKatiImperfective;
    }
    if (typeof data.suppletiveKatiClassA === "string") {
        SUPPLETIVE_KATI_CLASS_A = data.suppletiveKatiClassA;
    }
    if (typeof data.suppletiveKatiClassD === "string") {
        SUPPLETIVE_KATI_CLASS_D = data.suppletiveKatiClassD;
    }
    if (data.suppletiveKatiClassExclusions && typeof data.suppletiveKatiClassExclusions === "object") {
        SUPPLETIVE_KATI_CLASS_EXCLUSIONS = Object.entries(data.suppletiveKatiClassExclusions).reduce((acc, [tense, classes]) => {
            if (Array.isArray(classes) && classes.length) {
                acc[tense] = new Set(classes);
            }
            return acc;
        }, {});
    }
    if (typeof data.suppletiveKatiNonactive === "string") {
        SUPPLETIVE_KATI_NONACTIVE = data.suppletiveKatiNonactive;
    }
    const yawiData = data.suppletiveYawi && typeof data.suppletiveYawi === "object"
        ? data.suppletiveYawi
        : null;
    if (yawiData) {
        if (Array.isArray(yawiData.forms)) {
            SUPPLETIVE_YAWI_FORMS = new Set(yawiData.forms);
        }
        const yawiCausative = yawiData.causative && typeof yawiData.causative === "object"
            ? yawiData.causative
            : null;
        const yawiTenses = yawiData.tenses && typeof yawiData.tenses === "object"
            ? yawiData.tenses
            : {};
        const yawiPresent = yawiTenses.presente && typeof yawiTenses.presente === "object"
            ? yawiTenses.presente
            : {};
        const yawiImperative = yawiTenses.imperativo && typeof yawiTenses.imperativo === "object"
            ? yawiTenses.imperativo
            : {};
        const yawiHabitual = yawiTenses["presente-habitual"] && typeof yawiTenses["presente-habitual"] === "object"
            ? yawiTenses["presente-habitual"]
            : {};
        const canonical = typeof yawiData.canonical === "string" ? yawiData.canonical : yawiPresent.long;
        const shortForm = typeof yawiData.short === "string" ? yawiData.short : yawiPresent.short;
        const yuVariant = typeof yawiData.yuVariant === "string" ? yawiData.yuVariant : yawiPresent.yuVariant;
        const imperfective = typeof yawiData.imperfective === "string"
            ? yawiData.imperfective
            : yawiHabitual.verb;
        if (typeof canonical === "string") {
            SUPPLETIVE_YAWI_CANONICAL = canonical;
        }
        if (typeof shortForm === "string") {
            SUPPLETIVE_YAWI_SHORT = shortForm;
        }
        if (typeof yuVariant === "string") {
            SUPPLETIVE_YAWI_YU_VARIANT = yuVariant;
        }
        if (typeof imperfective === "string") {
            SUPPLETIVE_YAWI_IMPERFECTIVE = imperfective;
        }
        if (yawiCausative) {
            if (typeof yawiCausative.active === "string") {
                SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE = yawiCausative.active;
            }
            if (typeof yawiCausative.nonactive === "string") {
                SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE = yawiCausative.nonactive;
            }
        }
        if (typeof yawiImperative.long === "string" && !SUPPLETIVE_YAWI_CANONICAL) {
            SUPPLETIVE_YAWI_CANONICAL = yawiImperative.long;
        }
        if (typeof yawiImperative.short === "string" && !SUPPLETIVE_YAWI_SHORT) {
            SUPPLETIVE_YAWI_SHORT = yawiImperative.short;
        }
        if (typeof yawiImperative.yuVariant === "string" && !SUPPLETIVE_YAWI_YU_VARIANT) {
            SUPPLETIVE_YAWI_YU_VARIANT = yawiImperative.yuVariant;
        }
    }
    const witziData = data.suppletiveWitzi && typeof data.suppletiveWitzi === "object"
        ? data.suppletiveWitzi
        : null;
    if (witziData) {
        if (Array.isArray(witziData.forms)) {
            SUPPLETIVE_WITZI_FORMS = new Set(witziData.forms);
        }
        if (typeof witziData.imperfective === "string") {
            SUPPLETIVE_WITZI_IMPERFECTIVE = witziData.imperfective;
        }
        if (typeof witziData.perfective === "string") {
            SUPPLETIVE_WITZI_PERFECTIVE = witziData.perfective;
        }
        const witziTenses = witziData.tenses && typeof witziData.tenses === "object"
            ? witziData.tenses
            : {};
        const witziImperative = witziTenses.imperativo && typeof witziTenses.imperativo === "object"
            ? witziTenses.imperativo
            : {};
        if (typeof witziImperative.verb === "string") {
            SUPPLETIVE_WITZI_IMPERATIVE = witziImperative.verb;
        }
        const witziNonactive = witziData.nonactive && typeof witziData.nonactive === "object"
            ? witziData.nonactive
            : {};
        if (typeof witziNonactive.imperfective === "string") {
            SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE = witziNonactive.imperfective;
        }
        if (typeof witziNonactive.perfective === "string") {
            SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE = witziNonactive.perfective;
        }
        if (typeof witziNonactive.stem === "string") {
            SUPPLETIVE_WITZI_NONACTIVE = witziNonactive.stem;
        } else if (SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE) {
            SUPPLETIVE_WITZI_NONACTIVE = SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE;
        }
        if (Array.isArray(witziNonactive.tenses)) {
            SUPPLETIVE_WITZI_NONACTIVE_TENSES = new Set(witziNonactive.tenses);
        }
    }
    const weyaData = data.suppletiveWeya && typeof data.suppletiveWeya === "object"
        ? data.suppletiveWeya
        : null;
    if (weyaData) {
        if (Array.isArray(weyaData.forms)) {
            SUPPLETIVE_WEYA_FORMS = new Set(weyaData.forms);
        }
        if (typeof weyaData.rootPlusYaBase === "string") {
            SUPPLETIVE_WEYA_ROOT = weyaData.rootPlusYaBase;
        }
        if (typeof weyaData.canonical === "string") {
            SUPPLETIVE_WEYA_CANONICAL = weyaData.canonical;
        }
    }
}
async function loadStaticSuppletives() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_SUPPLETIVES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_SUPPLETIVES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticSuppletives(data);
        return true;
    } catch (error) {
        console.warn("Static suppletives not loaded.", error);
        return false;
    }
}
function applyStaticRedup(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    if (Array.isArray(data.redupPrefixForms)) {
        REDUP_PREFIX_FORMS = new Set(data.redupPrefixForms);
    }
}
async function loadStaticRedup() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_REDUP_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_REDUP_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticRedup(data);
        return true;
    } catch (error) {
        console.warn("Static redup not loaded.", error);
        return false;
    }
}
function applyStaticSuppletivePaths(data) {
    if (!data || typeof data !== "object" || !Array.isArray(data.paths)) {
        SUPPLETIVE_STEM_PATHS = [];
        return;
    }
    const valueLookup = {
        suppletiveKatiNonactive: () => SUPPLETIVE_KATI_NONACTIVE,
        suppletiveWitziNonactive: () => SUPPLETIVE_WITZI_NONACTIVE,
        suppletiveWitziNonactiveImperfective: () => SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE,
        suppletiveWitziNonactivePerfective: () => SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE || SUPPLETIVE_WITZI_NONACTIVE,
        suppletiveWitziImperative: () => SUPPLETIVE_WITZI_IMPERATIVE,
    };
    const setLookup = {
        suppletiveKatiForms: () => SUPPLETIVE_KATI_FORMS,
        suppletiveWeyaForms: () => SUPPLETIVE_WEYA_FORMS,
        suppletiveYawiForms: () => SUPPLETIVE_YAWI_FORMS,
        suppletiveWitziForms: () => SUPPLETIVE_WITZI_FORMS,
    };
    const activeBuilders = {
        suppletiveKati: buildSuppletiveKatiStemSet,
        suppletiveWeya: buildSuppletiveWeyaStemSet,
        suppletiveYawi: buildSuppletiveYawiStemSet,
        suppletiveWitzi: buildSuppletiveWitziStemSet,
    };
    const resolveValueKey = (key) => (valueLookup[key] ? valueLookup[key]() : "");
    const resolveStem = (entry) => {
        if (!entry || typeof entry !== "object") {
            return "";
        }
        if (entry.stemKey) {
            return resolveValueKey(entry.stemKey);
        }
        return typeof entry.stem === "string" ? entry.stem : "";
    };
    const resolveVerbOverride = (value) => {
        if (!value) {
            return "";
        }
        if (typeof value === "string") {
            return value;
        }
        if (typeof value === "object" && value.valueKey) {
            return resolveValueKey(value.valueKey);
        }
        return "";
    };
    SUPPLETIVE_STEM_PATHS = data.paths.map((entry) => {
        const matchConfig = entry.match || {};
        let match = () => false;
        if (matchConfig.type === "yawi") {
            match = (parsedVerb) => {
                if (!parsedVerb) {
                    return false;
                }
                if (parsedVerb.directionalPrefix && parsedVerb.directionalPrefix !== "wal") {
                    return false;
                }
                const raw = parsedVerb.rawAnalysisVerb || parsedVerb.verb || "";
                return parsedVerb.isYawi || SUPPLETIVE_YAWI_FORMS.has(raw);
            };
        } else if (matchConfig.type === "verbInSet") {
            const formsKey = matchConfig.formsKey;
            match = (parsedVerb) => {
                if (!parsedVerb) {
                    return false;
                }
                const forms = setLookup[formsKey] ? setLookup[formsKey]() : new Set();
                const candidate = parsedVerb.rawAnalysisVerb
                    || parsedVerb.analysisVerb
                    || parsedVerb.verb
                    || "";
                return forms.has(candidate);
            };
        } else if (matchConfig.type === "verbEquals") {
            const target = matchConfig.verb || "";
            match = (parsedVerb) => Boolean(parsedVerb && parsedVerb.verb === target);
        }
        const activeConfig = entry.active || null;
        const active = activeConfig && activeBuilders[activeConfig.type]
            ? (parsedVerb) => activeBuilders[activeConfig.type](parsedVerb)
            : null;
        const nonactiveList = Array.isArray(entry.nonactive)
            ? entry.nonactive.map((item) => ({
                suffix: item.suffix || "",
                stem: resolveStem(item),
                imperfectiveStem: item.imperfectiveStemKey
                    ? resolveValueKey(item.imperfectiveStemKey)
                    : (typeof item.imperfectiveStem === "string" ? item.imperfectiveStem : ""),
                perfectiveStem: item.perfectiveStemKey
                    ? resolveValueKey(item.perfectiveStemKey)
                    : (typeof item.perfectiveStem === "string" ? item.perfectiveStem : ""),
            }))
            : null;
        const verbOverrides = entry.verbOverrides && typeof entry.verbOverrides === "object"
            ? Object.entries(entry.verbOverrides).reduce((acc, [key, value]) => {
                const resolved = resolveVerbOverride(value);
                if (resolved) {
                    acc[key] = resolved;
                }
                return acc;
            }, {})
            : null;
        return {
            id: entry.id || "",
            match,
            active,
            nonactive: nonactiveList,
            activeTenses: Array.isArray(entry.activeTenses) ? new Set(entry.activeTenses) : null,
            tenseSuffixOverrides: entry.tenseSuffixOverrides || null,
            verbOverrides: verbOverrides && Object.keys(verbOverrides).length ? verbOverrides : null,
            nonactiveTenses: Array.isArray(entry.nonactiveTenses) ? new Set(entry.nonactiveTenses) : null,
        };
    }).filter((entry) => entry.id && typeof entry.match === "function");
}
async function loadStaticSuppletivePaths() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_SUPPLETIVE_PATHS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_SUPPLETIVE_PATHS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticSuppletivePaths(data);
        return true;
    } catch (error) {
        console.warn("Static suppletive paths not loaded.", error);
        return false;
    }
}
function applyStaticConstants(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    const makeRegex = (entry) => {
        if (!entry || typeof entry.pattern !== "string") {
            return null;
        }
        const flags = typeof entry.flags === "string" ? entry.flags : "";
        try {
            return new RegExp(entry.pattern, flags);
        } catch (error) {
            console.warn("Invalid regex pattern in static constants.", error);
            return null;
        }
    };
    const markerRe = makeRegex(data.compoundMarkerRe);
    const markerSplitRe = makeRegex(data.compoundMarkerSplitRe);
    const allowedRe = makeRegex(data.compoundAllowedRe);
    if (markerRe) {
        COMPOUND_MARKER_RE = markerRe;
    }
    if (markerSplitRe) {
        COMPOUND_MARKER_SPLIT_RE = markerSplitRe;
    }
    if (allowedRe) {
        COMPOUND_ALLOWED_RE = allowedRe;
    }
    if (typeof data.subjectToggleAll === "string") {
        SUBJECT_TOGGLE_ALL = data.subjectToggleAll;
    }
    if (typeof data.objectToggleAll === "string") {
        OBJECT_TOGGLE_ALL = data.objectToggleAll;
    }
    if (typeof data.uiScaleStorageKey === "string") {
        UI_SCALE_STORAGE_KEY = data.uiScaleStorageKey;
    }
}
async function loadStaticConstants() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_CONSTANTS_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_CONSTANTS_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticConstants(data);
        return true;
    } catch (error) {
        console.warn("Static constants not loaded.", error);
        return false;
    }
}
var PRETERITO_UNIVERSAL_ORDER = [];
var PRETERITO_CLASS_DETAIL_BY_KEY = {};
var CONJUGATION_GROUPS = {};
var UI_SCALE_STORAGE_KEY = "";
var UI_DENSITY_MODE = Object.freeze({
    simple: "simple",
    advanced: "advanced",
});
var UI_DENSITY_STORAGE_KEY = "nawat_ui_density_mode";
var UI_DENSITY_ADVANCED_TENSES = new Set([
    "presente-habitual",
    "imperfecto",
    "pasado-remoto",
]);

// === Runtime State ===
var OriginalLabels = {};
var VerbInputState = {
    lastNonSearchValue: "",
};
var TENSE_MODE_SYSTEM = {};
var NAWAT_TENSE_MODE = {};
var NAWAT_ROUTE_PROFILES = {};
var NawatRouteState = {
    activeRoute: "",
    activeRouteTravelSource: "",
    activePatientivoBranch: "imperfectivo",
    sourceVerb: "",
    sourceObjectPrefix: "",
    sourceStem: "",
    sourceMode: "",
    sourceTenseValue: "",
    sourceCombinedMode: "",
    targetMode: "",
    targetTenseValue: "",
    targetCombinedMode: "",
    targetDerivationMode: "",
    targetVoiceMode: "",
    targetVerb: "",
    targetObjectPrefix: "",
    activePatientivoNominalSuffix: "",
    activeStationKey: "",
    activeStationInput: "",
    activeStationVerb: "",
    activeStationMode: "",
    activeStationTenseValue: "",
    activeStationObjectPrefix: "",
    activeNawatLineStationKey: "",
    activeLocativeSourceVerb: "",
    activeLocativeSourceTenseValue: "",
    activeLocativeSourceSurface: "",
    activeLocativePatientivoSurface: "",
    activeLocativeIncorporatedRoot: "",
    activeLocativeMatrixRoot: "",
    activeLocativePrelocativeVerb: "",
};
var VERB_INPUT_REFRESH_DEBOUNCE_MS = 90;
var VerbInputRefreshTimer = null;
var VerbInputRefreshPendingValue = "";
var VerbInputRefreshPendingSource = "typing";
var TOGGLE_AVAILABILITY_IDLE_MS = 140;
var ToggleAvailabilityIdleTimer = null;
var VerbRenderContext = "default";
var PreteritoUniversalAvailabilityCache = [];
var SILENT_GENERATION_CACHE_LIMIT = 2000;
var SilentGenerationCache = new Map();
var VerbDisambiguationState = {
    suggestions: [],
    patterns: [],
};
var VERB_DISAMBIGUATION_LIMIT = 3;
var VERB_DISAMBIGUATION_LONG_SYLLABLES = 4;
var VERB_DISAMBIGUATION_LONG_LETTERS = 9;
var NonactiveTabsDomSignature = "";
var TenseTabsDomSignature = "";
var VerbDisambiguationBaseInfo = new Map();
var BASIC_DATA_CANONICAL_MAP = new Map();
var UiDensityGrammarSnapshot = null;
var ObjectToggleState = new Map();
var PossessorToggleState = new Map();
var SubjectToggleState = new Map();
var PatientivoOwnershipState = new Map();
var PatientivoNominalSuffixState = new Map();
var PATIENTIVO_OWNERSHIP_OPTIONS = [
    { id: "w", label: "w/wan", title: "adventicio" },
    { id: "yu", label: "yu/yuwan", title: "organico" },
    { id: "zero", label: "Ø/wan", title: "cero" },
];
var PATIENTIVO_NOMINAL_SUFFIX_OPTIONS = [
    { id: "zero", label: "-Ø", title: "-Ø" },
    { id: "t", label: "-t", title: "-t" },
    { id: "ti", label: "-ti", title: "-ti" },
    { id: "in", label: "-in", title: "-in" },
];
var DEFAULT_PATIENTIVO_OWNERSHIP = "w";
var VoiceModeState = {
    mode: null,
};
var DerivationModeState = {
    mode: null,
};
var DerivationTypeState = {
    type: DERIVATION_TYPE.direct,
};
var CAUSATIVE_SUBTYPE = Object.freeze({
    all: "all",
    one: "one",
    two: "two",
});
var CausativeSubtypeState = {
    subtype: CAUSATIVE_SUBTYPE.all,
};
var NonactiveSuffixState = {
    selected: null,
};
var InstrumentivoModeState = {
    mode: null,
};
var EuropeanTenseModeState = {
    mode: null,
};
var NawatTenseModeState = {
    mode: null,
};
var TenseModeState = {
    mode: null,
};
var OrdinaryNncGenerationState = {
    enabled: false,
    state: "absolutive",
    number: "singular",
    pluralType: "auto",
    subjectPrefix: "",
    subjectSuffix: "",
    subjectKey: "3sg",
    possessor: "",
    nounClass: "",
    animacy: "inanimate",
};
var TenseTabsState = {
    selected: null,
};
var PreteritoUniversalTabsState = {
    selected: null,
};
var VERB_SOURCE_SCOPE = Object.freeze({
    both: "both",
    active: "active",
    nonactive: "nonactive",
});
var VerbSourceScopeState = {
    scope: VERB_SOURCE_SCOPE.both,
};
var ConjugationGroupState = {
    activeGroup: null,
};
var VerbUnifiedOutputState = {
    rows: [],
    bySourceKey: new Map(),
    grouped: new Map(),
    updatedAt: 0,
};
var ClassFilterState = {
    activeClass: null,
};
var DefaultToggleApplied = new Set();
var TOGGLE_LOCK_STORAGE_KEY = "nawat_toggle_lock_mode";
var ToggleLockState = {
    enabled: false,
};
var ToggleLockValueState = {
    object: new Map(),
    subject: new Map(),
    possessor: new Map(),
    patientivoOwnership: new Map(),
    patientivoNominalSuffix: new Map(),
    sourceScope: "",
};

// Toggle lock pure functions extracted to src/ui/state.js

function updateToggleLockControlState() {
    const lockButton = document.getElementById("calc-toggle-lock-button");
    if (!lockButton) {
        return;
    }
    const isLocked = isToggleLockEnabled();
    lockButton.classList.toggle("is-active", isLocked);
    lockButton.classList.toggle("is-lock", isLocked);
    lockButton.setAttribute("aria-pressed", String(isLocked));
    const labelNode = lockButton.querySelector(".panel-action-button__label");
    if (labelNode) {
        labelNode.textContent = isLocked ? "Bloqueado" : "Desbloqueado";
    } else {
        lockButton.textContent = isLocked ? "Bloqueado" : "Desbloqueado";
    }
    lockButton.title = isLocked ? "Desbloquear toggles" : "Bloquear toggles";
}

function rerenderAfterToggleLockChange() {
    updateCombinedModeTabs();
    updateTenseModeTabs();
    if (typeof syncVerbSourceScopeControl === "function") {
        syncVerbSourceScopeControl();
    }
    renderTenseTabs();
    const verbMeta = getVerbInputMeta();
    renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
    });
}

function setToggleLockEnabled(
    enabled = false,
    { resetToDefaults = false, persist = true, refreshUi = false } = {}
) {
    const nextEnabled = Boolean(enabled);
    const previousEnabled = isToggleLockEnabled();
    if (previousEnabled !== nextEnabled) {
        ToggleLockState.enabled = nextEnabled;
        if (nextEnabled) {
            seedToggleLockValueStateFromCurrentMaps();
        } else {
            clearToggleLockValueState();
            if (resetToDefaults) {
                clearAllToggleStateMaps({ resetNonactiveSuffix: true, resetSourceScope: true });
            }
        }
    } else if (!nextEnabled && resetToDefaults) {
        clearAllToggleStateMaps({ resetNonactiveSuffix: true, resetSourceScope: true });
    }
    if (persist) {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(TOGGLE_LOCK_STORAGE_KEY, nextEnabled ? "1" : "0");
            }
        } catch {
            // Ignore storage failures.
        }
    }
    updateToggleLockControlState();
    if (refreshUi) {
        rerenderAfterToggleLockChange();
    }
}

function initToggleLockControl() {
    const lockButton = document.getElementById("calc-toggle-lock-button");
    if (!lockButton) {
        return;
    }
    let shouldEnable = false;
    try {
        shouldEnable = window.localStorage
            ? localStorage.getItem(TOGGLE_LOCK_STORAGE_KEY) === "1"
            : false;
    } catch {
        shouldEnable = false;
    }
    setToggleLockEnabled(shouldEnable, { persist: false, refreshUi: false });
    lockButton.addEventListener("click", () => {
        const nextEnabled = !isToggleLockEnabled();
        setToggleLockEnabled(nextEnabled, {
            resetToDefaults: !nextEnabled,
            persist: true,
            refreshUi: true,
        });
    });
    updateToggleLockControlState();
}

// applyDefaultToggleStateOnce extracted to src/ui/state.js

// === Lookup Helpers ===
// Extracted to src/core/agreement/agreement.js
// === Browser & DOM Helpers ===
function setBrowserClasses() {
    if (typeof navigator === "undefined" || typeof document === "undefined") {
        return;
    }
    const ua = navigator.userAgent || "";
    const isSafari = /safari/i.test(ua) && !/chrome|crios|android|edg|opr|fxios/i.test(ua);
    if (isSafari) {
        document.documentElement.classList.add("is-safari");
    }
}

// === Syllable & Phonology ===
// Extracted to src/core/phonology/phonology.js

// === Person & Agreement ===
// Extracted to src/core/agreement/agreement.js

// === Nonactive Derivation ===
// Extracted to src/core/agreement/agreement.js

// === Nonspecific Object Allomorphy ===
// Extracted to src/core/vnc/allomorphy.js

// === Object & Label Helpers ===
// Extracted to src/core/agreement/agreement.js
// === Noun Derivations ===
// Extracted to src/core/nnc/nnc.js


// === Nonactive Labels ===
// Extracted to src/ui/i18n/i18n.js

// === Output Formatting ===
// Extracted to src/core/output/surface.js
// === Input Validation ===
// Extracted to src/core/parsing/parsing.js
// === UI Class Helpers ===
// Extracted to src/ui/panels/panels.js

// === Prefix Selection ===
// Extracted to src/core/agreement/agreement.js
// === Conjugation Utilities ===
// Extracted to src/core/vnc/vnc.js

// === Preterito Universal ===
// Extracted to src/ui/state.js
// === Verb Parsing ===
// Extracted to src/core/parsing/parsing.js
// === Conjugation Search ===
// Pure grammar pipeline extracted to src/core/vnc/vnc.js

function scrollToMatchingConjugationRow(searchText, options = {}) {
    const matchMode = options.matchMode || (options.exact === false ? "contains" : "exact");
    const normalizedSearch = normalizeConjugationSearchText(searchText);
    if (!normalizedSearch) {
        return false;
    }
    const container = document.getElementById("all-tense-conjugations");
    if (!container) {
        return false;
    }
    const rows = container.querySelectorAll(".conjugation-row");
    for (const row of rows) {
        const valueEl = row.querySelector(".conjugation-value");
        if (!valueEl) {
            continue;
        }
        const rawText = valueEl.textContent || "";
        if (!rawText || rawText.trim() === "—") {
            continue;
        }
        const variants = rawText
            .split(/\n/)
            .flatMap((line) => line.split("/"))
            .map((part) => normalizeConjugationSearchText(part))
            .filter(Boolean);
        const matches = variants.some((variant) =>
            matchesSearchVariant(variant, normalizedSearch, matchMode)
        );
        if (matches) {
            row.scrollIntoView({ behavior: "smooth", block: "center" });
            return true;
        }
    }
    return false;
}

function searchAcrossTenseTabs(rawValue, queryInfo) {
    const baseValue = getSearchInputBase(rawValue);
    if (!baseValue) {
        return false;
    }
    const parsedVerb = parseVerbInput(baseValue);
    const displayVerb = parsedVerb.displayVerb;
    if (!displayVerb) {
        return false;
    }
    const objectPrefix = getCurrentObjectPrefix();
    const savedState = {
        mode: getActiveTenseMode(),
        selectionState: buildConjugationSelectionState(),
        combined: getCombinedMode(),
        sourceScope: getVerbSourceScope(),
        nonactiveSuffix: getSelectedNonactiveSuffix(),
        subject: new Map(SubjectToggleState),
        object: new Map(ObjectToggleState),
        possessor: new Map(PossessorToggleState),
        patientivoOwnership: new Map(PatientivoOwnershipState),
        patientivoNominalSuffix: new Map(PatientivoNominalSuffixState),
    };
    const applyTarget = (target) => {
        const resolvedTargetTense = target.tenseValue || "";
        const combinedPlan = target.mode === TENSE_MODE.verbo
            ? getSearchCombinedModePlan()
            : [getCombinedMode()];
        for (const combinedMode of combinedPlan) {
            setCombinedMode(combinedMode);
            if (isNominalTenseMode(target.mode)) {
                setActiveTenseMode(target.mode);
                mutateConjugationSelectionState({
                    tenseMode: target.mode,
                    group: CONJUGATION_GROUPS.tense,
                    tenseValue: resolvedTargetTense,
                    classFilter: null,
                }, {
                    tenseMode: target.mode,
                    availabilityEntries: [],
                });
            } else {
                setActiveTenseMode(TENSE_MODE.verbo);
                mutateConjugationSelectionState({
                    tenseMode: TENSE_MODE.verbo,
                    group: target.group,
                    tenseValue: target.group === CONJUGATION_GROUPS.universal
                        ? getCurrentResolvedConjugationSelectionState({ tenseMode: TENSE_MODE.verbo }).tenseValue
                        : resolvedTargetTense,
                    universalTenseValue: target.group === CONJUGATION_GROUPS.universal
                        ? resolvedTargetTense
                        : getCurrentResolvedConjugationSelectionState({ tenseMode: TENSE_MODE.verbo }).universalTenseValue,
                    classFilter: null,
                }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PreteritoUniversalAvailabilityCache,
                });
            }
            if (isNominalTenseMode(target.mode)) {
                const nounPlans = buildNounSearchPlans({
                    tenseValue: resolvedTargetTense,
                    verbMeta: parsedVerb,
                });
                const possessorPlan = getSearchPossessorPlan(resolvedTargetTense);
                const nounObjectPlans = Array.isArray(nounPlans.objectSlotPlans) && nounPlans.objectSlotPlans.length
                    ? nounPlans.objectSlotPlans
                    : [{
                        slotId: "object",
                        objectStateKey: nounPlans.objectStateKey,
                        options: nounPlans.objectPlan,
                    }];
                const iterateNounObjectSelections = (planIndex, selectionsBySlot, onSelection) => {
                    if (planIndex >= nounObjectPlans.length) {
                        return onSelection(selectionsBySlot);
                    }
                    const plan = nounObjectPlans[planIndex];
                    const values = Array.isArray(plan.options) && plan.options.length
                        ? plan.options
                        : [""];
                    for (const value of values) {
                        const nextSelections = {
                            ...selectionsBySlot,
                            [plan.slotId]: value || "",
                        };
                        if (iterateNounObjectSelections(planIndex + 1, nextSelections, onSelection)) {
                            return true;
                        }
                    }
                    return false;
                };
                for (const possessor of possessorPlan) {
                    PossessorToggleState.set(getNounPossessorKey(resolvedTargetTense), possessor);
                    for (const subjectId of nounPlans.subjectPlan) {
                        SubjectToggleState.set(nounPlans.subjectKey, subjectId);
                        if (iterateNounObjectSelections(0, {}, (selectionBySlot) => {
                            nounObjectPlans.forEach((plan) => {
                                const value = selectionBySlot[plan.slotId] || "";
                                ObjectToggleState.set(plan.objectStateKey, value);
                            });
                            const primaryObjectPrefix = selectionBySlot.object || "";
                            renderActiveConjugations({
                                verb: displayVerb,
                                objectPrefix: primaryObjectPrefix,
                                onlyTense: resolvedTargetTense,
                                tense: resolvedTargetTense,
                            });
                            if (scrollToMatchingConjugationRow(queryInfo.term, { matchMode: queryInfo.mode })) {
                                renderTenseTabs();
                                return true;
                            }
                            return false;
                        })) {
                            return true;
                        }
                    }
                }
                continue;
            }
            const isNonactive = combinedMode === COMBINED_MODE.nonactive;
            const verbPlans = buildVerbSearchPlans({
                tenseValue: resolvedTargetTense,
                group: target.group,
                isNonactive,
                verbMeta: parsedVerb,
            });
            const suffixPlan = isNonactive ? getSearchNonactiveSuffixPlan(parsedVerb) : [null];
            const baseObjectSelections = new Map(
                verbPlans.objectPlans.map((plan) => [plan.objectStateKey, plan.base])
            );
            for (const suffix of suffixPlan) {
                if (suffix !== null) {
                    setSelectedNonactiveSuffix(suffix);
                }
                for (const subjectId of verbPlans.subjectPlan) {
                    verbPlans.subjectKeys.forEach((subjectKey) => {
                        SubjectToggleState.set(subjectKey, subjectId);
                    });
                    for (const objectPlan of verbPlans.objectPlans) {
                        baseObjectSelections.forEach((value, key) => {
                            ObjectToggleState.set(key, value);
                        });
                        for (const objectPrefix of objectPlan.options) {
                            ObjectToggleState.set(objectPlan.objectStateKey, objectPrefix);
                            renderActiveConjugations({
                                verb: displayVerb,
                                objectPrefix,
                                onlyTense: resolvedTargetTense,
                                tense: resolvedTargetTense,
                            });
                            if (scrollToMatchingConjugationRow(queryInfo.term, { matchMode: queryInfo.mode })) {
                                renderTenseTabs();
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    const restoreState = () => {
        setCombinedMode(savedState.combined);
        setVerbSourceScope(savedState.sourceScope, { syncCombinedMode: false });
        setActiveTenseMode(savedState.mode);
        setSelectedNonactiveSuffix(savedState.nonactiveSuffix);
        SubjectToggleState.clear();
        ObjectToggleState.clear();
        PossessorToggleState.clear();
        PatientivoOwnershipState.clear();
        PatientivoNominalSuffixState.clear();
        savedState.subject.forEach((value, key) => SubjectToggleState.set(key, value));
        savedState.object.forEach((value, key) => ObjectToggleState.set(key, value));
        savedState.possessor.forEach((value, key) => PossessorToggleState.set(key, value));
        savedState.patientivoOwnership.forEach((value, key) => PatientivoOwnershipState.set(key, value));
        savedState.patientivoNominalSuffix.forEach((value, key) => PatientivoNominalSuffixState.set(key, value));
        renderTenseTabs();
        applyConjugationSelectionState(savedState.selectionState, {
            tenseMode: savedState.mode,
            availabilityEntries: PreteritoUniversalAvailabilityCache,
        });
        renderTenseTabs();
        const restoredSelectionState = buildConjugationSelectionState({ tenseMode: savedState.mode });
        renderActiveConjugations({
            verb: displayVerb,
            objectPrefix,
            tense: restoredSelectionState.group === CONJUGATION_GROUPS.universal
                ? restoredSelectionState.universalTenseValue
                : restoredSelectionState.tenseValue,
        });
    };
    const plan = buildSearchPlanAcrossModes();
    for (const target of plan) {
        if (applyTarget(target)) {
            return true;
        }
    }
    restoreState();
    return false;
}

function maybeAutoScrollToConjugationRow(rawValue, options = {}) {
    const allowSwitch = options.allowSwitch !== false;
    if (!rawValue) {
        return;
    }
    const queryInfo = getSearchQueryInfo(rawValue);
    if (queryInfo) {
        if (scrollToMatchingConjugationRow(queryInfo.term, { matchMode: queryInfo.mode })) {
            return;
        }
        if (allowSwitch) {
            searchAcrossTenseTabs(rawValue, queryInfo);
        }
        return;
    }
}

// === Verb Composer ===
// Extracted to src/ui/composer/composer.js

// === Verb Input & Lexicon ===
// Extracted to src/ui/composer/composer.js

// === Verb Disambiguation ===
// Extracted to src/core/parsing/parsing.js

// === CSV Export ===
// Extracted to src/ui/export/export.js

// === UI Panels & Tabs ===
// Extracted to src/ui/panels/panels.js

// === Toggle Options & State ===
// Extracted to src/ui/state.js

// === Mode State Accessors ===
// Extracted to src/ui/state.js

// === Localization ===
// Extracted to src/ui/i18n/i18n.js

// === Morphology & Generation ===
// Extracted to src/core/vnc/vnc.js

// === Output Rendering ===
// Extracted to src/ui/rendering/rendering.js


// === Event Wiring ===
// Extracted to src/ui/events.js
