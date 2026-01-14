// === Configuration ===
const OBJECT_PREFIXES = [
    { value: "nech", labelText: "a mí (nech)" },
    { value: "metz", labelText: "a ti (metz)" },
    { value: "ki", labelText: "a él/ella/eso (ki~k)" },
    { value: "tech", labelText: "a nosotros/as (tech)" },
    { value: "metzin", labelText: "a ustedes (metzin)" },
    { value: "kin", labelText: "a ellos/as (kin)" },
    { value: "mu", labelText: "a uno mismo (mu)" },
    { value: "ta", labelText: "a algo (ta)" },
    { value: "te", labelText: "a alguien (te)" },
];
const OBJECT_PREFIX_GROUPS = [
    ["nech", "metz", "ki", "tech", "metzin", "kin"],
    ["ta", "te", "mu"],
];
const INVALID_COMBINATION_KEYS = new Set([
    "ni||t",
    "ni|ki|t",
    "ni|metz|t",
    "ni|tech|t",
    "ni|mu|t",
    "ni|te|t",
    "ni|ta|t",
    "ni|metzin|t",
    "ni|tech|",
    "ni|kin|t",
    "an||",
    "ti|metzin|",
    "an|metz|t",
    "an|mu|",
    "an|te|",
    "an|ta|",
    "an|tech|",
    "an|nech|",
    "an|kin|",
    "an|metz|",
    "an|ki|",
    "ti|nech|t",
]);
const TENSE_SUFFIX_RULES = {
    imperfecto: { "": "ya", t: "yat" },
    preterito: { t: "ket" },
    perfecto: { "": "tuk", t: "tiwit" },
    pluscuamperfecto: { "": "tuya", t: "tuyat" },
    "condicional-perfecto": { "": "tuskia", t: "tuskiat" },
    "pasado-remoto": { "": "ka", t: "kat" },
    futuro: { "": "s", t: "sket" },
    condicional: { "": "skia", t: "skiat" },
    "presente-desiderativo": { "": "sneki", t: "snekit" },
    "presente-habitual": { "": "ni", t: "nit" },
    "imperativo": { "": "", t: "kan" },
    "sustantivo-verbal": { "": "lis", t: "lis" },
    "agentivo": { "": "ni", t: "nimet", p: "niwan" },
};
const PRET_UNIVERSAL_CLASS_BY_TENSE = {
    "preterito-universal-1": "A",
    "preterito-universal-2": "B",
    "preterito-universal-3": "D",
    "preterito-universal-4": "C",
};
const PRETERITO_CLASS_TENSES = new Set([
    "preterito-clase",
    "pasado-remoto",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
]);
const NONSPECIFIC_I_DROP_VERBS = ["itki"];
const DIRECTIONAL_PREFIXES = ["wal", "un", "ku"];
const IA_UA_SUFFIXES = ["ia", "ua"];
const AN_PREFIX_VOWEL_PREFIXES = ["a", "e", "u"];
const VOWELS = "aeiu";
const VOWEL_RE = /[aeiu]/;
const VOWEL_GLOBAL_RE = /[aeiu]/g;
const VOWEL_START_RE = /^[aeiu]/;
const VOWEL_END_RE = /[aeiu]$/;
const VALID_VOWEL_SET = new Set(VOWELS.split(""));
const VALID_CONSONANTS = new Set(["p", "t", "k", "m", "n", "s", "l", "w", "y", "j", "c", "z", "d"]);
const DIGRAPHS = ["tz", "sh", "ch", "kw", "nh"];
const DIGRAPH_SET = new Set(DIGRAPHS);
const SYLLABLE_FORMS = ["C", "CV", "CVj", "CVl", "V", "Vj", "Vl"];
const SYLLABLE_FORM_SET = new Set(SYLLABLE_FORMS);
const REDUP_PREFIX_FORMS = new Set(["V", "Vj", "CV", "CVj"]);
const COMPOUND_MARKER_RE = /[|~#()\/?-]/g;
const COMPOUND_MARKER_SPLIT_RE = /[|~#()\/?-]/;
const COMPOUND_ALLOWED_RE = /[^a-z|~#()\/?-]/g;
const OBJECT_MARKERS = new Set(["ta", "te", "mu"]);
const FUSION_PREFIXES = new Set(["ta", "te", "mu", "taj", "tej"]);
const NONANIMATE_NOUN_TENSES = new Set([
    "sustantivo-verbal",
    "instrumentivo",
    "calificativo-instrumentivo",
]);
const SUBJECT_COMBINATIONS = [
    { id: "ni", labelEs: "yo", labelNa: "naja", subjectPrefix: "ni", subjectSuffix: "" },
    { id: "ti", labelEs: "tú", labelNa: "taja", subjectPrefix: "ti", subjectSuffix: "" },
    { id: "third-person", labelEs: "él/ella/eso", labelNa: "yaja", subjectPrefix: "", subjectSuffix: "" },
    { id: "1-pl", labelEs: "nosotros", labelNa: "tejemet", subjectPrefix: "ti", subjectSuffix: "t" },
    { id: "2-pl", labelEs: "ustedes", labelNa: "anmejemet", subjectPrefix: "an", subjectSuffix: "t" },
    { id: "3-pl", labelEs: "ellos/ellas", labelNa: "yejemet", subjectPrefix: "", subjectSuffix: "t" },
];
const SUBJECT_PERSON_GROUPS = [
    {
        id: "first",
        labelEs: "1a persona",
        labelNa: "1a",
        singular: { labelEs: "yo", labelNa: "naja", subjectPrefix: "ni", subjectSuffix: "" },
        plural: { labelEs: "nosotros", labelNa: "tejemet", subjectPrefix: "ti", subjectSuffix: "t" },
    },
    {
        id: "second",
        labelEs: "2a persona",
        labelNa: "2a",
        singular: { labelEs: "tú", labelNa: "taja", subjectPrefix: "ti", subjectSuffix: "" },
        plural: { labelEs: "ustedes", labelNa: "anmejemet", subjectPrefix: "an", subjectSuffix: "t" },
    },
    {
        id: "third",
        labelEs: "3a persona",
        labelNa: "3a",
        singular: { labelEs: "él/ella/eso", labelNa: "yaja", subjectPrefix: "", subjectSuffix: "" },
        plural: { labelEs: "ellos/ellas", labelNa: "yejemet", subjectPrefix: "", subjectSuffix: "t" },
    },
];
const SUBJECT_PERSON_NUMBER_ORDER = ["singular", "plural"];
const SUBJECT_TOGGLE_ALL = "all";
const OBJECT_TOGGLE_ALL = "all";
const SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = new Set(["ta", "te", "mu"]);
const SUSTANTIVO_VERBAL_PREFIXES = ["", ...SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES];
const POSSESSIVE_PREFIXES = [
    { id: "none", label: "forma absoluta", value: "", number: "none" },
    { id: "1s", label: "1a persona", value: "nu", number: "singular" },
    { id: "2s", label: "2a persona", value: "mu", number: "singular" },
    { id: "3s", label: "3a persona", value: "i", number: "singular" },
    { id: "1p", label: "1a persona", value: "tu", number: "plural" },
    { id: "2p", label: "2a persona", value: "anmu", number: "plural" },
    { id: "3p", label: "3a persona", value: "in", number: "plural" },
];
const POSSESSIVE_TO_OBJECT_PREFIX = {
    nu: "nech",
    mu: "metz",
    i: "ki",
    tu: "tech",
    anmu: "metzin",
    in: "kin",
};
const VOICE_MODE = {
    active: "active",
    passive: "passive-impersonal",
};
const PASSIVE_IMPERSONAL_SUBJECT_MAP = {
    nech: { subjectPrefix: "ni", subjectSuffix: "" },
    metz: { subjectPrefix: "ti", subjectSuffix: "" },
    ki: { subjectPrefix: "", subjectSuffix: "" },
    tech: { subjectPrefix: "ti", subjectSuffix: "t" },
    metzin: { subjectPrefix: "an", subjectSuffix: "t" },
    kin: { subjectPrefix: "", subjectSuffix: "t" },
};
const PASSIVE_IMPERSONAL_DIRECT_OBJECTS = new Set(Object.keys(PASSIVE_IMPERSONAL_SUBJECT_MAP));
const DERIVATION_MODE = {
    active: "active",
    nonactive: "nonactive",
};
const NONACTIVE_SUFFIX_ORDER = ["lu", "u", "wa", "luwa", "uwa", "walu"];
const NONACTIVE_SUFFIX_LABELS = {
    lu: "-lu",
    u: "-u",
    wa: "-wa",
    luwa: "-luwa",
    uwa: "-uwa",
    walu: "-walu",
};
const NONACTIVE_SUFFIX_DESCRIPTIONS = {
    lu: "derivación no activa regular",
    u: "no activa breve; base recortada",
    wa: "no activa con cierre en -wa",
    luwa: "no activa con doble sufijación",
    uwa: "no activa con alternancia u‑wa",
    walu: "no activa con alternancia wa‑lu",
};
const COMBINED_MODE = {
    active: "active",
    nonactive: "nonactive",
};
const INSTRUMENTIVO_MODE = {
    absolutivo: "absolutivo",
    posesivo: "posesivo",
};
const TENSE_MODE = {
    verbo: "verbo",
    sustantivo: "sustantivo",
};
const TENSE_ORDER = [
    "presente",
    "imperativo",
    "sustantivo-verbal",
    "agentivo",
    "instrumentivo",
    "calificativo-instrumentivo",
    "locativo-temporal",
    "presente-habitual",
    "presente-desiderativo",
    "imperfecto",
    "preterito-clase",
    "pasado-remoto",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
    "futuro",
    "condicional",
];
const TENSE_LABELS = {
    "presente": "presente",
    "imperativo": "imperativo",
    "sustantivo-verbal": "sustantivo verbal",
    "agentivo": "agentivo",
    "instrumentivo": "instrumentivo",
    "calificativo-instrumentivo": "calificativo/instrumentivo",
    "locativo-temporal": "locativo/temporal",
    "presente-habitual": "presente habitual",
    "presente-desiderativo": "presente desiderativo",
    "imperfecto": "pretérito imperfecto",
    "preterito-clase": "pretérito perfecto simple",
    "pasado-remoto": "pasado remoto",
    "perfecto": "pretérito perfecto compuesto",
    "pluscuamperfecto": "pretérito pluscuamperfecto",
    "condicional-perfecto": "pretérito condicional perfecto",
    "futuro": "futuro imperfecto",
    "condicional": "pretérito condicional imperfecto",
};
const TENSE_DESCRIPTIONS = {
    "presente": "acciones actuales o en progreso",
    "imperativo": "mandato, exhortación o petición",
    "sustantivo-verbal": "acción tratada como sustantivo",
    "agentivo": "persona o entidad que realiza la acción",
    "instrumentivo": "medio o herramienta de la acción",
    "calificativo-instrumentivo": "cualidad derivada del pasado",
    "locativo-temporal": "lugar o tiempo donde ocurre la acción",
    "presente-habitual": "acción repetida o costumbre",
    "presente-desiderativo": "deseo, intención o propósito",
    "imperfecto": "pasado en desarrollo o continuo",
    "preterito-clase": "pasado puntual con cierre perfectivo",
    "pasado-remoto": "pasado distante con cierre perfectivo",
    "perfecto": "pasado con resultado vigente",
    "pluscuamperfecto": "pasado anterior a otro pasado",
    "condicional-perfecto": "pasado hipotético o no realizado",
    "futuro": "evento proyectado o esperado",
    "condicional": "posibilidad, duda o cortesía",
};
const TENSE_LINGUISTIC_GROUPS = {
    verbo: {
        left: [
            { heading: "Modo · imperativo", tenses: ["imperativo"] },
            {
                heading: "No pasado · imperfectivo",
                tenses: ["presente", "presente-habitual", "presente-desiderativo"],
            },
            { heading: "Pasado · imperfectivo", tenses: ["imperfecto"] },
            { heading: "Futuro/condicional · imperfectivo", tenses: ["futuro", "condicional"] },
        ],
        right: [
            { heading: "Pasado · perfectivo (simple)", tenses: ["preterito-clase", "pasado-remoto"] },
            {
                heading: "Pasado · perfecto (compuesto)",
                tenses: ["perfecto", "pluscuamperfecto", "condicional-perfecto"],
            },
        ],
    },
    sustantivo: {
        left: [{
            heading: "Nominalización",
            tenses: [
                "sustantivo-verbal",
                "agentivo",
                "instrumentivo",
                "calificativo-instrumentivo",
                "locativo-temporal",
            ],
        }],
        right: [],
    },
};
const PRETERITO_UNIVERSAL_ORDER = [
    "preterito-universal-1",
    "preterito-universal-2",
    "preterito-universal-4",
    "preterito-universal-3",
];
const PRETERITO_UNIVERSAL_LABELS = {
    "preterito-universal-1": "Clase A: -ki / -Ø",
    "preterito-universal-2": "Clase B: +k",
    "preterito-universal-3": "Clase D: +j",
    "preterito-universal-4": "Clase C: -j",
};
const PRETERITO_UNIVERSAL_DESCRIPTIONS = {
    "preterito-universal-1": "pérdida de vocal final en perfectivo",
    "preterito-universal-2": "conserva vocal y añade -k",
    "preterito-universal-3": "añade -j al perfectivo",
    "preterito-universal-4": "alterna la raíz a -j",
};
const PRETERITO_CLASS_DETAIL_BY_KEY = {
    A: {
        label: PRETERITO_UNIVERSAL_LABELS["preterito-universal-1"],
        description: PRETERITO_UNIVERSAL_DESCRIPTIONS["preterito-universal-1"],
    },
    B: {
        label: PRETERITO_UNIVERSAL_LABELS["preterito-universal-2"],
        description: PRETERITO_UNIVERSAL_DESCRIPTIONS["preterito-universal-2"],
    },
    C: {
        label: PRETERITO_UNIVERSAL_LABELS["preterito-universal-4"],
        description: PRETERITO_UNIVERSAL_DESCRIPTIONS["preterito-universal-4"],
    },
    D: {
        label: PRETERITO_UNIVERSAL_LABELS["preterito-universal-3"],
        description: PRETERITO_UNIVERSAL_DESCRIPTIONS["preterito-universal-3"],
    },
};
const CONJUGATION_GROUPS = {
    tense: "tense",
    universal: "universal",
};
const VERB_SUGGESTION_LIMIT = 10;
const FORM_SEARCH_RESULT_LIMIT = 60;
const FORM_SEARCH_SUBJECT_PREFIXES = ["anh", "an", "ni", "ti", "n", "t"];
const FORM_SEARCH_OBJECT_PREFIXES = [
    "metzinh",
    "metzin",
    "nech",
    "metz",
    "tech",
    "kinh",
    "kin",
    "ki",
    "k",
    "ta",
    "te",
    "mu",
];
const FORM_SEARCH_TENSE_SUFFIXES = [
    "tuyat",
    "tuya",
    "tuskiat",
    "tuskia",
    "tiwit",
    "tuk",
    "kat",
    "ka",
    "ket",
    "sket",
    "skiat",
    "skia",
    "snekit",
    "sneki",
    "yat",
    "ya",
    "nit",
    "ni",
    "kan",
    "nimet",
    "niwan",
    "lis",
    "et",
    "s",
];
const FORM_SEARCH_OPTIONAL_TRANSITIVE_STEMS = new Set([
    "ajputza",
    "ajsi",
    "takwika",
    "tisi",
    "tzawa",
]);
const FORM_SEARCH_TEN_PREFIX_STEMS = new Set(["namiki", "shima"]);
const FORM_SEARCH_SLASH_PREFIX_STEMS = new Set(["lx"]);
const UI_SCALE_STORAGE_KEY = "ui-scale-offset";

// === Runtime State ===
var originalLabels = {};
var originalPlaceholder = "";
var originalSubmitButtonValue = "";
const VERB_INPUT_STATE = {
    lastNonSearchValue: "",
};
const VERB_SUGGESTION_STATE = {
    items: [],
    activeIndex: -1,
};
let VERB_SUGGESTIONS = [];
let VERB_SUGGESTIONS_TEXT = "";
const OBJECT_TOGGLE_STATE = new Map();
const POSSESSOR_TOGGLE_STATE = new Map();
const SUBJECT_TOGGLE_STATE = new Map();
const VOICE_MODE_STATE = {
    mode: VOICE_MODE.active,
};
const DERIVATION_MODE_STATE = {
    mode: DERIVATION_MODE.active,
};
const NONACTIVE_SUFFIX_STATE = {
    selected: null,
};
const INSTRUMENTIVO_MODE_STATE = {
    mode: INSTRUMENTIVO_MODE.absolutivo,
};
const TENSE_MODE_STATE = {
    mode: TENSE_MODE.verbo,
};
const TENSE_TABS_STATE = {
    selected: TENSE_ORDER[0],
};
const PRETERITO_UNIVERSAL_TABS_STATE = {
    selected: PRETERITO_UNIVERSAL_ORDER[0],
};
const CONJUGATION_GROUP_STATE = {
    activeGroup: CONJUGATION_GROUPS.tense,
};
const CLASS_FILTER_STATE = {
    activeClass: null,
};

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
    if (parsed.isMarkedTransitive) {
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

function getVerbLetterFromEnd(verb, positionFromEnd) {
    const letters = splitVerbLetters(verb);
    return letters[letters.length - positionFromEnd] || "";
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
        if (!REDUP_PREFIX_FORMS.has(first.form) || !second.nucleus) {
            continue;
        }
        if (!isOpenSyllable(second)) {
            continue;
        }
        if (!first.onset && !second.onset) {
            continue;
        }
        if (getSyllableBaseKey(first) === getSyllableBaseKey(second)) {
            return syllables.slice(i + 1).map((syllable) => syllable.text).join("");
        }
    }
    return verb;
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

function classifySyllableForms(rawVerb, options = {}) {
    const syllables = getSyllables(rawVerb, options);
    if (syllables.length === 0) {
        return null;
    }
    return syllables.map((syllable) => syllable.form);
}

function classifySyllableForm(rawVerb, options = {}) {
    const forms = classifySyllableForms(rawVerb, options);
    if (!forms || forms.length !== 1) {
        return null;
    }
    return forms[0] || null;
}

function isValidSyllableForm(rawVerb, options = {}) {
    const forms = classifySyllableForms(rawVerb, options);
    if (!forms || forms.length === 0) {
        return false;
    }
    return forms.every((form) => SYLLABLE_FORM_SET.has(form));
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
            if (!prev || !isOpenSyllable(prev)) {
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
            return false;
        }
    }
    return true;
}

function areSyllableFormsPronounceable(forms) {
    if (!forms || forms.length === 0) {
        return false;
    }
    for (let i = 0; i < forms.length; i += 1) {
        const form = forms[i];
        if (!SYLLABLE_FORM_SET.has(form)) {
            return false;
        }
        if (form === "C" && i > 0) {
            const prev = forms[i - 1];
            if (prev !== "V" && prev !== "CV") {
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
    if (verb.endsWith("yya")) {
        return null;
    }
    if (options.isTransitive) {
        return null;
    }
    if (options.isYawi) {
        return null;
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

function endsWithCCV(verb) {
    const letters = splitVerbLetters(verb);
    if (letters.length < 3) {
        return false;
    }
    const last = letters[letters.length - 1];
    const prev = letters[letters.length - 2];
    const prev2 = letters[letters.length - 3];
    return isVerbLetterVowel(last) && !isVerbLetterVowel(prev) && !isVerbLetterVowel(prev2);
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
    analysisVerb,
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
    isTaFusion = false,
}) {
    if (!verb) {
        return { verb, analysisVerb, objectPrefix };
    }
    const base = analysisVerb || verb;
    let nextVerb = verb;
    let nextAnalysis = base;
    let nextObjectPrefix = objectPrefix;
    const hasNonspecificObject =
        OBJECT_MARKERS.has(objectPrefix) || OBJECT_MARKERS.has(indirectObjectMarker);
    const shouldReduceMuPrefix =
        objectPrefix === "mu"
        && (startsWithICVCVPattern(base) || startsWithAlPrefix(base) || startsWithACVlPattern(base))
        && !startsWithAny(base, NONSPECIFIC_I_DROP_VERBS);
    if (shouldReduceMuPrefix) {
        nextObjectPrefix = "m";
    }
    if (
        isTaFusion
        && verb.startsWith("taij")
        && !startsWithAny(verb.slice(2), NONSPECIFIC_I_DROP_VERBS)
    ) {
        const fused = `taj${verb.slice(4)}`;
        return { verb: fused, analysisVerb: fused, objectPrefix: nextObjectPrefix };
    }
    if (objectPrefix === "ta" && base.startsWith("ij") && !startsWithAny(base, NONSPECIFIC_I_DROP_VERBS)) {
        nextAnalysis = base.slice(1);
    } else if (hasNonspecificObject && startsWithAny(base, NONSPECIFIC_I_DROP_VERBS)) {
        nextAnalysis = base.slice(1);
    }
    if (nextAnalysis !== base) {
        const updated = replaceAnalysisSuffix(nextVerb, base, nextAnalysis);
        nextVerb = updated.verb;
        nextAnalysis = updated.analysisVerb;
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
    return getActiveVerbValency(verbMeta) > 1;
}

function getActiveVerbValency(verbMeta) {
    if (!verbMeta) {
        return 1;
    }
    let objectCount = 0;
    if (verbMeta.hasLeadingDash) {
        objectCount += 1;
    }
    if (OBJECT_MARKERS.has(verbMeta.indirectObjectMarker || "")) {
        objectCount += 1;
    }
    const fusionCount = Array.isArray(verbMeta.fusionPrefixes) ? verbMeta.fusionPrefixes.length : 0;
    if (verbMeta.hasLeadingDash) {
        objectCount += fusionCount;
    } else if (fusionCount > 1) {
        objectCount += fusionCount;
    }
    if (objectCount <= 0) {
        return 1;
    }
    if (objectCount === 1) {
        return 2;
    }
    return 3;
}

function getNonactiveObjectPrefixGroups(verbMeta) {
    const valency = getActiveVerbValency(verbMeta);
    if (valency <= 1) {
        return { valency, groups: [{ prefixes: [""] }] };
    }
    const directPrefixes = Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
    return { valency, groups: buildObjectPrefixGroups(directPrefixes) };
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

function deriveNonactiveStem(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    if (!source || !VOWEL_END_RE.test(source)) {
        return source;
    }
    const suppletiveOptions = getSuppletiveNonactiveOptions({
        verb: source,
        isYawi: options.isYawi === true,
    });
    if (suppletiveOptions && suppletiveOptions.length) {
        return suppletiveOptions[0].stem;
    }
    const letters = splitVerbLetters(source);
    const letterCount = letters.length;
    const last = letters[letterCount - 1];
    const prev = letters[letterCount - 2] || "";
    const prev2 = letters[letterCount - 3] || "";
    const prevVowel = getPreviousVowel(letters, letterCount - 3);
    const endsWithA = last === "a";
    const endsWithI = last === "i";
    const endsWithU = last === "u";
    const endsWithWa = source.endsWith("wa");
    const endsWithWi = source.endsWith("wi");
    const endsWithYa = source.endsWith("ya");
    const endsWithTa = source.endsWith("ta");
    const endsWithTi = source.endsWith("ti");
    const isClassC = endsWithAny(source, IA_UA_SUFFIXES);
    const endsWithKwi = source.endsWith("kwi");
    const endsWithTzi = source.endsWith("tzi");
    const endsWithSi = source.endsWith("si");
    const endsWithMi = source.endsWith("mi");
    const endsWithNi = source.endsWith("ni");
    const endsWithMV = prev === "m" && (endsWithA || endsWithI);
    const endsWithTzka = source.endsWith("tzka");
    const endsWithJsi = source.endsWith("jsi");
    const hasMultipleTz = source.indexOf("tz") !== source.lastIndexOf("tz");
    const isTransitive = options.isTransitive === true;

    if (isClassC) {
        const base = truncateNonactiveBase(source);
        return `${base}lu`;
    }

    const isTiChu = endsWithTi && isVerbLetterVowel(prev2);
    const isTaToU = endsWithTa && prev2 === "i";
    const uCandidate =
        isTransitive
        && (
            isTiChu
            || isTaToU
            || (endsWithA && ["k", "n", "s"].includes(prev) && !endsWithTzka)
            || (
                endsWithI
                && (["k", "n", "s"].includes(prev) || prev === "kw")
                && !(endsWithKwi && letterCount <= 3)
            )
        );

    const uwaTransitive = isTransitive && source.endsWith("mali");
    let uwaCandidate = false;
    if (!isTransitive) {
        const uwaForA = endsWithA && ["k", "s", "w"].includes(prev);
        const uwaForI =
            endsWithI
            && (
                ["k", "s", "w", "tz"].includes(prev)
                || endsWithNi
            );
        uwaCandidate = uwaForA || uwaForI;
        if (
            source === "pinawa"
            || endsWithMi
            || endsWithJsi
            || (endsWithSi && prevVowel === "i")
            || (endsWithTzi && hasMultipleTz)
        ) {
            uwaCandidate = false;
        }
        if (endsWithMV) {
            uwaCandidate = true;
        }
    } else if (uwaTransitive) {
        uwaCandidate = true;
    }

    const allowWiwa = !isTransitive && (endsWithWa || endsWithWi);
    let waCandidate = (endsWithI || endsWithU || allowWiwa)
        && !uCandidate
        && (!uwaCandidate || allowWiwa);
    const allowMVWa = !isTransitive && endsWithMV;
    if (allowMVWa) {
        waCandidate = true;
    }
    const luCandidate = endsWithA && !uCandidate && !uwaCandidate;

    if (luCandidate) {
        const dropYa = endsWithYa && !isTransitive;
        const base = dropYa ? source.slice(0, -2) : source;
        return `${base}lu`;
    }

    if (uCandidate) {
        if (isTiChu) {
            return `${source.slice(0, -2)}chu`;
        }
        const base = truncateNonactiveBase(source);
        return `${base}u`;
    }

    if (waCandidate) {
        if (allowWiwa) {
            const base = `${source.slice(0, -1)}i`;
            return `${base}wa`;
        }
        if (allowMVWa) {
            return `${source}wa`;
        }
        if (endsWithJsi) {
            const base = `${source.slice(0, -2)}shi`;
            return `${base}wa`;
        }
        return `${source}wa`;
    }

    if (uwaCandidate) {
        if (uwaTransitive) {
            return `${source}uwa`;
        }
        const base = truncateNonactiveBase(source, { dropFinalW: true, tzToCh: true });
        return `${base}uwa`;
    }

    return source;
}

function getDefaultNonactiveSuffix(options) {
    const available = new Set(options.map((option) => option.suffix));
    return NONACTIVE_SUFFIX_ORDER.find((suffix) => available.has(suffix)) || null;
}

function getNonactiveDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    if (!source || !VOWEL_END_RE.test(source)) {
        return [];
    }
    const suppletiveOptions = getSuppletiveNonactiveOptions({
        verb: source,
        isYawi: options.isYawi === true,
    });
    if (suppletiveOptions) {
        return suppletiveOptions;
    }

    const letters = splitVerbLetters(source);
    const letterCount = letters.length;
    const last = letters[letterCount - 1];
    const prev = letters[letterCount - 2] || "";
    const prev2 = letters[letterCount - 3] || "";
    const prevVowel = getPreviousVowel(letters, letterCount - 3);
    const endsWithA = last === "a";
    const endsWithI = last === "i";
    const endsWithU = last === "u";
    const endsWithWa = source.endsWith("wa");
    const endsWithWi = source.endsWith("wi");
    const endsWithYa = source.endsWith("ya");
    const endsWithTa = source.endsWith("ta");
    const endsWithTi = source.endsWith("ti");
    const isClassC = endsWithAny(source, IA_UA_SUFFIXES);
    const endsWithKwi = source.endsWith("kwi");
    const endsWithTzi = source.endsWith("tzi");
    const endsWithSi = source.endsWith("si");
    const endsWithMi = source.endsWith("mi");
    const endsWithNi = source.endsWith("ni");
    const endsWithMV = prev === "m" && (endsWithA || endsWithI);
    const endsWithNa = source.endsWith("na");
    const endsWithSa = source.endsWith("sa");
    const endsWithTzka = source.endsWith("tzka");
    const endsWithJsi = source.endsWith("jsi");
    const hasMultipleTz = source.indexOf("tz") !== source.lastIndexOf("tz");
    const isTransitive = options.isTransitive === true;

    const isTiChu = endsWithTi && isVerbLetterVowel(prev2);
    const isTaToU = endsWithTa && prev2 === "i";
    const uCandidate =
        isTransitive
        && (
            isTiChu
            || isTaToU
            || (endsWithA && ["k", "n", "s"].includes(prev) && !endsWithTzka)
            || (
                endsWithI
                && (["k", "n", "s"].includes(prev) || prev === "kw")
                && !(endsWithKwi && letterCount <= 3)
            )
        );

    const uwaTransitive = isTransitive && source.endsWith("mali");
    let uwaCandidate = false;
    if (!isTransitive) {
        const uwaForA = endsWithA && ["k", "s", "w"].includes(prev);
        const uwaForI =
            endsWithI
            && (
                ["k", "s", "w", "tz"].includes(prev)
                || endsWithNi
            );
        uwaCandidate = uwaForA || uwaForI;
        if (
            source === "pinawa"
            || endsWithMi
            || endsWithJsi
            || (endsWithSi && prevVowel === "i")
            || (endsWithTzi && hasMultipleTz)
        ) {
            uwaCandidate = false;
        }
        if (endsWithMV) {
            uwaCandidate = true;
        }
    } else if (uwaTransitive) {
        uwaCandidate = true;
    }

    const allowWiwa = !isTransitive && (endsWithWa || endsWithWi);
    let waCandidate = (endsWithI || endsWithU || allowWiwa)
        && !uCandidate
        && (!uwaCandidate || allowWiwa);
    if (!isTransitive && endsWithMV) {
        waCandidate = true;
    }
    const luCandidate = endsWithA && !uCandidate && !uwaCandidate;

    const results = new Map();
    const push = (suffix, stem) => {
        if (!stem) {
            return;
        }
        results.set(suffix, stem);
    };

    const buildLu = () => {
        const dropYa = endsWithYa && !isTransitive;
        const base = dropYa ? source.slice(0, -2) : source;
        return `${base}lu`;
    };
    const buildU = () => {
        if (isTiChu) {
            return `${source.slice(0, -2)}chu`;
        }
        const base = truncateNonactiveBase(source);
        return `${base}u`;
    };
    const buildWa = () => {
        if (allowWiwa) {
            const base = `${source.slice(0, -1)}i`;
            return `${base}wa`;
        }
        if (endsWithJsi) {
            const base = `${source.slice(0, -2)}shi`;
            return `${base}wa`;
        }
        return `${source}wa`;
    };
    const buildUwa = () => {
        if (uwaTransitive) {
            return `${source}uwa`;
        }
        const base = truncateNonactiveBase(source, { dropFinalW: true, tzToCh: true });
        return `${base}uwa`;
    };

    if (isClassC) {
        const base = truncateNonactiveBase(source);
        return [{ suffix: "lu", stem: `${base}lu` }];
    }

    if (luCandidate) {
        push("lu", buildLu());
    }
    if (uCandidate) {
        push("u", buildU());
    }
    if (waCandidate) {
        push("wa", buildWa());
    }
    if (uwaCandidate) {
        push("uwa", buildUwa());
    }

    const allowLuVariant = isTransitive && (endsWithNa || endsWithNi || endsWithSa || endsWithTa || endsWithTi);
    if (allowLuVariant) {
        push("lu", buildLu());
    }
    const allowWaVariant = !isTransitive && endsWithNi;
    if (allowWaVariant) {
        push("wa", buildWa());
    }
    const allowWaluVariant = source === "kwi" || source.endsWith("mali");
    if (allowWaluVariant) {
        push("walu", `${source}walu`);
    }

    return Array.from(results, ([suffix, stem]) => ({ suffix, stem }));
}

function resolveNonactiveStemSelection(verb, analysisVerb, options = {}) {
    const optionsList = getNonactiveDerivationOptions(verb, analysisVerb, options);
    const optionMap = new Map(optionsList.map((option) => [option.suffix, option.stem]));
    let selectedSuffix = getSelectedNonactiveSuffix();
    if (selectedSuffix && !optionMap.has(selectedSuffix)) {
        selectedSuffix = null;
        setSelectedNonactiveSuffix(null);
    }
    let selectedStem = null;
    if (selectedSuffix && optionMap.has(selectedSuffix)) {
        selectedStem = optionMap.get(selectedSuffix);
    } else if (optionsList.length) {
        const fallback = getDefaultNonactiveSuffix(optionsList);
        selectedStem = (fallback && optionMap.has(fallback))
            ? optionMap.get(fallback)
            : optionsList[0].stem;
    } else {
        selectedStem = deriveNonactiveStem(verb, analysisVerb, options);
    }
    const allStems = optionsList.length
        ? Array.from(new Set(optionsList.map((option) => option.stem).filter(Boolean)))
        : (selectedStem ? [selectedStem] : []);
    return { selectedStem, allStems, selectedSuffix };
}

function getNonactiveStemForSelection(verb, analysisVerb, options = {}) {
    const selection = resolveNonactiveStemSelection(verb, analysisVerb, options);
    return selection.selectedStem;
}

// === Object & Label Helpers ===
function getObjectPrefixesForTransitividad() {
    return getTransitividadSelection() === "transitivo"
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

function getObjectLabel(prefix) {
    if (!prefix) {
        return "intransitivo";
    }
    return OBJECT_PREFIXES.find((opt) => opt.value === prefix)?.labelText || prefix;
}

function getAllObjectPrefixValues() {
    return OBJECT_PREFIXES.map((entry) => entry.value);
}

function getObjectLabelShort(prefix) {
    return getObjectLabel(prefix).replace(/\s*\([^)]*\)/g, "").trim();
}

function getObjectComboLabel(prefix, isNawat) {
    if (!prefix) {
        return getObjectLabelShort(prefix);
    }
    if (!isNawat) {
        return getObjectLabelShort(prefix);
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
            return getObjectLabelShort(prefix);
    }
}

function getPossessorLabelEs(prefix) {
    switch (prefix) {
        case "nu":
            return "de mi";
        case "mu":
            return "de ti";
        case "i":
            return "de él/ella/eso";
        case "tu":
            return "de nosotros";
        case "anmu":
            return "de ustedes";
        case "in":
            return "de ellos";
        default:
            return "";
    }
}

function getFormSearchInput() {
    return document.getElementById("form-search");
}

function normalizeFormSearchValue(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[()]/g, "")
        .trim();
}

function stripLeadingPrefix(value, prefixes) {
    for (const prefix of prefixes) {
        if (value.startsWith(prefix)) {
            return { prefix, rest: value.slice(prefix.length) };
        }
    }
    return { prefix: "", rest: value };
}

function normalizeObjectPrefixRest(prefix, rest) {
    if (prefix === "kin" && VOWEL_START_RE.test(rest)) {
        return { prefix: "ki", rest: `n${rest}` };
    }
    return { prefix, rest };
}

function getFormSearchSuffixCandidates(value) {
    const normalized = String(value || "");
    const sorted = [...FORM_SEARCH_TENSE_SUFFIXES].sort((a, b) => b.length - a.length);
    const candidates = new Set();
    let matched = false;
    const compoundSuffixes = ["tuyat", "tuya", "tuskiat", "tuskia"];
    const compoundMatch = compoundSuffixes.find((suffix) => normalized.endsWith(suffix)) || "";
    const compoundBlock = {
        tuya: new Set(["ya"]),
        tuyat: new Set(["yat"]),
        tuskia: new Set(["skia"]),
        tuskiat: new Set(["skiat"]),
    };
    sorted.forEach((suffix) => {
        if (suffix === "lis" && normalized.endsWith("talis")) {
            return;
        }
        if (compoundMatch && compoundBlock[compoundMatch]?.has(suffix)) {
            return;
        }
        if (suffix && normalized.endsWith(suffix) && normalized.length > suffix.length) {
            const base = normalized.slice(0, -suffix.length);
            candidates.add(base);
            if (suffix === "nit") {
                candidates.add(`${base}ni`);
            }
            if (suffix === "yat") {
                candidates.add(`${base}ya`);
            }
            matched = true;
            if (normalized.endsWith(`t${suffix}`) && normalized.length > suffix.length + 1) {
                candidates.add(normalized.slice(0, -(suffix.length + 1)));
            }
        }
    });
    if (matched && (
        normalized.endsWith("ya")
        || normalized.endsWith("ni")
        || normalized.endsWith("nit")
        || normalized.endsWith("yat")
        || normalized.endsWith("ka")
        || normalized.endsWith("kat")
        || normalized.endsWith("ket")
        || normalized.endsWith("tuk")
        || normalized.endsWith("tiwit")
        || normalized.endsWith("tuyat")
        || normalized.endsWith("tuskia")
        || normalized.endsWith("tuskiat")
        || normalized.endsWith("s")
    )) {
        candidates.add(normalized);
    }
    if (!matched) {
        candidates.add(normalized);
    }
    return Array.from(candidates);
}

function restoreVowelStems(stem) {
    if (!stem) {
        return [];
    }
    if (stem.endsWith("lki")) {
        const base = stem.slice(0, -2);
        return [stem, `${base}i`, `${base}a`];
    }
    if (stem.endsWith("lka")) {
        const base = stem.slice(0, -2);
        return [stem, `${base}i`, `${base}a`];
    }
    if (stem.startsWith("istaskat")) {
        return [stem, "istaya"];
    }
    if (stem === "yu" || stem === "yut") {
        return ["yawi"];
    }
    if (stem === "yani" || stem === "yanit") {
        return ["yawi"];
    }
    if (stem === "ya") {
        return ["ya", "yawi"];
    }
    if (stem === "yaya" || stem === "yayat") {
        return ["yawi"];
    }
    if (stem.endsWith("yasneki")) {
        return [stem, stem.replace(/yasneki$/, "yawi")];
    }
    if (stem.endsWith("yasnekit")) {
        return [stem, stem.replace(/yasnekit$/, "yawi")];
    }
    if (stem.startsWith("istasket")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istaska")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istaski")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istaka")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastiwit")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatiwit")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastuk")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatuk")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastuya")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatuya")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastuyat")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatuyat")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastuskia")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatuskia")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istastuskiat")) {
        return [stem, "istaya"];
    }
    if (stem.startsWith("istatuskiat")) {
        return [stem, "istaya"];
    }
    if (stem.endsWith("stastiwit")) {
        return [stem, stem.replace(/stastiwit$/, "istaya")];
    }
    if (stem.endsWith("statiwit")) {
        return [stem, stem.replace(/statiwit$/, "istaya")];
    }
    if (stem.endsWith("stastuk")) {
        return [stem, stem.replace(/stastuk$/, "istaya")];
    }
    if (stem.endsWith("statuk")) {
        return [stem, stem.replace(/statuk$/, "istaya")];
    }
    if (stem.endsWith("stastuya")) {
        return [stem, stem.replace(/stastuya$/, "istaya")];
    }
    if (stem.endsWith("statuya")) {
        return [stem, stem.replace(/statuya$/, "istaya")];
    }
    if (stem.endsWith("stastuyat")) {
        return [stem, stem.replace(/stastuyat$/, "istaya")];
    }
    if (stem.endsWith("statuyat")) {
        return [stem, stem.replace(/statuyat$/, "istaya")];
    }
    if (stem.endsWith("stastuskia")) {
        return [stem, stem.replace(/stastuskia$/, "istaya")];
    }
    if (stem.endsWith("statuskia")) {
        return [stem, stem.replace(/statuskia$/, "istaya")];
    }
    if (stem.endsWith("stastuskiat")) {
        return [stem, stem.replace(/stastuskiat$/, "istaya")];
    }
    if (stem.endsWith("statuskiat")) {
        return [stem, stem.replace(/statuskiat$/, "istaya")];
    }
    if (stem.endsWith("staskat")) {
        return [stem, stem.replace(/staskat$/, "istaya")];
    }
    if (stem.endsWith("stasket")) {
        return [stem, stem.replace(/stasket$/, "istaya")];
    }
    if (stem.endsWith("staska")) {
        return [stem, stem.replace(/staska$/, "istaya")];
    }
    if (stem.endsWith("staski")) {
        return [stem, stem.replace(/staski$/, "istaya")];
    }
    if (stem.endsWith("staka")) {
        return [stem, stem.replace(/staka$/, "istaya")];
    }
    if (stem.endsWith("kuk")) {
        return [stem, stem.replace(/kuk$/, "kukuya")];
    }
    if (stem.endsWith("kuket")) {
        return [stem, stem.replace(/kuket$/, "kukuya")];
    }
    if (stem.endsWith("kuka")) {
        return [stem, stem.replace(/kuka$/, "kukuya")];
    }
    if (stem.endsWith("kukat")) {
        return [stem, stem.replace(/kukat$/, "kukuya")];
    }
    if (stem.endsWith("kukutiwit")) {
        return [stem, stem.replace(/kukutiwit$/, "kukuya")];
    }
    if (stem.endsWith("kukutuk")) {
        return [stem, stem.replace(/kukutuk$/, "kukuya")];
    }
    if (stem.endsWith("kukutuya")) {
        return [stem, stem.replace(/kukutuya$/, "kukuya")];
    }
    if (stem.endsWith("kukutuyat")) {
        return [stem, stem.replace(/kukutuyat$/, "kukuya")];
    }
    if (stem.endsWith("kukutuskia")) {
        return [stem, stem.replace(/kukutuskia$/, "kukuya")];
    }
    if (stem.endsWith("kukutuskiat")) {
        return [stem, stem.replace(/kukutuskiat$/, "kukuya")];
    }
    if (stem.endsWith("sesek")) {
        return [stem, stem.replace(/sesek$/, "seseya")];
    }
    if (stem.endsWith("seseski")) {
        return [stem, stem.replace(/seseski$/, "seseya")];
    }
    if (stem.endsWith("seseket")) {
        return [stem, stem.replace(/seseket$/, "seseya")];
    }
    if (stem.endsWith("seseka")) {
        return [stem, stem.replace(/seseka$/, "seseya")];
    }
    if (stem.endsWith("sesekat")) {
        return [stem, stem.replace(/sesekat$/, "seseya")];
    }
    if (stem.endsWith("sesesket")) {
        return [stem, stem.replace(/sesesket$/, "seseya")];
    }
    if (stem.endsWith("seseska")) {
        return [stem, stem.replace(/seseska$/, "seseya")];
    }
    if (stem.endsWith("seseskat")) {
        return [stem, stem.replace(/seseskat$/, "seseya")];
    }
    if (stem.endsWith("sesestiwit")) {
        return [stem, stem.replace(/sesestiwit$/, "seseya")];
    }
    if (stem.endsWith("sesetiwit")) {
        return [stem, stem.replace(/sesetiwit$/, "seseya")];
    }
    if (stem.endsWith("sesestuk")) {
        return [stem, stem.replace(/sesestuk$/, "seseya")];
    }
    if (stem.endsWith("sesetuk")) {
        return [stem, stem.replace(/sesetuk$/, "seseya")];
    }
    if (stem.endsWith("sesestuya")) {
        return [stem, stem.replace(/sesestuya$/, "seseya")];
    }
    if (stem.endsWith("sesetuya")) {
        return [stem, stem.replace(/sesetuya$/, "seseya")];
    }
    if (stem.endsWith("sesestuyat")) {
        return [stem, stem.replace(/sesestuyat$/, "seseya")];
    }
    if (stem.endsWith("sesetuyat")) {
        return [stem, stem.replace(/sesetuyat$/, "seseya")];
    }
    if (stem.endsWith("sesestuskia")) {
        return [stem, stem.replace(/sesestuskia$/, "seseya")];
    }
    if (stem.endsWith("sesetuskia")) {
        return [stem, stem.replace(/sesetuskia$/, "seseya")];
    }
    if (stem.endsWith("sesestuskiat")) {
        return [stem, stem.replace(/sesestuskiat$/, "seseya")];
    }
    if (stem.endsWith("sesetuskiat")) {
        return [stem, stem.replace(/sesetuskiat$/, "seseya")];
    }
    if (stem.endsWith("kumik")) {
        return [stem, stem.replace(/kumik$/, "kumiya")];
    }
    if (stem.endsWith("kumiket")) {
        return [stem, stem.replace(/kumiket$/, "kumiya")];
    }
    if (stem.endsWith("kumika")) {
        return [stem, stem.replace(/kumika$/, "kumiya")];
    }
    if (stem.endsWith("kumikat")) {
        return [stem, stem.replace(/kumikat$/, "kumiya")];
    }
    if (stem.endsWith("kumitiwit")) {
        return [stem, stem.replace(/kumitiwit$/, "kumiya")];
    }
    if (stem.endsWith("kumituk")) {
        return [stem, stem.replace(/kumituk$/, "kumiya")];
    }
    if (stem.endsWith("kumituya")) {
        return [stem, stem.replace(/kumituya$/, "kumiya")];
    }
    if (stem.endsWith("kumituyat")) {
        return [stem, stem.replace(/kumituyat$/, "kumiya")];
    }
    if (stem.endsWith("kumituskia")) {
        return [stem, stem.replace(/kumituskia$/, "kumiya")];
    }
    if (stem.endsWith("kumituskiat")) {
        return [stem, stem.replace(/kumituskiat$/, "kumiya")];
    }
    if (stem.endsWith("tutunik")) {
        return [stem, stem.replace(/tutunik$/, "tutuniya")];
    }
    if (stem.endsWith("tutuniket")) {
        return [stem, stem.replace(/tutuniket$/, "tutuniya")];
    }
    if (stem.endsWith("tutunika")) {
        return [stem, stem.replace(/tutunika$/, "tutuniya")];
    }
    if (stem.endsWith("tutunikat")) {
        return [stem, stem.replace(/tutunikat$/, "tutuniya")];
    }
    if (stem.endsWith("tutunitiwit")) {
        return [stem, stem.replace(/tutunitiwit$/, "tutuniya")];
    }
    if (stem.endsWith("tutunituk")) {
        return [stem, stem.replace(/tutunituk$/, "tutuniya")];
    }
    if (stem.endsWith("tutunituya")) {
        return [stem, stem.replace(/tutunituya$/, "tutuniya")];
    }
    if (stem.endsWith("tutunituyat")) {
        return [stem, stem.replace(/tutunituyat$/, "tutuniya")];
    }
    if (stem.endsWith("tutunituskia")) {
        return [stem, stem.replace(/tutunituskia$/, "tutuniya")];
    }
    if (stem.endsWith("tutunituskiat")) {
        return [stem, stem.replace(/tutunituskiat$/, "tutuniya")];
    }
    if (stem.endsWith("tzitzikak")) {
        return [stem, stem.replace(/tzitzikak$/, "tzitzikaya")];
    }
    if (stem.endsWith("tzitzikaket")) {
        return [stem, stem.replace(/tzitzikaket$/, "tzitzikaya")];
    }
    if (stem.endsWith("tzitzikaka")) {
        return [stem, stem.replace(/tzitzikaka$/, "tzitzikaya")];
    }
    if (stem.endsWith("tzitzikakat")) {
        return [stem, stem.replace(/tzitzikakat$/, "tzitzikaya")];
    }
    if (stem.endsWith("pelik")) {
        return [stem, stem.replace(/pelik$/, "peliya")];
    }
    if (stem.endsWith("peliket")) {
        return [stem, stem.replace(/peliket$/, "peliya")];
    }
    if (stem.endsWith("pelika")) {
        return [stem, stem.replace(/pelika$/, "peliya")];
    }
    if (stem.endsWith("pelikat")) {
        return [stem, stem.replace(/pelikat$/, "peliya")];
    }
    if (stem.endsWith("pelitiwit")) {
        return [stem, stem.replace(/pelitiwit$/, "peliya")];
    }
    if (stem.endsWith("pelituk")) {
        return [stem, stem.replace(/pelituk$/, "peliya")];
    }
    if (stem.endsWith("pelituya")) {
        return [stem, stem.replace(/pelituya$/, "peliya")];
    }
    if (stem.endsWith("pelituyat")) {
        return [stem, stem.replace(/pelituyat$/, "peliya")];
    }
    if (stem.endsWith("pelituskia")) {
        return [stem, stem.replace(/pelituskia$/, "peliya")];
    }
    if (stem.endsWith("pelituskiat")) {
        return [stem, stem.replace(/pelituskiat$/, "peliya")];
    }
    if (stem.endsWith("wek")) {
        return [stem, stem.replace(/wek$/, "weya")];
    }
    if (stem.endsWith("weket")) {
        return [stem, stem.replace(/weket$/, "weya")];
    }
    if (stem.endsWith("weka")) {
        return [stem, stem.replace(/weka$/, "weya")];
    }
    if (stem.endsWith("wekat")) {
        return [stem, stem.replace(/wekat$/, "weya")];
    }
    if (stem.endsWith("wetiwit")) {
        return [stem, stem.replace(/wetiwit$/, "weya")];
    }
    if (stem.endsWith("wetuk")) {
        return [stem, stem.replace(/wetuk$/, "weya")];
    }
    if (stem.endsWith("wetuya")) {
        return [stem, stem.replace(/wetuya$/, "weya")];
    }
    if (stem.endsWith("wetuyat")) {
        return [stem, stem.replace(/wetuyat$/, "weya")];
    }
    if (stem.endsWith("wetuskia")) {
        return [stem, stem.replace(/wetuskia$/, "weya")];
    }
    if (stem.endsWith("wetuskiat")) {
        return [stem, stem.replace(/wetuskiat$/, "weya")];
    }
    if (stem.endsWith("manik")) {
        return [stem, stem.replace(/manik$/, "maniya")];
    }
    if (stem.endsWith("maniket")) {
        return [stem, stem.replace(/maniket$/, "maniya")];
    }
    if (stem.endsWith("manika")) {
        return [stem, stem.replace(/manika$/, "maniya")];
    }
    if (stem.endsWith("manikat")) {
        return [stem, stem.replace(/manikat$/, "maniya")];
    }
    if (stem.endsWith("manitiwit")) {
        return [stem, stem.replace(/manitiwit$/, "maniya")];
    }
    if (stem.endsWith("manituk")) {
        return [stem, stem.replace(/manituk$/, "maniya")];
    }
    if (stem.endsWith("manituya")) {
        return [stem, stem.replace(/manituya$/, "maniya")];
    }
    if (stem.endsWith("manituyat")) {
        return [stem, stem.replace(/manituyat$/, "maniya")];
    }
    if (stem.endsWith("manituskia")) {
        return [stem, stem.replace(/manituskia$/, "maniya")];
    }
    if (stem.endsWith("manituskiat")) {
        return [stem, stem.replace(/manituskiat$/, "maniya")];
    }
    if (stem === "tali") {
        return [`${stem}a`];
    }
    if (stem.endsWith("tatalia")) {
        return [stem.replace(/^ta/, "")];
    }
    if (stem.endsWith("ltuya")) {
        return [stem, `${stem.slice(0, -4)}i`];
    }
    if (stem.endsWith("ltuskia")) {
        return [stem, `${stem.slice(0, -6)}i`];
    }
    if (stem.endsWith("shki")) {
        const base = stem.slice(0, -3);
        return [stem, `${base}ya`, `${base}a`, `${base}yi`, stem.replace(/shki$/, "yi")];
    }
    if (stem.endsWith("nki")) {
        const base = stem.slice(0, -3);
        return [stem, `${base}na`, `${base}mi`, `${base}ma`];
    }
    if (stem.endsWith("tzki")) {
        const base = stem.slice(0, -3);
        const variants = [stem, `${base}ta`, `${base}ita`, `${base}tza`, `${stem.slice(0, -2)}i`];
        if (base.length <= 1) {
            variants.push("ita");
        }
        return variants;
    }
    if (stem.endsWith("nket")) {
        const base = stem.slice(0, -4);
        return [stem, `${base}ni`, `${base}mi`, `${base}ma`];
    }
    if (stem.endsWith("nka")) {
        const base = stem.slice(0, -3);
        return [stem, `${base}ni`, `${base}mi`, `${base}ma`];
    }
    if (stem.endsWith("ntuk")) {
        const base = stem.slice(0, -4);
        return [stem, `${base}ni`, `${base}mi`, `${base}ma`];
    }
    if (stem.endsWith("yatiwit")) {
        return [stem, stem.replace(/yatiwit$/, "yaya")];
    }
    if (stem.endsWith("utaktiwit")) {
        return [stem, stem.replace(/utaktiwit$/, "utaki")];
    }
    if (stem.endsWith("waktiwit")) {
        return [stem, stem.replace(/waktiwit$/, "waki")];
    }
    if (stem.endsWith("watiwit")) {
        return [stem, stem.replace(/watiwit$/, "waya")];
    }
    if (stem.endsWith("titiwit")) {
        return [stem, stem.replace(/titiwit$/, "tiya")];
    }
    if (stem.endsWith("chitiwit")) {
        return [stem, stem.replace(/chitiwit$/, "chiya")];
    }
    if (stem.endsWith("tiwit")) {
        return [stem, stem.replace(/tiwit$/, "tiya")];
    }
    if (stem.endsWith("titiya")) {
        return [stem, stem.replace(/titiya$/, "tiya")];
    }
    if (stem.endsWith("chituyat")) {
        return [stem, stem.replace(/chituyat$/, "chiya")];
    }
    if (stem.endsWith("tituyat")) {
        return [stem, stem.replace(/tituyat$/, "tiya")];
    }
    if (stem.endsWith("chituskia")) {
        return [stem, stem.replace(/chituskia$/, "chiya")];
    }
    if (stem.endsWith("tituskia")) {
        return [stem, stem.replace(/tituskia$/, "tiya")];
    }
    if (stem.endsWith("yatuskia")) {
        return [stem, stem.replace(/yatuskia$/, "yaya")];
    }
    if (stem.endsWith("tituskiat")) {
        return [stem, stem.replace(/tituskiat$/, "tiya")];
    }
    if (stem.endsWith("chituskiat")) {
        return [stem, stem.replace(/chituskiat$/, "chiya")];
    }
    if (stem.endsWith("yatuskiat")) {
        return [stem, stem.replace(/yatuskiat$/, "yaya")];
    }
    if (stem.endsWith("tituk")) {
        return [stem, stem.replace(/tituk$/, "tiya")];
    }
    if (stem.endsWith("yatuk")) {
        return [stem, stem.replace(/yatuk$/, "yaya")];
    }
    if (stem.endsWith("watuk")) {
        return [stem, stem.replace(/watuk$/, "waya")];
    }
    if (stem.endsWith("chituk")) {
        return [stem, stem.replace(/chituk$/, "chiya")];
    }
    if (stem.endsWith("tuk")) {
        const base = stem.slice(0, -3);
        return [stem, `${base}i`, `${base}a`, `${stem}i`];
    }
    if (stem.endsWith("nkat")) {
        const base = stem.slice(0, -4);
        return [stem, `${base}ni`, `${base}mi`, `${base}ma`];
    }
    if (stem.endsWith("skat")) {
        const base = stem.slice(0, -4);
        return [stem, `${base}si`, `${base}se`];
    }
    if (stem.endsWith("wkat")) {
        const base = stem.slice(0, -4);
        return [stem, stem.replace(/wkat$/, "waya"), `${base}wi`];
    }
    if (stem.endsWith("sket")) {
        const base = stem.slice(0, -4);
        return [stem, `${base}si`, `${base}se`];
    }
    if (stem.endsWith("wket")) {
        const base = stem.slice(0, -4);
        return [stem, stem.replace(/wket$/, "waya"), `${base}wi`];
    }
    if (stem.endsWith("snekit")) {
        return [stem, "ita"];
    }
    if (stem.endsWith("ska")) {
        return [stem, `${stem.slice(0, -2)}i`, `${stem.slice(0, -2)}e`];
    }
    if (stem.endsWith("waka")) {
        return [stem, stem.replace(/waka$/, "waya")];
    }
    if (stem.endsWith("wka")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("ski")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("wki")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("chki")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("chka")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("yaket")) {
        return [stem, stem.replace(/yaket$/, "yaya")];
    }
    if (stem.endsWith("yaka")) {
        return [stem, stem.replace(/yaka$/, "yaya")];
    }
    if (stem.endsWith("yak")) {
        return [stem, stem.replace(/yak$/, "yaya")];
    }
    if (stem.endsWith("wak")) {
        return [stem, stem.replace(/wak$/, "waya")];
    }
    if (stem.endsWith("wik")) {
        return [stem, stem.slice(0, -1)];
    }
    if (stem.endsWith("tki")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("tik")) {
        return [stem, `${stem.slice(0, -1)}ya`];
    }
    if (stem.endsWith("chik")) {
        return [stem, `${stem}i`, stem.replace(/chik$/, "chiya")];
    }
    if (stem.endsWith("chika")) {
        return [stem, stem.replace(/chika$/, "chiya")];
    }
    if (stem.endsWith("chikat")) {
        return [stem, stem.replace(/chikat$/, "chiya")];
    }
    if (stem.endsWith("kati")) {
        return [stem, `${stem.slice(0, -2)}`];
    }
    if (stem.endsWith("katya")) {
        return [stem, `${stem.slice(0, -3)}`];
    }
    if (stem.endsWith("yakat")) {
        return [stem, stem.replace(/yakat$/, "yaya")];
    }
    if (stem.endsWith("wakat")) {
        return [stem, stem.replace(/wakat$/, "waya")];
    }
    if (stem.endsWith("tikat")) {
        return [stem, stem.replace(/tikat$/, "tiya"), stem.replace(/tikat$/, "tika")];
    }
    if (stem.endsWith("wakka")) {
        return [stem, stem.replace(/wakka$/, "waki")];
    }
    if (stem.endsWith("wakkat")) {
        return [stem, stem.replace(/wakkat$/, "waki")];
    }
    if (stem.endsWith("waktiwit")) {
        return [stem, stem.replace(/waktiwit$/, "waki")];
    }
    if (stem.endsWith("waktuk")) {
        return [stem, stem.replace(/waktuk$/, "waki")];
    }
    if (stem.endsWith("waktuya")) {
        return [stem, stem.replace(/waktuya$/, "waki")];
    }
    if (stem.endsWith("waktuyat")) {
        return [stem, stem.replace(/waktuyat$/, "waki")];
    }
    if (stem.endsWith("waktuskia")) {
        return [stem, stem.replace(/waktuskia$/, "waki")];
    }
    if (stem.endsWith("waktuskiat")) {
        return [stem, stem.replace(/waktuskiat$/, "waki")];
    }
    if (stem.endsWith("utakka")) {
        return [stem, stem.replace(/utakka$/, "utaki")];
    }
    if (stem.endsWith("utakkat")) {
        return [stem, stem.replace(/utakkat$/, "utaki")];
    }
    if (stem.endsWith("utaktiwit")) {
        return [stem, stem.replace(/utaktiwit$/, "utaki")];
    }
    if (stem.endsWith("utaktuk")) {
        return [stem, stem.replace(/utaktuk$/, "utaki")];
    }
    if (stem.endsWith("utaktuya")) {
        return [stem, stem.replace(/utaktuya$/, "utaki")];
    }
    if (stem.endsWith("utaktuyat")) {
        return [stem, stem.replace(/utaktuyat$/, "utaki")];
    }
    if (stem.endsWith("utaktuskia")) {
        return [stem, stem.replace(/utaktuskia$/, "utaki")];
    }
    if (stem.endsWith("utaktuskiat")) {
        return [stem, stem.replace(/utaktuskiat$/, "utaki")];
    }
    if (stem.endsWith("kat")) {
        return [stem, `${stem.slice(0, -1)}`];
    }
    if (stem.endsWith("shkat")) {
        return [stem.slice(0, -1), `${stem.slice(0, -1)}a`, `${stem.slice(0, -1)}ya`];
    }
    if (stem.endsWith("shka")) {
        return [stem, `${stem.slice(0, -1)}ya`, `${stem.slice(0, -3)}yi`, stem.replace(/shka$/, "yi")];
    }
    if (stem.endsWith("shtuk")) {
        return [stem, `${stem.slice(0, -5)}yi`, stem.replace(/shtuk$/, "yi")];
    }
    if (stem.endsWith("shtuya")) {
        return [stem, `${stem.slice(0, -6)}yi`, stem.replace(/shtuya$/, "yi")];
    }
    if (stem.endsWith("shtuskia")) {
        return [stem, `${stem.slice(0, -8)}yi`, stem.replace(/shtuskia$/, "yi")];
    }
    if (stem.endsWith("tika")) {
        return [stem, stem.replace(/tika$/, "tiya")];
    }
    if (stem.endsWith("tikat")) {
        return [stem, stem.replace(/tikat$/, "tiya"), stem.replace(/tikat$/, "tika")];
    }
    if (stem.endsWith("tiket")) {
        return [stem, stem.replace(/tiket$/, "tiya")];
    }
    if (stem.endsWith("tituk")) {
        return [stem, stem.replace(/tituk$/, "tiya")];
    }
    if (stem.endsWith("tituya")) {
        return [stem, stem.replace(/tituya$/, "tiya")];
    }
    if (stem.endsWith("yatuya")) {
        return [stem, stem.replace(/yatuya$/, "yaya")];
    }
    if (stem.endsWith("watuya")) {
        return [stem, stem.replace(/watuya$/, "waya")];
    }
    if (stem.endsWith("yatuyat")) {
        return [stem, stem.replace(/yatuyat$/, "yaya")];
    }
    if (stem.endsWith("watuyat")) {
        return [stem, stem.replace(/watuyat$/, "waya")];
    }
    if (stem.endsWith("watuskia")) {
        return [stem, stem.replace(/watuskia$/, "waya")];
    }
    if (stem.endsWith("watuskiat")) {
        return [stem, stem.replace(/watuskiat$/, "waya")];
    }
    if (stem.endsWith("chituya")) {
        return [stem, stem.replace(/chituya$/, "chiya")];
    }
    if (stem.endsWith("tituskia")) {
        return [stem, stem.replace(/tituskia$/, "tiya")];
    }
    if (stem.endsWith("katka")) {
        return [stem, stem.replace(/katka$/, "kati")];
    }
    if (stem.endsWith("kattuya")) {
        return [stem, stem.replace(/kattuya$/, "kati")];
    }
    if (stem.endsWith("kattuskia")) {
        return [stem, stem.replace(/kattuskia$/, "kati")];
    }
    if (stem.endsWith("chtuya")) {
        return [stem, stem.replace(/chtuya$/, "chi")];
    }
    if (stem.endsWith("chtuskia")) {
        return [stem, stem.replace(/chtuskia$/, "chi")];
    }
    if (stem.endsWith("sneki")) {
        return [stem, `${stem.slice(0, -5)}ita`];
    }
    if (stem.endsWith("tza")) {
        return [stem, `${stem.slice(0, -1)}i`];
    }
    if (stem.endsWith("tzi")) {
        return [stem, stem.replace(/tzi$/, "ta")];
    }
    if (stem.endsWith("taski")) {
        return [stem, stem.replace(/taski$/, "taya")];
    }
    if (stem.endsWith("tasket")) {
        return [stem, stem.replace(/tasket$/, "taya")];
    }
    if (stem.endsWith("taka")) {
        return [stem, `${stem}ti`];
    }
    if (stem.endsWith("tak") && !stem.endsWith("taka")) {
        return [stem, stem.replace(/tak$/, "taya")];
    }
    if (stem.endsWith("zka")) {
        return [stem, `${stem.slice(0, -2)}i`];
    }
    if (stem.endsWith("ztuya")) {
        return [stem, `${stem.slice(0, -4)}i`];
    }
    if (stem.endsWith("ztuskia")) {
        return [stem, `${stem.slice(0, -6)}i`];
    }
    if (stem.endsWith("s")) {
        return [`${stem}a`, `${stem}e`, `${stem}i`];
    }
    if (stem.endsWith("w")) {
        return [`${stem}i`, `${stem}a`];
    }
    if (stem.endsWith("sh")) {
        return [`${stem}a`, `${stem.slice(0, -2)}ya`, `${stem.slice(0, -2)}yi`];
    }
    if (stem.endsWith("ch")) {
        return [`${stem}i`, `${stem}a`];
    }
    if (stem.endsWith("tz")) {
        return [`${stem}i`, `${stem}a`, stem.replace(/tz$/, "ta")];
    }
    if (stem.endsWith("l")) {
        return [`${stem}i`, `${stem}a`];
    }
    if (stem.endsWith("in")) {
        return [
            `${stem}i`,
            `${stem}a`,
            `${stem.slice(0, -1)}mi`,
            `${stem.slice(0, -1)}ma`,
        ];
    }
    if (stem.endsWith("n")) {
        return [`${stem}a`, `${stem}i`, `${stem.slice(0, -1)}ma`, `${stem.slice(0, -1)}mi`];
    }
    if (stem.endsWith("na")) {
        return [stem, `${stem.slice(0, -2)}ma`, `${stem.slice(0, -1)}i`];
    }
    if (stem.endsWith("t")) {
        return [`${stem}a`, `${stem}i`, `${stem}ya`];
    }
    if (stem.endsWith("wa")) {
        return [stem, `${stem.slice(0, -1)}i`];
    }
    if (stem.endsWith("ni")) {
        return [stem, `${stem.slice(0, -2)}mi`];
    }
    if (stem.endsWith("lis")) {
        return [`${stem.slice(0, -1)}a`];
    }
    if (stem.endsWith("ela")) {
        return [stem, `${stem.slice(0, -1)}i`];
    }
    if (stem.endsWith("ki")) {
        return [stem, `${stem.slice(0, -2)}kwi`, `${stem.slice(0, -2)}a`];
    }
    if (stem === "li") {
        return ["talia"];
    }
    if (stem.endsWith("lia") && !stem.endsWith("talia")) {
        return [`${stem.slice(0, -3)}talia`];
    }
    if (stem === "ma" || stem === "mi") {
        return [`te${stem}`];
    }
    if (stem.endsWith("us")) {
        return [`${stem.slice(0, -1)}a`];
    }
    if (stem.endsWith("mu")) {
        return [stem, `${stem}a`];
    }
    if (stem.endsWith("ni")) {
        return [stem, `${stem}a`];
    }
    if (VOWEL_END_RE.test(stem)) {
        return [stem];
    }
    if (stem.endsWith("k")) {
        return [`${stem}i`, `${stem}wi`, `${stem}wa`, `${stem}a`];
    }
    if (stem.endsWith("j")) {
        const base = stem.slice(0, -1);
        const alternates = new Set();
        if (base) {
            alternates.add(base);
            alternates.add(`${base}wi`);
            alternates.add(`${base}wa`);
        }
        if (base.endsWith("i") || base.endsWith("u")) {
            alternates.add(`${base}a`);
            return Array.from(alternates);
        }
        alternates.add(`${base}ia`);
        return Array.from(alternates);
    }
    const candidates = new Set();
    if (stem.endsWith("itz")) {
        candidates.add(`${stem.slice(0, -2)}ta`);
    }
    candidates.add(`${stem}a`);
    return Array.from(candidates);
}

