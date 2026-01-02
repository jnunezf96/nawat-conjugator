function populateVerbTextbox(selectedVerb) {
    // Populate the verb textbox with the selected verb
    document.getElementById('verb').value = selectedVerb;
    generateWord();
}

var originalLabels = {};
var originalPlaceholder = "";
var originalSubmitButtonValue = "";
function getTransitividadSelection() {
    return document.getElementById("object-prefix")?.value || "intransitivo";
}

const OBJECT_PREFIXES = [
    { value: "nech", labelText: "a mí (nech)" },
    { value: "metz", labelText: "a ti (metz)" },
    { value: "ki", labelText: "a ella/él (ki~k)" },
    { value: "tech", labelText: "a nosotras/os (tech)" },
    { value: "metzin", labelText: "a ustedes (metzin)" },
    { value: "kin", labelText: "a ellas/ellos (kin)" },
    { value: "mu", labelText: "a uno mismo (mu)" },
    { value: "ta", labelText: "algo (ta)" },
    { value: "te", labelText: "la gente (te)" },
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
    imperfecto: { "": " katka", t: "t katka" },
    preterito: { t: "ket" },
    perfecto: { "": "tuk", t: "tiwit" },
    pluscuamperfecto: { "": "tuya", t: "tuyat" },
    "condicional-perfecto": { "": "tuskia", t: "tuskiat" },
    futuro: { "": "s", t: "sket" },
    condicional: { "": "skia", t: "skiat" },
};

const MU_TO_M_VERB_PREFIXES = [
    "altia",
    "awiltia",
    "ijnekwi",
    "ijkwani",
    "ijkwania",
    "ijtutia",
    "inaya",
    "isuta",
    "ijsuta",
    "ijtunia",
    "itunia",
];
const IA_UA_SUFFIXES = ["ia", "ua"];
const AN_PREFIX_VOWEL_PREFIXES = ["a", "e", "u"];
const VOWELS = "aeiu";
const VOWEL_RE = /[aeiu]/;
const VOWEL_GLOBAL_RE = /[aeiu]/g;
const VOWEL_START_RE = /^[aeiu]/;
const DIGRAPHS = ["tz", "sh", "ch", "kw", "nh"];
const DIGRAPH_SET = new Set(DIGRAPHS);

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

function getVerbLetterFromEnd(verb, positionFromEnd) {
    const letters = splitVerbLetters(verb);
    return letters[letters.length - positionFromEnd] || "";
}

