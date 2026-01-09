var originalLabels = {};
var originalPlaceholder = "";
var originalSubmitButtonValue = "";
const VERB_INPUT_STATE = {
    lastNonSearchValue: "",
};
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

const MU_TO_M_VERB_PREFIXES = [
    "altia",
    "awiltia",
    "ijnekwi",
    "ijkwani",
    "ijkwania",
    "ijtutia",
    "ijtua",
    "inaya",
    "isuta",
    "ijsuta",
    "ijtunia",
    "itunia",
];
const DIRECTIONAL_PREFIXES = ["wal", "un"];
const SUPPLETIVE_YE_FORMS = new Set(["ye", "ka", "kati"]);
const SUPPLETIVE_YE_IMPERFECTIVE = "ye";
const SUPPLETIVE_YE_CLASS_A = "kati";
const SUPPLETIVE_YE_CLASS_D = "ka";
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
const VERB_SUGGESTION_LIMIT = 10;
const VERB_SUGGESTION_STATE = {
    items: [],
    activeIndex: -1,
};
let VERB_SUGGESTIONS = [];
let VERB_SUGGESTIONS_TEXT = "";
const UI_SCALE_STORAGE_KEY = "ui-scale-offset";

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

function isInherentlyTransitive(verb) {
    return verb.endsWith("tza");
}

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

function applyPassiveImpersonal({ subjectPrefix, subjectSuffix, objectPrefix, analysisVerb }) {
    const isTransitiveVerb = objectPrefix !== "" || isInherentlyTransitive(analysisVerb || "");
    if (!isTransitiveVerb) {
        return { subjectPrefix: "", subjectSuffix: "", objectPrefix };
    }
    if (PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix)) {
        const mapped = PASSIVE_IMPERSONAL_SUBJECT_MAP[objectPrefix];
        return {
            subjectPrefix: mapped.subjectPrefix,
            subjectSuffix: mapped.subjectSuffix,
            objectPrefix: "",
        };
    }
    return { subjectPrefix: "", subjectSuffix: "", objectPrefix };
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

function deriveNonactiveStem(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    if (!source || !VOWEL_END_RE.test(source)) {
        return source;
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
    const endsWithTzka = source.endsWith("tzka");
    const endsWithJsi = source.endsWith("jsi");
    const hasMultipleTz = source.indexOf("tz") !== source.lastIndexOf("tz");
    const isTransitive = options.isTransitive === true;

    if (options.isYawi) {
        return "wiluwa";
    }
    if (source === "ka") {
        return "yeluwa";
    }
    if (source === "wala") {
        return "walwiluwa";
    }
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
    } else if (uwaTransitive) {
        uwaCandidate = true;
    }

    const allowWiwa = !isTransitive && (endsWithWa || endsWithWi);
    const waCandidate = (endsWithI || endsWithU || allowWiwa)
        && !uCandidate
        && (!uwaCandidate || allowWiwa);
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

    if (options.isYawi) {
        return [{ suffix: "luwa", stem: "wiluwa" }];
    }
    if (source === "ka") {
        return [{ suffix: "luwa", stem: "yeluwa" }];
    }
    if (source === "wala") {
        return [{ suffix: "luwa", stem: "walwiluwa" }];
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
    } else if (uwaTransitive) {
        uwaCandidate = true;
    }

    const allowWiwa = !isTransitive && (endsWithWa || endsWithWi);
    const waCandidate = (endsWithI || endsWithU || allowWiwa)
        && !uCandidate
        && (!uwaCandidate || allowWiwa);
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

function getNonactiveStemForSelection(verb, analysisVerb, options = {}) {
    const optionsList = getNonactiveDerivationOptions(verb, analysisVerb, options);
    if (!optionsList.length) {
        return deriveNonactiveStem(verb, analysisVerb, options);
    }
    const optionMap = new Map(optionsList.map((option) => [option.suffix, option.stem]));
    let selected = getSelectedNonactiveSuffix();
    if (!selected || !optionMap.has(selected)) {
        selected = getDefaultNonactiveSuffix(optionsList);
        if (selected) {
            setSelectedNonactiveSuffix(selected);
        }
    }
    if (selected && optionMap.has(selected)) {
        return optionMap.get(selected);
    }
    return deriveNonactiveStem(verb, analysisVerb, options);
}

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

const NONANIMATE_NOUN_TENSES = new Set([
    "sustantivo-verbal",
    "instrumentivo",
    "calificativo-instrumentivo",
]);

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
}) {
    const effectiveObjectPrefix = comboObjectPrefix ?? objectPrefix;
    const invalidCombo = enforceInvalidCombo && INVALID_COMBINATION_KEYS.has(
        getComboKey(subjectPrefix, effectiveObjectPrefix, subjectSuffix)
    );
    const samePerson = isSamePersonAcrossNumber(subjectPrefix, subjectSuffix, effectiveObjectPrefix);
    const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
    const shouldMask = !!(result?.error || hideReflexive || invalidCombo || samePerson);
    const isError = !!(result?.error || invalidCombo || samePerson);
    return { shouldMask, isError };
}

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
    const verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    const analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTransitiveVerb = verbMeta.isMarkedTransitive || isInherentlyTransitive(analysisVerb);
    if (isTransitiveVerb) {
        if (!SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
            return { error: true };
        }
    } else if (objectPrefix !== "") {
        return { error: true };
    }

    if (mode === INSTRUMENTIVO_MODE.absolutivo) {
        let options = getNonactiveDerivationOptions(verb, analysisVerb, {
            isTransitive: isTransitiveVerb,
            isYawi: verbMeta.isYawi,
        });
        if (!options.length) {
            const derived = deriveNonactiveStem(verb, analysisVerb, {
                isTransitive: isTransitiveVerb,
                isYawi: verbMeta.isYawi,
            });
            if (derived) {
                options = [{ suffix: "default", stem: derived }];
            }
        }
        if (
            isTransitiveVerb
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
                objectPrefix,
                subjectSuffix: commonNumberSuffix,
                verb: option.stem,
                tense: "presente-habitual",
                analysisVerb: analysisStem,
                isYawi: false,
                directionalPrefix,
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
        objectPrefix,
        subjectSuffix: commonNumberSuffix,
        verb,
        tense: "imperfecto",
        analysisVerb,
        isYawi: verbMeta.isYawi,
        directionalPrefix,
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
    const verb = verbMeta.verb;
    if (!verb || !VOWEL_RE.test(verb) || !VOWEL_END_RE.test(verb)) {
        return { error: true };
    }
    if (!isNonanimateSubject(subjectPrefix, subjectSuffix)) {
        return { error: true };
    }
    const analysisVerb = verbMeta.analysisVerb || verb;
    const directionalPrefix = verbMeta.directionalPrefix || "";
    const isTransitiveVerb = verbMeta.isMarkedTransitive || isInherentlyTransitive(analysisVerb);
    if (isTransitiveVerb) {
        if (objectPrefix !== "mu") {
            return { error: true };
        }
    } else if (objectPrefix !== "") {
        return { error: true };
    }

    let stemVerb = verb;
    let stemAnalysis = analysisVerb;
    if (!isTransitiveVerb) {
        const rootPlusYaBase = getRootPlusYaBase(analysisVerb, {
            isTransitive: false,
            isYawi: verbMeta.isYawi,
            requirePronounceable: true,
        });
        if (rootPlusYaBase) {
            stemAnalysis = rootPlusYaBase;
            if (stemVerb.endsWith("ya")) {
                stemVerb = stemVerb.slice(0, -2);
            }
        }
    }

    const applied = applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix,
        subjectSuffix: "",
        verb: stemVerb,
        tense: "pasado-remoto",
        analysisVerb: stemAnalysis,
        isYawi: verbMeta.isYawi,
        directionalPrefix,
        suppletiveOverride: getSuppletiveOverride(verbMeta),
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
        return getNonactivePersonCategory(prefix) || "Paciente";
    }
    return getNonactiveGenericLabel(prefix);
}

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