function deriveVerbstemCandidatesFromForm(rawValue) {
    const rawLower = String(rawValue || "").toLowerCase();
    const isImperativeForm = rawLower.startsWith("ma ") || rawLower.startsWith("shi");
    let normalized = normalizeFormSearchValue(rawValue)
        .replace(/^ma\s+/, "")
        .replace(/^-+/, "");
    const originalNormalized = normalized;
    if (!normalized || normalized.includes("—")) {
        return { hasObjectPrefix: false, stems: [] };
    }
    if (normalized.startsWith("shi")) {
        normalized = normalized.slice(3);
    }
    if (normalized.startsWith("temu")) {
        normalized = `temu-${normalized.slice(4)}`;
    }
    let hasObjectPrefix = false;
    let hadSubjectPrefix = false;
    let objectPrefixValue = "";
    let objectRestValue = "";
    let isObjectPrefixAmbiguous = false;
    let preObjectNormalized = normalized;
    let objectInfo = stripLeadingPrefix(normalized, FORM_SEARCH_OBJECT_PREFIXES);
    if (objectInfo.prefix) {
        objectInfo = normalizeObjectPrefixRest(objectInfo.prefix, objectInfo.rest);
        hasObjectPrefix = true;
        objectPrefixValue = objectInfo.prefix;
        objectRestValue = objectInfo.rest;
        normalized = objectInfo.rest;
    } else {
        const subjectInfo = stripLeadingPrefix(normalized, FORM_SEARCH_SUBJECT_PREFIXES);
        hadSubjectPrefix = !!subjectInfo.prefix;
        normalized = subjectInfo.rest;
        preObjectNormalized = normalized;
        objectInfo = stripLeadingPrefix(normalized, FORM_SEARCH_OBJECT_PREFIXES);
        if (objectInfo.prefix) {
            objectInfo = normalizeObjectPrefixRest(objectInfo.prefix, objectInfo.rest);
            hasObjectPrefix = true;
            objectPrefixValue = objectInfo.prefix;
            objectRestValue = objectInfo.rest;
            normalized = objectInfo.rest;
        }
    }
    const restStartsWithConsonant = objectRestValue
        && !VOWEL_START_RE.test(objectRestValue);
    if (
        objectPrefixValue
        && ((OBJECT_MARKERS.has(objectPrefixValue) && objectRestValue.length >= 4)
            || restStartsWithConsonant)
    ) {
        isObjectPrefixAmbiguous = true;
        hasObjectPrefix = false;
    }
    const candidates = new Set();
    const seedForms = [normalized];
    if (hadSubjectPrefix && originalNormalized !== normalized) {
        seedForms.push(originalNormalized);
    }
    if (isObjectPrefixAmbiguous) {
        if (preObjectNormalized !== normalized) {
            seedForms.push(preObjectNormalized);
        }
        if (originalNormalized !== normalized) {
            seedForms.push(originalNormalized);
        }
    }
    if (normalized.startsWith("m") && VOWEL_START_RE.test(normalized.slice(1))) {
        seedForms.push(normalized.slice(1));
    }
    if (normalized.startsWith("n") && VOWEL_START_RE.test(normalized.slice(1))) {
        seedForms.push(normalized.slice(1));
    }
    if (normalized.startsWith("t") && VOWEL_START_RE.test(normalized.slice(1))) {
        seedForms.push(normalized.slice(1));
    }
    if (objectPrefixValue === "tech" && VOWEL_START_RE.test(objectRestValue)) {
        seedForms.push(`ch${objectRestValue}`);
    }
    if (objectPrefixValue === "metzin" && VOWEL_START_RE.test(objectRestValue)) {
        seedForms.push(`in${objectRestValue}`);
    }
    if (objectPrefixValue === "k" && VOWEL_START_RE.test(objectRestValue)) {
        seedForms.push(`k${objectRestValue}`);
    }
    if (objectPrefixValue === "ki") {
        seedForms.push(`ki${objectRestValue}`);
    }
    seedForms.forEach((seed) => {
        let working = seed;
        const indirectInfo = stripLeadingPrefix(working, OBJECT_MARKERS.has(working.slice(0, 2))
            ? Array.from(OBJECT_MARKERS)
            : ["ta", "te", "mu"]);
        const indirectVariants = [];
        if (indirectInfo.prefix) {
            const combined = `${indirectInfo.prefix}${indirectInfo.rest}`;
            if (
                indirectInfo.prefix === "te"
                && indirectInfo.rest.startsWith("mu")
            ) {
                indirectVariants.push(combined);
            } else if (
                indirectInfo.prefix === "ta"
                && indirectInfo.rest.startsWith("li")
            ) {
                indirectVariants.push(combined);
            } else if (indirectInfo.rest.length >= 4) {
                indirectVariants.push(indirectInfo.rest);
                indirectVariants.push(combined);
                hasObjectPrefix = true;
            } else {
                indirectVariants.push(combined);
            }
        } else {
            indirectVariants.push(working);
        }
        indirectVariants.forEach((indirectVariant) => {
            const directionalInfo = stripLeadingPrefix(indirectVariant, DIRECTIONAL_PREFIXES.concat(["al"]));
            const directionalVariants = directionalInfo.prefix
                ? [directionalInfo.rest, `${directionalInfo.prefix}${directionalInfo.rest}`]
                : [directionalInfo.rest];
            directionalVariants.forEach((variant) => {
            const hasKnownSuffix = FORM_SEARCH_TENSE_SUFFIXES.some((suffix) => (
                suffix && variant.endsWith(suffix)
            ));
            const avoidClassBDrop = variant.endsWith("sneki") || variant.endsWith("snekit");
            let adjusted = variant;
            if (!hasKnownSuffix && adjusted.endsWith("t") && adjusted.length > 1) {
                adjusted = adjusted.slice(0, -1);
            }
            const suffixStripped = getFormSearchSuffixCandidates(adjusted);
            if (isImperativeForm && adjusted.endsWith("ni") && !suffixStripped.includes(adjusted)) {
                suffixStripped.push(adjusted);
            }
                suffixStripped.forEach((base) => {
                let baseStem = base;
                if (!avoidClassBDrop && baseStem.endsWith("ki")) {
                    candidates.add(baseStem.slice(0, -2));
                }
            if (!avoidClassBDrop && baseStem.endsWith("k")) {
                candidates.add(baseStem.slice(0, -1));
            }
            if (baseStem.endsWith("kik")) {
                candidates.add(baseStem.slice(0, -1));
            }
                let skipBaseStem = false;
                if (hasObjectPrefix) {
                    if (baseStem.startsWith("mia")) {
                        candidates.add(`ta${baseStem}`);
                        skipBaseStem = true;
                    }
                    if (baseStem.startsWith("wia")) {
                        candidates.add(`ta${baseStem}`);
                        skipBaseStem = true;
                    }
                    if (baseStem.startsWith("jchiw")) {
                        candidates.add(`ta${baseStem}`);
                        skipBaseStem = true;
                    }
                }
                if (!skipBaseStem) {
                    candidates.add(baseStem);
                    if (
                        (hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous)
                        && baseStem
                        && !VOWEL_START_RE.test(baseStem)
                    ) {
                        candidates.add(`i${baseStem}`);
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("ki")) {
                        candidates.add(baseStem.slice(1));
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("m")) {
                        candidates.add(baseStem.slice(1));
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("w")) {
                        candidates.add(`k${baseStem}`);
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("u")) {
                        candidates.add(`mu${baseStem}`);
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("mu")) {
                        candidates.add(`mu${baseStem}`);
                    }
                    if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && baseStem.startsWith("ti")) {
                        candidates.add(baseStem.slice(1));
                    }
                }
                });
            });
        });
    });
    const restored = new Set();
    candidates.forEach((stem) => {
        restoreVowelStems(stem).forEach((entry) => {
            if (VOWEL_END_RE.test(entry)) {
                restored.add(entry);
                if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && !VOWEL_START_RE.test(entry)) {
                    restored.add(`i${entry}`);
                }
                if ((hasObjectPrefix || hadSubjectPrefix || isObjectPrefixAmbiguous) && entry.startsWith("w")) {
                    restored.add(`kw${entry.slice(1)}`);
                }
            }
        });
    });
    const list = Array.from(restored);
    const expanded = new Set(list);
    list.forEach((stem) => {
        if (FORM_SEARCH_OPTIONAL_TRANSITIVE_STEMS.has(stem)) {
            expanded.add(`(-)${stem}`);
        }
        if (FORM_SEARCH_TEN_PREFIX_STEMS.has(stem)) {
            expanded.add(`ten-${stem}`);
        }
        if (stem.startsWith("lx")) {
            expanded.add("/lx");
        }
    });
    if (
        rawLower.includes("witz")
        || rawLower.includes("kwit")
        || rawLower.includes("witk")
        || rawLower.includes("witt")
    ) {
        expanded.add("witz");
    }
    if (
        rawLower.includes("kink")
        || rawLower.includes("kinti")
        || rawLower.includes("kintuk")
        || rawLower.includes("kintuya")
        || rawLower.includes("kintuskia")
    ) {
        expanded.add("ina");
    }
    if (
        rawLower.includes("lki")
        || rawLower.includes("lka")
        || rawLower.includes("ltu")
        || rawLower.includes("ltuya")
        || rawLower.includes("ltuskia")
    ) {
        expanded.add("/lx");
    }
    if (rawLower.includes("kyu") || rawLower.includes("kya")) {
        expanded.add("yawi");
    }
    return {
        hasObjectPrefix,
        isObjectPrefixAmbiguous,
        stems: expanded.size ? Array.from(expanded) : (normalized ? [normalized] : []),
    };
}