function isVerbLetterVowel(letter) {
    return letter.length === 1 && VOWELS.includes(letter);
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

function getObjectPrefixesForTransitividad() {
    return getTransitividadSelection() === "transitivo"
        ? OBJECT_PREFIXES.map((opt) => opt.value)
        : [""];
}

function getObjectLabel(prefix) {
    if (!prefix) {
        return "intransitivo";
    }
    return OBJECT_PREFIXES.find((opt) => opt.value === prefix)?.labelText || prefix;
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

function getCurrentObjectPrefix() {
    const prefixes = getObjectPrefixesForTransitividad();
    return prefixes[0] || "";
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
    const last = verb.slice(-1);
    if (!VOWELS.includes(last)) {
        return 0;
    }
    const prev = verb.slice(-2, -1);
    if (prev.length === 1 && VOWELS.includes(prev)) {
        return 2;
    }
    return 1;
}

function getTotalVowelCount(verb) {
    const matches = verb.match(VOWEL_GLOBAL_RE);
    return matches ? matches.length : 0;
}

function getPretUniversalCoreVowelCount(verb) {
    const lastLIndex = verb.lastIndexOf("l");
    if (lastLIndex >= 0 && lastLIndex < verb.length - 1) {
        return getTotalVowelCount(verb.slice(lastLIndex + 1));
    }
    return getTotalVowelCount(verb);
}

function getUniversalReplacementStem(verb) {
    if (verb.endsWith("ya")) {
        return verb.slice(0, -2) + "sh";
    }
    return verb.slice(0, -1) + "j";
}

function applyPretUniversalDeletionShift(stem) {
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
        return [stem.slice(0, -1) + "sh"];
    }
    return [stem];
}

function getPretUniversalVariants(verb, tense, isTransitive) {
    const vowelCount = getTrailingVowelCount(verb);
    const verbLetterCount = getVerbLetterCount(verb);
    const isMonosyllable = getPretUniversalCoreVowelCount(verb) === 1;
    const isDirectionalUni = verb === "uni";
    const isDerivedMonosyllable = isMonosyllable || isDirectionalUni;
    const endsWithCoreKwiKwa = verb.endsWith("kwi") || verb.endsWith("kwa");
    const hasCCVEnding = verbLetterCount >= 3 && endsWithCCV(verb) && !endsWithCoreKwiKwa;
    const endsWithKa = verb.endsWith("ka");
    const endsWithU = verb.endsWith("u");
    const isClassA = tense === "preterito-universal-1";
    const isClassB = tense === "preterito-universal-2";
    const isClassC = tense === "preterito-universal-4";
    const isClassD = tense === "preterito-universal-3";
    const isTransitiveUniI = isTransitive && (verb === "uni" || verb === "i");

    if (isTransitiveUniI && !(isClassB || isClassD)) {
        return null;
    }

    if (isClassC) {
        if (vowelCount !== 2 || !endsWithAny(verb, IA_UA_SUFFIXES)) {
            return null;
        }
        const replaced = getUniversalReplacementStem(verb);
        return [
            { base: replaced, suffix: "" },
            { base: replaced, suffix: "ki" },
        ];
    }

    if (isClassD) {
        if (vowelCount !== 1 || !isDerivedMonosyllable) {
            return null;
        }
        return [
            { base: verb + "j", suffix: "" },
            { base: verb + "j", suffix: "ki" },
        ];
    }

    if (vowelCount !== 1) {
        return null;
    }

    if (isClassA) {
        if (isMonosyllable || hasCCVEnding || endsWithKa || endsWithU) {
            return null;
        }
        if (isTransitive && verb === "ita") {
            return [
                { base: "itz", suffix: "ki" },
                { base: "itz", suffix: "" },
            ];
        }
        const deletedStems = applyPretUniversalDeletionShift(verb.slice(0, -1));
        const variants = [];
        deletedStems.forEach((base) => {
            variants.push({ base, suffix: "ki" }, { base, suffix: "" });
        });
        return variants;
    }

    if (isClassB) {
        return [{ base: verb, suffix: "k" }];
    }

    return null;
}

function buildPretUniversalResult({ verb, subjectPrefix, objectPrefix, subjectSuffix, tense }) {
    const variants = getPretUniversalVariants(verb, tense, objectPrefix !== "");
    if (!variants || variants.length === 0) {
        return null;
    }
    const prefix = subjectPrefix + objectPrefix;
    const isPlural = subjectSuffix === "t";
    const seen = new Set();
    const results = [];

    variants.forEach((variant) => {
        const suffix = isPlural ? "ket" : variant.suffix;
        const form = `${prefix}${variant.base}${suffix}`;
        if (!seen.has(form)) {
            seen.add(form);
            results.push(form);
        }
    });

    return results.join(" / ");
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
        TENSE_TABS_STATE.selected = value;
    }
}

function getSelectedPretUniversalTab() {
    return PRETERITO_UNIVERSAL_TABS_STATE.selected;
}

function setSelectedPretUniversalTab(value) {
    if (PRETERITO_UNIVERSAL_ORDER.includes(value)) {
        PRETERITO_UNIVERSAL_TABS_STATE.selected = value;
    }
}

function getNormalizedVerb() {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return "";
    }
    return verbInput.value.toLowerCase().replace(/[^a-z]/g, "");
}

function renderTenseTabs() {
    const container = document.getElementById("tense-tabs");
    if (!container) {
        return;
    }
    container.innerHTML = "";
    TENSE_ORDER.forEach((tenseValue) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        if (tenseValue === getSelectedTenseTab()) {
            button.classList.add("is-active");
        }
        button.textContent = TENSE_LABELS[tenseValue] || tenseValue;
        button.addEventListener("click", () => {
            setSelectedTenseTab(tenseValue);
            renderTenseTabs();
            renderAllOutputs({
                verb: getNormalizedVerb(),
                objectPrefix: getCurrentObjectPrefix(),
                tense: tenseValue,
            });
        });
        container.appendChild(button);
    });
}

