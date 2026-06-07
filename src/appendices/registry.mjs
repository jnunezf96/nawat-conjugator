// src/appendices/registry.mjs
// Native ESM appendix registry. Kept installer-compatible for the legacy bridge.

export const APPENDIX_REGISTRY = [
    {
        id: "A",
        title: "VNC Paradigms",
        status: "implemented",
        engineDependencies: ["core/vnc", "core/agreement", "core/preterit"],
        notes: "Full VNC paradigm generation is the core feature of the conjugator",
    },
    {
        id: "B",
        title: "NNC Paradigms",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        notes: "NNC paradigm generation is partially implemented",
    },
    {
        id: "C",
        title: "Object Pronoun Combinations",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        notes: "Object pronoun combination matrix is implemented",
    },
    {
        id: "D",
        title: "Numeral NNCs and Numbers",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/numerals"],
        notes: "Diagnostic numeral-NNC boundary metadata exists; no confirmed numeral data or generation",
    },
    {
        id: "E",
        title: "Day, Month, and Year Names",
        status: "partially-implemented",
        engineDependencies: ["core/calendar"],
        notes: "Diagnostic calendar-name boundary metadata exists; no confirmed calendar data or generation",
    },
    {
        id: "F",
        title: "Spelling Conventions in Older Texts",
        status: "partially-implemented",
        engineDependencies: ["core/orthography"],
        notes: "Diagnostic older/Classical spelling bridge metadata exists; no old-spelling normalizer or fixture-backed alias data",
    },
    {
        id: "G",
        title: "Suggested ...",
        status: "placeholder",
        engineDependencies: [],
        notes: "Title incomplete in source — content unknown",
    },
];

export function createAppendixRegistryApi() {
    return {
        APPENDIX_REGISTRY,
    };
}

export function installAppendixRegistryGlobals(targetObject = globalThis) {
    const api = createAppendixRegistryApi();
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