function splitConjugationForms(value) {
    if (!value) {
        return [];
    }
    return String(value)
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.replace(/[()]/g, ""));
}

function getFormSearchTenses() {
    const base = getTenseOrderForMode(TENSE_MODE.verbo);
    const combined = [...base, ...PRETERITO_UNIVERSAL_ORDER];
    const seen = new Set();
    return combined.filter((entry) => {
        if (seen.has(entry)) {
            return false;
        }
        seen.add(entry);
        return true;
    });
}

function getFormSearchTenseLabel(tenseValue) {
    return TENSE_LABELS[tenseValue]
        || PRETERITO_UNIVERSAL_LABELS[tenseValue]
        || tenseValue;
}

function getCanonicalFormSearchStems(stems, query) {
    if (!Array.isArray(stems) || stems.length <= 1) {
        return stems || [];
    }
    const extraSuffixes = [
        "jketya",
        "jketi",
        "jketa",
        "jkwa",
        "jkwi",
        "jka",
        "jki",
        "kwi",
        "kwa",
        "ki",
    ];
    const suffixes = FORM_SEARCH_TENSE_SUFFIXES.filter(Boolean).concat(extraSuffixes);
    const reduced = new Set(stems);
    let changed = true;
    while (changed) {
        changed = false;
        Array.from(reduced).forEach((stem) => {
            suffixes.forEach((suffix) => {
                if (stem.endsWith(suffix)) {
                    const base = stem.slice(0, -suffix.length);
                    if (base && reduced.has(base)) {
                        reduced.delete(stem);
                        changed = true;
                    }
                }
            });
        });
    }
    const prefixCandidates = [
        "(-)",
        "imumu",
        "mumu",
        "imun",
        "mun",
        "imu",
        "in",
        "mu",
        "un",
        "i",
    ];
    const prefixReduced = new Set(reduced);
    prefixCandidates.forEach((prefix) => {
        Array.from(prefixReduced).forEach((stem) => {
            if (stem.startsWith(prefix)) {
                const base = stem.slice(prefix.length);
                if (base && prefixReduced.has(base)) {
                    prefixReduced.delete(stem);
                }
            }
        });
    });
    const reducedList = prefixReduced.size ? Array.from(prefixReduced) : Array.from(reduced);
    const normalizedQuery = normalizeFormSearchValue(query || "");
    if (!normalizedQuery) {
        return reducedList;
    }
    let core = normalizedQuery.replace(/^-+/, "");
    const subjectInfo = stripLeadingPrefix(core, FORM_SEARCH_SUBJECT_PREFIXES);
    core = subjectInfo.rest || core;
    const objectInfo = stripLeadingPrefix(core, FORM_SEARCH_OBJECT_PREFIXES);
    core = objectInfo.rest || core;
    const directionalInfo = stripLeadingPrefix(core, DIRECTIONAL_PREFIXES.concat(["al"]));
    core = directionalInfo.rest || core;
    suffixes.forEach((suffix) => {
        if (core.endsWith(suffix) && core.length > suffix.length) {
            core = core.slice(0, -suffix.length);
        }
    });
    if (!core) {
        return reducedList;
    }
    const baseCandidates = restoreVowelStems(core);
    const coreBases = baseCandidates.length ? baseCandidates : [core];
    let coreMatches = reducedList.filter((stem) => (
        coreBases.some((base) => stem.includes(base))
    ));
    if (core.endsWith("tij")) {
        const tiaMatches = coreMatches.filter((stem) => stem.endsWith("tia"));
        if (tiaMatches.length) {
            coreMatches = tiaMatches;
        }
    }
    return coreMatches.length ? coreMatches : reducedList;
}

