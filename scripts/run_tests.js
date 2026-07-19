#!/usr/bin/env node
"use strict";

/**
 * Master test runner for Nawat Conjugator.
 * Loads the canonical native-module runtime, applies static data, then runs all
 * src/tests/*.test.js suites.
 *
 * Usage:
 *   node scripts/run_tests.js
 *   node scripts/run_tests.js --filter ui
 *   node scripts/run_tests.js --filter=classical_firewall
 */

const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");
const { runAll } = require("../src/tests/runner");

const ROOT = path.resolve(__dirname, "..");
const runtimeArg = process.argv.find((arg) => arg.startsWith("--runtime=")) || "";
const runtimeMode = "module";

if (runtimeArg) {
    throw new Error("The test runner is ESM-only; remove the obsolete --runtime option.");
}

function readOption(name) {
    const prefix = `--${name}=`;
    const inline = process.argv.find((arg) => arg.startsWith(prefix));
    if (inline) {
        return inline.slice(prefix.length).trim();
    }
    const optionIndex = process.argv.indexOf(`--${name}`);
    if (optionIndex >= 0) {
        return String(process.argv[optionIndex + 1] || "").trim();
    }
    return "";
}

const testFilters = readOption("filter")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

function testFileMatchesFilter(file) {
    if (!testFilters.length) {
        return true;
    }
    const testId = file.replace(/\.test\.js$/u, "").toLowerCase();
    return testFilters.some((filter) => testId === filter || testId.includes(filter));
}

async function buildRuntimeContext() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    return context;
}

// Apply all static data (same pattern as regression scripts)
function applyIfExists(context, fnName, data) {
    if (typeof context[fnName] === "function") {
        context[fnName](data);
    }
}

function loadJson(relPath) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) return null;
    return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

function applyStaticData(context) {
    applyIfExists(context, "applyStaticConstants", loadJson("data/static_constants.json") || {});
    applyIfExists(context, "applyStaticPhonology", loadJson("data/static_phonology.json") || {});
    applyIfExists(context, "applyStaticLabels", loadJson("data/static_labels.json") || {});
    applyIfExists(context, "applyStaticDerivationalRules", loadJson("data/static_derivational_rules.json") || {});
    applyIfExists(context, "applyStaticValenceNeutral", loadJson("data/static_valence_neutral.json") || {});
    applyIfExists(context, "applyStaticOptions", loadJson("data/static_options.json") || {});
    applyIfExists(context, "applyStaticOrders", loadJson("data/static_orders.json") || {});
    applyIfExists(context, "applyStaticRules", loadJson("data/static_rules.json") || {});
    applyIfExists(context, "applyStaticDirectionalRules", loadJson("data/static_directional_rules.json") || {});
    applyIfExists(context, "applyStaticAllomorphyRules", loadJson("data/static_allomorphy_rules.json") || {});
    applyIfExists(context, "applyStaticModes", loadJson("data/static_modes.json") || {});
    applyIfExists(context, "applyStaticNnc", loadJson("data/static_nnc.json") || {});
    applyIfExists(context, "applyStaticMisc", loadJson("data/static_misc.json") || {});
    applyIfExists(context, "applyStaticSuppletives", loadJson("data/static_suppletives.json") || {});
    applyIfExists(context, "applyStaticRedup", loadJson("data/static_redup.json") || {});
    applyIfExists(context, "applyStaticSuppletivePaths", loadJson("data/static_suppletive_paths.json") || {});
}

async function main() {
    const context = await buildRuntimeContext();
    context.__TEST_RUNTIME_MODE__ = runtimeMode;
    applyStaticData(context);

    const testDir = path.join(ROOT, "src", "tests");
    const testFiles = fs.readdirSync(testDir)
        .filter(f => f.endsWith(".test.js"))
        .filter(testFileMatchesFilter)
        .sort();

    if (!testFiles.length) {
        throw new Error(`No test suite matched --filter ${testFilters.join(",")}`);
    }

    const suites = [];
    for (const file of testFiles) {
        const mod = require(path.join(testDir, file));
        if (typeof mod.run === "function") {
            process.stdout.write(`[RUN] ${file} (${runtimeMode})\n`);
            suites.push(mod.run(context));
        } else {
            process.stdout.write(`[SKIP] ${file} (no run export)\n`);
        }
    }

    if (!suites.length) {
        throw new Error("Matched test files did not export a runnable suite");
    }

    runAll(suites);
}

main().catch((error) => {
    process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
    process.exit(1);
});
