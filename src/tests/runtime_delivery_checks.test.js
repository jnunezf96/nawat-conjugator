"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    checkRuntimeManifest,
    parseIndexScriptPaths,
} = require("../../scripts/lib/runtime_manifest_check");

const ROOT = path.resolve(__dirname, "../..");
const CANONICAL_RUNTIME_MODULES = Object.freeze([
    "src/browser/main.mjs",
    "src/ui/shell/classical_shell.mjs",
    "src/core/grammar/contract_registry.mjs",
    "src/application/classical/vnc_application.mjs",
    "src/ui/curriculum/curriculum.mjs",
]);

function normalizeLocalAssetPath(value = "") {
    return String(value || "")
        .split(/[?#]/u, 1)[0]
        .replace(/^\.\//u, "");
}

function getLocalScriptEntries(source = "") {
    return Array.from(String(source || "").matchAll(/<script\b([^>]*)>/giu), (match) => {
        const attributes = match[1] || "";
        const sourceMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/iu);
        const typeMatch = attributes.match(/\btype\s*=\s*["']([^"']+)["']/iu);
        return {
            path: normalizeLocalAssetPath(sourceMatch?.[1] || ""),
            type: String(typeMatch?.[1] || "").toLowerCase(),
        };
    }).filter((entry) => (
        entry.path
        && !/^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/u.test(entry.path)
    ));
}

function findDirectClassicImplementationRequires() {
    const testDir = path.join(ROOT, "src", "tests");
    const directClassicRequire = /require\(\s*["']\.\.\/(?:application|core|ui)\/[^"']+\.js["']\s*\)/gu;
    return fs.readdirSync(testDir)
        .filter((fileName) => fileName.endsWith(".test.js"))
        .sort()
        .flatMap((fileName) => {
            const source = fs.readFileSync(path.join(testDir, fileName), "utf8");
            return Array.from(source.matchAll(directClassicRequire), (match) => `${fileName}:${match[0]}`);
        });
}

function run() {
    const s = createSuite("runtime_delivery_checks");
    const indexSource = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const localScriptEntries = getLocalScriptEntries(indexSource);

    s.eq(
        "index script parsing normalizes modern module paths and ignores external scripts",
        parseIndexScriptPaths([
            '<script type="module" src="./src/a.mjs?v=one"></script>',
            '<script src="https://example.test/external.js"></script>',
            '<script type="module" src="src/b.mjs#fragment"></script>',
        ].join("\n")),
        ["src/a.mjs", "src/b.mjs"]
    );

    s.eq(
        "the public index has one canonical modern-browser entry module",
        localScriptEntries,
        [{ path: "src/browser/main.mjs", type: "module" }]
    );

    s.eq(
        "the public index contains no classic script lane",
        localScriptEntries
            .filter((entry) => entry.type !== "module" || !entry.path.endsWith(".mjs"))
            .map((entry) => entry.path),
        []
    );

    s.eq(
        "the canonical browser, shell, grammar, application, and curriculum modules exist",
        CANONICAL_RUNTIME_MODULES.filter((modulePath) => !fs.existsSync(path.join(ROOT, modulePath))),
        []
    );

    const browserEntrySource = fs.readFileSync(path.join(ROOT, "src", "browser", "main.mjs"), "utf8");
    s.ok(
        "the browser entry delegates to the ESM bootstrap and publishes its readiness promise",
        browserEntrySource.includes('from "../bootstrap/bootstrap.mjs?v=')
            && browserEntrySource.includes("__NAWAT_MODULE_BOOTSTRAP_PROMISE__")
    );

    s.eq(
        "tests do not execute classic application, core, or UI implementation files directly",
        findDirectClassicImplementationRequires(),
        []
    );

    const repositoryManifest = checkRuntimeManifest(ROOT);
    s.eq(
        "the public entry and canonical ESM runtime manifest remain aligned",
        repositoryManifest.findings,
        []
    );

    return s;
}

module.exports = { run };