function renderPretUniversalTabs() {
    const container = document.getElementById("preterito-universal-tabs");
    if (!container) {
        return;
    }
    container.innerHTML = "";
    PRETERITO_UNIVERSAL_ORDER.forEach((tenseValue) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        if (tenseValue === getSelectedPretUniversalTab()) {
            button.classList.add("is-active");
        }
        button.textContent = PRETERITO_UNIVERSAL_LABELS[tenseValue] || tenseValue;
        button.addEventListener("click", () => {
            setSelectedPretUniversalTab(tenseValue);
            renderPretUniversalTabs();
            renderPretUniversalConjugations({
                verb: getNormalizedVerb(),
                objectPrefix: getCurrentObjectPrefix(),
            });
        });
        container.appendChild(button);
    });
}
const SUBJECT_COMBINATIONS = [
    { id: "ni", labelEs: "yo", labelNa: "naja", subjectPrefix: "ni", subjectSuffix: "" },
    { id: "ti", labelEs: "tú / usted", labelNa: "taja", subjectPrefix: "ti", subjectSuffix: "" },
    { id: "third-person", labelEs: "ella / él", labelNa: "yaja", subjectPrefix: "", subjectSuffix: "" },
    { id: "1-pl", labelEs: "nosotras / nosotros", labelNa: "tejemet", subjectPrefix: "ti", subjectSuffix: "t" },
    { id: "2-pl", labelEs: "ustedes", labelNa: "anmejemet", subjectPrefix: "an", subjectSuffix: "t" },
    { id: "3-pl", labelEs: "ellas / ellos", labelNa: "yejemet", subjectPrefix: "", subjectSuffix: "t" },
];
const TENSE_ORDER = [
    "presente",
    "imperfecto",
    "preterito-izalco",
    "preterito",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
    "futuro",
    "condicional",
];
const TENSE_LABELS = {
    "presente": "presente",
    "imperfecto": "pretérito imperfecto",
    "preterito-izalco": "pretérito (Izalco)",
    "preterito": "pretérito (Witzapan)",
    "perfecto": "pretérito perfecto",
    "pluscuamperfecto": "pretérito pluscuamperfecto",
    "condicional-perfecto": "pretérito condicional perfecto",
    "futuro": "futuro",
    "condicional": "futuro condicional",
};
const PRETERITO_UNIVERSAL_ORDER = [
    "preterito-universal-1",
    "preterito-universal-2",
    "preterito-universal-4",
    "preterito-universal-3",
];
const PRETERITO_UNIVERSAL_LABELS = {
    "preterito-universal-1": "Class A ((C)VCV; -V + ki/0)",
    "preterito-universal-2": "Class B ((C)VCCV/(C)Vka/(C)VCu; V + k)",
    "preterito-universal-3": "Class D (mono -CV -> -CVj)",
    "preterito-universal-4": "Class C (-ia/-ua -> -ij/-uj)",
};
const TENSE_TABS_STATE = {
    selected: TENSE_ORDER[0],
};
const PRETERITO_UNIVERSAL_TABS_STATE = {
    selected: PRETERITO_UNIVERSAL_ORDER[0],
};