function renderFormSearchResults() {
    const container = document.getElementById("form-search-results");
    if (!container) {
        return;
    }
    const input = getFormSearchInput();
    const query = normalizeFormSearchValue(input?.value || "");
    container.innerHTML = "";
    if (!query) {
        container.classList.add("is-hidden");
        return;
    }
    const stemGuess = deriveVerbstemCandidatesFromForm(query);
    const stemOptions = filterFormSearchStemsToKnownVerbs(
        stemGuess.stems,
        { hasObjectPrefix: stemGuess.hasObjectPrefix, allowBoth: stemGuess.isObjectPrefixAmbiguous }
    );
    if (stemOptions.length) {
        const canonicalStems = getCanonicalFormSearchStems(stemOptions, query);
        const stemLine = document.createElement("div");
        stemLine.className = "form-search-results__summary";
        const prefix = stemGuess.hasObjectPrefix ? "-" : "";
        const formatStem = (stem) => {
            if (stem.startsWith("tajchi")) {
                return `taj-chi${stem.slice(6)}`;
            }
            return stem;
        };
        const formattedStems = (canonicalStems.length ? canonicalStems : stemOptions).map((stem) => {
            const cleanStem = formatStem(stem);
            const needsPrefix = prefix && !cleanStem.startsWith("(-)");
            return `${needsPrefix ? prefix : ""}${cleanStem}`;
        });
        stemLine.textContent = `Verbstem sugerido: ${formattedStems.join(" / ")}`;
        container.appendChild(stemLine);
    }
    const isActiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.active;
    if (!isActiveMode) {
        container.classList.remove("is-hidden");
        const message = document.createElement("div");
        message.className = "form-search-results__summary";
        message.textContent = "Solo disponible en verbo activo.";
        container.appendChild(message);
        return;
    }
    const verbEl = document.getElementById("verb");
    const rawVerb = verbEl ? getSearchInputBase(verbEl.value).trim() : "";
    if (!rawVerb) {
        container.classList.remove("is-hidden");
        const message = document.createElement("div");
        message.className = "form-search-results__summary";
        message.textContent = "Ingresa un verbo para buscar por forma.";
        container.appendChild(message);
        return;
    }
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const subjectSelections = getSubjectPersonSelections();
    const tenses = getFormSearchTenses();
    const matches = [];
    const seen = new Set();

    tenses.forEach((tenseValue) => {
        subjectSelections.forEach(({ selection }) => {
            objectPrefixes.forEach((objectPrefix) => {
                const result = generateWord({
                    silent: true,
                    skipTransitivityValidation: true,
                    override: {
                        verb: rawVerb,
                        tense: tenseValue,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                    },
                });
                if (!result || result.error || !result.result) {
                    return;
                }
                const { shouldMask } = getConjugationMaskState({
                    result,
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix,
                });
                if (shouldMask) {
                    return;
                }
                const forms = splitConjugationForms(result.result);
                const match = forms.find((form) => {
                    const normalized = normalizeFormSearchValue(form);
                    return normalized === query || normalized.includes(query);
                });
                if (!match) {
                    return;
                }
                const key = `${tenseValue}|${selection.subjectPrefix}|${selection.subjectSuffix}|${objectPrefix}|${match}`;
                if (seen.has(key)) {
                    return;
                }
                seen.add(key);
                matches.push({
                    tenseValue,
                    subject: selection,
                    objectPrefix,
                    value: match,
                });
            });
        });
    });

    container.classList.remove("is-hidden");
    if (!matches.length) {
        const message = document.createElement("div");
        message.className = "form-search-results__summary";
        message.textContent = "Sin coincidencias en verbos activos.";
        container.appendChild(message);
        return;
    }
    const summary = document.createElement("div");
    summary.className = "form-search-results__summary";
    summary.textContent = `Coincidencias: ${matches.length}`;
    container.appendChild(summary);

    const list = document.createElement("div");
    list.className = "form-search-results__list";
    matches.slice(0, FORM_SEARCH_RESULT_LIMIT).forEach((match) => {
        const item = document.createElement("div");
        item.className = "form-search-result";
        const meta = document.createElement("div");
        meta.className = "form-search-result__meta";
        const tenseLabel = document.createElement("span");
        tenseLabel.textContent = getFormSearchTenseLabel(match.tenseValue);
        const subjectLabel = document.createElement("span");
        const subjectSub = getSubjectSubLabel(match.subject, {
            isNawat: false,
            mode: "verb",
            tenseValue: match.tenseValue,
        });
        const objectLabel = match.objectPrefix
            ? getObjectComboLabel(match.objectPrefix, false)
            : "";
        subjectLabel.textContent = buildPersonSub({
            subjectLabel: subjectSub,
            objectLabel,
        });
        meta.appendChild(tenseLabel);
        meta.appendChild(subjectLabel);
        item.appendChild(meta);
        const value = document.createElement("div");
        value.className = "form-search-result__value";
        value.textContent = match.value;
        item.appendChild(value);
        list.appendChild(item);
    });
    container.appendChild(list);
}

