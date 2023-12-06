function populateVerbTextbox(selectedVerb) {
    // Populate the verb textbox with the selected verb
    document.getElementById('verb').value = selectedVerb;
    generateWord();
}

var originalLabels = {};
var originalPlaceholder = "";
var originalSubmitButtonValue = "";

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
        "generate-button",
        "generate-button-label",
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
        "verb-label": "Tachiwalis",
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
        "reflexive-object-label": "Taselianisan",
        "mu-label": "isel (mu)",
        "indirect-object-label": "Taselianimet",
        "ta-label": "tajtatka (ta)",
        "te-label": "tajtakamet (te)",
        "no-object-label": "Te kanaj taseliani",
        "vi-label": "(tachiwalis te taselia)",
        "tense-label": "Kawit",
        "presente-label": "keman panu",
        "imperfecto-label": "keman panu katka",
        "preterito-izalco-label": "keman panuk (Ijtzalku)",
        "preterito-label": "keman panuk (Witzapan)",
        "perfecto-label": "keman panutuk",
        "pluscuamperfecto-label": "keman panutuya",
        "condicional-perfecto-label": "keman panutuskia",
        "futuro-label": "keman panus",
        "condicional-label": "keman panuskia",
        "generate-button": "Shiksenpuwa",
        "generate-button-label": "Tasenpuwalis",
        "feedback-heading": "Tanawatilis",
        "feedback-message": "Tikajsituk ini tzawalamat tupal! Tiknekit ma shiyulpaki kwak tinemi ka nikan. Su tiknekiskia titechilwia wan titechtajtanilia tatka, tipakiskiat timetzkakit! Tay tina ipanpa ini amat techpalewia timuyektiat.",
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
          originalLabels[elementId] = labelElement.textContent;
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
            verbInput.placeholder = "Shiktali tachiwalis ka nikan";
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
}