// Generate translated label
function changeLanguage() {
    var languageSwitch = document.getElementById("language");
    var selectedLanguage = languageSwitch.checked ? "nawat" : "original";
  
    var labelElementIds = [
        "subject-prefix-label",
        "object-prefix-label",
        "verb-label",
        "subject-suffix-label",
        "intransitive-verbs-label",
        "transitive-verbs-label",
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
        "feedback-heading",
        "feedback-message",
        "name-label",
        "email-label",
        "message-label",
        "submit-button",
        "copyright-label",
    ];

    var translations = {
        "subject-prefix-label": "Itzinhilpika ne tachiwani",
        "object-prefix-label": "Itzinhilpika ne taseliani",
        "verb-label": "Ne tachiwalis",
        "subject-suffix-label": "Itzunhilpika ne tachiwani",
        "intransitive-verbs-label": "Shikpejpena se tachiwalis te taselia",
        "transitive-verbs-label": "Shikpejpena se tachiwalis taselia",
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
        "imperfecto-label": "tay panu katka",
        "preterito-izalco-label": "tay panuk (Ijtzalku)",
        "preterito-label": "tay panuk (Witzapan)",
        "perfecto-label": "tay panutuk",
        "pluscuamperfecto-label": "tay panutuya",
        "condicional-perfecto-label": "tay panutuskia",
        "futuro-label": "tay panus",
        "condicional-label": "tay panuskia",
        "feedback-heading": "Shitanawati",
        "feedback-message": "Tikajsik tutzawalamaw! Tiknekit ma shiyulpaki kwak tinemi ka nikan. Su tiknekiskia titechilwia wan titechtajtanilia tatka, tipakiskiat timetzkakit! Tay tina ipanpa ini amat techpalewia timuyektiat.",
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

    document.getElementById("footer").textContent = "Jaime Núñez";

    updateMassHeadings();
    renderTenseTabs();
    renderPretUniversalTabs();
    renderAllOutputs({
        verb: verbInput.value.toLowerCase().replace(/[^a-z]/g, ""),
        objectPrefix: document.getElementById("object-prefix").value,
        tense: document.getElementById("tense-select")?.value || "presente",
    });
}

//Keyboard navigation (kept minimal now that radios are removed)
document.addEventListener('keydown', function(event) {
    const verbEl = document.getElementById('verb');
    const objectSelect = document.getElementById("object-prefix");
    if (event.key === ' ') { // Spacebar key
        if (verbEl) verbEl.focus();
        event.preventDefault();
    } else if (event.key === 'Escape') {
        if (verbEl) verbEl.blur();
        event.preventDefault();
    } else if (event.key === 'Enter') {
        generateWord();
        event.preventDefault();
    } else if (event.key === '1' && objectSelect) {
        objectSelect.value = "intransitivo";
        updateMassHeadings();
        generateWord();
        event.preventDefault();
    } else if (event.key === '2' && objectSelect) {
        objectSelect.value = "transitivo";
        updateMassHeadings();
        generateWord();
        event.preventDefault();
    }
});

// Auto-generate on load and while typing
document.addEventListener("DOMContentLoaded", () => {
    const verbEl = document.getElementById("verb");
    if (verbEl) {
        verbEl.addEventListener("input", generateWord);
    }
    const objectSelect = document.getElementById("object-prefix");
    if (objectSelect) {
        objectSelect.addEventListener("change", () => {
            updateMassHeadings();
            generateWord();
        });
    }
    updateMassHeadings();
    renderTenseTabs();
    renderPretUniversalTabs();
    generateWord();
});


function applyMorphologyRules({ subjectPrefix, objectPrefix, subjectSuffix, verb, tense }) {
    // Check if the object prefix "ki" should be shortened to "k"
    if (objectPrefix !== "kin" && (["ni", "ti"].includes(subjectPrefix) || verb.startsWith("i"))) {
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

    // When reflexive, iskalia loses initial 'i'
    if (objectPrefix === "mu" && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }
    subjectSuffix = applyTenseSuffixRules(tense, subjectSuffix);

    if (PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalResult = buildPretUniversalResult({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            tense,
        });
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: universalResult || "—",
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
// Elision rule of double k
    if (objectPrefix === "k" && verb.startsWith("k") && ["ni", "ti"].includes(subjectPrefix)) {
        objectPrefix = "";
    }
    const isIntransitive = objectPrefix === "";
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
    if (getVerbLetterCount(verb) >= 4 && endsWithAny(verb, IA_UA_SUFFIXES)) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -1) + "j";
                break;
            case "futuro":
            case "condicional":
                verb = verb.slice(0, -1);
                break;
        }
    }
// Class 1: Intransitives ending in ya
    if (isIntransitive && verb.endsWith("ya")) {
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
// Class 1: Word "ita", deletion of last vowel and mutation, transitive (singular and plural)
    if (objectPrefix.value !== "" && verb === "ita") {
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
// Class IRREGULAR: Word "yawi", deletion of last 2 and mutation, intransitive (singular and plural)
    if (isIntransitive && verb === "yawi") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -2) + "j";
                        subjectSuffix = "ki";
                        break;
                    case "ket":
                        verb = verb.slice(0, -2) + "j";
                        break;
                }
                break;
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -2) + "j";
                break;
            case "futuro":
                verb = verb.slice(0, -2);
                break;
            case "condicional":
                verb = verb.slice(0, -2);
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
            case "futuro":
            case "condicional":
                verb = verb.replace("witz", "wala");
                break;
        }
    }