function getPreferredObjectPrefix(prefixes) {
    const verbMeta = getVerbInputMeta();
    const forcedPrefix = verbMeta.indirectObjectMarker || "";
    if (forcedPrefix && prefixes.includes(forcedPrefix)) {
        return forcedPrefix;
    }
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
        const isTransitiveVerb =
            verbMeta.isMarkedTransitive || isInherentlyTransitive(verbMeta.analysisVerb);
        const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
        const isAllowed = (prefix) => {
            if (isCalificativoInstrumentivo) {
                return isTransitiveVerb ? prefix === "mu" : prefix === "";
            }
            return isTransitiveVerb ? SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(prefix) : prefix === "";
        };
        const stored = OBJECT_TOGGLE_STATE.get(objectStateKey);
        if (stored && isAllowed(stored)) {
            return stored;
        }
        if (!isTransitiveVerb) {
            return "";
        }
        if (isCalificativoInstrumentivo) {
            return "mu";
        }
        return Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)[0] || "";
    }
    const prefixes = getObjectPrefixesForTransitividad();
    if (prefixes.length === 1 && prefixes[0] === "") {
        return "";
    }
    const verbMeta = getVerbInputMeta();
    const forcedPrefix = verbMeta.indirectObjectMarker || "";
    if (forcedPrefix && prefixes.includes(forcedPrefix)) {
        return forcedPrefix;
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

function buildPretUniversalContext(verb, analysisVerb, isTransitive, options = {}) {
    const isYawi = options.isYawi === true;
    const nonRedupRoot = getNonReduplicatedRoot(analysisVerb);
    const analysisRoot = nonRedupRoot;
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
    const isMonosyllable = syllableCount === 1;
    const isDerivedMonosyllable = isMonosyllable;
    const lastSyllable = syllables[syllables.length - 1] || null;
    const penultimateSyllable = syllables[syllables.length - 2] || null;
    const antepenultimateSyllable = syllables[syllables.length - 3] || null;
    const lastOnset = lastSyllable?.onset || "";
    const lastNucleus = lastSyllable?.nucleus || "";
    const endsWithKV = lastSyllable?.form === "CV" && lastOnset === "k";
    const endsWithKWV = lastSyllable?.form === "CV" && lastOnset === "kw";
    const endsWithWV = lastSyllable?.form === "CV" && lastOnset === "w";
    const endsWithTV = lastSyllable?.form === "CV" && lastOnset === "t";
    const endsWithNV = lastSyllable?.form === "CV" && lastOnset === "n";
    const endsWithU = isOpenSyllable(lastSyllable) && lastNucleus === "u";
    const endsWithTA = lastSyllable?.form === "CV" && lastOnset === "t" && lastNucleus === "a";
    const endsWithYA = lastSyllable?.form === "CV" && lastOnset === "y" && lastNucleus === "a";
    const endsWithTZA = lastSyllable?.form === "CV" && lastOnset === "tz" && lastNucleus === "a";
    const endsWithKA = lastSyllable?.form === "CV" && lastOnset === "k" && lastNucleus === "a";
    const endsWithVka = endsWithKA && penultimateSyllable?.form === "V";
    const endsWithCVka = endsWithKA && penultimateSyllable?.form === "CV";
    const endsWithCVnV = endsWithNV && penultimateSyllable?.form === "CV";
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

    return {
        verb,
        analysisVerb: analysisRoot,
        isTransitive,
        letterCount,
        vowelCount,
        syllableForms,
        syllableCount,
        isMonosyllable,
        isDerivedMonosyllable,
        endsWithKV,
        endsWithKWV,
        endsWithWV,
        endsWithTV,
        endsWithNV,
        endsWithU,
        endsWithTA,
        endsWithYA,
        endsWithTZA,
        endsWithKA,
        endsWithVka,
        endsWithCVka,
        endsWithCVnV,
        endsWithNA,
        endsWithKisV,
        totalVowels,
        isVtVStart,
        isVVtVStart,
        isTransitiveUniI,
        rootSyllablesOk,
        lastSyllableForm,
        endsInOpenSyllable,
        endsWithIaUa,
        isItaVerb,
        isYawi,
    };
}

function getPretUniversalClassCandidates(context) {
    const candidates = new Set();
    if (!context.rootSyllablesOk) {
        return candidates;
    }
    if (context.endsWithU) {
        candidates.add("B");
        return candidates;
    }
    if (context.isMonosyllable) {
        if (context.endsWithTA) {
            candidates.add("B");
            return candidates;
        }
        if (context.lastSyllableForm !== "C") {
            candidates.add("D");
            if (context.isTransitiveUniI) {
                candidates.add("B");
            }
        }
        return candidates;
    }
    candidates.add("B");
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
        candidates.delete("B");
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
    const replaced = getUniversalReplacementStem(context.verb, {
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
    if (!isSyllableSequencePronounceable(`${context.verb}j`)) {
        return null;
    }
    if (context.isYawi) {
        return [{ base: context.verb + "j", suffix: "ki" }];
    }
    return [{ base: context.verb + "j", suffix: "" }];
}

function buildPretUniversalClassA(context) {
    if (context.vowelCount !== 1) {
        return null;
    }
    if (!context.endsInOpenSyllable) {
        return null;
    }
    let allowZeroSuffix = context.totalVowels > 2;
    let allowKiSuffix = true;
    const endsWithKVDerivation = context.endsWithKV || context.endsWithKWV;
    if (!context.isTransitive && context.endsWithKV && context.letterCount <= 4) {
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
    if (endsWithKVDerivation) {
        allowKiSuffix = false;
        allowZeroSuffix = true;
    }
    if (!context.isTransitive && context.endsWithTA) {
        return null;
    }
    if (context.endsWithTV && !endsWithKVDerivation) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithWV && !endsWithKVDerivation) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithNA) {
        if (context.totalVowels <= 2) {
            return null;
        }
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithYA) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithCVnV) {
        allowZeroSuffix = false;
    }
    if (!context.isTransitive && context.endsWithKisV) {
        allowZeroSuffix = false;
    }
    if (
        context.isMonosyllable ||
        (context.endsWithU && !endsWithKVDerivation && !context.endsWithTV) ||
        (!context.isTransitive && (context.isVtVStart || context.isVVtVStart))
    ) {
        return null;
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
    const deletedStems = applyPretUniversalDeletionShift(context.verb.slice(0, -1), {
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
    baseObjectPrefix = objectPrefix
) {
    const split = splitDirectionalPrefixFromBase(base, directionalInputPrefix);
    const outputDirectional = split.directional ? (directionalOutputPrefix || split.directional) : "";
    const baseCore = split.base;
    if (!split.directional) {
        let adjustedObjectPrefix = objectPrefix;
        if (adjustedObjectPrefix === "k" && baseCore.startsWith("k")) {
            adjustedObjectPrefix = "";
        }
        return {
            prefix: subjectPrefix + adjustedObjectPrefix,
            base: baseCore,
        };
    }
    const isThirdPersonObject = baseObjectPrefix === "ki" || baseObjectPrefix === "kin";
    if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti";
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        return {
            prefix: `${subjectPrefix}${dropK ? "" : "k"}${outputDirectional}${objectTail}`,
            base: baseCore,
        };
    }
    let adjustedObjectPrefix = objectPrefix;
    if (adjustedObjectPrefix === "k" && baseCore.startsWith("k")) {
        adjustedObjectPrefix = "";
    }
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
    pluralSuffix = null
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
                baseObjectPrefix
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
            baseObjectPrefix
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

function buildClassBasedResult({
    verb,
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    tense,
    analysisVerb,
    classFilter = null,
    isYawi = false,
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveOverride = null,
}) {
    const analysisTarget = analysisVerb || verb;
    const isTransitive = objectPrefix !== "" || isInherentlyTransitive(analysisTarget);
    let variantsByClass = null;
    if (suppletiveOverride) {
        variantsByClass = suppletiveOverride.variantsByClass;
    } else {
        const context = buildPretUniversalContext(verb, analysisTarget, isTransitive, { isYawi });
        variantsByClass = getPretUniversalVariantsByClass(context);
    }
    if (!variantsByClass.size) {
        return null;
    }
    const classOrder = classFilter ? [classFilter] : ["A", "B", "C", "D"];
    const isPreterit = tense === "preterito-clase";
    const usePretPluralOverride = isPreterit && subjectSuffix === "t" && suppletiveOverride;
    const pretPluralSuffix = usePretPluralOverride ? suppletiveOverride.pretPluralSuffix : null;
    const pretPluralClasses = usePretPluralOverride ? suppletiveOverride.pretPluralClasses : null;
    const results = [];
    const seen = new Set();
    classOrder.forEach((classKey) => {
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
                pretPluralSuffix
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
                    baseObjectPrefix
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
    directionalInputPrefix = "",
    directionalOutputPrefix = "",
    baseSubjectPrefix = subjectPrefix,
    baseObjectPrefix = objectPrefix,
    suppletiveOverride = null,
}) {
    const analysisTarget = analysisVerb || verb;
    const isTransitive = objectPrefix !== "" || isInherentlyTransitive(analysisTarget);
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
    let variants = null;
    let pluralSuffix = null;
    if (suppletiveOverride && classKey) {
        if (
            subjectSuffix === "t"
            && suppletiveOverride.pretPluralClasses
            && !suppletiveOverride.pretPluralClasses.has(classKey)
        ) {
            return null;
        }
        variants = suppletiveOverride.variantsByClass.get(classKey) || null;
        if (subjectSuffix === "t" && suppletiveOverride.pretPluralSuffix) {
            pluralSuffix = suppletiveOverride.pretPluralSuffix;
        }
    } else {
        variants = getPretUniversalVariants(verb, tense, isTransitive, analysisTarget, {
            isYawi,
        });
    }
    if (!variants || variants.length === 0) {
        return null;
    }
    return buildPretUniversalResultFromVariants(
        variants,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        pluralSuffix
    );
}

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

function parseVerbInput(value) {
    const rawInput = String(value || "");
    const { base } = splitSearchInput(rawInput);
    const raw = base.toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "");
    const hyphenIndex = cleaned.indexOf("-");
    const isMarkedTransitive = hyphenIndex !== -1;
    const objectSegment = hyphenIndex !== -1 ? cleaned.slice(0, hyphenIndex) : "";
    const verbSegment = hyphenIndex !== -1 ? cleaned.slice(hyphenIndex + 1) : cleaned;
    const objectParts = objectSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    const objectToken = objectParts.length ? objectParts[objectParts.length - 1] : "";
    let indirectObjectMarker = OBJECT_MARKERS.has(objectToken) ? objectToken : "";
    const directObjectToken = objectToken && !indirectObjectMarker ? objectToken : "";
    const hasCompoundMarker = COMPOUND_MARKER_SPLIT_RE.test(verbSegment);
    const hasSuffixSeparator = verbSegment.includes("-");
    let parts = verbSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
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
        isMarkedTransitive,
        isYawi,
        directionalPrefix,
        directObjectToken,
        indirectObjectMarker,
        selectorSuffix,
        displayVerb: cleaned,
    };
}

function dropFinalVowel(stem) {
    if (!stem) {
        return stem;
    }
    return VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
}

function getSuppletiveOverride(parsedVerb) {
    const verb = parsedVerb?.verb;
    if (!verb || !SUPPLETIVE_YE_FORMS.has(verb)) {
        return null;
    }
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

function isPerfectiveTense(tense) {
    return (
        PRETERITO_CLASS_TENSES.has(tense)
        || PRETERITO_UNIVERSAL_ORDER.includes(tense)
        || tense === "preterito"
        || tense === "preterito-izalco"
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
            displayVerb: "",
        };
    }
    const raw = verbInput.value;
    const effectiveRaw = getSearchInputBase(raw);
    return parseVerbInput(effectiveRaw);
}

function getNormalizedVerb() {
    return getVerbInputMeta().verb;
}

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
    const isTransitiveVerb = verbMeta.isMarkedTransitive || isInherentlyTransitive(analysisVerb);
    const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
    if (isCalificativoInstrumentivo) {
        return isTransitiveVerb ? ["mu"] : [""];
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
    const isTransitive = verbMeta.isMarkedTransitive || isInherentlyTransitive(analysisVerb);
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

function buildVerbSearchPlans({ tenseValue, group, isNonactive }) {
    const stateMode = group === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = buildObjectPrefixGroups(objectPrefixes);
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
    const baseValue = getSearchInputBase(rawValue);
    if (scrollToMatchingConjugationRow(baseValue)) {
        return;
    }
    if (!allowSwitch) {
        return;
    }
    const targets = getConjugationSuffixTargets(baseValue);
    if (!targets.length) {
        return;
    }
    const displayVerb = getVerbInputMeta().displayVerb;
    targets.some((target) => {
        setActiveConjugationGroup(CONJUGATION_GROUPS.tense);
        setActiveTenseMode(target.mode);
        setSelectedTenseTab(target.tenseValue);
        renderTenseTabs();
        renderPretUniversalTabs();
        renderAllOutputs({
            verb: displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
            tense: target.tenseValue,
        });
        return scrollToMatchingConjugationRow(baseValue);
    });
}

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
    VERB_SUGGESTION_STATE.activeIndex = preservedIndex >= 0 ? preservedIndex : 0;
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
    if (!VERB_SUGGESTION_STATE.items.length) {
        return;
    }
    if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        VERB_SUGGESTION_STATE.activeIndex =
            (VERB_SUGGESTION_STATE.activeIndex + 1) % VERB_SUGGESTION_STATE.items.length;
        renderVerbSuggestions(getVerbSuggestionsElement());
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        VERB_SUGGESTION_STATE.activeIndex =
            (VERB_SUGGESTION_STATE.activeIndex - 1 + VERB_SUGGESTION_STATE.items.length)
            % VERB_SUGGESTION_STATE.items.length;
        renderVerbSuggestions(getVerbSuggestionsElement());
    } else if (event.key === "Enter") {
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
    if (candidates.has("D")) {
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
    const suppletiveOverride = getSuppletiveOverride(parsedVerb);
    if (suppletiveOverride) {
        const variantsByClass = suppletiveOverride.variantsByClass;
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
        const effectiveTransitive = isTransitive || isInherentlyTransitive(analysisVerb);
        const context = buildPretUniversalContext(verb, analysisVerb, effectiveTransitive, {
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
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    container.classList.toggle("is-hidden", !isNonactiveMode);
    container.setAttribute("aria-hidden", String(!isNonactiveMode));
    if (!isNonactiveMode) {
        return;
    }
    container.innerHTML = "";
    const heading = document.createElement("div");
    heading.className = "nonactive-tabs-heading";
    heading.textContent = "Derivación no activa";
    container.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "nonactive-tabs-grid";
    container.appendChild(grid);

    const isTransitive = getCurrentObjectPrefix() !== "" || isInherentlyTransitive(analysisVerb || verb);
    const options = getNonactiveDerivationOptions(verb, analysisVerb, {
        isTransitive,
        isYawi: verbMeta.isYawi,
    });
    const optionMap = new Map(options.map((option) => [option.suffix, option.stem]));
    let selected = getSelectedNonactiveSuffix();
    if (!selected || !optionMap.has(selected)) {
        selected = getDefaultNonactiveSuffix(options);
        setSelectedNonactiveSuffix(selected);
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
            setSelectedNonactiveSuffix(suffix);
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
    const verbMeta = getVerbInputMeta();
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const displayVerb = verbMeta.displayVerb;
    const suppletiveOverride = getSuppletiveOverride(verbMeta);
    const endsWithConsonant = verb !== "" && !VOWEL_END_RE.test(verb);
    const hasVerb = verb !== "" && VOWEL_RE.test(verb);
    renderNonactiveTabs({ verbMeta, verb, analysisVerb, hasVerb, endsWithConsonant });
    const tenseMode = getActiveTenseMode();
    const allowedTenses = getTenseOrderForMode(tenseMode);
    const selectedTenseValue = getSelectedTenseTab();
    if (!allowedTenses.includes(selectedTenseValue)) {
        setSelectedTenseTab(allowedTenses[0] || TENSE_ORDER[0]);
    }
    const isTransitive = getCurrentObjectPrefix() !== "" || isInherentlyTransitive(verb);
    const availability = PRETERITO_UNIVERSAL_ORDER.map((tenseValue) => {
        if (!hasVerb) {
            return { tenseValue, available: false };
        }
        if (suppletiveOverride) {
            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const variants = classKey ? suppletiveOverride.variantsByClass.get(classKey) : null;
            return { tenseValue, available: !!(variants && variants.length) };
        }
        const variants = getPretUniversalVariants(verb, tenseValue, isTransitive, analysisVerb, {
            isYawi: verbMeta.isYawi,
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
    container.appendChild(mainWrap);

    if (tenseMode === TENSE_MODE.verbo) {
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
}

function renderPretUniversalTabs() {
    renderTenseTabs();
}
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
const SUBJECT_TOGGLE_ALL = "all";
const OBJECT_TOGGLE_ALL = "all";

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
const OBJECT_TOGGLE_STATE = new Map();
const POSSESSOR_TOGGLE_STATE = new Map();
const SUBJECT_TOGGLE_STATE = new Map();
const VOICE_MODE = {
    active: "active",
    passive: "passive-impersonal",
};
const VOICE_MODE_STATE = {
    mode: VOICE_MODE.active,
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
const getPassiveToggleLabel = (prefix) => {
    const subject = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (!subject) {
        return prefix || "intrans";
    }
    return subject.subjectPrefix || "Ø";
};
const DERIVATION_MODE = {
    active: "active",
    nonactive: "nonactive",
};
const DERIVATION_MODE_STATE = {
    mode: DERIVATION_MODE.active,
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
const NONACTIVE_SUFFIX_STATE = {
    selected: null,
};
const COMBINED_MODE = {
    active: "active",
    nonactive: "nonactive",
};
const INSTRUMENTIVO_MODE = {
    absolutivo: "absolutivo",
    posesivo: "posesivo",
};
const INSTRUMENTIVO_MODE_STATE = {
    mode: INSTRUMENTIVO_MODE.absolutivo,
};
const TENSE_MODE = {
    verbo: "verbo",
    sustantivo: "sustantivo",
};
const TENSE_MODE_STATE = {
    mode: TENSE_MODE.verbo,
};
const TENSE_ORDER = [
    "presente",
    "imperativo",
    "sustantivo-verbal",
    "agentivo",
    "instrumentivo",
    "calificativo-instrumentivo",
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
        left: [{ heading: "Nominalización", tenses: ["sustantivo-verbal", "agentivo", "instrumentivo", "calificativo-instrumentivo"] }],
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
const TENSE_TABS_STATE = {
    selected: TENSE_ORDER[0],
};
const PRETERITO_UNIVERSAL_TABS_STATE = {
    selected: PRETERITO_UNIVERSAL_ORDER[0],
};
const CONJUGATION_GROUPS = {
    tense: "tense",
    universal: "universal",
};
const CONJUGATION_GROUP_STATE = {
    activeGroup: CONJUGATION_GROUPS.tense,
};
const CLASS_FILTER_STATE = {
    activeClass: null,
};

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
        return ["sustantivo-verbal", "agentivo", "instrumentivo", "calificativo-instrumentivo"];
    }
    return TENSE_ORDER.filter((tense) => (
        tense !== "sustantivo-verbal"
        && tense !== "agentivo"
        && tense !== "instrumentivo"
        && tense !== "calificativo-instrumentivo"
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
    const mode = getCombinedMode();
    buttons.forEach((button) => {
        const isActive = button.getAttribute("data-combined-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
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
        "preterito-izalco-label",
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
        "preterito-izalco-label": "tay panuk (Ijtzalku)",
        "preterito-label": "tay panuk (Witzapan)",
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

//Keyboard navigation (kept minimal now that radios are removed)
document.addEventListener('keydown', function(event) {
    const verbEl = document.getElementById('verb');
    if (event.key === ' ') { // Spacebar key
        if (verbEl) verbEl.focus();
        event.preventDefault();
    } else if (event.key === 'Escape') {
        if (verbEl) verbEl.blur();
        event.preventDefault();
    } else if (event.key === 'Enter') {
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
});


function applyMorphologyRules({
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    verb,
    tense,
    analysisVerb,
    isYawi,
    directionalPrefix,
    suppletiveOverride,
}) {
    const baseSubjectPrefix = subjectPrefix;
    const baseObjectPrefix = objectPrefix;
    const directionalInputPrefix = directionalPrefix || "";
    let directionalOutputPrefix = directionalInputPrefix;
    const alternateForms = [];
    const transitivityTarget = analysisVerb || verb;
    const isIntransitiveVerb = objectPrefix === "" && !isInherentlyTransitive(transitivityTarget);
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

    // Replace mu to m when a specific verb is used
    if (startsWithAny(verb, MU_TO_M_VERB_PREFIXES)) {
        objectPrefix = objectPrefix.replace("mu", "m");
    }

    // For ta indirect object, drop initial "i" in Vj/VC (i + consonant) starts
    if (objectPrefix === "ta" && verb.startsWith("i")) {
        const letters = splitVerbLetters(verb);
        const second = letters[1];
        if (second && !isVerbLetterVowel(second)) {
            verb = verb.slice(1);
        }
    }

    // When reflexive, iskalia loses initial 'i'
    if (objectPrefix === "mu" && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }
    subjectSuffix = applyTenseSuffixRules(tense, subjectSuffix);
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
        const isIntransitive = objectPrefix === "" && !isInherentlyTransitive(sustantivoBase);
        if (isIntransitive && verb.endsWith("ya") && getRuleLetterCount() > 2) {
            verb = verb.slice(0, -2);
        }
    }

    if (PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalResult = buildPretUniversalResult({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            analysisVerb,
            isYawi,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveOverride,
        });
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: universalResult || "—",
        };
    }

    if (PRETERITO_CLASS_TENSES.has(tense)) {
        const nonactiveClassOverride =
            getActiveTenseMode() === TENSE_MODE.verbo && getActiveDerivationMode() === DERIVATION_MODE.nonactive;
        const classResult = buildClassBasedResult({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
            analysisVerb,
            classFilter: nonactiveClassOverride ? "B" : CLASS_FILTER_STATE.activeClass,
            isYawi,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            suppletiveOverride,
        });
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: classResult || "—",
        };
    }

    // Preterito Izalco
    if (tense === "preterito-izalco") {
        if (subjectSuffix === "" && !verb.endsWith("tz")) {
            subjectSuffix = "k";
        }
        if (subjectSuffix === "" && verb.endsWith("witz")) {
            verb = verb.replace("witz", "wala");
            subjectSuffix = "k"
        }
        if (subjectSuffix === "t") {
            subjectSuffix = "ket";
        }
    }
/* GRAMATICAL RULES */
// Elision rule of double k (k/kw)
    const elisionTarget = directionalInputPrefix ? analysisTarget : verb;
    if (!directionalInputPrefix && objectPrefix === "k" && elisionTarget.startsWith("k")) {
        objectPrefix = "";
    }
    const isIntransitive = objectPrefix === "" && !isInherentlyTransitive(verb);
    const isTransitive = !isIntransitive;

// Class 4: Words ending in "ia" or "ua", Izalco preterite
if (endsWithAny(verb, IA_UA_SUFFIXES)) {
    switch (tense) {
        case "preterito-izalco":
            verb = verb.slice(0, -1); // drop final vowel
            switch (subjectSuffix) {
                case "":
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb + "j";
                    break;
            }
            break;
    }
}
// Class 4: Words ending in "ia" or "ua", deletion of last vowel + j (singular and plural)
    if (getRuleLetterCount() >= 4 && endsWithAny(verb, IA_UA_SUFFIXES)) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1) + "j";
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb.slice(0, -1);
                break;
        }
    }
// Class 1: Intransitives ending in ya
    if (isIntransitive && verb.endsWith("ya")) {
        const isYya = verb.endsWith("yya");
        switch (tense) {
            case "preterito":
                if (isYya) {
                    verb = verb.slice(0, -2);
                    if (subjectSuffix === "") {
                        subjectSuffix = "ki";
                    }
                    break;
                }
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                if (isYya) {
                    verb = verb.slice(0, -2);
                } else {
                    verb = verb;
                }
                break;
        }
    }
// Class 1: Transitves ending in [ya]
if (isTransitive && verb.endsWith("ya")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -2) + "sh";
                    subjectSuffix = "ki";
                    break;
                case "ket":
                    verb = verb.slice(0, -2) + "sh";
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -2) + "sh";
            break;
    }
}
    // Words ending in "ua", intransitives
    if (isIntransitive && verb.endsWith("ua")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1) + "j"
                        break;
                    case "ket":
                        verb = verb.slice(0, -1) + "j";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1) + "j";
                break;
        }
    }
// Class 1: Word "ita"/"ida" (shape-based), deletion of last vowel and mutation, transitive (singular and plural)
    if (isTransitive && isItaSyllableSequence(splitVerbSyllables(analysisTarget))) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -2) + "tz";
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -2) + "tz";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -2) + "tz";
                break;
        }
    }
// Class IRREGULAR: Word "witz", intransitive
    if (isIntransitive && verb === "witz") {
        switch (tense) {
            case "presente":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        break;
                    case "t":
                        subjectSuffix = subjectSuffix.replace("t", "et");
                        break;
                }
                break;
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                    case "ket":
                        verb = verb.replace("witz", "wala") + "j";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.replace("witz", "wala") + "j";
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb.replace("witz", "wala");
                break;
        }
    }
// Class 2: Applies to short words that end in -na, intransitives (ina, isa)
    if (getRuleLetterCount() === 3 && verb.endsWith("a") && isIntransitive) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
}
// Shorts verbs ending in wi, EWI
if (getRuleLetterCount() === 3 && verb.endsWith("wi") && !verb.includes("kwi")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    if (verb.endsWith("uwi")) {
                        const baseNoI = verb.slice(0, -1);
                        verb = verb.slice(0, -2) + "j";
                        subjectSuffix = "ki";
                        alternateForms.push({ verb: baseNoI, subjectSuffix });
                    } else {
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                    }
                    break;
                case "ket":
                    if (verb.endsWith("uwi")) {
                        const baseNoI = verb.slice(0, -1);
                        verb = verb.slice(0, -2) + "j";
                        alternateForms.push({ verb: baseNoI, subjectSuffix });
                    } else {
                        verb = verb.slice(0, -1);
                    }
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            if (verb.endsWith("uwi")) {
                const baseNoI = verb.slice(0, -1);
                verb = verb.slice(0, -2) + "j";
                alternateForms.push({ verb: baseNoI, subjectSuffix });
            } else {
                verb = verb.slice(0, -1);
            }
            break;
        case "presente-desiderativo":
        case "futuro":
        case "condicional":
            verb = verb;
            break;
    }
}
// KWA and KWI
if (["kwi", "kwa"].includes(verb)) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb + "j";
                    subjectSuffix = "";
                    break;
                case "ket":
                    verb = verb  + "j";
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb + "j";
            break;
        case "presente-desiderativo":
        case "futuro":
        case "condicional":
            verb = verb;
            break;
    }
}
// Class 2: Longer verbs ending in wi
if (getRuleLetterCount() >= 4 && verb.endsWith("wi") && !verb.includes("kwi")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    if (verb.endsWith("uwi")) {
                        const baseNoI = verb.slice(0, -1);
                        verb = verb.slice(0, -2) + "j";
                        subjectSuffix = "ki";
                        alternateForms.push({ verb: baseNoI, subjectSuffix });
                    } else {
                        verb = verb;
                        subjectSuffix = "k";
                    }
                    break;
                case "ket":
                    if (verb.endsWith("uwi")) {
                        const baseNoI = verb.slice(0, -1);
                        verb = verb.slice(0, -2) + "j";
                        alternateForms.push({ verb: baseNoI, subjectSuffix });
                    } else {
                        verb = verb.slice(0, -1);
                    }
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            if (verb.endsWith("uwi")) {
                const baseNoI = verb.slice(0, -1);
                verb = verb.slice(0, -2) + "j";
                alternateForms.push({ verb: baseNoI, subjectSuffix });
            } else {
                verb = verb.slice(0, -1);
            }
            break;
    }
}
// Class 2: Applies to words that have an [j] in the third position
    if (getVerbLetterFromEnd(verb, 3) === "j") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
