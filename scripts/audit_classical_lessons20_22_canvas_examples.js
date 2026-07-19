#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

const REPRESENTABLE_EXAMPLES = Object.freeze([
    { id: "l21-7063-active-an", line: 7063, route: "active", sourceStem: "āna", subject: "1sg", valence: "specific-projective", objectPerson: "3pl", tense: "preterit", verbClass: "B", antecessive: true, expectedFormula: "ō#ni-0+qu-im(ān)0+⎕-0#" },
    { id: "l21-7064-passive-an", line: 7064, route: "passive", sourceStem: "āna", nonactiveStem: "ān-ō", suffixFamily: "ō", subject: "1sg", valence: "specific-projective", objectPerson: "3pl", tense: "preterit", verbClass: "B", antecessive: true, expectedFormula: "ō#0-0(ān-ō)0+qu-eh#" },
    { id: "l21-7069-active-an-future", line: 7069, route: "active", sourceStem: "āna", subject: "2pl", valence: "specific-projective", objectPerson: "1sg", tense: "future", verbClass: "A", expectedFormula: "#an-0+n-ech(āna)z+qu-eh#" },
    { id: "l21-7071-passive-an-future", line: 7071, route: "passive", sourceStem: "āna", nonactiveStem: "ān-ō", suffixFamily: "ō", subject: "2pl", valence: "specific-projective", objectPerson: "1sg", tense: "future", verbClass: "A", expectedFormula: "#n-0(ān-ō)z+⎕-0#" },
    { id: "l21-7075-active-ayi", line: 7075, route: "active", sourceStem: "āyi", subject: "3pl", valence: "specific-projective", objectPerson: "3sg", silentSpecificObject: true, tense: "preterit", verbClass: "B", antecessive: true, expectedFormula: "ō#0-0+⎕-0(āx)0+qu-eh#" },
    { id: "l21-7076-passive-ayi", line: 7076, route: "passive", sourceStem: "āyi", nonactiveStem: "āyī-hua", suffixFamily: "hua", subject: "3pl", valence: "specific-projective", objectPerson: "3sg", tense: "preterit", verbClass: "B", antecessive: true, expectedFormula: "ō#0-0(āyī-hua)0+c-0#" },
    { id: "l21-7088-active-zo-reflexive", line: 7088, route: "active", sourceStem: "zō", subject: "1sg", valence: "mainline-reflexive", tense: "preterit", verbClass: "A", antecessive: true, expectedFormula: "ō#ni-0+n-o(zō)0+c-0#" },
    { id: "l21-7089-passive-zo-reflexive", line: 7089, route: "passive", sourceStem: "zō", nonactiveStem: "zō-hua", suffixFamily: "hua", subject: "1sg", valence: "mainline-reflexive", tense: "preterit", verbClass: "A", antecessive: true, expectedFormula: "ō#ni-0+ne(zō-hua)0+c-0#" },

    { id: "l22-7238-inherent-tona", line: 7238, route: "inherent-impersonal", sourceStem: "tōna", subject: "3sg", valence: "intransitive", tense: "present", verbClass: "A", expectedFormula: "#0-0(tōna)0+0-0#" },
    { id: "l22-7239-inherent-rain", line: 7239, route: "inherent-impersonal", sourceStem: "quiy-a-hui", subject: "3sg", valence: "intransitive", tense: "future", verbClass: "B", expectedFormula: "#0-0(quiy-a-hui)z+⎕-0#" },
    { id: "l22-7240-inherent-hail", line: 7240, route: "inherent-impersonal", sourceStem: "te-c-i-hui", subject: "3sg", valence: "intransitive", tense: "imperfect", verbClass: "B", expectedFormula: "#0-0(te-c-i-hui)ya+0-0#" },
    { id: "l22-7241-inherent-fog", line: 7241, route: "inherent-impersonal", sourceStem: "āy-a-hui", subject: "3sg", valence: "intransitive", tense: "present", verbClass: "B", expectedFormula: "#0-0(āy-a-hui)0+0-0#" },
    { id: "l22-7242-inherent-night", line: 7242, route: "inherent-impersonal", sourceStem: "yohua", subject: "3sg", valence: "intransitive", tense: "preterit", verbClass: "A", directionalPrefix: "on", antecessive: true, expectedFormula: "ō#0-0+on(yohua)0+c-0#" },

    { id: "l22-7321-impersonal-hunger", line: 7321, route: "impersonal", sourceStem: "mayāna", nonactiveStem: "mayāna-lō", suffixFamily: "lō", subject: "3pl", valence: "intransitive", tense: "present", verbClass: "B", expectedFormula: "#0-0(mayāna-lo)0+0-0#" },
    { id: "l22-7324-impersonal-arrive", line: 7324, route: "impersonal", sourceStem: "ahci", nonactiveStem: "ahxī-hua", suffixFamily: "hua", subject: "2pl", valence: "intransitive", tense: "distant-past", verbClass: "A", antecessive: true, expectedFormula: "ō#0-0(ahxī-hua)ca+0-0#" },
    { id: "l22-7327-impersonal-laugh", line: 7327, route: "impersonal", sourceStem: "hue-tz-ca", nonactiveStem: "hue-tz-c-ō", suffixFamily: "ō", subject: "3pl", valence: "intransitive", tense: "preterit", verbClass: "A", antecessive: true, expectedFormula: "ō#0-0(hue-tz-c-ō)0+c-0#" },
    { id: "l22-7330-impersonal-go", line: 7330, route: "impersonal", sourceStem: "ya-uh", nonactiveStem: "hui-lo-hua", suffixFamily: "lo-hua", subject: "3pl", valence: "intransitive", tense: "present", verbClass: "B", expectedFormula: "#0-0(hui-lo-hua)0+0-0#" },
    { id: "l22-7333-active-be", line: 7333, route: "active", sourceStem: "ye", subject: "1pl", valence: "intransitive", tense: "present", verbClass: "A", expectedFormula: "#ti-0(ca-t)0+⎕-eh#" },
    { id: "l22-7334-impersonal-be", line: 7334, route: "impersonal", sourceStem: "ye", nonactiveStem: "ye-lo-hua", suffixFamily: "lo-hua", subject: "1pl", valence: "intransitive", tense: "present", verbClass: "A", expectedFormula: "#0-0(ye-lo-hua)0+c-0#" },
    { id: "l22-7336-active-come", line: 7336, route: "active", sourceStem: "hui-tz", subject: "2pl", valence: "intransitive", tense: "general-past", verbClass: "A", expectedFormula: "#an-0(hui-tz)a+0-h#" },
    { id: "l22-7342-impersonal-come", line: 7342, route: "impersonal", sourceStem: "hui-tz", nonactiveStem: "huī-lo-hua-tz", suffixFamily: "lo-hua", subject: "2pl", valence: "intransitive", tense: "general-past", verbClass: "A", expectedFormula: "#0-0(huī-lo-hua-tz)a+0-0#" },
    { id: "l22-7349-impersonal-human-object", line: 7349, route: "impersonal", sourceStem: "tla-zo-h-tla", nonactiveStem: "tla-zo-h-tla-lō", suffixFamily: "lō", subject: "3pl", valence: "projective-human", tense: "present", verbClass: "A", expectedFormula: "#0-0+te(tla-zo-h-tla-lo)0+0-0#" },
    { id: "l22-7352-impersonal-nonhuman-object", line: 7352, route: "impersonal", sourceStem: "pol-o-ā", nonactiveStem: "pol-ō-lō", suffixFamily: "lō", subject: "1pl", valence: "projective-nonhuman", tense: "preterit", verbClass: "C", antecessive: true, expectedFormula: "ō#0-0+tla(pol-ō-lō)0+c-0#" },
    { id: "l22-7361-impersonal-reflexive", line: 7361, route: "impersonal", sourceStem: "zahua", nonactiveStem: "zahua-lō", suffixFamily: "lō", subject: "1sg", valence: "mainline-reflexive", tense: "present", verbClass: "B", expectedFormula: "#0-0+ne(zahua-lo)0+0-0#" },
    { id: "l22-7383-impersonal-admonition", line: 7383, route: "impersonal", sourceStem: "hue-tz-ca", nonactiveStem: "hue-tz-c-ō", suffixFamily: "ō", subject: "3pl", valence: "intransitive", mood: "admonitive", tense: "nonpast", verbClass: "A", expectedFormula: "#0-0(hue-tz-c-o)h+⎕-0#" },
]);