// Class 2: Applies to short words that end in -na, intransitives (ina, isa)
    if (getVerbLetterCount(verb) === 3 && verb.endsWith("a") && isIntransitive) {
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
if (getVerbLetterCount(verb) === 3 && verb.endsWith("wi") && !verb.includes("kwi")) {
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
        case "futuro":
        case "condicional":
            verb = verb;
            break;
    }
}
// Class 2: Longer verbs ending in wi
if (getVerbLetterCount(verb) >= 4 && verb.endsWith("wi") && !verb.includes("kwi")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb;
                    subjectSuffix = "k";
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
    getVerbLetterCount(verb) < 6 &&
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
    getVerbLetterCount(verb) >= 6 &&
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
if (isIntransitive && verb.endsWith("aki") && getVerbLetterCount(verb) >= 5) {
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
    ((getVerbLetterCount(verb) <= 4 && verb.endsWith("aki")) || verb.endsWith("iki"))
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
if (isIntransitive && getVerbLetterCount(verb) >= 5 && verb.endsWith("uki")) {
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
// Class 1: All verbs ending with [u] (panu, temu)
    if (getVerbLetterCount(verb) <= 5 && getVerbLetterFromEnd(verb, 1) === "u") {
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
        (isTransitive || getVerbLetterCount(verb) > 5)
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
    if (isIntransitive && getVerbLetterCount(verb) <= 5 && getVerbLetterFromEnd(verb, 2) === "t") {
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
    if (getVerbLetterCount(verb) >= 5 && verb.endsWith("na") && isIntransitive) {
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
    if (getVerbLetterCount(verb) >= 5 && verb.endsWith("ni") && isTransitive) {
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
    if (getVerbLetterCount(verb) === 3 && verb.endsWith("na") && isTransitive) {
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
        (getVerbLetterCount(verb) === 2 && verb.endsWith("kwi")))
    ) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb + "j";
                break;
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Rule for LONG words ending in -kwV (-tzak, -ijnek)
    if (
        (isTransitive && verb.endsWith("tzakwa")) ||
        (getVerbLetterCount(verb) >= 4 && verb.endsWith("kwi"))
    ) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb.slice(0, -2);
                break;
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: words ending in na & wa, deletion of last vowel + ki, intransitives (ewa)
    if (getVerbLetterCount(verb) === 4 && verb.endsWith("ni")) {
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
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Words ending in na & wa, deletion of last vowel (pewa)
    if (
        (isTransitive && getVerbLetterCount(verb) >= 5 && verb.endsWith("na")) ||
        (getVerbLetterCount(verb) > 5 &&
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
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 3: Words ending in na & wa, deletion of last vowel ishtuna
    if (isIntransitive && getVerbLetterCount(verb) >= 4 && verb.endsWith("na")) {
        switch (tense) {
            case "preterito":
            case "perfecto":
            case "pluscuamperfecto":
            case "condicional-perfecto":
                verb = verb;
                break;
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
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 3: Words ending in na & wa, deletion of last vowel
    if ((getVerbLetterCount(verb) <= 5 && verb.endsWith("na"))) {
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
        case "futuro":
        case "condicional":
            verb = verb;
            break;
    }
}
// Class 3: Short words ending in -mV will be -nki, transitive (sun-ki)
    if ((isTransitive && getVerbLetterCount(verb) <= 5 && getVerbLetterFromEnd(verb, 2) === "m")) {
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
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
// Class 5: Single rule for words ending in wa, deletion of last vowel + ki (singular) APPLIES TO J WORDS
    if (getVerbLetterCount(verb) <= 4 && verb.endsWith("wa") && getVerbLetterFromEnd(verb, 3) !== "j") {
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
        getVerbLetterCount(verb) >= 4 &&
        getVerbLetterCount(verb) <= 5 &&
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
            case "futuro":
            case "condicional":
                verb = verb;
                break;
        }
    }
    // Class 1: Single rule for words ending in wa, deletion of last vowel + k (singular - )
    if (isIntransitive && getVerbLetterCount(verb) <= 5 && verb.endsWith("wa")) {
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
    return { subjectPrefix, objectPrefix, subjectSuffix, verb };
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
    let tense = override?.tense ?? "presente";
    const isPretUniversal = PRETERITO_UNIVERSAL_ORDER.includes(tense);
    const baseObjectPrefix = objectPrefix;
    let isReflexive = objectPrefix === "mu";
    const rerenderOutputs = () =>
        renderAllOutputs({
            verb,
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
        }
    };
    const setError = (id) => {
        if (!silent) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add("error");
            }
        }
    };
    const setGeneratedText = (text) => {
        if (!silent) {
            const output = document.getElementById("generated-word");
            if (output) {
                output.textContent = text;
            }
        }
    };
    const buildWord = () => subjectPrefix + objectPrefix + verb + subjectSuffix;
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

    //Only allow lowercase letters
    verb = verb.toLowerCase().replace(/[^a-z]/g, "");
    const originalVerb = verb;
    if (!silent) {
        verbInput.value = verb;
    }

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

    // Auto-switch to reflexive when subject/object are the same person and number.
    if (isSamePersonReflexive(subjectPrefix, subjectSuffix, objectPrefix)) {
        objectPrefix = "mu";
        isReflexive = true;
        clearError("object-prefix");
    } else if (objectPrefix === "mu") {
        isReflexive = true;
    }
    
    // Check for invalid combinations of subject and object prefixes
    if (!skipValidation && INVALID_COMBINATION_KEYS.has(
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

    ({ subjectPrefix, objectPrefix, subjectSuffix, verb } = applyMorphologyRules({
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        tense,
    }));
    // Combine the prefixes, verb, and suffixes into a single word
    const generatedText = buildWord();

    // Use the typeWriter function to display the generated word letter by letter
    if (!silent) {
        typeWriter(generatedText, 'generated-word', 50);
        renderAllOutputs({
            verb: originalVerb,
            objectPrefix: baseObjectPrefix,
            tense,
            onlyTense: renderOnlyTense,
        });
    }

    return { result: generatedText, isReflexive };
}
let intervalId; // Declare a variable to store the interval ID

function renderAllOutputs({ verb, objectPrefix, tense, onlyTense = null }) {
    renderAllTenseConjugations({ verb, objectPrefix, onlyTense });
    renderPretUniversalConjugations({ verb, objectPrefix });
    renderFullMatrix({ verb, objectPrefix });
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

        const label = document.createElement("div");
        label.className = "conjugation-label";
        label.textContent = isNawat ? combo.labelNa : combo.labelEs;

        const value = document.createElement("div");
        value.className = "conjugation-value";
        value.textContent = result.error ? "—" : result.result;
        if (result.error) {
            value.classList.add("conjugation-error");
        } else if (result.isReflexive) {
            value.classList.add("conjugation-reflexive");
        }

        row.appendChild(label);
        row.appendChild(value);
        container.appendChild(row);
    });
}

function renderPretUniversalConjugations({ verb, objectPrefix }) {
    const container = document.getElementById("all-preterito-universal-conjugations");
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const selectedClass = getSelectedPretUniversalTab();

    const buildBlock = (tenseValue, gridObjectPrefix, objectLabel) => {
        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${gridObjectPrefix || "intrans"}-${tenseValue}`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        tenseTitle.textContent = objectLabel;
        tenseBlock.appendChild(tenseTitle);

        const list = document.createElement("div");
        list.className = "conjugation-list";

        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = "Ingresa un verbo para ver las conjugaciones.";
            list.appendChild(placeholder);
            tenseBlock.appendChild(list);
            return tenseBlock;
        }

        SUBJECT_COMBINATIONS.forEach((combo) => {
            const result = generateWord({
                silent: true,
                skipTransitivityValidation: true,
                override: {
                    subjectPrefix: combo.subjectPrefix,
                    subjectSuffix: combo.subjectSuffix,
                    objectPrefix: gridObjectPrefix,
                    verb,
                    tense: tenseValue,
                },
            }) || {};

            const row = document.createElement("div");
            row.className = "conjugation-row";

            const label = document.createElement("div");
            label.className = "conjugation-label";
            label.textContent = isNawat ? combo.labelNa : combo.labelEs;

            const value = document.createElement("div");
            value.className = "conjugation-value";
            value.textContent = result.error ? "—" : result.result;
            if (result.error) {
                value.classList.add("conjugation-error");
            } else if (result.isReflexive) {
                value.classList.add("conjugation-reflexive");
            }

            row.appendChild(label);
            row.appendChild(value);
            list.appendChild(row);
        });

        tenseBlock.appendChild(list);
        return tenseBlock;
    };

    container.innerHTML = "";
    const objectPrefixes = getObjectPrefixesForTransitividad();

    objectPrefixes.forEach((objPrefix) => {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const category = getObjectCategory(objPrefix);
        if (category !== "intransitive") {
            objSection.classList.add(`object-section--${category}`);
        }
        const objectLabel = getObjectLabel(objPrefix);

        const grid = document.createElement("div");
        grid.className = "tense-grid";

        grid.appendChild(buildBlock(selectedClass, objPrefix, objectLabel));

        objSection.appendChild(grid);
        container.appendChild(objSection);
    });
}

function renderAllTenseConjugations({ verb, objectPrefix, onlyTense = null }) {
    const container = document.getElementById("all-tense-conjugations");
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const selectedTense = getSelectedTenseTab();

    const buildBlock = (tenseValue, gridObjectPrefix, objectLabel) => {
        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${gridObjectPrefix || "intrans"}-${tenseValue}`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        tenseTitle.textContent = objectLabel;
        tenseBlock.appendChild(tenseTitle);

        const list = document.createElement("div");
        list.className = "conjugation-list";

        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = "Ingresa un verbo para ver las conjugaciones.";
            list.appendChild(placeholder);
            tenseBlock.appendChild(list);
            return tenseBlock;
        }

        SUBJECT_COMBINATIONS.forEach((combo) => {
            const result = generateWord({
                silent: true,
                skipTransitivityValidation: true,
                override: {
                    subjectPrefix: combo.subjectPrefix,
                    subjectSuffix: combo.subjectSuffix,
                    objectPrefix: gridObjectPrefix,
                    verb,
                    tense: tenseValue,
                },
            }) || {};

            const row = document.createElement("div");
            row.className = "conjugation-row";

            const label = document.createElement("div");
            label.className = "conjugation-label";
            label.textContent = isNawat ? combo.labelNa : combo.labelEs;

            const value = document.createElement("div");
            value.className = "conjugation-value";
            value.textContent = result.error ? "—" : result.result;
            if (result.error) {
                value.classList.add("conjugation-error");
            } else if (result.isReflexive) {
                value.classList.add("conjugation-reflexive");
            }

            row.appendChild(label);
            row.appendChild(value);
            list.appendChild(row);
        });

        tenseBlock.appendChild(list);
        return tenseBlock;
    };

    container.innerHTML = "";
    const objectPrefixes = getObjectPrefixesForTransitividad();

    objectPrefixes.forEach((objPrefix) => {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const category = getObjectCategory(objPrefix);
        if (category !== "intransitive") {
            objSection.classList.add(`object-section--${category}`);
        }
        const objectLabel = getObjectLabel(objPrefix);

        const grid = document.createElement("div");
        grid.className = "tense-grid";

        grid.appendChild(buildBlock(selectedTense, objPrefix, objectLabel));

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
                cell.textContent = result.error ? "—" : result.result;
                if (result.error) {
                    cell.classList.add("conjugation-error");
                } else if (result.isReflexive) {
                    cell.classList.add("conjugation-reflexive");
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
