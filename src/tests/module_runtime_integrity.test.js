"use strict";

const { createSuite } = require("./runner");

function getModulePath(entry) {
    if (typeof entry === "string") {
        return entry;
    }
    return String(entry?.modulePath || entry?.esmModulePath || "");
}

function run(ctx = {}) {
    const s = createSuite("module_runtime_integrity");
    const bootstrap = ctx.__NAWAT_BOOTSTRAP__ || {};
    const loadedEntries = Array.isArray(ctx.__NAWAT_ESM_PRELOADS__)
        ? ctx.__NAWAT_ESM_PRELOADS__
        : [];
    const bridgeEntries = Array.isArray(bootstrap.runtimeModules)
        ? bootstrap.runtimeModules
        : (Array.isArray(bootstrap.esmPreloads) ? bootstrap.esmPreloads : []);
    const loadedModulePaths = loadedEntries.map(getModulePath);
    const bridgeModulePaths = bridgeEntries.map(getModulePath);

    s.eq(
        "the test lane executes only the direct-import ESM runtime",
        {
            testRuntimeMode: ctx.__TEST_RUNTIME_MODE__,
            runtimeMode: bootstrap.mode,
            moduleRuntimeMode: bootstrap.moduleRuntimeMode,
            scriptExecutionDisabled: bootstrap.scriptExecutionDisabled,
        },
        {
            testRuntimeMode: "module",
            runtimeMode: "node-module-runtime",
            moduleRuntimeMode: "direct-import",
            scriptExecutionDisabled: true,
        }
    );

    s.ok(
        "every installed runtime entry is a unique canonical MJS module mirrored by the runtime bridge",
        loadedModulePaths.length > 0
            && loadedModulePaths.every((modulePath) => modulePath.endsWith(".mjs"))
            && new Set(loadedModulePaths).size === loadedModulePaths.length
            && JSON.stringify(loadedModulePaths) === JSON.stringify(bridgeModulePaths)
    );

    return s;
}

module.exports = { run };
