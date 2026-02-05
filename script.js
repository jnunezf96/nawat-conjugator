// === Configuration ===
let SPECIFIC_VALENCE_PREFIXES = [];
let NONSPECIFIC_VALENCE_PREFIXES = [];
let NONSPECIFIC_VALENCE_AFFIXES = [];
let SPECIFIC_VALENCE_PREFIX_SET = new Set();
let NONSPECIFIC_VALENCE_AFFIX_SET = new Set();
let VALENCE_CATEGORY_LABELS = {};
let OBJECT_PREFIXES = [];
let OBJECT_PREFIX_LABELS = new Map();
let OBJECT_PREFIX_GROUPS = [];
let INVALID_COMBINATION_KEYS = new Set();
let TENSE_SUFFIX_RULES = {};
let PRET_UNIVERSAL_CLASS_BY_TENSE = {};
let PRETERITO_CLASS_TENSES = new Set();
let NONSPECIFIC_I_DROP_VERBS = [];
let DIRECTIONAL_PREFIXES = [];
let IA_UA_SUFFIXES = [];
let AN_PREFIX_VOWEL_PREFIXES = [];
let VOWELS = "";
let VOWEL_RE = /[aeiu]/;
let VOWEL_START_RE = /^[aeiu]/;
let VOWEL_END_RE = /[aeiu]$/;
let VALID_VOWEL_SET = new Set();
let VALID_CONSONANTS = new Set();
let DIGRAPHS = [];
let DIGRAPH_SET = new Set();
let SYLLABLE_FORMS = [];
let SYLLABLE_FORM_SET = new Set();
let REDUP_PREFIX_FORMS = new Set();
let COMPOUND_MARKER_RE = null;
let COMPOUND_MARKER_SPLIT_RE = null;
let COMPOUND_ALLOWED_RE = null;
let PARSE_PIPELINE = [];
let DIRECTIONAL_RULES = [];
let SUPPORTIVE_I_KEEP_SLASH_PREFIXES = new Set();
let SUPPORTIVE_I_KEEP_SLASH_PREFIXES_LOADED = false;
let PATIENTIVO_PERFECTIVO_ALLOWED_FINALS = new Set();
let PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_C = new Set();
let PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_D = new Set();
const OPTIONAL_SUPPORTIVE_I_MARKER = "(i)";
const OPTIONAL_SUPPORTIVE_I_RE = /\(i\)/g;
let DERIVATIONAL_RULES = {};
let DERIVATIONAL_RULES_DOCS = {};
let VALENCE_NEUTRAL_RULES = {};
let OBJECT_MARKERS = new Set();
let FUSION_PREFIXES = new Set();
let NONANIMATE_NOUN_TENSES = new Set();
let SUBJECT_COMBINATIONS = [];
let SUBJECT_PERSON_GROUPS = [];
let SUBJECT_PERSON_NUMBER_ORDER = [];
let SUBJECT_TOGGLE_ALL = "";
let OBJECT_TOGGLE_ALL = "";
let SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = new Set();
let SUSTANTIVO_VERBAL_PREFIXES = [""];
let POSSESSIVE_PREFIXES = [];
let POSSESSIVE_PREFIX_LABELS = new Map();
let POSSESSOR_LABELS = {};
let POSSESSIVE_TO_OBJECT_PREFIX = {};
let OBJECT_LABELS = {};
let OBJECT_ROLE_LABELS = {};
let NOUN_OBJECT_LABELS = {};
let VERB_BLOCK_LABELS = {};
let NONACTIVE_GENERIC_LABELS = {};
let NONACTIVE_PERSON_SUB_LABELS = {};
let NONACTIVE_PERSON_CATEGORY_LABELS = {};
let PERSON_GROUP_LABELS = {};
let PERSON_SUB_LABELS = {};
let TOGGLE_LABELS = {};
let PLACEHOLDER_LABELS = {};
let PATIENTIVO_OWNERSHIP_LABELS = {};
let NUMBER_LABELS = {
    singular: { es: "singular", na: "isel" },
    plural: { es: "plural", na: "imiaka" },
};
let VOICE_MODE = {};
let PASSIVE_IMPERSONAL_SUBJECT_MAP = {};
let PASSIVE_IMPERSONAL_DIRECT_OBJECTS = new Set();
let DERIVATION_MODE = {};
let NONACTIVE_SUFFIX_ORDER = ["lu", "u", "wa", "luwa", "uwa", "walu"];
let NONACTIVE_SUFFIX_LABELS = {};
let NONACTIVE_SUFFIX_DESCRIPTIONS = {};
let NONACTIVE_PREFIX_LABEL = { labelEs: "no activo", labelNa: "te muselia" };
let COMBINED_MODE = {};
let INSTRUMENTIVO_MODE = {};
let TENSE_MODE = {};
let TENSE_ORDER = [];
let TENSE_LABELS = {};
let UI_LABELS = {};
const STATIC_LABELS_PATH = "data/static_labels.json";
const STATIC_OPTIONS_PATH = "data/static_options.json";
const STATIC_GROUPS_PATH = "data/static_groups.json";
const STATIC_ORDERS_PATH = "data/static_orders.json";
const STATIC_RULES_PATH = "data/static_rules.json";
const STATIC_PHONOLOGY_PATH = "data/static_phonology.json";
const STATIC_MODES_PATH = "data/static_modes.json";
const STATIC_MISC_PATH = "data/static_misc.json";
const STATIC_SUPPLETIVES_PATH = "data/static_suppletives.json";
const STATIC_REDUP_PATH = "data/static_redup.json";
const STATIC_SUPPLETIVE_PATHS_PATH = "data/static_suppletive_paths.json";
const STATIC_CONSTANTS_PATH = "data/static_constants.json";
const STATIC_PARSE_RULES_PATH = "data/static_parse_rules.json";
const STATIC_DIRECTIONAL_RULES_PATH = "data/static_directional_rules.json";
const STATIC_ALLOMORPHY_RULES_PATH = "data/static_allomorphy_rules.json";
const STATIC_PARSE_TESTS_PATH = "data/static_parse_tests.json";
const STATIC_DERIVATIONAL_RULES_PATH = "data/static_derivational_rules.json";
const STATIC_VALENCE_NEUTRAL_PATH = "data/static_valence_neutral.json";
let TENSE_DESCRIPTIONS = {};
const DERIVATION_TYPE = {
    direct: "direct",
    causative: "causative",
    applicative: "applicative",
};
const mergeLabelMap = (base, override) => (
    override && typeof override === "object" ? { ...base, ...override } : base
);
const mergeNumberLabels = (base, override) => {
    if (!override || typeof override !== "object") {
        return base;
    }
    const next = { ...base };
    Object.entries(override).forEach(([key, labels]) => {
        if (!labels || typeof labels !== "object") {
            return;
        }
        next[key] = { ...(base[key] || {}), ...labels };
    });
    return next;
};
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
        return;
    }
    DERIVATIONAL_RULES = { ...data };
    DERIVATIONAL_RULES_DOCS = {};
}

function applyStaticValenceNeutral(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    VALENCE_NEUTRAL_RULES = { ...data };
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
let TENSE_LINGUISTIC_GROUPS = {
    verbo: { left: [], right: [] },
    sustantivo: { left: [], right: [] },
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
    if (!TENSE_TABS_STATE.selected || !TENSE_ORDER.includes(TENSE_TABS_STATE.selected)) {
        TENSE_TABS_STATE.selected = TENSE_ORDER[0] || null;
    }
    if (
        !PRETERITO_UNIVERSAL_TABS_STATE.selected
        || !PRETERITO_UNIVERSAL_ORDER.includes(PRETERITO_UNIVERSAL_TABS_STATE.selected)
    ) {
        PRETERITO_UNIVERSAL_TABS_STATE.selected = PRETERITO_UNIVERSAL_ORDER[0] || null;
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
function applyStaticParseRules(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    const pipeline = Array.isArray(data.pipeline)
        ? data.pipeline
        : (Array.isArray(data.stages) ? data.stages : null);
    if (!pipeline) {
        return;
    }
    const normalized = normalizeParsePipeline(pipeline);
    if (normalized.length) {
        PARSE_PIPELINE = normalized;
    }
}
async function loadStaticParseRules() {
    if (typeof fetch !== "function") {
        return false;
    }
    try {
        const response = await fetch(STATIC_PARSE_RULES_PATH, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${STATIC_PARSE_RULES_PATH}: ${response.status}`);
        }
        const data = await response.json();
        applyStaticParseRules(data);
        return true;
    } catch (error) {
        console.warn("Static parse rules not loaded.", error);
        return false;
    }
}
const DEFAULT_DIRECTIONAL_RULES = [
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
    const supportive = data.supportiveI && typeof data.supportiveI === "object"
        ? data.supportiveI
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
    if (data.conjugationGroups && typeof data.conjugationGroups === "object") {
        CONJUGATION_GROUPS = normalizeModeMap(data.conjugationGroups);
    }
    if (!VOICE_MODE_STATE.mode && VOICE_MODE.active) {
        VOICE_MODE_STATE.mode = VOICE_MODE.active;
    }
    if (!DERIVATION_MODE_STATE.mode && DERIVATION_MODE.active) {
        DERIVATION_MODE_STATE.mode = DERIVATION_MODE.active;
    }
    if (!INSTRUMENTIVO_MODE_STATE.mode && INSTRUMENTIVO_MODE.absolutivo) {
        INSTRUMENTIVO_MODE_STATE.mode = INSTRUMENTIVO_MODE.absolutivo;
    }
    if (!TENSE_MODE_STATE.mode && TENSE_MODE.verbo) {
        TENSE_MODE_STATE.mode = TENSE_MODE.verbo;
    }
    if (!CONJUGATION_GROUP_STATE.activeGroup && CONJUGATION_GROUPS.tense) {
        CONJUGATION_GROUP_STATE.activeGroup = CONJUGATION_GROUPS.tense;
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
    if (Array.isArray(data.suppletiveYeForms)) {
        SUPPLETIVE_YE_FORMS = new Set(data.suppletiveYeForms);
    }
    if (typeof data.suppletiveYeImperfective === "string") {
        SUPPLETIVE_YE_IMPERFECTIVE = data.suppletiveYeImperfective;
    }
    if (typeof data.suppletiveYeClassA === "string") {
        SUPPLETIVE_YE_CLASS_A = data.suppletiveYeClassA;
    }
    if (typeof data.suppletiveYeClassD === "string") {
        SUPPLETIVE_YE_CLASS_D = data.suppletiveYeClassD;
    }
    if (data.suppletiveYeClassExclusions && typeof data.suppletiveYeClassExclusions === "object") {
        SUPPLETIVE_YE_CLASS_EXCLUSIONS = Object.entries(data.suppletiveYeClassExclusions).reduce((acc, [tense, classes]) => {
            if (Array.isArray(classes) && classes.length) {
                acc[tense] = new Set(classes);
            }
            return acc;
        }, {});
    }
    if (typeof data.suppletiveYeNonactive === "string") {
        SUPPLETIVE_YE_NONACTIVE = data.suppletiveYeNonactive;
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
        if (typeof witziNonactive.stem === "string") {
            SUPPLETIVE_WITZI_NONACTIVE = witziNonactive.stem;
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
        suppletiveYeNonactive: () => SUPPLETIVE_YE_NONACTIVE,
        suppletiveWitziNonactive: () => SUPPLETIVE_WITZI_NONACTIVE,
        suppletiveWitziImperative: () => SUPPLETIVE_WITZI_IMPERATIVE,
    };
    const setLookup = {
        suppletiveYeForms: () => SUPPLETIVE_YE_FORMS,
        suppletiveYawiForms: () => SUPPLETIVE_YAWI_FORMS,
        suppletiveWitziForms: () => SUPPLETIVE_WITZI_FORMS,
    };
    const activeBuilders = {
        suppletiveYe: buildSuppletiveYeStemSet,
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
            ? () => activeBuilders[activeConfig.type]()
            : null;
        const nonactiveList = Array.isArray(entry.nonactive)
            ? entry.nonactive.map((item) => ({
                suffix: item.suffix || "",
                stem: resolveStem(item),
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
    if (Number.isInteger(data.verbSuggestionLimit)) {
        VERB_SUGGESTION_LIMIT = data.verbSuggestionLimit;
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
let PRETERITO_UNIVERSAL_ORDER = [];
let PRETERITO_CLASS_DETAIL_BY_KEY = {};
let CONJUGATION_GROUPS = {};
let VERB_SUGGESTION_LIMIT = 0;
let UI_SCALE_STORAGE_KEY = "";

// === Runtime State ===
var originalLabels = {};
var originalPlaceholder = "";
const VERB_INPUT_STATE = {
    lastNonSearchValue: "",
};
const VERB_SUGGESTION_STATE = {
    items: [],
    activeIndex: -1,
};
const VERB_DISAMBIGUATION_STATE = {
    suggestions: [],
    patterns: [],
};
const VERB_DISAMBIGUATION_LIMIT = 3;
const VERB_DISAMBIGUATION_LONG_SYLLABLES = 4;
const VERB_DISAMBIGUATION_LONG_LETTERS = 9;
let VERB_SUGGESTIONS = [];
let VERB_SUGGESTION_BASE_SET = new Set();
let VERB_SUGGESTION_BASE_INFO = new Map();
let VERB_DISAMBIGUATION_BASE_INFO = new Map();
let BASIC_DATA_CANONICAL_MAP = new Map();
const BULK_EXPORT_HEADERS = [
    "verb",
    "3s applicative",
    "3s applicative nonactive",
];
const BULK_EXPORT_SOURCES = {
    data: { path: "data/data.csv", label: "data.csv" },
    basic: { path: "data/basic data.csv", label: "basic data.csv" },
};
const BULK_EXPORT_STATE = {
    rows: [],
    csvText: "",
    filename: "conjugaciones.csv",
    sourcePath: "",
    sourceKind: "select",
    fileHandle: null,
};
const OBJECT_TOGGLE_STATE = new Map();
const POSSESSOR_TOGGLE_STATE = new Map();
const SUBJECT_TOGGLE_STATE = new Map();
const PATIENTIVO_OWNERSHIP_STATE = new Map();
const PATIENTIVO_OWNERSHIP_OPTIONS = [
    { id: "w", label: "w/wan", title: "adventicio" },
    { id: "yu", label: "yu/yuwan", title: "organico" },
    { id: "zero", label: "Ø/wan", title: "cero" },
];
const DEFAULT_PATIENTIVO_OWNERSHIP = "w";
const VOICE_MODE_STATE = {
    mode: null,
};
const DERIVATION_MODE_STATE = {
    mode: null,
};
const DERIVATION_TYPE_STATE = {
    type: DERIVATION_TYPE.direct,
};
const NONACTIVE_SUFFIX_STATE = {
    selected: null,
};
const INSTRUMENTIVO_MODE_STATE = {
    mode: null,
};
const TENSE_MODE_STATE = {
    mode: null,
};
const TENSE_TABS_STATE = {
    selected: null,
};
const PRETERITO_UNIVERSAL_TABS_STATE = {
    selected: null,
};
const CONJUGATION_GROUP_STATE = {
    activeGroup: null,
};
const CLASS_FILTER_STATE = {
    activeClass: null,
};
const DEFAULT_TOGGLE_APPLIED = new Set();

function applyDefaultToggleStateOnce(map, stateKey, verbKey, value) {
    if (!stateKey || !verbKey) {
        return;
    }
    const appliedKey = `${verbKey}|${stateKey}`;
    if (DEFAULT_TOGGLE_APPLIED.has(appliedKey)) {
        return;
    }
    map.set(stateKey, value);
    DEFAULT_TOGGLE_APPLIED.add(appliedKey);
}

// === Lookup Helpers ===
function getKnownTenseSuffixes() {
    const suffixes = new Set();
    Object.values(TENSE_SUFFIX_RULES).forEach((rules) => {
        Object.values(rules).forEach((suffix) => {
            if (suffix) {
                suffixes.add(String(suffix).toLowerCase());
            }
        });
    });
    return suffixes;
}

function getTransitividadSelection() {
    const parsed = getVerbInputMeta();
    if (getAvailableObjectSlots(parsed) > 0) {
        return "transitivo";
    }
    if (parsed.verb.length > 0) {
        return "intransitivo";
    }
    return "intransitivo";
}

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
function splitVerbLetters(verb) {
    const letters = [];
    for (let i = 0; i < verb.length; i += 1) {
        const pair = verb.slice(i, i + 2);
        if (DIGRAPH_SET.has(pair)) {
            letters.push(pair);
            i += 1;
        } else {
            letters.push(verb[i]);
        }
    }
    return letters;
}

function getVerbLetterCount(verb) {
    return splitVerbLetters(verb).length;
}

function isVerbLetterVowel(letter) {
    return letter.length === 1 && VOWELS.includes(letter);
}

function isVerbLetterConsonant(letter) {
    return !!letter && !isVerbLetterVowel(letter);
}

function createsConsonantClusterAfterFinalDeletion(verb) {
    if (!verb) {
        return false;
    }
    const letters = splitVerbLetters(verb);
    if (letters.length < 3) {
        return false;
    }
    const dropTwo = endsWithAny(verb, IA_UA_SUFFIXES);
    const base = dropTwo ? letters.slice(0, -2) : letters.slice(0, -1);
    if (base.length < 2) {
        return false;
    }
    const last = base[base.length - 1];
    const prev = base[base.length - 2];
    return isVerbLetterConsonant(last) && isVerbLetterConsonant(prev);
}

function startsWithICVCVPattern(verb) {
    const letters = splitVerbLetters(verb);
    if (!letters.length || letters[0] !== "i") {
        return false;
    }
    let index = 1;
    if (letters[index] === "j" || letters[index] === "l") {
        index += 1;
    }
    if (letters.length <= index + 3) {
        return false;
    }
    return isVerbLetterConsonant(letters[index])
        && isVerbLetterVowel(letters[index + 1])
        && isVerbLetterConsonant(letters[index + 2])
        && isVerbLetterVowel(letters[index + 3]);
}

function startsWithACVlPattern(verb) {
    const letters = splitVerbLetters(verb);
    if (letters.length < 4) {
        return false;
    }
    return letters[0] === "a"
        && isVerbLetterConsonant(letters[1])
        && isVerbLetterVowel(letters[2])
        && letters[3] === "l";
}

function startsWithAlPrefix(verb) {
    const letters = splitVerbLetters(verb);
    return letters.length >= 2 && letters[0] === "a" && letters[1] === "l";
}

function getSyllableAnalysisTarget(rawVerb, options = {}) {
    const parsed = parseVerbInput(rawVerb);
    let target = options.analysis ? parsed.analysisVerb : parsed.verb;
    if (!target) {
        return "";
    }
    const lastChar = target.slice(-1);
    const hasFinalVowel = VOWELS.includes(lastChar);
    const isFinalCoda = lastChar === "j" || lastChar === "l";
    if (options.assumeFinalV && !hasFinalVowel && !isFinalCoda) {
        target += "a";
    }
    return target;
}

function splitVerbSyllables(verb) {
    const letters = splitVerbLetters(verb);
    const syllables = [];
    let index = 0;
    while (index < letters.length) {
        const current = letters[index];
        if (isVerbLetterVowel(current)) {
            const next = letters[index + 1];
            if (next === "j" || next === "l") {
                syllables.push({
                    letters: [current, next],
                    form: `V${next}`,
                    onset: "",
                    nucleus: current,
                    coda: next,
                    text: `${current}${next}`,
                });
                index += 2;
            } else {
                syllables.push({
                    letters: [current],
                    form: "V",
                    onset: "",
                    nucleus: current,
                    coda: "",
                    text: `${current}`,
                });
                index += 1;
            }
            continue;
        }
        const next = letters[index + 1];
        if (next && isVerbLetterVowel(next)) {
            const coda = letters[index + 2];
            if (coda === "j" || coda === "l") {
                syllables.push({
                    letters: [current, next, coda],
                    form: `CV${coda}`,
                    onset: current,
                    nucleus: next,
                    coda,
                    text: `${current}${next}${coda}`,
                });
                index += 3;
            } else {
                syllables.push({
                    letters: [current, next],
                    form: "CV",
                    onset: current,
                    nucleus: next,
                    coda: "",
                    text: `${current}${next}`,
                });
                index += 2;
            }
            continue;
        }
        syllables.push({
            letters: [current],
            form: "C",
            onset: current,
            nucleus: "",
            coda: "",
            text: `${current}`,
        });
        index += 1;
    }
    return syllables;
}

function getSyllables(rawVerb, options = {}) {
    const target = getSyllableAnalysisTarget(rawVerb, options);
    if (!target) {
        return [];
    }
    return splitVerbSyllables(target);
}

function getSyllableBaseKey(syllable) {
    if (!syllable || !syllable.nucleus) {
        return "";
    }
    return `${syllable.onset || ""}:${syllable.nucleus}`;
}

function getNonReduplicatedRoot(verb) {
    if (!verb) {
        return verb;
    }
    const syllables = splitVerbSyllables(verb);
    if (syllables.length < 2) {
        return verb;
    }
    for (let i = 0; i < syllables.length - 1; i += 1) {
        const first = syllables[i];
        const second = syllables[i + 1];
        if (!first || !second) {
            continue;
        }
        const isStandardRedup = (
            REDUP_PREFIX_FORMS.has(first.form)
            && second.nucleus
            && isOpenSyllable(second)
            && (first.onset || second.onset)
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
        );
        const isLRedup = (
            second.nucleus
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
            && (
                ((first.form === "V" || first.form === "Vj") && second.form === "Vl")
                || ((first.form === "CV" || first.form === "CVj") && second.form === "CVl")
            )
        );
        if (isStandardRedup || isLRedup) {
            return syllables.slice(i + 1).map((syllable) => syllable.text).join("");
        }
    }
    return verb;
}

function matchesDerivationRuleBaseList(list, ruleBase, fullRuleBase, options = {}) {
    if (!Array.isArray(list) || list.length === 0) {
        return false;
    }
    const has = (value) => Boolean(value && list.includes(value));
    if (has(ruleBase) || has(fullRuleBase)) {
        return true;
    }
    if (options.allowRedup === false) {
        return false;
    }
    const nonRedupRuleBase = getNonReduplicatedRoot(ruleBase);
    if (nonRedupRuleBase && has(nonRedupRuleBase)) {
        return true;
    }
    const nonRedupFull = fullRuleBase ? getNonReduplicatedRoot(fullRuleBase) : "";
    return Boolean(nonRedupFull && has(nonRedupFull));
}

function isOpenSyllable(syllable) {
    return syllable && (syllable.form === "V" || syllable.form === "CV");
}

function isPlainVowelSyllable(syllable) {
    return syllable && syllable.form === "V";
}

function isCVWithOnset(syllable, onset) {
    return syllable && syllable.form === "CV" && syllable.onset === onset;
}

function getTrailingVowelCountFromSyllables(syllables) {
    if (!syllables || syllables.length === 0) {
        return 0;
    }
    const last = syllables[syllables.length - 1];
    if (!last || !last.nucleus || !isOpenSyllable(last)) {
        return 0;
    }
    if (last.form !== "V") {
        return 1;
    }
    const prev = syllables[syllables.length - 2];
    if (prev && isOpenSyllable(prev) && prev.nucleus) {
        return 2;
    }
    return 1;
}

function getTotalVowelCountFromSyllables(syllables) {
    if (!syllables || syllables.length === 0) {
        return 0;
    }
    return syllables.reduce((count, syllable) => count + (syllable.nucleus ? 1 : 0), 0);
}

function endsWithIaUaSyllables(syllables) {
    if (!syllables || syllables.length < 2) {
        return false;
    }
    const last = syllables[syllables.length - 1];
    const prev = syllables[syllables.length - 2];
    if (!last || !prev || last.form !== "V" || !isOpenSyllable(prev)) {
        return false;
    }
    if (last.nucleus !== "a") {
        return false;
    }
    return prev.nucleus === "i" || prev.nucleus === "u";
}

function isItaSyllableSequence(syllables) {
    if (!syllables || syllables.length < 2) {
        return false;
    }
    const last = syllables[syllables.length - 1];
    const itaOnsets = new Set(["t", "d"]);
    if (!last || last.form !== "CV" || !itaOnsets.has(last.onset) || last.nucleus !== "a") {
        return false;
    }
    const penultimate = syllables[syllables.length - 2];
    if (!penultimate || penultimate.nucleus !== "i") {
        return false;
    }
    if (penultimate.form === "V") {
        return true;
    }
    if (penultimate.form !== "CV") {
        return false;
    }
    if (penultimate.onset === "kw") {
        return false;
    }
    if (penultimate.onset === "w") {
        const antepenultimate = syllables[syllables.length - 3];
        if (antepenultimate && antepenultimate.nucleus === "i") {
            return false;
        }
    }
    return true;
}

function isIVerbSyllableSequence(syllables) {
    return (
        syllables &&
        syllables.length === 1 &&
        isPlainVowelSyllable(syllables[0]) &&
        syllables[0].nucleus === "i"
    );
}


function areSyllablesPronounceable(syllables) {
    if (!syllables || syllables.length === 0) {
        return false;
    }
    for (let i = 0; i < syllables.length; i += 1) {
        const syllable = syllables[i];
        const form = syllable.form;
        if (!SYLLABLE_FORM_SET.has(form)) {
            return false;
        }
        if (form === "C" && i > 0) {
            const prev = syllables[i - 1];
            const allowWKCluster = prev
                && prev.form === "C"
                && prev.onset === "w"
                && syllable.onset === "k";
            if (!prev || (!isOpenSyllable(prev) && !allowWKCluster)) {
                return false;
            }
        }
    }
    if (syllables.length >= 2) {
        const last = syllables[syllables.length - 1];
        const prev = syllables[syllables.length - 2];
        const prevHasCoda = prev && (prev.coda === "l" || prev.coda === "j");
        if (prevHasCoda && last.form === "CV" && last.onset === "n") {
            return false;
        }
        if (prevHasCoda && last.form === "CV" && last.onset === "t" && last.nucleus === "a") {
            if (prev.coda === "l") {
                return false;
            }
        }
    }
    return true;
}

function isSyllableSequencePronounceable(rawVerb, options = {}) {
    return areSyllablesPronounceable(getSyllables(rawVerb, options));
}

function shouldCoalesceFinalI(base) {
    const letters = splitVerbLetters(base);
    if (letters.length < 2) {
        return false;
    }
    if (letters[letters.length - 1] !== "i") {
        return false;
    }
    return isVerbLetterVowel(letters[letters.length - 2]);
}

function getRootPlusYaBase(verb, options = {}) {
    if (!verb || !verb.endsWith("ya")) {
        return null;
    }
    if (options.isTransitive) {
        return null;
    }
    if (options.isYawi) {
        return null;
    }
    if (options.isWeya) {
        const base = getSuppletiveWeyaRootPlusYaBase();
        if (!base) {
            return null;
        }
        if (options.requirePronounceable && !isSyllableSequencePronounceable(base)) {
            return null;
        }
        return base;
    }
    const nonRedupRoot = getNonReduplicatedRoot(verb);
    if (nonRedupRoot !== verb && nonRedupRoot === "ya") {
        const maxRedupLength = getVerbLetterCount("yajya");
        if (getVerbLetterCount(verb) <= maxRedupLength) {
            return null;
        }
    }
    if (getVerbLetterCount(verb) <= 2) {
        return null;
    }
    const base = verb.slice(0, -2);
    if (!base) {
        return null;
    }
    if (options.requirePronounceable && !isSyllableSequencePronounceable(base)) {
        return null;
    }
    return base;
}

function deletionCreatesConsonantCluster(verb) {
    if (!verb || !VOWEL_END_RE.test(verb)) {
        return false;
    }
    return createsConsonantClusterAfterFinalDeletion(verb);
}

// === Person & Agreement ===
function getSubjectPersonInfo(subjectPrefix, subjectSuffix) {
    if (subjectPrefix === "ni" && subjectSuffix === "") {
        return { person: 1, number: "sg" };
    }
    if (subjectPrefix === "ti" && subjectSuffix === "") {
        return { person: 2, number: "sg" };
    }
    if (subjectPrefix === "ti" && subjectSuffix === "t") {
        return { person: 1, number: "pl" };
    }
    if (subjectPrefix === "an" && subjectSuffix === "t") {
        return { person: 2, number: "pl" };
    }
    if (subjectPrefix === "" && subjectSuffix === "") {
        return { person: 3, number: "sg" };
    }
    if (subjectPrefix === "" && subjectSuffix === "t") {
        return { person: 3, number: "pl" };
    }
    return null;
}

function getObjectPersonInfo(objectPrefix) {
    switch (objectPrefix) {
        case "nech":
            return { person: 1, number: "sg" };
        case "tech":
            return { person: 1, number: "pl" };
        case "metz":
            return { person: 2, number: "sg" };
        case "metzin":
            return { person: 2, number: "pl" };
        case "ki":
            return { person: 3, number: "sg" };
        case "kin":
            return { person: 3, number: "pl" };
        default:
            return null;
    }
}

function isSamePersonAcrossNumber(subjectPrefix, subjectSuffix, objectPrefix) {
    const subject = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const object = getObjectPersonInfo(objectPrefix);
    if (!subject || !object) {
        return false;
    }
    if (subject.person === 3 || object.person === 3) {
        return false;
    }
    return subject.person === object.person;
}

function isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix) {
    const subject = getSubjectPersonInfo(subjectPrefix, subjectSuffix);
    const object = getObjectPersonInfo(objectPrefix);
    if (!subject || !object) {
        return false;
    }
    if (subject.person === 3) {
        return false;
    }
    return subject.person === object.person && subject.number === object.number;
}

// === Nonactive Derivation ===
function applyPassiveImpersonal({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    preserveSubject = false,
    allowObjectPrefix = false,
}) {
    const isTransitiveVerb = objectPrefix !== "";
    if (!isTransitiveVerb) {
        return preserveSubject
            ? { subjectPrefix, subjectSuffix, objectPrefix }
            : { subjectPrefix: "", subjectSuffix: "", objectPrefix };
    }
    if (PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix)) {
        if (preserveSubject) {
            return {
                subjectPrefix,
                subjectSuffix,
                objectPrefix: allowObjectPrefix ? objectPrefix : "",
            };
        }
        const mapped = PASSIVE_IMPERSONAL_SUBJECT_MAP[objectPrefix];
        return {
            subjectPrefix: mapped.subjectPrefix,
            subjectSuffix: mapped.subjectSuffix,
            objectPrefix: "",
        };
    }
    return preserveSubject
        ? { subjectPrefix, subjectSuffix, objectPrefix }
        : { subjectPrefix: "", subjectSuffix: "", objectPrefix };
}

function getPassiveSubjectOverride(prefix) {
    const mapped = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (mapped) {
        return mapped;
    }
    if (OBJECT_MARKERS.has(prefix)) {
        return { subjectPrefix: "", subjectSuffix: "" };
    }
    return null;
}

// === Nonspecific Object Allomorphy ===
function replaceAnalysisSuffix(verb, analysisVerb, nextAnalysisVerb) {
    if (!analysisVerb || analysisVerb === nextAnalysisVerb) {
        return { verb, analysisVerb };
    }
    if (verb.endsWith(analysisVerb)) {
        return {
            verb: `${verb.slice(0, -analysisVerb.length)}${nextAnalysisVerb}`,
            analysisVerb: nextAnalysisVerb,
        };
    }
    return { verb, analysisVerb: nextAnalysisVerb };
}

function applyNonspecificObjectAllomorphy({
    verb,
    analysisVerb,
    objectPrefix,
    indirectObjectMarker = "",
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    hasSlashMarker = false,
    directionalPrefix = "",
}) {
    if (!verb) {
        return { verb, analysisVerb, objectPrefix };
    }
    const base = analysisVerb || verb;
    let nextVerb = verb;
    let nextAnalysis = base;
    let nextObjectPrefix = objectPrefix;
    const hasNonspecificMarker = hasNonspecificValence
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(objectPrefix)
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(indirectObjectMarker);
    const shouldReduceMuPrefix =
        objectPrefix === "mu"
        && (startsWithICVCVPattern(base) || startsWithAlPrefix(base) || startsWithACVlPattern(base))
        && !startsWithAny(base, NONSPECIFIC_I_DROP_VERBS);
    if (shouldReduceMuPrefix) {
        nextObjectPrefix = "m";
    }
    if (hasOptionalSupportiveI) {
        const shouldKeepSupportiveIForSlash = hasSlashMarker
            && (
                SUPPORTIVE_I_KEEP_SLASH_PREFIXES_LOADED
                    ? SUPPORTIVE_I_KEEP_SLASH_PREFIXES.has(directionalPrefix)
                    : Boolean(directionalPrefix)
            );
        const shouldDropSupportiveI = hasNonspecificMarker
            || (hasSlashMarker && !shouldKeepSupportiveIForSlash);
        if (shouldDropSupportiveI) {
            if (nextAnalysis.startsWith("i")) {
                const dropped = nextAnalysis.slice(1);
                const updated = replaceAnalysisSuffix(nextVerb, nextAnalysis, dropped);
                nextVerb = updated.verb;
                nextAnalysis = updated.analysisVerb;
            }
        } else if (!nextAnalysis.startsWith("i")) {
            const extended = `i${nextAnalysis}`;
            const updated = replaceAnalysisSuffix(nextVerb, nextAnalysis, extended);
            nextVerb = updated.verb;
            nextAnalysis = updated.analysisVerb;
        }
    }
    return { verb: nextVerb, analysisVerb: nextAnalysis, objectPrefix: nextObjectPrefix };
}

function isValencyFilled(objectPrefix, verbMeta) {
    if (objectPrefix) {
        return true;
    }
    if (!verbMeta) {
        return false;
    }
    if (verbMeta.isMarkedTransitive) {
        return true;
    }
    return getActiveVerbValency(verbMeta) > 1;
}

function isNonactiveTransitiveVerb(objectPrefix, verbMeta) {
    if (!verbMeta) {
        return Boolean(objectPrefix);
    }
    if (verbMeta.isTaFusion) {
        return true;
    }
    return isValencyFilled(objectPrefix, verbMeta);
}

function getNonactiveDerivationSource(verbMeta, verb, analysisVerb) {
    const impersonalPrefix = verbMeta?.hasImpersonalTaPrefix ? "ta" : "";
    const applyImpersonalPrefix = (source, prefix) => {
        if (!impersonalPrefix) {
            return { baseVerb: source, prefix };
        }
        let baseVerb = analysisVerb || source || "";
        if (baseVerb.startsWith(impersonalPrefix)) {
            baseVerb = baseVerb.slice(impersonalPrefix.length);
        } else if (source && source.startsWith(impersonalPrefix)) {
            baseVerb = source.slice(impersonalPrefix.length);
        }
        const resolvedBase = baseVerb || source;
        return { baseVerb: resolvedBase, prefix: `${prefix}${impersonalPrefix}` };
    };
    if (verbMeta?.hasBoundMarker && Array.isArray(verbMeta.boundPrefixes) && verbMeta.boundPrefixes.length) {
        const prefixParts = [...verbMeta.boundPrefixes];
        if (
            verbMeta.directionalPrefix
            && verbMeta.displayVerb
            && verbMeta.displayVerb.startsWith(`${verbMeta.directionalPrefix}/`)
            && prefixParts[0] !== verbMeta.directionalPrefix
        ) {
            prefixParts.unshift(verbMeta.directionalPrefix);
        }
        return applyImpersonalPrefix(analysisVerb || verb || "", prefixParts.join(""));
    }
    if (
        verbMeta?.directionalPrefix
        && verb
        && verb.startsWith(verbMeta.directionalPrefix)
    ) {
        const rawBase = analysisVerb || verb.slice(verbMeta.directionalPrefix.length) || verb;
        const baseVerb = rawBase.startsWith(verbMeta.directionalPrefix)
            ? rawBase.slice(verbMeta.directionalPrefix.length)
            : rawBase;
        return applyImpersonalPrefix(baseVerb, verbMeta.directionalPrefix);
    }
    return applyImpersonalPrefix(verb || analysisVerb || "", "");
}

function shouldUseAnalysisVerbAsRuleBase(verbMeta) {
    if (!verbMeta) {
        return false;
    }
    const hasBoundMarker = verbMeta.hasBoundMarker === true
        || (Array.isArray(verbMeta.boundPrefixes) && verbMeta.boundPrefixes.length > 0)
        || (typeof verbMeta.boundPrefix === "string" && verbMeta.boundPrefix.length > 0);
    return Boolean(
        verbMeta.hasCompoundMarker
        || verbMeta.hasSuffixSeparator
        || verbMeta.hasSlashMarker
        || hasBoundMarker
        || verbMeta.hasLeadingDash
    );
}

function normalizeRuleBase(value) {
    let base = value || "";
    if (!base) {
        return base;
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\\/?-]/g;
    return base.replace(markerRe, "");
}

function getCanonicalRuleBaseFromOptions(source, options = {}) {
    if (options.canonicalRuleBase) {
        return options.canonicalRuleBase;
    }
    const meta = options.verbMeta || options.parsedVerb || null;
    if (meta) {
        if (meta.canonicalRuleBase) {
            return meta.canonicalRuleBase;
        }
        if (meta.canonical && meta.canonical.ruleBase) {
            return meta.canonical.ruleBase;
        }
    }
    if (options.ruleBase) {
        return normalizeRuleBase(options.ruleBase);
    }
    return normalizeRuleBase(source);
}

function getDerivationRuleBase(source, verbMeta) {
    if (!source || !verbMeta) {
        return source;
    }
    if (verbMeta.canonicalRuleBase) {
        return verbMeta.canonicalRuleBase;
    }
    if (verbMeta.canonical && verbMeta.canonical.ruleBase) {
        return verbMeta.canonical.ruleBase;
    }
    const analysisVerb = verbMeta.analysisVerb || "";
    if (analysisVerb && shouldUseAnalysisVerbAsRuleBase(verbMeta)) {
        return normalizeRuleBase(analysisVerb);
    }
    return normalizeRuleBase(source);
}

function getNonactiveRuleBase(source, verbMeta) {
    if (!source || !verbMeta) {
        return source;
    }
    let base = getDerivationRuleBase(source, verbMeta);
    if (verbMeta.directionalPrefix && base.startsWith(verbMeta.directionalPrefix)) {
        base = base.slice(verbMeta.directionalPrefix.length);
    }
    const fusionPrefixes = Array.isArray(verbMeta.fusionPrefixes) ? verbMeta.fusionPrefixes : [];
    const boundPrefixes = Array.isArray(verbMeta.boundPrefixes) ? verbMeta.boundPrefixes : [];
    const allPrefixes = fusionPrefixes.length
        ? [...fusionPrefixes, ...boundPrefixes.filter((prefix) => !fusionPrefixes.includes(prefix))]
        : boundPrefixes;
    if (allPrefixes.length) {
        base = stripLeadingPrefixes(base, allPrefixes);
    }
    const normalized = normalizeRuleBase(base || source);
    return normalized || base || source;
}

function shouldForceAllNonactiveOptions() {
    return false;
}

function isValenceNeutralIntransitiveStem(stem) {
    if (!stem) {
        return false;
    }
    const neutral = VALENCE_NEUTRAL_RULES || {};
    const intransitiveList = Array.isArray(neutral?.intransitiveToApplicative?.verbs)
        ? neutral.intransitiveToApplicative.verbs
        : [];
    const intransitiveSuffixes = Array.isArray(neutral?.intransitiveToApplicative?.suffixes)
        ? neutral.intransitiveToApplicative.suffixes
        : [];
    const causativeSuffixes = Array.isArray(neutral?.intransitiveToCausative?.suffixes)
        ? neutral.intransitiveToCausative.suffixes
        : [];
    if (intransitiveList.includes(stem)) {
        return true;
    }
    const suffixCandidates = [...intransitiveSuffixes, ...causativeSuffixes];
    return suffixCandidates.some((suffix) => (
        suffix
        && stem.endsWith(suffix)
        && stem.length > suffix.length
    ));
}

function getCausativeDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const allowTypeTwo = options.allowTypeTwo !== false;
    const hasLeadingDash = options.hasLeadingDash === true;
    const ruleBase = getCanonicalRuleBaseFromOptions(source, options);
    const fullRuleBase = options.canonicalFullRuleBase
        || (options.parsedVerb && options.parsedVerb.canonicalFullRuleBase)
        || (options.parsedVerb && options.parsedVerb.canonical && options.parsedVerb.canonical.fullRuleBase)
        || (options.verbMeta && options.verbMeta.canonicalFullRuleBase)
        || (options.verbMeta && options.verbMeta.canonical && options.verbMeta.canonical.fullRuleBase)
        || normalizeRuleBase(options.fullRuleBase || "");
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }
    const rules = DERIVATIONAL_RULES?.causative || {};
    const isTransitive = options.isTransitive === true || options.hasLeadingDash === true;
    let isIntransitive = options.isTransitive === false ? true : !isTransitive;
    const neutralCausative = VALENCE_NEUTRAL_RULES?.intransitiveToCausative || {};
    const neutralVerbs = Array.isArray(neutralCausative?.verbs)
        ? neutralCausative.verbs
        : [];
    const neutralSuffixes = Array.isArray(neutralCausative?.suffixes)
        ? neutralCausative.suffixes
        : [];
    const matchesNeutralSuffix = (base) => neutralSuffixes.some((suffix) => (
        suffix
        && base.endsWith(suffix)
        && base.length > suffix.length
    ));
    const matchNeutralBase = (base) => Boolean(base && (neutralVerbs.includes(base) || matchesNeutralSuffix(base)));
    const results = [];
    const seen = new Set();
    const push = (stem, meta = {}) => {
        if (!stem) {
            return;
        }
        const key = stem;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ stem, ...meta });
    };
    if (isIntransitive && !hasLeadingDash) {
        const matchBase = matchNeutralBase(fullRuleBase) ? fullRuleBase : (matchNeutralBase(ruleBase) ? ruleBase : "");
        if (matchBase) {
            push(matchBase, { type: "neutral", rule: "valence-neutral" });
            const allowAdditional = Array.isArray(neutralCausative?.allowAdditionalDerivations)
                ? neutralCausative.allowAdditionalDerivations
                : [];
            const allowNeutralPlus = matchesDerivationRuleBaseList(
                allowAdditional,
                ruleBase,
                fullRuleBase
            ) || allowAdditional.includes(matchBase);
            if (!allowNeutralPlus) {
                return results;
            }
        }
    }
    const rootPlusYaBase = options.rootPlusYaBase || "";
    const isRootPlusYa = Boolean(rootPlusYaBase) && ruleBase.endsWith("ya");
    const info = getNonactiveBaseInfo(ruleBase);
    const extractExampleBases = (examples) => (
        Array.isArray(examples)
            ? examples.map((entry) => String(entry || "").split("->")[0].trim()).filter(Boolean)
            : []
    );
    const matchesWiStockPattern = (pattern, letters) => {
        if (!letters || letters.length < 6) {
            return false;
        }
        const tail = letters.length === 6 ? letters : letters.slice(-6);
        switch (pattern) {
        case "CVC-i-wi":
            return isVerbLetterConsonant(tail[0])
                && isVerbLetterVowel(tail[1])
                && isVerbLetterConsonant(tail[2])
                && tail[3] === "i"
                && tail[4] === "w"
                && tail[5] === "i";
        case "CVC-a-wi":
            return isVerbLetterConsonant(tail[0])
                && isVerbLetterVowel(tail[1])
                && isVerbLetterConsonant(tail[2])
                && tail[3] === "a"
                && tail[4] === "w"
                && tail[5] === "i";
        case "VjC-a-wi":
            return isVerbLetterVowel(tail[0])
                && tail[1] === "j"
                && isVerbLetterConsonant(tail[2])
                && tail[3] === "a"
                && tail[4] === "w"
                && tail[5] === "i";
        case "VjC-i-wi":
            return isVerbLetterVowel(tail[0])
                && tail[1] === "j"
                && isVerbLetterConsonant(tail[2])
                && tail[3] === "i"
                && tail[4] === "w"
                && tail[5] === "i";
        case "CVl-i-wi":
            return isVerbLetterConsonant(tail[0])
                && isVerbLetterVowel(tail[1])
                && tail[2] === "l"
                && tail[3] === "i"
                && tail[4] === "w"
                && tail[5] === "i";
        default:
            return false;
        }
    };
    const adjustTypeTwoStem = (stem, suffix) => {
        if (!stem || !suffix) {
            return stem;
        }
        if (stem.endsWith("m") && suffix.startsWith("t")) {
            return `${stem.slice(0, -1)}n`;
        }
        return stem;
    };

    const replacementOnly = Array.isArray(rules?.intransitiveEndsWithI?.replacementOnly)
        ? rules.intransitiveEndsWithI.replacementOnly
        : [];
    const blockTypeOneList = Array.isArray(rules?.intransitiveEndsWithI?.blockTypeOne)
        ? rules.intransitiveEndsWithI.blockTypeOne
        : [];
    const blockTypeOneMatch = matchesDerivationRuleBaseList(
        blockTypeOneList,
        ruleBase,
        fullRuleBase
    );
    const replacementOnlyMatch = matchesDerivationRuleBaseList(
        replacementOnly,
        ruleBase,
        fullRuleBase
    );
    if (replacementOnlyMatch) {
        isIntransitive = true;
    }
    const additionRules = rules?.intransitiveEndsWithI?.addition || {};
    const allowVerbs = Array.isArray(additionRules.allowVerbs)
        ? additionRules.allowVerbs
        : [];
    const allowSuffixes = Array.isArray(additionRules.allowSuffixes)
        ? additionRules.allowSuffixes
        : [];
    const matchesAddition = matchesDerivationRuleBaseList(
        allowVerbs,
        ruleBase,
        fullRuleBase
    )
        || allowSuffixes.some((suffix) => suffix && ruleBase.endsWith(suffix))
        || (fullRuleBase && allowSuffixes.some((suffix) => suffix && fullRuleBase.endsWith(suffix)));
    const hasExplicitILists = replacementOnly.length > 0 || allowVerbs.length > 0 || allowSuffixes.length > 0;
    const allowExplicitI = replacementOnlyMatch || matchesAddition;
    const wiStockFormativeRules = rules?.destockal?.wiStockFormative || null;
    const wiStockBlockVerbs = wiStockFormativeRules && Array.isArray(wiStockFormativeRules.blockVerbs)
        ? wiStockFormativeRules.blockVerbs
        : [];
    const wiStockBlockMatch = matchesDerivationRuleBaseList(
        wiStockBlockVerbs,
        ruleBase,
        fullRuleBase
    );
    let wiStockSuppressA = (() => {
        if (!wiStockFormativeRules || !isIntransitive) {
            return false;
        }
        if (!(ruleBase.endsWith("iwi") || ruleBase.endsWith("awi"))) {
            return false;
        }
        if (wiStockBlockMatch) {
            return false;
        }
        return true;
    })();
    if (replacementOnlyMatch) {
        wiStockSuppressA = false;
    }

    if (isIntransitive && info.endsWithI && !blockTypeOneMatch) {
        const dropped = ruleBase.slice(0, -1);
        if (!wiStockSuppressA && (replacementOnly.length === 0 || replacementOnlyMatch || wiStockBlockMatch)) {
            push(`${dropped}a`, { type: "type-one", rule: "drop-final-i" });
        }
    const replaceFinalRules = Array.isArray(rules?.intransitiveEndsWithI?.replaceFinalConsonant)
        ? rules.intransitiveEndsWithI.replaceFinalConsonant
        : [];
    const replaceFinalBases = replaceFinalRules.flatMap((entry) => (
        Array.isArray(entry?.verbs) ? entry.verbs : extractExampleBases(entry?.examples)
    ));
    const matchesReplaceFinal = matchesDerivationRuleBaseList(
        replaceFinalBases,
        ruleBase,
        fullRuleBase
    );
        replaceFinalRules.forEach((entry) => {
            if (!entry || entry.from !== "k" || entry.to !== "tz") {
                return;
            }
            if (replacementOnlyMatch || !matchesReplaceFinal) {
                return;
            }
            if (dropped.endsWith(entry.from)) {
                push(`${dropped.slice(0, -1)}${entry.to}a`, { type: "type-one", rule: "replace-final-consonant" });
            }
        });
        const allowAddition = (allowVerbs.length || allowSuffixes.length)
            ? matchesAddition
            : (ruleBase.endsWith("ki") || info.endsWithConsonantCluster);
        if (!wiStockSuppressA && allowAddition) {
            push(`${ruleBase}a`, { type: "type-one", rule: "addition" });
        }
    }
    const intransitiveEndsWithA = rules?.intransitiveEndsWithA || {};
    const replacementOnlyA = Array.isArray(intransitiveEndsWithA.replacementOnly)
        ? intransitiveEndsWithA.replacementOnly
        : [];
    const allowReplaceFinalA = replacementOnlyA.length === 0
        || matchesDerivationRuleBaseList(replacementOnlyA, ruleBase, fullRuleBase);
    if (isIntransitive && info.endsWithA) {
        if (isRootPlusYa && rootPlusYaBase) {
            const rootPlusYaRules = rules?.intransitiveEndsWithA?.rootPlusYa || {};
            const allowVerbs = Array.isArray(rootPlusYaRules.allowVerbs)
                ? rootPlusYaRules.allowVerbs
                : [];
            const allowSuffixes = Array.isArray(rootPlusYaRules.allowSuffixes)
                ? rootPlusYaRules.allowSuffixes
                : [];
            const matchesRootPlusYa = matchesDerivationRuleBaseList(
                allowVerbs,
                ruleBase,
                fullRuleBase
            )
                || allowSuffixes.some((suffix) => suffix && ruleBase.endsWith(suffix))
                || (fullRuleBase && allowSuffixes.some((suffix) => suffix && fullRuleBase.endsWith(suffix)));
            if (matchesRootPlusYa || (allowVerbs.length === 0 && allowSuffixes.length === 0)) {
                push(`${rootPlusYaBase}a`, { type: "type-one", rule: "root-plus-ya" });
            }
        } else if (allowReplaceFinalA) {
            push(`${ruleBase.slice(0, -1)}a`, { type: "type-one", rule: "replace-final-a" });
        }
    }

    if (isIntransitive && !replacementOnlyMatch) {
        const destockal = rules.destockal || {};
        const addWithOrder = (order, actions) => {
            (order || []).forEach((action) => {
                const builder = actions[action];
                if (typeof builder === "function") {
                    const stem = builder();
                    if (stem) {
                        push(stem, { type: "type-one", rule: `destockal-${action}` });
                    }
                }
            });
        };
        if (info.endsWithNi && destockal.ni) {
            const order = Array.isArray(destockal.ni.prefer)
                ? destockal.ni.prefer
                : ["addSuffix", "replaceFinalI"];
            addWithOrder(order, {
                addSuffix: () => `${ruleBase}a`,
                replaceFinalI: () => (ruleBase.endsWith("i") ? `${ruleBase.slice(0, -1)}a` : ""),
            });
        }
        if (!blockTypeOneMatch && ruleBase.endsWith("wi") && destockal.wi) {
            const suppressDestockalWi = wiStockSuppressA || ruleBase.endsWith("uwi");
            if (!suppressDestockalWi && (!hasExplicitILists || allowExplicitI)) {
                const order = Array.isArray(destockal.wi.prefer)
                    ? destockal.wi.prefer
                    : ["replaceFinalI", "addSuffix"];
                addWithOrder(order, {
                    addSuffix: () => `${ruleBase}a`,
                    // Treat -kwi as distinct from a true -wi stem-formative; don't apply I->A replacement there.
                    replaceFinalI: () => (
                        ruleBase.endsWith("i") && !info.endsWithKwi
                            ? `${ruleBase.slice(0, -1)}a`
                            : ""
                    ),
                });
            }
        }
        if (ruleBase.endsWith("wa") && destockal.wa) {
            push(`${ruleBase.slice(0, -1)}a`, { type: "type-one", rule: "destockal-wa" });
        }
        if (destockal.wiStockFormative) {
            if (!(replacementOnlyMatch && ruleBase.endsWith("wi"))) {
                const wiRules = destockal.wiStockFormative || {};
                const blockVerbs = Array.isArray(wiRules.blockVerbs) ? wiRules.blockVerbs : [];
                const allowPatterns = Array.isArray(wiRules.allowPatterns) ? wiRules.allowPatterns : [];
                const blocked = matchesDerivationRuleBaseList(blockVerbs, ruleBase, fullRuleBase);
                const patternBase = getNonReduplicatedRoot(ruleBase) || ruleBase;
                const letters = splitVerbLetters(patternBase);
                const matchesPattern = allowPatterns.length === 0
                    || allowPatterns.some((pattern) => matchesWiStockPattern(pattern, letters));
                if (!blocked && matchesPattern && (ruleBase.endsWith("iwi") || ruleBase.endsWith("awi"))) {
                    push(`${ruleBase.slice(0, -3)}ua`, { type: "type-one", rule: "destockal-wi-ia" });
                }
            }
        }
        if (destockal.wiStockFormativeU) {
            if (ruleBase.endsWith("uwi")) {
                push(`${ruleBase.slice(0, -2)}a`, { type: "type-one", rule: "destockal-wi-u" });
            }
        }
    }

    const typeTwo = rules.typeTwo || {};
    const allowedSuffixes = Array.isArray(typeTwo.nonactiveBaseSuffixes)
        ? typeTwo.nonactiveBaseSuffixes
        : [];
    const uwaOnlyList = Array.isArray(typeTwo.uwaOnly) ? typeTwo.uwaOnly : [];
    const uwaBlockList = Array.isArray(typeTwo.uwaBlock) ? typeTwo.uwaBlock : [];
    const matchesTypeTwoList = (list) => matchesDerivationRuleBaseList(
        list,
        ruleBase,
        fullRuleBase
    );
    const forceUwaOnly = matchesTypeTwoList(uwaOnlyList);
    const blockUwaTypeTwo = matchesTypeTwoList(uwaBlockList);
    if (allowTypeTwo) {
        const deleteSuffixes = new Set(Array.isArray(typeTwo.deleteSuffixes) ? typeTwo.deleteSuffixes : []);
        const typeTwoSuffix = typeof typeTwo.suffix === "string" ? typeTwo.suffix : "tia";
        const nonactiveOptions = getNonactiveDerivationOptions(ruleBase, ruleBase, {
            isTransitive,
            isYawi: options.isYawi === true,
            ruleBase,
            rootPlusYaBase,
        });
        const hasNonactiveSuffix = (suffix) => nonactiveOptions.some((option) => option.suffix === suffix);
        const typeTwoOptions = [...nonactiveOptions];
        const nonRedupRuleBase = getNonReduplicatedRoot(ruleBase);
        if (nonRedupRuleBase && nonRedupRuleBase !== ruleBase) {
            const nonRedupOptions = getNonactiveDerivationOptions(nonRedupRuleBase, nonRedupRuleBase, {
                isTransitive,
                isYawi: options.isYawi === true,
                ruleBase: nonRedupRuleBase,
                rootPlusYaBase,
            });
            const hasTypeTwoSuffix = (suffix) => typeTwoOptions.some((option) => option.suffix === suffix);
            const hasNonRedupSuffix = (suffix) => nonRedupOptions.some((option) => option.suffix === suffix);
            const blockChForTi = info.penultimateHasCoda || (info.endsWithTi && info.preTiConsonant);
            const blockOnsetReplacement = isShortReplaciveOnsetBase(ruleBase);
            const addSynthesized = (suffix, stemBuilder) => {
                if (!hasNonRedupSuffix(suffix) || hasTypeTwoSuffix(suffix)) {
                    return;
                }
                const stem = stemBuilder();
                if (stem) {
                    typeTwoOptions.push({ suffix, stem });
                }
            };
            addSynthesized("wa", () => `${ruleBase}wa`);
            addSynthesized("u", () => buildNonactiveUStem(ruleBase, info.lastOnset, info.lastNucleus, {
                blockCh: blockChForTi,
                blockOnsetReplacement,
            }));
            addSynthesized("uwa", () => buildNonactiveUwaStem(ruleBase, info.lastOnset, info.lastNucleus, {
                blockCh: blockChForTi,
                blockOnsetReplacement,
            }));
            addSynthesized("lu", () => `${ruleBase}lu`);
        }
        const endsWithCluster = (stem) => {
            if (!stem) {
                return false;
            }
            const letters = splitVerbLetters(stem);
            if (letters.length < 2) {
                return false;
            }
            const last = letters[letters.length - 1];
            const prev = letters[letters.length - 2];
            return isVerbLetterConsonant(last) && isVerbLetterConsonant(prev);
        };
        const getClusterBaseStem = (stem) => {
            if (!stem) {
                return "";
            }
            const nonRedup = getNonReduplicatedRoot(stem);
            return nonRedup && nonRedup !== stem ? nonRedup : stem;
        };
        const uwaClusterBase = (() => {
            const uwaOption = typeTwoOptions.find((option) => option.suffix === "uwa");
            if (!uwaOption || !uwaOption.stem) {
                return "";
            }
            if (!uwaOption.stem.endsWith("uwa")) {
                return "";
            }
            let baseStem = uwaOption.stem.slice(0, -3);
            if (info.endsWithNi && baseStem.endsWith("u")) {
                baseStem = baseStem.slice(0, -1);
            }
            const clusterStem = getClusterBaseStem(baseStem);
            return endsWithCluster(clusterStem) ? clusterStem : "";
        })();
        if (forceUwaOnly && !typeTwoOptions.some((option) => option.suffix === "uwa")) {
            const uwaStem = buildNonactiveUwaStem(ruleBase, info.lastOnset, info.lastNucleus, {
                blockCh: info.penultimateHasCoda,
            });
            if (uwaStem) {
                typeTwoOptions.push({ suffix: "uwa", stem: uwaStem });
            }
        }

        if (isIntransitive && info.endsWithU && hasNonactiveSuffix("wa")) {
            const uRules = rules.intransitiveEndsWithU?.nonactiveWa?.typeTwo || {};
            const additionBases = Array.isArray(uRules?.addition?.verbs)
                ? uRules.addition.verbs
                : extractExampleBases(uRules?.addition?.examples);
            const replacementBases = Array.isArray(uRules?.replacement?.verbs)
                ? uRules.replacement.verbs
                : extractExampleBases(uRules?.replacement?.examples);
            const matchBase = (baseList) => matchesDerivationRuleBaseList(baseList, ruleBase, fullRuleBase);
            const useAddition = additionBases.length ? matchBase(additionBases) : true;
            const useReplacement = replacementBases.length ? matchBase(replacementBases) : true;
            if (useAddition) {
                push(`${ruleBase}wia`, { type: "type-two", rule: "u-wa-wia" });
            }
            if (useReplacement) {
                push(`${ruleBase.slice(0, -1)}awia`, { type: "type-two", rule: "u-wa-wia-replace" });
            }
        }

        typeTwoOptions.forEach((option) => {
            if (!allowedSuffixes.includes(option.suffix)) {
                return;
            }
            if (isRootPlusYa && option.suffix === "lu" && option.stem === `${ruleBase}lu`) {
                return;
            }
            if (option.suffix === "wa" && uwaClusterBase) {
                return;
            }
            if (isIntransitive && info.endsWithWi) {
                const wiSyllableCount = info.nonRedupSyllableCount || info.syllableCount;
                const wiCluster = info.endsWithConsonantCluster;
            if (wiCluster && option.suffix === "uwa") {
                return;
            }
                if (!wiCluster && wiSyllableCount >= 3 && option.suffix === "uwa") {
                    return;
                }
                if (!wiCluster && wiSyllableCount === 2 && option.suffix === "wa") {
                    return;
                }
            }
            if (forceUwaOnly && option.suffix === "wa") {
                return;
            }
            if (blockUwaTypeTwo && option.suffix === "uwa") {
                return;
            }
            if (isIntransitive && option.suffix === "wa" && info.lastOnset === "k" && hasNonactiveSuffix("uwa")) {
                // For intransitives with last onset k (and an available -uwa nonactive),
                // only accept the -uwa-based type-two causative (drop -uwa + tia), not the -wa-based one.
                return;
            }
            if (isIntransitive && info.endsWithTi && option.suffix === "wa") {
                // Intransitive stems ending in -ti do not form type-two causatives from the -wa nonactive base.
                return;
            }
            if (isIntransitive && info.endsWithU && option.suffix === "wa") {
                // For intransitive -u verbs, WIA can be formed either by addition (temu -> temuwia)
                // or by replacement (panu -> panawia). If the verb is listed as replacement,
                // suppress the default -wia output derived from the -wa nonactive base.
                const uRules = rules.intransitiveEndsWithU?.nonactiveWa?.typeTwo || {};
                const additionBases = Array.isArray(uRules?.addition?.verbs)
                    ? uRules.addition.verbs
                    : extractExampleBases(uRules?.addition?.examples);
                const replacementBases = Array.isArray(uRules?.replacement?.verbs)
                    ? uRules.replacement.verbs
                    : extractExampleBases(uRules?.replacement?.examples);
                if (replacementBases.length) {
                    const matchBase = (baseList) => matchesDerivationRuleBaseList(baseList, ruleBase, fullRuleBase);
                    const inAdditionList = additionBases.length ? matchBase(additionBases) : false;
                    const inReplacementList = matchBase(replacementBases);
                    if (inReplacementList && !inAdditionList) {
                        return;
                    }
                }
            }
            let baseStem = option.stem;
            if (option.suffix === "lu") {
                baseStem = option.stem.endsWith("lu") ? option.stem.slice(0, -1) : option.stem;
            } else if (deleteSuffixes.has(option.suffix)) {
                if (option.suffix === "wa" && option.stem.endsWith("wa")) {
                    baseStem = option.stem.slice(0, -2);
                } else if (option.suffix === "u" && option.stem.endsWith("u")) {
                    baseStem = option.stem.slice(0, -1);
                } else if (option.suffix === "uwa" && option.stem.endsWith("uwa")) {
                    baseStem = option.stem.slice(0, -3);
                }
            }
            if (option.suffix === "uwa" && info.endsWithNi && baseStem.endsWith("u")) {
                baseStem = baseStem.slice(0, -1);
            }
            let suffix = typeTwoSuffix;
            if (info.endsWithU && option.suffix === "wa") {
                suffix = "wia";
            }
            if (isIntransitive && option.suffix === "lu" && info.endsWithTi) {
                suffix = "ia";
            }
            if (["u", "uwa"].includes(option.suffix) && suffix === typeTwoSuffix) {
                const clusterStem = getClusterBaseStem(baseStem);
                if (endsWithCluster(clusterStem)) {
                    suffix = `i${suffix}`;
                }
            }
            if (option.suffix === "uwa" && suffix.endsWith(typeTwoSuffix) && info.lastOnset === "w") {
                suffix = `w${suffix}`;
            }
        if (option.suffix === "lu" && isRootPlusYa && rootPlusYaBase) {
            const rootStem = `${rootPlusYaBase}l`;
            push(`${rootStem}ia`, { type: "type-two", rule: "root-plus-ya-lia" });
        }
            if (option.suffix === "lu" && rootPlusYaBase && (rootPlusYaBase.endsWith("ti") || rootPlusYaBase.endsWith("wi"))) {
                const rootStem = `${rootPlusYaBase}l`;
                push(`${rootStem}ia`, { type: "type-two", rule: "root-plus-ya-tiwi-lia" });
            }
            if (baseStem) {
                const adjusted = adjustTypeTwoStem(baseStem, suffix);
                const preferUwaSh = option.suffix === "uwa"
                    && info.lastOnset === "s"
                    && option.stem.includes("sh");
                push(`${adjusted}${suffix}`, {
                    type: "type-two",
                    rule: `nonactive-${option.suffix}`,
                    preferred: preferUwaSh,
                });
            }
        });

        if (isIntransitive && info.endsWithU && hasNonactiveSuffix("lu")) {
            const luOption = nonactiveOptions.find((option) => option.suffix === "lu");
            if (luOption && luOption.stem.endsWith("lu")) {
                const baseStem = luOption.stem.slice(0, -1);
                push(`${baseStem}${typeTwoSuffix}`, { type: "type-two", rule: "u-lu-tia" });
            }
        }
    }

    return results;
}

function applyCausativeDerivation({
    isCausative,
    verb,
    analysisVerb,
    objectPrefix,
    parsedVerb,
    directionalPrefix,
    isYawi,
    suppletiveStemSet,
}) {
    if (!isCausative) {
        return {
            verb,
            analysisVerb,
            isYawi,
            causativeAllStems: null,
            suppletiveStemSet,
        };
    }
    // Suppletive: yawi has a fixed causative stem.
    if (parsedVerb?.isYawi) {
        const causativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
        const prefix = causativeSource.prefix || "";
        const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
        const baseStem = getSuppletiveYawiCausativeActive();
        const baseSelectedStem = prefix ? `${prefix}${baseStem}` : baseStem;
        const selectedStem = applyEmbeddedPrefixToStem(baseSelectedStem, embeddedPrefix, directionalPrefix);
        let nextAnalysis = selectedStem;
        if (directionalPrefix && baseSelectedStem.startsWith(directionalPrefix)) {
            nextAnalysis = baseSelectedStem.slice(directionalPrefix.length);
        } else {
            nextAnalysis = baseSelectedStem;
        }
        return {
            verb: selectedStem,
            analysisVerb: nextAnalysis,
            isYawi: false,
            causativeAllStems: [selectedStem],
            noCausativeStem: false,
            suppletiveStemSet: null,
        };
    }
    const canonicalRuleBase = parsedVerb?.canonicalRuleBase || parsedVerb?.canonical?.ruleBase || "";
    const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase || parsedVerb?.canonical?.fullRuleBase || "";
    const ruleBaseForGate = canonicalRuleBase
        || getNonactiveRuleBase(analysisVerb || verb || "", parsedVerb);
    let allowTypeTwoIntransitiveA = false;
    let allowTypeTwoIntransitiveNiUwa = false;
    let allowTypeTwoIntransitiveU = false;
    let allowTypeTwoIntransitiveUwa = false;
    if (ruleBaseForGate) {
        const gateBase = getNonReduplicatedRoot(ruleBaseForGate) || ruleBaseForGate;
        const typeTwoGate = DERIVATIONAL_RULES?.causative?.typeTwo?.allowTypeTwoForIntransitives || {};
        const gateInfo = getNonactiveBaseInfo(gateBase);
        if (
            !parsedVerb.isMarkedTransitive
            && gateInfo.endsWithU
            && typeTwoGate.endsWithU !== false
        ) {
            // Intransitive stems ending in -u can form type-two causatives (WIA/TIA) based on their nonactive.
            allowTypeTwoIntransitiveU = true;
        }
        if (
            !parsedVerb.isMarkedTransitive
            && gateInfo.endsWithA
            && typeTwoGate.endsWithA !== false
        ) {
            const aRules = DERIVATIONAL_RULES?.causative?.intransitiveEndsWithA || {};
            const allowList = Array.isArray(aRules.replacementOnly) ? aRules.replacementOnly : [];
            const typeTwoAllow = Array.isArray(aRules.typeTwoAllow) ? aRules.typeTwoAllow : [];
            const baseForGate = normalizeRuleBase(gateBase);
            const allowTypeTwoList = matchesDerivationRuleBaseList(
                typeTwoAllow,
                baseForGate,
                getNonReduplicatedRoot(baseForGate)
            );
            allowTypeTwoIntransitiveA = allowTypeTwoList
                || (allowList.length > 0 && !matchesDerivationRuleBaseList(
                    allowList,
                    baseForGate,
                    getNonReduplicatedRoot(baseForGate)
                ));
        }
        if (
            !parsedVerb.isMarkedTransitive
            && gateInfo.endsWithNi
            && typeTwoGate.endsWithNi !== false
        ) {
            const niGate = typeTwoGate.endsWithNi && typeof typeTwoGate.endsWithNi === "object"
                ? typeTwoGate.endsWithNi
                : {};
            const minSyllables = Number.isFinite(niGate.minSyllables)
                ? Math.max(0, niGate.minSyllables)
                : 3;
            const requiredSuffix = typeof niGate.requireNonactiveSuffix === "string"
                ? niGate.requireNonactiveSuffix
                : "uwa";
            const niSyllables = getSyllables(gateBase, { analysis: true, assumeFinalV: true });
            const allowNiByLength = niSyllables.length >= minSyllables;
            if (allowNiByLength) {
                const niOptions = getNonactiveDerivationOptions(
                    gateBase,
                    gateBase,
                    {
                        isTransitive: false,
                        ruleBase: gateBase,
                        rootPlusYaBase: parsedVerb.rootPlusYaBase,
                    }
                );
                allowTypeTwoIntransitiveNiUwa = niOptions.some((option) => option.suffix === requiredSuffix);
            }
        }
        if (!parsedVerb.isMarkedTransitive) {
            const allowSuffixes = Array.isArray(typeTwoGate.allowWhenHasNonactiveSuffixes)
                ? typeTwoGate.allowWhenHasNonactiveSuffixes.filter(Boolean)
                : [];
            if (allowSuffixes.length) {
                const nonactiveOptions = getNonactiveDerivationOptions(
                    gateBase,
                    gateBase,
                    {
                        isTransitive: false,
                        ruleBase: gateBase,
                        rootPlusYaBase: parsedVerb.rootPlusYaBase,
                    }
                );
                allowTypeTwoIntransitiveUwa = nonactiveOptions.some((option) => allowSuffixes.includes(option.suffix));
            }
        }
    }
    suppletiveStemSet = null;
    const causativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    const ruleBase = canonicalRuleBase
        || getNonactiveRuleBase(causativeSource.baseVerb, parsedVerb);
    const fullRuleBase = canonicalFullRuleBase || causativeSource.baseVerb || "";
    const explicitSlots = Number.isFinite(parsedVerb.totalValenceSlotCount)
        ? Math.max(0, Math.min(2, parsedVerb.totalValenceSlotCount))
        : 0;
    const baseSlots = explicitSlots > 0
        ? explicitSlots
        : Math.max(0, getBaseObjectSlots(parsedVerb) - (parsedVerb.derivationValencyDelta || 0));
    let baseIsTransitive = baseSlots > 0;
    // If the user didn't mark transitivity (no leading dash / no valence tokens),
    // fall back to Basic Data for verbs that are *only* attested as transitive.
    if (
        !baseIsTransitive
        && BASIC_DATA_CANONICAL_MAP.size
        && (canonicalFullRuleBase || canonicalRuleBase)
        && (
            parsedVerb.hasBoundMarker
            || parsedVerb.hasSlashMarker
            || parsedVerb.hasSuffixSeparator
            || parsedVerb.hasCompoundMarker
        )
    ) {
        const key = String(canonicalFullRuleBase || canonicalRuleBase).toLowerCase();
        const info = BASIC_DATA_CANONICAL_MAP.get(key);
        if (info && info.transitive && !info.intransitive) {
            baseIsTransitive = true;
        }
    }
    const treatAsIntransitive = !baseIsTransitive
        && parsedVerb.hasLeadingDash !== true
        && isValenceNeutralIntransitiveStem(ruleBase);
    const options = getCausativeDerivationOptions(ruleBase, ruleBase, {
        isTransitive: treatAsIntransitive ? false : baseIsTransitive,
        isYawi: parsedVerb.isYawi,
        ruleBase,
        fullRuleBase,
        canonicalRuleBase,
        canonicalFullRuleBase,
        rootPlusYaBase: parsedVerb.rootPlusYaBase,
        // Intransitives that can form nonactive -uwa should also be able to form type-two causatives
        // by dropping -uwa and adding -tia (with m->n before t where applicable).
        allowTypeTwo: baseIsTransitive
            || allowTypeTwoIntransitiveA
            || allowTypeTwoIntransitiveNiUwa
            || allowTypeTwoIntransitiveU
            || allowTypeTwoIntransitiveUwa,
        hasLeadingDash: parsedVerb.hasLeadingDash === true,
        parsedVerb,
    });
    if (!options.length) {
        return {
            verb,
            analysisVerb,
            isYawi,
            causativeAllStems: null,
            noCausativeStem: true,
            suppletiveStemSet,
        };
    }
    const prefix = causativeSource.prefix || "";
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const stemEntries = options.map((option) => {
        const baseStem = prefix ? `${prefix}${option.stem}` : option.stem;
        const surfaceStem = applyEmbeddedPrefixToStem(baseStem, embeddedPrefix, directionalPrefix);
        return {
            baseStem,
            surfaceStem,
            preferred: option.preferred === true,
        };
    });
    const causativeAllStems = stemEntries.map((entry) => entry.surfaceStem);
    const preferredEntry = stemEntries.find((entry) => entry.preferred);
    const selectedEntry = preferredEntry || stemEntries[0];
    const selectedStem = selectedEntry ? selectedEntry.surfaceStem : (verb || "");
    const baseSelectedStem = selectedEntry ? selectedEntry.baseStem : selectedStem;
    let nextAnalysis = baseSelectedStem;
    if (directionalPrefix && baseSelectedStem.startsWith(directionalPrefix)) {
        nextAnalysis = baseSelectedStem.slice(directionalPrefix.length);
    }
    return {
        verb: selectedStem,
        analysisVerb: nextAnalysis,
        isYawi: false,
        causativeAllStems,
        noCausativeStem: false,
        suppletiveStemSet,
    };
}

function getApplicativeDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const ruleBase = getCanonicalRuleBaseFromOptions(source, options);
    const fullRuleBase = options.canonicalFullRuleBase
        || (options.parsedVerb && options.parsedVerb.canonicalFullRuleBase)
        || (options.parsedVerb && options.parsedVerb.canonical && options.parsedVerb.canonical.fullRuleBase)
        || (options.verbMeta && options.verbMeta.canonicalFullRuleBase)
        || (options.verbMeta && options.verbMeta.canonical && options.verbMeta.canonical.fullRuleBase)
        || normalizeRuleBase(options.fullRuleBase || "");
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }
    const isTransitive = options.isTransitive === true;
    const isIntransitive = options.isTransitive === false ? true : !isTransitive;
    const rules = DERIVATIONAL_RULES?.applicative || {};
    const info = getNonactiveBaseInfo(ruleBase);
    const extractExampleBases = (examples) => (
        Array.isArray(examples)
            ? examples.map((entry) => String(entry || "").split("->")[0].trim()).filter(Boolean)
            : []
    );
    const results = [];
    const seen = new Set();
    const push = (stem, meta = {}) => {
        if (!stem) {
            return;
        }
        const key = stem;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ stem, ...meta });
    };
    const normalizeExceptionStems = (list) => (
        Array.isArray(list)
            ? list.map((stem) => String(stem || "").replace(/^-+/, "")).filter(Boolean)
            : []
    );
    const matchesExceptionBase = (base, entry) => {
        if (!base) {
            return false;
        }
        const applyToPrefixes = entry?.applyToPrefixes === true;
        if (matchesDerivationRuleBaseList([base], ruleBase, fullRuleBase)) {
            return true;
        }
        if (!applyToPrefixes) {
            return false;
        }
        const redupRuleBase = getNonReduplicatedRoot(ruleBase) || ruleBase;
        const redupFull = fullRuleBase ? (getNonReduplicatedRoot(fullRuleBase) || fullRuleBase) : "";
        return redupRuleBase.endsWith(base) || (redupFull && redupFull.endsWith(base));
    };
    const exceptions = rules.exceptions && typeof rules.exceptions === "object"
        ? rules.exceptions
        : {};
    for (const [key, entry] of Object.entries(exceptions)) {
        if (!entry || typeof entry !== "object") {
            continue;
        }
        const base = entry.base || key;
        if (!matchesExceptionBase(base, entry)) {
            continue;
        }
        const directStems = normalizeExceptionStems(entry.directStems);
        const applicativeStems = normalizeExceptionStems(entry.applicativeStems);
        const singleStem = typeof entry.applicativeStem === "string"
            ? entry.applicativeStem.replace(/^-+/, "")
            : "";
        directStems.forEach((stem) => push(stem, { type: "exception", rule: "direct" }));
        applicativeStems.forEach((stem) => push(stem, { type: "exception", rule: "applicative" }));
        if (singleStem) {
            push(singleStem, { type: "exception", rule: "applicative" });
        }
        return results;
    }
    if (options.allowValenceNeutral === true) {
        const valenceNeutral = rules.valenceNeutralPairs || {};
        const neutralVerbs = Array.isArray(valenceNeutral?.verbs) ? valenceNeutral.verbs : [];
        const neutralSuffixes = Array.isArray(valenceNeutral?.suffixes) ? valenceNeutral.suffixes : [];
        const matchesNeutralSuffix = (base) => neutralSuffixes.some((suffix) => (
            suffix
            && base.endsWith(suffix)
            && base.length > suffix.length
        ));
        const isNeutral = matchesDerivationRuleBaseList(neutralVerbs, ruleBase, fullRuleBase)
            || matchesNeutralSuffix(ruleBase)
            || (fullRuleBase && matchesNeutralSuffix(fullRuleBase));
        if (isIntransitive && isNeutral) {
            push(ruleBase, { type: "neutral", rule: "valence-neutral" });
            return results;
        }
    }
    const rootPlusYaBase = typeof options.rootPlusYaBase === "string" ? options.rootPlusYaBase : "";
    const isRootPlusYa = Boolean(rootPlusYaBase)
        || options.parsedVerb?.isRootPlusYa === true
        || options.parsedVerb?.rootPlusYaBase;
    const inferWiStockFormative = (baseStem) => {
        if (!baseStem) {
            return "";
        }
        const rootBase = getNonReduplicatedRoot(baseStem) || baseStem;
        const letters = splitVerbLetters(rootBase);
        if (!letters.length) {
            return "";
        }
        if (letters[letters.length - 1] === "l") {
            return "i";
        }
        for (let i = letters.length - 1; i >= 0; i -= 1) {
            const letter = letters[i];
            if (!isVerbLetterVowel(letter)) {
                continue;
            }
            if (letter === "e" || letter === "a") {
                return "i";
            }
            if (letter === "i" || letter === "u") {
                return "a";
            }
            return "";
        }
        return "";
    };
    const uaStockFormativeU = Array.isArray(rules?.uaStockFormativeU)
        ? rules.uaStockFormativeU
        : [];
    const uaLia = Array.isArray(rules?.uaLia)
        ? rules.uaLia
        : [];
    const uaLiaKeepYa = Array.isArray(rules?.uaLiaKeepYa)
        ? rules.uaLiaKeepYa
        : [];
    const matchesUaStock = matchesDerivationRuleBaseList(uaStockFormativeU, ruleBase, fullRuleBase);
    const matchesUaLia = matchesDerivationRuleBaseList(uaLia, ruleBase, fullRuleBase);
    if (
        info.isClassC
        && (ruleBase.endsWith("ia") || ruleBase.endsWith("ua"))
    ) {
        const syllables = splitVerbSyllables(ruleBase);
        let lastCoda = "";
        for (let i = syllables.length - 1; i >= 0; i -= 1) {
            if (syllables[i]?.coda) {
                lastCoda = syllables[i].coda;
                break;
            }
        }
        if (lastCoda === "l" && ruleBase.endsWith("ua")) {
            push(`${ruleBase.slice(0, -2)}wia`, { type: "class-c", rule: "class-c-l-wia" });
            return results;
        }
        if (!lastCoda && isIntransitive) {
            push(`${ruleBase.slice(0, -2)}ilwia`, { type: "class-c", rule: "class-c-ilwia" });
            return results;
        }
    }
    if (isTransitive && (ruleBase.endsWith("ua") || matchesUaStock || matchesUaLia)) {
        let baseStem = ruleBase.endsWith("ua") ? ruleBase.slice(0, -2) : ruleBase;
        if (matchesUaLia) {
            const keepYa = matchesDerivationRuleBaseList(uaLiaKeepYa, ruleBase, fullRuleBase);
            if (keepYa) {
                baseStem = ruleBase;
            } else if (ruleBase.endsWith("ya")) {
                baseStem = ruleBase.slice(0, -2);
            } else if (ruleBase.endsWith("ua")) {
                baseStem = ruleBase.slice(0, -1);
            } else if (ruleBase.endsWith("a")) {
                baseStem = ruleBase.slice(0, -1);
            }
            push(`${baseStem}lia`, { type: "class-c", rule: "class-c-ua-lia" });
            return results;
        }
        let stockFormative = matchesUaStock ? "u" : inferWiStockFormative(baseStem);
        if (
            !stockFormative
            && options.parsedVerb?.hasOptionalSupportiveI
            && baseStem
            && !VOWEL_RE.test(baseStem)
        ) {
            stockFormative = inferWiStockFormative(`i${baseStem}`);
        }
        if (stockFormative) {
            push(
                `${baseStem}${stockFormative}lwia`,
                { type: "class-c", rule: "class-c-ua-stock-formative" },
            );
            return results;
        }
    }
    const syllableCount = info.nonRedupSyllableCount || info.syllableCount;
    const fusionPrefixes = Array.isArray(options.parsedVerb?.fusionPrefixes)
        ? options.parsedVerb.fusionPrefixes
        : [];
    const fusionStrippedBase = fusionPrefixes.length
        ? stripLeadingPrefixes(ruleBase, fusionPrefixes)
        : ruleBase;
    const classDBase = getNonReduplicatedRoot(fusionStrippedBase) || fusionStrippedBase;
    const classDSyllableCount = classDBase
        ? getSyllables(classDBase, { analysis: true, assumeFinalV: true }).length
        : syllableCount;
    const isDirectClassD = classDSyllableCount === 1;
    const blockReplaciveNucleus = isRootPlusYa || (isTransitive && ruleBase.endsWith("ya"));
    const blockReplaciveOnsetForShort = isShortReplaciveOnsetBase(ruleBase);
    const nonRedupRoot = getNonReduplicatedRoot(ruleBase);
    const clusterBase = nonRedupRoot || ruleBase;
    const clusterAfterDeletion = createsConsonantClusterAfterFinalDeletion(clusterBase);
    const allowIntransitive = info.endsWithNucleusA
        || (info.endsWithNucleusI && info.lastOnset === "w")
        || clusterAfterDeletion;
    const allowTypeOne = (isTransitive || allowIntransitive)
        && !info.isClassC
        && !isRootPlusYa
        && (!isDirectClassD || ruleBase.endsWith("kwi"))
        && (info.lastOnset !== "k" || clusterAfterDeletion)
        && !(info.lastOnset === "t" && info.lastNucleus === "a")
        && !(isIntransitive && info.endsWithU)
        && !(isTransitive && info.lastOnset === "y");
    if (allowTypeOne) {
        const dropped = dropFinalVowel(ruleBase);
        if (dropped) {
            let stemBase = dropped;
            if (!blockReplaciveOnsetForShort && !info.penultimateHasCoda && stemBase.endsWith("tz")) {
                stemBase = `${stemBase.slice(0, -2)}ch`;
            } else if (stemBase.endsWith("s")) {
                stemBase = `${stemBase.slice(0, -1)}sh`;
            }
            push(`${stemBase}ia`, { type: "type-one", rule: "drop-final-vowel" });
        }
    }
    const nonactiveOptions = getNonactiveDerivationOptions(ruleBase, ruleBase, {
        isTransitive,
        isYawi: options.isYawi === true,
        ruleBase,
        rootPlusYaBase,
    });
    let luOptions = nonactiveOptions.filter((option) => option.suffix === "lu" && option.stem);
    if (isRootPlusYa) {
        const retainedYaStem = `${ruleBase}lu`;
        luOptions = luOptions.filter((option) => option.stem !== retainedYaStem);
    }
    if (isIntransitive && info.endsWithU) {
        const uRules = DERIVATIONAL_RULES?.causative?.intransitiveEndsWithU || {};
        const waRules = uRules?.nonactiveWa?.typeTwo || {};
        const additionBases = Array.isArray(waRules?.addition?.verbs)
            ? waRules.addition.verbs
            : extractExampleBases(waRules?.addition?.examples);
        const replacementBases = Array.isArray(waRules?.replacement?.verbs)
            ? waRules.replacement.verbs
            : extractExampleBases(waRules?.replacement?.examples);
        const matchBase = (baseList) => matchesDerivationRuleBaseList(baseList, ruleBase, fullRuleBase);
        const hasNonactiveWa = nonactiveOptions.some((option) => option.suffix === "wa");
        if (hasNonactiveWa) {
            const useAddition = additionBases.length ? matchBase(additionBases) : true;
            const useReplacement = replacementBases.length ? matchBase(replacementBases) : true;
            if (useAddition) {
                push(`${ruleBase}wia`, { type: "type-two", rule: "u-wa-wia" });
            }
            if (useReplacement) {
                push(`${ruleBase.slice(0, -1)}awia`, { type: "type-two", rule: "u-wa-wia-replace" });
            }
        }
        if (luOptions.length) {
            luOptions.forEach((option) => {
                let baseStem = option.stem;
                if (baseStem.endsWith("lu")) {
                    baseStem = baseStem.slice(0, -1);
                }
                if (baseStem) {
                    push(`${baseStem}tia`, { type: "type-two", rule: "u-lu-tia" });
                }
            });
        }
        return results;
    }
    if (!luOptions.length && isIntransitive && info.endsWithNucleusI) {
        luOptions = [{ suffix: "lu", stem: `${ruleBase}lu` }];
    }
    luOptions.forEach((option) => {
        let baseStem = option.stem;
        if (baseStem.endsWith("lu")) {
            baseStem = baseStem.slice(0, -1);
        }
        const letters = splitVerbLetters(baseStem);
        if (!letters.length) {
            return;
        }
        let coda = "";
        if (isVerbLetterConsonant(letters[letters.length - 1])) {
            coda = letters.pop();
        }
        if (!letters.length) {
            return;
        }
        const nucleusIndex = letters.length - 1;
        const onsetIndex = letters.length - 2;
        const lastNucleus = letters[nucleusIndex];
        const lastOnset = onsetIndex >= 0 ? letters[onsetIndex] : "";
        const blockReplaciveForCluster = info.isClassC && clusterAfterDeletion;
        const allowReplaciveOnset = !isRootPlusYa && !isDirectClassD && !info.isClassC;
        const allowSaChange = lastNucleus === "i" || lastNucleus === "a";
        const allowTzChange = allowSaChange && !info.penultimateHasCoda;
        if (allowReplaciveOnset) {
            if (allowTzChange && lastOnset === "tz") {
                letters[onsetIndex] = "ch";
            } else if (allowSaChange && lastOnset === "s") {
                letters[onsetIndex] = "sh";
            } else if (!blockReplaciveOnsetForShort && lastOnset === "t" && ruleBase !== "pata") {
                const prevLetter = letters[onsetIndex - 1] || "";
                if (!isVerbLetterConsonant(prevLetter)) {
                    letters[onsetIndex] = "ch";
                }
            }
        }
        if (lastNucleus === "a" && !isDirectClassD && !blockReplaciveNucleus && !blockReplaciveForCluster) {
            letters[nucleusIndex] = "i";
        }
        const adjustedBase = `${letters.join("")}${coda}`;
        push(`${adjustedBase}ia`, { type: "type-two", rule: "nonactive-lu" });
    });
    return results;
}

function applyApplicativeDerivation({
    isApplicative,
    verb,
    analysisVerb,
    objectPrefix,
    parsedVerb,
    directionalPrefix,
    isYawi,
    suppletiveStemSet,
}) {
    if (!isApplicative) {
        return {
            verb,
            analysisVerb,
            isYawi,
            applicativeAllStems: null,
            noApplicativeStem: false,
            suppletiveStemSet,
        };
    }
    suppletiveStemSet = null;
    const canonicalRuleBase = parsedVerb?.canonicalRuleBase || parsedVerb?.canonical?.ruleBase || "";
    const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase || parsedVerb?.canonical?.fullRuleBase || "";
    const applicativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    const ruleBase = canonicalRuleBase
        || getNonactiveRuleBase(applicativeSource.baseVerb, parsedVerb);
    const fullRuleBase = canonicalFullRuleBase || applicativeSource.baseVerb || "";
    const explicitSlots = Number.isFinite(parsedVerb.totalValenceSlotCount)
        ? Math.max(0, Math.min(2, parsedVerb.totalValenceSlotCount))
        : 0;
    const baseSlots = explicitSlots > 0
        ? explicitSlots
        : Math.max(0, getBaseObjectSlots(parsedVerb) - (parsedVerb.derivationValencyDelta || 0));
    let baseIsTransitive = baseSlots > 0;
    if (
        !baseIsTransitive
        && BASIC_DATA_CANONICAL_MAP.size
        && (canonicalFullRuleBase || canonicalRuleBase)
        && (
            parsedVerb.hasBoundMarker
            || parsedVerb.hasSlashMarker
            || parsedVerb.hasSuffixSeparator
            || parsedVerb.hasCompoundMarker
        )
    ) {
        const key = String(canonicalFullRuleBase || canonicalRuleBase).toLowerCase();
        const info = BASIC_DATA_CANONICAL_MAP.get(key);
        if (info && info.transitive && !info.intransitive) {
            baseIsTransitive = true;
        }
    }
    const options = getApplicativeDerivationOptions(ruleBase, ruleBase, {
        isTransitive: baseIsTransitive,
        ruleBase,
        fullRuleBase,
        canonicalRuleBase,
        canonicalFullRuleBase,
        hasLeadingDash: parsedVerb?.hasLeadingDash === true,
        rootPlusYaBase: parsedVerb?.rootPlusYaBase || "",
        parsedVerb,
    });
    if (!options.length) {
        return {
            verb,
            analysisVerb,
            isYawi,
            applicativeAllStems: null,
            noApplicativeStem: true,
            suppletiveStemSet,
        };
    }
    const prefix = applicativeSource.prefix || "";
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const stemEntries = options.map((option) => {
        const baseStem = prefix ? `${prefix}${option.stem}` : option.stem;
        const surfaceStem = applyEmbeddedPrefixToStem(baseStem, embeddedPrefix, directionalPrefix);
        return {
            baseStem,
            surfaceStem,
            preferred: option.preferred === true,
        };
    });
    const applicativeAllStems = stemEntries.map((entry) => entry.surfaceStem);
    const preferredEntry = stemEntries.find((entry) => entry.preferred);
    const selectedEntry = preferredEntry || stemEntries[0];
    const selectedStem = selectedEntry ? selectedEntry.surfaceStem : (verb || "");
    const baseSelectedStem = selectedEntry ? selectedEntry.baseStem : selectedStem;
    let nextAnalysis = baseSelectedStem;
    if (directionalPrefix && baseSelectedStem.startsWith(directionalPrefix)) {
        nextAnalysis = baseSelectedStem.slice(directionalPrefix.length);
    }
    return {
        verb: selectedStem,
        analysisVerb: nextAnalysis,
        isYawi: false,
        applicativeAllStems,
        noApplicativeStem: false,
        suppletiveStemSet,
    };
}

function countFusionPrefixes(fusionPrefixes, boundPrefixes) {
    const candidates = fusionPrefixes.length ? fusionPrefixes : boundPrefixes;
    return candidates.filter((prefix) => FUSION_PREFIXES.has(prefix)).length;
}

function getTypeTwoCausativeSuffixes() {
    const suffixes = new Set();
    const typeTwoSuffix = DERIVATIONAL_RULES?.causative?.typeTwo?.suffix;
    if (typeof typeTwoSuffix === "string" && typeTwoSuffix) {
        suffixes.add(typeTwoSuffix);
    }
    suffixes.add("wia");
    suffixes.add("awia");
    suffixes.add("lia");
    return Array.from(suffixes);
}

function getInferredCausativeValencyDelta(verbMeta) {
    if (!verbMeta || !verbMeta.isMarkedTransitive) {
        return 0;
    }
    const ruleBase = normalizeRuleBase(getDerivationRuleBase(verbMeta.analysisVerb || verbMeta.verb || "", verbMeta));
    if (!ruleBase) {
        return 0;
    }
    const suffixes = getTypeTwoCausativeSuffixes();
    if (!suffixes.length) {
        return 0;
    }
    if (!suffixes.some((suffix) => suffix && ruleBase.endsWith(suffix))) {
        return 0;
    }
    return 1;
}

function getBaseObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    let baseSlots = 0;
    const valenceSlots = Number.isFinite(verbMeta.valenceSlotCount)
        ? Math.max(0, Math.min(2, verbMeta.valenceSlotCount))
        : null;
    const totalSlots = Number.isFinite(verbMeta.totalValenceSlotCount)
        ? Math.max(0, Math.min(2, verbMeta.totalValenceSlotCount))
        : null;
    if (totalSlots && totalSlots > 0) {
        baseSlots = totalSlots;
    } else if (valenceSlots && valenceSlots > 0) {
        baseSlots = valenceSlots;
    } else {
        if (verbMeta.isMarkedTransitive || verbMeta.isTaFusion) {
            baseSlots = 1;
        } else {
            baseSlots = verbMeta.hasLeadingDash ? 1 : 0;
        }
    }
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    const inferredDelta = delta ? 0 : getInferredCausativeValencyDelta(verbMeta);
    const totalDelta = delta + inferredDelta;
    if (!totalDelta) {
        return baseSlots;
    }
    return Math.max(0, Math.min(2, baseSlots + totalDelta));
}

function getDirectActiveObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    const currentSlots = getBaseObjectSlots(verbMeta);
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    return Math.max(0, Math.min(2, currentSlots - delta));
}

function getValencyFromDirectActive(verbMeta) {
    const directActiveSlots = getDirectActiveObjectSlots(verbMeta);
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    const activeSlots = Math.max(0, Math.min(2, directActiveSlots + delta));
    const nonactiveSlots = Math.max(0, activeSlots - 1);
    return {
        directActiveSlots,
        activeSlots,
        nonactiveSlots,
    };
}

function getFusionObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    const fusionPrefixes = Array.isArray(verbMeta.fusionPrefixes) ? verbMeta.fusionPrefixes : [];
    const boundPrefixes = Array.isArray(verbMeta.boundPrefixes) ? verbMeta.boundPrefixes : [];
    return countFusionPrefixes(fusionPrefixes, boundPrefixes);
}

function getAvailableObjectSlots(verbMeta) {
    const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
    return Math.max(0, getBaseObjectSlots(verbMeta) - getFusionObjectSlots(verbMeta) - embeddedSlots);
}

function getActiveVerbValency(verbMeta) {
    const objectSlots = getBaseObjectSlots(verbMeta);
    if (objectSlots <= 0) {
        return 1;
    }
    if (objectSlots === 1) {
        return 2;
    }
    return 3;
}

function getVerbValencySummary(verbMeta) {
    const valency = getValencyFromDirectActive(verbMeta);
    const baseObjectSlots = valency.activeSlots;
    const fusionObjectSlots = getFusionObjectSlots(verbMeta);
    const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
    const availableObjectSlots = Math.max(0, baseObjectSlots - fusionObjectSlots - embeddedSlots);
    const baseValency = baseObjectSlots + 1;
    const nonactiveValency = Math.max(0, baseValency - 1);
    const nonactiveObjectSlots = Math.max(0, valency.nonactiveSlots - fusionObjectSlots - embeddedSlots);
    return {
        baseObjectSlots,
        fusionObjectSlots,
        availableObjectSlots,
        baseValency,
        nonactiveValency,
        nonactiveObjectSlots,
        directActiveObjectSlots: valency.directActiveSlots,
    };
}

function getNonactiveObjectPrefixGroups(verbMeta) {
    const summary = getVerbValencySummary(verbMeta);
    if (summary.baseObjectSlots <= 0) {
        return {
            baseSlots: summary.baseObjectSlots,
            availableSlots: summary.nonactiveObjectSlots,
            groups: [{ prefixes: [""] }],
        };
    }
    const directPrefixes = Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
    return {
        baseSlots: summary.baseObjectSlots,
        availableSlots: summary.nonactiveObjectSlots,
        groups: buildObjectPrefixGroups(directPrefixes),
    };
}

function truncateNonactiveBase(stem, options = {}) {
    const letters = splitVerbLetters(stem);
    if (!letters.length) {
        return stem;
    }
    if (isVerbLetterVowel(letters[letters.length - 1])) {
        letters.pop();
    }
    let base = letters.join("");
    if (base.endsWith("kw")) {
        base = base.slice(0, -2) + "k";
    }
    if (base.endsWith("s")) {
        base = base.slice(0, -1) + "sh";
    }
    if (options.dropFinalW && base.endsWith("w")) {
        base = base.slice(0, -1);
    }
    if (options.tzToCh && base.endsWith("tz")) {
        base = base.slice(0, -2) + "ch";
    }
    return base;
}

function isShortReplaciveOnsetBase(value) {
    const base = getNonReduplicatedRoot(value) || value || "";
    if (!base) {
        return false;
    }
    const letters = splitVerbLetters(base);
    return letters.length <= 3;
}

function buildWaOnsetVariant(stem, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const last = letters[letters.length - 1];
    if (!isVerbLetterVowel(last)) {
        return null;
    }
    const onsetIndex = letters.length - 2;
    const onset = letters[onsetIndex];
    if (onset === "s") {
        if (options.blockOnsetReplacement) {
            return null;
        }
        letters[onsetIndex] = "sh";
    } else if (onset === "t") {
        if (options.blockCh || options.blockOnsetReplacement) {
            return null;
        }
        letters[onsetIndex] = "ch";
    } else {
        return null;
    }
    return `${letters.join("")}wa`;
}

function buildNonactiveUStem(stem, lastOnset, lastNucleus, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const lastIndex = letters.length - 1;
    if (!isVerbLetterVowel(letters[lastIndex])) {
        return null;
    }
    if (!lastOnset) {
        return null;
    }
    const blockOnsetReplacement = options.blockOnsetReplacement === true;
    const onsetIndex = lastIndex - 1;
    if (lastOnset === "t" && lastNucleus === "i") {
        if (!options.blockCh && !blockOnsetReplacement) {
            letters[onsetIndex] = "ch";
        }
    } else if (lastOnset === "s") {
        if (!blockOnsetReplacement) {
            letters[onsetIndex] = "sh";
        }
    } else if (lastOnset === "tz") {
        if (!options.blockCh && !blockOnsetReplacement) {
            letters[onsetIndex] = "ch";
        }
    } else if (lastOnset === "kw" && lastNucleus === "i") {
        // If kw is preceded by a consonant (i.e. kw is part of a larger cluster like j+k+w),
        // we don't form a -u nonactive at all for this path (e.g. -majkwi should not yield majku/majkwu).
        const prevLetter = letters[onsetIndex - 1] || "";
        if (isVerbLetterConsonant(prevLetter)) {
            return null;
        }
        letters[onsetIndex] = "k";
    }
    letters[lastIndex] = "u";
    return letters.join("");
}

function buildNonactiveUwaStem(stem, lastOnset, lastNucleus, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const lastIndex = letters.length - 1;
    if (!isVerbLetterVowel(letters[lastIndex])) {
        return null;
    }
    if (!lastOnset) {
        return null;
    }
    const blockOnsetReplacement = options.blockOnsetReplacement === true;
    const onsetIndex = lastIndex - 1;
    if (lastOnset === "w") {
        letters.splice(onsetIndex, 2);
    } else {
        if (lastOnset === "s") {
            if (!blockOnsetReplacement) {
                letters[onsetIndex] = "sh";
            }
        } else if (lastOnset === "tz") {
            if (!options.blockCh && !blockOnsetReplacement) {
                letters[onsetIndex] = "ch";
            }
        } else if (lastOnset === "t") {
            if (!options.blockCh && !blockOnsetReplacement) {
                letters[onsetIndex] = "ch";
            }
        }
        letters.splice(lastIndex, 1);
    }
    return `${letters.join("")}uwa`;
}


function getNonactiveBaseInfo(ruleBase) {
    const letters = splitVerbLetters(ruleBase);
    const letterCount = letters.length;
    const last = letters[letterCount - 1] || "";
    const prev = letters[letterCount - 2] || "";
    const prev2 = letters[letterCount - 3] || "";
    const prevVowel = getPreviousVowel(letters, letterCount - 3);
    const endsWithA = last === "a";
    const endsWithI = last === "i";
    const endsWithU = last === "u";
    const endsWithYa = ruleBase.endsWith("ya");
    const endsWithTa = ruleBase.endsWith("ta");
    const endsWithTi = ruleBase.endsWith("ti");
    const endsWithTV = isVerbLetterVowel(last) && prev === "t";
    const endsWithNa = ruleBase.endsWith("na");
    const endsWithSa = ruleBase.endsWith("sa");
    const isClassC = endsWithAny(ruleBase, IA_UA_SUFFIXES);
    const endsWithKwi = ruleBase.endsWith("kwi");
    const endsWithTzi = ruleBase.endsWith("tzi");
    const endsWithSi = ruleBase.endsWith("si");
    const endsWithMi = ruleBase.endsWith("mi");
    const endsWithNi = ruleBase.endsWith("ni");
    const endsWithWi = ruleBase.endsWith("wi");
    const endsWithJsA = endsWithA && prev === "s" && prev2 === "j";
    const endsWithMV = prev === "m" && (endsWithA || endsWithI);
    const endsWithConsonantCluster = createsConsonantClusterAfterFinalDeletion(ruleBase);
    const endsWithTzV = isVerbLetterVowel(last) && prev === "tz";
    const endsWithChi = endsWithI && prev === "ch";
    const hasMultipleTz = ruleBase.indexOf("tz") !== ruleBase.lastIndexOf("tz");
    const syllables = getSyllables(ruleBase, { analysis: true, assumeFinalV: true });
    const syllableCount = syllables.length;
    const lastSyllable = syllables[syllableCount - 1] || null;
    const penultimateSyllable = syllables[syllableCount - 2] || null;
    const lastNucleus = lastSyllable?.nucleus || "";
    const lastOnset = lastSyllable?.onset || "";
    const penultimateNucleus = penultimateSyllable?.nucleus || "";
    const penultimateCoda = penultimateSyllable?.coda || "";
    const penultimateHasCoda = Boolean(penultimateCoda);
    const preTiConsonant = endsWithTi && isVerbLetterConsonant(prev2);
    const endsWithNucleusI = lastNucleus === "i";
    const endsWithNucleusA = lastNucleus === "a";
    const endsWithNucleusU = lastNucleus === "u";
    const nonRedupRoot = getNonReduplicatedRoot(ruleBase);
    const nonRedupSyllableCount = nonRedupRoot
        ? getSyllables(nonRedupRoot, { analysis: true, assumeFinalV: true }).length
        : 0;
    const isVowelMonosyllable = letterCount === 1 && isVerbLetterVowel(last);
    return {
        letterCount,
        last,
        prev,
        prev2,
        prevVowel,
        endsWithA,
        endsWithI,
        endsWithU,
        endsWithYa,
        endsWithTa,
        endsWithTi,
        endsWithTV,
        endsWithNa,
        endsWithSa,
        isClassC,
        endsWithKwi,
        endsWithTzi,
        endsWithSi,
        endsWithMi,
        endsWithNi,
        endsWithWi,
        endsWithJsA,
        endsWithMV,
        endsWithConsonantCluster,
        endsWithTzV,
        endsWithChi,
        hasMultipleTz,
        lastNucleus,
        lastOnset,
        penultimateNucleus,
        penultimateHasCoda,
        preTiConsonant,
        endsWithNucleusI,
        endsWithNucleusA,
        endsWithNucleusU,
        syllableCount,
        nonRedupSyllableCount,
        isVowelMonosyllable,
    };
}

function getNonactiveCandidateParts(info) {
    const {
        lastOnset,
        prev,
        prev2,
        penultimateHasCoda,
        penultimateNucleus,
        endsWithNucleusA,
        endsWithNucleusI,
        syllableCount,
        nonRedupSyllableCount,
    } = info;
    const isMonosyllable = syllableCount === 1 || nonRedupSyllableCount === 1;
    const blockUForWaWi = lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && penultimateHasCoda;
    const blockUwaForPenultimateU = lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && penultimateNucleus === "u";
    const blockUwaForCoda = penultimateHasCoda
        && (lastOnset === "tz" || lastOnset === "t");
    const allowUwaFromT = lastOnset === "t" && (endsWithNucleusA || endsWithNucleusI);
    const allowUFromKNS = ["k", "n", "s"].includes(lastOnset) && (endsWithNucleusA || endsWithNucleusI);
    const allowUFromM = lastOnset === "m" && endsWithNucleusI;
    // For kw+i, a preceding coda creates a larger consonant cluster (e.g. -majkwi),
    // and we don't allow the -u nonactive on this path.
    const allowUFromKwI = lastOnset === "kw" && endsWithNucleusI && !penultimateHasCoda;
    const allowUFromT = lastOnset === "t" && endsWithNucleusI;
    const allowUFromTz = lastOnset === "tz" && endsWithNucleusA;
    const allowUFromTTa = lastOnset === "t" && endsWithNucleusA && prev === "t" && prev2 === "t";
    return {
        isMonosyllable,
        blockUForWaWi,
        blockUwaForPenultimateU,
        blockUwaForCoda,
        allowUwaFromT,
        allowUFromKNS,
        allowUFromM,
        allowUFromKwI,
        allowUFromT,
        allowUFromTz,
        allowUFromTTa,
    };
}

function getPreviousVowel(letters, startIndex) {
    for (let i = Math.min(startIndex, letters.length - 1); i >= 0; i -= 1) {
        if (isVerbLetterVowel(letters[i])) {
            return letters[i];
        }
    }
    return "";
}

function stripLeadingPrefixes(stem, prefixes) {
    if (!stem || !prefixes.length) {
        return stem;
    }
    let result = stem;
    prefixes.forEach((prefix) => {
        if (result.startsWith(prefix)) {
            result = result.slice(prefix.length);
        }
    });
    return result;
}

function getEmbeddedVerbPrefix(parsedVerb) {
    if (!parsedVerb || !parsedVerb.verbSegment) {
        return "";
    }
    if (!parsedVerb.hasSuffixSeparator && !parsedVerb.hasCompoundMarker) {
        return "";
    }
    if (parsedVerb.hasBoundMarker) {
        return "";
    }
    const parts = parsedVerb.verbSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    if (parts.length <= 1) {
        return "";
    }
    const prefixParts = parts.slice(0, -1).filter((part) => (
        part && part !== "al" && !DIRECTIONAL_PREFIXES.includes(part)
    ));
    return prefixParts.length ? prefixParts.join("") : "";
}

function applyEmbeddedPrefixToStem(stem, embeddedPrefix, directionalPrefix = "") {
    if (!embeddedPrefix || !stem) {
        return stem;
    }
    if (stem.startsWith(embeddedPrefix)) {
        return stem;
    }
    if (directionalPrefix && stem.startsWith(directionalPrefix)) {
        return `${directionalPrefix}${embeddedPrefix}${stem.slice(directionalPrefix.length)}`;
    }
    return `${embeddedPrefix}${stem}`;
}

function deriveNonactiveStem(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const ruleBase = getCanonicalRuleBaseFromOptions(source, options);
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return source;
    }
    const optionsList = getNonactiveDerivationOptions(source, source, {
        isTransitive: options.isTransitive === true,
        isYawi: options.isYawi === true,
        ruleBase,
        rootPlusYaBase: options.rootPlusYaBase,
    });
    if (!optionsList || !optionsList.length) {
        return source;
    }
    const selectedSuffix = getDefaultNonactiveSuffix(optionsList);
    if (selectedSuffix) {
        const optionMap = buildNonactiveOptionMap(optionsList);
        const stems = optionMap.get(selectedSuffix) || [];
        if (stems.length) {
            return stems[0];
        }
    }
    return optionsList[0].stem || source;
}

function getDefaultNonactiveSuffix(options) {
    const available = new Set(options.map((option) => option.suffix));
    return NONACTIVE_SUFFIX_ORDER.find((suffix) => available.has(suffix)) || null;
}

function getPatientivoStemFromNonactive(stem, suffix, options = {}) {
    if (!stem || !suffix) {
        return [];
    }
    const baseInfo = options.baseInfo || null;
    const buildUVariants = (base) => {
        const isTransitive = options.isTransitive === true;
        const blankPossessiveW = (suffix === "u" && isTransitive)
            || (suffix === "uwa" && !isTransitive);
        if (!isTransitive && suffix === "uwa" && baseInfo && baseInfo.lastOnset === "w") {
            const wBase = base.endsWith("w") ? base : `${base}w`;
            return [{ stem: `${wBase}i`, suffix: "t", blankPossessiveW }];
        }
        let tiBase = base;
        if (tiBase.endsWith("m")) {
            tiBase = `${tiBase.slice(0, -1)}n`;
        }
        return [
            { stem: tiBase, suffix: "ti" },
            { stem: `${base}i`, suffix: "t", blankPossessiveW },
        ];
    };
    switch (suffix) {
        case "lu":
            return stem.endsWith("lu") ? [{ stem: stem.slice(0, -1), suffix: "" }] : [];
        case "luwa":
            return stem.endsWith("luwa") ? [{ stem: stem.slice(0, -3), suffix: "" }] : [];
        case "u":
            return stem.endsWith("u") ? buildUVariants(stem.slice(0, -1)) : [];
        case "uwa":
            return stem.endsWith("uwa") ? buildUVariants(stem.slice(0, -3)) : [];
        case "wa":
            return stem.endsWith("wa") ? [{ stem: stem.slice(0, -2), suffix: "t" }] : [];
        case "walu":
            return stem.endsWith("walu") ? [{ stem: stem.slice(0, -1), suffix: "" }] : [];
        default:
            return [];
    }
}

function buildPatientivoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    isTransitive,
    directionalPrefix = "",
    boundPrefix = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
}) {
    const analysisBase = analysisVerb || rawAnalysisVerb || "";
    const source = getDerivationRuleBase(analysisBase || verb || "", {
        analysisVerb: analysisBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    if (!source) {
        return [];
    }
    let base = source;
    let prefix = boundPrefix || "";
    if (!prefix && !hasImpersonalTaPrefix && verb) {
        const preferAnalysisPrefix = hasOptionalSupportiveI
            && analysisVerb
            && rawAnalysisVerb
            && analysisVerb !== rawAnalysisVerb
            && analysisVerb.startsWith("i")
            && !rawAnalysisVerb.startsWith("i");
        const prefixCandidates = preferAnalysisPrefix
            ? [analysisVerb]
            : [rawAnalysisVerb, analysisVerb].filter(Boolean);
        for (let i = 0; i < prefixCandidates.length; i += 1) {
            const candidate = prefixCandidates[i];
            if (candidate && verb.endsWith(candidate)) {
                prefix = verb.slice(0, -candidate.length);
                break;
            }
        }
    }
    if (directionalPrefix && base.startsWith(directionalPrefix)) {
        prefix = `${prefix}${directionalPrefix}`;
        base = base.slice(directionalPrefix.length);
    }
    if (hasImpersonalTaPrefix) {
        const impersonalPrefix = "ta";
        if (base.startsWith(impersonalPrefix)) {
            base = base.slice(impersonalPrefix.length);
        }
        prefix = `${prefix}${impersonalPrefix}`;
    }
    const baseLetters = splitVerbLetters(base);
    const baseLast = baseLetters[baseLetters.length - 1] || "";
    const basePrev = baseLetters[baseLetters.length - 2] || "";
    const basePrev2 = baseLetters[baseLetters.length - 3] || "";
    const baseEndsWithCluster = isVerbLetterVowel(baseLast)
        && isVerbLetterConsonant(basePrev)
        && isVerbLetterConsonant(basePrev2);
    const allowOriginalTVariant = isTransitive && baseEndsWithCluster && baseLast !== "i";
    const baseInfo = getNonactiveBaseInfo(base);
    let options = getNonactiveDerivationOptions(base, base, {
        isTransitive,
        isYawi,
        ruleBase: base,
        rootPlusYaBase,
    });
    if (!isTransitive && base.endsWith("ya") && base.length > 2) {
        const rootBase = rootPlusYaBase || base.slice(0, -2);
        const rootNonRedup = rootBase ? getNonReduplicatedRoot(rootBase) : "";
        const rootVowelCount = rootBase
            ? getTotalVowelCount(rootNonRedup || rootBase)
            : 0;
        if (rootVowelCount === 1) {
            const stripNonactiveSuffix = (stem, suffix) => {
                if (!stem || !suffix) {
                    return "";
                }
                return stem.endsWith(suffix) ? stem.slice(0, -suffix.length) : "";
            };
            const filtered = options.filter((option) => {
                const baseStem = stripNonactiveSuffix(option.stem, option.suffix);
                return baseStem && baseStem.endsWith("ya");
            });
            if (filtered.length) {
                options = filtered;
            }
        }
    }
    if (!options.length) {
        return [];
    }
    const results = [];
    const seen = new Set();
    options.forEach((option) => {
        const derivedList = getPatientivoStemFromNonactive(option.stem, option.suffix, {
            baseInfo,
            isTransitive,
        });
        if (!derivedList.length) {
            return;
        }
        derivedList.forEach((derived) => {
            if (derived.suffix === "ti") {
                const candidate = `${derived.stem}${derived.suffix}`;
                if (!isSyllableSequencePronounceable(candidate)) {
                    return;
                }
            }
            const nounStem = prefix ? `${prefix}${derived.stem}` : derived.stem;
            const key = `${nounStem}|${derived.suffix}`;
            if (seen.has(key)) {
                return;
            }
            seen.add(key);
            results.push({
                verb: nounStem,
                subjectSuffix: derived.suffix,
                blankPossessiveW: derived.blankPossessiveW,
            });
        });
    });
    if (allowOriginalTVariant) {
        const nounStem = prefix ? `${prefix}${base}` : base;
        const key = `${nounStem}|t`;
        if (!seen.has(key)) {
            seen.add(key);
            results.push({ verb: nounStem, subjectSuffix: "t" });
        }
    }
    return results;
}

function buildPatientivoPerfectivoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    isTransitive,
    directionalPrefix = "",
    boundPrefix = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    exactBaseVerb = "",
    suppletiveStemSet = null,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
}) {
    const analysisBase = analysisVerb || rawAnalysisVerb || "";
    const source = getDerivationRuleBase(analysisBase || verb || "", {
        analysisVerb: analysisBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    if (!source) {
        return [];
    }
    let base = source;
    let prefix = boundPrefix || "";
    if (!prefix && !hasImpersonalTaPrefix && verb) {
        const preferAnalysisPrefix = hasOptionalSupportiveI
            && analysisVerb
            && rawAnalysisVerb
            && analysisVerb !== rawAnalysisVerb
            && analysisVerb.startsWith("i")
            && !rawAnalysisVerb.startsWith("i");
        const prefixCandidates = preferAnalysisPrefix
            ? [analysisVerb]
            : [rawAnalysisVerb, analysisVerb].filter(Boolean);
        for (let i = 0; i < prefixCandidates.length; i += 1) {
            const candidate = prefixCandidates[i];
            if (candidate && verb.endsWith(candidate)) {
                prefix = verb.slice(0, -candidate.length);
                break;
            }
        }
    }
    if (directionalPrefix && base.startsWith(directionalPrefix)) {
        prefix = `${prefix}${directionalPrefix}`;
        base = base.slice(directionalPrefix.length);
    }
    if (hasImpersonalTaPrefix) {
        const impersonalPrefix = "ta";
        if (base.startsWith(impersonalPrefix)) {
            base = base.slice(impersonalPrefix.length);
        }
        prefix = `${prefix}${impersonalPrefix}`;
    }
    const context = buildPretUniversalContext(base, base, isTransitive, {
        isYawi,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        exactBaseVerb,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
    });
    const selectedClassKey = context.isMonosyllable
        ? "D"
        : (context.endsWithIaUa ? "C" : "A");
    const getPerfectiveStemBases = (classKey) => {
        if (!context || !classKey) {
            return [];
        }
        if (classKey === "D") {
            return context.monosyllableStemPath?.classDBase ? [context.monosyllableStemPath.classDBase] : [];
        }
        if (classKey === "C") {
            const replaced = getPerfectiveReplacementStem(context.verb, {
                isTransitive: context.isTransitive,
            });
            return replaced ? [replaced] : [];
        }
        return getPerfectiveAlternationStems(context.verb, {
            isTransitive: context.isTransitive,
            isRootPlusYa: context.fromRootPlusYa,
        });
    };
    const perfectiveBases = [];
    if (suppletiveStemSet && suppletiveStemSet.variantsByClass) {
        const variants = suppletiveStemSet.variantsByClass.get(selectedClassKey) || [];
        (variants || []).forEach((variant) => {
            if (variant?.base && !perfectiveBases.includes(variant.base)) {
                perfectiveBases.push(variant.base);
            }
        });
    } else {
        const bases = getPerfectiveStemBases(selectedClassKey);
        bases.forEach((baseValue) => {
            if (baseValue && !perfectiveBases.includes(baseValue)) {
                perfectiveBases.push(baseValue);
            }
        });
    }
    if (!perfectiveBases.length) {
        return [];
    }
    const fallbackAllowedFinals = new Set(["w", "k", "kw", "s", "sh", "n", "l", "tz", "p", "t"]);
    const allowedFinals = new Set(
        PATIENTIVO_PERFECTIVO_ALLOWED_FINALS.size
            ? PATIENTIVO_PERFECTIVO_ALLOWED_FINALS
            : fallbackAllowedFinals
    );
    if (selectedClassKey === "C") {
        const classCExtras = PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_C.size
            ? PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_C
            : new Set(["j"]);
        classCExtras.forEach((value) => allowedFinals.add(value));
    }
    if (selectedClassKey === "D") {
        const classDExtras = PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_D.size
            ? PATIENTIVO_PERFECTIVO_ALLOWED_FINALS_CLASS_D
            : new Set(["j"]);
        classDExtras.forEach((value) => allowedFinals.add(value));
    }
    const stripPerfectiveSuffix = (stem) => (stem.endsWith("tuk") ? stem.slice(0, -3) : stem);
    const endsWithAllowedFinal = (stem) => {
        const letters = splitVerbLetters(stem);
        const last = letters[letters.length - 1] || "";
        return allowedFinals.has(last);
    };
    const results = [];
    const seen = new Set();
    const addResult = (stemBase, suffix, applyMToN) => {
        let stem = stemBase;
        if (applyMToN && stem.endsWith("m")) {
            stem = `${stem.slice(0, -1)}n`;
        }
        const candidate = `${stem}${suffix}`;
        if (suffix === "ti" && !isSyllableSequencePronounceable(candidate)) {
            return;
        }
        const nounStem = prefix ? `${prefix}${stem}` : stem;
        const key = `${nounStem}|${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ verb: nounStem, subjectSuffix: suffix });
    };
    perfectiveBases.forEach((stemBase) => {
        const cleanedStem = stripPerfectiveSuffix(stemBase);
        if (!cleanedStem || !endsWithAllowedFinal(cleanedStem)) {
            return;
        }
        addResult(cleanedStem, "ti", true);
    });
    return results;
}

function getTClassSuffixForStem(stem) {
    const letters = splitVerbLetters(stem);
    const last = letters[letters.length - 1] || "";
    return isVerbLetterVowel(last) ? "t" : "ti";
}

function buildPatientivoImperfectivoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    directionalPrefix = "",
    boundPrefix = "",
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
}) {
    const analysisBase = analysisVerb || rawAnalysisVerb || "";
    const source = getDerivationRuleBase(analysisBase || verb || "", {
        analysisVerb: analysisBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    if (!source) {
        return [];
    }
    let base = source;
    let prefix = boundPrefix || "";
    if (!prefix && !hasImpersonalTaPrefix && verb) {
        const preferAnalysisPrefix = hasOptionalSupportiveI
            && analysisVerb
            && rawAnalysisVerb
            && analysisVerb !== rawAnalysisVerb
            && analysisVerb.startsWith("i")
            && !rawAnalysisVerb.startsWith("i");
        const prefixCandidates = preferAnalysisPrefix
            ? [analysisVerb]
            : [rawAnalysisVerb, analysisVerb].filter(Boolean);
        for (let i = 0; i < prefixCandidates.length; i += 1) {
            const candidate = prefixCandidates[i];
            if (candidate && verb.endsWith(candidate)) {
                prefix = verb.slice(0, -candidate.length);
                break;
            }
        }
    }
    if (directionalPrefix && base.startsWith(directionalPrefix)) {
        prefix = `${prefix}${directionalPrefix}`;
        base = base.slice(directionalPrefix.length);
    }
    if (hasImpersonalTaPrefix) {
        const impersonalPrefix = "ta";
        if (base.startsWith(impersonalPrefix)) {
            base = base.slice(impersonalPrefix.length);
        }
        prefix = `${prefix}${impersonalPrefix}`;
    }
    if (endsWithAny(base, IA_UA_SUFFIXES)) {
        base = base.slice(0, -1);
    }
    if (!base) {
        return [];
    }
    const nounStem = prefix ? `${prefix}${base}` : base;
    return [{ verb: nounStem, subjectSuffix: getTClassSuffixForStem(base) }];
}

function buildPatientivoTroncoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    isTransitive = false,
    directionalPrefix = "",
    boundPrefix = "",
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
}) {
    const analysisBase = analysisVerb || rawAnalysisVerb || "";
    const source = getDerivationRuleBase(analysisBase || verb || "", {
        analysisVerb: analysisBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    if (!source) {
        return [];
    }
    let base = source;
    let prefix = boundPrefix || "";
    if (!prefix && !hasImpersonalTaPrefix && verb) {
        const preferAnalysisPrefix = hasOptionalSupportiveI
            && analysisVerb
            && rawAnalysisVerb
            && analysisVerb !== rawAnalysisVerb
            && analysisVerb.startsWith("i")
            && !rawAnalysisVerb.startsWith("i");
        const prefixCandidates = preferAnalysisPrefix
            ? [analysisVerb]
            : [rawAnalysisVerb, analysisVerb].filter(Boolean);
        for (let i = 0; i < prefixCandidates.length; i += 1) {
            const candidate = prefixCandidates[i];
            if (candidate && verb.endsWith(candidate)) {
                prefix = verb.slice(0, -candidate.length);
                break;
            }
        }
    }
    if (directionalPrefix && base.startsWith(directionalPrefix)) {
        prefix = `${prefix}${directionalPrefix}`;
        base = base.slice(directionalPrefix.length);
    }
    if (hasImpersonalTaPrefix) {
        const impersonalPrefix = "ta";
        if (base.startsWith(impersonalPrefix)) {
            base = base.slice(impersonalPrefix.length);
        }
        prefix = `${prefix}${impersonalPrefix}`;
    }
    if (!base) {
        return [];
    }
    const isLuaEnding = base.endsWith("lua");
    const syllables = getSyllables(base, { analysis: true, assumeFinalV: true });
    if (syllables.length === 1) {
        return [];
    }
    const isWaFinalSyllable = (syllable) => (
        syllable?.form === "CV" && syllable.onset === "w" && syllable.nucleus === "a"
    );
    const endsWithVCCVwa = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "V"
            && tail[1]?.form === "C"
            && isWaFinalSyllable(tail[2]);
    })();
    const endsWithVCCVwi = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "V"
            && tail[1]?.form === "C"
            && tail[2]?.form === "CV"
            && tail[2]?.onset === "w"
            && tail[2]?.nucleus === "i";
    })();
    const endsWithVjCVwa = (() => {
        if (syllables.length >= 3) {
            const shortTail = syllables.slice(-3);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && isWaFinalSyllable(shortTail[2])) {
                return true;
            }
        }
        if (syllables.length >= 4) {
            const longTail = syllables.slice(-4);
            return longTail[0]?.form === "V"
                && longTail[1]?.form === "C"
                && longTail[1]?.onset === "j"
                && longTail[2]?.form === "CV"
                && isWaFinalSyllable(longTail[3]);
        }
        return false;
    })();
    const endsWithVjCVwi = (() => {
        if (syllables.length >= 2) {
            const shortTail = syllables.slice(-2);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && shortTail[1]?.onset === "w"
                && shortTail[1]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length >= 3) {
            const shortTail = syllables.slice(-3);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && shortTail[2]?.form === "CV"
                && shortTail[2]?.onset === "w"
                && shortTail[2]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length >= 4) {
            const longTail = syllables.slice(-4);
            return longTail[0]?.form === "V"
                && longTail[1]?.form === "C"
                && longTail[1]?.onset === "j"
                && longTail[2]?.form === "CV"
                && longTail[3]?.form === "CV"
                && longTail[3]?.onset === "w"
                && longTail[3]?.nucleus === "i";
        }
        return false;
    })();
    const endsWithVlCVwa = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "Vl"
            && tail[1]?.form === "CV"
            && isWaFinalSyllable(tail[2]);
    })();
    const endsWithVlCVwi = (() => {
        if (syllables.length >= 2) {
            const shortTail = syllables.slice(-2);
            if (shortTail[0]?.form === "Vl"
                && shortTail[1]?.form === "CV"
                && shortTail[1]?.onset === "w"
                && shortTail[1]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "Vl"
            && tail[1]?.form === "CV"
            && tail[2]?.form === "CV"
            && tail[2]?.onset === "w"
            && tail[2]?.nucleus === "i";
    })();
    if (
        endsWithVCCVwa
        || endsWithVCCVwi
        || endsWithVjCVwa
        || endsWithVjCVwi
        || endsWithVlCVwa
        || endsWithVlCVwi
    ) {
        return [];
    }
    const results = [];
    const seen = new Set();
    const normalizeStem = (stem) => {
        if (endsWithAny(stem, IA_UA_SUFFIXES)) {
            return stem.slice(0, -1);
        }
        return stem;
    };
    const addRawResult = (stem, suffix) => {
        const normalized = normalizeStem(stem);
        if (!normalized) {
            return;
        }
        const nounStem = prefix ? `${prefix}${normalized}` : normalized;
        const key = `${nounStem}|${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ verb: nounStem, subjectSuffix: suffix });
    };
    const addResult = (stem) => {
        const normalized = normalizeStem(stem);
        if (!normalized) {
            return;
        }
        const suffix = getTClassSuffixForStem(normalized);
        const nounStem = prefix ? `${prefix}${normalized}` : normalized;
        const key = `${nounStem}|${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ verb: nounStem, subjectSuffix: suffix });
    };
    if (isTransitive) {
        if (!isLuaEnding) {
            return [];
        }
        const core = base.slice(0, -2);
        addRawResult(core, "");
        return results;
    }
    const addWithConsonants = (stem, consonants) => {
        consonants.forEach((consonant) => {
            addResult(`${stem}${consonant}`);
        });
    };
    const isIwiAwi = base.endsWith("iwi") || base.endsWith("awi");
    if (isIwiAwi) {
        const coreDropAwi = base.slice(0, -3);
        const coreDropWi = base.slice(0, -2);
        const coreLetters = splitVerbLetters(coreDropAwi);
        const endsWithConsonant = coreLetters.length
            && isVerbLetterConsonant(coreLetters[coreLetters.length - 1]);
        const hasVowel = coreLetters.some((letter) => isVerbLetterVowel(letter));
        if (endsWithConsonant && hasVowel) {
            addWithConsonants(coreDropWi, ["sh", "k"]);
            addResult(coreDropAwi);
        }
    }
    if (!isIwiAwi && (base.endsWith("wi") || base.endsWith("wa"))) {
        const core = base.slice(0, -2);
        if (base.endsWith("wi")) {
            const coreLetters = splitVerbLetters(core);
            const lastCore = coreLetters[coreLetters.length - 1] || "";
            const coreNoV = isVerbLetterVowel(lastCore) ? core.slice(0, -1) : core;
            addWithConsonants(core, ["k", "ch"]);
            addResult(coreNoV);
        } else {
            addWithConsonants(core, ["k", "ch"]);
            addResult(core);
        }
    }
    if (base.endsWith("ni") || base.endsWith("na")) {
        const core = base.slice(0, -2);
        addWithConsonants(core, ["k", "sh", "s", "ch"]);
        if (base.endsWith("ni")) {
            addResult(core);
        }
    }
    if (base.endsWith("ka")) {
        const core = base.slice(0, -2);
        addWithConsonants(core, ["k", "ch", "j"]);
    }
    return results;
}

function buildNonactiveOptionMap(options) {
    const map = new Map();
    if (!Array.isArray(options)) {
        return map;
    }
    options.forEach((option) => {
        if (!option || !option.suffix || !option.stem) {
            return;
        }
        const list = map.get(option.suffix);
        if (list) {
            if (!list.includes(option.stem)) {
                list.push(option.stem);
            }
            return;
        }
        map.set(option.suffix, [option.stem]);
    });
    return map;
}

function getNonactiveDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const ruleBase = getCanonicalRuleBaseFromOptions(source, options);
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }
    const suppletiveOptions = getSuppletiveNonactiveOptions({
        verb: source,
        isYawi: options.isYawi === true,
    });
    if (suppletiveOptions) {
        return suppletiveOptions;
    }

    const info = getNonactiveBaseInfo(ruleBase);
    const blockReplaciveOnsetForShort = isShortReplaciveOnsetBase(ruleBase);
    const {
        last,
        prev,
        endsWithA,
        endsWithU,
        endsWithYa,
        endsWithTa,
        endsWithTi,
        endsWithTV,
        endsWithNa,
        endsWithSa,
        isClassC,
        endsWithKwi,
        endsWithWi,
        endsWithNi,
        endsWithTzV,
        lastNucleus,
        lastOnset,
        penultimateHasCoda,
        preTiConsonant,
        endsWithNucleusI,
        endsWithNucleusA,
        endsWithNucleusU,
        syllableCount,
    } = info;
    const isTransitive = options.isTransitive === true;
    const transitiveUwaAllowList = Array.isArray(DERIVATIONAL_RULES?.nonactive?.transitiveUwaAllow)
        ? DERIVATIONAL_RULES.nonactive.transitiveUwaAllow
        : [];
    const allowTransitiveUwa = isTransitive
        && matchesDerivationRuleBaseList(transitiveUwaAllowList, ruleBase, "");
    const allowWaluVariant = !isTransitive && endsWithNucleusI;
    const allowChiwaVariant = isTransitive && isVerbLetterVowel(last) && prev === "t";
    const allowShiwaVariant = isTransitive && isVerbLetterVowel(last) && prev === "s";
    const allowChiwaOrShiwa = allowChiwaVariant || allowShiwaVariant;
    const isTiNonactive = endsWithTi;
    const {
        isMonosyllable,
        blockUForWaWi,
        blockUwaForPenultimateU,
        blockUwaForCoda,
        allowUwaFromT,
        allowUFromKNS,
        allowUFromM,
        allowUFromKwI,
        allowUFromT,
        allowUFromTz,
        allowUFromTTa,
    } = getNonactiveCandidateParts(info);
    const uCandidate = isTransitive
        && !isMonosyllable
        && (allowUFromKNS || allowUFromM || allowUFromKwI || allowUFromT || allowUFromTz || allowUFromTTa)
        && !blockUForWaWi;
    const uwaCandidate = !isTransitive
        && (
            (["k", "s", "w"].includes(lastOnset) && (endsWithNucleusA || endsWithNucleusI))
            || (["w", "m", "n", "tz"].includes(lastOnset) && endsWithNucleusI)
            || allowUwaFromT
        )
        && !blockUForWaWi
        && !blockUwaForPenultimateU
        && !blockUwaForCoda;
    const uwaCandidateTransitive = allowTransitiveUwa
        && !blockUForWaWi
        && !blockUwaForPenultimateU
        && !blockUwaForCoda;
    // For (>=)3-syllable transitives ending in -wa, also allow -uwa (e.g. -petawa -> petauwa).
    // This is separate from the intransitive -uwa candidate so it doesn't interfere with lu/u selection logic.
    const uwaCandidateTransitiveWa = isTransitive
        && syllableCount >= 3
        && ruleBase.endsWith("wa")
        && lastOnset === "w"
        && !blockUForWaWi
        && !blockUwaForPenultimateU
        && !blockUwaForCoda;

    // -wa nonactive is intransitive-only in this system; transitives use -u/-lu paths.
    const waCandidate = !isTransitive && (endsWithNucleusI || endsWithNucleusU);
    const allowLuVariantTzV = isTransitive && endsWithTzV;
    const allowLuVariantTV = isTransitive && endsWithA && prev === "t";
    const allowLuVariantTransitiveA = isTransitive && endsWithA;
    const allowLuVariantIntransA = !isTransitive && endsWithA;
    const allowLuVariantIntransU = !isTransitive && endsWithU;
    const allowLuVariantIntransI = !isTransitive && lastOnset === "t" && endsWithNucleusI;
    const luCandidate = (endsWithA || endsWithU || allowLuVariantIntransI)
        && !(endsWithA && lastOnset === "s" && penultimateHasCoda)
        && (!uCandidate
            || allowLuVariantTzV
            || allowLuVariantTV
            || allowLuVariantTransitiveA
            || allowLuVariantIntransA
            || allowLuVariantIntransU
            || allowLuVariantIntransI)
        && (!uwaCandidate
            || allowLuVariantIntransA
            || allowLuVariantIntransU
            || allowLuVariantIntransI);

    const results = [];
    const seen = new Set();
    const push = (suffix, stem) => {
        if (!stem) {
            return;
        }
        const key = `${suffix}|${stem}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ suffix, stem });
    };
    const pushWithVariants = (suffix, stem) => {
        push(suffix, stem);
    };

    const buildLu = () => {
        const dropYa = endsWithYa && !isTransitive && Boolean(options.rootPlusYaBase);
        const base = (isTransitive && endsWithTV)
            ? `${source.slice(0, -1)}i`
            : (dropYa ? source.slice(0, -2) : source);
        return `${base}lu`;
    };
    const blockChForTi = penultimateHasCoda || (endsWithTi && preTiConsonant);
    const buildU = () => {
        return buildNonactiveUStem(source, lastOnset, lastNucleus, {
            blockCh: blockChForTi,
            blockOnsetReplacement: blockReplaciveOnsetForShort,
        });
    };
    const buildWa = () => `${source}wa`;
    const buildUwa = () => buildNonactiveUwaStem(source, lastOnset, lastNucleus, {
        blockCh: blockChForTi,
        blockOnsetReplacement: blockReplaciveOnsetForShort,
    });

    if (isClassC) {
        const base = truncateNonactiveBase(source);
        return [{ suffix: "lu", stem: `${base}lu` }];
    }
    if (luCandidate) {
        const baseLu = buildLu();
        push("lu", baseLu);
        if (endsWithYa && !isTransitive) {
            const yaLu = `${source}lu`;
            if (yaLu !== baseLu) {
                push("lu", yaLu);
            }
        }
        if (endsWithA && !isMonosyllable && !endsWithYa && (lastOnset === "k" || lastOnset === "kw")) {
            const altLu = `${source.slice(0, -1)}ilu`;
            if (altLu !== baseLu) {
                push("lu", altLu);
            }
        }
        if (isTransitive && endsWithTV) {
            const altLu = `${source}lu`;
            if (altLu !== baseLu) {
                push("lu", altLu);
            }
        }
    }
    if (uCandidate) {
        const uStem = buildU();
        pushWithVariants("u", uStem);
    }
    if (waCandidate) {
        const suppressWaForNiUwa = !isTransitive && endsWithNi && uwaCandidate;
        if (!suppressWaForNiUwa) {
            const baseWa = buildWa();
            const hasSOnset = isVerbLetterVowel(last) && prev === "s";
            if (!hasSOnset) {
                push("wa", baseWa);
            }
            const onsetVariant = buildWaOnsetVariant(source, {
                blockCh: blockChForTi,
                blockOnsetReplacement: blockReplaciveOnsetForShort,
            });
            if (onsetVariant && onsetVariant !== baseWa) {
                push("wa", onsetVariant);
            }
        }
    }
    if (uwaCandidate) {
        pushWithVariants("uwa", buildUwa());
    }
    if (uwaCandidateTransitiveWa) {
        pushWithVariants("uwa", buildUwa());
    }
    if (uwaCandidateTransitive) {
        pushWithVariants("uwa", buildUwa());
    }

    // Transitive verbs ending in nucleus -i also allow -lu nonactive.
    const allowLuVariant = isTransitive
        && (endsWithNucleusI || endsWithNa || endsWithNi || endsWithSa || endsWithTa || endsWithTi || endsWithTV || endsWithWi);
    const allowLuForI = isTransitive && ruleBase === "i";
    if (allowLuVariant) {
        push("lu", buildLu());
        if (isTransitive && endsWithTV) {
            push("lu", `${source}lu`);
        }
    }
    if (allowLuForI) {
        push("lu", buildLu());
    }
    if (endsWithKwi) {
        push("lu", buildLu());
    }
    if (isTransitive && isTiNonactive && !allowChiwaOrShiwa) {
        const chuStem = buildU();
        push("lu", `${chuStem}lu`);
    }
    if (allowWaluVariant) {
        push("walu", `${source}walu`);
    }

    return results;
}

function resolveNonactiveStemSelection(verb, analysisVerb, options = {}) {
    const optionsList = getNonactiveDerivationOptions(verb, analysisVerb, options);
    const optionMap = buildNonactiveOptionMap(optionsList);
    let selectedSuffix = getSelectedNonactiveSuffix();
    if (options.forceAll) {
        selectedSuffix = null;
    }
    if (selectedSuffix && !optionMap.has(selectedSuffix)) {
        selectedSuffix = null;
        setSelectedNonactiveSuffix(null);
    }
    let selectedStem = null;
    let selectedStems = [];
    if (selectedSuffix && optionMap.has(selectedSuffix)) {
        selectedStems = optionMap.get(selectedSuffix) || [];
        selectedStem = selectedStems[0] || null;
    } else if (optionsList.length) {
        const fallback = getDefaultNonactiveSuffix(optionsList);
        const fallbackStems = (fallback && optionMap.has(fallback))
            ? optionMap.get(fallback)
            : null;
        selectedStems = (fallbackStems && fallbackStems.length)
            ? fallbackStems
            : [optionsList[0].stem].filter(Boolean);
        selectedStem = selectedStems[0] || null;
    } else {
        selectedStem = deriveNonactiveStem(verb, analysisVerb, options);
        selectedStems = selectedStem ? [selectedStem] : [];
    }
    const allStems = optionsList.length
        ? Array.from(new Set(optionsList.map((option) => option.stem).filter(Boolean)))
        : (selectedStems.length ? selectedStems : []);
    return {
        selectedStem,
        selectedStems,
        allStems,
        selectedSuffix,
    };
}

// === Object & Label Helpers ===
function getObjectPrefixesForTransitividad() {
    const parsed = getVerbInputMeta();
    const availableSlots = getAvailableObjectSlots(parsed);
    return availableSlots > 0
        ? OBJECT_PREFIXES.map((opt) => opt.value)
        : [""];
}

function buildObjectPrefixGroups(objectPrefixes) {
    const groups = [];
    const used = new Set();
    objectPrefixes.forEach((prefix) => {
        if (used.has(prefix)) {
            return;
        }
        if (!prefix) {
            groups.push({ prefixes: [prefix] });
            used.add(prefix);
            return;
        }
        const matchedGroup = OBJECT_PREFIX_GROUPS.find((group) => group.includes(prefix));
        if (matchedGroup) {
            const available = matchedGroup.filter((candidate) => objectPrefixes.includes(candidate));
            if (available.length) {
                available.forEach((candidate) => used.add(candidate));
                groups.push({ prefixes: available });
                return;
            }
        }
        used.add(prefix);
        groups.push({ prefixes: [prefix] });
    });
    return groups;
}

function getObjectLabel(prefix, isNawat = false) {
    if (!prefix) {
        return getLocalizedLabel(OBJECT_LABELS.intransitive, isNawat, "intransitivo");
    }
    const entry = OBJECT_PREFIX_LABELS.get(prefix);
    if (!entry) {
        return prefix;
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat ? (entry.labelNa || entry.labelEs || prefix) : (entry.labelEs || entry.labelNa || prefix);
    }
    return prefix;
}

function getAllObjectPrefixValues() {
    return OBJECT_PREFIXES.map((entry) => entry.value);
}

function getObjectLabelShort(prefix, isNawat = false) {
    return getObjectLabel(prefix, isNawat).replace(/\s*\([^)]*\)/g, "").trim();
}

function getObjectRoleLabel(role, isNawat = false) {
    if (!role) {
        return "";
    }
    const entry = OBJECT_ROLE_LABELS[role];
    if (!entry || typeof entry !== "object") {
        return role;
    }
    return isNawat ? (entry.labelNa || entry.labelEs || role) : (entry.labelEs || entry.labelNa || role);
}

function getObjectComboLabel(prefix, isNawat) {
    if (!prefix) {
        return getObjectLabelShort(prefix, isNawat);
    }
    if (!isNawat) {
        return getObjectLabelShort(prefix, isNawat);
    }
    switch (prefix) {
        case "nech":
            return "naja";
        case "metz":
            return "taja";
        case "ki":
            return "yaja";
        case "tech":
            return "tejemet";
        case "metzin":
            return "anmejemet";
        case "kin":
            return "yejemet";
        default:
            return getObjectLabelShort(prefix, isNawat);
    }
}

function getNounObjectLabel(prefix, isNawat = false) {
    if (!prefix) {
        return getLocalizedLabel(
            NOUN_OBJECT_LABELS.intransitive,
            isNawat,
            "a él/ella/eso"
        );
    }
    return getObjectLabel(prefix, isNawat);
}

function getNounObjectLabelShort(prefix, isNawat = false) {
    return getNounObjectLabel(prefix, isNawat).replace(/\s*\([^)]*\)/g, "").trim();
}

function getNounObjectComboLabel(prefix, isNawat) {
    if (!prefix) {
        return getNounObjectLabelShort(prefix, isNawat);
    }
    return getObjectComboLabel(prefix, isNawat);
}

function getPossessorLabel(prefix, isNawat = false) {
    const entry = POSSESSOR_LABELS[prefix];
    if (!entry) {
        return "";
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat
            ? (entry.labelNa || entry.labelEs || "")
            : (entry.labelEs || entry.labelNa || "");
    }
    return "";
}

function getPossessorPersonLabel(prefix, isNawat = false) {
    const entry = POSSESSIVE_PREFIX_LABELS.get(prefix);
    return getLocalizedLabel(entry, isNawat, "");
}

function buildPersonSub({ subjectLabel, possessorLabel, objectLabel }) {
    const parts = [];
    if (subjectLabel) {
        parts.push(subjectLabel);
    }
    if (possessorLabel) {
        parts.push(possessorLabel);
    }
    if (objectLabel) {
        parts.push(objectLabel);
    }
    return parts.join(" · ");
}

function getSubjectSubLabel(selection, options = {}) {
    const isNawat = options.isNawat === true;
    const mode = options.mode || "";
    const tenseValue = options.tenseValue || "";
    const isNonanimateContext = options.isNonanimateContext === true
        || (mode === "noun" && NONANIMATE_NOUN_TENSES.has(tenseValue));
    if (!selection) {
        return "";
    }
    if (!isNawat && isNonanimateContext && isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix)) {
        return "eso";
    }
    if (!isNawat && selection.subjectPrefix === "" && selection.subjectSuffix === "t") {
        return "ellos/ellas/esos";
    }
    return getPersonSubLabel(selection, isNawat);
}

function getPossessivePrefixForSubject(subjectPrefix, subjectSuffix) {
    const key = `${subjectPrefix}|${subjectSuffix}`;
    switch (key) {
        case "ni|":
            return "nu";
        case "ti|":
            return "mu";
        case "|":
            return "i";
        case "ti|t":
            return "tu";
        case "an|t":
            return "anmu";
        case "|t":
            return "in";
        default:
            return "";
    }
}

function isNonanimateSubject(subjectPrefix, subjectSuffix) {
    return subjectPrefix === "" && subjectSuffix === "";
}

function getConjugationMaskState({
    result,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    comboObjectPrefix,
    enforceInvalidCombo = true,
    invalidComboSet = INVALID_COMBINATION_KEYS,
}) {
    const effectiveObjectPrefix = comboObjectPrefix ?? objectPrefix;
    const invalidCombo = enforceInvalidCombo && invalidComboSet.has(
        getComboKey(subjectPrefix, effectiveObjectPrefix, subjectSuffix)
    );
    const samePerson = isSamePersonAcrossNumber(subjectPrefix, subjectSuffix, effectiveObjectPrefix);
    const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
    const shouldMask = !!(result?.error || hideReflexive || invalidCombo || samePerson);
    const isError = !!(result?.error || invalidCombo || samePerson);
    return { shouldMask, isError };
}

// === Noun Derivations ===
function getInstrumentivoResult({
    rawVerb,
    verbMeta,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    mode,
    possessivePrefix,
}) {
    const commonNumberSuffix = "";
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (verbMeta.hasImpersonalTaPrefix) {
        objectPrefix = "";
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const derivationIsTransitive = isNonactiveTransitiveVerb(objectPrefix, verbMeta);
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(verbMeta);
    if (!allowsObjectPrefix) {
        if (objectPrefix !== "") {
            return { error: true };
        }
    } else if (isTransitiveVerb) {
        const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, "instrumentivo");
        if (!allowedPrefixes.includes(objectPrefix)) {
            return { error: true };
        }
    } else if (objectPrefix !== "") {
        return { error: true };
    }

    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
        isTaFusion: verbMeta.isTaFusion,
        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
        hasNonspecificValence: verbMeta.hasNonspecificValence
            || verbMeta.hasNonactiveNonspecificValence,
        hasSlashMarker: verbMeta.hasSlashMarker,
        directionalPrefix: verbMeta.directionalPrefix,
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    const morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || objectPrefix;

    if (mode === INSTRUMENTIVO_MODE.absolutivo) {
        const nonactiveSource = getNonactiveDerivationSource(verbMeta, verb, analysisVerb);
        const baseVerb = nonactiveSource.baseVerb;
        const basePrefix = nonactiveSource.prefix;
        const nonactiveRuleBase = getNonactiveRuleBase(baseVerb, verbMeta);
        let options = getNonactiveDerivationOptions(baseVerb, baseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: verbMeta.isYawi,
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase,
        });
        if (!options.length) {
            const derived = deriveNonactiveStem(baseVerb, baseVerb, {
                isTransitive: derivationIsTransitive,
                isYawi: verbMeta.isYawi,
                ruleBase: nonactiveRuleBase,
                rootPlusYaBase: verbMeta.rootPlusYaBase,
            });
            if (derived) {
                options = [{ suffix: "default", stem: derived }];
            }
        }
        if (
            derivationIsTransitive
            && baseVerb.endsWith("i")
            && !options.some((option) => option.suffix === "lu")
        ) {
            options.push({ suffix: "lu", stem: `${baseVerb}lu` });
        }
        const forms = options.map((option) => {
            const stem = basePrefix ? `${basePrefix}${option.stem}` : option.stem;
            const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix)
                ? stem.slice(directionalPrefix.length)
                : (basePrefix ? option.stem : stem);
            const applied = applyMorphologyRules({
                subjectPrefix,
                objectPrefix: morphologyObjectPrefix,
                subjectSuffix: commonNumberSuffix,
                verb: stem,
                tense: "presente-habitual",
                analysisVerb: analysisStem,
                isYawi: false,
                isWeya: false,
                directionalPrefix,
                directionalRuleMode: resolvedDirectionalRuleMode,
                isNounContext: true,
                hasSlashMarker: verbMeta.hasSlashMarker,
                hasSuffixSeparator: verbMeta.hasSuffixSeparator,
                hasLeadingDash: verbMeta.hasLeadingDash,
                hasBoundMarker: verbMeta.hasBoundMarker,
                hasCompoundMarker: verbMeta.hasCompoundMarker,
                hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
                hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
                hasNonspecificValence: verbMeta.hasNonspecificValence
                    || verbMeta.hasNonactiveNonspecificValence,
                isTaFusion: verbMeta.isTaFusion,
                indirectObjectMarker: verbMeta.indirectObjectMarker,
                isUnderlyingTransitive: verbMeta.isMarkedTransitive || verbMeta.isTaFusion,
                rootPlusYaBase: verbMeta.rootPlusYaBase,
                rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
            });
            const core = buildPrefixedChain({
                subjectPrefix: applied.subjectPrefix,
                objectPrefix: applied.objectPrefix,
                verb: applied.verb,
            });
            return `${core}${applied.subjectSuffix}`;
        }).filter(Boolean);
        const uniqueForms = Array.from(new Set(forms));
        if (!uniqueForms.length) {
            return { error: true };
        }
        return { result: uniqueForms.join(" / ") };
    }

    const resolvedPossessivePrefix = typeof possessivePrefix === "string"
        ? possessivePrefix
        : getPossessivePrefixForSubject(subjectPrefix, subjectSuffix);
    if (!resolvedPossessivePrefix && resolvedPossessivePrefix !== "") {
        return { error: true };
    }
    const applied = applyMorphologyRules({
        subjectPrefix,
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix: commonNumberSuffix,
        verb,
        tense: "imperfecto",
        analysisVerb,
        isYawi: verbMeta.isYawi,
        isWeya: verbMeta.isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        isNounContext: true,
        hasSlashMarker: verbMeta.hasSlashMarker,
        hasSuffixSeparator: verbMeta.hasSuffixSeparator,
        hasLeadingDash: verbMeta.hasLeadingDash,
        hasBoundMarker: verbMeta.hasBoundMarker,
        hasCompoundMarker: verbMeta.hasCompoundMarker,
        hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
        hasNonspecificValence: verbMeta.hasNonspecificValence
            || verbMeta.hasNonactiveNonspecificValence,
        isTaFusion: verbMeta.isTaFusion,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
        isUnderlyingTransitive: verbMeta.isMarkedTransitive || verbMeta.isTaFusion,
        rootPlusYaBase: verbMeta.rootPlusYaBase,
        rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
    });
    return {
        result: `${buildPrefixedChain({
            possessivePrefix: resolvedPossessivePrefix,
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
        })}${applied.subjectSuffix}`,
    };
}

function getCalificativoInstrumentivoResult({
    rawVerb,
    verbMeta,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    possessivePrefix,
}) {
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (!isNonanimateSubject(subjectPrefix, subjectSuffix)) {
        return { error: true };
    }
    if (verbMeta.hasImpersonalTaPrefix) {
        objectPrefix = "";
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(verbMeta);
    if (!allowsObjectPrefix) {
        if (objectPrefix !== "") {
            return { error: true };
        }
    } else if (isTransitiveVerb) {
        const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, "calificativo-instrumentivo");
        if (!allowedPrefixes.includes(objectPrefix)) {
            return { error: true };
        }
    } else if (objectPrefix !== "") {
        return { error: true };
    }

    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
        isTaFusion: verbMeta.isTaFusion,
        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
        hasNonspecificValence: verbMeta.hasNonspecificValence
            || verbMeta.hasNonactiveNonspecificValence,
        hasSlashMarker: verbMeta.hasSlashMarker,
        directionalPrefix: verbMeta.directionalPrefix,
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    const morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || objectPrefix;

    const stemVerb = verb;
    const stemAnalysis = analysisVerb;

    const applied = applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix: "",
        verb: stemVerb,
        tense: "pasado-remoto",
        analysisVerb: stemAnalysis,
        isYawi: verbMeta.isYawi,
        isWeya: verbMeta.isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        suppletiveStemSet: getSuppletiveStemSet(verbMeta),
        isNounContext: true,
        hasSlashMarker: verbMeta.hasSlashMarker,
        hasSuffixSeparator: verbMeta.hasSuffixSeparator,
        hasLeadingDash: verbMeta.hasLeadingDash,
        hasBoundMarker: verbMeta.hasBoundMarker,
        hasCompoundMarker: verbMeta.hasCompoundMarker,
        hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
        hasNonspecificValence: verbMeta.hasNonspecificValence
            || verbMeta.hasNonactiveNonspecificValence,
        isTaFusion: verbMeta.isTaFusion,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
        isUnderlyingTransitive: verbMeta.isMarkedTransitive || verbMeta.isTaFusion,
        rootPlusYaBase: verbMeta.rootPlusYaBase,
        rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
    });
    const predicate = applied.verb;
    if (!predicate || predicate === "—") {
        return { error: true };
    }
    const baseForms = predicate.split(" / ").map((form) => form.trim()).filter(Boolean);
    if (!baseForms.length) {
        return { error: true };
    }

    const resolvedPossessivePrefix = typeof possessivePrefix === "string"
        ? possessivePrefix
        : getPossessivePrefixForSubject(subjectPrefix, subjectSuffix);
    if (resolvedPossessivePrefix === "") {
        const forms = baseForms.map((form) => `${form}yut`);
        return { result: Array.from(new Set(forms)).join(" / ") };
    }
    if (!resolvedPossessivePrefix) {
        return { error: true };
    }
    const forms = baseForms.map((form) => `${resolvedPossessivePrefix}${form}`);
    return { result: Array.from(new Set(forms)).join(" / ") };
}

function getLocativoTemporalResult({
    rawVerb,
    verbMeta,
    objectPrefix,
    possessivePrefix,
    combinedMode,
}) {
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (verbMeta.hasImpersonalTaPrefix) {
        objectPrefix = "";
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const resolvedMode = combinedMode || getCombinedMode();
    const isNonactive = resolvedMode === COMBINED_MODE.nonactive;
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const derivationIsTransitive = isNonactiveTransitiveVerb(objectPrefix, verbMeta);
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(verbMeta, { isNonactive });
    if (!allowsObjectPrefix) {
        if (objectPrefix !== "") {
            return { error: true };
        }
    } else if (isTransitiveVerb) {
        const allowedPrefixes = isNonactive
            ? getAllObjectPrefixValues()
            : Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
        if (!allowedPrefixes.includes(objectPrefix)) {
            return { error: true };
        }
    } else if (objectPrefix !== "") {
        return { error: true };
    }

    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
        isTaFusion: verbMeta.isTaFusion,
        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
        hasNonspecificValence: verbMeta.hasNonspecificValence
            || verbMeta.hasNonactiveNonspecificValence,
        hasSlashMarker: verbMeta.hasSlashMarker,
        directionalPrefix: verbMeta.directionalPrefix,
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    const morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || objectPrefix;

    let stemVerb = verb;
    let stemAnalysis = analysisVerb;
    let nonactiveStems = [stemVerb];
    if (isNonactive) {
        const nonactiveSource = getNonactiveDerivationSource(verbMeta, verb, analysisVerb);
        const nonactiveRuleBase = getNonactiveRuleBase(nonactiveSource.baseVerb, verbMeta);
        const selection = resolveNonactiveStemSelection(nonactiveSource.baseVerb, nonactiveSource.baseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: verbMeta.isYawi,
            forceAll: shouldForceAllNonactiveOptions(),
            ruleBase: nonactiveRuleBase,
        });
        const rawStems = (!selection.selectedSuffix && selection.allStems.length > 1)
            ? selection.allStems
            : [selection.selectedStem];
        nonactiveStems = nonactiveSource.prefix
            ? rawStems.map((stem) => `${nonactiveSource.prefix}${stem}`)
            : rawStems;
        stemVerb = nonactiveStems[0];
        stemAnalysis = stemVerb;
        if (directionalPrefix && stemVerb.startsWith(directionalPrefix)) {
            stemAnalysis = stemVerb.slice(directionalPrefix.length);
        }
    }

    let sourceObjectPrefix = objectPrefix;
    if (isNonactive) {
        const passive = applyPassiveImpersonal({
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix,
            analysisVerb: stemAnalysis,
        });
        sourceObjectPrefix = passive.objectPrefix;
    }
    const resolvedObjectPrefix = sourceObjectPrefix === objectPrefix
        ? morphologyObjectPrefix
        : sourceObjectPrefix;

    const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
    const isImpersonal = isNonactive && !PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix);
    const possessorPrefix = isImpersonal ? "" : possessorInput;
    const forms = new Set();

    nonactiveStems.forEach((stem) => {
        let stemAnalysisLocal = stem;
        if (directionalPrefix && stem.startsWith(directionalPrefix)) {
            stemAnalysisLocal = stem.slice(directionalPrefix.length);
        }
        const applied = applyMorphologyRules({
            subjectPrefix: "",
            objectPrefix: resolvedObjectPrefix,
            subjectSuffix: "",
            verb: stem,
            tense: "imperfecto",
            analysisVerb: stemAnalysisLocal,
            isYawi: isNonactive ? false : verbMeta.isYawi,
            isWeya: isNonactive ? false : verbMeta.isWeya,
            directionalPrefix,
            directionalRuleMode: resolvedDirectionalRuleMode,
            isNounContext: true,
            hasSlashMarker: verbMeta.hasSlashMarker,
            hasSuffixSeparator: verbMeta.hasSuffixSeparator,
            hasLeadingDash: verbMeta.hasLeadingDash,
            hasBoundMarker: verbMeta.hasBoundMarker,
            hasCompoundMarker: verbMeta.hasCompoundMarker,
            hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
            hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
            hasNonspecificValence: verbMeta.hasNonspecificValence
                || verbMeta.hasNonactiveNonspecificValence,
            isTaFusion: verbMeta.isTaFusion,
            indirectObjectMarker: verbMeta.indirectObjectMarker,
            isUnderlyingTransitive: verbMeta.isMarkedTransitive || verbMeta.isTaFusion,
            rootPlusYaBase: verbMeta.rootPlusYaBase,
            rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
        });
        if (!applied || !applied.verb) {
            return;
        }
        const predicate = `${buildPrefixedChain({
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
        })}${applied.subjectSuffix}`;
        const text = `${possessorPrefix}${predicate}n`;
        if (text) {
            forms.add(text);
        }
    });

    return {
        result: Array.from(forms).join(" / "),
        possessorPrefix,
        isImpersonal,
    };
}

// === Nonactive Labels ===
function getNonactivePersonSub(prefix, isNawat = false) {
    return getLocalizedLabel(NONACTIVE_PERSON_SUB_LABELS[prefix], isNawat, "");
}

function getNonactivePersonCategory(prefix, isNawat = false) {
    const entry = NONACTIVE_PERSON_CATEGORY_LABELS[prefix] || NONACTIVE_PERSON_CATEGORY_LABELS.default;
    return getLocalizedLabel(entry, isNawat, "");
}

function getNonactiveGenericLabel(prefix, isNawat = false) {
    const entry = NONACTIVE_GENERIC_LABELS[prefix] || NONACTIVE_GENERIC_LABELS.default;
    return getLocalizedLabel(entry, isNawat, "impersonal");
}

function getNonactivePersonLabel(prefix, options = {}) {
    const isNawat = options.isNawat === true;
    if (options.isIntransitive) {
        return getVerbBlockLabel("eventImpersonal", isNawat, "Evento impersonal");
    }
    if (options.isDirectGroup) {
        if (OBJECT_MARKERS.has(prefix)) {
            return getNonactiveGenericLabel(prefix, isNawat);
        }
        return getNonactivePersonCategory(prefix, isNawat)
            || getVerbBlockLabel("patient", isNawat, "Paciente");
    }
    return getNonactiveGenericLabel(prefix, isNawat);
}

function getNonactiveSlotPrefixes(marker, slot) {
    if (!marker) {
        return null;
    }
    if (marker === "te") {
        return Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
    }
    if (marker === "ta") {
        if (slot === "subject") {
            return ["ki"];
        }
        return ["", "ki", "ta"];
    }
    if (marker === "mu") {
        return slot === "object" ? ["mu"] : Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
    }
    return null;
}

// === Output Formatting ===
function isWjAlternationPair(left, right) {
    if (!left || !right || left.length !== right.length) {
        return false;
    }
    let diffIndex = -1;
    for (let i = 0; i < left.length; i += 1) {
        if (left[i] === right[i]) {
            continue;
        }
        if (diffIndex !== -1) {
            return false;
        }
        diffIndex = i;
        const isWj =
            (left[i] === "w" && right[i] === "j")
            || (left[i] === "j" && right[i] === "w");
        if (!isWj) {
            return false;
        }
    }
    return diffIndex !== -1;
}

function formatConjugationDisplay(value) {
    if (!value) {
        return value;
    }
    const forms = value
        .split(/\s*\/\s*/g)
        .map((form) => form.trim())
        .filter(Boolean);
    if (forms.length <= 1) {
        return forms[0] || value.trim();
    }
    const used = new Array(forms.length).fill(false);
    const lines = [];
    for (let i = 0; i < forms.length; i += 1) {
        if (used[i]) {
            continue;
        }
        let pairedIndex = -1;
        for (let j = i + 1; j < forms.length; j += 1) {
            if (used[j]) {
                continue;
            }
            if (isWjAlternationPair(forms[i], forms[j])) {
                pairedIndex = j;
                break;
            }
        }
        if (pairedIndex !== -1) {
            lines.push(`${forms[i]} / ${forms[pairedIndex]}`);
            used[i] = true;
            used[pairedIndex] = true;
        } else {
            lines.push(forms[i]);
            used[i] = true;
        }
    }
    return lines.join("\n");
}

function buildClassBasedProvenance({
    verb,
    analysisTarget,
    tense,
    classKey,
    isTransitive,
    context,
    variants,
    subjectSuffix,
    suppletiveStemSet,
}) {
    return {
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        stemPath: context?.stemPath || (suppletiveStemSet ? "suppletive" : null),
        fromRootPlusYa: Boolean(context?.fromRootPlusYa),
        isMonosyllable: Boolean(context?.isMonosyllable),
        variants: (variants || []).map((variant) => ({
            base: variant.base,
            suffix: variant.suffix,
        })),
        subjectSuffix,
        blockedReason: null,
        usesSuppletiveSet: Boolean(suppletiveStemSet),
    };
}

function buildClassBasedResultWithProvenance({
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
}) {
    const result = buildClassBasedResult({
        verb,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        tense,
        analysisVerb,
        exactBaseVerb,
        classFilter,
        allowAllClasses,
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
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        suppletiveStemSet,
        forceTransitive,
        indirectObjectMarker,
    });
    if (!result || result === "—") {
        return { result, provenance: null };
    }
    const analysisTarget = getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    const isTransitive = forceTransitive || objectPrefix !== "";
    const classKey = classFilter || null;
    if (!classKey) {
        return { result, provenance: null };
    }
    let context = null;
    let variants = null;
    if (suppletiveStemSet) {
        variants = suppletiveStemSet.variantsByClass.get(classKey) || null;
    } else {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
        });
        const variantsByClass = getPretUniversalVariantsByClass(context);
        variants = variantsByClass.get(classKey) || null;
    }
    if (!variants) {
        return { result, provenance: null };
    }
    const provenance = buildClassBasedProvenance({
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        context,
        variants,
        subjectSuffix,
        suppletiveStemSet,
    });
    return { result, provenance };
}

// === Input Validation ===
function getInvalidVerbCharacters(rawValue) {
    const raw = String(rawValue || "");
    const invalid = new Set();
    for (const char of raw) {
        if (/[a-z|~#()\/?\s-]/i.test(char)) {
            continue;
        }
        invalid.add(char);
    }
    return Array.from(invalid);
}

function getInvalidVerbLetters(rawValue) {
    const raw = String(rawValue || "").toLowerCase();
    const cleaned = raw.replace(COMPOUND_MARKER_RE, "").replace(/\s+/g, "");
    const letters = splitVerbLetters(cleaned);
    const invalid = new Set();
    letters.forEach((letter) => {
        if (!letter) {
            return;
        }
        if (DIGRAPH_SET.has(letter)) {
            return;
        }
        if (VALID_VOWEL_SET.has(letter)) {
            return;
        }
        if (VALID_CONSONANTS.has(letter)) {
            return;
        }
        invalid.add(letter);
    });
    return Array.from(invalid);
}

function getInvalidVerbStructure(rawValue, options = {}) {
    const raw = String(rawValue || "").toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
    const allowPartial = options.allowPartial === true;
    if (cleaned.includes("/-") || cleaned.includes("-/")) {
        return "separator";
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\\/?-]/g;
    const tokens = [];
    const separators = [];
    let current = "";
    for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "/" || char === "-") {
            tokens.push(current);
            separators.push(char);
            current = "";
        } else {
            current += char;
        }
    }
    tokens.push(current);
    const isNonspecificToken = (token) => NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
    const isPrefixToken = (token) => (
        SPECIFIC_VALENCE_PREFIX_SET.has(token)
        || isNonspecificToken(token)
        || token === "k"
    );
    for (let i = 0; i < separators.length; i += 1) {
        const sep = separators[i];
        const leftRaw = tokens[i] ?? "";
        const rightRaw = tokens[i + 1] ?? "";
        const left = leftRaw.replace(markerRe, "");
        const right = rightRaw.replace(markerRe, "");
        if (!right) {
            if (allowPartial && i === separators.length - 1) {
                return "";
            }
            if (sep === "-") {
                let hasNonEmptyLater = false;
                let onlyDashes = true;
                for (let j = i + 1; j < separators.length; j += 1) {
                    if (separators[j] !== "-") {
                        onlyDashes = false;
                        break;
                    }
                    const nextToken = (tokens[j + 1] ?? "").replace(markerRe, "");
                    if (nextToken) {
                        hasNonEmptyLater = true;
                        break;
                    }
                }
                if (onlyDashes && hasNonEmptyLater) {
                    continue;
                }
            }
            return "separator";
        }
        if (sep === "/") {
            // PREFIX/ can bind only to nonspecific or verbstem (not to specific prefixes).
            const rightIsPrefix = separators[i + 1] === "/";
            if (isPrefixToken(right) && !isNonspecificToken(right)) {
                return "separator";
            }
            if (rightIsPrefix && !isNonspecificToken(right)) {
                return "separator";
            }
        }
    }
    const valenceSlots = getValenceSlotsFromCleaned(cleaned);
    if (valenceSlots.length >= 2) {
        for (let i = 0; i < valenceSlots.length; i += 1) {
            if (getValenceCategoryFromToken(valenceSlots[i]) === "embedded") {
                return "embedded-between-dashes";
            }
        }
    }
    return "";
}

function isVerbValueAllowed(rawValue) {
    return (
        getInvalidVerbCharacters(rawValue).length === 0
        && getInvalidVerbLetters(rawValue).length === 0
        && !getInvalidVerbStructure(rawValue, { allowPartial: true })
    );
}

function triggerInputShake(target) {
    if (!target || !target.classList) {
        return;
    }
    target.classList.remove("shake");
    void target.offsetWidth;
    target.classList.add("shake");
    if (target._shakeTimeout) {
        clearTimeout(target._shakeTimeout);
    }
    target._shakeTimeout = setTimeout(() => {
        target.classList.remove("shake");
    }, 350);
}

function handleVerbBeforeInput(event) {
    if (event.isComposing) {
        return;
    }
    if (event.inputType && event.inputType.startsWith("delete")) {
        return;
    }
    const data = event.data;
    if (!data) {
        return;
    }
    const target = event.target;
    if (!target || typeof target.value !== "string") {
        return;
    }
    const value = target.value;
    const start = target.selectionStart ?? value.length;
    const end = target.selectionEnd ?? value.length;
    const nextValue = value.slice(0, start) + data + value.slice(end);
    if (nextValue.includes("/-") || nextValue.includes("-/")) {
        event.preventDefault();
        triggerInputShake(target);
    }
}

// === UI Class Helpers ===
function getObjectCategory(prefix) {
    if (!prefix) {
        return "intransitive";
    }
    if (prefix === "mu") {
        return "reflexive";
    }
    if (prefix === "ta" || prefix === "te") {
        return "indirect";
    }
    return "direct";
}

function getObjectValenceCategory(prefix) {
    if (!prefix) {
        return "";
    }
    if (NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return "nonspecific";
    }
    if (SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
        return "specific";
    }
    return "specific";
}

function getValenceCategoryLabel(category, isNawat = false) {
    return category ? getLocalizedLabel(VALENCE_CATEGORY_LABELS[category], isNawat, "") : "";
}

function getObjectValenceLabel(prefix, isNawat = false) {
    const category = getObjectValenceCategory(prefix);
    return getValenceCategoryLabel(category, isNawat);
}

function getObjectValenceLabelForGroup(prefixes, isNawat = false) {
    const categories = new Set();
    prefixes.forEach((prefix) => {
        const category = getObjectValenceCategory(prefix);
        if (category) {
            categories.add(category);
        }
    });
    if (!categories.size) {
        return "";
    }
    if (categories.size === 1) {
        const only = categories.values().next().value;
        return getValenceCategoryLabel(only, isNawat);
    }
    const ordered = ["specific", "nonspecific"];
    const labels = ordered
        .filter((category) => categories.has(category))
        .map((category) => getValenceCategoryLabel(category, isNawat))
        .filter(Boolean);
    return labels.join(" / ");
}

function applyObjectSectionCategory(sectionEl, prefix) {
    if (!sectionEl) {
        return;
    }
    sectionEl.classList.remove(
        "object-section--direct",
        "object-section--indirect",
        "object-section--reflexive",
        "object-section--te"
    );
    const category = getObjectCategory(prefix);
    if (category !== "intransitive") {
        sectionEl.classList.add(`object-section--${category}`);
    }
    if (prefix === "te") {
        sectionEl.classList.add("object-section--te");
    }
}

function applyConjugationRowClasses(row, objectPrefix) {
    if (!row) {
        return;
    }
    row.classList.add(`conjugation-row--${getObjectCategory(objectPrefix)}`);
    if (objectPrefix === "te") {
        row.classList.add("conjugation-row--te");
    }
}

// === Prefix Selection ===
function applyIndirectObjectMarker(prefix, marker) {
    if (!marker) {
        return prefix;
    }
    let combined = "";
    if (SPECIFIC_VALENCE_PREFIX_SET.has(marker) || marker === "k") {
        if (!prefix) {
            combined = marker;
        } else if (SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
            combined = marker;
        } else {
            combined = `${prefix}${marker}`;
        }
    } else if (prefix === marker) {
        if (marker === "ta" || marker === "te") {
            combined = `${prefix}${marker}`;
        } else {
            combined = prefix;
        }
    } else {
        combined = `${prefix}${marker}`;
    }
    return normalizeValenceMarkerOrder(combined);
}

function normalizeValenceMarkerOrder(prefix) {
    if (!prefix) {
        return prefix;
    }
    const full = prefix;
    let directional = "";
    let rest = prefix;
    if (rest.startsWith("al") && rest !== "al") {
        directional = "al";
        rest = rest.slice(2);
    }
    const tokens = [];
    let working = rest;
    while (working) {
        if (working.startsWith("ki")) {
            tokens.push("ki");
            working = working.slice(2);
            continue;
        }
        if (working.startsWith("k")) {
            tokens.push("k");
            working = working.slice(1);
            continue;
        }
        if (working.startsWith("mu")) {
            tokens.push("mu");
            working = working.slice(2);
            continue;
        }
        if (working.startsWith("te")) {
            tokens.push("te");
            working = working.slice(2);
            continue;
        }
        if (working.startsWith("ta")) {
            tokens.push("ta");
            working = working.slice(2);
            continue;
        }
        return full;
    }
    if (tokens.length <= 1) {
        return full;
    }
    const rank = { ki: 0, k: 0, mu: 1, te: 2, ta: 3 };
    tokens.sort((a, b) => rank[a] - rank[b]);
    return `${directional}${tokens.join("")}`;
}

function resolveValencePositionPrefixes({
    objectPrefix,
    indirectObjectMarker,
    derivationType,
}) {
    if (!indirectObjectMarker) {
        return { objectPrefix, indirectObjectMarker };
    }
    const isApplicative = derivationType === DERIVATION_TYPE.applicative;
    const allowSpecificWithNonspecific = isApplicative || derivationType === DERIVATION_TYPE.causative;
    if (allowSpecificWithNonspecific && indirectObjectMarker === "mu") {
        return { objectPrefix, indirectObjectMarker };
    }
    const isSpecific = (prefix) => SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k";
    const isNonspecific = (prefix) => NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
    const isReflexive = (prefix) => prefix === "mu";
    const keepReflexiveIndirect = allowSpecificWithNonspecific && indirectObjectMarker === "mu";
    if (isApplicative) {
        if (isSpecific(indirectObjectMarker) || isReflexive(indirectObjectMarker)) {
            if (keepReflexiveIndirect) {
                return { objectPrefix, indirectObjectMarker };
            }
            if (allowSpecificWithNonspecific && isNonspecific(objectPrefix)) {
                return { objectPrefix, indirectObjectMarker };
            }
            indirectObjectMarker = "";
        }
        return { objectPrefix, indirectObjectMarker };
    }
    if (isSpecific(indirectObjectMarker)) {
        if (isSpecific(objectPrefix) || isReflexive(objectPrefix)) {
            objectPrefix = "";
        }
        return { objectPrefix, indirectObjectMarker };
    }
    if (isReflexive(indirectObjectMarker)) {
        if (keepReflexiveIndirect) {
            return { objectPrefix, indirectObjectMarker };
        }
        objectPrefix = "";
        return { objectPrefix, indirectObjectMarker };
    }
    if (isSpecific(objectPrefix) || isReflexive(objectPrefix)) {
        if (allowSpecificWithNonspecific && isNonspecific(indirectObjectMarker)) {
            return { objectPrefix, indirectObjectMarker };
        }
        objectPrefix = "";
    }
    return { objectPrefix, indirectObjectMarker };
}

function getPreferredObjectPrefix(prefixes) {
    if (prefixes.includes("ki")) {
        return "ki";
    }
    return prefixes[0] || "";
}

function getPreferredNounObjectPrefix(prefixes) {
    if (prefixes.includes("ta")) {
        return "ta";
    }
    return getPreferredObjectPrefix(prefixes);
}

function getCurrentObjectPrefix() {
    if (getActiveTenseMode() === TENSE_MODE.sustantivo) {
        const tenseValue = getSelectedTenseTab();
        const groupKey = SUSTANTIVO_VERBAL_PREFIXES.join("|");
        const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
        const verbMeta = getVerbInputMeta();
        const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue);
        const isAllowed = (prefix) => allowedPrefixes.includes(prefix);
        const stored = OBJECT_TOGGLE_STATE.get(objectStateKey);
        if (stored && isAllowed(stored)) {
            return stored;
        }
        return getPreferredNounObjectPrefix(allowedPrefixes);
    }
    const prefixes = getObjectPrefixesForTransitividad();
    if (prefixes.length === 1 && prefixes[0] === "") {
        return "";
    }
    const groups = buildObjectPrefixGroups(prefixes);
    const directGroup = groups.find((group) => group.prefixes.includes("ki")) || groups[0];
    if (!directGroup) {
        return "";
    }
    const groupKey = directGroup.prefixes.join("|") || "intrans";
    const activeGroup = getActiveConjugationGroup();
    const tenseValue = activeGroup === CONJUGATION_GROUPS.universal
        ? getSelectedPretUniversalTab()
        : getSelectedTenseTab();
    const mode = activeGroup === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode, isNonactive: isNonactiveMode });
    const stored = OBJECT_TOGGLE_STATE.get(objectStateKey);
    if (stored && directGroup.prefixes.includes(stored)) {
        return stored;
    }
    return getPreferredObjectPrefix(directGroup.prefixes);
}

// === Conjugation Utilities ===
function getComboKey(subjectPrefix, objectPrefix, subjectSuffix) {
    return `${subjectPrefix}|${objectPrefix}|${subjectSuffix}`;
}

function applyTenseSuffixRules(tense, subjectSuffix) {
    if (tense === "preterito") {
        return subjectSuffix;
    }
    const rules = TENSE_SUFFIX_RULES[tense];
    if (!rules || rules[subjectSuffix] === undefined) {
        return subjectSuffix;
    }
    return rules[subjectSuffix];
}

function buildPrefixedChain({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
}) {
    const segments = [subjectPrefix, possessivePrefix, objectPrefix, verb];
    const updated = segments.slice();
    const findNextNonEmpty = (startIndex) => {
        for (let index = startIndex + 1; index < updated.length; index += 1) {
            if (updated[index]) {
                return index;
            }
        }
        return -1;
    };
    for (let index = 0; index < updated.length - 1; index += 1) {
        const current = updated[index];
        if (!current) {
            continue;
        }
        const nextIndex = findNextNonEmpty(index);
        if (nextIndex === -1) {
            break;
        }
        const next = updated[nextIndex];
        if (next && VOWEL_START_RE.test(next) && current.endsWith("n")) {
            const prevChar = current[current.length - 2] || "";
            if (VOWEL_RE.test(prevChar) && !current.endsWith("nh")) {
                updated[index] = `${current}h`;
            }
        }
    }
    return updated.join("");
}

function adjustPatientivoPossessiveSuffix(
    suffix,
    isPossessed,
    ownershipType = DEFAULT_PATIENTIVO_OWNERSHIP,
    options = {}
) {
    if (!isPossessed || !suffix) {
        return suffix || "";
    }
    const useOrganic = ownershipType === "yu";
    const useZero = ownershipType === "zero";
    if (suffix.endsWith("met")) {
        const base = suffix.slice(0, -3);
        return useOrganic ? `${base}yuwan` : `${base}wan`;
    }
    if (suffix.endsWith("wan")) {
        const base = suffix.slice(0, -3);
        return useOrganic ? `${base}yuwan` : suffix;
    }
    if (suffix === "ti") {
        return "";
    }
    if (suffix === "t") {
        if (useOrganic) {
            return "yu";
        }
        if (useZero || options.blankPossessiveW) {
            return "";
        }
        return "w";
    }
    return suffix;
}

function startsWithAny(value, prefixes) {
    return prefixes.some((prefix) => value.startsWith(prefix));
}

function endsWithAny(value, suffixes) {
    return suffixes.some((suffix) => value.endsWith(suffix));
}

function getTotalVowelCount(verb) {
    return getTotalVowelCountFromSyllables(getSyllables(verb));
}

// === Preterito Universal ===
const PRET_UNIVERSAL_VERB_OVERRIDES = [
];

function getPretUniversalVerbOverride(analysisVerb, isTransitive) {
    if (!analysisVerb) {
        return null;
    }
    const transitivity = isTransitive ? "transitive" : "intransitive";
    for (const entry of PRET_UNIVERSAL_VERB_OVERRIDES) {
        if (!entry || !Array.isArray(entry.verbs) || !entry.verbs.includes(analysisVerb)) {
            continue;
        }
        if (entry.transitivity && entry.transitivity !== transitivity) {
            continue;
        }
        return entry;
    }
    return null;
}

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

function buildPretUniversalContext(verb, analysisVerb, isTransitive, options = {}) {
    const isYawi = options.isYawi === true;
    const isWeya = options.isWeya === true;
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

function getPretUniversalClassCandidates(context, trace = null) {
    // Precedence: root+ya > monosyllable > forced-B endings > endsWithLV > exact patterns
    // > general class rules.
    const traceState = trace && typeof trace === "object" ? trace : null;
    const setRule = (label) => {
        if (!traceState || traceState.rule) {
            return;
        }
        traceState.rule = label;
    };
    const candidates = new Set();
    const override = context?.verbOverride || null;
    const allowUnpronounceable = override?.allowUnpronounceable === true || context?.allowUnpronounceable === true;
    if (!context.rootSyllablesOk && !allowUnpronounceable) {
        setRule("unpronounceable root");
        return candidates;
    }
    if (override && Array.isArray(override.classes) && override.classes.length) {
        const label = override.id || context.analysisVerb || override.verbs?.[0] || "lexical";
        setRule(`override ${label}`);
        override.classes.forEach((classKey) => candidates.add(classKey));
        return candidates;
    }
    const isMonosyllablePath = context.stemPath === "monosyllable";
    const rootPlusYaCandidates = getRootPlusYaClassCandidates(context);
    const finalizeCandidates = (set) => set;
    if (rootPlusYaCandidates.size) {
        setRule("root+ya");
        return finalizeCandidates(rootPlusYaCandidates);
    }
    if (context.isCausativeTypeTwo) {
        setRule("causative type-two (-ia/-ua)");
        candidates.add("C");
        return finalizeCandidates(candidates);
    }
    if (context.isMonosyllable && context.isTransitive) {
        if (context.lastSyllableForm === "V") {
            setRule("monosyllable transitive V");
            candidates.add("B");
            return finalizeCandidates(candidates);
        }
        if (context.lastSyllableForm === "CV") {
            setRule("monosyllable transitive CV");
            candidates.add("D");
            return finalizeCandidates(candidates);
        }
    }
    if (context.isMonosyllable && !context.isTransitive) {
        const isTaMonosyllable = context.analysisVerb === "ta" || context.verb === "ta";
        if (context.lastSyllableForm === "V") {
            setRule("monosyllable intransitive V");
            candidates.add("B");
            return finalizeCandidates(candidates);
        }
        if (context.lastSyllableForm === "CV" && !isTaMonosyllable) {
            setRule("monosyllable intransitive CV");
            candidates.add("D");
            return finalizeCandidates(candidates);
        }
    }
    const allowClusterExactWiWa = !context.isTransitive && (
        context.isExactCCVwi
        || context.isExactVCCVwiShort
        || context.isExactVCCVwa
    );
    if (!context.isTransitive && context.deletionCreatesCluster && !allowClusterExactWiWa) {
        setRule("deleted vowel cluster (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.endsWithTA) {
        setRule("ends with ta (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.endsWithChi && !context.isMonosyllable) {
        setRule("ends with chi (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.endsWithPA && !context.isMonosyllable) {
        setRule("ends with pa (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.endsWithMV && !context.isMonosyllable) {
        setRule("ends with ma/mi (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.endsWithPI && !context.isMonosyllable) {
        setRule("ends with pi (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.endsWithTA && context.analysisVerb !== "ita") {
        if (context.isReduplicatedCVCV) {
            setRule("ends with ta (transitive redup CVCV)");
            candidates.add("A");
            candidates.add("B");
            return finalizeCandidates(candidates);
        }
        setRule("ends with ta (transitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.endsWithTZV && !context.endsWithVCCV) {
        setRule("ends with tzV");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.forceClassBEnding) {
        setRule("forced B ending");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    const isLiEndingCandidate = !context.isTransitive
        && context.lastNucleus === "i"
        && (context.isExactVlV || context.isExactCVlV);
    if (isLiEndingCandidate) {
        setRule("LV (i)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.endsWithLV) {
        setRule("ends with LV");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    const isExactLVICandidate = context.lastNucleus === "i"
        && (context.isExactVlV || context.isExactCVlV);
    if (isExactLVICandidate) {
        setRule("exact LV (i)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
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
    if (context.isTransitive && isExactNiaPattern) {
        setRule("exact Nia (transitive)");
        candidates.add("C");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVV) {
        setRule("exact CV-V (transitive)");
        candidates.add("C");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactVV) {
        setRule("exact V-V (intransitive)");
        candidates.add("C");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactVna) {
        setRule("exact V-CV(na) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVna) {
        setRule("exact CV-CV(na) (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVCVna) {
        setRule("exact CV-CV-CV(na) (intransitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVCVCVna) {
        setRule("exact CV-CV-CV-CV(na) (intransitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactVwi) {
        setRule("exact V-CV(wi) (intransitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isExactCVCVna) {
        setRule("exact CV-CV-CV(na)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVlVna) {
        setRule("exact CVl-V-CV(na) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVlCVna) {
        setRule("exact Vl-CV-CV(na) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVjCVna) {
        setRule("exact Vj-CV-CV(na) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && (context.isExactCVtza || context.isExactVjCVtza)) {
        setRule("exact CV-CV(tza) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVta) {
        setRule("exact CV-CV(ta) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVpV) {
        setRule("exact CV-CV(pV) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVpV) {
        setRule("exact CV-CV(pV) (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && (context.isExactCVma || context.isExactVjCVma)) {
        setRule("exact CV-CV(ma) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVkwi) {
        setRule("exact CV-CV(kwi) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactVCVCu) {
        setRule("exact V-CV-CV(u) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactVlCVwi) {
        setRule("exact Vl-CV-CV(wi) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVniU) {
        setRule("exact CV(u)-CV(ni) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCVVni) {
        setRule("exact CV-V-CV(ni) (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && isExactNiPattern) {
        setRule("exact Ni (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && isExactNaPattern) {
        setRule("exact Na (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isExactVjwa) {
        setRule("exact Vj-CV(wa)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    const disallowTransitiveWaB = context.isTransitive
        && context.endsWithWa
        && context.letterCount >= 4;
    if (context.endsWithU) {
        setRule("ends with U");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVwaI) {
        setRule("exact CV(i)-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVwaI) {
        setRule("exact V(i)-CV(wa) (transitive)");
        candidates.add("D");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVwa && !context.isExactVwaI) {
        setRule("exact V-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVCCawa) {
        setRule("exact V-C-CV(a)-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (
        context.isTransitive
        && (context.isExactCVwaA || context.isExactCVCawa || context.isExactCVlawa)
    ) {
        setRule("exact Wa (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isExactEwaPattern && context.isTransitive) {
        setRule("exact Ewa (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVjCVwa) {
        setRule("exact Vj-CV-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVjCVwa) {
        setRule("exact CVj-CV-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactVlCVwa) {
        setRule("exact Vl-CV-CV(wa) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVwi) {
        setRule("exact CV-CV(wi) (transitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactCVCVwi) {
        setRule("exact CV-CV-CV(wi) (transitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && context.isExactWiPattern) {
        setRule("exact Wi (transitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactCuwa) {
        setRule("exact CV(u)-CV(wa) (intransitive)");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactLWaPattern) {
        setRule("exact Lwa (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && (context.isExactVCCVwiShort || context.isExactCCVwi)) {
        setRule("exact short Wi (intransitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactWiPattern) {
        setRule("exact Wi (intransitive)");
        candidates.add("A");
        candidates.add("B");
        return finalizeCandidates(candidates);
    }
    if (!context.isTransitive && context.isExactWaPattern) {
        setRule("exact Wa (intransitive)");
        candidates.add("A");
        if (context.isExactCVCVwa && !context.isReduplicated) {
            candidates.add("B");
        }
        return finalizeCandidates(candidates);
    }
    if (context.isTransitive && (context.isExactVnV || context.isExactCVnV || context.isExactCVmV)) {
        setRule("exact V-CV(nV)/CV-CV(nV)/CV-CV(mV) (transitive)");
        candidates.add("A");
        return finalizeCandidates(candidates);
    }
    if (context.isExactCVsV) {
        setRule("exact CV-CV(sV)");
        candidates.add("A");
        if (context.lastNucleus === "i" && !context.isTransitive) {
            candidates.add("B");
        }
        return finalizeCandidates(candidates);
    }
    setRule("default class rules");
    const forceClassAForKWV = context.forceClassAForKWV;
    if (forceClassAForKWV) {
        candidates.add("A");
    } else if (!disallowTransitiveWaB) {
        candidates.add("B");
    }
    if (context.endsInOpenSyllableNonU) {
        candidates.add("A");
    }
    if (
        context.endsInOpenSyllableNonU &&
        context.vowelCount === 2 &&
        context.endsWithIaUa
    ) {
        candidates.add("C");
    }
    if (!context.isTransitive && context.verb.endsWith("yya")) {
        candidates.add("A");
    }
    return finalizeCandidates(candidates);
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

function getPrimaryExactPatternLabel(context) {
    if (!context) {
        return "";
    }
    const match = PRET_EXACT_PATTERN_LABELS.find((entry) => context[entry.key]);
    return match ? match.label : "";
}

function buildPretUniversalRuleSummary(context) {
    if (!context) {
        return null;
    }
    const trace = { rule: "", gates: [] };
    const candidates = getPretUniversalClassCandidates(context, trace);
    const ruleLabel = trace.rule || "default class rules";
    const exactLabel = getPrimaryExactPatternLabel(context);
    const classList = candidates.size
        ? Array.from(candidates).sort().join("/")
        : "";
    return {
        ruleLabel,
        exactLabel,
        classList,
        gates: trace.gates || [],
    };
}

function updateVerbRuleHint({
    verb,
    analysisVerb,
    exactBaseVerb,
    objectPrefix,
    forceTransitive = false,
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
}) {
    const wrapper = document.getElementById("verb-rule");
    const textEl = document.getElementById("verb-rule-text");
    if (!wrapper || !textEl) {
        return;
    }
    const clearHint = () => {
        textEl.textContent = "";
        wrapper.classList.add("is-empty");
    };
    if (!verb || getActiveTenseMode() !== TENSE_MODE.verbo) {
        clearHint();
        return;
    }
    const analysisTarget = getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    const isTransitive = forceTransitive || Boolean(objectPrefix);
    const context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
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
        exactBaseVerb,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
    });
    const summary = buildPretUniversalRuleSummary(context);
    if (!summary) {
        clearHint();
        return;
    }
    const parts = [];
    if (hasImpersonalTaPrefix) {
        parts.push("ta-impersonal");
    }
    parts.push(summary.ruleLabel);
    if (summary.exactLabel) {
        parts.push(`exact ${summary.exactLabel}`);
    }
    if (summary.classList) {
        parts.push(`classes ${summary.classList}`);
    }
    if (summary.gates && summary.gates.length) {
        parts.push(`safegate ${summary.gates.join(", ")}`);
    }
    textEl.textContent = parts.join(" | ");
    wrapper.classList.remove("is-empty");
}

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

function buildPretUniversalClassA(context) {
    const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
    const isAllowedStem = (base) => allowUnpronounceableStems || isSyllableSequencePronounceable(base);
    if (!context.isTransitive && context.fromRootPlusYa) {
        if (context.isWeya && context.rootPlusYaBase) {
            const base = context.rootPlusYaBase;
            if (!isAllowedStem(base)) {
                return null;
            }
            return [{ base, suffix: "ki" }];
        }
        const rootPlusYaVerb = context.verb;
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
            (context.isMonosyllable && !context.endsWithTV) ||
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
        if (context.isWeya) {
            return [{ base: context.verb, suffix: "k" }];
        }
        const variants = [{ base: context.verb, suffix: "k" }];
        const rootPlusYaBase = context.rootPlusYaBase;
        const isShortRootPlusYaBase = (() => {
            if (!rootPlusYaBase) {
                return false;
            }
            const baseSyllables = getSyllables(rootPlusYaBase, { analysis: true, assumeFinalV: true });
            if (baseSyllables.length !== 1) {
                return false;
            }
            const form = baseSyllables[0]?.form;
            return form === "CV" || form === "Vj";
        })();
        if (!isShortRootPlusYaBase && rootPlusYaBase && isAllowedStem(rootPlusYaBase)) {
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

function getPretUniversalPrefixForBase(
    base,
    subjectPrefix,
    objectPrefix,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    indirectObjectMarker = ""
) {
    const split = splitDirectionalPrefixFromBase(base, directionalInputPrefix);
    const outputDirectional = split.directional ? (directionalOutputPrefix || split.directional) : "";
    const baseCore = split.base;
    if (!split.directional) {
        let adjustedObjectPrefix = objectPrefix;
        if (adjustedObjectPrefix === "k" && baseCore.startsWith("k") && !indirectObjectMarker) {
            adjustedObjectPrefix = "";
        }
        adjustedObjectPrefix = applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
        let adjustedBase = baseCore;
        if (adjustedObjectPrefix.endsWith("k") && adjustedBase.startsWith("k")) {
            if (adjustedBase.startsWith("kw")) {
                adjustedObjectPrefix = adjustedObjectPrefix.slice(0, -1);
            } else {
                adjustedBase = adjustedBase.slice(1);
            }
        }
        return {
            prefix: subjectPrefix + adjustedObjectPrefix,
            base: adjustedBase,
        };
    }
    const isThirdPersonObject = baseObjectPrefix === "ki" || baseObjectPrefix === "kin";
    const isThirdPersonSubject = baseSubjectPrefix === "" && subjectPrefix === "";
    const subjectHead = (isThirdPersonSubject && outputDirectional === "al" && !isThirdPersonObject)
        ? "k"
        : subjectPrefix;
    if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti";
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        const objectHead = applyIndirectObjectMarker(dropK ? "" : "k", indirectObjectMarker);
        return {
            prefix: `${subjectHead}${objectHead}${outputDirectional}${objectTail}`,
            base: baseCore,
        };
    }
    let adjustedObjectPrefix = objectPrefix;
    if (adjustedObjectPrefix === "k" && baseCore.startsWith("k") && !indirectObjectMarker) {
        adjustedObjectPrefix = "";
    }
    adjustedObjectPrefix = applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
    let adjustedBase = baseCore;
    if (adjustedObjectPrefix.endsWith("k") && adjustedBase.startsWith("k")) {
        if (adjustedBase.startsWith("kw")) {
            adjustedObjectPrefix = adjustedObjectPrefix.slice(0, -1);
        } else {
            adjustedBase = adjustedBase.slice(1);
        }
    }
    return {
        prefix: subjectHead + outputDirectional + adjustedObjectPrefix,
        base: adjustedBase,
    };
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
    indirectObjectMarker = ""
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
                indirectObjectMarker
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
            indirectObjectMarker
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
    let {
        shouldMaskClassBSelection,
        shouldSkipClassA,
        shouldSkipClassB,
    } = getKVClassPolicy({
        context,
        isTransitive,
        isPreterit,
        classFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses,
    });
    if (forceClassBOnly) {
        return {
            isPreterit,
            shouldMaskClassBSelection: false,
            shouldSkipClassA: true,
            shouldSkipClassB: false,
        };
    }
    const isDeletionClusterIntransitive = !!(
        context
        && !context.isTransitive
        && context.deletionCreatesCluster
    );
    if (isDeletionClusterIntransitive) {
        return {
            isPreterit,
            shouldMaskClassBSelection: false,
            shouldSkipClassA: true,
            shouldSkipClassB: false,
        };
    }
    const isWiPattern = !!(
        context
        && context.isExactWiPattern
        && !context.isTransitive
        && !context.fromRootPlusYa
    );
    if (isWiPattern) {
        const isReduplicated = context.isReduplicated;
        const isPreteritSingular = isPreterit && subjectSuffix !== "t";
        const isPreteritPlural = isPreterit && subjectSuffix === "t";
        if (isReduplicated) {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        } else if (isPreteritSingular) {
            shouldSkipClassA = hasClassB;
        } else if (isPreteritPlural) {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        } else {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        }
    }
    const isCVliPattern = !!(
        context
        && !context.isTransitive
        && (context.isExactCVlV || context.isExactVlV || context.endsWithLV)
        && context.lastNucleus === "i"
    );
    if (isCVliPattern) {
        const penult = context.penultimateNucleus;
        const isPreteritSingular = isPreterit && subjectSuffix !== "t";
        if (penult === "e") {
            shouldSkipClassA = true;
            shouldSkipClassB = false;
            shouldMaskClassBSelection = false;
        } else if (penult === "u") {
            if (isPreteritSingular) {
                shouldSkipClassA = true;
                shouldSkipClassB = false;
                shouldMaskClassBSelection = false;
            } else {
                shouldSkipClassB = true;
                shouldMaskClassBSelection = shouldMaskClassBSelection || classFilter === "B";
            }
        }
    }
    const isCVpVPattern = !!(
        context
        && context.isExactCVpV
        && !context.isTransitive
    );
    if (isCVpVPattern) {
        const isPreteritSingular = isPreterit && subjectSuffix !== "t";
        if (isPreteritSingular) {
            shouldSkipClassA = hasClassB;
        } else {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        }
    }
    const isIntransitivePiPattern = !!(
        context
        && !context.isTransitive
        && context.endsWithPI
        && !context.isMonosyllable
    );
    if (isIntransitivePiPattern) {
        const isPreteritSingular = isPreterit && subjectSuffix !== "t";
        if (isPreteritSingular) {
            shouldSkipClassA = hasClassB;
        } else {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        }
    }
    const isCVVniPattern = !!(
        context
        && context.isExactCVVni
        && !context.isTransitive
    );
    if (isCVVniPattern) {
        const isPreteritSingular = isPreterit && subjectSuffix !== "t";
        if (isPreteritSingular) {
            shouldSkipClassA = hasClassB;
        } else {
            shouldSkipClassB = true;
            if (classFilter === "B") {
                shouldMaskClassBSelection = true;
            }
        }
    }
    return {
        isPreterit,
        shouldMaskClassBSelection,
        shouldSkipClassA,
        shouldSkipClassB,
    };
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
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
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
    const classOrder = classFilter ? [classFilter] : ["A", "B", "C", "D"];
    const hasClassA = variantsByClass.has("A");
    const hasClassB = variantsByClass.has("B");
    const {
        isPreterit,
        shouldMaskClassBSelection,
        shouldSkipClassA,
        shouldSkipClassB,
    } = resolvePretClassPolicy({
        context,
        tense,
        isTransitive,
        classFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses,
        subjectSuffix,
    });
    const usePretPluralOverride = isPreterit && subjectSuffix === "t" && suppletiveStemSet;
    const pretPluralSuffix = usePretPluralOverride ? suppletiveStemSet.pretPluralSuffix : null;
    const pretPluralClasses = usePretPluralOverride ? suppletiveStemSet.pretPluralClasses : null;
    const classExclusionsByTense = suppletiveStemSet?.classExclusionsByTense || null;
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
        const variants = variantsByClass.get(classKey);
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
                indirectObjectMarker
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
                    indirectObjectMarker
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
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
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
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
        });
        const candidates = getPretUniversalClassCandidates(context);
        const classAVariants = candidates.has("A") ? buildPretUniversalClassA(context) : null;
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
                    indirectObjectMarker
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
                    indirectObjectMarker
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
                exactBaseVerb,
                rootPlusYaBase,
                rootPlusYaBasePronounceable,
                derivationType,
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
        variants = suppletiveStemSet.variantsByClass.get(classKey) || null;
        if (subjectSuffix === "t" && suppletiveStemSet.pretPluralSuffix) {
            pluralSuffix = suppletiveStemSet.pretPluralSuffix;
        }
    } else {
        variants = getPretUniversalVariants(verb, tense, isTransitive, analysisTarget, {
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
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
        });
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
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
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
        indirectObjectMarker
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

function getSelectedTenseTab() {
    return TENSE_TABS_STATE.selected;
}

function setSelectedTenseTab(value) {
    if (TENSE_ORDER.includes(value)) {
        const previous = TENSE_TABS_STATE.selected;
        TENSE_TABS_STATE.selected = value;
        if (previous !== value) {
            resetToggleStateForTense(value);
        }
    }
}

function getSelectedPretUniversalTab() {
    return PRETERITO_UNIVERSAL_TABS_STATE.selected;
}

function setSelectedPretUniversalTab(value) {
    if (PRETERITO_UNIVERSAL_ORDER.includes(value)) {
        const previous = PRETERITO_UNIVERSAL_TABS_STATE.selected;
        PRETERITO_UNIVERSAL_TABS_STATE.selected = value;
        if (previous !== value) {
            resetToggleStateForTense(value);
        }
    }
}

// === Verb Parsing ===
function splitVerbSegments(core, hasLeadingDash) {
    let objectSegment = "";
    let verbSegment = core;
    let boundPrefixes = [];
    let hasBoundMarker = false;
    if (!hasLeadingDash && core.includes("-")) {
        const lastDashIndex = core.lastIndexOf("-");
        if (lastDashIndex > -1) {
            const leftSegment = core.slice(0, lastDashIndex);
            const rightSegment = core.slice(lastDashIndex + 1);
            if (leftSegment.includes("/") && rightSegment) {
                hasBoundMarker = true;
                boundPrefixes = leftSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
                verbSegment = rightSegment;
            }
        }
    }
    if (hasLeadingDash) {
        const dashSegments = core.split("-");
        if (dashSegments.length > 1) {
            const firstToken = dashSegments[0];
            const hasObjectToken = OBJECT_MARKERS.has(firstToken) || FUSION_PREFIXES.has(firstToken);
            let verbStartIndex = dashSegments.length - 1;
            if (hasObjectToken) {
                verbStartIndex = 1;
            } else {
                while (verbStartIndex > 0 && DIRECTIONAL_PREFIXES.includes(dashSegments[verbStartIndex - 1])) {
                    verbStartIndex -= 1;
                }
            }
            objectSegment = dashSegments.slice(0, verbStartIndex).join("-");
            verbSegment = dashSegments.slice(verbStartIndex).join("-");
        }
    }
    return { objectSegment, verbSegment, boundPrefixes, hasBoundMarker };
}

function getBoundDirectionalPrefix(boundPrefixes, hasBoundMarker) {
    let boundDirectionalPrefix = "";
    if (
        hasBoundMarker
        && boundPrefixes.length > 1
        && DIRECTIONAL_PREFIXES.includes(boundPrefixes[0])
        && FUSION_PREFIXES.has(boundPrefixes[1])
    ) {
        boundDirectionalPrefix = boundPrefixes.shift();
    }
    return boundDirectionalPrefix;
}

function getObjectParts(objectSegment, hasLeadingDash) {
    const objectParts = objectSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    let objectDirectionalPrefix = "";
    if (
        hasLeadingDash
        && objectParts.length > 1
        && DIRECTIONAL_PREFIXES.includes(objectParts[0])
        && FUSION_PREFIXES.has(objectParts[1])
    ) {
        objectDirectionalPrefix = objectParts.shift();
    }
    const objectToken = objectParts.length ? objectParts[objectParts.length - 1] : "";
    const objectBoundPrefixes = objectParts.length > 1 ? objectParts.slice(0, -1) : [];
    return { objectParts, objectToken, objectDirectionalPrefix, objectBoundPrefixes };
}

function getVerbParts(verbSegment, objectDirectionalPrefix) {
    const verbParts = verbSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    if (objectDirectionalPrefix && verbParts[0] !== objectDirectionalPrefix) {
        verbParts.unshift(objectDirectionalPrefix);
    }
    return verbParts;
}

function getDirectionalPrefixFromSlash(core, objectDirectionalPrefix, boundDirectionalPrefix) {
    if (objectDirectionalPrefix || boundDirectionalPrefix) {
        return "";
    }
    const slashIndex = core.indexOf("/");
    if (slashIndex > 0) {
        const rawCandidate = core.slice(0, slashIndex);
        const candidate = rawCandidate.replace(/^-+/, "");
        if (DIRECTIONAL_PREFIXES.includes(candidate)) {
            return candidate;
        }
        if (candidate === "al") {
            return "wal";
        }
    }
    return "";
}

function extractDirectionalFusionPrefix(verbParts, directionalPrefixFromSlash) {
    if (
        directionalPrefixFromSlash
        && verbParts.length > 1
        && verbParts[0] === directionalPrefixFromSlash
        && FUSION_PREFIXES.has(verbParts[1])
    ) {
        return {
            directionalFusionPrefix: verbParts[1],
            verbParts: [verbParts[0], ...verbParts.slice(2)],
        };
    }
    return { directionalFusionPrefix: "", verbParts };
}

function getFusionDirectionalPrefix({
    objectDirectionalPrefix,
    boundDirectionalPrefix,
    directionalFusionPrefix,
    directionalPrefixFromSlash,
}) {
    return objectDirectionalPrefix
        || boundDirectionalPrefix
        || (directionalFusionPrefix ? directionalPrefixFromSlash : "");
}

function getValenceSlotsFromCleaned(cleaned) {
    const slots = [];
    let token = "";
    for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "-") {
            slots.push(token);
            token = "";
            continue;
        }
        token += char;
    }
    return slots;
}

function getExactBaseVerbFromCleaned(cleaned) {
    if (!cleaned) {
        return "";
    }
    const segments = cleaned.split(/[-/]/).filter(Boolean);
    if (!segments.length) {
        return "";
    }
    const lastSegment = segments[segments.length - 1];
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\\/?-]/g;
    return lastSegment.replace(markerRe, "");
}

function getValenceCategoryFromToken(token) {
    if (!token) {
        return "specific";
    }
    const parts = token.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    const suffix = parts.length ? parts[parts.length - 1] : "";
    if (!suffix) {
        return "specific";
    }
    if (NONSPECIFIC_VALENCE_AFFIX_SET.has(suffix)) {
        return "nonspecific";
    }
    if (SPECIFIC_VALENCE_PREFIX_SET.has(suffix) || suffix === "k") {
        return "specific";
    }
    return "embedded";
}

function hasConsecutiveSpecificValences(valenceSlots) {
    let prevCategory = "";
    for (let i = 0; i < valenceSlots.length; i += 1) {
        const category = getValenceCategoryFromToken(valenceSlots[i]);
        if (category === "embedded") {
            continue;
        }
        if (prevCategory === "specific" && category === "specific") {
            return true;
        }
        prevCategory = category;
    }
    return false;
}

function resolveDirectionalRuleMode(parsedVerb, options = {}) {
    if (!parsedVerb) {
        return "";
    }
    const directionalPrefix = parsedVerb.directionalPrefix || "";
    if (!directionalPrefix || !DIRECTIONAL_PREFIXES.includes(directionalPrefix)) {
        return "";
    }
    const isNonactive = options.isNonactive === true;
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : (parsedVerb.derivationType || "");
    const derivationDelta = Number.isFinite(parsedVerb.derivationValencyDelta)
        ? parsedVerb.derivationValencyDelta
        : getDerivationValencyDelta(derivationType);
    const hasSpecificValence = isNonactive
        ? parsedVerb.hasNonactiveSpecificValence
        : parsedVerb.hasSpecificValence;
    const hasNonspecificValence = isNonactive
        ? parsedVerb.hasNonactiveNonspecificValence
        : parsedVerb.hasNonspecificValence;
    if (hasSpecificValence) {
        return "transitive";
    }
    if (!isNonactive && derivationDelta > 0) {
        return "transitive";
    }
    if (hasNonspecificValence) {
        return "nonspecific";
    }
    return "intransitive";
}

const DEFAULT_PARSE_PIPELINE = [
    { id: "supportive-i" },
    { id: "exact-base" },
    { id: "segments" },
    { id: "directional-fusion" },
    { id: "valence" },
    { id: "directional-rule-mode" },
    { id: "suppletives" },
    { id: "root-plus-ya" },
];

function normalizeParsePipeline(pipeline) {
    if (!Array.isArray(pipeline)) {
        return [];
    }
    const normalized = [];
    pipeline.forEach((entry) => {
        if (!entry) {
            return;
        }
        if (typeof entry === "string") {
            normalized.push({ id: entry, enabled: true });
            return;
        }
        if (typeof entry !== "object") {
            return;
        }
        const id = entry.id || entry.stage || entry.name;
        if (!id) {
            return;
        }
        normalized.push({ id, enabled: entry.enabled !== false });
    });
    return normalized;
}

function getParsePipeline() {
    return PARSE_PIPELINE.length ? PARSE_PIPELINE : DEFAULT_PARSE_PIPELINE;
}

function runParsePipeline(state) {
    const pipeline = getParsePipeline();
    pipeline.forEach((stage) => {
        if (!stage || stage.enabled === false) {
            return;
        }
        const id = stage.id || stage;
        const handler = PARSE_STAGE_HANDLERS.get(id);
        if (handler) {
            handler(state, stage);
        }
    });
    return state;
}

function buildParseState(rawInput) {
    const input = String(rawInput || "");
    const { base } = splitSearchInput(input);
    const raw = base.toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "");
    return {
        rawInput: input,
        raw,
        cleaned,
        cleanedSupportive: cleaned,
        hasOptionalSupportiveI: false,
        exactBaseVerb: "",
        displayVerb: cleaned,
        dashCount: 0,
        hasDoubleDash: false,
        hasLeadingDash: false,
        core: "",
        objectSegment: "",
        verbSegment: "",
        boundPrefixes: [],
        hasBoundMarker: false,
        boundDirectionalPrefix: "",
        objectParts: [],
        objectToken: "",
        objectDirectionalPrefix: "",
        objectBoundPrefixes: [],
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        verbParts: [],
        hasImpersonalTaPrefix: false,
        directionalPrefixFromSlash: "",
        directionalFusionPrefix: "",
        objectFusionPrefix: false,
        shouldUseVerbFusion: false,
        verbFusionPrefixes: [],
        indirectObjectMarker: "",
        directObjectToken: "",
        parts: [],
        selectorSuffix: "",
        fusionPrefixes: [],
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        isTaFusion: false,
        directionalPrefix: "",
        rawValenceSlots: [],
        embeddedValenceCount: 0,
        valenceSlots: [],
        valenceSlotCount: 0,
        totalValenceSlotCount: 0,
        isMarkedTransitive: false,
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directionalRuleMode: "",
        isYawi: false,
        isWeya: false,
    };
}

function getDirectionalRulesForPrefix(prefix, stage) {
    if (!prefix) {
        return [];
    }
    const rules = DIRECTIONAL_RULES.length ? DIRECTIONAL_RULES : DEFAULT_DIRECTIONAL_RULES;
    return rules.filter((rule) => {
        if (!rule || rule.enabled === false) {
            return false;
        }
        if (!Array.isArray(rule.prefixes) || !rule.prefixes.includes(prefix)) {
            return false;
        }
        if (!stage) {
            return true;
        }
        return Array.isArray(rule.stages) && rule.stages.includes(stage);
    });
}

function applyDirectionalRules(context, stage) {
    let next = { ...context };
    const rules = getDirectionalRulesForPrefix(next.directionalInputPrefix, stage);
    rules.forEach((rule) => {
        if (next.isNounTense && rule.applyToNouns === false) {
            return;
        }
        if (!next.isNounTense && rule.applyToVerbs === false) {
            return;
        }
        const handler = DIRECTIONAL_RULE_HANDLERS.get(rule.handler);
        if (handler) {
            const updated = handler(next, rule, stage);
            if (updated) {
                next = updated;
            }
        }
    });
    return next;
}

function applyWalDirectionalRule(context, rule, stage) {
    let {
        subjectPrefix,
        objectPrefix,
        verb,
        directionalOutputPrefix,
        directionalInputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
    } = context;
    if (stage === "prefix") {
        const hasSecondValent = Boolean(baseObjectPrefix || indirectObjectMarker || isTaFusion);
        const hasFirstValent = hasSubjectValent !== false;
        const isThirdPersonSubject = baseSubjectPrefix === "";
        const hasNonspecificObject = NONSPECIFIC_VALENCE_AFFIX_SET.has(baseObjectPrefix)
            || NONSPECIFIC_VALENCE_AFFIX_SET.has(indirectObjectMarker || "");
        const isThirdPersonMarker = (value) => value === "ki" || value === "kin" || value === "k";
        const shouldUseAl = (forceTransitiveDirectional
            ? hasFirstValent
            : (forceNonspecificDirectional
                ? (hasFirstValent && !isThirdPersonSubject)
                : (!forceIntransitiveDirectional && !isIntransitiveVerb && hasSecondValent && hasFirstValent)))
            && !hasNonspecificObject;
        let useAl = false;
        if (shouldUseAl) {
            const isThirdPersonObject =
                isThirdPersonMarker(baseObjectPrefix)
                || (indirectObjectMarker && isThirdPersonMarker(indirectObjectMarker));
            const hasNonspecificObject = NONSPECIFIC_VALENCE_AFFIX_SET.has(baseObjectPrefix)
                || NONSPECIFIC_VALENCE_AFFIX_SET.has(indirectObjectMarker || "");
            if (baseSubjectPrefix === "ni") {
                subjectPrefix = "n";
            } else if (baseSubjectPrefix === "ti") {
                subjectPrefix = "t";
            } else if (baseSubjectPrefix === "" && !isThirdPersonObject && !hasNonspecificObject) {
                subjectPrefix = "k";
            }
            useAl = true;
        }
        if (useAl && baseObjectPrefix === "ki") {
            objectPrefix = "k";
        }
        if (useAl) {
            directionalOutputPrefix = "al";
        }
    }
    if (stage === "post-elision" && verb.startsWith(directionalInputPrefix)) {
        const stem = verb.slice(directionalInputPrefix.length);
        const isThirdPersonMarker = (value) => value === "ki" || value === "kin" || value === "k";
        const isThirdPersonObject =
            isThirdPersonMarker(baseObjectPrefix)
            || (indirectObjectMarker && isThirdPersonMarker(indirectObjectMarker));
        if (directionalInputPrefix === "wal" && isThirdPersonObject) {
            const dropK = baseSubjectPrefix === "ni"
                || baseSubjectPrefix === "ti"
                || directionalRuleMode === "intransitive"
                || directionalRuleMode === "nonspecific";
            objectPrefix = dropK ? "" : "k";
            const objectTail = baseObjectPrefix === "kin" ? "in" : "";
            verb = `${directionalOutputPrefix}${objectTail}${stem}`;
        } else {
            verb = stem;
            objectPrefix = `${directionalOutputPrefix}${objectPrefix}`;
        }
    }
    return {
        ...context,
        subjectPrefix,
        objectPrefix,
        verb,
        directionalOutputPrefix,
    };
}

function applyWalNounPlacement(context) {
    if (!context.isNounTense) {
        return context;
    }
    if (context.directionalInputPrefix !== "wal") {
        return context;
    }
    const nounObjectPrefixes = new Set(["ta", "te", "mu"]);
    if (!nounObjectPrefixes.has(context.objectPrefix)) {
        return context;
    }
    const verb = context.verb || "";
    if (!verb.startsWith("wal")) {
        return context;
    }
    const stem = verb.slice(3);
    if (!stem) {
        return context;
    }
    return {
        ...context,
        objectPrefix: `wal${context.objectPrefix}`,
        verb: stem,
    };
}

const DIRECTIONAL_RULE_HANDLERS = new Map([
    ["wal-alternation", applyWalDirectionalRule],
    ["wal-noun-placement", applyWalNounPlacement],
]);

function parseStageSupportiveI(state) {
    const cleaned = state.cleaned || "";
    state.hasOptionalSupportiveI = cleaned.includes(OPTIONAL_SUPPORTIVE_I_MARKER);
    state.cleanedSupportive = state.hasOptionalSupportiveI
        ? cleaned.replace(OPTIONAL_SUPPORTIVE_I_RE, "")
        : cleaned;
}

function parseStageExactBase(state) {
    state.exactBaseVerb = getExactBaseVerbFromCleaned(state.cleanedSupportive || "");
}

function parseStageSegments(state) {
    const cleanedSupportive = state.cleanedSupportive || "";
    state.dashCount = (cleanedSupportive.match(/-/g) || []).length;
    state.hasDoubleDash = cleanedSupportive.includes("--");
    state.hasLeadingDash = cleanedSupportive.startsWith("-");
    state.core = state.hasLeadingDash ? cleanedSupportive.slice(1) : cleanedSupportive;
    const segmentInfo = splitVerbSegments(state.core, state.hasLeadingDash);
    state.objectSegment = segmentInfo.objectSegment;
    state.verbSegment = segmentInfo.verbSegment;
    state.boundPrefixes = segmentInfo.boundPrefixes;
    state.hasBoundMarker = segmentInfo.hasBoundMarker;
    state.boundDirectionalPrefix = getBoundDirectionalPrefix(state.boundPrefixes, state.hasBoundMarker);
    const objectInfo = getObjectParts(state.objectSegment, state.hasLeadingDash);
    state.objectParts = objectInfo.objectParts;
    state.objectToken = objectInfo.objectToken;
    state.objectDirectionalPrefix = objectInfo.objectDirectionalPrefix;
    state.objectBoundPrefixes = objectInfo.objectBoundPrefixes;
    state.hasCompoundMarker = COMPOUND_MARKER_SPLIT_RE.test(state.verbSegment);
    state.hasSlashMarker = state.verbSegment.includes("/");
    state.hasSuffixSeparator = state.verbSegment.includes("-");
    state.verbParts = getVerbParts(state.verbSegment, state.objectDirectionalPrefix);
    state.hasImpersonalTaPrefix = state.hasSlashMarker
        && state.verbParts.length > 1
        && state.verbParts[0] === "ta";
}

function parseStageDirectionalFusion(state) {
    const core = state.core || "";
    const objectDirectionalPrefix = state.objectDirectionalPrefix || "";
    const boundDirectionalPrefix = state.boundDirectionalPrefix || "";
    const hasLeadingDash = state.hasLeadingDash;
    const hasImpersonalTaPrefix = state.hasImpersonalTaPrefix;
    let verbParts = Array.isArray(state.verbParts) ? [...state.verbParts] : [];
    const directionalPrefixFromSlash = getDirectionalPrefixFromSlash(
        core,
        objectDirectionalPrefix,
        boundDirectionalPrefix
    );
    state.directionalPrefixFromSlash = directionalPrefixFromSlash;
    if (directionalPrefixFromSlash === "wal" && verbParts[0] === "al") {
        verbParts[0] = "wal";
    }
    const directionalFusionExtraction = extractDirectionalFusionPrefix(
        verbParts,
        directionalPrefixFromSlash
    );
    let directionalFusionPrefix = directionalFusionExtraction.directionalFusionPrefix;
    verbParts = directionalFusionExtraction.verbParts;
    state.directionalFusionPrefix = directionalFusionPrefix;
    state.verbParts = verbParts;
    if (state.hasSlashMarker && verbParts.length > 1) {
        const slashPrefix = verbParts[0];
        const isDirectionalSlash = DIRECTIONAL_PREFIXES.includes(slashPrefix) || slashPrefix === "al";
        const isImpersonalSlash = slashPrefix === "ta";
        if (!isDirectionalSlash && !isImpersonalSlash) {
            state.hasBoundMarker = true;
            if (!state.boundPrefixes.includes(slashPrefix)) {
                state.boundPrefixes.unshift(slashPrefix);
            }
        }
    }
    const objectToken = state.objectToken || "";
    const objectFusionPrefix = FUSION_PREFIXES.has(objectToken)
        && verbParts.length > 0;
    const shouldUseVerbFusion = !hasLeadingDash || objectFusionPrefix;
    const verbFusionPrefixes = [];
    if (shouldUseVerbFusion) {
        for (let i = 0; i < verbParts.length - 1; i += 1) {
            if (hasImpersonalTaPrefix) {
                break;
            }
            if (FUSION_PREFIXES.has(verbParts[i])) {
                verbFusionPrefixes.push(verbParts[i]);
            } else {
                break;
            }
        }
    }
    let indirectObjectMarker = OBJECT_MARKERS.has(objectToken)
        && !objectFusionPrefix
        ? objectToken
        : "";
    let directObjectToken = objectToken && !indirectObjectMarker ? objectToken : "";
    let parts = verbParts.slice(verbFusionPrefixes.length);
    if (!hasImpersonalTaPrefix && parts.length > 1 && OBJECT_MARKERS.has(parts[0])) {
        if (!indirectObjectMarker) {
            indirectObjectMarker = parts[0];
        }
        parts = parts.slice(1);
    }
    const knownSuffixes = getKnownTenseSuffixes();
    let selectorSuffix = "";
    if (state.hasSuffixSeparator && parts.length > 1) {
        const suffixToken = parts[parts.length - 1];
        if (knownSuffixes.has(suffixToken)) {
            selectorSuffix = suffixToken;
            parts = parts.slice(0, -1);
        }
    }
    const fusionPrefixes = [];
    if (objectFusionPrefix && state.objectBoundPrefixes.length) {
        fusionPrefixes.push(...state.objectBoundPrefixes);
    }
    if (objectFusionPrefix) {
        fusionPrefixes.push(objectToken);
        directObjectToken = "";
    }
    if (directionalFusionPrefix) {
        fusionPrefixes.push(directionalFusionPrefix);
    }
    if (verbFusionPrefixes.length) {
        fusionPrefixes.push(...verbFusionPrefixes);
    }
    if (state.hasBoundMarker && state.boundPrefixes.length) {
        fusionPrefixes.push(...state.boundPrefixes);
    }
    let verb = parts.join("");
    let analysisVerb = parts.length ? parts[parts.length - 1] : verb;
    let rawAnalysisVerb = analysisVerb;
    if (!analysisVerb) {
        analysisVerb = verb;
        rawAnalysisVerb = analysisVerb;
    }
    const isTaFusion = fusionPrefixes.some((prefix) => FUSION_PREFIXES.has(prefix)) && verb.length > 0;
    if (isTaFusion) {
        const fusionDirectionalPrefix = getFusionDirectionalPrefix({
            objectDirectionalPrefix,
            boundDirectionalPrefix,
            directionalFusionPrefix,
            directionalPrefixFromSlash,
        });
        if (fusionDirectionalPrefix) {
            if (verb.startsWith(fusionDirectionalPrefix)) {
                verb = `${fusionDirectionalPrefix}${fusionPrefixes.join("")}${verb.slice(fusionDirectionalPrefix.length)}`;
            } else {
                verb = `${fusionDirectionalPrefix}${fusionPrefixes.join("")}${verb}`;
            }
        } else {
            verb = `${fusionPrefixes.join("")}${verb}`;
        }
        indirectObjectMarker = "";
        directObjectToken = "";
        if (!state.hasBoundMarker) {
            analysisVerb = verb;
            rawAnalysisVerb = analysisVerb;
        }
    }
    let directionalPrefix = "";
    if (objectDirectionalPrefix) {
        directionalPrefix = objectDirectionalPrefix;
    } else if (boundDirectionalPrefix) {
        directionalPrefix = boundDirectionalPrefix;
    } else if (directionalPrefixFromSlash) {
        directionalPrefix = directionalPrefixFromSlash;
    }
    state.objectFusionPrefix = objectFusionPrefix;
    state.shouldUseVerbFusion = shouldUseVerbFusion;
    state.verbFusionPrefixes = verbFusionPrefixes;
    state.indirectObjectMarker = indirectObjectMarker;
    state.directObjectToken = directObjectToken;
    state.parts = parts;
    state.selectorSuffix = selectorSuffix;
    state.fusionPrefixes = fusionPrefixes;
    state.verb = verb;
    state.analysisVerb = analysisVerb;
    state.rawAnalysisVerb = rawAnalysisVerb;
    state.isTaFusion = isTaFusion;
    state.directionalPrefix = directionalPrefix;
}

function parseStageValence(state) {
    const rawValenceSlots = getValenceSlotsFromCleaned(state.cleanedSupportive || "");
    let embeddedValenceCount = 0;
    const valenceSlots = rawValenceSlots.filter((slot) => {
        const category = getValenceCategoryFromToken(slot);
        if (category === "embedded") {
            embeddedValenceCount += 1;
            return false;
        }
        return category === "specific" || category === "nonspecific";
    });
    let valenceSlotCount = valenceSlots.length;
    let totalValenceSlotCount = valenceSlotCount + embeddedValenceCount;
    let isMarkedTransitive = totalValenceSlotCount > 0;
    let hasSpecificValence = false;
    let hasNonspecificValence = false;
    valenceSlots.forEach((slot) => {
        const category = getValenceCategoryFromToken(slot);
        if (category === "specific") {
            hasSpecificValence = true;
        } else if (category === "nonspecific") {
            hasNonspecificValence = true;
        }
    });
    const nonactiveValenceSlots = valenceSlots.length > 0 ? valenceSlots.slice(1) : [];
    let hasNonactiveSpecificValence = false;
    let hasNonactiveNonspecificValence = false;
    nonactiveValenceSlots.forEach((slot) => {
        const category = getValenceCategoryFromToken(slot);
        if (category === "specific") {
            hasNonactiveSpecificValence = true;
        } else if (category === "nonspecific") {
            hasNonactiveNonspecificValence = true;
        }
    });
    let hasSpecificSequence = hasConsecutiveSpecificValences(valenceSlots);
    if (state.hasImpersonalTaPrefix) {
        embeddedValenceCount = 0;
        valenceSlotCount = 0;
        totalValenceSlotCount = 0;
        isMarkedTransitive = false;
        hasSpecificValence = false;
        hasNonspecificValence = false;
        hasNonactiveSpecificValence = false;
        hasNonactiveNonspecificValence = false;
        hasSpecificSequence = false;
    }
    state.rawValenceSlots = rawValenceSlots;
    state.embeddedValenceCount = embeddedValenceCount;
    state.valenceSlots = valenceSlots;
    state.valenceSlotCount = valenceSlotCount;
    state.totalValenceSlotCount = totalValenceSlotCount;
    state.isMarkedTransitive = isMarkedTransitive;
    state.hasSpecificValence = hasSpecificValence;
    state.hasNonspecificValence = hasNonspecificValence;
    state.hasNonactiveSpecificValence = hasNonactiveSpecificValence;
    state.hasNonactiveNonspecificValence = hasNonactiveNonspecificValence;
    state.hasConsecutiveSpecificValences = hasSpecificSequence;
}

function parseStageDirectionalRuleMode(state) {
    const directionalPrefix = state.directionalPrefix || "";
    const directionalRuleMode = directionalPrefix && DIRECTIONAL_PREFIXES.includes(directionalPrefix)
        ? (state.hasSpecificValence
            ? "transitive"
            : (state.hasNonspecificValence ? "nonspecific" : "intransitive"))
        : "";
    state.directionalRuleMode = directionalRuleMode;
}

function parseStageSuppletives(state) {
    const yawiCanonical = getSuppletiveYawiCanonical();
    const yawiImperfective = getSuppletiveYawiImperfective();
    const isYawi = state.analysisVerb === yawiCanonical;
    if (isYawi) {
        state.analysisVerb = yawiImperfective;
        if (state.verb.endsWith(yawiCanonical)) {
            state.verb = state.verb.slice(0, -yawiCanonical.length) + yawiImperfective;
        }
    }
    const isWeya = SUPPLETIVE_WEYA_FORMS.has(state.analysisVerb);
    if (isWeya) {
        const baseForm = state.analysisVerb;
        const canonical = getSuppletiveWeyaCanonical();
        state.analysisVerb = canonical;
        if (state.verb.endsWith(baseForm)) {
            state.verb = state.verb.slice(0, -baseForm.length) + canonical;
        }
    }
    state.isYawi = isYawi;
    state.isWeya = isWeya;
}

function parseStageRootPlusYa(state) {
    const analysisVerb = state.analysisVerb || state.verb || "";
    if (!analysisVerb) {
        state.rootPlusYaBase = "";
        state.rootPlusYaBasePronounceable = "";
        state.isRootPlusYa = false;
        return;
    }
    const sourceVerb = state.exactBaseVerb || getDerivationRuleBase(analysisVerb, state);
    const rootPlusYaSource = state.hasImpersonalTaPrefix ? (state.verb || sourceVerb) : sourceVerb;
    const rootPlusYaBase = getRootPlusYaBase(rootPlusYaSource, {
        isTransitive: state.isMarkedTransitive === true,
        isYawi: state.isYawi === true,
        isWeya: state.isWeya === true,
    });
    const pronounceableBase = rootPlusYaBase
        && areSyllablesPronounceable(splitVerbSyllables(rootPlusYaBase))
        ? rootPlusYaBase
        : "";
    state.rootPlusYaBase = rootPlusYaBase || "";
    state.rootPlusYaBasePronounceable = pronounceableBase;
    state.isRootPlusYa = Boolean(rootPlusYaBase);
}

function buildCanonicalVerbState(state) {
    const verb = state.verb || "";
    const analysisVerb = state.analysisVerb || verb;
    const rawAnalysisVerb = state.rawAnalysisVerb || analysisVerb;
    const ruleBase = getDerivationRuleBase(analysisVerb || verb, state);
    const fullRuleBase = normalizeRuleBase(rawAnalysisVerb || analysisVerb || verb);
    return {
        verb,
        analysisVerb,
        rawAnalysisVerb,
        ruleBase,
        fullRuleBase,
        hasSlashMarker: state.hasSlashMarker,
        hasLeadingDash: state.hasLeadingDash,
        dashCount: state.dashCount,
        objectSegment: state.objectSegment,
        verbSegment: state.verbSegment,
        objectToken: state.objectToken,
        directObjectToken: state.directObjectToken,
        indirectObjectMarker: state.indirectObjectMarker,
        selectorSuffix: state.selectorSuffix,
        boundPrefixes: state.boundPrefixes,
        fusionPrefixes: state.fusionPrefixes,
        directionalPrefix: state.directionalPrefix,
        directionalRuleMode: state.directionalRuleMode,
        hasImpersonalTaPrefix: state.hasImpersonalTaPrefix,
        hasSuffixSeparator: state.hasSuffixSeparator,
        hasCompoundMarker: state.hasCompoundMarker,
        hasBoundMarker: state.hasBoundMarker,
        hasSpecificValence: state.hasSpecificValence,
        hasNonspecificValence: state.hasNonspecificValence,
        hasNonactiveSpecificValence: state.hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence: state.hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences: state.hasConsecutiveSpecificValences,
        valenceSlotCount: state.valenceSlotCount,
        embeddedValenceCount: state.embeddedValenceCount,
        totalValenceSlotCount: state.totalValenceSlotCount,
        rootPlusYaBase: state.rootPlusYaBase,
        rootPlusYaBasePronounceable: state.rootPlusYaBasePronounceable,
        isRootPlusYa: state.isRootPlusYa,
        isMarkedTransitive: state.isMarkedTransitive,
        isTaFusion: state.isTaFusion,
        isYawi: state.isYawi,
        isWeya: state.isWeya,
    };
}

const PARSE_STAGE_HANDLERS = new Map([
    ["supportive-i", parseStageSupportiveI],
    ["exact-base", parseStageExactBase],
    ["segments", parseStageSegments],
    ["directional-fusion", parseStageDirectionalFusion],
    ["valence", parseStageValence],
    ["directional-rule-mode", parseStageDirectionalRuleMode],
    ["suppletives", parseStageSuppletives],
    ["root-plus-ya", parseStageRootPlusYa],
]);

function parseVerbInput(value) {
    const state = buildParseState(value);
    runParsePipeline(state);
    const canonical = buildCanonicalVerbState(state);
    state.canonical = canonical;
    return {
        verb: state.verb,
        analysisVerb: state.analysisVerb,
        rawAnalysisVerb: state.rawAnalysisVerb,
        hasCompoundMarker: state.hasCompoundMarker,
        hasSlashMarker: state.hasSlashMarker,
        hasSuffixSeparator: state.hasSuffixSeparator,
        hasImpersonalTaPrefix: state.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: state.hasOptionalSupportiveI,
        hasBoundMarker: state.hasBoundMarker,
        isMarkedTransitive: state.isMarkedTransitive,
        isTaFusion: state.isTaFusion,
        isYawi: state.isYawi,
        isWeya: state.isWeya,
        rootPlusYaBase: state.rootPlusYaBase,
        rootPlusYaBasePronounceable: state.rootPlusYaBasePronounceable,
        isRootPlusYa: state.isRootPlusYa,
        directionalPrefix: state.directionalPrefix,
        directionalRuleMode: state.directionalRuleMode,
        hasSpecificValence: state.hasSpecificValence,
        hasNonspecificValence: state.hasNonspecificValence,
        hasNonactiveSpecificValence: state.hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence: state.hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences: state.hasConsecutiveSpecificValences,
        directObjectToken: state.directObjectToken,
        indirectObjectMarker: state.indirectObjectMarker,
        selectorSuffix: state.selectorSuffix,
        displayVerb: state.displayVerb,
        exactBaseVerb: state.exactBaseVerb,
        hasLeadingDash: state.hasLeadingDash,
        dashCount: state.dashCount,
        hasDoubleDash: state.hasDoubleDash,
        valenceSlotCount: state.valenceSlotCount,
        embeddedValenceCount: state.embeddedValenceCount,
        totalValenceSlotCount: state.totalValenceSlotCount,
        fusionPrefixes: state.fusionPrefixes,
        boundPrefixes: state.boundPrefixes,
        objectSegment: state.objectSegment,
        verbSegment: state.verbSegment,
        objectToken: state.objectToken,
        canonical,
        canonicalRuleBase: canonical.ruleBase,
        canonicalFullRuleBase: canonical.fullRuleBase,
    };
}

// === Suppletive Stem Paths ===
let SUPPLETIVE_YE_FORMS = new Set();
let SUPPLETIVE_YE_IMPERFECTIVE = "";
let SUPPLETIVE_YE_CLASS_A = "";
let SUPPLETIVE_YE_CLASS_D = "";
let SUPPLETIVE_YE_CLASS_EXCLUSIONS = {};
let SUPPLETIVE_YE_NONACTIVE = "";
let SUPPLETIVE_YAWI_FORMS = new Set();
let SUPPLETIVE_YAWI_CANONICAL = "";
let SUPPLETIVE_YAWI_IMPERFECTIVE = "";
let SUPPLETIVE_YAWI_SHORT = "";
let SUPPLETIVE_YAWI_YU_VARIANT = "";
let SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE = "";
let SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE = "";
let SUPPLETIVE_WEYA_FORMS = new Set();
let SUPPLETIVE_WEYA_ROOT = "";
let SUPPLETIVE_WEYA_CANONICAL = "";
let SUPPLETIVE_WITZI_FORMS = new Set();
let SUPPLETIVE_WITZI_IMPERFECTIVE = "";
let SUPPLETIVE_WITZI_IMPERATIVE = "";
let SUPPLETIVE_WITZI_NONACTIVE = "";
let SUPPLETIVE_WITZI_NONACTIVE_TENSES = new Set();
let SUPPLETIVE_STEM_PATHS = [];

function dropFinalVowel(stem) {
    if (!stem) {
        return stem;
    }
    return VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
}

function getSuppletiveYawiCanonical() {
    return SUPPLETIVE_YAWI_CANONICAL || "yawi";
}

function getSuppletiveYawiImperfective() {
    return SUPPLETIVE_YAWI_IMPERFECTIVE || "ya";
}

function getSuppletiveYawiShort() {
    return SUPPLETIVE_YAWI_SHORT || "yaw";
}

function getSuppletiveYawiYuVariant() {
    return SUPPLETIVE_YAWI_YU_VARIANT || "yu";
}

function getSuppletiveYawiCausativeActive() {
    return SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE || "wika";
}

function getSuppletiveYawiCausativeNonactive() {
    return SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE || "wikalu";
}

function getSuppletiveWeyaRootPlusYaBase() {
    return SUPPLETIVE_WEYA_ROOT || "wey";
}

function getSuppletiveWeyaCanonical() {
    if (SUPPLETIVE_WEYA_CANONICAL) {
        return SUPPLETIVE_WEYA_CANONICAL;
    }
    const rootBase = getSuppletiveWeyaRootPlusYaBase();
    return rootBase ? `${rootBase}ya` : "weyya";
}

function buildSuppletiveYeStemSet() {
    const variantsByClass = new Map();
    variantsByClass.set("A", [{ base: dropFinalVowel(SUPPLETIVE_YE_CLASS_A), suffix: "ki" }]);
    variantsByClass.set("D", [{ base: `${SUPPLETIVE_YE_CLASS_D}j`, suffix: "" }]);
    return {
        imperfective: { verb: SUPPLETIVE_YE_IMPERFECTIVE, analysisVerb: SUPPLETIVE_YE_IMPERFECTIVE },
        variantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"]),
        classExclusionsByTense: SUPPLETIVE_YE_CLASS_EXCLUSIONS,
    };
}

function buildSuppletiveYawiStemSet() {
    const base = getSuppletiveYawiImperfective();
    const variantsByClass = new Map();
    variantsByClass.set("D", [{ base: `${base}j`, suffix: "ki" }]);
    return {
        imperfective: { verb: base, analysisVerb: base },
        variantsByClass,
    };
}

function buildSuppletiveWitziStemSet() {
    const base = dropFinalVowel(SUPPLETIVE_WITZI_IMPERFECTIVE);
    const variantsByClass = new Map();
    variantsByClass.set("A", [{ base, suffix: "" }]);
    return {
        imperfective: { verb: SUPPLETIVE_WITZI_IMPERFECTIVE, analysisVerb: SUPPLETIVE_WITZI_IMPERFECTIVE },
        variantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"]),
    };
}

function getSuppletiveStemPath(parsedVerb) {
    if (!parsedVerb) {
        return null;
    }
    const resolveEntryValue = (value) => {
        if (!value) {
            return null;
        }
        if (typeof value === "function") {
            return value(parsedVerb);
        }
        return value;
    };
    for (const entry of SUPPLETIVE_STEM_PATHS) {
        if (entry.match(parsedVerb)) {
            return {
                path: "suppletive",
                id: entry.id,
                stemSet: resolveEntryValue(entry.active),
                nonactiveOptions: resolveEntryValue(entry.nonactive),
                activeTenses: entry.activeTenses || null,
                tenseSuffixOverrides: entry.tenseSuffixOverrides || null,
                verbOverrides: entry.verbOverrides || null,
                nonactiveTenses: entry.nonactiveTenses || null,
            };
        }
    }
    return null;
}

function getSuppletiveStemSet(parsedVerb) {
    return getSuppletiveStemPath(parsedVerb)?.stemSet || null;
}

function getSuppletiveNonactiveOptions(parsedVerb) {
    const path = getSuppletiveStemPath(parsedVerb);
    const options = path?.nonactiveOptions || null;
    return options && options.length ? options : null;
}

function isPerfectiveTense(tense) {
    return (
        PRETERITO_CLASS_TENSES.has(tense)
        || PRETERITO_UNIVERSAL_ORDER.includes(tense)
        || tense === "preterito"
    );
}

function getParsedVerbForTab(tabId, rawValue, options = {}) {
    const raw = typeof rawValue === "string" ? rawValue : "";
    const effectiveRaw = options.useSearchBase === false ? raw : getSearchInputBase(raw);
    const parsed = parseVerbInput(effectiveRaw);
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : getActiveDerivationType();
    const derivationValencyDelta = getDerivationValencyDelta(derivationType);
    return {
        ...parsed,
        tabId: tabId || "",
        derivationType,
        derivationValencyDelta,
    };
}

function getVerbInputMeta() {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return {
            verb: "",
            analysisVerb: "",
            rawAnalysisVerb: "",
            hasCompoundMarker: false,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasBoundMarker: false,
            hasImpersonalTaPrefix: false,
            hasOptionalSupportiveI: false,
            isMarkedTransitive: false,
            isYawi: false,
            isWeya: false,
            directionalPrefix: "",
            directionalRuleMode: "",
            hasSpecificValence: false,
            hasNonspecificValence: false,
            hasNonactiveSpecificValence: false,
            hasNonactiveNonspecificValence: false,
            hasConsecutiveSpecificValences: false,
            directObjectToken: "",
            indirectObjectMarker: "",
            selectorSuffix: "",
            isTaFusion: false,
            displayVerb: "",
            exactBaseVerb: "",
            hasLeadingDash: false,
            dashCount: 0,
            valenceSlotCount: 0,
            embeddedValenceCount: 0,
            totalValenceSlotCount: 0,
            fusionPrefixes: [],
            boundPrefixes: [],
            derivationType: getActiveDerivationType(),
            derivationValencyDelta: getDerivationValencyDelta(getActiveDerivationType()),
        };
    }
    const raw = verbInput.value;
    return getParsedVerbForTab("verb-input", raw, { derivationType: getActiveDerivationType() });
}

// === Conjugation Search ===
function splitSearchInput(rawValue) {
    const raw = String(rawValue || "");
    const index = raw.indexOf("?");
    if (index === -1) {
        return { base: raw, query: "", hasQuery: false };
    }
    return {
        base: raw.slice(0, index),
        query: raw.slice(index + 1),
        hasQuery: true,
    };
}

function getSearchParts(rawValue) {
    const parts = splitSearchInput(rawValue);
    return {
        ...parts,
        trimmedBase: parts.base.trim(),
        trimmedQuery: parts.query.trim(),
    };
}

function rememberNonSearchValue(parts) {
    const trimmedBase = parts.trimmedBase ?? String(parts.base || "").trim();
    if (trimmedBase) {
        VERB_INPUT_STATE.lastNonSearchValue = parts.base;
        return parts.base;
    }
    return "";
}

function getSearchInputBase(rawValue) {
    const { base, hasQuery, trimmedBase } = getSearchParts(rawValue);
    if (trimmedBase) {
        return base;
    }
    if (hasQuery) {
        return VERB_INPUT_STATE.lastNonSearchValue || "";
    }
    return rawValue;
}

function getSearchQueryInfo(rawValue) {
    const { trimmedQuery } = getSearchParts(rawValue);
    const trimmed = trimmedQuery;
    if (!trimmed) {
        return null;
    }
    const startsWithDash = trimmed.startsWith("-");
    const endsWithDash = trimmed.endsWith("-");
    let mode = "exact";
    let term = trimmed;
    if (startsWithDash && endsWithDash && trimmed.length > 1) {
        mode = "contains";
        term = trimmed.slice(1, -1);
    } else if (startsWithDash) {
        mode = "ends";
        term = trimmed.slice(1);
    } else if (endsWithDash) {
        mode = "starts";
        term = trimmed.slice(0, -1);
    }
    if (!term.trim()) {
        return null;
    }
    return { mode, term };
}

function isSearchModeInput(rawValue) {
    const info = getSearchQueryInfo(rawValue);
    return !!info;
}

function normalizeConjugationSearchText(value) {
    return String(value || "").toLowerCase().replace(/[^a-z]/g, "");
}

function matchesSearchVariant(variant, normalizedSearch, matchMode) {
    switch (matchMode) {
        case "contains":
            return variant.includes(normalizedSearch);
        case "starts":
            return variant.startsWith(normalizedSearch);
        case "ends":
            return variant.endsWith(normalizedSearch);
        default:
            return variant === normalizedSearch;
    }
}

function getCurrentSearchTense() {
    if (getActiveTenseMode() === TENSE_MODE.sustantivo) {
        return getSelectedTenseTab();
    }
    if (getActiveConjugationGroup() === CONJUGATION_GROUPS.universal) {
        return getSelectedPretUniversalTab();
    }
    return getSelectedTenseTab();
}

function getSearchModeGroups(mode) {
    return mode === TENSE_MODE.sustantivo
        ? [CONJUGATION_GROUPS.tense]
        : [CONJUGATION_GROUPS.tense, CONJUGATION_GROUPS.universal];
}

function getSearchGroupTenseOrder(mode, group) {
    if (mode === TENSE_MODE.sustantivo) {
        return getTenseOrderForMode(TENSE_MODE.sustantivo);
    }
    if (group === CONJUGATION_GROUPS.universal) {
        return PRETERITO_UNIVERSAL_ORDER.slice();
    }
    return getTenseOrderForMode(TENSE_MODE.verbo);
}

function buildSearchPlanAcrossModes() {
    const plan = [];
    const seen = new Set();
    const pushTarget = (mode, group, tenseValue) => {
        const key = `${mode}|${group}|${tenseValue}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        plan.push({ mode, group, tenseValue });
    };
    const addGroup = (mode, group, primaryTense) => {
        const order = getSearchGroupTenseOrder(mode, group);
        if (primaryTense && order.includes(primaryTense)) {
            pushTarget(mode, group, primaryTense);
        }
        order.forEach((tenseValue) => {
            if (tenseValue === primaryTense) {
                return;
            }
            pushTarget(mode, group, tenseValue);
        });
    };
    const activeMode = getActiveTenseMode();
    const activeGroup = activeMode === TENSE_MODE.sustantivo
        ? CONJUGATION_GROUPS.tense
        : getActiveConjugationGroup();
    const currentTense = getCurrentSearchTense();

    addGroup(activeMode, activeGroup, currentTense);
    getSearchModeGroups(activeMode)
        .filter((group) => group !== activeGroup)
        .forEach((group) => addGroup(activeMode, group));

    [TENSE_MODE.verbo, TENSE_MODE.sustantivo]
        .filter((mode) => mode !== activeMode)
        .forEach((mode) => {
            getSearchModeGroups(mode).forEach((group) => addGroup(mode, group));
        });

    return plan;
}

function getNounPossessorKey(tenseValue) {
    const groupKey = SUSTANTIVO_VERBAL_PREFIXES.join("|");
    return `noun|${tenseValue}|${groupKey}|possessor`;
}

function getDefaultPossessorForTense(tenseValue) {
    if (tenseValue === "calificativo-instrumentivo") {
        return "i";
    }
    return "";
}

function getSearchPossessorPlan(tenseValue) {
    const possessorKey = getNounPossessorKey(tenseValue);
    const stored = POSSESSOR_TOGGLE_STATE.get(possessorKey);
    const fallback = getDefaultPossessorForTense(tenseValue);
    const base = stored === undefined ? fallback : stored;
    const values = POSSESSIVE_PREFIXES.map((entry) => entry.value);
    const ordered = [base, ...values.filter((value) => value !== base)];
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

function isNonanimateNounTense(tenseValue) {
    return tenseValue === "sustantivo-verbal"
        || tenseValue === "instrumentivo"
        || tenseValue === "calificativo-instrumentivo";
}

function getNonanimateSubjectId() {
    const match = SUBJECT_COMBINATIONS.find((entry) => (
        entry.subjectPrefix === "" && entry.subjectSuffix === ""
    ));
    return match ? match.id : "";
}

function buildSearchOptionPlan(options, stored, fallback) {
    const list = options.slice();
    if (!list.length) {
        return [];
    }
    let base = list.includes(stored) ? stored : "";
    if (!base || base === SUBJECT_TOGGLE_ALL || base === OBJECT_TOGGLE_ALL) {
        base = list.includes(fallback) ? fallback : list[0];
    }
    const ordered = [base, ...list.filter((value) => value !== base)];
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

function getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue) {
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
    const isLocativoTemporal = tenseValue === "locativo-temporal";
    if (isCalificativoInstrumentivo) {
        return (isTransitiveVerb && allowsObjectPrefix)
            ? Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)
            : [""];
    }
    if (isLocativoTemporal) {
        if (!isTransitiveVerb || !allowsObjectPrefix) {
            return [""];
        }
        if (getCombinedMode() === COMBINED_MODE.nonactive) {
            return [
                ...Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS),
                ...Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES),
            ];
        }
        return Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
    }
    if (!isTransitiveVerb || !allowsObjectPrefix) {
        return [""];
    }
    if (tenseValue === "agentivo") {
        return Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
    }
    return ["", ...Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)];
}

function getSearchNonactiveSuffixPlan(verbMeta) {
    if (getCombinedMode() !== COMBINED_MODE.nonactive) {
        return [null];
    }
    if (shouldForceAllNonactiveOptions()) {
        return [null];
    }
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const isTransitive = isNonactiveTransitiveVerb(getCurrentObjectPrefix(), verbMeta);
    const nonactiveSource = getNonactiveDerivationSource(verbMeta, verb, analysisVerb);
    const nonactiveRuleBase = getNonactiveRuleBase(nonactiveSource.baseVerb, verbMeta);
    const options = getNonactiveDerivationOptions(nonactiveSource.baseVerb, nonactiveSource.baseVerb, {
        isTransitive,
        isYawi: verbMeta.isYawi,
        ruleBase: nonactiveRuleBase,
        rootPlusYaBase: verbMeta.rootPlusYaBase,
    });
    if (!options.length) {
        return [null];
    }
    const suffixes = options.map((option) => option.suffix);
    const current = getSelectedNonactiveSuffix();
    const ordered = current && suffixes.includes(current)
        ? [current, ...suffixes.filter((suffix) => suffix !== current)]
        : suffixes;
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

function getSearchCombinedModePlan() {
    const current = getCombinedMode();
    const other = current === COMBINED_MODE.nonactive
        ? COMBINED_MODE.active
        : COMBINED_MODE.nonactive;
    return [current, other];
}

function getNonTodosSubjectOptionIds() {
    return getSubjectToggleOptions()
        .filter((entry) => entry.id !== SUBJECT_TOGGLE_ALL)
        .map((entry) => entry.id);
}

function buildVerbSearchPlans({ tenseValue, group, isNonactive, verbMeta }) {
    const stateMode = group === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    const resolvedMeta = verbMeta || getVerbInputMeta();
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = isNonactive
        ? getNonactiveObjectPrefixGroups(resolvedMeta).groups
        : buildObjectPrefixGroups(objectPrefixes);
    const subjectOptionIds = getNonTodosSubjectOptionIds();
    const fallbackSubject = subjectOptionIds[0] || SUBJECT_TOGGLE_ALL;
    let storedSubject = "";
    let storedPreferred = "";
    const subjectKeys = [];
    objectPrefixGroups.forEach((objectGroup) => {
        const groupKey = objectGroup.prefixes.join("|") || "intrans";
        const subjectKey = `${stateMode}|${tenseValue}|${groupKey}`;
        subjectKeys.push(subjectKey);
        const stored = SUBJECT_TOGGLE_STATE.get(subjectKey);
        if (stored && stored !== SUBJECT_TOGGLE_ALL && subjectOptionIds.includes(stored)) {
            if (objectGroup.prefixes.includes("ki")) {
                storedPreferred = stored;
            } else if (!storedSubject) {
                storedSubject = stored;
            }
        }
    });
    const baseSubject = storedPreferred || storedSubject;
    const subjectPlan = buildSearchOptionPlan(subjectOptionIds, baseSubject, fallbackSubject);
    const objectPlans = objectPrefixGroups.map((objectGroup) => {
        const prefixes = objectGroup.prefixes;
        const groupKey = prefixes.join("|") || "intrans";
        const objectStateKey = getObjectStateKey({
            groupKey,
            tenseValue,
            mode: stateMode,
            isNonactive,
        });
        const stored = OBJECT_TOGGLE_STATE.get(objectStateKey);
        const fallbackObject = getPreferredObjectPrefix(prefixes);
        const options = buildSearchOptionPlan(prefixes, stored, fallbackObject);
        return {
            objectStateKey,
            options,
            base: options[0] || "",
        };
    });
    return { subjectPlan, subjectKeys, objectPlans };
}

function buildNounSearchPlans({ tenseValue, verbMeta }) {
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const subjectKey = `noun|${tenseValue}|${groupKey}`;
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionIds = subjectOptions
        .filter((entry) => entry.id !== SUBJECT_TOGGLE_ALL)
        .map((entry) => entry.id);
    const fallbackSubject = getDefaultNounSubjectId(subjectOptions) || subjectOptionIds[0] || SUBJECT_TOGGLE_ALL;
    let subjectPlan = [];
    if (isNonanimateNounTense(tenseValue)) {
        const nonanimateId = getNonanimateSubjectId();
        subjectPlan = [nonanimateId || fallbackSubject];
    } else {
        const stored = SUBJECT_TOGGLE_STATE.get(subjectKey);
        subjectPlan = buildSearchOptionPlan(subjectOptionIds, stored, fallbackSubject);
    }
    const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue);
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
    const storedObject = OBJECT_TOGGLE_STATE.get(objectStateKey);
    const fallbackObject = allowedPrefixes[0] || "";
    const objectPlan = buildSearchOptionPlan(allowedPrefixes, storedObject, fallbackObject);
    return {
        subjectPlan,
        subjectKey,
        objectPlan,
        objectStateKey,
    };
}

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
        group: getActiveConjugationGroup(),
        tense: getSelectedTenseTab(),
        pret: getSelectedPretUniversalTab(),
        combined: getCombinedMode(),
        classFilter: CLASS_FILTER_STATE.activeClass,
        nonactiveSuffix: getSelectedNonactiveSuffix(),
        subject: new Map(SUBJECT_TOGGLE_STATE),
        object: new Map(OBJECT_TOGGLE_STATE),
        possessor: new Map(POSSESSOR_TOGGLE_STATE),
        patientivoOwnership: new Map(PATIENTIVO_OWNERSHIP_STATE),
    };
    const applyTarget = (target) => {
        const combinedPlan = target.mode === TENSE_MODE.verbo
            ? getSearchCombinedModePlan()
            : [getCombinedMode()];
        for (const combinedMode of combinedPlan) {
            setCombinedMode(combinedMode);
            CLASS_FILTER_STATE.activeClass = null;
            if (target.mode === TENSE_MODE.sustantivo) {
                setActiveTenseMode(TENSE_MODE.sustantivo);
                setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
                setSelectedTenseTab(target.tenseValue);
            } else {
                setActiveTenseMode(TENSE_MODE.verbo);
                setActiveConjugationGroup(target.group);
                if (target.group === CONJUGATION_GROUPS.universal) {
                    setSelectedPretUniversalTab(target.tenseValue);
                } else {
                    setSelectedTenseTab(target.tenseValue);
                }
            }
            if (target.mode === TENSE_MODE.sustantivo) {
                const nounPlans = buildNounSearchPlans({
                    tenseValue: target.tenseValue,
                    verbMeta: parsedVerb,
                });
                const possessorPlan = getSearchPossessorPlan(target.tenseValue);
                for (const possessor of possessorPlan) {
                    POSSESSOR_TOGGLE_STATE.set(getNounPossessorKey(target.tenseValue), possessor);
                    for (const subjectId of nounPlans.subjectPlan) {
                        SUBJECT_TOGGLE_STATE.set(nounPlans.subjectKey, subjectId);
                        for (const objectPrefix of nounPlans.objectPlan) {
                            OBJECT_TOGGLE_STATE.set(nounPlans.objectStateKey, objectPrefix);
                            renderActiveConjugations({
                                verb: displayVerb,
                                objectPrefix,
                                onlyTense: target.tenseValue,
                                tense: target.tenseValue,
                            });
                            if (scrollToMatchingConjugationRow(queryInfo.term, { matchMode: queryInfo.mode })) {
                                renderTenseTabs();
                                renderPretUniversalTabs();
                                return true;
                            }
                        }
                    }
                }
                continue;
            }
            const isNonactive = combinedMode === COMBINED_MODE.nonactive;
            const verbPlans = buildVerbSearchPlans({
                tenseValue: target.tenseValue,
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
                        SUBJECT_TOGGLE_STATE.set(subjectKey, subjectId);
                    });
                    for (const objectPlan of verbPlans.objectPlans) {
                        baseObjectSelections.forEach((value, key) => {
                            OBJECT_TOGGLE_STATE.set(key, value);
                        });
                        for (const objectPrefix of objectPlan.options) {
                            OBJECT_TOGGLE_STATE.set(objectPlan.objectStateKey, objectPrefix);
                            renderActiveConjugations({
                                verb: displayVerb,
                                objectPrefix,
                                onlyTense: target.tenseValue,
                                tense: target.tenseValue,
                            });
                            if (scrollToMatchingConjugationRow(queryInfo.term, { matchMode: queryInfo.mode })) {
                                renderTenseTabs();
                                renderPretUniversalTabs();
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
        setActiveTenseMode(savedState.mode);
        setActiveConjugationGroup(
            savedState.mode === TENSE_MODE.sustantivo ? CONJUGATION_GROUPS.tense : savedState.group
        );
        setSelectedTenseTab(savedState.tense);
        setSelectedPretUniversalTab(savedState.pret);
        setSelectedNonactiveSuffix(savedState.nonactiveSuffix);
        CLASS_FILTER_STATE.activeClass = savedState.classFilter;
        SUBJECT_TOGGLE_STATE.clear();
        OBJECT_TOGGLE_STATE.clear();
        POSSESSOR_TOGGLE_STATE.clear();
        PATIENTIVO_OWNERSHIP_STATE.clear();
        savedState.subject.forEach((value, key) => SUBJECT_TOGGLE_STATE.set(key, value));
        savedState.object.forEach((value, key) => OBJECT_TOGGLE_STATE.set(key, value));
        savedState.possessor.forEach((value, key) => POSSESSOR_TOGGLE_STATE.set(key, value));
        savedState.patientivoOwnership.forEach((value, key) => PATIENTIVO_OWNERSHIP_STATE.set(key, value));
        renderTenseTabs();
        renderPretUniversalTabs();
        renderActiveConjugations({
            verb: displayVerb,
            objectPrefix,
            tense: savedState.group === CONJUGATION_GROUPS.universal ? savedState.pret : savedState.tense,
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

// === Verb Input & Suggestions ===
function getVerbMirror() {
    return document.getElementById("verb-mirror");
}

function getVerbMirrorContent() {
    return document.getElementById("verb-mirror-content");
}

function getVerbSuggestionsElement() {
    return document.getElementById("verb-suggestions");
}

function loadVerbSuggestions() {
    return fetch("data/data.csv", { cache: "no-store" })
        .then((response) => response.text())
        .then((text) => {
            VERB_SUGGESTIONS = parseVerbSuggestionCSV(text);
            VERB_SUGGESTION_BASE_SET = new Set(
                VERB_SUGGESTIONS.map((entry) => entry.base.toLowerCase())
            );
            VERB_SUGGESTION_BASE_INFO = buildSuggestionBaseInfo(VERB_SUGGESTIONS);
            return fetch("data/basic data.csv", { cache: "no-store" })
                .then((response) => response.text())
                .then((extraText) => {
                    const extraEntries = parseVerbSuggestionCSV(extraText);
                    VERB_DISAMBIGUATION_BASE_INFO = buildSuggestionBaseInfo(extraEntries);
                    BASIC_DATA_CANONICAL_MAP = buildCanonicalVerbMapFromCSV(extraText);
                    extraEntries.forEach((entry) => {
                        VERB_SUGGESTION_BASE_SET.add(entry.base.toLowerCase());
                    });
                })
                .catch(() => {
                    VERB_DISAMBIGUATION_BASE_INFO = new Map();
                    BASIC_DATA_CANONICAL_MAP = new Map();
                });
        })
        .catch(() => {
            VERB_SUGGESTIONS = [];
            VERB_SUGGESTION_BASE_SET = new Set();
            VERB_SUGGESTION_BASE_INFO = new Map();
            VERB_DISAMBIGUATION_BASE_INFO = new Map();
            BASIC_DATA_CANONICAL_MAP = new Map();
        });
}

function parseCSVRow(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        if (char === "\"") {
            if (inQuotes && line[i + 1] === "\"") {
                current += "\"";
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            cells.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    cells.push(current);
    return cells;
}

function parseCSVRows(text) {
    return String(text || "")
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line !== "")
        .map((line) => parseCSVRow(line));
}

function parseVerbEntryToken(token) {
    const raw = String(token || "").trim();
    if (!raw) {
        return {
            base: "",
            transitive: false,
            intransitive: false,
        };
    }
    let base = raw;
    let transitive = false;
    let intransitive = false;
    if (raw.startsWith("(-)")) {
        base = raw.slice(3);
        transitive = true;
        intransitive = true;
    } else if (raw.startsWith("-")) {
        base = raw.slice(1);
        transitive = true;
    } else {
        intransitive = true;
    }
    base = base.trim();
    return {
        base,
        transitive,
        intransitive,
    };
}

function parseVerbSuggestionCSV(text) {
    const suggestionsByBase = new Map();
    parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
            return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        const transitive = entry.transitive;
        const intransitive = entry.intransitive;
        if (!base) {
            return;
        }
        const key = base.toLowerCase();
        const existing = suggestionsByBase.get(key) || {
            base,
            transitive: false,
            intransitive: false,
        };
        existing.transitive = existing.transitive || transitive;
        existing.intransitive = existing.intransitive || intransitive;
        suggestionsByBase.set(key, existing);
    });
    return Array.from(suggestionsByBase.values());
}

function stripOptionalSupportiveI(value) {
    return String(value || "").replace(OPTIONAL_SUPPORTIVE_I_RE, "");
}

function hasCompoundMarkers(value) {
    const markerRe = COMPOUND_MARKER_SPLIT_RE || /[|~#()\\/?-]/;
    if (!markerRe) {
        return false;
    }
    markerRe.lastIndex = 0;
    return markerRe.test(String(value || ""));
}

function isSupportiveIClusterBase(base) {
    if (!base || hasCompoundMarkers(base)) {
        return false;
    }
    const letters = splitVerbLetters(base);
    if (letters.length < 3 || letters[0] !== "i") {
        return false;
    }
    return isVerbLetterConsonant(letters[1]) && isVerbLetterConsonant(letters[2]);
}

function formatSupportiveISuggestionBase(base) {
    if (!isSupportiveIClusterBase(base)) {
        return base;
    }
    const letters = splitVerbLetters(base);
    const core = letters.slice(1).join("");
    if (!core) {
        return base;
    }
    return `${OPTIONAL_SUPPORTIVE_I_MARKER}${core}`;
}

function buildSuggestionBaseInfo(entries) {
    const map = new Map();
    if (!Array.isArray(entries)) {
        return map;
    }
    const hasNonHyphenMarker = (base) => /[|~#()\\/?]/.test(base);
    const addEntry = (key, entry, displayBase) => {
        if (!key) {
            return;
        }
        const existing = map.get(key) || {
            transitive: false,
            intransitive: false,
            displayBase: displayBase || entry.base,
        };
        existing.transitive = existing.transitive || entry.transitive;
        existing.intransitive = existing.intransitive || entry.intransitive;
        if (!existing.displayBase) {
            existing.displayBase = displayBase || entry.base;
        }
        map.set(key, existing);
    };
    entries.forEach((entry) => {
        if (!entry || !entry.base) {
            return;
        }
        const base = entry.base;
        const displayBase = formatSupportiveISuggestionBase(base);
        const baseKey = base.toLowerCase();
        addEntry(baseKey, entry, displayBase);
        if (base.includes("-") && !hasNonHyphenMarker(base)) {
            const normalizedKey = base.replace(/-/g, "").toLowerCase();
            if (normalizedKey && normalizedKey !== baseKey) {
                addEntry(normalizedKey, entry, displayBase);
            }
        }
    });
    return map;
}

function buildCanonicalVerbMapFromCSV(text) {
    const map = new Map();
    if (typeof parseVerbInput !== "function") {
        return map;
    }
    parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
            return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        if (!base) {
            return;
        }
        const addVariant = (isTransitive) => {
            const raw = isTransitive ? `-${base}` : base;
            let parsed = null;
            try {
                parsed = parseVerbInput(raw);
            } catch (error) {
                parsed = null;
            }
            if (!parsed) {
                return;
            }
            const key = String(
                (parsed.canonical && parsed.canonical.verb) || parsed.verb || base
            ).toLowerCase();
            if (!key) {
                return;
            }
            const existing = map.get(key) || {
                base,
                transitive: false,
                intransitive: false,
                transitiveParsed: null,
                intransitiveParsed: null,
            };
            if (isTransitive) {
                existing.transitive = true;
                existing.transitiveParsed = existing.transitiveParsed || parsed;
            } else {
                existing.intransitive = true;
                existing.intransitiveParsed = existing.intransitiveParsed || parsed;
            }
            map.set(key, existing);
        };
        if (entry.intransitive) {
            addVariant(false);
        }
        if (entry.transitive) {
            addVariant(true);
        }
    });
    return map;
}

function normalizeVerbSuggestionInput(rawValue) {
    const raw = String(rawValue || "").trim();
    const parsed = parseVerbInput(raw);
    const query = (parsed.rawAnalysisVerb || parsed.analysisVerb || parsed.verb || "").toLowerCase();
    const queries = new Set();
    if (query) {
        queries.add(query);
    }
    if (raw.includes(OPTIONAL_SUPPORTIVE_I_MARKER)) {
        const withSupportive = raw.replace(OPTIONAL_SUPPORTIVE_I_RE, "i");
        const parsedSupportive = parseVerbInput(withSupportive);
        const supportiveQuery = (
            parsedSupportive.rawAnalysisVerb
            || parsedSupportive.analysisVerb
            || parsedSupportive.verb
            || ""
        ).toLowerCase();
        if (supportiveQuery) {
            queries.add(supportiveQuery);
        }
    }
    return {
        raw: parsed.displayVerb,
        isTransitive: parsed.isMarkedTransitive,
        query,
        queries: Array.from(queries),
    };
}

function getFilteredVerbSuggestions(rawValue) {
    if (!VERB_SUGGESTIONS.length) {
        return [];
    }
    const { isTransitive, query, queries } = normalizeVerbSuggestionInput(rawValue);
    const queryList = queries.length ? queries : (query ? [query] : []);
    const hasQuery = queryList.some((value) => value);
    if (!hasQuery && !isTransitive) {
        return [];
    }
    const results = [];
    const seen = new Set();
    for (const entry of VERB_SUGGESTIONS) {
        if (isTransitive && !entry.transitive) {
            continue;
        }
        if (!isTransitive && !entry.intransitive) {
            continue;
        }
        const candidate = entry.base.toLowerCase();
        if (hasQuery && !queryList.some((value) => candidate.startsWith(value))) {
            continue;
        }
        const displayBase = formatSupportiveISuggestionBase(entry.base);
        const display = isTransitive ? `-${displayBase}` : displayBase;
        const key = display.toLowerCase();
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        results.push(display);
        if (results.length >= VERB_SUGGESTION_LIMIT) {
            break;
        }
    }
    return results;
}

function renderVerbSuggestions(container) {
    if (!container) {
        return;
    }
    container.innerHTML = "";
    if (VERB_SUGGESTION_STATE.items.length === 0) {
        container.classList.remove("is-open");
        return;
    }
    VERB_SUGGESTION_STATE.items.forEach((value, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "verb-suggestion";
        if (index === VERB_SUGGESTION_STATE.activeIndex) {
            item.classList.add("is-active");
        }
        item.textContent = value;
        item.addEventListener("mousedown", (event) => {
            event.preventDefault();
            applyVerbSuggestion(value);
        });
        container.appendChild(item);
    });
    container.classList.add("is-open");
}

function updateVerbSuggestions() {
    const verbInput = document.getElementById("verb");
    const container = getVerbSuggestionsElement();
    if (!verbInput || !container) {
        return;
    }
    if (isSearchModeInput(verbInput.value)) {
        closeVerbSuggestions();
        return;
    }
    const items = getFilteredVerbSuggestions(verbInput.value);
    const prevActive = VERB_SUGGESTION_STATE.items[VERB_SUGGESTION_STATE.activeIndex];
    VERB_SUGGESTION_STATE.items = items;
    if (!items.length) {
        VERB_SUGGESTION_STATE.activeIndex = -1;
        renderVerbSuggestions(container);
        return;
    }
    const preservedIndex = prevActive ? items.indexOf(prevActive) : -1;
    VERB_SUGGESTION_STATE.activeIndex = preservedIndex >= 0 ? preservedIndex : -1;
    renderVerbSuggestions(container);
}

function closeVerbSuggestions() {
    VERB_SUGGESTION_STATE.items = [];
    VERB_SUGGESTION_STATE.activeIndex = -1;
    const container = getVerbSuggestionsElement();
    if (container) {
        renderVerbSuggestions(container);
    }
}

function applyVerbSuggestion(value) {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return;
    }
    CLASS_FILTER_STATE.activeClass = null;
    verbInput.value = value;
    VERB_INPUT_STATE.lastNonSearchValue = value;
    verbInput.dataset.lastClassVerb = parseVerbInput(value).verb;
    renderVerbMirror();
    renderPretUniversalTabs();
    closeVerbSuggestions();
    generateWord();
    verbInput.focus();
}

// === Verb Disambiguation ===
function getVerbDisambiguationElements() {
    return {
        wrapper: document.getElementById("verb-disambiguation"),
        label: document.getElementById("verb-disambiguation-label"),
        options: document.getElementById("verb-disambiguation-options"),
    };
}

function clearVerbDisambiguation() {
    VERB_DISAMBIGUATION_STATE.suggestions = [];
    VERB_DISAMBIGUATION_STATE.patterns = [];
    const { wrapper, options, label } = getVerbDisambiguationElements();
    if (options) {
        options.innerHTML = "";
    }
    if (label) {
        label.textContent = "";
    }
    if (wrapper) {
        wrapper.classList.add("is-empty");
    }
}

function startsWithKSeries(raw) {
    const letters = splitVerbLetters(String(raw || ""));
    const first = letters[0] || "";
    return first === "k" || first === "kw";
}

function getDisambiguationPrefixCandidates(core) {
    const candidates = new Set();
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    DIRECTIONAL_PREFIXES.forEach((prefix) => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
            candidates.add(prefix);
        }
    });
    NONSPECIFIC_VALENCE_PREFIXES.forEach((prefix) => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
            candidates.add(prefix);
        }
    });
    return Array.from(candidates).sort((a, b) => b.length - a.length);
}

function getDisambiguationAffixCandidates(core) {
    const candidates = new Set();
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    NONSPECIFIC_VALENCE_AFFIXES.forEach((affix) => {
        if (normalized.startsWith(affix) && normalized.length > affix.length) {
            candidates.add(affix);
        }
    });
    return Array.from(candidates).sort((a, b) => b.length - a.length);
}

function getDisambiguationSuffixCandidates(core) {
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    const suffixes = ["kwi", "kwa"];
    const candidates = [];
    suffixes.forEach((suffix) => {
        if (!normalized.endsWith(suffix)) {
            return;
        }
        const prefix = normalized.slice(0, -suffix.length);
        if (prefix.length < 2) {
            return;
        }
        candidates.push({ prefix, suffix });
    });
    return candidates;
}

function getDisambiguationKnownSuffixCandidates(core, options = {}) {
    const normalized = String(core || "");
    const baseInfo = VERB_DISAMBIGUATION_BASE_INFO.size
        ? VERB_DISAMBIGUATION_BASE_INFO
        : VERB_SUGGESTION_BASE_INFO;
    if (!normalized || !baseInfo.size) {
        return [];
    }
    const markerRe = COMPOUND_MARKER_SPLIT_RE || /[|~#()\\/?-]/;
    if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
            return [];
        }
    }
    const syllables = splitVerbSyllables(normalized);
    if (syllables.length < 2) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const isValidSuffixStart = (index) => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
    };
    const addCandidate = (prefix, suffix) => {
        const allowShortPrefix = prefix.length === 1 && VOWELS.includes(prefix);
        if ((!allowShortPrefix && prefix.length < 2) || suffix.length < 2) {
            return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        candidates.push({ prefix, suffix });
    };
    const wantsTransitive = options.isTransitive === true;
    const wantsIntransitive = options.isTransitive === false;
    for (let i = 1; i <= syllables.length - 1; i += 1) {
        if (!isValidSuffixStart(i)) {
            continue;
        }
        const prefix = syllables.slice(0, i).map((syllable) => syllable.text).join("");
        const suffix = syllables.slice(i).map((syllable) => syllable.text).join("");
        const info = baseInfo.get(suffix.toLowerCase());
        if (!info) {
            continue;
        }
        if (wantsTransitive && !info.transitive) {
            continue;
        }
        if (wantsIntransitive && !info.intransitive) {
            continue;
        }
        if (info) {
            const displaySuffix = info.displayBase || suffix;
            addCandidate(prefix, displaySuffix);
            break;
        }
    }
    return candidates;
}

function getDisambiguationLongSplitCandidates(core) {
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    const markerRe = COMPOUND_MARKER_SPLIT_RE || /[|~#()\\/?-]/;
    if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
            return [];
        }
    }
    const syllables = splitVerbSyllables(normalized);
    const letterCount = getVerbLetterCount(normalized);
    const isLong = syllables.length >= VERB_DISAMBIGUATION_LONG_SYLLABLES
        || letterCount >= VERB_DISAMBIGUATION_LONG_LETTERS;
    if (!isLong || syllables.length < 3) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const isValidSuffixStart = (index) => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
    };
    const addCandidate = (prefix, suffix) => {
        if (prefix.length < 2 || suffix.length < 2) {
            return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        candidates.push({ prefix, suffix });
    };
    const positions = [];
    if (syllables.length >= 4) {
        for (let i = 2; i <= syllables.length - 2; i += 1) {
            positions.push(i);
        }
        const midpoint = syllables.length / 2;
        positions.sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint));
        positions.forEach((index) => {
            if (!isValidSuffixStart(index)) {
                return;
            }
            const prefix = syllables.slice(0, index).map((syllable) => syllable.text).join("");
            const suffix = syllables.slice(index).map((syllable) => syllable.text).join("");
            addCandidate(prefix, suffix);
        });
    }
    return candidates;
}

function getExactPatternLabels(context) {
    if (!context) {
        return [];
    }
    const labels = new Set();
    PRET_EXACT_PATTERN_LABELS.forEach((entry) => {
        if (context[entry.key]) {
            labels.add(entry.label);
        }
    });
    return Array.from(labels);
}

function getPretClassSignatureFromParsed(parsedVerb) {
    if (!parsedVerb || !parsedVerb.verb) {
        return null;
    }
    const isTransitive = getBaseObjectSlots(parsedVerb) > 0;
    const analysisTarget = parsedVerb.analysisVerb || parsedVerb.verb;
    const context = buildPretUniversalContext(parsedVerb.verb, analysisTarget, isTransitive, {
        isYawi: parsedVerb.isYawi,
        isWeya: parsedVerb.isWeya,
        hasSlashMarker: parsedVerb.hasSlashMarker,
        hasSuffixSeparator: parsedVerb.hasSuffixSeparator,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        hasBoundMarker: parsedVerb.hasBoundMarker,
        hasCompoundMarker: parsedVerb.hasCompoundMarker,
        hasImpersonalTaPrefix: parsedVerb.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
        hasNonspecificValence: parsedVerb.hasNonspecificValence
            || parsedVerb.hasNonactiveNonspecificValence,
        exactBaseVerb: parsedVerb.exactBaseVerb || "",
        rootPlusYaBase: parsedVerb.rootPlusYaBase,
        rootPlusYaBasePronounceable: parsedVerb.rootPlusYaBasePronounceable,
    });
    const candidates = getPretUniversalClassCandidates(context);
    const classList = candidates.size ? Array.from(candidates).sort().join("/") : "";
    const exactLabels = getExactPatternLabels(context);
    return { classList, exactLabels, parsedVerb };
}

function getPretClassSignatureFromValue(rawValue) {
    return getPretClassSignatureFromParsed(parseVerbInput(rawValue));
}

function buildVerbDisambiguationCandidates(rawValue) {
    const parsedBase = parseVerbInput(rawValue);
    const display = stripOptionalSupportiveI(parsedBase.displayVerb || "");
    if (!display) {
        return { suggestions: [], patterns: [] };
    }
    const original = getPretClassSignatureFromParsed(parsedBase);
    if (!original) {
        return { suggestions: [], patterns: [] };
    }
    const isTransitive = getBaseObjectSlots(parsedBase) > 0;
    const suggestions = [];
    const seen = new Set();
    const originalClassList = original.classList;
    const patternSet = new Set(original.exactLabels || []);
    const patterns = Array.from(patternSet);
    const maxDashCount = Math.max(
        1,
        Math.min(2, Number.isFinite(parsedBase.dashCount) ? parsedBase.dashCount : 0)
    );
    const considerCandidate = (candidateValue, options = {}) => {
        if (!candidateValue || candidateValue === display || seen.has(candidateValue)) {
            return;
        }
        const candidateDashCount = (candidateValue.match(/-/g) || []).length;
        if (candidateDashCount > maxDashCount) {
            return;
        }
        const candidate = getPretClassSignatureFromValue(candidateValue);
        if (!candidate || !candidate.classList) {
            return;
        }
        const allowSameClass = options.allowSameClass === true;
        if (candidate.classList === originalClassList && !allowSameClass) {
            return;
        }
        seen.add(candidateValue);
        suggestions.push({
            value: candidateValue,
            classList: candidate.classList,
            exactLabels: candidate.exactLabels || [],
        });
    };
    const supportiveCandidate = (() => {
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        if (!isSupportiveIClusterBase(core)) {
            return "";
        }
        const letters = splitVerbLetters(core);
        const nextCore = letters.slice(1).join("");
        if (!nextCore) {
            return "";
        }
        const candidateCore = `${OPTIONAL_SUPPORTIVE_I_MARKER}${nextCore}`;
        return `${hasLeadingDash ? "-" : ""}${candidateCore}`;
    })();
    if (display.includes("/")) {
        const noSlash = display.replace(/\//g, "");
        considerCandidate(noSlash);
    } else {
        if (supportiveCandidate) {
            considerCandidate(supportiveCandidate, { allowSameClass: true });
        }
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        const affixes = getDisambiguationAffixCandidates(core);
        affixes.forEach((affix) => {
            const remainder = core.slice(affix.length);
            if (!remainder) {
                return;
            }
            if (
                (affix === "te" || affix === "ta")
                && remainder.startsWith("n")
                && startsWithKSeries(remainder.slice(1))
            ) {
                return;
            }
            const candidateValue = `${hasLeadingDash ? "-" : ""}${affix}-${remainder}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        const prefixes = getDisambiguationPrefixCandidates(core);
        prefixes.forEach((prefix) => {
            const remainder = core.slice(prefix.length);
            if (!remainder) {
                return;
            }
            if (
                (prefix === "te" || prefix === "ta")
                && remainder.startsWith("n")
                && startsWithKSeries(remainder.slice(1))
            ) {
                return;
            }
            const candidateValue = `${hasLeadingDash ? "-" : ""}${prefix}/${remainder}`;
            considerCandidate(candidateValue);
        });
        const suffixCandidates = getDisambiguationSuffixCandidates(core);
        suffixCandidates.forEach((candidate) => {
            const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        const knownSuffixCandidates = getDisambiguationKnownSuffixCandidates(core, {
            isTransitive,
        });
        knownSuffixCandidates.forEach((candidate) => {
            const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        if (!knownSuffixCandidates.length) {
            const longSplitCandidates = getDisambiguationLongSplitCandidates(core);
            longSplitCandidates.forEach((candidate) => {
                const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
                considerCandidate(candidateValue, { allowSameClass: true });
            });
        }
    }
    return {
        suggestions: suggestions.slice(0, VERB_DISAMBIGUATION_LIMIT),
        patterns,
    };
}

function renderVerbDisambiguation(payload) {
    const { wrapper, options, label } = getVerbDisambiguationElements();
    if (!wrapper || !options || !label) {
        return;
    }
    options.innerHTML = "";
    const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions : [];
    const patterns = Array.isArray(payload?.patterns) ? payload.patterns : [];
    VERB_DISAMBIGUATION_STATE.suggestions = suggestions;
    VERB_DISAMBIGUATION_STATE.patterns = patterns;
    if (!suggestions.length) {
        wrapper.classList.add("is-empty");
        label.textContent = "";
        return;
    }
    label.textContent = "Quisiste decir";
    suggestions.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "verb-disambiguation__option";
        button.textContent = item.value;
        const titleParts = [];
        if (item.classList) {
            titleParts.push(`clases ${item.classList}`);
        }
        if (item.exactLabels && item.exactLabels.length) {
            titleParts.push(`exact ${item.exactLabels.join(", ")}`);
        }
        if (titleParts.length) {
            button.title = titleParts.join(" | ");
        }
        button.addEventListener("click", (event) => {
            event.preventDefault();
            applyVerbSuggestion(item.value);
            clearVerbDisambiguation();
        });
        options.appendChild(button);
    });
    void patterns;
    wrapper.classList.remove("is-empty");
}

function updateVerbDisambiguation(rawValue = null) {
    const { wrapper, options } = getVerbDisambiguationElements();
    if (!wrapper || !options) {
        return;
    }
    const verbInput = document.getElementById("verb");
    const value = rawValue !== null ? String(rawValue || "") : String(verbInput?.value || "");
    if (!value || isSearchModeInput(value)) {
        clearVerbDisambiguation();
        return;
    }
    const baseValue = getSearchInputBase(value).trim();
    if (!baseValue) {
        clearVerbDisambiguation();
        return;
    }
    const payload = buildVerbDisambiguationCandidates(baseValue);
    renderVerbDisambiguation(payload);
}

function handleVerbSuggestionKeydown(event) {
    if (event.key === "ArrowDown") {
        const container = getVerbSuggestionsElement();
        if (container && !container.classList.contains("is-open")) {
            updateVerbSuggestions();
            if (!VERB_SUGGESTION_STATE.items.length) {
                return;
            }
        }
        if (!VERB_SUGGESTION_STATE.items.length) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (VERB_SUGGESTION_STATE.activeIndex === -1) {
            VERB_SUGGESTION_STATE.activeIndex = 0;
        } else if (VERB_SUGGESTION_STATE.activeIndex === VERB_SUGGESTION_STATE.items.length - 1) {
            VERB_SUGGESTION_STATE.activeIndex = -1;
        } else {
            VERB_SUGGESTION_STATE.activeIndex += 1;
        }
        renderVerbSuggestions(getVerbSuggestionsElement());
    } else if (event.key === "ArrowUp") {
        const container = getVerbSuggestionsElement();
        if (container && !container.classList.contains("is-open")) {
            updateVerbSuggestions();
            if (!VERB_SUGGESTION_STATE.items.length) {
                return;
            }
        }
        if (!VERB_SUGGESTION_STATE.items.length) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (VERB_SUGGESTION_STATE.activeIndex === -1) {
            VERB_SUGGESTION_STATE.activeIndex = VERB_SUGGESTION_STATE.items.length - 1;
        } else if (VERB_SUGGESTION_STATE.activeIndex === 0) {
            VERB_SUGGESTION_STATE.activeIndex = -1;
        } else {
            VERB_SUGGESTION_STATE.activeIndex -= 1;
        }
        renderVerbSuggestions(getVerbSuggestionsElement());
    } else if (event.key === "Enter") {
        if (VERB_SUGGESTION_STATE.activeIndex === -1) {
            event.preventDefault();
            event.stopPropagation();
            closeVerbSuggestions();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const value = VERB_SUGGESTION_STATE.items[VERB_SUGGESTION_STATE.activeIndex];
        if (value) {
            applyVerbSuggestion(value);
        }
    } else if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeVerbSuggestions();
    }
}

// === CSV Export ===
function escapeCSVValue(value) {
    const raw = String(value ?? "");
    if (/[",\n]/.test(raw)) {
        return `"${raw.replace(/"/g, "\"\"")}"`;
    }
    return raw;
}

// === Bulk Export ===
function getBulkExportElements() {
    return {
        container: document.getElementById("bulk-export"),
        generateButton: document.getElementById("bulk-export-generate"),
        downloadButton: document.getElementById("bulk-export-download"),
        status: document.getElementById("bulk-export-status"),
        table: document.getElementById("bulk-export-table"),
        source: document.getElementById("bulk-export-source"),
        sourceSelect: document.getElementById("bulk-export-source-select"),
        openButton: document.getElementById("bulk-export-open"),
        saveButton: document.getElementById("bulk-export-save"),
    };
}

function setBulkExportStatus(message, options = {}) {
    const { status } = getBulkExportElements();
    if (!status) {
        return;
    }
    status.textContent = message || "";
    status.classList.toggle("is-error", options.isError === true);
}

function supportsFileSystemAccess() {
    return typeof window !== "undefined"
        && typeof window.showOpenFilePicker === "function"
        && typeof window.showSaveFilePicker === "function";
}

async function verifyFilePermission(handle, mode = "readwrite") {
    if (!handle || typeof handle.queryPermission !== "function") {
        return true;
    }
    const options = { mode };
    const current = await handle.queryPermission(options);
    if (current === "granted") {
        return true;
    }
    const requested = await handle.requestPermission(options);
    return requested === "granted";
}

function setBulkExportSourceLabel(label, kind = "select") {
    const { source } = getBulkExportElements();
    if (!source) {
        return;
    }
    if (!label) {
        source.textContent = "";
        return;
    }
    source.textContent = kind === "file" ? `Archivo: ${label}` : `Fuente: ${label}`;
}

function updateBulkExportControlState() {
    const { openButton, saveButton, downloadButton } = getBulkExportElements();
    const supportsFS = supportsFileSystemAccess();
    if (openButton) {
        openButton.disabled = !supportsFS;
    }
    if (saveButton) {
        saveButton.disabled = !supportsFS || !BULK_EXPORT_STATE.rows.length;
    }
    if (downloadButton) {
        downloadButton.disabled = !BULK_EXPORT_STATE.rows.length;
    }
}

function getBulkExportSourceConfig() {
    const { sourceSelect } = getBulkExportElements();
    const value = sourceSelect?.value || "data";
    return BULK_EXPORT_SOURCES[value] || BULK_EXPORT_SOURCES.data;
}

async function loadBulkExportCSVText(sourceConfig) {
    if (typeof fetch !== "function") {
        throw new Error("CSV no disponible.");
    }
    const config = sourceConfig || BULK_EXPORT_SOURCES.data;
    const path = config.path;
    try {
        const response = await fetch(encodeURI(path), { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`${path} (${response.status})`);
        }
        const text = await response.text();
        return { text, sourcePath: config.label };
    } catch {
        throw new Error(`No se encontro ${config.label}.`);
    }
}

function parseBulkExportEntries(text) {
    const entries = [];
    parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
            return;
        }
        const normalized = firstCell.toLowerCase().replace(/^\//, "");
        if (index === 0 && (normalized === "lx" || normalized === "verb")) {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        if (!entry.base) {
            return;
        }
        entries.push(entry);
    });
    return entries;
}

function expandBulkExportEntries(entries) {
    const expanded = [];
    entries.forEach((entry) => {
        if (entry.intransitive) {
            expanded.push({ verb: entry.base, isTransitive: false });
        }
        if (entry.transitive) {
            expanded.push({ verb: `-${entry.base}`, isTransitive: true });
        }
        if (!entry.intransitive && !entry.transitive && entry.base) {
            expanded.push({ verb: entry.base, isTransitive: false });
        }
    });
    return expanded;
}

function getBulkExportConjugation({
    verb,
    tense,
    subjectSuffix,
    objectPrefix,
    derivationMode = DERIVATION_MODE.nonactive,
    derivationType = DERIVATION_TYPE.direct,
    indirectObjectMarker = "",
}) {
    const result = generateWord({
        silent: true,
        override: {
            verb,
            tense,
            subjectPrefix: "",
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            tenseMode: TENSE_MODE.verbo,
            derivationMode,
            derivationType,
            voiceMode: VOICE_MODE.active,
        },
    });
    if (!result || result.error || typeof result.result !== "string" || !result.result) {
        return "—";
    }
    return result.result;
}

function buildBulkExportRow({ verb, isTransitive }) {
    const applicative3s = getBulkExportConjugation({
        verb,
        tense: "presente",
        subjectSuffix: "",
        objectPrefix: "ki",
        derivationMode: DERIVATION_MODE.active,
        derivationType: DERIVATION_TYPE.applicative,
    });
    const applicativeNonactive3s = getBulkExportConjugation({
        verb,
        tense: "presente",
        subjectSuffix: "",
        objectPrefix: "",
        derivationMode: DERIVATION_MODE.nonactive,
        derivationType: DERIVATION_TYPE.applicative,
    });
    return {
        verb,
        isTransitive,
        applicative3s,
        applicativeNonactive3s,
    };
}

function buildBulkExportRows(entries) {
    return expandBulkExportEntries(entries).map((entry) => buildBulkExportRow(entry));
}

function applyBulkExportText(text, sourceLabel, options = {}) {
    const { table } = getBulkExportElements();
    const entries = parseBulkExportEntries(text);
    const rows = buildBulkExportRows(entries);
    BULK_EXPORT_STATE.rows = rows;
    BULK_EXPORT_STATE.csvText = buildBulkExportCSV(rows);
    renderBulkExportTable(table, rows);
    updateBulkExportStatusSummary();
    if (options.sourceKind) {
        BULK_EXPORT_STATE.sourceKind = options.sourceKind;
    }
    if (sourceLabel) {
        BULK_EXPORT_STATE.sourcePath = sourceLabel;
        setBulkExportSourceLabel(sourceLabel, options.sourceKind || BULK_EXPORT_STATE.sourceKind);
    }
    updateBulkExportControlState();
}

function buildBulkExportCSV(rows) {
    const header = BULK_EXPORT_HEADERS.map((label) => escapeCSVValue(label)).join(",");
    const lines = rows.map((row) => ([
        row.verb,
        row.applicative3s,
        row.applicativeNonactive3s,
    ].map((value) => escapeCSVValue(value)).join(",")));
    return [header, ...lines].join("\n");
}

function collectVisibleConjugationRows() {
    const container = document.getElementById("all-tense-conjugations");
    if (!container) {
        return [];
    }
    const rows = [];
    const blocks = Array.from(container.querySelectorAll(".tense-block"));
    blocks.forEach((block) => {
        const blockLabel = block.querySelector(".tense-block__label")?.textContent.trim() || "";
        const toggleMap = { subject: "", object: "", object2: "" };
        const toggles = Array.from(block.querySelectorAll(".tense-block__controls .object-toggle"));
        toggles.forEach((toggle) => {
            const ariaLabel = (toggle.getAttribute("aria-label") || "").toLowerCase();
            const activeButton = toggle.querySelector(".object-toggle-button.is-active");
            const value = activeButton ? activeButton.textContent.trim() : "";
            if (!value) {
                return;
            }
            if (ariaLabel.includes("suj") || ariaLabel.includes("subject")) {
                toggleMap.subject = value;
            } else if (ariaLabel.includes("objeto 2") || ariaLabel.includes("object 2") || ariaLabel.includes("objeto2")) {
                toggleMap.object2 = value;
            } else if (ariaLabel.includes("objeto") || ariaLabel.includes("object")) {
                toggleMap.object = value;
            }
        });
        const rowNodes = Array.from(block.querySelectorAll(".conjugation-row"));
        rowNodes.forEach((row) => {
            const personLabel = row.querySelector(".person-label")?.textContent.trim() || "";
            const value = row.querySelector(".conjugation-value")?.textContent.trim() || "";
            if (!personLabel && !value) {
                return;
            }
            rows.push({
                subjectToggle: toggleMap.subject,
                objectToggle: toggleMap.object,
                objectToggle2: toggleMap.object2,
                block: blockLabel,
                person: personLabel,
                value,
            });
        });
    });
    return rows;
}

function buildViewExportCSV() {
    const rows = collectVisibleConjugationRows();
    if (!rows.length) {
        return "";
    }
    const verbInput = document.getElementById("verb");
    const inputValue = verbInput ? verbInput.value.trim() : "";
    const derivationSelect = document.getElementById("derivation-type");
    const derivationValue = derivationSelect ? derivationSelect.value : "";
    const header = ["entrada", "derivación", "sujeto", "objeto", "objeto 2", "bloque", "persona", "forma"]
        .map((label) => escapeCSVValue(label))
        .join(",");
    const lines = rows.map((row) => ([
        inputValue,
        derivationValue,
        row.subjectToggle,
        row.objectToggle,
        row.objectToggle2,
        row.block,
        row.person,
        row.value,
    ].map((value) => escapeCSVValue(value)).join(",")));
    return [header, ...lines].join("\n");
}

function downloadViewExportCSV() {
    const csvText = buildViewExportCSV();
    if (!csvText) {
        return;
    }
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vista-conjugaciones.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function initViewExport() {
    const button = document.getElementById("view-export-csv");
    if (!button) {
        return;
    }
    button.addEventListener("click", () => {
        downloadViewExportCSV();
    });
}

function normalizeBulkExportVerbInput(rawValue, fallbackTransitive) {
    const trimmed = String(rawValue || "").trim();
    if (!trimmed) {
        return { verb: "", isTransitive: fallbackTransitive, display: "" };
    }
    const entry = parseVerbEntryToken(trimmed);
    const base = entry.base;
    if (!base) {
        return { verb: "", isTransitive: fallbackTransitive, display: "" };
    }
    let isTransitive = fallbackTransitive;
    if (entry.transitive && !entry.intransitive) {
        isTransitive = true;
    } else if (entry.intransitive && !entry.transitive) {
        isTransitive = false;
    }
    const verb = isTransitive ? `-${base}` : base;
    return { verb, isTransitive, display: verb };
}

function updateBulkExportStatusSummary() {
    const rows = BULK_EXPORT_STATE.rows || [];
    if (!rows.length) {
        setBulkExportStatus("");
        return;
    }
    const missingRows = rows.filter((row) => (
        [row.applicative3s, row.applicativeNonactive3s].some((value) => !value || value === "—")
    )).length;
    let statusMessage = `Listo: ${rows.length} filas.`;
    if (missingRows) {
        statusMessage += ` ${missingRows} con salida vacia.`;
    }
    setBulkExportStatus(statusMessage);
}

function updateBulkExportRowData(index, rawValue) {
    const row = BULK_EXPORT_STATE.rows[index];
    if (!row) {
        return null;
    }
    const normalized = normalizeBulkExportVerbInput(rawValue, row.isTransitive);
    if (!normalized.verb) {
        row.verb = "";
        row.applicative3s = "—";
        row.applicativeNonactive3s = "—";
        return normalized;
    }
    const updated = buildBulkExportRow({
        verb: normalized.verb,
        isTransitive: normalized.isTransitive,
    });
    row.verb = updated.verb;
    row.isTransitive = updated.isTransitive;
    row.applicative3s = updated.applicative3s;
    row.applicativeNonactive3s = updated.applicativeNonactive3s;
    updateBulkExportControlState();
    return normalized;
}

function renderBulkExportTable(container, rows) {
    if (!container) {
        return;
    }
    container.innerHTML = "";
    if (!rows.length) {
        const empty = document.createElement("div");
        empty.className = "bulk-export__empty";
        empty.textContent = "Sin datos.";
        container.appendChild(empty);
        return;
    }
    const table = document.createElement("table");
    table.className = "bulk-export__table-table";
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    BULK_EXPORT_HEADERS.forEach((label) => {
        const th = document.createElement("th");
        th.textContent = label;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    rows.forEach((row, index) => {
        const tr = document.createElement("tr");
        const verbCell = document.createElement("td");
        const verbInput = document.createElement("input");
        verbInput.type = "text";
        verbInput.className = "bulk-export__verb-input";
        verbInput.value = row.verb;
        verbInput.autocapitalize = "none";
        verbInput.spellcheck = false;
        verbCell.appendChild(verbInput);
        tr.appendChild(verbCell);
        const applicative3sCell = document.createElement("td");
        applicative3sCell.textContent = row.applicative3s;
        tr.appendChild(applicative3sCell);
        const applicativeNonactive3sCell = document.createElement("td");
        applicativeNonactive3sCell.textContent = row.applicativeNonactive3s;
        tr.appendChild(applicativeNonactive3sCell);
        const syncCells = () => {
            applicative3sCell.textContent = row.applicative3s;
            applicativeNonactive3sCell.textContent = row.applicativeNonactive3s;
        };
        const applyUpdate = (options = {}) => {
            const normalized = updateBulkExportRowData(index, verbInput.value);
            syncCells();
            BULK_EXPORT_STATE.csvText = buildBulkExportCSV(BULK_EXPORT_STATE.rows);
            updateBulkExportStatusSummary();
            if (options.normalizeDisplay && normalized) {
                verbInput.value = normalized.display;
            }
        };
        verbInput.addEventListener("input", () => {
            applyUpdate();
        });
        verbInput.addEventListener("blur", () => {
            applyUpdate({ normalizeDisplay: true });
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

async function runBulkExportGeneration() {
    const { generateButton, downloadButton, table, source } = getBulkExportElements();
    if (!generateButton || !table) {
        return;
    }
    generateButton.disabled = true;
    if (downloadButton) {
        downloadButton.disabled = true;
    }
    setBulkExportStatus("Generando...");
    if (source) {
        source.textContent = "";
    }
    try {
        const sourceConfig = getBulkExportSourceConfig();
        const { text, sourcePath } = await loadBulkExportCSVText(sourceConfig);
        BULK_EXPORT_STATE.fileHandle = null;
        BULK_EXPORT_STATE.filename = "conjugaciones.csv";
        applyBulkExportText(text, sourcePath, { sourceKind: "select" });
    } catch (error) {
        BULK_EXPORT_STATE.rows = [];
        BULK_EXPORT_STATE.csvText = "";
        renderBulkExportTable(table, []);
        const message = error instanceof Error && error.message ? error.message : "No se pudo generar.";
        setBulkExportStatus(message, { isError: true });
        if (downloadButton) {
            downloadButton.disabled = true;
        }
        updateBulkExportControlState();
    } finally {
        generateButton.disabled = false;
    }
}

async function openBulkExportFile() {
    if (!supportsFileSystemAccess()) {
        setBulkExportStatus("El navegador no permite abrir archivos locales.", { isError: true });
        return;
    }
    try {
        const [handle] = await window.showOpenFilePicker({
            multiple: false,
            types: [
                {
                    description: "CSV",
                    accept: { "text/csv": [".csv"] },
                },
            ],
        });
        if (!handle) {
            return;
        }
        const file = await handle.getFile();
        const text = await file.text();
        BULK_EXPORT_STATE.fileHandle = handle;
        BULK_EXPORT_STATE.filename = file.name || "conjugaciones.csv";
        applyBulkExportText(text, file.name || "archivo.csv", { sourceKind: "file" });
    } catch (error) {
        if (error && error.name === "AbortError") {
            return;
        }
        setBulkExportStatus("No se pudo abrir el archivo.", { isError: true });
    }
}

async function saveBulkExportFile() {
    if (!BULK_EXPORT_STATE.csvText) {
        setBulkExportStatus("No hay datos para guardar.", { isError: true });
        return;
    }
    if (!supportsFileSystemAccess()) {
        setBulkExportStatus("El navegador no permite guardar archivos locales.", { isError: true });
        return;
    }
    try {
        let handle = BULK_EXPORT_STATE.fileHandle;
        if (!handle) {
            handle = await window.showSaveFilePicker({
                suggestedName: BULK_EXPORT_STATE.filename || "conjugaciones.csv",
                types: [
                    {
                        description: "CSV",
                        accept: { "text/csv": [".csv"] },
                    },
                ],
            });
            if (!handle) {
                return;
            }
            BULK_EXPORT_STATE.fileHandle = handle;
        }
        const hasPermission = await verifyFilePermission(handle, "readwrite");
        if (!hasPermission) {
            setBulkExportStatus("Permiso denegado para guardar.", { isError: true });
            return;
        }
        const writable = await handle.createWritable();
        await writable.write(BULK_EXPORT_STATE.csvText);
        await writable.close();
        const fileName = handle.name || BULK_EXPORT_STATE.filename || "conjugaciones.csv";
        setBulkExportStatus(`Guardado en ${fileName}.`);
    } catch (error) {
        if (error && error.name === "AbortError") {
            return;
        }
        setBulkExportStatus("No se pudo guardar el archivo.", { isError: true });
    }
}

function downloadBulkExportCSV() {
    const csvText = BULK_EXPORT_STATE.csvText;
    if (!csvText) {
        return;
    }
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = BULK_EXPORT_STATE.filename || "conjugaciones.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function initBulkExport() {
    const {
        container,
        generateButton,
        downloadButton,
        sourceSelect,
        openButton,
        saveButton,
    } = getBulkExportElements();
    if (!container || !generateButton || !downloadButton) {
        return;
    }
    generateButton.addEventListener("click", () => {
        runBulkExportGeneration();
    });
    downloadButton.addEventListener("click", () => {
        downloadBulkExportCSV();
    });
    if (openButton) {
        openButton.addEventListener("click", () => {
            openBulkExportFile();
        });
    }
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            saveBulkExportFile();
        });
    }
    if (sourceSelect) {
        sourceSelect.addEventListener("change", () => {
            setBulkExportStatus("");
        });
    }
    updateBulkExportControlState();
}

// === UI Panels & Tabs ===
function renderVerbMirror() {
    const verbInput = document.getElementById("verb");
    const mirror = getVerbMirror();
    const mirrorContent = getVerbMirrorContent();
    if (!verbInput || !mirror || !mirrorContent) {
        return;
    }
    const rawValue = verbInput.value;
    const placeholder = verbInput.placeholder || "";
    mirrorContent.innerHTML = "";
    if (!rawValue) {
        mirror.classList.add("is-placeholder");
        mirrorContent.textContent = placeholder;
        mirrorContent.style.transform = "translateX(0px)";
        return;
    }
    mirror.classList.remove("is-placeholder");
    const prefixText = getVerbPrefixText(rawValue);
    if (prefixText) {
        const prefixSpan = document.createElement("span");
        prefixSpan.className = "verb-prefix";
        prefixSpan.textContent = prefixText;
        mirrorContent.appendChild(prefixSpan);
    }
    const body = rawValue.slice(prefixText.length);
    const bodyLower = body.toLowerCase();
    const units = splitVerbLetters(bodyLower);
    let cursor = 0;
    units.forEach((unit) => {
        const len = unit.length;
        const text = body.slice(cursor, cursor + len);
        const span = document.createElement("span");
        span.className = "verb-letter";
        span.dataset.len = String(len);
        span.textContent = text;
        mirrorContent.appendChild(span);
        cursor += len;
    });
    if (cursor < body.length) {
        const span = document.createElement("span");
        span.className = "verb-letter";
        span.dataset.len = String(body.length - cursor);
        span.textContent = body.slice(cursor);
        mirrorContent.appendChild(span);
    }
    mirrorContent.style.transform = `translateX(${-verbInput.scrollLeft}px)`;
}

function getVerbPrefixText(rawValue) {
    const raw = String(rawValue || "");
    const match = raw.toLowerCase().match(/[a-z]/);
    if (!match) {
        return raw;
    }
    const index = match.index || 0;
    return index > 0 ? raw.slice(0, index) : "";
}

function initUiScaleControl() {
    const scaleInput = document.getElementById("ui-scale");
    if (!scaleInput) {
        return;
    }
    const valueEl = document.getElementById("ui-scale-value");
    const root = document.documentElement;
    const baseAdjustRaw = getComputedStyle(root).getPropertyValue("--font-size-adjust");
    const baseAdjust = Number.parseFloat(baseAdjustRaw) || 0;
    const minValue = Number.parseFloat(scaleInput.min) || -6;
    const maxValue = Number.parseFloat(scaleInput.max) || 6;
    const safeMin = Math.max(minValue, -3);
    if (safeMin !== minValue) {
        scaleInput.min = String(safeMin);
    }
    const clampValue = (value) => Math.min(maxValue, Math.max(safeMin, value));
    const formatValue = (value) => (value > 0 ? `+${value}` : `${value}`);
    const applyScale = (offset) => {
        const nextAdjust = baseAdjust + offset;
        root.style.setProperty("--font-size-adjust", `${nextAdjust}px`);
        if (valueEl) {
            valueEl.textContent = formatValue(offset);
        }
    };
    let initialOffset = Number.parseFloat(scaleInput.value) || 0;
    try {
        const saved = window.localStorage ? localStorage.getItem(UI_SCALE_STORAGE_KEY) : null;
        if (saved !== null && saved !== "") {
            const savedValue = Number.parseFloat(saved);
            if (!Number.isNaN(savedValue)) {
                initialOffset = savedValue;
            }
        }
    } catch {
        initialOffset = Number.parseFloat(scaleInput.value) || 0;
    }
    initialOffset = clampValue(initialOffset);
    scaleInput.value = String(initialOffset);
    applyScale(initialOffset);
    scaleInput.addEventListener("input", () => {
        const offset = clampValue(Number.parseFloat(scaleInput.value) || 0);
        scaleInput.value = String(offset);
        applyScale(offset);
        try {
            if (window.localStorage) {
                localStorage.setItem(UI_SCALE_STORAGE_KEY, String(offset));
            }
        } catch {
            // Ignore storage failures.
        }
    });
}

function initZoomFontLock() {
    const root = document.documentElement;
    if (!root) {
        return;
    }
    const baseFontSize = Number.parseFloat(getComputedStyle(root).fontSize) || 16;
    const baseDpr = window.devicePixelRatio || 1;
    const getScale = () => {
        if (window.visualViewport && Number.isFinite(window.visualViewport.scale)) {
            return window.visualViewport.scale;
        }
        const dpr = window.devicePixelRatio || 1;
        return dpr / baseDpr;
    };
    const applyScale = () => {
        const scale = getScale();
        if (!scale || !Number.isFinite(scale) || scale <= 0) {
            return;
        }
        root.style.fontSize = `${baseFontSize / scale}px`;
    };
    applyScale();
    window.addEventListener("resize", applyScale);
    if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
        window.visualViewport.addEventListener("resize", applyScale);
    }
}

function initTutorialPanel() {
    const trigger = document.getElementById("tutorial-trigger");
    const modal = document.getElementById("tutorial-modal");
    if (!trigger || !modal) {
        return;
    }
    const closeButtons = modal.querySelectorAll("[data-tutorial-close]");
    const exampleButtons = modal.querySelectorAll("[data-example]");
    const setModalState = (isOpen) => {
        modal.classList.toggle("is-open", isOpen);
        modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
        document.body.classList.toggle("is-modal-open", isOpen);
    };
    const closeModal = () => setModalState(false);
    const openModal = () => setModalState(true);
    trigger.addEventListener("click", openModal);
    closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
    });
    exampleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-example");
            if (!value) {
                return;
            }
            const verbEl = document.getElementById("verb");
            if (verbEl) {
                verbEl.value = value;
                verbEl.focus();
                verbEl.dispatchEvent(new Event("input", { bubbles: true }));
            }
            closeModal();
        });
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
}

function renderNonactiveTabs({ verbMeta, verb, analysisVerb, hasVerb, endsWithConsonant }) {
    const container = document.getElementById("nonactive-tabs");
    if (!container) {
        return;
    }
    const isNawat = Boolean(document.getElementById("language")?.checked);
    const tenseMode = getActiveTenseMode();
    const isVerbMode = tenseMode === TENSE_MODE.verbo;
    const isNonactiveMode = isVerbMode && getCombinedMode() === COMBINED_MODE.nonactive;
    container.classList.remove("is-hidden");
    container.classList.toggle("is-disabled", !isVerbMode || !isNonactiveMode);
    container.setAttribute("aria-hidden", String(!isVerbMode || !isNonactiveMode));
    container.setAttribute("aria-disabled", String(!isVerbMode || !isNonactiveMode));
    container.innerHTML = "";
    if (!isVerbMode || !isNonactiveMode) {
        return;
    }

    const grid = document.createElement("div");
    grid.className = "nonactive-tabs-grid";
    container.appendChild(grid);

    const isTransitive = isNonactiveTransitiveVerb(getCurrentObjectPrefix(), verbMeta);
    const nonactiveSource = getNonactiveDerivationSource(verbMeta, verb, analysisVerb);
    const nonactiveRuleBase = getNonactiveRuleBase(nonactiveSource.baseVerb, verbMeta);
    const options = getNonactiveDerivationOptions(nonactiveSource.baseVerb, nonactiveSource.baseVerb, {
        isTransitive,
        isYawi: verbMeta.isYawi,
        ruleBase: nonactiveRuleBase,
        rootPlusYaBase: verbMeta.rootPlusYaBase,
    });
    const optionMap = buildNonactiveOptionMap(options);
    let selected = getSelectedNonactiveSuffix();
    if (shouldForceAllNonactiveOptions()) {
        selected = null;
        setSelectedNonactiveSuffix(null);
    }
    if (selected && !optionMap.has(selected)) {
        selected = null;
        setSelectedNonactiveSuffix(null);
    }

    NONACTIVE_SUFFIX_ORDER.forEach((suffix) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab nonactive-tab";
        const label = document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = getLocalizedLabel(NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix);
        button.appendChild(label);
        const isAvailable = optionMap.has(suffix);
        button.disabled = endsWithConsonant || !hasVerb || !isAvailable;
        button.classList.toggle("is-active", isAvailable && suffix === selected);
        button.addEventListener("click", () => {
            const current = getSelectedNonactiveSuffix();
            setSelectedNonactiveSuffix(current === suffix ? null : suffix);
            renderTenseTabs();
            const verbMeta = getVerbInputMeta();
            renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: getCurrentObjectPrefix(),
            });
        });
        grid.appendChild(button);
    });
}

function isConjugationResultVisible({
    result,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    comboObjectPrefix,
    enforceInvalidCombo = true,
    hideReflexive = false,
}) {
    if (!result || !result.result || result.result === "—") {
        return false;
    }
    const { shouldMask } = getConjugationMaskState({
        result,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        comboObjectPrefix,
        enforceInvalidCombo,
    });
    return !shouldMask && !hideReflexive;
}

function hasActiveVerbTenseOutput({ verb, tenseValue, objectPrefixes, subjectSelections }) {
    for (const objectPrefix of objectPrefixes) {
        for (const { selection } of subjectSelections) {
            const result = generateWord({
                silent: true,
                skipTransitivityValidation: true,
                override: {
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix,
                    verb,
                    tense: tenseValue,
                },
            }) || {};
            if (isConjugationResultVisible({
                result,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
            })) {
                return true;
            }
        }
    }
    return false;
}

function hasNonactiveVerbTenseOutput({
    verb,
    tenseValue,
    objectPrefixGroups,
    activeValency,
    nonactiveAvailableSlots,
    hasPromotableObject,
    fusionMarkers,
}) {
    const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
    const checkRow = ({ objectPrefix, subjectOverride, allowPassiveObject }) => {
        const overridePayload = {
            objectPrefix,
            verb,
            tense: tenseValue,
        };
        if (subjectOverride) {
            overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
            overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
            overridePayload.preservePassiveSubject = true;
        }
        const result = generateWord({
            silent: true,
            skipTransitivityValidation: true,
            allowPassiveObject,
            override: overridePayload,
        }) || {};
        const hideReflexive = !!(
            result
            && result.isReflexive
            && getObjectCategory(objectPrefix) !== "reflexive"
        );
        return isConjugationResultVisible({
            result,
            subjectPrefix: subjectOverride?.subjectPrefix || "",
            subjectSuffix: subjectOverride?.subjectSuffix || "",
            objectPrefix,
            hideReflexive,
        });
    };

    for (const objectGroup of objectPrefixGroups) {
        const { prefixes } = objectGroup;
        const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const isPassiveNonactive = isDirectGroup;
        const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
        const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
        const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
        let passiveSubjectPrefixes = allowSubjectToggle
            ? Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS)
            : [];
        let objectTogglePrefixes = (isDirectGroup && allowObjectToggle)
            ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(OBJECT_MARKERS)]))
            : prefixes;
        if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
            const subjectMarker = resolvedFusionMarkers[0];
            const objectMarker = resolvedFusionMarkers[1];
            const constrainedSubject = getNonactiveSlotPrefixes(subjectMarker, "subject");
            const constrainedObject = getNonactiveSlotPrefixes(objectMarker, "object");
            if (constrainedSubject) {
                passiveSubjectPrefixes = constrainedSubject;
            }
            if (constrainedObject) {
                objectTogglePrefixes = constrainedObject;
            }
        }
        const allowPassiveObject = isDirectGroup && allowObjectToggle;
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        if (forceImpersonal || isIntransitiveOnly) {
            if (checkRow({ objectPrefix: "", subjectOverride: null, allowPassiveObject })) {
                return true;
            }
            continue;
        }
        if (isDirectGroup) {
            const subjectSelections = passiveSubjectPrefixes.filter((prefix) => prefix !== "");
            const objectSelections = allowObjectToggle ? objectTogglePrefixes : [""];
            for (const subjectPrefix of subjectSelections) {
                const subjectOverride = getPassiveSubjectOverride(subjectPrefix);
                if (!subjectOverride) {
                    continue;
                }
                for (const objectPrefix of objectSelections) {
                    if (checkRow({ objectPrefix, subjectOverride, allowPassiveObject })) {
                        return true;
                    }
                }
            }
            continue;
        }
        for (const objectPrefix of prefixes) {
            if (!objectPrefix) {
                continue;
            }
            if (checkRow({ objectPrefix, subjectOverride: null, allowPassiveObject: false })) {
                return true;
            }
        }
    }
    return false;
}

function renderTenseTabs() {
    const container = document.getElementById("tense-tabs");
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    document.body.classList.toggle("is-nonactive-mode", isNonactiveMode);
    container.innerHTML = "";
    updateTenseModeTabs();
    if (isNonactiveMode && getActiveConjugationGroup() === CONJUGATION_GROUPS.universal) {
        setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
    }
    const verbMeta = getVerbInputMeta();
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const displayVerb = verbMeta.displayVerb;
    let suppletiveStemSet = getSuppletiveStemSet(verbMeta);
    const endsWithConsonant = verb !== "" && !VOWEL_END_RE.test(verb);
    const hasVerb = verb !== "" && VOWEL_RE.test(verb);
    renderNonactiveTabs({ verbMeta, verb, analysisVerb, hasVerb, endsWithConsonant });
    const tenseMode = getActiveTenseMode();
    const allowedTenses = getTenseOrderForMode(tenseMode);
    const selectedTenseValue = getSelectedTenseTab();
    if (!allowedTenses.includes(selectedTenseValue)) {
        setSelectedTenseTab(allowedTenses[0] || TENSE_ORDER[0]);
    }
    const isTransitive = isValencyFilled(getCurrentObjectPrefix(), verbMeta);
    const derivationType = verbMeta.derivationType || getActiveDerivationType();
    let availabilityTargets = [{
        verb,
        analysisVerb,
        isYawi: verbMeta.isYawi,
        isWeya: verbMeta.isWeya,
    }];
    if (derivationType === DERIVATION_TYPE.causative) {
        const causativeDerivation = applyCausativeDerivation({
            isCausative: true,
            verb,
            analysisVerb,
            objectPrefix: getCurrentObjectPrefix(),
            parsedVerb: verbMeta,
            directionalPrefix: verbMeta.directionalPrefix,
            isYawi: verbMeta.isYawi,
            suppletiveStemSet,
        });
        if (causativeDerivation.noCausativeStem) {
            availabilityTargets = [];
        } else {
            const stems = Array.isArray(causativeDerivation.causativeAllStems)
                && causativeDerivation.causativeAllStems.length
                ? causativeDerivation.causativeAllStems
                : [causativeDerivation.verb];
            availabilityTargets = stems.map((stem) => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                    stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                    verb: stem,
                    analysisVerb: stemAnalysis,
                    isYawi: causativeDerivation.isYawi,
                    isWeya: false,
                };
            });
            suppletiveStemSet = causativeDerivation.suppletiveStemSet;
        }
    } else if (derivationType === DERIVATION_TYPE.applicative) {
        const applicativeDerivation = applyApplicativeDerivation({
            isApplicative: true,
            verb,
            analysisVerb,
            objectPrefix: getCurrentObjectPrefix(),
            parsedVerb: verbMeta,
            directionalPrefix: verbMeta.directionalPrefix,
            isYawi: verbMeta.isYawi,
            suppletiveStemSet,
        });
        if (applicativeDerivation.noApplicativeStem) {
            availabilityTargets = [];
        } else {
            const stems = Array.isArray(applicativeDerivation.applicativeAllStems)
                && applicativeDerivation.applicativeAllStems.length
                ? applicativeDerivation.applicativeAllStems
                : [applicativeDerivation.verb];
            availabilityTargets = stems.map((stem) => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                    stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                    verb: stem,
                    analysisVerb: stemAnalysis,
                    isYawi: applicativeDerivation.isYawi,
                    isWeya: false,
                };
            });
            suppletiveStemSet = applicativeDerivation.suppletiveStemSet;
        }
    }
    const availability = PRETERITO_UNIVERSAL_ORDER.map((tenseValue) => {
        if (!hasVerb) {
            return { tenseValue, available: false };
        }
        if (suppletiveStemSet) {
            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const variants = classKey ? suppletiveStemSet.variantsByClass.get(classKey) : null;
            return { tenseValue, available: !!(variants && variants.length) };
        }
        if (!availabilityTargets.length) {
            return { tenseValue, available: false };
        }
        const hasVariants = availabilityTargets.some((target) => {
            const variants = getPretUniversalVariants(
                target.verb,
                tenseValue,
                isTransitive,
                target.analysisVerb,
                {
                    isYawi: target.isYawi,
                    isWeya: target.isWeya,
                    hasSlashMarker: verbMeta.hasSlashMarker,
                    hasSuffixSeparator: verbMeta.hasSuffixSeparator,
                    hasLeadingDash: verbMeta.hasLeadingDash,
                    hasBoundMarker: verbMeta.hasBoundMarker,
                    hasCompoundMarker: verbMeta.hasCompoundMarker,
                    hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
                    exactBaseVerb: verbMeta.exactBaseVerb || "",
                    derivationType,
                }
            );
            return !!(variants && variants.length);
        });
        return { tenseValue, available: hasVariants };
    });
    const selectedUniversal = getSelectedPretUniversalTab();
    const selectedEntry = availability.find((entry) => entry.tenseValue === selectedUniversal);
    if (!selectedEntry || !selectedEntry.available) {
        const firstAvailable = availability.find((entry) => entry.available);
        if (firstAvailable) {
            setSelectedPretUniversalTab(firstAvailable.tenseValue);
        }
    }
    const activeGroup = getActiveConjugationGroup();
    const selectedTense = getSelectedTenseTab();
    const isClassTenseSelected = PRETERITO_CLASS_TENSES.has(selectedTense);
    const tenseOutputCache = new Map();
    const verbOutputContext = (() => {
        if (tenseMode !== TENSE_MODE.verbo) {
            return null;
        }
        const nonactiveConfig = isNonactiveMode ? getNonactiveObjectPrefixGroups(verbMeta) : null;
        const objectPrefixGroups = getVerbObjectPrefixGroups(isNonactiveMode, nonactiveConfig);
        const objectPrefixes = Array.from(new Set(
            objectPrefixGroups.flatMap((group) => group.prefixes)
        ));
        const valencySummary = isNonactiveMode ? getVerbValencySummary(verbMeta) : null;
        const fusionMarkers = verbMeta.isTaFusion
            ? (verbMeta.fusionPrefixes || []).filter((prefix) => FUSION_PREFIXES.has(prefix))
            : [];
        return {
            objectPrefixes,
            objectPrefixGroups,
            subjectSelections: getSubjectPersonSelections(),
            valencySummary,
            fusionMarkers,
        };
    })();
    const resolveTenseHasOutput = (tenseValue) => {
        if (!verbOutputContext || !hasVerb || endsWithConsonant) {
            return null;
        }
        if (tenseOutputCache.has(tenseValue)) {
            return tenseOutputCache.get(tenseValue);
        }
        let hasOutput = false;
        if (isNonactiveMode) {
            const summary = verbOutputContext.valencySummary;
            if (summary) {
                hasOutput = hasNonactiveVerbTenseOutput({
                    verb: displayVerb,
                    tenseValue,
                    objectPrefixGroups: verbOutputContext.objectPrefixGroups,
                    activeValency: summary.baseValency,
                    nonactiveAvailableSlots: summary.nonactiveObjectSlots,
                    hasPromotableObject: summary.baseObjectSlots > summary.fusionObjectSlots,
                    fusionMarkers: verbOutputContext.fusionMarkers,
                });
            }
        } else {
            hasOutput = hasActiveVerbTenseOutput({
                verb: displayVerb,
                tenseValue,
                objectPrefixes: verbOutputContext.objectPrefixes,
                subjectSelections: verbOutputContext.subjectSelections,
            });
        }
        tenseOutputCache.set(tenseValue, hasOutput);
        return hasOutput;
    };
    const buildTenseButton = (tenseValue) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        if (activeGroup === CONJUGATION_GROUPS.tense && tenseValue === getSelectedTenseTab()) {
            button.classList.add("is-active");
        }
        const hasOutput = resolveTenseHasOutput(tenseValue);
        if (hasOutput === false) {
            button.classList.add("is-empty");
        }
        const label = document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = getLocalizedLabel(TENSE_LABELS[tenseValue], isNawat, tenseValue);
        button.appendChild(label);
        button.disabled = endsWithConsonant;
        button.addEventListener("click", () => {
            const wasActive = activeGroup === CONJUGATION_GROUPS.tense && tenseValue === selectedTense;
            setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
            setSelectedTenseTab(tenseValue);
            if (PRETERITO_CLASS_TENSES.has(tenseValue) && wasActive && CLASS_FILTER_STATE.activeClass) {
                CLASS_FILTER_STATE.activeClass = null;
            }
            renderTenseTabs();
            renderActiveConjugations({
                verb: displayVerb,
                objectPrefix: getCurrentObjectPrefix(),
                tense: tenseValue,
            });
        });
        return button;
    };
    const mainWrap = document.createElement("div");
    mainWrap.className = "tense-tabs-main";
    const leftColumn = document.createElement("div");
    leftColumn.className = "tense-tabs-column";
    const rightColumn = document.createElement("div");
    rightColumn.className = "tense-tabs-column";

    const appendTenseGroups = (groups, columnEl) => {
        groups.forEach((group) => {
            const groupEl = document.createElement("div");
            groupEl.className = "tense-tabs-group";
            if (group.heading) {
                const heading = document.createElement("div");
                heading.className = "tense-tabs-heading";
                heading.textContent = getLocalizedLabel(group.heading, isNawat, "");
                groupEl.appendChild(heading);
            }
            group.tenses.forEach((tenseValue) => {
                groupEl.appendChild(buildTenseButton(tenseValue));
            });
            columnEl.appendChild(groupEl);
        });
    };

    const modeGroups = TENSE_LINGUISTIC_GROUPS[tenseMode] || TENSE_LINGUISTIC_GROUPS.verbo;
    appendTenseGroups(modeGroups.left, leftColumn);
    appendTenseGroups(modeGroups.right, rightColumn);

    mainWrap.appendChild(leftColumn);
    mainWrap.appendChild(rightColumn);

    if (tenseMode === TENSE_MODE.verbo && !isNonactiveMode) {
        const universalWrap = document.createElement("div");
        universalWrap.className = "tense-tabs-universal";
        const activeUniversal = getSelectedPretUniversalTab();
        availability.forEach(({ tenseValue, available }) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "tense-tab";
            const hasOutput = resolveTenseHasOutput(tenseValue);
            if (hasOutput === false) {
                button.classList.add("is-empty");
            }
            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            if (activeGroup === CONJUGATION_GROUPS.universal && tenseValue === activeUniversal && available) {
                button.classList.add("is-active");
            } else if (
                activeGroup === CONJUGATION_GROUPS.tense &&
                isClassTenseSelected &&
                classKey &&
                CLASS_FILTER_STATE.activeClass === classKey
            ) {
                button.classList.add("is-active");
            }
            const classDetail = getPretUniversalClassDetail(tenseValue);
            button.textContent = classDetail
                ? getLocalizedLabel(classDetail.label, isNawat, tenseValue)
                : tenseValue;
            button.disabled = endsWithConsonant || !available;
            button.addEventListener("click", () => {
                if (activeGroup === CONJUGATION_GROUPS.universal && tenseValue === activeUniversal) {
                    setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
                    renderTenseTabs();
                    renderActiveConjugations({
                        verb: displayVerb,
                        objectPrefix: getCurrentObjectPrefix(),
                        tense: selectedTense,
                    });
                    return;
                }
                if (activeGroup === CONJUGATION_GROUPS.tense && isClassTenseSelected && classKey) {
                    CLASS_FILTER_STATE.activeClass =
                        CLASS_FILTER_STATE.activeClass === classKey ? null : classKey;
                    renderTenseTabs();
                    renderActiveConjugations({
                        verb: displayVerb,
                        objectPrefix: getCurrentObjectPrefix(),
                        tense: selectedTense,
                    });
                    return;
                }
                setActiveConjugationGroup(CONJUGATION_GROUPS.universal);
                setSelectedPretUniversalTab(tenseValue);
                renderTenseTabs();
                renderActiveConjugations({
                    verb: displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
            universalWrap.appendChild(button);
        });
        container.appendChild(universalWrap);
    }
    container.appendChild(mainWrap);
}

function renderPretUniversalTabs() {
    renderTenseTabs();
}

// === Toggle Options & State ===
function getSubjectPersonSelections() {
    const selections = [];
    SUBJECT_PERSON_NUMBER_ORDER.forEach((number) => {
        SUBJECT_PERSON_GROUPS.forEach((group) => {
            const selection = group[number];
            if (selection) {
                selections.push({ group, selection, number });
            }
        });
    });
    return selections;
}

function getPersonGroupLabel(group, isNawat) {
    if (!group) {
        return "";
    }
    const labelKey = group.labelKey || group.id || "";
    const labelEntry = labelKey ? PERSON_GROUP_LABELS[labelKey] : null;
    const fallback = getLocalizedLabel(group, isNawat, "");
    return getLocalizedLabel(labelEntry, isNawat, fallback);
}

function getPersonSubLabel(selection, isNawat) {
    if (!selection) {
        return "";
    }
    const labelKey = selection.personSubKey || selection.labelKey || selection.id || "";
    const labelEntry = labelKey ? PERSON_SUB_LABELS[labelKey] : null;
    const fallback = getLocalizedLabel(selection, isNawat, "");
    return getLocalizedLabel(labelEntry, isNawat, fallback);
}

function getSubjectPersonLabel(group, selection, isNawat) {
    const baseLabel = getPersonGroupLabel(group, isNawat);
    if (!selection) {
        return baseLabel;
    }
    const numberKey = selection.subjectSuffix === "t" ? "plural" : "singular";
    const numberLabels = NUMBER_LABELS[numberKey] || {};
    const numberLabel = isNawat ? (numberLabels.na || numberKey) : (numberLabels.es || numberKey);
    return `${baseLabel} ${numberLabel}`;
}

function getLocalizedLabel(entry, isNawat, fallback = "") {
    if (!entry) {
        return fallback;
    }
    if (typeof entry === "string") {
        return entry || fallback;
    }
    if (typeof entry === "object") {
        const value = isNawat
            ? (entry.labelNa ?? entry.labelEs)
            : (entry.labelEs ?? entry.labelNa);
        return value || fallback;
    }
    return fallback;
}

function getToggleLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(TOGGLE_LABELS[key], isNawat, fallback);
}

function getPlaceholderLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(PLACEHOLDER_LABELS[key], isNawat, fallback);
}

function getVerbBlockLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(VERB_BLOCK_LABELS[key], isNawat, fallback);
}

function getIsNawat() {
    return Boolean(document.getElementById("language")?.checked);
}

function getLocalizedDescription(entry, isNawat) {
    if (!entry) {
        return "";
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat
            ? (entry.labelNa || entry.labelEs || "")
            : (entry.labelEs || entry.labelNa || "");
    }
    return "";
}

function getPretUniversalClassDetail(tenseValue) {
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
    if (!classKey) {
        return null;
    }
    return PRETERITO_CLASS_DETAIL_BY_KEY[classKey] || null;
}

function getObjectStateKey({ groupKey, tenseValue = "", mode = "standard", isNonactive = false }) {
    const modeKey = mode ? `${mode}|` : "";
    const nonactiveKey = isNonactive ? "nonactive|" : "";
    const tenseKey = tenseValue ? `${tenseValue}|` : "";
    return `${modeKey}${nonactiveKey}${tenseKey}${groupKey}`;
}

function getPatientivoOwnershipKey(groupKey) {
    return `noun|patientivo|${groupKey}|ownership`;
}

function clearToggleStateByPrefix(map, prefix) {
    if (!prefix) {
        return;
    }
    for (const key of map.keys()) {
        if (key.startsWith(prefix)) {
            map.delete(key);
        }
    }
}

function resetToggleStateForTense(tenseValue) {
    if (!tenseValue) {
        return;
    }
    clearToggleStateByPrefix(SUBJECT_TOGGLE_STATE, `standard|${tenseValue}|`);
    clearToggleStateByPrefix(SUBJECT_TOGGLE_STATE, `universal|${tenseValue}|`);
    clearToggleStateByPrefix(SUBJECT_TOGGLE_STATE, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(OBJECT_TOGGLE_STATE, `standard|${tenseValue}|`);
    clearToggleStateByPrefix(OBJECT_TOGGLE_STATE, `standard|nonactive|${tenseValue}|`);
    clearToggleStateByPrefix(OBJECT_TOGGLE_STATE, `universal|${tenseValue}|`);
    clearToggleStateByPrefix(OBJECT_TOGGLE_STATE, `universal|nonactive|${tenseValue}|`);
    clearToggleStateByPrefix(OBJECT_TOGGLE_STATE, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(POSSESSOR_TOGGLE_STATE, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(PATIENTIVO_OWNERSHIP_STATE, `noun|${tenseValue}|`);
}

function getSubjectToggleOptions() {
    const isNawat = getIsNawat();
    const options = [
        {
            id: SUBJECT_TOGGLE_ALL,
            label: getToggleLabel("all", isNawat, "todos"),
            subjectPrefix: null,
            subjectSuffix: null,
        },
    ];
    SUBJECT_COMBINATIONS.forEach((combo) => {
        const label = combo.subjectPrefix ? combo.subjectPrefix : "Ø";
        options.push({
            id: combo.id,
            label,
            subjectPrefix: combo.subjectPrefix,
            subjectSuffix: combo.subjectSuffix,
        });
    });
    return options;
}

function getDefaultNounSubjectId(subjectOptions) {
    const match = subjectOptions.find((entry) => entry.subjectPrefix === "" && entry.subjectSuffix === "");
    return match ? match.id : SUBJECT_TOGGLE_ALL;
}

function getObjectToggleOptions(prefixes, options = {}) {
    const isNawat = options.isNawat ?? getIsNawat();
    const includeAll = options.includeAll !== false;
    const labelForPrefix = options.labelForPrefix;
    const list = [];
    if (includeAll) {
        list.push({ id: OBJECT_TOGGLE_ALL, label: getToggleLabel("all", isNawat, "todos"), prefix: null });
    }
    prefixes.forEach((prefix) => {
        const label = labelForPrefix
            ? labelForPrefix(prefix, isNawat)
            : (prefix || getToggleLabel("intransitive", isNawat, "intrans"));
        list.push({
            id: prefix,
            label,
            prefix,
        });
    });
    return list;
}

function getPassiveToggleLabel(prefix, isNawat = false) {
    const subject = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (!subject) {
        return prefix || getToggleLabel("intransitive", isNawat, "intrans");
    }
    return subject.subjectPrefix || "Ø";
}

function getNonspecificToggleLabel(prefix) {
    return prefix || "Ø";
}

// === Mode State Accessors ===
function getActiveConjugationGroup() {
    return CONJUGATION_GROUP_STATE.activeGroup;
}

function setActiveConjugationGroup(group) {
    if (group !== CONJUGATION_GROUPS.tense && group !== CONJUGATION_GROUPS.universal) {
        return;
    }
    if (CONJUGATION_GROUP_STATE.activeGroup !== group) {
        const tenseValue = group === CONJUGATION_GROUPS.universal
            ? getSelectedPretUniversalTab()
            : getSelectedTenseTab();
        resetToggleStateForTense(tenseValue);
    }
    CONJUGATION_GROUP_STATE.activeGroup = group;
}

function getActiveTenseMode() {
    return TENSE_MODE_STATE.mode;
}

function setActiveTenseMode(mode) {
    if (!Object.values(TENSE_MODE).includes(mode)) {
        return;
    }
    if (TENSE_MODE_STATE.mode !== mode) {
        SUBJECT_TOGGLE_STATE.clear();
        OBJECT_TOGGLE_STATE.clear();
        POSSESSOR_TOGGLE_STATE.clear();
        PATIENTIVO_OWNERSHIP_STATE.clear();
    }
    TENSE_MODE_STATE.mode = mode;
    if (mode === TENSE_MODE.sustantivo) {
        setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
        CLASS_FILTER_STATE.activeClass = null;
    }
}

function getActiveVoiceMode() {
    return VOICE_MODE_STATE.mode;
}

function setActiveVoiceMode(mode) {
    if (!Object.values(VOICE_MODE).includes(mode)) {
        return;
    }
    VOICE_MODE_STATE.mode = mode;
}

function getActiveDerivationMode() {
    return DERIVATION_MODE_STATE.mode;
}

function setActiveDerivationMode(mode) {
    if (!Object.values(DERIVATION_MODE).includes(mode)) {
        return;
    }
    DERIVATION_MODE_STATE.mode = mode;
}

function getActiveDerivationType() {
    return DERIVATION_TYPE_STATE.type;
}

function setActiveDerivationType(type) {
    if (!Object.values(DERIVATION_TYPE).includes(type)) {
        return;
    }
    DERIVATION_TYPE_STATE.type = type;
}

function getDerivationValencyDelta(type) {
    if (type === DERIVATION_TYPE.causative || type === DERIVATION_TYPE.applicative) {
        return 1;
    }
    return 0;
}

function getEffectiveDerivationValencyDelta(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    if (Number.isFinite(verbMeta.derivationValencyDelta)) {
        return verbMeta.derivationValencyDelta;
    }
    const type = verbMeta.derivationType || "";
    return getDerivationValencyDelta(type);
}

function getSelectedNonactiveSuffix() {
    return NONACTIVE_SUFFIX_STATE.selected;
}

function setSelectedNonactiveSuffix(value) {
    if (value === null) {
        NONACTIVE_SUFFIX_STATE.selected = null;
        return;
    }
    if (!NONACTIVE_SUFFIX_ORDER.includes(value)) {
        return;
    }
    NONACTIVE_SUFFIX_STATE.selected = value;
}

function getCombinedMode() {
    if (getActiveDerivationMode() === DERIVATION_MODE.nonactive || getActiveVoiceMode() === VOICE_MODE.passive) {
        return COMBINED_MODE.nonactive;
    }
    return COMBINED_MODE.active;
}

function setCombinedMode(mode) {
    if (!Object.values(COMBINED_MODE).includes(mode)) {
        return;
    }
    if (getCombinedMode() !== mode) {
        const activeGroup = getActiveConjugationGroup();
        const tenseValue = activeGroup === CONJUGATION_GROUPS.universal
            ? getSelectedPretUniversalTab()
            : getSelectedTenseTab();
        resetToggleStateForTense(tenseValue);
    }
    if (mode === COMBINED_MODE.nonactive) {
        setActiveDerivationMode(DERIVATION_MODE.nonactive);
        setActiveVoiceMode(VOICE_MODE.passive);
    } else {
        setActiveDerivationMode(DERIVATION_MODE.active);
        setActiveVoiceMode(VOICE_MODE.active);
    }
}

function getTenseOrderForMode(mode) {
    if (mode === TENSE_MODE.sustantivo) {
        return [
            "sustantivo-verbal",
            "agentivo",
            "patientivo",
            "instrumentivo",
            "calificativo-instrumentivo",
            "locativo-temporal",
        ];
    }
    return TENSE_ORDER.filter((tense) => (
        tense !== "sustantivo-verbal"
        && tense !== "agentivo"
        && tense !== "patientivo"
        && tense !== "instrumentivo"
        && tense !== "calificativo-instrumentivo"
        && tense !== "locativo-temporal"
    ));
}

function updateTenseModeTabs() {
    const buttons = document.querySelectorAll("[data-tense-mode]");
    if (!buttons.length) {
        return;
    }
    const mode = getActiveTenseMode();
    document.body.classList.toggle("is-sustantivo-mode", mode === TENSE_MODE.sustantivo);
    buttons.forEach((button) => {
        const isActive = button.getAttribute("data-tense-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    updateDerivationTypeControl();
    updateCombinedModeTabs();
}

function initTenseModeTabs() {
    const buttons = document.querySelectorAll("[data-tense-mode]");
    if (!buttons.length) {
        return;
    }
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-tense-mode");
            if (!mode) {
                return;
            }
            setActiveTenseMode(mode);
            renderTenseTabs();
            const verbMeta = getVerbInputMeta();
            renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: getCurrentObjectPrefix(),
            });
        });
    });
    updateTenseModeTabs();
}

function updateCombinedModeTabs() {
    const buttons = document.querySelectorAll("[data-combined-mode]");
    if (!buttons.length) {
        return;
    }
    const isSustantivoMode = getActiveTenseMode() === TENSE_MODE.sustantivo;
    const mode = getCombinedMode();
    const container = document.querySelector(".voice-derivation-tabs");
    if (container) {
        container.classList.toggle("is-disabled", isSustantivoMode);
        container.setAttribute("aria-disabled", String(isSustantivoMode));
    }
    buttons.forEach((button) => {
        const isActive = button.getAttribute("data-combined-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = isSustantivoMode;
    });
}

function initCombinedModeTabs() {
    const buttons = document.querySelectorAll("[data-combined-mode]");
    if (!buttons.length) {
        return;
    }
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-combined-mode");
            if (!mode) {
                return;
            }
            setCombinedMode(mode);
            updateCombinedModeTabs();
            renderTenseTabs();
            const verbMeta = getVerbInputMeta();
            renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: getCurrentObjectPrefix(),
            });
        });
    });
    updateCombinedModeTabs();
}

function updateDerivationTypeControl() {
    const select = document.getElementById("derivation-type");
    if (!select) {
        return;
    }
    const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
    const container = document.querySelector(".derivation-type-row");
    if (container) {
        container.classList.toggle("is-disabled", !isVerbMode);
        container.setAttribute("aria-disabled", String(!isVerbMode));
    }
    select.disabled = !isVerbMode;
    select.value = getActiveDerivationType();
}

function initDerivationTypeControl() {
    const select = document.getElementById("derivation-type");
    if (!select) {
        return;
    }
    select.addEventListener("change", () => {
        setActiveDerivationType(select.value);
        updateDerivationTypeControl();
        renderTenseTabs();
        const verbMeta = getVerbInputMeta();
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
        });
    });
    updateDerivationTypeControl();
}

// === Localization ===
// Generate translated label
function changeLanguage() {
    var languageSwitch = document.getElementById("language");
    var selectedLanguage = languageSwitch.checked ? "nawat" : "original";
  
    var labelElementIds = [
        "word-heading",
        "verb-label",
        "tutorial-title",
        "tutorial-trigger",
        "copyright-label",
        "tense-tabs-mode-verb",
        "tense-tabs-mode-noun",
        "tense-tabs-mode-active",
        "tense-tabs-mode-nonactive",
        "derivation-type-label",
    ];

    var translations = {
        "word-heading": "Sentajkwiluluni tik Nawat ipal El Salvador",
        "verb-label": "Tachiwalis",
        "tutorial-title": "Shitajkwilu iwan majmachiyut",
        "tutorial-trigger": "Tajkwilulpamit regex",
        "copyright-label": "Copyright © 2026 Jaime Núñez",
        "derivation-type-label": "Derivación",
    };
  
    if (selectedLanguage === "nawat") {
      labelElementIds.forEach(function(elementId) {
        var labelElement = document.getElementById(elementId);
        if (labelElement) {
          // Store the original text
          originalLabels[elementId] = originalLabels[elementId] || labelElement.textContent;
          const localized = getLocalizedLabel(
              UI_LABELS[elementId],
              true,
              translations[elementId] || labelElement.textContent
          );
          const resolvedLabel = localized
              || translations[elementId]
              || originalLabels[elementId]
              || labelElement.textContent
              || elementId;
          // Replace with the translated text
          labelElement.textContent = resolvedLabel;
        }
      });
    } else {
      labelElementIds.forEach(function(elementId) {
        var labelElement = document.getElementById(elementId);
        if (labelElement && originalLabels[elementId]) {
          // Restore the original text
          labelElement.textContent = originalLabels[elementId];
        }
      });
    }
  
        // Handle the placeholder of the verb text input
        var verbInput = document.getElementById("verb");
        if (selectedLanguage === "nawat") {
            // Store the original placeholder
            originalPlaceholder = verbInput.placeholder;
            // Replace with the translated placeholder
            verbInput.placeholder = "Shitajkwilu kalijtik";
        } else if (originalPlaceholder) {
            // Restore the original placeholder
            verbInput.placeholder = originalPlaceholder;
        }
    renderTenseTabs();
    renderPretUniversalTabs();
    renderAllOutputs({
        verb: getVerbInputMeta().displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
        tense: getSelectedTenseTab() || TENSE_ORDER[0] || "presente",
    });
    renderVerbMirror();
}
if (typeof window !== "undefined") {
    window.changeLanguage = changeLanguage;
}

// === Morphology & Generation ===
function applyMorphologyRules({
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    verb,
    tense,
    analysisVerb,
    rawAnalysisVerb,
    analysisExactVerb,
    isYawi,
    isWeya,
    directionalPrefix,
    directionalRuleMode = "",
    suppletiveStemSet,
    suppletiveTenseSuffixes = null,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    isTaFusion = false,
    indirectObjectMarker = "",
    skipPretClass = false,
    isUnderlyingTransitive = false,
    hasSubjectValent = true,
    boundPrefix = "",
    isNounContext = false,
    patientivoSource = "nonactive",
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
}) {
    subjectPrefix = typeof subjectPrefix === "string" ? subjectPrefix : "";
    objectPrefix = typeof objectPrefix === "string" ? objectPrefix : "";
    subjectSuffix = typeof subjectSuffix === "string" ? subjectSuffix : "";
    verb = typeof verb === "string" ? verb : "";
    analysisVerb = typeof analysisVerb === "string" ? analysisVerb : "";
    const baseSubjectSuffix = subjectSuffix;
    const baseSubjectPrefix = subjectPrefix;
    let baseObjectPrefix = objectPrefix;
    const prefixCheckCandidate = rawAnalysisVerb || analysisExactVerb || analysisVerb || verb;
    const prefixCheckBase = getDerivationRuleBase(prefixCheckCandidate, {
        analysisVerb: prefixCheckCandidate,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    const prefixCheckTarget = prefixCheckBase || verb;
    const directionalInputPrefix = directionalPrefix || "";
    let directionalOutputPrefix = directionalInputPrefix;
    const alternateForms = [];
    let patientivoBlankPossessiveW = false;
    const isIntransitiveVerb =
        objectPrefix === ""
        && !isTaFusion
        && !indirectObjectMarker
        && !isUnderlyingTransitive;
    const forceTransitiveBase = isTaFusion || isUnderlyingTransitive;
    const isNounTense = isNonanimateNounTense(tense)
        || tense === "agentivo"
        || tense === "patientivo"
        || tense === "instrumentivo"
        || tense === "calificativo-instrumentivo"
        || tense === "locativo-temporal";
    const isNounContextFinal = isNounContext || isNounTense;
    const forceTransitiveDirectional = directionalRuleMode === "transitive";
    const forceIntransitiveDirectional = directionalRuleMode === "intransitive";
    const forceNonspecificDirectional = directionalRuleMode === "nonspecific";
    const directionalPrefixResult = applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        subjectPrefix,
        objectPrefix,
        verb,
        baseSubjectPrefix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        isNounTense: isNounContextFinal,
    }, "prefix");
    ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalOutputPrefix,
    } = directionalPrefixResult);
    const shortenKiPrefix = (prefix) => {
        if (!prefix) {
            return prefix;
        }
        if (prefix.startsWith("ki") && prefix.length > 2 && ["ni", "ti"].includes(baseSubjectPrefix)) {
            const tail = prefix.slice(2);
            if (NONSPECIFIC_VALENCE_AFFIX_SET.has(tail)) {
                return `k${tail}`;
            }
        }
        if (prefix.endsWith("ki") && prefix.length > 2) {
            return `${prefix.slice(0, -2)}k`;
        }
        if (prefix === "ki" && ["ni", "ti"].includes(baseSubjectPrefix)) {
            return "k";
        }
        return prefix;
    };
    const marker = indirectObjectMarker || "";
    objectPrefix = applyIndirectObjectMarker(objectPrefix, marker);
    // Check if the object prefix "ki" should be shortened to "k"
    objectPrefix = shortenKiPrefix(objectPrefix);
    // Avoid double-i when object prefix ends in "i" and the verb starts with "i".
    if (objectPrefix && objectPrefix.endsWith("i") && verb.startsWith("i")) {
        verb = verb.slice(1);
        if (analysisVerb.startsWith("i")) {
            analysisVerb = analysisVerb.slice(1);
        }
    }

    const applyNhBeforeVowel = (prefix, nextVerb) => {
        if (!prefix || !nextVerb || !VOWEL_START_RE.test(nextVerb)) {
            return prefix;
        }
        if (!prefix.endsWith("n") || prefix.length < 2) {
            return prefix;
        }
        const prevChar = prefix[prefix.length - 2];
        if (!VOWEL_RE.test(prevChar) || prefix.endsWith("nh")) {
            return prefix;
        }
        return `${prefix}h`;
    };

    // Check, when verb starts with "i", if subject prefix "ni", "ti" or "an" should be shortened to "n" or "t".
    if (objectPrefix === "" && verb.startsWith("i") && ["ni", "ti", "an"].includes(subjectPrefix)) {
        subjectPrefix = subjectPrefix
            .replace("ni", "n")
            .replace("ti", "t");
        subjectPrefix = applyNhBeforeVowel(subjectPrefix, verb);
    }

    // Check if subject prefix "an" should be changed to "anh" when the object prefix is empty and the verb starts with
    // "a", "e", "u".
    if (subjectPrefix === "an" && objectPrefix === "" && startsWithAny(verb, AN_PREFIX_VOWEL_PREFIXES)) {
        subjectPrefix = applyNhBeforeVowel(subjectPrefix, verb);
    }

    // Replace kin to kinh and metzin to metzinh before vowels.
    if (VOWEL_START_RE.test(verb) && ["kin", "metzin"].includes(objectPrefix)) {
        objectPrefix = applyNhBeforeVowel(objectPrefix, verb);
    }

    // When reflexive, iskalia loses initial 'i'
    if ((objectPrefix === "mu" || marker === "mu") && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }
    subjectSuffix = applyTenseSuffixRules(tense, subjectSuffix);
    if (suppletiveTenseSuffixes && Object.prototype.hasOwnProperty.call(suppletiveTenseSuffixes, tense)) {
        const overrideMap = suppletiveTenseSuffixes[tense];
        if (overrideMap && Object.prototype.hasOwnProperty.call(overrideMap, baseSubjectSuffix)) {
            subjectSuffix = overrideMap[baseSubjectSuffix];
        }
    }
    const exactAnalysisVerb = analysisExactVerb || analysisVerb || verb;
    const rawAnalysis = analysisVerb || verb;
    const nonRedupAnalysis = getNonReduplicatedRoot(rawAnalysis);
    const useAnalysisForCounts = Boolean(directionalInputPrefix) || nonRedupAnalysis !== rawAnalysis;
    const analysisTarget = useAnalysisForCounts ? nonRedupAnalysis : rawAnalysis;
    if (tense === "imperativo") {
        if ((subjectPrefix === "ti" && subjectSuffix === "") || subjectPrefix.startsWith("an")) {
            subjectPrefix = "shi";
        }
        if (endsWithAny(verb, IA_UA_SUFFIXES)) {
            verb = verb.slice(0, -1);
        }
    }
    if (tense === "sustantivo-verbal") {
        const nounSource = verb;
        if (endsWithAny(verb, IA_UA_SUFFIXES)) {
            verb = verb.slice(0, -1);
        }
        const isIntransitive = isIntransitiveVerb;
        const nounBase = verb;
        const nounAlternates = new Set();
        const addNounAlternate = (base) => {
            if (!base || base === nounBase || nounAlternates.has(base)) {
                return;
            }
            nounAlternates.add(base);
            alternateForms.push({ verb: base, subjectSuffix });
        };
        const stripNonactiveSuffix = (stem, suffix) => {
            if (!stem || !suffix) {
                return "";
            }
            return stem.endsWith(suffix) ? stem.slice(0, -suffix.length) : "";
        };
        const hasYaEnding = isIntransitive && nounBase.endsWith("ya") && nounBase.length > 2;
        const rootPlusYaBaseResolved = hasYaEnding
            ? (rootPlusYaBase || nounBase.slice(0, -2))
            : "";
        const rootPlusYaNonRedup = rootPlusYaBaseResolved
            ? getNonReduplicatedRoot(rootPlusYaBaseResolved)
            : "";
        const rootVowelCount = rootPlusYaBaseResolved
            ? getTotalVowelCount(rootPlusYaNonRedup || rootPlusYaBaseResolved)
            : 0;
        const hasMonosyllableRootPlusYa = rootVowelCount === 1;
        const allowYaAlternates = !hasMonosyllableRootPlusYa;
        if (isIntransitive && allowYaAlternates) {
            const nonactiveRuleBase = getDerivationRuleBase(analysisVerb || nounSource || "", {
                analysisVerb,
                hasSlashMarker,
                hasSuffixSeparator,
                hasLeadingDash,
                hasBoundMarker,
                hasCompoundMarker,
                boundPrefix,
            });
            const nonactiveOptions = getNonactiveDerivationOptions(nonactiveRuleBase, nonactiveRuleBase, {
                isTransitive: false,
                isYawi,
                ruleBase: nonactiveRuleBase,
                rootPlusYaBase,
            });
            nonactiveOptions.forEach((option) => {
                const base = stripNonactiveSuffix(option.stem, option.suffix);
                addNounAlternate(base);
            });
        }
        const sustantivoLetterCount = getVerbLetterCount(nounSource || verb);
        if (allowYaAlternates && hasYaEnding && sustantivoLetterCount > 2) {
            const droppedYa = verb.slice(0, -2);
            addNounAlternate(droppedYa);
        }
        const endsWithSourceI = nounSource.endsWith("i");
        const endsWithSourceU = nounSource.endsWith("u");
        const endsWithSourceUa = nounSource.endsWith("ua");
        const endsWithSourceWa = nounSource.endsWith("wa");
        const endsWithSourceKa = nounSource.endsWith("ka");
        const endsWithSourceLi = nounSource.endsWith("li");
        const addSVariant = (base) => {
            if (!base) {
                return;
            }
            alternateForms.push({ verb: base, subjectSuffix: "s" });
        };
        if (isIntransitive) {
            if (endsWithSourceWa || endsWithSourceKa) {
                addSVariant(nounBase.endsWith("a") ? `${nounBase.slice(0, -1)}i` : nounBase);
            }
            if (endsWithSourceI || endsWithSourceU || endsWithSourceUa) {
                addSVariant(nounBase);
            }
        } else if (endsWithSourceLi) {
            addSVariant(nounBase);
        }
    }
    if (tense === "patientivo") {
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        if (patientivoSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
            return { error: true };
        }
        const pluralMarker = baseSubjectSuffix === "p"
            ? "wan"
            : (baseSubjectSuffix === "t" ? "met" : "");
        const applyPatientivoSuffix = (suffix) => {
            if (pluralMarker) {
                return pluralMarker;
            }
            return suffix || "";
        };
        const patientivoInput = {
            verb,
            analysisVerb,
            rawAnalysisVerb,
            isTransitive,
            objectPrefix,
            directionalPrefix: directionalInputPrefix,
            isYawi,
            hasImpersonalTaPrefix,
            boundPrefix,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb: exactAnalysisVerb,
            suppletiveStemSet,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
        };
        const derivations = patientivoSource === "perfectivo"
            ? buildPatientivoPerfectivoDerivations(patientivoInput)
            : (patientivoSource === "imperfectivo"
                ? buildPatientivoImperfectivoDerivations(patientivoInput)
                : (patientivoSource === "tronco-verbal"
                    ? buildPatientivoTroncoDerivations(patientivoInput)
                    : buildPatientivoDerivations(patientivoInput)));
        if (
            !derivations.length
            && (
                patientivoSource === "perfectivo"
                || patientivoSource === "imperfectivo"
                || patientivoSource === "tronco-verbal"
            )
        ) {
            return { error: true };
        }
        if (derivations.length) {
            const [primary, ...alternates] = derivations;
            verb = primary.verb;
            subjectSuffix = applyPatientivoSuffix(primary.subjectSuffix);
            patientivoBlankPossessiveW = Boolean(primary.blankPossessiveW);
            alternates.forEach((entry) => {
                alternateForms.push({
                    verb: entry.verb,
                    subjectSuffix: applyPatientivoSuffix(entry.subjectSuffix),
                    blankPossessiveW: entry.blankPossessiveW,
                });
            });
        }
    }

    if (PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalOutput = buildPretUniversalResultWithProvenance({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            analysisVerb,
            exactBaseVerb: exactAnalysisVerb,
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
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveStemSet,
            forceTransitive: forceTransitiveBase,
            indirectObjectMarker,
        });
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: universalOutput.result || "—",
            stemProvenance: universalOutput.provenance || null,
        };
    }

    if (!skipPretClass && PRETERITO_CLASS_TENSES.has(tense)) {
        const isNonactiveMode =
            getActiveTenseMode() === TENSE_MODE.verbo && getActiveDerivationMode() === DERIVATION_MODE.nonactive;
        if (isNonactiveMode) {
            const nonactiveResult = buildNonactivePerfectiveResult({
                verb,
                subjectPrefix,
                objectPrefix,
                subjectSuffix,
                tense,
                directionalInputPrefix,
                directionalOutputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix,
                indirectObjectMarker,
            });
            return {
                subjectPrefix: "",
                objectPrefix: "",
                subjectSuffix: "",
                verb: nonactiveResult || "—",
                stemProvenance: null,
            };
        }
        const classOutput = buildClassBasedResultWithProvenance({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            analysisVerb,
            exactBaseVerb: exactAnalysisVerb,
            classFilter: CLASS_FILTER_STATE.activeClass,
            allowAllClasses: false,
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
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveStemSet,
            forceTransitive: forceTransitiveBase,
            indirectObjectMarker,
        });
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: classOutput.result || "—",
            stemProvenance: classOutput.provenance || null,
        };
    }

/* GRAMATICAL RULES */
    // Elision rule of double k (k/kw)
    const allowDirectionalElision = !directionalInputPrefix || directionalInputPrefix === "ku";
    const elisionTarget = directionalInputPrefix === "ku"
        ? verb
        : (directionalInputPrefix ? analysisTarget : verb);
    if (allowDirectionalElision && objectPrefix === "k" && elisionTarget.startsWith("k") && !marker) {
        objectPrefix = "";
    }
    const isTransitive = objectPrefix !== "" || forceTransitiveBase;
    const directionalPostResult = applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        subjectPrefix,
        objectPrefix,
        verb,
        baseSubjectPrefix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        isNounTense: isNounContextFinal,
    }, "post-elision");
    ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalOutputPrefix,
    } = directionalPostResult);
    const disallowRootPlusYa = exactAnalysisVerb === "ya"
        && (hasSlashMarker || hasSuffixSeparator || hasLeadingDash);
    const rootPlusYaBaseResolved = isPerfectiveTense(tense) && !disallowRootPlusYa
        ? (rootPlusYaBasePronounceable || getRootPlusYaBase(verb, {
            isTransitive,
            isYawi,
            isWeya,
            requirePronounceable: true,
        }))
        : null;
    if (rootPlusYaBaseResolved) {
        alternateForms.push({ verb: rootPlusYaBaseResolved, subjectSuffix });
    }
    if (objectPrefix.endsWith("k") && verb.startsWith("k")) {
        if (verb.startsWith("kw")) {
            objectPrefix = objectPrefix.slice(0, -1);
        } else {
            verb = verb.slice(1);
        }
    }
    const hasDerivedMuPrefix = Boolean(hasSuffixSeparator || hasCompoundMarker || hasSlashMarker || directionalInputPrefix);
    if (hasDerivedMuPrefix) {
        if (verb.startsWith("mu") && objectPrefix.endsWith("mu")) {
            objectPrefix = objectPrefix.slice(0, -2);
        }
        if (objectPrefix === "mu" && verb.startsWith("mu")) {
            objectPrefix = "";
        }
        if (verb.startsWith("mu")) {
            const embeddedMarker = objectPrefix === "ta" || objectPrefix === "te"
                ? objectPrefix
                : (objectPrefix.startsWith("al") && (objectPrefix.slice(2) === "ta" || objectPrefix.slice(2) === "te")
                    ? objectPrefix.slice(2)
                    : (objectPrefix.startsWith("wal") && (objectPrefix.slice(3) === "ta" || objectPrefix.slice(3) === "te")
                        ? objectPrefix.slice(3)
                        : ""));
            if (embeddedMarker && !verb.startsWith(`mu${embeddedMarker}`)) {
                if (objectPrefix.startsWith("al")) {
                    objectPrefix = "al";
                } else if (objectPrefix.startsWith("wal")) {
                    objectPrefix = "wal";
                } else {
                    objectPrefix = "";
                }
                verb = `mu${embeddedMarker}${verb.slice(2)}`;
                if (alternateForms.length) {
                    alternateForms.forEach((form) => {
                        if (
                            form
                            && form.verb
                            && form.verb.startsWith("mu")
                            && !form.verb.startsWith(`mu${embeddedMarker}`)
                        ) {
                            form.verb = `mu${embeddedMarker}${form.verb.slice(2)}`;
                        }
                    });
                }
            }
        } else if (
            !objectPrefix
            && (verb.startsWith("tamu") || verb.startsWith("temu"))
        ) {
            const embeddedMarker = verb.slice(0, 2);
            verb = `mu${embeddedMarker}${verb.slice(4)}`;
            if (alternateForms.length) {
                alternateForms.forEach((form) => {
                    if (form && form.verb && (form.verb.startsWith("tamu") || form.verb.startsWith("temu"))) {
                        const formMarker = form.verb.slice(0, 2);
                        form.verb = `mu${formMarker}${form.verb.slice(4)}`;
                    }
                });
            }
        }
    }
    objectPrefix = normalizeValenceMarkerOrder(objectPrefix);
    return {
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        alternateForms,
        patientivoBlankPossessiveW,
    };
}

function getPrefixInputs({ override, subjectPrefixInput, subjectSuffixInput, verbInput }) {
    return {
        subjectPrefix: override?.subjectPrefix ?? subjectPrefixInput.value,
        objectPrefix: override?.objectPrefix ?? getCurrentObjectPrefix(),
        verb: override?.verb ?? verbInput.value,
        subjectSuffix: override?.subjectSuffix ?? subjectSuffixInput.value,
        possessivePrefix: override?.possessivePrefix ?? "",
    };
}

function shouldDropBoundObjectPrefix(parsedVerb) {
    if (!parsedVerb || !parsedVerb.hasBoundMarker) {
        return false;
    }
    if ((parsedVerb.derivationValencyDelta || 0) > 0
        || parsedVerb.derivationType === DERIVATION_TYPE.causative
        || parsedVerb.derivationType === DERIVATION_TYPE.applicative) {
        return false;
    }
    const boundPrefixes = Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes : [];
    if (!boundPrefixes.length) {
        return false;
    }
    return boundPrefixes.some((prefix) => (
        SPECIFIC_VALENCE_PREFIX_SET.has(prefix)
        || OBJECT_MARKERS.has(prefix)
        || FUSION_PREFIXES.has(prefix)
    ));
}

function applyBoundMarkerPrefixOverrides(parsedVerb, objectPrefix, baseObjectPrefix) {
    if (shouldDropBoundObjectPrefix(parsedVerb)) {
        return { objectPrefix: "", baseObjectPrefix: "" };
    }
    return { objectPrefix, baseObjectPrefix };
}

function applyObjectAllomorphy({
    verb,
    analysisVerb,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    indirectObjectMarker,
    isTaFusion,
    isPassiveImpersonalMode,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    hasSlashMarker = false,
    directionalPrefix = "",
}) {
    const allomorphyObjectPrefix = !isPassiveImpersonalMode
        && isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)
        ? "mu"
        : objectPrefix;
    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix: allomorphyObjectPrefix,
        indirectObjectMarker,
        isTaFusion,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        hasSlashMarker,
        directionalPrefix,
    });
    return {
        verb: nonspecificAllomorphy.verb,
        analysisVerb: nonspecificAllomorphy.analysisVerb,
        morphologyObjectPrefix: nonspecificAllomorphy.objectPrefix || allomorphyObjectPrefix,
    };
}

function applyNonactiveDerivation({
    isNonactive,
    verb,
    analysisVerb,
    objectPrefix,
    parsedVerb,
    directionalPrefix,
    derivationType,
    causativeAllStems,
    isYawi,
    suppletiveStemSet,
}) {
    if (!isNonactive) {
        return {
            verb,
            analysisVerb,
            isYawi,
            nonactiveAllStems: null,
            // Keep override keys stable so callers can reliably null-check.
            nonactiveObjectPrefixOverride: null,
            nonactiveIndirectMarkerOverride: null,
            suppletiveStemSet,
        };
    }
    suppletiveStemSet = null;
    const nonactiveIsTransitive = isNonactiveTransitiveVerb(objectPrefix, parsedVerb);
    const nonactiveSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    let nonactiveBaseVerb = nonactiveSource.baseVerb;
    if (
        parsedVerb?.hasBoundMarker
        && nonactiveSource.prefix
        && nonactiveBaseVerb
        && nonactiveBaseVerb.startsWith(nonactiveSource.prefix)
    ) {
        nonactiveBaseVerb = nonactiveBaseVerb.slice(nonactiveSource.prefix.length);
    }
    const shouldUseDerivedRuleBase =
        derivationType === DERIVATION_TYPE.causative || derivationType === DERIVATION_TYPE.applicative;
    const nonactiveRuleBase = shouldUseDerivedRuleBase
        ? normalizeRuleBase(nonactiveBaseVerb || "")
        : getNonactiveRuleBase(nonactiveBaseVerb, parsedVerb);
    let selection = resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
        isTransitive: nonactiveIsTransitive,
        isYawi,
        forceAll: shouldForceAllNonactiveOptions(),
        ruleBase: nonactiveRuleBase,
        rootPlusYaBase: parsedVerb.rootPlusYaBase,
    });
    let resolvedDirectionalPrefix = directionalPrefix;
    let selectionHasPrefixedStems = false;
    let syncedAllStems = null;
    let syncedSelectedStems = null;
    let nonactiveObjectPrefixOverride = null;
    let nonactiveIndirectMarkerOverride = null;
    if (
        derivationType === DERIVATION_TYPE.causative
        && BASIC_DATA_CANONICAL_MAP.size
        && Array.isArray(causativeAllStems)
        && causativeAllStems.length
    ) {
        const selectionByStem = new Map();
        const unique = (items) => Array.from(new Set(items.filter(Boolean)));
        causativeAllStems.forEach((stem) => {
            const key = String(stem || "").toLowerCase();
            if (!key) {
                return;
            }
            const info = BASIC_DATA_CANONICAL_MAP.get(key);
            if (!info) {
                return;
            }
            const parsedMatch = info.transitiveParsed || info.intransitiveParsed;
            if (!parsedMatch) {
                return;
            }
            const matchSource = getNonactiveDerivationSource(
                parsedMatch,
                parsedMatch.verb,
                parsedMatch.analysisVerb
            );
            const matchRuleBase = getNonactiveRuleBase(matchSource.baseVerb, parsedMatch);
            const matchIsTransitive = isNonactiveTransitiveVerb(objectPrefix, parsedMatch);
            const matchSelection = resolveNonactiveStemSelection(matchSource.baseVerb, matchSource.baseVerb, {
                isTransitive: matchIsTransitive,
                isYawi: parsedMatch.isYawi,
                forceAll: shouldForceAllNonactiveOptions(),
                ruleBase: matchRuleBase,
                rootPlusYaBase: parsedMatch.rootPlusYaBase,
            });
            const matchSummary = getVerbValencySummary(parsedMatch);
            const withPrefix = (value) => (matchSource.prefix ? `${matchSource.prefix}${value}` : value);
            selectionByStem.set(key, {
                selectedStem: matchSelection.selectedStem ? withPrefix(matchSelection.selectedStem) : null,
                selectedStems: matchSelection.selectedStems.map(withPrefix),
                allStems: matchSelection.allStems.map(withPrefix),
                selectedSuffix: matchSelection.selectedSuffix,
                directionalPrefix: parsedMatch.directionalPrefix || "",
                nonactiveObjectSlots: matchSummary.nonactiveObjectSlots,
            });
        });
        const currentKey = String(verb || "").toLowerCase();
        const matchedSelection = selectionByStem.get(currentKey) || null;
        if (matchedSelection) {
            selection = {
                selectedStem: matchedSelection.selectedStem,
                selectedStems: matchedSelection.selectedStems,
                allStems: matchedSelection.allStems,
                selectedSuffix: matchedSelection.selectedSuffix,
            };
            selectionHasPrefixedStems = true;
            resolvedDirectionalPrefix = matchedSelection.directionalPrefix || resolvedDirectionalPrefix;
            if (Number.isFinite(matchedSelection.nonactiveObjectSlots) && matchedSelection.nonactiveObjectSlots <= 0) {
                nonactiveObjectPrefixOverride = "";
                nonactiveIndirectMarkerOverride = "";
            }
            const mergedAll = [];
            const mergedSelected = [];
            selectionByStem.forEach((entry) => {
                mergedAll.push(...entry.allStems);
                mergedSelected.push(...entry.selectedStems);
            });
            syncedAllStems = unique(mergedAll);
            syncedSelectedStems = unique(mergedSelected);
        }
    }
    const applyPrefix = (stem) => (
        selectionHasPrefixedStems
            ? stem
            : (nonactiveSource.prefix ? `${nonactiveSource.prefix}${stem}` : stem)
    );
    verb = selection.selectedStem ? applyPrefix(selection.selectedStem) : "";
    analysisVerb = verb;
    let nonactiveAllStems = null;
    const selectedStems = Array.isArray(selection.selectedStems)
        ? selection.selectedStems.filter(Boolean)
        : [];
    if (!selection.selectedSuffix && selection.allStems.length > 1) {
        if (selectionHasPrefixedStems) {
            const stems = syncedAllStems && syncedAllStems.length ? syncedAllStems : selection.allStems;
            nonactiveAllStems = stems;
        } else {
            nonactiveAllStems = selection.allStems.map((stem) => applyPrefix(stem));
        }
    } else if (selection.selectedSuffix && selectedStems.length > 1) {
        if (selectionHasPrefixedStems) {
            const stems = syncedSelectedStems && syncedSelectedStems.length ? syncedSelectedStems : selectedStems;
            nonactiveAllStems = stems;
        } else {
            nonactiveAllStems = selectedStems.map((stem) => applyPrefix(stem));
        }
    }
    if (resolvedDirectionalPrefix && verb.startsWith(resolvedDirectionalPrefix)) {
        analysisVerb = verb.slice(resolvedDirectionalPrefix.length);
    }
    return {
        verb,
        analysisVerb,
        isYawi: false,
        nonactiveAllStems,
        suppletiveStemSet,
        nonactiveObjectPrefixOverride,
        nonactiveIndirectMarkerOverride,
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
    preserveSubjectForPassive,
    allowPassiveObject,
    morphologyObjectPrefix,
    hasPromotableObject,
}) {
    if (!isPassiveImpersonalMode) {
        return {
            verb,
            analysisVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            preserveSubjectForPassive,
            morphologyObjectPrefix,
        };
    }
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
        objectPrefix = "";
        indirectObjectMarker = "";
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
    } else if (targetValency === 1) {
        objectPrefix = "";
        indirectObjectMarker = "";
        preserveSubjectForPassive = true;
        valencyAdjustedPrefix = true;
    } else {
        preserveSubjectForPassive = true;
        if (fusionPrefixes.length && !allowPassiveObject) {
            objectPrefix = "";
            indirectObjectMarker = "";
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
        preserveSubjectForPassive,
        morphologyObjectPrefix,
    };
}

function resetSubjectForNounTenses(tense, override, subjectPrefix, subjectSuffix) {
    if (tense === "sustantivo-verbal" || tense === "agentivo" || tense === "patientivo") {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectPrefix")) {
            subjectPrefix = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectSuffix")) {
            subjectSuffix = "";
        }
    }
    return { subjectPrefix, subjectSuffix };
}

function applyPassiveImpersonalOverrides({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    analysisVerb,
    preserveSubjectForPassive,
    allowPassiveObject,
}) {
    const updated = applyPassiveImpersonal({
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        analysisVerb,
        preserveSubject: preserveSubjectForPassive,
        allowObjectPrefix: allowPassiveObject,
    });
    return {
        subjectPrefix: updated.subjectPrefix,
        subjectSuffix: updated.subjectSuffix,
        objectPrefix: updated.objectPrefix,
        morphologyObjectPrefix: updated.objectPrefix,
    };
}

function applyReflexiveAutoSwitch({
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    isPassiveImpersonal,
    clearError,
}) {
    let isReflexive = objectPrefix === "mu";
    if (!isPassiveImpersonal) {
        if (isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)) {
            objectPrefix = "mu";
            isReflexive = true;
            if (clearError) {
                clearError("object-prefix");
            }
        } else if (objectPrefix === "mu") {
            isReflexive = true;
        }
    }
    return { objectPrefix, isReflexive };
}

function generateWord(options = {}) {
    if (options instanceof Event) {
        options = {};
    }
    const silent = options.silent === true;
    const skipValidation = options.skipValidation === true;
    const renderOnlyTense = options.renderOnlyTense || null;
    const override = options.override || null;
    const resolvedTenseMode = Object.values(TENSE_MODE).includes(override?.tenseMode)
        ? override.tenseMode
        : getActiveTenseMode();
    const resolvedDerivationMode = Object.values(DERIVATION_MODE).includes(override?.derivationMode)
        ? override.derivationMode
        : getActiveDerivationMode();
    const resolvedDerivationType = Object.values(DERIVATION_TYPE).includes(override?.derivationType)
        ? override.derivationType
        : getActiveDerivationType();
    const derivationValencyDelta = getDerivationValencyDelta(resolvedDerivationType);
    const resolvedVoiceMode = Object.values(VOICE_MODE).includes(override?.voiceMode)
        ? override.voiceMode
        : getActiveVoiceMode();
    const preservePassiveSubject = override?.preservePassiveSubject === true;
    const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
    const subjectPrefixInput = document.getElementById("subject-prefix");
    const subjectSuffixInput = document.getElementById("subject-suffix");
    const verbInput = document.getElementById("verb");
    // Get the selected values of the prefixes and suffixes
    const prefixInputs = getPrefixInputs({
        override,
        subjectPrefixInput,
        subjectSuffixInput,
        verbInput,
    });
    let subjectPrefix = prefixInputs.subjectPrefix;
    let objectPrefix = prefixInputs.objectPrefix;
    let verb = prefixInputs.verb;
    let subjectSuffix = prefixInputs.subjectSuffix;
    const possessivePrefix = prefixInputs.possessivePrefix;
    const patientivoOwnership = override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP;
    const patientivoSource = override?.patientivoSource ?? "nonactive";
    let searchQuery = "";
    let hasSearchQuery = false;
    let hasSearchSeparator = false;
    if (!override?.verb && verbInput) {
        const searchParts = getSearchParts(verb);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = rememberNonSearchValue(searchParts);
        if (baseValue) {
            verb = searchParts.base;
        } else if (hasSearchQuery && VERB_INPUT_STATE.lastNonSearchValue) {
            verb = VERB_INPUT_STATE.lastNonSearchValue;
        }
        if (hasSearchQuery && !verb) {
            if (!silent) {
                updateVerbRuleHint({ verb: "" });
                updateVerbDisambiguation("");
                maybeAutoScrollToConjugationRow(verbInput.value, { allowSwitch: false });
            }
            return null;
        }
    }
    let tense = override?.tense;
    if (!tense) {
        tense = getActiveConjugationGroup() === CONJUGATION_GROUPS.universal
            ? getSelectedPretUniversalTab()
            : getSelectedTenseTab();
    }
    let baseObjectPrefix = objectPrefix;
    let isReflexive = objectPrefix === "mu";
    const rerenderOutputs = () =>
        renderAllOutputs({
            verb: getVerbInputMeta().displayVerb,
            objectPrefix: baseObjectPrefix,
            tense,
            onlyTense: renderOnlyTense,
        });

    const clearError = (id) => {
        if (!silent) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove("error");
            }
            if (id === "verb") {
                const verbInput = document.getElementById("verb");
                if (verbInput) {
                    verbInput.classList.remove("error");
                }
            }
        }
    };
    const setError = (id) => {
        if (!silent) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add("error");
            }
            if (id === "verb") {
                const verbInput = document.getElementById("verb");
                if (verbInput) {
                    verbInput.classList.add("error");
                }
            }
        }
    };
    const isImperativeSecondPerson = tense === "imperativo"
        && getSubjectPersonInfo(subjectPrefix, subjectSuffix)?.person === 2;
    let isYawiImperativeSingular = false;
    let shouldAddYuVariant = false;
    const yawiPresentLong = getSuppletiveYawiCanonical();
    const yawiPresentShort = getSuppletiveYawiShort();
    const yawiHabitual = getSuppletiveYawiImperfective();
    const yawiYuVariant = getSuppletiveYawiYuVariant();
    const buildWord = (overrideVerb = verb, overrideSuffix = subjectSuffix) => {
        if (tense === "sustantivo-verbal" || tense === "agentivo" || tense === "patientivo") {
            const core = buildPrefixedChain({
                subjectPrefix,
                possessivePrefix,
                objectPrefix,
                verb: overrideVerb,
            });
            return `${core}${overrideSuffix}`;
        }
        const core = buildPrefixedChain({
            subjectPrefix,
            objectPrefix,
            verb: overrideVerb,
        });
        if (tense === "imperativo") {
            if (isYawiImperativeSingular) {
                return `ma ${core}${overrideSuffix}`;
            }
            const imperativeCore = `${core}${overrideSuffix}`;
            return isImperativeSecondPerson ? imperativeCore : `ma ${imperativeCore}`;
        }
        return `${core}${overrideSuffix}`;
    };
    const buildWordFromParts = ({
        subjectPrefix: subjectPrefixValue,
        objectPrefix: objectPrefixValue,
        subjectSuffix: subjectSuffixValue,
        verb: verbValue,
        isYawiImperative = false,
    }) => {
        if (tense === "sustantivo-verbal" || tense === "agentivo" || tense === "patientivo") {
            const core = buildPrefixedChain({
                subjectPrefix: subjectPrefixValue,
                possessivePrefix,
                objectPrefix: objectPrefixValue,
                verb: verbValue,
            });
            return `${core}${subjectSuffixValue}`;
        }
        const core = buildPrefixedChain({
            subjectPrefix: subjectPrefixValue,
            objectPrefix: objectPrefixValue,
            verb: verbValue,
        });
        if (tense === "imperativo") {
            if (isYawiImperative) {
                return `ma ${core}${subjectSuffixValue}`;
            }
            const isSecondPerson = getSubjectPersonInfo(subjectPrefixValue, subjectSuffixValue)?.person === 2;
            const imperativeCore = `${core}${subjectSuffixValue}`;
            return isSecondPerson ? imperativeCore : `ma ${imperativeCore}`;
        }
        return `${core}${subjectSuffixValue}`;
    };
    const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
            return null;
        }
        errorTargets.forEach((target) => setError(target));
        if (!silent) {
            updateVerbRuleHint({ verb: "" });
            updateVerbDisambiguation("");
            rerenderOutputs();
        }
        return { error: message };
    };

    // Remove error class from subject prefix, object prefix, and subject suffix
    clearError("subject-prefix");
    clearError("object-prefix");
    clearError("subject-suffix");

    // Only allow lowercase letters and separators ("-" marks transitivity, "/" splits parts, "?" starts search).
    const rawVerb = String(verb || "");
    const invalidCharacters = getInvalidVerbCharacters(rawVerb);
    const invalidLetters = getInvalidVerbLetters(rawVerb);
    const invalidStructure = getInvalidVerbStructure(rawVerb);
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidStructure
            ? "El verbo contiene separadores invalidos."
            : (invalidList
                ? `El verbo contiene letras invalidas: ${invalidList}`
                : "El verbo contiene letras invalidas.");
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    }
    const parsedVerb = parseVerbInput(rawVerb);
    parsedVerb.derivationType = resolvedDerivationType;
    parsedVerb.derivationValencyDelta = derivationValencyDelta;
    verb = parsedVerb.verb;
    const renderVerb = parsedVerb.displayVerb;
    let analysisVerb = parsedVerb.analysisVerb;
    const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
    let indirectObjectMarker = parsedVerb.indirectObjectMarker;
    if (override && Object.prototype.hasOwnProperty.call(override, "indirectObjectMarker")) {
        indirectObjectMarker = override.indirectObjectMarker || "";
    }
    ({ objectPrefix, baseObjectPrefix } = applyBoundMarkerPrefixOverrides(
        parsedVerb,
        objectPrefix,
        baseObjectPrefix
    ));
    if (parsedVerb.hasImpersonalTaPrefix) {
        objectPrefix = "";
        baseObjectPrefix = "";
        indirectObjectMarker = "";
    }
    if (
        (resolvedDerivationType === DERIVATION_TYPE.applicative
            || resolvedDerivationType === DERIVATION_TYPE.causative)
        && indirectObjectMarker
    ) {
        const isSpecific = (prefix) => SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k" || prefix === "mu";
        const isNonspecific = (prefix) => NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
        const objectIsNonspecific = isNonspecific(objectPrefix);
        const indirectIsSpecific = isSpecific(indirectObjectMarker);
        const shouldSwap = !objectPrefix || (objectIsNonspecific && indirectIsSpecific);
        if (shouldSwap) {
            const rightmostObject = indirectObjectMarker;
            indirectObjectMarker = objectPrefix || "";
            objectPrefix = rightmostObject;
            baseObjectPrefix = rightmostObject;
        }
    }
    ({
        objectPrefix,
        indirectObjectMarker,
    } = resolveValencePositionPrefixes({
        objectPrefix,
        indirectObjectMarker,
        derivationType: resolvedDerivationType,
    }));
    baseObjectPrefix = objectPrefix;
    const sourceValency = getActiveVerbValency(parsedVerb);
    const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
    const validationVerb = verb;
    let isYawi = parsedVerb.isYawi;
    const isWeya = parsedVerb.isWeya;
    isReflexive = objectPrefix === "mu";
    const directionalPrefix = parsedVerb.directionalPrefix;
    const suppletivePath = getSuppletiveStemPath(parsedVerb);
    let suppletiveStemSet = suppletivePath?.stemSet || null;
    const isYawiSuppletive = suppletivePath?.id === "yawi";
    const yawiPrefix = isYawiSuppletive
        && analysisVerb
        && verb.endsWith(analysisVerb)
        ? verb.slice(0, -analysisVerb.length)
        : "";
    const applyYawiPrefix = (form) => (yawiPrefix ? `${yawiPrefix}${form}` : form);
    if (suppletiveStemSet && isYawiSuppletive && yawiPrefix) {
        const prefixedVariants = new Map();
        suppletiveStemSet.variantsByClass.forEach((variants, classKey) => {
            prefixedVariants.set(
                classKey,
                variants.map((variant) => ({ ...variant, base: applyYawiPrefix(variant.base) }))
            );
        });
        suppletiveStemSet = {
            ...suppletiveStemSet,
            imperfective: {
                verb: applyYawiPrefix(suppletiveStemSet.imperfective?.verb || ""),
                analysisVerb: suppletiveStemSet.imperfective?.analysisVerb || "",
            },
            variantsByClass: prefixedVariants,
        };
    }
    const suppletiveTenseSuffixes = suppletivePath?.tenseSuffixOverrides || null;
    const suppletiveVerbOverrides = suppletivePath?.verbOverrides || null;
    const suppletiveNonactiveTenses = suppletivePath?.nonactiveTenses || null;
    const yawiPresentLongPrefixed = applyYawiPrefix(yawiPresentLong);
    const yawiPresentShortPrefixed = applyYawiPrefix(yawiPresentShort);
    const yawiHabitualPrefixed = applyYawiPrefix(yawiHabitual);
    const yawiYuVariantPrefixed = applyYawiPrefix(yawiYuVariant);
    if (suppletiveStemSet && !isPerfectiveTense(tense)) {
        verb = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
    }
    const isPassiveImpersonalMode =
        resolvedTenseMode === TENSE_MODE.verbo && resolvedVoiceMode === VOICE_MODE.passive;
    const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
    let preserveSubjectForPassive = preservePassiveSubject;
    const valencySummary = getVerbValencySummary(parsedVerb);
    const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
    const hasPromotableObject = PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix)
        || fusionPrefixes.some((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix))
        || hasOpenObjectSlot;
    const hasSubjectValent = !isPassiveImpersonalMode || (targetValency > 0 && hasPromotableObject);
    const allomorphyResult = applyObjectAllomorphy({
        verb,
        analysisVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        isTaFusion: parsedVerb.isTaFusion,
        isPassiveImpersonalMode,
        hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
        hasNonspecificValence: parsedVerb.hasNonspecificValence
            || parsedVerb.hasNonactiveNonspecificValence,
        hasSlashMarker: parsedVerb.hasSlashMarker,
        directionalPrefix: parsedVerb.directionalPrefix,
    });
    verb = allomorphyResult.verb;
    analysisVerb = allomorphyResult.analysisVerb;
    let morphologyObjectPrefix = allomorphyResult.morphologyObjectPrefix;
    if (!silent) {
        if (hasSearchSeparator) {
            verbInput.value = `${parsedVerb.displayVerb}?${searchQuery}`;
            verbInput.dataset.prevValue = verbInput.value;
        } else {
            verbInput.value = parsedVerb.displayVerb;
            verbInput.dataset.prevValue = parsedVerb.displayVerb;
        }
        renderVerbMirror();
    }

    const isCausative = resolvedDerivationType === DERIVATION_TYPE.causative;
    const isApplicative = resolvedDerivationType === DERIVATION_TYPE.applicative;
    const isNonactive =
        resolvedTenseMode === TENSE_MODE.verbo && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    if (isNonactive && PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        tense = getSelectedTenseTab();
    }
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(parsedVerb, {
        isNonactive,
        derivationType: resolvedDerivationType,
    });
    const causativeDerivation = applyCausativeDerivation({
        isCausative,
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        isYawi,
        suppletiveStemSet,
    });
    verb = causativeDerivation.verb;
    analysisVerb = causativeDerivation.analysisVerb;
    isYawi = causativeDerivation.isYawi;
    let causativeAllStems = causativeDerivation.causativeAllStems;
    suppletiveStemSet = causativeDerivation.suppletiveStemSet;
    if (isCausative && causativeDerivation.noCausativeStem) {
        if (!silent) {
            renderAllOutputs({
                verb: renderVerb,
                objectPrefix: baseObjectPrefix,
                tense,
                onlyTense: renderOnlyTense,
            });
        }
        return { result: "—", isReflexive };
    }
    const applicativeDerivation = applyApplicativeDerivation({
        isApplicative,
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        isYawi,
        suppletiveStemSet,
    });
    verb = applicativeDerivation.verb;
    analysisVerb = applicativeDerivation.analysisVerb;
    isYawi = applicativeDerivation.isYawi;
    let applicativeAllStems = applicativeDerivation.applicativeAllStems;
    suppletiveStemSet = applicativeDerivation.suppletiveStemSet;
    if (isApplicative && applicativeDerivation.noApplicativeStem) {
        if (!silent) {
            renderAllOutputs({
                verb: renderVerb,
                objectPrefix: baseObjectPrefix,
                tense,
                onlyTense: renderOnlyTense,
            });
        }
        return { result: "—", isReflexive };
    }
    const nonactiveDerivation = applyNonactiveDerivation({
        isNonactive,
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        derivationType: resolvedDerivationType,
        causativeAllStems,
        isYawi,
        suppletiveStemSet,
    });
    verb = nonactiveDerivation.verb;
    analysisVerb = nonactiveDerivation.analysisVerb;
    isYawi = nonactiveDerivation.isYawi;
    let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
    suppletiveStemSet = nonactiveDerivation.suppletiveStemSet;
    if (nonactiveDerivation.nonactiveObjectPrefixOverride != null) {
        objectPrefix = nonactiveDerivation.nonactiveObjectPrefixOverride;
        morphologyObjectPrefix = nonactiveDerivation.nonactiveObjectPrefixOverride;
        baseObjectPrefix = nonactiveDerivation.nonactiveObjectPrefixOverride;
        if (nonactiveDerivation.nonactiveIndirectMarkerOverride != null) {
            indirectObjectMarker = nonactiveDerivation.nonactiveIndirectMarkerOverride;
        }
        isReflexive = objectPrefix === "mu";
    }
    const passiveValencyAdjustments = applyPassiveImpersonalValencyAdjustments({
        isPassiveImpersonalMode,
        verb,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObjectPrefix,
        hasPromotableObject,
    });
    verb = passiveValencyAdjustments.verb;
    analysisVerb = passiveValencyAdjustments.analysisVerb;
    subjectPrefix = passiveValencyAdjustments.subjectPrefix;
    subjectSuffix = passiveValencyAdjustments.subjectSuffix;
    objectPrefix = passiveValencyAdjustments.objectPrefix;
    indirectObjectMarker = passiveValencyAdjustments.indirectObjectMarker;
    preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
    morphologyObjectPrefix = passiveValencyAdjustments.morphologyObjectPrefix;
    const shouldApplyDerivedAllomorphy = isCausative || isApplicative;
    if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = applyObjectAllomorphy({
            verb,
            analysisVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix: morphologyObjectPrefix,
            indirectObjectMarker,
            isTaFusion: parsedVerb.isTaFusion,
            isPassiveImpersonalMode,
            hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
            hasNonspecificValence: parsedVerb.hasNonspecificValence
                || parsedVerb.hasNonactiveNonspecificValence,
            hasSlashMarker: parsedVerb.hasSlashMarker,
            directionalPrefix: parsedVerb.directionalPrefix,
        });
        verb = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
    }
    const isWitziNonactive = isNonactive && suppletivePath?.id === "witzi";
    const allowConsonantEnding = (isWitziNonactive && verb === SUPPLETIVE_WITZI_NONACTIVE)
        || SUPPLETIVE_WITZI_FORMS.has(validationVerb);
    if (
        isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletiveNonactiveTenses
        && !suppletiveNonactiveTenses.has(tense)
    ) {
        const error = returnError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) {
            return error;
        }
    }
    if (!isNonactive && suppletiveVerbOverrides && Object.prototype.hasOwnProperty.call(suppletiveVerbOverrides, tense)) {
        const overrideVerb = suppletiveVerbOverrides[tense];
        verb = overrideVerb;
        analysisVerb = overrideVerb;
    }
    if (
        !isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletivePath?.activeTenses
        && !suppletivePath.activeTenses.has(tense)
    ) {
        const error = returnError("Solo pretérito, imperativo, y pasado remoto.", ["verb"]);
        if (error) {
            return error;
        }
    }
    isYawiImperativeSingular = isYawi && tense === "imperativo" && subjectSuffix === "";
    shouldAddYuVariant = isYawi && (tense === "presente" || isYawiImperativeSingular);

    if (validationVerb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    } else {
        clearError("verb");
    }
    if (!VOWEL_RE.test(validationVerb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    } else {
        clearError("verb");
    }
    if (!VOWEL_END_RE.test(validationVerb) && !allowConsonantEnding) {
        const message = "El verbo debe terminar en vocal.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    } else {
        clearError("verb");
    }
    if (isYawi && (tense === "presente" || isYawiImperativeSingular)) {
        if (subjectSuffix === "t" || subjectPrefix === "") {
            verb = yawiPresentLongPrefixed;
        } else {
            verb = yawiPresentShortPrefixed;
        }
    }
    if (isYawi && tense === "presente-habitual") {
        verb = yawiHabitualPrefixed;
    }
    ({ subjectPrefix, subjectSuffix } = resetSubjectForNounTenses(
        tense,
        override,
        subjectPrefix,
        subjectSuffix
    ));
    const isPassiveImpersonal = isPassiveImpersonalMode;
    if (isPassiveImpersonal) {
        const passiveOverrides = applyPassiveImpersonalOverrides({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            analysisVerb,
            preserveSubjectForPassive,
            allowPassiveObject,
        });
        subjectPrefix = passiveOverrides.subjectPrefix;
        subjectSuffix = passiveOverrides.subjectSuffix;
        objectPrefix = passiveOverrides.objectPrefix;
        morphologyObjectPrefix = passiveOverrides.morphologyObjectPrefix;
    }

    // Auto-switch to reflexive when subject/object are the same person and number.
    const allowReflexiveAutoSwitch =
        !indirectObjectMarker || resolvedDerivationType === DERIVATION_TYPE.applicative;
    const reflexiveUpdate = allowReflexiveAutoSwitch
        ? applyReflexiveAutoSwitch({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            isPassiveImpersonal,
            clearError,
        })
        : { objectPrefix, isReflexive: objectPrefix === "mu" };
    objectPrefix = reflexiveUpdate.objectPrefix;
    isReflexive = reflexiveUpdate.isReflexive;
    
    // Check for invalid combinations of subject and object prefixes (verb-only constraint).
    const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
    const isNounTense = isNonanimateNounTense(tense) || tense === "agentivo" || tense === "patientivo";
    if (!skipValidation && !isNounTense && INVALID_COMBINATION_KEYS.has(
        getComboKey(subjectPrefix, objectPrefix, subjectSuffix)
    )) {
        const message = "Combinacion inválida";
        const error = returnError(message, [
            "subject-prefix",
            "object-prefix",
            "subject-suffix",
        ]);
        if (error) {
            return error;
        }
    }
    clearError("object-prefix");

    if (isNounTense) {
        if (isNonanimateNounTense(tense) && !isNonanimateSubject(subjectPrefix, subjectSuffix)) {
            const message = "Solo 3a persona no animada (singular o plural).";
            const error = returnError(message, ["subject-prefix", "subject-suffix"]);
            if (error) {
                return error;
            }
        }
        const isTransitiveVerb = getBaseObjectSlots(parsedVerb) > 0;
        const allowsObjectPrefix = getAvailableObjectSlots(parsedVerb) > 0;
    if (isCalificativoInstrumentivo) {
        if (isTransitiveVerb && allowsObjectPrefix) {
            if (!SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
                const error = returnError("Calificativo transitivo solo con ta/te/mu.", ["object-prefix"]);
                if (error) {
                    return error;
                }
            }
        } else if (objectPrefix !== "") {
            const error = returnError("Calificativo intransitivo va sin prefijo.", ["object-prefix"]);
            if (error) {
                return error;
            }
        }
    } else {
            const transitiveMessage = (() => {
                switch (tense) {
                    case "agentivo":
                        return "Agentivo transitivo solo con ta/te/mu.";
                    case "patientivo":
                        return "Patientivo transitivo solo con ta/te/mu o Ø.";
                    case "instrumentivo":
                        return "Instrumentivo transitivo solo con ta/te/mu o Ø.";
                    default:
                        return "Sustantivo verbal transitivo solo con ta/te/mu o Ø.";
                }
            })();
            const intransitiveMessage = (() => {
                switch (tense) {
                    case "agentivo":
                        return "Agentivo intransitivo va sin prefijo.";
                    case "patientivo":
                        return "Patientivo intransitivo va sin prefijo.";
                    case "instrumentivo":
                        return "Instrumentivo intransitivo va sin prefijo.";
                    default:
                        return "Sustantivo verbal intransitivo va sin prefijo.";
                }
            })();
            const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(parsedVerb, tense);
            if (isTransitiveVerb && allowsObjectPrefix) {
                if (!allowedPrefixes.includes(objectPrefix)) {
                    const error = returnError(transitiveMessage, ["object-prefix"]);
                    if (error) {
                        return error;
                    }
                }
            } else if (objectPrefix !== "") {
                const error = returnError(intransitiveMessage, ["object-prefix"]);
                if (error) {
                    return error;
                }
            }
        }
    }

    if (isWitziNonactive && tense === "preterito" && subjectSuffix === "t") {
        subjectSuffix = "et";
    }
    const skipPretClass = isWitziNonactive && SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);
    const isUnderlyingTransitive = !isNonactive
        ? (isCausative || parsedVerb.isMarkedTransitive || parsedVerb.isTaFusion)
        : Boolean(morphologyObjectPrefix || indirectObjectMarker || parsedVerb.isTaFusion);
    const forceTransitiveBase = parsedVerb.isTaFusion || isUnderlyingTransitive;

    if (!silent) {
        updateVerbRuleHint({
            verb,
            analysisVerb,
            exactBaseVerb: analysisExactVerb,
            objectPrefix: morphologyObjectPrefix,
            forceTransitive: forceTransitiveBase,
            isYawi,
            isWeya,
            hasSlashMarker: parsedVerb.hasSlashMarker,
            hasSuffixSeparator: parsedVerb.hasSuffixSeparator,
            hasLeadingDash: parsedVerb.hasLeadingDash,
            hasBoundMarker: parsedVerb.hasBoundMarker,
            hasCompoundMarker: parsedVerb.hasCompoundMarker,
            hasImpersonalTaPrefix: parsedVerb.hasImpersonalTaPrefix,
            hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
            hasNonspecificValence: parsedVerb.hasNonspecificValence
                || parsedVerb.hasNonactiveNonspecificValence,
            rootPlusYaBase: parsedVerb.rootPlusYaBase,
            rootPlusYaBasePronounceable: parsedVerb.rootPlusYaBasePronounceable,
            derivationType: resolvedDerivationType,
        });
        updateVerbDisambiguation(verbInput ? verbInput.value : renderVerb);
    }

    const baseMorphologyInput = {
        subjectPrefix,
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        analysisExactVerb,
        isYawi,
        isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        suppletiveStemSet,
        suppletiveTenseSuffixes,
        hasSlashMarker: parsedVerb.hasSlashMarker,
        hasSuffixSeparator: parsedVerb.hasSuffixSeparator,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        hasBoundMarker: parsedVerb.hasBoundMarker,
        hasCompoundMarker: parsedVerb.hasCompoundMarker,
        hasImpersonalTaPrefix: parsedVerb.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
        hasNonspecificValence: parsedVerb.hasNonspecificValence
            || parsedVerb.hasNonactiveNonspecificValence,
        isTaFusion: parsedVerb.isTaFusion,
        indirectObjectMarker,
        skipPretClass,
        isUnderlyingTransitive,
        hasSubjectValent,
        boundPrefix: parsedVerb.hasBoundMarker
            ? (parsedVerb.boundPrefixes || []).join("")
            : "",
        patientivoOwnership: override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP,
        patientivoSource,
        rootPlusYaBase: parsedVerb.rootPlusYaBase,
        rootPlusYaBasePronounceable: parsedVerb.rootPlusYaBasePronounceable,
        derivationType: resolvedDerivationType,
    };
    const appliedMorphology = applyMorphologyRules(baseMorphologyInput);
    if (appliedMorphology?.error) {
        return { error: true };
    }
    ({ subjectPrefix, objectPrefix, subjectSuffix, verb } = appliedMorphology);
    const isPatientivoPossessed = tense === "patientivo" && Boolean(possessivePrefix);
    if (isPatientivoPossessed) {
        subjectSuffix = adjustPatientivoPossessiveSuffix(
            subjectSuffix,
            true,
            patientivoOwnership,
            { blankPossessiveW: appliedMorphology.patientivoBlankPossessiveW }
        );
    }
    const alternateForms = (appliedMorphology.alternateForms || []).map((form) => {
        if (!form) {
            return form;
        }
        if (!isPatientivoPossessed) {
            return form;
        }
        return {
            ...form,
            subjectSuffix: adjustPatientivoPossessiveSuffix(
                form.subjectSuffix ?? subjectSuffix,
                true,
                patientivoOwnership,
                { blankPossessiveW: form.blankPossessiveW }
            ),
        };
    });
    const stemProvenance = appliedMorphology.stemProvenance || null;
    // Combine the prefixes, verb, and suffixes into a single word
    let forms = [];
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const collectFormsForStem = (stem) => {
        let stemAnalysis = stem;
        if (directionalPrefix && stem.startsWith(directionalPrefix)) {
            stemAnalysis = stem.slice(directionalPrefix.length);
        }
        if (embeddedPrefix && stemAnalysis.startsWith(embeddedPrefix)) {
            stemAnalysis = stemAnalysis.slice(embeddedPrefix.length);
        }
        let stemVerb = stem;
        let stemAnalysisResolved = stemAnalysis;
        let stemObjectPrefix = baseMorphologyInput.objectPrefix;
        if (shouldApplyDerivedAllomorphy) {
            const derivedAllomorphy = applyObjectAllomorphy({
                verb: stemVerb,
                analysisVerb: stemAnalysisResolved,
                subjectPrefix: baseMorphologyInput.subjectPrefix,
                subjectSuffix: baseMorphologyInput.subjectSuffix,
                objectPrefix: stemObjectPrefix,
                indirectObjectMarker,
                isTaFusion: parsedVerb.isTaFusion,
                isPassiveImpersonalMode,
                hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
                hasNonspecificValence: parsedVerb.hasNonspecificValence
                    || parsedVerb.hasNonactiveNonspecificValence,
                hasSlashMarker: parsedVerb.hasSlashMarker,
                directionalPrefix: parsedVerb.directionalPrefix,
            });
            stemVerb = derivedAllomorphy.verb;
            stemAnalysisResolved = derivedAllomorphy.analysisVerb;
            stemObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
        }
        const applied = applyMorphologyRules({
            ...baseMorphologyInput,
            verb: stemVerb,
            analysisVerb: stemAnalysisResolved,
            analysisExactVerb: stemAnalysisResolved,
            objectPrefix: stemObjectPrefix,
        });
        if (!applied || applied.error) {
            return;
        }
        if (!applied || !applied.verb) {
            return;
        }
        const localSubjectPrefix = applied.subjectPrefix;
        const localObjectPrefix = applied.objectPrefix;
        let localSubjectSuffix = applied.subjectSuffix;
        if (tense === "patientivo" && Boolean(possessivePrefix)) {
            localSubjectSuffix = adjustPatientivoPossessiveSuffix(
                localSubjectSuffix,
                true,
                patientivoOwnership,
                { blankPossessiveW: applied.patientivoBlankPossessiveW }
            );
        }
        const localAlternates = applied.alternateForms || [];
        const isYawiImperative =
            isYawi && tense === "imperativo" && localSubjectSuffix === "";
        const baseText = buildWordFromParts({
            subjectPrefix: localSubjectPrefix,
            objectPrefix: localObjectPrefix,
            subjectSuffix: localSubjectSuffix,
            verb: applied.verb,
            isYawiImperative,
        });
        if (baseText && !forms.includes(baseText)) {
            forms.push(baseText);
        }
        localAlternates.forEach((form) => {
            if (!form || !form.verb) {
                return;
            }
            const altSuffix = (tense === "patientivo" && Boolean(possessivePrefix))
                ? adjustPatientivoPossessiveSuffix(
                    form.subjectSuffix ?? localSubjectSuffix,
                    true,
                    patientivoOwnership,
                    { blankPossessiveW: form.blankPossessiveW }
                )
                : (form.subjectSuffix ?? localSubjectSuffix);
            const altText = buildWordFromParts({
                subjectPrefix: localSubjectPrefix,
                objectPrefix: localObjectPrefix,
                subjectSuffix: altSuffix,
                verb: form.verb,
                isYawiImperative,
            });
            if (altText && !forms.includes(altText)) {
                forms.push(altText);
            }
        });
    };
    if (
        isNonactive
        && Array.isArray(nonactiveAllStems)
        && nonactiveAllStems.length > 1
        && !getSelectedNonactiveSuffix()
    ) {
        nonactiveAllStems.forEach((stem) => collectFormsForStem(stem));
    } else if (
        isCausative
        && !isNonactive
        && Array.isArray(causativeAllStems)
        && causativeAllStems.length > 1
    ) {
        causativeAllStems.forEach((stem) => collectFormsForStem(stem));
    } else if (
        isApplicative
        && !isNonactive
        && Array.isArray(applicativeAllStems)
        && applicativeAllStems.length > 1
    ) {
        applicativeAllStems.forEach((stem) => collectFormsForStem(stem));
    } else {
        const baseText = buildWord();
        forms.push(baseText);
        alternateForms.forEach((form) => {
            if (!form || !form.verb) {
                return;
            }
            const altText = buildWord(form.verb, form.subjectSuffix ?? subjectSuffix);
            if (!forms.includes(altText)) {
                forms.push(altText);
            }
        });
    }
    if (shouldAddYuVariant && (verb === yawiPresentShortPrefixed || verb === yawiPresentLongPrefixed)) {
        const yuText = buildWord(yawiYuVariantPrefixed);
        if (!forms.includes(yuText)) {
            forms.push(yuText);
        }
    }
    const generatedText = forms.join(" / ");

    if (!silent) {
        renderAllOutputs({
            verb: renderVerb,
            objectPrefix: baseObjectPrefix,
            tense,
            onlyTense: renderOnlyTense,
        });
    }

    return { result: generatedText, isReflexive, stemProvenance };
}

// === Output Rendering ===
function renderAllOutputs({ verb, objectPrefix, tense, onlyTense = null }) {
    renderActiveConjugations({ verb, objectPrefix, onlyTense, tense });
}

function updateTensePanelDescription() {
    const panel = document.getElementById("tense-description");
    if (!panel) {
        return;
    }
    const entries = [];
    const tenseMode = getActiveTenseMode();
    const selectedTense = getSelectedTenseTab();
    const isNawat = Boolean(document.getElementById("language")?.checked);
    if (tenseMode === TENSE_MODE.verbo) {
        const isNonactive = getCombinedMode() === COMBINED_MODE.nonactive;
        if (isNonactive) {
            const suffix = getSelectedNonactiveSuffix();
            if (suffix) {
                const nonactivePrefix = getLocalizedLabel(NONACTIVE_PREFIX_LABEL, isNawat, "no activo");
                entries.push({
                    label: `${nonactivePrefix} ${getLocalizedLabel(NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix)}`,
                    description: getLocalizedDescription(NONACTIVE_SUFFIX_DESCRIPTIONS[suffix], isNawat),
                });
            }
        }
        const activeGroup = getActiveConjugationGroup();
        if (activeGroup === CONJUGATION_GROUPS.universal) {
            const selected = getSelectedPretUniversalTab();
            const classDetail = getPretUniversalClassDetail(selected);
            entries.push({
                label: classDetail
                    ? getLocalizedLabel(classDetail.label, isNawat, selected)
                    : selected,
                description: classDetail
                    ? getLocalizedDescription(classDetail.description, isNawat)
                    : "",
            });
        } else {
            entries.push({
                label: getLocalizedLabel(TENSE_LABELS[selectedTense], isNawat, selectedTense),
                description: getLocalizedDescription(TENSE_DESCRIPTIONS[selectedTense], isNawat),
            });
            if (PRETERITO_CLASS_TENSES.has(selectedTense) && CLASS_FILTER_STATE.activeClass) {
                const classDetail = PRETERITO_CLASS_DETAIL_BY_KEY[CLASS_FILTER_STATE.activeClass];
                if (classDetail) {
                    entries.push({
                        label: getLocalizedLabel(classDetail.label, isNawat, classDetail.label || ""),
                        description: getLocalizedDescription(classDetail.description, isNawat),
                    });
                }
            }
        }
    } else {
        entries.push({
            label: getLocalizedLabel(TENSE_LABELS[selectedTense], isNawat, selectedTense),
            description: getLocalizedDescription(TENSE_DESCRIPTIONS[selectedTense], isNawat),
        });
    }
    panel.innerHTML = "";
    entries.forEach((entry) => {
        if (!entry || !entry.label) {
            return;
        }
        const item = document.createElement("div");
        item.className = "tense-description__item";
        const label = document.createElement("div");
        label.className = "tense-description__label";
        label.textContent = entry.label;
        item.appendChild(label);
        if (entry.description) {
            const text = document.createElement("div");
            text.className = "tense-description__text";
            text.textContent = entry.description;
            item.appendChild(text);
        }
        panel.appendChild(item);
    });
}

function renderActiveConjugations({ verb, objectPrefix, onlyTense = null, tense = null }) {
    updateTensePanelDescription();
    const tenseOverride = onlyTense || tense || null;
    if (getActiveTenseMode() === TENSE_MODE.sustantivo) {
        renderNounConjugations({
            verb,
            containerId: "all-tense-conjugations",
            tenseValue: tenseOverride,
        });
        return;
    }
    if (getActiveConjugationGroup() === CONJUGATION_GROUPS.universal) {
        renderPretUniversalConjugations({
            verb,
            objectPrefix,
            containerId: "all-tense-conjugations",
            tenseValue: tenseOverride,
        });
        return;
    }
    renderAllTenseConjugations({ verb, objectPrefix, onlyTense: tenseOverride });
}

function renderNonactiveConjugationRows({
    list,
    verb,
    tenseValue,
    prefixes,
    isDirectGroup,
    allowObjectToggle,
    allowSubjectToggle,
    objectTogglePrefixes,
    activeObjectPrefix,
    passiveSubjectPrefixes,
    activePassiveSubject,
    forceImpersonal = false,
    isNawat = false,
}) {
    const buildNonactiveRow = (labelText, subText, prefix, subjectOverride = null) => {
        const row = document.createElement("div");
        row.className = "conjugation-row";
        applyConjugationRowClasses(row, prefix);

        const label = document.createElement("div");
        label.className = "conjugation-label";

        const personLabel = document.createElement("div");
        personLabel.className = "person-label";
        personLabel.textContent = labelText;

        const personSub = document.createElement("div");
        personSub.className = "person-sub";
        personSub.textContent = subText;

        label.appendChild(personLabel);
        label.appendChild(personSub);

        const value = document.createElement("div");
        value.className = "conjugation-value";
        const overridePayload = {
            objectPrefix: prefix,
            verb,
            tense: tenseValue,
        };
        if (subjectOverride) {
            overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
            overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
            overridePayload.preservePassiveSubject = true;
        }
        const result = generateWord({
            silent: true,
            skipTransitivityValidation: true,
            allowPassiveObject: isDirectGroup && allowObjectToggle,
            override: overridePayload,
        }) || {};
        const { shouldMask, isError } = getConjugationMaskState({
            result,
            subjectPrefix: subjectOverride?.subjectPrefix || "",
            subjectSuffix: subjectOverride?.subjectSuffix || "",
            objectPrefix: prefix,
            invalidComboSet: INVALID_COMBINATION_KEYS,
        });
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(prefix) !== "reflexive");
        value.classList.remove("conjugation-error", "conjugation-reflexive");
        if (shouldMask || hideReflexive) {
            value.textContent = "—";
            if (isError) {
                value.classList.add("conjugation-error");
            }
        } else {
            value.textContent = formatConjugationDisplay(result.result);
            if (result.isReflexive) {
                value.classList.add("conjugation-reflexive");
            }
        }

        row.appendChild(label);
        row.appendChild(value);
        list.appendChild(row);
    };

    const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
    if (forceImpersonal) {
        buildNonactiveRow(
            getNonactivePersonLabel("", { isIntransitive: true, isNawat }),
            "",
            ""
        );
        return;
    }
    if (isIntransitiveOnly) {
        buildNonactiveRow(
            getNonactivePersonLabel("", { isIntransitive: true, isNawat }),
            "",
            ""
        );
        return;
    }

    const objectSelectionPool = allowObjectToggle
        ? objectTogglePrefixes
        : [""];
    const objectSelections = allowObjectToggle
        ? (activeObjectPrefix === OBJECT_TOGGLE_ALL ? objectSelectionPool : [activeObjectPrefix])
        : [""];
    if (isDirectGroup) {
        const subjectSelectionPool = passiveSubjectPrefixes.filter((prefix) => prefix !== "");
        const subjectSelections = allowSubjectToggle
            ? (activePassiveSubject === OBJECT_TOGGLE_ALL
                ? subjectSelectionPool
                : [activePassiveSubject])
            : subjectSelectionPool;
        subjectSelections.forEach((subjectPrefix) => {
            const subjectOverride = getPassiveSubjectOverride(subjectPrefix);
            if (!subjectOverride) {
                return;
            }
            objectSelections.forEach((objectPrefix) => {
                buildNonactiveRow(
                    getNonactivePersonLabel(subjectPrefix, { isDirectGroup: true, isNawat }),
                    getNonactivePersonSub(subjectPrefix, isNawat),
                    objectPrefix,
                    subjectOverride
                );
            });
        });
        return;
    }
    objectSelections.forEach((prefix) => {
        if (!prefix) {
            return;
        }
        buildNonactiveRow(
            getNonactivePersonLabel(prefix, { isNawat }),
            getObjectLabelShort(prefix, isNawat),
            prefix
        );
    });
}

function buildVerbTenseBlock({
    verb,
    tenseValue,
    objectGroup,
    sectionEl,
    isNonactiveMode,
    isNawat,
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
    derivationType,
    activeValency,
    nonactiveAvailableSlots = 0,
    hasPromotableObject = false,
    embeddedObjectFilled = false,
    fusionMarkers,
    forceDefaultTodosKi = false,
    allowIndirectObjectToggle = false,
    indirectTogglePrefixes = [],
}) {
    const { prefixes } = objectGroup;
    const groupKey = prefixes.join("|") || "intrans";
    const objectStateKey = getObjectStateKey({
        groupKey,
        tenseValue,
        mode: modeKey,
        isNonactive: isNonactiveMode,
    });
    const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
    const isPassiveNonactive = isNonactiveMode && isDirectGroup;
    const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
    const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
    const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
    let passiveSubjectPrefixes = allowSubjectToggle
        ? Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS)
        : [];
    let objectTogglePrefixes = (isNonactiveMode && isDirectGroup && allowObjectToggle)
        ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(OBJECT_MARKERS)]))
        : prefixes;
    const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
    if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
        const subjectMarker = resolvedFusionMarkers[0];
        const objectMarker = resolvedFusionMarkers[1];
        const constrainedSubject = getNonactiveSlotPrefixes(subjectMarker, "subject");
        const constrainedObject = getNonactiveSlotPrefixes(objectMarker, "object");
        if (constrainedSubject) {
            passiveSubjectPrefixes = constrainedSubject;
        }
        if (constrainedObject) {
            objectTogglePrefixes = constrainedObject;
        }
    }
    const objectOptions = getObjectToggleOptions(objectTogglePrefixes);
    const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
    const indirectToggleValues = allowIndirectObjectToggle
        ? Array.from(new Set(indirectTogglePrefixes))
        : [];
    const indirectOptions = allowIndirectObjectToggle
        ? getObjectToggleOptions(indirectToggleValues, {
            includeAll: true,
            labelForPrefix: getNonspecificToggleLabel,
            isNawat,
        })
        : [];
    const indirectOptionMap = new Map(indirectOptions.map((entry) => [entry.id, entry]));
    const passiveSubjectOptions = allowSubjectToggle
        ? getObjectToggleOptions(passiveSubjectPrefixes, { labelForPrefix: getPassiveToggleLabel })
        : [];
    const passiveSubjectOptionMap = new Map(passiveSubjectOptions.map((entry) => [entry.id, entry]));
    const passiveSubjectStateKey = allowSubjectToggle ? `${objectStateKey}|subject` : "";
    const verbKey = verb || "";
    const shouldDefaultTripleValency = !isNonactiveMode && activeValency >= 3 && verbKey;
    const shouldForceDefaults = forceDefaultTodosKi && verbKey;
    if (shouldForceDefaults && objectOptionMap.has("ki")) {
        applyDefaultToggleStateOnce(OBJECT_TOGGLE_STATE, objectStateKey, verbKey, "ki");
    }
    if (shouldDefaultTripleValency && objectOptionMap.has("ki")) {
        applyDefaultToggleStateOnce(OBJECT_TOGGLE_STATE, objectStateKey, verbKey, "ki");
    }
    const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
    const shouldMapAllTenses =
        prefixes.includes("ki");
    const shouldSeedAllTensesDefault = shouldMapAllTenses;
    const resolveTenseBlockPrefix = (prefix) => {
        if (shouldMapAllTenses && prefix === "ki") {
            return OBJECT_TOGGLE_ALL;
        }
        return prefix || "intrans";
    };
    let activeObjectPrefix = isIntransitiveGroup
        ? ""
        : (isNonactiveMode ? OBJECT_TOGGLE_ALL : getPreferredObjectPrefix(prefixes));
    if (shouldSeedAllTensesDefault && !OBJECT_TOGGLE_STATE.has(objectStateKey)) {
        OBJECT_TOGGLE_STATE.set(objectStateKey, "ki");
    }
    const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
    if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
    }
    if (isPassiveNonactive && !allowObjectToggle) {
        activeObjectPrefix = "";
    }
    let activePassiveSubject = allowSubjectToggle ? OBJECT_TOGGLE_ALL : null;
    const storedPassiveSubject = allowSubjectToggle ? OBJECT_TOGGLE_STATE.get(passiveSubjectStateKey) : undefined;
    if (allowSubjectToggle && storedPassiveSubject !== undefined && passiveSubjectOptionMap.has(storedPassiveSubject)) {
        activePassiveSubject = storedPassiveSubject;
    }
    const tenseBlock = document.createElement("div");
    tenseBlock.className = "tense-block";
    tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(activeObjectPrefix)}-${tenseValue}`;

    const transitiveLabel = getVerbBlockLabel("transitive", isNawat, "verbo transitivo");
    const intransitiveLabel = getVerbBlockLabel("intransitive", isNawat, "verbo intransitivo");
    const passiveLabel = getVerbBlockLabel("passive", isNawat, "pasivo");
    const impersonalLabel = getVerbBlockLabel("impersonal", isNawat, "impersonal");
    const labelValency = Number.isFinite(activeValency)
        ? (isNonactiveMode ? Math.max(0, activeValency - 1) : activeValency)
        : null;
    const valencyLabel = Number.isFinite(labelValency) ? `valencia total: ${labelValency}` : "";
    const buildBlockLabel = (prefix) => {
        if (embeddedObjectFilled) {
            const baseLabel = transitiveLabel;
            return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
        }
        if (isIntransitiveGroup) {
            const baseLabel = intransitiveLabel;
            return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
        }
        const baseLabel = transitiveLabel;
        return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
    };
    const tenseTitle = document.createElement("div");
    tenseTitle.className = "tense-block__title";
    const titleLabel = document.createElement("span");
    titleLabel.className = "tense-block__label";
    titleLabel.textContent = buildBlockLabel(activeObjectPrefix);
    tenseTitle.appendChild(titleLabel);
    const titleControls = document.createElement("div");
    titleControls.className = "tense-block__controls";
    const shouldStackControls = !isNonactiveMode || prefixes.length > 1;
    if (shouldStackControls) {
        titleControls.classList.add("tense-block__controls--stacked");
    }
    const resolvedSubjectKeyPrefix = subjectKeyPrefix || modeKey;
    const subjectKey = `${resolvedSubjectKeyPrefix}|${tenseValue}|${groupKey}`;
    if (shouldForceDefaults) {
        if (!isNonactiveMode) {
            applyDefaultToggleStateOnce(SUBJECT_TOGGLE_STATE, subjectKey, verbKey, SUBJECT_TOGGLE_ALL);
        } else if (allowSubjectToggle && passiveSubjectStateKey) {
            applyDefaultToggleStateOnce(
                OBJECT_TOGGLE_STATE,
                passiveSubjectStateKey,
                verbKey,
                OBJECT_TOGGLE_ALL
            );
        }
    }
    if (shouldDefaultTripleValency) {
        applyDefaultToggleStateOnce(SUBJECT_TOGGLE_STATE, subjectKey, verbKey, SUBJECT_TOGGLE_ALL);
    }
    if (shouldSeedAllTensesDefault && !SUBJECT_TOGGLE_STATE.has(subjectKey)) {
        SUBJECT_TOGGLE_STATE.set(subjectKey, SUBJECT_TOGGLE_ALL);
    }
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    let activeSubject = SUBJECT_TOGGLE_STATE.get(subjectKey) ?? SUBJECT_TOGGLE_ALL;
    if (!subjectOptionMap.has(activeSubject)) {
        activeSubject = SUBJECT_TOGGLE_ALL;
        SUBJECT_TOGGLE_STATE.set(subjectKey, activeSubject);
    }

    let toggleButtons = new Map();
    let indirectToggleButtons = new Map();
    let passiveSubjectButtons = new Map();
    let subjectButtons = new Map();
    let setActiveSubject = null;
    let setActiveIndirect = null;
    let setActivePassiveSubject = null;
    if (!isNonactiveMode) {
        const subjectToggleControl = buildToggleControl({
            options: subjectOptions,
            activeId: activeSubject,
            ariaLabel: getToggleLabel("subject", isNawat, "Sujeto"),
            onSelect: (id) => setActiveSubject(id),
        });
        subjectButtons = subjectToggleControl.buttons;
        titleControls.appendChild(subjectToggleControl.toggle);
        setActiveSubject = (subjectId) => {
            activeSubject = subjectId;
            SUBJECT_TOGGLE_STATE.set(subjectKey, subjectId);
            setToggleActiveState(subjectButtons, subjectId);
            renderRows();
        };
    }
    if (allowSubjectToggle) {
        const passiveSubjectToggleControl = buildToggleControl({
            options: passiveSubjectOptions,
            activeId: activePassiveSubject,
            ariaLabel: getToggleLabel("subject", isNawat, "Sujeto"),
            onSelect: (id) => setActivePassiveSubject(id),
        });
        passiveSubjectButtons = passiveSubjectToggleControl.buttons;
        titleControls.appendChild(passiveSubjectToggleControl.toggle);
        setActivePassiveSubject = (subjectId) => {
            activePassiveSubject = subjectId;
            OBJECT_TOGGLE_STATE.set(passiveSubjectStateKey, subjectId);
            setToggleActiveState(passiveSubjectButtons, subjectId);
            renderRows();
        };
    }
    const showObjectToggle = (
        (!isNonactiveMode && prefixes.length > 1)
        || (isNonactiveMode && (!isDirectGroup ? prefixes.length > 1 : allowObjectToggle))
    );
    if (showObjectToggle) {
        const objectToggleControl = buildToggleControl({
            options: objectOptions,
            activeId: activeObjectPrefix,
            ariaLabel: getToggleLabel("object", isNawat, "Objeto"),
            onSelect: (id) => setActivePrefix(id),
        });
        toggleButtons = objectToggleControl.buttons;
        titleControls.appendChild(objectToggleControl.toggle);
    }
    let activeIndirectMarker = allowIndirectObjectToggle ? "" : null;
    const indirectStateKey = allowIndirectObjectToggle ? `${objectStateKey}|indirect` : "";
    if (allowIndirectObjectToggle && indirectOptions.length) {
        if (shouldDefaultTripleValency && indirectOptionMap.has("ki")) {
            applyDefaultToggleStateOnce(OBJECT_TOGGLE_STATE, indirectStateKey, verbKey, "ki");
        }
        const storedIndirect = OBJECT_TOGGLE_STATE.get(indirectStateKey);
        if (storedIndirect !== undefined && indirectOptionMap.has(storedIndirect)) {
            activeIndirectMarker = storedIndirect;
        }
        if (!indirectOptionMap.has(activeIndirectMarker)) {
            activeIndirectMarker = "";
            OBJECT_TOGGLE_STATE.set(indirectStateKey, activeIndirectMarker);
        }
        const indirectToggleControl = buildToggleControl({
            options: indirectOptions,
            activeId: activeIndirectMarker,
            ariaLabel: `${getToggleLabel("object", isNawat, "Objeto")} 2`,
            onSelect: (id) => setActiveIndirect(id),
        });
        indirectToggleButtons = indirectToggleControl.buttons;
        titleControls.appendChild(indirectToggleControl.toggle);
        setActiveIndirect = (markerId) => {
            activeIndirectMarker = markerId;
            OBJECT_TOGGLE_STATE.set(indirectStateKey, markerId);
            setToggleActiveState(indirectToggleButtons, markerId);
            renderRows();
        };
    }
    tenseTitle.appendChild(titleControls);
    tenseBlock.appendChild(tenseTitle);

    const list = document.createElement("div");
    list.className = "conjugation-list";

    const updateSectionCategory = (prefix) => {
        applyObjectSectionCategory(sectionEl, prefix);
    };

    const renderRows = () => {
        list.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = getPlaceholderLabel(
                "conjugations",
                isNawat,
                "Ingresa un verbo para ver las conjugaciones."
            );
            list.appendChild(placeholder);
            return;
        }

        if (isNonactiveMode) {
            renderNonactiveConjugationRows({
                list,
                verb,
                tenseValue,
                prefixes,
                isDirectGroup,
                allowObjectToggle,
                allowSubjectToggle,
                objectTogglePrefixes,
                activeObjectPrefix,
                passiveSubjectPrefixes,
                activePassiveSubject,
                forceImpersonal,
                isNawat,
            });
            return;
        }

        let subjectSelections = getSubjectPersonSelections();
        if (activeSubject !== SUBJECT_TOGGLE_ALL) {
            const activeEntry = subjectOptionMap.get(activeSubject);
            if (activeEntry) {
                subjectSelections = subjectSelections.filter(({ selection }) => (
                    selection.subjectPrefix === activeEntry.subjectPrefix
                    && selection.subjectSuffix === activeEntry.subjectSuffix
                ));
            }
        }
        const objectSelections = activeObjectPrefix === OBJECT_TOGGLE_ALL
            ? prefixes
            : [activeObjectPrefix];
        const indirectSelections = allowIndirectObjectToggle
            ? (activeIndirectMarker === OBJECT_TOGGLE_ALL
                ? indirectToggleValues
                : [activeIndirectMarker])
            : [""];
        objectSelections.forEach((objectPrefix) => {
            subjectSelections.forEach(({ group, selection }) => {
            indirectSelections.forEach((indirectMarker) => {
            const effectiveIndirectMarker = indirectMarker;
            const row = document.createElement("div");
            row.className = "conjugation-row";
            applyConjugationRowClasses(row, objectPrefix);

            const label = document.createElement("div");
            label.className = "conjugation-label";

            const personLabel = document.createElement("div");
            personLabel.className = "person-label";
            personLabel.textContent = getSubjectPersonLabel(group, selection, isNawat);

            const personSub = document.createElement("div");
            personSub.className = "person-sub";

            label.appendChild(personLabel);
            label.appendChild(personSub);

            const value = document.createElement("div");
            value.className = "conjugation-value";

            const result = generateWord({
                silent: true,
                skipTransitivityValidation: true,
                override: {
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix,
                    indirectObjectMarker: effectiveIndirectMarker,
                    verb,
                    tense: tenseValue,
                },
            }) || {};
            const { shouldMask, isError } = getConjugationMaskState({
                result,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
            });
            const basePersonSub = getSubjectSubLabel(selection, {
                isNawat,
                mode: subjectSubMode,
                tenseValue,
            });
            const objectLabel = objectPrefix ? getObjectComboLabel(objectPrefix, isNawat) : "";
            const indirectLabel = indirectMarker ? getObjectComboLabel(indirectMarker, isNawat) : "";
            if (objectLabel || indirectLabel) {
                const roleParts = [];
                if (objectLabel) {
                    const role = derivationType === DERIVATION_TYPE.applicative
                        ? "benefactive"
                        : "direct";
                    roleParts.push(`${getObjectRoleLabel(role, isNawat)} ${objectLabel}`.trim());
                }
                if (indirectLabel) {
                    roleParts.push(`${getObjectRoleLabel("indirect", isNawat)} ${indirectLabel}`.trim());
                }
                personSub.textContent = [basePersonSub, ...roleParts].filter(Boolean).join(" · ");
            } else {
                personSub.textContent = [basePersonSub].filter(Boolean).join(" · ");
            }
            value.classList.remove("conjugation-error", "conjugation-reflexive");
            if (shouldMask) {
                value.textContent = "—";
                if (isError) {
                    value.classList.add("conjugation-error");
                }
            } else {
                value.textContent = formatConjugationDisplay(result.result);
                if (result.isReflexive) {
                    value.classList.add("conjugation-reflexive");
                }
            }

            row.appendChild(label);
            row.appendChild(value);
            list.appendChild(row);
            });
            });
        });
    };

    const resolveSectionPrefix = (prefix) => {
        if (prefix !== OBJECT_TOGGLE_ALL) {
            return prefix;
        }
        if (isNonactiveMode) {
            return prefixes[0] || "";
        }
        return "";
    };

    const setActivePrefix = (prefix) => {
        activeObjectPrefix = prefix;
        OBJECT_TOGGLE_STATE.set(objectStateKey, prefix);
        if (!isNonactiveMode) {
            titleLabel.textContent = buildBlockLabel(prefix);
        }
        tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(prefix)}-${tenseValue}`;
        updateSectionCategory(resolveSectionPrefix(prefix));
        setToggleActiveState(toggleButtons, prefix);
        renderRows();
    };

    tenseBlock.appendChild(list);
    if (isNonactiveMode) {
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        titleLabel.textContent = isIntransitiveOnly
            ? impersonalLabel
            : (isDirectGroup ? passiveLabel : impersonalLabel);
        setActivePrefix(activeObjectPrefix);
        if (setActivePassiveSubject) {
            setActivePassiveSubject(activePassiveSubject);
        }
    } else {
        setActivePrefix(activeObjectPrefix);
        if (setActiveSubject) {
            setActiveSubject(activeSubject);
        }
    }
    return tenseBlock;
}

function renderVerbConjugationBlocks({
    container,
    objectPrefixGroups,
    tenseValue,
    buildBlock,
}) {
    container.innerHTML = "";
    objectPrefixGroups.forEach((objectGroup) => {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const grid = document.createElement("div");
        grid.className = "tense-grid";

        grid.appendChild(buildBlock(tenseValue, objectGroup, objSection));

        objSection.appendChild(grid);
        container.appendChild(objSection);
    });
}

function createObjectSectionGrid(container) {
    container.innerHTML = "";
    const objSection = document.createElement("div");
    objSection.className = "object-section";
    const grid = document.createElement("div");
    grid.className = "tense-grid";
    objSection.appendChild(grid);
    container.appendChild(objSection);
    return { objSection, grid };
}

function buildToggleControl({
    options,
    activeId,
    onSelect,
    ariaLabel,
    getTitle,
    getIsDisabled,
}) {
    const toggle = document.createElement("div");
    toggle.className = "object-toggle object-toggle--stacked";
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", ariaLabel);
    const buttons = new Map();
    options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "object-toggle-button";
        button.textContent = option.label;
        const isActive = option.id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const title = typeof getTitle === "function" ? getTitle(option) : option.title;
        if (title) {
            button.title = title;
        }
        const isDisabled = typeof getIsDisabled === "function" ? getIsDisabled(option) : false;
        if (isDisabled) {
            button.disabled = true;
        }
        button.addEventListener("click", () => onSelect(option.id));
        buttons.set(option.id, button);
        toggle.appendChild(button);
    });
    return { toggle, buttons };
}

function setToggleActiveState(buttons, activeId) {
    buttons.forEach((button, key) => {
        const isActive = key === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function getVerbObjectPrefixGroups(isNonactiveMode, nonactiveConfig) {
    const objectPrefixes = getObjectPrefixesForTransitividad();
    if (isNonactiveMode && nonactiveConfig) {
        return nonactiveConfig.groups;
    }
    if (!isNonactiveMode && getTransitividadSelection() === "transitivo") {
        const orderedPrefixes = ["nech", "metz", "ki", "tech", "metzin", "kin", "ta", "te", "mu"]
            .filter((prefix) => objectPrefixes.includes(prefix));
        return [{ prefixes: orderedPrefixes.length ? orderedPrefixes : objectPrefixes }];
    }
    return buildObjectPrefixGroups(objectPrefixes);
}

function resolveVerbTenseValue({ modeKey, tenseValue }) {
    if (modeKey === "universal") {
        return PRETERITO_UNIVERSAL_ORDER.includes(tenseValue)
            ? tenseValue
            : getSelectedPretUniversalTab();
    }
    return tenseValue || getSelectedTenseTab();
}

function buildVerbTabRenderContext({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return null;
    }
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const resolvedTenseValue = resolveVerbTenseValue({ modeKey, tenseValue });
    const parsedVerb = getParsedVerbForTab(modeKey || "verb", verb);
    const forceDefaultTodosKi = parsedVerb.hasConsecutiveSpecificValences;
    const nonactiveConfig = isNonactiveMode ? getNonactiveObjectPrefixGroups(parsedVerb) : null;
    const valencySummary = getVerbValencySummary(parsedVerb);
    const activeValency = valencySummary.baseValency;
    const nonactiveAvailableSlots = isNonactiveMode ? valencySummary.nonactiveObjectSlots : 0;
    const hasPromotableObject = isNonactiveMode
        ? valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots
        : false;
    const embeddedObjectFilled = parsedVerb.embeddedValenceCount > 0
        && getAvailableObjectSlots(parsedVerb) <= 0;
    const fusionMarkers = parsedVerb.isTaFusion
        ? (parsedVerb.fusionPrefixes || []).filter((prefix) => FUSION_PREFIXES.has(prefix))
        : [];
    const objectPrefixGroups = getVerbObjectPrefixGroups(isNonactiveMode, nonactiveConfig);
    const derivationType = parsedVerb.derivationType || getActiveDerivationType();
    const allowIndirectObjectToggle = !isNonactiveMode
        && (
            (derivationType === DERIVATION_TYPE.causative || derivationType === DERIVATION_TYPE.applicative)
                && getAvailableObjectSlots(parsedVerb) > 1
        );
    const allowIndirectFromDash = parsedVerb.hasDoubleDash === true;
    const allowIndirectObjectToggleFinal = allowIndirectObjectToggle || allowIndirectFromDash;
    const indirectTogglePrefixes = allowIndirectObjectToggleFinal
        ? [...SPECIFIC_VALENCE_PREFIXES, "ta", "te", "mu"]
        : [];
    return {
        container,
        verb,
        resolvedTenseValue,
        isNonactiveMode,
        isNawat,
        modeKey,
        subjectKeyPrefix,
        subjectSubMode,
        derivationType,
        activeValency,
        nonactiveAvailableSlots,
        hasPromotableObject,
        embeddedObjectFilled,
        fusionMarkers,
        objectPrefixGroups,
        forceDefaultTodosKi,
        allowIndirectObjectToggle: allowIndirectObjectToggleFinal,
        indirectTogglePrefixes,
    };
}

function renderVerbConjugationsCore({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
}) {
    const context = buildVerbTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey,
        subjectKeyPrefix,
        subjectSubMode,
    });
    if (!context) {
        return;
    }
    const buildBlock = (blockTenseValue, objectGroup, sectionEl) => buildVerbTenseBlock({
        verb: context.verb,
        tenseValue: blockTenseValue,
        objectGroup,
        sectionEl,
        isNonactiveMode: context.isNonactiveMode,
        isNawat: context.isNawat,
        modeKey: context.modeKey,
        subjectKeyPrefix: context.subjectKeyPrefix,
        subjectSubMode: context.subjectSubMode,
        derivationType: context.derivationType,
        activeValency: context.activeValency,
        nonactiveAvailableSlots: context.nonactiveAvailableSlots,
        hasPromotableObject: context.hasPromotableObject,
        embeddedObjectFilled: context.embeddedObjectFilled,
        fusionMarkers: context.fusionMarkers,
        forceDefaultTodosKi: context.forceDefaultTodosKi,
        allowIndirectObjectToggle: context.allowIndirectObjectToggle,
        indirectTogglePrefixes: context.indirectTogglePrefixes,
    });

    renderVerbConjugationBlocks({
        container: context.container,
        objectPrefixGroups: context.objectPrefixGroups,
        tenseValue: context.resolvedTenseValue,
        buildBlock,
    });
}

function renderPretUniversalConjugations({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    renderVerbConjugationsCore({
        verb,
        containerId,
        tenseValue,
        modeKey: "universal",
        subjectKeyPrefix: "universal",
        subjectSubMode: "verb",
    });
}

function renderLocativoTemporalConjugations({
    verb,
    containerId = "all-tense-conjugations",
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const placeholderText = getPlaceholderLabel(
        "conjugations",
        isNawat,
        "Ingresa un verbo para ver las conjugaciones."
    );
    const allToggleLabel = getToggleLabel("all", isNawat, "todos");
    const impersonalLabel = getVerbBlockLabel("impersonal", isNawat, "impersonal");
    const possessorToggleLabel = getToggleLabel("possessor", isNawat, "Poseedor");
    const objectToggleLabel = getToggleLabel("object", isNawat, "Objeto");
    const possessorObjectToggleLabel = getToggleLabel("possessorObject", isNawat, "Poseedor / Objeto");
    const verbMeta = getParsedVerbForTab("noun", verb);
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const possessorValues = POSSESSIVE_PREFIXES
        .map((entry) => entry.value)
        .filter((value) => value);
    const activeObjectValues = (isTransitiveVerb && allowsObjectPrefix)
        ? Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)
        : [""];
    const activeObjectKey = getObjectStateKey({
        groupKey: "locativo-temporal|active",
        tenseValue: "locativo-temporal",
        mode: "noun",
    });
    const activePossessorKey = "noun|locativo-temporal|active|possessor";
    const combinedKey = getObjectStateKey({
        groupKey: "locativo-temporal|nonactive|combined",
        tenseValue: "locativo-temporal",
        mode: "noun",
        isNonactive: true,
    });

    const { grid } = createObjectSectionGrid(container);

    const buildPossessorOptions = () => {
        const options = [{ id: OBJECT_TOGGLE_ALL, label: allToggleLabel, value: "" }];
        possessorValues.forEach((value) => {
            options.push({ id: value, label: value, value });
        });
        return options;
    };

    const buildCombinedOptions = () => {
        const options = [{ id: OBJECT_TOGGLE_ALL, label: allToggleLabel, value: "" }];
        possessorValues.forEach((value) => {
            options.push({ id: `pos:${value}`, label: value, value, type: "possessor" });
        });
        if (isTransitiveVerb && allowsObjectPrefix) {
            Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES).forEach((value) => {
                options.push({ id: `obj:${value}`, label: value, value, type: "object" });
            });
        }
        return options;
    };

    const buildBlock = ({ mode }) => {
        const isNonactive = mode === COMBINED_MODE.nonactive;
        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${mode}-locativo-temporal`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = document.createElement("span");
        titleLabel.className = "tense-block__label";
        const locativoLabel = getLocalizedLabel(
            TENSE_LABELS["locativo-temporal"],
            isNawat,
            "locativo/temporal"
        );
        const modeLabel = getLocalizedLabel(
            UI_LABELS[isNonactive ? "tense-tabs-mode-nonactive" : "tense-tabs-mode-active"],
            isNawat,
            isNonactive ? "no activo" : "activo"
        );
        titleLabel.textContent = `${locativoLabel} · ${modeLabel}`;
        tenseTitle.appendChild(titleLabel);
        const titleControls = document.createElement("div");
        titleControls.className = "tense-block__controls tense-block__controls--stacked";

        const list = document.createElement("div");
        list.className = "conjugation-list";

        const renderRows = (state) => {
            list.innerHTML = "";
            if (!verb) {
                const placeholder = document.createElement("div");
                placeholder.className = "tense-placeholder";
                placeholder.textContent = placeholderText;
                list.appendChild(placeholder);
                return;
            }
            if (!isTransitiveVerb && state.objectSelections.some((value) => value)) {
                state.objectSelections = [""];
            }
            state.selections.forEach((selection) => {
                const row = document.createElement("div");
                row.className = "conjugation-row";
                applyConjugationRowClasses(row, selection.objectPrefix);

                const label = document.createElement("div");
                label.className = "conjugation-label";
                const personLabel = document.createElement("div");
                personLabel.className = "person-label";
                personLabel.textContent = selection.personLabel || "";
                const personSub = document.createElement("div");
                personSub.className = "person-sub";
                const possessorLabel = selection.possessorPrefix
                    ? getPossessorLabel(selection.possessorPrefix, isNawat)
                    : "";
                const objectLabel = getNounObjectComboLabel(selection.objectPrefix, isNawat);
                personSub.textContent = buildPersonSub({
                    subjectLabel: "",
                    possessorLabel,
                    objectLabel,
                });
                label.appendChild(personLabel);
                label.appendChild(personSub);

                const value = document.createElement("div");
                value.className = "conjugation-value";
                const result = getLocativoTemporalResult({
                    rawVerb: verb,
                    verbMeta,
                    objectPrefix: selection.objectPrefix,
                    possessivePrefix: selection.possessorPrefix,
                    combinedMode: mode,
                }) || {};
                const comboObjectPrefix = selection.possessorPrefix
                    ? (POSSESSIVE_TO_OBJECT_PREFIX[selection.possessorPrefix] || "")
                    : "";
                const { shouldMask, isError } = getConjugationMaskState({
                    result,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: selection.objectPrefix,
                    comboObjectPrefix,
                    enforceInvalidCombo: Boolean(selection.possessorPrefix),
                });
                value.classList.remove("conjugation-error", "conjugation-reflexive");
                if (shouldMask) {
                    value.textContent = "—";
                    if (isError) {
                        value.classList.add("conjugation-error");
                    }
                } else {
                    value.textContent = formatConjugationDisplay(result.result);
                }

                row.appendChild(label);
                row.appendChild(value);
                list.appendChild(row);
            });
        };

        let activePossessor = POSSESSOR_TOGGLE_STATE.get(activePossessorKey);
        if (!possessorValues.includes(activePossessor) && activePossessor !== OBJECT_TOGGLE_ALL) {
            activePossessor = "i";
        }
        let activeObject = OBJECT_TOGGLE_STATE.get(activeObjectKey);
        if (!activeObjectValues.includes(activeObject) && activeObject !== OBJECT_TOGGLE_ALL) {
            activeObject = getPreferredNounObjectPrefix(activeObjectValues);
        }

        let combinedSelection = OBJECT_TOGGLE_STATE.get(combinedKey);
        POSSESSOR_TOGGLE_STATE.set(activePossessorKey, activePossessor);
        OBJECT_TOGGLE_STATE.set(activeObjectKey, activeObject);
        if (combinedSelection === undefined) {
            combinedSelection = isTransitiveVerb ? "obj:ta" : OBJECT_TOGGLE_ALL;
        }
        OBJECT_TOGGLE_STATE.set(combinedKey, combinedSelection);

        if (isNonactive) {
            if (!isTransitiveVerb) {
                const selections = [{
                    possessorPrefix: "",
                    objectPrefix: "",
                    personLabel: impersonalLabel,
                }];
                renderRows({ selections, objectSelections: [""] });
            } else {
                const combinedOptions = buildCombinedOptions();
                const combinedMap = new Map(combinedOptions.map((option) => [option.id, option]));
                if (!combinedMap.has(combinedSelection)) {
                    combinedSelection = combinedMap.has("obj:ta") ? "obj:ta" : OBJECT_TOGGLE_ALL;
                }
                const { toggle, buttons } = buildToggleControl({
                    options: combinedOptions,
                    activeId: combinedSelection,
                    ariaLabel: possessorObjectToggleLabel,
                    onSelect: (id) => {
                        combinedSelection = id;
                        OBJECT_TOGGLE_STATE.set(combinedKey, id);
                        buttons.forEach((button, key) => {
                            const isActive = key === id;
                            button.classList.toggle("is-active", isActive);
                            button.setAttribute("aria-pressed", String(isActive));
                        });
                        updateNonactiveRows();
                    },
                    getTitle: (option) => {
                        if (!option.type) {
                            return "";
                        }
                        return option.type === "possessor" ? possessorToggleLabel : objectToggleLabel;
                    },
                });
                titleControls.appendChild(toggle);

                const updateNonactiveRows = () => {
                    const selectionIds = combinedSelection === OBJECT_TOGGLE_ALL
                        ? combinedOptions.filter((option) => option.id !== OBJECT_TOGGLE_ALL).map((option) => option.id)
                        : [combinedSelection];
                    const selections = selectionIds.map((id) => {
                        const option = combinedMap.get(id);
                        if (!option) {
                            return null;
                        }
                        if (option.type === "object") {
                            return {
                                possessorPrefix: "",
                                objectPrefix: option.value,
                                personLabel: impersonalLabel,
                            };
                        }
                        return {
                            possessorPrefix: option.value,
                            objectPrefix: POSSESSIVE_TO_OBJECT_PREFIX[option.value] || "",
                            personLabel: getPossessorPersonLabel(option.value, isNawat),
                        };
                    }).filter(Boolean);
                    renderRows({ selections, objectSelections: [] });
                };

                updateNonactiveRows();
            }
        } else {
            const possessorOptions = buildPossessorOptions();
            const { toggle: possessorToggle, buttons: possessorButtons } = buildToggleControl({
                options: possessorOptions,
                activeId: activePossessor,
                ariaLabel: possessorToggleLabel,
                onSelect: (id) => {
                    activePossessor = id;
                    POSSESSOR_TOGGLE_STATE.set(activePossessorKey, id);
                    possessorButtons.forEach((button, key) => {
                        const isActive = key === id;
                        button.classList.toggle("is-active", isActive);
                        button.setAttribute("aria-pressed", String(isActive));
                    });
                    updateActiveRows();
                },
            });
            titleControls.appendChild(possessorToggle);

            const showObjectToggle = activeObjectValues.length > 1;
            let objectButtons = new Map();
            if (showObjectToggle) {
                const objectOptions = getObjectToggleOptions(activeObjectValues);
                const { toggle: objectToggle, buttons } = buildToggleControl({
                    options: objectOptions.map((option) => ({
                        id: option.id,
                        label: option.label,
                    })),
                    activeId: activeObject,
                    ariaLabel: objectToggleLabel,
                    onSelect: (id) => {
                        activeObject = id;
                        OBJECT_TOGGLE_STATE.set(activeObjectKey, id);
                        objectButtons.forEach((button, key) => {
                            const isActive = key === id;
                            button.classList.toggle("is-active", isActive);
                            button.setAttribute("aria-pressed", String(isActive));
                        });
                        updateActiveRows();
                    },
                });
                objectButtons = buttons;
                titleControls.appendChild(objectToggle);
            }

            const updateActiveRows = () => {
                const possessorSelections = activePossessor === OBJECT_TOGGLE_ALL
                    ? possessorValues
                    : [activePossessor];
                const objectSelections = activeObject === OBJECT_TOGGLE_ALL
                    ? activeObjectValues
                    : [activeObject];
                const selections = [];
                possessorSelections.forEach((possessorPrefix) => {
                    objectSelections.forEach((objectPrefix) => {
                        selections.push({
                            possessorPrefix,
                            objectPrefix,
                            personLabel: getPossessorPersonLabel(possessorPrefix, isNawat),
                        });
                    });
                });
                renderRows({ selections, objectSelections });
            };

            updateActiveRows();
        }

        tenseTitle.appendChild(titleControls);
        tenseBlock.appendChild(tenseTitle);
        tenseBlock.appendChild(list);
        return tenseBlock;
    };

    grid.appendChild(buildBlock({ mode: COMBINED_MODE.active }));
    grid.appendChild(buildBlock({ mode: COMBINED_MODE.nonactive }));
}

function buildNounTabRenderContext({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return null;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const allowedNounTenses = getTenseOrderForMode(TENSE_MODE.sustantivo);
    const selectedTense = tenseValue || getSelectedTenseTab();
    const resolvedTense = allowedNounTenses.includes(selectedTense)
        ? selectedTense
        : "sustantivo-verbal";
    if (resolvedTense === "locativo-temporal") {
        return { container, isNawat, resolvedTense, isLocativoTemporal: true };
    }
    const isInstrumentivo = resolvedTense === "instrumentivo";
    const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
    const showNonanimateOnly = resolvedTense === "sustantivo-verbal"
        || isInstrumentivo
        || isCalificativoInstrumentivo;
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const possessorKey = `noun|${resolvedTense}|${groupKey}|possessor`;
    const ownershipKey = getPatientivoOwnershipKey(groupKey);
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue: resolvedTense, mode: "noun" });
    const subjectKey = `noun|${resolvedTense}|${groupKey}`;
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    const verbMeta = getParsedVerbForTab("noun", verb);
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const allowsObjectPrefix = getAvailableObjectSlots(verbMeta) > 0;
    const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, resolvedTense);
    let activeObjectPrefix = "";
    if (isTransitiveVerb && allowsObjectPrefix) {
        activeObjectPrefix = getPreferredNounObjectPrefix(allowedPrefixes);
    }
    const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
    if (!allowedPrefixes.includes(activeObjectPrefix)) {
        activeObjectPrefix = allowedPrefixes[0] || "";
    }
    const objectOptions = getObjectToggleOptions(allowedPrefixes, { labelForPrefix: getNonspecificToggleLabel });
    const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
    if (storedObjectPrefix !== undefined && allowedPrefixes.includes(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
    }
    const possessorValues = POSSESSIVE_PREFIXES.map((entry) => entry.value);
    let activePossessor = POSSESSOR_TOGGLE_STATE.get(possessorKey);
    if (activePossessor === undefined) {
        activePossessor = "";
    }
    if (!possessorValues.includes(activePossessor) && activePossessor !== OBJECT_TOGGLE_ALL) {
        activePossessor = "";
    }
    const ownershipOptions = PATIENTIVO_OWNERSHIP_OPTIONS.map((entry) => entry.id);
    let activeOwnership = PATIENTIVO_OWNERSHIP_STATE.get(ownershipKey);
    if (!ownershipOptions.includes(activeOwnership)) {
        activeOwnership = DEFAULT_PATIENTIVO_OWNERSHIP;
    }
    if (resolvedTense !== "patientivo") {
        activeOwnership = DEFAULT_PATIENTIVO_OWNERSHIP;
    }
    const isSubjectOptionAllowed = (entry) => (
        !showNonanimateOnly
        || entry.id === SUBJECT_TOGGLE_ALL
        || isNonanimateSubject(entry.subjectPrefix, entry.subjectSuffix)
    );
    const showSubjectToggle = !showNonanimateOnly;
    const showObjectToggle = allowedPrefixes.length > 1;
    const showPossessorToggle = true;
    if (showObjectToggle) {
        if (storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
            activeObjectPrefix = storedObjectPrefix;
        } else if (allowedPrefixes.includes("ta")) {
            activeObjectPrefix = "ta";
        } else {
            activeObjectPrefix = OBJECT_TOGGLE_ALL;
        }
    }
    const defaultSubjectId = getDefaultNounSubjectId(subjectOptions);
    let activeSubject = SUBJECT_TOGGLE_STATE.get(subjectKey) ?? defaultSubjectId;
    if (!subjectOptionMap.has(activeSubject) || !isSubjectOptionAllowed(subjectOptionMap.get(activeSubject))) {
        activeSubject = defaultSubjectId;
        SUBJECT_TOGGLE_STATE.set(subjectKey, activeSubject);
    }
    return {
        container,
        isNawat,
        resolvedTense,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isLocativoTemporal: false,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        objectOptionMap,
        possessorValues,
        activeOwnership,
        activeObjectPrefix,
        activePossessor,
        activeSubject,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle: resolvedTense === "patientivo",
    };
}

function renderNounConjugations({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    const context = buildNounTabRenderContext({ verb, containerId, tenseValue });
    if (!context) {
        return;
    }
    if (context.isLocativoTemporal) {
        renderLocativoTemporalConjugations({ verb, containerId });
        return;
    }
    const {
        container,
        isNawat,
        resolvedTense,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isLocativoTemporal,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        possessorValues,
        activeOwnership,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle,
    } = context;
    let { activeObjectPrefix, activePossessor, activeSubject } = context;
    let activePatientivoOwnership = activeOwnership;

    const { objSection, grid } = createObjectSectionGrid(container);
    const placeholderText = getPlaceholderLabel(
        "conjugations",
        isNawat,
        "Ingresa un verbo para ver las conjugaciones."
    );
    const allToggleLabel = getToggleLabel("all", isNawat, "todos");
    const subjectToggleLabel = getToggleLabel("subject", isNawat, "Sujeto");
    const possessorToggleLabel = getToggleLabel("possessor", isNawat, "Poseedor");
    const ownershipToggleLabel = getToggleLabel("ownership", isNawat, "Posesion");
    const objectToggleLabel = getToggleLabel("object", isNawat, "Objeto");

    const tenseLabel = getLocalizedLabel(TENSE_LABELS[resolvedTense], isNawat, resolvedTense);
    const blockConfigs = resolvedTense === "patientivo"
        ? [
            {
                id: "patientivo-pasivo",
                label: getVerbBlockLabel("patientivo-pasivo", isNawat, "patientivo · pasivo/impersonal"),
                patientivoSource: "nonactive",
                showControls: true,
            },
            {
                id: "patientivo-perfectivo",
                label: getVerbBlockLabel("patientivo-perfectivo", isNawat, "patientivo · perfectivo"),
                patientivoSource: "perfectivo",
                showControls: false,
            },
            {
                id: "patientivo-imperfectivo",
                label: getVerbBlockLabel("patientivo-imperfectivo", isNawat, "patientivo · imperfectivo"),
                patientivoSource: "imperfectivo",
                showControls: false,
            },
            {
                id: "patientivo-tronco",
                label: getVerbBlockLabel("patientivo-tronco", isNawat, "patientivo · tronco verbal"),
                patientivoSource: "tronco-verbal",
                showControls: false,
            },
        ]
        : [
            {
                id: resolvedTense,
                label: tenseLabel,
                patientivoSource: "nonactive",
                showControls: true,
            },
        ];
    let toggleButtons = new Map();
    let possessorButtons = new Map();
    let ownershipButtons = new Map();
    let subjectButtons = new Map();
    const blocks = [];

    const createTenseBlock = ({
        id,
        label,
        patientivoSource,
        showControls,
    }) => {
        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${id}`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = document.createElement("span");
        titleLabel.className = "tense-block__label";
        titleLabel.textContent = label;
        tenseTitle.appendChild(titleLabel);

        if (showControls) {
            const titleControls = document.createElement("div");
            titleControls.className = "tense-block__controls";
            titleControls.classList.add("tense-block__controls--stacked");
            if (showSubjectToggle) {
                const { toggle: subjectToggle, buttons } = buildToggleControl({
                    options: subjectOptions,
                    activeId: activeSubject,
                    ariaLabel: subjectToggleLabel,
                    onSelect: (id) => {
                        setActiveSubject(id);
                    },
                    getIsDisabled: (entry) => !isSubjectOptionAllowed(entry),
                });
                subjectButtons = buttons;
                titleControls.appendChild(subjectToggle);
            }
            if (showPossessorToggle) {
                const possessorOptions = [
                    { id: OBJECT_TOGGLE_ALL, label: allToggleLabel, value: OBJECT_TOGGLE_ALL },
                    ...POSSESSIVE_PREFIXES.map((entry) => ({
                        id: entry.value,
                        label: entry.value ? entry.value : "Ø",
                        value: entry.value,
                        title: getPossessorPersonLabel(entry.value, isNawat),
                    })),
                ];
                const { toggle: possessorToggle, buttons } = buildToggleControl({
                    options: possessorOptions,
                    activeId: activePossessor,
                    ariaLabel: possessorToggleLabel,
                    onSelect: (id) => {
                        setActivePossessor(id);
                    },
                    getTitle: (entry) => entry.title,
                });
                possessorButtons = buttons;
                titleControls.appendChild(possessorToggle);
            } else {
                activePossessor = "";
            }
            if (showOwnershipToggle) {
                PATIENTIVO_OWNERSHIP_STATE.set(ownershipKey, activePatientivoOwnership);
                const { toggle: ownershipToggle, buttons } = buildToggleControl({
                    options: PATIENTIVO_OWNERSHIP_OPTIONS,
                    activeId: activePatientivoOwnership,
                    ariaLabel: ownershipToggleLabel,
                    onSelect: (id) => {
                        setActivePatientivoOwnership(id);
                    },
                    getTitle: (entry) => getLocalizedLabel(
                        PATIENTIVO_OWNERSHIP_LABELS[entry.id],
                        isNawat,
                        entry.title || ""
                    ),
                });
                ownershipButtons = buttons;
                titleControls.appendChild(ownershipToggle);
            }
            if (showObjectToggle) {
                const { toggle: objectToggle, buttons } = buildToggleControl({
                    options: objectOptions,
                    activeId: activeObjectPrefix,
                    ariaLabel: objectToggleLabel,
                    onSelect: (id) => {
                        setActivePrefix(id);
                    },
                });
                toggleButtons = buttons;
                titleControls.appendChild(objectToggle);
            }
            tenseTitle.appendChild(titleControls);
        }
        tenseBlock.appendChild(tenseTitle);

        const list = document.createElement("div");
        list.className = "conjugation-list";
        tenseBlock.appendChild(list);
        grid.appendChild(tenseBlock);
        blocks.push({
            block: tenseBlock,
            list,
            label,
            patientivoSource,
            blockKey: id,
            titleLabel,
        });
    };

    const updateSectionCategory = (prefix) => {
        applyObjectSectionCategory(objSection, prefix);
    };

    const renderRowsForList = (targetList, patientivoSource) => {
        targetList.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = placeholderText;
            targetList.appendChild(placeholder);
            return;
        }
        let selections = getSubjectPersonSelections();
        if (activeSubject !== SUBJECT_TOGGLE_ALL) {
            const activeEntry = subjectOptionMap.get(activeSubject);
            if (activeEntry) {
                selections = selections.filter(({ selection }) => (
                    selection.subjectPrefix === activeEntry.subjectPrefix
                    && selection.subjectSuffix === activeEntry.subjectSuffix
                ));
            }
        }
        if (showNonanimateOnly) {
            selections = selections.filter(({ selection }) =>
                isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix)
            );
        }
        const objectSelections = activeObjectPrefix === OBJECT_TOGGLE_ALL
            ? allowedPrefixes
            : [activeObjectPrefix];
        const possessorSelections = activePossessor === OBJECT_TOGGLE_ALL
            ? possessorValues
            : [activePossessor];
        const patientivoOverride = resolvedTense === "patientivo"
            ? (patientivoSource || "nonactive")
            : null;
        objectSelections.forEach((objectPrefix) => {
            selections.forEach(({ group, selection, number }) => {
                possessorSelections.forEach((possessorPrefix) => {
                    const isAgentivo = resolvedTense === "agentivo";
                    const isPatientivo = resolvedTense === "patientivo";
                    const isPossessed = possessorPrefix !== "";
                    let subjectSuffixOverride = "";
                    if ((isAgentivo || isPatientivo) && number === "plural") {
                        subjectSuffixOverride = isPossessed ? "p" : "t";
                    }
                    const row = document.createElement("div");
                    row.className = "conjugation-row";
                    applyConjugationRowClasses(row, objectPrefix);

                    const label = document.createElement("div");
                    label.className = "conjugation-label";
                    const personLabel = document.createElement("div");
                    personLabel.className = "person-label";
                    personLabel.textContent = getSubjectPersonLabel(group, selection, isNawat);
                    const personSub = document.createElement("div");
                    personSub.className = "person-sub";
                    const basePersonSub = getSubjectSubLabel(selection, {
                        isNawat,
                        mode: "noun",
                        tenseValue: resolvedTense,
                    });
                    const objectLabel = getNounObjectComboLabel(objectPrefix, isNawat);
                    let possessorLabel = getPossessorLabel(possessorPrefix, isNawat);
                    label.appendChild(personLabel);
                    label.appendChild(personSub);

                    const value = document.createElement("div");
                    value.className = "conjugation-value";
                    let result = {};
                    if (isInstrumentivo) {
                        const instrumentivoMode = possessorPrefix === ""
                            ? INSTRUMENTIVO_MODE.absolutivo
                            : INSTRUMENTIVO_MODE.posesivo;
                        result = getInstrumentivoResult({
                            rawVerb: verb,
                            verbMeta,
                            subjectPrefix: selection.subjectPrefix,
                            subjectSuffix: selection.subjectSuffix,
                            objectPrefix,
                            mode: instrumentivoMode,
                            possessivePrefix: possessorPrefix,
                        }) || {};
                    } else if (isCalificativoInstrumentivo) {
                        result = getCalificativoInstrumentivoResult({
                            rawVerb: verb,
                            verbMeta,
                            subjectPrefix: selection.subjectPrefix,
                            subjectSuffix: selection.subjectSuffix,
                            objectPrefix,
                            possessivePrefix: possessorPrefix,
                        }) || {};
                    } else if (isLocativoTemporal) {
                        result = getLocativoTemporalResult({
                            rawVerb: verb,
                            verbMeta,
                            objectPrefix,
                            possessivePrefix: possessorPrefix,
                        }) || {};
                        possessorLabel = result.possessorPrefix
                            ? getPossessorLabel(result.possessorPrefix, isNawat)
                            : "";
                    } else {
                        result = generateWord({
                            silent: true,
                            skipTransitivityValidation: true,
                            override: {
                                subjectPrefix: selection.subjectPrefix,
                                subjectSuffix: subjectSuffixOverride,
                                objectPrefix,
                                verb,
                                tense: tenseValue,
                                possessivePrefix: possessorPrefix,
                                patientivoOwnership: activePatientivoOwnership,
                                patientivoSource: patientivoOverride,
                            },
                        }) || {};
                    }
                    personSub.textContent = buildPersonSub({
                        subjectLabel: basePersonSub,
                        possessorLabel,
                        objectLabel,
                    });
                    const comboObjectPrefix = possessorPrefix
                        ? (POSSESSIVE_TO_OBJECT_PREFIX[possessorPrefix] || "")
                        : "";
                    const { shouldMask, isError } = getConjugationMaskState({
                        result,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                        comboObjectPrefix,
                        enforceInvalidCombo: Boolean(possessorPrefix),
                    });
                    value.classList.remove("conjugation-error", "conjugation-reflexive");
                    if (shouldMask) {
                        value.textContent = "—";
                        if (isError) {
                            value.classList.add("conjugation-error");
                        }
                    } else {
                        value.textContent = formatConjugationDisplay(result.result);
                    }

                    row.appendChild(label);
                    row.appendChild(value);
                    targetList.appendChild(row);
                });
            });
        });
    };
    const renderRows = () => {
        blocks.forEach((entry) => {
            renderRowsForList(entry.list, entry.patientivoSource);
        });
    };

    const setActivePrefix = (prefix) => {
        activeObjectPrefix = prefix;
        OBJECT_TOGGLE_STATE.set(objectStateKey, prefix);
        blocks.forEach((entry) => {
            if (entry.titleLabel) {
                entry.titleLabel.textContent = entry.label;
            }
            entry.block.dataset.tenseBlock = `${prefix}-${entry.blockKey}`;
        });
        updateSectionCategory(prefix === OBJECT_TOGGLE_ALL ? "" : prefix);
        toggleButtons.forEach((button, key) => {
            const isActive = key === prefix;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
    };

    const setActivePossessor = (prefix) => {
        activePossessor = prefix;
        POSSESSOR_TOGGLE_STATE.set(possessorKey, prefix);
        possessorButtons.forEach((button, key) => {
            const isActive = key === prefix;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
    };
    const setActivePatientivoOwnership = (ownership) => {
        activePatientivoOwnership = ownership;
        PATIENTIVO_OWNERSHIP_STATE.set(ownershipKey, ownership);
        setToggleActiveState(ownershipButtons, ownership);
        renderRows();
    };
    const setActiveSubject = (subjectId) => {
        activeSubject = subjectId;
        SUBJECT_TOGGLE_STATE.set(subjectKey, subjectId);
        subjectButtons.forEach((button, key) => {
            const isActive = key === subjectId;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
    };

    blockConfigs.forEach((entry) => createTenseBlock(entry));
    setActivePrefix(activeObjectPrefix);
    setActiveSubject(activeSubject);
    if (showPossessorToggle) {
        setActivePossessor(activePossessor);
    } else {
        renderRows();
    }
}

function renderAllTenseConjugations({ verb, onlyTense = null }) {
    renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal",
    });
}

// Developer helper: console-only tests for exact-pattern reduplication rules.
async function runExactRedupTests(rulesData = null) {
    const normalizeList = (values) => Array.from(new Set(values)).sort();
    const formatList = (values) => values.map((value) => (value === "" ? "Ø" : value)).join(", ");
    const isEqualList = (left, right) => (
        left.length === right.length && left.every((value, index) => value === right[index])
    );
    const getClassASuffixes = (context) => {
        const variants = buildPretUniversalClassA(context);
        if (!variants) {
            return null;
        }
        return normalizeList(variants.map((variant) => variant.suffix));
    };
    const getClassAHasJAlt = (context) => {
        const variants = buildPretUniversalClassA(context);
        return variants ? variants.some((variant) => variant.base.endsWith("j")) : false;
    };
    const getCandidates = (context) => normalizeList(getPretUniversalClassCandidates(context));
    const loadRules = async (source) => {
        if (source && Array.isArray(source.cases)) {
            return source;
        }
        const path = typeof source === "string" && source ? source : "data/exact_rules.json";
        if (typeof fetch !== "function") {
            throw new Error("fetch not available for loading exact_rules.json");
        }
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return response.json();
    };

    let rules;
    try {
        rules = await loadRules(rulesData);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const summary = {
            total: 0,
            passed: 0,
            failed: 1,
            failures: [message],
        };
        console.error("Exact redup tests failed:", summary);
        return summary;
    }

    const failures = [];
    let total = 0;
    const recordFailure = (name, formLabel, message) => {
        failures.push(`${name} (${formLabel}): ${message}`);
    };
    const checkExactFlags = (context, name, formLabel, flags) => {
        if (!flags) {
            return;
        }
        Object.entries(flags).forEach(([key, expected]) => {
            if (context[key] !== expected) {
                recordFailure(
                    name,
                    formLabel,
                    `${key} expected ${expected ? "true" : "false"} but got ${context[key] ? "true" : "false"}`
                );
            }
        });
    };
    const checkList = (name, formLabel, label, actual, expected) => {
        if (!actual) {
            recordFailure(name, formLabel, `${label} expected ${formatList(expected)} but got none`);
            return;
        }
        if (!isEqualList(actual, expected)) {
            recordFailure(
                name,
                formLabel,
                `${label} expected ${formatList(expected)} but got ${formatList(actual)}`
            );
        }
    };

    (rules.cases || []).forEach((test) => {
        const caseOptions = test.options || {};
        (test.forms || []).forEach((form) => {
            total += 1;
            const options = { ...caseOptions, ...(form.options || {}) };
            const context = buildPretUniversalContext(form.verb, form.verb, test.isTransitive, options);
            if (!context) {
                recordFailure(test.name, form.label, "context missing");
                return;
            }
            if (test.exactKey && context[test.exactKey] !== true) {
                recordFailure(
                    test.name,
                    form.label,
                    `${test.exactKey} expected true but got ${context[test.exactKey] ? "true" : "false"}`
                );
            }
            checkExactFlags(context, test.name, form.label, test.expectExactFlags);
            checkExactFlags(context, test.name, form.label, form.expectExactFlags);
            const expectations = form.expect || {};
            if (Object.prototype.hasOwnProperty.call(expectations, "isReduplicated")) {
                if (context.isReduplicated !== expectations.isReduplicated) {
                    recordFailure(
                        test.name,
                        form.label,
                        `isReduplicated expected ${expectations.isReduplicated ? "true" : "false"} but got ${context.isReduplicated ? "true" : "false"}`
                    );
                }
            }
            if (expectations.candidates) {
                const candidates = getCandidates(context);
                checkList(test.name, form.label, "candidates", candidates, expectations.candidates);
            }
            if (Object.prototype.hasOwnProperty.call(expectations, "classASuffixes")) {
                const suffixes = getClassASuffixes(context);
                checkList(test.name, form.label, "class A suffixes", suffixes, expectations.classASuffixes);
            }
            if (Object.prototype.hasOwnProperty.call(expectations, "hasJAlt")) {
                const hasJAlt = getClassAHasJAlt(context);
                if (hasJAlt !== expectations.hasJAlt) {
                    recordFailure(
                        test.name,
                        form.label,
                        `w/j alternation expected ${expectations.hasJAlt ? "true" : "false"} but got ${hasJAlt ? "true" : "false"}`
                    );
                }
            }
        });
    });

    const summary = {
        total,
        passed: total - failures.length,
        failed: failures.length,
        failures,
    };
    if (failures.length) {
        console.error("Exact redup tests failed:", summary);
    } else {
        console.log("Exact redup tests passed:", summary);
    }
    return summary;
}

// Developer helper: console-only tests for parse pipeline behavior.
async function runParsePipelineTests(testData = null) {
    const isEqualValue = (expected, actual) => {
        if (Array.isArray(expected)) {
            if (!Array.isArray(actual) || expected.length !== actual.length) {
                return false;
            }
            return expected.every((value, index) => value === actual[index]);
        }
        return actual === expected;
    };
    const loadTests = async (source) => {
        if (source && Array.isArray(source.cases)) {
            return source;
        }
        const path = typeof source === "string" && source ? source : STATIC_PARSE_TESTS_PATH;
        if (typeof fetch !== "function") {
            throw new Error("fetch not available for loading parse tests");
        }
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return response.json();
    };
    let tests;
    try {
        tests = await loadTests(testData);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const summary = {
            total: 0,
            passed: 0,
            failed: 1,
            failures: [message],
        };
        console.error("Parse pipeline tests failed:", summary);
        return summary;
    }
    const failures = [];
    let total = 0;
    (tests.cases || []).forEach((entry, index) => {
        total += 1;
        if (!entry || typeof entry.input !== "string") {
            failures.push(`case ${index + 1}: missing input`);
            return;
        }
        const parsed = parseVerbInput(entry.input);
        const expect = entry.expect || {};
        Object.entries(expect).forEach(([key, value]) => {
            const actual = parsed[key];
            if (!isEqualValue(value, actual)) {
                failures.push(
                    `${entry.input}: ${key} expected ${JSON.stringify(value)} but got ${JSON.stringify(actual)}`
                );
            }
        });
    });
    const summary = {
        total,
        passed: total - failures.length,
        failed: failures.length,
        failures,
    };
    if (failures.length) {
        console.error("Parse pipeline tests failed:", summary);
    } else {
        console.log("Parse pipeline tests passed:", summary);
    }
    return summary;
}

if (typeof window !== "undefined") {
    window.runExactRedupTests = runExactRedupTests;
    window.runParsePipelineTests = runParsePipelineTests;
}

// === Event Wiring ===
// Keyboard navigation (kept minimal now that radios are removed)
document.addEventListener("keydown", (event) => {
    const verbEl = document.getElementById("verb");
    if (event.key === " ") {
        if (verbEl) {
            verbEl.focus();
        }
        event.preventDefault();
    } else if (event.key === "Escape") {
        if (verbEl) {
            verbEl.blur();
        }
        event.preventDefault();
    } else if (event.key === "Enter") {
        generateWord();
        event.preventDefault();
    }
});

// Auto-generate on load and while typing
document.addEventListener("DOMContentLoaded", async () => {
    await loadStaticConstants();
    await loadStaticParseRules();
    await loadStaticDirectionalRules();
    await loadStaticLabels();
    await loadStaticOptions();
    await loadStaticGroups();
    await loadStaticOrders();
    await loadStaticRules();
    await loadStaticDerivationalRules();
    await loadStaticValenceNeutral();
    await loadStaticPhonology();
    await loadStaticAllomorphyRules();
    await loadStaticModes();
    await loadStaticMisc();
    await loadStaticSuppletives();
    await loadStaticRedup();
    await loadStaticSuppletivePaths();
    setBrowserClasses();
    initZoomFontLock();
    initUiScaleControl();
    initTutorialPanel();
    initTenseModeTabs();
    initCombinedModeTabs();
    initDerivationTypeControl();
    initBulkExport();
    initViewExport();
    const verbEl = document.getElementById("verb");
    if (verbEl) {
        verbEl.dataset.prevValue = verbEl.value || "";
        const initialParts = getSearchParts(verbEl.value);
        const initialBase = initialParts.trimmedBase;
        const initialValue = initialBase || verbEl.value;
        verbEl.dataset.lastClassVerb = parseVerbInput(initialValue).verb;
        if (initialBase) {
            rememberNonSearchValue(initialParts);
        } else if (!initialParts.hasQuery) {
            VERB_INPUT_STATE.lastNonSearchValue = verbEl.value;
        }
        verbEl.addEventListener("beforeinput", handleVerbBeforeInput);
        verbEl.addEventListener("input", () => {
            if (verbEl.value.includes("/-") || verbEl.value.includes("-/")) {
                verbEl.value = verbEl.dataset.prevValue || "";
            } else {
                verbEl.dataset.prevValue = verbEl.value;
            }
            renderVerbMirror();
            const searchParts = getSearchParts(verbEl.value);
            rememberNonSearchValue(searchParts);
            const parsedVerb = parseVerbInput(getSearchInputBase(verbEl.value));
            if (verbEl.dataset.lastClassVerb !== parsedVerb.verb) {
                CLASS_FILTER_STATE.activeClass = null;
                verbEl.dataset.lastClassVerb = parsedVerb.verb;
            }
            renderTenseTabs();
            renderPretUniversalTabs();
            updateVerbSuggestions();
            generateWord();
            maybeAutoScrollToConjugationRow(verbEl.value);
        });
        verbEl.addEventListener("focus", () => {
            updateVerbSuggestions();
        });
        verbEl.addEventListener("blur", () => {
            window.setTimeout(() => {
                closeVerbSuggestions();
            }, 120);
        });
        verbEl.addEventListener("keydown", handleVerbSuggestionKeydown);
        verbEl.addEventListener("scroll", () => {
            renderVerbMirror();
        });
    }
    window.addEventListener("resize", () => {
        renderVerbMirror();
    });
    renderTenseTabs();
    renderPretUniversalTabs();
    renderVerbMirror();
    loadVerbSuggestions().then(() => {
        updateVerbSuggestions();
        updateVerbDisambiguation();
    });
    generateWord();
});
