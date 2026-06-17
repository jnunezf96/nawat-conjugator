"use strict";

/**
 * Tests for src/core/irregulars/irregulars.js
 * Covers: suppletive stem getters, dropFinalVowel, isIntransitiveOnlySuppletiveId.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("irregulars");

    s.eq(
        "Lesson 11 irregular audit API is exposed",
        typeof ctx.buildIrregularsLesson11PursuitFrame,
        "function"
    );
    const lesson11 = ctx.buildIrregularsLesson11PursuitFrame();
    s.eq("Lesson 11 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson11.stepNumber,
        aimStatus: lesson11.aimStatus,
        pdfRefs: lesson11.pdfRefs,
        subsectionCount: lesson11.subsectionInventory.length,
        generationAllowed: lesson11.generationAllowed,
        closestPass: lesson11.closestPass,
        hitCount: lesson11.hitCount,
        missCount: lesson11.missCount,
    }, {
        stepNumber: 11,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 11.1",
            "Andrews Lesson 11.2",
            "Andrews Lesson 11.3",
            "Andrews Lesson 11.4",
            "Andrews Lesson 11.5",
            "Andrews Lesson 11.6",
        ],
        subsectionCount: 6,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq(
        "Lesson 11 nature frame keeps Andrews irregularity loci separate",
        lesson11.natureFrame.primaryIrregularityLoci,
        ["perfective-stem-formation", "tense-form-meaning-alignment"]
    );
    s.eq("Lesson 11 perfective-stem frame blocks unlicensed surfaces", {
        criterion: lesson11.perfectiveStemFrame.irregularityCriterion,
        soundChange: lesson11.perfectiveStemFrame.regularSoundChangeIsNotIrregular,
        types: lesson11.perfectiveStemFrame.types.map((entry) => entry.id),
        irregularPreferredIn: lesson11.perfectiveStemFrame.types[1].distribution.irregularPreferredIn,
        regularRequiredIn: lesson11.perfectiveStemFrame.types[1].distribution.regularRequiredIn,
        generationAllowed: lesson11.perfectiveStemFrame.types.every((entry) => entry.generationAllowed === false),
    }, {
        criterion: "speech-not-spelling",
        soundChange: true,
        types: ["compound-class-shift", "ti-final-alternate-perfective"],
        irregularPreferredIn: ["singular-preterit", "singular-admonitive"],
        regularRequiredIn: ["plural-preterit", "plural-admonitive", "distant-past"],
        generationAllowed: true,
    });
    s.eq("Lesson 11 form-meaning dislocation frame follows Andrews", {
        preteritAsPresentBlocksO: lesson11.formMeaningAlignmentFrame.dislocations.preteritAsPresent.blocksAntecessiveO,
        preteritAsPresentBlocksPresentMorph: lesson11.formMeaningAlignmentFrame.dislocations.preteritAsPresent.blocksPresentIndicativeTenseMorph,
        distantPastMeaning: lesson11.formMeaningAlignmentFrame.dislocations.distantPastAsPast.meaning,
        inventory: lesson11.formMeaningAlignmentFrame.irregularInventory.map((entry) => entry.id),
    }, {
        preteritAsPresentBlocksO: true,
        preteritAsPresentBlocksPresentMorph: true,
        distantPastMeaning: "general-past-indicative",
        inventory: ["ih-ca", "on-o", "pil-ca", "a", "itzi", "am-i-a", "0-i-a", "mani", "nemi"],
    });
    s.eq("Lesson 11 suppletion frame separates Andrews paradigms from current Nawat subset", {
        andrewsParadigms: lesson11.suppletionFrame.andrewsSuppletiveParadigms.map((entry) => entry.id),
        currentSubset: lesson11.suppletionFrame.currentNawatSuppletiveSubset.map((entry) => entry.id),
    }, {
        andrewsParadigms: ["ye-ca", "ya-hui", "hual-la-hui"],
        currentSubset: ["kati", "yawi", "witzi", "weya"],
    });
    s.eq("Lesson 11 idiom frame is inventory-only", {
        sourceSection: lesson11.idiomFrame.sourceSection,
        exampleCount: lesson11.idiomFrame.andrewsExamples.length,
        generationAllowed: lesson11.idiomFrame.generationAllowed,
    }, {
        sourceSection: "Andrews §11.6",
        exampleCount: 8,
        generationAllowed: false,
    });
    s.eq("Lesson 11 LCM frame blocks generation", {
        routeFamily: lesson11.grammarFrame?.routeContract?.routeFamily,
        routeStage: lesson11.grammarFrame?.routeContract?.routeStage,
        generationAllowed: lesson11.grammarFrame?.routeContract?.generationAllowed,
        diagnosticId: lesson11.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        stemKind: lesson11.grammarFrame?.stemFrame?.kind,
        inflectionKind: lesson11.grammarFrame?.inflectionFrame?.kind,
    }, {
        routeFamily: "irregular-vnc",
        routeStage: "audit-lesson-11",
        generationAllowed: false,
        diagnosticId: "lesson-11-irregular-vnc-taxonomy-partial",
        stemKind: "lesson-11-irregular-perfective-stem-frame",
        inflectionKind: "lesson-11-form-meaning-alignment-frame",
    });

    // Yawi suppletive stem getters
    s.eq("getSuppletiveYawiCanonical", ctx.getSuppletiveYawiCanonical(), "yawi");
    s.eq("getSuppletiveYawiImperfective", ctx.getSuppletiveYawiImperfective(), "ya");
    s.eq("getSuppletiveYawiShort", ctx.getSuppletiveYawiShort(), "yaw");
    s.eq("getSuppletiveYawiYuVariant", ctx.getSuppletiveYawiYuVariant(), "yu");
    s.eq("getSuppletiveYawiCausativeActive", ctx.getSuppletiveYawiCausativeActive(), "wika");

    const yawiExpectedForms = [
        ["preterito", "", ["yajki"]],
        ["preterito", "t", ["yajket"]],
        ["perfecto", "", ["yajtuk"]],
        ["perfecto", "t", ["yajtiwit"]],
    ];
    yawiExpectedForms.forEach(([tense, subjectSuffix, expected]) => {
        const output = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
            },
            posicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "yawi",
                pers2: subjectSuffix,
                num2: subjectSuffix,
                poseedor: "",
                tiempo: tense,
            },
        });
        s.eq(`Yawi generated ${tense} ${subjectSuffix || "sg"} follows CSV`, output.surfaceForms, expected);
    });

    // Weya suppletive stem getter
    s.eq("getSuppletiveWeyaCanonical", ctx.getSuppletiveWeyaCanonical(), "weyya");

    ["weya", "weiya", "weyya"].forEach((verb) => {
        const parsed = ctx.parseVerbInput(verb);
        const path = ctx.getSuppletiveStemPath(parsed);
        s.ok(`Weya parser flag: ${verb}`, parsed.isWeya);
        s.eq(`Weya suppletive path: ${verb}`, path && { path: path.path, id: path.id }, {
            path: "suppletive",
            id: "weya",
        });
    });

    const weyaExpectedForms = [
        ["preterito", "", ["weyki", "weyyak"]],
        ["preterito", "t", ["weyket", "weyyaket"]],
        ["perfecto", "", ["weytuk", "weyyatuk"]],
        ["perfecto", "t", ["weytiwit", "weyyatiwit"]],
    ];
    ["weya", "weiya", "weyya"].forEach((verb) => {
        weyaExpectedForms.forEach(([tense, subjectSuffix, expected]) => {
            const output = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: subjectSuffix,
                    num2: subjectSuffix,
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Weya generated ${verb} ${tense} ${subjectSuffix || "sg"}`, output.surfaceForms, expected);
        });
    });

    const weyaNonPerfectiveExpectedForms = {
        weya: [
            ["presente", ["weya"]],
            ["presente-habitual", ["weyani"]],
            ["imperativo", ["ma weya"]],
            ["futuro", ["weyas"]],
        ],
        weiya: [
            ["presente", ["weiya"]],
            ["presente-habitual", ["weiyani"]],
            ["imperativo", ["ma weiya"]],
            ["futuro", ["weiyas"]],
        ],
        weyya: [
            ["presente", ["weyya"]],
            ["presente-habitual", ["weyyani"]],
            ["imperativo", ["ma weyya"]],
            ["futuro", ["weyyas"]],
        ],
    };
    Object.entries(weyaNonPerfectiveExpectedForms).forEach(([verb, expectedForms]) => {
        expectedForms.forEach(([tense, expected]) => {
            const output = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Weya generated ${verb} ${tense} preserves coda y`, output.surfaceForms, expected);
        });
    });

    const katiExpectedForms = [
        ["presente", "", ["ye"]],
        ["presente", "t", ["yet"]],
        ["presente-habitual", "", ["yeni"]],
        ["presente-habitual", "t", ["yenit"]],
        ["preterito", "", ["katki"]],
        ["preterito", "t", ["katet"]],
        ["pasado-remoto", "", ["katka"]],
        ["pasado-remoto", "t", ["katkat"]],
        ["perfecto", "", ["yetuk"]],
        ["perfecto", "t", ["yetiwit"]],
        ["pluscuamperfecto", "", ["yetuya"]],
        ["pluscuamperfecto", "t", ["yetuyat"]],
        ["futuro", "", ["yes"]],
        ["futuro", "t", ["yesket"]],
        ["condicional", "", ["yeskia"]],
        ["condicional", "t", ["yeskiat"]],
        ["imperativo", "", ["ma ye"]],
        ["imperativo", "t", ["ma yekan"]],
    ];
    katiExpectedForms.forEach(([tense, subjectSuffix, expected]) => {
        const output = ctx.generateWord({
            silent: true,
            override: {
            },
            posicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "kati",
                pers2: subjectSuffix,
                num2: subjectSuffix,
                poseedor: "",
                tiempo: tense,
            },
        });
        s.eq(`Kati generated ${tense} ${subjectSuffix || "sg"}`, output.surfaceForms, expected);
    });

    ["witzi", "wi", "witz"].forEach((verb) => {
        const parsed = ctx.parseVerbInput(verb);
        const path = ctx.getSuppletiveStemPath(parsed);
        s.eq(`Witzi suppletive path: ${verb}`, path && { path: path.path, id: path.id }, {
            path: "suppletive",
            id: "witzi",
        });
    });
    const witziStemSet = ctx.buildSuppletiveWitziStemSet();
    s.eq("Witzi stem set has imperfective core witzi", witziStemSet.imperfective, {
        verb: "witzi",
        analysisVerb: "witzi",
    });
    s.eq("Witzi stem set has perfective core witz with hidden k suffix", witziStemSet.variantsByClass.get("A"), [
        { base: "witz", suffix: "" },
    ]);

    const witziSupportedActiveForms = [
        ["preterito", "", ["witz"]],
        ["preterito", "t", ["witzet"]],
        ["pasado-remoto", "", ["witza"]],
        ["pasado-remoto", "t", ["witzat"]],
    ];
    ["witzi", "wi", "witz"].forEach((verb) => {
        witziSupportedActiveForms.forEach(([tense, subjectSuffix, expected]) => {
            const output = ctx.generateWord({
                silent: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: subjectSuffix,
                    num2: subjectSuffix,
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Witzi active ${verb} ${tense} ${subjectSuffix || "sg"}`, output.surfaceForms, expected);
        });
    });

    const witziDefectiveActiveTenses = ["presente", "perfecto", "futuro", "imperativo"];
    ["witzi", "wi", "witz"].forEach((verb) => {
        witziDefectiveActiveTenses.forEach((tense) => {
            const output = ctx.generateWord({
                silent: true,
                override: {
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Witzi active defective block: ${verb} ${tense}`, output.error, "Solo pretérito y pasado remoto.");
        });
    });

    const witziSupportedNonactiveForms = [
        ["preterito", "", ["wiluwatz"]],
        ["preterito", "t", ["wiluwatzet"]],
        ["pasado-remoto", "", ["wiluwatza"]],
        ["pasado-remoto", "t", ["wiluwatzat"]],
    ];
    ["witzi", "wi", "witz"].forEach((verb) => {
        witziSupportedNonactiveForms.forEach(([tense, subjectSuffix, expected]) => {
            const output = ctx.generateWord({
                silent: true,
                override: {
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: subjectSuffix,
                    num2: subjectSuffix,
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Witzi nonactive ${verb} ${tense} ${subjectSuffix || "sg"}`, output.surfaceForms, expected);
        });
    });

    const witziNonactiveOptions = ctx.getSuppletiveNonactiveOptions(ctx.parseVerbInput("witzi"));
    s.eq("Witzi impersonal/nonactive core pair", witziNonactiveOptions && witziNonactiveOptions[0], {
        suffix: "luwa",
        stem: "wiluwatz",
        imperfectiveStem: "wiluwatzi",
        perfectiveStem: "wiluwatz",
    });
    ["witzi", "wi", "witz"].forEach((verb) => {
        const output = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.nonactive,
            },
            posicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: verb,
                pers2: "",
                num2: "",
                poseedor: "",
                tiempo: "presente",
            },
        });
        s.eq(`Witzi nonactive forced imperfective core: ${verb}`, output.surfaceForms, ["wiluwatzi"]);
    });

    const witziDefectiveNonactiveTenses = ["presente", "perfecto", "futuro"];
    ["witzi", "wi", "witz"].forEach((verb) => {
        witziDefectiveNonactiveTenses.forEach((tense) => {
            const output = ctx.generateWord({
                silent: true,
                override: {
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: verb,
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: tense,
                },
            });
            s.eq(`Witzi nonactive defective block: ${verb} ${tense}`, output.error, "Solo pretérito y pasado remoto.");
        });
    });

    // dropFinalVowel
    s.eq("dropFinalVowel: nemi→nem", ctx.dropFinalVowel("nemi"), "nem");
    s.eq("dropFinalVowel: kisa→kis", ctx.dropFinalVowel("kisa"), "kis");
    s.eq("dropFinalVowel: nem (consonant) unchanged", ctx.dropFinalVowel("nem"), "nem");
    s.eq("dropFinalVowel: empty", ctx.dropFinalVowel(""), "");

    // isIntransitiveOnlySuppletiveId — yawi, weya, kati, witzi are all intransitive-only
    s.ok("isIntransitiveOnlySuppletiveId: yawi", ctx.isIntransitiveOnlySuppletiveId("yawi"));
    s.ok("isIntransitiveOnlySuppletiveId: weya", ctx.isIntransitiveOnlySuppletiveId("weya"));
    s.ok("isIntransitiveOnlySuppletiveId: kati", ctx.isIntransitiveOnlySuppletiveId("kati"));
    s.ok("isIntransitiveOnlySuppletiveId: witzi", ctx.isIntransitiveOnlySuppletiveId("witzi"));
    s.no("isIntransitiveOnlySuppletiveId: unknown id", ctx.isIntransitiveOnlySuppletiveId("unknown"));
    s.no("isIntransitiveOnlySuppletiveId: empty", ctx.isIntransitiveOnlySuppletiveId(""));

    return s;
}

module.exports = { run };