// Class 2: Applies to words that have an [l] in the second position (tajkali)
    if (
        isTransitive &&
        getVerbLetterFromEnd(verb, 2) === "l" &&
        getVerbLetterFromEnd(verb, 1) !== "u"
    ) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
        }
    }
// Class 2: Rule for verbs with [i] in the first position, intransitives (tzakwik, tapuwik)
// Excludes rule: wetzki instead of wetzik (tz)
// Excludes rule: tantuk instead of tamtuk (m)
// Excludes rule: kuchki instead of kuchik (ch)
    if (isIntransitive && getVerbLetterFromEnd(verb, 1) === "i"
                            && !verb.endsWith("tzi")
                            && !verb.endsWith("wi")
                            && !verb.endsWith("ki") /*kalak not kalakik*/
                            && !verb.endsWith("mi")
                            && !verb.endsWith("chi")
                            && !verb.endsWith("ti")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        subjectSuffix = "k";
                    case "t":
                        break;
                }
                break;
        }
    }
// Class 2: Intransitive verbs with [m]
if (isIntransitive && getVerbLetterFromEnd(verb, 2) === "m") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb.slice(0, -2) + "n";
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -2) + "n";
            break;
    }
}
if (isIntransitive && getVerbLetterFromEnd(verb, 2) === "t") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb;
                    break;
            }
            break;
    }
}
// Class 2: Intransitive verbs with [k], only preterite
if (isIntransitive && getVerbLetterFromEnd(verb, 2) === "k") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb
                    break;
            }
            break;
    }
}
// Class 2: Intransitive verbs with [kw]
if (isIntransitive && getVerbLetterFromEnd(verb, 2) === "kw") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb.slice(0, -2);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -2);
            break;
    }
}