const MISSING_RULE_LOGIC_EXAMPLES = Object.freeze([
    { id: "l21-7103-active-specific-reflexive", line: 7103, route: "active", sourceStem: "tequi-ti-ā", subject: "1sg", baseValence: "specific-projective", baseObjectPerson: "3sg", tense: "imperfect", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-reflexive", objectKind: "reflexive", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#ni-0+c-0+n-o(tequi-ti-ā)ya+0-0#" },
    { id: "l21-7105-passive-specific-reflexive", line: 7105, route: "passive", sourceStem: "tequi-ti-ā", nonactiveStem: "tequi-tī-lō", suffixFamily: "lō", subject: "1sg", baseValence: "specific-projective", baseObjectPerson: "3sg", tense: "imperfect", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-reflexive", objectKind: "reflexive", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#0-0+ne(tequi-tī-lō)ya+0-0#" },
    { id: "l21-7120-active-mainline-silent-shuntline", line: 7120, route: "active", sourceStem: "maca", subject: "3pl", baseValence: "specific-projective", baseObjectPerson: "1sg", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-third", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#0-0+n-ech+0-0(maca)0+qu-eh#" },
    { id: "l21-7124-passive-mainline-silent-shuntline", line: 7124, route: "passive", sourceStem: "maca", nonactiveStem: "mac-ō", suffixFamily: "ō", subject: "3pl", baseValence: "specific-projective", baseObjectPerson: "1sg", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-third", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#ni-0+0-0(mac-o)0+c-0#" },
    { id: "l21-7129-active-mainline-silent-shuntline-future", line: 7129, route: "active", sourceStem: "il-hui", subject: "3sg", baseValence: "specific-projective", baseObjectPerson: "1pl", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-third", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first-plural", objectKind: "specific-projective", objectPerson: "1pl", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#0-0+t-ech+0-0(il-hui)z+0-0#" },
    { id: "l21-7131-passive-mainline-silent-shuntline-future", line: 7131, route: "passive", sourceStem: "il-hui", nonactiveStem: "il-huī-lō", suffixFamily: "lō", subject: "3sg", baseValence: "specific-projective", baseObjectPerson: "1pl", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-third", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first-plural", objectKind: "specific-projective", objectPerson: "1pl", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#t-0+0-0(il-huī-lō)z+qu-eh#" },
    { id: "l21-7138-active-mainline-third-plural-shuntline", line: 7138, route: "active", sourceStem: "maca", subject: "2sg", baseValence: "specific-projective", baseObjectPerson: "1sg", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-third-plural", objectKind: "specific-projective", objectPerson: "3pl", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#ti-0+n-ech+0-im(maca)0+c-0#" },
    { id: "l21-7144-passive-mainline-third-plural-shuntline", line: 7144, route: "passive", sourceStem: "maca", nonactiveStem: "mac-ō", suffixFamily: "ō", subject: "2sg", baseValence: "specific-projective", baseObjectPerson: "1sg", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-third-plural", objectKind: "specific-projective", objectPerson: "3pl", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-first", objectKind: "specific-projective", objectPerson: "1sg", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#ni-0+qu-im(mac-ō)0+c-0#" },
    { id: "l21-7153-active-specific-human-nonspecific", line: 7153, route: "active", sourceStem: "maca", subject: "3sg", baseValence: "specific-projective", baseObjectPerson: "3sg", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#0-0+qui-0+te(maca)z+⎕-0#" },
    { id: "l21-7158-passive-specific-human-nonspecific", line: 7158, route: "passive", sourceStem: "maca", nonactiveStem: "mac-ō", suffixFamily: "ō", subject: "3sg", baseValence: "specific-projective", baseObjectPerson: "3sg", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#0-0+te(mac-o)z+0-0#" },
    { id: "l21-7162-active-specific-nonhuman-nonspecific", line: 7162, route: "active", sourceStem: "maca", subject: "3pl", baseValence: "specific-projective", baseObjectPerson: "2sg", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#0-0+m-itz+tla(maca)z+qu-eh#" },
    { id: "l21-7164-passive-specific-nonhuman-nonspecific", line: 7164, route: "passive", sourceStem: "maca", nonactiveStem: "mac-ō", suffixFamily: "ō", subject: "3pl", baseValence: "specific-projective", baseObjectPerson: "2sg", tense: "future", verbClass: "A", objectRequests: [{ objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "#ti-0+tla(mac-o)z+0-0#" },
    { id: "l22-7355-impersonal-human-nonhuman-objects", line: 7355, route: "impersonal", sourceStem: "maca", nonactiveStem: "mac-ō", suffixFamily: "ō", subject: "3sg", baseValence: "projective-human", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-human", objectKind: "nonspecific-human", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#0-0+te+tla(mac-ō)0+c-0#" },
    { id: "l22-7364-impersonal-reflexive-nonhuman-object", line: 7364, route: "impersonal", sourceStem: "tequi-ti-ā", nonactiveStem: "tequi-tī-lō", suffixFamily: "lō", subject: "3sg", baseValence: "projective-nonhuman", tense: "preterit", verbClass: "A", antecessive: true, objectRequests: [{ objectId: "direct-reflexive", objectKind: "reflexive", governor: "directive", derivationalLevel: 1 }, { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 }], expectedFormula: "ō#0-0+ne+tla(tequi-tī-lō)0+c-0#" },
]);

function getObjectKind(valence = "") {
    return {
        "specific-projective": "specific-projective",
        "mainline-reflexive": "mainline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
    }[valence] || "specific-projective";
}

function buildActiveFrame(context, example) {
    const baseValence = example.baseValence || example.valence;
    const verbClass = example.sourceStem === "tequi-ti-ā" ? "C" : example.verbClass;
    const lowerActiveFrame = context.buildClassicalNahuatlLesson7VerbstemClassFrame(example.sourceStem, {
        subject: example.subject,
        mood: example.mood || "indicative",
        tense: example.tense,
        verbClass,
        perfectiveClass: verbClass,
        valence: baseValence,
        transitivity: baseValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: getObjectKind(baseValence),
        objectPerson: example.baseObjectPerson || example.objectPerson || "",
        silentSpecificObject: example.silentSpecificObject === true,
        directionalPrefix: example.directionalPrefix || "",
        antecessive: example.antecessive === true,
    });
    return Array.isArray(example.objectRequests)
        ? context.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lowerActiveFrame, {
            objectRequests: example.objectRequests,
        })
        : lowerActiveFrame;
}

function buildExampleFrame(context, example) {
    if (!Array.isArray(example.objectRequests)) {
        const verbClass = example.sourceStem === "tequi-ti-ā" ? "C" : example.verbClass;
        let nonactiveOptionId = "";
        if (example.route === "passive" || example.route === "impersonal") {
            const optionInventory = context.getClassicalNahuatlLesson20NonactiveStemOptions(
                example.sourceStem,
                {
                    verbClass,
                    sourceValence: example.valence,
                }
            );
            nonactiveOptionId = optionInventory.options.find((option) => (
                option.suffixFamily === example.suffixFamily
                && [option.nonactiveStem, option.perfectiveNonactiveStem].includes(example.nonactiveStem)
            ))?.optionId || "";
        }
        return context.evaluateClassicalNahuatlVncApplication({
            sourceStem: example.sourceStem,
            subject: example.subject,
            mood: example.mood || "indicative",
            tense: example.tense,
            verbClass,
            sourceValence: example.valence,
            objectKind: getObjectKind(example.valence),
            objectPerson: example.objectPerson || "",
            silentSpecificObject: example.silentSpecificObject === true,
            requestedVoice: example.route,
            nonactiveOptionId,
            directionalPrefix: example.directionalPrefix || "",
            antecessive: example.antecessive === true,
        }).resultFrame.selectedMachineryFrame;
    }
    const activeFrame = buildActiveFrame(context, example);
    const verbClass = example.sourceStem === "tequi-ti-ā" ? "C" : example.verbClass;
    if (example.route === "active") {
        return activeFrame;
    }
    const shared = {
        voice: example.route,
        sourceValence: Array.isArray(example.objectRequests) ? "multiple-object" : example.valence,
        sourceSubject: example.subject,
        sourceObjectPerson: example.objectPerson || "",
        mood: example.mood || "indicative",
        tense: example.tense,
        verbClass,
        sentenceOptions: {
            directionalPrefix: example.directionalPrefix || "",
            antecessive: example.antecessive === true,
        },
    };
    if (example.route === "inherent-impersonal") {
        return context.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeFrame, {
            ...shared,
            inherentImpersonalRecord: context.buildClassicalNahuatlLesson22InherentImpersonalRecord(
                example.sourceStem,
                { selectionAuthority: "user-supplied-lexical-analysis" }
            ),
        });
    }
    const optionInventory = context.getClassicalNahuatlLesson20NonactiveStemOptions(
        example.sourceStem,
        {
            verbClass,
            sourceValence: example.baseValence || example.valence,
        }
    );
    const canvasOption = optionInventory.options.find((option) => (
        option.suffixFamily === example.suffixFamily
        && [option.nonactiveStem, option.perfectiveNonactiveStem].includes(example.nonactiveStem)
    ));
    return context.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeFrame, {
        ...shared,
        nonactiveStemRecord: context.deriveClassicalNahuatlLesson20NonactiveStemRecord(
            example.sourceStem,
            {
                verbClass,
                sourceValence: example.baseValence || example.valence,
                optionId: canvasOption?.optionId || "",
            }
        ),
    });
}

function assembleCanvasFormula(frame) {
    const formula = frame?.formulaRealization || "";
    const outsidePrefixes = frame?.selectedOutputLogicFrame?.outputFillers?.outsidePrefixes || [];
    if (!formula || outsidePrefixes.length === 0) {
        return formula;
    }
    return `${outsidePrefixes.join("")}${formula.replace(/^#/, "")}`;
}

async function auditClassicalLessons20To22CanvasExamples() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const canvasLines = fs.readFileSync(path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"), "utf8").split(/\r?\n/u);
    const referencedLines = [
        ...REPRESENTABLE_EXAMPLES.map((example) => example.line),
        ...MISSING_RULE_LOGIC_EXAMPLES.map((example) => example.line),
    ];
    const missingCanvasFormulaLines = referencedLines.filter((line) => !canvasLines[line - 1]?.includes("#"));
    const executableExamples = [...REPRESENTABLE_EXAMPLES, ...MISSING_RULE_LOGIC_EXAMPLES];
    const results = executableExamples.map((example) => {
        const frame = buildExampleFrame(context, example);
        const actualFormula = assembleCanvasFormula(frame);
        // Canvas formulas witness the aspect-selected nonactive stem. The typed
        // Lesson 20 record keeps the imperfective and perfective stems distinct,
        // so compare the realized derived-frame stem rather than freezing the
        // inventory's imperfective citation form into a preterit formula.
        const derivedNonactiveStem = example.nonactiveStem
            ? (frame?.stem || frame?.selectedOutputLogicFrame?.outputFillers?.derivedStem || "")
            : "";
        const derivedNonactiveStemMatchesCanvasEvidence = example.nonactiveStem
            ? derivedNonactiveStem === example.nonactiveStem
            : true;
        return {
            id: example.id,
            line: example.line,
            route: example.route,
            status: frame?.authorizationStatus || frame?.proofFrame?.authorizationStatus || "blocked",
            blockReason: frame?.blockReason || frame?.proofFrame?.conclusion?.blockReason || "",
            canvasSourceLine: canvasLines[example.line - 1] || "",
            expectedFormula: example.expectedFormula,
            actualFormula,
            derivedNonactiveStem,
            derivedNonactiveStemMatchesCanvasEvidence,
            nonactiveSelectionAuthority: frame?.nonactiveStemRecord?.selectionAuthority || "",
            exact: actualFormula === example.expectedFormula && derivedNonactiveStemMatchesCanvasEvidence,
        };
    });
    const allResults = results;
    const mismatches = allResults.filter((result) => !result.exact);
    const derivedNonactiveResults = results.filter((result) => result.derivedNonactiveStem);
    return {
        kind: "classical-lessons20-22-canvas-formula-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        canvasFormulaCount: allResults.length,
        canvasFormulaSourceCount: referencedLines.length - missingCanvasFormulaLines.length,
        missingCanvasFormulaLines,
        executedRuleCaseCount: allResults.length,
        exactFormulaCount: allResults.length - mismatches.length,
        engineDerivedNonactiveCaseCount: derivedNonactiveResults.length,
        engineDerivedNonactiveCanvasMatchCount: derivedNonactiveResults.filter(
            (result) => result.derivedNonactiveStemMatchesCanvasEvidence
                && result.nonactiveSelectionAuthority === "andrews-lesson20-rule-derivation"
        ).length,
        mismatchCount: mismatches.length,
        mismatches,
        missingRuleImplementationCount: mismatches.length,
        results: allResults,
    };
}

async function main() {
    const report = await auditClassicalLessons20To22CanvasExamples();
    const summary = process.argv.includes("--summary")
        ? {
            ...report,
            results: undefined,
        }
        : report;
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    process.exitCode = report.mismatchCount || report.missingCanvasFormulaLines.length ? 1 : 0;
}

if (require.main === module) {
    main().catch((error) => {
        process.stderr.write(`${error?.stack || error}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    REPRESENTABLE_EXAMPLES,
    MISSING_RULE_LOGIC_EXAMPLES,
    auditClassicalLessons20To22CanvasExamples,
    assembleCanvasFormula,
    buildExampleFrame,
};
