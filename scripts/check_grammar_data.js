#!/usr/bin/env node
"use strict";

/**
 * Grammar data consistency checks.
 *
 * This intentionally stays lighter than a full schema validator: it verifies
 * the cross-file relationships that most often drift when adding tenses,
 * labels, display groups, person options, and lexicon rows.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const ALLOWLIST_PATH = path.join(__dirname, "grammar_data_allowlist.json");

const EXPECTED_JSON_FILES = [
    "exact_rules.json",
    "onset_rules.json",
    "static_allomorphy_rules.json",
    "static_constants.json",
    "static_derivational_rules.json",
    "static_directional_rules.json",
    "static_groups.json",
    "static_labels.json",
    "static_misc.json",
    "static_modes.json",
    "static_nnc.json",
    "static_options.json",
    "static_orders.json",
    "static_parse_rules.json",
    "static_parse_tests.json",
    "static_phonology.json",
    "static_redup.json",
    "static_rules.json",
    "static_suppletive_paths.json",
    "static_suppletives.json",
    "static_valence_neutral.json",
];

const EXPECTED_CSV_FILES = [
    "basic-data.csv",
    "data.csv",
];

const EXPECTED_LEXICON_HEADER = [
    "verb",
    "3s preterit",
    "3pl preterit",
    "3s perfect",
    "3pl perfect",
];

const INTERNAL_TENSE_IDS = new Set([
    "preterito-clase",
]);

const HIDDEN_FORMULA_COMPATIBILITY_TENSE_IDS = new Set([
    "presente-desiderativo",
    "condicional",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
    "potencial",
    "potencial-habitual",
    "adjetivo-preterito",
    "adjetivo-perfecto",
    "adjetivo-preterito-tik",
    "adjetivo-perfecto-tik",
    "adjetivo-preterito-naj",
    "adjetivo-perfecto-naj",
    "adjetivo-patientivo-no-activo",
    "adjetivo-patientivo-perfectivo",
    "pasado-remoto-adverbio-activo",
]);

const PRETERIT_CLASS_IDS = new Set(["A", "B", "C", "D"]);
const VALID_NONACTIVE_SUFFIXES = new Set(["lu", "u", "wa", "luwa", "uwa", "walu"]);
const STATIC_NNC_ALLOWED_STATES = new Set(["absolutive", "possessive"]);
const STATIC_NNC_ALLOWED_NUMBERS = new Set(["singular", "plural"]);
const STATIC_NNC_ALLOWED_PLURAL_TYPES = new Set(["count", "distributive"]);
const STATIC_NNC_ALLOWED_NOUN_CLASSES = new Set(["t", "ti", "in", "zero"]);
const STATIC_NNC_ALLOWED_ANIMACIES = new Set(["animate", "inanimate"]);
const STATIC_MODES_DENOMINAL_ROUTE_FAMILIES = new Map([
    ["vi-ti", { verbalizer: "-ti", verbalizerType: "denominal-intransitive", valency: "intransitive", structuralAnalogue: "inceptive-stative-ti-route" }],
    ["vi-iwi", { verbalizer: "-iwi", verbalizerType: "denominal-intransitive", valency: "intransitive", structuralAnalogue: "inceptive-stative-wi-route" }],
    ["vi-awi", { verbalizer: "-awi", verbalizerType: "denominal-intransitive", valency: "intransitive", structuralAnalogue: "inceptive-stative-wi-route" }],
    ["vt-na", { verbalizer: "-na", verbalizerType: "denominal-transitive", valency: "transitive", structuralAnalogue: "nawat-transitive-route-no-andrews-suffix" }],
]);
const OBSOLETE_FUNCTION_TENSE_MODE_KEY = ["function", "Tense", "Mode"].join("");

const errors = [];

function rel(absPath) {
    return path.relative(ROOT, absPath).replace(/\\/g, "/");
}

function addError(message) {
    errors.push(message);
}

function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asArray(value, where) {
    if (!Array.isArray(value)) {
        addError(`${where} must be an array.`);
        return [];
    }
    return value;
}

function asObject(value, where) {
    if (!isPlainObject(value)) {
        addError(`${where} must be an object.`);
        return {};
    }
    return value;
}

function checkUnique(values, where) {
    const seen = new Map();
    const duplicates = [];
    values.forEach((value, index) => {
        if (seen.has(value)) {
            duplicates.push(`${JSON.stringify(value)} at indexes ${seen.get(value)} and ${index}`);
            return;
        }
        seen.set(value, index);
    });
    if (duplicates.length) {
        addError(`${where} contains duplicate values: ${duplicates.slice(0, 8).join("; ")}${duplicates.length > 8 ? " ..." : ""}`);
    }
}

function checkStringArray(values, where, { allowEmpty = false } = {}) {
    const array = asArray(values, where);
    array.forEach((value, index) => {
        if (typeof value !== "string" || (!allowEmpty && value.trim() === "")) {
            addError(`${where}[${index}] must be a non-empty string.`);
        }
    });
    checkUnique(array, where);
    return array;
}

function checkStringInventory(value, where) {
    if (typeof value === "string") {
        if (!value) {
            addError(`${where} must not be empty.`);
            return [];
        }
        const characters = Array.from(value);
        checkUnique(characters, where);
        return characters;
    }
    return checkStringArray(value, where);
}

function loadJsonFile(fileName) {
    const absPath = path.join(DATA_DIR, fileName);
    try {
        return JSON.parse(fs.readFileSync(absPath, "utf8"));
    } catch (error) {
        addError(`${rel(absPath)} could not be parsed as JSON: ${error.message}`);
        return null;
    }
}

function loadScriptConst(relPath, constName) {
    const absPath = path.join(ROOT, relPath);
    let source = "";
    try {
        source = fs.readFileSync(absPath, "utf8");
    } catch (error) {
        addError(`${rel(absPath)} could not be read: ${error.message}`);
        return undefined;
    }
    source = source
        .replace(/export\s+const\s+/g, "const ")
        .replace(/export\s+function\s+/g, "function ");
    const context = {};
    vm.createContext(context);
    try {
        vm.runInContext(
            `${source}\nglobalThis.__CHECK_VALUE__ = ${constName};`,
            context,
            { filename: absPath }
        );
    } catch (error) {
        addError(`${rel(absPath)} could not expose ${constName}: ${error.message}`);
        return undefined;
    }
    return context.__CHECK_VALUE__;
}

function loadAllowlist() {
    try {
        return JSON.parse(fs.readFileSync(ALLOWLIST_PATH, "utf8"));
    } catch (error) {
        addError(`${rel(ALLOWLIST_PATH)} could not be parsed as JSON: ${error.message}`);
        return {};
    }
}

function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const next = line[i + 1];
        if (char === "\"") {
            if (inQuotes && next === "\"") {
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
    return cells.map((cell) => cell.trim());
}

function loadCsvRows(fileName) {
    const absPath = path.join(DATA_DIR, fileName);
    let text = "";
    try {
        text = fs.readFileSync(absPath, "utf8");
    } catch (error) {
        addError(`${rel(absPath)} could not be read: ${error.message}`);
        return { header: [], rows: [] };
    }
    const lines = text.split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line !== "");
    if (!lines.length) {
        addError(`${rel(absPath)} is empty.`);
        return { header: [], rows: [] };
    }
    const header = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map((line, index) => ({
        lineNumber: index + 2,
        cells: parseCsvLine(line),
    }));
    return { header, rows };
}

function checkExpectedDataFiles() {
    const actualDataFiles = fs.readdirSync(DATA_DIR)
        .filter((fileName) => fileName.endsWith(".csv") || fileName.endsWith(".json"))
        .sort();
    const expectedDataFiles = [...EXPECTED_CSV_FILES, ...EXPECTED_JSON_FILES].sort();
    const expected = new Set(expectedDataFiles);
    const actual = new Set(actualDataFiles);

    expectedDataFiles.forEach((fileName) => {
        if (!actual.has(fileName)) {
            addError(`Missing grammar data file: data/${fileName}`);
        }
    });
    actualDataFiles.forEach((fileName) => {
        if (!expected.has(fileName)) {
            addError(`Unexpected grammar data file: data/${fileName}. Add it to scripts/check_grammar_data.js and the runtime loader if it is intentional.`);
        }
    });
}

function checkLexiconCsvFiles(allowlist) {
    const allVerbLocations = new Map();
    const rowCounts = new Map();
    const separatorRowCounts = {};
    const allowedDuplicates = asObject(
        allowlist.duplicateLexiconEntries || {},
        "grammar_data_allowlist.duplicateLexiconEntries"
    );

    EXPECTED_CSV_FILES.forEach((fileName) => {
        const dataPath = `data/${fileName}`;
        const { header, rows } = loadCsvRows(fileName);
        rowCounts.set(fileName, rows.length);
        if (header.join("\u0000") !== EXPECTED_LEXICON_HEADER.join("\u0000")) {
            addError(`data/${fileName} header must be exactly: ${EXPECTED_LEXICON_HEADER.join(", ")}`);
        }

        const localVerbLocations = new Map();
        let separatorRowCount = 0;
        rows.forEach(({ lineNumber, cells }) => {
            if (cells.length !== EXPECTED_LEXICON_HEADER.length) {
                addError(`data/${fileName}:${lineNumber} has ${cells.length} columns; expected ${EXPECTED_LEXICON_HEADER.length}.`);
                return;
            }
            const [verb, ...forms] = cells;
            if (!verb) {
                if (forms.every((form) => form === "" || form === "\u2014")) {
                    separatorRowCount += 1;
                    return;
                }
                addError(`data/${fileName}:${lineNumber} has an empty verb key.`);
                return;
            }
            if (forms.every((form) => form === "")) {
                addError(`data/${fileName}:${lineNumber} has no preterit/perfect forms.`);
            }

            const location = `data/${fileName}:${lineNumber}`;
            if (!localVerbLocations.has(verb)) {
                localVerbLocations.set(verb, []);
            }
            localVerbLocations.get(verb).push(location);
            if (!allVerbLocations.has(verb)) {
                allVerbLocations.set(verb, []);
            }
            allVerbLocations.get(verb).push({ fileName, location });
        });

        const localDuplicates = Array.from(localVerbLocations.entries())
            .filter(([, locations]) => locations.length > 1);
        checkAllowlistedDuplicateCounts(
            Object.fromEntries(localDuplicates.map(([verb, locations]) => [verb, locations.length])),
            allowedDuplicates[dataPath] || {},
            `duplicateLexiconEntries.${dataPath}`
        );
        separatorRowCounts[dataPath] = separatorRowCount;
    });
    const expectedDataPaths = new Set(EXPECTED_CSV_FILES.map((fileName) => `data/${fileName}`));
    Object.keys(allowedDuplicates).forEach((dataPath) => {
        if (!expectedDataPaths.has(dataPath)) {
            addError(`duplicateLexiconEntries.${dataPath} is allowlisted, but ${dataPath} is not a checked CSV file.`);
        }
    });

    const crossFileDuplicates = Array.from(allVerbLocations.entries())
        .filter(([, locations]) => {
            const files = new Set(locations.map((item) => item.fileName));
            return files.has("basic-data.csv") && files.has("data.csv");
        })
        .map(([key, locations]) => [key, locations.map((item) => item.location)]);
    checkAllowlistedSet(
        crossFileDuplicates.map(([verb]) => verb),
        asArray(allowlist.crossFileLexiconOverlap || [], "grammar_data_allowlist.crossFileLexiconOverlap"),
        "crossFileLexiconOverlap"
    );
    checkAllowlistedSeparatorRows(
        separatorRowCounts,
        asObject(allowlist.separatorRowCounts || {}, "grammar_data_allowlist.separatorRowCounts")
    );

    return rowCounts;
}

function checkAllowlistedDuplicateCounts(actualCounts, allowedCounts, where) {
    const actual = asObject(actualCounts, where);
    const allowed = asObject(allowedCounts, `grammar_data_allowlist.${where}`);
    Object.entries(actual).forEach(([verb, count]) => {
        if (!(verb in allowed)) {
            addError(`${where} has unexpected duplicate verb "${verb}" (${count} rows). Add it to scripts/grammar_data_allowlist.json only if intentional.`);
        } else if (allowed[verb] !== count) {
            addError(`${where}.${verb} duplicate row count changed from allowlisted ${allowed[verb]} to ${count}.`);
        }
    });
    Object.entries(allowed).forEach(([verb, count]) => {
        if (!(verb in actual)) {
            addError(`${where}.${verb} is allowlisted with count ${count}, but it is no longer duplicated. Remove it from scripts/grammar_data_allowlist.json.`);
        }
    });
}

function checkAllowlistedSet(actualValues, allowedValues, where) {
    checkUnique(actualValues, where);
    checkUnique(allowedValues, `grammar_data_allowlist.${where}`);
    const actual = new Set(actualValues);
    const allowed = new Set(allowedValues);
    actualValues.forEach((value) => {
        if (!allowed.has(value)) {
            addError(`${where} has unexpected value "${value}". Add it to scripts/grammar_data_allowlist.json only if intentional.`);
        }
    });
    allowedValues.forEach((value) => {
        if (!actual.has(value)) {
            addError(`${where} allowlists "${value}", but it no longer occurs. Remove it from scripts/grammar_data_allowlist.json.`);
        }
    });
}

function checkAllowlistedSeparatorRows(actualCounts, allowedCounts) {
    const expectedDataPaths = new Set(EXPECTED_CSV_FILES.map((fileName) => `data/${fileName}`));
    expectedDataPaths.forEach((dataPath) => {
        const actual = actualCounts[dataPath] || 0;
        const allowed = Number(allowedCounts[dataPath] || 0);
        if (actual !== allowed) {
            addError(`separatorRowCounts.${dataPath} changed from allowlisted ${allowed} to ${actual}. Update scripts/grammar_data_allowlist.json if intentional.`);
        }
    });
    Object.keys(allowedCounts).forEach((dataPath) => {
        if (!expectedDataPaths.has(dataPath)) {
            addError(`separatorRowCounts.${dataPath} is allowlisted, but ${dataPath} is not a checked CSV file.`);
        }
    });
}

function checkRequiredTopLevelKeys(jsonByName) {
    const requiredKeysByFile = {
        "static_groups.json": ["tenseLinguisticGroups"],
        "static_labels.json": ["uiLabels", "personGroupLabels", "personSubLabels", "objectLabels", "tenseLabels", "tenseDescriptions", "preteritoClassDetailByKey"],
        "static_misc.json": ["nonanimateNounTenses", "subjectPersonNumberOrder", "nonactiveSuffixOrder"],
        "static_modes.json": ["tenseMode", "functionRole", "tenseModeSystem", "nawatTenseMode", "nawatRouteProfiles"],
        "static_nnc.json": ["ordinaryNncFixtures"],
        "static_options.json": ["specificValencePrefixes", "nonspecificValencePrefixes", "nonspecificValenceAffixes", "objectPrefixes", "subjectCombinations", "subjectPersonGroups", "possessivePrefixes", "possessorLabels", "possessiveToObjectPrefix", "passiveImpersonalSubjectMap", "sustantivoVerbalTransitivePrefixes", "invalidCombinationKeys"],
        "static_orders.json": ["tenseOrder", "preteritoUniversalOrder"],
        "static_phonology.json": ["directionalPrefixes", "vowels", "validConsonants", "digraphs", "syllableForms", "surfaceAssimilations"],
        "static_rules.json": ["tenseSuffixRules", "pretUniversalClassByTense", "preteritoClassTenses", "nonspecificIDropVerbs"],
        "static_suppletive_paths.json": ["paths"],
        "static_valence_neutral.json": ["intransitiveToApplicative", "intransitiveToCausative", "transitiveToApplicative"],
    };

    Object.entries(requiredKeysByFile).forEach(([fileName, keys]) => {
        const data = asObject(jsonByName[fileName], `data/${fileName}`);
        keys.forEach((key) => {
            if (!(key in data)) {
                addError(`data/${fileName} is missing required top-level key "${key}".`);
            }
        });
    });
}

function checkNawatRouteProfiles(jsonByName) {
    const modes = asObject(jsonByName["static_modes.json"], "data/static_modes.json");
    const orders = asObject(jsonByName["static_orders.json"], "data/static_orders.json");
    const routeProfiles = asObject(modes.nawatRouteProfiles, "static_modes.nawatRouteProfiles");
    const tenseOrder = Array.isArray(orders.tenseOrder) ? orders.tenseOrder : [];
    const knownTenseSet = new Set([...tenseOrder, ...INTERNAL_TENSE_IDS]);
    const formalTenseMode = asObject(modes.tenseMode, "static_modes.tenseMode");
    if (Object.prototype.hasOwnProperty.call(modes, OBSOLETE_FUNCTION_TENSE_MODE_KEY)) {
        addError("static_modes has an obsolete function-tense mode field; use static_modes.functionRole so adjectival/adverbial stay function routes, not extra formal modes.");
    }
    const functionRole = asObject(modes.functionRole, "static_modes.functionRole");
    const formalTenseModeKeys = new Set(Object.keys(formalTenseMode));
    const functionRoleKeys = new Set(Object.keys(functionRole));
    ["adjetivo", "adverbio"].forEach((key) => {
        if (formalTenseModeKeys.has(key)) {
            addError(`static_modes.tenseMode.${key} must not be a formal class; put it under static_modes.functionRole.`);
        }
    });
    ["verbo", "sustantivo", "particula"].forEach((key) => {
        if (!formalTenseModeKeys.has(key)) {
            addError(`static_modes.tenseMode must include Andrews formal class "${key}".`);
        }
    });
    ["adjetivo", "adverbio"].forEach((key) => {
        if (!functionRoleKeys.has(key)) {
            addError(`static_modes.functionRole must include rerouted function "${key}".`);
        }
    });
    const nawatModeKeys = new Set(Object.keys(asObject(modes.nawatTenseMode, "static_modes.nawatTenseMode")));
    const combinedModeKeys = new Set(Object.keys(asObject(modes.combinedMode, "static_modes.combinedMode")));
    const derivationModeKeys = new Set(Object.keys(asObject(modes.derivationMode, "static_modes.derivationMode")));
    const voiceModeKeys = new Set(Object.keys(asObject(modes.voiceMode, "static_modes.voiceMode")));
    const allowedPlacements = new Set([
        "direct-finite",
        "nonactive-habitual",
        "patientivo-surface",
        "patientivo-tronco-conversion",
    ]);
    const seenIds = new Map();
    Object.entries(routeProfiles).forEach(([key, rawProfile]) => {
        const where = `static_modes.nawatRouteProfiles.${key}`;
        const profile = asObject(rawProfile, where);
        const requiredStringKeys = [
            "id",
            "nawatMode",
            "nawatTenseValue",
            "sourceSlot",
            "sourceCategory",
            "valency",
            "finiteTense",
            "routePlacement",
        ];
        requiredStringKeys.forEach((field) => {
            if (typeof profile[field] !== "string" || !profile[field].trim()) {
                addError(`${where}.${field} must be a non-empty string.`);
            }
        });
        ["routeTenseValue", "routeMode", "routeFunctionMode"].forEach((field) => {
            if (
                Object.prototype.hasOwnProperty.call(profile, field)
                && typeof profile[field] !== "string"
            ) {
                addError(`${where}.${field} must be a string when present.`);
            }
        });
        if (profile.id) {
            if (seenIds.has(profile.id)) {
                addError(`${where}.id duplicates ${seenIds.get(profile.id)}.`);
            } else {
                seenIds.set(profile.id, where);
            }
        }
        checkLocalizedLabel(profile.nawatLabel, `${where}.nawatLabel`);
        checkLocalizedLabel(profile.nawatMetaLabel, `${where}.nawatMetaLabel`);
        if (profile.routeTenseValue && !profile.routeMode) {
            addError(`${where}.routeMode must be a non-empty string when routeTenseValue is set.`);
        }
        if (profile.routeMode && !formalTenseModeKeys.has(profile.routeMode)) {
            addError(`${where}.routeMode must be an Andrews formal class (verbo, sustantivo, particula), not a function role.`);
        }
        if (profile.routeFunctionMode && !functionRoleKeys.has(profile.routeFunctionMode)) {
            addError(`${where}.routeFunctionMode references unknown function role "${profile.routeFunctionMode}".`);
        }
        if (
            profile.routeTenseValue
            && /^adjetivo-|^potencial(?:-|$)|adverbio/.test(profile.routeTenseValue)
            && !profile.routeFunctionMode
        ) {
            addError(`${where}.routeFunctionMode must record the function route for function-named tense "${profile.routeTenseValue}".`);
        }
        if (profile.routeTenseValue && profile.routeTenseValue !== key) {
            addError(`${where}.routeTenseValue must match its map key.`);
        }
        if (profile.routeTenseValue && !knownTenseSet.has(profile.routeTenseValue)) {
            addError(`${where}.routeTenseValue references unknown tense "${profile.routeTenseValue}".`);
        }
        ["nawatTenseValue", "targetTenseValue"].forEach((field) => {
            if (profile[field] && !knownTenseSet.has(profile[field])) {
                addError(`${where}.${field} references unknown tense "${profile[field]}".`);
            }
        });
        ["routeMode", "targetMode", "sourceMode"].forEach((field) => {
            if (profile[field] && !formalTenseModeKeys.has(profile[field])) {
                addError(`${where}.${field} must be an Andrews formal class (verbo, sustantivo, particula), not a function role.`);
            }
        });
        if (profile.routeFunctionMode && !functionRoleKeys.has(profile.routeFunctionMode)) {
            addError(`${where}.routeFunctionMode references unknown function role "${profile.routeFunctionMode}".`);
        }
        if (profile.nawatMode && !nawatModeKeys.has(profile.nawatMode)) {
            addError(`${where}.nawatMode references unknown Nawat mode "${profile.nawatMode}".`);
        }
        ["sourceCombinedMode", "targetCombinedMode", "routeCombinedMode"].forEach((field) => {
            if (profile[field] && !combinedModeKeys.has(profile[field])) {
                addError(`${where}.${field} references unknown combined mode "${profile[field]}".`);
            }
        });
        ["derivationMode", "targetDerivationMode", "routeDerivationMode"].forEach((field) => {
            if (profile[field] && !derivationModeKeys.has(profile[field])) {
                addError(`${where}.${field} references unknown derivation mode "${profile[field]}".`);
            }
        });
        ["voiceMode", "targetVoiceMode", "routeVoiceMode"].forEach((field) => {
            if (profile[field] && !voiceModeKeys.has(profile[field])) {
                addError(`${where}.${field} references unknown voice mode "${profile[field]}".`);
            }
        });
        if (profile.routePlacement && !allowedPlacements.has(profile.routePlacement)) {
            addError(`${where}.routePlacement uses unknown placement "${profile.routePlacement}".`);
        }
        if (profile.routePlacement === "patientivo-tronco-conversion" && !profile.verbalizer) {
            addError(`${where} is a patientivo-tronco-conversion route but has no verbalizer.`);
        }
        if (profile.routePlacement === "patientivo-tronco-conversion") {
            if (typeof profile.denominalFamily !== "string" || !profile.denominalFamily.trim()) {
                addError(`${where}.denominalFamily must be set for patientivo-tronco-conversion routes.`);
            } else if (!STATIC_MODES_DENOMINAL_ROUTE_FAMILIES.has(profile.denominalFamily)) {
                addError(`${where}.denominalFamily uses unknown family "${profile.denominalFamily}".`);
            } else {
                const expected = STATIC_MODES_DENOMINAL_ROUTE_FAMILIES.get(profile.denominalFamily);
                ["verbalizer", "verbalizerType", "valency", "structuralAnalogue"].forEach((field) => {
                    if (profile[field] !== expected[field]) {
                        addError(`${where}.${field} must be "${expected[field]}" for denominalFamily "${profile.denominalFamily}".`);
                    }
                });
            }
        }
        if (profile.routePlacement === "patientivo-surface" && !profile.patientivoSource) {
            addError(`${where} is a patientivo-surface route but has no patientivoSource.`);
        }
        const stations = asArray(profile.stations, `${where}.stations`);
        if (!stations.length) {
            addError(`${where}.stations must contain at least one station.`);
        }
        stations.forEach((station, index) => {
            const stationWhere = `${where}.stations[${index}]`;
            const stationObject = asObject(station, stationWhere);
            ["id", "value"].forEach((field) => {
                if (typeof stationObject[field] !== "string" || !stationObject[field].trim()) {
                    addError(`${stationWhere}.${field} must be a non-empty string.`);
                }
            });
        });
    });
}

function checkTenseReferences(jsonByName) {
    const orders = asObject(jsonByName["static_orders.json"], "data/static_orders.json");
    const rules = asObject(jsonByName["static_rules.json"], "data/static_rules.json");
    const groups = asObject(jsonByName["static_groups.json"], "data/static_groups.json");
    const labels = asObject(jsonByName["static_labels.json"], "data/static_labels.json");
    const misc = asObject(jsonByName["static_misc.json"], "data/static_misc.json");

    const tenseOrder = checkStringArray(orders.tenseOrder, "static_orders.tenseOrder");
    const tenseSet = new Set(tenseOrder);
    const knownTenseSet = new Set([...tenseOrder, ...INTERNAL_TENSE_IDS]);

    const tenseLabels = asObject(labels.tenseLabels, "static_labels.tenseLabels");
    const tenseDescriptions = asObject(labels.tenseDescriptions, "static_labels.tenseDescriptions");
    tenseOrder.forEach((tense) => {
        checkLocalizedLabel(tenseLabels[tense], `static_labels.tenseLabels.${tense}`);
        checkLocalizedLabel(tenseDescriptions[tense], `static_labels.tenseDescriptions.${tense}`);
    });
    checkNoUnknownKeys(tenseLabels, tenseSet, "static_labels.tenseLabels");
    checkNoUnknownKeys(tenseDescriptions, tenseSet, "static_labels.tenseDescriptions");

    const tenseSuffixRules = asObject(rules.tenseSuffixRules, "static_rules.tenseSuffixRules");
    Object.keys(tenseSuffixRules).forEach((tense) => {
        if (!tenseSet.has(tense)) {
            addError(`static_rules.tenseSuffixRules references unknown tense "${tense}".`);
        }
    });

    const preteritoClassTenses = checkStringArray(rules.preteritoClassTenses, "static_rules.preteritoClassTenses");
    preteritoClassTenses.forEach((tense) => {
        if (!knownTenseSet.has(tense)) {
            addError(`static_rules.preteritoClassTenses references unknown tense "${tense}".`);
        }
    });

    const preteritoUniversalOrder = checkStringArray(orders.preteritoUniversalOrder, "static_orders.preteritoUniversalOrder");
    const universalClassMap = asObject(rules.pretUniversalClassByTense, "static_rules.pretUniversalClassByTense");
    checkSameKeySet(preteritoUniversalOrder, Object.keys(universalClassMap), "preteritoUniversalOrder", "pretUniversalClassByTense");
    Object.entries(universalClassMap).forEach(([tense, classId]) => {
        if (!PRETERIT_CLASS_IDS.has(classId)) {
            addError(`static_rules.pretUniversalClassByTense.${tense} uses unknown class "${classId}".`);
        }
    });

    const classLabels = asObject(labels.preteritoClassDetailByKey, "static_labels.preteritoClassDetailByKey");
    PRETERIT_CLASS_IDS.forEach((classId) => {
        if (!classLabels[classId]) {
            addError(`static_labels.preteritoClassDetailByKey is missing class "${classId}".`);
        }
    });

    const coveredTenses = new Set();
    const tenseGroups = asObject(groups.tenseLinguisticGroups, "static_groups.tenseLinguisticGroups");
    Object.entries(tenseGroups).forEach(([mode, sideMap]) => {
        ["left", "right"].forEach((side) => {
            asArray(sideMap[side] || [], `static_groups.tenseLinguisticGroups.${mode}.${side}`).forEach((block, blockIndex) => {
                checkLocalizedLabel(block.heading, `static_groups.tenseLinguisticGroups.${mode}.${side}[${blockIndex}].heading`);
                checkStringArray(block.tenses, `static_groups.tenseLinguisticGroups.${mode}.${side}[${blockIndex}].tenses`).forEach((tense) => {
                    if (!tenseSet.has(tense)) {
                        addError(`static_groups.tenseLinguisticGroups.${mode}.${side}[${blockIndex}] references unknown tense "${tense}".`);
                    }
                    coveredTenses.add(tense);
                });
            });
        });
    });
    tenseOrder.forEach((tense) => {
        if (!coveredTenses.has(tense) && !HIDDEN_FORMULA_COMPATIBILITY_TENSE_IDS.has(tense)) {
            addError(`static_orders.tenseOrder includes "${tense}", but no display group references it.`);
        }
    });

    checkStringArray(misc.nonanimateNounTenses, "static_misc.nonanimateNounTenses").forEach((tense) => {
        if (!tenseSet.has(tense)) {
            addError(`static_misc.nonanimateNounTenses references unknown tense "${tense}".`);
        }
    });
}

function checkOptionReferences(jsonByName) {
    const labels = asObject(jsonByName["static_labels.json"], "data/static_labels.json");
    const options = asObject(jsonByName["static_options.json"], "data/static_options.json");
    const misc = asObject(jsonByName["static_misc.json"], "data/static_misc.json");

    const personSubLabels = asObject(labels.personSubLabels, "static_labels.personSubLabels");
    const personGroupLabels = asObject(labels.personGroupLabels, "static_labels.personGroupLabels");
    const knownPersonKeys = new Set(Object.keys(personSubLabels));
    const knownPersonGroupKeys = new Set(Object.keys(personGroupLabels));

    const objectPrefixes = asArray(options.objectPrefixes, "static_options.objectPrefixes");
    const objectPrefixValues = objectPrefixes.map((entry, index) => {
        if (!isPlainObject(entry)) {
            addError(`static_options.objectPrefixes[${index}] must be an object.`);
            return "";
        }
        if (typeof entry.value !== "string") {
            addError(`static_options.objectPrefixes[${index}].value must be a string.`);
            return "";
        }
        return entry.value;
    }).filter(Boolean);
    checkUnique(objectPrefixValues, "static_options.objectPrefixes values");
    const objectPrefixSet = new Set(objectPrefixValues);

    checkStringArray(options.specificValencePrefixes, "static_options.specificValencePrefixes").forEach((prefix) => {
        if (!objectPrefixSet.has(prefix)) {
            addError(`static_options.specificValencePrefixes contains "${prefix}", but objectPrefixes does not.`);
        }
    });
    checkStringArray(options.nonspecificValencePrefixes, "static_options.nonspecificValencePrefixes").forEach((prefix) => {
        if (!objectPrefixSet.has(prefix)) {
            addError(`static_options.nonspecificValencePrefixes contains "${prefix}", but objectPrefixes does not.`);
        }
    });

    const subjectSlotKeys = new Set();
    asArray(options.subjectCombinations, "static_options.subjectCombinations").forEach((entry, index) => {
        checkPersonRef(entry && entry.personSubKey, `static_options.subjectCombinations[${index}].personSubKey`, knownPersonKeys);
        if (isPlainObject(entry)) {
            subjectSlotKeys.add(`${entry.subjectPrefix || ""}|${entry.subjectSuffix || ""}`);
        }
    });
    asArray(options.subjectPersonGroups, "static_options.subjectPersonGroups").forEach((entry, index) => {
        checkKnownKey(entry && entry.labelKey, knownPersonGroupKeys, `static_options.subjectPersonGroups[${index}].labelKey`, "personGroupLabels");
        checkPersonRef(entry && entry.singular && entry.singular.personSubKey, `static_options.subjectPersonGroups[${index}].singular.personSubKey`, knownPersonKeys);
        checkPersonRef(entry && entry.plural && entry.plural.personSubKey, `static_options.subjectPersonGroups[${index}].plural.personSubKey`, knownPersonKeys);
    });

    const possessivePrefixes = asArray(options.possessivePrefixes, "static_options.possessivePrefixes");
    const possessiveValues = new Set();
    possessivePrefixes.forEach((entry, index) => {
        if (!isPlainObject(entry)) {
            addError(`static_options.possessivePrefixes[${index}] must be an object.`);
            return;
        }
        if (entry.personSubKey) {
            checkPersonRef(entry.personSubKey, `static_options.possessivePrefixes[${index}].personSubKey`, knownPersonKeys);
        }
        if (typeof entry.value === "string" && entry.value) {
            possessiveValues.add(entry.value);
        }
    });
    const possessorLabels = asObject(options.possessorLabels, "static_options.possessorLabels");
    possessiveValues.forEach((value) => {
        checkLocalizedLabel(possessorLabels[value], `static_options.possessorLabels.${value}`);
    });

    const possessiveToObjectPrefix = asObject(options.possessiveToObjectPrefix, "static_options.possessiveToObjectPrefix");
    Object.entries(possessiveToObjectPrefix).forEach(([possessivePrefix, objectPrefix]) => {
        if (!possessiveValues.has(possessivePrefix)) {
            addError(`static_options.possessiveToObjectPrefix references unknown possessive prefix "${possessivePrefix}".`);
        }
        if (!objectPrefixSet.has(objectPrefix)) {
            addError(`static_options.possessiveToObjectPrefix.${possessivePrefix} references unknown object prefix "${objectPrefix}".`);
        }
    });

    const passiveImpersonalSubjectMap = asObject(options.passiveImpersonalSubjectMap, "static_options.passiveImpersonalSubjectMap");
    Object.entries(passiveImpersonalSubjectMap).forEach(([objectPrefix, subjectSlots]) => {
        if (!objectPrefixSet.has(objectPrefix)) {
            addError(`static_options.passiveImpersonalSubjectMap references unknown object prefix "${objectPrefix}".`);
        }
        if (!isPlainObject(subjectSlots)) {
            addError(`static_options.passiveImpersonalSubjectMap.${objectPrefix} must be an object.`);
            return;
        }
        if (Object.prototype.hasOwnProperty.call(subjectSlots, "subjectPrefix")
            || Object.prototype.hasOwnProperty.call(subjectSlots, "subjectSuffix")) {
            addError(`static_options.passiveImpersonalSubjectMap.${objectPrefix} must use pers1/pers2, not the former subject-slot keys.`);
        }
        ["pers1", "pers2"].forEach((slot) => {
            if (typeof subjectSlots[slot] !== "string") {
                addError(`static_options.passiveImpersonalSubjectMap.${objectPrefix}.${slot} must be a string.`);
            }
        });
        const subjectSlotKey = `${subjectSlots.pers1 || ""}|${subjectSlots.pers2 || ""}`;
        if (!subjectSlotKeys.has(subjectSlotKey)) {
            addError(`static_options.passiveImpersonalSubjectMap.${objectPrefix} maps to unknown pers1/pers2 "${subjectSlotKey}".`);
        }
    });

    checkStringArray(options.sustantivoVerbalTransitivePrefixes, "static_options.sustantivoVerbalTransitivePrefixes").forEach((prefix) => {
        if (!objectPrefixSet.has(prefix)) {
            addError(`static_options.sustantivoVerbalTransitivePrefixes contains "${prefix}", but objectPrefixes does not.`);
        }
    });

    checkStringArray(options.invalidCombinationKeys, "static_options.invalidCombinationKeys", { allowEmpty: false }).forEach((key) => {
        if (key.split("|").length !== 3) {
            addError(`static_options.invalidCombinationKeys entry "${key}" must have subjectPrefix|objectPrefix|subjectSuffix format.`);
        }
    });

    checkStringArray(misc.nonactiveSuffixOrder, "static_misc.nonactiveSuffixOrder").forEach((suffix) => {
        if (!VALID_NONACTIVE_SUFFIXES.has(suffix)) {
            addError(`static_misc.nonactiveSuffixOrder contains unknown suffix "${suffix}".`);
        }
    });
}

function checkPhonologyReferences(jsonByName) {
    const phonology = asObject(jsonByName["static_phonology.json"], "data/static_phonology.json");
    const allomorphy = asObject(jsonByName["static_allomorphy_rules.json"], "data/static_allomorphy_rules.json");
    const directional = asObject(jsonByName["static_directional_rules.json"], "data/static_directional_rules.json");

    const directionalPrefixes = checkStringArray(phonology.directionalPrefixes, "static_phonology.directionalPrefixes");
    const directionalPrefixSet = new Set(directionalPrefixes);
    checkStringInventory(phonology.vowels, "static_phonology.vowels");
    checkStringArray(phonology.validConsonants, "static_phonology.validConsonants");
    checkStringArray(phonology.digraphs, "static_phonology.digraphs");
    checkStringArray(phonology.syllableForms, "static_phonology.syllableForms");

    const supportive = asObject(allomorphy.supportive, "static_allomorphy_rules.supportive");
    checkStringArray(supportive.keepSlashPrefixes || [], "static_allomorphy_rules.supportive.keepSlashPrefixes").forEach((prefix) => {
        if (!directionalPrefixSet.has(prefix)) {
            addError(`static_allomorphy_rules.supportive.keepSlashPrefixes references unknown directional prefix "${prefix}".`);
        }
    });

    asArray(directional.rules, "static_directional_rules.rules").forEach((rule, ruleIndex) => {
        checkStringArray(rule.prefixes, `static_directional_rules.rules[${ruleIndex}].prefixes`).forEach((prefix) => {
            if (!directionalPrefixSet.has(prefix)) {
                addError(`static_directional_rules.rules[${ruleIndex}] references unknown directional prefix "${prefix}".`);
            }
        });
    });
}

function checkSuppletivePathReferences(jsonByName) {
    const pathsConfig = asObject(jsonByName["static_suppletive_paths.json"], "data/static_suppletive_paths.json");
    const rules = asObject(jsonByName["static_rules.json"], "data/static_rules.json");
    const tenseOrder = new Set(asArray(jsonByName["static_orders.json"] && jsonByName["static_orders.json"].tenseOrder, "static_orders.tenseOrder"));
    const knownTenseSet = new Set([...tenseOrder, ...INTERNAL_TENSE_IDS]);
    const knownClassTenses = new Set(asArray(rules.preteritoClassTenses || [], "static_rules.preteritoClassTenses"));
    const pathIds = [];

    asArray(pathsConfig.paths, "static_suppletive_paths.paths").forEach((entry, index) => {
        if (!isPlainObject(entry)) {
            addError(`static_suppletive_paths.paths[${index}] must be an object.`);
            return;
        }
        if (typeof entry.id !== "string" || !entry.id) {
            addError(`static_suppletive_paths.paths[${index}].id must be a non-empty string.`);
        } else {
            pathIds.push(entry.id);
        }
        ["activeTenses", "nonactiveTenses"].forEach((key) => {
            if (!Array.isArray(entry[key])) {
                return;
            }
            checkStringArray(entry[key], `static_suppletive_paths.paths[${index}].${key}`).forEach((tense) => {
                if (!knownTenseSet.has(tense) && !knownClassTenses.has(tense)) {
                    addError(`static_suppletive_paths.paths[${index}].${key} references unknown tense "${tense}".`);
                }
            });
        });
        if (entry.tenseSuffixOverrides) {
            Object.keys(entry.tenseSuffixOverrides).forEach((tense) => {
                if (!knownTenseSet.has(tense) && !knownClassTenses.has(tense)) {
                    addError(`static_suppletive_paths.paths[${index}].tenseSuffixOverrides references unknown tense "${tense}".`);
                }
            });
        }
        if (entry.verbOverrides) {
            Object.keys(entry.verbOverrides).forEach((tense) => {
                if (!knownTenseSet.has(tense) && !knownClassTenses.has(tense)) {
                    addError(`static_suppletive_paths.paths[${index}].verbOverrides references unknown tense "${tense}".`);
                }
            });
        }
    });
    checkUnique(pathIds, "static_suppletive_paths.paths ids");
}

function getStaticNncPossessorInventory(staticOptions = {}) {
    return new Set(asArrayForValidation(staticOptions.possessivePrefixes || [])
        .map((entry) => (isPlainObject(entry) ? String(entry.value || "") : ""))
        .filter(Boolean));
}

function asArrayForValidation(value) {
    return Array.isArray(value) ? value : [];
}

function isNonEmptyValidationString(value) {
    return typeof value === "string" && value.trim() !== "";
}

function collectStaticNncFixtureErrors(staticNnc = {}, staticOptions = {}) {
    const localErrors = [];
    const add = (message) => localErrors.push(message);
    const possessorInventory = getStaticNncPossessorInventory(staticOptions);
    const data = isPlainObject(staticNnc) ? staticNnc : {};
    if (!isPlainObject(staticNnc)) {
        add("data/static_nnc.json must be an object.");
    }
    if (!Array.isArray(data.ordinaryNncFixtures)) {
        add("static_nnc.ordinaryNncFixtures must be an array.");
        return localErrors;
    }
    if (!data.ordinaryNncFixtures.length) {
        add("static_nnc.ordinaryNncFixtures must contain at least one fixture.");
    }

    const fixtureKeys = new Map();
    data.ordinaryNncFixtures.forEach((fixture, index) => {
        const where = `static_nnc.ordinaryNncFixtures[${index}]`;
        if (!isPlainObject(fixture)) {
            add(`${where} must be an object.`);
            return;
        }
        ["id", "stem", "lemma", "nounClass", "animacy"].forEach((field) => {
            if (!isNonEmptyValidationString(fixture[field])) {
                add(`${where}.${field} must be a non-empty string.`);
            } else if (fixture[field] !== fixture[field].trim()) {
                add(`${where}.${field} must not have leading or trailing whitespace.`);
            }
        });
        if (isNonEmptyValidationString(fixture.nounClass) && !STATIC_NNC_ALLOWED_NOUN_CLASSES.has(fixture.nounClass)) {
            add(`${where}.nounClass "${fixture.nounClass}" is not allowed; use t, ti, in, or zero.`);
        }
        if (isNonEmptyValidationString(fixture.animacy) && !STATIC_NNC_ALLOWED_ANIMACIES.has(fixture.animacy)) {
            add(`${where}.animacy "${fixture.animacy}" is not allowed; use animate or inanimate.`);
        }
        const keys = [fixture.id, fixture.stem, fixture.lemma, ...asArrayForValidation(fixture.aliases)]
            .filter((value) => typeof value !== "undefined" && value !== null);
        keys.forEach((key) => {
            if (!isNonEmptyValidationString(key)) {
                add(`${where} fixture keys must be non-empty strings.`);
                return;
            }
            const normalized = key.trim().toLowerCase();
            if (fixtureKeys.has(normalized)) {
                const previousWhere = fixtureKeys.get(normalized);
                if (previousWhere !== where) {
                    add(`${where} fixture key "${key}" duplicates ${previousWhere}.`);
                }
                return;
            }
            fixtureKeys.set(normalized, where);
        });
        if (Object.prototype.hasOwnProperty.call(fixture, "aliases") && !Array.isArray(fixture.aliases)) {
            add(`${where}.aliases must be an array when present.`);
        }
        if (Object.prototype.hasOwnProperty.call(fixture, "sourceRefs")) {
            validateStaticNncStringArray(fixture.sourceRefs, `${where}.sourceRefs`, add);
        }
        if (!isPlainObject(fixture.states)) {
            add(`${where}.states must be an object.`);
            return;
        }
        const stateKeys = Object.keys(fixture.states);
        if (!stateKeys.length) {
            add(`${where}.states must contain at least one state.`);
        }
        stateKeys.forEach((state) => {
            const stateWhere = `${where}.states.${state}`;
            const stateData = fixture.states[state];
            if (!STATIC_NNC_ALLOWED_STATES.has(state)) {
                add(`${stateWhere} state "${state}" is not allowed; use absolutive or possessive.`);
            }
            if (!isPlainObject(stateData)) {
                add(`${stateWhere} must be an object.`);
                return;
            }
            if (state === "possessive") {
                validateStaticNncPossessiveState(stateData, stateWhere, possessorInventory, add);
                return;
            }
            validateStaticNncNumberForms(stateData.numberForms, `${stateWhere}.numberForms`, add);
        });
    });
    return localErrors;
}

function validateStaticNncStringArray(value, where, add) {
    if (!Array.isArray(value)) {
        add(`${where} must be an array.`);
        return [];
    }
    const seen = new Set();
    value.forEach((entry, index) => {
        if (!isNonEmptyValidationString(entry)) {
            add(`${where}[${index}] must be a non-empty string.`);
            return;
        }
        if (seen.has(entry)) {
            add(`${where} contains duplicate values: "${entry}".`);
            return;
        }
        seen.add(entry);
    });
    return value;
}

function validateStaticNncNumberForms(numberForms, where, add) {
    if (!isPlainObject(numberForms)) {
        add(`${where} must be an object.`);
        return;
    }
    Object.entries(numberForms).forEach(([number, cell]) => {
        if (!STATIC_NNC_ALLOWED_NUMBERS.has(number)) {
            add(`${where}.${number} number "${number}" is not allowed; use singular or plural.`);
        }
        validateStaticNncSurfaceCell(cell, `${where}.${number}`, add);
    });
}

function validateStaticNncPossessiveState(stateData, where, possessorInventory, add) {
    if (!isPlainObject(stateData.numberFormsByPossessor)) {
        add(`${where}.numberFormsByPossessor must be an object.`);
        return;
    }
    Object.entries(stateData.numberFormsByPossessor).forEach(([number, possessorMap]) => {
        const numberWhere = `${where}.numberFormsByPossessor.${number}`;
        if (!STATIC_NNC_ALLOWED_NUMBERS.has(number)) {
            add(`${numberWhere} number "${number}" is not allowed; use singular or plural.`);
        }
        if (!isPlainObject(possessorMap)) {
            add(`${numberWhere} must be an object.`);
            return;
        }
        Object.entries(possessorMap).forEach(([possessor, cell]) => {
            if (!possessorInventory.has(possessor)) {
                add(`${numberWhere}.${possessor} possessor "${possessor}" is not in static_options.possessivePrefixes.`);
            }
            validateStaticNncSurfaceCell(cell, `${numberWhere}.${possessor}`, add);
        });
    });
}

function validateStaticNncSurfaceCell(cell, where, add) {
    if (!isPlainObject(cell)) {
        add(`${where} must be an object with surfaceForms.`);
        return;
    }
    validateStaticNncStringArray(cell.surfaceForms, `${where}.surfaceForms`, add);
    if (Object.prototype.hasOwnProperty.call(cell, "possessiveStem")) {
        if (!isNonEmptyValidationString(cell.possessiveStem)) {
            add(`${where}.possessiveStem must be a non-empty string when present.`);
        } else if (cell.possessiveStem !== cell.possessiveStem.trim()) {
            add(`${where}.possessiveStem must not have leading or trailing whitespace.`);
        }
    }
    if (Object.prototype.hasOwnProperty.call(cell, "formsByPluralType")) {
        if (!isPlainObject(cell.formsByPluralType)) {
            add(`${where}.formsByPluralType must be an object.`);
            return;
        }
        Object.entries(cell.formsByPluralType).forEach(([pluralType, pluralTypeCell]) => {
            const pluralTypeWhere = `${where}.formsByPluralType.${pluralType}`;
            if (!STATIC_NNC_ALLOWED_PLURAL_TYPES.has(pluralType)) {
                add(`${pluralTypeWhere} plural type "${pluralType}" is not allowed; use count or distributive.`);
            }
            validateStaticNncSurfaceCell(pluralTypeCell, pluralTypeWhere, add);
        });
    }
}

function checkStaticNncFixtureShape(jsonByName) {
    collectStaticNncFixtureErrors(
        jsonByName["static_nnc.json"],
        jsonByName["static_options.json"]
    ).forEach(addError);
}

function checkValenceNeutralReferences(jsonByName, lexiconVerbSet, allowlist) {
    const valenceNeutral = asObject(jsonByName["static_valence_neutral.json"], "data/static_valence_neutral.json");
    const missingReferences = {};
    Object.entries(valenceNeutral).forEach(([key, config]) => {
        if (!isPlainObject(config)) {
            addError(`static_valence_neutral.${key} must be an object.`);
            return;
        }
        checkStringArray(config.verbs || [], `static_valence_neutral.${key}.verbs`).forEach((verb) => {
            const dashed = verb.startsWith("-") ? verb : `-${verb}`;
            if (!lexiconVerbSet.has(verb) && !lexiconVerbSet.has(dashed)) {
                const refPath = `static_valence_neutral.${key}.verbs`;
                if (!missingReferences[refPath]) {
                    missingReferences[refPath] = [];
                }
                missingReferences[refPath].push(verb);
            }
        });
        checkStringArray(config.suffixes || [], `static_valence_neutral.${key}.suffixes`);
        if (config.allowAdditionalDerivations) {
            checkStringArray(config.allowAdditionalDerivations, `static_valence_neutral.${key}.allowAdditionalDerivations`);
        }
    });
    checkAllowlistedMissingLexiconReferences(
        missingReferences,
        asObject(allowlist.missingLexiconReferences || {}, "grammar_data_allowlist.missingLexiconReferences")
    );
}

function checkAllowlistedMissingLexiconReferences(actualRefs, allowedRefs) {
    const allPaths = new Set([...Object.keys(actualRefs), ...Object.keys(allowedRefs)]);
    allPaths.forEach((refPath) => {
        checkAllowlistedSet(
            actualRefs[refPath] || [],
            asArray(allowedRefs[refPath] || [], `grammar_data_allowlist.missingLexiconReferences.${refPath}`),
            `missingLexiconReferences.${refPath}`
        );
    });
}

function checkParseFixtureShape(jsonByName) {
    ["exact_rules.json", "onset_rules.json", "static_parse_tests.json"].forEach((fileName) => {
        const data = asObject(jsonByName[fileName], `data/${fileName}`);
        if (typeof data.version !== "number") {
            addError(`data/${fileName}.version must be a number.`);
        }
        asArray(data.cases, `${fileName}.cases`).forEach((testCase, index) => {
            if (!isPlainObject(testCase)) {
                addError(`${fileName}.cases[${index}] must be an object.`);
                return;
            }
            if (fileName === "static_parse_tests.json") {
                if (typeof testCase.input !== "string" || !isPlainObject(testCase.expect)) {
                    addError(`${fileName}.cases[${index}] must include string input and object expect.`);
                }
                return;
            }
            if (typeof testCase.name !== "string" || !Array.isArray(testCase.forms)) {
                addError(`${fileName}.cases[${index}] must include string name and forms array.`);
            }
        });
    });
}

function checkLocalizedLabel(value, where) {
    if (!isPlainObject(value)) {
        addError(`${where} must be an object with labelEs/labelNa.`);
        return;
    }
    if (typeof value.labelEs !== "string" || value.labelEs.trim() === "") {
        addError(`${where}.labelEs must be a non-empty string.`);
    }
    if (typeof value.labelNa !== "string" || value.labelNa.trim() === "") {
        addError(`${where}.labelNa must be a non-empty string.`);
    }
}

function checkNoUnknownKeys(object, knownKeys, where) {
    Object.keys(object).forEach((key) => {
        if (!knownKeys.has(key)) {
            addError(`${where} includes unknown key "${key}".`);
        }
    });
}

function checkSameKeySet(leftValues, rightValues, leftName, rightName) {
    const left = new Set(leftValues);
    const right = new Set(rightValues);
    leftValues.forEach((value) => {
        if (!right.has(value)) {
            addError(`${leftName} includes "${value}", but ${rightName} does not.`);
        }
    });
    rightValues.forEach((value) => {
        if (!left.has(value)) {
            addError(`${rightName} includes "${value}", but ${leftName} does not.`);
        }
    });
}

function checkPersonRef(value, where, knownPersonKeys) {
    checkKnownKey(value, knownPersonKeys, where, "personSubLabels");
}

function checkKnownKey(value, knownKeys, where, label) {
    if (typeof value !== "string" || value.trim() === "") {
        addError(`${where} must be a non-empty string.`);
        return;
    }
    if (!knownKeys.has(value)) {
        addError(`${where} references unknown ${label} key "${value}".`);
    }
}

function countAllowlistedExceptions(allowlist) {
    const duplicateLexiconEntries = isPlainObject(allowlist.duplicateLexiconEntries)
        ? Object.values(allowlist.duplicateLexiconEntries)
            .filter(isPlainObject)
            .reduce((sum, entries) => sum + Object.keys(entries).length, 0)
        : 0;
    const crossFileLexiconOverlap = Array.isArray(allowlist.crossFileLexiconOverlap)
        ? allowlist.crossFileLexiconOverlap.length
        : 0;
    const separatorRows = isPlainObject(allowlist.separatorRowCounts)
        ? Object.values(allowlist.separatorRowCounts)
            .reduce((sum, count) => sum + Number(count || 0), 0)
        : 0;
    const missingLexiconReferences = isPlainObject(allowlist.missingLexiconReferences)
        ? Object.values(allowlist.missingLexiconReferences)
            .filter(Array.isArray)
            .reduce((sum, values) => sum + values.length, 0)
        : 0;
    return duplicateLexiconEntries + crossFileLexiconOverlap + separatorRows + missingLexiconReferences;
}

function checkAndrewsTrajectoryDoc() {
    const docPath = path.join(ROOT, "docs", "ANDREWS_TRAJECTORY.md");
    let text = "";
    try {
        text = fs.readFileSync(docPath, "utf8");
    } catch (error) {
        addError(`${rel(docPath)} could not be read: ${error.message}`);
        return;
    }
    [
        "Lessons 1-4",
        "Lessons 5-11",
        "Lessons 12-19",
        "Lessons 20-27",
        "Lessons 28-34",
        "Lessons 35-43",
        "Lessons 44-50",
        "Lessons 51-58",
        "Directing Rule",
        "Redirecting Rule",
        "Plan/Pursue Rule",
        "Correctness Before Existence Rule",
        "Supreme Goal",
        "grammar GIS",
        "Nawat/Pipil may realize spelling through the orthography bridge",
        "does not decide whether Andrews-licensed grammar logic can generate",
        "Patch Judgment Gate",
        "which Andrews waypoint it advances",
        "which LCM boundary it preserves",
        "Preterit indicative remains separate from preterit-derived routes",
    ].forEach((marker) => {
        if (!text.includes(marker)) {
            addError(`docs/ANDREWS_TRAJECTORY.md must include "${marker}".`);
        }
    });
    Array.from({ length: 58 }, (_, index) => index + 1).forEach((lessonId) => {
        if (!text.includes(`Lesson ${lessonId}:`)) {
            addError(`docs/ANDREWS_TRAJECTORY.md must include a Lesson ${lessonId} trajectory row.`);
        }
    });
    if (!/Done Standard/.test(text)) {
        addError("docs/ANDREWS_TRAJECTORY.md must include the Done Standard gate.");
    }
    [
        {
            relPath: "AGENTS.md",
            markers: [
                "Andrews as the grammar-rule authority for engine architecture and generation logic",
                "do not decide whether Andrews-licensed grammar logic can generate",
            ],
        },
        {
            relPath: "docs/CODEX_BOARD.md",
            markers: [
                "Andrews PDF supplies the supreme grammar-rule authority for engine structure and generation logic",
                "do not decide whether Andrews-licensed grammar logic can generate",
            ],
        },
        {
            relPath: "docs/ANDREWS_LAYER_LCM.md",
            markers: [
                "supreme grammar architecture and grammar-logic authority",
                "it does not decide whether Andrews-licensed grammar logic can generate",
                "lack of Nawat/Pipil evidence alone can never downgrade Andrews-licensed logic",
            ],
        },
        {
            relPath: "docs/ANDREWS_PDF_DIGEST.md",
            markers: [
                "Andrews PDF governs grammar architecture and grammar logic",
                "do not decide whether Andrews-licensed grammar logic can generate",
                "Do not block Andrews-licensed grammar logic only because Nawat/Pipil evidence has not confirmed a surface",
            ],
        },
    ].forEach(({ relPath, markers }) => {
        const sourcePath = path.join(ROOT, relPath);
        let sourceText = "";
        try {
            sourceText = fs.readFileSync(sourcePath, "utf8");
        } catch (error) {
            addError(`${relPath} could not be read: ${error.message}`);
            return;
        }
        markers.forEach((marker) => {
            if (!sourceText.includes(marker)) {
                addError(`${relPath} must include "${marker}".`);
            }
        });
    });
}

function checkAndrewsFormalClassSurfaces(jsonByName) {
    const labels = asObject(jsonByName["static_labels.json"], "data/static_labels.json");
    const uiLabels = asObject(labels.uiLabels, "static_labels.uiLabels");
    const groups = asObject(jsonByName["static_groups.json"], "data/static_groups.json");
    const tenseLinguisticGroups = asObject(groups.tenseLinguisticGroups, "static_groups.tenseLinguisticGroups");
    const assertLabel = (key, expected) => {
        const entry = asObject(uiLabels[key], `static_labels.uiLabels.${key}`);
        ["labelEs", "labelNa"].forEach((field) => {
            if (entry[field] !== expected) {
                addError(`static_labels.uiLabels.${key}.${field} must be "${expected}" so visible formal classes stay CNV, CNN, Partícula.`);
            }
        });
    };
    assertLabel("tense-tabs-unit-cnv", "CNV · cláusula verbal");
    assertLabel("tense-tabs-unit-cnn", "CNN · cláusula nominal");
    assertLabel("tense-tabs-unit-particle", "Partícula");
    assertLabel("tense-tabs-mode-verb", "CNV · cláusula verbal");
    assertLabel("tense-tabs-mode-noun", "CNN · cláusula nominal");
    const adjectiveModeLabel = String(uiLabels["tense-tabs-mode-adjective"]?.labelEs || "");
    const adverbModeLabel = String(uiLabels["tense-tabs-mode-adverb"]?.labelEs || "");
    if (/^Funci[oó]n\b/i.test(adjectiveModeLabel) || /^Funci[oó]n\b/i.test(adverbModeLabel)) {
        addError("static_labels tense-tabs-mode-adjective/adverb must not surface as mode/class labels; use subordinate uso labels.");
    }
    ["adjetivo", "adverbio"].forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(tenseLinguisticGroups, key)) {
            addError(`static_groups.tenseLinguisticGroups.${key} must not be a formal class group; route it under CNV or CNN.`);
        }
    });
    const groupText = JSON.stringify(groups);
    ["CNV en función adjetival", "CNN en función adjetival", "CNV en función adverbial"].forEach((label) => {
        if (groupText.includes(label)) {
            addError(`static_groups must not keep legacy #2 formula group "${label}"; function use belongs outside the formula tabs.`);
        }
    });
}

function collectVisibleUiSpanishSurfaceErrors(options = {}) {
    const errorsFound = [];
    const htmlPath = path.join(ROOT, "index.html");
    const labelsPath = path.join(DATA_DIR, "static_labels.json");
    const modesPath = path.join(DATA_DIR, "static_modes.json");
    const optionsPath = path.join(DATA_DIR, "static_options.json");
    const renderingPath = path.join(ROOT, "src", "ui", "rendering", "rendering.js");
    const composerPath = path.join(ROOT, "src", "ui", "composer", "composer.js");
    const exportPath = path.join(ROOT, "src", "ui", "export", "export.js");
    const eventsPath = path.join(ROOT, "src", "ui", "events.js");
    const statePath = path.join(ROOT, "src", "ui", "state.js");
    const hasOption = (key) => Object.prototype.hasOwnProperty.call(options, key);
    let html = "";
    let staticLabels = null;
    let staticModes = null;
    let staticOptions = null;
    let renderingSource = "";
    let composerSource = "";
    let exportSource = "";
    let eventsSource = "";
    let stateSource = "";
    const loadJsonFromOptionOrFile = (optionKey, filePath, displayName) => {
        if (hasOption(optionKey)) {
            if (typeof options[optionKey] === "string") {
                try {
                    return { value: JSON.parse(options[optionKey]), error: "" };
                } catch (error) {
                    return { value: null, error: `${displayName} override could not be parsed as JSON.` };
                }
            }
            return { value: options[optionKey], error: "" };
        }
        try {
            return { value: JSON.parse(fs.readFileSync(filePath, "utf8")), error: "" };
        } catch (error) {
            return { value: null, error: `${rel(filePath)} could not be parsed as JSON: ${error.message}` };
        }
    };
    if (hasOption("html")) {
        html = String(options.html || "");
    } else {
        try {
            html = fs.readFileSync(htmlPath, "utf8");
        } catch (error) {
            return [`${rel(htmlPath)} could not be read: ${error.message}`];
        }
    }
    const loadedLabels = loadJsonFromOptionOrFile("staticLabels", labelsPath, "staticLabels");
    const loadedModes = loadJsonFromOptionOrFile("staticModes", modesPath, "staticModes");
    const loadedOptions = loadJsonFromOptionOrFile("staticOptions", optionsPath, "staticOptions");
    const jsonLoadError = [loadedLabels.error, loadedModes.error, loadedOptions.error].filter(Boolean)[0] || "";
    if (jsonLoadError) {
        return [jsonLoadError];
    }
    staticLabels = loadedLabels.value;
    staticModes = loadedModes.value;
    staticOptions = loadedOptions.value;
    if (hasOption("renderingSource")) {
        renderingSource = String(options.renderingSource || "");
    } else {
        try {
            renderingSource = fs.readFileSync(renderingPath, "utf8");
        } catch (error) {
            return [`${rel(renderingPath)} could not be read: ${error.message}`];
        }
    }
    if (hasOption("composerSource")) {
        composerSource = String(options.composerSource || "");
    } else {
        try {
            composerSource = fs.readFileSync(composerPath, "utf8");
        } catch (error) {
            return [`${rel(composerPath)} could not be read: ${error.message}`];
        }
    }
    if (hasOption("exportSource")) {
        exportSource = String(options.exportSource || "");
    } else {
        try {
            exportSource = fs.readFileSync(exportPath, "utf8");
        } catch (error) {
            return [`${rel(exportPath)} could not be read: ${error.message}`];
        }
    }
    if (hasOption("eventsSource")) {
        eventsSource = String(options.eventsSource || "");
    } else {
        try {
            eventsSource = fs.readFileSync(eventsPath, "utf8");
        } catch (error) {
            return [`${rel(eventsPath)} could not be read: ${error.message}`];
        }
    }
    if (hasOption("stateSource")) {
        stateSource = String(options.stateSource || "");
    } else {
        try {
            stateSource = fs.readFileSync(statePath, "utf8");
        } catch (error) {
            return [`${rel(statePath)} could not be read: ${error.message}`];
        }
    }
    const visibleHtmlText = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const visibleHtmlAttributes = [];
    html.replace(/\s(?:aria-label|title|placeholder|alt)="([^"]*)"/gi, (_match, value) => {
        visibleHtmlAttributes.push(value);
        return "";
    });
    const collectVisibleSpanishLabels = (value, values = []) => {
        if (!value || typeof value !== "object") {
            return values;
        }
        Object.entries(value).forEach(([key, entry]) => {
            if ((key === "labelEs" || key === "es") && typeof entry === "string") {
                values.push(entry);
                return;
            }
            collectVisibleSpanishLabels(entry, values);
        });
        return values;
    };
    const visibleUiChecks = [
        ["index.html visible text", visibleHtmlText],
        ["index.html visible attributes", visibleHtmlAttributes.join(" ")],
        ["data/static_labels.json Spanish labels", collectVisibleSpanishLabels(staticLabels).join(" ")],
        ["data/static_modes.json Spanish labels", collectVisibleSpanishLabels(staticModes).join(" ")],
        ["data/static_options.json Spanish labels", collectVisibleSpanishLabels(staticOptions).join(" ")],
    ];
    visibleUiChecks.forEach(([where, text]) => {
        if (/Unidad y función|Unit(?:\s+and|\s*&)?\s+Function/i.test(text)) {
            errorsFound.push(`${where} must not use the obsolete Unidad y función / Unit and Function label.`);
        }
        if (/\bRegex\s+Dev\b|\bDev\b/.test(text)) {
            errorsFound.push(`${where} must not expose developer shorthand; use Spanish visible labels.`);
        }
        if (/\bRule\b|\bCopyright\b/.test(text)) {
            errorsFound.push(`${where} must not expose English utility labels; use Spanish visible labels.`);
        }
        if (/\bSTEM\b|\bSlot\b|\bSlots\b|\bTip\b|Tamaño UI|\bUI\b|\bACT\b|\bNO\s+ACT\b|\bdir\b|\binc\b|\bN>V\b|CSV vista|\bCSV\b|\bVI\b|\bVT\b|\bVB\b|Incorp\.|Obj\.|Valencia CNV|Tablero CNV|CNN\/N|fuente N\b|Tipo de CN|no genera VNC\/CNN|Adj VNC|Adj NNC|NNC abs|NNC raiz|tronco NNC|Cláusula nuclear CNN|Relacional NNC|Objetivos Andrews NNC\/VNC|Solicitudes VNC Andrews|Clases VNC Andrews|Avisos Andrews VNC|Notas Andrews VNC|Entradas VNC Andrews|Fuente Andrews: NNC|Evidencia: salida NNC|valencia VNC|objeto 1 CNV|derivacion VNC|compuesto VNC/.test(text)) {
            errorsFound.push(`${where} must not expose English or non-formula shorthand; use Spanish visible labels.`);
        }
        if (/\bLCM\b/.test(text)) {
            errorsFound.push(`${where} must not expose LCM shorthand; use contrato in visible UI.`);
        }
        if (/\bregex\b/i.test(text)) {
            errorsFound.push(`${where} must not expose Regex; use patrón or expresión regular in visible UI.`);
        }
        if (/\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b/.test(text)) {
            errorsFound.push(`${where} must use Spanish visible grammar labels instead of English grammar labels.`);
        }
        if (/\btns\b/i.test(text)) {
            errorsFound.push(`${where} must not expose tns; use tiempo in visible UI and compact formula text.`);
        }
    });
    const visibleStateMessages = [];
    stateSource.replace(/\bmessage:\s*(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g, (_match, _quote, value) => {
        visibleStateMessages.push(value);
        return "";
    });
    visibleStateMessages.forEach((message, index) => {
        if (/\b(?:NNC|VNC|verbstem|nounstem|nounroot|possessive-state|absolutive-state)\b/.test(message)) {
            errorsFound.push(`src/ui/state.js visible message ${index + 1} must use Spanish grammar labels instead of non-formula shorthand.`);
        }
        if (/\b(?:requires|generated|attaches|uses|must use|cannot generate|could not be generated)\b/i.test(message)) {
            errorsFound.push(`src/ui/state.js visible message ${index + 1} must use Spanish diagnostic text.`);
        }
    });
    [
        ["entry board verbal single-letter tab", /data-composer-entry-board="general"[\s\S]*?>\s*V\s*<\/button>/],
        ["entry board nominal single-letter tab", /data-ordinary-nnc-mode="true"[\s\S]*?>\s*N\s*<\/button>/],
        ["formal-class CNV visible button", />\s*CNV\s*<\/button>/],
        ["formal-class CNN visible button", />\s*CNN\s*<\/button>/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(html)) {
            errorsFound.push(`index.html ${label} must use full Spanish visible labels outside formula text.`);
        }
    });
    [
        "function formatVisibleLcmStatusLabel",
        "function formatVisibleLcmRoutePartLabel",
        "function formatVisibleLcmLayerLabel",
        "function formatVisibleLcmDiagnosticLabel",
    ].forEach((marker) => {
        if (!renderingSource.includes(marker)) {
            errorsFound.push(`src/ui/rendering/rendering.js must keep ${marker}() for dynamic Spanish contract labels.`);
        }
    });
    [
        ["dynamic visible LCM status label", /labels\.push\(`Estado LCM:/],
        ["dynamic visible LCM route label", /labels\.push\(`Ruta LCM:/],
        ["dynamic visible LCM generation label", /labels\.push\(["'`]Generaci[oó]n LCM:/],
        ["dynamic LCM evidence label", /labels\.push\(`Evidencia: \$\{evidenceStatus\}`\)/],
        ["dynamic LCM realization label", /labels\.push\(`Realizacion Nawat:|labels\.push\("Realizacion Nawat:/],
        ["dynamic visible LCM failure label", /labels\.push\(`Falla LCM:/],
        ["dynamic visible LCM diagnostic label", /labels\.push\(`Diagn[oó]stico LCM:/],
        ["dynamic Lesson 2 position detail", /position \? `posicion:/],
        ["dynamic sentence polarity raw value", /Negaci[oó]n: \$\{polarity\}/],
        ["dynamic sentence question raw value", /Pregunta: \$\{question\}/],
        ["dynamic sentence emphasis raw value", /[ÉE]nfasis: \$\{emphasis\}/],
        ["dynamic sentence mood raw value", /Modo oracional: \$\{mood\}/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(renderingSource)) {
            errorsFound.push(`src/ui/rendering/rendering.js ${label} must use Spanish visible text and translated LCM metadata.`);
        }
    });
    if (!renderingSource.includes("function formatVisibleSentenceLayerSlotValue")) {
        errorsFound.push("src/ui/rendering/rendering.js must translate sentence-layer metadata values before visible UI rendering.");
    }
    [
        ["export visible LCM header", /["'`][^"'`]*\bLCM\b[^"'`]*["'`]/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(exportSource)) {
            errorsFound.push(`src/ui/export/export.js ${label} must use Spanish contract labels.`);
        }
    });
    [
        ["dynamic pattern guidance", /["'`]Regex:\s/],
        ["dynamic regex guide label", /["'`]Guía regex/],
        ["dynamic active regex label", /["'`]Regex activo/],
        ["dynamic regex reading title", /["'`]Cómo leer el regex/],
        ["dynamic visible regex prose", /["'`]El regex visible/],
        ["dynamic non-formula STEM label", /["'`](?:Predicado|Fuente N) \(STEM\)|["'`]STEM["'`]|Sílabas detectadas \(STEM\)/],
        ["dynamic English note label", /label:\s*["'`]Tip["'`]/],
        ["dynamic non-formula route shorthand", /["'`]N>V|N>V\s+\$\{|->\s*dir\b|\bdir en posición|\bobj1\/obj2\b|Valencia CNV|CNN\/N|CNV:\s+tablero|fuente N\b|Tipo de CN|habilitar ANS|COP ·|DEL ·|CE ·|AC ·|["'`]N["'`]/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(composerSource)) {
            errorsFound.push(`src/ui/composer/composer.js ${label} must use Spanish visible labels.`);
        }
    });
    [
        ["dynamic English slot title", /["'`]Slots y referencia["'`]/],
        ["dynamic UI shorthand", /["'`]control de ruta UI["'`]/],
        ["dynamic non-formula denominal valence shorthand", /["'`](?:VI|VT|VB)(?:\s|-)/],
        ["dynamic non-formula clause shorthand", /["'`](?:Adj VNC|Adj NNC|NNC abs|NNC raiz|tronco NNC|Cláusula nuclear CNN|Relacional NNC|Objetivos Andrews NNC\/VNC|Solicitudes VNC Andrews|Clases VNC Andrews|Avisos Andrews VNC|Notas Andrews VNC|Entradas VNC Andrews|Fuente Andrews: NNC|Evidencia: salida NNC|valencia VNC|objeto 1 CNV|derivacion VNC|compuesto VNC|#3 salida VNC|#3 salida NNC|VNC en funcion adjetival|NNC .*funcion adjetival|no crea tronco NNC)/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(renderingSource)) {
            errorsFound.push(`src/ui/rendering/rendering.js ${label} must use Spanish visible labels.`);
        }
    });
    [
        ["dynamic particle route shorthand", /["'`]Partícula · diagnóstico Andrews; no genera VNC\/CNN\./],
    ].forEach(([label, pattern]) => {
        if (pattern.test(stateSource)) {
            errorsFound.push(`src/ui/state.js ${label} must use Spanish visible labels.`);
        }
    });
    [
        ["inline composer STEM marker", /content:\s*["'`]\(STEM\)["'`]/],
        ["inline composer non-formula valence shorthand", /Elemento incorporado\s+(?:VI|VT|VB)|["'`]Incorp\.["'`]|["'`]Obj\.["'`]/],
    ].forEach(([label, pattern]) => {
        if (pattern.test(eventsSource)) {
            errorsFound.push(`src/ui/events.js ${label} must use Spanish visible labels.`);
        }
    });
    return errorsFound;
}

function checkVisibleUiSpanishSurface() {
    collectVisibleUiSpanishSurfaceErrors().forEach(addError);
}

function checkAndrewsTrajectoryRegistry() {
    const lessonRegistry = loadScriptConst("src/lessons/registry.js", "LESSON_REGISTRY");
    const lessonRegistryMjs = loadScriptConst("src/lessons/registry.mjs", "LESSON_REGISTRY");
    const redirectActions = loadScriptConst("src/lessons/registry.js", "ANDREWS_TRAJECTORY_REDIRECT_ACTIONS");
    const redirectActionsMjs = loadScriptConst("src/lessons/registry.mjs", "ANDREWS_TRAJECTORY_REDIRECT_ACTIONS");
    const trajectoryGroups = loadScriptConst("src/lessons/registry.js", "ANDREWS_TRAJECTORY_GROUPS");
    const trajectoryGroupsMjs = loadScriptConst("src/lessons/registry.mjs", "ANDREWS_TRAJECTORY_GROUPS");
    const aimStatuses = loadScriptConst("src/lessons/registry.js", "ANDREWS_PLAN_PURSUIT_AIM_STATUSES");
    const aimStatusesMjs = loadScriptConst("src/lessons/registry.mjs", "ANDREWS_PLAN_PURSUIT_AIM_STATUSES");
    const arrowResults = loadScriptConst("src/lessons/registry.js", "ANDREWS_PLAN_PURSUIT_ARROW_RESULTS");
    const arrowResultsMjs = loadScriptConst("src/lessons/registry.mjs", "ANDREWS_PLAN_PURSUIT_ARROW_RESULTS");
    if (
        !Array.isArray(lessonRegistry)
        || !Array.isArray(lessonRegistryMjs)
        || !Array.isArray(redirectActions)
        || !Array.isArray(redirectActionsMjs)
        || !Array.isArray(trajectoryGroups)
        || !Array.isArray(trajectoryGroupsMjs)
        || !Array.isArray(aimStatuses)
        || !Array.isArray(aimStatusesMjs)
        || !Array.isArray(arrowResults)
        || !Array.isArray(arrowResultsMjs)
    ) {
        addError("Lesson registry trajectory metadata could not be loaded.");
        return;
    }
    [
        ["LESSON_REGISTRY", lessonRegistryMjs, lessonRegistry],
        ["ANDREWS_TRAJECTORY_REDIRECT_ACTIONS", redirectActionsMjs, redirectActions],
        ["ANDREWS_TRAJECTORY_GROUPS", trajectoryGroupsMjs, trajectoryGroups],
        ["ANDREWS_PLAN_PURSUIT_AIM_STATUSES", aimStatusesMjs, aimStatuses],
        ["ANDREWS_PLAN_PURSUIT_ARROW_RESULTS", arrowResultsMjs, arrowResults],
    ].forEach(([label, mjsValue, jsValue]) => {
        if (JSON.stringify(mjsValue) !== JSON.stringify(jsValue)) {
            addError(`src/lessons/registry.mjs ${label} must match src/lessons/registry.js.`);
        }
    });

    const expectedActions = [
        "keep",
        "rename-visible-ui",
        "reframe-metadata",
        "diagnostic-only",
        "block-generation",
        "refactor-engine",
        "source-gated",
    ];
    if (redirectActions.join("\u0000") !== expectedActions.join("\u0000")) {
        addError(`src/lessons/registry.js redirect actions must be exactly: ${expectedActions.join(", ")}.`);
    }
    if (trajectoryGroups.length !== 8) {
        addError("src/lessons/registry.js must define the eight Andrews trajectory lesson groups.");
    }
    [
        ["Lecciones 1-4", [1, 4]],
        ["Lecciones 5-11", [5, 11]],
        ["Lecciones 12-19", [12, 19]],
        ["Lecciones 20-27", [20, 27]],
        ["Lecciones 28-34", [28, 34]],
        ["Lecciones 35-43", [35, 43]],
        ["Lecciones 44-50", [44, 50]],
        ["Lecciones 51-58", [51, 58]],
    ].forEach(([label, range], index) => {
        const group = trajectoryGroups[index] || {};
        if (group.label !== label || JSON.stringify(group.range) !== JSON.stringify(range)) {
            addError(`src/lessons/registry.js trajectory group ${index + 1} must be ${label} ${range.join("-")}.`);
        }
    });
    const expectedAimStatuses = ["queued", "shooting", "blocked", "closest-pass"];
    if (aimStatuses.join("\u0000") !== expectedAimStatuses.join("\u0000")) {
        addError(`src/lessons/registry.js aim statuses must be exactly: ${expectedAimStatuses.join(", ")}.`);
    }
    const expectedArrowResults = ["hit", "miss"];
    if (arrowResults.join("\u0000") !== expectedArrowResults.join("\u0000")) {
        addError(`src/lessons/registry.js arrow results must be exactly: ${expectedArrowResults.join(", ")}.`);
    }

    const allowedActions = new Set(expectedActions);
    const allowedAimStatuses = new Set(expectedAimStatuses);
    const allowedArrowResults = new Set(expectedArrowResults);
    const allowedStates = new Set(["implemented-audited", "partial", "unmapped", "placeholder"]);
    const expectedKeys = new Set([
        "pdfRefs",
        "directive",
        "implementationState",
        "redirectAction",
        "evidenceStatus",
        "orthographyStatus",
        "validationRefs",
        "stepNumber",
        "aimStatus",
        "plannedArrows",
        "firedArrows",
        "hitCount",
        "missCount",
        "remainingGap",
        "closestPass",
        "sourceGatedRoute",
    ]);

    function checkArrowRefs(arrow, where, feedbackKey) {
        const andrewsRefs = checkStringArray(arrow.andrewsRefs, `${where}.andrewsRefs`);
        const feedbackRefs = checkStringArray(arrow[feedbackKey], `${where}.${feedbackKey}`);
        if (!andrewsRefs.some((ref) => /^Andrews Lesson /.test(ref))) {
            addError(`${where}.andrewsRefs must include Andrews lesson evidence.`);
        }
        if (!feedbackRefs.some((ref) => /^src\/tests\/|^scripts\/|^docs\//.test(ref))) {
            addError(`${where}.${feedbackKey} must include a test, script, or doc feedback reference.`);
        }
        feedbackRefs.forEach((ref) => {
            if (/^(src\/tests\/|scripts\/|docs\/)/.test(ref) && !fs.existsSync(path.join(ROOT, ref))) {
                addError(`${where}.${feedbackKey} references missing repo path "${ref}".`);
            }
        });
    }

    function carriesPlanPursueCorrectnessProbe(text) {
        return /Correcci[oó]n antes de existencia/.test(text)
            && /ruta de entrada a salida/.test(text)
            && /comportamiento/.test(text)
            && /existencia/.test(text)
            && /sonda de fallo/.test(text);
    }

    function checkPuzzleStackTemplate(route, where) {
        const template = asObject(route.puzzleStackTemplate, `${where}.puzzleStackTemplate`);
        if (template.kind !== "andrews-route-puzzle-stack-template") {
            addError(`${where}.puzzleStackTemplate.kind must identify a PuzzleStack template.`);
        }
        if (template.model !== "entrada-formula-salida") {
            addError(`${where}.puzzleStackTemplate.model must be entrada-formula-salida.`);
        }
        if (template.userBuildable !== true) {
            addError(`${where}.puzzleStackTemplate.userBuildable must be true.`);
        }
        if (template.routeKind !== route.routeKind) {
            addError(`${where}.puzzleStackTemplate.routeKind must match the route kind.`);
        }
        if (typeof template.profileKind !== "string" || template.profileKind.trim() === "") {
            addError(`${where}.puzzleStackTemplate.profileKind must identify the PuzzleStack profile.`);
        }
        if (template.profileKind === "source-gated-scaffold") {
            addError(`${where}.puzzleStackTemplate.profileKind must use a route-family profile, not the fallback scaffold.`);
        }
        [
            "exact-clause-relation-route",
            "exact-denominal-route",
            "exact-derivational-boundary-route",
            "exact-diagnostic-analysis-route",
            "exact-foundation-formula-route",
            "exact-foundation-metadata-route",
            "exact-nnc-function-route",
            "exact-nominalization-route",
            "exact-vnc-source-route",
        ].forEach((broadProfileKind) => {
            if (template.profileKind === broadProfileKind) {
                addError(`${where}.puzzleStackTemplate.profileKind must not use broad catch-all profile ${broadProfileKind}.`);
            }
        });
        const steps = asArray(template.steps, `${where}.puzzleStackTemplate.steps`);
        if (steps.length < 3) {
            addError(`${where}.puzzleStackTemplate.steps must include at least entrada, formula, and salida steps.`);
        }
        const stages = new Set();
        steps.forEach((step, stepIndex) => {
            const stepWhere = `${where}.puzzleStackTemplate.steps[${stepIndex}]`;
            const stepObject = asObject(step, stepWhere);
            ["stage", "piece", "label", "formula", "note"].forEach((key) => {
                if (typeof stepObject[key] !== "string" || stepObject[key].trim() === "") {
                    addError(`${stepWhere}.${key} must be a non-empty string.`);
                }
            });
            if (typeof stepObject.stage === "string") {
                stages.add(stepObject.stage);
            }
        });
        ["#1 entrada", "#2 formula", "#3 salida"].forEach((stage) => {
            if (!stages.has(stage)) {
                addError(`${where}.puzzleStackTemplate.steps must include ${stage}.`);
            }
        });
        if (steps[0]?.stage !== "#1 entrada") {
            addError(`${where}.puzzleStackTemplate first step must start at #1 entrada.`);
        }
        if (steps[steps.length - 1]?.stage !== "#3 salida") {
            addError(`${where}.puzzleStackTemplate final step must end at #3 salida.`);
        }
        if (template.actionModel !== undefined || template.actions !== undefined) {
            if (template.actionModel !== "ordered-selectable-piece-transform") {
                addError(`${where}.puzzleStackTemplate.actionModel must be ordered-selectable-piece-transform when actions are present.`);
            }
            const actions = asArray(template.actions, `${where}.puzzleStackTemplate.actions`);
            if (!actions.length) {
                addError(`${where}.puzzleStackTemplate.actions must not be empty when actionModel is present.`);
            }
            let previousOutput = steps[0]?.formula;
            actions.forEach((action, actionIndex) => {
                const actionWhere = `${where}.puzzleStackTemplate.actions[${actionIndex}]`;
                const actionObject = asObject(action, actionWhere);
                ["stage", "inputFormula", "selectablePiece", "operation", "outputFormula", "note"].forEach((key) => {
                    if (typeof actionObject[key] !== "string" || actionObject[key].trim() === "") {
                        addError(`${actionWhere}.${key} must be a non-empty string.`);
                    }
                });
                if (actionObject.inputFormula !== previousOutput) {
                    addError(`${actionWhere}.inputFormula must equal the previous PuzzleStack output formula.`);
                }
                previousOutput = actionObject.outputFormula;
            });
            if (previousOutput !== steps[steps.length - 1]?.formula) {
                addError(`${where}.puzzleStackTemplate.actions final outputFormula must equal the final PuzzleStack salida formula.`);
            }
        }
        if (template.buildModel !== undefined || template.conjugatorEntradas !== undefined) {
            if (template.buildModel !== "single-entrada-conjugator-orchestration") {
                addError(`${where}.puzzleStackTemplate.buildModel must be single-entrada-conjugator-orchestration when conjugatorEntradas are present.`);
            }
            const conjugatorEntradas = asObject(template.conjugatorEntradas, `${where}.puzzleStackTemplate.conjugatorEntradas`);
            if (conjugatorEntradas.activeSlotPolicy !== "one-source-at-a-time") {
                addError(`${where}.puzzleStackTemplate.conjugatorEntradas.activeSlotPolicy must be one-source-at-a-time.`);
            }
            const runs = asArray(conjugatorEntradas.runs, `${where}.puzzleStackTemplate.conjugatorEntradas.runs`);
            if (!runs.length) {
                addError(`${where}.puzzleStackTemplate.conjugatorEntradas.runs must not be empty.`);
            }
            runs.forEach((run, runIndex) => {
                const runWhere = `${where}.puzzleStackTemplate.conjugatorEntradas.runs[${runIndex}]`;
                const runObject = asObject(run, runWhere);
                ["id", "stage", "activeEntrada", "process", "contributes", "output", "note"].forEach((key) => {
                    if (typeof runObject[key] !== "string" || runObject[key].trim() === "") {
                        addError(`${runWhere}.${key} must be a non-empty string.`);
                    }
                });
                const internalPath = asArray(runObject.internalPath, `${runWhere}.internalPath`);
                if (!internalPath.length) {
                    addError(`${runWhere}.internalPath must record the Conjugator processing path.`);
                }
                internalPath.forEach((entry, entryIndex) => {
                    if (typeof entry !== "string" || entry.trim() === "") {
                        addError(`${runWhere}.internalPath[${entryIndex}] must be a non-empty string.`);
                    }
                });
            });
        }
    }

    lessonRegistry.forEach((lesson, index) => {
        const where = `src/lessons/registry.js lesson ${lesson.id}.trajectory`;
        const trajectory = asObject(lesson.trajectory, where);
        checkNoUnknownKeys(trajectory, expectedKeys, where);
        const pdfRefs = checkStringArray(trajectory.pdfRefs, `${where}.pdfRefs`);
        const validationRefs = checkStringArray(trajectory.validationRefs, `${where}.validationRefs`);
        const plannedArrows = asArray(trajectory.plannedArrows, `${where}.plannedArrows`);
        const firedArrows = asArray(trajectory.firedArrows, `${where}.firedArrows`);
        const lessonRefPattern = new RegExp(`^Andrews Lesson ${lesson.id}(\\b|\\.)`);
        if (trajectory.stepNumber !== lesson.id || trajectory.stepNumber !== index + 1) {
            addError(`${where}.stepNumber must keep lessons as ordered steps 1-58.`);
        }
        if (!pdfRefs.some((ref) => lessonRefPattern.test(ref))) {
            addError(`${where}.pdfRefs must include a direct Andrews Lesson ${lesson.id} reference.`);
        }
        validationRefs.forEach((ref) => {
            if (!/^(src\/tests\/|scripts\/|docs\/)/.test(ref)) {
                addError(`${where}.validationRefs must use a repo-local test, script, or doc path.`);
            } else if (!fs.existsSync(path.join(ROOT, ref))) {
                addError(`${where}.validationRefs references missing repo path "${ref}".`);
            }
        });
        if (typeof trajectory.directive !== "string" || !/Andrews/.test(trajectory.directive)) {
            addError(`${where}.directive must state the Andrews-directed grammar rule.`);
        }
        if (!allowedStates.has(trajectory.implementationState)) {
            addError(`${where}.implementationState has unknown state "${trajectory.implementationState}".`);
        }
        if (!allowedActions.has(trajectory.redirectAction)) {
            addError(`${where}.redirectAction has unknown action "${trajectory.redirectAction}".`);
        }
        if (!allowedAimStatuses.has(trajectory.aimStatus)) {
            addError(`${where}.aimStatus has unknown status "${trajectory.aimStatus}".`);
        }
        if (typeof trajectory.evidenceStatus !== "string" || trajectory.evidenceStatus.trim() === "") {
            addError(`${where}.evidenceStatus must be a non-empty string.`);
        }
        if (typeof trajectory.orthographyStatus !== "string" || trajectory.orthographyStatus.trim() === "") {
            addError(`${where}.orthographyStatus must be a non-empty string.`);
        }
        if (typeof trajectory.remainingGap !== "string" || trajectory.remainingGap.trim() === "") {
            addError(`${where}.remainingGap must be a non-empty string.`);
        }
        const sourceGatedRoute = asObject(trajectory.sourceGatedRoute, `${where}.sourceGatedRoute`);
        if (sourceGatedRoute.kind !== "andrews-lesson-source-gated-route-contract") {
            addError(`${where}.sourceGatedRoute.kind must identify the Andrews source-gated route contract.`);
        }
        if (sourceGatedRoute.id !== `lesson-${lesson.id}-source-gated-route`) {
            addError(`${where}.sourceGatedRoute.id must be lesson-scoped.`);
        }
        [
            "routeFamily",
            "routeKind",
            "sourceUnit",
            "targetUnit",
            "sourceFormulaType",
            "targetFormulaType",
            "formulaTransition",
            "formulaTemplate",
            "operation",
        ].forEach((key) => {
            if (typeof sourceGatedRoute[key] !== "string" || sourceGatedRoute[key].trim() === "") {
                addError(`${where}.sourceGatedRoute.${key} must be a non-empty string.`);
            }
        });
        checkStringArray(sourceGatedRoute.andrewsRefs, `${where}.sourceGatedRoute.andrewsRefs`);
        const routeStructuralInfo = asObject(sourceGatedRoute.structuralInfo, `${where}.sourceGatedRoute.structuralInfo`);
        if (routeStructuralInfo.lesson !== lesson.id) {
            addError(`${where}.sourceGatedRoute.structuralInfo.lesson must match the lesson id.`);
        }
        if (routeStructuralInfo.logicPathType !== "source-gated derivational route") {
            addError(`${where}.sourceGatedRoute.structuralInfo.logicPathType must identify a source-gated derivational route.`);
        }
        const routeSourceGate = asObject(sourceGatedRoute.sourceGate, `${where}.sourceGatedRoute.sourceGate`);
        if (routeSourceGate.gated !== true) {
            addError(`${where}.sourceGatedRoute.sourceGate.gated must be true.`);
        }
        if (typeof routeSourceGate.status !== "string" || routeSourceGate.status.trim() === "") {
            addError(`${where}.sourceGatedRoute.sourceGate.status must be a non-empty string.`);
        }
        if (!checkStringArray(routeSourceGate.requirementIds, `${where}.sourceGatedRoute.sourceGate.requirementIds`).length) {
            addError(`${where}.sourceGatedRoute.sourceGate.requirementIds must not be empty.`);
        }
        checkPuzzleStackTemplate(sourceGatedRoute, `${where}.sourceGatedRoute`);
        const subsectionRoutes = asArray(sourceGatedRoute.subsectionRoutes, `${where}.sourceGatedRoute.subsectionRoutes`);
        if (sourceGatedRoute.subsectionRouteCount !== subsectionRoutes.length || subsectionRoutes.length === 0) {
            addError(`${where}.sourceGatedRoute.subsectionRouteCount must match a non-empty subsection route list.`);
        }
        const expectedInternalRouteCount = subsectionRoutes.reduce((count, subsectionRoute) => (
            count + (Array.isArray(subsectionRoute?.internalRoutes) ? subsectionRoute.internalRoutes.length : 0)
        ), 0);
        if (sourceGatedRoute.internalRouteCount !== expectedInternalRouteCount) {
            addError(`${where}.sourceGatedRoute.internalRouteCount must match nested internal routes.`);
        }
        subsectionRoutes.forEach((subsectionRoute, routeIndex) => {
            const routeWhere = `${where}.sourceGatedRoute.subsectionRoutes[${routeIndex}]`;
            const route = asObject(subsectionRoute, routeWhere);
            if (route.kind !== "andrews-subsection-source-gated-route-contract") {
                addError(`${routeWhere}.kind must identify a subsection source-gated route contract.`);
            }
            if (route.parentRouteId !== sourceGatedRoute.id) {
                addError(`${routeWhere}.parentRouteId must point at the lesson source-gated route.`);
            }
            [
                "routeFamily",
                "routeKind",
                "sourceUnit",
                "targetUnit",
                "sourceFormulaType",
                "targetFormulaType",
                "formulaTransition",
                "formulaTemplate",
                "operation",
            ].forEach((key) => {
                if (typeof route[key] !== "string" || route[key].trim() === "") {
                    addError(`${routeWhere}.${key} must be a non-empty string.`);
                }
            });
            checkStringArray(route.andrewsRefs, `${routeWhere}.andrewsRefs`);
            const subsectionStructuralInfo = asObject(route.structuralInfo, `${routeWhere}.structuralInfo`);
            if (subsectionStructuralInfo.lesson !== lesson.id || subsectionStructuralInfo.routeScope !== "andrews-section") {
                addError(`${routeWhere}.structuralInfo must identify the Andrews lesson section route.`);
            }
            if (subsectionStructuralInfo.logicPathType !== "source-gated derivational route") {
                addError(`${routeWhere}.structuralInfo.logicPathType must identify a source-gated derivational route.`);
            }
            const subsectionSourceGate = asObject(route.sourceGate, `${routeWhere}.sourceGate`);
            if (subsectionSourceGate.gated !== true || typeof subsectionSourceGate.status !== "string") {
                addError(`${routeWhere}.sourceGate must be gated with a status.`);
            }
            if (!checkStringArray(subsectionSourceGate.requirementIds, `${routeWhere}.sourceGate.requirementIds`).includes("andrews-section-source")) {
                addError(`${routeWhere}.sourceGate.requirementIds must include andrews-section-source.`);
            }
            checkPuzzleStackTemplate(route, routeWhere);
            const internalRoutes = asArray(route.internalRoutes, `${routeWhere}.internalRoutes`);
            if (route.internalRouteCount !== internalRoutes.length) {
                addError(`${routeWhere}.internalRouteCount must match internalRoutes length.`);
            }
            internalRoutes.forEach((internalRoute, internalIndex) => {
                const internalWhere = `${routeWhere}.internalRoutes[${internalIndex}]`;
                const internal = asObject(internalRoute, internalWhere);
                if (internal.kind !== "andrews-internal-subsection-source-gated-route-contract") {
                    addError(`${internalWhere}.kind must identify an internal subsection route contract.`);
                }
                if (internal.parentRouteId !== route.id) {
                    addError(`${internalWhere}.parentRouteId must point at the subsection route.`);
                }
                [
                    "routeFamily",
                    "routeKind",
                    "sourceUnit",
                    "targetUnit",
                    "sourceFormulaType",
                    "targetFormulaType",
                    "formulaTransition",
                    "formulaTemplate",
                    "operation",
                ].forEach((key) => {
                    if (typeof internal[key] !== "string" || internal[key].trim() === "") {
                        addError(`${internalWhere}.${key} must be a non-empty string.`);
                    }
                });
                checkStringArray(internal.andrewsRefs, `${internalWhere}.andrewsRefs`);
                const internalStructuralInfo = asObject(internal.structuralInfo, `${internalWhere}.structuralInfo`);
                if (
                    internalStructuralInfo.lesson !== lesson.id
                    || internalStructuralInfo.routeScope !== "andrews-internal-subsection"
                    || typeof internalStructuralInfo.internalSubsection !== "string"
                    || internalStructuralInfo.internalSubsection.trim() === ""
                ) {
                    addError(`${internalWhere}.structuralInfo must identify the Andrews internal subsection route.`);
                }
                if (internalStructuralInfo.logicPathType !== "source-gated derivational route") {
                    addError(`${internalWhere}.structuralInfo.logicPathType must identify a source-gated derivational route.`);
                }
                if (internalStructuralInfo.derivationStatus === "generic-andrews-internal-route") {
                    addError(`${internalWhere}.structuralInfo.derivationStatus must not leave the internal route generic.`);
                }
                if (internalStructuralInfo.derivationStatus === "entry-specific-andrews-internal-route") {
                    addError(`${internalWhere}.structuralInfo.derivationStatus must use a semantic route overlay, not an entry-specific fallback.`);
                }
                if (typeof internalStructuralInfo.sourcePathFormula !== "string" || internalStructuralInfo.sourcePathFormula.trim() === "") {
                    addError(`${internalWhere}.structuralInfo.sourcePathFormula must be a non-empty string.`);
                }
                const internalSourceGate = asObject(internal.sourceGate, `${internalWhere}.sourceGate`);
                if (internalSourceGate.gated !== true || typeof internalSourceGate.status !== "string") {
                    addError(`${internalWhere}.sourceGate must be gated with a status.`);
                }
                if (!checkStringArray(internalSourceGate.requirementIds, `${internalWhere}.sourceGate.requirementIds`).includes("andrews-internal-subsection-source")) {
                    addError(`${internalWhere}.sourceGate.requirementIds must include andrews-internal-subsection-source.`);
                }
                checkPuzzleStackTemplate(internal, internalWhere);
            });
        });
        if (lesson.id >= 1 && lesson.id <= 58) {
            const visibleTrajectoryText = [
                lesson.title,
                lesson.notes,
                trajectory.directive,
                trajectory.remainingGap,
                ...plannedArrows.map((arrow) => arrow && arrow.aim),
                ...firedArrows.map((arrow) => arrow && arrow.correction),
            ].filter(Boolean).join(" ");
            if (/\b(?:Intransitive|Transitive|Optative|Admonitive|Wish|Command|Exhortation|Admonition|Irregular|Suppletive|Defective|Tense|Mood|Basic|Sentences|Absolutive|Possessive|Pronominal|Supplementation|Formula|Subject|Pronouns|Possessor|Noun|State|Further Remarks|Part One|Part Two|Part Three|Nonactive|Passive|Passive-Voice|Impersonal|Causative|Applicative|Frequentative|Objects|Object|Compound|Purposive|Affective|Honorific|Pejorative|Cardinal|Numeral|Nominalization|Deverbal|Adjectival|Adverbial Nuclear|Adverbial Modification|Relational|Place-Name|Gentilic|Complementation|Conjunction|Comparison|Denominal|Nounstems|Verbstems|Personal-Name|Miscellany|Use|Audit|Lesson|Static|Full|Class|visible UI actions|UI actions|h[-]to[-]j|h\s*>\s*j|source-evidence|finite-generation|future-embed|preterit-embed|shared-object|projective-object|flawed-subject|gross-count|connective-t|tla-fusion|hual\/on|jual\/on|tzin-o-a|pol[-]o[-]a|pol[-]u[-]a|supplied-surface|multiple-nucleus|customary-present|active-action|passive-action|potential-patient|passive-patientive|root\/stock|root-plus-ya|human\/nonhuman|predicate-adjective|parser|verbcore|verbstem|nounstem|nonactive-stem|perfective-stem|tense-form|sentence-layer|suppletive subset|passive-subject|source-CNV|source-family|single\/double\/triple|object-plus-suffix|destockal|mainline\/shuntline|silent-object|natural-possession|sentence-structure|state-case|fused-spelling|topic\/comment|included-referent|vocative|formula slots|class compatibility|pronominal NNC|Supplementation AST|VNC-supplement|direct\/indirect|rumored-report|deleted saying|possessive-state|double-object|temporal compound parsing|NNC|VNC|CNV|CNN)\b/.test(visibleTrajectoryText)) {
                addError(`${where} must keep Lesson ${lesson.id} trajectory prose in Spanish for visible/UI-adjacent trajectory surfaces.`);
            }
            if (!/Lecci[oó]n/.test(visibleTrajectoryText) || !/(acciones visibles de interfaz|acciones de interfaz|Siguen parciales|pendientes de evidencia)/.test(visibleTrajectoryText) && !(trajectory.closestPass && trajectory.remainingGap === "none")) {
                addError(`${where} must expose Spanish Andrews trajectory wording for Lesson ${lesson.id}.`);
            }
        }
        if (typeof trajectory.closestPass !== "boolean") {
            addError(`${where}.closestPass must be boolean.`);
        }
        plannedArrows.forEach((arrow, arrowIndex) => {
            const arrowWhere = `${where}.plannedArrows[${arrowIndex}]`;
            if (!isPlainObject(arrow)) {
                addError(`${arrowWhere} must be an object.`);
                return;
            }
            ["id", "type", "aim"].forEach((field) => {
                if (typeof arrow[field] !== "string" || arrow[field].trim() === "") {
                    addError(`${arrowWhere}.${field} must be a non-empty string.`);
                }
            });
            checkArrowRefs(arrow, arrowWhere, "expectedFeedbackRefs");
        });
        firedArrows.forEach((arrow, arrowIndex) => {
            const arrowWhere = `${where}.firedArrows[${arrowIndex}]`;
            if (!isPlainObject(arrow)) {
                addError(`${arrowWhere} must be an object.`);
                return;
            }
            ["id", "correction"].forEach((field) => {
                if (typeof arrow[field] !== "string" || arrow[field].trim() === "") {
                    addError(`${arrowWhere}.${field} must be a non-empty string.`);
                }
            });
            if (!allowedArrowResults.has(arrow.result)) {
                addError(`${arrowWhere}.result has unknown result "${arrow.result}".`);
            }
            checkArrowRefs(arrow, arrowWhere, "feedbackRefs");
        });
        if (lesson.id >= 1 && lesson.id <= 5) {
            plannedArrows.forEach((arrow, arrowIndex) => {
                const text = arrow && typeof arrow.aim === "string" ? arrow.aim : "";
                if (!carriesPlanPursueCorrectnessProbe(text)) {
                    addError(`${where}.plannedArrows[${arrowIndex}].aim must carry the Lessons 1-5 Corrección antes de existencia probe.`);
                }
            });
            firedArrows.forEach((arrow, arrowIndex) => {
                const text = arrow && typeof arrow.correction === "string" ? arrow.correction : "";
                if (!carriesPlanPursueCorrectnessProbe(text)) {
                    addError(`${where}.firedArrows[${arrowIndex}].correction must carry the Lessons 1-5 Corrección antes de existencia probe.`);
                }
            });
        }
        const hitCount = firedArrows.filter((arrow) => arrow && arrow.result === "hit").length;
        const missCount = firedArrows.filter((arrow) => arrow && arrow.result === "miss").length;
        if (trajectory.hitCount !== hitCount) {
            addError(`${where}.hitCount must match fired hit arrows.`);
        }
        if (trajectory.missCount !== missCount) {
            addError(`${where}.missCount must match fired missed arrows.`);
        }
        if (trajectory.closestPass) {
            if (trajectory.aimStatus !== "closest-pass") {
                addError(`${where}.aimStatus must be closest-pass when closestPass is true.`);
            }
            if (trajectory.remainingGap !== "none") {
                addError(`${where}.remainingGap must be none for closest-pass lessons.`);
            }
            if (!firedArrows.length || firedArrows.some((arrow) => arrow.result !== "hit")) {
                addError(`${where}.firedArrows must include only validated hits for closest-pass lessons.`);
            }
        }
        if (lesson.status === "implemented") {
            if (trajectory.implementationState !== "implemented-audited") {
                addError(`${where}.implementationState must be implemented-audited for implemented lessons.`);
            }
            if (trajectory.redirectAction !== "keep") {
                addError(`${where}.redirectAction must be keep for implemented lessons.`);
            }
            if (!validationRefs.some((ref) => /^src\/tests\/|^scripts\//.test(ref))) {
                addError(`${where}.validationRefs must include a focused test or validation script.`);
            }
            if (!trajectory.closestPass) {
                addError(`${where}.closestPass must be true for implemented lessons.`);
            }
        }
        if (lesson.status === "partially-implemented" && trajectory.implementationState !== "partial") {
            addError(`${where}.implementationState must be partial for partially implemented lessons.`);
        }
        if (lesson.status === "partially-implemented" && trajectory.closestPass) {
            addError(`${where}.closestPass must be false for partial lessons.`);
        }
        if (lesson.status === "not-mapped" && (trajectory.implementationState !== "unmapped" || trajectory.redirectAction !== "block-generation")) {
            addError(`${where} must keep not-mapped lessons unmapped and block-generation.`);
        }
        if (lesson.status === "not-mapped" && (trajectory.aimStatus !== "blocked" || trajectory.closestPass || firedArrows.length !== 0)) {
            addError(`${where} must keep not-mapped lessons blocked with no fired arrows.`);
        }
    });
}

function collectAndrewsTrajectoryErrors() {
    const start = errors.length;
    checkAndrewsTrajectoryDoc();
    checkAndrewsTrajectoryRegistry();
    const collected = errors.slice(start);
    errors.length = start;
    return collected;
}

function main() {
    checkExpectedDataFiles();
    const allowlist = loadAllowlist();

    const jsonByName = {};
    EXPECTED_JSON_FILES.forEach((fileName) => {
        jsonByName[fileName] = loadJsonFile(fileName);
    });

    const rowCounts = checkLexiconCsvFiles(allowlist);
    const lexiconVerbSet = new Set();
    EXPECTED_CSV_FILES.forEach((fileName) => {
        const { rows } = loadCsvRows(fileName);
        rows.forEach(({ cells }) => {
            if (cells[0]) {
                lexiconVerbSet.add(cells[0]);
            }
        });
    });

    checkRequiredTopLevelKeys(jsonByName);
    checkNawatRouteProfiles(jsonByName);
    checkAndrewsFormalClassSurfaces(jsonByName);
    checkTenseReferences(jsonByName);
    checkOptionReferences(jsonByName);
    checkStaticNncFixtureShape(jsonByName);
    checkPhonologyReferences(jsonByName);
    checkSuppletivePathReferences(jsonByName);
    checkValenceNeutralReferences(jsonByName, lexiconVerbSet, allowlist);
    checkParseFixtureShape(jsonByName);
    checkVisibleUiSpanishSurface();
    checkAndrewsTrajectoryDoc();
    checkAndrewsTrajectoryRegistry();

    if (errors.length) {
        process.stderr.write("Grammar data check failed:\n");
        errors.forEach((error) => process.stderr.write(`- ${error}\n`));
        process.exit(1);
    }

    const csvSummary = Array.from(rowCounts.entries())
        .map(([fileName, count]) => `${fileName}: ${count}`)
        .join(", ");
    process.stdout.write(
        `Grammar data check passed (${EXPECTED_JSON_FILES.length} JSON files; ${csvSummary}; ${countAllowlistedExceptions(allowlist)} allowlisted exceptions).\n`
    );
}

if (require.main === module) {
    main();
}

module.exports = {
    collectAndrewsTrajectoryErrors,
    collectStaticNncFixtureErrors,
    collectVisibleUiSpanishSurfaceErrors,
};
