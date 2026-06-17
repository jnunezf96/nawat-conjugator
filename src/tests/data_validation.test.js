"use strict";

const { createSuite } = require("./runner");
const {
    collectAndrewsTrajectoryErrors,
    collectStaticNncFixtureErrors,
    collectVisibleUiSpanishSurfaceErrors,
} = require("../../scripts/check_grammar_data");

function run() {
    const s = createSuite("data_validation");
    const currentStaticNnc = require("../../data/static_nnc.json");
    const currentStaticOptions = require("../../data/static_options.json");

    const validate = (data) => collectStaticNncFixtureErrors(data, currentStaticOptions);
    const messages = (data) => validate(data).join("\n");

    s.eq("static NNC validator is exported", typeof collectStaticNncFixtureErrors, "function");
    s.eq("current static NNC fixtures pass validation", validate(currentStaticNnc), []);
    s.eq("Andrews trajectory validator is exported", typeof collectAndrewsTrajectoryErrors, "function");
    s.eq("current Andrews trajectory contract passes validation", collectAndrewsTrajectoryErrors(), []);
    s.eq("visible Spanish UI validator is exported", typeof collectVisibleUiSpanishSurfaceErrors, "function");
    s.eq("current visible Spanish UI surface passes validation", collectVisibleUiSpanishSurfaceErrors(), []);
    s.ok(
        "visible Spanish UI validator rejects raw dynamic English LCM labels",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
                "labels.push(`Ruta LCM: ${[routeFamily, routeStage].filter(Boolean).join(\" / \")}`);",
                "labels.push(\"Generacion LCM: no autorizada\");",
                "labels.push(`Evidencia: ${evidenceStatus}`);",
                "labels.push(`Realizacion Nawat: ${spellingLabel}`);",
                "labels.push(`Falla LCM: ${[failedLayer, contractLayer].filter(Boolean).join(\" / \")}`);",
                "labels.push(`Diagnostico LCM: ${label}`);",
                "position ? `posicion: ${position}` : \"\";",
            ].join("\n"),
        }).join("\n").includes("dynamic visible LCM route label")
    );
    s.ok(
        "visible Spanish UI validator rejects export LCM headers",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
            exportSource: "const headers = [\"ruta LCM\", \"diagnóstico LCM\"];",
        }).join("\n").includes("src/ui/export/export.js export visible LCM header")
    );
    s.ok(
        "visible Spanish UI validator checks all static Spanish label sources",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: { bad: { labelEs: "Source route" } },
            staticOptions: { bad: { labelEs: "Regex Dev" } },
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
        }).join("\n").includes("data/static_modes.json Spanish labels")
    );
    s.ok(
        "visible Spanish UI validator checks visible HTML accessibility labels",
        collectVisibleUiSpanishSurfaceErrors({
            html: '<button aria-label="Abrir guía regex" title="Regex activo">?</button>',
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
        }).join("\n").includes("index.html visible attributes")
    );
    s.ok(
        "visible Spanish UI validator rejects leftover English utility labels",
        collectVisibleUiSpanishSurfaceErrors({
            html: '<main><span>Rule</span><span>Copyright</span></main>',
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
        }).join("\n").includes("English utility labels")
    );
    s.ok(
        "visible Spanish UI validator rejects non-formula shorthand and English slot labels",
        collectVisibleUiSpanishSurfaceErrors({
            html: '<main><span>Tamaño UI</span><span>Predicado (STEM)</span><span>Tip:</span><span>dir</span><span>inc</span><span>N>V</span><span>VI</span><span>VT</span><span>VB</span><span>CSV</span><span>Valencia CNV</span><span>Tablero CNV</span><span>CNN/N</span><button aria-label="Predicado STEM Slot A">STEM</button><button data-composer-entry-board="general">V</button><button data-ordinary-nnc-mode="true">N</button><button>CNV</button><button>CNN</button></main>',
            staticLabels: {
                active: { labelEs: "ACT" },
                nonactive: { labelEs: "NO ACT" },
            },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
                'continueSubLabel.textContent = "Adj VNC";',
                'labels.push("Objetivos Andrews NNC/VNC: 31");',
                'labels.push("Fuente Andrews: NNC absolutivo generado");',
            ].join("\n"),
            composerSource: [
                'return "Predicado (STEM)";',
                'return "STEM";',
                'const hint = `Sílabas detectadas (STEM): ${count}.`;',
                'return "N>V: tablero -> obj1/obj2 -> dir";',
                'return "CNV: tablero -> Valencia CNV -> fuente N";',
                'return "Genera primero para habilitar ANS";',
                'return "COP · copiar resultado";',
                'return "N";',
                '{ label: "Tip", description: "old note" }',
            ].join("\n"),
            eventsSource: 'content: "(STEM)";',
        }).join("\n").includes("non-formula shorthand")
    );
    s.ok(
        "visible Spanish UI validator rejects state-driven visible route shorthand",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
            stateSource: 'statusEl.textContent = "Partícula · diagnóstico Andrews; no genera VNC/CNN.";',
        }).join("\n").includes("src/ui/state.js dynamic particle route shorthand")
    );
    s.ok(
        "visible Spanish UI validator checks inline composer generated labels",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
            eventsSource: 'content: "(STEM)";',
        }).join("\n").includes("inline composer STEM marker")
    );
    s.ok(
        "visible Spanish UI validator checks inline composer valence abbreviations",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
            eventsSource: 'const embedLabel = "Elemento incorporado VI"; setInlineComposerTaggedLabel(input, "Incorp."); setInlineComposerTaggedLabel(input, "Obj.");',
        }).join("\n").includes("inline composer non-formula valence shorthand")
    );
    s.ok(
        "visible Spanish UI validator checks dynamic composer guidance strings",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: [
                "function formatVisibleLcmStatusLabel() {}",
                "function formatVisibleLcmRoutePartLabel() {}",
                "function formatVisibleLcmLayerLabel() {}",
                "function formatVisibleLcmDiagnosticLabel() {}",
            ].join("\n"),
            composerSource: [
                "return `Regex: disponible si el tronco inicia con i/y.`;",
                "const title = 'Regex activo';",
            ].join("\n"),
        }).join("\n").includes("src/ui/composer/composer.js dynamic pattern guidance")
    );
    s.ok(
        "visible Spanish UI validator requires dynamic LCM Spanish translators",
        collectVisibleUiSpanishSurfaceErrors({
            html: "<main>Entrada</main>",
            staticLabels: { ok: { labelEs: "Salida" } },
            staticModes: {},
            staticOptions: {},
            renderingSource: "",
        }).join("\n").includes("formatVisibleLcmStatusLabel")
    );

    s.ok(
        "static NNC validator rejects unknown states",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    construct: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("state \"construct\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown numbers",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            dual: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("number \"dual\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown possessors",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    possessive: {
                        numberFormsByPossessor: {
                            singular: {
                                nech: { surfaceForms: ["nechbad"] },
                            },
                        },
                    },
                },
            }],
        }).includes("possessor \"nech\" is not in static_options.possessivePrefixes")
    );
    s.ok(
        "static NNC validator rejects pseudo noun classes",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "lexical",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("nounClass \"lexical\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown animacy values",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "abstract",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("animacy \"abstract\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown plural-type fixture cells",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "animate",
                states: {
                    absolutive: {
                        numberForms: {
                            plural: {
                                surfaceForms: ["badmet"],
                                formsByPluralType: {
                                    collective: { surfaceForms: ["badwan"] },
                                },
                            },
                        },
                    },
                },
            }],
        }).includes("plural type \"collective\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects malformed surface forms",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad", "bad", ""] },
                        },
                    },
                },
            }],
        }).includes("surfaceForms contains duplicate values")
    );

    return s;
}

module.exports = { run };
