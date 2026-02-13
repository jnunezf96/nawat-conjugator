#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const contextPath = path.join(root, "pret_universal_context.js");
const enginePath = path.join(root, "pret_universal_engine.js");
const scriptPath = path.join(root, "script.js");

function Event() {}

function buildVmContext() {
    const noop = () => {};
    const makeElement = () => ({
        value: "",
        checked: false,
        textContent: "",
        dataset: {},
        style: {},
        appendChild: noop,
        setAttribute: noop,
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: noop,
        removeEventListener: noop,
        classList: {
            add: noop,
            remove: noop,
            toggle: noop,
            contains: () => false,
        },
    });
    const elementStore = new Map([
        ["subject-prefix", makeElement()],
        ["subject-suffix", makeElement()],
        ["object-prefix", makeElement()],
        ["verb", makeElement()],
        ["language", makeElement()],
        ["verb-mirror", makeElement()],
        ["verb-mirror-content", makeElement()],
    ]);
    return {
        console,
        Event,
        window: {
            addEventListener: noop,
            removeEventListener: noop,
            matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
            location: { hash: "" },
            navigator: { userAgent: "node" },
        },
        document: {
            addEventListener: noop,
            removeEventListener: noop,
            getElementById: (id) => elementStore.get(id) || null,
            querySelector: () => null,
            querySelectorAll: () => [],
            createElement: makeElement,
            body: { classList: { add: noop, remove: noop, toggle: noop, contains: () => false } },
            documentElement: {
                style: {},
                classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
            },
        },
        navigator: { userAgent: "node" },
        localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
        sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
        location: { search: "" },
        setTimeout,
        clearTimeout,
        URLSearchParams,
        Intl,
    };
}

function loadStaticData(context) {
    const load = (name) => JSON.parse(fs.readFileSync(path.join(root, "data", name), "utf8"));
    context.applyStaticPhonology(load("static_phonology.json"));
    context.applyStaticConstants(load("static_constants.json"));
    context.applyStaticRules(load("static_rules.json"));
    context.applyStaticRedup(load("static_redup.json"));
    context.applyStaticSuppletives(load("static_suppletives.json"));
    context.applyStaticSuppletivePaths(load("static_suppletive_paths.json"));
    context.applyStaticOptions(load("static_options.json"));
    context.applyStaticDerivationalRules(load("static_derivational_rules.json"));
    context.applyStaticValenceNeutral(load("static_valence_neutral.json"));
    context.applyStaticMisc(load("static_misc.json"));
    context.applyStaticOrders(load("static_orders.json"));
    context.applyStaticModes(load("static_modes.json"));
    context.applyStaticLabels(load("static_labels.json"));
    context.applyStaticGroups(load("static_groups.json"));
    context.applyStaticParseRules(load("static_parse_rules.json"));
    context.applyStaticDirectionalRules(load("static_directional_rules.json"));
    context.applyStaticAllomorphyRules(load("static_allomorphy_rules.json"));
}

function splitForms(resultText) {
    return String(resultText || "")
        .split(/\/|\n/)
        .map((part) => part.trim())
        .filter(Boolean);
}

