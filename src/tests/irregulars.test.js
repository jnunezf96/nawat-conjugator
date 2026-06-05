"use strict";

/**
 * Tests for src/core/irregulars/irregulars.js
 * Covers: suppletive stem getters, dropFinalVowel, isIntransitiveOnlySuppletiveId.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("irregulars");

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
                verb: "yawi",
                tense,
                subjectPrefix: "",
                subjectSuffix,
                objectPrefix: "",
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix,
                    objectPrefix: "",
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
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
                verb: "kati",
                tense,
                subjectPrefix: "",
                subjectSuffix,
                objectPrefix: "",
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix,
                    objectPrefix: "",
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix,
                    objectPrefix: "",
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
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
                verb,
                tense: "presente",
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                derivationMode: ctx.DERIVATION_MODE.nonactive,
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
                    verb,
                    tense,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
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
