function generateWord() {
    // Get the selected values of the prefixes and suffixes
    let subjectPrefix = document.getElementById("subject-prefix").value;
    let objectPrefix = document.getElementById("object-prefix").value;
    let verb = document.getElementById("verb").value;
    let subjectSuffix = document.getElementById("subject-suffix").value;

    // Remove error class from subject prefix, object prefix, and subject suffix
    document.getElementById("subject-prefix").classList.remove("error");
    document.getElementById("object-prefix").classList.remove("error");
    document.getElementById("subject-suffix").classList.remove("error");

    // Check for invalid combinations of subject and object prefixes
    if ((subjectPrefix === "ni" && objectPrefix === "nech") ||
        (subjectPrefix === "an" && objectPrefix === "metzin") ||
        (subjectPrefix === "ni" && subjectSuffix === "t") ||
        (subjectPrefix === "ni" && objectPrefix === "tech") ||
        (subjectPrefix === "an" && objectPrefix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "tech" && subjectSuffix === "t") ||
        (subjectPrefix === "ti" && objectPrefix === "metzin" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "metz" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "metz") ||
        (subjectPrefix === "an" && objectPrefix === "metz" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "metzin" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "mu" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "tech" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "nech" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "kin" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "metz" && subjectSuffix === "") ||
        (subjectPrefix === "an" && objectPrefix === "ki" && subjectSuffix === "") ||
        (subjectPrefix === "ti" && objectPrefix === "nech" && subjectSuffix === "t") ||
        (subjectPrefix === "ti" && objectPrefix === "tech" && subjectSuffix === "t")
    ) {
        // Add error class to subject prefix, object prefix, and subject suffix
        document.getElementById("subject-prefix").classList.add("error");
        document.getElementById("object-prefix").classList.add("error");
        document.getElementById("subject-suffix").classList.add("error");
    } else {
        // Generate the word
        document.getElementById("generated-word").textContent = subjectPrefix + objectPrefix + verb + subjectSuffix;
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
        (subjectPrefix === "an" && objectPrefix === "" && verb.startsWith("i"))
    ) {
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

    if (
        (subjectPrefix === "an" && objectPrefix === "mu" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "ta" && subjectSuffix === "t") ||
        (subjectPrefix === "an" && objectPrefix === "te" && subjectSuffix === "t")
    ) {
        subjectPrefix = subjectPrefix.replace("an", "anh");
    }

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
    if (verb.startsWith("witz")) {
        subjectSuffix = subjectSuffix.replace("t", "et");
    }

    // Replace mu to m when a specific verb is used
    if (objectPrefix === "mu" && verb.startsWith("iskalia")) {
        verb = verb.replace("iskalia", "skalia");
    }

    // Check if the verb ends with "t"
    if (verb.endsWith("t")) {
        document.getElementById("verb").classList.add("error");
        document.getElementById("generated-word").innerHTML = "Error: Verb cannot end with a consonant.";
        return;
    } else {
        document.getElementById("verb").classList.remove("error");
    }

    // Combine the prefixes, verb, and suffixes into a single word
    // Display the generated word
    document.getElementById("generated-word").innerHTML = subjectPrefix + objectPrefix + verb + subjectSuffix;
}