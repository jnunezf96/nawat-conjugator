"use strict";

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const DEFAULT_BROWSER_ENTRY = "src/browser/main.mjs";
const LEGACY_SOURCE_OVERRIDES = Object.freeze({
    "src/bootstrap/script_runtime.mjs": "script.js",
    "src/ui/events/events.mjs": "src/ui/events.js",
});
const OBSOLETE_DELIVERY_PATHS = Object.freeze([
    "index.module.html",
    "scripts/check_generated_wrappers.js",
    "scripts/generate_native_module_wrapper.mjs",
    "scripts/lib/generated_wrapper_check.js",
]);

function normalizeManifestPath(value = "") {
    const normalized = String(value || "")
        .replaceAll("\\", "/")
        .split(/[?#]/u, 1)[0]
        .replace(/^\.\//u, "");
    return normalized ? path.posix.normalize(normalized) : "";
}

function isExternalAssetPath(value = "") {
    return /^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/u.test(String(value || ""));
}

function parseIndexScriptEntries(source = "") {
    return Array.from(String(source || "").matchAll(/<script\b([^>]*)>/giu), (match) => {
        const attributes = match[1] || "";
        const sourceMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/iu);
        const typeMatch = attributes.match(/\btype\s*=\s*["']([^"']+)["']/iu);
        return {
            path: normalizeManifestPath(sourceMatch?.[1] || ""),
            type: String(typeMatch?.[1] || "").trim().toLowerCase(),
        };
    }).filter((entry) => entry.path && !isExternalAssetPath(entry.path));
}

function parseIndexScriptPaths(source = "") {
    return parseIndexScriptEntries(source).map((entry) => entry.path);
}

function findDuplicates(values = []) {
    const counts = new Map();
    values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
    return [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([value]) => value)
        .sort();
}

function difference(left = [], right = []) {
    const rightSet = new Set(right);
    return [...new Set(left.filter((value) => !rightSet.has(value)))].sort();
}

function analyzeRuntimeManifest({
    indexScriptEntries = [],
    browserEntry = DEFAULT_BROWSER_ENTRY,
    modulePaths = [],
    installerPaths = [],
    missingIndexScriptPaths = [],
    missingModulePaths = [],
    generatedModulePaths = [],
    classicSourcePaths = [],
    obsoleteDeliveryPaths = [],
} = {}) {
    const normalizedEntry = normalizeManifestPath(browserEntry);
    const normalizedIndexEntries = indexScriptEntries.map((entry) => ({
        path: normalizeManifestPath(entry?.path),
        type: String(entry?.type || "").trim().toLowerCase(),
    })).filter((entry) => entry.path);
    const normalizedModulePaths = modulePaths.map(normalizeManifestPath).filter(Boolean);
    const normalizedInstallerPaths = installerPaths.map(normalizeManifestPath).filter(Boolean);
    const findings = [];

    function addFinding(id, paths, message) {
        const normalizedPaths = [...new Set((paths || []).filter(Boolean))].sort();
        if (normalizedPaths.length) {
            findings.push({ id, paths: normalizedPaths, message });
        }
    }

    if (
        normalizedIndexEntries.length !== 1
        || normalizedIndexEntries[0]?.path !== normalizedEntry
        || normalizedIndexEntries[0]?.type !== "module"
    ) {
        findings.push({
            id: "modern-browser-entry-drift",
            paths: normalizedIndexEntries.map((entry) => entry.path),
            message: `index.html must load only ${normalizedEntry} as type=module.`,
        });
    }
    addFinding(
        "classic-index-scripts",
        normalizedIndexEntries
            .filter((entry) => entry.type !== "module" || !entry.path.endsWith(".mjs"))
            .map((entry) => entry.path),
        "The public page must not load a classic script lane."
    );
    addFinding("duplicate-runtime-modules", findDuplicates(normalizedModulePaths), "The runtime module manifest contains duplicates.");
    addFinding("duplicate-runtime-installers", findDuplicates(normalizedInstallerPaths), "The runtime installer manifest contains duplicates.");
    addFinding(
        "runtime-modules-without-installers",
        difference(normalizedModulePaths, normalizedInstallerPaths),
        "Every declared runtime module must have an installer."
    );
    addFinding(
        "runtime-installers-outside-manifest",
        difference(normalizedInstallerPaths, normalizedModulePaths),
        "Every runtime installer must belong to the canonical module manifest."
    );
    addFinding("missing-index-module-files", missingIndexScriptPaths, "index.html references a missing local module.");
    addFinding("missing-runtime-module-files", missingModulePaths, "The runtime manifest references a missing module.");
    addFinding(
        "generated-runtime-modules",
        generatedModulePaths,
        "Canonical ESM modules must not retain generated-wrapper source coupling."
    );
    addFinding(
        "classic-runtime-sources",
        classicSourcePaths,
        "Canonical ESM modules must not retain a second classic implementation source."
    );
    addFinding(
        "obsolete-runtime-delivery-tooling",
        obsoleteDeliveryPaths,
        "The modern runtime must not retain wrapper generation or a second browser entry."
    );

    findings.sort((left, right) => left.id.localeCompare(right.id));
    return {
        aligned: findings.length === 0,
        counts: {
            indexModules: normalizedIndexEntries.length,
            runtimeModules: normalizedModulePaths.length,
            runtimeInstallers: normalizedInstallerPaths.length,
        },
        findings,
    };
}

function loadRuntimeManifest(runtimeManifestPath) {
    const moduleUrl = pathToFileURL(runtimeManifestPath).href;
    const importScript = [
        `const runtime = await import(${JSON.stringify(moduleUrl)});`,
        "const coverage = runtime.assertRuntimeInstallerCoverage();",
        "process.stdout.write(JSON.stringify({",
        "modulePaths: runtime.RUNTIME_MODULE_PATHS,",
        "installerPaths: coverage.modulePaths,",
        "}));",
    ].join("\n");
    const output = childProcess.execFileSync(process.execPath, [
        "--input-type=module",
        "--eval",
        importScript,
    ], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    });
    return JSON.parse(output);
}

function checkRuntimeManifest(rootDir, {
    indexPath = "index.html",
    runtimeManifestPath = "src/runtime/create_runtime.mjs",
    browserEntry = DEFAULT_BROWSER_ENTRY,
} = {}) {
    const absoluteIndexPath = path.resolve(rootDir, indexPath);
    const absoluteRuntimeManifestPath = path.resolve(rootDir, runtimeManifestPath);
    const indexScriptEntries = parseIndexScriptEntries(fs.readFileSync(absoluteIndexPath, "utf8"));
    const manifest = loadRuntimeManifest(absoluteRuntimeManifestPath);
    const missingIndexScriptPaths = indexScriptEntries
        .map((entry) => entry.path)
        .filter((scriptPath) => !fs.existsSync(path.resolve(rootDir, scriptPath)));
    const missingModulePaths = manifest.modulePaths.filter(
        (modulePath) => !fs.existsSync(path.resolve(rootDir, modulePath))
    );
    const generatedModulePaths = manifest.modulePaths.filter((modulePath) => {
        const absolutePath = path.resolve(rootDir, modulePath);
        if (!fs.existsSync(absolutePath)) {
            return false;
        }
        return fs.readFileSync(absolutePath, "utf8").startsWith("// Native wrapper generated from ");
    });
    const classicSourcePaths = manifest.modulePaths
        .map((modulePath) => (
            LEGACY_SOURCE_OVERRIDES[modulePath]
            || modulePath.replace(/\.mjs$/u, ".js")
        ))
        .filter((sourcePath) => fs.existsSync(path.resolve(rootDir, sourcePath)));
    const obsoleteDeliveryPaths = OBSOLETE_DELIVERY_PATHS.filter(
        (deliveryPath) => fs.existsSync(path.resolve(rootDir, deliveryPath))
    );
    return analyzeRuntimeManifest({
        ...manifest,
        indexScriptEntries,
        browserEntry,
        missingIndexScriptPaths,
        missingModulePaths,
        generatedModulePaths,
        classicSourcePaths,
        obsoleteDeliveryPaths,
    });
}

module.exports = {
    DEFAULT_BROWSER_ENTRY,
    analyzeRuntimeManifest,
    checkRuntimeManifest,
    findDuplicates,
    loadRuntimeManifest,
    normalizeManifestPath,
    parseIndexScriptEntries,
    parseIndexScriptPaths,
};
