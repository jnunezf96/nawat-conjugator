import { installRuntimeBridge } from "./runtime_bridge.mjs";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs";
import { attachRuntimeBindings, createRuntimeInstance } from "../runtime/create_runtime.mjs";

let browserBootstrapPromise = null;

const BROWSER_MODULE_ENTRYPOINT = "src/browser/main.mjs";
const REQUIRED_STATIC_ROOT_IDS = Object.freeze([
    "classical-app-root",
    "classical-footer-root",
    "classical-modal-root",
]);

function assertStaticAppRoots(documentObject) {
    if (typeof documentObject?.getElementById !== "function") {
        throw new Error("bootstrapBrowserApp requires an index.html document with static application roots.");
    }
    const missingRootIds = REQUIRED_STATIC_ROOT_IDS.filter((id) => !documentObject.getElementById(id));
    if (missingRootIds.length) {
        throw new Error(
            `bootstrapBrowserApp is missing static index.html roots: ${missingRootIds.map((id) => `#${id}`).join(", ")}.`
        );
    }
}

function assertInstalledVerbInput(documentObject) {
    if (!documentObject.getElementById("verb")) {
        throw new Error(
            "bootstrapBrowserApp did not receive the installed #verb control from the Classical shell runtime."
        );
    }
}

export async function bootstrapRuntime({
    globalObject = globalThis,
    loadRuntime,
    installBridge = true,
}) {
    if (typeof loadRuntime !== "function") {
        throw new Error("bootstrapRuntime requires a loadRuntime function.");
    }
    const runtime = await loadRuntime();
    if (installBridge) {
        installRuntimeBridge(globalObject, runtime);
    }
    return runtime;
}

export async function bootstrapBrowserApp(options = {}) {
    if (browserBootstrapPromise) {
        return browserBootstrapPromise;
    }
    browserBootstrapPromise = bootstrapRuntime({
        globalObject: options.globalObject || globalThis,
        installBridge: options.installBridge !== false,
        loadRuntime: async () => {
            const globalObject = options.globalObject || globalThis;
            const documentObject = options.documentObject || globalObject.document;
            if (!documentObject) {
                throw new Error("bootstrapBrowserApp requires a document.");
            }
            const runtimeConfig = createRuntimeConfigSnapshot();
            globalObject.__NAWAT_BOOTSTRAP_MANAGED__ = true;
            globalObject.__NAWAT_RUNTIME_CONFIG__ = runtimeConfig;
            globalObject.__NAWAT_RUNTIME_PATHS__ = runtimeConfig.paths;
            assertStaticAppRoots(documentObject);
            const runtimeInstance = await createRuntimeInstance({
                globalObject,
                windowObject: globalObject.window || globalObject,
                documentObject,
                runtimeConfig,
            });
            attachRuntimeBindings(globalObject, runtimeInstance);
            if (
                globalObject.window
                && typeof globalObject.window === "object"
                && globalObject.window !== globalObject
            ) {
                attachRuntimeBindings(globalObject.window, runtimeInstance);
            }
            assertInstalledVerbInput(documentObject);
            if (typeof globalObject.initializeUiRuntime === "function") {
                await globalObject.initializeUiRuntime();
            }
            return {
                mode: "browser-module-runtime",
                bootstrapBrowserApp,
                initializeUiRuntime: globalObject.initializeUiRuntime || null,
                runtimeConfig,
                entrypoint: BROWSER_MODULE_ENTRYPOINT,
                scriptPaths: [BROWSER_MODULE_ENTRYPOINT],
                esmPreloads: runtimeInstance.loadedModules,
                moduleRuntimeMode: "direct-import",
                scriptExecutionDisabled: true,
            };
        },
    }).catch((error) => {
        browserBootstrapPromise = null;
        throw error;
    });
    return browserBootstrapPromise;
}
