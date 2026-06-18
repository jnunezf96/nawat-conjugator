"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("ui");
    const html = fs.readFileSync(path.resolve(__dirname, "..", "..", "index.html"), "utf8");
    const css = fs.readFileSync(path.resolve(__dirname, "..", "..", "style.css"), "utf8");
    const staticLabels = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_labels.json"), "utf8");
    const staticModes = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_modes.json"), "utf8");
    const rendering = fs.readFileSync(path.resolve(__dirname, "..", "ui", "rendering", "rendering.js"), "utf8");
    const composer = fs.readFileSync(path.resolve(__dirname, "..", "ui", "composer", "composer.js"), "utf8");
    const events = fs.readFileSync(path.resolve(__dirname, "..", "ui", "events.js"), "utf8");
    const exportUi = fs.readFileSync(path.resolve(__dirname, "..", "ui", "export", "export.js"), "utf8");
    const state = fs.readFileSync(path.resolve(__dirname, "..", "ui", "state.js"), "utf8");
    const vncFacade = fs.readFileSync(path.resolve(__dirname, "..", "core", "vnc", "vnc.js"), "utf8");
    const concepts = fs.readFileSync(path.resolve(__dirname, "..", "core", "concepts", "concepts.js"), "utf8");
    const nncCompound = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "compound", "compound.js"), "utf8");
    const nncAdjectival = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "adjectival", "adjectival.js"), "utf8");
    const nncNominalization = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "nominalization", "nominalization.js"), "utf8");
    const nncNumerals = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "numerals", "numerals.js"), "utf8");
    const nncRelational = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "relational", "relational.js"), "utf8");
    const nncPlaceGentilic = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "place_gentilic", "place_gentilic.js"), "utf8");
    const particles = fs.readFileSync(path.resolve(__dirname, "..", "core", "particles", "particles.js"), "utf8");
    const sentence = fs.readFileSync(path.resolve(__dirname, "..", "core", "sentence", "sentence.js"), "utf8");
    const grammarFrame = fs.readFileSync(path.resolve(__dirname, "..", "core", "grammar", "frame.js"), "utf8");
    const frequentative = fs.readFileSync(path.resolve(__dirname, "..", "core", "derivation", "frequentative", "frequentative.js"), "utf8");
    const purposive = fs.readFileSync(path.resolve(__dirname, "..", "core", "vnc", "purposive", "purposive.js"), "utf8");
    const honorificPejorative = fs.readFileSync(path.resolve(__dirname, "..", "core", "vnc", "honorific_pejorative", "honorific_pejorative.js"), "utf8");
    const clause = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "clause.js"), "utf8");
    const modification = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "modification", "modification.js"), "utf8");
    const adverbial = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "adverbial", "adverbial.js"), "utf8");
    const adjunction = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "adjunction", "adjunction.js"), "utf8");
    const complement = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "complement", "complement.js"), "utf8");
    const conjunction = fs.readFileSync(path.resolve(__dirname, "..", "core", "clause", "conjunction", "conjunction.js"), "utf8");
    const comparison = fs.readFileSync(path.resolve(__dirname, "..", "core", "comparison", "comparison.js"), "utf8");
    const calendar = fs.readFileSync(path.resolve(__dirname, "..", "core", "calendar", "calendar.js"), "utf8");
    const nncNames = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "names", "names.js"), "utf8");
    const analysis = fs.readFileSync(path.resolve(__dirname, "..", "core", "analysis", "analysis.js"), "utf8");
    const panels = fs.readFileSync(path.resolve(__dirname, "..", "ui", "panels", "panels.js"), "utf8");
    const curriculum = fs.readFileSync(path.resolve(__dirname, "..", "ui", "curriculum", "curriculum.js"), "utf8");
    const tabsStart = html.indexOf('id="verb-entry-board-tabs"');
    const tabsEnd = html.indexOf('<div class="verb-block__utility-actions"', tabsStart);
    const tabsHtml = tabsStart >= 0 && tabsEnd > tabsStart
        ? html.slice(tabsStart, tabsEnd)
        : "";
    const nawatModeStart = html.indexOf('id="calc-nawat-mode-noun"');
    const nawatModeEnd = html.indexOf('id="calc-nawat-mode-particle"', nawatModeStart);
    const nawatModeHtml = nawatModeStart >= 0 && nawatModeEnd > nawatModeStart
        ? html.slice(nawatModeStart, nawatModeEnd)
        : "";
    const entradaComposerCssStart = css.indexOf("/* #1 Entrada operation order: grouped by grammar band. */");
    const entradaComposerCssEnd = css.indexOf("/* Functional button scale", entradaComposerCssStart);
    const entradaComposerCss = entradaComposerCssStart >= 0 && entradaComposerCssEnd > entradaComposerCssStart
        ? css.slice(entradaComposerCssStart, entradaComposerCssEnd)
        : "";

    s.ok(
        "ordinary NNC S control lives in the composer entry board tabs",
        tabsHtml.includes('id="verb-entry-board-ordinary-nnc"')
            && tabsHtml.includes('data-ordinary-nnc-mode="true"')
            && />\s*Nominal\s*<\/button>/.test(tabsHtml)
    );
    s.ok(
        "ordinary NNC S control is labeled as a nominal clause",
        tabsHtml.includes('aria-label="Tablero de cláusula nominal"')
            && tabsHtml.includes('title="Cláusula nominal"')
    );
    s.no(
        "ordinary NNC is not rendered as a Nawat mode operator chip",
        html.includes('id="calc-nawat-mode-ordinary-nnc"')
            || nawatModeHtml.includes('data-ordinary-nnc-mode="true"')
    );
    s.ok(
        "entry board tabs reserve columns for verbal, nominal, and verbalization",
        css.includes("grid-template-columns: repeat(3, minmax(44px, 1fr));")
            && css.includes("grid-template-columns: auto minmax(24px, auto) minmax(24px, auto) minmax(38px, auto);")
            && /#container-inputs #composer-slot-stage > \.verb-entry-board-tabs\s*\{[^}]*grid-column: 1;[^}]*justify-self: start;/s.test(css)
    );
    s.ok(
        "#1 Entrada composer is organized by operation-slot order per board",
        composer.includes("function syncComposerOperationSlotOrderMetadata")
            && composer.includes('stagePanel.dataset.operationBoard = board')
            && composer.includes('stagePanel.dataset.operationOrder = getComposerOperationOrderLabel(board)')
            && composer.includes('"Cláusula verbal: tablero -> valencia verbal -> direccional -> incorporado -> objeto 1/objeto 2 -> predicado base"')
            && composer.includes('"Cláusula nominal: tablero -> pers1-pers2 -> predicado base -> conector num1-num2 -> referencia"')
            && composer.includes('"Verbalización nominal: tablero -> fuente nominal -> verbalización -> valencia verbal -> objeto 1/objeto 2 -> direccional"')
            && composer.includes('setComposerOperationSlotMetadata(directionalHost, "directional-prefix", 10)')
            && composer.includes('setComposerOperationSlotMetadata(embedField, "incorporated-prefix", 20)')
            && composer.includes('setComposerOperationSlotMetadata(objectPair, "object-valency", 30)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "predicate-core", 40)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "nnc-predicate", 30)')
            && composer.includes('setComposerOperationSlotMetadata(classTabs, "nnc-num1-num2"')
            && composer.includes("const moveSlotContentChildren = (fromEl, toEl)")
            && composer.includes("const currentTopRow = Array.from(stagePanel.children)")
            && composer.includes('stagePanel.dataset.activeTransitivity = activeToken')
            && entradaComposerCss.includes("grid-template-areas:")
            && entradaComposerCss.includes('"entry switch"')
            && entradaComposerCss.includes('"source source"')
            && entradaComposerCss.includes('"operations operations"')
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__top-row")
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__bottom-row")
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="noun-to-verb"] > .verb-composer__top-row')
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="ordinary-nnc"] > .verb-composer__ordinary-nnc-class-tabs')
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="ordinary-nnc"] > .verb-composer__ordinary-nnc-controls')
            && !entradaComposerCss.includes("display: contents")
    );
    s.ok(
        "S->V composer verbalization chips carry Andrews/Nawat judgement without changing generation",
        composer.includes("function getComposerMatrixAffixAndrewsJudgment")
            && composer.includes("Andrews 54.2.1: inceptivo/estativo con ti.")
            && composer.includes("Andrews 54.2.2: Classical hui se realiza como Nawat wi.")
            && composer.includes("Andrews 55.7: i-a es transitivo y sensible a la fuente.")
            && composer.includes("Nawat · sin contrato Andrews")
            && composer.includes('triggerPrefix.textContent = currentState.triggerPrefix || getComposerMatrixAffixTriggerPrefix("manual")')
            && composer.includes("const shouldHidePrefix = false")
            && composer.includes("button.dataset.andrewsJudgment = andrewsJudgment.status || \"\"")
            && composer.includes("verb-composer__matrix-affix-chip-judge")
            && css.includes(".verb-composer__matrix-affix-chip-judge")
            && css.includes(".verb-composer__matrix-affix-chip.is-andrews-source-required")
            && css.includes(".verb-composer__matrix-affix-chip.is-andrews-nawat-only")
    );
    s.ok(
        "Andrews workspace starts at #1 Entrada without intro sections",
        html.includes('id="andrews-workspace"')
            && !html.includes('id="book-map"')
            && !html.includes('class="andrews-contract-strip"')
            && !html.includes('id="concept-glossary"')
            && html.includes('data-andrews-stage="source"')
            && html.includes('data-andrews-stage="formula-controls"')
            && html.includes('data-andrews-stage="output"')
            && css.includes(".andrews-workspace")
            && css.includes("grid-template-rows: minmax(0, 1fr);")
    );
    s.ok(
        "visible page shell follows Andrews nuclear-clause terminology",
        html.includes("<title>Conjugador de cláusulas nucleares nawat</title>")
            && html.includes('id="app-title"')
            && html.includes(">Conjugador de cláusulas nucleares nawat<")
            && html.includes('class="form-container-clause hero-panel hero-panel--entrada"')
            && html.includes('aria-label="Espacio gramatical Andrews: cláusulas nucleares"')
            && html.includes('aria-label="Banco de cláusulas nucleares Andrews"')
            && html.includes('data-ui-label-key="panel-stack-tab-inputs"')
            && html.includes('id="panel-stack-tab-formula"')
            && html.includes('data-ui-label-key="panel-stack-tab-formula"')
            && html.includes('data-ui-label-key="panel-stack-tab-output"')
            && html.includes('data-panel-stack-tab="formula"')
            && html.includes('data-panel-stack-pane="formula"')
            && html.includes('data-andrews-stage-label="2 Fórmula"')
            && html.includes(">FÓRMULA<")
            && !html.includes("Conjugador de verbos")
            && !html.includes("form-container-word")
            && !html.includes(">DERIVADA<")
    );
    s.eq(
        "static visible UI text excludes obsolete English grammar labels",
        (() => {
            const visibleHtmlText = html
                .replace(/<script[\s\S]*?<\/script>/gi, " ")
                .replace(/<style[\s\S]*?<\/style>/gi, " ")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            const labelEsValues = [];
            const collectLabelEs = (value) => {
                if (!value || typeof value !== "object") {
                    return;
                }
                Object.entries(value).forEach(([key, entry]) => {
                    if (key === "labelEs" && typeof entry === "string") {
                        labelEsValues.push(entry);
                    } else {
                        collectLabelEs(entry);
                    }
                });
            };
            collectLabelEs(JSON.parse(staticLabels));
            const labelEsText = labelEsValues.join(" ");
            return {
                htmlHasUnitFunction: /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function/i.test(visibleHtmlText),
                htmlHasEnglishSlotLabel: /\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b/.test(visibleHtmlText),
                htmlHasEnglishSlotShorthand: /\bSTEM\b|\bSlot\b|\bSlots\b|\bTip\b|Tamaño UI|\bUI\b|\bACT\b|\bNO\s+ACT\b|\bdir\b|\binc\b|\bN>V\b|CSV vista|\bCSV\b|Valencia CNV|Tablero CNV|CNN\/N|fuente N\b/.test(visibleHtmlText),
                htmlHasTnsShorthand: /\btns\b/i.test(visibleHtmlText),
                labelsHaveUnitFunction: /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function/i.test(labelEsText),
                labelsHaveEnglishSlotLabel: /\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b/.test(labelEsText),
                labelsHaveEnglishSlotShorthand: /\bSTEM\b|\bSlot\b|\bSlots\b|\bTip\b|Tamaño UI|\bUI\b|\bACT\b|\bNO\s+ACT\b|\bdir\b|\binc\b|\bN>V\b|CSV vista|\bCSV\b|Valencia CNV|Tablero CNV|CNN\/N|fuente N\b/.test(labelEsText),
                labelsHaveTnsShorthand: /\btns\b/i.test(labelEsText),
            };
        })(),
        {
            htmlHasUnitFunction: false,
            htmlHasEnglishSlotLabel: false,
            htmlHasEnglishSlotShorthand: false,
            htmlHasTnsShorthand: false,
            labelsHaveUnitFunction: false,
            labelsHaveEnglishSlotLabel: false,
            labelsHaveEnglishSlotShorthand: false,
            labelsHaveTnsShorthand: false,
        }
    );
    s.ok(
        "Lesson 4 HTML structure encodes Andrews formula architecture instead of only relabeling",
        html.includes('data-andrews-lesson="4"')
            && html.includes('data-andrews-unit="clausula-nuclear"')
            && html.includes('data-andrews-not-word="true"')
            && html.includes('data-andrews-layout="source-formula-output"')
            && html.includes('class="form-container panel nuclear-clause-source-panel"')
            && html.includes('data-andrews-formula-role="predicate-stem-source"')
            && html.includes('class="verb-block nuclear-clause-entry"')
            && html.includes('data-andrews-input="stem-or-particle"')
            && html.includes('data-andrews-formula-slot="person-prefix"')
            && html.includes('data-andrews-formula-slot="number-suffix"')
            && html.includes('class="panel tense-tabs-panel formula-controls-panel panel-stack-pane"')
            && html.includes('data-andrews-general-formula="subject-predicate"')
            && html.includes('data-andrews-subject-formula="#person+...+number#"')
            && html.includes('data-andrews-vnc-predicate="valence+stem+tense"')
            && html.includes('data-andrews-nnc-predicate="state+stem"')
            && html.includes('data-andrews-vnc-layers="verbstem > verbcore > predicate > CNV"')
            && html.includes('data-andrews-nnc-layers="nounstem > nouncore/predicate > CNN"')
            && html.includes('class="calc-operators formula-controls-grid"')
            && html.includes('formula-controls-section--unit"')
            && html.includes('data-andrews-formula-role="clause-kind"')
            && html.includes('formula-controls-section--predicate-route"')
            && html.includes('class="tense-tabs formula-slot-controls"')
            && html.includes('data-andrews-vnc-slot="tns"')
            && html.includes('data-andrews-nnc-slot="st"')
            && html.includes('class="panel container-tense-grid nuclear-clause-output-panel panel-stack-pane"')
            && html.includes('data-andrews-renders="subject-predicate-formula"')
            && state.includes('var PANEL_STACK_ORDER = ["inputs", "formula", "output"]')
            && state.includes('mode === "formula" || mode === "tense"')
    );
    s.ok(
        "ordinary NNC entry surface hides denominal suffix controls",
        css.includes('.verb-composer[data-entry-board="ordinary-nnc"] .verb-composer__matrix-affix-picker')
            && css.includes('.verb-composer[data-entry-board="ordinary-nnc"] .verb-composer__serial-type-chips')
            && css.includes('.verb-composer[data-entry-board="ordinary-nnc"] .verb-composer__slot-tabs:not(.verb-composer__ordinary-nnc-class-tabs)')
            && css.includes('.verb-composer[data-entry-board="ordinary-nnc"] .verb-composer__embed-field')
            && css.includes('.verb-composer[data-entry-board="ordinary-nnc"] .verb-composer__bottom-row')
    );
    s.ok(
        "verb composer labels use Andrews slot vocabulary instead of old root labels",
        composer.includes("function getComposerMatrixFieldLabel")
            && composer.includes("function getComposerMatrixInputTagLabel")
            && composer.includes('return "Predicado (base)"')
            && composer.includes('return "Fuente nominal (base)"')
            && composer.includes('return "base"')
            && composer.includes('return "nominal"')
            && html.includes('aria-label="Tablero de cláusula verbal"')
            && html.includes('aria-label="Tablero de verbalización nominal"')
            && html.includes(">Predicado (base)<")
            && html.includes(">Incorporado<")
            && html.includes(">Objeto 1/reflexivo<")
            && html.includes(">Objeto 1/objeto 2/reflexivo<")
            && composer.includes('{ label: "Consejo"')
            && panels.includes('entry.label === "Consejo"')
            && events.includes('content: "(base)"')
            && !events.includes('content: "(STEM)"')
            && html.includes(">Direccional<")
            && html.includes(">incorporado<")
            && !html.includes(">Raíz matriz<")
            && !html.includes(">Elemento incorporado<")
            && !html.includes(">Marcador no específico<")
            && !composer.includes('"Tronco predicado"')
            && !composer.includes('"Raíz matriz"')
    );
    s.ok(
        "Lesson 1 concept registry remains non-generative while visible glossary is omitted",
        html.includes("src/core/concepts/concepts.js")
            && !html.includes('id="concept-glossary"')
            && !html.includes("Lección 1 · Andrews OS")
            && !html.includes("Notación y términos")
            && concepts.includes("concept-glossary-metadata")
            && concepts.includes("buildConceptGlossaryDisplayModel")
            && concepts.includes("cláusula nuclear verbal")
            && concepts.includes("cláusula nuclear nominal")
            && concepts.includes("generationAllowed: false")
            && concepts.includes("concept glossary is not generation")
            && curriculum.includes("function initConceptGlossaryPanel")
            && curriculum.includes("buildConceptGlossaryDisplayModel({ lesson: 1 })")
            && curriculum.includes("concept-glossary__item")
    );
    s.ok(
        "#2 mode controls separate Andrews syntactical class from formal class so adjectival use can apply to verbal or nominal nuclear clauses",
        html.includes('aria-label="Clase sintáctica y clase formal"')
            && html.includes(">Clase sintáctica / clase formal<")
            && !html.includes("Unidad y función")
            && html.includes('id="calc-mode-operator-label"')
            && html.includes('data-ui-label-key="calc-mode-operator-label"')
            && html.includes('id="calc-mode-system-function"')
            && html.includes('data-ui-label-key="mode-system-function"')
            && html.includes('data-mode-system="function"')
            && html.includes('data-mode-role="function"')
            && />\s*Clase sintáctica\s*<\/div>/.test(html)
            && html.includes('data-function-role="verbal"')
            && html.includes('data-function-role="nominal"')
            && html.includes('data-function-role="adjectival"')
            && html.includes('data-function-role="adverbial"')
            && html.includes('aria-label="Clase sintáctica verbal"')
            && html.includes('aria-label="Clase sintáctica nominal"')
            && html.includes('aria-label="Clase sintáctica adjetival"')
            && html.includes('aria-label="Clase sintáctica adverbial"')
            && !html.includes('aria-label="Función verbal"')
            && !html.includes('title="Función verbal"')
            && html.includes('data-ui-label-key="tense-tabs-function-adjectival"')
            && />\s*Adjetival\s*<\/button>/.test(html)
            && html.includes('id="calc-mode-system-unit"')
            && html.includes('data-ui-label-key="mode-system-unit"')
            && html.includes('data-mode-system="unit"')
            && html.includes('data-mode-role="unit"')
            && />\s*Clase formal\s*<\/div>/.test(html)
            && html.includes('data-unit-kind="cnv"')
            && html.includes('data-unit-kind="cnn"')
            && html.includes('data-unit-kind="particula"')
            && html.includes('data-ui-label-key="tense-tabs-unit-cnv"')
            && html.includes('data-ui-label-key="tense-tabs-unit-cnn"')
            && />\s*Cláusula verbal\s*<\/button>/.test(html)
            && />\s*Cláusula nominal\s*<\/button>/.test(html)
            && !html.includes("Convención europea")
            && !html.includes('data-mode-system="european"')
            && !html.includes('data-mode-system="nawat"')
            && !html.includes('data-ui-label-key="mode-system-european"')
            && !html.includes('id="calc-mode-system-nawat"')
            && staticLabels.includes('"mode-system-function"')
            && staticLabels.includes('"tense-tabs-function-adjectival"')
            && staticLabels.includes('"labelEs": "Clase sintáctica"')
            && staticLabels.includes('"labelEs": "Clase formal"')
            && !staticLabels.includes("convención europea")
            && !staticLabels.includes('"labelEs": "nawat"')
            && staticLabels.includes('"tense-tabs-unit-cnv"')
            && staticModes.includes('"function": { "value": "function"')
            && staticModes.includes('"unit": { "value": "unit"')
            && staticModes.includes('"labelEs": "Clase sintáctica"')
            && staticModes.includes('"labelEs": "Clase formal"')
    );
    s.ok(
        "Lesson 3 particle metadata reaches browser runtime as enabled diagnostic Partícula mode",
        html.includes("src/core/particles/particles.js")
            && html.includes('id="calc-nawat-mode-particle"')
            && html.includes('data-tense-mode="particula"')
            && html.includes('data-mode-system="unit"')
            && !html.includes('id="calc-nawat-mode-particle"\n                            role="tab"\n                            aria-selected="false"\n                            aria-disabled="true"')
            && !html.includes('id="calc-nawat-mode-particle"\n                            role="tab"\n                            aria-selected="false"\n                            aria-disabled="true"\n                            disabled')
            && particles.includes("particle-inventory-boundary")
            && particles.includes("particle-mode-display-model")
            && particles.includes("particle-seed-inventory-entry")
            && particles.includes("getParticleLesson3InventoryGroups")
            && particles.includes("3.2 Clases funcionales")
            && particles.includes("3.3 Negación")
            && particles.includes("3.4 Colocaciones")
            && particles.includes("3.5 Honorificadas")
            && particles.includes("andrews-orthography-adapted")
            && particles.includes("particle-candidate-stem-syntax")
            && particles.includes("clause-introducer")
            && particles.includes("colocación de partículas")
            && particles.includes("particle placement metadata is not particle generation")
            && particles.includes("generationAllowed: false")
            && rendering.includes("function renderParticleModeConjugations")
            && rendering.includes("function applyOutputPanelShellForTenseMode")
            && rendering.includes('outputPanel.classList.toggle("container-tense-grid--particle", isParticleMode)')
            && rendering.includes('titleText.textContent = isParticleMode ? "PARTÍCULAS" : "SALIDA"')
            && rendering.includes('metaStrip.classList.toggle("output-meta-strip--particle", isParticleMode)')
            && rendering.includes('resultControls.classList.toggle("output-result-controls--particle", isParticleMode)')
            && rendering.includes('outputList.classList.toggle("all-tense-conjugations--particle", isParticleMode)')
            && rendering.includes("const particleEvaluation = {")
            && rendering.includes("applyGrammarFrameRouteDataset(row, frameModel)")
            && rendering.includes("row.dataset.exportInput")
            && rendering.includes("row.dataset.particleSourceForm")
            && rendering.includes("row.dataset.particleSection")
            && rendering.includes("row.dataset.particleEvidenceStatus")
            && rendering.includes('row.className = "particle-row conjugation-row--particle"')
            && rendering.includes('grid.classList.add("particle-mode-grid")')
            && rendering.includes('["particle-row__class", "Función"]')
            && rendering.includes('["particle-row__status", "Estado"]')
            && rendering.includes("model.inventoryGroups")
            && rendering.includes("particle-panel--group")
            && !rendering.includes('row.className = "conjugation-row conjugation-row--particle"')
            && css.includes(".particle-row")
            && css.includes(".particle-row__status")
            && css.includes(".particle-group-title__count")
            && css.includes(".particle-mode-grid")
            && css.includes("#container-tense-grid.container-tense-grid--particle")
            && css.includes(".output-meta-strip .calc-summary")
            && css.includes(".output-result-controls--particle")
            && css.includes("#all-tense-conjugations.all-tense-conjugations--particle")
            && rendering.includes("Partículas · Andrews Lección 3")
            && !rendering.includes("Partícula · Andrews Lesson 3")
            && exportUi.includes("function buildParticleViewExportCSV")
            && exportUi.includes('"entrada Nawat"')
            && exportUi.includes('"fuente Andrews"')
            && exportUi.includes('"clase funcional"')
            && exportUi.includes('diagnosticId === "particle-candidate-empty"')
            && state.includes('"Partículas · Andrews Lección 3", "inventario diagnóstico", "sin generación"')
            && state.includes("mode === TENSE_MODE.particula")
            && panels.includes("tenseMode === TENSE_MODE.particula")
    );
    s.ok(
        "Lesson 8 sentence layer metadata reaches browser runtime without generation",
        html.includes("src/core/sentence/sentence.js")
            && sentence.includes("sentence-layer-metadata")
            && sentence.includes("negation")
            && sentence.includes("question")
            && sentence.includes("emphasis")
            && sentence.includes("sentence-mood")
            && sentence.includes("generationAllowed: false")
            && sentence.includes("finite optative/admonitive form is not full sentence mood semantics")
    );
    s.ok(
        "LCM grammar frame contract reaches browser runtime before route generation",
        html.includes("src/core/grammar/frame.js")
            && html.indexOf("src/core/grammar/frame.js") < html.indexOf("src/core/generation/engine.js")
            && grammarFrame.includes("authorityFrame")
            && grammarFrame.includes("routeContract")
            && grammarFrame.includes("diagnosticFrame")
            && grammarFrame.includes("buildGrammarFrame")
            && grammarFrame.includes("buildGrammarResultContract")
    );
    s.ok(
        "Lesson 27 frequentative boundary reaches browser runtime without changing reduplication helpers",
        html.includes("src/core/derivation/frequentative/frequentative.js")
            && frequentative.includes("frequentative-boundary")
            && frequentative.includes("generic reduplication is not a frequentative derivation engine")
            && frequentative.includes("changesExistingReduplicationHelpers: false")
            && frequentative.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 29 purposive boundary reaches browser runtime without changing directional generation",
        html.includes("src/core/vnc/purposive/purposive.js")
            && purposive.includes("purposive-directional-boundary")
            && purposive.includes("directional prefix mechanics are not purposive VNC generation")
            && purposive.includes("changesDirectionalGeneration: false")
            && purposive.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 31-32 compound/affective NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/compound/compound.js")
            && nncCompound.includes("compound-nnc-affective-boundary")
            && nncCompound.includes("VNC compoundAst metadata is not compound NNC generation")
            && nncCompound.includes("changesOrdinaryNncGeneration: false")
            && nncCompound.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 35-39 nominalization boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/nominalization/nominalization.js")
            && nncNominalization.includes("nominalization-boundary")
            && nncNominalization.includes("nominalizationProfile is explanatory metadata")
            && nncNominalization.includes("changesGeneratedSurfaces: false")
            && nncNominalization.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 40-41 adjectival NNC function boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/adjectival/adjectival.js")
            && nncAdjectival.includes("adjectival-nnc-function-boundary")
            && nncAdjectival.includes("adjetivo route output is a generated surface")
            && nncAdjectival.includes("changesAdjectiveGeneration: false")
            && nncAdjectival.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 33 honorific/pejorative boundary reaches browser runtime without generation",
        html.includes("src/core/vnc/honorific_pejorative/honorific_pejorative.js")
            && honorificPejorative.includes("honorific-pejorative-boundary")
            && honorificPejorative.includes("ordinary causative/applicative derivation is not honorific or pejorative VNC generation")
            && honorificPejorative.includes("changesVncGeneration: false")
            && honorificPejorative.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 34 numeral NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/numerals/numerals.js")
            && nncNumerals.includes("numeral-nnc-boundary")
            && nncNumerals.includes("ordinary NNC open-stem output is not numeral NNC fixture evidence")
            && nncNumerals.includes("changesOrdinaryNncGeneration: false")
            && nncNumerals.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 45-47 relational NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/relational/relational.js")
            && nncRelational.includes("relational-nnc-boundary")
            && nncRelational.includes("locative-temporal nominal outputs are not full relational NNC options")
            && nncRelational.includes("changesOrdinaryNncGeneration: false")
            && nncRelational.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 48 place/gentilic NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/place_gentilic/place_gentilic.js")
            && nncPlaceGentilic.includes("place-gentilic-nnc-boundary")
            && nncPlaceGentilic.includes("locative-temporal nominal outputs are not place-name NNC evidence")
            && nncPlaceGentilic.includes("changesOrdinaryNncGeneration: false")
            && nncPlaceGentilic.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 42-43 adjectival modification boundary reaches browser runtime without generation",
        html.includes("src/core/clause/modification/modification.js")
            && modification.includes("adjectival-modification-boundary")
            && modification.includes("adjetivo route output is not a clause-level modification AST")
            && modification.includes("changesAdjectiveGeneration: false")
            && modification.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 44 adverbial nuclear boundary reaches browser runtime without generation",
        html.includes("src/core/clause/adverbial/adverbial.js")
            && adverbial.includes("adverbial-nuclear-boundary")
            && adverbial.includes("configured adverbio word output is not a full Lesson 44 engine")
            && adverbial.includes("changesAdverbioGeneration: false")
            && adverbial.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 49-50 adverbial adjunction boundary reaches browser runtime without generation",
        html.includes("src/core/clause/adjunction/adjunction.js")
            && adjunction.includes("adverbial-adjunction-boundary")
            && adjunction.includes("single generated NNC or VNC words do not prove adjoined-unit relations")
            && adjunction.includes("changesVncGeneration: false")
            && adjunction.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 51 complement boundary reaches browser runtime without generation",
        html.includes("src/core/clause/complement/complement.js")
            && complement.includes("complement-clause-boundary")
            && complement.includes("object controls and subject labels are not complement-clause evidence")
            && complement.includes("changesValencyBehavior: false")
            && complement.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 52 conjunction boundary reaches browser runtime without generation",
        html.includes("src/core/clause/conjunction/conjunction.js")
            && conjunction.includes("conjunction-clause-boundary")
            && conjunction.includes("parser separators and slash variants are not conjunction AST evidence")
            && conjunction.includes("changesParserBehavior: false")
            && conjunction.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 53 comparison boundary reaches browser runtime without generation",
        html.includes("src/core/comparison/comparison.js")
            && comparison.includes("comparison-boundary")
            && comparison.includes("adjective-like word output is not comparison syntax")
            && comparison.includes("changesAdjectiveGeneration: false")
            && comparison.includes("generationAllowed: false")
    );
    s.ok(
        "Appendix E calendar-name boundary reaches browser runtime without generation",
        html.includes("src/core/calendar/calendar.js")
            && calendar.includes("calendar-name-boundary")
            && calendar.includes("day, month, year, or cycle labels are not Nawat/Pipil calendar-name fixture data")
            && calendar.includes("changesNncGeneration: false")
            && calendar.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 56 personal-name NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/names/names.js")
            && nncNames.includes("personal-name-nnc-boundary")
            && nncNames.includes("capitalization labels and proper-name translations are not Nawat/Pipil name evidence")
            && nncNames.includes("changesOrdinaryNncGeneration: false")
            && nncNames.includes("generationAllowed: false")
    );
    s.ok(
        "Lessons 57-58 analysis boundary reaches browser runtime without generation",
        html.includes("src/core/analysis/analysis.js")
            && analysis.includes("analysis-boundary")
            && analysis.includes("topic/focus UI labels are not absolute-topic evidence")
            && analysis.includes("changesParserBehavior: false")
            && analysis.includes("generationAllowed: false")
    );
    s.ok(
        "orthography bridge metadata reaches input and status UI without generation",
        composer.includes("orthographyClassification")
            && composer.includes("classifyOrthographyInput(troncoInputSource.parseValue || troncoInputSource.rawValue || \"\")")
            && state.includes("function getOrthographyBridgeStatusInfo")
            && state.includes("Ortografia: correspondencia candidata; requiere evidencia Nawat/Pipil.")
            && state.includes("Ortografia: correspondencia bloqueada; no genera formas.")
            && state.includes('statusEl.dataset.orthographyBridge = "true"')
            && state.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 4 nuclear clause shell reaches summary UI without driving generation",
        html.includes("src/core/clause/clause.js")
            && state.includes("function getCurrentNuclearClauseShell")
            && state.includes("buildNuclearClauseShellMetadata")
            && state.includes("clauseLabel")
            && clause.includes("getNuclearClauseDisplayLabel(formulaType)")
            && clause.includes("formulaAbbreviation")
            && clause.includes("getNuclearClauseLesson4FormulaInventory")
            && clause.includes("buildNuclearClauseLesson4Frame")
            && clause.includes("buildNuclearClauseLesson4UseFrame")
            && clause.includes("getNuclearClauseLesson4PredicateFunctionProfile")
            && clause.includes("buildNuclearClauseLesson4DiagramTree")
            && clause.includes("buildNuclearClauseLesson4PredicatePositionControlFrame")
            && clause.includes("buildNuclearClauseLesson4PersonalPronounResolutionFrame")
            && clause.includes("#pers1-pers2+va1-va2(STEM)tns+num1-num2#")
            && clause.includes("#pers1-pers2+st1-st2(STEM)num1-num2#")
            && clause.includes("objectiveCaseOnlyInVncPredicate")
            && clause.includes("possessiveCaseOnlyInNncPredicate")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.vnc")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.nnc")
    );
    s.ok(
        "Lesson 4 nuclear clause shell labels reach generated output rows",
        rendering.includes("function buildNuclearClauseShellSubLabels")
            && rendering.includes("function appendNuclearClauseShellSubLabels")
            && rendering.includes("function appendLesson4NuclearClauseInspector")
            && rendering.includes("function appendLesson4CompactDiagram")
            && rendering.includes("function createLesson4InspectorPanel")
            && rendering.includes("function collectLesson4TreeNodes")
            && rendering.includes("result.nuclearClauseShell")
            && rendering.includes("evaluation.result?.nuclearClauseShell")
            && rendering.includes("Andrews Lección 4")
            && rendering.includes("cláusula nuclear")
            && rendering.includes("sin generación")
            && rendering.includes("pronombres")
            && rendering.includes("referencia: contexto")
            && rendering.includes("jerarquía")
            && rendering.includes("lesson4?.activeFormula")
            && rendering.includes("function formatVisibleAndrewsFormula")
            && rendering.includes("function formatVisibleAndrewsSlotToken")
            && rendering.includes('formula ? `${label}: ${formatVisibleAndrewsFormula(formula)}` : label')
            && css.includes(".lesson4-inspector")
            && css.includes(".lesson4-inspector__body")
            && css.includes(".lesson4-inspector__panel")
            && css.includes(".lesson4-inspector__diagram")
            && css.includes(".lesson4-inspector__diagram-branches")
            && css.includes(".lesson4-inspector__formula-option.is-active")
    );
    s.ok(
        "ordinary NNC entrada uses analogue input and digital composer controls",
        composer.includes("parseComposerOrdinaryNncAnalogueInput")
            && composer.includes("formatComposerOrdinaryNncAnalogueInput")
            && composer.includes("buildComposerOrdinaryNncInputBundle")
            && composer.includes('uiState.nounClass || parsedFallback?.nounClass || ""')
            && composer.includes('selectionRequired = !nounClass')
            && composer.includes('"ordinary-nnc-animacy"')
            && composer.includes("function isComposerTransitivitySelected")
            && composer.includes('selectionRequired: "transitivity"')
            && composer.includes("function runVerbInputRefresh()")
            && composer.includes("const verbMeta = getVerbInputMeta();")
            && composer.includes("renderActiveConjugations({")
            && composer.includes("verb: verbMeta.displayVerb")
            && composer.includes("renderComposerOrdinaryNncDigitalControls")
            && composer.includes('controls.id = "composer-ordinary-nnc-controls"')
            && composer.includes('classTabs.id = "composer-ordinary-nnc-class-tabs"')
            && composer.includes('classTabs.className = "verb-composer__slot-tabs verb-composer__ordinary-nnc-class-tabs"')
            && composer.includes('labelEl.textContent = "Conector num1-num2"')
            && composer.includes('button.className = "verb-composer__slot-transitivity verb-composer__slot-tab"')
            && !composer.includes('label: "Clase"')
            && composer.includes('label: "Animacidad"')
            && !composer.includes('label: "Sujeto"')
            && !composer.includes('label: "Poseedor"')
            && !composer.includes('label: "Referencia"')
            && !composer.includes('label: "Tipo"')
            && composer.includes('classTabs.setAttribute("aria-label", "Conector num1-num2 de la cláusula nominal")')
            && composer.includes('classTabs.dataset.fixtureNounClass = fixedClass')
            && composer.includes('const displayedClass = normalizeComposerOrdinaryNncNounClass(activeClass || "") || fixedClass')
            && composer.includes('const activeClass = normalizeComposerOrdinaryNncNounClass(state.nounClass || "")')
            && composer.includes('|| parsedInputClass')
            && composer.includes('|| fixtureClass')
            && composer.includes('button.dataset.fixtureAlternative = "true"')
            && composer.includes('button.dataset.fixtureNounClass = fixedClass')
            && composer.includes('button.classList.add("is-fixture-alternative")')
            && !composer.includes("bloqueado por ficha: conector")
            && composer.includes('const currentStem = currentAnalogue?.stem || getComposerActiveStemValue()')
            && composer.includes('setComposerActiveSlotStem(normalizeComposerStem(currentStem))')
            && composer.includes("syncEntradaUrlSegmentsFromCurrentState({ replace: true })")
            && composer.includes("function syncComposerOrdinaryNncClassTabActiveState")
            && composer.includes("syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass)")
            && composer.includes("window.setTimeout(() => {")
            && composer.includes('const rawInputValue = document.getElementById("verb")?.value || ""')
            && composer.includes('const parsedInputClass = normalizeComposerOrdinaryNncNounClass(')
            && composer.includes('uiState.nounClass || parsedFallback?.nounClass || ""')
            && composer.includes('const selectedAnimacy = (')
            && composer.includes(') || fixtureAnimacy')
            && composer.includes('const hasFixtureAnimacy = Boolean(fixtureAnimacy)')
            && !composer.includes("Animacidad fija")
            && !composer.includes('disabled: animacyIsFixed')
            && !composer.includes("bloqueado por ficha: animado")
            && !composer.includes("bloqueado por ficha: inanimado")
            && composer.includes('title: "clase t: (...V)t"')
            && composer.includes('title: "clase ti: (...C)ti"')
            && composer.includes('title: "clase in: (...C)in"')
            && composer.includes('title: "clase Ø: (...C/V)"')
            && rendering.includes("Selecciona un conector de número para saber su salida.")
            && rendering.includes("Selecciona una animacidad para saber su salida.")
            && rendering.includes("Selecciona una transitividad para saber su salida.")
            && html.includes('<option value="">Selecciona transitividad</option>')
            && css.includes(".verb-composer__ordinary-nnc-controls")
            && css.includes(".verb-composer__ordinary-nnc-class-tabs")
            && css.includes(".verb-composer__ordinary-nnc-class-tabs .verb-composer__slot-tab.is-active")
            && css.includes(".verb-composer__ordinary-nnc-chip.is-active")
            && css.includes("rgba(18, 107, 97, 0.38)")
            && css.includes("#container-inputs #composer-slot-stage > .verb-composer__ordinary-nnc-controls")
    );
    s.ok(
        "ordinary NNC connector visual state is synchronized before generation refresh can block",
        (() => {
            const start = composer.indexOf("function setComposerOrdinaryNncState");
            const end = composer.indexOf("function appendComposerOrdinaryNncChipGroup", start);
            const body = start >= 0 && end > start ? composer.slice(start, end) : "";
            return body.indexOf("syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass)")
                < body.indexOf("applyComposerStateToVerbInput({")
                && body.indexOf("applyComposerStateToVerbInput({") >= 0
                && body.lastIndexOf("syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass)")
                    > body.indexOf("syncEntradaUrlSegmentsFromCurrentState({ replace: true })");
        })()
    );
    s.ok(
        "entrada URL segments are wired to #1 Entrada composer state",
        composer.includes("ENTRADA_URL_SEGMENT_SCHEMA")
            && composer.includes("function buildEntradaUrlSegmentString")
            && composer.includes("function parseEntradaUrlSegmentString")
            && composer.includes("function initEntradaUrlSegments")
            && composer.includes('target.closest("#container-inputs")')
            && composer.includes('"ordinaryNncNounClass"')
            && composer.includes('"slotATemplateTiCausativeClass"')
            && events.includes("initEntradaUrlSegments()")
    );
    s.ok(
        "ordinary NNC output uses a nominal-clause block with shared controls",
        rendering.includes("tense-block tense-block--noun-shared-controls tense-block--ordinary-nnc-controls")
            && rendering.includes("tense-block tense-block--ordinary-nnc")
            && rendering.includes('label.textContent = "Cláusula nominal"')
            && !rendering.includes('label.textContent = "Sustantivo ordinario"')
            && !rendering.includes('visibleLabel: "Clase"')
            && !rendering.includes('ariaLabel: "Clase del conector de numero del sujeto"')
            && !rendering.includes('visibleLabel: "Animacidad"')
            && rendering.includes('visibleLabel: ANDREWS_RENDERING_TERMS.pers1Pers2')
            && rendering.includes('visibleLabel: "Estado/poseedor"')
            && rendering.includes('ariaLabel: "Estado/poseedor"')
            && rendering.includes('id: "", label: "Ø", title: "predicado absolutivo: poseedor Ø"')
            && rendering.includes("probeOrdinaryNncCandidate")
            && rendering.includes("candidate?.nncBasic?.categoryProfile?.possessiveState")
            && rendering.includes("possessiveProfile?.markingAvailable === true")
            && rendering.includes('button.dataset.availabilityState = option.availabilityState')
            && rendering.includes('button.dataset.selectedUnsupported = "true"')
            && rendering.includes('button.classList.add("is-unavailable")')
            && !rendering.includes('visibleLabel: "Estado"')
            && rendering.includes('visibleLabel: "Referencia"')
            && rendering.includes('visibleLabel: "Referencia plural"')
            && rendering.includes('label: "Comun"')
            && rendering.includes('title: "referencia distributiva no animada"')
            && rendering.includes("getOrdinaryNncSubjectMarkerLabel")
            && rendering.includes('return `${prefix || "Ø"}...${suffix || "Ø"}`;')
            && rendering.includes("label: getOrdinaryNncSubjectMarkerLabel(entry)")
            && rendering.includes('`clase sustantiva ${rowNounClassLabel}`')
            && rendering.includes("result.nncBasic?.subject?.affixLabel")
            && rendering.includes("rowCategoryProfile")
            && rendering.includes("rowCategoryProfile?.predicateState?.label")
            && rendering.includes("rowCategoryProfile?.animacy?.label")
            && rendering.includes("rowCategoryProfile?.reference?.label")
            && rendering.includes("rowCategoryProfile?.possessiveState")
            && rendering.includes("ANDREWS_RENDERING_TERMS.predicateState")
            && rendering.includes("animacidad:")
            && rendering.includes("referencia:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.num1Num2")
            && rendering.includes("marcacion posesiva:")
            && rendering.includes("rowFormulaSlots")
            && rendering.includes("buildOrdinaryNncFormulaEchoFromSlots(rowFormulaSlots)")
            && rendering.includes("ANDREWS_RENDERING_TERMS.nncFormula")
            && rendering.includes("rowConnectorSlotLabel")
            && rendering.includes("const rowConnectorSurface = rowConnectorSlot")
            && rendering.includes("resolveNominalNum1Num2Surface(")
            && rendering.includes("rowConnectorSlot,")
            && rendering.includes('"num1-num2"')
            && rendering.includes("rowPredicateFormula")
            && rendering.includes("result.nncBasic?.predicate?.formula || result.predicateFormula")
            && rendering.includes("getConjugationNoOutputDisplay")
            && rendering.includes("conjugation-value--no-output")
            && rendering.includes('`poseedor ${result.possessor?.prefix || state.possessor || "nu"}`')
            && rendering.includes("personLabel.textContent = `${ANDREWS_RENDERING_TERMS.pers1Pers2} ${result.nncBasic?.subject?.affixLabel || getOrdinaryNncSubjectMarkerLabel(rowSubject)}`")
    );
    s.ok(
        "shared sustantivo renderer labels subject number connectors",
        rendering.includes("buildNominalNum1Num2SubLabel")
            && rendering.includes("resolveNominalNum1Num2Surface")
            && rendering.includes('num1Num2')
            && rendering.includes('nominalClauseFrame?.subject?.numberConnector')
            && rendering.includes('return `conector ${connectorSurface || "Ø"}`;')
            && rendering.includes("appendNominalNum1Num2SubLabel(basePersonSub, num1Num2Label)")
    );
    s.eq(
        "shared renderer subject-number connector labels read LCM result frames before stale display fields",
        (() => {
            if (typeof ctx.resolveNominalNum1Num2Surface !== "function") {
                return {
                    framed: "rendering-runtime-not-loaded",
                    empty: "rendering-runtime-not-loaded",
                    stale: "rendering-runtime-not-loaded",
                };
            }
            const framedConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-connector",
                    }),
                }),
            };
            const emptyConnector = {
                surface: "stale-connector",
                displaySurface: "stale-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            };
            return {
                framed: ctx.resolveNominalNum1Num2Surface(framedConnector, "fallback-connector"),
                empty: ctx.resolveNominalNum1Num2Surface(emptyConnector, "fallback-connector"),
                stale: ctx.resolveNominalNum1Num2Surface({
                    surface: "stale-connector",
                    displaySurface: "stale-display",
                }, "fallback-connector"),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                framed: "frame-connector",
                empty: "",
                stale: "stale-display",
            }
            : {
                framed: "rendering-runtime-not-loaded",
                empty: "rendering-runtime-not-loaded",
                stale: "rendering-runtime-not-loaded",
            }
    );
    s.ok(
        "generated output panes render explicit no-output text instead of blank dash placeholders",
        typeof ctx.getConjugationNoOutputDisplay === "function"
            && typeof ctx.normalizeConjugationDisplayText === "function"
            && rendering.includes("Sin salidas en este grupo.")
            && state.includes("Sin antiderivada calculada.")
            && css.includes(".conjugation-value--no-output")
            && css.includes("border-left-width: 3px")
    );
    s.ok(
        "calc-guidance continuation chips use organized wrapping grids",
        rendering.includes("createConjugationConversionActionsContainer")
            && rendering.includes("applyConjugationConversionColumnLayout")
            && rendering.includes("conjugation-row--conversion-columns")
            && rendering.includes("conjugation-conversion-source-column")
            && rendering.includes("conjugation-conversion-target-column")
            && rendering.includes("resolveContinuationActionGroupMeta")
            && rendering.includes("appendContinuationAction")
            && rendering.includes("conjugation-continuation-group")
            && rendering.includes('eyebrow: "Sustantivo"')
            && rendering.includes('title: "Patientivo"')
            && rendering.includes('eyebrow: "Adjetivo"')
            && rendering.includes('title: "Compuesto"')
            && css.includes(".calc-guidance__chips")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 7.5rem), max-content));")
            && css.includes(".conjugation-row--conversion-columns")
            && css.includes(".conjugation-conversion-source-column")
            && css.includes(".conjugation-conversion-target-column")
            && css.includes(".conjugation-conversion-actions")
            && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")
            && css.includes(".conjugation-conversion-target-column > .conjugation-value--conversion-source")
            && css.includes("max-width: 100%;")
            && css.includes(".conjugation-continuation-group__header")
            && css.includes(".conjugation-continuation-group__chips")
            && css.includes(".calc-guidance__chip--mode-adjetivo")
            && css.includes(".tense-block--adjectival-nnc-function")
            && css.includes(".conjugation-conversion-actions .calc-guidance__chip")
            && css.includes("@container (max-width: 560px)")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 34rem), 1fr));")
    );
    s.ok(
        "ordinary NNC #3 salida offers dynamic ownerhood continuations",
        rendering.includes("renderOrdinaryNncOwnerhoodContinuations")
            && rendering.includes("buildOrdinaryNounOwnerhoodContinuationContract")
            && rendering.includes("getOrdinaryNounOwnerhoodMatrixInventory")
            && rendering.includes('continueButton.dataset.ordinaryNncOwnerhoodContinuation = "true"')
            && rendering.includes("dataset.ownerhoodVerbInput")
            && rendering.includes("getOwnerhoodPreviewSurface")
            && rendering.includes("applyOrdinaryNounOwnerhoodRootsToVerbEntry")
            && rendering.includes("matriz de posesión:")
            && rendering.includes("V pretérito:")
            && composer.includes("function applyOrdinaryNounOwnerhoodRootsToVerbEntry")
            && composer.includes("resolveOrdinaryNounOwnerhoodMatrixSpec")
            && composer.includes("buildOrdinaryNounOwnerhoodVerbInput")
            && composer.includes("ordinary-noun-ownerhood-entry")
    );
    s.ok(
        "shared sustantivo renderer exposes verb-derived nominalization metadata",
        rendering.includes("buildVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes('profile.outputKind !== "verb-derived-nominal"')
            && rendering.includes("appendVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes("evaluation.result?.nominalizationProfile")
            && rendering.includes("ambito: salida estructural")
            && rendering.includes("ANDREWS_RENDERING_TERMS.nominalization")
            && rendering.includes("rol nominal:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.sourceVnc")
            && rendering.includes("familia patientiva:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.patientiveSource")
            && rendering.includes("familias Andrews:")
            && rendering.includes("etapa salida:")
            && rendering.includes("taxonomía patientiva: parcial")
            && rendering.includes("función adjetival:")
            && rendering.includes("modificación: no modelada")
    );
    s.ok(
        "#3 salida renders dynamic slot chips from engine metadata",
        rendering.includes("function buildGeneratedOutputSlotChips")
            && rendering.includes("function buildGeneratedOutputCompactSubLabel")
            && rendering.includes("function renderGeneratedOutputSlotChips")
            && rendering.includes("getGeneratedOutputShellSlots(result)")
            && rendering.includes("ANDREWS_RENDERING_TERMS")
            && rendering.includes("Fórmula CNV")
            && rendering.includes("Fórmula CNN")
            && rendering.includes("persona1-persona2")
            && rendering.includes("objeto 1")
            && rendering.includes("reflexivo")
            && rendering.includes("base")
            && rendering.includes("getGeneratedOutputCompactTenseValue")
            && rendering.includes('"presente-habitual": "pres-hab"')
            && rendering.includes('"condicional-perfecto": "cond-perf"')
            && rendering.includes('`${ANDREWS_RENDERING_TERMS.tiempo}: ${tenseValue}`')
            && rendering.includes("persona1-persona2")
            && rendering.includes("número1-número2")
            && rendering.includes("etapa #3 salida")
            && rendering.includes("procedimientos patientivos")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, evaluation.result)")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, result)")
            && css.includes(".person-sub__slot-strip")
            && css.includes(".person-sub__compact-text")
            && css.includes(".person-sub__slot-chip--formula")
            && css.includes(".person-sub__slot-chip--reflexivo")
            && css.includes(".person-sub__slot-chip--patientive")
            && css.includes(".person-sub__slot-chip--lesson2")
            && css.includes(".person-sub__slot-chip[data-detail]::after")
            && rendering.includes("chipEl.tabIndex = 0")
            && rendering.includes("container.dataset.fullSubLabel = fullSubLabel")
            && rendering.includes("container.replaceChildren()")
    );
    s.ok(
        "#3 salida slot chips do not double-wrap framed VNC predicates",
        rendering.includes('return stem.includes("(") && stem.includes(")") ? stem : `(${stem})`;')
            && rendering.includes('value.textContent = chip.label ? ` ${chip.value}` : chip.value')
            && rendering.includes("if (chip.label)")
    );
    s.ok(
        "#3 salida LCM labels expose Lesson 2 sound-spelling frames",
        rendering.includes("soundSpellingFrames")
            && rendering.includes("soundSpellingFrame")
            && rendering.includes("Proceso L2")
            && rendering.includes("sourceSurface")
            && rendering.includes("targetCandidates")
            && rendering.includes("grammarSlot")
            && rendering.includes("spanishProcess")
            && rendering.includes("andrewsProcess")
            && rendering.includes("getGeneratedOutputLesson2SoundSpellingFrames(result)")
            && rendering.includes("buildGeneratedOutputLesson2ChipValue(frame)")
            && rendering.includes("allowEmptyLabel: true")
            && rendering.includes("chipEl.dataset.detail = chip.title")
    );
    s.ok(
        "patientivo pre-locative continuation is driven from generated row output",
        rendering.includes("renderPatientivoPrelocativeContinuation")
            && rendering.includes("dataset.patientivoPrelocativeContinuation = \"true\"")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || prelocativeVerbInput}`")
            && rendering.includes("const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation)")
            && rendering.includes("resolvePatientivoSourceSurfaceForContinuation")
            && rendering.includes("const profileSurface = getPrimaryConjugationSurface(profileSource)")
            && rendering.includes("if (hasConjugationResultFrame(profileSource))")
            && rendering.includes("return \"\";")
            && !rendering.includes("resolveDirectPatientivoSurfaceOverride")
            && !rendering.includes("resolveDirectPatientivoSurface =")
            && !rendering.includes("replacePatientivoRouteSuffix")
            && !rendering.includes("resolveActiveVerbNounRouteSurfaceOverride")
            && !rendering.includes("routeSurfaceOverride")
            && rendering.includes("buildPatientivoPrelocativeContinuationContract")
            && rendering.includes("getPatientivoPrelocativeMatrixInventory")
            && rendering.includes("conjugation-conversion-actions")
            && rendering.includes('patientivoSource === "tronco-verbal"')
            && !rendering.includes('patientivoSource !== "imperfectivo"')
            && !rendering.includes("NAWAT_PRELOCATIVE_PATIENTIVO_SOURCE_TENSES")
            && rendering.includes("dataset.prelocativeMatrixRoot = matrixRoot")
            && rendering.includes("dataset.prelocativeMatrixId = contract.matrix?.id || \"\"")
            && rendering.includes("getPrelocativeFinitePreviewSurface")
            && rendering.includes("contract.prelocativeVerbInput")
            && rendering.includes("resolvePrelocativeObjectFromPatientiveRow")
            && rendering.includes("resolvePatientivoPrelocativeObjectTransfer")
            && rendering.includes("routeStore.activeLocativePromotedObjectPrefix = objectTransfer.objectPrefix")
            && rendering.includes("routeStore.activeLocativeMatrixSpecId = contract.matrix?.id || \"\"")
            && rendering.includes("matrixSpecId: contract.matrix?.id || \"\"")
            && rendering.includes("objectPrefix: objectTransfer.objectPrefix")
            && css.includes(".conjugation-conversion-actions")
            && composer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive")
            && composer.includes("VerbComposerState.slotBEmbed = normalizedIncorporatedRoot")
            && composer.includes("VerbComposerState.slotBStem = normalizedMatrixRoot")
            && composer.includes("routeStore.activeLocativeMatrixSpecId = resolvedMatrixSpecId")
            && composer.includes("activeLocativePromotedObjectPrefix = promotedObjectPrefix")
            && composer.includes("activeLocativeSourcePossessorPrefix = sourcePossessorPrefix")
            && state.includes("activeLocativeMatrixSpecId = \"\"")
            && state.includes("activeLocativePromotedObjectPrefix = \"\"")
            && state.includes("activeLocativeSourcePossessorPrefix = \"\"")
    );
    s.ok(
        "patientivo tronco conversion is a generated-row action, not a block-level route picker",
        rendering.includes("const renderTroncoConversionForms = ({")
            && rendering.includes("dataset.patientivoTroncoConversion = \"true\"")
            && rendering.includes("dataset.nawatRouteKey = track.routeKey")
            && rendering.includes("dataset.targetSurface = track.destination || \"\"")
            && rendering.includes("continueLabel.textContent = `→ ${track.destination || track.targetInput}`")
            && rendering.includes("activateNawatRouteStation(track.routeKey, \"finite-tense\"")
            && rendering.includes("sourceStem: stem")
            && rendering.includes("value.append(surfaceText, conversionActions)")
            && rendering.includes("entry.destinationSlot.hidden = true")
    );
    s.ok(
        "Andrews 40.4 patientive adjectival NNC function is exposed dynamically in #3 salida",
        rendering.includes("renderPatientivoAdjectivalFunctionContinuation")
            && rendering.includes("buildPatientivoAdjectivalNncFunctionOutput")
            && rendering.includes("dataset.patientivoAdjectivalFunctionContinuation = \"true\"")
            && rendering.includes("calc-guidance__chip--mode-adjetivo")
            && rendering.includes("continueSubLabel.textContent = \"Adjetival nominal\"")
            && rendering.includes("const targetSurface = getPrimaryConjugationSurface(contract);")
            && rendering.includes("continueButton.dataset.targetSurface = targetSurface;")
            && rendering.includes("continueLabel.textContent = `→ ${targetSurface}`")
            && rendering.includes("`#3 salida patientiva: ${targetSurface}`,")
            && rendering.includes("Andrews 40.4: cláusula nominal patientiva en función adjetival")
            && rendering.includes("applyGrammarFrameRouteDataset(continueButton, contract)")
            && rendering.includes("applyAdjectivalNncFunctionToVerbEntry({")
            && rendering.includes("surface: targetSurface")
            && rendering.includes('formation: "patientive-adjectival"')
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("renderPatientivoAdjectivalFunctionContinuation({")
            && !rendering.includes("dataset.targetSurface = contract.result || \"\"")
            && !rendering.includes("button.dataset.targetSurface === contract.result")
    );
    s.ok(
        "Andrews 40.3 VNC adjectival function is exposed dynamically in generated VNC rows",
        rendering.includes("const appendVncAdjectivalFunctionRowContinuation = ({")
            && rendering.includes("buildVncAdjectivalNncFunctionOutput")
            && rendering.includes('continueButton.dataset.vncAdjectivalFunctionContinuation = "true"')
            && rendering.includes('calc-guidance__chip--vnc-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adjetival verbal"')
            && rendering.includes("`#3 salida verbal: ${targetSurface}`,")
            && rendering.includes("Andrews 40.3: cláusula verbal en función adjetival")
            && rendering.includes("no crea tronco nominal")
            && rendering.includes("sourceTenseValue: tenseValue")
            && rendering.includes("sourceCombinedMode,")
            && rendering.includes("sourceVoiceMode,")
            && rendering.includes("formation: \"vnc-adjectival\"")
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("appendVncAdjectivalFunctionRowContinuation({")
            && rendering.includes("afterRowRendered: ({ value, evaluation, prefix }) => {")
            && css.includes(".calc-guidance__chip--vnc-adjectival-function")
    );
    s.ok(
        "Andrews 40.1/40.3 ordinary NNC adjectival function is exposed dynamically in generated ordinary NNC rows",
        rendering.includes("const renderOrdinaryNncAdjectivalFunctionContinuation = () => {")
            && rendering.includes("generateAdjectivalNncFunctionOutput({")
            && rendering.includes('continueButton.dataset.ordinaryNncAdjectivalFunctionContinuation = "true"')
            && rendering.includes('calc-guidance__chip--ordinary-nnc-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adjetival nominal"')
            && rendering.includes("`#3 salida nominal: ${targetSurface}`,")
            && rendering.includes("Andrews 40.1/40.3: cláusula nominal absolutiva en función adjetival")
            && rendering.includes("no crea modificación lecciones 42-43")
            && rendering.includes('formation: "ordinary-absolutive"')
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("renderOrdinaryNncAdjectivalFunctionContinuation();")
            && css.includes(".calc-guidance__chip--ordinary-nnc-adjectival-function")
    );
    s.ok(
        "Andrews 54.2.1 ordinary NNC rows expose absolutive inceptive ti route continuations",
        rendering.includes("const renderOrdinaryNncInceptiveTiContinuations = () => {")
            && state.includes("function buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput")
            && state.includes("function previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput")
            && state.includes('contractId: "54.2.1-inceptive-stative-ti"')
            && state.includes('sourceCategory: "absolutive-state-nnc-predicate"')
            && state.includes("inceptiveTiSourceRequiresAbsolutivePredicate")
            && rendering.includes("previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(result)")
            && rendering.includes('"is-absolutive-source"')
            && rendering.includes('continueButton.dataset.sourceEvidenceSatisfied = "true"')
            && rendering.includes('continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true"')
            && rendering.includes('continueButton.dataset.contractId = route.contractId || ""')
            && rendering.includes('continueSubLabel.textContent = [')
            && rendering.includes('"nominal absolutivo"')
            && rendering.includes("ti se adjunta al predicado absolutivo")
            && state.includes("setOrdinaryNncGenerationModeEnabled(false)")
            && state.includes("setComposerEntryBoard(plainComposerBoard, { force: ordinaryNncWasActive })")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget(route, {")
            && rendering.includes("renderOrdinaryNncInceptiveTiContinuations();")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-absolutive-source")
    );
    s.ok(
        "Andrews 54.2.2 ordinary NNC rows expose absolutive inceptive hui/wi route continuations",
        rendering.includes("const renderOrdinaryNncInceptiveHuiContinuations = () => {")
            && state.includes("function buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput")
            && state.includes("function previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput")
            && state.includes('contractId: "54.2.2-inceptive-stative-hui"')
            && state.includes("inceptiveHuiSourceRequiresAbsolutivePredicate")
            && rendering.includes("previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(result)")
            && rendering.includes('"is-absolutive-source"')
            && rendering.includes('continueButton.dataset.sourceEvidenceSatisfied = "true"')
            && rendering.includes('continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true"')
            && rendering.includes('continueButton.dataset.contractId = route.contractId || ""')
            && rendering.includes('"nominal absolutivo"')
            && rendering.includes("hui/wi se adjunta al predicado absolutivo")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget(route, {")
            && rendering.includes("renderOrdinaryNncInceptiveHuiContinuations();")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-absolutive-source")
    );
    s.ok(
        "Andrews 54.2.3 ordinary NNC rows expose root-plus-ya route continuations",
        rendering.includes("const renderOrdinaryNncRootPlusYaContinuations = () => {")
            && state.includes("function buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput")
            && state.includes("function previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput")
            && state.includes('contractId: "54.2.3-inceptive-stative-ya"')
            && state.includes("sourceNounstemDowngradedToRootRank")
            && rendering.includes("previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(result)")
            && rendering.includes('"is-root-source"')
            && rendering.includes('continueButton.dataset.sourceEvidenceSatisfied = "true"')
            && rendering.includes('continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true"')
            && rendering.includes('continueButton.dataset.contractId = route.contractId || ""')
            && rendering.includes('"raíz nominal"')
            && rendering.includes("ya se adjunta al tronco nominal en rango raíz")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget(route, {")
            && rendering.includes("renderOrdinaryNncRootPlusYaContinuations();")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-root-source")
    );
    s.ok(
        "Andrews 54.2.4 ordinary NNC rows expose limited inceptive a route continuations",
        rendering.includes("const renderOrdinaryNncInceptiveAContinuations = () => {")
            && state.includes("function buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput")
            && state.includes("function previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput")
            && state.includes('contractId: "54.2.4-inceptive-stative-a"')
            && state.includes("inceptiveASourceRequiresAbsolutiveNounstem")
            && state.includes("targetLooksTransitiveButIsIntransitive")
            && rendering.includes("previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(result)")
            && rendering.includes('"is-limited-use"')
            && rendering.includes('continueButton.dataset.limitedUse = "true"')
            && rendering.includes('continueButton.dataset.notCausativeA = "true"')
            && rendering.includes('"uso limitado"')
            && rendering.includes("a inceptiva/estativa se adjunta al tronco nominal")
            && rendering.includes("no es a causativa")
            && rendering.includes("Clase C intransitiva")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget(route, {")
            && rendering.includes("renderOrdinaryNncInceptiveAContinuations();")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-limited-use")
    );
    s.ok(
        "Andrews 54.2.5 generated characteristic-property rows expose deverbal yu hua/wa route continuations",
        rendering.includes("const renderCalificativoInstrumentivoHuaContinuations = ({")
            && state.includes("function buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput")
            && state.includes("function previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput")
            && state.includes('contractId: "54.2.5-inceptive-stative-hua"')
            && state.includes("sourceEvidenceFromGeneratedCharacteristicPropertyNnc")
            && state.includes("absolutiveConnectorTStrippedForSourceStem")
            && rendering.includes("previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(evaluation?.result)")
            && rendering.includes('continueButton.dataset.huaDeverbalYuContinuation = "true"')
            && rendering.includes('continueButton.dataset.sourceEvidenceFromCharacteristicProperty = "true"')
            && rendering.includes('"is-deverbal-yu-source"')
            && rendering.includes('"fuente -yu(t)"')
            && rendering.includes('"no 55.3 o-a"')
            && rendering.includes("hua/wa no es la formacion o-a de 55.3")
            && rendering.includes("renderCalificativoInstrumentivoHuaContinuations({")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-deverbal-yu-source")
    );
    s.ok(
        "Andrews 54.3 generated possessive NNC rows expose included-possessor ti route continuations",
        rendering.includes("const renderOrdinaryNncIncludedPossessorContinuations = () => {")
            && state.includes("function previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput")
            && state.includes('contractId: "54.3-included-possessor-ti"')
            && state.includes("possessorIncludedInsideVerbstem")
            && state.includes("possessiveCaseNotTransformedToObjective")
            && rendering.includes("previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput(result)")
            && rendering.includes('"is-included-possessor-source"')
            && rendering.includes('continueButton.dataset.possessorIncludedInsideVerbstem = "true"')
            && rendering.includes('continueButton.dataset.possessiveCaseNotObject = "true"')
            && rendering.includes('"nominal posesivo"')
            && rendering.includes('"poseedor interno"')
            && rendering.includes("el poseedor queda dentro del tronco")
            && rendering.includes("no se convierte en objeto")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget(route, {")
            && rendering.includes("renderOrdinaryNncIncludedPossessorContinuations();")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-included-possessor-source")
    );
    s.ok(
        "Andrews 41.1 intensified adjectival function is exposed from supported generated adjectival NNC formula slots",
        rendering.includes("const renderIntensifiedAdjectivalFunctionContinuation = ({")
            && rendering.includes("buildIntensifiedAdjectivalNncOutput({")
            && rendering.includes('continueButton.dataset.intensifiedAdjectivalFunctionContinuation = "true"')
            && rendering.includes("continueButton.dataset.sourceFormulaEcho = sourceFormulaEcho")
            && rendering.includes('calc-guidance__chip--intensified-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Intensifica"')
            && rendering.includes("Andrews 41.1: intensificación adjetival por reduplicación")
            && rendering.includes('formation: "intensified-adjectival"')
            && rendering.includes("sourceFormulaSlots,")
            && rendering.includes("renderIntensifiedAdjectivalFunctionContinuation({")
            && vncFacade.includes('if (formation === "intensified-adjectival")')
            && vncFacade.includes("adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots")
            && composer.includes("sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === \"object\" ? sourceFormulaSlots : null")
            && composer.includes("encodeValue(override.adjectivalNnc?.sourceFormulaEcho)")
            && css.includes(".calc-guidance__chip--intensified-adjectival-function")
    );
    s.ok(
        "Andrews 41.2 compound-source adjectival function is exposed from generated compound-source rows",
        rendering.includes("const renderCompoundSourceAdjectivalFunctionContinuation = ({")
            && rendering.includes("buildCompoundSourceAdjectivalNncFunctionOutput({")
            && rendering.includes('continueButton.dataset.compoundSourceAdjectivalFunctionContinuation = "true"')
            && rendering.includes("continueButton.dataset.sourceCompoundMatrix = sourceCompoundFrame?.matrix?.stem || \"\"")
            && rendering.includes('calc-guidance__chip--compound-source-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adj comp"')
            && rendering.includes("Andrews 41.2: cláusula nominal adjetival desde verbo compuesto con incrustado nominal")
            && rendering.includes('formation: "compound-source-adjectival"')
            && rendering.includes("sourceCompoundFrame,")
            && vncFacade.includes('if (formation === "compound-source-adjectival")')
            && vncFacade.includes("adjectivalNnc.sourceCompoundFrame = entrySourceCompoundFrame")
            && composer.includes("sourceCompoundFrame: sourceCompoundFrame && typeof sourceCompoundFrame === \"object\" ? sourceCompoundFrame : null")
            && composer.includes("encodeValue(JSON.stringify(override.adjectivalNnc?.sourceCompoundFrame || override.adjectivalNnc?.compoundFrame || \"\"))")
            && css.includes(".calc-guidance__chip--compound-source-adjectival-function")
    );
    s.ok(
        "Andrews 41.3 denominal compound adjectival function is exposed from generated tiya compound-source rows",
        rendering.includes("const renderDenominalCompoundAdjectivalFunctionContinuation = ({")
            && rendering.includes("buildDenominalCompoundAdjectivalNncFunctionOutput({")
            && rendering.includes('continueButton.dataset.denominalCompoundAdjectivalFunctionContinuation = "true"')
            && rendering.includes("continueButton.dataset.sourceCompoundMatrix = denominalCompoundFrame?.matrix?.stem || \"\"")
            && rendering.includes('calc-guidance__chip--denominal-compound-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adj denom"')
            && rendering.includes("Andrews 41.3: cláusula nominal adjetival desde verbo denominal ti de sustantivo compuesto")
            && rendering.includes('formation: "denominal-compound-adjectival"')
            && rendering.includes("sourceDenominalCompoundFrame: denominalCompoundFrame")
            && rendering.includes("renderDenominalCompoundAdjectivalFunctionContinuation({")
            && vncFacade.includes('if (formation === "denominal-compound-adjectival")')
            && vncFacade.includes("adjectivalNnc.sourceDenominalCompoundFrame = entrySourceDenominalCompoundFrame")
            && composer.includes("sourceDenominalCompoundFrame: sourceDenominalCompoundFrame && typeof sourceDenominalCompoundFrame === \"object\" ? sourceDenominalCompoundFrame : null")
            && composer.includes("encodeValue(JSON.stringify(override.adjectivalNnc?.sourceDenominalCompoundFrame || override.adjectivalNnc?.denominalCompoundFrame || \"\"))")
            && css.includes(".calc-guidance__chip--denominal-compound-adjectival-function")
    );
    s.ok(
        "Andrews 40.5-40.8 nominalized VNC adjectival function is exposed dynamically in #3 salida",
        rendering.includes("renderNominalizedVncAdjectivalFunctionContinuation")
            && rendering.includes("buildNominalizedVncAdjectivalNncFunctionOutput")
            && rendering.includes("dataset.nominalizedVncAdjectivalFunctionContinuation = \"true\"")
            && rendering.includes("dataset.nominalizedVncKind = contract.adjectivalNncFunctionFrame?.nominalizationKind || \"\"")
            && rendering.includes("continueLabel.textContent = `→ ${targetSurface}`")
            && rendering.includes("`#3 salida nominalizada: ${targetSurface}`,")
            && rendering.includes("cláusula nominal nominalizada en función adjetival")
            && rendering.includes("surface: targetSurface")
            && rendering.includes('formation: "nominalized-vnc-adjectival"')
            && rendering.includes("applyGrammarFrameRouteDataset(continueButton, contract)")
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("renderNominalizedVncAdjectivalFunctionContinuation({")
            && rendering.includes('resolvedTense === "potencial" || resolvedTense === "potencial-habitual"')
    );
    s.ok(
        "adjectival NNC continuations apply an explicit generation contract instead of only switching labels",
        composer.includes("function applyAdjectivalNncFunctionToVerbEntry")
            && composer.includes("verbEl.dataset.adjectivalNncFunctionSurface = normalizedSurface")
            && composer.includes("verbEl.dataset.adjectivalNncFunctionContract = serializedContract")
            && composer.includes("verbEl.dataset.grammarRouteFamily = entryContract.routeFamily || \"\"")
            && composer.includes("clearActiveNawatRouteProfile()")
            && composer.includes('source: "adjectival-nnc-function-entry"')
            && composer.includes("grammarFrame: frame || null")
            && composer.includes("getAdjectivalNncFunctionOverrideSurface(override)")
            && composer.includes("clearAdjectivalNncFunctionEntryState(verbInput)")
            && vncFacade.includes("parseAdjectivalNncFunctionEntryContract")
            && vncFacade.includes("adjectivalNnc.grammarFrame = entryGrammarFrame")
            && vncFacade.includes("adjectivalNnc.entryRouteContract = entryRouteContract")
            && vncFacade.includes('if (formation === "ordinary-absolutive")')
            && vncFacade.includes("adjectivalNnc.sourceStem = sourceStem")
            && vncFacade.includes("adjectivalNnc.nounClass = getAdjectivalNncFunctionEntryNounClass(connectorSlot)")
            && vncFacade.includes('if (formation === "vnc-adjectival")')
            && vncFacade.includes("adjectivalNnc.vncSurface = targetSurface")
            && vncFacade.includes("adjectivalNnc.sourceTenseValue")
            && vncFacade.includes("resolveAdjectivalNncFunctionOverrideFromInput")
            && vncFacade.includes('tiempo: "adjectival-nnc"')
            && vncFacade.includes("adjectivalNnc")
            && composer.includes("override.adjectivalNnc?.nominalizedSurface")
            && !composer.includes("encodeValue(override.adjectivalNnc?.surface)")
            && !rendering.includes("override?.adjectivalNnc?.surface")
    );
    s.ok(
        "applied adjectival NNC function entries render their explicit contract block instead of the default potential tab",
        rendering.includes("function renderAdjectivalNncFunctionConjugations")
            && rendering.includes("const adjectivalFunctionOverride = activeTenseMode === TENSE_MODE.adjetivo")
            && rendering.includes("!adjectivalFunctionOverride")
            && rendering.includes("resolveAdjectivalNncFunctionOverrideFromInput(verbInput)")
            && rendering.includes('tenseBlock.dataset.tenseBlock = "adjetivo-nnc-funcion"')
            && rendering.includes('tenseBlock.className = "tense-block tense-block--adjectival-nnc-function"')
            && rendering.includes("tenseBlock.dataset.andrewsFunctionBlock")
            && rendering.includes("applyGrammarFrameRouteDataset(tenseBlock, result)")
            && rendering.includes('applyTenseBlockComboPalette(tenseBlock, "adjetivo|nnc-funcion")')
            && rendering.includes("renderAdjectivalNncFunctionConjugations({ verb, containerId })")
            && rendering.includes("return;")
    );
    const compoundEmbedComposerStart = composer.indexOf("function applyPatientivoCompoundEmbedRootsToVerbEntry");
    const compoundEmbedComposerEnd = composer.indexOf("function shouldComposerControlChangeRefreshImmediately", compoundEmbedComposerStart);
    const compoundEmbedComposer = compoundEmbedComposerStart >= 0 && compoundEmbedComposerEnd > compoundEmbedComposerStart
        ? composer.slice(compoundEmbedComposerStart, compoundEmbedComposerEnd)
        : "";
    s.ok(
        "patientivo compound-embed continuation writes the generated output back into #1 entrada",
        rendering.includes("renderPatientivoCompoundEmbedContinuation")
            && rendering.includes("buildPatientivoCompoundEmbedContinuationContract")
            && rendering.includes("getPatientivoCompoundEmbedMatrixInventory")
            && rendering.includes("dataset.patientivoCompoundEmbedContinuation = \"true\"")
            && rendering.includes("dataset.compoundVerb = compoundVerbInput")
            && rendering.includes("dataset.compoundMatrixRoot = matrixRoot")
            && rendering.includes("applyPatientivoCompoundEmbedRootsToVerbEntry")
            && rendering.includes("getCompoundEmbedFinitePreviewSurface")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`")
            && compoundEmbedComposer.includes("function applyPatientivoCompoundEmbedRootsToVerbEntry")
            && compoundEmbedComposer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.intransitive")
            && compoundEmbedComposer.includes("VerbComposerState.slotAEmbed = normalizedIncorporatedRoot")
            && compoundEmbedComposer.includes("VerbComposerState.slotAStem = normalizedMatrixRoot")
            && compoundEmbedComposer.includes("clearRoute: true")
            && !compoundEmbedComposer.includes("activeLocativeMatrixRoot")
            && !compoundEmbedComposer.includes("__NAWAT_ACTIVE_LINE_ID__")
    );
    const nominalCompoundComposerStart = composer.indexOf("function applyPatientivoNominalCompoundToOrdinaryNncEntry");
    const nominalCompoundComposerEnd = composer.indexOf("function shouldComposerControlChangeRefreshImmediately", nominalCompoundComposerStart);
    const nominalCompoundComposer = nominalCompoundComposerStart >= 0 && nominalCompoundComposerEnd > nominalCompoundComposerStart
        ? composer.slice(nominalCompoundComposerStart, nominalCompoundComposerEnd)
        : "";
    s.ok(
        "patientivo nominal-compound continuation writes the generated output into ordinary NNC entrada",
        rendering.includes("renderPatientivoNominalCompoundContinuation")
            && rendering.includes("buildPatientivoNominalCompoundContinuationContract")
            && rendering.includes("getPatientivoNominalCompoundMatrixInventory")
            && rendering.includes("dataset.patientivoNominalCompoundContinuation = \"true\"")
            && rendering.includes("dataset.ordinaryNncInput = ordinaryNncInput")
            && rendering.includes("dataset.nominalCompoundMatrixRoot = matrixRoot")
            && rendering.includes("applyPatientivoNominalCompoundToOrdinaryNncEntry")
            && rendering.includes("getNominalCompoundPreviewSurface")
            && rendering.includes("continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${ordinaryNncInput}`")
            && nominalCompoundComposer.includes("function applyPatientivoNominalCompoundToOrdinaryNncEntry")
            && nominalCompoundComposer.includes("setOrdinaryNncGenerationModeEnabled(true")
            && nominalCompoundComposer.includes("setActiveNawatTenseMode(TENSE_MODE.sustantivo)")
            && nominalCompoundComposer.includes("formatComposerOrdinaryNncAnalogueInput")
            && !nominalCompoundComposer.includes("activeLocativeMatrixRoot")
            && !nominalCompoundComposer.includes("__NAWAT_ACTIVE_LINE_ID__")
    );
    const activeActionCompoundComposerStart = composer.indexOf("function applyActiveActionCompoundEmbedRootsToVerbEntry");
    const activeActionCompoundComposerEnd = composer.indexOf("function applyActiveActionNominalCompoundToOrdinaryNncEntry", activeActionCompoundComposerStart);
    const activeActionCompoundComposer = activeActionCompoundComposerStart >= 0 && activeActionCompoundComposerEnd > activeActionCompoundComposerStart
        ? composer.slice(activeActionCompoundComposerStart, activeActionCompoundComposerEnd)
        : "";
    s.ok(
        "active-action sustantivo verbal output has real Andrews 37.5.4 verbal continuation from #3 salida",
        rendering.includes("renderActiveActionCompoundEmbedContinuation")
            && rendering.includes("buildActiveActionCompoundEmbedContinuationContract")
            && rendering.includes("getActiveActionCompoundEmbedMatrixInventory")
            && rendering.includes("dataset.activeActionCompoundEmbedContinuation = \"true\"")
            && rendering.includes("dataset.actionNominalSurface = contract.actionNominalSurface")
            && rendering.includes("applyActiveActionCompoundEmbedRootsToVerbEntry")
            && rendering.includes("resolvedTense === \"sustantivo-verbal\"")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`")
            && activeActionCompoundComposer.includes("function applyActiveActionCompoundEmbedRootsToVerbEntry")
            && activeActionCompoundComposer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.intransitive")
            && activeActionCompoundComposer.includes("VerbComposerState.slotAEmbed = normalizedActionNominalSurface")
            && activeActionCompoundComposer.includes("VerbComposerState.slotAStem = normalizedMatrixRoot")
            && activeActionCompoundComposer.includes("clearRoute: true")
            && activeActionCompoundComposer.includes("active-action-compound-embed-entry")
    );
    const activeActionNominalComposerStart = composer.indexOf("function applyActiveActionNominalCompoundToOrdinaryNncEntry");
    const activeActionNominalComposerEnd = composer.indexOf("function shouldComposerControlChangeRefreshImmediately", activeActionNominalComposerStart);
    const activeActionNominalComposer = activeActionNominalComposerStart >= 0 && activeActionNominalComposerEnd > activeActionNominalComposerStart
        ? composer.slice(activeActionNominalComposerStart, activeActionNominalComposerEnd)
        : "";
    s.ok(
        "active-action sustantivo verbal output has real Andrews 37.5.4 nominal continuation from #3 salida",
        rendering.includes("renderActiveActionNominalCompoundContinuation")
            && rendering.includes("buildActiveActionNominalCompoundContinuationContract")
            && rendering.includes("getActiveActionNominalCompoundMatrixInventory")
            && rendering.includes("dataset.activeActionNominalCompoundContinuation = \"true\"")
            && rendering.includes("dataset.ordinaryNncInput = contract.ordinaryNncInput")
            && rendering.includes("applyActiveActionNominalCompoundToOrdinaryNncEntry")
            && rendering.includes("getNominalCompoundPreviewSurface")
            && rendering.includes("continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`")
            && activeActionNominalComposer.includes("function applyActiveActionNominalCompoundToOrdinaryNncEntry")
            && activeActionNominalComposer.includes("setOrdinaryNncGenerationModeEnabled(true")
            && activeActionNominalComposer.includes("setActiveNawatTenseMode(TENSE_MODE.sustantivo)")
            && activeActionNominalComposer.includes("formatComposerOrdinaryNncAnalogueInput")
            && activeActionNominalComposer.includes("active-action-nominal-compound-entry")
    );
    s.ok(
        "customary-present agentivo output has real Andrews 36.3 nominal and VNC continuations from #3 salida",
        rendering.includes("getCustomaryAgentiveStemsFromEvaluation")
            && rendering.includes('result?.nominalizationProfile?.nominalKind !== "agentivo"')
            && rendering.includes("renderCustomaryAgentiveCompoundEmbedContinuation")
            && rendering.includes("buildCustomaryAgentiveCompoundEmbedContinuationContract")
            && rendering.includes("getCustomaryAgentiveCompoundEmbedMatrixInventory")
            && rendering.includes('continueButton.dataset.customaryAgentiveCompoundEmbedContinuation = "true"')
            && rendering.includes("dataset.compoundVerb = compoundVerbInput")
            && rendering.includes("applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry")
            && rendering.includes("renderCustomaryAgentiveNominalCompoundContinuation")
            && rendering.includes("buildCustomaryAgentiveNominalCompoundContinuationContract")
            && rendering.includes("getCustomaryAgentiveNominalCompoundMatrixInventory")
            && rendering.includes('continueButton.dataset.customaryAgentiveNominalCompoundContinuation = "true"')
            && rendering.includes("dataset.customaryAgentiveStem = contract.customaryAgentiveStem")
            && rendering.includes("applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry")
            && rendering.includes('resolvedTense === "agentivo"')
            && rendering.includes("Andrews 36.3:")
            && composer.includes("function applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry")
            && composer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive")
            && composer.includes("VerbComposerState.slotBEmbed = normalizedCustomaryAgentiveStem")
            && composer.includes("customary-agentive-compound-embed-entry")
            && composer.includes("function applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry")
            && composer.includes("customaryAgentiveStem")
            && composer.includes("applyActiveActionNominalCompoundToOrdinaryNncEntry({")
    );
    const customaryAgentiveStemReaderStart = rendering.indexOf("const getCustomaryAgentiveStemsFromEvaluation");
    const customaryAgentiveStemReaderEnd = rendering.indexOf("const getPreteritAgentiveGeneralUseStemsFromEvaluation", customaryAgentiveStemReaderStart);
    const customaryAgentiveStemReader = customaryAgentiveStemReaderStart >= 0 && customaryAgentiveStemReaderEnd > customaryAgentiveStemReaderStart
        ? rendering.slice(customaryAgentiveStemReaderStart, customaryAgentiveStemReaderEnd)
        : "";
    const preteritAgentiveStemReaderStart = rendering.indexOf("const getPreteritAgentiveGeneralUseStemsFromEvaluation");
    const preteritAgentiveStemReaderEnd = rendering.indexOf("const renderActiveActionCompoundEmbedContinuation", preteritAgentiveStemReaderStart);
    const preteritAgentiveStemReader = preteritAgentiveStemReaderStart >= 0 && preteritAgentiveStemReaderEnd > preteritAgentiveStemReaderStart
        ? rendering.slice(preteritAgentiveStemReaderStart, preteritAgentiveStemReaderEnd)
        : "";
    s.ok(
        "agentive continuation stem readers stop at empty LCM result frames before shell stem fallbacks",
        customaryAgentiveStemReader.includes("const surfaceForms = getConjugationSurfaceForms(result);")
            && customaryAgentiveStemReader.includes("const hasResultFrame = hasConjugationResultFrame(result);")
            && customaryAgentiveStemReader.includes("if (hasResultFrame && !surfaceForms.length)")
            && customaryAgentiveStemReader.includes("if (!hasResultFrame) {\n            addStem(predicateStem);")
            && customaryAgentiveStemReader.includes("surfaceForms.forEach((surfaceForm)")
            && preteritAgentiveStemReader.includes("const surfaceForms = getConjugationSurfaceForms(result);")
            && preteritAgentiveStemReader.includes("const hasResultFrame = hasConjugationResultFrame(result);")
            && preteritAgentiveStemReader.includes("if (hasResultFrame && !surfaceForms.length)")
            && preteritAgentiveStemReader.includes("if (!hasResultFrame && predicateStem)")
            && preteritAgentiveStemReader.includes("surfaceForms.forEach((surfaceForm)")
    );
    s.ok(
        "preterit-agentive output has real Andrews 35.7/35.9/35.10 continuations from #3 salida",
        rendering.includes("getPreteritAgentiveGeneralUseStemsFromEvaluation")
            && rendering.includes('result?.nominalizationProfile?.nominalKind !== "agentivo-preterito"')
            && rendering.includes("renderPreteritAgentiveCompoundEmbedContinuation")
            && rendering.includes("buildPreteritAgentiveCompoundEmbedContinuationContract")
            && rendering.includes("getPreteritAgentiveCompoundEmbedMatrixInventory")
            && rendering.includes('continueButton.dataset.preteritAgentiveCompoundEmbedContinuation = "true"')
            && rendering.includes("applyActiveActionCompoundEmbedRootsToVerbEntry")
            && rendering.includes("renderPreteritAgentiveNominalCompoundContinuation")
            && rendering.includes("buildPreteritAgentiveNominalCompoundContinuationContract")
            && rendering.includes("getPreteritAgentiveNominalCompoundMatrixInventory")
            && rendering.includes('continueButton.dataset.preteritAgentiveNominalCompoundContinuation = "true"')
            && rendering.includes("applyActiveActionNominalCompoundToOrdinaryNncEntry")
            && rendering.includes("renderPreteritAgentiveOwnerhoodContinuation")
            && rendering.includes("buildPreteritAgentiveOwnerhoodContinuationContract")
            && rendering.includes("getPreteritAgentiveOwnerhoodMatrixInventory")
            && rendering.includes("getPreteritAgentiveOwnerhoodPreviewSurface")
            && rendering.includes('continueButton.dataset.preteritAgentiveOwnerhoodContinuation = "true"')
            && rendering.includes("applyPreteritAgentiveOwnerhoodRootsToVerbEntry")
            && rendering.includes("renderPreteritAgentiveComplementContinuation")
            && rendering.includes("buildPreteritAgentiveComplementContinuationContract")
            && rendering.includes("getPreteritAgentiveComplementMatrixInventory")
            && rendering.includes('continueButton.dataset.preteritAgentiveComplementContinuation = "true"')
            && rendering.includes("applyPreteritAgentiveComplementRootsToVerbEntry")
            && rendering.includes("renderPreteritAgentiveAdverbialContinuation")
            && rendering.includes("buildPreteritAgentiveAdverbialContinuationContract")
            && rendering.includes("getPreteritAgentiveAdverbialMatrixInventory")
            && rendering.includes('continueButton.dataset.preteritAgentiveAdverbialContinuation = "true"')
            && rendering.includes("applyPreteritAgentiveAdverbialRootsToVerbEntry")
            && rendering.includes('resolvedTense === "agentivo-preterito"')
            && rendering.includes("uso general:")
            && rendering.includes("Andrews 35.7:")
            && rendering.includes("matriz de posesión:")
            && rendering.includes("matriz de complemento:")
            && rendering.includes("matriz adverbial:")
            && composer.includes("function applyPreteritAgentiveOwnerhoodRootsToVerbEntry")
            && composer.includes("function applyPreteritAgentiveComplementRootsToVerbEntry")
            && composer.includes("function applyPreteritAgentiveAdverbialRootsToVerbEntry")
            && composer.includes("preterit-agentive-adverbial-entry")
            && composer.includes("preterit-agentive-complement-entry")
            && composer.includes("setSelectedTenseTab(\"pasado-remoto\")")
            && composer.includes("preterit-agentive-ownerhood-entry")
    );
    const characteristicComposerStart = composer.indexOf("function applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry");
    const characteristicComposerEnd = composer.indexOf("function applyPatientivoNominalCompoundToOrdinaryNncEntry", characteristicComposerStart);
    const characteristicComposer = characteristicComposerStart >= 0 && characteristicComposerEnd > characteristicComposerStart
        ? composer.slice(characteristicComposerStart, characteristicComposerEnd)
        : "";
    s.ok(
        "calificativo yut output has a real Andrews 39.9 continuation instead of a route label",
        rendering.includes("renderPatientivoCharacteristicPropertyEmbedContinuation")
            && rendering.includes("buildPatientivoCharacteristicPropertyEmbedContinuationContract")
            && rendering.includes("getPatientivoCharacteristicPropertyMatrixInventory")
            && rendering.includes("dataset.patientivoCharacteristicPropertyEmbedContinuation = \"true\"")
            && rendering.includes("dataset.omittedSuffix = contract.omittedSuffix || \"\"")
            && rendering.includes("applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry")
            && rendering.includes("getCharacteristicPropertyEmbedFinitePreviewSurface")
            && rendering.includes("resolvedTense === \"calificativo-instrumentivo\"")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`")
            && characteristicComposer.includes("function applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry")
            && characteristicComposer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive")
            && characteristicComposer.includes("VerbComposerState.slotBEmbed = normalizedIncorporatedRoot")
            && characteristicComposer.includes("VerbComposerState.slotBStem = normalizedMatrixRoot")
            && characteristicComposer.includes("clearRoute: true")
            && characteristicComposer.includes("patientivo-characteristic-property-embed-entry")
    );
    const derivationContinuationRouteSpecs = [
        ["patientivo prelocative", "buildPatientivoPrelocativeContinuationContract", 'dataset.patientivoPrelocativeContinuation = "true"'],
        ["patientivo compound embed", "buildPatientivoCompoundEmbedContinuationContract", 'dataset.patientivoCompoundEmbedContinuation = "true"'],
        ["patientivo nominal compound", "buildPatientivoNominalCompoundContinuationContract", 'dataset.patientivoNominalCompoundContinuation = "true"'],
        ["patientivo characteristic property", "buildPatientivoCharacteristicPropertyEmbedContinuationContract", 'dataset.patientivoCharacteristicPropertyEmbedContinuation = "true"'],
        ["active-action compound embed", "buildActiveActionCompoundEmbedContinuationContract", 'dataset.activeActionCompoundEmbedContinuation = "true"'],
        ["active-action nominal compound", "buildActiveActionNominalCompoundContinuationContract", 'dataset.activeActionNominalCompoundContinuation = "true"'],
        ["customary-agentive compound embed", "buildCustomaryAgentiveCompoundEmbedContinuationContract", 'dataset.customaryAgentiveCompoundEmbedContinuation = "true"'],
        ["customary-agentive nominal compound", "buildCustomaryAgentiveNominalCompoundContinuationContract", 'dataset.customaryAgentiveNominalCompoundContinuation = "true"'],
        ["preterit-agentive compound embed", "buildPreteritAgentiveCompoundEmbedContinuationContract", 'dataset.preteritAgentiveCompoundEmbedContinuation = "true"'],
        ["preterit-agentive nominal compound", "buildPreteritAgentiveNominalCompoundContinuationContract", 'dataset.preteritAgentiveNominalCompoundContinuation = "true"'],
        ["preterit-agentive ownerhood", "buildPreteritAgentiveOwnerhoodContinuationContract", 'dataset.preteritAgentiveOwnerhoodContinuation = "true"'],
        ["preterit-agentive complement", "buildPreteritAgentiveComplementContinuationContract", 'dataset.preteritAgentiveComplementContinuation = "true"'],
        ["preterit-agentive adverbial", "buildPreteritAgentiveAdverbialContinuationContract", 'dataset.preteritAgentiveAdverbialContinuation = "true"'],
    ];
    const derivationContinuationRouteMissing = derivationContinuationRouteSpecs.filter(([, builder, datasetSnippet]) => {
        const start = rendering.indexOf(builder);
        const routeBody = start >= 0 ? rendering.slice(start, start + 5200) : "";
        return !routeBody.includes(datasetSnippet)
            || !routeBody.includes("applyGrammarFrameRouteDataset(continueButton, contract)");
    }).map(([label]) => label);
    s.ok(
        `derivation continuation linked chips copy LCM route frame datasets${derivationContinuationRouteMissing.length ? ` (${derivationContinuationRouteMissing.join(", ")})` : ""}`,
        derivationContinuationRouteMissing.length === 0
    );
    const linkedPromotionButtonBlocks = Array.from(rendering.matchAll(
        /const (continueButton|action) = document\.createElement\("button"\);[\s\S]*?(?:appendContinuationAction\([^;]+;|value\.append\([^;]+;|actions\.appendChild\([^;]+;)/g
    ))
        .map((match) => ({ index: match.index, body: match[0] }))
        .filter(({ body }) => body.includes("calc-guidance__chip--linked-promote"));
    const linkedPromotionButtonsWithoutLcm = linkedPromotionButtonBlocks
        .filter(({ body }) => !body.includes("applyGrammarFrameRouteDataset("))
        .map(({ index, body }) => {
            const line = rendering.slice(0, index).split("\n").length;
            const dataset = body.match(/dataset\.([A-Za-z0-9_]+)\s*=/)?.[1] || "unknown";
            return `${dataset}@${line}`;
        });
    s.ok(
        `linked promotion chips project LCM route datasets${linkedPromotionButtonsWithoutLcm.length ? ` (${linkedPromotionButtonsWithoutLcm.join(", ")})` : ""}`,
        linkedPromotionButtonBlocks.length >= 20 && linkedPromotionButtonsWithoutLcm.length === 0
    );
    s.ok(
        "calificativo general-use source-subject possessor lives in #3 salida rows",
        rendering.includes("renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation")
            && rendering.includes("resolveNawatPossessorPrefixFromSourceSubject")
            && rendering.includes('actionNounStemUse: "general-use"')
            && rendering.includes("combinedMode: resolvedNominalControlCombinedMode")
            && rendering.includes('action.dataset.actionNounSourceSubjectPossessor = derivedPossessorPrefix')
            && rendering.includes("const generalUseTargetSurface = getPrimaryConjugationSurface(generalUseEvaluation?.result)")
            && rendering.includes("const currentSurface = getPrimaryConjugationSurface(evaluation?.result)")
            && rendering.includes("action.dataset.targetSurface = generalUseTargetSurface")
            && rendering.includes("`uso general: ${generalUseTargetSurface}`")
            && rendering.includes("const possessiveTargetSurface = getPrimaryConjugationSurface(possessiveEvaluation?.result)")
            && rendering.includes("action.dataset.targetSurface = possessiveTargetSurface")
            && rendering.includes("`salida posesiva: ${possessiveTargetSurface}`")
            && !rendering.includes('action.dataset.targetSurface = generalUseEvaluation.result.result || ""')
            && rendering.includes("Andrews 36.10-36.11: sujeto fuente")
            && rendering.includes("renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation({")
            && rendering.includes("row.dataset.availabilityState = CONJUGATION_AVAILABILITY_STATE.viable")
    );
    const renderNounStart = rendering.indexOf("function renderNounConjugations");
    const nounEvaluationStart = rendering.indexOf("const evaluateNounCombinationState", renderNounStart);
    const renderNounSetup = renderNounStart >= 0 && nounEvaluationStart > renderNounStart
        ? rendering.slice(renderNounStart, nounEvaluationStart)
        : "";
    s.ok(
        "noun rendering resolves its nominal source mode before probing noun types",
        renderNounSetup.includes("const resolvedNominalControlCombinedMode = getResolvedNominalCombinedModeForTense(")
            && renderNounSetup.includes("modeFilter || combinedMode")
    );
    s.ok(
        "reduplicated noun/adjective combination gates read LCM primary surfaces before stale result text",
        rendering.includes("useReduplicatedSingularSurface && getPrimaryConjugationSurface(result)")
            && panels.includes("useReduplicatedSingularSurface && getPanelConjugationRenderableSurface(result)")
            && !rendering.includes("useReduplicatedSingularSurface && result?.result")
            && !panels.includes("useReduplicatedSingularSurface && result?.result")
    );
    s.ok(
        "patientivo salida hides separate output guidance because continuations live in generated rows",
        rendering.includes("const isPatientivoSalidaMode = activeTenseMode === TENSE_MODE.sustantivo")
            && rendering.includes('selectionState.tenseValue === "patientivo"')
            && rendering.includes("const guidanceVerb = adjectivalFunctionOverride")
            && rendering.includes('renderOutputGuidancePanel({ verb: isPatientivoSalidaMode ? "" : guidanceVerb });')
            && rendering.includes("renderPatientivoCompoundEmbedContinuation({")
    );
    const patientivoDestinationStart = rendering.indexOf("const updatePatientivoBlockDestination = (entry = {}) => {");
    const patientivoDestinationEnd = rendering.indexOf("const updateNounBlockPalettes", patientivoDestinationStart);
    const patientivoDestinationBody = patientivoDestinationStart >= 0 && patientivoDestinationEnd > patientivoDestinationStart
        ? rendering.slice(patientivoDestinationStart, patientivoDestinationEnd)
        : "";
    s.ok(
        "patientivo block destination is not a route picker because continuations live in #3 salida rows",
        patientivoDestinationBody.includes("entry.destinationSlot.replaceChildren()")
            && patientivoDestinationBody.includes("entry.destinationSlot.hidden = true")
            && patientivoDestinationBody.includes("tense-block--has-destination-menu")
            && !patientivoDestinationBody.includes("createTroncoBlockDestinationPicker(entry)")
            && !patientivoDestinationBody.includes("appendChild(destinationPicker)")
    );
    const patientivoOriginStart = rendering.indexOf("const updatePatientivoBlockOrigin = (entry = {}) => {");
    const patientivoOriginEnd = rendering.indexOf("const getTroncoDestinationCandidateKey", patientivoOriginStart);
    const patientivoOriginBody = patientivoOriginStart >= 0 && patientivoOriginEnd > patientivoOriginStart
        ? rendering.slice(patientivoOriginStart, patientivoOriginEnd)
        : "";
    s.ok(
        "patientivo block origin is not a header route picker because source choices belong to generated salida rows",
        patientivoOriginBody.includes("entry.originSlot.replaceChildren()")
            && patientivoOriginBody.includes("entry.originSlot.hidden = true")
            && patientivoOriginBody.includes("tense-block--has-origin-menu")
            && !patientivoOriginBody.includes("createPatientivoBlockOriginPicker(entry")
            && !patientivoOriginBody.includes("appendChild(originPicker)")
    );
    const verbDestinationStart = rendering.indexOf("const updateVerbTenseBlockDestination = () => {");
    const verbDestinationEnd = rendering.indexOf("tenseTitle.appendChild(titleControls)", verbDestinationStart);
    const verbDestinationBody = verbDestinationStart >= 0 && verbDestinationEnd > verbDestinationStart
        ? rendering.slice(verbDestinationStart, verbDestinationEnd)
        : "";
    s.ok(
        "verbo to patientivo continuation is a generated-row action, not a tense-block destino picker",
        rendering.includes("const appendVerbToPatientivoRowContinuation = ({")
            && rendering.includes('continueButton.dataset.verbPatientivoContinuation = "true"')
            && rendering.includes('continueSubLabel.textContent = "S patientivo"')
            && rendering.includes("appendVerbToPatientivoRowContinuation({")
            && verbDestinationBody.includes("destinationSlot.replaceChildren()")
            && verbDestinationBody.includes("destinationSlot.hidden = true")
            && verbDestinationBody.includes("tense-block--has-destination-menu")
            && !verbDestinationBody.includes("createVerbTenseBlockDestinationPicker({")
            && !verbDestinationBody.includes("destinationSlot.appendChild(destinationPicker)")
            && !rendering.includes("function createVerbTenseBlockDestinationPicker")
    );
    s.ok(
        "active verb tense rows expose implemented verb-derived noun continuations",
        rendering.includes("function getVerbToNominalContinuationSpecsForTense")
            && rendering.includes('targetTense: "agentivo-presente"')
            && rendering.includes('targetTense: "agentivo-preterito"')
            && rendering.includes('targetTense: "agentivo-futuro"')
            && rendering.includes('targetTense: "sustantivo-verbal"')
            && rendering.includes('targetTense: "instrumentivo"')
            && rendering.includes('targetTense: "locativo-temporal"')
            && rendering.includes("const appendVerbToNominalRowContinuations = ({")
            && rendering.includes('continueButton.dataset.verbNominalContinuation = "true"')
            && rendering.includes('continueButton.dataset.targetMode = "sustantivo"')
            && rendering.includes('setActiveTenseMode(TENSE_MODE.sustantivo, { clearRoute: true });')
            && rendering.includes("appendVerbToNominalRowContinuations({")
    );
    s.ok(
        "active verb renderer preserves an explicit promoted object prefix into regular tense blocks",
        rendering.includes("activeLocativePrelocativeVerb === renderVerb")
            && rendering.includes("activeLocativePromotedObjectPrefix")
            && rendering.includes("renderObjectPrefix = activeLocativePromotedObjectPrefix")
            && rendering.includes("function renderAllTenseConjugations({ verb, objectPrefix = \"\", onlyTense = null })")
            && rendering.includes("objectPrefix,")
            && rendering.includes("preferredObjectPrefix: objectPrefix")
            && rendering.includes("const hasExplicitPreferredObject = !isIntransitiveGroup")
            && rendering.includes("activeObjectPrefix = explicitPreferredObjectPrefix")
    );
    const locativeStart = rendering.indexOf("function renderLocativoTemporalConjugations");
    const locativeEnd = rendering.indexOf("function renderNounConjugations", locativeStart);
    const locativeRendererBody = locativeStart >= 0 && locativeEnd > locativeStart
        ? rendering.slice(locativeStart, locativeEnd)
        : "";
    s.ok(
        "locativo-temporal rows do not crash when patientivo continuation helpers are scoped to noun rendering",
        locativeRendererBody.includes('if (typeof renderPatientivoPrelocativeContinuation === "function")')
            && locativeRendererBody.includes('if (typeof renderPatientivoCompoundEmbedContinuation === "function")')
            && locativeRendererBody.includes('if (typeof renderPatientivoNominalCompoundContinuation === "function")')
    );
    s.ok(
        "shared sustantivo renderer exposes denominal route-family metadata without generation",
        rendering.includes("buildDenominalFamilyProfileSubLabels")
            && rendering.includes('profile.outputKind !== "denominal-route"')
            && rendering.includes("appendDenominalFamilyProfileSubLabels")
            && rendering.includes("evaluation.result?.denominalFamilyProfile")
            && rendering.includes("Familia denominal:")
            && rendering.includes("Verbalizador denominal:")
            && rendering.includes("Contrato Andrews: no confirmado")
            && rendering.includes("Cobertura denominal: parcial")
            && rendering.includes("renderDenominalAndrewsContractRouteContinuation")
            && rendering.includes("renderDenominalAndrewsContractRouteContinuationForValue")
            && rendering.includes("ensureDenominalAndrewsRouteContinuationDisplay")
            && rendering.includes("activeDenominalAndrewsContinuationRendered")
            && rendering.includes("denominalAndrewsContractRouteContinuation")
            && rendering.includes("previewActiveNawatDenominalAndrewsContractRouteNextSource")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget")
            && rendering.includes("executableRuleId")
            && rendering.includes("calc-guidance__chip--andrews-rule-executable")
            && state.includes("getNawatDenominalAndrewsExecutableRuleContract")
            && state.includes("executeNawatDenominalAndrewsExecutableRuleContract")
            && state.includes("setActiveNawatDenominalAndrewsContractRouteContext")
            && state.includes("getActiveNawatDenominalAndrewsContractRouteContext")
            && state.includes("previewActiveNawatDenominalAndrewsContractRouteNextSource")
            && state.includes("andrews-54-2-2-hui")
            && state.includes("andrews-54-2-2-hui-lia")
            && state.includes("andrews-54-2-3-ya")
            && state.includes("andrews-54-2-3-ti-ya")
            && state.includes("andrews-54-2-3-hui-ya")
            && state.includes("andrews-54-2-3-ya-lia")
            && state.includes("andrews-54-2-4-a")
            && state.includes("andrews-54-2-5-hua")
            && state.includes("andrews-54-3-included-possessor-ti")
            && state.includes("andrews-54-2-54-4-ti-lia")
            && state.includes("andrews-54-5-ti-a")
            && state.includes("andrews-54-6-t-ia")
            && state.includes("andrews-55-1-temporal-tia")
            && state.includes("andrews-55-2-causative-tla")
            && state.includes("andrews-55-2-tla-ti-lia-applicative")
            && state.includes("andrews-55-2-intransitive-tla")
            && state.includes("andrews-55-2-intransitive-tla-ti-a")
            && state.includes("andrews-55-2-intransitive-tla-ti-lia")
            && state.includes("andrews-55-3-o-a")
            && state.includes("andrews-55-3-huia")
            && state.includes("andrews-55-3-o-a-i-l-huia")
            && state.includes("andrews-55-3-o-a-a-l-huia")
            && state.includes("andrews-55-4-adverbial-huia")
            && state.includes("andrews-55-5-relational-o-a")
            && state.includes("andrews-55-5-relational-huia")
            && state.includes("andrews-55-6-i-hui")
            && state.includes("andrews-55-6-a-hui")
            && state.includes("andrews-55-6-o-a")
            && state.includes("andrews-55-7-i-a")
            && rendering.includes("finiteGenerationRequiresObjectPrefix")
            && rendering.includes("objectPrefixRequired")
            && rendering.includes("denominalAndrewsObjectPrefixChoice")
            && rendering.includes('typeof prefix === "object" ? prefix?.value')
            && rendering.includes("objectPrefixMissing")
            && rendering.includes("is-object-prefix-required")
            && rendering.includes("calc-guidance__chip--object-prefix-choice")
            && rendering.includes("objeto pendiente")
            && rendering.includes("objeto verbal seleccionado explícitamente")
            && rendering.includes('objectButton.dataset.sourceEvidenceRequired = sourceEvidenceRequired ? "true" : ""')
            && rendering.includes('objectButton.dataset.tiSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.huiSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.yaSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.tlaIntransitiveSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.intransitiveOaSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.iHuiAHuiSourceRequired = "true"')
            && rendering.includes("sourceEvidenceRequired")
            && rendering.includes("sourceEvidenceSatisfied")
            && state.includes("sourceEvidenceSupportsTiYaDeverbal")
            && state.includes("sourceEvidenceSupportsHuiYaDeverbal")
            && !rendering.includes("routes.slice(0, 4).forEach")
            && rendering.includes("routes.forEach((route) => {")
            && rendering.includes("tiSourceRequired")
            && rendering.includes("huiSourceRequired")
            && rendering.includes("yaSourceRequired")
            && rendering.includes("tlaIntransitiveSourceRequired")
            && rendering.includes("intransitiveOaSourceRequired")
            && rendering.includes("iHuiAHuiSourceRequired")
            && rendering.includes("temporalSourceRequired")
            && rendering.includes("adverbialSourceRequired")
            && rendering.includes("relationalCompoundSourceRequired")
            && rendering.includes("sourceFinalPatternStatus")
            && rendering.includes("sourceFinalPatternLabel")
            && rendering.includes("sourceFinalClassContract")
            && rendering.includes("is-source-final-class-contract")
            && rendering.includes("traditionalSpellingAmbiguous")
            && rendering.includes("is-traditional-spelling-ambiguous")
            && rendering.includes("buildNawatDenominalSourceEvidenceSubLabels")
            && rendering.includes("Fuente Andrews: cláusula nominal absolutiva generada")
            && rendering.includes("Fuente Andrews: compuesto temporal confirmado")
            && rendering.includes("andrewsRouteWarning")
            && rendering.includes("andrewsRouteNote")
            && rendering.includes("Fuente Andrews: tla intransitiva generada")
            && rendering.includes("Fuente Andrews: o-a intransitiva generada")
            && rendering.includes("Fuente Andrews: tronco adverbial confirmado")
            && rendering.includes("Fuente Andrews: relacional confirmado")
            && css.includes(".calc-guidance__chip--denominal-andrews")
            && css.includes(".calc-guidance__chip--andrews-rule-executable")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-unavailable")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-warning")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-note")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-required")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-satisfied")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-ti-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-hui-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-ya-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-tla-intransitive-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-intransitive-o-a-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-temporal-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-adverbial-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-relational-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-absolutive-source")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-pattern")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-minority")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-needs-confirmation")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-class-contract")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-traditional-spelling-ambiguous")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-object-prefix-required")
            && css.includes(".calc-guidance__chip--object-prefix-choice")
    );
    const guidancePanelStart = rendering.indexOf("function renderOutputGuidancePanel({ verb = \"\" } = {}) {");
    const guidancePanelEnd = rendering.indexOf("function resolveRenderableVerbValue", guidancePanelStart);
    const guidancePanelBody = guidancePanelStart >= 0 && guidancePanelEnd > guidancePanelStart
        ? rendering.slice(guidancePanelStart, guidancePanelEnd)
        : "";
    s.ok(
        "separate output guidance code is removed because continuations belong in #3 salida rows",
        guidancePanelBody.includes('document.getElementById("calc-guidance")')
            && guidancePanelBody.includes("panel.hidden = true")
            && !guidancePanelBody.includes("conversion-rail-block")
            && !guidancePanelBody.includes("renderLineRows")
            && !guidancePanelBody.includes("salida dinámica")
            && !html.includes('id="conversion-rail-block"')
            && !html.includes('id="calc-guidance"')
            && !rendering.includes("const createPatientivoBlockOriginPicker")
            && !rendering.includes("const createTroncoBlockDestinationPicker")
            && !rendering.includes("const createPatientivoPrelocativeDestinationPicker")
            && !rendering.includes("function createNawatRoutePickerMenuSection")
            && !rendering.includes("function createNawatConversionStationPicker")
            && !rendering.includes("function createNawatPatientivoVerbNounConversionPicker")
            && !rendering.includes("function createNawatTroncoConversionSwitchGroup")
            && !rendering.includes("function createNawatVerbNounConversionSwitchGroup")
            && !css.includes(".calc-guidance__route-switch-chip")
            && !css.includes(".calc-guidance__conversion-station-picker")
            && !css.includes(".calc-guidance__branch-picker")
            && rendering.includes('renderOutputGuidancePanel({ verb: "" });')
            && rendering.includes('message: "Selecciona una transitividad para saber su salida."')
    );
    s.ok(
        "Nawat linked stages stay as helper plumbing, not a separate output rail",
        rendering.includes("buildNawatLinkedGrammarStageSubLabels")
            && rendering.includes("getNawatLinkedGrammarCompactRouteLabel")
            && rendering.includes("formatNawatLinkedGrammarCompactChoiceLabel")
            && rendering.includes("buildNawatLinkedGrammarSelectionSummarySubLabels")
            && rendering.includes("attachNawatLinkedGrammarStagesToRailStations")
            && rendering.includes("linkedNextSource")
            && rendering.includes("Siguiente fuente:")
            && rendering.includes("Salida de etapa:")
            && rendering.includes("Continuaciones:")
            && rendering.includes("Opciones siguientes:")
            && rendering.includes("Siguiente salida:")
            && html.indexOf('class="output-meta-strip"') >= 0
            && !rendering.includes("buildNawatLineModels")
            && !rendering.includes("renderNawatLineBoard")
            && !rendering.includes("calc-guidance__line-toggles")
            && !rendering.includes("salida dinámica")
            && rendering.includes("linkedAppendableChoiceLabel")
            && rendering.includes("linkedAppendableSelectionCount")
            && rendering.includes("linkedAppendableActivation")
            && rendering.includes("linkedAppendableAction")
            && rendering.includes("buildNawatLinkedGrammarSelectedPathSubLabels")
            && rendering.includes("buildNawatLinkedGrammarPathExecutionSubLabels")
            && rendering.includes("buildNawatLinkedGrammarPromotedSourceSubLabels")
            && rendering.includes("getNawatLinkedGrammarAppendableSelections")
            && rendering.includes("getFirstNawatLinkedGrammarAppendableSelection")
            && html.indexOf('id="conversion-rail-block"') === -1
            && !html.includes('aria-label="Trayecto de salida"')
            && !css.includes(".calc-guidance__line")
            && !css.includes(".calc-guidance__linked-path-group")
            && rendering.includes("renderPatientivoCompoundEmbedContinuation({")
            && rendering.includes("renderPatientivoNominalCompoundContinuation({")
            && rendering.includes("renderPatientivoCharacteristicPropertyEmbedContinuation({")
    );
    s.ok(
        "instrumentive source-subject possessive output lives in #3 salida rows",
        rendering.includes("renderInstrumentivoSourceSubjectPossessiveContinuation")
            && rendering.includes("instrumentivoSourceSubjectPossessor")
            && rendering.includes("INSTRUMENTIVO_MODE.posesivo")
            && rendering.includes("Andrews 36.6: sujeto fuente")
    );
    s.ok(
        "shared adverbio renderer exposes Lesson 44 diagnostic metadata",
        rendering.includes("buildAdverbialNuclearFrameSubLabels")
            && rendering.includes("appendAdverbialNuclearFrameSubLabels")
            && rendering.includes("evaluation.result?.adverbialNuclearFrame")
            && rendering.includes("adverbial nuclear:")
            && rendering.includes("alcance: adverbio heredado")
    );
    s.ok(
        "shared sustantivo renderer exposes relational NNC boundary metadata without generation",
        rendering.includes("buildRelationalNncBoundaryFrameSubLabels")
            && rendering.includes("appendRelationalNncBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.relationalNncBoundaryFrame")
            && rendering.includes("Relacional nominal:")
            && rendering.includes("Evidencia relacional: no confirmada")
    );
    s.ok(
        "shared sustantivo renderer exposes place/gentilic boundary metadata without generation",
        rendering.includes("buildPlaceGentilicNncBoundaryFrameSubLabels")
            && rendering.includes("appendPlaceGentilicNncBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.placeGentilicNncBoundaryFrame")
            && rendering.includes("Lugar/gentilicio:")
            && rendering.includes("Evidencia L/G: no confirmada")
    );
    s.ok(
        "shared noun/adverb renderer exposes adverbial adjunction boundary metadata without generation",
        rendering.includes("buildAdverbialAdjunctionBoundaryFrameSubLabels")
            && rendering.includes("appendAdverbialAdjunctionBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.adverbialAdjunctionBoundaryFrame")
            && rendering.includes("Adjunción:")
            && rendering.includes("Evidencia adjunción: no confirmada")
    );
    const expectedVerbDerivedNominalizationLabels = [
        "ambito: salida estructural",
        "nominalización: adjetivo",
        "rol nominal: propiedad",
        "fuente verbal: ipan muchiwki",
        "función adjetival: predicado",
        "modificación: no modelada",
    ];
    s.eq(
        "shared sustantivo renderer builds nominalization metadata labels in rendering runtime",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "adjetivo-preterito-tik",
                source: { sourceTense: "preterito" },
                role: {
                    nominalizationKind: "adjectival-surface",
                    semanticRole: "property",
                    patientiveFamily: "",
                    adjectivalFunction: "predicate-surface",
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                    doesNotImplementLessons42_43: true,
                },
            }, { isNawat: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? expectedVerbDerivedNominalizationLabels
            : ["rendering-runtime-not-loaded"]
    );
    const expectedPatientiveNominalizationLabels = [
        "ambito: salida estructural",
        "nominalización: patientivo",
        "rol nominal: paciente/resultado",
        "familia patientiva: perfectivo",
        "fuente patientiva: tronco perfectivo activo",
        "familias Andrews: perfectivo activo",
        "etapa salida: #3 salida",
        "taxonomía patientiva: parcial",
    ];
    s.eq(
        "shared renderer shows patientive-family taxonomy labels as display-only metadata",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "patientivo",
                source: { sourceTense: "" },
                role: {
                    nominalizationKind: "patientive",
                    semanticRole: "patient/result",
                    patientiveFamily: "perfectivo",
                    adjectivalFunction: "",
                },
                patientiveFamilyProfile: {
                    sourcePatternLabel: "tronco perfectivo activo",
                    sourceFamilyLabel: "perfectivo activo",
                    sourceStageModel: { slot: "#3 salida" },
                    isCompletePatientiveTaxonomy: false,
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                    doesNotImplementLessons42_43: true,
                },
            }, { isNawat: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? expectedPatientiveNominalizationLabels
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer labels potential-patient nominalization without invented capability wording",
        typeof ctx.buildVerbDerivedNominalizationProfileSubLabels === "function"
            ? ctx.buildVerbDerivedNominalizationProfileSubLabels({
                outputKind: "verb-derived-nominal",
                nominalKind: "potencial",
                source: { sourceTense: "futuro" },
                role: {
                    nominalizationKind: "potential-patient",
                    semanticRole: "potential-patient",
                    patientiveFamily: "",
                    adjectivalFunction: "",
                },
                boundaries: {
                    nominalizationScope: "structural-word-output",
                },
            }, { isNawat: true })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "ambito: salida estructural",
                "nominalización: paciente potencial",
                "rol nominal: paciente potencial",
                "fuente verbal: ipan muchiwas",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats denominal route-family labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vt-na",
                verbalizer: "-na",
                boundaries: {
                    noAndrewsSuffixContract: true,
                },
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: transitiva -na",
                "Verbalizador denominal: -na",
                "Contrato Andrews: no confirmado",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats denominal Andrews coverage labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-iwi",
                verbalizer: "-iwi",
                andrewsContractCoverage: {
                    unmodeledContractCount: 23,
                    targetUnmodeledContractCount: 0,
                    nawatOnlyRouteFamilies: ["vt-na"],
                },
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: intransitiva -iwi",
                "Verbalizador denominal: -iwi",
                "Contratos Andrews pendientes: 23",
                "Rutas Nawat sin contrato Andrews: transitiva -na",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats Andrews NNC-to-VNC route target preview labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-ti",
                verbalizer: "-ti",
                andrewsContractRoutePreview: {
                    routeCount: 31,
                    finiteRouteRequestCount: 13,
                    finiteRouteObjectPrefixRequiredCount: 3,
                    finiteRouteStemClassContractCount: 11,
                    finiteRouteSourceEvidenceRequiredCount: 18,
                    routeWarningCount: 1,
                    routeNoteCount: 20,
                    routes: [
                        { targetInputValue: "(pusukwi)" },
                        { targetInputValue: "(pusuk)-(ta)" },
                        { targetInputValue: "(pusuk)-(ia)" },
                        { targetInputValue: "(pusuk)-(wia)" },
                    ],
                },
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: intransitiva -ti",
                "Verbalizador denominal: -ti",
                "Objetivos Andrews nominales/verbales: 31",
                "Solicitudes verbales Andrews: 13 con tiempo explícito",
                "Solicitudes verbales Andrews con objeto: 3",
                "Clases verbales Andrews: 11",
                "Fuentes Andrews pendientes: 18",
                "Avisos verbales Andrews: 1",
                "Notas verbales Andrews: 20",
                "Entradas verbales Andrews: (pusukwi), (pusuk)-(ta), (pusuk)-(ia)",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated i-hui/a-hui stages",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vi-iwi",
                verbalizer: "-iwi",
                andrewsContractRoutePreview: {
                    sourceEvidence: {
                        iHuiOrAHuiSource: true,
                        sourceCategory: "i-hui-a-hui-source",
                        sourceBaseStem: "pusuk",
                        boundaries: {
                            sourceEvidenceFromSelectedGeneratedStage: true,
                        },
                    },
                    routeCount: 31,
                    finiteRouteRequestCount: 14,
                    finiteRouteSourceEvidenceRequiredCount: 17,
                },
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: intransitiva -iwi",
                "Verbalizador denominal: -iwi",
                "Fuente Andrews: i-hui/a-hui generada",
                "Base Andrews: pusuk",
                "Evidencia: etapa generada",
                "Objetivos Andrews nominales/verbales: 31",
                "Solicitudes verbales Andrews: 14 con tiempo explícito",
                "Fuentes Andrews pendientes: 17",
                "Cobertura denominal: parcial",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated tla contract routes",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    intransitiveOaSource: true,
                    sourceCategory: "intransitive-o-a",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: tla causativa generada",
                    "Base Andrews: pusuk",
                    "Evidencia: ruta Andrews",
                ],
                [
                    "Fuente Andrews: tla intransitiva generada",
                    "Base Andrews: pusuk",
                    "Evidencia: ruta Andrews",
                ],
                [
                    "Fuente Andrews: o-a intransitiva generada",
                    "Base Andrews: pusuk",
                    "Evidencia: ruta Andrews",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks explicit Andrews temporal, adverbial, and relational source classifications",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    temporalCompoundSource: true,
                    sourceCategory: "compound-temporal-nounstem",
                    sourceBaseStem: "seilwi",
                    timeSegmentMatrix: "ilwi",
                    numeralEmbed: "se",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    adverbialSource: true,
                    sourceCategory: "adverbial-nounstem",
                    sourceBaseStem: "achpa",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    relationalCompoundSource: true,
                    sourceCategory: "compound-relational-nounstem",
                    sourceBaseStem: "kalpan",
                    boundaries: {
                        sourceEvidenceFromExplicitSourceClassification: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: compuesto temporal confirmado",
                    "Base Andrews: seilwi",
                    "Matriz temporal: ilwi",
                    "Numeral embed: se",
                    "Evidencia: fuente clasificada",
                ],
                [
                    "Fuente Andrews: tronco adverbial confirmado",
                    "Base Andrews: achpa",
                    "Evidencia: fuente clasificada",
                ],
                [
                    "Fuente Andrews: relacional confirmado",
                    "Base Andrews: kalpan",
                    "Evidencia: fuente clasificada",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated possessive NNC outputs",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildNawatDenominalSourceEvidenceSubLabels({
                possessiveState: true,
                sourceCategory: "possessive-state-nnc-predicate",
                sourceSurface: "nukal",
                sourceBaseStem: "nukal",
                sourcePossessorPrefix: "nu",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal posesiva generada",
                "Base Andrews: nukal",
                "poseedor fuente: nu",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated ti verbstem routes",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildNawatDenominalSourceEvidenceSubLabels({
                tiSource: true,
                sourceCategory: "inceptive-stative-ti-source",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukti",
                boundaries: {
                    sourceEvidenceFromAndrewsContractRoute: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: ti intransitiva generada",
                "Base Andrews: pusuk",
                "Evidencia: ruta Andrews",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated hui and ya verbstem routes",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? [
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    huiSource: true,
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
                ctx.buildNawatDenominalSourceEvidenceSubLabels({
                    yaSource: true,
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceBaseStem: "pusuk",
                    boundaries: {
                        sourceEvidenceFromAndrewsContractRoute: true,
                    },
                }),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [
                    "Fuente Andrews: hui/wi intransitiva generada",
                    "Base Andrews: pusuk",
                    "Evidencia: ruta Andrews",
                ],
                [
                    "Fuente Andrews: ya intransitiva generada",
                    "Base Andrews: pusuk",
                    "Evidencia: ruta Andrews",
                ],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated ordinary NNC predicate stems",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildNawatDenominalSourceEvidenceSubLabels({
                possessionTiSource: true,
                sourceCategory: "ordinary-nnc-predicate-nounstem",
                sourceSurface: "shuchit",
                sourceBaseStem: "shuchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: tronco nominal generado",
                "Base Andrews: shuchi",
                "Fuente Nawat: shuchit",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated absolutive NNC outputs",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildNawatDenominalSourceEvidenceSubLabels({
                inceptiveTiSource: true,
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceSurface: "shuchit",
                sourceBaseStem: "shuchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal absolutiva generada",
                "Base Andrews: shuchi",
                "Fuente Nawat: shuchit",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer marks Andrews source evidence from generated NNC nounstems downgraded to root rank",
        typeof ctx.buildNawatDenominalSourceEvidenceSubLabels === "function"
            ? ctx.buildNawatDenominalSourceEvidenceSubLabels({
                rootPlusYaSource: true,
                sourceCategory: "nounstem-as-root",
                sourceSurface: "shuchit",
                sourceBaseStem: "shuchi",
                boundaries: {
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente Andrews: cláusula nominal en rango raíz",
                "Base Andrews: shuchi",
                "Fuente Nawat: shuchit",
                "Evidencia: salida nominal",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats linked grammar stage next-source labels",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "pusuktik",
                inputValue: "(pusukti)",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "(pusukti)",
                    displaySurface: "pusuktik",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Siguiente fuente: (pusukti)",
                "Salida de etapa: pusuktik",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses dash-only linked grammar stage source labels",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "—",
                inputValue: "—",
                renderVerb: "—",
                nextSource: {
                    canBecomeSource: true,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer reads linked grammar stage labels from LCM result frames before stale stage fields",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "stale-stage-surface",
                inputValue: "stale-input",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "stale-source",
                    displaySurface: "stale-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-linked-source"],
                        }),
                    }),
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Siguiente fuente: frame-linked-source",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses linked grammar stale labels for an empty LCM result frame",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "stale-stage-surface",
                inputValue: "stale-input",
                renderVerb: "stale-render",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "stale-source",
                    displaySurface: "stale-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surfaceForms: [],
                        }),
                    }),
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer reads linked grammar stage labels from stage LCM result frames before stale fields",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "stale-stage-surface",
                sourceVerb: "stale-stage-source",
                inputValue: "stale-input",
                renderVerb: "stale-render",
                displaySurface: "stale-stage-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-stage-source"],
                    }),
                }),
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "stale-next-source",
                    displaySurface: "stale-next-display",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Siguiente fuente: frame-stage-source",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses linked grammar stage labels for an empty stage LCM result frame",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "stale-stage-surface",
                sourceVerb: "stale-stage-source",
                inputValue: "stale-input",
                renderVerb: "stale-render",
                displaySurface: "stale-stage-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surfaceForms: [],
                    }),
                }),
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "stale-next-source",
                    displaySurface: "stale-next-display",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer carries Andrews i-hui/a-hui source evidence on linked stage labels",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "(pusuktiiwi)",
                inputValue: "(pusuktiiwi)",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "(pusuktiiwi)",
                    displaySurface: "(pusuktiiwi)",
                    sourceEvidence: {
                        iHuiOrAHuiSource: true,
                        sourceCategory: "i-hui-a-hui-source",
                        sourceBaseStem: "pusukti",
                        boundaries: {
                            sourceEvidenceFromSelectedGeneratedStage: true,
                        },
                    },
                },
            }, {
                nextPreview: { candidateRouteCount: 8 },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Siguiente fuente: (pusuktiiwi)",
                "Continuaciones: 8",
                "Fuente Andrews: i-hui/a-hui generada",
                "Base Andrews: pusukti",
                "Evidencia: etapa generada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats linked grammar stage candidate route count when available",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "pusuktik",
                inputValue: "(pusukti)",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "(pusukti)",
                    displaySurface: "pusuktik",
                },
            }, {
                nextPreview: {
                    candidateRouteCount: 8,
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Siguiente fuente: (pusukti)",
                "Salida de etapa: pusuktik",
                "Continuaciones: 8",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    const linkedSelectionSummary = {
        outputKind: "linked-grammar-path-selection-summary",
        currentSource: {
            sourceVerb: "(pusukti)",
        },
        appendableSelectionCount: 2,
        nextRoutes: [
            {
                routeId: "denominal-vi-ti-preterit",
                appendableStages: [
                    {
                        stageKey: "source-mode",
                        sourceVerb: "(pusukti)",
                        selection: {
                            routeId: "denominal-vi-ti-preterit",
                            stageKey: "source-mode",
                        },
                    },
                ],
            },
            {
                routeId: "denominal-vt-na-preterit",
                appendableStages: [
                    {
                        stageKey: "target-mode",
                        sourceVerb: "(pusuktina)",
                        selection: {
                            routeId: "denominal-vt-na-preterit",
                            stageKey: "target-mode",
                        },
                    },
                ],
            },
        ],
    };
    s.eq(
        "shared renderer formats linked grammar path selection summaries",
        typeof ctx.buildNawatLinkedGrammarSelectionSummarySubLabels === "function"
            ? ctx.buildNawatLinkedGrammarSelectionSummarySubLabels(linkedSelectionSummary)
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente actual: (pusukti)",
                "Opciones siguientes: 2",
                "Siguiente salida: intransitiva -ti · fuente → (pusukti)",
                "Siguiente salida: transitiva -na · destino → (pusuktina)",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer exposes the first appendable linked grammar path selection",
        typeof ctx.getFirstNawatLinkedGrammarAppendableSelection === "function"
            ? ctx.getFirstNawatLinkedGrammarAppendableSelection(linkedSelectionSummary)
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                routeId: "denominal-vi-ti-preterit",
                routeFamily: "",
                stageKey: "source-mode",
                stationKey: "",
                sourceVerb: "(pusukti)",
                displaySurface: "(pusukti)",
                sourceObjectPrefix: "",
                selection: {
                    routeId: "denominal-vi-ti-preterit",
                    stageKey: "source-mode",
                },
            }
            : null
    );
    s.eq(
        "shared renderer exposes multiple appendable linked grammar path choices for free composition",
        typeof ctx.getNawatLinkedGrammarAppendableSelections === "function"
            ? ctx.getNawatLinkedGrammarAppendableSelections(linkedSelectionSummary).map((choice) => ({
                routeId: choice.routeId,
                stageKey: choice.stageKey,
                sourceVerb: choice.sourceVerb,
                selection: choice.selection,
            }))
            : [],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    routeId: "denominal-vi-ti-preterit",
                    stageKey: "source-mode",
                    sourceVerb: "(pusukti)",
                    selection: {
                        routeId: "denominal-vi-ti-preterit",
                        stageKey: "source-mode",
                    },
                },
                {
                    routeId: "denominal-vt-na-preterit",
                    stageKey: "target-mode",
                    sourceVerb: "(pusuktina)",
                    selection: {
                        routeId: "denominal-vt-na-preterit",
                        stageKey: "target-mode",
                    },
                },
            ]
            : []
    );
    const framedLinkedSelectionSummary = typeof ctx.buildGrammarFrame === "function"
        && typeof ctx.buildGrammarResultFrame === "function"
        ? {
            outputKind: "linked-grammar-path-selection-summary",
            currentSource: {
                sourceVerb: "(pusukti)",
            },
            appendableSelectionCount: 2,
            nextRoutes: [
                {
                    routeId: "denominal-vi-ti-preterit",
                    appendableStages: [
                        {
                            stageKey: "source-mode",
                            sourceVerb: "stale-stage-source",
                            displaySurface: "stale-stage-display",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: true,
                                    surfaceForms: ["frame-appendable-source"],
                                }),
                            }),
                            selection: {
                                routeId: "denominal-vi-ti-preterit",
                                stageKey: "source-mode",
                            },
                        },
                        {
                            stageKey: "target-mode",
                            sourceVerb: "stale-empty-stage-source",
                            displaySurface: "stale-empty-stage-display",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: false,
                                    surfaceForms: [],
                                }),
                            }),
                            selection: {
                                routeId: "denominal-vi-ti-preterit",
                                stageKey: "target-mode",
                            },
                        },
                    ],
                },
            ],
        }
        : null;
    s.eq(
        "shared renderer reads appendable linked path choices from stage LCM result frames",
        typeof ctx.getNawatLinkedGrammarAppendableSelections === "function"
            && typeof ctx.buildNawatLinkedGrammarSelectionSummarySubLabels === "function"
            && framedLinkedSelectionSummary
            ? {
                labels: ctx.buildNawatLinkedGrammarSelectionSummarySubLabels(framedLinkedSelectionSummary),
                choices: ctx.getNawatLinkedGrammarAppendableSelections(framedLinkedSelectionSummary).map((choice) => ({
                    stageKey: choice.stageKey,
                    sourceVerb: choice.sourceVerb,
                    displaySurface: choice.displaySurface,
                })),
            }
            : null,
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                labels: [
                    "Fuente actual: (pusukti)",
                    "Opciones siguientes: 2",
                    "Siguiente salida: intransitiva -ti · fuente → frame-appendable-source",
                ],
                choices: [
                    {
                        stageKey: "source-mode",
                        sourceVerb: "frame-appendable-source",
                        displaySurface: "frame-appendable-source",
                    },
                ],
            }
            : null
    );
    s.eq(
        "shared renderer appends linked grammar path selection summaries without executing routes",
        typeof ctx.appendNawatLinkedGrammarSelectionSummarySubLabels === "function"
            ? ctx.appendNawatLinkedGrammarSelectionSummarySubLabels("Trayecto", {
                outputKind: "linked-grammar-path-selection-summary",
                currentSource: { sourceVerb: "(pusukti)" },
                appendableSelectionCount: 0,
                diagnostics: [
                    { message: "No reusable stage matches the requested linked grammar path selection." },
                ],
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "Trayecto · Fuente actual: (pusukti) · Diagnóstico: No reusable stage matches the requested linked grammar path selection."
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer formats selected linked grammar path summaries",
        typeof ctx.buildNawatLinkedGrammarSelectedPathSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarSelectedPathSubLabels({
                outputKind: "linked-grammar-path-selection-summary",
                currentSource: { sourceVerb: "(pusuktiiwi)" },
                appendableSelectionCount: 32,
                selectedSteps: [
                    {
                        selection: {
                            routeId: "denominal-vi-ti-preterit",
                            stageKey: "verbalizer",
                        },
                    },
                    {
                        selection: {
                            routeId: "denominal-vi-iwi-preterit",
                            stageKey: "verbalizer",
                        },
                    },
                ],
                nextRoutes: [
                    {
                        routeId: "denominal-vt-na-preterit",
                        appendableStages: [
                            {
                                stageKey: "target-mode",
                                sourceVerb: "(pusuktiiwin)",
                                selection: {
                                    routeId: "denominal-vt-na-preterit",
                                    stageKey: "target-mode",
                                },
                            },
                        ],
                    },
                ],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Trayecto: intransitiva -ti · verbalizador → intransitiva -iwi · verbalizador",
                "Fuente actual: (pusuktiiwi)",
                "Opciones siguientes: 32",
                "Siguiente salida: transitiva -na · destino → (pusuktiiwin)",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats executed linked grammar path summaries",
        typeof ctx.buildNawatLinkedGrammarPathExecutionSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarPathExecutionSubLabels({
                outputKind: "linked-grammar-path-chain-execution",
                stoppedReason: "",
                steps: [
                    {
                        status: "executed",
                        generated: {
                            result: "—",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: true,
                                    surfaceForms: ["nipusukti"],
                                }),
                            }),
                        },
                    },
                    {
                        status: "executed",
                        generated: {
                            result: "—",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: true,
                                    surfaceForms: ["nipusuktiiwi"],
                                }),
                            }),
                        },
                    },
                ],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Trayecto generado: 2",
                "Salida final: nipusuktiiwi",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats promoted linked grammar path sources",
        typeof ctx.buildNawatLinkedGrammarPromotedSourceSubLabels === "function"
            ? ctx.buildNawatLinkedGrammarPromotedSourceSubLabels({
                sourceVerb: "(pusuktiiwi)",
                displaySurface: "pusuktiiwi",
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente: (pusuktiiwi)",
                "Salida: pusuktiiwi",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer reads promoted linked path sources from LCM result frames",
        typeof ctx.buildNawatLinkedGrammarPromotedSourceSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarPromotedSourceSubLabels({
                sourceVerb: "stale-promoted-source",
                displaySurface: "stale-promoted-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-promoted-source"],
                    }),
                }),
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Fuente: frame-promoted-source",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses promoted linked path source labels for an empty LCM result frame",
        typeof ctx.buildNawatLinkedGrammarPromotedSourceSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarPromotedSourceSubLabels({
                sourceVerb: "stale-promoted-source",
                displaySurface: "stale-promoted-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surfaceForms: [],
                    }),
                }),
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "adjectival NNC function target resolver reads LCM result frames before override verb",
        typeof ctx.resolveAdjectivalNncFunctionTargetSurface === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.resolveAdjectivalNncFunctionTargetSurface({
                verb: "stale-override-verb",
                adjectivalNnc: {
                    enabled: true,
                    surface: "stale-adjectival-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-adjectival-target"],
                        }),
                    }),
                },
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "frame-adjectival-target"
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "adjectival NNC function target resolver suppresses override verb for an empty LCM result frame",
        typeof ctx.resolveAdjectivalNncFunctionTargetSurface === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.resolveAdjectivalNncFunctionTargetSurface({
                verb: "stale-override-verb",
                adjectivalNnc: {
                    enabled: true,
                    surface: "stale-adjectival-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                },
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ""
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer attaches linked stage metadata to output stations",
        typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
            ? ctx.attachNawatLinkedGrammarStagesToRailStations(
                [
                    { key: "source", text: "entrada" },
                    { key: "finite", text: "finito" },
                ],
                [
                    {
                        key: "finite-surface",
                        stationKey: "finite-tense",
                        surface: "pusuktik",
                        inputValue: "(pusukti)",
                        nextSource: {
                            canBecomeSource: true,
                            sourceVerb: "(pusukti)",
                            displaySurface: "pusuktik",
                            routeId: "denominal-vi-ti-preterit",
                        },
                    },
                ],
                { routeKey: "denominal-vi-ti-preterit" }
            ).map((station) => ({
                key: station.key,
                sublabel: station.sublabel || "",
                linkedNextSourceLabel: station.linkedNextSourceLabel || "",
            }))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                { key: "source", sublabel: "", linkedNextSourceLabel: "" },
                {
                    key: "finite",
                    sublabel: "Siguiente fuente: (pusukti) · Salida de etapa: pusuktik",
                    linkedNextSourceLabel: "Siguiente fuente: (pusukti) · Salida de etapa: pusuktik",
                },
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer attaches next-source continuation counts to output stations",
        typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
            ? ctx.attachNawatLinkedGrammarStagesToRailStations(
                [
                    { key: "verbalizer", text: "verbalizador" },
                ],
                [
                    {
                        key: "verbalizer",
                        stationKey: "verbalizer",
                        surface: "(pusukti)",
                        inputValue: "(pusukti)",
                        nextSource: {
                            canBecomeSource: true,
                            sourceVerb: "(pusukti)",
                            displaySurface: "(pusukti)",
                            routeId: "denominal-vi-ti-preterit",
                        },
                    },
                ],
                {
                    routeKey: "denominal-vi-ti-preterit",
                    previewNextSource: () => ({ candidateRouteCount: 8 }),
                }
            ).map((station) => ({
                key: station.key,
                linkedNextRouteCount: station.linkedNextRouteCount || 0,
                sublabel: station.sublabel || "",
            }))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    key: "verbalizer",
                    linkedNextRouteCount: 8,
                    sublabel: "Siguiente fuente: (pusukti) · Continuaciones: 8",
                },
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer attaches first appendable linked path choice to output stations",
        typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
            ? ctx.attachNawatLinkedGrammarStagesToRailStations(
                [
                    { key: "verbalizer", text: "verbalizador" },
                ],
                [
                    {
                        key: "verbalizer",
                        stationKey: "verbalizer",
                        surface: "(pusukti)",
                        inputValue: "(pusukti)",
                        nextSource: {
                            canBecomeSource: true,
                            sourceVerb: "(pusukti)",
                            displaySurface: "(pusukti)",
                            routeId: "denominal-vi-ti-preterit",
                        },
                    },
                ],
                {
                    routeKey: "denominal-vi-ti-preterit",
                    previewNextSource: () => ({ candidateRouteCount: 8 }),
                    buildSelectionSummary: () => ({
                        outputKind: "linked-grammar-path-selection-summary",
                        currentSource: { sourceVerb: "(pusukti)" },
                        appendableSelectionCount: 32,
                        nextRoutes: [
                            {
                                routeId: "denominal-vt-na-preterit",
                                appendableStages: [
                                    {
                                        stageKey: "target-mode",
                                        sourceVerb: "(pusuktina)",
                                        selection: {
                                            routeId: "denominal-vt-na-preterit",
                                            stageKey: "target-mode",
                                        },
                                    },
                                ],
                            },
                        ],
                    }),
                    appendSelection: () => ({ outputKind: "linked-grammar-path-selection-state" }),
                }
            ).map((station) => ({
                key: station.key,
                linkedAppendableSelectionCount: station.linkedAppendableSelectionCount || 0,
                linkedAppendableSelection: station.linkedAppendableSelection || null,
                linkedAppendableActivation: station.linkedAppendableActivation || null,
                hasLinkedAppendableAction: typeof station.linkedAppendableAction === "function",
                linkedAppendableChoiceLabel: station.linkedAppendableChoiceLabel || "",
                sublabel: station.sublabel || "",
            }))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    key: "verbalizer",
                    linkedAppendableSelectionCount: 32,
                    linkedAppendableSelection: {
                        routeId: "denominal-vt-na-preterit",
                        stageKey: "target-mode",
                    },
                    linkedAppendableActivation: {
                        routeKey: "denominal-vt-na-preterit",
                        stationKey: "target-mode",
                        sourceVerb: "(pusukti)",
                        sourceObjectPrefix: "",
                    },
                    hasLinkedAppendableAction: true,
                    linkedAppendableChoiceLabel: "Siguiente salida: transitiva -na · destino → (pusuktina)",
                    sublabel: "Siguiente fuente: (pusukti) · Continuaciones: 8 · Siguiente salida: transitiva -na · destino → (pusuktina)",
                },
            ]
            : ["rendering-runtime-not-loaded"]
    );
    const linkedAppendActionCalls = [];
    const linkedAppendActionStations = typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
        ? ctx.attachNawatLinkedGrammarStagesToRailStations(
            [
                { key: "verbalizer", text: "verbalizador" },
            ],
            [
                {
                    key: "verbalizer",
                    stationKey: "verbalizer",
                    surface: "(pusukti)",
                    inputValue: "(pusukti)",
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        routeId: "denominal-vi-ti-preterit",
                    },
                },
            ],
            {
                routeKey: "denominal-vi-ti-preterit",
                buildSelectionSummary: () => ({
                    outputKind: "linked-grammar-path-selection-summary",
                    currentSource: { sourceVerb: "(pusukti)" },
                    appendableSelectionCount: 1,
                    nextRoutes: [
                        {
                            routeId: "denominal-vt-na-preterit",
                            appendableStages: [
                                {
                                    stageKey: "target-mode",
                                    sourceVerb: "(pusuktina)",
                                    selection: {
                                        routeId: "denominal-vt-na-preterit",
                                        stageKey: "target-mode",
                                    },
                                },
                            ],
                        },
                    ],
                }),
                appendSelection: (...args) => {
                    linkedAppendActionCalls.push(args);
                    return { ok: true };
                },
            }
        )
        : [];
    if (linkedAppendActionStations[0]?.linkedAppendableAction) {
        linkedAppendActionStations[0].linkedAppendableAction("choice-node");
    }
    s.eq(
        "linked stage append action stores selected next route without activating the current station",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? linkedAppendActionCalls.map(([selection, options]) => ({
                selection,
                sourceVerb: options.sourceVerb,
                sourceObjectPrefix: options.sourceObjectPrefix,
                anchorElement: options.anchorElement,
            }))
            : [],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    selection: {
                        routeId: "denominal-vt-na-preterit",
                        stageKey: "target-mode",
                    },
                    sourceVerb: "(pusukti)",
                    sourceObjectPrefix: "",
                    anchorElement: "choice-node",
                },
            ]
            : []
    );
    const linkedStageActionCalls = [];
    const linkedStageActionStations = typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
        ? ctx.attachNawatLinkedGrammarStagesToRailStations(
            [
                { key: "finite", text: "finito" },
            ],
            [
                {
                    key: "finite-surface",
                    stationKey: "finite-tense",
                    surface: "pusuktik",
                    inputValue: "(pusukti)",
                    routeContext: {
                        sourceVerb: "(pusuni)",
                        sourceObjectPrefix: "",
                    },
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusukti)",
                        displaySurface: "pusuktik",
                        routeId: "denominal-vi-ti-preterit",
                    },
                },
            ],
            {
                routeKey: "denominal-vi-ti-preterit",
                activateStation: (...args) => {
                    linkedStageActionCalls.push(args);
                    return { ok: true };
                },
            }
        )
        : [];
    if (linkedStageActionStations[0]?.action) {
        linkedStageActionStations[0].action("anchor-node");
    }
    s.eq(
        "linked stage action preserves original route source while exposing next source",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? linkedStageActionCalls.map(([routeKey, stationKey, options]) => ({
                routeKey,
                stationKey,
                sourceVerb: options.sourceVerb,
                sourceObjectPrefix: options.sourceObjectPrefix,
                render: options.render,
                anchorElement: options.anchorElement,
            }))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    routeKey: "denominal-vi-ti-preterit",
                    stationKey: "finite-tense",
                    sourceVerb: "(pusuni)",
                    sourceObjectPrefix: "",
                    render: true,
                    anchorElement: "anchor-node",
                },
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats diagnostic nuclear clause labels in rendering runtime",
        typeof ctx.buildNuclearClauseShellSubLabels === "function"
            ? ctx.buildNuclearClauseShellSubLabels({
                kind: "nuclear-clause-shell",
                formulaType: "VNC",
                displayLabel: "cláusula nuclear verbal (CNV)",
                formula: "#pers1-pers2+obj1-obj2-obj3-reflexivo(STEM)tiempo+num1-num2#",
                formulaEcho: "#ni-Ø+ki(nemi)Ø+Ø-Ø#",
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["cláusula verbal: #pers1-pers2+obj1-obj2-obj3-reflexivo(base)tiempo+núm1-núm2#", "Fórmula CNV: #ni-Ø+ki(nemi)Ø+Ø-Ø#"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "visible Andrews formula renderer uses the approved compact Spanish formula only in formula text",
        typeof ctx.formatVisibleAndrewsFormula === "function"
            ? [
                ctx.formatVisibleAndrewsFormula("#pers1-pers2(STEM)tns+num1-num2#"),
                ctx.formatVisibleAndrewsFormula("#persona1-persona2(STEM)tense+número1-número2#"),
                ctx.formatVisibleAndrewsFormula("#pers1-pers2+st1-st2(STEM)num1-num2#"),
            ]
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "#pers1-pers2(base)tiempo+núm1-núm2#",
                "#pers1-pers2(base)tiempo+núm1-núm2#",
                "#pers1-pers2+est1-est2(base)núm1-núm2#",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "visible CNV formula renderer shows base surface realizations from formula path",
        typeof ctx.formatVisibleCnvFormulaEcho === "function" && typeof ctx.buildGeneratedOutputSlotChips === "function"
            ? (() => {
                const result = {
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        displayLabel: "cláusula nuclear verbal (CNV)",
                        formula: "#pers1-pers2+val1-val2(STEM)tns+num1-num2#",
                        formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                    },
                    cnvFormulaSurfacePath: {
                        surfaceStemRealizations: ["pish", "piya"],
                        surfaceNumberConnectorRealizations: ["ki-0", "k-0"],
                        pathsBySurface: [
                            {
                                surface: "pishki",
                                paths: [
                                    { formulaSlotKey: "pers1", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "base", formulaMorph: "piya", surfaceValue: "pish" },
                                    { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "num1", formulaMorph: "ki", surfaceValue: "ki" },
                                    { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
                                ],
                            },
                            {
                                surface: "piyak",
                                paths: [
                                    { formulaSlotKey: "pers1", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "base", formulaMorph: "piya", surfaceValue: "piya" },
                                    { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
                                    { formulaSlotKey: "num1", formulaMorph: "k", surfaceValue: "k" },
                                    { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
                                ],
                            },
                        ],
                    },
                };
                return {
                    formula: ctx.formatVisibleCnvFormulaEcho(result.nuclearClauseShell.formulaEcho, result),
                    shellLabels: ctx.buildNuclearClauseShellSubLabels(result.nuclearClauseShell, result),
                    formulaChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "formula")
                        .map((chip) => ({
                            label: chip.label,
                            value: chip.value,
                            title: chip.title,
                        })),
                    slotChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => ["STEM", "num1-num2"].includes(chip.kind))
                        .map((chip) => [chip.kind, chip.label, chip.value]),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formula: "#0-0+ki-0(pish)0+ki-0# / #0-0+ki-0(piya)0+k-0#",
                shellLabels: [
                    "cláusula verbal: #pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
                    "Fórmula CNV: #0-0+ki-0(pish)0+ki-0# / #0-0+ki-0(piya)0+k-0#",
                ],
                formulaChips: [
                    {
                        label: "Fórmula CNV",
                        value: "#0-0+ki-0(pish)0+ki-0#",
                        title: "Fórmula CNV: #0-0+ki-0(pish)0+ki-0# · salida: pishki",
                    },
                    {
                        label: "Fórmula CNV",
                        value: "#0-0+ki-0(piya)0+k-0#",
                        title: "Fórmula CNV: #0-0+ki-0(piya)0+k-0# · salida: piyak",
                    },
                ],
                slotChips: [
                    ["STEM", "base", "(pish/piya)"],
                    ["num1-num2", "número1-número2", "ki-0/k-0"],
                ],
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer derives VNC slot chips from formula echo when slot objects are absent",
        typeof ctx.buildGeneratedOutputSlotChips === "function"
            ? ctx.buildGeneratedOutputSlotChips({
                nuclearClauseShell: {
                    kind: "nuclear-clause-shell",
                    formulaType: "VNC",
                    formulaEcho: "#Ø-Ø+ki-(ilpia)Ø+Ø-t#",
                },
            }).map((chip) => [chip.kind, chip.label, chip.value])
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                ["formula", "Fórmula CNV", "#Ø-Ø+ki-(ilpia)Ø+Ø-t#"],
                ["pers1-pers2", "persona1-persona2", "Ø-Ø"],
                ["obj1", "objeto 1", "ki"],
                ["STEM", "base", "-(ilpia)"],
                ["tiempo", "tiempo", "Ø"],
                ["num1-num2", "número1-número2", "Ø-t"],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer adds Lesson 2 process chips from generated output frames",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.buildOutputWordResult === "function"
            ? ctx.buildGeneratedOutputSlotChips(ctx.buildOutputWordResult({
                pers1: "ni",
                tronco: "chinam",
            }))
                .filter((chip) => chip.kind === "lesson2")
                .map((chip) => [
                    chip.label,
                    chip.value,
                    chip.title.includes("Andrews L2 2.11.5 / 2.13.2"),
                    chip.title.includes("asimilación regresiva"),
                    chip.title.includes("posición:"),
                    chip.title.includes("casilla:"),
                    !chip.title.includes("Regressive Assimilation"),
                    !chip.title.includes("not a global letter replacement"),
                ])
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [["", "m→n", true, true, true, true, true, true]]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer keeps Lesson 2 candidate chips compact without treating candidates as deletion",
        typeof ctx.buildGeneratedOutputLesson2ChipValue === "function"
            ? ctx.buildGeneratedOutputLesson2ChipValue({
                sourceSurface: "-uh",
                target: "",
                targetCandidates: ["w", "uj", "j"],
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "-uh→w/uj/j"
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer keeps Lesson 2 deletion chips short while preserving detail",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.buildOutputWordResult === "function"
            ? [
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "ita",
                    surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
                }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    tronco: "nemia",
                    surfaceRuleMeta: { trimFinalIAUAVowel: true },
                }),
            ].map((result) => ctx.buildGeneratedOutputSlotChips(result)
                .filter((chip) => chip.kind === "lesson2")
                .map((chip) => [
                    chip.label,
                    chip.value,
                    chip.title.includes("Andrews L2 2.14"),
                    chip.title.includes("elisión vocálica"),
                    chip.title.includes("posición:"),
                    chip.title.includes("casilla:"),
                    !chip.title.includes("Vowel Elision"),
                ]))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                [["", "i→Ø", true, true, true, true, true]],
                [["", "a→Ø", true, true, true, true, true]],
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer adds Lesson 2 process chip for generated mima preterit row",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const result = ctx.executeGenerateWordRequest({
                    options: {
                        silent: true,
                        skipValidation: false,
                        override: {
                            tenseMode: ctx.TENSE_MODE.verbo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                        },
                    },
                    posicionesFormula: {
                        pers1: "",
                        obj1: "ki",
                        tronco: "-(mima)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "preterito",
                    },
                    entradaTronco: {
                        tieneControlTronco: false,
                        valorTronco: "",
                    },
                });
                return {
                    result: result.result,
                    chips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "lesson2")
                        .map((chip) => [
                            chip.label,
                            chip.value,
                            chip.title.includes("Andrews L2 2.11.5 / 2.13.2"),
                            chip.title.includes("asimilación regresiva"),
                            chip.title.includes("posición:"),
                            !chip.title.includes("Regressive Assimilation"),
                        ]),
                };
            })()
            : { result: "rendering-runtime-not-loaded", chips: [] },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                result: "kimin(ki)",
                chips: [["", "m→n", true, true, true, true]],
            }
            : { result: "rendering-runtime-not-loaded", chips: [] }
    );
    s.eq(
        "shared renderer formats diagnostic VNC verbstem class labels",
        typeof ctx.buildVncVerbstemClassProfileSubLabels === "function"
            ? ctx.buildVncVerbstemClassProfileSubLabels({
                kind: "vnc-verbstem-class-profile",
                classKey: "C",
                ruleSummary: {
                    ruleLabel: "open syllable non-u ia/ua adds class C",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Clase de tronco: C", "Diagnóstico de tronco: open syllable non-u ia/ua adds class C"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats diagnostic VNC valency frame labels",
        typeof ctx.buildVncValencyFrameSubLabels === "function"
            ? ctx.buildVncValencyFrameSubLabels({
                kind: "vnc-valency-frame",
                valencyLabel: "transitiva",
                obj1: { displayPrefix: "ki" },
                lesson6DirectNawatObject: {
                    visibleFormulaPrefix: "ki-0",
                    formulaPosition: "va1-va2",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["valencia verbal: transitiva", "objeto 1 verbal: ki", "posición de valencia: val1-val2", "subcasillas Nawat: ki-0"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats derived voice frame labels",
        typeof ctx.buildDerivedVoiceFrameSubLabels === "function"
            ? ctx.buildDerivedVoiceFrameSubLabels({
                kind: "derived-voice-frame",
                voice: { label: "pasivo/impersonal" },
                valency: {
                    sourceValency: 2,
                    targetValency: 1,
                    baseObj1: "ki",
                    selectedObj1: "",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["voz derivada: pasivo/impersonal", "valencia derivada: 2->1", "objeto base: ki->Ø"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats forward derivation frame labels",
        typeof ctx.buildForwardDerivationFrameSubLabels === "function"
            ? ctx.buildForwardDerivationFrameSubLabels({
                kind: "forward-derivation-frame",
                derivation: { label: "causativa" },
                valency: {
                    sourceValency: 1,
                    derivedValency: 2,
                },
                stem: { selectedStem: "nemtia" },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["derivación verbal: causativa", "valencia derivada: 1->2", "tronco derivado: nemtia"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats compound frame labels",
        typeof ctx.buildCompoundFrameSubLabels === "function"
            ? ctx.buildCompoundFrameSubLabels({
                kind: "compound-frame",
                matrix: { stem: "kwi" },
                embeds: [
                    { role: "outer-lexical", value: "shuchi" },
                ],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["compuesto verbal: kwi", "incrustado: outer-lexical shuchi"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats adverbial nuclear frame labels",
        typeof ctx.buildAdverbialNuclearFrameSubLabels === "function"
            ? ctx.buildAdverbialNuclearFrameSubLabels({
                kind: "adverbial-nuclear-frame",
                adverbial: { label: "manera" },
                sourceVnc: {
                    stem: "mati",
                    valency: "transitive",
                },
                adverbialNuclearClauseFrame: {
                    adverbialization: {
                        degree: "first-degree",
                        semanticDomain: "manner",
                    },
                },
                boundaries: { configuredAdverbioSurfaceOnly: true },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "adverbial nuclear: manera",
                "fuente verbal: mati",
                "valencia fuente: transitiva",
                "grado: primer grado",
                "dominio: manera",
                "alcance: adverbio heredado",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats relational NNC boundary frame labels",
        typeof ctx.buildRelationalNncBoundaryFrameSubLabels === "function"
            ? ctx.buildRelationalNncBoundaryFrameSubLabels({
                kind: "relational-nnc-boundary-frame",
                statusLabel: "no confirmado",
                candidate: { kindLabel: "locativo-temporal generado" },
                boundaries: { locativeTemporalNominalIsEvidence: false },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Relacional nominal: no confirmado",
                "Candidato: locativo-temporal generado",
                "Evidencia relacional: no confirmada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats place/gentilic boundary frame labels",
        typeof ctx.buildPlaceGentilicNncBoundaryFrameSubLabels === "function"
            ? ctx.buildPlaceGentilicNncBoundaryFrameSubLabels({
                kind: "place-gentilic-nnc-boundary-frame",
                statusLabel: "no confirmado",
                candidate: { kindLabel: "locativo-temporal generado" },
                boundaries: { locativeTemporalNominalIsEvidence: false },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Lugar/gentilicio: no confirmado",
                "Candidato L/G: locativo-temporal generado",
                "Evidencia L/G: no confirmada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats adverbial adjunction boundary frame labels",
        typeof ctx.buildAdverbialAdjunctionBoundaryFrameSubLabels === "function"
            ? ctx.buildAdverbialAdjunctionBoundaryFrameSubLabels({
                kind: "adverbial-adjunction-boundary-frame",
                statusLabel: "no confirmada",
                candidate: { label: "locativo-temporal generado" },
                boundaries: { singleGeneratedWordIsEvidence: false },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Adjunción: no confirmada",
                "Unidad adjunta: locativo-temporal generado",
                "Evidencia adjunción: no confirmada",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer inverts LCM grammar frames into user-facing route labels",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "diagnostic-only",
                    andrewsRefs: ["Andrews Lesson 53"],
                    supported: false,
                }),
                orthographyFrame: {
                    surface: "",
                    noClassicalSurfaceImport: true,
                },
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "comparison",
                    routeStage: "classify-boundary",
                    generationAllowed: false,
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "comparison-candidate-classification",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "diagnostic-only",
                    diagnostics: [{
                        id: "comparison-needs-nawat-clause-evidence",
                        severity: "diagnostic",
                    }],
                }),
            }))
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Estado de contrato: bloqueado",
                "Ruta de contrato: comparación / clasificar límite",
                "Generación de contrato: no autorizada",
                "Andrews: Andrews Lesson 53",
                "Evidencia: solo diagnóstico",
                "Falla de contrato: autoridad / marco de autoridad",
                "Diagnóstico de contrato: comparación necesita evidencia de cláusula nawat",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "dynamic visible renderer labels keep raw English LCM metadata out of Spanish UI surfaces",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildGrammarFrameSubLabels === "function"
            && typeof ctx.buildNuclearClauseShellSubLabels === "function"
            && typeof ctx.buildGeneratedOutputSlotChips === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarAuthorityFrame === "function"
            && typeof ctx.buildGrammarRouteContractFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            && typeof ctx.buildGrammarDiagnosticFrame === "function"
            ? (() => {
                const frameLabels = ctx.buildGrammarFrameSubLabels(ctx.buildGrammarFrame({
                    authorityFrame: ctx.buildGrammarAuthorityFrame({
                        evidenceStatus: "diagnostic-only",
                        andrewsRefs: ["Andrews Lesson 53"],
                        supported: false,
                    }),
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "comparison",
                        routeStage: "classify-boundary",
                        generationAllowed: false,
                    }),
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        outputKind: "comparison-candidate-classification",
                    }),
                    diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                        diagnostics: [{
                            id: "comparison-needs-nawat-clause-evidence",
                            severity: "diagnostic",
                        }],
                    }),
                }));
                const shellLabels = ctx.buildNuclearClauseShellSubLabels({
                    kind: "nuclear-clause-shell",
                    formulaType: "VNC",
                    displayLabel: "cláusula nuclear verbal (CNV)",
                    formula: "#pers1-pers2(STEM)tns+num1-num2#",
                });
                const chipLabels = ctx.buildGeneratedOutputSlotChips({
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        formulaEcho: "#Ø-Ø+ki-(ilpia)Ø+Ø-t#",
                    },
                }).flatMap((chip) => [chip.label, chip.value, chip.title].filter(Boolean));
                const bannedVisiblePattern = /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function|\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b|\btns\b|diagnostic-only|classify-boundary|authorityFrame|resultFrame|routeContract|needs-nawat-clause-evidence/i;
                return [...frameLabels, ...shellLabels, ...chipLabels]
                    .filter((label) => bannedVisiblePattern.test(String(label || "")));
            })()
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module" ? [] : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer labels Nawat realization from LCM result-frame surface forms",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(ctx.buildGrammarFrame({
                orthographyFrame: {
                    surface: "stale-orthography-surface",
                    surfaceForms: ["stale-orthography-a / stale-orthography-b"],
                    noClassicalSurfaceImport: true,
                },
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surfaceForms: ["frame-render-a / frame-render-b"],
                    outputKind: "vnc",
                }),
            }), {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Realización Nawat: frame-render-a"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer suppresses orthography realization labels for empty LCM result frames",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels(ctx.buildGrammarFrame({
                orthographyFrame: {
                    surface: "stale-orthography-surface",
                    surfaceForms: ["stale-orthography-a"],
                    nawatRuleSpelling: "stale-rule-spelling",
                    noClassicalSurfaceImport: true,
                },
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "blocked-vnc",
                }),
            }), {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer still labels orthography-only realization when no result frame exists",
        typeof ctx.buildGrammarFrameSubLabels === "function"
            ? ctx.buildGrammarFrameSubLabels({
                routeContract: {},
                orthographyFrame: {
                    surface: "orthography-only-surface",
                    noClassicalSurfaceImport: true,
                },
            }, {
                includeResult: false,
                includeRoute: false,
                includeAuthority: false,
                includeDiagnostics: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Realización Nawat: orthography-only-surface"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer reads LCM result-frame surface forms before stale result text",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "stale-surface",
                surfaceForms: ["stale-render-a / stale-render-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-surface",
                        surfaceForms: ["frame-a / frame-b"],
                    }),
                }),
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["frame-a", "frame-b", "frame-surface"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer stops at empty LCM result frames before stale result text",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "stale-surface",
                surfaceForms: ["stale-render-a / stale-render-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? []
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer does not let top-level surface hide surface-form variants",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "stale-form",
                surface: "top-surface",
                surfaceForms: ["top-a / top-b"],
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["top-a", "top-b", "top-surface"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer exposes the primary LCM result-frame surface for continuation targets",
        typeof ctx.getPrimaryConjugationSurface === "function"
            ? ctx.getPrimaryConjugationSurface({
                result: "—",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-target-surface",
                    }),
                }),
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "frame-target-surface"
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer joins LCM result-frame surfaces for display values",
        typeof ctx.getConjugationDisplaySurface === "function"
            ? ctx.getConjugationDisplaySurface({
                result: "stale-form",
                surface: "stale-surface",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-surface",
                        surfaceForms: ["frame-a / frame-b"],
                    }),
                }),
            })
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "frame-a / frame-b / frame-surface"
            : "rendering-runtime-not-loaded"
    );
    s.ok(
        "rendering display paths consume LCM display surfaces instead of stale result text",
        rendering.includes("function getConjugationDisplaySurface(result = null)")
            && rendering.includes("const surfaceDisplay = getConjugationDisplaySurface(result);")
            && rendering.includes("sourceSurface: surfaceDisplay")
            && rendering.includes("formattedValue: formatConjugationDisplay(getConjugationDisplaySurface(result))")
            && rendering.includes("formattedValue: formatConjugationDisplay(getConjugationDisplaySurface(evaluation.result))")
            && rendering.includes("formatConjugationDisplay(getConjugationDisplaySurface(result))")
            && rendering.includes("const finalSurface = getPrimaryConjugationSurface(lastGenerated)")
            && !rendering.includes("lastGenerated?.primarySurface")
            && rendering.includes("const surface = getPrimaryConjugationSurface(preview);")
            && rendering.includes("const sourceSurface = getPrimaryConjugationSurface(presentResult);")
            && rendering.includes("const sourceSurface = getConjugationDisplaySurface(evaluation?.result);")
            && !rendering.includes("formatConjugationDisplay(result.result")
            && !rendering.includes("formatConjugationDisplay(evaluation.result.result")
            && !rendering.includes("sourceSurface: result.result")
            && !rendering.includes('String(preview.result || "").split')
            && !rendering.includes('String(presentResult.result || "").split')
            && !rendering.includes('String(evaluation?.result?.result || "").trim()')
            && !rendering.includes("Array.isArray(entry.result?.surfaceForms) && entry.result.surfaceForms.length")
    );
    s.ok(
        "view export rows preserve LCM route metadata instead of flattening to form text only",
        exportUi.includes("function normalizeUnifiedVerbOutputGrammarMetadata")
            && exportUi.includes("function getUnifiedVerbOutputGrammarDatasetMetadata")
            && exportUi.includes("function projectUnifiedVerbOutputVisibleRow")
            && exportUi.includes('"ruta de contrato"')
            && exportUi.includes("row.grammarRouteFamily")
            && exportUi.includes("row.grammarDiagnosticLayer")
            && rendering.includes("applyGrammarFrameRouteDataset(row, evaluation.result)")
            && rendering.includes("getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset)")
            && rendering.includes("grammarMetadata = {}")
    );
    s.ok(
        "nonactive structured export rows carry row grammar metadata",
        rendering.includes("buildOutputRowEntry: ({ person, personSub, form, slotValuesById, grammarMetadata })")
            && rendering.includes("grammarMetadata,")
            && !rendering.includes("buildOutputRowEntry: ({ person, personSub, form, slotValuesById })")
    );
    s.eq(
        "view export normalization keeps LCM failed-layer metadata",
        typeof ctx.normalizeUnifiedVerbOutputEntry === "function"
            ? (() => {
                const row = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "Ruta bloqueada antes de generar por la evidencia Andrews del contrato.",
                    grammarAuthorityRefs: "Andrews Lesson 5|Andrews Lesson 7",
                    grammarEvidenceStatus: "blocked",
                    grammarRouteFamily: "vnc",
                    grammarRouteStage: "execute",
                    grammarGenerationAllowed: false,
                    grammarDiagnosticStatus: "blocked",
                    grammarDiagnosticId: "ANDREWS_ROUTE_NOT_LICENSED",
                    grammarDiagnosticLayer: "route",
                    grammarDiagnosticContractLayer: "routeContract",
                    grammarResultOk: false,
                });
                return {
                    routeFamily: row.grammarRouteFamily,
                    routeStage: row.grammarRouteStage,
                    generationAllowed: row.grammarGenerationAllowed,
                    authorityRefs: row.grammarAuthorityRefs,
                    diagnosticStatus: row.grammarDiagnosticStatus,
                    diagnosticId: row.grammarDiagnosticId,
                    diagnosticLayer: row.grammarDiagnosticLayer,
                    diagnosticContractLayer: row.grammarDiagnosticContractLayer,
                    resultOk: row.grammarResultOk,
                };
            })()
            : { routeFamily: "export-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                routeFamily: "vnc",
                routeStage: "execute",
                generationAllowed: "false",
                authorityRefs: "Andrews Lesson 5|Andrews Lesson 7",
                diagnosticStatus: "blocked",
                diagnosticId: "ANDREWS_ROUTE_NOT_LICENSED",
                diagnosticLayer: "route",
                diagnosticContractLayer: "routeContract",
                resultOk: "false",
            }
            : { routeFamily: "export-runtime-not-loaded" }
    );
    s.eq(
        "view export form reads LCM result frames before stale form text",
        typeof ctx.normalizeUnifiedVerbOutputEntry === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const framed = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "stale export form",
                    result: {
                        result: "stale nested result",
                        surface: "stale nested surface",
                        surfaceForms: ["stale nested a / stale nested b"],
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: true,
                                surface: "frame export surface",
                                surfaceForms: ["frame export a / frame export b"],
                            }),
                        }),
                    },
                });
                const emptyFramed = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "stale empty export form",
                    result: {
                        result: "stale empty nested result",
                        surface: "stale empty nested surface",
                        surfaceForms: ["stale empty nested a / stale empty nested b"],
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: false,
                                surface: "",
                                surfaceForms: [],
                            }),
                        }),
                    },
                });
                const stale = ctx.normalizeUnifiedVerbOutputEntry({
                    block: "Intransitivo",
                    person: "1sg",
                    form: "stale export form",
                });
                return {
                    framed: framed.form,
                    emptyFramed: emptyFramed.form,
                    stale: stale.form,
                };
            })()
            : { framed: "export-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                framed: "frame export a / frame export b / frame export surface",
                emptyFramed: "",
                stale: "stale export form",
            }
            : { framed: "export-runtime-not-loaded" }
    );
    s.eq(
        "view export CSV includes LCM route and diagnostic columns",
        typeof ctx.setUnifiedVerbOutputDatasetRows === "function"
            && typeof ctx.buildViewExportCSV === "function"
            && ctx.VerbUnifiedOutputState
            ? (() => {
                const previousState = {
                    rows: ctx.VerbUnifiedOutputState.rows,
                    bySourceKey: ctx.VerbUnifiedOutputState.bySourceKey,
                    grouped: ctx.VerbUnifiedOutputState.grouped,
                    updatedAt: ctx.VerbUnifiedOutputState.updatedAt,
                };
                try {
                    ctx.setUnifiedVerbOutputDatasetRows([{
                        tenseValue: "present",
                        groupKey: "universal",
                        inputValue: "ka",
                        sourceMode: ctx.COMBINED_MODE?.active || "active",
                        block: "Intransitivo",
                        person: "1sg",
                        form: "Ruta bloqueada antes de generar por la evidencia Andrews del contrato.",
                        grammarAuthorityRefs: "Andrews Lesson 5",
                        grammarEvidenceStatus: "blocked",
                        grammarRouteFamily: "vnc",
                        grammarRouteStage: "execute",
                        grammarGenerationAllowed: "false",
                        grammarDiagnosticStatus: "blocked",
                        grammarDiagnosticId: "ANDREWS_ROUTE_NOT_LICENSED",
                        grammarDiagnosticLayer: "route",
                        grammarDiagnosticContractLayer: "routeContract",
                        grammarResultOk: "false",
                    }], {
                        tenseValue: "present",
                        groupKey: "universal",
                    });
                    const csv = ctx.buildViewExportCSV();
                    return {
                        hasRouteHeader: csv.includes("ruta de contrato"),
                        hasGenerationHeader: csv.includes("generación de contrato"),
                        hasDiagnosticStatusHeader: csv.includes("estado diagnóstico de contrato"),
                        hasDiagnosticHeader: csv.includes("capa fallida"),
                        hasRowInputValue: csv.split(/\r?\n/)[1]?.startsWith("ka,") === true,
                        hasRouteValue: csv.includes("vnc,execute,false"),
                        hasDiagnosticValue: csv.includes("ANDREWS_ROUTE_NOT_LICENSED,route,routeContract,false"),
                    };
                } finally {
                    ctx.VerbUnifiedOutputState.rows = previousState.rows;
                    ctx.VerbUnifiedOutputState.bySourceKey = previousState.bySourceKey;
                    ctx.VerbUnifiedOutputState.grouped = previousState.grouped;
                    ctx.VerbUnifiedOutputState.updatedAt = previousState.updatedAt;
                }
            })()
            : {
                hasRouteHeader: false,
                hasGenerationHeader: false,
                hasDiagnosticStatusHeader: false,
                hasDiagnosticHeader: false,
                hasRowInputValue: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                hasRouteHeader: true,
                hasGenerationHeader: true,
                hasDiagnosticStatusHeader: true,
                hasDiagnosticHeader: true,
                hasRowInputValue: true,
                hasRouteValue: true,
                hasDiagnosticValue: true,
            }
            : {
                hasRouteHeader: false,
                hasGenerationHeader: false,
                hasDiagnosticStatusHeader: false,
                hasDiagnosticHeader: false,
                hasRowInputValue: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            }
    );
    s.eq(
        "slot-strip view export uses only visible rendered slot strips",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            && typeof ctx.buildPersonSubSlotStripViewExportCSV === "function"
            ? (() => {
                const documentObject = ctx.document || {};
                const previousGetElementById = documentObject.getElementById;
                const makeTextNode = (text) => ({ textContent: text });
                const makeChip = ({ kind, label, value, detail = "" }) => ({
                    className: `person-sub__slot-chip person-sub__slot-chip--${kind}`,
                    textContent: `${label}: ${value}`,
                    dataset: detail ? { detail } : {},
                    title: "",
                    querySelector(selector) {
                        if (selector === ".person-sub__slot-chip-label") {
                            return makeTextNode(`${label}: `);
                        }
                        if (selector === ".person-sub__slot-chip-value") {
                            return makeTextNode(` ${value}`);
                        }
                        return null;
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                });
                const block = {
                    querySelector(selector) {
                        return selector === ".tense-block__label" ? makeTextNode("Transitivo") : null;
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                const sourceColumn = {
                    dataset: { sourceMode: ctx.COMBINED_MODE?.active || "active" },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                const makeRow = ({ hidden = false, form = "nikpalehuia", slotValue = "palehuia" } = {}) => {
                    const chips = [
                        makeChip({
                            kind: "formula",
                            label: "pers1-pers2",
                            value: "ni-Ø",
                            detail: "formula CNV",
                        }),
                        makeChip({
                            kind: "stem",
                            label: "STEM",
                            value: slotValue,
                            detail: "tronco dentro de parentesis",
                        }),
                    ];
                    const strip = {
                        className: "person-sub__slot-strip",
                        textContent: chips.map((chip) => chip.textContent).join(""),
                        querySelectorAll(selector) {
                            return selector === ".person-sub__slot-chip" ? chips : [];
                        },
                        getAttribute() {
                            return "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    const compact = makeTextNode("cláusula nuclear CNV");
                    const personSub = {
                        textContent: compact.textContent,
                        querySelector(selector) {
                            if (selector === ".person-sub__slot-strip") {
                                return strip;
                            }
                            if (selector === ".person-sub__compact-text") {
                                return compact;
                            }
                            return null;
                        },
                        getAttribute() {
                            return "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    strip.parentElement = personSub;
                    chips.forEach((chip) => {
                        chip.parentElement = strip;
                    });
                    const row = {
                        dataset: { exportInput: "palehuia" },
                        hidden,
                        querySelector(selector) {
                            if (selector === ".person-sub") {
                                return personSub;
                            }
                            if (selector === ".person-label") {
                                return makeTextNode("1sg");
                            }
                            if (selector === ".conjugation-value") {
                                return {
                                    dataset: { exportForm: form },
                                    querySelector() {
                                        return null;
                                    },
                                };
                            }
                            return null;
                        },
                        querySelectorAll() {
                            return [];
                        },
                        closest(selector) {
                            if (selector === ".tense-block") {
                                return block;
                            }
                            if (selector === ".tense-grid-source-column") {
                                return sourceColumn;
                            }
                            return null;
                        },
                        getAttribute(attribute) {
                            return attribute === "aria-hidden" && hidden ? "true" : "";
                        },
                        classList: {
                            contains() {
                                return false;
                            },
                        },
                    };
                    personSub.parentElement = row;
                    row.parentElement = block;
                    block.parentElement = sourceColumn;
                    return row;
                };
                const rows = [
                    makeRow(),
                    makeRow({ hidden: true, form: "hidden-form", slotValue: "hidden-slot" }),
                ];
                const container = {
                    querySelectorAll(selector) {
                        return selector === ".conjugation-row" ? rows : [];
                    },
                    getAttribute() {
                        return "";
                    },
                    classList: {
                        contains() {
                            return false;
                        },
                    },
                };
                sourceColumn.parentElement = container;
                documentObject.getElementById = (id) => {
                    if (id === "all-tense-conjugations") {
                        return container;
                    }
                    if (id === "verb") {
                        return { value: "palehuia" };
                    }
                    return null;
                };
                try {
                    const csv = ctx.buildPersonSubSlotStripViewExportCSV();
                    const lines = csv.split(/\r?\n/);
                    return {
                        lineCount: lines.length,
                        header: lines[0],
                        row: lines[1],
                        includesHidden: csv.includes("hidden-slot") || csv.includes("hidden-form"),
                    };
                } finally {
                    documentObject.getElementById = previousGetElementById;
                }
            })()
            : {
                lineCount: 0,
                header: "",
                row: "",
                includesHidden: true,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                lineCount: 2,
                header: "entrada,fuente,bloque,persona,forma,resumen,person-sub__slot-strip,tipos de ficha,detalles de ficha",
                row: "palehuia,activo,Transitivo,1sg,nikpalehuia,cláusula nuclear CNV,pers1-pers2: ni-Ø | STEM: palehuia,formula | stem,formula CNV | tronco dentro de parentesis",
                includesHidden: false,
            }
            : {
                lineCount: 0,
                header: "",
                row: "",
                includesHidden: true,
            }
    );
    s.eq(
        "view export reads conjugation surface without continuation action text",
        ctx.__TEST_RUNTIME_MODE__ === "module" && typeof ctx.getVisibleConjugationValueExportText === "function"
            ? (() => {
                const row = {
                    querySelector(selector) {
                        if (selector !== ".conjugation-value") {
                            return null;
                        }
                        return {
                            dataset: {},
                            querySelector(innerSelector) {
                                if (innerSelector === ".conjugation-conversion-surface") {
                                    return {
                                        textContent: "nikpishkinikpiyak",
                                        querySelectorAll(lineSelector) {
                                            return lineSelector === ".conjugation-conversion-surface-line"
                                                ? [
                                                    { textContent: "nikpishki" },
                                                    { textContent: "nikpiyak" },
                                                ]
                                                : [];
                                        },
                                    };
                                }
                                return null;
                            },
                            cloneNode() {
                                return {
                                    querySelectorAll() {
                                        return [{ remove() {} }];
                                    },
                                    textContent: "nikpishki / nikpiyakAdjetivoContinuacion",
                                };
                            },
                        };
                    },
                };
                return ctx.getVisibleConjugationValueExportText(row);
            })()
            : "export-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "nikpishki\nnikpiyak"
            : "export-runtime-not-loaded"
    );
    s.ok(
        "nonactive verb rows pass Andrews subject slots through posicionesFormula",
        rendering.includes("posicionesFormula: {")
            && rendering.includes("pers1: subjectPers1")
            && rendering.includes("pers2: subjectPers2")
            && rendering.includes("num2: subjectPers2")
    );
    s.eq(
        "Partícula view export uses Lesson 3 particle columns instead of conjugation slots",
        ctx.__TEST_RUNTIME_MODE__ === "module" && typeof ctx.buildViewExportCSV === "function"
            ? (() => {
                const documentObject = ctx.document || {};
                const previousGetElementById = documentObject.getElementById;
                const makeTextNode = (text) => ({ textContent: text });
                const block = {
                    querySelector: () => makeTextNode("3.2 Clases funcionales"),
                };
                const makeParticleRow = ({
                    label,
                    value,
                    rowId = "",
                    dataset = {},
                }) => ({
                    dataset: {
                        particleRow: rowId,
                        ...dataset,
                    },
                    querySelector(selector) {
                        if (selector === ".person-label") {
                            return makeTextNode(label);
                        }
                        if (selector === ".conjugation-value") {
                            return makeTextNode(value);
                        }
                        return makeTextNode("");
                    },
                    closest(selector) {
                        return selector === ".tense-block" ? block : null;
                    },
                });
                const rows = [
                    makeParticleRow({
                        label: "Candidata",
                        value: "Ø",
                        rowId: "candidate",
                        dataset: {
                            particleEntryKind: "candidate-diagnostic",
                            grammarDiagnosticId: "particle-candidate-empty",
                        },
                    }),
                    makeParticleRow({
                        label: "ka",
                        value: "introductor de cláusula",
                        dataset: {
                            exportInput: "ka",
                            particleEntryKind: "andrews-seed",
                            particleNawatForm: "ka",
                            particleSourceForm: "ca",
                            particleSection: "3.2.1",
                            particleFunctionClass: "introductor de cláusula",
                            particlePlacement: "inicio de cláusula",
                            particleHostLayer: "sentence",
                            particleGloss: "en verdad; de hecho",
                            particleConfirmedNawat: "false",
                            grammarEvidenceStatus: "andrews-orthography-adapted",
                            grammarGenerationAllowed: "false",
                            grammarRouteFamily: "particle-placement",
                            grammarRouteStage: "inventory-preview",
                            grammarDiagnosticId: "particle-seed-inventory-entry",
                            grammarResultOk: "false",
                        },
                    }),
                ];
                const container = {
                    querySelectorAll(selector) {
                        return selector === ".conjugation-row--particle" ? rows : [];
                    },
                };
                documentObject.getElementById = (id) => {
                    return id === "all-tense-conjugations" ? container : null;
                };
                try {
                    const csv = ctx.buildViewExportCSV();
                    const lines = csv.split(/\r?\n/);
                    return {
                        lineCount: lines.length,
                        header: lines[0],
                        firstRow: lines[1],
                        hasConjugationHeader: lines[0].includes("derivación") || lines[0].includes("sujeto"),
                    };
                } finally {
                    documentObject.getElementById = previousGetElementById;
                }
            })()
            : {
                lineCount: 0,
                header: "",
                firstRow: "",
                hasConjugationHeader: true,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                lineCount: 2,
                header: "tipo,entrada Nawat,fuente Andrews,sección Andrews,clase funcional,posición,capa,glosa,estado evidencia,confirmado Nawat,generación de contrato,ruta de contrato,etapa de contrato,diagnóstico de contrato,resultado de contrato",
                firstRow: "ejemplo Andrews,ka,ca,3.2.1,introductor de cláusula,inicio de cláusula,sentence,en verdad; de hecho,andrews-orthography-adapted,false,false,particle-placement,inventory-preview,particle-seed-inventory-entry,false",
                hasConjugationHeader: false,
            }
            : {
                lineCount: 0,
                header: "",
                firstRow: "",
                hasConjugationHeader: true,
            }
    );
    s.ok(
        "panel visibility reader checks LCM framed surfaces before stale result text",
        panels.includes("function getPanelConjugationRenderableSurface")
            && panels.includes('if (!getPanelConjugationRenderableSurface(result))')
            && !panels.includes('if (!result || !result.result || result.result === "—")')
    );
    s.eq(
        "panel visibility accepts LCM result-frame surface when stale result is empty",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surface: "frame-panel-surface",
                        }),
                    }),
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "frame-panel-surface", visible: true }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "panel visibility accepts LCM result-frame surface forms when stale result is empty",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-panel-a / frame-panel-b"],
                        }),
                    }),
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "frame-panel-a / frame-panel-b", visible: true }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "panel visibility suppresses stale aliases for empty result frames",
        typeof ctx.getPanelConjugationRenderableSurface === "function"
            && typeof ctx.isConjugationResultVisible === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? (() => {
                const result = {
                    result: "stale-panel-result",
                    surface: "top-panel-surface",
                    surfaceForms: ["stale-panel-a / stale-panel-b"],
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                };
                return {
                    surface: ctx.getPanelConjugationRenderableSurface(result),
                    visible: ctx.isConjugationResultVisible({
                        result,
                        subjectPrefix: "ni",
                        subjectSuffix: "",
                        objectPrefix: "",
                        comboObjectPrefix: "",
                        enforceInvalidCombo: false,
                    }),
                };
            })()
            : { surface: "panels-runtime-not-loaded", visible: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? { surface: "", visible: false }
            : { surface: "panels-runtime-not-loaded", visible: false }
    );
    s.eq(
        "shared route dataset projects LCM authority and source evidence",
        typeof ctx.applyGrammarFrameRouteDataset === "function"
            ? (() => {
                const element = { dataset: {} };
                const frame = ctx.buildGrammarFrame({
                    authorityFrame: ctx.buildGrammarAuthorityFrame({
                        evidenceStatus: "source-evidence-satisfied",
                        andrewsRefs: ["Andrews Lesson 40", "Andrews Lesson 4"],
                        nawatEvidenceRefs: ["data/static_modes.json"],
                        sourceEvidence: {
                            kind: "adjectival-nnc-function",
                            status: "source-evidence-satisfied",
                            targetAuthority: "Andrews",
                            evidenceSource: "patientive generated stage",
                            boundaries: {
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                sourceEvidenceFromAndrewsContractRoute: true,
                                ignoredFalseFlag: false,
                            },
                        },
                        supported: true,
                    }),
                    unitFrame: { unitKind: "ui-route-control" },
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "adjectival-nnc-function",
                        routeStage: "preview-control",
                        generationAllowed: true,
                    }),
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "test",
                    }),
                    diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                        status: "route-control",
                    }),
                });
                const returnedFrame = ctx.applyGrammarFrameRouteDataset(element, { frames: frame });
                return {
                    returned: returnedFrame === frame,
                    authorityRef: element.dataset.grammarAuthorityRef,
                    authorityRefs: element.dataset.grammarAuthorityRefs,
                    evidenceStatus: element.dataset.grammarEvidenceStatus,
                    nawatEvidenceRef: element.dataset.grammarNawatEvidenceRef,
                    nawatEvidenceRefs: element.dataset.grammarNawatEvidenceRefs,
                    sourceEvidenceKind: element.dataset.grammarSourceEvidenceKind,
                    sourceEvidenceStatus: element.dataset.grammarSourceEvidenceStatus,
                    sourceEvidenceTargetAuthority: element.dataset.grammarSourceEvidenceTargetAuthority,
                    sourceEvidenceSource: element.dataset.grammarSourceEvidenceSource,
                    sourceEvidenceFlags: element.dataset.grammarSourceEvidenceFlags,
                    routeFamily: element.dataset.grammarRouteFamily,
                };
            })()
            : { returned: false },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                returned: true,
                authorityRef: "Andrews Lesson 40",
                authorityRefs: "Andrews Lesson 40|Andrews Lesson 4",
                evidenceStatus: "source-evidence-satisfied",
                nawatEvidenceRef: "data/static_modes.json",
                nawatEvidenceRefs: "data/static_modes.json",
                sourceEvidenceKind: "adjectival-nnc-function",
                sourceEvidenceStatus: "source-evidence-satisfied",
                sourceEvidenceTargetAuthority: "Andrews",
                sourceEvidenceSource: "patientive generated stage",
                sourceEvidenceFlags: "sourceEvidenceFromAndrewsContractRoute|sourceEvidenceFromSelectedGeneratedStage",
                routeFamily: "adjectival-nnc-function",
            }
            : { returned: false }
    );
    s.eq(
        "shared route dataset infers LCM failed layer from blocked frame status",
        typeof ctx.applyGrammarFrameRouteDataset === "function"
            ? (() => {
                const element = { dataset: {} };
                const frame = ctx.buildGrammarFrame({
                    authorityFrame: ctx.buildGrammarAuthorityFrame({
                        evidenceStatus: "blocked",
                        andrewsRefs: ["Andrews Lesson 4"],
                        supported: true,
                    }),
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "vnc",
                        routeStage: "classify-route",
                        generationAllowed: false,
                    }),
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        outputKind: "vnc",
                    }),
                    diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                        status: "blocked",
                        diagnostics: [{
                            id: "plain-route-blocked",
                            severity: "error",
                            message: "Route blocked without explicit layer.",
                        }],
                    }),
                });
                ctx.applyGrammarFrameRouteDataset(element, { frames: frame });
                return {
                    diagnosticId: element.dataset.grammarDiagnosticId,
                    diagnosticLayer: element.dataset.grammarDiagnosticLayer,
                    diagnosticContractLayer: element.dataset.grammarDiagnosticContractLayer,
                    resultOk: element.dataset.grammarResultOk,
                };
            })()
            : { diagnosticLayer: "rendering-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                diagnosticId: "plain-route-blocked",
                diagnosticLayer: "route",
                diagnosticContractLayer: "routeContract",
                resultOk: "false",
            }
            : { diagnosticLayer: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "shared renderer formats opt-in sentence-layer labels",
        typeof ctx.buildSentenceLayerSubLabels === "function"
            ? ctx.buildSentenceLayerSubLabels({
                kind: "sentence-layer-metadata",
                slots: {
                    polarity: { value: "negative" },
                    question: { value: "yes-no" },
                    emphasis: { value: "focus" },
                    mood: { value: "command" },
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Capa oracional: diagnóstica",
                "Negación: negativa",
                "Pregunta: sí/no",
                "Énfasis: foco",
                "Modo oracional: mandato",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.ok(
        "curriculum map support is no longer mounted before #1 Entrada",
        !html.includes('id="book-map"')
            && curriculum.includes('book-map__architecture-note')
            && curriculum.includes('book-map__missing-category')
    );

    return s;
}

module.exports = { run };
