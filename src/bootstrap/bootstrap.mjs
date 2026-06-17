import { installRuntimeBridge } from "./runtime_bridge.mjs";
import { createRuntimeConfigSnapshot } from "./runtime_config.mjs";
import { BROWSER_SCRIPT_PATHS, HTML_SHELL_PATH } from "./runtime_paths.mjs";
import { attachRuntimeBindings, createRuntimeInstance } from "../runtime/create_runtime.mjs";

let browserBootstrapPromise = null;

function hasAppShell(documentObject) {
    return Boolean(
        documentObject?.getElementById?.("container-inputs")
        && documentObject?.getElementById?.("verb")
    );
}

async function ensureRuntimeAppShell({
    documentObject,
    fetchImpl = globalThis.fetch,
    shellSource = HTML_SHELL_PATH,
}) {
    if (!documentObject || hasAppShell(documentObject)) {
        return;
    }
    if (typeof fetchImpl !== "function") {
        throw new Error("bootstrapBrowserApp requires fetch() to hydrate the HTML shell.");
    }
    const response = await fetchImpl(shellSource, { cache: "no-store" });
    if (!response || !response.ok) {
        throw new Error(`Failed to hydrate HTML shell from ${shellSource}.`);
    }
    const html = await response.text();
    const domParser = typeof DOMParser === "function" ? new DOMParser() : null;
    if (!domParser) {
        throw new Error("bootstrapBrowserApp requires DOMParser to hydrate the HTML shell.");
    }
    const parsed = domParser.parseFromString(html, "text/html");
    const fragment = documentObject.createDocumentFragment();
    Array.from(parsed.body.childNodes || []).forEach((node) => {
        const nextNode = documentObject.importNode
            ? documentObject.importNode(node, true)
            : node.cloneNode(true);
        fragment.appendChild(nextNode);
    });
    documentObject.body.replaceChildren(fragment);
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
            await ensureRuntimeAppShell({
                documentObject,
                fetchImpl: options.fetchImpl || globalObject.fetch,
                shellSource: options.shellSource || HTML_SHELL_PATH,
            });
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
            if (typeof globalObject.initializeUiRuntime === "function") {
                await globalObject.initializeUiRuntime();
            }
            return {
                mode: "browser-module-runtime",
                bootstrapBrowserApp,
                initializeUiRuntime: globalObject.initializeUiRuntime || null,
                runtimeConfig,
                scriptPaths: [...(options.scriptPaths || BROWSER_SCRIPT_PATHS)],
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
