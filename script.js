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
const TENSE_TABS_STATE = {
    selected: TENSE_ORDER[0],
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
    generateWord();
});

function generateWord(options = {}) {
    if (options instanceof Event) {
        options = {};
    }
    const silent = options.silent === true;
    const skipValidation = options.skipValidation === true;
    const renderOnlyTense = options.renderOnlyTense || null;
    const override = options.override || null;
    const subjectPrefixInput = document.getElementById("subject-prefix");
    const objectPrefixInput = document.getElementById("object-prefix");
    const subjectSuffixInput = document.getElementById("subject-suffix");
    const verbInput = document.getElementById("verb");
    // Get the selected values of the prefixes and suffixes
    let subjectPrefix = override?.subjectPrefix ?? subjectPrefixInput.value;
    let objectPrefix = override?.objectPrefix ?? getCurrentObjectPrefix();
    let verb = override?.verb ?? verbInput.value;
    let subjectSuffix = override?.subjectSuffix ?? subjectSuffixInput.value;
    let tense = override?.tense ?? "presente";
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
    const renderAll = () => {
        if (!silent) {
            renderAllConjugations({
                verb,
                objectPrefix: baseObjectPrefix,
                tense,
            });
        }
    };

    // Remove error class from subject prefix, object prefix, and subject suffix
    clearError("subject-prefix");
    clearError("object-prefix");
    clearError("subject-suffix");

    //Only allow lowercase letters
    verb = verb.toLowerCase();
    verb = verb.replace(/[^a-z]/g, "");
    const originalVerb = verb;
    if (!silent) {
        verbInput.value = verb;
    }

    if (verb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        if (!skipValidation) {
            setGeneratedText(message);
            setError("verb");
            if (!silent) {
                rerenderOutputs();
            }
            return { error: message };
        }
    } else {
        clearError("verb");
    }
    if (!/[aeiou]/.test(verb)) {
        const message = "El verbo no está escrito correctamente.";
        if (!skipValidation) {
            setError("verb");
            setGeneratedText(message);
            if (!silent) {
                rerenderOutputs();
            }
            return { error: message };
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
    if (!skipValidation && (
        (subjectPrefix === "ni" && objectPrefix === "" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "ki" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "metz" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "tech" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "mu" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "te" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "ta" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "metzin" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "tech" && subjectSuffix === "") ||
        (subjectPrefix === "ni" && objectPrefix === "tech" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "kin" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "metzin" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "metz") && subjectSuffix === "t" ||
        (subjectPrefix === "an" && objectPrefix === "metz" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "mu" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "te" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "ta" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "tech" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "nech" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "kin" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "metz" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "ki" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "nech" && subjectSuffix === "t")
    )) {
        // Add error class to subject prefix, object prefix, and subject suffix
        setError("subject-prefix");
        setError("object-prefix");
        setError("subject-suffix");
        const message = "Combinacion inválida";
        setGeneratedText(message);
        if (!silent) {
            rerenderOutputs();
        }
        return { error: message };
    } else {
        // Generate the word
        setGeneratedText(subjectPrefix + objectPrefix + verb + subjectSuffix);
    }
    // VERB FORM IDENTIFIER ERROR MESSAGES
    const intransitiveVerbs = ["kamachalua", "tashkalua", "chulua", "pewa", "pejpewa", "tzinkisa", "kisa", "naka", "kunaka", "chuka", "ijsa", "isa", "mayana", "ina", "wetzka", "tawana", "tata", "sutawa", "ishpinawa", "pinawa", "witz", "kwika", "tajkwilua"];
    const transitiveVerbs = ["teki", "neki", "kaki", "namiki", "mamali", "tajkali", "elnamiki", "piki", "ijnekwi", "kwi", "uni", "mati", "mati", "witeki", "pusteki", "chijchimi", "tajtani", "ijkwani", "tanewi", "chiya", "piya", "uya", "patzka", "wika", "saka", "paka", "ishka", "tuka", "maka", "pishka", "teka", "talia", "talua", "chalua", "salua", "tawilua"];
    
    // Exclude specific verbs from the derivation check
    const excludeFromDerivation = ["pewa", "ina"];
    
    // Filter out the excluded verbs from the intransitiveVerbs list
    const filteredIntransitiveVerbs = intransitiveVerbs.filter(verb => !excludeFromDerivation.includes(verb));
    
    // Check if the input verb is derived from and ends with any verb in the filteredIntransitiveVerbs list
    const isDerivedFromIntransitive = filteredIntransitiveVerbs.some(intransitiveVerb => verb.endsWith(intransitiveVerb));

    // Check if the input verb is derived from and ends with any verb in the transitiveVerbs list
    const isDerivedFromTransitive = transitiveVerbs.some(transitiveVerb => verb.endsWith(transitiveVerb));
    const isIaUa = verb.endsWith("ia") || verb.endsWith("ua");
    const forceTransitiveIaUa = isIaUa && (transitiveVerbs.includes(verb) || isDerivedFromTransitive);
    
    // Check if the input verb is intransitive or if it's a derivation of an intransitive verb
    if (!forceTransitiveIaUa && (
        (intransitiveVerbs.includes(verb) || isDerivedFromIntransitive) && objectPrefix !== "" && !verb.endsWith("tajkwilua") ||
        verb.endsWith("i") && !verb.endsWith("ajsi") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("u") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ya") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ka") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ni") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive
    )) {
        if (!skipValidation) {
            // Add error class to object prefix and display error message
            setError("object-prefix");
            const message = "Este verbo es intransitivo. Seleccione sin objeto.";
            setGeneratedText(message);
            if (!silent) {
                rerenderOutputs();
            }
            return { error: message };
        }
    } else {
        // Generate the word
        setGeneratedText(subjectPrefix + objectPrefix + verb + subjectSuffix);
    }
    
    // Check for transitive verbs being used INTRANSITIVELY
    // Verbs that end in an "a" but exclude error message for certain exceptions in the intransitive verb list
    if ((transitiveVerbs.includes(verb) || isDerivedFromTransitive || forceTransitiveIaUa) && objectPrefix === "" && !verb.endsWith("tajtani") ||
        verb.endsWith("a") && !verb.endsWith("ya") && !verb.endsWith("ka") && objectPrefix === "" && !intransitiveVerbs.includes(verb) && !isDerivedFromIntransitive) {
        if (!skipValidation) {
            // Add error class to object prefix and display error message
            setError("object-prefix");
            const message = "Este verbo es transitivo. Seleccione objeto.";
            setGeneratedText(message);
            if (!silent) {
                rerenderOutputs();
            }
            return { error: message };
        }
    } else {
        // Generate the word
        setGeneratedText(subjectPrefix + objectPrefix + verb + subjectSuffix);
    }
    
    clearError("object-prefix");

    // Check if the object prefix "ki" should be shortened to "k"
    if (subjectPrefix === "ni" || subjectPrefix === "ti" || verb.startsWith("i")) {
        if (objectPrefix !== "kin") {
            objectPrefix = objectPrefix.replace("ki", "k");
        }
    }

    // Check, when verb starts with "i", if subject prefix "ni", "ti" or "anh" should be shortened to "n" or "t" or changed to "anh" respectively
    if (
        (subjectPrefix === "ni" && objectPrefix === "" && verb.startsWith("i")) ||
        (subjectPrefix === "ti" && objectPrefix === "" && verb.startsWith("i")) ||
        (subjectPrefix === "an" && objectPrefix === "" && verb.startsWith("i"))) {
        subjectPrefix = subjectPrefix
            .replace("ni", "n")
            .replace("ti", "t")
            .replace("an", "anh");
    }

    // Check if subject prefix "an" should be changed to "anh" when the object prefix is empty and the verb starts with
    // "a", "e", "u"
    if (
        (subjectPrefix === "an" && objectPrefix === "" && verb.startsWith("a")) ||
        (subjectPrefix === "an" && objectPrefix === "" && verb.startsWith("e")) ||
        (subjectPrefix === "an" && objectPrefix === "" && verb.startsWith("u"))
    ) {
        subjectPrefix = subjectPrefix.replace("an", "anh");
    }

// Replace kin to kinh and metzin to metzinh before vowels
if (
    (objectPrefix === "kin" && /^[aeiou]/.test(verb)) ||
    (objectPrefix === "metzin" && /^[aeiou]/.test(verb))
) {
    objectPrefix = objectPrefix.replace("kin", "kinh").replace("metzin", "metzinh");
}

    // Replace mu to m when a specific verb is used
    if (verb.startsWith("altia") ||
        verb.startsWith("awiltia") ||
        verb.startsWith("ijnekwi") ||
        verb.startsWith("ijkwani") ||
        verb.startsWith("ijkwania") ||
        verb.startsWith("ijtutia") ||
        verb.startsWith("inaya") ||
        verb.startsWith("isuta") ||
        verb.startsWith("ijsuta") ||
        verb.startsWith("ijtunia") ||
        verb.startsWith("itunia")) {
        objectPrefix = objectPrefix.replace("mu", "m");
    }

    // When reflexive, iskalia loses initial 'i'
    if (objectPrefix === "mu" && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }
    // Imperfecto
    if (tense === "imperfecto" && subjectSuffix === "") {
        subjectSuffix = " katka";
    }
    if (tense === "imperfecto" && subjectSuffix === "t") {
        subjectSuffix = "t katka";
}
    // Preterito
    if (tense === "preterito" && subjectSuffix === "t") {
        subjectSuffix = "ket";
    }
    if (tense === "preterito-izalco" && subjectSuffix === "" && !verb.endsWith("tz")) {
        subjectSuffix = "k";
    }
    if (tense === "preterito-izalco" && subjectSuffix === "" && verb.endsWith("witz")) {
        verb = verb.replace("witz", "wala");
        subjectSuffix = "k"
    }
    if (tense === "preterito-izalco" && subjectSuffix === "t") {
        subjectSuffix = "ket";
    }
    // Perfecto
    if (tense === "perfecto" && subjectSuffix === "") {
        subjectSuffix = "tuk";
    }
    if (tense === "perfecto" && subjectSuffix === "t") {
        subjectSuffix = "tiwit";
    }
    // Pluscuamperfecto
    if (tense === "pluscuamperfecto" && subjectSuffix === "") {
        subjectSuffix = "tuya";
    }
    if (tense === "pluscuamperfecto" && subjectSuffix === "t") {
        subjectSuffix = "tuyat";
    }
    // Condicional perfecto
    if (tense === "condicional-perfecto" && subjectSuffix === "") {
        subjectSuffix = "tuskia";
    }
    if (tense === "condicional-perfecto" && subjectSuffix === "t") {
        subjectSuffix = "tuskiat";
    }
    // Futuro
    if (tense === "futuro" && subjectSuffix === "") {
        subjectSuffix = "s";
    }
    if (tense === "futuro" && subjectSuffix === "t") {
        subjectSuffix = "sket";
    }
    // Condicional
    if (tense === "condicional" && subjectSuffix === "") {
        subjectSuffix = "skia";
    }
    if (tense === "condicional" && subjectSuffix === "t") {
        subjectSuffix = "skiat";
    }
/* GRAMATICAL RULES */
// Elision rule of double k
    if (subjectPrefix === "ni" && objectPrefix === "k" && verb.startsWith("k") ||
        subjectPrefix === "ti" && objectPrefix === "k" && verb.startsWith("k")) {
        objectPrefix = "";
        }
// Class 4: Words ending in "ia" or "ua", Izalco preterite
if (verb.endsWith("ia") || verb.endsWith("ua")) {
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
    if (verb.length >= 4 && verb.endsWith("ia") || verb.length >= 4 && verb.endsWith("ua")) {
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
    if (objectPrefix === "" && verb.endsWith("ya")) {
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
if (objectPrefix !== "" && verb.endsWith("ya")) {
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
    if (objectPrefix === "" && verb.endsWith("ua")) {
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
    if (objectPrefix === "" && verb === "yawi") {
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
    if (objectPrefix === "" && verb === "witz") {
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
    if (verb.length === 3 && verb.endsWith("a") && objectPrefix === "") {
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
if (verb.length == 3 && verb.endsWith("wi") && !verb.includes("kwi")) {
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
if (verb === "kwi" || verb === "kwa") {
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
if (verb.length >= 4 && verb.endsWith("wi") && !verb.includes("kwi")) {
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
    if (verb[verb.length - 3] === 'j') {
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
    if (objectPrefix !== "" && verb[verb.length - 2] === 'l' && verb[verb.length - 1] !== 'u') {
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
    if (objectPrefix === "" && verb[verb.length - 1] === 'i'
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
if (objectPrefix === "" && verb[verb.length - 2] === 'm') {
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
if (objectPrefix === "" && verb[verb.length - 2] === 't') {
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
if (objectPrefix === "" && verb[verb.length - 2] === 'k') {
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
if (objectPrefix === "" && verb[verb.length - 3] === 'k' && verb[verb.length - 2] === 'w') {
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
if (objectPrefix === "" && verb[verb.length - 3] === 'c') {
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
if (objectPrefix === "" && verb.length < 6 && verb.endsWith("ka") && verb[verb.length - 3] !== 'u') {
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
if (objectPrefix !== "" && verb.length >= 6 && verb.endsWith("ka") && !verb.endsWith("shka") ||
    objectPrefix !== "" && verb.length >= 6 && verb.endsWith("ki") && !verb.endsWith("shka")) {
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
if (objectPrefix !== "" && verb.endsWith("ki")) {
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
if (objectPrefix === "" && verb.endsWith("aki") && verb.length >= 5) {
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
if ((objectPrefix === "" && verb.length <= 4 && verb.endsWith("aki") && verb[verb.length - 3] !== 'u' ||
    objectPrefix === "" && verb.endsWith("iki") && verb[verb.length - 3] !== 'u')) {
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
if (objectPrefix === "" && verb.length >= 5 && verb.endsWith("uki")) {
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
    if (verb.length <= 5 && verb[verb.length - 1] === 'u') {
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
    if (objectPrefix !== "" && verb.endsWith("ti") && !verb.endsWith("lti") || objectPrefix === "" && verb.length > 5 && verb.endsWith("ti") && !verb.endsWith("lti")) {
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
    if (objectPrefix !== "" && verb.endsWith("ta")) {
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
    if (objectPrefix === "" && verb.length <= 5 && verb[verb.length - 2] === 't') {
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
    if (verb.length >= 5 && verb.endsWith("na") && objectPrefix === "") {
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
    if (objectPrefix === "" && verb.endsWith("kisa")) {
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
    if (verb.length >= 5 && verb.endsWith("ni") && objectPrefix !== "") {
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
    if (verb.length === 3 && verb.endsWith("na") && objectPrefix !== "") {
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
    if (objectPrefix !== "" && verb.endsWith("kwa") && !verb.endsWith("tzakwa") || 
        objectPrefix !== "" && verb.length === 3 && verb.endsWith("kwi")) {
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
    if (objectPrefix !== "" && verb.endsWith("tzakwa") || verb.length >= 4 && verb.endsWith("kwi")) {
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
    if (verb.length == 4 && verb.endsWith("ni")) {
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
    if ((objectPrefix !== "" && verb.length >= 5 && verb.endsWith("na")) ||
        (verb.length > 5 && verb.endsWith("wa") && verb[verb.length - 3] !== 'j')) {
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
    if (objectPrefix === "" && verb.length >= 4 && verb.endsWith("na")) {
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
    if (verb.endsWith("jtzi") || verb.endsWith("jtza")) {
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
    if ((verb.length <= 5 && verb.endsWith("na"))) {
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
    if ((objectPrefix !== "" && verb.length <= 5 && verb[verb.length - 2] === "m")) {
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
    if ((objectPrefix !== "" && verb[verb.length - 2] === "n")) {
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
    if (verb.length <= 4 && verb.endsWith("wa") && !verb[verb.length - 3] === 'j') {
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
    if (objectPrefix !== "" && verb.length >= 4 && verb.length <= 5 && verb.endsWith("wa")) {
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
    if (objectPrefix === "" && verb.length <= 5 && verb.endsWith("wa")) {
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
    if (objectPrefix === "" && verb[verb.length - 3] == 'j' && verb.endsWith("wa")) {
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
    if (objectPrefix !== "" && verb[verb.length - 2] === 'p') {
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
if (verb[verb.length - 2] === 'z') {
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
    // Combine the prefixes, verb, and suffixes into a single word
    const generatedText = subjectPrefix + objectPrefix + verb + subjectSuffix;

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
