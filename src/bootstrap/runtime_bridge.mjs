import { cloneStaticRuntimePaths } from "./runtime_paths.mjs";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs";
import { RUNTIME_MODULE_PATHS } from "../runtime/create_runtime.mjs";

export function installRuntimeBridge(globalObject = globalThis, runtime = {}) {
    if (!globalObject || typeof globalObject !== "object") {
        return null;
    }
    const runtimeConfig = runtime.runtimeConfig || globalObject.__NAWAT_RUNTIME_CONFIG__ || createRuntimeConfigSnapshot();
    const bridge = {
        mode: runtime.mode || null,
        entrypoint: runtime.entrypoint || null,
        runtimeConfig,
        runtimePaths: runtimeConfig.paths || cloneStaticRuntimePaths(),
        manifests: {
            modules: [...RUNTIME_MODULE_PATHS],
        },
        esmPreloads: runtime.esmPreloads || globalObject.__NAWAT_ESM_PRELOADS__ || [],
        moduleRuntimeMode: runtime.moduleRuntimeMode || null,
        scriptExecutionDisabled: runtime.scriptExecutionDisabled === true,
        bootstrapBrowserApp: runtime.bootstrapBrowserApp || globalObject.bootstrapBrowserApp || null,
        initializeUiRuntime: runtime.initializeUiRuntime || globalObject.initializeUiRuntime || null,
        createModuleRuntime: runtime.createModuleRuntime || globalObject.createModuleRuntime || null,
    };
    globalObject.__NAWAT_RUNTIME_PATHS__ = bridge.runtimePaths;
    globalObject.__NAWAT_RUNTIME_CONFIG__ = bridge.runtimeConfig;
    globalObject.__NAWAT_ESM_PRELOADS__ = bridge.esmPreloads;
    globalObject.__NAWAT_BOOTSTRAP__ = bridge;
    return bridge;
}