function run() {
    const context = buildVmContext();
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(contextPath, "utf8"), context, { filename: "pret_universal_context.js" });
    vm.runInContext(fs.readFileSync(enginePath, "utf8"), context, { filename: "pret_universal_engine.js" });
    vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context, { filename: "script.js" });
    loadStaticData(context);

    const generateWord = vm.runInContext("generateWord", context);

    const defaults = Object.freeze({
        tenseMode: "verbo",
        derivationMode: "active",
        voiceMode: "active",
        subjectPrefix: "ni",
        subjectSuffix: "",
    });

    const cases = [
        {
            name: "maka direct preterito ni+ki",
            override: { ...defaults, verb: "-maka", tense: "preterito", derivationType: "direct", objectPrefix: "ki" },
            mustInclude: ["nikmak"],
            mustExclude: ["nikimak"],
        },
        {
            name: "maka causative preterito ni+ki",
            override: { ...defaults, verb: "-maka", tense: "preterito", derivationType: "causative", objectPrefix: "ki" },
            mustInclude: ["nikmakaltij"],
            mustExclude: ["nikimakaltij"],
        },
        {
            name: "maka applicative preterito ni+ki",
            override: { ...defaults, verb: "-maka", tense: "preterito", derivationType: "applicative", objectPrefix: "ki" },
            mustInclude: ["nikmak"],
            mustExclude: ["nikimak"],
        },
        {
            name: "maka causative val3 preterito mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "-maka",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nikmakaltij"],
            mustExclude: ["nikimakaltij"],
        },
        {
            name: "maka causative val3 preterito mainline ki shuntline ki",
            override: {
                ...defaults,
                verb: "-maka",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "ki",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nikmakaltij"],
            mustExclude: ["nikimakaltij"],
        },
        {
            name: "maka causative val4 preterito ki+ta+ki",
            override: {
                ...defaults,
                verb: "--maka",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "ki",
                indirectObjectMarker: "ta",
                thirdObjectMarker: "ki",
            },
            mustInclude: ["nikkita"],
            mustExclude: ["nikikita"],
        },
        {
            name: "maka causative universal4 val3 mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "-maka",
                tense: "preterito-universal-4",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nikmakaltij"],
            mustExclude: ["nikimakaltij"],
        },
        {
            name: "maka causative preterito ti+ki",
            override: {
                ...defaults,
                subjectPrefix: "ti",
                verb: "-maka",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "ki",
            },
            mustInclude: ["tikmakaltij"],
            mustExclude: ["tikimakaltij"],
        },
        {
            name: "ilwia causative preterito ni+ki",
            override: {
                ...defaults,
                verb: "-ilwia",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "ki",
            },
            mustInclude: ["nikilwiltij"],
            mustExclude: ["niklwiltij"],
        },
        {
            name: "ilwia causative universal4 val3 mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "--ilwia",
                tense: "preterito-universal-4",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nikilwiltij"],
            mustExclude: ["niklwiltij"],
        },
        {
            name: "wal/(i)lwia causative preterito val3 mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "-wal/(i)lwia",
                tense: "preterito",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nalilwiltij"],
            mustExclude: ["nalkilwiltij"],
        },
        {
            name: "wal/(i)lwia causative presente val3 mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "-wal/(i)lwia",
                tense: "presente",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nalilwiltia"],
            mustExclude: ["nalkilwiltia"],
        },
        {
            name: "wal/(i)lwia causative pasado-remoto val3 mainline Ø shuntline ki",
            override: {
                ...defaults,
                verb: "-wal/(i)lwia",
                tense: "pasado-remoto",
                derivationType: "causative",
                objectPrefix: "",
                indirectObjectMarker: "ki",
            },
            mustInclude: ["nalilwiltijka"],
            mustExclude: ["nalkilwiltijka"],
        },
    ];

    const failures = [];
    cases.forEach((testCase) => {
        const result = generateWord({
            silent: true,
            skipValidation: true,
            override: testCase.override,
        }) || {};
        const forms = splitForms(result.result);
        if (!forms.length) {
            failures.push({
                case: testCase.name,
                reason: "no-forms",
                output: result,
            });
            return;
        }
        (testCase.mustInclude || []).forEach((needle) => {
            const found = forms.some((form) => form.includes(needle));
            if (!found) {
                failures.push({
                    case: testCase.name,
                    reason: `missing-include:${needle}`,
                    output: forms,
                });
            }
        });
        (testCase.mustExclude || []).forEach((needle) => {
            const found = forms.some((form) => form.includes(needle));
            if (found) {
                failures.push({
                    case: testCase.name,
                    reason: `found-excluded:${needle}`,
                    output: forms,
                });
            }
        });
    });

    if (failures.length) {
        console.error("KI allomorphy regression FAILED");
        failures.forEach((failure) => {
            console.error(`- ${failure.case}: ${failure.reason}`);
            console.error(`  output: ${JSON.stringify(failure.output)}`);
        });
        process.exitCode = 1;
        return;
    }
    console.log(`KI allomorphy regression passed (${cases.length} cases)`);
}

run();
