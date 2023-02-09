document.getElementById("verb").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateWord();
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

    // Check for incorrect reflexive combinations of subject and object prefixes
    if ((subjectPrefix === "ni" && objectPrefix === "nech" && subjectSuffix === "") ||
        (subjectPrefix === "ni" && objectPrefix === "nech" && subjectSuffix === "t") ||
        (subjectPrefix === "ti" && objectPrefix === "metz") && subjectSuffix === "" ||
        (subjectPrefix === "an" && objectPrefix === "metzin" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "metzin" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "tech" && subjectSuffix === "t")) {
        // Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Para formar reflexivos, cambie el prefijo de objeto";
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

    // Check if subject prefix "ni", "ti" or "anh" should be shortened to "n" or "t" or changed to "anh" respectively
    // when the object prefix is empty and the verb starts with "i"
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

    // Replace mu to m when a specific verb is used
    if (objectPrefix === "mu" && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }

    // Check if the verb ends with "t"
    if ((verb.endsWith("t")) || (verb.endsWith("s")) || (verb.endsWith("ch")) ||
        (verb.endsWith("k")) || (verb.endsWith("p")) || (verb.endsWith("m")) ||
        (verb.endsWith("n")) || (verb.endsWith("t")) || (verb.endsWith("kw")) ||
        (verb.endsWith("sh"))) {
        document.getElementById("verb").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: El verbo no está escrito correctamente";
        return;
    } else {
        document.getElementById("verb").classList.remove("error");
    }

    if (verb === "") {
        document.getElementById("generated-word").textContent = "Error: El verbo no puede estar en vacío";
        document.getElementById("verb").classList.add("error");
        return;
    } else {
        document.getElementById("verb").classList.remove("error");
    }
    // Preterito
    if (tense === "preterito" && subjectSuffix === "t") {
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
    /*RETURN INVALID ENTRIES*/
    if ((verb.endsWith("ia") && objectPrefix === "")) {
// Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("verb").classList.add("error");
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Este verbo no es intransitivo";
        return;
    } else {
// Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
    }
    if ((verb.endsWith("i") && verb[verb.length - 2] !== 'l' && objectPrefix !== "" && verb[verb.length - 2] === 'w' && verb[verb.length - 3] !== 'k')) {
        // Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("verb").classList.add("error");
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("generated-word").textContent = "Error: Este verbo no es transitivo";
        return;
    } else {
        // Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
    }

    /* GRAMATICAL RULES */
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
// Class 1: Words ending in "ya", deletion of last vowel and mutation (singular and plural)
    if (verb.endsWith("ya")) {
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
                        verb = verb.replace("witz", "wala") + "j";
                        break;
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
    if ((verb.length === 3 && verb.endsWith("na") && objectPrefix === "") ||
        (verb.length === 3 && !verb[verb.length - 3] === 'j' && verb.endsWith("sa") && objectPrefix === "")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb + "k";
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
// Class 2: Applies to short words that end in -na, intransitives (ina, isa)
    if (verb.length == 3 && verb.endsWith("sa")) {
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
// Class 2: Applies to words that end in -iwi, intransitives (puliwi)
    if (verb.endsWith("liwi")) {
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
    if (verb[verb.length - 2] === 'l' && verb[verb.length - 1] !== 'u') {
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
                            && verb[verb.length - 2] !== 'z'
                            && verb[verb.length - 2] !== 'k' /*kalak not kalakik*/
                            && verb[verb.length - 2] !== 'm'
                            && verb[verb.length - 3] !== 'c'
                            && verb[verb.length - 2] !== 't') {
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
// Class 2: Special rule for [m] words
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
// Class 2: Special rule for [ch] words
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
    if (verb.length < 6 && verb.endsWith("ka")) {
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
if (objectPrefix !== "" && verb.length >= 6 && verb.endsWith("ka") ||
    objectPrefix !== "" && verb.length >= 6 && verb.endsWith("ki")) {
    switch (tense) {
        case "preterito":
            switch (subjectSuffix) {
                case "":
                    verb = verb.slice(0, -1);
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
if (objectPrefix === "" && verb.endsWith("aki") && verb.length > 5) {
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
// Class 2: Verbs ending with [ki], intransitives (atuki)
if (objectPrefix === "" && verb[verb.length - 3] === 'u' && verb.endsWith("ki")) {
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
// Class 2: Verbs ending with [k], intransitives (naka, paki)
if (objectPrefix === "" && verb[verb.length - 2] === 'k' && verb[verb.length - 3] !== 'u') {
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
// Class 2: Verbs ending with [u] (panu, temu) 
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
    if (objectPrefix !== "" && verb.endsWith("ti") || objectPrefix === "" && verb.length > 5 && verb.endsWith("ti")) {
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
    if (verb.length === 3 && verb.endsWith("kwa") || verb.length === 3 && verb.endsWith("kwi")) {
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
    if (verb.endsWith("kwa") || verb.length >= 4 && verb.endsWith("kwi")) {
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
// Rule for short words ending in -kwV, transitive (-tzak)
    if (verb.length >= 3 && verb.endsWith("kwa") && objectPrefix !== "") {
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
    // Class 1: words ending in na & wa, deletion of last vowel + ki, intransitives (pewa)
    if ((verb.length == 5 && verb.endsWith("na") && subjectSuffix === "")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1) + "ki";
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
    // Class 1: Words ending in na & wa, deletion of last vowel tzajtzi
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
// Class 3: Short words ending in -mV will be -nki, intransitive (sutun-tuk)
    if ((verb[verb.length - 2] === "m")) {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -2) + "n";
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
                        verb = verb.slice(0, -1);
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
    // IWI verb special conjugation
    if (verb === "iwi") {
        switch (tense) {
            case "preterito":
                switch (subjectSuffix) {
                    case "":
                        verb = verb.slice(0, -1) + "ki";
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
    // Combine the prefixes, verb, and suffixes into a single word
    // Display the generated word
    document.getElementById("generated-word").innerHTML = subjectPrefix + objectPrefix + verb + subjectSuffix;

    const inputs = document.querySelectorAll("input, select, enter");
    inputs.forEach(input => input.addEventListener("change", generateWord));
}
      
      