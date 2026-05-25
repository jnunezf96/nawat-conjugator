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

const PRETERIT_CLASS_IDS = new Set(["A", "B", "C", "D"]);
const VALID_NONACTIVE_SUFFIXES = new Set(["lu", "u", "wa", "luwa", "uwa", "walu"]);

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
        if (!coveredTenses.has(tense)) {
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

    asArray(options.subjectCombinations, "static_options.subjectCombinations").forEach((entry, index) => {
        checkPersonRef(entry && entry.personSubKey, `static_options.subjectCombinations[${index}].personSubKey`, knownPersonKeys);
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
    Object.keys(passiveImpersonalSubjectMap).forEach((objectPrefix) => {
        if (!objectPrefixSet.has(objectPrefix)) {
            addError(`static_options.passiveImpersonalSubjectMap references unknown object prefix "${objectPrefix}".`);
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
    checkTenseReferences(jsonByName);
    checkOptionReferences(jsonByName);
    checkPhonologyReferences(jsonByName);
    checkSuppletivePathReferences(jsonByName);
    checkValenceNeutralReferences(jsonByName, lexiconVerbSet, allowlist);
    checkParseFixtureShape(jsonByName);

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

main();
