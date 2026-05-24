import { cloneStaticRuntimePaths } from "./runtime_paths.mjs";

export const STATIC_BOOTSTRAP_LOADER_GROUPS = Object.freeze({
    essential: Object.freeze([
        "loadStaticConstants",
        "loadStaticDirectionalRules",
        "loadStaticLabels",
    ]),
    deferred: Object.freeze([
        "loadStaticOptions",
        "loadStaticGroups",
        "loadStaticOrders",
        "loadStaticRules",
        "loadStaticDerivationalRules",
        "loadStaticValenceNeutral",
        "loadStaticPhonology",
        "loadStaticAllomorphyRules",
        "loadStaticModes",
        "loadStaticMisc",
        "loadStaticSuppletives",
        "loadStaticRedup",
        "loadStaticSuppletivePaths",
    ]),
});

export function cloneStaticBootstrapLoaderGroups() {
    return {
        essential: [...STATIC_BOOTSTRAP_LOADER_GROUPS.essential],
        deferred: [...STATIC_BOOTSTRAP_LOADER_GROUPS.deferred],
    };
}

export function createRuntimeConfigSnapshot() {
    return Object.freeze({
        paths: cloneStaticRuntimePaths(),
        bootstrapLoaderGroups: cloneStaticBootstrapLoaderGroups(),
    });
}