// Class 2: Intransitive verbs with [ch]
if (isIntransitive && getVerbLetterFromEnd(verb, 2) === "ch") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
                    subjectSuffix = "ki";
                    break;
                case "ket":
                    verb = verb.slice(0, -1);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
}
// Class 2: SHORT verbs with [k] (piki, paka, chuka, naka)
    if (verb.endsWith("ka")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
// Class 2: Intransitive verbs with [k] (chuka, naka, ijsika)
if (
    isIntransitive &&
    getRuleLetterCount() < 6 &&
    verb.endsWith("ka") &&
    getVerbLetterFromEnd(verb, 3) !== "u"
) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb;
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb;
            break;
    }
}

// Class 3: LONG verbs with [k], transitives (pustek, witek, sajsak)
if (
    isTransitive &&
    getRuleLetterCount() >= 6 &&
    !verb.endsWith("shka") &&
    endsWithAny(verb, ["ka", "ki"])
) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
                    break;
                case "ket":
                    verb = verb.slice(0, -1);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
    }
// Class 2: Verbs ending with [ki], transitives (piki, teki)
if (isTransitive && verb.endsWith("ki")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb;
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
}
// Class 2: LONG verbs ending with [aki], intransitives (kalak ONLY)
if (isIntransitive && verb.endsWith("aki") && getRuleLetterCount() >= 5) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
                    break;
                case "ket":
                    verb = verb.slice(0, -1);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
}
// Class 1/2: SHORT intransitive verbs ending with [ki] (paki, miki, temiki)
if (
    isIntransitive &&
    getVerbLetterFromEnd(verb, 3) !== "u" &&
    ((getRuleLetterCount() <= 4 && verb.endsWith("aki")) || verb.endsWith("iki"))
) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    subjectSuffix = "k";
                    break;
                case "ket":
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
}
// Class 2: Intransitive verbs ending with [ki] (atuki)
if (isIntransitive && getRuleLetterCount() >= 5 && verb.endsWith("uki")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
                    break;
                case "ket":
                    verb = verb;
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb;
            break;
    }
}
// Class 1: SHORT verbs with [ti], transitives (mati)
    if (
        verb.endsWith("ti") &&
        !verb.endsWith("lti") &&
        (isTransitive || getRuleLetterCount() > 5)
    ) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
        }
    }