function getPossessorPersonLabel(prefix) {
    const entry = POSSESSIVE_PREFIXES.find((option) => option.value === prefix);
    return entry ? entry.label : "";
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
    return isNawat ? (selection.labelNa || selection.labelEs) : selection.labelEs;
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
    if (invalidCharacters.length || invalidLetters.length) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTaFusion = verbMeta.isTaFusion;
    const isTransitiveVerb = verbMeta.isMarkedTransitive;
    const derivationIsTransitive = isValencyFilled(objectPrefix, verbMeta);
    if (isTaFusion && !verbMeta.isMarkedTransitive) {
        if (objectPrefix !== "") {
            return { error: true };
        }
    } else if (isTransitiveVerb) {
        if (!SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
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
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    const morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || objectPrefix;

    if (mode === INSTRUMENTIVO_MODE.absolutivo) {
        let options = getNonactiveDerivationOptions(verb, analysisVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: verbMeta.isYawi,
        });
        if (!options.length) {
            const derived = deriveNonactiveStem(verb, analysisVerb, {
                isTransitive: derivationIsTransitive,
                isYawi: verbMeta.isYawi,
            });
            if (derived) {
                options = [{ suffix: "default", stem: derived }];
            }
        }
        if (
            derivationIsTransitive
            && verb.endsWith("i")
            && !options.some((option) => option.suffix === "lu")
        ) {
            options.push({ suffix: "lu", stem: `${verb}lu` });
        }
        const forms = options.map((option) => {
            const analysisStem = directionalPrefix && option.stem.startsWith(directionalPrefix)
                ? option.stem.slice(directionalPrefix.length)
                : option.stem;
            const applied = applyMorphologyRules({
                subjectPrefix,
                objectPrefix: morphologyObjectPrefix,
                subjectSuffix: commonNumberSuffix,
                verb: option.stem,
                tense: "presente-habitual",
                analysisVerb: analysisStem,
                isYawi: false,
                directionalPrefix,
                hasSlashMarker: verbMeta.hasSlashMarker,
                isTaFusion: verbMeta.isTaFusion,
                indirectObjectMarker: verbMeta.indirectObjectMarker,
            });
            return `${applied.subjectPrefix}${applied.objectPrefix}${applied.verb}${applied.subjectSuffix}`;
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
        directionalPrefix,
        hasSlashMarker: verbMeta.hasSlashMarker,
        isTaFusion: verbMeta.isTaFusion,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
    });
    return {
        result: `${resolvedPossessivePrefix}${applied.objectPrefix}${applied.verb}${applied.subjectSuffix}`,
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
    if (invalidCharacters.length || invalidLetters.length) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (!isNonanimateSubject(subjectPrefix, subjectSuffix)) {
        return { error: true };
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTaFusion = verbMeta.isTaFusion;
    const isTransitiveVerb = verbMeta.isMarkedTransitive;
    const conjugationIsTransitive = isTransitiveVerb || isTaFusion;
    if (isTaFusion && !verbMeta.isMarkedTransitive) {
        if (objectPrefix !== "") {
            return { error: true };
        }
    } else if (isTransitiveVerb) {
        if (objectPrefix !== "mu") {
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
        directionalPrefix,
        suppletiveStemSet: getSuppletiveStemSet(verbMeta),
        hasSlashMarker: verbMeta.hasSlashMarker,
        isTaFusion: verbMeta.isTaFusion,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
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
    if (invalidCharacters.length || invalidLetters.length) {
        return { error: true };
    }
    let verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    let analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const resolvedMode = combinedMode || getCombinedMode();
    const isNonactive = resolvedMode === COMBINED_MODE.nonactive;
    const isTaFusion = verbMeta.isTaFusion;
    const isTransitiveVerb = verbMeta.isMarkedTransitive;
    const derivationIsTransitive = isValencyFilled(objectPrefix, verbMeta);
    if (isTaFusion && !verbMeta.isMarkedTransitive) {
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
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    const morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || objectPrefix;

    let stemVerb = verb;
    let stemAnalysis = analysisVerb;
    if (isNonactive) {
        const derived = getNonactiveStemForSelection(verb, analysisVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: verbMeta.isYawi,
        });
        stemVerb = derived;
        stemAnalysis = derived;
        if (directionalPrefix && derived.startsWith(directionalPrefix)) {
            stemAnalysis = derived.slice(directionalPrefix.length);
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

    const applied = applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: resolvedObjectPrefix,
        subjectSuffix: "",
        verb: stemVerb,
        tense: "imperfecto",
        analysisVerb: stemAnalysis,
        isYawi: isNonactive ? false : verbMeta.isYawi,
        directionalPrefix,
        hasSlashMarker: verbMeta.hasSlashMarker,
        isTaFusion: verbMeta.isTaFusion,
        indirectObjectMarker: verbMeta.indirectObjectMarker,
    });
    const predicate = `${applied.objectPrefix}${applied.verb}${applied.subjectSuffix}`;

    const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
    const isImpersonal = isNonactive && !PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix);
    const possessorPrefix = isImpersonal ? "" : possessorInput;

    return {
        result: `${possessorPrefix}${predicate}n`,
        possessorPrefix,
        isImpersonal,
    };
}

// === Nonactive Labels ===
function getNonactivePersonSub(prefix) {
    switch (prefix) {
        case "nech":
            return "yo";
        case "metz":
            return "tú";
        case "ki":
            return "él/ella/eso";
        case "tech":
            return "nosotros";
        case "metzin":
            return "ustedes";
        case "kin":
            return "ellos/ellas";
        default:
            return "";
    }
}

function getNonactivePersonCategory(prefix) {
    switch (prefix) {
        case "nech":
            return "1a persona singular";
        case "metz":
            return "2a persona singular";
        case "ki":
            return "3a persona singular";
        case "tech":
            return "1a persona plural";
        case "metzin":
            return "2a persona plural";
        case "kin":
            return "3a persona plural";
        default:
            return "";
    }
}

function getNonactiveGenericLabel(prefix) {
    switch (prefix) {
        case "ta":
            return "cosa genérica";
        case "te":
            return "persona genérica";
        case "mu":
            return "recíproco/reflexivo genérico";
        default:
            return "impersonal";
    }
}

function getNonactivePersonLabel(prefix, options = {}) {
    if (options.isIntransitive) {
        return "Evento impersonal";
    }
    if (options.isDirectGroup) {
        if (OBJECT_MARKERS.has(prefix)) {
            return getNonactiveGenericLabel(prefix);
        }
        return getNonactivePersonCategory(prefix) || "Paciente";
    }
    return getNonactiveGenericLabel(prefix);
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
    classFilter = null,
    allowAllClasses = false,
    isYawi = false,
    hasSlashMarker = false,
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
        classFilter,
        allowAllClasses,
        isYawi,
        hasSlashMarker,
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
    const analysisTarget = analysisVerb || verb;
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
            hasSlashMarker,
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

function isVerbValueAllowed(rawValue) {
    return getInvalidVerbCharacters(rawValue).length === 0 && getInvalidVerbLetters(rawValue).length === 0;
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
    if (!isVerbValueAllowed(nextValue)) {
        event.preventDefault();
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
    if (OBJECT_MARKERS.has(prefix)) {
        return prefix;
    }
    return `${prefix}${marker}`;
}

function getPreferredObjectPrefix(prefixes) {
    if (prefixes.includes("ki")) {
        return "ki";
    }
    return prefixes[0] || "";
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
        return allowedPrefixes[0] || "";
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
    const rules = TENSE_SUFFIX_RULES[tense];
    if (!rules || rules[subjectSuffix] === undefined) {
        return subjectSuffix;
    }
    return rules[subjectSuffix];
}

function startsWithAny(value, prefixes) {
    return prefixes.some((prefix) => value.startsWith(prefix));
}

function endsWithAny(value, suffixes) {
    return suffixes.some((suffix) => value.endsWith(suffix));
}

function getTrailingVowelCount(verb) {
    return getTrailingVowelCountFromSyllables(getSyllables(verb));
}

function getTotalVowelCount(verb) {
    return getTotalVowelCountFromSyllables(getSyllables(verb));
}

// === Preterito Universal ===
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
    const hasSlashMarker = options.hasSlashMarker === true;
    const sourceVerb = analysisVerb || verb;
    const nonRedupRoot = getNonReduplicatedRoot(sourceVerb);
    const isReduplicated = sourceVerb !== nonRedupRoot;
    const rootPlusYaBase = getRootPlusYaBase(sourceVerb, { isTransitive, isYawi });
    const isRootPlusYa = Boolean(rootPlusYaBase);
    const analysisRoot = isRootPlusYa ? rootPlusYaBase : nonRedupRoot;
    const redupRoot = isRootPlusYa ? getNonReduplicatedRoot(rootPlusYaBase) : analysisRoot;
    const isReduplicatedRootPlusYa = isRootPlusYa && redupRoot !== rootPlusYaBase;
    const syllables = getSyllables(analysisRoot, {
        analysis: true,
        assumeFinalV: true,
    });
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
    const endsWithKV = lastSyllable?.form === "CV" && lastOnset === "k";
    const endsWithKU = endsWithKV && lastNucleus === "u";
    const endsWithKWV = lastSyllable?.form === "CV" && lastOnset === "kw";
    const endsWithKWU = endsWithKWV && lastNucleus === "u";
    const endsWithKSeries = endsWithKV || endsWithKWV;
    const endsWithKSeriesU = endsWithKU || endsWithKWU;
    const endsWithKSeriesNoU = endsWithKSeries && !endsWithKSeriesU;
    const endsWithWV = lastSyllable?.form === "CV" && lastOnset === "w";
    const endsWithTV = lastSyllable?.form === "CV" && lastOnset === "t";
    const endsWithNV = lastSyllable?.form === "CV" && lastOnset === "n";
    const endsWithMV = lastSyllable?.form === "CV"
        && lastOnset === "m"
        && (lastNucleus === "a" || lastNucleus === "i");
    const endsWithU = isOpenSyllable(lastSyllable) && lastNucleus === "u";
    const endsWithTA = lastSyllable?.form === "CV" && lastOnset === "t" && lastNucleus === "a";
    const endsWithYA = lastSyllable?.form === "CV" && lastOnset === "y" && lastNucleus === "a";
    const endsWithTZA = lastSyllable?.form === "CV" && lastOnset === "tz" && lastNucleus === "a";
    const endsWithKA = lastSyllable?.form === "CV" && lastOnset === "k" && lastNucleus === "a";
    const endsWithVka = endsWithKA && penultimateSyllable?.form === "V";
    const endsWithCVka = endsWithKA && penultimateSyllable?.form === "CV";
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
    const matchesExactCVmV = (syls, startIndex = 0) => (
        syls.length - startIndex === 2
        && syls[startIndex]?.form === "CV"
        && syls[startIndex + 1]?.form === "CV"
        && syls[startIndex + 1]?.onset === "m"
    );
    const hasVnVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "V" || syllables[0]?.form === "Vj")
        && matchesExactVnV(syllables, 1);
    const hasCVnVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "CV" || syllables[0]?.form === "CVj")
        && matchesExactCVnV(syllables, 1);
    const hasCVmVRedupPrefix = syllables.length === 3
        && (syllables[0]?.form === "CV" || syllables[0]?.form === "CVj")
        && matchesExactCVmV(syllables, 1);
    const isExactVnV = matchesExactVnV(syllables, 0) || hasVnVRedupPrefix;
    const isExactCVnV = matchesExactCVnV(syllables, 0) || hasCVnVRedupPrefix;
    const isExactCVmV = matchesExactCVmV(syllables, 0) || hasCVmVRedupPrefix;
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
    const endsWithIaUa = endsWithIaUaSyllables(syllables);
    const isItaVerb = isItaSyllableSequence(syllables);

    const forceClassAForKWV = endsWithKWV && !endsWithKWU && !isRootPlusYa && !isMonosyllable;
    return {
        verb,
        analysisVerb: analysisRoot,
        isTransitive,
        rootPlusYaBase,
        fromRootPlusYa: isRootPlusYa,
        isReduplicatedRootPlusYa,
        isReduplicated: !isRootPlusYa && (
            isReduplicated
            || hasVnVRedupPrefix
            || hasCVnVRedupPrefix
            || hasCVmVRedupPrefix
        ),
        letterCount,
        vowelCount,
        syllableForms,
        syllableCount,
        isMonosyllable,
        isDerivedMonosyllable,
        stemPath,
        monosyllableStemPath,
        endsWithKV,
        endsWithKU,
        endsWithKWV,
        endsWithKWU,
        endsWithKSeries,
        endsWithKSeriesU,
        endsWithKSeriesNoU,
        endsWithWV,
        endsWithTV,
        endsWithNV,
        endsWithMV,
        endsWithU,
        endsWithTA,
        endsWithYA,
        endsWithTZA,
        endsWithKA,
        endsWithVka,
        endsWithCVka,
        endsWithCVnV,
        endsWithVnV,
        isExactCVnV,
        isExactVnV,
        isExactCVmV,
        endsWithNA,
        endsWithKisV,
        totalVowels,
        isVtVStart,
        isVVtVStart,
        isTransitiveUniI,
        rootSyllablesOk,
        lastSyllableForm,
        lastNucleus,
        endsInOpenSyllable,
        endsWithIaUa,
        isItaVerb,
        isYawi,
        hasSlashMarker,
        allowIntransitiveKV: forceClassAForKWV,
        forceClassAForKWV,
    };
}

function getPretUniversalClassCandidates(context) {
    const candidates = new Set();
    if (!context.rootSyllablesOk) {
        return candidates;
    }
    const isMonosyllablePath = context.stemPath === "monosyllable";
    if (!context.isTransitive && context.fromRootPlusYa) {
        candidates.add("A");
        candidates.add("B");
        return candidates;
    }
    if (context.isTransitive && (context.isExactVnV || context.isExactCVnV || context.isExactCVmV)) {
        candidates.add("A");
        return candidates;
    }
    if (context.endsWithU && !context.endsWithTV) {
        candidates.add("B");
        return candidates;
    }
    if (isMonosyllablePath) {
        if (context.lastNucleus === "a" || context.lastNucleus === "e") {
            candidates.add("D");
            return candidates;
        }
        if (context.lastNucleus === "i" || context.lastNucleus === "u") {
            candidates.add("B");
            return candidates;
        }
        return candidates;
    }
    const forceClassAForKWV = context.forceClassAForKWV;
    if (!forceClassAForKWV) {
        candidates.add("B");
    } else {
        candidates.add("A");
    }
    if (context.endsInOpenSyllable) {
        candidates.add("A");
    }
    if (
        context.endsInOpenSyllable &&
        context.vowelCount === 2 &&
        context.endsWithIaUa
    ) {
        candidates.add("C");
    }
    if (!context.isTransitive && context.verb.endsWith("yya")) {
        candidates.add("A");
    }
    return candidates;
}

function buildPretUniversalClassC(context) {
    if (!context.endsInOpenSyllable) {
        return null;
    }
    if (context.vowelCount !== 2 || !context.endsWithIaUa) {
        return null;
    }
    const replaced = getPerfectiveReplacementStem(context.verb, {
        isTransitive: context.isTransitive,
    });
    if (!isSyllableSequencePronounceable(replaced)) {
        return null;
    }
    return [{ base: replaced, suffix: "" }];
}

function buildPretUniversalClassD(context) {
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
    if (context.isYawi) {
        return [{ base, suffix: "ki" }];
    }
    return [{ base, suffix: "" }];
}

function buildPretUniversalClassA(context) {
    if (!context.isTransitive && context.fromRootPlusYa) {
        const stems = getPerfectiveAlternationStems(context.verb, {
            isTransitive: context.isTransitive,
            isRootPlusYa: true,
        });
        const variants = stems
            .filter((base) => isSyllableSequencePronounceable(base))
            .map((base) => ({ base, suffix: "ki" }));
        return variants.length ? variants : null;
    }
    if (context.vowelCount !== 1) {
        return null;
    }
    if (!context.endsInOpenSyllable) {
        return null;
    }
    let allowZeroSuffix = context.totalVowels > 2;
    let allowKiSuffix = true;
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
    if (context.isTransitive && context.endsWithKA) {
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
    if (isKSeriesNoU) {
        allowKiSuffix = false;
        allowZeroSuffix = true;
    }
    if (context.endsWithTV && !isKSeriesNoU) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithWV && !isKSeriesNoU) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithNA) {
        if (context.totalVowels <= 2) {
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
    if (context.isTransitive && context.isExactVnV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
    }
    if (context.isTransitive && context.isExactCVnV) {
        allowZeroSuffix = context.isReduplicated;
        allowKiSuffix = !context.isReduplicated;
    }
    if (context.isTransitive && context.isExactCVmV) {
        allowZeroSuffix = context.isReduplicated;
        allowKiSuffix = !context.isReduplicated;
    }
    if (!context.isTransitive && context.endsWithKisV) {
        allowZeroSuffix = false;
    }
    if (!context.forceClassAForKWV) {
        if (
            (context.isMonosyllable && !context.endsWithTV) ||
            (context.endsWithU && !isKSeriesNoU && !context.endsWithTV) ||
            (!context.isTransitive && (context.isVtVStart || context.isVVtVStart))
        ) {
            return null;
        }
    }
    if (context.isTransitive && context.isItaVerb) {
        const variants = [];
        const itaStem = context.verb.slice(0, -2) + "tz";
        if (!isSyllableSequencePronounceable(itaStem)) {
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
        if (!isSyllableSequencePronounceable(base)) {
            return null;
        }
        return [{ base, suffix: "ki" }];
    }
    const deletedStems = getPerfectiveAlternationStems(context.verb, {
        isTransitive: context.isTransitive,
    });
    const variants = [];
    deletedStems.forEach((base) => {
        if (!isSyllableSequencePronounceable(base)) {
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
    if (!context.isTransitive && context.fromRootPlusYa) {
        const variants = [{ base: context.verb, suffix: "k" }];
        const rootPlusYaBase = context.rootPlusYaBase;
        if (rootPlusYaBase && isSyllableSequencePronounceable(rootPlusYaBase)) {
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
    if (context.vowelCount !== 1) {
        return null;
    }
    if (!isSyllableSequencePronounceable(context.verb)) {
        return null;
    }
    const variants = [{ base: context.verb, suffix: "k" }];
    const rootPlusYaBase = getRootPlusYaBase(context.verb, {
        isTransitive: context.isTransitive,
        isYawi: context.isYawi,
        requirePronounceable: true,
    });
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
        if (adjustedObjectPrefix === "k" && baseCore.startsWith("k")) {
            adjustedObjectPrefix = "";
        }
        adjustedObjectPrefix = applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
        return {
            prefix: subjectPrefix + adjustedObjectPrefix,
            base: baseCore,
        };
    }
    const isThirdPersonObject = baseObjectPrefix === "ki" || baseObjectPrefix === "kin";
    if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti";
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        const objectHead = applyIndirectObjectMarker(dropK ? "" : "k", indirectObjectMarker);
        return {
            prefix: `${subjectPrefix}${objectHead}${outputDirectional}${objectTail}`,
            base: baseCore,
        };
    }
    let adjustedObjectPrefix = objectPrefix;
    if (adjustedObjectPrefix === "k" && baseCore.startsWith("k")) {
        adjustedObjectPrefix = "";
    }
    adjustedObjectPrefix = applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
    return {
        prefix: subjectPrefix + outputDirectional + adjustedObjectPrefix,
        base: baseCore,
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
    const baseMaskClassB = !allowAllClasses
        && classFilter === "B"
        && !isTransitive
        && !isPreterit
        && !isRootPlusYaIntransitive
        && !isTVEnding
        && !isMVEnding
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
}) {
    const isPreterit = tense === "preterito-clase";
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
    const forceClassAForTVRemoto = !!(
        context
        && context.endsWithTV
        && tense === "pasado-remoto"
        && !context.fromRootPlusYa
    );
    if (forceClassAForTVRemoto) {
        if (classFilter === "B") {
            shouldMaskClassBSelection = true;
        }
        shouldSkipClassB = true;
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
    classFilter = null,
    allowAllClasses = false,
    isYawi = false,
    hasSlashMarker = false,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
}) {
    const analysisTarget = analysisVerb || verb;
    const isTransitive = forceTransitive || objectPrefix !== "";
    let variantsByClass = null;
    let context = null;
    if (suppletiveStemSet) {
        variantsByClass = suppletiveStemSet.variantsByClass;
    } else {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            hasSlashMarker,
        });
        if (
            !isTransitive
            && context.endsWithKSeriesNoU
            && tense !== "preterito-clase"
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
    });
    const usePretPluralOverride = isPreterit && subjectSuffix === "t" && suppletiveStemSet;
    const pretPluralSuffix = usePretPluralOverride ? suppletiveStemSet.pretPluralSuffix : null;
    const pretPluralClasses = usePretPluralOverride ? suppletiveStemSet.pretPluralClasses : null;
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

function buildPretUniversalResult({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    analysisVerb,
    isYawi = false,
    hasSlashMarker = false,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
}) {
    const { result } = buildPretUniversalResultWithProvenance({
        verb,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        tense,
        analysisVerb,
        isYawi,
        hasSlashMarker,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        suppletiveStemSet,
        forceTransitive,
        indirectObjectMarker,
    });
    return result;
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
    isYawi = false,
    hasSlashMarker = false,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveStemSet = null,
    forceTransitive = false,
    indirectObjectMarker = "",
}) {
    const analysisTarget = analysisVerb || verb;
    const isTransitive = forceTransitive || objectPrefix !== "";
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
    let context = null;
    let variants = null;
    let pluralSuffix = null;
    let blockedReason = null;
    if (classKey === "B") {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            hasSlashMarker,
        });
        if (context.forceClassAForKWV) {
            blockedReason = "force-class-a-kwv";
            return {
                result: "—",
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
        if (!isTransitive && !context.fromRootPlusYa) {
            const candidates = getPretUniversalClassCandidates(context);
            const mvSource = context.analysisVerb || context.verb || "";
            const isMVEnding = context.endsWithMV || /m[ai]$/.test(mvSource);
            if (candidates.has("A") && !isMVEnding) {
                blockedReason = "class-b-blocked-by-class-a";
                return {
                    result: "—",
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
                hasSlashMarker,
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
            hasSlashMarker,
        });
    }
    if (!context) {
        context = buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            hasSlashMarker,
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

// === UI State Sync ===
// Subject combo removed; keep placeholders for clarity
function syncSubjectInputsFromCombo() {}
function syncSubjectComboFromInputs() {}

function updateMassHeadings() {
    const transitivity = getTransitividadSelection();
    const objectCount = transitivity === "transitivo" ? OBJECT_PREFIXES.length : 1;
    const matrixHeading = document.getElementById("matrix-heading");
    if (matrixHeading) {
        matrixHeading.textContent = transitivity === "transitivo"
            ? "Matrices 9×6 por objeto (9 objetos)"
            : "Matriz 9×6 (intransitivo)";
    }
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
function parseVerbInput(value) {
    const rawInput = String(value || "");
    const { base } = splitSearchInput(rawInput);
    const raw = base.toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "");
    const hasLeadingDash = cleaned.startsWith("-");
    const core = hasLeadingDash ? cleaned.slice(1) : cleaned;
    let objectSegment = "";
    let verbSegment = core;
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
    const objectParts = objectSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    const objectToken = objectParts.length ? objectParts[objectParts.length - 1] : "";
    const hasCompoundMarker = COMPOUND_MARKER_SPLIT_RE.test(verbSegment);
    const hasSlashMarker = verbSegment.includes("/");
    const hasSuffixSeparator = verbSegment.includes("-");
    const verbParts = verbSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    const objectFusionPrefix = objectParts.length === 1
        && FUSION_PREFIXES.has(objectToken)
        && verbParts.length > 0;
    const shouldUseVerbFusion = !hasLeadingDash || objectFusionPrefix;
    const verbFusionPrefixes = [];
    if (shouldUseVerbFusion) {
        for (let i = 0; i < verbParts.length - 1; i += 1) {
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
    if (parts.length > 1 && OBJECT_MARKERS.has(parts[0])) {
        if (!indirectObjectMarker) {
            indirectObjectMarker = parts[0];
        }
        parts = parts.slice(1);
    }
    const knownSuffixes = getKnownTenseSuffixes();
    let selectorSuffix = "";
    if (hasSuffixSeparator && parts.length > 1) {
        const suffixToken = parts[parts.length - 1];
        if (knownSuffixes.has(suffixToken)) {
            selectorSuffix = suffixToken;
            parts = parts.slice(0, -1);
        }
    }
    const fusionPrefixes = [];
    if (objectFusionPrefix) {
        fusionPrefixes.push(objectToken);
        directObjectToken = "";
    }
    if (verbFusionPrefixes.length) {
        fusionPrefixes.push(...verbFusionPrefixes);
    }
    let verb = parts.join("");
    let analysisVerb = parts.length ? parts[parts.length - 1] : verb;
    let rawAnalysisVerb = analysisVerb;
    let directionalPrefix = "";
    if (parts.length > 1) {
        const candidate = parts[parts.length - 2];
        if (DIRECTIONAL_PREFIXES.includes(candidate)) {
            directionalPrefix = candidate;
        }
    }
    if (!analysisVerb) {
        analysisVerb = verb;
        rawAnalysisVerb = analysisVerb;
    }
    const isTaFusion = fusionPrefixes.length > 0 && verb.length > 0;
    let isMarkedTransitive = hasLeadingDash;
    if (isTaFusion) {
        verb = `${fusionPrefixes.join("")}${verb}`;
        indirectObjectMarker = "";
        directObjectToken = "";
        analysisVerb = verb;
        rawAnalysisVerb = analysisVerb;
    }
    const isYawi = analysisVerb === "yawi";
    if (analysisVerb === "yawi") {
        analysisVerb = "ya";
        if (verb.endsWith("yawi")) {
            verb = verb.slice(0, -4) + "ya";
        }
    }
    return {
        verb,
        analysisVerb,
        rawAnalysisVerb,
        hasCompoundMarker,
        hasSlashMarker,
        isMarkedTransitive,
        isTaFusion,
        isYawi,
        directionalPrefix,
        directObjectToken,
        indirectObjectMarker,
        selectorSuffix,
        displayVerb: cleaned,
        hasLeadingDash,
        fusionPrefixes,
    };
}

// === Suppletive Stem Paths ===
const SUPPLETIVE_YE_FORMS = new Set(["ye", "ka", "kati"]);
const SUPPLETIVE_YE_IMPERFECTIVE = "ye";
const SUPPLETIVE_YE_CLASS_A = "kati";
const SUPPLETIVE_YE_CLASS_D = "ka";
const SUPPLETIVE_YE_NONACTIVE = "yeluwa";
const SUPPLETIVE_YAWI_FORMS = new Set(["yawi", "ya", "wi"]);
const SUPPLETIVE_YAWI_IMPERFECTIVE = "ya";
const SUPPLETIVE_WITZI_FORMS = new Set(["witzi"]);
const SUPPLETIVE_WITZI_IMPERFECTIVE = "witzi";
const SUPPLETIVE_WITZI_TENSES = new Set(["preterito-clase", "pasado-remoto", "imperativo"]);
const SUPPLETIVE_WITZI_IMPERATIVE = "wiki";
const SUPPLETIVE_WITZI_NONACTIVE = "wiluwatz";
const SUPPLETIVE_WITZI_NONACTIVE_TENSES = new Set(["preterito-clase", "pasado-remoto"]);
const SUPPLETIVE_WITZI_TENSE_SUFFIX_OVERRIDES = {
    "pasado-remoto": { "": "a", t: "at" },
};

function dropFinalVowel(stem) {
    if (!stem) {
        return stem;
    }
    return VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
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
    };
}

function buildSuppletiveYawiStemSet() {
    const base = SUPPLETIVE_YAWI_IMPERFECTIVE;
    const variantsByClass = new Map();
    variantsByClass.set("D", [{ base: `${base}j`, suffix: "ki" }]);
    return {
        imperfective: { verb: SUPPLETIVE_YAWI_IMPERFECTIVE, analysisVerb: SUPPLETIVE_YAWI_IMPERFECTIVE },
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

const SUPPLETIVE_STEM_PATHS = [
    {
        id: "yawi",
        match: (parsedVerb) => {
            if (!parsedVerb) {
                return false;
            }
            const raw = parsedVerb.rawAnalysisVerb || parsedVerb.verb || "";
            return parsedVerb.isYawi || SUPPLETIVE_YAWI_FORMS.has(raw);
        },
        active: () => buildSuppletiveYawiStemSet(),
        nonactive: () => [{ suffix: "luwa", stem: "wiluwa" }],
    },
    {
        id: "ye",
        match: (parsedVerb) => Boolean(parsedVerb && SUPPLETIVE_YE_FORMS.has(parsedVerb.verb)),
        active: () => buildSuppletiveYeStemSet(),
        nonactive: () => [{ suffix: "luwa", stem: SUPPLETIVE_YE_NONACTIVE }],
    },
    {
        id: "witzi",
        match: (parsedVerb) => Boolean(parsedVerb && SUPPLETIVE_WITZI_FORMS.has(parsedVerb.verb)),
        active: () => buildSuppletiveWitziStemSet(),
        activeTenses: SUPPLETIVE_WITZI_TENSES,
        tenseSuffixOverrides: SUPPLETIVE_WITZI_TENSE_SUFFIX_OVERRIDES,
        verbOverrides: { imperativo: SUPPLETIVE_WITZI_IMPERATIVE },
        nonactive: () => [{ suffix: "luwa", stem: SUPPLETIVE_WITZI_NONACTIVE }],
        nonactiveTenses: SUPPLETIVE_WITZI_NONACTIVE_TENSES,
    },
    {
        id: "wala",
        match: (parsedVerb) => Boolean(parsedVerb && parsedVerb.verb === "wala"),
        nonactive: () => [{ suffix: "luwa", stem: "walwiluwa" }],
    },
];

function getSuppletiveStemPath(parsedVerb) {
    if (!parsedVerb) {
        return null;
    }
    for (const entry of SUPPLETIVE_STEM_PATHS) {
        if (entry.match(parsedVerb)) {
            return {
                path: "suppletive",
                id: entry.id,
                stemSet: entry.active ? entry.active(parsedVerb) : null,
                nonactiveOptions: entry.nonactive ? entry.nonactive(parsedVerb) : null,
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

function getVerbInputMeta() {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return {
            verb: "",
            analysisVerb: "",
            rawAnalysisVerb: "",
            hasCompoundMarker: false,
            isMarkedTransitive: false,
        isYawi: false,
        directionalPrefix: "",
        directObjectToken: "",
        indirectObjectMarker: "",
        selectorSuffix: "",
        isTaFusion: false,
        displayVerb: "",
        hasLeadingDash: false,
        fusionPrefixes: [],
    };
}
    const raw = verbInput.value;
    const effectiveRaw = getSearchInputBase(raw);
    return parseVerbInput(effectiveRaw);
}

function getNormalizedVerb() {
    return getVerbInputMeta().verb;
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

function getSearchInputBase(rawValue) {
    const { base, hasQuery } = splitSearchInput(rawValue);
    const trimmedBase = base.trim();
    if (trimmedBase) {
        return base;
    }
    if (hasQuery) {
        return VERB_INPUT_STATE.lastNonSearchValue || "";
    }
    return rawValue;
}

function getSearchQueryInfo(rawValue) {
    const { query } = splitSearchInput(rawValue);
    const trimmed = query.trim();
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

function getConjugationSearchSuffix(rawValue) {
    const parsed = parseVerbInput(getSearchInputBase(rawValue));
    return parsed.selectorSuffix || "";
}

function getSearchTenseCandidates() {
    const activeMode = getActiveTenseMode();
    if (activeMode === TENSE_MODE.sustantivo) {
        return getTenseOrderForMode(TENSE_MODE.sustantivo);
    }
    if (getActiveConjugationGroup() === CONJUGATION_GROUPS.universal) {
        return PRETERITO_UNIVERSAL_ORDER.slice();
    }
    return getTenseOrderForMode(TENSE_MODE.verbo);
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

function prepareSearchToggleState({ mode, group, tenseValue }) {
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionIds = subjectOptions
        .filter((entry) => entry.id !== SUBJECT_TOGGLE_ALL)
        .map((entry) => entry.id);
    const fallbackSubject = subjectOptionIds[0] || SUBJECT_TOGGLE_ALL;
    if (mode === TENSE_MODE.sustantivo) {
        const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
        const groupKey = prefixes.join("|");
        const subjectKey = `noun|${tenseValue}|${groupKey}`;
        const defaultNounSubject = getDefaultNounSubjectId(subjectOptions);
        const nonanimateId = getNonanimateSubjectId();
        const subjectId = isNonanimateNounTense(tenseValue)
            ? (nonanimateId || defaultNounSubject || fallbackSubject)
            : (defaultNounSubject || fallbackSubject);
        SUBJECT_TOGGLE_STATE.set(subjectKey, subjectId);
        const verbMeta = getVerbInputMeta();
        const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue);
        const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
        const fallbackObject = allowedPrefixes[0] || "";
        OBJECT_TOGGLE_STATE.set(objectStateKey, fallbackObject);
        return;
    }
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = buildObjectPrefixGroups(objectPrefixes);
    const isNonactive = mode === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const stateMode = group === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    objectPrefixGroups.forEach((objectGroup) => {
        const { prefixes } = objectGroup;
        const groupKey = prefixes.join("|") || "intrans";
        const subjectKey = `${stateMode}|${tenseValue}|${groupKey}`;
        SUBJECT_TOGGLE_STATE.set(subjectKey, fallbackSubject);
        const objectKey = getObjectStateKey({
            groupKey,
            tenseValue,
            mode: stateMode,
            isNonactive,
        });
        const fallbackObject = getPreferredObjectPrefix(prefixes);
        OBJECT_TOGGLE_STATE.set(objectKey, fallbackObject);
    });
}

function getNounPossessorKey(tenseValue) {
    const groupKey = SUSTANTIVO_VERBAL_PREFIXES.join("|");
    return `noun|${tenseValue}|${groupKey}|possessor`;
}

function getDefaultPossessorForTense(tenseValue) {
    return (tenseValue === "instrumentivo" || tenseValue === "calificativo-instrumentivo") ? "i" : "";
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
    const analysisVerb = verbMeta.analysisVerb || verbMeta.verb;
    const isTransitiveVerb = verbMeta.isMarkedTransitive;
    const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
    const isLocativoTemporal = tenseValue === "locativo-temporal";
    if (isCalificativoInstrumentivo) {
        return isTransitiveVerb ? ["mu"] : [""];
    }
    if (isLocativoTemporal) {
        if (!isTransitiveVerb) {
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
    if (!isTransitiveVerb) {
        return [""];
    }
    return Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
}

function getSearchNonactiveSuffixPlan(verbMeta) {
    if (getCombinedMode() !== COMBINED_MODE.nonactive) {
        return [null];
    }
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const isTransitive = isValencyFilled(getCurrentObjectPrefix(), verbMeta);
    const options = getNonactiveDerivationOptions(verb, analysisVerb, {
        isTransitive,
        isYawi: verbMeta.isYawi,
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

function getTenseModeForValue(tenseValue) {
    return getTenseOrderForMode(TENSE_MODE.sustantivo).includes(tenseValue)
        ? TENSE_MODE.sustantivo
        : TENSE_MODE.verbo;
}

function getConjugationSuffixTargets(rawValue) {
    const suffix = getConjugationSearchSuffix(rawValue);
    if (!suffix) {
        return [];
    }
    const suffixMap = new Map();
    Object.entries(TENSE_SUFFIX_RULES).forEach(([tenseValue, rules]) => {
        Object.values(rules).forEach((ruleSuffix) => {
            if (!ruleSuffix) {
                return;
            }
            const key = String(ruleSuffix).toLowerCase();
            const list = suffixMap.get(key) || [];
            if (!list.includes(tenseValue)) {
                list.push(tenseValue);
            }
            suffixMap.set(key, list);
        });
    });
    const tenseValues = suffixMap.get(suffix) || [];
    if (!tenseValues.length) {
        return [];
    }
    const currentMode = getActiveTenseMode();
    const targets = tenseValues.map((tenseValue) => ({
        tenseValue,
        mode: getTenseModeForValue(tenseValue),
    }));
    const sameMode = targets.filter((target) => target.mode === currentMode);
    const ranked = sameMode.length ? sameMode : targets;
    ranked.sort((a, b) => {
        const orderA = getTenseOrderForMode(a.mode).indexOf(a.tenseValue);
        const orderB = getTenseOrderForMode(b.mode).indexOf(b.tenseValue);
        return orderA - orderB;
    });
    return ranked;
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
        savedState.subject.forEach((value, key) => SUBJECT_TOGGLE_STATE.set(key, value));
        savedState.object.forEach((value, key) => OBJECT_TOGGLE_STATE.set(key, value));
        savedState.possessor.forEach((value, key) => POSSESSOR_TOGGLE_STATE.set(key, value));
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
            VERB_SUGGESTIONS_TEXT = text;
            VERB_SUGGESTIONS = parseVerbSuggestionCSV(text);
        })
        .catch(() => {
            VERB_SUGGESTIONS_TEXT = "";
            VERB_SUGGESTIONS = [];
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

function getVerbstemMatchKeys(token) {
    const raw = String(token || "").trim();
    if (!raw || raw.startsWith("/")) {
        return [];
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
    base = base.trim().toLowerCase();
    if (!base) {
        return [];
    }
    const keys = [];
    if (transitive) {
        keys.push(`t:${base}`);
    }
    if (intransitive) {
        keys.push(`i:${base}`);
    }
    return keys;
}

function getVerbstemSuggestionMatchKeys(token, options = {}) {
    const raw = String(token || "").trim();
    if (!raw || raw.startsWith("/")) {
        return [];
    }
    let base = raw;
    let transitive = false;
    let intransitive = false;
    let hasExplicit = false;
    if (raw.startsWith("(-)")) {
        base = raw.slice(3);
        transitive = true;
        intransitive = true;
        hasExplicit = true;
    } else if (raw.startsWith("-")) {
        base = raw.slice(1);
        transitive = true;
        hasExplicit = true;
    } else {
        intransitive = true;
    }
    base = base.trim().toLowerCase();
    if (!base) {
        return [];
    }
    if (!hasExplicit && options.allowBoth) {
        transitive = true;
        intransitive = true;
    } else if (!hasExplicit && options.hasObjectPrefix) {
        transitive = true;
        intransitive = false;
    }
    const keys = [];
    if (transitive) {
        keys.push(`t:${base}`);
    }
    if (intransitive) {
        keys.push(`i:${base}`);
    }
    return keys;
}

function matchesVerbstemSuggestion(originalToken, suggestions, options = {}) {
    const targetKeys = new Set(getVerbstemMatchKeys(originalToken));
    if (!targetKeys.size) {
        return false;
    }
    for (const suggestion of suggestions || []) {
        const keys = getVerbstemSuggestionMatchKeys(suggestion, options);
        for (const key of keys) {
            if (targetKeys.has(key)) {
                return true;
            }
        }
    }
    return false;
}

function getObjectPrefixesForVerbstemEntry(entry) {
    const prefixes = new Set();
    if (entry.transitive) {
        OBJECT_PREFIXES.forEach((opt) => prefixes.add(opt.value));
    }
    if (entry.intransitive) {
        prefixes.add("");
    }
    return Array.from(prefixes);
}

function getFormSearchMatchesForVerb({ verbToken, query }) {
    const normalizedQuery = normalizeFormSearchValue(query);
    if (!normalizedQuery) {
        return [];
    }
    const rawToken = String(verbToken || "").trim();
    if (!rawToken || rawToken.startsWith("/")) {
        return [];
    }
    const entry = parseVerbEntryToken(rawToken);
    if (!entry.base) {
        return [];
    }
    const objectPrefixes = getObjectPrefixesForVerbstemEntry(entry);
    const subjectSelections = getSubjectPersonSelections();
    const tenses = getFormSearchTenses();
    const matches = [];
    const seen = new Set();
    tenses.forEach((tenseValue) => {
        subjectSelections.forEach(({ selection }) => {
            objectPrefixes.forEach((objectPrefix) => {
                const result = generateWord({
                    silent: true,
                    skipTransitivityValidation: true,
                    override: {
                        verb: entry.base,
                        tense: tenseValue,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                    },
                });
                if (!result || result.error || !result.result) {
                    return;
                }
                const { shouldMask } = getConjugationMaskState({
                    result,
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix,
                });
                if (shouldMask) {
                    return;
                }
                const forms = splitConjugationForms(result.result);
                const match = forms.find((form) => {
                    const normalized = normalizeFormSearchValue(form);
                    return normalized === normalizedQuery || normalized.includes(normalizedQuery);
                });
                if (!match) {
                    return;
                }
                const key = `${tenseValue}|${selection.subjectPrefix}|${selection.subjectSuffix}|${objectPrefix}|${match}`;
                if (seen.has(key)) {
                    return;
                }
                seen.add(key);
                matches.push({
                    tenseValue,
                    subject: selection,
                    objectPrefix,
                    value: match,
                });
            });
        });
    });
    return matches;
}

function matchesFormSearchResultsForVerb(verbToken, query) {
    return getFormSearchMatchesForVerb({ verbToken, query }).length > 0;
}

function shouldSkipFormSearchCircularToken(token) {
    const raw = String(token || "").trim();
    return !raw || raw.startsWith("/");
}

function matchesFormSearchCircularConfirmation(verbToken, formValue) {
    if (shouldSkipFormSearchCircularToken(verbToken)) {
        return null;
    }
    return matchesFormSearchResultsForVerb(verbToken, formValue);
}

function filterFormSearchStemsToKnownVerbs(stems, options = {}) {
    if (!Array.isArray(stems) || stems.length === 0) {
        return stems || [];
    }
    if (!VERB_SUGGESTIONS || VERB_SUGGESTIONS.length === 0) {
        return stems;
    }
    const knownKeys = new Set();
    VERB_SUGGESTIONS.forEach((entry) => {
        const base = String(entry.base || "").trim().toLowerCase();
        if (!base) {
            return;
        }
        if (entry.transitive) {
            knownKeys.add(`t:${base}`);
        }
        if (entry.intransitive) {
            knownKeys.add(`i:${base}`);
        }
    });
    const filtered = [];
    stems.forEach((stem) => {
        const keys = getVerbstemSuggestionMatchKeys(stem, options);
        if (keys.some((key) => knownKeys.has(key))) {
            filtered.push(stem);
        }
    });
    return filtered.length ? filtered : stems;
}

function matchesCsvVerbToFormSearchResults(verbToken, formValue) {
    if (shouldSkipFormSearchCircularToken(verbToken)) {
        return null;
    }
    const entry = parseVerbEntryToken(verbToken);
    if (!entry.base) {
        return null;
    }
    const stemGuess = deriveVerbstemCandidatesFromForm(formValue);
    const allowBoth = stemGuess.isObjectPrefixAmbiguous
        || (entry.intransitive && !entry.transitive);
    const stemOptions = filterFormSearchStemsToKnownVerbs(
        stemGuess.stems,
        { hasObjectPrefix: stemGuess.hasObjectPrefix, allowBoth }
    );
    return matchesVerbstemSuggestion(
        verbToken,
        stemOptions,
        { hasObjectPrefix: stemGuess.hasObjectPrefix, allowBoth }
    );
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

function normalizeVerbSuggestionInput(rawValue) {
    const raw = String(rawValue || "").trim();
    const parsed = parseVerbInput(raw);
    const query = (parsed.analysisVerb || parsed.verb || "").toLowerCase();
    return {
        raw: parsed.displayVerb,
        isTransitive: parsed.isMarkedTransitive,
        query,
    };
}

function getFilteredVerbSuggestions(rawValue) {
    if (!VERB_SUGGESTIONS.length) {
        return [];
    }
    const { isTransitive, query } = normalizeVerbSuggestionInput(rawValue);
    if (!query && !isTransitive) {
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
        if (query && !candidate.startsWith(query)) {
            continue;
        }
        const display = isTransitive ? `-${entry.base}` : entry.base;
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
    updateMassHeadings();
    renderPretUniversalTabs();
    closeVerbSuggestions();
    generateWord();
    verbInput.focus();
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

function buildPretUniversalFlagsForContext(context, flags) {
    const candidates = getPretUniversalClassCandidates(context);
    if (candidates.has("A")) {
        const variants = buildPretUniversalClassA(context);
        if (variants) {
            variants.forEach((variant) => {
                if (variant.suffix === "ki") {
                    flags.classAKi = true;
                } else if (variant.suffix === "") {
                    flags.classAZero = true;
                }
            });
            if (context.isTransitive && context.isItaVerb) {
                flags.exceptionItaToItz = true;
            }
        }
    }
    if (candidates.has("B")) {
        const variants = buildPretUniversalClassB(context);
        if (variants && variants.length) {
            flags.classB = true;
        }
    }
    if (candidates.has("C")) {
        const variants = buildPretUniversalClassC(context);
        if (variants && variants.length) {
            flags.classC = true;
        }
    }
    if (candidates.has("D") && !(context.fromRootPlusYa && !context.isTransitive)) {
        const variants = buildPretUniversalClassD(context);
        if (variants && variants.length) {
            flags.classD = true;
        }
    }
}

function getPretUniversalFlagsForVerb(baseVerb, entry) {
    const flags = {
        classAKi: false,
        classAZero: false,
        classB: false,
        classC: false,
        classD: false,
        exceptionItaToItz: false,
    };
    const modes = [];
    if (entry.transitive) {
        modes.push(true);
    }
    if (entry.intransitive) {
        modes.push(false);
    }
    if (modes.length === 0) {
        return flags;
    }
    const parsedVerb = parseVerbInput(baseVerb);
    const suppletiveStemSet = getSuppletiveStemSet(parsedVerb);
    if (suppletiveStemSet) {
        const variantsByClass = suppletiveStemSet.variantsByClass;
        if (variantsByClass.get("A")) {
            flags.classAKi = true;
        }
        if (variantsByClass.get("B")) {
            flags.classB = true;
        }
        if (variantsByClass.get("C")) {
            flags.classC = true;
        }
        if (variantsByClass.get("D")) {
            flags.classD = true;
        }
        return flags;
    }
    const verb = parsedVerb.verb || baseVerb;
    const analysisVerb = parsedVerb.analysisVerb || verb;
    modes.forEach((isTransitive) => {
        const context = buildPretUniversalContext(verb, analysisVerb, isTransitive, {
            isYawi: parsedVerb.isYawi,
        });
        buildPretUniversalFlagsForContext(context, flags);
    });
    return flags;
}

function buildPretUniversalCSV(text) {
    const rows = parseCSVRows(text);
    if (!rows.length) {
        return "";
    }
    const headerLabels = [
        "Class A (-V + ki)",
        "Class A (-V + 0)",
        "Class B (V + k)",
        "Class C",
        "Class D",
        "Exception ita > itz",
    ];
    const outputRows = [];
    rows.forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            outputRows.push([...row, ...headerLabels]);
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base.toLowerCase();
        if (!base) {
            outputRows.push([...row, "N", "N", "N", "N", "N"]);
            return;
        }
        const flags = getPretUniversalFlagsForVerb(base, entry);
        outputRows.push([
            ...row,
            flags.classAKi ? "Y" : "N",
            flags.classAZero ? "Y" : "N",
            flags.classB ? "Y" : "N",
            flags.classC ? "Y" : "N",
            flags.classD ? "Y" : "N",
            flags.exceptionItaToItz ? "Y" : "N",
        ]);
    });
    return outputRows
        .map((row) => row.map((cell) => escapeCSVValue(cell)).join(","))
        .join("\n");
}

function normalizeDiagnosticsStem(stem) {
    return String(stem || "")
        .replace(/^\(-\)/, "")
        .replace(/^-+/, "")
        .trim();
}

function collectDiagnosticsCandidateFeatures(entries) {
    const stemPaths = new Set();
    const rootPlusYa = new Set();
    const classCandidates = new Set();
    const transitivity = new Set();
    entries.forEach(({ stem, entry }) => {
        const modes = [];
        if (entry?.transitive) {
            modes.push(true);
        }
        if (entry?.intransitive) {
            modes.push(false);
        }
        if (!modes.length) {
            modes.push(false);
        }
        modes.forEach((isTransitive) => {
            const context = buildPretUniversalContext(stem, stem, isTransitive, {});
            stemPaths.add(context.stemPath || "default");
            rootPlusYa.add(Boolean(context.fromRootPlusYa));
            transitivity.add(isTransitive ? "transitive" : "intransitive");
            const candidates = getPretUniversalClassCandidates(context);
            candidates.forEach((key) => classCandidates.add(key));
        });
    });
    return {
        stemPaths,
        rootPlusYa,
        classCandidates,
        transitivity,
    };
}

function buildDiagnosticsReason(features) {
    const reasons = [];
    if (features.transitivity.size > 1) {
        reasons.push("transitividad");
    }
    if (features.stemPaths.size > 1) {
        reasons.push("stemPath");
    }
    if (features.rootPlusYa.size > 1) {
        reasons.push("raiz+ya");
    }
    if (features.classCandidates.size > 1) {
        reasons.push("clase");
    }
    return reasons.join(" / ");
}

function buildPretUniversalDiagnosticsCSV(text) {
    const rows = parseCSVRows(text);
    if (!rows.length) {
        return "";
    }
    const entries = new Map();
    rows.forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base.toLowerCase();
        if (!base) {
            return;
        }
        entries.set(base, entry);
    });
    const header = [
        "Verbo",
        "Modo",
        "Tense",
        "Forma",
        "Candidatos",
        "Verbos candidatos",
        "Ambiguedad hotspot",
        "Condicion faltante",
        "Excepcion amplia",
        "Metadatos necesarios",
    ];
    const outputRows = [header];
    entries.forEach((entry, base) => {
        const modes = [];
        if (entry.transitive) {
            modes.push({ label: "transitivo", forceTransitive: true });
        }
        if (entry.intransitive) {
            modes.push({ label: "intransitivo", forceTransitive: false });
        }
        if (!modes.length) {
            modes.push({ label: "intransitivo", forceTransitive: false });
        }
        PRETERITO_UNIVERSAL_ORDER.forEach((tense) => {
            modes.forEach((mode) => {
                const output = buildPretUniversalResultWithProvenance({
                    verb: base,
                    subjectPrefix: "",
                    objectPrefix: "",
                    subjectSuffix: "",
                    tense,
                    forceTransitive: mode.forceTransitive,
                });
                if (!output.result || output.result === "—") {
                    return;
                }
                const forms = splitConjugationForms(output.result);
                forms.forEach((form) => {
                    const stemGuess = deriveVerbstemCandidatesFromForm(form);
                    const candidates = (stemGuess.stems || [])
                        .map((stem) => normalizeDiagnosticsStem(stem))
                        .filter(Boolean)
                        .filter((stem) => entries.has(stem));
                    const uniqueCandidates = Array.from(new Set(candidates));
                    const candidateEntries = uniqueCandidates.map((stem) => ({
                        stem,
                        entry: entries.get(stem),
                    }));
                    const features = collectDiagnosticsCandidateFeatures(candidateEntries);
                    const isHotspot = uniqueCandidates.length > 1;
                    const isBroad = uniqueCandidates.length >= 6;
                    const missingConditioning = isHotspot ? buildDiagnosticsReason(features) : "";
                    const needsMetadata = isHotspot ? buildDiagnosticsReason(features) : "";
                    outputRows.push([
                        base,
                        mode.label,
                        getFormSearchTenseLabel(tense),
                        form,
                        uniqueCandidates.length ? String(uniqueCandidates.length) : "0",
                        uniqueCandidates.join(" / "),
                        isHotspot ? "Y" : "N",
                        missingConditioning,
                        isBroad ? "Y" : "N",
                        needsMetadata,
                    ]);
                });
            });
        });
    });
    return outputRows
        .map((row) => row.map((cell) => escapeCSVValue(cell)).join(","))
        .join("\n");
}

function downloadPretUniversalDiagnosticsCSV() {
    const sourcePromise = VERB_SUGGESTIONS_TEXT
        ? Promise.resolve(VERB_SUGGESTIONS_TEXT)
        : fetch("data/data.csv", { cache: "no-store" }).then((response) => response.text());
    sourcePromise
        .then((text) => {
            const output = buildPretUniversalDiagnosticsCSV(text);
            if (!output) {
                return;
            }
            const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "diagnostico-preterito-universal.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        })
        .catch(() => {});
}

function downloadPretUniversalCSV() {
    const sourcePromise = VERB_SUGGESTIONS_TEXT
        ? Promise.resolve(VERB_SUGGESTIONS_TEXT)
        : fetch("data/data.csv", { cache: "no-store" }).then((response) => response.text());
    sourcePromise
        .then((text) => {
            const output = buildPretUniversalCSV(text);
            if (!output) {
                return;
            }
            const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "data-preterito-universal.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        })
        .catch(() => {});
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
    const clampValue = (value) => Math.min(maxValue, Math.max(minValue, value));
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
    } catch (error) {
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
        } catch (error) {
            // Ignore storage failures.
        }
    });
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

    const isTransitive = isValencyFilled(getCurrentObjectPrefix(), verbMeta);
    const options = getNonactiveDerivationOptions(verb, analysisVerb, {
        isTransitive,
        isYawi: verbMeta.isYawi,
    });
    const optionMap = new Map(options.map((option) => [option.suffix, option.stem]));
    let selected = getSelectedNonactiveSuffix();
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
        label.textContent = NONACTIVE_SUFFIX_LABELS[suffix] || suffix;
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

function renderTenseTabs() {
    const container = document.getElementById("tense-tabs");
    if (!container) {
        return;
    }
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
    const suppletiveStemSet = getSuppletiveStemSet(verbMeta);
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
    const availability = PRETERITO_UNIVERSAL_ORDER.map((tenseValue) => {
        if (!hasVerb) {
            return { tenseValue, available: false };
        }
        if (suppletiveStemSet) {
            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const variants = classKey ? suppletiveStemSet.variantsByClass.get(classKey) : null;
            return { tenseValue, available: !!(variants && variants.length) };
        }
        const variants = getPretUniversalVariants(verb, tenseValue, isTransitive, analysisVerb, {
            isYawi: verbMeta.isYawi,
            hasSlashMarker: verbMeta.hasSlashMarker,
        });
        return { tenseValue, available: !!(variants && variants.length) };
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
    const buildTenseButton = (tenseValue) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        if (activeGroup === CONJUGATION_GROUPS.tense && tenseValue === getSelectedTenseTab()) {
            button.classList.add("is-active");
        }
        const label = document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = TENSE_LABELS[tenseValue] || tenseValue;
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
                heading.textContent = group.heading;
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
            button.textContent = PRETERITO_UNIVERSAL_LABELS[tenseValue] || tenseValue;
            button.disabled = endsWithConsonant || !available;
            button.addEventListener("click", () => {
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

function getSubjectPersonLabel(group, selection, isNawat) {
    const baseLabel = isNawat ? group.labelNa : group.labelEs;
    if (!selection) {
        return baseLabel;
    }
    const numberLabel = selection.subjectSuffix === "t" ? "plural" : "singular";
    return `${baseLabel} ${numberLabel}`;
}

function getObjectStateKey({ groupKey, tenseValue = "", mode = "standard", isNonactive = false }) {
    const modeKey = mode ? `${mode}|` : "";
    const nonactiveKey = isNonactive ? "nonactive|" : "";
    const tenseKey = tenseValue ? `${tenseValue}|` : "";
    return `${modeKey}${nonactiveKey}${tenseKey}${groupKey}`;
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
}

function getSubjectToggleOptions() {
    const options = [
        {
            id: SUBJECT_TOGGLE_ALL,
            label: "todos",
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
    const includeAll = options.includeAll !== false;
    const labelForPrefix = options.labelForPrefix;
    const list = [];
    if (includeAll) {
        list.push({ id: OBJECT_TOGGLE_ALL, label: "todos", prefix: null });
    }
    prefixes.forEach((prefix) => {
        const label = labelForPrefix ? labelForPrefix(prefix) : (prefix || "intrans");
        list.push({
            id: prefix,
            label,
            prefix,
        });
    });
    return list;
}

function getPassiveToggleLabel(prefix) {
    const subject = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (!subject) {
        return prefix || "intrans";
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

function getInstrumentivoMode() {
    return INSTRUMENTIVO_MODE_STATE.mode;
}

function setInstrumentivoMode(mode) {
    if (!Object.values(INSTRUMENTIVO_MODE).includes(mode)) {
        return;
    }
    INSTRUMENTIVO_MODE_STATE.mode = mode;
}

function getTenseOrderForMode(mode) {
    if (mode === TENSE_MODE.sustantivo) {
        return [
            "sustantivo-verbal",
            "agentivo",
            "instrumentivo",
            "calificativo-instrumentivo",
            "locativo-temporal",
        ];
    }
    return TENSE_ORDER.filter((tense) => (
        tense !== "sustantivo-verbal"
        && tense !== "agentivo"
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

// === Localization ===
// Generate translated label
function changeLanguage() {
    var languageSwitch = document.getElementById("language");
    var selectedLanguage = languageSwitch.checked ? "nawat" : "original";
  
    var labelElementIds = [
        "subject-prefix-label",
        "verb-label",
        "subject-suffix-label",
        "ni-label",
        "ti-label",
        "third-person-label",
        "1-pl-label",
        "2-pl-label",
        "3-pl-label",
        "subject-label",
        "direct-object-label",
        "nech-label",
        "metz-label",
        "ki-label",
        "tech-label",
        "metzin-label",
        "kin-label",
        "reflexive-object-label",
        "mu-label",
        "indirect-object-label",
        "ta-label",
        "te-label",
        "no-object-label",
        "vi-label",
        "tense-label",
        "presente-label",
        "imperfecto-label",
        "preterito-label",
        "perfecto-label",
        "pluscuamperfecto-label",
        "condicional-perfecto-label",
        "futuro-label",
        "condicional-label",
        "name-label",
        "email-label",
        "message-label",
        "submit-button",
        "copyright-label",
    ];

    var translations = {
        "subject-prefix-label": "Itzinhilpika ne tachiwani",
        "verb-label": "Ne tachiwalis",
        "subject-suffix-label": "Itzunhilpika ne tachiwani",
        "ni-label": "naja (ni)",
        "ti-label": "taja (ti)",
        "third-person-label": "yaja",
        "1-pl-label": "tejemet (ti)",
        "2-pl-label": "anmejemet (an)",
        "3-pl-label": "yejemet",
        "subject-label": "Tachiwani",
        "direct-object-label": "Taseliani",
        "nech-label": "naja (nech)",
        "metz-label": "taja (metz)",
        "ki-label": "yaja (ki~k)",
        "tech-label": "tejemet (tech)",
        "metzin-label": "anmejemet (metzin)",
        "kin-label": "yejemet (kin)",
        "reflexive-object-label": "Isel muselia",
        "mu-label": "isel (mu)",
        "indirect-object-label": "Taselianimet",
        "ta-label": "tajtatka (ta)",
        "te-label": "ajaka (te)",
        "no-object-label": "Te kanaj taseliani",
        "vi-label": "(tachiwalis te taselia)",
        "tense-label": "Kawit",
        "presente-label": "tay panu",
        "imperfecto-label": "tay panu ya",
        "preterito-label": "tay panuk",
        "perfecto-label": "tay panutuk",
        "pluscuamperfecto-label": "tay panutuya",
        "condicional-perfecto-label": "tay panutuskia",
        "futuro-label": "tay panus",
        "condicional-label": "tay panuskia",
        "name-label": "Mutukay",
        "email-label": "Muemail",
        "message-label": "Mutanawatilis",
        "submit-button": "Ma mutukti",
        "copyright-label": "Yekkatakupinalis © 2023 Jaime Núñez",
    };
  
    if (selectedLanguage === "nawat") {
      labelElementIds.forEach(function(elementId) {
        var labelElement = document.getElementById(elementId);
        if (labelElement) {
          // Store the original text
          originalLabels[elementId] = originalLabels[elementId] || labelElement.textContent;
          // Replace with the translated text
          labelElement.textContent = translations[elementId];
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
            verbInput.placeholder = "Shikijkwilu tachiwalis ka nikan";
        } else if (originalPlaceholder) {
            // Restore the original placeholder
            verbInput.placeholder = originalPlaceholder;
        }
                // Handle the value of the submit button
        var submitButton = document.getElementById("submit-button");
        if (selectedLanguage === "nawat") {
            // Store the original value
            originalSubmitButtonValue = submitButton.value;
            // Replace with the translated value
            submitButton.value = "Shiktukti";
        } else if (originalSubmitButtonValue) {
            // Restore the original value
            submitButton.value = originalSubmitButtonValue;
        }

    var wordHeading = document.getElementById("word-heading");
    if (selectedLanguage === "nawat") {
      wordHeading.textContent = "Tasenpuwani tik Nawat ipal El Salvador";
    } else {
      wordHeading.textContent = "Conjugador de verbos en náhuat de El Salvador";
    }

    const footerLabel = document.getElementById("footer");
    if (footerLabel) {
        footerLabel.textContent = "Jaime Núñez";
    }

    updateMassHeadings();
    renderTenseTabs();
    renderPretUniversalTabs();
    renderAllOutputs({
        verb: getVerbInputMeta().displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
        tense: document.getElementById("tense-select")?.value || "presente",
    });
    renderVerbMirror();
}

// === Morphology & Generation ===
function applyMorphologyRules({
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    verb,
    tense,
    analysisVerb,
    isYawi,
    directionalPrefix,
    suppletiveStemSet,
    suppletiveTenseSuffixes = null,
    hasSlashMarker = false,
    isTaFusion = false,
    indirectObjectMarker = "",
    skipPretClass = false,
}) {
    const baseSubjectSuffix = subjectSuffix;
    const baseSubjectPrefix = subjectPrefix;
    const baseObjectPrefix = objectPrefix;
    const directionalInputPrefix = directionalPrefix || "";
    let directionalOutputPrefix = directionalInputPrefix;
    const alternateForms = [];
    const isIntransitiveVerb = objectPrefix === "";
    if (directionalInputPrefix === "wal") {
        let useAl = false;
        if (!isIntransitiveVerb) {
            if (baseSubjectPrefix === "ni") {
                subjectPrefix = "n";
                useAl = true;
            } else if (baseSubjectPrefix === "ti") {
                subjectPrefix = "t";
                useAl = true;
            }
        }
        if (baseObjectPrefix === "ki" || baseObjectPrefix === "kin") {
            useAl = true;
        }
        if (useAl) {
            directionalOutputPrefix = "al";
        }
    }
    // Check if the object prefix "ki" should be shortened to "k"
    if (objectPrefix !== "kin" && (["ni", "ti"].includes(baseSubjectPrefix) || verb.startsWith("i"))) {
        objectPrefix = objectPrefix.replace("ki", "k");
    }

    // Check, when verb starts with "i", if subject prefix "ni", "ti" or "anh" should be shortened to "n" or "t" or changed to "anh" respectively
    if (objectPrefix === "" && verb.startsWith("i") && ["ni", "ti", "an"].includes(subjectPrefix)) {
        subjectPrefix = subjectPrefix
            .replace("ni", "n")
            .replace("ti", "t")
            .replace("an", "anh");
    }

    // Check if subject prefix "an" should be changed to "anh" when the object prefix is empty and the verb starts with
    // "a", "e", "u"
    if (subjectPrefix === "an" && objectPrefix === "" && startsWithAny(verb, AN_PREFIX_VOWEL_PREFIXES)) {
        subjectPrefix = subjectPrefix.replace("an", "anh");
    }

    // Replace kin to kinh and metzin to metzinh before vowels
    if (VOWEL_START_RE.test(verb) && ["kin", "metzin"].includes(objectPrefix)) {
        objectPrefix = objectPrefix.replace("kin", "kinh").replace("metzin", "metzinh");
    }

    const marker = indirectObjectMarker || "";

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
    const rawAnalysis = analysisVerb || verb;
    const nonRedupAnalysis = getNonReduplicatedRoot(rawAnalysis);
    const useAnalysisForCounts = Boolean(directionalInputPrefix) || nonRedupAnalysis !== rawAnalysis;
    const analysisTarget = useAnalysisForCounts ? nonRedupAnalysis : rawAnalysis;
    const getRuleLetterCount = () => getVerbLetterCount(useAnalysisForCounts ? analysisTarget : verb);
    if (tense === "imperativo") {
        if ((subjectPrefix === "ti" && subjectSuffix === "") || subjectPrefix.startsWith("an")) {
            subjectPrefix = "shi";
        }
        if (endsWithAny(verb, IA_UA_SUFFIXES)) {
            verb = verb.slice(0, -1);
        }
    }
    if (tense === "sustantivo-verbal") {
        if (endsWithAny(verb, IA_UA_SUFFIXES)) {
            verb = verb.slice(0, -1);
        }
        const sustantivoBase = analysisVerb || verb;
        const isIntransitive =
            objectPrefix === "" && !isTaFusion;
        if (isIntransitive && verb.endsWith("ya") && getRuleLetterCount() > 2) {
            verb = verb.slice(0, -2);
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
            isYawi,
            hasSlashMarker,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveStemSet,
            forceTransitive: isTaFusion,
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
        const nonactiveClassOverride =
            getActiveTenseMode() === TENSE_MODE.verbo && getActiveDerivationMode() === DERIVATION_MODE.nonactive;
        const resolvedClassFilter = nonactiveClassOverride ? "B" : CLASS_FILTER_STATE.activeClass;
        const classOutput = buildClassBasedResultWithProvenance({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            analysisVerb,
            classFilter: resolvedClassFilter,
            allowAllClasses: nonactiveClassOverride,
            isYawi,
            hasSlashMarker,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveStemSet,
            forceTransitive: isTaFusion,
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
    const elisionTarget = directionalInputPrefix ? analysisTarget : verb;
    if (!directionalInputPrefix && objectPrefix === "k" && elisionTarget.startsWith("k")) {
        objectPrefix = "";
    }
    const isTransitive = objectPrefix !== "";
    if (directionalInputPrefix === "wal" && verb.startsWith(directionalInputPrefix)) {
        const stem = verb.slice(directionalInputPrefix.length);
        const isThirdPersonObject = baseObjectPrefix === "ki" || baseObjectPrefix === "kin";
        if (directionalInputPrefix === "wal" && isThirdPersonObject) {
            const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti";
            objectPrefix = dropK ? "" : "k";
            const objectTail = baseObjectPrefix === "kin" ? "in" : "";
            verb = `${directionalOutputPrefix}${objectTail}${stem}`;
        } else {
            verb = stem;
            objectPrefix = `${directionalOutputPrefix}${objectPrefix}`;
        }
    }
    const rootPlusYaBase = isPerfectiveTense(tense)
        ? getRootPlusYaBase(verb, { isTransitive, isYawi, requirePronounceable: true })
        : null;
    if (rootPlusYaBase) {
        alternateForms.push({ verb: rootPlusYaBase, subjectSuffix });
    }
    objectPrefix = applyIndirectObjectMarker(objectPrefix, marker);
    return { subjectPrefix, objectPrefix, subjectSuffix, verb, alternateForms };
}

function generateWord(options = {}) {
    if (options instanceof Event) {
        options = {};
    }
    const silent = options.silent === true;
    const skipValidation = options.skipValidation === true;
    const skipTransitivityValidation = options.skipTransitivityValidation === true;
    const renderOnlyTense = options.renderOnlyTense || null;
    const override = options.override || null;
    const preservePassiveSubject = override?.preservePassiveSubject === true;
    const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
    const subjectPrefixInput = document.getElementById("subject-prefix");
    const subjectSuffixInput = document.getElementById("subject-suffix");
    const verbInput = document.getElementById("verb");
    // Get the selected values of the prefixes and suffixes
    let subjectPrefix = override?.subjectPrefix ?? subjectPrefixInput.value;
    let objectPrefix = override?.objectPrefix ?? getCurrentObjectPrefix();
    let verb = override?.verb ?? verbInput.value;
    let subjectSuffix = override?.subjectSuffix ?? subjectSuffixInput.value;
    const possessivePrefix = override?.possessivePrefix ?? "";
    let searchQuery = "";
    let hasSearchQuery = false;
    let hasSearchSeparator = false;
    if (!override?.verb && verbInput) {
        const searchParts = splitSearchInput(verb);
        searchQuery = searchParts.query;
        hasSearchQuery = searchQuery.trim().length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = searchParts.base.trim();
        if (baseValue) {
            VERB_INPUT_STATE.lastNonSearchValue = searchParts.base;
            verb = searchParts.base;
        } else if (hasSearchQuery && VERB_INPUT_STATE.lastNonSearchValue) {
            verb = VERB_INPUT_STATE.lastNonSearchValue;
        }
        if (hasSearchQuery && !verb) {
            if (!silent) {
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
    const isPretUniversal = PRETERITO_UNIVERSAL_ORDER.includes(tense);
    const baseObjectPrefix = objectPrefix;
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
    const buildWord = (overrideVerb = verb, overrideSuffix = subjectSuffix) => {
        if (tense === "sustantivo-verbal" || tense === "agentivo") {
            const core = subjectPrefix + possessivePrefix + objectPrefix + overrideVerb + overrideSuffix;
            return core;
        }
        const core = subjectPrefix + objectPrefix + overrideVerb + overrideSuffix;
        if (tense === "imperativo") {
            if (isYawiImperativeSingular) {
                return `ma ${core}`;
            }
            return isImperativeSecondPerson ? core : `ma ${core}`;
        }
        return core;
    };
    const buildWordFromParts = ({
        subjectPrefix: subjectPrefixValue,
        objectPrefix: objectPrefixValue,
        subjectSuffix: subjectSuffixValue,
        verb: verbValue,
        isYawiImperative = false,
    }) => {
        if (tense === "sustantivo-verbal" || tense === "agentivo") {
            return `${subjectPrefixValue}${possessivePrefix}${objectPrefixValue}${verbValue}${subjectSuffixValue}`;
        }
        const core = `${subjectPrefixValue}${objectPrefixValue}${verbValue}${subjectSuffixValue}`;
        if (tense === "imperativo") {
            if (isYawiImperative) {
                return `ma ${core}`;
            }
            const isSecondPerson = getSubjectPersonInfo(subjectPrefixValue, subjectSuffixValue)?.person === 2;
            return isSecondPerson ? core : `ma ${core}`;
        }
        return core;
    };
    const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
            return null;
        }
        errorTargets.forEach((target) => setError(target));
        if (!silent) {
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
    if (invalidCharacters.length || invalidLetters.length) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidList
            ? `El verbo contiene letras invalidas: ${invalidList}`
            : "El verbo contiene letras invalidas.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    }
    const parsedVerb = parseVerbInput(rawVerb);
    verb = parsedVerb.verb;
    const renderVerb = parsedVerb.displayVerb;
    let analysisVerb = parsedVerb.analysisVerb;
    let indirectObjectMarker = parsedVerb.indirectObjectMarker;
    const sourceValency = getActiveVerbValency(parsedVerb);
    const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
    const validationVerb = verb;
    let isYawi = parsedVerb.isYawi;
    const directionalPrefix = parsedVerb.directionalPrefix;
    const suppletivePath = getSuppletiveStemPath(parsedVerb);
    let suppletiveStemSet = suppletivePath?.stemSet || null;
    const suppletiveTenseSuffixes = suppletivePath?.tenseSuffixOverrides || null;
    const suppletiveVerbOverrides = suppletivePath?.verbOverrides || null;
    const suppletiveNonactiveTenses = suppletivePath?.nonactiveTenses || null;
    if (suppletiveStemSet && !isPerfectiveTense(tense)) {
        verb = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
    }
    const isPassiveImpersonalMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getActiveVoiceMode() === VOICE_MODE.passive;
    const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
    let preserveSubjectForPassive = preservePassiveSubject;
    const allomorphyObjectPrefix = !isPassiveImpersonalMode
        && isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)
        ? "mu"
        : objectPrefix;
    const nonspecificAllomorphy = applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        objectPrefix: allomorphyObjectPrefix,
        indirectObjectMarker,
        isTaFusion: parsedVerb.isTaFusion,
    });
    verb = nonspecificAllomorphy.verb;
    analysisVerb = nonspecificAllomorphy.analysisVerb;
    let morphologyObjectPrefix = nonspecificAllomorphy.objectPrefix || allomorphyObjectPrefix;
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

    const isNonactive =
        getActiveTenseMode() === TENSE_MODE.verbo && getActiveDerivationMode() === DERIVATION_MODE.nonactive;
    let nonactiveAllStems = null;
    if (isNonactive) {
        suppletiveStemSet = null;
        const nonactiveIsTransitive = isValencyFilled(objectPrefix, parsedVerb);
        const selection = resolveNonactiveStemSelection(verb, analysisVerb, {
            isTransitive: nonactiveIsTransitive,
            isYawi,
        });
        verb = selection.selectedStem;
        analysisVerb = verb;
        if (!selection.selectedSuffix && selection.allStems.length > 1) {
            nonactiveAllStems = selection.allStems;
        }
        if (directionalPrefix && verb.startsWith(directionalPrefix)) {
            analysisVerb = verb.slice(directionalPrefix.length);
        }
        isYawi = false;
    }
    let valencyAdjustedPrefix = false;
    if (isPassiveImpersonalMode) {
        const shouldStripFusionPrefixes = fusionPrefixes.length
            && (parsedVerb.hasLeadingDash || fusionPrefixes.length > 1);
        if (targetValency > 0 && shouldStripFusionPrefixes) {
            verb = stripLeadingPrefixes(verb, fusionPrefixes);
            analysisVerb = stripLeadingPrefixes(analysisVerb, fusionPrefixes);
        }
        if (targetValency <= 0) {
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
    }
    const isWitziNonactive = isNonactive && suppletivePath?.id === "witzi";
    const allowConsonantEnding = isWitziNonactive && verb === SUPPLETIVE_WITZI_NONACTIVE;
    if (
        isNonactive
        && getActiveTenseMode() === TENSE_MODE.verbo
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
        && getActiveTenseMode() === TENSE_MODE.verbo
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
            verb = "yawi";
        } else {
            verb = "yaw";
        }
    }
    if (isYawi && tense === "presente-habitual") {
        verb = "ya";
    }
    if (tense === "sustantivo-verbal" || tense === "agentivo") {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectPrefix")) {
            subjectPrefix = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "subjectSuffix")) {
            subjectSuffix = "";
        }
    }
    const isPassiveImpersonal = isPassiveImpersonalMode;
    if (isPassiveImpersonal) {
        ({ subjectPrefix, subjectSuffix, objectPrefix } = applyPassiveImpersonal({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            analysisVerb,
            preserveSubject: preserveSubjectForPassive,
            allowObjectPrefix: allowPassiveObject,
        }));
        morphologyObjectPrefix = objectPrefix;
    }

    // Auto-switch to reflexive when subject/object are the same person and number.
    if (!isPassiveImpersonal) {
        if (isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)) {
            objectPrefix = "mu";
            isReflexive = true;
            clearError("object-prefix");
        } else if (objectPrefix === "mu") {
            isReflexive = true;
        }
    }
    
    // Check for invalid combinations of subject and object prefixes (verb-only constraint).
    const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
    const isNounTense = (
        tense === "sustantivo-verbal"
        || tense === "agentivo"
        || tense === "instrumentivo"
        || isCalificativoInstrumentivo
    );
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

    if (tense === "sustantivo-verbal" || tense === "agentivo" || tense === "instrumentivo" || isCalificativoInstrumentivo) {
        if (
            (tense === "sustantivo-verbal" || tense === "instrumentivo" || isCalificativoInstrumentivo)
            && !isNonanimateSubject(subjectPrefix, subjectSuffix)
        ) {
            const message = "Solo 3a persona no animada (singular o plural).";
            const error = returnError(message, ["subject-prefix", "subject-suffix"]);
            if (error) {
                return error;
            }
        }
        const isTransitiveVerb = parsedVerb.isMarkedTransitive;
        if (isCalificativoInstrumentivo) {
            if (isTransitiveVerb) {
                if (objectPrefix !== "mu") {
                    const error = returnError("Calificativo transitivo solo con mu.", ["object-prefix"]);
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
                    case "instrumentivo":
                        return "Instrumentivo transitivo solo con ta/te/mu.";
                    default:
                        return "Sustantivo verbal transitivo solo con ta/te/mu.";
                }
            })();
            const intransitiveMessage = (() => {
                switch (tense) {
                    case "agentivo":
                        return "Agentivo intransitivo va sin prefijo.";
                    case "instrumentivo":
                        return "Instrumentivo intransitivo va sin prefijo.";
                    default:
                        return "Sustantivo verbal intransitivo va sin prefijo.";
                }
            })();
            if (isTransitiveVerb) {
                if (!SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
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

    if (isWitziNonactive && tense === "preterito-clase" && subjectSuffix === "t") {
        subjectSuffix = "et";
    }
    const skipPretClass = isWitziNonactive && SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);

    const baseMorphologyInput = {
        subjectPrefix,
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        isYawi,
        directionalPrefix,
        suppletiveStemSet,
        suppletiveTenseSuffixes,
        hasSlashMarker: parsedVerb.hasSlashMarker,
        isTaFusion: parsedVerb.isTaFusion,
        indirectObjectMarker,
        skipPretClass,
    };
    const appliedMorphology = applyMorphologyRules(baseMorphologyInput);
    ({ subjectPrefix, objectPrefix, subjectSuffix, verb } = appliedMorphology);
    const alternateForms = [...(appliedMorphology.alternateForms || [])];
    const stemProvenance = appliedMorphology.stemProvenance || null;
    // Combine the prefixes, verb, and suffixes into a single word
    let forms = [];
    if (
        isNonactive
        && Array.isArray(nonactiveAllStems)
        && nonactiveAllStems.length > 1
        && !getSelectedNonactiveSuffix()
    ) {
        const seen = new Set();
        const collectFormsForStem = (stem) => {
            let stemAnalysis = stem;
            if (directionalPrefix && stem.startsWith(directionalPrefix)) {
                stemAnalysis = stem.slice(directionalPrefix.length);
            }
            const applied = applyMorphologyRules({
                ...baseMorphologyInput,
                verb: stem,
                analysisVerb: stemAnalysis,
            });
            if (!applied || !applied.verb) {
                return;
            }
            const localSubjectPrefix = applied.subjectPrefix;
            const localObjectPrefix = applied.objectPrefix;
            const localSubjectSuffix = applied.subjectSuffix;
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
            if (baseText && !seen.has(baseText)) {
                seen.add(baseText);
                forms.push(baseText);
            }
            localAlternates.forEach((form) => {
                if (!form || !form.verb) {
                    return;
                }
                const altText = buildWordFromParts({
                    subjectPrefix: localSubjectPrefix,
                    objectPrefix: localObjectPrefix,
                    subjectSuffix: form.subjectSuffix ?? localSubjectSuffix,
                    verb: form.verb,
                    isYawiImperative,
                });
                if (altText && !seen.has(altText)) {
                    seen.add(altText);
                    forms.push(altText);
                }
            });
        };
        nonactiveAllStems.forEach((stem) => collectFormsForStem(stem));
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
    if (shouldAddYuVariant && (verb === "yaw" || verb === "yawi")) {
        const yuText = buildWord("yu");
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
    renderFullMatrix({ verb, objectPrefix });
    renderFormSearchResults();
}

function updateTensePanelDescription() {
    const panel = document.getElementById("tense-description");
    if (!panel) {
        return;
    }
    const entries = [];
    const tenseMode = getActiveTenseMode();
    const selectedTense = getSelectedTenseTab();
    if (tenseMode === TENSE_MODE.verbo) {
        const isNonactive = getCombinedMode() === COMBINED_MODE.nonactive;
        if (isNonactive) {
            const suffix = getSelectedNonactiveSuffix();
            if (suffix) {
                entries.push({
                    label: `no activo ${NONACTIVE_SUFFIX_LABELS[suffix] || suffix}`,
                    description: NONACTIVE_SUFFIX_DESCRIPTIONS[suffix] || "",
                });
            }
        }
        const activeGroup = getActiveConjugationGroup();
        if (activeGroup === CONJUGATION_GROUPS.universal) {
            const selected = getSelectedPretUniversalTab();
            entries.push({
                label: PRETERITO_UNIVERSAL_LABELS[selected] || selected,
                description: PRETERITO_UNIVERSAL_DESCRIPTIONS[selected] || "",
            });
        } else {
            entries.push({
                label: TENSE_LABELS[selectedTense] || selectedTense,
                description: TENSE_DESCRIPTIONS[selectedTense] || "",
            });
            if (PRETERITO_CLASS_TENSES.has(selectedTense) && CLASS_FILTER_STATE.activeClass) {
                const classDetail = PRETERITO_CLASS_DETAIL_BY_KEY[CLASS_FILTER_STATE.activeClass];
                if (classDetail) {
                    entries.push(classDetail);
                }
            }
        }
    } else {
        entries.push({
            label: TENSE_LABELS[selectedTense] || selectedTense,
            description: TENSE_DESCRIPTIONS[selectedTense] || "",
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

function renderAllConjugations({ verb, objectPrefix, tense }) {
    const container = document.getElementById("all-conjugations");
    if (!container) {
        return;
    }
    if (!verb) {
        container.innerHTML = "";
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    container.innerHTML = "";

    SUBJECT_COMBINATIONS.forEach((combo) => {
        const result = generateWord({
            silent: true,
            override: {
                subjectPrefix: combo.subjectPrefix,
                subjectSuffix: combo.subjectSuffix,
                objectPrefix,
                verb,
                tense,
            },
        }) || {};

        const row = document.createElement("div");
        row.className = "conjugation-row";
        applyConjugationRowClasses(row, objectPrefix);

        const label = document.createElement("div");
        label.className = "conjugation-label";
        label.textContent = isNawat ? combo.labelNa : combo.labelEs;

        const value = document.createElement("div");
        value.className = "conjugation-value";
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
        if (result.error) {
            value.textContent = "—";
            value.classList.add("conjugation-error");
        } else if (hideReflexive) {
            value.textContent = "—";
        } else {
            value.textContent = formatConjugationDisplay(result.result);
            if (result.isReflexive) {
                value.classList.add("conjugation-reflexive");
            }
        }

        row.appendChild(label);
        row.appendChild(value);
        container.appendChild(row);
    });
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
    if (isIntransitiveOnly) {
        buildNonactiveRow(getNonactivePersonLabel("", { isIntransitive: true }), "", "");
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
                    getNonactivePersonLabel(subjectPrefix, { isDirectGroup: true }),
                    getNonactivePersonSub(subjectPrefix),
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
            getNonactivePersonLabel(prefix, {}),
            getObjectLabelShort(prefix),
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
    activeValency,
    fusionMarkers,
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
    const allowSubjectToggle = isPassiveNonactive && activeValency >= 2;
    const allowObjectToggle = isPassiveNonactive && activeValency === 3;
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
    const passiveSubjectOptions = allowSubjectToggle
        ? getObjectToggleOptions(passiveSubjectPrefixes, { labelForPrefix: getPassiveToggleLabel })
        : [];
    const passiveSubjectOptionMap = new Map(passiveSubjectOptions.map((entry) => [entry.id, entry]));
    const passiveSubjectStateKey = allowSubjectToggle ? `${objectStateKey}|subject` : "";
    const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
    let activeObjectPrefix = isIntransitiveGroup
        ? ""
        : (isNonactiveMode ? OBJECT_TOGGLE_ALL : getPreferredObjectPrefix(prefixes));
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
    tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${tenseValue}`;

    const blockLabel = isIntransitiveGroup ? "verbo intransitivo" : "verbo transitivo";
    const tenseTitle = document.createElement("div");
    tenseTitle.className = "tense-block__title";
    const titleLabel = document.createElement("span");
    titleLabel.className = "tense-block__label";
    if (!isNonactiveMode) {
        titleLabel.textContent = blockLabel;
    }
    tenseTitle.appendChild(titleLabel);
    const titleControls = document.createElement("div");
    titleControls.className = "tense-block__controls";
    const shouldStackControls = !isNonactiveMode || prefixes.length > 1;
    if (shouldStackControls) {
        titleControls.classList.add("tense-block__controls--stacked");
    }
    const resolvedSubjectKeyPrefix = subjectKeyPrefix || modeKey;
    const subjectKey = `${resolvedSubjectKeyPrefix}|${tenseValue}|${groupKey}`;
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    let activeSubject = SUBJECT_TOGGLE_STATE.get(subjectKey) ?? SUBJECT_TOGGLE_ALL;
    if (!subjectOptionMap.has(activeSubject)) {
        activeSubject = SUBJECT_TOGGLE_ALL;
        SUBJECT_TOGGLE_STATE.set(subjectKey, activeSubject);
    }

    const toggleButtons = new Map();
    const passiveSubjectButtons = new Map();
    const subjectButtons = new Map();
    let setActiveSubject = null;
    let setActivePassiveSubject = null;
    if (!isNonactiveMode) {
        const subjectToggle = document.createElement("div");
        subjectToggle.className = "object-toggle object-toggle--stacked";
        subjectToggle.setAttribute("role", "group");
        subjectToggle.setAttribute("aria-label", "Sujeto");
        subjectOptions.forEach((entry) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "object-toggle-button";
            button.textContent = entry.label;
            button.addEventListener("click", () => {
                setActiveSubject(entry.id);
            });
            subjectButtons.set(entry.id, button);
            subjectToggle.appendChild(button);
        });
        titleControls.appendChild(subjectToggle);

        setActiveSubject = (subjectId) => {
            activeSubject = subjectId;
            SUBJECT_TOGGLE_STATE.set(subjectKey, subjectId);
            subjectButtons.forEach((button, key) => {
                const isActive = key === subjectId;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });
            renderRows();
        };
    }
    if (allowSubjectToggle) {
        const subjectToggle = document.createElement("div");
        subjectToggle.className = "object-toggle object-toggle--stacked";
        subjectToggle.setAttribute("role", "group");
        subjectToggle.setAttribute("aria-label", "Sujeto");
        passiveSubjectOptions.forEach((entry) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "object-toggle-button";
            button.textContent = entry.label;
            button.addEventListener("click", () => {
                setActivePassiveSubject(entry.id);
            });
            passiveSubjectButtons.set(entry.id, button);
            subjectToggle.appendChild(button);
        });
        titleControls.appendChild(subjectToggle);
        setActivePassiveSubject = (subjectId) => {
            activePassiveSubject = subjectId;
            OBJECT_TOGGLE_STATE.set(passiveSubjectStateKey, subjectId);
            passiveSubjectButtons.forEach((button, key) => {
                const isActive = key === subjectId;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });
            renderRows();
        };
    }
    const showObjectToggle = (
        (!isNonactiveMode && prefixes.length > 1)
        || (isNonactiveMode && (!isDirectGroup ? prefixes.length > 1 : allowObjectToggle))
    );
    if (showObjectToggle) {
        const toggle = document.createElement("div");
        toggle.className = "object-toggle object-toggle--stacked";
        toggle.setAttribute("role", "group");
        toggle.setAttribute("aria-label", "Objeto");
        objectOptions.forEach((entry) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "object-toggle-button";
            button.textContent = entry.label;
            button.addEventListener("click", () => {
                setActivePrefix(entry.id);
            });
            toggleButtons.set(entry.id, button);
            toggle.appendChild(button);
        });
        titleControls.appendChild(toggle);
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
            placeholder.textContent = "Ingresa un verbo para ver las conjugaciones.";
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
        objectSelections.forEach((objectPrefix) => {
            subjectSelections.forEach(({ group, selection }) => {
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
            personSub.textContent = buildPersonSub({
                subjectLabel: basePersonSub,
                objectLabel,
            });
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
            titleLabel.textContent = blockLabel;
        }
        tenseBlock.dataset.tenseBlock = `${prefix || "intrans"}-${tenseValue}`;
        updateSectionCategory(resolveSectionPrefix(prefix));
        toggleButtons.forEach((button, key) => {
            const isActive = key === prefix;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
    };

    tenseBlock.appendChild(list);
    if (isNonactiveMode) {
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        titleLabel.textContent = isIntransitiveOnly
            ? "impersonal"
            : (isDirectGroup ? "pasivo" : "impersonal");
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

function renderVerbConjugationsCore({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const resolvedTenseValue = resolveVerbTenseValue({ modeKey, tenseValue });
    const parsedVerb = parseVerbInput(verb);
    const nonactiveConfig = isNonactiveMode ? getNonactiveObjectPrefixGroups(parsedVerb) : null;
    const activeValency = nonactiveConfig ? nonactiveConfig.valency : 1;
    const fusionMarkers = parsedVerb.isTaFusion ? parsedVerb.fusionPrefixes || [] : [];

    const buildBlock = (blockTenseValue, objectGroup, sectionEl) => buildVerbTenseBlock({
        verb,
        tenseValue: blockTenseValue,
        objectGroup,
        sectionEl,
        isNonactiveMode,
        isNawat,
        modeKey,
        subjectKeyPrefix,
        subjectSubMode,
        activeValency,
        fusionMarkers,
    });

    const objectPrefixGroups = getVerbObjectPrefixGroups(isNonactiveMode, nonactiveConfig);
    renderVerbConjugationBlocks({
        container,
        objectPrefixGroups,
        tenseValue: resolvedTenseValue,
        buildBlock,
    });
}

function renderPretUniversalConjugations({
    verb,
    objectPrefix,
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
    const verbMeta = parseVerbInput(verb);
    const isTransitiveVerb = verbMeta.isMarkedTransitive;
    const possessorValues = POSSESSIVE_PREFIXES
        .map((entry) => entry.value)
        .filter((value) => value);
    const activeObjectValues = isTransitiveVerb
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
        const options = [{ id: OBJECT_TOGGLE_ALL, label: "todos", value: "" }];
        possessorValues.forEach((value) => {
            options.push({ id: value, label: value, value });
        });
        return options;
    };

    const buildCombinedOptions = () => {
        const options = [{ id: OBJECT_TOGGLE_ALL, label: "todos", value: "" }];
        possessorValues.forEach((value) => {
            options.push({ id: `pos:${value}`, label: value, value, type: "possessor" });
        });
        if (isTransitiveVerb) {
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
        titleLabel.textContent = `locativo/temporal · ${isNonactive ? "no activo" : "activo"}`;
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
                placeholder.textContent = "Ingresa un verbo para ver las conjugaciones.";
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
                    ? getPossessorLabelEs(selection.possessorPrefix)
                    : "";
                const objectLabel = selection.objectPrefix
                    ? getObjectComboLabel(selection.objectPrefix, isNawat)
                    : "";
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
            activeObject = getPreferredObjectPrefix(activeObjectValues);
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
                    personLabel: "impersonal",
                }];
                renderRows({ selections, objectSelections: [""] });
            } else {
                const combinedOptions = buildCombinedOptions();
                const combinedMap = new Map(combinedOptions.map((option) => [option.id, option]));
                if (!combinedMap.has(combinedSelection)) {
                    combinedSelection = OBJECT_TOGGLE_ALL;
                }
                const { toggle, buttons } = buildToggleControl({
                    options: combinedOptions,
                    activeId: combinedSelection,
                    ariaLabel: "Poseedor / Objeto",
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
                        return option.type === "possessor" ? "poseedor" : "objeto";
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
                                personLabel: "impersonal",
                            };
                        }
                        return {
                            possessorPrefix: option.value,
                            objectPrefix: POSSESSIVE_TO_OBJECT_PREFIX[option.value] || "",
                            personLabel: getPossessorPersonLabel(option.value),
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
                ariaLabel: "Poseedor",
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
                    ariaLabel: "Objeto",
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
                            personLabel: getPossessorPersonLabel(possessorPrefix),
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

function renderNounConjugations({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const allowedNounTenses = getTenseOrderForMode(TENSE_MODE.sustantivo);
    const selectedTense = tenseValue || getSelectedTenseTab();
    const resolvedTense = allowedNounTenses.includes(selectedTense)
        ? selectedTense
        : "sustantivo-verbal";
    if (resolvedTense === "locativo-temporal") {
        renderLocativoTemporalConjugations({ verb, containerId });
        return;
    }
    const isInstrumentivo = resolvedTense === "instrumentivo";
    const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
    const isLocativoTemporal = resolvedTense === "locativo-temporal";
    const showNonanimateOnly = resolvedTense === "sustantivo-verbal" || isInstrumentivo || isCalificativoInstrumentivo;
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const possessorKey = `noun|${resolvedTense}|${groupKey}|possessor`;
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue: resolvedTense, mode: "noun" });
    const subjectKey = `noun|${resolvedTense}|${groupKey}`;
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    const verbMeta = parseVerbInput(verb);
    const isTransitiveVerb = verbMeta.isMarkedTransitive;

    const { objSection, grid } = createObjectSectionGrid(container);

    const allowedPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, resolvedTense);
    let activeObjectPrefix = "";
    if (isTransitiveVerb) {
        activeObjectPrefix = getPreferredObjectPrefix(allowedPrefixes);
    }
    const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
    if (!allowedPrefixes.includes(activeObjectPrefix)) {
        activeObjectPrefix = allowedPrefixes[0] || "";
    }
    const objectOptions = getObjectToggleOptions(allowedPrefixes);
    const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
    if (storedObjectPrefix !== undefined && allowedPrefixes.includes(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
    }
    const possessorValues = POSSESSIVE_PREFIXES.map((entry) => entry.value);
    let activePossessor = POSSESSOR_TOGGLE_STATE.get(possessorKey);
    if (activePossessor === undefined) {
        activePossessor = (isInstrumentivo || isCalificativoInstrumentivo) ? "i" : "";
    }
    if (!possessorValues.includes(activePossessor) && activePossessor !== OBJECT_TOGGLE_ALL) {
        activePossessor = (isInstrumentivo || isCalificativoInstrumentivo) ? "i" : "";
    }
    const isSubjectOptionAllowed = (entry) => (
        !showNonanimateOnly
        || entry.id === SUBJECT_TOGGLE_ALL
        || isNonanimateSubject(entry.subjectPrefix, entry.subjectSuffix)
    );
    const showSubjectToggle = !showNonanimateOnly;
    const showObjectToggle = allowedPrefixes.length > 1;
    const showPossessorToggle = !isLocativoTemporal;
    if (showObjectToggle) {
        const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
        if (storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
            activeObjectPrefix = storedObjectPrefix;
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

    const tenseBlock = document.createElement("div");
    tenseBlock.className = "tense-block";
    tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${resolvedTense}`;

    const tenseTitle = document.createElement("div");
    tenseTitle.className = "tense-block__title";
    const titleLabel = document.createElement("span");
    titleLabel.className = "tense-block__label";
    const tenseLabel = TENSE_LABELS[resolvedTense] || resolvedTense;
    titleLabel.textContent = tenseLabel;
    tenseTitle.appendChild(titleLabel);
    const titleControls = document.createElement("div");
    titleControls.className = "tense-block__controls";
    titleControls.classList.add("tense-block__controls--stacked");
    let toggleButtons = new Map();
    let possessorButtons = new Map();
    let subjectButtons = new Map();
    if (showSubjectToggle) {
        const { toggle: subjectToggle, buttons } = buildToggleControl({
            options: subjectOptions,
            activeId: activeSubject,
            ariaLabel: "Sujeto",
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
            { id: OBJECT_TOGGLE_ALL, label: "todos", value: OBJECT_TOGGLE_ALL },
            ...POSSESSIVE_PREFIXES.map((entry) => ({
                id: entry.value,
                label: entry.value ? entry.value : "Ø",
                value: entry.value,
                title: entry.label,
            })),
        ];
        const { toggle: possessorToggle, buttons } = buildToggleControl({
            options: possessorOptions,
            activeId: activePossessor,
            ariaLabel: "Poseedor",
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
    if (showObjectToggle) {
        const { toggle: objectToggle, buttons } = buildToggleControl({
            options: objectOptions,
            activeId: activeObjectPrefix,
            ariaLabel: "Objeto",
            onSelect: (id) => {
                setActivePrefix(id);
            },
        });
        toggleButtons = buttons;
        titleControls.appendChild(objectToggle);
    }
    tenseTitle.appendChild(titleControls);
    tenseBlock.appendChild(tenseTitle);

    const list = document.createElement("div");
    list.className = "conjugation-list";

    const updateSectionCategory = (prefix) => {
        applyObjectSectionCategory(objSection, prefix);
    };

    const renderRows = () => {
        list.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = "Ingresa un verbo para ver las conjugaciones.";
            list.appendChild(placeholder);
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
        objectSelections.forEach((objectPrefix) => {
            selections.forEach(({ group, selection, number }) => {
                possessorSelections.forEach((possessorPrefix) => {
                    const isAgentivo = resolvedTense === "agentivo";
                    const isPossessed = possessorPrefix !== "";
                    let subjectSuffixOverride = "";
                    if (isAgentivo && number === "plural") {
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
                    const objectLabel = objectPrefix ? getObjectComboLabel(objectPrefix, isNawat) : "";
                    let possessorLabel = getPossessorLabelEs(possessorPrefix);
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
                            ? getPossessorLabelEs(result.possessorPrefix)
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
                    list.appendChild(row);
                });
            });
        });
    };

    const setActivePrefix = (prefix) => {
        activeObjectPrefix = prefix;
        OBJECT_TOGGLE_STATE.set(objectStateKey, prefix);
        titleLabel.textContent = tenseLabel;
        tenseBlock.dataset.tenseBlock = `${prefix}-${tenseValue}`;
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

    tenseBlock.appendChild(list);
    setActivePrefix(activeObjectPrefix);
    setActiveSubject(activeSubject);
    if (showPossessorToggle) {
        setActivePossessor(activePossessor);
    } else {
        renderRows();
    }

    grid.appendChild(tenseBlock);
}

function renderAllTenseConjugations({ verb, objectPrefix, onlyTense = null }) {
    renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal",
    });
}

function renderFullMatrix({ verb, objectPrefix }) {
    const container = document.getElementById("full-matrix");
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;

    container.innerHTML = "";
    if (!verb) {
        const placeholder = document.createElement("div");
        placeholder.className = "matrix-placeholder";
        placeholder.textContent = "Ingresa un verbo para ver la matriz.";
        container.appendChild(placeholder);
        return;
    }
    const buildTable = (fixedObjectPrefix, captionText) => {
        const table = document.createElement("table");
        table.className = "matrix-table";
        if (captionText) {
            const caption = document.createElement("caption");
            caption.textContent = captionText;
            table.appendChild(caption);
        }

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.appendChild(document.createElement("th"));
        TENSE_ORDER.forEach((tenseValue) => {
            const th = document.createElement("th");
            th.textContent = TENSE_LABELS[tenseValue] || tenseValue;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        SUBJECT_COMBINATIONS.forEach((combo) => {
            const row = document.createElement("tr");
            const labelCell = document.createElement("th");
            labelCell.textContent = isNawat ? combo.labelNa : combo.labelEs;
            row.appendChild(labelCell);

            TENSE_ORDER.forEach((tenseValue) => {
                const cell = document.createElement("td");
                const result = generateWord({
                    silent: true,
                    override: {
                        subjectPrefix: combo.subjectPrefix,
                        subjectSuffix: combo.subjectSuffix,
                        objectPrefix: fixedObjectPrefix,
                        verb,
                        tense: tenseValue,
                    },
                }) || {};
                const hideReflexive = !!(result && result.isReflexive && getObjectCategory(fixedObjectPrefix) !== "reflexive");
                if (result.error) {
                    cell.textContent = "—";
                    cell.classList.add("conjugation-error");
                } else if (hideReflexive) {
                    cell.textContent = "—";
                } else {
                    cell.textContent = result.result;
                    if (result.isReflexive) {
                        cell.classList.add("conjugation-reflexive");
                    }
                }
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        return table;
    };

    const objectPrefixes = getObjectPrefixesForTransitividad();

    objectPrefixes.forEach((prefix) => {
        const section = document.createElement("div");
        section.className = "matrix-section";
        const category = getObjectCategory(prefix);
        if (category !== "intransitive") {
            section.classList.add(`matrix-section--${category}`);
        }
        const heading = document.createElement("h3");
        heading.textContent = getObjectLabel(prefix);
        section.appendChild(heading);
        section.appendChild(buildTable(prefix, heading.textContent));
        container.appendChild(section);
    });
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
document.addEventListener("DOMContentLoaded", () => {
    setBrowserClasses();
    initUiScaleControl();
    initTutorialPanel();
    initTenseModeTabs();
    initCombinedModeTabs();
    const verbEl = document.getElementById("verb");
    if (verbEl) {
        verbEl.dataset.prevValue = verbEl.value || "";
        const initialParts = splitSearchInput(verbEl.value);
        const initialBase = initialParts.base.trim();
        const initialValue = initialBase || verbEl.value;
        verbEl.dataset.lastClassVerb = parseVerbInput(initialValue).verb;
        if (initialBase) {
            VERB_INPUT_STATE.lastNonSearchValue = initialParts.base;
        } else if (!initialParts.hasQuery) {
            VERB_INPUT_STATE.lastNonSearchValue = verbEl.value;
        }
        verbEl.addEventListener("beforeinput", handleVerbBeforeInput);
        verbEl.addEventListener("input", () => {
            if (!isVerbValueAllowed(verbEl.value)) {
                verbEl.value = verbEl.dataset.prevValue || "";
            } else {
                verbEl.dataset.prevValue = verbEl.value;
            }
            renderVerbMirror();
            const searchParts = splitSearchInput(verbEl.value);
            const baseValue = searchParts.base.trim();
            if (baseValue) {
                VERB_INPUT_STATE.lastNonSearchValue = searchParts.base;
            }
            const parsedVerb = parseVerbInput(getSearchInputBase(verbEl.value));
            if (verbEl.dataset.lastClassVerb !== parsedVerb.verb) {
                CLASS_FILTER_STATE.activeClass = null;
                verbEl.dataset.lastClassVerb = parsedVerb.verb;
            }
            updateMassHeadings();
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
    const downloadCsvButton = document.getElementById("download-csv");
    if (downloadCsvButton) {
        downloadCsvButton.addEventListener("click", downloadPretUniversalCSV);
    }
    const downloadDiagnosticsButton = document.getElementById("download-diagnostics-csv");
    if (downloadDiagnosticsButton) {
        downloadDiagnosticsButton.addEventListener("click", downloadPretUniversalDiagnosticsCSV);
    }
    const formSearchInput = getFormSearchInput();
    if (formSearchInput) {
        formSearchInput.addEventListener("input", () => {
            renderFormSearchResults();
        });
    }
    window.addEventListener("resize", () => {
        renderVerbMirror();
    });
    updateMassHeadings();
    renderTenseTabs();
    renderPretUniversalTabs();
    renderVerbMirror();
    loadVerbSuggestions().then(() => {
        updateVerbSuggestions();
    });
    generateWord();
    renderFormSearchResults();
});
