import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

import { installRuntimeBridge } from "../bootstrap/runtime_bridge.mjs";
import { createRuntimeConfigSnapshot } from "../bootstrap/runtime_config.mjs";
import { VM_SCRIPT_PATHS } from "../bootstrap/runtime_paths.mjs";
import { attachRuntimeBindings, createRuntimeInstance } from "../runtime/create_runtime.mjs";

const noop = () => {};

function createFakeElement() {
    const fakeClassList = {
        add: noop,
        remove: noop,
        toggle: noop,
        contains: () => false,
    };
    const fakeStyle = {
        setProperty: noop,
        removeProperty: noop,
    };
    return new Proxy(
        {
            value: "",
            checked: false,
            style: fakeStyle,
            dataset: {},
            classList: fakeClassList,
            addEventListener: noop,
            removeEventListener: noop,
            appendChild: noop,
            removeChild: noop,
            replaceChildren: noop,
            setAttribute: noop,
            getAttribute: () => null,
            querySelector: () => null,
            querySelectorAll: () => [],
            closest: () => null,
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0,
            }),
            focus: noop,
            blur: noop,
            click: noop,
            textContent: "",
            innerHTML: "",
        },
        {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                return noop;
            },
        }
    );
}

function createFakeDocument(fakeElement) {
    return {
        body: fakeElement,
        head: fakeElement,
        documentElement: fakeElement,
        addEventListener: noop,
        removeEventListener: noop,
        getElementById: () => fakeElement,
        querySelector: () => fakeElement,
        querySelectorAll: () => [],
        createElement: () => fakeElement,
        createDocumentFragment: () => fakeElement,
        importNode: (node) => node,
    };
}

function createFakeWindow(documentObject) {
    return {
        document: documentObject,
        addEventListener: noop,
        removeEventListener: noop,
        matchMedia: () => ({
            matches: false,
            addEventListener: noop,
            removeEventListener: noop,
        }),
        requestAnimationFrame: (callback) => setTimeout(callback, 0),
        cancelAnimationFrame: noop,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        getComputedStyle: () => ({
            display: "block",
            visibility: "visible",
        }),
        localStorage: {
            getItem: () => null,
            setItem: noop,
            removeItem: noop,
        },
        visualViewport: {
            scale: 1,
            addEventListener: noop,
            removeEventListener: noop,
        },
        devicePixelRatio: 1,
        scrollBy: noop,
    };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT = path.resolve(__dirname, "../..");

export async function createModuleRuntime({
    rootDir = DEFAULT_ROOT,
    scriptPath = path.join(rootDir, "script.js"),
    loadScript = true,
    loadPreteritModules = true,
    extraGlobals = {},
} = {}) {
    const fakeElement = createFakeElement();
    const documentObject = createFakeDocument(fakeElement);
    const windowObject = createFakeWindow(documentObject);
    const runtimeConfig = createRuntimeConfigSnapshot();
    const context = {
        console,
        window: windowObject,
        document: documentObject,
        localStorage: windowObject.localStorage,
        navigator: { userAgent: "node" },
        URL: {
            createObjectURL: () => "",
            revokeObjectURL: noop,
        },
        Blob: function Blob() {},
        Event: function Event(type) {
            this.type = type;
        },
        CustomEvent: function CustomEvent(type, detail = {}) {
            this.type = type;
            this.detail = detail.detail;
        },
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        fetch: undefined,
        ...extraGlobals,
    };
    context.globalThis = context;
    context.__NAWAT_RUNTIME_CONFIG__ = runtimeConfig;
    context.__NAWAT_RUNTIME_PATHS__ = runtimeConfig.paths;
    windowObject.window = windowObject;
    windowObject.globalThis = context;
    windowObject.__NAWAT_RUNTIME_CONFIG__ = runtimeConfig;
    windowObject.__NAWAT_RUNTIME_PATHS__ = runtimeConfig.paths;
    vm.createContext(context);
    const runtimeInstance = await createRuntimeInstance({
        globalObject: context,
        windowObject,
        documentObject,
        runtimeConfig,
        extraGlobals,
    });
    attachRuntimeBindings(context, runtimeInstance);
    attachRuntimeBindings(windowObject, runtimeInstance);
    const runtimeDescriptor = {
        mode: "node-module-runtime",
        createModuleRuntime,
        runtimeConfig,
        scriptPath,
        scriptPaths: [...VM_SCRIPT_PATHS],
        esmPreloads: runtimeInstance.loadedModules,
        moduleRuntimeMode: "direct-import",
        scriptExecutionDisabled: true,
        loadScriptRequested: loadScript,
        loadPreteritModulesRequested: loadPreteritModules,
    };
    installRuntimeBridge(context, runtimeDescriptor);
    installRuntimeBridge(windowObject, runtimeDescriptor);
    return { context, document: documentObject, windowObject, scriptPath };
}