// Class 1: SHORT verbs with [ta], transitives (pata)
    if (isTransitive && verb.endsWith("ta")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
// Class 1: Applies to short words that end in -tV, intransitives (pati)
    if (isIntransitive && getRuleLetterCount() <= 5 && getVerbLetterFromEnd(verb, 2) === "t") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
// Class 1: Applies to LONG words that ends in -na, intransitives (mayana, tawana)
    if (getRuleLetterCount() >= 5 && verb.endsWith("na") && isIntransitive) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
    /* CLASSIFICATION 3 */
// Class 3: Rule end kisa, intransitives (alawakis-ki, piltzinkis-ki, puknajkis-ki)
    if (isIntransitive && verb.endsWith("kisa")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
        }
    }
// Class 3: Applies to LONG words that ends in -na, transitives (tajtan-)
    if (getRuleLetterCount() >= 5 && verb.endsWith("ni") && isTransitive) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
        }
    }
// Applies to short words that ends in -na, transitives (ana)
    if (getRuleLetterCount() === 3 && verb.endsWith("na") && isTransitive) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
        }
    }
    // Clase 4: Rule for SHORT words ending in -kwV (kwa, kwi)
    if (
        isTransitive &&
        ((verb.endsWith("kwa") && !verb.endsWith("tzakwa")) ||
        (getRuleLetterCount() === 2 && verb.endsWith("kwi")))
    ) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb + "j";
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Rule for LONG words ending in -kwV (-tzak, -ijnek)
    if (
        (isTransitive && verb.endsWith("tzakwa")) ||
        (getRuleLetterCount() >= 4 && verb.endsWith("kwi"))
    ) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -2);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: words ending in na & wa, deletion of last vowel + ki, intransitives (ewa)
    if (getRuleLetterCount() === 4 && verb.endsWith("ni")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Words ending in na & wa, deletion of last vowel (pewa)
    if (
        (isTransitive && getRuleLetterCount() >= 5 && verb.endsWith("na")) ||
        (getRuleLetterCount() > 5 &&
            verb.endsWith("wa") &&
            getVerbLetterFromEnd(verb, 3) !== "j")
    ) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 3: Words ending in na & wa, deletion of last vowel ishtuna
    if (isIntransitive && getRuleLetterCount() >= 4 && verb.endsWith("na")) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: tzajtzi
    if (endsWithAny(verb, ["jtzi", "jtza"])) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Words ending in na & wa, deletion of last vowel
    if ((getRuleLetterCount() <= 5 && verb.endsWith("na"))) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -2) + "n";
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -2) + "n";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb = verb.slice(0, -2) + "n";
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Words ending in sha
if (verb.endsWith("sha")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
                    subjectSuffix = "ki";
                    break;
                case "ket":
                    verb = verb.slice(0, -1);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb = verb.slice(0, -1);
            break;
        case "presente-desiderativo":
        case "futuro":
        case "condicional":
            verb = verb;
            break;
    }
}
// Class 3: Short words ending in -mV will be -nki, transitive (sun-ki)
    if ((isTransitive && getRuleLetterCount() <= 5 && getVerbLetterFromEnd(verb, 2) === "m")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -2) + "n";
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -2) + "n";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb = verb.slice(0, -2) + "n";
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Short words ending in -nV will be -nki, transitive (-tajtan)
    if ((isTransitive && getVerbLetterFromEnd(verb, 2) === "n")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb = verb.slice(0, -1);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 5: Single rule for words ending in wa, deletion of last vowel + ki (singular) APPLIES TO J WORDS
    if (getRuleLetterCount() <= 4 && verb.endsWith("wa") && getVerbLetterFromEnd(verb, 3) !== "j") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
                }
        }
    }
    // Class 5: Single rule for words ending in wa, deletion of last vowel + ki, transitives (singular -, pewa)
    if (
        isTransitive &&
        getRuleLetterCount() >= 4 &&
        getRuleLetterCount() <= 5 &&
        verb.endsWith("wa")
    ) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: Single rule for words ending in wa, deletion of last vowel + k (singular - )
    if (isIntransitive && getRuleLetterCount() <= 5 && verb.endsWith("wa")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb
                        break;
                }
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1);
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: Rule end wa, del last vowel + k, intransitive (ajwa)
    if (isIntransitive && getVerbLetterFromEnd(verb, 3) === "j" && verb.endsWith("wa")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb;
                        subjectSuffix = "k";
                        break;
                    case "ket":
                        verb = verb;
                        break;
                }
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
            case "presente-desiderativo":
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 2: Verbs with [p], del vowel (kwep-ki)
    if (isTransitive && getVerbLetterFromEnd(verb, 2) === "p") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1);
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -1);
                        break;
                }
                break;
        }
    }
