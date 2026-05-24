import {
    LEGACY_BROWSER_SCRIPT_PATHS,
    LEGACY_HTML_SHELL_PATH,
    LEGACY_VM_SCRIPT_PATHS,
    cloneStaticRuntimePaths,
} from "./runtime_paths.mjs";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs";

export function installLegacyBridge(globalObject = globalThis, runtime = {}) {
    if (!globalObject || typeof globalObject !== "object") {
        return null;
    }
    const runtimeConfig = runtime.runtimeConfig || globalObject.__NAWAT_RUNTIME_CONFIG__ || createRuntimeConfigSnapshot();
    const bridge = {
        mode: runtime.mode || null,
        shellSource: LEGACY_HTML_SHELL_PATH,
        runtimeConfig,
        runtimePaths: runtimeConfig.paths || cloneStaticRuntimePaths(),
        manifests: {
            browser: [...LEGACY_BROWSER_SCRIPT_PATHS],
            vm: [...LEGACY_VM_SCRIPT_PATHS],
        },
        esmPreloads: runtime.esmPreloads || globalObject.__NAWAT_ESM_PRELOADS__ || [],
        moduleRuntimeMode: runtime.moduleRuntimeMode || null,
        legacyExecutionDisabled: runtime.legacyExecutionDisabled === true,
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