//Keyboard navigation methods for the selected options
document.addEventListener('keydown', function(event) {
    // Focus on the verb textbox when the 'Spacebar' key is pressed
    if (event.key === ' ') { // Spacebar key
        document.getElementById('verb').focus();
        // Prevent the default behavior of the 'Spacebar' key
        event.preventDefault();
    }
    // Exit the verb textbox when the 'Escape' key is pressed
    else if (event.key === 'Escape') {
        document.getElementById('verb').blur();
        // Prevent the default behavior of the 'Escape' key
        event.preventDefault();
    }
    else if (event.key === 'N') {
        document.getElementById('ni').checked = true;
        document.getElementById('subject-prefix').value = 'ni';
        generateWord();
        event.preventDefault();
    } else if (event.key === 'T') {
        // If 'ti' is currently checked, switch to 'we'
        if (document.getElementById('ti').checked) {
            document.getElementById('1-pl').checked = true;
            document.getElementById('subject-prefix').value = 'ti';
            document.getElementById('subject-suffix').value = 't';
            generateWord();
            event.preventDefault();
        } else {
            // Otherwise, switch to 'ti'
            document.getElementById('ti').checked = true;
            document.getElementById('subject-prefix').value = 'ti';
            document.getElementById('subject-suffix').value = '';
            generateWord();
            event.preventDefault();
        }
    } else if (event.key === 'Y') {
        // If 'third-person' is currently checked, switch to '3-pl'
        if (document.getElementById('third-person').checked) {
            document.getElementById('3-pl').checked = true;
            document.getElementById('subject-prefix').value = '';
            document.getElementById('subject-suffix').value = 't';
            generateWord();
            event.preventDefault();
        } else {
            // Otherwise, switch to 'third-person'
            document.getElementById('third-person').checked = true;
            document.getElementById('subject-prefix').value = '';
            document.getElementById('subject-suffix').value = '';
            generateWord();
            event.preventDefault();
        }
    } else if (event.key === 'A') {
        document.getElementById('2-pl').checked = true;
        document.getElementById('subject-prefix').value = 'an';
        generateWord();
        event.preventDefault();
    }
    // Object Prefix
    else if (event.key === '1') {
        document.getElementById('me').checked = true;
        document.getElementById('object-prefix').value = 'nech';
        generateWord();
        event.preventDefault();
    } else if (event.key === '2') {
        document.getElementById('you').checked = true;
        document.getElementById('object-prefix').value = 'metz';
        generateWord();
        event.preventDefault();
    } else if (event.key === '3') {
        document.getElementById('him-her-it').checked = true;
        document.getElementById('object-prefix').value = 'ki';
        generateWord();
        event.preventDefault();
    } else if (event.key === '4') {
        document.getElementById('us').checked = true;
        document.getElementById('object-prefix').value = 'tech';
        generateWord();
        event.preventDefault();
    } else if (event.key === '5') {
        document.getElementById('you-pl').checked = true;
        document.getElementById('object-prefix').value = 'metzin';
        generateWord();
        event.preventDefault();
    } else if (event.key === '6') {
        document.getElementById('them').checked = true;
        document.getElementById('object-prefix').value = 'kin';
        generateWord();
        event.preventDefault();
    } else if (event.key === '7') {
        document.getElementById('self').checked = true;
        document.getElementById('object-prefix').value = 'mu';
        generateWord();
        event.preventDefault();
    } else if (event.key === '8') {
        document.getElementById('thing').checked = true;
        document.getElementById('object-prefix').value = 'ta';
        generateWord();
        event.preventDefault();
    } else if (event.key === '9') {
        document.getElementById('people').checked = true;
        document.getElementById('object-prefix').value = 'te';
        generateWord();
        event.preventDefault();
    } else if (event.key === '0') {
        document.getElementById('intransitive').checked = true;
        document.getElementById('object-prefix').value = '';
        generateWord();
        event.preventDefault();
    }
    // Subject Suffix
    else if (event.key === 'S') {
        document.getElementById('subject-suffix').value = '';
        generateWord();
        event.preventDefault();
    } else if (event.key === 'P') {
        document.getElementById('subject-suffix').value = 't';
        generateWord();
        event.preventDefault();
    }
    // Tense
    else if (event.key === '!') {
        document.querySelector('input[name="tense"][value="presente"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '@') {
        document.querySelector('input[name="tense"][value="imperfecto"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '#') {
        document.querySelector('input[name="tense"][value="preterito-izalco"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '$') {
        document.querySelector('input[name="tense"][value="preterito"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '%') {
        document.querySelector('input[name="tense"][value="perfecto"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '^') {
        document.querySelector('input[name="tense"][value="pluscuamperfecto"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '&') {
        document.querySelector('input[name="tense"][value="condicional-perfecto"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '*') {
        document.querySelector('input[name="tense"][value="futuro"]').checked = true;
        generateWord();
        event.preventDefault();
    } else if (event.key === '(') {
        document.querySelector('input[name="tense"][value="condicional"]').checked = true;
        generateWord();
        event.preventDefault();
}
    // Generate Word
    else if (event.key === 'Enter') {
        // Call the generateWord() function
        generateWord();
        // Prevent the default behavior of the "Enter" key
        event.preventDefault();
    }
});

function generateWord() {
    // Get the selected values of the prefixes and suffixes
    let subjectPrefix = document.getElementById("subject-prefix").value;
    let objectPrefix = document.getElementById("object-prefix").value;
    let verb = document.getElementById("verb").value;
    let subjectSuffix = document.getElementById("subject-suffix").value;
    let tense = document.querySelector('input[name="tense"]:checked').value;

    // Remove error class from subject prefix, object prefix, and subject suffix
    document.getElementById("subject-prefix").classList.remove("error");
    document.getElementById("object-prefix").classList.remove("error");
    document.getElementById("subject-suffix").classList.remove("error");

    document.getElementById("object-prefix").onchange = function () {
        var selectedOption = this.value;
        document.querySelectorAll("input[name=object]").forEach(function (radioButton) {
            radioButton.checked = radioButton.value == selectedOption;
        });
    };

    //Only allow lowercase letters
    verb = verb.toLowerCase();
    verb = verb.replace(/[^a-z]/g, "");
    document.getElementById("verb").value = verb;

    // Define a regular expression pattern to match consonants at the start or end of the verb
    const consonantPattern = /^[bdfghjloqrvxz]|[bcdfghkjlmnpqrstvxy]$/i;

    // Check if the verb starts or ends with a consonant using the regular expression
    if (consonantPattern.test(verb)) {
        document.getElementById("verb").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: El verbo no está escrito correctamente.";
        return;
    } else {
        document.getElementById("verb").classList.remove("error");
    }
    if (verb === "") {
        document.getElementById("generated-word").textContent = "Error: El verbo no puede estar vacío. Ingrese verbo.";
        document.getElementById("verb").classList.add("error");
        return;
    } else {
        document.getElementById("verb").classList.remove("error");
    }
    
    // Check for invalid combinations of subject and object prefixes
    if ((subjectPrefix === "ni" && objectPrefix === "" && subjectSuffix === "t") ||
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
        (subjectPrefix === "ti" && objectPrefix === "nech" && subjectSuffix === "t")) {
        // Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("subject-prefix").classList.add("error");
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("subject-suffix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Combinacion inválida";
        return;
    } else {
        // Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
    }
    // VERB FORM IDENTIFIER ERROR MESSAGES
    const intransitiveVerbs = ["kamachalua", "tashkalua", "chulua", "pewa", "pejpewa", "tzinkisa", "kisa", "naka", "kunaka", "chuka", "ijsa", "isa", "mayana", "ina", "wetzka", "tawana", "tata", "sutawa", "ishpinawa", "pinawa", "witz", "kwika", "tajkwilua"];
    const transitiveVerbs = ["teki", "neki", "kaki", "namiki", "mamali", "tajkali", "elnamiki", "piki", "ijnekwi", "kwi", "uni", "mati", "mati", "witeki", "pusteki", "chijchimi", "tajtani", "ijkwani", "tanewi", "chiya", "piya", "uya", "patzka", "wika", "saka", "paka", "ishka", "tuka", "maka", "pishka", "teka"];
    
    // Exclude specific verbs from the derivation check
    const excludeFromDerivation = ["pewa", "ina"];
    
    // Filter out the excluded verbs from the intransitiveVerbs list
    const filteredIntransitiveVerbs = intransitiveVerbs.filter(verb => !excludeFromDerivation.includes(verb));
    
    // Check if the input verb is derived from and ends with any verb in the filteredIntransitiveVerbs list
    const isDerivedFromIntransitive = filteredIntransitiveVerbs.some(intransitiveVerb => verb.endsWith(intransitiveVerb));

    // Check if the input verb is derived from and ends with any verb in the transitiveVerbs list
    const isDerivedFromTransitive = transitiveVerbs.some(transitiveVerb => verb.endsWith(transitiveVerb));
    
    // Check if the input verb is intransitive or if it's a derivation of an intransitive verb
    if ((intransitiveVerbs.includes(verb) || isDerivedFromIntransitive) && objectPrefix !== "" && !verb.endsWith("tajkwilua") ||
        verb.endsWith("i") && !verb.endsWith("ajsi") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("u") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ya") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ka") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive ||
        verb.endsWith("ni") && objectPrefix !== "" && !transitiveVerbs.includes(verb) && !isDerivedFromTransitive) {
        // Add error class to object prefix and display error message
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Este verbo es intransitivo. Seleccione sin objeto.";
        return;
    } else {
        // Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
    }
    
    // Check for transitive verbs being used INTRANSITIVELY
    // Verbs that end in an "a" but exclude error message for certain exceptions in the intransitive verb list
    if ((transitiveVerbs.includes(verb) || isDerivedFromTransitive) && objectPrefix === "" && !verb.endsWith("tajtani") ||
        verb.endsWith("a") && !verb.endsWith("ya") && !verb.endsWith("ka") && objectPrefix === "" && !intransitiveVerbs.includes(verb) && !isDerivedFromIntransitive) {
        // Add error class to object prefix and display error message
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Este verbo es transitivo. Seleccione objeto.";
        return;
    } else {
        // Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
    }
    
    // Check for incorrect reflexive combinations of subject and object prefixes
    if ((subjectPrefix === "ni" && objectPrefix === "nech" && subjectSuffix === "") ||
        (subjectPrefix === "ni" && objectPrefix === "nech" && subjectSuffix === "t") ||
        (subjectPrefix === "ti" && objectPrefix === "metz") && subjectSuffix === "" ||
        (subjectPrefix === "an" && objectPrefix === "metzin" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "metzin" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "tech" && subjectSuffix === "t")) {
        // Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Esta combinación es reflexiva. Seleccione objeto reflexivo.";
        return;
    } else {
        document.getElementById("object-prefix").classList.remove("error");
    }

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
        (objectPrefix === "kin" && verb.startsWith("a")) ||
        (objectPrefix === "metzin" && verb.startsWith("a")) ||
        (objectPrefix === "kin" && verb.startsWith("e")) ||
        (objectPrefix === "metzin" && verb.startsWith("e")) ||
        (objectPrefix === "kin" && verb.startsWith("i")) ||
        (objectPrefix === "metzin" && verb.startsWith("i") ||
            (objectPrefix === "kin" && verb.startsWith("u")) ||
            (objectPrefix === "metzin" && verb.startsWith("u")))
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
            verb = verb.slice(0, -1);
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
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
    // Add event listeners to update the generated word when inputs change
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => input.addEventListener("change", generateWord));

    // Combine the prefixes, verb, and suffixes into a single word
    const generatedText = subjectPrefix + objectPrefix + verb + subjectSuffix;

    // Use the typeWriter function to display the generated word letter by letter
    typeWriter(generatedText, 'generated-word', 50);
}
let intervalId; // Declare a variable to store the interval ID

function typeWriter(text, elementId, delay = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
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

