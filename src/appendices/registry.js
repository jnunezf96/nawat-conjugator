// src/appendices/registry.js
// Reference surface descriptors for appendices A–G.
// These are data/reference views, not lesson curriculum.

const APPENDIX_REGISTRY = [
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
        status: "not-mapped",
        engineDependencies: [],
        notes: "Data may exist; rendering not confirmed",
    },
    {
        id: "E",
        title: "Day, Month, and Year Names",
        status: "not-mapped",
        engineDependencies: [],
        notes: "Not in scope for conjugator",
    },
    {
        id: "F",
        title: "Spelling Conventions in Older Texts",
        status: "not-mapped",
        engineDependencies: ["core/orthography"],
        notes: "Older spelling normalization not yet implemented",
    },
    {
        id: "G",
        title: "Suggested ...",
        status: "placeholder",
        engineDependencies: [],
        notes: "Title incomplete in source — content unknown",
    },
];