// Class 2: Verbs with [tz], del vowel (wetz-ki, nutz-ki)
if (getVerbLetterFromEnd(verb, 2) === "tz") {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
                    subjectSuffix = "ki";
                    break;
                case "ket":
                    verb = verb.slice(0, -1);
                    break;
            }
            break;
        case "perfecto":
        case "pluscuamperfecto":
        case "condicional-perfecto":
            verb = verb.slice(0, -1);
            break;
    }
}
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
    const setGeneratedText = (text) => {
        if (!silent) {
            const output = document.getElementById("generated-word");
            if (output) {
                output.textContent = text;
            }
        }
    };
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
    const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
            return null;
        }
        errorTargets.forEach((target) => setError(target));
        setGeneratedText(message);
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
    let isYawi = parsedVerb.isYawi;
    const directionalPrefix = parsedVerb.directionalPrefix;
    let suppletiveOverride = getSuppletiveOverride(parsedVerb);
    if (suppletiveOverride && !isPerfectiveTense(tense)) {
        verb = suppletiveOverride.imperfective.verb;
        analysisVerb = suppletiveOverride.imperfective.analysisVerb;
    }
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
    if (isNonactive) {
        suppletiveOverride = null;
        const derived = getNonactiveStemForSelection(verb, analysisVerb, {
            isTransitive: objectPrefix !== "" || isInherentlyTransitive(analysisVerb),
            isYawi,
        });
        verb = derived;
        analysisVerb = derived;
        if (directionalPrefix && derived.startsWith(directionalPrefix)) {
            analysisVerb = derived.slice(directionalPrefix.length);
        }
        isYawi = false;
    }
    isYawiImperativeSingular = isYawi && tense === "imperativo" && subjectSuffix === "";
    shouldAddYuVariant = isYawi && (tense === "presente" || isYawiImperativeSingular);

    if (verb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    } else {
        clearError("verb");
    }
    if (!VOWEL_RE.test(verb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnError(message, ["verb"]);
        if (error) {
            return error;
        }
    } else {
        clearError("verb");
    }
    if (!VOWEL_END_RE.test(verb)) {
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
    const isPassiveImpersonal =
        getActiveTenseMode() === TENSE_MODE.verbo && getActiveVoiceMode() === VOICE_MODE.passive;
    if (isPassiveImpersonal) {
        ({ subjectPrefix, subjectSuffix, objectPrefix } = applyPassiveImpersonal({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            analysisVerb,
        }));
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
        const isTransitiveVerb = parsedVerb.isMarkedTransitive || isInherentlyTransitive(analysisVerb);
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

    const appliedMorphology = applyMorphologyRules({
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        isYawi,
        directionalPrefix,
        suppletiveOverride,
    });
    ({ subjectPrefix, objectPrefix, subjectSuffix, verb } = appliedMorphology);
    const alternateForms = appliedMorphology.alternateForms || [];
    // Combine the prefixes, verb, and suffixes into a single word
    const forms = [];
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
    if (shouldAddYuVariant && (verb === "yaw" || verb === "yawi")) {
        const yuText = buildWord("yu");
        if (!forms.includes(yuText)) {
            forms.push(yuText);
        }
    }
    const generatedText = forms.join(" / ");

    // Use the typeWriter function to display the generated word letter by letter
    if (!silent) {
        typeWriter(generatedText, 'generated-word', 50);
        renderAllOutputs({
            verb: renderVerb,
            objectPrefix: baseObjectPrefix,
            tense,
            onlyTense: renderOnlyTense,
        });
    }

    return { result: generatedText, isReflexive };
}
let intervalId; // Declare a variable to store the interval ID

function renderAllOutputs({ verb, objectPrefix, tense, onlyTense = null }) {
    renderActiveConjugations({ verb, objectPrefix, onlyTense, tense });
    renderFullMatrix({ verb, objectPrefix });
}

function renderActiveConjugations({ verb, objectPrefix, onlyTense = null, tense = null }) {
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

function renderPretUniversalConjugations({
    verb,
    objectPrefix,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const selectedClass = PRETERITO_UNIVERSAL_ORDER.includes(tenseValue)
        ? tenseValue
        : getSelectedPretUniversalTab();
    const parsedVerb = parseVerbInput(verb);
    const forcedObjectPrefix = !isNonactiveMode ? parsedVerb.indirectObjectMarker : "";

    const buildBlock = (tenseValue, objectGroup, sectionEl) => {
        const { prefixes } = objectGroup;
        const groupKey = prefixes.join("|") || "intrans";
        const objectStateKey = getObjectStateKey({
            groupKey,
            tenseValue,
            mode: "universal",
            isNonactive: isNonactiveMode,
        });
        const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const objectOptions = getObjectToggleOptions(prefixes, {
            labelForPrefix: isNonactiveMode && isDirectGroup ? getPassiveToggleLabel : undefined,
        });
        const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
        const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
        let activeObjectPrefix = isIntransitiveGroup
            ? ""
            : (isNonactiveMode ? OBJECT_TOGGLE_ALL : getPreferredObjectPrefix(prefixes));
        const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
        if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
            activeObjectPrefix = storedObjectPrefix;
        }
        const isForcedObjectPrefix = !!(forcedObjectPrefix && prefixes.includes(forcedObjectPrefix));
        if (isForcedObjectPrefix) {
            activeObjectPrefix = forcedObjectPrefix;
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
        const subjectKey = `universal|${tenseValue}|${groupKey}`;
        const subjectOptions = getSubjectToggleOptions();
        const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
        let activeSubject = SUBJECT_TOGGLE_STATE.get(subjectKey) ?? SUBJECT_TOGGLE_ALL;
        if (!subjectOptionMap.has(activeSubject)) {
            activeSubject = SUBJECT_TOGGLE_ALL;
            SUBJECT_TOGGLE_STATE.set(subjectKey, activeSubject);
        }

        const toggleButtons = new Map();
        const subjectButtons = new Map();
        let setActiveSubject = null;
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
        if (prefixes.length > 1) {
            const toggle = document.createElement("div");
            toggle.className = "object-toggle object-toggle--stacked";
            toggle.setAttribute("role", "group");
            toggle.setAttribute("aria-label", "Objeto");
            objectOptions.forEach((entry) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "object-toggle-button";
                if (!isNonactiveMode && isForcedObjectPrefix) {
                    button.disabled = entry.id !== forcedObjectPrefix;
                }
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
                const buildNonactiveRow = (labelText, subText, prefix) => {
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
                    const result = generateWord({
                        silent: true,
                        skipTransitivityValidation: true,
                        override: {
                            subjectPrefix: "",
                            subjectSuffix: "",
                            objectPrefix: prefix,
                            verb,
                            tense: tenseValue,
                        },
                    }) || {};
                    const hideReflexive = !!(result && result.isReflexive && getObjectCategory(prefix) !== "reflexive");
                    value.classList.remove("conjugation-error", "conjugation-reflexive");
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
                    list.appendChild(row);
                };

                const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
                if (isIntransitiveOnly) {
                    buildNonactiveRow(getNonactivePersonLabel("", { isIntransitive: true }), "", "");
                    return;
                }

                const objectSelections = activeObjectPrefix === OBJECT_TOGGLE_ALL
                    ? prefixes.filter((prefix) => prefix !== "")
                    : [activeObjectPrefix];

                objectSelections.forEach((prefix) => {
                    if (!prefix) {
                        return;
                    }
                    if (isDirectGroup) {
                        buildNonactiveRow(
                            getNonactivePersonLabel(prefix, { isDirectGroup: true }),
                            getNonactivePersonSub(prefix),
                            prefix
                        );
                        return;
                    }
                    buildNonactiveRow(
                        getNonactivePersonLabel(prefix, {}),
                        getObjectLabelShort(prefix),
                        prefix
                    );
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
                    mode: "verb",
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
        } else {
            setActivePrefix(activeObjectPrefix);
            if (setActiveSubject) {
                setActiveSubject(activeSubject);
            }
        }
        return tenseBlock;
    };

    container.innerHTML = "";
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = buildObjectPrefixGroups(objectPrefixes);

    objectPrefixGroups.forEach((objectGroup) => {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const grid = document.createElement("div");
        grid.className = "tense-grid";

        grid.appendChild(buildBlock(selectedClass, objectGroup, objSection));

        objSection.appendChild(grid);
        container.appendChild(objSection);
    });
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
    const isInstrumentivo = resolvedTense === "instrumentivo";
    const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
    const showNonanimateOnly = resolvedTense === "sustantivo-verbal" || isInstrumentivo || isCalificativoInstrumentivo;
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const possessorKey = `noun|${resolvedTense}|${groupKey}|possessor`;
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue: resolvedTense, mode: "noun" });
    const subjectKey = `noun|${resolvedTense}|${groupKey}`;
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    const verbMeta = parseVerbInput(verb);
    const isTransitiveVerb = verbMeta.isMarkedTransitive || isInherentlyTransitive(verbMeta.analysisVerb);

    container.innerHTML = "";
    const objSection = document.createElement("div");
    objSection.className = "object-section";
    const grid = document.createElement("div");
    grid.className = "tense-grid";

    let activeObjectPrefix = "";
    if (isTransitiveVerb) {
        activeObjectPrefix = isCalificativoInstrumentivo
            ? "mu"
            : (Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)[0] || "");
    }
    const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
    const isPrefixAllowed = (prefix) => {
        if (isCalificativoInstrumentivo) {
            if (isTransitiveVerb) {
                return prefix === "mu";
            }
            return prefix === "";
        }
        return isTransitiveVerb
            ? SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(prefix)
            : prefix === "";
    };
    const allowedPrefixes = prefixes.filter(isPrefixAllowed);
    if (!allowedPrefixes.includes(activeObjectPrefix)) {
        activeObjectPrefix = allowedPrefixes[0] || "";
    }
    const objectOptions = getObjectToggleOptions(allowedPrefixes);
    const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
    if (storedObjectPrefix !== undefined && prefixes.includes(storedObjectPrefix) && isPrefixAllowed(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
    }
    let activePossessor = POSSESSOR_TOGGLE_STATE.get(possessorKey);
    if (activePossessor === undefined) {
        activePossessor = (isInstrumentivo || isCalificativoInstrumentivo) ? "i" : "";
    }
    const isSubjectOptionAllowed = (entry) => (
        !showNonanimateOnly
        || entry.id === SUBJECT_TOGGLE_ALL
        || isNonanimateSubject(entry.subjectPrefix, entry.subjectSuffix)
    );
    const showSubjectToggle = !showNonanimateOnly;
    const showObjectToggle = allowedPrefixes.length > 1;
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
    titleLabel.textContent = "sustantivo";
    tenseTitle.appendChild(titleLabel);
    const titleControls = document.createElement("div");
    titleControls.className = "tense-block__controls";
    titleControls.classList.add("tense-block__controls--stacked");
    const toggleButtons = new Map();
    const possessorButtons = new Map();
    const subjectButtons = new Map();
    if (showSubjectToggle) {
        const subjectToggle = document.createElement("div");
        subjectToggle.className = "object-toggle object-toggle--stacked";
        subjectToggle.setAttribute("role", "group");
        subjectToggle.setAttribute("aria-label", "Sujeto");
        subjectOptions.forEach((entry) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "object-toggle-button";
            button.textContent = entry.label;
            button.disabled = !isSubjectOptionAllowed(entry);
            button.addEventListener("click", () => {
                setActiveSubject(entry.id);
            });
            subjectButtons.set(entry.id, button);
            subjectToggle.appendChild(button);
        });
        titleControls.appendChild(subjectToggle);
    }
    const possessorToggle = document.createElement("div");
    possessorToggle.className = "object-toggle object-toggle--stacked";
    possessorToggle.setAttribute("role", "group");
    possessorToggle.setAttribute("aria-label", "Poseedor");
    POSSESSIVE_PREFIXES.forEach((entry) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "object-toggle-button";
        button.textContent = entry.value ? entry.value : "Ø";
        button.title = entry.label;
        button.addEventListener("click", () => {
            setActivePossessor(entry.value);
        });
        possessorButtons.set(entry.value, button);
        possessorToggle.appendChild(button);
    });
    titleControls.appendChild(possessorToggle);
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
        applyObjectSectionCategory(objSection, prefix);
    };

    const renderRows = () => {
        list.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = "Ingresa un verbo para ver las formas nominales.";
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
        objectSelections.forEach((objectPrefix) => {
            selections.forEach(({ group, selection, number }) => {
                const isAgentivo = resolvedTense === "agentivo";
                const isPossessed = activePossessor !== "";
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
                const possessorLabel = getPossessorLabelEs(activePossessor);
                const objectLabel = objectPrefix ? getObjectComboLabel(objectPrefix, isNawat) : "";
                personSub.textContent = buildPersonSub({
                    subjectLabel: basePersonSub,
                    possessorLabel,
                    objectLabel,
                });
                label.appendChild(personLabel);
                label.appendChild(personSub);

                const value = document.createElement("div");
                value.className = "conjugation-value";
                let result = {};
                if (isInstrumentivo) {
                    const instrumentivoMode = activePossessor === ""
                        ? INSTRUMENTIVO_MODE.absolutivo
                        : INSTRUMENTIVO_MODE.posesivo;
                    result = getInstrumentivoResult({
                        rawVerb: verb,
                        verbMeta,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                        mode: instrumentivoMode,
                        possessivePrefix: activePossessor,
                    }) || {};
                } else if (isCalificativoInstrumentivo) {
                    result = getCalificativoInstrumentivoResult({
                        rawVerb: verb,
                        verbMeta,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                        possessivePrefix: activePossessor,
                    }) || {};
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
                            possessivePrefix: activePossessor,
                        },
                    }) || {};
                }
                const comboObjectPrefix = activePossessor
                    ? (POSSESSIVE_TO_OBJECT_PREFIX[activePossessor] || "")
                    : "";
                const { shouldMask, isError } = getConjugationMaskState({
                    result,
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix,
                    comboObjectPrefix,
                    enforceInvalidCombo: Boolean(activePossessor),
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
    };

    const setActivePrefix = (prefix) => {
        activeObjectPrefix = prefix;
        OBJECT_TOGGLE_STATE.set(objectStateKey, prefix);
        titleLabel.textContent = "sustantivo";
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
    setActivePossessor(activePossessor);

    grid.appendChild(tenseBlock);
    objSection.appendChild(grid);
    container.appendChild(objSection);
}

function renderAllTenseConjugations({ verb, objectPrefix, onlyTense = null }) {
    const container = document.getElementById("all-tense-conjugations");
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() === COMBINED_MODE.nonactive;
    const selectedTense = onlyTense || getSelectedTenseTab();
    const parsedVerb = parseVerbInput(verb);
    const forcedObjectPrefix = !isNonactiveMode ? parsedVerb.indirectObjectMarker : "";

    const buildBlock = (tenseValue, objectGroup, sectionEl) => {
        const { prefixes } = objectGroup;
        const groupKey = prefixes.join("|") || "intrans";
        const objectStateKey = getObjectStateKey({
            groupKey,
            tenseValue,
            mode: "standard",
            isNonactive: isNonactiveMode,
        });
        const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const objectOptions = getObjectToggleOptions(prefixes, {
            labelForPrefix: isNonactiveMode && isDirectGroup ? getPassiveToggleLabel : undefined,
        });
        const objectOptionMap = new Map(objectOptions.map((entry) => [entry.id, entry]));
        const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
        let activeObjectPrefix = isIntransitiveGroup
            ? ""
            : (isNonactiveMode ? OBJECT_TOGGLE_ALL : getPreferredObjectPrefix(prefixes));
        const storedObjectPrefix = OBJECT_TOGGLE_STATE.get(objectStateKey);
        if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
            activeObjectPrefix = storedObjectPrefix;
        }
        const isForcedObjectPrefix = !!(forcedObjectPrefix && prefixes.includes(forcedObjectPrefix));
        if (isForcedObjectPrefix) {
            activeObjectPrefix = forcedObjectPrefix;
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
        const subjectKey = `standard|${tenseValue}|${groupKey}`;
        const subjectOptions = getSubjectToggleOptions();
        const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
        let activeSubject = SUBJECT_TOGGLE_STATE.get(subjectKey) ?? SUBJECT_TOGGLE_ALL;
        if (!subjectOptionMap.has(activeSubject)) {
            activeSubject = SUBJECT_TOGGLE_ALL;
            SUBJECT_TOGGLE_STATE.set(subjectKey, activeSubject);
        }

        const toggleButtons = new Map();
        const subjectButtons = new Map();
        let setActiveSubject = null;
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
        if (prefixes.length > 1) {
            const toggle = document.createElement("div");
            toggle.className = "object-toggle object-toggle--stacked";
            toggle.setAttribute("role", "group");
            toggle.setAttribute("aria-label", "Objeto");
            objectOptions.forEach((entry) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "object-toggle-button";
                if (!isNonactiveMode && isForcedObjectPrefix) {
                    button.disabled = entry.id !== forcedObjectPrefix;
                }
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
                const buildNonactiveRow = (labelText, subText, prefix) => {
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

                    const result = generateWord({
                        silent: true,
                        skipTransitivityValidation: true,
                        override: {
                            subjectPrefix: "",
                            subjectSuffix: "",
                            objectPrefix: prefix,
                            verb,
                            tense: tenseValue,
                        },
                    }) || {};
                    const hideReflexive = !!(result && result.isReflexive && getObjectCategory(prefix) !== "reflexive");
                    value.classList.remove("conjugation-error", "conjugation-reflexive");
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
                    list.appendChild(row);
                };

                const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
                if (isIntransitiveOnly) {
                    buildNonactiveRow(getNonactivePersonLabel("", { isIntransitive: true }), "", "");
                    return;
                }

                const objectSelections = activeObjectPrefix === OBJECT_TOGGLE_ALL
                    ? prefixes.filter((prefix) => prefix !== "")
                    : [activeObjectPrefix];

                objectSelections.forEach((prefix) => {
                    if (!prefix) {
                        return;
                    }
                    if (isDirectGroup) {
                        buildNonactiveRow(
                            getNonactivePersonLabel(prefix, { isDirectGroup: true }),
                            getNonactivePersonSub(prefix),
                            prefix
                        );
                        return;
                    }
                    buildNonactiveRow(
                        getNonactivePersonLabel(prefix, {}),
                        getObjectLabelShort(prefix),
                        prefix
                    );
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
                    mode: "universal",
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
        } else {
            setActivePrefix(activeObjectPrefix);
            if (setActiveSubject) {
                setActiveSubject(activeSubject);
            }
        }
        return tenseBlock;
    };

    container.innerHTML = "";
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = buildObjectPrefixGroups(objectPrefixes);

    objectPrefixGroups.forEach((objectGroup) => {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const grid = document.createElement("div");
        grid.className = "tense-grid";

        grid.appendChild(buildBlock(selectedTense, objectGroup, objSection));

        objSection.appendChild(grid);
        container.appendChild(objSection);
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

function typeWriter(text, elementId, delay = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    }
    element.innerHTML = "";

    // Clear any existing interval before starting a new one
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Store the new interval ID in the variable
    intervalId = setInterval(function() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(intervalId);
            intervalId = null; // Reset the interval ID variable
        }
    }, delay);
}
